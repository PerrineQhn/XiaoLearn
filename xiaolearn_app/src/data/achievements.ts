/**
 * achievements.ts — définitions des hauts-faits (cartes à collectionner)
 * ---------------------------------------------------------------------------
 * ALIGNÉ SUR LE MOBILE (xiaolearn_mobile/data/cards.ts) : les 22 mêmes cartes
 * mythologiques, mêmes ids, mêmes raretés, mêmes seuils, mêmes XP.
 * Chaque carte pointe son illustration bitmap (public/img/cards/<id>.jpg,
 * 900×1342, copiées depuis les assets mobiles).
 *
 * L'évaluation est faite par `useAchievements` (src/hooks/useAchievements.ts)
 * à partir de métriques passées en paramètres (voir AchievementMetrics).
 */

export type AchievementCategory =
  | 'reviews'   // révisions SRS (sessions, cartes, mots maîtrisés)
  | 'levels'    // bilans de fin de niveau CECR
  | 'lessons'   // leçons complétées
  | 'streak'    // jours d'étude consécutifs
  | 'special';  // exploits variés (XP, jeux, lectures, prononciation)

export type AchievementTier = 'common' | 'rare' | 'epic' | 'legendary';

/**
 * Source de la métrique évaluée. Chaque source correspond à un champ de
 * `AchievementMetrics` (useAchievements) :
 *  - reviewSessions       → metrics.reviewSessions
 *  - cardsReviewed        → metrics.totalCardsReviewed
 *  - masteredWords        → metrics.masteredWords
 *  - lessonsCompleted     → metrics.lessonsCompleted
 *  - cecrLevelsCompleted  → metrics.cecrLevelsCompleted
 *  - streak               → max(metrics.currentStreak, metrics.bestStreak)
 *  - bilansPassed         → metrics.bilansPassed
 *  - perfectBilans        → metrics.perfectBilans
 *  - totalXp              → metrics.totalXp
 *  - gamesPlayed          → metrics.gamesPlayed
 *  - readingsRead         → metrics.readingsRead
 *  - pronunciationBest    → metrics.pronunciationBest (meilleur score %)
 */
export type AchievementProgressSource =
  | 'reviewSessions'
  | 'cardsReviewed'
  | 'masteredWords'
  | 'lessonsCompleted'
  | 'cecrLevelsCompleted'
  | 'streak'
  | 'bilansPassed'
  | 'perfectBilans'
  | 'totalXp'
  | 'gamesPlayed'
  | 'readingsRead'
  | 'pronunciationBest';

export interface AchievementDef {
  id: string;
  category: AchievementCategory;
  tier: AchievementTier;
  /** Nom de la créature en hanzi (recherche + petit sceau sur la carte). */
  emblem: string;
  /** Illustration bitmap (public/img/cards/<id>.jpg — assets mobiles). */
  image: string;
  nameFr: string;
  nameEn: string;
  /** Condition de déblocage — affichée sur la carte verrouillée. */
  descFr: string;
  descEn: string;
  /** Récit court — affiché sur la carte débloquée. */
  loreFr: string;
  loreEn: string;
  /** XP bonus versé au déblocage (valeurs mobiles). */
  xpReward: number;
  /** Valeur de métrique à atteindre pour débloquer. */
  threshold: number;
  progressSource: AchievementProgressSource;
}

/** XP bonus indicatif par palier (les cartes portent leur valeur exacte). */
export const TIER_XP: Record<AchievementTier, number> = {
  common: 15,
  rare: 40,
  epic: 70,
  legendary: 150
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
  'levels',
  'lessons',
  'streak',
  'special'
];

export const ACHIEVEMENTS: AchievementDef[] = [
  // ==========================================================================
  //  RÉVISIONS — sessions SRS, cartes révisées, mots maîtrisés
  // ==========================================================================
  {
    id: 'review_first_session',
    category: 'reviews',
    tier: 'common',
    emblem: '狐狸',
    image: '/img/cards/review_first_session.jpg',
    nameFr: 'Le Renard',
    nameEn: 'The Fox',
    descFr: 'Termine une session de révision.',
    descEn: 'Complete one review session.',
    loreFr:
      'Le renard rusé salue ta toute première révision. Dans les contes, il observe longtemps avant d’agir — comme toi devant tes premières cartes.',
    loreEn:
      'The cunning fox salutes your very first review. In the tales, he watches long before he acts — just as you did with your first cards.',
    xpReward: 15,
    threshold: 1,
    progressSource: 'reviewSessions'
  },
  {
    id: 'review_ten_sessions',
    category: 'reviews',
    tier: 'rare',
    emblem: '锦鲤',
    image: '/img/cards/review_ten_sessions.jpg',
    nameFr: 'La Carpe Koï',
    nameEn: 'The Koi Carp',
    descFr: 'Termine 10 sessions de révision.',
    descEn: 'Complete 10 review sessions.',
    loreFr:
      'La carpe remonte le fleuve Jaune sans relâche. Dix sessions de révision : la légende dit qu’au bout de la Porte du Dragon, elle se transforme.',
    loreEn:
      'The carp swims relentlessly up the Yellow River. Ten review sessions: legend says that beyond the Dragon Gate, it transforms.',
    xpReward: 40,
    threshold: 10,
    progressSource: 'reviewSessions'
  },
  {
    id: 'review_hundred_cards',
    category: 'reviews',
    tier: 'epic',
    emblem: '白泽',
    image: '/img/cards/review_hundred_cards.jpg',
    nameFr: 'Le Baize',
    nameEn: 'The Baize',
    descFr: 'Révise 100 cartes au total.',
    descEn: 'Review 100 cards in total.',
    loreFr:
      'Le Baize connaît le nom des dix mille créatures. Cent cartes révisées : ton savoir commence à ressembler au sien.',
    loreEn:
      'The Baize knows the names of ten thousand creatures. A hundred cards reviewed: your knowledge begins to resemble his.',
    xpReward: 60,
    threshold: 100,
    progressSource: 'cardsReviewed'
  },
  {
    id: 'review_fifty_mastered',
    category: 'reviews',
    tier: 'rare',
    emblem: '玉兔',
    image: '/img/cards/review_fifty_mastered.jpg',
    nameFr: 'Le Lièvre de Jade',
    nameEn: 'The Jade Rabbit',
    descFr: 'Maîtrise 50 mots (niveau SRS max).',
    descEn: 'Master 50 words (max SRS level).',
    loreFr:
      'Sur la lune, le lièvre pile l’élixir d’immortalité, nuit après nuit. Cinquante mots maîtrisés — la patience est ton élixir.',
    loreEn:
      'On the moon, the rabbit pounds the elixir of immortality, night after night. Fifty words mastered — patience is your elixir.',
    xpReward: 50,
    threshold: 50,
    progressSource: 'masteredWords'
  },
  {
    id: 'review_three_hundred_mastered',
    category: 'reviews',
    tier: 'legendary',
    emblem: '麒麟',
    image: '/img/cards/review_three_hundred_mastered.jpg',
    nameFr: 'Le Qilin',
    nameEn: 'The Qilin',
    descFr: 'Maîtrise 300 mots.',
    descEn: 'Master 300 words.',
    loreFr:
      'Le Qilin n’apparaît qu’aux temps de grande sagesse et ne foule jamais l’herbe. Trois cents mots maîtrisés : il t’a jugé digne.',
    loreEn:
      'The Qilin appears only in ages of great wisdom and never treads on grass. Three hundred words mastered: it has deemed you worthy.',
    xpReward: 150,
    threshold: 300,
    progressSource: 'masteredWords'
  },

  // ==========================================================================
  //  BILANS DE NIVEAU
  // ==========================================================================
  {
    id: 'level_first_bilan',
    category: 'levels',
    tier: 'rare',
    emblem: '青龙',
    image: '/img/cards/level_first_bilan.jpg',
    nameFr: 'Le Dragon d’Azur',
    nameEn: 'The Azure Dragon',
    descFr: 'Réussis ton premier bilan de niveau.',
    descEn: 'Pass your first level test.',
    loreFr:
      'Gardien de l’Est et du printemps, le Dragon d’Azur salue ton premier niveau validé. L’Est est la direction des commencements.',
    loreEn:
      'Guardian of the East and of spring, the Azure Dragon salutes your first level passed. The East is the direction of beginnings.',
    xpReward: 50,
    threshold: 1,
    progressSource: 'bilansPassed'
  },
  {
    id: 'level_three_bilans',
    category: 'levels',
    tier: 'epic',
    emblem: '朱雀',
    image: '/img/cards/level_three_bilans.jpg',
    nameFr: 'L’Oiseau Vermillon',
    nameEn: 'The Vermilion Bird',
    descFr: 'Réussis 3 bilans de niveau.',
    descEn: 'Pass 3 level tests.',
    loreFr:
      'Gardien du Sud et de l’été, il renaît de sa propre ardeur. Trois niveaux validés : ta flamme ne faiblit pas.',
    loreEn:
      'Guardian of the South and of summer, it is reborn from its own ardor. Three levels passed: your flame does not waver.',
    xpReward: 80,
    threshold: 3,
    progressSource: 'bilansPassed'
  },
  {
    id: 'level_perfect_bilan',
    category: 'levels',
    tier: 'legendary',
    emblem: '白虎',
    image: '/img/cards/level_perfect_bilan.jpg',
    nameFr: 'Le Tigre Blanc',
    nameEn: 'The White Tiger',
    descFr: 'Obtiens un score parfait à un bilan de niveau.',
    descEn: 'Get a perfect score on a level test.',
    loreFr:
      'Gardien de l’Ouest et de l’automne, il ne tolère aucune faiblesse. Un sans-faute : le Tigre Blanc t’a reconnu.',
    loreEn:
      'Guardian of the West and of autumn, it tolerates no weakness. A flawless score: the White Tiger has recognized you.',
    xpReward: 120,
    threshold: 1,
    // TODO(metrics) : perfectBilans n'est pas encore câblé côté web
    // (BilanCompletionEntry ne stocke pas totalQuestions) — progression 0,
    // la carte reste « À débloquer » en attendant.
    progressSource: 'perfectBilans'
  },
  {
    id: 'level_six_bilans',
    category: 'levels',
    tier: 'legendary',
    emblem: '玄武',
    image: '/img/cards/level_six_bilans.jpg',
    nameFr: 'La Tortue Noire',
    nameEn: 'The Black Tortoise',
    descFr: 'Réussis 6 bilans de niveau.',
    descEn: 'Pass 6 level tests.',
    loreFr:
      'Gardien du Nord et de l’hiver, tortue enlacée d’un serpent, symbole de longévité. Six niveaux : ta constance est légendaire.',
    loreEn:
      'Guardian of the North and of winter, a tortoise entwined with a serpent, symbol of longevity. Six levels: your constancy is legendary.',
    xpReward: 160,
    threshold: 6,
    progressSource: 'bilansPassed'
  },

  // ==========================================================================
  //  LEÇONS
  // ==========================================================================
  {
    id: 'lesson_first',
    category: 'lessons',
    tier: 'common',
    emblem: '书童',
    image: '/img/cards/lesson_first.jpg',
    nameFr: 'Le Jeune Lettré',
    nameEn: 'The Young Scholar',
    descFr: 'Termine ta première leçon.',
    descEn: 'Complete your first lesson.',
    loreFr:
      'Dans chaque étude d’autrefois veillait un jeune assistant, broyant l’encre en silence. Ta première leçon est faite.',
    loreEn:
      'In every study of old, a young assistant kept watch, grinding ink in silence. Your first lesson is done.',
    xpReward: 15,
    threshold: 1,
    progressSource: 'lessonsCompleted'
  },
  {
    id: 'lesson_ten',
    category: 'lessons',
    tier: 'common',
    emblem: '毛笔',
    image: '/img/cards/lesson_ten.jpg',
    nameFr: 'L’Esprit du Pinceau',
    nameEn: 'The Brush Spirit',
    descFr: 'Termine 10 leçons.',
    descEn: 'Complete 10 lessons.',
    loreFr:
      'Le pinceau use ses poils avant que la main n’apprenne. Dix leçons : le tien commence à s’assouplir.',
    loreEn:
      'The brush wears down its bristles before the hand learns. Ten lessons: yours is starting to soften.',
    xpReward: 35,
    threshold: 10,
    progressSource: 'lessonsCompleted'
  },
  {
    id: 'lesson_fifty',
    category: 'lessons',
    tier: 'epic',
    emblem: '仓颉',
    image: '/img/cards/lesson_fifty.jpg',
    nameFr: 'Cangjie',
    nameEn: 'Cangjie',
    descFr: 'Termine 50 leçons.',
    descEn: 'Complete 50 lessons.',
    loreFr:
      'Cangjie inventa l’écriture en observant les traces d’oiseaux ; le ciel fit pleuvoir du millet et les esprits pleurèrent. Cinquante leçons.',
    loreEn:
      'Cangjie invented writing by observing bird tracks; the sky rained millet and the spirits wept. Fifty lessons.',
    xpReward: 100,
    threshold: 50,
    progressSource: 'lessonsCompleted'
  },
  {
    id: 'lesson_a1_complete',
    category: 'lessons',
    tier: 'legendary',
    emblem: '孙悟空',
    image: '/img/cards/lesson_a1_complete.jpg',
    nameFr: 'Le Roi des Singes',
    nameEn: 'The Monkey King',
    descFr: 'Termine toutes les leçons d’un niveau CECR.',
    descEn: 'Complete every lesson of a CEFR level.',
    loreFr:
      'Sun Wukong dut franchir quatre-vingt-une épreuves avant d’atteindre l’Ouest. Tu viens d’achever ton premier voyage complet.',
    loreEn:
      'Sun Wukong had to face eighty-one trials before reaching the West. You have just completed your first full journey.',
    xpReward: 200,
    threshold: 1,
    progressSource: 'cecrLevelsCompleted'
  },

  // ==========================================================================
  //  SÉRIE
  // ==========================================================================
  {
    id: 'streak_three',
    category: 'streak',
    tier: 'common',
    emblem: '灯笼',
    image: '/img/cards/streak_three.jpg',
    nameFr: 'La Lanterne',
    nameEn: 'The Lantern',
    descFr: 'Atteins une série de 3 jours.',
    descEn: 'Reach a 3-day streak.',
    loreFr:
      'Trois soirs de suite, ta lanterne est restée allumée. C’est ainsi que commencent les longues traversées.',
    loreEn:
      'Three evenings in a row, your lantern stayed lit. This is how long crossings begin.',
    xpReward: 20,
    threshold: 3,
    progressSource: 'streak'
  },
  {
    id: 'streak_seven',
    category: 'streak',
    tier: 'rare',
    emblem: '年兽',
    image: '/img/cards/streak_seven.jpg',
    nameFr: 'La Bête Nian',
    nameEn: 'The Nian Beast',
    descFr: 'Atteins une série de 7 jours.',
    descEn: 'Reach a 7-day streak.',
    loreFr:
      'La bête Nian revenait chaque année ; on la chassait au rouge et au vacarme. Sept jours d’affilée — tu as tenu la porte.',
    loreEn:
      'The Nian beast returned each year; it was driven off with red and clamor. Seven days straight — you held the gate.',
    xpReward: 45,
    threshold: 7,
    progressSource: 'streak'
  },
  {
    id: 'streak_thirty',
    category: 'streak',
    tier: 'epic',
    emblem: '凤凰',
    image: '/img/cards/streak_thirty.jpg',
    nameFr: 'Le Phénix',
    nameEn: 'The Phoenix',
    descFr: 'Atteins une série de 30 jours.',
    descEn: 'Reach a 30-day streak.',
    loreFr:
      'Le Fenghuang n’apparaît que dans les règnes paisibles et ne se pose que sur le paulownia. Trente jours sans faillir.',
    loreEn:
      'The Fenghuang appears only in peaceful reigns and alights only on the paulownia tree. Thirty days without faltering.',
    xpReward: 120,
    threshold: 30,
    progressSource: 'streak'
  },
  {
    id: 'streak_hundred',
    category: 'streak',
    tier: 'legendary',
    emblem: '九尾狐',
    image: '/img/cards/streak_hundred.jpg',
    nameFr: 'Le Renard à Neuf Queues',
    nameEn: 'The Nine-Tailed Fox',
    descFr: 'Atteins une série de 100 jours.',
    descEn: 'Reach a 100-day streak.',
    loreFr:
      'Il faut mille ans au renard pour gagner ses neuf queues. Cent jours consécutifs : la tienne, la neuvième, vient de pousser.',
    loreEn:
      'It takes the fox a thousand years to earn its nine tails. A hundred consecutive days: your ninth has just grown in.',
    xpReward: 300,
    threshold: 100,
    progressSource: 'streak'
  },

  // ==========================================================================
  //  SPÉCIALES
  // ==========================================================================
  {
    id: 'special_xp_1000',
    category: 'special',
    tier: 'rare',
    emblem: '貔貅',
    image: '/img/cards/special_xp_1000.jpg',
    nameFr: 'Le Pixiu',
    nameEn: 'The Pixiu',
    descFr: 'Cumule 1 000 XP.',
    descEn: 'Accumulate 1,000 XP.',
    loreFr:
      'Le Pixiu avale les trésors et ne les rend jamais — il n’a pas d’anus, dit la légende. Mille XP amassés et rien de perdu.',
    loreEn:
      'The Pixiu swallows treasure and never gives it back — it has no anus, so the legend goes. A thousand XP hoarded, nothing lost.',
    xpReward: 50,
    threshold: 1000,
    progressSource: 'totalXp'
  },
  {
    id: 'special_xp_10000',
    category: 'special',
    tier: 'legendary',
    emblem: '龙',
    image: '/img/cards/special_xp_10000.jpg',
    nameFr: 'Le Dragon',
    nameEn: 'The Dragon',
    descFr: 'Cumule 10 000 XP.',
    descEn: 'Accumulate 10,000 XP.',
    loreFr:
      'Le dragon chinois ne crache pas le feu : il commande la pluie et les fleuves. Dix mille XP — tu tiens désormais la perle.',
    loreEn:
      'The Chinese dragon breathes no fire: it commands the rain and the rivers. Ten thousand XP — you now hold the pearl.',
    xpReward: 250,
    threshold: 10000,
    progressSource: 'totalXp'
  },
  {
    id: 'special_games',
    category: 'special',
    tier: 'rare',
    emblem: '哪吒',
    image: '/img/cards/special_games.jpg',
    nameFr: 'Nezha',
    nameEn: 'Nezha',
    descFr: 'Joue 20 parties de mini-jeux.',
    descEn: 'Play 20 mini-game rounds.',
    loreFr:
      'Enfant turbulent monté sur ses Roues de Vent et de Feu, Nezha joue autant qu’il combat. Vingt parties disputées.',
    loreEn:
      'A rowdy child riding his Wind-Fire Wheels, Nezha plays as much as he fights. Twenty games played.',
    xpReward: 45,
    threshold: 20,
    // TODO(metrics) : gamesPlayed n'est pas encore compté côté web —
    // progression 0, la carte reste « À débloquer » en attendant.
    progressSource: 'gamesPlayed'
  },
  {
    id: 'special_readings',
    category: 'special',
    tier: 'epic',
    emblem: '嫦娥',
    image: '/img/cards/special_readings.jpg',
    nameFr: 'Chang’e',
    nameEn: 'Chang’e',
    descFr: 'Lis 10 textes de lecture.',
    descEn: 'Read 10 reading passages.',
    loreFr:
      'Chang’e but l’élixir et s’envola vers la lune, où elle lit depuis lors. Dix textes achevés dans son silence.',
    loreEn:
      'Chang’e drank the elixir and flew to the moon, where she has read ever since. Ten texts finished in her silence.',
    xpReward: 70,
    threshold: 10,
    // TODO(metrics) : readingsRead n'est pas encore compté côté web —
    // progression 0, la carte reste « À débloquer » en attendant.
    progressSource: 'readingsRead'
  },
  {
    id: 'special_pronunciation',
    category: 'special',
    tier: 'epic',
    emblem: '雷公',
    image: '/img/cards/special_pronunciation.jpg',
    nameFr: 'Le Duc du Tonnerre',
    nameEn: 'The Duke of Thunder',
    descFr: 'Obtiens 90 % ou plus à la prononciation.',
    descEn: 'Score 90% or more on pronunciation.',
    loreFr:
      'Leigong frappe son tambour pour faire gronder le ciel. Ta voix a porté assez juste pour lui répondre.',
    loreEn:
      'Leigong strikes his drum to make the sky roll. Your voice carried true enough to answer him.',
    xpReward: 80,
    threshold: 90,
    // TODO(metrics) : pronunciationBest n'est pas encore câblé côté web —
    // progression 0, la carte reste « À débloquer » en attendant.
    progressSource: 'pronunciationBest'
  }
];
