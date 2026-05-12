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
import { resolveAudioSrc, resolveRemoteAudioSrc } from './audio';

// ---------------------------------------------------------------------------
// Résolution d'URL : local (dev / déploiement complet) ↔ R2 (prod prunée)
// ---------------------------------------------------------------------------
// En dev, `public/audio/...` est servi par Vite, donc une URL relative comme
// `/audio/dialogues-slow/dlg-a1-hello/0.mp3` fonctionne. En prod sur Cloudflare
// Pages, `public/audio/` est souvent pruné (cf. scripts/prune-cloudflare-assets)
// et les fichiers sont sur R2 via VITE_AUDIO_BASE_URL. On bascule alors les URLs
// du manifest sur R2 pour éviter les 404.
const REMOTE_ONLY = (() => {
  const v = (import.meta as { env?: Record<string, unknown> }).env?.VITE_AUDIO_REMOTE_ONLY;
  return v === 'true' || v === '1' || v === true;
})();

function resolveManifestUrl(url: string): string {
  if (!url) return url;
  if (/^https?:\/\//i.test(url)) return url;
  // Manifests stockent des chemins commençant par "/audio/" — on retire le "/"
  // initial avant de demander à utils/audio de produire l'URL finale.
  const trimmed = url.startsWith('/') ? url.slice(1) : url;
  if (REMOTE_ONLY) {
    return resolveRemoteAudioSrc(trimmed) ?? resolveAudioSrc(trimmed);
  }
  return resolveAudioSrc(trimmed);
}

// ---------------------------------------------------------------------------
// Mode "shadowing" / lent
// ---------------------------------------------------------------------------
// Quand l'utilisateur active le toggle 🐢, on charge le manifest slow et on
// résout les URLs vers `/audio/{type}-slow/...` à la place de `/audio/{type}/`.
// Si le manifest slow n'existe pas (slow pas encore généré pour ce contenu),
// on retombe silencieusement sur le manifest normal — l'apprenant entendra
// la version normale plutôt que rien.

export type AudioSpeed = 'normal' | 'slow';

// ---------------------------------------------------------------------------
// Manifest dialogues
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

// Cache paresseux par speed (1 fetch normal + 1 fetch slow max par session).
const dialogueManifestCache: Record<AudioSpeed, Promise<DialogueAudioManifest> | null> = {
  normal: null,
  slow: null,
};

/** Indique si le manifest slow a été détecté (≥ 1 entrée). null = pas encore tenté. */
let dialogueSlowAvailableCache: boolean | null = null;

/**
 * Charge (une seule fois par speed, puis mise en cache) le manifest audio.
 * - speed='normal' (défaut) → /audio/dialogues/manifest.json
 * - speed='slow'            → /audio/dialogues-slow/manifest.json, avec
 *   fallback automatique sur le manifest normal si le slow n'existe pas
 *   ou est vide.
 */
export function loadDialogueManifest(speed: AudioSpeed = 'normal'): Promise<DialogueAudioManifest> {
  const cached = dialogueManifestCache[speed];
  if (cached) return cached;
  if (typeof fetch === 'undefined') {
    const empty = Promise.resolve({} as DialogueAudioManifest);
    dialogueManifestCache[speed] = empty;
    return empty;
  }

  // Le manifest est un fichier statique stocké aux côtés des MP3. Il faut
  // donc le fetcher depuis la MÊME base URL que les audios (R2 en prod, local
  // en dev), sinon le browser cherchera sur app.xiaolearn.com où le dossier
  // /audio/ a été pruné → 404.
  const path = speed === 'slow' ? '/audio/dialogues-slow/manifest.json' : '/audio/dialogues/manifest.json';
  const url = resolveManifestUrl(path);
  const promise = fetch(url, { cache: 'no-cache' })
    .then((r) => (r.ok ? (r.json() as Promise<DialogueAudioManifest>) : {}))
    .catch(() => ({} as DialogueAudioManifest))
    .then(async (manifest) => {
      if (speed === 'slow') {
        const hasEntries = Object.keys(manifest).length > 0;
        dialogueSlowAvailableCache = hasEntries;
        // Fallback : si slow vide/inexistant, on retombe sur le normal pour
        // ne pas casser la lecture audio quand le mode lent n'est pas dispo.
        if (!hasEntries) return loadDialogueManifest('normal');
      }
      return manifest;
    });

  dialogueManifestCache[speed] = promise;
  return promise;
}

/**
 * Renvoie true si le mode slow est disponible pour les dialogues
 * (le manifest slow contient au moins une entrée). Déclenche le chargement
 * du manifest slow s'il n'a pas encore été tenté.
 */
export async function isDialogueSlowAvailable(): Promise<boolean> {
  if (dialogueSlowAvailableCache !== null) return dialogueSlowAvailableCache;
  await loadDialogueManifest('slow');
  return dialogueSlowAvailableCache ?? false;
}

/**
 * Résout l'URL audio d'une ligne :
 *   1) valeur explicite `line.audioUrl` (override manuel),
 *   2) entrée du manifest Azure `manifest[dialogue.id].lines[idx]`,
 *   3) sinon null → la ligne est sautée silencieusement (pas de Web Speech).
 *
 * Note : la résolution slow vs normal se fait en amont via le choix du
 * manifest (cf. loadDialogueManifest(speed)). Cette fonction ne change pas.
 */
export function resolveDialogueAudioUrl(
  dialogue: Dialogue,
  idx: number,
  manifest: DialogueAudioManifest | null
): string | null {
  const line = dialogue.lines[idx];
  if (!line) return null;
  if (line.audioUrl) return resolveManifestUrl(line.audioUrl);
  const entryManifest = manifest?.[dialogue.id];
  const lines = entryManifest?.lines;
  if (lines && lines[idx]) return resolveManifestUrl(lines[idx]);
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

const readingManifestCache: Record<AudioSpeed, Promise<ReadingAudioManifest> | null> = {
  normal: null,
  slow: null,
};

let readingSlowAvailableCache: boolean | null = null;

/**
 * Charge (une seule fois par speed, mise en cache) le manifest audio des
 * readings. Même pattern que `loadDialogueManifest` : fallback silencieux
 * sur le normal si le slow n'a pas été généré.
 */
export function loadReadingManifest(speed: AudioSpeed = 'normal'): Promise<ReadingAudioManifest> {
  const cached = readingManifestCache[speed];
  if (cached) return cached;
  if (typeof fetch === 'undefined') {
    const empty = Promise.resolve({} as ReadingAudioManifest);
    readingManifestCache[speed] = empty;
    return empty;
  }

  // Manifest readings : même logique que dialogues — fetch via R2 base URL
  // pour fonctionner même quand public/audio/ a été pruné du build.
  const path = speed === 'slow' ? '/audio/readings-slow/manifest.json' : '/audio/readings/manifest.json';
  const url = resolveManifestUrl(path);
  const promise = fetch(url, { cache: 'no-cache' })
    .then((r) => (r.ok ? (r.json() as Promise<ReadingAudioManifest>) : {}))
    .catch(() => ({} as ReadingAudioManifest))
    .then(async (manifest) => {
      if (speed === 'slow') {
        const hasEntries = Object.keys(manifest).length > 0;
        readingSlowAvailableCache = hasEntries;
        if (!hasEntries) return loadReadingManifest('normal');
      }
      return manifest;
    });

  readingManifestCache[speed] = promise;
  return promise;
}

/** True si le manifest slow des readings contient au moins 1 entrée. */
export async function isReadingSlowAvailable(): Promise<boolean> {
  if (readingSlowAvailableCache !== null) return readingSlowAvailableCache;
  await loadReadingManifest('slow');
  return readingSlowAvailableCache ?? false;
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
  if (segments && segments[idx]) return resolveManifestUrl(segments[idx]);
  return null;
}

// ---------------------------------------------------------------------------
// Phrases — pas de manifest, juste des chemins en dur dans les datasets
// ---------------------------------------------------------------------------

/**
 * Réécrit une URL `audio/phrases/...mp3` vers `audio/phrases-slow/...mp3`.
 * Idempotent (sans effet sur une URL qui n'a pas le préfixe attendu) →
 * sûr à appeler aussi sur des URL externes ou déjà rerootées.
 */
export function toSlowPhraseAudioUrl(url: string | null | undefined): string | null {
  if (!url) return url ?? null;
  return url.replace(/\/audio\/phrases\//, '/audio/phrases-slow/');
}

/**
 * Vérifie en réseau (HEAD) si une variante slow existe pour une URL phrase
 * donnée. Utile pour griser le toggle si même un audio test n'est pas dispo.
 * Mis en cache pour éviter de hammer le serveur.
 */
let phraseSlowAvailableCache: boolean | null = null;
export async function isPhraseSlowAvailable(probeUrl: string): Promise<boolean> {
  if (phraseSlowAvailableCache !== null) return phraseSlowAvailableCache;
  if (typeof fetch === 'undefined') return false;
  const slowUrl = toSlowPhraseAudioUrl(probeUrl);
  if (!slowUrl) return false;
  try {
    const res = await fetch(slowUrl, { method: 'HEAD', cache: 'no-store' });
    phraseSlowAvailableCache = res.ok;
    return res.ok;
  } catch {
    phraseSlowAvailableCache = false;
    return false;
  }
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
