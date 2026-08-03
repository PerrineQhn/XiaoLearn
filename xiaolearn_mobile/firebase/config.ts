import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { initializeAuth, getAuth, type Auth } from 'firebase/auth';
// getReactNativePersistence est dans le build RN de firebase/auth mais absent des types par défaut
// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-explicit-any
const { getReactNativePersistence } = require('firebase/auth') as any;
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeFirestore, type Firestore } from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey:            process.env.EXPO_PUBLIC_FIREBASE_API_KEY            ?? '',
  authDomain:        process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN        ?? '',
  projectId:         process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID         ?? '',
  storageBucket:     process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET     ?? '',
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '',
  appId:             process.env.EXPO_PUBLIC_FIREBASE_APP_ID             ?? '',
};

const isConfigured = !!firebaseConfig.apiKey;

// ─── Patch fetch pour Firebase en React Native ───────────────────────────────
// RN n'envoie pas d'en-tête Referer → Firebase bloque avec
// auth/requests-from-referer-<empty>-are-blocked.
// On utilise le authDomain du projet (ex: xiaolearn-mobile.firebaseapp.com)
// qui est toujours dans la liste des domaines autorisés Firebase.
if (typeof global.fetch === 'function' && firebaseConfig.authDomain) {
  const referer = `https://${firebaseConfig.authDomain}`;
  const orig = global.fetch.bind(global) as typeof fetch;
  (global as any).fetch = function (url: any, init: any = {}) {
    const urlStr: string = typeof url === 'string' ? url : String(url);
    if (
      urlStr.includes('identitytoolkit.googleapis.com') ||
      urlStr.includes('securetoken.googleapis.com')
    ) {
      return orig(url, {
        ...init,
        headers: { Referer: referer, ...(init.headers ?? {}) },
      });
    }
    return orig(url, init);
  };
}
// ─────────────────────────────────────────────────────────────────────────────

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

if (isConfigured) {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  // initializeAuth avec persistence AsyncStorage pour React Native
  try {
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch {
    // déjà initialisé (hot reload)
    auth = getAuth(app);
  }
  db = initializeFirestore(app, { experimentalForceLongPolling: true });
  storage = getStorage(app);
} else {
  console.warn('[XiaoLearn] Firebase non configuré — fonctionnement hors-ligne uniquement.');
  // @ts-expect-error volontairement null en mode démo
  app = null; auth = null; db = null; storage = null;
}

export { auth, db, storage };
export default app!;
