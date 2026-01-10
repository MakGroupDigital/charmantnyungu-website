
import React from 'react';

const Projects: React.FC = () => {
  const projects = [
    { title: "Clara.ai", desc: "Modèle LLM RH basé sur l'IA : tri de CV, recrutement, entretiens vidéo.", category: "IA / RH" },
    { title: "E Régie PRV", desc: "Plateforme fiscale gouvernementale modernisant la collecte des impôts.", category: "GovTech" },
    { title: "Allo Livreur", desc: "Écosystème logistique intelligent pour l'optimisation des livraisons.", category: "Logistique" },
    { title: "Elenge.cd", desc: "Média numérique panafricain pour la jeunesse et l'entrepreneuriat.", category: "Media" },
    { title: "YA BISO APP", desc: "Plateforme de promotion du tourisme et de la culture congolaise.", category: "Tourisme" },
    { title: "Zua-Car", desc: "Solution automobile tout-en-un pour le marché africain.", category: "E-commerce" },
    { title: "Système Identification Anciens Combattants", desc: "Solution pour l'enregistrement et la gestion sécurisée.", category: "Gouvernance" },
    { title: "Mosala App", desc: "Application dédiée à l'emploi et à la mise en relation des talents.", category: "Emploi" },
    { title: "Banho App", desc: "Solution e-commerce adaptée au marché local congolais.", category: "Retail" },
    { title: "LUQUAV App", desc: "Outil de gestion immobilière et de suivi de construction.", category: "PropTech" },
    { title: "Imani-Magazine", desc: "Magazine panafricaniste pour une perspective renouvelée.", category: "Edition" },
    { title: "Système William Booth", desc: "Génération et gestion de cartes d'étudiants intelligentes.", category: "EduTech" }
  ];

  return (
    <div className="pt-24 bg-white">
      <section className="py-20 bg-slate-50 border-b border-slate-100 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-20 hidden lg:block">
          <img src="/photos/IMG_2687.JPG" className="w-full h-full object-cover" alt="Charmant Nyungu K." />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-50 to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-6xl font-black mb-8 italic">Projets</h1>
          <p className="text-xl text-slate-500 font-bold uppercase tracking-widest mb-4">Projets & Réalisations</p>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Explorez une sélection de projets qui illustrent ma passion pour la création de solutions technologiques innovantes et percutantes.
          </p>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((proj, i) => (
            <div key={i} className="group relative bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-2xl transition-all h-[400px]">
              <div className="absolute inset-0 bg-slate-900 opacity-0 group-hover:opacity-80 transition-opacity z-10"></div>
              <img src={`https://picsum.photos/seed/${proj.title}/800/600`} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" alt={proj.title} />
              
              <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 text-white">
                 <div className="text-[10px] font-bold uppercase tracking-widest text-amber-500 mb-2">{proj.category}</div>
                 <h3 className="text-3xl font-bold mb-4">{proj.title}</h3>
                 <p className="text-sm opacity-80 leading-relaxed mb-6">{proj.desc}</p>
                 <button className="w-fit border-b border-amber-500 text-amber-500 font-bold text-xs uppercase tracking-widest pb-1">Voir les détails</button>
              </div>

              {/* Static Badge for IDLE state */}
              <div className="absolute top-6 left-6 z-20 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-900 group-hover:hidden transition-all shadow-sm">
                {proj.title}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 bg-slate-50 text-center">
         <h2 className="text-2xl font-bold mb-8 italic">Plus de projets en cours de déploiement...</h2>
         <p className="text-slate-500">Contactez-moi pour un portfolio détaillé par secteur d'activité.</p>
      </section>
    </div>
  );
};

export default Projects;
