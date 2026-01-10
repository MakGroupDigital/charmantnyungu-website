
import React from 'react';

const Legal: React.FC = () => {
  return (
    <div className="pt-24 bg-white">
      <section className="py-24 max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-12 italic border-b-4 border-amber-500 pb-4 inline-block">Mentions Légales</h1>
        
        <div className="space-y-12 text-slate-600 leading-relaxed">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4 uppercase tracking-widest">1. Éditeur du Site</h2>
            <p>Nom: Charmant Nyungu K.<br/>Statut: Consultant Indépendant<br/>Adresse: Kinshasa, République Démocratique du Congo<br/>Contact: via le formulaire de contact du site.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4 uppercase tracking-widest">2. Directeur de la Publication</h2>
            <p>Le directeur de la publication est Charmant Nyungu K.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4 uppercase tracking-widest">3. Hébergement</h2>
            <p>Ce site est hébergé par une infrastructure cloud moderne via les services de Google Cloud et Firebase.<br/>Hébergeur: Google LLC<br/>Adresse: 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA.</p>
          </div>

          <div className="pt-12 mt-12 border-t border-slate-100">
            <h1 className="text-4xl font-bold mb-12 italic border-b-4 border-amber-500 pb-4 inline-block">Politique de Confidentialité</h1>
            <p className="mb-8 font-bold text-slate-900">Dernière mise à jour: 24 Juillet 2024</p>
            
            <div className="space-y-8">
              <section>
                <h3 className="font-bold text-slate-900 mb-2">1. Collecte de l'Information</h3>
                <p>Nous collectons des informations lorsque vous utilisez notre site, notamment via le formulaire de contact (nom, email, message). Des données de navigation anonymes peuvent être collectées via Google Analytics.</p>
              </section>

              <section>
                <h3 className="font-bold text-slate-900 mb-2">2. Utilisation des Informations</h3>
                <p>Les informations servent à répondre à vos demandes, améliorer le site et personnaliser votre expérience utilisateur.</p>
              </section>

              <section>
                <h3 className="font-bold text-slate-900 mb-2">3. Protection des Informations</h3>
                <p>Nous utilisons le protocole HTTPS pour chiffrer les communications et limiter l'accès aux données personnelles.</p>
              </section>

              <section>
                <h3 className="font-bold text-slate-900 mb-2">4. Vos Droits</h3>
                <p>Vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles. Contactez-nous via le formulaire de contact.</p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Legal;
