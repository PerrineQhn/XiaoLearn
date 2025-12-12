import type { LessonItem, LessonExample } from '../types';
import { grammarLessons } from './grammar-lessons';
import { getLessonByHanzi } from './lessons';
import { enrichExamplesWithAudio, findExampleAudio } from '../utils/exampleAudio';

interface SimpleLessonConfig {
  id: string;
  title: string;
  titleEn: string;
  level: string;
  duration: number;
  words?: string[];
  customWords?: LessonItem[];
}

const initialCombinationMap: Record<string, string[]> = {
  b: ['a', 'ai', 'an', 'ang', 'ao', 'e', 'ei', 'en', 'eng', 'i', 'ian', 'iao', 'ie', 'in', 'ing', 'o', 'u'],
  p: ['a', 'ai', 'an', 'ang', 'ao', 'ei', 'en', 'eng', 'i', 'ian', 'iao', 'ie', 'in', 'ing', 'o', 'ou', 'u'],
  m: ['a', 'ai', 'an', 'ang', 'ao', 'e', 'ei', 'en', 'eng', 'i', 'ian', 'iao', 'ie', 'in', 'ing', 'iu', 'o', 'ou', 'u'],
  f: ['a', 'an', 'ang', 'ei', 'en', 'eng', 'o', 'ou', 'u'],
  d: ['a', 'ai', 'an', 'ang', 'ao', 'e', 'ei', 'eng', 'i', 'ia', 'ian', 'iao', 'ie', 'ing', 'iu', 'ong', 'ou', 'u', 'uan', 'ui', 'un', 'uo'],
  t: ['a', 'ai', 'an', 'ang', 'ao', 'e', 'ei', 'eng', 'i', 'ian', 'iao', 'ie', 'ing', 'ong', 'ou', 'u', 'uan', 'ui', 'un', 'uo'],
  n: ['a', 'ai', 'an', 'ang', 'ao', 'e', 'ei', 'en', 'eng', 'i', 'ian', 'iang', 'iao', 'ie', 'in', 'ing', 'iu', 'ong', 'ou', 'u', 'u:e', 'uan', 'uo'],
  l: ['a', 'ai', 'an', 'ang', 'ao', 'e', 'ei', 'eng', 'i', 'ia', 'ian', 'iang', 'iao', 'ie', 'in', 'ing', 'iu', 'o', 'ong', 'ou', 'u', 'u:e', 'uan', 'un', 'uo'],
  g: ['a', 'ai', 'an', 'ang', 'ao', 'e', 'ei', 'en', 'eng', 'ong', 'ou', 'u', 'ua', 'uai', 'uan', 'uang', 'ui', 'un', 'uo'],
  k: ['a', 'ai', 'an', 'ang', 'ao', 'e', 'en', 'eng', 'ong', 'ou', 'u', 'ua', 'uai', 'uan', 'uang', 'ui', 'un', 'uo'],
  h: ['a', 'ai', 'an', 'ang', 'ao', 'e', 'ei', 'en', 'eng', 'ong', 'ou', 'u', 'ua', 'uai', 'uan', 'uang', 'ui', 'un', 'uo'],
  z: ['a', 'ai', 'an', 'ang', 'ao', 'e', 'ei', 'en', 'eng', 'i', 'ong', 'ou', 'u', 'uan', 'ui', 'un', 'uo'],
  c: ['a', 'ai', 'an', 'ang', 'ao', 'e', 'en', 'eng', 'i', 'ong', 'ou', 'u', 'uan', 'ui', 'un', 'uo'],
  s: ['a', 'ai', 'an', 'ang', 'ao', 'e', 'en', 'eng', 'i', 'ong', 'ou', 'u', 'uan', 'ui', 'un', 'uo'],
  zh: ['a', 'ai', 'an', 'ang', 'ao', 'e', 'en', 'eng', 'i', 'ong', 'ou', 'u', 'ua', 'uai', 'uan', 'uang', 'ui', 'un', 'uo'],
  ch: ['a', 'ai', 'an', 'ang', 'ao', 'e', 'en', 'eng', 'i', 'ong', 'ou', 'u', 'ua', 'uai', 'uan', 'uang', 'ui', 'un', 'uo'],
  sh: ['a', 'ai', 'an', 'ang', 'ao', 'e', 'ei', 'en', 'eng', 'i', 'ou', 'u', 'ua', 'uai', 'uan', 'uang', 'ui', 'un', 'uo'],
  r: ['an', 'ang', 'ao', 'e', 'en', 'eng', 'i', 'ong', 'ou', 'u', 'uan', 'ui', 'un', 'uo'],
  j: ['i', 'ia', 'ian', 'iang', 'iao', 'ie', 'in', 'ing', 'iong', 'iu', 'u', 'uan', 'ue', 'un'],
  q: ['i', 'ia', 'ian', 'iang', 'iao', 'ie', 'in', 'ing', 'iong', 'iu', 'u', 'uan', 'ue', 'un'],
  x: ['i', 'ia', 'ian', 'iang', 'iao', 'ie', 'in', 'ing', 'iong', 'iu', 'u', 'uan', 'ue', 'un']
};

const normalizeFinal = (value: string) =>
  value.replace(/^v/, 'ü').replace(/u:/g, 'ü');

const createPinyinWord = (config: {
  id: string;
  initial?: string;
  hanzi: string;
  pinyin: string;
  audioLetter?: string;
  audio?: string;  // Optionnel, par défaut = audioLetter
  translation: string;
  translationFr: string;
  explanation: string;
  exampleHanzi: string;
  examplePinyin: string;
  exampleTranslation: string;
  exampleAudio?: string;
  combinations?: string[];
  tags: string[];
}): LessonItem => ({
  id: config.id,
  level: 'hsk1',
  hanzi: config.hanzi,
  pinyin: config.pinyin,
  audio: config.audio ?? config.audioLetter,  // Si audio n'est pas fourni, utiliser audioLetter
  audioLetter: config.audioLetter,
  translation: config.translation,
  translationFr: config.translationFr,
  category: 'phonétique',
  explanation: `${config.explanation}${
    config.combinations && config.combinations.length > 0
      ? ` Combinaisons possibles avec « ${config.initial ?? config.hanzi} » : ${config.combinations
          .map((final) => normalizeFinal(final))
          .join(', ')}.`
      : ''
  }`,
  examples: [
    {
      hanzi: config.exampleHanzi,
      pinyin: config.examplePinyin,
      translation: config.exampleTranslation,
      ...(config.exampleAudio ? { audio: config.exampleAudio } : {})
    }
  ],
  quiz: {
    prompt: config.translation,
    choices: [config.translation, config.translationFr],
    correctChoiceIndex: 0
  },
  tags: config.tags,
  theme: 'pinyin'
});

const createPhraseWord = (config: {
  id: string;
  hanzi: string;
  pinyin: string;
  translation: string;
  translationFr: string;
  audio?: string;
  explanation?: string;
  quizPrompt: string;
  quizChoices: string[];
  correctChoiceIndex: number;
  tags: string[];
  examples?: LessonExample[];
}): LessonItem => {
  const resolvedAudio = config.audio ?? findExampleAudio(config.hanzi);

  return {
    id: config.id,
    level: 'hsk1',
    hanzi: config.hanzi,
    pinyin: config.pinyin,
    translation: config.translation,
    translationFr: config.translationFr,
    category: 'phrase',
    explanation: config.explanation,
    audio: resolvedAudio,
    examples: enrichExamplesWithAudio(
      config.examples ??
        [
          {
            hanzi: config.hanzi,
            pinyin: config.pinyin,
            translation: config.translationFr
          }
        ]
    ),
    quiz: {
      prompt: config.quizPrompt,
      choices: config.quizChoices,
      correctChoiceIndex: config.correctChoiceIndex
    },
    tags: config.tags,
    theme: 'phrases'
  };
};

const createKeyVocabularyWord = (config: {
  id: string;
  hanzi: string;
  pinyin: string;
  translation: string;
  translationFr: string;
  explanation: string;
  quizPrompt?: string;
  quizChoices?: string[];
  correctChoiceIndex?: number;
  tags: string[];
  examples?: LessonExample[];
  audio?: string;
}): LessonItem => {
  const datasetEntry = getLessonByHanzi(config.hanzi);

  const defaultExample: LessonExample = {
    hanzi: config.hanzi,
    pinyin: config.pinyin,
    translation: config.translationFr
  };

  const datasetExamples = datasetEntry?.examples ?? [];

  const resolvedAudio = config.audio ?? datasetEntry?.audio ?? findExampleAudio(config.hanzi);

  return {
    id: config.id,
    level: 'hsk1',
    hanzi: config.hanzi,
    pinyin: config.pinyin,
    translation: config.translation,
    translationFr: config.translationFr,
    category: 'vocabulaire',
    explanation: config.explanation,
    audio: resolvedAudio,
    examples: enrichExamplesWithAudio(
      config.examples ??
        (datasetExamples.length > 0 ? datasetExamples : [defaultExample])
    ),
    quiz: {
      prompt:
        config.quizPrompt ??
        datasetEntry?.quiz?.prompt ??
        `Que signifie « ${config.hanzi} » ?`,
      choices:
        config.quizChoices ??
        datasetEntry?.quiz?.choices ??
        [config.translationFr, config.translation],
      correctChoiceIndex:
        config.correctChoiceIndex ??
        datasetEntry?.quiz?.correctChoiceIndex ??
        0
    },
    tags: config.tags,
    theme: datasetEntry?.theme ?? 'phrases'
  };
};

interface InitialConsonantEntry {
  id: string;
  letter: keyof typeof initialCombinationMap;
  syllable: string;
  note: string;
  example: { hanzi: string; pinyin: string; translation: string; audio: string };
}

const initialConsonantBase: InitialConsonantEntry[] = [
  {
    id: 'py-initial-b',
    letter: 'b',
    syllable: 'bo',
    note: 'Consonne non aspirée, lèvres fermées puis relâchées.',
    example: { hanzi: '爸', pinyin: 'bà', translation: 'papa', audio: 'audio/hsk1/hsk1_爸.wav' }
  },
  {
    id: 'py-initial-p',
    letter: 'p',
    syllable: 'po',
    note: 'Même articulation que b mais avec un souffle net.',
    example: { hanzi: '朋友', pinyin: 'péngyou', translation: 'ami', audio: 'audio/hsk1/hsk1_朋友.wav' }
  },
  {
    id: 'py-initial-m',
    letter: 'm',
    syllable: 'mo',
    note: 'Lèvres fermées, l’air vibre dans le nez.',
    example: { hanzi: '妈妈', pinyin: 'māma', translation: 'maman', audio: 'audio/hsk1/hsk1_妈妈.wav' }
  },
  {
    id: 'py-initial-f',
    letter: 'f',
    syllable: 'fo',
    note: 'Lèvre inférieure contre les dents supérieures.',
    example: { hanzi: '饭', pinyin: 'fàn', translation: 'repas', audio: 'audio/hsk1/hsk1_饭.wav' }
  },
  {
    id: 'py-initial-d',
    letter: 'd',
    syllable: 'de',
    note: 'Langue contre les dents supérieures, relâcher sans souffle.',
    example: { hanzi: '大', pinyin: 'dà', translation: 'grand', audio: 'audio/hsk1/hsk1_大.wav' }
  },
  {
    id: 'py-initial-t',
    letter: 't',
    syllable: 'te',
    note: 'Même position que d mais avec un souffle marqué.',
    example: { hanzi: '他', pinyin: 'tā', translation: 'il', audio: 'audio/hsk1/hsk1_他.wav' }
  },
  {
    id: 'py-initial-n',
    letter: 'n',
    syllable: 'ne',
    note: 'Langue touche le palais juste derrière les dents.',
    example: { hanzi: '你', pinyin: 'nǐ', translation: 'tu', audio: 'audio/hsk1/hsk1_你.wav' }
  },
  {
    id: 'py-initial-l',
    letter: 'l',
    syllable: 'le',
    note: 'Langue sur le palais, l’air passe sur les côtés.',
    example: { hanzi: '老师', pinyin: 'lǎoshī', translation: 'professeur', audio: 'audio/hsk1/hsk1_老师.wav' }
  },
  {
    id: 'py-initial-g',
    letter: 'g',
    syllable: 'ge',
    note: 'Consonne gutturale non aspirée.',
    example: { hanzi: '哥', pinyin: 'gē', translation: 'grand frère', audio: 'audio/hsk1/hsk1_哥.wav' }
  },
  {
    id: 'py-initial-k',
    letter: 'k',
    syllable: 'ke',
    note: 'Même articulation que g mais avec souffle.',
    example: { hanzi: '课', pinyin: 'kè', translation: 'cours', audio: 'audio/hsk1/hsk1_课.wav' }
  },
  {
    id: 'py-initial-h',
    letter: 'h',
    syllable: 'he',
    note: 'Fricative de gorge avec un souffle chaud.',
    example: { hanzi: '喝', pinyin: 'hē', translation: 'boire', audio: 'audio/hsk1/hsk1_喝.wav' }
  },
  {
    id: 'py-initial-j',
    letter: 'j',
    syllable: 'ji',
    note: 'Consonne douce (dj) sans aspiration.',
    example: { hanzi: '家', pinyin: 'jiā', translation: 'maison', audio: 'audio/hsk1/hsk1_家.wav' }
  },
  {
    id: 'py-initial-q',
    letter: 'q',
    syllable: 'qi',
    note: 'Prononcez « tchi » avec souffle.',
    example: { hanzi: '七', pinyin: 'qī', translation: 'sept', audio: 'audio/hsk1/hsk1_七.wav' }
  },
  {
    id: 'py-initial-x',
    letter: 'x',
    syllable: 'xi',
    note: 'Fricative douce, bouche étirée.',
    example: { hanzi: '西', pinyin: 'xī', translation: 'ouest', audio: 'audio/hsk1/hsk1_西.wav' }
  }
];

const initialConsonantConfigs = initialConsonantBase.map((entry) => ({
  ...entry,
  combinations: initialCombinationMap[entry.letter] ?? []
}));

// Leçons simplifiées utilisant directement les hanzi ou du contenu sur mesure
export const simpleLessons: SimpleLessonConfig[] = [
  // ===== PINYIN & TONES =====
  {
    id: 'pinyin-1-initials',
    title: 'Consonnes initiales',
    titleEn: 'Initial consonants',
    level: 'hsk1',
    duration: 20,
    customWords: initialConsonantConfigs.map(config =>
      createPinyinWord({
        id: config.id,
        initial: config.letter,
        hanzi: config.letter,
        pinyin: config.letter,
        audioLetter: `audio/pinyin/${config.letter}.mp3`,
        translation: `Consonne initiale "${config.letter}"`,
        translationFr: `Consonne initiale « ${config.letter} »`,
        explanation: `${config.note}`,
        exampleHanzi: config.example.hanzi,
        examplePinyin: config.example.pinyin,
        exampleTranslation: config.example.translation,
        exampleAudio: config.example.audio,
        // audio: `audio/pinyin/${config.syllable}.wav`,
        combinations: config.combinations,
        tags: ['pinyin', 'initial']
      })
    )
  },
  {
    id: 'pinyin-2-finals',
    title: 'Voyelles finales',
    titleEn: 'Final vowels',
    level: 'hsk1',
    duration: 15,
    customWords: [
      createPinyinWord({
        id: 'py-final-a',
        hanzi: 'a',
        pinyin: 'a',
        audioLetter: 'audio/pinyin/a.mp3',
        translation: 'Voyelle ouverte "a"',
        translationFr: 'Voyelle ouverte « a »',
        explanation: 'Grande ouverture de la bouche, son clair.',
        exampleHanzi: '妈',
        examplePinyin: 'mā',
        exampleTranslation: 'maman',
        exampleAudio: 'audio/hsk1/hsk1_妈.wav',
        audio: 'audio/hsk1/hsk1_妈.wav',
        tags: ['pinyin', 'final']
      }),
      createPinyinWord({
        id: 'py-final-o',
        hanzi: 'o',
        pinyin: 'o',
        audioLetter: 'audio/pinyin/o.mp3',
        translation: 'Voyelle arrondie "o"',
        translationFr: 'Voyelle arrondie « o »',
        explanation: 'Lèvres arrondies, son plus fermé qu’en français.',
        exampleHanzi: '我',
        examplePinyin: 'wǒ',
        exampleTranslation: 'moi',
        exampleAudio: 'audio/hsk1/hsk1_我.wav',
        audio: 'audio/hsk1/hsk1_我.wav',
        tags: ['pinyin', 'final']
      }),
      createPinyinWord({
        id: 'py-final-e',
        hanzi: 'e',
        pinyin: 'e',
        audioLetter: 'audio/pinyin/e.mp3',
        translation: 'Voyelle centrale "e"',
        translationFr: 'Voyelle centrale « e »',
        explanation: 'La bouche est ouverte mais relâchée, son neutre.',
        exampleHanzi: '喝',
        examplePinyin: 'hē',
        exampleTranslation: 'boire',
        exampleAudio: 'audio/hsk1/hsk1_喝.wav',
        audio: 'audio/hsk1/hsk1_喝.wav',
        tags: ['pinyin', 'final']
      }),
      createPinyinWord({
        id: 'py-final-i',
        hanzi: 'i',
        pinyin: 'i',
        audioLetter: 'audio/pinyin/i.mp3',
        translation: 'Voyelle fermée "i"',
        translationFr: 'Voyelle fermée « i »',
        explanation: 'Lèvres étirées, pointe de la langue contre les dents inférieures.',
        exampleHanzi: '你',
        examplePinyin: 'nǐ',
        exampleTranslation: 'tu',
        exampleAudio: 'audio/hsk1/hsk1_你.wav',
        audio: 'audio/hsk1/hsk1_你.wav',
        tags: ['pinyin', 'final']
      }),
      createPinyinWord({
        id: 'py-final-u',
        hanzi: 'u',
        pinyin: 'u',
        audioLetter: 'audio/pinyin/u.mp3',
        translation: 'Voyelle fermée "u"',
        translationFr: 'Voyelle fermée « u »',
        explanation: 'Lèvres très arrondies, langue en arrière.',
        exampleHanzi: '书',
        examplePinyin: 'shū',
        exampleTranslation: 'livre',
        exampleAudio: 'audio/hsk1/hsk1_书.wav',
        audio: 'audio/hsk1/hsk1_书.wav',
        tags: ['pinyin', 'final']
      }),
      createPinyinWord({
        id: 'py-final-umlaut',
        hanzi: 'ü',
        pinyin: 'ü',
        audioLetter: 'audio/pinyin/v.mp3',
        translation: 'Voyelle arrondie frontale "ü"',
        translationFr: 'Voyelle arrondie frontale « ü »',
        explanation: 'Dites i en arrondissant les lèvres.',
        exampleHanzi: '女',
        examplePinyin: 'nǚ',
        exampleTranslation: 'femme',
        exampleAudio: 'audio/hsk1/hsk1_女.wav',
        audio: 'audio/hsk1/hsk1_女.wav',
        tags: ['pinyin', 'final']
      })
    ]
  },
  {
    id: 'pinyin-3-tones',
    title: 'Les quatre tons',
    titleEn: 'The four tones',
    level: 'hsk1',
    duration: 20,
    customWords: [
      createPinyinWord({
        id: 'py-tone-1',
        hanzi: 'mā',
        pinyin: 'mā',
        translation: 'Premier ton — haut et plat',
        translationFr: 'Premier ton — haut et stable',
        explanation: 'Gardez la voix stable, comme tenir une note.',
        exampleHanzi: '妈',
        examplePinyin: 'mā',
        exampleTranslation: 'maman',
        audio: 'audio/hsk1/hsk1_妈.wav',
        tags: ['pinyin', 'tone']
      }),
      createPinyinWord({
        id: 'py-tone-2',
        hanzi: 'má',
        pinyin: 'má',
        translation: 'Deuxième ton — montant',
        translationFr: 'Deuxième ton — montant',
        explanation: 'Commencez médium puis montez comme pour poser une question.',
        exampleHanzi: '麻',
        examplePinyin: 'má',
        exampleTranslation: 'chanvre',
        audio: 'audio/hsk7/hsk7_麻.wav',
        tags: ['pinyin', 'tone']
      }),
      createPinyinWord({
        id: 'py-tone-3',
        hanzi: 'mǎ',
        pinyin: 'mǎ',
        translation: 'Troisième ton — descendant-montant',
        translationFr: 'Troisième ton — descendant puis remontant',
        explanation: 'Baissez la voix puis remontez légèrement.',
        exampleHanzi: '马',
        examplePinyin: 'mǎ',
        exampleTranslation: 'cheval',
        audio: 'audio/hsk3/hsk3_马.wav',
        tags: ['pinyin', 'tone']
      }),
      createPinyinWord({
        id: 'py-tone-4',
        hanzi: 'mà',
        pinyin: 'mà',
        translation: 'Quatrième ton — descendant',
        translationFr: 'Quatrième ton — descendant',
        explanation: 'Voix forte qui chute rapidement, comme un ordre.',
        exampleHanzi: '骂',
        examplePinyin: 'mà',
        exampleTranslation: 'gronder',
        audio: 'audio/hsk5/hsk5_骂.wav',
        tags: ['pinyin', 'tone']
      })
    ]
  },
  {
    id: 'pinyin-4-combinations',
    title: 'Combinaisons complexes',
    titleEn: 'Complex combinations',
    level: 'hsk1',
    duration: 20,
    customWords: [
      createPinyinWord({
        id: 'py-combo-zh',
        hanzi: 'zh',
        pinyin: 'zh',
        audioLetter: 'audio/pinyin/zh.mp3',
        translation: 'Son rétroflexe "zh"',
        translationFr: 'Son rétroflexe « zh »',
        explanation: 'Placez la langue recourbée vers le palais.',
        exampleHanzi: '知道',
        examplePinyin: 'zhīdào',
        exampleTranslation: 'savoir',
        audio: 'audio/hsk1/hsk1_知道.wav',
        tags: ['pinyin', 'combinaison']
      }),
      createPinyinWord({
        id: 'py-combo-ch',
        hanzi: 'ch',
        pinyin: 'ch',
        audioLetter: 'audio/pinyin/ch.mp3',
        translation: 'Son rétroflexe aspiré "ch"',
        translationFr: 'Son rétroflexe aspiré « ch »',
        explanation: 'Comme zh mais avec un souffle marqué.',
        exampleHanzi: '吃',
        examplePinyin: 'chī',
        exampleTranslation: 'manger',
        audio: 'audio/hsk1/hsk1_吃.wav',
        tags: ['pinyin', 'combinaison']
      }),
      createPinyinWord({
        id: 'py-combo-sh',
        hanzi: 'sh',
        pinyin: 'sh',
        audioLetter: 'audio/pinyin/sh.mp3',
        translation: 'Son rétroflexe "sh"',
        translationFr: 'Son rétroflexe « sh »',
        explanation: 'Langue recourbée, son proche de « ch » français.',
        exampleHanzi: '山',
        examplePinyin: 'shān',
        exampleTranslation: 'montagne',
        audio: 'audio/hsk1/hsk1_山.wav',
        tags: ['pinyin', 'combinaison']
      }),
      createPinyinWord({
        id: 'py-combo-r',
        hanzi: 'r',
        pinyin: 'r',
        audioLetter: 'audio/pinyin/r.mp3',
        translation: 'Son rétroflexe "r"',
        translationFr: 'Son rétroflexe « r »',
        explanation: 'Entre le « j » français et le « r » anglais.',
        exampleHanzi: '热',
        examplePinyin: 'rè',
        exampleTranslation: 'chaud',
        audio: 'audio/hsk1/hsk1_热.wav',
        tags: ['pinyin', 'combinaison']
      }),
      createPinyinWord({
        id: 'py-combo-z',
        hanzi: 'z',
        pinyin: 'z',
        audioLetter: 'audio/pinyin/z.mp3',
        translation: 'Affriquée "z"',
        translationFr: 'Affriquée « z »',
        explanation: 'Commencez par d puis finissez par s.',
        exampleHanzi: '早',
        examplePinyin: 'zǎo',
        exampleTranslation: 'matin',
        audio: 'audio/hsk1/hsk1_早.wav',
        tags: ['pinyin', 'combinaison']
      }),
      createPinyinWord({
        id: 'py-combo-c',
        hanzi: 'c',
        pinyin: 'c',
        audioLetter: 'audio/pinyin/c.mp3',
        translation: 'Affriquée aspirée "c"',
        translationFr: 'Affriquée aspirée « c »',
        explanation: 'Comme z mais avec souffle.',
        exampleHanzi: '菜',
        examplePinyin: 'cài',
        exampleTranslation: 'plat, légume',
        audio: 'audio/hsk1/hsk1_菜.wav',
        tags: ['pinyin', 'combinaison']
      }),
      createPinyinWord({
        id: 'py-combo-s',
        hanzi: 's',
        pinyin: 's',
        audioLetter: 'audio/pinyin/s.mp3',
        translation: 'Fricative alvéolaire "s"',
        translationFr: 'Fricative alvéolaire « s »',
        explanation: 'Similar to s français mais plus concentré.',
        exampleHanzi: '四',
        examplePinyin: 'sì',
        exampleTranslation: 'quatre',
        audio: 'audio/hsk1/hsk1_四.wav',
        tags: ['pinyin', 'combinaison']
      })
    ]
  },
  {
    id: 'pinyin-5-practice',
    title: 'Pratique complète',
    titleEn: 'Complete practice',
    level: 'hsk1',
    duration: 25,
    words: ['妈', '爸', '朋友', '老师', '茶', '喝', '吃', '中国']
  },
  {
    id: 'phrases-1-greetings',
    title: 'Salutations utiles',
    titleEn: 'Useful greetings',
  level: 'hsk1',
  duration: 15,
  customWords: [
      createKeyVocabularyWord({
        id: 'phr-greet-word-ni',
        hanzi: '你',
        pinyin: 'nǐ',
        translation: 'you (singular)',
        translationFr: 'tu / vous (informel)',
        explanation: 'Pronom de la 2e personne utilisé pour s’adresser directement à quelqu’un.',
        quizPrompt: 'Que signifie le caractère « 你 » ?',
        quizChoices: ['tu / vous', 'bonjour', 'merci', 'matin'],
        correctChoiceIndex: 0,
        tags: ['salutation', 'mot-clé'],
        examples: [
          {
            hanzi: '你好吗？',
            pinyin: 'nǐ hǎo ma?',
            translation: 'Comment vas-tu ?'
          }
        ]
      }),
      createKeyVocabularyWord({
        id: 'phr-greet-word-hao',
        hanzi: '好',
        pinyin: 'hǎo',
        translation: 'good',
        translationFr: 'bien, bon',
        explanation: 'Adjectif très courant signifiant « bien » ; combiné avec 你 pour dire 你好.',
        quizPrompt: 'Comment traduit-on « 好 » ?',
        quizChoices: ['bien', 'voir', 'venir', 'famille'],
        correctChoiceIndex: 0,
        tags: ['salutation', 'mot-clé'],
        examples: [
          {
            hanzi: '很好',
            pinyin: 'hěn hǎo',
            translation: 'très bien'
          }
        ]
      }),
      createKeyVocabularyWord({
        id: 'phr-greet-word-zaoshang',
        hanzi: '早上',
        pinyin: 'zǎoshang',
        translation: 'morning',
        translationFr: 'matin',
        explanation: 'Nom commun pour parler de la matinée. Sert dans 早上好.',
        quizPrompt: 'Quel moment de la journée désigne « 早上 » ?',
        quizChoices: ['le matin', 'le soir', 'l’après-midi', 'la nuit'],
        correctChoiceIndex: 0,
        tags: ['salutation', 'mot-clé'],
        examples: [
          {
            hanzi: '早上见！',
            pinyin: 'zǎoshang jiàn!',
            translation: 'À demain matin !'
          }
        ]
      }),
      createPhraseWord({
        id: 'phr-greet-hello',
        hanzi: '你好！',
        pinyin: 'nǐ hǎo',
        translation: 'hello',
        translationFr: 'bonjour',
        audio: 'audio/phrases/greeting_nihao.wav',
        explanation: 'Salutation neutre utilisable à tout moment.',
        quizPrompt: 'Que signifie « 你好 » ?',
        quizChoices: ['Bonjour', 'Merci', 'Au revoir', 'Pardon'],
        correctChoiceIndex: 0,
        tags: ['salutation', 'conversation']
      }),
      createPhraseWord({
        id: 'phr-greet-morning',
        hanzi: '早上好！',
        pinyin: 'zǎoshang hǎo',
        translation: 'good morning',
        translationFr: 'bonjour (matin)',
        audio: 'audio/phrases/greeting_zaoshanghao.wav',
        explanation: 'Formule chaleureuse pour saluer le matin.',
        quizPrompt: 'Quelle phrase utilise-t-on pour dire « bonjour » le matin ?',
        quizChoices: ['早上好', '晚上好', '再见', '谢谢'],
        correctChoiceIndex: 0,
        tags: ['salutation', 'matin']
      }),
      createPhraseWord({
        id: 'phr-greet-evening',
        hanzi: '晚上好！',
        pinyin: 'wǎnshang hǎo',
        translation: 'good evening',
        translationFr: 'bonsoir',
        audio: 'audio/phrases/greeting_wanshanghao.wav',
        explanation: 'Pour souhaiter une bonne soirée en arrivant.',
        quizPrompt: 'Comment dire « bonsoir » en chinois ?',
        quizChoices: ['晚上好', '早上好', '你好', '对不起'],
        correctChoiceIndex: 0,
        tags: ['salutation', 'soir']
      }),
      createPhraseWord({
        id: 'phr-greet-bye',
        hanzi: '再见！',
        pinyin: 'zàijiàn',
        translation: 'goodbye',
        translationFr: 'au revoir',
        audio: 'audio/phrases/greeting_zaijian.wav',
        explanation: 'Expression standard pour prendre congé.',
        quizPrompt: 'Quelle expression signifie « au revoir » ?',
        quizChoices: ['再见', '你好', '谢谢', '没关系'],
        correctChoiceIndex: 0,
        tags: ['salutation', 'au revoir']
      })
    ]
  },
  {
    id: 'phrases-2-introductions',
    title: 'Se présenter naturellement',
    titleEn: 'Introducing yourself',
  level: 'hsk1',
  duration: 15,
  customWords: [
      createKeyVocabularyWord({
        id: 'phr-intro-word-jiao',
        hanzi: '叫',
        pinyin: 'jiào',
        translation: 'to be called',
        translationFr: 's’appeler',
        explanation: 'Verbe permettant de donner son prénom : 我叫…',
        quizPrompt: 'Quel verbe permet de dire « je m’appelle » ?',
        quizChoices: ['叫', '看', '吃', '到'],
        correctChoiceIndex: 0,
        tags: ['présentation', 'mot-clé'],
        examples: [
          { hanzi: '我叫小明。', pinyin: 'wǒ jiào Xiǎomíng.', translation: 'Je m’appelle Xiaoming.' }
        ]
      }),
      createKeyVocabularyWord({
        id: 'phr-intro-word-mingzi',
        hanzi: '名字',
        pinyin: 'míngzi',
        translation: 'name',
        translationFr: 'nom',
        explanation: 'Mot indispensable pour demander ou donner un nom.',
        quizPrompt: 'Que veut dire « 名字 » ?',
        quizChoices: ['nom', 'âge', 'pays', 'travail'],
        correctChoiceIndex: 0,
        tags: ['présentation', 'mot-clé'],
        examples: [
          { hanzi: '你的名字是什么？', pinyin: 'nǐ de míngzi shì shénme?', translation: 'Quel est ton nom ?' }
        ]
      }),
      createKeyVocabularyWord({
        id: 'phr-intro-word-renshi',
        hanzi: '认识',
        pinyin: 'rènshi',
        translation: 'to know (someone)',
        translationFr: 'connaître, rencontrer',
        explanation: 'Utilisé dans 很高兴认识你 (« ravi de te rencontrer »).',
        quizPrompt: 'Dans quelle expression apparaît le verbe 认识 ?',
        quizChoices: ['很高兴认识你', '再见', '谢谢', '没关系'],
        correctChoiceIndex: 0,
        tags: ['présentation', 'mot-clé'],
        examples: [
          { hanzi: '我认识他。', pinyin: 'wǒ rènshi tā.', translation: 'Je le connais.' }
        ]
      }),
      createPhraseWord({
        id: 'phr-intro-name',
        hanzi: '我叫李华。',
        pinyin: 'wǒ jiào lǐ huá',
        translation: 'My name is Li Hua.',
        translationFr: 'Je m’appelle Li Hua.',
        audio: 'audio/phrases/intro_wojiaolihua.wav',
        explanation: 'Structure « 我叫… » pour dire son prénom.',
        quizPrompt: 'Comment dire « Je m’appelle Li Hua » ?',
        quizChoices: ['我叫李华', '我是李华', '我姓李', '我去李华'],
        correctChoiceIndex: 0,
        tags: ['présentation', 'identité']
      }),
      createPhraseWord({
        id: 'phr-intro-askname',
        hanzi: '你叫什么名字？',
        pinyin: 'nǐ jiào shénme míngzi?',
        translation: 'What is your name?',
        translationFr: 'Comment tu t’appelles ?',
        audio: 'audio/phrases/intro_nijiaoshenme.wav',
        explanation: 'Question standard pour demander un nom.',
        quizPrompt: 'Quelle phrase permet de demander le nom de quelqu’un ?',
        quizChoices: ['你叫什么名字？', '你是谁？', '你从哪来？', '你好吗？'],
        correctChoiceIndex: 0,
        tags: ['présentation', 'question']
      }),
      createPhraseWord({
        id: 'phr-intro-country',
        hanzi: '我是法国人。',
        pinyin: 'wǒ shì fǎguó rén',
        translation: 'I am French.',
        translationFr: 'Je suis français(e).',
        audio: 'audio/phrases/intro_woshifaguoren.wav',
        explanation: 'Structure pour indiquer sa nationalité.',
        quizPrompt: 'Comment dire « Je suis français » en chinois ?',
        quizChoices: ['我是法国人', '我是法国', '我叫法国人', '我有法国人'],
        correctChoiceIndex: 0,
        tags: ['présentation', 'origine']
      }),
      createPhraseWord({
        id: 'phr-intro-nicetomeet',
        hanzi: '很高兴认识你。',
        pinyin: 'hěn gāoxìng rènshi nǐ',
        translation: 'Nice to meet you.',
        translationFr: 'Ravi de te rencontrer.',
        audio: 'audio/phrases/intro_hengaoxing.wav',
        explanation: 'Formule polie après une présentation.',
        quizPrompt: 'Quelle phrase signifie « Ravi de te rencontrer » ?',
        quizChoices: ['很高兴认识你', '欢迎光临', '慢走', '请进'],
        correctChoiceIndex: 0,
        tags: ['présentation', 'politesse']
      })
    ]
  },
  {
    id: 'phrases-3-politeness',
    title: 'Formules de politesse',
    titleEn: 'Polite expressions',
  level: 'hsk1',
  duration: 15,
  customWords: [
      createKeyVocabularyWord({
        id: 'phr-polite-word-qing',
        hanzi: '请',
        pinyin: 'qǐng',
        translation: 'please / to invite',
        translationFr: 's’il te plaît / inviter',
        explanation: 'Permet d’adoucir une demande ou d’inviter quelqu’un.',
        quizPrompt: 'Quel caractère ajoute-t-on pour dire « s’il te plaît » ?',
        quizChoices: ['请', '对', '再', '很'],
        correctChoiceIndex: 0,
        tags: ['politesse', 'mot-clé'],
        examples: [
          { hanzi: '请坐。', pinyin: 'qǐng zuò.', translation: 'Veuillez vous asseoir.' }
        ]
      }),
      createKeyVocabularyWord({
        id: 'phr-polite-word-duibuqi',
        hanzi: '对不起',
        pinyin: 'duìbuqǐ',
        translation: 'sorry',
        translationFr: 'désolé',
        explanation: 'Expression clé pour présenter des excuses.',
        quizPrompt: 'Comment s’excuser poliment ?',
        quizChoices: ['对不起', '谢谢', '没关系', '你好'],
        correctChoiceIndex: 0,
        tags: ['politesse', 'mot-clé'],
        examples: [
          { hanzi: '对不起，我来晚了。', pinyin: 'duìbuqǐ, wǒ lái wǎn le.', translation: 'Désolé, je suis en retard.' }
        ]
      }),
      createKeyVocabularyWord({
        id: 'phr-polite-word-keqi',
        hanzi: '客气',
        pinyin: 'kèqi',
        translation: 'polite',
        translationFr: 'poli / courtois',
        explanation: 'Employé dans 不客气 pour répondre à « merci ».',
        quizPrompt: 'Que signifie 客气 dans l’expression 不客气 ?',
        quizChoices: ['poli', 'faim', 'petit', 'lent'],
        correctChoiceIndex: 0,
        tags: ['politesse', 'mot-clé'],
        examples: [
          { hanzi: '他很客气。', pinyin: 'tā hěn kèqi.', translation: 'Il est très poli.' }
        ]
      }),
      createPhraseWord({
        id: 'phr-pol-thanks',
        hanzi: '谢谢你！',
        pinyin: 'xièxie nǐ',
        translation: 'Thank you!',
        translationFr: 'Merci !',
        audio: 'audio/phrases/polite_xiexie.wav',
        explanation: 'Formule classique pour remercier quelqu’un.',
        quizPrompt: 'Quelle phrase signifie « merci » ?',
        quizChoices: ['谢谢你', '对不起', '请坐', '没问题'],
        correctChoiceIndex: 0,
        tags: ['politesse']
      }),
      createPhraseWord({
        id: 'phr-pol-yourewelcome',
        hanzi: '不客气。',
        pinyin: 'bú kèqi',
        translation: 'You’re welcome.',
        translationFr: 'De rien.',
        audio: 'audio/phrases/polite_bukeqi.wav',
        explanation: 'Réponse directe après un remerciement.',
        quizPrompt: 'Comment répondre à « merci » ?',
        quizChoices: ['不客气', '没关系', '再见', '你好'],
        correctChoiceIndex: 0,
        tags: ['politesse']
      }),
      createPhraseWord({
        id: 'phr-pol-sorry',
        hanzi: '对不起。',
        pinyin: 'duìbuqǐ',
        translation: 'I am sorry.',
        translationFr: 'Je suis désolé.',
        audio: 'audio/phrases/polite_duibuqi.wav',
        explanation: 'Expression courte pour présenter des excuses.',
        quizPrompt: 'Quelle phrase signifie « Je suis désolé » ?',
        quizChoices: ['对不起。', '谢谢。', '没关系。', '请坐。'],
        correctChoiceIndex: 0,
        tags: ['politesse', 'excuses']
      }),
      createPhraseWord({
        id: 'phr-pol-noproblem',
        hanzi: '没关系。',
        pinyin: 'méi guānxi',
        translation: 'No problem.',
        translationFr: 'Ce n’est rien.',
        audio: 'audio/phrases/polite_meiguanxi.wav',
        explanation: 'Réponse pour accepter des excuses.',
        quizPrompt: 'Que répondre pour dire « Ce n’est pas grave » ?',
        quizChoices: ['没关系', '请问', '谢谢', '对不起'],
        correctChoiceIndex: 0,
        tags: ['politesse', 'réponse']
      })
    ]
  },
  {
    id: 'phrases-4-questions',
    title: 'Questions essentielles',
    titleEn: 'Essential questions',
  level: 'hsk1',
  duration: 15,
  customWords: [
      createKeyVocabularyWord({
        id: 'phr-question-word-shenme',
        hanzi: '什么',
        pinyin: 'shénme',
        translation: 'what',
        translationFr: 'quoi',
        explanation: 'Mot interrogatif utilisé dans la plupart des questions ouvertes.',
        quizPrompt: 'Quel mot veut dire « quoi » ?',
        quizChoices: ['什么', '哪儿', '谁', '什么时候'],
        correctChoiceIndex: 0,
        tags: ['question', 'mot-clé'],
        examples: [
          { hanzi: '你喜欢什么？', pinyin: 'nǐ xǐhuan shénme?', translation: 'Qu’aimes-tu ?' }
        ]
      }),
      createKeyVocabularyWord({
        id: 'phr-question-word-nar',
        hanzi: '哪儿',
        pinyin: 'nǎr',
        translation: 'where',
        translationFr: 'où',
        explanation: 'Forme courante pour demander un lieu en mandarin parlé.',
        quizPrompt: 'Comment demander « où » ?',
        quizChoices: ['哪儿', '什么', '谁', '怎么'],
        correctChoiceIndex: 0,
        tags: ['question', 'mot-clé'],
        examples: [
          { hanzi: '厕所在哪儿？', pinyin: 'cèsuǒ zài nǎr?', translation: 'Où sont les toilettes ?' }
        ]
      }),
      createKeyVocabularyWord({
        id: 'phr-question-word-shenmashihou',
        hanzi: '什么时候',
        pinyin: 'shénme shíhou',
        translation: 'when',
        translationFr: 'quand',
        explanation: 'Permet de demander un moment précis.',
        quizPrompt: 'Quelle expression signifie « quand » ?',
        quizChoices: ['什么时候', '多少', '那里', '为什么'],
        correctChoiceIndex: 0,
        tags: ['question', 'mot-clé'],
        examples: [
          { hanzi: '你什么时候来？', pinyin: 'nǐ shénme shíhou lái?', translation: 'Quand viens-tu ?' }
        ]
      }),
      createPhraseWord({
        id: 'phr-ask-drink',
        hanzi: '你想喝什么？',
        pinyin: 'nǐ xiǎng hē shénme?',
        translation: 'What would you like to drink?',
        translationFr: 'Que veux-tu boire ?',
        audio: 'audio/phrases/question_nixiangheshenme.wav',
        explanation: 'Question classique pour proposer une boisson.',
        quizPrompt: 'Quelle phrase veut dire « Que veux-tu boire ? » ?',
        quizChoices: ['你想喝什么？', '你去哪儿？', '你叫什么？', '你是老师吗？'],
        correctChoiceIndex: 0,
        tags: ['question', 'restaurant']
      }),
      createPhraseWord({
        id: 'phr-ask-who',
        hanzi: '他是谁？',
        pinyin: 'tā shì shuí?',
        translation: 'Who is he?',
        translationFr: 'Qui est-il ?',
        audio: 'audio/phrases/question_tashishui.wav',
        explanation: 'Utiliser 谁 pour demander l’identité.',
        quizPrompt: 'Quelle phrase signifie « Qui est-il ? » ?',
        quizChoices: ['他是谁？', '他在哪儿？', '他多大？', '他什么时候来？'],
        correctChoiceIndex: 0,
        tags: ['question', 'identité']
      }),
      createPhraseWord({
        id: 'phr-ask-restroom',
        hanzi: '洗手间在哪儿？',
        pinyin: 'xǐshǒujiān zài nǎr?',
        translation: 'Where is the restroom?',
        translationFr: 'Où sont les toilettes ?',
        audio: 'audio/phrases/question_xishoujian.wav',
        explanation: 'Question de survie lors d’un déplacement.',
        quizPrompt: 'Comment demander « Où sont les toilettes ? » ?',
        quizChoices: ['洗手间在哪儿？', '你去哪儿？', '现在几点？', '请坐'],
        correctChoiceIndex: 0,
        tags: ['question', 'orientation']
      }),
      createPhraseWord({
        id: 'phr-ask-when',
        hanzi: '你什么时候回来？',
        pinyin: 'nǐ shénme shíhou huílai?',
        translation: 'When will you come back?',
        translationFr: 'Quand reviens-tu ?',
        audio: 'audio/phrases/question_nishenmeshihou.wav',
        explanation: 'Utilise 什么时候 pour parler du temps.',
        quizPrompt: 'Quelle phrase veut dire « Quand reviens-tu ? » ?',
        quizChoices: ['你什么时候回来？', '你是谁？', '你去哪儿？', '你喝什么？'],
        correctChoiceIndex: 0,
        tags: ['question', 'temps']
      })
    ]
  },
  {
    id: 'phrases-5-yes-no',
    title: 'Répondre oui / non',
    titleEn: 'Answering yes/no',
    level: 'hsk1',
    duration: 12,
    customWords: [
      createPhraseWord({
        id: 'phr-yesno-question',
        hanzi: '你是老师吗？',
        pinyin: 'nǐ shì lǎoshī ma?',
        translation: 'Are you a teacher?',
        translationFr: 'Es-tu professeur ?',
        audio: 'audio/phrases/yesno_nishilaoshima.wav',
        explanation: 'Structure question oui/non avec 吗.',
        quizPrompt: 'Quelle phrase signifie « Es-tu professeur ? » ?',
        quizChoices: ['你是老师吗？', '你是老师吧？', '你是谁？', '你去上课吗？'],
        correctChoiceIndex: 0,
        tags: ['question', 'oui-non']
      }),
      createPhraseWord({
        id: 'phr-yesno-affirm',
        hanzi: '是的，我是老师。',
        pinyin: 'shì de, wǒ shì lǎoshī',
        translation: 'Yes, I am a teacher.',
        translationFr: 'Oui, je suis professeur.',
        audio: 'audio/phrases/yesno_shide.wav',
        explanation: 'Utiliser 是的 pour confirmer.',
        quizPrompt: 'Comment répondre positivement à une question « 吗 » ?',
        quizChoices: ['是的，我是老师。', '不是，我是老师。', '我不是老师。', '我也不知道。'],
        correctChoiceIndex: 0,
        tags: ['oui-non', 'affirmation']
      }),
      createPhraseWord({
        id: 'phr-yesno-negative',
        hanzi: '不是，我不是学生。',
        pinyin: 'bú shì, wǒ bú shì xuésheng',
        translation: 'No, I am not a student.',
        translationFr: 'Non, je ne suis pas étudiant.',
        audio: 'audio/phrases/yesno_bushi.wav',
        explanation: 'Négation avec 不是.',
        quizPrompt: 'Quelle phrase signifie « Non, je ne suis pas étudiant » ?',
        quizChoices: ['不是，我不是学生。', '是的，我是学生。', '我也是学生。', '你不是学生。'],
        correctChoiceIndex: 0,
        tags: ['oui-non', 'négation']
      }),
      createPhraseWord({
        id: 'phr-yesno-accept',
        hanzi: '可以，我帮你。',
        pinyin: 'kěyǐ, wǒ bāng nǐ',
        translation: 'Sure, I can help you.',
        translationFr: 'D’accord, je t’aide.',
        audio: 'audio/phrases/yesno_keyi.wav',
        explanation: 'Répondre positivement à une demande.',
        quizPrompt: 'Quelle phrase accepte de rendre service ?',
        quizChoices: ['可以，我帮你。', '不行，我很忙。', '谢谢，我先走。', '再见。'],
        correctChoiceIndex: 0,
        tags: ['oui-non', 'acceptation']
      })
    ]
  },
  {
    id: 'phrases-6-numbers-1-10',
    title: 'Nombres 1-10',
    titleEn: 'Numbers 1-10',
    level: 'hsk1',
    duration: 15,
    words: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
  },
  {
    id: 'phrases-7-time',
    title: 'Heure et moments clés',
    titleEn: 'Time expressions',
    level: 'hsk1',
    duration: 15,
    customWords: [
      createPhraseWord({
        id: 'phr-time-what-time',
        hanzi: '现在几点？',
        pinyin: 'xiànzài jǐ diǎn?',
        translation: 'What time is it now?',
        translationFr: 'Il est quelle heure maintenant ?',
        audio: 'audio/hsk1/hsk1_几点.wav',
        explanation: 'Question simple pour connaître l’heure actuelle.',
        quizPrompt: 'Quelle phrase utilise-t-on pour demander l’heure ?',
        quizChoices: ['现在几点？', '几点见。', '几点好？', '几点点。'],
        correctChoiceIndex: 0,
        tags: ['temps', 'question', 'conversation']
      }),
      createPhraseWord({
        id: 'phr-time-now-three',
        hanzi: '现在三点。',
        pinyin: 'xiànzài sān diǎn',
        translation: 'It is three o’clock now.',
        translationFr: 'Il est trois heures maintenant.',
        audio: 'audio/phrases/hsk1-phrase-018.wav',
        explanation: 'Structure « 现在 + heure » pour répondre précisément.',
        quizPrompt: 'Comment dire « Il est trois heures maintenant » ?',
        quizChoices: ['现在三点。', '今天三点。', '三点现在？', '三点是现在。'],
        correctChoiceIndex: 0,
        tags: ['temps', 'heure']
      }),
      createPhraseWord({
        id: 'phr-time-weekday',
        hanzi: '今天星期几？',
        pinyin: 'jīntiān xīngqī jǐ?',
        translation: 'What day is it today?',
        translationFr: 'Quel jour sommes-nous ?',
        audio: 'audio/phrases/hsk1-phrase-022.wav',
        explanation: 'Question standard pour connaître le jour de la semaine.',
        quizPrompt: 'Quelle question signifie « Quel jour sommes-nous ? » ?',
        quizChoices: ['今天星期几？', '今天几点？', '哪天星期几？', '星期几今天。'],
        correctChoiceIndex: 0,
        tags: ['temps', 'jour']
      }),
      createPhraseWord({
        id: 'phr-time-see-tomorrow',
        hanzi: '明天见。',
        pinyin: 'míngtiān jiàn',
        translation: 'See you tomorrow.',
        translationFr: 'À demain.',
        audio: 'audio/phrases/hsk1-phrase-024.wav',
        explanation: 'Formule pratique pour fixer un rendez-vous au lendemain.',
        quizPrompt: 'Comment dire « À demain » ?',
        quizChoices: ['明天见。', '现在见。', '每天见。', '晚上见。'],
        correctChoiceIndex: 0,
        tags: ['temps', 'rendez-vous']
      })
    ]
  },
  {
    id: 'phrases-8-family',
    title: 'Famille proche',
    titleEn: 'Close family',
    level: 'hsk1',
    duration: 15,
    customWords: [
      createPhraseWord({
        id: 'phr-family-father',
        hanzi: '他是我爸爸。',
        pinyin: 'tā shì wǒ bàba',
        translation: 'He is my father.',
        translationFr: 'C’est mon père.',
        audio: 'audio/phrases/hsk1-phrase-014.wav',
        explanation: 'Structure « 他是我… » pour présenter les membres de la famille.',
        quizPrompt: 'Comment présenter ton père ?',
        quizChoices: ['他是我爸爸。', '他是我朋友。', '他是我家。', '他是我中文。'],
        correctChoiceIndex: 0,
        tags: ['famille', 'présentation']
      }),
      createPhraseWord({
        id: 'phr-family-mother',
        hanzi: '她是我妈妈。',
        pinyin: 'tā shì wǒ māma',
        translation: 'She is my mother.',
        translationFr: 'C’est ma mère.',
        audio: 'audio/phrases/hsk1-phrase-015.wav',
        explanation: 'Même structure pour présenter la mère.',
        quizPrompt: 'Quelle phrase signifie « C’est ma mère » ?',
        quizChoices: ['她是我妈妈。', '她是我妹妹。', '她是我老师。', '她是我中国。'],
        correctChoiceIndex: 0,
        tags: ['famille', 'présentation']
      }),
      createPhraseWord({
        id: 'phr-family-all-good',
        hanzi: '他们都很好。',
        pinyin: 'tāmen dōu hěn hǎo',
        translation: 'They are all doing well.',
        translationFr: 'Ils vont tous très bien.',
        audio: 'audio/phrases/hsk1-phrase-046.wav',
        explanation: 'Utiliser 都 + 很好 pour parler de plusieurs proches.',
        quizPrompt: 'Comment dire que toute la famille va bien ?',
        quizChoices: ['他们都很好。', '他们都不见。', '他们很好吗？', '他们都家。'],
        correctChoiceIndex: 0,
        tags: ['famille', 'bien-être']
      }),
      createPhraseWord({
        id: 'phr-family-invite-home',
        hanzi: '你来我家。',
        pinyin: 'nǐ lái wǒ jiā',
        translation: 'Come to my home.',
        translationFr: 'Viens chez moi.',
        audio: 'audio/phrases/hsk1-phrase-048.wav',
        explanation: 'Inviter quelqu’un à la maison en toute simplicité.',
        quizPrompt: 'Quelle phrase sert à inviter quelqu’un chez soi ?',
        quizChoices: ['你来我家。', '你来学校。', '你去我家吗？', '你在我家。'],
        correctChoiceIndex: 0,
        tags: ['famille', 'invitation']
      })
    ]
  },
  {
    id: 'phrases-9-food-drinks',
    title: 'Nourriture & boissons',
    titleEn: 'Food & drinks',
    level: 'hsk1',
    duration: 15,
    customWords: [
      createPhraseWord({
        id: 'phr-food-what-like',
        hanzi: '你喜欢吃什么？',
        pinyin: 'nǐ xǐhuan chī shénme?',
        translation: 'What do you like to eat?',
        translationFr: 'Qu’est-ce que tu aimes manger ?',
        audio: 'audio/phrases/hsk2-phrase-005.wav',
        explanation: 'Question pour lancer une conversation culinaire.',
        quizPrompt: 'Comment demander « Qu’est-ce que tu aimes manger ? » ?',
        quizChoices: ['你喜欢吃什么？', '你喜欢喝什么？', '你喜欢做什么？', '你喜欢谁？'],
        correctChoiceIndex: 0,
        tags: ['restaurant', 'question']
      }),
      createPhraseWord({
        id: 'phr-food-like-chinese',
        hanzi: '我喜欢吃中国菜。',
        pinyin: 'wǒ xǐhuan chī Zhōngguó cài',
        translation: 'I like to eat Chinese food.',
        translationFr: 'J’aime manger chinois.',
        audio: 'audio/phrases/hsk2-phrase-006.wav',
        explanation: 'Réponse naturelle pour exprimer ses goûts.',
        quizPrompt: 'Quelle phrase signifie « J’aime manger chinois » ?',
        quizChoices: ['我喜欢吃中国菜。', '我喜欢喝中国茶。', '我喜欢中国人。', '我喜欢做饭。'],
        correctChoiceIndex: 0,
        tags: ['restaurant', 'préférences']
      }),
      createPhraseWord({
        id: 'phr-food-order-coffee',
        hanzi: '请给我一杯咖啡。',
        pinyin: 'qǐng gěi wǒ yì bēi kāfēi',
        translation: 'Please give me a cup of coffee.',
        translationFr: 'Donnez-moi un café s’il vous plaît.',
        audio: 'audio/phrases/hsk2-phrase-007.wav',
        explanation: 'Commande polie avec 请 + 给.',
        quizPrompt: 'Comment commander poliment un café ?',
        quizChoices: ['请给我一杯咖啡。', '我喝咖啡。', '咖啡给我。', '我要咖啡吗？'],
        correctChoiceIndex: 0,
        tags: ['restaurant', 'commande']
      }),
      createPhraseWord({
        id: 'phr-food-already-ate',
        hanzi: '我不饿，谢谢。',
        pinyin: 'wǒ bú è, xièxie',
        translation: 'I am not hungry, thanks.',
        translationFr: 'Je n’ai pas faim, merci.',
        audio: 'audio/phrases/hsk2-phrase-016.wav',
        explanation: 'Formule polie pour refuser de manger davantage.',
        quizPrompt: 'Quelle phrase signifie « Je ne suis pas faim, merci » ?',
        quizChoices: ['我不饿，谢谢。', '我吃饭，谢谢。', '我很饿，谢谢。', '我要吃饭，谢谢。'],
        correctChoiceIndex: 0,
        tags: ['restaurant', 'conversation']
      })
    ]
  },
  {
    id: 'phrases-10-wants-needs',
    title: 'Besoins immédiats',
    titleEn: 'Wants & needs',
    level: 'hsk1',
    duration: 15,
    customWords: [
      createPhraseWord({
        id: 'phr-want-drink-water',
        hanzi: '我想喝水。',
        pinyin: 'wǒ xiǎng hē shuǐ',
        translation: 'I want to drink water.',
        translationFr: 'Je veux boire de l’eau.',
        audio: 'audio/phrases/hsk1-phrase-013.wav',
        explanation: 'Structure « 我想 + verbe » pour exprimer une envie immédiate.',
        quizPrompt: 'Comment exprimer « Je veux boire de l’eau » ?',
        quizChoices: ['我想喝水。', '我喝想水。', '我水想喝。', '我想水喝吗？'],
        correctChoiceIndex: 0,
        tags: ['besoin', 'restaurant']
      }),
      createPhraseWord({
        id: 'phr-want-buy-water',
        hanzi: '我想买水。',
        pinyin: 'wǒ xiǎng mǎi shuǐ',
        translation: 'I want to buy water.',
        translationFr: 'Je veux acheter de l’eau.',
        audio: 'audio/phrases/hsk1-phrase-030.wav',
        explanation: 'Utiliser 想 + 买 pour formuler un souhait d’achat.',
        quizPrompt: 'Quelle phrase signifie « Je veux acheter de l’eau » ?',
        quizChoices: ['我想买水。', '我买想水。', '我想水。', '我买水。'],
        correctChoiceIndex: 0,
        tags: ['besoin', 'shopping']
      }),
      createPhraseWord({
        id: 'phr-need-help',
        hanzi: '我需要帮助。',
        pinyin: 'wǒ xūyào bāngzhù',
        translation: 'I need help.',
        translationFr: 'J’ai besoin d’aide.',
        audio: 'audio/phrases/hsk2-phrase-013.wav',
        explanation: 'X需要Y pour exprimer un besoin plus pressant.',
        quizPrompt: 'Comment dire « J’ai besoin d’aide » ?',
        quizChoices: ['我需要帮助。', '我喜欢帮助。', '我帮你需要。', '我需要喝水。'],
        correctChoiceIndex: 0,
        tags: ['besoin', 'conversation']
      }),
      createPhraseWord({
        id: 'phr-have-free-time',
        hanzi: '明天我有时间。',
        pinyin: 'míngtiān wǒ yǒu shíjiān',
        translation: 'I have time tomorrow.',
        translationFr: 'Demain j’ai du temps.',
        audio: 'audio/phrases/hsk2-phrase-028.wav',
        explanation: 'Utiliser 有 pour indiquer que l’on dispose de quelque chose (du temps ici).',
        quizPrompt: 'Quelle phrase exprime « Demain j’ai du temps » ?',
        quizChoices: ['明天我有时间。', '今天我有时间。', '明天我没时间。', '明天我在时间。'],
        correctChoiceIndex: 0,
        tags: ['temps', 'planification']
      })
    ]
  },
  {
    id: 'phrases-11-common-verbs',
    title: 'Verbes courants',
    titleEn: 'Common verbs',
    level: 'hsk1',
    duration: 15,
    customWords: [
      createPhraseWord({
        id: 'phr-verbs-go-school',
        hanzi: '我去学校。',
        pinyin: 'wǒ qù xuéxiào',
        translation: 'I go to school.',
        translationFr: 'Je vais à l’école.',
        audio: 'audio/phrases/hsk1-phrase-019.wav',
        explanation: 'Verbe 去 pour parler des déplacements.',
        quizPrompt: 'Comment dire « Je vais à l’école » ?',
        quizChoices: ['我去学校。', '我来学校。', '我在学校。', '我去家。'],
        correctChoiceIndex: 0,
        tags: ['verbe', 'déplacement']
      }),
      createPhraseWord({
        id: 'phr-verbs-go-together',
        hanzi: '我们一起去。',
        pinyin: 'wǒmen yìqǐ qù',
        translation: 'Let’s go together.',
        translationFr: 'Allons-y ensemble.',
        audio: 'audio/phrases/hsk1-phrase-049.wav',
        explanation: '一 起 indique une action faite en groupe.',
        quizPrompt: 'Quelle phrase propose d’y aller ensemble ?',
        quizChoices: ['我们一起去。', '我们一起来。', '我们一起在。', '我们一起喝。'],
        correctChoiceIndex: 0,
        tags: ['verbe', 'déplacement']
      }),
      createPhraseWord({
        id: 'phr-verbs-study',
        hanzi: '我在学习中文。',
        pinyin: 'wǒ zài xuéxí zhōngwén',
        translation: 'I am studying Chinese.',
        translationFr: 'Je suis en train d’apprendre le chinois.',
        audio: 'audio/phrases/hsk2-phrase-019.wav',
        explanation: 'Structure 在 + verbe pour exprimer l’action en cours.',
        quizPrompt: 'Comment dire « Je suis en train d’apprendre le chinois » ?',
        quizChoices: ['我在学习中文。', '我学习中文。', '我中文学习。', '我学习中国。'],
        correctChoiceIndex: 0,
        tags: ['verbe', 'études']
      }),
      createPhraseWord({
        id: 'phr-verbs-listen',
        hanzi: '我听不懂。',
        pinyin: 'wǒ tīng bù dǒng',
        translation: 'I can’t understand (what I hear).',
        translationFr: 'Je ne comprends pas (ce que j’entends).',
        audio: 'audio/phrases/hsk2-phrase-016.wav',
        explanation: 'Expression utile pour signaler une incompréhension orale.',
        quizPrompt: 'Quelle phrase permet de dire qu’on ne comprend pas ?',
        quizChoices: ['我听不懂。', '我听得懂。', '我懂不听。', '我在听懂。'],
        correctChoiceIndex: 0,
        tags: ['verbe', 'compréhension']
      })
    ]
  },
  {
    id: 'phrases-12-daily-actions',
    title: 'Routine quotidienne',
    titleEn: 'Daily routine',
    level: 'hsk1',
    duration: 15,
    customWords: [
      createPhraseWord({
        id: 'phr-daily-busy',
        hanzi: '今天我很忙。',
        pinyin: 'jīntiān wǒ hěn máng',
        translation: 'I am very busy today.',
        translationFr: 'Aujourd’hui je suis très occupé.',
        audio: 'audio/phrases/hsk2-phrase-027.wav',
        explanation: 'Décrire son emploi du temps avec 很忙.',
        quizPrompt: 'Quelle phrase signifie « Aujourd’hui je suis très occupé » ?',
        quizChoices: ['今天我很忙。', '今天我不忙。', '今天很忙我。', '我今天很忙吗？'],
        correctChoiceIndex: 0,
        tags: ['routine', 'temps']
      }),
      createPhraseWord({
        id: 'phr-daily-reading',
        hanzi: '我正在看书。',
        pinyin: 'wǒ zhèngzài kàn shū',
        translation: 'I am reading a book right now.',
        translationFr: 'Je suis en train de lire.',
        audio: 'audio/phrases/hsk2-phrase-002.wav',
        explanation: '正 在 + verbe pour insister sur l’action du moment.',
        quizPrompt: 'Comment dire « Je suis en train de lire » ?',
        quizChoices: ['我正在看书。', '我看书。', '我书看。', '我书看正在。'],
        correctChoiceIndex: 0,
        tags: ['routine', 'lecture']
      }),
      createPhraseWord({
        id: 'phr-daily-go-home',
        hanzi: '我要回家。',
        pinyin: 'wǒ yào huí jiā',
        translation: 'I want to go home.',
        translationFr: 'Je veux rentrer à la maison.',
        audio: 'audio/phrases/hsk1-phrase-047.wav',
        explanation: 'Utiliser 要 + 回家 pour annoncer son départ.',
        quizPrompt: 'Quelle phrase exprime « Je veux rentrer à la maison » ?',
        quizChoices: ['我要回家。', '我要家回。', '我要在家。', '我要去学校。'],
        correctChoiceIndex: 0,
        tags: ['routine', 'déplacement']
      }),
      createPhraseWord({
        id: 'phr-daily-meet-time',
        hanzi: '我们十点见。',
        pinyin: 'wǒmen shí diǎn jiàn',
        translation: 'Let’s meet at ten.',
        translationFr: 'On se voit à dix heures.',
        audio: 'audio/phrases/number_womenshidian.wav',
        explanation: 'Fixer un rendez-vous précis pour sa journée.',
        quizPrompt: 'Quelle phrase fixe un rendez-vous à dix heures ?',
        quizChoices: ['我们十点见。', '我们十点去。', '我们十点吗？', '我们十点有。'],
        correctChoiceIndex: 0,
        tags: ['routine', 'rendez-vous']
      })
    ]
  },
  {
    id: 'basics-2',
    title: 'Les nombres de 1 à 10',
    titleEn: 'Numbers 1 to 10',
    level: 'hsk1',
    duration: 10,
    words: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
  },
  {
    id: 'basics-3',
    title: 'Les jours et le temps',
    titleEn: 'Days and time',
    level: 'hsk1',
    duration: 12,
    words: ['今天', '明天', '昨天', '星期', '时间', '点', '现在', '时候']
  },
  {
    id: 'basics-4',
    title: 'Questions de base',
    titleEn: 'Basic questions',
    level: 'hsk1',
    duration: 12,
    words: ['什么', '谁', '哪', '哪儿', '怎么', '几', '多少', '吗']
  },
  {
    id: 'basics-5',
    title: 'Actions quotidiennes',
    titleEn: 'Daily actions',
    level: 'hsk1',
    duration: 15,
    words: ['去', '来', '看', '听', '说', '读', '写', '做', '买', '坐']
  },
  {
    id: 'family-1',
    title: 'Membres de la famille',
    titleEn: 'Family members',
    level: 'hsk1',
    duration: 15,
    words: ['爸爸', '妈妈', '哥哥', '姐姐', '弟弟', '妹妹']
  },
  {
    id: 'family-2',
    title: 'Parler de l\'âge',
    titleEn: 'Talking about age',
    level: 'hsk1',
    duration: 10,
    words: ['岁', '年', '月', '号', '多', '大']
  },
  {
    id: 'food-1',
    title: 'Aliments de base',
    titleEn: 'Basic foods',
    level: 'hsk1',
    duration: 15,
    words: ['吃', '喝', '饭', '菜', '茶', '水']
  },
  {
    id: 'food-2',
    title: 'Au restaurant',
    titleEn: 'At the restaurant',
    level: 'hsk1',
    duration: 12,
    words: ['想', '要', '请', '给', '钱', '块']
  },
  {
    id: 'places-1',
    title: 'Lieux courants',
    titleEn: 'Common places',
    level: 'hsk1',
    duration: 12,
    words: ['学校', '医院', '商店', '家', '那儿', '这儿', '里', '上', '下', '前']
  },
  {
    id: 'places-2',
    title: 'Se déplacer',
    titleEn: 'Getting around',
    level: 'hsk1',
    duration: 10,
    words: ['出租车', '飞机', '火车', '车', '坐', '回']
  },
  {
    id: 'shopping-1',
    title: 'Acheter et vendre',
    titleEn: 'Buying and selling',
    level: 'hsk1',
    duration: 12,
    words: ['买', '卖', '钱', '块', '多少', '贵', '便宜']
  },
  {
    id: 'descriptions-1',
    title: 'Adjectifs de base',
    titleEn: 'Basic adjectives',
    level: 'hsk1',
    duration: 15,
    words: ['大', '小', '多', '少', '冷', '热', '高', '矮', '长', '短']
  },
  {
    id: 'descriptions-2',
    title: 'États et sentiments',
    titleEn: 'States and feelings',
    level: 'hsk1',
    duration: 12,
    words: ['累', '忙', '对', '错', '好', '爱', '喜欢', '认识']
  },
  {
    id: 'communication-1',
    title: 'Mots de liaison',
    titleEn: 'Linking words',
    level: 'hsk1',
    duration: 10,
    words: ['和', '也', '都', '不', '没', '很', '太', '真']
  },
  {
    id: 'communication-2',
    title: 'Expressions courantes',
    titleEn: 'Common expressions',
    level: 'hsk1',
    duration: 12,
    words: ['叫', '是', '有', '在', '能', '会', '可以', '知道']
  },

  // ===== LEÇONS DE GRAMMAIRE =====
  // Leçons utilisant les nouveaux types de quiz de grammaire
  {
    id: 'grammar-1-subject-verb',
    title: 'Structure Sujet + Verbe',
    titleEn: 'Subject + Verb order',
    level: 'hsk1',
    duration: 10,
    customWords: grammarLessons.filter(l => l.id === 'grammar-subject-verb')
  },
  {
    id: 'grammar-1-negation',
    title: 'Négation (不/没)',
    titleEn: 'Negation (不/没)',
    level: 'hsk1',
    duration: 15,
    customWords: grammarLessons.filter(l => l.id.includes('negation'))
  },
  {
    id: 'grammar-3-adjectives',
    title: 'Adjectifs avec 很',
    titleEn: 'Adjectives with 很',
    level: 'hsk1',
    duration: 12,
    customWords: grammarLessons.filter(l => l.id === 'grammar-adjectives-hen')
  },
  {
    id: 'grammar-2-possession',
    title: 'Possession (的)',
    titleEn: 'Possession (的)',
    level: 'hsk1',
    duration: 12,
    customWords: grammarLessons.filter(l => l.id === 'grammar-possession-de')
  },
  {
    id: 'grammar-3-questions',
    title: 'Questions (吗)',
    titleEn: 'Questions (吗)',
    level: 'hsk1',
    duration: 12,
    customWords: grammarLessons.filter(l => l.id === 'grammar-question-ma')
  },
  {
    id: 'grammar-4-location',
    title: 'Localisation (在)',
    titleEn: 'Location (在)',
    level: 'hsk1',
    duration: 12,
    customWords: grammarLessons.filter(l => l.id === 'grammar-location-zai')
  },
  {
    id: 'grammar-5-aspect',
    title: 'Aspect accompli (了)',
    titleEn: 'Completed aspect (了)',
    level: 'hsk2',
    duration: 15,
    customWords: grammarLessons.filter(l => l.id === 'grammar-aspect-le')
  },
  {
    id: 'grammar-6-comparison',
    title: 'Comparaison (比)',
    titleEn: 'Comparison (比)',
    level: 'hsk2',
    duration: 15,
    customWords: grammarLessons.filter(l => l.id === 'grammar-comparison-bi')
  },
  {
    id: 'grammar-7-conjunctions',
    title: 'Conjonctions (因为...所以)',
    titleEn: 'Conjunctions (因为...所以)',
    level: 'hsk2',
    duration: 15,
    customWords: grammarLessons.filter(l => l.id === 'grammar-conjunction-yinwei-suoyi')
  },
  {
    id: 'grammar-8-modals',
    title: 'Verbes modaux (会/能/可以)',
    titleEn: 'Modal verbs (会/能/可以)',
    level: 'hsk2',
    duration: 15,
    customWords: grammarLessons.filter(l => l.id === 'grammar-modal-hui')
  },
  {
    id: 'grammar-7-measure-words',
    title: 'Spécificatifs',
    titleEn: 'Measure words',
    level: 'hsk1',
    duration: 12,
    customWords: grammarLessons.filter(l => l.id === 'grammar-measure-words')
  },
  {
    id: 'grammar-8-time-expressions',
    title: 'Expressions de temps',
    titleEn: 'Time expressions',
    level: 'hsk1',
    duration: 12,
    customWords: grammarLessons.filter(l => l.id === 'grammar-time-expressions')
  },
  {
    id: 'convo-1-restaurant',
    title: 'Conversation : restaurant',
    titleEn: 'Conversation: restaurant',
    level: 'hsk2',
    duration: 20,
    customWords: [
      createPhraseWord({
        id: 'convo1-order-coffee',
        hanzi: '请给我一杯咖啡。',
        pinyin: 'qǐng gěi wǒ yì bēi kāfēi',
        translation: 'Please give me a cup of coffee.',
        translationFr: 'Donnez-moi un café, s’il vous plaît.',
        audio: 'audio/phrases/hsk2-phrase-007.wav',
        explanation: 'Commande polie pour une boisson.',
        quizPrompt: 'Que demande le client ?',
        quizChoices: ['Un café', 'L’addition', 'Un dessert', 'Une table'],
        correctChoiceIndex: 0,
        tags: ['conversation', 'restaurant']
      }),
      createPhraseWord({
        id: 'convo1-ask-preference',
        hanzi: '你喜欢吃什么？',
        pinyin: 'nǐ xǐhuan chī shénme?',
        translation: 'What do you like to eat?',
        translationFr: 'Qu’aimes-tu manger ?',
        audio: 'audio/phrases/hsk2-phrase-005.wav',
        explanation: 'Question pour discuter des goûts alimentaires.',
        quizPrompt: 'Comment demander à quelqu’un ce qu’il aime manger ?',
        quizChoices: ['你喜欢吃什么？', '你喝什么？', '你在哪吃？', '你会做饭吗？'],
        correctChoiceIndex: 0,
        tags: ['conversation', 'restaurant']
      }),
      createPhraseWord({
        id: 'convo1-learn-cook',
        hanzi: '我想学做中国菜。',
        pinyin: 'wǒ xiǎng xué zuò Zhōngguó cài',
        translation: 'I want to learn to cook Chinese food.',
        translationFr: 'Je veux apprendre à cuisiner chinois.',
        audio: 'audio/phrases/hsk2-phrase-047.wav',
        explanation: 'Exprime une intention d’apprentissage culinaire.',
        quizPrompt: 'Quelle phrase signifie « Je veux apprendre à cuisiner chinois » ?',
        quizChoices: ['我想学做中国菜。', '我会做中国菜。', '我想吃中国菜。', '我喜欢做中国菜。'],
        correctChoiceIndex: 0,
        tags: ['conversation', 'restaurant']
      }),
      createPhraseWord({
        id: 'convo1-offer-teach',
        hanzi: '我可以教你。',
        pinyin: 'wǒ kěyǐ jiāo nǐ',
        translation: 'I can teach you.',
        translationFr: 'Je peux t’apprendre.',
        audio: 'audio/phrases/hsk2-phrase-048.wav',
        explanation: 'Permet de proposer son aide ou partager une compétence.',
        quizPrompt: 'Quelle phrase propose de montrer quelque chose à quelqu’un ?',
        quizChoices: ['我可以教你。', '我想学中文。', '我需要帮忙。', '我会一点儿。'],
        correctChoiceIndex: 0,
        tags: ['conversation', 'restaurant']
      })
    ]
  },
  {
    id: 'convo-2-shopping',
    title: 'Conversation : shopping',
    titleEn: 'Conversation: shopping',
    level: 'hsk2',
    duration: 20,
    customWords: [
      createPhraseWord({
        id: 'convo2-price',
        hanzi: '多少钱？',
        pinyin: 'duōshao qián?',
        translation: 'How much is it?',
        translationFr: 'Combien ça coûte ?',
        audio: 'audio/phrases/hsk1-phrase-028.wav',
        explanation: 'Question indispensable pour connaître le prix.',
        quizPrompt: 'Quelle phrase utilise-t-on pour demander le prix ?',
        quizChoices: ['多少钱？', '贵不贵？', '在哪买？', '这是你的？'],
        correctChoiceIndex: 0,
        tags: ['conversation', 'shopping']
      }),
      createPhraseWord({
        id: 'convo2-discount',
        hanzi: '能便宜一点吗？',
        pinyin: 'néng piányi yìdiǎn ma?',
        translation: 'Can it be a little cheaper?',
        translationFr: 'Pouvez-vous baisser un peu le prix ?',
        audio: 'audio/phrases/hsk2-phrase-012.wav',
        explanation: 'Permet de négocier poliment.',
        quizPrompt: 'Quelle phrase sert à demander une réduction ?',
        quizChoices: ['能便宜一点吗？', '我要买这个。', '我觉得很贵。', '你喜欢这个吗？'],
        correctChoiceIndex: 0,
        tags: ['conversation', 'shopping']
      }),
      createPhraseWord({
        id: 'convo2-buy-water',
        hanzi: '我想买水。',
        pinyin: 'wǒ xiǎng mǎi shuǐ',
        translation: 'I want to buy water.',
        translationFr: 'Je veux acheter de l’eau.',
        audio: 'audio/phrases/hsk1-phrase-030.wav',
        explanation: 'Exprimer clairement ce que l’on souhaite acheter.',
        quizPrompt: 'Comment dire que vous voulez acheter de l’eau ?',
        quizChoices: ['我想买水。', '我要喝水。', '我喜欢水。', '我带水。'],
        correctChoiceIndex: 0,
        tags: ['conversation', 'shopping']
      }),
      createPhraseWord({
        id: 'convo2-buy-ticket',
        hanzi: '我要一张票。',
        pinyin: 'wǒ yào yì zhāng piào',
        translation: 'I would like one ticket.',
        translationFr: 'Je voudrais un billet.',
        audio: 'audio/phrases/hsk2-phrase-037.wav',
        explanation: 'Formule directe pour acheter un billet.',
        quizPrompt: 'Quelle phrase vous permet de demander un billet ?',
        quizChoices: ['我要一张票。', '我想要水。', '我不要票。', '这票是谁的？'],
        correctChoiceIndex: 0,
        tags: ['conversation', 'shopping']
      })
    ]
  },
  {
    id: 'convo-3-directions',
    title: 'Conversation : directions',
    titleEn: 'Conversation: directions',
    level: 'hsk2',
    duration: 20,
    customWords: [
      createPhraseWord({
        id: 'convo3-where-hospital',
        hanzi: '医院在哪里？',
        pinyin: 'yīyuàn zài nǎlǐ?',
        translation: 'Where is the hospital?',
        translationFr: 'Où est l’hôpital ?',
        audio: 'audio/phrases/hsk2-phrase-022.wav',
        explanation: 'Question modèle pour demander un lieu.',
        quizPrompt: 'Comment demander où se trouve un hôpital ?',
        quizChoices: ['医院在哪里？', '医院是谁？', '你去医院吗？', '医院几点开？'],
        correctChoiceIndex: 0,
        tags: ['conversation', 'directions']
      }),
      createPhraseWord({
        id: 'convo3-go-straight',
        hanzi: '一直往前走。',
        pinyin: 'yìzhí wǎng qián zǒu',
        translation: 'Go straight ahead.',
        translationFr: 'Continuez tout droit.',
        audio: 'audio/phrases/hsk2-phrase-023.wav',
        explanation: 'Instruction simple pour guider quelqu’un.',
        quizPrompt: 'Que signifie « 一直往前走 » ?',
        quizChoices: [
          'Continuez tout droit.',
          'Tournez à gauche.',
          'Traversez la rue.',
          'Attendez ici.'
        ],
        correctChoiceIndex: 0,
        tags: ['conversation', 'directions']
      }),
      createPhraseWord({
        id: 'convo3-where-go',
        hanzi: '你要去哪儿？',
        pinyin: 'nǐ yào qù nǎr?',
        translation: 'Where do you want to go?',
        translationFr: 'Où veux-tu aller ?',
        audio: 'audio/phrases/hsk2-phrase-024.wav',
        explanation: 'Demander la destination de quelqu’un.',
        quizPrompt: 'Quelle phrase signifie « Où veux-tu aller ? » ?',
        quizChoices: ['你要去哪儿？', '你在哪儿？', '你什么时候走？', '你喜欢去哪儿？'],
        correctChoiceIndex: 0,
        tags: ['conversation', 'directions']
      }),
      createPhraseWord({
        id: 'convo3-go-station',
        hanzi: '我想去火车站。',
        pinyin: 'wǒ xiǎng qù huǒchē zhàn',
        translation: 'I want to go to the train station.',
        translationFr: 'Je veux aller à la gare.',
        audio: 'audio/phrases/hsk2-phrase-025.wav',
        explanation: 'Indiquer clairement sa destination.',
        quizPrompt: 'Comment dire « Je veux aller à la gare » ?',
        quizChoices: ['我想去火车站。', '我在火车站。', '我去火车站吗？', '火车站在哪里？'],
        correctChoiceIndex: 0,
        tags: ['conversation', 'directions']
      })
    ]
  },
  {
    id: 'convo-4-making-plans',
    title: 'Conversation : organiser',
    titleEn: 'Conversation: making plans',
    level: 'hsk2',
    duration: 20,
    customWords: [
      createPhraseWord({
        id: 'convo4-free-tomorrow',
        hanzi: '明天我有时间。',
        pinyin: 'míngtiān wǒ yǒu shíjiān',
        translation: 'I have time tomorrow.',
        translationFr: 'Demain j’ai du temps.',
        audio: 'audio/phrases/hsk2-phrase-028.wav',
        explanation: 'Annoncer sa disponibilité.',
        quizPrompt: 'Quelle phrase signifie « Demain j’ai du temps » ?',
        quizChoices: ['明天我有时间。', '明天我没有时间。', '今天我有时间。', '我喜欢明天。'],
        correctChoiceIndex: 0,
        tags: ['conversation', 'planning']
      }),
      createPhraseWord({
        id: 'convo4-when-meet',
        hanzi: '我们什么时候见面？',
        pinyin: 'wǒmen shénme shíhou jiànmiàn?',
        translation: 'When shall we meet?',
        translationFr: 'Quand se voit-on ?',
        audio: 'audio/phrases/hsk2-phrase-029.wav',
        explanation: 'Question clé pour fixer un rendez-vous.',
        quizPrompt: 'Comment demander « Quand se voit-on ? » ?',
        quizChoices: ['我们什么时候见面？', '我们见面吗？', '我们去哪儿？', '我们几点走？'],
        correctChoiceIndex: 0,
        tags: ['conversation', 'planning']
      }),
      createPhraseWord({
        id: 'convo4-three-pm',
        hanzi: '下午三点怎么样？',
        pinyin: 'xiàwǔ sān diǎn zěnmeyàng?',
        translation: 'How about 3 PM?',
        translationFr: 'Que dis-tu de 15 h ?',
        audio: 'audio/phrases/hsk2-phrase-030.wav',
        explanation: 'Proposer une heure précise.',
        quizPrompt: 'Quelle phrase propose 15 h comme horaire ?',
        quizChoices: [
          '下午三点怎么样？',
          '下午三点去哪里？',
          '下午三点太早了。',
          '下午三点见面。'
        ],
        correctChoiceIndex: 0,
        tags: ['conversation', 'planning']
      }),
      createPhraseWord({
        id: 'convo4-weekend-plan',
        hanzi: '周末你有什么打算？',
        pinyin: 'zhōumò nǐ yǒu shénme dǎsuàn?',
        translation: 'What are your plans for the weekend?',
        translationFr: 'Quels sont tes projets pour le week-end ?',
        audio: 'audio/phrases/hsk2-phrase-049.wav',
        explanation: 'Introduit une conversation sur les projets.',
        quizPrompt: 'Quelle phrase permet de demander les projets du week-end ?',
        quizChoices: ['周末你有什么打算？', '周末你在哪里？', '周末下雨吗？', '周末几点？'],
        correctChoiceIndex: 0,
        tags: ['conversation', 'planning']
      })
    ]
  },
  {
    id: 'convo-5-phone-call',
    title: 'Conversation : téléphone',
    titleEn: 'Conversation: phone call',
    level: 'hsk2',
    duration: 20,
    customWords: [
      createPhraseWord({
        id: 'convo5-ask-doing',
        hanzi: '你在做什么？',
        pinyin: 'nǐ zài zuò shénme?',
        translation: 'What are you doing?',
        translationFr: 'Tu fais quoi ?',
        audio: 'audio/phrases/hsk2-phrase-001.wav',
        explanation: 'Ouvrir la conversation en demandant l’activité de l’interlocuteur.',
        quizPrompt: 'Quelle phrase permet d’ouvrir un appel en demandant ce que fait la personne ?',
        quizChoices: ['你在做什么？', '你在哪儿？', '你是谁？', '你去哪儿？'],
        correctChoiceIndex: 0,
        tags: ['conversation', 'phone']
      }),
      createPhraseWord({
        id: 'convo5-im-reading',
        hanzi: '我正在看书。',
        pinyin: 'wǒ zhèngzài kàn shū',
        translation: 'I am reading.',
        translationFr: 'Je suis en train de lire.',
        audio: 'audio/phrases/hsk2-phrase-002.wav',
        explanation: 'Répondre à la question d’ouverture et indiquer que l’on est occupé.',
        quizPrompt: 'Comment dire que l’on est en train de lire ?',
        quizChoices: ['我正在看书。', '我看书了吗？', '我去看书。', '我喜欢书。'],
        correctChoiceIndex: 0,
        tags: ['conversation', 'phone']
      }),
      createPhraseWord({
        id: 'convo5-dont-understand',
        hanzi: '我听不懂。',
        pinyin: 'wǒ tīng bù dǒng',
        translation: "I don't understand.",
        translationFr: 'Je ne comprends pas.',
        audio: 'audio/phrases/hsk2-phrase-016.wav',
        explanation: 'Signaler un problème de compréhension ou de connexion.',
        quizPrompt: 'Quelle phrase indique que vous ne comprenez pas au téléphone ?',
        quizChoices: ['我听不懂。', '我能听懂。', '我喜欢听。', '我不想听。'],
        correctChoiceIndex: 0,
        tags: ['conversation', 'phone']
      }),
      createPhraseWord({
        id: 'convo5-speak-slower',
        hanzi: '请说慢一点。',
        pinyin: 'qǐng shuō màn yìdiǎn',
        translation: 'Please speak slower.',
        translationFr: 'Parlez plus lentement, s’il vous plaît.',
        audio: 'audio/phrases/hsk2-phrase-017.wav',
        explanation: 'Demander à l’interlocuteur de ralentir pour bien comprendre.',
        quizPrompt: 'Quelle phrase sert à demander de parler plus lentement ?',
        quizChoices: ['请说慢一点。', '请看慢一点。', '请坐下。', '请喝水。'],
        correctChoiceIndex: 0,
        tags: ['conversation', 'phone']
      })
    ]
  },
  {
    id: 'convo-6-doctor',
    title: 'Conversation : médecin',
    titleEn: 'Conversation: doctor visit',
    level: 'hsk2',
    duration: 20,
    customWords: [
      createPhraseWord({
        id: 'convo6-feel-unwell',
        hanzi: '我身体不舒服。',
        pinyin: 'wǒ shēntǐ bù shūfu',
        translation: "I don't feel well.",
        translationFr: 'Je ne me sens pas bien.',
        audio: 'audio/phrases/hsk2-phrase-032.wav',
        explanation: 'Décrire simplement ses symptômes.',
        quizPrompt: 'Comment dire que vous ne vous sentez pas bien ?',
        quizChoices: ['我身体不舒服。', '我身体很好。', '我喜欢这身体。', '我没有身体。'],
        correctChoiceIndex: 0,
        tags: ['conversation', 'health']
      }),
      createPhraseWord({
        id: 'convo6-where-hospital',
        hanzi: '医院在哪里？',
        pinyin: 'yīyuàn zài nǎlǐ?',
        translation: 'Where is the hospital?',
        translationFr: 'Où est l’hôpital ?',
        audio: 'audio/phrases/hsk2-phrase-022.wav',
        explanation: 'Trouver rapidement l’hôpital ou la clinique la plus proche.',
        quizPrompt: 'Quelle phrase permet de demander l’emplacement d’un hôpital ?',
        quizChoices: ['医院在哪里？', '医院是谁？', '医院怎么学习？', '医院有几个？'],
        correctChoiceIndex: 0,
        tags: ['conversation', 'health']
      }),
      createPhraseWord({
        id: 'convo6-see-doctor',
        hanzi: '你应该去看医生。',
        pinyin: 'nǐ yīnggāi qù kàn yīshēng',
        translation: 'You should see a doctor.',
        translationFr: 'Tu devrais consulter un médecin.',
        audio: 'audio/phrases/hsk2-phrase-033.wav',
        explanation: 'Conseil pour encourager quelqu’un à consulter.',
        quizPrompt: 'Quelle phrase conseille de voir un médecin ?',
        quizChoices: ['你应该去看医生。', '你不应该去看医生。', '你是医生。', '医生在看你。'],
        correctChoiceIndex: 0,
        tags: ['conversation', 'health']
      }),
      createPhraseWord({
        id: 'convo6-need-rest',
        hanzi: '我想休息一下。',
        pinyin: 'wǒ xiǎng xiūxi yíxià',
        translation: 'I want to rest for a while.',
        translationFr: 'Je veux me reposer un peu.',
        audio: 'audio/phrases/hsk2-phrase-042.wav',
        explanation: 'Exprimer le besoin de repos après la consultation.',
        quizPrompt: 'Comment indiquer que vous souhaitez vous reposer ?',
        quizChoices: ['我想休息一下。', '我想学习一下。', '我想出去一下。', '我想吃饭一下。'],
        correctChoiceIndex: 0,
        tags: ['conversation', 'health']
      })
    ]
  },
  {
    id: 'convo-7-weather-talk',
    title: 'Conversation : météo',
    titleEn: 'Conversation: weather small talk',
    level: 'hsk2',
    duration: 20,
    customWords: [
      createPhraseWord({
        id: 'convo7-how-weather',
        hanzi: '天气怎么样？',
        pinyin: 'tiānqì zěnmeyàng?',
        translation: 'How is the weather?',
        translationFr: 'Quel temps fait-il ?',
        audio: 'audio/phrases/hsk2-phrase-003.wav',
        explanation: 'Démarrer une discussion légère sur la météo.',
        quizPrompt: 'Quelle phrase demande la météo ?',
        quizChoices: ['天气怎么样？', '天气在哪里？', '天气是谁？', '天气多少？'],
        correctChoiceIndex: 0,
        tags: ['conversation', 'weather']
      }),
      createPhraseWord({
        id: 'convo7-its-cold',
        hanzi: '我觉得很冷。',
        pinyin: 'wǒ juéde hěn lěng',
        translation: 'I feel very cold.',
        translationFr: 'Je trouve qu’il fait très froid.',
        audio: 'audio/phrases/hsk2-phrase-004.wav',
        explanation: 'Partager une impression sur la température.',
        quizPrompt: 'Comment dire qu’il fait vraiment froid ?',
        quizChoices: ['我觉得很冷。', '我觉得很热。', '我觉得很好。', '我觉得很忙。'],
        correctChoiceIndex: 0,
        tags: ['conversation', 'weather']
      }),
      createPhraseWord({
        id: 'convo7-its-raining',
        hanzi: '外面下雨了。',
        pinyin: 'wàimiàn xià yǔ le',
        translation: 'It’s raining outside.',
        translationFr: 'Il pleut dehors.',
        audio: 'audio/phrases/hsk2-phrase-040.wav',
        explanation: 'Informer d’un changement de météo.',
        quizPrompt: 'Quelle phrase signale qu’il pleut ?',
        quizChoices: ['外面下雨了。', '外面下雪了。', '外面很安静。', '外面很忙。'],
        correctChoiceIndex: 0,
        tags: ['conversation', 'weather']
      }),
      createPhraseWord({
        id: 'convo7-bring-umbrella',
        hanzi: '别忘了带伞。',
        pinyin: 'bié wàng le dài sǎn',
        translation: "Don't forget to bring an umbrella.",
        translationFr: 'N’oublie pas de prendre un parapluie.',
        audio: 'audio/phrases/hsk2-phrase-041.wav',
        explanation: 'Donner un conseil pratique lié au temps.',
        quizPrompt: 'Quelle phrase rappelle de prendre un parapluie ?',
        quizChoices: ['别忘了带伞。', '别忘了吃饭。', '别忘了写字。', '别忘了说话。'],
        correctChoiceIndex: 0,
        tags: ['conversation', 'weather']
      })
    ]
  },
  {
    id: 'convo-8-complaints',
    title: 'Conversation : exprimer un problème',
    titleEn: 'Conversation: raising an issue',
    level: 'hsk2',
    duration: 20,
    customWords: [
      createPhraseWord({
        id: 'convo8-need-help',
        hanzi: '我需要帮助。',
        pinyin: 'wǒ xūyào bāngzhù',
        translation: 'I need help.',
        translationFr: 'J’ai besoin d’aide.',
        audio: 'audio/phrases/hsk2-phrase-013.wav',
        explanation: 'Introduire un souci auprès du service concerné.',
        quizPrompt: 'Quelle phrase annonce que vous avez besoin d’aide ?',
        quizChoices: ['我需要帮助。', '我不需要帮助。', '我喜欢帮助。', '我会帮助。'],
        correctChoiceIndex: 0,
        tags: ['conversation', 'support']
      }),
      createPhraseWord({
        id: 'convo8-can-help',
        hanzi: '你能帮我吗？',
        pinyin: 'nǐ néng bāng wǒ ma?',
        translation: 'Can you help me?',
        translationFr: 'Peux-tu m’aider ?',
        audio: 'audio/phrases/hsk2-phrase-014.wav',
        explanation: 'Poser la question directement à un employé.',
        quizPrompt: 'Comment demander de l’aide poliment ?',
        quizChoices: ['你能帮我吗？', '你是帮我吗？', '你帮我。', '你不要帮我。'],
        correctChoiceIndex: 0,
        tags: ['conversation', 'support']
      }),
      createPhraseWord({
        id: 'convo8-of-course',
        hanzi: '当然可以。',
        pinyin: 'dāngrán kěyǐ',
        translation: 'Of course.',
        translationFr: 'Bien sûr.',
        audio: 'audio/phrases/hsk2-phrase-015.wav',
        explanation: 'Réponse positive d’un agent ou d’un ami.',
        quizPrompt: 'Quelle phrase signifie « Bien sûr » ?',
        quizChoices: ['当然可以。', '当然不可以。', '不可以。', '我不知道。'],
        correctChoiceIndex: 0,
        tags: ['conversation', 'support']
      }),
      createPhraseWord({
        id: 'convo8-change-room',
        hanzi: '我想换一个房间。',
        pinyin: 'wǒ xiǎng huàn yí ge fángjiān',
        translation: 'I want to change rooms.',
        translationFr: 'Je veux changer de chambre.',
        audio: 'audio/phrases/hsk2-phrase-036.wav',
        explanation: 'Formuler clairement une demande de solution.',
        quizPrompt: 'Quelle phrase exprime le souhait de changer de chambre ?',
        quizChoices: ['我想换一个房间。', '我喜欢这个房间。', '房间在哪里？', '房间很大。'],
        correctChoiceIndex: 0,
        tags: ['conversation', 'support']
      })
    ]
  },
  {
    id: 'convo-9-invitations',
    title: 'Conversation : invitations',
    titleEn: 'Conversation: invitations',
    level: 'hsk2',
    duration: 20,
    customWords: [
      createPhraseWord({
        id: 'convo9-weekend-plan',
        hanzi: '周末你有什么打算？',
        pinyin: 'zhōumò nǐ yǒu shénme dǎsuàn?',
        translation: 'What are your plans for the weekend?',
        translationFr: 'Quels sont tes projets pour le week-end ?',
        audio: 'audio/phrases/hsk2-phrase-049.wav',
        explanation: 'Entrer en matière avant de proposer une activité.',
        quizPrompt: 'Quelle phrase demande les projets du week-end ?',
        quizChoices: ['周末你有什么打算？', '周末下雨吗？', '周末谁来？', '周末几点？'],
        correctChoiceIndex: 0,
        tags: ['conversation', 'invitation']
      }),
      createPhraseWord({
        id: 'convo9-plan-hiking',
        hanzi: '我打算去爬山。',
        pinyin: 'wǒ dǎsuàn qù páshān',
        translation: 'I plan to go hiking.',
        translationFr: 'Je prévois d’aller randonner.',
        audio: 'audio/phrases/hsk2-phrase-050.wav',
        explanation: 'Partager son idée d’activité à proposer.',
        quizPrompt: 'Quelle phrase propose d’aller randonner ?',
        quizChoices: ['我打算去爬山。', '我打算去睡觉。', '我打算去吃饭。', '我打算去上班。'],
        correctChoiceIndex: 0,
        tags: ['conversation', 'invitation']
      }),
      createPhraseWord({
        id: 'convo9-let-us',
        hanzi: '我们一起努力吧。',
        pinyin: 'wǒmen yìqǐ nǔlì ba',
        translation: "Let's work on it together.",
        translationFr: 'Travaillons ensemble dessus.',
        audio: 'audio/phrases/hsk2-phrase-021.wav',
        explanation: 'Accepter une invitation en proposant de faire ensemble.',
        quizPrompt: 'Quelle phrase insiste sur le fait de faire quelque chose ensemble ?',
        quizChoices: ['我们一起努力吧。', '我一个人努力吧。', '他们一起努力吧。', '我不想努力。'],
        correctChoiceIndex: 0,
        tags: ['conversation', 'invitation']
      }),
      createPhraseWord({
        id: 'convo9-no-problem',
        hanzi: '没问题。',
        pinyin: 'méi wèntí',
        translation: 'No problem.',
        translationFr: 'Pas de problème.',
        audio: 'audio/phrases/hsk2-phrase-031.wav',
        explanation: 'Confirmer sa participation ou accepter une proposition.',
        quizPrompt: 'Quelle phrase valide une invitation en disant que tout va bien ?',
        quizChoices: ['没问题。', '有问题。', '很麻烦。', '不可以。'],
        correctChoiceIndex: 0,
        tags: ['conversation', 'invitation']
      })
    ]
  },
  {
    id: 'convo-10-opinions',
    title: 'Conversation : donner son avis',
    titleEn: 'Conversation: giving opinions',
    level: 'hsk2',
    duration: 20,
    customWords: [
      createPhraseWord({
        id: 'convo10-how-work',
        hanzi: '你的工作怎么样？',
        pinyin: 'nǐ de gōngzuò zěnmeyàng?',
        translation: 'How is your work?',
        translationFr: 'Comment va ton travail ?',
        audio: 'audio/phrases/hsk2-phrase-045.wav',
        explanation: 'Demander l’avis de quelqu’un sur son travail ou son projet.',
        quizPrompt: 'Quelle phrase sert à demander « Comment va ton travail ? » ?',
        quizChoices: ['你的工作怎么样？', '你的工作在哪里？', '你的工作是谁？', '你工作吗？'],
        correctChoiceIndex: 0,
        tags: ['conversation', 'opinion']
      }),
      createPhraseWord({
        id: 'convo10-work-interesting',
        hanzi: '工作很有意思。',
        pinyin: 'gōngzuò hěn yǒu yìsi',
        translation: 'Work is very interesting.',
        translationFr: 'Le travail est très intéressant.',
        audio: 'audio/phrases/hsk2-phrase-046.wav',
        explanation: 'Exprimer son ressenti positif.',
        quizPrompt: 'Comment dire que le travail est intéressant ?',
        quizChoices: ['工作很有意思。', '工作很没意思。', '工作没有。', '工作不要。'],
        correctChoiceIndex: 0,
        tags: ['conversation', 'opinion']
      }),
      createPhraseWord({
        id: 'convo10-hard-question',
        hanzi: '这个问题很难。',
        pinyin: 'zhège wèntí hěn nán',
        translation: 'This question is very difficult.',
        translationFr: 'Cette question est très difficile.',
        audio: 'audio/phrases/hsk2-phrase-020.wav',
        explanation: 'Exprimer un avis nuancé ou un désaccord.',
        quizPrompt: 'Quelle phrase exprime qu’une question est difficile ?',
        quizChoices: ['这个问题很难。', '这个问题很容易。', '这个问题很好吃。', '这个问题很远。'],
        correctChoiceIndex: 0,
        tags: ['conversation', 'opinion']
      }),
      createPhraseWord({
        id: 'convo10-compliment',
        hanzi: '你的汉语说得很好。',
        pinyin: 'nǐ de hànyǔ shuō de hěn hǎo',
        translation: 'You speak Chinese very well.',
        translationFr: 'Tu parles très bien chinois.',
        audio: 'audio/phrases/hsk2-phrase-018.wav',
        explanation: 'Donner un retour positif et encourager son interlocuteur.',
        quizPrompt: 'Quelle phrase sert à complimenter le chinois de quelqu’un ?',
        quizChoices: ['你的汉语说得很好。', '你的汉语说得不好。', '你不说汉语。', '汉语没有意思。'],
        correctChoiceIndex: 0,
        tags: ['conversation', 'opinion']
      })
    ]
  }
];

export const getSimpleLessonById = (id: string) => {
  return simpleLessons.find(lesson => lesson.id === id);
};
