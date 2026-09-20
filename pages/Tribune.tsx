
import React from 'react';
import PageMasthead from '../components/PageMasthead';

const Tribune: React.FC = () => {
  const themes = [
    {
      title: "La jeunesse africaine, force dormante ou moteur du renouveau ?",
      content: "Pour Charmant, la jeunesse est la ressource stratégique du continent. Tant qu'elle ne comprend pas la puissance du savoir technologique, elle reste vulnérable face à la dépendance.",
      quote: "Nous ne sommes pas condamnés à suivre le monde ; nous avons la capacité de le redéfinir."
    },
    {
      title: "L'innovation technologique comme arme d'émancipation",
      content: "L'Afrique ne peut se contenter d'outils conçus ailleurs. La technologie doit être un instrument de souveraineté et de dignité collective.",
      quote: "Importer des technologies sans créer les nôtres, c'est importer aussi les dépendances."
    },
    {
      title: "Le panafricanisme du XXIᵉ siècle : de l'idéologie à la stratégie",
      content: "Un panafricanisme pragmatique et opérationnel : coopération économique, scientifique et numérique concrète entre les nations.",
      quote: "L'unité africaine n'est pas un rêve ancien, c'est une équation moderne."
    },
    {
      title: "Gouvernance et transformation digitale de l'État",
      content: "Milite pour une révolution administrative numérique : digitalisation des processus, transparence et traçabilité des décisions.",
      quote: "Un État moderne se mesure à la qualité de ses systèmes numériques."
    },
    {
      title: "Le leadership africain face au défi de la cohérence",
      content: "Mise en lumière de la crise du leadership. La solution passe par un leadership de transformation basé sur la connaissance.",
      quote: "L'Afrique ne manque pas de leaders, elle manque d'ingénieurs du changement."
    },
    {
      title: "L'Afrique face à la révolution des données",
      content: "À l'ère de l'IA, les données sont le nouveau pétrole. Alerte sur le danger de céder nos données stratégiques sans infrastructure locale.",
      quote: "Nos données valent plus que nos mines. Et pourtant, elles s'exploitent en silence."
    }
  ];

  return (
    <div className="inner-page page-tribune">
      <PageMasthead number={"07"} title={"Tribune & Opinions"} signature={"Une parole engagée pour une Afrique consciente"} description={"Chaque réflexion est un appel à la responsabilité, à l’action et à la transformation collective."} image={"/photos/IMG_0055.jpg"} />

      <section id="page-content" className="py-24 max-w-5xl mx-auto px-6">
        <div className="space-y-20">
          {themes.map((t, i) => (
            <div key={i} className="group relative">
               <div className="absolute -left-12 top-0 text-6xl font-black text-slate-100 hidden lg:block">{(i+1).toString().padStart(2, '0')}</div>
               <h2 className="text-3xl font-bold mb-6 text-slate-900 group-hover:text-amber-600 transition-colors">{t.title}</h2>
               <p className="text-lg text-slate-600 leading-relaxed mb-8">{t.content}</p>
               <div className="p-8 bg-slate-900 text-white rounded-3xl relative overflow-hidden">
                  <div className="absolute top-4 right-8 text-6xl font-serif text-amber-500/20">"</div>
                  <p className="text-xl font-serif italic mb-4 relative z-10">{t.quote}</p>
                  <div className="text-xs font-bold uppercase tracking-widest text-amber-500">— Charmant Nyungu K.</div>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* Subscription CTA */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Suivre les réflexions</h2>
          <p className="text-slate-600 mb-10">Recevez les dernières analyses stratégiques directement dans votre boîte mail.</p>
          <div className="flex gap-4 max-w-md mx-auto">
             <input type="email" placeholder="Votre email" className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500" />
             <button className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold">S'abonner</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tribune;
