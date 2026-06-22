/**
 * cecr-a1-extra-learn-sections.ts — contenu pédagogique manuel pour les leçons
 * CECR A1 qui n'ont pas de correspondance directe avec le parcours pinyin ou
 * first-steps. Ces sections complètent celles définies dans :
 *   - pinyin-learn-sections.ts
 *   - first-steps-learn-sections.ts
 *
 * Règle produit : tous les `audio` pointent vers un MP3/WAV HSK1 pré-généré.
 * Les chemins ont été vérifiés à l'écriture.
 */

import type { LessonV2LearnSection } from '../types/lesson-learn';

// ---------------------------------------------------------------------------
// cecr-a1-pinyin-m2 — Initiales b p m f d t n l (8 consonnes faciles)
// ---------------------------------------------------------------------------

export const pinyinInitials1LearnSections: LessonV2LearnSection[] = [
  {
    id: 'p-init1-aspiration',
    title: 'La règle de l\'aspiration',
    titleEn: 'The aspiration rule',
    body:
      'En français, b et p se distinguent par la vibration des cordes vocales. En mandarin, la distinction est **ailleurs** — c\'est le **souffle** qui change.\n' +
      '\n' +
      'Règle d\'or :\n' +
      '- **b** (non aspiré) = sans souffle\n' +
      '- **p** (aspiré) = avec un petit coup d\'air\n' +
      '\n' +
      'Astuce : pose ta main devant la bouche. Dis « bā » (八 = 8), la main reste stable. Dis « pá » (爬 = grimper), tu sens le souffle.',
    bodyEn:
      'In English, b/p differ by voicing (vocal cord vibration). In Mandarin, the split is elsewhere: it\'s aspiration. b (unaspirated) = no puff, p (aspirated) = a little burst of air.\nSimple test: hand in front of mouth. Say "bā" (八 = 8): hand stays still. Say "pá" (爬 = to climb): you feel the puff.',
    items: [
      { hanzi: '八', pinyin: 'bā', meaning: 'huit (non aspiré)', meaningEn: 'eight (unaspirated)', audio: 'audio/hsk1/hsk1_八.wav' },
      { hanzi: '爸', pinyin: 'bà', meaning: 'père (non aspiré)', meaningEn: 'father (unaspirated)', audio: 'audio/hsk1/hsk1_爸.wav' },
      { hanzi: '爬', pinyin: 'pá', meaning: 'grimper (aspiré)', meaningEn: 'to climb (aspirated)', audio: 'audio/hsk2/hsk2_爬.wav' },
      { hanzi: '怕', pinyin: 'pà', meaning: 'avoir peur (aspiré)', meaningEn: 'to be afraid (aspirated)', audio: 'audio/hsk2/hsk2_怕.wav' }
    ],
    tip:
      'Le « b » chinois ressemble davantage à un « p » français doux qu\'à un « b ». Ne cherche pas à faire vibrer les cordes — cherche juste à ne pas souffler.',
    tipEn:
      'Chinese "b" sounds more like a soft French "p" than a true "b". Don\'t try to voice it — just avoid any aspiration.'
  },
  {
    id: 'p-init1-labials',
    title: 'Labiales : b / p / m / f',
    titleEn: 'Labials: b / p / m / f',
    body:
      'Les 4 initiales qui se forment avec les **lèvres**.\n' +
      '\n' +
      'Règle :\n' +
      '- **b** et **p** fonctionnent par paire (non aspiré / aspiré)\n' +
      '- **m** et **f** sont directes — identiques au français',
    bodyEn:
      'The 4 initials formed with the lips. b and p work as a pair (unaspirated / aspirated). m and f are straightforward — identical to English.',
    items: [
      { hanzi: '八', pinyin: 'bā', meaning: 'huit (b)', meaningEn: 'eight (b)', audio: 'audio/hsk1/hsk1_八.wav' },
      { hanzi: '怕', pinyin: 'pà', meaning: 'avoir peur (p)', meaningEn: 'to fear (p)', audio: 'audio/hsk2/hsk2_怕.wav' },
      { hanzi: '妈', pinyin: 'mā', meaning: 'maman (m)', meaningEn: 'mom (m)', audio: 'audio/hsk1/hsk1_妈.wav' },
      { hanzi: '发', pinyin: 'fā', meaning: 'envoyer (f)', meaningEn: 'to send (f)', audio: 'audio/hsk1/hsk1_发.wav' }
    ]
  },
  {
    id: 'p-init1-alveolars',
    title: 'Alvéolaires : d / t / n / l',
    titleEn: 'Alveolars: d / t / n / l',
    body:
      'Les 4 initiales produites avec la **pointe de la langue** contre la crête alvéolaire (juste derrière les dents du haut).\n' +
      '\n' +
      'Règle :\n' +
      '- **d** et **t** s\'opposent par aspiration\n' +
      '- **n** et **l** sont directes',
    bodyEn:
      'The 4 initials made with the tongue tip against the alveolar ridge (just behind the upper teeth). Same rules: d/t by aspiration, n/l direct.',
    items: [
      { hanzi: '大', pinyin: 'dà', meaning: 'grand (d, non aspiré)', meaningEn: 'big (d, unaspirated)', audio: 'audio/hsk1/hsk1_大.wav' },
      { hanzi: '他', pinyin: 'tā', meaning: 'il / lui (t, aspiré)', meaningEn: 'he / him (t, aspirated)', audio: 'audio/hsk1/hsk1_他.wav' },
      { hanzi: '那', pinyin: 'nà', meaning: 'cela (n)', meaningEn: 'that (n)', audio: 'audio/hsk1/hsk1_那.wav' },
      { hanzi: '拉', pinyin: 'lā', meaning: 'tirer (l)', meaningEn: 'to pull (l)', audio: 'audio/hsk2/hsk2_拉.wav' }
    ],
    tip:
      'L\'erreur classique des francophones : prononcer « t » comme un « t » français net. En mandarin, t est aspiré — il faut sentir le souffle, comme en anglais « top ». Sans souffle, tu dis « d ».',
    tipEn:
      'Classic mistake for French speakers: saying "t" as a crisp French "t". In Mandarin, t is aspirated — the puff matters, as in English "top". Without the puff, it becomes "d".'
  }
];

// ---------------------------------------------------------------------------
// cecr-a1-pinyin-m3 — Initiales g k h j q x
// ---------------------------------------------------------------------------

export const pinyinInitials2LearnSections: LessonV2LearnSection[] = [
  {
    id: 'p-init2-velars',
    title: 'Vélaires : g / k / h',
    titleEn: 'Velars: g / k / h',
    body:
      'Trio produit à l\'**arrière de la bouche**, contre le voile du palais.\n' +
      '\n' +
      'Règle :\n' +
      '- **g** (non aspiré) vs **k** (aspiré), même logique que b/p et d/t\n' +
      '- **h** est plus rauque qu\'en français — un souffle venu de la gorge, proche du « j » espagnol (« Juan »)',
    bodyEn:
      'Trio produced at the back of the mouth against the soft palate. g (unaspirated) vs k (aspirated), same logic as b/p and d/t. h is raspier than English "h" — a throat breath, close to Spanish "j" ("Juan").',
    items: [
      { hanzi: '哥', pinyin: 'gē', meaning: 'grand frère (g, non aspiré)', meaningEn: 'older brother (g, unaspirated)', audio: 'audio/hsk1/hsk1_哥.wav' },
      { hanzi: '课', pinyin: 'kè', meaning: 'cours (k, aspiré)', meaningEn: 'class (k, aspirated)', audio: 'audio/hsk1/hsk1_课.wav' },
      { hanzi: '喝', pinyin: 'hē', meaning: 'boire (h)', meaningEn: 'to drink (h)', audio: 'audio/hsk1/hsk1_喝.wav' }
    ],
    tip:
      'En français, le « h » est muet. En mandarin, il se prononce toujours — jamais silencieux. 好 hǎo n\'est pas « ao », c\'est « hao » avec un vrai souffle.',
    tipEn:
      'In French, "h" is silent. In Mandarin, it is always pronounced — never dropped. 好 hǎo isn\'t "ao", it\'s "hao" with a real breath.'
  },
  {
    id: 'p-init2-palatals',
    title: 'Palatales : j / q / x',
    titleEn: 'Palatals: j / q / x',
    body:
      'Trio **totalement absent** du français. La langue s\'aplatit contre le palais (comme pour faire « yee »), et les lèvres s\'étirent en sourire.\n' +
      '\n' +
      'Les trois sons :\n' +
      '- **j** ≈ « dj » très doux\n' +
      '- **q** ≈ « tch » aspiré\n' +
      '- **x** ≈ « ch » léger (plus soufflé que chuchoté)\n' +
      '\n' +
      'Règle d\'or : ces trois sons ne se combinent **jamais** avec a, o, e, u — seulement avec i et ü.',
    bodyEn:
      'Three sounds absent from English. The tongue flattens against the hard palate (as if saying "yee"), lips stretched in a smile.\n  • j ≈ soft "dj"\n  • q ≈ aspirated "tch"\n  • x ≈ light "sh"\nThese three initials NEVER combine with a, o, e, u — only i and ü.',
    items: [
      { hanzi: '几', pinyin: 'jǐ', meaning: 'combien (j)', meaningEn: 'how many (j)', audio: 'audio/hsk1/hsk1_几.wav' },
      { hanzi: '七', pinyin: 'qī', meaning: 'sept (q, aspiré)', meaningEn: 'seven (q, aspirated)', audio: 'audio/hsk1/hsk1_七.wav' },
      { hanzi: '西', pinyin: 'xī', meaning: 'ouest (x)', meaningEn: 'west (x)', audio: 'audio/hsk1/hsk1_西.wav' }
    ],
    tip:
      'Règle utile : j/q/x suivis d\'un « u » sous-entendent toujours « ü ». 去 qù se lit « chü », pas « chou ». Les deux points sur le ü sont supprimés par convention.',
    tipEn:
      'Useful rule: j/q/x followed by "u" always means "ü". 去 qù reads "chü", not "choo". The umlaut is dropped by convention.'
  }
];

// ---------------------------------------------------------------------------
// cecr-a1-pinyin-m4 — Initiales zh ch sh r z c s (rétroflexes & sifflantes)
// ---------------------------------------------------------------------------

export const pinyinInitials3LearnSections: LessonV2LearnSection[] = [
  {
    id: 'p-init3-retroflex',
    title: 'Rétroflexes : zh / ch / sh / r',
    titleEn: 'Retroflexes: zh / ch / sh / r',
      body:
      'La « famille rétroflexe » : la **pointe de la langue se recourbe** vers l\'arrière, touchant presque le palais dur. C\'est **le** son typiquement pékinois.\n' +
      '\n' +
      'Les quatre sons :\n' +
      '- **zh** ≈ « dj » langue en arrière\n' +
      '- **ch** ≈ « tch » aspiré langue en arrière\n' +
      '- **sh** ≈ « ch » langue en arrière\n' +
      '- **r** ≈ entre « r » anglais et « j » français, langue recourbée',
    bodyEn:
      'The "retroflex family": the tongue tip curls backwards, nearly touching the hard palate. THE signature Beijing sound.\n  • zh ≈ "dj" with curled tongue\n  • ch ≈ aspirated "tch" with curled tongue\n  • sh ≈ "sh" with curled tongue\n  • r ≈ between English "r" and French "j", curled tongue',
    items: [
      { hanzi: '这', pinyin: 'zhè', meaning: 'ce, celui-ci', meaningEn: 'this', audio: 'audio/hsk1/hsk1_这.wav' },
      { hanzi: '吃', pinyin: 'chī', meaning: 'manger', meaningEn: 'to eat', audio: 'audio/hsk1/hsk1_吃.wav' },
      { hanzi: '是', pinyin: 'shì', meaning: 'être', meaningEn: 'to be', audio: 'audio/hsk1/hsk1_是.wav' },
      { hanzi: '日', pinyin: 'rì', meaning: 'jour', meaningEn: 'day', audio: 'audio/hsk1/hsk1_日.wav' }
    ],
    tip:
      'À Shanghai et dans le sud, les gens ne recourbent pas la langue autant — 是 sonne plus près de « sì ». Ce n\'est pas une faute, juste un accent. Les Pékinois exagèrent, les Shanghaïens simplifient.',
    tipEn:
      'In Shanghai and the south, people curl the tongue less — 是 sounds closer to "sì". Not a mistake, just an accent. Beijingers exaggerate, Shanghainese flatten.'
  },
  {
    id: 'p-init3-sibilants',
    title: 'Sifflantes : z / c / s',
    titleEn: 'Sibilants: z / c / s',
    body:
      'La « famille plate » : langue plaquée derrière les dents du bas, **plate**. L\'opposition avec zh/ch/sh est **cruciale**.\n' +
      '\n' +
      'Les trois sons :\n' +
      '- **z** ≈ « dz » net (comme « pizza » italien)\n' +
      '- **c** ≈ « ts » aspiré\n' +
      '- **s** ≈ « s » français normal',
    bodyEn:
      'The "flat family": tongue pressed behind the lower teeth, flat. The contrast with zh/ch/sh is crucial.\n  • z ≈ crisp "dz" (like Italian "pizza")\n  • c ≈ aspirated "ts"\n  • s ≈ regular English "s"',
    items: [
      { hanzi: '在', pinyin: 'zài', meaning: 'être à, en train de', meaningEn: 'to be at, -ing', audio: 'audio/hsk1/hsk1_在.wav' },
      { hanzi: '才', pinyin: 'cái', meaning: 'seulement alors', meaningEn: 'only then', audio: 'audio/hsk1/hsk1_才.wav' },
      { hanzi: '四', pinyin: 'sì', meaning: 'quatre', meaningEn: 'four', audio: 'audio/hsk1/hsk1_四.wav' }
    ],
    minimalPairs: [
      { pinyin: 'sì', hanzi: '四', meaning: 'quatre (langue plate)', meaningEn: 'four (flat)', audio: 'audio/hsk1/hsk1_四.wav' },
      { pinyin: 'shì', hanzi: '是', meaning: 'être (langue recourbée)', meaningEn: 'to be (curled)', audio: 'audio/hsk1/hsk1_是.wav' },
      { pinyin: 'zài', hanzi: '在', meaning: 'à, en (langue plate)', meaningEn: 'at (flat)', audio: 'audio/hsk1/hsk1_在.wav' },
      { pinyin: 'zhè', hanzi: '这', meaning: 'ceci (langue recourbée)', meaningEn: 'this (curled)', audio: 'audio/hsk1/hsk1_这.wav' }
    ],
    tip:
      'La paire 四 sì (4) / 是 shì (est) est la plus discriminante pour débuter. Si tu les distingues à l\'oreille et à la prononciation, tu maîtrises l\'opposition plate/rétroflexe.',
    tipEn:
      'The pair 四 sì (4) / 是 shì (is) is the most discriminating for beginners. If you can tell them apart by ear and in speech, you\'ve mastered the flat/retroflex contrast.'
  }
];

// ---------------------------------------------------------------------------
// cecr-a1-hello-m4 — D'où viens-tu ? (nationalités)
// ---------------------------------------------------------------------------

export const nationalitiesLearnSections: LessonV2LearnSection[] = [
  {
    id: 'nat-where',
    title: 'La question : « d\'où viens-tu ? »',
    titleEn: 'The "where are you from?" question',
    body:
      'La structure standard : 你是哪国人 ? (nǐ shì nǎ guó rén) — littéralement « tu + es + quel + pays + personne ? ». Compact mais très **régulier**.\n' +
      '\n' +
      'Règle : réponse en 我是 + [nationalité].\n' +
      '\n' +
      'Exemple : 我是法国人 (wǒ shì fǎguórén) — « je suis français ».',
    bodyEn:
      'The standard pattern: 你是哪国人? (nǐ shì nǎ guó rén) — literally "you + are + which + country + person?". Compact but very regular.\nAnswer: 我是 + [nationality]. E.g. 我是法国人 (wǒ shì fǎguórén) — "I am French".',
    items: [
      { hanzi: '哪', pinyin: 'nǎ', meaning: 'quel, lequel', meaningEn: 'which', audio: 'audio/hsk1/hsk1_哪.wav' },
      { hanzi: '国', pinyin: 'guó', meaning: 'pays', meaningEn: 'country', audio: 'audio/hsk1/hsk1_国.wav' },
      { hanzi: '人', pinyin: 'rén', meaning: 'personne', meaningEn: 'person', audio: 'audio/hsk1/hsk1_人.wav' }
    ],
    tip:
      'Le formule est productive : pays + 人 = nationalité. Pas besoin d\'apprendre des mots séparés pour « français », « allemand », etc. — seulement les noms de pays.',
    tipEn:
      'The formula is productive: country + 人 = nationality. No need to learn separate words for "French", "German", etc. — only country names.'
  },
  {
    id: 'nat-countries',
    title: 'Les pays les plus courants',
    titleEn: 'The most common countries',
    body:
      'Les noms de pays en chinois sont souvent des **caractères choisis pour évoquer le son original**.\n' +
      '\n' +
      'Quelques exemples :\n' +
      '- 法国 = « Fǎ guó » ≈ France\n' +
      '- 美国 = « Měi guó » (« beau pays ») = États-Unis',
    bodyEn:
      'Chinese country names are often chosen to evoke the original sound. 法国 = "Fǎ guó" ≈ France, 美国 = "Měi guó" ("beautiful country") = USA.',
    items: [
      { hanzi: '中国', pinyin: 'Zhōng guó', meaning: 'Chine (« pays du milieu »)', meaningEn: 'China ("middle country")', audio: 'audio/hsk1/hsk1_中国.wav' },
      { hanzi: '法国', pinyin: 'Fǎ guó', meaning: 'France', meaningEn: 'France', audio: 'audio/hsk1/hsk1_法国.wav' },
      { hanzi: '美国', pinyin: 'Měi guó', meaning: 'États-Unis', meaningEn: 'USA', audio: 'audio/hsk1/hsk1_美国.wav' },
      { hanzi: '英国', pinyin: 'Yīng guó', meaning: 'Royaume-Uni', meaningEn: 'UK', audio: 'audio/hsk1/hsk1_英国.wav' },
      { hanzi: '日本', pinyin: 'Rì běn', meaning: 'Japon (« origine du soleil »)', meaningEn: 'Japan ("origin of the sun")', audio: 'audio/hsk1/hsk1_日本.wav' }
    ],
    tip:
      'Attention : Japon est une exception, son nom chinois est 日本 et non 日国. Pour former « Japonais », on dit 日本人 (rìběnrén).',
    tipEn:
      'Note: Japan is an exception, its Chinese name is 日本 not 日国. For "Japanese" say 日本人 (rìběnrén).'
  }
];

// ---------------------------------------------------------------------------
// cecr-a1-numbers-m2 — De 11 à 100
// ---------------------------------------------------------------------------

export const numbersExtendedLearnSections: LessonV2LearnSection[] = [
  {
    id: 'num2-11-19',
    title: 'De 11 à 19 : la règle additive',
    titleEn: '11 to 19: the additive rule',
    body:
      'Le chinois est le **paradis des maths** : pour dire 11, c\'est 10 + 1 = 十一. Pour 15, c\'est 十五.\n' +
      '\n' +
      'Règle d\'or : 十 + [chiffre 1-9]. **Aucune** exception, **aucun** mot nouveau à apprendre.',
    bodyEn:
      'Chinese is a math paradise: to say 11 you say 10 + 1 = 十一. For 15 it\'s 十五. No exceptions, no new words to learn.\nRule: 十 + [digit 1-9]',
    items: [
      { hanzi: '十', pinyin: 'shí', meaning: 'dix', meaningEn: 'ten', audio: 'audio/hsk1/hsk1_十.wav' }
    ],
    tip:
      'À comparer avec les irréguliers français « onze, douze, treize » ou anglais « eleven, twelve, thirteen ». Le chinois ne triche pas — tu connais 1-10, tu connais 11-19.',
    tipEn:
      'Compare with English irregulars "eleven, twelve, thirteen". Chinese doesn\'t cheat — know 1–10 and you know 11–19.'
  },
  {
    id: 'num2-20-99',
    title: 'De 20 à 99 : la règle multiplicative + additive',
    titleEn: '20 to 99: multiplicative + additive rule',
    body:
      'Toutes les dizaines se forment par **multiplication** : 20 = 2 × 10 = 二十, 50 = 五十. Puis pour les chiffres intermédiaires, on **ajoute** : 25 = 2 × 10 + 5 = 二十五.\n' +
      '\n' +
      'Règle d\'or : [dizaine] + 十 + [unité]. Transparente, sans piège.',
    bodyEn:
      'Tens are formed multiplicatively: 20 = 2 × 10 = 二十, 50 = 五十. For in-between digits, add: 25 = 2 × 10 + 5 = 二十五.\nGeneral rule: [tens digit] + 十 + [units digit]. Transparent, no traps.',
    items: [
      { hanzi: '二', pinyin: 'èr', meaning: 'deux', meaningEn: 'two', audio: 'audio/hsk1/hsk1_二.wav' },
      { hanzi: '五', pinyin: 'wǔ', meaning: 'cinq', meaningEn: 'five', audio: 'audio/hsk1/hsk1_五.wav' }
    ],
    tip:
      'Pour une dizaine ronde sans unité, on peut s\'arrêter : 二十 = 20, sans rien ajouter. Mais 105 s\'écrit 一百零五 — avec un 零 (zéro) pour marquer la dizaine vide.',
    tipEn:
      'For a round tens value with no units, just stop: 二十 = 20. But 105 is 一百零五 — with a 零 (zero) to mark the empty tens place.'
  },
  {
    id: 'num2-hundreds',
    title: 'Les centaines et au-delà',
    titleEn: 'Hundreds and beyond',
      body:
      '100 = 一百 (yī bǎi), 1 000 = 一千 (yī qiān). La logique reste la même : [chiffre] + 百, [chiffre] + 千.\n' +
      '\n' +
      'Exception : 10 000 = 一万 (yī wàn). Le chinois regroupe par **10 000** et non par 1 000 comme l\'Occident.\n' +
      '\n' +
      'Conséquence : 1 million = 一百万 (« 100 × 10 000 »).',
    bodyEn:
      '100 = 一百 (yī bǎi), 1 000 = 一千 (yī qiān). Same rule: [digit] + 百, [digit] + 千.\nChinese quirk: 10 000 = 一万 (yī wàn). Chinese groups by 10 000 rather than 1 000 as the West does. 1 million = 一百万 ("100 × 10 000").',
    items: [
      { hanzi: '百', pinyin: 'bǎi', meaning: 'cent', meaningEn: 'hundred', audio: 'audio/hsk1/hsk1_百.wav' },
      { hanzi: '千', pinyin: 'qiān', meaning: 'mille', meaningEn: 'thousand', audio: 'audio/hsk1/hsk1_千.wav' },
      { hanzi: '万', pinyin: 'wàn', meaning: 'dix mille', meaningEn: 'ten thousand', audio: 'audio/hsk1/hsk1_万.wav' }
    ],
    tip:
      'Piège classique : traduire un grand nombre français en chinois nécessite de « découper » différemment. 230 000 = 23 × 10 000 = 二十三万 (en chinois, un seul bloc).',
    tipEn:
      'Classic pitfall: translating a large Western number requires re-chunking. 230 000 = 23 × 10 000 = 二十三万 (Chinese: a single block).'
  }
];

// ---------------------------------------------------------------------------
// cecr-a1-numbers-m3 — Jours & semaine
// ---------------------------------------------------------------------------

export const weekDaysLearnSections: LessonV2LearnSection[] = [
  {
    id: 'week-structure',
    title: '星期 + chiffre',
    titleEn: '星期 + digit',
    body:
      'Les jours de la semaine en chinois sont des **chiffres**. Lundi = « jour 1 », mardi = « jour 2 », etc. Il suffit de savoir compter de 1 à 6 pour nommer la semaine.\n' +
      '\n' +
      'Règle d\'or : 星期 + [chiffre 1-6] pour lundi → samedi.\n' +
      '\n' +
      'Exception : dimanche = 星期日 ou 星期天 (le « ciel »).',
    bodyEn:
      'Chinese weekdays are numbers. Monday = "day 1", Tuesday = "day 2", etc. Just count 1–6 and you know the week.\nRule: 星期 + [digit 1-6] for Monday → Saturday. Exception: Sunday = 星期日 or 星期天 ("the sky").',
    items: [
      { hanzi: '星期', pinyin: 'xīng qī', meaning: 'semaine', meaningEn: 'week', audio: 'audio/hsk1/hsk1_星期.wav' },
      { hanzi: '星期日', pinyin: 'xīng qī rì', meaning: 'dimanche', meaningEn: 'Sunday', audio: 'audio/hsk1/hsk1_星期日.wav' }
    ],
    tip:
      'Deux variantes possibles : 星期 (plus formel) et 周 (zhōu, plus court et moderne). 周一 = lundi. Les deux sont interchangeables à l\'oral comme à l\'écrit.',
    tipEn:
      'Two variants: 星期 (more formal) and 周 (zhōu, shorter and modern). 周一 = Monday. Both are interchangeable in speech and writing.'
  },
  {
    id: 'week-relative',
    title: 'Cette semaine, la prochaine, la dernière',
    titleEn: 'This / next / last week',
    body:
      'Pour situer la semaine, on préfixe avec 这 (cette), 下 (prochaine, littéralement « suivante »), 上 (dernière, « précédente »).\n' +
      '\n' +
      'Les trois formules :\n' +
      '- 这个星期 (zhège xīngqī) = cette semaine\n' +
      '- 下个星期 (xià ge xīng qī) = la semaine prochaine\n' +
      '- 上个星期 (shàng ge xīng qī) = la semaine dernière',
    bodyEn:
      'For relative weeks, prefix with 这 (this), 下 (next, "following"), 上 (last, "previous").\n  • 这个星期 (zhège xīngqī) = this week\n  • 下个星期 (xià ge xīng qī) = next week\n  • 上个星期 (shàng ge xīng qī) = last week',
    items: [
      { hanzi: '上', pinyin: 'shàng', meaning: 'dernier, précédent', meaningEn: 'last, previous', audio: 'audio/hsk1/hsk1_上.wav' },
      { hanzi: '下', pinyin: 'xià', meaning: 'prochain, suivant', meaningEn: 'next, following', audio: 'audio/hsk1/hsk1_下.wav' }
    ],
    tip:
      '上 et 下 ne servent pas qu\'aux semaines. 上个月 = mois dernier, 下个月 = mois prochain. Même logique pour 年 (année).',
    tipEn:
      '上 and 下 aren\'t just for weeks. 上个月 = last month, 下个月 = next month. Same logic for 年 (year).'
  }
];

// ---------------------------------------------------------------------------
// cecr-a1-numbers-m5 — Mois & dates
// ---------------------------------------------------------------------------

export const monthsDatesLearnSections: LessonV2LearnSection[] = [
  {
    id: 'date-months',
    title: 'Les mois',
    titleEn: 'The months',
    body:
      'Comme pour les jours de la semaine, les mois sont **numérotés**. Janvier = « mois 1 », février = « mois 2 », etc.\n' +
      '\n' +
      'Règle d\'or : [chiffre 1-12] + 月.\n' +
      '\n' +
      'Quelques exemples :\n' +
      '- 一月 = janvier\n' +
      '- 六月 = juin\n' +
      '- 十二月 = décembre\n' +
      '\n' +
      'Aucun nom propre à retenir.',
    bodyEn:
      'Like weekdays, months are numbered. January = "month 1", February = "month 2", etc. Formula: [digit 1-12] + 月.\nJanuary = 一月, June = 六月, December = 十二月. No proper names to memorize.',
    items: [
      { hanzi: '月', pinyin: 'yuè', meaning: 'mois, lune', meaningEn: 'month, moon', audio: 'audio/hsk1/hsk1_月.wav' },
      { hanzi: '年', pinyin: 'nián', meaning: 'année', meaningEn: 'year', audio: 'audio/hsk1/hsk1_年.wav' },
      { hanzi: '日', pinyin: 'rì', meaning: 'jour, jour du mois', meaningEn: 'day, day of month', audio: 'audio/hsk1/hsk1_日.wav' }
    ],
    tip:
      '月 signifie à la fois « mois » et « lune ». Le calendrier chinois était à l\'origine lunaire — un mois = un cycle lunaire. Le lien reste visible dans l\'écriture.',
    tipEn:
      '月 means both "month" and "moon". The Chinese calendar was originally lunar — a month = one moon cycle. The link shows in the character.'
  },
  {
    id: 'date-full',
    title: 'Donner une date complète',
    titleEn: 'Giving a full date',
    body:
      'L\'ordre chinois va du **plus grand au plus petit** : année → mois → jour. C\'est l\'inverse du français.\n' +
      '\n' +
      'Règle d\'or : année + 年, mois + 月, jour + 日.\n' +
      '\n' +
      'Exemple : 2026年4月18日 = « année 2026, mois 4, jour 18 » = 18 avril 2026. Prononciation : 二零二六年四月十八日.',
    bodyEn:
      'Chinese order: year → month → day (big to small). Opposite of English DD-MM.\nE.g.: 2026年4月18日 = "year 2026, month 4, day 18" = April 18, 2026.\nPronunciation: 二零二六年四月十八日.',
    items: [
      { hanzi: '零', pinyin: 'líng', meaning: 'zéro', meaningEn: 'zero', audio: 'audio/hsk1/hsk1_零.wav' }
    ],
    tip:
      'Pour une année, on lit chaque chiffre séparément : 2026 = 二零二六 (et non 两千零二十六). C\'est spécifique aux dates, pas aux autres grands nombres.',
    tipEn:
      'For a year, read each digit separately: 2026 = 二零二六 (not 两千零二十六). This applies only to dates, not other large numbers.'
  }
];

// ---------------------------------------------------------------------------
// cecr-a1-family-m2 — Mon âge, ton âge
// ---------------------------------------------------------------------------

export const ageLearnSections: LessonV2LearnSection[] = [
  {
    id: 'age-ask',
    title: 'Demander l\'âge',
    titleEn: 'Asking someone\'s age',
    body:
      'Le mot-clé : 岁 (suì) = « année d\'âge, ans ». Il est **différent** de 年 (année calendaire).\n' +
      '\n' +
      'Trois formules selon l\'âge du destinataire :\n' +
      '- Enfant (<10 ans) : 你几岁 ? (nǐ jǐ suì) — « tu as combien d\'années ? »\n' +
      '- Adulte : 你多大 ? (nǐ duō dà) — « tu as quelle taille ? » (plus poli)\n' +
      '- Personne âgée : 您多大年纪 ? (plus respectueux)',
    bodyEn:
      'Key word: 岁 (suì) = "year of age, years old". Different from 年 (calendar year).\nTo ask age, three options depending on the listener\'s likely age:\n  • Child (<10): 你几岁? (nǐ jǐ suì) — "how many years?"\n  • Adult: 你多大? (nǐ duō dà) — "how big are you?" (more polite)\n  • Elderly: 您多大年纪? (more respectful)',
    items: [
      { hanzi: '岁', pinyin: 'suì', meaning: 'an (unité d\'âge)', meaningEn: 'years old', audio: 'audio/hsk1/hsk1_岁.wav' },
      { hanzi: '几', pinyin: 'jǐ', meaning: 'combien (petit nombre)', meaningEn: 'how many (small)', audio: 'audio/hsk1/hsk1_几.wav' },
      { hanzi: '多', pinyin: 'duō', meaning: 'combien, beaucoup', meaningEn: 'how, much', audio: 'audio/hsk1/hsk1_多.wav' },
      { hanzi: '大', pinyin: 'dà', meaning: 'grand, âgé', meaningEn: 'big, old', audio: 'audio/hsk1/hsk1_大.wav' }
    ],
    tip:
      'Demander 你几岁 à un adulte est maladroit — ça suggère qu\'on le voit comme un enfant. La formule adulte 你多大 est universelle et sûre.',
    tipEn:
      'Asking 你几岁 to an adult is awkward — implies you see them as a child. The adult form 你多大 is universally safe.'
  },
  {
    id: 'age-answer',
    title: 'Répondre à l\'âge',
    titleEn: 'Answering about age',
    body:
      'Structure : 我 + [chiffre] + 岁.\n' +
      '\n' +
      'Exemple : 我三十岁 (wǒ sān shí suì) = « j\'ai 30 ans ».\n' +
      '\n' +
      'Règle d\'or : le verbe « avoir » (有) n\'est **jamais** utilisé avec l\'âge — on met juste le chiffre directement.\n' +
      '\n' +
      'Attention : 我有三十岁 est une erreur **typique** de francophone. Dis juste 我三十岁.',
    bodyEn:
      'Structure: 我 + [digit] + 岁. E.g. 我三十岁 (wǒ sān shí suì) = "I am 30".\nThe verb "to have" (有) is NOT used with age — just put the number directly.\n我有三十岁 is a classic French-speaker mistake. Just say 我三十岁.',
    tip:
      'Pour un âge avec des demi : 我二十五岁半 (wǒ èrshíwǔ suì bàn) = « j\'ai 25 ans et demi ». 半 = moitié.',
    tipEn:
      'For "and a half" ages: 我二十五岁半 (wǒ èrshíwǔ suì bàn) = "I\'m 25 and a half". 半 = half.'
  }
];

// ---------------------------------------------------------------------------
// cecr-a1-family-m3 — Les pronoms de base
// ---------------------------------------------------------------------------

export const pronounsLearnSections: LessonV2LearnSection[] = [
  {
    id: 'pro-singular',
    title: 'Les pronoms au singulier',
    titleEn: 'Singular pronouns',
    body:
      'Trois pronoms de base :\n' +
      '- 我 (wǒ) = je\n' +
      '- 你 (nǐ) = tu\n' +
      '- 他/她 (tā) = il/elle\n' +
      '\n' +
      'Règle d\'or : **un seul mot par personne** — pas de variation selon le cas (je/moi/mon = tous 我).\n' +
      '\n' +
      'Remarque : à l\'écrit, 他 est masculin et 她 féminin. À l\'oral, les deux se prononcent « tā », donc indistinguables.',
    bodyEn:
      'Three basic pronouns: 我 (wǒ) = I, 你 (nǐ) = you, 他/她 (tā) = he/she. One word per person — no case variation (I/me/my = all 我).\nIn writing, 他 is male and 她 female. In speech both sound "tā", so indistinguishable.',
    items: [
      { hanzi: '我', pinyin: 'wǒ', meaning: 'je, moi', meaningEn: 'I, me', audio: 'audio/hsk1/hsk1_我.wav' },
      { hanzi: '你', pinyin: 'nǐ', meaning: 'tu, toi', meaningEn: 'you', audio: 'audio/hsk1/hsk1_你.wav' },
      { hanzi: '您', pinyin: 'nín', meaning: 'vous (poli)', meaningEn: 'you (polite)', audio: 'audio/hsk1/hsk1_您.wav' },
      { hanzi: '他', pinyin: 'tā', meaning: 'il, lui', meaningEn: 'he, him', audio: 'audio/hsk1/hsk1_他.wav' }
    ],
    tip:
      '您 (nín) est la forme respectueuse de 你. À utiliser avec les personnes âgées, les clients, les professeurs, les supérieurs hiérarchiques. Ne l\'utilise pas avec les amis — ça crée de la distance.',
    tipEn:
      '您 (nín) is the respectful form of 你. Use with elders, customers, teachers, superiors. Don\'t use with friends — it creates distance.'
  },
  {
    id: 'pro-plural-possessive',
    title: 'Pluriel et possessif',
    titleEn: 'Plural and possessive',
    body:
      'Pour le **pluriel**, on ajoute 们 (men) :\n' +
      '- 我们 = nous\n' +
      '- 你们 = vous\n' +
      '- 他们 = ils/elles\n' +
      '\n' +
      'Pour le **possessif**, on ajoute 的 (de) :\n' +
      '- 我的 = mon/ma\n' +
      '- 你的 = ton/ta\n' +
      '- 他的 = son/sa\n' +
      '\n' +
      'Règle d\'or : 的 transforme **n\'importe quel** nom ou pronom en possesseur. 妈妈的 = « de maman ».',
    bodyEn:
      'For plural, add 们 (men): 我们 = we, 你们 = you (plural), 他们 = they.\nFor possessive, add 的 (de): 我的 = my, 你的 = your, 他的 = his.\nUniversal rule: 的 turns any noun or pronoun into a possessor. 妈妈的 = "mom\'s".',
    items: [
      { hanzi: '的', pinyin: 'de', meaning: 'particule possessive', meaningEn: 'possessive particle', audio: 'audio/hsk1/hsk1_的.wav' }
    ],
    tip:
      'Avec les membres de la famille, on omet souvent le 的 : 我妈妈 (« ma maman ») au lieu de 我的妈妈. Plus naturel, plus familier.',
    tipEn:
      'With family members, 的 is often omitted: 我妈妈 ("my mom") instead of 我的妈妈. More natural, more casual.'
  }
];

// ---------------------------------------------------------------------------
// cecr-a1-family-m4 — Les couleurs
// ---------------------------------------------------------------------------

export const colorsLearnSections: LessonV2LearnSection[] = [
  {
    id: 'col-basic',
    title: 'Les couleurs de base',
    titleEn: 'Basic colors',
    body:
      'Les couleurs se construisent presque toujours avec 色 (sè) = « couleur » à la fin : 红色 = rouge, 蓝色 = bleu.\n' +
      '\n' +
      'Remarque : à l\'oral, on omet souvent 色. Pour dire « une voiture rouge » : 红色的车 ou plus court 红的车.',
    bodyEn:
      'Colors almost always use 色 (sè) = "color" at the end: 红色 = red, 蓝色 = blue. In speech, 色 is often dropped.\nTo say "a red car": 红色的车 or shorter 红的车.',
    items: [
      { hanzi: '红', pinyin: 'hóng', meaning: 'rouge', meaningEn: 'red', audio: 'audio/hsk1/hsk1_红.wav' },
      { hanzi: '蓝', pinyin: 'lán', meaning: 'bleu', meaningEn: 'blue', audio: 'audio/hsk1/hsk1_蓝.wav' },
      { hanzi: '黄', pinyin: 'huáng', meaning: 'jaune', meaningEn: 'yellow', audio: 'audio/hsk1/hsk1_黄.wav' },
      { hanzi: '绿', pinyin: 'lǜ', meaning: 'vert', meaningEn: 'green', audio: 'audio/hsk1/hsk1_绿.wav' }
    ],
    tip:
      '红 est LA couleur porte-bonheur en Chine — on l\'utilise partout pour les mariages, le nouvel an, les enveloppes de cadeaux. Le noir et le blanc, au contraire, sont associés au deuil.',
    tipEn:
      '红 (red) is THE lucky color in China — used everywhere for weddings, New Year, gift envelopes. Black and white, by contrast, are linked to mourning.'
  },
  {
    id: 'col-neutral',
    title: 'Noir, blanc et les tons neutres',
    titleEn: 'Black, white, neutral tones',
    body:
      '黑 (hēi) = noir, 白 (bái) = blanc — les deux couleurs fondamentales. En culture chinoise traditionnelle, ce sont les couleurs les plus chargées de sens.',
    bodyEn:
      '黑 (hēi) = black, 白 (bái) = white — the two foundational colors. In traditional Chinese culture, these carry the heaviest cultural weight.',
    items: [
      { hanzi: '黑', pinyin: 'hēi', meaning: 'noir', meaningEn: 'black', audio: 'audio/hsk1/hsk1_黑.wav' },
      { hanzi: '白', pinyin: 'bái', meaning: 'blanc', meaningEn: 'white', audio: 'audio/hsk1/hsk1_白.wav' },
      { hanzi: '颜色', pinyin: 'yán sè', meaning: 'couleur (terme général)', meaningEn: 'color (general)', audio: 'audio/hsk1/hsk1_颜色.wav' }
    ],
    tip:
      'Pour demander « quelle couleur ? » : 什么颜色 ? (shén me yán sè) — « quoi + couleur ? ». Réponse standard : [couleur] + 色 ou juste la couleur.',
    tipEn:
      'To ask "what color?": 什么颜色? (shén me yán sè) — "what + color?". Standard answer: [color] + 色 or just the color.'
  }
];

// ---------------------------------------------------------------------------
// cecr-a1-grammar-m1 — Le verbe 是 (être)
// ---------------------------------------------------------------------------

export const shiVerbLearnSections: LessonV2LearnSection[] = [
  {
    id: 'shi-rule',
    title: '是 : le verbe d\'identification',
    titleEn: '是: the identification verb',
    body:
      '是 (shì) sert à dire « X est Y » — à **identifier**, à **définir**.\n' +
      '\n' +
      'Structure : [sujet] + 是 + [identité]. Exemple : 我是学生 (wǒ shì xuéshēng) = je suis étudiant.\n' +
      '\n' +
      'Attention : 是 **ne sert pas** à décrire ! Pour « elle est grande » on ne dit **jamais** 她是高 — on dit 她很高.\n' +
      '\n' +
      'Règle d\'or : 是 = identité, 很 + adjectif = description.',
    bodyEn:
      '是 (shì) is used to say "X is Y" — to identify, to define. Structure: [subject] + 是 + [identity].\nE.g.: 我是学生 (wǒ shì xuéshēng) = I am a student.\nWatch out: 是 is NOT for describing! For "she is tall" you do NOT say 她是高 — say 她很高. 是 = identity; 很 + adjective = description.',
    items: [
      { hanzi: '是', pinyin: 'shì', meaning: 'être, oui', meaningEn: 'to be, yes', audio: 'audio/hsk1/hsk1_是.wav' }
    ],
    tip:
      'Test simple : si le prédicat est un nom (étudiant, français, professeur), utilise 是. Si c\'est un adjectif (grand, fatigué, content), utilise 很 + adjectif.',
    tipEn:
      'Simple test: if the predicate is a noun (student, French, teacher), use 是. If it\'s an adjective (tall, tired, happy), use 很 + adjective.'
  },
  {
    id: 'shi-structure',
    title: 'Structure visuelle : 是 vs 很',
    titleEn: 'Visual structure: 是 vs 很',
    body:
      'Compare ces 4 phrases. Les 2 premières utilisent 是 + nom (identification). Les 2 dernières utilisent 很 + adjectif (description). Repère bien : le rôle change selon le type de prédicat.',
    bodyEn:
      'Compare these 4 sentences. First 2 use 是 + noun (identification). Last 2 use 很 + adjective (description). Notice: the role changes based on the predicate type.',
    tokenizedSentences: [
      {
        zh: [
          { text: '我', pinyin: 'wǒ', role: 'sujet' },
          { text: '是', pinyin: 'shì', role: 'copule' },
          { text: '学生', pinyin: 'xuéshēng', role: 'objet' }
        ],
        fr: [
          { text: 'Je', role: 'sujet' },
          { text: 'suis', role: 'copule' },
          { text: 'étudiant', role: 'objet' }
        ],
        note: '是 + NOM → identification (qui je suis).'
      },
      {
        zh: [
          { text: '她', pinyin: 'tā', role: 'sujet' },
          { text: '是', pinyin: 'shì', role: 'copule' },
          { text: '法国人', pinyin: 'fǎguórén', role: 'objet' }
        ],
        fr: [
          { text: 'Elle', role: 'sujet' },
          { text: 'est', role: 'copule' },
          { text: 'française', role: 'objet' }
        ],
        note: 'Idem : 是 + nationalité (un nom).'
      },
      {
        zh: [
          { text: '我', pinyin: 'wǒ', role: 'sujet' },
          { text: '很', pinyin: 'hěn', role: 'copule' },
          { text: '累', pinyin: 'lèi', role: 'modificateur' }
        ],
        fr: [
          { text: 'Je', role: 'sujet' },
          { text: 'suis', role: 'copule' },
          { text: 'fatigué', role: 'modificateur' }
        ],
        note: '✗ 我是累 — INTERDIT. ✓ 我很累. 很 joue ici le rôle de liaison (= « suis ») devant l\'adjectif 累.'
      },
      {
        zh: [
          { text: '他', pinyin: 'tā', role: 'sujet' },
          { text: '很', pinyin: 'hěn', role: 'copule' },
          { text: '高', pinyin: 'gāo', role: 'modificateur' }
        ],
        fr: [
          { text: 'Il', role: 'sujet' },
          { text: 'est', role: 'copule' },
          { text: 'grand', role: 'modificateur' }
        ],
        note: 'Même règle : 很 fait la liaison (= « est ») devant l\'adjectif 高. Pas de 是.'
      }
    ],
    tip:
      '很 ici n\'a pas le sens de « très » — c\'est une liaison obligatoire devant l\'adjectif. Sans 很, la phrase 我累 sonne tronquée. Avec 很, elle est naturelle.',
    tipEn:
      'Here 很 doesn\'t mean «very» — it\'s a mandatory linker before the adjective. Without 很, 我累 sounds truncated. With 很, it\'s natural.'
  }
];

// ---------------------------------------------------------------------------
// cecr-a1-grammar-m2 — La négation avec 不
// ---------------------------------------------------------------------------

export const buNegationLearnSections: LessonV2LearnSection[] = [
  {
    id: 'bu-rule',
    title: '不 : négation universelle (sauf 有)',
    titleEn: '不: universal negation (except for 有)',
    body:
      'Règle d\'or : 不 (bù) se place **avant** le verbe ou l\'adjectif à nier.\n' +
      '\n' +
      'Exemples :\n' +
      '- 我不吃肉 (wǒ bù chīròu) = je ne mange pas de viande\n' +
      '- 她不高兴 (tā bùgāoxìng) = elle n\'est pas contente\n' +
      '\n' +
      'Exception : 不 est la négation par défaut pour **tout**... sauf pour 有 (avoir). Pour nier 有, on utilise 没 → 没有.',
    bodyEn:
      '不 (bù) is placed BEFORE the verb or adjective being negated.\nE.g.: 我不吃肉 (wǒ bù chīròu) = I don\'t eat meat. 她不高兴 (tā bùgāoxìng) = she is not happy.\nKey rule: 不 is the default negation for everything... except for 有 (to have). To negate 有, use 没: 没有.',
    items: [
      { hanzi: '不', pinyin: 'bù', meaning: 'ne… pas', meaningEn: 'not', audio: 'audio/hsk1/hsk1_不.wav' },
      { hanzi: '没', pinyin: 'méi', meaning: 'ne… pas (pour 有 et passé)', meaningEn: 'not (for 有 and past)', audio: 'audio/hsk1/hsk1_没.wav' }
    ],
    tip:
      'Tone sandhi : 不 change de ton devant un 4e ton. 不 + 是 → bú shì (2e ton). Devant les autres tons, 不 reste 4e ton. Ton automatique, à assimiler par la pratique.',
    tipEn:
      'Tone sandhi: 不 changes tone before a 4th tone. 不 + 是 → bú shì (2nd tone). Before other tones, 不 stays 4th tone. Automatic, absorbed through practice.'
  },
  {
    id: 'bu-structure',
    title: 'Structure visuelle : où va 不 ?',
    titleEn: 'Visual structure: where does 不 go?',
    body:
      '不 s\'insère COMME UN MODIFICATEUR juste avant le verbe ou l\'adjectif. Compare les phrases positives et négatives côte à côte pour voir le pattern.',
    bodyEn:
      '不 fits in AS A MODIFIER right before the verb or adjective. Compare positive and negative sentences side-by-side to spot the pattern.',
    tokenizedSentences: [
      {
        zh: [
          { text: '我', pinyin: 'wǒ', role: 'sujet' },
          { text: '不', pinyin: 'bù', role: 'modificateur' },
          { text: '吃', pinyin: 'chī', role: 'verbe' },
          { text: '肉', pinyin: 'ròu', role: 'objet' }
        ],
        fr: [
          { text: 'Je', role: 'sujet' },
          { text: 'ne', role: 'modificateur' },
          { text: 'mange', role: 'verbe' },
          { text: 'pas de viande', role: 'objet' }
        ],
        note: '不 colle au verbe 吃. Jamais entre 我 et 不, ni après 吃.'
      },
      {
        zh: [
          { text: '她', pinyin: 'tā', role: 'sujet' },
          { text: '不', pinyin: 'bù', role: 'modificateur' },
          { text: '高兴', pinyin: 'gāoxìng', role: 'verbe' }
        ],
        fr: [
          { text: 'Elle', role: 'sujet' },
          { text: 'n\'est pas', role: 'modificateur' },
          { text: 'contente', role: 'verbe' }
        ],
        note: '不 fonctionne aussi devant un adjectif : 高兴 ici joue le rôle de prédicat (« est contente »).'
      },
      {
        zh: [
          { text: '我', pinyin: 'wǒ', role: 'sujet' },
          { text: '没', pinyin: 'méi', role: 'modificateur' },
          { text: '有', pinyin: 'yǒu', role: 'verbe' },
          { text: '时间', pinyin: 'shíjiān', role: 'objet' }
        ],
        fr: [
          { text: 'Je', role: 'sujet' },
          { text: 'n\'', role: 'modificateur' },
          { text: 'ai', role: 'verbe' },
          { text: 'pas', role: 'modificateur' },
          { text: 'de temps', role: 'objet' }
        ],
        note: 'EXCEPTION : pour nier 有 (avoir), on utilise 没 — JAMAIS 不有. Sandhi automatique : 不 + 是 → bú shì.'
      }
    ],
    tip:
      'Position simple à retenir : 不/没 sont des MODIFICATEURS placés directement avant le verbe ou l\'adjectif. Tout autre placement est faux.',
    tipEn:
      'Simple position rule: 不/没 are MODIFIERS placed directly before the verb or adjective. Any other placement is wrong.'
  }
];

// ---------------------------------------------------------------------------
// cecr-a1-grammar-m3 — Les questions avec 吗
// ---------------------------------------------------------------------------

export const maQuestionsLearnSections: LessonV2LearnSection[] = [
  {
    id: 'ma-rule',
    title: '吗 : la particule question',
    titleEn: '吗: the question particle',
    body:
      'Règle d\'or : 吗 (ma) transforme n\'importe quelle phrase affirmative en question oui/non, et se place **toujours** à la toute fin de la phrase.\n' +
      '\n' +
      'Exemples :\n' +
      '- 你好 (tu vas bien) → 你好吗 ? (tu vas bien ?)\n' +
      '- 你是法国人 (tu es français) → 你是法国人吗 ? (tu es français ?)\n' +
      '\n' +
      'Aucune inversion, aucune modification — juste ajouter 吗 à la fin.',
    bodyEn:
      '吗 (ma) turns any affirmative sentence into a yes/no question. It ALWAYS goes at the very end.\nE.g.: 你好 (you\'re well) → 你好吗? (are you well?). 你是法国人 (you are French) → 你是法国人吗? (are you French?).\nNo inversion, no changes — just add 吗 at the end.',
    items: [
      { hanzi: '吗', pinyin: 'ma', meaning: 'particule interrogative', meaningEn: 'question particle', audio: 'audio/hsk1/hsk1_吗.wav' }
    ],
    tip:
      '吗 est au ton neutre — jamais d\'accent, jamais de montée d\'intonation forcée. C\'est ce qui le distingue de 嘛 (ma, 2e ton, particule d\'évidence « tu sais bien ! »).',
    tipEn:
      '吗 is neutral tone — no stress, no forced intonation rise. That distinguishes it from 嘛 (ma, 2nd tone, "of course!" particle).'
  },
  {
    id: 'ma-vbnotvb',
    title: 'L\'alternative : V-不-V',
    titleEn: 'The alternative: V-not-V',
    body:
      'Une autre façon de poser une question oui/non : **répéter le verbe** avec 不 au milieu.\n' +
      '\n' +
      'Exemples :\n' +
      '- 你是不是法国人 ? = « tu es (ou) n\'es pas français ? »\n' +
      '- 你吃不吃 ? = « tu manges (ou) ne manges pas ? »\n' +
      '\n' +
      'Plus direct et plus vif que 吗, très utilisé à l\'oral.',
    bodyEn:
      'Another way to ask yes/no: repeat the verb with 不 in the middle.\n  • 你是不是法国人? = "you are (or) not French?" = "are you French?"\n  • 你吃不吃? = "you eat (or) don\'t eat?" = "are you eating?"\nMore direct and snappier than 吗. Very common in speech.',
    tip:
      'Tu ne peux pas combiner V-不-V avec 吗 dans la même phrase — ce sont deux structures concurrentes. Choisis l\'une ou l\'autre.',
    tipEn:
      'You cannot combine V-不-V with 吗 in the same sentence — they\'re competing structures. Pick one or the other.'
  },
  {
    id: 'ma-structure',
    title: 'Structure visuelle : 吗 toujours à la FIN',
    titleEn: 'Visual structure: 吗 always at the END',
    body:
      '吗 est une particule interrogative qui se place à la TOUTE FIN de la phrase, après tout le reste — sujet, verbe, objet, complément. À comparer avec V-不-V qui scinde le verbe en deux au milieu de la phrase.',
    bodyEn:
      '吗 is a question particle placed at the VERY END of the sentence, after everything else — subject, verb, object, complement. Compare with V-not-V which splits the verb in two in the middle of the sentence.',
    tokenizedSentences: [
      {
        zh: [
          { text: '你', pinyin: 'nǐ', role: 'sujet' },
          { text: '好', pinyin: 'hǎo', role: 'verbe' },
          { text: '吗', pinyin: 'ma', role: 'particule' },
          { text: '?', role: 'particule' }
        ],
        fr: [
          { text: 'Est-ce que', role: 'particule' },
          { text: 'tu', role: 'sujet' },
          { text: 'vas bien', role: 'verbe' },
          { text: '?', role: 'particule' }
        ],
        note: '吗 transforme une affirmation en question oui/non, juste en s\'ajoutant à la fin.'
      },
      {
        zh: [
          { text: '你', pinyin: 'nǐ', role: 'sujet' },
          { text: '是', pinyin: 'shì', role: 'copule' },
          { text: '法国人', pinyin: 'fǎguórén', role: 'objet' },
          { text: '吗', pinyin: 'ma', role: 'particule' },
          { text: '?', role: 'particule' }
        ],
        fr: [
          { text: 'Tu', role: 'sujet' },
          { text: 'es', role: 'copule' },
          { text: 'français', role: 'objet' },
          { text: '?', role: 'particule' }
        ],
        note: '吗 vient APRÈS l\'objet 法国人, à l\'extrême fin.'
      },
      {
        zh: [
          { text: '你', pinyin: 'nǐ', role: 'sujet' },
          { text: '吃', pinyin: 'chī', role: 'verbe' },
          { text: '不', pinyin: 'bù', role: 'modificateur' },
          { text: '吃', pinyin: 'chī', role: 'verbe' },
          { text: '米饭', pinyin: 'mǐfàn', role: 'objet' },
          { text: '?', role: 'particule' }
        ],
        fr: [
          { text: 'Tu', role: 'sujet' },
          { text: 'manges', role: 'verbe' },
          { text: 'du riz', role: 'objet' },
          { text: '?', role: 'particule' }
        ],
        note: 'V-不-V : on répète 吃 avec 不 au milieu, PAS de 吗 à la fin. Style plus direct.'
      }
    ],
    tip:
      'Astuce : si tu vois 吗 quelque part qui n\'est PAS à la fin, c\'est une faute. Position absolument fixe.',
    tipEn:
      'Hint: if you see 吗 anywhere that\'s NOT the end, it\'s a mistake. Position is absolutely fixed.'
  }
];

// ---------------------------------------------------------------------------
// cecr-a1-grammar-m4 — Le 的 possessif
// ---------------------------------------------------------------------------

export const dePossessiveLearnSections: LessonV2LearnSection[] = [
  {
    id: 'de-basic',
    title: '的 : la particule qui lie',
    titleEn: '的: the linking particle',
    body:
      '的 (de) est l\'une des particules **les plus fréquentes** du chinois. Elle lie un modificateur à un nom — possessif, descriptif, ou relatif.\n' +
      '\n' +
      'Trois usages :\n' +
      '- Possessif : 我的书 = mon livre\n' +
      '- Adjectival : 好的人 = une personne bonne\n' +
      '- Relatif : 我买的书 = le livre que j\'ai acheté\n' +
      '\n' +
      'Règle d\'or : [modificateur] + 的 + [nom].',
    bodyEn:
      '的 (de) is one of the most frequent particles in Chinese. It links a modifier to a noun — possessive, descriptive, relative.\n  • Possessive: 我的书 = my book\n  • Adjectival: 好的人 = a good person\n  • Relative: 我买的书 = the book I bought\nPattern: [modifier] + 的 + [noun].',
    items: [
      { hanzi: '的', pinyin: 'de', meaning: 'particule de liaison', meaningEn: 'linking particle', audio: 'audio/hsk1/hsk1_的.wav' }
    ],
    tip:
      '的 est au ton neutre — extrêmement court et léger. À l\'oral, les Chinois l\'avalent presque. Pour un francophone, le réflexe est d\'appuyer dessus — évite ça, garde-le léger.',
    tipEn:
      '的 is neutral tone — extremely short and light. In speech, Chinese speakers almost swallow it. Don\'t over-emphasize it as a beginner — keep it light.'
  },
  {
    id: 'de-omit',
    title: 'Quand omettre 的',
    titleEn: 'When to omit 的',
    body:
      'Pour les **liens étroits** (famille, école, pays), 的 est souvent supprimé :\n' +
      '- 我妈妈 au lieu de 我的妈妈\n' +
      '- 我家 au lieu de 我的家\n' +
      '- 中国人 au lieu de 中国的人\n' +
      '\n' +
      'Remarque : pour les liens faibles (objets, possessions génériques), on garde 的 : 我的书, 我的车.',
    bodyEn:
      'For close ties (family, school, country), 的 is often dropped:\n  • 我妈妈 instead of 我的妈妈\n  • 我家 instead of 我的家\n  • 中国人 instead of 中国的人\nFor weaker ties (objects, generic possessions), keep 的: 我的书, 我的车.',
    tip:
      'Règle pragmatique : si le possesseur est une personne et le possédé un objet transférable, on garde 的. Si c\'est une relation permanente (famille, nationalité), on l\'omet.',
    tipEn:
      'Rule of thumb: if the possessor is a person and the possessed is a transferable object, keep 的. For permanent relations (family, nationality), drop it.'
  },
  {
    id: 'de-structure',
    title: 'Structure visuelle : [Modificateur] + 的 + [Nom]',
    titleEn: 'Visual structure: [Modifier] + 的 + [Noun]',
    body:
      '的 colle le modificateur (qui possède ou décrit) au nom (ce qui est possédé/décrit). Le rôle Modificateur (rose) en chinois est INVERSÉ par rapport au français — en chinois, le modificateur précède toujours le nom.',
    bodyEn:
      '的 sticks the modifier (possessor / descriptor) to the noun (the possessed / described). The Modifier role (pink) in Chinese is REVERSED compared to English — in Chinese the modifier always comes before the noun.',
    tokenizedSentences: [
      {
        zh: [
          { text: '我', pinyin: 'wǒ', role: 'modificateur' },
          { text: '的', pinyin: 'de', role: 'particule' },
          { text: '书', pinyin: 'shū', role: 'objet' }
        ],
        fr: [
          { text: 'mon', role: 'modificateur' },
          { text: 'livre', role: 'objet' }
        ],
        note: 'Possessif simple : 我 (le possesseur) + 的 + 书 (le possédé). Le 的 fait office de « de » / « \'s ».'
      },
      {
        zh: [
          { text: '好', pinyin: 'hǎo', role: 'modificateur' },
          { text: '的', pinyin: 'de', role: 'particule' },
          { text: '人', pinyin: 'rén', role: 'objet' }
        ],
        fr: [
          { text: 'une bonne', role: 'modificateur' },
          { text: 'personne', role: 'objet' }
        ],
        note: 'Adjectif + 的 + nom : 的 lie l\'adjectif descriptif au nom. ⚠ Ordre inversé vs français : adjectif AVANT le nom en chinois.'
      },
      {
        zh: [
          { text: '我', pinyin: 'wǒ', role: 'modificateur' },
          { text: '妈妈', pinyin: 'māma', role: 'objet' }
        ],
        fr: [
          { text: 'ma', role: 'modificateur' },
          { text: 'maman', role: 'objet' }
        ],
        note: '✓ 的 OMIS : pour la famille, on dit 我妈妈 (pas 我的妈妈). Plus naturel, plus proche.'
      },
      {
        zh: [
          { text: '我', pinyin: 'wǒ', role: 'sujet' },
          { text: '买', pinyin: 'mǎi', role: 'verbe' },
          { text: '的', pinyin: 'de', role: 'particule' },
          { text: '书', pinyin: 'shū', role: 'objet' }
        ],
        fr: [
          { text: 'le', role: 'objet' },
          { text: 'livre', role: 'objet' },
          { text: 'que', role: 'particule' },
          { text: 'j\'ai', role: 'sujet' },
          { text: 'acheté', role: 'verbe' }
        ],
        note: 'RELATIF : « le livre QUE j\'ai acheté ». En chinois, toute la proposition « 我买 » devient modificateur du nom 书, lié par 的.'
      }
    ],
    tip:
      'Mémo visuel : 的 est la « colle de gauche à droite ». À gauche, ce qui qualifie ; à droite, ce qui est qualifié. Toujours dans cet ordre.',
    tipEn:
      'Visual memo: 的 is the «left-to-right glue». On the left, what qualifies; on the right, what is qualified. Always in this order.'
  }
];

// ---------------------------------------------------------------------------
// cecr-a1-grammar-m5 — Les classificateurs 个 & 本
// ---------------------------------------------------------------------------

export const classifiersLearnSections: LessonV2LearnSection[] = [
  {
    id: 'cls-why',
    title: 'Qu\'est-ce qu\'un classificateur ?',
    titleEn: 'What is a measure word?',
    body:
      'En chinois, on ne peut **pas** dire « trois livres » directement. Il faut un mot intermédiaire, appelé **classificateur** (ou « mot de mesure »).\n' +
      '\n' +
      'Règle d\'or : structure obligatoire [chiffre] + [classificateur] + [nom].\n' +
      '\n' +
      'Exemple : 三本书 (sān běn shū) = trois livres (littéralement « trois [reliure] livres »).',
    bodyEn:
      'In Chinese, you CAN\'T say "three books" directly. You need an intermediate word, called a "classifier" (or "measure word").\nMandatory structure: [number] + [classifier] + [noun].\nE.g. 三本书 (sān běn shū) = three books (literally "three [binding] books").',
    tip:
      'Chaque nom a son classificateur préféré. Certains sont logiques (本 pour tout ce qui se feuillette), d\'autres historiques. Avec le temps, on les apprend par paires nom+classificateur.',
    tipEn:
      'Every noun has its preferred classifier. Some are logical (本 for anything you flip through), others historical. Over time, you learn noun+classifier as pairs.'
  },
  {
    id: 'cls-ge',
    title: '个 : le classificateur universel',
    titleEn: '个: the universal classifier',
    body:
      '个 (ge) est **le joker**. Si tu ne connais pas le classificateur spécifique d\'un nom, utilise 个 — ça passe presque toujours.\n' +
      '\n' +
      'Exemples :\n' +
      '- 一个人 = une personne\n' +
      '- 两个苹果 = deux pommes\n' +
      '- 三个朋友 = trois amis\n' +
      '\n' +
      'C\'est le **classificateur** des humains et des objets génériques.',
    bodyEn:
      '个 (ge) is the joker. If you don\'t know a noun\'s specific classifier, use 个 — it almost always works.\nE.g. 一个人 (one person), 两个苹果 (two apples), 三个朋友 (three friends).\nIt\'s the classifier for humans and generic objects.',
    items: [
      { hanzi: '个', pinyin: 'gè', meaning: 'classificateur général', meaningEn: 'general classifier', audio: 'audio/hsk1/hsk1_个.wav' },
      { hanzi: '本', pinyin: 'běn', meaning: 'classificateur pour livres', meaningEn: 'classifier for books', audio: 'audio/hsk1/hsk1_本.wav' },
      { hanzi: '只', pinyin: 'zhī', meaning: 'classificateur pour animaux', meaningEn: 'classifier for animals', audio: 'audio/hsk1/hsk1_只.wav' },
      { hanzi: '块', pinyin: 'kuài', meaning: 'classificateur (morceau, yuan)', meaningEn: 'classifier (piece, yuan)', audio: 'audio/hsk1/hsk1_块.wav' }
    ],
    tip:
      'Attention : 二 (èr) devient 两 (liǎng) devant un classificateur. On dit 两个人 (deux personnes), PAS 二个人. Règle systématique — à intégrer tôt.',
    tipEn:
      'Watch out: 二 (èr) becomes 两 (liǎng) before a classifier. Say 两个人 (two people), NOT 二个人. Systematic rule — absorb it early.'
  }
];

// ═════════════════════════════════════════════════════════════════════════════
// VAGUE A1 — Conversation + Nuances (pivot stratégique)
// 14 nouvelles leçons : 7 Conversation + 7 Nuances. Audios à générer en 2e passe.
// ═════════════════════════════════════════════════════════════════════════════

// === CONVERSATION A1 =========================================================

export const a1ConvM1LearnSections: LessonV2LearnSection[] = [
  {
    id: 'a1-politesse-base',
    title: 'Les 4 mots qui rendent une journée fluide',
    titleEn: 'The 4 words that make a day flow',
    body:
      'Quatre mots forment l\'**ossature sociale** chinoise :\n' +
      '- 请 (qǐng) — s\'il vous plaît / je vous en prie\n' +
      '- 谢谢 (xièxie) — merci\n' +
      '- 不客气 (bú kèqi) — de rien (réponse à 谢谢)\n' +
      '- 对不起 (duìbuqǐ) — pardon\n' +
      '\n' +
      'Règle d\'or : 请 ouvre une demande, **jamais** à la fin (≠ français « svp »).\n' +
      '\n' +
      'Astuce : ajoute 没关系 (méi guānxi, ce n\'est rien — réponse à 对不起) et tu fonctionnes en société.',
    bodyEn:
      '请 (qǐng, please / go ahead), 谢谢 (xièxie, thank you), 不客气 (bú kèqi, you\'re welcome — reply to 谢谢), 对不起 (duìbuqǐ, sorry). These 4 are the social backbone in China. 请 opens a request, never at the end (≠ English «please» at end). 不客气 is universal as reply to 谢谢. Add 没关系 (méi guānxi, no problem — reply to 对不起) and you function socially.',
    items: [
      { hanzi: '请', pinyin: 'qǐng', meaning: 's\'il vous plaît', meaningEn: 'please', audio: 'audio/hsk1/hsk1_请.wav' },
      { hanzi: '谢谢', pinyin: 'xiè xie', meaning: 'merci', meaningEn: 'thank you', audio: 'audio/hsk1/hsk1_谢谢.wav' },
      { hanzi: '不客气', pinyin: 'bú kè qi', meaning: 'de rien', meaningEn: 'you\'re welcome', audio: 'audio/hsk1/hsk1_不客气.wav' },
      { hanzi: '对不起', pinyin: 'duì bu qǐ', meaning: 'pardon', meaningEn: 'sorry', audio: 'audio/hsk1/hsk1_对不起.wav' },
      { hanzi: '没关系', pinyin: 'méi guān xi', meaning: 'pas grave', meaningEn: 'no problem', audio: 'audio/hsk1/hsk1_没关系.wav' }
    ],
    tip:
      '请 se place TOUJOURS au début de la phrase, jamais à la fin : 请坐 (asseyez-vous svp), pas 坐请. C\'est l\'inverse du français.',
    tipEn:
      '请 ALWAYS goes at the start of the phrase, never at the end: 请坐 (sit, please), not 坐请. Opposite of French structure.'
  },
  {
    id: 'a1-politesse-quotidien',
    title: 'Petites formules quotidiennes : 麻烦 / 辛苦了',
    titleEn: 'Daily mini-phrases: 麻烦 / 辛苦了',
    body:
      'Trois formules essentielles du quotidien :\n' +
      '- **麻烦你** (máfan nǐ) — pour demander un service, plus chaleureux que 请. Ex : 麻烦你帮我 = ça t\'embêterait de m\'aider.\n' +
      '- **辛苦了** (xīnkǔ le) — merci pour le travail. À un livreur, un collègue qui a fini une tâche, un taxi qui dépose.\n' +
      '- **加油** (jiāyóu) — courage / vas-y !\n' +
      '\n' +
      'Astuce : universel et chaleureux — l\'oublier sonne **froid**.',
    bodyEn:
      '麻烦你 (máfan nǐ, sorry to trouble you) : to ask a favor, warmer than 请. 麻烦你帮我 = would you mind helping me. 辛苦了 (xīnkǔ le, thanks for the work) : to a delivery person, a colleague after a task, the taxi driver dropping you off. Universal and warm — skipping it sounds cold. 加油 (jiāyóu, chin up / you got this) : to encourage.',
    items: [
      { hanzi: '麻烦', pinyin: 'má fan', meaning: 'déranger, ennui', meaningEn: 'trouble', audio: 'audio/hsk4/hsk4_麻烦.wav' },
      { hanzi: '辛苦了', pinyin: 'xīn kǔ le', meaning: 'merci pour le travail', meaningEn: 'thanks for the work', audio: 'audio/hsk4/hsk4_辛苦.wav' },
      { hanzi: '加油', pinyin: 'jiā yóu', meaning: 'bon courage', meaningEn: 'go for it', audio: 'audio/hsk2/hsk2_加油.wav' },
      { hanzi: '帮', pinyin: 'bāng', meaning: 'aider', meaningEn: 'help', audio: 'audio/hsk2/hsk2_帮.wav' },
      { hanzi: '可以', pinyin: 'kě yǐ', meaning: 'pouvoir, OK', meaningEn: 'can, OK', audio: 'audio/hsk1/hsk1_可以.wav' }
    ],
    tip:
      '辛苦了 est culturellement énorme. À retenir : DÈS qu\'un Chinois vient de faire quelque chose pour toi (te servir, te livrer, t\'aider), 辛苦了 est attendu. Plus chaud que 谢谢.',
    tipEn:
      '辛苦了 is culturally huge. AS SOON as a Chinese person has done something for you (served, delivered, helped), 辛苦了 is expected. Warmer than 谢谢.'
  }
];

export const a1ConvM2LearnSections: LessonV2LearnSection[] = [
  {
    id: 'a1-clarifier',
    title: 'Quand on n\'a pas compris : « 请再说一遍 »',
    titleEn: 'When you didn\'t catch it: «请再说一遍»',
    body:
      'Cinq **phrases-bouées** qui te sortent de presque toutes les impasses A1 :\n' +
      '- 请再说一遍 — redites svp\n' +
      '- 慢一点 — plus lentement\n' +
      '- 我听不懂 — je ne comprends pas (auditivement)\n' +
      '- 你说什么？ — qu\'est-ce que tu dis ?\n' +
      '- 这是什么意思？ — qu\'est-ce que ça veut dire ?\n' +
      '\n' +
      'Astuce : pour épeler un caractère, 这个字怎么写？(comment ça s\'écrit ?).',
    bodyEn:
      'Lifebuoy phrases: 请再说一遍 (please say it again), 慢一点 (slower), 我听不懂 (I don\'t catch what you\'re saying), 你说什么？(what did you say?). To spell a character: 这个字怎么写？(how do you write it?). For meaning: 这是什么意思？(what does it mean?). These 5 phrases get you out of almost any A1 jam.',
    items: [
      { hanzi: '再说一遍', pinyin: 'zài shuō yí biàn', meaning: 'redire, répéter', meaningEn: 'say again', audio: 'audio/hsk2/hsk2_再说.wav' },
      { hanzi: '慢一点', pinyin: 'màn yì diǎn', meaning: 'plus lentement', meaningEn: 'slower', audio: 'audio/hsk2/hsk2_慢.wav' },
      { hanzi: '听不懂', pinyin: 'tīng bu dǒng', meaning: 'ne pas comprendre (audio)', meaningEn: 'can\'t understand (audio)', audio: 'audio/hsk2/hsk2_听.wav' },
      { hanzi: '意思', pinyin: 'yì si', meaning: 'sens, signification', meaningEn: 'meaning', audio: 'audio/hsk2/hsk2_意思.wav' },
      { hanzi: '怎么写', pinyin: 'zěn me xiě', meaning: 'comment écrit-on', meaningEn: 'how to write', audio: 'audio/hsk1/hsk1_怎么.wav' }
    ],
    tip:
      'Distinction CLÉ : 听不懂 (je n\'entends/comprends pas la langue) vs 不知道 (je ne sais pas). Si on te demande « où est la gare ? », réponds 不知道 ; si on te parle trop vite, réponds 我听不懂.',
    tipEn:
      'KEY distinction: 听不懂 (I can\'t make out the language) vs 不知道 (I don\'t know). If asked «where\'s the station?», reply 不知道; if spoken to too fast, reply 我听不懂.'
  },
  {
    id: 'a1-pinyin-help',
    title: 'Demander la prononciation ou le ton',
    titleEn: 'Ask for pronunciation or tone',
      body:
      '怎么读 (zěnme dú) = comment ça se prononce. 这个字怎么读？= ce caractère, comment se prononce-t-il ?\n' +
      '\n' +
      'Pour le ton : 第几声？(quel ton ?). Réponses possibles :\n' +
      '- 第一声 (1er)\n' +
      '- 第二声 (2e)\n' +
      '- 第三声 (3e)\n' +
      '- 第四声 (4e)\n' +
      '\n' +
      'Astuce : la **phrase magique** de l\'apprenant : 我学中文，所以我说得不太好 (j\'apprends, donc je parle pas très bien). Désarme l\'interlocuteur et ajuste son débit.',
    bodyEn:
      '怎么读 (zěnme dú, how is it pronounced). 这个字怎么读？= how is this character pronounced? For the tone: 第几声？(which tone?) — reply: 第一声 (1st), 第二声 (2nd), 第三声 (3rd), 第四声 (4th). To confirm: 是不是 X？(is it X?). Learner\'s magic phrase: 我学中文，所以我说得不太好 (I\'m learning, so I don\'t speak well yet) — disarms the listener, adjusts their pace.',
    items: [
      { hanzi: '怎么读', pinyin: 'zěn me dú', meaning: 'comment ça se prononce', meaningEn: 'how to pronounce', audio: 'audio/hsk1/hsk1_读.wav' },
      { hanzi: '声', pinyin: 'shēng', meaning: 'ton, voix', meaningEn: 'tone, voice', audio: 'audio/hsk1/hsk1_声.wav' },
      { hanzi: '第', pinyin: 'dì', meaning: 'préfixe ordinal', meaningEn: 'ordinal prefix', audio: 'audio/hsk2/hsk2_第.wav' },
      { hanzi: '中文', pinyin: 'zhōng wén', meaning: 'chinois (langue)', meaningEn: 'Chinese (language)', audio: 'audio/hsk1/hsk1_中文.wav' },
      { hanzi: '说', pinyin: 'shuō', meaning: 'dire, parler', meaningEn: 'speak', audio: 'audio/hsk1/hsk1_说.wav' }
    ],
    tip:
      'Astuce d\'or : « 我学中文 » désarme tous les Chinois. Ils basculent automatiquement en mode « patient prof gentil » et ralentissent. Ne pas hésiter à le sortir tôt en conversation.',
    tipEn:
      'Golden tip: «我学中文» disarms every Chinese person. They auto-switch to «patient kind teacher» mode and slow down. Don\'t hesitate to drop it early in conversation.'
  }
];

export const a1ConvM3LearnSections: LessonV2LearnSection[] = [
  {
    id: 'a1-confirmation',
    title: 'Réponses courtes : 是, 对, 好, 行',
    titleEn: 'Short answers: 是, 对, 好, 行',
    body:
      'Le chinois n\'a **pas** d\'équivalent strict de « oui ». Quatre manières selon le contexte :\n' +
      '- 是 — c\'est ça (pour confirmer une identité ou un fait)\n' +
      '- 对 — exact (pour confirmer une info)\n' +
      '- 好 — OK / bien (pour accepter)\n' +
      '- 行 — ça marche (accord pratique)\n' +
      '- 嗯 — mmm (d\'accord léger, oral)\n' +
      '\n' +
      'Attention : pour dire « non », **reprends le verbe** avec 不 (ex : « 你吃吗？ — 不吃 »). Pas de 不 isolé comme « non » en français.',
    bodyEn:
      'Chinese has no strict «yes». 4 ways depending on context: 是 (that\'s it — confirm identity/fact), 对 (right — confirm info), 好 (OK / fine — accept), 行 (works — practical agreement). 嗯 (mmm — light yes, oral). For «no»: repeat the verb with 不: «你吃吗？— 不吃». No standalone 不 as «no» like in English.',
    items: [
      { hanzi: '是', pinyin: 'shì', meaning: 'oui (être)', meaningEn: 'yes (be)', audio: 'audio/hsk1/hsk1_是.wav' },
      { hanzi: '对', pinyin: 'duì', meaning: 'exact, juste', meaningEn: 'right', audio: 'audio/hsk1/hsk1_对.wav' },
      { hanzi: '好', pinyin: 'hǎo', meaning: 'bien, OK', meaningEn: 'good, OK', audio: 'audio/hsk1/hsk1_好.wav' },
      { hanzi: '行', pinyin: 'xíng', meaning: 'ça marche', meaningEn: 'OK, works', audio: 'audio/hsk2/hsk2_行.wav' },
      { hanzi: '嗯', pinyin: 'ǹg', meaning: 'mmm (oui léger)', meaningEn: 'mmm (light yes)', audio: 'audio/hsk2/hsk2_嗯.wav' }
    ],
    tip:
      'Erreur n°1 : utiliser 是 partout. Pour accepter une proposition (« On va au resto ? »), réponds 好 ou 行, pas 是. 是 sert SURTOUT à confirmer une identité ou un fait précis.',
    tipEn:
      'Mistake n°1: using 是 everywhere. To accept a suggestion («Let\'s go eat?»), reply 好 or 行, not 是. 是 is MOSTLY for confirming an identity or precise fact.'
  },
  {
    id: 'a1-comprehension',
    title: 'J\'ai compris : 明白了 / 知道了',
    titleEn: 'I get it: 明白了 / 知道了',
    body:
      'Deux verbes proches mais différents :\n' +
      '- 明白了 — j\'ai compris (saisi le sens)\n' +
      '- 知道了 — j\'ai noté / OK je sais maintenant\n' +
      '\n' +
      'Règle d\'or : 明白 = compréhension **intellectuelle**, 知道 = connaissance/info **reçue**.\n' +
      '\n' +
      'Astuce : pour maintenir la conversation vivante, utilise des petits mots — 然后呢？(et ensuite ?), 真的吗？(vraiment ?), 哦 (ah !), 嗯 (OK), 是吗 (ah bon ?). Sans eux, l\'autre pense que tu ne suis pas.',
    bodyEn:
      '明白了 (I got it — caught the meaning). 知道了 (noted / OK I know now). Difference: 明白 = intellectual understanding; 知道 = info received. To prompt more: 然后呢？(and then?), 真的吗？(really?). To punctuate: 哦 (ah!), 嗯 (OK), 是吗 (oh really?). These little words keep a conversation alive — without them, the other thinks you\'re lost.',
    items: [
      { hanzi: '明白', pinyin: 'míng bai', meaning: 'comprendre', meaningEn: 'understand', audio: 'audio/hsk3/hsk3_明白.wav' },
      { hanzi: '知道', pinyin: 'zhī dào', meaning: 'savoir', meaningEn: 'know', audio: 'audio/hsk2/hsk2_知道.wav' },
      { hanzi: '然后', pinyin: 'rán hòu', meaning: 'ensuite', meaningEn: 'then', audio: 'audio/hsk3/hsk3_然后.wav' },
      { hanzi: '真的', pinyin: 'zhēn de', meaning: 'vraiment', meaningEn: 'really', audio: 'audio/hsk2/hsk2_真.wav' },
      { hanzi: '哦', pinyin: 'ò', meaning: 'ah ! (réaction)', meaningEn: 'oh!', audio: 'audio/hsk1/hsk1_哦.wav' }
    ],
    tip:
      '知道了 quand on te donne une consigne (par ex. « 你要早点来 » → 知道了). 明白了 quand on t\'explique un concept (par ex. « 这个字是 X 的意思 » → 明白了).',
    tipEn:
      '知道了 when given an instruction (e.g. «你要早点来» → 知道了). 明白了 when something is explained (e.g. «这个字是 X 的意思» → 明白了).'
  }
];

export const a1ConvM4LearnSections: LessonV2LearnSection[] = [
  {
    id: 'a1-fillers',
    title: 'Hésiter sans se taire : 那个, 这个, 嗯',
    titleEn: 'Hesitate without going silent: 那个, 这个, 嗯',
    body:
      'Les **remplisseurs** (fillers) te donnent du temps de réfléchir sans sembler perdu :\n' +
      '- 那个 (nèige) — « euh… » (l\'équivalent du « euh »)\n' +
      '- 这个 (zhèige) — idem\n' +
      '- 嗯… (ǹg) — son neutre quand tu cherches\n' +
      '- 怎么说呢 (zěnme shuō ne) — « comment dire »\n' +
      '\n' +
      'Attention : sans ces remplisseurs, un **silence trop long** en chinois est interprété comme « il n\'a pas compris ». Avec eux, tu signales « je réfléchis, ça vient ».',
    bodyEn:
      'Chinese fillers buy you thinking time WITHOUT looking lost. 那个 (nèige, «uh…») — the equivalent of «um». 这个 (zhèige, same). 嗯… (ǹg) — neutral sound while searching. 怎么说呢 (zěnme shuō ne, how to put it). Crucial: without fillers, a long silence in Chinese is interpreted as «didn\'t understand». With them, you signal «I\'m thinking, it\'s coming».',
    items: [
      { hanzi: '那个', pinyin: 'nèi ge', meaning: 'euh, ce/cet', meaningEn: 'um, that', audio: 'audio/hsk1/hsk1_那.wav' },
      { hanzi: '这个', pinyin: 'zhèi ge', meaning: 'euh, ce/cet', meaningEn: 'um, this', audio: 'audio/hsk1/hsk1_这.wav' },
      { hanzi: '嗯', pinyin: 'ǹg', meaning: 'mmm (réflexion)', meaningEn: 'mmm (thinking)', audio: 'audio/hsk2/hsk2_嗯.wav' },
      { hanzi: '怎么说', pinyin: 'zěn me shuō', meaning: 'comment dire', meaningEn: 'how to say', audio: 'audio/hsk1/hsk1_怎么.wav' },
      { hanzi: '比如', pinyin: 'bǐ rú', meaning: 'par exemple', meaningEn: 'for example', audio: 'audio/hsk3/hsk3_比如.wav' }
    ],
    tip:
      'Anecdote piège : 那个 (nèige) sonne phonétiquement comme l\'insulte raciste anglaise « n-word ». Aux États-Unis ou avec un anglophone, prononce 那个 plutôt « nàge » (ton 4) ou évite-le. En Chine, aucun problème.',
    tipEn:
      'Trap anecdote: 那个 (nèige) sounds phonetically like the racist English «n-word». In the US or with an English speaker, pronounce 那个 as «nàge» (tone 4) or avoid. In China, no issue.'
  },
  {
    id: 'a1-extension',
    title: 'Étendre une phrase : 然后, 还有, 比如',
    titleEn: 'Extend a sentence: 然后, 还有, 比如',
    body:
      'Trois connecteurs essentiels :\n' +
      '- 然后 — ensuite\n' +
      '- 还有 — et aussi / il y a encore\n' +
      '- 比如 — par exemple\n' +
      '\n' +
      'Ils permettent d\'enchaîner plusieurs informations sans **casser le rythme** : « 我喜欢看书，然后听音乐，还有跑步，比如周末 ».\n' +
      '\n' +
      'Astuce : bonus 因为 (parce que) pour justifier — « 我学中文，因为我喜欢中国文化 ».',
    bodyEn:
      '然后 (then). 还有 (and also). 比如 (for example). These 3 connectors let you string multiple bits of info without breaking rhythm. «我喜欢看书，然后听音乐，还有跑步，比如周末». Without these connectors, you make isolated sentences with no flow. Bonus: 因为 (because) to justify — «我学中文，因为我喜欢中国文化».',
    items: [
      { hanzi: '然后', pinyin: 'rán hòu', meaning: 'ensuite', meaningEn: 'then', audio: 'audio/hsk3/hsk3_然后.wav' },
      { hanzi: '还有', pinyin: 'hái yǒu', meaning: 'et aussi', meaningEn: 'and also', audio: 'audio/hsk2/hsk2_还有.wav' },
      { hanzi: '因为', pinyin: 'yīn wèi', meaning: 'parce que', meaningEn: 'because', audio: 'audio/hsk2/hsk2_因为.wav' },
      { hanzi: '所以', pinyin: 'suǒ yǐ', meaning: 'donc', meaningEn: 'so', audio: 'audio/hsk2/hsk2_所以.wav' },
      { hanzi: '但是', pinyin: 'dàn shì', meaning: 'mais', meaningEn: 'but', audio: 'audio/hsk2/hsk2_但是.wav' }
    ],
    tip:
      'En chinois, 因为 X 所以 Y va souvent ensemble (« parce que X, donc Y »), même quand le français se contenterait du seul « parce que ». Ça structure mieux la phrase.',
    tipEn:
      'In Chinese, 因为 X 所以 Y often go together («because X, therefore Y»), even when English would just use «because». It structures the sentence better.'
  }
];

export const a1ConvM5LearnSections: LessonV2LearnSection[] = [
  {
    id: 'a1-cafe',
    title: 'Commander au café : « 我要一杯咖啡 »',
    titleEn: 'Ordering at a café: «我要一杯咖啡»',
      body:
      'Phrase-clé : 我要一杯 X = je veux un X (boisson). 杯 est le **classificateur** tasse/verre.\n' +
      '\n' +
      'Exemples :\n' +
      '- 我要一杯咖啡 — un café\n' +
      '- 一杯茶 — un thé\n' +
      '- 一杯水 — un verre d\'eau\n' +
      '\n' +
      'Pour préciser : 大杯 (grand) / 小杯 (petit), 热的 (chaud) / 冰的 (glacé).\n' +
      '\n' +
      'Astuce : pour payer, 多少钱？(combien ?), 刷卡 (payer par carte), 微信支付 (WeChat Pay).',
    bodyEn:
      'Key phrase: 我要一杯 X (I want a X — drink). 杯 = cup/glass classifier. 我要一杯咖啡 (a coffee), 一杯茶 (a tea), 一杯水 (a glass of water). To specify: 大杯 (large) / 小杯 (small), 热的 (hot) / 冰的 (iced). Pay: 多少钱? (how much?), 刷卡 (card payment), 微信支付 (WeChat Pay). Closing: 这是我的卡 (here\'s my card) or just scan QR.',
    items: [
      { hanzi: '要', pinyin: 'yào', meaning: 'vouloir', meaningEn: 'want', audio: 'audio/hsk1/hsk1_要.wav' },
      { hanzi: '杯', pinyin: 'bēi', meaning: 'tasse, verre', meaningEn: 'cup, glass', audio: 'audio/hsk1/hsk1_杯.wav' },
      { hanzi: '咖啡', pinyin: 'kā fēi', meaning: 'café', meaningEn: 'coffee', audio: 'audio/hsk2/hsk2_咖啡.wav' },
      { hanzi: '热', pinyin: 'rè', meaning: 'chaud', meaningEn: 'hot', audio: 'audio/hsk1/hsk1_热.wav' },
      { hanzi: '冰', pinyin: 'bīng', meaning: 'glace, glacé', meaningEn: 'ice', audio: 'audio/hsk5/hsk5_冰.wav' }
    ],
    tip:
      'En Chine, presque tout se paye au QR code WeChat ou Alipay. Si tu n\'as pas, dis « 我可以刷卡吗？» (je peux payer par carte ?) — pas toujours accepté en petits commerces.',
    tipEn:
      'In China, almost everything is paid by WeChat or Alipay QR code. If you don\'t have, say «我可以刷卡吗？» (can I pay by card?) — not always accepted in small shops.'
  },
  {
    id: 'a1-taxi',
    title: 'Prendre un taxi / Didi',
    titleEn: 'Taking a taxi / Didi',
    body:
      'Phrase-clé : 请去 X = allez à X svp.\n' +
      '\n' +
      'Destinations courantes :\n' +
      '- 请去机场 — à l\'aéroport\n' +
      '- 请去人民广场 — place du peuple\n' +
      '\n' +
      'Pendant le trajet : 慢一点 (plus lentement), 这里 (ici), 停一下 (arrêtez-vous). Arrivée : 多少钱？(combien ?), 收据 (reçu).\n' +
      '\n' +
      'Astuce : pour donner une adresse, **montre ton portable** en disant 这是地址. Aujourd\'hui Didi 滴滴 a remplacé 80 % des taxis hélés — tu commandes via app, le prix s\'affiche.',
    bodyEn:
      '请去 X (please take me to X). 请去机场 (to the airport), 请去人民广场 (People\'s Square). Give an address: 这是地址 (here\'s the address) + show your phone. During the ride: 慢一点 (slower), 这里 (here), 停一下 (stop). Arrival: 多少钱? (how much?), 收据 (receipt — for official taxis). Today Didi 滴滴 has replaced 80% of street-hailed taxis: order via app, price shown.',
    items: [
      { hanzi: '去', pinyin: 'qù', meaning: 'aller', meaningEn: 'go', audio: 'audio/hsk1/hsk1_去.wav' },
      { hanzi: '机场', pinyin: 'jī chǎng', meaning: 'aéroport', meaningEn: 'airport', audio: 'audio/hsk2/hsk2_机场.wav' },
      { hanzi: '地址', pinyin: 'dì zhǐ', meaning: 'adresse', meaningEn: 'address', audio: 'audio/hsk4/hsk4_地址.wav' },
      { hanzi: '停', pinyin: 'tíng', meaning: 'arrêter', meaningEn: 'stop', audio: 'audio/hsk4/hsk4_停.wav' },
      { hanzi: '滴滴', pinyin: 'dī dī', meaning: 'Didi (Uber chinois)', meaningEn: 'Didi (Chinese Uber)', audio: 'audio/hsk6/hsk6_滴滴.wav' }
    ],
    tip:
      'Astuce : pour éviter de mal prononcer une adresse, montre l\'écran du téléphone au chauffeur en disant 这里 (zhèlǐ, ici). Plus efficace que de batailler avec les tons.',
    tipEn:
      'Tip: to avoid mispronouncing an address, show your phone screen to the driver saying 这里 (zhèlǐ, here). More efficient than struggling with tones.'
  }
];

export const a1ConvM6LearnSections: LessonV2LearnSection[] = [
  {
    id: 'a1-conge',
    title: '« 我先走了 » — partir poliment',
    titleEn: '«我先走了» — leave politely',
    body:
      'Annoncer la sortie :\n' +
      '- 我先走了 — je m\'en vais d\'abord\n' +
      '- 我得走了 — je dois y aller\n' +
      '\n' +
      'Plus **chaleureux** que 拜拜 (qui sonne abrupt).\n' +
      '\n' +
      'Astuce : justifie brièvement (我有事 = j\'ai à faire, 时间不早了 = il se fait tard) puis prépare la suite (改天见, 回头见, 下次见 = à plus tard).',
    bodyEn:
      'Announce exit: 我先走了 (I\'ll head out first), 我得走了 (I gotta go). Warmer than 拜拜 (which sounds abrupt). Briefly justify: 我有事 (I have something to do), 时间不早了 (it\'s getting late). Set up the next: 改天见 (see you another day), 回头见 (see you later), 下次见 (until next time).',
    items: [
      { hanzi: '先', pinyin: 'xiān', meaning: 'd\'abord', meaningEn: 'first', audio: 'audio/hsk2/hsk2_先.wav' },
      { hanzi: '走', pinyin: 'zǒu', meaning: 'partir, marcher', meaningEn: 'leave, walk', audio: 'audio/hsk1/hsk1_走.wav' },
      { hanzi: '改天', pinyin: 'gǎi tiān', meaning: 'un autre jour', meaningEn: 'another day', audio: 'audio/hsk5/hsk5_改天.wav' },
      { hanzi: '回头', pinyin: 'huí tóu', meaning: 'plus tard (oral)', meaningEn: 'later (spoken)', audio: 'audio/hsk5/hsk5_回头.wav' },
      { hanzi: '下次', pinyin: 'xià cì', meaning: 'la prochaine fois', meaningEn: 'next time', audio: 'audio/hsk2/hsk2_下次.wav' }
    ],
    tip:
      'Une vraie sortie chinoise = 3 temps : (1) annonce 我先走了, (2) raison brève 我有点事, (3) projection 改天见. Sauter une étape sonne brusque. Le tout en 5 secondes.',
    tipEn:
      'A real Chinese exit = 3 steps: (1) announce 我先走了, (2) brief reason 我有点事, (3) projection 改天见. Skipping a step sounds abrupt. All within 5 seconds.'
  },
  {
    id: 'a1-care',
    title: '« 路上小心 » — la formule chaleureuse universelle',
    titleEn: '«路上小心» — the universal warm closer',
    body:
      '路上小心 (fais attention sur la route) : formule **toujours** appréciée. Dite par celui qui **reste** à celui qui **part**. Marche pour un trajet de 5 min ou de 3 h.\n' +
      '\n' +
      'Variantes :\n' +
      '- 慢走 — va doucement (par les commerçants)\n' +
      '- 一路平安 — bon voyage en sécurité (pour un long trajet)\n' +
      '\n' +
      'Astuce : pour rester en contact, 保持联系 (on garde contact), 有空联系 (contacte-moi quand tu as le temps).',
    bodyEn:
      '路上小心 (take care on the way): a formula ALWAYS appreciated. Said by the one STAYING to the one LEAVING. Works for 5-min or 3-hour trips. Variants: 慢走 (take it easy — by shopkeepers), 一路平安 (safe travels — for a long trip). To close networks: 保持联系 (keep in touch), 有空联系 (hit me up when free).',
    items: [
      { hanzi: '路上', pinyin: 'lù shang', meaning: 'sur la route', meaningEn: 'on the road', audio: 'audio/hsk3/hsk3_路上.wav' },
      { hanzi: '小心', pinyin: 'xiǎo xīn', meaning: 'fais attention', meaningEn: 'be careful', audio: 'audio/hsk3/hsk3_小心.wav' },
      { hanzi: '慢走', pinyin: 'màn zǒu', meaning: 'va doucement', meaningEn: 'take it easy', audio: 'audio/hsk2/hsk2_慢走.wav' },
      { hanzi: '联系', pinyin: 'lián xì', meaning: 'contact', meaningEn: 'contact', audio: 'audio/hsk4/hsk4_联系.wav' },
      { hanzi: '保持', pinyin: 'bǎo chí', meaning: 'maintenir', meaningEn: 'keep, maintain', audio: 'audio/hsk5/hsk5_保持.wav' }
    ],
    tip:
      'Si tu sors d\'un magasin/restaurant chinois, le commerçant te dira presque toujours 慢走 (« va doucement »). Pas une vraie demande, juste une formule de politesse. Tu peux répondre 谢谢 ou un signe de tête.',
    tipEn:
      'When leaving a Chinese shop/restaurant, the owner will almost always say 慢走 («take it easy»). Not a real request, just a courtesy. Reply 谢谢 or a head nod.'
  }
];

export const a1ConvM7LearnSections: LessonV2LearnSection[] = [
  {
    id: 'a1-service',
    title: '« 能不能 X ? » — demander un service simple',
    titleEn: '«能不能 X?» — ask for a simple favor',
    body:
      '能不能 + verbe (pouvez-vous… ?) : la formule **la plus polie** pour demander quelque chose à un inconnu. Exemple : 能不能帮我？(puis-je vous demander de m\'aider ?).\n' +
      '\n' +
      'Variantes :\n' +
      '- 可不可以 + verbe\n' +
      '- 麻烦你 + verbe\n' +
      '\n' +
      'Règle : pour décliner poliment, **toujours** commencer par 不好意思 (不好意思，我有事). Ça adoucit massivement.',
    bodyEn:
      '能不能 + verb (can you…?) : the politest way to ask something of a stranger. 能不能帮我？(could you help me?). Variants: 可不可以 + verb, 麻烦你 + verb. To politely decline: 不好意思，我有事. Always start with 不好意思 = massively softens.',
    items: [
      { hanzi: '能', pinyin: 'néng', meaning: 'pouvoir', meaningEn: 'can, be able', audio: 'audio/hsk1/hsk1_能.wav' },
      { hanzi: '可不可以', pinyin: 'kě bu kě yǐ', meaning: 'est-ce possible', meaningEn: 'is it possible', audio: 'audio/hsk1/hsk1_可以.wav' },
      { hanzi: '帮我', pinyin: 'bāng wǒ', meaning: 'm\'aider', meaningEn: 'help me', audio: 'audio/hsk2/hsk2_帮.wav' },
      { hanzi: '不好意思', pinyin: 'bù hǎo yì si', meaning: 'pardon, désolé', meaningEn: 'excuse me, sorry', audio: 'audio/hsk2/hsk2_不好意思.wav' },
      { hanzi: '事', pinyin: 'shì', meaning: 'affaire, chose', meaningEn: 'matter, thing', audio: 'audio/hsk1/hsk1_事.wav' }
    ],
    tip:
      'La structure « 能不能 + V » est plus polie que « 你 + V » direct. Compare : 帮我 ! (impératif, sec) vs 能不能帮我 ? (poli, adouci). Pour demander à un inconnu, toujours la 2e forme.',
    tipEn:
      'The «能不能 + V» structure is politer than direct «你 + V». Compare: 帮我！(imperative, blunt) vs 能不能帮我？(polite, softened). To ask a stranger, always use the 2nd form.'
  },
  {
    id: 'a1-direction',
    title: 'Demander son chemin : « 在哪儿 ? »',
    titleEn: 'Ask the way: «在哪儿?»',
    body:
      'Demander un lieu : X 在哪儿？(où est X ?). Exemples : 厕所在哪儿？(les toilettes ?), 地铁站在哪儿？(la station de métro ?).\n' +
      '\n' +
      'Réponses possibles :\n' +
      '- 一直走 — tout droit\n' +
      '- 左转 — à gauche\n' +
      '- 右转 — à droite\n' +
      '- 在 X 旁边 — à côté de X\n' +
      '\n' +
      'Astuce : si tu ne comprends pas, demande 慢一点 + 怎么去？ ou 你能写一下吗？(tu peux l\'écrire ?).',
    bodyEn:
      'Ask for a place: X 在哪儿？(where is X?). 厕所在哪儿？(toilets?), 地铁站在哪儿？(metro station?). Possible replies: 一直走 (straight ahead), 左转 (turn left), 右转 (turn right), 在 X 旁边 (next to X). If you don\'t catch it: 慢一点 + 怎么去？ or 你能写一下吗？(can you write it?).',
    items: [
      { hanzi: '哪儿', pinyin: 'nǎr', meaning: 'où', meaningEn: 'where', audio: 'audio/hsk1/hsk1_哪儿.wav' },
      { hanzi: '一直', pinyin: 'yì zhí', meaning: 'tout droit', meaningEn: 'straight', audio: 'audio/hsk3/hsk3_一直.wav' },
      { hanzi: '左', pinyin: 'zuǒ', meaning: 'gauche', meaningEn: 'left', audio: 'audio/hsk2/hsk2_左.wav' },
      { hanzi: '右', pinyin: 'yòu', meaning: 'droite', meaningEn: 'right', audio: 'audio/hsk2/hsk2_右.wav' },
      { hanzi: '旁边', pinyin: 'páng biān', meaning: 'à côté', meaningEn: 'next to', audio: 'audio/hsk2/hsk2_旁边.wav' }
    ],
    tip:
      'Astuce : ouvre 高德地图 (gāo dé dìtú) ou 百度地图 (bǎidù dìtú) sur ton téléphone. Plus fiable que demander aux passants car les Chinois donnent rarement des distances précises (« pas loin », « pas si proche »).',
    tipEn:
      'Tip: open 高德地图 (gāo dé dìtú) or 百度地图 (bǎidù dìtú) on your phone. More reliable than asking passers-by, since Chinese rarely give precise distances («not far», «not so close»).'
  }
];

// === NUANCES A1 ==============================================================

export const a1NuancesM1LearnSections: LessonV2LearnSection[] = [
  {
    id: 'a1-er-liang',
    title: '二 vs 两 — deux « deux » qui ne s\'utilisent pas pareil',
    titleEn: '二 vs 两 — two «twos» used differently',
    body:
      'Deux mots pour « deux » avec des usages **différents**.\n' +
      '\n' +
      '二 (èr) = le chiffre 2 dans l\'**abstrait** :\n' +
      '- compter (一二三 = 1, 2, 3)\n' +
      '- nombres composés (十二 = 12, 二十 = 20)\n' +
      '- positions ordinales (第二 = 2e)\n' +
      '- mois (二月 = février)\n' +
      '\n' +
      '两 (liǎng) = 2 devant un **classificateur** :\n' +
      '- 两个人 (deux personnes)\n' +
      '- 两本书 (deux livres)\n' +
      '- 两次 (deux fois)\n' +
      '\n' +
      'Règle d\'or : 两 + classificateur. **Jamais** 二个人.\n' +
      '\n' +
      'Exception : pour l\'heure on dit 两点 (2 h), mais 二月 (février) — le 月 fonctionne comme un ordinal.',
    bodyEn:
      '二 (èr) = the number 2 in the abstract: counting (一二三 = 1, 2, 3), compound numbers (十二 = 12, 二十 = 20), ordinals (第二 = 2nd), months (二月 = February). 两 (liǎng) = 2 before a classifier. 两个人 (two people), 两本书 (two books), 两次 (twice). GOLDEN RULE: 两 + classifier. NEVER 二个人. Frequent exception for time: 两点 (2 o\'clock) but 二月 (February, the month) — the 月 functions as an ordinal, not a classifier.',
    items: [
      { hanzi: '二', pinyin: 'èr', meaning: 'deux (chiffre)', meaningEn: 'two (digit)', audio: 'audio/hsk1/hsk1_二.wav' },
      { hanzi: '两', pinyin: 'liǎng', meaning: 'deux (+ classif.)', meaningEn: 'two (+ classif.)', audio: 'audio/hsk2/hsk2_两.wav' },
      { hanzi: '个', pinyin: 'gè', meaning: 'classificateur général', meaningEn: 'general classifier', audio: 'audio/hsk1/hsk1_个.wav' },
      { hanzi: '本', pinyin: 'běn', meaning: 'classif. livres', meaningEn: 'classif. books', audio: 'audio/hsk1/hsk1_本.wav' },
      { hanzi: '次', pinyin: 'cì', meaning: 'fois', meaningEn: 'time(s)', audio: 'audio/hsk2/hsk2_次.wav' }
    ],
    tip:
      'Test rapide : si tu peux remplacer le « deux » français par « 2e » (ordinal) ou par un chiffre dans une suite, c\'est 二. Si c\'est suivi d\'un mot quantifiable, c\'est 两.',
    tipEn:
      'Quick test: if you can replace English «two» by «2nd» (ordinal) or it\'s a digit in a sequence, use 二. If followed by a countable noun, use 两.'
  },
  {
    id: 'a1-yiqian-liangqian',
    title: 'Cas spéciaux : 200, 2000, et 22',
    titleEn: 'Special cases: 200, 2000, and 22',
    body:
      'Pour les grands nombres :\n' +
      '- 200 = 二百 OU 两百 (les deux acceptés)\n' +
      '- 2000 = 两千 (préféré) ou 二千\n' +
      '- 20 000 = 两万\n' +
      '- 22 = 二十二 (toujours 二, pas 两)\n' +
      '\n' +
      'Règle d\'or : devant 百/千/万, 两 prend le dessus, surtout en début de nombre.\n' +
      '\n' +
      'Astuce : plus tu montes en grandeur, plus 两 est **naturel**. À l\'oral, suis ce que tu entends.',
    bodyEn:
      'Big numbers: 200 = 二百 OR 两百 (both accepted). 2000 = 两千 (preferred) or 二千. 20,000 = 两万. For 22: 二十二 (always 二, not 两). Rule: before 百/千/万 (hundreds/thousands/tens of thousands), 两 takes over, especially at the start of a number. But 二十 (20), 二十二 (22) stay stable with 二. The bigger the number, the more 两 feels natural. In speech, follow what you hear.',
    items: [
      { hanzi: '百', pinyin: 'bǎi', meaning: 'cent', meaningEn: 'hundred', audio: 'audio/hsk2/hsk2_百.wav' },
      { hanzi: '千', pinyin: 'qiān', meaning: 'mille', meaningEn: 'thousand', audio: 'audio/hsk2/hsk2_千.wav' },
      { hanzi: '万', pinyin: 'wàn', meaning: 'dix mille', meaningEn: 'ten thousand', audio: 'audio/hsk3/hsk3_万.wav' },
      { hanzi: '两百', pinyin: 'liǎng bǎi', meaning: '200', meaningEn: '200', audio: 'audio/hsk2/hsk2_两.wav' },
      { hanzi: '两千', pinyin: 'liǎng qiān', meaning: '2000', meaningEn: '2000', audio: 'audio/hsk2/hsk2_两.wav' }
    ],
    tip:
      'Au quotidien, dans les petits commerces : « 两百块 » (200 yuans) est plus courant que « 二百块 ». Pour 220, on dit « 两百二十 » (la seconde fois c\'est 二 dans la dizaine).',
    tipEn:
      'In daily life, in small shops: «两百块» (200 yuan) is more common than «二百块». For 220, say «两百二十» (the second one is 二 in the tens place).'
  }
];

export const a1NuancesM2LearnSections: LessonV2LearnSection[] = [
  {
    id: 'a1-ni-nin',
    title: '你 vs 您 — tu et vous (poli)',
    titleEn: '你 vs 您 — informal vs formal you',
    body:
      '你 (nǐ) = tu (informel, neutre par défaut entre adultes du même âge). 您 (nín) = vous (poli, marque de respect).\n' +
      '\n' +
      'Utilise 您 avec :\n' +
      '- quelqu\'un de plus âgé\n' +
      '- un supérieur hiérarchique\n' +
      '- un client (si tu es vendeur)\n' +
      '- un inconnu visiblement plus âgé\n' +
      '\n' +
      'Exception : **jamais** « 您们 » au pluriel — on dit « 你们 ».\n' +
      '\n' +
      'Remarque : entre amis et collègues du même rang, 你 est **normal**, pas familier. Le « vous de politesse » français est plus large que 您.',
    bodyEn:
      '你 (nǐ) = you (informal, default neutral between adults of same age). 您 (nín) = formal you (respect marker). When to use 您: with someone older, a superior, a customer (if you\'re a seller), a visibly older stranger. 您 keeps «您好» (formal hello), NEVER «您们» plural — say «你们». Difference from English «you»: between friends and same-rank colleagues, 你 is NORMAL, not familiar.',
    items: [
      { hanzi: '你', pinyin: 'nǐ', meaning: 'tu', meaningEn: 'you (informal)', audio: 'audio/hsk1/hsk1_你.wav' },
      { hanzi: '您', pinyin: 'nín', meaning: 'vous (poli)', meaningEn: 'you (formal)', audio: 'audio/hsk1/hsk1_您.wav' },
      { hanzi: '你们', pinyin: 'nǐ men', meaning: 'vous (pluriel)', meaningEn: 'you (plural)', audio: 'audio/hsk1/hsk1_你们.wav' },
      { hanzi: '您好', pinyin: 'nín hǎo', meaning: 'bonjour (poli)', meaningEn: 'hello (formal)', audio: 'audio/hsk1/hsk1_您好.wav' },
      { hanzi: '客户', pinyin: 'kè hù', meaning: 'client', meaningEn: 'customer', audio: 'audio/hsk5/hsk5_客户.wav' }
    ],
    tip:
      'Si tu hésites en début de conversation, utilise 您 — tu peux toujours redescendre vers 你 si l\'autre te le propose (« 叫我 X 就行 »). L\'inverse (passer de 你 à 您) crée un froid.',
    tipEn:
      'If you hesitate at the start of a conversation, use 您 — you can always drop down to 你 if the other suggests it («叫我 X 就行»). The reverse (你 → 您) creates awkwardness.'
  },
  {
    id: 'a1-titres-respect',
    title: 'Marques de respect : 老师, 师傅, 先生',
    titleEn: 'Marks of respect: 老师, 师傅, 先生',
    body:
      'Au-delà de 您, on respecte par des **titres** :\n' +
      '- 老师 (lǎoshī, professeur) — pour **tout** enseignant ou expert dans son domaine, même hors école\n' +
      '- 师傅 (shīfu, maître) — pour les artisans, taxis, chauffeurs : 师傅，请去 X\n' +
      '- 先生 (xiānsheng) — Mr/sir, formel\n' +
      '- 女士 (nǚshì) — Mrs/ma\'am, formel\n' +
      '\n' +
      'Attention : 小姐 (xiǎojiě, mademoiselle) est devenu un **piège** — connote « péripatéticienne » dans certaines régions. Préfère 美女 (oral) ou 女士 (formel).',
    bodyEn:
      'Beyond 您, respect is shown via TITLES. 老师 (lǎoshī, teacher) — used for ANY educator or expert. 师傅 (shīfu, master) — for artisans, taxis, drivers: 师傅，请去 X. 先生 (xiānsheng, mister) — Mr/sir, formal. 女士 (nǚshì, madam) — Mrs/ma\'am formal. 小姐 (xiǎojiě, miss) — NOW A TRAP: connotes «sex worker» in some regions. Prefer 美女 (spoken) or 女士 (formal).',
    items: [
      { hanzi: '老师', pinyin: 'lǎo shī', meaning: 'professeur', meaningEn: 'teacher', audio: 'audio/hsk1/hsk1_老师.wav' },
      { hanzi: '师傅', pinyin: 'shī fu', meaning: 'maître, monsieur', meaningEn: 'master, sir', audio: 'audio/hsk5/hsk5_师傅.wav' },
      { hanzi: '先生', pinyin: 'xiān sheng', meaning: 'monsieur', meaningEn: 'mister', audio: 'audio/hsk1/hsk1_先生.wav' },
      { hanzi: '女士', pinyin: 'nǚ shì', meaning: 'madame', meaningEn: 'madam', audio: 'audio/hsk5/hsk5_女士.wav' },
      { hanzi: '美女', pinyin: 'měi nǚ', meaning: 'mademoiselle (oral)', meaningEn: 'miss (spoken)', audio: 'audio/hsk4/hsk4_美女.wav' }
    ],
    tip:
      'Astuce : devant un taxi/chauffeur Didi, dis « 师傅 ». C\'est le mot qui fluidifie tout. Plus chaleureux que 先生 et culturellement reconnu.',
    tipEn:
      'Tip: with a taxi/Didi driver, say «师傅». It\'s the word that smooths everything. Warmer than 先生 and culturally recognized.'
  }
];

export const a1NuancesM3LearnSections: LessonV2LearnSection[] = [
  {
    id: 'a1-shi-zai-you',
    title: '是 vs 在 vs 有 — trois « être » différents',
    titleEn: '是 vs 在 vs 有 — three different «be»',
    body:
      'Règle d\'or : le français « être » se sépare en **trois verbes** en chinois.\n' +
      '\n' +
      '- 是 (être = identité) : 我是法国人 = je suis français\n' +
      '- 在 (être = position) : 我在家 = je suis à la maison\n' +
      '- 有 (il y a / avoir) : 这里有一本书 = il y a un livre ici\n' +
      '\n' +
      'Attention : pièges fréquents :\n' +
      '- « il fait beau » → 天气很好 (**pas** 天气是好)\n' +
      '- « j\'ai 20 ans » → 我二十岁 (**pas** 我有二十岁)\n' +
      '\n' +
      'Le chinois préfère souvent l\'adjectif sans verbe quand on décrit une qualité.',
    bodyEn:
      'English «be» splits into 3 verbs in Chinese. 是 (be = identity). 我是法国人 = I am French. 在 (be = location). 我在家 = I am at home. 有 (there is / have). 这里有一本书 = there\'s a book here. COMMON TRAP: for «the weather is nice» → 天气很好 (NOT 天气是好); for «I am 20» → 我二十岁 (NOT 我有二十岁). Chinese often prefers an adjective without a verb when describing a quality.',
    items: [
      { hanzi: '是', pinyin: 'shì', meaning: 'être (identité)', meaningEn: 'be (identity)', audio: 'audio/hsk1/hsk1_是.wav' },
      { hanzi: '在', pinyin: 'zài', meaning: 'être (lieu)', meaningEn: 'be (place)', audio: 'audio/hsk1/hsk1_在.wav' },
      { hanzi: '有', pinyin: 'yǒu', meaning: 'avoir, il y a', meaningEn: 'have, there is', audio: 'audio/hsk1/hsk1_有.wav' },
      { hanzi: '没有', pinyin: 'méi yǒu', meaning: 'ne pas avoir', meaningEn: 'not have', audio: 'audio/hsk1/hsk1_没有.wav' },
      { hanzi: '里', pinyin: 'lǐ', meaning: 'à l\'intérieur', meaningEn: 'inside', audio: 'audio/hsk1/hsk1_里.wav' }
    ],
    tip:
      'Test simple : remplace en français « être » par « = » → 是 (X = Y). Par « se trouver à » → 在. Par « il y a » → 有. Si tu hésites avec un adjectif (« il est grand »), c\'est SOUVENT pas de verbe : 他高 ou 他很高.',
    tipEn:
      'Simple test: replace English «be» with «=» → 是 (X = Y). With «be located at» → 在. With «there is» → 有. If you hesitate with an adjective («he is tall»), it\'s OFTEN no verb: 他高 or 他很高.'
  },
  {
    id: 'a1-very-vs-be',
    title: 'Le 很 invisible : « 我很好 » sans « être »',
    titleEn: 'The invisible 很: «我很好» with no «be»',
    body:
      '« 我很好 » (wǒ hěn hǎo) ne signifie **pas** « je vais TRÈS bien » mais juste « je vais bien ».\n' +
      '\n' +
      'Règle d\'or : 很 (très) est un **pivot grammatical** devant un adjectif quand il n\'y a pas de verbe « être ».\n' +
      '\n' +
      'Attention : sans 很, la phrase devient une comparaison implicite (« je vais bien... contrairement à toi ? ») :\n' +
      '- 我很好 = je vais bien (état neutre)\n' +
      '- 我好 = sous-entendu : et toi pas\n' +
      '\n' +
      'Adjectif seul = comparaison ; 很 + adjectif = état neutre.',
    bodyEn:
      '«我很好» (wǒ hěn hǎo) does NOT mean «I\'m VERY well» but just «I\'m well». 很 (very) is a GRAMMATICAL PIVOT before an adjective when no «be» verb is present. Without 很, the sentence becomes an implicit comparison («I\'m fine... unlike you?»). REMEMBER: bare adjective = comparison; 很 + adjective = neutral state.',
    items: [
      { hanzi: '很', pinyin: 'hěn', meaning: 'très (souvent invisible)', meaningEn: 'very (often invisible)', audio: 'audio/hsk1/hsk1_很.wav' },
      { hanzi: '好', pinyin: 'hǎo', meaning: 'bon, bien', meaningEn: 'good, well', audio: 'audio/hsk1/hsk1_好.wav' },
      { hanzi: '高', pinyin: 'gāo', meaning: 'grand, haut', meaningEn: 'tall', audio: 'audio/hsk2/hsk2_高.wav' },
      { hanzi: '累', pinyin: 'lèi', meaning: 'fatigué', meaningEn: 'tired', audio: 'audio/hsk2/hsk2_累.wav' },
      { hanzi: '忙', pinyin: 'máng', meaning: 'occupé', meaningEn: 'busy', audio: 'audio/hsk1/hsk1_忙.wav' }
    ],
    tip:
      'Pour dire « TRÈS bien » avec emphase réelle, monte d\'un cran : 我非常好 (très bien) ou 我特别好 (extrêmement bien). 我很好 = juste « ça va ».',
    tipEn:
      'To say «VERY well» with real emphasis, go up a notch: 我非常好 (very well) or 我特别好 (extremely well). 我很好 = just «I\'m fine».'
  }
];

export const a1NuancesM4LearnSections: LessonV2LearnSection[] = [
  {
    id: 'a1-ye-dou',
    title: '也 vs 都 — aussi vs tous',
    titleEn: '也 vs 都 — also vs all',
    body:
      'Deux adverbes proches mais distincts :\n' +
      '- **也** (yě, aussi) — lie un sujet à un précédent. Ex : 我喜欢茶，他也喜欢茶 = j\'aime le thé, il aime aussi le thé.\n' +
      '- **都** (dōu, tous) — récapitule plusieurs sujets en un seul verbe. Ex : 我们都喜欢茶 = nous aimons tous le thé.\n' +
      '\n' +
      'Règle d\'or : 也 et 都 vont **avant** le verbe. Ils peuvent coexister : 我也都喜欢 = moi aussi je les aime tous.\n' +
      '\n' +
      'Attention : erreur classique francophone « j\'aime aussi ça » → 我喜欢也 ✗. Correct : 我也喜欢.',
    bodyEn:
      '也 (yě, also). Links a subject to a previous one. 我喜欢茶，他也喜欢茶 = I like tea, he also likes tea. 都 (dōu, all). Sums up several subjects into one verb. 我们都喜欢茶 = we all like tea. TRAP: they can COEXIST. 我也都喜欢 = me too I like them all. POSITION: 也 and 都 go BEFORE the verb. Common mistake: «I also like that» → 我喜欢也 ✗; correct → 我也喜欢.',
    items: [
      { hanzi: '也', pinyin: 'yě', meaning: 'aussi', meaningEn: 'also, too', audio: 'audio/hsk1/hsk1_也.wav' },
      { hanzi: '都', pinyin: 'dōu', meaning: 'tous, tout', meaningEn: 'all', audio: 'audio/hsk1/hsk1_都.wav' },
      { hanzi: '我们', pinyin: 'wǒ men', meaning: 'nous', meaningEn: 'we', audio: 'audio/hsk1/hsk1_我们.wav' },
      { hanzi: '喜欢', pinyin: 'xǐ huan', meaning: 'aimer', meaningEn: 'like', audio: 'audio/hsk1/hsk1_喜欢.wav' },
      { hanzi: '茶', pinyin: 'chá', meaning: 'thé', meaningEn: 'tea', audio: 'audio/hsk1/hsk1_茶.wav' }
    ],
    tip:
      'Position OBLIGATOIRE : 也/都 sont des adverbes qui se placent ENTRE le sujet et le verbe. Sujet + 也/都 + verbe + reste. Pas de flexibilité.',
    tipEn:
      'MANDATORY position: 也/都 are adverbs placed BETWEEN subject and verb. Subject + 也/都 + verb + rest. No flexibility.'
  },
  {
    id: 'a1-ye-bu-dou-bu',
    title: 'Négation : 也不 vs 都不 vs 都没',
    titleEn: 'Negation: 也不 vs 都不 vs 都没',
    body:
      'Exemples de base :\n' +
      '- 我不喜欢，他也不喜欢 = je n\'aime pas, lui non plus\n' +
      '- 我们都不喜欢 = aucun de nous n\'aime\n' +
      '- 他们都没来 = aucun d\'eux n\'est venu\n' +
      '\n' +
      'Attention : 都不 ≠ 不都 !\n' +
      '- 我都不去 = je n\'y vais à **aucun**\n' +
      '- 我不都去 = je n\'y vais pas **tous** (mais à certains oui)\n' +
      '\n' +
      'Règle d\'or : 都 + 不 (présent) ou 都 + 没 (passé).',
    bodyEn:
      '我不喜欢，他也不喜欢 = I don\'t like, neither does he. 我们都不喜欢 = none of us like. CAREFUL: 都不 ≠ 不都. 我都不去 = I go to NONE. 我不都去 = I don\'t go to ALL (but I go to some). For the past: 都没. 他们都没来 = none of them came. Rule: 都 + 不 (present) or 都 + 没 (past).',
    items: [
      { hanzi: '不', pinyin: 'bù', meaning: 'ne pas', meaningEn: 'not', audio: 'audio/hsk1/hsk1_不.wav' },
      { hanzi: '没', pinyin: 'méi', meaning: 'ne pas (passé)', meaningEn: 'not (past)', audio: 'audio/hsk1/hsk1_没.wav' },
      { hanzi: '来', pinyin: 'lái', meaning: 'venir', meaningEn: 'come', audio: 'audio/hsk1/hsk1_来.wav' },
      { hanzi: '去', pinyin: 'qù', meaning: 'aller', meaningEn: 'go', audio: 'audio/hsk1/hsk1_去.wav' },
      { hanzi: '他们', pinyin: 'tā men', meaning: 'ils, eux', meaningEn: 'they', audio: 'audio/hsk1/hsk1_他们.wav' }
    ],
    tip:
      'Règle de fer : 不 pour le présent/futur (我不去 = je n\'y vais pas) et 没 pour le passé (我没去 = je n\'y suis pas allé). Confusion = signature débutant.',
    tipEn:
      'Iron rule: 不 for present/future (我不去 = I\'m not going) and 没 for past (我没去 = I didn\'t go). Mixing them = beginner signature.'
  }
];

export const a1NuancesM5LearnSections: LessonV2LearnSection[] = [
  {
    id: 'a1-duoshao-ji',
    title: '多少 vs 几 — combien (grand) vs combien (petit)',
    titleEn: '多少 vs 几 — how much (big) vs how many (small)',
    body:
      'Deux façons de demander « combien » selon l\'ordre de grandeur attendu :\n' +
      '\n' +
      '**几** (jǐ) — pour 1 à 10 environ, quand tu attends un **petit** nombre.\n' +
      '- 你有几个朋友？ = combien d\'amis as-tu ? (3-4 attendus)\n' +
      '- Toujours suivi d\'un classificateur : 几 + classif + nom\n' +
      '\n' +
      '**多少** (duōshao) — pour 10+, ou un nombre inconnu.\n' +
      '- 多少钱？ = combien d\'argent ?\n' +
      '- Pas obligatoirement suivi d\'un classificateur\n' +
      '\n' +
      'Attention : erreur classique — utiliser 几 pour un prix → 几钱 ✗. Correct : 多少钱.',
    bodyEn:
      '几 (jǐ, how many — for 1 to 10 roughly): used when expecting a SMALL number. 你有几个朋友？ = how many friends? (3-4 expected). Always followed by a classifier. 多少 (duōshao, how much — for 10+, or unknown): big number, unknown sum. 多少钱？ = how much money? Not necessarily followed by a classifier. Common mistake: using 几 for a price → 几钱 ✗; correct → 多少钱.',
    items: [
      { hanzi: '多少', pinyin: 'duō shao', meaning: 'combien (grand)', meaningEn: 'how much (big)', audio: 'audio/hsk1/hsk1_多少.wav' },
      { hanzi: '几', pinyin: 'jǐ', meaning: 'combien (petit)', meaningEn: 'how many (small)', audio: 'audio/hsk1/hsk1_几.wav' },
      { hanzi: '钱', pinyin: 'qián', meaning: 'argent', meaningEn: 'money', audio: 'audio/hsk1/hsk1_钱.wav' },
      { hanzi: '朋友', pinyin: 'péng you', meaning: 'ami', meaningEn: 'friend', audio: 'audio/hsk1/hsk1_朋友.wav' },
      { hanzi: '人', pinyin: 'rén', meaning: 'personne', meaningEn: 'person', audio: 'audio/hsk1/hsk1_人.wav' }
    ],
    tip:
      'Pour l\'heure et la date, on dit 几 (pas 多少) : 几点？ (quelle heure ?), 几号？ (quel jour du mois ?), 几月？ (quel mois ?). Ces nombres sont par nature petits (≤ 12 ou ≤ 31).',
    tipEn:
      'For time and date, use 几 (not 多少): 几点？ (what time?), 几号？ (what day of the month?), 几月？ (what month?). These numbers are inherently small (≤ 12 or ≤ 31).'
  },
  {
    id: 'a1-duo-vs-shao',
    title: '多 et 少 — beaucoup et peu (sans nombre exact)',
    titleEn: '多 and 少 — many and few (no exact number)',
    body:
      'Sans demander un chiffre précis : **很多** (beaucoup) et **很少** (peu).\n' +
      '\n' +
      'Exemples :\n' +
      '- 中国有很多人 = il y a beaucoup de monde en Chine\n' +
      '- 我有很少时间 = j\'ai peu de temps\n' +
      '\n' +
      'Règle : position 多/少 + nom (sans 的).\n' +
      '\n' +
      'Astuce : pour comparer, X 比 Y 多 (X plus que Y), X 比 Y 少 (X moins que Y). À l\'oral, 不少 (« pas peu ») signifie « beaucoup » de façon adoucie.',
    bodyEn:
      'Without asking a precise number: 很多 (many/a lot) and 很少 (few/little). 中国有很多人 = China has many people. 我有很少时间 = I have little time. CAREFUL position: 多/少 + noun (no 的). To compare: X 比 Y 多 (X more than Y), X 比 Y 少 (X less than Y). In speech, also 不少 (not few = quite a lot) which means «many» in a softened way.',
    items: [
      { hanzi: '多', pinyin: 'duō', meaning: 'beaucoup', meaningEn: 'many, much', audio: 'audio/hsk1/hsk1_多.wav' },
      { hanzi: '少', pinyin: 'shǎo', meaning: 'peu', meaningEn: 'few, little', audio: 'audio/hsk1/hsk1_少.wav' },
      { hanzi: '很多', pinyin: 'hěn duō', meaning: 'beaucoup de', meaningEn: 'many', audio: 'audio/hsk1/hsk1_很多.wav' },
      { hanzi: '不少', pinyin: 'bù shǎo', meaning: 'pas mal, beaucoup', meaningEn: 'quite a lot', audio: 'audio/hsk2/hsk2_不少.wav' },
      { hanzi: '比', pinyin: 'bǐ', meaning: 'que (compare)', meaningEn: 'than', audio: 'audio/hsk2/hsk2_比.wav' }
    ],
    tip:
      'Astuce : « 多大 ? » (litt. « combien grand ? ») = quel âge ? Mais pour les enfants on dit « 几岁 ? » (petit nombre attendu). Pour ado/adulte : « 多大 ? ».',
    tipEn:
      'Tip: «多大?» (lit. «how big?») = how old? But for children say «几岁?» (small number expected). For teens/adults: «多大?».'
  }
];

export const a1NuancesM6LearnSections: LessonV2LearnSection[] = [
  {
    id: 'a1-qu-lai',
    title: '去 vs 来 — du point de vue du locuteur',
    titleEn: '去 vs 来 — from the speaker\'s POV',
    body:
      'Deux verbes de mouvement opposés :\n' +
      '- **去** (qù, aller) = mouvement **loin** du locuteur. Ex : 我去北京 = je vais à Pékin.\n' +
      '- **来** (lái, venir) = mouvement **vers** le locuteur. Ex : 你来我家 = tu viens chez moi.\n' +
      '\n' +
      'Règle d\'or : en chinois, le pivot est **toujours** où le locuteur est physiquement, pas où il sera.\n' +
      '\n' +
      'Attention : piège francophone — « je viens à ton bureau » se dit 我去你的办公室 (du point de vue du locuteur). Si tu téléphones de ta maison à un ami au resto, tu dis 我去找你.',
    bodyEn:
      '去 (qù, go) = movement AWAY from the speaker. 我去北京 = I\'m going to Beijing. 来 (lái, come) = movement TOWARDS the speaker. 你来我家 = you come to my place. ENGLISH TRAP: «I\'m coming to your office» is 我去你的办公室 (from the SPEAKER\'s POV, not the listener\'s). In Chinese, the pivot is ALWAYS where the speaker IS PHYSICALLY. If you phone from home to a friend at the restaurant: 我去找你.',
    items: [
      { hanzi: '去', pinyin: 'qù', meaning: 'aller', meaningEn: 'go', audio: 'audio/hsk1/hsk1_去.wav' },
      { hanzi: '来', pinyin: 'lái', meaning: 'venir', meaningEn: 'come', audio: 'audio/hsk1/hsk1_来.wav' },
      { hanzi: '到', pinyin: 'dào', meaning: 'arriver à', meaningEn: 'arrive at', audio: 'audio/hsk1/hsk1_到.wav' },
      { hanzi: '回', pinyin: 'huí', meaning: 'rentrer, retourner', meaningEn: 'return', audio: 'audio/hsk1/hsk1_回.wav' },
      { hanzi: '找', pinyin: 'zhǎo', meaning: 'chercher, trouver', meaningEn: 'look for, find', audio: 'audio/hsk2/hsk2_找.wav' }
    ],
    tip:
      'Test rapide : si tu pars de l\'endroit OÙ TU ES en parlant, c\'est 去. Si tu te rapproches de l\'endroit où tu es, c\'est 来.',
    tipEn:
      'Quick test: if you leave from the spot WHERE YOU ARE while speaking, it\'s 去. If you approach where you are, it\'s 来.'
  },
  {
    id: 'a1-direction-compose',
    title: 'Composer le mouvement : 上来, 下去, 进来, 出去',
    titleEn: 'Compose movement: 上来, 下去, 进来, 出去',
    body:
      '来/去 se combinent avec des verbes de direction : 上 (monter), 下 (descendre), 进 (entrer), 出 (sortir), 回 (rentrer).\n' +
      '\n' +
      'Quatre exemples canoniques :\n' +
      '- 上来 = monter **vers** toi\n' +
      '- 下去 = descendre **loin** de toi\n' +
      '- 进来 = entrer (vers le locuteur — « entrez ! »)\n' +
      '- 出去 = sortir (loin du locuteur — « sors ! »)\n' +
      '\n' +
      'Règle d\'or : **toujours** du point de vue du locuteur. Quand quelqu\'un frappe à la porte et tu cries « entrez » → 请进来.',
    bodyEn:
      '来/去 combine with directional verbs: 上 (go up), 下 (go down), 进 (enter), 出 (exit), 回 (return). Four canonical examples: 上来 = come up TOWARD you, 下去 = go down AWAY, 进来 = enter (toward speaker — «come in!»), 出去 = exit (away from speaker — «get out!»). When someone knocks and you yell «come in» → 请进来. Always from speaker\'s POV.',
    items: [
      { hanzi: '上来', pinyin: 'shàng lái', meaning: 'monter (vers moi)', meaningEn: 'come up', audio: 'audio/hsk2/hsk2_上.wav' },
      { hanzi: '下去', pinyin: 'xià qù', meaning: 'descendre (loin)', meaningEn: 'go down', audio: 'audio/hsk2/hsk2_下.wav' },
      { hanzi: '进来', pinyin: 'jìn lái', meaning: 'entrer (vers moi)', meaningEn: 'come in', audio: 'audio/hsk2/hsk2_进.wav' },
      { hanzi: '出去', pinyin: 'chū qù', meaning: 'sortir (loin)', meaningEn: 'go out', audio: 'audio/hsk2/hsk2_出.wav' },
      { hanzi: '回来', pinyin: 'huí lái', meaning: 'revenir', meaningEn: 'come back', audio: 'audio/hsk1/hsk1_回.wav' }
    ],
    tip:
      'Mnémotechnique : pense aux portes. Quelqu\'un frappe → 请进来 (entrez vers moi). Tu sors d\'une réunion → 我先出去 (je sors d\'abord, loin de la pièce). Toujours basé sur OÙ TU ES PHYSIQUEMENT.',
    tipEn:
      'Mnemonic: think doors. Someone knocks → 请进来. You leave a meeting → 我先出去. Always based on WHERE YOU ARE PHYSICALLY.'
  }
];

export const a1NuancesM7LearnSections: LessonV2LearnSection[] = [
  {
    id: 'a1-hui-neng',
    title: '会 vs 能 — capacité acquise vs possible maintenant',
    titleEn: '会 vs 能 — learned ability vs currently possible',
    body:
      'Deux verbes modaux radicalement différents :\n' +
      '\n' +
      '**会** (huì) — savoir faire (capacité **acquise** par apprentissage).\n' +
      '- 我会说中文 = je sais parler chinois (j\'ai appris)\n' +
      '- 我会开车 = je sais conduire\n' +
      '\n' +
      '**能** (néng) — pouvoir (capacité **possible** en ce moment).\n' +
      '- 我今天能来 = je peux venir aujourd\'hui (rien ne m\'en empêche)\n' +
      '- 我今天不能开车，我喝了酒 = je ne peux pas conduire, j\'ai bu\n' +
      '\n' +
      'Règle d\'or : 会 = **appris**, 能 = **possible** maintenant.\n' +
      '\n' +
      'Exemple combiné : « Je peux conduire mais pas aujourd\'hui » → 我会开车，但今天不能.',
    bodyEn:
      '会 (huì, know how to — LEARNED ability). 我会说中文 = I can speak Chinese (I learned). 我会开车 = I can drive. 能 (néng, can — currently POSSIBLE). 我今天能来 = I can come today. 我今天不能开车，我喝了酒 = I can\'t drive today, I drank. Radical difference: 会 = LEARNED; 能 = POSSIBLE right now. «I can drive but not today» → 我会开车，但今天不能.',
    items: [
      { hanzi: '会', pinyin: 'huì', meaning: 'savoir faire', meaningEn: 'know how to', audio: 'audio/hsk1/hsk1_会.wav' },
      { hanzi: '能', pinyin: 'néng', meaning: 'pouvoir', meaningEn: 'can, be able', audio: 'audio/hsk1/hsk1_能.wav' },
      { hanzi: '开车', pinyin: 'kāi chē', meaning: 'conduire', meaningEn: 'drive', audio: 'audio/hsk2/hsk2_开车.wav' },
      { hanzi: '游泳', pinyin: 'yóu yǒng', meaning: 'nager', meaningEn: 'swim', audio: 'audio/hsk2/hsk2_游泳.wav' },
      { hanzi: '说', pinyin: 'shuō', meaning: 'parler', meaningEn: 'speak', audio: 'audio/hsk1/hsk1_说.wav' }
    ],
    tip:
      'Test rapide : « j\'ai appris à X » → 会. « rien ne m\'empêche de X maintenant » → 能. 我会游泳 = je sais nager ; 我能游一公里 = je peux nager 1 km.',
    tipEn:
      'Quick test: «I learned to X» → 会. «Nothing prevents me from X now» → 能. 我会游泳 = I know how to swim; 我能游一公里 = I can swim 1km.'
  },
  {
    id: 'a1-keyi',
    title: '可以 — la permission et l\'accord',
    titleEn: '可以 — permission and agreement',
    body:
      '可以 (kěyǐ) = être autorisé / pouvoir avec permission. Exemple : 我可以坐这里吗？ = puis-je m\'asseoir ici ?\n' +
      '\n' +
      'Règle d\'or : différence avec 能 :\n' +
      '- **可以** implique souvent une **permission** (sociale, légale)\n' +
      '- **能** implique une **capacité** matérielle\n' +
      '\n' +
      'Compare :\n' +
      '- 你可以走了 = tu peux partir (je te le permets)\n' +
      '- 你能走吗？ = es-tu capable de partir ?\n' +
      '\n' +
      'À l\'oral pour accepter : 可以 (OK), 不可以 (non, pas OK).',
    bodyEn:
      '可以 (kěyǐ, be allowed / can with permission). 我可以坐这里吗？= may I sit here? Difference from 能: 可以 often implies PERMISSION (social, legal), 能 a material CAPACITY. 你可以走了 = you may leave (I permit it). 你能走吗？= are you able to leave? In speech to accept: 可以 (OK), 不可以 (no, not OK).',
    items: [
      { hanzi: '可以', pinyin: 'kě yǐ', meaning: 'pouvoir (permission)', meaningEn: 'can (allowed)', audio: 'audio/hsk1/hsk1_可以.wav' },
      { hanzi: '坐', pinyin: 'zuò', meaning: 's\'asseoir', meaningEn: 'sit', audio: 'audio/hsk1/hsk1_坐.wav' },
      { hanzi: '吸烟', pinyin: 'xī yān', meaning: 'fumer', meaningEn: 'smoke', audio: 'audio/hsk4/hsk4_吸烟.wav' },
      { hanzi: '允许', pinyin: 'yǔn xǔ', meaning: 'permettre', meaningEn: 'allow', audio: 'audio/hsk5/hsk5_允许.wav' },
      { hanzi: '禁止', pinyin: 'jìn zhǐ', meaning: 'interdire', meaningEn: 'forbid', audio: 'audio/hsk6/hsk6_禁止.wav' }
    ],
    tip:
      'Récap : 会 = appris (skill) | 能 = capable maintenant (capacité) | 可以 = autorisé (permission). « 我会，但不能，因为不可以 » = je sais, mais je ne peux pas, parce que je n\'ai pas le droit. Phrase qui résume tout.',
    tipEn:
      'Recap: 会 = learned (skill) | 能 = able now (capacity) | 可以 = allowed (permission). «我会，但不能，因为不可以» = I know how, but I can\'t, because I\'m not allowed. The summary phrase.'
  }
];

// ---------------------------------------------------------------------------
// cecr-a1-grammar-m0 — Structure de phrase chinoise : SVO (style Seonsaengnim)
// Tout premier module de la section Grammaire A1. Présente l'ordre canonique
// Sujet → Verbe → Objet, le placement du temps, et la non-conjugaison.
// Utilise le rendu `tokenizedSentences` pour visualiser la structure avec
// des pastilles colorées par rôle grammatical.
// ---------------------------------------------------------------------------

export const a1GrammarSvoLearnSections: LessonV2LearnSection[] = [
  {
    id: 'svo-intro',
    title: 'L\'ordre des mots : Sujet → Verbe → Objet',
    titleEn: 'Word order: Subject → Verb → Object',
    body:
      'Règle d\'or : en chinois, c\'est **Sujet → Verbe → Objet** — le même ordre qu\'en français. Excellente nouvelle pour un francophone.\n' +
      '\n' +
      'Exemple : 我吃米饭 = wǒ chī mǐfàn (je / mange / du riz). Littéralement « Je mange du riz ».\n' +
      '\n' +
      'Astuce : tu peux **presque** traduire mot à mot dans l\'ordre français pour les phrases simples du quotidien. Le mandarin est l\'ami du francophone sur ce point.',
    bodyEn:
      'Chinese uses Subject → Verb → Object — the same order as English. Great news: «I eat rice» builds in the same order in Chinese.\n→ 我吃米饭 = wǒ chī mǐfàn (I / eat / rice)\nLiterally: «I eat rice».\n\nReflex: for simple everyday sentences, you can ALMOST translate word-for-word in English order. Mandarin is friendly to English speakers on this point.',
    tokenizedSentences: [
      {
        zh: [
          { text: '我', pinyin: 'wǒ', role: 'sujet' },
          { text: '吃', pinyin: 'chī', role: 'verbe' },
          { text: '米饭', pinyin: 'mǐfàn', role: 'objet' }
        ],
        fr: [
          { text: 'Je', role: 'sujet' },
          { text: 'mange', role: 'verbe' },
          { text: 'du riz', role: 'objet' }
        ],
        en: [
          { text: 'I', role: 'sujet' },
          { text: 'eat', role: 'verbe' },
          { text: 'rice', role: 'objet' }
        ]
      },
      {
        zh: [
          { text: '她', pinyin: 'tā', role: 'sujet' },
          { text: '喝', pinyin: 'hē', role: 'verbe' },
          { text: '水', pinyin: 'shuǐ', role: 'objet' }
        ],
        fr: [
          { text: 'Elle', role: 'sujet' },
          { text: 'boit', role: 'verbe' },
          { text: 'de l\'eau', role: 'objet' }
        ],
        en: [
          { text: 'She', role: 'sujet' },
          { text: 'drinks', role: 'verbe' },
          { text: 'water', role: 'objet' }
        ]
      },
      {
        zh: [
          { text: '我们', pinyin: 'wǒmen', role: 'sujet' },
          { text: '学', pinyin: 'xué', role: 'verbe' },
          { text: '中文', pinyin: 'zhōngwén', role: 'objet' }
        ],
        fr: [
          { text: 'Nous', role: 'sujet' },
          { text: 'apprenons', role: 'verbe' },
          { text: 'le chinois', role: 'objet' }
        ],
        en: [
          { text: 'We', role: 'sujet' },
          { text: 'learn', role: 'verbe' },
          { text: 'Chinese', role: 'objet' }
        ]
      }
    ],
    tip:
      'Les pronoms personnels sujets sont obligatoires en chinois — on ne dit pas « 吃米饭 » tout seul comme on dirait « Mange! » en français. Toujours préciser qui agit.',
    tipEn:
      'Subject pronouns are mandatory in Chinese — you don\'t say «吃米饭» on its own. Always specify who acts.'
  },
  {
    id: 'svo-time-before-verb',
    title: 'Le temps va AVANT le verbe (≠ français)',
    titleEn: 'Time goes BEFORE the verb (≠ English)',
    body:
      'En français on dit « Je mange du riz DEMAIN » — le temps peut aller à la fin. En chinois, **jamais**.\n' +
      '\n' +
      'Règle d\'or : le temps se place **toujours avant** le verbe, soit juste après le sujet, soit tout au début :\n' +
      '- ✓ 我明天吃米饭 (je / demain / mange / du riz)\n' +
      '- ✓ 明天我吃米饭 (demain / je / mange / du riz)\n' +
      '- ✗ 我吃米饭明天 — interdit, totalement bancal à l\'oreille chinoise\n' +
      '\n' +
      'Mêmes règles pour 今天 (aujourd\'hui), 昨天 (hier), 早上 (le matin), 晚上 (le soir), 现在 (maintenant).',
    bodyEn:
      'In English you can say «I eat rice TOMORROW» — time can go at the end. In Chinese, NEVER. Time always goes BEFORE the verb, either right after the subject, or at the very beginning.\n\n✓ 我明天吃米饭 (I / tomorrow / eat / rice)\n✓ 明天我吃米饭 (tomorrow / I / eat / rice)\n✗ 我吃米饭明天 — forbidden, sounds totally off to a Chinese ear.\n\nSame rule for: 今天 (today), 昨天 (yesterday), 早上 (morning), 晚上 (evening), 现在 (now).',
    tokenizedSentences: [
      {
        zh: [
          { text: '我', pinyin: 'wǒ', role: 'sujet' },
          { text: '明天', pinyin: 'míngtiān', role: 'temps' },
          { text: '吃', pinyin: 'chī', role: 'verbe' },
          { text: '米饭', pinyin: 'mǐfàn', role: 'objet' }
        ],
        fr: [
          { text: 'Demain', role: 'temps' },
          { text: ', je', role: 'sujet' },
          { text: 'mange', role: 'verbe' },
          { text: 'du riz', role: 'objet' }
        ],
        note: 'Le temps 明天 vient AVANT 吃 (le verbe). Ne pas le mettre à la fin.',
        noteEn: 'Time 明天 comes BEFORE 吃 (the verb). Don\'t put it at the end.'
      },
      {
        zh: [
          { text: '今天', pinyin: 'jīntiān', role: 'temps' },
          { text: '我', pinyin: 'wǒ', role: 'sujet' },
          { text: '学', pinyin: 'xué', role: 'verbe' },
          { text: '中文', pinyin: 'zhōngwén', role: 'objet' }
        ],
        fr: [
          { text: 'Aujourd\'hui', role: 'temps' },
          { text: ', j\'', role: 'sujet' },
          { text: 'apprends', role: 'verbe' },
          { text: 'le chinois', role: 'objet' }
        ],
        note: 'Variante avec le temps en tête de phrase — aussi correct, accent légèrement appuyé sur « aujourd\'hui ».',
        noteEn: 'Variant with time at the very start — also correct, slight emphasis on «today».'
      },
      {
        zh: [
          { text: '他', pinyin: 'tā', role: 'sujet' },
          { text: '晚上', pinyin: 'wǎnshàng', role: 'temps' },
          { text: '喝', pinyin: 'hē', role: 'verbe' },
          { text: '茶', pinyin: 'chá', role: 'objet' }
        ],
        fr: [
          { text: 'Il', role: 'sujet' },
          { text: 'boit', role: 'verbe' },
          { text: 'du thé', role: 'objet' },
          { text: 'le soir', role: 'temps' }
        ],
        note: 'En français le temps peut aller à la fin. En chinois : pas le choix, c\'est AVANT le verbe.',
        noteEn: 'In English time can go at the end. In Chinese: no choice, it goes BEFORE the verb.'
      }
    ],
    tip:
      'Astuce mnémo : pense que le chinois plante d\'abord le décor (sujet + temps) avant de jouer l\'action (verbe + objet). C\'est comme une scène de théâtre.',
    tipEn:
      'Mnemonic: Chinese sets the scene first (subject + time) before playing the action (verb + object). Like a theatre stage.'
  },
  {
    id: 'svo-no-conjugation',
    title: 'Aucune conjugaison : c\'est toujours le même verbe',
    titleEn: 'No conjugation: same verb every time',
    body:
      'Règle d\'or : le chinois est **invariable** — pas de conjugaison, pas d\'accord, pas de pluriel sur les verbes.\n' +
      '\n' +
      '吃 (manger) reste 吃 quel que soit le sujet :\n' +
      '- 我吃 / 你吃 / 他吃 / 她吃\n' +
      '- 我们吃 / 你们吃 / 他们吃\n' +
      '\n' +
      'C\'est le même principe pour **tous** les verbes.\n' +
      '\n' +
      'Astuce : une fois que tu connais 吃, tu sais dire « je mange », « nous mangions », « ils ont mangé » — tu ajoutes juste un mot temporel ou une particule (了, 过, 着 — voir modules suivants).',
    bodyEn:
      'Chinese is INVARIABLE: no conjugation, no agreement, no plural on verbs. 吃 (to eat) stays 吃 whatever the subject.\n\n我吃 / 你吃 / 他吃 / 她吃 / 我们吃 / 你们吃 / 他们吃 — always 吃.\n\nSame for ALL verbs. Once you know 吃, you know how to say «I eat», «we ate», «they have eaten» — you just add a time word or particle (see next modules for 了, 过, 着).',
    items: [
      { hanzi: '我吃', pinyin: 'wǒ chī', meaning: 'je mange', meaningEn: 'I eat', audio: 'audio/hsk1/hsk1_吃.wav' },
      { hanzi: '你吃', pinyin: 'nǐ chī', meaning: 'tu manges', meaningEn: 'you eat', audio: 'audio/hsk1/hsk1_吃.wav' },
      { hanzi: '他吃', pinyin: 'tā chī', meaning: 'il mange', meaningEn: 'he eats', audio: 'audio/hsk1/hsk1_吃.wav' },
      { hanzi: '我们吃', pinyin: 'wǒmen chī', meaning: 'nous mangeons', meaningEn: 'we eat', audio: 'audio/hsk1/hsk1_吃.wav' },
      { hanzi: '他们吃', pinyin: 'tāmen chī', meaning: 'ils mangent', meaningEn: 'they eat', audio: 'audio/hsk1/hsk1_吃.wav' }
    ],
    tip:
      'C\'est l\'un des points les plus libérateurs du chinois pour un francophone : zéro tableau de conjugaison à apprendre par cœur. Tu apprends le verbe une fois, et c\'est réglé pour toujours.',
    tipEn:
      'One of Chinese\'s most liberating features for English speakers: zero conjugation tables to memorize. Learn the verb once, done forever.'
  },
  {
    id: 'svo-comparison',
    title: 'Compare : 4 phrases côte à côte',
    titleEn: 'Compare: 4 sentences side-by-side',
    body:
      'Mets en pratique en observant la structure de ces 4 phrases. Note comment le sujet, le verbe et l\'objet gardent toujours leur place — seuls les mots changent.',
    bodyEn:
      'Practice by observing the structure of these 4 sentences. Notice how subject, verb and object always keep their place — only the words change.',
    tokenizedSentences: [
      {
        zh: [
          { text: '我', pinyin: 'wǒ', role: 'sujet' },
          { text: '看', pinyin: 'kàn', role: 'verbe' },
          { text: '书', pinyin: 'shū', role: 'objet' }
        ],
        fr: [
          { text: 'Je', role: 'sujet' },
          { text: 'lis', role: 'verbe' },
          { text: 'un livre', role: 'objet' }
        ]
      },
      {
        zh: [
          { text: '他', pinyin: 'tā', role: 'sujet' },
          { text: '买', pinyin: 'mǎi', role: 'verbe' },
          { text: '咖啡', pinyin: 'kāfēi', role: 'objet' }
        ],
        fr: [
          { text: 'Il', role: 'sujet' },
          { text: 'achète', role: 'verbe' },
          { text: 'du café', role: 'objet' }
        ]
      },
      {
        zh: [
          { text: '我妈妈', pinyin: 'wǒ māma', role: 'sujet' },
          { text: '做', pinyin: 'zuò', role: 'verbe' },
          { text: '饭', pinyin: 'fàn', role: 'objet' }
        ],
        fr: [
          { text: 'Ma maman', role: 'sujet' },
          { text: 'fait', role: 'verbe' },
          { text: 'à manger', role: 'objet' }
        ]
      },
      {
        zh: [
          { text: '我们', pinyin: 'wǒmen', role: 'sujet' },
          { text: '今天', pinyin: 'jīntiān', role: 'temps' },
          { text: '学', pinyin: 'xué', role: 'verbe' },
          { text: '汉字', pinyin: 'hànzì', role: 'objet' }
        ],
        fr: [
          { text: 'Aujourd\'hui', role: 'temps' },
          { text: ', nous', role: 'sujet' },
          { text: 'apprenons', role: 'verbe' },
          { text: 'des caractères', role: 'objet' }
        ]
      }
    ],
    tip:
      'Quand tu construis ta première phrase, suis ce template : SUJET + (TEMPS) + VERBE + OBJET. Tant que tu respectes cet ordre, ta phrase sera grammaticalement correcte — même si le vocabulaire est limité.',
    tipEn:
      'When building your first sentence, follow this template: SUBJECT + (TIME) + VERB + OBJECT. As long as you respect this order, your sentence will be grammatically correct — even with limited vocabulary.'
  }
];
