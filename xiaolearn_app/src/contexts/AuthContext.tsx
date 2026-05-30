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

/** Purge sélective du localStorage : retire toutes les clés cl_* / xl_*
 *  qui contiennent de la progression spécifique à un compte. Préserve les
 *  préférences UI globales (thème, langue, etc.) qui ont d'autres noms. */
function purgeUserDataFromLocalStorage() {
  if (typeof window === 'undefined') return;
  const keysToRemove: string[] = [];
  for (let i = 0; i < window.localStorage.length; i++) {
    const key = window.localStorage.key(i);
    if (!key) continue;
    if (USER_DATA_KEY_PREFIXES.some((prefix) => key.startsWith(prefix))) {
      keysToRemove.push(key);
    }
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
        if (prevUid !== nextUid) {
          purgeUserDataFromLocalStorage();
          if (nextUid) {
            window.localStorage.setItem(LAST_UID_KEY, nextUid);
          } else {
            window.localStorage.removeItem(LAST_UID_KEY);
          }
        }
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
    // Purge la progression locale après déconnexion pour éviter qu'un
    // futur signIn avec un autre compte hérite des données de ce compte.
    // (Le check par uid au onAuthStateChanged est un 2e filet de sécurité.)
    try {
      purgeUserDataFromLocalStorage();
      window.localStorage.removeItem(LAST_UID_KEY);
    } catch {
      /* ignore */
    }
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
