
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
    <footer id="contact" className="relative overflow-hidden border-t border-white/10 bg-slate-950 py-20 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(245,158,11,0.18),transparent_34%)]"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <button onClick={() => handleNavigation('home')} className="mb-6 flex items-center gap-4 text-left text-white">
              <span className="grid h-14 w-14 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-2">
                <img src="/cnk-mark.svg" alt="CNK" className="h-full w-full" />
              </span>
              <span>
                <span className="block text-3xl font-bold tracking-tighter"><span className="text-amber-500 italic">Charmant</span> Nyungu K.</span>
                <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.24em] text-white/42">Innovation & souverainete numerique</span>
              </span>
            </button>
            <p className="text-white/62 max-w-sm mb-8 leading-relaxed">
              Bâtissons ensemble les fondations de l'Afrique de demain, un octet à la fois, une idée à la fois.
            </p>
            <div className="flex gap-6">
              {['LinkedIn', 'Twitter', 'Medium', 'WhatsApp'].map(social => (
                <a key={social} href={social === 'WhatsApp' ? 'https://wa.me/243835137837?text=Bonjour%20Charmant' : '#'} className="text-white/42 hover:text-amber-300 transition-colors text-[10px] uppercase font-bold tracking-widest">
                  {social}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-[0.2em]">Contact</h4>
            <ul className="space-y-4 text-white/62 text-sm">
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
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-[0.2em]">Navigation</h4>
            <ul className="space-y-3 text-white/62 text-sm font-medium">
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
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/38 text-[10px] uppercase font-bold tracking-widest">
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
