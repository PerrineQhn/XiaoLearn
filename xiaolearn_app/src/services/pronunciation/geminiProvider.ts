/**
 * services/pronunciation/geminiProvider.ts — Phase 4 IA.
 *
 * Implémentation du PronunciationProvider basée sur Gemini multimodal audio.
 * Gemini 2.0+ accepte de l'audio en input via inline_data avec mimeType.
 * On lui envoie : (1) l'audio en base64, (2) un prompt structuré avec le
 * texte attendu, et on lui demande un JSON typé en réponse.
 *
 * Coût : ~32 tokens/seconde d'audio à $0.10/1M tokens = $0.0002/min.
 * Pour 100 utilisateurs × 5 min/jour : ~$3/mois. Soutenable.
 */
import type {
  PronunciationProvider,
  PronunciationInput,
  PronunciationResult,
  SyllableScore
} from './types';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_MODEL = 'gemini-2.5-flash';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

/** Convertit un Blob en chaîne base64 (sans le préfixe data:). */
async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      // result est de la forme "data:audio/webm;base64,XXXX..." — on coupe
      // tout jusqu'à la virgule incluse pour ne garder que la base64 pure.
      const idx = result.indexOf(',');
      if (idx < 0) {
        reject(new Error('Invalid data URL'));
        return;
      }
      resolve(result.substring(idx + 1));
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

/**
 * Construit le prompt envoyé à Gemini. Demande un JSON strict avec score
 * global, scores par syllabe, top issues et conseil.
 */
function buildPrompt(
  expectedHanzi: string,
  expectedPinyin: string | undefined,
  level: string
): string {
  return `Tu es un coach de prononciation chinoise mandarin pour apprenant francophone de niveau ${level} (CECR).

Écoute attentivement l'audio fourni. L'apprenant a tenté de prononcer :
- Hanzi attendu : ${expectedHanzi}
${expectedPinyin ? `- Pinyin attendu : ${expectedPinyin}` : ''}

Analyse rigoureusement :
1. La phrase est-elle compréhensible ? (intelligible)
2. Pour CHAQUE syllabe attendue, le ton (1-4 ou 5=neutre) est-il correctement produit ?
3. Y a-t-il des problèmes d'initiale, de finale, de rétroflexion (zh/ch/sh/r) ?
4. Quels sont les 1-3 problèmes prioritaires ?
5. Donne UN conseil pratique et concret pour s'améliorer.

Réponds UNIQUEMENT par un objet JSON valide, sans markdown, sans backticks, exactement dans ce format :

{
  "globalScore": 0-100,
  "intelligible": true ou false,
  "syllables": [
    {
      "hanzi": "你",
      "expectedPinyin": "nǐ",
      "expectedTone": 3,
      "detectedTone": 3,
      "score": 85,
      "issue": "OK"
    }
  ],
  "topIssues": ["Ton 3 sur 你 trop court", "Initiale h aspirée"],
  "advice": "Conseil pratique en 1-2 phrases."
}

RÈGLES :
- syllables doit avoir EXACTEMENT le même nombre d'éléments que de caractères dans le hanzi attendu (un objet par syllabe). Ignore les ponctuations.
- Si le ton est correct, issue = "OK". Sinon, format court : "Ton X→Y" ou "Initiale floue" ou "Finale écourtée" etc.
- Sois rigoureux mais bienveillant. Le score ne doit pas être complaisant : un ton raté = score < 70 sur cette syllabe.
- Si l'audio est inaudible/silencieux/dans une autre langue, intelligible=false, globalScore=0, advice explique gentiment.
- N'invente PAS d'erreurs si la prononciation est correcte. Sois honnête.
- JSON STRICT : pas de virgule traînante, guillemets droits, échappements corrects.`;
}

/** Détermine le ton attendu d'une syllabe pinyin via les diacritiques. */
function pinyinToTone(syll: string): 1 | 2 | 3 | 4 | 5 | undefined {
  if (/[āēīōūǖ]/.test(syll)) return 1;
  if (/[áéíóúǘ]/.test(syll)) return 2;
  if (/[ǎěǐǒǔǚ]/.test(syll)) return 3;
  if (/[àèìòùǜ]/.test(syll)) return 4;
  // Pas de diacritique → ton neutre
  if (/[a-zü]/.test(syll)) return 5;
  return undefined;
}

export class GeminiPronunciationProvider implements PronunciationProvider {
  readonly name = 'gemini';

  isAvailable(): boolean {
    return Boolean(GEMINI_API_KEY);
  }

  async assess(input: PronunciationInput): Promise<PronunciationResult> {
    if (!this.isAvailable()) {
      throw new Error('Gemini API key not configured');
    }

    const { audioBlob, expectedHanzi, expectedPinyin, level = 'B1' } = input;

    if (!expectedHanzi.trim()) {
      throw new Error('Expected hanzi is required');
    }
    if (audioBlob.size === 0) {
      throw new Error('Audio blob is empty');
    }

    const base64Audio = await blobToBase64(audioBlob);
    // Gemini accepte plusieurs mimes audio. On envoie le mime du Blob tel
    // quel — MediaRecorder produit par défaut "audio/webm;codecs=opus" qui
    // est accepté par Gemini 2.5 Flash. Pour wav/mp3, c'est aussi OK.
    const mimeType = audioBlob.type || 'audio/webm';

    const prompt = buildPrompt(expectedHanzi, expectedPinyin, level);

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [
              { text: prompt },
              { inline_data: { mime_type: mimeType, data: base64Audio } }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.2, // bas pour stabilité du JSON et de la rigueur
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
      console.error('Gemini pronunciation error:', errorBody);
      throw new Error(
        errorBody?.error?.message || `Gemini API error: ${response.status}`
      );
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? '';
    if (!text) {
      throw new Error('Empty response from Gemini');
    }

    const cleaned = text
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```\s*$/i, '')
      .trim();

    let parsed: Partial<PronunciationResult>;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      console.warn('Pronunciation: invalid JSON from Gemini:', text);
      throw new Error('Format de réponse invalide. Réessaie.');
    }

    // Validation et normalisation défensives
    const rawSyllables: Partial<SyllableScore>[] = Array.isArray(parsed.syllables)
      ? (parsed.syllables as Partial<SyllableScore>[]).filter(
          (s): boolean => Boolean(s && typeof s === 'object')
        )
      : [];
    const syllables: SyllableScore[] = rawSyllables
      .map((s) => {
        const expectedTone =
          typeof s.expectedTone === 'number' &&
          s.expectedTone >= 1 &&
          s.expectedTone <= 5
            ? (s.expectedTone as 1 | 2 | 3 | 4 | 5)
            : pinyinToTone(String(s.expectedPinyin ?? ''));
        const detectedTone =
          typeof s.detectedTone === 'number' &&
          s.detectedTone >= 1 &&
          s.detectedTone <= 5
            ? (s.detectedTone as 1 | 2 | 3 | 4 | 5)
            : undefined;
        return {
          hanzi: String(s.hanzi ?? ''),
          expectedPinyin: String(s.expectedPinyin ?? ''),
          expectedTone,
          detectedTone,
          score: clampScore(s.score),
          issue: String(s.issue ?? 'OK')
        };
      });

    return {
      globalScore: clampScore(parsed.globalScore),
      intelligible: Boolean(parsed.intelligible),
      syllables,
      topIssues: Array.isArray(parsed.topIssues)
        ? parsed.topIssues.filter((i): i is string => typeof i === 'string')
        : [],
      advice: typeof parsed.advice === 'string' ? parsed.advice : '',
      providerName: this.name
    };
  }
}

function clampScore(v: unknown): number {
  const n = Number(v);
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(100, Math.round(n)));
}
