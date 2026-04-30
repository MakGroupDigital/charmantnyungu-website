
import React from 'react';
import { navigateToPage } from '../utils/navigation';

interface FooterProps {
  onNavigate: (p: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNavigation = (pageId: string) => {
    onNavigate(pageId);
    navigateToPage(pageId as Parameters<typeof navigateToPage>[0]);
    setTimeout(() => window.scrollTo(0, 0), 10);
  };

  return (
    <footer id="contact" className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <button onClick={() => handleNavigation('home')} className="text-3xl font-bold tracking-tighter mb-6 block text-slate-900 text-left">
              <span className="text-amber-600 italic">Charmant</span> Nyungu K.
            </button>
            <p className="text-slate-600 max-w-sm mb-8 leading-relaxed">
              Bâtissons ensemble les fondations de l'Afrique de demain, un octet à la fois, une idée à la fois.
            </p>
            <div className="flex gap-6">
              {['LinkedIn', 'Twitter', 'Medium', 'WhatsApp'].map(social => (
                <a key={social} href={social === 'WhatsApp' ? 'https://wa.me/243835137837?text=Bonjour%20Charmant' : '#'} className="text-slate-400 hover:text-amber-600 transition-colors text-[10px] uppercase font-bold tracking-widest">
                  {social}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-slate-900 font-bold mb-6 uppercase text-xs tracking-[0.2em]">Contact</h4>
            <ul className="space-y-4 text-slate-600 text-sm">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                consultant@charmantnyungu.com
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                Kinshasa / Dakar
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-600 font-black">WA</span>
                +243 835 137 837
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-bold mb-6 uppercase text-xs tracking-[0.2em]">Navigation</h4>
            <ul className="space-y-3 text-slate-600 text-sm font-medium">
              <li><button onClick={() => handleNavigation('about')} className="hover:text-amber-600 transition-colors">À Propos</button></li>
              <li><button onClick={() => handleNavigation('expertise')} className="hover:text-amber-600 transition-colors">Expertise</button></li>
              <li><button onClick={() => handleNavigation('projects')} className="hover:text-amber-600 transition-colors">Projets</button></li>
              <li><button onClick={() => handleNavigation('manifeste')} className="hover:text-amber-600 transition-colors">Manifeste</button></li>
              <li><button onClick={() => handleNavigation('tribune')} className="hover:text-amber-600 transition-colors">Tribune</button></li>
              <li><button onClick={() => handleNavigation('gallery')} className="hover:text-amber-600 transition-colors">Galerie</button></li>
              <li><button onClick={() => handleNavigation('legal')} className="hover:text-amber-600 transition-colors">Mentions Légales</button></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-[10px] uppercase font-bold tracking-widest">
          <div>&copy; {new Date().getFullYear()} Charmant Nyungu K. - Tous droits réservés.</div>
          <div className="flex gap-4">
             <button onClick={() => handleNavigation('legal')}>Politique de Confidentialité</button>
             <button onClick={() => handleNavigation('legal')}>Mentions Légales</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
