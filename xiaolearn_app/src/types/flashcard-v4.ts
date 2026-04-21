/**
 * flashcard-v4.ts — Flashcards V9 (XiaoLearn)
 * --------------------------------------------------------------
 * Types pour la refonte "Seonsaengnim-style" des flashcards :
 *   - 5 modes d'étude (flip, QCM, typing, écoute, speed round)
 *   - Boutons Again / Hard / Good / Easy (mapping qualité 1-4 de useFlashcardSRS)
 *   - Session summary (résumé post-session avec XP, streak, etc.)
 *   - Heatmap d'activité quotidienne (localStorage)
 *   - Badges de maîtrise (HSK / CECR / thème)
 *   - Mot du jour
 *
 * Aucune dépendance cyclique avec les types V3 — on importe *depuis* V3 au
 * besoin, jamais l'inverse. V4 coexiste avec V3 tant que l'utilisateur ne
 * migre pas App.tsx.
 */

import type { FlashcardDirection } from './flashcard-v3';

// ============================================================================
//  STUDY MODES
// ============================================================================

/**
 * Les cinq modes d'étude proposés dans l'écran V4. Chaque mode est une façon
 * différente de tester la même carte SRS.
 *
 *   - flip        : retourner la carte (comportement V3, défaut)
 *   - mcq         : 4 choix multiples
 *   - typing      : taper le pinyin (ou la traduction en mode inversé)
 *   - listening   : TTS du hanzi, l'utilisateur écrit ce qu'il entend
 *   - speed       : mode chrono 60s, coché/pas-coché sans grade détaillé
 */
export type StudyMode = 'flip' | 'mcq' | 'typing' | 'listening' | 'speed';

/** Labels bilingues courts pour les boutons mode. */
export const STUDY_MODE_LABEL: Record<StudyMode, { fr: string; en: string }> = {
  flip: { fr: 'Retourner', en: 'Flip' },
  mcq: { fr: 'QCM', en: 'Quiz' },
  typing: { fr: 'Saisie', en: 'Typing' },
  listening: { fr: 'Écoute', en: 'Listening' },
  speed: { fr: 'Speed 60s', en: 'Speed 60s' }
};

// ============================================================================
//  SRS RATING (boutons Again / Hard / Good / Easy — mapping qualité 1-4)
// ============================================================================

/**
 * Les 4 boutons de rating exposés à l'utilisateur à la fin de chaque carte
 * (mode flip, mcq, typing, listening). Le mode "speed" n'utilise pas ces
 * ratings — il note chaque carte via un simple bon/mauvais.
 *
 * Mapping vers `answerCard(quality: 1|2|3|4)` de useFlashcardSRS :
 *   again → 1  (retour au niveau 0)
 *   hard  → 2  (même niveau, easeFactor baisse)
 *   good  → 3  (niveau +1)
 *   easy  → 4  (niveau +1, easeFactor augmente, bump supplémentaire)
 */
export type ReviewRating = 'again' | 'hard' | 'good' | 'easy';

export const RATING_TO_QUALITY: Record<ReviewRating, 1 | 2 | 3 | 4> = {
  again: 1,
  hard: 2,
  good: 3,
  easy: 4
};

export const RATING_LABEL: Record<ReviewRating, { fr: string; en: string; hint: { fr: string; en: string } }> = {
  again: { fr: 'À revoir', en: 'Again', hint: { fr: 'Pas retrouvé', en: "Didn't know" } },
  hard: { fr: 'Difficile', en: 'Hard', hint: { fr: 'Galère mais OK', en: 'Tough' } },
  good: { fr: 'Bien', en: 'Good', hint: { fr: 'Retrouvé', en: 'Recalled' } },
  easy: { fr: 'Facile', en: 'Easy', hint: { fr: 'Instantané', en: 'Instant' } }
};

// ============================================================================
//  SESSION SUMMARY (écran de fin de session)
// ============================================================================

/**
 * Résumé agrégé d'une session terminée.
 * Affiché par `SessionSummary` avec animation XP + streak éventuel.
 */
export interface FlashcardSessionSummary {
  mode: StudyMode;
  direction: FlashcardDirection;
  startedAt: number;           // timestamp ms
  endedAt: number;             // timestamp ms
  totalCards: number;          // cartes présentées
  correctCount: number;        // selon le mode (good+easy pour flip/mcq, match pour typing)
  againCount: number;
  hardCount: number;
  goodCount: number;
  easyCount: number;
  xpEarned: number;            // cf. XP_PER_RATING
  /** Ids maîtrisés au cours de la session (ayant atteint level 6). */
  newlyMasteredIds: string[];
}

/** Barème XP par rating — gamification simple et lisible. */
export const XP_PER_RATING: Record<ReviewRating, number> = {
  again: 2,
  hard: 5,
  good: 10,
  easy: 15
};

// ============================================================================
//  DAILY ACTIVITY (heatmap calendrier)
// ============================================================================

/**
 * Une entrée par jour d'activité SRS.
 * Persistée dans localStorage sous `cl_flashcard_activity_v4`.
 */
export interface DailyActivity {
  /** Date au format 'YYYY-MM-DD' (local). */
  date: string;
  /** Nombre de cartes revues ce jour-là, tous modes confondus. */
  cardsReviewed: number;
  /** XP cumulée ce jour-là. */
  xpEarned: number;
  /** Nombre de sessions terminées. */
  sessionsCompleted: number;
}

/** Niveau d'intensité pour colorier une cellule de heatmap. */
export type HeatmapIntensity = 0 | 1 | 2 | 3 | 4;

export function intensityForCount(count: number): HeatmapIntensity {
  if (count <= 0) return 0;
  if (count < 5) return 1;
  if (count < 15) return 2;
  if (count < 30) return 3;
  return 4;
}

// ============================================================================
//  BADGES
// ============================================================================

export type BadgeCategory = 'hsk' | 'cecr' | 'streak' | 'volume' | 'mastery';

/**
 * Un badge = un jalon atteint par l'utilisateur.
 * Les badges sont *calculés*, pas stockés : on les dérive à la volée depuis
 * les progrès SRS + heatmap.
 */
export interface Badge {
  id: string;
  category: BadgeCategory;
  labelFr: string;
  labelEn: string;
  descriptionFr: string;
  descriptionEn: string;
  /** Icône emoji ou glyphe court. */
  icon: string;
  /** True si déjà gagné, false si objectif visible mais non atteint. */
  earned: boolean;
  /** Progression 0..1 (utile pour les badges verrouillés). */
  progress: number;
  /** Compteur actuel / objectif. */
  current: number;
  target: number;
}

// ============================================================================
//  WORD OF THE DAY
// ============================================================================

/**
 * Carte mise en avant une fois par jour. Seed déterministe basé sur la date
 * locale pour que tous les rendus de la journée pointent sur le même mot,
 * mais change à minuit (heure locale).
 */
export interface WordOfTheDay {
  hanzi: string;
  pinyin: string;
  translationFr: string;
  translationEn?: string;
  /** Source facultative (leçon, HSK level, thème). */
  level?: string;
  theme?: string;
  /** Phrase d'exemple si disponible. */
  exampleHanzi?: string;
  exampleTranslationFr?: string;
}

// ============================================================================
//  VIEW STATE (écran principal V4)
// ============================================================================

/**
 * État principal de FlashcardPageV4.
 *  - 'dashboard' : page d'accueil flashcards (word of day, stats, goal, ...)
 *  - 'session'   : session active, gérée par SessionView
 *  - 'summary'   : écran de fin de session
 */
export type FlashcardV4View = 'dashboard' | 'session' | 'summary';
