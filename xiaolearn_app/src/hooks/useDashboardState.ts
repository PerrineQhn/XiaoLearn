/**
 * useDashboardState
 * -----------------
 * Hook unifié qui alimente le nouveau HomePageV2.
 *
 * Il agrège trois préoccupations vues sur le dashboard de Seonsaengnim :
 *   1. Objectif du jour  — cartes à réviser + prochaine leçon + XP à gagner
 *   2. Streak + XP       — série quotidienne, niveau XP, progression vers le suivant
 *   3. Historique        — matrice mensuelle d'activité pour la heatmap calendrier
 *
 * Synchronisation Firestore : les 4 clés (XP total, streak, historique XP par
 * jour, bonus de série) sont poussées via useFirestoreSync pour que la
 * progression soit la même sur Chrome / Safari / mobile. Stratégies de merge :
 *   - XP  → `Math.max`  (on ne perd jamais d'XP, même si un device était offline).
 *   - streak.best → `Math.max` ; streak.current → dernier jour écrit gagne
 *     (lastDay le plus récent).
 *   - activity (XP par jour) → `Math.max` par date (fusion défensive).
 *   - bonus.milestonesClaimed → union (un palier déjà claimé reste claimé).
 *   - bonus.lastDailyBonusAt  → max date.
 *
 * Task #46 — Bonus XP de série
 * ----------------------------
 * Tous les `awardXp()` passent désormais par un point unique qui applique :
 *   - un **multiplicateur** XP basé sur la série courante (1.0 / 1.10 / 1.20 / 1.30),
 *   - un **bonus quotidien** de fidélité (+3 / +5 / +10 XP) à la première activité,
 *   - des **récompenses de palier** one-time (+25 / +50 / +150 / +500 XP) aux
 *     caps 3 / 7 / 30 / 100 jours.
 *
 * Les helpers `getStreakMultiplier`, `getDailyFidelityBonus`,
 * `getNextMilestone` sont pures et exportées — réutilisables pour UI/tests.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useFirestoreSync } from './useFirestoreSync';

const STREAK_KEY = 'xl_streak_v2';
const XP_KEY = 'xl_xp_v2';
const HISTORY_KEY = 'xl_activity_v2'; // { 'YYYY-MM-DD': xp }
const BONUS_KEY = 'xl_streak_bonus_v1';
const LAST_SEEN_KEY = 'xl_last_seen_v2';
const TIMER_MINUTES_KEY = 'xl_timer_minutes_v1';
/** Bornes pour sanitiser la valeur saisie par l'utilisateur. */
const TIMER_MIN = 1;
const TIMER_MAX = 120;

/** Paliers XP par niveau — inspirés de Seonsaengnim (200 XP pour passer niv.1→2).
 *  Progression douce : chaque niveau demande +20% par rapport au précédent. */
export const XP_PER_LEVEL = (level: number) => Math.round(200 * Math.pow(1.2, level - 1));

/** XP gagnés par action. Ajuste selon ton économie (garde-les petits !).
 *  Note: lessonCompleted=50 = la valeur effectivement utilisée dans App.tsx
 *  (payload.xpGained ?? 50). On garde la constante alignée pour cohérence. */
export const XP_REWARDS = {
  reviewAgain: 2,
  reviewHard: 5,
  reviewGood: 8,
  reviewEasy: 10,
  lessonCompleted: 50,
  newWordLearned: 15,
  wordOfDayAdded: 5
} as const;

// ---------------------------------------------------------------------------
//  Streak bonus — Task #46
// ---------------------------------------------------------------------------

/**
 * Paliers de multiplicateur XP. Le multiplicateur s'applique uniquement à la
 * base d'XP gagnée par l'activité (pas aux bonus daily/palier eux-mêmes, qui
 * sont déjà des récompenses exceptionnelles).
 */
export const STREAK_MULTIPLIER_TIERS = [
  { days: 100, multiplier: 1.3 },
  { days: 30, multiplier: 1.2 },
  { days: 7, multiplier: 1.1 }
] as const;

/** Bonus XP quotidien de fidélité (première activité de la journée). */
export const DAILY_FIDELITY_TIERS = [
  { minDays: 30, xp: 10 },
  { minDays: 7, xp: 5 },
  { minDays: 2, xp: 3 }
] as const;

/**
 * Paliers de récompense one-time. L'ordre croissant permet de trouver le
 * prochain palier non-claim en un simple find.
 */
export const STREAK_MILESTONES: Array<{ days: number; reward: number }> = [
  { days: 3, reward: 25 },
  { days: 7, reward: 50 },
  { days: 30, reward: 150 },
  { days: 100, reward: 500 }
];

/** Pure — retourne le multiplicateur appliqué à la base d'XP (1.0 par défaut). */
export const getStreakMultiplier = (streakDays: number): number => {
  for (const tier of STREAK_MULTIPLIER_TIERS) {
    if (streakDays >= tier.days) return tier.multiplier;
  }
  return 1.0;
};

/** Pure — retourne le bonus quotidien à ajouter (0 si série < 2). */
export const getDailyFidelityBonus = (streakDays: number): number => {
  for (const tier of DAILY_FIDELITY_TIERS) {
    if (streakDays >= tier.minDays) return tier.xp;
  }
  return 0;
};

/** Pure — prochain palier à viser (ou `null` si tous franchis). */
export const getNextMilestone = (
  streakDays: number,
  claimed: readonly number[]
): { days: number; reward: number; daysRemaining: number } | null => {
  for (const m of STREAK_MILESTONES) {
    if (claimed.includes(m.days)) continue;
    if (m.days <= streakDays) continue; // déjà dépassé sans avoir été claim — considéré perdu
    return {
      days: m.days,
      reward: m.reward,
      daysRemaining: m.days - streakDays
    };
  }
  return null;
};

// ---------------------------------------------------------------------------

export interface DailyGoalTargets {
  cardsDue: { current: number; target: number };
  lessonToResume: { title: string; id?: string } | null;
  xpGoal: { current: number; target: number };
  timerMinutes: number;
}

export interface XpState {
  xp: number;
  level: number;
  xpInLevel: number;
  xpNeededForNext: number;
  progressPct: number;
}

export interface StreakState {
  current: number;
  best: number;
  isAliveToday: boolean;
}

export interface StreakBonusState {
  /** Multiplicateur effectif actuel (1.0, 1.1, 1.2 ou 1.3). */
  multiplier: number;
  /** Pourcentage de bonus correspondant (0, 10, 20, 30). */
  multiplierBonusPct: number;
  /** Prochain palier à viser, avec jours restants. `null` si tous franchis. */
  nextMilestone: { days: number; reward: number; daysRemaining: number } | null;
  /** Paliers déjà encaissés (jamais retirés). */
  milestonesClaimed: number[];
  /** Date ISO du dernier daily bonus versé (pour l'UI ou debug). */
  lastDailyBonusAt: string | null;
  /** Dernier palier franchi — utilisé pour afficher un toast dans l'UI. */
  lastMilestoneAward: { days: number; xp: number; at: string } | null;
  /** À appeler après avoir affiché le toast palier pour le faire disparaître. */
  clearMilestoneAward: () => void;
}

interface BonusPersistedState {
  milestonesClaimed: number[];
  lastDailyBonusAt: string | null;
}

interface StreakPersistedState {
  current: number;
  best: number;
  lastDay: string | null;
}

const todayKey = () => new Date().toISOString().slice(0, 10);
const daysBetween = (a: string, b: string) => {
  const d1 = new Date(a + 'T00:00:00').getTime();
  const d2 = new Date(b + 'T00:00:00').getTime();
  return Math.round((d2 - d1) / (1000 * 60 * 60 * 24));
};

const readJSON = <T,>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const writeJSON = (key: string, value: unknown) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify(value));
};

/**
 * Calcule le prochain état de streak à partir de l'état précédent + "today".
 * Helper pur utilisé par `pingAlive` ET par `awardXp` (ce dernier n'a pas le
 * droit d'exiger d'appel préalable à pingAlive — une révision faite sans passer
 * par la home doit aussi bumper la série).
 */
const computeNextStreak = (
  prev: StreakPersistedState,
  today: string
): StreakPersistedState => {
  if (prev.lastDay === today) return prev;
  const gap = prev.lastDay ? daysBetween(prev.lastDay, today) : 1;
  const next = gap === 1 ? prev.current + 1 : 1;
  return {
    current: next,
    best: Math.max(prev.best, next),
    lastDay: today
  };
};

export interface DashboardInput {
  /** Nombre de cartes SRS actuellement dues (venant de ReviewPage). */
  dueCardsCount: number;
  /** Titre de la prochaine leçon à reprendre (venant de useLessonProgress). */
  nextLessonTitle?: string;
  nextLessonId?: string;
  /** Objectif quotidien en nombre d'actions (cartes + leçons). Par défaut 3. */
  dailyTargetCount?: number;
  /** Timer d'étude en minutes, par défaut 10. */
  timerMinutes?: number;
}

export interface DashboardApi {
  dailyGoal: DailyGoalTargets;
  xp: XpState;
  streak: StreakState;
  /** Système de bonus lié à la série (multiplicateur + daily + paliers). */
  bonus: StreakBonusState;
  /** Matrice de {dateISO -> xp gagnés ce jour} pour les 35 derniers jours. */
  activity: Record<string, number>;
  /**
   * À appeler après chaque action qui rapporte de l'XP.
   * - `amount` : XP de base gagnés par l'activité (avant multiplicateur).
   * - `source` : libellé optionnel pour debug (`lessonCompleted`, `review`…).
   *
   * Applique automatiquement multiplicateur de série, bonus quotidien de
   * fidélité et récompense de palier le cas échéant. Gère également le bump
   * de streak (plus besoin d'appeler `pingAlive` en plus).
   */
  awardXp: (amount: number, source?: string) => void;
  /** À appeler quand l'utilisateur a "touché" l'app aujourd'hui (ouvre dashboard, lance révision...). */
  pingAlive: () => void;
  /** Change la valeur du timer d'étude (persisté localement). */
  setTimerMinutes: (minutes: number) => void;
}

export const useDashboardState = (input: DashboardInput): DashboardApi => {
  const dailyTarget = input.dailyTargetCount ?? 3;
  // Le timer est désormais un état persisté : on lit le localStorage au premier
  // render, en fallback sur la prop `input.timerMinutes` (si passée) puis 10.
  const [timerMinutes, setTimerMinutesState] = useState<number>(() =>
    readJSON<number>(TIMER_MINUTES_KEY, input.timerMinutes ?? 10)
  );

  const setTimerMinutes = useCallback((minutes: number) => {
    if (!Number.isFinite(minutes)) return;
    const clamped = Math.max(TIMER_MIN, Math.min(TIMER_MAX, Math.round(minutes)));
    setTimerMinutesState(clamped);
    writeJSON(TIMER_MINUTES_KEY, clamped);
  }, []);

  const [xp, setXp] = useState<number>(() => readJSON<number>(XP_KEY, 0));
  const [streak, setStreak] = useState<StreakPersistedState>(() =>
    readJSON<StreakPersistedState>(STREAK_KEY, {
      current: 0,
      best: 0,
      lastDay: null
    })
  );
  const [activity, setActivity] = useState<Record<string, number>>(() =>
    readJSON<Record<string, number>>(HISTORY_KEY, {})
  );
  const [bonus, setBonus] = useState<BonusPersistedState>(() =>
    readJSON<BonusPersistedState>(BONUS_KEY, {
      milestonesClaimed: [],
      lastDailyBonusAt: null
    })
  );
  const [lastMilestoneAward, setLastMilestoneAward] = useState<
    StreakBonusState['lastMilestoneAward']
  >(null);

  // Refs pour lire l'état à jour depuis les callbacks (évite les closures
  // figées de useCallback + permet de calculer multiplier/daily/palier dans un
  // seul appel à awardXp sans dépendre de plusieurs setState successifs).
  const streakRef = useRef(streak);
  const bonusRef = useRef(bonus);
  streakRef.current = streak;
  bonusRef.current = bonus;

  // ------------------------------------------------------------------
  //  Sync Firestore — XP total, streak, historique XP par jour, bonus
  // ------------------------------------------------------------------

  // XP total : max (jamais perdre d'XP entre devices)
  const { saveToFirestore: saveXpToCloud } = useFirestoreSync(XP_KEY, (data) => {
    const cloud = typeof data === 'number' ? data : Number(data);
    if (!Number.isFinite(cloud)) return;
    setXp((prev) => (cloud > prev ? cloud : prev));
  });

  // Streak : best = max, current dépend du lastDay le plus récent.
  const { saveToFirestore: saveStreakToCloud } = useFirestoreSync(STREAK_KEY, (data) => {
    if (!data || typeof data !== 'object') return;
    const incoming = data as { current?: number; best?: number; lastDay?: string | null };
    setStreak((prev) => {
      const nextBest = Math.max(prev.best, Number(incoming.best) || 0);
      // Si le cloud a un lastDay plus récent, on prend son current ; sinon on garde le local.
      const cloudLast = incoming.lastDay ?? null;
      const localLast = prev.lastDay;
      let current = prev.current;
      let lastDay: string | null = localLast;
      if (cloudLast && (!localLast || cloudLast > localLast)) {
        current = Number(incoming.current) || 0;
        lastDay = cloudLast;
      }
      if (nextBest === prev.best && current === prev.current && lastDay === prev.lastDay) {
        return prev;
      }
      return { current, best: nextBest, lastDay };
    });
  });

  // Historique XP par jour : max par date (défensif : évite que Chrome efface Safari).
  const { saveToFirestore: saveActivityToCloud } = useFirestoreSync(HISTORY_KEY, (data) => {
    if (!data || typeof data !== 'object') return;
    setActivity((prev) => {
      const merged: Record<string, number> = { ...prev };
      let changed = false;
      for (const [dateKey, value] of Object.entries(data as Record<string, number>)) {
        const numValue = Number(value) || 0;
        const currentValue = merged[dateKey] ?? 0;
        if (numValue > currentValue) {
          merged[dateKey] = numValue;
          changed = true;
        }
      }
      return changed ? merged : prev;
    });
  });

  // Bonus de série : union des paliers claims (jamais retirer), max lastDailyBonusAt.
  const { saveToFirestore: saveBonusToCloud } = useFirestoreSync(BONUS_KEY, (data) => {
    if (!data || typeof data !== 'object') return;
    const incoming = data as {
      milestonesClaimed?: unknown;
      lastDailyBonusAt?: unknown;
    };
    const incomingClaimed = Array.isArray(incoming.milestonesClaimed)
      ? incoming.milestonesClaimed
          .map((n) => Number(n))
          .filter((n) => Number.isFinite(n))
      : [];
    const incomingLastDaily =
      typeof incoming.lastDailyBonusAt === 'string' ? incoming.lastDailyBonusAt : null;
    setBonus((prev) => {
      const mergedClaimed = Array.from(
        new Set<number>([...prev.milestonesClaimed, ...incomingClaimed])
      ).sort((a, b) => a - b);
      const mergedLastDaily =
        incomingLastDaily && (!prev.lastDailyBonusAt || incomingLastDaily > prev.lastDailyBonusAt)
          ? incomingLastDaily
          : prev.lastDailyBonusAt;
      if (
        mergedClaimed.length === prev.milestonesClaimed.length &&
        mergedClaimed.every((n, i) => n === prev.milestonesClaimed[i]) &&
        mergedLastDaily === prev.lastDailyBonusAt
      ) {
        return prev;
      }
      return { milestonesClaimed: mergedClaimed, lastDailyBonusAt: mergedLastDaily };
    });
  });

  // Persistances local + cloud. On skip le tout premier effet pour éviter un
  // upload de l'état initial alors qu'onSnapshot arrive juste après avec la
  // vraie valeur cloud (ce qui permet le merge max sans clobber).
  const didMountXpRef = useRef(false);
  useEffect(() => {
    writeJSON(XP_KEY, xp);
    if (!didMountXpRef.current) {
      didMountXpRef.current = true;
      return;
    }
    saveXpToCloud(xp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [xp]);

  const didMountStreakRef = useRef(false);
  useEffect(() => {
    writeJSON(STREAK_KEY, streak);
    if (!didMountStreakRef.current) {
      didMountStreakRef.current = true;
      return;
    }
    saveStreakToCloud(streak);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [streak]);

  const didMountActivityRef = useRef(false);
  useEffect(() => {
    writeJSON(HISTORY_KEY, activity);
    if (!didMountActivityRef.current) {
      didMountActivityRef.current = true;
      return;
    }
    saveActivityToCloud(activity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activity]);

  const didMountBonusRef = useRef(false);
  useEffect(() => {
    writeJSON(BONUS_KEY, bonus);
    if (!didMountBonusRef.current) {
      didMountBonusRef.current = true;
      return;
    }
    saveBonusToCloud(bonus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bonus]);

  // Recalcule le streak au chargement (en cas de longue absence → reset).
  useEffect(() => {
    const last = readJSON<string | null>(LAST_SEEN_KEY, null);
    const today = todayKey();
    if (last && last !== today) {
      const gap = daysBetween(last, today);
      if (gap > 1) {
        // >1 jour sans venir : la série tombe à 0, MAIS elle redémarrera à la prochaine action.
        setStreak((s) => ({ ...s, current: 0 }));
      }
    }
    writeJSON(LAST_SEEN_KEY, today);
  }, []);

  // ------------------------------------------------------------------
  //  Award XP — point d'application unique du multiplicateur + daily + palier
  // ------------------------------------------------------------------

  const awardXp = useCallback((amount: number, _source?: string) => {
    if (amount <= 0) return;
    const today = todayKey();

    // 1. Déterminer la série EFFECTIVE après avoir "touché l'app" aujourd'hui.
    //    On ne mute pas l'état ici — on calcule pour les bonus, puis on persiste.
    const prevStreak = streakRef.current;
    const nextStreak = computeNextStreak(prevStreak, today);
    const streakUpdated = nextStreak !== prevStreak;
    const effectiveStreakDays = nextStreak.current;

    // 2. Multiplicateur sur la base.
    const multiplier = getStreakMultiplier(effectiveStreakDays);
    const scaledBase = Math.round(amount * multiplier);

    // 3. Bonus quotidien (première activité de la journée uniquement).
    const prevBonus = bonusRef.current;
    const dailyDue = prevBonus.lastDailyBonusAt !== today;
    const daily = dailyDue ? getDailyFidelityBonus(effectiveStreakDays) : 0;

    // 4. Palier franchi ? (one-time, non-repeatable)
    const milestone = STREAK_MILESTONES.find(
      (m) => m.days === effectiveStreakDays
    );
    const milestoneClaim =
      milestone && !prevBonus.milestonesClaimed.includes(milestone.days)
        ? milestone
        : null;
    const milestoneXp = milestoneClaim ? milestoneClaim.reward : 0;

    const totalXp = scaledBase + daily + milestoneXp;

    // 5. Appliquer TOUS les side-effects en batch.
    setXp((prev) => prev + totalXp);
    setActivity((prev) => ({
      ...prev,
      [today]: (prev[today] ?? 0) + totalXp
    }));

    if (streakUpdated) setStreak(nextStreak);

    if (dailyDue || milestoneClaim) {
      setBonus((prev) => ({
        milestonesClaimed: milestoneClaim
          ? Array.from(
              new Set<number>([...prev.milestonesClaimed, milestoneClaim.days])
            ).sort((a, b) => a - b)
          : prev.milestonesClaimed,
        lastDailyBonusAt: dailyDue ? today : prev.lastDailyBonusAt
      }));
    }

    if (milestoneClaim) {
      setLastMilestoneAward({
        days: milestoneClaim.days,
        xp: milestoneClaim.reward,
        at: today
      });
    }
  }, []);

  const pingAlive = useCallback(() => {
    const today = todayKey();
    const prevStreak = streakRef.current;
    const nextStreak = computeNextStreak(prevStreak, today);
    if (nextStreak === prevStreak) return; // déjà à jour

    setStreak(nextStreak);

    // Les paliers se déclenchent aussi si la série passe par un cap sans qu'une
    // action rémunératrice n'ait (encore) été faite aujourd'hui. Le reste des
    // bonus (multiplicateur + daily) attendra le premier awardXp.
    const milestone = STREAK_MILESTONES.find(
      (m) => m.days === nextStreak.current
    );
    if (!milestone) return;

    const prevBonus = bonusRef.current;
    if (prevBonus.milestonesClaimed.includes(milestone.days)) return;

    setXp((prev) => prev + milestone.reward);
    setActivity((prev) => ({
      ...prev,
      [today]: (prev[today] ?? 0) + milestone.reward
    }));
    setBonus((prev) => ({
      ...prev,
      milestonesClaimed: Array.from(
        new Set<number>([...prev.milestonesClaimed, milestone.days])
      ).sort((a, b) => a - b)
    }));
    setLastMilestoneAward({
      days: milestone.days,
      xp: milestone.reward,
      at: today
    });
  }, []);

  const clearMilestoneAward = useCallback(() => {
    setLastMilestoneAward(null);
  }, []);

  // État dérivé -----------------------------------------------------------
  const xpState: XpState = useMemo(() => {
    let level = 1;
    let remaining = xp;
    while (remaining >= XP_PER_LEVEL(level)) {
      remaining -= XP_PER_LEVEL(level);
      level += 1;
    }
    const xpNeededForNext = XP_PER_LEVEL(level);
    return {
      xp,
      level,
      xpInLevel: remaining,
      xpNeededForNext,
      progressPct: Math.round((remaining / xpNeededForNext) * 100)
    };
  }, [xp]);

  const streakState: StreakState = useMemo(
    () => ({
      current: streak.current,
      best: streak.best,
      isAliveToday: streak.lastDay === todayKey()
    }),
    [streak]
  );

  const bonusState: StreakBonusState = useMemo(() => {
    const multiplier = getStreakMultiplier(streak.current);
    return {
      multiplier,
      multiplierBonusPct: Math.round((multiplier - 1) * 100),
      nextMilestone: getNextMilestone(streak.current, bonus.milestonesClaimed),
      milestonesClaimed: bonus.milestonesClaimed,
      lastDailyBonusAt: bonus.lastDailyBonusAt,
      lastMilestoneAward,
      clearMilestoneAward
    };
  }, [streak.current, bonus.milestonesClaimed, bonus.lastDailyBonusAt, lastMilestoneAward, clearMilestoneAward]);

  const todayXp = activity[todayKey()] ?? 0;
  const xpDailyTarget = 50; // aligné sur Seonsaengnim

  const dailyGoal: DailyGoalTargets = useMemo(() => {
    // Combien d'éléments "faits" aujourd'hui pour le compteur 1/3 ?
    let done = 0;
    if ((input.dueCardsCount ?? 0) === 0) done += 1; // révisions à jour
    if (todayXp >= xpDailyTarget) done += 1;
    if (streakState.isAliveToday) done += 1;

    return {
      cardsDue: { current: input.dueCardsCount ?? 0, target: 10 },
      lessonToResume: input.nextLessonTitle
        ? { title: input.nextLessonTitle, id: input.nextLessonId }
        : null,
      xpGoal: { current: todayXp, target: xpDailyTarget },
      timerMinutes
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input.dueCardsCount, input.nextLessonTitle, input.nextLessonId, todayXp, streakState.isAliveToday, timerMinutes]);

  // Debug helper: expose dailyTarget (utilisé pour "done / target" si tu veux réintégrer)
  void dailyTarget;

  return {
    dailyGoal,
    xp: xpState,
    streak: streakState,
    bonus: bonusState,
    activity,
    awardXp,
    pingAlive,
    setTimerMinutes
  };
};
