/**
 * HandwritingDrill.tsx — exercice d'écriture pour une liste de caractères.
 * ------------------------------------------------------------------------
 * Pendant écriture du PronunciationDrill : on récupère tous les hanzi de
 * la leçon (déduplique par caractère individuel), et on propose à l'user
 * de les tracer un par un avec un score final.
 *
 * Pour les mots de 2+ caractères, on les explose : "你好" → drill sur 你
 * puis sur 好 (Hanzi Writer ne gère qu'un caractère à la fois).
 *
 * Usage :
 *   <HandwritingDrill
 *     hanzis={['你', '好', '我']}
 *     language="fr"
 *   />
 */

import { useEffect, useMemo, useState } from 'react';
import HanziWriterPad, {
  type HanziWriterQuizStats
} from './HanziWriterPad';
import './HandwritingDrill.css';

export interface HandwritingDrillProps {
  /** Liste de hanzi (peuvent être des mots multi-caractères, on les explose). */
  hanzis: string[];
  language?: 'fr' | 'en';
  /** Titre affiché en haut. Défaut localisé. */
  title?: string;
  /** Callback à la fin du drill. */
  onComplete?: (correct: number, total: number) => void;
}

const COPY = {
  fr: {
    title: '✍️ Apprends à écrire',
    subtitle:
      "Trace chaque caractère au doigt, au stylet ou à la souris. L'ordre des traits est vérifié automatiquement.",
    start: 'Commencer',
    next: 'Suivant',
    finish: 'Terminer',
    progress: (i: number, n: number) => `Caractère ${i}/${n}`,
    summaryTitle: 'Bilan écriture',
    summary: (ok: number, total: number) =>
      `Tu as bien écrit ${ok} caractère${ok > 1 ? 's' : ''} sur ${total}.`,
    restart: 'Refaire'
  },
  en: {
    title: '✍️ Learn to write',
    subtitle:
      'Trace each character with your finger, stylus, or mouse. Stroke order is checked automatically.',
    start: 'Start',
    next: 'Next',
    finish: 'Finish',
    progress: (i: number, n: number) => `Character ${i}/${n}`,
    summaryTitle: 'Writing summary',
    summary: (ok: number, total: number) =>
      `You correctly wrote ${ok} of ${total} characters.`,
    restart: 'Restart'
  }
};

const HandwritingDrill = ({
  hanzis,
  language = 'fr',
  title,
  onComplete
}: HandwritingDrillProps) => {
  const copy = COPY[language];

  // Explose les mots en caractères individuels + dédupe.
  const chars = useMemo(() => {
    const seen = new Set<string>();
    const out: string[] = [];
    for (const word of hanzis) {
      for (const ch of Array.from(word.trim())) {
        if (seen.has(ch)) continue;
        // Saute la ponctuation et les espaces
        if (!/[一-鿿]/.test(ch)) continue;
        seen.add(ch);
        out.push(ch);
      }
    }
    return out;
  }, [hanzis]);

  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [lastResult, setLastResult] = useState<HanziWriterQuizStats | null>(null);

  const total = chars.length;
  const finished = started && index >= total;
  const current = !finished ? chars[index] : null;

  useEffect(() => {
    if (finished && onComplete) {
      onComplete(correctCount, total);
    }
  }, [finished, correctCount, total, onComplete]);

  const handleStart = () => {
    setStarted(true);
    setIndex(0);
    setCorrectCount(0);
    setLastResult(null);
  };

  const handleComplete = (stats: HanziWriterQuizStats) => {
    setLastResult(stats);
    if (stats.verdict === 'match') {
      setCorrectCount((c) => c + 1);
    }
  };

  const handleNext = () => {
    setIndex((i) => i + 1);
    setLastResult(null);
  };

  if (total === 0) return null;

  // Intro
  if (!started) {
    return (
      <section className="hw-drill">
        <header className="hw-drill-header">
          <h3>{title ?? copy.title}</h3>
          <p>{copy.subtitle}</p>
        </header>
        <button
          type="button"
          className="hw-drill-btn hw-drill-btn--primary"
          onClick={handleStart}
        >
          {copy.start} ({total} {language === 'fr' ? 'caractères' : 'characters'})
        </button>
      </section>
    );
  }

  // Bilan
  if (finished) {
    return (
      <section className="hw-drill hw-drill--summary">
        <header className="hw-drill-header">
          <h3>{copy.summaryTitle}</h3>
        </header>
        <div className="hw-drill-score">
          <div className="hw-drill-score-value">
            {correctCount}
            <span className="hw-drill-score-total">/{total}</span>
          </div>
          <p>{copy.summary(correctCount, total)}</p>
        </div>
        <button
          type="button"
          className="hw-drill-btn"
          onClick={handleStart}
        >
          {copy.restart}
        </button>
      </section>
    );
  }

  if (!current) return null;

  return (
    <section className="hw-drill">
      <header className="hw-drill-header">
        <h3>{title ?? copy.title}</h3>
        <span className="hw-drill-progress">
          {copy.progress(index + 1, total)}
        </span>
      </header>

      <div className="hw-drill-card">
        <HanziWriterPad
          key={current /* force remount entre 2 caractères */}
          hanzi={current}
          size={240}
          language={language}
          onComplete={handleComplete}
        />
        {lastResult && (
          <button
            type="button"
            className="hw-drill-btn hw-drill-btn--primary"
            onClick={handleNext}
          >
            {index + 1 < total ? copy.next : copy.finish} →
          </button>
        )}
      </div>
    </section>
  );
};

export default HandwritingDrill;
