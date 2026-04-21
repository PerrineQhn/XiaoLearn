/**
 * cecr-dialogue-reading-attach.ts
 * -------------------------------
 * Attache à quelques modules CECR sélectionnés un `dialogue` et/ou une
 * `reading` tirés de `src/data/dialogues.ts` et `src/data/readings.ts`.
 *
 * But : éviter de dupliquer les contenus entre les pages standalone
 * (DialoguePageV2 / ReadingPageV2) et les leçons (StructuredLessonPageV2).
 * On garde cecr-course.ts propre et on relie les deux catalogues par id.
 *
 * Usage (dans App.tsx, au démarrage) :
 *   attachDialoguesAndReadingsToCecrPaths(cecrLessonPaths)
 */

import type { LessonPath } from '../types/lesson-structure';
import { getDialogueById } from './dialogues';
import { getReadingById } from './readings';

/**
 * Table module-id → dialogue-id.
 * Chaque paire doit rester pédagogiquement cohérente (thème + niveau).
 */
const DIALOGUE_BY_MODULE_ID: Record<string, string> = {
  // A1 · Bonjour / présentation → "Premier bonjour"
  'cecr-a1-hello-m1': 'dlg-a1-hello',
  // A1 · Famille → "Ta famille"
  'cecr-a1-family-m1': 'dlg-a1-family',
  // A2 · Nourriture & courses → "Commander au restaurant"
  'cecr-a2-food-m1': 'dlg-a2-restaurant',
  // A2 · Jour & téléphone → "Prendre le métro"
  'cecr-a2-day-m2': 'dlg-a2-metro',
  // B1.1 · Travail → "Entretien d'embauche"
  'cecr-b11-work-m1': 'dlg-b11-interview',
  // B1.2 · Narration / société → "Génération Z"
  'cecr-b12-narr-m1': 'dlg-b12-generations',
  // B2.1 · Environnement → "Voiture électrique ou pas ?"
  'cecr-b21-env-m1': 'dlg-b21-environment',
  // V8 · B2.1 · Tech (module 2) → "Pitch startup à un investisseur" (long dialogue)
  'cecr-b21-tech-m2': 'dlg-b21-startup-pitch',
  // V8 · B2.2 · Santé (module 1) → débat "996" et santé mentale
  'cecr-b22-health-m1': 'dlg-b22-mental-health-debate'
};

/**
 * Table module-id → reading-id.
 */
const READING_BY_MODULE_ID: Record<string, string> = {
  // A1 · Présentation (module 3) → "La journée de Wang Lin"
  'cecr-a1-hello-m3': 'rd-a1-my-day',
  // A2 · Jour & téléphone (module 3) → "Voyage à Shanghai"
  'cecr-a2-day-m3': 'rd-a2-travel',
  // B1.1 · Travail (module 2) → "Premier jour au bureau"
  'cecr-b11-work-m2': 'rd-b11-work',
  // B1.2 · Éducation / société (module 1) → "Le Gaokao"
  'cecr-b12-soc-m1': 'rd-b12-gaokao',
  // B2.1 · Environnement (module 2) → "Pollution de l'air en Chine"
  'cecr-b21-env-m2': 'rd-b21-environment',
  // V8 · B2.1 · Tech (module 1) → article original "IA et travail"
  'cecr-b21-tech-m1': 'rd-b21-ai-work',
  // V8 · B2.1 · Économie (module 1) → article éco "Reprise post-pandémie"
  'cecr-b21-economics-m1': 'rd-b21-post-pandemic-economy',
  // V8 · B2.1 · Grammaire connecteurs (module 1) → extrait des Analectes
  'cecr-b21-grammar-lian-m1': 'rd-b21-analects-excerpt',
  // V8 · B2.2 · Arts (module 1) → article "Patrimoine immatériel"
  'cecr-b22-arts-m1': 'rd-b22-intangible-heritage'
};

/**
 * Mute les paths fournis : pour chaque module dont l'id est enregistré
 * ci-dessus, on assigne `module.dialogue` et/ou `module.reading`.
 * Retourne le nombre d'attachements effectifs (utile pour tests / sanity).
 */
export function attachDialoguesAndReadingsToCecrPaths(paths: LessonPath[]): number {
  let attached = 0;
  if (!Array.isArray(paths)) return 0;
  for (const path of paths) {
    // Defensive guards : un trou (virgule parasite) dans le tableau source
    // rendrait `path` undefined — on saute silencieusement plutôt que de
    // casser le chargement de l'app.
    if (!path || !Array.isArray(path.lessons)) continue;
    for (const module of path.lessons) {
      if (!module || !module.id) continue;
      const dialogueId = DIALOGUE_BY_MODULE_ID[module.id];
      if (dialogueId && !module.dialogue) {
        const dialogue = getDialogueById(dialogueId);
        if (dialogue) {
          module.dialogue = dialogue;
          attached += 1;
        }
      }
      const readingId = READING_BY_MODULE_ID[module.id];
      if (readingId && !module.reading) {
        const reading = getReadingById(readingId);
        if (reading) {
          module.reading = reading;
          attached += 1;
        }
      }
    }
  }
  return attached;
}

/** Ids des modules enrichis (utile pour l'UI / diagnostics). */
export const MODULES_WITH_DIALOGUE = Object.keys(DIALOGUE_BY_MODULE_ID);
export const MODULES_WITH_READING = Object.keys(READING_BY_MODULE_ID);
