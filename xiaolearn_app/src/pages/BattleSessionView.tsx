/**
 * BattleSessionView — vue partagée d'une session de bataille
 * -----------------------------------------------------------
 * Composant 100% présentationnel (pas de Firestore, pas de hook métier).
 * Prend en props un `session: UseBattleSessionResult` + callbacks, et affiche :
 *   - loading / erreur / écran de fin / round actif
 *
 * Utilisé par deux pages :
 *   - `BattleSessionPage`      → session Firestore (useBattleSession)
 *   - `BattleSessionPageLocal` → session 100% locale (useLocalBotSession)
 *
 * Cette séparation permet de jouer un match contre le bot DEV même si
 * Firestore est indisponible (quota, offline), tout en gardant une seule
 * implémentation du rendu.
 */

import '../styles/community-battles.css';
import { useEffect, useRef } from 'react';
import { battleXpReward } from '../types/community';
import type { BattleMatch, CommunityLanguage } from '../types/community';
import type { UseBattleSessionResult } from '../hooks/useBattleSession';

export interface BattleSessionViewProps {
  session: UseBattleSessionResult;
  language?: CommunityLanguage;
  /**
   * Identifiant du match (utilisé uniquement pour reset l'idempotence de
   * `onMatchEnded` quand on change de match). En local, passer `match.id`.
   */
  matchKey: string;
  onMatchEnded?: (payload: {
    match: BattleMatch;
    outcome: 'win' | 'loss' | 'draw';
    xp: number;
    perfect: boolean;
    myScore: number;
    oppScore: number;
  }) => void;
  onBack?: () => void;
  onRematch?: () => void;
}

const COPY = {
  fr: {
    loading: 'Préparation de la bataille…',
    errorTitle: 'Oups',
    errorBody: 'Le match a été interrompu. Retourne au hub et relance une bataille.',
    roundLabel: (n: number, total: number) => `Round ${n}/${total}`,
    waitingForOpp: "L'adversaire réfléchit…",
    iAnsweredHint: "Belle rapidité ! On attend l'autre joueur.",
    timeLeft: (s: string) => `${s} s`,
    back: '← Retour',
    leave: 'Abandonner',
    win: 'Victoire',
    loss: 'Défaite',
    draw: 'Match nul',
    perfectBanner: 'Score parfait 🎯',
    xpEarned: (xp: number) => (xp > 0 ? `+${xp} XP` : 'Aucun XP'),
    finalScore: 'Score final',
    rematch: 'Rejouer',
    toHub: 'Retour au hub',
    vs: 'VS',
    you: 'Toi',
    opp: 'Adversaire',
    correct: 'Bonne réponse !',
    wrong: 'Mauvaise réponse',
    timedOut: 'Trop tard !'
  },
  en: {
    loading: 'Setting up the battle…',
    errorTitle: 'Oops',
    errorBody: 'The match was interrupted. Go back to the hub and start a new one.',
    roundLabel: (n: number, total: number) => `Round ${n}/${total}`,
    waitingForOpp: 'Your opponent is thinking…',
    iAnsweredHint: 'Quick one! Waiting for the other player.',
    timeLeft: (s: string) => `${s} s`,
    back: '← Back',
    leave: 'Forfeit',
    win: 'Victory',
    loss: 'Defeat',
    draw: 'Draw',
    perfectBanner: 'Perfect score 🎯',
    xpEarned: (xp: number) => (xp > 0 ? `+${xp} XP` : 'No XP'),
    finalScore: 'Final score',
    rematch: 'Play again',
    toHub: 'Back to hub',
    vs: 'VS',
    you: 'You',
    opp: 'Opponent',
    correct: 'Correct!',
    wrong: 'Wrong answer',
    timedOut: 'Too slow!'
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
  size = 48
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

const BattleSessionView = (props: BattleSessionViewProps) => {
  const { session, language = 'fr', matchKey, onMatchEnded, onBack, onRematch } = props;

  const {
    match,
    loading,
    error,
    iAmP1,
    currentRound,
    totalRounds,
    timeLeft,
    iAnswered,
    oppAnswered,
    isFinished,
    outcome,
    myScore,
    oppScore,
    submitAnswer
  } = session;

  // onMatchEnded : émis une seule fois par match à la transition → finished.
  const endedFiredRef = useRef(false);
  useEffect(() => {
    if (!match) return;
    if (!isFinished || !outcome || endedFiredRef.current) return;
    const { xp, perfect } = battleXpReward(myScore, oppScore, totalRounds);
    endedFiredRef.current = true;
    onMatchEnded?.({
      match,
      outcome,
      xp,
      perfect,
      myScore,
      oppScore
    });
  }, [match, isFinished, outcome, myScore, oppScore, totalRounds, onMatchEnded]);

  useEffect(() => {
    endedFiredRef.current = false;
  }, [matchKey]);

  // ---------------------------------------------------------------
  //  États d'attente / erreur
  // ---------------------------------------------------------------
  if (loading || !match) {
    if (error) {
      return (
        <div className="bs-root cv-root">
          <div className="bs-error">
            <h2>{t(language, 'errorTitle')}</h2>
            <p>{t(language, 'errorBody')}</p>
            <button
              type="button"
              className="bt-btn bt-btn--primary"
              onClick={() => onBack?.()}
            >
              {t(language, 'toHub')}
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="bs-root cv-root">
        <div className="bs-loading">
          <div className="bs-spinner" aria-hidden>⚔️</div>
          <p>{t(language, 'loading')}</p>
        </div>
      </div>
    );
  }

  const me = iAmP1 ? match.p1 : match.p2;
  const opp = iAmP1 ? match.p2 : match.p1;

  // ---------------------------------------------------------------
  //  Écran de fin
  // ---------------------------------------------------------------
  if (isFinished && outcome) {
    const { xp, perfect } = battleXpReward(myScore, oppScore, totalRounds);
    const outcomeLabel =
      outcome === 'win'
        ? t(language, 'win')
        : outcome === 'loss'
        ? t(language, 'loss')
        : t(language, 'draw');

    return (
      <div className="bs-root cv-root">
        <div className={`bs-final bs-final--${outcome}`}>
          <div className="bs-final-emoji" aria-hidden>
            {outcome === 'win' ? '🏆' : outcome === 'loss' ? '💥' : '🤝'}
          </div>
          <h1>{outcomeLabel}</h1>

          {perfect && (
            <div className="bs-final-perfect">{t(language, 'perfectBanner')}</div>
          )}

          <div className="bs-final-score">
            <div className="bs-final-side">
              <Avatar photoURL={me.photoURL} displayName={me.displayName} size={56} />
              <div className="bs-final-name">{me.displayName}</div>
              <div className="bs-final-points">{myScore}</div>
            </div>
            <div className="bs-final-vs">{t(language, 'vs')}</div>
            <div className="bs-final-side">
              <Avatar photoURL={opp.photoURL} displayName={opp.displayName} size={56} />
              <div className="bs-final-name">{opp.displayName}</div>
              <div className="bs-final-points">{oppScore}</div>
            </div>
          </div>

          <div className="bs-final-xp">{t(language, 'xpEarned')(xp)}</div>

          <div className="bs-final-actions">
            {onRematch && (
              <button
                type="button"
                className="bt-btn bt-btn--primary"
                onClick={onRematch}
              >
                {t(language, 'rematch')}
              </button>
            )}
            {onBack && (
              <button
                type="button"
                className="bt-btn bt-btn--ghost"
                onClick={onBack}
              >
                {t(language, 'toHub')}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------
  //  Écran de round actif
  // ---------------------------------------------------------------
  const word = match.words[currentRound];
  const timeSec = (timeLeft / 1000).toFixed(1);
  // La barre est calée sur la durée du round côté user (voir ROUND_DURATION_MS).
  // Garder aligné si la durée évolue.
  const ROUND_DURATION_MS_VIEW = 6000;
  const timePct = Math.max(
    0,
    Math.min(100, (timeLeft / ROUND_DURATION_MS_VIEW) * 100)
  );

  const myAnswersList = iAmP1 ? match.p1Answers : match.p2Answers;
  const lastAnswer = myAnswersList.find((a) => a.roundIdx === currentRound) ?? null;

  return (
    <div className="bs-root cv-root">
      <header className="bs-header">
        <div className="bs-header-side">
          <Avatar photoURL={me.photoURL} displayName={me.displayName} size={48} />
          <div className="bs-header-meta">
            <div className="bs-header-label">{t(language, 'you')}</div>
            <div className="bs-header-name">{me.displayName}</div>
          </div>
          <div className="bs-header-score">{myScore}</div>
        </div>
        <div className="bs-header-center">
          <div className="bs-round-badge">
            {t(language, 'roundLabel')(currentRound + 1, totalRounds)}
          </div>
          <div className="bs-header-vs" aria-hidden>{t(language, 'vs')}</div>
        </div>
        <div className="bs-header-side bs-header-side--right">
          <div className="bs-header-score">{oppScore}</div>
          <div className="bs-header-meta bs-header-meta--right">
            <div className="bs-header-label">{t(language, 'opp')}</div>
            <div className="bs-header-name">{opp.displayName}</div>
          </div>
          <Avatar photoURL={opp.photoURL} displayName={opp.displayName} size={48} />
        </div>
      </header>

      {word ? (
        <section className="bs-word">
          <div className="bs-word-hanzi">{word.chinese}</div>
          <div className="bs-word-pinyin">{word.pinyin}</div>
        </section>
      ) : (
        <section className="bs-word">
          <div className="bs-word-hanzi">…</div>
        </section>
      )}

      <div className="bs-timer" aria-hidden>
        <div
          className={`bs-timer-fill ${
            timeLeft < 1500 ? 'is-critical' : timeLeft < 3000 ? 'is-warning' : ''
          }`}
          style={{ width: `${timePct}%` }}
        />
      </div>
      <div className="bs-timer-label">{t(language, 'timeLeft')(timeSec)}</div>

      {word && (
        <div className="bs-choices">
          {word.choices.map((choice, idx) => {
            const isPicked = lastAnswer?.choiceIdx === idx;
            const isCorrect = iAnswered && idx === word.correctIndex;
            const classNames = [
              'bs-choice',
              isPicked ? 'is-picked' : '',
              iAnswered && isPicked && lastAnswer?.correct ? 'is-correct' : '',
              iAnswered && isPicked && !lastAnswer?.correct ? 'is-wrong' : '',
              iAnswered && !isPicked && isCorrect ? 'is-reveal' : ''
            ]
              .filter(Boolean)
              .join(' ');
            return (
              <button
                key={`${currentRound}-${idx}`}
                type="button"
                className={classNames}
                disabled={iAnswered}
                onClick={() => submitAnswer(idx)}
              >
                <span className="bs-choice-idx">{String.fromCharCode(65 + idx)}</span>
                <span className="bs-choice-label">{choice}</span>
              </button>
            );
          })}
        </div>
      )}

      {iAnswered && !oppAnswered && (
        <div className="bs-waiting">
          <div className="bs-waiting-spinner" aria-hidden>⏳</div>
          <div className="bs-waiting-title">{t(language, 'waitingForOpp')}</div>
          <div className="bs-waiting-hint">{t(language, 'iAnsweredHint')}</div>
        </div>
      )}

      {iAnswered && lastAnswer && (
        <div
          className={`bs-feedback bs-feedback--${
            lastAnswer.choiceIdx < 0
              ? 'timeout'
              : lastAnswer.correct
              ? 'ok'
              : 'ko'
          }`}
        >
          {lastAnswer.choiceIdx < 0
            ? t(language, 'timedOut')
            : lastAnswer.correct
            ? t(language, 'correct')
            : t(language, 'wrong')}
        </div>
      )}

      {onBack && (
        <button
          type="button"
          className="bs-leave"
          onClick={() => onBack()}
        >
          {t(language, 'leave')}
        </button>
      )}
    </div>
  );
};

export default BattleSessionView;
