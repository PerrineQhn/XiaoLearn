/**
 * XpBonusToast — feedback visible quand un gain d'XP inclut un bonus de série
 * ---------------------------------------------------------------------------
 * Écoute l'événement `xiaolearn:xpAwarded` dispatché par useDashboardState.awardXp
 * (uniquement quand multiplier > 1 OU daily > 0 OU milestone). Affiche une
 * petite carte flottante en bas à droite avec la décomposition :
 *
 *   ⚡ Bonus série (3j)
 *   +10 XP (base)
 *   ×1.1 → +11 XP
 *   +3 XP daily
 *   Total : +14 XP
 *
 * Disparaît automatiquement après 3.5s.
 *
 * À monter UNE SEULE FOIS au plus haut niveau de l'app (App.tsx ou layout).
 */

import { useEffect, useState } from 'react';

interface XpAwardedDetail {
  base: number;
  scaled: number;
  multiplier: number;
  multiplierBonusPct: number;
  daily: number;
  milestoneXp: number;
  total: number;
  streakDays: number;
}

export interface XpBonusToastProps {
  language?: 'fr' | 'en';
}

const COPY = {
  fr: {
    title: 'Bonus de série',
    daySingular: 'jour',
    dayPlural: 'jours',
    base: 'Base',
    multiplier: 'Multiplicateur',
    daily: 'Daily fidélité',
    milestone: 'Palier',
    total: 'Total',
    xp: 'XP'
  },
  en: {
    title: 'Streak bonus',
    daySingular: 'day',
    dayPlural: 'days',
    base: 'Base',
    multiplier: 'Multiplier',
    daily: 'Daily loyalty',
    milestone: 'Milestone',
    total: 'Total',
    xp: 'XP'
  }
} as const;

export const XpBonusToast = ({ language = 'fr' }: XpBonusToastProps) => {
  const [detail, setDetail] = useState<XpAwardedDetail | null>(null);
  const copy = COPY[language];

  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<XpAwardedDetail>;
      if (!ce.detail) return;
      setDetail(ce.detail);
      // Auto-dismiss après 3.5s
      const timer = setTimeout(() => setDetail(null), 3500);
      return () => clearTimeout(timer);
    };
    window.addEventListener('xiaolearn:xpAwarded', handler);
    return () => window.removeEventListener('xiaolearn:xpAwarded', handler);
  }, []);

  if (!detail) return null;

  const dayLabel = detail.streakDays > 1 ? copy.dayPlural : copy.daySingular;
  const multiplierLine = detail.multiplier > 1;
  const dailyLine = detail.daily > 0;
  const milestoneLine = detail.milestoneXp > 0;

  return (
    <div className="xp-bonus-toast" role="status" aria-live="polite">
      <div className="xp-bonus-toast-head">
        <span className="xp-bonus-toast-icon" aria-hidden>⚡</span>
        <span className="xp-bonus-toast-title">{copy.title}</span>
        <span className="xp-bonus-toast-streak">
          {detail.streakDays} {dayLabel}
        </span>
      </div>
      <ul className="xp-bonus-toast-list">
        <li>
          <span>{copy.base}</span>
          <strong>+{detail.base} {copy.xp}</strong>
        </li>
        {multiplierLine && (
          <li className="xp-bonus-toast-mult">
            <span>{copy.multiplier} ×{detail.multiplier.toFixed(2)}</span>
            <strong>+{detail.scaled - detail.base} {copy.xp}</strong>
          </li>
        )}
        {dailyLine && (
          <li>
            <span>{copy.daily}</span>
            <strong>+{detail.daily} {copy.xp}</strong>
          </li>
        )}
        {milestoneLine && (
          <li className="xp-bonus-toast-milestone">
            <span>{copy.milestone}</span>
            <strong>+{detail.milestoneXp} {copy.xp}</strong>
          </li>
        )}
        <li className="xp-bonus-toast-total">
          <span>{copy.total}</span>
          <strong>+{detail.total} {copy.xp}</strong>
        </li>
      </ul>
    </div>
  );
};

export default XpBonusToast;
