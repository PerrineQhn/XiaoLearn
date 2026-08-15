/**
 * useAudio — lecture audio depuis le CDN XiaoLearn
 *
 * Ordre de priorité des URLs (identique à l'app web) :
 *   1. R2 custom domain : https://audio.xiaolearn.com
 *   2. jsDelivr CDN     : https://cdn.jsdelivr.net/gh/PerrineQhn/XiaoLearn@main/xiaolearn_app/public
 *
 * Probe magic-bytes (4 premiers octets) pour distinguer un vrai audio d'une
 * réponse HTML 200 (SPA fallback Cloudflare Pages ou jsDelivr 404).
 *
 * Convention audio :
 *   - audio/examples/<fnv1a32-base36>.mp3  (phrases ≥ 2 chars, hashées)
 *   - audio/grammar/<slug>.mp3
 *   - audio/hsk1/hsk1_<hanzi>.mp3 / .wav
 *   - …hsk2…hsk7, hors-hsk
 *
 * Fallback final : expo-speech TTS (synthèse vocale).
 */
import { useRef, useState, useCallback } from 'react';
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';

// ─── CDN bases ────────────────────────────────────────────────────────────────
const R2_BASE  = 'https://audio.xiaolearn.com';
const CDN_BASE = 'https://cdn.jsdelivr.net/gh/PerrineQhn/XiaoLearn@main/xiaolearn_app/public';

// ─── FNV-1a 32 bits (identique au web) ───────────────────────────────────────
function fnv1a32base36(s: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(36);
}

// ─── Slug grammaire ───────────────────────────────────────────────────────────
function grammarSlug(hanzi: string): string {
  return hanzi.replace(/\.{2,}/g, '_').replace(/[\\/]/g, '-').replace(/\s+/g, '');
}

// ─── Candidats pour un chemin relatif (R2 d'abord, jsDelivr en fallback) ─────
function candidates(relPath: string): string[] {
  const p = relPath.replace(/^\/+/, '');
  const r2 = `${R2_BASE}/${p}`;
  const cdn = `${CDN_BASE}/${p}`;
  // mp3/wav alternates
  const expand = (url: string): string[] => {
    if (url.endsWith('.wav')) {
      const b = url.slice(0, -4);
      return [b + '.mp3', url];
    }
    if (url.endsWith('.mp3')) {
      const b = url.slice(0, -4);
      return [url, b + '.wav'];
    }
    return [url];
  };
  return [...expand(r2), ...expand(cdn)];
}

// ─── Tous les candidats pour un hanzi ────────────────────────────────────────
function buildCandidates(hanzi: string, explicit?: string | null): string[] {
  const all: string[] = [];
  const add = (rel: string) => all.push(...candidates(rel));

  if (explicit && !/^https?:\/\//i.test(explicit)) add(explicit);
  else if (explicit) all.push(explicit);

  const clean = hanzi.replace(/\d+$/, '').trim();
  // Phrases ≥ 2 chars → audio/examples/<hash>.mp3
  if (clean.length >= 2) add(`audio/examples/${fnv1a32base36(clean)}.mp3`);

  // Grammaire
  add(`audio/grammar/${grammarSlug(hanzi)}.mp3`);
  // HSK 1-7
  for (let n = 1; n <= 7; n++) add(`audio/hsk${n}/hsk${n}_${hanzi}.wav`);
  // Hors-HSK
  add(`audio/hors-hsk/hors-hsk_${hanzi}.mp3`);
  // HSK 7-9 variantes
  add(`audio/hsk7/hsk7-9_${hanzi}.wav`);
  add(`audio/hsk7/hsk-7-9_${hanzi}.wav`);

  // Dédupe
  return Array.from(new Set(all));
}

// ─── Probe magic-bytes ────────────────────────────────────────────────────────
const probeCache = new Map<string, boolean>();

async function probeUrl(url: string): Promise<boolean> {
  if (probeCache.has(url)) return probeCache.get(url)!;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 3000);
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: { Range: 'bytes=0-3' },
      signal: controller.signal,
    });
    if (!res.ok && res.status !== 206) {
      probeCache.set(url, false);
      return false;
    }
    const buf = await res.arrayBuffer();
    const b = new Uint8Array(buf);
    if (b.length < 3) { probeCache.set(url, false); return false; }
    const isMp3   = b[0] === 0x49 && b[1] === 0x44 && b[2] === 0x33; // ID3
    const isFrame = b[0] === 0xff && (b[1] & 0xe0) === 0xe0;          // MPEG
    const isWav   = b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46;  // RIFF
    const ok = isMp3 || isFrame || isWav;
    probeCache.set(url, ok);
    return ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

async function findFirstUrl(urls: string[]): Promise<string | null> {
  if (!urls.length) return null;
  const probes = urls.map(u => probeUrl(u));
  for (let i = 0; i < urls.length; i++) {
    if (await probes[i]) return urls[i];
  }
  return null;
}

// ─── Cache résolution hanzi → URL ────────────────────────────────────────────
const resolvedCache = new Map<string, string | null>();

async function resolveHanzi(hanzi: string, explicit?: string | null): Promise<string | null> {
  const key = `${hanzi}::${explicit ?? ''}`;
  if (resolvedCache.has(key)) return resolvedCache.get(key)!;
  const url = await findFirstUrl(buildCandidates(hanzi, explicit));
  resolvedCache.set(key, url);
  return url;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useAudio() {
  const soundRef = useRef<Audio.Sound | null>(null);
  const [playing, setPlaying] = useState(false);
  /** Jeton de séquence : incrémenté par stop(), il interrompt playHanziSeq. */
  const seqToken = useRef(0);

  const stop = useCallback(async () => {
    seqToken.current++;
    if (soundRef.current) {
      try { await soundRef.current.stopAsync(); } catch {}
      try { await soundRef.current.unloadAsync(); } catch {}
      soundRef.current = null;
    }
    try { Speech.stop(); } catch {}
    setPlaying(false);
  }, []);

  /**
   * Joue directement un chemin audio (relatif → résolution R2/jsDelivr avec
   * alternance mp3/wav + probe magic-bytes, comme playHanzi).
   * Renvoie false si rien n'a pu être joué, pour que l'appelant puisse
   * retomber sur la synthèse système.
   */
  const playUrl = useCallback(async (path: string): Promise<boolean> => {
    await stop();
    const url = /^https?:\/\//i.test(path)
      ? path
      : await findFirstUrl(candidates(path));
    if (!url) { setPlaying(false); return false; }
    try {
      await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
      const { sound } = await Audio.Sound.createAsync({ uri: url }, { shouldPlay: true });
      soundRef.current = sound;
      setPlaying(true);
      sound.setOnPlaybackStatusUpdate(s => {
        if (s.isLoaded && s.didJustFinish) {
          setPlaying(false);
          sound.unloadAsync().catch(() => {});
          soundRef.current = null;
        }
      });
      return true;
    } catch {
      setPlaying(false);
      return false;
    }
  }, [stop]);

  /**
   * Joue l'audio d'un hanzi.
   * Résolution : R2 → jsDelivr (avec probe magic-bytes), puis TTS fallback.
   */
  const playHanzi = useCallback(async (hanzi: string, explicit?: string | null) => {
    await stop();
    const url = await resolveHanzi(hanzi, explicit);
    if (url) {
      try {
        await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
        const { sound } = await Audio.Sound.createAsync({ uri: url }, { shouldPlay: true });
        soundRef.current = sound;
        setPlaying(true);
        sound.setOnPlaybackStatusUpdate(s => {
          if (s.isLoaded && s.didJustFinish) {
            setPlaying(false);
            sound.unloadAsync().catch(() => {});
            soundRef.current = null;
          }
        });
        return;
      } catch {}
    }
    // Fallback TTS
    setPlaying(true);
    Speech.speak(hanzi, {
      language: 'zh-CN',
      rate: 0.8,
      onDone:  () => setPlaying(false),
      onError: () => setPlaying(false),
    });
  }, [stop]);

  /**
   * Joue une réplique et ATTEND sa fin — brique de playHanziSeq.
   * `pitch` ne s'applique qu'au repli TTS : c'est lui qui différencie les
   * deux locuteurs d'un dialogue quand on n'a pas d'enregistrements joués
   * par des comédiens.
   */
  const playLineAwait = useCallback(async (hanzi: string, pitch = 1.0, explicitPath?: string | null): Promise<void> => {
    // Une piste dédiée (dialogues doublés par Azure, une voix par locuteur)
    // prime sur la résolution par hash des phrases d'exemple.
    const url = (explicitPath ? await findFirstUrl(candidates(explicitPath)) : null)
      ?? await resolveHanzi(hanzi);
    if (url) {
      try {
        await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
        const { sound } = await Audio.Sound.createAsync({ uri: url }, { shouldPlay: true });
        soundRef.current = sound;
        await new Promise<void>(resolve => {
          sound.setOnPlaybackStatusUpdate(s => {
            if (s.isLoaded && s.didJustFinish) {
              sound.unloadAsync().catch(() => {});
              if (soundRef.current === sound) soundRef.current = null;
              resolve();
            }
          });
        });
        return;
      } catch {}
    }
    await new Promise<void>(resolve => {
      Speech.speak(hanzi, {
        language: 'zh-CN', rate: 0.8, pitch,
        onDone: () => resolve(),
        onError: () => resolve(),
      });
    });
  }, []);

  /**
   * Joue les répliques d'un dialogue l'une après l'autre, en alternant le
   * timbre (via le pitch TTS) entre les deux locuteurs. Interrompue par
   * stop() — le jeton de séquence invalide la boucle en cours.
   */
  const playHanziSeq = useCallback(async (lines: string[], urls?: (string | null)[]) => {
    await stop();
    const token = ++seqToken.current;
    setPlaying(true);
    for (let i = 0; i < lines.length; i++) {
      if (seqToken.current !== token) return;   // stoppée entre deux répliques
      await playLineAwait(lines[i], i % 2 === 0 ? 1.0 : 0.82, urls?.[i]);
      // Petite respiration entre les répliques, comme sur les bandes du HSK.
      await new Promise(r => setTimeout(r, 420));
    }
    if (seqToken.current === token) setPlaying(false);
  }, [stop, playLineAwait]);

  return { playUrl, playHanzi, playHanziSeq, playing, stop };
}
