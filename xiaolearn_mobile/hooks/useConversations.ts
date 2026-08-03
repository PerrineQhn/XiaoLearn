/**
 * useConversations + useMessages — DMs 1-1 (même structure Firestore que la web app)
 * convId = sort([uidA, uidB]).join('_')
 *
 * conversations/{convId}
 *   participantIds: string[]
 *   participantNames: { [uid]: string }
 *   lastMessage: { text, senderId, sentAt }
 *   lastMessageAt: Timestamp
 *   unreadCount: { [uid]: number }
 *
 * conversations/{convId}/messages/{msgId}
 *   text, senderId, senderName, sentAt: Timestamp, readBy: string[]
 */
import { useCallback, useEffect, useState } from 'react';
import {
  collection, doc, onSnapshot, query, where, orderBy,
  serverTimestamp, setDoc, addDoc, updateDoc, increment, getDoc,
  type Timestamp,
} from 'firebase/firestore';
import { db } from '@/firebase/config';
import { useAuth } from '@/contexts/AuthContext';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ConvMessage {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  sentAt: string;   // ISO string
}

export interface Conversation {
  id: string;
  participantIds: string[];
  participantNames: Record<string, string>;
  lastMessage?: { text: string; senderId: string };
  lastMessageAt: string;
  unreadCount: Record<string, number>;
}

export interface UserParticipant {
  uid: string;
  displayName: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function buildConvId(a: string, b: string): string {
  return [a, b].sort().join('_');
}

function tsToIso(ts: Timestamp | string | null | undefined): string {
  if (!ts) return new Date().toISOString();
  if (typeof ts === 'string') return ts;
  try { return (ts as Timestamp).toDate().toISOString(); } catch { return new Date().toISOString(); }
}

// ─── useConversations ─────────────────────────────────────────────────────────

export function useConversations() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !db) { setLoading(false); return; }
    const q = query(
      collection(db, 'conversations'),
      where('participantIds', 'array-contains', user.uid),
      orderBy('lastMessageAt', 'desc'),
    );
    const unsub = onSnapshot(q, snap => {
      setConversations(snap.docs.map(d => {
        const data = d.data();
        return {
          id: d.id,
          participantIds: (data.participantIds as string[]) ?? [],
          participantNames: (data.participantNames as Record<string, string>) ?? {},
          lastMessage: data.lastMessage
            ? { text: String(data.lastMessage.text ?? ''), senderId: String(data.lastMessage.senderId ?? '') }
            : undefined,
          lastMessageAt: tsToIso(data.lastMessageAt),
          unreadCount: (data.unreadCount as Record<string, number>) ?? {},
        };
      }));
      setLoading(false);
    }, err => {
      console.warn('[useConversations]', err.message);
      setLoading(false);
    });
    return unsub;
  }, [user]);

  const openOrCreate = useCallback(async (other: UserParticipant): Promise<string | null> => {
    if (!user || !db || other.uid === user.uid) return null;
    const convId = buildConvId(user.uid, other.uid);
    const ref = doc(db, 'conversations', convId);
    try {
      const snap = await getDoc(ref);
      if (!snap.exists()) {
        await setDoc(ref, {
          participantIds: [user.uid, other.uid],
          participantNames: {
            [user.uid]: user.displayName ?? user.email ?? 'Moi',
            [other.uid]: other.displayName,
          },
          lastMessageAt: serverTimestamp(),
          unreadCount: { [user.uid]: 0, [other.uid]: 0 },
          createdAt: serverTimestamp(),
        });
      }
      return convId;
    } catch (e) {
      console.warn('[useConversations] openOrCreate', e);
      return null;
    }
  }, [user]);

  const sendMessage = useCallback(async (convId: string, text: string): Promise<boolean> => {
    if (!user || !db || !text.trim()) return false;
    const convRef = doc(db, 'conversations', convId);
    const msgsRef = collection(db, 'conversations', convId, 'messages');
    try {
      const convSnap = await getDoc(convRef);
      if (!convSnap.exists()) return false;
      const participantIds: string[] = convSnap.data().participantIds ?? [];
      const otherUid = participantIds.find(p => p !== user.uid);

      await addDoc(msgsRef, {
        text: text.trim(),
        senderId: user.uid,
        senderName: user.displayName ?? user.email ?? 'Moi',
        sentAt: serverTimestamp(),
        readBy: [user.uid],
      });

      const updates: Record<string, unknown> = {
        lastMessage: { text: text.trim().slice(0, 200), senderId: user.uid, sentAt: serverTimestamp() },
        lastMessageAt: serverTimestamp(),
      };
      if (otherUid) updates[`unreadCount.${otherUid}`] = increment(1);
      await updateDoc(convRef, updates);
      return true;
    } catch (e) {
      console.warn('[useConversations] sendMessage', e);
      return false;
    }
  }, [user]);

  const markRead = useCallback(async (convId: string) => {
    if (!user || !db) return;
    try {
      await updateDoc(doc(db, 'conversations', convId), {
        [`unreadCount.${user.uid}`]: 0,
      });
    } catch { /* non critique */ }
  }, [user]);

  return { conversations, loading, openOrCreate, sendMessage, markRead };
}

// ─── useMessages ──────────────────────────────────────────────────────────────

export function useMessages(convId: string | null) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ConvMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!convId || !user || !db) { setLoading(false); return; }
    const q = query(
      collection(db, 'conversations', convId, 'messages'),
      orderBy('sentAt', 'asc'),
    );
    const unsub = onSnapshot(q, snap => {
      setMessages(snap.docs.map(d => {
        const data = d.data();
        return {
          id: d.id,
          text: String(data.text ?? ''),
          senderId: String(data.senderId ?? ''),
          senderName: String(data.senderName ?? ''),
          sentAt: tsToIso(data.sentAt),
        };
      }));
      setLoading(false);
    }, err => {
      console.warn('[useMessages]', err.message);
      setLoading(false);
    });
    return unsub;
  }, [convId, user]);

  return { messages, loading };
}
