// Types pour l'application XiaoLearn

export interface Word {
  id: string;
  level: string;
  hanzi: string;
  pinyin: string;
  translation: string;
  translationFr: string;
  category: string;
  explanation?: string;
  explanationFr?: string;
  audioPath?: string;
  theme?: string;
  tags: string[];
  translationFrAlt?: string[];
  examples?: Example[];
}

export interface Example {
  chinese: string;
  pinyin: string;
  translation: string;
}

export interface Quiz {
  prompt: string;
  choices: string[];
  correctChoiceIndex: number;
}

export interface Flashcard {
  id: number;
  wordId: string;
  easinessFactor: number;
  interval: number;
  repetitions: number;
  nextReviewDate: string;
  lastReviewDate: string | null;
  createdAt: string;
}

export interface FlashcardList {
  id: number;
  name: string;
  createdAt: string;
}

export interface ReviewHistory {
  id: number;
  flashcardId: number;
  reviewDate: string;
  quality: number; // 0-5 for SM-2
  timeSpentMs: number;
}

export interface WritingPractice {
  id: number;
  wordId: string;
  practiceDate: string;
  recognitionSuccess: boolean;
  attempts: number;
}

export interface SM2Result {
  interval: number;
  repetitions: number;
  easinessFactor: number;
}

export interface UserProgress {
  totalWordsLearned: number;
  currentStreak: number;
  longestStreak: number;
  totalReviews: number;
  averageAccuracy: number;
  lastReviewDate: string | null;
}

export type HSKLevel = 'hsk1' | 'hsk2' | 'hsk3' | 'hsk4' | 'hsk5' | 'hsk6' | 'hsk7';

export type ReviewQuality = 0 | 1 | 2 | 3 | 4 | 5;

export interface SearchFilters {
  levels?: HSKLevel[];
  categories?: string[];
  themes?: string[];
}
