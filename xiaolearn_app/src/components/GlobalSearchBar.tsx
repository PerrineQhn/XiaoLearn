/**
 * GlobalSearchBar.tsx — recherche universelle inline (top-bar)
 * -------------------------------------------------------------
 * Affiche un panel d'autocomplete live, façon Seonsaengnim :
 *   - LEÇONS — items HSK/CECR dont le hanzi / pinyin / traduction matche
 *   - VOCABULAIRE — flashcards perso si l'utilisateur en a
 *   - CONVERSATIONS PROF. XIAO — historique de discussions dont le titre matche
 *   - "Poser à Prof. Xiao : <query>" — CTA en bas du panel
 *
 * Le panel est rendu en `position: absolute` sous l'input, fermeture
 * automatique au clic en dehors (overlay invisible) ou via Escape.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { getAllLessons } from '../data/lessons';
import type { LessonItem } from '../types';
import type { PersonalFlashcard } from '../types/flashcard-v3';

// ---------------------------------------------------------------------------
//  Types
// ---------------------------------------------------------------------------

export interface SearchableConversation {
  id: string;
  title: string;
  updatedAt: number;
}

export type SearchKind =
  | 'lesson'
  | 'flashcard'
  | 'tutor-conv'
  | 'ask-tutor';

export interface SearchHit {
  kind: SearchKind;
  /** Identifiant interne (lessonId, flashcardId, convId, ou la query). */
  id: string;
  /** Texte principal affiché (gros). */
  title: string;
  /** Sous-titre affiché en gris (traduction, date, etc.). */
  subtitle?: string;
}

interface Props {
  language?: 'fr' | 'en';
  /** Flashcards perso (optionnel, Lifetime uniquement). */
  personalFlashcards?: PersonalFlashcard[];
  /** Historique des conversations Prof. Xiao. */
  tutorConversations?: SearchableConversation[];
  /** Sélection d'un résultat — l'appelant route vers la bonne vue. */
  onSelectHit?: (hit: SearchHit) => void;
}

// ---------------------------------------------------------------------------
//  Constantes / labels
// ---------------------------------------------------------------------------

const COPY = {
  fr: {
    placeholder: 'Rechercher un mot, une leçon, une conversation…',
    sectionLessons: 'Leçons',
    sectionFlashcards: 'Vocabulaire',
    sectionConvs: 'Conversations Prof. Xiao',
    askTutor: 'Poser à Prof. Xiao',
    noResult: 'Aucun résultat',
    typeMore: 'Tape au moins 1 caractère pour rechercher.'
  },
  en: {
    placeholder: 'Search a word, a lesson, a conversation…',
    sectionLessons: 'Lessons',
    sectionFlashcards: 'Vocabulary',
    sectionConvs: 'Prof. Xiao conversations',
    askTutor: 'Ask Prof. Xiao',
    noResult: 'No result',
    typeMore: 'Type at least 1 character to search.'
  }
} as const;

const MAX_PER_SECTION = 5;

// Format d'un timestamp en "il y a Xj" / "today"
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

// Normalise une chaîne pour matching insensitif (accents, casse)
const normalize = (s: string): string =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

// ---------------------------------------------------------------------------
//  Composant
// ---------------------------------------------------------------------------

const GlobalSearchBar = ({
  language = 'fr',
  personalFlashcards = [],
  tutorConversations = [],
  onSelectHit
}: Props) => {
  const copy = COPY[language === 'en' ? 'en' : 'fr'];
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Toutes les leçons HSK une seule fois (lazy)
  const allLessons = useMemo<LessonItem[]>(() => getAllLessons(), []);

  const trimmed = query.trim();
  const q = normalize(trimmed);

  const lessonHits = useMemo<SearchHit[]>(() => {
    if (!q) return [];
    const out: SearchHit[] = [];
    for (const l of allLessons) {
      const haystack = normalize(
        `${l.hanzi} ${l.pinyin} ${l.translation} ${l.translationFr} ${l.category ?? ''}`
      );
      if (haystack.includes(q)) {
        out.push({
          kind: 'lesson',
          id: l.id,
          title: `${l.hanzi} ${l.pinyin}`,
          subtitle:
            language === 'fr'
              ? l.translationFr || l.translation
              : l.translation || l.translationFr
        });
        if (out.length >= MAX_PER_SECTION) break;
      }
    }
    return out;
  }, [allLessons, language, q]);

  const flashcardHits = useMemo<SearchHit[]>(() => {
    if (!q || personalFlashcards.length === 0) return [];
    const out: SearchHit[] = [];
    for (const c of personalFlashcards) {
      const haystack = normalize(
        `${c.hanzi} ${c.pinyin ?? ''} ${c.translationFr ?? ''} ${c.translationEn ?? ''}`
      );
      if (haystack.includes(q)) {
        out.push({
          kind: 'flashcard',
          id: c.id,
          title: `${c.hanzi}${c.pinyin ? ` ${c.pinyin}` : ''}`,
          subtitle:
            language === 'fr'
              ? c.translationFr || c.translationEn || ''
              : c.translationEn || c.translationFr || ''
        });
        if (out.length >= MAX_PER_SECTION) break;
      }
    }
    return out;
  }, [personalFlashcards, language, q]);

  const convHits = useMemo<SearchHit[]>(() => {
    if (!q || tutorConversations.length === 0) return [];
    const out: SearchHit[] = [];
    for (const c of tutorConversations) {
      if (normalize(c.title).includes(q)) {
        out.push({
          kind: 'tutor-conv',
          id: c.id,
          title: c.title,
          subtitle: formatRelative(c.updatedAt, language === 'en' ? 'en' : 'fr')
        });
        if (out.length >= MAX_PER_SECTION) break;
      }
    }
    return out;
  }, [tutorConversations, language, q]);

  const hasResults =
    lessonHits.length + flashcardHits.length + convHits.length > 0;

  // Fermeture au clic à l'extérieur
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

  // Échap = ferme
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
    handleSelect({
      kind: 'ask-tutor',
      id: trimmed,
      title: trimmed
    });
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
              // Si pas de résultats, on prend le raccourci "Poser à Prof. Xiao"
              if (!hasResults) handleAskTutor();
              else if (lessonHits[0]) handleSelect(lessonHits[0]);
              else if (flashcardHits[0]) handleSelect(flashcardHits[0]);
              else if (convHits[0]) handleSelect(convHits[0]);
            }
          }}
          aria-label={copy.placeholder}
        />
      </div>

      {isOpen && trimmed.length > 0 && (
        <div className="xl-global-search-panel" role="listbox">
          {lessonHits.length > 0 && (
            <div className="xl-search-section">
              <div className="xl-search-section-label">
                {copy.sectionLessons}
              </div>
              {lessonHits.map((h) => (
                <button
                  key={`l-${h.id}`}
                  className="xl-search-hit"
                  onClick={() => handleSelect(h)}
                  type="button"
                >
                  <span className="xl-search-hit-icon" aria-hidden>📚</span>
                  <span className="xl-search-hit-text">
                    <span className="xl-search-hit-title">{h.title}</span>
                    {h.subtitle && (
                      <span className="xl-search-hit-subtitle">
                        {h.subtitle}
                      </span>
                    )}
                  </span>
                </button>
              ))}
            </div>
          )}

          {flashcardHits.length > 0 && (
            <div className="xl-search-section">
              <div className="xl-search-section-label">
                {copy.sectionFlashcards}
              </div>
              {flashcardHits.map((h) => (
                <button
                  key={`f-${h.id}`}
                  className="xl-search-hit"
                  onClick={() => handleSelect(h)}
                  type="button"
                >
                  <span className="xl-search-hit-icon" aria-hidden>🃏</span>
                  <span className="xl-search-hit-text">
                    <span className="xl-search-hit-title">{h.title}</span>
                    {h.subtitle && (
                      <span className="xl-search-hit-subtitle">
                        {h.subtitle}
                      </span>
                    )}
                  </span>
                </button>
              ))}
            </div>
          )}

          {convHits.length > 0 && (
            <div className="xl-search-section">
              <div className="xl-search-section-label">
                {copy.sectionConvs}
              </div>
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
                      <span className="xl-search-hit-subtitle">
                        {h.subtitle}
                      </span>
                    )}
                  </span>
                </button>
              ))}
            </div>
          )}

          {!hasResults && (
            <div className="xl-search-empty">{copy.noResult}</div>
          )}

          {/* CTA bas du panel : on peut toujours poser la question à l'IA */}
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
