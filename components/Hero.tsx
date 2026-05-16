
import React, { useState, useEffect } from 'react';

const Hero: React.FC = () => {
  const slogans = [
    "Bâtir l'avenir technologique de l'Afrique.",
    "Transformer les données en décisions d'Etat.",
    "Porter une souveraineté numérique assumée.",
    "Structurer les leaderships de demain.",
    "Mettre l'innovation au service du continent.",
  ];

  const [currentSloganIndex, setCurrentSloganIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentSlogan = slogans[currentSloganIndex];
    
    if (isTyping) {
      if (charIndex < currentSlogan.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(currentSlogan.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, 80);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2500);
        return () => clearTimeout(timeout);
      }
    } else {
      if (charIndex > 0) {
        const timeout = setTimeout(() => {
          setDisplayedText(currentSlogan.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, 40);
        return () => clearTimeout(timeout);
      } else {
        setCurrentSloganIndex((prev) => (prev + 1) % slogans.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, currentSloganIndex]);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden pt-24">
      <div className="absolute inset-0 z-0">
        <img 
          src="/photos/f1374e3a-3aaf-466b-87eb-6bc2f713d5e3.jpg.JPG" 
          alt="Background" 
          className="h-full w-full object-cover object-[82%_center] [image-rendering:auto] md:object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.56)_0%,rgba(2,6,23,0.4)_42%,rgba(2,6,23,0.18)_70%,rgba(2,6,23,0.08)_100%)] md:bg-[linear-gradient(90deg,rgba(2,6,23,0.92)_0%,rgba(2,6,23,0.84)_42%,rgba(2,6,23,0.56)_70%,rgba(2,6,23,0.3)_100%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.05),_transparent_24%)] md:bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.16),_transparent_30%)]"></div>
      </div>

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-6rem)] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="pt-40 md:pt-0">
          <h1 className="mb-8 ml-auto max-w-[16rem] text-right text-4xl font-black leading-[1.02] text-white md:ml-0 md:max-w-4xl md:text-left md:text-6xl lg:text-7xl">
            Consultant en technologie
            <span className="block text-amber-400">et panafricaniste</span>
          </h1>

          <div className="mb-8 hidden rounded-2xl border border-white/10 bg-white/[0.08] p-5 backdrop-blur-md md:block">
            <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-amber-300">
              Orientation du moment
            </div>
            <div className="min-h-[68px] text-2xl font-semibold leading-tight text-white md:min-h-[72px]">
              {displayedText}
              <span className="animate-pulse text-amber-400">|</span>
            </div>
          </div>

          <p className="mb-10 hidden max-w-xl rounded-2xl border border-white/10 bg-slate-950/55 px-5 py-4 text-base leading-relaxed text-white shadow-lg backdrop-blur-sm md:block md:max-w-2xl md:bg-transparent md:px-0 md:py-0 md:text-lg md:text-white/88 md:shadow-none md:backdrop-blur-none">
            Consultant en innovation technologique, souverainete numerique et intelligence artificielle, j'accompagne
            les institutions, les dirigeants et les projets structurants dans la construction d'une Afrique plus stable,
            plus competente et plus maitresse de ses infrastructures strategiques.
          </p>

          <div className="mb-10 hidden max-w-3xl gap-4 sm:grid-cols-3 md:grid">
            {[
              { value: 'Vision', label: 'Leadership technologique de long terme' },
              { value: 'Etat', label: 'Approche institutionnelle et gouvernance' },
              { value: 'Impact', label: 'Solutions utiles, souveraines et durables' },
            ].map((item) => (
              <div key={item.value} className="rounded-2xl border border-white/10 bg-slate-950/35 p-4 backdrop-blur-md">
                <div className="text-sm font-black uppercase tracking-[0.24em] text-amber-300">{item.value}</div>
                <div className="mt-2 text-sm leading-relaxed text-white/75">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 md:flex md:gap-4">
            <a href="#contact" className="rounded-xl bg-amber-500 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-950 transition-colors hover:bg-amber-400 md:hidden">
              Obtenir un entretien
            </a>
            <a href="#services" className="rounded-xl border border-white/25 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:border-amber-400 hover:bg-white/10 md:hidden">
              Consulter l'expertise
            </a>
            <a href="/projets" className="rounded-xl border border-white/25 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:border-amber-400 hover:bg-white/10 md:hidden">
              Mes realisations
            </a>
            <a href="#contact" className="hidden rounded-xl bg-amber-500 px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-slate-950 transition-colors hover:bg-amber-400 md:inline-flex">
              Demander une audience
            </a>
            <a href="#services" className="hidden rounded-xl border border-white/25 px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white transition-colors hover:border-amber-400 hover:bg-white/10 md:inline-flex">
              Consulter l'expertise
            </a>
            <a href="/immersive/index.html" className="hidden rounded-xl border border-amber-300/70 bg-white/10 px-8 py-4 text-sm font-black uppercase tracking-[0.2em] text-amber-200 shadow-2xl shadow-amber-950/20 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:bg-amber-400 hover:text-slate-950 md:inline-flex">
              Acceder a la version immersive
            </a>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="ml-auto max-w-lg">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 shadow-2xl backdrop-blur-md">
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-amber-500/18 to-transparent" />
              <div className="grid gap-0">
                <div className="relative h-[420px] overflow-hidden">
                  <img
                    src="/photos/IMG_1838.jpg"
                    alt="Charmant Nyungu K. - Portrait officiel"
                    className="h-full w-full object-cover object-[32%_18%] scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/18 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-amber-300">
                      Message de vision
                    </div>
                    <p className="max-w-md text-2xl font-semibold leading-tight text-white">
                      "La modernite africaine se construira par des institutions fortes et des systemes numeriques souverains."
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 border-t border-white/10 bg-slate-950/75">
                  {[
                    { value: 'IA', label: 'Gouvernance' },
                    { value: 'Data', label: 'Decision' },
                    { value: 'Cyber', label: 'Resilience' },
                  ].map((item) => (
                    <div key={item.value} className="border-r border-white/10 px-5 py-5 last:border-r-0">
                      <div className="text-lg font-black uppercase tracking-[0.2em] text-amber-300">{item.value}</div>
                      <div className="mt-1 text-xs uppercase tracking-[0.2em] text-white/65">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute -left-10 bottom-10 max-w-xs rounded-2xl border border-white/10 bg-slate-950/85 p-6 backdrop-blur-md">
              <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.28em] text-amber-300">
                Priorite
              </div>
              <p className="text-sm leading-relaxed text-white/80">
                Faire converger leadership public, excellence technique et souverainete numerique dans un meme cap strategique.
              </p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
