import crypto from 'node:crypto';

import { COURSE_PACKAGE_ACCESS_SCOPE, COURSE_PACKAGE_PRICE_USD } from '../data/coursePackage.js';

const SUCCESS_STATUSES = ['success', 'successful', 'completed', 'complete', 'paid', 'approved', 'ok', 'succeeded', 'succes'];
const FAILED_STATUSES = ['failed', 'failure', 'declined', 'decline', 'cancelled', 'canceled', 'error', 'rejected'];

export const MAXICASH_PAY_TYPES = {
  maxicash: 0,
  airtel: 1,
  mpesa: 2,
  orange: 3,
  africell: Number(process.env.MAXICASH_AFRICELL_PAY_TYPE || 52),
};

export const MAXICASH_PARTNER_LABELS = {
  maxicash: 'Portefeuille MaxiCash',
  airtel: 'Airtel Money',
  mpesa: 'M-Pesa',
  orange: 'Orange Money',
  africell: 'Africell Money',
};

export function getMaxiCashConfig() {
  const environment = process.env.MAXICASH_ENV === 'sandbox' ? 'sandbox' : 'live';

  return {
    environment,
    merchantId: process.env.MAXICASH_MERCHANT_ID || '',
    merchantPassword: process.env.MAXICASH_MERCHANT_PASSWORD || '',
    payNowSyncUrl:
      process.env.MAXICASH_PAY_NOW_SYNC_URL ||
      (environment === 'live'
        ? 'https://webapi.maxicashapp.com/Integration/PayNowSync'
        : 'https://webapi-test.maxicashapp.com/Integration/PayNowSync'),
    checkPaymentStatusByReferenceUrl:
      process.env.MAXICASH_CHECK_PAYMENT_STATUS_BY_REFERENCE_URL ||
      (environment === 'live'
        ? 'https://webapi.maxicashapp.com/Integration/CheckPaymentStatusByReference'
        : 'https://webapi-test.maxicashapp.com/Integration/CheckPaymentStatusByReference'),
  };
}

export function assertMaxiCashConfig(config = getMaxiCashConfig()) {
  if (!config.merchantId || !config.merchantPassword) {
    throw new Error('Configuration MaxiCash manquante.');
  }
}

export function normalizeCongolesePhone(value = '') {
  const digits = String(value).replace(/\D/g, '');
  if (digits.startsWith('243')) return digits;
  if (digits.startsWith('0')) return `243${digits.slice(1)}`;
  if (digits.length === 9) return `243${digits}`;
  return digits;
}

export function toMaxiCashCents(amount) {
  return String(Math.round(Number(amount || 0) * 100));
}

export function generateCoursePaymentReference() {
  const random = crypto.randomBytes(4).toString('hex').toUpperCase();
  return `CNK-COURSE-${Date.now()}-${random}`;
}

function normalizeStatus(value) {
  return String(value || '').trim().toLowerCase();
}

export function extractMaxiCashStatus(payload = {}, fallback = '') {
  return (
    payload.status ||
    payload.Status ||
    payload.ResponseStatus ||
    payload.responseStatus ||
    payload.TransactionStatus ||
    payload.transactionStatus ||
    payload.PaymentStatus ||
    payload.paymentStatus ||
    payload.result ||
    payload.Result ||
    fallback ||
    ''
  );
}

export function getMaxiCashStatusCandidates(payload = {}, fallback = '') {
  return [
    payload.status,
    payload.Status,
    payload.ResponseStatus,
    payload.responseStatus,
    payload.ResponseData,
    payload.responseData,
    payload.ResponseDesc,
    payload.responseDesc,
    payload.TransactionStatus,
    payload.transactionStatus,
    payload.PaymentStatus,
    payload.paymentStatus,
    payload.result,
    payload.Result,
    fallback,
  ].filter((value) => value !== undefined && value !== null && String(value).trim() !== '');
}

export function hasCompletedMaxiCashPayment(payload = {}, fallback = '') {
  return getMaxiCashStatusCandidates(payload, fallback).some((value) => SUCCESS_STATUSES.includes(normalizeStatus(value)));
}

export function hasFailedMaxiCashPayment(payload = {}, fallback = '') {
  return getMaxiCashStatusCandidates(payload, fallback).some((value) => FAILED_STATUSES.includes(normalizeStatus(value)));
}

export function getMaxiCashMessage(payload = {}, fallback = '') {
  return String(
    payload.ResponseError ||
      payload.responseError ||
      payload.Error ||
      payload.error ||
      payload.ResponseDesc ||
      payload.responseDesc ||
      payload.ResponseData ||
      fallback ||
      ''
  );
}

function getTokenSecret() {
  const secret =
    process.env.COURSE_ACCESS_TOKEN_SECRET ||
    process.env.MAXICASH_MERCHANT_PASSWORD ||
    process.env.GEMINI_API_KEY ||
    '';

  if (!secret) {
    throw new Error('Secret de jeton cours manquant.');
  }

  return secret;
}

function base64UrlEncode(value) {
  return Buffer.from(value)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function base64UrlDecode(value) {
  const normalized = String(value).replace(/-/g, '+').replace(/_/g, '/');
  const padding = '='.repeat((4 - (normalized.length % 4)) % 4);
  return Buffer.from(`${normalized}${padding}`, 'base64').toString('utf8');
}

function signPayload(encodedPayload) {
  return crypto.createHmac('sha256', getTokenSecret()).update(encodedPayload).digest('base64url');
}

export function createCourseAccessToken({ reference, telephone }) {
  const payload = {
    scope: COURSE_PACKAGE_ACCESS_SCOPE,
    reference,
    telephone: telephone || null,
    amount: COURSE_PACKAGE_PRICE_USD,
    currency: 'USD',
    exp: Date.now() + 30 * 24 * 60 * 60 * 1000,
  };
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  return `${encodedPayload}.${signPayload(encodedPayload)}`;
}

export function verifyCourseAccessToken(token) {
  if (!token || !String(token).includes('.')) {
    return { valid: false, reason: 'Jeton absent.' };
  }

  const [encodedPayload, signature] = String(token).split('.');
  const expected = signPayload(encodedPayload);
  const provided = Buffer.from(signature || '');
  const expectedBuffer = Buffer.from(expected);

  if (provided.length !== expectedBuffer.length || !crypto.timingSafeEqual(provided, expectedBuffer)) {
    return { valid: false, reason: 'Jeton invalide.' };
  }

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload));
    if (payload.scope !== COURSE_PACKAGE_ACCESS_SCOPE) {
      return { valid: false, reason: 'Portee invalide.' };
    }
    if (!payload.exp || Date.now() > Number(payload.exp)) {
      return { valid: false, reason: 'Acces expire.' };
    }
    return { valid: true, payload };
  } catch {
    return { valid: false, reason: 'Jeton illisible.' };
  }
}

export async function checkMaxiCashPaymentStatus(reference, providerTransactionId = '') {
  const config = getMaxiCashConfig();
  assertMaxiCashConfig(config);

  const payload = {
    MerchantID: config.merchantId,
    MerchantPassword: config.merchantPassword,
    Reference: reference,
    TransactionID: providerTransactionId || '',
  };

  const response = await fetch(config.checkPaymentStatusByReferenceUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    return data || { ResponseStatus: 'Failed', ResponseError: `Status check failed (${response.status})` };
  }

  return data;
}
