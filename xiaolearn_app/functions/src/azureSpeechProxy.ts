/**
 * azureSpeechProxy.ts — proxy Azure Speech Pronunciation Assessment.
 * --------------------------------------------------------------------------
 * Le client enregistre l'audio (WebM/Opus via MediaRecorder), envoie en
 * base64 avec le hanzi attendu. La function appelle Azure Speech REST API
 * en mode "Pronunciation Assessment" et renvoie un score 0-100 + détail
 * par phonème.
 *
 * Bypass complet du problème Web Speech : marche sur Safari, marche sur
 * les hanzi uniques (Azure n'a pas de seuil minimal d'utterance), feedback
 * pédagogique riche (score par syllabe + tons).
 *
 * Endpoint : POST { audioBase64, referenceText, language? }
 * Réponse : { accuracyScore, pronunciationScore, fluencyScore,
 *             completenessScore, words: [{ word, accuracyScore, errorType,
 *             phonemes: [{ phoneme, accuracyScore }] }] }
 *
 * Auth : Firebase ID token (idem geminiProxy).
 *
 * Modèle Azure : Speech REST API `recognition/conversation/cognitiveservices/v1`
 * avec le header `Pronunciation-Assessment` qui contient les paramètres
 * (ReferenceText, GradingSystem=HundredMark, Granularity=Phoneme).
 */

import { onRequest } from 'firebase-functions/v2/https';
import { logger } from 'firebase-functions/v2';
import { defineSecret } from 'firebase-functions/params';
import { getAuth } from 'firebase-admin/auth';

const AZURE_SPEECH_KEY = defineSecret('AZURE_SPEECH_KEY');
const AZURE_SPEECH_REGION = defineSecret('AZURE_SPEECH_REGION');

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
    logger.warn('azureSpeechProxy: invalid id token', { err });
    return null;
  }
}

// Limite la taille audio à 1 Mo (≈ 30s en opus) pour éviter abus
const MAX_AUDIO_BYTES = 1_048_576;

export const azureSpeechProxy = onRequest(
  {
    region: 'europe-west1',
    secrets: [AZURE_SPEECH_KEY, AZURE_SPEECH_REGION],
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

    const { audioBase64, referenceText, language = 'zh-CN' } = req.body ?? {};
    if (typeof audioBase64 !== 'string' || !audioBase64) {
      res.status(400).json({ error: 'audioBase64 required' });
      return;
    }
    if (typeof referenceText !== 'string' || !referenceText) {
      res.status(400).json({ error: 'referenceText required' });
      return;
    }
    if (referenceText.length > 100) {
      res.status(400).json({ error: 'referenceText too long' });
      return;
    }

    // Decode base64 audio
    let audioBytes: Buffer;
    try {
      audioBytes = Buffer.from(audioBase64, 'base64');
    } catch {
      res.status(400).json({ error: 'invalid audioBase64' });
      return;
    }
    if (audioBytes.length === 0) {
      res.status(400).json({ error: 'empty audio' });
      return;
    }
    if (audioBytes.length > MAX_AUDIO_BYTES) {
      res.status(413).json({ error: 'audio too large' });
      return;
    }

    // Configure Pronunciation Assessment headers
    // Doc : https://learn.microsoft.com/azure/ai-services/speech-service/how-to-pronunciation-assessment
    const pronAssessmentConfig = {
      ReferenceText: referenceText,
      GradingSystem: 'HundredMark',
      Granularity: 'Phoneme',
      Dimension: 'Comprehensive',
      EnableMiscue: true
    };
    const pronAssessmentHeader = Buffer.from(
      JSON.stringify(pronAssessmentConfig)
    ).toString('base64');

    const region = AZURE_SPEECH_REGION.value();
    const url = `https://${region}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=${encodeURIComponent(language)}&format=detailed`;

    try {
      const azureResp = await fetch(url, {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': AZURE_SPEECH_KEY.value(),
          'Pronunciation-Assessment': pronAssessmentHeader,
          // Le client envoie du WebM/Opus que MediaRecorder produit par
          // défaut. Azure accepte ce format en input.
          'Content-Type': 'audio/webm; codecs=opus',
          'Accept': 'application/json'
        },
        // Le runtime undici accepte parfaitement un Buffer/Uint8Array,
        // mais TS 5.7+ a introduit `Buffer<ArrayBufferLike>` qui n'est plus
        // assignable à `BodyInit` (qui veut `ArrayBuffer` strict, pas
        // `SharedArrayBuffer`). On cast — le comportement runtime est OK.
        body: audioBytes as unknown as BodyInit
      });

      const text = await azureResp.text();
      if (!azureResp.ok) {
        logger.warn('azureSpeechProxy: upstream error', {
          status: azureResp.status,
          body: text.slice(0, 500)
        });
        res.status(502).json({ error: 'azure upstream failed', detail: text.slice(0, 200) });
        return;
      }

      let json: any;
      try {
        json = JSON.parse(text);
      } catch {
        res.status(502).json({ error: 'azure response not JSON' });
        return;
      }

      // Azure renvoie soit RecognitionStatus=Success avec NBest contenant
      // PronunciationAssessment, soit NoMatch/InitialSilenceTimeout/etc.
      const status = json.RecognitionStatus;
      if (status !== 'Success') {
        res.json({
          ok: false,
          reason: status,
          message:
            status === 'NoMatch'
              ? 'Aucune parole reconnue'
              : status === 'InitialSilenceTimeout'
                ? 'Pas de son détecté'
                : `Reconnaissance échouée (${status})`
        });
        return;
      }

      const nbest = json.NBest?.[0];
      if (!nbest) {
        res.json({ ok: false, reason: 'NoNBest', message: 'Pas de candidat' });
        return;
      }

      const pa = nbest.PronunciationAssessment;
      const words = (nbest.Words ?? []).map((w: any) => ({
        word: w.Word,
        accuracyScore: w.PronunciationAssessment?.AccuracyScore ?? 0,
        errorType: w.PronunciationAssessment?.ErrorType ?? 'None',
        phonemes: (w.Phonemes ?? []).map((p: any) => ({
          phoneme: p.Phoneme,
          accuracyScore: p.PronunciationAssessment?.AccuracyScore ?? 0
        }))
      }));

      res.json({
        ok: true,
        accuracyScore: pa?.AccuracyScore ?? 0,
        pronunciationScore: pa?.PronScore ?? pa?.PronunciationScore ?? 0,
        fluencyScore: pa?.FluencyScore ?? 0,
        completenessScore: pa?.CompletenessScore ?? 0,
        recognized: nbest.Display ?? nbest.Lexical ?? '',
        words
      });
    } catch (err) {
      logger.error('azureSpeechProxy: unexpected error', { err });
      res.status(500).json({ error: 'internal' });
    }
  }
);
