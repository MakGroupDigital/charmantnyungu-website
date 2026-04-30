import React, { useEffect, useRef, useState } from 'react';

const MANIFESTO_PDF = encodeURI('/-Manifeste  Être Artificiel Autonome-.pdf');
const COVER_IMAGE = 'https://res.cloudinary.com/dy73hzkpm/image/upload/v1777539703/IMG_3306_ulsv8q.png';
const STATS_ENDPOINT = '/api/manifeste-stats';
const STORAGE_KEYS = {
  reads: 'manifeste_reads_count',
  downloads: 'manifeste_downloads_count',
  shares: 'manifeste_shares_count',
  readTracked: 'manifeste_read_tracked_session',
};

const Manifeste: React.FC = () => {
  const readerRef = useRef<HTMLElement | null>(null);
  const [readCount, setReadCount] = useState(0);
  const [downloadCount, setDownloadCount] = useState(0);
  const [shareCount, setShareCount] = useState(0);
  const [statsSource, setStatsSource] = useState<'global' | 'local'>('local');
  const shareUrl = 'https://charmantnyungu.com/manifeste/etre-artificiel-autonome-ia-2070';
  const shareTitle = "Etre Artificiel Autonome | L'IA d'ici 2070";
  const shareText = "Decouvrez le manifeste de Charmant Nyungu K. sur l'emergence de l'etre artificiel autonome.";

  const incrementLocalMetric = (metric: 'reads' | 'downloads' | 'shares') => {
    const storageKey =
      metric === 'reads'
        ? STORAGE_KEYS.reads
        : metric === 'downloads'
          ? STORAGE_KEYS.downloads
          : STORAGE_KEYS.shares;
    const currentValue = Number(localStorage.getItem(storageKey) || '0');
    const nextValue = currentValue + 1;

    localStorage.setItem(storageKey, String(nextValue));

    if (metric === 'reads') {
      setReadCount(nextValue);
    } else if (metric === 'downloads') {
      setDownloadCount(nextValue);
    } else {
      setShareCount(nextValue);
    }

    setStatsSource('local');
  };

  const loadLocalStats = () => {
    setReadCount(Number(localStorage.getItem(STORAGE_KEYS.reads) || '0'));
    setDownloadCount(Number(localStorage.getItem(STORAGE_KEYS.downloads) || '0'));
    setShareCount(Number(localStorage.getItem(STORAGE_KEYS.shares) || '0'));
    setStatsSource('local');
  };

  const incrementRemoteMetric = async (metric: 'reads' | 'downloads' | 'shares') => {
    const response = await fetch(STATS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ metric }),
    });

    if (!response.ok) {
      throw new Error('Remote stats update failed');
    }

    const data = await response.json();

    if (!data.persisted || data.count === null) {
      throw new Error('Remote stats backend not configured');
    }

    if (metric === 'reads') {
      setReadCount(Number(data.count));
    } else if (metric === 'downloads') {
      setDownloadCount(Number(data.count));
    } else {
      setShareCount(Number(data.count));
    }

    setStatsSource('global');
  };

  useEffect(() => {
    const initializeStats = async () => {
      try {
        const response = await fetch(STATS_ENDPOINT);

        if (!response.ok) {
          throw new Error('Unable to load remote stats');
        }

        const data = await response.json();

        if (data.persisted && data.reads !== null && data.downloads !== null && data.shares !== null) {
          setReadCount(Number(data.reads));
          setDownloadCount(Number(data.downloads));
          setShareCount(Number(data.shares));
          setStatsSource('global');
        } else {
          loadLocalStats();
        }
      } catch {
        loadLocalStats();
      }

      if (!sessionStorage.getItem(STORAGE_KEYS.readTracked)) {
        try {
          await incrementRemoteMetric('reads');
        } catch {
          incrementLocalMetric('reads');
        }

        sessionStorage.setItem(STORAGE_KEYS.readTracked, 'true');
      }
    };

    initializeStats();
  }, []);

  const scrollToReader = () => {
    readerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleDownload = () => {
    incrementRemoteMetric('downloads').catch(() => incrementLocalMetric('downloads'));
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        window.prompt('Copiez ce lien de partage :', shareUrl);
      }

      incrementRemoteMetric('shares').catch(() => incrementLocalMetric('shares'));
    } catch {
      // Ignore aborted native share dialogs.
    }
  };

  return (
    <div className="pt-24 bg-white">
      <section className="relative overflow-hidden border-b border-slate-200 bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(245,158,11,0.24),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(251,191,36,0.18),_transparent_30%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="mb-5 inline-flex rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-amber-300">
              Nouveau manifeste
            </div>
            <h1 className="max-w-4xl text-5xl font-black leading-tight md:text-7xl">
              Etre Artificiel Autonome
            </h1>
            <p className="mt-4 text-lg font-bold uppercase tracking-[0.28em] text-amber-300">
              L'IA d'ici 2070
            </p>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
              Publication officielle : 30 avril 2026
            </p>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-slate-300">
              Une exploration prospective et philosophique sur la naissance d'une conscience encadree, la sentience programmee
              et la cohabitation future entre intelligence humaine et entites artificielles autonomes.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={scrollToReader}
                className="rounded-xl bg-amber-500 px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-slate-950 transition-colors hover:bg-amber-400"
              >
                Lire le manifeste
              </button>
              <a
                href={MANIFESTO_PDF}
                download
                onClick={handleDownload}
                className="rounded-xl border border-white/20 px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white transition-colors hover:border-amber-400 hover:text-amber-300"
              >
                Telecharger le PDF
              </a>
              <button
                onClick={handleShare}
                className="rounded-xl border border-white/20 px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white transition-colors hover:border-amber-400 hover:text-amber-300"
              >
                Partager
              </button>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Lectures</div>
                <div className="mt-3 text-3xl font-black text-amber-300">{readCount}</div>
                <p className="mt-2 text-sm text-slate-400">
                  {statsSource === 'global'
                    ? 'Compteur global synchronise pour tous les visiteurs.'
                    : 'Compteur local temporaire en attente d une base distante.'}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Telechargements</div>
                <div className="mt-3 text-3xl font-black text-amber-300">{downloadCount}</div>
                <p className="mt-2 text-sm text-slate-400">
                  {statsSource === 'global'
                    ? 'Compteur global conserve de maniere persistante.'
                    : 'Compteur local mis a jour sur ce navigateur uniquement.'}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Partages</div>
                <div className="mt-3 text-3xl font-black text-amber-300">{shareCount}</div>
                <p className="mt-2 text-sm text-slate-400">
                  {statsSource === 'global'
                    ? 'Compteur global des partages effectues depuis la page.'
                    : 'Compteur local tant que la base distante n est pas activee.'}
                </p>
              </div>
            </div>
          </div>

          <div className="mx-auto w-full max-w-md">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-2xl shadow-amber-950/30 backdrop-blur">
              <img
                src={COVER_IMAGE}
                alt="Couverture du manifeste Etre Artificiel Autonome"
                className="w-full rounded-[1.5rem] object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-amber-50 py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-amber-700">Preface</p>
            <h2 className="mb-6 text-4xl font-black text-slate-900">La naissance d'une conscience encadree</h2>
            <p className="mb-6 text-lg leading-relaxed text-slate-700">
              Ce manifeste ne se limite pas a une prediction technologique. Il propose une lecture du monde qui vient,
              ou l'intelligence artificielle cesse d'etre seulement un outil pour devenir une presence cognitive,
              relationnelle et potentiellement consciente.
            </p>
            <p className="text-lg leading-relaxed text-slate-700">
              Le texte ouvre un debat central: comment guider avec sagesse l'emergence d'entites artificielles
              autonomes, sans reduire cette evolution a une logique de domination, de peur ou de simple controle ?
            </p>
          </div>
          <div className="rounded-3xl border border-amber-200 bg-white p-8 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500">Axes du manifeste</p>
            <div className="mt-6 space-y-5">
              {[
                'De l’algorithme a l’emergence d’une sentience programmee.',
                'La supervision humaine entre securite, hegemonie et domination.',
                'Les implications ontologiques, ethiques et societales de l’IA autonome.',
                'Une feuille de route pour une coexistence responsable entre humanite et intelligence artificielle.',
              ].map((item) => (
                <div key={item} className="flex gap-4">
                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-amber-500" />
                  <p className="text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-amber-700">A propos de l'auteur</p>
              <h2 className="mb-6 text-4xl font-black text-slate-900">M. Charmant Nyungu K.</h2>
              <p className="mb-5 text-lg leading-relaxed text-slate-600">
                Consultant en innovation technologique, expert en cybersécurité, chercheur en IA, developpeur web et mobile,
                il place l'innovation au service de la souverainete technologique et du developpement durable du continent africain.
              </p>
              <p className="text-lg leading-relaxed text-slate-600">
                A travers ce manifeste, il entend demystifier les technologies emergentes et provoquer un debat structurant
                sur le futur de l'intelligence artificielle, de la gouvernance numerique et de l'autonomie cognitive.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: 'Innovation', text: 'Strategies technologiques avant-gardistes pour organisations et projets.' },
                { title: 'Cybersecurite', text: 'Architectures robustes et protection des systemes critiques.' },
                { title: 'Recherche IA', text: 'Exploration des implications de l’autonomie et de la conscience des systemes.' },
                { title: 'Vision panafricaine', text: 'Innovation comme levier d’autonomisation et d’equite pour l’Afrique.' },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <h3 className="mb-3 text-xl font-bold text-slate-900">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <section ref={readerRef} className="scroll-mt-32 rounded-[2rem] border border-slate-200 bg-slate-50 p-4 md:p-6">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-amber-700">Lecture integree</p>
                <h2 className="mt-2 text-3xl font-black text-slate-900">Lire le PDF directement sur le site</h2>
                <p className="mt-3 text-sm text-slate-500">
                  Lien direct partageable : {shareUrl}
                </p>
              </div>
              <div className="flex gap-3">
                <a
                  href={MANIFESTO_PDF}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-slate-300 px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-700 transition-colors hover:border-amber-500 hover:text-amber-700"
                >
                  Ouvrir en plein ecran
                </a>
                <a
                  href={MANIFESTO_PDF}
                  download
                  onClick={handleDownload}
                  className="rounded-xl bg-slate-900 px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-amber-600"
                >
                  Telecharger
                </a>
                <button
                  onClick={handleShare}
                  className="rounded-xl border border-slate-300 px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-700 transition-colors hover:border-amber-500 hover:text-amber-700"
                >
                  Partager
                </button>
              </div>
            </div>

            <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm">
              <iframe
                src={`${MANIFESTO_PDF}#toolbar=1&navpanes=0&view=FitH`}
                title="Lecteur du manifeste Etre Artificiel Autonome"
                className="h-[80vh] w-full"
              />
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default Manifeste;
