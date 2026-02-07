const fs = require("fs");
const path = require("path");

const templatePath = path.resolve(__dirname, "template_writing.html");
const strokesPath = path.resolve(
  __dirname,
  "../../xiaolearn_reference/hanzi_strokes/graphics.txt"
);
const writingListPath = path.resolve(
  __dirname,
  "../../xiaolearn_anki/hsk_hanzi_writing_all.tsv"
);
const vocabPath = path.resolve(
  __dirname,
  "../../xiaolearn_anki/anki_mandarin_myway.tsv"
);
const cfdictPath = path.resolve(
  __dirname,
  "../../xiaolearn_reference/cfdict/cfdict.u8"
);
const cfdictCachePath = path.resolve(
  __dirname,
  "../../xiaolearn_reference/cfdict/cfdict_cache.json"
);

const BRAND_TEXT = "XiaoLearn";

const DEFAULT_PROGRESS_MAX = 10;
const DEFAULT_PROGRESS_MIN = 1;
const DEFAULT_PRACTICE = 10;
const DEFAULT_ROWS_PER_PAGE = 7;
const DEFAULT_FIRST_PAGE_ROWS = 6;
const LEVEL_COLORS = {
  "1-2": "#9b2335",
  "3": "#c26a14",
  "4": "#1f7a4d",
  "5": "#1d4e89",
  "6": "#6a3c8b",
  "7-9": "#000000"
};
const LEVEL_TO_GROUP = {
  1: "1-2",
  2: "1-2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7-9",
  8: "7-9",
  9: "7-9"
};
const LEVEL_GROUPS = ["1-2", "3", "4", "5", "6", "7-9"];

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getArg(name) {
  const index = process.argv.indexOf(`--${name}`);
  if (index === -1) return null;
  return process.argv[index + 1] || null;
}

function loadWritingList(group) {
  if (!fs.existsSync(writingListPath)) {
    throw new Error(`Liste d'ecriture introuvable: ${writingListPath}`);
  }
  const lines = fs.readFileSync(writingListPath, "utf8").split(/\r?\n/);
  const items = [];
  for (let i = 1; i < lines.length; i += 1) {
    const line = lines[i].trim();
    if (!line) continue;
    const parts = line.split("\t");
    if (parts.length < 3) continue;
    const levelGroup = parts[0].trim();
    if (levelGroup !== group) continue;
    const index = Number(parts[1]) || items.length + 1;
    const hanzi = (parts[2] || "").trim();
    if (!hanzi) continue;
    items.push({ index, hanzi });
  }
  return items;
}

function parseLevel(value) {
  const match = String(value || "").match(/(\d+)/);
  return match ? Number(match[1]) : null;
}

function levelToGroup(level) {
  if (!level) return null;
  if (level <= 2) return "1-2";
  if (level >= 7) return "7-9";
  return String(level);
}

function loadVocabMap() {
  if (!fs.existsSync(vocabPath)) {
    console.warn(`Vocabulaire introuvable: ${vocabPath}`);
    return new Map();
  }
  const lines = fs.readFileSync(vocabPath, "utf8").split(/\r?\n/);
  if (!lines.length) return new Map();
  const header = lines[0].split("\t").map((value) => value.trim());
  const idxLevel = header.indexOf("HSK_Level");
  const idxHanzi = header.indexOf("Simplified");
  const idxPinyin = header.indexOf("Pinyin");
  const idxMeaning = header.indexOf("Meaning");
  if (idxHanzi === -1) return new Map();

  const map = new Map();
  for (let i = 1; i < lines.length; i += 1) {
    const line = lines[i].trim();
    if (!line) continue;
    const parts = line.split("\t");
    const hanzi = (parts[idxHanzi] || "").trim();
    if (!hanzi || Array.from(hanzi).length !== 1) continue;
    const level = idxLevel >= 0 ? parseLevel(parts[idxLevel]) : null;
    const group = levelToGroup(level);
    const entry = {
      pinyin: normalizePlaceholder(parts[idxPinyin]),
      meaning: normalizePlaceholder(parts[idxMeaning]),
      group
    };
    if (!map.has(hanzi)) map.set(hanzi, []);
    map.get(hanzi).push(entry);
  }
  return map;
}

function normalizePlaceholder(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  if (/^x+$/i.test(text)) return "";
  return text;
}

function toneMark(vowel, tone) {
  const map = {
    a: ["ā", "á", "ǎ", "à"],
    e: ["ē", "é", "ě", "è"],
    i: ["ī", "í", "ǐ", "ì"],
    o: ["ō", "ó", "ǒ", "ò"],
    u: ["ū", "ú", "ǔ", "ù"],
    "ü": ["ǖ", "ǘ", "ǚ", "ǜ"]
  };
  const lower = vowel.toLowerCase();
  const list = map[lower];
  if (!list || tone < 1 || tone > 4) return vowel;
  const marked = list[tone - 1];
  return vowel === lower ? marked : marked.toUpperCase();
}

function applyTone(syllable, tone) {
  if (!syllable) return syllable;
  if (!tone || tone === 5) return syllable;
  const lower = syllable.toLowerCase();
  const vowels = ["a", "e", "o", "i", "u", "ü"];
  let index = -1;

  if (lower.includes("a")) index = lower.indexOf("a");
  else if (lower.includes("o")) index = lower.indexOf("o");
  else if (lower.includes("e")) index = lower.indexOf("e");
  else if (lower.includes("iu")) index = lower.indexOf("u", lower.indexOf("i"));
  else if (lower.includes("ui")) index = lower.indexOf("i", lower.indexOf("u"));
  else {
    for (let i = lower.length - 1; i >= 0; i -= 1) {
      if (vowels.includes(lower[i])) {
        index = i;
        break;
      }
    }
  }

  if (index === -1) return syllable;
  const chars = Array.from(syllable);
  chars[index] = toneMark(chars[index], tone);
  return chars.join("");
}

function normalizePinyin(value) {
  if (!value) return "";
  let text = String(value)
    .replace(/u:/gi, "ü")
    .replace(/v/gi, "ü");
  text = text.replace(/([a-zü]+)([1-5])/gi, (_, syl, tone) =>
    applyTone(syl, Number(tone))
  );
  return text.replace(/[1-5]/g, "");
}

function readCfdictCache() {
  if (!fs.existsSync(cfdictCachePath)) return null;
  try {
    const raw = JSON.parse(fs.readFileSync(cfdictCachePath, "utf8"));
    return raw && raw.meta && raw.entries ? raw : null;
  } catch (error) {
    return null;
  }
}

function writeCfdictCache(meta, entries) {
  try {
    fs.writeFileSync(
      cfdictCachePath,
      JSON.stringify({ meta, entries }, null, 2),
      "utf8"
    );
  } catch (error) {
    // ignore cache write errors
  }
}

function loadCfdictMap() {
  if (!fs.existsSync(cfdictPath)) {
    return new Map();
  }
  const stat = fs.statSync(cfdictPath);
  const meta = { mtimeMs: stat.mtimeMs, size: stat.size };
  const cached = readCfdictCache();
  if (
    cached &&
    cached.meta &&
    cached.meta.mtimeMs === meta.mtimeMs &&
    cached.meta.size === meta.size
  ) {
    return new Map(Object.entries(cached.entries));
  }

  const map = new Map();
  const lines = fs.readFileSync(cfdictPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const match = trimmed.match(/^(\S+)\s+(\S+)\s+\[([^\]]+)\]\s+\/(.+)\/$/);
    if (!match) continue;
    const simplified = match[2];
    if (Array.from(simplified).length !== 1) continue;
    if (map.has(simplified)) continue;
    const pinyin = normalizePinyin(match[3].trim());
    const defs = match[4]
      .split("/")
      .map((value) => value.trim())
      .filter(Boolean);
    if (!defs.length) continue;
    const meaning = defs.slice(0, 2).join(" ; ");
    map.set(simplified, { pinyin, meaning });
  }
  writeCfdictCache(meta, Object.fromEntries(map));
  return map;
}

function pickVocab(vocabMap, cfdictMap, hanzi, group) {
  const entries = vocabMap.get(hanzi);
  const fallback = cfdictMap.get(hanzi) || { pinyin: "", meaning: "" };
  if (!entries || !entries.length) return fallback;
  const match = entries.find((entry) => entry.group === group) || entries[0];
  return {
    pinyin: normalizePlaceholder(match.pinyin) || fallback.pinyin,
    meaning: normalizePlaceholder(match.meaning) || fallback.meaning
  };
}

function loadStrokesMap(needed) {
  if (!fs.existsSync(strokesPath)) {
    throw new Error(
      `Dataset de traits introuvable: ${strokesPath}. Copie graphics.txt.`
    );
  }
  const map = new Map();
  const lines = fs.readFileSync(strokesPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    if (!line.trim()) continue;
    const entry = JSON.parse(line);
    if (!needed.has(entry.character)) continue;
    map.set(entry.character, {
      strokes: entry.strokes || [],
      medians: entry.medians || []
    });
    if (map.size === needed.size) break;
  }
  return map;
}

function buildStrokeStops(count, steps) {
  const stops = [];
  if (!count) {
    for (let i = 0; i < steps; i += 1) stops.push(0);
    return stops;
  }
  if (count <= steps) {
    for (let i = 1; i <= steps; i += 1) {
      stops.push(Math.min(i, count));
    }
    return stops;
  }
  for (let i = 1; i <= steps; i += 1) {
    stops.push(Math.ceil((i * count) / steps));
  }
  return stops;
}

function resolveProgressCount(strokeCount, progressMin, progressMax) {
  if (!strokeCount) return progressMax;
  return Math.min(progressMax, Math.max(progressMin, strokeCount));
}

function buildArrowPath(median, color) {
  if (!Array.isArray(median) || median.length < 2) return "";
  const start = median[0];
  let end = median[median.length - 1];
  let endDir = null;
  for (let i = median.length - 1; i > 0; i -= 1) {
    const p1 = median[i - 1];
    const p2 = median[i];
    const dx = p2[0] - p1[0];
    const dy = p2[1] - p1[1];
    const len = Math.hypot(dx, dy);
    if (len < 1) continue;
    endDir = [dx, dy];
    end = p2;
    break;
  }

  if (!endDir) return "";
  const dirLen = Math.hypot(endDir[0], endDir[1]);
  if (dirLen < 1) return "";
  const ux = endDir[0] / dirLen;
  const uy = endDir[1] / dirLen;
  const perpX = -uy;
  const perpY = ux;
  const offset = 0;
  const advance = 40;
  const headLen = 60;
  const headWidth = 52;
  const tipX = end[0] + perpX * offset + ux * advance;
  const tipY = end[1] + perpY * offset + uy * advance;
  const baseX = tipX - ux * headLen;
  const baseY = tipY - uy * headLen;
  const leftX = baseX + perpX * (headWidth / 2);
  const leftY = baseY + perpY * (headWidth / 2);
  const rightX = baseX - perpX * (headWidth / 2);
  const rightY = baseY - perpY * (headWidth / 2);
  const headColor = "#2ecc71";
  const head = `<path d="M ${tipX} ${tipY} L ${leftX} ${leftY} L ${rightX} ${rightY} Z" fill="${headColor}" stroke="${headColor}" stroke-width="14" stroke-linejoin="round"></path>`;
  const dot = `<circle cx="${start[0]}" cy="${start[1]}" r="40" fill="${headColor}" stroke="#ffffff" stroke-width="11"></circle>`;
  return `${head}${dot}`;
}

function buildStrokeSvg(strokes, medians, stop, activeColor) {
  if (!strokes || !strokes.length || stop <= 0) return "";
  const visible = strokes.slice(0, stop);
  const paths = visible
    .map((stroke, idx) => {
      const color = idx === stop - 1 ? activeColor : "#c8c2b8";
      return `<path d="${stroke}" fill="${color}"></path>`;
    })
    .join("");
  const median = medians && medians[stop - 1];
  const arrow = buildArrowPath(median, activeColor);
  return `<svg viewBox="0 0 1024 1024" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
    <g transform="scale(1, -1) translate(0, -900)">${paths}${arrow}</g>
  </svg>`;
}

function buildGhostSvg(strokes) {
  if (!strokes || !strokes.length) return "";
  const paths = strokes
    .map((stroke) => `<path d="${stroke}" fill="#e2ddd5"></path>`)
    .join("");
  return `<svg viewBox="0 0 1024 1024" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
    <g transform="scale(1, -1) translate(0, -900)">${paths}</g>
  </svg>`;
}

function buildProgressCells(hanzi, strokes, medians, progressCount, activeColor) {
  if (!strokes || !strokes.length) {
    return Array.from({ length: progressCount })
      .map(
        () =>
          `<div class="cell progress missing"><span>${escapeHtml(
            hanzi
          )}</span></div>`
      )
      .join("");
  }
  const stops = buildStrokeStops(strokes.length, progressCount);
  return stops
    .map(
      (stop) =>
        `<div class="cell progress">${buildStrokeSvg(
          strokes,
          medians,
          stop,
          activeColor
        )}</div>`
    )
    .join("");
}

function buildPracticeCells(strokes, practiceCount) {
  const ghost = buildGhostSvg(strokes);
  return Array.from({ length: practiceCount })
    .map((_, idx) => {
      const ghostMarkup = idx === 0 ? ghost : "";
      return `<div class="cell practice">${ghostMarkup}</div>`;
    })
    .join("");
}

function buildOne({
  group,
  level,
  rowsPerPage,
  firstPageRows,
  outFile,
  accent,
  progressMin,
  progressMax,
  practiceCount
}) {
  const items = loadWritingList(group);
  const vocabMap = loadVocabMap();
  const cfdictMap = loadCfdictMap();
  const needed = new Set(items.map((item) => item.hanzi));
  const strokesMap = loadStrokesMap(needed);

  const rows = items.map((item) => {
    const entry = strokesMap.get(item.hanzi) || { strokes: [], medians: [] };
    const strokes = entry.strokes;
    const medians = entry.medians;
    const progressCount = resolveProgressCount(
      strokes.length,
      progressMin,
      progressMax
    );
    if (!strokes.length) {
      console.warn(`Traits manquants: ${item.hanzi}`);
    }
    const vocab = pickVocab(vocabMap, cfdictMap, item.hanzi, group);
    const progress = buildProgressCells(
      item.hanzi,
      strokes,
      medians,
      progressCount,
      accent
    );
    const practice = buildPracticeCells(strokes, practiceCount);
    return {
      ...item,
      pinyin: vocab.pinyin,
      meaning: vocab.meaning,
      progress,
      practice,
      progressCount
    };
  });

  const pages = [];
  const firstCount = Math.min(firstPageRows || rowsPerPage, rows.length);
  if (firstCount > 0) {
    pages.push(rows.slice(0, firstCount));
  }
  for (let i = firstCount; i < rows.length; i += rowsPerPage) {
    pages.push(rows.slice(i, i + rowsPerPage));
  }

  const pageMarkup = pages
    .map((pageRows, pageIndex) => {
      const pageNumber = pageIndex + 1;
      const levelLabel = level ? `Niveau ${level}` : `Niveau ${group}`;
      const groupLabel = level && group ? `Niveau ${group}` : `Niveau ${group}`;
      const noteMarkup =
        pageIndex === 0
          ? `      <aside class="note">
        <strong>Note écriture :</strong> suivez l'ordre des traits indiqué par la progression. <strong>Règles générales</strong> :
        Du haut vers le bas, trait de gauche, puis trait de droite, trait horizontal puis le vertical qui le coupe, trait vertical à gauche avant trait complexe à droite,
        le trait horizontal « socle » d’en bas en dernier, trait central avant les « ailes », trait tombant vers la gauche puis celui tombant vers la droite, point flottant en dernier.
      </aside>`
          : "";
      const cards = pageRows
        .map(
          (row) => `      <article class="hanzi-row">
        <div class="meta">
          <div class="index">${row.index}</div>
          <div class="hanzi-line">
            <div class="hanzi">${escapeHtml(row.hanzi)}</div>
            <div class="gloss">
              <div class="pinyin">${escapeHtml(row.pinyin || "")}</div>
              <div class="meaning">${escapeHtml(row.meaning || "")}</div>
            </div>
          </div>
        </div>
        <div class="grids">
          <div class="progress-grid" style="--progress-cols: ${row.progressCount};">${row.progress}</div>
          <div class="practice-grid" style="--practice-cols: ${practiceCount};">${row.practice}</div>
        </div>
      </article>`
        )
        .join("\n");

      return `    <section class="page" style="--accent: ${accent};">
      <header class="page-header">
        <div class="badge">New HSK 3.0</div>
        <div class="title">
          <h1>${levelLabel} · Écriture</h1>
          <p class="subtitle">${groupLabel} · ${items.length} caractères · progression + écriture</p>
        </div>
        <div class="meta">2026</div>
      </header>

${noteMarkup}
      <main class="worksheet">
${cards}
      </main>

      <footer class="page-footer">
        <div class="brand">${BRAND_TEXT}</div>
        <div class="page-number">Page ${pageNumber} / ${pages.length}</div>
      </footer>
    </section>`;
    })
    .join("\n");

  const template = fs.readFileSync(templatePath, "utf8");
  const html = template.replace("{{PAGES}}", pageMarkup);

  const outPath = path.resolve(__dirname, outFile);
  fs.writeFileSync(outPath, html, "utf8");
  return { count: items.length, outPath };
}

const levelArg = Number(getArg("level")) || null;
const groupArg = getArg("group");
const group = groupArg || LEVEL_TO_GROUP[levelArg] || "1-2";
const rowsPerPage = Number(getArg("rows")) || DEFAULT_ROWS_PER_PAGE;
const firstPageRows =
  Number(getArg("rows-first")) || DEFAULT_FIRST_PAGE_ROWS;
const accent = getArg("accent") || LEVEL_COLORS[group] || LEVEL_COLORS["1-2"];
let progressMax = Number(getArg("progress")) || DEFAULT_PROGRESS_MAX;
let progressMin = Number(getArg("progress-min")) || DEFAULT_PROGRESS_MIN;
if (progressMax < 1) progressMax = 1;
if (progressMin < 1) progressMin = 1;
if (progressMax < progressMin) {
  const swap = progressMax;
  progressMax = progressMin;
  progressMin = swap;
}
const practiceCount = DEFAULT_PRACTICE;
const levelLabel = levelArg ? String(levelArg) : group.replace(/\W+/g, "");
const outFile = getArg("out") || `index_hsk${levelLabel}_writing.html`;

const isAll = process.argv.includes("--all");

if (isAll) {
  LEVEL_GROUPS.forEach((groupName) => {
    const outName = `index_hsk${groupName.replace(/\W+/g, "")}_writing.html`;
    const result = buildOne({
      group: groupName,
      level: null,
      rowsPerPage,
      firstPageRows,
      outFile: outName,
      accent: getArg("accent") || LEVEL_COLORS[groupName] || LEVEL_COLORS["1-2"],
      progressMin,
      progressMax,
      practiceCount
    });
    console.log(
      `OK -> HSK ${groupName} (${result.count} caracteres) -> ${result.outPath}`
    );
  });
} else {
  const result = buildOne({
    group,
    level: levelArg,
    rowsPerPage,
    firstPageRows,
    outFile,
    accent,
    progressMin,
    progressMax,
    practiceCount
  });
  console.log(`OK -> HSK ${group} (${result.count} caracteres) -> ${result.outPath}`);
}
