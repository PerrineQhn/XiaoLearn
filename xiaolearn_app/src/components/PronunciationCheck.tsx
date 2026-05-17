/**
 * PronunciationCheck.tsx — bouton micro + feedback de prononciation.
 * ------------------------------------------------------------------
 * Compagnon du bouton 🔊 (lecture audio modèle). L'utilisateur clique sur le
 * mic, parle le hanzi, on transcrit avec la Web Speech API et on affiche un
 * verdict ✓/~/✗ + ce qu'on a entendu.
 *
 * Usage :
 *   <PronunciationCheck hanzi="你好" pinyin="nǐ hǎo" />
 *
 * État UI :
 *   idle    → bouton micro discret
 *   listening → animation pulse, "J'écoute…"
 *   result  → ✓/~/✗ + transcription + bouton retry
 *   error   → message + bouton retry
 *
 * Cas d'erreur gérés :
 *   - Navigateur non supporté : bouton désactivé, tooltip explicite
 *   - Permission micro refusée : message clair + lien vers les réglages
 *   - Timeout / silence : "On n'a rien entendu, réessaye"
 */

import { useEffect, useRef, useState } from 'react';
import {
  isPronunciationSupported,
  recognize,
  PronunciationNotSupportedError,
  PronunciationAbortedError,
  type PronunciationResult,
  type RecognizeHandle
} from '../services/pronunciationService';
import './PronunciationCheck.css';

export interface PronunciationCheckProps {
  /** Hanzi attendu (ex: "你好"). */
  hanzi: string;
  /** Pinyin attendu (ex: "nǐ hǎo"), utile en fallback de comparaison. */
  pinyin?: string;
  /** Taille du bouton (px). Défaut 32. */
  size?: number;
  /** Affiche la transcription complète dans une bulle sous le bouton. */
  showFeedback?: boolean;
  /** Texte d'aria-label personnalisé (sinon "Tester ma prononciation"). */
  ariaLabel?: string;
  /** Callback optionnel quand un verdict est obtenu (pour stats). */
  onResult?: (result: PronunciationResult) => void;
  className?: string;
}

type UiState =
  | { kind: 'idle' }
  | { kind: 'listening' }
  | { kind: 'result'; result: PronunciationResult }
  | { kind: 'error'; message: string };

const verdictEmoji = (v: PronunciationResult['verdict']): string => {
  switch (v) {
    case 'match':
      return '✓';
    case 'close':
      return '~';
    case 'mismatch':
      return '✗';
  }
};

const PronunciationCheck = ({
  hanzi,
  pinyin,
  size = 32,
  showFeedback = true,
  ariaLabel,
  onResult,
  className
}: PronunciationCheckProps) => {
  const [state, setState] = useState<UiState>({ kind: 'idle' });
  const handleRef = useRef<RecognizeHandle | null>(null);
  const supported = isPronunciationSupported();

  // Cleanup à l'unmount : si on est en train d'écouter, on annule
  useEffect(() => {
    return () => {
      handleRef.current?.cancel();
    };
  }, []);

  const handleStart = () => {
    if (!supported || state.kind === 'listening') return;
    setState({ kind: 'listening' });
    const h = recognize({
      expectedHanzi: hanzi,
      expectedPinyin: pinyin,
      timeoutMs: 8000
    });
    handleRef.current = h;
    h.promise
      .then((result) => {
        setState({ kind: 'result', result });
        onResult?.(result);
      })
      .catch((err) => {
        if (err instanceof PronunciationNotSupportedError) {
          setState({
            kind: 'error',
            message: 'Reconnaissance vocale non supportée par ce navigateur.'
          });
        } else if (err instanceof PronunciationAbortedError) {
          setState({
            kind: 'error',
            message:
              err.message === 'Recognition timed out'
                ? 'Trop long sans son — réessaie en parlant plus vite.'
                : "On n'a rien entendu, réessaie."
          });
        } else if (err instanceof Error && /not-allowed|denied/i.test(err.message)) {
          setState({
            kind: 'error',
            message: 'Permission micro refusée. Active-la dans les réglages du navigateur.'
          });
        } else {
          setState({
            kind: 'error',
            message:
              err instanceof Error
                ? `Erreur : ${err.message}`
                : 'Erreur inconnue lors de la reconnaissance.'
          });
        }
      })
      .finally(() => {
        handleRef.current = null;
      });
  };

  const handleCancel = () => {
    handleRef.current?.cancel();
    setState({ kind: 'idle' });
  };

  const handleReset = () => {
    setState({ kind: 'idle' });
  };

  const buttonLabel = ariaLabel ?? 'Tester ma prononciation';
  const disabled = !supported;
  const isListening = state.kind === 'listening';
  const hasError = state.kind === 'error';

  const verdictClass =
    state.kind === 'result' ? `pron-check--${state.result.verdict}` : '';

  // Tooltip dynamique selon l'état pour que le user comprenne ce que le bouton
  // signale, même quand showFeedback=false (cas flashcards).
  const dynamicTitle = (() => {
    if (disabled) return 'Reconnaissance vocale non supportée par ce navigateur';
    if (isListening) return 'Cliquer pour annuler';
    if (state.kind === 'result') {
      switch (state.result.verdict) {
        case 'match':
          return `✓ Parfait — clique pour réessayer`;
        case 'close':
          return `~ Presque (entendu : "${state.result.transcript || '?'}") — clique pour réessayer`;
        case 'mismatch':
          return `✗ Pas tout à fait (entendu : "${state.result.transcript || '?'}") — clique pour réessayer`;
      }
    }
    if (state.kind === 'error') {
      return `Erreur : ${state.message} — clique pour réessayer`;
    }
    return buttonLabel;
  })();

  // Si on a un résultat ou une erreur, le prochain click relance directement
  // un nouvel essai (au lieu de juste reset). Plus rapide pour le user.
  const handleButtonClick = () => {
    if (isListening) {
      handleCancel();
    } else {
      handleStart();
    }
  };

  return (
    <div className={`pron-check ${verdictClass} ${className ?? ''}`.trim()}>
      <button
        type="button"
        className={`pron-check-btn ${isListening ? 'is-listening' : ''} ${hasError ? 'has-error' : ''}`.trim()}
        onClick={handleButtonClick}
        aria-label={isListening ? "Annuler l'écoute" : dynamicTitle}
        title={dynamicTitle}
        disabled={disabled}
        style={{ width: size, height: size }}
      >
        {isListening ? (
          // SVG croix d'annulation pendant l'écoute
          <svg
            width={size * 0.5}
            height={size * 0.5}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          // SVG micro classique
          <svg
            width={size * 0.5}
            height={size * 0.5}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="8" y1="23" x2="16" y2="23" />
          </svg>
        )}
      </button>

      {showFeedback && state.kind === 'listening' && (
        <span className="pron-check-status">J'écoute…</span>
      )}
      {showFeedback && state.kind === 'result' && (
        <span
          className="pron-check-status"
          aria-live="polite"
          onClick={handleReset}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleReset();
          }}
        >
          <span className="pron-check-verdict" aria-hidden="true">
            {verdictEmoji(state.result.verdict)}
          </span>
          {state.result.verdict === 'match'
            ? 'Parfait !'
            : state.result.transcript
              ? `Entendu : ${state.result.transcript}`
              : 'Mismatch'}
        </span>
      )}
      {showFeedback && state.kind === 'error' && (
        <span
          className="pron-check-status pron-check-error"
          aria-live="polite"
          onClick={handleReset}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleReset();
          }}
        >
          {state.message}
        </span>
      )}
    </div>
  );
};

export default PronunciationCheck;
