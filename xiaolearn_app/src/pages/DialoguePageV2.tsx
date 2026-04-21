/**
 * DialoguePageV2.tsx — page standalone des dialogues XiaoLearn
 * -----------------------------------------------------------
 * Liste filtrable par niveau CECR + vue détail avec toggle pinyin/traduction,
 * vocabulaire clé et question de compréhension masquable.
 *
 * Audio : chaque ligne dispose d'un bouton ▶ qui lit en priorité la piste
 * MP3 pré-générée (Azure Neural TTS, via /audio/dialogues/manifest.json),
 * avec fallback automatique sur l'API Web Speech du navigateur si le fichier
 * est absent ou si l'autoplay est bloqué. Les helpers audio sont centralisés
 * dans `src/utils/dialogue-audio.ts` (partagés avec FreeLearningPage).
 *
 * Source de données : src/data/dialogues.ts (`dialogues` + helpers).
 *
 * Props :
 *   - language : 'fr' | 'en' (i18n UI + contenu)
 *   - onBack   : callback retour home
 *
 * Styles : ../styles/dialogue-reading-v2.css (scoped sous `.dialogue-v2`).
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import '../styles/dialogue-reading-v2.css';
import { dialogues, type DialogueEntry } from '../data/dialogues';
import {
  type DialogueAudioManifest,
  loadDialogueManifest,
  resolveDialogueAudioUrl,
  cancelTTS
} from '../utils/dialogue-audio';

export type DialogueV2Language = 'fr' | 'en';

export interface DialoguePageV2Props {
  language?: DialogueV2Language;
  onBack?: () => void;
  /** Dialogue pré-sélectionné (optionnel, ex : deep-link). */
  initialDialogueId?: string;
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
const t = (lang: DialogueV2Language, k: CopyKey) => COPY[lang][k] ?? COPY.fr[k];

// ---------------------------------------------------------------------------
// Niveaux exposés = niveaux effectivement présents dans dialogues.ts
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

// ---------------------------------------------------------------------------
// Composant principal
// ---------------------------------------------------------------------------

const DialoguePageV2 = (props: DialoguePageV2Props) => {
  const { language = 'fr', onBack, initialDialogueId } = props;

  const availableLevels = useMemo(() => {
    const present = new Set(dialogues.map((d) => d.cecrLevel));
    return LEVEL_ORDER.filter((lv) => present.has(lv));
  }, []);

  const [levelFilter, setLevelFilter] = useState<DialogueEntry['cecrLevel'] | 'all'>('all');
  const [selectedId, setSelectedId] = useState<string | null>(initialDialogueId ?? null);
  const [showPinyin, setShowPinyin] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);
  const [answerRevealed, setAnswerRevealed] = useState(false);

  // Audio : manifest Azure + instance HTMLAudio courante + voix Web Speech.
  // On crée une nouvelle instance `Audio()` à chaque lecture : réutiliser
  // le même élément déclenche sur Chrome un event 'error' asynchrone quand
  // on fait `src = ''` sur cancel, qui ensuite fuite sur le nouveau onerror
  // et bascule à tort vers Web Speech (MP3 pourtant présent).
  const [manifest, setManifest] = useState<DialogueAudioManifest | null>(null);
  const [playingIdx, setPlayingIdx] = useState<number | null>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  // Chargement paresseux du manifest, une fois par montage.
  useEffect(() => {
    let cancelled = false;
    loadDialogueManifest().then((m) => {
      if (!cancelled) setManifest(m);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Plus besoin de charger les voix speechSynthesis — tous les audios passent
  // désormais par des MP3/WAV pré-générés (Azure TTS).

  // Stop l'instance audio courante, sans toucher au `src` (sur Chrome, le
  // reset `src = ''` émet un 'error' asynchrone susceptible de fuir sur le
  // prochain play).
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

  // Nettoyage au démontage : stop audio + TTS.
  useEffect(() => {
    return () => {
      cancelTTS();
      cancelAudio();
    };
  }, [cancelAudio]);

  // Dialogue actuellement sélectionné.
  const selected = useMemo(
    () => dialogues.find((d) => d.dialogue.id === selectedId) ?? null,
    [selectedId]
  );

  // Liste ordonnée des personnages uniques du dialogue (ordre d'apparition) —
  // conservée pour la teinte de bordure par locuteur.
  const uniqueSpeakers = useMemo(() => {
    if (!selected) return [];
    const seen: string[] = [];
    for (const line of selected.dialogue.lines) {
      if (!seen.includes(line.speaker)) seen.push(line.speaker);
    }
    return seen;
  }, [selected]);

  const filtered = useMemo(() => {
    if (levelFilter === 'all') return dialogues;
    return dialogues.filter((d) => d.cecrLevel === levelFilter);
  }, [levelFilter]);

  // Lecture d'une ligne : MP3 pré-généré → fallback Web Speech.
  const handlePlayLine = useCallback(
    (idx: number) => {
      if (!selected) return;
      const dialogue = selected.dialogue;
      const line = dialogue.lines[idx];
      if (!line) return;

      // Si on reclique sur la ligne active, on stoppe tout.
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
        // Instance fraîche à chaque play : évite les fuites d'events 'error'
        // asynchrones de Chrome entre deux lectures successives.
        const audio = new Audio(url);
        currentAudioRef.current = audio;
        audio.onended = () => {
          if (currentAudioRef.current !== audio) return;
          finish();
        };
        audio.onerror = () => {
          if (currentAudioRef.current !== audio) return;
          // MP3 en erreur — règle produit : pas de fallback Web Speech.
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

      // Aucun MP3 dispo → on reste silencieux (pas de synthèse vocale).
      console.warn('[dialogue audio] no MP3 for line', idx, 'of dialogue', dialogue.id);
      finish();
    },
    [selected, playingIdx, manifest, cancelAudio]
  );

  // -------------------------------------------------------------------------
  // Vue détail
  // -------------------------------------------------------------------------
  if (selected) {
    const { dialogue } = selected;
    const title = language === 'en' ? dialogue.titleEn : dialogue.title;
    const context = language === 'en' ? dialogue.contextEn : dialogue.context;

    return (
      <div className="dialogue-v2">
        <div className="dr-header">
          <button
            type="button"
            className="dr-btn dr-btn--link"
            onClick={() => {
              cancelTTS();
              cancelAudio();
              setPlayingIdx(null);
              setSelectedId(null);
              setAnswerRevealed(false);
            }}
          >
            {t(language, 'backList')}
          </button>
          <h1>{title}</h1>
          <p>
            <strong>{LEVEL_LABEL[selected.cecrLevel]}</strong> · {language === 'en' ? selected.themeEn : selected.theme}
          </p>
        </div>

        <div className="dr-toggles">
          <button
            type="button"
            className={`dr-toggle ${showPinyin ? 'is-on' : ''}`}
            onClick={() => setShowPinyin((v) => !v)}
          >
            {showPinyin ? '🟢' : '⚪'} {t(language, 'togglePinyin')}
          </button>
          <button
            type="button"
            className={`dr-toggle ${showTranslation ? 'is-on' : ''}`}
            onClick={() => setShowTranslation((v) => !v)}
          >
            {showTranslation ? '🟢' : '⚪'} {t(language, 'toggleTranslation')}
          </button>
        </div>

        <div className="dr-detail">
          <div className="dr-detail-head">
            <h2 className="dr-detail-title">{title}</h2>
            <p className="dr-detail-context">{t(language, 'context')} · {context}</p>
          </div>

          {dialogue.lines.map((line, i) => {
            const isActive = playingIdx === i;
            return (
              <div key={i} className={`dr-line ${isActive ? 'dr-line--active' : ''}`}>
                <div className="dr-speaker">{line.speaker}</div>
                <div className="dr-line-body">
                  <div className="dr-line-row">
                    <button
                      type="button"
                      className={`dr-play ${isActive ? 'dr-play--on' : ''}`}
                      onClick={() => handlePlayLine(i)}
                      aria-label={isActive ? t(language, 'stop') : t(language, 'play')}
                      title={isActive ? t(language, 'stop') : t(language, 'play')}
                    >
                      {isActive ? '⏸' : '▶'}
                    </button>
                    <div className="dr-hanzi">{line.hanzi}</div>
                  </div>
                  {showPinyin && <div className="dr-pinyin">{line.pinyin}</div>}
                  {showTranslation && (
                    <div className="dr-translation">
                      {language === 'en' ? line.translationEn : line.translationFr}
                    </div>
                  )}
                  {(language === 'en' ? line.noteEn : line.note) && (
                    <div className="dr-note">
                      💡 {language === 'en' ? line.noteEn ?? line.note : line.note}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {dialogue.vocab && dialogue.vocab.length > 0 && (
            <div className="dr-section">
              <h3>📚 {t(language, 'vocab')}</h3>
              <div className="dr-vocab">
                {dialogue.vocab.map((v) => (
                  <span key={v}>{v}</span>
                ))}
              </div>
            </div>
          )}

          {dialogue.comprehension && (
            <div className="dr-section">
              <h3>❓ {t(language, 'comprehension')}</h3>
              <div className="dr-qa">
                <div className="dr-qa-q">
                  {language === 'en'
                    ? dialogue.comprehension.questionEn
                    : dialogue.comprehension.questionFr}
                </div>
                <div
                  className={`dr-qa-a ${answerRevealed ? '' : 'is-hidden'}`}
                  onClick={() => setAnswerRevealed(true)}
                  title={answerRevealed ? '' : t(language, 'revealAnswer')}
                >
                  {language === 'en'
                    ? dialogue.comprehension.answerEn
                    : dialogue.comprehension.answerFr}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // Vue liste
  // -------------------------------------------------------------------------
  return (
    <div className="dialogue-v2">
      <div className="dr-header">
        {onBack && (
          <button type="button" className="dr-btn dr-btn--link" onClick={onBack}>
            {t(language, 'back')}
          </button>
        )}
        <h1>{t(language, 'title')}</h1>
        <p>{t(language, 'subtitle')}</p>
      </div>

      <div className="dr-filters" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={levelFilter === 'all'}
          className={`dr-filter ${levelFilter === 'all' ? 'dr-filter--active' : ''}`}
          onClick={() => setLevelFilter('all')}
        >
          {t(language, 'filterAll')}
        </button>
        {availableLevels.map((lv) => (
          <button
            key={lv}
            type="button"
            role="tab"
            aria-selected={levelFilter === lv}
            className={`dr-filter ${levelFilter === lv ? 'dr-filter--active' : ''}`}
            onClick={() => setLevelFilter(lv)}
          >
            {LEVEL_LABEL[lv]}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="dr-empty">{t(language, 'empty')}</div>
      ) : (
        <div className="dr-list">
          {filtered.map((entry) => {
            const title = language === 'en' ? entry.dialogue.titleEn : entry.dialogue.title;
            const context = language === 'en' ? entry.dialogue.contextEn : entry.dialogue.context;
            return (
              <button
                key={entry.dialogue.id}
                type="button"
                className="dr-list-item"
                onClick={() => {
                  setSelectedId(entry.dialogue.id);
                  setAnswerRevealed(false);
                }}
              >
                <div className="dr-list-level">{LEVEL_LABEL[entry.cecrLevel]}</div>
                <div className="dr-list-theme">{language === 'en' ? entry.themeEn : entry.theme}</div>
                <div className="dr-list-title">{title}</div>
                <div className="dr-list-excerpt">{context}</div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DialoguePageV2;
