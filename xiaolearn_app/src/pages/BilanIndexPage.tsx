/**
 * BilanIndexPage — Sélection du niveau à bilaner
 * -----------------------------------------------
 * Écran d'index listant les 10 niveaux CECR avec leur statut de bilan.
 *
 * Objectif : rendre les bilans accessibles directement depuis la sidebar
 * (entrée "Bilan"), sans avoir à passer par la bannière de LessonPathsPage.
 *
 * Statuts affichés :
 *   - locked    : niveau non débloqué (bilan inaccessible)
 *   - pristine  : débloqué, jamais tenté
 *   - tried     : débloqué, tenté mais pas encore à 80%
 *   - passed    : validé au moins une fois (≥ 80%)
 *   - legacy    : parcours antérieur reconnu
 *
 * Le style réutilise les classes `.lvb-*` de level-bilan.css pour rester
 * cohérent avec LevelBilanPage et la bannière.
 */
import { useMemo } from 'react';
import type { Language } from '../i18n';
import type { CecrLevelSlug } from '../types/simulator';
import type { BilanCompletionEntry } from '../types/bilan';
import { cecrBilansList } from '../data/cecr-bilans';
import { cecrLevels } from '../data/cecr-course';
import '../styles/level-bilan.css';

export interface BilanIndexPageProps {
  language: Language;
  /** Map level → entry (depuis useLevelBilans().bilans). */
  entries: Partial<Record<CecrLevelSlug, BilanCompletionEntry>>;
  /** Niveaux actuellement débloqués (a1 toujours, puis progression). */
  unlockedLevels: Set<CecrLevelSlug>;
  /** Callback : l'utilisateur clique "Passer le bilan" sur un niveau. */
  onSelectLevel: (level: CecrLevelSlug) => void;
}

const COPY = {
  fr: {
    kicker: 'Bilans',
    title: 'Valide tes niveaux',
    lead:
      'Chaque bilan est un quiz de 10 questions qui valide ton niveau CECR. Atteins 80 % pour le valider et gagne +60 XP (une seule fois).',
    badgePristine: 'Jamais tenté',
    badgeTried: 'Tenté',
    badgePassed: 'Validé',
    badgeLegacy: 'Reconnu',
    badgeLocked: 'Verrouillé',
    bestLabel: 'Meilleur score',
    attemptsOne: 'tentative',
    attemptsMany: 'tentatives',
    ctaStart: 'Passer le bilan',
    ctaRetry: 'Améliorer mon score',
    ctaLocked: 'Niveau verrouillé',
    lockedHint: 'Valide le bilan du niveau précédent pour le débloquer.',
    hskLabel: 'HSK'
  },
  en: {
    kicker: 'Level checks',
    title: 'Validate your levels',
    lead:
      'Each check is a 10-question quiz that validates your CECR level. Reach 80% to pass and earn +60 XP (one-time).',
    badgePristine: 'Not tried',
    badgeTried: 'Tried',
    badgePassed: 'Passed',
    badgeLegacy: 'Recognized',
    badgeLocked: 'Locked',
    bestLabel: 'Best score',
    attemptsOne: 'attempt',
    attemptsMany: 'attempts',
    ctaStart: 'Take the check',
    ctaRetry: 'Improve my score',
    ctaLocked: 'Level locked',
    lockedHint: 'Pass the previous level check to unlock this one.',
    hskLabel: 'HSK'
  }
};

type RowState = 'locked' | 'pristine' | 'tried' | 'passed' | 'legacy';

const resolveState = (
  unlocked: boolean,
  entry: BilanCompletionEntry | undefined
): RowState => {
  if (!unlocked && !entry?.passed) return 'locked';
  if (entry?.legacyRecognized) return 'legacy';
  if (entry?.passed) return 'passed';
  if ((entry?.attempts ?? 0) > 0) return 'tried';
  return 'pristine';
};

export default function BilanIndexPage({
  language,
  entries,
  unlockedLevels,
  onSelectLevel
}: BilanIndexPageProps) {
  const copy = COPY[language];

  // Compose la liste — on s'appuie sur cecrLevels pour l'ordre pédagogique
  // + cecrBilansList comme source des textes du bilan.
  const rows = useMemo(() => {
    return cecrLevels.map((meta) => {
      const slug = meta.level as CecrLevelSlug;
      const bilan = cecrBilansList.find((b) => b.level === slug);
      const entry = entries[slug];
      const unlocked = unlockedLevels.has(slug);
      const state = resolveState(unlocked, entry);
      return {
        slug,
        order: meta.order,
        label: language === 'fr' ? meta.name : meta.nameEn,
        description: language === 'fr' ? meta.description : meta.descriptionEn,
        bilanTitle: bilan
          ? (language === 'fr' ? bilan.titleFr : bilan.titleEn)
          : null,
        emoji: meta.icon,
        hsk: meta.hskRange,
        entry,
        state
      };
    });
  }, [entries, unlockedLevels, language]);

  // Stats globales (petit résumé en haut de page).
  const stats = useMemo(() => {
    let passed = 0;
    let tried = 0;
    let totalBest = 0;
    let bestCount = 0;
    for (const row of rows) {
      if (row.state === 'passed' || row.state === 'legacy') passed += 1;
      if (row.state === 'tried') tried += 1;
      if (row.entry && row.entry.attempts > 0) {
        totalBest += row.entry.bestScore;
        bestCount += 1;
      }
    }
    const avg = bestCount > 0 ? Math.round((totalBest / bestCount) * 10) / 10 : 0;
    return { passed, tried, avg, total: rows.length };
  }, [rows]);

  return (
    <div className="lvb-page">
      <div className="lvb-wrap">
        {/* Hero ---------------------------------------------------------- */}
        <section className="lvb-card lvb-card--hero">
          <div className="lvb-head-main" style={{ marginBottom: 12 }}>
            <span className="lvb-head-kicker">{copy.kicker}</span>
            <h1 className="lvb-head-title">
              <span className="lvb-head-emoji" aria-hidden="true">
                🎯
              </span>
              {copy.title}
            </h1>
          </div>
          <p className="lvb-card-lead">{copy.lead}</p>

          {/* Mini résumé chiffré */}
          <div className="lvb-index-stats">
            <div className="lvb-index-stat">
              <span className="lvb-index-stat-value">
                {stats.passed}/{stats.total}
              </span>
              <span className="lvb-index-stat-label">
                {language === 'fr' ? 'Niveaux validés' : 'Levels passed'}
              </span>
            </div>
            <div className="lvb-index-stat">
              <span className="lvb-index-stat-value">{stats.tried}</span>
              <span className="lvb-index-stat-label">
                {language === 'fr' ? 'En cours' : 'In progress'}
              </span>
            </div>
            {stats.avg > 0 && (
              <div className="lvb-index-stat">
                <span className="lvb-index-stat-value">
                  {stats.avg.toFixed(1)}/10
                </span>
                <span className="lvb-index-stat-label">
                  {language === 'fr' ? 'Score moyen' : 'Average score'}
                </span>
              </div>
            )}
          </div>
        </section>

        {/* Liste des niveaux -------------------------------------------- */}
        <ul className="lvb-index-list">
          {rows.map((row) => {
            const entry = row.entry;
            const attempts = entry?.attempts ?? 0;
            const best = entry?.bestScore ?? 0;

            const badgeLabel =
              row.state === 'passed'
                ? copy.badgePassed
                : row.state === 'legacy'
                  ? copy.badgeLegacy
                  : row.state === 'locked'
                    ? copy.badgeLocked
                    : row.state === 'tried'
                      ? copy.badgeTried
                      : copy.badgePristine;

            const ctaLabel =
              row.state === 'locked'
                ? copy.ctaLocked
                : row.state === 'passed' || row.state === 'legacy' || row.state === 'tried'
                  ? copy.ctaRetry
                  : copy.ctaStart;

            const disabled = row.state === 'locked';

            return (
              <li
                key={row.slug}
                className={`lvb-index-row lvb-index-row--${row.state}`}
              >
                <div className="lvb-index-row-emoji" aria-hidden="true">
                  {row.emoji}
                </div>
                <div className="lvb-index-row-main">
                  <div className="lvb-index-row-title">
                    <strong>{row.label}</strong>
                    <span className="lvb-index-row-hsk">
                      {copy.hskLabel} {row.hsk}
                    </span>
                    <span
                      className={`lvb-index-badge lvb-index-badge--${row.state}`}
                    >
                      {badgeLabel}
                    </span>
                  </div>
                  <p className="lvb-index-row-desc">{row.description}</p>
                  {row.state === 'locked' ? (
                    <span className="lvb-index-row-meta">{copy.lockedHint}</span>
                  ) : attempts > 0 ? (
                    <span className="lvb-index-row-meta">
                      {copy.bestLabel}: {best}/10 · {attempts}{' '}
                      {attempts > 1 ? copy.attemptsMany : copy.attemptsOne}
                    </span>
                  ) : null}
                </div>
                <button
                  type="button"
                  className="lvb-index-cta"
                  onClick={() => onSelectLevel(row.slug)}
                  disabled={disabled}
                  aria-label={`${ctaLabel} — ${row.label}`}
                >
                  {ctaLabel}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
