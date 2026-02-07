import { useState, useCallback, useEffect } from 'react';
import type { LessonItem, LevelId } from '../types';
import { getLessonsByLevel, dataset } from '../data/lessons';
import { useFirestoreSync } from './useFirestoreSync';

// SRS intervals in days (similar to Anki)
const SRS_INTERVALS = [1, 3, 7, 14, 30, 60, 120];

export interface FlashcardProgress {
  wordId: string;
  level: number; // SRS level (0-6)
  nextReviewDate: string; // ISO date string
  lastReviewed: string; // ISO date string
  easeFactor: number; // 1.3 to 2.5 (difficulty)
  reviewCount: number;
}

export interface FlashcardSession {
  newCards: LessonItem[];
  reviewCards: LessonItem[];
  currentCard: LessonItem | null;
  currentIndex: number;
  totalCards: number;
  sessionComplete: boolean;
}

const STORAGE_KEY = 'flashcard_progress';
const DAILY_NEW_CARDS = 10;

const buildDefaultProgressMap = () => {
  // Return empty map - words without entries are considered "new" and unlearned
  return new Map<string, FlashcardProgress>();
};

const initializeProgressMap = (): Map<string, FlashcardProgress> => {
  if (typeof window === 'undefined') {
    return buildDefaultProgressMap();
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    const defaultMap = buildDefaultProgressMap();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Object.fromEntries(defaultMap)));
    return defaultMap;
  }

  try {
    const data = JSON.parse(stored);
    const entries = Object.entries(data).reduce<[string, FlashcardProgress][]>((acc, [key, value]) => {
      if (value && typeof value === 'object') {
        acc.push([key, value as FlashcardProgress]);
      }
      return acc;
    }, []);

    if (entries.length === 0) {
      const defaultMap = buildDefaultProgressMap();
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Object.fromEntries(defaultMap)));
      return defaultMap;
    }

    return new Map(entries);
  } catch (error) {
    console.error('Failed to parse flashcard progress:', error);
    const defaultMap = buildDefaultProgressMap();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Object.fromEntries(defaultMap)));
    return defaultMap;
  }
};

export function useFlashcardSRS(
  hskLevel: LevelId,
  allWords: LessonItem[],
  onWordLearned?: (wordId: string) => void,
  options?: {
    dailyNewCards?: number;
    maxUnlockedLevel?: LevelId;
    syncEnabled?: boolean;
  }
) {
  const [progressMap, setProgressMap] = useState<Map<string, FlashcardProgress>>(initializeProgressMap);
  const [session, setSession] = useState<FlashcardSession>({
    newCards: [],
    reviewCards: [],
    currentCard: null,
    currentIndex: 0,
    totalCards: 0,
    sessionComplete: false
  });

  // Setup Firestore sync for flashcard progress
  const { saveToFirestore } = useFirestoreSync(
    STORAGE_KEY,
    (data) => {
      // When Firestore data changes, update local state
      if (data && typeof data === 'object') {
        try {
          const entries = Object.entries(data).reduce<[string, FlashcardProgress][]>((acc, [key, value]) => {
            if (value && typeof value === 'object') {
              acc.push([key, value as FlashcardProgress]);
            }
            return acc;
          }, []);
          if (entries.length > 0) {
            setProgressMap(new Map(entries));
          }
        } catch (error) {
          console.error('Failed to parse synced flashcard progress:', error);
        }
      }
    },
    { enabled: options?.syncEnabled ?? true }
  );

  // Save progress to localStorage and Firestore
  const saveProgress = useCallback((map: Map<string, FlashcardProgress>) => {
    const obj = Object.fromEntries(map);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
    saveToFirestore(obj);
  }, [saveToFirestore]);

  // Get words that need review today
  const getDueCards = useCallback((): LessonItem[] => {
    const today = new Date().toISOString().split('T')[0];
    const dueWordIds = Array.from(progressMap.entries())
      .filter(([_, progress]) => progress.nextReviewDate <= today)
      .map(([wordId]) => wordId);

    return allWords.filter(word => dueWordIds.includes(word.id));
  }, [progressMap, allWords]);

  // Get new words to learn today
  const getNewCards = useCallback((): LessonItem[] => {
    const learnedIds = new Set(progressMap.keys());
    const newWords = allWords.filter(word => !learnedIds.has(word.id));
    const limit = options?.dailyNewCards ?? DAILY_NEW_CARDS;
    return newWords.slice(0, limit);
  }, [progressMap, allWords, options?.dailyNewCards]);

  // Initialize a new session
  const startSession = useCallback(() => {
    const reviewCards = getDueCards();
    const newCards = getNewCards();
    const allCards = [...reviewCards, ...newCards];

    setSession({
      newCards,
      reviewCards,
      currentCard: allCards[0] || null,
      currentIndex: 0,
      totalCards: allCards.length,
      sessionComplete: allCards.length === 0
    });
  }, [getDueCards, getNewCards]);

  // Calculate next review date based on SRS level
  const calculateNextReview = (level: number): string => {
    const today = new Date();
    const daysToAdd = SRS_INTERVALS[Math.min(level, SRS_INTERVALS.length - 1)];
    today.setDate(today.getDate() + daysToAdd);
    return today.toISOString().split('T')[0];
  };

  // Record answer quality (1=again, 2=hard, 3=good, 4=easy)
  const answerCard = useCallback((quality: 1 | 2 | 3 | 4) => {
    if (!session.currentCard) return;

    const wordId = session.currentCard.id;
    const existing = progressMap.get(wordId);

    let newLevel = 0;
    let easeFactor = 2.5;

    if (existing) {
      newLevel = existing.level;
      easeFactor = existing.easeFactor;

      // Adjust ease factor based on quality
      if (quality === 1) {
        // Again - reset to beginning
        newLevel = 0;
        easeFactor = Math.max(1.3, easeFactor - 0.2);
      } else if (quality === 2) {
        // Hard
        newLevel = Math.max(0, newLevel - 1);
        easeFactor = Math.max(1.3, easeFactor - 0.15);
      } else if (quality === 3) {
        // Good
        newLevel = newLevel + 1;
      } else if (quality === 4) {
        // Easy
        newLevel = newLevel + 2;
        easeFactor = Math.min(2.5, easeFactor + 0.1);
      }
    } else {
      // First time seeing this card
      if (quality === 1 || quality === 2) {
        newLevel = 0;
      } else {
        newLevel = 1;
      }
    }

    const newProgress: FlashcardProgress = {
      wordId,
      level: Math.min(newLevel, SRS_INTERVALS.length - 1),
      nextReviewDate: calculateNextReview(newLevel),
      lastReviewed: new Date().toISOString().split('T')[0],
      easeFactor,
      reviewCount: (existing?.reviewCount || 0) + 1
    };

    const newMap = new Map(progressMap);
    newMap.set(wordId, newProgress);
    setProgressMap(newMap);
    saveProgress(newMap);

    // Sync with lesson progress system - mark word as learned
    if (onWordLearned && !existing) {
      // Only call on first time seeing the word
      onWordLearned(wordId);
    }

    // Move to next card
    const allCards = [...session.reviewCards, ...session.newCards];
    const nextIndex = session.currentIndex + 1;

    if (nextIndex >= allCards.length) {
      setSession({
        ...session,
        currentCard: null,
        currentIndex: nextIndex,
        sessionComplete: true
      });
    } else {
      setSession({
        ...session,
        currentCard: allCards[nextIndex],
        currentIndex: nextIndex
      });
    }
  }, [session, progressMap, saveProgress]);

  // Get stats for a level
  const getLevelStats = useCallback((level?: LevelId) => {
    // If no level specified, use current level's words
    const targetWords = level ? getLessonsByLevel(level) : allWords;
    const levelWordIds = targetWords.map(w => w.id);
    const learned = Array.from(progressMap.values())
      .filter(p => levelWordIds.includes(p.wordId));

    const mature = learned.filter(p => p.level >= 4).length; // Level 4+ = mature
    const learning = learned.filter(p => p.level < 4).length;
    const newCount = targetWords.length - learned.length;

    // For dueToday, only calculate if it's the current level
    const today = new Date().toISOString().split('T')[0];
    const dueToday = learned.filter(p => p.nextReviewDate <= today).length;

    return {
      total: targetWords.length,
      new: newCount,
      learning,
      mature,
      dueToday
    };
  }, [allWords, progressMap]);

  // Check if level is unlocked (80% of previous level must be mature)
  const isLevelUnlocked = useCallback((level: LevelId): boolean => {
    if (options?.maxUnlockedLevel) {
      const levels: LevelId[] = ['hsk1', 'hsk2', 'hsk3', 'hsk4', 'hsk5', 'hsk6', 'hsk7'];
      const maxIndex = levels.indexOf(options.maxUnlockedLevel);
      const levelIndex = levels.indexOf(level);
      if (maxIndex >= 0 && levelIndex > maxIndex) {
        return false;
      }
    }

    // HSK1 is always unlocked
    if (level === 'hsk1') return true;

    // Get previous level
    const levels: LevelId[] = ['hsk1', 'hsk2', 'hsk3', 'hsk4', 'hsk5', 'hsk6', 'hsk7'];
    const currentIndex = levels.indexOf(level);
    if (currentIndex <= 0) return true;

    const prevLevel = levels[currentIndex - 1];
    // Get words from the previous level (not from current allWords)
    const prevLevelWords = getLessonsByLevel(prevLevel);

    if (prevLevelWords.length === 0) return true;

    const matureCount = prevLevelWords.filter(word => {
      const progress = progressMap.get(word.id);
      return progress && progress.level >= 4;
    }).length;

    const completionRate = matureCount / prevLevelWords.length;
    return completionRate >= 0.8; // 80% must be mature
  }, [progressMap, options?.maxUnlockedLevel]);

  return {
    session,
    startSession,
    answerCard,
    getLevelStats,
    isLevelUnlocked,
    progressMap
  };
}
