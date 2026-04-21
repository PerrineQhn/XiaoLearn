/**
 * CommunityPageV2.tsx — scaffold communauté XiaoLearn
 * ----------------------------------------------------
 * Page volontairement minimale : c'est un teaser "bientôt" qui prépare
 * l'emplacement final sans demander de backend. Trois blocs :
 *
 *   1. Feed annonces   — mises à jour de l'équipe XiaoLearn (3 cartes)
 *   2. Défis du mois   — prompts à publier (écriture, lecture)
 *   3. Classement      — leaderboard XP placeholder (top 3)
 *
 * Toutes les données sont optionnelles : si non fournies, on montre un
 * état placeholder engageant plutôt qu'une erreur.
 *
 * Styles : ./../styles/community-v2.css (scoped sous .community-v2)
 */

import '../styles/community-v2.css';

// ============================================================================
//  TYPES
// ============================================================================

export type CommunityV2Language = 'fr' | 'en';

export interface CommunityV2Announcement {
  id: string;
  title: string;
  titleEn?: string;
  body: string;
  bodyEn?: string;
  date: string; // ISO
  tag?: string;
}

export interface CommunityV2Challenge {
  id: string;
  title: string;
  titleEn?: string;
  prompt: string;
  promptEn?: string;
  endsAt?: string;
  participants?: number;
}

export interface CommunityV2LeaderboardEntry {
  id: string;
  displayName: string;
  xp: number;
  rank: number;
  isCurrentUser?: boolean;
}

export interface CommunityPageV2Props {
  language?: CommunityV2Language;
  announcements?: CommunityV2Announcement[];
  challenges?: CommunityV2Challenge[];
  leaderboard?: CommunityV2LeaderboardEntry[];
  onJoinChallenge?: (challengeId: string) => void;
  onBack?: () => void;
  /** Quand l'utilisateur demande à être prévenu quand la communauté ouvre. */
  onRequestNotify?: () => void;
}

// ============================================================================
//  COPIES
// ============================================================================

const COPY = {
  fr: {
    title: 'Communauté',
    subtitle:
      'Ici, tu retrouveras bientôt les annonces, les défis mensuels et les autres apprenants XiaoLearn.',
    back: '← Retour',
    teaser: 'Bientôt disponible — on pose déjà les fondations.',
    notify: 'Me prévenir à l\'ouverture',
    announcementsTitle: 'Annonces',
    challengesTitle: 'Défis du mois',
    leaderboardTitle: 'Classement XP',
    participants: 'participants',
    endsOn: 'Fin',
    join: 'Participer',
    noAnnouncements:
      'Pas encore d\'annonce. L\'équipe XiaoLearn publiera ici ses prochaines mises à jour.',
    noChallenges: 'Les défis seront débloqués à l\'ouverture de la communauté.',
    noLeaderboard: 'Le classement s\'activera quand la communauté sera en ligne.',
    you: 'toi'
  },
  en: {
    title: 'Community',
    subtitle:
      'Soon, this is where you will find announcements, monthly challenges, and fellow XiaoLearn learners.',
    back: '← Back',
    teaser: 'Coming soon — we are laying the foundations.',
    notify: 'Notify me at launch',
    announcementsTitle: 'Announcements',
    challengesTitle: 'Monthly challenges',
    leaderboardTitle: 'XP leaderboard',
    participants: 'participants',
    endsOn: 'Ends',
    join: 'Join',
    noAnnouncements:
      'No announcements yet. The XiaoLearn team will post updates here.',
    noChallenges: 'Challenges will unlock when the community opens.',
    noLeaderboard: 'The leaderboard activates once the community is live.',
    you: 'you'
  }
} as const;

type CopyKey = keyof (typeof COPY)['fr'];
const t = (lang: CommunityV2Language, k: CopyKey) => COPY[lang][k] ?? COPY.fr[k];

const formatDate = (iso: string) => {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString();
  } catch {
    return iso;
  }
};

// ============================================================================
//  COMPOSANT PRINCIPAL
// ============================================================================

const CommunityPageV2 = (props: CommunityPageV2Props) => {
  const {
    language = 'fr',
    announcements = [],
    challenges = [],
    leaderboard = [],
    onJoinChallenge,
    onBack,
    onRequestNotify
  } = props;

  return (
    <div className="community-v2">
      {/* Topbar */}
      {onBack && (
        <button className="cm2-btn cm2-btn--link" onClick={onBack}>
          {t(language, 'back')}
        </button>
      )}

      {/* Hero teaser */}
      <header className="cm2-hero">
        <div className="cm2-hero-kicker">🏮 {t(language, 'teaser')}</div>
        <h1>{t(language, 'title')}</h1>
        <p>{t(language, 'subtitle')}</p>
        {onRequestNotify && (
          <button className="cm2-btn cm2-btn--primary" onClick={onRequestNotify}>
            {t(language, 'notify')}
          </button>
        )}
      </header>

      {/* Layout 2 colonnes : announcements + challenges (gauche),
          leaderboard (droite) */}
      <div className="cm2-grid">
        <div className="cm2-col">
          <section className="cm2-card">
            <h2>{t(language, 'announcementsTitle')}</h2>
            {announcements.length === 0 ? (
              <div className="cm2-empty">{t(language, 'noAnnouncements')}</div>
            ) : (
              <div className="cm2-announcements">
                {announcements.map((a) => (
                  <article key={a.id} className="cm2-announcement">
                    <div className="cm2-announcement-meta">
                      {a.tag && <span className="cm2-tag">{a.tag}</span>}
                      <span>{formatDate(a.date)}</span>
                    </div>
                    <h3>{language === 'en' && a.titleEn ? a.titleEn : a.title}</h3>
                    <p>{language === 'en' && a.bodyEn ? a.bodyEn : a.body}</p>
                  </article>
                ))}
              </div>
            )}
          </section>

          <section className="cm2-card">
            <h2>{t(language, 'challengesTitle')}</h2>
            {challenges.length === 0 ? (
              <div className="cm2-empty">{t(language, 'noChallenges')}</div>
            ) : (
              <div className="cm2-challenges">
                {challenges.map((c) => (
                  <article key={c.id} className="cm2-challenge">
                    <header>
                      <h3>{language === 'en' && c.titleEn ? c.titleEn : c.title}</h3>
                      {c.endsAt && (
                        <span className="cm2-challenge-end">
                          {t(language, 'endsOn')}: {formatDate(c.endsAt)}
                        </span>
                      )}
                    </header>
                    <p>{language === 'en' && c.promptEn ? c.promptEn : c.prompt}</p>
                    <footer className="cm2-challenge-footer">
                      {c.participants !== undefined && (
                        <span className="cm2-challenge-participants">
                          {c.participants} {t(language, 'participants')}
                        </span>
                      )}
                      {onJoinChallenge && (
                        <button
                          className="cm2-btn cm2-btn--primary"
                          onClick={() => onJoinChallenge(c.id)}
                        >
                          {t(language, 'join')}
                        </button>
                      )}
                    </footer>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>

        <div className="cm2-col">
          <section className="cm2-card">
            <h2>{t(language, 'leaderboardTitle')}</h2>
            {leaderboard.length === 0 ? (
              <div className="cm2-empty">{t(language, 'noLeaderboard')}</div>
            ) : (
              <ol className="cm2-leaderboard">
                {leaderboard.map((entry) => (
                  <li
                    key={entry.id}
                    className={`cm2-leaderboard-row ${entry.isCurrentUser ? 'is-me' : ''}`}
                  >
                    <span className="cm2-leaderboard-rank">#{entry.rank}</span>
                    <span className="cm2-leaderboard-name">
                      {entry.displayName}
                      {entry.isCurrentUser && (
                        <span className="cm2-leaderboard-you"> ({t(language, 'you')})</span>
                      )}
                    </span>
                    <span className="cm2-leaderboard-xp">{entry.xp} XP</span>
                  </li>
                ))}
              </ol>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default CommunityPageV2;
