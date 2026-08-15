import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { useAvatar } from '@/hooks/useAvatar';
import WelcomeScreen from './bienvenue';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import { DisplaySettingsProvider } from '@/contexts/DisplaySettingsContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { SrsProvider } from '@/contexts/SrsContext';
import { CardsProvider } from '@/contexts/CardsContext';
import SyncBanner from '@/components/SyncBanner';
import DeletionBanner from '@/components/DeletionBanner';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import LoginScreen from '@/app/login';
import { restoreNotificationsOnStartup } from '@/services/notificationService';
import { initRevenueCat, identifyRevenueCat, logoutRevenueCat } from '@/services/revenueCat';

function AppStack() {
  const { colorScheme } = useTheme();
  const { user, loading } = useAuth();
  const { avatarId, loading: avatarLoading } = useAvatar();
  const scheme = useColorScheme();
  const c = Colors[scheme];

  // Rétablit les notifications locales au démarrage
  useEffect(() => {
    restoreNotificationsOnStartup().catch(() => {});
  }, []);

  // Initialise RevenueCat et associe l'achat à l'uid Firebase (no-op en Expo Go)
  useEffect(() => {
    (async () => {
      await initRevenueCat(user?.uid);
      if (user?.uid) await identifyRevenueCat(user.uid);
      else await logoutRevenueCat();
    })();
  }, [user?.uid]);

  // ── Garde-fou d'authentification (comme le web) ──────────────────
  // Tant que l'état auth se charge → splash. Sans utilisateur → login.
  if (loading) {
    return (
      <>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: c.appBg }}>
          <ActivityIndicator size="large" color={c.primaryRed} />
        </View>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <LoginScreen />
      </>
    );
  }

  // Connecté mais sans personnage : inscription toute fraîche, ou compte migré
  // depuis l'ancien catalogue figé. On demande le choix avant d'entrer, plutôt
  // que d'afficher une pastille vide sur le tableau de bord.
  if (!avatarLoading && !avatarId) {
    return (
      <>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <WelcomeScreen />
      </>
    );
  }

  return (
    <>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      {/* Plein écran sur tablette. Le cadrage global à 560 points laissait
          deux larges bandes vides : un tableau de bord fait de cartes gagne à
          s'étaler. Seuls les écrans de lecture bornent leur colonne de texte,
          via `readableContent`. */}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false, presentation: 'modal' }} />
        <Stack.Screen name="lesson" options={{ headerShown: false, presentation: 'card' }} />
        <Stack.Screen name="review" options={{ headerShown: false, presentation: 'fullScreenModal' }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <SyncBanner />
      <DeletionBanner />
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LanguageProvider>
          <DisplaySettingsProvider>
            <SrsProvider>
              <CardsProvider>
              <AppStack />
              </CardsProvider>
            </SrsProvider>
          </DisplaySettingsProvider>
        </LanguageProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
