/**
 * lessonGate.ts — verrouillage des leçons selon l'accès.
 * ------------------------------------------------------
 * Stratégie (identique au web) : le niveau A1 (cecr-a1-*) est ENTIÈREMENT
 * gratuit pour permettre d'évaluer le parcours. Tout le reste (A2 → C2)
 * nécessite Premium (ou l'essai gratuit de 7 jours, ou l'override compte).
 */
import type { AppAccess } from './access';

/** Un module/leçon est-il dans le périmètre gratuit (niveau A1) ? */
export function isFreeContent(moduleOrLevelId: string): boolean {
  return moduleOrLevelId.startsWith('cecr-a1');
}

/** L'utilisateur peut-il ouvrir ce module/leçon ? */
export function canOpenLesson(access: AppAccess, moduleId: string): boolean {
  if (access.canAccessAllLessons) return true; // premium / trial / override
  return isFreeContent(moduleId);
}

/** Un niveau CECR entier est-il verrouillé (au-delà de A1 en gratuit) ? */
export function isLevelPremiumLocked(access: AppAccess, levelId: string): boolean {
  if (access.canAccessAllLessons) return false;
  return !isFreeContent(levelId);
}
