import React, { useEffect, useMemo, useRef, useState } from 'react';

type Mode = 'ia' | 'data' | 'cyber' | 'gov';
type Page = 'home' | 'cockpit' | 'immersions' | 'architecte' | 'contact';
type Challenge = 'institution' | 'startup' | 'formation' | 'audit';

type ModeConfig = {
  label: string;
  short: string;
  title: string;
  signal: string;
  output: string;
  accent: string;
  verbs: string[];
};

const modes: Record<Mode, ModeConfig> = {
  ia: {
    label: 'Intelligence artificielle',
    short: 'IA',
    title: 'IA utile, explicable et gouvernable',
    signal: 'Automatiser, assister, scorer, prioriser.',
    output: 'Un assistant metier capable de reduire la charge operationnelle sans retirer la responsabilite humaine.',
    accent: '#22d3ee',
    verbs: ['Classifier', 'Predire', 'Assister', 'Verifier']
  },
  data: {
    label: 'Data decisionnelle',
    short: 'Data',
    title: 'Donnees propres, decisions rapides',
    signal: 'Collecter, nettoyer, visualiser, piloter.',
    output: 'Une chaine data qui transforme des signaux disperses en indicateurs utiles pour les dirigeants.',
    accent: '#f59e0b',
    verbs: ['Structurer', 'Mesurer', 'Comparer', 'Alerter']
  },
  cyber: {
    label: 'Cybersecurite',
    short: 'Cyber',
    title: 'Protection claire des actifs critiques',
    signal: 'Cartographier, durcir, sensibiliser, surveiller.',
    output: 'Une posture cyber lisible, adaptee aux contraintes terrain et aux donnees sensibles.',
    accent: '#34d399',
    verbs: ['Detecter', 'Isoler', 'Former', 'Reagir']
  },
  gov: {
    label: 'GovTech',
    short: 'GovTech',
    title: 'Services publics numeriques durables',
    signal: 'Cadrer, interoperer, gouverner, transmettre.',
    output: 'Une architecture institutionnelle qui tient compte des processus, des citoyens et de la souverainete.',
    accent: '#a78bfa',
    verbs: ['Cadrer', 'Connecter', 'Tracer', 'Transmettre']
  }
};

const challenges: Record<Challenge, {
  label: string;
  prompt: string;
  need: string;
  action: string;
}> = {
  institution: {
    label: 'Institution',
    prompt: 'Moderniser un service sensible sans perdre le controle.',
    need: 'gouvernance, adoption, continuite',
    action: 'Je recommande une trajectoire en 3 vagues : diagnostic, prototype ferme, transfert aux equipes.'
  },
  startup: {
    label: 'Startup',
    prompt: 'Passer d une idee a un produit credible.',
    need: 'prototype, traction, mesure',
    action: 'Je pousserais un MVP tres focalise avec indicateurs d usage et boucle de feedback rapide.'
  },
  formation: {
    label: 'Formation',
    prompt: 'Faire monter une equipe en competence.',
    need: 'pedagogie, outils, autonomie',
    action: 'Je proposerais un laboratoire pratique : cas reels, livrables, rituels et documentation vivante.'
  },
  audit: {
    label: 'Audit',
    prompt: 'Comprendre les failles avant d investir.',
    need: 'risques, priorites, arbitrage',
    action: 'Je commencerais par une cartographie rapide des risques et un plan de corrections par impact.'
  }
};

const nav: Array<{ id: Page; label: string }> = [
  { id: 'home', label: 'Accueil' },
  { id: 'cockpit', label: 'Cockpit' },
  { id: 'immersions', label: 'Immersions' },
  { id: 'architecte', label: 'Architecte' },
  { id: 'contact', label: 'Contact' }
];

const missionSteps = [
  { title: 'Ecouter', body: 'Lecture du terrain, des contraintes, des acteurs et des points de friction.' },
  { title: 'Modeliser', body: 'Traduction du probleme en systeme : donnees, roles, risques, parcours.' },
  { title: 'Prototyper', body: 'Creation d une preuve utilisable qui permet de voir, tester et corriger.' },
  { title: 'Transmettre', body: 'Formation et documentation pour rendre l organisation autonome.' }
];

const playbooks = [
  'Dashboard dirigeant',
  'Assistant IA interne',
  'Cartographie cyber',
  'Portail de service',
  'Programme de formation',
  'Audit data express'
];

function App() {
  const getPageFromHash = (): Page => {
    const hash = window.location.hash.replace('#', '') as Page;
    return nav.some((item) => item.id === hash) ? hash : 'home';
  };

  const [page, setPage] = useState<Page>(() => getPageFromHash());
  const [mode, setMode] = useState<Mode>('ia');
  const [challenge, setChallenge] = useState<Challenge>('institution');
  const [intensity, setIntensity] = useState(64);
  const [selectedSteps, setSelectedSteps] = useState<string[]>(['Dashboard dirigeant', 'Assistant IA interne']);
  const [activeNode, setActiveNode] = useState(0);
  const [pulse, setPulse] = useState(0);
  const active = modes[mode];
  const context = challenges[challenge];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setPulse((value) => value + 1);
      setActiveNode((value) => (value + 1) % 5);
    }, 2600);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const syncPage = () => {
      setPage(getPageFromHash());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', syncPage);
    window.addEventListener('popstate', syncPage);
    return () => {
      window.removeEventListener('hashchange', syncPage);
      window.removeEventListener('popstate', syncPage);
    };
  }, []);

  const blueprint = useMemo(() => {
    const speed = Math.max(10, 82 - intensity);
    const maturity = Math.min(98, Math.round(intensity * 1.12));
    const risk = Math.max(8, 70 - Math.round(intensity * 0.58));
    const budget = selectedSteps.length * 12 + Math.round(intensity / 8);

    return [
      ['Maturite cible', `${maturity}%`],
      ['Prototype', `${speed} jours`],
      ['Risque residuel', `${risk}%`],
      ['Charge projet', `${budget} u`]
    ];
  }, [intensity, selectedSteps.length]);

  const assistantLines = useMemo(() => {
    const first = `Je vois un besoin ${context.label.toLowerCase()} oriente ${active.short}.`;
    const second = context.action;
    const third = selectedSteps.length
      ? `Vous avez choisi ${selectedSteps.length} modules. Le prochain bon mouvement : tester une immersion.`
      : 'Selectionnez au moins un module pour que je compose une trajectoire.';

    if (page === 'home') return [first, 'Commencez par choisir un mode. Je recalibre le site autour de votre intention.', third];
    if (page === 'cockpit') return [first, second, 'Ajustez l intensite : je mets a jour delai, risque et maturite en direct.'];
    if (page === 'immersions') return [first, 'Cliquez les noeuds de la simulation pour voir comment la competence circule.', third];
    if (page === 'architecte') return [second, 'Ajoutez ou retirez des modules : je transforme la page en plan de mission.', third];
    return [first, 'Le contact doit partir avec une intention claire. Choisissez le scenario qui ressemble le plus a votre besoin.', second];
  }, [active.short, context, page, selectedSteps.length]);

  const selectPage = (nextPage: Page) => {
    setPage(nextPage);
    if (window.location.hash !== `#${nextPage}`) {
      window.history.pushState(null, '', `#${nextPage}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleStep = (step: string) => {
    setSelectedSteps((current) =>
      current.includes(step) ? current.filter((item) => item !== step) : [...current, step]
    );
  };

  return (
    <div className="app-shell v2" style={{ '--accent': active.accent } as React.CSSProperties}>
      <ImmersiveCanvas mode={mode} intensity={intensity} pulse={pulse} />
      <header className="floating-header v2-header">
        <a
          className="brand brand-button"
          href="#home"
          onClick={(event) => {
            event.preventDefault();
            selectPage('home');
          }}
        >
          <img src="/cnk-mark.svg" alt="CNK" />
          <span>
            <strong>CNK Future Lab</strong>
            <small>{active.label}</small>
          </span>
        </a>
        <nav aria-label="Navigation principale">
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={page === item.id ? 'active' : ''}
              onClick={(event) => {
                event.preventDefault();
                selectPage(item.id);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main className="experience-shell">
        <GuidePanel lines={assistantLines} mode={mode} challenge={challenge} page={page} />

        {page === 'home' && (
          <HomePage
            mode={mode}
            challenge={challenge}
            intensity={intensity}
            onMode={setMode}
            onChallenge={setChallenge}
            onIntensity={setIntensity}
            onStart={() => selectPage('cockpit')}
          />
        )}

        {page === 'cockpit' && (
          <CockpitPage
            mode={mode}
            challenge={challenge}
            intensity={intensity}
            blueprint={blueprint}
            onMode={setMode}
            onChallenge={setChallenge}
            onIntensity={setIntensity}
            onNext={() => selectPage('immersions')}
          />
        )}

        {page === 'immersions' && (
          <ImmersionsPage
            mode={mode}
            challenge={challenge}
            activeNode={activeNode}
            setActiveNode={setActiveNode}
            onMode={setMode}
            onNext={() => selectPage('architecte')}
          />
        )}

        {page === 'architecte' && (
          <ArchitectPage
            mode={mode}
            challenge={challenge}
            selectedSteps={selectedSteps}
            blueprint={blueprint}
            onToggleStep={toggleStep}
            onChallenge={setChallenge}
            onNext={() => selectPage('contact')}
          />
        )}

        {page === 'contact' && (
          <ContactPage mode={mode} challenge={challenge} selectedSteps={selectedSteps} blueprint={blueprint} />
        )}
      </main>
    </div>
  );
}

function HomePage({
  mode,
  challenge,
  intensity,
  onMode,
  onChallenge,
  onIntensity,
  onStart
}: {
  mode: Mode;
  challenge: Challenge;
  intensity: number;
  onMode: (mode: Mode) => void;
  onChallenge: (challenge: Challenge) => void;
  onIntensity: (value: number) => void;
  onStart: () => void;
}) {
  const active = modes[mode];

  return (
    <section className="v2-page v2-hero">
      <div className="hero-copy v2-copy">
        <p className="kicker">Experience intelligente · {challenges[challenge].label}</p>
        <h1>Le site reagit comme un conseiller qui comprend votre intention.</h1>
        <p className="lead">
          Choisissez un besoin, une competence et un niveau d intensite. L interface compose ensuite un parcours,
          des simulations et un plan de mission en temps reel.
        </p>

        <div className="choice-strip">
          {(Object.keys(challenges) as Challenge[]).map((item) => (
            <button key={item} className={challenge === item ? 'active' : ''} onClick={() => onChallenge(item)}>
              <strong>{challenges[item].label}</strong>
              <span>{challenges[item].need}</span>
            </button>
          ))}
        </div>

        <div className="hero-actions">
          <button className="primary-action" onClick={onStart}>Demarrer le diagnostic</button>
          <button className="ghost-action" onClick={() => onIntensity(Math.min(95, intensity + 10))}>
            Augmenter l ambition
          </button>
        </div>
      </div>

      <div className="command-deck glass">
        <div className="deck-top">
          <span>Mode actif</span>
          <strong>{active.short}</strong>
        </div>
        <div className="mode-selector-grid">
          {(Object.keys(modes) as Mode[]).map((item) => (
            <button key={item} className={mode === item ? 'active' : ''} onClick={() => onMode(item)}>
              <span>{modes[item].short}</span>
              <small>{modes[item].title}</small>
            </button>
          ))}
        </div>
        <div className="live-brief">
          <p>{active.signal}</p>
          <strong>{active.output}</strong>
        </div>
        <input
          type="range"
          min="25"
          max="95"
          value={intensity}
          onChange={(event) => onIntensity(Number(event.target.value))}
          aria-label="Intensite du projet"
        />
      </div>
    </section>
  );
}

function CockpitPage({
  mode,
  challenge,
  intensity,
  blueprint,
  onMode,
  onChallenge,
  onIntensity,
  onNext
}: {
  mode: Mode;
  challenge: Challenge;
  intensity: number;
  blueprint: string[][];
  onMode: (mode: Mode) => void;
  onChallenge: (challenge: Challenge) => void;
  onIntensity: (value: number) => void;
  onNext: () => void;
}) {
  const active = modes[mode];

  return (
    <section className="v2-page">
      <div className="section-heading v2-heading">
        <div>
          <p className="kicker">Cockpit dynamique</p>
          <h2>{active.title}</h2>
        </div>
        <p className="lead small">{challenges[challenge].prompt}</p>
      </div>

      <div className="cockpit-matrix">
        <div className="glass operator-panel">
          <h3>1. Orientez la mission</h3>
          <div className="mode-tabs v2-tabs">
            {(Object.keys(modes) as Mode[]).map((item) => (
              <button key={item} className={mode === item ? 'active' : ''} onClick={() => onMode(item)}>
                {modes[item].short}
              </button>
            ))}
          </div>
          <div className="challenge-grid">
            {(Object.keys(challenges) as Challenge[]).map((item) => (
              <button key={item} className={challenge === item ? 'active' : ''} onClick={() => onChallenge(item)}>
                <strong>{challenges[item].label}</strong>
                <span>{challenges[item].prompt}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="glass operator-panel">
          <h3>2. Reglez l intensite</h3>
          <div className="intensity-dial">
            <div style={{ '--value': `${intensity * 3.6}deg` } as React.CSSProperties}>
              <strong>{intensity}%</strong>
              <span>ambition</span>
            </div>
          </div>
          <input
            type="range"
            min="25"
            max="95"
            value={intensity}
            onChange={(event) => onIntensity(Number(event.target.value))}
          />
        </div>

        <div className="glass operator-panel wide">
          <h3>3. Lecture instantanee</h3>
          <div className="metric-grid">
            {blueprint.map(([label, value]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
          <div className="generated-plan">
            {active.verbs.map((verb, index) => (
              <span key={verb} style={{ animationDelay: `${index * 120}ms` }}>{verb}</span>
            ))}
          </div>
          <button className="primary-action" onClick={onNext}>Lancer une immersion</button>
        </div>
      </div>
    </section>
  );
}

function ImmersionsPage({
  mode,
  challenge,
  activeNode,
  setActiveNode,
  onMode,
  onNext
}: {
  mode: Mode;
  challenge: Challenge;
  activeNode: number;
  setActiveNode: (node: number) => void;
  onMode: (mode: Mode) => void;
  onNext: () => void;
}) {
  return (
    <section className="v2-page">
      <div className="section-heading v2-heading">
        <div>
          <p className="kicker">Immersions reelles</p>
          <h2>Chaque clic declenche une lecture differente du systeme.</h2>
        </div>
        <p className="lead small">{challenges[challenge].need}. Le scenario s adapte a votre contexte.</p>
      </div>

      <div className="immersion-grid v2-immersion">
        <LiveMap mode={mode} activeNode={activeNode} setActiveNode={setActiveNode} />
        <div className="glass simulator-panel">
          <p className="kicker">Simulateur</p>
          <h3>{['Donnees', 'Modele', 'Risque', 'Decision', 'Equipe'][activeNode]}</h3>
          <p>
            {[
              'Le systeme capte les sources disponibles et signale les manques critiques.',
              'Le moteur IA propose une classification, mais garde une validation humaine visible.',
              'La couche cyber isole les informations sensibles et priorise les corrections.',
              'La decision devient un tableau de bord simple avec alertes et arbitrages.',
              'La transmission transforme l outil en competence interne durable.'
            ][activeNode]}
          </p>
          <div className="mode-selector-grid compact">
            {(Object.keys(modes) as Mode[]).map((item) => (
              <button key={item} className={mode === item ? 'active' : ''} onClick={() => onMode(item)}>
                <span>{modes[item].short}</span>
              </button>
            ))}
          </div>
          <button className="primary-action" onClick={onNext}>Transformer en plan</button>
        </div>
      </div>
    </section>
  );
}

function ArchitectPage({
  mode,
  challenge,
  selectedSteps,
  blueprint,
  onToggleStep,
  onChallenge,
  onNext
}: {
  mode: Mode;
  challenge: Challenge;
  selectedSteps: string[];
  blueprint: string[][];
  onToggleStep: (step: string) => void;
  onChallenge: (challenge: Challenge) => void;
  onNext: () => void;
}) {
  return (
    <section className="v2-page">
      <div className="section-heading v2-heading">
        <div>
          <p className="kicker">Architecte de mission</p>
          <h2>Composez une offre qui ressemble a votre vraie intervention.</h2>
        </div>
        <p className="lead small">{modes[mode].output}</p>
      </div>

      <div className="architect-grid">
        <div className="glass module-bank">
          <h3>Modules activables</h3>
          {playbooks.map((item) => (
            <button key={item} className={selectedSteps.includes(item) ? 'active' : ''} onClick={() => onToggleStep(item)}>
              <span>{selectedSteps.includes(item) ? 'Actif' : 'Ajouter'}</span>
              <strong>{item}</strong>
            </button>
          ))}
        </div>

        <div className="glass blueprint-card">
          <h3>Plan genere</h3>
          <div className="mission-timeline">
            {missionSteps.map((step, index) => (
              <div key={step.title} className={index <= selectedSteps.length % 4 ? 'active' : ''}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{step.title}</strong>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
          <div className="metric-grid">
            {blueprint.map(([label, value]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass context-card">
          <h3>Changer le contexte</h3>
          {(Object.keys(challenges) as Challenge[]).map((item) => (
            <button key={item} className={challenge === item ? 'active' : ''} onClick={() => onChallenge(item)}>
              {challenges[item].label}
            </button>
          ))}
          <button className="primary-action" onClick={onNext}>Preparer le contact</button>
        </div>
      </div>
    </section>
  );
}

function ContactPage({
  mode,
  challenge,
  selectedSteps,
  blueprint
}: {
  mode: Mode;
  challenge: Challenge;
  selectedSteps: string[];
  blueprint: string[][];
}) {
  const message = encodeURIComponent(
    `Bonjour Charmant, je viens de tester la version futuriste. Contexte: ${challenges[challenge].label}. Mode: ${modes[mode].label}. Modules: ${selectedSteps.join(', ') || 'a definir'}.`
  );

  return (
    <section className="v2-page contact-page">
      <div className="final-call v2-final">
        <img src="/cnk-logo.svg" alt="CNK - Charmant Nyungu K." />
        <p className="kicker">Synthese prete</p>
        <h2>Le visiteur arrive ici avec une intention deja qualifiee.</h2>
        <div className="summary-grid">
          <div><span>Contexte</span><strong>{challenges[challenge].label}</strong></div>
          <div><span>Competence</span><strong>{modes[mode].short}</strong></div>
          <div><span>Modules</span><strong>{selectedSteps.length}</strong></div>
          <div><span>Projection</span><strong>{blueprint[1][1]}</strong></div>
        </div>
        <a href={`https://wa.me/243835137837?text=${message}`}>Envoyer cette intention</a>
      </div>
    </section>
  );
}

function GuidePanel({
  lines,
  mode,
  challenge,
  page
}: {
  lines: string[];
  mode: Mode;
  challenge: Challenge;
  page: Page;
}) {
  const [open, setOpen] = useState(true);
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    setLineIndex(0);
    const timer = window.setInterval(() => {
      setLineIndex((value) => (value + 1) % lines.length);
    }, 3600);

    return () => window.clearInterval(timer);
  }, [lines]);

  return (
    <aside className={`guide-panel ${open ? 'open' : 'closed'}`}>
      <button className="guide-toggle" onClick={() => setOpen((value) => !value)}>
        {open ? 'Reduire' : 'Guide'}
      </button>
      {open && (
        <>
          <div className="guide-avatar">
            <img src="/cnk-mark.svg" alt="" />
            <span />
          </div>
          <p className="kicker">Conseiller contextuel</p>
          <strong>{lines[lineIndex]}</strong>
          <small>
            Page {page} · {modes[mode].short} · {challenges[challenge].label}
          </small>
        </>
      )}
    </aside>
  );
}

function ImmersiveCanvas({ mode, intensity, pulse }: { mode: Mode; intensity: number; pulse: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointer = useRef({ x: 0.58, y: 0.42 });

  useEffect(() => {
    const updatePointer = (event: PointerEvent) => {
      pointer.current = {
        x: event.clientX / window.innerWidth,
        y: event.clientY / window.innerHeight
      };
    };

    window.addEventListener('pointermove', updatePointer);
    return () => window.removeEventListener('pointermove', updatePointer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    let frame = pulse * 20;
    let animation = 0;
    const points = Array.from({ length: 96 }, (_, index) => ({
      angle: (Math.PI * 2 * index) / 96,
      radius: 70 + Math.random() * 330,
      speed: 0.001 + Math.random() * 0.0028,
      pulse: Math.random() * Math.PI * 2
    }));

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = () => {
      frame += 1;
      const width = window.innerWidth;
      const height = window.innerHeight;
      const accent = modes[mode].accent;
      const centerX = width * (0.42 + pointer.current.x * 0.22);
      const centerY = height * (0.26 + pointer.current.y * 0.32);

      context.clearRect(0, 0, width, height);
      context.fillStyle = '#020617';
      context.fillRect(0, 0, width, height);

      const glow = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, width * 0.68);
      glow.addColorStop(0, `${accent}3d`);
      glow.addColorStop(0.5, 'rgba(15,23,42,0.30)');
      glow.addColorStop(1, 'rgba(2,6,23,0)');
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      context.strokeStyle = 'rgba(148,163,184,0.06)';
      for (let x = -80; x < width + 80; x += 58) {
        context.beginPath();
        context.moveTo(x + Math.sin(frame / 70) * 10, 0);
        context.lineTo(x - 60 + pointer.current.x * 120, height);
        context.stroke();
      }

      const visible = points.map((point) => {
        point.angle += point.speed * (intensity / 48);
        const wave = Math.sin(frame / 34 + point.pulse) * (14 + intensity / 9);
        return {
          x: centerX + Math.cos(point.angle) * (point.radius + wave),
          y: centerY + Math.sin(point.angle) * (point.radius * 0.58 + wave)
        };
      });

      visible.forEach((point, index) => {
        const next = visible[(index + 7) % visible.length];
        const distance = Math.hypot(point.x - next.x, point.y - next.y);
        if (distance < 220) {
          context.strokeStyle = `rgba(226,232,240,${0.14 - distance / 2200})`;
          context.beginPath();
          context.moveTo(point.x, point.y);
          context.lineTo(next.x, next.y);
          context.stroke();
        }
      });

      visible.forEach((point, index) => {
        context.fillStyle = index % 6 === 0 ? accent : 'rgba(248,250,252,0.72)';
        context.beginPath();
        context.arc(point.x, point.y, index % 6 === 0 ? 2.8 : 1.45, 0, Math.PI * 2);
        context.fill();
      });

      animation = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animation);
    };
  }, [mode, intensity, pulse]);

  return <canvas ref={canvasRef} className="immersive-canvas" aria-hidden="true" />;
}

function LiveMap({
  mode,
  activeNode,
  setActiveNode
}: {
  mode: Mode;
  activeNode: number;
  setActiveNode: (node: number) => void;
}) {
  const nodes = [
    ['Donnees', 'Collecte terrain'],
    ['Modele', modes[mode].short],
    ['Risque', 'Controle'],
    ['Decision', 'Pilotage'],
    ['Equipe', 'Autonomie']
  ];

  return (
    <article className="live-map glass">
      <div className="map-header">
        <span>Simulation active</span>
        <strong>{modes[mode].label}</strong>
      </div>
      <div className="node-stage">
        {nodes.map(([label, sub], index) => (
          <button
            key={label}
            type="button"
            className={`node node-${index + 1} ${activeNode === index ? 'active' : ''}`}
            onClick={() => setActiveNode(index)}
          >
            <strong>{label}</strong>
            <span>{sub}</span>
          </button>
        ))}
        <div className="energy-ring ring-one" />
        <div className="energy-ring ring-two" />
        <div className="packet packet-a" />
        <div className="packet packet-b" />
        <div className="packet packet-c" />
      </div>
    </article>
  );
}

export default App;
