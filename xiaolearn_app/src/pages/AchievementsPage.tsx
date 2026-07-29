/**
 * AchievementsPage.tsx — « Mes hauts-faits » (XiaoLearn)
 * ---------------------------------------------------------------------------
 * Cartes à collectionner sur le thème de la mythologie chinoise, inspirées
 * de la page achievements de Seonsaengnim :
 *   - icône gradient ✨ + titre énorme + sous-titre
 *   - barre de progression globale « X / N obtenues » + pourcentage
 *   - 3 stat-cards (obtenues / XP gagnés / meilleur palier)
 *   - recherche + filtres par catégorie (chips) + par état
 *   - grille de cartes portrait 2:3 par catégorie. Chaque carte affiche sa
 *     VRAIE illustration (public/img/cards/<id>.jpg — assets mobiles).
 *     Verrouillée = grisée + assombrie + cadenas + progression ;
 *     débloquée = image pleine couleur + effets par rareté (voile holo,
 *     étincelles, balayage lumineux — paramètres repris du CardShimmer
 *     mobile, adaptés en CSS pur)
 *
 * Données : useAchievements(metrics) — les métriques arrivent en prop
 * OPTIONNELLE `metrics` (à câbler dans App.tsx). En attendant, la page se
 * dégrade proprement : fallback interne sur useDailyActivity pour les
 * révisions cumulées + le streak, tout le reste affiché « À débloquer ».
 *
 * Styles : ../styles/achievements.css (scoped sous .ach-page).
 */

import { useEffect, useMemo, useRef, useState } from 'react';
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

type Language = 'fr' | 'en';
type StatusFilter = 'all' | 'unlocked' | 'inProgress' | 'locked';
type CategoryFilter = 'all' | AchievementCategory;

interface AchievementsPageProps {
  language?: Language;
  /** Métriques d'évaluation — optionnelles, câblées depuis App.tsx. */
  metrics?: AchievementMetrics;
  /**
   * Navigation depuis le modal de détail (CTA « Faire une session de
   * révision »…) — optionnelle, câblée depuis App.tsx avec les ids du type
   * `View`. Absente → les CTA sont masqués.
   */
  onNavigate?: (view: string) => void;
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
      levels: 'Niveaux',
      lessons: 'Leçons',
      streak: 'Série',
      special: 'Spéciales'
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
    cardsCount: (n: number) => `${n} carte${n > 1 ? 's' : ''}`,
    // Modal de détail
    detailHowTo: 'COMMENT L’OBTENIR',
    detailReward: 'RÉCOMPENSE',
    detailClose: 'Fermer',
    detailZoom: 'Voir l’illustration en plein écran',
    ctaReviews: 'Faire une session de révision',
    ctaPath: 'Continuer le parcours',
    ctaStreak: 'Étudier aujourd’hui',
    ctaXp: 'Gagner de l’XP sur le parcours',
    ctaGames: 'Jouer aux mini-jeux',
    ctaReading: 'Lire un texte',
    ctaPronunciation: 'S’entraîner à la prononciation'
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
      levels: 'Level tests',
      lessons: 'Lessons',
      streak: 'Streak',
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
    cardsCount: (n: number) => `${n} card${n > 1 ? 's' : ''}`,
    // Detail modal
    detailHowTo: 'HOW TO GET IT',
    detailReward: 'REWARD',
    detailClose: 'Close',
    detailZoom: 'View the artwork full screen',
    ctaReviews: 'Do a review session',
    ctaPath: 'Continue the course',
    ctaStreak: 'Study today',
    ctaXp: 'Earn XP on the course',
    ctaGames: 'Play mini-games',
    ctaReading: 'Read a passage',
    ctaPronunciation: 'Practice pronunciation'
  }
};

type Copy = (typeof COPY)[Language];

// ============================================================================
//  CTA du modal — mapping catégorie (+ source pour les Spéciales) → vue App
// ============================================================================

interface DetailCta {
  /** Id de vue du type `View` d'App.tsx. */
  view: string;
  label: string;
}

/**
 * Action proposée sous une carte NON débloquée : emmène l'utilisateur là où
 * la condition se remplit (même logique que les catégories du mobile,
 * data/cards.ts — le web navigue au lieu de fermer simplement la fiche).
 */
const getDetailCta = (a: EvaluatedAchievement, t: Copy): DetailCta => {
  if (a.category === 'special') {
    switch (a.progressSource) {
      case 'gamesPlayed':
        return { view: 'games', label: t.ctaGames };
      case 'readingsRead':
        return { view: 'reading', label: t.ctaReading };
      case 'pronunciationBest':
        return { view: 'pronunciation-coach', label: t.ctaPronunciation };
      default:
        // totalXp (Pixiu, Dragon) : l'XP se gagne surtout sur le parcours
        return { view: 'cecr', label: t.ctaXp };
    }
  }
  switch (a.category) {
    case 'reviews':
      return { view: 'flashcards', label: t.ctaReviews };
    case 'lessons':
    case 'levels':
      return { view: 'cecr', label: t.ctaPath };
    default:
      // streak : n'importe quelle étude du jour compte → accueil
      return { view: 'home', label: t.ctaStreak };
  }
};

// ============================================================================
//  COMPOSANT
// ============================================================================

export default function AchievementsPage({
  language = 'fr',
  metrics,
  onNavigate
}: AchievementsPageProps) {
  const t = COPY[language] ?? COPY.fr;

  // Fallback interne : révisions cumulées + streak depuis useDailyActivity
  // (hook autonome, localStorage + Firestore). Les props App.tsx, quand
  // elles seront câblées, PRIMENT sur ce fallback.
  const dailyActivity = useDailyActivity();
  const mergedMetrics = useMemo<AchievementMetrics>(
    () => ({
      ...metrics,
      totalCardsReviewed:
        metrics?.totalCardsReviewed ?? dailyActivity.totals.totalCards,
      currentStreak: metrics?.currentStreak ?? dailyActivity.currentStreak,
      reviewSessions:
        metrics?.reviewSessions ?? dailyActivity.totals.totalSessions,
      totalXp: metrics?.totalXp ?? dailyActivity.totals.totalXp
    }),
    [
      metrics,
      dailyActivity.totals.totalCards,
      dailyActivity.totals.totalSessions,
      dailyActivity.totals.totalXp,
      dailyActivity.currentStreak
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
  /** Carte ouverte dans le modal de détail (null = fermé). */
  const [selected, setSelected] = useState<EvaluatedAchievement | null>(null);

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
        const lore = language === 'fr' ? a.loreFr : a.loreEn;
        const haystack = `${name} ${desc} ${lore} ${a.emblem}`.toLowerCase();
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
    // Débloquée : le récit (lore) ; verrouillée : la condition à remplir.
    const desc = isUnlocked
      ? language === 'fr'
        ? a.loreFr
        : a.loreEn
      : language === 'fr'
        ? a.descFr
        : a.descEn;
    const showFx = isUnlocked && a.tier !== 'common';
    return (
      <article
        key={a.id}
        className={`ach-card ach-tier-${a.tier}${isUnlocked ? ' is-unlocked' : ' is-locked'}`}
        aria-label={name}
        role="button"
        aria-haspopup="dialog"
        tabIndex={0}
        onClick={() => setSelected(a)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setSelected(a);
          }
        }}
      >
        {/* Illustration (asset mobile 900×1342, object-fit cover) */}
        <img
          className="ach-card-art"
          src={a.image}
          alt=""
          loading="lazy"
          decoding="async"
          draggable={false}
        />
        {/* Effets par rareté (rare/épique/légendaire uniquement) :
            voile holographique + étincelles + balayage (légendaire) —
            adaptation CSS du CardShimmer mobile. */}
        {showFx && (
          <>
            <div className="ach-card-fx" aria-hidden="true" />
            <div className="ach-card-sparks" aria-hidden="true" />
          </>
        )}
        <div className="ach-card-frame">
          <div className="ach-card-corner ach-corner-tl" aria-hidden="true" />
          <div className="ach-card-corner ach-corner-tr" aria-hidden="true" />
          <div className="ach-card-corner ach-corner-bl" aria-hidden="true" />
          <div className="ach-card-corner ach-corner-br" aria-hidden="true" />

          <div className="ach-card-tier">{t.tiers[a.tier]}</div>

          <div className="ach-card-emblem-zone">
            {!isUnlocked && (
              <span className="ach-card-lock" aria-hidden="true">
                🔒
              </span>
            )}
          </div>

          <span className="ach-card-hanzi" aria-hidden="true">
            {a.emblem}
          </span>
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

      {/* ---------------------------------------------------------------- */}
      {/* Modal de détail (clic sur une carte)                             */}
      {/* ---------------------------------------------------------------- */}
      {selected && (
        <CardDetailModal
          achievement={selected}
          language={language}
          t={t}
          formatDate={formatDate}
          onClose={() => setSelected(null)}
          onNavigate={onNavigate}
        />
      )}
    </div>
  );
}

// ============================================================================
//  MODAL DE DÉTAIL — parité avec la fiche CardDetail du mobile
//  (xiaolearn_mobile/app/collection.tsx) : hero teinté par la rareté, carte
//  en grand, badges rareté + catégorie, nom, emblème, lore, « COMMENT
//  L'OBTENIR » (condition + progression ou date d'obtention), « RÉCOMPENSE »
//  (+XP). En plus du mobile : loupe → lightbox plein écran, et CTA de
//  navigation vers l'écran où la condition se remplit.
// ============================================================================

interface CardDetailModalProps {
  achievement: EvaluatedAchievement;
  language: Language;
  t: Copy;
  formatDate: (iso: string) => string;
  onClose: () => void;
  onNavigate?: (view: string) => void;
}

function CardDetailModal({
  achievement: a,
  language,
  t,
  formatDate,
  onClose,
  onNavigate
}: CardDetailModalProps) {
  /** Lightbox loupe (2e niveau au-dessus du modal). */
  const [lightbox, setLightbox] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Scroll lock du body + focus initial sur la croix (focus trap léger).
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  // Échap : ferme la lightbox si ouverte, sinon le modal.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      e.stopPropagation();
      if (lightbox) setLightbox(false);
      else onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, onClose]);

  const isUnlocked = a.status === 'unlocked';
  const name = language === 'fr' ? a.nameFr : a.nameEn;
  const desc = language === 'fr' ? a.descFr : a.descEn;
  const lore = language === 'fr' ? a.loreFr : a.loreEn;
  const showFx = isUnlocked && a.tier !== 'common';
  // Comme sur mobile : le nom et le lore ne sont PAS masqués sur une carte
  // verrouillée — le principe de la collection est qu'on sache ce qu'on vise.
  const cta = !isUnlocked && onNavigate ? getDetailCta(a, t) : null;

  return (
    <div className="ach-modal-overlay" onClick={onClose}>
      <div
        className="ach-modal"
        role="dialog"
        aria-modal="true"
        aria-label={name}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero : gradient de rareté (débloquée) / gris (verrouillée) */}
        <div
          className={`ach-modal-hero ${
            isUnlocked ? `ach-modal-hero-${a.tier}` : 'ach-modal-hero-locked'
          }`}
        >
          <button
            ref={closeRef}
            type="button"
            className="ach-modal-close"
            onClick={onClose}
            aria-label={t.detailClose}
          >
            ✕
          </button>

          {/* La carte en grand — mêmes classes que la grille (art + shimmer) */}
          <div
            className={`ach-card ach-modal-card ach-tier-${a.tier}${
              isUnlocked ? ' is-unlocked' : ' is-locked'
            }`}
          >
            <img
              className="ach-card-art"
              src={a.image}
              alt=""
              decoding="async"
              draggable={false}
            />
            {showFx && (
              <>
                <div className="ach-card-fx" aria-hidden="true" />
                <div className="ach-card-sparks" aria-hidden="true" />
              </>
            )}
            <div className="ach-card-frame">
              <div className="ach-card-corner ach-corner-tl" aria-hidden="true" />
              <div className="ach-card-corner ach-corner-tr" aria-hidden="true" />
              <div className="ach-card-corner ach-corner-bl" aria-hidden="true" />
              <div className="ach-card-corner ach-corner-br" aria-hidden="true" />
              <div className="ach-card-tier">{t.tiers[a.tier]}</div>
              <div className="ach-card-emblem-zone">
                {!isUnlocked && (
                  <span className="ach-card-lock" aria-hidden="true">
                    🔒
                  </span>
                )}
              </div>
              <span className="ach-card-hanzi" aria-hidden="true">
                {a.emblem}
              </span>
              <div className="ach-card-name">{name}</div>
            </div>
            {/* Loupe → lightbox plein écran */}
            <button
              type="button"
              className="ach-modal-zoom"
              onClick={() => setLightbox(true)}
              aria-label={t.detailZoom}
            >
              🔍
            </button>
          </div>

          {/* Badges pill : rareté + catégorie */}
          <div className="ach-modal-badges">
            <span className={`ach-modal-badge ach-modal-badge-${a.tier}`}>
              {t.tiers[a.tier]}
            </span>
            <span className="ach-modal-badge ach-modal-badge-cat">
              {t.categories[a.category]}
            </span>
          </div>

          <h2 className="ach-modal-name">{name}</h2>
          <p className="ach-modal-emblem" lang="zh">
            {a.emblem}
          </p>
          <p className="ach-modal-lore">{lore}</p>
        </div>

        {/* Corps blanc : condition + récompense + CTA */}
        <div className="ach-modal-body">
          <h3 className="ach-modal-section-title">
            <span aria-hidden="true">⊙ </span>
            {t.detailHowTo}
          </h3>
          <div className="ach-modal-howto">
            <p className="ach-modal-desc">{desc}</p>
            {isUnlocked ? (
              <div className="ach-modal-earned">
                <span aria-hidden="true">✓</span>
                {t.unlockedOn}
                {a.unlockedAt ? ` ${formatDate(a.unlockedAt)}` : ''}
              </div>
            ) : (
              <>
                <div
                  className="ach-modal-progress-bar"
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={a.threshold}
                  aria-valuenow={a.progress}
                >
                  <div
                    className="ach-modal-progress-fill"
                    style={{ width: `${Math.round(a.progressRatio * 100)}%` }}
                  />
                </div>
                <div className="ach-modal-progress-label">
                  {a.progress}/{a.threshold}
                </div>
              </>
            )}
          </div>

          <h3 className="ach-modal-section-title">{t.detailReward}</h3>
          <div className="ach-modal-reward">
            <span className="ach-modal-reward-value">+{a.xpReward} XP</span>
          </div>

          {cta && (
            <button
              type="button"
              className="ach-modal-cta"
              onClick={() => {
                onNavigate?.(cta.view);
                onClose();
              }}
            >
              {cta.label}
            </button>
          )}
        </div>
      </div>

      {/* Lightbox : overlay noir, image max 90vh, clic pour fermer.
          V2 — la carte zoomée garde ses effets de rareté (holo/sparks/
          sweep) : wrapper avec les mêmes classes tier + fx que la carte
          du modal, au lieu de l'img brute. */}
      {lightbox && (
        <div
          className="ach-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={name}
          onClick={(e) => {
            e.stopPropagation();
            setLightbox(false);
          }}
        >
          <div
            className={`ach-lightbox-card ach-tier-${a.tier} ${
              isUnlocked ? 'is-unlocked' : 'is-locked'
            }`}
          >
            <img className="ach-lightbox-img" src={a.image} alt={name} />
            {isUnlocked && (
              <>
                <div className="ach-card-fx" aria-hidden="true" />
                <div className="ach-card-sparks" aria-hidden="true" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
