/**
 * usePersonalFlashcards.ts — CRUD des flashcards personnelles (XiaoLearn V7)
 * ---------------------------------------------------------------------------
 * L'utilisateur peut créer jusqu'à 500 cartes personnelles (hanzi +
 * traduction + note optionnelle). Pinyin auto-généré via un lookup CFDICT
 * compact, avec fallback sur saisie manuelle si le mot est absent du dict.
 *
 * Sync localStorage + Firestore via useFirestoreSync.
 */
import { useCallback, useMemo, useState } from 'react';
import { PERSONAL_FLASHCARDS_MAX, type PersonalFlashcard } from '../types/flashcard-v3';
import { useFirestoreSync } from './useFirestoreSync';

const STORAGE_KEY = 'cl_personal_flashcards_v7';

const readInitial = (): PersonalFlashcard[] => {
  if (typeof window === 'undefined') return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as PersonalFlashcard[];
  } catch {
    /* ignore */
  }
  return [];
};

const nowISO = () => new Date().toISOString();
const nextId = () => `pf-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

export interface UsePersonalFlashcardsOptions {
  syncEnabled?: boolean;
  /**
   * Lookup pinyin : passe une fonction qui prend un hanzi et retourne le
   * pinyin (ou null). Généralement `lookupPinyin` depuis cfdict-compact.
   */
  lookupPinyin?: (hanzi: string) => string | null;
}

export interface CreatePersonalInput {
  hanzi: string;
  pinyin?: string; // si omis, on regarde dans cfdict
  translationFr: string;
  translationEn?: string;
  note?: string;
}

export const usePersonalFlashcards = (options: UsePersonalFlashcardsOptions = {}) => {
  const [cards, setCards] = useState<PersonalFlashcard[]>(readInitial);

  const { saveToFirestore } = useFirestoreSync(
    STORAGE_KEY,
    (data) => {
      if (Array.isArray(data)) setCards(data as PersonalFlashcard[]);
    },
    { enabled: options.syncEnabled ?? true }
  );

  const persist = useCallback(
    (next: PersonalFlashcard[]) => {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      }
      saveToFirestore(next);
    },
    [saveToFirestore]
  );

  const atCapacity = cards.length >= PERSONAL_FLASHCARDS_MAX;

  const addCard = useCallback(
    (input: CreatePersonalInput): PersonalFlashcard | null => {
      if (atCapacity) return null;
      const hanzi = input.hanzi.trim();
      if (!hanzi) return null;
      const pinyin =
        (input.pinyin?.trim() ?? '') ||
        options.lookupPinyin?.(hanzi) ||
        ''; // fallback vide si introuvable
      const card: PersonalFlashcard = {
        id: nextId(),
        hanzi,
        pinyin,
        translationFr: input.translationFr.trim(),
        translationEn: input.translationEn?.trim(),
        note: input.note?.trim() || undefined,
        createdAt: nowISO(),
        updatedAt: nowISO(),
        srsLevel: 0,
        dueAt: Date.now(),
        lastReviewedAt: undefined
      };
      setCards((prev) => {
        const next = [...prev, card];
        persist(next);
        return next;
      });
      return card;
    },
    [atCapacity, options, persist]
  );

  const updateCard = useCallback(
    (id: string, patch: Partial<Omit<PersonalFlashcard, 'id' | 'createdAt'>>) => {
      setCards((prev) => {
        const next = prev.map((c) =>
          c.id === id ? { ...c, ...patch, updatedAt: nowISO() } : c
        );
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const deleteCard = useCallback(
    (id: string) => {
      setCards((prev) => {
        const next = prev.filter((c) => c.id !== id);
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const recordReview = useCallback(
    (id: string, quality: 1 | 2 | 3 | 4) => {
      /**
       * Barème minimal aligné sur useFlashcardSRS :
       *   1 (again) : reset à niveau 0, due dans 10min
       *   2 (hard)  : -1 niveau (min 0), due dans 1j
       *   3 (good)  : +1 niveau, due dans interval(new level)
       *   4 (easy)  : +2 niveaux, due dans interval(new level)
       */
      const intervalsH = [24, 24 * 2, 24 * 4, 24 * 8, 24 * 16, 24 * 32, 24 * 60]; // heures
      setCards((prev) => {
        const next = prev.map((c) => {
          if (c.id !== id) return c;
          const lvl = c.srsLevel ?? 0;
          let newLvl: number;
          let dueInH: number;
          if (quality === 1) {
            newLvl = 0;
            dueInH = 10 / 60; // 10 min
          } else if (quality === 2) {
            newLvl = Math.max(0, lvl - 1);
            dueInH = 24;
          } else if (quality === 3) {
            newLvl = Math.min(6, lvl + 1);
            dueInH = intervalsH[newLvl];
          } else {
            newLvl = Math.min(6, lvl + 2);
            dueInH = intervalsH[newLvl];
          }
          return {
            ...c,
            srsLevel: newLvl,
            lastReviewedAt: Date.now(),
            dueAt: Date.now() + dueInH * 60 * 60 * 1000,
            updatedAt: nowISO()
          };
        });
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const dueCards = useMemo(() => {
    const now = Date.now();
    return cards.filter((c) => (c.dueAt ?? 0) <= now);
  }, [cards]);

  return {
    cards,
    addCard,
    updateCard,
    deleteCard,
    recordReview,
    dueCards,
    atCapacity,
    count: cards.length,
    remainingSlots: Math.max(0, PERSONAL_FLASHCARDS_MAX - cards.length)
  };
};

export type UsePersonalFlashcardsReturn = ReturnType<typeof usePersonalFlashcards>;
