import React, { useEffect, useRef, useState } from 'react';
import { onValue, ref, runTransaction } from 'firebase/database';
import { ensureAnonymousUser, realtimeDatabase } from '../services/firebase';

const RESEARCH_PDF = '/recherche/pe2m2e-dossier-technique.pdf';
const RESEARCH_SOURCE = '/recherche/pe2m2e-dossier-technique-source.md';
const SHARE_URL = 'https://charmantnyungu.com/recherche/pe2m2e';
const STATS_PATH = 'pe2m2eStats';
const STORAGE_KEYS = {
  reads: 'pe2m2e_reads_count',
  downloads: 'pe2m2e_downloads_count',
  shares: 'pe2m2e_shares_count',
};

type ResearchMetric = 'reads' | 'downloads' | 'shares';
type StatsSource = 'global' | 'local' | 'syncing';
type ReaderMode = 'pdf' | 'text';
type ResearchBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'code'; text: string }
  | { type: 'table'; rows: string[][] }
  | { type: 'image'; src: string; alt: string };
type ResearchPage = {
  title: string;
  blocks: ResearchBlock[];
};

const languages = [
  { code: 'fr', label: 'Français original' },
  { code: 'en', label: 'Anglais' },
  { code: 'es', label: 'Espagnol' },
  { code: 'pt', label: 'Portugais' },
  { code: 'ar', label: 'Arabe' },
  { code: 'de', label: 'Allemand' },
  { code: 'it', label: 'Italien' },
  { code: 'sw', label: 'Swahili' },
  { code: 'ln', label: 'Lingala' },
];

const safeStorage = {
  get(key: string) {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string) {
    try {
      window.localStorage.setItem(key, value);
      return true;
    } catch {
      return false;
    }
  },
  remove(key: string) {
    try {
      window.localStorage.removeItem(key);
    } catch {
      // Storage can be unavailable in private or restricted browser contexts.
    }
  },
};

const isResearchPageArray = (value: unknown): value is ResearchPage[] => {
  return Array.isArray(value) && value.every((page) => {
    if (!page || typeof page !== 'object') return false;
    const candidate = page as Partial<ResearchPage>;
    return typeof candidate.title === 'string' && Array.isArray(candidate.blocks);
  });
};

const MetricIcon = ({ type }: { type: ResearchMetric }) => {
  if (type === 'downloads') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path d="M12 3v11m0 0 4-4m-4 4-4-4M5 19h14" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    );
  }

  if (type === 'shares') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path d="M8 12h8M16 6l5 6-5 6M3 5v14" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
};

const parseResearchMarkdown = (markdown: string): ResearchPage[] => {
  const pageMatches = [...markdown.matchAll(/## Page \d+ - ([^\n]+)\n([\s\S]*?)(?=\n\\pagebreak\n\n## Page |\s*$)/g)];

  return pageMatches.map((match) => {
    const title = match[1].trim();
    const body = match[2] || '';
    const lines = body.split(/\r?\n/);
    const blocks: ResearchBlock[] = [];
    let paragraph: string[] = [];
    let tableRows: string[][] = [];
    let code: string[] = [];
    let inCode = false;

    const flushParagraph = () => {
      const text = paragraph.join(' ').replace(/^>\s*/, '').replace(/<br\s*\/?>/gi, '\n').trim();
      if (text) {
        blocks.push({ type: 'paragraph', text });
      }
      paragraph = [];
    };

    const flushTable = () => {
      if (tableRows.length) {
        blocks.push({ type: 'table', rows: tableRows });
      }
      tableRows = [];
    };

    const flushCode = () => {
      const text = code.join('\n').trim();
      if (text) {
        blocks.push({ type: 'code', text });
      }
      code = [];
    };

    for (const rawLine of lines) {
      const line = rawLine.trim();

      if (line.startsWith('```')) {
        if (inCode) {
          inCode = false;
          flushCode();
        } else {
          flushParagraph();
          flushTable();
          inCode = true;
        }
        continue;
      }

      if (inCode) {
        code.push(rawLine);
        continue;
      }

      if (!line || line === '\\pagebreak') {
        flushParagraph();
        continue;
      }

      if (line.startsWith('|')) {
        flushParagraph();
        const cells = line
          .split('|')
          .slice(1, -1)
          .map((cell) => cell.trim());

        if (!cells.every((cell) => /^-+$/.test(cell))) {
          tableRows.push(cells);
        }
        continue;
      }

      flushTable();

      const imageMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (imageMatch) {
        blocks.push({
          type: 'image',
          alt: imageMatch[1],
          src: `/recherche/${imageMatch[2]}`,
        });
        continue;
      }

      paragraph.push(line);
    }

    flushParagraph();
    flushTable();
    flushCode();

    return { title, blocks };
  });
};

const translateText = async (text: string, targetLanguage: string) => {
  if (!text.trim() || targetLanguage === 'fr') {
    return text;
  }

  if (text.length > 3200) {
    const chunks: string[] = [];
    let current = '';

    text.split(/(\s+)/).forEach((part) => {
      if ((current + part).length > 3200) {
        chunks.push(current);
        current = part;
      } else {
        current += part;
      }
    });

    if (current) {
      chunks.push(current);
    }

    const translatedChunks = [];

    for (const chunk of chunks) {
      translatedChunks.push(await translateText(chunk, targetLanguage));
    }

    return translatedChunks.join('');
  }

  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=fr&tl=${targetLanguage}&dt=t&q=${encodeURIComponent(text)}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Translation request failed');
  }

  const payload = await response.json();
  return Array.isArray(payload?.[0])
    ? payload[0].map((entry: unknown[]) => entry?.[0] || '').join('')
    : text;
};

const translatePage = async (page: ResearchPage, targetLanguage: string): Promise<ResearchPage> => {
  return {
    title: await translateText(page.title, targetLanguage),
    blocks: await Promise.all(
      page.blocks.map(async (block) => {
        if (block.type === 'paragraph') {
          return { ...block, text: await translateText(block.text, targetLanguage) };
        }

        if (block.type === 'table') {
          return {
            ...block,
            rows: await Promise.all(
              block.rows.map((row) => Promise.all(row.map((cell) => translateText(cell, targetLanguage))))
            ),
          };
        }

        return block;
      })
    ),
  };
};

const Recherche: React.FC = () => {
  const readerSectionRef = useRef<HTMLElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const readTrackedRef = useRef(false);
  const [readCount, setReadCount] = useState(0);
  const [downloadCount, setDownloadCount] = useState(0);
  const [shareCount, setShareCount] = useState(0);
  const [statsSource, setStatsSource] = useState<StatsSource>('syncing');
  const [selectedLanguage, setSelectedLanguage] = useState('fr');
  const [readerMode, setReaderMode] = useState<ReaderMode>('pdf');
  const [documentPages, setDocumentPages] = useState<ResearchPage[]>([]);
  const [translatedPages, setTranslatedPages] = useState<ResearchPage[]>([]);
  const [translationProgress, setTranslationProgress] = useState(0);
  const [translationError, setTranslationError] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [notice, setNotice] = useState('');

  const statsMessage =
    statsSource === 'global'
      ? 'Compteur global synchronise.'
      : statsSource === 'syncing'
        ? 'Synchronisation en cours.'
        : 'Compteur local actif.';
  const visiblePages = translatedPages.length ? translatedPages : documentPages;

  const incrementLocalMetric = (metric: ResearchMetric) => {
    const storageKey =
      metric === 'reads'
        ? STORAGE_KEYS.reads
        : metric === 'downloads'
          ? STORAGE_KEYS.downloads
          : STORAGE_KEYS.shares;
    const nextValue = Number(localStorage.getItem(storageKey) || '0') + 1;

    localStorage.setItem(storageKey, String(nextValue));

    if (metric === 'reads') setReadCount(nextValue);
    if (metric === 'downloads') setDownloadCount(nextValue);
    if (metric === 'shares') setShareCount(nextValue);

    setStatsSource('local');
  };

  const setMetricCount = (metric: ResearchMetric, count: number) => {
    if (metric === 'reads') setReadCount(count);
    if (metric === 'downloads') setDownloadCount(count);
    if (metric === 'shares') setShareCount(count);
    setStatsSource('global');
  };

  const loadLocalStats = () => {
    setReadCount(Number(localStorage.getItem(STORAGE_KEYS.reads) || '0'));
    setDownloadCount(Number(localStorage.getItem(STORAGE_KEYS.downloads) || '0'));
    setShareCount(Number(localStorage.getItem(STORAGE_KEYS.shares) || '0'));
    setStatsSource('local');
  };

  const loadApiStats = async () => {
    const response = await fetch('/api/pe2m2e-stats', {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Remote stats request failed');
    }

    const stats = await response.json();
    if (!stats.persisted) {
      throw new Error('Remote stats are not persisted');
    }

    setReadCount(Number(stats.reads || 0));
    setDownloadCount(Number(stats.downloads || 0));
    setShareCount(Number(stats.shares || 0));
    setStatsSource('global');
  };

  const incrementApiMetric = async (metric: ResearchMetric) => {
    const response = await fetch('/api/pe2m2e-stats', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ metric }),
    });

    if (!response.ok) {
      throw new Error('Remote stats update failed');
    }

    const stats = await response.json();
    if (!stats.persisted || typeof stats.count !== 'number') {
      throw new Error('Remote stats update was not persisted');
    }

    setMetricCount(metric, Number(stats.count || 0));
  };

  const incrementRemoteMetric = async (metric: ResearchMetric) => {
    try {
      await ensureAnonymousUser();

      const metricRef = ref(realtimeDatabase, `${STATS_PATH}/${metric}`);
      const result = await runTransaction(metricRef, (currentValue) => Number(currentValue || 0) + 1);

      if (!result.committed) {
        throw new Error('Firebase stats update was not committed');
      }

      setMetricCount(metric, Number(result.snapshot.val() || 0));
    } catch (error) {
      throw error;
    }
  };

  const trackMetric = (metric: ResearchMetric) => {
    incrementRemoteMetric(metric)
      .catch(() => incrementApiMetric(metric))
      .catch(() => incrementLocalMetric(metric));
  };

  useEffect(() => {
    const statsRef = ref(realtimeDatabase, STATS_PATH);
    ensureAnonymousUser().catch(() => undefined);

    const unsubscribe = onValue(
      statsRef,
      (snapshot) => {
        const stats = snapshot.val() || {};
        setReadCount(Number(stats.reads || 0));
        setDownloadCount(Number(stats.downloads || 0));
        setShareCount(Number(stats.shares || 0));
        setStatsSource('global');
      },
      () => {
        loadApiStats().catch(() => loadLocalStats());
      }
    );

    if (!readTrackedRef.current) {
      readTrackedRef.current = true;
      trackMetric('reads');
    }

    return unsubscribe;
  }, []);

  useEffect(() => {
    let ignore = false;

    fetch(RESEARCH_SOURCE)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to load research source');
        }
        return response.text();
      })
      .then((markdown) => {
        if (ignore) return;
        setDocumentPages(parseResearchMarkdown(markdown));
        setTranslationProgress(100);
      })
      .catch(() => {
        if (ignore) return;
        setTranslationError("Impossible de charger la version texte du dossier pour la traduction integree.");
      });

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;

    const translateDocument = async () => {
      if (!documentPages.length) return;

      setTranslationError('');

      if (selectedLanguage === 'fr') {
        setTranslatedPages([]);
        setTranslationProgress(100);
        setIsTranslating(false);
        setNotice('Version originale affichee dans le lecteur integre.');
        return;
      }

      setReaderMode('text');
      const cacheKey = `pe2m2e_translation_${selectedLanguage}_v2`;
      const cached = localStorage.getItem(cacheKey);

      if (cached) {
        try {
          const pages = JSON.parse(cached) as ResearchPage[];
          setTranslatedPages(pages);
          setTranslationProgress(100);
          setIsTranslating(false);
          setNotice('Traduction chargee depuis le cache local.');
          return;
        } catch {
          localStorage.removeItem(cacheKey);
        }
      }

      setIsTranslating(true);
      setTranslationProgress(0);
      setTranslatedPages(documentPages);
      setNotice('Traduction integree en cours dans le lecteur.');

      try {
        const nextPages: ResearchPage[] = [];

        for (let index = 0; index < documentPages.length; index += 1) {
          const translatedPage = await translatePage(documentPages[index], selectedLanguage);
          nextPages.push(translatedPage);

          if (ignore) return;

          setTranslatedPages([...nextPages, ...documentPages.slice(index + 1)]);
          setTranslationProgress(Math.round(((index + 1) / documentPages.length) * 100));
        }

        if (ignore) return;

        localStorage.setItem(cacheKey, JSON.stringify(nextPages));
        setIsTranslating(false);
        setNotice('Traduction appliquee dans le lecteur.');
      } catch {
        if (ignore) return;
        setIsTranslating(false);
        setTranslationError("La traduction gratuite n'a pas repondu. Le document original reste disponible.");
      }
    };

    translateDocument();

    return () => {
      ignore = true;
    };
  }, [documentPages, selectedLanguage]);

  const scrollToReader = () => {
    readerSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleDownload = () => {
    trackMetric('downloads');
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'P-E2M2E | Dossier technique',
          text: 'Lire la specification technique P-E2M2E de Charmant Nyungu K.',
          url: SHARE_URL,
        });
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(SHARE_URL);
        setNotice('Lien copie dans le presse-papiers.');
      } else {
        window.prompt('Copiez ce lien de partage :', SHARE_URL);
      }

      trackMetric('shares');
    } catch {
      // Native share dialogs can be cancelled by the user.
    }
  };

  const handleFullscreen = async () => {
    const target = readerMode === 'pdf' ? iframeRef.current : readerSectionRef.current;

    try {
      if (target?.requestFullscreen) {
        await target.requestFullscreen();
        return;
      }
    } catch {
      // Browser security can reject iframe fullscreen; the new tab remains available.
    }

    window.open(RESEARCH_PDF, '_blank', 'noopener,noreferrer');
  };

  const metrics = [
    { key: 'reads' as const, label: 'Lectures', value: readCount },
    { key: 'downloads' as const, label: 'Telechargements', value: downloadCount },
    { key: 'shares' as const, label: 'Partages', value: shareCount },
  ];
  const activeLanguage = languages.find((language) => language.code === selectedLanguage)?.label || 'Français original';
  const renderBlock = (block: ResearchBlock, blockIndex: number) => {
    if (block.type === 'paragraph') {
      return (
        <p key={blockIndex} className="text-[0.98rem] leading-8 text-slate-700">
          {block.text}
        </p>
      );
    }

    if (block.type === 'code') {
      return (
        <pre key={blockIndex} className="overflow-x-auto border border-slate-200 bg-slate-950 p-4 text-xs leading-6 text-cyan-50">
          <code>{block.text}</code>
        </pre>
      );
    }

    if (block.type === 'table') {
      return (
        <div key={blockIndex} className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className={rowIndex === 0 ? 'bg-slate-950 text-white' : 'border-b border-slate-200'}>
                  {row.map((cell, cellIndex) => {
                    const Cell = rowIndex === 0 ? 'th' : 'td';
                    return (
                      <Cell key={cellIndex} className="border border-slate-200 px-4 py-3 align-top">
                        {cell}
                      </Cell>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    return (
      <figure key={blockIndex} className="border border-slate-200 bg-slate-50 p-3">
        <img src={block.src} alt={block.alt} className="w-full object-contain" loading="lazy" />
        <figcaption className="mt-2 text-center text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
          {block.alt}
        </figcaption>
      </figure>
    );
  };

  return (
    <div className="bg-white pt-24">
      <section className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(135deg,#f8fafc_0%,#ffffff_48%,#dbeafe_100%)]">
        <div className="absolute inset-0 opacity-60">
          <div className="h-full w-full bg-[linear-gradient(90deg,rgba(15,23,42,0.045)_1px,transparent_1px),linear-gradient(180deg,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:54px_54px]" />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="cnk-kicker mb-5 text-cyan-800">Recherche proprietaire</p>
            <h1 className="text-5xl font-black leading-tight text-slate-950 md:text-7xl">P-E2M2E</h1>
            <p className="mt-4 text-sm font-black uppercase tracking-[0.3em] text-amber-700">
              Physicalized End-to-Middle-to-End Cryptography
            </p>
            <div className="mt-8 max-w-3xl space-y-5 text-lg leading-relaxed text-slate-700">
              <p>
                Imaginez un monde ou vos donnees ne sont lisibles que par vous, parce qu'elles perdent leur sens
                lorsqu'elles quittent votre temps, votre lieu et votre etat physique.
              </p>
              <p>
                Imaginez que les serveurs les plus sophistiques stockent vos fragments sans jamais voir le message,
                sans jamais comprendre sa forme, sans jamais posseder la possibilite de le reconstituer.
              </p>
              <p className="font-semibold text-slate-950">
                P-E2M2E ne s'integre pas simplement a la confidentialite existante: il redefinit l'acces, la
                manipulation et l'existence meme de la donnee.
              </p>
            </div>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={scrollToReader}
                className="cnk-button bg-slate-950 px-7 text-white shadow-lg shadow-slate-950/10 hover:bg-cyan-800"
              >
                <span className="mr-3 grid h-5 w-5 place-items-center">
                  <MetricIcon type="reads" />
                </span>
                Lire la these
              </button>
              <a
                href={RESEARCH_PDF}
                download
                onClick={handleDownload}
                className="cnk-button border border-slate-300 bg-white px-7 text-slate-900 hover:border-amber-500 hover:text-amber-700"
              >
                <span className="mr-3 grid h-5 w-5 place-items-center">
                  <MetricIcon type="downloads" />
                </span>
                Lecture hors ligne
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="grid gap-4 sm:grid-cols-3">
              {metrics.map((metric) => (
                <div key={metric.key} className="border border-slate-200 bg-white/85 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-white">
                    <MetricIcon type={metric.key} />
                  </div>
                  <div className="text-xs font-black uppercase tracking-[0.22em] text-slate-500">{metric.label}</div>
                  <div className="mt-3 text-4xl font-black text-slate-950">{metric.value}</div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500">{statsMessage}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_24px_80px_rgba(15,23,42,0.16)]">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-cyan-300">These technique</p>
              <h2 className="mt-4 text-3xl font-bold">Une donnee qui existe seulement dans son contexte.</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {['Temps', 'Localisation', 'Entropie'].map((item) => (
                  <div key={item} className="border border-white/10 bg-white/[0.06] px-4 py-3 text-xs font-black uppercase tracking-[0.2em] text-white/76">
                    {item}
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm leading-relaxed text-white/68">
                Le protocole transforme le fichier en potentiel fragmentaire: hors contexte, les fragments deviennent
                inexploitables; dans le contexte exact, ils cristallisent en information lisible.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="cnk-kicker mb-4 text-amber-700">Presentation</p>
            <h2 className="text-4xl font-black text-slate-950 md:text-5xl">La these P-E2M2E sur le site officiel.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: 'Cloud aveugle',
                text: 'Le serveur orchestre des fragments et des tags ephemeres sans posseder le message clair.',
              },
              {
                title: 'Annihilation contextuelle',
                text: "La donnee cesse d'etre reconstructible lorsque temps, lieu ou etat ambiant divergent.",
              },
              {
                title: 'Cristallisation differee',
                text: 'Le fichier redevient information seulement sur le terminal autorise, dans la fenetre physique prevue.',
              },
              {
                title: 'Lecture souveraine',
                text: 'Le dossier est consultable, partageable, telechargeable et traduisible directement depuis cette page.',
              },
            ].map((item) => (
              <div key={item.title} className="border border-slate-200 bg-slate-50 p-6">
                <h3 className="mb-3 text-xl font-bold text-slate-950">{item.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={readerSectionRef} className="scroll-mt-32 bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="cnk-kicker mb-4 text-cyan-800">Lecteur de recherche</p>
              <h2 className="text-4xl font-black text-slate-950">Dossier technique P-E2M2E</h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">
                Specification technique et architecturale, Volume I, par Charmant Nyungu K.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                { mode: 'pdf' as const, label: 'PDF original' },
                { mode: 'text' as const, label: 'Document traduit' },
              ].map((item) => (
                <button
                  key={item.mode}
                  onClick={() => setReaderMode(item.mode)}
                  className={`cnk-button border px-4 ${
                    readerMode === item.mode
                      ? 'border-slate-950 bg-slate-950 text-white'
                      : 'border-slate-300 bg-white text-slate-700 hover:border-cyan-700 hover:text-cyan-800'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={handleFullscreen}
                className="cnk-button border border-slate-300 bg-white px-4 text-slate-700 hover:border-cyan-700 hover:text-cyan-800"
              >
                Plein ecran
              </button>
              <button
                onClick={handleShare}
                className="cnk-button border border-slate-300 bg-white px-4 text-slate-700 hover:border-amber-500 hover:text-amber-700"
              >
                <span className="mr-2 grid h-5 w-5 place-items-center">
                  <MetricIcon type="shares" />
                </span>
                Partager
              </button>
              <a
                href={RESEARCH_PDF}
                download
                onClick={handleDownload}
                className="cnk-button bg-slate-950 px-4 text-white hover:bg-amber-600"
              >
                <span className="mr-2 grid h-5 w-5 place-items-center">
                  <MetricIcon type="downloads" />
                </span>
                Telecharger
              </a>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1fr_18rem]">
            <div className="overflow-hidden border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.10)]">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-3">
                <div className="text-xs font-black uppercase tracking-[0.22em] text-slate-500">
                  {readerMode === 'pdf' ? 'PDF original' : `Document traduit - ${activeLanguage}`}
                </div>
                {notice && <div className="text-xs font-bold text-cyan-800">{notice}</div>}
              </div>
              {readerMode === 'pdf' ? (
                <iframe
                  ref={iframeRef}
                  src={`${RESEARCH_PDF}#toolbar=1&navpanes=0&view=FitH`}
                  title="Lecteur PDF du dossier technique P-E2M2E"
                  className="h-[82vh] w-full bg-white"
                  allow="fullscreen"
                />
              ) : (
                <div className="h-[88vh] overflow-y-auto bg-slate-100 px-3 py-5 md:px-8">
                  <div className="mx-auto max-w-4xl space-y-5">
                    {visiblePages.length ? (
                      visiblePages.map((page, pageIndex) => (
                        <article key={`${page.title}-${pageIndex}`} className="border border-slate-200 bg-white p-5 shadow-sm md:p-8">
                          <div className="mb-5 flex flex-col gap-2 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
                            <h3 className="text-2xl font-black text-slate-950">{page.title}</h3>
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-cyan-800">
                              Page {pageIndex + 1}
                            </span>
                          </div>
                          <div className="space-y-5">
                            {page.blocks.map((block, blockIndex) => renderBlock(block, blockIndex))}
                          </div>
                        </article>
                      ))
                    ) : (
                      <div className="border border-slate-200 bg-white p-8 text-sm font-bold text-slate-600">
                        Chargement du document texte.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <aside className="border border-slate-200 bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-800">Traduction</p>
              <h3 className="mt-3 text-2xl font-bold text-slate-950">Traduction integree</h3>
              <div className="mt-5">
                <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-500" htmlFor="language-select">
                  Langue
                </label>
                <select
                  id="language-select"
                  value={selectedLanguage}
                  onChange={(event) => setSelectedLanguage(event.target.value)}
                  className="w-full border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-900 outline-none transition-colors focus:border-cyan-700"
                >
                  {languages.map((language) => (
                    <option key={language.code} value={language.code}>
                      {language.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-4 border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                    Progression
                  </span>
                  <span className="text-sm font-black text-slate-950">{translationProgress}%</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden bg-white">
                  <div
                    className="h-full bg-cyan-700 transition-all duration-300"
                    style={{ width: `${translationProgress}%` }}
                  />
                </div>
                <p className="mt-3 text-xs leading-relaxed text-slate-500">
                  {isTranslating
                    ? 'La traduction se remplace progressivement dans le lecteur.'
                    : selectedLanguage === 'fr'
                      ? 'Le lecteur affiche la version originale.'
                      : 'La traduction est appliquee dans le lecteur texte.'}
                </p>
              </div>
              {translationError && (
                <p className="mt-4 border border-red-200 bg-red-50 p-3 text-xs font-bold leading-relaxed text-red-700">
                  {translationError}
                </p>
              )}
              <p className="mt-4 text-xs leading-relaxed text-slate-500">
                Le PDF original reste disponible; la traduction s'applique au lecteur texte reconstruit depuis le dossier source.
              </p>

              <div className="mt-8 border-t border-slate-200 pt-5">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-amber-700">Actions</p>
                <div className="mt-4 grid gap-2">
                  <a
                    href={RESEARCH_PDF}
                    target="_blank"
                    rel="noreferrer"
                    className="border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition-colors hover:border-cyan-700 hover:text-cyan-800"
                  >
                    Ouvrir le PDF
                  </a>
                  <a
                    href={RESEARCH_SOURCE}
                    target="_blank"
                    rel="noreferrer"
                    className="border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition-colors hover:border-cyan-700 hover:text-cyan-800"
                  >
                    Source texte
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Recherche;
