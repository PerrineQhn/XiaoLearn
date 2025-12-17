/**
 * Types pour le module Culture
 * Définit les interfaces pour les sujets culturels, catégories, et contenu associé
 */

export type CultureCategory =
  | 'festivals'
  | 'superstitions'
  | 'etiquette'
  | 'traditions'
  | 'philosophy'
  | 'arts'
  | 'cuisine';

export interface CultureExample {
  hanzi: string;
  pinyin: string;
  translation: string;
  translationFr: string;
  audio?: string;
}

export interface CultureSection {
  id: string;
  title: string;
  titleEn: string;
  content: string;
  contentEn: string;
  images?: string[];
  examples?: CultureExample[];
}

export type CulturalNoteType = 'tip' | 'warning' | 'history' | 'fun-fact';

export interface CulturalNote {
  type: CulturalNoteType;
  content: string;
  contentEn: string;
}

export interface CultureQuizQuestion {
  question: string;
  questionEn: string;
  choices: string[];
  choicesEn: string[];
  correctIndex: number;
  explanation: string;
  explanationEn: string;
}

export interface CultureQuiz {
  questions: CultureQuizQuestion[];
}

export type CultureDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface CultureItem {
  id: string;
  category: CultureCategory;
  title: string;
  titleEn: string;
  slug: string;

  // Contenu principal
  introduction: string;
  introductionEn: string;

  sections: CultureSection[];

  // Contenu visuel
  coverImage?: string;
  icon: string; // Emoji ou identifiant d'icône

  // Vocabulaire lié (IDs de LessonItems)
  vocabulary: string[];

  // Notes culturelles
  culturalNotes: CulturalNote[];

  // Quiz (optionnel)
  quiz?: CultureQuiz;

  // Métadonnées
  difficulty: CultureDifficulty;
  estimatedReadTime: number; // en minutes
  tags: string[];
}

export interface CultureTopicSummary {
  category: CultureCategory;
  count: number;
  topics: string[]; // IDs des topics
}
