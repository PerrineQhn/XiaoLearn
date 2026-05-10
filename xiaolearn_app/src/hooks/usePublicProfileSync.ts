/**
 * usePublicProfileSync — task #44
 * --------------------------------
 * Synchronise le profil *public* de l'utilisateur courant (stats publiables
 * pour leaderboard + matchmaking) vers la collection Firestore `publicProfiles`.
 *
 * À appeler une seule fois au niveau racine (App.tsx) avec les stats
 * dérivées de `useDashboardState` + compteurs leçons/vocab + compteurs
 * batailles (lus depuis localStorage `xl_battle_stats_v1`).
 *
 * Politique de mise à jour :
 *   - Debounce interne : on ne fait un setDoc que si le snapshot JSON a
 *     réellement changé par rapport au dernier upload — évite de spammer
 *     Firestore à chaque re-render.
 *   - Merge=true sur toutes les écritures : on n'écrase jamais un champ
 *     manquant (si le cloud a weeklyXp et qu'on n'en envoie pas, il reste).
 *
 * Security rules requises (voir FIRESTORE_RULES.md) :
 *   - write : user authentifié ET resource.data.uid == request.auth.uid
 *   - read  : tout user authentifié (liste pour leaderboard)
 */

import { useEffect, useRef } from 'react';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import type { CommunityLanguage, PublicProfile } from '../types/community';
import { getRankFromXp, getWeekStart } from '../types/community';

export interface PublicProfileInput {
  totalXp: number;
  streakCurrent: number;
  streakBest: number;
  vocabSize: number;
  lessonsCompleted: number;
  weeklyXp: number;
  weekStart: string;
  battlesPlayed: number;
  battlesWon: number;
  battlesDraw: number;
  language: CommunityLanguage;
}

/**
 * Construit le payload Firestore à partir du user Auth + des stats courantes.
 * Factorisé pour être testable et réutilisé (par ex. en debug via bouton).
 */
export const buildPublicProfilePayload = (
  user: { uid: string; displayName: string | null; email: string | null; photoURL: string | null },
  stats: PublicProfileInput,
  nowISO: string = new Date().toISOString()
): PublicProfile => {
  const displayName =
    (user.displayName && user.displayName.trim()) ||
    (user.email ? user.email.split('@')[0] : null) ||
    'Apprenant';

  // Cohérence weekStart : si l'appelant a oublié de le rouler, on corrige ici
  // mais on *ne réinitialise pas* weeklyXp (le rollover se fait côté hook
  // dashboard). C'est juste un garde-fou défensif.
  const weekStart = stats.weekStart || getWeekStart();

  return {
    uid: user.uid,
    displayName,
    photoURL: user.photoURL || null,
    totalXp: Math.max(0, Math.floor(stats.totalXp) || 0),
    streakCurrent: Math.max(0, Math.floor(stats.streakCurrent) || 0),
    streakBest: Math.max(0, Math.floor(stats.streakBest) || 0),
    vocabSize: Math.max(0, Math.floor(stats.vocabSize) || 0),
    lessonsCompleted: Math.max(0, Math.floor(stats.lessonsCompleted) || 0),
    weeklyXp: Math.max(0, Math.floor(stats.weeklyXp) || 0),
    weekStart,
    battlesPlayed: Math.max(0, Math.floor(stats.battlesPlayed) || 0),
    battlesWon: Math.max(0, Math.floor(stats.battlesWon) || 0),
    battlesDraw: Math.max(0, Math.floor(stats.battlesDraw) || 0),
    lastActiveAt: nowISO,
    updatedAt: nowISO,
    language: stats.language
  };
};

export const usePublicProfileSync = (stats: PublicProfileInput) => {
  const { user } = useAuth();
  const lastSerializedRef = useRef<string>('');
  const lastUploadAtRef = useRef<number>(0);

  useEffect(() => {
    if (!user) return;

    // Compare les *champs de stats* — on ignore lastActiveAt qui change à
    // chaque tick. Sinon on uploaderait sans arrêt.
    const snapshot = JSON.stringify({
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      ...stats
    });

    if (snapshot === lastSerializedRef.current) {
      // Mais on force un "heartbeat" toutes les 5 minutes pour maintenir
      // `lastActiveAt` à jour → détection 'en ligne' côté matchmaker.
      const now = Date.now();
      if (now - lastUploadAtRef.current < 5 * 60 * 1000) return;
      // On tombe dans la branche upload ci-dessous pour le heartbeat.
    }

    lastSerializedRef.current = snapshot;
    lastUploadAtRef.current = Date.now();

    const payload = buildPublicProfilePayload(
      {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL
      },
      stats
    );

    // On écrit aussi un champ `serverActiveAt` avec serverTimestamp() pour
    // que les security rules puissent exploiter l'horloge serveur si besoin.
    setDoc(
      doc(db, 'publicProfiles', user.uid),
      { ...payload, serverActiveAt: serverTimestamp() },
      { merge: true }
    ).catch((err) => {
      // On laisse passer silencieusement : si les security rules bloquent
      // (settings Firestore pas encore mis à jour), on ne veut pas crasher
      // le reste de l'app. Log clair pour debug.
      console.warn('[publicProfileSync] setDoc failed — check Firestore rules', err);
    });
  }, [
    user,
    stats.totalXp,
    stats.streakCurrent,
    stats.streakBest,
    stats.vocabSize,
    stats.lessonsCompleted,
    stats.weeklyXp,
    stats.weekStart,
    stats.battlesPlayed,
    stats.battlesWon,
    stats.battlesDraw,
    stats.language
  ]);

  // Rang dérivé (exposé pour l'UI)
  const rank = getRankFromXp(stats.totalXp);
  return { rank };
};

export type UsePublicProfileSyncResult = ReturnType<typeof usePublicProfileSync>;
