/**
 * useChatConversations — historique des conversations Prof. Xiao
 * ---------------------------------------------------------------
 * Persistance : localStorage + sync Firestore via useFirestoreSync.
 * Les conversations sont synchronisées entre tous les appareils du
 * même compte utilisateur (last-write-wins par timestamp).
 *
 * Structure :
 *   xl_chat_conversations_v1 : Array<ChatConversation>
 *
 * API :
 *   - conversations : liste triée par updatedAt desc
 *   - currentConvId : id de la conv sélectionnée (ou null = nouvelle)
 *   - currentMessages : raccourci sur les messages de la conv courante
 *   - createNew() : crée une nouvelle conv vide et la sélectionne
 *   - selectConversation(id) : bascule sur une conv existante
 *   - upsertCurrentMessages(messages) : sauvegarde les messages de la
 *     conv courante. Le titre est auto-dérivé du premier message user.
 *   - removeConversation(id) : supprime une conv
 */

import { useCallback, useEffect, useState } from 'react';
import { useFirestoreSync } from './useFirestoreSync';

const STORAGE_KEY = 'xl_chat_conversations_v1';
const MAX_CONVERSATIONS = 50;
const TITLE_MAX_LENGTH = 60;

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt: number;
}

export interface ChatConversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
}

const loadFromStorage = (): ChatConversation[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as ChatConversation[];
  } catch {
    return [];
  }
};

const saveToStorage = (convs: ChatConversation[]): void => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(convs));
  } catch {
    /* ignore quota errors */
  }
};

const deriveTitle = (messages: ChatMessage[]): string => {
  const firstUser = messages.find((m) => m.role === 'user');
  if (!firstUser) return 'Nouvelle conversation';
  const text = firstUser.content.trim().replace(/\s+/g, ' ');
  return text.length > TITLE_MAX_LENGTH
    ? text.slice(0, TITLE_MAX_LENGTH - 1) + '…'
    : text;
};

const generateId = (): string => {
  return `conv-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
};

export interface UseChatConversationsReturn {
  conversations: ChatConversation[];
  currentConvId: string | null;
  currentMessages: ChatMessage[];
  createNew: () => void;
  selectConversation: (id: string) => void;
  upsertCurrentMessages: (messages: ChatMessage[]) => void;
  removeConversation: (id: string) => void;
}

export const useChatConversations = (): UseChatConversationsReturn => {
  const [conversations, setConversations] = useState<ChatConversation[]>(loadFromStorage);
  const [currentConvId, setCurrentConvId] = useState<string | null>(null);

  // Sync Firestore : pousse local → cloud, et écoute les changements pour
  // refléter les mises à jour faites depuis un autre appareil. Le callback
  // `onUpdate` est appelé quand le cloud a une version plus récente que local.
  const { saveToFirestore } = useFirestoreSync(STORAGE_KEY, (data) => {
    if (Array.isArray(data)) {
      setConversations(data as ChatConversation[]);
    }
  });

  // Persist on change : local + cloud
  useEffect(() => {
    saveToStorage(conversations);
    saveToFirestore(conversations);
  }, [conversations, saveToFirestore]);

  const createNew = useCallback(() => {
    setCurrentConvId(null);
  }, []);

  const selectConversation = useCallback((id: string) => {
    setCurrentConvId(id);
  }, []);

  const upsertCurrentMessages = useCallback(
    (messages: ChatMessage[]) => {
      if (messages.length === 0) return;

      const now = Date.now();
      setConversations((prev) => {
        // Si pas de conv courante → on en crée une nouvelle
        if (!currentConvId) {
          const newConv: ChatConversation = {
            id: generateId(),
            title: deriveTitle(messages),
            messages,
            createdAt: now,
            updatedAt: now
          };
          setCurrentConvId(newConv.id);
          return [newConv, ...prev].slice(0, MAX_CONVERSATIONS);
        }
        // Sinon on met à jour la conv courante
        return prev.map((c) =>
          c.id === currentConvId
            ? { ...c, messages, title: deriveTitle(messages), updatedAt: now }
            : c
        );
      });
    },
    [currentConvId]
  );

  const removeConversation = useCallback((id: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    setCurrentConvId((prev) => (prev === id ? null : prev));
  }, []);

  const currentMessages =
    conversations.find((c) => c.id === currentConvId)?.messages ?? [];

  return {
    conversations,
    currentConvId,
    currentMessages,
    createNew,
    selectConversation,
    upsertCurrentMessages,
    removeConversation
  };
};
