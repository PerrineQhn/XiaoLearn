/**
 * ConversationPartnerPage.tsx — Phase 2 IA.
 * Page « Partenaire de conversation IA ». Deux modes :
 *  1. Sélecteur de scénario (cards groupées par niveau CECR)
 *  2. Vue chat : Gemini joue le rôle, l'utilisateur converse en chinois.
 *
 * Aides intégrées :
 *  - Toggle Pinyin sur les messages de l'IA
 *  - Toggle Traduction sur les messages de l'IA
 *  - Bouton « Corriger ma dernière phrase » qui appelle correctorService
 *  - Persistance de la conversation par scénario en localStorage
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Language } from '../i18n';
import {
  CONVERSATION_SCENARIOS,
  groupScenariosByLevel,
  type ConversationScenario
} from '../data/conversation-scenarios';
import {
  generateAssistantTurn,
  loadConversation,
  saveConversation,
  clearConversation,
  type ConversationMessage
} from '../services/conversationPartnerService';
import { correctChinese, type CorrectionResult } from '../services/correctorService';
import './ConversationPartnerPage.css';

interface ConversationPartnerPageProps {
  language: Language;
}

const COPY = {
  fr: {
    title: 'Partenaire de conversation IA',
    subtitle:
      'Choisis un scénario, l\'IA joue un rôle et tu pratiques en chinois. Tes corrections, ton pinyin et ta traduction sont à un clic.',
    levelLabel: 'Niveau',
    yourRole: 'Ton rôle',
    aiRole: 'Rôle de l\'IA',
    start: 'Démarrer',
    resume: 'Reprendre',
    backToList: 'Retour aux scénarios',
    placeholder: 'Écris ta réponse en chinois…',
    send: 'Envoyer',
    sending: 'Envoi…',
    showPinyin: 'Pinyin',
    showTranslation: 'Traduction',
    correctMine: 'Corriger ma dernière phrase',
    correcting: 'Correction…',
    restart: 'Recommencer',
    restartConfirm: 'Effacer la conversation et recommencer ?',
    errorApi: 'Erreur réseau. Réessaie.',
    correctionTitle: 'Correction',
    correctionOk: 'Phrase correcte ✓',
    correctionCorrected: 'Version corrigée',
    correctionErrors: 'Erreurs',
    correctionAlternative: 'Plus naturel',
    closeCorrection: 'Fermer',
    writeFirst: 'Écris d\'abord une phrase pour la corriger.'
  },
  en: {
    title: 'AI Conversation Partner',
    subtitle:
      'Pick a scenario, the AI plays a role and you practice in Chinese. Corrections, pinyin and translation are one click away.',
    levelLabel: 'Level',
    yourRole: 'Your role',
    aiRole: 'AI role',
    start: 'Start',
    resume: 'Resume',
    backToList: 'Back to scenarios',
    placeholder: 'Type your reply in Chinese…',
    send: 'Send',
    sending: 'Sending…',
    showPinyin: 'Pinyin',
    showTranslation: 'Translation',
    correctMine: 'Correct my last sentence',
    correcting: 'Correcting…',
    restart: 'Restart',
    restartConfirm: 'Erase the conversation and restart?',
    errorApi: 'Network error. Try again.',
    correctionTitle: 'Correction',
    correctionOk: 'Sentence is correct ✓',
    correctionCorrected: 'Corrected version',
    correctionErrors: 'Mistakes',
    correctionAlternative: 'More natural',
    closeCorrection: 'Close',
    writeFirst: 'Write a sentence first to correct it.'
  }
} as const;

export default function ConversationPartnerPage({
  language
}: ConversationPartnerPageProps) {
  const t = COPY[language];
  const [activeScenarioId, setActiveScenarioId] = useState<string | null>(null);
  const grouped = useMemo(() => groupScenariosByLevel(), []);

  const activeScenario = useMemo(
    () =>
      activeScenarioId
        ? CONVERSATION_SCENARIOS.find((s) => s.id === activeScenarioId)
        : null,
    [activeScenarioId]
  );

  // Vérifie quels scénarios ont déjà une conversation enregistrée pour
  // afficher « Reprendre » au lieu de « Démarrer ».
  const hasSavedConversation = useCallback(
    (id: string): boolean => Boolean(loadConversation(id)?.length),
    []
  );

  if (!activeScenario) {
    return (
      <div className="conv-partner-page">
        <header className="conv-page-header">
          <h1>{t.title}</h1>
          <p className="conv-page-subtitle">{t.subtitle}</p>
        </header>
        <div className="conv-scenario-list">
          {grouped.map((group) => (
            <section key={group.level} className="conv-level-block">
              <header className="conv-level-header">
                <span className={`conv-level-badge conv-level-badge--${group.level.toLowerCase()}`}>
                  {group.level}
                </span>
              </header>
              <div className="conv-scenario-grid">
                {group.scenarios.map((sc) => {
                  const saved = hasSavedConversation(sc.id);
                  return (
                    <button
                      key={sc.id}
                      type="button"
                      className="conv-scenario-card"
                      onClick={() => setActiveScenarioId(sc.id)}
                    >
                      <span className="conv-scenario-emoji" aria-hidden="true">
                        {sc.emoji}
                      </span>
                      <span className="conv-scenario-title">
                        {language === 'en' ? sc.titleEn : sc.titleFr}
                      </span>
                      <span className="conv-scenario-desc">
                        {language === 'en' ? sc.descriptionEn : sc.descriptionFr}
                      </span>
                      <span className={`conv-scenario-cta ${saved ? 'conv-scenario-cta--resume' : ''}`}>
                        {saved ? t.resume : t.start} →
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    );
  }

  return (
    <ChatView
      scenario={activeScenario}
      copy={t}
      language={language}
      onBack={() => setActiveScenarioId(null)}
    />
  );
}

// =====================================================================
// Vue chat
// =====================================================================
function ChatView({
  scenario,
  copy,
  language,
  onBack
}: {
  scenario: ConversationScenario;
  copy: (typeof COPY)[Language];
  language: Language;
  onBack: () => void;
}) {
  const [messages, setMessages] = useState<ConversationMessage[]>(() => {
    const saved = loadConversation(scenario.id);
    if (saved && saved.length > 0) return saved;
    // Démarre avec le message d'ouverture du scénario.
    return [
      {
        id: 'opening',
        role: 'assistant',
        hanzi: scenario.openingHanzi,
        pinyin: scenario.openingPinyin,
        translation: scenario.openingTranslation,
        timestamp: Date.now()
      }
    ];
  });
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [showPinyin, setShowPinyin] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Modal de correction
  const [correcting, setCorrecting] = useState(false);
  const [correctionResult, setCorrectionResult] =
    useState<CorrectionResult | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Persistance + auto-scroll après chaque update.
  useEffect(() => {
    saveConversation(scenario.id, messages);
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, scenario.id]);

  // Focus initial sur le textarea.
  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 200);
  }, []);

  const handleSend = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || sending) return;
    setError(null);

    const userMsg: ConversationMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      hanzi: trimmed,
      timestamp: Date.now()
    };
    const nextHistory = [...messages, userMsg];
    setMessages(nextHistory);
    setInput('');
    setSending(true);

    try {
      // Historique passé au service = TOUT sauf l'opening (déjà dans le system
      // prompt) et sauf le message qu'on vient d'envoyer (passé en `userMessage`).
      const historyForAi = messages.filter((m) => m.id !== 'opening');
      const turn = await generateAssistantTurn(scenario, historyForAi, trimmed);
      const aiMsg: ConversationMessage = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        hanzi: turn.hanzi,
        pinyin: turn.pinyin,
        translation: turn.translation,
        timestamp: Date.now()
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (e) {
      console.error(e);
      setError(copy.errorApi);
    } finally {
      setSending(false);
    }
  }, [input, sending, messages, scenario, copy.errorApi]);

  const handleCorrectLast = useCallback(async () => {
    // Cherche le DERNIER message utilisateur dans l'historique.
    const lastUser = [...messages].reverse().find((m) => m.role === 'user');
    if (!lastUser) {
      setError(copy.writeFirst);
      return;
    }
    setCorrecting(true);
    setError(null);
    try {
      const result = await correctChinese(lastUser.hanzi, scenario.level);
      setCorrectionResult(result);
    } catch (e) {
      console.error(e);
      setError(copy.errorApi);
    } finally {
      setCorrecting(false);
    }
  }, [messages, scenario.level, copy.writeFirst, copy.errorApi]);

  const handleRestart = useCallback(() => {
    if (!window.confirm(copy.restartConfirm)) return;
    clearConversation(scenario.id);
    setMessages([
      {
        id: 'opening',
        role: 'assistant',
        hanzi: scenario.openingHanzi,
        pinyin: scenario.openingPinyin,
        translation: scenario.openingTranslation,
        timestamp: Date.now()
      }
    ]);
    setInput('');
    setCorrectionResult(null);
  }, [scenario, copy.restartConfirm]);

  return (
    <div className="conv-partner-page conv-partner-page--chat">
      <header className="conv-chat-header">
        <button
          type="button"
          className="conv-back-btn"
          onClick={onBack}
          aria-label={copy.backToList}
        >
          ← {copy.backToList}
        </button>
        <div className="conv-chat-meta">
          <h2>
            <span aria-hidden="true">{scenario.emoji}</span>{' '}
            {language === 'en' ? scenario.titleEn : scenario.titleFr}
          </h2>
          <div className="conv-chat-roles">
            <span className={`conv-level-badge conv-level-badge--${scenario.level.toLowerCase()}`}>
              {scenario.level}
            </span>
            <span className="conv-role-pair">
              <strong>{copy.aiRole} :</strong> {scenario.aiRole}
            </span>
          </div>
        </div>
        <div className="conv-chat-toggles">
          <label className="conv-toggle">
            <input
              type="checkbox"
              checked={showPinyin}
              onChange={(e) => setShowPinyin(e.target.checked)}
            />
            <span>{copy.showPinyin}</span>
          </label>
          <label className="conv-toggle">
            <input
              type="checkbox"
              checked={showTranslation}
              onChange={(e) => setShowTranslation(e.target.checked)}
            />
            <span>{copy.showTranslation}</span>
          </label>
        </div>
      </header>

      <div className="conv-chat-messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`conv-msg conv-msg--${msg.role}`}
          >
            <div className="conv-msg-bubble">
              <div className="conv-msg-hanzi" lang="zh-CN">
                {msg.hanzi}
              </div>
              {msg.role === 'assistant' && showPinyin && msg.pinyin && (
                <div className="conv-msg-pinyin">{msg.pinyin}</div>
              )}
              {msg.role === 'assistant' && showTranslation && msg.translation && (
                <div className="conv-msg-translation">{msg.translation}</div>
              )}
            </div>
          </div>
        ))}
        {sending && (
          <div className="conv-msg conv-msg--assistant">
            <div className="conv-msg-bubble">
              <div className="conv-typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {error && <div className="conv-error">{error}</div>}

      <div className="conv-chat-tools">
        <button
          type="button"
          className="conv-tool-btn"
          onClick={handleCorrectLast}
          disabled={correcting || sending}
          title={copy.correctMine}
        >
          ✎ {correcting ? copy.correcting : copy.correctMine}
        </button>
        <button
          type="button"
          className="conv-tool-btn conv-tool-btn--danger"
          onClick={handleRestart}
          title={copy.restart}
        >
          ↻ {copy.restart}
        </button>
      </div>

      <div className="conv-chat-input">
        <textarea
          ref={inputRef}
          className="conv-textarea"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={copy.placeholder}
          rows={2}
          lang="zh-CN"
          disabled={sending}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <button
          type="button"
          className="conv-send-btn"
          onClick={handleSend}
          disabled={sending || !input.trim()}
        >
          {sending ? copy.sending : copy.send}
        </button>
      </div>

      {correctionResult && (
        <CorrectionModal
          result={correctionResult}
          copy={copy}
          onClose={() => setCorrectionResult(null)}
        />
      )}
    </div>
  );
}

// =====================================================================
// Modal correction (overlay au-dessus du chat)
// =====================================================================
function CorrectionModal({
  result,
  copy,
  onClose
}: {
  result: CorrectionResult;
  copy: (typeof COPY)[Language];
  onClose: () => void;
}) {
  return (
    <div className="conv-modal-overlay" onClick={onClose}>
      <div
        className="conv-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <header className="conv-modal-header">
          <h3>{copy.correctionTitle}</h3>
          <button
            type="button"
            className="conv-modal-close"
            onClick={onClose}
            aria-label={copy.closeCorrection}
          >
            ✕
          </button>
        </header>
        <div className="conv-modal-body">
          {result.isCorrect ? (
            <div className="conv-modal-status conv-modal-status--ok">
              {copy.correctionOk}
            </div>
          ) : (
            <>
              <div className="conv-modal-row" lang="zh-CN">
                <span className="conv-modal-strike">{result.input}</span>
              </div>
              <div className="conv-modal-row" lang="zh-CN">
                <strong className="conv-modal-corrected">{result.corrected}</strong>
              </div>
              {result.pinyin && (
                <div className="conv-modal-pinyin">{result.pinyin}</div>
              )}
              {result.translation && (
                <div className="conv-modal-translation">{result.translation}</div>
              )}
              {result.errors.length > 0 && (
                <div className="conv-modal-section">
                  <h4>{copy.correctionErrors}</h4>
                  <ul>
                    {result.errors.map((err, i) => (
                      <li key={i}>
                        <span lang="zh-CN" className="conv-modal-strike">
                          {err.original}
                        </span>{' '}
                        →{' '}
                        <span lang="zh-CN" className="conv-modal-fixed">
                          {err.fixed}
                        </span>
                        <p>{err.explanation}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {result.alternative &&
                result.alternative.trim() !== result.corrected.trim() && (
                  <div className="conv-modal-section">
                    <h4>{copy.correctionAlternative}</h4>
                    <p lang="zh-CN" className="conv-modal-alternative">
                      {result.alternative}
                    </p>
                  </div>
                )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
