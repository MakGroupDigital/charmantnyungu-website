import test from 'node:test';
import assert from 'node:assert/strict';
import { getGreeting } from '../utils/greeting.ts';

test('the greeting follows the visitor’s local time at each boundary', () => {
  for (const hour of [0, 4, 18, 23]) assert.equal(getGreeting(hour).greeting, 'Bonsoir');
  for (const hour of [5, 10, 11, 12, 13, 14, 17]) assert.equal(getGreeting(hour).greeting, 'Bonjour');
  assert.match(getGreeting(5).moment, /matin/);
  assert.match(getGreeting(11).moment, /fin de matinée/);
  assert.match(getGreeting(12).moment, /midi/);
  assert.match(getGreeting(14).moment, /après-midi/);
  assert.match(getGreeting(18).moment, /soirée/);
  assert.equal(getGreeting(0).icon, 'moon');
});
