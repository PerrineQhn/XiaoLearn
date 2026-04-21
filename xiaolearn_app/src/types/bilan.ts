/**
 * bilan.ts — Bilans de fin de niveau CECR (XiaoLearn V7)
 * -------------------------------------------------------
 * Un bilan = un quiz de synthèse de 10 questions à valider à 80% pour
 * débloquer le niveau CECR suivant.
 *
 * Règles :
 *  - 10 questions authored à la main par niveau (couverture transversale
 *    des modules du niveau : vocab + grammaire + dialogue + culture)
 *  - seuil de validation : 80% (8/10)
 *  - rejouable à volonté → on retient le meilleur score
 *  - XP : +60 une seule fois (à la première validation)
 *  - reconnaissance parcours antérieur : si l'utilisateur a déjà complété
 *    > 80% du niveau avant l'arrivée des bilans, on l'affiche comme
 *    "reconnu" et le niveau suivant reste accessible
 */

import type { CecrLevelSlug } from './simulator';

export type BilanQuestionType = 'mcq' | 'fill' | 'match';

/**
 * Question d'un bilan — schéma unifié compatible avec le quiz runner.
 * `match` = associer 2 colonnes (ex : hanzi ↔ traduction).
 */
export interface BilanQuestion {
  id: string;
  type: BilanQuestionType;
  /** Énoncé (fr). */
  promptFr: string;
  promptEn?: string;
  /** Contexte (phrase, dialogue bref, image descriptive). */
  contextFr?: string;
  contextEn?: string;
  /** Pour mcq + fill : choix ; pour match : paires à afficher (unused ici). */
  choices: string[];
  correctIndex: number;
  /** Explication affichée en correction. */
  explanationFr: string;
  explanationEn?: string;
  /** Tag thématique (vocab / grammaire / dialogue / culture). */
  topic?: 'vocab' | 'grammar' | 'dialogue' | 'culture' | 'characters' | 'tones';
}

/**
 * Métadonnées + contenu du bilan d'un niveau CECR donné.
 */
export interface LevelBilan {
  /** Niveau CECR couvert — clé unique. */
  level: CecrLevelSlug;
  /** Titre du bilan (fr). */
  titleFr: string;
  titleEn: string;
  /** Baseline descriptive du niveau (pour l'écran d'intro). */
  descriptionFr: string;
  descriptionEn: string;
  /** Emoji emblème (cohérent avec CecrLevelMeta.icon si possible). */
  emoji: string;
  /** Exactement 10 questions — on check à l'import. */
  questions: BilanQuestion[];
  /** Seuil de validation en pourcent (par défaut 80). */
  passingScore: number;
  /** XP versés à la première validation (par défaut 60). */
  xpReward: number;
}

/**
 * État persistant des bilans complétés par l'utilisateur.
 * Clé localStorage : `cl_bilans_v7`.
 */
export interface BilanCompletionEntry {
  level: CecrLevelSlug;
  /** Meilleur score 0-10. */
  bestScore: number;
  /** True si déjà validé au moins une fois ≥ 80%. */
  passed: boolean;
  /** Date du premier pass (pour éviter de reverser les XP). */
  firstPassedAt?: string;
  /** Nombre total de tentatives. */
  attempts: number;
  /** Dernière tentative (ISO). */
  lastAttemptAt?: string;
  /** Marqueur "parcours antérieur reconnu" (pas de XP versés mais passed=true). */
  legacyRecognized?: boolean;
}

export type BilanCompletionMap = Record<CecrLevelSlug, BilanCompletionEntry>;

export const BILAN_DEFAULT_PASSING = 0.8; // 80%
export const BILAN_XP_REWARD = 60;
export const BILAN_QUESTION_COUNT = 10;
