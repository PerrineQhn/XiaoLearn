/**
 * useModeration — blocage d'utilisateurs et signalement de conversations.
 *
 * Exigé par la guideline 1.2 de l'App Store : une app où des utilisateurs
 * s'écrivent doit permettre de signaler un abus et de bloquer son auteur.
 * Mais c'est surtout la condition pour qu'une messagerie reste vivable.
 *
 * ## Ce que « bloquer » veut dire ici
 *
 * Le blocage est UNILATÉRAL et s'applique côté lecteur : les conversations
 * avec un utilisateur bloqué disparaissent de MA liste, je ne peux plus lui
 * écrire ni en ouvrir une nouvelle. L'autre n'est pas notifié — le lui dire
 * inviterait aux représailles, et c'est la convention de toutes les
 * messageries. Ses messages continuent techniquement d'exister ; ils ne
 * m'atteignent plus.
 *
 * ## Où vit la liste
 *
 * `users/{uid}/private/moderation`, document `{ blockedUids: string[] }`.
 * Sous-collection plutôt que champ du document principal : la règle Firestore
 * `users/{userId}/{document=**}` la couvre déjà (lecture/écriture par son
 * propriétaire seul), et le document principal est déjà chargé — la liste des
 * bloqués n'a pas à transiter à chaque synchronisation de la progression.
 *
 * ## Le signalement emporte son contexte
 *
 * Un signalement copie les derniers messages dans le document déposé : les
 * règles interdisent — à juste titre — à quiconque d'autre que les deux
 * participants de lire une conversation, la modération ne pourrait donc pas
 * aller vérifier sur pièce. C'est le signaleur qui apporte la pièce.
 */
import { useCallback, useEffect, useState } from 'react';
import {
  doc, onSnapshot, setDoc, addDoc, collection,
  arrayUnion, arrayRemove, serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/firebase/config';
import { useAuth } from '@/contexts/AuthContext';
import type { ConvMessage } from '@/hooks/useConversations';

/** Motifs proposés — libres mais bornés, la règle limite à 100 caractères. */
export type ReportReason = 'harassment' | 'spam' | 'inappropriate' | 'other';

export function useModeration() {
  const { user } = useAuth();
  const [blockedUids, setBlockedUids] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !db) { setBlockedUids([]); setLoading(false); return; }
    const ref = doc(db, 'users', user.uid, 'private', 'moderation');
    const unsub = onSnapshot(ref, snap => {
      const list = snap.exists() ? snap.data().blockedUids : null;
      setBlockedUids(Array.isArray(list) ? list.filter(x => typeof x === 'string') : []);
      setLoading(false);
    }, () => setLoading(false));
    return unsub;
  }, [user]);

  const isBlocked = useCallback(
    (uid: string | null | undefined) => !!uid && blockedUids.includes(uid),
    [blockedUids],
  );

  const block = useCallback(async (uid: string): Promise<boolean> => {
    if (!user || !db || !uid || uid === user.uid) return false;
    try {
      await setDoc(
        doc(db, 'users', user.uid, 'private', 'moderation'),
        { blockedUids: arrayUnion(uid), updatedAt: serverTimestamp() },
        { merge: true },
      );
      return true;
    } catch (e) {
      console.warn('[useModeration] block', e);
      return false;
    }
  }, [user]);

  const unblock = useCallback(async (uid: string): Promise<boolean> => {
    if (!user || !db || !uid) return false;
    try {
      await setDoc(
        doc(db, 'users', user.uid, 'private', 'moderation'),
        { blockedUids: arrayRemove(uid), updatedAt: serverTimestamp() },
        { merge: true },
      );
      return true;
    } catch (e) {
      console.warn('[useModeration] unblock', e);
      return false;
    }
  }, [user]);

  /**
   * Dépose un signalement, avec les derniers messages comme contexte.
   *
   * Les textes sont tronqués à 500 caractères et la liste à 20 entrées —
   * miroir exact de la règle Firestore, pour qu'un signalement d'une longue
   * conversation ne soit pas rejeté au moment précis où l'on en a besoin.
   */
  const report = useCallback(async (params: {
    reportedUid: string;
    reportedName?: string;
    convId?: string;
    reason: ReportReason;
    messages?: ConvMessage[];
  }): Promise<boolean> => {
    if (!user || !db || !params.reportedUid || params.reportedUid === user.uid) return false;
    try {
      await addDoc(collection(db, 'reports'), {
        reporterUid: user.uid,
        reportedUid: params.reportedUid,
        reportedName: params.reportedName ?? null,
        convId: params.convId ?? null,
        reason: params.reason,
        status: 'open',
        createdAt: serverTimestamp(),
        messages: (params.messages ?? []).slice(-20).map(m => ({
          senderId: m.senderId,
          text: m.text.slice(0, 500),
          sentAt: m.sentAt,
        })),
      });
      return true;
    } catch (e) {
      console.warn('[useModeration] report', e);
      return false;
    }
  }, [user]);

  return { blockedUids, isBlocked, block, unblock, report, loading };
}
