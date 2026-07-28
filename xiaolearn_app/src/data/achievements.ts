/**
 * achievements.ts — définitions des hauts-faits (cartes à collectionner)
 * ---------------------------------------------------------------------------
 * Chaque achievement est une carte mythologique chinoise avec un palier
 * (Commun / Rare / Épique / Légendaire), une condition de déblocage
 * (threshold + progressSource) et une récompense XP.
 *
 * L'évaluation est faite par `useAchievements` (src/hooks/useAchievements.ts)
 * à partir de métriques passées en paramètres (voir AchievementMetrics).
 * L'emblème est un hanzi calligraphique affiché en grand sur la carte —
 * aucune image bitmap.
 */

export type AchievementCategory =
  | 'reviews'   // cartes SRS révisées (cumulé)
  | 'lessons'   // leçons complétées
  | 'streak'    // jours d'étude consécutifs
  | 'writing'   // caractères tracés (skill écriture)
  | 'special';  // hauts-faits spéciaux

export type AchievementTier = 'common' | 'rare' | 'epic' | 'legendary';

/**
 * Source de la métrique évaluée. Chaque source correspond à un champ de
 * `AchievementMetrics` (useAchievements) :
 *  - cardsReviewed        → metrics.totalCardsReviewed
 *  - lessonsCompleted     → metrics.lessonsCompleted
 *  - streak               → max(metrics.currentStreak, metrics.bestStreak)
 *  - charsTraced          → metrics.charsTraced
 *  - bilansPassed         → metrics.bilansPassed
 *  - hasReview            → metrics.hasReview (booléen → 0/1)
 *  - xpLevel              → metrics.xpLevel
 *  - cecrLevelsCompleted  → metrics.cecrLevelsCompleted
 */
export type AchievementProgressSource =
  | 'cardsReviewed'
  | 'lessonsCompleted'
  | 'streak'
  | 'charsTraced'
  | 'bilansPassed'
  | 'hasReview'
  | 'xpLevel'
  | 'cecrLevelsCompleted';

export interface AchievementDef {
  id: string;
  category: AchievementCategory;
  tier: AchievementTier;
  /** Hanzi calligraphique affiché en grand sur la carte (ex : 龙). */
  emblem: string;
  nameFr: string;
  nameEn: string;
  descFr: string;
  descEn: string;
  /** XP bonus versé au déblocage (15/30/60/120 selon tier). */
  xpReward: number;
  /** Valeur de métrique à atteindre pour débloquer. */
  threshold: number;
  progressSource: AchievementProgressSource;
}

/** XP bonus standard par palier. */
export const TIER_XP: Record<AchievementTier, number> = {
  common: 15,
  rare: 30,
  epic: 60,
  legendary: 120
};

/** Ordre croissant des paliers (pour « meilleur palier »). */
export const TIER_ORDER: readonly AchievementTier[] = [
  'common',
  'rare',
  'epic',
  'legendary'
];

/** Ordre d'affichage des catégories sur la page. */
export const ACHIEVEMENT_CATEGORY_ORDER: readonly AchievementCategory[] = [
  'reviews',
  'lessons',
  'streak',
  'writing',
  'special'
];

export const ACHIEVEMENTS: AchievementDef[] = [
  // ==========================================================================
  //  RÉVISIONS — cartes SRS révisées (cumulé, toutes sessions confondues)
  // ==========================================================================
  {
    id: 'rev-10',
    category: 'reviews',
    tier: 'common',
    emblem: '锦鲤',
    nameFr: 'Carpe koï',
    nameEn: 'Koi carp',
    descFr: 'Révise 10 cartes — la carpe remonte le courant.',
    descEn: 'Review 10 cards — the koi swims upstream.',
    xpReward: TIER_XP.common,
    threshold: 10,
    progressSource: 'cardsReviewed'
  },
  {
    id: 'rev-100',
    category: 'reviews',
    tier: 'rare',
    emblem: '月兔',
    nameFr: 'Lapin de lune',
    nameEn: 'Moon rabbit',
    descFr: 'Révise 100 cartes — le lapin pile son élixir chaque nuit.',
    descEn: 'Review 100 cards — the rabbit pounds its elixir every night.',
    xpReward: TIER_XP.rare,
    threshold: 100,
    progressSource: 'cardsReviewed'
  },
  {
    id: 'rev-500',
    category: 'reviews',
    tier: 'epic',
    emblem: '白虎',
    nameFr: 'Tigre blanc',
    nameEn: 'White tiger',
    descFr: 'Révise 500 cartes — le gardien de l’Ouest veille sur ta mémoire.',
    descEn: 'Review 500 cards — the guardian of the West watches over your memory.',
    xpReward: TIER_XP.epic,
    threshold: 500,
    progressSource: 'cardsReviewed'
  },
  {
    id: 'rev-2000',
    category: 'reviews',
    tier: 'legendary',
    emblem: '龙',
    nameFr: 'Dragon',
    nameEn: 'Dragon',
    descFr: 'Révise 2000 cartes — la carpe a franchi la Porte du Dragon.',
    descEn: 'Review 2000 cards — the koi has passed the Dragon Gate.',
    xpReward: TIER_XP.legendary,
    threshold: 2000,
    progressSource: 'cardsReviewed'
  },

  // ==========================================================================
  //  LEÇONS — leçons complétées
  // ==========================================================================
  {
    id: 'les-1',
    category: 'lessons',
    tier: 'common',
    emblem: '哪吒',
    nameFr: 'Nezha',
    nameEn: 'Nezha',
    descFr: 'Complète ta première leçon — l’enfant prodige s’élance.',
    descEn: 'Complete your first lesson — the prodigy child takes off.',
    xpReward: TIER_XP.common,
    threshold: 1,
    progressSource: 'lessonsCompleted'
  },
  {
    id: 'les-10',
    category: 'lessons',
    tier: 'rare',
    emblem: '悟空',
    nameFr: 'Sun Wukong',
    nameEn: 'Sun Wukong',
    descFr: 'Complète 10 leçons — le Roi des Singes bondit de nuage en nuage.',
    descEn: 'Complete 10 lessons — the Monkey King leaps from cloud to cloud.',
    xpReward: TIER_XP.rare,
    threshold: 10,
    progressSource: 'lessonsCompleted'
  },
  {
    id: 'les-30',
    category: 'lessons',
    tier: 'epic',
    emblem: '凤凰',
    nameFr: 'Phénix',
    nameEn: 'Phoenix',
    descFr: 'Complète 30 leçons — le phénix renaît plus savant.',
    descEn: 'Complete 30 lessons — the phoenix is reborn wiser.',
    xpReward: TIER_XP.epic,
    threshold: 30,
    progressSource: 'lessonsCompleted'
  },
  {
    id: 'les-cecr',
    category: 'lessons',
    tier: 'legendary',
    emblem: '麒麟',
    nameFr: 'Qilin',
    nameEn: 'Qilin',
    descFr: 'Termine toutes les leçons d’un niveau CECR — le qilin n’apparaît qu’aux sages.',
    descEn: 'Finish every lesson of a CEFR level — the qilin appears only to the wise.',
    xpReward: TIER_XP.legendary,
    threshold: 1,
    progressSource: 'cecrLevelsCompleted'
  },

  // ==========================================================================
  //  SÉRIE — jours d'étude consécutifs (streak)
  // ==========================================================================
  {
    id: 'str-3',
    category: 'streak',
    tier: 'common',
    emblem: '貔貅',
    nameFr: 'Pixiu',
    nameEn: 'Pixiu',
    descFr: 'Étudie 3 jours d’affilée — le pixiu amasse sans jamais rendre.',
    descEn: 'Study 3 days in a row — the pixiu hoards and never gives back.',
    xpReward: TIER_XP.common,
    threshold: 3,
    progressSource: 'streak'
  },
  {
    id: 'str-7',
    category: 'streak',
    tier: 'rare',
    emblem: '嫦娥',
    nameFr: 'Chang’e',
    nameEn: 'Chang’e',
    descFr: 'Étudie 7 jours d’affilée — fidèle comme la déesse de la Lune.',
    descEn: 'Study 7 days in a row — steadfast as the Moon goddess.',
    xpReward: TIER_XP.rare,
    threshold: 7,
    progressSource: 'streak'
  },
  {
    id: 'str-30',
    category: 'streak',
    tier: 'epic',
    emblem: '玄武',
    nameFr: 'Tortue noire',
    nameEn: 'Black tortoise',
    descFr: 'Étudie 30 jours d’affilée — l’endurance du gardien du Nord.',
    descEn: 'Study 30 days in a row — the endurance of the guardian of the North.',
    xpReward: TIER_XP.epic,
    threshold: 30,
    progressSource: 'streak'
  },
  {
    id: 'str-100',
    category: 'streak',
    tier: 'legendary',
    emblem: '青龙',
    nameFr: 'Dragon azur',
    nameEn: 'Azure dragon',
    descFr: 'Étudie 100 jours d’affilée — le gardien de l’Est salue ta constance.',
    descEn: 'Study 100 days in a row — the guardian of the East salutes your constancy.',
    xpReward: TIER_XP.legendary,
    threshold: 100,
    progressSource: 'streak'
  },

  // ==========================================================================
  //  ÉCRITURE — caractères tracés (skill writing)
  // ==========================================================================
  {
    id: 'wri-10',
    category: 'writing',
    tier: 'common',
    emblem: '龙马',
    nameFr: 'Cheval-dragon',
    nameEn: 'Dragon horse',
    descFr: 'Trace 10 caractères — le cheval-dragon apporta les premiers signes.',
    descEn: 'Trace 10 characters — the dragon horse brought the first signs.',
    xpReward: TIER_XP.common,
    threshold: 10,
    progressSource: 'charsTraced'
  },
  {
    id: 'wri-50',
    category: 'writing',
    tier: 'rare',
    emblem: '神龟',
    nameFr: 'Tortue sacrée',
    nameEn: 'Sacred turtle',
    descFr: 'Trace 50 caractères — la tortue du Luo porte l’écrit sur sa carapace.',
    descEn: 'Trace 50 characters — the Luo turtle carries writing on its shell.',
    xpReward: TIER_XP.rare,
    threshold: 50,
    progressSource: 'charsTraced'
  },
  {
    id: 'wri-200',
    category: 'writing',
    tier: 'epic',
    emblem: '仓颉',
    nameFr: 'Cangjie',
    nameEn: 'Cangjie',
    descFr: 'Trace 200 caractères — l’inventeur des caractères aux quatre yeux t’observe.',
    descEn: 'Trace 200 characters — the four-eyed inventor of characters watches you.',
    xpReward: TIER_XP.epic,
    threshold: 200,
    progressSource: 'charsTraced'
  },

  // ==========================================================================
  //  SPÉCIAUX
  // ==========================================================================
  {
    id: 'spe-bilan-1',
    category: 'special',
    tier: 'rare',
    emblem: '朱雀',
    nameFr: 'Oiseau vermillon',
    nameEn: 'Vermilion bird',
    descFr: 'Réussis ton premier bilan de niveau — l’oiseau du Sud s’embrase.',
    descEn: 'Pass your first level assessment — the bird of the South ignites.',
    xpReward: TIER_XP.rare,
    threshold: 1,
    progressSource: 'bilansPassed'
  },
  {
    id: 'spe-bilan-5',
    category: 'special',
    tier: 'legendary',
    emblem: '女娲',
    nameFr: 'Nüwa',
    nameEn: 'Nüwa',
    descFr: 'Réussis 5 bilans de niveau — comme Nüwa, tu répares le ciel pierre à pierre.',
    descEn: 'Pass 5 level assessments — like Nüwa, you mend the sky stone by stone.',
    xpReward: TIER_XP.legendary,
    threshold: 5,
    progressSource: 'bilansPassed'
  },
  {
    id: 'spe-review',
    category: 'special',
    tier: 'common',
    emblem: '财神',
    nameFr: 'Dieu de la richesse',
    nameEn: 'God of wealth',
    descFr: 'Laisse ton premier avis — partager, c’est enrichir les autres.',
    descEn: 'Leave your first review — sharing makes everyone richer.',
    xpReward: TIER_XP.common,
    threshold: 1,
    progressSource: 'hasReview'
  },
  {
    id: 'spe-level-5',
    category: 'special',
    tier: 'rare',
    emblem: '钟馗',
    nameFr: 'Zhong Kui',
    nameEn: 'Zhong Kui',
    descFr: 'Atteins le niveau 5 — le chasseur de démons chasse tes lacunes.',
    descEn: 'Reach level 5 — the demon hunter hunts down your gaps.',
    xpReward: TIER_XP.rare,
    threshold: 5,
    progressSource: 'xpLevel'
  },
  {
    id: 'spe-level-10',
    category: 'special',
    tier: 'epic',
    emblem: '玉帝',
    nameFr: 'Empereur de Jade',
    nameEn: 'Jade Emperor',
    descFr: 'Atteins le niveau 10 — la cour céleste t’ouvre ses portes.',
    descEn: 'Reach level 10 — the celestial court opens its gates to you.',
    xpReward: TIER_XP.epic,
    threshold: 10,
    progressSource: 'xpLevel'
  },
  {
    id: 'spe-level-20',
    category: 'special',
    tier: 'legendary',
    emblem: '盘古',
    nameFr: 'Pangu',
    nameEn: 'Pangu',
    descFr: 'Atteins le niveau 20 — comme Pangu, tu as séparé le ciel et la terre.',
    descEn: 'Reach level 20 — like Pangu, you split heaven from earth.',
    xpReward: TIER_XP.legendary,
    threshold: 20,
    progressSource: 'xpLevel'
  }
];
