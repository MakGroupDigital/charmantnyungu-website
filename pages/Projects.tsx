
import React from 'react';
import PageMasthead from '../components/PageMasthead';

const Projects: React.FC = () => {
  const projects = [
    { title: "Clara.ai", desc: "Modèle LLM RH basé sur l'IA : tri de CV, recrutement, entretiens vidéo.", category: "IA / RH" },
    { title: "Zua-Car", desc: "Solution automobile tout-en-un pour le marché africain.", category: "E-commerce" },
    { title: "Système Identification Anciens Combattants", desc: "Solution pour l'enregistrement et la gestion sécurisée.", category: "Gouvernance" },
    { title: "Mosala App", desc: "Application dédiée à l'emploi et à la mise en relation des talents.", category: "Emploi" },
    { title: "Banho App", desc: "Solution e-commerce adaptée au marché local congolais.", category: "Retail" },
    { title: "LUQUAV App", desc: "Outil de gestion immobilière et de suivi de construction.", category: "PropTech" },
    { title: "Imani-Magazine", desc: "Magazine panafricaniste pour une perspective renouvelée.", category: "Edition" },
    { title: "Système William Booth", desc: "Génération et gestion de cartes d'étudiants intelligentes.", category: "EduTech" }
  ];

  return (
    <div className="inner-page page-projects">
      <PageMasthead number={"03"} title={"Projets"} signature={"Projets & réalisations"} description={"Explorez une sélection de projets qui illustrent ma passion pour la création de solutions technologiques innovantes et percutantes."} image={"/photos/IMG_2687.JPG"} />

      <section id="page-content" className="py-24 max-w-7xl mx-auto px-6">
        <div className="project-collection">
          {projects.map((proj, i) => (
            <article key={proj.title} className="project-card">
              <div className="project-card-image"><span className="project-image-number" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span><img src={`https://picsum.photos/seed/${encodeURIComponent(proj.title)}/800/600`} alt={proj.title} loading="lazy" onError={(event) => { event.currentTarget.style.visibility = 'hidden'; }}/><span>{proj.category}</span></div>
              <div className="project-card-body"><span>PROJET {String(i + 1).padStart(2, '0')}</span><h2>{proj.title}</h2><p>{proj.desc}</p><a href={`mailto:consultant@charmantnyungu.com?subject=${encodeURIComponent('En savoir plus sur ' + proj.title)}`}>En savoir plus sur ce projet <span aria-hidden="true">↗</span></a></div>
            </article>
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
