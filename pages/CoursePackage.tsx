import React, { useEffect, useMemo, useState } from 'react';
import { onValue, ref, set, update } from 'firebase/database';

import { COURSE_PACKAGE_PRICE_USD, coursePackage } from '../data/coursePackage.js';
import { realtimeDatabase } from '../services/firebase';

type PaymentPartner = 'airtel' | 'mpesa' | 'orange' | 'africell' | 'maxicash';
type PaymentState = 'idle' | 'pending' | 'completed' | 'failed';

const ACCESS_TOKEN_KEY = 'cnk_course_package_access_token';
const PENDING_PAYMENT_KEY = 'cnk_course_package_pending_reference';
const ACCESS_TOKEN_KEY_V2 = 'cnk_course_package_direct_access_token';

const partners: Array<{ id: PaymentPartner; label: string; hint: string }> = [
  { id: 'airtel', label: 'Airtel Money', hint: '97, 98, 99' },
  { id: 'mpesa', label: 'M-Pesa', hint: '81, 82, 83' },
  { id: 'orange', label: 'Orange Money', hint: '84, 85' },
  { id: 'africell', label: 'Africell Money', hint: '90, 91' },
  { id: 'maxicash', label: 'Portefeuille MaxiCash', hint: 'Compte MaxiCash' },
];

function normalizeCdPhoneDigits(value: string) {
  const digits = String(value || '').replace(/\D/g, '');
  if (digits.startsWith('243')) return digits;
  if (digits.startsWith('0')) return `243${digits.slice(1)}`;
  if (digits.length === 9) return `243${digits}`;
  return digits;
}

function guessPartnerFromPhone(phoneNumber: string): PaymentPartner | null {
  const digits = normalizeCdPhoneDigits(phoneNumber);
  if (!digits.startsWith('243') || digits.length < 5) return null;

  const prefix = digits.slice(3, 5);
  if (['81', '82', '83'].includes(prefix)) return 'mpesa';
  if (['84', '85'].includes(prefix)) return 'orange';
  if (['97', '98', '99'].includes(prefix)) return 'airtel';
  if (['90', '91'].includes(prefix)) return 'africell';
  return null;
}

function generatePaymentReference() {
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `CNK-COURSE-${Date.now()}-${random}`;
}

async function postJson(url: string, payload: Record<string, unknown>) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const text = await response.text();
  let data: any = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    throw new Error('Le service de paiement direct n est pas disponible sur ce serveur local.');
  }

  if (!response.ok) {
    throw new Error(data?.error || 'Paiement refuse.');
  }

  return data;
}

const CourseIcon = ({ index }: { index: number }) => {
  const paths = [
    'M7 7h10v10H7z M4 4h16v16H4z',
    'M5 17l4-10 4 10 4-10 2 10 M9 14h4',
    'M5 6h14M7 10h10M5 14h14M7 18h10',
    'M4 7h16M7 7v13M17 7v13M9 11h6M9 15h6',
    'M12 3l7 4v5c0 5-3 8-7 9-4-1-7-4-7-9V7l7-4z M9 12l2 2 4-5',
    'M5 16c3-8 11-8 14 0M8 16c1-4 7-4 8 0M12 5v4M7 8l3 3M17 8l-3 3',
  ];

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7">
      <path d={paths[index % paths.length]} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
    <path d="M5 12.5l4 4L19 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
    <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
    <path d="M7 10V8a5 5 0 0110 0v2M6 10h12v10H6z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const heroProofs = [
  ['6', 'manuels complets'],
  ['44 USD', 'prix unique'],
  ['30 jours', 'lecture et telechargement'],
];

const packageBenefits = [
  'Une progression claire: logique, code, donnees, architecture, securite et IA.',
  'Des manuels concus pour lire, pratiquer et revenir aux notions importantes.',
  'Un acces immediat apres confirmation du paiement mobile.',
];

const journeySteps = [
  ['01', 'Choisir', 'Vous gardez le package complet: les six cours sont inclus dans le meme acces.'],
  ['02', 'Confirmer', 'Vous payez par mobile money ou portefeuille compatible, depuis cette page.'],
  ['03', 'Lire', 'Le lecteur PDF et le telechargement se debloquent automatiquement.'],
];

const CoursePackage: React.FC = () => {
  const [telephone, setTelephone] = useState('');
  const [partner, setPartner] = useState<PaymentPartner>('airtel');
  const [partnerLocked, setPartnerLocked] = useState(false);
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [paymentState, setPaymentState] = useState<PaymentState>('idle');
  const [paymentMessage, setPaymentMessage] = useState('');
  const [paymentReference, setPaymentReference] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [selectedCourseSlug, setSelectedCourseSlug] = useState(coursePackage[0]?.slug || '');

  const selectedCourse = useMemo(
    () => coursePackage.find((course) => course.slug === selectedCourseSlug) || coursePackage[0],
    [selectedCourseSlug]
  );

  useEffect(() => {
    const existingToken = localStorage.getItem(ACCESS_TOKEN_KEY_V2);
    if (existingToken) {
      setAccessToken(existingToken);
      setPaymentState('completed');
      setPaymentMessage('Acces deja active sur ce navigateur.');
    }
  }, []);

  useEffect(() => {
    if (partnerLocked) return;
    const suggestion = guessPartnerFromPhone(telephone);
    if (suggestion) setPartner(suggestion);
  }, [telephone, partnerLocked]);

  const hasAccess = Boolean(accessToken);
  const normalizedPhone = normalizeCdPhoneDigits(telephone);
  const selectedPartner = partners.find((item) => item.id === partner);

  const fileUrl = (slug: string, download = false) =>
    `/api/course-package-file?slug=${encodeURIComponent(slug)}&token=${encodeURIComponent(accessToken)}${download ? '&download=1' : ''}`;

  useEffect(() => {
    const reference = paymentReference || localStorage.getItem(PENDING_PAYMENT_KEY);
    if (!reference || hasAccess) return;

    const paymentRef = ref(realtimeDatabase, `coursePackagePayments/${reference}`);
    return onValue(paymentRef, (snapshot) => {
      const payment = snapshot.val();
      if (!payment) return;

      if (payment.status === 'completed') {
        setPaymentMessage('Paiement valide. Finalisation de votre acces en cours.');
      } else if (['declined', 'cancelled', 'failed'].includes(payment.status)) {
        setPaymentState('failed');
        setPaymentMessage(payment.error || 'Paiement non abouti.');
      }
    });
  }, [hasAccess, paymentReference]);

  const pollPaymentStatus = async (referenceCode: string, providerTransactionId: string) => {
    for (let attempt = 0; attempt < 24; attempt += 1) {
      await new Promise((resolve) => setTimeout(resolve, 5000));

      const result = await postJson('/api/course-package-status', {
        reference: referenceCode,
        providerTransactionId,
        telephone: normalizedPhone,
      });

      if (result.status === 'completed' && result.accessToken) {
        localStorage.setItem(ACCESS_TOKEN_KEY_V2, result.accessToken);
        localStorage.removeItem(PENDING_PAYMENT_KEY);
        setAccessToken(result.accessToken);
        setPaymentState('completed');
        setPaymentMessage('Paiement confirme. Le package complet est maintenant disponible.');
        await update(ref(realtimeDatabase, `coursePackagePayments/${referenceCode}`), {
          status: 'completed',
          completedAt: new Date().toISOString(),
          providerResponse: result.providerResponse || null,
        }).catch(() => undefined);
        return;
      }

      if (result.status === 'failed') {
        setPaymentState('failed');
        setPaymentMessage(result.error || 'Paiement non abouti.');
        await update(ref(realtimeDatabase, `coursePackagePayments/${referenceCode}`), {
          status: 'failed',
          error: result.error || 'Paiement non abouti.',
          failedAt: new Date().toISOString(),
          providerResponse: result.providerResponse || null,
        }).catch(() => undefined);
        return;
      }

      setPaymentMessage(result.message || 'Paiement en attente de confirmation sur votre telephone.');
    }

    setPaymentState('pending');
    setPaymentMessage('Le paiement reste en attente. Gardez cette page ouverte pendant la confirmation.');
  };

  const handlePayment = async () => {
    if (!normalizedPhone || normalizedPhone.length < 11) {
      setPaymentState('failed');
      setPaymentMessage('Entrez un numero mobile valide avant de continuer.');
      return;
    }

    try {
      const referenceCode = generatePaymentReference();

      await set(ref(realtimeDatabase, `coursePackagePayments/${referenceCode}`), {
        reference: referenceCode,
        telephone: normalizedPhone,
        partner,
        amount: COURSE_PACKAGE_PRICE_USD,
        currency: 'USD',
        buyerName,
        buyerEmail,
        status: 'pending',
        createdAt: new Date().toISOString(),
      });

      localStorage.setItem(PENDING_PAYMENT_KEY, referenceCode);
      setPaymentReference(referenceCode);
      setPaymentState('pending');
      setPaymentMessage('Envoi de la demande de paiement. Confirmez sur votre telephone.');

      const result = await postJson('/api/course-package-payment', {
        reference: referenceCode,
        telephone: normalizedPhone,
        partner,
        buyerName,
        buyerEmail,
      });

      await update(ref(realtimeDatabase, `coursePackagePayments/${referenceCode}`), {
        status: result.status || 'pending',
        providerTransactionId: result.providerTransactionId || '',
        partnerLabel: result.partnerLabel || selectedPartner?.label || partner,
        providerResponse: result.providerResponse || null,
        updatedAt: new Date().toISOString(),
      }).catch(() => undefined);

      if (result.status === 'completed' && result.accessToken) {
        localStorage.setItem(ACCESS_TOKEN_KEY_V2, result.accessToken);
        localStorage.removeItem(PENDING_PAYMENT_KEY);
        setAccessToken(result.accessToken);
        setPaymentState('completed');
        setPaymentMessage('Paiement confirme. Le package complet est maintenant disponible.');
        return;
      }

      if (result.status === 'failed') {
        setPaymentState('failed');
        setPaymentMessage(result.error || 'Paiement non abouti.');
        return;
      }

      setPaymentMessage(result.message || 'Confirmez le paiement sur votre telephone.');
      await pollPaymentStatus(referenceCode, result.providerTransactionId || '');
    } catch (error) {
      setPaymentState('failed');
      setPaymentMessage(error instanceof Error ? error.message : 'Paiement impossible.');
    }
  };

  const resetAccessForAnotherBuyer = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(ACCESS_TOKEN_KEY_V2);
    setAccessToken('');
    setPaymentState('idle');
    setPaymentMessage('');
    setPaymentReference('');
  };

  return (
    <div className="bg-[#f8f4ea] text-slate-950">
      <section className="relative min-h-screen overflow-hidden bg-slate-950 pt-32 text-white">
        <div className="absolute inset-0">
          <img src="/photos/IMG_7908.JPG" alt="Charmant Nyungu K. - formation technologique" className="h-full w-full object-cover opacity-32" />
          <div className="absolute inset-0 bg-[linear-gradient(112deg,rgba(2,6,23,0.98)_0%,rgba(15,23,42,0.9)_42%,rgba(146,64,14,0.76)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30" />
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-6 pb-20 pt-10 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
          <div>
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-amber-300/30 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.26em] text-amber-200 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.8)]" />
              Package cours complet
            </div>

            <h1 className="max-w-5xl text-5xl font-black leading-[0.9] tracking-tight md:text-7xl xl:text-8xl">
              La base technique qui change votre niveau.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-white/78 md:text-xl">
              Six manuels premium pour apprendre a penser, coder, structurer, securiser et exploiter l'IA avec une methode claire. Un seul achat, tout le package, acces immediat apres confirmation.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => document.getElementById('achat-package')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                className="cnk-button bg-amber-400 px-7 py-4 text-slate-950 shadow-2xl shadow-amber-950/30 hover:bg-amber-300"
              >
                Debloquer maintenant
                <span className="ml-3"><ArrowIcon /></span>
              </button>
              <button
                onClick={() => document.getElementById('programme-cours')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="cnk-button border border-white/18 bg-white/10 px-7 py-4 text-white backdrop-blur hover:bg-white/16"
              >
                Voir le programme
              </button>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {heroProofs.map(([value, label]) => (
                <div key={label} className="border-l border-white/15 bg-white/[0.06] p-4 backdrop-blur">
                  <div className="text-3xl font-black text-amber-200">{value}</div>
                  <div className="mt-1 text-[10px] font-black uppercase tracking-[0.22em] text-white/52">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <aside id="achat-package" className="lg:pl-4">
            <div className="relative">
              <div className="absolute -inset-1 rounded-[1.8rem] bg-[linear-gradient(135deg,rgba(251,191,36,0.76),rgba(16,185,129,0.34),rgba(255,255,255,0.18))] opacity-90" />
              <div className="relative overflow-hidden rounded-[1.65rem] border border-white/20 bg-white text-slate-950 shadow-[0_34px_110px_rgba(0,0,0,0.38)]">
                <div className="bg-slate-950 px-5 py-5 text-white">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.26em] text-amber-300">Acces complet</p>
                      <h2 className="mt-2 text-3xl font-black">Debloquer les 6 cours</h2>
                    </div>
                    <div className="rounded-2xl border border-amber-300/30 bg-amber-300 px-4 py-3 text-right text-slate-950">
                      <div className="text-3xl font-black">{COURSE_PACKAGE_PRICE_USD}$</div>
                      <div className="text-[10px] font-black uppercase tracking-[0.22em]">USD</div>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-2">
                    {packageBenefits.map((benefit) => (
                      <div key={benefit} className="flex gap-3 text-sm leading-relaxed text-white/78">
                        <span className="mt-0.5 grid h-5 w-5 flex-shrink-0 place-items-center rounded-full bg-emerald-400 text-slate-950">
                          <CheckIcon />
                        </span>
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-5">
                  {hasAccess ? (
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-950">
                      <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em]">
                        <CheckIcon /> Acces active
                      </div>
                      <p className="mt-3 text-sm leading-relaxed">
                        Votre package est ouvert sur ce navigateur. Vous pouvez lire et telecharger les manuels.
                      </p>
                      <button onClick={resetAccessForAnotherBuyer} className="mt-4 text-xs font-black uppercase tracking-[0.16em] text-emerald-700 underline">
                        Reinitialiser cet acces local
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <label className="block">
                        <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-500">Numero mobile money</span>
                        <input
                          value={telephone}
                          onChange={(event) => setTelephone(event.target.value)}
                          placeholder="Ex: 081 000 00 00"
                          inputMode="tel"
                          className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-base font-bold outline-none transition focus:border-amber-500 focus:bg-white"
                        />
                        <span className="mt-2 block text-xs font-semibold text-slate-500">
                          {selectedPartner?.hint ? `Operateur detecte: ${selectedPartner.label}` : 'Entrez le numero utilise pour confirmer le paiement.'}
                        </span>
                      </label>

                      <div>
                        <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-500">Methode de paiement</span>
                        <div className="grid grid-cols-2 gap-2">
                          {partners.map((item) => (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => {
                                setPartner(item.id);
                                setPartnerLocked(true);
                              }}
                              className={`rounded-2xl border px-3 py-3 text-left transition ${
                                partner === item.id
                                  ? 'border-slate-950 bg-slate-950 text-white shadow-lg shadow-slate-950/14'
                                  : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-amber-300 hover:bg-amber-50'
                              }`}
                            >
                              <span className="block text-sm font-black">{item.label}</span>
                              <span className={`mt-1 block text-[10px] font-bold uppercase tracking-[0.15em] ${partner === item.id ? 'text-white/48' : 'text-slate-400'}`}>
                                {item.hint}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <label className="block">
                          <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-500">Nom</span>
                          <input
                            value={buyerName}
                            onChange={(event) => setBuyerName(event.target.value)}
                            placeholder="Votre nom"
                            className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold outline-none transition focus:border-amber-500 focus:bg-white"
                          />
                        </label>
                        <label className="block">
                          <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-500">Email</span>
                          <input
                            value={buyerEmail}
                            onChange={(event) => setBuyerEmail(event.target.value)}
                            placeholder="facultatif"
                            type="email"
                            className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold outline-none transition focus:border-amber-500 focus:bg-white"
                          />
                        </label>
                      </div>

                      <button
                        onClick={handlePayment}
                        disabled={paymentState === 'pending'}
                        className="cnk-button w-full bg-amber-500 px-6 py-4 text-slate-950 shadow-xl shadow-amber-900/18 hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {paymentState === 'pending' ? 'Confirmation en cours' : `Payer ${COURSE_PACKAGE_PRICE_USD} USD et acceder`}
                      </button>
                    </div>
                  )}

                  {paymentMessage && (
                    <div
                      className={`mt-5 rounded-2xl border p-4 text-sm leading-relaxed ${
                        paymentState === 'failed'
                          ? 'border-red-200 bg-red-50 text-red-800'
                          : paymentState === 'completed'
                            ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                            : 'border-amber-200 bg-amber-50 text-amber-900'
                      }`}
                    >
                      {paymentState === 'pending' && (
                        <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-amber-100">
                          <div className="h-full w-2/3 animate-pulse rounded-full bg-amber-500" />
                        </div>
                      )}
                      <p className="font-semibold">{paymentMessage}</p>
                      {paymentReference && (
                        <p className="mt-2 text-xs opacity-75">Reference: {paymentReference}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="mx-auto grid max-w-7xl gap-3 px-6 md:grid-cols-3">
          {journeySteps.map(([step, title, text]) => (
            <div key={step} className="border-t border-slate-200 pt-5">
              <div className="text-xs font-black uppercase tracking-[0.25em] text-amber-700">{step}</div>
              <h3 className="mt-2 text-2xl font-black text-slate-950">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="programme-cours" className="cnk-section bg-[#f8f4ea] py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="cnk-kicker mb-4 text-amber-700">Programme</p>
              <h2 className="text-4xl font-black text-slate-950 md:text-6xl">Un package qui se lit comme une trajectoire.</h2>
            </div>
            <div className="rounded-[1.4rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/6">
              <p className="text-lg leading-relaxed text-slate-700">
                Ce n'est pas une simple compilation de PDF. C'est un socle de progression pour passer de la logique de programmation aux systemes modernes: backend, donnees, securite, architecture et IA.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {coursePackage.map((course, index) => (
              <article key={course.slug} className="group relative overflow-hidden rounded-[1.45rem] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_32px_90px_rgba(15,23,42,0.14)]">
                <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#f59e0b,#10b981,#0f172a)]" />
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-slate-950 text-amber-300 shadow-xl shadow-slate-950/18">
                    <CourseIcon index={index} />
                  </div>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                    Module {index + 1}
                  </span>
                </div>
                <p className="mb-3 text-[10px] font-black uppercase tracking-[0.22em] text-amber-700">{course.level}</p>
                <h3 className="text-2xl font-black text-slate-950">{course.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">{course.summary}</p>
                <div className="mt-5 rounded-2xl border border-amber-100 bg-amber-50/70 p-4">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-800">Pourquoi c'est utile</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">{course.why}</p>
                </div>
                <ul className="mt-5 space-y-3">
                  {course.outcomes.map((outcome) => (
                    <li key={outcome} className="flex gap-3 text-sm leading-relaxed text-slate-600">
                      <span className="mt-0.5 grid h-5 w-5 flex-shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-700">
                        <CheckIcon />
                      </span>
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    setSelectedCourseSlug(course.slug);
                    document.getElementById('lecteur-cours')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-slate-900 transition hover:border-slate-950 hover:bg-slate-950 hover:text-white"
                >
                  {hasAccess ? 'Ouvrir ce cours' : 'Apercu du cours'}
                  <ArrowIcon />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-slate-950 py-20 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="cnk-kicker mb-4 text-amber-300">Experience</p>
            <h2 className="text-4xl font-black md:text-6xl">Vous achetez un raccourci serieux, pas une promesse vide.</h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/68">
              Le package est pense pour les profils qui veulent comprendre les fondations et accelerer sans se perdre dans des contenus disperses. Chaque manuel a une mission precise.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ['Clarte', 'Les notions sont organisees pour construire une base progressive.'],
              ['Pratique', 'Les cours restent proches des problemes reels de projet.'],
              ['Polyvalence', 'Le meme socle sert au web, a la data, a la securite et a l IA.'],
              ['Autonomie', 'Vous gardez les PDF pour relire, annoter et travailler a votre rythme.'],
            ].map(([title, text]) => (
              <div key={title} className="border border-white/10 bg-white/[0.06] p-6">
                <div className="mb-5 grid h-11 w-11 place-items-center rounded-2xl bg-amber-300 text-slate-950">
                  <CheckIcon />
                </div>
                <h3 className="text-2xl font-black">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/62">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="lecteur-cours" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="cnk-kicker mb-4 text-amber-700">Lecture</p>
              <h2 className="text-4xl font-black text-slate-950 md:text-5xl">{selectedCourse.title}</h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600">{selectedCourse.summary}</p>
            </div>
            <select
              value={selectedCourseSlug}
              onChange={(event) => setSelectedCourseSlug(event.target.value)}
              className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-900 outline-none focus:border-amber-500"
            >
              {coursePackage.map((course) => (
                <option key={course.slug} value={course.slug}>
                  {course.shortTitle}
                </option>
              ))}
            </select>
          </div>

          {hasAccess ? (
            <div className="grid gap-6 lg:grid-cols-[1fr_18rem]">
              <div className="overflow-hidden rounded-[1.4rem] border border-slate-200 bg-white shadow-2xl shadow-slate-900/10">
                <iframe
                  title={selectedCourse.title}
                  src={fileUrl(selectedCourse.slug)}
                  className="h-[72vh] min-h-[560px] w-full"
                />
              </div>
              <aside className="rounded-[1.4rem] border border-slate-200 bg-slate-50 p-5 shadow-xl shadow-slate-900/5">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">Actions</p>
                <a
                  href={fileUrl(selectedCourse.slug, true)}
                  download
                  className="cnk-button mt-5 w-full bg-slate-950 px-5 py-4 text-white hover:bg-amber-600"
                >
                  Telecharger ce PDF
                </a>
                <a
                  href={fileUrl(selectedCourse.slug)}
                  target="_blank"
                  rel="noreferrer"
                  className="cnk-button mt-3 w-full border border-slate-200 bg-white px-5 py-4 text-slate-950 hover:border-amber-400 hover:bg-amber-50"
                >
                  Ouvrir dans un onglet
                </a>
                <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-relaxed text-slate-600">
                  L'acces est conserve sur ce navigateur. Pour un autre appareil, relancez le paiement ou contactez le support avec votre reference.
                </div>
              </aside>
            </div>
          ) : (
            <div className="grid overflow-hidden rounded-[1.65rem] border border-slate-200 bg-slate-950 shadow-2xl shadow-slate-900/14 lg:grid-cols-[1fr_0.72fr]">
              <div className="relative min-h-[420px] p-8 text-white">
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:48px_48px] opacity-30" />
                <div className="relative z-10 max-w-xl">
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-white/72">
                    <LockIcon /> Lecteur protege
                  </div>
                  <h3 className="text-4xl font-black">Le contenu est pret. Il reste juste a activer l'acces.</h3>
                  <p className="mt-5 text-base leading-relaxed text-white/68">
                    Apres confirmation du paiement, cette zone devient un lecteur PDF complet avec bouton de telechargement pour chaque manuel.
                  </p>
                  <button
                    onClick={() => document.getElementById('achat-package')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                    className="cnk-button mt-7 bg-amber-400 px-7 py-4 text-slate-950 hover:bg-amber-300"
                  >
                    Debloquer le package
                  </button>
                </div>
              </div>
              <div className="bg-[#f8f4ea] p-6">
                <div className="rounded-[1.2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/10">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Apercu</span>
                    <span className="rounded-full bg-slate-950 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white">Verrouille</span>
                  </div>
                  <h4 className="text-3xl font-black text-slate-950">{selectedCourse.shortTitle}</h4>
                  <div className="mt-5 space-y-3">
                    {selectedCourse.outcomes.map((outcome) => (
                      <div key={outcome} className="rounded-2xl bg-slate-50 p-4 text-sm font-semibold leading-relaxed text-slate-600">
                        {outcome}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CoursePackage;
