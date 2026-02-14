export interface HSKExample {
  chinese: string;
  pinyin: string;
  translation: string;
}

export interface HSKQuiz {
  prompt: string;
  choices: string[];
  correctChoiceIndex: number;
}

export interface HSKEntry {
  id: string;
  level: 'hsk1' | 'hsk2' | 'hsk3' | 'hsk4' | 'hsk5' | 'hsk6' | 'hsk7';
  hanzi: string;
  pinyin: string;
  translation: string;
  translationFr: string;
  translationFrAlt?: string[];
  category: string;
  explanation: string;
  explanationFr?: string;
  audio: string;
  examples: HSKExample[];
  quiz?: HSKQuiz;
  tags: string[];
  theme: string;
}

export type HSKLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface HSKLevelInfo {
  level: HSKLevel;
  name: string;
  slug: string;
  description: string;
  color: string;
  bgColor: string;
}

export const HSK_LEVELS: HSKLevelInfo[] = [
  {
    level: 1,
    name: 'HSK 1',
    slug: 'hsk1',
    description: 'Niveau débutant - 150 mots essentiels',
    color: '#2E7D32',
    bgColor: '#E8F5E9',
  },
  {
    level: 2,
    name: 'HSK 2',
    slug: 'hsk2',
    description: 'Niveau élémentaire - 300 mots',
    color: '#1565C0',
    bgColor: '#E3F2FD',
  },
  {
    level: 3,
    name: 'HSK 3',
    slug: 'hsk3',
    description: 'Niveau intermédiaire - 600 mots',
    color: '#E65100',
    bgColor: '#FFF3E0',
  },
  {
    level: 4,
    name: 'HSK 4',
    slug: 'hsk4',
    description: 'Niveau intermédiaire avancé - 1200 mots',
    color: '#C2185B',
    bgColor: '#FCE4EC',
  },
  {
    level: 5,
    name: 'HSK 5',
    slug: 'hsk5',
    description: 'Niveau avancé - vocabulaire étendu',
    color: '#6A1B9A',
    bgColor: '#F3E5F5',
  },
  {
    level: 6,
    name: 'HSK 6',
    slug: 'hsk6',
    description: 'Niveau avancé supérieur - compréhension approfondie',
    color: '#006064',
    bgColor: '#E0F7FA',
  },
  {
    level: 7,
    name: 'HSK 7-9',
    slug: 'hsk7',
    description: 'Niveau expert - maîtrise étendue du mandarin',
    color: '#BF360C',
    bgColor: '#FFF8E1',
  },
];

export function getHSKLevelInfo(level: HSKLevel | string): HSKLevelInfo | undefined {
  const levelNum = typeof level === 'string' ? parseInt(level.replace('hsk', '')) : level;
  return HSK_LEVELS.find(l => l.level === levelNum);
}
