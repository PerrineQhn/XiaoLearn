/**
 * useDailyActivity.ts — heatmap d'activité flashcards (V9)
 * --------------------------------------------------------------
 * Enregistre localement (localStorage) une entrée par jour avec :
 *   - cardsReviewed  : # cartes revues ce jour-là
 *   - xpEarned       : XP cumulée
 *   - sessionsCompleted : # sessions terminées
 *
 * Expose :
 *   - `recordSession(summary)`                    → additionne les compteurs
 *   - `recordCardReview({ xpEarned, rating })`    → +1 carte + XP
 *   - `entries`                                    → Map<date → DailyActivity>
 *   - `getLastNWeeks(n)`                           → tableau 7×n pour heatmap
 *   - `currentStreak`                              → nombre de jours consécutifs
 *
 * Sync Firestore : quand l'utilisateur est connecté, la heatmap est
 * synchronisée via useFirestoreSync (clé 'cl_flashcard_activity_v4') pour
 * être identique sur Chrome / Safari / mobile.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type {
  DailyActivity,
  FlashcardSessionSummary,
  HeatmapIntensity,
  ReviewRating
} from '../types/flashcard-v4';
import { XP_PER_RATING, intensityForCount } from '../types/flashcard-v4';
import { useFirestoreSync } from './useFirestoreSync';

const STORAGE_KEY = 'cl_flashcard_activity_v4';

// ============================================================================
//  UTILS DATES
// ============================================================================

function toLocalDateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function todayKey(): string {
  return toLocalDateKey(new Date());
}

function addDays(d: Date, n: number): Date {
  const copy = new Date(d);
  copy.setDate(copy.getDate() + n);
  return copy;
}

// ============================================================================
//  LOAD / SAVE
// ============================================================================

function loadEntries(): Map<string, DailyActivity> {
  if (typeof window === 'undefined') return new Map();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Map();
    const parsed = JSON.parse(raw) as Record<string, DailyActivity>;
    return new Map(Object.entries(parsed));
  } catch {
    return new Map();
  }
}

function saveEntries(entries: Map<string, DailyActivity>): void {
  if (typeof window === 'undefined') return;
  try {
    const obj = Object.fromEntries(entries);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
  } catch {
    // silent — localStorage peut être plein ou désactivé
  }
}

// ============================================================================
//  HOOK
// ============================================================================

export interface UseDailyActivityReturn {
  entries: Map<string, DailyActivity>;
  /** Cellules 7 rangées × nWeeks colonnes (lundi→dimanche, semaine la plus ancienne à gauche). */
  getLastNWeeks: (weeks: number) => HeatmapCell[][];
  currentStreak: number;
  /** Statistiques totales (tous jours confondus). */
  totals: {
    totalDays: number;
    totalCards: number;
    totalXp: number;
    totalSessions: number;
    bestDayCards: number;
  };
  recordCardReview: (rating: ReviewRating) => void;
  recordSession: (summary: FlashcardSessionSummary) => void;
  /** Pour les tests / outils debug : écrase tout. */
  reset: () => void;
}

export interface HeatmapCell {
  date: string;               // YYYY-MM-DD
  cardsReviewed: number;
  intensity: HeatmapIntensity;
  /** True si la cellule correspond à aujourd'hui. */
  isToday: boolean;
  /** True si cellule dans le futur (visuel en pointillé). */
  isFuture: boolean;
}

export function useDailyActivity(): UseDailyActivityReturn {
  const [entries, setEntries] = useState<Map<string, DailyActivity>>(() => loadEntries());

  // Sync Firestore : on stocke la heatmap sérialisée (Record<date, DailyActivity>).
  // Quand Firestore push une nouvelle valeur (autre navigateur), on fusionne
  // côté local en gardant le max de chaque jour — comme ça aucun navigateur
  // ne peut écraser l'activité de l'autre.
  const { saveToFirestore } = useFirestoreSync(STORAGE_KEY, (data) => {
    if (!data || typeof data !== 'object') return;
    setEntries((prev) => {
      const merged = new Map(prev);
      let changed = false;
      for (const [dateKey, value] of Object.entries(
        data as Record<string, DailyActivity>
      )) {
        if (!value || typeof value !== 'object') continue;
        const existing = merged.get(dateKey);
        if (!existing) {
          merged.set(dateKey, value);
          changed = true;
          continue;
        }
        // Fusion max-par-jour : le cloud ou le local le plus riche gagne.
        const bestCards = Math.max(existing.cardsReviewed, value.cardsReviewed || 0);
        const bestXp = Math.max(existing.xpEarned, value.xpEarned || 0);
        const bestSessions = Math.max(
          existing.sessionsCompleted,
          value.sessionsCompleted || 0
        );
        if (
          bestCards !== existing.cardsReviewed ||
          bestXp !== existing.xpEarned ||
          bestSessions !== existing.sessionsCompleted
        ) {
          merged.set(dateKey, {
            date: dateKey,
            cardsReviewed: bestCards,
            xpEarned: bestXp,
            sessionsCompleted: bestSessions
          });
          changed = true;
        }
      }
      return changed ? merged : prev;
    });
  });

  // Persiste à chaque changement : local + Firestore. On skip le premier
  // effet pour éviter un upload inutile de la Map vide au mount.
  const didMountRef = useRef(false);
  useEffect(() => {
    saveEntries(entries);
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    saveToFirestore(Object.fromEntries(entries));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entries]);

  // -- Mutateurs -------------------------------------------------------------

  const recordCardReview = useCallback((rating: ReviewRating) => {
    const xp = XP_PER_RATING[rating];
    const key = todayKey();
    setEntries(prev => {
      const next = new Map(prev);
      const existing = next.get(key) ?? {
        date: key,
        cardsReviewed: 0,
        xpEarned: 0,
        sessionsCompleted: 0
      };
      next.set(key, {
        ...existing,
        cardsReviewed: existing.cardsReviewed + 1,
        xpEarned: existing.xpEarned + xp
      });
      return next;
    });
  }, []);

  const recordSession = useCallback((summary: FlashcardSessionSummary) => {
    const key = todayKey();
    setEntries(prev => {
      const next = new Map(prev);
      const existing = next.get(key) ?? {
        date: key,
        cardsReviewed: 0,
        xpEarned: 0,
        sessionsCompleted: 0
      };
      // Les cartes ont déjà été comptées par recordCardReview ; on incrémente
      // uniquement sessionsCompleted ici, en se basant sur la présence d'au
      // moins une carte.
      const sessionInc = summary.totalCards > 0 ? 1 : 0;
      next.set(key, {
        ...existing,
        sessionsCompleted: existing.sessionsCompleted + sessionInc
      });
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setEntries(new Map());
  }, []);

  // -- Heatmap --------------------------------------------------------------

  const getLastNWeeks = useCallback((weeks: number): HeatmapCell[][] => {
    const now = new Date();
    // Aligne à lundi de la semaine courante
    const weekday = (now.getDay() + 6) % 7; // 0 = lundi
    const mondayThisWeek = addDays(now, -weekday);
    // Début de la plage : lundi il y a (weeks-1) semaines.
    const start = addDays(mondayThisWeek, -(weeks - 1) * 7);

    const cells: HeatmapCell[][] = [];
    const todayK = todayKey();

    for (let row = 0; row < 7; row++) {
      const line: HeatmapCell[] = [];
      for (let col = 0; col < weeks; col++) {
        const cellDate = addDays(start, col * 7 + row);
        const key = toLocalDateKey(cellDate);
        const entry = entries.get(key);
        const count = entry?.cardsReviewed ?? 0;
        line.push({
          date: key,
          cardsReviewed: count,
          intensity: intensityForCount(count),
          isToday: key === todayK,
          isFuture: cellDate.getTime() > now.getTime()
        });
      }
      cells.push(line);
    }
    return cells;
  }, [entries]);

  // -- Streak (jours consécutifs avec au moins 1 carte) ---------------------

  const currentStreak = useMemo(() => {
    let streak = 0;
    const cursor = new Date();
    // Si aucune activité aujourd'hui, on vérifie quand même hier pour ne pas
    // casser le streak avant que l'utilisateur ait fait sa séance du jour.
    const todayEntry = entries.get(toLocalDateKey(cursor));
    if (!todayEntry || todayEntry.cardsReviewed === 0) {
      cursor.setDate(cursor.getDate() - 1);
    }
    for (let i = 0; i < 400; i++) {
      const entry = entries.get(toLocalDateKey(cursor));
      if (entry && entry.cardsReviewed > 0) {
        streak += 1;
        cursor.setDate(cursor.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  }, [entries]);

  // -- Totaux agrégés -------------------------------------------------------

  const totals = useMemo(() => {
    let totalCards = 0;
    let totalXp = 0;
    let totalSessions = 0;
    let bestDayCards = 0;
    for (const entry of entries.values()) {
      totalCards += entry.cardsReviewed;
      totalXp += entry.xpEarned;
      totalSessions += entry.sessionsCompleted;
      if (entry.cardsReviewed > bestDayCards) bestDayCards = entry.cardsReviewed;
    }
    return {
      totalDays: entries.size,
      totalCards,
      totalXp,
      totalSessions,
      bestDayCards
    };
  }, [entries]);

  return {
    entries,
    getLastNWeeks,
    currentStreak,
    totals,
    recordCardReview,
    recordSession,
    reset
  };
}
