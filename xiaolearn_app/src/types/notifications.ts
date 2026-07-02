/**
 * notifications.ts — Types du centre de notifications
 * -----------------------------------------------------
 * Pattern inspiré de Seonsaengnim : une cloche dans le header, un dropdown
 * listant l'historique persistant des notifications. Chaque notif a un
 * statut lu/non-lu, est supprimable individuellement, et conserve un
 * contexte (type, icône, lien de navigation optionnel).
 */

export type NotificationKind =
  | 'xp'          // Gain d'XP / leçon complétée / palier XP
  | 'lesson'      // Nouvelle leçon débloquée / niveau monté
  | 'rank'        // Rang amélioré (Apprenti → Étudiant, etc.)
  | 'battle'      // Résultat de bataille (victoire, défaite, nul)
  | 'streak'      // Série prolongée / palier / danger
  | 'srs'         // Révisions disponibles aujourd'hui
  | 'info';       // Catégorie générique

/**
 * Cible de navigation optionnelle. L'UI sait mapper vers la bonne vue.
 */
export type NotificationLink =
  | { kind: 'view'; view: string }
  | { kind: 'external'; url: string };

export interface NotificationItem {
  id: string;
  kind: NotificationKind;
  /** Emoji ou icône affiché dans l'avatar rond. */
  icon: string;
  /** Titre en bold (une ligne). */
  title: string;
  /** Description (2 lignes max, tronquée en UI). */
  body: string;
  /** Timestamp de création (ms). */
  createdAt: number;
  /** Timestamp de lecture, null si non-lu. */
  readAt: number | null;
  /** Optionnel : navigation au clic. */
  link?: NotificationLink;
}

/** Limite anti-bloat pour localStorage + Firestore doc size. */
export const NOTIFICATIONS_MAX = 50;

/** Clé localStorage. */
export const NOTIFICATIONS_STORAGE_KEY = 'xl_notifications_v1';
