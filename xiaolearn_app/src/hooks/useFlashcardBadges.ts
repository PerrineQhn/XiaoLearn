/**
 * useFlashcardBadges.ts — Badges de maîtrise des flashcards (V9)
 * --------------------------------------------------------------
 * Les badges sont CALCULÉS (dérivés), pas stockés, pour éviter tout état
 * cumulatif divergent. On reconstruit la liste à chaque render en croisant :
 *   - les cartes maîtrisées (SRS level >= 6)
 *   - le streak courant (heatmap)
 *   - le total XP
 *
 * L'appelant nous fournit les comptes, on renvoie un tableau `Badge[]` trié
 * avec `earned` / `progress`. La page se contente de rendre.
 */

import { useMemo } from 'react';
import type { Badge } from '../types/flashcard-v4';

export interface UseFlashcardBadgesInput {
  /** Nombre total de cartes maîtrisées (level >= 6). */
  masteredCount: number;
  /** Par niveau HSK : { 'hsk1': 42, 'hsk2': 30, ... }. */
  masteredByHsk: Record<string, number>;
  /** Par niveau CECR : { 'a1': 18, 'a2': 22, ... }. */
  masteredByCecr?: Record<string, number>;
  /** Streak courant (jours consécutifs). */
  streakDays: number;
  /** XP totale cumulée. */
  totalXp: number;
  /** Nombre total de cartes revues (tous jours confondus). */
  totalCardsReviewed: number;
}

// ============================================================================
//  DÉFINITIONS DE BADGES
// ============================================================================

interface BadgeDef {
  id: string;
  category: Badge['category'];
  labelFr: string;
  labelEn: string;
  descriptionFr: string;
  descriptionEn: string;
  icon: string;
  target: number;
  getCurrent: (input: UseFlashcardBadgesInput) => number;
}

const BADGE_DEFS: BadgeDef[] = [
  // ---- Volume ---------------------------------------------------------------
  {
    id: 'volume-100',
    category: 'volume',
    labelFr: 'Premier centurion',
    labelEn: 'First Century',
    descriptionFr: 'Réviser 100 cartes au total',
    descriptionEn: 'Review 100 cards total',
    icon: '💯',
    target: 100,
    getCurrent: (i) => i.totalCardsReviewed
  },
  {
    id: 'volume-1000',
    category: 'volume',
    labelFr: 'Millénaire',
    labelEn: 'Millennium',
    descriptionFr: 'Réviser 1 000 cartes au total',
    descriptionEn: 'Review 1 000 cards total',
    icon: '🏛️',
    target: 1000,
    getCurrent: (i) => i.totalCardsReviewed
  },
  {
    id: 'volume-5000',
    category: 'volume',
    labelFr: 'Marathonien',
    labelEn: 'Marathoner',
    descriptionFr: 'Réviser 5 000 cartes au total',
    descriptionEn: 'Review 5 000 cards total',
    icon: '🏃',
    target: 5000,
    getCurrent: (i) => i.totalCardsReviewed
  },
  // ---- Streak ---------------------------------------------------------------
  {
    id: 'streak-7',
    category: 'streak',
    labelFr: 'Semaine pleine',
    labelEn: 'Full Week',
    descriptionFr: '7 jours consécutifs',
    descriptionEn: '7 days in a row',
    icon: '🔥',
    target: 7,
    getCurrent: (i) => i.streakDays
  },
  {
    id: 'streak-30',
    category: 'streak',
    labelFr: 'Mois parfait',
    labelEn: 'Perfect Month',
    descriptionFr: '30 jours consécutifs',
    descriptionEn: '30 days in a row',
    icon: '🌙',
    target: 30,
    getCurrent: (i) => i.streakDays
  },
  {
    id: 'streak-100',
    category: 'streak',
    labelFr: 'Centième jour',
    labelEn: 'Century Streak',
    descriptionFr: '100 jours consécutifs',
    descriptionEn: '100 days in a row',
    icon: '🏆',
    target: 100,
    getCurrent: (i) => i.streakDays
  },
  // ---- Mastery totale -------------------------------------------------------
  {
    id: 'mastery-50',
    category: 'mastery',
    labelFr: 'Cinquante maîtrisés',
    labelEn: 'Fifty Mastered',
    descriptionFr: 'Maîtriser 50 cartes',
    descriptionEn: 'Master 50 cards',
    icon: '⭐',
    target: 50,
    getCurrent: (i) => i.masteredCount
  },
  {
    id: 'mastery-500',
    category: 'mastery',
    labelFr: 'Cinq cents sages',
    labelEn: 'Five Hundred Sage',
    descriptionFr: 'Maîtriser 500 cartes',
    descriptionEn: 'Master 500 cards',
    icon: '🎓',
    target: 500,
    getCurrent: (i) => i.masteredCount
  },
  {
    id: 'mastery-2000',
    category: 'mastery',
    labelFr: 'Érudit',
    labelEn: 'Scholar',
    descriptionFr: 'Maîtriser 2 000 cartes',
    descriptionEn: 'Master 2 000 cards',
    icon: '📚',
    target: 2000,
    getCurrent: (i) => i.masteredCount
  },
  // ---- HSK ------------------------------------------------------------------
  {
    id: 'hsk1-complete',
    category: 'hsk',
    labelFr: 'HSK 1 complet',
    labelEn: 'HSK 1 Complete',
    descriptionFr: 'Maîtriser 150 cartes HSK 1',
    descriptionEn: 'Master 150 HSK 1 cards',
    icon: '①',
    target: 150,
    getCurrent: (i) => i.masteredByHsk['hsk1'] ?? 0
  },
  {
    id: 'hsk2-complete',
    category: 'hsk',
    labelFr: 'HSK 2 complet',
    labelEn: 'HSK 2 Complete',
    descriptionFr: 'Maîtriser 300 cartes HSK 2',
    descriptionEn: 'Master 300 HSK 2 cards',
    icon: '②',
    target: 300,
    getCurrent: (i) => i.masteredByHsk['hsk2'] ?? 0
  },
  {
    id: 'hsk3-complete',
    category: 'hsk',
    labelFr: 'HSK 3 complet',
    labelEn: 'HSK 3 Complete',
    descriptionFr: 'Maîtriser 600 cartes HSK 3',
    descriptionEn: 'Master 600 HSK 3 cards',
    icon: '③',
    target: 600,
    getCurrent: (i) => i.masteredByHsk['hsk3'] ?? 0
  },
  {
    id: 'hsk4-complete',
    category: 'hsk',
    labelFr: 'HSK 4 complet',
    labelEn: 'HSK 4 Complete',
    descriptionFr: 'Maîtriser 1 200 cartes HSK 4',
    descriptionEn: 'Master 1 200 HSK 4 cards',
    icon: '④',
    target: 1200,
    getCurrent: (i) => i.masteredByHsk['hsk4'] ?? 0
  },
  // ---- CECR (optionnel) -----------------------------------------------------
  {
    id: 'cecr-b1',
    category: 'cecr',
    labelFr: 'B1 atteint',
    labelEn: 'B1 Reached',
    descriptionFr: 'Maîtriser 400 cartes niveau B1',
    descriptionEn: 'Master 400 B1 cards',
    icon: '🅱️',
    target: 400,
    getCurrent: (i) =>
      (i.masteredByCecr?.['b1.1'] ?? 0) + (i.masteredByCecr?.['b1.2'] ?? 0)
  },
  {
    id: 'cecr-b2',
    category: 'cecr',
    labelFr: 'B2 atteint',
    labelEn: 'B2 Reached',
    descriptionFr: 'Maîtriser 600 cartes niveau B2',
    descriptionEn: 'Master 600 B2 cards',
    icon: '🅱️',
    target: 600,
    getCurrent: (i) =>
      (i.masteredByCecr?.['b2.1'] ?? 0) + (i.masteredByCecr?.['b2.2'] ?? 0)
  }
];

// ============================================================================
//  HOOK
// ============================================================================

export function useFlashcardBadges(input: UseFlashcardBadgesInput): Badge[] {
  return useMemo(() => {
    return BADGE_DEFS.map<Badge>((def) => {
      const current = Math.max(0, def.getCurrent(input));
      const target = def.target;
      const earned = current >= target;
      const progress = Math.min(1, target > 0 ? current / target : 0);
      return {
        id: def.id,
        category: def.category,
        labelFr: def.labelFr,
        labelEn: def.labelEn,
        descriptionFr: def.descriptionFr,
        descriptionEn: def.descriptionEn,
        icon: def.icon,
        earned,
        progress,
        current,
        target
      };
    }).sort((a, b) => {
      // Earned first, then by highest progress.
      if (a.earned !== b.earned) return a.earned ? -1 : 1;
      return b.progress - a.progress;
    });
  }, [input]);
}

/** Nombre de badges gagnés parmi tous les badges définis. */
export function countEarnedBadges(badges: Badge[]): number {
  return badges.filter((b) => b.earned).length;
}

/** Total de badges définis (utile pour afficher 4/14). */
export const TOTAL_BADGES = BADGE_DEFS.length;
