/**
 * notificationService.ts
 * Gère les notifications locales quotidiennes de révision.
 * - Demande la permission au premier lancement
 * - Planifie une notification récurrente à l'heure choisie (défaut 20h)
 * - Annule si l'utilisateur désactive les notifs
 */
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const NOTIF_ENABLED_KEY  = 'cl_notif_enabled';
const NOTIF_HOUR_KEY     = 'cl_notif_hour';
const NOTIF_IDENTIFIER   = 'daily_review_reminder';
const DEFAULT_HOUR       = 20;

// Comportement à la réception (son + badge + alerte même si app ouverte)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

/** Demande la permission de notifier. Retourne true si accordée. */
export async function requestNotificationPermission(): Promise<boolean> {
  const { status: existing } = await Notifications.getPermissionsAsync();
  if (existing === 'granted') return true;

  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

/** Planifie (ou replanifie) la notification quotidienne. */
export async function scheduleDaily(hour = DEFAULT_HOUR): Promise<void> {
  // Annule toute notif déjà planifiée avec cet identifiant
  await cancelDaily();

  // Ce service n'est pas un composant : on lit la préférence de langue
  // directement, sinon la notification reste en français pour tout le monde.
  const fr = (await AsyncStorage.getItem('xl_language')) !== 'en';

  await Notifications.scheduleNotificationAsync({
    identifier: NOTIF_IDENTIFIER,
    content: {
      title: fr ? '📚 Révise ton chinois !' : '📚 Time to review your Chinese!',
      body: fr
        ? "Quelques flashcards t'attendent — maintiens ta série 🔥"
        : 'A few flashcards are waiting — keep your streak alive 🔥',
      sound: true,
      data: { route: '/review' },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour,
      minute: 0,
    },
  });
}

/** Annule la notification quotidienne planifiée. */
export async function cancelDaily(): Promise<void> {
  await Notifications.cancelScheduledNotificationAsync(NOTIF_IDENTIFIER).catch(() => {});
}

/** Charge les préférences stockées. */
export async function loadNotifPrefs(): Promise<{ enabled: boolean; hour: number }> {
  const [rawEnabled, rawHour] = await Promise.all([
    AsyncStorage.getItem(NOTIF_ENABLED_KEY).catch(() => null),
    AsyncStorage.getItem(NOTIF_HOUR_KEY).catch(() => null),
  ]);
  return {
    enabled: rawEnabled !== null ? rawEnabled === 'true' : false,
    hour: rawHour !== null ? parseInt(rawHour, 10) : DEFAULT_HOUR,
  };
}

/** Active les notifications (demande permission + planifie). */
export async function enableNotifications(hour = DEFAULT_HOUR): Promise<boolean> {
  const granted = await requestNotificationPermission();
  if (!granted) return false;

  await scheduleDaily(hour);
  await AsyncStorage.setItem(NOTIF_ENABLED_KEY, 'true');
  await AsyncStorage.setItem(NOTIF_HOUR_KEY, String(hour));
  return true;
}

/** Désactive les notifications (annule la planification). */
export async function disableNotifications(): Promise<void> {
  await cancelDaily();
  await AsyncStorage.setItem(NOTIF_ENABLED_KEY, 'false');
}

/** À appeler au démarrage de l'app pour rétablir les notifs si elles étaient activées. */
export async function restoreNotificationsOnStartup(): Promise<void> {
  const { enabled, hour } = await loadNotifPrefs();
  if (!enabled) return;

  // Vérifie si la notif est toujours planifiée (peut être perdue après mise à jour app)
  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  const exists = scheduled.some(n => n.identifier === NOTIF_IDENTIFIER);
  if (!exists) {
    const granted = await requestNotificationPermission();
    if (granted) await scheduleDaily(hour);
  }
}
