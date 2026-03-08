import type { CPlayerLyricLine } from '../data/cplayer-songs';

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_MODELS = [
  'gemini-2.5-flash',
  'gemini-2.0-flash',
  'gemini-1.5-flash-latest',
  'gemini-2.0-flash-lite'
] as const;
const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';
const GEMINI_PROXY_PATH = '/api/gemini-proxy';

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

const hasChineseChars = (value: string) => /[\u3400-\u9fff]/.test(value);

// --- KuGeci interfaces and helpers ---
interface KuGeciSearchHit {
  title: string;
  artist?: string;
  url: string; // absolute
}

const decodeHtmlEntities = (input: string) =>
  input
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

const absoluteUrl = (maybeRelative: string) => {
  if (!maybeRelative) return '';
  if (maybeRelative.startsWith('http://') || maybeRelative.startsWith('https://')) return maybeRelative;
  if (maybeRelative.startsWith('/')) return `https://www.kugeci.com${maybeRelative}`;
  return `https://www.kugeci.com/${maybeRelative}`;
};

const extractTimecodedLrcFromHtml = (html: string): string => {
  // Try to find a block that already looks like LRC.
  // KuGeci pages often include raw LRC text somewhere in the HTML/JS.
  const normalized = html.replace(/\\r/g, '\n');

  // 1) Look for a JSON-ish field containing LRC.
  const jsonLike = normalized.match(/"lrc"\s*:\s*"([\s\S]*?)"/i);
  if (jsonLike?.[1]) {
    const raw = decodeHtmlEntities(jsonLike[1])
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, ' ')
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\');
    if (/\[\d{1,2}:\d{2}(?:\.\d{1,3})?\]/.test(raw)) return raw;
  }

  // 2) Look for a <textarea> or <pre> block.
  const block = normalized.match(/<(?:textarea|pre)[^>]*>([\s\S]*?)<\/(?:textarea|pre)>/i);
  if (block?.[1]) {
    const raw = decodeHtmlEntities(block[1]).trim();
    if (/\[\d{1,2}:\d{2}(?:\.\d{1,3})?\]/.test(raw)) return raw;
  }

  // 3) Fallback: extract every line containing at least one timestamp.
  const timeLineRegex = /^.*\[(\d{1,2}:\d{2}(?:\.\d{1,3})?)\].*$/gm;
  const lines: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = timeLineRegex.exec(normalized)) !== null) {
    const fullLine = m[0].trim();
    if (fullLine) lines.push(decodeHtmlEntities(fullLine));
  }
  return lines.join('\n');
};

const scoreKugeciHit = (hit: KuGeciSearchHit, requested: { title: string; artist?: string }) => {
  let score = 0;
  score += scoreTextMatch(hit.title, requested.title) * 2;
  if (requested.artist) score += scoreTextMatch(hit.artist || '', requested.artist) * 1.3;
  return score;
};

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
export const hasAIGenerationEnabled = () => Boolean(GEMINI_API_KEY) || canUseGeminiProxy();

const canUseGeminiProxy = () =>
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

const parseGeminiText = (data: unknown): string | undefined => {
  const safe = data as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  };
  return safe.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
};

const callGeminiDirect = async (model: string, body: unknown) => {
  const url = `${GEMINI_API_BASE}/${model}:generateContent?key=${GEMINI_API_KEY}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  const text = await response.text();
  let data: unknown = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = null;
  }
  return { response, text, data };
};

const callGeminiProxy = async (model: string, body: unknown) => {
  const response = await fetch(GEMINI_PROXY_PATH, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model, body })
  });
  const text = await response.text();
  let data: unknown = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = null;
  }
  return { response, text, data };
};

const runGeminiGenerateContent = async (model: string, body: unknown) => {
  try {
    if (canUseGeminiProxy()) {
      const proxied = await callGeminiProxy(model, body);
      if (proxied.response.ok) {
        return { ok: true as const, text: parseGeminiText(proxied.data) };
      }
      // Fallback direct si le proxy local n'est pas disponible
      const directAfterProxy = await callGeminiDirect(model, body);
      if (directAfterProxy.response.ok) {
        return { ok: true as const, text: parseGeminiText(directAfterProxy.data) };
      }
      return {
        ok: false as const,
        status: proxied.response.status || directAfterProxy.response.status,
        bodyText: proxied.text || directAfterProxy.text
      };
    }

    const direct = await callGeminiDirect(model, body);
    if (direct.response.ok) {
      return { ok: true as const, text: parseGeminiText(direct.data) };
    }

    const status = direct.response.status;
    const shouldProxyFallback = canUseGeminiProxy() && (status === 401 || status === 403);
    if (shouldProxyFallback) {
      const proxied = await callGeminiProxy(model, body);
      if (proxied.response.ok) {
        return { ok: true as const, text: parseGeminiText(proxied.data) };
      }
      return { ok: false as const, status: proxied.response.status, bodyText: proxied.text };
    }

    return { ok: false as const, status, bodyText: direct.text };
  } catch (err) {
    if (canUseGeminiProxy()) {
      try {
        const proxied = await callGeminiProxy(model, body);
        if (proxied.response.ok) {
          return { ok: true as const, text: parseGeminiText(proxied.data) };
        }
        return { ok: false as const, status: proxied.response.status, bodyText: proxied.text };
      } catch {
        return {
          ok: false as const,
          status: 0,
          bodyText: err instanceof Error ? err.message : String(err)
        };
      }
    }
    return {
      ok: false as const,
      status: 0,
      bodyText: err instanceof Error ? err.message : String(err)
    };
  }
};

const extractJsonObjectText = (raw: string): string => {
  const withoutFence = raw
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```$/i, '')
    .trim();
  if (!withoutFence) return '';
  if (withoutFence.startsWith('{') && withoutFence.endsWith('}')) return withoutFence;
  const first = withoutFence.indexOf('{');
  const last = withoutFence.lastIndexOf('}');
  if (first >= 0 && last > first) {
    return withoutFence.slice(first, last + 1);
  }
  return withoutFence;
};

const normalizeJsonLikeText = (input: string): string => {
  return input
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/"\s+"([A-Za-z_][A-Za-z0-9_]*)"\s*:/g, '"$1":')
    .replace(/,\s*([}\]])/g, '$1')
    .replace(/([{,]\s*)([A-Za-z_][A-Za-z0-9_]*)(\s*:)/g, '$1"$2"$3');
};

const parseJsonObjectLoose = <T>(raw: string): T | null => {
  const extracted = extractJsonObjectText(raw);
  const attempts = [extracted, normalizeJsonLikeText(extracted), normalizeJsonLikeText(raw)];

  for (const attempt of attempts) {
    const trimmed = attempt.trim();
    if (!trimmed.startsWith('{') || !trimmed.endsWith('}')) continue;
    try {
      return JSON.parse(trimmed) as T;
    } catch {
      // Try next strategy.
    }
  }
  return null;
};

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

const normalizeComparable = (value: string) =>
  stripNoise(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{L}\p{N}\u3400-\u9fff]+/gu, ' ')
    .trim();

const scoreTextMatch = (candidate: string, target: string): number => {
  const a = normalizeComparable(candidate);
  const b = normalizeComparable(target);
  if (!a || !b) return 0;
  if (a === b) return 14;
  if (a.replace(/\s+/g, '') === b.replace(/\s+/g, '')) return 12;
  if (a.includes(b) || b.includes(a)) return 9;

  const aTokens = new Set(a.split(' ').filter((token) => token.length >= 2));
  const bTokens = new Set(b.split(' ').filter((token) => token.length >= 2));
  let common = 0;
  for (const token of aTokens) {
    if (bTokens.has(token)) common += 1;
  }
  return common * 2;
};

const scoreLrcEntry = (
  entry: LrcLibSearchItem,
  requested: { title: string; artist?: string },
  query: { trackName: string; artistName?: string }
): number => {
  let score = 0;
  score += scoreTextMatch(entry.trackName || '', requested.title) * 2;
  score += scoreTextMatch(entry.trackName || '', query.trackName);
  score += scoreTextMatch(entry.artistName || '', requested.artist || '') * 1.6;
  score += scoreTextMatch(entry.artistName || '', query.artistName || '') * 0.8;
  return score;
};

const scoreSyncedLyricsLanguage = (lines: CPlayerLyricLine[]) => {
  if (!lines.length) return -50;
  const chineseLines = lines.filter((line) => hasChineseChars(line.hanzi)).length;
  const ratio = chineseLines / lines.length;
  if (ratio >= 0.7) return 18;
  if (ratio >= 0.45) return 10;
  if (ratio >= 0.2) return 4;
  return -18;
};

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

// --- KuGeci search and fetch functions ---
const searchKugeci = async (requested: { title: string; artist?: string }): Promise<KuGeciSearchHit[]> => {
  const q = collapseSpaces(`${requested.title} ${requested.artist || ''}`.trim());
  if (!q) return [];

  // KuGeci search endpoints can vary; try a couple of common patterns.
  const endpoints = [
    `https://www.kugeci.com/search?q=${encodeURIComponent(q)}`,
    `https://www.kugeci.com/search?key=${encodeURIComponent(q)}`,
    `https://www.kugeci.com/search/${encodeURIComponent(q)}`
  ];

  for (const url of endpoints) {
    try {
      const res = await fetch(url, { method: 'GET' });
      if (!res.ok) continue;
      const html = await res.text();

      // Extract song links like /song/XXXX
      const linkRegex = /href\s*=\s*"(\/song\/[^\"\?]+)"/gi;
      const hits: KuGeciSearchHit[] = [];
      let m: RegExpExecArray | null;
      const seen = new Set<string>();

      while ((m = linkRegex.exec(html)) !== null) {
        const rel = m[1];
        const abs = absoluteUrl(rel);
        if (!abs || seen.has(abs)) continue;
        seen.add(abs);

        // Try to capture a nearby title text.
        const aroundStart = Math.max(0, m.index - 220);
        const aroundEnd = Math.min(html.length, m.index + 420);
        const around = html.slice(aroundStart, aroundEnd);
        const titleMatch = around.match(/title\s*=\s*"([^"]+)"/i) || around.match(/>\s*([^<]{2,80})\s*<\//i);
        const title = collapseSpaces(decodeHtmlEntities(titleMatch?.[1] || '')) || requested.title;

        hits.push({ title, url: abs });
        if (hits.length >= 12) break;
      }

      // Score and return the best few.
      const scored = hits
        .map((hit) => ({ hit, score: scoreKugeciHit(hit, requested) }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 6)
        .map((item) => item.hit);

      if (scored.length) return scored;
    } catch {
      // try next endpoint
    }
  }

  return [];
};

const fetchKugeciSongPageLrc = async (songUrl: string): Promise<string> => {
  if (!songUrl) return '';
  const res = await fetch(songUrl, { method: 'GET' });
  if (!res.ok) return '';
  const html = await res.text();
  return extractTimecodedLrcFromHtml(html);
};

export async function fetchSyncedLyricsFromKugeci(params: {
  title: string;
  artist?: string;
}): Promise<CPlayerLyricLine[]> {
  if (!params.title.trim()) return [];

  try {
    const queries = buildLrcSearchQueries(params.title, params.artist);

    // Reuse your existing query builder to generate cleaned candidates,
    // then search KuGeci with a couple of top variants.
    const requestedVariants = unique(
      queries
        .slice(0, 6)
        .map((q) => ({ title: q.trackName, artist: q.artistName }))
        .map((v) => ({ title: collapseSpaces(v.title), artist: v.artist ? collapseSpaces(v.artist) : '' }))
        .filter((v) => v.title.length >= 2)
    ).slice(0, 4);

    const candidates: Array<{ score: number; lines: CPlayerLyricLine[] }> = [];

    for (const req of requestedVariants) {
      const hits = await searchKugeci({ title: req.title, artist: req.artist || params.artist });
      if (!hits.length) continue;

      for (const hit of hits.slice(0, 3)) {
        const rawLrc = await fetchKugeciSongPageLrc(hit.url);
        if (!rawLrc) continue;
        const lines = parseLrcToTimedLines(rawLrc);
        if (lines.length < 2) continue;

        const score =
          scoreTextMatch(hit.title, params.title) * 2 +
          scoreTextMatch(hit.artist || '', params.artist || '') * 1.2 +
          Math.min(4, lines.length / 20);

        candidates.push({ score, lines });
      }

      // Stop early if we already have strong candidates.
      if (candidates.length >= 4) break;
    }

    if (candidates.length) {
      candidates.sort((a, b) => b.score - a.score);
      return candidates[0].lines;
    }

    return [];
  } catch {
    return [];
  }
}

export async function fetchSyncedLyricsFromLrclib(params: {
  title: string;
  artist?: string;
}): Promise<CPlayerLyricLine[]> {
  if (!params.title.trim()) return [];

  const queries = buildLrcSearchQueries(params.title, params.artist);
  const syncedCandidates: Array<{ score: number; lines: CPlayerLyricLine[] }> = [];
  const plainCandidates: Array<{ score: number; text: string }> = [];

  try {
    for (const query of queries) {
      const payload = await searchLrclib(query);
      if (!payload.length) continue;

      for (const entry of payload) {
        if (entry.instrumental) continue;
        const score = scoreLrcEntry(entry, params, query);
        if (entry.syncedLyrics) {
          const synced = parseLrcToTimedLines(entry.syncedLyrics);
          if (synced.length >= 2) {
            const densityBonus = Math.min(4, synced.length / 20);
            const languageBonus = scoreSyncedLyricsLanguage(synced);
            syncedCandidates.push({ score: score + densityBonus + languageBonus, lines: synced });
          }
        }
        if (entry.plainLyrics) {
          const plainLanguageBonus = hasChineseChars(entry.plainLyrics) ? 2 : -8;
          plainCandidates.push({ score: score + plainLanguageBonus, text: entry.plainLyrics });
        }
      }
    }
  } catch {
    return [];
  }

  if (syncedCandidates.length) {
    syncedCandidates.sort((a, b) => b.score - a.score);
    return syncedCandidates[0].lines;
  }

  if (plainCandidates.length) {
    plainCandidates.sort((a, b) => b.score - a.score);
    return buildLooseTimedLines(plainCandidates[0].text);
  }
  return [];
}

// --- YouTube captions (via proxy qui parse ytInitialPlayerResponse) ---
const YT_CAPTIONS_PROXY = '/api/yt-captions';

interface YtJson3Event {
  tStartMs?: number;
  segs?: Array<{ utf8?: string }>;
  aAppend?: number;
}

const parseYtJson3 = (data: unknown): CPlayerLyricLine[] => {
  const safe = data as { events?: YtJson3Event[] };
  if (!Array.isArray(safe?.events)) return [];

  const lines: CPlayerLyricLine[] = [];
  let pendingText = '';
  let pendingStart = 0;

  for (const event of safe.events) {
    if (typeof event.tStartMs !== 'number') continue;
    const text = (event.segs ?? []).map((s) => s.utf8 ?? '').join('').replace(/\n/g, ' ').trim();
    if (!text) continue;

    // aAppend=1 → continuation de la ligne précédente
    if (event.aAppend === 1 && pendingText) {
      pendingText += text;
    } else {
      if (pendingText && hasChineseChars(pendingText)) {
        lines.push({ time: Number((pendingStart / 1000).toFixed(2)), hanzi: pendingText });
      }
      pendingText = text;
      pendingStart = event.tStartMs;
    }
  }
  if (pendingText && hasChineseChars(pendingText)) {
    lines.push({ time: Number((pendingStart / 1000).toFixed(2)), hanzi: pendingText });
  }

  return lines.sort((a, b) => a.time - b.time);
};

// Parse XML format 3 : <timedtext format="3"><body><p t="ms" d="ms">text</p>...
const parseYtXmlFormat3 = (xml: string): CPlayerLyricLine[] => {
  const lines: CPlayerLyricLine[] = [];
  const re = /<p[^>]+\bt="(\d+)"[^>]*>([\s\S]*?)<\/p>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml)) !== null) {
    const timeMs = Number(m[1]);
    const raw = m[2].replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();
    if (raw && hasChineseChars(raw)) {
      lines.push({ time: Number((timeMs / 1000).toFixed(2)), hanzi: raw });
    }
  }
  return lines.sort((a, b) => a.time - b.time);
};

export async function fetchYouTubeCaptions(videoId: string): Promise<CPlayerLyricLine[]> {
  if (!videoId) return [];

  // Uniquement disponible en dev local (le proxy parse ytInitialPlayerResponse)
  const isLocalDev =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
  if (!isLocalDev) return [];

  try {
    const res = await fetch(`${YT_CAPTIONS_PROXY}?v=${encodeURIComponent(videoId)}`, {
      signal: AbortSignal.timeout(15000)
    });
    if (!res.ok) return [];
    const text = await res.text();
    if (!text.trim()) return [];
    // Le client Android retourne du XML (format 3), le client WEB retourne du JSON
    if (text.trimStart().startsWith('<')) return parseYtXmlFormat3(text);
    let data: unknown;
    try { data = JSON.parse(text); } catch { return []; }
    return parseYtJson3(data);
  } catch {
    return [];
  }
}

// Helper: fetch from YouTube captions, then LRCLIB, fallback to KuGeci.
export async function fetchSyncedLyricsBestEffort(params: {
  title: string;
  artist?: string;
  videoId?: string;
}): Promise<{ provider: 'youtube' | 'lrclib' | 'kugeci' | 'none'; lines: CPlayerLyricLine[] }> {
  if (params.videoId) {
    const yt = await fetchYouTubeCaptions(params.videoId);
    if (yt.length) return { provider: 'youtube', lines: yt };
  }

  const lrclib = await fetchSyncedLyricsFromLrclib(params);
  if (lrclib.length) return { provider: 'lrclib', lines: lrclib };

  const kugeci = await fetchSyncedLyricsFromKugeci(params);
  if (kugeci.length) return { provider: 'kugeci', lines: kugeci };

  return { provider: 'none', lines: [] };
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
  if (!hasAIGenerationEnabled() || !params.title.trim()) return [];

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
    try {
      const result = await runGeminiGenerateContent(model, {
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.3,
          topK: 20,
          topP: 0.9,
          maxOutputTokens: 2048,
          responseMimeType: 'application/json'
        }
      });

      if (!result.ok) {
        console.warn(`[CPlayer] Gemini generateLyrics failed with ${model}:`, result.status);
        if (result.bodyText) {
          console.warn('[CPlayer] Response body:', result.bodyText.slice(0, 600));
        }
        continue;
      }

      rawText = result.text?.trim();
      if (rawText) {
        console.info(`[CPlayer] Lyrics generated with model: ${model}`);
        break;
      }
      console.warn(`[CPlayer] ${model} returned no text.`);
    } catch (err) {
      console.warn(`[CPlayer] ${model} network error:`, err);
    }
  }

  if (!rawText) {
    console.warn('[CPlayer] All Gemini models failed for generateLyrics');
    return [];
  }
  const parsed = parseJsonObjectLoose<{ lines?: CPlayerLyricLine[] }>(rawText);
  if (!parsed) {
    const jsonText = extractJsonObjectText(rawText);
    console.warn('[CPlayer] Failed to parse Gemini JSON. Raw:', jsonText.slice(0, 300));
    return [];
  }

  const lines = parsed.lines ?? [];
  return lines.map((line) => {
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
}

export async function enrichLyricsWithAI(params: {
  title: string;
  artist?: string;
  lines: CPlayerLyricLine[];
}): Promise<CPlayerLyricLine[]> {
  if (!hasAIGenerationEnabled() || !params.lines.length) return [];

  const lines = params.lines.slice(0, 100);
  const runBatchEnrichment = async (
    minimalLines: Array<{ index: number; hanzi: string }>
  ): Promise<Map<number, { pinyin: string; translationFr: string; translationEn: string }>> => {
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
- 1 entrée par index fourni.
- index doit correspondre EXACTEMENT à l'index reçu dans LINES_JSON.
- TOUTES les lignes doivent être traduites, y compris la première (index 0).
- pinyin lisible, sans numéros de tons.
- traductions courtes et naturelles.
`;

    let rawText: string | undefined;
    for (const model of GEMINI_MODELS) {
      try {
        const result = await runGeminiGenerateContent(model, {
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.2,
            topK: 20,
            topP: 0.9,
            maxOutputTokens: 4096,
            responseMimeType: 'application/json'
          }
        });

        if (!result.ok) {
          console.warn(`[CPlayer] Gemini enrichLyrics failed with ${model}:`, result.status);
          if (result.bodyText) {
            console.warn('[CPlayer] Response body:', result.bodyText.slice(0, 600));
          }
          continue;
        }

        rawText = result.text?.trim();
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
      return new Map();
    }

    const parsed = parseJsonObjectLoose<{
      lines?: Array<{
        index?: number | string;
        lineIndex?: number | string;
        pinyin?: string;
        translationFr?: string;
        translationEn?: string;
        translation?: string;
        fr?: string;
        en?: string;
      }>;
    }>(rawText);

    if (!parsed) {
      const jsonText = extractJsonObjectText(rawText);
      console.warn('[CPlayer] Failed to parse Gemini enrich JSON. Raw:', jsonText.slice(0, 300));
      return new Map();
    }

    const enrichMap = new Map<number, { pinyin: string; translationFr: string; translationEn: string }>();
    for (const item of parsed.lines ?? []) {
      const indexValue = item.index ?? item.lineIndex;
      const parsedIndex = typeof indexValue === 'number' ? indexValue : Number(indexValue);
      if (!Number.isFinite(parsedIndex)) continue;
      enrichMap.set(parsedIndex, {
        pinyin: (item.pinyin || '').trim(),
        translationFr: (item.translationFr || item.fr || item.translation || '').trim(),
        translationEn: (item.translationEn || item.en || '').trim()
      });
    }
    return enrichMap;
  };

  const merged = lines.map((line) => ({ ...line }));
  let enrichedLinesCount = 0;
  const batchSize = 12;

  for (let start = 0; start < lines.length; start += batchSize) {
    const chunk = lines.slice(start, start + batchSize);
    const minimalLines = chunk.map((line, localIndex) => ({
      index: localIndex,
      hanzi: line.hanzi
    }));
    const enrichMap = await runBatchEnrichment(minimalLines);
    if (enrichMap.size === 0) continue;

    for (const [localIndex, enriched] of enrichMap.entries()) {
      if (localIndex < 0 || localIndex >= chunk.length) continue;
      const index = start + localIndex;
      const current = merged[index];
      const hasContribution =
        Boolean(enriched.pinyin) || Boolean(enriched.translationFr) || Boolean(enriched.translationEn);
      if (!hasContribution) continue;
      merged[index] = {
        ...current,
        pinyin: enriched.pinyin || current.pinyin || '',
        translationFr: enriched.translationFr || current.translationFr || '',
        translationEn: enriched.translationEn || current.translationEn || ''
      };
      enrichedLinesCount += 1;
    }
  }

  if (enrichedLinesCount === 0) {
    console.warn('[CPlayer] No lyric lines enriched by AI');
    return [];
  }

  return merged;
}
