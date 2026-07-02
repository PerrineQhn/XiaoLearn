/**
 * PronunciationFeedback.tsx — affichage riche d'un résultat Azure Pronunciation.
 * --------------------------------------------------------------------------
 * Utilisé par PronunciationCheck (vue lesson), PronunciationDrill et la
 * flashcard mode prononciation. Affichage :
 *   - Score global (badge coloré)
 *   - Score par caractère (chip coloré sous chaque hanzi)
 *   - Pinyin coloré par syllabe selon son score Azure
 *   - Hints pédagogiques contextuels si une syllabe est sous 70/100
 *     (avec conseils tonaux concrets)
 *
 * Couleurs :
 *   ≥ 90 : or         (excellent)
 *   ≥ 70 : vert       (bien)
 *   ≥ 50 : ambre      (moyen — déclenche un hint)
 *   < 50 : rouge      (à retravailler — déclenche un hint)
 */

import { useMemo } from 'react';
import type { AzurePronunciationResult } from '../services/pronunciationServiceAzure';
import {
  parseAzurePhoneme,
  pinyinWithTone,
  hintForTone
} from '../utils/pinyinTones';
import './PronunciationFeedback.css';

export interface PronunciationFeedbackProps {
  result: AzurePronunciationResult;
  /** Hanzi de référence pour afficher les caractères s'ils manquent côté Azure. */
  referenceText?: string;
  language?: 'fr' | 'en';
  /** Taille compacte pour la vue lesson inline. */
  compact?: boolean;
}

const COPY = {
  fr: {
    excellent: 'Excellent',
    good: 'Bien',
    bof: 'Bof',
    redo: 'À retravailler',
    tipsTitle: 'Conseils'
  },
  en: {
    excellent: 'Excellent',
    good: 'Good',
    bof: 'Meh',
    redo: 'Try again',
    tipsTitle: 'Tips'
  }
};

function scoreClass(score: number): string {
  if (score >= 90) return 'pron-fb-score--gold';
  if (score >= 70) return 'pron-fb-score--green';
  if (score >= 50) return 'pron-fb-score--amber';
  return 'pron-fb-score--red';
}

function scoreLabel(score: number, lang: 'fr' | 'en'): string {
  const c = COPY[lang];
  if (score >= 90) return c.excellent;
  if (score >= 70) return c.good;
  if (score >= 50) return c.bof;
  return c.redo;
}

/**
 * Reconstruit une vue "par caractère" en associant chaque hanzi de la
 * référence à son score Azure.
 */
/** Ponctuation/espaces à filtrer du référenceText pour l'affichage par-caractère. */
const PUNCT_RE = /[。，、；：？！“”‘’（）《》〈〉【】「」.,;:!?()<>\[\]{}'"　\s]/;

function buildPerCharScores(
  result: AzurePronunciationResult,
  referenceText: string
): Array<{ hanzi: string; score: number; errorType: string }> {
  // Filtre les caractères de ponctuation pour qu'ils n'apparaissent pas
  // comme des "scorables" dans l'UI. La ponctuation a déjà été retirée
  // côté service avant l'envoi à Azure.
  const chars = Array.from(referenceText).filter((c) => !PUNCT_RE.test(c));
  if (chars.length === 0) return [];

  const flat: Array<{ grapheme: string; score: number; errorType: string }> = [];
  for (const w of result.words) {
    if (w.syllables.length === 0) {
      flat.push({
        grapheme: w.word,
        score: w.accuracyScore,
        errorType: w.errorType
      });
    } else {
      for (const s of w.syllables) {
        flat.push({
          grapheme: s.grapheme,
          score: s.accuracyScore,
          errorType: w.errorType
        });
      }
    }
  }

  const out: Array<{ hanzi: string; score: number; errorType: string }> = [];
  let cursor = 0;
  for (const ch of chars) {
    let assigned: { score: number; errorType: string } | null = null;
    while (cursor < flat.length) {
      const f = flat[cursor];
      const fChars = Array.from(f.grapheme);
      if (fChars.includes(ch)) {
        assigned = { score: f.score, errorType: f.errorType };
        if (fChars.length === 1) cursor++;
        else {
          const remainingInRef = chars
            .slice(out.length)
            .filter((c) => fChars.includes(c)).length;
          if (remainingInRef <= 1) cursor++;
        }
        break;
      }
      cursor++;
    }
    out.push({
      hanzi: ch,
      score: assigned?.score ?? 0,
      errorType: assigned?.errorType ?? 'Omission'
    });
  }
  return out;
}

const PronunciationFeedback = ({
  result,
  referenceText,
  language = 'fr',
  compact = false
}: PronunciationFeedbackProps) => {
  const copy = COPY[language];
  const globalScore = Math.round(result.pronunciationScore);

  const perChar = useMemo(
    () =>
      referenceText
        ? buildPerCharScores(result, referenceText)
        : result.words.flatMap((w) =>
            w.syllables.length > 0
              ? w.syllables.map((s) => ({
                  hanzi: s.grapheme,
                  score: s.accuracyScore,
                  errorType: w.errorType
                }))
              : [{ hanzi: w.word, score: w.accuracyScore, errorType: w.errorType }]
          ),
    [result, referenceText]
  );

  // Pinyin coloré + hints — un par phonème Azure (= un par syllabe).
  // Les hints ne sont émis que pour les syllabes < 70.
  const pinyinSyllables = useMemo(() => {
    const out: Array<{
      pinyin: string;
      syllable: string;
      tone: number | null;
      score: number;
      hint?: string;
    }> = [];
    for (const w of result.words) {
      for (const p of w.phonemes) {
        const parsed = parseAzurePhoneme(p.phoneme);
        const score = Math.round(p.accuracyScore);
        out.push({
          pinyin: pinyinWithTone(parsed.syllable, parsed.tone),
          syllable: parsed.syllable,
          tone: parsed.tone,
          score,
          hint: hintForTone(parsed.syllable, parsed.tone, score, language)
        });
      }
    }
    return out;
  }, [result, language]);

  const tips = pinyinSyllables.filter((s) => s.hint).map((s) => s.hint!);
  const hasPinyin = pinyinSyllables.length > 0;

  return (
    <div className={`pron-fb ${compact ? 'pron-fb--compact' : ''}`}>
      <div className="pron-fb-summary">
        <span className={`pron-fb-score ${scoreClass(globalScore)}`} aria-label="Score">
          {globalScore}
          {!compact && <span className="pron-fb-score-max">/100</span>}
        </span>
        <span className="pron-fb-label">{scoreLabel(globalScore, language)}</span>
      </div>

      {perChar.length > 0 && (
        <div className="pron-fb-chars">
          {perChar.map((c, i) => {
            const cScore = Math.round(c.score);
            const isOmission = c.errorType === 'Omission' && cScore === 0;
            return (
              <div key={i} className="pron-fb-char">
                <span className="pron-fb-char-hanzi">{c.hanzi}</span>
                <span
                  className={`pron-fb-char-score ${scoreClass(cScore)} ${isOmission ? 'pron-fb-char-score--omission' : ''}`}
                >
                  {isOmission ? '—' : cScore}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {hasPinyin && (
        <div className="pron-fb-pinyin">
          {pinyinSyllables.map((s, i) => (
            <span
              key={i}
              className={`pron-fb-pinyin-syl ${scoreClass(s.score)}`}
              title={`${s.pinyin} — ${s.score}/100`}
            >
              {s.pinyin}
            </span>
          ))}
        </div>
      )}

      {tips.length > 0 && (
        <div className="pron-fb-tips">
          <div className="pron-fb-tips-title">💡 {copy.tipsTitle}</div>
          <ul className="pron-fb-tips-list">
            {tips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PronunciationFeedback;
