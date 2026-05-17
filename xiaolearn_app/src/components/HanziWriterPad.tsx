/**
 * HanziWriterPad.tsx — pad d'écriture d'un caractère chinois (Hanzi Writer).
 * --------------------------------------------------------------------------
 * Wraps Hanzi Writer (https://hanziwriter.org/) — lib JS gratuite qui :
 *   - Affiche l'ordre des traits animé (mode demo)
 *   - Active un mode "quiz" où l'utilisateur trace chaque trait au doigt /
 *     stylet / souris, et la lib vérifie la trajectoire en temps réel.
 *   - Donne un feedback : 0-2 erreurs = parfait, 3-5 = proche, plus = à
 *     retravailler.
 *
 * Supports pointer events natifs (touch + stylus + mouse) sans config
 * additionnelle. Les données des caractères sont chargées à la volée
 * depuis cdn.jsdelivr.net (option par défaut de la lib).
 *
 * NB : composant volontairement nommé "HanziWriterPad" pour ne pas entrer
 * en collision avec l'ancien HandwritingPractice.tsx (canvas libre, sans
 * validation) qui reste utilisé dans ReviewPage.
 *
 * Usage :
 *   <HanziWriterPad hanzi="你" onComplete={(s) => …} />
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import HanziWriter from 'hanzi-writer';
import './HanziWriterPad.css';

export interface HanziWriterQuizStats {
  /** Nombre total d'erreurs cumulées sur tous les traits. */
  totalMistakes: number;
  /** Verdict simple basé sur totalMistakes. */
  verdict: 'match' | 'close' | 'mismatch';
}

export interface HanziWriterPadProps {
  /** Caractère à écrire. Si plusieurs hanzi, on ne prend que le premier. */
  hanzi: string;
  /** Taille du canvas (carré). Défaut 220. */
  size?: number;
  /** Callback quand le quiz est complété. */
  onComplete?: (stats: HanziWriterQuizStats) => void;
  /** Si true, lance le quiz directement au montage. Défaut false. */
  autoStartQuiz?: boolean;
  language?: 'fr' | 'en';
  className?: string;
}

const COPY = {
  fr: {
    showStrokes: 'Voir les traits',
    practice: 'Écrire',
    reset: 'Recommencer',
    multiHanziWarning: 'Un seul caractère par cadre. Le premier sera utilisé.',
    completeMatch: 'Bravo, parfait !',
    completeClose: 'Pas mal — encore un peu de pratique.',
    completeMismatch: 'Il faut s’entraîner encore.',
    notFound: "Données d'écriture indisponibles pour ce caractère.",
    mistakes: (n: number) => `${n} erreur${n > 1 ? 's' : ''}`
  },
  en: {
    showStrokes: 'Show strokes',
    practice: 'Write',
    reset: 'Restart',
    multiHanziWarning: 'One character per pad. Only the first will be used.',
    completeMatch: 'Great, perfect!',
    completeClose: 'Not bad — keep practicing.',
    completeMismatch: 'More practice needed.',
    notFound: 'Stroke data unavailable for this character.',
    mistakes: (n: number) => `${n} mistake${n > 1 ? 's' : ''}`
  }
};

type UiState =
  | { kind: 'idle' }
  | { kind: 'demo' }
  | { kind: 'quiz' }
  | { kind: 'done'; stats: HanziWriterQuizStats }
  | { kind: 'error'; message: string };

const verdictForMistakes = (n: number): HanziWriterQuizStats['verdict'] => {
  if (n <= 2) return 'match';
  if (n <= 5) return 'close';
  return 'mismatch';
};

// Type minimal du writer (la lib n'exporte pas son type complet via npm).
type Writer = ReturnType<typeof HanziWriter.create>;

const HanziWriterPad = ({
  hanzi,
  size = 220,
  onComplete,
  autoStartQuiz = false,
  language = 'fr',
  className
}: HanziWriterPadProps) => {
  const copy = COPY[language];
  const containerRef = useRef<HTMLDivElement | null>(null);
  const writerRef = useRef<Writer | null>(null);
  const [state, setState] = useState<UiState>({ kind: 'idle' });

  // On ne prend que le premier hanzi si la prop en contient plusieurs.
  const targetChar = Array.from(hanzi.trim())[0] ?? '';
  const isMulti = Array.from(hanzi.trim()).length > 1;

  const startQuizInternal = useCallback(
    (writer: Writer) => {
      setState({ kind: 'quiz' });
      writer.quiz({
        onComplete: (summary: { totalMistakes: number }) => {
          const stats: HanziWriterQuizStats = {
            totalMistakes: summary.totalMistakes,
            verdict: verdictForMistakes(summary.totalMistakes)
          };
          setState({ kind: 'done', stats });
          onComplete?.(stats);
        }
      });
    },
    [onComplete]
  );

  // (Re)crée le writer quand le hanzi change.
  useEffect(() => {
    const node = containerRef.current;
    if (!node || !targetChar) return;
    node.innerHTML = ''; // cleanup éventuel writer précédent
    let cancelled = false;
    try {
      const writer = HanziWriter.create(node, targetChar, {
        width: size,
        height: size,
        padding: 5,
        showCharacter: false,
        showOutline: true,
        showHintAfterMisses: 3,
        strokeAnimationSpeed: 1.2,
        delayBetweenStrokes: 80,
        strokeColor: '#e05040',
        outlineColor: 'rgba(0,0,0,0.12)',
        radicalColor: '#888',
        drawingColor: '#1f2233'
      });
      writerRef.current = writer;
      if (autoStartQuiz && !cancelled) {
        startQuizInternal(writer);
      }
    } catch (err) {
      setState({
        kind: 'error',
        message: err instanceof Error ? err.message : copy.notFound
      });
    }
    return () => {
      cancelled = true;
      writerRef.current = null;
      if (node) node.innerHTML = '';
    };
  }, [targetChar, size, autoStartQuiz, copy.notFound, startQuizInternal]);

  const handleShowStrokes = useCallback(() => {
    const writer = writerRef.current;
    if (!writer) return;
    writer.cancelQuiz();
    writer.hideCharacter();
    setState({ kind: 'demo' });
    writer.animateCharacter({
      onComplete: () => {
        writer.hideCharacter();
        setState({ kind: 'idle' });
      }
    });
  }, []);

  const handleStartQuiz = useCallback(() => {
    const writer = writerRef.current;
    if (!writer) return;
    writer.cancelQuiz();
    writer.hideCharacter();
    startQuizInternal(writer);
  }, [startQuizInternal]);

  const handleReset = useCallback(() => {
    const writer = writerRef.current;
    if (!writer) return;
    writer.cancelQuiz();
    writer.hideCharacter();
    setState({ kind: 'idle' });
  }, []);

  return (
    <div className={`hw-pad ${className ?? ''}`.trim()}>
      <div
        className="hw-pad-canvas"
        ref={containerRef}
        style={{ width: size, height: size }}
      />

      {isMulti && <p className="hw-pad-warning">{copy.multiHanziWarning}</p>}

      <div className="hw-pad-actions">
        {(state.kind === 'idle' || state.kind === 'done') && (
          <>
            <button
              type="button"
              className="hw-pad-btn hw-pad-btn--ghost"
              onClick={handleShowStrokes}
            >
              👀 {copy.showStrokes}
            </button>
            <button
              type="button"
              className="hw-pad-btn hw-pad-btn--primary"
              onClick={handleStartQuiz}
            >
              ✍️ {copy.practice}
            </button>
          </>
        )}
        {state.kind === 'quiz' && (
          <button
            type="button"
            className="hw-pad-btn hw-pad-btn--ghost"
            onClick={handleReset}
          >
            ⏹ {copy.reset}
          </button>
        )}
        {state.kind === 'demo' && (
          <span className="hw-pad-status">…</span>
        )}
      </div>

      {state.kind === 'done' && (
        <div className={`hw-pad-feedback hw-pad-feedback--${state.stats.verdict}`}>
          <strong>
            {state.stats.verdict === 'match'
              ? copy.completeMatch
              : state.stats.verdict === 'close'
                ? copy.completeClose
                : copy.completeMismatch}
          </strong>
          <span className="hw-pad-feedback-detail">
            {copy.mistakes(state.stats.totalMistakes)}
          </span>
        </div>
      )}

      {state.kind === 'error' && (
        <div className="hw-pad-feedback hw-pad-feedback--mismatch">
          {state.message}
        </div>
      )}
    </div>
  );
};

export default HanziWriterPad;
