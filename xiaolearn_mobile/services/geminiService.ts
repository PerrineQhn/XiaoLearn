/**
 * geminiService (mobile) — Prof. Xiao AI
 * Même system prompt que la web app, via le même proxy Cloud Function.
 */
import { callLlmProxy, type LlmProxyMessage } from './llmProxyClient';

// ─── Prompt système (identique à la web app) ──────────────────────────────────

const SYSTEM_INSTRUCTION = `Tu es Prof. Xiao, un assistant IA spécialisé dans l'enseignement du chinois mandarin et la culture chinoise.

CONTEXTE IMPORTANT : tu es intégré dans une application d'apprentissage du chinois (XiaoLearn). L'utilisateur est UN APPRENANT du mandarin. Toutes ses questions, même sans le mot "chinois" explicite, doivent être interprétées dans ce contexte.

TU PEUX RÉPONDRE À TOUTE QUESTION CONCERNANT :
- La langue chinoise : grammaire, vocabulaire, caractères (汉字), syntaxe, structure
- La prononciation chinoise : pinyin, tons, initiales, finales, sandhi tonal
- Les particules grammaticales : 了, 过, 着, 的, 地, 得, 把, 被, etc.
- Les classificateurs (量词) : 个, 本, 张, 条, 只, etc.
- Les niveaux HSK 1-9, le TOCFL, les méthodes d'apprentissage
- La culture chinoise, l'histoire, les traditions, les fêtes, la cuisine
- Les expressions idiomatiques (成语), les proverbes, l'argot
- La traduction français ↔ chinois

TU DOIS REFUSER UNIQUEMENT si la question est CLAIREMENT hors sujet (politique non chinoise, sport européen, recettes occidentales, etc.).

Si tu refuses : "Désolé, je suis un assistant spécialisé dans l'apprentissage du chinois. Je ne peux répondre qu'aux questions sur la langue, la grammaire, le vocabulaire ou la culture chinoise."

Quand tu réponds :
- TUTOIE toujours l'utilisateur : dis « tu », jamais « vous ». XiaoLearn tutoie
  partout, un professeur qui vouvoie au milieu détonne. (Le vouvoiement chinois
  您 reste bien sûr un sujet d'enseignement légitime.)
- Sois clair, pédagogique et concis
- Utilise des exemples en caractères chinois avec pinyin et traduction française
- Formate avec du markdown (gras, listes)

DÉTECTION D'ERREURS :
Si le message de l'utilisateur contient du chinois (hanzi OU pinyin) avec au moins une faute, tu DOIS terminer ta réponse par ce bloc :

<<<CORRECTIONS>>>
{"corrections":[{"category":"grammaire","severity":"importante","wrong":"三个书","correct":"三本书","pinyin":"sān běn shū","translation":"trois livres","explanation":"书 (livre) requiert le classificateur 本, pas 个."}]}
<<<END>>>

RÈGLE ABSOLUE : ce bloc est OBLIGATOIRE même quand l'utilisateur demande explicitement une correction et que tu l'expliques déjà dans ta réponse. Expliquer en prose ne remplace PAS le bloc : c'est le bloc, et lui seul, qui enregistre la faute dans l'application (cartes de correction, écran « Mes erreurs », statistiques de progression). Sans lui, ta correction est perdue pour l'apprenant.

Catégories : particule, ton, prononciation, politesse, vocabulaire, grammaire, mesureur, caractere, traduction, orthographe, autre
Sévérités : mineure, importante, critique

N'omets le bloc que dans deux cas : le message ne contient aucun chinois, ou le chinois est entièrement correct.`;

/**
 * Consigne de langue ajoutée au prompt système.
 *
 * Le prompt est rédigé en français et demande des traductions françaises :
 * Prof. Xiao répondait donc en français même avec l'interface en anglais, et
 * les explications de correction aussi. Plutôt que de maintenir deux prompts
 * complets — deux fois plus de dérive à surveiller — on ajoute une consigne
 * finale, que le modèle applique à la langue de sortie sans toucher au reste.
 */
function languageDirective(lang: 'fr' | 'en'): string {
  return lang === 'en'
    ? `\n\nLANGUAGE: reply in ENGLISH. Give English translations rather than French ones, and write the "translation" and "explanation" fields of the corrections block in English. Chinese characters and pinyin stay as they are.`
    : '';
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface AiCorrection {
  category: string;
  severity?: string;
  wrong: string;
  correct: string;
  pinyin?: string;
  translation?: string;
  explanation: string;
}

export interface AiResponse {
  text: string;
  corrections: AiCorrection[];
}

// ─── Parse du bloc <<<CORRECTIONS>>> ─────────────────────────────────────────

const CORRECTIONS_RE = /<<<CORRECTIONS>>>([\s\S]*?)<<<END>>>/i;

export function parseCorrections(rawText: string): AiResponse {
  const match = rawText.match(CORRECTIONS_RE);
  if (!match) return { text: rawText.trim(), corrections: [] };

  const visibleText = rawText.replace(CORRECTIONS_RE, '').trim();
  try {
    const parsed = JSON.parse(match[1].trim()) as { corrections: unknown[] };
    if (Array.isArray(parsed?.corrections)) {
      const corrections: AiCorrection[] = parsed.corrections
        .filter((c): c is Record<string, unknown> => c !== null && typeof c === 'object')
        .map(c => ({
          category: String(c.category ?? 'autre'),
          severity: c.severity ? String(c.severity) : 'importante',
          wrong: String(c.wrong ?? ''),
          correct: String(c.correct ?? ''),
          pinyin: c.pinyin ? String(c.pinyin) : undefined,
          translation: c.translation ? String(c.translation) : undefined,
          explanation: String(c.explanation ?? ''),
        }))
        .filter(c => c.wrong && c.correct);
      return { text: visibleText, corrections };
    }
  } catch { /* JSON malformé */ }

  return { text: visibleText, corrections: [] };
}

// ─── API principale ───────────────────────────────────────────────────────────

export async function askProfXiao(
  userMessage: string,
  history: ChatMessage[] = [],
  lang: 'fr' | 'en' = 'fr',
): Promise<AiResponse> {
  const historyPayload: LlmProxyMessage[] = history.map(m => ({
    role: m.role,
    content: m.content,
  }));

  const { text } = await callLlmProxy({
    systemPrompt: SYSTEM_INSTRUCTION + languageDirective(lang),
    history: historyPayload,
    userMessage,
    generationConfig: { temperature: 0.7, maxOutputTokens: 2048, topK: 40, topP: 0.95 },
  });

  return parseCorrections(text);
}
