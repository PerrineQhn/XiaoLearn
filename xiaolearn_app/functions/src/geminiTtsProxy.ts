/**
 * geminiTtsProxy.ts — proxy TTS Gemini pour fallback audio
 * ---------------------------------------------------------------------------
 * Appelé côté client quand un fichier audio Azure pré-généré n'existe pas
 * pour un hanzi/phrase donné. Génère l'audio via Gemini 2.5 TTS et le renvoie
 * en base64 que le client met en cache IndexedDB.
 *
 * Payload entrant : { text: string }
 * Réponse : { audioBase64: string, mimeType: string }
 *
 * Auth : Firebase ID token (idem geminiProxy). Limite l'abus.
 *
 * Modèle : `gemini-2.5-pro-preview-tts` (mai 2025). Renvoie du PCM 24kHz
 * brut qu'on encapsule en WAV pour que les browsers puissent le décoder.
 */

import { onRequest } from 'firebase-functions/v2/https';
import { logger } from 'firebase-functions/v2';
import { defineSecret } from 'firebase-functions/params';
import { getAuth } from 'firebase-admin/auth';

export const GEMINI_API_KEY = defineSecret('GEMINI_API_KEY');

const TTS_MODEL = 'gemini-2.5-pro-preview-tts';
const TTS_API_URL =
  `https://generativelanguage.googleapis.com/v1beta/models/${TTS_MODEL}:generateContent`;

// Voix Gemini TTS qui supporte le chinois mandarin.
// `Kore` = voix féminine, naturelle, fonctionne bien sur zh-CN.
const VOICE_NAME = 'Kore';

const ALLOWED_ORIGINS = new Set([
  'https://app.xiaolearn.com',
  'https://xiaolearn.com',
  'https://www.xiaolearn.com',
  'http://localhost:5173',
  'http://localhost:4173'
]);

function applyCors(req: any, res: any): boolean {
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

async function requireAuth(req: any): Promise<string | null> {
  const auth = req.headers.authorization as string | undefined;
  if (!auth || !auth.startsWith('Bearer ')) return null;
  const token = auth.slice('Bearer '.length).trim();
  if (!token) return null;
  try {
    const decoded = await getAuth().verifyIdToken(token);
    return decoded.uid;
  } catch (err) {
    logger.warn('geminiTtsProxy: invalid id token', { err });
    return null;
  }
}

/**
 * Encapsule du PCM 24kHz mono 16-bit dans un container WAV pour qu'un browser
 * puisse le décoder directement via Audio.play().
 * Référence : http://soundfile.sapp.org/doc/WaveFormat/
 */
function pcmToWav(pcmBytes: Uint8Array, sampleRate = 24000): Uint8Array {
  const byteRate = sampleRate * 2; // mono 16-bit
  const blockAlign = 2;
  const dataLength = pcmBytes.length;
  const wav = new Uint8Array(44 + dataLength);
  const view = new DataView(wav.buffer);

  // "RIFF" chunk descriptor
  wav.set([0x52, 0x49, 0x46, 0x46], 0); // "RIFF"
  view.setUint32(4, 36 + dataLength, true); // chunkSize
  wav.set([0x57, 0x41, 0x56, 0x45], 8); // "WAVE"

  // "fmt " sub-chunk
  wav.set([0x66, 0x6d, 0x74, 0x20], 12); // "fmt "
  view.setUint32(16, 16, true); // subChunkSize
  view.setUint16(20, 1, true); // audioFormat (1 = PCM)
  view.setUint16(22, 1, true); // numChannels (mono)
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, 16, true); // bitsPerSample

  // "data" sub-chunk
  wav.set([0x64, 0x61, 0x74, 0x61], 36); // "data"
  view.setUint32(40, dataLength, true);
  wav.set(pcmBytes, 44);

  return wav;
}

export const geminiTtsProxy = onRequest(
  {
    region: 'europe-west1',
    secrets: [GEMINI_API_KEY],
    timeoutSeconds: 30,
    memory: '512MiB'
  },
  async (req, res) => {
    if (applyCors(req, res)) return;

    if (req.method !== 'POST') {
      res.status(405).send('Method Not Allowed');
      return;
    }

    const uid = await requireAuth(req);
    if (!uid) {
      res.status(401).json({ error: 'unauthorized' });
      return;
    }

    const text = (req.body?.text as string | undefined)?.trim() ?? '';
    if (!text) {
      res.status(400).json({ error: 'text required' });
      return;
    }
    // Limite de sécurité : 200 caractères max (au-delà, c'est suspect)
    if (text.length > 200) {
      res.status(400).json({ error: 'text too long (max 200 chars)' });
      return;
    }

    try {
      const apiResp = await fetch(`${TTS_API_URL}?key=${GEMINI_API_KEY.value()}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text }] }],
          generationConfig: {
            responseModalities: ['AUDIO'],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: VOICE_NAME }
              }
            }
          }
        })
      });

      if (!apiResp.ok) {
        const errBody = await apiResp.text().catch(() => '');
        logger.warn('geminiTtsProxy: Gemini API error', {
          status: apiResp.status,
          body: errBody.slice(0, 500)
        });
        res.status(502).json({ error: 'tts upstream failed' });
        return;
      }

      const data = await apiResp.json();
      const part = data?.candidates?.[0]?.content?.parts?.[0];
      const inline = part?.inlineData;
      if (!inline?.data) {
        logger.warn('geminiTtsProxy: no audio in response');
        res.status(502).json({ error: 'no audio payload' });
        return;
      }

      const mimeType = (inline.mimeType as string | undefined) ?? 'audio/L16; codecs=pcm; rate=24000';

      // Gemini renvoie du PCM brut. On l'encapsule en WAV pour que les
      // navigateurs puissent le lire avec <audio>.
      let audioB64: string = inline.data;
      let finalMime = mimeType;
      if (/pcm|L16/i.test(mimeType)) {
        const pcmBin = Buffer.from(audioB64, 'base64');
        const wav = pcmToWav(new Uint8Array(pcmBin));
        audioB64 = Buffer.from(wav).toString('base64');
        finalMime = 'audio/wav';
      }

      res.json({
        audioBase64: audioB64,
        mimeType: finalMime
      });
    } catch (err) {
      logger.error('geminiTtsProxy: unexpected error', { err });
      res.status(500).json({ error: 'internal' });
    }
  }
);
