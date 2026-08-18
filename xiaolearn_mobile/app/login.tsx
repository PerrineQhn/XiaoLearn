/**
 * XiaoLearn Mobile — Écran de connexion
 * Email/password + Google Sign-In
 */
import { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, Alert, Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';
import { useI18n } from '@/contexts/LanguageContext';
import * as AppleAuthentication from 'expo-apple-authentication';

export default function LoginScreen() {
  const scheme = useColorScheme();
  const c = Colors[scheme];
  const {
    user, signInWithEmail, signUpWithEmail, signInWithGoogle, googleLoading, googleAvailable,
    signInWithApple, appleLoading, appleAvailable,
  } = useAuth();
  const { t } = useI18n();
  const router = useRouter();

  // Rediriger dès que user est connecté (Google ou email)
  useEffect(() => {
    if (user) router.replace('/');
  }, [user]);

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (!email.trim() || !password.trim()) {
      Alert.alert(t('dlg.missingFields'), t('dlg.fillEmailPwd'));
      return;
    }
    setLoading(true);
    try {
      if (mode === 'login') {
        await signInWithEmail(email.trim(), password);
      } else {
        await signUpWithEmail(email.trim(), password, name.trim() || undefined);
      }
      router.replace('/');
    } catch (e: any) {
      const msg = e?.code === 'auth/invalid-credential' ? t('dlg.badCredentials')
        : e?.code === 'auth/email-already-in-use' ? t('dlg.emailInUse')
        : e?.code === 'auth/weak-password' ? t('dlg.pwdTooShort')
        : e?.message ?? t('dlg.genericError');
      Alert.alert(t('dlg.error'), msg);
    } finally {
      setLoading(false);
    }
  }

  /**
   * Signale une erreur, y compris sur le web.
   *
   * `Alert.alert` n'est pas implémenté par react-native-web : l'appel ne lève
   * rien et n'affiche rien. C'est ce qui rendait l'échec invisible — on tapait
   * le bouton, et il ne se passait littéralement rien.
   */
  const signaler = (titre: string, corps: string) => {
    if (Platform.OS === 'web') window.alert(`${titre}\n\n${corps}`);
    else Alert.alert(titre, corps, [{ text: 'OK' }]);
  };

  async function handleGoogle() {
    // Le web sortait ici sans rien tenter, sur un Alert invisible. La
    // connexion Google y est pourtant gérée (fenêtre surgissante, repli par
    // redirection) : on la tente, et si elle échoue on le DIT.
    try {
      await signInWithGoogle();
    } catch (e: any) {
      signaler(t('common.error'), e?.message ?? t('dlg.googleFailed'));
    }
  }

  async function handleApple() {
    try {
      await signInWithApple();
    } catch (e: any) {
      // L'annulation est déjà avalée dans le contexte ; ici, c'est un vrai échec.
      signaler(t('common.error'), e?.message ?? t('dlg.appleFailed'));
    }
  }

  const busy = loading || googleLoading || appleLoading;

  return (
    <KeyboardAvoidingView
      style={[styles.root, { backgroundColor: c.appBg }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        {/* Logo */}
        <View style={styles.logoWrap}>
          <Image
            source={scheme === 'dark'
              ? require('@/assets/logo_long_dark.png')
              : require('@/assets/logo_long.png')}
            style={styles.logoImg}
            resizeMode="contain"
          />
          <Text style={[styles.tagline, { color: c.textSecondary }]}>
            {t('login.tagline')}
          </Text>
        </View>

        {/* Bouton Google */}
        <TouchableOpacity
          style={[
            styles.googleBtn,
            { backgroundColor: c.cardBg, borderColor: c.borderMedium },
            // L'opacité doit refléter `disabled`, et rien d'autre. Le web y
            // était grisé en dur — vestige d'une époque où la connexion Google
            // n'y fonctionnait pas — alors que le bouton restait cliquable et
            // que `signInWithGoogle` gère le web depuis, par redirection. Un
            // bouton qui a l'air éteint mais qui marche, personne ne le tente.
            (!googleAvailable || busy) && { opacity: 0.5 },
          ]}
          onPress={handleGoogle}
          disabled={busy || !googleAvailable}
          activeOpacity={0.8}
        >
          {googleLoading ? (
            <ActivityIndicator color={c.textPrimary} />
          ) : (
            <>
              <Text style={styles.googleLogo}>G</Text>
              <Text style={[styles.googleText, { color: c.textPrimary }]}>
                {googleAvailable ? t('login.google') : t('login.googleUnavailable')}
              </Text>
            </>
          )}
        </TouchableOpacity>

        {/* Bouton Apple — au-dessus du séparateur, avec Google.
            Le composant natif d'Apple est obligatoire pour la revue : couleur,
            libellé et rayon sont ceux du système, pas les nôtres. Sa hauteur
            reprend celle du bouton Google pour que la pile reste régulière.
            Le rendu suit le thème : bouton noir sur fond clair, blanc sur
            fond sombre, comme le demandent les règles d'usage. */}
        {appleAvailable && (
          <AppleAuthentication.AppleAuthenticationButton
            buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
            buttonStyle={scheme === 'dark'
              ? AppleAuthentication.AppleAuthenticationButtonStyle.WHITE
              : AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
            cornerRadius={12}
            style={[styles.appleBtn, busy && { opacity: 0.5 }]}
            onPress={busy ? () => {} : handleApple}
          />
        )}

        {/* Séparateur */}
        <View style={styles.separator}>
          <View style={[styles.sepLine, { backgroundColor: c.borderMedium }]} />
          <Text style={[styles.sepText, { color: c.textTertiary }]}>{t('login.or')}</Text>
          <View style={[styles.sepLine, { backgroundColor: c.borderMedium }]} />
        </View>

        {/* Toggle login / signup */}
        <View style={[styles.toggle, { backgroundColor: c.cardBgAlt, borderColor: c.borderLight }]}>
          {(['login', 'signup'] as const).map(m => (
            <TouchableOpacity
              key={m}
              style={[styles.toggleBtn, mode === m && { backgroundColor: c.cardBg, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 }]}
              onPress={() => setMode(m)}
            >
              <Text style={[styles.toggleText, { color: mode === m ? c.textPrimary : c.textTertiary, fontWeight: mode === m ? '700' : '500' }]}>
                {m === 'login' ? t('login.signin') : t('login.signup')}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Formulaire email/password */}
        <View style={styles.form}>
          {mode === 'signup' && (
            <View style={styles.field}>
              <Text style={[styles.label, { color: c.textSecondary }]}>{t('common.firstName')}</Text>
              <TextInput
                style={[styles.input, { backgroundColor: c.cardBg, borderColor: c.borderMedium, color: c.textPrimary }]}
                placeholder={t('common.firstNamePh')}
                placeholderTextColor={c.textTertiary}
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>
          )}
          <View style={styles.field}>
            <Text style={[styles.label, { color: c.textSecondary }]}>{t('login.email')}</Text>
            <TextInput
              style={[styles.input, { backgroundColor: c.cardBg, borderColor: c.borderMedium, color: c.textPrimary }]}
              placeholder="ton@email.com"
              placeholderTextColor={c.textTertiary}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <View style={styles.field}>
            <Text style={[styles.label, { color: c.textSecondary }]}>{t('login.password')}</Text>
            <TextInput
              style={[styles.input, { backgroundColor: c.cardBg, borderColor: c.borderMedium, color: c.textPrimary }]}
              placeholder="••••••••"
              placeholderTextColor={c.textTertiary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={[styles.submitBtn, { backgroundColor: c.primaryRed, opacity: busy ? 0.7 : 1 }]}
            onPress={submit}
            disabled={busy}
          >
            {loading
              ? <ActivityIndicator color="#FFF" />
              : <Text style={styles.submitText}>{mode === 'login' ? t('login.signin') : t('login.signup')}</Text>
            }
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 40 },
  logoWrap: { alignItems: 'center', marginBottom: 32 },
  logoImg: { width: 220, height: 74, marginBottom: 8 },
  logoText: { fontSize: 64, fontWeight: '800', lineHeight: 72 },
  appName: { fontSize: 28, fontWeight: '700', letterSpacing: -0.5 },
  tagline: { fontSize: 14, marginTop: 4 },

  googleBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
    borderRadius: 14, borderWidth: 1.5, paddingVertical: 14, marginBottom: 20,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 1,
  },
  googleLogo: {
    fontSize: 18, fontWeight: '800', color: '#4285F4',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  googleText: { fontSize: 15, fontWeight: '600' },
  // 48 pt : la hauteur du bouton Google (14 + 14 de padding + la ligne de
  // texte), et le minimum requis par les règles d'usage d'Apple (44 pt).
  appleBtn: { height: 48, marginBottom: 20 },

  separator: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 },
  sepLine: { flex: 1, height: 1 },
  sepText: { fontSize: 13 },

  toggle: {
    flexDirection: 'row', borderRadius: 14, borderWidth: 1,
    padding: 4, marginBottom: 20,
  },
  toggleBtn: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
  toggleText: { fontSize: 14 },
  form: { gap: 16 },
  field: { gap: 6 },
  label: { fontSize: 13, fontWeight: '600' },
  input: {
    borderRadius: 12, borderWidth: 1.5, paddingHorizontal: 14, paddingVertical: 12,
    fontSize: 15,
  },
  submitBtn: {
    borderRadius: 14, paddingVertical: 15, alignItems: 'center', marginTop: 8,
    shadowColor: '#E05040', shadowOpacity: 0.3, shadowRadius: 8, shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  submitText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
});
