/**
 * StudyModeComponents.tsx — V9 flashcards
 * --------------------------------------------------------------
 * 4 modes d'étude compacts, co-localisés dans un seul fichier pour réduire
 * le nombre d'imports et simplifier la maintenance :
 *
 *   - FlipCard       : retourner la carte (mode par défaut)
 *   - McqCard        : 4 choix
 *   - TypingCard     : input (pinyin ou traduction)
 *   - ListeningCard  : TTS → input
 *
 * Le composant Speed est distinct car sa boucle est différente (timer +
 * pile de cartes auto-avancée) — voir SpeedRound.tsx si activé plus tard.
 *
 * Chaque composant respecte la même interface :
 *   - reçoit `{ card, direction, language, onReveal, onSubmit }`
 *   - appelle `onReveal()` dès que le recto est "découvert"
 *   - appelle `onSubmit({ wasCorrect })` quand l'utilisateur valide
 *
 * Les ratings (again/hard/good/easy) ne sont PAS gérés ici — c'est le
 * parent (SessionView) qui les affiche après révélation.
 */

import type { MouseEvent as ReactMouseEvent } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { FlashcardDirection } from '../../types/flashcard-v3';
import { playHanziAudio, preloadHanziAudio } from '../../utils/audio';
import PronunciationCheck from '../PronunciationCheck';
import {
  isAzureSpeechSupported as pronunciationSupported,
  recognizeWithAzure as pronunciationRecognize,
  AzureSpeechAbortedError
} from '../../services/pronunciationServiceAzure';
import HanziWriterPad, {
  type HanziWriterQuizStats
} from '../HanziWriterPad';

// ============================================================================
//  TYPES PARTAGÉS
// ============================================================================

export interface StudyCard {
  id: string;
  hanzi: string;
  pinyin: string;
  translationFr: string;
  translationEn?: string;
  exampleHanzi?: string;
  exampleTranslationFr?: string;
  exampleTranslationEn?: string;
  /** Catégorie optionnelle (ex. "mot", "expression", "caractère") — affichée en pill badge coin haut-gauche façon Seonsaengnim. */
  category?: string;
  /** Libellé court de la leçon d'origine — affiché en breadcrumb pied de carte. */
  lessonLabel?: string;
  /** URL audio optionnelle (MP3/WAV Azure TTS). Quand présente, remplace
   *  Web Speech → son identique Chrome / Safari / mobile. */
  audio?: string;
}

export interface StudyModeProps {
  card: StudyCard;
  direction: FlashcardDirection;
  language: 'fr' | 'en';
  /** Appelé dès que la réponse est révélée — déclenche les boutons rating côté parent. */
  onReveal: () => void;
  /** Appelé quand l'utilisateur soumet une réponse (mcq/typing/listening). */
  onSubmit?: (result: { wasCorrect: boolean }) => void;
  /** Pool utilisé pour générer des distracteurs (QCM). */
  distractorPool?: StudyCard[];
  /**
   * Signal externe pour retourner la carte (utilisé par SessionView pour le
   * raccourci clavier Espace). À chaque incrément, FlipCard se retourne.
   */
  externalFlipSignal?: number;
}

// ============================================================================
//  HELPER — normalisation / comparaison
// ============================================================================

/** Strip accents + lowercase + trim — pour comparer pinyin/traduction. */
function normalize(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, ' ')
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase();
}

function pinyinEquals(a: string, b: string): boolean {
  // Tolère les tons numériques (ni3 = nǐ). On retire les chiffres 1-5 finaux
  // de syllabes, puis on normalise.
  const strip = (x: string) =>
    normalize(x.replace(/([a-zü]+)([1-5])/gi, '$1')).replace(/\s/g, '');
  return strip(a) === strip(b);
}

// ============================================================================
//  FLIP CARD (mode par défaut)
// ============================================================================

/**
 * Helper TTS unifié : joue UNIQUEMENT l'audio MP3/WAV pré-enregistré
 * (Azure TTS). Pas de fallback Web Speech — voulu : UX cohérente Chrome /
 * Safari / mobile. Cf. `playHanziAudio` pour la stratégie de résolution :
 * URL explicite → cache → conventions HSK.
 *
 * Utilisé par FlipCard / McqCard / TypingCard / ListeningCard pour le 🔊.
 */
function speakChinese(text: string, audioUrl?: string | null): void {
  playHanziAudio(text, audioUrl).catch(() => {
    // Silencieux : si aucun fichier n'existe, on ne joue rien (éviter un son
    // synthétique différent selon le navigateur). L'utilisateur verra juste
    // le bouton 🔊 sans retour audio — acceptable pour des cartes rares.
  });
}

/** Icône speaker (line-art) — assortie au mic de PronunciationCheck pour que
 *  les deux boutons de la topbar aient la même identité visuelle. */
function SpeakerIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

/** Déduit une catégorie courte pour le pill badge si aucune n'a été fournie. */
function inferCategory(card: StudyCard, language: 'fr' | 'en'): string {
  if (card.category) return card.category;
  const len = Array.from(card.hanzi).length;
  if (language === 'fr') {
    if (len <= 1) return 'caractère';
    if (len <= 3) return 'mot';
    return 'expression';
  }
  if (len <= 1) return 'character';
  if (len <= 3) return 'word';
  return 'expression';
}

export function FlipCard({ card, direction, language, onReveal, externalFlipSignal }: StudyModeProps) {
  const [flipped, setFlipped] = useState(false);
  const frontFr = direction === 'hanzi-to-fr';
  // Le parent remount FlipCard via key={card.id}, donc plus besoin de reset
  // sur card.id — mais on garde un garde-fou au cas où on réintroduirait la
  // réconciliation (composant partagé entre plusieurs cartes).
  useEffect(() => {
    setFlipped(false);
  }, [card.id]);

  // Précharge l'audio en tâche de fond dès que la carte s'affiche : quand
  // l'utilisateur clique sur 🔊 (généralement 1-3s plus tard), le fichier
  // est déjà résolu + bufferé → lecture quasi instantanée.
  useEffect(() => {
    preloadHanziAudio(card.hanzi, card.audio);
  }, [card.hanzi, card.audio]);

  const handleReveal = () => {
    if (flipped) return;
    setFlipped(true);
    onReveal();
  };

  // Signal externe (clavier Espace) → déclenche le flip.
  // On skip le premier passage après le mount : sinon, quand le parent remount
  // le FlipCard pour une nouvelle carte (key={card.id}) alors que flipSignal
  // est encore non-nul (pressé sur la carte précédente), on auto-flip
  // immédiatement la nouvelle carte — bug reproductible à partir de la
  // deuxième carte.
  const mountedRef = useRef(false);
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    if (externalFlipSignal === undefined || externalFlipSignal === 0) return;
    handleReveal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalFlipSignal]);

  const handleSpeak = (e: ReactMouseEvent) => {
    e.stopPropagation();
    speakChinese(card.hanzi, card.audio);
  };

  const frontLabel = frontFr
    ? card.hanzi
    : language === 'fr'
    ? card.translationFr
    : card.translationEn ?? card.translationFr;

  const backMain = frontFr
    ? language === 'fr'
      ? card.translationFr
      : card.translationEn ?? card.translationFr
    : card.hanzi;

  const backPinyin = card.pinyin;
  const category = inferCategory(card, language);
  const retournerLabel = language === 'fr' ? 'Retourner ↩' : 'Flip ↩';

  return (
    <div className={`fc4-flip-card ${flipped ? 'is-flipped' : ''}`} onClick={handleReveal}>
      <div className="fc4-flip-inner">
        {/* ---- FRONT ---- */}
        <div className="fc4-flip-face fc4-flip-front">
          <div className="fc4-card-topbar">
            <span className="fc4-card-badge">{category}</span>
            <div className="fc4-card-actions">
              <button
                type="button"
                className="fc4-card-speaker"
                onClick={handleSpeak}
                aria-label={language === 'fr' ? 'Écouter' : 'Listen'}
              >
                <SpeakerIcon size={20} />
              </button>
              {/* PronunciationCheck wrapped pour ne pas bubble vers handleReveal
                  (qui flippe la carte au click). */}
              <span
                onClick={(e) => e.stopPropagation()}
                style={{ display: 'inline-flex' }}
              >
                <PronunciationCheck
                  hanzi={card.hanzi}
                  pinyin={card.pinyin}
                  size={40}
                  showFeedback={false}
                />
              </span>
            </div>
          </div>
          <div className="fc4-card-body">
            {frontFr ? (
              <>
                <div className="fc4-front-hanzi">{frontLabel}</div>
                <div className="fc4-front-pinyin">{card.pinyin}</div>
              </>
            ) : (
              <div className="fc4-front-meaning">{frontLabel}</div>
            )}
          </div>
          <div className="fc4-card-footer">
            {card.lessonLabel ? (
              <span className="fc4-card-breadcrumb" title={card.lessonLabel}>
                <span aria-hidden>📖</span> {card.lessonLabel}
              </span>
            ) : (
              <span className="fc4-card-breadcrumb fc4-card-breadcrumb--empty" />
            )}
            <span className="fc4-card-flip-hint">{retournerLabel}</span>
          </div>
        </div>

        {/* ---- BACK ---- */}
        <div className="fc4-flip-face fc4-flip-back">
          <div className="fc4-card-topbar">
            <span className="fc4-card-badge fc4-card-badge--inverse">{category}</span>
            <div className="fc4-card-actions">
              <button
                type="button"
                className="fc4-card-speaker fc4-card-speaker--inverse"
                onClick={handleSpeak}
                aria-label={language === 'fr' ? 'Écouter' : 'Listen'}
              >
                <SpeakerIcon size={20} />
              </button>
              <span
                onClick={(e) => e.stopPropagation()}
                style={{ display: 'inline-flex' }}
              >
                <PronunciationCheck
                  hanzi={card.hanzi}
                  pinyin={card.pinyin}
                  size={40}
                  showFeedback={false}
                />
              </span>
            </div>
          </div>
          <div className="fc4-card-body">
            <div className="fc4-back-meaning">{backMain}</div>
            {frontFr ? (
              <div className="fc4-back-pinyin">{backPinyin}</div>
            ) : (
              <>
                <div className="fc4-back-hanzi">{card.hanzi}</div>
                <div className="fc4-back-pinyin">{backPinyin}</div>
              </>
            )}
            {card.exampleHanzi ? (
              <div className="fc4-back-example">
                <div className="fc4-example-hanzi">&ldquo;{card.exampleHanzi}&rdquo;</div>
                {card.exampleTranslationFr ? (
                  <div className="fc4-example-trans">
                    →{' '}
                    {language === 'fr'
                      ? card.exampleTranslationFr
                      : card.exampleTranslationEn ?? card.exampleTranslationFr}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
          <div className="fc4-card-footer">
            {card.lessonLabel ? (
              <span
                className="fc4-card-breadcrumb fc4-card-breadcrumb--inverse"
                title={card.lessonLabel}
              >
                <span aria-hidden>📖</span> {card.lessonLabel}
              </span>
            ) : (
              <span className="fc4-card-breadcrumb fc4-card-breadcrumb--empty" />
            )}
            <span className="fc4-card-flip-hint fc4-card-flip-hint--inverse">
              {retournerLabel}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
//  MCQ CARD — 4 choix
// ============================================================================

export function McqCard({ card, direction, language, onReveal, onSubmit, distractorPool }: StudyModeProps) {
  const frontFr = direction === 'hanzi-to-fr';

  const choices = useMemo(() => {
    const pool = (distractorPool ?? []).filter((c) => c.id !== card.id);
    // Mélange déterministe seedé sur card.id pour stabiliser l'ordre
    // entre re-renders du même tour.
    const shuffled = seedShuffle(pool, card.id).slice(0, 3);
    const options = [card, ...shuffled];
    return seedShuffle(options, `${card.id}|opts`);
  }, [card, distractorPool]);

  const [picked, setPicked] = useState<string | null>(null);
  const revealedRef = useRef(false);

  useEffect(() => {
    setPicked(null);
    revealedRef.current = false;
  }, [card.id]);

  // Preload audio pendant que l'utilisateur lit les choix (cf. FlipCard).
  useEffect(() => {
    preloadHanziAudio(card.hanzi, card.audio);
  }, [card.hanzi, card.audio]);

  const answerFor = (c: StudyCard) =>
    frontFr
      ? language === 'fr'
        ? c.translationFr
        : c.translationEn ?? c.translationFr
      : c.hanzi;

  const prompt = frontFr ? card.hanzi : answerFor(card);
  const category = inferCategory(card, language);

  const handlePick = (choiceId: string) => {
    if (picked) return;
    setPicked(choiceId);
    const wasCorrect = choiceId === card.id;
    if (!revealedRef.current) {
      revealedRef.current = true;
      onReveal();
    }
    onSubmit?.({ wasCorrect });
  };

  const handleSpeak = (e: ReactMouseEvent) => {
    e.stopPropagation();
    speakChinese(card.hanzi, card.audio);
  };

  return (
    <div className="fc4-mcq-card">
      {/* Stage identique à la front face d'une flashcard : topbar + body. */}
      <div className="fc4-study-stage">
        <div className="fc4-card-topbar">
          <span className="fc4-card-badge">{category}</span>
          <button
            type="button"
            className="fc4-card-speaker"
            onClick={handleSpeak}
            aria-label={language === 'fr' ? 'Écouter' : 'Listen'}
          >
            <SpeakerIcon size={20} />
          </button>
        </div>
        <div className="fc4-card-body">
          {frontFr ? (
            <>
              <div className="fc4-front-hanzi">{prompt}</div>
              <div className="fc4-front-pinyin">{card.pinyin}</div>
            </>
          ) : (
            <div className="fc4-front-meaning">{prompt}</div>
          )}
        </div>
      </div>
      <div className="fc4-mcq-choices">
        {choices.map((c) => {
          const isPicked = picked === c.id;
          const isAnswer = c.id === card.id;
          const state =
            picked == null
              ? 'fc4-mcq-choice--idle'
              : isAnswer
              ? 'fc4-mcq-choice--correct'
              : isPicked
              ? 'fc4-mcq-choice--wrong'
              : 'fc4-mcq-choice--dim';
          return (
            <button
              key={c.id}
              className={`fc4-mcq-choice ${state}`}
              onClick={() => handlePick(c.id)}
              disabled={picked != null}
            >
              {answerFor(c)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
//  TYPING CARD — input libre
// ============================================================================

export function TypingCard({ card, direction, language, onReveal, onSubmit }: StudyModeProps) {
  const frontFr = direction === 'hanzi-to-fr';
  const [input, setInput] = useState('');
  const [submitted, setSubmitted] = useState<'correct' | 'wrong' | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setInput('');
    setSubmitted(null);
    // Auto focus sur le champ quand la carte change.
    const t = window.setTimeout(() => inputRef.current?.focus(), 60);
    return () => window.clearTimeout(t);
  }, [card.id]);

  // Preload audio pendant que l'utilisateur tape (cf. FlipCard).
  useEffect(() => {
    preloadHanziAudio(card.hanzi, card.audio);
  }, [card.hanzi, card.audio]);

  const expected = frontFr
    ? card.pinyin
    : language === 'fr'
    ? card.translationFr
    : card.translationEn ?? card.translationFr;

  const category = inferCategory(card, language);

  const handleSubmit = () => {
    if (submitted) return;
    const ok = frontFr
      ? pinyinEquals(input, expected)
      : normalize(input) === normalize(expected);
    setSubmitted(ok ? 'correct' : 'wrong');
    onReveal();
    onSubmit?.({ wasCorrect: ok });
  };

  const handleSpeak = (e: ReactMouseEvent) => {
    e.stopPropagation();
    speakChinese(card.hanzi, card.audio);
  };

  return (
    <div className="fc4-typing-card">
      {/* Stage identique à la front face d'une flashcard. */}
      <div className="fc4-study-stage">
        <div className="fc4-card-topbar">
          <span className="fc4-card-badge">{category}</span>
          <button
            type="button"
            className="fc4-card-speaker"
            onClick={handleSpeak}
            aria-label={language === 'fr' ? 'Écouter' : 'Listen'}
          >
            <SpeakerIcon size={20} />
          </button>
        </div>
        <div className="fc4-card-body">
          {frontFr ? (
            <>
              <div className="fc4-front-hanzi">{card.hanzi}</div>
              <div className="fc4-front-pinyin">{card.pinyin}</div>
            </>
          ) : (
            <div className="fc4-front-meaning">
              {language === 'fr'
                ? card.translationFr
                : card.translationEn ?? card.translationFr}
            </div>
          )}
        </div>
      </div>
      <div className="fc4-typing-instruction">
        {frontFr
          ? language === 'fr'
            ? 'Tape le pinyin (les tons sont facultatifs)'
            : 'Type the pinyin (tones optional)'
          : language === 'fr'
          ? 'Tape le caractère (ou la traduction)'
          : 'Type the character'}
      </div>
      <div className="fc4-typing-row">
        <input
          ref={inputRef}
          type="text"
          className={`fc4-typing-input ${submitted ? `fc4-typing-input--${submitted}` : ''}`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmit();
          }}
          disabled={submitted != null}
          placeholder={frontFr ? 'ex : ni hao' : card.hanzi.length === 1 ? '一' : '你 好'}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
        />
        <button
          type="button"
          className="fc4-typing-submit"
          onClick={handleSubmit}
          disabled={submitted != null || input.trim().length === 0}
        >
          {language === 'fr' ? 'Valider' : 'Submit'}
        </button>
      </div>
      {submitted ? (
        <div className={`fc4-typing-feedback fc4-typing-feedback--${submitted}`}>
          <div className="fc4-typing-feedback-line">
            <span className="fc4-typing-feedback-label">
              {language === 'fr' ? 'Réponse attendue :' : 'Expected:'}
            </span>{' '}
            <span className="fc4-typing-feedback-value">{expected}</span>
          </div>
          {!frontFr ? (
            <div className="fc4-typing-feedback-line fc4-typing-feedback-line--muted">
              <span>{card.pinyin}</span>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

// ============================================================================
//  LISTENING CARD — TTS audio → saisie
// ============================================================================

export function ListeningCard({ card, language, onReveal, onSubmit }: StudyModeProps) {
  // En mode écoute, la "question" est toujours le son du hanzi ; l'utilisateur
  // tape soit le pinyin, soit la traduction (au choix). On accepte les deux
  // réponses correctes.
  const [input, setInput] = useState('');
  const [submitted, setSubmitted] = useState<'correct' | 'wrong' | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setInput('');
    setSubmitted(null);
    const t = window.setTimeout(() => inputRef.current?.focus(), 60);
    return () => window.clearTimeout(t);
  }, [card.id]);

  const playAudio = () => {
    // Unifié : MP3/WAV pré-enregistré si dispo (Azure TTS), sinon Web Speech.
    // Voir speakChinese() en tête de fichier.
    speakChinese(card.hanzi, card.audio);
  };

  // Auto-play une fois au montage.
  useEffect(() => {
    const t = window.setTimeout(playAudio, 140);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [card.id]);

  const handleSubmit = () => {
    if (submitted) return;
    const trimmed = input.trim();
    if (!trimmed) return;
    const okPinyin = pinyinEquals(trimmed, card.pinyin);
    const okFr = normalize(trimmed) === normalize(card.translationFr);
    const okEn = card.translationEn
      ? normalize(trimmed) === normalize(card.translationEn)
      : false;
    const okHanzi = trimmed === card.hanzi;
    const ok = okPinyin || okFr || okEn || okHanzi;
    setSubmitted(ok ? 'correct' : 'wrong');
    onReveal();
    onSubmit?.({ wasCorrect: ok });
  };

  const category = inferCategory(card, language);

  return (
    <div className="fc4-listening-card">
      {/* Stage identique à la front face d'une flashcard : topbar + gros bouton audio centré. */}
      <div className="fc4-study-stage">
        <div className="fc4-card-topbar">
          <span className="fc4-card-badge">{category}</span>
          <span className="fc4-card-topbar-spacer" aria-hidden />
        </div>
        {/* NB : on n'applique plus la classe legacy .fc4-listening-visual qui
            peignait ce conteneur en #161a23 (panel sombre du thème v4). Le
            nouveau stage blanc (.fc4-study-stage) fournit déjà le fond ;
            le body reste juste un flex column centré. */}
        <div className="fc4-card-body fc4-listening-body">
          <button type="button" className="fc4-listening-play" onClick={playAudio} aria-label="Rejouer">
            🔊
          </button>
          <div className="fc4-listening-instruction">
            {language === 'fr'
              ? 'Écoute et tape le hanzi, le pinyin ou la traduction'
              : 'Listen and type the character, pinyin, or translation'}
          </div>
        </div>
      </div>
      <div className="fc4-typing-row">
        <input
          ref={inputRef}
          type="text"
          className={`fc4-typing-input ${submitted ? `fc4-typing-input--${submitted}` : ''}`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmit();
          }}
          disabled={submitted != null}
          placeholder={language === 'fr' ? 'Ta réponse…' : 'Your answer…'}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
        />
        <button
          type="button"
          className="fc4-typing-submit"
          onClick={handleSubmit}
          disabled={submitted != null || input.trim().length === 0}
        >
          {language === 'fr' ? 'Valider' : 'Submit'}
        </button>
      </div>
      {submitted ? (
        <div className={`fc4-typing-feedback fc4-typing-feedback--${submitted}`}>
          <div className="fc4-typing-feedback-line">
            <span className="fc4-typing-feedback-value fc4-back-hanzi">{card.hanzi}</span>
          </div>
          <div className="fc4-typing-feedback-line fc4-typing-feedback-line--muted">
            <span>{card.pinyin}</span> —{' '}
            <span>{language === 'fr' ? card.translationFr : card.translationEn ?? card.translationFr}</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}

// ============================================================================
//  PronunciationCard — l'user prononce le hanzi, on grade auto
// ============================================================================

/**
 * Mode "Prononciation" :
 *   - Affiche le hanzi + pinyin + traduction (révélés dès le départ)
 *   - Gros bouton micro centré
 *   - L'utilisateur clique → parle → on transcrit via la Web Speech API
 *   - Verdict :
 *       match    → wasCorrect: true  (note "facile" suggérée par le parent)
 *       close    → wasCorrect: true  (note "bien")
 *       mismatch → wasCorrect: false (note "difficile")
 *   - Le user peut retenter avant de valider (bouton ↻).
 *   - Si le navigateur n'a pas SpeechRecognition, on tombe sur un message
 *     d'erreur + bouton "Valider sans micro" pour ne pas bloquer la session.
 */
export function PronunciationCard({ card, language, onReveal, onSubmit }: StudyModeProps) {
  const [state, setState] = useState<
    | { kind: 'idle' }
    | { kind: 'listening' }
    | { kind: 'result'; verdict: 'match' | 'close' | 'mismatch'; transcript: string; score: number }
    | { kind: 'error'; message: string }
  >({ kind: 'idle' });

  // Reset à chaque changement de carte (parent remount via key={card.id})
  useEffect(() => {
    setState({ kind: 'idle' });
  }, [card.id]);

  const supported = pronunciationSupported();

  const handlePlay = () => {
    speakChinese(card.hanzi, card.audio);
  };

  const handleRecord = () => {
    if (!supported || state.kind === 'listening') return;
    setState({ kind: 'listening' });
    onReveal();
    pronunciationRecognize({
      referenceText: card.hanzi,
      language: 'zh-CN'
    })
      .then((result) => {
        setState({
          kind: 'result',
          verdict: result.verdict,
          transcript: result.recognized,
          score: Math.round(result.pronunciationScore)
        });
        onSubmit?.({ wasCorrect: result.verdict !== 'mismatch' });
      })
      .catch((err) => {
        let msg: string;
        if (err instanceof AzureSpeechAbortedError) {
          msg =
            language === 'fr'
              ? "On n'a rien entendu, réessaie."
              : "Didn't hear anything, try again.";
        } else if (err instanceof Error && /not-allowed|denied|permission/i.test(err.message)) {
          msg =
            language === 'fr'
              ? 'Permission micro refusée.'
              : 'Mic permission denied.';
        } else {
          msg =
            err && typeof err === 'object' && 'message' in err
              ? String((err as { message: unknown }).message)
              : 'Erreur';
        }
        setState({ kind: 'error', message: msg });
      });
  };

  const handleRetry = () => {
    setState({ kind: 'idle' });
  };

  // Fallback "skip" : si pas supporté, l'user peut valider manuellement
  const handleSkip = (wasCorrect: boolean) => {
    onReveal();
    onSubmit?.({ wasCorrect });
  };

  const category = inferCategory(card, language);
  const meaning =
    language === 'fr' ? card.translationFr : card.translationEn ?? card.translationFr;

  return (
    <div className="fc4-pronunciation-card">
      <div className="fc4-study-stage">
        <div className="fc4-card-topbar">
          <span className="fc4-card-badge">{category}</span>
          <button
            type="button"
            className="fc4-card-speaker"
            onClick={handlePlay}
            aria-label={language === 'fr' ? 'Écouter le modèle' : 'Listen to model'}
            title={language === 'fr' ? 'Écouter le modèle' : 'Listen to model'}
          >
            <SpeakerIcon size={20} />
          </button>
        </div>
        <div className="fc4-card-body fc4-pronunciation-body">
          <div className="fc4-front-hanzi">{card.hanzi}</div>
          <div className="fc4-front-pinyin">{card.pinyin}</div>
          <div className="fc4-pronunciation-meaning">{meaning}</div>

          {!supported && (
            <div className="fc4-pronunciation-warning">
              {language === 'fr'
                ? 'Reconnaissance vocale non supportée. Utilise les boutons ci-dessous pour t\'auto-évaluer.'
                : 'Speech recognition not supported. Use the buttons below to self-rate.'}
              <div className="fc4-pronunciation-skip-row">
                <button
                  type="button"
                  className="fc4-pronunciation-skip-btn"
                  onClick={() => handleSkip(false)}
                >
                  ✗ {language === 'fr' ? 'Difficile' : 'Hard'}
                </button>
                <button
                  type="button"
                  className="fc4-pronunciation-skip-btn fc4-pronunciation-skip-btn--ok"
                  onClick={() => handleSkip(true)}
                >
                  ✓ {language === 'fr' ? 'Réussi' : 'Got it'}
                </button>
              </div>
            </div>
          )}

          {supported && state.kind === 'idle' && (
            <button
              type="button"
              className="fc4-pronunciation-mic"
              onClick={handleRecord}
              aria-label={language === 'fr' ? 'Prononcer' : 'Pronounce'}
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
            </button>
          )}

          {supported && state.kind === 'listening' && (
            <button
              type="button"
              className="fc4-pronunciation-mic is-listening"
              disabled
              aria-label="Listening"
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}

          {supported && state.kind === 'result' && (
            <div className={`fc4-pronunciation-result fc4-pronunciation-result--${state.verdict}`}>
              <div className="fc4-pronunciation-verdict">
                {state.verdict === 'match'
                  ? language === 'fr' ? '✓ Parfait !' : '✓ Perfect!'
                  : state.verdict === 'close'
                    ? language === 'fr' ? '~ Presque' : '~ Almost'
                    : language === 'fr' ? '✗ À retravailler' : '✗ Try again'}
                <span className="fc4-pronunciation-score">{state.score}/100</span>
              </div>
              {state.transcript && state.verdict !== 'match' && (
                <div className="fc4-pronunciation-transcript">
                  {language === 'fr' ? 'Entendu :' : 'Heard:'} <strong>{state.transcript}</strong>
                </div>
              )}
              <button
                type="button"
                className="fc4-pronunciation-retry"
                onClick={handleRetry}
              >
                ↻ {language === 'fr' ? 'Réessayer' : 'Retry'}
              </button>
            </div>
          )}

          {state.kind === 'error' && (
            <div className="fc4-pronunciation-result fc4-pronunciation-result--mismatch">
              <div className="fc4-pronunciation-verdict">
                {language === 'fr' ? 'Erreur :' : 'Error:'} {state.message}
              </div>
              <button
                type="button"
                className="fc4-pronunciation-retry"
                onClick={handleRetry}
              >
                ↻ {language === 'fr' ? 'Réessayer' : 'Retry'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
//  WritingCard — l'user écrit le hanzi, on grade auto
// ============================================================================

/**
 * Mode "Écriture" :
 *   - Affiche le pinyin + traduction (mais PAS le hanzi en gros — sinon
 *     l'exercice est trivial). Le hanzi est visible uniquement dans le pad
 *     en outline gris très clair (option Hanzi Writer).
 *   - L'utilisateur trace chaque caractère du mot l'un après l'autre.
 *     Pour 你好 : on drille 你 puis 好, avec un mini stepper visible.
 *   - Verdict global = agrégat des verdicts par caractère :
 *       au moins un mismatch → wasCorrect: false
 *       sinon → wasCorrect: true
 *     La SRS est mise à jour une seule fois à la fin du dernier caractère.
 */
export function WritingCard({ card, language, onReveal, onSubmit }: StudyModeProps) {
  const chars = Array.from(card.hanzi.trim()).filter((c) => /[一-鿿]/.test(c));
  const [charIndex, setCharIndex] = useState(0);
  const [verdicts, setVerdicts] = useState<HanziWriterQuizStats['verdict'][]>([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setCharIndex(0);
    setVerdicts([]);
    setSubmitted(false);
  }, [card.id]);

  const handleComplete = (stats: HanziWriterQuizStats) => {
    if (submitted) return;
    const nextVerdicts = [...verdicts, stats.verdict];
    setVerdicts(nextVerdicts);

    const isLast = charIndex + 1 >= chars.length;
    if (isLast) {
      // Agrégat final : si au moins un mismatch, on note "difficile".
      const hasMismatch = nextVerdicts.some((v) => v === 'mismatch');
      setSubmitted(true);
      onReveal();
      onSubmit?.({ wasCorrect: !hasMismatch });
    }
  };

  const handleNext = () => {
    if (charIndex + 1 < chars.length) setCharIndex(charIndex + 1);
  };

  const playAudio = () => {
    speakChinese(card.hanzi, card.audio);
  };

  const category = inferCategory(card, language);
  const meaning =
    language === 'fr' ? card.translationFr : card.translationEn ?? card.translationFr;

  // Cas dégénéré : pas de hanzi dans la carte
  if (chars.length === 0) {
    return (
      <div className="fc4-writing-card">
        <div className="fc4-study-stage">
          <div className="fc4-card-body">
            {language === 'fr'
              ? 'Aucun hanzi à écrire pour cette carte.'
              : 'No hanzi to write on this card.'}
          </div>
        </div>
      </div>
    );
  }

  const currentChar = chars[charIndex];
  const currentVerdict = verdicts[charIndex];
  const isMulti = chars.length > 1;
  const showNextBtn = isMulti && currentVerdict !== undefined && charIndex + 1 < chars.length;

  return (
    <div className="fc4-writing-card">
      <div className="fc4-study-stage">
        <div className="fc4-card-topbar">
          <span className="fc4-card-badge">{category}</span>
          <button
            type="button"
            className="fc4-card-speaker"
            onClick={playAudio}
            aria-label={language === 'fr' ? 'Écouter' : 'Listen'}
            title={language === 'fr' ? 'Écouter' : 'Listen'}
          >
            <SpeakerIcon size={20} />
          </button>
        </div>
        <div className="fc4-card-body fc4-writing-body">
          <div className="fc4-writing-pinyin">{card.pinyin}</div>
          <div className="fc4-writing-meaning">{meaning}</div>

          {/* Stepper visuel des caractères du mot (verdicts colorés) */}
          {isMulti && (
            <div className="fc4-writing-stepper" aria-hidden>
              {chars.map((c, i) => {
                const v = verdicts[i];
                const cls =
                  i === charIndex
                    ? 'fc4-writing-step fc4-writing-step--current'
                    : v
                      ? `fc4-writing-step fc4-writing-step--${v}`
                      : 'fc4-writing-step';
                return (
                  <span key={i} className={cls} title={c}>
                    {v ? (v === 'match' ? '✓' : v === 'close' ? '~' : '✗') : i + 1}
                  </span>
                );
              })}
            </div>
          )}

          <HanziWriterPad
            key={`${card.id}-${charIndex}`}
            hanzi={currentChar}
            size={240}
            language={language}
            onComplete={handleComplete}
          />

          {showNextBtn && (
            <button
              type="button"
              className="fc4-writing-next-btn"
              onClick={handleNext}
            >
              {language === 'fr' ? 'Caractère suivant' : 'Next character'} →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
//  UTIL — seedShuffle (Fisher-Yates seedé sur une string)
// ============================================================================

function seedShuffle<T>(arr: T[], seed: string): T[] {
  const copy = arr.slice();
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) | 0;
  }
  let state = h || 1;
  const rand = () => {
    state = (state * 1103515245 + 12345) & 0x7fffffff;
    return state / 0x7fffffff;
  };
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
