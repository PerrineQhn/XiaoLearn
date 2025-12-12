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

export interface LessonModule {
  id: string;
  title: string;
  titleEn: string;
  duration: number; // en minutes
  locked: boolean;
  completed: boolean;
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
