/**
 * useAchievements.ts — évaluation + persistance des hauts-faits
 * ---------------------------------------------------------------------------
 * Évalue les achievements (src/data/achievements.ts) à partir de métriques
 * passées en paramètres (câblées depuis App.tsx via les props de la page —
 * toutes optionnelles, la page se dégrade proprement sans).
 *
 * Persistance des débloqués : localStorage `xl_achievements_v1` + sync
 * Firestore (pattern useDailyGoals). Un achievement débloqué l'est À VIE,
 * même si la métrique redescend ensuite (ex : streak cassé).
 *
 * Fusion cloud/local : union des ids débloqués ; en cas de doublon, la date
 * `unlockedAt` la plus ancienne gagne et `xpClaimed` est OR-é (un XP versé
 * sur un device ne doit jamais être re-versé sur un autre).
 *
 * XP bonus : `pendingXpReward` expose la somme des récompenses débloquées
 * non encore versées ; `claimXp()` les marque versées et retourne le total
 * (le câblage vers awardXp viendra plus tard).
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ACHIEVEMENTS,
  TIER_ORDER,
  type AchievementDef,
  type AchievementTier
} from '../data/achievements';
import { useFirestoreSync } from './useFirestoreSync';

const STORAGE_KEY = 'xl_achievements_v1';

// ============================================================================
//  TYPES
// ============================================================================

/** Métriques d'évaluation — toutes optionnelles (défaut : 0 / false). */
export interface AchievementMetrics {
  /** Cartes SRS révisées, cumulé (useDailyActivity → totals.totalCards). */
  totalCardsReviewed?: number;
  /** Streak courant en jours (useDailyActivity → currentStreak). */
  currentStreak?: number;
  /** Meilleur streak historique si disponible (sinon currentStreak suffit). */
  bestStreak?: number;
  /** Leçons complétées (completedLessons.length côté App.tsx). */
  lessonsCompleted?: number;
  /** Caractères tracés (entrées SRS avec skills.writing travaillée). */
  charsTraced?: number;
  /** Bilans de niveau réussis (useLevelBilans → entries passed=true). */
  bilansPassed?: number;
  /** L'utilisateur a laissé au moins un avis (useReviews → myReview). */
  hasReview?: boolean;
  /** Niveau XP atteint (système de niveaux, si disponible). */
  xpLevel?: number;
  /** Nombre de niveaux CECR dont TOUTES les leçons sont complétées. */
  cecrLevelsCompleted?: number;
  /** Sessions de révision terminées (useDailyActivity → totals.totalSessions). */
  reviewSessions?: number;
  /** Mots maîtrisés — niveau SRS max (masteredIds filtrés catalogue). */
  masteredWords?: number;
  /** Bilans réussis avec un score parfait. TODO : pas encore compté côté web. */
  perfectBilans?: number;
  /** XP cumulés (useDashboardState → xp.xp). */
  totalXp?: number;
  /** Parties de mini-jeux jouées. TODO : pas encore compté côté web. */
  gamesPlayed?: number;
  /** Textes de lecture lus. TODO : pas encore compté côté web. */
  readingsRead?: number;
  /** Meilleur score de prononciation en %. TODO : pas encore câblé côté web. */
  pronunciationBest?: number;
}

export interface UnlockRecord {
  unlockedAt: string;      // ISO date du déblocage
  xpClaimed?: boolean;     // true une fois l'XP bonus versé
}

export type UnlockMap = Record<string, UnlockRecord>;

export type AchievementStatus = 'unlocked' | 'inProgress' | 'locked';

export interface EvaluatedAchievement extends AchievementDef {
  /** Valeur de métrique courante, clampée à [0, threshold]. */
  progress: number;
  /** Ratio 0..1 (progress / threshold). */
  progressRatio: number;
  status: AchievementStatus;
  unlockedAt: string | null;
}

export interface UseAchievementsReturn {
  /** Tous les achievements évalués, dans l'ordre de définition. */
  achievements: EvaluatedAchievement[];
  unlockedCount: number;
  totalCount: number;
  /** Somme des XP bonus des achievements débloqués (versés ou non). */
  totalXpEarned: number;
  /** XP bonus débloqués mais pas encore versés via claimXp(). */
  pendingXpReward: number;
  /** Marque tous les XP en attente comme versés et retourne le montant. */
  claimXp: () => number;
  /** Meilleur palier atteint parmi les débloqués (null si aucun). */
  bestTier: AchievementTier | null;
}

// ============================================================================
//  HELPERS
// ============================================================================

const sanitizeMap = (raw: unknown): UnlockMap => {
  if (!raw || typeof raw !== 'object') return {};
  const out: UnlockMap = {};
  for (const [id, rec] of Object.entries(raw as Record<string, unknown>)) {
    if (!rec || typeof rec !== 'object') continue;
    const r = rec as Partial<UnlockRecord>;
    if (typeof r.unlockedAt !== 'string' || !r.unlockedAt) continue;
    out[id] = { unlockedAt: r.unlockedAt, xpClaimed: r.xpClaimed === true };
  }
  return out;
};

const readInitial = (): UnlockMap => {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return sanitizeMap(JSON.parse(raw));
  } catch {
    return {};
  }
};

/** Union cloud/local : plus ancienne date gagne, xpClaimed OR-é. */
const mergeMaps = (local: UnlockMap, incoming: UnlockMap): UnlockMap => {
  const merged: UnlockMap = { ...local };
  for (const [id, rec] of Object.entries(incoming)) {
    const existing = merged[id];
    if (!existing) {
      merged[id] = rec;
      continue;
    }
    const earliest =
      Date.parse(rec.unlockedAt) < Date.parse(existing.unlockedAt)
        ? rec.unlockedAt
        : existing.unlockedAt;
    merged[id] = {
      unlockedAt: earliest,
      xpClaimed: existing.xpClaimed === true || rec.xpClaimed === true
    };
  }
  return merged;
};

const mapsEqual = (a: UnlockMap, b: UnlockMap): boolean => {
  const ka = Object.keys(a);
  const kb = Object.keys(b);
  if (ka.length !== kb.length) return false;
  return ka.every(
    (id) =>
      b[id] !== undefined &&
      b[id].unlockedAt === a[id].unlockedAt &&
      (b[id].xpClaimed === true) === (a[id].xpClaimed === true)
  );
};

/** Valeur de métrique courante pour un achievement donné. */
const metricValueFor = (def: AchievementDef, m: AchievementMetrics): number => {
  switch (def.progressSource) {
    case 'cardsReviewed':
      return m.totalCardsReviewed ?? 0;
    case 'lessonsCompleted':
      return m.lessonsCompleted ?? 0;
    case 'streak':
      return Math.max(m.currentStreak ?? 0, m.bestStreak ?? 0);
    case 'bilansPassed':
      return m.bilansPassed ?? 0;
    case 'cecrLevelsCompleted':
      return m.cecrLevelsCompleted ?? 0;
    case 'reviewSessions':
      return m.reviewSessions ?? 0;
    case 'masteredWords':
      return m.masteredWords ?? 0;
    case 'perfectBilans':
      return m.perfectBilans ?? 0;
    case 'totalXp':
      return m.totalXp ?? 0;
    case 'gamesPlayed':
      return m.gamesPlayed ?? 0;
    case 'readingsRead':
      return m.readingsRead ?? 0;
    case 'pronunciationBest':
      return m.pronunciationBest ?? 0;
    default:
      return 0;
  }
};

// ============================================================================
//  HOOK
// ============================================================================

export function useAchievements(
  metrics: AchievementMetrics = {}
): UseAchievementsReturn {
  const [unlocked, setUnlocked] = useState<UnlockMap>(readInitial);

  // -- Sync Firestore (merge défensif : union, jamais d'écrasement) ----------
  const { saveToFirestore } = useFirestoreSync(STORAGE_KEY, (data) => {
    const incoming = sanitizeMap(data);
    setUnlocked((prev) => {
      const merged = mergeMaps(prev, incoming);
      return mapsEqual(merged, prev) ? prev : merged;
    });
  });

  // -- Persistance locale + cloud à chaque changement ------------------------
  // Skip du premier effet : pas d'upload de l'état initial au mount (la garde
  // anti-défauts de useFirestoreSync couvre déjà le cas {} mais autant éviter
  // le write inutile).
  const didMountRef = useRef(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(unlocked));
      } catch {
        /* quota */
      }
    }
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    saveToFirestore(unlocked);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unlocked]);

  // -- Évaluation : débloque les achievements dont la condition est remplie --
  // Un achievement débloqué reste débloqué à vie ; on ne fait qu'AJOUTER.
  useEffect(() => {
    setUnlocked((prev) => {
      let changed = false;
      const next: UnlockMap = { ...prev };
      const nowIso = new Date().toISOString();
      for (const def of ACHIEVEMENTS) {
        if (next[def.id]) continue;
        if (metricValueFor(def, metrics) >= def.threshold) {
          next[def.id] = { unlockedAt: nowIso, xpClaimed: false };
          changed = true;
        }
      }
      return changed ? next : prev;
    });
  }, [
    metrics.totalCardsReviewed,
    metrics.currentStreak,
    metrics.bestStreak,
    metrics.lessonsCompleted,
    metrics.charsTraced,
    metrics.bilansPassed,
    metrics.hasReview,
    metrics.xpLevel,
    metrics.cecrLevelsCompleted,
    metrics.reviewSessions,
    metrics.masteredWords,
    metrics.perfectBilans,
    metrics.totalXp,
    metrics.gamesPlayed,
    metrics.readingsRead,
    metrics.pronunciationBest
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ]);

  // -- Sorties dérivées ------------------------------------------------------

  const achievements = useMemo<EvaluatedAchievement[]>(
    () =>
      ACHIEVEMENTS.map((def) => {
        const record = unlocked[def.id];
        const raw = metricValueFor(def, metrics);
        const progress = record
          ? def.threshold
          : Math.max(0, Math.min(def.threshold, raw));
        const status: AchievementStatus = record
          ? 'unlocked'
          : progress > 0
            ? 'inProgress'
            : 'locked';
        return {
          ...def,
          progress,
          progressRatio: def.threshold > 0 ? progress / def.threshold : 0,
          status,
          unlockedAt: record?.unlockedAt ?? null
        };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      unlocked,
      metrics.totalCardsReviewed,
      metrics.currentStreak,
      metrics.bestStreak,
      metrics.lessonsCompleted,
      metrics.charsTraced,
      metrics.bilansPassed,
      metrics.hasReview,
      metrics.xpLevel,
      metrics.cecrLevelsCompleted,
      metrics.reviewSessions,
      metrics.masteredWords,
      metrics.perfectBilans,
      metrics.totalXp,
      metrics.gamesPlayed,
      metrics.readingsRead,
      metrics.pronunciationBest
    ]
  );

  const unlockedCount = useMemo(
    () => achievements.filter((a) => a.status === 'unlocked').length,
    [achievements]
  );

  const totalXpEarned = useMemo(
    () =>
      achievements.reduce(
        (sum, a) => (a.status === 'unlocked' ? sum + a.xpReward : sum),
        0
      ),
    [achievements]
  );

  const pendingXpReward = useMemo(() => {
    let sum = 0;
    for (const def of ACHIEVEMENTS) {
      const rec = unlocked[def.id];
      if (rec && rec.xpClaimed !== true) sum += def.xpReward;
    }
    return sum;
  }, [unlocked]);

  // Ref sur l'état courant pour que claimXp (stable) calcule le montant hors
  // de l'updater (les updaters doivent rester purs — StrictMode les double).
  const unlockedRef = useRef(unlocked);
  useEffect(() => {
    unlockedRef.current = unlocked;
  }, [unlocked]);

  const claimXp = useCallback((): number => {
    const snapshot = unlockedRef.current;
    let claimed = 0;
    for (const def of ACHIEVEMENTS) {
      const rec = snapshot[def.id];
      if (rec && rec.xpClaimed !== true) claimed += def.xpReward;
    }
    if (claimed === 0) return 0;
    setUnlocked((prev) => {
      let changed = false;
      const next: UnlockMap = { ...prev };
      for (const def of ACHIEVEMENTS) {
        const rec = next[def.id];
        if (rec && rec.xpClaimed !== true) {
          next[def.id] = { ...rec, xpClaimed: true };
          changed = true;
        }
      }
      return changed ? next : prev;
    });
    return claimed;
  }, []);

  const bestTier = useMemo<AchievementTier | null>(() => {
    let best: AchievementTier | null = null;
    for (const a of achievements) {
      if (a.status !== 'unlocked') continue;
      if (best === null || TIER_ORDER.indexOf(a.tier) > TIER_ORDER.indexOf(best)) {
        best = a.tier;
      }
    }
    return best;
  }, [achievements]);

  return {
    achievements,
    unlockedCount,
    totalCount: ACHIEVEMENTS.length,
    totalXpEarned,
    pendingXpReward,
    claimXp,
    bestTier
  };
}
