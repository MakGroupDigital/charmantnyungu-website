import React, { useEffect, useRef, useState } from 'react';

export type ContactIntent = 'question' | 'appointment';
interface ContactDialogProps { intent: ContactIntent | null; onClose: () => void; }

const localDate = () => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

const ContactDialog: React.FC<ContactDialogProps> = ({ intent, onClose }) => {
  const dialog = useRef<HTMLDialogElement>(null);
  const [prepared, setPrepared] = useState(false);
  const appointment = intent === 'appointment';
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  useEffect(() => {
    const element = dialog.current;
    if (!element || !intent) return;
    setPrepared(false);
    element.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [intent]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const value = (key: string) => String(data.get(key) || '').trim();
    const messageField = form.elements.namedItem('message') as HTMLTextAreaElement;
    if (!value('message')) {
      messageField.setCustomValidity('Précisez votre demande en quelques mots.');
      messageField.reportValidity();
      return;
    }
    if (appointment) {
      const timeField = form.elements.namedItem('time') as HTMLInputElement;
      if (new Date(`${value('date')}T${value('time')}`) <= new Date()) {
        timeField.setCustomValidity('Choisissez un créneau à venir.');
        timeField.reportValidity();
        return;
      }
    }
    const subject = appointment ? 'Demande de rendez-vous' : `Question — ${value('topic')}`;
    const body = [
      'Bonjour Charmant,', '',
      `Je suis ${value('name')}.`,
      value('email') ? `Mon e-mail : ${value('email')}` : '',
      appointment ? `Je souhaiterais convenir d’un rendez-vous le ${value('date')} à ${value('time')} (fuseau horaire : ${timezone}), sous réserve de votre disponibilité.` : `Sujet : ${value('topic')}`,
      '', value('message'), '', 'Merci et à bientôt.',
    ].filter((line) => line !== undefined).join('\n');
    const channel = (event.nativeEvent as SubmitEvent).submitter?.getAttribute('value') || 'email';
    if (channel === 'whatsapp') {
      window.open(`https://wa.me/243835137837?text=${encodeURIComponent(body)}`, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = `mailto:consultant@charmantnyungu.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
    setPrepared(true);
  };

  return (
    <dialog ref={dialog} className="contact-dialog" aria-labelledby="contact-dialog-title" aria-describedby="contact-dialog-description" onCancel={onClose}>
      <button type="button" className="dialog-close" aria-label="Fermer le formulaire" onClick={onClose}>Fermer <span aria-hidden="true">×</span></button>
      <p className="edition-label">Un échange, une première étape.</p>
      <h2 id="contact-dialog-title">{appointment ? 'Prenons le temps d’échanger.' : 'Quelle est votre question ?'}</h2>
      <p id="contact-dialog-description">{appointment ? 'Présentez votre projet et proposez un créneau. Nous conviendrons ensemble du rendez-vous.' : 'Une question, une idée ou un projet ? Adressez-moi votre message directement.'}</p>
      <form key={intent} onSubmit={handleSubmit} onInput={(event) => {
        const field = event.target as HTMLInputElement;
        field.setCustomValidity?.('');
        const time = event.currentTarget.elements.namedItem('time') as HTMLInputElement | null;
        time?.setCustomValidity('');
        setPrepared(false);
      }}>
        <div className="contact-fields">
          <label htmlFor="contact-name">Votre nom<input autoFocus id="contact-name" name="name" autoComplete="name" required maxLength={100} placeholder="Nom et prénom" /></label>
          <label htmlFor="contact-email">Votre e-mail <span>(facultatif)</span><input id="contact-email" name="email" type="email" autoComplete="email" maxLength={150} placeholder="vous@exemple.com" /></label>
        </div>
        {appointment ? <>
          <div className="contact-fields">
            <label htmlFor="contact-date">Date souhaitée<input id="contact-date" name="date" type="date" min={localDate()} required /></label>
            <label htmlFor="contact-time">Heure souhaitée<input id="contact-time" name="time" type="time" required /></label>
          </div>
          <p className="contact-timezone">Votre fuseau horaire : {timezone}. Créneau soumis à confirmation.</p>
        </> : <label htmlFor="contact-topic">Le sujet de votre message<select id="contact-topic" name="topic" defaultValue="Innovation technologique"><option>Innovation technologique</option><option>Souveraineté numérique</option><option>Intelligence artificielle</option><option>Panafricanisme</option><option>Collaboration ou autre question</option></select></label>}
        <label htmlFor="contact-message">{appointment ? 'De quoi souhaitez-vous discuter ?' : 'Votre question'}<textarea id="contact-message" name="message" required maxLength={1800} rows={4} placeholder={appointment ? 'Votre projet, vos objectifs, le contexte de notre échange…' : 'Écrivez votre message ici…'} /></label>
        <p className="contact-handoff">Choisissez e-mail ou WhatsApp pour vérifier votre message et l’envoyer.</p>
        <div className="contact-submit-actions">
          <button type="submit" name="channel" value="email">Continuer par e-mail <span aria-hidden="true">↗</span></button>
          <button type="submit" name="channel" value="whatsapp">Continuer sur WhatsApp <span aria-hidden="true">↗</span></button>
        </div>
        {prepared && <p className="contact-status" role="status">Votre message est préparé. Terminez son envoi dans votre messagerie. Rien n’est envoyé automatiquement.</p>}
      </form>
    </dialog>
  );
};
export default ContactDialog;
