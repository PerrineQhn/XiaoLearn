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
  OAuthProvider,
  updateProfile,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Crypto from 'expo-crypto';
import { auth } from '@/firebase/config';
import { readDeletionState, type DeletionState } from '@/services/accountDeletion';

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
  appleLoading: boolean;
  /**
   * Sign in with Apple est-il utilisable ICI ?
   *
   * Faux partout sauf sur un appareil iOS où le système le confirme
   * (`isAvailableAsync`). Même logique que `googleAvailable` : c'est la seule
   * source de vérité, l'écran de connexion ne re-décide rien. Un bouton Apple
   * affiché sur Android serait pire qu'inutile — il violerait aussi les
   * règles d'usage du bouton.
   */
  appleAvailable: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, displayName?: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
  /** À appeler après updateProfile (photo, nom) — onAuthStateChanged ne se déclenche pas. */
  refreshUser: () => Promise<void>;
  /**
   * Demande de suppression en cours, ou null.
   *
   * Exposée ici plutôt que lue dans chaque écran : le bandeau de rappel, la
   * page de réglages et l'écran de suppression doivent voir le même état, et
   * l'utilisateur doit être averti dès l'ouverture qu'un compte est en sursis.
   */
  deletion: DeletionState | null;
  reloadDeletion: () => Promise<void>;
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
  const [appleLoading, setAppleLoading] = useState(false);
  const [appleAvailable, setAppleAvailable] = useState(false);
  const [deletion, setDeletion] = useState<DeletionState | null>(null);

  // La disponibilité se demande au système, pas à la plateforme : un iPhone
  // sous iOS 12 ou un Mac Catalyst mal configuré répondraient non. La réponse
  // arrive de façon asynchrone — le bouton apparaît une frame plus tard, ce
  // qui est invisible à l'œil et évite de le promettre à tort.
  useEffect(() => {
    if (Platform.OS !== 'ios') return;
    AppleAuthentication.isAvailableAsync()
      .then(setAppleAvailable)
      .catch(() => setAppleAvailable(false));
  }, []);

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
    // On ne journalise que l'issue du flow. Sérialiser `response` entière
    // écrivait `id_token` et `access_token` en clair dans les logs de
    // production, où ils sont conservés et consultables — un jeton d'identité
    // Google suffit à ouvrir la session du compte.
    console.log('[Google OAuth] type =', response?.type ?? 'aucune réponse');
    if (!response) return;

    if (response.type === 'error' || response.type === 'dismiss') {
      // `response.error` porte le motif sans les jetons ; l'objet complet, si.
      console.warn('[Google OAuth] flow annulé/erreur', response.type,
        'error' in response ? response.error?.message : '');
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
      // Une demande de suppression se lit à la connexion : c'est là que
      // l'utilisateur peut encore l'annuler, et l'ignorer reviendrait à le
      // laisser perdre son compte sans l'avoir revu passer.
      setDeletion(nextUser ? await readDeletionState(nextUser.uid) : null);
    });
    return unsub;
  }, []);

  const reloadDeletion = async () => {
    setDeletion(user ? await readDeletionState(user.uid) : null);
  };

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
        const provider = new GoogleAuthProvider();
        // Fenêtre surgissante d'abord, redirection en repli.
        //
        // La redirection seule ne suffit plus : quand le domaine
        // d'authentification diffère de l'origine de la page — ici
        // `app.xiaolearn.com` contre l'adresse du serveur de développement —
        // Safari et Firefox cloisonnent le stockage tiers et le retour de
        // redirection se perd. La page revient sans session, sans erreur, et
        // l'utilisateur croit que le bouton ne fait rien.
        //
        // La fenêtre surgissante porte sa propre origine et traverse ce
        // cloisonnement. Si le navigateur la bloque, on retombe alors sur la
        // redirection, qui reste le bon choix en production, où l'origine et
        // le domaine d'authentification concordent.
        try {
          await signInWithPopup(auth, provider);
        } catch (err: any) {
          const bloquee = ['auth/popup-blocked', 'auth/operation-not-supported-in-this-environment',
            'auth/cancelled-popup-request'].includes(err?.code);
          if (!bloquee) throw err;
          console.warn('[Google Auth] fenêtre bloquée, repli sur la redirection');
          await signInWithRedirect(auth, provider);
        }
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
      // L'erreur remonte à l'appelant : c'est lui qui sait l'afficher. La
      // consigner sans la relancer laissait l'écran de connexion muet.
      throw err;
    }
  }

  /**
   * Sign in with Apple → Firebase.
   *
   * ## Le nonce, et pourquoi il y en a deux
   *
   * Firebase exige un nonce pour lier le jeton Apple à CETTE tentative de
   * connexion — sans lui, un jeton intercepté serait rejouable. Apple reçoit
   * le SHA-256 du nonce, Firebase reçoit le nonce en clair et vérifie que le
   * haché embarqué dans le jeton correspond. Envoyer le même des deux côtés
   * ferait échouer la vérification (`auth/missing-or-invalid-nonce`).
   *
   * ## Le nom : maintenant ou jamais
   *
   * Apple ne transmet `fullName` qu'à la PREMIÈRE autorisation ; toutes les
   * suivantes le laissent vide. Si on ne le pose pas immédiatement sur le
   * profil Firebase, l'utilisateur reste « null null » au classement pour
   * toujours — sauf à révoquer l'app dans ses réglages Apple et tout refaire.
   * D'où l'écriture inconditionnelle dès que le profil n'a pas encore de nom.
   *
   * L'utilisateur peut aussi masquer son e-mail (relais `@privaterelay`) :
   * aucun code ici n'a le droit de supposer qu'un e-mail est réel ou durable.
   */
  async function signInWithApple() {
    if (!auth || !appleAvailable) return;
    setAppleLoading(true);
    try {
      const rawNonce = Crypto.randomUUID();
      const hashedNonce = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        rawNonce,
      );

      const apple = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
        nonce: hashedNonce,
      });

      if (!apple.identityToken) throw new Error('Jeton Apple absent de la réponse');

      const credential = new OAuthProvider('apple.com').credential({
        idToken: apple.identityToken,
        rawNonce,
      });
      const result = await signInWithCredential(auth, credential);

      // Première autorisation : le nom n'existe que dans CETTE réponse.
      const nom = [apple.fullName?.givenName, apple.fullName?.familyName]
        .filter(Boolean).join(' ').trim();
      if (nom && !result.user.displayName) {
        await updateProfile(result.user, { displayName: nom }).catch(() => {});
      }
      console.log('[Apple Auth] connecté, uid =', result.user.uid);
    } catch (err: any) {
      // Fermer la feuille Apple est un choix, pas une panne : silence.
      if (err?.code === 'ERR_REQUEST_CANCELED') return;
      console.error('[Apple Auth] erreur :', err?.code ?? err);
      throw err;
    } finally {
      setAppleLoading(false);
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
      appleLoading, appleAvailable,
      signInWithEmail, signUpWithEmail, signInWithGoogle, signInWithApple, signOut,
      refreshUser, deletion, reloadDeletion,
    }}>
      {children}
    </AuthContext.Provider>
  );
}
