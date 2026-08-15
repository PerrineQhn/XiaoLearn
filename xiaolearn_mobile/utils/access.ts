/**
 * access.ts — calcul des droits d'accès (free / trial / premium).
 * Port mobile de xiaolearn_app/src/utils/access.ts.
 *
 * Source de vérité PARTAGÉE avec le web : `users/{uid}.entitlements.app`
 * dans Firestore, posé côté web par le webhook Stripe et côté mobile par
 * le webhook RevenueCat. Un premium acheté sur une plateforme est donc
 * reconnu sur l'autre.
 */
import type { User } from 'firebase/auth';

export const TRIAL_DURATION_DAYS = 7;
export const FREE_HSK1_LESSON_LIMIT = 200;
export const FREE_REVIEW_LIMIT = 20;
export const FREE_DAILY_NEW_FLASHCARDS = 5;

export type AccessTier = 'free' | 'trial' | 'premium';
export type SrsMode = 'limited' | 'complete';

/** Statut d'un droit (mirroir de l'EntitlementStatus web). */
export interface EntitlementStatus {
  active: boolean;
  status?: string | null;
  isLifetime?: boolean;
  currentPeriodEnd?: string | null;
  productId?: string | null;
}

export interface AppAccess {
  tier: AccessTier;
  isLifetime: boolean;
  canUseAI: boolean;
  canAccessAllLessons: boolean;
  hsk1LessonLimit: number;
  srsMode: SrsMode;
  reviewItemLimit: number | null;
  flashcardDailyNewLimit: number;
  maxMiniGames: number;
  showAdvancedStats: boolean;
  hasPrioritySupport: boolean;
  canUseSimulator: boolean;
  canCreateCustomFlashcards: boolean;
  hasPriorityNewContent: boolean;
  trialEndsAt: string | null;
  trialDaysLeft: number;
}

const MS_PER_DAY = 24 * 60 * 60 * 1000;

/**
 * Comptes débloqués manuellement (mêmes que le web).
 *
 * ## Pourquoi plus par nom d'affichage
 *
 * La liste portait sur `displayName`, comparé sans tenir compte de la casse ni
 * des espaces. Or `displayName` se change librement — `updateProfile()` côté
 * SDK, et l'app propose elle-même le renommage. N'importe quel compte gratuit
 * qui se rebaptisait « perrine qhn » déverrouillait A2 → C2, sur les deux
 * plateformes, la chaîne étant lisible en clair dans le bundle.
 *
 * On s'appuie donc sur des identifiants que le porteur ne choisit pas :
 *
 *   - `uid`, attribué par Firebase, immuable — c'est le plus sûr ;
 *   - `email`, qui exige de posséder la boîte et une réauthentification pour
 *     être modifié.
 *
 * Reste un contrôle côté client : quelqu'un qui modifie le bundle contourne
 * tout. Un custom claim Firebase vérifié côté serveur serait la seule réponse
 * complète, mais c'est le contenu lui-même qui est embarqué dans le binaire —
 * le gain serait faible pour le coût.
 */
const LESSON_UNLOCK_OVERRIDE = {
  uids: [] as string[],
  emails: ['p.quenn27@gmail.com'] as string[],
};

const norm = (v: string | null | undefined) => (v ?? '').trim().toLowerCase();

const hasLessonUnlockOverride = (user: User | null): boolean => {
  if (!user) return false;
  const uid = norm(user.uid);
  const email = norm(user.email);
  return (
    (uid.length > 0 && LESSON_UNLOCK_OVERRIDE.uids.map(norm).includes(uid)) ||
    (email.length > 0 && LESSON_UNLOCK_OVERRIDE.emails.map(norm).includes(email))
  );
};

const getTrialEnd = (user: User | null): Date | null => {
  const createdAt = user?.metadata?.creationTime;
  if (!createdAt) return null;
  const start = new Date(createdAt);
  if (Number.isNaN(start.getTime())) return null;
  return new Date(start.getTime() + TRIAL_DURATION_DAYS * MS_PER_DAY);
};

export const buildAppAccess = (
  user: User | null,
  entitlement: EntitlementStatus | null
): AppAccess => {
  const hasPremium = Boolean(entitlement?.active);
  const isLifetime = hasPremium && Boolean(entitlement?.isLifetime);
  const hasLessonOverride = hasLessonUnlockOverride(user);
  const now = new Date();
  const trialEnd = getTrialEnd(user);
  const trialActive = !hasPremium && Boolean(trialEnd && trialEnd.getTime() > now.getTime());

  const tier: AccessTier = hasPremium ? 'premium' : trialActive ? 'trial' : 'free';
  const premiumLike = tier === 'premium' || tier === 'trial';
  const trialDaysLeft =
    trialEnd && trialEnd.getTime() > now.getTime()
      ? Math.ceil((trialEnd.getTime() - now.getTime()) / MS_PER_DAY)
      : 0;

  return {
    tier,
    isLifetime,
    canUseAI: premiumLike,
    canAccessAllLessons: premiumLike || hasLessonOverride,
    hsk1LessonLimit: premiumLike || hasLessonOverride ? Number.MAX_SAFE_INTEGER : FREE_HSK1_LESSON_LIMIT,
    srsMode: premiumLike ? 'complete' : 'limited',
    reviewItemLimit: premiumLike ? null : FREE_REVIEW_LIMIT,
    flashcardDailyNewLimit: premiumLike ? 10 : FREE_DAILY_NEW_FLASHCARDS,
    maxMiniGames: premiumLike ? 5 : 1,
    showAdvancedStats: premiumLike,
    hasPrioritySupport: tier === 'premium',
    // Aligné sur Premium : le simulateur est un argument d'abonnement, pas une
    // récompense d'achat unique.
    canUseSimulator: premiumLike,
    // Aligné sur Premium (et non sur l'accès à vie) : la création de cartes est
    // un argument d'abonnement courant, la réserver à l'achat unique la rendrait
    // invisible pour la quasi-totalité des abonnés.
    canCreateCustomFlashcards: premiumLike,
    hasPriorityNewContent: isLifetime,
    trialEndsAt: trialEnd ? trialEnd.toISOString() : null,
    trialDaysLeft,
  };
};
