/**
 * useAvatarEvolution — détecte le passage d'un palier d'avatar.
 *
 * On mémorise le dernier palier *montré*, pas le dernier atteint : si l'app
 * est fermée avant la fin de l'animation, la célébration se rejoue. Rater sa
 * propre évolution serait plus frustrant que de la revoir une fois.
 *
 * Le palier est déduit des leçons terminées, donc il monte aussi bien après
 * une leçon qu'après une synchronisation depuis un autre appareil.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { stageForCompleted } from '@/data/avatarEvolution';

const KEY = 'xl_avatar_stage_seen_v1';

export interface StageJump { from: number; to: number }

export function useAvatarEvolution(completedLessonIds: string[]) {
  const [pending, setPending] = useState<StageJump | null>(null);
  const seen = useRef<number | null>(null);
  const alive = useRef(true);

  useEffect(() => {
    alive.current = true;
    return () => { alive.current = false; };
  }, []);

  useEffect(() => {
    const stage = stageForCompleted(completedLessonIds);

    (async () => {
      if (seen.current === null) {
        const raw = await AsyncStorage.getItem(KEY).catch(() => null);
        const stored = raw === null ? NaN : Number(raw);
        if (!alive.current) return;
        if (!Number.isFinite(stored)) {
          // Première ouverture depuis l'arrivée des paliers : on prend le
          // niveau courant pour référence, sans rien célébrer rétroactivement.
          seen.current = stage;
          await AsyncStorage.setItem(KEY, String(stage)).catch(() => {});
          return;
        }
        seen.current = stored;
      }

      if (alive.current && stage > (seen.current ?? stage)) {
        setPending({ from: seen.current as number, to: stage });
      }
    })();
  }, [completedLessonIds]);

  /** À appeler quand l'animation est terminée ou passée. */
  const acknowledge = useCallback(async () => {
    const to = pending?.to;
    setPending(null);
    if (to !== undefined) {
      seen.current = to;
      await AsyncStorage.setItem(KEY, String(to)).catch(() => {});
    }
  }, [pending]);

  return { pending, acknowledge };
}
