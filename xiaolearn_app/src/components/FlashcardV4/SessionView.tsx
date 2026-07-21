/**
 * SessionView.tsx — V9 flashcards
 * --------------------------------------------------------------
 * Runner d'une session de flashcards en mode "single pile". Iterate through
 * `cards`, displays the current card with the appropriate StudyMode component,
 * shows the rating buttons (Difficile/Bien/Simple) after reveal, and calls
 * `onFinish(summary)` when the pile is empty.
 *
 * V20 — UI 3 boutons : Difficile (again/qualité 1) · Bien (good/qualité 3)
 * · Simple (easy/qualité 4). Le niveau intermédiaire "hard" (qualité 2)
 * n'est plus exposé à l'utilisateur mais reste disponible côté SRS pour
 * un futur retour à 4 niveaux si besoin.
 *
 * Branchement avec useFlashcardSRS / useWordSRS : le parent fournit
 * `onRate(cardId, quality)` qui appelle `answerCard(quality)` ou
 * `wordSrs.rate(id, quality)` en interne. Ce composant NE connaît PAS la
 * logique SRS ; il ne fait que collecter les ratings et appeler le callback.
 *
 * Le parent peut également fournir `onCardReviewed(rating)` pour mettre à
 * jour l'activité quotidienne (heatmap) à chaque carte.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { FlashcardDirection } from '../../types/flashcard-v3';
import { resolveEffectiveDirection } from '../../types/flashcard-v3';
import type { SrsSkill } from '../../hooks/useWordSRS';
import {
  type FlashcardSessionSummary,
  type ReviewRating,
  type StudyMode,
  RATING_TO_QUALITY,
  XP_PER_RATING
} from '../../types/flashcard-v4';
import {
  FlipCard,
  McqCard,
  TypingCard,
  ListeningCard,
  PronunciationCard,
  WritingCard,
  type StudyCard
} from './StudyModeComponents';

// ============================================================================
//  SKILL MAPPING
// ============================================================================

/**
 * Compétence SRS testée selon le mode d'étude et la direction effective :
 *   - listening              → recognition (entendre le hanzi → comprendre)
 *   - typing                 → pronunciation (produire la forme depuis le sens)
 *   - pronunciation (micro)  → pronunciation
 *   - writing (HanziWriter)  → writing
 *   - flip / mcq / speed     → selon la direction effective de la carte :
 *       hanzi→fr = recognition (on voit le hanzi, on retrouve le sens)
 *       fr→hanzi = pronunciation (on doit produire le mot chinois)
 */
export function skillForStudyMode(
  mode: StudyMode,
  effectiveDirection: 'hanzi-to-fr' | 'fr-to-hanzi'
): SrsSkill {
  switch (mode) {
    case 'listening':
      return 'recognition';
    case 'typing':
    case 'pronunciation':
      return 'pronunciation';
    case 'writing':
      return 'writing';
    case 'flip':
    case 'mcq':
    case 'speed':
    default:
      return effectiveDirection === 'hanzi-to-fr' ? 'recognition' : 'pronunciation';
  }
}

// ============================================================================
//  PROPS
// ============================================================================

export interface SessionViewProps {
  mode: StudyMode;
  direction: FlashcardDirection;
  cards: StudyCard[];
  language: 'fr' | 'en';
  /** Passé à McqCard pour générer les distracteurs. */
  distractorPool?: StudyCard[];
  /**
   * Appelé quand l'utilisateur note une carte — passe la *qualité* 1-4
   * directement compatible avec answerCard() de useFlashcardSRS, plus la
   * compétence SRS testée (recognition / pronunciation / writing), dérivée
   * du mode d'étude et de la direction effective de la carte.
   */
  onRate: (cardId: string, quality: 1 | 2 | 3 | 4, skill?: SrsSkill) => void;
  /** Appelé à chaque carte revue (pour heatmap / daily activity). */
  onCardReviewed?: (rating: ReviewRating) => void;
  /** Appelé quand la dernière carte est soumise. */
  onFinish: (summary: FlashcardSessionSummary) => void;
  /** Appelé quand l'utilisateur quitte en cours de session. */
  onAbort?: () => void;
}

// ============================================================================
//  COMPONENT
// ============================================================================

export function SessionView({
  mode,
  direction,
  cards,
  language,
  distractorPool,
  onRate,
  onCardReviewed,
  onFinish,
  onAbort
}: SessionViewProps) {
  const startedAtRef = useRef<number>(Date.now());
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [lastAutoResult, setLastAutoResult] = useState<boolean | null>(null);
  const [flipSignal, setFlipSignal] = useState(0);
  const [counts, setCounts] = useState({
    again: 0,
    hard: 0,
    good: 0,
    easy: 0,
    correct: 0
  });
  const [xp, setXp] = useState(0);
  const [newlyMasteredIds] = useState<string[]>([]);

  const card = cards[index];
  const total = cards.length;

  // Reset sur changement de carte
  // On réinitialise aussi flipSignal : sinon, si l'utilisateur a pressé Espace
  // sur la carte précédente, la valeur non-nulle resterait dans le FlipCard
  // nouvellement monté (avec key={card.id}) et déclencherait un auto-flip.
  useEffect(() => {
    setRevealed(false);
    setLastAutoResult(null);
    setFlipSignal(0);
  }, [index, mode]);

  // Guard : session vide
  useEffect(() => {
    if (total === 0) {
      const now = Date.now();
      onFinish({
        mode,
        direction,
        startedAt: startedAtRef.current,
        endedAt: now,
        totalCards: 0,
        correctCount: 0,
        againCount: 0,
        hardCount: 0,
        goodCount: 0,
        easyCount: 0,
        xpEarned: 0,
        newlyMasteredIds: []
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  if (!card) {
    return null;
  }

  // -- Handlers -------------------------------------------------------------

  // NB : on n'utilise PAS `if (!revealed) setRevealed(true)` ici. Cette closure
  // est capturée dans le useMemo ci-dessous avec `card.id` comme dep : après la
  // carte 1 (où `revealed` est passé à true), quand on avance d'une carte, le
  // useEffect [index, mode] remet `revealed=false`, mais la version memoizée
  // du modeContent garde l'ancienne closure où `revealed=true`. Résultat : sur
  // la carte 2, `onReveal()` appelle ce handler, voit `revealed=true` (stale)
  // et court-circuite — les boutons de notation n'apparaissent jamais.
  // setRevealed(true) est idempotent côté React, donc pas besoin du garde.
  const handleReveal = () => {
    setRevealed(true);
  };

  const handleAutoResult = (result: { wasCorrect: boolean }) => {
    setLastAutoResult(result.wasCorrect);
  };

  const handleRate = (rating: ReviewRating) => {
    const quality = RATING_TO_QUALITY[rating];
    // Compétence SRS testée : dépend du mode et, pour flip/mcq, de la
    // direction EFFECTIVE de la carte courante (résolue par carte en 'mixed').
    const skill = skillForStudyMode(mode, resolveEffectiveDirection(direction, card.id));
    onRate(card.id, quality, skill);
    onCardReviewed?.(rating);
    const xpInc = XP_PER_RATING[rating];
    setXp((x) => x + xpInc);
    setCounts((c) => {
      const next = { ...c };
      if (rating === 'again') next.again += 1;
      if (rating === 'hard') next.hard += 1;
      if (rating === 'good') {
        next.good += 1;
        next.correct += 1;
      }
      if (rating === 'easy') {
        next.easy += 1;
        next.correct += 1;
      }
      return next;
    });
    // Avance
    if (index + 1 >= total) {
      // Fin
      finish({
        againInc: rating === 'again' ? 1 : 0,
        hardInc: rating === 'hard' ? 1 : 0,
        goodInc: rating === 'good' ? 1 : 0,
        easyInc: rating === 'easy' ? 1 : 0,
        xpInc,
        correctInc: rating === 'good' || rating === 'easy' ? 1 : 0
      });
    } else {
      setIndex((i) => i + 1);
    }
  };

  /**
   * Mode 'writing' : saute la carte SANS la noter (aucune donnée de traits
   * disponible pour le mot — on ne veut pas polluer le SRS).
   */
  const handleSkipCard = () => {
    if (index + 1 >= total) {
      finish({
        againInc: 0,
        hardInc: 0,
        goodInc: 0,
        easyInc: 0,
        xpInc: 0,
        correctInc: 0
      });
    } else {
      setIndex((i) => i + 1);
    }
  };

  const finish = (deltas: {
    againInc: number;
    hardInc: number;
    goodInc: number;
    easyInc: number;
    xpInc: number;
    correctInc: number;
  }) => {
    const now = Date.now();
    onFinish({
      mode,
      direction,
      startedAt: startedAtRef.current,
      endedAt: now,
      totalCards: total,
      correctCount: counts.correct + deltas.correctInc,
      againCount: counts.again + deltas.againInc,
      hardCount: counts.hard + deltas.hardInc,
      goodCount: counts.good + deltas.goodInc,
      easyCount: counts.easy + deltas.easyInc,
      xpEarned: xp + deltas.xpInc,
      newlyMasteredIds
    });
  };

  // -- Rendu mode -----------------------------------------------------------

  // V18 — Si direction = 'mixed', on résout PAR CARTE (hash stable de card.id).
  // ~50% des cartes seront hanzi→fr, ~50% fr→hanzi, fixé pour la session.
  const effectiveDirection = resolveEffectiveDirection(direction, card.id);

  const modeProps = {
    card,
    direction: effectiveDirection,
    language,
    onReveal: handleReveal,
    onSubmit: handleAutoResult,
    distractorPool
  };

  // IMPORTANT : on passe `key={card.id}` pour forcer un remount complet
  // quand on passe à la carte suivante. Sans le key, React réconcilie le
  // même composant et l'état local (flipped, picked, input…) reste entre
  // deux cartes, ce qui provoquait le blocage sur la 2ᵉ carte (les ratings
  // ne s'affichaient plus car handleReveal se trouvait court-circuité).
  const modeContent = useMemo(() => {
    switch (mode) {
      case 'flip':
        return <FlipCard key={card.id} {...modeProps} externalFlipSignal={flipSignal} />;
      case 'mcq':
        return <McqCard key={card.id} {...modeProps} />;
      case 'typing':
        return <TypingCard key={card.id} {...modeProps} />;
      case 'listening':
        return <ListeningCard key={card.id} {...modeProps} />;
      case 'pronunciation':
        return <PronunciationCard key={card.id} {...modeProps} />;
      case 'writing':
        // Rating automatique selon les erreurs de traçage (0→easy, 1-2→good,
        // 3-5→hard, >5 ou Révéler→again) — voir WritingCard. onSkip avance
        // sans noter (mot sans données de traits sur le CDN).
        return (
          <WritingCard
            key={card.id}
            {...modeProps}
            onAutoRate={handleRate}
            onSkip={handleSkipCard}
          />
        );
      case 'speed':
      default:
        // Le mode speed est géré par un composant distinct — ce cas ne
        // devrait pas se produire depuis SessionView (le parent route ailleurs).
        return <FlipCard key={card.id} {...modeProps} externalFlipSignal={flipSignal} />;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, card.id, direction, language, flipSignal]);

  // -- Raccourcis clavier (espace/flèches) — façon Seonsaengnim --------------
  const forbidGood =
    (mode === 'mcq' || mode === 'typing' || mode === 'listening') &&
    lastAutoResult === false;

  const triggerFlip = useCallback(() => {
    setFlipSignal((n) => n + 1);
  }, []);

  useEffect(() => {
    if (mode !== 'flip') return;
    const onKey = (e: KeyboardEvent) => {
      // Évite de capter les touches dans un input/textarea (zone de saisie).
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;

      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        if (!revealed) triggerFlip();
        return;
      }
      if (!revealed) return;
      // V20 — Raccourcis 1/2/3 pour les 3 boutons exposés (Difficile / Bien / Simple).
      // Mapping quality : Difficile=1 (again), Bien=3 (good), Simple=4 (easy).
      // Alias flèches : ← = Difficile, → = Bien (backward-compat).
      if (e.key === '1') {
        e.preventDefault();
        handleRate('again');
      } else if (e.key === '2') {
        e.preventDefault();
        if (!forbidGood) handleRate('good');
      } else if (e.key === '3') {
        e.preventDefault();
        if (!forbidGood) handleRate('easy');
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handleRate('again');
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (!forbidGood) handleRate('good');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, revealed, forbidGood, card.id]);

  // Flag direction (drapeaux) façon Seonsaengnim.
  // Mode 'mixed' : on affiche le drapeau correspondant à la direction
  // effective de la carte courante (donc il change d'une carte à l'autre).
  const directionFlag = direction === 'mixed'
    ? (effectiveDirection === 'hanzi-to-fr' ? '🇨🇳→🇫🇷 🔀' : '🇫🇷→🇨🇳 🔀')
    : (direction === 'hanzi-to-fr' ? '🇨🇳→🇫🇷' : '🇫🇷→🇨🇳');
  const progressPct = Math.min(100, Math.round(((index + (revealed ? 0.5 : 0)) / Math.max(total, 1)) * 100));

  return (
    <div className="fc4-session">
      {/* Topbar minimaliste : Quitter · drapeau · progress bar · counter */}
      <div className="fc4-session-header">
        {onAbort ? (
          <button type="button" className="fc4-session-abort" onClick={onAbort}>
            {language === 'fr' ? '✕ Quitter' : '✕ Exit'}
          </button>
        ) : (
          <span className="fc4-session-abort fc4-session-abort--placeholder" aria-hidden />
        )}
        <div className="fc4-session-dirflag" aria-label="direction">
          {directionFlag}
        </div>
        <div className="fc4-session-progress">
          <div className="fc4-session-progress-bar">
            <div
              className="fc4-session-progress-fill"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
        <div className="fc4-session-counter">
          {index + 1} / {total}
        </div>
        <span className="fc4-session-xp" aria-label="xp">
          +{xp} XP
        </span>
      </div>

      {/* Carte active */}
      <div className="fc4-session-stage">{modeContent}</div>

      {/* Boutons rating — 3 niveaux exposés (Difficile / Bien / Simple).
          Mapping quality : Difficile=1 (again), Bien=3 (good), Simple=4 (easy).
          Le rating quality=2 (hard) reste dispo côté SRS mais n'est plus
          exposé à l'UI. Masqués en mode 'writing' : la note est automatique
          (dérivée des erreurs de traçage). */}
      {mode !== 'writing' && (
      <div className={`fc4-session-ratings fc4-session-ratings--3 ${revealed ? 'is-visible' : ''}`}>
        <button
          type="button"
          className="fc4-rating fc4-rating--again"
          onClick={() => handleRate('again')}
          disabled={!revealed}
          aria-label={language === 'fr' ? 'Difficile' : 'Hard'}
          title={language === 'fr' ? 'Touche 1 — pas retrouvé' : 'Key 1 — didn\'t know'}
        >
          <span className="fc4-rating-icon" aria-hidden>✗</span>
          <span className="fc4-rating-label">
            {language === 'fr' ? 'Difficile' : 'Hard'}
          </span>
          <span className="fc4-rating-kbd" aria-hidden>1</span>
        </button>
        <button
          type="button"
          className={`fc4-rating fc4-rating--good ${forbidGood ? 'fc4-rating--forbidden' : ''}`}
          onClick={() => !forbidGood && handleRate('good')}
          disabled={!revealed || forbidGood}
          aria-label={language === 'fr' ? 'Bien' : 'Good'}
          title={
            forbidGood
              ? language === 'fr' ? 'Réponse fausse — choisir Difficile' : 'Answer incorrect — pick Hard'
              : language === 'fr' ? 'Touche 2 — retrouvé' : 'Key 2 — recalled'
          }
        >
          <span className="fc4-rating-icon" aria-hidden>✓</span>
          <span className="fc4-rating-label">
            {language === 'fr' ? 'Bien' : 'Good'}
          </span>
          <span className="fc4-rating-kbd" aria-hidden>2</span>
        </button>
        <button
          type="button"
          className={`fc4-rating fc4-rating--easy ${forbidGood ? 'fc4-rating--forbidden' : ''}`}
          onClick={() => !forbidGood && handleRate('easy')}
          disabled={!revealed || forbidGood}
          aria-label={language === 'fr' ? 'Simple' : 'Easy'}
          title={
            forbidGood
              ? language === 'fr' ? 'Réponse fausse — choisir Difficile' : 'Answer incorrect — pick Hard'
              : language === 'fr' ? 'Touche 3 — instantané' : 'Key 3 — instant'
          }
        >
          <span className="fc4-rating-icon" aria-hidden>★</span>
          <span className="fc4-rating-label">
            {language === 'fr' ? 'Simple' : 'Easy'}
          </span>
          <span className="fc4-rating-kbd" aria-hidden>3</span>
        </button>
      </div>
      )}

      {/* Indices clavier sous la carte */}
      {mode !== 'writing' && (
        <div className={`fc4-session-kbd ${revealed ? 'is-visible' : ''}`}>
          {language === 'fr'
            ? 'Espace : retourner · 1 Difficile · 2 Bien · 3 Simple'
            : 'Space: flip · 1 Hard · 2 Good · 3 Easy'}
        </div>
      )}
    </div>
  );
}

// ============================================================================
//  SPEED ROUND (mode chrono 60s)
// ============================================================================

export interface SpeedRoundProps {
  cards: StudyCard[];
  direction: FlashcardDirection;
  language: 'fr' | 'en';
  durationSec?: number;
  onFinish: (summary: FlashcardSessionSummary) => void;
  onAbort?: () => void;
  onCardReviewed?: (rating: ReviewRating) => void;
  onRate: (cardId: string, quality: 1 | 2 | 3 | 4, skill?: SrsSkill) => void;
}

/**
 * Mode chrono : ~60 secondes, chaque carte montre hanzi + pinyin et 2 gros
 * boutons 👎 Loupé / 👍 Retrouvé. Les ratings sont mappés en qualité 1 ou 3.
 */
export function SpeedRound({
  cards,
  direction,
  language,
  durationSec = 60,
  onFinish,
  onAbort,
  onCardReviewed,
  onRate
}: SpeedRoundProps) {
  const startedAtRef = useRef<number>(Date.now());
  const [remaining, setRemaining] = useState<number>(durationSec);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [missed, setMissed] = useState(0);
  const [xp, setXp] = useState(0);
  const [finished, setFinished] = useState(false);

  const card = cards[index % cards.length];

  // Timer
  useEffect(() => {
    if (finished) return;
    const id = window.setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          window.clearInterval(id);
          setFinished(true);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [finished]);

  // Fin → summary
  useEffect(() => {
    if (!finished) return;
    const now = Date.now();
    onFinish({
      mode: 'speed',
      direction,
      startedAt: startedAtRef.current,
      endedAt: now,
      totalCards: correct + missed,
      correctCount: correct,
      againCount: missed,
      hardCount: 0,
      goodCount: correct,
      easyCount: 0,
      xpEarned: xp,
      newlyMasteredIds: []
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished]);

  const frontFr = direction === 'hanzi-to-fr';
  const meaning = language === 'fr' ? card?.translationFr : card?.translationEn ?? card?.translationFr;

  const handleMark = (ok: boolean) => {
    if (!card || finished) return;
    // Speed round : même mapping que flip — hanzi affiché = recognition,
    // sens affiché (fr→hanzi ou mixed) = production orale.
    onRate(card.id, ok ? 3 : 1, skillForStudyMode('speed', frontFr ? 'hanzi-to-fr' : 'fr-to-hanzi'));
    onCardReviewed?.(ok ? 'good' : 'again');
    setXp((x) => x + (ok ? XP_PER_RATING.good : XP_PER_RATING.again));
    if (ok) setCorrect((c) => c + 1);
    else setMissed((m) => m + 1);
    setIndex((i) => i + 1);
  };

  return (
    <div className="fc4-speed">
      <div className="fc4-speed-header">
        <div className="fc4-speed-timer">
          <span className="fc4-speed-timer-value">{remaining}</span>
          <span className="fc4-speed-timer-unit">s</span>
        </div>
        <div className="fc4-speed-score">
          <span className="fc4-speed-score-good">{correct}</span>
          <span className="fc4-speed-score-sep">/</span>
          <span className="fc4-speed-score-missed">{missed}</span>
        </div>
        {onAbort ? (
          <button type="button" className="fc4-session-abort" onClick={onAbort}>
            {language === 'fr' ? '✕ Quitter' : '✕ Exit'}
          </button>
        ) : null}
      </div>

      {!finished && card ? (
        <div className="fc4-speed-card">
          {frontFr ? (
            <>
              <div className="fc4-speed-hanzi">{card.hanzi}</div>
              <div className="fc4-speed-pinyin">{card.pinyin}</div>
            </>
          ) : (
            <>
              <div className="fc4-speed-meaning">{meaning}</div>
              <div className="fc4-speed-pinyin">{card.pinyin}</div>
            </>
          )}
        </div>
      ) : (
        <div className="fc4-speed-card fc4-speed-card--done">
          {language === 'fr' ? 'Terminé !' : 'Done!'}
        </div>
      )}

      <div className="fc4-speed-actions">
        <button
          type="button"
          className="fc4-speed-btn fc4-speed-btn--miss"
          onClick={() => handleMark(false)}
          disabled={finished}
        >
          👎 {language === 'fr' ? 'Loupé' : 'Miss'}
        </button>
        <button
          type="button"
          className="fc4-speed-btn fc4-speed-btn--good"
          onClick={() => handleMark(true)}
          disabled={finished}
        >
          👍 {language === 'fr' ? 'Retrouvé' : 'Got it'}
        </button>
      </div>
    </div>
  );
}
