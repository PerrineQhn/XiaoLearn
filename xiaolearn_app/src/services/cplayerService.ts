import type { CPlayerLyricLine } from '../data/cplayer-songs';

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_MODELS = [
  'gemini-2.0-flash-lite',
  'gemini-2.0-flash',
  'gemini-2.5-flash',
  'gemini-1.5-flash-latest'
] as const;
const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';

export interface CPlayerSearchResult {
  videoId: string;
  title: string;
  artist: string;
  thumbnail: string;
  durationLabel?: string;
  source: 'youtube';
}

interface YouTubeSearchItem {
  id: {
    videoId?: string;
  };
  snippet: {
    title: string;
    channelTitle: string;
    thumbnails?: {
      medium?: { url: string };
      default?: { url: string };
    };
  };
}

interface YouTubeVideoItem {
  id: string;
  contentDetails?: {
    duration?: string;
  };
  snippet?: {
    title?: string;
    channelTitle?: string;
    thumbnails?: {
      medium?: { url: string };
      default?: { url: string };
    };
  };
}

interface LrcLibSearchItem {
  trackName?: string;
  artistName?: string;
  syncedLyrics?: string;
  plainLyrics?: string;
  instrumental?: boolean;
}

const parseIsoDuration = (input?: string) => {
  if (!input) return '';
  const match = input.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '';
  const hours = Number(match[1] || 0);
  const minutes = Number(match[2] || 0);
  const seconds = Number(match[3] || 0);
  if (hours > 0) return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export const hasYouTubeSearchEnabled = () => Boolean(YOUTUBE_API_KEY);
export const hasAIGenerationEnabled = () => Boolean(GEMINI_API_KEY);

const parseLrcToTimedLines = (raw: string): CPlayerLyricLine[] => {
  if (!raw.trim()) return [];

  const lines: CPlayerLyricLine[] = [];
  const rows = raw.split('\n').map((line) => line.trim()).filter(Boolean);
  const stampRegex = /\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]/g;

  for (const row of rows) {
    const stamps = Array.from(row.matchAll(stampRegex));
    if (!stamps.length) continue;

    const hanzi = row.replace(stampRegex, '').trim();
    if (!hanzi) continue;

    for (const stamp of stamps) {
      const minutes = Number(stamp[1] || 0);
      const seconds = Number(stamp[2] || 0);
      const millisRaw = stamp[3] || '0';
      const millis = Number(millisRaw.padEnd(3, '0').slice(0, 3));
      const time = minutes * 60 + seconds + millis / 1000;

      lines.push({
        time: Number(time.toFixed(2)),
        hanzi
      });
    }
  }

  return lines.sort((a, b) => a.time - b.time);
};

const buildLooseTimedLines = (raw: string): CPlayerLyricLine[] => {
  const textLines = raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 80);

  return textLines.map((hanzi, index) => ({
    time: index * 4.6,
    hanzi
  }));
};

const collapseSpaces = (value: string) => value.replace(/\s+/g, ' ').trim();

const stripNoise = (value: string) =>
  collapseSpaces(
    value
      .replace(/[\[\(【（].*?[\]\)】）]/g, ' ')
      .replace(
        /\b(mv|official|lyrics?|lyric video|music video|karaoke|ver\.?|version|hd|4k|中字|中英字幕|官方|完整版|高清|舞蹈版|dance)\b/gi,
        ' '
      )
      .replace(/[|｜·•]/g, ' ')
      .replace(/\s[-–—]\s/g, ' ')
      .replace(/[_]/g, ' ')
  );

const extractChineseChunks = (value: string) => value.match(/[\u3400-\u9fff]{2,}/g) ?? [];

const unique = <T,>(values: T[]) => Array.from(new Set(values));

const buildLrcSearchQueries = (title: string, artist?: string) => {
  const cleanTitle = stripNoise(title);
  const cleanArtist = artist ? stripNoise(artist) : '';

  const chineseChunks = extractChineseChunks(cleanTitle);
  const lastChunk = chineseChunks[chineseChunks.length - 1] || '';
  const lastTwoChunks =
    chineseChunks.length >= 2 ? `${chineseChunks[chineseChunks.length - 2]} ${chineseChunks[chineseChunks.length - 1]}` : '';

  const trackCandidates = unique(
    [title, cleanTitle, lastTwoChunks, lastChunk]
      .map((item) => collapseSpaces(item))
      .filter((item) => item.length >= 2)
  ).slice(0, 6);

  const artistCandidates = unique([artist || '', cleanArtist].map((item) => collapseSpaces(item)).filter(Boolean));

  const queries: Array<{ trackName: string; artistName?: string }> = [];
  for (const trackName of trackCandidates) {
    if (artistCandidates.length) {
      for (const artistName of artistCandidates) {
        queries.push({ trackName, artistName });
      }
    }
    queries.push({ trackName });
  }

  return queries.slice(0, 10);
};

const searchLrclib = async (query: { trackName: string; artistName?: string }) => {
  const endpoint = new URL('https://lrclib.net/api/search');
  endpoint.searchParams.set('track_name', query.trackName);
  if (query.artistName) endpoint.searchParams.set('artist_name', query.artistName);

  const response = await fetch(endpoint.toString());
  if (!response.ok) return [] as LrcLibSearchItem[];
  const payload = (await response.json()) as LrcLibSearchItem[];
  if (!Array.isArray(payload)) return [];
  return payload;
};

export async function fetchSyncedLyricsFromLrclib(params: {
  title: string;
  artist?: string;
}): Promise<CPlayerLyricLine[]> {
  if (!params.title.trim()) return [];

  const queries = buildLrcSearchQueries(params.title, params.artist);
  const plainFallbacks: string[] = [];

  try {
    for (const query of queries) {
      const payload = await searchLrclib(query);
      if (!payload.length) continue;

      for (const entry of payload) {
        if (entry.instrumental) continue;
        if (entry.syncedLyrics) {
          const synced = parseLrcToTimedLines(entry.syncedLyrics);
          if (synced.length >= 2) return synced;
        }
        if (entry.plainLyrics) {
          plainFallbacks.push(entry.plainLyrics);
        }
      }
    }
  } catch {
    return [];
  }

  if (plainFallbacks.length) {
    return buildLooseTimedLines(plainFallbacks[0]);
  }
  return [];
}

export async function searchYouTubeCpop(query: string, maxResults = 8): Promise<CPlayerSearchResult[]> {
  if (!YOUTUBE_API_KEY || !query.trim()) return [];

  const searchTerm = `${query.trim()} cpop chinese lyrics`;
  const searchUrl = new URL('https://www.googleapis.com/youtube/v3/search');
  searchUrl.searchParams.set('part', 'snippet');
  searchUrl.searchParams.set('type', 'video');
  searchUrl.searchParams.set('maxResults', String(maxResults));
  searchUrl.searchParams.set('q', searchTerm);
  searchUrl.searchParams.set('key', YOUTUBE_API_KEY);

  const searchResponse = await fetch(searchUrl.toString());
  if (!searchResponse.ok) return [];

  const searchData = (await searchResponse.json()) as { items?: YouTubeSearchItem[] };
  const baseItems = (searchData.items ?? []).filter((item) => Boolean(item.id.videoId));
  if (!baseItems.length) return [];

  const videoIds = baseItems.map((item) => item.id.videoId!).join(',');
  const videosUrl = new URL('https://www.googleapis.com/youtube/v3/videos');
  videosUrl.searchParams.set('part', 'contentDetails');
  videosUrl.searchParams.set('id', videoIds);
  videosUrl.searchParams.set('key', YOUTUBE_API_KEY);

  let durationMap = new Map<string, string>();
  try {
    const videosResponse = await fetch(videosUrl.toString());
    if (videosResponse.ok) {
      const videosData = (await videosResponse.json()) as { items?: YouTubeVideoItem[] };
      durationMap = new Map(
        (videosData.items ?? []).map((item) => [item.id, parseIsoDuration(item.contentDetails?.duration)])
      );
    }
  } catch {
    durationMap = new Map();
  }

  return baseItems.map((item) => ({
    videoId: item.id.videoId!,
    title: item.snippet.title,
    artist: item.snippet.channelTitle,
    thumbnail: item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url || '',
    durationLabel: durationMap.get(item.id.videoId!) || '',
    source: 'youtube' as const
  }));
}

export async function fetchYouTubeVideoMetadata(videoId: string): Promise<CPlayerSearchResult | null> {
  if (!YOUTUBE_API_KEY || !videoId) return null;

  const videosUrl = new URL('https://www.googleapis.com/youtube/v3/videos');
  videosUrl.searchParams.set('part', 'snippet,contentDetails');
  videosUrl.searchParams.set('id', videoId);
  videosUrl.searchParams.set('key', YOUTUBE_API_KEY);

  const response = await fetch(videosUrl.toString());
  if (!response.ok) return null;
  const data = (await response.json()) as { items?: YouTubeVideoItem[] };
  const item = data.items?.[0];
  if (!item || !item.snippet) return null;

  return {
    videoId: item.id,
    title: item.snippet.title || 'YouTube Video',
    artist: item.snippet.channelTitle || 'YouTube',
    thumbnail: item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url || '',
    durationLabel: parseIsoDuration(item.contentDetails?.duration),
    source: 'youtube'
  };
}

export async function generateLyricsWithAI(params: {
  title: string;
  artist?: string;
  rawLyrics?: string;
  maxLines?: number;
}): Promise<CPlayerLyricLine[]> {
  if (!GEMINI_API_KEY || !params.title.trim()) return [];

  const maxLines = Math.max(4, Math.min(params.maxLines ?? 18, 30));
  const lyricsHint = params.rawLyrics?.trim()
    ? `RAW_LYRICS_HINT:\n${params.rawLyrics.trim()}`
    : 'RAW_LYRICS_HINT:\n(none)';

  const prompt = `
Tu es un assistant pour une app de chinois.
Génère des paroles structurées pour un lecteur C-Pop.

SONG_TITLE: ${params.title}
ARTIST: ${params.artist ?? 'Unknown'}
${lyricsHint}

Contraintes :
- Retourne UNIQUEMENT du JSON valide.
- Format:
{
  "lines": [
    {
      "time": number,
      "hanzi": string,
      "pinyin": string,
      "translationFr": string,
      "translationEn": string
    }
  ]
}
- ${maxLines} lignes maximum.
- time commence à 0 et augmente de 4 à 7 secondes par ligne.
- hanzi doit contenir des caractères chinois.
- pinyin sans tons numériques (texte lisible).
- traductions courtes, naturelles.
- Si RAW_LYRICS_HINT est fourni, reste cohérent avec ce texte.
`;

  let rawText: string | undefined;
  for (const model of GEMINI_MODELS) {
    const url = `${GEMINI_API_BASE}/${model}:generateContent?key=${GEMINI_API_KEY}`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.3,
            topK: 20,
            topP: 0.9,
            maxOutputTokens: 2048
          }
        })
      });

      if (!response.ok) {
        console.warn(`[CPlayer] Gemini generateLyrics failed with ${model}:`, response.status, response.statusText);
        try { console.warn('[CPlayer] Response body:', await response.text()); } catch { /* ignore */ }
        continue;
      }

      const data = (await response.json()) as {
        candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
      };
      rawText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      if (rawText) {
        console.info(`[CPlayer] Lyrics generated with model: ${model}`);
        break;
      }
      console.warn(`[CPlayer] ${model} returned no text. Full response:`, JSON.stringify(data).slice(0, 500));
    } catch (err) {
      console.warn(`[CPlayer] ${model} network error:`, err);
    }
  }

  if (!rawText) {
    console.warn('[CPlayer] All Gemini models failed for generateLyrics');
    return [];
  }
  const jsonText = rawText.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```$/i, '').trim();
  try {
    const parsed = JSON.parse(jsonText) as { lines?: CPlayerLyricLine[] };
    const lines = parsed.lines ?? [];
    return lines.map((line, index) => {
      return {
        time: Math.max(0, Math.round(line.time)),
        hanzi: (line.hanzi || '').trim(),
        pinyin: (line.pinyin || '').trim(),
        translationFr: (line.translationFr || '').trim(),
        translationEn: (line.translationEn || '').trim()
      };
    })
      .filter((line) => Boolean(line.hanzi))
      .slice(0, maxLines)
      .sort((a, b) => a.time - b.time)
      .map((line, index) => ({
        ...line,
        time: index === 0 ? Math.max(0, line.time) : Math.max(line.time, index * 4)
      }));
  } catch (err) {
    console.warn('[CPlayer] Failed to parse Gemini JSON:', err, '\nRaw:', jsonText.slice(0, 300));
    return [];
  }
}

export async function enrichLyricsWithAI(params: {
  title: string;
  artist?: string;
  lines: CPlayerLyricLine[];
}): Promise<CPlayerLyricLine[]> {
  if (!GEMINI_API_KEY || !params.lines.length) return [];

  const lines = params.lines.slice(0, 100);
  const minimalLines = lines.map((line, index) => ({
    index,
    hanzi: line.hanzi
  }));

  const prompt = `
Tu enrichis des paroles de chanson chinoise pour une app éducative.
Tu dois garder l'ordre des lignes, sans modifier le texte hanzi.

SONG_TITLE: ${params.title}
ARTIST: ${params.artist ?? 'Unknown'}
LINES_JSON:
${JSON.stringify(minimalLines)}

Retourne UNIQUEMENT du JSON:
{
  "lines": [
    {
      "index": number,
      "pinyin": string,
      "translationFr": string,
      "translationEn": string
    }
  ]
}

Contraintes:
- 1 entrée par index fourni, en commençant par l'index 0.
- TOUTES les lignes doivent être traduites, y compris la première (index 0).
- pinyin lisible, sans numéros de tons.
- traductions courtes et naturelles.
`;

  let rawText: string | undefined;
  for (const model of GEMINI_MODELS) {
    const url = `${GEMINI_API_BASE}/${model}:generateContent?key=${GEMINI_API_KEY}`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.2,
            topK: 20,
            topP: 0.9,
            maxOutputTokens: 8192
          }
        })
      });

      if (!response.ok) {
        console.warn(`[CPlayer] Gemini enrichLyrics failed with ${model}:`, response.status, response.statusText);
        try { console.warn('[CPlayer] Response body:', await response.text()); } catch { /* ignore */ }
        continue;
      }

      const data = (await response.json()) as {
        candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
      };
      rawText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      if (rawText) {
        console.info(`[CPlayer] Lyrics enriched with model: ${model}`);
        break;
      }
      console.warn(`[CPlayer] ${model} enrich returned no text.`);
    } catch (err) {
      console.warn(`[CPlayer] ${model} enrich network error:`, err);
    }
  }

  if (!rawText) {
    console.warn('[CPlayer] All Gemini models failed for enrichLyrics');
    return [];
  }

  const jsonText = rawText.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```$/i, '').trim();

  try {
    const parsed = JSON.parse(jsonText) as {
      lines?: Array<{
        index: number;
        pinyin?: string;
        translationFr?: string;
        translationEn?: string;
      }>;
    };

    const enrichMap = new Map<number, { pinyin: string; translationFr: string; translationEn: string }>();
    for (const item of parsed.lines ?? []) {
      if (typeof item.index !== 'number') continue;
      enrichMap.set(item.index, {
        pinyin: (item.pinyin || '').trim(),
        translationFr: (item.translationFr || '').trim(),
        translationEn: (item.translationEn || '').trim()
      });
    }

    return lines.map((line, index) => {
      const enriched = enrichMap.get(index);
      if (!enriched) return line;
      return {
        ...line,
        pinyin: enriched.pinyin || line.pinyin || '',
        translationFr: enriched.translationFr || line.translationFr || '',
        translationEn: enriched.translationEn || line.translationEn || ''
      };
    });
  } catch (err) {
    console.warn('[CPlayer] Failed to parse Gemini enrich JSON:', err, '\nRaw:', jsonText.slice(0, 300));
    return [];
  }
}
