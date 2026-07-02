import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  User,
  signInWithPopup,
  signInWithRedirect,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { auth } from '../firebase/config';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

/** Préfixes des clés localStorage utilisées par l'app pour stocker la
 *  progression utilisateur. Toute clé matchant ces préfixes est sensible
 *  à l'identité du compte et doit être PURGÉE quand on change d'uid. */
const USER_DATA_KEY_PREFIXES = ['cl_', 'xl_'];

/** Clé qui mémorise le dernier uid connu — sert à détecter un changement
 *  de compte au signIn même quand le user a fermé l'onglet sans signOut. */
const LAST_UID_KEY = '__xl_last_uid';

/** Exceptions à la purge : clés `xl_*`/`cl_*` qui ne contiennent PAS de
 *  données utilisateur sensibles mais sont du tooling UX qu'on veut
 *  préserver à travers les changements de compte.
 *  - `xl_notif_*` : dédup des notifications (timestamps, pas de progression)
 *  - `xl_sidebar_collapsed` : préférence UI globale
 *  - `xl_dark_mode` / `cl_color_theme` : préférences UI cosmétiques */
const PURGE_EXCEPTIONS = [
  /^xl_notif_/,
  /^xl_sidebar_collapsed$/,
  /^xl_dark_mode$/,
  /^cl_color_theme$/
];

/** Purge sélective du localStorage : retire toutes les clés cl_* / xl_*
 *  qui contiennent de la progression spécifique à un compte. Préserve les
 *  préférences UI globales (thème, langue, etc.) qui ont d'autres noms,
 *  ET les exceptions ci-dessus (dédup notif, préférences). */
function purgeUserDataFromLocalStorage() {
  if (typeof window === 'undefined') return;
  const keysToRemove: string[] = [];
  for (let i = 0; i < window.localStorage.length; i++) {
    const key = window.localStorage.key(i);
    if (!key) continue;
    if (!USER_DATA_KEY_PREFIXES.some((prefix) => key.startsWith(prefix))) continue;
    if (PURGE_EXCEPTIONS.some((re) => re.test(key))) continue;
    keysToRemove.push(key);
  }
  for (const key of keysToRemove) {
    try {
      window.localStorage.removeItem(key);
    } catch {
      /* quota / private mode — ignore */
    }
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      // ⚠ Critique : purge le localStorage si l'uid détecté ≠ uid précédent.
      // Sans ça, deux comptes utilisés sur le même navigateur partageaient
      // leur progression (les clés cl_*/xl_* sont globales, non scopées).
      // Le compte B se connectait, useFirestoreSync poussait le localStorage
      // de A (= clés non purgées) vers Firestore users/{uidB}, contaminant
      // définitivement le doc du compte B avec les données de A.
      try {
        const prevUid = window.localStorage.getItem(LAST_UID_KEY);
        const nextUid = nextUser?.uid ?? null;
        // Purge UNIQUEMENT quand on bascule vers un autre compte ACTIF.
        // - nextUid=null (signOut transitoire ou pas encore connecté) → on
        //   garde le localStorage intact pour que le user qui se reconnecte
        //   ensuite avec le MÊME compte ne perde pas ses objectifs du jour /
        //   leçons en attente de sync.
        // - nextUid=A & prevUid=A → même compte, pas de purge.
        // - nextUid=B & prevUid=A → switch effectif vers compte B → purge
        //   (sinon contamination cross-account).
        // - nextUid=A & prevUid=null → premier login sur ce navigateur. On
        //   NE PURGE PAS non plus : la data locale est la sienne ou il n'y
        //   en a pas. Le reconcile Firestore va merge avec le cloud.
        if (nextUid && prevUid && prevUid !== nextUid) {
          purgeUserDataFromLocalStorage();
        }
        if (nextUid) {
          window.localStorage.setItem(LAST_UID_KEY, nextUid);
        }
        // On NE retire PAS LAST_UID_KEY au signOut : on en a besoin pour
        // détecter le switch de compte au prochain login.
      } catch {
        /* localStorage indisponible (private mode, quota) — fallback non bloquant */
      }
      setUser(nextUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      if (error?.code === 'auth/popup-blocked') {
        await signInWithRedirect(auth, provider);
        return;
      }
      throw error;
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUpWithEmail = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    // PAS DE PURGE ICI. La purge se fait UNIQUEMENT dans onAuthStateChanged
    // quand on détecte un changement EFFECTIF de uid (compte A → compte B).
    //
    // Pourquoi : si on purge à chaque signOut, un user qui se reconnecte
    // ensuite avec le MÊME compte perd ses objectifs du jour, son cache de
    // leçons complétées, etc. — toutes les data qui sont en localStorage en
    // attente d'un sync Firestore confirmé. Le reconcile au prochain login
    // ramène les données cloud, MAIS il y a une fenêtre de race où les
    // useEffect des consumers (qui dépendent du state initial = défauts)
    // poussent des valeurs vides vers Firestore et écrasent le cloud.
    //
    // En gardant le localStorage intact entre signOut et signIn du même
    // compte, on évite cette race et les states ne sont jamais remis à 0.
    // Le LAST_UID_KEY reste aussi pour que onAuthStateChanged sache
    // comparer prevUid = A à nextUid = A et NE PAS purger.
  };

  const value = {
    user,
    loading,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
