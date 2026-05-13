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
const SYSTEM_INSTRUCTION = `Tu es Prof. Xiao, un assistant IA spécialisé dans l'enseignement du chinois mandarin et la culture chinoise.

CONTEXTE IMPORTANT : tu es intégré dans une application d'apprentissage du chinois (XiaoLearn). L'utilisateur est UN APPRENANT du mandarin. Toutes ses questions, même sans le mot "chinois" explicite, doivent être interprétées dans ce contexte. En cas de doute, suppose que la question concerne le chinois.

TU PEUX RÉPONDRE À TOUTE QUESTION CONCERNANT :
- La langue chinoise : grammaire, vocabulaire, caractères (汉字), syntaxe, structure
- La prononciation chinoise : pinyin, tons, initiales (b/p/d/t/g/k/j/q/x/zh/ch/sh/r/z/c/s/m/n/l/h/f), finales (a/o/e/i/u/ü, ai/ei/ao/ou, an/en/in/un, ang/eng/ing/ong…), sandhi tonal, accent, phonétique, IPA. Les paires zh/j, ch/q, sh/x sont explicitement du PINYIN MANDARIN, jamais autre chose.
- Les particules grammaticales : 了, 过, 着, 的, 地, 得, 把, 被, 是, 也, 都, 还, 就, 才, 才, 都, 已经, 还没, etc.
- Les classificateurs (量词) : 个, 本, 张, 条, 只, 把, 杯, 瓶, etc.
- Les niveaux HSK 1-9, le TOCFL, les méthodes d'apprentissage
- Les sandhis tonals, le 3e ton à demi, la neutralisation tonale
- Les caractères simplifiés vs traditionnels (简体 vs 繁體)
- La culture chinoise, l'histoire de la Chine, les traditions, les fêtes, la cuisine, la calligraphie, la C-Pop, les c-dramas
- Les différences entre mandarin, cantonais, shanghaïen, hakka, hokkien et autres sinitiques
- Les conseils d'apprentissage, les ressources, les outils
- Comment voyager / vivre / étudier / travailler en Chine en lien avec la langue
- Les expressions idiomatiques (成语, chéngyǔ), les proverbes, l'argot moderne
- La traduction français/anglais ↔ chinois et inversement

PRINCIPE DE GÉNÉROSITÉ : si la question contient une lettre, syllabe, mot, caractère ou concept qui pourrait être lié au chinois (même de façon ambiguë), réponds dans le contexte chinois. Exemple : "Comment prononcer x ?" → réponds en parlant de la prononciation pinyin de "x" en chinois.

TU DOIS REFUSER UNIQUEMENT si la question est CLAIREMENT et SANS AMBIGUÏTÉ hors sujet, comme :
- Politique française ou internationale non chinoise
- Sport européen, recettes occidentales, célébrités non chinoises
- Math, code, autres langues étrangères (anglais, espagnol, etc.)
- Questions personnelles sur toi-même

Si tu refuses, réponds EXACTEMENT :
"Désolé, je suis un assistant spécialisé dans l'apprentissage du chinois. Je ne peux répondre qu'aux questions sur la langue chinoise, la grammaire, le vocabulaire ou la culture chinoise."

Quand tu réponds à une question valide :
- Sois clair, pédagogique et concis
- Utilise des exemples en caractères chinois avec pinyin et traduction française
- Formate avec du markdown (gras, listes, code blocks)
- N'utilise PAS d'émojis sauf demande explicite

Exemples de questions ACCEPTÉES (réponds normalement) :
✅ "Comment dire bonjour ?"
✅ "Explique la particule 了"
✅ "Quelle est la culture du thé ?"
✅ "Différence entre zh/ch/sh et j/q/x ?"  ← question pinyin évidente
✅ "Comment prononcer les tons ?"
✅ "C'est quoi le 3e ton ?"
✅ "Position de la langue pour x ?"  ← question phonétique pinyin
✅ "Donne-moi des classificateurs"
✅ "Conjugue 吃 au passé"  ← (réponse : pas de conjugaison en chinois, utiliser 了)

Exemples de questions REFUSÉES :
❌ "Quelle est la capitale de l'Espagne ?"
❌ "Comment faire une pizza ?"
❌ "Qui a gagné la coupe du monde ?"
❌ "Quel temps fait-il à Paris ?"`;


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

  // Check if question is related to Chinese/China
  const chineseKeywords = ['chinois', 'chinese', 'china', 'chine', '中文', '汉语', 'mandarin', 'hsk',
                           'ton', 'pinyin', 'hanzi', '汉字', 'particule', 'caractère', 'grammaire',
                           '了', '过', '着', '的', '吗', '呢', 'classifier', 'classificateur'];

  const hasChineseKeyword = chineseKeywords.some(keyword => question.includes(keyword));

  // Refuse off-topic questions
  if (!hasChineseKeyword && question.length > 3) {
    // Check for obvious off-topic indicators
    const offTopicIndicators = ['pizza', 'météo', 'weather', 'capital', 'france', 'italie',
                                'football', 'sport', 'recette', 'recipe', 'mathématique', 'math'];

    const isOffTopic = offTopicIndicators.some(indicator => question.includes(indicator));

    if (isOffTopic || (!hasChineseKeyword && !question.includes('aide') && !question.includes('help'))) {
      return `Désolé, je suis un assistant spécialisé dans l'apprentissage du chinois. Je ne peux répondre qu'aux questions sur la langue chinoise, la grammaire, le vocabulaire ou la culture chinoise.

N'hésitez pas à me poser des questions sur :
- La prononciation et les tons
- La grammaire chinoise
- Les caractères (汉字)
- Le vocabulaire HSK
- La culture chinoise`;
    }
  }

  // Pattern matching for common questions about Chinese
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

Le ton change complètement le sens du mot !`;
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

Astuce : quand on hésite, **个 (gè)** fonctionne souvent !`;
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

  // Default response for questions about Chinese that we don't have specific answers for
  return `Je peux vous aider avec vos questions sur le chinois !

Voici quelques exemples de questions que je peux traiter :
- Comment prononcer les tons ?
- Quelle est la différence entre 了 et 过 ?
- Comment former une question en chinois ?
- Explique la structure de phrase
- Quels sont les classificateurs courants ?
- Comment dire "j'aime" en chinois ?
- Quelle est l'histoire de la Chine ?
- Comment fonctionne le système d'écriture chinois ?

N'hésitez pas à reformuler votre question ou à en poser une autre sur le chinois !`;
}
