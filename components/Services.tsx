
import React from 'react';

const Services: React.FC = () => {
  const services = [
    {
      title: "Innovation Stratégique",
      description: "Accompagnement à la définition de feuilles de route technologiques alignées sur les enjeux de croissance africains.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      title: "Souveraineté Numérique",
      description: "Expertise en infrastructures locales et solutions open-source pour garantir l'indépendance des données et des services.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Conseil en IA & Big Data",
      description: "Intégration éthique de l'intelligence artificielle pour résoudre des problématiques concrètes : santé, agriculture, éducation.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      title: "Mentorat Panafricain",
      description: "Formation et coaching de la nouvelle génération de leaders technologiques sur le continent.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    }
  ];

  return (
    <section id="services" className="cnk-section py-24 md:py-32 bg-slate-950 relative overflow-hidden text-white">
      <div className="absolute inset-0 opacity-[0.18]">
        <img src="/photos/IMG_1837.jpg" className="h-full w-full object-cover" alt="Texture institutionnelle" />
        <div className="absolute inset-0 bg-slate-950/80"></div>
      </div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-20 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="cnk-kicker mb-5 text-amber-300">Expertise</p>
            <h2 className="text-4xl md:text-6xl font-bold text-white">Expertise institutionnelle</h2>
          </div>
            <p className="text-white/66 max-w-2xl text-lg leading-relaxed lg:ml-auto">
              Une approche rigoureuse qui mêle pragmatisme technique et ambition politique pour une Afrique souveraine.
            </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, index) => (
            <div key={index} className="group relative min-h-[310px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.055] p-7 backdrop-blur-md transition-all hover:-translate-y-1 hover:border-amber-300/50 hover:bg-white/[0.085]">
              <div className="absolute right-5 top-5 font-body text-[11px] font-black uppercase tracking-[0.28em] text-white/20">0{index + 1}</div>
              <div className="mb-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-300/25 bg-amber-300/10 text-amber-300 transition-all duration-300 group-hover:bg-amber-400 group-hover:text-slate-950">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
              <p className="text-white/62 text-sm leading-relaxed">
                {service.description}
              </p>
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-amber-400 transition-all duration-300 group-hover:w-full"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
