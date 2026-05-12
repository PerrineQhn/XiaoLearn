/**
 * useConversations — gestion des fils 1-1 (Firestore)
 * ----------------------------------------------------
 * Backend :
 *   conversations/{convId}                — doc parent
 *   conversations/{convId}/messages/{id}  — messages
 *
 * convId déterministe = sort(uidA, uidB).join('_').
 *
 * Lectures :
 *   - Liste des convs où l'utilisateur est participant, triées par
 *     `lastMessageAt` desc, temps réel via onSnapshot.
 *
 * Écritures :
 *   - `openOrCreateConversation(otherUid, otherName)` : crée le doc
 *     s'il n'existe pas, sinon retourne l'existant.
 *   - `sendMessage(convId, text)` : crée un message + met à jour
 *     `lastMessage` / `lastMessageAt` / `unreadCount` côté doc parent.
 *   - `markRead(convId)` : reset unreadCount[currentUser] à 0.
 */

import { useCallback, useEffect, useState } from 'react';
import {
  collection,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
  setDoc,
  addDoc,
  updateDoc,
  increment,
  getDoc
} from 'firebase/firestore';
import type { Unsubscribe } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import type {
  Conversation,
  ConversationMessage,
  ConversationParticipant
} from '../types/community-feedback';
import { tsToIso, buildConversationId } from '../types/community-feedback';

const CONVS_COLLECTION = 'conversations';

interface ConversationsState {
  conversations: Conversation[];
  loading: boolean;
  error: string | null;
}

export interface UseConversationsReturn {
  conversations: Conversation[];
  loading: boolean;
  error: string | null;
  openOrCreateConversation: (
    other: ConversationParticipant
  ) => Promise<string | null>;
  sendMessage: (convId: string, text: string) => Promise<boolean>;
  markRead: (convId: string) => Promise<void>;
}

export const useConversations = (): UseConversationsReturn => {
  const { user } = useAuth();
  const [state, setState] = useState<ConversationsState>({
    conversations: [],
    loading: true,
    error: null
  });

  // ------------------------------------------------------------------
  // Subscribe : mes conversations
  // ------------------------------------------------------------------
  useEffect(() => {
    if (!user) {
      setState({ conversations: [], loading: false, error: null });
      return;
    }
    let unsub: Unsubscribe | null = null;
    try {
      const q = query(
        collection(db, CONVS_COLLECTION),
        where('participantIds', 'array-contains', user.uid),
        orderBy('lastMessageAt', 'desc')
      );
      unsub = onSnapshot(
        q,
        (snap) => {
          const conversations: Conversation[] = snap.docs.map((d) => {
            const data = d.data() as Record<string, unknown>;
            return {
              id: d.id,
              participantIds: Array.isArray(data.participantIds)
                ? (data.participantIds as string[])
                : [],
              participantNames:
                (data.participantNames as Record<string, string>) ?? {},
              participantAvatars: data.participantAvatars as
                | Record<string, string>
                | undefined,
              lastMessage: data.lastMessage
                ? {
                    text: String((data.lastMessage as Record<string, unknown>).text ?? ''),
                    senderId: String(
                      (data.lastMessage as Record<string, unknown>).senderId ?? ''
                    ),
                    sentAt: tsToIso(
                      (data.lastMessage as Record<string, unknown>).sentAt as never
                    )
                  }
                : undefined,
              lastMessageAt: tsToIso(data.lastMessageAt as never),
              unreadCount: (data.unreadCount as Record<string, number>) ?? {},
              createdAt: tsToIso(data.createdAt as never)
            };
          });
          setState({ conversations, loading: false, error: null });
        },
        (err) => {
          console.error('[useConversations] subscribe error', err);
          setState({
            conversations: [],
            loading: false,
            error: err.message || 'Erreur de chargement'
          });
        }
      );
    } catch (err) {
      console.error('[useConversations] init error', err);
      setState({
        conversations: [],
        loading: false,
        error: 'Erreur d\'initialisation'
      });
    }
    return () => {
      if (unsub) unsub();
    };
  }, [user]);

  // ------------------------------------------------------------------
  // openOrCreateConversation
  // ------------------------------------------------------------------
  const openOrCreateConversation = useCallback(
    async (other: ConversationParticipant): Promise<string | null> => {
      if (!user) return null;
      if (other.uid === user.uid) return null;
      const convId = buildConversationId(user.uid, other.uid);
      const convRef = doc(db, CONVS_COLLECTION, convId);
      try {
        const snap = await getDoc(convRef);
        if (!snap.exists()) {
          const myName = user.displayName ?? user.email ?? 'Toi';
          const nowIso = new Date().toISOString();
          await setDoc(convRef, {
            participantIds: [user.uid, other.uid],
            participantNames: {
              [user.uid]: myName,
              [other.uid]: other.displayName
            },
            participantAvatars: other.avatarUrl
              ? { [other.uid]: other.avatarUrl }
              : {},
            lastMessageAt: serverTimestamp(),
            unreadCount: { [user.uid]: 0, [other.uid]: 0 },
            createdAt: serverTimestamp(),
            createdAtIso: nowIso
          });
        }
        return convId;
      } catch (err) {
        console.error('[useConversations] openOrCreate error', err);
        return null;
      }
    },
    [user]
  );

  // ------------------------------------------------------------------
  // sendMessage
  // ------------------------------------------------------------------
  const sendMessage = useCallback(
    async (convId: string, text: string): Promise<boolean> => {
      if (!user) return false;
      const trimmed = text.trim();
      if (!trimmed) return false;
      const convRef = doc(db, CONVS_COLLECTION, convId);
      const msgsRef = collection(db, CONVS_COLLECTION, convId, 'messages');
      try {
        const convSnap = await getDoc(convRef);
        if (!convSnap.exists()) throw new Error('Conversation introuvable.');
        const data = convSnap.data();
        const participantIds: string[] = Array.isArray(data.participantIds)
          ? data.participantIds
          : [];
        const otherUid = participantIds.find((p) => p !== user.uid);

        await addDoc(msgsRef, {
          text: trimmed,
          senderId: user.uid,
          senderName: user.displayName ?? user.email ?? 'Toi',
          sentAt: serverTimestamp(),
          readBy: [user.uid]
        });

        const updates: Record<string, unknown> = {
          lastMessage: {
            text: trimmed.slice(0, 200),
            senderId: user.uid,
            sentAt: serverTimestamp()
          },
          lastMessageAt: serverTimestamp()
        };
        if (otherUid) {
          updates[`unreadCount.${otherUid}`] = increment(1);
        }
        await updateDoc(convRef, updates);
        return true;
      } catch (err) {
        console.error('[useConversations] sendMessage error', err);
        return false;
      }
    },
    [user]
  );

  // ------------------------------------------------------------------
  // markRead
  // ------------------------------------------------------------------
  const markRead = useCallback(
    async (convId: string): Promise<void> => {
      if (!user) return;
      try {
        await updateDoc(doc(db, CONVS_COLLECTION, convId), {
          [`unreadCount.${user.uid}`]: 0
        });
      } catch (err) {
        // Pas critique
        console.warn('[useConversations] markRead error', err);
      }
    },
    [user]
  );

  return {
    conversations: state.conversations,
    loading: state.loading,
    error: state.error,
    openOrCreateConversation,
    sendMessage,
    markRead
  };
};

// ============================================================================
//  useMessages — messages d'une conv unique
// ============================================================================

export interface UseMessagesReturn {
  messages: ConversationMessage[];
  loading: boolean;
  error: string | null;
}

export const useMessages = (convId: string | null): UseMessagesReturn => {
  const { user } = useAuth();
  const [state, setState] = useState<{
    messages: ConversationMessage[];
    loading: boolean;
    error: string | null;
  }>({ messages: [], loading: true, error: null });

  useEffect(() => {
    if (!convId || !user) {
      setState({ messages: [], loading: false, error: null });
      return;
    }
    let unsub: Unsubscribe | null = null;
    try {
      const q = query(
        collection(db, CONVS_COLLECTION, convId, 'messages'),
        orderBy('sentAt', 'asc')
      );
      unsub = onSnapshot(
        q,
        (snap) => {
          const messages: ConversationMessage[] = snap.docs.map((d) => {
            const data = d.data() as Record<string, unknown>;
            return {
              id: d.id,
              text: String(data.text ?? ''),
              senderId: String(data.senderId ?? ''),
              senderName: String(data.senderName ?? ''),
              sentAt: tsToIso(data.sentAt as never),
              readBy: Array.isArray(data.readBy) ? (data.readBy as string[]) : []
            };
          });
          setState({ messages, loading: false, error: null });
        },
        (err) => {
          console.error('[useMessages] subscribe error', err);
          setState({
            messages: [],
            loading: false,
            error: err.message || 'Erreur de chargement'
          });
        }
      );
    } catch (err) {
      console.error('[useMessages] init error', err);
      setState({
        messages: [],
        loading: false,
        error: 'Erreur d\'initialisation'
      });
    }
    return () => {
      if (unsub) unsub();
    };
  }, [convId, user]);

  return state;
};
