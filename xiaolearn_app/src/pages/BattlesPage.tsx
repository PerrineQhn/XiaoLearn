/**
 * BattlesPage — task #44 (refonte Seonsaengnim V2.2)
 * ---------------------------------------------------
 * Page d'accueil des batailles de mots. Source de vérité pour lancer une
 * partie, voir ses stats perso et l'historique récent.
 *
 * Gate : au moins 4 leçons complétées (spec task #44). Si moins, on
 * affiche un état verrouillé avec explication.
 *
 * Layout Seonsaengnim-like :
 *   ┌─────────────────────────────────────────────────┐
 *   │ ← Retour                                        │
 *   │              [⚔ tuile jade]                     │
 *   │           Batailles de mots                     │
 *   │    Teste ton vocabulaire contre un adversaire!  │
 *   │                                                 │
 *   │         [  ⚔ Lancer une bataille  ]             │
 *   │                                                 │
 *   │ ┌ 🏆 VICT │ ❌ DÉF │ 🔥 SÉRIE │ 🎯 RATIO ┐     │
 *   │ │   0     │   0    │    0     │    0%    │     │
 *   │ └─────────┴────────┴──────────┴──────────┘     │
 *   │                                                 │
 *   │ Débutant                          0 victoires   │
 *   │ ▓▓▓░░░░░░░░░░░░░░░                             │
 *   │                            Prochain : Combattant│
 *   │                                                 │
 *   │ Batailles récentes                              │
 *   │ (liste ou empty)                                │
 *   └─────────────────────────────────────────────────┘
 */

import '../styles/community-battles.css';
import { useMemo } from 'react';
import type { BattleWordSourceItem } from '../utils/battleWords';
import type { CommunityLanguage } from '../types/community';
import type { BattleStatsState, BattleResultRecord } from '../hooks/useBattleStats';
import { buildBattleWordPool } from '../utils/battleWords';

export interface BattlesPageProps {
  language?: CommunityLanguage;
  lessonsCompleted: number;
  battleWordSources: BattleWordSourceItem[];
  stats: BattleStatsState;
  lost: number;
  winRatePct: number;
  isQueueing: boolean;
  queueSecondsLeft: number;
  onStartBattle: () => void;
  onCancelQueue: () => void;
  onBack?: () => void;
  /** Mode DEV actif : affiche le bouton "Défier le bot (DEV)". */
  isDevMode?: boolean;
  /** Lance une bataille contre le bot DEV (sans queue). */
  onStartBotBattle?: () => void;
}

const MIN_LESSONS_TO_UNLOCK = 4;
const MIN_WORDS_TO_START = 10;

/* Battle tier ladder (victoires) — inspiré de la progression Seonsaengnim */
const BATTLE_TIERS = [
  { name: 'Débutant', nameEn: 'Beginner', min: 0 },
  { name: 'Combattant', nameEn: 'Fighter', min: 5 },
  { name: 'Vétéran', nameEn: 'Veteran', min: 15 },
  { name: 'Champion', nameEn: 'Champion', min: 30 },
  { name: 'Maître', nameEn: 'Master', min: 60 },
  { name: 'Légende', nameEn: 'Legend', min: 100 }
] as const;

type BattleTier = (typeof BATTLE_TIERS)[number];

const getBattleTier = (wins: number): { current: BattleTier; next: BattleTier | null; progressPct: number; toNext: number } => {
  let currentIdx = 0;
  for (let i = BATTLE_TIERS.length - 1; i >= 0; i--) {
    if (wins >= BATTLE_TIERS[i].min) {
      currentIdx = i;
      break;
    }
  }
  const current = BATTLE_TIERS[currentIdx];
  const next = BATTLE_TIERS[currentIdx + 1] ?? null;
  if (!next) return { current, next: null, progressPct: 100, toNext: 0 };
  const span = next.min - current.min;
  const offset = Math.max(0, wins - current.min);
  return {
    current,
    next,
    progressPct: Math.max(0, Math.min(100, Math.round((offset / span) * 100))),
    toNext: next.min - wins
  };
};

const computeWinStreak = (recent: BattleResultRecord[]): number => {
  // recent est trié du plus récent au plus ancien
  let n = 0;
  for (const r of recent) {
    if (r.outcome === 'win') n++;
    else break;
  }
  return n;
};

const COPY = {
  fr: {
    back: '← Retour',
    title: 'Batailles de mots',
    subtitle:
      'Teste ton vocabulaire contre un adversaire ! Réponds plus vite pour gagner chaque round.',
    lockedTitle: '🔒 Débloque les batailles',
    lockedBody: (n: number) =>
      `Termine ${n} leçon${n > 1 ? 's' : ''} de plus pour débloquer ton arène. ${MIN_LESSONS_TO_UNLOCK} leçons minimum sont requises.`,
    vocabTooSmall: (n: number) =>
      `Il te faut au moins ${MIN_WORDS_TO_START} mots appris pour lancer une bataille (actuellement : ${n}).`,
    startBtn: 'Lancer une bataille',
    queueing: 'Recherche d\'un adversaire…',
    queueCancel: 'Annuler',
    botBtn: '🤖 Défier le bot (DEV)',
    botHint: 'Bataille instantanée contre un adversaire fictif — stats non comptabilisées.',
    rewardLine: (base: number, perfect: number) =>
      `Victoire : +${base} XP · Score parfait : +${perfect} XP`,
    victoires: 'Victoires',
    defaites: 'Défaites',
    serie: 'Série',
    ratio: 'Ratio',
    victoiresSuffix: 'victoires',
    next: 'Prochain',
    maxRank: 'Rang maximum atteint 🐉',
    historyTitle: 'Batailles récentes',
    historyEmptyTitle: 'Aucune bataille jouée pour le moment.',
    historyEmpty: 'Lance ta première bataille !',
    perfectBadge: 'PARFAIT',
    win: 'Victoire',
    loss: 'Défaite',
    drawWord: 'Nul',
    vs: 'vs'
  },
  en: {
    back: '← Back',
    title: 'Word battles',
    subtitle:
      'Test your vocabulary against an opponent! Answer faster to win each round.',
    lockedTitle: '🔒 Unlock battles',
    lockedBody: (n: number) =>
      `Complete ${n} more lesson${n > 1 ? 's' : ''} to unlock your arena. A minimum of ${MIN_LESSONS_TO_UNLOCK} lessons is required.`,
    vocabTooSmall: (n: number) =>
      `You need at least ${MIN_WORDS_TO_START} learned words to start a battle (currently: ${n}).`,
    startBtn: 'Start a battle',
    queueing: 'Finding an opponent…',
    queueCancel: 'Cancel',
    botBtn: '🤖 Challenge the bot (DEV)',
    botHint: 'Instant battle against a fictional opponent — stats not counted.',
    rewardLine: (base: number, perfect: number) =>
      `Win: +${base} XP · Perfect score: +${perfect} XP`,
    victoires: 'Wins',
    defaites: 'Losses',
    serie: 'Streak',
    ratio: 'Ratio',
    victoiresSuffix: 'wins',
    next: 'Next',
    maxRank: 'Max tier reached 🐉',
    historyTitle: 'Recent battles',
    historyEmptyTitle: 'No battle played yet.',
    historyEmpty: 'Start your first battle!',
    perfectBadge: 'PERFECT',
    win: 'Win',
    loss: 'Loss',
    drawWord: 'Draw',
    vs: 'vs'
  }
} as const;

type CopyShape = (typeof COPY)['fr'];
const t = <K extends keyof CopyShape>(
  lang: CommunityLanguage,
  k: K
): CopyShape[K] => COPY[lang][k] as CopyShape[K];

const Avatar = ({
  photoURL,
  displayName,
  size = 32
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

const fmtDate = (ts: number, lang: CommunityLanguage) => {
  try {
    return new Date(ts).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
      day: 'numeric',
      month: 'short'
    });
  } catch {
    return '';
  }
};

const BattlesPage = (props: BattlesPageProps) => {
  const {
    language = 'fr',
    lessonsCompleted,
    battleWordSources,
    stats,
    lost,
    winRatePct,
    isQueueing,
    queueSecondsLeft,
    onStartBattle,
    onCancelQueue,
    onBack,
    isDevMode = false,
    onStartBotBattle
  } = props;

  const lessonsLocked = lessonsCompleted < MIN_LESSONS_TO_UNLOCK;
  const wordPool = useMemo(
    () => buildBattleWordPool(battleWordSources, { language: language ?? 'fr', maxWords: 20 }),
    [battleWordSources, language]
  );
  const vocabLocked = !lessonsLocked && wordPool.length < MIN_WORDS_TO_START;
  const canStart = !lessonsLocked && !vocabLocked;

  const winStreak = useMemo(() => computeWinStreak(stats.recent), [stats.recent]);
  const tierInfo = useMemo(() => getBattleTier(stats.won), [stats.won]);
  const tierName = language === 'fr' ? tierInfo.current.name : tierInfo.current.nameEn;
  const nextTierName = tierInfo.next
    ? (language === 'fr' ? tierInfo.next.name : tierInfo.next.nameEn)
    : null;

  return (
    <div className="bt-root cv-root">
      {onBack && (
        <button className="cv-back-btn" onClick={onBack}>
          {t(language, 'back')}
        </button>
      )}

      {/* 1. HERO CENTRÉ */}
      <header className="bt-hero">
        <div className="bt-hero-tile" aria-hidden>⚔️</div>
        <h1>{t(language, 'title')}</h1>
        <p>{t(language, 'subtitle')}</p>
      </header>

      {/* 2. CTA CENTRÉ (ou état verrouillé) */}
      {lessonsLocked ? (
        <section className="bt-locked">
          <h2>{t(language, 'lockedTitle')}</h2>
          <p>{COPY[language].lockedBody(MIN_LESSONS_TO_UNLOCK - lessonsCompleted)}</p>
          {/* DEV: bouton bot reste accessible même avec les gates — permet
              à l'admin de tester le flow sans avoir à terminer 4 leçons. */}
          {isDevMode && onStartBotBattle && (
            <div className="bt-dev-bot">
              <button
                type="button"
                className="bt-dev-bot-btn"
                onClick={onStartBotBattle}
              >
                {t(language, 'botBtn')}
              </button>
              <p className="bt-dev-bot-hint">{t(language, 'botHint')}</p>
            </div>
          )}
        </section>
      ) : (
        <div className="bt-cta-wrap">
          {isQueueing ? (
            <div className="bt-queue">
              <span className="bt-queue-spinner" aria-hidden>⏳</span>
              <span className="bt-queue-label">{t(language, 'queueing')}</span>
              <span className="bt-queue-timer">{queueSecondsLeft}s</span>
              <button
                type="button"
                className="bt-queue-cancel"
                onClick={onCancelQueue}
              >
                {t(language, 'queueCancel')}
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="bt-cta-btn"
              disabled={!canStart}
              onClick={onStartBattle}
            >
              <span className="bt-cta-btn-icon" aria-hidden>⚔️</span>
              {t(language, 'startBtn')}
            </button>
          )}
          <p className="bt-cta-reward">{COPY[language].rewardLine(30, 50)}</p>
          {vocabLocked && (
            <p className="bt-cta-warn">
              ⚠️ {COPY[language].vocabTooSmall(wordPool.length)}
            </p>
          )}
          {/* DEV: bouton bot ACTIF en permanence (même pendant queue,
              même si vocabLocked) — le hook auto-annule la queue et
              utilise FALLBACK_BATTLE_POOL si besoin. */}
          {isDevMode && onStartBotBattle && (
            <div className="bt-dev-bot">
              <button
                type="button"
                className="bt-dev-bot-btn"
                onClick={onStartBotBattle}
              >
                {t(language, 'botBtn')}
              </button>
              <p className="bt-dev-bot-hint">{t(language, 'botHint')}</p>
            </div>
          )}
        </div>
      )}

      {/* 3. STATS ROW 4 COLONNES */}
      <section className="bt-stats" aria-label="stats">
        <div className="bt-stat">
          <div className="bt-stat-icon bt-stat-icon--trophy" aria-hidden>🏆</div>
          <div className="bt-stat-body">
            <span className="bt-stat-label">{t(language, 'victoires')}</span>
            <span className="bt-stat-value">{stats.won}</span>
          </div>
        </div>
        <div className="bt-stat">
          <div className="bt-stat-icon bt-stat-icon--loss" aria-hidden>✕</div>
          <div className="bt-stat-body">
            <span className="bt-stat-label">{t(language, 'defaites')}</span>
            <span className="bt-stat-value">{lost}</span>
          </div>
        </div>
        <div className="bt-stat">
          <div className="bt-stat-icon bt-stat-icon--streak" aria-hidden>🔥</div>
          <div className="bt-stat-body">
            <span className="bt-stat-label">{t(language, 'serie')}</span>
            <span className="bt-stat-value">
              {winStreak}
              <span className="bt-stat-suffix">{t(language, 'victoiresSuffix')}</span>
            </span>
          </div>
        </div>
        <div className="bt-stat">
          <div className="bt-stat-icon bt-stat-icon--ratio" aria-hidden>🎯</div>
          <div className="bt-stat-body">
            <span className="bt-stat-label">{t(language, 'ratio')}</span>
            <span className="bt-stat-value">{winRatePct}%</span>
          </div>
        </div>
      </section>

      {/* 4. PROGRESSION DE RANG */}
      <section className="bt-rank" aria-label="rank progress">
        <div className="bt-rank-head">
          <span className="bt-rank-name">{tierName}</span>
          <span className="bt-rank-count">
            {stats.won} {t(language, 'victoiresSuffix')}
          </span>
        </div>
        {nextTierName ? (
          <>
            <div className="bt-rank-bar">
              <div
                className="bt-rank-bar-fill"
                style={{ width: `${tierInfo.progressPct}%` }}
              />
            </div>
            <div className="bt-rank-next">
              <span className="bt-rank-next-label">{t(language, 'next')} :</span>
              <span className="bt-rank-next-name">{nextTierName}</span>
            </div>
          </>
        ) : (
          <div className="bt-rank-max">{t(language, 'maxRank')}</div>
        )}
      </section>

      {/* 5. BATAILLES RÉCENTES */}
      <section className="bt-recent" aria-label="recent battles">
        <h3 className="bt-recent-head">{t(language, 'historyTitle')}</h3>
        {stats.recent.length === 0 ? (
          <div className="bt-recent-empty">
            <div className="bt-recent-empty-title">{t(language, 'historyEmptyTitle')}</div>
            <div>{t(language, 'historyEmpty')}</div>
          </div>
        ) : (
          <ul className="bt-recent-list">
            {stats.recent.slice(0, 8).map((r) => (
              <li
                key={r.matchId}
                className={`bt-recent-row bt-recent-row--${r.outcome}`}
              >
                <Avatar photoURL={r.opponent.photoURL} displayName={r.opponent.displayName} />
                <div className="bt-recent-who">
                  <div className="bt-recent-name">
                    {t(language, 'vs')} {r.opponent.displayName}
                  </div>
                  <div className="bt-recent-meta">
                    {r.myScore}–{r.oppScore} · {fmtDate(r.finishedAt, language)}
                  </div>
                </div>
                <div className="bt-recent-right">
                  <span className={`bt-recent-outcome bt-recent-outcome--${r.outcome}`}>
                    {r.outcome === 'win'
                      ? t(language, 'win')
                      : r.outcome === 'loss'
                      ? t(language, 'loss')
                      : t(language, 'drawWord')}
                  </span>
                  {r.perfect && (
                    <span className="bt-recent-perfect">
                      {t(language, 'perfectBadge')}
                    </span>
                  )}
                  {r.xp > 0 && (
                    <span className="bt-recent-xp">+{r.xp} XP</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default BattlesPage;
