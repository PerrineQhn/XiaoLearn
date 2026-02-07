import type { User } from 'firebase/auth';
import type { EntitlementStatus } from '../hooks/useEntitlements';

export const TRIAL_DURATION_DAYS = 7;
export const FREE_HSK1_LESSON_LIMIT = 5;
export const FREE_REVIEW_LIMIT = 20;
export const FREE_DAILY_NEW_FLASHCARDS = 5;

export type AccessTier = 'free' | 'trial' | 'premium';
export type SrsMode = 'limited' | 'complete';

export interface AppAccess {
  tier: AccessTier;
  canUseAI: boolean;
  canAccessAllLessons: boolean;
  hsk1LessonLimit: number;
  srsMode: SrsMode;
  reviewItemLimit: number | null;
  flashcardDailyNewLimit: number;
  maxMiniGames: number;
  showAdvancedStats: boolean;
  syncEnabled: boolean;
  hasPrioritySupport: boolean;
  trialEndsAt: string | null;
  trialDaysLeft: number;
}

const MS_PER_DAY = 24 * 60 * 60 * 1000;

const getTrialEnd = (user: User | null): Date | null => {
  const createdAt = user?.metadata?.creationTime;
  if (!createdAt) return null;
  const start = new Date(createdAt);
  if (Number.isNaN(start.getTime())) return null;
  return new Date(start.getTime() + TRIAL_DURATION_DAYS * MS_PER_DAY);
};

export const buildAppAccess = (user: User | null, entitlement: EntitlementStatus | null): AppAccess => {
  const hasPremium = Boolean(entitlement?.active);
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
    canUseAI: premiumLike,
    canAccessAllLessons: premiumLike,
    hsk1LessonLimit: premiumLike ? Number.MAX_SAFE_INTEGER : FREE_HSK1_LESSON_LIMIT,
    srsMode: premiumLike ? 'complete' : 'limited',
    reviewItemLimit: premiumLike ? null : FREE_REVIEW_LIMIT,
    flashcardDailyNewLimit: premiumLike ? 10 : FREE_DAILY_NEW_FLASHCARDS,
    maxMiniGames: premiumLike ? 5 : 1,
    showAdvancedStats: premiumLike,
    syncEnabled: premiumLike,
    hasPrioritySupport: tier === 'premium',
    trialEndsAt: trialEnd ? trialEnd.toISOString() : null,
    trialDaysLeft
  };
};
