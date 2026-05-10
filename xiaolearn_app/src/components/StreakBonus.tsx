/**
 * StreakBonus.tsx — Composants UI du système de bonus XP de série (task #46).
 *
 * Trois éléments exportés :
 *   1. <StreakMultiplierBadge /> — Petit pill ⚡ +10% XP, à poser inline à côté
 *      de la flamme de série (sidebar / header / card dashboard). S'efface si
 *      le multiplicateur est à 1.0.
 *   2. <StreakBonusPanel /> — Panneau dashboard complet : multiplicateur actif,
 *      prochain palier + barre de progression, liste des paliers franchis.
 *   3. <StreakMilestoneToast /> — Toast flottant global qui apparaît à chaque
 *      palier débloqué, se ferme automatiquement après 5s.
 *
 * Toutes les valeurs (multiplicateur, paliers, bonus daily) sont lues depuis
 * `useDashboardState().bonus` et `.streak.current`. Aucun état local — c'est
 * une pure vue.
 */

import { useEffect, useMemo } from 'react';
import { STREAK_MILESTONES, type StreakBonusState } from '../hooks/useDashboardState';

type Language = 'fr' | 'en';

// ---------------------------------------------------------------------------
// Badge ⚡ +X%
// ---------------------------------------------------------------------------

export const StreakMultiplierBadge = ({
  bonus,
  language,
  size = 'sm'
}: {
  bonus: StreakBonusState;
  language: Language;
  size?: 'sm' | 'md';
}) => {
  if (bonus.multiplierBonusPct <= 0) return null;
  const label =
    language === 'fr'
      ? `+${bonus.multiplierBonusPct}% XP`
      : `+${bonus.multiplierBonusPct}% XP`;
  const title =
    language === 'fr'
      ? `Bonus de série actif : ×${bonus.multiplier.toFixed(2)} sur tous les XP`
      : `Active streak bonus: ×${bonus.multiplier.toFixed(2)} on all XP`;
  return (
    <span
      className={`streak-mult-badge streak-mult-badge--${size}`}
      title={title}
      aria-label={title}
    >
      <span className="streak-mult-badge-spark" aria-hidden>
        ⚡
      </span>
      {label}
    </span>
  );
};

// ---------------------------------------------------------------------------
// Panneau dashboard "Bonus XP de série"
// ---------------------------------------------------------------------------

export const StreakBonusPanel = ({
  bonus,
  streakDays,
  language
}: {
  bonus: StreakBonusState;
  streakDays: number;
  language: Language;
}) => {
  const copy =
    language === 'fr'
      ? {
          title: 'Bonus XP de série',
          tagline: 'Allez, on garde la flamme allumée.',
          multiplier: 'Multiplicateur',
          noMultiplier: 'Pas encore actif (7 jours requis)',
          nextLabel: 'Prochain palier',
          noMoreMilestones: 'Tous les paliers sont débloqués 🏆',
          daysLeftSingular: 'jour restant',
          daysLeftPlural: 'jours restants',
          claimedTitle: 'Paliers débloqués',
          noneClaimed: 'Aucun palier encore débloqué',
          xpSuffix: 'XP'
        }
      : {
          title: 'Streak XP bonus',
          tagline: "Keep the flame alive.",
          multiplier: 'Multiplier',
          noMultiplier: 'Not active yet (7-day streak needed)',
          nextLabel: 'Next milestone',
          noMoreMilestones: 'All milestones unlocked 🏆',
          daysLeftSingular: 'day to go',
          daysLeftPlural: 'days to go',
          claimedTitle: 'Milestones claimed',
          noneClaimed: 'No milestone claimed yet',
          xpSuffix: 'XP'
        };

  // Barre de progression : on borne à l'intervalle [prev milestone, next milestone]
  // pour que la barre remplisse bien l'écart vers le prochain objectif.
  const progressPct = useMemo(() => {
    if (!bonus.nextMilestone) return 100;
    const next = bonus.nextMilestone.days;
    const prev =
      [...STREAK_MILESTONES]
        .map((m) => m.days)
        .filter((d) => d < next && bonus.milestonesClaimed.includes(d))
        .pop() ?? 0;
    const span = next - prev;
    const done = streakDays - prev;
    if (span <= 0) return 100;
    return Math.max(0, Math.min(100, Math.round((done / span) * 100)));
  }, [bonus.nextMilestone, bonus.milestonesClaimed, streakDays]);

  const daysLeftLabel =
    bonus.nextMilestone &&
    (bonus.nextMilestone.daysRemaining > 1
      ? copy.daysLeftPlural
      : copy.daysLeftSingular);

  return (
    <section className="card streak-bonus-panel">
      <header className="streak-bonus-head">
        <div className="streak-bonus-head-title">
          <span className="streak-bonus-head-icon" aria-hidden>
            ⚡
          </span>
          <h3>{copy.title}</h3>
        </div>
        <p className="streak-bonus-tagline">{copy.tagline}</p>
      </header>

      <div className="streak-bonus-mult">
        <div className="streak-bonus-mult-label">{copy.multiplier}</div>
        {bonus.multiplierBonusPct > 0 ? (
          <div className="streak-bonus-mult-value">
            <strong>×{bonus.multiplier.toFixed(2)}</strong>
            <span className="streak-bonus-mult-pct">
              (+{bonus.multiplierBonusPct}%)
            </span>
          </div>
        ) : (
          <div className="streak-bonus-mult-off">{copy.noMultiplier}</div>
        )}
      </div>

      {bonus.nextMilestone ? (
        <div className="streak-bonus-next">
          <div className="streak-bonus-next-row">
            <span className="streak-bonus-next-label">{copy.nextLabel}</span>
            <span className="streak-bonus-next-reward">
              🏆 {bonus.nextMilestone.days}j · +{bonus.nextMilestone.reward}{' '}
              {copy.xpSuffix}
            </span>
          </div>
          <div className="streak-bonus-bar">
            <div
              className="streak-bonus-bar-fill"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <div className="streak-bonus-next-meta">
            {streakDays} / {bonus.nextMilestone.days} ·{' '}
            {bonus.nextMilestone.daysRemaining} {daysLeftLabel}
          </div>
        </div>
      ) : (
        <div className="streak-bonus-all-done">{copy.noMoreMilestones}</div>
      )}

      <div className="streak-bonus-claimed">
        <div className="streak-bonus-claimed-label">{copy.claimedTitle}</div>
        {bonus.milestonesClaimed.length === 0 ? (
          <div className="streak-bonus-claimed-empty">{copy.noneClaimed}</div>
        ) : (
          <ul className="streak-bonus-claimed-list">
            {STREAK_MILESTONES.filter((m) =>
              bonus.milestonesClaimed.includes(m.days)
            ).map((m) => (
              <li key={m.days} className="streak-bonus-claimed-chip">
                <span className="streak-bonus-claimed-days">{m.days}j</span>
                <span className="streak-bonus-claimed-reward">
                  +{m.reward} XP
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

// ---------------------------------------------------------------------------
// Toast global palier
// ---------------------------------------------------------------------------

export const StreakMilestoneToast = ({
  bonus,
  language
}: {
  bonus: StreakBonusState;
  language: Language;
}) => {
  const award = bonus.lastMilestoneAward;
  const clear = bonus.clearMilestoneAward;

  // Auto-fermeture après 5s. On ne dépend QUE de `award` (pas du `bonus` entier)
  // pour éviter que d'autres re-renders (XP/activity updates) resettent le
  // timer indéfiniment. `clear` est stable (useCallback avec deps vides côté
  // hook), il est donc sûr de l'omettre des deps.
  useEffect(() => {
    if (!award) return;
    const timer = window.setTimeout(() => {
      clear();
    }, 5000);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [award]);

  if (!award) return null;

  const copy =
    language === 'fr'
      ? {
          title: 'Palier de série débloqué !',
          bodyPrefix: 'Tu viens d\'atteindre',
          bodySuffix: 'jours consécutifs',
          xpLine: 'de bonus unique',
          dismiss: 'Fermer'
        }
      : {
          title: 'Streak milestone unlocked!',
          bodyPrefix: "You've reached",
          bodySuffix: 'consecutive days',
          xpLine: 'one-time bonus',
          dismiss: 'Dismiss'
        };

  return (
    <div className="streak-milestone-toast" role="status" aria-live="polite">
      <div className="streak-milestone-toast-trophy" aria-hidden>
        🏆
      </div>
      <div className="streak-milestone-toast-body">
        <div className="streak-milestone-toast-title">{copy.title}</div>
        <div className="streak-milestone-toast-sub">
          {copy.bodyPrefix} <strong>{award.days}</strong> {copy.bodySuffix}
        </div>
        <div className="streak-milestone-toast-xp">
          <span aria-hidden>⭐</span> +{award.xp} XP {copy.xpLine}
        </div>
      </div>
      <button
        type="button"
        className="streak-milestone-toast-close"
        onClick={bonus.clearMilestoneAward}
        aria-label={copy.dismiss}
      >
        ✕
      </button>
    </div>
  );
};

export default StreakBonusPanel;
