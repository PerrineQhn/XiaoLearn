import { useEffect, useState } from 'react';
import type { Language } from '../i18n';

interface StreakTrackerProps {
  language: Language;
}

export default function StreakTracker({ language }: StreakTrackerProps) {
  const [streak, setStreak] = useState(0);
  const [todayCompleted, setTodayCompleted] = useState(false);

  useEffect(() => {
    // Charger le streak depuis localStorage
    const savedStreak = localStorage.getItem('learningStreak');
    const lastVisit = localStorage.getItem('lastVisitDate');
    const today = new Date().toDateString();

    if (lastVisit === today) {
      setTodayCompleted(true);
    }

    if (savedStreak) {
      setStreak(parseInt(savedStreak, 10));
    }

    // Si c'est une nouvelle journée, incrémenter le streak
    if (lastVisit && lastVisit !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      if (lastVisit === yesterday.toDateString()) {
        // Streak continue
        const newStreak = (parseInt(savedStreak || '0', 10)) + 1;
        setStreak(newStreak);
        localStorage.setItem('learningStreak', newStreak.toString());
      } else {
        // Streak cassé
        setStreak(1);
        localStorage.setItem('learningStreak', '1');
      }
    }

    localStorage.setItem('lastVisitDate', today);
  }, []);

  const weekDays = language === 'fr'
    ? ['L', 'M', 'M', 'J', 'V', 'S', 'D']
    : ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className="streak-tracker">
      <div className="streak-flame">
        <span className="flame-icon">🔥</span>
        <div className="streak-info">
          <span className="streak-number">{streak}</span>
          <span className="streak-label">
            {language === 'fr' ? 'jours' : 'day streak'}
          </span>
        </div>
      </div>

      <div className="week-calendar">
        {weekDays.map((day, index) => (
          <div
            key={index}
            className={`day-circle ${index < streak % 7 ? 'completed' : ''} ${
              index === new Date().getDay() - 1 ? 'today' : ''
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {todayCompleted && (
        <div className="congrats-message">
          ✨ {language === 'fr' ? 'Objectif du jour atteint !' : 'Daily goal completed!'}
        </div>
      )}
    </div>
  );
}
