/**
 * IdeasRoadmapPage.tsx — page Idées & Roadmap (XiaoLearn V7)
 * -----------------------------------------------------------
 * Sections :
 *   1. Header (titre + description)
 *   2. Onglets : Toutes les idées / Mes idées
 *   3. Feuille de route — timeline horizontale avec marqueur "Aujourd'hui"
 *   4. Formulaire "Propose une idée" (titre, description, catégorie)
 *   5. Idées validées — grid de cartes avec votes (toggle 👍)
 *
 * État local : tab active (`all` / `mine`), brouillon formulaire.
 * État Firestore : via useIdeas() (live snapshot + transactions).
 *
 * Styles : ./../styles/ideas-roadmap.css (scoped sous .ideas-page).
 */

import { useMemo, useState } from 'react';
import '../styles/ideas-roadmap.css';
import { useIdeas } from '../hooks/useIdeas';
import { useAuth } from '../contexts/AuthContext';
import { COMMUNITY_ROADMAP } from '../data/community-roadmap';
import {
  IDEA_CATEGORIES,
  IDEA_CATEGORY_LABELS,
  IDEA_TITLE_MAX,
  IDEA_DESCRIPTION_MAX,
  type IdeaCategory,
  type CommunityIdea
} from '../types/community-feedback';

type Tab = 'all' | 'mine';
type Language = 'fr' | 'en';

interface IdeasRoadmapPageProps {
  language?: Language;
}

// ============================================================================
//  COPIES
// ============================================================================

const COPY = {
  fr: {
    title: 'Idées & Roadmap',
    subtitle:
      'Aide-nous à construire XiaoLearn. Propose tes idées, vote pour celles que tu préfères.',
    tabAll: 'Toutes les idées',
    tabMine: 'Mes idées',
    roadmapTitle: 'Feuille de route',
    roadmapSubtitle:
      'Les prochaines fonctionnalités, en route vers ton dashboard.',
    today: "AUJOURD'HUI",
    statusDelivered: 'Livrée',
    statusInDev: 'En dev',
    statusPlanned: 'Prochainement',
    statusUpcoming: 'À venir',
    formTitle: 'Propose une idée',
    formShortTitle: 'Titre court',
    formShortTitlePh: 'Ex : Mode sombre sur l\'app mobile',
    formDescription: 'Description',
    formDescriptionPh:
      "Décris ton idée, à quoi elle servirait, comment tu l'imagines…",
    formCategory: 'Catégorie',
    formCategoryPh: 'Sélectionner une catégorie…',
    formSubmit: "Envoyer l'idée",
    formSent: 'Idée envoyée — merci !',
    validatedTitle: 'Idées validées',
    validatedSubtitle:
      'En attente de développement. Clique 👍 pour voter pour celles que tu veux voir.',
    voteFor: 'Voter pour cette idée',
    voted: 'Voté',
    votes: 'votes',
    vote: 'vote',
    emptyMine:
      "Tu n'as pas encore proposé d'idée. Utilise le formulaire ci-dessus !",
    emptyValidated:
      "Aucune idée validée pour le moment. Sois le premier à proposer la tienne !",
    loginRequired: 'Connecte-toi pour proposer et voter.',
    loading: 'Chargement…'
  },
  en: {
    title: 'Ideas & Roadmap',
    subtitle:
      'Help us build XiaoLearn. Suggest ideas, vote for your favorites.',
    tabAll: 'All ideas',
    tabMine: 'My ideas',
    roadmapTitle: 'Roadmap',
    roadmapSubtitle: 'Upcoming features, on the way to your dashboard.',
    today: 'TODAY',
    statusDelivered: 'Delivered',
    statusInDev: 'In dev',
    statusPlanned: 'Coming soon',
    statusUpcoming: 'Upcoming',
    formTitle: 'Suggest an idea',
    formShortTitle: 'Short title',
    formShortTitlePh: 'Ex: Dark mode on mobile app',
    formDescription: 'Description',
    formDescriptionPh:
      'Describe your idea, what it would do, how you imagine it…',
    formCategory: 'Category',
    formCategoryPh: 'Pick a category…',
    formSubmit: 'Send idea',
    formSent: 'Idea sent — thanks!',
    validatedTitle: 'Validated ideas',
    validatedSubtitle:
      'Awaiting development. Tap 👍 to vote for the ones you want to see.',
    voteFor: 'Vote for this idea',
    voted: 'Voted',
    votes: 'votes',
    vote: 'vote',
    emptyMine: "You haven't suggested any idea yet. Use the form above!",
    emptyValidated: 'No validated ideas yet. Be the first to suggest one!',
    loginRequired: 'Sign in to suggest and vote.',
    loading: 'Loading…'
  }
} as const;

// ============================================================================
//  HELPERS
// ============================================================================

const CATEGORY_COLORS: Record<IdeaCategory, { bg: string; fg: string }> = {
  audio: { bg: '#fde7ec', fg: '#b8264b' },
  'leçons': { bg: '#dceefc', fg: '#1f6db3' },
  interface: { bg: '#eadfff', fg: '#6c4cb8' },
  flashcards: { bg: '#fff0d6', fg: '#b07a1c' },
  gamification: { bg: '#fdecd4', fg: '#c97a1f' },
  culture: { bg: '#fbe9b8', fg: '#a06b15' },
  autres: { bg: '#f4ede2', fg: '#5c4a30' }
};

const formatRoadmapDate = (iso: string | undefined, lang: Language): string => {
  // Items sans date (statut "planned" non engagé) -> badge "Prochainement"
  // au lieu d'une date factice.
  if (!iso) return lang === 'fr' ? 'PROCHAINEMENT' : 'COMING SOON';
  try {
    const d = new Date(iso);
    return d
      .toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
      .toUpperCase();
  } catch {
    return iso;
  }
};

const sortIdeas = (a: CommunityIdea, b: CommunityIdea): number => {
  if (a.voteCount !== b.voteCount) return b.voteCount - a.voteCount;
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
};

// ============================================================================
//  COMPOSANT PRINCIPAL
// ============================================================================

const IdeasRoadmapPage = ({ language = 'fr' }: IdeasRoadmapPageProps) => {
  const { user } = useAuth();
  const copy = COPY[language] ?? COPY.fr;
  const { ideas, myVoteIds, myIdeas, loading, error, submitIdea, toggleVote } =
    useIdeas();

  const [tab, setTab] = useState<Tab>('all');
  const [draftTitle, setDraftTitle] = useState('');
  const [draftDesc, setDraftDesc] = useState('');
  const [draftCategory, setDraftCategory] = useState<IdeaCategory | ''>('');
  const [submitting, setSubmitting] = useState(false);
  const [submitOk, setSubmitOk] = useState(false);

  const validatedIdeas = useMemo(
    () => ideas.filter((i) => i.status === 'validated' || i.status === 'pending').sort(sortIdeas),
    [ideas]
  );

  const visibleIdeas = tab === 'all' ? validatedIdeas : myIdeas;

  const canSubmit =
    !!user &&
    !!draftTitle.trim() &&
    !!draftDesc.trim() &&
    !!draftCategory &&
    !submitting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || !draftCategory) return;
    setSubmitting(true);
    setSubmitOk(false);
    const id = await submitIdea({
      title: draftTitle,
      description: draftDesc,
      category: draftCategory
    });
    setSubmitting(false);
    if (id) {
      setSubmitOk(true);
      setDraftTitle('');
      setDraftDesc('');
      setDraftCategory('');
      setTimeout(() => setSubmitOk(false), 3500);
    }
  };

  const statusLabel = (status: string): string => {
    switch (status) {
      case 'delivered':
        return copy.statusDelivered;
      case 'in-dev':
        return copy.statusInDev;
      case 'planned':
        return copy.statusPlanned;
      default:
        return copy.statusUpcoming;
    }
  };

  return (
    <div className="ideas-page">
      <header className="ideas-header">
        <h1 className="ideas-title">
          <span aria-hidden="true">💡</span>
          <span>{copy.title}</span>
        </h1>
        <p className="ideas-subtitle">{copy.subtitle}</p>
      </header>

      {/* Onglets */}
      <div className="ideas-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'all'}
          className={`ideas-tab ${tab === 'all' ? 'is-active' : ''}`}
          onClick={() => setTab('all')}
        >
          {copy.tabAll}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'mine'}
          className={`ideas-tab ${tab === 'mine' ? 'is-active' : ''}`}
          onClick={() => setTab('mine')}
        >
          {copy.tabMine}
        </button>
      </div>

      {tab === 'all' && (
        /* Section roadmap */
        <section className="ideas-card roadmap-card">
          <header className="roadmap-header">
            <div>
              <h2>{copy.roadmapTitle}</h2>
              <p>{copy.roadmapSubtitle}</p>
            </div>
            <div className="roadmap-legend" aria-hidden="true">
              <span className="legend-dot legend-delivered">—</span>
              <span>{copy.statusDelivered}</span>
              <span className="legend-dot legend-in-dev">—</span>
              <span>{copy.statusInDev}</span>
            </div>
          </header>
          <RoadmapTimeline language={language} today={copy.today} statusLabel={statusLabel} />
        </section>
      )}

      {/* Formulaire idée */}
      {tab === 'all' || (tab === 'mine' && myIdeas.length > 0) ? null : null}

      {tab === 'mine' && myIdeas.length === 0 && (
        <div className="ideas-empty">{copy.emptyMine}</div>
      )}

      <section className="ideas-card form-card">
        <header className="form-card-header">
          <span aria-hidden="true">💡</span>
          <h2>{copy.formTitle}</h2>
        </header>

        {!user ? (
          <p className="form-login-warning">{copy.loginRequired}</p>
        ) : (
          <form className="ideas-form" onSubmit={handleSubmit}>
            <label className="form-field">
              <span className="form-label">{copy.formShortTitle}</span>
              <input
                type="text"
                value={draftTitle}
                onChange={(e) => setDraftTitle(e.target.value.slice(0, IDEA_TITLE_MAX))}
                placeholder={copy.formShortTitlePh}
                maxLength={IDEA_TITLE_MAX}
              />
              <span className="form-counter">
                {draftTitle.length} / {IDEA_TITLE_MAX}
              </span>
            </label>

            <label className="form-field">
              <span className="form-label">{copy.formDescription}</span>
              <textarea
                value={draftDesc}
                onChange={(e) =>
                  setDraftDesc(e.target.value.slice(0, IDEA_DESCRIPTION_MAX))
                }
                placeholder={copy.formDescriptionPh}
                rows={4}
                maxLength={IDEA_DESCRIPTION_MAX}
              />
              <span className="form-counter">
                {draftDesc.length} / {IDEA_DESCRIPTION_MAX}
              </span>
            </label>

            <label className="form-field">
              <span className="form-label">{copy.formCategory}</span>
              <select
                value={draftCategory}
                onChange={(e) => setDraftCategory(e.target.value as IdeaCategory)}
              >
                <option value="">{copy.formCategoryPh}</option>
                {IDEA_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {IDEA_CATEGORY_LABELS[c][language]}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="submit"
              className={`ideas-submit-btn ${canSubmit ? 'is-active' : ''}`}
              disabled={!canSubmit}
            >
              <span aria-hidden="true">✈️</span> {copy.formSubmit}
            </button>
            {submitOk && <p className="form-success">{copy.formSent}</p>}
            {error && <p className="form-error">{error}</p>}
          </form>
        )}
      </section>

      {/* Idées validées (ou mes idées selon onglet) */}
      <section className="ideas-card validated-card">
        <header className="validated-header">
          <div>
            <h2>
              {tab === 'all' ? copy.validatedTitle : copy.tabMine}
            </h2>
            <p>
              {tab === 'all' ? copy.validatedSubtitle : copy.subtitle}
            </p>
          </div>
          <span className="validated-count">{visibleIdeas.length}</span>
        </header>

        {loading ? (
          <div className="ideas-empty">{copy.loading}</div>
        ) : visibleIdeas.length === 0 ? (
          <div className="ideas-empty">
            {tab === 'all' ? copy.emptyValidated : copy.emptyMine}
          </div>
        ) : (
          <div className="ideas-grid">
            {visibleIdeas.map((idea) => {
              const colors = CATEGORY_COLORS[idea.category] ?? CATEGORY_COLORS.autres;
              const voted = myVoteIds.has(idea.id);
              return (
                <article
                  key={idea.id}
                  className="idea-card"
                  // --idea-accent : couleur de la barre supérieure (rendue
                  // via ::before sur .idea-card, pas une border-top, pour
                  // éviter la troncature des coins arrondis).
                  style={{ ['--idea-accent' as string]: colors.fg }}
                >
                  <span
                    className="idea-category"
                    style={{ background: colors.bg, color: colors.fg }}
                  >
                    • {IDEA_CATEGORY_LABELS[idea.category][language].toUpperCase()}
                  </span>
                  <h3 className="idea-title">{idea.title}</h3>
                  <p className="idea-description">{idea.description}</p>
                  <footer className="idea-footer">
                    <span className="idea-votes">
                      {idea.voteCount}{' '}
                      <span className="idea-votes-label">
                        {idea.voteCount > 1 ? copy.votes : copy.vote}
                      </span>
                    </span>
                    <button
                      type="button"
                      className={`idea-vote-btn ${voted ? 'is-voted' : ''}`}
                      onClick={() => toggleVote(idea.id)}
                      disabled={!user}
                      aria-pressed={voted}
                    >
                      <span aria-hidden="true">{voted ? '✓' : '👍'}</span>{' '}
                      {voted ? copy.voted : copy.voteFor}
                    </button>
                  </footer>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

// ============================================================================
//  RoadmapTimeline — sous-composant timeline horizontale
// ============================================================================

interface TimelineProps {
  language: Language;
  today: string;
  statusLabel: (s: string) => string;
}

const RoadmapTimeline = ({ language, today, statusLabel }: TimelineProps) => {
  const todayIso = new Date().toISOString();
  // Trouve l'index du premier jalon non livré
  const todayIndex = COMMUNITY_ROADMAP.findIndex(
    (m) => m.status !== 'delivered'
  );

  return (
    <div className="roadmap-timeline">
      <div className="roadmap-track" aria-hidden="true" />
      <div className="roadmap-steps">
        {COMMUNITY_ROADMAP.map((m, i) => {
          const isToday = i === todayIndex;
          return (
            <div
              key={m.id}
              className={`roadmap-step status-${m.status} ${isToday ? 'is-today' : ''}`}
              title={m.description ?? m.title}
            >
              {isToday && (
                <div className="roadmap-today-marker">{today}</div>
              )}
              <div className="roadmap-step-dot">
                {m.status === 'delivered' ? '✓' : ''}
              </div>
              <div className="roadmap-step-date">
                {formatRoadmapDate(m.date, language)}
              </div>
              <div className="roadmap-step-title">{m.title}</div>
              <span
                className={`roadmap-step-status badge-${m.status}`}
              >
                {statusLabel(m.status)}
              </span>
            </div>
          );
        })}
      </div>
      <span className="visually-hidden">{todayIso}</span>
    </div>
  );
};

export default IdeasRoadmapPage;
