/**
 * useDialogueAudio — audio Azure Neural TTS des dialogues.
 *
 * Le web génère, via scripts/generate-dialogue-audio.mjs, un MP3 par réplique
 * avec UNE VOIX PAR LOCUTEUR (小明 et 王丽 n'ont pas la même), et publie un
 * manifest décrivant tout ça. Ces fichiers sont sur le même CDN que le reste
 * de l'audio mobile — ils étaient juste inutilisés ici, d'où la voix unique
 * de la synthèse système.
 *
 * Manifest : { [dialogueId]: { voices?: {locuteur: voix}, lines?: string[] } }
 */
import { useCallback, useEffect, useRef, useState } from 'react';

const R2_BASE = 'https://audio.xiaolearn.com';
const CDN_BASE = 'https://cdn.jsdelivr.net/gh/PerrineQhn/XiaoLearn@main/xiaolearn_app/public';

const MANIFEST_PATH = '/audio/dialogues/manifest.json';

export interface DialogueAudioEntry {
  voices?: Record<string, string>;
  lines?: string[];
}
export type DialogueAudioManifest = Record<string, DialogueAudioEntry>;

// Un seul chargement par session, partagé par tous les écrans.
let manifestPromise: Promise<DialogueAudioManifest> | null = null;

async function fetchManifest(): Promise<DialogueAudioManifest> {
  for (const base of [R2_BASE, CDN_BASE]) {
    try {
      const res = await fetch(base + MANIFEST_PATH);
      if (!res.ok) continue;
      const json = (await res.json()) as DialogueAudioManifest;
      if (json && typeof json === 'object') return json;
    } catch {
      // base suivante
    }
  }
  return {};
}

export function loadDialogueManifest(): Promise<DialogueAudioManifest> {
  if (!manifestPromise) {
    manifestPromise = fetchManifest().catch(() => ({}));
  }
  return manifestPromise;
}

/**
 * Expose l'entrée du manifest pour un dialogue, et le chemin audio d'une
 * réplique donnée. `null` si l'audio n'a pas été généré : l'appelant peut
 * alors retomber sur la synthèse système.
 */
export function useDialogueAudio(dialogueId: string | undefined) {
  const [entry, setEntry] = useState<DialogueAudioEntry | null>(null);
  const [ready, setReady] = useState(false);
  const alive = useRef(true);

  useEffect(() => {
    alive.current = true;
    if (!dialogueId) { setReady(true); return; }
    loadDialogueManifest().then(m => {
      if (!alive.current) return;
      setEntry(m[dialogueId] ?? null);
      setReady(true);
    });
    return () => { alive.current = false; };
  }, [dialogueId]);

  /** Chemin relatif du MP3 d'une réplique, ou null s'il n'existe pas. */
  const lineUrl = useCallback(
    (index: number): string | null => entry?.lines?.[index] ?? null,
    [entry],
  );

  /** Voix Azure attribuée à un locuteur — sert à afficher qui parle. */
  const voiceOf = useCallback(
    (speaker: string): string | undefined => entry?.voices?.[speaker],
    [entry],
  );

  return { entry, ready, lineUrl, voiceOf, hasAudio: !!entry?.lines?.length };
}

/** Vrai si la voix Azure est une voix féminine connue du catalogue XiaoLearn. */
export function isFemaleVoice(voice: string | undefined): boolean {
  if (!voice) return false;
  return /Xiaoxiao|Xiaoyi|Xiaochen|Xiaohan|Xiaomeng|Xiaomo|Xiaoqiu|Xiaorui|Xiaoshuang|Xiaoxuan|Xiaoyan|Xiaoyou|Xiaozhen/i.test(voice);
}
