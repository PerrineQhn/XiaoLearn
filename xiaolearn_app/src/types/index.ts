export type LevelId = 'hsk1' | 'hsk2' | 'hsk3' | 'hsk4' | 'hsk5' | 'hsk6' | 'hsk7';

export interface LessonExample {
  hanzi: string;
  pinyin: string;
  translation: string;
  audio?: string;
}

export interface QuizData {
  prompt: string;
  choices: string[];
  correctChoiceIndex: number;
}

// Nouveaux types de quiz pour la grammaire
export type GrammarQuizType =
  | 'sentence-reconstruction'  // Reconstituer une phrase à partir de mots
  | 'particle-choice'          // Choisir la bonne particule
  | 'fill-blank'               // Compléter un blanc dans une phrase
  | 'translation-to-chinese';  // Traduire du français vers le chinois

export interface SentenceReconstructionQuiz {
  type: 'sentence-reconstruction';
  translation: string;          // Traduction en français
  translationEn: string;        // Traduction en anglais
  words: string[];              // Mots chinois à réorganiser
  correctOrder: string[];       // Ordre correct des mots
  pinyin: string;               // Pinyin de la phrase correcte
}

export interface ParticleChoiceQuiz {
  type: 'particle-choice';
  sentenceBefore: string;       // Partie de phrase avant le blanc
  sentenceAfter: string;        // Partie de phrase après le blanc
  translation: string;          // Traduction en français
  translationEn: string;        // Traduction en anglais
  choices: string[];            // Particules possibles (不, 没, 的, 在, etc.)
  correctChoice: string;        // La bonne particule
  explanation: string;          // Explication de pourquoi cette particule
}

export interface FillBlankQuiz {
  type: 'fill-blank';
  sentence: string;             // Phrase avec ___ pour le blanc
  translation: string;          // Traduction en français
  translationEn: string;        // Traduction en anglais
  choices: string[];            // Mots/particules possibles
  correctChoice: string;        // Le bon mot
  pinyin: string;               // Pinyin de la phrase complète
  explanation?: string;         // Optionnel : précision pédagogique
}

export interface TranslationToChineseQuiz {
  type: 'translation-to-chinese';
  translation: string;          // Phrase en français
  translationEn: string;        // Phrase en anglais
  correctAnswer: string;        // Réponse correcte en chinois
  pinyin: string;               // Pinyin de la réponse
  choices: string[];            // Choix de réponses en chinois
}

export type GrammarQuiz =
  | SentenceReconstructionQuiz
  | ParticleChoiceQuiz
  | FillBlankQuiz
  | TranslationToChineseQuiz;

// Explication détaillée pour les points de grammaire
export interface GrammarExplanation {
  whenToUse: string;           // Quand utiliser ce point de grammaire
  whenToUseEn: string;          // When to use (English)
  howToUse: string;             // Comment l'utiliser (structure)
  howToUseEn: string;           // How to use (English)
  commonMistakes?: string;      // Erreurs courantes à éviter
  commonMistakesEn?: string;    // Common mistakes (English)
  tips?: string;                // Astuces pour se souvenir
  tipsEn?: string;              // Tips (English)
  relatedGrammar?: string[];    // Points de grammaire liés (IDs)
}

export interface LessonItem {
  id: string;
  level: LevelId;
  hanzi: string;
  pinyin: string;
  translation: string;
  translationFr: string;
  category: string;
  explanation?: string;
  explanationFr?: string;
  grammarExplanation?: GrammarExplanation;  // Explication détaillée pour la grammaire
  audio?: string;  // Audio principal (optionnel si audioLetter est fourni)
  audioLetter?: string;  // Audio pour la lettre ou le son isolé (utilisé pour le pinyin)
  examples: LessonExample[];
  quiz: QuizData;
  grammarQuiz?: GrammarQuiz;  // Quiz de grammaire optionnel (pour les leçons de grammaire)
  tags: string[];
  theme: string;
}

export type LessonExerciseType =
  | 'listening'
  | 'text-mcq'
  | 'grammar'
  | 'writing'
  | 'dialogue'
  | 'reading'
  | 'speaking'
  | 'dictation';

export interface LessonExerciseListening {
  id: string;
  type: 'listening';
  mode: 'tone' | 'minimal-pair' | 'dialogue';
  promptFr: string;
  promptEn: string;
  audio: string;
  choices: string[];
  choiceLabels?: string[];
  correctChoiceIndex: number;
  explanationFr?: string;
  explanationEn?: string;
}

export interface LessonExerciseTextMcq {
  id: string;
  type: 'text-mcq';
  promptFr: string;
  promptEn: string;
  choices: string[];
  choiceLabels?: string[];
  correctChoiceIndex: number;
  explanationFr?: string;
  explanationEn?: string;
}

export interface LessonExerciseGrammar {
  id: string;
  type: 'grammar';
  choiceLabels?: string[];
  quiz: GrammarQuiz;
}

export interface LessonExerciseWriting {
  id: string;
  type: 'writing';
  mode: 'character' | 'sentence' | 'paragraph';
  promptFr: string;
  promptEn: string;
  targetCharacter?: string; // For 'character' mode
  targetLength?: number; // For 'sentence' / 'paragraph' modes
  hints?: string[];
  hintsEn?: string[];
  modelAnswer: string;
  modelPinyin?: string;
  evaluationCriteria: string[];
  evaluationCriteriaEn: string[];
}

export interface DialogueLine {
  speaker: 'A' | 'B';
  text: string;
  audio?: string;
  isBlank?: boolean;
}

export interface LessonExerciseDialogue {
  id: string;
  type: 'dialogue';
  mode: 'role-play' | 'fill-blanks' | 'order';
  promptFr: string;
  promptEn: string;
  context: string;
  contextEn: string;
  dialogue: DialogueLine[];
  correctAnswers?: string[];
}

export interface ReadingQuestion {
  questionFr: string;
  questionEn: string;
  choices: string[];
  correctIndex: number;
  explanationFr?: string;
  explanationEn?: string;
}

export interface LessonExerciseReading {
  id: string;
  type: 'reading';
  mode: 'comprehension' | 'vocabulary' | 'inference';
  promptFr: string;
  promptEn: string;
  passage: string;
  passagePinyin?: string;
  passageAudio?: string;
  questions: ReadingQuestion[];
}

export interface LessonExerciseSpeaking {
  id: string;
  type: 'speaking';
  mode: 'repeat' | 'describe' | 'answer';
  promptFr: string;
  promptEn: string;
  modelAudio?: string;
  modelText: string;
  modelPinyin?: string;
  hints?: string[];
  hintsEn?: string[];
  evaluationPoints: string[];
  evaluationPointsEn: string[];
}

export interface LessonExerciseDictation {
  id: string;
  type: 'dictation';
  mode: 'character' | 'word' | 'sentence';
  promptFr: string;
  promptEn: string;
  audio: string;
  correctAnswer: string;
  correctPinyin?: string;
  hints?: string[];
  hintsEn?: string[];
  allowPinyin?: boolean;
}

export type LessonExercise =
  | LessonExerciseListening
  | LessonExerciseTextMcq
  | LessonExerciseGrammar
  | LessonExerciseWriting
  | LessonExerciseDialogue
  | LessonExerciseReading
  | LessonExerciseSpeaking
  | LessonExerciseDictation;

export interface DatasetManifest {
  updatedAt: string;
  totals: Record<LevelId, number>;
  lessons: LessonItem[];
}

export interface ThemeSummary {
  theme: string;
  count: number;
  levels: Record<LevelId, number>;
}
