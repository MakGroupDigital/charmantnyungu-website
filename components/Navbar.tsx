
import React, { useState, useEffect } from 'react';
import { navigateToPage } from '../utils/navigation';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled || mobileMenuOpen ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm border-b border-slate-100' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <button 
            onClick={() => handleNavigation('home')}
            className="group text-left"
        >
          <span className="block text-xl font-black uppercase tracking-[0.18em] text-slate-900 transition-colors group-hover:text-amber-600 sm:text-2xl">
            Charmant Nyungu K.
          </span>
        </button>
        
        <div className="hidden md:flex gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <button 
              key={link.id} 
              onClick={() => handleNavigation(link.id)}
              className={`text-xs font-bold transition-colors uppercase tracking-widest ${currentPage === link.id ? 'text-amber-600 border-b-2 border-amber-500' : 'text-slate-500 hover:text-amber-600'}`}
            >
              {link.label}
            </button>
          ))}
          <button 
             onClick={handleContactNavigation}
             className="bg-slate-900 text-white px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-amber-600 transition-colors"
          >
            Contact
          </button>
        </div>

        <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-900 p-2"
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
          className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md"
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-2">
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
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
