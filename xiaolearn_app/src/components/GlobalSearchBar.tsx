/**
 * GlobalSearchBar.tsx — recherche universelle inline (top-bar)
 * -------------------------------------------------------------
 * Affiche un panel d'autocomplete live, façon Seonsaengnim :
 *   - LEÇONS — leçons parentes (LessonModule) dont le titre matche OU
 *              dont la liste de vocabulaire contient un mot qui matche
 *              (ex: « 一 » → "Les chiffres — Niveau 1" car la leçon contient 一)
 *   - VOCABULAIRE — mots individuels (LessonItem + PersonalFlashcard) qui
 *                   matchent directement
 *   - CONVERSATIONS PROF. XIAO — titres de discussions passées
 *   - "Poser à Prof. Xiao : <query>" — CTA en bas du panel
 *
 * Sort exact match > startsWith > contains pour limiter le bruit.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { getAllLessons } from '../data/lessons';
import { grammarLessons } from '../data/grammar-lessons';
import type { LessonItem } from '../types';
import type { LessonPath, LessonModule } from '../types/lesson-structure';
import type { PersonalFlashcard } from '../types/flashcard-v3';

// ---------------------------------------------------------------------------
//  Types publics
// ---------------------------------------------------------------------------

export interface SearchableConversation {
  id: string;
  title: string;
  updatedAt: number;
}

export type SearchKind =
  | 'lesson-module' // leçon parente (LessonModule)
  | 'vocab' // mot individuel (LessonItem)
  | 'grammar' // point de grammaire (catalogue GrammarPageV3)
  | 'flashcard' // flashcard personnelle (PersonalFlashcard)
  | 'tutor-conv' // conversation Prof. Xiao
  | 'ask-tutor'; // CTA "Poser à Prof. Xiao"

export interface SearchHit {
  kind: SearchKind;
  /** Id : module.id / lessonItem.id / flashcard.id / convId / query. */
  id: string;
  /** Texte principal affiché. */
  title: string;
  /** Sous-titre gris (traduction, badge "N mots correspondent", date…). */
  subtitle?: string;
  /** Optionnel : si on clique sur un vocab, on a aussi le module parent pour
   *  pouvoir naviguer directement vers la leçon. */
  parentModuleId?: string;
  /** Optionnel : hanzi brut (vocab hits) — permet à l'appelant de router
   *  vers la fiche dictionnaire correspondante via findEntryByHanzi. */
  hanzi?: string;
}

interface Props {
  language?: 'fr' | 'en';
  /** Parcours (LessonPath) — sert à indexer module ↔ vocab. */
  lessonPaths?: LessonPath[];
  /** Flashcards perso (Lifetime). */
  personalFlashcards?: PersonalFlashcard[];
  /** Conversations Prof. Xiao. */
  tutorConversations?: SearchableConversation[];
  /** Sélection d'un résultat — l'appelant route vers la bonne vue. */
  onSelectHit?: (hit: SearchHit) => void;
}

// ---------------------------------------------------------------------------
//  Copies
// ---------------------------------------------------------------------------

const COPY = {
  fr: {
    placeholder: 'Rechercher un mot, une leçon, une conversation…',
    sectionLessons: 'Leçons',
    sectionVocab: 'Vocabulaire',
    sectionGrammar: 'Grammaire',
    sectionConvs: 'Conversations Prof. Xiao',
    askTutor: 'Poser à Prof. Xiao',
    noResult: 'Aucun résultat',
    containsNWords: (n: number) =>
      n === 1 ? '1 mot correspondant' : `${n} mots correspondants`
  },
  en: {
    placeholder: 'Search a word, a lesson, a conversation…',
    sectionLessons: 'Lessons',
    sectionVocab: 'Vocabulary',
    sectionGrammar: 'Grammar',
    sectionConvs: 'Prof. Xiao conversations',
    askTutor: 'Ask Prof. Xiao',
    noResult: 'No result',
    containsNWords: (n: number) =>
      n === 1 ? '1 matching word' : `${n} matching words`
  }
} as const;

const MAX_PER_SECTION = 5;

// ---------------------------------------------------------------------------
//  Utils
// ---------------------------------------------------------------------------

const normalize = (s: string): string =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

/** Score : 100 exact, 50 startsWith, 10 contains, 0 sinon. */
const matchScore = (haystack: string, needle: string): number => {
  if (!haystack || !needle) return 0;
  if (haystack === needle) return 100;
  if (haystack.startsWith(needle)) return 50;
  if (haystack.includes(needle)) return 10;
  return 0;
};

const formatRelative = (ts: number, lang: 'fr' | 'en'): string => {
  const diffMs = Date.now() - ts;
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days <= 0) return lang === 'fr' ? "aujourd'hui" : 'today';
  if (days === 1) return lang === 'fr' ? 'hier' : 'yesterday';
  if (days < 7) return lang === 'fr' ? `il y a ${days}j` : `${days}d ago`;
  if (days < 30) {
    const w = Math.floor(days / 7);
    return lang === 'fr' ? `il y a ${w} sem.` : `${w}w ago`;
  }
  const m = Math.floor(days / 30);
  return lang === 'fr' ? `il y a ${m} mois` : `${m}mo ago`;
};

// ---------------------------------------------------------------------------
//  Composant
// ---------------------------------------------------------------------------

const GlobalSearchBar = ({
  language = 'fr',
  lessonPaths = [],
  personalFlashcards = [],
  tutorConversations = [],
  onSelectHit
}: Props) => {
  const copy = COPY[language === 'en' ? 'en' : 'fr'];
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // ---- Indexation (calculée une seule fois par changement de paths) ----

  /** Toutes les leçons de référence (HSK + CECR + suppl.). */
  const allLessons = useMemo<LessonItem[]>(() => getAllLessons(), []);
  /** Index hanzi → LessonItem (lookup rapide). */
  const lessonByHanzi = useMemo(() => {
    const map = new Map<string, LessonItem>();
    for (const l of allLessons) map.set(l.hanzi, l);
    return map;
  }, [allLessons]);

  /** Tous les modules LessonModule, aplatis. */
  const allModules = useMemo<LessonModule[]>(
    () => lessonPaths.flatMap((p) => p.lessons),
    [lessonPaths]
  );

  /** Index module.id → liste de LessonItem qu'il contient (via flashcards[]). */
  const moduleVocab = useMemo(() => {
    const map = new Map<string, LessonItem[]>();
    for (const m of allModules) {
      const items: LessonItem[] = [];
      for (const vocabId of m.flashcards) {
        // Les IDs flashcards sont soit des IDs de LessonItem, soit des hanzi
        const byId = allLessons.find((l) => l.id === vocabId);
        if (byId) {
          items.push(byId);
          continue;
        }
        const byHanzi = lessonByHanzi.get(vocabId);
        if (byHanzi) items.push(byHanzi);
      }
      map.set(m.id, items);
    }
    return map;
  }, [allModules, allLessons, lessonByHanzi]);

  /** Index LessonItem.id → module.id (premier module qui le contient). */
  const moduleByVocabId = useMemo(() => {
    const map = new Map<string, string>();
    for (const [moduleId, items] of moduleVocab.entries()) {
      for (const item of items) {
        if (!map.has(item.id)) map.set(item.id, moduleId);
      }
    }
    return map;
  }, [moduleVocab]);

  const trimmed = query.trim();
  const q = normalize(trimmed);

  // ---- Calcul des résultats par section ----

  /** Leçons parentes qui matchent (par titre OU par vocab). */
  const lessonHits = useMemo<SearchHit[]>(() => {
    if (!q) return [];
    type Scored = { hit: SearchHit; score: number };
    const scored: Scored[] = [];
    for (const m of allModules) {
      const titleFr = (m.title || '').toString();
      const titleEn = (m.titleEn || '').toString();
      const titleNorm = normalize(language === 'en' ? titleEn || titleFr : titleFr || titleEn);
      const titleScore = matchScore(titleNorm, q);

      // Match dans le vocab de la leçon — 3 niveaux :
      // 0. ⚡ Match RAW dans m.flashcards (= les hanzi/identifiants bruts
      //    stockés dans la data CECR). Indispensable : pour "Dire bonjour"
      //    flashcards=["你好", "再见", ...]. Si 你好 n'a pas de LessonItem
      //    dans getAllLessons() (cas fréquent des mots composés CECR),
      //    moduleVocab ignorait silencieusement → 0 match. Maintenant on
      //    teste contre les strings brutes en premier.
      // 1. Match par mot individuel résolu (LessonItem)
      // 2. Match par concaténation/set des hanzi (couvre les mots composés
      //    dont les composants sont individuellement dans la leçon)
      let vocabScore = 0;
      let matchingWords: LessonItem[] = [];
      for (const raw of m.flashcards) {
        if (normalize(raw).includes(q) || raw.includes(trimmed)) {
          vocabScore = 22; // priorité haute : match direct sur la flashcard
          break;
        }
      }
      const vocab = moduleVocab.get(m.id) ?? [];
      if (vocabScore <= 20) {
        // On calcule quand même `matchingWords` (utilisé pour le subtitle
        // "N mots correspondants") même si on a déjà un match via raw — c'est
        // une stat indicative complémentaire.
        matchingWords = vocab.filter((it) => {
          const hay = normalize(
            `${it.hanzi} ${it.pinyin} ${it.translation} ${it.translationFr}`
          );
          return hay.includes(q);
        });
        if (matchingWords.length > 0 && vocabScore === 0) vocabScore = 20;
      }
      if (vocabScore === 0 && vocab.length > 0) {
        // 2 stratégies pour matcher un mot composé absent en tant que mot
        // entier dans les flashcards :
        //
        // a) Concat ordonnée des hanzi : '你好' ⊂ '你好再见' = true.
        //    Marche si les flashcards sont dans le bon ordre adjacent.
        // b) Set des caractères individuels : si TOUS les hanzi du query
        //    apparaissent dans les flashcards (peu importe l'ordre), on
        //    considère que la leçon "contient" le mot. Couvre le cas
        //    flashcards=[好, 你, 再见] où la concat='好你再见' ne contient
        //    pas '你好' mais l'utilisateur sait bien que 你+好=你好 ⊂ leçon.
        const allHanziConcat = vocab.map((it) => it.hanzi).join('');
        if (allHanziConcat.includes(trimmed)) {
          vocabScore = 18;
        } else {
          const allCharsSet = new Set(Array.from(allHanziConcat));
          const queryHanzi = Array.from(trimmed).filter((c) => /[一-鿿]/.test(c));
          if (
            queryHanzi.length > 0 &&
            queryHanzi.every((c) => allCharsSet.has(c))
          ) {
            vocabScore = 15; // < match concat mais > miss
          }
        }
      }

      const score = Math.max(titleScore, vocabScore);
      if (score === 0) continue;

      const displayTitle = language === 'en' ? titleEn || titleFr : titleFr || titleEn;
      const subtitle =
        matchingWords.length > 0
          ? copy.containsNWords(matchingWords.length)
          : undefined;
      scored.push({
        hit: {
          kind: 'lesson-module',
          id: m.id,
          title: displayTitle,
          subtitle
        },
        score
      });
    }
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, MAX_PER_SECTION).map((s) => s.hit);
  }, [q, allModules, moduleVocab, language, copy]);

  /** Points de grammaire qui matchent (catalogue GrammarPageV3).
   *  Avant ce calcul, chercher '的' ou '把' dans la TopBar ne renvoyait
   *  que les vocabs/leçons HSK — la page Grammaire dédiée n'apparaissait
   *  jamais alors qu'elle contient un point dédié à ces particules. */
  const grammarHits = useMemo<SearchHit[]>(() => {
    if (!q) return [];
    type Scored = { hit: SearchHit; score: number };
    const scored: Scored[] = [];
    for (const g of grammarLessons) {
      const hayHanzi = normalize(g.hanzi);
      const hayPinyin = normalize(g.pinyin);
      const hayTr = normalize(
        language === 'en'
          ? g.translation || g.translationFr
          : g.translationFr || g.translation
      );
      const score = Math.max(
        matchScore(hayHanzi, q),
        matchScore(hayPinyin, q),
        matchScore(hayTr, q)
      );
      if (score === 0) continue;
      scored.push({
        hit: {
          kind: 'grammar',
          id: g.id,
          title: `${g.hanzi} ${g.pinyin}`.trim(),
          subtitle:
            language === 'en'
              ? g.translation || g.translationFr
              : g.translationFr || g.translation
        },
        score
      });
    }
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, MAX_PER_SECTION).map((s) => s.hit);
  }, [q, language]);

  /** Mots individuels (LessonItem + PersonalFlashcard) qui matchent. */
  const vocabHits = useMemo<SearchHit[]>(() => {
    if (!q) return [];
    type Scored = { hit: SearchHit; score: number };
    const scored: Scored[] = [];
    // LessonItems (vocab HSK / CECR)
    for (const l of allLessons) {
      const hayHanzi = normalize(l.hanzi);
      const hayPinyin = normalize(l.pinyin);
      const hayTr = normalize(
        language === 'en'
          ? l.translation || l.translationFr
          : l.translationFr || l.translation
      );
      const score = Math.max(
        matchScore(hayHanzi, q),
        matchScore(hayPinyin, q),
        matchScore(hayTr, q)
      );
      if (score === 0) continue;
      scored.push({
        hit: {
          kind: 'vocab',
          id: l.id,
          title: `${l.hanzi} ${l.pinyin}`,
          subtitle:
            language === 'en'
              ? l.translation || l.translationFr
              : l.translationFr || l.translation,
          parentModuleId: moduleByVocabId.get(l.id),
          hanzi: l.hanzi
        },
        score
      });
    }
    // PersonalFlashcards (deck custom Lifetime)
    for (const c of personalFlashcards) {
      const hayHanzi = normalize(c.hanzi);
      const hayPinyin = normalize(c.pinyin ?? '');
      const hayTr = normalize(
        language === 'en'
          ? c.translationEn ?? c.translationFr ?? ''
          : c.translationFr ?? c.translationEn ?? ''
      );
      const score = Math.max(
        matchScore(hayHanzi, q),
        matchScore(hayPinyin, q),
        matchScore(hayTr, q)
      );
      if (score === 0) continue;
      scored.push({
        hit: {
          kind: 'flashcard',
          id: c.id,
          title: `${c.hanzi}${c.pinyin ? ` ${c.pinyin}` : ''}`,
          subtitle:
            language === 'en'
              ? c.translationEn || c.translationFr || ''
              : c.translationFr || c.translationEn || ''
        },
        score
      });
    }
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, MAX_PER_SECTION).map((s) => s.hit);
  }, [q, allLessons, personalFlashcards, moduleByVocabId, language]);

  /** Conversations Prof. Xiao. */
  const convHits = useMemo<SearchHit[]>(() => {
    if (!q || tutorConversations.length === 0) return [];
    type Scored = { hit: SearchHit; score: number };
    const scored: Scored[] = [];
    for (const c of tutorConversations) {
      const score = matchScore(normalize(c.title), q);
      if (score === 0) continue;
      scored.push({
        hit: {
          kind: 'tutor-conv',
          id: c.id,
          title: c.title,
          subtitle: formatRelative(c.updatedAt, language === 'en' ? 'en' : 'fr')
        },
        score
      });
    }
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, MAX_PER_SECTION).map((s) => s.hit);
  }, [q, tutorConversations, language]);

  const hasResults =
    lessonHits.length + grammarHits.length + vocabHits.length + convHits.length > 0;

  // ---- Fermeture overlay ----

  useEffect(() => {
    if (!isOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    window.addEventListener('mousedown', onDown);
    return () => window.removeEventListener('mousedown', onDown);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const handleSelect = (hit: SearchHit) => {
    onSelectHit?.(hit);
    setIsOpen(false);
    setQuery('');
  };

  const handleAskTutor = () => {
    if (!trimmed) return;
    handleSelect({ kind: 'ask-tutor', id: trimmed, title: trimmed });
  };

  return (
    <div className="xl-global-search-wrap" ref={containerRef}>
      <div className="xl-global-search" role="search">
        <span className="xl-global-search-icon" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
        <input
          type="search"
          className="xl-global-search-input"
          placeholder={copy.placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              if (vocabHits[0]) handleSelect(vocabHits[0]);
              else if (lessonHits[0]) handleSelect(lessonHits[0]);
              else if (convHits[0]) handleSelect(convHits[0]);
              else handleAskTutor();
            }
          }}
          aria-label={copy.placeholder}
        />
      </div>

      {isOpen && trimmed.length > 0 && (
        <div className="xl-global-search-panel" role="listbox">
          {lessonHits.length > 0 && (
            <div className="xl-search-section">
              <div className="xl-search-section-label">{copy.sectionLessons}</div>
              {lessonHits.map((h) => (
                <button
                  key={`lm-${h.id}`}
                  className="xl-search-hit"
                  onClick={() => handleSelect(h)}
                  type="button"
                >
                  <span className="xl-search-hit-icon" aria-hidden>📚</span>
                  <span className="xl-search-hit-text">
                    <span className="xl-search-hit-title">{h.title}</span>
                    {h.subtitle && (
                      <span className="xl-search-hit-subtitle">{h.subtitle}</span>
                    )}
                  </span>
                </button>
              ))}
            </div>
          )}

          {grammarHits.length > 0 && (
            <div className="xl-search-section">
              <div className="xl-search-section-label">{copy.sectionGrammar}</div>
              {grammarHits.map((h) => (
                <button
                  key={`g-${h.id}`}
                  className="xl-search-hit"
                  onClick={() => handleSelect(h)}
                  type="button"
                >
                  <span className="xl-search-hit-icon" aria-hidden>📐</span>
                  <span className="xl-search-hit-text">
                    <span className="xl-search-hit-title">{h.title}</span>
                    {h.subtitle && (
                      <span className="xl-search-hit-subtitle">{h.subtitle}</span>
                    )}
                  </span>
                </button>
              ))}
            </div>
          )}

          {vocabHits.length > 0 && (
            <div className="xl-search-section">
              <div className="xl-search-section-label">{copy.sectionVocab}</div>
              {vocabHits.map((h) => (
                <button
                  key={`v-${h.kind}-${h.id}`}
                  className="xl-search-hit"
                  onClick={() => handleSelect(h)}
                  type="button"
                >
                  <span className="xl-search-hit-icon" aria-hidden>
                    {h.kind === 'flashcard' ? '🃏' : '🈸'}
                  </span>
                  <span className="xl-search-hit-text">
                    <span className="xl-search-hit-title">{h.title}</span>
                    {h.subtitle && (
                      <span className="xl-search-hit-subtitle">{h.subtitle}</span>
                    )}
                  </span>
                </button>
              ))}
            </div>
          )}

          {convHits.length > 0 && (
            <div className="xl-search-section">
              <div className="xl-search-section-label">{copy.sectionConvs}</div>
              {convHits.map((h) => (
                <button
                  key={`c-${h.id}`}
                  className="xl-search-hit"
                  onClick={() => handleSelect(h)}
                  type="button"
                >
                  <span className="xl-search-hit-icon" aria-hidden>💬</span>
                  <span className="xl-search-hit-text">
                    <span className="xl-search-hit-title">{h.title}</span>
                    {h.subtitle && (
                      <span className="xl-search-hit-subtitle">{h.subtitle}</span>
                    )}
                  </span>
                </button>
              ))}
            </div>
          )}

          {!hasResults && (
            <div className="xl-search-empty">{copy.noResult}</div>
          )}

          <button
            type="button"
            className="xl-search-ask-tutor"
            onClick={handleAskTutor}
          >
            <span aria-hidden>✨</span>
            <span>
              {copy.askTutor} : <strong>{trimmed}</strong>
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default GlobalSearchBar;
