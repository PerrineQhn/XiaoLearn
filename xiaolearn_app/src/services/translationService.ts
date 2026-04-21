import type { Language } from '../i18n';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';
const GEMINI_PROXY_PATH = '/api/gemini-proxy';
const GEMINI_MODELS = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash-latest'] as const;

export type TranslationDirection = 'fr-zh' | 'zh-fr';
export type TranslationRegister = 'neutral' | 'formal' | 'casual';

export interface TranslationRequest {
  text: string;
  direction: TranslationDirection;
  register: TranslationRegister;
  uiLanguage: Language;
}

export interface TranslationResult {
  translation: string;
  pinyin: string;
  alternatives: string[];
  notes: string[];
  detectedSourceLanguage: 'fr' | 'zh' | 'unknown';
  modelUsed: string;
}

const canUseGeminiProxy = () =>
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

const parseGeminiText = (data: unknown): string | undefined => {
  const safe = data as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  };
  return safe.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
};

const callGeminiDirect = async (model: string, body: unknown) => {
  if (!GEMINI_API_KEY) {
    return {
      response: new Response(null, { status: 503 }),
      text: 'Gemini API key missing',
      data: null as unknown
    };
  }

  const response = await fetch(`${GEMINI_API_BASE}/${model}:generateContent?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  const text = await response.text();
  let data: unknown = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = null;
  }
  return { response, text, data };
};

const callGeminiProxy = async (model: string, body: unknown) => {
  const response = await fetch(GEMINI_PROXY_PATH, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model, body })
  });
  const text = await response.text();
  let data: unknown = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = null;
  }
  return { response, text, data };
};

const runGeminiGenerateContent = async (model: string, body: unknown) => {
  try {
    if (canUseGeminiProxy()) {
      const proxied = await callGeminiProxy(model, body);
      if (proxied.response.ok) {
        return { ok: true as const, text: parseGeminiText(proxied.data) };
      }
      const directAfterProxy = await callGeminiDirect(model, body);
      if (directAfterProxy.response.ok) {
        return { ok: true as const, text: parseGeminiText(directAfterProxy.data) };
      }
      return {
        ok: false as const,
        status: proxied.response.status || directAfterProxy.response.status,
        bodyText: proxied.text || directAfterProxy.text
      };
    }

    const direct = await callGeminiDirect(model, body);
    if (direct.response.ok) {
      return { ok: true as const, text: parseGeminiText(direct.data) };
    }
    return { ok: false as const, status: direct.response.status, bodyText: direct.text };
  } catch (error) {
    return {
      ok: false as const,
      status: 0,
      bodyText: error instanceof Error ? error.message : String(error)
    };
  }
};

const extractJsonObjectText = (raw: string): string => {
  const withoutFence = raw
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```$/i, '')
    .trim();
  if (!withoutFence) return '';
  if (withoutFence.startsWith('{') && withoutFence.endsWith('}')) return withoutFence;
  const first = withoutFence.indexOf('{');
  const last = withoutFence.lastIndexOf('}');
  if (first >= 0 && last > first) {
    return withoutFence.slice(first, last + 1);
  }
  return withoutFence;
};

const normalizeJsonLikeText = (input: string): string => {
  return input
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/"\s+"([A-Za-z_][A-Za-z0-9_]*)"\s*:/g, '"$1":')
    .replace(/,\s*([}\]])/g, '$1')
    .replace(/([{,]\s*)([A-Za-z_][A-Za-z0-9_]*)(\s*:)/g, '$1"$2"$3');
};

const parseJsonObjectLoose = <T>(raw: string): T | null => {
  const extracted = extractJsonObjectText(raw);
  const attempts = [extracted, normalizeJsonLikeText(extracted), normalizeJsonLikeText(raw)];

  for (const attempt of attempts) {
    const trimmed = attempt.trim();
    if (!trimmed.startsWith('{') || !trimmed.endsWith('}')) continue;
    try {
      return JSON.parse(trimmed) as T;
    } catch {
      // Try next strategy.
    }
  }
  return null;
};

const cleanLooseFieldValue = (value: string) =>
  value
    .trim()
    .replace(/^['"]+/, '')
    .replace(/['"]+$/, '')
    .trim();

const extractLooseFieldValue = (raw: string, key: string): string => {
  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const patterns = [
    new RegExp(`["']?\\s*${escapedKey}\\s*["']?\\s*:\\s*"([^"]*)"`, 'i'),
    new RegExp(`["']?\\s*${escapedKey}\\s*["']?\\s*:\\s*'([^']*)'`, 'i'),
    new RegExp(`["']?\\s*${escapedKey}\\s*["']?\\s*:\\s*([^,\\n}\\]]+)`, 'i')
  ];

  for (const pattern of patterns) {
    const match = raw.match(pattern);
    if (match?.[1]) {
      return cleanLooseFieldValue(match[1]);
    }
  }
  return '';
};

const extractLooseArray = (raw: string, key: string): string[] => {
  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = raw.match(new RegExp(`["']?\\s*${escapedKey}\\s*["']?\\s*:\\s*\\[([\\s\\S]*?)\\]`, 'i'));
  if (!match?.[1]) return [];
  return match[1]
    .split(',')
    .map((item) => cleanLooseFieldValue(item))
    .filter(Boolean)
    .slice(0, 5);
};

const toStringArray = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => String(item || '').trim())
    .filter(Boolean)
    .slice(0, 5);
};

const parseTranslationPayload = (
  raw: string,
  direction: TranslationDirection
): Omit<TranslationResult, 'modelUsed'> => {
  const safeRaw = raw.trim();
  const parsed = parseJsonObjectLoose<{
    translation?: unknown;
    pinyin?: unknown;
    alternatives?: unknown;
    notes?: unknown;
    detectedSourceLanguage?: unknown;
  }>(safeRaw);

  if (parsed) {
    const translation = String(parsed.translation || '').trim();
    if (translation) {
      const detectedRaw = String(parsed.detectedSourceLanguage || '').toLowerCase();
      const detectedSourceLanguage: 'fr' | 'zh' | 'unknown' =
        detectedRaw === 'fr' || detectedRaw === 'zh' ? detectedRaw : 'unknown';
      return {
        translation,
        pinyin: String(parsed.pinyin || '').trim(),
        alternatives: toStringArray(parsed.alternatives),
        notes: toStringArray(parsed.notes),
        detectedSourceLanguage
      };
    }
  }

  const looseTranslation = extractLooseFieldValue(safeRaw, 'translation');
  const loosePinyin = extractLooseFieldValue(safeRaw, 'pinyin');
  const looseAlternatives = extractLooseArray(safeRaw, 'alternatives');
  const looseNotes = extractLooseArray(safeRaw, 'notes');
  if (looseTranslation) {
    return {
      translation: looseTranslation,
      pinyin: loosePinyin,
      alternatives: looseAlternatives,
      notes: looseNotes,
      detectedSourceLanguage: direction === 'fr-zh' ? 'fr' : 'zh'
    };
  }

  const extracted = extractJsonObjectText(safeRaw);
  const looksLikeJson = extracted.startsWith('{') && extracted.endsWith('}');
  return {
    translation: looksLikeJson ? '' : safeRaw,
    pinyin: '',
    alternatives: [],
    notes: [],
    detectedSourceLanguage: direction === 'fr-zh' ? 'fr' : 'zh'
  };
};

const getRegisterLabel = (register: TranslationRegister, language: Language) => {
  if (language === 'fr') {
    if (register === 'formal') return 'formel';
    if (register === 'casual') return 'familier';
    return 'neutre';
  }
  if (register === 'formal') return 'formal';
  if (register === 'casual') return 'casual';
  return 'neutral';
};

const buildPrompt = ({ text, direction, register, uiLanguage }: TranslationRequest) => {
  const userLanguage = uiLanguage === 'fr' ? 'français' : 'english';
  const source = direction === 'fr-zh' ? 'français' : 'chinois mandarin';
  const target = direction === 'fr-zh' ? 'chinois mandarin simplifié' : 'français naturel';
  const tone = getRegisterLabel(register, uiLanguage);

  return [
    'Tu es un moteur de traduction spécialisé FR<->ZH pour l apprentissage du mandarin.',
    `Langue des notes explicatives: ${userLanguage}.`,
    `Direction de traduction: ${source} -> ${target}.`,
    `Registre demandé: ${tone}.`,
    'Règles:',
    '- Traduis le sens complet de la phrase (pas mot à mot).',
    '- Pour une sortie chinoise, utilise des caractères simplifiés.',
    '- Ajoute un pinyin tonique quand la sortie contient du chinois.',
    '- Propose 2 alternatives naturelles maximum.',
    '- Donne 1 ou 2 notes courtes sur nuances, particules ou registre.',
    '- Garde les noms propres, chiffres et ponctuation de façon naturelle.',
    '- Réponds STRICTEMENT en JSON valide, sans markdown.',
    'Format JSON attendu:',
    '{"translation":"...", "pinyin":"...", "alternatives":["..."], "notes":["..."], "detectedSourceLanguage":"fr|zh|unknown"}',
    `Texte à traduire: """${text.trim()}"""`
  ].join('\n');
};

const buildUnavailableError = (language: Language) =>
  language === 'fr'
    ? "Le moteur de traduction IA n'est pas disponible. Configurez VITE_GEMINI_API_KEY ou utilisez localhost avec le proxy."
    : 'The AI translation engine is unavailable. Configure VITE_GEMINI_API_KEY or use localhost with proxy.';

export const translateFrZh = async (request: TranslationRequest): Promise<TranslationResult> => {
  const text = request.text.trim();
  if (!text) {
    throw new Error(request.uiLanguage === 'fr' ? 'Le texte est vide.' : 'Text is empty.');
  }

  if (!GEMINI_API_KEY && !canUseGeminiProxy()) {
    throw new Error(buildUnavailableError(request.uiLanguage));
  }

  const prompt = buildPrompt({ ...request, text });
  let lastError = '';

  for (const model of GEMINI_MODELS) {
    const result = await runGeminiGenerateContent(model, {
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.2,
        topK: 32,
        topP: 0.8,
        maxOutputTokens: 512
      }
    });

    if (!result.ok) {
      lastError = result.bodyText || `HTTP ${result.status}`;
      continue;
    }

    const outputText = (result.text || '').trim();
    if (!outputText) {
      lastError = 'Empty model response';
      continue;
    }

    const parsed = parseTranslationPayload(outputText, request.direction);
    if (!parsed.translation) {
      lastError = 'No translation in model response';
      continue;
    }

    return {
      ...parsed,
      modelUsed: model
    };
  }

  throw new Error(
    request.uiLanguage === 'fr'
      ? `Traduction indisponible pour le moment. Détail: ${lastError || 'aucune réponse valide'}`
      : `Translation is temporarily unavailable. Detail: ${lastError || 'no valid response'}`
  );
};
