import React, { useState } from 'react';
import ContactDialog, { ContactIntent } from './ContactDialog';
import { navigateToPage } from '../utils/navigation';
import './WelcomeHero.css';

const Hero: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const [intent, setIntent] = useState<ContactIntent | null>(null);
  return (
  <>
    <section id="home" className="welcome-experience" aria-label="Bienvenue sur le site de Charmant Nyungu K.">
      <div className="official-banner">
        <img className="official-banner-photo" src="/photos/f1374e3a-3aaf-466b-87eb-6bc2f713d5e3.jpg.JPG" alt="Charmant Nyungu K., devant sa bibliothèque et le drapeau congolais" fetchPriority="high" />
        <div className="official-banner-content">
          <p className="official-banner-label">Site officiel</p>
          <h1 className="official-banner-name">Charmant Nyungu K.</h1>
          <p className="official-banner-role">Consultant en innovation technologique et en souveraineté numérique, au service des institutions africaines.</p>
          <div className="official-banner-actions">
            <a className="official-btn official-btn-light" href="/a-propos" onClick={(event) => {
              if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
              event.preventDefault(); navigateToPage('about'); onNavigate('about'); window.scrollTo(0, 0);
            }}>Découvrir la biographie</a>
            <button type="button" className="official-btn official-btn-outline" onClick={() => setIntent('question')} aria-haspopup="dialog">Contact</button>
          </div>
        </div>
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
