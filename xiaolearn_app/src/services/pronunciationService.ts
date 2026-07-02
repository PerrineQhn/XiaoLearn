/**
 * pronunciationService.ts — reconnaissance vocale chinoise (Web Speech API)
 * --------------------------------------------------------------------------
 * Service léger pour l'apprentissage de la prononciation. Repose sur la
 * Web Speech API native (`SpeechRecognition` / `webkitSpeechRecognition`),
 * configurée en `zh-CN`. Le navigateur transcrit la voix → on compare la
 * transcription au hanzi attendu et on donne un feedback.
 *
 * Compatibilité (au 2026-05) :
 *   - Chrome / Edge / Brave : OK, qualité correcte
 *   - Safari : OK depuis macOS 14 / iOS 14.5
 *   - Firefox : très partiel, on tombe en `notSupported`
 *
 * Limitations connues, à documenter dans l'UI :
 *   - Pas de scoring par syllabe ni de feedback "ton 1 vs ton 2".
 *     On peut juste dire "j'ai entendu X, c'était Y".
 *   - L'API n'expose pas d'audio brut : pas de moyen de réécouter
 *     l'enregistrement du user (limitation Web Speech).
 *   - Le silence/bruit ambiant peuvent fausser le résultat.
 *
 * Pour aller plus loin (futur) :
 *   - Migrer sur Google Cloud Speech-to-Text + Voice Activity Detection,
 *     ou ELSA Speech API si on veut un vrai scoring tonal.
 */

// ----------------------------------------------------------------------------
//  Types TS pour la Web Speech API (pas dans lib.dom.d.ts par défaut sur tout)
// ----------------------------------------------------------------------------

interface SpeechRecognitionEvent extends Event {
  readonly results: SpeechRecognitionResultList;
  readonly resultIndex: number;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  readonly length: number;
  readonly isFinal: boolean;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string;
  readonly message?: string;
}

interface SpeechRecognitionInstance {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognitionInstance;
}

// Détection des deux variantes (standard et webkit-)
const getSpeechRecognitionCtor = (): SpeechRecognitionConstructor | null => {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
};

/** True si l'API est disponible côté navigateur. */
export const isPronunciationSupported = (): boolean =>
  getSpeechRecognitionCtor() !== null;

// ----------------------------------------------------------------------------
//  Normalisation pour la comparaison
// ----------------------------------------------------------------------------

/**
 * Normalise une chaîne pour la comparaison hanzi :
 *   - retire ponctuation chinoise et latine
 *   - retire les espaces
 *   - convertit les variantes traditionnelles courantes en simplifié
 *     (best-effort — on garde simple, pas une table OpenCC complète)
 */
const normalizeHanzi = (s: string): string => {
  return s
    .normalize('NFC')
    .replace(/[\s　.,，。！？!?:;：；、·…—()（）"'""''`]/g, '')
    .trim();
};

/** Normalise un pinyin : minuscule, sans tons, sans espaces, sans ponctuation. */
const normalizePinyin = (s: string): string => {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // retire les marqueurs de ton diacritiques
    .replace(/[^a-z0-9]/g, '')
    .trim();
};

// ----------------------------------------------------------------------------
//  API publique
// ----------------------------------------------------------------------------

export type PronunciationVerdict = 'match' | 'close' | 'mismatch';

export interface PronunciationResult {
  /** Texte transcrit par le moteur de reconnaissance. */
  transcript: string;
  /** Confiance brute renvoyée par l'API (0-1). 0 si non fournie. */
  confidence: number;
  /** Verdict : exact, proche, ou différent. */
  verdict: PronunciationVerdict;
  /** Pour debug/affichage : la version normalisée comparée. */
  expectedNormalized: string;
  actualNormalized: string;
}

export class PronunciationNotSupportedError extends Error {
  constructor() {
    super('Speech recognition not supported in this browser.');
    this.name = 'PronunciationNotSupportedError';
  }
}

export class PronunciationAbortedError extends Error {
  constructor(message = 'Recognition aborted') {
    super(message);
    this.name = 'PronunciationAbortedError';
  }
}

/**
 * Compare une transcription au hanzi/pinyin attendu et renvoie un verdict.
 * Exposé séparément de `recognize` pour permettre de tester sans micro.
 */
export const compareTranscript = (
  transcript: string,
  expectedHanzi: string,
  expectedPinyin?: string,
  confidence = 0
): PronunciationResult => {
  const expN = normalizeHanzi(expectedHanzi);
  const actN = normalizeHanzi(transcript);

  let verdict: PronunciationVerdict = 'mismatch';
  if (expN && actN && expN === actN) {
    verdict = 'match';
  } else if (
    expN &&
    actN &&
    (actN.includes(expN) || expN.includes(actN))
  ) {
    // Contenu : le user a dit le mot dans une phrase, ou inversement.
    verdict = 'close';
  } else if (expectedPinyin) {
    // Fallback : on compare via pinyin si l'API a transcrit en pinyin/latin.
    const expP = normalizePinyin(expectedPinyin);
    const actP = normalizePinyin(transcript);
    if (expP && actP && expP === actP) {
      verdict = 'match';
    } else if (expP && actP && (actP.includes(expP) || expP.includes(actP))) {
      verdict = 'close';
    }
  }

  return {
    transcript,
    confidence,
    verdict,
    expectedNormalized: expN,
    actualNormalized: actN
  };
};

/**
 * Démarre une session de reconnaissance vocale unique. Renvoie une promise
 * qui résout dès qu'un résultat final arrive (ou rejette si timeout/erreur).
 *
 * @param expectedHanzi  Le hanzi attendu, utilisé pour le verdict.
 * @param expectedPinyin Pinyin attendu (fallback de comparaison).
 * @param opts.timeoutMs Annule automatiquement après N ms si rien (défaut 8s).
 * @param opts.onStart   Callback : l'écoute a démarré (afficher animation).
 * @param opts.onAbort   Callback : annulation externe via la fonction retournée.
 */
export interface RecognizeOptions {
  expectedHanzi: string;
  expectedPinyin?: string;
  timeoutMs?: number;
  onStart?: () => void;
}

export interface RecognizeHandle {
  promise: Promise<PronunciationResult>;
  /** Annule l'écoute en cours. La promise rejette avec PronunciationAbortedError. */
  cancel: () => void;
}

export const recognize = (opts: RecognizeOptions): RecognizeHandle => {
  const Ctor = getSpeechRecognitionCtor();
  if (!Ctor) {
    return {
      promise: Promise.reject(new PronunciationNotSupportedError()),
      cancel: () => {}
    };
  }

  const recog = new Ctor();
  recog.lang = 'zh-CN';
  recog.continuous = false;
  recog.interimResults = false;
  recog.maxAlternatives = 1;

  let timeoutId: number | null = null;
  let settled = false;

  const promise = new Promise<PronunciationResult>((resolve, reject) => {
    const cleanup = () => {
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
        timeoutId = null;
      }
      recog.onresult = null;
      recog.onerror = null;
      recog.onend = null;
      recog.onstart = null;
    };

    recog.onstart = () => {
      opts.onStart?.();
    };

    recog.onresult = (event: SpeechRecognitionEvent) => {
      const result = event.results[event.results.length - 1];
      if (!result.isFinal) return;
      const alt = result[0];
      settled = true;
      cleanup();
      resolve(
        compareTranscript(
          alt.transcript,
          opts.expectedHanzi,
          opts.expectedPinyin,
          typeof alt.confidence === 'number' ? alt.confidence : 0
        )
      );
    };

    recog.onerror = (event: SpeechRecognitionErrorEvent) => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(new Error(`SpeechRecognition error: ${event.error}`));
    };

    recog.onend = () => {
      // L'API peut clore sans résultat (silence). On laisse le timeout gérer.
      if (!settled) {
        // Si onresult n'a jamais déclenché et qu'on n'a pas non plus
        // d'erreur, on traite comme un timeout immédiat.
        settled = true;
        cleanup();
        reject(new PronunciationAbortedError('No speech detected'));
      }
    };

    // Démarrage différé pour laisser le UI poser les callbacks
    try {
      recog.start();
    } catch (err) {
      // Certains navigateurs lèvent si on appelle start() deux fois rapidement.
      settled = true;
      cleanup();
      reject(err);
      return;
    }

    timeoutId = window.setTimeout(() => {
      if (settled) return;
      settled = true;
      cleanup();
      try { recog.abort(); } catch { /* noop */ }
      reject(new PronunciationAbortedError('Recognition timed out'));
    }, opts.timeoutMs ?? 8000);
  });

  return {
    promise,
    cancel: () => {
      if (settled) return;
      settled = true;
      try { recog.abort(); } catch { /* noop */ }
    }
  };
};
