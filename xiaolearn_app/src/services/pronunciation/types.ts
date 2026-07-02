/**
 * services/pronunciation/types.ts — Phase 4 IA.
 *
 * Interface abstraite pour les providers de scoring de prononciation.
 * L'implémentation V1 utilise Gemini multimodal audio (cf. geminiProvider.ts).
 * Plus tard, on pourra ajouter Azure Pronunciation Assessment ou un modèle
 * open-source self-hosted SANS toucher au reste de l'app — il suffira de
 * créer une nouvelle classe qui implémente cette même interface.
 */

export interface SyllableScore {
  /** Caractère hanzi de la syllabe attendue. */
  hanzi: string;
  /** Pinyin attendu avec ton (ex: « nǐ », « hǎo »). */
  expectedPinyin: string;
  /** Numéro de ton attendu (1-4 ou 5 = neutre). */
  expectedTone?: 1 | 2 | 3 | 4 | 5;
  /** Numéro de ton détecté par le modèle (peut différer de l'attendu). */
  detectedTone?: 1 | 2 | 3 | 4 | 5;
  /** Score de cette syllabe sur 100. */
  score: number;
  /**
   * Court résumé de l'erreur en français : « OK », « Ton 1→2 »,
   * « Initiale floue », « Finale écourtée », etc. Affiché à l'utilisateur.
   */
  issue: string;
}

export interface PronunciationResult {
  /** Score global de la prononciation sur 100. */
  globalScore: number;
  /** L'apprenant a-t-il dit (en gros) la bonne phrase ? */
  intelligible: boolean;
  /** Détail par syllabe (même longueur que la phrase attendue, idéalement). */
  syllables: SyllableScore[];
  /** 1 à 3 problèmes prioritaires à travailler (en français). */
  topIssues: string[];
  /** Conseil pratique unique pour s'améliorer (en français, 1-2 phrases). */
  advice: string;
  /** Identifiant du provider qui a produit ce résultat (debug/analytics). */
  providerName: string;
}

export interface PronunciationInput {
  /** Audio enregistré par l'utilisateur (webm/wav/mp3/etc.). */
  audioBlob: Blob;
  /** Phrase chinoise attendue en hanzi (ex: « 你好 »). */
  expectedHanzi: string;
  /** Pinyin de la phrase attendue (ex: « nǐ hǎo ») — aide pour le scoring. */
  expectedPinyin?: string;
  /** Niveau CECR de l'apprenant (sert à calibrer la sévérité du scoring). */
  level?: string;
}

/**
 * Interface qu'un provider doit implémenter pour fournir du scoring de
 * prononciation à XiaoLearn. Stateless : chaque appel reçoit tout ce dont
 * il a besoin, et renvoie un résultat structuré.
 */
export interface PronunciationProvider {
  /** Identifiant lisible (ex: « gemini », « azure », « kaldi-self-hosted »). */
  readonly name: string;
  /** Vrai si ce provider est utilisable côté client (clé API présente, etc.). */
  isAvailable(): boolean;
  /** Lance l'analyse de prononciation et renvoie un résultat structuré. */
  assess(input: PronunciationInput): Promise<PronunciationResult>;
}
