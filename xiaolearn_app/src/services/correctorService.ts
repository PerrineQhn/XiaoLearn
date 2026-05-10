/**
 * correctorService.ts — appelle Gemini avec un prompt structuré pour corriger
 * une phrase écrite par l'utilisateur en chinois mandarin et renvoyer un
 * objet typé { corrected, errors[], alternative, pinyin, translation }.
 *
 * Stratégie : on demande à Gemini de répondre en JSON STRICT (sans markdown
 * fence) qu'on parse côté client. Si la réponse n'est pas du JSON valide, on
 * retombe sur un message texte affiché tel quel.
 */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_MODEL = 'gemini-2.5-flash';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

export interface CorrectionError {
  /** L'extrait original incorrect (souvent quelques caractères). */
  original: string;
  /** La version corrigée. */
  fixed: string;
  /** Explication concise de l'erreur (en français). */
  explanation: string;
}

export interface CorrectionResult {
  /** La phrase telle que l'utilisateur l'a écrite. */
  input: string;
  /** Indique si la phrase était déjà parfaitement correcte. */
  isCorrect: boolean;
  /** Phrase corrigée (égale à input si isCorrect). */
  corrected: string;
  /** Pinyin de la phrase corrigée. */
  pinyin: string;
  /** Traduction française de la phrase corrigée. */
  translation: string;
  /** Liste des erreurs détectées (vide si isCorrect). */
  errors: CorrectionError[];
  /** Une formulation alternative plus naturelle (peut être identique à corrected). */
  alternative?: string;
  /** Brève remarque pédagogique sur le style/registre. */
  note?: string;
}

const CORRECTOR_PROMPT = (input: string, level: string) => `Tu es un correcteur expert en chinois mandarin pour apprenant francophone de niveau ${level}.

Analyse cette phrase écrite par l'apprenant :
"""
${input}
"""

Réponds UNIQUEMENT par un objet JSON valide, sans markdown, sans backticks, sans préfixe, exactement dans ce format :

{
  "isCorrect": boolean,
  "corrected": "phrase corrigée en hanzi",
  "pinyin": "pinyin avec tons (ex: nǐ hǎo)",
  "translation": "traduction française fidèle",
  "errors": [
    { "original": "extrait fautif", "fixed": "extrait corrigé", "explanation": "explication courte en français" }
  ],
  "alternative": "formulation plus naturelle si différente, sinon vide",
  "note": "remarque pédagogique de 1-2 phrases (registre, style, faux-amis, etc.) ou vide"
}

RÈGLES :
- Si la phrase est correcte, isCorrect=true, errors=[], alternative=corrected.
- Si la phrase contient des erreurs (grammaire, choix de mots, ordre, tons), liste CHAQUE erreur dans errors[] avec une explication précise.
- Garde les explications brèves (1 phrase max chacune).
- Si l'apprenant a écrit en français ou autre langue, isCorrect=false, et explique gentiment dans note.
- N'invente pas d'erreurs si la phrase est correcte. Sois rigoureux mais bienveillant.
- Le JSON doit être STRICTEMENT valide (pas de virgule traînante, guillemets droits).`;

export async function correctChinese(
  input: string,
  level: string = 'B1'
): Promise<CorrectionResult> {
  const trimmed = input.trim();
  if (!trimmed) {
    throw new Error('Empty input');
  }
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key not configured');
  }

  const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [
        {
          role: 'user',
          parts: [{ text: CORRECTOR_PROMPT(trimmed, level) }]
        }
      ],
      generationConfig: {
        temperature: 0.2, // bas pour stabilité du format JSON
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
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
    console.error('Gemini corrector error:', errorBody);
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

  // Sanitize : enlève d'éventuels backticks markdown que Gemini glisse parfois.
  const cleaned = text
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/\s*```\s*$/i, '')
    .trim();

  let parsed: Partial<CorrectionResult>;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    console.warn('Gemini did not return valid JSON, raw text:', text);
    throw new Error('Format de réponse invalide. Réessayez.');
  }

  return {
    input: trimmed,
    isCorrect: Boolean(parsed.isCorrect),
    corrected: String(parsed.corrected ?? trimmed),
    pinyin: String(parsed.pinyin ?? ''),
    translation: String(parsed.translation ?? ''),
    errors: Array.isArray(parsed.errors)
      ? parsed.errors.filter((e): e is CorrectionError =>
          Boolean(e?.original && e?.fixed && e?.explanation)
        )
      : [],
    alternative: parsed.alternative ? String(parsed.alternative) : undefined,
    note: parsed.note ? String(parsed.note) : undefined
  };
}
