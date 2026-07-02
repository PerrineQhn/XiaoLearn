/**
 * WritingCorrectorPage.tsx — Phase 1B IA.
 * L'utilisateur tape une phrase chinoise, Gemini renvoie une analyse
 * structurée (correction, pinyin, traduction, erreurs détaillées,
 * alternative naturelle, remarque pédagogique).
 *
 * Le service `correctorService.correctChinese` gère l'appel API + le parsing
 * JSON. Cette page se concentre sur l'UX : input, états (loading/error/result),
 * historique en mémoire de la session pour relire les corrections récentes.
 */
import { useCallback, useState } from 'react';
import type { Language } from '../i18n';
import {
  correctChinese,
  type CorrectionResult
} from '../services/correctorService';
import './WritingCorrectorPage.css';

interface WritingCorrectorPageProps {
  language: Language;
  /** Niveau CECR de l'utilisateur, utilisé pour calibrer l'explication. */
  userLevel?: string;
}

const COPY = {
  fr: {
    title: 'Correcteur d\'écriture IA',
    subtitle:
      'Tape une phrase en chinois. L\'IA la corrige, explique chaque erreur et propose une formulation plus naturelle.',
    placeholder: 'Écris ta phrase en chinois ici… (ex : 我昨天去了北京)',
    correctBtn: 'Corriger',
    correcting: 'Correction en cours…',
    again: 'Corriger une autre phrase',
    correct: 'Phrase correcte ! ✓',
    correctedLabel: 'Version corrigée',
    pinyinLabel: 'Pinyin',
    translationLabel: 'Traduction',
    errorsLabel: 'Erreurs détectées',
    alternativeLabel: 'Formulation plus naturelle',
    noteLabel: 'Remarque',
    historyLabel: 'Corrections récentes',
    errorEmpty: 'Saisis une phrase avant de corriger.',
    errorApi:
      'Une erreur est survenue. Vérifie ta connexion ou réessaie dans un instant.'
  },
  en: {
    title: 'AI Writing Corrector',
    subtitle:
      'Type a sentence in Chinese. The AI corrects it, explains each mistake and suggests a more natural phrasing.',
    placeholder: 'Write your Chinese sentence here… (e.g. 我昨天去了北京)',
    correctBtn: 'Correct',
    correcting: 'Correcting…',
    again: 'Check another sentence',
    correct: 'Sentence is correct! ✓',
    correctedLabel: 'Corrected version',
    pinyinLabel: 'Pinyin',
    translationLabel: 'Translation',
    errorsLabel: 'Mistakes found',
    alternativeLabel: 'More natural phrasing',
    noteLabel: 'Note',
    historyLabel: 'Recent corrections',
    errorEmpty: 'Type a sentence first.',
    errorApi: 'Something went wrong. Check your connection or try again.'
  }
} as const;

export default function WritingCorrectorPage({
  language,
  userLevel = 'B1'
}: WritingCorrectorPageProps) {
  const t = COPY[language];
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CorrectionResult | null>(null);
  const [history, setHistory] = useState<CorrectionResult[]>([]);

  const handleCorrect = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed) {
      setError(t.errorEmpty);
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await correctChinese(trimmed, userLevel);
      setResult(res);
      setHistory((h) => [res, ...h].slice(0, 5));
    } catch (e) {
      console.error(e);
      setError(t.errorApi);
    } finally {
      setLoading(false);
    }
  }, [input, t, userLevel]);

  const handleReset = useCallback(() => {
    setResult(null);
    setError(null);
    setInput('');
  }, []);

  return (
    <div className="writing-corrector-page">
      <header className="wc-header">
        <h1>{t.title}</h1>
        <p className="wc-subtitle">{t.subtitle}</p>
      </header>

      {!result && (
        <section className="wc-input-card">
          <textarea
            className="wc-textarea"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.placeholder}
            rows={4}
            lang="zh-CN"
            disabled={loading}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                handleCorrect();
              }
            }}
          />
          {error && <div className="wc-error">{error}</div>}
          <div className="wc-input-actions">
            <button
              type="button"
              className="wc-btn wc-btn--primary"
              onClick={handleCorrect}
              disabled={loading || !input.trim()}
            >
              {loading ? t.correcting : t.correctBtn}
            </button>
          </div>
        </section>
      )}

      {result && (
        <CorrectionCard
          result={result}
          copy={t}
          onAgain={handleReset}
        />
      )}

      {history.length > 0 && (
        <section className="wc-history">
          <h2 className="wc-history-title">{t.historyLabel}</h2>
          <ul className="wc-history-list">
            {history.map((h, i) => (
              <li key={`${h.input}-${i}`} className="wc-history-item">
                <span className="wc-history-input" lang="zh-CN">{h.input}</span>
                <span className="wc-history-arrow" aria-hidden="true">→</span>
                <span className="wc-history-corrected" lang="zh-CN">
                  {h.corrected}
                </span>
                {h.isCorrect && (
                  <span className="wc-history-tag wc-history-tag--ok">✓</span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

/**
 * Affichage détaillé d'une correction. Présente la phrase originale,
 * la version corrigée (en surbrillance si elle diffère), les erreurs
 * une par une, l'alternative naturelle, et la remarque pédagogique.
 */
function CorrectionCard({
  result,
  copy,
  onAgain
}: {
  result: CorrectionResult;
  copy: (typeof COPY)[Language];
  onAgain: () => void;
}) {
  const showAlternative =
    result.alternative &&
    result.alternative.trim() &&
    result.alternative.trim() !== result.corrected.trim();

  return (
    <section className="wc-result-card">
      <header className={`wc-result-header ${result.isCorrect ? 'wc-result-header--ok' : ''}`}>
        {result.isCorrect ? (
          <span className="wc-result-status wc-result-status--ok">
            {copy.correct}
          </span>
        ) : (
          <span className="wc-result-status wc-result-status--ko">
            ✎ {copy.correctedLabel}
          </span>
        )}
      </header>

      <div className="wc-result-original" lang="zh-CN">
        <span className="wc-result-label">→</span>
        <span className="wc-result-text wc-result-text--strike">
          {result.input}
        </span>
      </div>

      <div className="wc-result-corrected">
        <div className="wc-result-corrected-row" lang="zh-CN">
          <span className="wc-result-label">✓</span>
          <span className="wc-result-text wc-result-text--corrected">
            {result.corrected}
          </span>
        </div>
        {result.pinyin && (
          <div className="wc-result-pinyin">{result.pinyin}</div>
        )}
        {result.translation && (
          <div className="wc-result-translation">{result.translation}</div>
        )}
      </div>

      {result.errors.length > 0 && (
        <div className="wc-result-section">
          <h3 className="wc-section-title">{copy.errorsLabel}</h3>
          <ul className="wc-errors-list">
            {result.errors.map((err, i) => (
              <li key={i} className="wc-error-item">
                <div className="wc-error-diff">
                  <span className="wc-error-from" lang="zh-CN">
                    {err.original}
                  </span>
                  <span className="wc-error-arrow" aria-hidden="true">→</span>
                  <span className="wc-error-to" lang="zh-CN">
                    {err.fixed}
                  </span>
                </div>
                <p className="wc-error-explanation">{err.explanation}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showAlternative && (
        <div className="wc-result-section">
          <h3 className="wc-section-title">{copy.alternativeLabel}</h3>
          <p className="wc-alternative" lang="zh-CN">
            {result.alternative}
          </p>
        </div>
      )}

      {result.note && (
        <div className="wc-result-note">
          <span className="wc-result-note-label">💡 {copy.noteLabel}</span>
          <p>{result.note}</p>
        </div>
      )}

      <div className="wc-result-actions">
        <button
          type="button"
          className="wc-btn wc-btn--ghost"
          onClick={onAgain}
        >
          {copy.again}
        </button>
      </div>
    </section>
  );
}
