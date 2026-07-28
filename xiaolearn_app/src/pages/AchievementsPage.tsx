/**
 * AchievementsPage.tsx — « Mes hauts-faits » (XiaoLearn)
 * ---------------------------------------------------------------------------
 * Cartes à collectionner sur le thème de la mythologie chinoise, inspirées
 * de la page achievements de Seonsaengnim :
 *   - icône gradient ✨ + titre énorme + sous-titre
 *   - barre de progression globale « X / N obtenues » + pourcentage
 *   - 3 stat-cards (obtenues / XP gagnés / meilleur palier)
 *   - recherche + filtres par catégorie (chips) + par état
 *   - grille de cartes portrait 2:3 par catégorie (verrouillées = grisées
 *     avec cadenas + progression ; débloquées = gradient de palier + grand
 *     hanzi calligraphique + date + XP)
 *
 * Données : useAchievements(metrics) — les métriques arrivent en prop
 * OPTIONNELLE `metrics` (à câbler dans App.tsx). En attendant, la page se
 * dégrade proprement : fallback interne sur useDailyActivity pour les
 * révisions cumulées + le streak, tout le reste affiché « À débloquer ».
 *
 * Styles : ../styles/achievements.css (scoped sous .ach-page).
 */

import { useMemo, useState } from 'react';
import '../styles/achievements.css';
import {
  ACHIEVEMENT_CATEGORY_ORDER,
  type AchievementCategory,
  type AchievementTier
} from '../data/achievements';
import {
  useAchievements,
  type AchievementMetrics,
  type EvaluatedAchievement
} from '../hooks/useAchievements';
import { useDailyActivity } from '../hooks/useDailyActivity';
import { useReviews } from '../hooks/useReviews';

type Language = 'fr' | 'en';
type StatusFilter = 'all' | 'unlocked' | 'inProgress' | 'locked';
type CategoryFilter = 'all' | AchievementCategory;

interface AchievementsPageProps {
  language?: Language;
  /** Métriques d'évaluation — optionnelles, câblées depuis App.tsx. */
  metrics?: AchievementMetrics;
}

// ============================================================================
//  COPIES
// ============================================================================

const COPY = {
  fr: {
    title: 'Mes hauts-faits',
    subtitle:
      'Toutes les cartes mythologiques que tu as collectionnées et celles qu’il te reste à découvrir',
    progressLabel: (x: number, n: number) => `${x} / ${n} obtenues`,
    statUnlocked: 'OBTENUES',
    statXp: 'XP GAGNÉS',
    statTier: 'MEILLEUR PALIER',
    statTierNone: '—',
    searchPh: 'Rechercher une carte…',
    catAll: 'Toutes',
    categories: {
      reviews: 'Révisions',
      lessons: 'Leçons',
      streak: 'Série',
      writing: 'Écriture',
      special: 'Spéciaux'
    } as Record<AchievementCategory, string>,
    statusAll: 'Tous',
    statusUnlocked: 'Obtenus',
    statusInProgress: 'En cours',
    statusLocked: 'À débloquer',
    tiers: {
      common: 'Commun',
      rare: 'Rare',
      epic: 'Épique',
      legendary: 'Légendaire'
    } as Record<AchievementTier, string>,
    unlockedOn: 'Obtenue le',
    hiddenName: '???',
    noResults: 'Aucune carte ne correspond à ta recherche.',
    cardsCount: (n: number) => `${n} carte${n > 1 ? 's' : ''}`
  },
  en: {
    title: 'My achievements',
    subtitle:
      'Every mythological card you have collected and the ones still waiting to be discovered',
    progressLabel: (x: number, n: number) => `${x} / ${n} unlocked`,
    statUnlocked: 'UNLOCKED',
    statXp: 'XP EARNED',
    statTier: 'BEST TIER',
    statTierNone: '—',
    searchPh: 'Search for a card…',
    catAll: 'All',
    categories: {
      reviews: 'Reviews',
      lessons: 'Lessons',
      streak: 'Streak',
      writing: 'Writing',
      special: 'Special'
    } as Record<AchievementCategory, string>,
    statusAll: 'All',
    statusUnlocked: 'Unlocked',
    statusInProgress: 'In progress',
    statusLocked: 'To unlock',
    tiers: {
      common: 'Common',
      rare: 'Rare',
      epic: 'Epic',
      legendary: 'Legendary'
    } as Record<AchievementTier, string>,
    unlockedOn: 'Unlocked on',
    hiddenName: '???',
    noResults: 'No card matches your search.',
    cardsCount: (n: number) => `${n} card${n > 1 ? 's' : ''}`
  }
};

// ============================================================================
//  COMPOSANT
// ============================================================================

export default function AchievementsPage({
  language = 'fr',
  metrics
}: AchievementsPageProps) {
  const t = COPY[language] ?? COPY.fr;

  // Fallback interne : révisions cumulées + streak depuis useDailyActivity
  // (hook autonome, localStorage + Firestore). Les props App.tsx, quand
  // elles seront câblées, PRIMENT sur ce fallback.
  const dailyActivity = useDailyActivity();
  // `hasReview` est résolu ICI et pas dans App.tsx : useReviews() fait un
  // getDocs de tous les avis, coût acceptable seulement quand la page est
  // montée (visitée), pas au mount de l'app entière.
  const { myReview } = useReviews();
  const mergedMetrics = useMemo<AchievementMetrics>(
    () => ({
      ...metrics,
      totalCardsReviewed:
        metrics?.totalCardsReviewed ?? dailyActivity.totals.totalCards,
      currentStreak: metrics?.currentStreak ?? dailyActivity.currentStreak,
      hasReview: metrics?.hasReview ?? myReview !== null
    }),
    [
      metrics,
      dailyActivity.totals.totalCards,
      dailyActivity.currentStreak,
      myReview
    ]
  );

  const {
    achievements,
    unlockedCount,
    totalCount,
    totalXpEarned,
    bestTier
  } = useAchievements(mergedMetrics);

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const percent =
    totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0;

  // -- Filtrage --------------------------------------------------------------

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return achievements.filter((a) => {
      if (categoryFilter !== 'all' && a.category !== categoryFilter) return false;
      if (statusFilter !== 'all' && a.status !== statusFilter) return false;
      if (q) {
        const name = language === 'fr' ? a.nameFr : a.nameEn;
        const desc = language === 'fr' ? a.descFr : a.descEn;
        const haystack = `${name} ${desc} ${a.emblem}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [achievements, categoryFilter, statusFilter, search, language]);

  const sections = useMemo(
    () =>
      ACHIEVEMENT_CATEGORY_ORDER.map((cat) => ({
        category: cat,
        items: filtered.filter((a) => a.category === cat)
      })).filter((s) => s.items.length > 0),
    [filtered]
  );

  // -- Rendus ----------------------------------------------------------------

  const formatDate = (iso: string): string => {
    try {
      return new Date(iso).toLocaleDateString(
        language === 'fr' ? 'fr-FR' : 'en-US',
        { day: 'numeric', month: 'short', year: 'numeric' }
      );
    } catch {
      return iso.slice(0, 10);
    }
  };

  const renderCard = (a: EvaluatedAchievement) => {
    const isUnlocked = a.status === 'unlocked';
    const name = language === 'fr' ? a.nameFr : a.nameEn;
    const desc = language === 'fr' ? a.descFr : a.descEn;
    return (
      <article
        key={a.id}
        className={`ach-card ach-tier-${a.tier}${isUnlocked ? ' is-unlocked' : ' is-locked'}`}
        aria-label={name}
      >
        <div className="ach-card-frame">
          <div className="ach-card-corner ach-corner-tl" aria-hidden="true" />
          <div className="ach-card-corner ach-corner-tr" aria-hidden="true" />
          <div className="ach-card-corner ach-corner-bl" aria-hidden="true" />
          <div className="ach-card-corner ach-corner-br" aria-hidden="true" />

          <div className="ach-card-tier">{t.tiers[a.tier]}</div>

          <div className="ach-card-emblem-zone">
            <span className="ach-card-emblem" aria-hidden="true">
              {a.emblem}
            </span>
            {!isUnlocked && (
              <span className="ach-card-lock" aria-hidden="true">
                🔒
              </span>
            )}
          </div>

          <div className="ach-card-name">{isUnlocked ? name : t.hiddenName}</div>
          <div className="ach-card-desc">{desc}</div>

          {isUnlocked ? (
            <div className="ach-card-footer">
              {a.unlockedAt && (
                <span className="ach-card-date">
                  {t.unlockedOn} {formatDate(a.unlockedAt)}
                </span>
              )}
              <span className="ach-card-xp">+{a.xpReward} XP</span>
            </div>
          ) : (
            <div className="ach-card-footer ach-card-footer-locked">
              <div className="ach-card-progress-bar">
                <div
                  className="ach-card-progress-fill"
                  style={{ width: `${Math.round(a.progressRatio * 100)}%` }}
                />
              </div>
              <span className="ach-card-progress-label">
                {a.progress}/{a.threshold}
              </span>
            </div>
          )}
        </div>
      </article>
    );
  };

  const categoryChips: CategoryFilter[] = [
    'all',
    ...ACHIEVEMENT_CATEGORY_ORDER
  ];
  const statusChips: { id: StatusFilter; label: string }[] = [
    { id: 'all', label: t.statusAll },
    { id: 'unlocked', label: t.statusUnlocked },
    { id: 'inProgress', label: t.statusInProgress },
    { id: 'locked', label: t.statusLocked }
  ];

  return (
    <div className="ach-page">
      {/* ---------------------------------------------------------------- */}
      {/* Header                                                           */}
      {/* ---------------------------------------------------------------- */}
      <header className="ach-header">
        <div className="ach-hero-icon" aria-hidden="true">
          ✨
        </div>
        <h1 className="ach-title">{t.title}</h1>
        <p className="ach-subtitle">{t.subtitle}</p>
      </header>

      {/* Progression globale */}
      <section className="ach-global-progress" aria-label={t.progressLabel(unlockedCount, totalCount)}>
        <div className="ach-global-progress-top">
          <span className="ach-global-progress-label">
            {t.progressLabel(unlockedCount, totalCount)}
          </span>
          <span className="ach-global-progress-pct">{percent}%</span>
        </div>
        <div className="ach-global-progress-bar">
          <div
            className="ach-global-progress-fill"
            style={{ width: `${percent}%` }}
          />
        </div>
      </section>

      {/* Stat-cards */}
      <section className="ach-stats">
        <div className="ach-stat-card">
          <span className="ach-stat-icon" aria-hidden="true">🏆</span>
          <span className="ach-stat-value">{unlockedCount}</span>
          <span className="ach-stat-label">{t.statUnlocked}</span>
        </div>
        <div className="ach-stat-card">
          <span className="ach-stat-icon" aria-hidden="true">✨</span>
          <span className="ach-stat-value">+{totalXpEarned}</span>
          <span className="ach-stat-label">{t.statXp}</span>
        </div>
        <div className="ach-stat-card">
          <span className="ach-stat-icon" aria-hidden="true">👑</span>
          <span className={`ach-stat-value${bestTier ? ` ach-stat-tier-${bestTier}` : ''}`}>
            {bestTier ? t.tiers[bestTier] : t.statTierNone}
          </span>
          <span className="ach-stat-label">{t.statTier}</span>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Recherche + filtres                                              */}
      {/* ---------------------------------------------------------------- */}
      <section className="ach-toolbar">
        <div className="ach-search">
          <span className="ach-search-icon" aria-hidden="true">🔍</span>
          <input
            type="search"
            className="ach-search-input"
            placeholder={t.searchPh}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="ach-chip-row" role="group" aria-label="Categories">
          {categoryChips.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`ach-chip${categoryFilter === cat ? ' is-active' : ''}`}
              onClick={() => setCategoryFilter(cat)}
            >
              {cat === 'all' ? t.catAll : t.categories[cat]}
            </button>
          ))}
        </div>
        <div className="ach-chip-row ach-chip-row-status" role="group" aria-label="Status">
          {statusChips.map((s) => (
            <button
              key={s.id}
              type="button"
              className={`ach-chip ach-chip-status${statusFilter === s.id ? ' is-active' : ''}`}
              onClick={() => setStatusFilter(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Sections par catégorie                                           */}
      {/* ---------------------------------------------------------------- */}
      {sections.length === 0 ? (
        <p className="ach-no-results">{t.noResults}</p>
      ) : (
        sections.map((section) => (
          <section key={section.category} className="ach-section">
            <div className="ach-section-header">
              <h2 className="ach-section-title">
                {t.categories[section.category]}
              </h2>
              <span className="ach-section-count">
                {t.cardsCount(section.items.length)}
              </span>
            </div>
            <div className="ach-grid">{section.items.map(renderCard)}</div>
          </section>
        ))
      )}
    </div>
  );
}
