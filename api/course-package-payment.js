import {
  MAXICASH_PARTNER_LABELS,
  MAXICASH_PAY_TYPES,
  assertMaxiCashConfig,
  createCourseAccessToken,
  extractMaxiCashStatus,
  generateCoursePaymentReference,
  getMaxiCashConfig,
  getMaxiCashMessage,
  hasCompletedMaxiCashPayment,
  hasFailedMaxiCashPayment,
  normalizeCongolesePhone,
  toMaxiCashCents,
} from './_course-access.js';
import { COURSE_PACKAGE_PRICE_USD } from '../data/coursePackage.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
    const telephone = normalizeCongolesePhone(body.telephone || '');
    const partner = String(body.partner || 'airtel');
    const reference = String(body.reference || generateCoursePaymentReference()).trim();

    if (!telephone || telephone.length < 11) {
      return res.status(400).json({ error: 'Numero de telephone invalide.' });
    }

    if (!(partner in MAXICASH_PAY_TYPES)) {
      return res.status(400).json({ error: 'Methode de paiement non prise en charge.' });
    }

    const config = getMaxiCashConfig();
    assertMaxiCashConfig(config);

    const payType = MAXICASH_PAY_TYPES[partner];
    const partnerLabel = MAXICASH_PARTNER_LABELS[partner];

    const payload = {
      RequestData: {
        Amount: toMaxiCashCents(COURSE_PACKAGE_PRICE_USD),
        Reference: reference,
        Telephone: telephone,
      },
      MerchantID: config.merchantId,
      MerchantPassword: config.merchantPassword,
      PayType: payType,
      CurrencyCode: 'USD',
    };

    const response = await fetch(config.payNowSyncUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const providerResponse = await response.json().catch(() => null);
    const responseStatus = extractMaxiCashStatus(providerResponse || {});
    const providerTransactionId = providerResponse?.TransactionID || providerResponse?.LogID || '';
    const providerMessage = getMaxiCashMessage(providerResponse || {}, 'Paiement en attente de confirmation.');

    if (!response.ok) {
      return res.status(502).json({
        success: false,
        status: 'failed',
        error: providerMessage || 'MaxiCash a refuse l initialisation du paiement.',
        reference,
        providerResponse,
      });
    }

    if (hasCompletedMaxiCashPayment(providerResponse || {}, responseStatus)) {
      return res.status(200).json({
        success: true,
        status: 'completed',
        accessToken: createCourseAccessToken({ reference, telephone }),
        reference,
        providerTransactionId,
        partner,
        partnerLabel,
        providerResponse,
      });
    }

    if (hasFailedMaxiCashPayment(providerResponse || {}, responseStatus)) {
      return res.status(502).json({
        success: false,
        status: 'failed',
        error: providerMessage || 'Paiement refuse.',
        reference,
        providerTransactionId,
        partner,
        partnerLabel,
        providerResponse,
      });
    }

    return res.status(200).json({
      success: true,
      status: 'pending',
      message: providerMessage || 'Confirmez le paiement sur votre telephone.',
      reference,
      providerTransactionId,
      partner,
      partnerLabel,
      providerResponse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Erreur paiement MaxiCash.',
    });
  }
}
