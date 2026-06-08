import {
  checkMaxiCashPaymentStatus,
  createCourseAccessToken,
  extractMaxiCashStatus,
  getMaxiCashMessage,
  hasCompletedMaxiCashPayment,
  hasFailedMaxiCashPayment,
  normalizeCongolesePhone,
} from './_course-access.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
    const reference = String(body.reference || '').trim();
    const providerTransactionId = String(body.providerTransactionId || '').trim();
    const telephone = normalizeCongolesePhone(body.telephone || '');

    if (!reference) {
      return res.status(400).json({ error: 'Reference de paiement manquante.' });
    }

    const providerResponse = await checkMaxiCashPaymentStatus(reference, providerTransactionId);
    const responseStatus = extractMaxiCashStatus(providerResponse || {});
    const message = getMaxiCashMessage(providerResponse || {}, 'Paiement en attente de confirmation.');

    if (hasCompletedMaxiCashPayment(providerResponse || {}, responseStatus)) {
      return res.status(200).json({
        success: true,
        status: 'completed',
        accessToken: createCourseAccessToken({ reference, telephone }),
        reference,
        providerResponse,
      });
    }

    if (hasFailedMaxiCashPayment(providerResponse || {}, responseStatus)) {
      return res.status(200).json({
        success: false,
        status: 'failed',
        error: message || 'Paiement non abouti.',
        reference,
        providerResponse,
      });
    }

    return res.status(200).json({
      success: true,
      status: 'pending',
      message,
      reference,
      providerResponse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Verification MaxiCash impossible.',
    });
  }
}
