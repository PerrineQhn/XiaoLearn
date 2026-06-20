/**
 * StructuredLessonPageV2.tsx — v2 drop-in d'une leçon structurée XiaoLearn
 * -----------------------------------------------------------------------
 * Reprend le pattern Seonsaengnim pour les leçons :
 *   1. Intro     — pourquoi cette leçon, ce qu'on va apprendre, durée estimée
 *   2. Exemples  — 3 à 5 phrases clé (hanzi/pinyin/traduction + audio)
 *   3. Pratique  — 3 à 5 mini-exercices (QCM, trou à compléter)
 *   4. Récap     — points clés + XP gagnés + suggestion prochaine leçon
 *
 * Volontairement autonome : ne dépend pas des types verrouillés. Les props
 * sont typées localement pour pouvoir être mappées depuis `LessonItem` côté
 * App.tsx (voir la note d'intégration).
 *
 * Styles : ./../styles/lesson-v2.css (scoped sous .lesson-v2)
 */

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode
} from 'react';
import '../styles/lesson-v2.css';
import type { Dialogue, ReadingText } from '../types/lesson-structure';
import type {
  LessonV2LearnItem,
  LessonV2LearnSection,
  LessonV2MinimalPair
} from '../types/lesson-learn';
import { playHanziAudio, playAudioWithFallback } from '../utils/audio';
import PronunciationCheck from '../components/PronunciationCheck';
import OfflineLessonButton from '../components/OfflineLessonButton';
import AutoPinyin from '../components/AutoPinyin';
import PronunciationDrill, {
  type PronunciationDrillItem
} from '../components/PronunciationDrill';
import HandwritingDrill from '../components/HandwritingDrill';

export type { LessonV2LearnItem, LessonV2MinimalPair, LessonV2LearnSection };

// ============================================================================
//  TYPES — autonomes, mappables depuis LessonItem
// ============================================================================

export type LessonV2Language = 'fr' | 'en';

export type LessonV2HskLevel = 'hsk1' | 'hsk2' | 'hsk3' | 'hsk4' | 'hsk5' | 'hsk6' | 'hsk7';

export type LessonV2Category =
  | 'vocabulary'
  | 'grammar'
  | 'pronunciation'
  | 'conversation'
  | 'culture'
  | 'writing'
  | 'reading';

/** Un exemple présenté dans la phase Exemples. */
export interface LessonV2Example {
  hanzi: string;
  pinyin: string;
  translation: string;
  translationEn?: string;
  /** URL ou chemin à lire via un AudioButton existant, optionnel. */
  audio?: string;
}

/**
 * Une question de pratique. Types supportés (V8 — enrichissement B1.2+) :
 *   - mcq : QCM classique (choix multiple)
 *   - fill : complète la phrase (une seule case trouée avec `___`)
 *   - order : remise dans l'ordre — segments mélangés à ranger
 *     → `choices` contient les segments dans l'ordre correct
 *     → rendu dédié : l'utilisateur tape les segments dans l'ordre
 *   - grammar-quiz : MCQ spécialisé sur une règle grammaticale contextuelle
 *     (rendu = mcq, badge "grammaire" différent)
 *   - translation : MCQ sur la bonne traduction (thème FR→ZH ou version ZH→FR)
 *     (rendu = mcq, badge "traduction")
 *   - error-correction : détecter le mot/segment fautif dans une phrase
 *     (rendu = mcq, choices = segments suspects, correctIndex = celui fautif)
 *
 * Les 3 derniers types sont sémantiquement distincts mais réutilisent le
 * rendu MCQ — ils permettent le filtrage, les badges et les stats par
 * catégorie pédagogique (cf. field `category`).
 */
export type LessonV2ExerciseType =
  | 'mcq'
  | 'fill'
  | 'order'
  | 'grammar-quiz'
  | 'translation'
  | 'error-correction'
  /**
   * dialogue-response — l'apprenant lit un mini-dialogue (2-4 répliques),
   * la DERNIÈRE réplique est masquée et il doit choisir LA bonne réponse
   * parmi `choices`. Spécialement pédagogique pour les leçons Conversation.
   *
   * Structure attendue dans le LessonV2Exercise :
   *   - dialogue: array de répliques { speaker, hanzi, pinyin, translationFr,
   *     translationEn? } (la dernière est l'à-trouver, généralement par
   *     l'apprenant côté "moi")
   *   - choices: les options de réponse pour la dernière réplique
   *   - correctIndex: pointe vers la bonne option
   *   - explanation: explique pourquoi cette réponse est juste pour le contexte
   */
  | 'dialogue-response'
  /**
   * context-react — une situation est décrite en FR ("Tu entres dans un
   * taxi et veux indiquer l'aéroport"), l'apprenant choisit LA phrase
   * appropriée parmi `choices`. Idéal pour fixer les expressions idiomatiques.
   */
  | 'context-react'
  /**
   * formal-casual — une phrase en chinois est donnée et l'apprenant doit
   * identifier son registre (formel/familier) ou choisir la version
   * adaptée à un contexte spécifié.
   */
  | 'formal-casual';

/**
 * Une réplique de mini-dialogue pour les exercices `dialogue-response`.
 * Le `speaker` est libre (peut être un prénom, "Serveur", "A"/"B", ou "Toi"
 * pour la réplique de l'utilisateur).
 */
export interface DialogueLine {
  speaker: string;
  speakerEn?: string;
  hanzi: string;
  pinyin?: string;
  translationFr?: string;
  translationEn?: string;
  /** URL audio pour cette réplique. Si absente, audio désactivé pour la ligne. */
  audio?: string;
  /** Si true, c'est la réplique de l'apprenant (rendue à droite, en accent). */
  isUser?: boolean;
}

/**
 * Catégorie pédagogique — permet de différencier le format d'exercice et
 * d'afficher un badge/filtre dans l'UI (grammaire vs. vocabulaire, etc.).
 */
export type LessonV2ExerciseCategory =
  | 'vocabulary'
  | 'grammar'
  | 'translation'
  | 'listening'
  | 'reading';

export interface LessonV2Exercise {
  id: string;
  type: LessonV2ExerciseType;
  prompt: string;
  promptEn?: string;
  /** Phrase ou contexte — pour `fill`, utiliser `___` comme placeholder. */
  sentence?: string;
  sentenceEn?: string;
  /**
   * Traduction française de la phrase — utilisée comme indice de sens dans les
   * exercices `fill`. Si absente, on retombe sur `sentenceEn` (compat legacy).
   */
  sentenceFr?: string;
  /**
   * Choix :
   *   - mcq / grammar-quiz / translation / error-correction / fill : les
   *     choix classiques, `correctIndex` pointe vers le bon.
   *   - order : contient les segments DANS L'ORDRE CORRECT. L'UI les mélange
   *     à l'affichage et demande à l'utilisateur de les taper dans l'ordre.
   */
  choices: string[];
  correctIndex: number;
  /** Catégorie pédagogique (V8) — optionnelle, utilisée pour badges/stats. */
  category?: LessonV2ExerciseCategory;
  /** Explication montrée après la réponse (fr). */
  explanation?: string;
  explanationEn?: string;
  /**
   * Audio associé à l'exercice. Deux formes :
   *   - `audio`: URL explicite (ex. "audio/pinyin/b.mp3" ou "audio/hsk1/hsk1_妈.wav")
   *   - `audioHanzi`: hanzi à faire jouer via `playHanziAudio` (convention HSK auto)
   *
   * Rendu : bouton 🔊 affiché au-dessus du prompt. Pour les exercices de
   * discrimination phonétique (tons, initiales, finales), l'audio est la seule
   * consigne — l'utilisateur ne peut répondre qu'après écoute.
   *
   * Si `autoPlay` est true, l'audio se joue automatiquement à l'apparition
   * de l'exercice (utile pour les exercices d'écoute). Désactivé par défaut
   * pour éviter d'agresser l'utilisateur entre deux exercices.
   */
  audio?: string;
  audioHanzi?: string;
  autoPlay?: boolean;
  /**
   * Pour les exercices `dialogue-response` : les répliques du mini-dialogue.
   * La dernière réplique est l'à-trouver (généralement `isUser: true`), et
   * `choices` contient les réponses candidates pour cette dernière réplique.
   */
  dialogue?: DialogueLine[];
  /**
   * Pour `context-react` : description du contexte/situation en français
   * ("Tu es dans un taxi et tu veux indiquer l'aéroport"). En anglais via
   * `contextEn`.
   */
  context?: string;
  contextEn?: string;
}

export interface LessonV2Data {
  id: string;
  title: string;
  titleEn?: string;
  subtitle?: string;
  subtitleEn?: string;
  level: LessonV2HskLevel;
  category?: LessonV2Category;
  /** Durée estimée en minutes (affichée dans l'intro et la badge). */
  estimatedMinutes?: number;
  /** Objectifs pédagogiques : une liste courte (2 à 4 items). */
  objectives: string[];
  objectivesEn?: string[];
  /**
   * Sections d'apprentissage (phase "learn"). Affichées entre l'intro et les
   * exemples. Si absent ou vide, la phase "learn" est skippée complètement.
   * C'est là qu'on met le vrai contenu pédagogique (tons, règles, etc.).
   */
  learnSections?: LessonV2LearnSection[];
  /** Exemples clés. */
  examples: LessonV2Example[];
  /** Pratique (3 à 5 items idéalement). */
  exercises: LessonV2Exercise[];
  /** Points clés à retenir (1 à 3 items). */
  keyTakeaways: string[];
  keyTakeawaysEn?: string[];
  /** XP attribués en fin de leçon. Par défaut : 50 (aligné Seonsaengnim). */
  xpReward?: number;
  /**
   * Dialogue optionnel intégré à la leçon (affiché entre Exemples et Pratique).
   * Format unifié avec src/types/lesson-structure.ts pour réutiliser dialogues.ts.
   */
  dialogue?: Dialogue;
  /**
   * Lecture optionnelle intégrée à la leçon (affichée entre Exemples et Pratique).
   * Format unifié avec src/types/lesson-structure.ts pour réutiliser readings.ts.
   */
  reading?: ReadingText;
}

export interface LessonV2Suggestion {
  id: string;
  title: string;
  level: LessonV2HskLevel;
  estimatedMinutes?: number;
}

export interface StructuredLessonPageV2Props {
  lesson: LessonV2Data;
  language?: LessonV2Language;
  /** Suggestion de prochaine leçon, affichée à la fin (optionnelle). */
  nextLesson?: LessonV2Suggestion | null;
  /** Nom à afficher dans le récap. */
  userDisplayName?: string;
  /** Callback — marquer la leçon comme terminée (côté useLessonProgress). */
  onComplete?: (payload: { lessonId: string; xpGained: number; correctCount: number; total: number }) => void;
  /** Callback — lancer la prochaine leçon suggérée. */
  onOpenNextLesson?: (nextLessonId: string) => void;
  /** Callback — retour à la liste / dashboard. */
  onBack?: () => void;
  /** Lecture audio, branché sur ton AudioButton existant si fourni. */
  onPlayAudio?: (audioUrl: string) => void;
}

// ============================================================================
//  COPIES — i18n autonome, fallback fr
// ============================================================================

type Copy = Record<'fr' | 'en', Record<string, string>>;

const COPY: Copy = {
  fr: {
    step1: 'Intro',
    stepLearn: 'Apprentissage',
    step2: 'Exemples',
    step3: 'Pratique',
    step4: 'Récap',
    back: '← Retour',
    minutes: 'min',
    xp: 'XP',
    objectives: 'Ce que tu vas maîtriser',
    continue: 'Commencer',
    learnHint: 'Prends le temps de lire chaque section, écoute les audios puis continue.',
    learnSectionCounter: 'Section',
    prevSection: '← Précédent',
    nextSection: 'Suivant →',
    toContinue: 'Passer à la suite →',
    toneLabel: 'Ton',
    tone1Name: '1er ton (plat)',
    tone2Name: '2e ton (montant)',
    tone3Name: '3e ton (descendant-montant)',
    tone4Name: '4e ton (descendant)',
    tipLabel: 'Astuce',
    minimalPairsLabel: 'Paires minimales',
    minimalPairsHint: 'Même consonne + voyelle, seul le ton change. Écoute et compare.',
    examplesTitle: 'Exemples clés',
    examplesHint: 'Écoute, observe, répète à voix haute.',
    practiceTitle: 'Pratique',
    practiceHint: 'Valide chaque réponse — tu verras l\'explication après.',
    check: 'Valider',
    next: 'Suivant',
    correct: '✓ Bonne réponse',
    incorrect: '✗ Mauvaise réponse',
    yourAnswer: 'Ta réponse :',
    correctAnswer: 'Bonne réponse :',
    summaryTitle: 'Bravo, leçon terminée 🎉',
    summarySubtitle: 'Voici ce que tu retiens.',
    keyTakeaways: 'À retenir',
    score: 'Score',
    accuracy: 'Réussite',
    timeSpent: 'Temps passé',
    xpGained: 'XP gagnés',
    nextLessonLabel: 'Prochaine leçon suggérée',
    startNext: 'Enchaîner',
    finish: 'Terminer',
    skip: 'Passer',
    progressLabel: 'Progression',
    stepCounter: 'Étape',
    dialogueTitle: 'Dialogue',
    dialogueHint: 'Observe la structure, puis lis à voix haute.',
    readingTitle: 'Lecture',
    readingHint: 'Lis le texte en entier, puis phrase par phrase.',
    hidePinyin: 'Masquer pinyin',
    showPinyin: 'Afficher pinyin',
    hideTranslation: 'Masquer traduction',
    showTranslation: 'Afficher traduction',
    meaningLabel: 'Sens',
    listen: 'Écouter',
    playAudio: 'Lire l\'audio',
    reviewMistakes: 'Questions ratées',
    reviewMistakesEmpty: 'Aucune erreur — sans-faute !',
    showMistakes: 'Voir le détail',
    hideMistakes: 'Masquer le détail',
    feedbackPerfect: 'Parfait 🎯 Tu maîtrises complètement cette leçon.',
    feedbackGreat: 'Excellent ! Tu maîtrises le sujet, quelques détails à peaufiner.',
    feedbackGood: 'Bien joué. Quelques points à consolider pour tout retenir.',
    feedbackTryAgain: 'Cette leçon demande un peu plus de pratique — reviens-y bientôt.'
  },
  en: {
    step1: 'Intro',
    stepLearn: 'Learn',
    step2: 'Examples',
    step3: 'Practice',
    step4: 'Recap',
    back: '← Back',
    minutes: 'min',
    xp: 'XP',
    objectives: 'What you will master',
    continue: 'Start',
    learnHint: 'Read each section, play the audios then move on.',
    learnSectionCounter: 'Section',
    prevSection: '← Previous',
    nextSection: 'Next →',
    toContinue: 'Move on →',
    toneLabel: 'Tone',
    tone1Name: '1st tone (flat)',
    tone2Name: '2nd tone (rising)',
    tone3Name: '3rd tone (dipping)',
    tone4Name: '4th tone (falling)',
    tipLabel: 'Tip',
    minimalPairsLabel: 'Minimal pairs',
    minimalPairsHint: 'Same consonant + vowel, only the tone changes. Listen and compare.',
    examplesTitle: 'Key examples',
    examplesHint: 'Listen, watch, say it out loud.',
    practiceTitle: 'Practice',
    practiceHint: 'Validate each answer — the explanation appears afterwards.',
    check: 'Check',
    next: 'Next',
    correct: '✓ Correct',
    incorrect: '✗ Incorrect',
    yourAnswer: 'Your answer:',
    correctAnswer: 'Correct answer:',
    summaryTitle: 'Lesson complete 🎉',
    summarySubtitle: 'Here is what you take away.',
    keyTakeaways: 'Takeaways',
    score: 'Score',
    accuracy: 'Accuracy',
    timeSpent: 'Time spent',
    xpGained: 'XP earned',
    nextLessonLabel: 'Suggested next lesson',
    startNext: 'Continue',
    finish: 'Finish',
    skip: 'Skip',
    progressLabel: 'Progress',
    stepCounter: 'Step',
    dialogueTitle: 'Dialogue',
    dialogueHint: 'Look at the structure, then read it aloud.',
    readingTitle: 'Reading',
    readingHint: 'Read the full text, then line by line.',
    hidePinyin: 'Hide pinyin',
    showPinyin: 'Show pinyin',
    hideTranslation: 'Hide translation',
    showTranslation: 'Show translation',
    meaningLabel: 'Meaning',
    listen: 'Listen',
    playAudio: 'Play audio',
    reviewMistakes: 'Missed questions',
    reviewMistakesEmpty: 'No mistakes — flawless!',
    showMistakes: 'Show details',
    hideMistakes: 'Hide details',
    feedbackPerfect: 'Perfect 🎯 You fully master this lesson.',
    feedbackGreat: 'Excellent! You master the topic, a few details to polish.',
    feedbackGood: 'Well done. A few points to consolidate.',
    feedbackTryAgain: 'This lesson needs a bit more practice — come back to it soon.'
  }
};

const getCopy = (language: LessonV2Language, key: keyof (typeof COPY)['fr']): string =>
  COPY[language]?.[key] ?? COPY.fr[key];

// ============================================================================
//  CONSTANTES
// ============================================================================

const HSK_COLORS: Record<LessonV2HskLevel, string> = {
  hsk1: '#10b981', // vert
  hsk2: '#22c55e',
  hsk3: '#3b82f6',
  hsk4: '#6366f1',
  hsk5: '#a855f7',
  hsk6: '#ec4899',
  hsk7: '#ef4444' // rouge avancé
};

const CATEGORY_LABELS: Record<LessonV2Category, { fr: string; en: string; icon: string }> = {
  vocabulary: { fr: 'Vocabulaire', en: 'Vocabulary', icon: '📖' },
  grammar: { fr: 'Grammaire', en: 'Grammar', icon: '🧩' },
  pronunciation: { fr: 'Prononciation', en: 'Pronunciation', icon: '🔊' },
  conversation: { fr: 'Conversation', en: 'Conversation', icon: '💬' },
  culture: { fr: 'Culture', en: 'Culture', icon: '🏮' },
  writing: { fr: 'Écriture', en: 'Writing', icon: '✍️' },
  reading: { fr: 'Lecture', en: 'Reading', icon: '📜' }
};

// ============================================================================
//  SOUS-COMPOSANTS
// ============================================================================

type StepKey = 'intro' | 'learn' | 'examples' | 'practice' | 'summary';

/**
 * Construit l'ordre des étapes selon la leçon : si pas de learnSections, la
 * phase "learn" est skippée (stepper affiche 4 points au lieu de 5).
 */
const buildStepOrder = (hasLearn: boolean): StepKey[] =>
  hasLearn
    ? ['intro', 'learn', 'examples', 'practice', 'summary']
    : ['intro', 'examples', 'practice', 'summary'];

/** Barre de progression de la leçon (4 ou 5 étapes selon la présence de learn). */
const LessonStepper = ({
  currentStep,
  language,
  stepOrder
}: {
  currentStep: StepKey;
  language: LessonV2Language;
  stepOrder: StepKey[];
}) => {
  const currentIndex = stepOrder.indexOf(currentStep);
  const percent = ((currentIndex + 1) / stepOrder.length) * 100;

  const labels: Record<StepKey, string> = {
    intro: getCopy(language, 'step1'),
    learn: getCopy(language, 'stepLearn'),
    examples: getCopy(language, 'step2'),
    practice: getCopy(language, 'step3'),
    summary: getCopy(language, 'step4')
  };

  return (
    <div className="lv2-stepper" aria-label={getCopy(language, 'progressLabel')}>
      <div className="lv2-stepper-track">
        <div className="lv2-stepper-fill" style={{ width: `${percent}%` }} />
      </div>
      <ol className="lv2-stepper-labels">
        {stepOrder.map((step, idx) => (
          <li
            key={step}
            className={`lv2-stepper-label ${idx <= currentIndex ? 'lv2-stepper-label--done' : ''}`}
          >
            <span className="lv2-stepper-dot">{idx + 1}</span>
            <span className="lv2-stepper-text">{labels[step]}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

/** Badge HSK coloré façon Seonsaengnim. */
const HskBadge = ({ level }: { level: LessonV2HskLevel }) => (
  <span
    className="lv2-hsk-badge"
    style={{ ['--lv2-hsk-color' as keyof CSSProperties]: HSK_COLORS[level] } as CSSProperties}
  >
    {level.toUpperCase()}
  </span>
);

/**
 * ToneContourSVG — visualisation du contour tonal d'un des 4 tons mandarin.
 *
 * Convention pédagogique classique (Chao 1930) — hauteur 1 (grave) à 5 (aigu) :
 *   - Ton 1 : 5-5 (plat aigu, pitch constant)
 *   - Ton 2 : 3-5 (montant, du médium vers l'aigu)
 *   - Ton 3 : 2-1-4 (descendant puis montant, plancher à 1)
 *   - Ton 4 : 5-1 (descendant brusque, aigu vers grave)
 *
 * Le SVG est dessiné dans un viewbox 100×60 (5 niveaux × 20px) avec une grille
 * légère derrière la courbe. Chaque ton a sa couleur identitaire.
 */
const TONE_COLORS: Record<1 | 2 | 3 | 4, string> = {
  1: '#0ea5e9', // cyan — stable / plat
  2: '#10b981', // vert — montée
  3: '#f59e0b', // ambre — descente puis remontée
  4: '#ef4444' // rouge — descente vive
};

const TONE_PATHS: Record<1 | 2 | 3 | 4, string> = {
  // y = 60 - (level × 12), hauteur 5 → y=0, hauteur 1 → y=48, avec un padding top=6
  1: 'M 8 12 L 92 12', // 5-5
  2: 'M 8 36 Q 50 30 92 12', // 3 → 5
  3: 'M 8 42 Q 35 60 50 56 Q 75 48 92 20', // 2 → 1 → 4
  4: 'M 8 12 L 92 54' // 5 → 1
};

const ToneContourSVG = ({
  tone,
  pinyin,
  hanzi,
  onPlay
}: {
  tone: 1 | 2 | 3 | 4;
  pinyin: string;
  hanzi?: string;
  onPlay?: () => void;
}) => {
  const color = TONE_COLORS[tone];
  const path = TONE_PATHS[tone];
  return (
    <div className="lv2-tone-contour" style={{ ['--lv2-tone-color' as keyof CSSProperties]: color } as CSSProperties}>
      <div className="lv2-tone-contour-head">
        <span className="lv2-tone-number">{tone}</span>
        <div className="lv2-tone-labels">
          {hanzi && <div className="lv2-tone-hanzi">{hanzi}</div>}
          <div className="lv2-tone-pinyin">{pinyin}</div>
        </div>
        {onPlay && (
          <button type="button" className="lv2-tone-play" aria-label="Play audio" onClick={onPlay}>
            🔊
          </button>
        )}
      </div>
      <svg className="lv2-tone-svg" viewBox="0 0 100 60" role="img" aria-label={`Contour du ton ${tone}`}>
        {/* grille : 5 lignes horizontales */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1={4}
            x2={96}
            y1={6 + i * 12}
            y2={6 + i * 12}
            stroke="currentColor"
            strokeWidth={0.5}
            strokeOpacity={0.15}
          />
        ))}
        <path d={path} fill="none" stroke={color} strokeWidth={3.5} strokeLinecap="round" />
      </svg>
    </div>
  );
};

/**
 * Icône haut-parleur — line-art en SVG pour matcher exactement le style
 * du micro de PronunciationCheck. Utilisée dans ExampleRow + LearnItemRow.
 */
const SpeakerLineIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
  </svg>
);

/**
 * Ligne d'exemple (hanzi + pinyin + traduction + play).
 *
 * Le bouton 🔊 est TOUJOURS rendu : si `example.audio` est renseigné on le
 * passe en priorité à `playHanziAudio`, sinon le resolver du module audio
 * (`buildHanziCandidates`) essaie automatiquement `audio/examples/<hash>.mp3`
 * (pour les phrases de +3 caractères) puis les conventions HSK. Ça évite de
 * masquer le bouton quand le mapper V2 ne propage pas d'URL explicite (cas
 * d'un `firstExample` multi-caractères sans champ `audio:`).
 *
 * Le prop `onPlay` reste accepté pour compat descendante (si le parent veut
 * jouer une URL explicite), mais n'est plus nécessaire : par défaut on passe
 * par `playHanziAudio(hanzi, audio?)`, qui gère MP3 → WAV fallback + preload.
 */
const ExampleRow = ({
  example,
  language,
  onPlay
}: {
  example: LessonV2Example;
  language: LessonV2Language;
  onPlay?: (url: string) => void;
}) => {
  const handlePlay = useCallback(() => {
    // Si le parent fournit un handler + une URL explicite, on respecte sa logique.
    if (onPlay && example.audio) {
      onPlay(example.audio);
      return;
    }
    // Sinon on laisse le resolver trouver l'audio à partir du hanzi (hash MP3
    // pour les phrases, conventions HSK pour les mots). Silencieux si rien ne
    // matche — pas de fallback Web Speech (cf. audio policy).
    playHanziAudio(example.hanzi, example.audio).catch(() => {
      /* silent: aucun fichier audio trouvé */
    });
  }, [example.audio, example.hanzi, onPlay]);

  return (
    <div className="lv2-example">
      <div className="lv2-example-main">
        <div className="lv2-example-hanzi">{example.hanzi}</div>
        <div className="lv2-example-pinyin">{example.pinyin}</div>
        <div className="lv2-example-translation">
          {language === 'en' && example.translationEn ? example.translationEn : example.translation}
        </div>
      </div>
      <div className="lv2-example-controls">
        <button
          type="button"
          className="lv2-example-audio"
          aria-label={language === 'en' ? 'Play audio' : 'Écouter'}
          title={language === 'en' ? 'Play audio' : 'Écouter'}
          onClick={handlePlay}
        >
          <SpeakerLineIcon size={16} />
        </button>
        <PronunciationCheck
          hanzi={example.hanzi}
          pinyin={example.pinyin}
          size={32}
        />
      </div>
    </div>
  );
};

/**
 * Row réutilisable pour les items d'une section "Apprentissage".
 * Joue systématiquement via playHanziAudio (MP3/WAV, pas de Web Speech).
 */
const LearnItemRow = ({
  item,
  language
}: {
  item: LessonV2LearnItem;
  language: LessonV2Language;
}) => {
  const handlePlay = useCallback(() => {
    playHanziAudio(item.hanzi, item.audio).catch(() => {
      /* silent: pas d'MP3 pour ce mot */
    });
  }, [item.hanzi, item.audio]);
  return (
    <div className="lv2-learn-item">
      <div className="lv2-learn-item-hanzi">{item.hanzi}</div>
      <div className="lv2-learn-item-pinyin">{item.pinyin}</div>
      <div className="lv2-learn-item-meaning">
        {language === 'en' && item.meaningEn ? item.meaningEn : item.meaning}
      </div>
      <div className="lv2-learn-item-controls">
        <button
          type="button"
          className="lv2-learn-item-audio"
          aria-label={language === 'en' ? 'Play audio' : 'Écouter'}
          title={language === 'en' ? 'Play audio' : 'Écouter'}
          onClick={handlePlay}
        >
          <SpeakerLineIcon size={16} />
        </button>
        <PronunciationCheck
          hanzi={item.hanzi}
          pinyin={item.pinyin}
          size={32}
        />
      </div>
    </div>
  );
};

/**
 * Bloc paire minimale : grille horizontale avec 2-4 items qui diffèrent par
 * un seul paramètre (ton en général). Audio sur chaque item.
 */
const MinimalPairsRow = ({
  pairs,
  language
}: {
  pairs: LessonV2MinimalPair[];
  language: LessonV2Language;
}) => {
  const handlePlay = useCallback((pair: LessonV2MinimalPair) => {
    playHanziAudio(pair.hanzi, pair.audio).catch(() => {
      /* silent */
    });
  }, []);
  return (
    <div className="lv2-minimal-pairs">
      {pairs.map((pair, idx) => {
        const toneColor = pair.tone && pair.tone >= 1 && pair.tone <= 4
          ? TONE_COLORS[pair.tone as 1 | 2 | 3 | 4]
          : undefined;
        return (
          <button
            key={idx}
            type="button"
            className="lv2-minimal-pair"
            onClick={() => handlePlay(pair)}
            style={
              toneColor
                ? ({ ['--lv2-tone-color' as keyof CSSProperties]: toneColor } as CSSProperties)
                : undefined
            }
          >
            {pair.tone && <span className="lv2-minimal-pair-tone">{pair.tone}</span>}
            <span className="lv2-minimal-pair-hanzi">{pair.hanzi}</span>
            <span className="lv2-minimal-pair-pinyin">{pair.pinyin}</span>
            <span className="lv2-minimal-pair-meaning">
              {language === 'en' && pair.meaningEn ? pair.meaningEn : pair.meaning}
            </span>
            <span className="lv2-minimal-pair-audio" aria-hidden>🔊</span>
          </button>
        );
      })}
    </div>
  );
};

/**
 * Bloc de phrases tokenisées (style Seonsaengnim) — affiche la légende
 * des rôles grammaticaux présents + chaque phrase avec ses tokens colorés
 * en chinois et en langue source (fr/en) pour la comparaison directe.
 *
 * Le pinyin sous chaque token chinois est optionnel mais utile en A1.
 */
const ROLE_LABEL_FR: Record<string, string> = {
  sujet: 'Sujet',
  verbe: 'Verbe',
  objet: 'Objet',
  temps: 'Temps',
  lieu: 'Lieu',
  particule: 'Particule',
  complement: 'Complément',
  modificateur: 'Modificateur',
  copule: 'Copule',
  connecteur: 'Connecteur'
};
const ROLE_LABEL_EN: Record<string, string> = {
  sujet: 'Subject',
  verbe: 'Verb',
  objet: 'Object',
  temps: 'Time',
  lieu: 'Place',
  particule: 'Particle',
  complement: 'Complement',
  modificateur: 'Modifier',
  copule: 'Copula',
  connecteur: 'Connector'
};

type AnyToken = { text: string; pinyin?: string; role: string };

/**
 * Sépare la ponctuation collée à un token de son contenu textuel. Permet
 * de rendre la ponctuation comme du texte plat entre les blocs colorés,
 * pour éviter qu'un token comme ", je" se retrouve dans le bloc bleu Sujet
 * avec la virgule à l'intérieur. Stratégie : on coupe les caractères de
 * ponctuation en début/fin tout en gardant le cœur du token coloré.
 */
const PUNCT_RE = /[\s,，.。;；:：!！?？'""''(()）\[\]【】《》「」-]/;
function splitPunctuation(text: string): { lead: string; core: string; trail: string } {
  let lead = '';
  let core = text;
  let trail = '';
  while (core.length > 0 && PUNCT_RE.test(core[0])) {
    lead += core[0];
    core = core.slice(1);
  }
  while (core.length > 0 && PUNCT_RE.test(core[core.length - 1])) {
    trail = core[core.length - 1] + trail;
    core = core.slice(0, -1);
  }
  return { lead, core, trail };
}

const TokenizedSentencesBlock = ({
  sentences,
  language
}: {
  sentences: Array<{
    zh: AnyToken[];
    fr?: AnyToken[];
    en?: AnyToken[];
    note?: string;
    noteEn?: string;
  }>;
  language: LessonV2Language;
}) => {
  // Collecte les rôles présents dans toutes les phrases pour la légende
  const rolesPresent = new Set<string>();
  for (const s of sentences) {
    for (const t of s.zh) rolesPresent.add(t.role);
    if (s.fr) for (const t of s.fr) rolesPresent.add(t.role);
    if (s.en) for (const t of s.en) rolesPresent.add(t.role);
  }
  const labels = language === 'en' ? ROLE_LABEL_EN : ROLE_LABEL_FR;
  // Ordre canonique pour l'affichage de la légende (logique grammaticale)
  const ROLE_ORDER = [
    'sujet', 'temps', 'lieu', 'modificateur', 'verbe', 'copule',
    'objet', 'complement', 'particule', 'connecteur'
  ];
  const sortedRoles = ROLE_ORDER.filter((r) => rolesPresent.has(r));
  return (
    <div className="lv2-tokens-block">
      <div className="lv2-tokens-legend">
        {sortedRoles.map((role) => (
          <span key={role} className={`lv2-tok-chip lv2-tok-chip--${role}`}>
            ● {labels[role] ?? role}
          </span>
        ))}
      </div>
      {sentences.map((sentence, idx) => {
        const sourceTokens =
          language === 'en' ? sentence.en : sentence.fr;
        const note =
          language === 'en' && sentence.noteEn
            ? sentence.noteEn
            : sentence.note;
        return (
          <div key={idx} className="lv2-tokens-sentence">
            <div className="lv2-tokens-lang-label">
              {language === 'en' ? 'Chinese' : 'Chinois'}
            </div>
            <div className="lv2-tokens-row">
              {sentence.zh.map((tok, i) => {
                const { lead, core, trail } = splitPunctuation(tok.text);
                if (!core) {
                  // 100% ponctuation → texte plat, pas de bloc coloré
                  return (
                    <span key={`zh-${i}`} className="lv2-tok-punct">
                      {tok.text}
                    </span>
                  );
                }
                return (
                  <span key={`zh-${i}`} className="lv2-tok-wrap">
                    {lead && <span className="lv2-tok-punct">{lead}</span>}
                    <span className={`lv2-tok lv2-tok--${tok.role}`}>
                      <span>{core}</span>
                      {tok.pinyin && (
                        <span className="lv2-tok-pinyin">{tok.pinyin}</span>
                      )}
                    </span>
                    {trail && <span className="lv2-tok-punct">{trail}</span>}
                  </span>
                );
              })}
            </div>
            {sourceTokens && sourceTokens.length > 0 && (
              <>
                <div className="lv2-tokens-lang-label">
                  {language === 'en' ? 'English' : 'Français'}
                </div>
                <div className="lv2-tokens-row">
                  {sourceTokens.map((tok, i) => {
                    const { lead, core, trail } = splitPunctuation(tok.text);
                    if (!core) {
                      return (
                        <span key={`src-${i}`} className="lv2-tok-punct">
                          {tok.text}
                        </span>
                      );
                    }
                    return (
                      <span key={`src-${i}`} className="lv2-tok-wrap">
                        {lead && <span className="lv2-tok-punct">{lead}</span>}
                        <span className={`lv2-tok lv2-tok--${tok.role}`}>
                          <span>{core}</span>
                        </span>
                        {trail && <span className="lv2-tok-punct">{trail}</span>}
                      </span>
                    );
                  })}
                </div>
              </>
            )}
            {note && <div className="lv2-tokens-note">💡 {note}</div>}
          </div>
        );
      })}
    </div>
  );
};

/**
 * Vue d'une section de la phase "Apprentissage". Affiche : titre, body,
 * diagramme de ton (si section.tone), items ou minimalPairs, astuce (tip).
 */
const LearnSectionView = ({
  section,
  language,
  lessonTitle
}: {
  section: LessonV2LearnSection;
  language: LessonV2Language;
  lessonTitle?: string;
}) => {
  const title = language === 'en' && section.titleEn ? section.titleEn : section.title;
  const body = language === 'en' && section.bodyEn ? section.bodyEn : section.body;
  const tip = language === 'en' && section.tipEn ? section.tipEn : section.tip;
  /**
   * Ouvre l'AIFloatingChat avec un prompt contextuel basé sur la leçon et la
   * section courantes. L'utilisateur peut éditer le prompt avant l'envoi.
   */
  const handleAskAi = useCallback(() => {
    const lessonContext = lessonTitle ? `« ${lessonTitle} » — ` : '';
    const prompt = language === 'en'
      ? `About the lesson ${lessonContext}section "${title}": can you explain this point in more detail and give me 2 additional examples in Chinese with pinyin and translation?`
      : `Concernant la leçon ${lessonContext}section « ${title} » : peux-tu m'expliquer ce point plus en détail et me donner 2 exemples supplémentaires en chinois avec pinyin et traduction ?`;
    window.dispatchEvent(
      new CustomEvent('xiaolearn:openAiChat', { detail: { prompt } })
    );
  }, [lessonTitle, title, language]);
  const firstItem = section.items?.[0];
  const handleTonePlay = useCallback(() => {
    if (!firstItem) return;
    playHanziAudio(firstItem.hanzi, firstItem.audio).catch(() => {});
  }, [firstItem]);
  const toneNameKey: Record<1 | 2 | 3 | 4, 'tone1Name' | 'tone2Name' | 'tone3Name' | 'tone4Name'> = {
    1: 'tone1Name',
    2: 'tone2Name',
    3: 'tone3Name',
    4: 'tone4Name'
  };
  return (
    <article className="lv2-learn-section">
      <header className="lv2-learn-section-header">
        <h3>{title}</h3>
        {section.tone && (
          <span className="lv2-learn-section-tonename">
            {getCopy(language, toneNameKey[section.tone])}
          </span>
        )}
      </header>

      {body && (
        <div className="lv2-learn-section-body">
          {body.split('\n').map((para, i) => (
            <p key={i}>
              <AutoPinyin text={para} />
            </p>
          ))}
        </div>
      )}

      {section.tone && firstItem && (
        <ToneContourSVG
          tone={section.tone}
          pinyin={firstItem.pinyin}
          hanzi={firstItem.hanzi}
          onPlay={handleTonePlay}
        />
      )}

      {section.items && section.items.length > 0 && (
        <div className="lv2-learn-items">
          {section.items.map((item, idx) => (
            <LearnItemRow key={`${item.hanzi}-${idx}`} item={item} language={language} />
          ))}
        </div>
      )}

      {section.minimalPairs && section.minimalPairs.length > 0 && (
        <div className="lv2-learn-minimal-block">
          <div className="lv2-learn-minimal-header">
            <strong>{getCopy(language, 'minimalPairsLabel')}</strong>
            <span>{getCopy(language, 'minimalPairsHint')}</span>
          </div>
          <MinimalPairsRow pairs={section.minimalPairs} language={language} />
        </div>
      )}

      {section.tokenizedSentences && section.tokenizedSentences.length > 0 && (
        <TokenizedSentencesBlock
          sentences={section.tokenizedSentences}
          language={language}
        />
      )}

      {tip && (
        <div className="lv2-learn-tip">
          <span className="lv2-learn-tip-label">💡 {getCopy(language, 'tipLabel')}</span>
          <span className="lv2-learn-tip-text">
            <AutoPinyin text={tip} />
          </span>
        </div>
      )}

      <div className="lv2-learn-ask-ai">
        <button
          type="button"
          className="lv2-learn-ask-ai-btn"
          onClick={handleAskAi}
          aria-label={
            language === 'en'
              ? 'Ask Prof. Xiao to explain this lesson'
              : "Demander à Prof. Xiao d'expliquer la leçon"
          }
        >
          <span>
            {language === 'en'
              ? 'Ask Prof. Xiao to explain the lesson'
              : "Demander à Prof. Xiao d'expliquer la leçon"}
          </span>
        </button>
      </div>
    </article>
  );
};

/**
 * Bloc dialogue intégré à une leçon.
 * Affichage compact : chaque ligne hanzi + pinyin + traduction, toggles globaux.
 * Réutilise le format `Dialogue` de lesson-structure.ts.
 */
const InlineDialogue = ({
  dialogue,
  language
}: {
  dialogue: Dialogue;
  language: LessonV2Language;
}) => {
  const [showPinyin, setShowPinyin] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);

  const title = language === 'en' && dialogue.titleEn ? dialogue.titleEn : dialogue.title;
  const context = language === 'en' && dialogue.contextEn ? dialogue.contextEn : dialogue.context;

  return (
    <div className="lv2-inline-block lv2-inline-dialogue">
      <header className="lv2-inline-header">
        <h3>💬 {getCopy(language, 'dialogueTitle')} — {title}</h3>
        <p>{context}</p>
      </header>
      <div className="lv2-inline-toggles">
        <button
          type="button"
          className={`lv2-inline-toggle ${showPinyin ? 'is-on' : ''}`}
          onClick={() => setShowPinyin((v) => !v)}
        >
          {showPinyin ? getCopy(language, 'hidePinyin') : getCopy(language, 'showPinyin')}
        </button>
        <button
          type="button"
          className={`lv2-inline-toggle ${showTranslation ? 'is-on' : ''}`}
          onClick={() => setShowTranslation((v) => !v)}
        >
          {showTranslation ? getCopy(language, 'hideTranslation') : getCopy(language, 'showTranslation')}
        </button>
      </div>
      <div className="lv2-inline-lines">
        {dialogue.lines.map((line, i) => {
          // Convention : chaque ligne de dialogue a un MP3 généré à
          // `audio/dialogues/{dialogueId}/{lineIndex}.mp3`. C'est ce que le
          // manifest.json référence et c'est ce qui existe sur disque + R2.
          // On le passe explicitement en audioUrl pour éviter que playHanziAudio
          // ne tombe sur ses conventions HSK (qui chercheraient `hsk1_<phrase
          // entière>.mp3`, fichier qui n'existe évidemment pas).
          const explicitUrl =
            line.audioUrl ?? `audio/dialogues/${dialogue.id}/${i}.mp3`;
          return (
          <div key={i} className="lv2-inline-line">
            <div className="lv2-inline-speaker">{line.speaker}</div>
            {/* Body en flex row : texte à gauche (flex:1), bouton audio à
                droite, identique au layout `.lv2-example` des Exemples. */}
            <div className="lv2-inline-body">
              <div className="lv2-inline-text">
                <div className="lv2-inline-hanzi">{line.hanzi}</div>
                {showPinyin && <div className="lv2-inline-pinyin">{line.pinyin}</div>}
                {showTranslation && (
                  <div className="lv2-inline-translation">
                    {language === 'en' ? line.translationEn : line.translationFr}
                  </div>
                )}
                {(language === 'en' ? line.noteEn : line.note) && (
                  <div className="lv2-inline-note">
                    💡 {language === 'en' ? line.noteEn ?? line.note : line.note}
                  </div>
                )}
              </div>
              {/* Bouton audio aligné sur le style des Exemples : cercle 32×32,
                  blanc/rouge, icône SpeakerLineIcon. Réutilise `lv2-example-audio`. */}
              <button
                type="button"
                className="lv2-example-audio lv2-inline-audio"
                aria-label={language === 'en' ? 'Play audio' : 'Écouter'}
                title={language === 'en' ? 'Play audio' : 'Écouter'}
                onClick={() => {
                  playHanziAudio(line.hanzi, explicitUrl).catch(() => {
                    /* silent : pas d'audio dispo pour cette réplique */
                  });
                }}
              >
                <SpeakerLineIcon size={16} />
              </button>
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
};

/**
 * Bloc lecture intégré à une leçon.
 * Affichage compact : intro + segments alignés hanzi / pinyin / traduction.
 * Réutilise le format `ReadingText` de lesson-structure.ts.
 */
const InlineReading = ({
  reading,
  language
}: {
  reading: ReadingText;
  language: LessonV2Language;
}) => {
  const [showPinyin, setShowPinyin] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);

  const title = language === 'en' && reading.titleEn ? reading.titleEn : reading.title;
  const intro = language === 'en' && reading.introEn ? reading.introEn : reading.intro;

  return (
    <div className="lv2-inline-block lv2-inline-reading">
      <header className="lv2-inline-header">
        <h3>📖 {getCopy(language, 'readingTitle')} — {title}</h3>
        <p>{intro}</p>
      </header>
      <div className="lv2-inline-toggles">
        <button
          type="button"
          className={`lv2-inline-toggle ${showPinyin ? 'is-on' : ''}`}
          onClick={() => setShowPinyin((v) => !v)}
        >
          {showPinyin ? getCopy(language, 'hidePinyin') : getCopy(language, 'showPinyin')}
        </button>
        <button
          type="button"
          className={`lv2-inline-toggle ${showTranslation ? 'is-on' : ''}`}
          onClick={() => setShowTranslation((v) => !v)}
        >
          {showTranslation ? getCopy(language, 'hideTranslation') : getCopy(language, 'showTranslation')}
        </button>
      </div>
      <div className="lv2-inline-segments">
        {reading.segments.map((seg, i) => {
          // Convention : audio/readings/{readingId}/{segmentIndex}.mp3
          // (idem dialogues mais sous /audio/readings/). On le passe en
          // explicit audioUrl pour éviter les conventions HSK sur phrase
          // entière qui 404 systématiquement.
          const explicitUrl =
            (seg as { audioUrl?: string }).audioUrl ??
            `audio/readings/${reading.id}/${i}.mp3`;
          return (
          <div key={i} className="lv2-inline-segment">
            {/* Body en flex row : texte à gauche, audio à droite — pattern
                aligné sur `.lv2-example` (cf. InlineDialogue ci-dessus). */}
            <div className="lv2-inline-body">
              <div className="lv2-inline-text">
                <div className="lv2-inline-hanzi">{seg.hanzi}</div>
                {showPinyin && <div className="lv2-inline-pinyin">{seg.pinyin}</div>}
                {showTranslation && (
                  <div className="lv2-inline-translation">
                    {language === 'en' ? seg.translationEn : seg.translationFr}
                  </div>
                )}
              </div>
              <button
                type="button"
                className="lv2-example-audio lv2-inline-audio"
                aria-label={language === 'en' ? 'Play audio' : 'Écouter'}
                title={language === 'en' ? 'Play audio' : 'Écouter'}
                onClick={() => {
                  playHanziAudio(seg.hanzi, explicitUrl).catch(() => {
                    /* silent : pas d'audio dispo pour ce segment */
                  });
                }}
              >
                <SpeakerLineIcon size={16} />
              </button>
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
};

/**
 * Mini-exercice contrôlé par le parent.
 * La validation est immédiate : pas de "retry illimité" — un exercice =
 * une tentative, on stocke la réponse pour le récap.
 *
 * V8 — Gère 6 types : mcq / fill / order / grammar-quiz / translation /
 * error-correction. Les 4 derniers sont catégorisés via `exercise.category`
 * pour afficher un badge pédagogique (Grammaire / Traduction / etc.).
 * `order` dispose d'un rendu dédié (segments mélangés à taper dans l'ordre).
 */
/**
 * Phase 3A IA — helper qui ouvre le chat IA avec un prompt contextuel
 * construit à partir d'un exercice raté. Réutilisé dans les 2 cards
 * (MultipleChoice via ExerciseCard inline, et OrderExerciseCard).
 */
function dispatchAskAiWhy(args: {
  language: LessonV2Language;
  lessonTitle: string;
  prompt: string;
  userAnswer: string;
  correctAnswer: string;
}) {
  const { language, lessonTitle, prompt, userAnswer, correctAnswer } = args;
  const lessonCtx = lessonTitle ? `« ${lessonTitle} » — ` : '';
  const text =
    language === 'en'
      ? `In the lesson ${lessonCtx}I had this exercise:\n\n"${prompt}"\n\nI answered: "${userAnswer}"\nThe correct answer was: "${correctAnswer}"\n\nCan you explain WHY my answer was wrong, in a clear and short way? If possible, give me a quick mnemonic or rule to remember it.`
      : `Dans la leçon ${lessonCtx}j'ai eu cet exercice :\n\n« ${prompt} »\n\nMa réponse : « ${userAnswer} »\nBonne réponse : « ${correctAnswer} »\n\nPeux-tu m'expliquer POURQUOI ma réponse est fausse, de manière courte et claire ? Si possible, donne-moi un mnémo ou une règle simple à retenir.`;
  window.dispatchEvent(
    new CustomEvent('xiaolearn:openAiChat', { detail: { prompt: text } })
  );
}

const ExerciseCard = ({
  exercise: rawExercise,
  language,
  answered,
  selectedIndex,
  onSelect,
  onValidate,
  onNext,
  lessonTitle
}: {
  exercise: LessonV2Exercise;
  language: LessonV2Language;
  answered: boolean;
  selectedIndex: number | null;
  onSelect: (index: number) => void;
  onValidate: () => void;
  onNext: () => void;
  lessonTitle?: string;
}) => {
  let exercise = rawExercise;
  // Rendu dédié pour le type 'dialogue-response' — affiche le mini-dialogue
  // en bulles A/B + choix de la dernière réplique.
  if (exercise.type === 'dialogue-response') {
    return (
      <DialogueResponseCard
        exercise={exercise}
        language={language}
        answered={answered}
        selectedIndex={selectedIndex}
        onSelect={onSelect}
        onValidate={onValidate}
        onNext={onNext}
        lessonTitle={lessonTitle}
      />
    );
  }
  // Rendu dédié pour le type 'context-react' — affiche la situation FR puis
  // les options de réponse en chinois.
  if (exercise.type === 'context-react') {
    return (
      <ContextReactCard
        exercise={exercise}
        language={language}
        answered={answered}
        selectedIndex={selectedIndex}
        onSelect={onSelect}
        onValidate={onValidate}
        onNext={onNext}
        lessonTitle={lessonTitle}
      />
    );
  }
  // Rendu dédié pour le type 'order' — nécessite un état local (pile de segments).
  if (exercise.type === 'order') {
    return (
      <OrderExerciseCard
        exercise={exercise}
        language={language}
        answered={answered}
        onSelect={onSelect}
        onValidate={onValidate}
        onNext={onNext}
        lessonTitle={lessonTitle}
      />
    );
  }

  // Shuffle déterministe des choices par exercise.id — audit a montré un
  // biais énorme (idx0=39%, idx3=13% sur 1667 exos 4-choix). Sans ce shuffle,
  // l'utilisateur apprend la POSITION de la bonne réponse plutôt que son
  // contenu. Skip pour 'fill' (les choices sont des blanks à insérer).
  const shuffledExercise = useMemo(() => {
    if (exercise.type === 'fill') return exercise;
    if (!exercise.choices || exercise.choices.length < 2) return exercise;
    // FNV-1a hash sur l'id pour seed PRNG stable (même exo = même shuffle)
    let seed = 0x811c9dc5;
    for (let i = 0; i < exercise.id.length; i++) {
      seed ^= exercise.id.charCodeAt(i);
      seed = Math.imul(seed, 0x01000193);
      seed >>>= 0;
    }
    const rng = () => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 0xffffffff;
    };
    // Fisher-Yates avec PRNG seedé
    const indices = exercise.choices.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    // Si par malchance le correctIndex est resté à sa position d'origine,
    // force un swap avec un autre slot pour casser le biais.
    let newCorrectIdx = indices.indexOf(exercise.correctIndex);
    if (newCorrectIdx === exercise.correctIndex && indices.length >= 2) {
      const target = (newCorrectIdx + 1) % indices.length;
      [indices[newCorrectIdx], indices[target]] = [indices[target], indices[newCorrectIdx]];
      newCorrectIdx = indices.indexOf(exercise.correctIndex);
    }
    return {
      ...exercise,
      choices: indices.map((i) => exercise.choices[i]),
      correctIndex: newCorrectIdx
    };
  }, [exercise]);

  // Remplace la référence locale par l'exercice shufflé pour TOUT le rendu.
  exercise = shuffledExercise;

  const isCorrect = answered && selectedIndex === exercise.correctIndex;

  // BUG FIX (V14) : le parent compare selectedIndex à currentExercise.correctIndex
  // ORIGINAL (non shufflé). Mais selectedIndex est l'index dans l'ordre SHUFFLÉ
  // que voit l'utilisateur. Conséquence : même quand on clique sur la bonne
  // réponse, le parent croit qu'on s'est trompé → score final faux.
  // Fix (pattern OrderExerciseCard) : avant onValidate, on remap selectedIndex
  // vers l'index de la bonne réponse dans l'ordre ORIGINAL si correct, sinon -1.
  // Le parent matche alors correctement avec rawExercise.correctIndex.
  const handleValidate = () => {
    onSelect(isCorrect ? rawExercise.correctIndex : -1);
    onValidate();
  };
  let promptText = language === 'en' && exercise.promptEn ? exercise.promptEn : exercise.prompt;
  // Pour les exercices "error-correction" : si le prompt contient les segments
  // entre guillemets (cas "Quel segment est mal placé : « X / Y / Z / W » ?"),
  // on retire la partie redondante et on ne garde QUE la question. Les segments
  // seront affichés dans un bloc dédié "Phrase mal ordonnée" plus visible.
  const errorCorrectionSegments = useMemo(() => {
    if (exercise.type !== 'error-correction') return null;
    const src = promptText || '';
    const quoted = src.match(/«\s*([^»]+?)\s*»/);
    if (!quoted) return null;
    const segments = quoted[1].split(/[/／|｜]/).map((s) => s.trim()).filter(Boolean);
    if (segments.length < 2) return null;
    return segments;
  }, [exercise.type, promptText]);
  if (errorCorrectionSegments) {
    // Retire la partie « X / Y / Z » du prompt, garde seulement la question
    promptText = promptText
      .replace(/«[^»]+»\s*[?!]?/g, '')
      .replace(/\s*:\s*$/, '')
      .replace(/\s+/g, ' ')
      .trim();
    // Si le prompt devient vide ou trivial, le remplace par une question claire
    if (!promptText || promptText.length < 6) {
      promptText = language === 'en'
        ? 'Which segment is misplaced in this jumbled sentence?'
        : 'Quel segment est mal placé dans cette phrase mal ordonnée ?';
    } else if (!/[?？]$/.test(promptText)) {
      promptText = promptText.replace(/[.。!！]$/, '') + ' ?';
    }
  }
  // Pour `fill` : on garde toujours la phrase chinoise comme support (avec `___`
  // pour permettre le remplissage). La traduction est affichée séparément, en
  // dessous, comme indice de sens.
  // Pour `mcq` et les types dérivés : bascule FR/EN classique.
  const sentenceText =
    exercise.type === 'fill'
      ? exercise.sentence
      : (language === 'en' && exercise.sentenceEn ? exercise.sentenceEn : exercise.sentence);
  // Pour les `fill`, on affiche la traduction de la phrase chinoise comme indice
  // de sens. Strictement la langue de l'utilisateur : pas de fallback FR→EN
  // (afficher de l'anglais à un user FR est plus déroutant qu'utile — mieux
  // vaut ne rien afficher si le sentenceFr manque dans la data).
  let meaningHint: string | undefined =
    exercise.type === 'fill'
      ? (language === 'en' ? exercise.sentenceEn : exercise.sentenceFr)
      : undefined;
  // Si le hint contient encore le placeholder `___` (data legacy mal nettoyée),
  // on le cache plutôt que d'afficher un mélange masqué/traduction (ex. "___! How are you?").
  if (meaningHint && /_/.test(meaningHint)) {
    meaningHint = undefined;
  }
  // Si le prompt contient déjà le hint (cas "Remets dans l'ordre : « À demain, professeur ! »"
  // + hint "À demain, professeur !"), on masque le hint redondant.
  const promptContains = (text?: string): boolean => {
    if (!text) return false;
    const norm = (s: string) => s.replace(/\s+/g, '').toLowerCase();
    return norm(promptText || '').includes(norm(text));
  };
  if (meaningHint && promptContains(meaningHint)) {
    meaningHint = undefined;
  }
  const explanationText =
    language === 'en' && exercise.explanationEn ? exercise.explanationEn : exercise.explanation;
  // Pour les types non-`fill` : si la phrase chinoise est déjà incluse dans le
  // prompt (cas "Quel mot est inapproprié dans « 您好，朋友！ »" + display
  // séparé "您好，朋友！"), on évite la duplication visuelle.
  const showSentenceText = Boolean(
    sentenceText && (exercise.type === 'fill' || !promptContains(sentenceText))
  );

  const badge = getExerciseBadge(exercise, language);

  // Audio de l'exercice : si `audio` explicite → playAudioWithFallback ;
  // sinon si `audioHanzi` → convention HSK via playHanziAudio.
  // Sinon, on auto-détecte un hanzi dans le prompt (cas typique des exercices
  // pinyin/ton du type « 来 (venir) se prononce l__ » où l'apprenant doit
  // deviner le ton mais n'a aucun moyen de l'entendre sans audio).
  const autoHanziFromPrompt = useMemo(() => {
    if (exercise.audio || exercise.audioHanzi) return null;
    const prompt = exercise.prompt || '';
    // Priorité : extraire la phrase chinoise entre guillemets français « ... »
    // (cas "Traduis en français : « 晚安，明天见！ »" — on veut lire la phrase
    // ENTIÈRE, pas seulement le premier hanzi run qui s'arrête à la ponctuation
    // chinoise comme 「，」).
    const quoted = prompt.match(/«\s*([^»]+?)\s*»/);
    const source = quoted ? quoted[1] : prompt;
    // Si le source contient des séparateurs `/` ou `|` entre hanzi (typique
    // des exercices "Trouver l'erreur" : « 我 / 是 / 叫 / 小明 »), ce n'est
    // PAS une phrase prononçable — on n'affiche pas de bouton audio.
    if (/[\/／|｜]/.test(source)) return null;
    // Concatène tous les runs de hanzi du source (sans la ponctuation chinoise,
    // qui ne fait pas partie des noms de fichiers audio).
    const allHanzi = source.match(/[㐀-鿿]+/g);
    if (!allHanzi || allHanzi.length === 0) return null;
    return allHanzi.join('');
  }, [exercise.audio, exercise.audioHanzi, exercise.prompt]);
  const resolvedAudioHanzi = exercise.audioHanzi || autoHanziFromPrompt;
  const hasAudio = Boolean(exercise.audio || resolvedAudioHanzi);
  const playExerciseAudio = useCallback(() => {
    if (resolvedAudioHanzi) {
      playHanziAudio(resolvedAudioHanzi, exercise.audio).catch(() => {});
      return;
    }
    if (exercise.audio) {
      playAudioWithFallback(exercise.audio).catch(() => {});
    }
  }, [exercise.audio, resolvedAudioHanzi]);

  useEffect(() => {
    // Auto-play à l'apparition de l'exercice uniquement si demandé, et seulement
    // avant que l'utilisateur ait répondu (on ne rejoue pas après validation).
    if (!exercise.autoPlay || answered || !hasAudio) return;
    const timer = setTimeout(() => playExerciseAudio(), 180);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exercise.id]);

  return (
    <div className="lv2-exercise">
      {badge && <div className={`lv2-exercise-badge lv2-exercise-badge--${badge.kind}`}>{badge.label}</div>}
      {hasAudio && (
        <button
          type="button"
          className="lv2-exercise-audio-btn"
          onClick={playExerciseAudio}
          aria-label={getCopy(language, 'playAudio')}
        >
          <span className="lv2-exercise-audio-icon" aria-hidden="true">🔊</span>
          <span className="lv2-exercise-audio-label">{getCopy(language, 'listen')}</span>
        </button>
      )}
      {errorCorrectionSegments && (
        <div className="lv2-exercise-jumbled">
          <div className="lv2-exercise-jumbled-label">
            {language === 'en' ? '❌ Sentence to fix' : '❌ Phrase à corriger'}
          </div>
          <div className="lv2-exercise-jumbled-chips">
            {errorCorrectionSegments.map((seg, i) => (
              <span key={i} className="lv2-exercise-jumbled-chip">
                <span className="lv2-exercise-jumbled-pos">{i + 1}</span>
                <span className="lv2-exercise-jumbled-text">{seg}</span>
              </span>
            ))}
          </div>
          {/* Affiche la traduction française cible pour lever l'ambiguïté
              (sans la traduction, des phrases comme 我去到学校 peuvent vouloir
              dire « je vais à l'école » → 到 en trop, OU « je suis arrivé à
              l'école » → 去 en trop. Avec la trad le user sait quel mot est
              en trop). */}
          {(language === 'en'
            ? exercise.sentenceEn
            : exercise.sentenceFr ?? exercise.sentenceEn) && (
            <div className="lv2-exercise-jumbled-target">
              <span className="lv2-jumbled-target-label">
                {language === 'en' ? '🎯 Target meaning:' : '🎯 Sens visé :'}
              </span>{' '}
              <span className="lv2-jumbled-target-text">
                {language === 'en'
                  ? exercise.sentenceEn
                  : exercise.sentenceFr ?? exercise.sentenceEn}
              </span>
            </div>
          )}
        </div>
      )}
      <div className="lv2-exercise-prompt">{promptText}</div>

      {showSentenceText && sentenceText && !errorCorrectionSegments && (
        <div className="lv2-exercise-sentence">
          {exercise.type === 'fill'
            ? renderFillSentence(sentenceText, answered, selectedIndex, exercise.choices, exercise.correctIndex)
            : sentenceText}
        </div>
      )}

      {meaningHint && (
        <div className="lv2-exercise-meaning">
          <span className="lv2-meaning-label">💡 {getCopy(language, 'meaningLabel')} :</span>{' '}
          <span className="lv2-meaning-text">{meaningHint}</span>
        </div>
      )}

      <div className="lv2-exercise-choices" role="radiogroup">
        {exercise.choices.map((choice, idx) => {
          let stateClass = '';
          if (answered) {
            if (idx === exercise.correctIndex) stateClass = 'lv2-choice--correct';
            else if (idx === selectedIndex) stateClass = 'lv2-choice--wrong';
            else stateClass = 'lv2-choice--dimmed';
          } else if (idx === selectedIndex) {
            stateClass = 'lv2-choice--selected';
          }
          return (
            <button
              key={idx}
              type="button"
              role="radio"
              aria-checked={idx === selectedIndex}
              className={`lv2-choice ${stateClass}`}
              disabled={answered}
              onClick={() => onSelect(idx)}
            >
              {choice}
            </button>
          );
        })}
      </div>

      <div className="lv2-exercise-actions">
        {!answered ? (
          <button
            type="button"
            className="lv2-btn lv2-btn--primary"
            disabled={selectedIndex === null}
            onClick={handleValidate}
          >
            {getCopy(language, 'check')}
          </button>
        ) : (
          <button type="button" className="lv2-btn lv2-btn--primary" onClick={onNext}>
            {getCopy(language, 'next')} →
          </button>
        )}
      </div>

      {answered && (
        <div className={`lv2-exercise-feedback ${isCorrect ? 'is-correct' : 'is-wrong'}`}>
          <div className="lv2-feedback-headline">
            {isCorrect ? getCopy(language, 'correct') : getCopy(language, 'incorrect')}
          </div>
          {!isCorrect && selectedIndex !== null && selectedIndex >= 0 && (
            <div className="lv2-feedback-line">
              <strong>{getCopy(language, 'yourAnswer')}</strong> {exercise.choices[selectedIndex]}
            </div>
          )}
          {!isCorrect && (
            <div className="lv2-feedback-line">
              <strong>{getCopy(language, 'correctAnswer')}</strong>{' '}
              {exercise.choices[exercise.correctIndex]}
            </div>
          )}
          {explanationText && (
            <div className="lv2-feedback-explanation">
              <AutoPinyin text={explanationText} />
            </div>
          )}
          {!isCorrect && lessonTitle && (
            <button
              type="button"
              className="lv2-ask-ai-why-btn"
              onClick={() =>
                dispatchAskAiWhy({
                  language,
                  lessonTitle,
                  prompt: promptText,
                  userAnswer:
                    selectedIndex !== null && selectedIndex >= 0
                      ? exercise.choices[selectedIndex]
                      : '(aucune réponse)',
                  correctAnswer: exercise.choices[exercise.correctIndex]
                })
              }
            >
              {language === 'en' ? 'Ask Prof. Xiao: why?' : 'Demander à Prof. Xiao : pourquoi ?'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
//  DialogueResponseCard — rendu dédié au type 'dialogue-response'
// ---------------------------------------------------------------------------
// `exercise.dialogue` contient les répliques du mini-dialogue. La dernière
// est masquée (rendue en pointillé) et l'apprenant doit choisir parmi
// `choices` celle qui correspond au contexte. Style chat avec bulles A/B
// alternées, audio par bulle si dispo.
// ---------------------------------------------------------------------------
const DialogueResponseCard = ({
  exercise,
  language,
  answered,
  selectedIndex,
  onSelect,
  onValidate,
  onNext,
  lessonTitle
}: {
  exercise: LessonV2Exercise;
  language: LessonV2Language;
  answered: boolean;
  selectedIndex: number | null;
  onSelect: (index: number) => void;
  onValidate: () => void;
  onNext: () => void;
  lessonTitle?: string;
}) => {
  const lines = exercise.dialogue ?? [];
  // Toutes les répliques sauf la dernière sont affichées en clair.
  // La dernière est rendue comme placeholder (bulle pointillée) avant
  // réponse, puis remplie au choix.
  const beforeLast = lines.slice(0, -1);
  const lastLine = lines[lines.length - 1];

  const promptText = language === 'en' && exercise.promptEn ? exercise.promptEn : exercise.prompt;
  const explanationText =
    language === 'en' && exercise.explanationEn ? exercise.explanationEn : exercise.explanation;
  const isCorrect = answered && selectedIndex === exercise.correctIndex;

  const playLine = useCallback((line: DialogueLine) => {
    if (line.audio) {
      playAudioWithFallback(line.audio).catch(() => {});
      return;
    }
    if (line.hanzi) {
      playHanziAudio(line.hanzi).catch(() => {});
    }
  }, []);

  return (
    <div className="lv2-exercise lv2-exercise--dialogue">
      <div className="lv2-exercise-badge lv2-exercise-badge--dialogue">
        {language === 'en' ? 'Dialogue' : 'Dialogue'}
      </div>
      <div className="lv2-exercise-prompt">{promptText}</div>

      <div className="lv2-dialogue-chat">
        {beforeLast.map((line, i) => (
          <div
            key={`line-${i}`}
            className={`lv2-dialogue-bubble ${line.isUser ? 'lv2-dialogue-bubble--user' : 'lv2-dialogue-bubble--other'}`}
          >
            <div className="lv2-dialogue-speaker">
              {language === 'en' && line.speakerEn ? line.speakerEn : line.speaker}
            </div>
            <div className="lv2-dialogue-content">
              <div className="lv2-dialogue-hanzi">
                {line.hanzi}
                {line.audio || line.hanzi ? (
                  <button
                    type="button"
                    className="lv2-dialogue-audio"
                    onClick={() => playLine(line)}
                    aria-label="Play"
                  >
                    🔊
                  </button>
                ) : null}
              </div>
              {line.pinyin && (
                <div className="lv2-dialogue-pinyin">{line.pinyin}</div>
              )}
              {(language === 'en'
                ? line.translationEn ?? line.translationFr
                : line.translationFr ?? line.translationEn) && (
                <div className="lv2-dialogue-trad">
                  {language === 'en'
                    ? line.translationEn ?? line.translationFr
                    : line.translationFr ?? line.translationEn}
                </div>
              )}
            </div>
          </div>
        ))}
        {/* Bulle de la dernière réplique (à-trouver) */}
        {lastLine && (
          <div
            className={`lv2-dialogue-bubble lv2-dialogue-bubble--placeholder ${lastLine.isUser ? 'lv2-dialogue-bubble--user' : 'lv2-dialogue-bubble--other'} ${answered ? (isCorrect ? 'is-correct' : 'is-wrong') : ''}`}
          >
            <div className="lv2-dialogue-speaker">
              {language === 'en' && lastLine.speakerEn ? lastLine.speakerEn : lastLine.speaker}
            </div>
            <div className="lv2-dialogue-content">
              {answered ? (
                <div className="lv2-dialogue-hanzi">
                  {exercise.choices[exercise.correctIndex]}
                </div>
              ) : (
                <div className="lv2-dialogue-hanzi lv2-dialogue-hanzi--ghost">
                  {language === 'en' ? '(your turn)' : '(à toi)'}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="lv2-exercise-choices" role="radiogroup">
        {exercise.choices.map((choice, idx) => {
          let stateClass = '';
          if (answered) {
            if (idx === exercise.correctIndex) stateClass = 'lv2-choice--correct';
            else if (idx === selectedIndex) stateClass = 'lv2-choice--wrong';
            else stateClass = 'lv2-choice--dimmed';
          } else if (idx === selectedIndex) {
            stateClass = 'lv2-choice--selected';
          }
          return (
            <button
              key={idx}
              type="button"
              className={`lv2-choice ${stateClass}`}
              disabled={answered}
              onClick={() => onSelect(idx)}
            >
              {choice}
            </button>
          );
        })}
      </div>

      <div className="lv2-exercise-actions">
        {!answered ? (
          <button
            type="button"
            className="lv2-btn lv2-btn--primary"
            disabled={selectedIndex === null}
            onClick={onValidate}
          >
            {getCopy(language, 'check')}
          </button>
        ) : (
          <button type="button" className="lv2-btn lv2-btn--primary" onClick={onNext}>
            {getCopy(language, 'next')} →
          </button>
        )}
      </div>

      {answered && (
        <div className={`lv2-exercise-feedback ${isCorrect ? 'is-correct' : 'is-wrong'}`}>
          <div className="lv2-feedback-headline">
            {isCorrect ? getCopy(language, 'correct') : getCopy(language, 'incorrect')}
          </div>
          {explanationText && (
            <div className="lv2-feedback-explanation">
              <AutoPinyin text={explanationText} />
            </div>
          )}
          {!isCorrect && lessonTitle && (
            <button
              type="button"
              className="lv2-ask-ai-btn"
              onClick={() =>
                dispatchAskAiWhy({
                  language,
                  lessonTitle,
                  prompt: promptText || '',
                  userAnswer: selectedIndex !== null ? exercise.choices[selectedIndex] : '',
                  correctAnswer: exercise.choices[exercise.correctIndex]
                })
              }
            >
              {language === 'en' ? 'Ask Prof. Xiao: why?' : 'Demander à Prof. Xiao : pourquoi ?'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
//  ContextReactCard — rendu dédié au type 'context-react'
// ---------------------------------------------------------------------------
// Le contexte est décrit en FR ("Tu entres dans un taxi…"), l'apprenant
// choisit la phrase appropriée parmi `choices`. Plus simple qu'un dialogue,
// utile pour des exercices courts qui testent une expression précise.
// ---------------------------------------------------------------------------
const ContextReactCard = ({
  exercise,
  language,
  answered,
  selectedIndex,
  onSelect,
  onValidate,
  onNext,
  lessonTitle
}: {
  exercise: LessonV2Exercise;
  language: LessonV2Language;
  answered: boolean;
  selectedIndex: number | null;
  onSelect: (index: number) => void;
  onValidate: () => void;
  onNext: () => void;
  lessonTitle?: string;
}) => {
  const promptText = language === 'en' && exercise.promptEn ? exercise.promptEn : exercise.prompt;
  const contextText =
    language === 'en' ? exercise.contextEn ?? exercise.context : exercise.context ?? exercise.contextEn;
  const explanationText =
    language === 'en' && exercise.explanationEn ? exercise.explanationEn : exercise.explanation;
  const isCorrect = answered && selectedIndex === exercise.correctIndex;

  return (
    <div className="lv2-exercise lv2-exercise--context">
      <div className="lv2-exercise-badge lv2-exercise-badge--context">
        {language === 'en' ? 'Situation' : 'Situation'}
      </div>
      {contextText && (
        <div className="lv2-context-card">
          <span className="lv2-context-icon" aria-hidden>🎬</span>
          <span className="lv2-context-text">{contextText}</span>
        </div>
      )}
      <div className="lv2-exercise-prompt">{promptText}</div>

      <div className="lv2-exercise-choices" role="radiogroup">
        {exercise.choices.map((choice, idx) => {
          let stateClass = '';
          if (answered) {
            if (idx === exercise.correctIndex) stateClass = 'lv2-choice--correct';
            else if (idx === selectedIndex) stateClass = 'lv2-choice--wrong';
            else stateClass = 'lv2-choice--dimmed';
          } else if (idx === selectedIndex) {
            stateClass = 'lv2-choice--selected';
          }
          return (
            <button
              key={idx}
              type="button"
              className={`lv2-choice ${stateClass}`}
              disabled={answered}
              onClick={() => onSelect(idx)}
            >
              {choice}
            </button>
          );
        })}
      </div>

      <div className="lv2-exercise-actions">
        {!answered ? (
          <button
            type="button"
            className="lv2-btn lv2-btn--primary"
            disabled={selectedIndex === null}
            onClick={onValidate}
          >
            {getCopy(language, 'check')}
          </button>
        ) : (
          <button type="button" className="lv2-btn lv2-btn--primary" onClick={onNext}>
            {getCopy(language, 'next')} →
          </button>
        )}
      </div>

      {answered && (
        <div className={`lv2-exercise-feedback ${isCorrect ? 'is-correct' : 'is-wrong'}`}>
          <div className="lv2-feedback-headline">
            {isCorrect ? getCopy(language, 'correct') : getCopy(language, 'incorrect')}
          </div>
          {explanationText && (
            <div className="lv2-feedback-explanation">
              <AutoPinyin text={explanationText} />
            </div>
          )}
          {!isCorrect && lessonTitle && (
            <button
              type="button"
              className="lv2-ask-ai-btn"
              onClick={() =>
                dispatchAskAiWhy({
                  language,
                  lessonTitle,
                  prompt: promptText || '',
                  userAnswer: selectedIndex !== null ? exercise.choices[selectedIndex] : '',
                  correctAnswer: exercise.choices[exercise.correctIndex]
                })
              }
            >
              {language === 'en' ? 'Ask Prof. Xiao: why?' : 'Demander à Prof. Xiao : pourquoi ?'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
//  OrderExerciseCard — rendu dédié au type 'order'
// ---------------------------------------------------------------------------
// `exercise.choices` contient les segments dans l'ORDRE CORRECT. L'UI les
// mélange à l'affichage et propose à l'utilisateur de les taper dans l'ordre
// (clic = ajouter au haut ; reclic = retirer). Une fois tous placés, le
// bouton "Vérifier" s'active. La validation compare l'ordre tapé à
// l'ordre canonique des `choices`.
// ---------------------------------------------------------------------------
const OrderExerciseCard = ({
  exercise,
  language,
  answered,
  onSelect,
  onValidate,
  onNext,
  lessonTitle
}: {
  exercise: LessonV2Exercise;
  language: LessonV2Language;
  answered: boolean;
  onSelect: (index: number) => void;
  onValidate: () => void;
  onNext: () => void;
  lessonTitle?: string;
}) => {
  // Ordre mélangé, fixé une fois par exercice.id.
  const shuffledIndices = useMemo(() => {
    const indices = exercise.choices.map((_, i) => i);
    // Fisher-Yates pseudo-random seedé par exercise.id (stabilité entre renders).
    let seed = 0;
    for (let i = 0; i < exercise.id.length; i++) seed = (seed * 31 + exercise.id.charCodeAt(i)) >>> 0;
    const rng = () => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 0xffffffff;
    };
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    // Si par hasard l'ordre mélangé est identique à l'ordre correct, on
    // permute les deux premiers éléments pour forcer un "puzzle".
    const isIdentity = indices.every((v, i) => v === i);
    if (isIdentity && indices.length >= 2) {
      [indices[0], indices[1]] = [indices[1], indices[0]];
    }
    return indices;
  }, [exercise.id, exercise.choices.length]);

  // Indices (dans l'ordre des choix originaux) sélectionnés par l'utilisateur.
  const [picked, setPicked] = useState<number[]>([]);

  // Reset local quand l'exercice change.
  useEffect(() => {
    setPicked([]);
  }, [exercise.id]);

  const promptText = language === 'en' && exercise.promptEn ? exercise.promptEn : exercise.prompt;
  let hintText: string | undefined =
    language === 'en' && exercise.sentenceEn ? exercise.sentenceEn : exercise.sentence;
  // Si le prompt contient déjà le sens (cas "Ordonne : « Désolé de te déranger. »"
  // + hint "Désolé de te déranger."), on masque le label "Sens :" redondant.
  // Même logique que pour les exercices `fill`.
  if (hintText) {
    const norm = (s: string) => s.replace(/[\s«».,!?:;'""']/g, '').toLowerCase();
    if (norm(promptText || '').includes(norm(hintText))) {
      hintText = undefined;
    }
  }
  const explanationText =
    language === 'en' && exercise.explanationEn ? exercise.explanationEn : exercise.explanation;
  const isComplete = picked.length === exercise.choices.length;
  // Validation par CHAÎNE rendue (pas par indices) — sinon les exercices avec
  // segments dupliqués (ex: 九十九 où choices = ['九','十','九'], indices 0 et 2
  // visuellement identiques) marquent faux dès que l'utilisateur clique sur le
  // « mauvais » 九 du pool mélangé, alors que sa réponse est visuellement
  // correcte. En comparant les chaînes rendues, n'importe quelle permutation
  // d'indices produisant le même résultat affiché est acceptée.
  const correctAnswerStr = exercise.choices.join('');
  const userAnswerStr = picked.map((i) => exercise.choices[i]).join('');
  const isCorrect = isComplete && userAnswerStr === correctAnswerStr;

  const togglePick = useCallback(
    (origIdx: number) => {
      if (answered) return;
      setPicked((prev) => {
        if (prev.includes(origIdx)) {
          return prev.filter((p) => p !== origIdx);
        }
        return [...prev, origIdx];
      });
    },
    [answered]
  );

  const handleValidate = () => {
    // Communique au parent via onSelect : 0 = correct (== correctIndex), -1 = wrong.
    onSelect(isCorrect ? exercise.correctIndex : -1);
    onValidate();
  };

  return (
    <div className="lv2-exercise lv2-exercise--order">
      <div className="lv2-exercise-badge lv2-exercise-badge--order">
        {language === 'en' ? 'Reorder' : 'Remise dans l\u2019ordre'}
      </div>
      <div className="lv2-exercise-prompt">{promptText}</div>

      {hintText && (
        <div className="lv2-exercise-meaning">
          <span className="lv2-meaning-label">💡 {getCopy(language, 'meaningLabel')} :</span>{' '}
          <span className="lv2-meaning-text">{hintText}</span>
        </div>
      )}

      {/* Slot : phrase construite par l'utilisateur. */}
      <div className="lv2-order-slot">
        {picked.length === 0 ? (
          <span className="lv2-order-slot-placeholder">
            {language === 'en' ? 'Tap the segments in order…' : 'Tapez les segments dans l\u2019ordre\u2026'}
          </span>
        ) : (
          picked.map((origIdx, pos) => (
            <button
              key={`picked-${pos}-${origIdx}`}
              type="button"
              className="lv2-order-chip lv2-order-chip--picked"
              disabled={answered}
              onClick={() => togglePick(origIdx)}
            >
              {exercise.choices[origIdx]}
            </button>
          ))
        )}
      </div>

      {/* Pool : segments mélangés non encore utilisés. */}
      <div className="lv2-order-pool">
        {shuffledIndices
          .filter((origIdx) => !picked.includes(origIdx))
          .map((origIdx) => (
            <button
              key={`pool-${origIdx}`}
              type="button"
              className="lv2-order-chip lv2-order-chip--pool"
              disabled={answered}
              onClick={() => togglePick(origIdx)}
            >
              {exercise.choices[origIdx]}
            </button>
          ))}
      </div>

      <div className="lv2-exercise-actions">
        {!answered ? (
          <button
            type="button"
            className="lv2-btn lv2-btn--primary"
            disabled={!isComplete}
            onClick={handleValidate}
          >
            {getCopy(language, 'check')}
          </button>
        ) : (
          <button type="button" className="lv2-btn lv2-btn--primary" onClick={onNext}>
            {getCopy(language, 'next')} →
          </button>
        )}
      </div>

      {answered && (
        <div className={`lv2-exercise-feedback ${isCorrect ? 'is-correct' : 'is-wrong'}`}>
          <div className="lv2-feedback-headline">
            {isCorrect ? getCopy(language, 'correct') : getCopy(language, 'incorrect')}
          </div>
          {!isCorrect && (
            <>
              <div className="lv2-feedback-line">
                <strong>{getCopy(language, 'yourAnswer')}</strong>{' '}
                {picked.map((i) => exercise.choices[i]).join(' ')}
              </div>
              <div className="lv2-feedback-line">
                <strong>{getCopy(language, 'correctAnswer')}</strong> {exercise.choices.join(' ')}
              </div>
            </>
          )}
          {explanationText && (
            <div className="lv2-feedback-explanation">
              <AutoPinyin text={explanationText} />
            </div>
          )}
          {!isCorrect && lessonTitle && (
            <button
              type="button"
              className="lv2-ask-ai-why-btn"
              onClick={() =>
                dispatchAskAiWhy({
                  language,
                  lessonTitle,
                  prompt: promptText,
                  userAnswer: picked.map((i) => exercise.choices[i]).join(' '),
                  correctAnswer: exercise.choices.join(' ')
                })
              }
            >
              {language === 'en' ? 'Ask Prof. Xiao: why?' : 'Demander à Prof. Xiao : pourquoi ?'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// Badge pédagogique affiché au-dessus du prompt selon le type/category.
function getExerciseBadge(
  exercise: LessonV2Exercise,
  language: LessonV2Language
): { label: string; kind: string } | null {
  const labels: Record<string, { fr: string; en: string }> = {
    'grammar-quiz': { fr: 'Grammaire', en: 'Grammar' },
    translation: { fr: 'Traduction', en: 'Translation' },
    'error-correction': { fr: 'Trouver l\u2019erreur', en: 'Find the error' }
  };
  const entry = labels[exercise.type];
  if (!entry) return null;
  return {
    label: language === 'en' ? entry.en : entry.fr,
    kind: exercise.type
  };
}

/**
 * Pour un `fill`, remplace le placeholder `___` par :
 *   - un trou stylé tant qu'on n'a pas répondu
 *   - la réponse choisie, colorée selon correct/wrong, une fois répondu
 */
function renderFillSentence(
  sentence: string,
  answered: boolean,
  selectedIndex: number | null,
  choices: string[],
  correctIndex: number
): ReactNode {
  const parts = sentence.split('___');
  if (parts.length === 1) return sentence;

  const filler: ReactNode = (() => {
    if (!answered || selectedIndex === null) {
      return <span className="lv2-fill-blank">___</span>;
    }
    const ok = selectedIndex === correctIndex;
    return (
      <span className={`lv2-fill-filled ${ok ? 'is-correct' : 'is-wrong'}`}>
        {choices[selectedIndex]}
      </span>
    );
  })();

  return parts.map((chunk, idx) => (
    <span key={idx}>
      {chunk}
      {idx < parts.length - 1 && filler}
    </span>
  ));
}

// ============================================================================
//  COMPOSANT PRINCIPAL
// ============================================================================

const StructuredLessonPageV2 = (props: StructuredLessonPageV2Props) => {
  const {
    lesson,
    language = 'fr',
    nextLesson = null,
    userDisplayName,
    onComplete,
    onOpenNextLesson,
    onBack,
    onPlayAudio
  } = props;

  const [step, setStep] = useState<StepKey>('intro');
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  /** Historique des réponses : { exerciseId: { chosen, correct } } */
  const [answers, setAnswers] = useState<Record<string, { chosen: number; correct: boolean }>>({});
  const [completionFired, setCompletionFired] = useState(false);
  /** Section courante dans la phase "learn". */
  const [learnSectionIndex, setLearnSectionIndex] = useState(0);
  /** Timestamps pour calcul du temps passé sur la leçon. */
  const [startedAt, setStartedAt] = useState<number>(() => Date.now());
  const [completedAt, setCompletedAt] = useState<number | null>(null);
  /** Toggle de la liste détaillée des questions ratées sur l'écran récap. */
  const [showMistakes, setShowMistakes] = useState(false);

  const xpReward = lesson.xpReward ?? 50;
  const total = lesson.exercises.length;
  const currentExercise = lesson.exercises[exerciseIndex];
  const correctCount = useMemo(
    () => Object.values(answers).filter((a) => a.correct).length,
    [answers]
  );

  const hasLearn = (lesson.learnSections?.length ?? 0) > 0;
  const stepOrder = useMemo<StepKey[]>(() => buildStepOrder(hasLearn), [hasLearn]);

  // Reset interne si on change de leçon côté parent (même composant monté).
  useEffect(() => {
    setStep('intro');
    setExerciseIndex(0);
    setSelectedIndex(null);
    setAnswered(false);
    setAnswers({});
    setCompletionFired(false);
    setLearnSectionIndex(0);
    setStartedAt(Date.now());
    setCompletedAt(null);
    setShowMistakes(false);
  }, [lesson.id]);

  // Notify parent at entry into summary (XP + correctCount + total).
  useEffect(() => {
    if (step === 'summary' && !completionFired) {
      setCompletionFired(true);
      setCompletedAt(Date.now());
      onComplete?.({ lessonId: lesson.id, xpGained: xpReward, correctCount, total });
    }
  }, [step, completionFired, onComplete, lesson.id, xpReward, correctCount, total]);

  const goStep = useCallback((target: StepKey) => setStep(target), []);

  const handleValidate = useCallback(() => {
    if (!currentExercise || selectedIndex === null) return;
    const correct = selectedIndex === currentExercise.correctIndex;
    setAnswers((prev) => ({
      ...prev,
      [currentExercise.id]: { chosen: selectedIndex, correct }
    }));
    setAnswered(true);
  }, [currentExercise, selectedIndex]);

  const handleNextExercise = useCallback(() => {
    if (exerciseIndex < total - 1) {
      setExerciseIndex((i) => i + 1);
      setSelectedIndex(null);
      setAnswered(false);
    } else {
      setStep('summary');
    }
  }, [exerciseIndex, total]);

  const objectives =
    language === 'en' && lesson.objectivesEn ? lesson.objectivesEn : lesson.objectives;
  const takeaways =
    language === 'en' && lesson.keyTakeawaysEn ? lesson.keyTakeawaysEn : lesson.keyTakeaways;
  const title = language === 'en' && lesson.titleEn ? lesson.titleEn : lesson.title;
  const subtitle = language === 'en' && lesson.subtitleEn ? lesson.subtitleEn : lesson.subtitle;

  const categoryMeta = lesson.category ? CATEGORY_LABELS[lesson.category] : null;

  // Payload pour le bouton "Télécharger hors-ligne" : collecte tous les hanzi
  // de la leçon (examples, dialogue, tokens grammaticaux) + les URLs explicites
  // de dialogue/example/audio:. Le hook précachera chaque audio résolu.
  const offlinePayload = useMemo(() => {
    const hanziList: string[] = [];
    const explicitAudioUrls: string[] = [];
    for (const ex of lesson.examples ?? []) {
      if (ex.hanzi) hanziList.push(ex.hanzi);
      if (ex.audio) explicitAudioUrls.push(ex.audio);
    }
    if (lesson.dialogue?.lines) {
      for (const line of lesson.dialogue.lines) {
        if (line.hanzi) hanziList.push(line.hanzi);
        if (line.audioUrl) explicitAudioUrls.push(line.audioUrl);
      }
    }
    for (const section of lesson.learnSections ?? []) {
      for (const ts of section.tokenizedSentences ?? []) {
        const joined = (ts.zh ?? [])
          .map((t) => t.text || '')
          .join('');
        if (joined) hanziList.push(joined);
      }
    }
    return { id: lesson.id, hanziList, explicitAudioUrls };
  }, [lesson]);

  // --------------------------------------------------------------------------
  //  RENDUS PAR ÉTAPE
  // --------------------------------------------------------------------------

  const renderIntro = () => (
    <section className="lv2-section lv2-section--intro">
      <div className="lv2-intro-meta">
        <HskBadge level={lesson.level} />
        {categoryMeta && (
          <span className="lv2-intro-category">
            <span aria-hidden>{categoryMeta.icon}</span> {categoryMeta[language]}
          </span>
        )}
        {lesson.estimatedMinutes && (
          <span className="lv2-intro-chip">
            ⏱ {lesson.estimatedMinutes} {getCopy(language, 'minutes')}
          </span>
        )}
        <span className="lv2-intro-chip lv2-intro-chip--xp">
          +{xpReward} {getCopy(language, 'xp')}
        </span>
      </div>

      <h1 className="lv2-intro-title">{title}</h1>
      {subtitle && <p className="lv2-intro-subtitle">{subtitle}</p>}

      <div className="lv2-intro-objectives">
        <h3>{getCopy(language, 'objectives')}</h3>
        <ul>
          {objectives.map((obj) => (
            <li key={obj}>{obj}</li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        className="lv2-btn lv2-btn--primary lv2-btn--lg"
        onClick={() => goStep(stepOrder[1] ?? 'examples')}
      >
        {getCopy(language, 'continue')} →
      </button>
    </section>
  );

  const renderLearn = () => {
    const sections = lesson.learnSections ?? [];
    if (sections.length === 0) {
      // Defensive — ne devrait jamais arriver (on skip la phase).
      goStep('examples');
      return null;
    }
    const safeIndex = Math.max(0, Math.min(learnSectionIndex, sections.length - 1));
    const section = sections[safeIndex];
    const isFirst = safeIndex === 0;
    const isLast = safeIndex === sections.length - 1;
    return (
      <section className="lv2-section lv2-section--learn">
        <header className="lv2-section-header">
          <h2>{getCopy(language, 'stepLearn')}</h2>
          <p>
            {getCopy(language, 'learnSectionCounter')} {safeIndex + 1} / {sections.length}
            {' — '}
            {getCopy(language, 'learnHint')}
          </p>
        </header>
        <LearnSectionView section={section} language={language} lessonTitle={title} />
        <div className="lv2-section-actions">
          <button
            type="button"
            className="lv2-btn lv2-btn--ghost"
            onClick={() => {
              if (isFirst) {
                goStep('intro');
              } else {
                setLearnSectionIndex((i) => Math.max(0, i - 1));
              }
            }}
          >
            {isFirst ? getCopy(language, 'back') : getCopy(language, 'prevSection')}
          </button>
          <button
            type="button"
            className="lv2-btn lv2-btn--primary"
            onClick={() => {
              if (isLast) {
                goStep('examples');
              } else {
                setLearnSectionIndex((i) => i + 1);
              }
            }}
          >
            {isLast ? getCopy(language, 'toContinue') : getCopy(language, 'nextSection')}
          </button>
        </div>
      </section>
    );
  };

  const renderExamples = () => {
    // Filet de sécurité : dédoublonnage par hanzi. Certaines leçons ont des
    // entrées exactement répétées dans `examples` (typo de saisie), ce qui
    // produit deux cards identiques dans la vue "Exemples clés". On garde la
    // première occurrence (ordre original préservé). Voir scripts/audit-
    // lesson-examples-duplicates.mts pour la liste des doublons connus.
    const uniqueExamples: LessonV2Example[] = [];
    const seen = new Set<string>();
    for (const ex of lesson.examples) {
      const key = ex.hanzi.trim();
      if (seen.has(key)) continue;
      seen.add(key);
      uniqueExamples.push(ex);
    }
    return (
    <section className="lv2-section lv2-section--examples">
      <header className="lv2-section-header">
        <h2>{getCopy(language, 'examplesTitle')}</h2>
        <p>{getCopy(language, 'examplesHint')}</p>
      </header>
      <div className="lv2-examples-list">
        {uniqueExamples.map((ex, idx) => (
          <ExampleRow key={idx} example={ex} language={language} onPlay={onPlayAudio} />
        ))}
      </div>
      {lesson.dialogue && <InlineDialogue dialogue={lesson.dialogue} language={language} />}
      {lesson.reading && <InlineReading reading={lesson.reading} language={language} />}
      <div className="lv2-section-actions">
        <button
          type="button"
          className="lv2-btn lv2-btn--ghost"
          onClick={() => {
            if (hasLearn) {
              setLearnSectionIndex((lesson.learnSections?.length ?? 1) - 1);
              goStep('learn');
            } else {
              goStep('intro');
            }
          }}
        >
          {getCopy(language, 'back')}
        </button>
        <button
          type="button"
          className="lv2-btn lv2-btn--primary"
          onClick={() => goStep('practice')}
        >
          {getCopy(language, 'continue')} →
        </button>
      </div>
    </section>
    );
  };

  const renderPractice = () => {
    if (!currentExercise) {
      // Leçon sans exercices → on saute au récap.
      return (
        <section className="lv2-section lv2-section--practice">
          <p>{getCopy(language, 'practiceHint')}</p>
          <button
            type="button"
            className="lv2-btn lv2-btn--primary"
            onClick={() => goStep('summary')}
          >
            {getCopy(language, 'continue')} →
          </button>
        </section>
      );
    }
    return (
      <section className="lv2-section lv2-section--practice">
        <header className="lv2-section-header">
          <h2>{getCopy(language, 'practiceTitle')}</h2>
          <p>
            {getCopy(language, 'stepCounter')} {exerciseIndex + 1} / {total}
          </p>
        </header>
        <ExerciseCard
          exercise={currentExercise}
          language={language}
          answered={answered}
          selectedIndex={selectedIndex}
          onSelect={(idx) => {
            if (answered) return;
            setSelectedIndex(idx);
          }}
          onValidate={handleValidate}
          onNext={handleNextExercise}
          lessonTitle={title}
        />
      </section>
    );
  };

  const renderSummary = () => {
    const displayName = userDisplayName ? `, ${userDisplayName}` : '';
    const accuracyPercent = total > 0 ? Math.round((correctCount / total) * 100) : 0;
    const endTs = completedAt ?? Date.now();
    const elapsedSec = Math.max(1, Math.round((endTs - startedAt) / 1000));
    const mm = Math.floor(elapsedSec / 60);
    const ss = elapsedSec % 60;
    const timeLabel = `${mm}:${ss.toString().padStart(2, '0')}`;

    let feedbackKey: 'feedbackPerfect' | 'feedbackGreat' | 'feedbackGood' | 'feedbackTryAgain';
    if (accuracyPercent === 100) feedbackKey = 'feedbackPerfect';
    else if (accuracyPercent >= 80) feedbackKey = 'feedbackGreat';
    else if (accuracyPercent >= 50) feedbackKey = 'feedbackGood';
    else feedbackKey = 'feedbackTryAgain';

    // Questions ratées — préserver l'ordre de lesson.exercises.
    const mistakes = lesson.exercises
      .map((ex) => {
        const ans = answers[ex.id];
        if (!ans || ans.correct) return null;
        return { exercise: ex, chosen: ans.chosen };
      })
      .filter((m): m is { exercise: LessonV2Exercise; chosen: number } => m !== null);

    const accuracyColor =
      accuracyPercent === 100
        ? '#10b981'
        : accuracyPercent >= 80
        ? '#22c55e'
        : accuracyPercent >= 50
        ? '#f59e0b'
        : '#ef4444';

    return (
      <section className="lv2-section lv2-section--summary">
        <div className="lv2-summary-hero">
          <h2>
            {getCopy(language, 'summaryTitle')}
            {displayName}
          </h2>
          <p>{getCopy(language, 'summarySubtitle')}</p>
        </div>

        <div
          className="lv2-summary-accuracy"
          style={{ ['--lv2-accuracy-color' as keyof CSSProperties]: accuracyColor } as CSSProperties}
        >
          <div
            className="lv2-summary-accuracy-ring"
            style={{
              background: `conic-gradient(${accuracyColor} ${accuracyPercent * 3.6}deg, rgba(255,255,255,0.08) 0)`
            }}
          >
            <div className="lv2-summary-accuracy-inner">
              <div className="lv2-summary-accuracy-value">{accuracyPercent}%</div>
              <div className="lv2-summary-accuracy-label">{getCopy(language, 'accuracy')}</div>
            </div>
          </div>
          <p className="lv2-summary-feedback">{getCopy(language, feedbackKey)}</p>
        </div>

        <div className="lv2-summary-stats">
          <div className="lv2-stat">
            <div className="lv2-stat-value">
              {correctCount} / {total}
            </div>
            <div className="lv2-stat-label">{getCopy(language, 'score')}</div>
          </div>
          <div className="lv2-stat">
            <div className="lv2-stat-value">{timeLabel}</div>
            <div className="lv2-stat-label">{getCopy(language, 'timeSpent')}</div>
          </div>
          <div className="lv2-stat lv2-stat--xp">
            <div className="lv2-stat-value">+{xpReward}</div>
            <div className="lv2-stat-label">{getCopy(language, 'xpGained')}</div>
          </div>
        </div>

        {total > 0 && (
          <div className="lv2-summary-mistakes">
            <div className="lv2-summary-mistakes-head">
              <h3>{getCopy(language, 'reviewMistakes')}</h3>
              {mistakes.length === 0 ? (
                <span className="lv2-summary-mistakes-empty">
                  {getCopy(language, 'reviewMistakesEmpty')}
                </span>
              ) : (
                <button
                  type="button"
                  className="lv2-btn lv2-btn--link"
                  onClick={() => setShowMistakes((s) => !s)}
                >
                  {showMistakes
                    ? getCopy(language, 'hideMistakes')
                    : `${getCopy(language, 'showMistakes')} (${mistakes.length})`}
                </button>
              )}
            </div>
            {showMistakes && mistakes.length > 0 && (
              <ul className="lv2-summary-mistakes-list">
                {mistakes.map(({ exercise, chosen }) => {
                  const prompt =
                    language === 'en' && exercise.promptEn
                      ? exercise.promptEn
                      : exercise.prompt;
                  const explanation =
                    language === 'en' && exercise.explanationEn
                      ? exercise.explanationEn
                      : exercise.explanation;
                  const chosenLabel = exercise.choices[chosen];
                  const correctLabel = exercise.choices[exercise.correctIndex];
                  return (
                    <li key={exercise.id} className="lv2-summary-mistake">
                      <div className="lv2-summary-mistake-prompt">{prompt}</div>
                      <div className="lv2-summary-mistake-row lv2-summary-mistake-row--wrong">
                        <span className="lv2-summary-mistake-label">
                          {getCopy(language, 'yourAnswer')}
                        </span>
                        <span className="lv2-summary-mistake-answer">{chosenLabel}</span>
                      </div>
                      <div className="lv2-summary-mistake-row lv2-summary-mistake-row--right">
                        <span className="lv2-summary-mistake-label">
                          {getCopy(language, 'correctAnswer')}
                        </span>
                        <span className="lv2-summary-mistake-answer">{correctLabel}</span>
                      </div>
                      {explanation && (
                        <div className="lv2-summary-mistake-explanation">{explanation}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}

        {takeaways.length > 0 && (
          <div className="lv2-summary-takeaways">
            <h3>{getCopy(language, 'keyTakeaways')}</h3>
            <ul>
              {takeaways.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Drill prononciation : exercice bonus en fin de leçon. Agrège les
            hanzi des examples + learnSections en dédupliquant, et propose à
            l'utilisateur de les prononcer un par un. */}
        <PronunciationDrill
          items={(() => {
            const items: PronunciationDrillItem[] = [];
            // examples
            for (const ex of lesson.examples) {
              items.push({ hanzi: ex.hanzi, pinyin: ex.pinyin, audio: ex.audio });
            }
            // learnSections > items
            for (const section of lesson.learnSections ?? []) {
              for (const it of section.items ?? []) {
                items.push({ hanzi: it.hanzi, pinyin: it.pinyin, audio: it.audio });
              }
            }
            return items;
          })()}
          language={language === 'en' ? 'en' : 'fr'}
        />

        {/* Drill écriture : pendant du drill prononciation. Explose les mots
            en caractères individuels (Hanzi Writer = 1 caractère à la fois). */}
        <HandwritingDrill
          hanzis={(() => {
            const arr: string[] = [];
            for (const ex of lesson.examples) arr.push(ex.hanzi);
            for (const section of lesson.learnSections ?? []) {
              for (const it of section.items ?? []) arr.push(it.hanzi);
            }
            return arr;
          })()}
          language={language === 'en' ? 'en' : 'fr'}
        />

        {nextLesson && (
          <div className="lv2-summary-next">
            <div className="lv2-summary-next-label">{getCopy(language, 'nextLessonLabel')}</div>
            <div className="lv2-summary-next-card">
              <div className="lv2-summary-next-info">
                <HskBadge level={nextLesson.level} />
                <div className="lv2-summary-next-title">{nextLesson.title}</div>
                {nextLesson.estimatedMinutes && (
                  <div className="lv2-summary-next-duration">
                    ⏱ {nextLesson.estimatedMinutes} {getCopy(language, 'minutes')}
                  </div>
                )}
              </div>
              <button
                type="button"
                className="lv2-btn lv2-btn--primary"
                onClick={() => onOpenNextLesson?.(nextLesson.id)}
              >
                {getCopy(language, 'startNext')} →
              </button>
            </div>
          </div>
        )}

        <div className="lv2-section-actions lv2-section-actions--center">
          <button type="button" className="lv2-btn lv2-btn--primary" onClick={onBack}>
            {getCopy(language, 'finish')}
          </button>
        </div>
      </section>
    );
  };

  // --------------------------------------------------------------------------
  //  RENDER
  // --------------------------------------------------------------------------

  return (
    <div className="lesson-v2">
      <div className="lv2-topbar">
        {onBack && (
          <button type="button" className="lv2-btn lv2-btn--link" onClick={onBack}>
            {getCopy(language, 'back')}
          </button>
        )}
        <LessonStepper currentStep={step} language={language} stepOrder={stepOrder} />
        <OfflineLessonButton payload={offlinePayload} language={language} />
      </div>

      <div className="lv2-content">
        {step === 'intro' && renderIntro()}
        {step === 'learn' && renderLearn()}
        {step === 'examples' && renderExamples()}
        {step === 'practice' && renderPractice()}
        {step === 'summary' && renderSummary()}
      </div>
    </div>
  );
};

export default StructuredLessonPageV2;
