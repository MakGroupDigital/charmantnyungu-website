
import React, { useState, useEffect } from 'react';
import { navigateToPage } from '../utils/navigation';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const immersiveUrl = '/immersive/index.html';

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    const handleKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setMobileMenuOpen(false); };
    window.addEventListener('keydown', handleKey);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleNavigation = (pageId: string) => {
    onNavigate(pageId);
    navigateToPage(pageId as Parameters<typeof navigateToPage>[0]);
    setTimeout(() => window.scrollTo(0, 0), 10);
    setMobileMenuOpen(false);
  };

  const handleContactNavigation = () => {
    setMobileMenuOpen(false);
    onNavigate('home');
    navigateToPage('home');
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const navLinks = [
    { label: 'Accueil', id: 'home' },
    { label: 'À Propos', id: 'about' },
    { label: 'Expertise', id: 'expertise' },
    { label: 'Projets', id: 'projects' },
    { label: 'Recherche', id: 'research' },
    { label: 'Cours', id: 'courses' },
    { label: 'Manifeste', id: 'manifeste' },
    { label: 'Tribune', id: 'tribune' },
    { label: 'Galerie', id: 'gallery' },
  ];

  return (
    <nav className="editorial-nav" aria-label="Navigation principale">
      <div className="editorial-nav-inner">
        <button className="editorial-brand" onClick={() => handleNavigation('home')}><img className="brand-signature" src="/cnk-signature.svg?v=3" alt="Charmant Nyungu K." /><small>Innovation & souveraineté numérique</small></button>
        <div className="editorial-desktop-links">{navLinks.slice(0, 5).map(link => <button key={link.id} onClick={() => handleNavigation(link.id)} aria-current={currentPage === link.id ? 'page' : undefined}>{link.label}</button>)}</div>
        <div className="editorial-nav-actions"><button className="nav-contact" onClick={handleContactNavigation}>Échangeons <span aria-hidden="true">↗</span></button><button className="editorial-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-expanded={mobileMenuOpen} aria-controls="editorial-menu">{mobileMenuOpen ? 'Fermer −' : 'Menu +'}</button></div>
      </div>
      {mobileMenuOpen && <div id="editorial-menu" className="editorial-menu">{navLinks.map(link => <button key={link.id} onClick={() => handleNavigation(link.id)} aria-current={currentPage === link.id ? 'page' : undefined}>{link.label}<span aria-hidden="true">↗</span></button>)}<a href={immersiveUrl}>Version immersive ↗</a></div>}
    </nav>
  );

};

export default Navbar;
