
import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Vision from '../components/Vision';
import Advisor from '../components/Advisor';
import InteractiveSections from '../components/InteractiveSections';

interface HomeProps {
  onNavigate: (p: string) => void;
}

const Home: React.FC<HomeProps> = () => {
  return (
    <>
      <Hero />
      
      {/* Section Partenaire Strategique */}
      <section className="cnk-section border-b border-slate-200 bg-[linear-gradient(135deg,#f8fafc_0%,#ffffff_42%,#fef3c7_100%)] py-24 md:py-32">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="cnk-kicker mb-5 text-amber-700">Cabinet & mission</p>
              <h2 className="text-4xl md:text-6xl font-bold text-slate-950">Une parole d'autorite, une execution ancree dans le terrain.</h2>
            </div>
            <p className="max-w-xl text-lg leading-relaxed text-slate-600">
              Une offre pensee pour les institutions, les entreprises et les initiatives d'envergure qui veulent moderniser leurs outils
              de decision, de protection et de transformation.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-16 items-center">
            <div>
              <div className="mb-6 inline-flex rounded-full border border-amber-200 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-amber-800 shadow-sm">
                Partenaire strategique
              </div>
              <h3 className="text-4xl md:text-5xl font-bold mb-6 text-slate-950">Votre partenaire de confiance pour l'innovation structurelle.</h3>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                De la conception a la livraison, chaque mission est pensee comme un chantier de transformation durable:
                gouvernance numerique, architecture de solutions, maitrise des donnees et souverainete operationnelle.
              </p>
              <div className="cnk-quiet-list grid sm:grid-cols-2 gap-4">
                 {[
                   { title: "Conception Strategique", desc: "Architecture de solutions prioritaires pour administrations, entreprises et projets a impact." },
                   { title: "Execution Technique", desc: "Creation de plateformes, outils et systemes numeriques fiables, lisibles et performants." },
                   { title: "Securisation", desc: "Protection des donnees, continuite numerique et vigilance cyber sur les actifs sensibles." },
                   { title: "Transmission", desc: "Mentorat, cadrage et acculturation des equipes pour inscrire la transformation dans le temps." }
                 ].map((item, i) => (
                   <div key={i} className="cnk-card rounded-2xl p-5 before:mb-5 before:block before:font-body before:text-xs before:font-black before:tracking-[0.24em] before:text-amber-700">
                     <h4 className="mb-2 text-base font-bold text-slate-950">{item.title}</h4>
                     <p className="text-sm leading-relaxed text-slate-600">{item.desc}</p>
                   </div>
                 ))}
              </div>
            </div>
            <div className="cnk-card overflow-hidden rounded-[1.75rem]">
               <div className="grid gap-0 md:grid-cols-[1fr_0.82fr]">
                 <div className="relative min-h-[460px]">
                   <img src="/photos/IMG_7908.JPG" className="h-full w-full object-cover" alt="Charmant Nyungu K. - Presence institutionnelle" />
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/15 to-transparent"></div>
                   <div className="absolute bottom-0 left-0 right-0 p-6">
                     <div className="text-[11px] font-bold uppercase tracking-[0.28em] text-amber-300">Presence</div>
                     <div className="mt-2 text-2xl font-bold text-white">Leadership, rigueur et impact public.</div>
                   </div>
                 </div>
                 <div className="bg-slate-950 p-8 text-white">
                   <div className="mb-8 border-b border-white/10 pb-6">
                     <div className="text-[11px] font-bold uppercase tracking-[0.28em] text-amber-300">Methode</div>
                     <h3 className="mt-3 text-3xl font-bold leading-tight">Penser comme un Etat, livrer comme un laboratoire.</h3>
                   </div>
                   <div className="space-y-6 text-sm leading-relaxed text-white/68">
                     <p>
                       Chaque intervention commence par une lecture du terrain : contraintes politiques, maturite technique,
                       donnees disponibles, capacite des equipes et risques operationnels.
                     </p>
                     <p>
                       L'objectif n'est pas seulement de produire un outil, mais de renforcer une organisation capable de le
                       comprendre, de le proteger et de le faire evoluer.
                     </p>
                   </div>
                   <div className="mt-10 grid grid-cols-2 gap-3">
                     {['Diagnostic', 'Architecture', 'Execution', 'Transmission'].map((item) => (
                       <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white/72">
                         {item}
                       </div>
                     ))}
                   </div>
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
      <section className="py-24 md:py-32 bg-slate-950 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.28]">
          <img src="/photos/IMG_7908.JPG" className="w-full h-full object-cover" alt="Background storytelling" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.95),rgba(2,6,23,0.82),rgba(2,6,23,0.56))]"></div>
        </div>
        <div className="relative z-10 mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="cnk-kicker mb-5 text-amber-300">Narration</p>
            <h2 className="text-4xl md:text-6xl font-bold">Storytelling en motion</h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/62">
              Une trajectoire lisible : autonomie, donnees, formation, execution. Le site doit raconter une ambition, pas seulement lister des services.
            </p>
          </div>
          <div className="space-y-5">
            {[
              "D'abord, il y a une vision : l'autonomie numérique de l'Afrique.",
              "Ensuite, une mission : transformer les données en décisions.",
              "Puis, une action : former, créer, innover.",
              "Pour un objectif final : bâtir un futur souverain."
            ].map((text, i) => (
              <div key={i} className="grid gap-6 rounded-2xl border border-white/10 bg-white/[0.055] p-6 backdrop-blur-md transition-all hover:border-amber-300/45 hover:bg-white/[0.085] md:grid-cols-[5rem_1fr] md:p-8">
                <div className="font-body text-xs font-black uppercase tracking-[0.28em] text-amber-300">0{i + 1}</div>
                <div className="text-2xl md:text-3xl font-light leading-relaxed text-white/86">{text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Advisor />

      {/* Trust Section */}
      <section className="cnk-section py-24 bg-white border-t border-slate-100">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="cnk-kicker mb-4 text-amber-700">Preuves de travail</p>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-950">Confiance mesurable, impact lisible.</h2>
            </div>
            <p className="max-w-lg text-sm leading-relaxed text-slate-600">
              Des missions construites pour produire des resultats concrets : adoption, productivite, continuite et capacite interne.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-5">
             {[
               { label: "Satisfaction Client", value: "95%" },
               { label: "ROI Moyen", value: "300%" },
               { label: "Support Continu", value: "24/7" },
               { label: "Projets Livrés", value: "100%" }
             ].map((stat, i) => (
               <div key={i} className="cnk-card overflow-hidden rounded-2xl p-6">
                 <div className="mb-8 text-[11px] font-bold uppercase tracking-[0.24em] text-slate-400">Signal 0{i + 1}</div>
                 <div className="text-5xl font-black text-slate-950 mb-3">{stat.value}</div>
                 <div className="text-xs font-bold uppercase text-amber-700 tracking-widest">{stat.label}</div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Final Quote Banner */}
      <section className="py-24 md:py-32 bg-amber-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#f59e0b_0%,#d97706_46%,#0f172a_140%)]"></div>
        <div className="absolute right-0 bottom-0 w-1/3 h-full opacity-[0.35] hidden lg:block">
          <img src="/photos/IMG_0103.jpg" className="w-full h-full object-cover object-top" alt="Charmant Nyungu K." />
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-transparent"></div>
        </div>
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <p className="text-3xl md:text-6xl font-black text-white leading-tight mb-8">
            "Le bond technologique de l'Afrique n'est pas une option, c'est l'impératif de notre génération pour exister au banquet de la mondialisation."
          </p>
          <div className="font-bold text-white uppercase tracking-widest text-sm">— Charmant Nyungu K.</div>
        </div>
      </section>
    </>
  );
};

export default Home;
