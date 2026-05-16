
import React from 'react';

const Vision: React.FC = () => {
  return (
    <section id="vision" className="cnk-section py-24 md:py-32 overflow-hidden relative bg-[linear-gradient(135deg,#ffffff_0%,#f8fafc_52%,#ecfeff_130%)]">
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1 relative">
            <div className="grid grid-cols-2 gap-4 md:gap-5">
                <img src="/photos/IMG_0862.jpg" className="h-72 w-full rounded-[1.4rem] border border-white shadow-2xl shadow-slate-900/10 object-cover md:h-[420px]" alt="Charmant Nyungu K. - Vision panafricaine" />
                <div className="pt-12 md:pt-20">
                   <img src="/photos/IMG_1621.jpg" className="h-72 w-full rounded-[1.4rem] border border-white shadow-2xl shadow-slate-900/10 object-cover md:h-[420px]" alt="Charmant Nyungu K. - Innovation technologique" />
                </div>
            </div>
            <div className="absolute left-1/2 top-1/2 grid h-40 w-40 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-slate-950 text-center text-white shadow-2xl shadow-slate-900/25">
                <div>
                  <div className="text-[10px] font-body font-black uppercase tracking-[0.28em] text-amber-300">Union</div>
                  <div className="mt-1 text-3xl font-black leading-none">& TECH</div>
                </div>
            </div>
            <div className="absolute -bottom-8 left-8 hidden max-w-xs rounded-2xl border border-slate-200 bg-white/[0.88] p-5 text-sm leading-relaxed text-slate-600 shadow-2xl backdrop-blur md:block">
              Le panafricanisme devient concret lorsqu'il produit des standards, des plateformes et des talents capables de durer.
            </div>
        </div>

        <div className="order-1 lg:order-2">
            <p className="cnk-kicker mb-5 text-amber-700">Doctrine</p>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-slate-950">Panafricanisme du <span className="text-amber-600">21ème Siècle</span></h2>
            <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                Le panafricanisme ne doit plus être une simple incantation politique, mais une réalité opérationnelle. Ma mission est de transformer les idéaux de solidarité continentale en infrastructures technologiques communes.
            </p>
            <div className="space-y-4">
                {[
                    { title: "Intégration", text: "Favoriser l'interopérabilité des systèmes numériques entre les nations africaines." },
                    { title: "Éducation", text: "Promouvoir une littératie numérique ancrée dans nos réalités culturelles." },
                    { title: "Impact", text: "Déployer des innovations qui servent d'abord les populations les plus vulnérables." }
                ].map((item, idx) => (
                    <div key={idx} className="cnk-card flex gap-4 rounded-2xl p-5 transition-all hover:-translate-y-1 hover:border-amber-200">
                        <div className="flex-shrink-0 w-12 h-12 bg-slate-950 rounded-xl flex items-center justify-center text-amber-300 font-bold">
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
