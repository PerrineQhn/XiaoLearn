/**
 * usePronunciation — enregistrement + scoring via azureSpeechProxy
 * Utilise expo-av pour la capture micro
 */
import { useState, useRef, useCallback } from 'react';
import { Audio } from 'expo-av';
import { getAuth } from 'firebase/auth';
import { useI18n } from '@/contexts/LanguageContext';

/**
 * Calcule la similarité entre le texte reconnu et le texte de référence.
 * Compare caractère par caractère (hanzi) pour détecter si l'utilisateur
 * a dit le bon mot. Retourne 0..1 (1 = parfaitement correct).
 */
function computeRecognitionSimilarity(recognized: string, reference: string): number {
  // Normaliser : garder uniquement les caractères hanzi
  const norm = (s: string) => s.replace(/[^一-鿿㐀-䶿豈-﫿]/g, '');
  const rec = norm(recognized);
  const ref = norm(reference);
  if (!ref) return 1; // pas de référence hanzi → on ne pénalise pas
  if (!rec) return 0;
  if (rec === ref) return 1;
  // Ratio de caractères en commun (intersection / référence)
  let matches = 0;
  const recChars = [...rec];
  const refChars = [...ref];
  const used = new Array(recChars.length).fill(false);
  for (const ch of refChars) {
    const idx = recChars.findIndex((c, i) => !used[i] && c === ch);
    if (idx !== -1) { matches++; used[idx] = true; }
  }
  return matches / refChars.length;
}

/** Lit un fichier URI en base64 via fetch + ArrayBuffer (sans expo-file-system) */
async function readFileAsBase64(uri: string): Promise<string> {
  const response = await fetch(uri);
  if (!response.ok) throw new Error(`Lecture fichier audio échouée (${response.status})`);
  const buffer = await response.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let binary = '';
  const CHUNK = 8192;
  for (let i = 0; i < bytes.length; i += CHUNK) {
    binary += String.fromCharCode(...(bytes.subarray(i, i + CHUNK) as any));
  }
  return btoa(binary);
}

const PROXY_URL = 'https://europe-west1-xiaolearn-db9e6.cloudfunctions.net/azureSpeechProxy';

export type PronunciationStatus = 'idle' | 'recording' | 'loading' | 'done' | 'error';

export interface PronunciationResult {
  pronunciationScore: number;  // 0-100
  accuracyScore: number;
  recognized: string;
  verdict: 'match' | 'close' | 'mismatch';
  words: Array<{
    word: string;
    accuracyScore: number;
    errorType: string;
  }>;
}

export function usePronunciation() {
  const { t } = useI18n();
  const recordingRef = useRef<Audio.Recording | null>(null);
  const [status, setStatus] = useState<PronunciationStatus>('idle');
  const [result, setResult] = useState<PronunciationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startRecording = useCallback(async () => {
    try {
      setStatus('recording');
      setResult(null);
      setError(null);

      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) {
        setError(t('pron.noPermission'));
        setStatus('error');
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const rec = new Audio.Recording();
      // WAV 16kHz mono 16-bit PCM — seul format universellement accepté par Azure Speech REST
      await rec.prepareToRecordAsync({
        android: {
          extension: '.wav',
          outputFormat: Audio.AndroidOutputFormat.DEFAULT,
          audioEncoder: Audio.AndroidAudioEncoder.DEFAULT,
          sampleRate: 16000,
          numberOfChannels: 1,
          bitRate: 256000,
        },
        ios: {
          extension: '.wav',
          audioQuality: Audio.IOSAudioQuality.HIGH,
          outputFormat: Audio.IOSOutputFormat.LINEARPCM,
          sampleRate: 16000,
          numberOfChannels: 1,
          bitRate: 256000,
          linearPCMBitDepth: 16,
          linearPCMIsBigEndian: false,
          linearPCMIsFloat: false,
        },
        web: { mimeType: 'audio/webm', bitsPerSecond: 128000 },
      });
      await rec.startAsync();
      recordingRef.current = rec;
    } catch (e: any) {
      setError(e?.message ?? 'Erreur micro');
      setStatus('error');
    }
  }, []);

  const stopAndScore = useCallback(async (referenceText: string) => {
    if (!recordingRef.current) {
      setError(t('pron.noRecording'));
      setStatus('error');
      return;
    }
    const recToStop = recordingRef.current;
    recordingRef.current = null;
    try {
      setStatus('loading');
      setError(null);

      await recToStop.stopAndUnloadAsync();
      const uri = recToStop.getURI();
      if (!uri) throw new Error(t('pron.noAudio'));
      console.log('[Pronunciation] URI:', uri);

      // Lire le WAV en base64 via fetch+ArrayBuffer (sans expo-file-system)
      const base64 = await readFileAsBase64(uri);
      if (base64.length < 100) throw new Error(`Fichier audio trop court (${base64.length} chars base64)`);
      console.log('[Pronunciation] base64 length:', base64.length);

      // Auth token Firebase
      const auth = getAuth();
      const token = await auth.currentUser?.getIdToken().catch(() => null);
      console.log('[Pronunciation] token present:', !!token);

      // Fetch avec timeout 30s (AbortController optionnel — pas dispo partout sous Hermes)
      const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
      const timeoutId = controller ? setTimeout(() => controller.abort(), 30_000) : null;

      let proxyResponse: Response;
      try {
        proxyResponse = await fetch(PROXY_URL, {
          method: 'POST',
          ...(controller ? { signal: controller.signal } : {}),
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({
            audioBase64: base64,
            audioMimeType: 'audio/wav',
            referenceText,
            language: 'zh-CN',
          }),
        });
      } finally {
        if (timeoutId) clearTimeout(timeoutId);
      }

      console.log('[Pronunciation] proxy status:', proxyResponse.status);
      if (!proxyResponse.ok) {
        const body = await proxyResponse.text().catch(() => '');
        throw new Error(`Proxy ${proxyResponse.status}: ${body.slice(0, 300)}`);
      }

      const data = await proxyResponse.json();
      console.log('[Pronunciation] result:', JSON.stringify(data).slice(0, 300));

      const recognized: string = data.recognized ?? '';

      // AccuracyScore = score phonème-par-phonème d'Azure, tons inclus pour zh-CN.
      // PronScore = moyenne (accuracy + fluency + completeness) → trop permissif
      // car une bonne fluidité compense les mauvais tons.
      // Pour l'apprentissage des tons : on utilise ACCURACY comme métrique principale.
      const accuracyScore: number = data.accuracyScore ?? 0;
      const fluencyScore:  number = data.fluencyScore  ?? 0;
      // 80% accuracy (tons) + 20% fluidité
      const rawScore = Math.round(0.8 * accuracyScore + 0.2 * fluencyScore);

      // Pénalité similarity uniquement pour les phrases longues (≥4 caractères).
      // Pour 1-3 chars, Azure ASR retourne presque toujours le caractère de référence
      // (il guide la reconnaissance avec referenceText) → similarity = 1.0 systématiquement,
      // la vraie détection du bon ton vient uniquement de accuracyScore.
      // Pour les phrases, Azure peut reconnaître un mot complètement différent →
      // la pénalité est alors utile (ex: utilisateur dit autre chose).
      const refLen = referenceText.replace(/[^一-鿿㐀-䶿豈-﫿]/g, '').length;
      const similarity = refLen >= 4
        ? computeRecognitionSimilarity(recognized, referenceText)
        : 1;
      const score = Math.round(rawScore * Math.max(0.05, similarity));

      console.log('[Pronunciation] recognized:', recognized, '| ref:', referenceText,
        '| accuracy:', accuracyScore, '| fluency:', fluencyScore,
        '| refLen:', refLen, '| similarity:', similarity.toFixed(2), '| final:', score);

      const verdict: PronunciationResult['verdict'] =
        score >= 80 ? 'match' : score >= 55 ? 'close' : 'mismatch';

      setResult({
        pronunciationScore: score,
        accuracyScore: data.accuracyScore ?? score,
        recognized: data.recognized ?? '',
        verdict,
        words: data.words ?? [],
      });
      setStatus('done');
    } catch (e: any) {
      const msg = e?.name === 'AbortError'
        ? t('pron.timeout')
        : (e?.message ?? 'Erreur inconnue');
      console.error('[Pronunciation] error:', msg);
      setError(msg);
      setStatus('error');
    } finally {
      await Audio.setAudioModeAsync({ allowsRecordingIOS: false }).catch(() => {});
    }
  }, []);

  const reset = useCallback(() => {
    setStatus('idle');
    setResult(null);
    setError(null);
  }, []);

  return { startRecording, stopAndScore, reset, status, result, error };
}
