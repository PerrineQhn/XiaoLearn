/**
 * PronunciationDrill.tsx — exercice de prononciation pour une liste de mots.
 * --------------------------------------------------------------------------
 * Présenté en bas d'une leçon (étape "summary") comme exercice bonus :
 * l'utilisateur prononce chaque mot vocabulaire, on lui dit s'il est bon
 * ou pas, et on affiche un score à la fin.
 *
 * Usage :
 *   <PronunciationDrill
 *     items={[{ hanzi: '你好', pinyin: 'nǐ hǎo' }, …]}
 *     language="fr"
 *   />
 */

import { useEffect, useMemo, useState } from 'react';
import {
  isPronunciationSupported,
  recognize,
  PronunciationAbortedError,
  type PronunciationResult,
  type PronunciationVerdict
} from '../services/pronunciationService';
import { playHanziAudio } from '../utils/audio';
import './PronunciationDrill.css';

export interface PronunciationDrillItem {
  hanzi: string;
  pinyin?: string;
  /** Override pour le fichier audio modèle si un MP3 dédié existe. */
  audio?: string;
}

export interface PronunciationDrillProps {
  items: PronunciationDrillItem[];
  language?: 'fr' | 'en';
  /** Titre affiché en haut du panel. Défaut localisé. */
  title?: string;
  /** Callback quand le drill est fini (avec le score). */
  onComplete?: (correct: number, total: number) => void;
}

const COPY = {
  fr: {
    title: '🎙️ Teste ta prononciation',
    subtitle: "Écoute le modèle, puis prononce le mot. Bonus : pas obligatoire pour valider la leçon.",
    notSupported:
      "Ton navigateur ne supporte pas la reconnaissance vocale. Essaie Chrome, Edge ou Safari récent.",
    start: 'Commencer',
    listenModel: 'Écouter',
    record: 'Prononcer',
    listening: "J'écoute…",
    cancel: 'Annuler',
    next: 'Suivant',
    retry: 'Réessayer',
    finish: 'Terminer',
    progress: (i: number, n: number) => `Mot ${i}/${n}`,
    summaryTitle: 'Bilan prononciation',
    summary: (ok: number, total: number) =>
      `Tu as bien prononcé ${ok} mot${ok > 1 ? 's' : ''} sur ${total}.`,
    restart: 'Refaire',
    verdictMatch: 'Parfait !',
    verdictClose: 'Presque…',
    verdictMismatch: 'On retente ?'
  },
  en: {
    title: '🎙️ Test your pronunciation',
    subtitle:
      'Listen to the model, then say the word. Bonus: not required to complete the lesson.',
    notSupported:
      "Your browser doesn't support speech recognition. Try a recent Chrome, Edge or Safari.",
    start: 'Start',
    listenModel: 'Listen',
    record: 'Speak',
    listening: 'Listening…',
    cancel: 'Cancel',
    next: 'Next',
    retry: 'Retry',
    finish: 'Finish',
    progress: (i: number, n: number) => `Word ${i}/${n}`,
    summaryTitle: 'Pronunciation summary',
    summary: (ok: number, total: number) =>
      `You correctly pronounced ${ok} of ${total} words.`,
    restart: 'Restart',
    verdictMatch: 'Perfect!',
    verdictClose: 'Almost…',
    verdictMismatch: 'Try again?'
  }
};

const verdictLabel = (v: PronunciationVerdict, lang: 'fr' | 'en'): string => {
  const c = COPY[lang];
  switch (v) {
    case 'match':
      return c.verdictMatch;
    case 'close':
      return c.verdictClose;
    case 'mismatch':
      return c.verdictMismatch;
  }
};

type DrillState =
  | { kind: 'idle' }
  | { kind: 'listening' }
  | { kind: 'result'; result: PronunciationResult }
  | { kind: 'error'; message: string };

const PronunciationDrill = ({
  items,
  language = 'fr',
  title,
  onComplete
}: PronunciationDrillProps) => {
  const copy = COPY[language];
  const supported = isPronunciationSupported();

  // Dédupe les items par hanzi pour éviter le drill d'un même mot 3 fois.
  const dedupedItems = useMemo(() => {
    const seen = new Set<string>();
    return items.filter((it) => {
      if (seen.has(it.hanzi)) return false;
      seen.add(it.hanzi);
      return true;
    });
  }, [items]);

  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [state, setState] = useState<DrillState>({ kind: 'idle' });
  const [correctCount, setCorrectCount] = useState(0);
  // Track if user attempted current item (for show progress)
  const [attempts, setAttempts] = useState<Record<number, PronunciationVerdict>>({});

  const total = dedupedItems.length;
  const finished = started && index >= total;
  const current = !finished ? dedupedItems[index] : null;

  // Cleanup au unmount
  useEffect(() => {
    return () => {
      // Pas de handle stocké hors closure ; cancel via .cancel() de recognize
      // serait nécessaire si on voulait être plus rigoureux.
    };
  }, []);

  // Quand le drill se termine : appelle onComplete une fois
  useEffect(() => {
    if (finished && onComplete) {
      onComplete(correctCount, total);
    }
  }, [finished, correctCount, total, onComplete]);

  const handlePlayModel = () => {
    if (!current) return;
    playHanziAudio(current.hanzi, current.audio).catch(() => {
      /* silent: pas de MP3 dispo pour ce mot, on ignore */
    });
  };

  const handleStartRecord = () => {
    if (!current || state.kind === 'listening') return;
    setState({ kind: 'listening' });
    const h = recognize({
      expectedHanzi: current.hanzi,
      expectedPinyin: current.pinyin,
      timeoutMs: 8000
    });
    h.promise
      .then((result) => {
        setState({ kind: 'result', result });
        setAttempts((prev) => {
          // On ne compte le "correct" que si c'est la première tentative match.
          if (prev[index] === undefined && result.verdict === 'match') {
            setCorrectCount((c) => c + 1);
          }
          return { ...prev, [index]: result.verdict };
        });
      })
      .catch((err) => {
        if (err instanceof PronunciationAbortedError) {
          setState({ kind: 'error', message: copy.cancel });
        } else if (err instanceof Error && /not-allowed|denied/i.test(err.message)) {
          setState({
            kind: 'error',
            message:
              language === 'fr'
                ? 'Permission micro refusée.'
                : 'Microphone permission denied.'
          });
        } else {
          setState({ kind: 'error', message: 'Erreur reconnaissance' });
        }
      });
  };

  const handleNext = () => {
    setIndex((i) => i + 1);
    setState({ kind: 'idle' });
  };

  const handleStart = () => {
    setStarted(true);
    setIndex(0);
    setCorrectCount(0);
    setAttempts({});
    setState({ kind: 'idle' });
  };

  const handleRestart = () => {
    handleStart();
  };

  if (!supported) {
    return (
      <section className="pron-drill pron-drill--unsupported">
        <h3>{title ?? copy.title}</h3>
        <p>{copy.notSupported}</p>
      </section>
    );
  }

  // Écran d'intro avant le démarrage
  if (!started) {
    return (
      <section className="pron-drill">
        <header className="pron-drill-header">
          <h3>{title ?? copy.title}</h3>
          <p>{copy.subtitle}</p>
        </header>
        <button
          type="button"
          className="pron-drill-btn pron-drill-btn--primary"
          onClick={handleStart}
          disabled={total === 0}
        >
          {copy.start} ({total} {language === 'fr' ? 'mots' : 'words'})
        </button>
      </section>
    );
  }

  // Écran de fin avec score
  if (finished) {
    return (
      <section className="pron-drill pron-drill--summary">
        <header className="pron-drill-header">
          <h3>{copy.summaryTitle}</h3>
        </header>
        <div className="pron-drill-score">
          <div className="pron-drill-score-value">
            {correctCount}<span className="pron-drill-score-total">/{total}</span>
          </div>
          <p>{copy.summary(correctCount, total)}</p>
        </div>
        <button
          type="button"
          className="pron-drill-btn"
          onClick={handleRestart}
        >
          {copy.restart}
        </button>
      </section>
    );
  }

  // Écran courant : le mot à prononcer
  if (!current) return null;

  const isListening = state.kind === 'listening';
  const isResult = state.kind === 'result';
  const verdict = isResult ? state.result.verdict : null;

  return (
    <section className="pron-drill">
      <header className="pron-drill-header">
        <h3>{title ?? copy.title}</h3>
        <span className="pron-drill-progress">
          {copy.progress(index + 1, total)}
        </span>
      </header>

      <div className={`pron-drill-card pron-drill-card--${verdict ?? 'idle'}`}>
        <div className="pron-drill-hanzi">{current.hanzi}</div>
        {current.pinyin && (
          <div className="pron-drill-pinyin">{current.pinyin}</div>
        )}
        <div className="pron-drill-actions">
          <button
            type="button"
            className="pron-drill-btn pron-drill-btn--ghost"
            onClick={handlePlayModel}
            disabled={isListening}
          >
            🔊 {copy.listenModel}
          </button>
          {!isListening && !isResult && (
            <button
              type="button"
              className="pron-drill-btn pron-drill-btn--primary"
              onClick={handleStartRecord}
            >
              🎤 {copy.record}
            </button>
          )}
          {isListening && (
            <button
              type="button"
              className="pron-drill-btn pron-drill-btn--danger"
              onClick={() => setState({ kind: 'idle' })}
            >
              ⏹ {copy.listening}
            </button>
          )}
          {isResult && (
            <>
              <button
                type="button"
                className="pron-drill-btn pron-drill-btn--ghost"
                onClick={() => {
                  setState({ kind: 'idle' });
                  handleStartRecord();
                }}
              >
                ↻ {copy.retry}
              </button>
              <button
                type="button"
                className="pron-drill-btn pron-drill-btn--primary"
                onClick={handleNext}
              >
                {index + 1 < total ? copy.next : copy.finish} →
              </button>
            </>
          )}
        </div>
        {isResult && (
          <div className={`pron-drill-feedback pron-drill-feedback--${verdict}`}>
            <strong>{verdictLabel(verdict!, language)}</strong>
            {state.result.transcript && (
              <span className="pron-drill-transcript">
                {language === 'fr' ? 'Entendu :' : 'Heard:'} {state.result.transcript}
              </span>
            )}
          </div>
        )}
        {state.kind === 'error' && (
          <div className="pron-drill-feedback pron-drill-feedback--mismatch">
            {state.message}
          </div>
        )}
      </div>
    </section>
  );
};

export default PronunciationDrill;
