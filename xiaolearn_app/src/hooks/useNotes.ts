/**
 * useNotes.ts — notes personnelles d'apprentissage (hub « Mes notes »)
 * ---------------------------------------------------------------------------
 * CRUD de notes libres (titre + contenu + tag optionnel), persistées en
 * localStorage (`xl_notes_v1`) et synchronisées cross-device via
 * useFirestoreSync (même pattern que usePersonalFlashcards) :
 *
 *   - useState(readInitial)         → hydratation immédiate depuis localStorage
 *   - useFirestoreSync(key, merge)  → reconcile + onSnapshot temps réel
 *   - persist()                     → localStorage + saveToFirestore
 *
 * Merge onUpdate DÉFENSIF : union par id, et pour les ids communs on garde la
 * version au `updatedAt` le plus récent. On ne remplace JAMAIS la liste
 * locale par le snapshot cloud tel quel — une note créée localement mais pas
 * encore propagée ne doit jamais être perdue.
 */
import { useCallback, useState } from 'react';
import { useFirestoreSync } from './useFirestoreSync';

const STORAGE_KEY = 'xl_notes_v1';

export const NOTE_TITLE_MAX = 120;
export const NOTE_CONTENT_MAX = 5000;

/** Tags proposés dans l'éditeur (slug stable, labels/couleurs côté UI). */
export const NOTE_TAGS = [
  'grammar',
  'vocabulary',
  'pronunciation',
  'culture',
  'other'
] as const;
export type NoteTag = (typeof NOTE_TAGS)[number];

export interface PersonalNote {
  id: string;
  title: string;
  content: string;
  /** Slug de tag optionnel (voir NOTE_TAGS). */
  tag?: string;
  createdAt: string; // ISO
  updatedAt: string; // ISO
}

const nowISO = () => new Date().toISOString();
const nextId = () => `note-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

/** Garde uniquement les objets qui ressemblent à des notes valides. */
const sanitizeList = (raw: unknown): PersonalNote[] => {
  if (!Array.isArray(raw)) return [];
  const out: PersonalNote[] = [];
  for (const item of raw) {
    if (!item || typeof item !== 'object') continue;
    const n = item as Partial<PersonalNote>;
    if (typeof n.id !== 'string' || !n.id) continue;
    out.push({
      id: n.id,
      title: typeof n.title === 'string' ? n.title : '',
      content: typeof n.content === 'string' ? n.content : '',
      tag: typeof n.tag === 'string' && n.tag ? n.tag : undefined,
      createdAt: typeof n.createdAt === 'string' ? n.createdAt : nowISO(),
      updatedAt: typeof n.updatedAt === 'string' ? n.updatedAt : nowISO()
    });
  }
  return out;
};

const readInitial = (): PersonalNote[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return sanitizeList(JSON.parse(raw));
  } catch {
    return [];
  }
};

export interface CreateNoteInput {
  title: string;
  content: string;
  tag?: string;
}

export interface UseNotesReturn {
  notes: PersonalNote[];
  addNote: (input: CreateNoteInput) => PersonalNote | null;
  updateNote: (id: string, patch: Partial<CreateNoteInput>) => void;
  deleteNote: (id: string) => void;
}

export function useNotes(): UseNotesReturn {
  const [notes, setNotes] = useState<PersonalNote[]>(readInitial);

  const { saveToFirestore } = useFirestoreSync(STORAGE_KEY, (data) => {
    const cloudNotes = sanitizeList(data);
    if (cloudNotes.length === 0 && !Array.isArray(data)) return;
    setNotes((prev) => {
      // Union par id ; pour les ids communs, garde la version la plus
      // récemment modifiée (updatedAt). Une note absente du cloud mais
      // présente localement est CONSERVÉE (jamais de perte locale).
      const byId = new Map<string, PersonalNote>();
      for (const n of prev) byId.set(n.id, n);
      for (const c of cloudNotes) {
        const existing = byId.get(c.id);
        if (!existing) {
          byId.set(c.id, c);
        } else {
          const localTs = Date.parse(existing.updatedAt ?? '') || 0;
          const cloudTs = Date.parse(c.updatedAt ?? '') || 0;
          if (cloudTs > localTs) byId.set(c.id, c);
        }
      }
      const merged = Array.from(byId.values());
      // Évite un re-render (et un re-save en écho) si rien n'a changé.
      if (
        merged.length === prev.length &&
        merged.every((n, i) => n.id === prev[i].id && n.updatedAt === prev[i].updatedAt)
      ) {
        return prev;
      }
      return merged;
    });
  });

  const persist = useCallback(
    (next: PersonalNote[]) => {
      if (typeof window !== 'undefined') {
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          /* quota */
        }
      }
      saveToFirestore(next);
    },
    [saveToFirestore]
  );

  const addNote = useCallback(
    (input: CreateNoteInput): PersonalNote | null => {
      const title = input.title.trim().slice(0, NOTE_TITLE_MAX);
      const content = input.content.trim().slice(0, NOTE_CONTENT_MAX);
      if (!title && !content) return null;
      const note: PersonalNote = {
        id: nextId(),
        title,
        content,
        tag: input.tag || undefined,
        createdAt: nowISO(),
        updatedAt: nowISO()
      };
      setNotes((prev) => {
        const next = [note, ...prev];
        persist(next);
        return next;
      });
      return note;
    },
    [persist]
  );

  const updateNote = useCallback(
    (id: string, patch: Partial<CreateNoteInput>) => {
      setNotes((prev) => {
        let changed = false;
        const next = prev.map((n) => {
          if (n.id !== id) return n;
          changed = true;
          return {
            ...n,
            title:
              patch.title !== undefined
                ? patch.title.trim().slice(0, NOTE_TITLE_MAX)
                : n.title,
            content:
              patch.content !== undefined
                ? patch.content.trim().slice(0, NOTE_CONTENT_MAX)
                : n.content,
            tag: patch.tag !== undefined ? patch.tag || undefined : n.tag,
            updatedAt: nowISO()
          };
        });
        if (!changed) return prev;
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const deleteNote = useCallback(
    (id: string) => {
      setNotes((prev) => {
        if (!prev.some((n) => n.id === id)) return prev;
        const next = prev.filter((n) => n.id !== id);
        persist(next);
        return next;
      });
    },
    [persist]
  );

  return { notes, addNote, updateNote, deleteNote };
}
