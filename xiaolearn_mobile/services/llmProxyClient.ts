/**
 * llmProxyClient — client HTTP vers la Cloud Function `geminiProxy`
 * Même endpoint que la web app : clé Gemini stockée server-side.
 * Authentification : Firebase ID token (user connecté requis).
 */
import { auth } from '@/firebase/config';

const PROXY_URL =
  'https://europe-west1-xiaolearn-db9e6.cloudfunctions.net/geminiProxy';

export interface LlmProxyMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface LlmProxyRequest {
  systemPrompt?: string;
  history?: LlmProxyMessage[];
  userMessage: string;
  generationConfig?: {
    temperature?: number;
    maxOutputTokens?: number;
    topK?: number;
    topP?: number;
  };
}

export interface LlmProxyResponse {
  text: string;
  engine: 'gemini' | 'cloudflare';
}

export async function callLlmProxy(
  payload: LlmProxyRequest
): Promise<LlmProxyResponse> {
  const user = auth.currentUser;
  if (!user) throw new Error('Non connecté');

  const idToken = await user.getIdToken();

  const res = await fetch(PROXY_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errBody = await res.text().catch(() => '');
    throw new Error(`LLM proxy ${res.status}: ${errBody || res.statusText}`);
  }

  const data = await res.json();
  if (typeof data?.text !== 'string') throw new Error('Réponse invalide');

  return {
    text: data.text,
    engine: data.engine === 'cloudflare' ? 'cloudflare' : 'gemini',
  };
}
