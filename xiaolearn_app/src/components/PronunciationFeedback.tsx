/**
 * PronunciationFeedback.tsx — affichage riche d'un résultat Azure Pronunciation.
 * --------------------------------------------------------------------------
 * Utilisé par PronunciationCheck (vue lesson), PronunciationDrill et la
 * flashcard mode prononciation pour afficher de manière homogène :
 *   - Le score global (badge coloré)
 *   - Le score par caractère (chip coloré sous chaque hanzi)
 *   - Un bouton "détail" qui révèle phonème + ton sur clic
 *
 * Couleurs :
 *   ≥ 90 : or
 *   ≥ 70 : vert
 *   ≥ 50 : ambre
 *   < 50 : rouge
 *
 * Heuristique tonal pour le détail expandable :
 *   Azure renvoie les phonèmes au format "qing 3" (initiale+finale+ton).
 *   On parse pour séparer les sons des tons et afficher proprement.
 */

import { useMemo, useState } from 'react';
import type { AzurePronunciationResult } from '../services/pronunciationServiceAzure';
import './PronunciationFeedback.css';

export interface PronunciationFeedbackProps {
  result: AzurePronunciationResult;
  /** Hanzi de référence pour afficher les caractères s'ils manquent côté Azure. */
  referenceText?: string;
  language?: 'fr' | 'en';
  /** Taille compacte pour la vue lesson inline. */
  compact?: boolean;
  /** Affiche le détail expanded par défaut. */
  defaultExpanded?: boolean;
}

const COPY = {
  fr: {
    detail: 'Voir le détail',
    hideDetail: 'Masquer le détail',
    tone: 'ton',
    omission: 'pas prononcé',
    mispronunciation: 'mal prononcé',
    insertion: 'son en trop',
    excellent: 'Excellent',
    good: 'Bien',
    bof: 'Bof',
    redo: 'À retravailler',
    phonemeHint: 'Initiale + finale + ton'
  },
  en: {
    detail: 'Show details',
    hideDetail: 'Hide details',
    tone: 'tone',
    omission: 'not pronounced',
    mispronunciation: 'mispronounced',
    insertion: 'extra sound',
    excellent: 'Excellent',
    good: 'Good',
    bof: 'Meh',
    redo: 'Try again',
    phonemeHint: 'Onset + rime + tone'
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

/** Parse "qing 3" → { sound: "qing", tone: 3 }. Ton 5 = ton neutre. */
function parsePhoneme(raw: string): { sound: string; tone: number | null } {
  const trimmed = raw.trim();
  const m = trimmed.match(/^(.+?)\s+(\d+)$/);
  if (!m) return { sound: trimmed, tone: null };
  const tone = parseInt(m[2], 10);
  return { sound: m[1], tone: isNaN(tone) ? null : tone };
}

/**
 * Reconstruit une vue "par caractère" en associant chaque hanzi de la
 * référence à son score Azure. Azure renvoie les Syllables avec leur
 * grapheme — on les match dans l'ordre.
 *
 * Cas tordus gérés :
 *   - Azure groupe parfois plusieurs hanzi dans une syllable (ex: 谢谢 →
 *     Grapheme="谢谢", AccuracyScore unique). On éclate alors le score
 *     uniformément sur les caractères.
 *   - ErrorType=Omission → score 0 pour tous les caractères, badge spécial.
 */
function buildPerCharScores(
  result: AzurePronunciationResult,
  referenceText: string
): Array<{ hanzi: string; score: number; errorType: string }> {
  const chars = Array.from(referenceText);
  if (chars.length === 0) return [];

  // Aplatit tous les syllables de tous les words en une liste de (grapheme, score)
  const flat: Array<{ grapheme: string; score: number; errorType: string }> = [];
  for (const w of result.words) {
    if (w.syllables.length === 0) {
      // Pas de syllable → on prend le word entier comme un bloc
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

  // Pour chaque caractère du texte de référence, trouve son score
  const out: Array<{ hanzi: string; score: number; errorType: string }> = [];
  let cursor = 0;
  for (const ch of chars) {
    let assigned: { score: number; errorType: string } | null = null;
    while (cursor < flat.length) {
      const f = flat[cursor];
      const fChars = Array.from(f.grapheme);
      if (fChars.includes(ch)) {
        assigned = { score: f.score, errorType: f.errorType };
        // Si la syllable contenait UN seul char, on avance
        if (fChars.length === 1) cursor++;
        // Sinon (ex: "谢谢" en bloc), on laisse cursor pour matcher l'autre
        // hanzi suivant, mais on l'incrémente après si épuisé
        else {
          // Avance le cursor s'il y a autant de hanzi mappés que le grapheme contient
          const remainingInRef = chars.slice(out.length).filter((c) => fChars.includes(c)).length;
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
  compact = false,
  defaultExpanded = false
}: PronunciationFeedbackProps) => {
  const copy = COPY[language];
  const [expanded, setExpanded] = useState(defaultExpanded);
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

  // Détail par phonème pour le mode expandable.
  // Azure renvoie p.ex. ["x ie 4", "x ie 4"] pour "谢谢" — on les aligne
  // avec les caractères mais comme Azure ne donne pas le mapping char→
  // phonèmes explicite, on regroupe par word.
  const phonemesByWord = useMemo(
    () =>
      result.words.map((w) => ({
        word: w.word,
        errorType: w.errorType,
        phonemes: w.phonemes.map((p) => ({
          ...parsePhoneme(p.phoneme),
          score: p.accuracyScore,
          raw: p.phoneme
        }))
      })),
    [result]
  );

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

      {phonemesByWord.some((w) => w.phonemes.length > 0) && (
        <button
          type="button"
          className="pron-fb-toggle"
          onClick={(e) => {
            e.stopPropagation();
            setExpanded((x) => !x);
          }}
          aria-expanded={expanded}
        >
          {expanded ? `▲ ${copy.hideDetail}` : `▼ ${copy.detail}`}
        </button>
      )}

      {expanded && (
        <div className="pron-fb-detail">
          <div className="pron-fb-detail-hint">{copy.phonemeHint}</div>
          {phonemesByWord.map((w, wi) => (
            <div key={wi} className="pron-fb-detail-word">
              {w.errorType !== 'None' && (
                <span className="pron-fb-detail-error">
                  {w.word} :{' '}
                  {w.errorType === 'Omission'
                    ? copy.omission
                    : w.errorType === 'Mispronunciation'
                      ? copy.mispronunciation
                      : w.errorType === 'Insertion'
                        ? copy.insertion
                        : w.errorType}
                </span>
              )}
              <div className="pron-fb-detail-phonemes">
                {w.phonemes.map((p, pi) => (
                  <span
                    key={pi}
                    className={`pron-fb-detail-phoneme ${scoreClass(Math.round(p.score))}`}
                    title={`${p.raw} — ${Math.round(p.score)}/100`}
                  >
                    <span className="pron-fb-detail-phoneme-sound">{p.sound}</span>
                    {p.tone !== null && (
                      <span className="pron-fb-detail-phoneme-tone">
                        {p.tone === 5 ? '·' : p.tone}
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PronunciationFeedback;
