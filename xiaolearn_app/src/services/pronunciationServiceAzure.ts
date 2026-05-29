/**
 * pronunciationServiceAzure.ts — reconnaissance + scoring via Azure.
 * --------------------------------------------------------------------------
 * Replace Web Speech API par un appel server-side à Azure Speech
 * Pronunciation Assessment. Avantages :
 *   - Marche sur Safari (vs Web Speech zh-CN cassé)
 *   - Marche sur les hanzi uniques (vs Web Speech qui abandonne)
 *   - Feedback pédagogique riche : score 0-100 + détail par phonème
 *     (utile pour dire "ton 3e ton sur 'ǐng' est trop plat")
 *
 * Pipeline :
 *   1. recordAudio() : capture WebM/Opus via MediaRecorder (3s par défaut,
 *      auto-stop sur silence prolongé pour ne pas attendre inutilement)
 *   2. POST { audioBase64, referenceText, language } → azureSpeechProxy
 *   3. Réception du score + détail
 *
 * Compatibilité :
 *   - Chrome/Edge/Brave/Firefox : MediaRecorder + WebM/Opus = built-in OK
 *   - Safari macOS 14+ / iOS 14.5+ : OK
 *   - Safari < 14 : MediaRecorder absent → throw
 */

import { auth } from '../firebase/config';

const PROXY_URL =
  'https://europe-west1-xiaolearn-db9e6.cloudfunctions.net/azureSpeechProxy';

/** Verdict normalisé pour rester compatible avec l'UI existante. */
export type AzureVerdict = 'match' | 'close' | 'mismatch';

export interface AzurePronunciationResult {
  /** Score global de prononciation (0-100). */
  pronunciationScore: number;
  /** Score d'exactitude (0-100). */
  accuracyScore: number;
  /** Score de fluidité (0-100). */
  fluencyScore: number;
  /** Score de complétude (0-100). */
  completenessScore: number;
  /** Texte reconnu (peut différer du référence si erreurs). */
  recognized: string;
  /** Détail par mot avec phonèmes. */
  words: Array<{
    word: string;
    accuracyScore: number;
    errorType: string;
    phonemes: Array<{ phoneme: string; accuracyScore: number }>;
  }>;
  /** Mapping vers verdict 3-classes pour UI legacy. */
  verdict: AzureVerdict;
}

/** Décide du verdict 3-classes selon le score global. */
function scoreToVerdict(score: number): AzureVerdict {
  if (score >= 80) return 'match';
  if (score >= 55) return 'close';
  return 'mismatch';
}

export class AzureSpeechNotSupportedError extends Error {
  constructor() {
    super('MediaRecorder not supported in this browser');
    this.name = 'AzureSpeechNotSupportedError';
  }
}

export class AzureSpeechAbortedError extends Error {
  constructor(message = 'Recording aborted') {
    super(message);
    this.name = 'AzureSpeechAbortedError';
  }
}

/** True si MediaRecorder + getUserMedia sont dispo. */
export function isAzureSpeechSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    typeof MediaRecorder !== 'undefined' &&
    typeof navigator !== 'undefined' &&
    !!navigator.mediaDevices?.getUserMedia
  );
}

interface RecordOptions {
  /** Durée max d'enregistrement en ms (défaut 4000). */
  maxDurationMs?: number;
  /** Threshold de détection de silence (0-255, défaut 8). */
  silenceThreshold?: number;
  /** Durée de silence continue avant auto-stop (défaut 1000ms). */
  silenceMs?: number;
}

/**
 * Capture audio depuis le micro. Auto-stop sur silence prolongé OU à
 * la fin du maxDurationMs. Retourne un Blob WebM/Opus.
 */
async function recordAudio(opts: RecordOptions = {}): Promise<Blob> {
  if (!isAzureSpeechSupported()) {
    throw new AzureSpeechNotSupportedError();
  }
  const maxMs = opts.maxDurationMs ?? 4000;
  const silenceThreshold = opts.silenceThreshold ?? 8;
  const silenceMs = opts.silenceMs ?? 1000;

  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  // Préférer WebM/Opus que Azure accepte directement
  const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
    ? 'audio/webm;codecs=opus'
    : MediaRecorder.isTypeSupported('audio/webm')
      ? 'audio/webm'
      : MediaRecorder.isTypeSupported('audio/ogg;codecs=opus')
        ? 'audio/ogg;codecs=opus'
        : '';
  const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
  const chunks: Blob[] = [];

  // Détection de silence en parallèle via AnalyserNode
  const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  const source = audioCtx.createMediaStreamSource(stream);
  const analyser = audioCtx.createAnalyser();
  analyser.fftSize = 256;
  source.connect(analyser);
  const data = new Uint8Array(analyser.frequencyBinCount);

  let silenceSince = 0;
  let speechStarted = false;
  let stopReason: 'silence' | 'maxDuration' | 'manual' = 'manual';

  return new Promise<Blob>((resolve, reject) => {
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };
    recorder.onstop = () => {
      try {
        audioCtx.close();
      } catch {
        /* noop */
      }
      stream.getTracks().forEach((t) => t.stop());
      const blob = new Blob(chunks, { type: mimeType || 'audio/webm' });
      if (blob.size === 0) {
        reject(new AzureSpeechAbortedError('Empty recording'));
        return;
      }
      resolve(blob);
    };
    recorder.onerror = (e) => {
      try {
        audioCtx.close();
      } catch {
        /* noop */
      }
      stream.getTracks().forEach((t) => t.stop());
      reject(new Error('MediaRecorder error: ' + (e as any).error?.name));
    };

    recorder.start();

    // Polling silence detection
    const tickMs = 100;
    const startMs = Date.now();
    const id = window.setInterval(() => {
      analyser.getByteFrequencyData(data);
      const avg = data.reduce((a, b) => a + b, 0) / data.length;
      const now = Date.now();
      const elapsed = now - startMs;

      if (avg > silenceThreshold) {
        speechStarted = true;
        silenceSince = now;
      }
      // Auto-stop : si on a déjà détecté de la parole, et qu'il y a eu
      // silenceMs sans son depuis, on coupe (l'utilisateur a fini de parler).
      if (
        speechStarted &&
        silenceSince &&
        now - silenceSince > silenceMs &&
        elapsed > 600 /* min 600ms pour éviter de couper trop tôt */
      ) {
        stopReason = 'silence';
        window.clearInterval(id);
        if (recorder.state === 'recording') recorder.stop();
        return;
      }
      // Auto-stop max duration
      if (elapsed > maxMs) {
        stopReason = 'maxDuration';
        window.clearInterval(id);
        if (recorder.state === 'recording') recorder.stop();
        return;
      }
    }, tickMs);
  });
}

/** Convertit Blob → base64 string (sans le préfixe data:...). */
function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => {
      const result = reader.result as string;
      const comma = result.indexOf(',');
      resolve(comma >= 0 ? result.slice(comma + 1) : result);
    };
    reader.readAsDataURL(blob);
  });
}

export interface AzureRecognizeOptions {
  referenceText: string;
  language?: string;
  maxDurationMs?: number;
}

/**
 * Pipeline complet : enregistre, envoie à Azure, retourne le score.
 * Throw AzureSpeechNotSupportedError si MediaRecorder absent.
 * Throw AzureSpeechAbortedError si enregistrement vide.
 * Throw Error si proxy/réseau/auth échoue.
 */
export async function recognizeWithAzure(
  opts: AzureRecognizeOptions
): Promise<AzurePronunciationResult> {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('Utilisateur non connecté');
  }
  const token = await user.getIdToken();

  const blob = await recordAudio({ maxDurationMs: opts.maxDurationMs });
  const audioBase64 = await blobToBase64(blob);
  // blob.type est ex. "audio/webm;codecs=opus" sur Chrome,
  // "audio/mp4" sur Safari → on l'envoie au serveur pour qu'il bascule le
  // bon Content-Type vers Azure (qui supporte les deux formats).
  const audioMimeType = blob.type || 'audio/webm';

  const resp = await fetch(PROXY_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      audioBase64,
      audioMimeType,
      referenceText: opts.referenceText,
      language: opts.language ?? 'zh-CN'
    })
  });

  if (!resp.ok) {
    const errBody = await resp.text().catch(() => '');
    throw new Error(`Azure proxy ${resp.status}: ${errBody.slice(0, 200)}`);
  }

  const data = await resp.json();
  if (!data.ok) {
    throw new AzureSpeechAbortedError(data.message || data.reason || 'no match');
  }

  const score = Number(data.pronunciationScore) || 0;
  return {
    pronunciationScore: score,
    accuracyScore: Number(data.accuracyScore) || 0,
    fluencyScore: Number(data.fluencyScore) || 0,
    completenessScore: Number(data.completenessScore) || 0,
    recognized: String(data.recognized || ''),
    words: Array.isArray(data.words) ? data.words : [],
    verdict: scoreToVerdict(score)
  };
}
