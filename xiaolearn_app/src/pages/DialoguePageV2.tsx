/**
 * DialoguePageV2.tsx — page standalone des dialogues XiaoLearn
 * -----------------------------------------------------------
 * V10 — UX refondue pour reprendre les patterns du Simulateur et de la page
 * Lectures (ReadingPageV2) :
 *   - Header catalogue avec tuile icône 💬 + titre + sous-titre
 *   - Tabs niveaux CECR (pills avec (N))
 *   - Sections groupées par niveau en mode « Tous »
 *   - Cartes riches : emoji thème, badge niveau, contexte, stats
 *     (nb de répliques, vocab, question de compréhension)
 *   - Vue détail façon briefing : hero avec emoji rond bordé, badges
 *     niveau / thème / répliques / vocab, bordure supérieure rouge→or
 *   - Toggles pinyin / traduction dans un bandeau
 *   - Lignes de dialogue : locuteur en pill rouge-or, bouton ▶ circulaire
 *
 * Audio : chaque ligne dispose d'un bouton ▶ qui lit la piste MP3 pré-
 * générée (Azure Neural TTS, via /audio/dialogues/manifest.json). Pas de
 * fallback Web Speech (règle produit).
 *
 * Source de données : src/data/dialogues.ts (`dialogues` + helpers).
 * Styles : ../styles/reading-v2.css (scoped sous `.reading-v2, .dialogue-v2`
 * — le wrapper porte les deux classes pour bénéficier aussi des overrides
 * existants de page-shell.css).
 *
 * Props :
 *   - language : 'fr' | 'en' (i18n UI + contenu)
 *   - onBack   : callback retour home
 *   - initialDialogueId : deep-link optionnel
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import '../styles/reading-v2.css';
import { dialogues, type DialogueEntry } from '../data/dialogues';
import { getDialogueZhTitle } from '../data/dialogue-zh-titles';
import { getDialogueQuiz } from '../data/dialogue-quizzes';
import {
  type DialogueAudioManifest,
  type AudioSpeed,
  loadDialogueManifest,
  isDialogueSlowAvailable,
  resolveDialogueAudioUrl,
  cancelTTS
} from '../utils/dialogue-audio';
import AudioSpeedToggle from '../components/AudioSpeedToggle';
import ComprehensionQuiz from '../components/reading/ComprehensionQuiz';
import PronunciationCheck from '../components/PronunciationCheck';

export type DialogueV2Language = 'fr' | 'en';

export interface DialoguePageV2Props {
  language?: DialogueV2Language;
  onBack?: () => void;
  /** Dialogue pré-sélectionné (optionnel, ex : deep-link). */
  initialDialogueId?: string;
  /** Verse de l'XP au dashboard quand le quiz est complété. */
  onAwardXp?: (xp: number) => void;
}

// ---------------------------------------------------------------------------
// Copies
// ---------------------------------------------------------------------------

const COPY = {
  fr: {
    title: 'Dialogues',
    subtitle: 'Conversations courtes pour écouter le chinois en situation.',
    back: '← Retour',
    backList: '← Retour aux dialogues',
    filterAll: 'Tous',
    togglePinyin: 'Pinyin',
    toggleTranslation: 'Traduction',
    context: 'Contexte',
    vocab: 'Vocabulaire clé',
    comprehension: 'Question de compréhension',
    revealAnswer: 'Afficher la réponse',
    empty: 'Aucun dialogue pour ce niveau.',
    play: 'Écouter',
    stop: 'Arrêter'
  },
  en: {
    title: 'Dialogues',
    subtitle: 'Short conversations to hear Chinese in real situations.',
    back: '← Back',
    backList: '← Back to dialogues',
    filterAll: 'All',
    togglePinyin: 'Pinyin',
    toggleTranslation: 'Translation',
    context: 'Context',
    vocab: 'Key vocabulary',
    comprehension: 'Comprehension question',
    revealAnswer: 'Reveal answer',
    empty: 'No dialogues for this level.',
    play: 'Play',
    stop: 'Stop'
  }
} as const;

type CopyKey = keyof (typeof COPY)['fr'];
const t = (lang: DialogueV2Language, k: CopyKey): string =>
  COPY[lang][k] ?? COPY.fr[k];

// Pluralisations séparées (t() ne renvoie que des strings).
const fmtLines = (lang: DialogueV2Language, n: number): string =>
  lang === 'en' ? `${n} line${n > 1 ? 's' : ''}` : `${n} réplique${n > 1 ? 's' : ''}`;

const fmtVocab = (lang: DialogueV2Language, n: number): string =>
  lang === 'en'
    ? `${n} word${n > 1 ? 's' : ''}`
    : `${n} mot${n > 1 ? 's' : ''}`;

// ---------------------------------------------------------------------------
// Niveaux exposés
// ---------------------------------------------------------------------------

const LEVEL_ORDER: DialogueEntry['cecrLevel'][] = [
  'a1', 'a2', 'b1.1', 'b1.2', 'b2.1', 'b2.2', 'c1.1', 'c1.2', 'c2.1', 'c2.2'
];

const LEVEL_LABEL: Record<DialogueEntry['cecrLevel'], string> = {
  a1: 'A1', a2: 'A2',
  'b1.1': 'B1.1', 'b1.2': 'B1.2',
  'b2.1': 'B2.1', 'b2.2': 'B2.2',
  'c1.1': 'C1.1', 'c1.2': 'C1.2',
  'c2.1': 'C2.1', 'c2.2': 'C2.2'
};

/** Tranche (a / b / c) pour la palette de la carte. */
const levelBlock = (lv: DialogueEntry['cecrLevel']): 'a' | 'b' | 'c' =>
  lv.startsWith('a') ? 'a' : lv.startsWith('b') ? 'b' : 'c';

// ---------------------------------------------------------------------------
// Emoji par dialogue (ID d'abord, fallback générique)
// ---------------------------------------------------------------------------

const ID_EMOJI: Record<string, string> = {
  'dlg-a1-hello': '👋',
  'dlg-a1-family': '👨‍👩‍👧',
  'dlg-a2-restaurant': '🍜',
  'dlg-a2-hotel': '🏨',
  'dlg-a2-metro': '🚇',
  'dlg-b11-interview': '🎤',
  'dlg-b12-doctor': '🩺',
  'dlg-b12-generations': '👴',
  'dlg-b21-environment': '🌱',
  'dlg-b21-startup-pitch': '🚀',
  'dlg-b22-mental-health-debate': '🧠',
  'dlg-b22-tea-culture': '🍵'
};

const iconForEntry = (entry: DialogueEntry): string => {
  const fromId = ID_EMOJI[entry.dialogue.id];
  if (fromId) return fromId;
  return '💬';
};

// ---------------------------------------------------------------------------
// Composant principal
// ---------------------------------------------------------------------------

const DialoguePageV2 = (props: DialoguePageV2Props) => {
  const { language = 'fr', onBack, initialDialogueId, onAwardXp } = props;

  const availableLevels = useMemo(() => {
    const present = new Set(dialogues.map((d) => d.cecrLevel));
    return LEVEL_ORDER.filter((lv) => present.has(lv));
  }, []);

  const countByLevel = useMemo(() => {
    const counts: Partial<Record<DialogueEntry['cecrLevel'], number>> = {};
    for (const d of dialogues) {
      counts[d.cecrLevel] = (counts[d.cecrLevel] ?? 0) + 1;
    }
    return counts;
  }, []);

  const [levelFilter, setLevelFilter] = useState<
    DialogueEntry['cecrLevel'] | 'all'
  >('all');
  const [selectedId, setSelectedId] = useState<string | null>(
    initialDialogueId ?? null
  );
  // Pinyin et traduction OFF par défaut : on encourage l'écoute active.
  const [showPinyin, setShowPinyin] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  // Audio : manifest Azure + instance HTMLAudio courante.
  const [manifest, setManifest] = useState<DialogueAudioManifest | null>(null);
  const [playingIdx, setPlayingIdx] = useState<number | null>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  // Vitesse audio (mode shadowing). Local au player — pas de persistance
  // globale, comme convenu côté UX (chaque player garde son propre état).
  const [audioSpeed, setAudioSpeed] = useState<AudioSpeed>('normal');
  const [slowAvailable, setSlowAvailable] = useState(false);

  // Chargement (re)paresseux du manifest selon la vitesse choisie.
  useEffect(() => {
    let cancelled = false;
    loadDialogueManifest(audioSpeed).then((m) => {
      if (!cancelled) setManifest(m);
    });
    return () => {
      cancelled = true;
    };
  }, [audioSpeed]);

  // Sonde au mount : est-ce que le manifest slow contient au moins 1 entrée ?
  // Détermine si le toggle est actif ou grisé.
  useEffect(() => {
    let cancelled = false;
    isDialogueSlowAvailable().then((ok) => {
      if (!cancelled) setSlowAvailable(ok);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Stop l'instance audio courante.
  const cancelAudio = useCallback(() => {
    const el = currentAudioRef.current;
    if (!el) return;
    try {
      el.onended = null;
      el.onerror = null;
      el.pause();
    } catch {
      /* noop */
    }
    currentAudioRef.current = null;
  }, []);

  // Nettoyage au démontage.
  useEffect(() => {
    return () => {
      cancelTTS();
      cancelAudio();
    };
  }, [cancelAudio]);

  // Dialogue sélectionné.
  const selected = useMemo(
    () => dialogues.find((d) => d.dialogue.id === selectedId) ?? null,
    [selectedId]
  );

  const filtered = useMemo(() => {
    if (levelFilter === 'all') return dialogues;
    return dialogues.filter((d) => d.cecrLevel === levelFilter);
  }, [levelFilter]);

  const groupsAll = useMemo(
    () =>
      availableLevels
        .map((lv) => ({
          level: lv,
          items: dialogues.filter((d) => d.cecrLevel === lv)
        }))
        .filter((g) => g.items.length > 0),
    [availableLevels]
  );

  // Lecture d'une ligne : MP3 pré-généré uniquement.
  const handlePlayLine = useCallback(
    (idx: number) => {
      if (!selected) return;
      const dialogue = selected.dialogue;
      const line = dialogue.lines[idx];
      if (!line) return;

      // Re-click sur la ligne active → stop.
      if (playingIdx === idx) {
        cancelTTS();
        cancelAudio();
        setPlayingIdx(null);
        return;
      }

      cancelTTS();
      cancelAudio();

      const finish = () => setPlayingIdx((cur) => (cur === idx ? null : cur));
      const url = resolveDialogueAudioUrl(dialogue, idx, manifest);
      setPlayingIdx(idx);

      if (url) {
        const audio = new Audio(url);
        currentAudioRef.current = audio;
        audio.onended = () => {
          if (currentAudioRef.current !== audio) return;
          finish();
        };
        audio.onerror = () => {
          if (currentAudioRef.current !== audio) return;
          console.warn('[dialogue audio] MP3 failed');
          finish();
        };
        audio.play().catch(() => {
          if (currentAudioRef.current !== audio) return;
          console.warn('[dialogue audio] autoplay blocked');
          finish();
        });
        return;
      }

      console.warn(
        '[dialogue audio] no MP3 for line',
        idx,
        'of dialogue',
        dialogue.id
      );
      finish();
    },
    [selected, playingIdx, manifest, cancelAudio]
  );

  // -------------------------------------------------------------------------
  // CARD (helper de rendu, PAS un composant React)
  // -------------------------------------------------------------------------
  // Important : on ne déclare PAS un composant `Card` ici, sinon React verrait
  // une nouvelle référence de composant à chaque re-render du parent (et donc
  // démonterait/remonterait toutes les cartes à chaque changement de state —
  // ce qui faisait que le clic n'enregistrait jamais setSelectedId).
  // À la place, `renderCard` est juste une fonction qui retourne du JSX :
  // React voit alors directement le <button> et fait un simple update.
  const renderCard = (entry: DialogueEntry) => {
    const title =
      language === 'en' ? entry.dialogue.titleEn : entry.dialogue.title;
    const theme = language === 'en' ? entry.themeEn : entry.theme;
    const block = levelBlock(entry.cecrLevel);
    const linesCount = entry.dialogue.lines.length;
    const vocabCount = entry.dialogue.vocab?.length ?? 0;
    const titleZh = getDialogueZhTitle(entry.dialogue.id);
    return (
      <button
        key={entry.dialogue.id}
        type="button"
        className={`rv2-card rv2-card--${block}`}
        onClick={() => {
          setSelectedId(entry.dialogue.id);
        }}
      >
        <div className="rv2-card-top">
          <span className="rv2-card-emoji-tile" aria-hidden>
            {iconForEntry(entry)}
          </span>
          <span className="rv2-card-level">{LEVEL_LABEL[entry.cecrLevel]}</span>
        </div>
        <p className="rv2-card-theme">{theme}</p>
        {titleZh ? (
          <>
            <h3 className="rv2-card-title-zh" lang="zh-Hans">{titleZh}</h3>
            <p className="rv2-card-title-translation">{title}</p>
          </>
        ) : (
          <h3 className="rv2-card-title">{title}</h3>
        )}
        <div className="rv2-card-foot">
          <span className="rv2-card-stat">
            <span className="rv2-card-stat-icon" aria-hidden>💬</span>
            {fmtLines(language, linesCount)}
          </span>
          {vocabCount > 0 && (
            <span className="rv2-card-stat">
              <span className="rv2-card-stat-icon" aria-hidden>📚</span>
              {fmtVocab(language, vocabCount)}
            </span>
          )}
        </div>
      </button>
    );
  };

  // -------------------------------------------------------------------------
  // VUE DÉTAIL
  // -------------------------------------------------------------------------
  if (selected) {
    const { dialogue } = selected;
    const title = language === 'en' ? dialogue.titleEn : dialogue.title;
    const theme = language === 'en' ? selected.themeEn : selected.theme;
    const block = levelBlock(selected.cecrLevel);
    const titleZh = getDialogueZhTitle(dialogue.id);
    // Quiz QCM enrichi (en priorité), fallback sur la question inline.
    const enrichedQuiz = getDialogueQuiz(dialogue.id);
    const quizQuestions =
      enrichedQuiz ??
      (dialogue.comprehension ? [dialogue.comprehension] : []);

    return (
      <div className="reading-v2 dialogue-v2">
        <div className="rv2-detail">
          <button
            type="button"
            className="rv2-btn rv2-btn--link rv2-detail-back"
            onClick={() => {
              cancelTTS();
              cancelAudio();
              setPlayingIdx(null);
              setSelectedId(null);
            }}
          >
            {t(language, 'backList')}
          </button>

          {/* Hero "lean" : pas de résumé (anti-spoiler) — titre chinois +
              traduction, façon Seonsaengnim. */}
          <div
            className={`rv2-detail-hero rv2-detail-hero--${block} rv2-detail-hero--lean`}
          >
            <div className="rv2-detail-kicker">
              <span className="rv2-detail-kicker-level">
                {LEVEL_LABEL[selected.cecrLevel]}
              </span>
              <span className="rv2-detail-kicker-dot" aria-hidden>·</span>
              <span className="rv2-detail-kicker-theme">
                {theme.toUpperCase()}
              </span>
            </div>
            {titleZh ? (
              <>
                <h1 className="rv2-detail-title-zh" lang="zh-Hans">{titleZh}</h1>
                <p className="rv2-detail-title-translation">{title}</p>
              </>
            ) : (
              <h1 className="rv2-detail-title-fallback">{title}</h1>
            )}
          </div>

          <div className="rv2-toggles">
            <button
              type="button"
              className={`rv2-toggle ${showPinyin ? 'is-on' : ''}`}
              onClick={() => setShowPinyin((v) => !v)}
              aria-pressed={showPinyin}
            >
              <span className="rv2-toggle-dot" aria-hidden />
              {t(language, 'togglePinyin')}
            </button>
            <button
              type="button"
              className={`rv2-toggle ${showTranslation ? 'is-on' : ''}`}
              onClick={() => setShowTranslation((v) => !v)}
              aria-pressed={showTranslation}
            >
              <span className="rv2-toggle-dot" aria-hidden />
              {t(language, 'toggleTranslation')}
            </button>
            <AudioSpeedToggle
              mode={audioSpeed}
              onChange={(next) => {
                // Si on change de vitesse pendant la lecture, on stoppe :
                // évite que la lecture reste désynchronisée pendant que le
                // manifest se recharge.
                cancelTTS();
                cancelAudio();
                setPlayingIdx(null);
                setAudioSpeed(next);
              }}
              slowAvailable={slowAvailable}
            />
          </div>

          <div className="rv2-dlg-lines">
            {dialogue.lines.map((line, i) => {
              const isActive = playingIdx === i;
              const note = language === 'en' ? line.noteEn ?? line.note : line.note;
              return (
                <div
                  key={i}
                  className={`rv2-dlg-line ${isActive ? 'is-playing' : ''}`}
                >
                  <div className="rv2-dlg-speaker">{line.speaker}</div>
                  <div className="rv2-dlg-body">
                    <div className="rv2-dlg-row">
                      <button
                        type="button"
                        className={`rv2-dlg-play ${isActive ? 'is-on' : ''}`}
                        onClick={() => handlePlayLine(i)}
                        aria-label={
                          isActive ? t(language, 'stop') : t(language, 'play')
                        }
                        title={
                          isActive ? t(language, 'stop') : t(language, 'play')
                        }
                      >
                        {isActive ? '⏸' : '▶'}
                      </button>
                      <PronunciationCheck
                        hanzi={line.hanzi}
                        pinyin={line.pinyin}
                        size={32}
                        ariaLabel={language === 'en' ? 'Pronounce this line' : 'Tester ma prononciation'}
                      />
                      <div className="rv2-dlg-hanzi">{line.hanzi}</div>
                    </div>
                    {showPinyin && <div className="rv2-pinyin">{line.pinyin}</div>}
                    {showTranslation && (
                      <div className="rv2-translation">
                        {language === 'en' ? line.translationEn : line.translationFr}
                      </div>
                    )}
                    {note && (
                      <div className="rv2-dlg-note">
                        <span aria-hidden>💡</span> {note}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {dialogue.vocab && dialogue.vocab.length > 0 && (
            <div className="rv2-section-block">
              <h3 className="rv2-section-head">📚 {t(language, 'vocab')}</h3>
              <div className="rv2-vocab-list">
                {dialogue.vocab.map((v) => (
                  <span key={v} className="rv2-vocab-chip">{v}</span>
                ))}
              </div>
            </div>
          )}

          {quizQuestions.length > 0 && (
            <ComprehensionQuiz
              questions={quizQuestions}
              entityId={dialogue.id}
              language={language}
              xpStoreKey="xl_dialogue_quiz_xp_v1"
              onAwardXp={onAwardXp}
            />
          )}
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // VUE LISTE (catalogue)
  // -------------------------------------------------------------------------
  const totalCount = dialogues.length;

  return (
    <div className="reading-v2 dialogue-v2">
      {onBack && (
        <button
          type="button"
          className="rv2-btn rv2-btn--link rv2-catalog-back"
          onClick={onBack}
        >
          {t(language, 'back')}
        </button>
      )}

      <header className="rv2-catalog-header">
        <div className="rv2-catalog-icon" aria-hidden>💬</div>
        <div className="rv2-catalog-head-text">
          <h1>{t(language, 'title')}</h1>
          <p>{t(language, 'subtitle')}</p>
        </div>
      </header>

      <div className="rv2-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={levelFilter === 'all'}
          className={`rv2-tab ${levelFilter === 'all' ? 'is-active' : ''}`}
          onClick={() => setLevelFilter('all')}
        >
          <span>{t(language, 'filterAll')}</span>
          <span className="rv2-tab-count">({totalCount})</span>
        </button>
        {availableLevels.map((lv) => (
          <button
            key={lv}
            type="button"
            role="tab"
            aria-selected={levelFilter === lv}
            className={`rv2-tab ${levelFilter === lv ? 'is-active' : ''}`}
            onClick={() => setLevelFilter(lv)}
          >
            <span>{LEVEL_LABEL[lv]}</span>
            <span className="rv2-tab-count">({countByLevel[lv] ?? 0})</span>
          </button>
        ))}
      </div>

      {levelFilter === 'all' ? (
        <div className="rv2-sections">
          {groupsAll.map((group) => {
            const block = levelBlock(group.level);
            return (
              <section
                key={group.level}
                className={`rv2-section rv2-card--${block}`}
              >
                <h2 className="rv2-section-title">
                  <span className="rv2-section-title-badge">
                    {LEVEL_LABEL[group.level]}
                  </span>
                  <span className="rv2-section-title-count">
                    {group.items.length}
                  </span>
                </h2>
                <div className="rv2-grid">
                  {group.items.map((e) => renderCard(e))}
                </div>
              </section>
            );
          })}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rv2-empty">{t(language, 'empty')}</div>
      ) : (
        <div className="rv2-grid">
          {filtered.map((e) => renderCard(e))}
        </div>
      )}
    </div>
  );
};

export default DialoguePageV2;
