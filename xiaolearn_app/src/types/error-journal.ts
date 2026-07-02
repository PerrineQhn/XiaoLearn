/**
 * error-journal.ts — Types pour le système "Mes erreurs"
 * --------------------------------------------------------
 * Inspiré du carnet d'erreurs Seonsaengnim, adapté au mandarin.
 *
 * Chaque entrée représente une faute commise par l'utilisateur dans une
 * conversation (Prof. Xiao) ou dans un dialogue (Simulateur). Elle est
 * stockée localement (localStorage) et sync via Firestore.
 *
 * Structure clé Firestore : `users/{uid}.xl_error_journal_v1` (sérialisée
 * en JSON via useFirestoreSync).
 */

/** Catégorie sémantique de l'erreur, adaptée au mandarin. */
export type ErrorCategory =
  | 'particule'      // 了, 的, 地, 得, 把, 被, 是…的
  | 'ton'            // erreur sur 1/2/3/4e ton ou ton neutre
  | 'prononciation'  // pinyin incorrect, sandhi tonal raté
  | 'politesse'      // 您 vs 你, registre formel/familier
  | 'vocabulaire'    // mauvais mot choisi
  | 'grammaire'      // ordre des mots, structure
  | 'mesureur'       // 量词 : 个 vs 张 vs 条…
  | 'caractere'      // mauvais hanzi (homophone, faute de frappe)
  | 'traduction'     // sens divergent du contexte
  | 'orthographe'    // hanzi mal écrit
  | 'autre';

/** Sévérité — module l'impact pour le filtrage et la priorisation. */
export type ErrorSeverity = 'mineure' | 'importante' | 'critique';

/** Source de l'erreur (où elle a été commise). */
export type ErrorSource = 'prof-xiao' | 'simulator' | 'lesson' | 'manual';

/**
 * Une entrée du carnet d'erreurs.
 * Champs serialisables en JSON (Date → ISO string).
 */
export interface ErrorEntry {
  id: string;
  category: ErrorCategory;
  severity: ErrorSeverity;
  source: ErrorSource;
  /** La portion fautive écrite par l'utilisateur (mise en pill rouge). */
  wrongText: string;
  /** La version corrigée (mise en pill verte). */
  correctText: string;
  /** Pinyin de la version corrigée (optionnel, pour TTS). */
  correctPinyin?: string;
  /** Traduction française de la version corrigée (optionnel). */
  correctTranslationFr?: string;
  /** Explication courte (1-2 lignes max) générée par Gemini ou prof. */
  explanation: string;
  /** Contexte complet de la phrase utilisateur (pour comprendre). */
  fullUserText?: string;
  /** Slug ou titre du dialogue/scénario en cas de Simulator. */
  contextLabel?: string;
  /** Date ISO de la première occurrence. */
  createdAt: string;
  /** Date ISO de la dernière re-occurrence (mise à jour si même faute). */
  lastSeenAt: string;
  /** Combien de fois la même erreur a été commise. */
  occurrenceCount: number;
  /** Combien de fois l'utilisateur a réussi l'exercice de rattrapage. */
  practiceCount: number;
  /**
   * Date ISO du dernier exercice réussi avec succès. Null si jamais pratiqué.
   * Sert au mécanisme de "verrouillage hebdomadaire" : si l'utilisateur réussit
   * l'exercice, l'erreur est considérée comme "travaillée" pour 7 jours.
   */
  lastPracticeSuccessAt?: string | null;
  /** Tags optionnels pour filtrage fin (ex. niveau HSK, leçon). */
  tags?: string[];
}

/** Catalog de catégories pour l'UI (label + couleur + emoji). */
export interface ErrorCategoryMeta {
  key: ErrorCategory;
  label: string;
  labelEn: string;
  emoji: string;
  bgColor: string;
  fgColor: string;
}

export const ERROR_CATEGORIES: ErrorCategoryMeta[] = [
  { key: 'particule',     label: 'Particule',     labelEn: 'Particle',      emoji: '📌', bgColor: '#fde7e5', fgColor: '#b8264b' },
  { key: 'ton',           label: 'Ton',           labelEn: 'Tone',          emoji: '🎵', bgColor: '#eadfff', fgColor: '#6c4cb8' },
  { key: 'prononciation', label: 'Prononciation', labelEn: 'Pronunciation', emoji: '🔊', bgColor: '#dceefc', fgColor: '#1f6db3' },
  { key: 'politesse',     label: 'Politesse',     labelEn: 'Politeness',    emoji: '🙏', bgColor: '#fdecd4', fgColor: '#c97a1f' },
  { key: 'vocabulaire',   label: 'Vocabulaire',   labelEn: 'Vocabulary',    emoji: '📚', bgColor: '#e0f0e6', fgColor: '#2a7a4e' },
  { key: 'grammaire',     label: 'Grammaire',     labelEn: 'Grammar',       emoji: '✍️', bgColor: '#fff0d6', fgColor: '#b07a1c' },
  { key: 'mesureur',      label: 'Mesureur',      labelEn: 'Classifier',    emoji: '🔢', bgColor: '#fbe9b8', fgColor: '#a06b15' },
  { key: 'caractere',     label: 'Caractère',     labelEn: 'Character',     emoji: '汉',  bgColor: '#f4ede2', fgColor: '#5c4a30' },
  { key: 'traduction',    label: 'Traduction',    labelEn: 'Translation',   emoji: '🌐', bgColor: '#e0f7fa', fgColor: '#006064' },
  { key: 'orthographe',   label: 'Orthographe',   labelEn: 'Spelling',      emoji: '✏️', bgColor: '#fdf3ea', fgColor: '#7a4e1c' },
  { key: 'autre',         label: 'Autre',         labelEn: 'Other',         emoji: '•',  bgColor: '#ece4d5', fgColor: '#5e6075' }
];

export const getCategoryMeta = (cat: ErrorCategory): ErrorCategoryMeta =>
  ERROR_CATEGORIES.find((c) => c.key === cat) ?? ERROR_CATEGORIES[ERROR_CATEGORIES.length - 1];

/** Seuil au-dessus duquel une erreur est "à travailler" (récurrente). */
export const RECURRENT_THRESHOLD = 2;

/** Délai en jours pendant lequel une erreur est "verrouillée" après un succès. */
export const PRACTICE_LOCK_DAYS = 7;

/** Stats agrégées pour les cartes d'en-tête. */
export interface ErrorStats {
  total: number;
  thisWeek: number;
  practicedLast7Days: number;
  topCategory: ErrorCategory | null;
  topCategoryCount: number;
  recurrentCount: number;
}
