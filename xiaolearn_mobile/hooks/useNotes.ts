/**
 * useNotes — notes personnelles, synchronisées avec le web.
 *
 * Même clé et même format que `useNotes.ts` de xiaolearn_app (`xl_notes_v1`,
 * tableau de PersonalNote sérialisé) : une note écrite sur le web apparaît sur
 * mobile et réciproquement.
 *
 * Fusion défensive, identique au web : union par identifiant, et pour un même
 * identifiant on garde la version au `updatedAt` le plus récent. On ne
 * remplace jamais la liste locale par le cloud tel quel — une note créée
 * hors-ligne ne doit pas disparaître.
 */
import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFirestoreSync } from './useFirestoreSync';

const STORAGE_KEY = 'xl_notes_v1';
const SYNC_KEYS = [STORAGE_KEY];

export const NOTE_TITLE_MAX = 120;
export const NOTE_CONTENT_MAX = 5000;

export const NOTE_TAGS = ['grammar', 'vocabulary', 'pronunciation', 'culture', 'other'] as const;
export type NoteTag = (typeof NOTE_TAGS)[number];

export const NOTE_TAG_LABELS: Record<NoteTag, { fr: string; en: string; color: string }> = {
  grammar:       { fr: 'Grammaire',     en: 'Grammar',       color: '#5199E4' },
  vocabulary:    { fr: 'Vocabulaire',   en: 'Vocabulary',    color: '#2B8C7E' },
  pronunciation: { fr: 'Prononciation', en: 'Pronunciation', color: '#F2B341' },
  culture:       { fr: 'Culture',       en: 'Culture',       color: '#8B6CC7' },
  other:         { fr: 'Autre',         en: 'Other',         color: '#78909C' },
};

export interface PersonalNote {
  id: string;
  title: string;
  content: string;
  tag?: string;
  createdAt: string;
  updatedAt: string;
}

const nowISO = () => new Date().toISOString();
const nextId = () => `note-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

/** Ne garde que ce qui ressemble à une note valide (le cloud peut mentir). */
function sanitizeList(raw: unknown): PersonalNote[] {
  if (!Array.isArray(raw)) return [];
  const out: PersonalNote[] = [];
  for (const n of raw) {
    if (!n || typeof n !== 'object') continue;
    const r = n as Record<string, unknown>;
    if (typeof r.id !== 'string' || !r.id) continue;
    out.push({
      id: r.id,
      title: typeof r.title === 'string' ? r.title.slice(0, NOTE_TITLE_MAX) : '',
      content: typeof r.content === 'string' ? r.content.slice(0, NOTE_CONTENT_MAX) : '',
      tag: typeof r.tag === 'string' ? r.tag : undefined,
      createdAt: typeof r.createdAt === 'string' ? r.createdAt : nowISO(),
      updatedAt: typeof r.updatedAt === 'string' ? r.updatedAt : nowISO(),
    });
  }
  return out;
}

/** Plus récente d'abord. */
const byRecent = (a: PersonalNote, b: PersonalNote) => b.updatedAt.localeCompare(a.updatedAt);

export function useNotes() {
  const [notes, setNotes] = useState<PersonalNote[]>([]);
  const [loading, setLoading] = useState(true);

  const readLocal = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      setNotes(sanitizeList(raw ? JSON.parse(raw) : []).sort(byRecent));
    } catch { setNotes([]); }
    setLoading(false);
  }, []);

  // useFirestoreSync relit le local après chaque arrivée cloud
  const { save } = useFirestoreSync(SYNC_KEYS, readLocal);

  useEffect(() => { void readLocal(); }, [readLocal]);

  const persist = useCallback(async (next: PersonalNote[]) => {
    const sorted = [...next].sort(byRecent);
    setNotes(sorted);
    await save(STORAGE_KEY, JSON.stringify(sorted));
  }, [save]);

  const upsert = useCallback(async (
    draft: { id?: string; title: string; content: string; tag?: string },
  ) => {
    const now = nowISO();
    const title = draft.title.trim().slice(0, NOTE_TITLE_MAX);
    const content = draft.content.trim().slice(0, NOTE_CONTENT_MAX);
    if (!title && !content) return;

    const existing = draft.id ? notes.find(n => n.id === draft.id) : undefined;
    const note: PersonalNote = existing
      ? { ...existing, title, content, tag: draft.tag, updatedAt: now }
      : { id: nextId(), title, content, tag: draft.tag, createdAt: now, updatedAt: now };

    await persist([note, ...notes.filter(n => n.id !== note.id)]);
  }, [notes, persist]);

  const remove = useCallback(async (id: string) => {
    await persist(notes.filter(n => n.id !== id));
  }, [notes, persist]);

  return { notes, loading, upsert, remove, reload: readLocal };
}
