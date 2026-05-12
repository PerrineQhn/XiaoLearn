/**
 * AiTutorPageV2.tsx — page complète du Prof. Xiao
 * ------------------------------------------------
 * Équivalent de la page "Prof. Park" chez Seonsaengnim, adaptée au chinois.
 * Sort l'AI chat du bouton flottant pour lui donner une vraie page :
 *
 *   - Header : carte du prof + statut + presets de style
 *   - Rail gauche : catégories de prompts (Grammaire, Prononciation, Culture,
 *                   Conversation, Correction, Vocab)
 *   - Rail central : historique de conversation + input
 *   - Rail droit : "prompts rapides" contextuels (leçon en cours,
 *                   mot du jour, objectif du jour)
 *
 * Volontairement découplé du backend : la vraie logique d'appel IA reste
 * dans le parent (ou dans un hook useAiChat à créer). Ici on expose :
 *
 *   - messages (contrôlés) + onSend (callback)
 *   - presets de prompts
 *   - handlers quick-prompts
 *
 * Styles : ./../styles/ai-tutor-v2.css (scoped sous .ai-tutor-v2)
 */

import { useMemo, useRef, useState, useEffect, type KeyboardEvent } from 'react';
import { parseMarkdown } from '../utils/markdownUtils';
import '../styles/ai-tutor-v2.css';

// ============================================================================
//  TYPES
// ============================================================================

export type AiTutorV2Language = 'fr' | 'en';

export type AiTutorV2Role = 'user' | 'assistant' | 'system';

export interface AiTutorV2Message {
  id: string;
  role: AiTutorV2Role;
  content: string;
  /** Timestamp ms. */
  createdAt: number;
}

export type AiTutorV2Mode = 'balanced' | 'strict' | 'playful';

export interface AiTutorV2PromptCategory {
  key: string;
  label: string;
  labelEn?: string;
  icon?: string;
  prompts: AiTutorV2Prompt[];
}

export interface AiTutorV2Prompt {
  id: string;
  title: string;
  titleEn?: string;
  body: string;
  bodyEn?: string;
}

export interface AiTutorV2ContextChip {
  key: string;
  label: string;
  labelEn?: string;
  /** Prompt suggéré à lancer si l'utilisateur clique. */
  prompt: string;
  promptEn?: string;
}

/** Aperçu d'une conversation passée affichée dans la sidebar gauche. */
export interface AiTutorV2ConversationPreview {
  id: string;
  title: string;
  updatedAt: number;
}

export interface AiTutorPageV2Props {
  language?: AiTutorV2Language;
  messages: AiTutorV2Message[];
  /** Pending: un "typing..." doit apparaître. */
  isTyping?: boolean;
  /** Mode par défaut (strict / équilibré / joueur). */
  mode?: AiTutorV2Mode;
  onSend: (payload: { content: string; mode: AiTutorV2Mode }) => void;
  onClear?: () => void;
  onChangeMode?: (mode: AiTutorV2Mode) => void;
  /** Prompt presets — si vide, des défauts sont utilisés. */
  promptCategories?: AiTutorV2PromptCategory[];
  /** Chips contextuelles (leçon en cours, mot du jour, etc.). */
  contextChips?: AiTutorV2ContextChip[];
  onBack?: () => void;
  /**
   * Photo de profil de l'utilisateur (Firebase Auth `user.photoURL`).
   * Affichée dans les bulles user à la place de l'emoji 🧑. Si null/absent,
   * fallback sur l'emoji.
   */
  userPhotoURL?: string | null;

  // ----- Historique des conversations (sidebar gauche) -----
  /** Liste des conversations passées, triée par updatedAt desc. */
  conversations?: AiTutorV2ConversationPreview[];
  /** ID de la conversation actuellement ouverte. null = nouvelle conv. */
  currentConvId?: string | null;
  /** Démarre une nouvelle conversation vide. */
  onNewConversation?: () => void;
  /** Bascule sur une conversation existante. */
  onSelectConversation?: (id: string) => void;
  /** Supprime une conversation. */
  onRemoveConversation?: (id: string) => void;
}

// ============================================================================
//  COPIES + DÉFAUTS
// ============================================================================

const COPY = {
  fr: {
    title: 'Prof. Xiao',
    subtitle: 'Ton assistant chinois — vocabulaire, grammaire, culture, corrections.',
    back: '← Retour',
    online: 'En ligne',
    modeBalanced: 'Équilibré',
    modeStrict: 'Strict',
    modePlayful: 'Joueur',
    modeLabel: 'Ton',
    placeholder: 'Pose ta question en français, anglais ou chinois…',
    send: 'Envoyer',
    clear: 'Nouvelle conversation',
    categoriesTitle: 'Thèmes',
    contextTitle: 'Rapide',
    typing: 'Prof. Xiao rédige…',
    emptyHeadline: 'Commence ta conversation',
    emptySub: 'Pose une question ou choisis un prompt ci-dessous.',
    you: 'Toi',
    prof: 'Prof. Xiao',
    conversationsTitle: 'Conversations',
    newConversation: 'Nouvelle conversation',
    noConversations: 'Aucune conversation pour le moment.',
    askFirstQuestion: 'Pose ta première question !',
    questionsPrompt: 'Pose tes questions 24/7.',
    welcomeMessage:
      'Bonjour ! Je suis le Prof. Xiao.\n\nPose-moi n\'importe quelle question sur le chinois — grammaire, vocabulaire, prononciation, culture… je suis là pour toi 24h/24 ! 😊',
    deleteConv: 'Supprimer cette conversation'
  },
  en: {
    title: 'Prof. Xiao',
    subtitle: 'Your Chinese tutor — vocabulary, grammar, culture, corrections.',
    back: '← Back',
    online: 'Online',
    modeBalanced: 'Balanced',
    modeStrict: 'Strict',
    modePlayful: 'Playful',
    modeLabel: 'Tone',
    placeholder: 'Ask in French, English or Chinese…',
    send: 'Send',
    clear: 'New conversation',
    categoriesTitle: 'Topics',
    contextTitle: 'Quick',
    typing: 'Prof. Xiao is typing…',
    emptyHeadline: 'Start a conversation',
    emptySub: 'Ask a question or pick a prompt below.',
    you: 'You',
    prof: 'Prof. Xiao',
    conversationsTitle: 'Conversations',
    newConversation: 'New conversation',
    noConversations: 'No conversation yet.',
    askFirstQuestion: 'Ask your first question!',
    questionsPrompt: 'Ask me anything, 24/7.',
    welcomeMessage:
      'Hello! I\'m Prof. Xiao.\n\nAsk me anything about Chinese — grammar, vocabulary, pronunciation, culture… I\'m here for you 24/7! 😊',
    deleteConv: 'Delete this conversation'
  }
} as const;

type CopyKey = keyof (typeof COPY)['fr'];
const t = (lang: AiTutorV2Language, k: CopyKey) => COPY[lang][k] ?? COPY.fr[k];

export const DEFAULT_PROMPT_CATEGORIES: AiTutorV2PromptCategory[] = [
  {
    key: 'grammar',
    label: 'Grammaire',
    labelEn: 'Grammar',
    icon: '🧩',
    prompts: [
      {
        id: 'g-1',
        title: 'Explique 了 simplement',
        titleEn: 'Explain 了 simply',
        body: 'Explique-moi l\'usage de la particule 了 avec 3 exemples clairs et une règle simple à retenir.',
        bodyEn:
          'Explain the usage of the 了 particle with 3 clear examples and one simple rule of thumb.'
      },
      {
        id: 'g-2',
        title: '把 vs 被',
        body: 'Quelle est la différence entre 把 et 被 ? Donne-moi deux phrases minimales pour chacun.'
      },
      {
        id: 'g-3',
        title: 'Ordre des mots',
        body: 'Rappelle-moi l\'ordre canonique d\'une phrase chinoise (sujet/temps/lieu/verbe/objet).'
      }
    ]
  },
  {
    key: 'pron',
    label: 'Prononciation',
    labelEn: 'Pronunciation',
    icon: '🔊',
    prompts: [
      {
        id: 'p-1',
        title: 'Tons 3+3 qui changent',
        body: 'Explique la règle de sandhi tonal sur deux 3e tons consécutifs avec des exemples.'
      },
      {
        id: 'p-2',
        title: 'Comment prononcer zh / ch / sh',
        body: 'Quelle est la différence de position de langue entre zh, ch, sh et j, q, x ?'
      }
    ]
  },
  {
    key: 'culture',
    label: 'Culture',
    labelEn: 'Culture',
    icon: '🏮',
    prompts: [
      {
        id: 'c-1',
        title: 'Fête du Printemps',
        body: 'Raconte en 3 paragraphes l\'origine du 春节 et ses coutumes principales.'
      },
      {
        id: 'c-2',
        title: 'Gestes à éviter',
        body: 'Cite-moi 5 gestes ou sujets à éviter lors d\'un premier repas avec des Chinois.'
      }
    ]
  },
  {
    key: 'conv',
    label: 'Conversation',
    labelEn: 'Conversation',
    icon: '💬',
    prompts: [
      {
        id: 'co-1',
        title: 'Rôle : café à Shanghai',
        body: 'On fait un jeu de rôle : toi serveur, moi client dans un café à Shanghai. Commence.'
      },
      {
        id: 'co-2',
        title: 'Présentation pro',
        body: 'Aide-moi à me présenter professionnellement en chinois en 4 phrases.'
      }
    ]
  },
  {
    key: 'review',
    label: 'Correction',
    labelEn: 'Corrections',
    icon: '✏️',
    prompts: [
      {
        id: 'r-1',
        title: 'Corrige cette phrase',
        body: 'Corrige la phrase suivante et explique l\'erreur : [colle ici]'
      },
      {
        id: 'r-2',
        title: 'Reformule plus naturellement',
        body: 'Reformule cette phrase comme un natif le ferait : [colle ici]'
      }
    ]
  }
];

// ============================================================================
//  SOUS-COMPOSANTS
// ============================================================================

/**
 * Chemin de l'image officielle de Prof. Xiao. Fichier servi statiquement par
 * Cloudflare Pages (resté dans public/profs/, non concerné par le prune audio).
 * En cas d'erreur de chargement, on retombe sur l'emoji 👩‍🏫 grâce à onError.
 */
const PROF_XIAO_IMAGE = '/profs/professeur_xiao_profil.png';

const Avatar = ({
  role,
  userPhotoURL
}: {
  role: AiTutorV2Role;
  userPhotoURL?: string | null;
}) => {
  // Pour l'assistant, on affiche toujours l'image officielle Prof. Xiao.
  if (role === 'assistant') {
    return (
      <div className="at2-avatar at2-avatar--assistant at2-avatar--image" aria-hidden>
        <img
          src={PROF_XIAO_IMAGE}
          alt=""
          onError={(e) => {
            // Si l'image ne charge pas (404, prune accidentel, etc.), on bascule
            // sur l'emoji pour ne pas casser l'UI. Remplace le <img> par un
            // span avec l'emoji.
            const span = document.createElement('span');
            span.textContent = '👩‍🏫';
            e.currentTarget.replaceWith(span);
          }}
        />
      </div>
    );
  }

  // Pour le user, on prend sa photo Firebase Auth si dispo, sinon emoji.
  if (role === 'user' && userPhotoURL) {
    return (
      <div className="at2-avatar at2-avatar--user at2-avatar--image" aria-hidden>
        <img
          src={userPhotoURL}
          alt=""
          referrerPolicy="no-referrer"
          onError={(e) => {
            const span = document.createElement('span');
            span.textContent = '🧑';
            e.currentTarget.replaceWith(span);
          }}
        />
      </div>
    );
  }

  // Fallback : emoji pour user sans photo, ou rôle 'system'.
  return (
    <div className={`at2-avatar at2-avatar--${role}`} aria-hidden>
      {role === 'user' ? '🧑' : '⚙️'}
    </div>
  );
};

const MessageBubble = ({
  message,
  language,
  userPhotoURL
}: {
  message: AiTutorV2Message;
  language: AiTutorV2Language;
  userPhotoURL?: string | null;
}) => (
  <div className={`at2-message at2-message--${message.role}`}>
    <Avatar role={message.role} userPhotoURL={userPhotoURL} />
    <div className="at2-message-body">
      <div className="at2-message-author">
        {message.role === 'assistant' ? t(language, 'prof') : t(language, 'you')}
      </div>
      {/* Markdown rendu pour les réponses de l'IA (gras, listes, code blocks,
          retours à la ligne). Les messages user restent en texte brut — il n'y
          a aucune raison de leur appliquer un parseur (et ça évite que du
          markdown collé par l'user soit interprété malgré lui). */}
      <div className="at2-message-text">
        {message.role === 'assistant' ? parseMarkdown(message.content) : message.content}
      </div>
    </div>
  </div>
);

// ============================================================================
//  COMPOSANT PRINCIPAL
// ============================================================================

const AiTutorPageV2 = (props: AiTutorPageV2Props) => {
  const {
    language = 'fr',
    messages,
    isTyping = false,
    mode: modeProp = 'balanced',
    onSend,
    onClear,
    onChangeMode,
    promptCategories,
    contextChips = [],
    onBack,
    userPhotoURL = null,
    conversations = [],
    currentConvId = null,
    onNewConversation,
    onSelectConversation,
    onRemoveConversation
  } = props;

  const categories = useMemo(
    () => promptCategories ?? DEFAULT_PROMPT_CATEGORIES,
    [promptCategories]
  );

  const [mode, setMode] = useState<AiTutorV2Mode>(modeProp);
  const [categoryKey, setCategoryKey] = useState<string>(categories[0]?.key ?? 'grammar');
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMode(modeProp);
  }, [modeProp]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, isTyping]);

  const handleSend = () => {
    const content = input.trim();
    if (!content) return;
    onSend({ content, mode });
    setInput('');
  };

  const handleKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const activeCategory = categories.find((c) => c.key === categoryKey) ?? categories[0];

  const handleChangeMode = (m: AiTutorV2Mode) => {
    setMode(m);
    onChangeMode?.(m);
  };

  const handlePromptClick = (body: string) => {
    setInput(body);
  };

  return (
    <div className="ai-tutor-v2">
      {/* Header */}
      <header className="at2-header">
        {onBack && (
          <button className="at2-btn at2-btn--link" onClick={onBack}>
            {t(language, 'back')}
          </button>
        )}
        <div className="at2-hero">
          <div className="at2-hero-avatar at2-hero-avatar--image" aria-hidden>
            <img
              src={PROF_XIAO_IMAGE}
              alt=""
              onError={(e) => {
                const span = document.createElement('span');
                span.textContent = '👩‍🏫';
                span.style.fontSize = '28px';
                e.currentTarget.replaceWith(span);
              }}
            />
          </div>
          <div>
            <h1>{t(language, 'title')}</h1>
            <p>{t(language, 'subtitle')}</p>
            <span className="at2-status">
              <span className="at2-status-dot" /> {t(language, 'online')}
            </span>
          </div>
        </div>
        <div className="at2-mode">
          <span className="at2-mode-label">{t(language, 'modeLabel')}</span>
          <div className="at2-mode-options" role="radiogroup">
            {(['strict', 'balanced', 'playful'] as AiTutorV2Mode[]).map((m) => (
              <button
                key={m}
                role="radio"
                aria-checked={mode === m}
                className={`at2-mode-btn ${mode === m ? 'is-active' : ''}`}
                onClick={() => handleChangeMode(m)}
              >
                {t(
                  language,
                  (m === 'strict' ? 'modeStrict' : m === 'balanced' ? 'modeBalanced' : 'modePlayful') as CopyKey
                )}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* 3-column layout */}
      <div className="at2-layout">
        {/* Left : historique des conversations (façon Seonsaengnim) */}
        <aside className="at2-sidebar at2-sidebar--convs">
          <button
            type="button"
            className="at2-new-conv-btn"
            onClick={() => onNewConversation?.()}
          >
            <span className="at2-new-conv-plus" aria-hidden="true">+</span>
            <span>{t(language, 'newConversation')}</span>
          </button>

          {conversations.length === 0 ? (
            <div className="at2-convs-empty">
              <p className="at2-convs-empty-line">
                {t(language, 'noConversations')}
              </p>
              <p className="at2-convs-empty-line at2-convs-empty-cta">
                {t(language, 'askFirstQuestion')}
              </p>
            </div>
          ) : (
            <ul className="at2-convs-list" role="list">
              {conversations.map((c) => {
                const isActive = c.id === currentConvId;
                return (
                  <li key={c.id}>
                    <button
                      type="button"
                      className={`at2-conv-item ${isActive ? 'is-active' : ''}`}
                      onClick={() => onSelectConversation?.(c.id)}
                    >
                      <span className="at2-conv-title">{c.title}</span>
                      {onRemoveConversation && (
                        <span
                          role="button"
                          tabIndex={0}
                          aria-label={t(language, 'deleteConv')}
                          className="at2-conv-delete"
                          onClick={(e) => {
                            e.stopPropagation();
                            onRemoveConversation(c.id);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              e.stopPropagation();
                              onRemoveConversation(c.id);
                            }
                          }}
                        >
                          ×
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </aside>

        {/* Center : conversation */}
        <section className="at2-conversation">
          {messages.length === 0 ? (
            <div className="at2-empty">
              {/* Bulle d'accueil du Prof. Xiao — affichée même sans message envoyé */}
              <div className="at2-welcome-bubble">
                {t(language, 'welcomeMessage')}
              </div>

              {/* Catégories de prompts (anciennement dans la sidebar) déplacées
                  en pills au-dessus, et liste des prompts de la catégorie active
                  juste en dessous. */}
              <div className="at2-empty-categories" role="tablist">
                {categories.map((c) => (
                  <button
                    key={c.key}
                    role="tab"
                    aria-selected={categoryKey === c.key}
                    className={`at2-category at2-category--pill ${categoryKey === c.key ? 'is-active' : ''}`}
                    onClick={() => setCategoryKey(c.key)}
                    type="button"
                  >
                    <span aria-hidden>{c.icon ?? '•'}</span>
                    <span>{language === 'en' && c.labelEn ? c.labelEn : c.label}</span>
                  </button>
                ))}
              </div>
              {activeCategory && (
                <div className="at2-empty-prompts">
                  {activeCategory.prompts.map((p) => (
                    <button
                      key={p.id}
                      className="at2-prompt"
                      onClick={() =>
                        handlePromptClick(language === 'en' && p.bodyEn ? p.bodyEn : p.body)
                      }
                      type="button"
                    >
                      <strong>{language === 'en' && p.titleEn ? p.titleEn : p.title}</strong>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="at2-messages">
              {messages.map((m) => (
                <MessageBubble
                  key={m.id}
                  message={m}
                  language={language}
                  userPhotoURL={userPhotoURL}
                />
              ))}
              {isTyping && (
                <div className="at2-typing">
                  <Avatar role="assistant" />
                  <div className="at2-typing-body">
                    <span className="at2-typing-author">{t(language, 'prof')}</span>
                    <span className="at2-typing-dots">
                      <span />
                      <span />
                      <span />
                    </span>
                    <span className="at2-typing-label">{t(language, 'typing')}</span>
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>
          )}

          <div className="at2-composer">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder={t(language, 'placeholder')}
              rows={2}
              className="at2-textarea"
            />
            <div className="at2-composer-actions">
              {onClear && (
                <button className="at2-btn at2-btn--ghost" onClick={onClear} type="button">
                  {t(language, 'clear')}
                </button>
              )}
              <button
                className="at2-btn at2-btn--primary"
                onClick={handleSend}
                disabled={!input.trim()}
                type="button"
              >
                {t(language, 'send')}
              </button>
            </div>
          </div>
        </section>

        {/* Right : quick contextual chips */}
        <aside className="at2-sidebar at2-sidebar--right">
          <div className="at2-sidebar-title">{t(language, 'contextTitle')}</div>
          <div className="at2-chips">
            {contextChips.length === 0 ? (
              <div className="at2-chips-empty">—</div>
            ) : (
              contextChips.map((c) => (
                <button
                  key={c.key}
                  className="at2-chip"
                  onClick={() =>
                    handlePromptClick(language === 'en' && c.promptEn ? c.promptEn : c.prompt)
                  }
                  type="button"
                >
                  {language === 'en' && c.labelEn ? c.labelEn : c.label}
                </button>
              ))
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AiTutorPageV2;
