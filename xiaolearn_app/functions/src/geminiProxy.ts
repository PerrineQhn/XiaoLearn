/**
 * geminiProxy.ts — proxy LLM côté serveur (Gemini + fallback Cloudflare AI)
 * ---------------------------------------------------------------------------
 * Objectif : empêcher l'exposition des clés API dans le bundle JS du browser.
 *
 * Le client envoie une requête authentifiée (Firebase ID token) avec un
 * payload contenant :
 *   - systemPrompt: string         (prompt système, injecté en premier)
 *   - history: Message[]           (historique de conversation)
 *   - userMessage: string          (dernier message utilisateur)
 *   - generationConfig?: {temperature, maxOutputTokens, responseMimeType}
 *
 * Le serveur appelle Gemini avec la clé stockée comme secret Google Cloud,
 * puis renvoie le texte généré au client. Si Gemini échoue (rate limit,
 * 5xx, auth), bascule automatiquement sur Cloudflare Workers AI.
 *
 * Auth : Firebase ID token vérifié via firebase-admin. Pas d'app anon
 * (limite l'abus via une clé volée pour spammer).
 */

import { onRequest } from 'firebase-functions/v2/https';
import { logger } from 'firebase-functions/v2';
import { defineSecret } from 'firebase-functions/params';
import { getAuth } from 'firebase-admin/auth';

// ---------------------------------------------------------------------------
//  Secrets — stockés via `firebase functions:secrets:set <NAME>`
// ---------------------------------------------------------------------------
export const GEMINI_API_KEY = defineSecret('GEMINI_API_KEY');
export const CF_ACCOUNT_ID = defineSecret('CF_ACCOUNT_ID');
export const CF_AI_TOKEN = defineSecret('CF_AI_TOKEN');

// Modèles
const GEMINI_MODEL = 'gemini-2.5-flash';
const GEMINI_API_URL =
  `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;
const CF_AI_MODEL_PRIMARY = '@cf/qwen/qwen1.5-14b-chat-awq';
const CF_AI_MODEL_FALLBACK = '@cf/meta/llama-3.3-70b-instruct-fp8-fast';

// ---------------------------------------------------------------------------
//  CORS allow-list (même origins que createCheckout)
// ---------------------------------------------------------------------------
const ALLOWED_ORIGINS = new Set([
  'https://app.xiaolearn.com',
  'https://xiaolearn.com',
  'https://www.xiaolearn.com',
  'http://localhost:5173',
  'http://localhost:4173'
]);

function applyCors(req: { headers: Record<string, string | string[] | undefined> }, res: any): boolean {
  const origin = (req.headers.origin as string | undefined) ?? '';
  if (ALLOWED_ORIGINS.has(origin)) {
    res.set('Access-Control-Allow-Origin', origin);
    res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.set('Access-Control-Max-Age', '3600');
  }
  if (req.headers['access-control-request-method']) {
    res.status(204).send('');
    return true;
  }
  return false;
}

// ---------------------------------------------------------------------------
//  Auth helper : extrait + vérifie le Firebase ID token
// ---------------------------------------------------------------------------
async function requireAuth(req: any): Promise<string | null> {
  const auth = req.headers.authorization as string | undefined;
  if (!auth || !auth.startsWith('Bearer ')) return null;
  const token = auth.slice('Bearer '.length).trim();
  if (!token) return null;
  try {
    const decoded = await getAuth().verifyIdToken(token);
    return decoded.uid;
  } catch (err) {
    logger.warn('geminiProxy: invalid id token', { err });
    return null;
  }
}

// ---------------------------------------------------------------------------
//  Types du payload entrant
// ---------------------------------------------------------------------------
interface ClientMessage {
  role: 'user' | 'assistant' | 'model';
  content: string;
}

interface ProxyRequestBody {
  systemPrompt?: string;
  history?: ClientMessage[];
  userMessage: string;
  generationConfig?: {
    temperature?: number;
    maxOutputTokens?: number;
    topK?: number;
    topP?: number;
    responseMimeType?: string;
  };
}

// ---------------------------------------------------------------------------
//  Appel Gemini direct
// ---------------------------------------------------------------------------
async function callGemini(body: ProxyRequestBody, apiKey: string): Promise<string | null> {
  // Construction des contents au format Gemini
  const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

  if (body.systemPrompt) {
    contents.push({ role: 'user', parts: [{ text: body.systemPrompt }] });
    contents.push({
      role: 'model',
      parts: [{ text: 'Compris. Je suis prêt.' }]
    });
  }

  for (const msg of body.history ?? []) {
    const role: 'user' | 'model' = msg.role === 'user' ? 'user' : 'model';
    contents.push({ role, parts: [{ text: msg.content }] });
  }

  contents.push({ role: 'user', parts: [{ text: body.userMessage }] });

  const generationConfig = {
    temperature: body.generationConfig?.temperature ?? 0.7,
    topK: body.generationConfig?.topK ?? 40,
    topP: body.generationConfig?.topP ?? 0.95,
    maxOutputTokens: body.generationConfig?.maxOutputTokens ?? 4096,
    ...(body.generationConfig?.responseMimeType
      ? { responseMimeType: body.generationConfig.responseMimeType }
      : {})
  };

  try {
    const res = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig,
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' }
        ]
      })
    });
    if (!res.ok) {
      logger.warn('Gemini non-ok response', { status: res.status });
      return null;
    }
    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return typeof text === 'string' ? text : null;
  } catch (err) {
    logger.error('Gemini fetch error', { err });
    return null;
  }
}

// ---------------------------------------------------------------------------
//  Appel Cloudflare Workers AI (fallback)
// ---------------------------------------------------------------------------
async function callCloudflareAI(
  body: ProxyRequestBody,
  accountId: string,
  apiToken: string,
  model: string
): Promise<string | null> {
  const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [];
  if (body.systemPrompt) {
    messages.push({ role: 'system', content: body.systemPrompt });
  }
  for (const msg of body.history ?? []) {
    const role: 'user' | 'assistant' = msg.role === 'user' ? 'user' : 'assistant';
    messages.push({ role, content: msg.content });
  }
  messages.push({ role: 'user', content: body.userMessage });

  try {
    const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${model}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiToken}`
      },
      body: JSON.stringify({
        messages,
        max_tokens: body.generationConfig?.maxOutputTokens ?? 4096,
        temperature: body.generationConfig?.temperature ?? 0.7
      })
    });
    if (!res.ok) {
      logger.warn('Cloudflare AI non-ok response', { status: res.status, model });
      return null;
    }
    const data = await res.json();
    const text = data?.result?.response;
    return typeof text === 'string' ? text : null;
  } catch (err) {
    logger.error('Cloudflare AI fetch error', { err, model });
    return null;
  }
}

// ---------------------------------------------------------------------------
//  Endpoint exporté
// ---------------------------------------------------------------------------
export const geminiProxy = onRequest(
  {
    region: 'europe-west1',
    maxInstances: 20,
    cors: false, // on gère le CORS manuellement (whitelist stricte)
    secrets: [GEMINI_API_KEY, CF_ACCOUNT_ID, CF_AI_TOKEN]
  },
  async (req, res) => {
    if (applyCors(req, res)) return;

    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    // Authentification obligatoire : empêche les bots externes d'appeler
    // l'endpoint et de consommer le quota Gemini sans coût pour l'attaquant.
    const uid = await requireAuth(req);
    if (!uid) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const body = req.body as ProxyRequestBody | undefined;
    if (!body || typeof body.userMessage !== 'string' || !body.userMessage.trim()) {
      res.status(400).json({ error: 'userMessage is required' });
      return;
    }

    // 1. Gemini
    const geminiKey = GEMINI_API_KEY.value();
    if (geminiKey) {
      const geminiText = await callGemini(body, geminiKey);
      if (geminiText) {
        res.status(200).json({ text: geminiText, engine: 'gemini' });
        return;
      }
    }

    // 2. Fallback Cloudflare AI
    const cfId = CF_ACCOUNT_ID.value();
    const cfToken = CF_AI_TOKEN.value();
    if (cfId && cfToken) {
      // Essai Qwen 1.5 d'abord, puis Llama 3.3 si échec
      let cfText = await callCloudflareAI(body, cfId, cfToken, CF_AI_MODEL_PRIMARY);
      if (!cfText) {
        cfText = await callCloudflareAI(body, cfId, cfToken, CF_AI_MODEL_FALLBACK);
      }
      if (cfText) {
        res.status(200).json({ text: cfText, engine: 'cloudflare' });
        return;
      }
    }

    logger.error('geminiProxy: all engines failed', { uid });
    res.status(503).json({ error: 'All LLM engines unavailable' });
  }
);
