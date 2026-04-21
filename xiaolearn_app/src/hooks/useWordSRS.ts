/**
 * useWordSRS.ts — SRS par mot, branchable en onRate(id, quality)
 * -----------------------------------------------------------------
 * Contrairement à useFlashcardSRS (qui est "session-bound" : gère sa propre
 * file d'attente via `session.currentCard`), ce hook expose un `rate()` pur
 * qui prend un itemId + quality (1..4) et met simplement à jour la map.
 *
 * Adapté au flip session de FlashcardPageV5 : la page maintient sa propre
 * file, chaque clic "J'ai su / À revoir" déclenche onRate(itemId, quality),
 * et ce hook persiste la progression.
 *
 * États dérivés exposés pour alimenter FlashcardV5 :
 *   - masteredIds : level >= 4 (cartes "solides")
 *   - dueIds      : level < 4 && dueAt <= now (à revoir)
 *   - difficultIds: consecutiveAgain >= 2 (cartes qui bloquent)
 */
import { useCallback, useMemo, useState } from 'react';
import { useFirestoreSync } from './useFirestoreSync';

const STORAGE_KEY = 'cl_word_srs_v1';

export interface WordSrsEntry {
  id: string;
  level: number;              // 0..6
  dueAt: number;              // epoch ms
  lastReviewedAt: number;     // epoch ms
  consecutiveAgain: number;   // nombre d'échecs consécutifs (pour "difficult")
  reviewCount: number;
}

export type WordSrsMap = Record<string, WordSrsEntry>;

// Intervalles en heures, palier par niveau SRS (aligné usePersonalFlashcards).
const INTERVALS_H = [24, 48, 96, 192, 384, 768, 1440];

const readInitial = (): WordSrsMap => {
  if (typeof window === 'undefined') return {};
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') return parsed as WordSrsMap;
  } catch {
    /* ignore */
  }
  return {};
};

export interface UseWordSrsOptions {
  syncEnabled?: boolean;
}

export const useWordSRS = (options: UseWordSrsOptions = {}) => {
  const [map, setMap] = useState<WordSrsMap>(readInitial);

  const { saveToFirestore } = useFirestoreSync(
    STORAGE_KEY,
    (data) => {
      if (data && typeof data === 'object') setMap(data as WordSrsMap);
    },
    { enabled: options.syncEnabled ?? true }
  );

  const persist = useCallback(
    (next: WordSrsMap) => {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      }
      saveToFirestore(next);
    },
    [saveToFirestore]
  );

  /**
   * Enregistre une réponse pour la carte `id`.
   * quality : 1 (again) · 2 (hard) · 3 (good) · 4 (easy)
   */
  const rate = useCallback(
    (id: string, quality: 1 | 2 | 3 | 4) => {
      setMap((prev) => {
        const existing = prev[id];
        const lvl = existing?.level ?? 0;
        let newLvl = lvl;
        let consecutiveAgain = existing?.consecutiveAgain ?? 0;
        if (quality === 1) {
          newLvl = 0;
          consecutiveAgain += 1;
        } else if (quality === 2) {
          newLvl = Math.max(0, lvl - 1);
          consecutiveAgain = 0;
        } else if (quality === 3) {
          newLvl = Math.min(INTERVALS_H.length - 1, lvl + 1);
          consecutiveAgain = 0;
        } else {
          newLvl = Math.min(INTERVALS_H.length - 1, lvl + 2);
          consecutiveAgain = 0;
        }
        const dueInH = quality === 1 ? 10 / 60 : INTERVALS_H[newLvl];
        const nowMs = Date.now();
        const entry: WordSrsEntry = {
          id,
          level: newLvl,
          dueAt: nowMs + dueInH * 60 * 60 * 1000,
          lastReviewedAt: nowMs,
          consecutiveAgain,
          reviewCount: (existing?.reviewCount ?? 0) + 1
        };
        const next = { ...prev, [id]: entry };
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const masteredIds = useMemo(() => {
    const set = new Set<string>();
    for (const e of Object.values(map)) {
      if (e.level >= 4) set.add(e.id);
    }
    return set;
  }, [map]);

  const dueIds = useMemo(() => {
    const set = new Set<string>();
    const now = Date.now();
    for (const e of Object.values(map)) {
      if (e.level < 4 && e.dueAt <= now) set.add(e.id);
    }
    return set;
  }, [map]);

  const difficultIds = useMemo(() => {
    const set = new Set<string>();
    for (const e of Object.values(map)) {
      if (e.consecutiveAgain >= 2) set.add(e.id);
    }
    return set;
  }, [map]);

  const resetAll = useCallback(() => {
    setMap({});
    persist({});
  }, [persist]);

  return {
    map,
    rate,
    masteredIds,
    dueIds,
    difficultIds,
    resetAll
  };
};

export type UseWordSrsReturn = ReturnType<typeof useWordSRS>;
