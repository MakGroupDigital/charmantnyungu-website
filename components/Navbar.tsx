
import React, { useState, useEffect } from 'react';
import { navigateToPage } from '../utils/navigation';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const immersiveUrl = '/immersive/index.html';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
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
    { label: 'Manifeste', id: 'manifeste' },
    { label: 'Tribune', id: 'tribune' },
    { label: 'Galerie', id: 'gallery' },
  ];

  return (
    <nav className="pointer-events-none fixed inset-x-0 top-3 z-50 px-3 transition-all duration-300 sm:top-4 sm:px-5">
      <div
        className={`pointer-events-auto mx-auto max-w-[92rem] overflow-hidden rounded-[1.35rem] border transition-all duration-300 ${
          scrolled || mobileMenuOpen
            ? 'border-slate-200/80 bg-white/[0.92] shadow-[0_24px_80px_rgba(15,23,42,0.16)] backdrop-blur-2xl'
            : 'border-white/15 bg-slate-950/[0.20] shadow-[0_20px_70px_rgba(2,6,23,0.16)] backdrop-blur-xl'
        }`}
      >
        <div className={`flex items-center justify-between gap-4 px-4 transition-all duration-300 sm:px-5 lg:px-6 ${scrolled || mobileMenuOpen ? 'py-3' : 'py-3.5'}`}>
        <button 
            onClick={() => handleNavigation('home')}
            className="group flex min-w-0 items-center gap-3 text-left"
        >
          <span className={`grid h-11 w-11 flex-shrink-0 place-items-center overflow-hidden rounded-2xl border p-1.5 transition-all ${
            scrolled || mobileMenuOpen
              ? 'border-slate-200 bg-slate-950'
              : 'border-white/15 bg-white/10'
          }`}>
            <img src="/cnk-mark.svg" alt="CNK" className="h-full w-full" />
          </span>
          <span className="min-w-0">
            <span className={`block truncate text-sm font-black uppercase tracking-[0.16em] transition-colors group-hover:text-amber-600 sm:text-base lg:text-lg ${scrolled || mobileMenuOpen ? 'text-slate-900' : 'text-slate-900 md:text-white'}`}>
              Charmant Nyungu K.
            </span>
            <span className={`hidden text-[10px] font-bold uppercase tracking-[0.22em] sm:block ${scrolled || mobileMenuOpen ? 'text-slate-400' : 'text-white/45'}`}>
              Innovation & souverainete numerique
            </span>
          </span>
        </button>
        
        <div className={`hidden md:flex items-center gap-1 rounded-2xl border p-1.5 backdrop-blur-xl transition-all ${scrolled ? 'border-slate-200 bg-slate-50/80' : 'border-white/10 bg-white/[0.07]'}`}>
          {navLinks.map((link) => (
            <button 
              key={link.id} 
              onClick={() => handleNavigation(link.id)}
              className={`rounded-xl px-2.5 py-2 text-[10px] font-bold transition-colors uppercase tracking-widest lg:px-3 xl:px-4 ${currentPage === link.id ? 'bg-amber-500 text-slate-950 shadow-sm' : scrolled ? 'text-slate-500 hover:bg-white hover:text-slate-900' : 'text-white/[0.72] hover:bg-white/10 hover:text-white'}`}
            >
              {link.label}
            </button>
          ))}
          <button 
             onClick={handleContactNavigation}
             className="ml-1 rounded-xl bg-slate-950 px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg shadow-slate-950/10 transition-colors hover:bg-amber-600 xl:px-5"
          >
            Contact
          </button>
          <a
            href={immersiveUrl}
            className="ml-1 rounded-xl border border-amber-300/60 bg-amber-400 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-950 shadow-lg shadow-amber-900/10 transition-all hover:-translate-y-0.5 hover:bg-amber-300 xl:px-5"
          >
            Version immersive
          </a>
        </div>

        <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`rounded-2xl border p-2 transition-colors ${scrolled || mobileMenuOpen ? 'border-slate-200 bg-slate-50 text-slate-900' : 'border-white/15 bg-white/10 text-slate-900'}`}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
                {mobileMenuOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                )}
            </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="md:hidden border-t border-slate-200 bg-white/[0.96] backdrop-blur-xl"
        >
          <div className="px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavigation(link.id)}
                className={`w-full rounded-lg px-4 py-3 text-left text-sm font-bold uppercase tracking-widest transition-colors ${
                  currentPage === link.id
                    ? 'bg-amber-50 text-amber-700'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-amber-600'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={handleContactNavigation}
              className="mt-2 rounded-lg bg-slate-900 px-4 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-amber-600"
            >
              Contact
            </button>
            <a
              href={immersiveUrl}
              className="rounded-lg bg-amber-500 px-4 py-3 text-center text-sm font-black uppercase tracking-widest text-slate-950 transition-colors hover:bg-amber-400"
            >
              Acceder a la version immersive
            </a>
          </div>
        </div>
      )}
      </div>
    </nav>
  );
};

export default Navbar;
