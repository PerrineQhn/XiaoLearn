/**
 * useErrorJournal — gestion du carnet d'erreurs personnel
 * --------------------------------------------------------
 * Persistance : localStorage + Firestore via useFirestoreSync (clé
 * `xl_error_journal_v1`).
 *
 * API :
 *   - entries        : toutes les erreurs, triées par lastSeenAt desc
 *   - stats          : agrégats (total, semaine, top catégorie, récurrentes)
 *   - addError(...)  : ajoute une erreur OU met à jour l'occurrence si même
 *                      wrongText/correctText déjà présente
 *   - markPracticed(id, success) : enregistre une session d'exercice
 *   - removeError(id) : supprime une entrée
 *   - clear()        : vide tout (avec confirmation côté UI)
 *   - byCategory(cat) : filtre
 *   - recurrent()    : seulement les ≥ 2 occurrences non verrouillées
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFirestoreSync } from './useFirestoreSync';
import type {
  ErrorEntry,
  ErrorCategory,
  ErrorSeverity,
  ErrorSource,
  ErrorStats
} from '../types/error-journal';
import { RECURRENT_THRESHOLD, PRACTICE_LOCK_DAYS } from '../types/error-journal';

const STORAGE_KEY = 'xl_error_journal_v1';

interface AddErrorInput {
  category: ErrorCategory;
  severity?: ErrorSeverity;
  source: ErrorSource;
  wrongText: string;
  correctText: string;
  correctPinyin?: string;
  correctTranslationFr?: string;
  explanation: string;
  fullUserText?: string;
  contextLabel?: string;
  tags?: string[];
}

const loadFromStorage = (): ErrorEntry[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as ErrorEntry[];
  } catch {
    return [];
  }
};

const generateId = (): string =>
  `err-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const normalizeText = (s: string): string => s.trim().replace(/\s+/g, ' ');

const isWithinLockWindow = (lastSuccessIso?: string | null): boolean => {
  if (!lastSuccessIso) return false;
  const last = new Date(lastSuccessIso).getTime();
  if (Number.isNaN(last)) return false;
  return Date.now() - last < PRACTICE_LOCK_DAYS * 24 * 60 * 60 * 1000;
};

const isThisWeek = (iso: string): boolean => {
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return false;
  return Date.now() - t < 7 * 24 * 60 * 60 * 1000;
};

export interface UseErrorJournalReturn {
  entries: ErrorEntry[];
  stats: ErrorStats;
  addError: (input: AddErrorInput) => ErrorEntry;
  markPracticed: (id: string, success: boolean) => void;
  removeError: (id: string) => void;
  clear: () => void;
  byCategory: (cat: ErrorCategory | 'all') => ErrorEntry[];
  bySource: (src: ErrorSource | 'all') => ErrorEntry[];
  recurrent: () => ErrorEntry[];
  unlockedCount: number;
}

export const useErrorJournal = (): UseErrorJournalReturn => {
  const [entries, setEntries] = useState<ErrorEntry[]>(loadFromStorage);

  // Sync Firestore : charge depuis cloud au mount, et push à chaque change.
  const { saveToFirestore } = useFirestoreSync(STORAGE_KEY, (data) => {
    if (Array.isArray(data)) {
      setEntries(data as ErrorEntry[]);
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch { /* ignore */ }
    saveToFirestore(entries);
  }, [entries, saveToFirestore]);

  const addError = useCallback((input: AddErrorInput): ErrorEntry => {
    const wrong = normalizeText(input.wrongText);
    const correct = normalizeText(input.correctText);
    const nowIso = new Date().toISOString();

    let newOrUpdated: ErrorEntry | null = null;

    setEntries((prev) => {
      // Cherche une entrée existante avec même wrong + correct
      const existingIdx = prev.findIndex(
        (e) => e.wrongText === wrong && e.correctText === correct
      );
      if (existingIdx >= 0) {
        const updated: ErrorEntry = {
          ...prev[existingIdx],
          occurrenceCount: prev[existingIdx].occurrenceCount + 1,
          lastSeenAt: nowIso,
          // Si la sévérité a évolué (Gemini la juge différemment), on prend la plus haute
          severity: input.severity
            ? maxSeverity(prev[existingIdx].severity, input.severity)
            : prev[existingIdx].severity,
          // Mise à jour de l'explication si plus récente
          explanation: input.explanation || prev[existingIdx].explanation,
          contextLabel: input.contextLabel ?? prev[existingIdx].contextLabel,
          fullUserText: input.fullUserText ?? prev[existingIdx].fullUserText
        };
        newOrUpdated = updated;
        return prev.map((e, i) => (i === existingIdx ? updated : e));
      }

      const fresh: ErrorEntry = {
        id: generateId(),
        category: input.category,
        severity: input.severity ?? 'importante',
        source: input.source,
        wrongText: wrong,
        correctText: correct,
        correctPinyin: input.correctPinyin,
        correctTranslationFr: input.correctTranslationFr,
        explanation: input.explanation,
        fullUserText: input.fullUserText,
        contextLabel: input.contextLabel,
        createdAt: nowIso,
        lastSeenAt: nowIso,
        occurrenceCount: 1,
        practiceCount: 0,
        lastPracticeSuccessAt: null,
        tags: input.tags
      };
      newOrUpdated = fresh;
      return [fresh, ...prev];
    });

    // On retourne l'entrée (la dernière connue ou la nouvelle).
    return newOrUpdated as unknown as ErrorEntry;
  }, []);

  const markPracticed = useCallback((id: string, success: boolean) => {
    const nowIso = new Date().toISOString();
    setEntries((prev) =>
      prev.map((e) =>
        e.id === id
          ? {
              ...e,
              practiceCount: e.practiceCount + 1,
              lastPracticeSuccessAt: success ? nowIso : e.lastPracticeSuccessAt
            }
          : e
      )
    );
  }, []);

  const removeError = useCallback((id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const clear = useCallback(() => {
    setEntries([]);
  }, []);

  const byCategory = useCallback(
    (cat: ErrorCategory | 'all'): ErrorEntry[] => {
      if (cat === 'all') return entries;
      return entries.filter((e) => e.category === cat);
    },
    [entries]
  );

  const bySource = useCallback(
    (src: ErrorSource | 'all'): ErrorEntry[] => {
      if (src === 'all') return entries;
      return entries.filter((e) => e.source === src);
    },
    [entries]
  );

  const recurrent = useCallback((): ErrorEntry[] => {
    return entries.filter(
      (e) =>
        e.occurrenceCount >= RECURRENT_THRESHOLD &&
        !isWithinLockWindow(e.lastPracticeSuccessAt)
    );
  }, [entries]);

  // Liste des entrées non-verrouillées (badge sidebar)
  const unlockedCount = useMemo(() => {
    return entries.filter((e) => !isWithinLockWindow(e.lastPracticeSuccessAt))
      .length;
  }, [entries]);

  const stats = useMemo<ErrorStats>(() => {
    const total = entries.length;
    const thisWeek = entries.filter((e) => isThisWeek(e.createdAt)).length;
    const practicedLast7Days = entries.filter((e) =>
      isWithinLockWindow(e.lastPracticeSuccessAt)
    ).length;
    const counts: Partial<Record<ErrorCategory, number>> = {};
    for (const e of entries) {
      counts[e.category] = (counts[e.category] ?? 0) + 1;
    }
    let topCategory: ErrorCategory | null = null;
    let topCategoryCount = 0;
    for (const [cat, n] of Object.entries(counts)) {
      if (n && n > topCategoryCount) {
        topCategory = cat as ErrorCategory;
        topCategoryCount = n;
      }
    }
    const recurrentCount = entries.filter(
      (e) =>
        e.occurrenceCount >= RECURRENT_THRESHOLD &&
        !isWithinLockWindow(e.lastPracticeSuccessAt)
    ).length;
    return { total, thisWeek, practicedLast7Days, topCategory, topCategoryCount, recurrentCount };
  }, [entries]);

  // Tri par lastSeenAt desc
  const sortedEntries = useMemo(
    () => [...entries].sort((a, b) => b.lastSeenAt.localeCompare(a.lastSeenAt)),
    [entries]
  );

  return {
    entries: sortedEntries,
    stats,
    addError,
    markPracticed,
    removeError,
    clear,
    byCategory,
    bySource,
    recurrent,
    unlockedCount
  };
};

/** Renvoie la sévérité la plus grave entre deux. */
const maxSeverity = (a: ErrorSeverity, b: ErrorSeverity): ErrorSeverity => {
  const rank: Record<ErrorSeverity, number> = { mineure: 0, importante: 1, critique: 2 };
  return rank[a] >= rank[b] ? a : b;
};
