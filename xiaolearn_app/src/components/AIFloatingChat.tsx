import { useState, useRef, useEffect, useMemo } from 'react';
import type { Language } from '../i18n';
import { parseMarkdown } from '../utils/markdownUtils';
import { generateGeminiResponseWithCorrections } from '../services/geminiService';
import type { ChatMessage } from '../hooks/useChatConversations';
import './AIFloatingChat.css';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIFloatingChatProps {
  language: Language;
  /**
   * Callback déclenché par le bouton "plein écran" dans le header de la
   * bulle. Côté App.tsx ça appelle setView('tutor') pour basculer sur la
   * page complète Prof. Xiao.
   */
  onOpenFullPage?: () => void;
  /**
   * Messages de la conversation Quick chat (épinglée), source de vérité
   * partagée avec la page /tutor. Synchronisée Firestore cross-device via
   * useChatConversations. Vide si la conv n'a jamais été utilisée.
   */
  quickChatMessages?: ChatMessage[];
  /**
   * Écrit les messages dans la conversation Quick chat épinglée. Garde la
   * page /tutor à jour automatiquement (et inversement).
   */
  onUpdateQuickChat?: (messages: ChatMessage[]) => void;
}

// Nettoyage one-shot des anciennes clés localStorage (avant la migration
// vers useChatConversations / Quick chat épinglé).
const LEGACY_STORAGE_KEYS = [
  'ai_floating_chat_messages',
  'ai_floating_chat_messages_v2'
];

/** Avatar officiel du Prof. Xiao (servi statiquement par Cloudflare Pages). */
const PROF_XIAO_AVATAR = '/profs/professeur_xiao_profil.png';

const WELCOME_MESSAGE = {
  fr: "你好 ! Je suis Prof. Xiao 🐼 — pose-moi tes questions sur le chinois : vocabulaire, grammaire, prononciation, culture…",
  en: "你好! I'm Prof. Xiao 🐼 — ask me anything about Chinese: vocabulary, grammar, pronunciation, culture…"
};

const CORRECTIONS_RE = /<<<CORRECTIONS>>>[\s\S]*?<<<END>>>/g;

const sanitize = (s: string): string => s.replace(CORRECTIONS_RE, '').trim();

export default function AIFloatingChat({
  language,
  onOpenFullPage,
  quickChatMessages,
  onUpdateQuickChat
}: AIFloatingChatProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Nettoyage one-shot des anciennes clés localStorage (migration vers le
  // Quick chat épinglé géré par useChatConversations).
  useEffect(() => {
    for (const key of LEGACY_STORAGE_KEYS) {
      try {
        if (localStorage.getItem(key) !== null) {
          localStorage.removeItem(key);
        }
      } catch {
        /* noop */
      }
    }
  }, []);

  // Convertit les ChatMessage (timestamp number) du hook vers le format
  // Message (timestamp Date) utilisé localement par le rendu, + sanitize.
  // Si la conv Quick chat est vide, on injecte le message d'accueil virtuel.
  const messages: Message[] = useMemo(() => {
    const fromHook: Message[] =
      quickChatMessages?.map((m) => ({
        id: m.id,
        role: m.role === 'system' ? 'assistant' : m.role,
        content: m.role === 'assistant' ? sanitize(m.content) : m.content,
        timestamp: new Date(m.createdAt)
      })) ?? [];
    if (fromHook.length === 0) {
      return [
        {
          id: '0',
          role: 'assistant',
          content: WELCOME_MESSAGE[language],
          timestamp: new Date()
        }
      ];
    }
    return fromHook;
  }, [quickChatMessages, language]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Persistance : déléguée au hook useChatConversations dans App.tsx
  // (qui sync localStorage + Firestore cross-device). Plus rien à faire ici.

  /**
   * Écoute l'événement global `xiaolearn:openAiChat` qui peut être déclenché
   * depuis n'importe quel composant (ex : bouton « Demander à l'IA » sur une
   * leçon). Le payload `prompt` est pré-rempli dans l'input et le focus est
   * donné à l'utilisateur — il peut éditer avant d'envoyer.
   */
  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<{ prompt?: string }>).detail;
      if (!detail?.prompt) return;
      setIsOpen(true);
      setInput(detail.prompt);
      setTimeout(() => {
        inputRef.current?.focus();
        // Place le curseur en fin de texte pour une édition immédiate.
        if (inputRef.current) {
          const len = inputRef.current.value.length;
          inputRef.current.setSelectionRange(len, len);
        }
      }, 120);
    };
    window.addEventListener('xiaolearn:openAiChat', handler);
    return () => window.removeEventListener('xiaolearn:openAiChat', handler);
  }, []);

  const generateAIResponse = async (userQuestion: string, history: Message[]): Promise<string> => {
    const conversationHistory = history.filter(msg => msg.id !== '0');
    // Utilise la version "WithCorrections" qui parse et STRIPE le bloc
    // <<<CORRECTIONS>>>...<<<END>>> avant retour. La bulle flottante n'a
    // pas l'UI pour afficher les corrections structurées (c'est la page
    // /tutor complète qui le fait), on ne garde donc que le texte propre.
    const { text } = await generateGeminiResponseWithCorrections(
      userQuestion,
      conversationHistory
    );
    return text;
  };

  /**
   * Convertit le tableau Message local en ChatMessage (format hook) et
   * pousse via le callback onUpdateQuickChat. NB : on filtre le welcome
   * virtuel (id === '0') pour ne pas le persister — il est régénéré à la
   * volée quand la conv est vide.
   */
  const persistToQuickChat = (msgs: Message[]) => {
    if (!onUpdateQuickChat) return;
    const persisted: ChatMessage[] = msgs
      .filter((m) => m.id !== '0')
      .map((m) => ({
        id: m.id,
        role: m.role,
        content: m.content,
        createdAt: m.timestamp.getTime()
      }));
    onUpdateQuickChat(persisted);
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    // Optimistic update — on envoie immédiatement au hook, qui propage
    // dans /tutor (cross-device si Firestore connecté).
    const afterUser = [...messages.filter((m) => m.id !== '0'), userMessage];
    persistToQuickChat(afterUser);
    setInput('');
    setIsLoading(true);

    try {
      const response = await generateAIResponse(userMessage.content, messages);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };
      persistToQuickChat([...afterUser, assistantMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content:
          language === 'fr'
            ? "Désolé, j'ai rencontré une erreur. Pouvez-vous reformuler votre question ?"
            : 'Sorry, I encountered an error. Could you rephrase your question?',
        timestamp: new Date()
      };
      persistToQuickChat([...afterUser, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        className={`floating-chat-button ${isOpen ? 'hidden' : ''}`}
        onClick={handleToggle}
        aria-label={language === 'fr' ? 'Ouvrir le chat avec Prof. Xiao' : 'Open chat with Prof. Xiao'}
      >
        {/* Avatar de Prof. Xiao en lieu et place de l'ancienne bulle générique.
            Fallback emoji 👩‍🏫 si l'image ne charge pas. */}
        <img
          src={PROF_XIAO_AVATAR}
          alt=""
          className="floating-chat-button-avatar"
          onError={(e) => {
            const span = document.createElement('span');
            span.textContent = '👩‍🏫';
            span.style.fontSize = '28px';
            e.currentTarget.replaceWith(span);
          }}
        />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="floating-chat-window">
          <div className="floating-chat-header">
            <div className="floating-chat-title">
              <img
                src={PROF_XIAO_AVATAR}
                alt=""
                className="chat-avatar-image"
                onError={(e) => {
                  const span = document.createElement('span');
                  span.textContent = '👩‍🏫';
                  span.className = 'chat-avatar';
                  e.currentTarget.replaceWith(span);
                }}
              />
              <div className="chat-title-text">
                <div className="chat-title-main">Prof. Xiao</div>
                <div className="chat-status">
                  <span className="chat-status-dot" aria-hidden="true" />
                  {language === 'fr' ? 'En ligne' : 'Online'}
                </div>
              </div>
            </div>
            <div className="floating-chat-actions">
              {onOpenFullPage && (
                <button
                  className="floating-chat-action-btn"
                  onClick={() => {
                    setIsOpen(false);
                    onOpenFullPage();
                  }}
                  aria-label={
                    language === 'fr'
                      ? 'Ouvrir la page complète Prof. Xiao'
                      : 'Open full Prof. Xiao page'
                  }
                  title={
                    language === 'fr' ? 'Plein écran' : 'Fullscreen'
                  }
                >
                  {/* Icône "expand / fullscreen" — quatre coins divergents. */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 3 21 3 21 9" />
                    <polyline points="9 21 3 21 3 15" />
                    <line x1="21" y1="3" x2="14" y2="10" />
                    <line x1="3" y1="21" x2="10" y2="14" />
                  </svg>
                </button>
              )}
              <button
                className="floating-chat-action-btn"
                onClick={handleToggle}
                aria-label={language === 'fr' ? 'Fermer' : 'Close'}
                title={language === 'fr' ? 'Fermer' : 'Close'}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="floating-chat-messages">
            {messages.map((message) => (
              <div key={message.id} className={`floating-message floating-message-${message.role}`}>
                <div className="floating-message-bubble">
                  {message.role === 'assistant' ? parseMarkdown(message.content) : message.content}
                </div>
                <div className="floating-message-time">
                  {message.timestamp.toLocaleTimeString(language === 'fr' ? 'fr-FR' : 'en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="floating-message floating-message-assistant">
                <div className="floating-message-bubble">
                  <div className="floating-typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="floating-chat-input-container">
            <textarea
              ref={inputRef}
              className="floating-chat-input"
              placeholder={language === 'fr' ? 'Posez votre question...' : 'Ask your question...'}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
            />
            <button
              className="floating-send-button"
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              aria-label={language === 'fr' ? 'Envoyer' : 'Send'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
