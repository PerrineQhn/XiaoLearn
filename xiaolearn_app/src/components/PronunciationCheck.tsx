/**
 * PronunciationCheck.tsx — bouton micro + feedback de prononciation.
 * ------------------------------------------------------------------
 * Compagnon du bouton 🔊 (lecture audio modèle). L'utilisateur clique sur le
 * mic, parle le hanzi, et on lui renvoie un score 0-100 + verdict via Azure
 * Speech Pronunciation Assessment.
 *
 * Migration de Web Speech API vers Azure : Web Speech zh-CN abandonnait sur
 * Safari et sur les hanzi uniques (utterance < 500ms). Azure gère les deux
 * cas nativement et fournit un feedback pédagogique riche (score global,
 * accuracy/fluency/completeness, détail par phonème).
 *
 * Usage :
 *   <PronunciationCheck hanzi="你好" pinyin="nǐ hǎo" />
 *
 * État UI :
 *   idle       → bouton micro discret
 *   listening  → animation pulse, "J'écoute…"
 *   result     → badge score + verdict + détail (optionnel)
 *   error      → message + bouton retry
 *
 * Cas d'erreur gérés :
 *   - Navigateur non supporté (MediaRecorder absent) : bouton désactivé
 *   - Permission micro refusée : message clair
 *   - Audio vide / pas de parole détectée : "On n'a rien entendu"
 *   - Erreur réseau / Azure : message générique
 */

import { useEffect, useRef, useState } from 'react';
import {
  isAzureSpeechSupported,
  recognizeWithAzure,
  AzureSpeechNotSupportedError,
  AzureSpeechAbortedError,
  type AzurePronunciationResult,
  type AzureVerdict
} from '../services/pronunciationServiceAzure';
import './PronunciationCheck.css';

export interface PronunciationCheckProps {
  /** Hanzi attendu (ex: "你好"). */
  hanzi: string;
  /** Pinyin attendu (ex: "nǐ hǎo"), affiché en cas d'erreur — non utilisé pour Azure. */
  pinyin?: string;
  /** Taille du bouton (px). Défaut 32. */
  size?: number;
  /** Affiche la transcription + score complet dans une bulle sous le bouton. */
  showFeedback?: boolean;
  /** Texte d'aria-label personnalisé (sinon "Tester ma prononciation"). */
  ariaLabel?: string;
  /** Callback optionnel quand un verdict est obtenu (pour stats). */
  onResult?: (result: AzurePronunciationResult) => void;
  className?: string;
}

type UiState =
  | { kind: 'idle' }
  | { kind: 'listening' }
  | { kind: 'result'; result: AzurePronunciationResult }
  | { kind: 'error'; message: string };

const verdictEmoji = (v: AzureVerdict): string => {
  switch (v) {
    case 'match':
      return '✓';
    case 'close':
      return '~';
    case 'mismatch':
      return '✗';
  }
};

/**
 * Classe CSS pour la couleur du badge de score selon le score 0-100.
 * - or  ≥ 90 : excellent
 * - vert ≥ 70 : bien
 * - ambre ≥ 50 : bof
 * - rouge < 50 : à retravailler
 */
function scoreBadgeClass(score: number): string {
  if (score >= 90) return 'pron-check-score--gold';
  if (score >= 70) return 'pron-check-score--green';
  if (score >= 50) return 'pron-check-score--amber';
  return 'pron-check-score--red';
}

/** Label court pour le score. */
function scoreLabel(score: number): string {
  if (score >= 90) return 'Excellent';
  if (score >= 70) return 'Bien';
  if (score >= 50) return 'Bof';
  return 'À retravailler';
}

const PronunciationCheck = ({
  hanzi,
  pinyin: _pinyin,
  size = 32,
  showFeedback = true,
  ariaLabel,
  onResult,
  className
}: PronunciationCheckProps) => {
  const [state, setState] = useState<UiState>({ kind: 'idle' });
  // AbortController pour annuler proprement l'enregistrement en cours
  const abortRef = useRef<AbortController | null>(null);
  const supported = isAzureSpeechSupported();

  // Cleanup à l'unmount : si on est en train d'écouter, on annule
  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  // Reset quand le hanzi change
  useEffect(() => {
    setState({ kind: 'idle' });
  }, [hanzi]);

  const handleStart = () => {
    if (!supported || state.kind === 'listening') return;
    setState({ kind: 'listening' });

    recognizeWithAzure({
      referenceText: hanzi,
      language: 'zh-CN'
    })
      .then((result) => {
        console.log('[PronunciationCheck] result', {
          expected: hanzi,
          recognized: result.recognized,
          score: result.pronunciationScore,
          verdict: result.verdict
        });
        setState({ kind: 'result', result });
        onResult?.(result);
      })
      .catch((err) => {
        console.warn('[PronunciationCheck] recognize rejected', err);
        if (err instanceof AzureSpeechNotSupportedError) {
          setState({
            kind: 'error',
            message: 'Reconnaissance non supportée par ce navigateur.'
          });
        } else if (err instanceof AzureSpeechAbortedError) {
          // Distinguer les raisons connues côté Azure
          const msg = err.message || '';
          if (/InitialSilence/i.test(msg) || /Pas de son/i.test(msg)) {
            setState({
              kind: 'error',
              message: "On n'a rien entendu — réessaie en parlant plus fort."
            });
          } else if (/NoMatch/i.test(msg) || /Aucune parole/i.test(msg)) {
            setState({
              kind: 'error',
              message: 'Parole non reconnue — réessaie en articulant.'
            });
          } else {
            setState({
              kind: 'error',
              message: msg || "On n'a rien entendu, réessaie."
            });
          }
        } else if (err instanceof Error && /not-allowed|denied|permission/i.test(err.message)) {
          setState({
            kind: 'error',
            message: 'Permission micro refusée. Active-la dans les réglages.'
          });
        } else if (err instanceof Error && /non connect/i.test(err.message)) {
          setState({
            kind: 'error',
            message: 'Connecte-toi pour tester ta prononciation.'
          });
        } else {
          setState({
            kind: 'error',
            message:
              err instanceof Error
                ? `Erreur : ${err.message.slice(0, 80)}`
                : 'Erreur de reconnaissance.'
          });
        }
      });
  };

  const handleCancel = () => {
    abortRef.current?.abort();
    abortRef.current = null;
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
      const score = Math.round(state.result.pronunciationScore);
      switch (state.result.verdict) {
        case 'match':
          return `✓ ${scoreLabel(score)} (${score}/100) — clique pour réessayer`;
        case 'close':
          return `~ ${scoreLabel(score)} (${score}/100, entendu : "${state.result.recognized || '?'}") — clique pour réessayer`;
        case 'mismatch':
          return `✗ ${scoreLabel(score)} (${score}/100, entendu : "${state.result.recognized || '?'}") — clique pour réessayer`;
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
      {showFeedback && state.kind === 'result' && (() => {
        const score = Math.round(state.result.pronunciationScore);
        const badgeClass = scoreBadgeClass(score);
        return (
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
            <span
              className={`pron-check-score ${badgeClass}`}
              aria-hidden="true"
            >
              {score}
            </span>
            <span className="pron-check-score-label">{scoreLabel(score)}</span>
            {state.result.recognized && state.result.verdict !== 'match' && (
              <span className="pron-check-heard">
                · entendu : <em>{state.result.recognized}</em>
              </span>
            )}
            <span className="pron-check-verdict-icon" aria-hidden="true">
              {verdictEmoji(state.result.verdict)}
            </span>
          </span>
        );
      })()}
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
