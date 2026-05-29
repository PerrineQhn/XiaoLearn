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

    const {
      audioBase64,
      audioMimeType,
      referenceText,
      language = 'zh-CN'
    } = req.body ?? {};
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
    //
    // EnableMiscue: false — sinon Azure est ultra strict sur les hanzi
    // isolés à ton 3 ("请", durée 0.4s) et score systématiquement 0
    // avec ErrorType: "Mispronunciation". Sans Miscue, le scoring reste
    // basé sur AccuracyScore phonémique mais sans pénalité d'alignement
    // strict. Marche mieux pour les apprenants débutants.
    const pronAssessmentConfig = {
      ReferenceText: referenceText,
      GradingSystem: 'HundredMark',
      Granularity: 'Phoneme',
      Dimension: 'Comprehensive',
      EnableMiscue: false
    };
    const pronAssessmentHeader = Buffer.from(
      JSON.stringify(pronAssessmentConfig)
    ).toString('base64');

    const region = AZURE_SPEECH_REGION.value();
    const url = `https://${region}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=${encodeURIComponent(language)}&format=detailed`;

    // Azure Speech REST accepte : audio/wav, audio/ogg;codecs=opus,
    // audio/webm;codecs=opus. Safari peut produire audio/mp4 (AAC) — non
    // supporté. On envoie le format reçu si dans la liste, sinon webm/opus
    // par défaut (le cas Chrome/Edge/Firefox).
    const rawMime = typeof audioMimeType === 'string' ? audioMimeType.toLowerCase() : '';
    let azureContentType = 'audio/webm; codecs=opus';
    if (rawMime.includes('webm')) {
      azureContentType = 'audio/webm; codecs=opus';
    } else if (rawMime.includes('ogg')) {
      azureContentType = 'audio/ogg; codecs=opus';
    } else if (rawMime.includes('wav')) {
      azureContentType = 'audio/wav';
    } else if (rawMime) {
      // Format inattendu (audio/mp4 sur Safari). Log et tente quand même
      // en webm — Azure renverra une erreur claire si refusé.
      logger.warn('azureSpeechProxy: unexpected audio mime', { rawMime });
    }

    try {
      const azureResp = await fetch(url, {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': AZURE_SPEECH_KEY.value(),
          'Pronunciation-Assessment': pronAssessmentHeader,
          'Content-Type': azureContentType,
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

      // Log Azure raw response pour debug pendant la phase rodage
      logger.info('azureSpeechProxy: Azure response', {
        status: json.RecognitionStatus,
        displayText: json.DisplayText,
        nbestFirstDisplay: json.NBest?.[0]?.Display,
        nbestFirstLexical: json.NBest?.[0]?.Lexical,
        nbestFirstPronScore: json.NBest?.[0]?.PronunciationAssessment?.PronScore,
        nbestFirstAccuracy: json.NBest?.[0]?.PronunciationAssessment?.AccuracyScore,
        hasNBest: Array.isArray(json.NBest),
        nbestLen: json.NBest?.length,
        audioBytes: audioBytes.length,
        contentType: azureContentType,
        receivedMime: rawMime,
        rawAzureResponse: text.slice(0, 600)
      });

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
      // Azure renvoie pour chaque "Word" : un score global, un ErrorType,
      // les Syllables (par hanzi pour les mots multi-caractères) et les
      // Phonemes (par initiale/finale/ton type "qing 3"). On expose les 3
      // pour l'UI feedback détaillé.
      const words = (nbest.Words ?? []).map((w: any) => ({
        word: w.Word,
        accuracyScore: w.AccuracyScore ?? w.PronunciationAssessment?.AccuracyScore ?? 0,
        errorType: w.ErrorType ?? w.PronunciationAssessment?.ErrorType ?? 'None',
        syllables: (w.Syllables ?? []).map((s: any) => ({
          grapheme: s.Grapheme ?? '',
          syllable: s.Syllable ?? '',
          accuracyScore: s.AccuracyScore ?? s.PronunciationAssessment?.AccuracyScore ?? 0
        })),
        phonemes: (w.Phonemes ?? []).map((p: any) => ({
          phoneme: p.Phoneme ?? '',
          accuracyScore: p.AccuracyScore ?? p.PronunciationAssessment?.AccuracyScore ?? 0
        }))
      }));

      // Pour le chinois : préférer `Lexical` (forme brute sans ponctuation)
      // sur `Display` qui contient 。， etc. Sur un audio court ou peu clair
      // Azure peut renvoyer juste "。" dans Display → on aurait affiché
      // "Entendu : ." côté UI sans aucune valeur pédagogique.
      // Filtre aussi les sorties vides ou ponctuation-only.
      const rawRecognized =
        (nbest.Lexical as string | undefined) ??
        (nbest.Display as string | undefined) ??
        '';
      // Strip ponctuation chinoise + ASCII et espaces — si le résultat est
      // vide, c'est qu'il n'y avait pas de vraie reconnaissance.
      const cleanedRecognized = rawRecognized
        .replace(/[。，、；：？！.,;:?!\s]/g, '')
        .trim();
      const recognized = cleanedRecognized.length > 0 ? cleanedRecognized : '';

      res.json({
        ok: true,
        accuracyScore: pa?.AccuracyScore ?? 0,
        pronunciationScore: pa?.PronScore ?? pa?.PronunciationScore ?? 0,
        fluencyScore: pa?.FluencyScore ?? 0,
        completenessScore: pa?.CompletenessScore ?? 0,
        recognized,
        words
      });
    } catch (err) {
      logger.error('azureSpeechProxy: unexpected error', { err });
      res.status(500).json({ error: 'internal' });
    }
  }
);
