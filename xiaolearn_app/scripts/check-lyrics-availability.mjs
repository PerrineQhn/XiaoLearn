#!/usr/bin/env node
/**
 * check-lyrics-availability.mjs
 *
 * Pour chaque chanson de cplayer-songs.ts, vérifie si des paroles existent :
 *   1. Dans l'export Firestore local  (exports/cplayer_lyrics.json)
 *   2. Sur LrcLib                     (https://lrclib.net/api/search)
 *   3. Sur KuGeci                     (https://www.kugeci.com/search)
 *
 * Usage :
 *   node scripts/check-lyrics-availability.mjs
 *   node scripts/check-lyrics-availability.mjs --delete   # supprime les ❌ de cplayer-songs.ts
 *   node scripts/check-lyrics-availability.mjs --json     # écrit le rapport dans exports/lyrics-check.json
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SONGS_FILE = path.join(ROOT, 'src/data/cplayer-songs.ts');
const LYRICS_EXPORT = path.join(ROOT, 'exports/cplayer_lyrics.json');
const REPORT_OUTPUT = path.join(ROOT, 'exports/lyrics-check.json');

const DO_DELETE = process.argv.includes('--delete');
const DO_JSON = process.argv.includes('--json');

// Délai entre les requêtes pour éviter le rate-limiting
const DELAY_MS = 600;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ── Helpers texte (repris de cplayerService) ──────────────────────────────────
const collapseSpaces = (v) => v.replace(/\s+/g, ' ').trim();
const stripNoise = (v) =>
  collapseSpaces(
    v.replace(/[\[\(【（].*?[\]\)】）]/g, ' ')
      .replace(/\b(mv|official|lyrics?|lyric video|music video|karaoke|ver\.?|version|hd|4k|中字|中英字幕|官方|完整版|高清|舞蹈版|dance)\b/gi, ' ')
      .replace(/[|｜·•]/g, ' ')
      .replace(/\s[-–—]\s/g, ' ')
      .replace(/[_]/g, ' ')
  );

const normalizeComparable = (v) =>
  stripNoise(v).toLowerCase().normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{L}\p{N}\u3400-\u9fff]+/gu, ' ')
    .trim();

const scoreTextMatch = (a, b) => {
  const na = normalizeComparable(a);
  const nb = normalizeComparable(b);
  if (!na || !nb) return 0;
  if (na === nb) return 14;
  if (na.replace(/\s+/g, '') === nb.replace(/\s+/g, '')) return 12;
  if (na.includes(nb) || nb.includes(na)) return 9;
  const aT = new Set(na.split(' ').filter((t) => t.length >= 2));
  const bT = new Set(nb.split(' ').filter((t) => t.length >= 2));
  let common = 0;
  for (const t of aT) if (bT.has(t)) common++;
  return common * 2;
};

const extractChineseChunks = (v) => v.match(/[\u3400-\u9fff]{2,}/g) ?? [];
const unique = (arr) => [...new Set(arr)];

const buildLrcSearchQueries = (title, artist) => {
  const cleanTitle = stripNoise(title);
  const cleanArtist = artist ? stripNoise(artist) : '';
  const chunks = extractChineseChunks(cleanTitle);
  const lastChunk = chunks[chunks.length - 1] || '';
  const lastTwo = chunks.length >= 2 ? `${chunks[chunks.length - 2]} ${chunks[chunks.length - 1]}` : '';

  const trackCandidates = unique(
    [title, cleanTitle, lastTwo, lastChunk].map(collapseSpaces).filter((t) => t.length >= 2)
  ).slice(0, 6);

  const artistCandidates = unique([artist || '', cleanArtist].map(collapseSpaces).filter(Boolean));

  const queries = [];
  for (const trackName of trackCandidates) {
    for (const artistName of artistCandidates) queries.push({ trackName, artistName });
    queries.push({ trackName });
  }
  return queries.slice(0, 10);
};

const hasChineseChars = (v) => /[\u3400-\u9fff]/.test(v);

const parseLrcToLines = (raw) => {
  if (!raw?.trim()) return [];
  const lines = [];
  const rows = raw.split('\n').map((l) => l.trim()).filter(Boolean);
  const re = /\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]/g;
  for (const row of rows) {
    const stamps = [...row.matchAll(re)];
    if (!stamps.length) continue;
    const hanzi = row.replace(re, '').trim();
    if (!hanzi) continue;
    for (const s of stamps) {
      const time = Number(s[1]) * 60 + Number(s[2]) + Number((s[3] || '0').padEnd(3, '0').slice(0, 3)) / 1000;
      lines.push({ time: Number(time.toFixed(2)), hanzi });
    }
  }
  return lines.sort((a, b) => a.time - b.time);
};

// ── LrcLib ────────────────────────────────────────────────────────────────────
const checkLrclib = async (title, artist) => {
  const queries = buildLrcSearchQueries(title, artist);
  let best = 0;

  for (const q of queries) {
    try {
      const url = new URL('https://lrclib.net/api/search');
      url.searchParams.set('track_name', q.trackName);
      if (q.artistName) url.searchParams.set('artist_name', q.artistName);

      const res = await fetch(url.toString(), { signal: AbortSignal.timeout(8000) });
      if (!res.ok) continue;
      const payload = await res.json();
      if (!Array.isArray(payload)) continue;

      for (const entry of payload) {
        if (entry.instrumental) continue;
        const score =
          scoreTextMatch(entry.trackName || '', title) * 2 +
          scoreTextMatch(entry.artistName || '', artist || '') * 1.6;

        if (entry.syncedLyrics) {
          const lines = parseLrcToLines(entry.syncedLyrics);
          const chineseRatio = lines.filter((l) => hasChineseChars(l.hanzi)).length / (lines.length || 1);
          if (lines.length >= 3 && chineseRatio >= 0.4 && score >= 4) return true;
        }
        if (entry.plainLyrics && hasChineseChars(entry.plainLyrics) && score >= 4) return true;
        if (score > best) best = score;
      }
    } catch {
      // réseau ou timeout
    }
    await sleep(150);
  }
  return false;
};

// ── KuGeci ────────────────────────────────────────────────────────────────────
const decodeHtml = (s) =>
  s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');

const absoluteUrl = (rel) => {
  if (!rel) return '';
  if (rel.startsWith('http')) return rel;
  if (rel.startsWith('/')) return `https://www.kugeci.com${rel}`;
  return `https://www.kugeci.com/${rel}`;
};

const extractLrcFromHtml = (html) => {
  const norm = html.replace(/\\r/g, '\n');
  const jsonLike = norm.match(/"lrc"\s*:\s*"([\s\S]*?)"/i);
  if (jsonLike?.[1]) {
    const raw = decodeHtml(jsonLike[1]).replace(/\\n/g, '\n').replace(/\\t/g, ' ').replace(/\\"/g, '"');
    if (/\[\d{1,2}:\d{2}(?:\.\d{1,3})?\]/.test(raw)) return raw;
  }
  const block = norm.match(/<(?:textarea|pre)[^>]*>([\s\S]*?)<\/(?:textarea|pre)>/i);
  if (block?.[1]) {
    const raw = decodeHtml(block[1]).trim();
    if (/\[\d{1,2}:\d{2}(?:\.\d{1,3})?\]/.test(raw)) return raw;
  }
  const re = /^.*\[(\d{1,2}:\d{2}(?:\.\d{1,3})?)\].*$/gm;
  const lines = [];
  let m;
  while ((m = re.exec(norm)) !== null) {
    const l = m[0].trim();
    if (l) lines.push(decodeHtml(l));
  }
  return lines.join('\n');
};

const checkKugeci = async (title, artist) => {
  const q = collapseSpaces(`${title} ${artist || ''}`.trim());
  if (!q) return false;

  const endpoints = [
    `https://www.kugeci.com/search?q=${encodeURIComponent(q)}`,
    `https://www.kugeci.com/search?key=${encodeURIComponent(q)}`,
  ];

  for (const url of endpoints) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
      if (!res.ok) continue;
      const html = await res.text();

      const linkRe = /href\s*=\s*"(\/song\/[^"?]+)"/gi;
      const hits = [];
      const seen = new Set();
      let m;
      while ((m = linkRe.exec(html)) !== null && hits.length < 6) {
        const abs = absoluteUrl(m[1]);
        if (!abs || seen.has(abs)) continue;
        seen.add(abs);

        const around = html.slice(Math.max(0, m.index - 220), Math.min(html.length, m.index + 420));
        const titleM = around.match(/title\s*=\s*"([^"]+)"/i) || around.match(/>\s*([^<]{2,80})\s*<\//i);
        const hitTitle = collapseSpaces(decodeHtml(titleM?.[1] || '')) || title;
        hits.push({ title: hitTitle, url: abs });
      }

      // Tester les 3 premiers hits qui matchent le titre
      const scored = hits
        .map((h) => ({ h, score: scoreTextMatch(h.title, title) * 2 }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);

      for (const { h } of scored) {
        try {
          const pageRes = await fetch(h.url, { signal: AbortSignal.timeout(8000) });
          if (!pageRes.ok) continue;
          const pageHtml = await pageRes.text();
          const lrc = extractLrcFromHtml(pageHtml);
          const lines = parseLrcToLines(lrc);
          const chineseRatio = lines.filter((l) => hasChineseChars(l.hanzi)).length / (lines.length || 1);
          if (lines.length >= 3 && chineseRatio >= 0.3) return true;
        } catch { /* continue */ }
        await sleep(200);
      }

      if (hits.length > 0) break; // on a essayé cet endpoint
    } catch { /* try next */ }
  }
  return false;
};

// ── Parser le videoId YouTube ─────────────────────────────────────────────────
const parseVideoId = (url) => {
  if (!url) return null;
  const s = url.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(s)) return s;
  try {
    const u = new URL(s);
    if (u.hostname.includes('youtu.be')) {
      const id = u.pathname.replace(/^\//, '').split('?')[0];
      return id.length === 11 ? id : null;
    }
    if (u.hostname.includes('youtube.com')) {
      const v = u.searchParams.get('v');
      if (v && v.length === 11) return v;
      const parts = u.pathname.split('/');
      const idx = parts.findIndex((p) => p === 'embed' || p === 'shorts');
      if (idx >= 0) {
        const c = parts[idx + 1]?.split('?')[0];
        if (c && c.length === 11) return c;
      }
    }
  } catch { /* ignore */ }
  return null;
};

// ── Parser cplayer-songs.ts ───────────────────────────────────────────────────
const parseSongsFromTs = (source) => {
  const arrayStart = source.indexOf('export const cplayerSongs: CPlayerSong[] = [');
  if (arrayStart === -1) throw new Error('Tableau cplayerSongs introuvable');

  const bodyStart = arrayStart + 'export const cplayerSongs: CPlayerSong[] = ['.length;
  const bodyEnd = source.lastIndexOf('];');
  const body = source.slice(bodyStart, bodyEnd);

  const songs = [];
  let depth = 0;
  let start = -1;

  for (let i = 0; i < body.length; i++) {
    if (body[i] === '{') {
      if (depth === 0) start = i;
      depth++;
    } else if (body[i] === '}') {
      depth--;
      if (depth === 0 && start !== -1) {
        const block = body.slice(start, i + 1);
        const id = block.match(/\bid:\s*['"]([^'"]+)['"]/)?.[1];
        const title = block.match(/title:\s*['"]([^'"]+)['"]/)?.[1];
        const artist = block.match(/artist:\s*['"]([^'"]+)['"]/)?.[1];
        const youtubeUrl = block.match(/youtubeUrl:\s*['"]([^'"]+)['"]/)?.[1];
        if (id && title) songs.push({ id, title, artist: artist ?? '', youtubeUrl: youtubeUrl ?? '' });
        start = -1;
      }
    }
  }
  return songs;
};

// ── Main ──────────────────────────────────────────────────────────────────────
const source = await fs.readFile(SONGS_FILE, 'utf8');
const songs = parseSongsFromTs(source);

let exportData = { docs: [] };
try {
  exportData = JSON.parse(await fs.readFile(LYRICS_EXPORT, 'utf8'));
} catch {
  console.warn('⚠️  Export Firestore introuvable, on passe directement aux APIs web.');
}
const firestoreIds = new Set(exportData.docs.map((d) => d.videoId).filter(Boolean));

console.log(`\n🎵 ${songs.length} chansons à vérifier\n`);
console.log('Source     | Chanson');
console.log('─'.repeat(70));

const results = [];
let i = 0;

for (const song of songs) {
  i++;
  const videoId = parseVideoId(song.youtubeUrl);
  const prefix = `[${String(i).padStart(2, '0')}/${songs.length}]`;

  // 1. Firestore
  if (videoId && firestoreIds.has(videoId)) {
    console.log(`${prefix} ✅ Firestore  | ${song.artist} — ${song.title}`);
    results.push({ ...song, videoId, source: 'firestore', found: true });
    continue;
  }

  // 2. LrcLib
  process.stdout.write(`${prefix} 🔍 LrcLib    | ${song.artist} — ${song.title} … `);
  const foundLrclib = await checkLrclib(song.title, song.artist);
  await sleep(DELAY_MS);

  if (foundLrclib) {
    console.log('✅');
    results.push({ ...song, videoId, source: 'lrclib', found: true });
    continue;
  }

  // 3. KuGeci
  process.stdout.write(`❌\n${prefix} 🔍 KuGeci   | ${song.artist} — ${song.title} … `);
  const foundKugeci = await checkKugeci(song.title, song.artist);
  await sleep(DELAY_MS);

  if (foundKugeci) {
    console.log('✅');
    results.push({ ...song, videoId, source: 'kugeci', found: true });
  } else {
    console.log('❌  ← AUCUNE PAROLE');
    results.push({ ...song, videoId, source: 'none', found: false });
  }
}

const found = results.filter((r) => r.found);
const missing = results.filter((r) => !r.found);

console.log('\n' + '═'.repeat(70));
console.log(`\n✅ Avec paroles    : ${found.length}`);
console.log(`❌ Sans paroles    : ${missing.length}`);

if (missing.length) {
  console.log('\n📋 Chansons sans paroles :');
  for (const s of missing) {
    console.log(`   • ${s.artist} — ${s.title}  (id: ${s.id}, videoId: ${s.videoId ?? 'N/A'})`);
  }
}

// ── Export JSON du rapport ────────────────────────────────────────────────────
if (DO_JSON) {
  await fs.mkdir(path.dirname(REPORT_OUTPUT), { recursive: true });
  await fs.writeFile(REPORT_OUTPUT, JSON.stringify({ generatedAt: new Date().toISOString(), results }, null, 2), 'utf8');
  console.log(`\n📄 Rapport écrit dans : exports/lyrics-check.json`);
}

// ── Suppression des chansons sans paroles ────────────────────────────────────
if (DO_DELETE && missing.length > 0) {
  const missingIds = new Set(missing.map((s) => s.id));

  // Reparsons les blocs pour supprimer
  const arrayStart = source.indexOf('export const cplayerSongs: CPlayerSong[] = [');
  const header = source.slice(0, arrayStart + 'export const cplayerSongs: CPlayerSong[] = ['.length);
  const bodyStart = arrayStart + 'export const cplayerSongs: CPlayerSong[] = ['.length;
  const bodyEnd = source.lastIndexOf('];') + 2;
  const footer = source.slice(bodyEnd);
  const body = source.slice(bodyStart, bodyEnd - 2);

  // Extraire blocs avec leurs commentaires précédents
  const blocks = [];
  let depth = 0;
  let start = -1;
  let pendingComment = '';

  for (let j = 0; j < body.length; j++) {
    const ch = body[j];
    if (ch === '/' && body[j + 1] === '/') {
      const lineEnd = body.indexOf('\n', j);
      const line = lineEnd === -1 ? body.slice(j) : body.slice(j, lineEnd + 1);
      if (depth === 0) pendingComment += line;
      j = lineEnd === -1 ? body.length : lineEnd;
      continue;
    }
    if (ch === '{') {
      if (depth === 0) { start = j; }
      depth++;
    } else if (ch === '}') {
      depth--;
      if (depth === 0 && start !== -1) {
        const blockText = body.slice(start, j + 1);
        const blockId = blockText.match(/\bid:\s*['"]([^'"]+)['"]/)?.[1];
        blocks.push({ id: blockId, comment: pendingComment, text: blockText });
        pendingComment = '';
        start = -1;
      }
    }
  }

  const keptBlocks = blocks.filter((b) => !missingIds.has(b.id));
  let newBody = '\n\n';
  for (const block of keptBlocks) {
    if (block.comment) {
      newBody += block.comment.split('\n').map((l) => '  ' + l).join('\n') + '\n';
    }
    const indented = block.text.split('\n').map((l) => '  ' + l).join('\n');
    newBody += indented + ',\n';
  }

  const newSource = header + newBody + '\n];\n' + footer.trimEnd() + '\n';
  await fs.writeFile(SONGS_FILE, newSource, 'utf8');
  console.log(`\n🗑  ${missing.length} chanson(s) supprimée(s) de cplayer-songs.ts`);
} else if (DO_DELETE && missing.length === 0) {
  console.log('\n🎉 Toutes les chansons ont des paroles, rien à supprimer.');
} else if (!DO_DELETE && missing.length > 0) {
  console.log('\n💡 Pour supprimer les chansons sans paroles, relance avec --delete');
}

console.log('');
