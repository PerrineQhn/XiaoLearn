import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Configuration Firebase
// IMPORTANT: Remplacez ces valeurs par votre propre configuration Firebase
// Voir FIREBASE_SETUP.md pour les instructions
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "VOTRE_API_KEY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "VOTRE_AUTH_DOMAIN",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "VOTRE_PROJECT_ID",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "VOTRE_STORAGE_BUCKET",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "VOTRE_MESSAGING_SENDER_ID",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "VOTRE_APP_ID"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Initialiser les services
export const auth = getAuth(app);

// Firestore : on initialise avec experimentalAutoDetectLongPolling activé
// pour contourner les bugs WebChannel sur Safari, certains adblockers, et
// proxies d'entreprise. Symptôme du bug sans cette option :
//   - RPC 'Listen' stream transport errored
//   - Failed to load resource: /channel status 400
//   - onSnapshot() ne reçoit jamais les data, useEntitlements retourne null
// La REST API marche pendant ce temps (vu via fetch direct), confirmant que
// c'est uniquement le transport WebChannel qui plante. L'option fait que le
// SDK détecte automatiquement et bascule en long-polling HTTP si WebChannel
// échoue → compatible Safari et adblockers.
//
// Documentation Firebase :
// https://firebase.google.com/docs/reference/js/firestore_.firestoresettings#firestoresettingsexperimentalautodetectlongpolling
export const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true
});

export const storage = getStorage(app);

export default app;
