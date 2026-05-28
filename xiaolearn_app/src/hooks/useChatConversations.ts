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
  /**
   * Marqueur pour les conversations "spéciales" non éditables côté titre.
   * - 'quick-chat' : conversation utilisée par la bulle flottante Prof. Xiao.
   *   Le titre est figé ("Conversation rapide" / "Quick chat"), pas auto-
   *   dérivé du premier message user. Une seule par utilisateur.
   */
  pinned?: 'quick-chat';
}

/** ID stable pour la conversation Quick chat de la bulle flottante. */
export const QUICK_CHAT_ID = 'quick-chat';
const QUICK_CHAT_TITLE: Record<'fr' | 'en', string> = {
  fr: 'Conversation rapide',
  en: 'Quick chat'
};

/**
 * Strip défensif des blocs <<<CORRECTIONS>>>...<<<END>>> que Gemini
 * insère dans ses réponses. Ils sont parsés et retirés à la volée par
 * geminiService.parseCorrectionsBlock côté écriture, mais les anciens
 * messages stockés avant l'introduction de ce parsing peuvent encore les
 * contenir — on nettoie au load pour ne plus jamais les afficher.
 *
 * Exportés pour testabilité (cf. __tests__/useChatConversations.test.ts).
 */
const CORRECTIONS_RE = /<<<CORRECTIONS>>>[\s\S]*?<<<END>>>/g;
export const sanitizeMessage = (m: ChatMessage): ChatMessage => {
  if (m.role !== 'assistant') return m;
  const cleaned = m.content.replace(CORRECTIONS_RE, '').trim();
  return cleaned === m.content ? m : { ...m, content: cleaned };
};
export const sanitizeConv = (c: ChatConversation): ChatConversation => ({
  ...c,
  messages: c.messages.map(sanitizeMessage)
});

const loadFromStorage = (): ChatConversation[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return (parsed as ChatConversation[]).map(sanitizeConv);
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
  /**
   * Lit (ou crée) la conversation Quick chat épinglée — utilisée par la
   * bulle flottante. Ne touche PAS à currentConvId : la page /tutor reste
   * sur sa conv en cours.
   */
  getOrCreateQuickChat: (lang: 'fr' | 'en') => ChatConversation;
  /** Écrit dans la conversation Quick chat épinglée sans toucher au current. */
  upsertQuickChatMessages: (messages: ChatMessage[], lang: 'fr' | 'en') => void;
}

export const useChatConversations = (): UseChatConversationsReturn => {
  const [conversations, setConversations] = useState<ChatConversation[]>(loadFromStorage);
  const [currentConvId, setCurrentConvId] = useState<string | null>(null);

  // Sync Firestore : pousse local → cloud, et écoute les changements pour
  // refléter les mises à jour faites depuis un autre appareil. Le callback
  // `onUpdate` est appelé quand le cloud a une version plus récente que local.
  const { saveToFirestore } = useFirestoreSync(STORAGE_KEY, (data) => {
    if (Array.isArray(data)) {
      // Merge par ID au lieu de replace : on ne veut JAMAIS perdre une
      // conversation créée localement non encore propagée vers Firestore
      // (cas post-deploy + reload SW). Si une conv existe local+cloud,
      // on garde la version avec updatedAt le plus récent.
      const cloudConvs = (data as ChatConversation[]).map(sanitizeConv);
      setConversations((prev) => {
        const byId = new Map<string, ChatConversation>();
        for (const c of prev) byId.set(c.id, c);
        for (const c of cloudConvs) {
          const existing = byId.get(c.id);
          if (!existing || (c.updatedAt ?? 0) > (existing.updatedAt ?? 0)) {
            byId.set(c.id, c);
          }
        }
        const merged = Array.from(byId.values()).sort(
          (a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0)
        );
        if (
          merged.length === prev.length &&
          merged.every((c, i) => c.id === prev[i].id && c.updatedAt === prev[i].updatedAt)
        ) {
          return prev;
        }
        return merged;
      });
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
        // Sinon on met à jour la conv courante. Pour les convs épinglées
        // (Quick chat), on PRÉSERVE le titre fixe — pas de re-derivation.
        return prev.map((c) =>
          c.id === currentConvId
            ? {
                ...c,
                messages,
                title: c.pinned ? c.title : deriveTitle(messages),
                updatedAt: now
              }
            : c
        );
      });
    },
    [currentConvId]
  );

  /**
   * Trouve ou crée la conversation Quick chat (épinglée). Garantit qu'une
   * seule existe par utilisateur. Ne touche pas à currentConvId.
   */
  const getOrCreateQuickChat = useCallback(
    (lang: 'fr' | 'en'): ChatConversation => {
      const existing = conversations.find((c) => c.pinned === 'quick-chat');
      if (existing) return existing;
      // Crée à la volée + persiste
      const now = Date.now();
      const fresh: ChatConversation = {
        id: QUICK_CHAT_ID,
        title: QUICK_CHAT_TITLE[lang],
        messages: [],
        createdAt: now,
        updatedAt: now,
        pinned: 'quick-chat'
      };
      setConversations((prev) => {
        // Re-check dans le setter pour eviter une double-creation si l'effet
        // tourne deux fois (React 18 StrictMode).
        if (prev.some((c) => c.pinned === 'quick-chat')) return prev;
        return [fresh, ...prev].slice(0, MAX_CONVERSATIONS);
      });
      return fresh;
    },
    [conversations]
  );

  /**
   * Écrit messages dans la conv Quick chat sans changer currentConvId
   * (la page /tutor reste sur sa propre conv). Crée la Quick chat si
   * elle n'existait pas encore.
   */
  const upsertQuickChatMessages = useCallback(
    (messages: ChatMessage[], lang: 'fr' | 'en') => {
      if (messages.length === 0) return;
      const now = Date.now();
      setConversations((prev) => {
        const existing = prev.find((c) => c.pinned === 'quick-chat');
        if (existing) {
          return prev.map((c) =>
            c.pinned === 'quick-chat'
              ? { ...c, messages, updatedAt: now }
              : c
          );
        }
        const fresh: ChatConversation = {
          id: QUICK_CHAT_ID,
          title: QUICK_CHAT_TITLE[lang],
          messages,
          createdAt: now,
          updatedAt: now,
          pinned: 'quick-chat'
        };
        return [fresh, ...prev].slice(0, MAX_CONVERSATIONS);
      });
    },
    []
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
    removeConversation,
    getOrCreateQuickChat,
    upsertQuickChatMessages
  };
};
