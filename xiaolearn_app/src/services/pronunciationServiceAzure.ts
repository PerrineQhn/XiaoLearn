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

/**
 * Convertit un blob WebM/Opus (ou autre format MediaRecorder) en WAV PCM
 * 16 kHz mono. Azure Speech REST a un meilleur support du WAV que du
 * WebM/Opus, et certains conteneurs MediaRecorder font échouer son décodage
 * (transcription "." sans scoring de prononciation).
 *
 * Étapes :
 *   1. decodeAudioData() — décode le conteneur en AudioBuffer float32
 *   2. resample à 16 kHz si nécessaire (Azure attend 16 kHz)
 *   3. downmix stéréo → mono en moyennant les canaux
 *   4. quantize float32 → int16 PCM
 *   5. emballe dans un header WAV (44 bytes) + payload
 */
async function blobToWav16kMono(blob: Blob): Promise<Blob> {
  const arrayBuffer = await blob.arrayBuffer();
  // AudioContext peut être créé à n'importe quel sample rate pour le décodage,
  // mais ses sorties seront à ce taux. On crée à 16 kHz pour bénéficier du
  // resampling natif du navigateur.
  const Ctx =
    (window.AudioContext as typeof AudioContext) ||
    ((window as any).webkitAudioContext as typeof AudioContext);
  // Certains navigateurs (Safari) n'acceptent pas un sampleRate custom au
  // constructeur. On fallback sur le sampleRate par défaut puis resample
  // manuellement.
  let audioCtx: AudioContext;
  try {
    audioCtx = new Ctx({ sampleRate: 16000 });
  } catch {
    audioCtx = new Ctx();
  }

  // decodeAudioData copie le buffer en interne, on peut le passer tel quel
  const decoded = await audioCtx.decodeAudioData(arrayBuffer.slice(0));

  // Downmix mono
  const channels = decoded.numberOfChannels;
  const length = decoded.length;
  const inputMono = new Float32Array(length);
  if (channels === 1) {
    inputMono.set(decoded.getChannelData(0));
  } else {
    const ch0 = decoded.getChannelData(0);
    const ch1 = decoded.getChannelData(1);
    for (let i = 0; i < length; i++) {
      inputMono[i] = (ch0[i] + ch1[i]) / 2;
    }
  }

  // Resample à 16 kHz si besoin (interpolation linéaire — suffisant pour STT)
  const targetRate = 16000;
  let resampled: Float32Array;
  if (decoded.sampleRate === targetRate) {
    resampled = inputMono;
  } else {
    const ratio = decoded.sampleRate / targetRate;
    const newLen = Math.floor(length / ratio);
    resampled = new Float32Array(newLen);
    for (let i = 0; i < newLen; i++) {
      const srcIdx = i * ratio;
      const idx0 = Math.floor(srcIdx);
      const idx1 = Math.min(idx0 + 1, length - 1);
      const frac = srcIdx - idx0;
      resampled[i] = inputMono[idx0] * (1 - frac) + inputMono[idx1] * frac;
    }
  }

  try {
    audioCtx.close();
  } catch {
    /* noop */
  }

  // Quantize Float32 [-1,1] → Int16 PCM
  const pcm = new Int16Array(resampled.length);
  for (let i = 0; i < resampled.length; i++) {
    const s = Math.max(-1, Math.min(1, resampled[i]));
    pcm[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
  }

  // Construit le header WAV (44 bytes) + payload PCM
  const dataSize = pcm.length * 2;
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);
  // "RIFF"
  view.setUint8(0, 0x52); view.setUint8(1, 0x49); view.setUint8(2, 0x46); view.setUint8(3, 0x46);
  view.setUint32(4, 36 + dataSize, true);
  // "WAVE"
  view.setUint8(8, 0x57); view.setUint8(9, 0x41); view.setUint8(10, 0x56); view.setUint8(11, 0x45);
  // "fmt "
  view.setUint8(12, 0x66); view.setUint8(13, 0x6d); view.setUint8(14, 0x74); view.setUint8(15, 0x20);
  view.setUint32(16, 16, true); // PCM chunk size
  view.setUint16(20, 1, true); // PCM format
  view.setUint16(22, 1, true); // mono
  view.setUint32(24, targetRate, true);
  view.setUint32(28, targetRate * 2, true); // byte rate
  view.setUint16(32, 2, true); // block align
  view.setUint16(34, 16, true); // bits per sample
  // "data"
  view.setUint8(36, 0x64); view.setUint8(37, 0x61); view.setUint8(38, 0x74); view.setUint8(39, 0x61);
  view.setUint32(40, dataSize, true);
  // Payload
  const pcmBytes = new Uint8Array(buffer, 44);
  const pcmView = new DataView(pcm.buffer);
  for (let i = 0; i < pcm.length; i++) {
    pcmBytes[i * 2] = pcmView.getUint8(i * 2);
    pcmBytes[i * 2 + 1] = pcmView.getUint8(i * 2 + 1);
  }

  return new Blob([buffer], { type: 'audio/wav' });
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

  const rawBlob = await recordAudio({ maxDurationMs: opts.maxDurationMs });
  // Conversion en WAV PCM 16 kHz mono. Sans ça, Azure renvoie "Success"
  // mais avec une transcription "." et sans scoring de prononciation
  // (incompatibilité du WebM produit par MediaRecorder avec le décodeur
  // Azure REST).
  let wavBlob: Blob;
  try {
    wavBlob = await blobToWav16kMono(rawBlob);
  } catch (err) {
    console.warn('[azureSpeech] WAV conversion failed, sending raw blob', err);
    wavBlob = rawBlob;
  }
  const audioBase64 = await blobToBase64(wavBlob);
  const audioMimeType = wavBlob.type || 'audio/wav';

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
