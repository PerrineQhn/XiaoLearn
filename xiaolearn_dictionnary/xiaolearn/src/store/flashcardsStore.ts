import { create } from 'zustand';
import { Flashcard, Word, ReviewQuality, FlashcardList } from '../types';
import {
  getAllFlashcards,
  getFlashcardsDueForReview,
  getFlashcardsDueForReviewByList,
  getFlashcardsForList,
  updateFlashcard,
  addReviewHistory,
  getWordById,
  getFlashcardLists,
  getFlashcardListByName,
  createFlashcardList,
} from '../database/queries';
import { calculateSM2, getNextReviewDate } from '../algorithms/sm2';

interface FlashcardsState {
  flashcards: Flashcard[];
  dueFlashcards: Flashcard[];
  lists: FlashcardList[];
  selectedListId: number | null;
  currentFlashcard: Flashcard | null;
  currentWord: Word | null;
  currentIndex: number;
  sessionStats: {
    totalReviewed: number;
    correct: number;
    incorrect: number;
    startTime: number;
  };
  isLoading: boolean;
  isReviewMode: boolean;

  // Actions
  loadFlashcards: (listId?: number | null) => Promise<void>;
  loadDueFlashcards: (listId?: number | null) => Promise<void>;
  loadLists: () => Promise<void>;
  createList: (name: string) => Promise<number | null>;
  setSelectedListId: (listId: number | null) => void;
  startReviewSession: () => Promise<void>;
  reviewFlashcard: (quality: ReviewQuality) => Promise<void>;
  nextFlashcard: () => void;
  endReviewSession: () => void;
  resetSession: () => void;
}

export const useFlashcardsStore = create<FlashcardsState>((set, get) => ({
  flashcards: [],
  dueFlashcards: [],
  lists: [],
  selectedListId: null,
  currentFlashcard: null,
  currentWord: null,
  currentIndex: 0,
  sessionStats: {
    totalReviewed: 0,
    correct: 0,
    incorrect: 0,
    startTime: Date.now(),
  },
  isLoading: false,
  isReviewMode: false,

  loadFlashcards: async (listId) => {
    set({ isLoading: true });
    try {
      const resolvedListId =
        typeof listId === 'number' ? listId : get().selectedListId;
      const flashcards = resolvedListId
        ? await getFlashcardsForList(resolvedListId)
        : await getAllFlashcards();
      set({ flashcards, isLoading: false });
    } catch (error) {
      console.error('Error loading flashcards:', error);
      set({ isLoading: false });
    }
  },

  loadDueFlashcards: async (listId) => {
    set({ isLoading: true });
    try {
      const resolvedListId =
        typeof listId === 'number' ? listId : get().selectedListId;
      const dueFlashcards = resolvedListId
        ? await getFlashcardsDueForReviewByList(resolvedListId)
        : await getFlashcardsDueForReview();
      set({ dueFlashcards, isLoading: false });
    } catch (error) {
      console.error('Error loading due flashcards:', error);
      set({ isLoading: false });
    }
  },

  loadLists: async () => {
    try {
      const lists = await getFlashcardLists();
      set({ lists });
    } catch (error) {
      console.error('Error loading flashcard lists:', error);
    }
  },

  createList: async (name: string) => {
    const trimmedName = name.trim();
    if (!trimmedName) return null;

    try {
      const existing = await getFlashcardListByName(trimmedName);
      if (existing) {
        return existing.id;
      }

      const listId = await createFlashcardList(trimmedName);
      await get().loadLists();
      return listId;
    } catch (error) {
      console.error('Error creating flashcard list:', error);
      return null;
    }
  },

  setSelectedListId: (listId) => {
    set({ selectedListId: listId });
  },

  startReviewSession: async () => {
    const { loadDueFlashcards } = get();
    await loadDueFlashcards();

    const { dueFlashcards } = get();
    if (dueFlashcards.length === 0) {
      return;
    }

    // Charger le premier mot
    const firstFlashcard = dueFlashcards[0];
    const word = await getWordById(firstFlashcard.wordId);

    set({
      isReviewMode: true,
      currentFlashcard: firstFlashcard,
      currentWord: word,
      currentIndex: 0,
      sessionStats: {
        totalReviewed: 0,
        correct: 0,
        incorrect: 0,
        startTime: Date.now(),
      },
    });
  },

  reviewFlashcard: async (quality: ReviewQuality) => {
    const { currentFlashcard, sessionStats } = get();
    if (!currentFlashcard) return;

    const startTime = Date.now();

    // Calculer les nouvelles valeurs avec SM-2
    const result = calculateSM2(
      quality,
      currentFlashcard.repetitions,
      currentFlashcard.easinessFactor,
      currentFlashcard.interval
    );

    // Calculer la prochaine date de révision
    const nextDate = getNextReviewDate(result.interval);

    // Mettre à jour la flashcard dans la base de données
    await updateFlashcard(currentFlashcard.id, {
      ...currentFlashcard,
      easinessFactor: result.easinessFactor,
      interval: result.interval,
      repetitions: result.repetitions,
      nextReviewDate: nextDate.toISOString(),
      lastReviewDate: new Date().toISOString(),
    });

    // Enregistrer dans l'historique
    const timeSpent = Date.now() - startTime;
    await addReviewHistory(currentFlashcard.id, quality, timeSpent);

    // Mettre à jour les stats
    const correct = quality >= 3;
    set({
      sessionStats: {
        ...sessionStats,
        totalReviewed: sessionStats.totalReviewed + 1,
        correct: sessionStats.correct + (correct ? 1 : 0),
        incorrect: sessionStats.incorrect + (correct ? 0 : 1),
      },
    });

    // Passer à la carte suivante
    get().nextFlashcard();
  },

  nextFlashcard: async () => {
    const { dueFlashcards, currentIndex } = get();
    const nextIndex = currentIndex + 1;

    if (nextIndex >= dueFlashcards.length) {
      // Fin de la session
      set({
        isReviewMode: false,
        currentFlashcard: null,
        currentWord: null,
      });
      return;
    }

    // Charger la carte suivante
    const nextFlashcard = dueFlashcards[nextIndex];
    const word = await getWordById(nextFlashcard.wordId);

    set({
      currentFlashcard: nextFlashcard,
      currentWord: word,
      currentIndex: nextIndex,
    });
  },

  endReviewSession: () => {
    set({
      isReviewMode: false,
      currentFlashcard: null,
      currentWord: null,
      currentIndex: 0,
    });
  },

  resetSession: () => {
    set({
      sessionStats: {
        totalReviewed: 0,
        correct: 0,
        incorrect: 0,
        startTime: Date.now(),
      },
    });
  },
}));
