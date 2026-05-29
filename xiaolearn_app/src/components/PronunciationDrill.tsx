/**
 * PronunciationDrill.tsx — exercice de prononciation pour une liste de mots.
 * --------------------------------------------------------------------------
 * Présenté en bas d'une leçon (étape "summary") comme exercice bonus :
 * l'utilisateur prononce chaque mot vocabulaire, on lui dit s'il est bon
 * ou pas, et on affiche un score à la fin.
 *
 * Migration de Web Speech vers Azure Speech Pronunciation Assessment :
 * feedback riche (score 0-100 + accuracy/fluency/completeness) et marche
 * sur Safari + sur les hanzi uniques (Web Speech zh-CN les ratait).
 *
 * Usage :
 *   <PronunciationDrill
 *     items={[{ hanzi: '你好', pinyin: 'nǐ hǎo' }, …]}
 *     language="fr"
 *   />
 */

import { useEffect, useMemo, useState } from 'react';
import {
  isAzureSpeechSupported,
  recognizeWithAzure,
  AzureSpeechAbortedError,
  type AzurePronunciationResult,
  type AzureVerdict
} from '../services/pronunciationServiceAzure';
import PronunciationFeedback from './PronunciationFeedback';
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
      "Ton navigateur ne supporte pas l'enregistrement audio. Essaie Chrome, Edge ou Safari récent.",
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
    verdictMatch: 'Excellent !',
    verdictClose: 'Bien, on affine ?',
    verdictMismatch: 'À retravailler',
    heard: 'Entendu :',
    score: 'Score',
    errNoSpeech: "On n'a rien entendu — réessaie en parlant plus fort",
    errPermission: 'Permission micro refusée. Active-la dans les réglages du navigateur.',
    errAuth: 'Connecte-toi pour tester ta prononciation.',
    errGeneric: 'Erreur de reconnaissance. Réessaie ?'
  },
  en: {
    title: '🎙️ Test your pronunciation',
    subtitle:
      'Listen to the model, then say the word. Bonus: not required to complete the lesson.',
    notSupported:
      "Your browser doesn't support audio recording. Try a recent Chrome, Edge or Safari.",
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
    verdictMatch: 'Excellent!',
    verdictClose: 'Good, let’s refine?',
    verdictMismatch: 'Needs work',
    heard: 'Heard:',
    score: 'Score',
    errNoSpeech: "Didn't hear anything — try again louder",
    errPermission: 'Mic permission denied. Enable it in your browser settings.',
    errAuth: 'Sign in to test your pronunciation.',
    errGeneric: 'Recognition error. Try again?'
  }
};

const verdictLabel = (v: AzureVerdict, lang: 'fr' | 'en'): string => {
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
  | { kind: 'result'; result: AzurePronunciationResult }
  | { kind: 'error'; message: string };

const PronunciationDrill = ({
  items,
  language = 'fr',
  title,
  onComplete
}: PronunciationDrillProps) => {
  const copy = COPY[language];
  const supported = isAzureSpeechSupported();

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
  const [attempts, setAttempts] = useState<Record<number, AzureVerdict>>({});

  const total = dedupedItems.length;
  const finished = started && index >= total;
  const current = !finished ? dedupedItems[index] : null;

  // Cleanup au unmount
  useEffect(() => {
    return () => {
      // recognizeWithAzure ne fournit pas d'API d'annulation côté caller —
      // les enregistrements en cours s'arrêtent d'eux-mêmes au silence ou
      // au maxDurationMs (4s par défaut).
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

    recognizeWithAzure({
      referenceText: current.hanzi,
      language: 'zh-CN'
    })
      .then((result) => {
        console.log('[PronunciationDrill] result', {
          expected: current.hanzi,
          recognized: result.recognized,
          score: result.pronunciationScore,
          verdict: result.verdict
        });
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
        console.warn('[PronunciationDrill] recognize rejected', err);
        if (err instanceof AzureSpeechAbortedError) {
          setState({ kind: 'error', message: copy.errNoSpeech });
        } else if (err instanceof Error && /not-allowed|denied|permission/i.test(err.message)) {
          setState({ kind: 'error', message: copy.errPermission });
        } else if (err instanceof Error && /non connect/i.test(err.message)) {
          setState({ kind: 'error', message: copy.errAuth });
        } else {
          setState({ kind: 'error', message: copy.errGeneric });
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
              disabled
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
            <div className="pron-drill-feedback-verdict">
              <strong>{verdictLabel(verdict!, language)}</strong>
            </div>
            <PronunciationFeedback
              result={state.result}
              referenceText={current.hanzi}
              language={language}
            />
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
