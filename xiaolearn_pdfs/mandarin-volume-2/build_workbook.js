const fs = require("fs");
const path = require("path");

const contentPath = path.resolve(__dirname, "content.json");
const strokesPath = path.resolve(
  __dirname,
  "../../xiaolearn_reference/hanzi_strokes/graphics.txt"
);

const DEFAULT_ROWS_PER_PAGE = 5;
const DEFAULT_PROGRESS_MAX = 8;
const DEFAULT_PROGRESS_MIN = 1;
const DEFAULT_PRACTICE_COUNT = 26;
const DEFAULT_PRACTICE_ROWS = 2;

function getArg(name) {
  const index = process.argv.indexOf(`--${name}`);
  if (index === -1) return null;
  return process.argv[index + 1] || null;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isHanzi(char) {
  return /[\u3400-\u9fff]/.test(char);
}

function loadContent() {
  if (!fs.existsSync(contentPath)) {
    throw new Error(`content.json introuvable: ${contentPath}`);
  }
  return JSON.parse(fs.readFileSync(contentPath, "utf8"));
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

function buildArrowPath(median) {
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
  const advance = 40;
  const headLen = 60;
  const headWidth = 52;
  const tipX = end[0] + ux * advance;
  const tipY = end[1] + uy * advance;
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
          `<div class="cell missing"><span>${escapeHtml(hanzi)}</span></div>`
      )
      .join("");
  }
  const stops = buildStrokeStops(strokes.length, progressCount);
  return stops
    .map(
      (stop) =>
        `<div class="cell">${buildStrokeSvg(
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

function buildRowsByDay(content) {
  const rowsByDay = [];
  for (const day of content.days || []) {
    const rows = [];
    const vocab = day.vocab || [];
    vocab.forEach((term, termIndex) => {
      const chars = Array.from(term.hanzi || "").filter(isHanzi);
      if (!chars.length) return;
      chars.forEach((char, charIndex) => {
        rows.push({
          day: day.day,
          themeZh: day.themeZh || "",
          themeFr: day.themeFr || "",
          termIndex: termIndex + 1,
          termCount: vocab.length,
          hanzi: term.hanzi || "",
          pinyin: term.pinyin || "",
          fr: term.fr || "",
          char,
          charIndex: charIndex + 1,
          charCount: chars.length
        });
      });
    });
    rowsByDay.push({ day, rows });
  }
  return rowsByDay;
}

function renderCover(meta) {
  const titleZh = escapeHtml(meta.titleZh || "汉语学习");
  const titleFr = escapeHtml(meta.titleFr || "Cahier d'écriture");
  const volume = escapeHtml(meta.volume || "02");
  return `  <section class="page page-cover">
    <div class="page-inner">
      <div class="cover cover-workbook">
        <div class="cover-top">
          <div class="cover-title-zh">${titleZh}</div>
          <div class="cover-title-fr">Cahier d'écriture</div>
          <div class="cover-volume">VOLUME ${volume}</div>
        </div>
        <div class="cover-content">
          <p class="brand">XiaoLearn</p>
          <span class="badge">Ordre des traits + tianzige</span>
        </div>
      </div>
    </div>
  </section>`;
}

function renderDayDivider(day) {
  return `  <section class="page" id="day-${day.day}">
    <div class="page-inner">
      <div class="day-divider">
        <div class="circle"><div class="day">${day.day}</div></div>
        <div class="theme">
          <div class="zh">${escapeHtml(day.themeZh || "")}</div>
          <div class="fr">${escapeHtml(day.themeFr || "")}</div>
        </div>
      </div>
    </div>
  </section>`;
}

function renderDayPage(day, rows, pageIndex, totalPages) {
  const rowMarkup = rows
    .map((row) => {
      const termLabel = `${row.hanzi} ${row.charCount > 1 ? `(${row.charIndex}/${row.charCount})` : ""}`.trim();
      return `      <article class="rewrite-row">
        <div class="rewrite-meta">
          <div class="rewrite-label">Jour ${row.day} · Terme ${row.termIndex}/${row.termCount}</div>
          <div class="rewrite-term">${escapeHtml(termLabel)}</div>
          <div class="rewrite-hanzi">${escapeHtml(row.char)}</div>
          <div class="rewrite-pinyin">${escapeHtml(row.pinyin)}</div>
          <div class="rewrite-fr">${escapeHtml(row.fr)}</div>
        </div>
        <div class="rewrite-grids">
          <div class="stroke-grid" style="--cols: ${row.progressCount}; --cell: 10mm; --gap: 1.5mm;">
            ${row.progress}
          </div>
          <div class="rewrite-grid" style="--cols: ${row.practiceCols}; --rows: ${row.practiceRows}; --cell: 10mm; --gap: 1.5mm;">
            ${row.practice}
          </div>
        </div>
      </article>`;
    })
    .join("\n");

  return `  <section class="page">
    <div class="page-inner">
      <div class="topbar">
        <div class="left">Jour ${day.day}</div>
        <div class="right">
          <div class="zh">${escapeHtml(day.themeZh || "")}</div>
          <div class="fr">${escapeHtml(day.themeFr || "")}</div>
        </div>
      </div>
      <div class="lesson-subtitle">Cahier d'écriture · Page ${pageIndex + 1}/${totalPages}</div>
      <div class="rewrite">
${rowMarkup}
      </div>
    </div>
  </section>`;
}

function buildWorkbook() {
  const rowsPerPage = Number(getArg("rows")) || DEFAULT_ROWS_PER_PAGE;
  const progressMax = Number(getArg("progress")) || DEFAULT_PROGRESS_MAX;
  const progressMin = Number(getArg("progress-min")) || DEFAULT_PROGRESS_MIN;
  const practiceCount = Number(getArg("practice")) || DEFAULT_PRACTICE_COUNT;
  const practiceRows = Number(getArg("practice-rows")) || DEFAULT_PRACTICE_ROWS;
  const practiceCols = Math.max(
    1,
    Math.ceil(practiceCount / Math.max(1, practiceRows))
  );
  const accent = getArg("accent") || "#d4a574";

  const content = loadContent();
  const rowsByDay = buildRowsByDay(content);
  const needed = new Set();
  rowsByDay.forEach(({ rows }) =>
    rows.forEach((row) => needed.add(row.char))
  );
  const strokesMap = loadStrokesMap(needed);

  rowsByDay.forEach(({ rows }) => {
    rows.forEach((row) => {
      const entry = strokesMap.get(row.char) || { strokes: [], medians: [] };
      const strokes = entry.strokes;
      const medians = entry.medians;
      row.progressCount = resolveProgressCount(
        strokes.length,
        progressMin,
        progressMax
      );
      if (!strokes.length) {
        console.warn(`Traits manquants: ${row.char}`);
      }
      row.progress = buildProgressCells(
        row.char,
        strokes,
        medians,
        row.progressCount,
        accent
      );
      row.practiceCount = practiceCount;
      row.practiceCols = practiceCols;
      row.practiceRows = practiceRows;
      row.practice = buildPracticeCells(strokes, practiceCount);
    });
  });

  const pages = [];
  pages.push(renderCover(content.meta || {}));

  rowsByDay.forEach(({ day, rows }) => {
    pages.push(renderDayDivider(day));
    const totalPages = Math.max(1, Math.ceil(rows.length / rowsPerPage));
    for (let i = 0; i < rows.length; i += rowsPerPage) {
      const pageRows = rows.slice(i, i + rowsPerPage);
      pages.push(renderDayPage(day, pageRows, i / rowsPerPage, totalPages));
    }
  });

  const html = `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Mandarin Volume 2 – Cahier d'écriture</title>
  <link rel="stylesheet" href="./styles.css" />
</head>
<body class="workbook">
  <div id="app">
${pages.join("\n")}
  </div>
</body>
</html>`;

  const outPath = path.resolve(__dirname, "workbook.html");
  fs.writeFileSync(outPath, html, "utf8");
  return outPath;
}

const outPath = buildWorkbook();
console.log(`OK -> ${outPath}`);
