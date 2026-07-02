import { doc, getDoc, runTransaction, serverTimestamp } from 'firebase/firestore';
import type { CPlayerLyricLine } from '../data/cplayer-songs';
import { db } from '../firebase/config';

const SHARED_LYRICS_COLLECTION = 'cplayer_lyrics';
const APP_CONFIG_COLLECTION = 'app_config';
const CPLAYER_OWNER_DOC_ID = 'cplayer_owner';

type SharedLyricsSource = 'ai-generated' | 'runtime-cache' | 'human-reviewed';

interface SharedLyricsPayload {
  videoId: string;
  title: string;
  artist: string;
  lines: CPlayerLyricLine[];
}

export interface SharedLyricsRecord {
  videoId: string;
  title: string;
  artist: string;
  lines: CPlayerLyricLine[];
  source: SharedLyricsSource;
  reviewed: boolean;
  revision: number;
  updatedBy?: string;
  updatedAt?: string;
}

interface PublishSharedLyricsPayload extends SharedLyricsPayload {
  updatedByUid?: string;
  updatedBy?: string;
}

const toNonEmptyString = (value: unknown) => String(value || '').trim();

const sanitizeLine = (line: Partial<CPlayerLyricLine>, index: number): CPlayerLyricLine => {
  const timeValue = typeof line.time === 'number' && Number.isFinite(line.time) ? line.time : index * 4;
  return {
    time: Math.max(0, Math.round(timeValue * 100) / 100),
    hanzi: toNonEmptyString(line.hanzi),
    pinyin: toNonEmptyString(line.pinyin),
    translationFr: toNonEmptyString(line.translationFr),
    translationEn: toNonEmptyString(line.translationEn)
  };
};

const sanitizeLines = (lines: CPlayerLyricLine[]): CPlayerLyricLine[] => {
  return lines
    .map((line, index) => sanitizeLine(line, index))
    .filter((line) => line.hanzi.length > 0)
    .slice(0, 180);
};

const toIsoString = (value: unknown): string | undefined => {
  if (!value) return undefined;
  if (typeof value === 'string') return value;
  if (typeof value === 'object' && value !== null && 'toDate' in value && typeof value.toDate === 'function') {
    try {
      const date = value.toDate();
      if (date instanceof Date && !Number.isNaN(date.getTime())) {
        return date.toISOString();
      }
    } catch {
      return undefined;
    }
  }
  return undefined;
};

const ensureCPlayerOwnerAccess = async (uid: string): Promise<boolean> => {
  const cleanUid = uid.trim();
  if (!cleanUid) return false;

  const ownerRef = doc(db, APP_CONFIG_COLLECTION, CPLAYER_OWNER_DOC_ID);
  return runTransaction(db, async (tx) => {
    const ownerSnap = await tx.get(ownerRef);
    if (!ownerSnap.exists()) {
      tx.set(ownerRef, {
        ownerUid: cleanUid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return true;
    }

    const ownerData = ownerSnap.data() as Record<string, unknown>;
    const ownerUid = toNonEmptyString(ownerData.ownerUid);
    if (ownerUid !== cleanUid) {
      return false;
    }

    tx.update(ownerRef, { updatedAt: serverTimestamp() });
    return true;
  });
};

export const hasCPlayerOwnerAccess = async (uid?: string | null): Promise<boolean> => {
  const cleanUid = toNonEmptyString(uid);
  if (!cleanUid) return false;

  const ownerRef = doc(db, APP_CONFIG_COLLECTION, CPLAYER_OWNER_DOC_ID);
  const ownerSnap = await getDoc(ownerRef);
  if (!ownerSnap.exists()) return true;

  const ownerData = ownerSnap.data() as Record<string, unknown>;
  const ownerUid = toNonEmptyString(ownerData.ownerUid);
  if (!ownerUid) return true;
  return ownerUid === cleanUid;
};

export const getSharedLyrics = async (videoId: string): Promise<SharedLyricsRecord | null> => {
  const cleanVideoId = videoId.trim();
  if (!cleanVideoId) return null;

  const ref = doc(db, SHARED_LYRICS_COLLECTION, cleanVideoId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;

  const raw = snap.data() as Record<string, unknown>;
  const linesRaw = Array.isArray(raw.lines) ? (raw.lines as Partial<CPlayerLyricLine>[]) : [];
  const lines = linesRaw
    .map((line, index) => sanitizeLine(line, index))
    .filter((line) => line.hanzi.length > 0);
  if (!lines.length) return null;

  return {
    videoId: cleanVideoId,
    title: toNonEmptyString(raw.title),
    artist: toNonEmptyString(raw.artist),
    lines,
    source: (toNonEmptyString(raw.source) as SharedLyricsSource) || 'runtime-cache',
    reviewed: Boolean(raw.reviewed),
    revision: typeof raw.revision === 'number' ? raw.revision : 1,
    updatedBy: toNonEmptyString(raw.updatedBy) || undefined,
    updatedAt: toIsoString(raw.updatedAt)
  };
};

export const cacheSharedLyricsIfMissing = async (
  payload: SharedLyricsPayload,
  source: Exclude<SharedLyricsSource, 'human-reviewed'> = 'runtime-cache'
) => {
  const cleanVideoId = payload.videoId.trim();
  if (!cleanVideoId) return false;
  const lines = sanitizeLines(payload.lines);
  if (!lines.length) return false;

  const ref = doc(db, SHARED_LYRICS_COLLECTION, cleanVideoId);
  return runTransaction(db, async (tx) => {
    const snap = await tx.get(ref);
    if (snap.exists()) {
      const data = snap.data() as Record<string, unknown>;
      if (Boolean(data.reviewed)) return false;
      return false;
    }

    tx.set(ref, {
      videoId: cleanVideoId,
      title: toNonEmptyString(payload.title),
      artist: toNonEmptyString(payload.artist),
      lines,
      source,
      reviewed: false,
      revision: 1,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return true;
  });
};

export const publishSharedLyrics = async (payload: PublishSharedLyricsPayload) => {
  const cleanVideoId = payload.videoId.trim();
  if (!cleanVideoId) {
    throw new Error('videoId manquant');
  }

  const lines = sanitizeLines(payload.lines);
  if (!lines.length) {
    throw new Error('Aucune ligne valide à publier');
  }

  const canPublish = await ensureCPlayerOwnerAccess(payload.updatedByUid || '');
  if (!canPublish) {
    throw new Error('Publication réservée au propriétaire du CPlayer');
  }

  const ref = doc(db, SHARED_LYRICS_COLLECTION, cleanVideoId);
  await runTransaction(db, async (tx) => {
    const snap = await tx.get(ref);
    const previous = snap.exists() ? (snap.data() as Record<string, unknown>) : null;
    const previousRevision = typeof previous?.revision === 'number' ? previous.revision : 0;

    tx.set(
      ref,
      {
        videoId: cleanVideoId,
        title: toNonEmptyString(payload.title),
        artist: toNonEmptyString(payload.artist),
        lines,
        source: 'human-reviewed',
        reviewed: true,
        revision: previousRevision + 1,
        updatedBy: toNonEmptyString(payload.updatedBy),
        updatedAt: serverTimestamp(),
        createdAt: previous?.createdAt || serverTimestamp()
      },
      { merge: true }
    );
  });
};
