import type { LessonV2LearnSection } from './lesson-learn';

export interface LessonPath {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  icon: string;
  color: string;
  lessons: LessonModule[];
}

export type LessonCategory = 'pronunciation' | 'grammar' | 'conversation' | 'vocabulary' | 'culture' | 'writing' | 'reading';
export type LessonDifficulty = 'beginner' | 'elementary' | 'intermediate' | 'advanced' | 'superior';
export type HskLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface LessonModule {
  id: string;
  title: string;
  titleEn: string;
  duration: number; // en minutes
  locked: boolean;
  completed: boolean;

  // Métadonnées HSK et thématiques
  hskLevel: HskLevel; // Niveau HSK principal de la leçon
  hskLevels?: HskLevel[]; // Si la leçon couvre plusieurs niveaux HSK
  category: LessonCategory; // Catégorie thématique
  difficulty: LessonDifficulty; // Niveau de difficulté
  tags?: string[]; // Tags pour recherche et filtrage (ex: ['restaurant', 'food', 'ordering'])

  introduction: LessonIntroduction;
  flashcards: string[]; // IDs des mots à apprendre
  quizQuestions: number; // nombre de questions pour l'évaluation

  /** Dialogue optionnel : courte conversation illustrant la leçon. */
  dialogue?: Dialogue;
  /** Lecture optionnelle : texte suivi avec traduction phrase-par-phrase. */
  reading?: ReadingText;
  /**
   * Contenu pédagogique manuel pour la phase "Apprentissage" (learn).
   * Si fourni, `lessonModuleToV2` propage ces sections et la page insère une
   * étape dédiée entre Intro et Exemples. Si absent, la phase learn est
   * skippée (comportement historique).
   */
  learnSections?: LessonV2LearnSection[];
}

/**
 * Une ligne de dialogue. Speaker peut être 'A', 'B', un prénom chinois (老师, 学生…),
 * ou un rôle (客人, 服务员). La traduction fr/en est toujours fournie.
 */
export interface DialogueLine {
  speaker: string;
  hanzi: string;
  pinyin: string;
  translationFr: string;
  translationEn: string;
  /** Notes optionnelles : point de grammaire, vocabulaire, contexte culturel. */
  note?: string;
  noteEn?: string;
  /**
   * URL optionnelle d'une piste audio pré-générée (MP3 doublé par TTS neural).
   * Si présente, le lecteur joue cette piste plutôt que d'appeler la synthèse
   * vocale du navigateur. Renseignée soit à la main, soit via le manifest
   * produit par `scripts/generate-dialogue-audio.mjs`.
   */
  audioUrl?: string;
}

export interface Dialogue {
  id: string;
  title: string;
  titleEn: string;
  context: string;     // Situation en français (ex : "Au restaurant, commander un plat")
  contextEn: string;
  lines: DialogueLine[];
  /** Clés de vocabulaire extraites du dialogue (liste de hanzi). */
  vocab?: string[];
  /** Question de compréhension simple (optionnelle) en fr/en. */
  comprehension?: {
    questionFr: string;
    questionEn: string;
    answerFr: string;
    answerEn: string;
  };
}

/**
 * Un texte de lecture, découpé en phrases/segments avec traduction alignée.
 * Idéal pour « lire un paragraphe » avec toggle pinyin + traduction.
 */
export interface ReadingSegment {
  hanzi: string;
  pinyin: string;
  translationFr: string;
  translationEn: string;
}

export interface ReadingText {
  id: string;
  title: string;
  titleEn: string;
  intro: string;        // Paragraphe d'introduction en fr (contexte, source, style)
  introEn: string;
  segments: ReadingSegment[];
  /** Mots-clés à mémoriser après lecture. */
  vocab?: string[];
  /** Questions de compréhension optionnelles. */
  questions?: Array<{
    questionFr: string;
    questionEn: string;
    answerFr: string;
    answerEn: string;
  }>;
}

export interface LessonIntroduction {
  title: string;
  titleEn: string;
  content: string;
  contentEn: string;
  quickIntro?: string;
  quickIntroEn?: string;
  lessonIntro?: string;
  lessonIntroEn?: string;
  objectives: string[];
  objectivesEn: string[];
}

export type LessonPhase = 'intro' | 'learn' | 'quiz' | 'complete';

export interface LessonProgress {
  lessonId: string;
  phase: LessonPhase;
  learnedCards: string[];
  quizScore: number;
  completedAt?: string;
}

export interface LessonFilters {
  hskLevel?: HskLevel; // Filtrer par niveau HSK
  hskLevels?: HskLevel[]; // Filtrer par plusieurs niveaux HSK
  category?: LessonCategory; // Filtrer par catégorie
  difficulty?: LessonDifficulty; // Filtrer par difficulté
  tags?: string[]; // Filtrer par tags
  searchQuery?: string; // Recherche textuelle
  pathId?: string; // Filtrer par parcours
}
