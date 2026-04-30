
import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Vision from '../components/Vision';
import Advisor from '../components/Advisor';
import InteractiveSections from '../components/InteractiveSections';
import { navigateToPage } from '../utils/navigation';

interface HomeProps {
  onNavigate: (p: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const handleNavigation = (pageId: string) => {
    navigateToPage(pageId as Parameters<typeof navigateToPage>[0]);
    onNavigate(pageId);
    setTimeout(() => window.scrollTo(0, 0), 10);
  };

  return (
    <>
      <Hero />
      
      {/* Section Partenaire Stratégique */}
      <section className="border-b border-slate-200 bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-amber-700">Cabinet & mission</p>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900">Une parole d'autorite, une execution ancree dans le terrain.</h2>
            </div>
            <p className="max-w-2xl text-lg leading-relaxed text-slate-600">
              Une offre pensee pour les institutions, les entreprises et les initiatives d'envergure qui veulent moderniser leurs outils
              de decision, de protection et de transformation.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-16 items-center">
            <div>
              <div className="mb-6 inline-flex rounded-full bg-amber-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-amber-700">
                Partenaire strategique
              </div>
              <h3 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">Votre partenaire de confiance pour l'innovation structurelle.</h3>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                De la conception a la livraison, chaque mission est pensee comme un chantier de transformation durable:
                gouvernance numerique, architecture de solutions, maitrise des donnees et souverainete operationnelle.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                 {[
                   { title: "Conception Strategique", desc: "Architecture de solutions prioritaires pour administrations, entreprises et projets a impact." },
                   { title: "Execution Technique", desc: "Creation de plateformes, outils et systemes numeriques fiables, lisibles et performants." },
                   { title: "Securisation", desc: "Protection des donnees, continuite numerique et vigilance cyber sur les actifs sensibles." },
                   { title: "Transmission", desc: "Mentorat, cadrage et acculturation des equipes pour inscrire la transformation dans le temps." }
                 ].map((item, i) => (
                   <div key={i} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                     <h4 className="mb-2 text-base font-bold text-slate-900">{item.title}</h4>
                     <p className="text-sm leading-relaxed text-slate-600">{item.desc}</p>
                   </div>
                 ))}
              </div>
            </div>
            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50">
               <div className="grid gap-0 md:grid-cols-[0.9fr_1.1fr]">
                 <div className="relative min-h-[320px]">
                   <img src="/photos/IMG_7908.JPG" className="h-full w-full object-cover" alt="Charmant Nyungu K. - Presence institutionnelle" />
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/15 to-transparent"></div>
                   <div className="absolute bottom-0 left-0 right-0 p-6">
                     <div className="text-[11px] font-bold uppercase tracking-[0.28em] text-amber-300">Presence</div>
                     <div className="mt-2 text-2xl font-bold text-white">Leadership, rigueur et impact public.</div>
                   </div>
                 </div>
                 <div className="p-8">
                   <h3 className="text-2xl font-bold mb-8 text-slate-900 border-b border-slate-200 pb-4">Portfolio de realisations</h3>
                   <div className="space-y-6">
                 {[
                   { name: "E Régie PRV", tag: "GovTech", desc: "Plateforme fiscale gouvernementale moderne." },
                   { name: "Allo Livreur", tag: "Logistique", desc: "Écosystème intelligent pour l'optimisation des livraisons." },
                   { name: "Elenge.cd", tag: "Média", desc: "Média numérique panafricain pour la jeunesse." },
                   { name: "YA BISO APP", tag: "Tourisme", desc: "Promotion de la culture et du tourisme congolais." }
                 ].map((proj, i) => (
                   <div key={i} className="flex justify-between items-center group cursor-pointer" onClick={() => handleNavigation('projects')}>
                     <div>
                       <div className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors">{proj.name}</div>
                       <div className="text-xs text-slate-500">{proj.desc}</div>
                     </div>
                     <span className="text-[10px] font-bold uppercase tracking-widest bg-amber-100 text-amber-700 px-2 py-1 rounded">{proj.tag}</span>
                   </div>
                 ))}
                   </div>
                   <button onClick={() => handleNavigation('projects')} className="w-full mt-8 py-3 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-900 hover:text-white transition-all text-sm uppercase tracking-widest">Voir tous les projets</button>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <Services />
      
      <InteractiveSections />

      <Vision />

      {/* Storytelling in Motion */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <img src="/photos/IMG_7908.JPG" className="w-full h-full object-cover" alt="Background storytelling" />
          <div className="absolute inset-0 bg-slate-900/70"></div>
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-12 italic">Storytelling en Motion</h2>
          <div className="space-y-12">
            {[
              "D'abord, il y a une vision : l'autonomie numérique de l'Afrique.",
              "Ensuite, une mission : transformer les données en décisions.",
              "Puis, une action : former, créer, innover.",
              "Pour un objectif final : bâtir un futur souverain."
            ].map((text, i) => (
              <div key={i} className="text-2xl md:text-3xl font-light leading-relaxed border-l-2 border-amber-500 pl-8 text-left max-w-2xl mx-auto opacity-80 hover:opacity-100 transition-opacity">
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Advisor />

      {/* Trust Section */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-3xl font-bold mb-12">Ils me font confiance</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60 grayscale hover:grayscale-0 transition-all">
             {/* Mock Partner Logos */}
             <div className="font-black text-2xl text-center">GOV_RDC</div>
             <div className="font-black text-2xl text-center">TECH_HUB</div>
             <div className="font-black text-2xl text-center">UNI_W_B</div>
             <div className="font-black text-2xl text-center">SMART_AFRICA</div>
             <div className="font-black text-2xl text-center">STARTUP_X</div>
             <div className="font-black text-2xl text-center">ING_DEV</div>
          </div>
          <div className="mt-16 grid md:grid-cols-4 gap-8">
             {[
               { label: "Satisfaction Client", value: "95%" },
               { label: "ROI Moyen", value: "300%" },
               { label: "Support Continu", value: "24/7" },
               { label: "Projets Livrés", value: "100%" }
             ].map((stat, i) => (
               <div key={i} className="text-center p-6 bg-slate-50 rounded-2xl">
                 <div className="text-4xl font-black text-amber-600 mb-2">{stat.value}</div>
                 <div className="text-xs font-bold uppercase text-slate-500 tracking-widest">{stat.label}</div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Final Quote Banner */}
      <section className="py-24 bg-amber-500 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 w-1/3 h-full opacity-30 hidden lg:block">
          <img src="/photos/IMG_0103.jpg" className="w-full h-full object-cover object-top" alt="Charmant Nyungu K." />
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-transparent"></div>
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <p className="text-3xl md:text-5xl font-black text-white leading-tight mb-8">
            "Le bond technologique de l'Afrique n'est pas une option, c'est l'impératif de notre génération pour exister au banquet de la mondialisation."
          </p>
          <div className="font-bold text-white uppercase tracking-widest text-sm">— Charmant Nyungu K.</div>
        </div>
      </section>
    </>
  );
};

export default Home;
