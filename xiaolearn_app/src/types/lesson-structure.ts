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
}

export interface LessonIntroduction {
  title: string;
  titleEn: string;
  content: string;
  contentEn: string;
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
