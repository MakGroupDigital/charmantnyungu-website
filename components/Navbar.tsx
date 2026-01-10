
import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Accueil', id: 'home' },
    { label: 'À Propos', id: 'about' },
    { label: 'Expertise', id: 'expertise' },
    { label: 'Projets', id: 'projects' },
    { label: 'Tribune', id: 'tribune' },
    { label: 'Galerie', id: 'gallery' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm border-b border-slate-100' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <button 
            onClick={() => { onNavigate('home'); window.scrollTo(0, 0); }}
            className="text-2xl font-bold tracking-tighter flex items-center gap-2 group"
        >
          <span className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-md font-sans">CNK</span>
          <span className="hidden sm:block text-slate-900 font-serif">Charmant Nyungu K.</span>
        </button>
        
        <div className="hidden md:flex gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <button 
              key={link.id} 
              onClick={() => { onNavigate(link.id); window.scrollTo(0, 0); }}
              className={`text-xs font-bold transition-colors uppercase tracking-widest ${currentPage === link.id ? 'text-amber-600 border-b-2 border-amber-500' : 'text-slate-500 hover:text-amber-600'}`}
            >
              {link.label}
            </button>
          ))}
          <button 
             onClick={() => { onNavigate('home'); window.location.hash = 'contact'; }}
             className="bg-slate-900 text-white px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-amber-600 transition-colors"
          >
            Contact
          </button>
        </div>

        <div className="md:hidden">
            <button className="text-slate-900 p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
