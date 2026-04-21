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
    emptySub: 'Pose une question ou choisis un prompt dans la barre latérale.',
    you: 'Toi',
    prof: 'Prof. Xiao'
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
    emptySub: 'Ask a question or pick a prompt from the sidebar.',
    you: 'You',
    prof: 'Prof. Xiao'
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

const Avatar = ({ role }: { role: AiTutorV2Role }) => (
  <div className={`at2-avatar at2-avatar--${role}`} aria-hidden>
    {role === 'assistant' ? '👩‍🏫' : role === 'user' ? '🧑' : '⚙️'}
  </div>
);

const MessageBubble = ({
  message,
  language
}: {
  message: AiTutorV2Message;
  language: AiTutorV2Language;
}) => (
  <div className={`at2-message at2-message--${message.role}`}>
    <Avatar role={message.role} />
    <div className="at2-message-body">
      <div className="at2-message-author">
        {message.role === 'assistant' ? t(language, 'prof') : t(language, 'you')}
      </div>
      <div className="at2-message-text">{message.content}</div>
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
    onBack
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
          <div className="at2-hero-avatar" aria-hidden>
            👩‍🏫
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
        {/* Left : prompt categories */}
        <aside className="at2-sidebar">
          <div className="at2-sidebar-title">{t(language, 'categoriesTitle')}</div>
          <div className="at2-categories">
            {categories.map((c) => (
              <button
                key={c.key}
                className={`at2-category ${categoryKey === c.key ? 'is-active' : ''}`}
                onClick={() => setCategoryKey(c.key)}
              >
                <span aria-hidden>{c.icon ?? '•'}</span>
                <span>{language === 'en' && c.labelEn ? c.labelEn : c.label}</span>
              </button>
            ))}
          </div>

          {activeCategory && (
            <div className="at2-prompts">
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
        </aside>

        {/* Center : conversation */}
        <section className="at2-conversation">
          {messages.length === 0 ? (
            <div className="at2-empty">
              <h3>{t(language, 'emptyHeadline')}</h3>
              <p>{t(language, 'emptySub')}</p>
            </div>
          ) : (
            <div className="at2-messages">
              {messages.map((m) => (
                <MessageBubble key={m.id} message={m} language={language} />
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
