import { useMemo, useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { FlashcardProgress } from '../hooks/useFlashcardSRS';
import type { Language } from '../i18n';

interface LearningProgressChartProps {
  language: Language;
}

interface DayData {
  date: string;
  wordsLearned: number;
  displayDate: string;
}

const STORAGE_KEY = 'flashcard_progress';

const loadProgressMap = (): Map<string, FlashcardProgress> => {
  if (typeof window === 'undefined') {
    return new Map();
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return new Map();
  }

  try {
    const data = JSON.parse(stored);
    const entries = Object.entries(data).reduce<[string, FlashcardProgress][]>((acc, [key, value]) => {
      if (value && typeof value === 'object') {
        acc.push([key, value as FlashcardProgress]);
      }
      return acc;
    }, []);

    return new Map(entries);
  } catch (error) {
    console.error('Failed to parse flashcard progress:', error);
    return new Map();
  }
};

const LearningProgressChart = ({ language }: LearningProgressChartProps) => {
  const [progressMap, setProgressMap] = useState<Map<string, FlashcardProgress>>(() => loadProgressMap());

  // Reload progress map when component mounts or when storage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setProgressMap(loadProgressMap());
    };

    // Listen for storage changes from other tabs/windows
    window.addEventListener('storage', handleStorageChange);

    // Also check periodically for changes in same tab
    const intervalId = setInterval(handleStorageChange, 5000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(intervalId);
    };
  }, []);
  const chartData = useMemo(() => {
    // Get the last 14 days
    const days: DayData[] = [];
    const today = new Date();

    for (let i = 13; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      // Format display date (MM/DD)
      const displayDate = `${date.getMonth() + 1}/${date.getDate()}`;

      days.push({
        date: dateStr,
        wordsLearned: 0,
        displayDate
      });
    }

    // Count words learned per day (first time reviewed)
    const wordsPerDay = new Map<string, number>();

    progressMap.forEach((progress) => {
      const reviewDate = progress.lastReviewed;
      // Count this word as learned on the first review date
      if (progress.reviewCount >= 1) {
        const count = wordsPerDay.get(reviewDate) || 0;
        wordsPerDay.set(reviewDate, count + 1);
      }
    });

    // Populate the chart data with actual counts
    days.forEach((day) => {
      const count = wordsPerDay.get(day.date) || 0;
      day.wordsLearned = count;
    });

    return days;
  }, [progressMap]);

  // Calculate total words learned in the period
  const totalWords = useMemo(() => {
    return chartData.reduce((sum, day) => sum + day.wordsLearned, 0);
  }, [chartData]);

  // Calculate average per day
  const averagePerDay = useMemo(() => {
    return (totalWords / 14).toFixed(1);
  }, [totalWords]);

  return (
    <section className="learning-progress-chart-section">
      <h2 className="section-title">
        {language === 'fr' ? 'ACTIVITÉ D\'APPRENTISSAGE' : 'LEARNING ACTIVITY'}
      </h2>

      <div className="chart-summary">
        <div className="chart-stat">
          <span className="chart-stat-value">{totalWords}</span>
          <span className="chart-stat-label">
            {language === 'fr' ? 'mots révisés (14 jours)' : 'words reviewed (14 days)'}
          </span>
        </div>
        <div className="chart-stat">
          <span className="chart-stat-value">{averagePerDay}</span>
          <span className="chart-stat-label">
            {language === 'fr' ? 'mots par jour en moyenne' : 'words per day on average'}
          </span>
        </div>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border-light)"
            />
            <XAxis
              dataKey="displayDate"
              tick={{ fontSize: 12, fill: 'var(--text-secondary)' }}
              stroke="var(--border-medium)"
            />
            <YAxis
              tick={{ fontSize: 12, fill: 'var(--text-secondary)' }}
              stroke="var(--border-medium)"
              allowDecimals={false}
            />
            <Tooltip
              formatter={(value) => [value, language === 'fr' ? 'mots' : 'words']}
              labelFormatter={(label) => language === 'fr' ? `Date: ${label}` : `Date: ${label}`}
              contentStyle={{
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-light)',
                borderRadius: '8px',
                padding: '8px 12px',
                color: 'var(--primary-red)'
              }}
              labelStyle={{
                color: 'var(--primary-red)'
              }}
              itemStyle={{
                color: 'var(--primary-red)'
              }}
            />
            <Bar
              dataKey="wordsLearned"
              fill="var(--primary-red)"
              radius={[4, 4, 0, 0]}
              name={language === 'fr' ? 'Mots révisés' : 'Words reviewed'}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="chart-description">
        {language === 'fr'
          ? 'Ce graphique montre le nombre de mots que vous avez révisés chaque jour au cours des deux dernières semaines. Une révision régulière est la clé d\'un apprentissage durable !'
          : 'This chart shows the number of words you\'ve reviewed each day over the past two weeks. Regular review is the key to lasting learning!'}
      </p>
    </section>
  );
};

export default LearningProgressChart;
