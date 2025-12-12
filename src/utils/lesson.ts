import type { LessonItem } from '../types';
import type { Language } from '../i18n';

export const getLessonTranslation = (lesson: LessonItem, language: Language) =>
  language === 'fr' ? lesson.translationFr || lesson.translation : lesson.translation;
