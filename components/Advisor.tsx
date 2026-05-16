
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Message } from '../types';

const Advisor: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Bonjour, je suis l'assistant d'innovation de Charmant Nyungu K. Comment puis-je vous éclairer sur l'avenir technologique de l'Afrique aujourd'hui ?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user' as const, text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: input,
        config: {
          systemInstruction: "Tu es l'assistant IA de Charmant Nyungu K., expert consultant en innovation technologique et panafricaniste. Ton ton est institutionnel, sage, visionnaire et encourageant. Tu réponds en français. Tu dois promouvoir l'idée que l'Afrique peut devenir un leader technologique mondial par la souveraineté numérique et l'innovation locale. Si on te demande qui est Charmant, explique qu'il est consultant senior et stratège.",
          temperature: 0.7,
        }
      });

      const aiResponse = response.text || "Je m'excuse, je rencontre une difficulté technique pour formuler ma réponse.";
      setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Erreur lors de la connexion avec l'IA. Veuillez réessayer plus tard." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="advisor" className="cnk-section py-24 md:py-32 bg-slate-50">
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white shadow-2xl ring-4 ring-amber-400/35">
              <img src="/photos/IMG_2227.JPG" className="w-full h-full object-cover" alt="Charmant Nyungu K. - AI Advisor" />
            </div>
            <p className="cnk-kicker mb-5 justify-center text-amber-700">Conversation augmentee</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-950">Innovation Advisor <span className="text-amber-600">AI</span></h2>
            <p className="text-slate-600">Dialogue intelligent sur la transformation digitale africaine.</p>
        </div>

        <div className="cnk-card rounded-[1.75rem] overflow-hidden flex flex-col h-[600px]">
          <div className="border-b border-slate-200 bg-slate-950 px-6 py-4 text-xs font-bold uppercase tracking-[0.24em] text-white/70">
            Console stratégique privée
          </div>
          <div ref={scrollRef} className="flex-1 p-6 space-y-4 overflow-y-auto bg-slate-50/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${msg.role === 'user' ? 'bg-amber-600 text-white font-medium' : 'bg-white border border-slate-100 text-slate-800'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-100 p-4 rounded-2xl text-slate-400 animate-pulse">
                  Réflexion stratégique...
                </div>
              </div>
            )}
          </div>
          
          <div className="p-4 bg-white border-t border-slate-100 flex gap-4">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Posez votre question stratégique..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="bg-slate-950 hover:bg-amber-600 disabled:opacity-50 text-white px-6 rounded-xl font-bold transition-colors shadow-md"
            >
              Envoyer
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Advisor;
