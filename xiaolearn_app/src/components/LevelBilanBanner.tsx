/**
 * LevelBilanBanner.tsx — Bannière d'accès au Bilan de fin de niveau
 * -------------------------------------------------------------------
 * Affichée en haut de LessonPathsPage dès que le niveau courant est
 * "essentiellement complété" (par défaut ≥ 80% des leçons terminées).
 *
 * Trois états visuels :
 *   - available : ≥ seuil mais non validé → fond or/rouge, CTA "Passer le bilan"
 *   - passed    : validé au moins une fois → fond vert apaisé, CTA "Réessayer"
 *   - legacy    : reconnaissance parcours antérieur → mention discrète
 */
import type { Language } from '../i18n';
import type { BilanCompletionEntry } from '../types/bilan';
import type { CecrLevelSlug } from '../types/simulator';

export interface LevelBilanBannerProps {
  level: CecrLevelSlug;
  levelLabel: string;
  emoji?: string;
  /** % de leçons complétées dans ce niveau (0-100). */
  completionPct: number;
  /** Seuil d'affichage (par défaut 80). */
  unlockThreshold?: number;
  entry?: BilanCompletionEntry;
  language: Language;
  onStart: (level: CecrLevelSlug) => void;
}

const COPY = {
  fr: {
    eyebrow: 'Bilan de fin de niveau',
    ctaStart: 'Passer le bilan',
    ctaRetry: 'Améliorer mon score',
    subAvailable: 'Tu as assez travaillé ce niveau : valide-le en 10 questions.',
    subPassed: 'Niveau validé. Tu peux retenter pour améliorer ton score.',
    subLegacy: 'Parcours antérieur reconnu. Passe le bilan pour gagner les XP.',
    bestLabel: 'Meilleur score',
    attemptsLabel: 'tentatives',
    attemptLabel: 'tentative'
  },
  en: {
    eyebrow: 'End-of-level check',
    ctaStart: 'Take the check',
    ctaRetry: 'Improve my score',
    subAvailable: "You've covered enough of this level — validate it in 10 questions.",
    subPassed: 'Level passed. Retry to improve your score.',
    subLegacy: 'Prior progress recognized. Take the check to earn the XP.',
    bestLabel: 'Best score',
    attemptsLabel: 'attempts',
    attemptLabel: 'attempt'
  }
};

export default function LevelBilanBanner({
  level,
  levelLabel,
  emoji,
  completionPct,
  unlockThreshold = 80,
  entry,
  language,
  onStart
}: LevelBilanBannerProps) {
  const copy = COPY[language];

  const eligible = completionPct >= unlockThreshold;
  const passed = entry?.passed ?? false;
  const legacy = entry?.legacyRecognized ?? false;
  const best = entry?.bestScore ?? 0;
  const attempts = entry?.attempts ?? 0;

  if (!eligible && !passed) {
    // Pas encore débloqué — on affiche une version "progression vers bilan".
    return (
      <div className="lvb-banner-strip lvb-banner-strip--locked">
        <div className="lvb-banner-strip-main">
          <span className="lvb-banner-strip-emoji" aria-hidden="true">
            {emoji ?? '🏆'}
          </span>
          <div className="lvb-banner-strip-text">
            <span className="lvb-banner-strip-eyebrow">
              {copy.eyebrow} · {levelLabel}
            </span>
            <span className="lvb-banner-strip-sub">
              {language === 'fr'
                ? `Se débloque à ${unlockThreshold}% — actuellement ${completionPct}%`
                : `Unlocks at ${unlockThreshold}% — currently ${completionPct}%`}
            </span>
          </div>
        </div>
        <div className="lvb-banner-strip-progress">
          <div style={{ width: `${Math.min(100, completionPct)}%` }} />
        </div>
      </div>
    );
  }

  const state = legacy ? 'legacy' : passed ? 'passed' : 'available';
  const sub =
    state === 'legacy'
      ? copy.subLegacy
      : state === 'passed'
        ? copy.subPassed
        : copy.subAvailable;

  return (
    <div className={`lvb-banner-strip lvb-banner-strip--${state}`}>
      <div className="lvb-banner-strip-main">
        <span className="lvb-banner-strip-emoji" aria-hidden="true">
          {emoji ?? '🏆'}
        </span>
        <div className="lvb-banner-strip-text">
          <span className="lvb-banner-strip-eyebrow">
            {copy.eyebrow} · {levelLabel}
          </span>
          <span className="lvb-banner-strip-sub">{sub}</span>
          {(passed || attempts > 0) && (
            <span className="lvb-banner-strip-meta">
              {copy.bestLabel}: {best}/10 ·{' '}
              {attempts}{' '}
              {attempts > 1 ? copy.attemptsLabel : copy.attemptLabel}
            </span>
          )}
        </div>
      </div>
      <button
        type="button"
        className="lvb-banner-strip-cta"
        onClick={() => onStart(level)}
      >
        {passed ? copy.ctaRetry : copy.ctaStart}
      </button>
    </div>
  );
}
