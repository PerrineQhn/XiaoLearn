import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { pinyin } from 'pinyin-pro';
import { Converter } from 'opencc-js';
import type { Language } from '../i18n';
import { cplayerSongs, type CPlayerCategory, type CPlayerLyricLine, type CPlayerSong } from '../data/cplayer-songs';
import { getAllLessons, getAllLessonsIncludingHorsHsk } from '../data/lessons';
import cfdictData from '../data/cfdict-compact.json';
import type { LessonItem } from '../types';
import { useAuth } from '../contexts/AuthContext';
import {
  enrichLyricsWithAI,
  fetchYouTubeVideoMetadata,
  fetchYouTubeCaptions,
  fetchSyncedLyricsBestEffort,
  generateLyricsWithAI,
  hasAIGenerationEnabled,
  hasYouTubeSearchEnabled,
  searchYouTubeCpop,
  type CPlayerSearchResult
} from '../services/cplayerService';
import {
  cacheSharedLyricsIfMissing,
  getSharedLyrics,
  hasCPlayerOwnerAccess,
  publishSharedLyrics
} from '../services/cplayerLyricsRepository';

interface CPlayerPageProps {
  language: Language;
  onBackHome: () => void;
}

interface WordInfo {
  hanzi: string;
  category: string;
  pinyin: string;
  translation: string;
  exampleHanzi?: string;
  examplePinyin?: string;
  exampleTranslation?: string;
}

interface TrackMeta {
  title: string;
  artist: string;
  videoId: string;
}

interface GuidedShelf {
  id: string;
  icon: string;
  titleFr: string;
  titleEn: string;
  subtitleFr: string;
  subtitleEn: string;
  seedQueries: string[];
  fallbackSongId: string;
}

declare global {
  interface Window {
    YT?: {
      Player: new (elementId: string, config: unknown) => YTPlayer;
      PlayerState: {
        PLAYING: number;
        PAUSED: number;
        ENDED: number;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface YTPlayer {
  destroy: () => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  seekTo: (time: number, allowSeekAhead?: boolean) => void;
  playVideo: () => void;
  pauseVideo: () => void;
  setVolume: (volume: number) => void;
}

let youtubeApiPromise: Promise<void> | null = null;

const loadYouTubeApi = () => {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.YT?.Player) return Promise.resolve();
  if (youtubeApiPromise) return youtubeApiPromise;

  youtubeApiPromise = new Promise<void>((resolve) => {
    const previousReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previousReady?.();
      resolve();
    };

    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    script.async = true;
    document.body.appendChild(script);
  });

  return youtubeApiPromise;
};

const isChineseChar = (char: string) => /[\u3400-\u9fff]/.test(char);

const hasChinese = (text: string) => /[\u3400-\u9fff]/.test(text);

// Traditional → Simplified conversion for accurate pinyin
const t2s = Converter({ from: 'tw', to: 'cn' });

// Characters that opencc-js misses (Taiwan-specific variants)
const extraT2S: Record<string, string> = {
  '妳': '你',
  '祂': '他',
  '牠': '它',
};

const toSimplified = (text: string): string => {
  let result = t2s(text);
  for (const [trad, simp] of Object.entries(extraT2S)) {
    result = result.split(trad).join(simp);
  }
  return result;
};

const pinyinFromText = (text: string): string =>
  pinyin(toSimplified(text), { toneType: 'symbol', type: 'string' });

const pinyinArrayFromText = (text: string): string[] =>
  pinyin(toSimplified(text), { toneType: 'symbol', type: 'array' });

const segmentChinese = (text: string): string[] => {
  const IntlAny = Intl as Record<string, unknown>;
  if (typeof IntlAny.Segmenter === 'function') {
    const segmenter = new (IntlAny.Segmenter as new (locale: string, opts: { granularity: string }) => { segment(t: string): Iterable<{ segment: string }> })('zh', { granularity: 'word' });
    return [...segmenter.segment(text)].map((s) => s.segment);
  }
  return Array.from(text);
};

const parseYouTubeVideoId = (value: string) => {
  const input = value.trim();
  if (!input) return null;

  const directMatch = input.match(/^[a-zA-Z0-9_-]{11}$/);
  if (directMatch) return input;

  try {
    const url = new URL(input);
    if (url.hostname.includes('youtu.be')) {
      const id = url.pathname.replace('/', '');
      return id.length === 11 ? id : null;
    }
    if (url.hostname.includes('youtube.com')) {
      const id = url.searchParams.get('v');
      if (id && id.length === 11) return id;
      const parts = url.pathname.split('/');
      const embedIdx = parts.findIndex((part) => part === 'embed' || part === 'shorts');
      if (embedIdx >= 0) {
        const candidate = parts[embedIdx + 1];
        if (candidate && candidate.length === 11) return candidate;
      }
    }
  } catch {
    return null;
  }

  return null;
};

const formatSeconds = (value: number) => {
  const safe = Math.max(0, Math.floor(value));
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const normalizeEditableLyrics = (rows: Array<Partial<CPlayerLyricLine>>): CPlayerLyricLine[] => {
  return rows
    .map((row, index) => {
      const timeValue = typeof row.time === 'number' && Number.isFinite(row.time) ? row.time : index * 4;
      return {
        time: Math.max(0, Math.round(timeValue * 100) / 100),
        hanzi: String(row.hanzi || '').trim(),
        pinyin: String(row.pinyin || '').trim(),
        translationFr: String(row.translationFr || '').trim(),
        translationEn: String(row.translationEn || '').trim()
      };
    })
    .filter((line) => line.hanzi.length > 0)
    .slice(0, 180);
};

const normalizeText = (value: string) => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const cleanYouTubeTitle = (value: string) => {
  return value
    .replace(/\[[^\]]*\]/g, ' ')
    .replace(/\([^)]*\)/g, ' ')
    .replace(/（[^）]*）/g, ' ')
    .replace(/\b(official|mv|music\s*video|lyric\s*video|lyrics|hd|4k|中字|字幕|官方|完整版|live|现场|audio|version|ver\.|ost)\b/gi, ' ')
    .replace(/[-–—_:|]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

const scoreLyricLines = (lines: CPlayerLyricLine[], durationSec: number) => {
  if (!lines || lines.length < 3) return -1;
  const times = lines
    .map((l) => l.time)
    .filter((t) => typeof t === 'number' && Number.isFinite(t))
    .sort((a, b) => a - b);
  if (times.length < 3) return -1;

  const first = times[0];
  const last = times[times.length - 1];

  const span = Math.max(0, last - first);
  const spanRatio = durationSec > 0 ? Math.min(1, span / Math.max(1, durationSec - 2)) : 0;

  const endDiff = durationSec > 0 ? Math.abs(durationSec - last) : 0;
  const endPenalty = durationSec > 0 ? Math.min(1, endDiff / 20) : 0;

  const lineBonus = Math.min(1, lines.length / 40);
  const spanPenalty = span < 20 ? 1 : 0;

  return (spanRatio * 0.65 + lineBonus * 0.35) - (endPenalty * 0.75 + spanPenalty * 0.75);
};

const pickBestLyricsCandidate = (
  candidates: Array<{ label: string; title: string; artist: string; provider: 'youtube' | 'lrclib' | 'kugeci'; lines: CPlayerLyricLine[] }>,
  durationSec: number
) => {
  let best:
    | { label: string; title: string; artist: string; provider: 'youtube' | 'lrclib' | 'kugeci'; lines: CPlayerLyricLine[]; score: number }
    | null = null;

  for (const cand of candidates) {
    const score = scoreLyricLines(cand.lines, durationSec);
    if (!best || score > best.score) best = { ...cand, score };
  }
  return best;
};

const LYRICS_OFFSET_STORAGE_KEY = 'cplayer-lyrics-offsets';
const clampLyricsOffset = (value: number) => Math.max(-120, Math.min(120, Math.round(value * 10) / 10));

const readLyricsOffsetMap = (): Record<string, number> => {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(LYRICS_OFFSET_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    if (!parsed || typeof parsed !== 'object') return {};
    const normalized: Record<string, number> = {};
    Object.entries(parsed).forEach(([key, value]) => {
      if (typeof value === 'number' && Number.isFinite(value)) {
        normalized[key] = clampLyricsOffset(value);
      }
    });
    return normalized;
  } catch {
    return {};
  }
};

const writeLyricsOffsetMap = (map: Record<string, number>) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(LYRICS_OFFSET_STORAGE_KEY, JSON.stringify(map));
};

const cplayerGuidedShelves: GuidedShelf[] = [
  {
    id: 'trending',
    icon: '\u{1F525}',
    titleFr: 'Tendances du moment',
    titleEn: 'Trending Now',
    subtitleFr: 'Les dernières sorties synchronisées',
    subtitleEn: 'Latest synced releases',
    seedQueries: ['mandopop new songs official mv', 'c-pop trending songs'],
    fallbackSongId: 'jaychou-gaobaiqiqiu'
  },
  {
    id: 'ballads',
    icon: '\u{1F494}',
    titleFr: 'Ballades',
    titleEn: 'Ballads',
    subtitleFr: 'Vocabulaire des émotions',
    subtitleEn: 'Emotion-focused vocabulary',
    seedQueries: ['mandopop ballad lyrics', 'chinese love songs lyrics'],
    fallbackSongId: 'reneliu-houlai'
  },
  {
    id: 'party',
    icon: '\u{1F389}',
    titleFr: 'Party anthems',
    titleEn: 'Party Anthems',
    subtitleFr: 'Expressions énergiques du quotidien',
    subtitleEn: 'High-energy daily expressions',
    seedQueries: ['mandopop dance song lyrics', 'c-pop party song'],
    fallbackSongId: 'jaychou-bencaogangmu'
  },
  {
    id: 'cdrama-beginner',
    icon: '\u{1F4FA}',
    titleFr: 'Extraits C-dramas débutant',
    titleEn: 'Beginner C-Drama Clips',
    subtitleFr: 'Dialogues simples, vocabulaire de base',
    subtitleEn: 'Simple dialogues and core vocabulary',
    seedQueries: ['cdrama ost beginner chinese subtitles', 'chinese drama simple dialogue'],
    fallbackSongId: 'cyndi-aini'
  },
  {
    id: 'cdrama-intermediate',
    icon: '\u{1F4FA}',
    titleFr: 'Extraits C-dramas intermédiaire',
    titleEn: 'Intermediate C-Drama Clips',
    subtitleFr: 'Conversations naturelles, expressions familières',
    subtitleEn: 'Natural conversations and colloquial expressions',
    seedQueries: ['cdrama ost chinese lyrics', 'chinese drama conversation scene'],
    fallbackSongId: 'jaychou-daoxiang'
  },
  {
    id: 'weekly',
    icon: '\u{1F195}',
    titleFr: 'Ajoutés cette semaine',
    titleEn: 'Added This Week',
    subtitleFr: 'Du contenu frais régulièrement',
    subtitleEn: 'Fresh content updated often',
    seedQueries: ['new mandopop this week', 'c-pop latest release lyrics'],
    fallbackSongId: 'gem-guangnianzhiwai'
  }
];

const cplayerCategoryOrder: CPlayerCategory[] = [
  'tendances',
  'ballades',
  'party_anthems',
  'cpop',
  'guofeng',
  'indie_rock',
  'rnb_soul',
  'cdrama_ost'
];
const cplayerCategoryLabels: Record<CPlayerCategory, { fr: string; en: string }> = {
  tendances: { fr: 'Tendances', en: 'Trending' },
  ballades: { fr: 'Ballades', en: 'Ballads' },
  party_anthems: { fr: 'Hymnes festifs', en: 'Party Anthems' },
  cpop: { fr: 'C-Pop', en: 'C-Pop' },
  guofeng: { fr: 'Guofeng', en: 'Guofeng (Traditional)' },
  indie_rock: { fr: 'Indé / Rock', en: 'Indie & Rock' },
  rnb_soul: { fr: 'R&B / soul', en: 'R&B / Soul' },
  cdrama_ost: { fr: 'OST de C-dramas', en: 'C-Drama OST' }
};

export default function CPlayerPage({ language, onBackHome }: CPlayerPageProps) {
  const { user } = useAuth();
  const [query, setQuery] = useState('');
  const [selectedSong, setSelectedSong] = useState<CPlayerSong | null>(null);
  const [customVideoId, setCustomVideoId] = useState<string | null>(null);
  const [trackMeta, setTrackMeta] = useState<TrackMeta | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [generatedLyrics, setGeneratedLyrics] = useState<CPlayerLyricLine[]>([]);
  const [lyricsSource, setLyricsSource] = useState<'song' | 'generated'>('song');
  const [volume, setVolume] = useState(65);
  const volumeRef = useRef(65);
  const [onlineResults, setOnlineResults] = useState<CPlayerSearchResult[]>([]);
  const [guidedResults, setGuidedResults] = useState<Record<string, CPlayerSearchResult | null>>({});
  const [guidedBusy, setGuidedBusy] = useState(false);
  const [searchBusy, setSearchBusy] = useState(false);
  const [lyricsBusy, setLyricsBusy] = useState(false);
  const [lyricsRefreshToken, setLyricsRefreshToken] = useState(0);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [sharedLyricsInfo, setSharedLyricsInfo] = useState<{
    reviewed: boolean;
    updatedBy?: string;
    updatedAt?: string;
  } | null>(null);
  const [isLyricsEditorOpen, setIsLyricsEditorOpen] = useState(false);
  const [lyricsEditorValue, setLyricsEditorValue] = useState('');
  const [lyricsEditorError, setLyricsEditorError] = useState('');
  const [isPublishingLyrics, setIsPublishingLyrics] = useState(false);
  const [canManageLyrics, setCanManageLyrics] = useState(false);
  const [selectedToken, setSelectedToken] = useState<{ lineIndex: number; tokenIndex: number } | null>(null);
  const [showAllLyrics, setShowAllLyrics] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [lyricsOffsetSec, setLyricsOffsetSec] = useState(0);
  const [history, setHistory] = useState<Array<{
    title: string;
    artist: string;
    videoId: string;
    thumbnail: string;
    playedAt: string;
  }>>([]);
  const playerRef = useRef<YTPlayer | null>(null);
  const pollRef = useRef<number | null>(null);
  const lineRefs = useRef<Map<number, HTMLButtonElement>>(new Map());
  const isLoopingRef = useRef(false);
  const guidedRailRef = useRef<HTMLDivElement | null>(null);
  const categoryRailRefs = useRef<Partial<Record<CPlayerCategory, HTMLDivElement | null>>>({});

  const [allLessons, setAllLessons] = useState<LessonItem[]>(() => getAllLessons());
  const cfdict = cfdictData as Record<string, string>;

  useEffect(() => {
    let active = true;
    getAllLessonsIncludingHorsHsk()
      .then((lessons) => {
        if (active) setAllLessons(lessons);
      })
      .catch((error) => {
        console.warn('Impossible de charger hors-hsk pour CPlayer', error);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    if (!user?.uid) {
      setCanManageLyrics(false);
      return () => {
        cancelled = true;
      };
    }

    hasCPlayerOwnerAccess(user.uid)
      .then((allowed) => {
        if (!cancelled) setCanManageLyrics(allowed);
      })
      .catch(() => {
        if (!cancelled) setCanManageLyrics(false);
      });

    return () => {
      cancelled = true;
    };
  }, [user?.uid]);

  const lessonByHanziMap = useMemo(() => {
    const map = new Map<string, LessonItem>();
    for (const lesson of allLessons) {
      if (!map.has(lesson.hanzi)) {
        map.set(lesson.hanzi, lesson);
      }
    }
    return map;
  }, [allLessons]);

  // Keep looping ref in sync with state
  useEffect(() => { isLoopingRef.current = isLooping; }, [isLooping]);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('cplayer-history');
      if (stored) setHistory(JSON.parse(stored));
    } catch { /* ignore */ }
  }, []);

  // Push to history when trackMeta changes
  const pushToHistory = useCallback((meta: TrackMeta) => {
    setHistory((prev) => {
      const filtered = prev.filter((h) => h.videoId !== meta.videoId);
      const entry = {
        title: meta.title,
        artist: meta.artist,
        videoId: meta.videoId,
        thumbnail: `https://img.youtube.com/vi/${meta.videoId}/mqdefault.jpg`,
        playedAt: new Date().toISOString(),
      };
      const next = [entry, ...filtered].slice(0, 20);
      try { localStorage.setItem('cplayer-history', JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  }, []);

  useEffect(() => {
    if (trackMeta) pushToHistory(trackMeta);
  }, [trackMeta, pushToHistory]);

  const fallbackCharMap = useMemo(() => {
    const map = new Map<string, LessonItem>();
    for (const lesson of allLessons) {
      for (const char of Array.from(lesson.hanzi)) {
        if (isChineseChar(char) && !map.has(char)) {
          map.set(char, lesson);
        }
      }
    }
    return map;
  }, [allLessons]);

  const getWordInfo = useCallback(
    (token: string, sentenceContext?: string): WordInfo | null => {
      if (!token || !hasChinese(token)) return null;

      // Contextual pinyin: convert trad→simplified, pass the full sentence to pinyin-pro
      // for polyphonic disambiguation, then extract the pinyin for this token
      let contextualPinyin: string;
      if (sentenceContext && sentenceContext !== token) {
        const fullPinyin = pinyinArrayFromText(sentenceContext);
        const tokenStart = sentenceContext.indexOf(token);
        if (tokenStart >= 0) {
          const charsBefore = Array.from(sentenceContext.slice(0, tokenStart)).length;
          const tokenCharCount = Array.from(token).length;
          contextualPinyin = fullPinyin.slice(charsBefore, charsBefore + tokenCharCount).join(' ');
        } else {
          contextualPinyin = pinyinFromText(token);
        }
      } else {
        contextualPinyin = pinyinFromText(token);
      }

      // 1. Exact match on the full token (works for multi-char words like 微笑)
      const exact = lessonByHanziMap.get(token);
      if (exact) {
        const example = exact.examples?.[0];
        return {
          hanzi: exact.hanzi,
          category: exact.category || (language === 'fr' ? 'mot' : 'word'),
          pinyin: contextualPinyin || exact.pinyin || '-',
          translation: language === 'fr' ? exact.translationFr || exact.translation : exact.translation || exact.translationFr,
          exampleHanzi: example?.hanzi,
          examplePinyin: example?.pinyin,
          exampleTranslation: example?.translation
        };
      }

      // 2. For single characters, try fallback map
      if (token.length === 1) {
        const fallback = fallbackCharMap.get(token);
        if (fallback) {
          const example = fallback.examples?.[0];
          return {
            hanzi: token,
            category: fallback.category || (language === 'fr' ? 'mot' : 'word'),
            pinyin: contextualPinyin || fallback.pinyin || '-',
            translation: language === 'fr' ? fallback.translationFr || fallback.translation : fallback.translation || fallback.translationFr,
            exampleHanzi: example?.hanzi,
            examplePinyin: example?.pinyin,
            exampleTranslation: example?.translation
          };
        }
        // Character not in HSK dict: try CFDICT
        const cfdictCharFr = cfdict[token];
        return {
          hanzi: token,
          category: language === 'fr' ? 'caractère' : 'character',
          pinyin: contextualPinyin || '-',
          translation: cfdictCharFr || ''
        };
      }

      // 3. For multi-char tokens not in HSK dict: try CFDICT
      const simplified = toSimplified(token);
      const cfdictFr = cfdict[simplified] || cfdict[token];
      if (cfdictFr) {
        return {
          hanzi: token,
          category: language === 'fr' ? 'mot' : 'word',
          pinyin: contextualPinyin || '-',
          translation: cfdictFr
        };
      }

      // 4. Last resort: combine individual character meanings
      const charMeanings: string[] = [];
      for (const char of Array.from(simplified)) {
        const charLesson = lessonByHanziMap.get(char) || fallbackCharMap.get(char);
        const charCfdict = cfdict[char];
        if (charLesson) {
          const meaning = language === 'fr'
            ? charLesson.translationFr || charLesson.translation
            : charLesson.translation || charLesson.translationFr;
          if (meaning) charMeanings.push(meaning);
        } else if (charCfdict) {
          charMeanings.push(charCfdict);
        }
      }
      return {
        hanzi: token,
        category: language === 'fr' ? 'mot' : 'word',
        pinyin: contextualPinyin || '-',
        translation: charMeanings.length ? charMeanings.join(' · ') : ''
      };
    },
    [cfdict, fallbackCharMap, language, lessonByHanziMap]
  );

  const activeVideoId = useMemo(() => {
    if (customVideoId) return customVideoId;
    if (!selectedSong) return null;
    return parseYouTubeVideoId(selectedSong.youtubeUrl);
  }, [customVideoId, selectedSong]);

  const localSongById = useMemo(() => {
    const map = new Map<string, CPlayerSong>();
    for (const song of cplayerSongs) {
      map.set(song.id, song);
    }
    return map;
  }, []);

  const guidedPickByShelf = useMemo(() => {
    const map = new Map<string, { type: 'online'; item: CPlayerSearchResult } | { type: 'local'; item: CPlayerSong }>();
    for (const shelf of cplayerGuidedShelves) {
      const local = localSongById.get(shelf.fallbackSongId);
      if (local) {
        map.set(shelf.id, { type: 'local', item: local });
        continue;
      }
      const online = guidedResults[shelf.id];
      if (online) {
        map.set(shelf.id, { type: 'online', item: online });
      }
    }
    return map;
  }, [guidedResults, localSongById]);

  const songsByCategory = useMemo(() => {
    return cplayerCategoryOrder.reduce(
      (acc, category) => ({
        ...acc,
        [category]: cplayerSongs.filter((song) => song.category === category)
      }),
      {} as Record<CPlayerCategory, CPlayerSong[]>
    );
  }, []);

  const filteredSongs = useMemo(() => {
    const term = normalizeText(query.trim());
    if (!term) return cplayerSongs;
    return cplayerSongs.filter((song) => normalizeText(`${song.title} ${song.artist}`).includes(term));
  }, [query]);

  const lyricLines = useMemo(() => {
    const songLyrics = selectedSong?.lyrics ?? [];
    if (lyricsSource === 'generated' && generatedLyrics.length > 0) {
      return generatedLyrics;
    }
    if (songLyrics.length > 0) {
      return songLyrics;
    }
    return generatedLyrics;
  }, [generatedLyrics, lyricsSource, selectedSong?.lyrics]);

  const activeLineIndex = useMemo(() => {
    if (!lyricLines.length) return -1;
    let index = -1;
    for (let i = 0; i < lyricLines.length; i += 1) {
      const lineTime = Math.max(0, lyricLines[i].time + lyricsOffsetSec);
      if (currentTime >= lineTime) index = i;
      else break;
    }
    return index;
  }, [lyricLines, currentTime, lyricsOffsetSec]);

  useEffect(() => {
    if (!activeVideoId) {
      setLyricsOffsetSec(0);
      return;
    }
    const offsets = readLyricsOffsetMap();
    setLyricsOffsetSec(clampLyricsOffset(offsets[activeVideoId] ?? 0));
  }, [activeVideoId]);

  useEffect(() => {
    if (!activeVideoId) return;
    const offsets = readLyricsOffsetMap();
    if (Math.abs(lyricsOffsetSec) < 0.001) {
      if (offsets[activeVideoId] !== undefined) {
        delete offsets[activeVideoId];
        writeLyricsOffsetMap(offsets);
      }
      return;
    }
    offsets[activeVideoId] = clampLyricsOffset(lyricsOffsetSec);
    writeLyricsOffsetMap(offsets);
  }, [activeVideoId, lyricsOffsetSec]);

  useEffect(() => {
    if (activeLineIndex < 0) return;
    const el = lineRefs.current.get(activeLineIndex);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [activeLineIndex]);

  const getFallbackLineMeta = useCallback(
    (line: CPlayerLyricLine) => {
      // Segment into words, then get pinyin per word (grouped, not char-by-char)
      const simplified = toSimplified(line.hanzi);
      const words = segmentChinese(simplified);
      const wordPinyins = words.map((w) =>
        hasChinese(w)
          ? pinyin(toSimplified(w), { toneType: 'symbol', type: 'array' }).join('')
          : w
      );
      const reliablePinyin = wordPinyins.join(' ');

      let translationFr = line.translationFr || '';
      if (!translationFr) {
        const wordTranslations = words
          .filter((w) => hasChinese(w))
          .map((w) => cfdict[w] || '')
          .filter(Boolean);
        if (wordTranslations.length) {
          translationFr = wordTranslations.join(' ; ');
        }
      }

      return {
        pinyin: reliablePinyin,
        translationFr,
        translationEn: line.translationEn || translationFr
      };
    },
    []
  );

  useEffect(() => {
    if (!showSuggestions) return;
    const raw = query.trim();
    if (!raw || parseYouTubeVideoId(raw) || raw.length < 2) {
      setOnlineResults([]);
      return;
    }
    if (!hasYouTubeSearchEnabled()) return;

    let cancelled = false;
    const timer = window.setTimeout(async () => {
      setSearchBusy(true);
      try {
        const results = await searchYouTubeCpop(raw, 8);
        if (!cancelled) setOnlineResults(results);
      } finally {
        if (!cancelled) setSearchBusy(false);
      }
    }, 260);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [query, showSuggestions]);

  useEffect(() => {
    if (!hasYouTubeSearchEnabled()) return;

    let cancelled = false;
    setGuidedBusy(true);

    const loadGuidedRows = async () => {
      const rows = await Promise.all(
        cplayerGuidedShelves.map(async (shelf) => {
          for (const seed of shelf.seedQueries) {
            try {
              const results = await searchYouTubeCpop(seed, 1);
              if (results.length > 0) {
                return [shelf.id, results[0]] as const;
              }
            } catch {
              // Continue to next seed if one query fails.
            }
          }
          return [shelf.id, null] as const;
        })
      );

      if (cancelled) return;
      setGuidedResults(Object.fromEntries(rows));
      setGuidedBusy(false);
    };

    loadGuidedRows().catch(() => {
      if (!cancelled) setGuidedBusy(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!activeVideoId) return;
    let cancelled = false;

    const initializePlayer = async () => {
      await loadYouTubeApi();
      if (cancelled || !window.YT?.Player) return;

      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }

      playerRef.current = new window.YT.Player('cplayer-youtube-player', {
        videoId: activeVideoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          disablekb: 1
        },
        events: {
          onReady: (event: { target: YTPlayer }) => {
            event.target.setVolume(volumeRef.current);
            setDuration(event.target.getDuration() || 0);
            setCurrentTime(event.target.getCurrentTime() || 0);
          },
          onStateChange: (event: { data: number }) => {
            if (!window.YT?.PlayerState) return;
            setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
            if (event.data === window.YT.PlayerState.ENDED) {
              if (isLoopingRef.current) {
                playerRef.current?.seekTo(0, true);
                playerRef.current?.playVideo();
              } else {
                setCurrentTime(0);
              }
            }
          }
        }
      });
    };

    initializePlayer();

    return () => {
      cancelled = true;
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [activeVideoId, volume]);

  useEffect(() => {
    if (pollRef.current !== null) {
      window.clearInterval(pollRef.current);
      pollRef.current = null;
    }

    pollRef.current = window.setInterval(() => {
      if (!playerRef.current) return;
      const nextTime = playerRef.current.getCurrentTime?.() ?? 0;
      const nextDuration = playerRef.current.getDuration?.() ?? 0;
      setCurrentTime(nextTime);
      if (nextDuration > 0) setDuration(nextDuration);
    }, 250);

    return () => {
      if (pollRef.current !== null) {
        window.clearInterval(pollRef.current);
        pollRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!activeVideoId) return;

    const title = trackMeta?.title || selectedSong?.title || '';
    const artist = trackMeta?.artist || selectedSong?.artist || '';
    if (!title) return;

    if (selectedSong?.lyrics?.length) {
      setLyricsSource('song');
      setGeneratedLyrics([]);
      setSharedLyricsInfo(null);
      setLyricsBusy(false);
      setStatusMessage(null);
      return;
    }

    let cancelled = false;
    const loadLyrics = async () => {
      setLyricsBusy(true);
      setLyricsSource('generated');
      setGeneratedLyrics([]);
      setSharedLyricsInfo(null);
      setStatusMessage(language === 'fr' ? 'Recherche des paroles synchronisées…' : 'Searching synced lyrics…');

      let lines: CPlayerLyricLine[] = [];
      let chosenProvider: 'youtube' | 'lrclib' | 'kugeci' | 'none' = 'none';
      let finalStatus: string | null = null;
      let usedAI = false;

      try {
        const sharedLyrics = await getSharedLyrics(activeVideoId);
        if (!cancelled && sharedLyrics?.lines.length) {
          setGeneratedLyrics(sharedLyrics.lines);
          setLyricsSource('generated');
          setSharedLyricsInfo({
            reviewed: sharedLyrics.reviewed,
            updatedBy: sharedLyrics.updatedBy,
            updatedAt: sharedLyrics.updatedAt
          });
          setStatusMessage(
            language === 'fr'
              ? sharedLyrics.reviewed
                ? 'Paroles communautaires validées chargées.'
                : 'Paroles communautaires chargées (version IA).'
              : sharedLyrics.reviewed
                ? 'Reviewed community lyrics loaded.'
                : 'Community lyrics loaded (AI version).'
          );
          setLyricsBusy(false);
          return;
        }
      } catch (error) {
        console.warn('[CPlayer] Impossible de lire le cache partagé des paroles:', error);
      }

      // 1. Sous-titres YouTube (source la plus précise)
      try {
        setStatusMessage(language === 'fr' ? 'Recherche des sous-titres YouTube…' : 'Searching YouTube captions…');
        const ytLines = await fetchYouTubeCaptions(activeVideoId);
        if (!cancelled && ytLines.length) {
          lines = ytLines;
          chosenProvider = 'youtube';
        }
      } catch { /* fallback */ }

      if (cancelled) return;

      const rawTitle = title;
      const rawArtist = artist;
      const cleanedTitle = cleanYouTubeTitle(rawTitle);
      const cleanedArtist = cleanYouTubeTitle(rawArtist);

      const attempts: Array<{ label: string; t: string; a: string }> = [
        { label: 'raw', t: rawTitle, a: rawArtist },
        { label: 'clean-title', t: cleanedTitle, a: rawArtist },
        { label: 'clean-both', t: cleanedTitle, a: cleanedArtist },
        { label: 'title-only', t: cleanedTitle || rawTitle, a: '' }
      ].filter((x) => x.t.trim().length > 0);

      const candidates: Array<{ label: string; title: string; artist: string; provider: 'youtube' | 'lrclib' | 'kugeci'; lines: CPlayerLyricLine[] }> = [];

      // Si YouTube a déjà trouvé des paroles, on saute LrcLib/KuGeci
      if (lines.length) {
        candidates.push({ label: 'youtube', title: rawTitle, artist: rawArtist, provider: 'youtube', lines });
      }

      for (const attempt of attempts) {
        if (lines.length) break; // YouTube a déjà trouvé
        try {
          const best = await fetchSyncedLyricsBestEffort({ title: attempt.t, artist: attempt.a });
          if (best.lines && best.lines.length) {
            // best.provider is 'lrclib' | 'kugeci' | 'none'
            const provider = best.provider === 'none' ? 'lrclib' : best.provider;
            candidates.push({ label: attempt.label, title: attempt.t, artist: attempt.a, provider, lines: best.lines });
          }
        } catch {
          // ignore attempt errors
        }
      }

      if (candidates.length) {
        const chosen = pickBestLyricsCandidate(candidates, duration || 0);
        if (chosen) {
          lines = chosen.lines;
          chosenProvider = chosen.provider;
        }
      }

      if (!cancelled && lines.length && hasAIGenerationEnabled()) {
        setStatusMessage(language === 'fr' ? 'Paroles trouvées ! Ajout du pinyin et des traductions…' : 'Lyrics found! Adding pinyin and translations…');
        const enriched = await enrichLyricsWithAI({ title, artist, lines });
        if (enriched.length) {
          lines = enriched;
          usedAI = true;
          const translatedCount = lines.filter((line) => Boolean(line.translationFr || line.translationEn)).length;
          if (translatedCount > 0) {
            finalStatus =
              language === 'fr'
                ? `Paroles enrichies par IA (${translatedCount}/${lines.length} lignes traduites).`
                : `Lyrics enriched by AI (${translatedCount}/${lines.length} lines translated).`;
          } else {
            finalStatus =
              language === 'fr'
                ? 'Paroles synchronisées chargées, mais traduction IA incomplète.'
                : 'Synced lyrics loaded, but AI translation is incomplete.';
          }
        } else {
          finalStatus =
            language === 'fr'
              ? 'Paroles synchronisées chargées, enrichissement IA indisponible.'
              : 'Synced lyrics loaded, AI enrichment unavailable.';
        }
      } else if (!cancelled && lines.length && !hasAIGenerationEnabled()) {
        finalStatus =
  language === 'fr'
        ? `Paroles synchronisées chargées (${chosenProvider === 'youtube' ? 'YouTube' : chosenProvider === 'kugeci' ? 'fallback' : 'lrclib'}). Traduction IA indisponible (clé VITE_GEMINI_API_KEY manquante).`
        : `Synced lyrics loaded (${chosenProvider === 'youtube' ? 'YouTube' : chosenProvider === 'kugeci' ? 'fallback' : 'lrclib'}). AI translation unavailable (missing VITE_GEMINI_API_KEY).`;
      }

      if (!cancelled && lines.length && duration > 0) {
        const score = scoreLyricLines(lines, duration);
        if (score < 0.05) {
          lines = [];
          chosenProvider = 'none';
          setStatusMessage(
            language === 'fr'
              ? 'Paroles trouvées, mais elles ne correspondent pas à cette version (MV). Génération IA…'
              : 'Lyrics found, but they do not match this version (MV). Generating with AI…'
          );
        }
      }

      if (!cancelled && !lines.length) {
        if (hasAIGenerationEnabled()) {
          setStatusMessage(language === 'fr' ? 'Paroles non trouvées. Génération IA en cours…' : 'No lyrics found. AI generation in progress…');
          lines = await generateLyricsWithAI({ title, artist, maxLines: 24 });
          if (lines.length) {
            usedAI = true;
          }
        } else {
          console.warn('[CPlayer] Gemini API key not set – cannot generate lyrics');
        }
      }

      if (cancelled) return;

      if (lines.length) {
        try {
          await cacheSharedLyricsIfMissing(
            {
              videoId: activeVideoId,
              title,
              artist,
              lines
            },
            usedAI ? 'ai-generated' : 'runtime-cache'
          );
        } catch (error) {
          console.warn('[CPlayer] Impossible de mettre en cache les paroles partagées:', error);
        }
      }

      setGeneratedLyrics(lines);
      if (lines.length) {
        setStatusMessage(finalStatus ?? (language === 'fr' ? 'Paroles chargées.' : 'Lyrics loaded.'));
      } else {
        const noAI = !hasAIGenerationEnabled();
        setStatusMessage(
          language === 'fr'
            ? noAI
              ? 'Paroles introuvables. Clé Gemini AI manquante (VITE_GEMINI_API_KEY).'
              : 'Paroles introuvables. Vérifie la console pour plus de détails.'
            : noAI
              ? 'Lyrics not found. Gemini AI key missing (VITE_GEMINI_API_KEY).'
              : 'Lyrics not found. Check the console for details.'
        );
      }
      setLyricsBusy(false);
    };

    loadLyrics();

    return () => {
      cancelled = true;
    };
  }, [
    activeVideoId,
    language,
    lyricsRefreshToken,
    selectedSong?.artist,
    selectedSong?.id,
    selectedSong?.lyrics?.length,
    selectedSong?.title,
    trackMeta?.artist,
    trackMeta?.title
  ]);

  const clearToCustom = (videoId: string, nextMeta: TrackMeta | null) => {
    setCustomVideoId(videoId);
    setSelectedSong(null);
    setTrackMeta(nextMeta);
    setLyricsSource('generated');
    setGeneratedLyrics([]);
    setShowSuggestions(false);
  };

  const handlePickSong = (song: CPlayerSong) => {
    setSelectedSong(song);
    setCustomVideoId(null);
    const videoId = parseYouTubeVideoId(song.youtubeUrl) || '';
    setTrackMeta(videoId ? { title: song.title, artist: song.artist, videoId } : null);
    setLyricsSource('song');
    setGeneratedLyrics([]);
    setQuery(song.title);
    setStatusMessage(song.lyrics.length ? null : language === 'fr' ? 'Chargement des paroles…' : 'Loading lyrics…');
    setShowSuggestions(false);
  };

  const handlePickOnline = (item: CPlayerSearchResult) => {
    setQuery(item.title);
    clearToCustom(item.videoId, { title: item.title, artist: item.artist, videoId: item.videoId });
    setStatusMessage(language === 'fr' ? 'Vidéo YouTube chargée.' : 'YouTube video loaded.');
  };

  const handleLoad = async () => {
    setStatusMessage(null);
    const videoId = parseYouTubeVideoId(query);
    if (videoId) {
      clearToCustom(
        videoId,
        query.trim()
          ? {
              title: query.trim(),
              artist: 'YouTube',
              videoId
            }
          : null
      );

      const metadata = await fetchYouTubeVideoMetadata(videoId);
      if (metadata) {
        setTrackMeta({ title: metadata.title, artist: metadata.artist, videoId: metadata.videoId });
      }
      return;
    }

    if (onlineResults.length > 0) {
      handlePickOnline(onlineResults[0]);
      return;
    }

    const firstLocal = filteredSongs[0];
    if (!firstLocal) {
      setStatusMessage(language === 'fr' ? 'Aucun résultat.' : 'No result.');
      return;
    }
    handlePickSong(firstLocal);
  };

  const togglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) playerRef.current.pauseVideo();
    else playerRef.current.playVideo();
  };

  const handleSeek = (nextTime: number) => {
    setCurrentTime(nextTime);
    playerRef.current?.seekTo(nextTime, true);
  };

  const skipBackward = () => handleSeek(Math.max(0, currentTime - 10));
  const skipForward = () => handleSeek(Math.min(duration, currentTime + 10));

  const handlePickHistory = (entry: typeof history[number]) => {
    clearToCustom(entry.videoId, { title: entry.title, artist: entry.artist, videoId: entry.videoId });
    setQuery(entry.title);
  };

  const handlePickGuided = (shelfId: string) => {
    const pick = guidedPickByShelf.get(shelfId);
    if (!pick) {
      setStatusMessage(language === 'fr' ? 'Contenu guidé indisponible.' : 'Guided content unavailable.');
      return;
    }
    if (pick.type === 'online') {
      handlePickOnline(pick.item);
      return;
    }
    handlePickSong(pick.item);
  };

  const adjustLyricsOffset = (delta: number) => {
    setLyricsOffsetSec((prev) => clampLyricsOffset(prev + delta));
  };

  const handleOpenLyricsEditor = () => {
    if (!activeVideoId || !lyricLines.length) {
      setStatusMessage(language === 'fr' ? 'Aucune parole à corriger.' : 'No lyrics to review.');
      return;
    }

    const prefilled = lyricLines.map((line) => {
      const fallback = getFallbackLineMeta(line);
      const pinyin = (line.pinyin || '').trim() || fallback.pinyin || '';
      const translationFr = (line.translationFr || '').trim() || fallback.translationFr || '';
      const translationEn = (line.translationEn || '').trim() || fallback.translationEn || fallback.translationFr || '';

      return {
        time: Math.max(0, Math.round(((line.time || 0) + lyricsOffsetSec) * 100) / 100),
        hanzi: line.hanzi || '',
        pinyin,
        translationFr,
        translationEn
      };
    });

    setLyricsEditorError('');
    setLyricsEditorValue(JSON.stringify(prefilled, null, 2));
    setIsLyricsEditorOpen(true);
    if (Math.abs(lyricsOffsetSec) >= 0.001) {
      setLyricsOffsetSec(0);
    }
  };

  const handleCancelLyricsEditor = () => {
    setIsLyricsEditorOpen(false);
    setLyricsEditorError('');
  };

  const handlePublishLyrics = async () => {
    if (!activeVideoId) return;
    const title = trackMeta?.title || selectedSong?.title || '';
    const artist = trackMeta?.artist || selectedSong?.artist || '';
    if (!title) {
      setLyricsEditorError(language === 'fr' ? 'Titre manquant pour publier.' : 'Missing title to publish.');
      return;
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(lyricsEditorValue);
    } catch {
      setLyricsEditorError(language === 'fr' ? 'JSON invalide. Corrige le format.' : 'Invalid JSON. Please fix format.');
      return;
    }

    if (!Array.isArray(parsed)) {
      setLyricsEditorError(language === 'fr' ? 'Le JSON doit être un tableau de lignes.' : 'JSON must be an array of lines.');
      return;
    }

    const normalized = normalizeEditableLyrics(parsed as Array<Partial<CPlayerLyricLine>>);
    if (!normalized.length) {
      setLyricsEditorError(language === 'fr' ? 'Aucune ligne valide à publier.' : 'No valid line to publish.');
      return;
    }

    setIsPublishingLyrics(true);
    setLyricsEditorError('');
    try {
      await publishSharedLyrics({
        videoId: activeVideoId,
        title,
        artist,
        lines: normalized,
        updatedByUid: user?.uid,
        updatedBy: user?.email || user?.displayName || user?.uid
      });

      setGeneratedLyrics(normalized);
      setLyricsSource('generated');
      setSharedLyricsInfo({
        reviewed: true,
        updatedBy: user?.email || user?.displayName || user?.uid,
        updatedAt: new Date().toISOString()
      });
      setStatusMessage(
        language === 'fr'
          ? 'Paroles corrigées publiées. Cette version sera réutilisée pour tout le monde.'
          : 'Reviewed lyrics published. This version will be reused for everyone.'
      );
      setIsLyricsEditorOpen(false);
    } catch (error) {
      console.error('[CPlayer] publishSharedLyrics failed', error);
      const message = error instanceof Error ? error.message : '';
      setLyricsEditorError(
        message ||
          (language === 'fr'
            ? 'Publication impossible. Vérifie les règles Firestore.'
            : 'Publishing failed. Check Firestore rules.')
      );
    } finally {
      setIsPublishingLyrics(false);
    }
  };

  const handleRetryAiTranslation = () => {
    if (!activeVideoId) return;
    if (!hasAIGenerationEnabled()) {
      setStatusMessage(
        language === 'fr'
          ? 'Traduction IA indisponible: ajoute VITE_GEMINI_API_KEY.'
          : 'AI translation unavailable: set VITE_GEMINI_API_KEY.'
      );
      return;
    }
    setStatusMessage(language === 'fr' ? 'Relance de la traduction IA…' : 'Retrying AI translation…');
    setLyricsRefreshToken((prev) => prev + 1);
  };

  useEffect(() => {
    setIsLyricsEditorOpen(false);
    setLyricsEditorError('');
    setLyricsEditorValue('');
  }, [activeVideoId]);

  const scrollRailBy = (element: HTMLDivElement | null, direction: -1 | 1) => {
    if (!element) return;
    const amount = Math.max(180, Math.round(element.clientWidth * 0.86));
    element.scrollBy({ left: direction * amount, behavior: 'smooth' });
  };

  return (
    <div className="cplayer-page">
      <div className="cplayer-toolbar">
        <button type="button" className="cplayer-back-btn" onClick={onBackHome}>
          {language === 'fr' ? '← Retour' : '← Back'}
        </button>
        <div className="cplayer-search">
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            placeholder={
              language === 'fr'
                ? 'Recherche une chanson C-Pop ou colle un lien YouTube'
                : 'Search C-Pop song or paste YouTube URL'
            }
          />
          <button type="button" className="cplayer-load-btn" onClick={handleLoad}>
            {language === 'fr' ? 'Charger' : 'Load'}
          </button>
          {showSuggestions && query.trim() && !parseYouTubeVideoId(query) && (
            <div className="cplayer-suggestions">
              {searchBusy && <div className="cplayer-suggestion-hint">{language === 'fr' ? 'Recherche YouTube…' : 'Searching YouTube…'}</div>}

              {onlineResults.length > 0 && (
                <>
                  <div className="cplayer-suggestions-group-title">YouTube</div>
                  {onlineResults.slice(0, 6).map((item) => (
                    <button key={item.videoId} type="button" onClick={() => handlePickOnline(item)}>
                      {item.thumbnail && <img src={item.thumbnail} alt="" loading="lazy" />}
                      <span>
                        <strong>{item.title}</strong>
                        <small>
                          {item.artist}
                          {item.durationLabel ? ` · ${item.durationLabel}` : ''}
                        </small>
                      </span>
                    </button>
                  ))}
                </>
              )}

              {filteredSongs.length > 0 && (
                <>
                  <div className="cplayer-suggestions-group-title">{language === 'fr' ? 'Catalogue local' : 'Local catalog'}</div>
                  {filteredSongs.slice(0, 4).map((song) => (
                    <button key={song.id} type="button" onClick={() => handlePickSong(song)}>
                      <span>
                        <strong>{song.title}</strong>
                        <small>{song.artist}</small>
                      </span>
                    </button>
                  ))}
                </>
              )}

              {onlineResults.length === 0 && filteredSongs.length === 0 && !searchBusy && (
                <div className="cplayer-suggestion-hint">{language === 'fr' ? 'Aucun résultat.' : 'No result.'}</div>
              )}

              {!hasYouTubeSearchEnabled() && (
                <div className="cplayer-suggestion-hint">
                  {language === 'fr'
                    ? 'Recherche YouTube API désactivée (ajoute VITE_YOUTUBE_API_KEY).'
                    : 'YouTube API search is disabled (set VITE_YOUTUBE_API_KEY).'}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <section className="cplayer-guided">
        <div className="cplayer-guided-head">
          <h2>{language === 'fr' ? 'CPlayer guidé' : 'Guided CPlayer'}</h2>
          <p>
            {language === 'fr'
              ? 'Tu ouvres, tu cliques, ça démarre. Pas de recherche.'
              : 'Open, tap, and start. No search required.'}
          </p>
        </div>
        <div className="cplayer-rail-shell">
          <button
            type="button"
            className="cplayer-rail-nav left"
            onClick={() => scrollRailBy(guidedRailRef.current, -1)}
            aria-label={language === 'fr' ? 'Défiler à gauche' : 'Scroll left'}
          >
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="M12.5 4.5L7 10l5.5 5.5" />
            </svg>
          </button>
          <div className="cplayer-guided-rail" ref={guidedRailRef}>
            {cplayerGuidedShelves.map((shelf) => {
              const pick = guidedPickByShelf.get(shelf.id);
              const title = language === 'fr' ? shelf.titleFr : shelf.titleEn;
              const subtitle = language === 'fr' ? shelf.subtitleFr : shelf.subtitleEn;
              const pickLabel = pick ? `${pick.item.title} · ${pick.item.artist}` : language === 'fr' ? 'Chargement…' : 'Loading…';
              const pickVideoId = pick
                ? pick.type === 'online'
                  ? pick.item.videoId
                  : parseYouTubeVideoId(pick.item.youtubeUrl)
                : null;
              return (
                <button
                  key={shelf.id}
                  type="button"
                  className={`cplayer-guided-card${pickVideoId ? ' has-cover' : ''}`}
                  onClick={() => handlePickGuided(shelf.id)}
                  disabled={!pick}
                >
                  <span
                    className="cplayer-guided-cover"
                    style={pickVideoId ? { backgroundImage: `url(https://img.youtube.com/vi/${pickVideoId}/hqdefault.jpg)` } : undefined}
                  />
                  <span className="cplayer-guided-overlay">
                    <span className="cplayer-guided-icon">{shelf.icon}</span>
                    <span className="cplayer-guided-copy">
                      <strong>{title}</strong>
                      <small>{subtitle}</small>
                      <em>{pickLabel}</em>
                    </span>
                  </span>
                  <span className="cplayer-guided-action">{language === 'fr' ? 'Lancer' : 'Play'}</span>
                </button>
              );
            })}
          </div>
          <button
            type="button"
            className="cplayer-rail-nav right"
            onClick={() => scrollRailBy(guidedRailRef.current, 1)}
            aria-label={language === 'fr' ? 'Défiler à droite' : 'Scroll right'}
          >
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="M7.5 4.5L13 10l-5.5 5.5" />
            </svg>
          </button>
        </div>
        {guidedBusy && (
          <p className="cplayer-guided-hint">
            {language === 'fr' ? 'Synchronisation des catégories en cours…' : 'Syncing curated categories…'}
          </p>
        )}
        {!hasYouTubeSearchEnabled() && (
          <p className="cplayer-guided-hint">
            {language === 'fr'
              ? 'Mode guidé actif avec le catalogue local (clé YouTube manquante).'
              : 'Guided mode is running on the local catalog (YouTube key missing).'}
          </p>
        )}
      </section>

      <section className="cplayer-categories">
        <div className="cplayer-guided-head">
          <h2>{language === 'fr' ? 'Catalogue par catégorie' : 'Catalog by category'}</h2>
          <p>
            {language === 'fr'
              ? 'Toutes les chansons du catalogue local, triées par catégorie.'
              : 'All local catalog songs, grouped by category.'}
          </p>
        </div>
        <div className="cplayer-categories-list">
          {cplayerCategoryOrder.map((category) => {
            const songs = songsByCategory[category];
            if (!songs || songs.length === 0) return null;
            return (
              <article key={category} className="cplayer-category-card">
                <div className="cplayer-category-head">
                  <span>
                    <strong>{language === 'fr' ? cplayerCategoryLabels[category].fr : cplayerCategoryLabels[category].en}</strong>
                    <small>{songs.length} {language === 'fr' ? 'chansons' : 'songs'}</small>
                  </span>
                </div>
                <div className="cplayer-rail-shell">
                  <button
                    type="button"
                    className="cplayer-rail-nav left"
                    onClick={() => scrollRailBy(categoryRailRefs.current[category] || null, -1)}
                    aria-label={language === 'fr' ? 'Défiler à gauche' : 'Scroll left'}
                  >
                    <svg viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M12.5 4.5L7 10l5.5 5.5" />
                    </svg>
                  </button>
                  <div
                    className="cplayer-category-songs"
                    ref={(el) => {
                      categoryRailRefs.current[category] = el;
                    }}
                  >
                    {songs.map((song) => {
                      const songVideoId = parseYouTubeVideoId(song.youtubeUrl);
                      return (
                        <button
                          key={song.id}
                          type="button"
                          className="cplayer-category-song"
                          onClick={() => handlePickSong(song)}
                        >
                          <span
                            className="cplayer-category-song-cover"
                            style={songVideoId ? { backgroundImage: `url(https://img.youtube.com/vi/${songVideoId}/mqdefault.jpg)` } : undefined}
                          >
                            <em>{language === 'fr' ? 'Lire' : 'Play'}</em>
                          </span>
                          <span className="cplayer-category-song-meta">
                            <strong>{song.title}</strong>
                            <small>{song.artist}</small>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <button
                    type="button"
                    className="cplayer-rail-nav right"
                    onClick={() => scrollRailBy(categoryRailRefs.current[category] || null, 1)}
                    aria-label={language === 'fr' ? 'Défiler à droite' : 'Scroll right'}
                  >
                    <svg viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M7.5 4.5L13 10l-5.5 5.5" />
                    </svg>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <div className="cplayer-layout">
        <section className="cplayer-left">
          <div className="cplayer-video-shell">
            {!activeVideoId ? (
              <div className="cplayer-empty-video">
                <div>🎵</div>
                <h2>{language === 'fr' ? 'Lance une chanson C-Pop' : 'Start a C-Pop song'}</h2>
                <p>
                  {language === 'fr'
                    ? 'Colle un URL YouTube ou sélectionne une chanson.'
                    : 'Paste a YouTube URL or select a song.'}
                </p>
              </div>
            ) : (
              <div id="cplayer-youtube-player" className="cplayer-youtube-player" />
            )}
          </div>

          {/* Console Apple Music */}
          <div className="cplayer-console">
            <div className="cplayer-progress-wrap">
              <input
                type="range"
                className="cplayer-progress-bar"
                min={0}
                max={duration || 1}
                step={0.1}
                value={Math.min(currentTime, duration || 0)}
                onChange={(e) => handleSeek(Number(e.target.value))}
                style={{ '--progress': `${duration ? (currentTime / duration) * 100 : 0}%` } as React.CSSProperties}
              />
              <div className="cplayer-progress-times">
                <span>{formatSeconds(currentTime)}</span>
                <span>{formatSeconds(duration)}</span>
              </div>
            </div>

            <div className="cplayer-transport">
              <div className="cplayer-transport-side cplayer-console-header">
                {activeVideoId && (
                  <img
                    className="cplayer-console-thumb"
                    src={`https://img.youtube.com/vi/${activeVideoId}/mqdefault.jpg`}
                    alt=""
                  />
                )}
                <div className="cplayer-console-meta">
                  <span className="cplayer-console-title">
                    {trackMeta?.title || selectedSong?.title || (language === 'fr' ? 'Aucun titre' : 'No title')}
                  </span>
                  <span className="cplayer-console-artist">
                    {trackMeta?.artist || selectedSong?.artist || ''}
                  </span>
                </div>
              </div>
              <div className="cplayer-transport-center">
                <button type="button" className="cplayer-transport-btn" onClick={skipBackward} disabled={!activeVideoId} title="-10s">
                  {'\u23EE\uFE0E'}
                </button>
                <button type="button" className="cplayer-play-circle" onClick={togglePlay} disabled={!activeVideoId}>
                  {isPlaying ? '\u23F8\uFE0E' : '\u25B6\uFE0E'}
                </button>
                <button type="button" className="cplayer-transport-btn" onClick={skipForward} disabled={!activeVideoId} title="+10s">
                  {'\u23ED\uFE0E'}
                </button>
              </div>
              <div className="cplayer-transport-side cplayer-transport-right">
                <button
                  type="button"
                  className={`cplayer-transport-btn cplayer-loop-btn${isLooping ? ' active' : ''}`}
                  onClick={() => setIsLooping((v) => !v)}
                  title={language === 'fr' ? 'Boucle' : 'Loop'}
                >
                  {'\u27F3'}
                </button>
                <label className="cplayer-vol-control">
                  <span className="cplayer-vol-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      {volume > 0 && <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />}
                      {volume >= 40 && <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />}
                      {volume === 0 && <><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></>}
                    </svg>
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={volume}
                    className="cplayer-vol-slider"
                    onChange={(e) => {
                      const next = Number(e.target.value);
                      setVolume(next);
                      volumeRef.current = next;
                      playerRef.current?.setVolume(next);
                    }}
                    style={{ '--vol-progress': `${volume}%` } as React.CSSProperties}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Historique */}
          {history.length > 0 && (
            <div className="cplayer-history">
              <h3 className="cplayer-history-title">{language === 'fr' ? 'HISTORIQUE' : 'HISTORY'}</h3>
              <div className="cplayer-history-list">
                {history.map((entry) => (
                  <button
                    key={entry.videoId + entry.playedAt}
                    type="button"
                    className="cplayer-history-item"
                    onClick={() => handlePickHistory(entry)}
                  >
                    <img src={entry.thumbnail} alt="" className="cplayer-history-thumb" loading="lazy" />
                    <div className="cplayer-history-info">
                      <span className="cplayer-history-song">{entry.title}</span>
                      <span className="cplayer-history-artist">{entry.artist}</span>
                    </div>
                    <span className="cplayer-history-date">
                      {new Date(entry.playedAt).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

        </section>

        <aside className="cplayer-right">
          <header>
            <h2>{language === 'fr' ? 'Paroles' : 'Lyrics'}</h2>
            {(trackMeta || selectedSong) && (
              <p>{trackMeta ? `${trackMeta.title} · ${trackMeta.artist}` : `${selectedSong!.title} · ${selectedSong!.artist}`}</p>
            )}
            <div className="cplayer-lyrics-sync" role="group" aria-label={language === 'fr' ? 'Synchronisation des paroles' : 'Lyrics sync'}>
              {canManageLyrics && (
                <div className="cplayer-lyrics-sync-row">
                  <button type="button" className="cplayer-lyrics-sync-btn" onClick={() => adjustLyricsOffset(-0.5)} disabled={!activeVideoId}>
                    {language === 'fr' ? 'Plus tôt' : 'Earlier'}
                  </button>
                  <button type="button" className="cplayer-lyrics-sync-btn" onClick={() => adjustLyricsOffset(0.5)} disabled={!activeVideoId}>
                    {language === 'fr' ? 'Plus tard' : 'Later'}
                  </button>
                  <button type="button" className="cplayer-lyrics-sync-btn reset" onClick={() => setLyricsOffsetSec(0)} disabled={!activeVideoId || Math.abs(lyricsOffsetSec) < 0.001}>
                    Reset
                  </button>
                  <button
                    type="button"
                    className="cplayer-lyrics-sync-btn ai"
                    onClick={handleRetryAiTranslation}
                    disabled={!activeVideoId || lyricsBusy}
                  >
                    {language === 'fr' ? 'Relancer traduction IA' : 'Retry AI translation'}
                  </button>
                  <button
                    type="button"
                    className="cplayer-lyrics-sync-btn"
                    onClick={handleOpenLyricsEditor}
                    disabled={!activeVideoId || !lyricLines.length}
                  >
                    {language === 'fr' ? 'Corriger & publier' : 'Review & publish'}
                  </button>
                </div>
              )}
              <small>
                {language === 'fr' ? 'Décalage' : 'Offset'} {lyricsOffsetSec >= 0 ? '+' : ''}{lyricsOffsetSec.toFixed(1)}s
              </small>
              {sharedLyricsInfo && (
                <small className="cplayer-lyrics-status">
                  {language === 'fr'
                    ? `Cache partagé: ${sharedLyricsInfo.reviewed ? 'validé' : 'IA'}${sharedLyricsInfo.updatedBy ? ` · ${sharedLyricsInfo.updatedBy}` : ''}`
                    : `Shared cache: ${sharedLyricsInfo.reviewed ? 'reviewed' : 'AI'}${sharedLyricsInfo.updatedBy ? ` · ${sharedLyricsInfo.updatedBy}` : ''}`}
                </small>
              )}
              {statusMessage && <small className="cplayer-lyrics-status">{statusMessage}</small>}
              {canManageLyrics && isLyricsEditorOpen && (
                <div className="cplayer-lyrics-editor">
                  <p>
                    {language === 'fr'
                      ? 'Édite le JSON puis publie pour que cette version soit réutilisée automatiquement.'
                      : 'Edit JSON then publish so this version is automatically reused.'}
                  </p>
                  <textarea
                    value={lyricsEditorValue}
                    onChange={(event) => setLyricsEditorValue(event.target.value)}
                    spellCheck={false}
                  />
                  {lyricsEditorError && <small className="cplayer-lyrics-editor-error">{lyricsEditorError}</small>}
                  <div className="cplayer-lyrics-editor-actions">
                    <button
                      type="button"
                      className="cplayer-lyrics-sync-btn ai"
                      onClick={handlePublishLyrics}
                      disabled={isPublishingLyrics}
                    >
                      {isPublishingLyrics
                        ? language === 'fr'
                          ? 'Publication...'
                          : 'Publishing...'
                        : language === 'fr'
                          ? 'Publier'
                          : 'Publish'}
                    </button>
                    <button type="button" className="cplayer-lyrics-sync-btn reset" onClick={handleCancelLyricsEditor}>
                      {language === 'fr' ? 'Annuler' : 'Cancel'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </header>
          <div className="cplayer-lyrics-scroll">
            {!lyricLines.length ? (
              <div className="cplayer-empty-lyrics">
                {lyricsBusy
                  ? language === 'fr'
                    ? 'Chargement des paroles…'
                    : 'Loading lyrics…'
                  : statusMessage ||
                    (language === 'fr'
                      ? 'Charge une chanson puis génère les paroles.'
                      : 'Load a song and generate lyrics.')}
              </div>
            ) : (
              <>
                {lyricLines.map((line, index) => {
                  const isActive = index === activeLineIndex;
                  const distance = activeLineIndex >= 0 ? Math.abs(index - activeLineIndex) : -1;
                  const visible = showAllLyrics || (activeLineIndex < 0 ? index < 4 : distance <= 2);
                  if (!visible) return null;
                  const distanceClass = activeLineIndex < 0
                    ? (index === 0 ? 'idle' : 'far')
                    : isActive ? 'active' : distance === 1 ? 'near' : distance === 2 ? 'far' : 'farthest';
                  const lineMeta = getFallbackLineMeta(line);
                  const activeTranslation =
                    language === 'fr'
                      ? lineMeta.translationFr
                      : lineMeta.translationEn || lineMeta.translationFr;
                  const simplifiedHanzi = toSimplified(line.hanzi);
                  const tokens = segmentChinese(simplifiedHanzi);
                  return (
                    <button
                      key={`${line.time}-${line.hanzi}-${index}`}
                      ref={(el) => { if (el) lineRefs.current.set(index, el); else lineRefs.current.delete(index); }}
                      type="button"
                      className={`cplayer-line ${distanceClass}`}
                      onClick={() => handleSeek(line.time)}
                    >
                      <div className="cplayer-line-hanzi">
                        {tokens.map((token, tokenIndex) => {
                          if (!hasChinese(token)) {
                            return (
                              <span key={`${token}-${tokenIndex}`} className="cplayer-char-static">
                                {token}
                              </span>
                            );
                          }
                          const isSelected = selectedToken?.lineIndex === index && selectedToken?.tokenIndex === tokenIndex;
                          return (
                            <span
                              key={`${token}-${tokenIndex}`}
                              className={`cplayer-char-token${isSelected ? ' selected' : ''}`}
                              tabIndex={0}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedToken(
                                  isSelected ? null : { lineIndex: index, tokenIndex }
                                );
                              }}
                            >
                              {token}
                            </span>
                          );
                        })}
                      </div>
                      {selectedToken?.lineIndex === index && (() => {
                        const selToken = tokens[selectedToken.tokenIndex];
                        const info = selToken ? getWordInfo(selToken, simplifiedHanzi) : null;
                        if (!info) return null;
                        return (
                          <div className="cplayer-word-detail">
                            <strong>{info.hanzi}</strong>
                            <small className="badge">{info.category}</small>
                            <p>{info.pinyin}</p>
                            <p>{info.translation}</p>
                            {info.exampleHanzi && (
                              <div className="example">
                                <em>{info.exampleHanzi}</em>
                                {info.examplePinyin && <span>{info.examplePinyin}</span>}
                                {info.exampleTranslation && <span>{info.exampleTranslation}</span>}
                              </div>
                            )}
                          </div>
                        );
                      })()}
                      {isActive && lineMeta.pinyin && <p className="cplayer-line-pinyin cplayer-fade-in">{lineMeta.pinyin}</p>}
                      {isActive && activeTranslation && <p className="cplayer-line-translation cplayer-fade-in">{activeTranslation}</p>}
                    </button>
                  );
                })}
                <button
                  type="button"
                  className="cplayer-toggle-all"
                  onClick={() => setShowAllLyrics((v) => !v)}
                >
                  {showAllLyrics
                    ? (language === 'fr' ? 'Masquer' : 'Collapse')
                    : (language === 'fr' ? 'Toutes les paroles' : 'All lyrics')}
                </button>
              </>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
