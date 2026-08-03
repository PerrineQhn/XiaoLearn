/**
 * useCards — Collection de cartes mythologiques
 *
 * Source de vérité : AsyncStorage (instantané, hors-ligne).
 * Firestore sert de sauvegarde/synchronisation entre appareils et avec le web :
 * users/{uid}.cards = { [cardId]: { unlockedAt } }
 *
 * Le moteur évalue les déclencheurs sur les données déjà présentes dans l'app
 * (SRS, bilans, leçons, série, XP, mini-jeux, lectures) — aucune nouvelle
 * instrumentation n'est nécessaire côté écrans existants.
 */
import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { useAuth } from '@/contexts/AuthContext';
import { CARDS, type CollectibleCard, type CardTrigger } from '@/data/cards';
import { LESSON_DATA } from '@/data/cecrLessons';
import { CECR_LEVELS } from '@/data/cecrLevelsMeta';
import { stageForCompleted } from '@/data/avatarEvolution';

// ─── Clés de stockage ─────────────────────────────────────────────────────────

const CARDS_KEY = 'xl_cards_v1';          // { [cardId]: unlockedAtISO }
const COUNTERS_KEY = 'xl_card_counters_v1'; // compteurs cumulés propres aux cartes

export interface CardCounters {
  /** Sessions de révision terminées */
  reviewSessions: number;
  /** Cartes révisées (cumul toutes sessions) */
  reviewedCards: number;
  /** Caractères tracés en mode écriture */
  charactersWritten: number;
  /** Meilleur score de prononciation obtenu */
  bestPronunciation: number;
}

const DEFAULT_COUNTERS: CardCounters = {
  reviewSessions: 0,
  reviewedCards: 0,
  charactersWritten: 0,
  bestPronunciation: 0,
};

export type UnlockedMap = Record<string, string>; // cardId -> ISO date

// ─── Lecture des sources de données existantes ────────────────────────────────

async function readJson<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

async function readNumber(key: string): Promise<number> {
  try {
    const raw = await AsyncStorage.getItem(key);
    const n = raw ? parseInt(raw, 10) : 0;
    return Number.isFinite(n) ? n : 0;
  } catch {
    return 0;
  }
}

/** Instantané de toutes les métriques nécessaires à l'évaluation. */
export interface ProgressSnapshot {
  masteredWords: number;
  bilansPassed: number;
  hasPerfectBilan: boolean;
  lessonsCompleted: number;
  completedLessonIds: Set<string>;
  streakDays: number;
  totalXp: number;
  gamesPlayed: number;
  readingsRead: number;
  counters: CardCounters;
}

export async function buildSnapshot(): Promise<ProgressSnapshot> {
  const [
    srs, bilans, completed, minijeux, lectures, counters, xp, streakStored, webStats,
  ] = await Promise.all([
    readJson<Record<string, { level?: number; skills?: Record<string, { level?: number }> }>>('cl_word_srs_v1', {}),
    readJson<Record<string, { passed?: boolean; bestScore?: number }>>('cl_bilans_v7', {}),
    readJson<string[]>('cl_completed_lessons', []),
    readJson<Record<string, { plays?: number }>>('cl_minijeux_v1', {}),
    readJson<Record<string, { read?: boolean }>>('cl_lectures_v1', {}),
    readJson<CardCounters>(COUNTERS_KEY, DEFAULT_COUNTERS),
    readNumber('xl_xp_total'),
    readNumber('xl_streak_days'),
    readJson<{ streak?: number }>('cl_learning_stats_v1', {}),
  ]);

  const masteredWords = Object.values(srs).filter(e => {
    const lvl = e?.skills?.recognition?.level ?? e?.level ?? 0;
    return lvl >= 4;
  }).length;

  const bilanEntries = Object.values(bilans);
  const bilansPassed = bilanEntries.filter(b => b?.passed).length;
  const hasPerfectBilan = bilanEntries.some(b => (b?.bestScore ?? 0) >= 10);

  const gamesPlayed = Object.values(minijeux).reduce((n, g) => n + (g?.plays ?? 0), 0);
  const readingsRead = Object.values(lectures).filter(l => l?.read).length;

  // La série peut vivre à deux endroits (mobile natif + blob web) : on prend la plus élevée.
  const streakDays = Math.max(streakStored, webStats?.streak ?? 0);

  return {
    masteredWords,
    bilansPassed,
    hasPerfectBilan,
    lessonsCompleted: completed.length,
    completedLessonIds: new Set(completed),
    streakDays,
    totalXp: xp,
    gamesPlayed,
    readingsRead,
    counters: { ...DEFAULT_COUNTERS, ...counters },
  };
}

// ─── Évaluation des déclencheurs ──────────────────────────────────────────────

/** Tous les identifiants de leçon d'un niveau CECR. */
function lessonIdsForLevel(levelId: string): string[] {
  const level = CECR_LEVELS.find(l => l.id === levelId);
  if (!level) return [];
  return level.modules.flatMap(m => (LESSON_DATA[m.id] ?? []).map(l => l.id));
}

export function isTriggerMet(trigger: CardTrigger, s: ProgressSnapshot): boolean {
  switch (trigger.kind) {
    case 'reviewSessions':     return s.counters.reviewSessions >= trigger.count;
    case 'reviewedCards':      return s.counters.reviewedCards >= trigger.count;
    case 'masteredWords':      return s.masteredWords >= trigger.count;
    case 'bilansPassed':       return s.bilansPassed >= trigger.count;
    case 'bilanPerfect':       return s.hasPerfectBilan;
    case 'lessonsCompleted':   return s.lessonsCompleted >= trigger.count;
    case 'levelCompleted': {
      const ids = lessonIdsForLevel(trigger.level);
      return ids.length > 0 && ids.every(id => s.completedLessonIds.has(id));
    }
    case 'streakDays':         return s.streakDays >= trigger.count;
    case 'totalXp':            return s.totalXp >= trigger.count;
    case 'gamesPlayed':        return s.gamesPlayed >= trigger.count;
    case 'readingsRead':       return s.readingsRead >= trigger.count;
    case 'charactersWritten':  return s.counters.charactersWritten >= trigger.count;
    case 'pronunciationScore': return s.counters.bestPronunciation >= trigger.score;
    case 'avatarStage':        return stageForCompleted(s.completedLessonIds) >= trigger.stage;
    default:                   return false;
  }
}

/** Progression 0→1 d'un déclencheur, pour la barre des cartes verrouillées. */
export function triggerProgress(trigger: CardTrigger, s: ProgressSnapshot): { current: number; target: number } {
  switch (trigger.kind) {
    case 'reviewSessions':     return { current: s.counters.reviewSessions, target: trigger.count };
    case 'reviewedCards':      return { current: s.counters.reviewedCards, target: trigger.count };
    case 'masteredWords':      return { current: s.masteredWords, target: trigger.count };
    case 'bilansPassed':       return { current: s.bilansPassed, target: trigger.count };
    case 'bilanPerfect':       return { current: s.hasPerfectBilan ? 1 : 0, target: 1 };
    case 'lessonsCompleted':   return { current: s.lessonsCompleted, target: trigger.count };
    case 'levelCompleted': {
      const ids = lessonIdsForLevel(trigger.level);
      return { current: ids.filter(id => s.completedLessonIds.has(id)).length, target: ids.length || 1 };
    }
    case 'streakDays':         return { current: s.streakDays, target: trigger.count };
    case 'totalXp':            return { current: s.totalXp, target: trigger.count };
    case 'gamesPlayed':        return { current: s.gamesPlayed, target: trigger.count };
    case 'readingsRead':       return { current: s.readingsRead, target: trigger.count };
    case 'charactersWritten':  return { current: s.counters.charactersWritten, target: trigger.count };
    case 'pronunciationScore': return { current: s.counters.bestPronunciation, target: trigger.score };
    case 'avatarStage':        return { current: stageForCompleted(s.completedLessonIds), target: trigger.stage };
    default:                   return { current: 0, target: 1 };
  }
}

// ─── Compteurs (incréments appelés depuis les écrans) ─────────────────────────

export async function bumpCounters(patch: Partial<CardCounters>): Promise<void> {
  const cur = await readJson<CardCounters>(COUNTERS_KEY, DEFAULT_COUNTERS);
  const next: CardCounters = { ...DEFAULT_COUNTERS, ...cur };
  for (const [k, v] of Object.entries(patch) as [keyof CardCounters, number][]) {
    if (v == null) continue;
    // bestPronunciation est un maximum, les autres sont cumulatifs
    next[k] = k === 'bestPronunciation' ? Math.max(next[k], v) : next[k] + v;
  }
  await AsyncStorage.setItem(COUNTERS_KEY, JSON.stringify(next));
}

// ─── Déblocage ────────────────────────────────────────────────────────────────

/**
 * Évalue toutes les cartes et débloque celles dont la condition est remplie.
 * Retourne les cartes NOUVELLEMENT débloquées (pour la célébration).
 */
export async function checkUnlocks(uid?: string | null): Promise<CollectibleCard[]> {
  const [snapshot, unlocked] = await Promise.all([
    buildSnapshot(),
    readJson<UnlockedMap>(CARDS_KEY, {}),
  ]);

  const newly: CollectibleCard[] = [];
  const now = new Date().toISOString();

  for (const card of CARDS) {
    if (unlocked[card.id]) continue;
    if (isTriggerMet(card.trigger, snapshot)) {
      unlocked[card.id] = now;
      newly.push(card);
    }
  }

  if (newly.length > 0) {
    await AsyncStorage.setItem(CARDS_KEY, JSON.stringify(unlocked));
    // Crédite les XP des cartes obtenues
    const bonus = newly.reduce((n, c) => n + c.xpReward, 0);
    if (bonus > 0) {
      const cur = await readNumber('xl_xp_total');
      await AsyncStorage.setItem('xl_xp_total', String(cur + bonus));
    }
    void pushToFirestore(uid, unlocked);
  }

  return newly;
}

// ─── Synchronisation Firestore ────────────────────────────────────────────────
//
// Deux représentations coexistent sur users/{uid}, pour le même catalogue :
//   • `cards`                — format mobile : { cardId: 'ISO' }
//   • `xl_achievements_v1`   — format web    : chaîne JSON de
//                              { cardId: { unlockedAt, xpClaimed } }
// Les identifiants sont identiques des deux côtés. On lit et on écrit LES
// DEUX, sinon chaque plateforme vit dans son coin — c'est exactement le bug
// « des cartes sur le web, aucune sur le mobile ».

/** Format du web (useAchievements.ts de xiaolearn_app). */
type WebUnlockMap = Record<string, { unlockedAt: string; xpClaimed?: boolean }>;

function parseWebAchievements(raw: unknown): WebUnlockMap {
  if (typeof raw !== 'string' || !raw) return {};
  try {
    const parsed = JSON.parse(raw) as Record<string, { unlockedAt?: unknown; xpClaimed?: unknown }>;
    const out: WebUnlockMap = {};
    for (const [id, r] of Object.entries(parsed ?? {})) {
      if (r && typeof r.unlockedAt === 'string' && r.unlockedAt) {
        out[id] = { unlockedAt: r.unlockedAt, xpClaimed: r.xpClaimed === true };
      }
    }
    return out;
  } catch { return {}; }
}

/**
 * Écrit l'état dans LES DEUX formats.
 *
 * On préserve les entrées web existantes (leur `xpClaimed` notamment) et l'on
 * marque `xpClaimed: true` sur celles qui viennent du mobile : le mobile crédite
 * l'XP au déblocage, le web ne doit pas le verser une seconde fois.
 */
async function pushToFirestore(
  uid: string | null | undefined,
  unlocked: UnlockedMap,
  webMap?: WebUnlockMap,
) {
  if (!uid) return;
  try {
    let web = webMap;
    if (web === undefined) {
      const snap = await getDoc(doc(db, 'users', uid));
      web = parseWebAchievements(snap.data()?.xl_achievements_v1);
    }
    const mergedWeb: WebUnlockMap = { ...web };
    for (const [id, date] of Object.entries(unlocked)) {
      if (!mergedWeb[id]) mergedWeb[id] = { unlockedAt: date, xpClaimed: true };
    }
    const now = new Date().toISOString();
    await setDoc(doc(db, 'users', uid), {
      cards: unlocked,
      xl_achievements_v1: JSON.stringify(mergedWeb),
      // Timestamp attendu par le useFirestoreSync du web, sans quoi il
      // ignorerait la mise à jour.
      xl_achievements_v1__updatedAt: now,
      lastUpdated: now,
    }, { merge: true });
  } catch (e) {
    // Hors-ligne ou règles absentes : on garde le local, on réessaiera plus tard.
    // `permission-denied` = règles non déployées côté serveur → déployer avec
    // `firebase deploy --only firestore:rules` depuis xiaolearn_app.
    const code = (e as { code?: string })?.code ?? 'inconnu';
    console.warn(`[cards] sync Firestore échouée (${code})`, e);
  }
}

/** Fusionne le distant (formats mobile ET web) dans le local — union, jamais de perte. */
async function mergeFromFirestore(uid: string): Promise<UnlockedMap> {
  const local = await readJson<UnlockedMap>(CARDS_KEY, {});
  try {
    const snap = await getDoc(doc(db, 'users', uid));
    const remote = (snap.data()?.cards ?? {}) as UnlockedMap;
    const web = parseWebAchievements(snap.data()?.xl_achievements_v1);

    let changed = false;
    for (const [id, date] of Object.entries(remote)) {
      if (!local[id]) { local[id] = date; changed = true; }
    }
    // Les déblocages faits sur le web arrivent par ici.
    for (const [id, rec] of Object.entries(web)) {
      if (!local[id]) { local[id] = rec.unlockedAt; changed = true; }
    }

    // Le local peut contenir des cartes qu'un des deux formats distants ignore.
    const missingRemotely = Object.keys(local).some(id => !remote[id] || !web[id]);
    if (changed) await AsyncStorage.setItem(CARDS_KEY, JSON.stringify(local));
    if (missingRemotely) void pushToFirestore(uid, local, web);
  } catch (e) {
    const code = (e as { code?: string })?.code ?? 'inconnu';
    console.warn(`[cards] lecture Firestore échouée (${code})`, e);
  }
  return local;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useCards() {
  const { user } = useAuth();
  const [unlocked, setUnlocked] = useState<UnlockedMap>({});
  const [snapshot, setSnapshot] = useState<ProgressSnapshot | null>(null);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    const uid = user?.uid ?? null;
    const map = uid ? await mergeFromFirestore(uid) : await readJson<UnlockedMap>(CARDS_KEY, {});
    const snap = await buildSnapshot();
    setUnlocked(map);
    setSnapshot(snap);
    setLoading(false);
  }, [user?.uid]);

  useEffect(() => { void reload(); }, [reload]);

  /** Vérifie les déblocages et rafraîchit l'état. Retourne les nouvelles cartes. */
  const check = useCallback(async (): Promise<CollectibleCard[]> => {
    const newly = await checkUnlocks(user?.uid ?? null);
    if (newly.length > 0) await reload();
    return newly;
  }, [user?.uid, reload]);

  const unlockedCount = Object.keys(unlocked).length;

  return {
    unlocked,
    unlockedCount,
    total: CARDS.length,
    snapshot,
    loading,
    reload,
    check,
    isUnlocked: (id: string) => !!unlocked[id],
  };
}
