/**
 * Service for interacting with Google Gemini AI API
 * Uses the REST API endpoint for Gemini 1.5 Flash (free tier)
 */

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface GeminiMessage {
  role: 'user' | 'model';
  parts: Array<{ text: string }>;
}

interface GeminiResponse {
  candidates?: Array<{
    content: {
      parts: Array<{ text: string }>;
    };
  }>;
  error?: {
    message: string;
    code: number;
  };
}

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_MODEL = 'gemini-2.5-flash'; // Updated to latest free model
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

// System prompt to guide Gemini's behavior for Chinese learning
const SYSTEM_INSTRUCTION = `Tu es un assistant IA spécialisé dans l'enseignement du chinois mandarin.
Tu aides les apprenants francophones et anglophones à comprendre:
- La grammaire chinoise
- Le vocabulaire et les caractères (汉字)
- La prononciation et les tons
- Les particules grammaticales (了, 过, 着, 的, etc.)
- La structure des phrases
- Les classificateurs (量词)
- La culture chinoise

Réponds de manière claire, pédagogique et concise. Utilise des exemples en caractères chinois avec pinyin et traductions.
Formate tes réponses avec du markdown pour une meilleure lisibilité (gras, listes, code blocks pour les exemples).`;

/**
 * Convert app messages to Gemini format
 */
function convertToGeminiMessages(messages: Message[]): GeminiMessage[] {
  return messages.map(msg => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }]
  }));
}

/**
 * Call Gemini API to generate a response
 */
export async function generateGeminiResponse(
  userMessage: string,
  conversationHistory: Message[] = []
): Promise<string> {
  // Check if API key is configured
  if (!GEMINI_API_KEY) {
    console.warn('⚠️ Gemini API key not configured. Using fallback responses.');
    return getFallbackResponse(userMessage);
  }

  try {
    // Prepare messages for Gemini
    // Add system instruction as first user message, then history, then current message
    const systemMessage: GeminiMessage = {
      role: 'user',
      parts: [{ text: SYSTEM_INSTRUCTION }]
    };

    const systemResponse: GeminiMessage = {
      role: 'model',
      parts: [{ text: 'Compris. Je suis prêt à aider avec l\'apprentissage du chinois.' }]
    };

    const historyMessages = convertToGeminiMessages(conversationHistory);
    const currentMessage: GeminiMessage = {
      role: 'user',
      parts: [{ text: userMessage }]
    };

    const contents = [systemMessage, systemResponse, ...historyMessages, currentMessage];

    // Call Gemini API
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error:', errorData);

      // Check for specific error types
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again in a moment.');
      } else if (response.status === 401 || response.status === 403) {
        throw new Error('API key invalid or unauthorized.');
      }

      throw new Error(`API request failed: ${response.status}`);
    }

    const data: GeminiResponse = await response.json();

    // Extract response text
    if (data.candidates && data.candidates.length > 0) {
      const responseText = data.candidates[0].content.parts[0].text;
      return responseText;
    }

    // If no valid response, use fallback
    console.warn('No valid response from Gemini API');
    return getFallbackResponse(userMessage);

  } catch (error) {
    console.error('Error calling Gemini API:', error);

    // Return fallback response on error
    return getFallbackResponse(userMessage);
  }
}

/**
 * Fallback response using pattern matching
 * Used when API is unavailable or fails
 */
function getFallbackResponse(userQuestion: string): string {
  const question = userQuestion.toLowerCase();

  // Pattern matching for common questions
  if (question.includes('ton') || question.includes('prononc')) {
    return `Le chinois mandarin utilise **4 tons principaux** + 1 ton neutre :

1. **Premier ton (ā)** : haut et plat, comme chanter une note aiguë
2. **Deuxième ton (á)** : montant, comme poser une question en français
3. **Troisième ton (ǎ)** : descendant puis montant, en forme de "V"
4. **Quatrième ton (à)** : descendant brusquement, comme donner un ordre

Exemple avec "ma" :
- mā (妈) = maman
- má (麻) = chanvre
- mǎ (马) = cheval
- mà (骂) = gronder

Le ton change complètement le sens du mot ! 🎵`;
  }

  if (question.includes('了') || question.includes('le particle')) {
    return `La particule **了 (le)** a deux usages principaux :

1. **了 aspectuel** (après le verbe) : indique une action accomplie
   - 我吃了饭。(Wǒ chī le fàn) = J'ai mangé.

2. **了 modal** (fin de phrase) : indique un changement d'état
   - 天黑了。(Tiān hēi le) = Il fait nuit maintenant (changement).

**Différence avec 过 (guò)** :
- 了 = action récente, pertinente maintenant
- 过 = expérience passée, moins liée au présent

Exemple :
- 我吃了饭。= Je viens de manger (récent)
- 我吃过中国菜。= J'ai déjà mangé chinois (expérience)`;
  }

  if (question.includes('question') || question.includes('interrogat')) {
    return `Il existe **3 façons principales** de former une question en chinois :

1. **Particule 吗 (ma)** à la fin
   - 你是学生吗？(Nǐ shì xuésheng ma?) = Es-tu étudiant ?

2. **Forme A-不-A** (affirmatif-négatif)
   - 你是不是学生？(Nǐ shì bú shì xuésheng?) = Es-tu étudiant ?

3. **Mots interrogatifs** (谁 qui, 什么 quoi, 哪里 où, etc.)
   - 你叫什么？(Nǐ jiào shénme?) = Comment t'appelles-tu ?

Pas besoin d'inverser le sujet et le verbe comme en français ! 👍`;
  }

  if (question.includes('structure') || question.includes('phrase') || question.includes('sentence')) {
    return `La **structure de base** d'une phrase chinoise :

**Sujet + Temps + Lieu + Manière + Verbe + Objet**
(S + T + L + M + V + O)

Exemple complet :
**我 今天 在家 认真地 学习 中文。**
(Wǒ jīntiān zài jiā rènzhēn de xuéxí Zhōngwén)
= Je aujourd'hui à-maison sérieusement étudier chinois
= J'étudie sérieusement le chinois à la maison aujourd'hui.

Points clés :
- Le verbe est toujours au centre
- Les modificateurs viennent AVANT ce qu'ils modifient
- Pas de conjugaison ! Le temps s'exprime avec des mots (今天, 明天, 了, etc.)`;
  }

  if (question.includes('classificateur') || question.includes('measure word') || question.includes('量词')) {
    return `Les **classificateurs (量词)** sont obligatoires entre un nombre et un nom :

**Nombre + Classificateur + Nom**

Classificateurs les plus courants :

- **个 (gè)** : général, personnes, objets
  - 一个人 (yí gè rén) = une personne

- **本 (běn)** : livres, cahiers
  - 两本书 (liǎng běn shū) = deux livres

- **张 (zhāng)** : surfaces plates (table, papier, lit)
  - 三张纸 (sān zhāng zhǐ) = trois feuilles

- **条 (tiáo)** : objets longs (rue, poisson, pantalon)
  - 一条路 (yì tiáo lù) = une rue

- **杯 (bēi)** : tasse, verre
  - 一杯茶 (yì bēi chá) = une tasse de thé

Astuce : quand on hésite, **个 (gè)** fonctionne souvent ! 😊`;
  }

  if (question.includes('aime') || question.includes('like') || question.includes('喜欢')) {
    return `Pour exprimer **"aimer"** en chinois :

1. **喜欢 (xǐhuan)** : aimer, apprécier (général)
   - 我喜欢中文。(Wǒ xǐhuan Zhōngwén) = J'aime le chinois.

2. **爱 (ài)** : aimer profondément, amour
   - 我爱你。(Wǒ ài nǐ) = Je t'aime.
   - 我爱我的家人。(Wǒ ài wǒ de jiārén) = J'aime ma famille.

**Différence** :
- 喜欢 = "like" (léger, activités, choses)
- 爱 = "love" (fort, personnes, passions)

Pour dire ce qu'on **n'aime pas** :
- 我不喜欢... (Wǒ bù xǐhuan...) = Je n'aime pas...

Exemples :
- 我喜欢看书。= J'aime lire.
- 我不喜欢运动。= Je n'aime pas le sport.`;
  }

  // Default response
  return `Je suis désolé, je ne peux pas répondre à cette question pour le moment (mode hors ligne).

Voici quelques questions courantes que je peux traiter :
- Comment prononcer les tons ?
- Quelle est la différence entre 了 et 过 ?
- Comment former une question ?
- Explique la structure de phrase
- Quels sont les classificateurs courants ?
- Comment dire "j'aime" ?

N'hésitez pas à reformuler ou à poser une autre question ! 😊`;
}
