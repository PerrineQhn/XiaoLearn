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

/**
 * 'mixed' (V18) : la direction est résolue par carte à partir d'un hash de
 * card.id. Sur une session, ~50% des cartes seront hanzi→fr et ~50% fr→hanzi.
 * L'affectation par carte est STABLE (même carte = toujours même direction
 * dans la session) pour cohérence du ré-affichage.
 */
export type FlashcardDirection = 'hanzi-to-fr' | 'fr-to-hanzi' | 'mixed';

/**
 * Résout la direction effective pour une carte donnée quand la direction
 * choisie est 'mixed'. Utilise un hash FNV-1a sur card.id pour stabilité.
 */
export function resolveEffectiveDirection(
  direction: FlashcardDirection,
  cardId: string
): 'hanzi-to-fr' | 'fr-to-hanzi' {
  if (direction !== 'mixed') return direction;
  let h = 0x811c9dc5;
  for (let i = 0; i < cardId.length; i++) {
    h ^= cardId.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return ((h >>> 0) % 2 === 0) ? 'hanzi-to-fr' : 'fr-to-hanzi';
}

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
  /**
   * URL d'un MP3 pré-généré pour cette phrase (convention :
   * `/audio/dialogues/{dialogueId}/{lineIndex}.mp3`). Quand renseignée, le
   * lecteur joue directement ce fichier au lieu de tenter de résoudre le hanzi
   * via les conventions HSK (qui ne couvrent pas les phrases multi-mots).
   */
  audio?: string;
  /** Contexte : locuteur + situation. */
  speaker?: string;
  contextFr?: string;
  /** SRS. */
  lastReviewedAt?: number;
  dueAt?: number;
  srsLevel?: number;
}
