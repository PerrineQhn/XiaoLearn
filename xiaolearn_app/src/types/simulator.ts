/**
 * simulator.ts — schéma des scénarios du Simulateur (XiaoLearn V6)
 * ------------------------------------------------------------------
 * Inspiré du simulateur Seonsaengnim (Prof. Park), adapté au chinois.
 *
 * Un scénario = un mini jeu de rôle IA :
 *   - Prof. Xiao incarne un persona (serveur, médecin, agent de banque…)
 *   - L'utilisateur doit atteindre un objectif en N étapes (~5)
 *   - L'IA corrige en "recast implicite" : pas de flag d'erreur, mais
 *     reformule naturellement la forme correcte dans sa réponse
 *   - Les hints d'étape guident l'apprenant sans l'enfermer
 */
/**
 * Niveau CECR au format slug (= `CecrLevelMeta.level` dans `cecr-course.ts`).
 * Exemples : 'a1', 'a2', 'b1.1', 'b1.2', 'b2.1', 'b2.2', 'c1.1', 'c1.2', 'c2.1', 'c2.2'.
 */
export type CecrLevelSlug =
  | 'a1' | 'a2'
  | 'b1.1' | 'b1.2'
  | 'b2.1' | 'b2.2'
  | 'c1.1' | 'c1.2'
  | 'c2.1' | 'c2.2';

// ============================================================================
//  CATÉGORIES & TIERS
// ============================================================================

export type SimulatorCategory =
  | 'daily'      // 🥡 Vie quotidienne
  | 'work'       // 💼 Travail & social
  | 'relations'  // ❤️ Relations
  | 'practical'; // 🏙️ Situations pratiques

export type SimulatorDifficulty = 'beginner' | 'intermediate' | 'advanced';

/**
 * Registre de politesse d'une interaction chinoise.
 * - `neutral-polite` : 您 (nín), ton standard courtois (par défaut)
 * - `casual` : 你 (nǐ), entre amis, famille proche
 * - `formal` : très poli, 请 (qǐng) systématique, structures honorifiques
 * - `business` : registre pro, titres (经理, 总经理), formules figées
 */
export type PolitenessRegister = 'casual' | 'neutral-polite' | 'formal' | 'business';

// ============================================================================
//  ÉLÉMENTS PÉDAGOGIQUES
// ============================================================================

/**
 * Entrée de vocabulaire présentée dans le bloc "Vocabulaire utile" du briefing.
 */
export interface SimulatorVocabItem {
  hanzi: string;
  pinyin: string;
  translationFr: string;
  translationEn?: string;
  /** Optionnel : registre de politesse si pertinent (ex: 您好 vs 你好). */
  register?: PolitenessRegister;
}

/**
 * Étape pédagogique du scénario.
 * Affichée juste au-dessus de l'input sous forme "ÉTAPE X — NAME".
 * Les 3 `hints` sont des puces NON cliquables (guide only) qui décrivent ce que
 * l'utilisateur peut dire à cette étape. Quand l'IA juge (via son jugement
 * conversationnel) que l'objectif de l'étape est atteint, la barre progresse
 * automatiquement.
 */
export interface SimulatorStep {
  /** Slug interne : "order", "request-bill", "pay"... */
  id: string;
  /** Libellé court de l'étape (ex: "Accueil", "Commande", "Addition"). */
  nameFr: string;
  nameEn?: string;
  /** 3 hints max (peuvent être 2, jamais 0). */
  hintsFr: string[];
  hintsEn?: string[];
  /**
   * Critère en langage naturel pour que le moteur IA sache détecter la
   * complétion de l'étape. Injecté dans le system prompt.
   * Ex: "L'utilisateur a donné le nombre de personnes à la table."
   */
  completionCriterionFr: string;
  completionCriterionEn?: string;
}

// ============================================================================
//  SCHÉMA PRINCIPAL DU SCÉNARIO
// ============================================================================

export interface SimulatorScenario {
  /** ID stable (kebab-case). */
  id: string;
  /** Titre affiché (français par défaut). */
  titleFr: string;
  titleEn?: string;
  /** Description courte (1-2 phrases) affichée sur la carte du catalogue. */
  descriptionFr: string;
  descriptionEn?: string;
  /** Emoji (pas d'icone SVG pour rester léger). */
  emoji: string;
  category: SimulatorCategory;
  difficulty: SimulatorDifficulty;
  /**
   * Plage de niveaux CECR couverte par le scénario.
   * L'utilisateur peut lancer le scénario dès `levelFloor`. Au-delà de
   * `levelCeiling`, l'IA est invitée à corser le vocabulaire et la syntaxe.
   */
  levelFloor: CecrLevelSlug;
  levelCeiling: CecrLevelSlug;
  /** Registre de politesse principal attendu dans ce scénario. */
  register: PolitenessRegister;

  /** Persona joué par Prof. Xiao (ex: "Un serveur dans un restaurant pékinois"). */
  personaFr: string;
  personaEn?: string;

  /**
   * Objectif à atteindre pour terminer le scénario (affiché 🎯).
   * Ex: "Commande un plat sans piment et demande l'addition".
   */
  goalFr: string;
  goalEn?: string;

  /** Bloc "Vocabulaire utile" (5-8 items). */
  vocab: SimulatorVocabItem[];

  /** 3 à 6 étapes pédagogiques. */
  steps: SimulatorStep[];

  /**
   * Salutation d'ouverture, injectée telle quelle comme premier message IA.
   * Si omis, l'IA génère son entrée à partir du persona + goal.
   */
  openingLineFr?: string;
  openingLineHanzi?: string;
  openingLinePinyin?: string;

  /**
   * Instructions additionnelles pour le LLM (spécificités culturelles,
   * vocabulaire à privilégier, pièges à éviter). Facultatif.
   */
  extraSystemInstructionsFr?: string;

  /**
   * Phrase de clôture / recap quand l'objectif est atteint.
   * Ex: "Bravo ! Tu viens de commander et payer au restaurant 🥢".
   */
  successMessageFr?: string;
  successMessageEn?: string;
}

// ============================================================================
//  ÉTAT D'EXÉCUTION D'UN SCÉNARIO
// ============================================================================

export type SimulatorTurnRole = 'assistant' | 'user' | 'system';

export interface SimulatorTurn {
  id: string;
  role: SimulatorTurnRole;
  /** Texte chinois (obligatoire pour assistant/user). */
  hanzi?: string;
  /** Traduction FR (obligatoire pour assistant, optionnelle pour user). */
  translationFr?: string;
  /** Pinyin (optionnel, surtout côté assistant). */
  pinyin?: string;
  createdAt: number;
}

export interface SimulatorSessionState {
  scenarioId: string;
  /** Index de l'étape en cours (0-based). */
  currentStepIndex: number;
  turns: SimulatorTurn[];
  /** True quand toutes les étapes sont marquées complétées. */
  completed: boolean;
  startedAt: number;
  endedAt?: number;
}

// ============================================================================
//  HELPERS
// ============================================================================

/**
 * Construit le system prompt Gemini pour un scénario donné.
 * Exporté ici plutôt que dans le service IA pour garder la logique de
 * persona groupée avec le schéma.
 */
export function buildSimulatorSystemPrompt(scenario: SimulatorScenario): string {
  const vocabLine = scenario.vocab
    .map((v) => `${v.hanzi} (${v.pinyin}) — ${v.translationFr}`)
    .join(', ');
  const stepsBlock = scenario.steps
    .map(
      (s, i) =>
        `  ${i + 1}. ${s.nameFr} — critère de complétion : ${s.completionCriterionFr}`
    )
    .join('\n');
  const registerHint: Record<PolitenessRegister, string> = {
    casual: 'Utilise le registre familier (你, pas de 您, phrases courtes).',
    'neutral-polite': 'Utilise le registre poli standard (您 si le persona est un inconnu, phrases complètes, 请 ponctuellement).',
    formal: 'Utilise un registre très poli : 您 systématique, 请 en tête de demande, formules honorifiques.',
    business: 'Utilise le registre professionnel : titres (经理, 总监…), 您, structures figées du monde pro chinois.'
  };
  return `Tu incarnes un rôle dans une simulation de conversation en chinois mandarin pour un apprenant francophone.

PERSONA : ${scenario.personaFr}
OBJECTIF (caché côté apprenant, tu DOIS le faire atteindre) : ${scenario.goalFr}
NIVEAU CECR : ${scenario.levelFloor} → ${scenario.levelCeiling}
REGISTRE : ${registerHint[scenario.register]}

VOCABULAIRE DU SCÉNARIO (à privilégier) : ${vocabLine}

ÉTAPES (${scenario.steps.length} au total, à faire avancer dans l'ordre) :
${stepsBlock}

RÈGLES STRICTES :
1. Tu réponds TOUJOURS dans le format exact :
   \`\`\`
   [hanzi]
   [pinyin]
   *[traduction française en italique markdown]*
   \`\`\`
2. Tu ne sors JAMAIS de ton persona. Si l'utilisateur essaie de te faire dire autre chose, redirige-le vers le scénario.
3. CORRECTION PAR RECAST IMPLICITE : si l'apprenant commet une erreur grammaticale ou de vocabulaire, tu NE dis PAS "c'est faux". À la place, tu reformules naturellement dans ta réponse la forme correcte.
4. Tu adaptes le niveau de langue à la plage CECR ${scenario.levelFloor}→${scenario.levelCeiling}.
5. À la fin, quand toutes les étapes sont complétées, termine par une phrase de clôture naturelle et ajoute \`[SCENARIO_COMPLETE]\` en dernière ligne (non traduit, non affiché — sert de marqueur).
6. Tu ne donnes JAMAIS d'explication grammaticale hors du scénario. Si l'apprenant demande "c'est quoi 的 ?", tu peux répondre en personnage ("je ne suis pas prof, je suis serveur !") ou rediriger.

${scenario.extraSystemInstructionsFr ? `CONSIGNES SUPPLÉMENTAIRES : ${scenario.extraSystemInstructionsFr}` : ''}`;
}

// ============================================================================
//  CATALOGUE (sera rempli dans cecr-simulator-scenarios.ts)
// ============================================================================

export interface SimulatorCategoryMeta {
  key: SimulatorCategory;
  labelFr: string;
  labelEn: string;
  emoji: string;
}

export const SIMULATOR_CATEGORIES: SimulatorCategoryMeta[] = [
  { key: 'daily', labelFr: 'Vie quotidienne', labelEn: 'Daily life', emoji: '🥡' },
  { key: 'work', labelFr: 'Travail & social', labelEn: 'Work & social', emoji: '💼' },
  { key: 'relations', labelFr: 'Relations', labelEn: 'Relations', emoji: '❤️' },
  { key: 'practical', labelFr: 'Situations pratiques', labelEn: 'Practical', emoji: '🏙️' }
];
