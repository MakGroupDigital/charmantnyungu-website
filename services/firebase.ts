import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getAuth, signInAnonymously, type User } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyCBZF1r8K4t8lVae2Q9whhQTrzt5E1UoAo',
  authDomain: 'charmantnyungu.firebaseapp.com',
  databaseURL: 'https://charmantnyungu-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'charmantnyungu',
  storageBucket: 'charmantnyungu.firebasestorage.app',
  messagingSenderId: '904397530480',
  appId: '1:904397530480:web:32f70832d89c55823c5bb5',
  measurementId: 'G-7PV4G2MJ5L',
};

export const firebaseApp = initializeApp(firebaseConfig);
export const realtimeDatabase = getDatabase(firebaseApp);
export const firebaseAuth = getAuth(firebaseApp);

let anonymousSessionPromise: Promise<User> | null = null;

export const ensureAnonymousUser = async () => {
  if (typeof window === 'undefined') {
    return null;
  }

  if (firebaseAuth.currentUser) {
    return firebaseAuth.currentUser;
  }

  if (!anonymousSessionPromise) {
    anonymousSessionPromise = signInAnonymously(firebaseAuth)
      .then((credential) => credential.user)
      .catch((error) => {
        anonymousSessionPromise = null;
        throw error;
      });
  }

  return anonymousSessionPromise;
};

if (typeof window !== 'undefined') {
  isSupported()
    .then((supported) => {
      if (supported) {
        getAnalytics(firebaseApp);
      }
    })
    .catch(() => {
      // Analytics is optional and may be unavailable in local/private contexts.
    });
}
