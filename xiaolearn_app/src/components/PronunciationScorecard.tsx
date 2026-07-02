/**
 * PronunciationScorecard.tsx — Phase 4 IA.
 *
 * Affiche le résultat structuré d'une analyse de prononciation : score
 * global (anneau coloré), syllabes une par une (couleur selon score),
 * top issues, et conseil pédagogique.
 */
import type { PronunciationResult } from '../services/pronunciation';
import './PronunciationScorecard.css';

interface PronunciationScorecardProps {
  result: PronunciationResult;
  language?: 'fr' | 'en';
}

const COPY = {
  fr: {
    notIntelligible: 'Audio non reconnu — réessaie en parlant plus distinctement.',
    issuesLabel: 'Points à travailler',
    adviceLabel: 'Conseil',
    syllablesLabel: 'Détail par syllabe'
  },
  en: {
    notIntelligible: 'Audio not recognized — try again more clearly.',
    issuesLabel: 'Things to work on',
    adviceLabel: 'Advice',
    syllablesLabel: 'Per-syllable detail'
  }
};

/** Renvoie une couleur HEX selon un score 0-100. */
function scoreToColor(score: number): string {
  if (score >= 85) return '#15803d'; // vert
  if (score >= 65) return '#65a30d'; // vert-jaune
  if (score >= 45) return '#b45309'; // orange
  return '#b91c1c'; // rouge
}

export default function PronunciationScorecard({
  result,
  language = 'fr'
}: PronunciationScorecardProps) {
  const t = COPY[language];

  if (!result.intelligible) {
    return (
      <div className="ps-card">
        <div className="ps-not-intelligible">
          {result.advice || t.notIntelligible}
        </div>
      </div>
    );
  }

  const globalColor = scoreToColor(result.globalScore);

  return (
    <div className="ps-card">
      <div className="ps-header">
        <div
          className="ps-score-ring"
          style={{
            background: `conic-gradient(${globalColor} ${result.globalScore * 3.6}deg, #f3f4f6 0)`
          }}
        >
          <div className="ps-score-inner">
            <div className="ps-score-value" style={{ color: globalColor }}>
              {result.globalScore}
            </div>
            <div className="ps-score-label">/ 100</div>
          </div>
        </div>
      </div>

      {result.syllables.length > 0 && (
        <div className="ps-section">
          <h4 className="ps-section-title">{t.syllablesLabel}</h4>
          <div className="ps-syllables">
            {result.syllables.map((s, i) => {
              const color = scoreToColor(s.score);
              const ok = s.issue === 'OK' || s.issue === 'ok';
              return (
                <div
                  key={i}
                  className={`ps-syllable ${ok ? 'ps-syllable--ok' : 'ps-syllable--ko'}`}
                  style={{ borderColor: color }}
                  title={`${s.expectedPinyin}: ${s.score}/100 — ${s.issue}`}
                >
                  <div className="ps-syllable-hanzi" lang="zh-CN">
                    {s.hanzi}
                  </div>
                  <div className="ps-syllable-pinyin">{s.expectedPinyin}</div>
                  <div className="ps-syllable-score" style={{ color }}>
                    {s.score}
                  </div>
                  {!ok && <div className="ps-syllable-issue">{s.issue}</div>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {result.topIssues.length > 0 && (
        <div className="ps-section">
          <h4 className="ps-section-title">{t.issuesLabel}</h4>
          <ul className="ps-issues">
            {result.topIssues.map((issue, i) => (
              <li key={i}>{issue}</li>
            ))}
          </ul>
        </div>
      )}

      {result.advice && (
        <div className="ps-advice">
          <span className="ps-advice-label">💡 {t.adviceLabel}</span>
          <p>{result.advice}</p>
        </div>
      )}
    </div>
  );
}
