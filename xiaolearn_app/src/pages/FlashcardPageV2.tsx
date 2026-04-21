/**
 * FlashcardPageV2.tsx — v2 drop-in de la page Flashcards
 * ------------------------------------------------------
 * Reprend le pattern Seonsaengnim /dashboard/flashcards :
 *
 *   1. Stats : Total / Maîtrisés / À revoir / Maîtrise %
 *   2. Tabs  : Mots / Phrases (et plus tard Caractères)
 *   3. Sources : Leçons / Prof Xiao / Manuel / Mes cartes
 *   4. Filtres : Tous / Maîtrisés / En cours / Nouveaux / Difficiles
 *   5. Liste de "decks" par thème/HSK avec pourcentage maîtrisé
 *
 * Volontairement un composant *container* : le parent injecte les données
 * (items, customLists, dueIds, masteredIds) via props, le composant gère
 * uniquement les filtres, l'affichage et le callback d'ouverture d'un deck.
 *
 * Styles : ./../styles/flashcards-v2.css (scoped sous .flashcards-v2)
 */

import { useMemo, useState } from 'react';
import '../styles/flashcards-v2.css';

// ============================================================================
//  TYPES
// ============================================================================

export type FlashcardsV2Language = 'fr' | 'en';

export type FlashcardsV2HskLevel =
  | 'hsk1'
  | 'hsk2'
  | 'hsk3'
  | 'hsk4'
  | 'hsk5'
  | 'hsk6'
  | 'hsk7';

/** Shape minimale attendue pour chaque mot/flashcard. */
export interface FlashcardV2Item {
  id: string;
  hanzi: string;
  pinyin: string;
  translation: string;
  translationEn?: string;
  level: FlashcardsV2HskLevel;
  /** Thème/catégorie (mappé depuis LessonItem.category ou theme). */
  theme?: string;
  /** Nombre de caractères ; si > 1 et phrase-like, considéré comme "phrase". */
  tokens?: number;
  /** Date de dernière revue (ms). */
  lastReviewedAt?: number;
  /** Date due (ms) — si < now, la carte est à revoir. */
  dueAt?: number;
  /** État SRS : nouveau / en cours / maîtrisé / difficile. */
  srsState?: FlashcardV2SrsState;
  /** URL audio MP3/WAV (Azure TTS pré-généré, plus cohérent que Web Speech
   *  entre Chrome et Safari — l'API Web Speech zh-CN est bancale sur Chrome). */
  audio?: string;
}

export type FlashcardV2SrsState = 'new' | 'learning' | 'mastered' | 'difficult';

export type FlashcardV2Source = 'lessons' | 'tutor' | 'manual' | 'custom';

export interface FlashcardV2CustomList {
  id: string;
  name: string;
  itemIds: string[];
}

export interface FlashcardV2Deck {
  id: string;
  /** Label à afficher (ex: "HSK 1 · Famille"). */
  label: string;
  /** Sous-label optionnel (ex: "45 cartes · 60% maîtrisé"). */
  sublabel?: string;
  /** Couleur d'accent (fallback palette HSK). */
  accentColor?: string;
  /** Liste des items du deck. */
  items: FlashcardV2Item[];
  /** Type de deck pour l'icône : level, theme, custom, source. */
  kind: 'level' | 'theme' | 'custom' | 'source';
  /** HSK si deck lié à un niveau, pour choisir la couleur. */
  level?: FlashcardsV2HskLevel;
  /** Méta : source du deck (lessons/tutor/manual/custom) pour la tab. */
  source: FlashcardV2Source;
}

export interface FlashcardPageV2Props {
  /** Tous les items (mots + phrases) — le composant regroupe par deck. */
  items: FlashcardV2Item[];
  language?: FlashcardsV2Language;
  /** Listes custom (branchées depuis useCustomLists). */
  customLists?: FlashcardV2CustomList[];
  /** Ids "dus" (à revoir maintenant), depuis useFlashcardSRS. */
  dueIds?: Set<string> | string[];
  /** Ids "maîtrisés", depuis useFlashcardSRS. */
  masteredIds?: Set<string> | string[];
  /** Ids "difficiles" (again + hard au dernier passage). */
  difficultIds?: Set<string> | string[];
  /** Ouvrir un deck — ex. lancer une session SRS sur ce deck. */
  onOpenDeck?: (deck: FlashcardV2Deck) => void;
  /** Créer une liste custom (branche sur useCustomLists.createList). */
  onCreateCustomList?: (name: string) => void;
  /** Lancer la session SRS globale ("Tout réviser"). */
  onStartGlobalReview?: () => void;
}

// ============================================================================
//  COPIES
// ============================================================================

const COPY = {
  fr: {
    title: 'Flashcards',
    subtitle: 'Ta mémoire longue terme, une carte à la fois.',
    statTotal: 'Total',
    statMastered: 'Maîtrisés',
    statDue: 'À revoir',
    statMastery: 'Maîtrise',
    tabWords: 'Mots',
    tabSentences: 'Phrases',
    sourceLessons: 'Depuis les leçons',
    sourceTutor: 'Avec Prof. Xiao',
    sourceManual: 'Manuel',
    sourceCustom: 'Mes cartes',
    filterAll: 'Tous',
    filterMastered: 'Maîtrisés',
    filterLearning: 'En cours',
    filterNew: 'Nouveaux',
    filterDifficult: 'Difficiles',
    startReview: '⚡ Tout réviser',
    newList: '+ Nouvelle liste',
    cardsCount: 'cartes',
    mastered: 'maîtrisé',
    due: 'dus',
    open: 'Ouvrir →',
    emptyDecks: 'Aucun deck pour ces filtres.',
    emptyLists: 'Tu n\'as pas encore créé de liste personnalisée.',
    listName: 'Nom de la liste',
    createListTitle: 'Créer une liste personnalisée',
    create: 'Créer',
    cancel: 'Annuler',
    totalDecks: 'decks',
    placeholderSearch: 'Chercher un deck…'
  },
  en: {
    title: 'Flashcards',
    subtitle: 'Long-term memory, one card at a time.',
    statTotal: 'Total',
    statMastered: 'Mastered',
    statDue: 'To review',
    statMastery: 'Mastery',
    tabWords: 'Words',
    tabSentences: 'Sentences',
    sourceLessons: 'From lessons',
    sourceTutor: 'With Prof. Xiao',
    sourceManual: 'Manual',
    sourceCustom: 'My cards',
    filterAll: 'All',
    filterMastered: 'Mastered',
    filterLearning: 'Learning',
    filterNew: 'New',
    filterDifficult: 'Difficult',
    startReview: '⚡ Review all',
    newList: '+ New list',
    cardsCount: 'cards',
    mastered: 'mastered',
    due: 'due',
    open: 'Open →',
    emptyDecks: 'No deck matches these filters.',
    emptyLists: 'No custom list yet.',
    listName: 'List name',
    createListTitle: 'Create a custom list',
    create: 'Create',
    cancel: 'Cancel',
    totalDecks: 'decks',
    placeholderSearch: 'Search a deck…'
  }
} as const;

type CopyKey = keyof (typeof COPY)['fr'];
const t = (lang: FlashcardsV2Language, k: CopyKey) => COPY[lang][k] ?? COPY.fr[k];

// ============================================================================
//  CONSTANTES
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

type TabMode = 'words' | 'sentences';
type SourceTab = FlashcardV2Source;
type FilterMode = 'all' | FlashcardV2SrsState;

// ============================================================================
//  HELPERS
// ============================================================================

const toSet = (v: Set<string> | string[] | undefined): Set<string> => {
  if (!v) return new Set();
  return v instanceof Set ? v : new Set(v);
};

/**
 * Déduit l'état SRS si l'item ne l'expose pas :
 *   - dans masteredIds => 'mastered'
 *   - dans difficultIds => 'difficult'
 *   - dans dueIds (et déjà vu) => 'learning'
 *   - jamais vu => 'new'
 */
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

/** Regroupe les items en decks par niveau HSK + thème. */
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
    .map(([key, items]) => {
      const [level, theme] = key.split('::') as [FlashcardsV2HskLevel, string];
      const label = `${HSK_LABELS[level]} · ${capitalize(theme)}`;
      return {
        id: `deck-${key}`,
        label,
        kind: 'theme' as const,
        source: 'lessons' as FlashcardV2Source,
        level,
        accentColor: HSK_COLORS[level],
        items
      };
    })
    .sort((a, b) => a.label.localeCompare(b.label));
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

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

// ============================================================================
//  SOUS-COMPOSANTS
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

const DeckRow = ({
  deck,
  mastered,
  difficult,
  due,
  onOpen,
  language
}: {
  deck: FlashcardV2Deck;
  mastered: Set<string>;
  difficult: Set<string>;
  due: Set<string>;
  onOpen?: (deck: FlashcardV2Deck) => void;
  language: FlashcardsV2Language;
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
      onClick={() => onOpen?.(deck)}
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

/** Mini-modal pour créer une liste custom. Pas de portail — inline. */
const CreateListModal = ({
  language,
  onCancel,
  onCreate
}: {
  language: FlashcardsV2Language;
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
            {t(language, 'create')}
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
//  COMPOSANT PRINCIPAL
// ============================================================================

const FlashcardPageV2 = (props: FlashcardPageV2Props) => {
  const {
    items,
    language = 'fr',
    customLists = [],
    dueIds,
    masteredIds,
    difficultIds,
    onOpenDeck,
    onCreateCustomList,
    onStartGlobalReview
  } = props;

  const [tab, setTab] = useState<TabMode>('words');
  const [sourceTab, setSourceTab] = useState<SourceTab>('lessons');
  const [filter, setFilter] = useState<FilterMode>('all');
  const [search, setSearch] = useState('');
  const [showCreate, setShowCreate] = useState(false);

  const due = useMemo(() => toSet(dueIds), [dueIds]);
  const mastered = useMemo(() => toSet(masteredIds), [masteredIds]);
  const difficult = useMemo(() => toSet(difficultIds), [difficultIds]);

  // Filtrer par mode (mots/phrases). Règle simple : tokens >= 2 => phrase.
  const filteredItemsByTab = useMemo(() => {
    return items.filter((it) => {
      const isSentence = (it.tokens ?? it.hanzi.length) > 1 && /\s/.test(it.hanzi);
      return tab === 'sentences' ? isSentence : !isSentence;
    });
  }, [items, tab]);

  // Filtrer par état SRS
  const filteredItems = useMemo(() => {
    if (filter === 'all') return filteredItemsByTab;
    return filteredItemsByTab.filter((it) => {
      const s = resolveState(it, mastered, difficult, due);
      return s === filter;
    });
  }, [filteredItemsByTab, filter, mastered, difficult, due]);

  // Stats globales (sur le tab en cours)
  const stats = useMemo(() => {
    const total = filteredItemsByTab.length;
    const { masteredN, learningN, newN, difficultN } = countBy(
      filteredItemsByTab,
      mastered,
      difficult,
      due
    );
    const dueN = filteredItemsByTab.filter((i) => due.has(i.id)).length;
    const masteryPct = total === 0 ? 0 : Math.round((masteredN / total) * 100);
    return { total, masteredN, learningN, newN, difficultN, dueN, masteryPct };
  }, [filteredItemsByTab, mastered, difficult, due]);

  // Construction des decks selon la source
  const decks = useMemo<FlashcardV2Deck[]>(() => {
    if (sourceTab === 'custom') {
      return customLists.map((list) => {
        const listItems = filteredItems.filter((it) => list.itemIds.includes(it.id));
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
      // On ne garde que les decks qui contiennent au moins un item filtré
      const base = buildDecks(filteredItems);
      return base.filter((d) => d.items.length > 0);
    }
    // tutor / manual : placeholders, source non encore tracée sur l'item
    return [];
  }, [sourceTab, filteredItems, customLists]);

  // Search
  const visibleDecks = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return decks;
    return decks.filter((d) => d.label.toLowerCase().includes(q));
  }, [decks, search]);

  // --------------------------------------------------------------------------
  //  RENDER
  // --------------------------------------------------------------------------

  return (
    <div className="flashcards-v2">
      {/* --- Header --- */}
      <header className="fc2-header">
        <div>
          <h1>{t(language, 'title')}</h1>
          <p>{t(language, 'subtitle')}</p>
        </div>
        {onStartGlobalReview && (
          <button
            className="fc2-btn fc2-btn--primary fc2-btn--lg"
            onClick={onStartGlobalReview}
            disabled={stats.dueN === 0}
          >
            {t(language, 'startReview')}
            {stats.dueN > 0 && <span className="fc2-btn-badge">{stats.dueN}</span>}
          </button>
        )}
      </header>

      {/* --- Stats --- */}
      <div className="fc2-stats-grid">
        <StatCard label={t(language, 'statTotal')} value={stats.total} />
        <StatCard label={t(language, 'statMastered')} value={stats.masteredN} accent="#16a34a" />
        <StatCard label={t(language, 'statDue')} value={stats.dueN} accent="#c6302c" />
        <StatCard label={t(language, 'statMastery')} value={`${stats.masteryPct}%`} accent="#d4a537" />
      </div>

      {/* --- Tabs mots/phrases --- */}
      <div className="fc2-tabs" role="tablist">
        {(['words', 'sentences'] as TabMode[]).map((k) => (
          <button
            key={k}
            role="tab"
            aria-selected={tab === k}
            className={`fc2-tab ${tab === k ? 'fc2-tab--active' : ''}`}
            onClick={() => setTab(k)}
          >
            {t(language, k === 'words' ? 'tabWords' : 'tabSentences')}
          </button>
        ))}
      </div>

      {/* --- Filtres état SRS --- */}
      <div className="fc2-filters">
        {(['all', 'mastered', 'learning', 'new', 'difficult'] as FilterMode[]).map((f) => {
          const count =
            f === 'all'
              ? stats.total
              : f === 'mastered'
              ? stats.masteredN
              : f === 'learning'
              ? stats.learningN
              : f === 'new'
              ? stats.newN
              : stats.difficultN;
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

      {/* --- Source tabs + search + create list --- */}
      <div className="fc2-source-row">
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
        <div className="fc2-source-actions">
          <input
            className="fc2-search"
            type="search"
            placeholder={t(language, 'placeholderSearch')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {sourceTab === 'custom' && onCreateCustomList && (
            <button className="fc2-btn fc2-btn--ghost" onClick={() => setShowCreate(true)}>
              {t(language, 'newList')}
            </button>
          )}
        </div>
      </div>

      {/* --- Decks --- */}
      <div className="fc2-decks">
        {visibleDecks.length === 0 ? (
          <div className="fc2-empty">
            {sourceTab === 'custom' ? t(language, 'emptyLists') : t(language, 'emptyDecks')}
          </div>
        ) : (
          visibleDecks.map((deck) => (
            <DeckRow
              key={deck.id}
              deck={deck}
              mastered={mastered}
              difficult={difficult}
              due={due}
              onOpen={onOpenDeck}
              language={language}
            />
          ))
        )}
      </div>

      {/* --- Create list modal --- */}
      {showCreate && onCreateCustomList && (
        <CreateListModal
          language={language}
          onCancel={() => setShowCreate(false)}
          onCreate={(name) => {
            onCreateCustomList(name);
            setShowCreate(false);
          }}
        />
      )}
    </div>
  );
};

export default FlashcardPageV2;
