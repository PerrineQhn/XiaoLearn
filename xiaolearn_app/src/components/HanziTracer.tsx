/**
 * HanziTracer.tsx — traçage interactif d'un mot chinois (Hanzi Writer).
 * ---------------------------------------------------------------------------
 * Contrairement à HanziWriterPad (1 caractère, démo + quiz à la demande),
 * HanziTracer est pensé pour le mode d'étude « Écriture » des flashcards :
 *
 *   - Reçoit un MOT complet (你好 → 2 caractères) et enchaîne le traçage
 *     caractère par caractère avec un indicateur de progression (1/2, 2/2).
 *   - Lance le quiz immédiatement (silhouette grise à tracer, trait validé
 *     en temps réel par hanzi-writer).
 *   - Boutons : Indice (highlight du trait courant), Révéler (abandon →
 *     onGiveUp), Recommencer (reset du caractère courant).
 *   - Cumule les erreurs de TOUS les caractères et les remonte via
 *     `onComplete({ totalMistakes })`.
 *
 * Les données de traits sont chargées à la volée depuis le CDN par défaut
 * de hanzi-writer (cdn.jsdelivr.net/npm/hanzi-writer-data@2.0). Si un
 * caractère est absent des données (échec de chargement), on affiche un
 * fallback propre « traçage indisponible » + bouton Passer :
 *   - s'il reste des caractères, on passe au suivant ;
 *   - si AUCUN caractère du mot n'a pu être tracé, `onAllUnavailable()`
 *     est appelé (le parent peut alors sauter la carte sans la noter).
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import HanziWriter from 'hanzi-writer';

// ============================================================================
//  TYPES
// ============================================================================

export interface HanziTracerResult {
  /** Erreurs cumulées sur tous les caractères tracés du mot. */
  totalMistakes: number;
}

export interface HanziTracerProps {
  /** Mot à tracer (1..n caractères — les non-hanzi sont ignorés). */
  hanzi: string;
  /** Taille du canvas carré en px. Défaut 280. */
  size?: number;
  /** Appelé quand tous les caractères ont été tracés. */
  onComplete: (result: HanziTracerResult) => void;
  /** Appelé si l'utilisateur clique « Révéler » (abandon du mot entier). */
  onGiveUp?: () => void;
  /** Appelé si AUCUN caractère du mot n'a de données de traits. */
  onAllUnavailable?: () => void;
  language?: 'fr' | 'en';
  className?: string;
}

const COPY = {
  fr: {
    hint: 'Indice',
    reveal: 'Révéler',
    restart: 'Recommencer',
    skip: 'Passer',
    unavailable: 'Traçage indisponible pour ce caractère.',
    loading: 'Chargement…',
    progressLabel: 'Caractère'
  },
  en: {
    hint: 'Hint',
    reveal: 'Reveal',
    restart: 'Restart',
    skip: 'Skip',
    unavailable: 'Tracing unavailable for this character.',
    loading: 'Loading…',
    progressLabel: 'Character'
  }
};

type CharStatus = 'loading' | 'quiz' | 'done' | 'revealed' | 'error';

type Writer = ReturnType<typeof HanziWriter.create>;

// Même heuristique CJK que WritingCard (plage unifiée de base).
const isHanzi = (c: string) => /[一-鿿]/.test(c);

// ============================================================================
//  COMPONENT
// ============================================================================

const HanziTracer = ({
  hanzi,
  size = 280,
  onComplete,
  onGiveUp,
  onAllUnavailable,
  language = 'fr',
  className
}: HanziTracerProps) => {
  const copy = COPY[language];
  const chars = Array.from(hanzi.trim()).filter(isHanzi);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const writerRef = useRef<Writer | null>(null);
  const [charIndex, setCharIndex] = useState(0);
  const [status, setStatus] = useState<CharStatus>('loading');

  // -- Refs (callbacks + compteurs) — évitent de recréer le writer quand le
  //    parent passe des lambdas inline (cf. piège closures HanziWriterPad).
  const onCompleteRef = useRef(onComplete);
  const onGiveUpRef = useRef(onGiveUp);
  const onAllUnavailableRef = useRef(onAllUnavailable);
  useEffect(() => {
    onCompleteRef.current = onComplete;
    onGiveUpRef.current = onGiveUp;
    onAllUnavailableRef.current = onAllUnavailable;
  }, [onComplete, onGiveUp, onAllUnavailable]);

  /** Erreurs par caractère complété. */
  const mistakesRef = useRef<number[]>([]);
  /** Prochain trait attendu du caractère courant (pour « Indice »). */
  const strokeNumRef = useRef(0);
  /** Au moins un caractère a réellement été tracé (≠ tous indisponibles). */
  const tracedAnyRef = useRef(false);
  /** Garde anti double-fin (onComplete/onGiveUp appelés une seule fois). */
  const finishedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset complet quand le mot change.
  useEffect(() => {
    mistakesRef.current = [];
    tracedAnyRef.current = false;
    finishedRef.current = false;
    strokeNumRef.current = 0;
    setCharIndex(0);
    setStatus('loading');
  }, [hanzi]);

  const finishWord = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    if (!tracedAnyRef.current) {
      // Aucun caractère traçable dans tout le mot.
      onAllUnavailableRef.current?.();
      return;
    }
    const totalMistakes = mistakesRef.current.reduce((a, b) => a + (b || 0), 0);
    onCompleteRef.current({ totalMistakes });
  }, []);

  const goNextCharOrFinish = useCallback(
    (delayMs: number) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setCharIndex((i) => {
          if (i + 1 < chars.length) return i + 1;
          finishWord();
          return i;
        });
      }, delayMs);
    },
    [chars.length, finishWord]
  );

  /** (Re)lance le quiz sur le writer courant. */
  const startQuiz = useCallback(
    (writer: Writer, index: number) => {
      strokeNumRef.current = 0;
      const quizPromise = writer.quiz({
        onCorrectStroke: (stroke) => {
          strokeNumRef.current = stroke.strokeNum + 1;
        },
        onComplete: (summary) => {
          mistakesRef.current[index] = summary.totalMistakes;
          tracedAnyRef.current = true;
          setStatus('done');
          // Petit délai pour laisser jouer le flash highlightOnComplete.
          goNextCharOrFinish(900);
        }
      });
      // quiz() renvoie une promesse (chargement lazy des données) — un échec
      // CDN est déjà géré par onLoadCharDataError, on avale juste le reject.
      void Promise.resolve(quizPromise).catch(() => {
        /* géré via onLoadCharDataError */
      });
    },
    [goNextCharOrFinish]
  );

  // (Re)crée le writer quand le caractère courant change.
  useEffect(() => {
    const node = containerRef.current;
    const char = chars[charIndex];
    if (!node) return;
    if (!char) {
      // Mot sans hanzi traçable.
      setStatus('error');
      return;
    }
    let disposed = false;
    node.innerHTML = '';
    setStatus('loading');
    try {
      const writer = HanziWriter.create(node, char, {
        width: size,
        height: size,
        padding: 5,
        showCharacter: false,
        showOutline: true,
        highlightOnComplete: true,
        strokeColor: '#1f2937',
        outlineColor: '#ddd',
        drawingWidth: 20,
        onLoadCharDataSuccess: () => {
          if (!disposed) setStatus('quiz');
        },
        onLoadCharDataError: () => {
          if (!disposed) setStatus('error');
        }
      });
      writerRef.current = writer;
      startQuiz(writer, charIndex);
    } catch {
      if (!disposed) setStatus('error');
    }
    return () => {
      disposed = true;
      const writer = writerRef.current;
      if (writer) {
        try {
          writer.cancelQuiz();
        } catch {
          /* noop — "no quiz in progress" sur certaines versions */
        }
      }
      writerRef.current = null;
      node.innerHTML = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hanzi, charIndex, size]);

  // Cleanup du timer à l'unmount.
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // -- Actions ---------------------------------------------------------------

  const handleHint = useCallback(() => {
    const writer = writerRef.current;
    if (!writer || status !== 'quiz') return;
    try {
      writer.highlightStroke(strokeNumRef.current);
    } catch {
      /* trait hors limites — noop */
    }
  }, [status]);

  const handleReveal = useCallback(() => {
    const writer = writerRef.current;
    if (finishedRef.current || status !== 'quiz') return;
    finishedRef.current = true;
    if (writer) {
      try {
        writer.cancelQuiz();
      } catch {
        /* noop */
      }
      writer.showCharacter();
    }
    setStatus('revealed');
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      onGiveUpRef.current?.();
    }, 900);
  }, [status]);

  const handleRestart = useCallback(() => {
    const writer = writerRef.current;
    if (!writer || status !== 'quiz') return;
    try {
      writer.cancelQuiz();
    } catch {
      /* noop */
    }
    writer.hideCharacter();
    mistakesRef.current[charIndex] = 0;
    startQuiz(writer, charIndex);
  }, [status, charIndex, startQuiz]);

  /** « Passer » depuis le fallback caractère indisponible. */
  const handleSkipChar = useCallback(() => {
    if (charIndex + 1 < chars.length) {
      setCharIndex(charIndex + 1);
    } else {
      finishWord();
    }
  }, [charIndex, chars.length, finishWord]);

  // -- Rendu -----------------------------------------------------------------

  const isMulti = chars.length > 1;

  return (
    <div className={`hzt ${className ?? ''}`.trim()}>
      {isMulti && (
        <div className="hzt-progress" aria-label={copy.progressLabel}>
          {chars.map((c, i) => (
            <span
              key={`${c}-${i}`}
              className={
                i === charIndex
                  ? 'hzt-progress-dot hzt-progress-dot--current'
                  : i < charIndex
                    ? 'hzt-progress-dot hzt-progress-dot--done'
                    : 'hzt-progress-dot'
              }
            />
          ))}
          <span className="hzt-progress-count">
            {Math.min(charIndex + 1, chars.length)}/{chars.length}
          </span>
        </div>
      )}

      <div className="hzt-canvas-wrap">
        <div
          className="hzt-canvas"
          ref={containerRef}
          style={{ width: size, height: size }}
        />
        {status === 'loading' && (
          <div className="hzt-overlay" aria-live="polite">
            {copy.loading}
          </div>
        )}
        {status === 'error' && (
          <div className="hzt-overlay hzt-overlay--error">
            <p className="hzt-error-msg">{copy.unavailable}</p>
            <button
              type="button"
              className="hzt-btn hzt-btn--primary"
              onClick={handleSkipChar}
            >
              {copy.skip} →
            </button>
          </div>
        )}
      </div>

      <div className="hzt-actions">
        <button
          type="button"
          className="hzt-btn"
          onClick={handleHint}
          disabled={status !== 'quiz'}
        >
          💡 {copy.hint}
        </button>
        <button
          type="button"
          className="hzt-btn"
          onClick={handleRestart}
          disabled={status !== 'quiz'}
        >
          ↺ {copy.restart}
        </button>
        <button
          type="button"
          className="hzt-btn hzt-btn--danger"
          onClick={handleReveal}
          disabled={status !== 'quiz'}
        >
          👁 {copy.reveal}
        </button>
      </div>
    </div>
  );
};

export default HanziTracer;
