import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager
} from 'firebase/firestore';
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

// Firestore : `experimentalForceLongPolling` force le long-polling HTTP
// dès le début (vs auto-detect qui tente WebChannel d'abord). Nécessaire
// parce que Safari Intelligent Tracking Prevention (ITP) bloque
// AGRESSIVEMENT toutes les requêtes cross-origin vers firestore.googleapis.com,
// y compris la phase de détection auto. En forçant le long-polling, on
// évite complètement le WebChannel et on n'a qu'un simple POST HTTP qui
// passe sans souci.
//
// Trade-off : long-polling est légèrement plus latent (~200ms supplémentaires
// sur le premier sync) mais c'est imperceptible en pratique.
//
// `localCache: persistentLocalCache(...)` — CRITIQUE pour la sync cross-device :
// active la persistance IndexedDB des writes pending. Sans ça, quand l'utilisateur
// fait une modif (terminer leçon, gagner XP, ajouter flashcard…) et ferme
// l'onglet/app avant que le setDoc() async soit confirmé, l'écriture est
// PERDUE (elle vivait en mémoire seulement). L'autre device ne voit donc
// jamais la modif tant qu'on ne reconnecte pas sur le premier device (le
// reconcile au login compare localStorage vs cloud et re-pousse local).
//
// Avec persistentLocalCache : les writes sont d'abord queue-ées dans IndexedDB,
// puis répliquées au serveur. Elles survivent au tab close et se rejouent au
// prochain démarrage du SDK → sync auto sans intervention utilisateur.
// `persistentMultipleTabManager` permet à plusieurs onglets de partager le
// même cache sans corruption.
//
// Documentation Firebase :
// https://firebase.google.com/docs/reference/js/firestore_.firestoresettings#firestoresettingsexperimentalforcelongpolling
// https://firebase.google.com/docs/firestore/manage-data/enable-offline
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager()
  })
});

export const storage = getStorage(app);

export default app;
