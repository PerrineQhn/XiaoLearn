/**
 * cecr-exercises-all.ts
 * ---------------------
 * Fusionne les exercices générés automatiquement (`cecrExercisesV2` depuis
 * cecr-exercises.ts, produits par gen_cecr_exercises.py) avec les exercices
 * enrichis rédigés manuellement (`cecrExercisesEnriched` depuis
 * cecr-exercises-enriched.ts).
 *
 * Règle de fusion : en cas de collision sur une clé de module, l'enrichi
 * REMPLACE complètement la liste générée (override par clé, pas par item).
 * Les modules non présents dans l'enrichi retombent sur la version générée.
 *
 * Ce fichier est le point d'entrée unique pour les consumers (v2-mappers,
 * ReviewPageV3). Les deux fichiers sources ne doivent pas être importés
 * directement ailleurs dans l'app — sauf pour les exports typés ou les
 * hooks de génération.
 */

import type { LessonV2Exercise } from '../pages/StructuredLessonPageV2';
import { cecrExercisesV2 } from './cecr-exercises';
import { cecrExercisesEnriched } from './cecr-exercises-enriched';
import { cecrExercisesEnrichedA1 } from './cecr-exercises-enriched-a1';
import { cecrExercisesEnrichedA2 } from './cecr-exercises-enriched-a2';
import { cecrConversationExercises } from './cecr-conversation-exercises';

/**
 * Map consolidée des exercices par module CECR.
 * Enrichi > généré (override complet par clé).
 *
 * Ordre d'override : générés < enrichis (historique) < enrichis A1 < enrichis A2 (V9).
 */
const baseAll: Record<string, LessonV2Exercise[]> = {
  ...cecrExercisesV2,
  ...cecrExercisesEnriched,
  ...cecrExercisesEnrichedA1,
  ...cecrExercisesEnrichedA2
};

// V12 — Les exercices Conversation (dialogue-response, context-react) sont
// AJOUTÉS à la liste existante de chaque leçon plutôt que d'override. Comme
// ça les leçons Conversation gardent leurs exercices classiques (mcq,
// translation…) PLUS les nouveaux types de format dialogue.
export const cecrExercisesV2All: Record<string, LessonV2Exercise[]> = (() => {
  const merged: Record<string, LessonV2Exercise[]> = { ...baseAll };
  for (const [lessonId, convExos] of Object.entries(cecrConversationExercises)) {
    const existing = merged[lessonId] ?? [];
    merged[lessonId] = [...existing, ...convExos];
  }
  return merged;
})();

/**
 * Liste des modules ayant reçu un pack enrichi V8.
 * Utile pour debug / badges UI / stats de couverture.
 */
export const enrichedModuleIds: ReadonlySet<string> = new Set([
  ...Object.keys(cecrExercisesEnriched),
  ...Object.keys(cecrExercisesEnrichedA1),
  ...Object.keys(cecrExercisesEnrichedA2)
]);

/**
 * Helper : true si le module a un pack enrichi manuel (V8+), false si la
 * liste provient encore du générateur auto.
 */
export function isModuleEnriched(moduleId: string): boolean {
  return enrichedModuleIds.has(moduleId);
}
