/**
 * NotesPage.tsx — hub personnel « Mes notes » (XiaoLearn)
 * ---------------------------------------------------------------------------
 * Layout inspiré Seonsaengnim :
 *   - badge chip ambré « HUB PERSONNEL »
 *   - titre énorme + sous-titre
 *   - barre recherche plein-texte + bouton « + Nouvelle note » (noir arrondi)
 *   - état vide : grande card crème avec CTA
 *   - grille de cards (titre, extrait 3 lignes, date relative, tag coloré,
 *     actions éditer/supprimer au hover)
 *   - éditeur en modal (titre, textarea auto-grow 5000 chars, tag select)
 *
 * Données : useNotes() → localStorage `xl_notes_v1` + sync Firestore.
 * Styles : ../styles/notes.css (scoped sous .notes-page).
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import '../styles/notes.css';
import {
  useNotes,
  NOTE_CONTENT_MAX,
  NOTE_TITLE_MAX,
  type NoteTag,
  type PersonalNote
} from '../hooks/useNotes';

type Language = 'fr' | 'en';

interface NotesPageProps {
  language?: Language;
}

// ============================================================================
//  COPIES
// ============================================================================

const COPY = {
  fr: {
    badge: '📄 HUB PERSONNEL',
    title: 'Mes notes',
    subtitle:
      'Note une règle, un exemple, une explication clé — sans quitter ton élan. Tout reste ici, prêt pour tes révisions.',
    searchPh: 'Rechercher dans tes notes…',
    newNote: '+ Nouvelle note',
    emptyTitle: 'Ton premier mémo t’attend',
    emptySubtitle:
      'Une règle de grammaire, un mot qui t’échappe, une tournure à retenir : capture-le ici avant qu’il ne s’envole.',
    emptyCta: '+ Créer une note',
    noResults: 'Aucune note ne correspond à ta recherche.',
    editorNew: 'Nouvelle note',
    editorEdit: 'Modifier la note',
    fieldTitle: 'Titre',
    fieldTitlePh: 'Ex : Différence 了 / 过',
    fieldContent: 'Contenu',
    fieldContentPh:
      'Écris ta règle, ton exemple, ton explication… tout ce qui t’aidera à réviser.',
    fieldTag: 'Tag (optionnel)',
    tagNone: 'Aucun tag',
    save: 'Enregistrer',
    cancel: 'Annuler',
    delete: 'Supprimer',
    confirmDelete: 'Supprimer cette note ?',
    edit: 'Modifier',
    untitled: 'Sans titre',
    justNow: 'à l’instant',
    minutesAgo: (n: number) => `il y a ${n} min`,
    hoursAgo: (n: number) => `il y a ${n} h`,
    yesterday: 'hier',
    daysAgo: (n: number) => `il y a ${n} jours`,
    tags: {
      grammar: 'Grammaire',
      vocabulary: 'Vocabulaire',
      pronunciation: 'Prononciation',
      culture: 'Culture',
      other: 'Autre'
    } as Record<string, string>
  },
  en: {
    badge: '📄 PERSONAL HUB',
    title: 'My notes',
    subtitle:
      'Jot down a rule, an example, a key explanation — without breaking your flow. Everything stays here, ready for your reviews.',
    searchPh: 'Search your notes…',
    newNote: '+ New note',
    emptyTitle: 'Your first memo awaits',
    emptySubtitle:
      'A grammar rule, a word that keeps slipping away, a phrase worth keeping: capture it here before it flies off.',
    emptyCta: '+ Create a note',
    noResults: 'No note matches your search.',
    editorNew: 'New note',
    editorEdit: 'Edit note',
    fieldTitle: 'Title',
    fieldTitlePh: 'E.g. Difference 了 / 过',
    fieldContent: 'Content',
    fieldContentPh:
      'Write your rule, your example, your explanation… anything that will help you review.',
    fieldTag: 'Tag (optional)',
    tagNone: 'No tag',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    confirmDelete: 'Delete this note?',
    edit: 'Edit',
    untitled: 'Untitled',
    justNow: 'just now',
    minutesAgo: (n: number) => `${n} min ago`,
    hoursAgo: (n: number) => `${n} h ago`,
    yesterday: 'yesterday',
    daysAgo: (n: number) => `${n} days ago`,
    tags: {
      grammar: 'Grammar',
      vocabulary: 'Vocabulary',
      pronunciation: 'Pronunciation',
      culture: 'Culture',
      other: 'Other'
    } as Record<string, string>
  }
};

/** Ordre + slug des tags de l'éditeur (labels via COPY). */
const TAG_OPTIONS: NoteTag[] = [
  'grammar',
  'vocabulary',
  'pronunciation',
  'culture',
  'other'
];

// ============================================================================
//  Helpers
// ============================================================================

const relativeDate = (iso: string, copy: (typeof COPY)['fr']): string => {
  const ts = Date.parse(iso);
  if (!Number.isFinite(ts)) return '';
  const diffMs = Date.now() - ts;
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return copy.justNow;
  if (minutes < 60) return copy.minutesAgo(minutes);
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return copy.hoursAgo(hours);
  const days = Math.floor(hours / 24);
  if (days === 1) return copy.yesterday;
  if (days < 31) return copy.daysAgo(days);
  return new Date(ts).toLocaleDateString();
};

interface EditorState {
  /** null = création, sinon id de la note en cours d'édition. */
  id: string | null;
  title: string;
  content: string;
  tag: string;
}

// ============================================================================
//  Composant
// ============================================================================

export default function NotesPage({ language = 'fr' }: NotesPageProps) {
  const copy = COPY[language];
  const { notes, addNote, updateNote, deleteNote } = useNotes();

  const [query, setQuery] = useState('');
  const [editor, setEditor] = useState<EditorState | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const titleInputRef = useRef<HTMLInputElement | null>(null);

  // Auto-grow du textarea de l'éditeur.
  const autoGrow = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 420)}px`;
  };
  useEffect(() => {
    if (editor) {
      autoGrow();
      titleInputRef.current?.focus();
    }
  }, [editor?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Fermeture au clavier (Escape).
  useEffect(() => {
    if (!editor) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setEditor(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [editor]);

  // Tri : dernière modif en premier.
  const sorted = useMemo(
    () =>
      [...notes].sort(
        (a, b) => (Date.parse(b.updatedAt) || 0) - (Date.parse(a.updatedAt) || 0)
      ),
    [notes]
  );

  // Filtre plein-texte titre + contenu (insensible à la casse).
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sorted;
    return sorted.filter(
      (n) =>
        n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)
    );
  }, [sorted, query]);

  const openCreate = () =>
    setEditor({ id: null, title: '', content: '', tag: '' });
  const openEdit = (note: PersonalNote) =>
    setEditor({
      id: note.id,
      title: note.title,
      content: note.content,
      tag: note.tag ?? ''
    });

  const handleSave = () => {
    if (!editor) return;
    const title = editor.title.trim();
    const content = editor.content.trim();
    if (!title && !content) {
      setEditor(null);
      return;
    }
    if (editor.id === null) {
      addNote({ title, content, tag: editor.tag || undefined });
    } else {
      updateNote(editor.id, { title, content, tag: editor.tag || undefined });
    }
    setEditor(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm(copy.confirmDelete)) {
      deleteNote(id);
      setEditor((prev) => (prev && prev.id === id ? null : prev));
    }
  };

  const hasNotes = notes.length > 0;

  return (
    <div className="notes-page">
      {/* ---- Header ------------------------------------------------------ */}
      <header className="notes-header">
        <span className="notes-badge">{copy.badge}</span>
        <h1 className="notes-title">{copy.title}</h1>
        <p className="notes-subtitle">{copy.subtitle}</p>
      </header>

      {/* ---- Barre recherche + CTA -------------------------------------- */}
      <div className="notes-toolbar">
        <div className="notes-search">
          <span className="notes-search-icon" aria-hidden="true">
            🔍
          </span>
          <input
            type="search"
            className="notes-search-input"
            placeholder={copy.searchPh}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label={copy.searchPh}
          />
        </div>
        <button type="button" className="notes-new-btn" onClick={openCreate}>
          {copy.newNote}
        </button>
      </div>

      {/* ---- État vide --------------------------------------------------- */}
      {!hasNotes && (
        <div className="notes-empty">
          <div className="notes-empty-icon" aria-hidden="true">
            📄
          </div>
          <h2 className="notes-empty-title">{copy.emptyTitle}</h2>
          <p className="notes-empty-subtitle">{copy.emptySubtitle}</p>
          <button type="button" className="notes-new-btn" onClick={openCreate}>
            {copy.emptyCta}
          </button>
        </div>
      )}

      {/* ---- Aucun résultat de recherche --------------------------------- */}
      {hasNotes && filtered.length === 0 && (
        <p className="notes-no-results">{copy.noResults}</p>
      )}

      {/* ---- Grille de notes --------------------------------------------- */}
      {filtered.length > 0 && (
        <div className="notes-grid">
          {filtered.map((note) => (
            <article
              key={note.id}
              className="note-card"
              onClick={() => openEdit(note)}
            >
              <div className="note-card-actions">
                <button
                  type="button"
                  className="note-action-btn"
                  title={copy.edit}
                  aria-label={copy.edit}
                  onClick={(e) => {
                    e.stopPropagation();
                    openEdit(note);
                  }}
                >
                  ✏️
                </button>
                <button
                  type="button"
                  className="note-action-btn note-action-delete"
                  title={copy.delete}
                  aria-label={copy.delete}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(note.id);
                  }}
                >
                  🗑️
                </button>
              </div>
              <h3 className="note-card-title">
                {note.title || copy.untitled}
              </h3>
              {note.content && (
                <p className="note-card-excerpt">{note.content}</p>
              )}
              <footer className="note-card-footer">
                <span className="note-card-date">
                  {relativeDate(note.updatedAt, copy)}
                </span>
                {note.tag && (
                  <span className={`note-tag note-tag--${note.tag}`}>
                    {copy.tags[note.tag] ?? note.tag}
                  </span>
                )}
              </footer>
            </article>
          ))}
        </div>
      )}

      {/* ---- Éditeur (modal) --------------------------------------------- */}
      {editor && (
        <div
          className="notes-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setEditor(null);
          }}
        >
          <div
            className="notes-modal"
            role="dialog"
            aria-modal="true"
            aria-label={editor.id === null ? copy.editorNew : copy.editorEdit}
          >
            <h2 className="notes-modal-title">
              {editor.id === null ? copy.editorNew : copy.editorEdit}
            </h2>

            <label className="notes-field-label" htmlFor="note-title-input">
              {copy.fieldTitle}
            </label>
            <input
              id="note-title-input"
              ref={titleInputRef}
              type="text"
              className="notes-field-input"
              placeholder={copy.fieldTitlePh}
              maxLength={NOTE_TITLE_MAX}
              value={editor.title}
              onChange={(e) =>
                setEditor((prev) =>
                  prev ? { ...prev, title: e.target.value } : prev
                )
              }
            />

            <label className="notes-field-label" htmlFor="note-content-input">
              {copy.fieldContent}
            </label>
            <textarea
              id="note-content-input"
              ref={textareaRef}
              className="notes-field-textarea"
              placeholder={copy.fieldContentPh}
              maxLength={NOTE_CONTENT_MAX}
              rows={5}
              value={editor.content}
              onChange={(e) => {
                const value = e.target.value;
                setEditor((prev) =>
                  prev ? { ...prev, content: value } : prev
                );
                autoGrow();
              }}
            />
            <div className="notes-char-count">
              {editor.content.length} / {NOTE_CONTENT_MAX}
            </div>

            <label className="notes-field-label" htmlFor="note-tag-select">
              {copy.fieldTag}
            </label>
            <select
              id="note-tag-select"
              className="notes-field-select"
              value={editor.tag}
              onChange={(e) =>
                setEditor((prev) =>
                  prev ? { ...prev, tag: e.target.value } : prev
                )
              }
            >
              <option value="">{copy.tagNone}</option>
              {TAG_OPTIONS.map((slug) => (
                <option key={slug} value={slug}>
                  {copy.tags[slug]}
                </option>
              ))}
            </select>

            <div className="notes-modal-actions">
              {editor.id !== null && (
                <button
                  type="button"
                  className="notes-btn notes-btn-danger"
                  onClick={() => handleDelete(editor.id as string)}
                >
                  {copy.delete}
                </button>
              )}
              <div className="notes-modal-actions-right">
                <button
                  type="button"
                  className="notes-btn notes-btn-ghost"
                  onClick={() => setEditor(null)}
                >
                  {copy.cancel}
                </button>
                <button
                  type="button"
                  className="notes-btn notes-btn-primary"
                  onClick={handleSave}
                  disabled={!editor.title.trim() && !editor.content.trim()}
                >
                  {copy.save}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
