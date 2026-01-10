
import React from 'react';

const Expertise: React.FC = () => {
  const domains = [
    {
      id: "01",
      title: "Data Science, Analytique et IA",
      desc: "Au cœur de ses compétences se trouve la maîtrise de la donnée. Charmant conçoit et implémente des systèmes d'analyse avancée pour transformer les données en intelligence décisionnelle.",
      points: ["Conception de pipelines de données", "Machine Learning & IA appliquée", "Tableaux de bord stratégiques", "Souveraineté des données"]
    },
    {
      id: "02",
      title: "Innovation et Conception Digitale",
      desc: "Architecte de solutions complètes, il dirige la création de plateformes web et mobiles adaptées aux besoins africains et internationaux.",
      points: ["Développement FlutterFlow/Firebase", "Architectures Cloud performantes", "UI/UX adaptatif", "Performance logicielle"]
    },
    {
      id: "03",
      title: "Cybersécurité et Gouvernance",
      desc: "Accompagnement dans la mise en place de stratégies de défense robustes. Audit de sécurité et sensibilisation des équipes techniques.",
      points: ["Audit des risques informatiques", "Sécurisation réseaux & cloud", "Résilience numérique africaine", "Détection d'incidents"]
    },
    {
      id: "04",
      title: "Stratégie Digitale et Marketing",
      desc: "Aide les institutions à bâtir une présence impactante combinant storytelling, data marketing et innovation technologique.",
      points: ["E-réputation & Branding", "Communication institutionnelle", "SEO/SEA stratégique", "Gestion de crise numérique"]
    },
    {
      id: "05",
      title: "Transformation Numérique",
      desc: "Diagnostic digital et accompagnement des organisations dans leur mutation organisationnelle progressive et mesurable.",
      points: ["Digitalisation des processus", "Roadmap technologique", "Accompagnement au changement", "Pilotage de projets complexes"]
    },
    {
      id: "06",
      title: "Leadership et Jeunesse",
      desc: "Construction d'une génération consciente. Mentorat pour stimuler l'esprit d'innovation et la responsabilité sociale.",
      points: ["Mentorat entrepreneurial", "Plaidoyer souveraineté", "Partenariats talents", "Innovation sociale"]
    }
  ];

  return (
    <div className="pt-24 bg-white">
      {/* Header */}
      <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img src="/photos/IMG_7837.JPG" className="w-full h-full object-cover" alt="Background expertise" />
          <div className="absolute inset-0 bg-slate-950/80"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-6xl font-black mb-8 italic">Expertise</h1>
          <p className="text-xl text-amber-500 font-bold uppercase tracking-widest mb-8">Une expertise complète au service de l'innovation</p>
          <p className="text-slate-400 max-w-3xl mx-auto leading-relaxed text-lg">
            L'approche de Charmant Nyungu K. relie la data science, l'ingénierie logicielle, la cybersécurité et la transformation organisationnelle pour construire des solutions intégrées et durables.
          </p>
        </div>
      </section>

      {/* Stratégie */}
      <section className="py-24 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center border-b border-slate-100">
        <div>
           <h2 className="text-4xl font-bold mb-6 italic">La Stratégie par l'Action</h2>
           <p className="text-lg text-slate-600 leading-relaxed mb-8">
             Chaque domaine d'expertise est abordé avec une double approche : la vision stratégique pour définir la direction, et l'excellence technique pour garantir la réalisation. Mon objectif est de fournir des solutions robustes, sécurisées et alignées avec vos objectifs à long terme.
           </p>
           <img src="/photos/IMG_0866.jpg" className="rounded-2xl shadow-lg object-cover h-64 w-full" alt="Charmant Nyungu K. en action" />
        </div>
        <div className="bg-slate-50 p-8 rounded-3xl grid grid-cols-2 gap-4">
           {[5, 7, 100, "∞"].map((val, i) => (
             <div key={i} className="bg-white p-6 rounded-2xl shadow-sm text-center border border-slate-100">
                <div className="text-3xl font-black text-amber-600 mb-1">{val}</div>
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                  {i === 0 ? "Ans d'expertise" : i === 1 ? "Projets lancés" : i === 2 ? "Entreprises" : "Impact"}
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* Domaines Détaillés */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {domains.map(d => (
            <div key={d.id} className="p-10 rounded-3xl bg-white border border-slate-200 hover:border-amber-500 transition-all group flex flex-col h-full">
              <div className="text-5xl font-black text-slate-100 group-hover:text-amber-50 transition-colors mb-6">{d.id}</div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900 leading-tight">{d.title}</h3>
              <p className="text-slate-600 text-sm mb-8 flex-grow leading-relaxed">{d.desc}</p>
              <div className="pt-6 border-t border-slate-100">
                <ul className="space-y-2">
                   {d.points.map((p, i) => (
                     <li key={i} className="text-xs font-bold text-slate-500 flex items-center gap-2">
                       <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                       {p}
                     </li>
                   ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Conclusion */}
      <section className="py-24 bg-amber-600 text-white text-center">
         <div className="max-w-4xl mx-auto px-6">
           <h2 className="text-4xl font-bold mb-8 italic">Une expertise tournée vers l'avenir</h2>
           <p className="text-xl opacity-90 leading-relaxed font-light">
             L'expertise de Charmant Nyungu K. ne se limite pas à la technique. Elle s'étend à la vision stratégique, à la gouvernance et à la philosophie du changement, pour faire de la technologie un outil de dignité et d'émancipation.
           </p>
         </div>
      </section>
    </div>
  );
};

export default Expertise;
