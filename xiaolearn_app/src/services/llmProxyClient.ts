/**
 * llmProxyClient.ts — client HTTP vers la Cloud Function `geminiProxy`
 * ---------------------------------------------------------------------
 * Remplace les appels directs au navigateur vers
 * `https://generativelanguage.googleapis.com/...`.
 *
 * Avantages :
 *   - La clé GEMINI_API_KEY n'est plus dans le bundle JS (stockée en secret
 *     server-side sur la Cloud Function).
 *   - Idem pour CF_AI_TOKEN (fallback Cloudflare Workers AI).
 *   - L'endpoint exige un Firebase ID token → l'abus par bot externe est
 *     bloqué côté serveur (401 sinon).
 *
 * Side-effect : ~100-200 ms de latence supplémentaire vs appel direct,
 * compensé par la sécurité.
 */
import { auth } from '../firebase/config';

/** URL de la Cloud Function. */
const PROXY_URL =
  'https://europe-west1-xiaolearn-db9e6.cloudfunctions.net/geminiProxy';

export interface LlmProxyMessage {
  role: 'user' | 'assistant' | 'model';
  content: string;
}

export interface LlmProxyRequest {
  /** Prompt système, injecté en premier. */
  systemPrompt?: string;
  /** Historique de conversation. */
  history?: LlmProxyMessage[];
  /** Dernier message utilisateur (obligatoire). */
  userMessage: string;
  /** Config de génération côté Gemini. */
  generationConfig?: {
    temperature?: number;
    maxOutputTokens?: number;
    topK?: number;
    topP?: number;
    responseMimeType?: string;
  };
}

export interface LlmProxyResponse {
  text: string;
  /** 'gemini' si la requête a été servie par Gemini, 'cloudflare' si fallback. */
  engine: 'gemini' | 'cloudflare';
}

/**
 * Appelle le proxy LLM avec authentification Firebase. Lance une erreur
 * si l'utilisateur n'est pas connecté (401 côté serveur).
 */
export async function callLlmProxy(
  payload: LlmProxyRequest
): Promise<LlmProxyResponse> {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('Utilisateur non connecté — connexion requise pour appeler le LLM.');
  }
  const idToken = await user.getIdToken();

  const res = await fetch(PROXY_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const errBody = await res.text().catch(() => '');
    throw new Error(`LLM proxy ${res.status}: ${errBody || res.statusText}`);
  }

  const data = await res.json();
  if (typeof data?.text !== 'string') {
    throw new Error('LLM proxy: réponse invalide');
  }
  return {
    text: data.text,
    engine: data.engine === 'cloudflare' ? 'cloudflare' : 'gemini'
  };
}
