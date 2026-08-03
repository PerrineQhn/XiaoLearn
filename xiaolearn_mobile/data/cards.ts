/**
 * cards.ts — Catalogue des cartes mythologiques chinoises à collectionner
 *
 * Chaque carte se débloque via un « déclencheur » évalué sur les données
 * existantes de l'app (SRS, bilans, leçons, série, XP, mini-jeux, lectures).
 *
 * Ajouter une carte = ajouter une entrée ici + une illustration dans
 * assets/cards/<id>.png (facultatif : un rendu de repli s'affiche sinon).
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type CardCategory =
  | 'review'    // Révisions (SRS)
  | 'level'     // Bilans de fin de niveau
  | 'lesson'    // Leçons terminées
  | 'streak'    // Série quotidienne
  | 'special';  // Exploits variés (jeux, lectures, écriture…)

export type CardRarity = 'common' | 'rare' | 'epic' | 'legendary';

/** Types de conditions évaluables par le moteur de déblocage. */
export type CardTrigger =
  /** n sessions de révision terminées */
  | { kind: 'reviewSessions'; count: number }
  /** n mots atteignant le niveau « maîtrisé » (SRS ≥ 4) */
  | { kind: 'masteredWords'; count: number }
  /** n cartes révisées au total (cumul) */
  | { kind: 'reviewedCards'; count: number }
  /** n bilans de niveau réussis */
  | { kind: 'bilansPassed'; count: number }
  /** un bilan réussi avec un score parfait (10/10) */
  | { kind: 'bilanPerfect' }
  /** n leçons terminées */
  | { kind: 'lessonsCompleted'; count: number }
  /** tous les modules d'un niveau donné terminés */
  | { kind: 'levelCompleted'; level: string }
  /** série de n jours consécutifs */
  | { kind: 'streakDays'; count: number }
  /** n XP cumulés */
  | { kind: 'totalXp'; count: number }
  /** n parties de mini-jeux jouées (tous jeux confondus) */
  | { kind: 'gamesPlayed'; count: number }
  /** n lectures lues */
  | { kind: 'readingsRead'; count: number }
  /** n caractères tracés en mode écriture */
  | { kind: 'charactersWritten'; count: number }
  /** score de prononciation ≥ n % */
  | { kind: 'pronunciationScore'; score: number }
  /**
   * Palier d'avatar atteint (1 → 10).
   *
   * On vise le palier plutôt qu'un nombre de leçons en dur : si le cours
   * s'allonge, les seuils bougent et la carte reste calée sur le même moment
   * du parcours. Voir STAGE_GAPS dans data/avatarEvolution.ts.
   */
  | { kind: 'avatarStage'; stage: number };

export interface CollectibleCard {
  id: string;
  /** Nom de la créature en caractères chinois */
  hanzi: string;
  pinyin: string;
  /** Nom affiché */
  nameFr: string;
  nameEn: string;
  category: CardCategory;
  rarity: CardRarity;
  /** Emblème de repli tant qu'il n'y a pas d'illustration */
  emoji: string;
  /** Récit court affiché sur la carte débloquée */
  loreFr: string;
  loreEn: string;
  /** Description de la condition, montrée sur la carte verrouillée */
  requirementFr: string;
  requirementEn: string;
  trigger: CardTrigger;
  xpReward: number;
}

// ─── Métadonnées de rareté ────────────────────────────────────────────────────

export const RARITY_META: Record<
  CardRarity,
  { labelFr: string; labelEn: string; color: string; glow: string; gradient: [string, string] }
> = {
  common:    { labelFr: 'Commune',   labelEn: 'Common',    color: '#78909C', glow: '#B0BEC5', gradient: ['#8D9BA6', '#5C6B73'] },
  rare:      { labelFr: 'Rare',      labelEn: 'Rare',      color: '#2F9D8A', glow: '#5FD3BC', gradient: ['#3FBFA6', '#1E7A6A'] },
  epic:      { labelFr: 'Épique',    labelEn: 'Epic',      color: '#9C27B0', glow: '#CE93D8', gradient: ['#B65AC8', '#6A1B7A'] },
  legendary: { labelFr: 'Légendaire',labelEn: 'Legendary', color: '#F9A825', glow: '#FFD54F', gradient: ['#FFC947', '#E08A00'] },
};

export const CATEGORY_META: Record<
  CardCategory,
  { labelFr: string; labelEn: string; icon: string }
> = {
  review:  { labelFr: 'Révisions',   labelEn: 'Reviews',     icon: 'refresh-outline' },
  level:   { labelFr: 'Niveaux',     labelEn: 'Level tests', icon: 'trophy-outline' },
  lesson:  { labelFr: 'Leçons',      labelEn: 'Lessons',     icon: 'book-outline' },
  streak:  { labelFr: 'Série',       labelEn: 'Streak',      icon: 'flame-outline' },
  special: { labelFr: 'Spéciales',   labelEn: 'Special',     icon: 'sparkles-outline' },
};

// ─── Catalogue ────────────────────────────────────────────────────────────────

export const CARDS: CollectibleCard[] = [
  // ── RÉVISIONS ──────────────────────────────────────────────────────────────
  {
    id: 'review_first_session',
    hanzi: '狐狸', pinyin: 'húli',
    nameFr: 'Le Renard', nameEn: 'The Fox',
    category: 'review', rarity: 'common', emoji: '🦊',
    loreFr: "Le renard rusé salue ta toute première révision. Dans les contes, il observe longtemps avant d'agir — comme toi devant tes premières cartes.",
    loreEn: 'The cunning fox salutes your very first review. In the tales, he watches long before he acts — just as you did with your first cards.',
    requirementFr: 'Termine une session de révision.',
    requirementEn: 'Complete one review session.',
    trigger: { kind: 'reviewSessions', count: 1 }, xpReward: 15,
  },
  {
    id: 'review_ten_sessions',
    hanzi: '锦鲤', pinyin: 'jǐnlǐ',
    nameFr: 'La Carpe Koï', nameEn: 'The Koi Carp',
    category: 'review', rarity: 'rare', emoji: '🐟',
    loreFr: "La carpe remonte le fleuve Jaune sans relâche. Dix sessions de révision : la légende dit qu'au bout de la Porte du Dragon, elle se transforme.",
    loreEn: 'The carp swims relentlessly up the Yellow River. Ten review sessions: legend says that beyond the Dragon Gate, it transforms.',
    requirementFr: 'Termine 10 sessions de révision.',
    requirementEn: 'Complete 10 review sessions.',
    trigger: { kind: 'reviewSessions', count: 10 }, xpReward: 40,
  },
  {
    id: 'review_hundred_cards',
    hanzi: '白泽', pinyin: 'báizé',
    nameFr: 'Le Baize', nameEn: 'The Baize',
    category: 'review', rarity: 'epic', emoji: '📜',
    loreFr: "Le Baize connaît le nom des dix mille créatures. Cent cartes révisées : ton savoir commence à ressembler au sien.",
    loreEn: 'The Baize knows the names of ten thousand creatures. A hundred cards reviewed: your knowledge begins to resemble his.',
    requirementFr: 'Révise 100 cartes au total.',
    requirementEn: 'Review 100 cards in total.',
    trigger: { kind: 'reviewedCards', count: 100 }, xpReward: 60,
  },
  {
    id: 'review_fifty_mastered',
    hanzi: '玉兔', pinyin: 'yùtù',
    nameFr: 'Le Lièvre de Jade', nameEn: 'The Jade Rabbit',
    category: 'review', rarity: 'rare', emoji: '🐇',
    loreFr: "Sur la lune, le lièvre pile l'élixir d'immortalité, nuit après nuit. Cinquante mots maîtrisés — la patience est ton élixir.",
    loreEn: 'On the moon, the rabbit pounds the elixir of immortality, night after night. Fifty words mastered — patience is your elixir.',
    requirementFr: 'Maîtrise 50 mots (niveau SRS max).',
    requirementEn: 'Master 50 words (max SRS level).',
    trigger: { kind: 'masteredWords', count: 50 }, xpReward: 50,
  },
  {
    id: 'review_three_hundred_mastered',
    hanzi: '麒麟', pinyin: 'qílín',
    nameFr: 'Le Qilin', nameEn: 'The Qilin',
    category: 'review', rarity: 'legendary', emoji: '🦄',
    loreFr: "Le Qilin n'apparaît qu'aux temps de grande sagesse et ne foule jamais l'herbe. Trois cents mots maîtrisés : il t'a jugé digne.",
    loreEn: 'The Qilin appears only in ages of great wisdom and never treads on grass. Three hundred words mastered: it has deemed you worthy.',
    requirementFr: 'Maîtrise 300 mots.',
    requirementEn: 'Master 300 words.',
    trigger: { kind: 'masteredWords', count: 300 }, xpReward: 150,
  },

  // ── BILANS DE NIVEAU ───────────────────────────────────────────────────────
  {
    id: 'level_first_bilan',
    hanzi: '青龙', pinyin: 'qīnglóng',
    nameFr: 'Le Dragon d\'Azur', nameEn: 'The Azure Dragon',
    category: 'level', rarity: 'rare', emoji: '🐉',
    loreFr: "Gardien de l'Est et du printemps, le Dragon d'Azur salue ton premier niveau validé. L'Est est la direction des commencements.",
    loreEn: 'Guardian of the East and of spring, the Azure Dragon salutes your first level passed. The East is the direction of beginnings.',
    requirementFr: 'Réussis ton premier bilan de niveau.',
    requirementEn: 'Pass your first level test.',
    trigger: { kind: 'bilansPassed', count: 1 }, xpReward: 50,
  },
  {
    id: 'level_three_bilans',
    hanzi: '朱雀', pinyin: 'zhūquè',
    nameFr: 'L\'Oiseau Vermillon', nameEn: 'The Vermilion Bird',
    category: 'level', rarity: 'epic', emoji: '🔥',
    loreFr: "Gardien du Sud et de l'été, il renaît de sa propre ardeur. Trois niveaux validés : ta flamme ne faiblit pas.",
    loreEn: 'Guardian of the South and of summer, it is reborn from its own ardor. Three levels passed: your flame does not waver.',
    requirementFr: 'Réussis 3 bilans de niveau.',
    requirementEn: 'Pass 3 level tests.',
    trigger: { kind: 'bilansPassed', count: 3 }, xpReward: 80,
  },
  {
    id: 'level_perfect_bilan',
    hanzi: '白虎', pinyin: 'báihǔ',
    nameFr: 'Le Tigre Blanc', nameEn: 'The White Tiger',
    category: 'level', rarity: 'legendary', emoji: '🐯',
    loreFr: "Gardien de l'Ouest et de l'automne, il ne tolère aucune faiblesse. Un sans-faute : le Tigre Blanc t'a reconnu.",
    loreEn: 'Guardian of the West and of autumn, it tolerates no weakness. A flawless score: the White Tiger has recognized you.',
    requirementFr: 'Obtiens 10/10 à un bilan de niveau.',
    requirementEn: 'Score 10/10 on a level test.',
    trigger: { kind: 'bilanPerfect' }, xpReward: 120,
  },
  {
    id: 'level_six_bilans',
    hanzi: '玄武', pinyin: 'xuánwǔ',
    nameFr: 'La Tortue Noire', nameEn: 'The Black Tortoise',
    category: 'level', rarity: 'legendary', emoji: '🐢',
    loreFr: "Gardien du Nord et de l'hiver, tortue enlacée d'un serpent, symbole de longévité. Six niveaux : ta constance est légendaire.",
    loreEn: 'Guardian of the North and of winter, a tortoise entwined with a serpent, symbol of longevity. Six levels: your constancy is legendary.',
    requirementFr: 'Réussis 6 bilans de niveau.',
    requirementEn: 'Pass 6 level tests.',
    trigger: { kind: 'bilansPassed', count: 6 }, xpReward: 160,
  },

  // ── LEÇONS ─────────────────────────────────────────────────────────────────
  {
    id: 'lesson_first',
    hanzi: '书童', pinyin: 'shūtóng',
    nameFr: 'Le Jeune Lettré', nameEn: 'The Young Scholar',
    category: 'lesson', rarity: 'common', emoji: '📖',
    loreFr: "Dans chaque étude d'autrefois veillait un jeune assistant, broyant l'encre en silence. Ta première leçon est faite.",
    loreEn: 'In every study of old, a young assistant kept watch, grinding ink in silence. Your first lesson is done.',
    requirementFr: 'Termine ta première leçon.',
    requirementEn: 'Complete your first lesson.',
    trigger: { kind: 'lessonsCompleted', count: 1 }, xpReward: 15,
  },
  {
    id: 'lesson_ten',
    hanzi: '毛笔', pinyin: 'máobǐ',
    nameFr: 'L\'Esprit du Pinceau', nameEn: 'The Brush Spirit',
    category: 'lesson', rarity: 'common', emoji: '🖌️',
    loreFr: "Le pinceau use ses poils avant que la main n'apprenne. Dix leçons : le tien commence à s'assouplir.",
    loreEn: 'The brush wears down its bristles before the hand learns. Ten lessons: yours is starting to soften.',
    requirementFr: 'Termine 10 leçons.',
    requirementEn: 'Complete 10 lessons.',
    trigger: { kind: 'lessonsCompleted', count: 10 }, xpReward: 35,
  },
  {
    id: 'lesson_fifty',
    hanzi: '仓颉', pinyin: 'cāngjié',
    nameFr: 'Cangjie', nameEn: 'Cangjie',
    category: 'lesson', rarity: 'epic', emoji: '👁️',
    loreFr: "Cangjie inventa l'écriture en observant les traces d'oiseaux ; le ciel fit pleuvoir du millet et les esprits pleurèrent. Cinquante leçons.",
    loreEn: 'Cangjie invented writing by observing bird tracks; the sky rained millet and the spirits wept. Fifty lessons.',
    requirementFr: 'Termine 50 leçons.',
    requirementEn: 'Complete 50 lessons.',
    trigger: { kind: 'lessonsCompleted', count: 50 }, xpReward: 100,
  },
  {
    id: 'lesson_a1_complete',
    hanzi: '孙悟空', pinyin: 'sūn wùkōng',
    nameFr: 'Le Roi des Singes', nameEn: 'The Monkey King',
    category: 'lesson', rarity: 'legendary', emoji: '🐒',
    loreFr: "Sun Wukong dut franchir quatre-vingt-une épreuves avant d'atteindre l'Ouest. Tu viens d'achever ton premier voyage complet.",
    loreEn: 'Sun Wukong had to face eighty-one trials before reaching the West. You have just completed your first full journey.',
    requirementFr: 'Termine toutes les leçons du niveau A1.',
    requirementEn: 'Complete every lesson in level A1.',
    trigger: { kind: 'levelCompleted', level: 'cecr-a1' }, xpReward: 200,
  },

  // ── SÉRIE ──────────────────────────────────────────────────────────────────
  {
    id: 'streak_three',
    hanzi: '灯笼', pinyin: 'dēnglóng',
    nameFr: 'La Lanterne', nameEn: 'The Lantern',
    category: 'streak', rarity: 'common', emoji: '🏮',
    loreFr: "Trois soirs de suite, ta lanterne est restée allumée. C'est ainsi que commencent les longues traversées.",
    loreEn: 'Three evenings in a row, your lantern stayed lit. This is how long crossings begin.',
    requirementFr: 'Atteins une série de 3 jours.',
    requirementEn: 'Reach a 3-day streak.',
    trigger: { kind: 'streakDays', count: 3 }, xpReward: 20,
  },
  {
    id: 'streak_seven',
    hanzi: '年兽', pinyin: 'niánshòu',
    nameFr: 'La Bête Nian', nameEn: 'The Nian Beast',
    category: 'streak', rarity: 'rare', emoji: '🧧',
    loreFr: "La bête Nian revenait chaque année ; on la chassait au rouge et au vacarme. Sept jours d'affilée — tu as tenu la porte.",
    loreEn: 'The Nian beast returned each year; it was driven off with red and clamor. Seven days straight — you held the gate.',
    requirementFr: 'Atteins une série de 7 jours.',
    requirementEn: 'Reach a 7-day streak.',
    trigger: { kind: 'streakDays', count: 7 }, xpReward: 45,
  },
  {
    id: 'streak_thirty',
    hanzi: '凤凰', pinyin: 'fènghuáng',
    nameFr: 'Le Phénix', nameEn: 'The Phoenix',
    category: 'streak', rarity: 'epic', emoji: '🦅',
    loreFr: "Le Fenghuang n'apparaît que dans les règnes paisibles et ne se pose que sur le paulownia. Trente jours sans faillir.",
    loreEn: 'The Fenghuang appears only in peaceful reigns and alights only on the paulownia tree. Thirty days without faltering.',
    requirementFr: 'Atteins une série de 30 jours.',
    requirementEn: 'Reach a 30-day streak.',
    trigger: { kind: 'streakDays', count: 30 }, xpReward: 120,
  },
  {
    id: 'streak_hundred',
    hanzi: '九尾狐', pinyin: 'jiǔwěihú',
    nameFr: 'Le Renard à Neuf Queues', nameEn: 'The Nine-Tailed Fox',
    category: 'streak', rarity: 'legendary', emoji: '🦊',
    loreFr: "Il faut mille ans au renard pour gagner ses neuf queues. Cent jours consécutifs : la tienne, la neuvième, vient de pousser.",
    loreEn: 'It takes the fox a thousand years to earn its nine tails. A hundred consecutive days: your ninth has just grown in.',
    requirementFr: 'Atteins une série de 100 jours.',
    requirementEn: 'Reach a 100-day streak.',
    trigger: { kind: 'streakDays', count: 100 }, xpReward: 300,
  },

  // ── SPÉCIALES ──────────────────────────────────────────────────────────────
  {
    id: 'special_xp_1000',
    hanzi: '貔貅', pinyin: 'píxiū',
    nameFr: 'Le Pixiu', nameEn: 'The Pixiu',
    category: 'special', rarity: 'rare', emoji: '💰',
    loreFr: "Le Pixiu avale les trésors et ne les rend jamais — il n'a pas d'anus, dit la légende. Mille XP amassés et rien de perdu.",
    loreEn: 'The Pixiu swallows treasure and never gives it back — it has no anus, so the legend goes. A thousand XP hoarded, nothing lost.',
    requirementFr: 'Cumule 1 000 XP.',
    requirementEn: 'Accumulate 1,000 XP.',
    trigger: { kind: 'totalXp', count: 1000 }, xpReward: 50,
  },
  {
    id: 'special_xp_10000',
    hanzi: '龙', pinyin: 'lóng',
    nameFr: 'Le Dragon', nameEn: 'The Dragon',
    category: 'special', rarity: 'legendary', emoji: '🐲',
    loreFr: "Le dragon chinois ne crache pas le feu : il commande la pluie et les fleuves. Dix mille XP — tu tiens désormais la perle.",
    loreEn: 'The Chinese dragon breathes no fire: it commands the rain and the rivers. Ten thousand XP — you now hold the pearl.',
    requirementFr: 'Cumule 10 000 XP.',
    requirementEn: 'Accumulate 10,000 XP.',
    trigger: { kind: 'totalXp', count: 10000 }, xpReward: 250,
  },
  {
    id: 'special_games',
    hanzi: '哪吒', pinyin: 'nézhā',
    nameFr: 'Nezha', nameEn: 'Nezha',
    category: 'special', rarity: 'rare', emoji: '🎡',
    loreFr: "Enfant turbulent monté sur ses Roues de Vent et de Feu, Nezha joue autant qu'il combat. Vingt parties disputées.",
    loreEn: 'A rowdy child riding his Wind-Fire Wheels, Nezha plays as much as he fights. Twenty games played.',
    requirementFr: 'Joue 20 parties de mini-jeux.',
    requirementEn: 'Play 20 mini-game rounds.',
    trigger: { kind: 'gamesPlayed', count: 20 }, xpReward: 45,
  },
  {
    id: 'special_readings',
    hanzi: '嫦娥', pinyin: 'cháng\'é',
    nameFr: 'Chang\'e', nameEn: 'Chang\'e',
    category: 'special', rarity: 'epic', emoji: '🌕',
    loreFr: "Chang'e but l'élixir et s'envola vers la lune, où elle lit depuis lors. Dix textes achevés dans son silence.",
    loreEn: "Chang'e drank the elixir and flew to the moon, where she has read ever since. Ten texts finished in her silence.",
    requirementFr: 'Lis 10 textes de lecture.',
    requirementEn: 'Read 10 reading passages.',
    trigger: { kind: 'readingsRead', count: 10 }, xpReward: 70,
  },
  {
    id: 'special_pronunciation',
    hanzi: '雷公', pinyin: 'léigōng',
    nameFr: 'Le Duc du Tonnerre', nameEn: 'The Duke of Thunder',
    category: 'special', rarity: 'epic', emoji: '⚡',
    loreFr: "Leigong frappe son tambour pour faire gronder le ciel. Ta voix a porté assez juste pour lui répondre.",
    loreEn: 'Leigong strikes his drum to make the sky roll. Your voice carried true enough to answer him.',
    requirementFr: 'Obtiens 90 % ou plus à la prononciation.',
    requirementEn: 'Score 90% or more on pronunciation.',
    trigger: { kind: 'pronunciationScore', score: 90 }, xpReward: 80,
  },

  // ── PALIERS D'AVATAR ───────────────────────────────────────────────────────
  // Deux cartes seulement, aux deux moments que rien d'autre ne célèbre : la
  // moitié du chemin, et le bout. Une carte par palier aurait fait doublon avec
  // les tenues, qui récompensent déjà exactement les mêmes leçons.
  {
    id: 'avatar_halfway',
    hanzi: '龙门', pinyin: 'lóngmén',
    nameFr: 'La Porte du Dragon', nameEn: 'The Dragon Gate',
    category: 'lesson', rarity: 'epic', emoji: '⛩️',
    loreFr: "En amont du fleuve Jaune se dresse une porte de pierre. La carpe qui la franchit devient dragon — mais aucune ne la franchit du premier bond. Tu viens d'atteindre la porte.",
    loreEn: 'Upstream on the Yellow River stands a gate of stone. The carp that clears it becomes a dragon — but none clears it on the first leap. You have reached the gate.',
    requirementFr: 'Atteins le palier 6 avec ton personnage.',
    requirementEn: 'Reach stage 6 with your character.',
    trigger: { kind: 'avatarStage', stage: 6 }, xpReward: 120,
  },
  {
    id: 'avatar_shifu',
    hanzi: '文昌帝君', pinyin: 'wénchāng dìjūn',
    nameFr: 'Wenchang, dieu des Lettres', nameEn: 'Wenchang, God of Letters',
    category: 'lesson', rarity: 'legendary', emoji: '🖋️',
    loreFr: "On lui brûlait de l'encens avant les examens impériaux, et jamais on ne jetait un papier écrit : les caractères lui appartiennent. Tu as parcouru le chemin entier — il te reconnaît comme 师父.",
    loreEn: 'Incense was burned to him before the imperial exams, and no written paper was ever thrown away: the characters belong to him. You have walked the whole road — he names you 师父.',
    // Pas de nombre en dur : le parcours est passé de 355 à 402 leçons et le
    // texte, lui, était resté. Les paliers se calculent déjà sur ALL_LESSONS.
    requirementFr: 'Atteins le rang de Shīfu : termine toutes les leçons.',
    requirementEn: 'Reach the rank of Shīfu: complete every lesson.',
    trigger: { kind: 'avatarStage', stage: 10 }, xpReward: 500,
  },
];

// ─── Index utilitaires ────────────────────────────────────────────────────────

export const CARDS_BY_ID: Record<string, CollectibleCard> = Object.fromEntries(
  CARDS.map(c => [c.id, c])
);

export function getCard(id: string): CollectibleCard | undefined {
  return CARDS_BY_ID[id];
}

export const CARD_CATEGORIES: CardCategory[] = ['review', 'level', 'lesson', 'streak', 'special'];
