/**
 * AnnouncementsPage.tsx — page dédiée Annonces XiaoLearn
 * --------------------------------------------------------
 * Remplace l'ancienne section "annonces" intégrée à CommunityPageV2.
 * Inspiration UX : Seonsaengnim (carte verticale full-width, icône colorée
 * à gauche, titre + date, chevron à droite, expand inline au clic).
 *
 * Tri :
 *   1. pinned (true en premier)
 *   2. date desc
 *
 * Au clic sur une carte, le body se déplie en accordion. Re-click ferme.
 * État local seulement — pas de routing nested.
 *
 * Styles : ./../styles/announcements.css (scoped sous .announcements-page).
 */

import { useMemo, useState } from 'react';
import '../styles/announcements.css';
import { parseMarkdown } from '../utils/markdownUtils';
import type {
  CommunityV2Announcement,
  CommunityV2AnnouncementCategory,
  CommunityV2Language
} from './CommunityPageV2';

export interface AnnouncementsPageProps {
  language?: CommunityV2Language;
  announcements: CommunityV2Announcement[];
  /** Callback appelé quand l'utilisateur ouvre une annonce (utile pour marquer "lue"). */
  onOpenAnnouncement?: (id: string) => void;
}

// ============================================================================
//  COPIES
// ============================================================================

const COPY = {
  fr: {
    title: 'Annonces',
    subtitle: 'Les dernières nouveautés et mises à jour de la plateforme.',
    empty:
      'Pas encore d\'annonce. L\'équipe XiaoLearn publiera ici ses prochaines mises à jour.',
    pinned: 'Épinglée',
    daysAgo: (n: number) => (n <= 1 ? 'Hier' : `Il y a ${n} jours`),
    today: 'Aujourd\'hui',
    weeksAgo: (n: number) => (n <= 1 ? 'Il y a 1 semaine' : `Il y a ${n} semaines`)
  },
  en: {
    title: 'Announcements',
    subtitle: 'The latest news and platform updates.',
    empty: 'No announcements yet. The XiaoLearn team will post updates here.',
    pinned: 'Pinned',
    daysAgo: (n: number) => (n <= 1 ? 'Yesterday' : `${n} days ago`),
    today: 'Today',
    weeksAgo: (n: number) => (n <= 1 ? '1 week ago' : `${n} weeks ago`)
  }
} as const;

// ============================================================================
//  HELPERS
// ============================================================================

/**
 * Catégorie → couleur du carré d'icône. On garde palette XiaoLearn (rouges,
 * dorés, jades) plutôt que d'arc-en-ciel — cohérent avec l'identité visuelle.
 */
const CATEGORY_COLORS: Record<
  CommunityV2AnnouncementCategory,
  { bg: string; fg: string }
> = {
  feature: { bg: '#fde7e5', fg: '#c6302c' },
  content: { bg: '#fbe9b8', fg: '#a06b15' },
  fix: { bg: '#e0f0e6', fg: '#2a7a4e' },
  community: { bg: '#fdecd4', fg: '#c97a1f' },
  audio: { bg: '#eadfff', fg: '#6c4cb8' },
  review: { bg: '#dceefc', fg: '#1f6db3' },
  flashcards: { bg: '#fff0d6', fg: '#b07a1c' }
};
const DEFAULT_CAT_COLOR = { bg: '#f4ede2', fg: '#5c4a30' };

/**
 * Catégorie → emoji par défaut si l'annonce n'en fournit pas un explicite.
 */
const CATEGORY_FALLBACK_ICON: Record<CommunityV2AnnouncementCategory, string> = {
  feature: '✨',
  content: '📚',
  fix: '🛠️',
  community: '👥',
  audio: '🔊',
  review: '🎯',
  flashcards: '🗂️'
};

/**
 * Date relative en FR/EN — fallback en date absolue formatée
 * "12 mai 2026" / "May 12, 2026" pour les annonces de plus de 4 semaines.
 */
const formatRelativeDate = (
  iso: string,
  lang: CommunityV2Language,
  copy: (typeof COPY)['fr' | 'en']
): string => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays <= 0) return copy.today;
  if (diffDays < 7) return copy.daysAgo(diffDays);
  if (diffDays < 28) return copy.weeksAgo(Math.floor(diffDays / 7));
  return d.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

/**
 * Comparateur de tri : pinned d'abord, puis date desc.
 */
const sortAnnouncements = (
  a: CommunityV2Announcement,
  b: CommunityV2Announcement
): number => {
  if (!!a.pinned !== !!b.pinned) return a.pinned ? -1 : 1;
  return new Date(b.date).getTime() - new Date(a.date).getTime();
};

// ============================================================================
//  COMPOSANT PRINCIPAL
// ============================================================================

const AnnouncementsPage = ({
  language = 'fr',
  announcements,
  onOpenAnnouncement
}: AnnouncementsPageProps) => {
  const copy = COPY[language] ?? COPY.fr;
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const sorted = useMemo(
    () => [...announcements].sort(sortAnnouncements),
    [announcements]
  );

  const handleToggle = (id: string) => {
    setExpandedId((prev) => {
      const next = prev === id ? null : id;
      if (next && onOpenAnnouncement) onOpenAnnouncement(next);
      return next;
    });
  };

  return (
    <div className="announcements-page">
      <header className="ann-header">
        <h1 className="ann-title">
          <span aria-hidden="true" className="ann-title-icon">📣</span>
          <span>{copy.title}</span>
        </h1>
        <p className="ann-subtitle">{copy.subtitle}</p>
      </header>

      {sorted.length === 0 ? (
        <div className="ann-empty">{copy.empty}</div>
      ) : (
        <ul className="ann-list" role="list">
          {sorted.map((a) => {
            const isOpen = expandedId === a.id;
            const colors = a.category
              ? CATEGORY_COLORS[a.category]
              : DEFAULT_CAT_COLOR;
            const icon =
              a.icon ??
              (a.category ? CATEGORY_FALLBACK_ICON[a.category] : '📣');
            const title = language === 'en' && a.titleEn ? a.titleEn : a.title;
            const body = language === 'en' && a.bodyEn ? a.bodyEn : a.body;
            const dateLabel = formatRelativeDate(a.date, language, copy);

            return (
              <li
                key={a.id}
                className={`ann-card ${isOpen ? 'is-open' : ''} ${
                  a.pinned ? 'is-pinned' : ''
                }`}
              >
                <button
                  type="button"
                  className="ann-card-row"
                  aria-expanded={isOpen}
                  aria-controls={`ann-body-${a.id}`}
                  onClick={() => handleToggle(a.id)}
                >
                  <span
                    className="ann-card-icon"
                    style={{ background: colors.bg, color: colors.fg }}
                    aria-hidden="true"
                  >
                    {icon}
                  </span>

                  <span className="ann-card-content">
                    <span className="ann-card-title-row">
                      {a.pinned && (
                        <span
                          className="ann-pin"
                          title={copy.pinned}
                          aria-label={copy.pinned}
                        >
                          📌
                        </span>
                      )}
                      <span className="ann-card-title">{title}</span>
                    </span>
                    <span className="ann-card-meta">
                      {a.tag && <span className="ann-tag">{a.tag}</span>}
                      <span className="ann-date">{dateLabel}</span>
                    </span>
                  </span>

                  <span
                    className={`ann-chevron ${isOpen ? 'is-open' : ''}`}
                    aria-hidden="true"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </span>
                </button>

                <div
                  id={`ann-body-${a.id}`}
                  className="ann-card-body"
                  hidden={!isOpen}
                >
                  {/* Illustration / maquette SVG, rendue dans un encart crème
                     au-dessus du texte. Le SVG est trusted (provient de notre
                     dataset, jamais d'input utilisateur). */}
                  {a.illustration && (
                    <div
                      className="ann-illustration"
                      role="img"
                      aria-label={title}
                      dangerouslySetInnerHTML={{ __html: a.illustration }}
                    />
                  )}
                  {/* Markdown body : supporte **gras**, listes - * et 1. 2. 3.,
                     sous-titres ### / ##, paragraphes séparés par lignes vides. */}
                  <div className="ann-body-md">{parseMarkdown(body)}</div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default AnnouncementsPage;
