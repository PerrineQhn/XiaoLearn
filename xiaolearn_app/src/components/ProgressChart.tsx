import { useMemo } from 'react';
import type { Language } from '../i18n';

interface ProgressChartProps {
  totals: Record<string, number>;
  language: Language;
}

const HSK_LEVELS = [
  { id: 'hsk1', label: 'HSK 1', color: '#22c55e', targetWords: 500 },
  { id: 'hsk2', label: 'HSK 2', color: '#3b82f6', targetWords: 1000 },
  { id: 'hsk3', label: 'HSK 3', color: '#a855f7', targetWords: 1500 },
  { id: 'hsk4', label: 'HSK 4', color: '#f59e0b', targetWords: 2000 },
  { id: 'hsk5', label: 'HSK 5', color: '#ef4444', targetWords: 2500 },
  { id: 'hsk6', label: 'HSK 6', color: '#ec4899', targetWords: 3000 },
  { id: 'hsk7', label: 'HSK 7', color: '#8b5cf6', targetWords: 5000 }
];

export default function ProgressChart({ totals, language }: ProgressChartProps) {
  const totalLearned = useMemo(() => {
    return Object.values(totals).reduce((sum, count) => sum + count, 0);
  }, [totals]);

  const progressByLevel = useMemo(() => {
    return HSK_LEVELS.map((level) => {
      const learned = totals[level.id] || 0;
      const percentage = Math.min(100, (learned / level.targetWords) * 100);
      return { ...level, learned, percentage };
    });
  }, [totals]);

  return (
    <div className="progress-chart">
      <div className="progress-header">
        <h3>{language === 'fr' ? 'Votre progression' : 'Your progress'}</h3>
        <div className="total-words">
          <span className="total-number">{totalLearned}</span>
          <span className="total-label">
            {language === 'fr' ? 'mots appris' : 'words learned'}
          </span>
        </div>
      </div>

      <div className="levels-progress">
        {progressByLevel.map((level) => (
          <div key={level.id} className="level-row">
            <div className="level-info">
              <span className="level-label">{level.label}</span>
              <span className="level-count">
                {level.learned} / {level.targetWords}
              </span>
            </div>
            <div className="progress-bar-container">
              <div
                className="progress-bar-fill"
                style={{
                  width: `${level.percentage}%`,
                  backgroundColor: level.color
                }}
              >
                {level.percentage > 10 && (
                  <span className="progress-percentage">{Math.round(level.percentage)}%</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
