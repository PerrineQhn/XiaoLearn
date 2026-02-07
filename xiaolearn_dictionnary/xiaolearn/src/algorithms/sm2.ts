import { SM2Result, ReviewQuality } from '../types';

/**
 * Algorithme SM-2 (SuperMemo 2) pour la révision espacée
 *
 * @param quality - Note de 0 à 5 :
 *   0 - Complete blackout (échec total)
 *   1 - Incorrect response, but recognized upon seeing answer
 *   2 - Incorrect response, but seemed easy to remember upon seeing answer
 *   3 - Correct response, but required significant difficulty to recall
 *   4 - Correct response, after some hesitation
 *   5 - Perfect response (rappel immédiat)
 *
 * @param repetitions - Nombre de répétitions réussies consécutives
 * @param easinessFactor - Facteur de facilité (EF), initialisé à 2.5
 * @param interval - Intervalle actuel en jours
 *
 * @returns Nouveau état de la flashcard
 */
export const calculateSM2 = (
  quality: ReviewQuality,
  repetitions: number,
  easinessFactor: number,
  interval: number
): SM2Result => {
  // 1. Calculer le nouveau Easiness Factor (EF)
  let newEF = easinessFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));

  // EF ne doit jamais descendre en dessous de 1.3
  if (newEF < 1.3) {
    newEF = 1.3;
  }

  // 2. Calculer les nouvelles répétitions et l'intervalle
  let newRepetitions: number;
  let newInterval: number;

  if (quality < 3) {
    // Échec : réinitialiser les répétitions
    newRepetitions = 0;
    newInterval = 1; // Revoir demain
  } else {
    // Succès : incrémenter les répétitions
    newRepetitions = repetitions + 1;

    if (newRepetitions === 1) {
      // Première répétition réussie : revoir dans 1 jour
      newInterval = 1;
    } else if (newRepetitions === 2) {
      // Deuxième répétition réussie : revoir dans 6 jours
      newInterval = 6;
    } else {
      // Répétitions suivantes : multiplier par EF
      newInterval = Math.round(interval * newEF);
    }
  }

  return {
    interval: newInterval,
    repetitions: newRepetitions,
    easinessFactor: newEF,
  };
};

/**
 * Calcule la prochaine date de révision
 */
export const getNextReviewDate = (interval: number): Date => {
  const now = new Date();
  const nextDate = new Date(now);
  nextDate.setDate(nextDate.getDate() + interval);
  return nextDate;
};

/**
 * Convertit une qualité simplifiée (Again/Hard/Good/Easy) en note SM-2 (0-5)
 */
export const simpleQualityToSM2 = (
  simpleQuality: 'again' | 'hard' | 'good' | 'easy'
): ReviewQuality => {
  switch (simpleQuality) {
    case 'again':
      return 0; // Complete failure
    case 'hard':
      return 3; // Correct with difficulty
    case 'good':
      return 4; // Correct with hesitation
    case 'easy':
      return 5; // Perfect response
  }
};

/**
 * Obtient les intervalles suggérés pour chaque bouton (Again/Hard/Good/Easy)
 */
export const getSuggestedIntervals = (
  repetitions: number,
  easinessFactor: number,
  currentInterval: number
): { again: number; hard: number; good: number; easy: number } => {
  const againResult = calculateSM2(0, repetitions, easinessFactor, currentInterval);
  const hardResult = calculateSM2(3, repetitions, easinessFactor, currentInterval);
  const goodResult = calculateSM2(4, repetitions, easinessFactor, currentInterval);
  const easyResult = calculateSM2(5, repetitions, easinessFactor, currentInterval);

  return {
    again: againResult.interval,
    hard: hardResult.interval,
    good: goodResult.interval,
    easy: easyResult.interval,
  };
};
