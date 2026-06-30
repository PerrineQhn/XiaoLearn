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
  /**
   * V18 — IDs des mots liés affichés dans la section « Voir aussi » de la
   * fiche. Curés manuellement par niveau (4-6 IDs typiquement). Contient
   * des mots qui partagent un caractère avec celui-ci OU sont du même
   * thème pédagogique. Format : ["hsk1-0042", "hsk2-0017"].
   */
  relatedIds?: string[];
}

/** Métadonnée HSK : nombre d'entrées par niveau + taille de chunk. */
export interface HskMeta {
  chunkSize: number;
  levels: Record<string, number>;
}
