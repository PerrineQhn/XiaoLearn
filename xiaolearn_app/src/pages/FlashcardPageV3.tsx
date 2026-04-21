/**
 * FlashcardPageV3.tsx — Flashcards V7 (XiaoLearn)
 * ------------------------------------------------------------------
 * Trois upgrades par-dessus FlashcardPageV2 (inspiration Seonsaengnim) :
 *
 *   1. **Direction toggle** (hanzi → FR) ↔ (FR → hanzi)
 *      Un pill-switch global qui renverse le sens d'étude. En mode FR → hanzi,
 *      l'utilisateur voit la traduction et doit retrouver le caractère — beaucoup
 *      plus difficile, crucial pour la production écrite.
 *
 *   2. **Flashcards personnelles** (onglet "Mes cartes")
 *      L'utilisateur crée ses propres cartes (hanzi + traduction + note). Pinyin
 *      auto-généré via pinyin-pro si absent. Max 500 cartes. CRUD complet +
 *      intégration SRS via `usePersonalFlashcards`.
 *
 *   3. **Onglet "Phrases"**
 *      Phrases issues des dialogues des leçons complétées, présentées comme des
 *      flashcards indépendantes (stock séparé, SRS séparé via `sentenceCards`
 *      fournies par le parent).
 *
 * Volontairement un composant *container* : le parent (App.tsx) injecte :
 *   - `wordItems` / `sentenceCards` (depuis completed lessons)
 *   - `personalHook` (résultat de usePersonalFlashcards)
 *   - `dueIds` / `masteredIds` / `difficultIds` (depuis useFlashcardSRS)
 *   - callbacks `onOpenDeck`, `onStartPersonalReview`, etc.
 *
 * Styles : `../styles/flashcards-v2.css` (classes fc2-*) + `../styles/flashcards-v3.css`
 * (classes fc3-*) pour les nouvelles capacités.
 */

import { useMemo, useState } from 'react';
import { pinyin as pinyinPro } from 'pinyin-pro';
import type {
  FlashcardV2Item,
  FlashcardV2CustomList,
  FlashcardV2Deck,
  FlashcardsV2HskLevel,
  FlashcardV2Source,
  FlashcardV2SrsState
} from './FlashcardPageV2';
import type {
  FlashcardDirection,
  FlashcardTab,
  PersonalFlashcard,
  SentenceFlashcard
} from '../types/flashcard-v3';
import { PERSONAL_FLASHCARDS_MAX } from '../types/flashcard-v3';
import type { UsePersonalFlashcardsReturn } from '../hooks/usePersonalFlashcards';
import '../styles/flashcards-v2.css';
import '../styles/flashcards-v3.css';

// ============================================================================
//  PROPS
// ============================================================================

export type FlashcardPageV3Language = 'fr' | 'en';

export interface FlashcardPageV3Props {
  /** Items "mots" (tokens = 1 ou non-phrase). */
  wordItems: FlashcardV2Item[];
  /** Phrases issues des dialogues des leçons complétées. */
  sentenceCards: SentenceFlashcard[];
  /** Hook CRUD + SRS pour les cartes personnelles. */
  personalHook: UsePersonalFlashcardsReturn;
  language?: FlashcardPageV3Language;
  /** Listes custom (optionnel — branché sur useCustomLists). */
  customLists?: FlashcardV2CustomList[];
  /** Ids dus dans le SRS global (useFlashcardSRS). */
  dueIds?: Set<string> | string[];
  /** Ids maîtrisés. */
  masteredIds?: Set<string> | string[];
  /** Ids difficiles. */
  difficultIds?: Set<string> | string[];
  /** Ouvrir un deck (mots ou phrases). */
  onOpenDeck?: (deck: FlashcardV2Deck, direction: FlashcardDirection) => void;
  /** Lancer une session sur les phrases dues. */
  onStartSentenceReview?: (direction: FlashcardDirection) => void;
  /** Lancer la session globale sur les mots. */
  onStartGlobalReview?: (direction: FlashcardDirection) => void;
  /** Lancer une session sur les cartes personnelles dues. */
  onStartPersonalReview?: (direction: FlashcardDirection) => void;
  /** Créer une liste custom (branche sur useCustomLists). */
  onCreateCustomList?: (name: string) => void;
}

// ============================================================================
//  COPIES
// ============================================================================

const COPY = {
  fr: {
    title: 'Flashcards',
    subtitle: 'Ta mémoire longue terme, une carte à la fois.',
    directionHanziFr: '汉 → FR',
    directionFrHanzi: 'FR → 汉',
    directionLabel: 'Sens',
    directionHintHanzi: 'Vois le caractère, trouve le sens.',
    directionHintFr: 'Mode retournement : vois le sens, écris le caractère.',
    statTotal: 'Total',
    statMastered: 'Maîtrisés',
    statDue: 'À revoir',
    statMastery: 'Maîtrise',
    tabWords: 'Mots',
    tabSentences: 'Phrases',
    tabPersonal: 'Mes cartes',
    sourceLessons: 'Depuis les leçons',
    sourceTutor: 'Avec Prof. Xiao',
    sourceManual: 'Manuel',
    sourceCustom: 'Listes',
    filterAll: 'Toutes',
    filterMastered: 'Maîtrisées',
    filterLearning: 'En cours',
    filterNew: 'Nouvelles',
    filterDifficult: 'Difficiles',
    startReview: '⚡ Tout réviser',
    startSentenceReview: '⚡ Réviser les phrases',
    startPersonalReview: '⚡ Réviser mes cartes',
    newList: '+ Nouvelle liste',
    addCard: '+ Ajouter une carte',
    editCard: 'Modifier',
    deleteCard: 'Supprimer',
    cardsCount: 'cartes',
    mastered: 'maîtrisé',
    due: 'dues',
    open: 'Ouvrir →',
    emptyDecks: 'Aucun deck pour ces filtres.',
    emptyLists: 'Tu n\'as pas encore créé de liste personnalisée.',
    emptyPersonal: "Aucune carte personnelle pour l'instant.",
    emptyPersonalHint:
      'Crée tes propres cartes pour les mots que tu rencontres en dehors des leçons.',
    emptySentences: 'Termine quelques leçons pour débloquer les phrases des dialogues.',
    listName: 'Nom de la liste',
    createListTitle: 'Créer une liste personnalisée',
    personalLeft: 'cartes restantes',
    atCapacity: 'Plafond atteint (500 cartes). Supprime-en avant d’en créer.',
    modalTitleCreate: 'Nouvelle carte personnelle',
    modalTitleEdit: 'Modifier la carte',
    fieldHanzi: 'Caractère(s) 汉字',
    fieldHanziHint: 'Ex: 图书馆',
    fieldPinyin: 'Pinyin (auto-généré si vide)',
    fieldPinyinHint: 'Laisse vide pour laisser pinyin-pro deviner.',
    fieldTranslation: 'Traduction française',
    fieldTranslationEn: 'Traduction anglaise (optionnel)',
    fieldNote: 'Note personnelle (optionnel)',
    fieldNoteHint: 'Contexte, exemple, truc mnémotechnique…',
    confirmDelete: 'Supprimer cette carte ?',
    save: 'Enregistrer',
    cancel: 'Annuler',
    placeholderSearch: 'Rechercher…',
    direction: 'Sens d’étude',
    addedAt: 'Créée le',
    updatedAt: 'Modifiée le',
    srsDue: 'à revoir',
    srsFresh: 'nouvelle',
    srsOk: 'acquise'
  },
  en: {
    title: 'Flashcards',
    subtitle: 'Long-term memory, one card at a time.',
    directionHanziFr: '汉 → EN',
    directionFrHanzi: 'EN → 汉',
    directionLabel: 'Direction',
    directionHintHanzi: 'See the character, find the meaning.',
    directionHintFr: 'Reverse mode: see the meaning, write the character.',
    statTotal: 'Total',
    statMastered: 'Mastered',
    statDue: 'To review',
    statMastery: 'Mastery',
    tabWords: 'Words',
    tabSentences: 'Sentences',
    tabPersonal: 'My cards',
    sourceLessons: 'From lessons',
    sourceTutor: 'With Prof. Xiao',
    sourceManual: 'Manual',
    sourceCustom: 'Lists',
    filterAll: 'All',
    filterMastered: 'Mastered',
    filterLearning: 'Learning',
    filterNew: 'New',
    filterDifficult: 'Difficult',
    startReview: '⚡ Review all',
    startSentenceReview: '⚡ Review sentences',
    startPersonalReview: '⚡ Review my cards',
    newList: '+ New list',
    addCard: '+ Add a card',
    editCard: 'Edit',
    deleteCard: 'Delete',
    cardsCount: 'cards',
    mastered: 'mastered',
    due: 'due',
    open: 'Open →',
    emptyDecks: 'No deck matches these filters.',
    emptyLists: 'No custom list yet.',
    emptyPersonal: 'No personal cards yet.',
    emptyPersonalHint:
      'Create cards for words you come across outside of lessons.',
    emptySentences: 'Complete a few lessons to unlock dialogue sentences.',
    listName: 'List name',
    createListTitle: 'Create a custom list',
    personalLeft: 'cards left',
    atCapacity: 'At capacity (500 cards). Delete some to create new ones.',
    modalTitleCreate: 'New personal card',
    modalTitleEdit: 'Edit card',
    fieldHanzi: 'Hanzi 汉字',
    fieldHanziHint: 'e.g. 图书馆',
    fieldPinyin: 'Pinyin (auto-generated if empty)',
    fieldPinyinHint: 'Leave blank to let pinyin-pro guess.',
    fieldTranslation: 'French translation',
    fieldTranslationEn: 'English translation (optional)',
    fieldNote: 'Personal note (optional)',
    fieldNoteHint: 'Context, example, mnemonic…',
    confirmDelete: 'Delete this card?',
    save: 'Save',
    cancel: 'Cancel',
    placeholderSearch: 'Search…',
    direction: 'Study direction',
    addedAt: 'Created',
    updatedAt: 'Updated',
    srsDue: 'due',
    srsFresh: 'new',
    srsOk: 'learned'
  }
} as const;

type CopyKey = keyof (typeof COPY)['fr'];
const t = (lang: FlashcardPageV3Language, k: CopyKey): string => COPY[lang][k] ?? COPY.fr[k];

// ============================================================================
//  CONSTANTS
// ============================================================================

const HSK_COLORS: Record<FlashcardsV2HskLevel, string> = {
  hsk1: '#10b981',
  hsk2: '#22c55e',
  hsk3: '#3b82f6',
  hsk4: '#6366f1',
  hsk5: '#a855f7',
  hsk6: '#ec4899',
  hsk7: '#ef4444'
};

const HSK_LABELS: Record<FlashcardsV2HskLevel, string> = {
  hsk1: 'HSK 1',
  hsk2: 'HSK 2',
  hsk3: 'HSK 3',
  hsk4: 'HSK 4',
  hsk5: 'HSK 5',
  hsk6: 'HSK 6',
  hsk7: 'HSK 7'
};

type SourceTab = FlashcardV2Source;
type FilterMode = 'all' | FlashcardV2SrsState;

// ============================================================================
//  HELPERS
// ============================================================================

const toSet = (v: Set<string> | string[] | undefined): Set<string> => {
  if (!v) return new Set();
  return v instanceof Set ? v : new Set(v);
};

const resolveState = (
  item: FlashcardV2Item,
  mastered: Set<string>,
  difficult: Set<string>,
  due: Set<string>
): FlashcardV2SrsState => {
  if (item.srsState) return item.srsState;
  if (mastered.has(item.id)) return 'mastered';
  if (difficult.has(item.id)) return 'difficult';
  if (item.lastReviewedAt) return due.has(item.id) ? 'learning' : 'learning';
  return 'new';
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const buildDecks = (items: FlashcardV2Item[]): FlashcardV2Deck[] => {
  const buckets = new Map<string, FlashcardV2Item[]>();
  for (const item of items) {
    const theme = item.theme ?? 'general';
    const key = `${item.level}::${theme}`;
    const list = buckets.get(key);
    if (list) list.push(item);
    else buckets.set(key, [item]);
  }
  return Array.from(buckets.entries())
    .map(([key, list]) => {
      const [level, theme] = key.split('::') as [FlashcardsV2HskLevel, string];
      return {
        id: `deck-${key}`,
        label: `${HSK_LABELS[level]} · ${capitalize(theme)}`,
        kind: 'theme' as const,
        source: 'lessons' as FlashcardV2Source,
        level,
        accentColor: HSK_COLORS[level],
        items: list
      };
    })
    .sort((a, b) => a.label.localeCompare(b.label));
};

const countBy = (
  items: FlashcardV2Item[],
  mastered: Set<string>,
  difficult: Set<string>,
  due: Set<string>
) => {
  let masteredN = 0;
  let learningN = 0;
  let newN = 0;
  let difficultN = 0;
  for (const it of items) {
    const s = resolveState(it, mastered, difficult, due);
    if (s === 'mastered') masteredN++;
    else if (s === 'difficult') difficultN++;
    else if (s === 'new') newN++;
    else learningN++;
  }
  return { masteredN, learningN, newN, difficultN };
};

/**
 * Convertit une date ISO en chaîne lisible « le 3 avril ». On évite la lib
 * intl lourde pour un rendu simple.
 */
const formatDate = (iso: string, lang: FlashcardPageV3Language): string => {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

/** Lookup pinyin via pinyin-pro (ton de marquage). Retourne '' si vide. */
export const lookupPinyinForHanzi = (hanzi: string): string => {
  const text = hanzi.trim();
  if (!text) return '';
  try {
    return pinyinPro(text, { toneType: 'symbol', type: 'string' }) as string;
  } catch {
    return '';
  }
};

// ============================================================================
//  SUB-COMPONENTS
// ============================================================================

const StatCard = ({
  label,
  value,
  accent
}: {
  label: string;
  value: string | number;
  accent?: string;
}) => (
  <div className="fc2-stat" style={accent ? { borderColor: accent } : undefined}>
    <div className="fc2-stat-value" style={accent ? { color: accent } : undefined}>
      {value}
    </div>
    <div className="fc2-stat-label">{label}</div>
  </div>
);

/** DeckRow simplifié (copié/adapté de V2 avec hint direction). */
const DeckRow = ({
  deck,
  mastered,
  difficult,
  due,
  language,
  direction,
  onOpen
}: {
  deck: FlashcardV2Deck;
  mastered: Set<string>;
  difficult: Set<string>;
  due: Set<string>;
  language: FlashcardPageV3Language;
  direction: FlashcardDirection;
  onOpen?: (deck: FlashcardV2Deck, direction: FlashcardDirection) => void;
}) => {
  const { masteredN } = countBy(deck.items, mastered, difficult, due);
  const total = deck.items.length;
  const masteryPct = total === 0 ? 0 : Math.round((masteredN / total) * 100);
  const dueN = deck.items.filter((i) => due.has(i.id)).length;
  const accent = deck.accentColor ?? '#c6302c';
  return (
    <button
      type="button"
      className="fc2-deck"
      onClick={() => onOpen?.(deck, direction)}
      style={{ ['--fc2-accent' as string]: accent } as React.CSSProperties}
    >
      <div className="fc2-deck-main">
        <div className="fc2-deck-label">{deck.label}</div>
        <div className="fc2-deck-meta">
          <span>
            {total} {t(language, 'cardsCount')}
          </span>
          <span>•</span>
          <span>
            {masteredN} {t(language, 'mastered')}
          </span>
          {dueN > 0 && (
            <>
              <span>•</span>
              <span className="fc2-deck-due">
                {dueN} {t(language, 'due')}
              </span>
            </>
          )}
        </div>
        <div className="fc2-deck-track">
          <div className="fc2-deck-fill" style={{ width: `${masteryPct}%` }} />
        </div>
      </div>
      <div className="fc2-deck-right">
        <div className="fc2-deck-pct">{masteryPct}%</div>
        <div className="fc2-deck-open">{t(language, 'open')}</div>
      </div>
    </button>
  );
};

/** Carte compacte pour une phrase de dialogue (onglet Phrases). */
const SentenceRow = ({
  card,
  due,
  mastered,
  direction,
  language,
  onClick
}: {
  card: SentenceFlashcard;
  due: Set<string>;
  mastered: Set<string>;
  direction: FlashcardDirection;
  language: FlashcardPageV3Language;
  onClick?: () => void;
}) => {
  const isDue = due.has(card.id);
  const isMastered = mastered.has(card.id);
  const state = isMastered ? 'ok' : isDue ? 'due' : 'fresh';
  return (
    <button className={`fc3-sentence fc3-sentence--${state}`} onClick={onClick}>
      <div className="fc3-sentence-main">
        {direction === 'hanzi-to-fr' ? (
          <>
            <div className="fc3-sentence-hanzi">{card.hanzi}</div>
            <div className="fc3-sentence-pinyin">{card.pinyin}</div>
            <div className="fc3-sentence-translation">
              {language === 'en' && card.translationEn ? card.translationEn : card.translationFr}
            </div>
          </>
        ) : (
          <>
            <div className="fc3-sentence-translation fc3-sentence-translation--primary">
              {language === 'en' && card.translationEn ? card.translationEn : card.translationFr}
            </div>
            <div className="fc3-sentence-hint">
              {language === 'en' ? 'Reveal hanzi →' : 'Révéler le hanzi →'}
            </div>
          </>
        )}
        <div className="fc3-sentence-context">
          {card.speaker && <span className="fc3-sentence-speaker">{card.speaker}</span>}
          <span className="fc3-sentence-lesson">{card.lessonTitleFr}</span>
        </div>
      </div>
      <div className="fc3-sentence-badge">
        {state === 'ok'
          ? t(language, 'srsOk')
          : state === 'due'
            ? t(language, 'srsDue')
            : t(language, 'srsFresh')}
      </div>
    </button>
  );
};

/** Rangée d'une carte personnelle avec actions inline. */
const PersonalRow = ({
  card,
  direction,
  language,
  onEdit,
  onDelete
}: {
  card: PersonalFlashcard;
  direction: FlashcardDirection;
  language: FlashcardPageV3Language;
  onEdit: (card: PersonalFlashcard) => void;
  onDelete: (card: PersonalFlashcard) => void;
}) => {
  const isDue = (card.dueAt ?? 0) <= Date.now();
  const state = card.srsLevel && card.srsLevel >= 3 ? 'ok' : isDue ? 'due' : 'fresh';
  return (
    <div className={`fc3-personal-row fc3-personal-row--${state}`}>
      <div className="fc3-personal-main">
        {direction === 'hanzi-to-fr' ? (
          <>
            <div className="fc3-personal-hanzi">{card.hanzi}</div>
            <div className="fc3-personal-pinyin">{card.pinyin || '—'}</div>
            <div className="fc3-personal-translation">
              {language === 'en' && card.translationEn ? card.translationEn : card.translationFr}
            </div>
          </>
        ) : (
          <>
            <div className="fc3-personal-translation fc3-personal-translation--primary">
              {language === 'en' && card.translationEn ? card.translationEn : card.translationFr}
            </div>
            <div className="fc3-personal-hanzi fc3-personal-hanzi--masked" aria-hidden="true">
              {'•'.repeat(card.hanzi.length)}
            </div>
            <div className="fc3-personal-hint">
              {language === 'en'
                ? 'Try to recall the hanzi before editing.'
                : 'Essaie de retrouver le hanzi avant de l’ouvrir.'}
            </div>
          </>
        )}
        {card.note && <div className="fc3-personal-note">📝 {card.note}</div>}
        <div className="fc3-personal-meta">
          <span>
            {t(language, 'addedAt')} {formatDate(card.createdAt, language)}
          </span>
          {card.srsLevel !== undefined && (
            <span className="fc3-personal-meta-dot">
              · {t(language, state === 'ok' ? 'srsOk' : state === 'due' ? 'srsDue' : 'srsFresh')}
            </span>
          )}
        </div>
      </div>
      <div className="fc3-personal-actions">
        <button
          type="button"
          className="fc3-personal-btn fc3-personal-btn--edit"
          onClick={() => onEdit(card)}
        >
          {t(language, 'editCard')}
        </button>
        <button
          type="button"
          className="fc3-personal-btn fc3-personal-btn--delete"
          onClick={() => {
            if (typeof window !== 'undefined' && window.confirm(t(language, 'confirmDelete'))) {
              onDelete(card);
            }
          }}
        >
          {t(language, 'deleteCard')}
        </button>
      </div>
    </div>
  );
};

/** Modal de création / édition d'une carte personnelle. */
const PersonalCardModal = ({
  language,
  initial,
  onSave,
  onCancel
}: {
  language: FlashcardPageV3Language;
  initial?: PersonalFlashcard;
  onSave: (input: {
    hanzi: string;
    pinyin: string;
    translationFr: string;
    translationEn?: string;
    note?: string;
  }) => void;
  onCancel: () => void;
}) => {
  const [hanzi, setHanzi] = useState(initial?.hanzi ?? '');
  const [pinyin, setPinyin] = useState(initial?.pinyin ?? '');
  const [translationFr, setTranslationFr] = useState(initial?.translationFr ?? '');
  const [translationEn, setTranslationEn] = useState(initial?.translationEn ?? '');
  const [note, setNote] = useState(initial?.note ?? '');

  const title = initial ? t(language, 'modalTitleEdit') : t(language, 'modalTitleCreate');
  const canSave = hanzi.trim().length > 0 && translationFr.trim().length > 0;

  const handleAutoPinyin = () => {
    if (!hanzi.trim()) return;
    const py = lookupPinyinForHanzi(hanzi);
    if (py) setPinyin(py);
  };

  const submit = () => {
    if (!canSave) return;
    onSave({
      hanzi: hanzi.trim(),
      pinyin: pinyin.trim() || lookupPinyinForHanzi(hanzi.trim()),
      translationFr: translationFr.trim(),
      translationEn: translationEn.trim() || undefined,
      note: note.trim() || undefined
    });
  };

  return (
    <div className="fc2-modal-backdrop" onClick={onCancel}>
      <div
        className="fc2-modal fc3-personal-modal"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <h3>{title}</h3>

        <label className="fc3-field">
          <span className="fc3-field-label">{t(language, 'fieldHanzi')}</span>
          <input
            autoFocus
            type="text"
            value={hanzi}
            onChange={(e) => setHanzi(e.target.value)}
            onBlur={handleAutoPinyin}
            placeholder={t(language, 'fieldHanziHint')}
            className="fc2-modal-input fc3-field-input fc3-field-input--hanzi"
          />
        </label>

        <label className="fc3-field">
          <span className="fc3-field-label">{t(language, 'fieldPinyin')}</span>
          <div className="fc3-field-row">
            <input
              type="text"
              value={pinyin}
              onChange={(e) => setPinyin(e.target.value)}
              placeholder={t(language, 'fieldPinyinHint')}
              className="fc2-modal-input fc3-field-input"
            />
            <button
              type="button"
              className="fc3-field-auto"
              onClick={handleAutoPinyin}
              disabled={!hanzi.trim()}
              title={language === 'en' ? 'Auto pinyin' : 'Pinyin auto'}
            >
              ⚡
            </button>
          </div>
        </label>

        <label className="fc3-field">
          <span className="fc3-field-label">{t(language, 'fieldTranslation')}</span>
          <input
            type="text"
            value={translationFr}
            onChange={(e) => setTranslationFr(e.target.value)}
            className="fc2-modal-input fc3-field-input"
          />
        </label>

        <label className="fc3-field">
          <span className="fc3-field-label">{t(language, 'fieldTranslationEn')}</span>
          <input
            type="text"
            value={translationEn}
            onChange={(e) => setTranslationEn(e.target.value)}
            className="fc2-modal-input fc3-field-input"
          />
        </label>

        <label className="fc3-field">
          <span className="fc3-field-label">{t(language, 'fieldNote')}</span>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={t(language, 'fieldNoteHint')}
            className="fc2-modal-input fc3-field-input fc3-field-textarea"
            rows={3}
          />
        </label>

        <div className="fc2-modal-actions">
          <button className="fc2-btn fc2-btn--ghost" onClick={onCancel}>
            {t(language, 'cancel')}
          </button>
          <button
            className="fc2-btn fc2-btn--primary"
            disabled={!canSave}
            onClick={submit}
          >
            {t(language, 'save')}
          </button>
        </div>
      </div>
    </div>
  );
};

/** Mini-modal pour créer une liste custom (inline, repris de V2). */
const CreateListModal = ({
  language,
  onCancel,
  onCreate
}: {
  language: FlashcardPageV3Language;
  onCancel: () => void;
  onCreate: (name: string) => void;
}) => {
  const [name, setName] = useState('');
  return (
    <div className="fc2-modal-backdrop" onClick={onCancel}>
      <div className="fc2-modal" onClick={(e) => e.stopPropagation()}>
        <h3>{t(language, 'createListTitle')}</h3>
        <input
          autoFocus
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t(language, 'listName')}
          className="fc2-modal-input"
        />
        <div className="fc2-modal-actions">
          <button className="fc2-btn fc2-btn--ghost" onClick={onCancel}>
            {t(language, 'cancel')}
          </button>
          <button
            className="fc2-btn fc2-btn--primary"
            disabled={!name.trim()}
            onClick={() => {
              onCreate(name.trim());
              setName('');
            }}
          >
            {language === 'en' ? 'Create' : 'Créer'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
//  MAIN COMPONENT
// ============================================================================

const FlashcardPageV3 = (props: FlashcardPageV3Props) => {
  const {
    wordItems,
    sentenceCards,
    personalHook,
    language = 'fr',
    customLists = [],
    dueIds,
    masteredIds,
    difficultIds,
    onOpenDeck,
    onStartGlobalReview,
    onStartSentenceReview,
    onStartPersonalReview,
    onCreateCustomList
  } = props;

  // --- State ---
  const [tab, setTab] = useState<FlashcardTab>('words');
  const [direction, setDirection] = useState<FlashcardDirection>('hanzi-to-fr');
  const [sourceTab, setSourceTab] = useState<SourceTab>('lessons');
  const [filter, setFilter] = useState<FilterMode>('all');
  const [search, setSearch] = useState('');
  const [showCreateList, setShowCreateList] = useState(false);
  const [editing, setEditing] = useState<PersonalFlashcard | null>(null);
  const [showPersonalModal, setShowPersonalModal] = useState(false);

  const due = useMemo(() => toSet(dueIds), [dueIds]);
  const mastered = useMemo(() => toSet(masteredIds), [masteredIds]);
  const difficult = useMemo(() => toSet(difficultIds), [difficultIds]);

  // --- Personal cards derived state ---
  const personalCards = personalHook.cards;
  const personalDue = personalHook.dueCards;

  // --- Sentences derived state ---
  const sentenceDue = useMemo(() => {
    const now = Date.now();
    return sentenceCards.filter((s) => (s.dueAt ?? 0) <= now);
  }, [sentenceCards]);

  // --- Word filtering by SRS state ---
  const filteredWordItems = useMemo(() => {
    if (filter === 'all') return wordItems;
    return wordItems.filter((it) => {
      const s = resolveState(it, mastered, difficult, due);
      return s === filter;
    });
  }, [wordItems, filter, mastered, difficult, due]);

  // --- Stats (contextualized by current tab) ---
  const wordStats = useMemo(() => {
    const total = wordItems.length;
    const { masteredN, learningN, newN, difficultN } = countBy(
      wordItems,
      mastered,
      difficult,
      due
    );
    const dueN = wordItems.filter((i) => due.has(i.id)).length;
    const masteryPct = total === 0 ? 0 : Math.round((masteredN / total) * 100);
    return { total, masteredN, learningN, newN, difficultN, dueN, masteryPct };
  }, [wordItems, mastered, difficult, due]);

  const sentenceStats = useMemo(() => {
    const total = sentenceCards.length;
    const masteredN = sentenceCards.filter((s) => (s.srsLevel ?? 0) >= 3).length;
    const dueN = sentenceDue.length;
    const masteryPct = total === 0 ? 0 : Math.round((masteredN / total) * 100);
    return { total, masteredN, dueN, masteryPct };
  }, [sentenceCards, sentenceDue]);

  const personalStats = useMemo(() => {
    const total = personalCards.length;
    const masteredN = personalCards.filter((c) => (c.srsLevel ?? 0) >= 3).length;
    const dueN = personalDue.length;
    const masteryPct = total === 0 ? 0 : Math.round((masteredN / total) * 100);
    return { total, masteredN, dueN, masteryPct };
  }, [personalCards, personalDue]);

  // --- Decks construction for the Words tab ---
  const wordDecks = useMemo<FlashcardV2Deck[]>(() => {
    if (sourceTab === 'custom') {
      return customLists.map((list) => {
        const listItems = filteredWordItems.filter((it) => list.itemIds.includes(it.id));
        return {
          id: `custom-${list.id}`,
          label: list.name,
          kind: 'custom',
          source: 'custom',
          accentColor: '#d4a537',
          items: listItems
        } as FlashcardV2Deck;
      });
    }
    if (sourceTab === 'lessons') {
      return buildDecks(filteredWordItems).filter((d) => d.items.length > 0);
    }
    return [];
  }, [sourceTab, filteredWordItems, customLists]);

  const visibleWordDecks = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return wordDecks;
    return wordDecks.filter((d) => d.label.toLowerCase().includes(q));
  }, [wordDecks, search]);

  // --- Sentence filtering ---
  const filteredSentences = useMemo(() => {
    const q = search.trim().toLowerCase();
    let base = sentenceCards;
    if (q) {
      base = base.filter(
        (c) =>
          c.hanzi.toLowerCase().includes(q) ||
          c.pinyin.toLowerCase().includes(q) ||
          c.translationFr.toLowerCase().includes(q) ||
          (c.translationEn?.toLowerCase().includes(q) ?? false)
      );
    }
    if (filter === 'mastered') {
      base = base.filter((c) => (c.srsLevel ?? 0) >= 3);
    } else if (filter === 'new') {
      base = base.filter((c) => !c.lastReviewedAt);
    } else if (filter === 'learning') {
      base = base.filter((c) => c.lastReviewedAt && (c.srsLevel ?? 0) < 3);
    }
    return base;
  }, [sentenceCards, search, filter]);

  // --- Personal filtering ---
  const filteredPersonal = useMemo(() => {
    const q = search.trim().toLowerCase();
    let base = personalCards;
    if (q) {
      base = base.filter(
        (c) =>
          c.hanzi.toLowerCase().includes(q) ||
          c.pinyin.toLowerCase().includes(q) ||
          c.translationFr.toLowerCase().includes(q) ||
          (c.note?.toLowerCase().includes(q) ?? false)
      );
    }
    if (filter === 'mastered') {
      base = base.filter((c) => (c.srsLevel ?? 0) >= 3);
    } else if (filter === 'new') {
      base = base.filter((c) => !c.lastReviewedAt);
    } else if (filter === 'learning') {
      base = base.filter((c) => c.lastReviewedAt && (c.srsLevel ?? 0) < 3);
    }
    return base;
  }, [personalCards, search, filter]);

  // --- Current tab stats (for the top stat grid) ---
  const currentStats = tab === 'words' ? wordStats : tab === 'sentences' ? sentenceStats : personalStats;

  // --- Handlers ---
  const handleSavePersonal = (input: {
    hanzi: string;
    pinyin: string;
    translationFr: string;
    translationEn?: string;
    note?: string;
  }) => {
    if (editing) {
      personalHook.updateCard(editing.id, input);
    } else {
      personalHook.addCard(input);
    }
    setShowPersonalModal(false);
    setEditing(null);
  };

  const handleStartReview = () => {
    if (tab === 'sentences') onStartSentenceReview?.(direction);
    else if (tab === 'personal') onStartPersonalReview?.(direction);
    else onStartGlobalReview?.(direction);
  };

  const startButtonLabel =
    tab === 'sentences'
      ? t(language, 'startSentenceReview')
      : tab === 'personal'
        ? t(language, 'startPersonalReview')
        : t(language, 'startReview');

  const startButtonDisabled =
    tab === 'sentences'
      ? sentenceDue.length === 0
      : tab === 'personal'
        ? personalDue.length === 0
        : wordStats.dueN === 0;

  const showReviewCta =
    (tab === 'words' && onStartGlobalReview) ||
    (tab === 'sentences' && onStartSentenceReview) ||
    (tab === 'personal' && onStartPersonalReview);

  // --------------------------------------------------------------------------
  //  RENDER
  // --------------------------------------------------------------------------

  return (
    <div className="flashcards-v2 flashcards-v3">
      {/* --- Header + direction toggle --- */}
      <header className="fc2-header fc3-header">
        <div>
          <h1>{t(language, 'title')}</h1>
          <p>{t(language, 'subtitle')}</p>
        </div>
        <div className="fc3-header-actions">
          <div
            className="fc3-direction"
            role="group"
            aria-label={t(language, 'directionLabel')}
          >
            <span className="fc3-direction-label">{t(language, 'directionLabel')}</span>
            <div className="fc3-direction-pills">
              <button
                type="button"
                className={`fc3-direction-pill ${direction === 'hanzi-to-fr' ? 'fc3-direction-pill--active' : ''}`}
                onClick={() => setDirection('hanzi-to-fr')}
              >
                {t(language, 'directionHanziFr')}
              </button>
              <button
                type="button"
                className={`fc3-direction-pill ${direction === 'fr-to-hanzi' ? 'fc3-direction-pill--active' : ''}`}
                onClick={() => setDirection('fr-to-hanzi')}
              >
                {t(language, 'directionFrHanzi')}
              </button>
            </div>
            <span className="fc3-direction-hint">
              {direction === 'hanzi-to-fr'
                ? t(language, 'directionHintHanzi')
                : t(language, 'directionHintFr')}
            </span>
          </div>
          {showReviewCta && (
            <button
              className="fc2-btn fc2-btn--primary fc2-btn--lg"
              onClick={handleStartReview}
              disabled={startButtonDisabled}
            >
              {startButtonLabel}
              {!startButtonDisabled && (
                <span className="fc2-btn-badge">
                  {tab === 'sentences'
                    ? sentenceDue.length
                    : tab === 'personal'
                      ? personalDue.length
                      : wordStats.dueN}
                </span>
              )}
            </button>
          )}
        </div>
      </header>

      {/* --- Stats (contextualized by tab) --- */}
      <div className="fc2-stats-grid">
        <StatCard label={t(language, 'statTotal')} value={currentStats.total} />
        <StatCard
          label={t(language, 'statMastered')}
          value={currentStats.masteredN}
          accent="#16a34a"
        />
        <StatCard label={t(language, 'statDue')} value={currentStats.dueN} accent="#c6302c" />
        <StatCard
          label={t(language, 'statMastery')}
          value={`${currentStats.masteryPct}%`}
          accent="#d4a537"
        />
      </div>

      {/* --- Tabs mots / phrases / mes cartes --- */}
      <div className="fc2-tabs fc3-tabs" role="tablist">
        {(['words', 'sentences', 'personal'] as FlashcardTab[]).map((k) => {
          const label =
            k === 'words'
              ? t(language, 'tabWords')
              : k === 'sentences'
                ? t(language, 'tabSentences')
                : t(language, 'tabPersonal');
          const count =
            k === 'words' ? wordStats.total : k === 'sentences' ? sentenceStats.total : personalStats.total;
          return (
            <button
              key={k}
              role="tab"
              aria-selected={tab === k}
              className={`fc2-tab ${tab === k ? 'fc2-tab--active' : ''}`}
              onClick={() => setTab(k)}
            >
              {label} <span className="fc3-tab-count">{count}</span>
            </button>
          );
        })}
      </div>

      {/* --- Filtres SRS (valides pour les 3 onglets) --- */}
      <div className="fc2-filters">
        {(['all', 'mastered', 'learning', 'new', 'difficult'] as FilterMode[]).map((f) => {
          // Count only makes sense for words tab; others stay simple
          let count: number;
          if (tab === 'words') {
            count =
              f === 'all'
                ? wordStats.total
                : f === 'mastered'
                  ? wordStats.masteredN
                  : f === 'learning'
                    ? wordStats.learningN
                    : f === 'new'
                      ? wordStats.newN
                      : wordStats.difficultN;
          } else if (tab === 'sentences') {
            count =
              f === 'all'
                ? sentenceStats.total
                : f === 'mastered'
                  ? sentenceStats.masteredN
                  : filteredSentences.length;
          } else {
            count =
              f === 'all'
                ? personalStats.total
                : f === 'mastered'
                  ? personalStats.masteredN
                  : filteredPersonal.length;
          }
          const label =
            f === 'all'
              ? t(language, 'filterAll')
              : f === 'mastered'
                ? t(language, 'filterMastered')
                : f === 'learning'
                  ? t(language, 'filterLearning')
                  : f === 'new'
                    ? t(language, 'filterNew')
                    : t(language, 'filterDifficult');
          // Personal / Sentence ne supportent pas "difficult"
          if ((tab === 'personal' || tab === 'sentences') && f === 'difficult') return null;
          return (
            <button
              key={f}
              className={`fc2-filter ${filter === f ? 'fc2-filter--active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {label} <span className="fc2-filter-count">{count}</span>
            </button>
          );
        })}
      </div>

      {/* --- Source row (tabs source + search + actions) --- */}
      <div className="fc2-source-row">
        {tab === 'words' ? (
          <div className="fc2-source-tabs" role="tablist">
            {(['lessons', 'tutor', 'manual', 'custom'] as SourceTab[]).map((s) => {
              const label =
                s === 'lessons'
                  ? t(language, 'sourceLessons')
                  : s === 'tutor'
                    ? t(language, 'sourceTutor')
                    : s === 'manual'
                      ? t(language, 'sourceManual')
                      : t(language, 'sourceCustom');
              return (
                <button
                  key={s}
                  role="tab"
                  aria-selected={sourceTab === s}
                  className={`fc2-source-tab ${sourceTab === s ? 'fc2-source-tab--active' : ''}`}
                  onClick={() => setSourceTab(s)}
                >
                  {label}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="fc3-source-placeholder" aria-hidden="true" />
        )}

        <div className="fc2-source-actions">
          <input
            className="fc2-search"
            type="search"
            placeholder={t(language, 'placeholderSearch')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {tab === 'words' && sourceTab === 'custom' && onCreateCustomList && (
            <button
              className="fc2-btn fc2-btn--ghost"
              onClick={() => setShowCreateList(true)}
            >
              {t(language, 'newList')}
            </button>
          )}
          {tab === 'personal' && (
            <button
              className={`fc2-btn fc2-btn--primary ${personalHook.atCapacity ? 'fc3-btn--disabled' : ''}`}
              onClick={() => {
                if (personalHook.atCapacity) return;
                setEditing(null);
                setShowPersonalModal(true);
              }}
              disabled={personalHook.atCapacity}
              title={personalHook.atCapacity ? t(language, 'atCapacity') : undefined}
            >
              {t(language, 'addCard')}
            </button>
          )}
        </div>
      </div>

      {/* --- Personal quota bar --- */}
      {tab === 'personal' && (
        <div className="fc3-quota">
          <div className="fc3-quota-track">
            <div
              className="fc3-quota-fill"
              style={{
                width: `${(personalHook.count / PERSONAL_FLASHCARDS_MAX) * 100}%`
              }}
            />
          </div>
          <div className="fc3-quota-label">
            {personalHook.count} / {PERSONAL_FLASHCARDS_MAX}
            <span className="fc3-quota-left">
              · {personalHook.remainingSlots} {t(language, 'personalLeft')}
            </span>
          </div>
        </div>
      )}

      {/* --- Content area --- */}
      <div className="fc3-content">
        {tab === 'words' &&
          (visibleWordDecks.length === 0 ? (
            <div className="fc2-empty">
              {sourceTab === 'custom' ? t(language, 'emptyLists') : t(language, 'emptyDecks')}
            </div>
          ) : (
            <div className="fc2-decks">
              {visibleWordDecks.map((deck) => (
                <DeckRow
                  key={deck.id}
                  deck={deck}
                  mastered={mastered}
                  difficult={difficult}
                  due={due}
                  language={language}
                  direction={direction}
                  onOpen={onOpenDeck}
                />
              ))}
            </div>
          ))}

        {tab === 'sentences' &&
          (filteredSentences.length === 0 ? (
            <div className="fc2-empty">{t(language, 'emptySentences')}</div>
          ) : (
            <div className="fc3-sentence-list">
              {filteredSentences.map((card) => {
                const asSet = new Set(sentenceDue.map((s) => s.id));
                const masteredSet = new Set(
                  sentenceCards.filter((s) => (s.srsLevel ?? 0) >= 3).map((s) => s.id)
                );
                return (
                  <SentenceRow
                    key={card.id}
                    card={card}
                    due={asSet}
                    mastered={masteredSet}
                    direction={direction}
                    language={language}
                  />
                );
              })}
            </div>
          ))}

        {tab === 'personal' &&
          (filteredPersonal.length === 0 ? (
            <div className="fc3-empty-personal">
              <div className="fc3-empty-personal-icon">📝</div>
              <h3>{t(language, 'emptyPersonal')}</h3>
              <p>{t(language, 'emptyPersonalHint')}</p>
              {!personalHook.atCapacity && (
                <button
                  className="fc2-btn fc2-btn--primary"
                  onClick={() => {
                    setEditing(null);
                    setShowPersonalModal(true);
                  }}
                >
                  {t(language, 'addCard')}
                </button>
              )}
            </div>
          ) : (
            <div className="fc3-personal-list">
              {filteredPersonal.map((card) => (
                <PersonalRow
                  key={card.id}
                  card={card}
                  direction={direction}
                  language={language}
                  onEdit={(c) => {
                    setEditing(c);
                    setShowPersonalModal(true);
                  }}
                  onDelete={(c) => personalHook.deleteCard(c.id)}
                />
              ))}
            </div>
          ))}
      </div>

      {/* --- Modals --- */}
      {showCreateList && onCreateCustomList && (
        <CreateListModal
          language={language}
          onCancel={() => setShowCreateList(false)}
          onCreate={(name) => {
            onCreateCustomList(name);
            setShowCreateList(false);
          }}
        />
      )}

      {showPersonalModal && (
        <PersonalCardModal
          language={language}
          initial={editing ?? undefined}
          onSave={handleSavePersonal}
          onCancel={() => {
            setShowPersonalModal(false);
            setEditing(null);
          }}
        />
      )}
    </div>
  );
};

export default FlashcardPageV3;
