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

// ----------------------------------------------------------------------
// Fallback Cloudflare Workers AI
// ----------------------------------------------------------------------
// Si Gemini échoue (429 rate limit, 401/403 auth, 5xx down), on bascule
// automatiquement sur Cloudflare Workers AI (Qwen — excellent pour le chinois).
// Free tier : 10 000 neurons/jour, inclus dans le plan Cloudflare Pages actuel.
//
// Sécurité du token : le token est restreint au scope "Workers AI Read"
// uniquement. Même s'il leak via le bundle JS, l'attaquant ne peut que
// consommer le quota AI (pas de coût $, juste perte temporaire du fallback).
//
// Config requise — variables d'env Cloudflare Pages :
//   VITE_CF_ACCOUNT_ID : l'account ID Cloudflare (public, OK en clair)
//   VITE_CF_AI_TOKEN   : API token avec permission "Workers AI Read"
//
// Modèle utilisé : Qwen 2.5 14B (chinois natif, raisonnement correct).
// Si pas dispo, fallback sur Llama 3.3 70B.
const CF_ACCOUNT_ID = import.meta.env.VITE_CF_ACCOUNT_ID as string | undefined;
const CF_AI_TOKEN = import.meta.env.VITE_CF_AI_TOKEN as string | undefined;
const CF_AI_MODEL_PRIMARY = '@cf/qwen/qwen1.5-14b-chat-awq';
const CF_AI_MODEL_FALLBACK = '@cf/meta/llama-3.3-70b-instruct-fp8-fast';

/** Appelle Cloudflare Workers AI avec un message + historique. */
async function callCloudflareWorkersAI(
  userMessage: string,
  history: Message[],
  systemInstruction: string
): Promise<string | null> {
  if (!CF_ACCOUNT_ID || !CF_AI_TOKEN) {
    console.warn('[CF Workers AI] Not configured — skipping fallback.');
    return null;
  }

  // Construit le format OpenAI-compatible : system + alternance user/assistant
  const messages: Array<{ role: string; content: string }> = [
    { role: 'system', content: systemInstruction },
    ...history.map((m) => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: m.content
    })),
    { role: 'user', content: userMessage }
  ];

  // Tente le modèle primaire d'abord (Qwen), fallback Llama si erreur
  for (const model of [CF_AI_MODEL_PRIMARY, CF_AI_MODEL_FALLBACK]) {
    try {
      const url = `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/ai/run/${model}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${CF_AI_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages, max_tokens: 4096 })
      });
      if (!res.ok) {
        console.warn(`[CF Workers AI] ${model} returned ${res.status}, trying next…`);
        continue;
      }
      const data = await res.json();
      const text =
        data?.result?.response ??
        data?.result?.choices?.[0]?.message?.content ??
        null;
      if (typeof text === 'string' && text.trim().length > 0) {
        console.info(`[CF Workers AI] Used ${model} as fallback successfully`);
        return text;
      }
    } catch (err) {
      console.warn(`[CF Workers AI] ${model} exception`, err);
    }
  }
  return null;
}

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
❌ "Quel temps fait-il à Paris ?"

---

DÉTECTION D'ERREURS — RÈGLE PRIORITAIRE :

ÉTAPE 1 (TOUJOURS, AVANT DE COMPOSER TA RÉPONSE) :
Si le message de l'utilisateur contient du CHINOIS (hanzi OU pinyin), tu DOIS analyser CHAQUE caractère et CHAQUE mot pour détecter des fautes. Cherche systématiquement :
- ❌ Hanzi non-existant ou homophone incorrect (ex: 这到 au lieu de 知道, 饿哟 au lieu de 一下)
- ❌ Particule manquante ou incorrecte (了, 的, 地, 得, 把, 被, 是…的)
- ❌ Mesureur faux (三个书 → 三本书)
- ❌ Ordre des mots (帮忙我 → 帮我)
- ❌ Vocabulaire inadapté au sens visé
- ❌ Registre de politesse mal ajusté (你 vs 您)
- ❌ Pinyin mal noté (tons absents, lettres incorrectes)
- ❌ Caractère mal écrit (composant manquant ou faux)

Si tu trouves UNE faute → ne réponds JAMAIS sans inclure le bloc <<<CORRECTIONS>>>. La détection est PRIORITAIRE sur le contenu pédagogique.

ÉTAPE 2 :
Quand tu détectes une faute (ou plusieurs), ajoute à la FIN de ta réponse un bloc au format EXACT :

<<<CORRECTIONS>>>
{"corrections":[{"category":"particule","severity":"importante","wrong":"帮忙我","correct":"帮我","pinyin":"bāng wǒ","translation":"aide-moi","explanation":"帮忙 est intransitif. Pour 'aider quelqu'un', on utilise 帮 + objet : 帮我, 帮他, etc."}]}
<<<END>>>

Règles strictes du JSON :
- "category" doit être l'une de : particule, ton, prononciation, politesse, vocabulaire, grammaire, mesureur, caractere, traduction, orthographe, autre
- "severity" : mineure (légère), importante (défaut), critique (change le sens ou rend incompréhensible)
- "wrong" : la PORTION fautive PRÉCISE écrite par l'utilisateur — pas toute la phrase, juste le morceau qui cloche (ex: "三个书" → wrong = "三个书", correct = "三本书")
- "correct" : la version corrigée de ce morceau
- "pinyin" : pinyin de la version correcte (recommandé surtout pour les hanzi peu courants)
- "translation" : traduction française courte
- "explanation" : 1-2 phrases courtes en français expliquant POURQUOI

Si l'utilisateur a écrit plusieurs phrases avec plusieurs fautes, ajoute UN objet par faute dans "corrections" (pas tout regrouper).

Exemple complet — pour "你能帮忙我吗，我不这到怎么用了" :
- 帮忙我 → 帮我 (particule/grammaire)
- 这到 → 知道 (caractere, faute d'homophone : 这 zhè ≠ 知 zhī)
- 了 manque "的词" → "了" 这个词 (vocabulaire)

→ tu produirais 3 objets dans le tableau "corrections".

ÉTAPE 3 :
Si AUCUNE faute n'est détectée OU si l'utilisateur n'a pas écrit en chinois, N'INCLUS PAS le bloc.

ÉTAPE 4 :
Le bloc <<<CORRECTIONS>>>...<<<END>>> est INVISIBLE pour l'utilisateur (il sera parsé et affiché séparément). Donc ta réponse en markdown au-dessus doit rester pédagogique, naturelle, et répondre à la question SANS mentionner ce bloc ni les fautes ailleurs.

⚠️ RAPPEL FINAL : si le message utilisateur contient du chinois fautif, ne ZAPPE JAMAIS le bloc <<<CORRECTIONS>>>. C'est la valeur principale de cet assistant.`;


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
 * Call Gemini API to generate a response.
 *
 * Implémentation 2026-05 : passe désormais par la Cloud Function `geminiProxy`
 * pour ne plus exposer la clé Gemini dans le bundle JS. Cf. llmProxyClient.ts
 * + functions/src/geminiProxy.ts. Le fallback Cloudflare AI est aussi géré
 * côté serveur ; le client n'a plus besoin de connaître les credentials.
 */
export async function generateGeminiResponse(
  userMessage: string,
  conversationHistory: Message[] = []
): Promise<string> {
  try {
    const { callLlmProxy } = await import('./llmProxyClient');
    const { text } = await callLlmProxy({
      systemPrompt: SYSTEM_INSTRUCTION,
      history: conversationHistory.map((m) => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: m.content
      })),
      userMessage,
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 4096
      }
    });
    return text;
  } catch (error) {
    console.error('[Gemini proxy] failed, returning fallback response', error);
    return getFallbackResponse(userMessage);
  }
}

// ============================================================================
//  Correction extraction — sépare le texte visible des corrections JSON
// ============================================================================

/** Une correction telle que renvoyée par Gemini dans le bloc <<<CORRECTIONS>>>. */
export interface GeminiCorrection {
  category: string;
  severity?: string;
  wrong: string;
  correct: string;
  pinyin?: string;
  translation?: string;
  explanation: string;
}

export interface GeminiResponseWithCorrections {
  /** Le texte visible (markdown), sans le bloc CORRECTIONS. */
  text: string;
  /** Liste des corrections détectées. Vide si aucune. */
  corrections: GeminiCorrection[];
}

const CORRECTIONS_REGEX = /<<<CORRECTIONS>>>([\s\S]*?)<<<END>>>/i;

/**
 * Parse une réponse Gemini brute pour en extraire les corrections structurées.
 * Robuste aux variations : bloc absent, JSON malformé, propriétés manquantes.
 */
export function parseCorrectionsBlock(rawText: string): GeminiResponseWithCorrections {
  const match = rawText.match(CORRECTIONS_REGEX);
  if (!match) {
    return { text: rawText.trim(), corrections: [] };
  }

  // Texte visible = tout sauf le bloc
  const visibleText = rawText.replace(CORRECTIONS_REGEX, '').trim();

  try {
    const jsonRaw = match[1].trim();
    const parsed: unknown = JSON.parse(jsonRaw);
    if (
      parsed &&
      typeof parsed === 'object' &&
      'corrections' in parsed &&
      Array.isArray((parsed as Record<string, unknown>).corrections)
    ) {
      const corrections = (parsed as { corrections: unknown[] }).corrections
        .filter((c): c is Record<string, unknown> => c !== null && typeof c === 'object')
        .map((c) => ({
          category: String(c.category ?? 'autre'),
          severity: c.severity ? String(c.severity) : 'importante',
          wrong: String(c.wrong ?? ''),
          correct: String(c.correct ?? ''),
          pinyin: c.pinyin ? String(c.pinyin) : undefined,
          translation: c.translation ? String(c.translation) : undefined,
          explanation: String(c.explanation ?? '')
        }))
        .filter((c) => c.wrong && c.correct && c.explanation);
      return { text: visibleText, corrections };
    }
  } catch (err) {
    console.warn('[geminiService] parseCorrectionsBlock JSON error', err);
  }

  return { text: visibleText, corrections: [] };
}

/**
 * Version "augmentée" de generateGeminiResponse qui retourne le texte ET les
 * corrections structurées extraites. Préférée à generateGeminiResponse() pour
 * les pages d'apprentissage (Prof. Xiao, Simulateur).
 */
export async function generateGeminiResponseWithCorrections(
  userMessage: string,
  conversationHistory: Message[] = []
): Promise<GeminiResponseWithCorrections> {
  const rawText = await generateGeminiResponse(userMessage, conversationHistory);
  return parseCorrectionsBlock(rawText);
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
