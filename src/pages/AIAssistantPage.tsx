import { useState, useRef, useEffect } from 'react';
import type { Language } from '../i18n';
import { parseMarkdown } from '../utils/markdownUtils';
import { generateGeminiResponse } from '../services/geminiService';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIAssistantPageProps {
  language: Language;
}

const STORAGE_KEY = 'ai_assistant_messages';

const SUGGESTED_QUESTIONS = {
  fr: [
    "Comment prononcer les tons en chinois ?",
    "Quelle est la différence entre 了 et 过 ?",
    "Comment former une question en chinois ?",
    "Explique-moi la structure de phrase chinoise",
    "Quels sont les classificateurs les plus courants ?",
    "Comment dire 'j'aime' en chinois ?"
  ],
  en: [
    "How to pronounce Chinese tones?",
    "What's the difference between 了 and 过?",
    "How to form questions in Chinese?",
    "Explain Chinese sentence structure",
    "What are the most common classifiers?",
    "How to say 'I like' in Chinese?"
  ]
};

const WELCOME_MESSAGE = {
  fr: "Bonjour ! Je suis votre assistant IA pour l'apprentissage du chinois. Posez-moi vos questions sur la grammaire, le vocabulaire, la prononciation ou la culture chinoise !",
  en: "Hello! I'm your AI assistant for learning Chinese. Ask me questions about grammar, vocabulary, pronunciation, or Chinese culture!"
};

export default function AIAssistantPage({ language }: AIAssistantPageProps) {
  const getInitialMessages = (): Message[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.map((msg: Message) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
      }
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
    return [
      {
        id: '0',
        role: 'assistant',
        content: WELCOME_MESSAGE[language],
        timestamp: new Date()
      }
    ];
  };

  const [messages, setMessages] = useState<Message[]>(getInitialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Save messages to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (error) {
      console.error('Failed to save messages:', error);
    }
  }, [messages]);

  // Generate AI response using Google Gemini API with conversation history
  const generateAIResponse = async (userQuestion: string, history: Message[]): Promise<string> => {
    // Filter out the welcome message and only keep actual conversation
    const conversationHistory = history.filter(msg => msg.id !== '0');

    // Call Gemini service with full conversation context
    return await generateGeminiResponse(userQuestion, conversationHistory);
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Pass current messages as history for context-aware responses
      const response = await generateAIResponse(userMessage.content, messages);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: language === 'fr'
          ? "Désolé, j'ai rencontré une erreur. Pouvez-vous reformuler votre question ?"
          : "Sorry, I encountered an error. Could you rephrase your question?",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopyMessage = async (messageId: string, content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedMessageId(messageId);
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleNewConversation = () => {
    const initialMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: WELCOME_MESSAGE[language],
      timestamp: new Date()
    };
    setMessages([initialMessage]);
    setInput('');
  };

  return (
    <div className="ai-assistant-page">
      <header className="ai-assistant-header">
        <div className="header-content">
          <div className="ai-avatar">🤖</div>
          <div className="header-text">
            <h1 className="page-title">
              {language === 'fr' ? 'Assistant IA' : 'AI Assistant'}
            </h1>
            <p className="page-subtitle">
              {language === 'fr'
                ? 'Posez toutes vos questions sur le chinois !'
                : 'Ask me anything about Chinese!'}
            </p>
          </div>
          <button
            className="new-conversation-btn"
            onClick={handleNewConversation}
            title={language === 'fr' ? 'Nouvelle conversation' : 'New conversation'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 5v14M5 12h14" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>{language === 'fr' ? 'Nouveau' : 'New'}</span>
          </button>
        </div>
      </header>

      <div className="chat-container">
        <div className="messages-list">
          {messages.map((message) => (
            <div key={message.id} className={`message message-${message.role}`}>
              <div className="message-avatar">
                {message.role === 'assistant' ? '🤖' : '👤'}
              </div>
              <div className="message-content">
                <div className="message-text">
                  {message.role === 'assistant' ? parseMarkdown(message.content) : message.content}
                </div>
                <div className="message-footer">
                  <div className="message-time">
                    {message.timestamp.toLocaleTimeString(language === 'fr' ? 'fr-FR' : 'en-US', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                  <button
                    className="message-action-btn"
                    onClick={() => handleCopyMessage(message.id, message.content)}
                    title={language === 'fr' ? 'Copier' : 'Copy'}
                  >
                    {copiedMessageId === message.id ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M8 4v12a2 2 0 002 2h8a2 2 0 002-2V7.242a2 2 0 00-.602-1.43L16.083 2.57A2 2 0 0014.685 2H10a2 2 0 00-2 2z" strokeWidth="2"/>
                        <path d="M16 18v2a2 2 0 01-2 2H6a2 2 0 01-2-2V9a2 2 0 012-2h2" strokeWidth="2"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="message message-assistant">
              <div className="message-avatar">🤖</div>
              <div className="message-content">
                <div className="message-text typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="suggested-questions">
          <div className="suggested-label">
            {language === 'fr' ? 'Questions suggérées :' : 'Suggested questions:'}
          </div>
          <div className="suggested-buttons">
            {SUGGESTED_QUESTIONS[language].map((question, index) => (
              <button
                key={index}
                className="suggested-button"
                onClick={() => handleSuggestedQuestion(question)}
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        <div className="chat-input-container">
          <textarea
            ref={inputRef}
            className="chat-input"
            placeholder={
              language === 'fr'
                ? 'Posez votre question...'
                : 'Ask your question...'
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
          />
          <button
            className="send-button"
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
