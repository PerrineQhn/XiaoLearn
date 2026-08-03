import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { Platform, Alert } from 'react-native';
import {
  type User,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithCredential,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  updateProfile,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { auth } from '@/firebase/config';

// Requis pour fermer proprement le navigateur OAuth sur iOS/Android
WebBrowser.maybeCompleteAuthSession();

const LAST_UID_KEY = '__xl_last_uid';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  googleLoading: boolean;
  /**
   * Google est-il utilisable SUR CETTE PLATEFORME ?
   *
   * L'écran de connexion testait de son côté « au moins un des trois client IDs
   * existe » — donc le bouton s'affichait sur Android alors que seul l'ID
   * Android compte, et taper dessus ne produisait rien. Une seule source de
   * vérité désormais, celle qui décide aussi si la connexion peut aboutir.
   */
  googleAvailable: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, displayName?: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  /** À appeler après updateProfile (photo, nom) — onAuthStateChanged ne se déclenche pas. */
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

async function purgeUserData(nextUid: string | null) {
  try {
    const prevUid = await AsyncStorage.getItem(LAST_UID_KEY);
    if (nextUid && prevUid && prevUid !== nextUid) {
      const keys = await AsyncStorage.getAllKeys();
      const toRemove = keys.filter(k =>
        (k.startsWith('xl_') || k.startsWith('cl_')) &&
        !k.startsWith('xl_notif_') &&
        k !== 'xl_dark_mode' &&
        k !== 'cl_color_theme'
      );
      if (toRemove.length) await AsyncStorage.multiRemove(toRemove);
    }
    if (nextUid) await AsyncStorage.setItem(LAST_UID_KEY, nextUid);
  } catch { /* ignore */ }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [googleLoading, setGoogleLoading] = useState(false);

  const PLACEHOLDER = 'not-configured.apps.googleusercontent.com';
  const iosClientId     = process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID     || undefined;
  const androidClientId = process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID || undefined;
  const googleAvailable =
    (Platform.OS === 'ios'     && !!iosClientId) ||
    (Platform.OS === 'android' && !!androidClientId) ||
    Platform.OS === 'web';

  // Pour iOS avec iosClientId, Google exige le scheme inversé du client ID comme redirectUri
  // (ex: com.googleusercontent.apps.XXXX:/oauth2redirect)
  // Pour web, on utilise makeRedirectUri() standard
  const redirectUri = Platform.OS === 'ios' && iosClientId
    ? `${iosClientId.split('.').reverse().join('.')}:/oauth2redirect`
    : Platform.OS === 'android' && androidClientId
    ? AuthSession.makeRedirectUri({ scheme: 'xiaolearn' })
    : AuthSession.makeRedirectUri();

  console.log('[Google OAuth] redirectUri =', redirectUri);

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId:     process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID || PLACEHOLDER,
    iosClientId:     iosClientId     ?? (Platform.OS === 'ios'     ? PLACEHOLDER : undefined),
    androidClientId: androidClientId ?? (Platform.OS === 'android' ? PLACEHOLDER : undefined),
    redirectUri,
  });

  // Traiter le retour du flow OAuth
  useEffect(() => {
    console.log('[Google OAuth] response =', JSON.stringify(response));
    if (!response) return;

    if (response.type === 'error' || response.type === 'dismiss') {
      console.warn('[Google OAuth] flow annulé/erreur', response);
      setGoogleLoading(false);
      return;
    }
    if (response.type !== 'success') return;

    const { id_token, access_token } = response.params ?? {};
    console.log('[Google OAuth] id_token=', !!id_token, 'access_token=', !!access_token);

    if (!auth) { setGoogleLoading(false); return; }

    // Firebase accepte id_token seul, access_token seul, ou les deux
    const credential = GoogleAuthProvider.credential(
      id_token   ?? null,
      access_token ?? null,
    );

    signInWithCredential(auth, credential)
      .then(result => console.log('[Google Auth] connecté :', result.user.email))
      .catch(err  => console.error('[Google Auth] signInWithCredential erreur :', err))
      .finally(()  => setGoogleLoading(false));
  }, [response]);

  // Sur web : récupérer le résultat du redirect Google au retour
  useEffect(() => {
    if (Platform.OS !== 'web' || !auth) return;
    getRedirectResult(auth)
      .then(result => {
        if (result) console.log('[Google Auth] redirect OK :', result.user.email);
      })
      .catch(err => console.error('[Google redirect result]', err));
  }, []);

  // Écoute Firebase Auth
  useEffect(() => {
    if (!auth) { setLoading(false); return; }
    const unsub = onAuthStateChanged(auth, async (nextUser) => {
      await purgeUserData(nextUser?.uid ?? null);
      setUser(nextUser);
      setLoading(false);
    });
    return unsub;
  }, []);

  async function signInWithEmail(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function signUpWithEmail(email: string, password: string, displayName?: string) {
    const { user: newUser } = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) await updateProfile(newUser, { displayName });
  }

  async function signInWithGoogle() {
    console.log('[Google Auth] début, platform=', Platform.OS, 'auth=', !!auth);
    if (!auth) { console.error('[Google Auth] auth est null !'); return; }
    setGoogleLoading(true);
    try {
      if (Platform.OS === 'web') {
        // Sur web : redirect (popup bloquée par COOP de Google)
        console.log('[Google Auth] signInWithRedirect...');
        const provider = new GoogleAuthProvider();
        await signInWithRedirect(auth, provider);
        // La page va recharger — getRedirectResult() récupère le résultat au retour
      } else {
        // Sur iOS/Android : expo-auth-session
        if (!googleAvailable || !request) {
          // Ne jamais sortir en silence : l'utilisateur a tapé un bouton.
          console.warn('[Google Auth] Client ID non configuré pour', Platform.OS);
          setGoogleLoading(false);
          // Contexte hors composant i18n : on lit la préférence stockée pour
          // ne pas afficher un message français à un utilisateur anglophone.
          const lang = (await AsyncStorage.getItem('xl_language')) === 'en' ? 'en' : 'fr';
          Alert.alert(
            lang === 'en' ? 'Google sign-in unavailable' : 'Connexion Google indisponible',
            lang === 'en'
              ? 'This sign-in method is not configured on this device. Use your email and password instead.'
              : "Ce mode de connexion n'est pas configuré sur cet appareil. Utilise ton adresse e-mail et ton mot de passe.",
          );
          return;
        }
        await promptAsync();
      }
    } catch (err) {
      console.error('[Google Auth] erreur :', err);
      setGoogleLoading(false);
    }
  }

  async function signOut() {
    await firebaseSignOut(auth);
  }

  /** Recharge le profil Firebase et force un re-render (photo/nom modifiés). */
  async function refreshUser() {
    const current = auth.currentUser;
    if (!current) return;
    try { await current.reload(); } catch { /* ignore */ }
    // Nouveau wrapper objet pour déclencher le re-render des consumers
    setUser(Object.create(
      Object.getPrototypeOf(current),
      Object.getOwnPropertyDescriptors(current)
    ) as User);
  }

  return (
    <AuthContext.Provider value={{
      user, loading, googleLoading, googleAvailable,
      signInWithEmail, signUpWithEmail, signInWithGoogle, signOut,
      refreshUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
}
