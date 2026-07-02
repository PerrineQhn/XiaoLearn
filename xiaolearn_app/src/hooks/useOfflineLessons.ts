/**
 * useOfflineLessons — tracking et précache des leçons hors-ligne
 * ----------------------------------------------------------------
 * Permet à l'utilisateur de marquer explicitement une leçon comme téléchargée
 * pour avoir tous ses audios disponibles hors connexion. Le service worker
 * (configuré dans vite.config.ts → workbox runtimeCaching) cache déjà les
 * audios écoutés en cache-first, mais cette opportuniste ne suffit pas pour
 * une première écoute hors-ligne ; le précache explicite garantit que les 50–200
 * audios d'une leçon sont tous récupérés en une fois.
 *
 * État persistant : localStorage clé `cl_offline_lessons_v1` (Set d'ids), sync
 * Firestore pour rappel cross-device (la liste, pas le cache lui-même puisque
 * le cache est local au navigateur).
 *
 * API :
 *   - `isDownloaded(lessonId)` — boolean
 *   - `downloadLesson(lesson, opts)` — collecte tous les audios + fetch
 *   - `forgetLesson(lessonId)` — retire le marquage (le cache SW est laissé,
 *     workbox le purgera selon ses règles d'expiration LRU)
 */

import { useCallback, useEffect, useState } from 'react';
import { useFirestoreSync } from './useFirestoreSync';
import { precacheHanziAudio, precacheAudioUrl } from '../utils/audio';

const STORAGE_KEY = 'cl_offline_lessons_v1';

/** Forme minimale du payload d'une leçon que ce hook sait traiter. */
export interface OfflineLessonPayload {
  id: string;
  /** Hanzi à mettre en cache (un par carte, mot, exemple…) */
  hanziList: string[];
  /** URLs audio explicites supplémentaires (dialogue lines, exemples avec audio:…). */
  explicitAudioUrls?: string[];
}

export interface DownloadProgress {
  lessonId: string;
  total: number;
  done: number;
  failed: number;
}

export interface UseOfflineLessonsReturn {
  /** Set d'ids de leçons marquées comme téléchargées. */
  downloadedIds: Set<string>;
  isDownloaded: (lessonId: string) => boolean;
  /** Progress actif pendant un téléchargement (null sinon). */
  progress: DownloadProgress | null;
  downloadLesson: (lesson: OfflineLessonPayload) => Promise<void>;
  forgetLesson: (lessonId: string) => void;
}

const readInitial = (): Set<string> => {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed.filter((x): x is string => typeof x === 'string'));
  } catch {
    return new Set();
  }
};

export function useOfflineLessons(): UseOfflineLessonsReturn {
  const [downloadedIds, setDownloadedIds] = useState<Set<string>>(readInitial);
  const [progress, setProgress] = useState<DownloadProgress | null>(null);

  // Sync Firestore (la liste seulement, pas les bytes du cache).
  const { saveToFirestore } = useFirestoreSync(STORAGE_KEY, (data) => {
    if (!Array.isArray(data)) return;
    setDownloadedIds((prev) => {
      const incoming = new Set(data.filter((x): x is string => typeof x === 'string'));
      // Merge : on ne retire pas localement ce que le serveur ne connaît pas
      // (l'utilisateur a peut-être téléchargé sur cet appareil-ci uniquement),
      // mais on ajoute ce que le serveur dit en plus. Évite la perte cross-device.
      let changed = false;
      const merged = new Set(prev);
      for (const id of incoming) {
        if (!merged.has(id)) {
          merged.add(id);
          changed = true;
        }
      }
      return changed ? merged : prev;
    });
  });

  // Persiste à chaque changement.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const arr = Array.from(downloadedIds);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
    } catch {
      /* quota */
    }
    saveToFirestore(arr);
  }, [downloadedIds, saveToFirestore]);

  const isDownloaded = useCallback(
    (lessonId: string) => downloadedIds.has(lessonId),
    [downloadedIds]
  );

  const downloadLesson = useCallback(async (lesson: OfflineLessonPayload) => {
    const hanziUnique = Array.from(new Set(lesson.hanziList.filter((h) => h && h.trim())));
    const explicitUrlsUnique = Array.from(
      new Set((lesson.explicitAudioUrls ?? []).filter((u) => u && u.trim()))
    );
    const total = hanziUnique.length + explicitUrlsUnique.length;
    if (total === 0) {
      // Rien à télécharger → on marque quand même comme "dispo offline".
      setDownloadedIds((prev) => {
        if (prev.has(lesson.id)) return prev;
        const next = new Set(prev);
        next.add(lesson.id);
        return next;
      });
      return;
    }

    setProgress({ lessonId: lesson.id, total, done: 0, failed: 0 });

    let done = 0;
    let failed = 0;
    const tick = () => {
      setProgress({ lessonId: lesson.id, total, done, failed });
    };

    // Batch de 5 fetchs en parallèle pour éviter de saturer le réseau / le SW.
    const all: Array<() => Promise<void>> = [];
    for (const hanzi of hanziUnique) {
      all.push(async () => {
        const ok = await precacheHanziAudio(hanzi);
        if (ok) done++;
        else failed++;
        tick();
      });
    }
    for (const url of explicitUrlsUnique) {
      all.push(async () => {
        const ok = await precacheAudioUrl(url);
        if (ok) done++;
        else failed++;
        tick();
      });
    }

    const BATCH = 5;
    for (let i = 0; i < all.length; i += BATCH) {
      const slice = all.slice(i, i + BATCH);
      await Promise.all(slice.map((fn) => fn()));
    }

    // Marque la leçon comme téléchargée dès qu'au moins 1 audio a été obtenu —
    // même si certains échouent (404 sur des hanzi sans MP3 pré-généré), le
    // gros du contenu est dispo et la leçon est "utilisable" hors-ligne.
    if (done > 0) {
      setDownloadedIds((prev) => {
        if (prev.has(lesson.id)) return prev;
        const next = new Set(prev);
        next.add(lesson.id);
        return next;
      });
    }

    // Garde le progress visible 1.5s pour que l'UI puisse afficher "✓ Téléchargée"
    // avant de disparaître.
    setTimeout(() => setProgress(null), 1500);
  }, []);

  const forgetLesson = useCallback((lessonId: string) => {
    setDownloadedIds((prev) => {
      if (!prev.has(lessonId)) return prev;
      const next = new Set(prev);
      next.delete(lessonId);
      return next;
    });
  }, []);

  return { downloadedIds, isDownloaded, progress, downloadLesson, forgetLesson };
}
