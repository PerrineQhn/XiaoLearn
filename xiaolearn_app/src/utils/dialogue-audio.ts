/**
 * dialogue-audio.ts — utilitaires partagés pour la lecture audio des dialogues.
 * -----------------------------------------------------------------------------
 * Centralise :
 *   - Le chargement du manifest Azure Neural TTS (/audio/dialogues/manifest.json)
 *     produit par scripts/generate-dialogue-audio.mjs.
 *   - Un helper `cancelTTS()` défensif (au cas où une synthèse vocale issue
 *     d'une version antérieure serait encore en cours dans un onglet vivant).
 *
 * Règle produit : tous les audios du site doivent être liés à un fichier
 * MP3/WAV pré-généré. Plus de fallback Web Speech — si le MP3 manque, la
 * ligne est sautée silencieusement.
 *
 * Utilisé par :
 *   - src/pages/FreeLearningPage.tsx (DialoguePlayer intégré)
 *   - src/pages/DialoguePageV2.tsx   (page standalone des dialogues)
 */

import type { Dialogue, ReadingText } from '../types/lesson-structure';

// ---------------------------------------------------------------------------
// Manifest
// ---------------------------------------------------------------------------

/**
 * Forme du manifest déposé dans /public/audio/dialogues/manifest.json :
 *   { [dialogueId]: { voices?: {speaker: voice}, lines?: string[] } }
 * Les `lines` sont des chemins servis par Vite ("/audio/dialogues/...").
 */
export interface DialogueAudioManifest {
  [dialogueId: string]: {
    voices?: Record<string, string>;
    lines?: string[];
  };
}

// Cache paresseux unique pour toute l'app — une seule requête réseau par session.
let manifestPromise: Promise<DialogueAudioManifest> | null = null;

/**
 * Charge (une seule fois, puis mise en cache) le manifest audio.
 * En dev sans TTS pré-généré, retourne un objet vide et les lecteurs
 * basculent sur la synthèse vocale du navigateur.
 */
export function loadDialogueManifest(): Promise<DialogueAudioManifest> {
  if (manifestPromise) return manifestPromise;
  if (typeof fetch === 'undefined') {
    manifestPromise = Promise.resolve({});
    return manifestPromise;
  }
  manifestPromise = fetch('/audio/dialogues/manifest.json', { cache: 'force-cache' })
    .then((r) => (r.ok ? (r.json() as Promise<DialogueAudioManifest>) : {}))
    .catch(() => ({} as DialogueAudioManifest));
  return manifestPromise;
}

/**
 * Résout l'URL audio d'une ligne :
 *   1) valeur explicite `line.audioUrl` (override manuel),
 *   2) entrée du manifest Azure `manifest[dialogue.id].lines[idx]`,
 *   3) sinon null → la ligne est sautée silencieusement (pas de Web Speech).
 */
export function resolveDialogueAudioUrl(
  dialogue: Dialogue,
  idx: number,
  manifest: DialogueAudioManifest | null
): string | null {
  const line = dialogue.lines[idx];
  if (!line) return null;
  if (line.audioUrl) return line.audioUrl;
  const entryManifest = manifest?.[dialogue.id];
  const lines = entryManifest?.lines;
  if (lines && lines[idx]) return lines[idx];
  return null;
}

// ---------------------------------------------------------------------------
// Manifest des textes de lecture (readings)
// ---------------------------------------------------------------------------

/**
 * Forme du manifest déposé dans /public/audio/readings/manifest.json :
 *   { [readingId]: { voice?: string, segments?: string[] } }
 * Les `segments` sont des chemins servis par Vite ("/audio/readings/...").
 */
export interface ReadingAudioManifest {
  [readingId: string]: {
    voice?: string;
    segments?: string[];
  };
}

let readingManifestPromise: Promise<ReadingAudioManifest> | null = null;

/** Charge (une seule fois, mise en cache) le manifest audio des readings. */
export function loadReadingManifest(): Promise<ReadingAudioManifest> {
  if (readingManifestPromise) return readingManifestPromise;
  if (typeof fetch === 'undefined') {
    readingManifestPromise = Promise.resolve({});
    return readingManifestPromise;
  }
  readingManifestPromise = fetch('/audio/readings/manifest.json', { cache: 'force-cache' })
    .then((r) => (r.ok ? (r.json() as Promise<ReadingAudioManifest>) : {}))
    .catch(() => ({} as ReadingAudioManifest));
  return readingManifestPromise;
}

/** URL audio d'un segment de lecture (null → segment sauté silencieusement). */
export function resolveReadingSegmentUrl(
  reading: ReadingText,
  idx: number,
  manifest: ReadingAudioManifest | null
): string | null {
  const seg = reading.segments[idx];
  if (!seg) return null;
  const entry = manifest?.[reading.id];
  const segments = entry?.segments;
  if (segments && segments[idx]) return segments[idx];
  return null;
}

// ---------------------------------------------------------------------------
// Cancel défensif
// ---------------------------------------------------------------------------

/**
 * Stoppe toute synthèse vocale résiduelle.
 *
 * Règle produit : tous les audios passent désormais par des MP3/WAV pré-générés,
 * plus de Web Speech. Cette fonction reste en place pour annuler d'éventuelles
 * utterances héritées d'une ancienne version encore vivante dans un onglet.
 */
export function cancelTTS(): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
  } catch {
    /* noop */
  }
}
