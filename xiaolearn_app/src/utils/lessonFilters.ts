import type { LessonModule, LessonFilters, LessonPath, HskLevel, LessonCategory, LessonDifficulty } from '../types/lesson-structure';
import { lessonPaths } from '../data/lesson-paths';

/**
 * Obtient toutes les leçons de tous les parcours
 */
export function getAllLessons(): LessonModule[] {
  return lessonPaths.flatMap(path => path.lessons);
}

/**
 * Obtient toutes les leçons d'un parcours spécifique
 */
export function getLessonsByPath(pathId: string): LessonModule[] {
  const path = lessonPaths.find(p => p.id === pathId);
  return path ? path.lessons : [];
}

/**
 * Filtre les leçons selon les critères fournis
 */
export function filterLessons(filters: LessonFilters): LessonModule[] {
  let lessons = getAllLessons();

  // Filtre par parcours
  if (filters.pathId) {
    lessons = getLessonsByPath(filters.pathId);
  }

  // Filtre par niveau HSK (single)
  if (filters.hskLevel) {
    lessons = lessons.filter(lesson => lesson.hskLevel === filters.hskLevel);
  }

  // Filtre par niveaux HSK (multiple)
  if (filters.hskLevels && filters.hskLevels.length > 0) {
    lessons = lessons.filter(lesson =>
      filters.hskLevels!.includes(lesson.hskLevel) ||
      (lesson.hskLevels && lesson.hskLevels.some(level => filters.hskLevels!.includes(level)))
    );
  }

  // Filtre par catégorie
  if (filters.category) {
    lessons = lessons.filter(lesson => lesson.category === filters.category);
  }

  // Filtre par difficulté
  if (filters.difficulty) {
    lessons = lessons.filter(lesson => lesson.difficulty === filters.difficulty);
  }

  // Filtre par tags
  if (filters.tags && filters.tags.length > 0) {
    lessons = lessons.filter(lesson =>
      lesson.tags && filters.tags!.some(tag => lesson.tags!.includes(tag))
    );
  }

  // Recherche textuelle
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    lessons = lessons.filter(lesson =>
      lesson.title.toLowerCase().includes(query) ||
      lesson.titleEn.toLowerCase().includes(query) ||
      (lesson.tags && lesson.tags.some(tag => tag.toLowerCase().includes(query)))
    );
  }

  return lessons;
}

/**
 * Obtient les leçons par niveau HSK
 */
export function getLessonsByHskLevel(level: HskLevel): LessonModule[] {
  return filterLessons({ hskLevel: level });
}

/**
 * Obtient les leçons par catégorie
 */
export function getLessonsByCategory(category: LessonCategory): LessonModule[] {
  return filterLessons({ category });
}

/**
 * Obtient les leçons par difficulté
 */
export function getLessonsByDifficulty(difficulty: LessonDifficulty): LessonModule[] {
  return filterLessons({ difficulty });
}

/**
 * Obtient les leçons par tag
 */
export function getLessonsByTag(tag: string): LessonModule[] {
  return filterLessons({ tags: [tag] });
}

/**
 * Obtient une leçon par son ID
 */
export function getLessonById(lessonId: string): LessonModule | undefined {
  return getAllLessons().find(lesson => lesson.id === lessonId);
}

/**
 * Obtient le parcours contenant une leçon donnée
 */
export function getPathForLesson(lessonId: string): LessonPath | undefined {
  return lessonPaths.find(path =>
    path.lessons.some(lesson => lesson.id === lessonId)
  );
}

/**
 * Obtient tous les tags disponibles
 */
export function getAllTags(): string[] {
  const tagsSet = new Set<string>();
  getAllLessons().forEach(lesson => {
    if (lesson.tags) {
      lesson.tags.forEach(tag => tagsSet.add(tag));
    }
  });
  return Array.from(tagsSet).sort();
}

/**
 * Obtient toutes les catégories disponibles
 */
export function getAllCategories(): LessonCategory[] {
  const categoriesSet = new Set<LessonCategory>();
  getAllLessons().forEach(lesson => {
    categoriesSet.add(lesson.category);
  });
  return Array.from(categoriesSet);
}

/**
 * Compte les leçons par niveau HSK
 */
export function countLessonsByHskLevel(): Record<HskLevel, number> {
  const counts: Record<number, number> = {
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0
  };

  getAllLessons().forEach(lesson => {
    counts[lesson.hskLevel]++;
  });

  return counts as Record<HskLevel, number>;
}

/**
 * Compte les leçons par catégorie
 */
export function countLessonsByCategory(): Record<string, number> {
  const counts: Record<string, number> = {};

  getAllLessons().forEach(lesson => {
    counts[lesson.category] = (counts[lesson.category] || 0) + 1;
  });

  return counts;
}

/**
 * Obtient les statistiques globales des leçons
 */
export function getLessonStats() {
  const allLessons = getAllLessons();

  return {
    total: allLessons.length,
    byHskLevel: countLessonsByHskLevel(),
    byCategory: countLessonsByCategory(),
    totalPaths: lessonPaths.length,
    allTags: getAllTags(),
    allCategories: getAllCategories()
  };
}
