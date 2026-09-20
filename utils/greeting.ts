/** Uses the visitor's local hour; no location permission or network request. */
export function getGreeting(hour: number) {
  if (hour >= 5 && hour < 11) return { greeting: 'Bonjour', moment: 'Un nouveau matin, de nouvelles idées.', icon: 'sunrise' };
  if (hour >= 11 && hour < 12) return { greeting: 'Bonjour', moment: 'Une belle fin de matinée pour échanger.', icon: 'sun' };
  if (hour >= 12 && hour < 14) return { greeting: 'Bonjour', moment: 'Une pause à midi, une idée à partager.', icon: 'sun' };
  if (hour >= 14 && hour < 18) return { greeting: 'Bonjour', moment: 'Un après-midi pour faire avancer vos idées.', icon: 'sun' };
  return { greeting: 'Bonsoir', moment: hour >= 18 ? 'Une soirée pour imaginer la suite.' : 'Même à cette heure, les idées restent éveillées.', icon: 'moon' };
}
