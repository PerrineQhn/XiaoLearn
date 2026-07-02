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
 * Rôle grammatical d'un token dans une phrase. Inspiré de Seonsaengnim :
 * permet de coloriser chaque morceau d'une phrase pour visualiser sa
 * structure et comparer langue cible vs langue source.
 *
 * Mappés à des classes CSS dans `lesson-v2.css` (.tok--sujet, .tok--verbe…).
 */
export type SentenceTokenRole =
  | 'sujet'         // 我, 你, 他, 我们, 张伟
  | 'verbe'         // 吃, 喝, 是, 去, 学习
  | 'objet'         // 米饭, 水, 学生, 中文
  | 'temps'         // 今天, 明天, 早上七点
  | 'lieu'          // 在家, 在学校
  | 'particule'     // 吗, 呢, 了, 的
  | 'complement'    // de manière / résultat / direction
  | 'modificateur'  // 很, 不, 也, 都
  | 'copule'        // 是 (quand utilisé comme copule X=Y)
  | 'connecteur';   // 和, 但是, 因为

/** Un token dans une phrase tokenizée (1 mot ou groupe court). */
export interface LessonV2SentenceToken {
  text: string;
  pinyin?: string;
  role: SentenceTokenRole;
}

/** Une phrase tokenizée : la langue cible (chinois) + la traduction
 *  tokenizée AUSSI pour montrer la correspondance des rôles. */
export interface LessonV2TokenizedSentence {
  /** Tokens dans l'ordre de la langue cible (chinois). */
  zh: LessonV2SentenceToken[];
  /** Tokens dans l'ordre du français (mêmes rôles). */
  fr?: LessonV2SentenceToken[];
  /** Tokens dans l'ordre de l'anglais. */
  en?: LessonV2SentenceToken[];
  /** Note pédagogique optionnelle. */
  note?: string;
  noteEn?: string;
}

/**
 * Section de la phase "Apprentissage". Une leçon peut avoir plusieurs
 * sections qui défilent les unes après les autres avant la phase Exemples.
 *
 * Types de rendu spéciaux :
 *   - `tone`: affiche un diagramme de contour tonal + items comme "mots
 *     illustrant ce ton" avec audio.
 *   - `minimalPairs`: grille de paires minimales pour la discrimination.
 *   - `tokenizedSentences`: phrases avec tokens colorés par rôle grammatical
 *     (Sujet/Verbe/Objet/…), pour visualiser la structure et comparer les
 *     langues. Inspiré du format Seonsaengnim.
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
  tokenizedSentences?: LessonV2TokenizedSentence[];
  tip?: string;
  tipEn?: string;
}
