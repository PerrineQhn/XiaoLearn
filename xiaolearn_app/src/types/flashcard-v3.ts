/**
 * flashcard-v3.ts — Upgrades Flashcards (XiaoLearn V7)
 * -----------------------------------------------------
 * Trois nouvelles capacités :
 *  1. Mode inversé : sens carte FR → hanzi (beaucoup plus dur)
 *  2. Flashcards personnelles : l'utilisateur crée ses propres cartes
 *     (max 500), pinyin généré à la volée, intégrées au SRS.
 *  3. Onglet Phrases : phrases issues des dialogues des leçons complétées
 *     (indépendant du stock "mots", SRS séparé).
 */

export type FlashcardDirection = 'hanzi-to-fr' | 'fr-to-hanzi';

export type FlashcardTab = 'words' | 'sentences' | 'personal';

/**
 * Carte personnelle créée par l'utilisateur.
 * Clé localStorage : `cl_personal_flashcards_v7`.
 */
export interface PersonalFlashcard {
  id: string;                    // pf-{timestamp}
  hanzi: string;
  pinyin: string;                // auto-généré (cfdict) ou saisi
  translationFr: string;
  translationEn?: string;
  note?: string;                 // note personnelle libre
  createdAt: string;             // ISO
  updatedAt: string;             // ISO
  /** SRS intégré : reuses the same interval/due shape as FlashcardV2Item. */
  lastReviewedAt?: number;
  dueAt?: number;
  srsLevel?: number;             // 0..6
}

export const PERSONAL_FLASHCARDS_MAX = 500;

/**
 * Phrase issue d'un dialogue de leçon complétée — utilisée dans l'onglet
 * "Phrases" des flashcards.
 */
export interface SentenceFlashcard {
  id: string;                    // sent-{lessonId}-{lineIndex}
  lessonId: string;
  lessonTitleFr: string;
  lessonTitleEn?: string;
  hanzi: string;
  pinyin: string;
  translationFr: string;
  translationEn?: string;
  /** Contexte : locuteur + situation. */
  speaker?: string;
  contextFr?: string;
  /** SRS. */
  lastReviewedAt?: number;
  dueAt?: number;
  srsLevel?: number;
}
