import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { pinyin } from 'pinyin-pro';
import { Converter } from 'opencc-js';
import type { Language } from '../i18n';
import { cplayerSongs, type CPlayerLyricLine, type CPlayerSong } from '../data/cplayer-songs';
import { getAllLessons, getLessonByHanzi } from '../data/lessons';
import cfdictData from '../data/cfdict-compact.json';
import {
  enrichLyricsWithAI,
  fetchYouTubeVideoMetadata,
  fetchSyncedLyricsFromLrclib,
  generateLyricsWithAI,
  hasAIGenerationEnabled,
  hasYouTubeSearchEnabled,
  searchYouTubeCpop,
  type CPlayerSearchResult
} from '../services/cplayerService';

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

const normalizeText = (value: string) => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export default function CPlayerPage({ language, onBackHome }: CPlayerPageProps) {
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
  const [searchBusy, setSearchBusy] = useState(false);
  const [lyricsBusy, setLyricsBusy] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [selectedToken, setSelectedToken] = useState<{ lineIndex: number; tokenIndex: number } | null>(null);
  const [showAllLyrics, setShowAllLyrics] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
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

  const allLessons = useMemo(() => getAllLessons(), []);
  const cfdict = cfdictData as Record<string, string>;

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
    const map = new Map<string, ReturnType<typeof getAllLessons>[number]>();
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
      const exact = getLessonByHanzi(token);
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
        const charLesson = getLessonByHanzi(char) || fallbackCharMap.get(char);
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
    [fallbackCharMap, language]
  );

  const activeVideoId = useMemo(() => {
    if (customVideoId) return customVideoId;
    if (!selectedSong) return null;
    return parseYouTubeVideoId(selectedSong.youtubeUrl);
  }, [customVideoId, selectedSong]);

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
      if (currentTime >= lyricLines[i].time) index = i;
      else break;
    }
    return index;
  }, [lyricLines, currentTime]);

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
      setLyricsBusy(false);
      setStatusMessage(null);
      return;
    }

    let cancelled = false;
    const loadLyrics = async () => {
      setLyricsBusy(true);
      setLyricsSource('generated');
      setGeneratedLyrics([]);
      setStatusMessage(language === 'fr' ? 'Recherche des paroles sur lrclib…' : 'Searching lyrics on lrclib…');

      let lines = await fetchSyncedLyricsFromLrclib({ title, artist });

      if (!cancelled && lines.length && hasAIGenerationEnabled()) {
        setStatusMessage(language === 'fr' ? 'Paroles trouvées ! Ajout du pinyin et des traductions…' : 'Lyrics found! Adding pinyin and translations…');
        const enriched = await enrichLyricsWithAI({ title, artist, lines });
        if (enriched.length) lines = enriched;
      }

      if (!cancelled && !lines.length) {
        if (hasAIGenerationEnabled()) {
          setStatusMessage(language === 'fr' ? 'Paroles non trouvées sur lrclib. Génération IA en cours…' : 'No lyrics on lrclib. AI generation in progress…');
          lines = await generateLyricsWithAI({ title, artist, maxLines: 24 });
        } else {
          console.warn('[CPlayer] Gemini API key not set – cannot generate lyrics');
        }
      }

      if (cancelled) return;

      setGeneratedLyrics(lines);
      if (lines.length) {
        setStatusMessage(language === 'fr' ? 'Paroles chargées.' : 'Lyrics loaded.');
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
  }, [activeVideoId, language, selectedSong?.artist, selectedSong?.id, selectedSong?.lyrics?.length, selectedSong?.title, trackMeta?.artist, trackMeta?.title]);

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
