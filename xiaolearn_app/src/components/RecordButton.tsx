/**
 * RecordButton.tsx — Phase 4 IA.
 *
 * Bouton « 🎤 » qui capture l'audio du microphone via MediaRecorder.
 * États visuels : idle, recording (animation pulse + chronomètre), processing.
 *
 * Sur clic :
 *  - 1er clic : demande permission micro (si pas accordée), démarre l'enregistrement
 *  - 2e clic OU max duration atteinte : stoppe et appelle `onAudio(blob)`
 *
 * L'utilisateur peut aussi cliquer en dehors pour annuler (pas implémenté V1).
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import './RecordButton.css';

interface RecordButtonProps {
  /** Appelé quand l'utilisateur termine son enregistrement. */
  onAudio: (blob: Blob) => void;
  /** Durée max d'enregistrement en secondes (défaut 8). */
  maxSeconds?: number;
  /** Désactivé pendant le traitement post-enregistrement. */
  disabled?: boolean;
  /** Label accessible (FR ou EN). */
  language?: 'fr' | 'en';
  /** Taille du bouton en pixels (défaut 56). */
  size?: number;
}

type RecState = 'idle' | 'requesting' | 'recording' | 'stopping';

export default function RecordButton({
  onAudio,
  maxSeconds = 8,
  disabled = false,
  language = 'fr',
  size = 56
}: RecordButtonProps) {
  const [state, setState] = useState<RecState>('idle');
  const [elapsed, setElapsed] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<number | null>(null);
  const startTsRef = useRef<number>(0);

  const cleanup = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    recorderRef.current = null;
    chunksRef.current = [];
  }, []);

  const stopRecording = useCallback(() => {
    if (state !== 'recording' || !recorderRef.current) return;
    setState('stopping');
    try {
      recorderRef.current.stop();
    } catch {
      cleanup();
      setState('idle');
    }
  }, [state, cleanup]);

  const startRecording = useCallback(async () => {
    setError(null);
    setState('requesting');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      streamRef.current = stream;

      // Préfère opus webm (universellement supporté navigateurs récents).
      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : MediaRecorder.isTypeSupported('audio/webm')
        ? 'audio/webm'
        : '';
      const recorder = new MediaRecorder(
        stream,
        mimeType ? { mimeType } : undefined
      );
      recorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, {
          type: mimeType || 'audio/webm'
        });
        cleanup();
        setState('idle');
        setElapsed(0);
        if (blob.size > 0) {
          onAudio(blob);
        } else {
          setError(language === 'en' ? 'No audio captured.' : 'Aucun audio capturé.');
        }
      };

      recorder.start();
      startTsRef.current = Date.now();
      setState('recording');
      setElapsed(0);

      // Chronomètre + auto-stop à maxSeconds.
      timerRef.current = window.setInterval(() => {
        const sec = Math.floor((Date.now() - startTsRef.current) / 1000);
        setElapsed(sec);
        if (sec >= maxSeconds) {
          stopRecording();
        }
      }, 200);
    } catch (e) {
      console.error('Microphone error:', e);
      cleanup();
      setState('idle');
      setError(
        language === 'en'
          ? 'Microphone access denied. Allow it in your browser settings.'
          : 'Accès au micro refusé. Autorise-le dans les réglages du navigateur.'
      );
    }
  }, [maxSeconds, cleanup, language, onAudio, stopRecording]);

  const handleClick = useCallback(() => {
    if (disabled) return;
    if (state === 'idle') {
      startRecording();
    } else if (state === 'recording') {
      stopRecording();
    }
  }, [disabled, state, startRecording, stopRecording]);

  // Cleanup si le composant est démonté pendant un enregistrement.
  useEffect(() => () => cleanup(), [cleanup]);

  const isActive = state === 'recording';
  const isBusy = state === 'requesting' || state === 'stopping';

  const label =
    state === 'recording'
      ? language === 'en'
        ? 'Stop recording'
        : 'Arrêter l\'enregistrement'
      : language === 'en'
      ? 'Start recording'
      : 'Démarrer l\'enregistrement';

  return (
    <div className="record-button-wrap">
      <button
        type="button"
        className={`record-btn ${isActive ? 'is-recording' : ''} ${isBusy ? 'is-busy' : ''}`}
        onClick={handleClick}
        disabled={disabled || isBusy}
        aria-label={label}
        title={label}
        style={{ width: size, height: size }}
      >
        {isActive ? (
          // Icône carré « stop »
          <svg width={size * 0.36} height={size * 0.36} viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="6" width="12" height="12" rx="2" />
          </svg>
        ) : (
          // Icône micro
          <svg width={size * 0.42} height={size * 0.42} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="8" y1="23" x2="16" y2="23" />
          </svg>
        )}
      </button>
      {isActive && (
        <span className="record-timer" aria-live="polite">
          {formatElapsed(elapsed)} / {formatElapsed(maxSeconds)}
        </span>
      )}
      {error && <div className="record-error">{error}</div>}
    </div>
  );
}

function formatElapsed(s: number): string {
  const mm = Math.floor(s / 60);
  const ss = s % 60;
  return `${mm}:${ss.toString().padStart(2, '0')}`;
}
