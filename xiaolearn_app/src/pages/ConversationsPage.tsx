/**
 * ConversationsPage.tsx — page Messages (XiaoLearn V7)
 * -----------------------------------------------------
 * Layout 2 colonnes :
 *   - Sidebar gauche : liste des conversations + bouton "Nouveau"
 *   - Zone droite    : conv sélectionnée (messages + input)
 *
 * État local :
 *   - selectedConvId
 *   - filter (recherche dans la liste)
 *   - newMessageModalOpen + draftRecipient + draftText
 *
 * Firestore : useConversations() pour la liste, useMessages(convId)
 * pour les messages, useUserSearch() pour le picker du nouveau message.
 *
 * Styles : ./../styles/conversations.css
 */

import { useEffect, useRef, useState } from 'react';
import '../styles/conversations.css';
import { useAuth } from '../contexts/AuthContext';
import { useConversations, useMessages } from '../hooks/useConversations';
import { useUserSearch } from '../hooks/useUserSearch';
import { MESSAGE_MAX_LENGTH, type ConversationParticipant } from '../types/community-feedback';

type Language = 'fr' | 'en';

interface ConversationsPageProps {
  language?: Language;
}

// ============================================================================
//  COPIES
// ============================================================================

const COPY = {
  fr: {
    title: 'Messages',
    newMessage: 'Nouveau',
    searchPlaceholder: 'Rechercher une conversation…',
    emptyConvs: 'Aucune conversation pour le moment',
    sendFirstMessage: 'Envoyer un premier message',
    selectConv: 'Vos messages',
    selectConvHint:
      'Sélectionnez une conversation dans la liste pour commencer à discuter, ou créez un nouveau message.',
    newMsgTitle: 'Nouveau message',
    newMsgTo: 'À :',
    newMsgToPh: 'Rechercher un utilisateur…',
    newMsgText: 'Écris ton message…',
    cancel: 'Annuler',
    send: 'Envoyer',
    inputPlaceholder: 'Écris ton message…',
    you: 'Toi',
    loginRequired: 'Connecte-toi pour échanger avec la communauté.',
    today: "Aujourd'hui",
    yesterday: 'Hier',
    noResults: 'Aucun utilisateur trouvé.'
  },
  en: {
    title: 'Messages',
    newMessage: 'New',
    searchPlaceholder: 'Search conversations…',
    emptyConvs: 'No conversations yet',
    sendFirstMessage: 'Send a first message',
    selectConv: 'Your messages',
    selectConvHint:
      'Pick a conversation in the list to start chatting, or create a new message.',
    newMsgTitle: 'New message',
    newMsgTo: 'To:',
    newMsgToPh: 'Search a user…',
    newMsgText: 'Write your message…',
    cancel: 'Cancel',
    send: 'Send',
    inputPlaceholder: 'Write your message…',
    you: 'You',
    loginRequired: 'Sign in to chat with the community.',
    today: 'Today',
    yesterday: 'Yesterday',
    noResults: 'No user found.'
  }
};

/** Type partagé entre les variantes FR/EN — les deux variantes ont les mêmes
 *  clés, on extrait `typeof COPY.fr` pour le typage des sous-composants. */
type ConvCopy = typeof COPY.fr;

// ============================================================================
//  HELPERS
// ============================================================================

const formatTime = (iso: string, lang: Language): string => {
  try {
    const d = new Date(iso);
    const now = new Date();
    const sameDay = d.toDateString() === now.toDateString();
    const yesterday = new Date(now.getTime() - 86400000);
    const isYesterday = d.toDateString() === yesterday.toDateString();
    if (sameDay) {
      return d.toLocaleTimeString(lang === 'fr' ? 'fr-FR' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    if (isYesterday) return lang === 'fr' ? 'Hier' : 'Yesterday';
    return d.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
      day: 'numeric',
      month: 'short'
    });
  } catch {
    return '';
  }
};

const initials = (name: string): string => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
};

// ============================================================================
//  COMPOSANT PRINCIPAL
// ============================================================================

const ConversationsPage = ({ language = 'fr' }: ConversationsPageProps) => {
  const { user } = useAuth();
  const copy = COPY[language] ?? COPY.fr;
  const {
    conversations,
    loading,
    openOrCreateConversation,
    sendMessage,
    markRead
  } = useConversations();

  const [selectedConvId, setSelectedConvId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [draft, setDraft] = useState('');

  // Mark read quand on ouvre une conv
  useEffect(() => {
    if (selectedConvId) markRead(selectedConvId);
  }, [selectedConvId, markRead]);

  const filteredConvs = search.trim()
    ? conversations.filter((c) =>
        Object.values(c.participantNames)
          .join(' ')
          .toLowerCase()
          .includes(search.trim().toLowerCase())
      )
    : conversations;

  const selectedConv = conversations.find((c) => c.id === selectedConvId) ?? null;

  if (!user) {
    return (
      <div className="conversations-page">
        <div className="conv-login-warning">{copy.loginRequired}</div>
      </div>
    );
  }

  return (
    <div className="conversations-page">
      <aside className="conv-sidebar">
        <header className="conv-sidebar-header">
          <h1>{copy.title}</h1>
          <button
            type="button"
            className="conv-new-btn"
            onClick={() => setModalOpen(true)}
          >
            <span aria-hidden="true">✎</span> {copy.newMessage}
          </button>
        </header>

        <div className="conv-search">
          <input
            type="search"
            placeholder={copy.searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="conv-empty">…</div>
        ) : filteredConvs.length === 0 ? (
          <div className="conv-empty">
            <div className="conv-empty-icon" aria-hidden="true">💬</div>
            <p className="conv-empty-text">{copy.emptyConvs}</p>
            <button
              type="button"
              className="conv-empty-cta"
              onClick={() => setModalOpen(true)}
            >
              {copy.sendFirstMessage}
            </button>
          </div>
        ) : (
          <ul className="conv-list" role="list">
            {filteredConvs.map((c) => {
              const otherUid = c.participantIds.find((p) => p !== user.uid) ?? '';
              const otherName = c.participantNames[otherUid] ?? '?';
              const unread = c.unreadCount?.[user.uid] ?? 0;
              const isActive = c.id === selectedConvId;
              return (
                <li key={c.id}>
                  <button
                    type="button"
                    className={`conv-item ${isActive ? 'is-active' : ''} ${unread > 0 ? 'has-unread' : ''}`}
                    onClick={() => setSelectedConvId(c.id)}
                  >
                    <span className="conv-avatar">{initials(otherName)}</span>
                    <span className="conv-meta">
                      <span className="conv-name">{otherName}</span>
                      <span className="conv-preview">
                        {c.lastMessage?.text ?? '—'}
                      </span>
                    </span>
                    <span className="conv-meta-right">
                      <span className="conv-time">
                        {formatTime(c.lastMessageAt, language)}
                      </span>
                      {unread > 0 && (
                        <span className="conv-unread-badge">{unread}</span>
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </aside>

      <main className="conv-main">
        {selectedConv ? (
          <ConversationView
            conv={selectedConv}
            language={language}
            currentUserId={user.uid}
            currentUserName={user.displayName ?? user.email ?? copy.you}
            draft={draft}
            setDraft={setDraft}
            onSend={async () => {
              const ok = await sendMessage(selectedConv.id, draft);
              if (ok) setDraft('');
            }}
            copy={copy}
          />
        ) : (
          <div className="conv-placeholder">
            <div className="conv-placeholder-icon" aria-hidden="true">💬</div>
            <h2>{copy.selectConv}</h2>
            <p>{copy.selectConvHint}</p>
          </div>
        )}
      </main>

      {modalOpen && (
        <NewMessageModal
          language={language}
          onClose={() => setModalOpen(false)}
          onPick={async (participant) => {
            const id = await openOrCreateConversation(participant);
            setModalOpen(false);
            if (id) setSelectedConvId(id);
          }}
          copy={copy}
        />
      )}
    </div>
  );
};

// ============================================================================
//  ConversationView — sous-composant zone droite
// ============================================================================

interface ConversationViewProps {
  conv: ReturnType<typeof useConversations>['conversations'][number];
  language: Language;
  currentUserId: string;
  currentUserName: string;
  draft: string;
  setDraft: (s: string) => void;
  onSend: () => void | Promise<void>;
  copy: ConvCopy;
}

const ConversationView = ({
  conv,
  language,
  currentUserId,
  draft,
  setDraft,
  onSend,
  copy
}: ConversationViewProps) => {
  const { messages, loading } = useMessages(conv.id);
  const scrollRef = useRef<HTMLDivElement>(null);

  const otherUid = conv.participantIds.find((p) => p !== currentUserId) ?? '';
  const otherName = conv.participantNames[otherUid] ?? '?';

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void onSend();
    }
  };

  return (
    <div className="conv-view">
      <header className="conv-view-header">
        <span className="conv-avatar">{initials(otherName)}</span>
        <h2>{otherName}</h2>
      </header>

      <div className="conv-messages" ref={scrollRef}>
        {loading && <div className="conv-empty">…</div>}
        {messages.map((m) => {
          const mine = m.senderId === currentUserId;
          return (
            <div
              key={m.id}
              className={`conv-msg ${mine ? 'is-mine' : 'is-theirs'}`}
            >
              <div className="conv-msg-bubble">{m.text}</div>
              <div className="conv-msg-time">
                {formatTime(m.sentAt, language)}
              </div>
            </div>
          );
        })}
      </div>

      <footer className="conv-input">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value.slice(0, MESSAGE_MAX_LENGTH))}
          placeholder={copy.inputPlaceholder}
          rows={1}
          onKeyDown={handleKey}
        />
        <button
          type="button"
          className="conv-send-btn"
          onClick={() => void onSend()}
          disabled={!draft.trim()}
        >
          {copy.send}
        </button>
      </footer>
    </div>
  );
};

// ============================================================================
//  NewMessageModal
// ============================================================================

interface NewMessageModalProps {
  language: Language;
  onClose: () => void;
  onPick: (p: ConversationParticipant) => void | Promise<void>;
  copy: ConvCopy;
}

const NewMessageModal = ({ language, onClose, onPick, copy }: NewMessageModalProps) => {
  const { results, search } = useUserSearch();
  const [q, setQ] = useState('');

  useEffect(() => {
    search(q);
  }, [q, search]);

  return (
    <div
      className="conv-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="conv-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="conv-modal-header">
          <h3>{copy.newMsgTitle}</h3>
          <button
            type="button"
            className="conv-modal-close"
            aria-label={copy.cancel}
            onClick={onClose}
          >
            ×
          </button>
        </header>

        <div className="conv-modal-body">
          <label className="conv-modal-label">
            <span>{copy.newMsgTo}</span>
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={copy.newMsgToPh}
              autoFocus
            />
          </label>

          {q.trim().length > 0 && (
            results.length === 0 ? (
              <p className="conv-modal-no-results">{copy.noResults}</p>
            ) : (
              <ul className="conv-modal-results" role="list">
                {results.map((p) => (
                  <li key={p.uid}>
                    <button
                      type="button"
                      className="conv-modal-result"
                      onClick={() => void onPick(p)}
                    >
                      <span className="conv-avatar">{initials(p.displayName)}</span>
                      <span>{p.displayName}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )
          )}
        </div>

        <footer className="conv-modal-footer">
          <span className="conv-modal-lang" aria-hidden="true">
            {language === 'fr' ? 'FR' : 'EN'}
          </span>
          <button
            type="button"
            className="conv-modal-cancel"
            onClick={onClose}
          >
            {copy.cancel}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ConversationsPage;
