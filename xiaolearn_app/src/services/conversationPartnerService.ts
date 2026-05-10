/**
 * conversationPartnerService.ts — Phase 2 IA.
 * Service de conversation IA en chinois avec Gemini. L'IA joue un rôle défini
 * par le scénario et répond en chinois avec pinyin + traduction (JSON
 * structuré) pour permettre à l'apprenant de basculer ces aides à la volée.
 *
 * Approche stateless : chaque appel reçoit l'historique complet (sérialisé
 * dans le payload Gemini). Le composant page conserve l'état + persiste en
 * localStorage par scénario.
 */

import type { ConversationScenario } from '../data/conversation-scenarios';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_MODEL = 'gemini-2.5-flash';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

/** Un message dans l'historique de conversation. */
export interface ConversationMessage {
  id: string;
  role: 'user' | 'assistant';
  /** Hanzi : ce qui a été dit / écrit en chinois. */
  hanzi: string;
  /** Pinyin (assistant uniquement, optionnel pour user). */
  pinyin?: string;
  /** Traduction française (assistant uniquement). */
  translation?: string;
  timestamp: number;
}

/** Réponse structurée attendue de Gemini pour chaque tour. */
export interface AssistantTurn {
  hanzi: string;
  pinyin: string;
  translation: string;
}

/**
 * Construit le system prompt à partir du scénario. Inclut le rôle, le niveau
 * et les contraintes de format JSON pour parser la réponse côté client.
 */
function buildSystemPrompt(
  scenario: ConversationScenario
): string {
  return `Tu joues un rôle dans un dialogue d'apprentissage du chinois mandarin.

RÔLE QUE TU JOUES : ${scenario.aiRole}
RÔLE DE L'INTERLOCUTEUR (apprenant) : ${scenario.userRole}
NIVEAU DE L'APPRENANT : ${scenario.level} (CECR)

RÈGLES CRITIQUES :
1. Tu réponds UNIQUEMENT en chinois mandarin (pas un mot d'anglais ni de français dans le hanzi).
2. Reste IMMERSIF dans ton rôle. Ne casse jamais le 4e mur. Si l'apprenant fait une faute, NE LE CORRIGE PAS — réagis comme un vrai locuteur natif (demande de répéter naturellement, ou interprète au mieux).
3. Adapte la complexité au niveau ${scenario.level} :
   - A1 : phrases courtes, vocabulaire HSK 1-2, présent simple
   - A2 : phrases simples, HSK 3, passé avec 了
   - B1 : connecteurs simples, HSK 4
   - B2 : phrases articulées, connecteurs complexes, HSK 5
   - C1 : style soutenu, vocabulaire riche, HSK 5-6
   - C2 : registre lettré, chengyu occasionnels, structures complexes
4. Garde tes réponses COURTES (2-4 phrases max) pour rester conversationnel — pas un monologue.
5. Si l'apprenant écrit en français/anglais, reste EN CHINOIS et invite-le poliment à essayer en chinois.
${scenario.extraInstructions ? `\nINSTRUCTIONS SPÉCIALES :\n${scenario.extraInstructions}\n` : ''}
FORMAT DE RÉPONSE STRICT (JSON sans markdown) :
{
  "hanzi": "ta réponse en hanzi",
  "pinyin": "pinyin avec tons (ex: nǐ hǎo, qǐng zuò)",
  "translation": "traduction française fidèle"
}`;
}

/**
 * Génère le prochain tour de l'assistant. Stateless : l'historique complet
 * doit être passé. Renvoie l'objet AssistantTurn parsé.
 */
export async function generateAssistantTurn(
  scenario: ConversationScenario,
  history: ConversationMessage[],
  userMessage: string
): Promise<AssistantTurn> {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key not configured');
  }

  const systemPrompt = buildSystemPrompt(scenario);

  // Construit la séquence pour Gemini : system (en premier user, suivi d'un
  // ack model), puis l'historique converti, puis le nouveau message user.
  const contents: Array<{
    role: 'user' | 'model';
    parts: Array<{ text: string }>;
  }> = [
    { role: 'user', parts: [{ text: systemPrompt }] },
    {
      role: 'model',
      parts: [
        {
          text: JSON.stringify({
            hanzi: scenario.openingHanzi,
            pinyin: scenario.openingPinyin,
            translation: scenario.openingTranslation
          })
        }
      ]
    }
  ];

  for (const msg of history) {
    if (msg.role === 'user') {
      contents.push({ role: 'user', parts: [{ text: msg.hanzi }] });
    } else {
      contents.push({
        role: 'model',
        parts: [
          {
            text: JSON.stringify({
              hanzi: msg.hanzi,
              pinyin: msg.pinyin ?? '',
              translation: msg.translation ?? ''
            })
          }
        ]
      });
    }
  }

  contents.push({ role: 'user', parts: [{ text: userMessage }] });

  const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      generationConfig: {
        temperature: 0.85, // un peu de variabilité pour rester naturel
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 512,
        responseMimeType: 'application/json'
      },
      safetySettings: [
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' }
      ]
    })
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    console.error('Gemini conversation error:', errorBody);
    throw new Error(
      errorBody?.error?.message || `Gemini API error: ${response.status}`
    );
  }

  const data = await response.json();
  const text =
    data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? '';
  if (!text) {
    throw new Error('Empty response from Gemini');
  }

  // Sanitize et parse
  const cleaned = text
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/\s*```\s*$/i, '')
    .trim();

  let parsed: Partial<AssistantTurn>;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    console.warn('Conversation: invalid JSON from Gemini:', text);
    // Fallback : on traite tout le texte comme du hanzi sans pinyin/traduction
    return { hanzi: text, pinyin: '', translation: '' };
  }

  return {
    hanzi: String(parsed.hanzi ?? ''),
    pinyin: String(parsed.pinyin ?? ''),
    translation: String(parsed.translation ?? '')
  };
}

// ----------------------------------------------------------------------
// Persistance localStorage : 1 historique par scénario, retenu indéfiniment
// (l'utilisateur peut revenir reprendre une conversation entamée).
// ----------------------------------------------------------------------

const STORAGE_PREFIX = 'xiaolearn:conv:';

export function loadConversation(
  scenarioId: string
): ConversationMessage[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + scenarioId);
    if (!raw) return null;
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return null;
    return arr as ConversationMessage[];
  } catch {
    return null;
  }
}

export function saveConversation(
  scenarioId: string,
  messages: ConversationMessage[]
): void {
  try {
    localStorage.setItem(
      STORAGE_PREFIX + scenarioId,
      JSON.stringify(messages)
    );
  } catch (e) {
    console.warn('Failed to save conversation:', e);
  }
}

export function clearConversation(scenarioId: string): void {
  try {
    localStorage.removeItem(STORAGE_PREFIX + scenarioId);
  } catch {
    // ignore
  }
}
