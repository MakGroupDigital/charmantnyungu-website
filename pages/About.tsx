
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="pt-24 bg-white">
      {/* Hero */}
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-black mb-8">À Propos</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed italic">
            "Un esprit d'innovation au service de l'Afrique et du monde."
          </p>
        </div>
      </section>

      {/* Présentation */}
      <section className="py-24 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl font-bold mb-8 text-slate-900">Un innovateur au parcours multidimensionnel</h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-6">
            Consultant en innovation technologique, en transformation digitale et en stratégie panafricaniste, passionné par la création de solutions durables et intelligentes adaptées aux réalités africaines.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed mb-10">
            Visionnaire et acteur engagé, il œuvre pour bâtir une Afrique forte, souveraine et technologiquement indépendante. Son approche allie rigueur scientifique et pragmatisme opérationnel.
          </p>
          <div className="p-8 bg-amber-50 rounded-3xl border border-amber-100">
            <h4 className="text-amber-900 font-bold mb-4 italic">"La technologie n'est qu'un outil ; la vision est ce qui change le monde."</h4>
            <div className="text-amber-700 font-bold">— Charmant Nyungu K.</div>
          </div>
        </div>
        <div className="relative">
          <img src="/photos/IMG_1838.jpg" className="rounded-3xl shadow-2xl object-cover w-full h-[500px]" alt="Charmant Nyungu K. - Portrait professionnel" />
          <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-amber-500 rounded-2xl flex items-center justify-center p-8 text-white font-black text-2xl leading-tight">5+ ANS D'IMPACT</div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20">
          <div>
            <h2 className="text-4xl font-bold mb-12 text-amber-500">Vision</h2>
            <p className="text-xl font-light mb-12 opacity-80 leading-relaxed">Faire de la technologie un moteur d'émancipation et de souveraineté pour l'Afrique, en maîtrisant la science, l'innovation et le numérique.</p>
            <div className="space-y-8">
              {[
                { t: "Innovation Utile", d: "Créer des outils qui résolvent des problèmes concrets." },
                { t: "Souveraineté Numérique", d: "Promouvoir les solutions technologiques locales." },
                { t: "Jeunesse comme Moteur", d: "Investir dans la créativité et l'esprit entrepreneurial." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-1.5 h-auto bg-amber-500"></div>
                  <div>
                    <h4 className="font-bold mb-1">{item.t}</h4>
                    <p className="text-sm opacity-60">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-12 text-orange-500">Mission</h2>
            <p className="text-xl font-light mb-12 opacity-80 leading-relaxed">Placer la data science et l'IA au cœur de l'action pour une Afrique autonome face à ses défis.</p>
            <div className="space-y-8">
              {[
                { t: "Former", d: "Les jeunes à la culture technologique et critique." },
                { t: "Transformer", d: "Les entreprises en acteurs performants de l'économie." },
                { t: "Bâtir", d: "Des infrastructures digitales solides et compétitives." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-1.5 h-auto bg-orange-500"></div>
                  <div>
                    <h4 className="font-bold mb-1">{item.t}</h4>
                    <p className="text-sm opacity-60">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leader d'opinion */}
      <section className="py-24 bg-white text-center max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-8">Un leader d'opinion engagé</h2>
        <p className="text-lg text-slate-600 leading-relaxed mb-12">
          Au-delà de ses activités de consultant, Charmant Nyungu K. est une voix influente dans les domaines de la jeunesse, de la technologie, de la politique et du panafricanisme, abordant les grands enjeux de la gouvernance numérique et du leadership responsable à travers ses réflexions publiques.
        </p>
        <div className="flex justify-center gap-12">
           <div className="text-slate-400 font-bold tracking-widest text-xs uppercase">7+ Projets Lancés</div>
           <div className="text-slate-400 font-bold tracking-widest text-xs uppercase">100+ Entreprises Accompagnées</div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Prêt à transformer vos idées en réalité ?</h2>
          <p className="text-slate-600 mb-10 text-lg">Discutons de la manière dont nous pouvons collaborer pour créer un impact durable.</p>
          <a href="#contact" className="inline-block bg-amber-600 text-white px-10 py-4 rounded-xl font-bold shadow-xl shadow-amber-200 hover:bg-amber-700 transition-all">Collaborer ensemble</a>
        </div>
      </section>
    </div>
  );
};

export default About;
