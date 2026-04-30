
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
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">Votre partenaire stratégique pour l'innovation</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                De la conception à la livraison, je transforme vos idées en solutions technologiques performantes et adaptées aux réalités africaines.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                 {[
                   { title: "Conception Stratégique", desc: "Architecture de solutions innovantes basées sur l'IA et la data science." },
                   { title: "Développement Expert", desc: "Création de plateformes web et mobiles haute performance." },
                   { title: "Déploiement & Scale", desc: "Accompagnement vers la croissance avec un support continu." }
                 ].map((item, i) => (
                   <div key={i} className="p-4 border-l-4 border-amber-500 bg-slate-50">
                     <h4 className="font-bold mb-1">{item.title}</h4>
                     <p className="text-sm text-slate-600">{item.desc}</p>
                   </div>
                 ))}
              </div>
            </div>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
               <h3 className="text-2xl font-bold mb-8 text-slate-900 border-b pb-4">Portfolio de Réussites</h3>
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
