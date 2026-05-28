/**
 * geminiTtsService.ts — fallback TTS Gemini quand l'audio Azure pré-généré
 * manque pour un hanzi/phrase donné.
 * ---------------------------------------------------------------------------
 * Flow :
 *   1. `getTtsBlob(hanzi)` regarde d'abord le cache IndexedDB
 *   2. Si miss → POST vers la Cloud Function `geminiTtsProxy` (Firebase)
 *   3. Reçoit base64 PCM/WAV → décode → met en cache IndexedDB → renvoie Blob
 *   4. En parallèle, log le hanzi dans Firestore `tts_missing/{hanzi}` pour
 *      que le script `regen-tts-missing.mjs` génère ensuite la version Azure
 *      définitive et l'upload sur Firebase Storage
 *
 * Cache IndexedDB : DB `xl-tts-cache`, store `gemini`, clé = hanzi cleané.
 * Pas de TTL : Gemini retourne le même fichier pour le même input, donc inutile
 * de re-fetch. On purge si l'utilisateur clear son storage manuellement.
 */

import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

// ---------------------------------------------------------------------------
// IndexedDB helper (~50 lignes, pas de lib)
// ---------------------------------------------------------------------------

const DB_NAME = 'xl-tts-cache';
const STORE = 'gemini';
const DB_VERSION = 1;

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function idbGet(key: string): Promise<Blob | null> {
  try {
    const db = await openDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, 'readonly');
      const req = tx.objectStore(STORE).get(key);
      req.onsuccess = () => resolve((req.result as Blob | undefined) ?? null);
      req.onerror = () => reject(req.error);
    });
  } catch {
    return null;
  }
}

async function idbSet(key: string, blob: Blob): Promise<void> {
  try {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).put(blob, key);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch {
    // Silencieux : si IndexedDB n'est pas dispo (Safari privé, quota), on
    // n'écrit pas en cache mais le runtime fonctionne quand même.
  }
}

// ---------------------------------------------------------------------------
// Appel proxy Cloud Function
// ---------------------------------------------------------------------------

const TTS_PROXY_URL =
  import.meta.env.VITE_GEMINI_TTS_PROXY_URL ||
  'https://geminittsproxy-7vfsbm6ywa-ew.a.run.app';

interface TtsResponse {
  /** Base64-encoded WAV audio. */
  audioBase64: string;
  /** MIME type, ex: "audio/wav" ou "audio/L16; codecs=pcm; rate=24000". */
  mimeType: string;
}

async function fetchGeminiTts(hanzi: string): Promise<Blob | null> {
  const user = auth.currentUser;
  if (!user) {
    console.warn('[geminiTtsService] Pas d\'utilisateur connecté, fallback indisponible');
    return null;
  }
  const token = await user.getIdToken();
  if (!token) return null;
  try {
    const resp = await fetch(TTS_PROXY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ text: hanzi })
    });
    if (!resp.ok) {
      console.warn('[geminiTtsService] Proxy status', resp.status);
      return null;
    }
    const data = (await resp.json()) as TtsResponse;
    if (!data?.audioBase64) return null;
    // Décode base64 → Uint8Array → Blob
    const bin = atob(data.audioBase64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new Blob([bytes], { type: data.mimeType || 'audio/wav' });
  } catch (err) {
    console.warn('[geminiTtsService] Fetch error', err);
    return null;
  }
}

// ---------------------------------------------------------------------------
// Log Firestore (best-effort, ne bloque pas le retour audio)
// ---------------------------------------------------------------------------

async function logMissingHanzi(hanzi: string): Promise<void> {
  try {
    await setDoc(
      doc(db, 'tts_missing', hanzi),
      {
        hanzi,
        firstReportedAt: serverTimestamp(),
        lastReportedAt: serverTimestamp(),
        // Incrémenté à chaque call (utile pour prioriser le batch Azure sur
        // les hanzi les plus demandés)
        requestCount: 1,
        resolved: false
      },
      { merge: true }
    );
  } catch (err) {
    // Silencieux : on ne veut pas casser la lecture audio si Firestore est down
    console.warn('[geminiTtsService] Firestore log failed', err);
  }
}

// ---------------------------------------------------------------------------
// API publique : un seul point d'entrée
// ---------------------------------------------------------------------------

/**
 * Récupère un Blob audio Gemini TTS pour le hanzi donné. Cache IndexedDB en
 * priorité, sinon appel API. Retourne null si tout échoue (offline, quota, etc).
 */
export async function getGeminiTtsBlob(hanzi: string): Promise<Blob | null> {
  const cleanHanzi = hanzi.trim();
  if (!cleanHanzi) return null;

  // 1) Cache
  const cached = await idbGet(cleanHanzi);
  if (cached) return cached;

  // 2) Fetch
  const blob = await fetchGeminiTts(cleanHanzi);
  if (!blob) return null;

  // 3) Side-effects : cache + log (fire-and-forget)
  void idbSet(cleanHanzi, blob);
  void logMissingHanzi(cleanHanzi);

  return blob;
}

/** Joue directement un Blob audio (helper utilisé par playHanziAudio). */
export async function playBlobAudio(blob: Blob): Promise<HTMLAudioElement> {
  const url = URL.createObjectURL(blob);
  const audio = new Audio();
  audio.src = url;
  // Libère l'URL Blob quand l'audio est terminé pour éviter une fuite mémoire
  audio.addEventListener('ended', () => URL.revokeObjectURL(url), { once: true });
  audio.addEventListener('error', () => URL.revokeObjectURL(url), { once: true });
  await audio.play();
  return audio;
}
