/**
 * ReportPageV2.tsx — bilan mensuel XiaoLearn
 * -------------------------------------------
 * Page bilan façon "rapport du mois" : mots appris, streak, XP, temps passé,
 * mots fragiles à reviser, objectif du mois suivant. Inspirée des bilans de
 * fin de période que Seonsaengnim propose à ses abonnés premium.
 *
 * Données reçues via props — le parent les assemble depuis
 * `useLessonProgress`, `useDashboardState`, `useFlashcardSRS`. Aucun hook
 * spécifique ici, pour rester facile à tester en isolation.
 *
 * Styles : ./../styles/report-v2.css (scoped sous .report-v2)
 */

import { useMemo } from 'react';
import '../styles/report-v2.css';

// ============================================================================
//  TYPES
// ============================================================================

export type ReportV2Language = 'fr' | 'en';

export interface ReportV2FragileItem {
  id: string;
  hanzi: string;
  pinyin: string;
  translation: string;
  translationEn?: string;
  /** Nombre de fois où la carte a été ratée. */
  failCount: number;
}

export interface ReportV2LevelProgress {
  level: 'hsk1' | 'hsk2' | 'hsk3' | 'hsk4' | 'hsk5' | 'hsk6' | 'hsk7';
  learnedThisPeriod: number;
  target: number;
  totalLearned: number;
}

export interface ReportV2Period {
  /** ex: "Avril 2026" / "Last 30 days". */
  label: string;
  labelEn?: string;
  /** Bornes inclusives (ISO). */
  startsAt?: string;
  endsAt?: string;
}

export interface ReportV2Metrics {
  /** Mots appris sur la période. */
  wordsLearned: number;
  /** Mots maîtrisés (basculés en "mastered") sur la période. */
  wordsMastered: number;
  /** XP gagnés sur la période. */
  xpGained: number;
  /** Niveau atteint en fin de période. */
  levelAtEnd: number;
  /** Jours actifs dans la période. */
  activeDays: number;
  /** Streak maximal atteint pendant la période. */
  longestStreak: number;
  /** Streak actuel (au moment du bilan). */
  currentStreak: number;
  /** Minutes d'étude estimées (optionnel). */
  minutesStudied?: number;
  /** Leçons terminées (count). */
  lessonsCompleted: number;
  /** Flashcards revues. */
  cardsReviewed: number;
  /** % d'exactitude moyen (0-100). */
  averageAccuracy: number;
}

export interface ReportV2Highlights {
  /** Titre court style "Tu as tenu 12 jours d'affilée". */
  headline: string;
  headlineEn?: string;
  /** 1 à 3 faits saillants. */
  bullets: string[];
  bulletsEn?: string[];
}

export interface ReportV2Goal {
  /** Texte simple, ex : "Terminer HSK 2 avant fin mai". */
  text: string;
  textEn?: string;
  /** Valeur cible et courante. */
  current: number;
  target: number;
  unit?: string; // "mots", "jours", "XP"…
}

export interface ReportPageV2Props {
  period: ReportV2Period;
  metrics: ReportV2Metrics;
  highlights?: ReportV2Highlights;
  /** Progression par niveau HSK. */
  byLevel: ReportV2LevelProgress[];
  /** Heatmap — couples [dateISO, count]. Pour un bilan on prend 28-35 jours. */
  activityHeatmap?: Array<{ date: string; count: number }>;
  /** Mots à retravailler. */
  fragileWords?: ReportV2FragileItem[];
  /** Objectif en cours et prochain objectif suggéré. */
  currentGoal?: ReportV2Goal;
  suggestedGoal?: ReportV2Goal;
  language?: ReportV2Language;
  userDisplayName?: string;
  onBack?: () => void;
  onReviewFragile?: (itemIds: string[]) => void;
  onAcceptSuggestedGoal?: (goal: ReportV2Goal) => void;
  onExport?: () => void;
}

// ============================================================================
//  COPIES
// ============================================================================

const COPY = {
  fr: {
    title: 'Ton bilan',
    subtitle: 'Un coup d\'œil honnête sur la période — ce qui marche, ce qui coince.',
    back: '← Retour',
    export: '📥 Exporter',
    periodLabel: 'Période',
    highlights: 'Faits marquants',
    keyNumbers: 'Chiffres clés',
    wordsLearned: 'Mots appris',
    wordsMastered: 'Mots maîtrisés',
    xp: 'XP gagnés',
    lessons: 'Leçons',
    cards: 'Cartes revues',
    activeDays: 'Jours actifs',
    longestStreak: 'Série la plus longue',
    currentStreak: 'Série actuelle',
    minutes: 'Minutes d\'étude',
    accuracy: 'Exactitude moyenne',
    levelAtEnd: 'Niveau atteint',
    byLevelTitle: 'Progression par niveau HSK',
    learnedThisPeriod: 'cette période',
    totalLearned: 'total',
    heatmapTitle: 'Ton rythme',
    fragileTitle: 'Mots fragiles à retravailler',
    fragileEmpty: 'Rien à signaler — tes cartes sont bien gérées 🎯',
    failCount: 'ratés',
    reviewFragile: '⚡ Réviser ces mots',
    goalsTitle: 'Tes objectifs',
    currentGoal: 'Objectif en cours',
    suggestedGoal: 'Prochain objectif proposé',
    accept: 'Adopter cet objectif',
    days: 'jours',
    words: 'mots',
    noGoal: 'Pas encore d\'objectif — donne-toi un cap pour la période suivante.'
  },
  en: {
    title: 'Your report',
    subtitle: 'An honest look at the period — what worked, what did not.',
    back: '← Back',
    export: '📥 Export',
    periodLabel: 'Period',
    highlights: 'Highlights',
    keyNumbers: 'Key numbers',
    wordsLearned: 'Words learned',
    wordsMastered: 'Words mastered',
    xp: 'XP earned',
    lessons: 'Lessons',
    cards: 'Cards reviewed',
    activeDays: 'Active days',
    longestStreak: 'Longest streak',
    currentStreak: 'Current streak',
    minutes: 'Minutes studied',
    accuracy: 'Average accuracy',
    levelAtEnd: 'Level reached',
    byLevelTitle: 'Progress per HSK level',
    learnedThisPeriod: 'this period',
    totalLearned: 'total',
    heatmapTitle: 'Your rhythm',
    fragileTitle: 'Fragile words to revisit',
    fragileEmpty: 'All clear — your cards are in good shape 🎯',
    failCount: 'misses',
    reviewFragile: '⚡ Review these words',
    goalsTitle: 'Your goals',
    currentGoal: 'Current goal',
    suggestedGoal: 'Suggested next goal',
    accept: 'Adopt this goal',
    days: 'days',
    words: 'words',
    noGoal: 'No goal yet — set one for the next period.'
  }
} as const;

type CopyKey = keyof (typeof COPY)['fr'];
const t = (lang: ReportV2Language, k: CopyKey) => COPY[lang][k] ?? COPY.fr[k];

const HSK_COLORS: Record<string, string> = {
  hsk1: '#10b981',
  hsk2: '#22c55e',
  hsk3: '#3b82f6',
  hsk4: '#6366f1',
  hsk5: '#a855f7',
  hsk6: '#ec4899',
  hsk7: '#ef4444'
};

// ============================================================================
//  SOUS-COMPOSANTS
// ============================================================================

const KpiCard = ({
  label,
  value,
  subLabel,
  accent
}: {
  label: string;
  value: string | number;
  subLabel?: string;
  accent?: string;
}) => (
  <div className="rp2-kpi" style={accent ? { borderColor: accent } : undefined}>
    <div className="rp2-kpi-value" style={accent ? { color: accent } : undefined}>
      {value}
    </div>
    <div className="rp2-kpi-label">{label}</div>
    {subLabel && <div className="rp2-kpi-sub">{subLabel}</div>}
  </div>
);

const LevelRow = ({
  lp,
  language
}: {
  lp: ReportV2LevelProgress;
  language: ReportV2Language;
}) => {
  const pct = lp.target === 0 ? 0 : Math.min(100, Math.round((lp.totalLearned / lp.target) * 100));
  return (
    <div className="rp2-level">
      <div className="rp2-level-head">
        <span
          className="rp2-level-badge"
          style={{ background: HSK_COLORS[lp.level] ?? '#c6302c' }}
        >
          {lp.level.toUpperCase()}
        </span>
        <span className="rp2-level-count">
          {lp.totalLearned} / {lp.target}
        </span>
        {lp.learnedThisPeriod > 0 && (
          <span className="rp2-level-delta">
            +{lp.learnedThisPeriod} {t(language, 'learnedThisPeriod')}
          </span>
        )}
      </div>
      <div className="rp2-level-track">
        <div
          className="rp2-level-fill"
          style={{
            width: `${pct}%`,
            background: HSK_COLORS[lp.level] ?? '#c6302c'
          }}
        />
      </div>
    </div>
  );
};

/** Mini heatmap 5 semaines (alignée à droite sur "aujourd'hui"). */
const Heatmap = ({ data }: { data: Array<{ date: string; count: number }> }) => {
  // Normalise en max 35 jours, ajoute des jours manquants en 0.
  const last35 = useMemo(() => {
    const byDate = new Map(data.map((d) => [d.date, d.count]));
    const now = new Date();
    const out: Array<{ date: string; count: number }> = [];
    for (let i = 34; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const iso = d.toISOString().slice(0, 10);
      out.push({ date: iso, count: byDate.get(iso) ?? 0 });
    }
    return out;
  }, [data]);

  const max = Math.max(1, ...last35.map((d) => d.count));

  return (
    <div className="rp2-heatmap">
      {last35.map((d) => {
        const intensity = d.count === 0 ? 0 : Math.min(4, Math.ceil((d.count / max) * 4));
        return (
          <span
            key={d.date}
            className="rp2-heatmap-cell"
            data-intensity={intensity}
            title={`${d.date} · ${d.count}`}
          />
        );
      })}
    </div>
  );
};

const GoalCard = ({
  goal,
  title,
  language,
  onAccept
}: {
  goal: ReportV2Goal;
  title: string;
  language: ReportV2Language;
  onAccept?: () => void;
}) => {
  const pct = goal.target === 0 ? 0 : Math.min(100, Math.round((goal.current / goal.target) * 100));
  const text = language === 'en' && goal.textEn ? goal.textEn : goal.text;
  return (
    <div className="rp2-goal">
      <div className="rp2-goal-title">{title}</div>
      <div className="rp2-goal-text">{text}</div>
      <div className="rp2-goal-stats">
        <span>
          {goal.current} / {goal.target} {goal.unit ?? ''}
        </span>
        <span className="rp2-goal-pct">{pct}%</span>
      </div>
      <div className="rp2-goal-track">
        <div className="rp2-goal-fill" style={{ width: `${pct}%` }} />
      </div>
      {onAccept && (
        <button className="rp2-btn rp2-btn--primary" onClick={onAccept}>
          {t(language, 'accept')}
        </button>
      )}
    </div>
  );
};

// ============================================================================
//  COMPOSANT PRINCIPAL
// ============================================================================

const ReportPageV2 = (props: ReportPageV2Props) => {
  const {
    period,
    metrics,
    highlights,
    byLevel,
    activityHeatmap = [],
    fragileWords = [],
    currentGoal,
    suggestedGoal,
    language = 'fr',
    userDisplayName,
    onBack,
    onReviewFragile,
    onAcceptSuggestedGoal,
    onExport
  } = props;

  const periodLabel =
    language === 'en' && period.labelEn ? period.labelEn : period.label;
  const headline = highlights
    ? language === 'en' && highlights.headlineEn
      ? highlights.headlineEn
      : highlights.headline
    : '';
  const bullets = highlights
    ? language === 'en' && highlights.bulletsEn
      ? highlights.bulletsEn
      : highlights.bullets
    : [];

  return (
    <div className="report-v2">
      {/* Topbar */}
      <div className="rp2-topbar">
        {onBack && (
          <button className="rp2-btn rp2-btn--link" onClick={onBack}>
            {t(language, 'back')}
          </button>
        )}
        {onExport && (
          <button className="rp2-btn rp2-btn--ghost" onClick={onExport}>
            {t(language, 'export')}
          </button>
        )}
      </div>

      {/* Hero */}
      <header className="rp2-hero">
        <div className="rp2-hero-period">
          {t(language, 'periodLabel')} · <strong>{periodLabel}</strong>
        </div>
        <h1>
          {t(language, 'title')}
          {userDisplayName ? `, ${userDisplayName}` : ''}
        </h1>
        <p>{t(language, 'subtitle')}</p>
      </header>

      {/* Highlights */}
      {highlights && (
        <section className="rp2-highlights">
          <div className="rp2-highlights-headline">{headline}</div>
          {bullets.length > 0 && (
            <ul>
              {bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          )}
        </section>
      )}

      {/* KPIs */}
      <section className="rp2-section">
        <h2>{t(language, 'keyNumbers')}</h2>
        <div className="rp2-kpis">
          <KpiCard label={t(language, 'wordsLearned')} value={metrics.wordsLearned} accent="#c6302c" />
          <KpiCard label={t(language, 'wordsMastered')} value={metrics.wordsMastered} accent="#16a34a" />
          <KpiCard label={t(language, 'xp')} value={metrics.xpGained} accent="#d4a537" />
          <KpiCard
            label={t(language, 'levelAtEnd')}
            value={`Niv. ${metrics.levelAtEnd}`}
            accent="#3b82f6"
          />
          <KpiCard label={t(language, 'lessons')} value={metrics.lessonsCompleted} />
          <KpiCard label={t(language, 'cards')} value={metrics.cardsReviewed} />
          <KpiCard label={t(language, 'activeDays')} value={metrics.activeDays} />
          <KpiCard
            label={t(language, 'longestStreak')}
            value={`${metrics.longestStreak} ${t(language, 'days')}`}
          />
          <KpiCard
            label={t(language, 'currentStreak')}
            value={`${metrics.currentStreak} ${t(language, 'days')}`}
          />
          {metrics.minutesStudied !== undefined && (
            <KpiCard
              label={t(language, 'minutes')}
              value={metrics.minutesStudied}
              subLabel="min"
            />
          )}
          <KpiCard
            label={t(language, 'accuracy')}
            value={`${Math.round(metrics.averageAccuracy)}%`}
          />
        </div>
      </section>

      {/* Heatmap */}
      {activityHeatmap.length > 0 && (
        <section className="rp2-section">
          <h2>{t(language, 'heatmapTitle')}</h2>
          <Heatmap data={activityHeatmap} />
        </section>
      )}

      {/* Par niveau HSK */}
      <section className="rp2-section">
        <h2>{t(language, 'byLevelTitle')}</h2>
        <div className="rp2-levels">
          {byLevel.map((lp) => (
            <LevelRow key={lp.level} lp={lp} language={language} />
          ))}
        </div>
      </section>

      {/* Mots fragiles */}
      <section className="rp2-section">
        <div className="rp2-section-head">
          <h2>{t(language, 'fragileTitle')}</h2>
          {fragileWords.length > 0 && onReviewFragile && (
            <button
              className="rp2-btn rp2-btn--primary"
              onClick={() => onReviewFragile(fragileWords.map((w) => w.id))}
            >
              {t(language, 'reviewFragile')}
            </button>
          )}
        </div>
        {fragileWords.length === 0 ? (
          <div className="rp2-empty">{t(language, 'fragileEmpty')}</div>
        ) : (
          <div className="rp2-fragile">
            {fragileWords.slice(0, 10).map((w) => (
              <div key={w.id} className="rp2-fragile-row">
                <div className="rp2-fragile-main">
                  <div className="rp2-fragile-hanzi">{w.hanzi}</div>
                  <div className="rp2-fragile-pinyin">{w.pinyin}</div>
                  <div className="rp2-fragile-translation">
                    {language === 'en' && w.translationEn ? w.translationEn : w.translation}
                  </div>
                </div>
                <div className="rp2-fragile-fails">
                  × {w.failCount} {t(language, 'failCount')}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Objectifs */}
      <section className="rp2-section">
        <h2>{t(language, 'goalsTitle')}</h2>
        <div className="rp2-goals-grid">
          {currentGoal ? (
            <GoalCard goal={currentGoal} title={t(language, 'currentGoal')} language={language} />
          ) : (
            <div className="rp2-empty">{t(language, 'noGoal')}</div>
          )}
          {suggestedGoal && (
            <GoalCard
              goal={suggestedGoal}
              title={t(language, 'suggestedGoal')}
              language={language}
              onAccept={() => onAcceptSuggestedGoal?.(suggestedGoal)}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default ReportPageV2;
