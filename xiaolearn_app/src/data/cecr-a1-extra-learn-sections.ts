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
      'En français, b/p se distinguent par la vibration des cordes vocales. En mandarin, la distinction est ailleurs : c\'est le SOUFFLE qui change. b (non aspiré) = sans souffle, p (aspiré) = avec un petit coup d\'air.\nTest simple : pose ta main devant la bouche. Dis « bā » (八 = 8) : la main reste stable. Dis « pá » (爬 = grimper) : tu sens le souffle.',
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
      'Les 4 initiales qui se forment avec les lèvres. b et p fonctionnent par paire (non aspiré / aspiré). m et f sont directes — identiques au français.',
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
      'Les 4 initiales produites avec la pointe de la langue contre la crête alvéolaire (juste derrière les dents du haut). Mêmes règles : d/t par aspiration, n/l directes.',
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
      'Trio produit à l\'arrière de la bouche, contre le voile du palais. g (non aspiré) vs k (aspiré), même logique que b/p et d/t. h est plus rauque qu\'en français — c\'est un souffle venu de la gorge, proche du « j » espagnol (« Juan »).',
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
      'Trio totalement absent du français. La langue s\'aplatit contre le palais (comme pour faire « yee »), et les lèvres s\'étirent en sourire.\n  • j ≈ « dj » très doux\n  • q ≈ « tch » aspiré\n  • x ≈ « ch » léger (plus soufflé que chuchoté)\nCes trois sons ne se combinent JAMAIS avec a, o, e, u — seulement i et ü.',
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
      'La « famille rétroflexe » : la pointe de la langue se recourbe vers l\'arrière, touchant presque le palais dur. C\'est LE son typiquement pékinois.\n  • zh ≈ « dj » langue en arrière\n  • ch ≈ « tch » aspiré langue en arrière\n  • sh ≈ « ch » langue en arrière\n  • r ≈ entre « r » anglais et « j » français, langue recourbée',
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
      'La « famille plate » : langue plaquée derrière les dents du bas, plate. L\'opposition avec zh/ch/sh est cruciale.\n  • z ≈ « dz » net (comme « pizza » italien)\n  • c ≈ « ts » aspiré\n  • s ≈ « s » français normal',
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
      'La structure standard : 你是哪国人 ? (nǐ shì nǎ guó rén) — littéralement « tu + es + quel + pays + personne ? ». C\'est compact mais très régulier.\nRéponse : 我是 + [nationalité]. Ex : 我是法国人 (wǒ shì Fǎ guó rén) — « je suis français ».',
    bodyEn:
      'The standard pattern: 你是哪国人? (nǐ shì nǎ guó rén) — literally "you + are + which + country + person?". Compact but very regular.\nAnswer: 我是 + [nationality]. E.g. 我是法国人 (wǒ shì Fǎ guó rén) — "I am French".',
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
      'Les noms de pays en chinois sont souvent des caractères choisis pour évoquer le son original. 法国 = « Fǎ guó » ≈ France, 美国 = « Měi guó » (« beau pays ») = États-Unis.',
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
      'Attention : Japon est une exception, son nom chinois est 日本 et non 日国. Pour former « Japonais », on dit 日本人 (Rì běn rén).',
    tipEn:
      'Note: Japan is an exception, its Chinese name is 日本 not 日国. For "Japanese" say 日本人 (Rì běn rén).'
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
      'Le chinois est le paradis des maths : pour dire 11, c\'est 10 + 1 = 十一. Pour 15, c\'est 十五. Aucune exception, aucun mot nouveau à apprendre.\nRègle : 十 + [chiffre 1-9]',
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
      'Toutes les dizaines se forment par multiplication : 20 = 2 × 10 = 二十, 50 = 五十. Puis pour les chiffres intermédiaires, on ajoute : 25 = 2 × 10 + 5 = 二十五.\nRègle générale : [dizaine] + 十 + [unité]. Transparente, sans piège.',
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
      '100 = 一百 (yī bǎi), 1 000 = 一千 (yī qiān). La règle reste la même : [chiffre] + 百, [chiffre] + 千.\nParticularité chinoise : 10 000 = 一万 (yī wàn). Le chinois regroupe par 10 000 et non par 1 000 comme l\'Occident. 1 million = 一百万 (« 100 × 10 000 »).',
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
      'Les jours de la semaine en chinois sont des chiffres. Lundi = « jour 1 », mardi = « jour 2 », etc. Il suffit de savoir compter de 1 à 6 pour nommer la semaine.\nRègle : 星期 + [chiffre 1-6] pour lundi → samedi. Exception : dimanche = 星期日 ou 星期天 (le « ciel »).',
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
      'Pour situer la semaine, on préfixe avec 这 (cette), 下 (prochaine, littéralement « suivante »), 上 (dernière, « précédente »).\n  • 这个星期 (zhè ge xīng qī) = cette semaine\n  • 下个星期 (xià ge xīng qī) = la semaine prochaine\n  • 上个星期 (shàng ge xīng qī) = la semaine dernière',
    bodyEn:
      'For relative weeks, prefix with 这 (this), 下 (next, "following"), 上 (last, "previous").\n  • 这个星期 (zhè ge xīng qī) = this week\n  • 下个星期 (xià ge xīng qī) = next week\n  • 上个星期 (shàng ge xīng qī) = last week',
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
      'Comme pour les jours de la semaine, les mois sont numérotés. Janvier = « mois 1 », février = « mois 2 », etc. Formule : [chiffre 1-12] + 月.\nJanvier = 一月, juin = 六月, décembre = 十二月. Aucun nom propre à retenir.',
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
      'Ordre chinois : année → mois → jour (du plus grand au plus petit). Inverse du français.\nEx : 2026年4月18日 = « année 2026, mois 4, jour 18 » = 18 avril 2026.\nPour la prononciation : 二零二六年四月十八日.',
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
      'Le mot-clé : 岁 (suì) = « année d\'âge, ans ». Attention, il est différent de 年 (année calendaire).\nPour demander l\'âge de quelqu\'un, trois formules selon l\'âge probable du destinataire :\n  • Enfant (<10 ans) : 你几岁 ? (nǐ jǐ suì) — « tu as combien d\'années ? »\n  • Adulte : 你多大 ? (nǐ duō dà) — « tu as quelle taille ? » (plus poli)\n  • Personne âgée : 您多大年纪 ? (plus respectueux)',
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
      'Structure : 我 + [chiffre] + 岁. Ex : 我三十岁 (wǒ sān shí suì) = « j\'ai 30 ans ».\nLe verbe « avoir » (有) n\'est PAS utilisé avec l\'âge — on met juste le chiffre directement.\n我有三十岁 est une erreur typique de francophone. Dire juste 我三十岁.',
    bodyEn:
      'Structure: 我 + [digit] + 岁. E.g. 我三十岁 (wǒ sān shí suì) = "I am 30".\nThe verb "to have" (有) is NOT used with age — just put the number directly.\n我有三十岁 is a classic French-speaker mistake. Just say 我三十岁.',
    tip:
      'Pour un âge avec des demi : 我二十五岁半 (wǒ èr shí wǔ suì bàn) = « j\'ai 25 ans et demi ». 半 = moitié.',
    tipEn:
      'For "and a half" ages: 我二十五岁半 (wǒ èr shí wǔ suì bàn) = "I\'m 25 and a half". 半 = half.'
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
      'Trois pronoms de base : 我 (wǒ) = je, 你 (nǐ) = tu, 他/她 (tā) = il/elle. Un seul mot par personne — pas de variation selon le cas (je/moi/mon = tous 我).\nAttention : à l\'écrit, 他 est masculin et 她 féminin. À l\'oral, les deux se prononcent « tā », donc indistinguables.',
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
      'Pour le pluriel, on ajoute 们 (men) : 我们 = nous, 你们 = vous, 他们 = ils/elles.\nPour le possessif, on ajoute 的 (de) : 我的 = mon/ma, 你的 = ton/ta, 他的 = son/sa.\nRègle universelle : 的 transforme n\'importe quel nom ou pronom en possesseur. 妈妈的 = « de maman ».',
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
      'Les couleurs se construisent presque toujours avec 色 (sè) = « couleur » à la fin : 红色 = rouge, 蓝色 = bleu. Mais à l\'oral, on omet souvent 色.\nPour dire « une voiture rouge » : 红色的车 ou plus court 红的车.',
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
      '是 (shì) sert à dire « X est Y » — à identifier, à définir. Structure : [sujet] + 是 + [identité].\nEx : 我是学生 (wǒ shì xué shēng) = je suis étudiant.\nAttention : 是 NE SERT PAS à décrire ! Pour « elle est grande » on ne dit PAS 她是高 — on dit 她很高. 是 = identité ; 很 + adjectif = description.',
    bodyEn:
      '是 (shì) is used to say "X is Y" — to identify, to define. Structure: [subject] + 是 + [identity].\nE.g.: 我是学生 (wǒ shì xué shēng) = I am a student.\nWatch out: 是 is NOT for describing! For "she is tall" you do NOT say 她是高 — say 她很高. 是 = identity; 很 + adjective = description.',
    items: [
      { hanzi: '是', pinyin: 'shì', meaning: 'être, oui', meaningEn: 'to be, yes', audio: 'audio/hsk1/hsk1_是.wav' }
    ],
    tip:
      'Test simple : si le prédicat est un nom (étudiant, français, professeur), utilise 是. Si c\'est un adjectif (grand, fatigué, content), utilise 很 + adjectif.',
    tipEn:
      'Simple test: if the predicate is a noun (student, French, teacher), use 是. If it\'s an adjective (tall, tired, happy), use 很 + adjective.'
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
      '不 (bù) se place AVANT le verbe ou l\'adjectif à nier.\nEx : 我不吃肉 (wǒ bù chī ròu) = je ne mange pas de viande. 她不高兴 (tā bù gāo xìng) = elle n\'est pas contente.\nRègle importante : 不 est la négation par défaut pour tout... sauf pour 有 (avoir). Pour nier 有, on utilise 没 : 没有.',
    bodyEn:
      '不 (bù) is placed BEFORE the verb or adjective being negated.\nE.g.: 我不吃肉 (wǒ bù chī ròu) = I don\'t eat meat. 她不高兴 (tā bù gāo xìng) = she is not happy.\nKey rule: 不 is the default negation for everything... except for 有 (to have). To negate 有, use 没: 没有.',
    items: [
      { hanzi: '不', pinyin: 'bù', meaning: 'ne… pas', meaningEn: 'not', audio: 'audio/hsk1/hsk1_不.wav' },
      { hanzi: '没', pinyin: 'méi', meaning: 'ne… pas (pour 有 et passé)', meaningEn: 'not (for 有 and past)', audio: 'audio/hsk1/hsk1_没.wav' }
    ],
    tip:
      'Tone sandhi : 不 change de ton devant un 4e ton. 不 + 是 → bú shì (2e ton). Devant les autres tons, 不 reste 4e ton. Ton automatique, à assimiler par la pratique.',
    tipEn:
      'Tone sandhi: 不 changes tone before a 4th tone. 不 + 是 → bú shì (2nd tone). Before other tones, 不 stays 4th tone. Automatic, absorbed through practice.'
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
      '吗 (ma) transforme n\'importe quelle phrase affirmative en question oui/non. Il se place TOUJOURS à la toute fin de la phrase.\nEx : 你好 (tu vas bien) → 你好吗 ? (tu vas bien ?). 你是法国人 (tu es français) → 你是法国人吗 ? (tu es français ?).\nAucune inversion, aucune modification — juste ajouter 吗 à la fin.',
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
      'Une autre façon de poser une question oui/non : répéter le verbe avec 不 au milieu.\n  • 你是不是法国人 ? = « tu es (ou) n\'es pas français ? » = « tu es français ? »\n  • 你吃不吃 ? = « tu manges (ou) ne manges pas ? » = « tu manges ? »\nPlus direct et plus vif que 吗. Très utilisé à l\'oral.',
    bodyEn:
      'Another way to ask yes/no: repeat the verb with 不 in the middle.\n  • 你是不是法国人? = "you are (or) not French?" = "are you French?"\n  • 你吃不吃? = "you eat (or) don\'t eat?" = "are you eating?"\nMore direct and snappier than 吗. Very common in speech.',
    tip:
      'Tu ne peux pas combiner V-不-V avec 吗 dans la même phrase — ce sont deux structures concurrentes. Choisis l\'une ou l\'autre.',
    tipEn:
      'You cannot combine V-不-V with 吗 in the same sentence — they\'re competing structures. Pick one or the other.'
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
      '的 (de) est l\'une des particules les plus fréquentes du chinois. Elle lie un modificateur à un nom — possessif, descriptif, relatif.\n  • Possessif : 我的书 = mon livre\n  • Adjectival : 好的人 = une personne bonne\n  • Relatif : 我买的书 = le livre que j\'ai acheté\nLa logique : [modificateur] + 的 + [nom].',
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
      'Pour les liens étroits (famille, école, pays), 的 est souvent supprimé :\n  • 我妈妈 au lieu de 我的妈妈\n  • 我家 au lieu de 我的家\n  • 中国人 au lieu de 中国的人\nPour les liens faibles (objets, possessions génériques), on garde 的 : 我的书, 我的车.',
    bodyEn:
      'For close ties (family, school, country), 的 is often dropped:\n  • 我妈妈 instead of 我的妈妈\n  • 我家 instead of 我的家\n  • 中国人 instead of 中国的人\nFor weaker ties (objects, generic possessions), keep 的: 我的书, 我的车.',
    tip:
      'Règle pragmatique : si le possesseur est une personne et le possédé un objet transférable, on garde 的. Si c\'est une relation permanente (famille, nationalité), on l\'omet.',
    tipEn:
      'Rule of thumb: if the possessor is a person and the possessed is a transferable object, keep 的. For permanent relations (family, nationality), drop it.'
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
      'En chinois, on ne peut PAS dire « trois livres » directement. Il faut un mot intermédiaire, appelé « classificateur » (ou « mot de mesure »).\nStructure obligatoire : [chiffre] + [classificateur] + [nom].\nEx : 三本书 (sān běn shū) = trois livres (littéralement « trois [reliure] livres »).',
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
      '个 (ge) est le joker. Si tu ne connais pas le classificateur spécifique d\'un nom, utilise 个 — ça passe presque toujours.\nEx : 一个人 (une personne), 两个苹果 (deux pommes), 三个朋友 (trois amis).\nC\'est le classificateur des humains et des objets génériques.',
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
