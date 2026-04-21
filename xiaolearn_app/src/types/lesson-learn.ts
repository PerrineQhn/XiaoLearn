/**
 * lesson-learn.ts — types partagés pour la phase "Apprentissage" des leçons V2.
 * ----------------------------------------------------------------------------
 * Centralise les 3 interfaces (Item, MinimalPair, Section) utilisées à la fois :
 *   - dans StructuredLessonPageV2 (rendu React de la phase learn),
 *   - dans LessonModule (types/lesson-structure.ts) pour permettre aux leçons
 *     du catalogue HSK/CECR de porter leur propre contenu pédagogique.
 *
 * Sans ce fichier, on aurait un cycle d'import : StructuredLessonPageV2 importe
 * Dialogue/ReadingText depuis lesson-structure, et LessonModule importerait en
 * sens inverse. Les séparer ici casse la boucle.
 */

/**
 * Item d'apprentissage : un mot ou un caractère avec sens, pinyin et audio
 * MP3/WAV. L'audio est joué via `playHanziAudio(hanzi, audio?)`. Si `audio`
 * n'est pas fourni, on tente les conventions HSK automatiquement.
 */
export interface LessonV2LearnItem {
  hanzi: string;
  pinyin: string;
  meaning: string;
  meaningEn?: string;
  audio?: string;
}

/**
 * Minimal pair pour la pratique de discrimination tonale/segmentale.
 * Affiché dans une grille horizontale avec audio sur chaque item.
 */
export interface LessonV2MinimalPair {
  pinyin: string;
  hanzi: string;
  meaning: string;
  meaningEn?: string;
  tone?: 1 | 2 | 3 | 4 | 5;
  audio?: string;
}

/**
 * Section de la phase "Apprentissage". Une leçon peut avoir plusieurs
 * sections qui défilent les unes après les autres avant la phase Exemples.
 *
 * Types de rendu spéciaux :
 *   - `tone`: affiche un diagramme de contour tonal + items comme "mots
 *     illustrant ce ton" avec audio.
 *   - `minimalPairs`: grille de paires minimales pour la discrimination.
 *   - `items` par défaut : liste verticale hanzi/pinyin/sens/audio.
 *
 * Le champ `body` est toujours affiché au-dessus.
 */
export interface LessonV2LearnSection {
  id: string;
  title: string;
  titleEn?: string;
  body?: string;
  bodyEn?: string;
  tone?: 1 | 2 | 3 | 4;
  items?: LessonV2LearnItem[];
  minimalPairs?: LessonV2MinimalPair[];
  tip?: string;
  tipEn?: string;
}
