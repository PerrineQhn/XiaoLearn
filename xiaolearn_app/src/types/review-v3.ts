/**
 * review-v3.ts — Types pour la Révision multi-leçons (XiaoLearn V7)
 * ------------------------------------------------------------------
 * Diffère de l'ancien SrsState (per-flashcard) :
 * ici on pilote la répétition au niveau de la LEÇON complète.
 *
 * Chaque leçon a :
 *  - un % de maîtrise (0-100)
 *  - une date de prochaine révision
 *  - un historique léger des derniers résultats
 *
 * 4 modes de session (inspiré Seonsaengnim) :
 *  - smart-mix : dues + fragiles + récentes pondérés
 *  - daily     : uniquement leçons dont nextReviewAt <= now
 *  - weakness  : leçons avec mastery < 60%
 *  - free      : N dernières leçons complétées (3 / 6 / 10)
 */

import type { CecrLevelSlug } from './simulator';

export type ReviewMode = 'smart-mix' | 'daily' | 'weakness' | 'free';

export type ReviewFreeCount = 3 | 6 | 10;

/**
 * État SRS d'une leçon complète.
 * Stocké dans localStorage sous `cl_lesson_mastery_v7`.
 */
export interface LessonMasteryEntry {
  /** `cecr-a1-pinyin-m1` ou similaire. */
  lessonId: string;
  /** Niveau CECR de la leçon (pour filtrage rapide). */
  level: CecrLevelSlug;
  /** 0-100 — moyenne pondérée glissante des 5 dernières sessions. */
  mastery: number;
  /** Date de prochaine révision (ISO). */
  nextReviewAt: string;
  /** Dernière révision (ISO). */
  lastReviewedAt?: string;
  /** Nombre total de sessions passées sur cette leçon. */
  reviewCount: number;
  /** Intervalle SRS actuel en jours (1, 3, 7, 15, 30). */
  currentIntervalDays: number;
  /** Historique compact des 5 derniers scores (en %). */
  recentScores: number[];
}

/**
 * Mapping principal stocké.
 */
export type LessonMasteryMap = Record<string, LessonMasteryEntry>;

/**
 * Intervalles SRS pour la progression au niveau leçon.
 * On démarre à 1 jour ; succès → progression ; échec → reset à 1.
 */
export const LESSON_SRS_INTERVALS_DAYS: number[] = [1, 3, 7, 15, 30, 60];

/**
 * Un item de question dans une session de révision multi-leçons.
 * Unifie 3 sources : quiz CECR, phrase de dialogue, vocab clé.
 */
export type ReviewQuestionSource = 'quiz' | 'dialogue' | 'vocab';

export interface ReviewQuestion {
  id: string;
  source: ReviewQuestionSource;
  /** Leçon d'origine (utilisée pour bloquer le recalcul de mastery). */
  lessonId: string;
  /** Niveau CECR de la leçon d'origine. */
  level: CecrLevelSlug;
  /** Énoncé affiché. */
  promptFr: string;
  promptEn?: string;
  /** Contexte (phrase, dialogue…). */
  contextFr?: string;
  contextEn?: string;
  /** Choix proposés. */
  choices: string[];
  correctIndex: number;
  explanationFr?: string;
  explanationEn?: string;
}

/**
 * Résultat d'un item de session : bonne / mauvaise.
 */
export interface ReviewAnswer {
  questionId: string;
  lessonId: string;
  selectedIndex: number;
  correct: boolean;
  /** ms écoulés entre affichage et réponse. */
  responseMs?: number;
}

/**
 * Agrégat post-session pour l'écran de résultat.
 */
export interface ReviewSessionSummary {
  mode: ReviewMode;
  startedAt: string;
  endedAt: string;
  totalQuestions: number;
  correctCount: number;
  /** Score global 0-100. */
  scorePct: number;
  /** XP gagnés dans la session. */
  xpEarned: number;
  /** Leçons touchées : mastery before / after + next review date. */
  lessonsTouched: Array<{
    lessonId: string;
    titleFr: string;
    titleEn?: string;
    level: CecrLevelSlug;
    masteryBefore: number;
    masteryAfter: number;
    nextReviewAt: string;
    questionCount: number;
    correctCount: number;
  }>;
  /** Liste des erreurs pour lien "refaire la leçon". */
  mistakes: Array<{
    questionId: string;
    lessonId: string;
    titleFr: string;
    promptFr: string;
    correctAnswer: string;
    selectedAnswer: string;
  }>;
}

export const REVIEW_XP_PER_CORRECT = 3;
export const REVIEW_XP_SESSION_BONUS = 15;
