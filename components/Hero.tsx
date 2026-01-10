
import React, { useState, useEffect } from 'react';

const Hero: React.FC = () => {
  const slogans = [
    "Bâtir l'avenir Technologique de l'Afrique.",
    "Transformer les données en décisions.",
    "Innover pour la souveraineté numérique.",
    "Former les leaders de demain.",
    "L'IA au service du continent.",
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
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/photos/f1374e3a-3aaf-466b-87eb-6bc2f713d5e3.jpg.JPG" 
          alt="Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/40"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-400/50 bg-amber-500/20 backdrop-blur-sm text-amber-300 text-xs font-bold uppercase tracking-widest mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            Innovation & Souveraineté
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-8 drop-shadow-lg min-h-[180px] lg:min-h-[220px]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
              {displayedText}
            </span>
            <span className="animate-pulse text-amber-400">|</span>
          </h1>
          <p className="text-lg text-white/90 mb-10 max-w-xl leading-relaxed drop-shadow-md">
            Consultant expert en transformation digitale et porteur d'une vision panafricaine engagée. 
            J'accompagne les institutions dans la maîtrise des technologies de rupture pour un impact durable.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#contact" className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-all shadow-xl shadow-amber-500/30">
              Travaillons Ensemble
            </a>
            <a href="#services" className="px-8 py-4 border-2 border-white/50 hover:border-white hover:bg-white/10 text-white font-bold rounded-xl transition-all backdrop-blur-sm">
              Découvrir mon expertise
            </a>
          </div>
        </div>

        {/* Citation flottante à droite */}
        <div className="relative hidden md:flex items-center justify-center">
          <div className="bg-slate-900/70 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/20 max-w-md">
            <div className="text-white text-lg font-medium italic mb-4 leading-relaxed">"La technologie n'est pas une fin, c'est le levier de notre dignité retrouvée."</div>
            <div className="font-bold text-amber-400">— Charmant Nyungu K.</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
