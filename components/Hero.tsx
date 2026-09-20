import React, { useEffect, useState } from 'react';
import ContactDialog, { ContactIntent } from './ContactDialog';
import { getGreeting } from '../utils/greeting';
import { navigateToPage } from '../utils/navigation';
import './WelcomeHero.css';

const engagements = [
  { label: 'Technologie', title: 'Transformer les idées en solutions.', text: 'Intelligence artificielle, données et innovation : des outils concrets pour répondre aux défis de demain.', caption: 'L’innovation, au service du réel.' },
  { label: 'Panafricanisme', title: 'Un continent. Des ambitions communes.', text: 'Relier les talents, transmettre les savoirs et construire ensemble une Afrique qui avance.', caption: 'Le continent comme horizon.' },
  { label: 'Souveraineté', title: 'Construire notre indépendance numérique.', text: 'Des institutions fortes et des infrastructures maîtrisées pour décider, créer et agir en toute autonomie.', caption: 'Notre avenir nous appartient.' },
];

const Hero: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const [hour, setHour] = useState(() => new Date().getHours());
  const [intent, setIntent] = useState<ContactIntent | null>(null);
  const [engagement, setEngagement] = useState(0);
  const activeEngagement = engagements[engagement];
  const { greeting, moment, icon } = getGreeting(hour);
  useEffect(() => {
    const update = () => setHour(new Date().getHours());
    const timer = window.setInterval(update, 60_000);
    window.addEventListener('focus', update);
    return () => { window.clearInterval(timer); window.removeEventListener('focus', update); };
  }, []);
  return (
  <>
    <section id="home" className="welcome-experience" aria-label="Bienvenue sur le site de Charmant Nyungu K.">
      <div className="welcome-stage">
        <div className="welcome-topline"><span>Un regard africain. Une portée mondiale.</span><a href="#welcome-pathways">Faisons connaissance <span aria-hidden="true">↓</span></a></div>
        <div className="welcome-scene">
          <div className="welcome-editorial">
            <div className="welcome-salutation entrance-step" title={moment}>
              <span className="greeting-symbol"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">{icon === 'moon' ? <path d="M20 15.4A8.5 8.5 0 018.6 4a8.5 8.5 0 1011.4 11.4Z" /> : <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></>}</svg></span>
              <span>{greeting}, <span className="greeting-invitation">heureux de vous accueillir.</span></span>
            </div>
            <p className="welcome-site-label entrance-step">Bienvenue sur mon site officiel</p>
            <h1 className="welcome-name"><span className="name-preface entrance-step">Je suis</span><span className="name-line"><span>Charmant</span></span><span className="name-line"><span>Nyungu K<span className="name-dot">.</span></span></span></h1>
            <p className="welcome-vocation entrance-step">Consultant en technologie.<span>Résolument <em>panafricaniste.</em></span></p>
            <div className="engagement-explorer entrance-step">
              <p className="explorer-label">Trois convictions. Un même cap. <span aria-hidden="true">↘</span></p>
              <div className="engagement-tabs" role="tablist" aria-label="Explorez mes engagements">
                {engagements.map((item, i) => <button key={item.label} id={`engagement-tab-${i}`} type="button" role="tab" aria-selected={engagement === i} aria-controls="engagement-panel" tabIndex={engagement === i ? 0 : -1} onClick={() => setEngagement(i)} onKeyDown={(event) => {
                  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
                  event.preventDefault();
                  const next = event.key === 'Home' ? 0 : event.key === 'End' ? engagements.length - 1 : (i + (event.key === 'ArrowRight' ? 1 : -1) + engagements.length) % engagements.length;
                  setEngagement(next); document.getElementById(`engagement-tab-${next}`)?.focus();
                }}>{item.label}<span aria-hidden="true">↗</span></button>)}
              </div>
              <div id="engagement-panel" role="tabpanel" tabIndex={0} aria-labelledby={`engagement-tab-${engagement}`} className="engagement-panel"><div key={engagement} className="engagement-content"><h2>{activeEngagement.title}</h2><p>{activeEngagement.text}</p></div></div>
            </div>
          </div>
          <figure className="welcome-visual">
            <div className="portrait-orbit" aria-hidden="true" />
            <div className="welcome-image-frame"><img src="/photos/f1374e3a-3aaf-466b-87eb-6bc2f713d5e3.jpg.JPG" alt="Charmant Nyungu K., devant sa bibliothèque et le drapeau congolais" fetchPriority="high" /><span className="portrait-side-label">Kinshasa · Dakar · Afrique</span></div>
            <figcaption><span className="portrait-caption-label">Une vision en mouvement</span><span key={activeEngagement.caption} className="portrait-thought">{activeEngagement.caption}</span><span className="portrait-signature"><img src="/cnk-signature-ivory.svg?v=3" alt="Signature de Charmant Nyungu K." /></span></figcaption>
            <span className="portrait-note" aria-hidden="true">Pensons demain,<br /><em>ensemble.</em></span>
          </figure>
        </div>
        <div className="welcome-bottomline"><span><i aria-hidden="true" /> Technologie & conviction</span><span>Le dialogue est le début de tout.</span><a href="#welcome-pathways" aria-label="Découvrir les possibilités d’échange">Explorer <span aria-hidden="true">↓</span></a></div>
      </div>
      <div id="welcome-pathways" className="welcome-pathways">
        <div className="pathways-heading"><p>Et vous,</p><h2>qu’aimeriez-vous construire ?</h2></div>
        <div className="welcome-pathway-grid">
          <button className="pathway-card pathway-question" onClick={() => setIntent('question')} aria-haspopup="dialog"><span className="pathway-top"><span>01 / Une conversation</span><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M20 11a8 8 0 01-8 8H5l-4 3 2-7a8 8 0 1117-4Z"/><path d="M7 9h8m-8 4h5"/></svg></span><strong>Vous avez<br />une question ?</strong><span className="pathway-bottom"><span>Posez-la ici. Je vous écoute.</span><span aria-hidden="true">↗</span></span></button>
          <button className="pathway-card pathway-appointment" onClick={() => setIntent('appointment')} aria-haspopup="dialog"><span className="pathway-top"><span>02 / Une rencontre</span><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 2v6m10-6v6M3 11h18m-14 5h3m4 0h3"/></svg></span><strong>Prenons<br />rendez-vous.</strong><span className="pathway-bottom"><span>Donnons du temps à vos idées.</span><span aria-hidden="true">↗</span></span></button>
          <a className="pathway-card pathway-about" href="/a-propos" onClick={(event) => {
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            event.preventDefault(); navigateToPage('about'); onNavigate('about'); window.scrollTo(0, 0);
          }}><span className="pathway-top"><span>03 / Un parcours</span><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><circle cx="12" cy="7" r="4"/><path d="M4 22v-3a8 8 0 0116 0v3"/></svg></span><strong>Faisons<br />connaissance.</strong><span className="pathway-bottom"><span>Mon histoire, ma vision, mes engagements.</span><span aria-hidden="true">↗</span></span></a>
        </div>
        <details className="welcome-mission"><summary>Ma mission, en quelques mots <span aria-hidden="true">+</span></summary><p>Consultant en innovation technologique, souveraineté numérique et intelligence artificielle, j'accompagne les institutions, les dirigeants et les projets structurants dans la construction d'une Afrique plus stable, plus compétente et plus maîtresse de ses infrastructures stratégiques.</p><a href="/projets">Découvrir mes réalisations ↗</a></details>
      </div>
      <div className="hero-principles welcome-principles">{[
        ['01', 'Vision', 'Leadership technologique de long terme'],
        ['02', 'État', 'Approche institutionnelle et gouvernance'],
        ['03', 'Impact', 'Solutions utiles, souveraines et durables'],
      ].map(([n, title, text]) => <div key={n}><span className="principle-number">{n}</span><div><h2>{title}</h2><p>{text}</p></div></div>)}</div>
    </section>
    <ContactDialog intent={intent} onClose={() => setIntent(null)} />
    <section className="vision-note">
      <div className="vision-note-image"><img src="/photos/IMG_1838.jpg" alt="Charmant Nyungu K. — Portrait officiel" loading="lazy" /></div>
      <div><p className="edition-label">Message de vision</p><blockquote>« La modernité africaine se construira par des institutions fortes et des systèmes numériques souverains. »</blockquote><p className="vision-signature">Charmant Nyungu K. <span>Consultant & stratège</span></p></div>
      <details className="vision-orientations"><summary>Le cap stratégique <span>↗</span></summary><p>Faire converger leadership public, excellence technique et souveraineté numérique dans un même cap stratégique.</p><ul>{['Transformer les données en décisions d’État.', 'Porter une souveraineté numérique assumée.', 'Structurer les leaderships de demain.', 'Mettre l’innovation au service du continent.'].map(s => <li key={s}>{s}</li>)}</ul><p>IA — Gouvernance · Data — Décision · Cyber — Résilience</p><a href="/immersive/index.html">Accéder à la version immersive ↗</a></details>
    </section>
  </>
  );
};
export default Hero;
