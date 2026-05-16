
import React, { useState, useEffect } from 'react';

const InteractiveSections: React.FC = () => {
  return (
    <div className="bg-slate-50">
      <ClusteringViz />
      <QuizSection />
      <ROICalculator />
      <PhishingGame />
    </div>
  );
};

const ClusteringViz = () => {
  const [dots, setDots] = useState<{x: number, y: number, color: string}[]>([]);
  
  useEffect(() => {
    const newDots = Array.from({length: 40}).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: Math.random() > 0.5 ? 'bg-amber-500' : 'bg-orange-600'
    }));
    setDots(newDots);
  }, []);

  return (
    <section className="cnk-section py-24 md:py-32 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
      <div className="cnk-card relative h-96 overflow-hidden rounded-[1.75rem] bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(245,158,11,0.22),transparent_32%),linear-gradient(135deg,rgba(15,23,42,0.98),rgba(30,41,59,0.94))]"></div>
        {dots.map((dot, i) => (
          <div key={i} className={`absolute w-3 h-3 rounded-full ${dot.color} transition-all duration-1000 animate-pulse shadow-lg shadow-amber-500/20`} 
               style={{left: `${dot.x}%`, top: `${dot.y}%`}}></div>
        ))}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="h-48 w-48 rounded-full border border-dashed border-amber-200/45 animate-spin-slow"></div>
          <div className="absolute h-24 w-24 rounded-full border border-cyan-200/30 animate-drift"></div>
        </div>
        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-xs font-bold uppercase tracking-[0.22em] text-white/70 backdrop-blur">
          <span>Signal brut</span>
          <span className="text-amber-300">Clustering IA</span>
        </div>
      </div>
      <div>
        <p className="cnk-kicker mb-5 text-amber-700">Laboratoire vivant</p>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-950">Visualisation d'algorithmes IA</h2>
        <p className="text-slate-600 leading-relaxed mb-8">
          Observez une simulation d'un algorithme de clustering (K-Means) en action. Cette démo illustre comment l'IA peut identifier des groupes pertinents à partir de données brutes pour optimiser vos processus.
        </p>
        <button onClick={() => {
           setDots(dots.map(d => ({...d, x: Math.random()*100, y: Math.random()*100})))
        }} className="cnk-button bg-slate-950 px-6 text-white shadow-xl shadow-slate-900/10 hover:bg-amber-600">Relancer la simulation</button>
      </div>
    </section>
  );
};

const QuizSection = () => {
  const questions = [
    { q: "Quel pays est souvent surnommé la 'Silicon Savannah' ?", a: "Kenya", options: ["Nigeria", "Afrique du Sud", "Kenya", "Égypte"] },
    { q: "Technologie de paiement la plus répandue en Afrique de l'Est ?", a: "USSD", options: ["NFC", "QR Codes", "USSD", "Cryptomonnaies"] },
    { q: "L'initiative 'Smart Africa' vise principalement à ?", a: "Accélérer le développement grâce aux TIC", options: ["Créer une monnaie numérique", "Accélérer le développement grâce aux TIC", "Lancer un programme spatial", "Standardiser les langages"] }
  ];
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (opt: string) => {
    if (opt === questions[current].a) setScore(score + 1);
    if (current + 1 < questions.length) setCurrent(current + 1);
    else setShowResult(true);
  };

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="cnk-kicker mb-5 justify-center text-amber-700">Culture tech</p>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-950">Quiz : Tech Africaine</h2>
        <p className="text-slate-600 mb-12">Testez vos connaissances sur l'écosystème technologique africain.</p>
        
        {!showResult ? (
          <div className="cnk-card p-6 rounded-[1.75rem] md:p-8">
            <h3 className="text-2xl font-bold mb-8">{questions[current].q}</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {questions[current].options.map(opt => (
                <button key={opt} onClick={() => handleAnswer(opt)} className="rounded-2xl border border-slate-200 bg-white p-4 font-bold transition-all hover:-translate-y-1 hover:border-amber-500 hover:text-amber-600 hover:shadow-lg">
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-[1.75rem] border border-amber-200 bg-amber-50 p-12">
            <h3 className="text-3xl font-black text-amber-900 mb-4">Résultat : {score}/{questions.length}</h3>
            <p className="text-amber-700 mb-8">Bravo pour votre engagement envers l'innovation africaine !</p>
            <button onClick={() => {setCurrent(0); setScore(0); setShowResult(false);}} className="cnk-button bg-amber-600 px-8 text-white">Recommencer</button>
          </div>
        )}
      </div>
    </section>
  );
};

const ROICalculator = () => {
  const [inputs, setInputs] = useState({ inv: 10000, maint: 2000, prod: 15000, rev: 5000 });
  const roi = (( (inputs.prod + inputs.rev) - (inputs.inv + inputs.maint) ) / (inputs.inv + inputs.maint) * 100).toFixed(0);

  return (
    <section className="cnk-section py-24 md:py-32 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
      <div>
        <p className="cnk-kicker mb-5 text-amber-700">Decision</p>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-950">Calculateur de ROI technologique</h2>
        <p className="text-slate-600 leading-relaxed mb-8">
          Estimez le retour sur investissement de votre projet digital. Entrez les chiffres clés pour obtenir une projection de la valeur générée par votre transformation numérique.
        </p>
        <div className="grid gap-4">
           {Object.keys(inputs).map(key => (
             <div key={key}>
               <label className="block text-xs font-bold uppercase text-slate-500 mb-2">{key === 'inv' ? 'Investissement ($)' : key === 'maint' ? 'Maintenance ($)' : key === 'prod' ? 'Productivité ($)' : 'Revenus ($)'}</label>
               <input type="number" value={inputs[key as keyof typeof inputs]} onChange={e => setInputs({...inputs, [key]: Number(e.target.value)})} className="w-full rounded-xl border border-slate-200 bg-white p-3 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100" />
             </div>
           ))}
        </div>
      </div>
      <div className="relative overflow-hidden rounded-[1.75rem] bg-slate-950 p-12 text-center text-white shadow-2xl">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,158,11,0.28),transparent_40%)]"></div>
         <div className="relative z-10">
         <div className="text-sm font-bold uppercase tracking-[0.3em] mb-4 text-amber-500">Estimation ROI Année 1</div>
         <div className="text-8xl font-black mb-6">{roi}%</div>
         <div className="text-slate-400">Projection basée sur une transformation digitale optimisée.</div>
         </div>
      </div>
    </section>
  );
};

const PhishingGame = () => {
  const examples = [
    { title: "LÉGITIME", from: "support@github.com", subj: "A new pull request opened", legit: true },
    { title: "PHISHING", from: "service-client@banque-mondiale.com", subj: "URGENT: Problème de sécurité", legit: false },
    { title: "PHISHING", from: "securite@google.support-intl.com", subj: "Alerte de connexion", legit: false }
  ];
  const [curr, setCurr] = useState(0);
  const [feedback, setFeedback] = useState("");

  const check = (isLegit: boolean) => {
    if (isLegit === examples[curr].legit) setFeedback("Correct ! Bien vu.");
    else setFeedback("Erreur. C'était un piège !");
    setTimeout(() => {
      setFeedback("");
      setCurr((curr + 1) % examples.length);
    }, 2000);
  };

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="cnk-kicker mb-5 justify-center text-amber-700">Cyber reflexe</p>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-950">Détecteur de phishing</h2>
        <p className="text-slate-600 mb-12">La cybersécurité est l'affaire de tous. Saurez-vous repérer les tentatives ?</p>
        <div className="cnk-card p-6 rounded-[1.75rem] text-left relative overflow-hidden md:p-8">
           <div className="mb-4 text-sm"><span className="font-bold">De:</span> {examples[curr].from}</div>
           <div className="mb-8 text-sm"><span className="font-bold">Sujet:</span> {examples[curr].subj}</div>
           <div className="flex gap-4">
             <button onClick={() => check(true)} className="flex-1 py-3 bg-green-100 text-green-700 font-bold rounded-xl border border-green-200 hover:bg-green-200 transition-colors">LÉGITIME</button>
             <button onClick={() => check(false)} className="flex-1 py-3 bg-red-100 text-red-700 font-bold rounded-xl border border-red-200 hover:bg-red-200 transition-colors">PHISHING</button>
           </div>
           {feedback && <div className="animate-fade-in absolute inset-0 bg-slate-900/90 flex items-center justify-center text-white text-2xl font-bold">{feedback}</div>}
        </div>
      </div>
    </section>
  );
};

export default InteractiveSections;
