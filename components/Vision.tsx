
import React from 'react';

const Vision: React.FC = () => {
  return (
    <section id="vision" className="py-24 overflow-hidden relative bg-white">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1 relative">
            <div className="grid grid-cols-2 gap-4">
                <img src="/photos/IMG_0862.jpg" className="rounded-2xl border border-slate-100 shadow-md object-cover h-64 w-full" alt="Charmant Nyungu K. - Vision panafricaine" />
                <div className="pt-12">
                   <img src="/photos/IMG_1621.jpg" className="rounded-2xl border border-slate-100 shadow-md object-cover h-64 w-full" alt="Charmant Nyungu K. - Innovation technologique" />
                </div>
            </div>
            {/* Absolute badge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 bg-slate-900 rounded-full text-white font-black text-xl text-center shadow-2xl border-4 border-white">
                UNION<br/>& TECH
            </div>
        </div>

        <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-slate-900">Panafricanisme du <span className="text-amber-600">21ème Siècle</span></h2>
            <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                Le panafricanisme ne doit plus être une simple incantation politique, mais une réalité opérationnelle. Ma mission est de transformer les idéaux de solidarité continentale en infrastructures technologiques communes.
            </p>
            <div className="space-y-6">
                {[
                    { title: "Intégration", text: "Favoriser l'interopérabilité des systèmes numériques entre les nations africaines." },
                    { title: "Éducation", text: "Promouvoir une littératie numérique ancrée dans nos réalités culturelles." },
                    { title: "Impact", text: "Déployer des innovations qui servent d'abord les populations les plus vulnérables." }
                ].map((item, idx) => (
                    <div key={idx} className="flex gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                        <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-700 font-bold">
                            0{idx + 1}
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                            <p className="text-sm text-slate-600">{item.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default Vision;
