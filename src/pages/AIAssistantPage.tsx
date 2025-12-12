import { useState, useRef, useEffect } from 'react';
import type { Language } from '../i18n';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIAssistantPageProps {
  language: Language;
}

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
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: WELCOME_MESSAGE[language],
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = async (userQuestion: string): Promise<string> => {
    // Simulation d'une réponse IA basée sur des patterns
    // Dans une vraie implémentation, cela appellerait une API IA (OpenAI, Claude, etc.)

    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    const question = userQuestion.toLowerCase();

    // Réponses pré-programmées pour des questions courantes
    if (question.includes('ton') || question.includes('prononc')) {
      return language === 'fr'
        ? "Le chinois mandarin a 4 tons principaux plus un ton neutre :\n\n1️⃣ **Premier ton (ˉ)** : ton haut et plat - mā (妈, mère)\n2️⃣ **Deuxième ton (ˊ)** : ton montant - má (麻, engourdi)\n3️⃣ **Troisième ton (ˇ)** : ton descendant puis montant - mǎ (马, cheval)\n4️⃣ **Quatrième ton (ˋ)** : ton descendant - mà (骂, gronder)\n5️⃣ **Ton neutre** : court et léger - ma (吗, particule interrogative)\n\nConseil : Pratiquez en écoutant et répétant avec des locuteurs natifs !"
        : "Mandarin Chinese has 4 main tones plus a neutral tone:\n\n1️⃣ **First tone (ˉ)**: high and flat - mā (妈, mother)\n2️⃣ **Second tone (ˊ)**: rising - má (麻, numb)\n3️⃣ **Third tone (ˇ)**: falling then rising - mǎ (马, horse)\n4️⃣ **Fourth tone (ˋ)**: falling - mà (骂, to scold)\n5️⃣ **Neutral tone**: short and light - ma (吗, question particle)\n\nTip: Practice by listening and repeating with native speakers!";
    }

    if (question.includes('了') || question.includes('过')) {
      return language === 'fr'
        ? "Bonne question ! 了 (le) et 过 (guo) sont tous deux des particules aspectuelles mais avec des nuances différentes :\n\n**了 (le)** indique :\n- Une action complétée : 我吃了饭 (j'ai mangé)\n- Un changement d'état : 天冷了 (il fait froid maintenant)\n\n**过 (guo)** indique :\n- Une expérience passée : 我去过中国 (je suis déjà allé en Chine)\n- Quelque chose fait au moins une fois\n\nExemple de différence :\n- 我吃了中国菜 = J'ai mangé de la nourriture chinoise (aujourd'hui)\n- 我吃过中国菜 = J'ai déjà mangé de la nourriture chinoise (dans ma vie)"
        : "Great question! 了 (le) and 过 (guo) are both aspect particles but with different nuances:\n\n**了 (le)** indicates:\n- Completed action: 我吃了饭 (I ate)\n- Change of state: 天冷了 (it's cold now)\n\n**过 (guo)** indicates:\n- Past experience: 我去过中国 (I have been to China)\n- Something done at least once\n\nDifference example:\n- 我吃了中国菜 = I ate Chinese food (today)\n- 我吃过中国菜 = I have eaten Chinese food (in my life)";
    }

    if (question.includes('question') || question.includes('吗')) {
      return language === 'fr'
        ? "Il y a plusieurs façons de former des questions en chinois :\n\n**1. Particule 吗 (ma)** - question oui/non :\n- 你好吗？(Comment vas-tu ?)\n- 你是学生吗？(Es-tu étudiant ?)\n\n**2. Mots interrogatifs** :\n- 什么 (shénme) = quoi/quel\n- 谁 (shéi) = qui\n- 哪里/哪儿 (nǎlǐ/nǎr) = où\n- 什么时候 (shénme shíhou) = quand\n- 怎么 (zěnme) = comment\n- 为什么 (wèishénme) = pourquoi\n\n**3. Structure A-不-A** :\n- 你去不去？(Tu y vas ou pas ?)\n- 好不好？(C'est bon ou pas ?)"
        : "There are several ways to form questions in Chinese:\n\n**1. Particle 吗 (ma)** - yes/no questions:\n- 你好吗？(How are you?)\n- 你是学生吗？(Are you a student?)\n\n**2. Question words**:\n- 什么 (shénme) = what/which\n- 谁 (shéi) = who\n- 哪里/哪儿 (nǎlǐ/nǎr) = where\n- 什么时候 (shénme shíhou) = when\n- 怎么 (zěnme) = how\n- 为什么 (wèishénme) = why\n\n**3. A-not-A structure**:\n- 你去不去？(Are you going or not?)\n- 好不好？(Is it good or not?)";
    }

    if (question.includes('structure') || question.includes('phrase') || question.includes('sentence')) {
      return language === 'fr'
        ? "La structure de base d'une phrase chinoise est :\n\n**Sujet + Temps + Lieu + Verbe + Objet**\n\nExemples :\n- 我 今天 在家 看 书\n  (Je aujourd'hui à-maison lis livre)\n  = Je lis un livre à la maison aujourd'hui\n\n- 他 明天 去 学校\n  (Il demain va école)\n  = Il va à l'école demain\n\n**Points importants** :\n- Pas de conjugaison des verbes !\n- Le temps est indiqué par des mots comme 今天, 昨天, 明天\n- Les modificateurs viennent AVANT ce qu'ils modifient\n- L'ordre des mots est crucial pour le sens"
        : "The basic Chinese sentence structure is:\n\n**Subject + Time + Place + Verb + Object**\n\nExamples:\n- 我 今天 在家 看 书\n  (I today at-home read book)\n  = I'm reading a book at home today\n\n- 他 明天 去 学校\n  (He tomorrow go school)\n  = He's going to school tomorrow\n\n**Key points**:\n- No verb conjugation!\n- Time indicated by words like 今天, 昨天, 明天\n- Modifiers come BEFORE what they modify\n- Word order is crucial for meaning";
    }

    if (question.includes('classificateur') || question.includes('classifier') || question.includes('量词')) {
      return language === 'fr'
        ? "Les classificateurs (量词) sont essentiels en chinois ! Voici les plus courants :\n\n**个 (gè)** - classificateur général :\n- 一个人 (une personne)\n- 三个苹果 (trois pommes)\n\n**本 (běn)** - livres, cahiers :\n- 一本书 (un livre)\n\n**张 (zhāng)** - objets plats :\n- 一张纸 (une feuille de papier)\n- 两张照片 (deux photos)\n\n**件 (jiàn)** - vêtements, affaires :\n- 一件衣服 (un vêtement)\n\n**只 (zhī)** - animaux :\n- 一只猫 (un chat)\n\n**杯 (bēi)** - tasses, verres :\n- 一杯茶 (une tasse de thé)\n\nStructure : Nombre + Classificateur + Nom"
        : "Classifiers (量词) are essential in Chinese! Here are the most common ones:\n\n**个 (gè)** - general classifier:\n- 一个人 (one person)\n- 三个苹果 (three apples)\n\n**本 (běn)** - books, notebooks:\n- 一本书 (one book)\n\n**张 (zhāng)** - flat objects:\n- 一张纸 (one sheet of paper)\n- 两张照片 (two photos)\n\n**件 (jiàn)** - clothes, matters:\n- 一件衣服 (one piece of clothing)\n\n**只 (zhī)** - animals:\n- 一只猫 (one cat)\n\n**杯 (bēi)** - cups, glasses:\n- 一杯茶 (one cup of tea)\n\nStructure: Number + Classifier + Noun";
    }

    if (question.includes('aime') || question.includes('like') || question.includes('喜欢')) {
      return language === 'fr'
        ? "Pour exprimer 'aimer' en chinois :\n\n**喜欢 (xǐhuan)** = aimer, apprécier (activités, choses) :\n- 我喜欢中文 (J'aime le chinois)\n- 你喜欢什么？(Qu'est-ce que tu aimes ?)\n\n**爱 (ài)** = aimer (amour profond, personnes) :\n- 我爱你 (Je t'aime)\n- 我爱我的家人 (J'aime ma famille)\n\n**Nuance importante** :\n- 喜欢 est plus léger, pour les préférences\n- 爱 est plus fort, pour l'amour romantique/familial\n\nExemple :\n- 我喜欢看电影 ✓ (J'aime regarder des films)\n- 我爱看电影 ✗ (trop fort !)"
        : "To express 'like/love' in Chinese:\n\n**喜欢 (xǐhuan)** = to like, enjoy (activities, things):\n- 我喜欢中文 (I like Chinese)\n- 你喜欢什么？(What do you like?)\n\n**爱 (ài)** = to love (deep love, people):\n- 我爱你 (I love you)\n- 我爱我的家人 (I love my family)\n\n**Important nuance**:\n- 喜欢 is lighter, for preferences\n- 爱 is stronger, for romantic/familial love\n\nExample:\n- 我喜欢看电影 ✓ (I like watching movies)\n- 我爱看电影 ✗ (too strong!)";
    }

    // Réponse générique
    return language === 'fr'
      ? `C'est une excellente question sur "${userQuestion}" ! \n\nJe peux vous aider avec :\n- La grammaire chinoise\n- La prononciation et les tons\n- Le vocabulaire HSK 1-3\n- Les particules (了, 过, 着, etc.)\n- La structure des phrases\n- Les classificateurs\n- La culture chinoise\n\nPourriez-vous préciser votre question ou en choisir une parmi les suggestions ci-dessous ?`
      : `That's an excellent question about "${userQuestion}"!\n\nI can help you with:\n- Chinese grammar\n- Pronunciation and tones\n- HSK 1-3 vocabulary\n- Particles (了, 过, 着, etc.)\n- Sentence structure\n- Classifiers\n- Chinese culture\n\nCould you specify your question or choose one from the suggestions below?`;
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
      const response = await generateAIResponse(userMessage.content);

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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
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
                <div className="message-text">{message.content}</div>
                <div className="message-time">
                  {message.timestamp.toLocaleTimeString(language === 'fr' ? 'fr-FR' : 'en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
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
            onKeyPress={handleKeyPress}
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
