import { useState, useRef, useEffect } from 'react';
import type { Language } from '../i18n';
import { parseMarkdown } from '../utils/markdownUtils';
import { generateGeminiResponse } from '../services/geminiService';
import './AIFloatingChat.css';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIFloatingChatProps {
  language: Language;
}

const STORAGE_KEY = 'ai_floating_chat_messages';

const WELCOME_MESSAGE = {
  fr: "Bonjour ! Je suis votre assistant IA. Posez-moi vos questions sur le chinois !",
  en: "Hello! I'm your AI assistant. Ask me questions about Chinese!"
};

export default function AIFloatingChat({ language }: AIFloatingChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
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
  });
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

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (error) {
      console.error('Failed to save messages:', error);
    }
  }, [messages]);

  const generateAIResponse = async (userQuestion: string, history: Message[]): Promise<string> => {
    const conversationHistory = history.filter(msg => msg.id !== '0');
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
        aria-label={language === 'fr' ? 'Ouvrir le chat IA' : 'Open AI chat'}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="floating-chat-window">
          <div className="floating-chat-header">
            <div className="floating-chat-title">
              <span className="chat-avatar">🤖</span>
              <div className="chat-title-text">
                <div className="chat-title-main">
                  {language === 'fr' ? 'Assistant IA' : 'AI Assistant'}
                </div>
                <div className="chat-status">
                  {language === 'fr' ? 'En ligne' : 'Online'}
                </div>
              </div>
            </div>
            <button
              className="floating-chat-close"
              onClick={handleToggle}
              aria-label={language === 'fr' ? 'Fermer' : 'Close'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
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
