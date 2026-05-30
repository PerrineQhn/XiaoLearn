/**
 * dictionary.ts — types pour le dictionnaire CFDICT intégré.
 * Données : public/data/dictionary/hsk/{level}/chunk-NNN.json (map id→entry)
 *         + public/data/hors-hsk/chunk-NNN.json (array d'entries)
 */

export type DictionaryLevel =
  | 'hsk1'
  | 'hsk2'
  | 'hsk3'
  | 'hsk4'
  | 'hsk5'
  | 'hsk6'
  | 'hsk7'
  | 'hors-hsk';

export interface DictionaryExample {
  chinese: string;
  pinyin: string;
  translationFr?: string;
  translationEn?: string;
}

export interface DictionaryQuiz {
  prompt: string;
  choices: string[];
  correctChoiceIndex: number;
}

export interface DictionaryEntry {
  id: string;
  level: DictionaryLevel;
  hanzi: string;
  pinyin: string;
  translationFr?: string;
  translationEn?: string;
  category?: string;
  explanation?: string;
  explanationFr?: string;
  audio?: string;
  examples?: DictionaryExample[];
  quiz?: DictionaryQuiz;
  tags?: string[];
  theme?: string;
  translationFrAlt?: string[];
}

/** Métadonnée HSK : nombre d'entrées par niveau + taille de chunk. */
export interface HskMeta {
  chunkSize: number;
  levels: Record<string, number>;
}
