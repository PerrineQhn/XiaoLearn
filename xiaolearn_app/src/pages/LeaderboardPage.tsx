/**
 * LeaderboardPage — task #44 (refonte Seonsaengnim V2.2)
 * --------------------------------------------------------
 * Classement temps-réel des apprenants XiaoLearn.
 *
 * Layout à la Seonsaengnim :
 *   ┌───────────────────────────────────────────────┬────────────────┐
 *   │ ← Retour                                      │                │
 *   │ Classement 🏆                                 │ Système de     │
 *   │ Compare-toi aux meilleurs…                    │   Rangs        │
 *   │                                               │                │
 *   │ ┌ TA POSITION ACTUELLE     EXP ─┐             │ 🌱 Apprenti    │
 *   │ │ [P] Utilisateur Niv.1  #594/642│             │ 📘 Étudiant    │
 *   │ │     🌱 Apprenti         40 EXP │             │ ⚔️ Guerrier    │
 *   │ │ ▓▓░░░░░░░░░░░░  Top 93%       │             │ 🥋 Maître      │
 *   │ └───────────────────────────────┘             │ 🐉 Légende     │
 *   │                                               │                │
 *   │ [🏆 EXP Total] [⚔ Bat.] [🔥 Série] [📘 Voc.] [Hebdo|Total]│ Stats rapides│
 *   │                                               │  👥 642 appre. │
 *   │          🥈       👑                           │  🔥 27j        │
 *   │                   V                            │  🥋 V.Storms   │
 *   │          A     Virginie Storms    🥉           │                │
 *   │        8662      13 603 EXP       J           │                │
 *   │      ┌───┐    ┌──────┐    Julien Genel        │                │
 *   │      │ 2 │    │  1   │   6903                 │                │
 *   │      └───┘    └──────┘    ┌──┐                │                │
 *   │                           │3 │                │                │
 *   │                           └──┘                │                │
 *   │                                               │                │
 *   │  #4 [av] zamyloo27 Niv.35 ▓▓▓▓▓ 🔥27j  6867   │                │
 *   │  #5 [av] ennatg    Niv.34 ▓▓▓▓░ 🔥21j  6725   │                │
 *   │  ...                                          │                │
 *   └───────────────────────────────────────────────┴────────────────┘
 */

import { useMemo, useState } from 'react';
import '../styles/community-battles.css';
import { useLeaderboard } from '../hooks/useLeaderboard';
import type { CommunityLanguage, PublicProfile } from '../types/community';
import { getRankFromXp, rankLabel, RANK_TIERS } from '../types/community';
import type { LeaderboardEntry } from '../hooks/useLeaderboard';

export interface LeaderboardPageProps {
  language?: CommunityLanguage;
  onBack?: () => void;
  /**
   * Profils additionnels à injecter côté client (bot DEV, etc).
   * Dédupliqué par uid avec les profils Firestore.
   */
  injectExtra?: PublicProfile[];
}

type Tab = 'xp' | 'battles' | 'streak' | 'vocab';
type XpScope = 'weekly' | 'total';

const COPY = {
  fr: {
    back: '← Retour',
    title: 'Classement',
    subtitle:
      'Compare-toi aux meilleurs apprenants de la communauté XiaoLearn.',
    myLabel: 'TA POSITION ACTUELLE',
    exp: 'EXP',
    victoires: 'VICTOIRES',
    series: 'SÉRIE',
    mots: 'MOTS',
    loading: 'Chargement du classement…',
    emptyAll: 'Pas encore assez d\'apprenants pour afficher un classement. Reviens bientôt 👀',
    tabXp: 'EXP Total',
    tabBattles: 'Batailles',
    tabStreak: 'Série',
    tabVocab: 'Vocabulaire',
    scopeWeekly: 'Hebdo',
    scopeTotal: 'Total',
    xpTotalSuffix: 'EXP',
    xpWeeklySuffix: 'EXP',
    battlesWon: 'victoires',
    streakDays: 'jours',
    vocabWords: 'mots maîtrisés',
    you: 'toi',
    topPct: (p: number) => `Top ${p}%`,
    progressVers: 'Progression vers',
    tiersTitle: 'Système de Rangs',
    quickStats: 'Stats rapides',
    totalLearners: 'Total participants',
    learners: 'apprenants',
    longestStreak: 'Plus longue série',
    bestPlayer: 'Meilleur joueur',
    bestVocab: 'Plus de mots',
    days: 'jours',
    maxRank: 'Rang maximum 🐉'
  },
  en: {
    back: '← Back',
    title: 'Leaderboard',
    subtitle: 'See how you stack up against the top XiaoLearn learners.',
    myLabel: 'YOUR CURRENT POSITION',
    exp: 'XP',
    victoires: 'WINS',
    series: 'STREAK',
    mots: 'WORDS',
    loading: 'Loading leaderboard…',
    emptyAll: 'Not enough learners yet to build a leaderboard. Check back soon 👀',
    tabXp: 'Total XP',
    tabBattles: 'Battles',
    tabStreak: 'Streak',
    tabVocab: 'Vocabulary',
    scopeWeekly: 'Weekly',
    scopeTotal: 'All-time',
    xpTotalSuffix: 'XP',
    xpWeeklySuffix: 'XP',
    battlesWon: 'wins',
    streakDays: 'days',
    vocabWords: 'words mastered',
    you: 'you',
    topPct: (p: number) => `Top ${p}%`,
    progressVers: 'Progress toward',
    tiersTitle: 'Rank System',
    quickStats: 'Quick stats',
    totalLearners: 'Total participants',
    learners: 'learners',
    longestStreak: 'Longest streak',
    bestPlayer: 'Best player',
    bestVocab: 'Most words',
    days: 'days',
    maxRank: 'Max tier 🐉'
  }
} as const;

type CopyShape = (typeof COPY)['fr'];
const t = <K extends keyof CopyShape>(
  lang: CommunityLanguage,
  k: K
): CopyShape[K] => COPY[lang][k] as CopyShape[K];

/* Simple formule Niv. à partir d'XP : ~200 XP par niveau (calibré pour coller
   à l'échelle affichée dans la spec : 6867 XP → Niv. 35). */
const levelFromXp = (xp: number): number =>
  Math.max(1, Math.floor((xp || 0) / 200) + 1);

const formatNumber = (n: number): string => n.toLocaleString();

const truncate = (s: string, max = 22): string =>
  (s ?? '').length > max ? `${s.slice(0, max - 1)}…` : s ?? '';

const Avatar = ({
  photoURL,
  displayName,
  size = 40
}: {
  photoURL: string | null;
  displayName: string;
  size?: number;
}) => {
  const initials = (displayName || '?')
    .trim()
    .split(/\s+/)
    .map((s) => s[0] ?? '')
    .slice(0, 2)
    .join('')
    .toUpperCase();
  if (photoURL) {
    return (
      <img
        className="cv-avatar"
        src={photoURL}
        alt={displayName}
        style={{ width: size, height: size, borderRadius: '50%' }}
        referrerPolicy="no-referrer"
      />
    );
  }
  return (
    <span
      className="cv-avatar cv-avatar--fallback"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {initials}
    </span>
  );
};

const LeaderboardPage = ({ language = 'fr', onBack, injectExtra }: LeaderboardPageProps) => {
  const leaderboard = useLeaderboard({ injectExtra });
  const [tab, setTab] = useState<Tab>('xp');
  const [xpScope, setXpScope] = useState<XpScope>('total');

  const currentList: LeaderboardEntry[] = useMemo(() => {
    if (tab === 'xp') {
      return xpScope === 'weekly' ? leaderboard.byWeeklyXp : leaderboard.byTotalXp;
    }
    if (tab === 'battles') return leaderboard.byBattlesWon;
    if (tab === 'streak') return leaderboard.byStreak;
    return leaderboard.byVocabSize;
  }, [tab, xpScope, leaderboard]);

  const statValue = (e: LeaderboardEntry): number => {
    if (tab === 'xp') return xpScope === 'weekly' ? e.weeklyXp : e.totalXp;
    if (tab === 'battles') return e.battlesWon;
    if (tab === 'streak') return e.streakCurrent;
    return e.vocabSize;
  };

  const statSuffix = (): string => {
    if (tab === 'xp')
      return xpScope === 'weekly' ? t(language, 'xpWeeklySuffix') : t(language, 'xpTotalSuffix');
    if (tab === 'battles') return t(language, 'battlesWon');
    if (tab === 'streak') return t(language, 'streakDays');
    return t(language, 'vocabWords');
  };

  const myRankLabelForTab = (): string => {
    if (tab === 'xp') return t(language, 'exp');
    if (tab === 'battles') return t(language, 'victoires');
    if (tab === 'streak') return t(language, 'series');
    return t(language, 'mots');
  };

  const podium = currentList.slice(0, 3);
  const rest = currentList.slice(3);

  const me = leaderboard.me;
  const myRankInCurrent = useMemo(() => {
    if (!me) return null;
    const idx = currentList.findIndex((e) => e.uid === me.uid);
    return idx >= 0 ? idx + 1 : null;
  }, [currentList, me]);

  const showPinnedMe = me != null && myRankInCurrent != null && myRankInCurrent > 20;

  const myRank = me ? getRankFromXp(me.totalXp) : null;
  const myLevel = me ? levelFromXp(me.totalXp) : 1;
  const topPctValue = useMemo(() => {
    if (!me || !myRankInCurrent || currentList.length === 0) return null;
    return Math.max(1, Math.round((myRankInCurrent / currentList.length) * 100));
  }, [me, myRankInCurrent, currentList]);

  /* Sidebar — Stats rapides */
  const totalParticipants = leaderboard.all.length;
  const longestStreakProfile = useMemo(() => {
    return leaderboard.all.reduce<{ name: string; days: number } | null>(
      (acc, p) => {
        const days = Math.max(p.streakBest ?? 0, p.streakCurrent ?? 0);
        if (!acc || days > acc.days) return { name: p.displayName, days };
        return acc;
      },
      null
    );
  }, [leaderboard.all]);
  const bestPlayer = leaderboard.byTotalXp[0] ?? null;

  /* Max progress bar scale pour la table (relatif au #1 du courant) */
  const maxStat = currentList[0] ? statValue(currentList[0]) : 0;

  const currentTierIdx = myRank
    ? RANK_TIERS.findIndex((r) => r.name === myRank.tier.name)
    : 0;

  return (
    <div className="lb-root cv-root">
      {onBack && (
        <button className="cv-back-btn" onClick={onBack}>
          {t(language, 'back')}
        </button>
      )}

      {/* 1. TITRE */}
      <header className="lb-header">
        <h1>
          {t(language, 'title')}
          <span className="lb-header-emoji" aria-hidden>🏆</span>
        </h1>
        <p>{t(language, 'subtitle')}</p>
      </header>

      <div className="lb-layout">
        <div className="lb-main">
          {/* 2. TA POSITION ACTUELLE */}
          {me && myRank ? (
            <section className="lb-myrank">
              <div className="lb-myrank-label">
                <span>{t(language, 'myLabel')}</span>
                <span className="lb-myrank-label-right">{myRankLabelForTab()}</span>
              </div>
              <div className="lb-myrank-top">
                <div className="lb-myrank-identity">
                  <Avatar photoURL={me.photoURL} displayName={me.displayName} size={44} />
                  <div className="lb-myrank-identity-text">
                    <div className="lb-myrank-name">
                      <span>{truncate(me.displayName, 18)}</span>
                      <span className="lb-niv-pill">
                        {language === 'fr' ? 'Niv.' : 'Lv.'} {myLevel}
                      </span>
                    </div>
                    <div className="lb-myrank-tier" style={{ color: me.tierColor }}>
                      <span className="lb-myrank-tier-emoji" aria-hidden>{me.tierEmoji}</span>
                      {rankLabel(me.tierName as any, language)}
                    </div>
                  </div>
                </div>
                <div className="lb-myrank-right">
                  {myRankInCurrent != null ? (
                    <>
                      <div className="lb-myrank-position">#{myRankInCurrent}</div>
                      <div className="lb-myrank-total">/ {currentList.length}</div>
                    </>
                  ) : (
                    <div className="lb-myrank-position" aria-hidden>—</div>
                  )}
                  <div className="lb-myrank-value">
                    {formatNumber(statValue(me))} {statSuffix()}
                  </div>
                </div>
              </div>
              {myRank.next && myRank.toNext != null ? (
                <div className="lb-myrank-bar-wrap">
                  <div className="lb-myrank-bar">
                    <div
                      className="lb-myrank-bar-fill"
                      style={{
                        width: `${myRank.progressPct}%`,
                        background: myRank.tier.color
                      }}
                    />
                  </div>
                  <div className="lb-myrank-bottom">
                    <span className="lb-myrank-next">
                      {t(language, 'progressVers')} {myRank.next.emoji}{' '}
                      {rankLabel(myRank.next.name, language)}
                    </span>
                    {topPctValue != null && (
                      <span className="lb-myrank-percent">{t(language, 'topPct')(topPctValue)}</span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="lb-myrank-max">{t(language, 'maxRank')}</div>
              )}
            </section>
          ) : null}

          {/* 3. TABS + SEGMENTED SCOPE */}
          <div className="lb-controls">
            <nav className="lb-tabs" role="tablist">
              {(
                [
                  { id: 'xp', label: t(language, 'tabXp'), icon: '🏆' },
                  { id: 'battles', label: t(language, 'tabBattles'), icon: '⚔' },
                  { id: 'streak', label: t(language, 'tabStreak'), icon: '🔥' },
                  { id: 'vocab', label: t(language, 'tabVocab'), icon: '📘' }
                ] as Array<{ id: Tab; label: string; icon: string }>
              ).map((def) => (
                <button
                  key={def.id}
                  role="tab"
                  aria-selected={tab === def.id}
                  className={`lb-tab ${tab === def.id ? 'is-active' : ''}`}
                  onClick={() => setTab(def.id)}
                >
                  <span className="lb-tab-icon" aria-hidden>{def.icon}</span>
                  {def.label}
                </button>
              ))}
            </nav>
            {tab === 'xp' && (
              <div className="lb-scope" role="group" aria-label="scope">
                {(
                  [
                    { id: 'weekly', label: t(language, 'scopeWeekly') },
                    { id: 'total', label: t(language, 'scopeTotal') }
                  ] as Array<{ id: XpScope; label: string }>
                ).map((def) => (
                  <button
                    key={def.id}
                    className={`lb-scope-btn ${xpScope === def.id ? 'is-active' : ''}`}
                    onClick={() => setXpScope(def.id)}
                  >
                    {def.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 4. PODIUM + TABLE */}
          {leaderboard.loading ? (
            <div className="lb-loading">{t(language, 'loading')}</div>
          ) : currentList.length === 0 ? (
            <div className="lb-empty">{t(language, 'emptyAll')}</div>
          ) : (
            <>
              {/* Podium */}
              {podium.length > 0 && (
                <section className="lb-podium" aria-label="Top 3">
                  <div className="lb-podium-grid">
                    {/* Ordre visuel : 2e à gauche, 1er au centre, 3e à droite */}
                    {[podium[1], podium[0], podium[2]].map((entry, idx) => {
                      if (!entry)
                        return (
                          <div
                            key={`empty-${idx}`}
                            className="lb-podium-slot lb-podium-slot--empty"
                          />
                        );
                      const trueRank = entry.rankPosition;
                      const medal = trueRank === 1 ? '🥇' : trueRank === 2 ? '🥈' : '🥉';
                      const heightClass =
                        trueRank === 1
                          ? 'is-first'
                          : trueRank === 2
                          ? 'is-second'
                          : 'is-third';
                      return (
                        <div
                          key={entry.uid}
                          className={`lb-podium-slot ${heightClass} ${
                            entry.isMe ? 'is-me' : ''
                          }`}
                        >
                          {trueRank === 1 && (
                            <div className="lb-podium-crown" aria-hidden>👑</div>
                          )}
                          <div className="lb-podium-avatar-wrap">
                            <Avatar
                              photoURL={entry.photoURL}
                              displayName={entry.displayName}
                              size={trueRank === 1 ? 64 : 52}
                            />
                            <span className="lb-podium-medal" aria-hidden>{medal}</span>
                          </div>
                          <div
                            className="lb-podium-name"
                            title={entry.displayName}
                          >
                            {truncate(entry.displayName, trueRank === 1 ? 18 : 14)}
                          </div>
                          <div className="lb-podium-stat">
                            <div className="lb-podium-stat-value">
                              {formatNumber(statValue(entry))}
                            </div>
                            <div className="lb-podium-stat-suffix">
                              {statSuffix()}
                            </div>
                          </div>
                          <div className="lb-podium-bar" aria-hidden>
                            {trueRank}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* Table */}
              {rest.length > 0 && (
                <section className="lb-table" aria-label="Full ranking">
                  {rest.map((entry) => {
                    const v = statValue(entry);
                    const pct = maxStat > 0 ? Math.max(3, Math.round((v / maxStat) * 100)) : 0;
                    const lvl = levelFromXp(entry.totalXp);
                    return (
                      <article
                        key={entry.uid}
                        className={`lb-row ${entry.isMe ? 'is-me' : ''}`}
                      >
                        <div className="lb-row-rank">#{entry.rankPosition}</div>
                        <Avatar
                          photoURL={entry.photoURL}
                          displayName={entry.displayName}
                          size={36}
                        />
                        <div className="lb-row-name">
                          <div className="lb-row-name-main">
                            <span className="lb-row-name-main-text">
                              {truncate(entry.displayName)}
                            </span>
                            {entry.isMe && (
                              <span className="lb-row-you">({t(language, 'you')})</span>
                            )}
                          </div>
                          <div
                            className="lb-row-tier"
                            style={{ color: entry.tierColor }}
                          >
                            {entry.tierEmoji} {rankLabel(entry.tierName as any, language)}
                          </div>
                        </div>
                        <span className="lb-row-level">
                          {language === 'fr' ? 'Niv.' : 'Lv.'} {lvl}
                        </span>
                        <div className="lb-row-bar" aria-hidden>
                          <div
                            className="lb-row-bar-fill"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        {entry.streakCurrent > 0 ? (
                          <span className="lb-row-streak">
                            🔥 {entry.streakCurrent}
                            {language === 'fr' ? 'j' : 'd'}
                          </span>
                        ) : (
                          <span className="lb-row-streak" aria-hidden />
                        )}
                        <div className="lb-row-stat">{formatNumber(v)}</div>
                      </article>
                    );
                  })}
                </section>
              )}

              {/* Pinned me si hors du top 20 */}
              {showPinnedMe && me && myRankInCurrent && (
                <aside className="lb-pinned">
                  <div className="lb-pinned-hint">{t(language, 'myLabel')}</div>
                  <article className="lb-row is-me is-pinned">
                    <div className="lb-row-rank">#{myRankInCurrent}</div>
                    <Avatar
                      photoURL={me.photoURL}
                      displayName={me.displayName}
                      size={36}
                    />
                    <div className="lb-row-name">
                      <div className="lb-row-name-main">
                        <span className="lb-row-name-main-text">
                          {truncate(me.displayName)}
                        </span>
                        <span className="lb-row-you">({t(language, 'you')})</span>
                      </div>
                      <div className="lb-row-tier" style={{ color: me.tierColor }}>
                        {me.tierEmoji} {rankLabel(me.tierName as any, language)}
                      </div>
                    </div>
                    <span className="lb-row-level">
                      {language === 'fr' ? 'Niv.' : 'Lv.'} {levelFromXp(me.totalXp)}
                    </span>
                    <div className="lb-row-bar" aria-hidden />
                    <span className="lb-row-streak" aria-hidden />
                    <div className="lb-row-stat">
                      {formatNumber(statValue(me))}
                    </div>
                  </article>
                </aside>
              )}
            </>
          )}
        </div>

        {/* SIDEBAR */}
        <aside className="lb-sidebar">
          {/* Système de Rangs */}
          <div className="lb-aside-card">
            <h3 className="lb-aside-title">
              <span aria-hidden>👑</span> {t(language, 'tiersTitle')}
            </h3>
            <ul className="lb-tiers">
              {RANK_TIERS.map((tier, i) => {
                const label = rankLabel(tier.name, language);
                const isCurrent = i === currentTierIdx;
                const max = tier.max === Number.POSITIVE_INFINITY ? '∞' : tier.max;
                return (
                  <li
                    key={tier.name}
                    className={`lb-tier-row ${isCurrent ? 'is-current' : ''}`}
                  >
                    <span className="lb-tier-emoji" aria-hidden>{tier.emoji}</span>
                    <span className="lb-tier-name">{label}</span>
                    <span className="lb-tier-range">
                      {tier.min === 0 ? '0' : `${tier.min / 1000}k`} -{' '}
                      {typeof max === 'number' ? `${(max + 1) / 1000}k` : max}
                    </span>
                  </li>
                );
              })}
            </ul>
            {me && myRank && myRank.next && myRank.toNext != null && (
              <div className="lb-aside-progress">
                <div className="lb-aside-progress-head">
                  <span className="lb-aside-progress-head-label">
                    {t(language, 'progressVers')} {myRank.next.emoji}{' '}
                    {rankLabel(myRank.next.name, language)}
                  </span>
                  <span>
                    {formatNumber(me.totalXp)} / {formatNumber(myRank.next.min)}
                  </span>
                </div>
                <div className="lb-aside-progress-bar">
                  <div
                    className="lb-aside-progress-bar-fill"
                    style={{ width: `${myRank.progressPct}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Stats rapides */}
          <div className="lb-aside-card">
            <h3 className="lb-aside-title">{t(language, 'quickStats')}</h3>
            <ul className="lb-stats-list">
              <li className="lb-stat-row">
                <span className="lb-stat-bubble lb-stat-bubble--yellow" aria-hidden>🏆</span>
                <div className="lb-stat-meta">
                  <span className="lb-stat-label">{t(language, 'totalLearners')}</span>
                  <span className="lb-stat-value">
                    {formatNumber(totalParticipants)} {t(language, 'learners')}
                  </span>
                </div>
              </li>
              {longestStreakProfile && longestStreakProfile.days > 0 && (
                <li className="lb-stat-row">
                  <span className="lb-stat-bubble lb-stat-bubble--orange" aria-hidden>🔥</span>
                  <div className="lb-stat-meta">
                    <span className="lb-stat-label">{t(language, 'longestStreak')}</span>
                    <span className="lb-stat-value">
                      {longestStreakProfile.days} {t(language, 'days')}
                      <span className="lb-stat-value-sub">
                        ({truncate(longestStreakProfile.name, 14)})
                      </span>
                    </span>
                  </div>
                </li>
              )}
              {bestPlayer && (
                <li className="lb-stat-row">
                  <span className="lb-stat-bubble lb-stat-bubble--jade" aria-hidden>🥋</span>
                  <div className="lb-stat-meta">
                    <span className="lb-stat-label">{t(language, 'bestPlayer')}</span>
                    <span className="lb-stat-value">
                      {truncate(bestPlayer.displayName, 14)}
                      <span className="lb-stat-value-sub">
                        ({formatNumber(bestPlayer.totalXp)} {t(language, 'exp')})
                      </span>
                    </span>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default LeaderboardPage;
