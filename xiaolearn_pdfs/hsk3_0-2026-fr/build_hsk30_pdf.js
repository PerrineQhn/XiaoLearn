const fs = require("fs");
const path = require("path");

const templatePath = path.resolve(__dirname, "template.html");

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function pickFrench(item) {
  if (item.translationFr && item.translationFr.trim()) return item.translationFr.trim();
  if (Array.isArray(item.translationFrAlt) && item.translationFrAlt.length) {
    const alt = item.translationFrAlt.find((value) => String(value).trim());
    if (alt) return String(alt).trim();
  }
  if (item.translation && item.translation.trim()) return item.translation.trim();
  return "";
}

function sanitizeHanzi(value) {
  const base = String(value || "").trim();
  return base.replace(/\d+$/u, "").trim();
}

const GRID_COLUMNS = 16;
const MAX_SPAN = 6;
const DEFAULT_ROWS_PER_PAGE = 8;
const LEVEL_ROWS = {
  1: 8,
  2: 8,
  3: 8,
  4: 8,
  5: 8,
  6: 8,
  7: 8
};
const LEVEL_COLORS = {
  1: "#9b2335",
  2: "#ddb802",
  3: "#c26a14",
  4: "#28a165",
  5: "#6a3c8b",
  6: "#0bafd8",
  7: "#ac6c35"
};
const BRAND_TEXT = "XiaoLearn";

function hanziSpan(hanzi) {
  const length = Array.from(hanzi).length;
  if (length <= 1) return 2;
  if (length === 2) return 3;
  if (length === 3) return 4;
  return 5;
}

function textLength(value) {
  return Array.from(String(value || "")).length;
}

function computeSpan({ hanzi, pinyin, fr }) {
  let span = hanziSpan(hanzi);
  const frLen = textLength(fr);
  if (frLen > 28) span += 2;
  else if (frLen > 18) span += 1;

  const pinyinLen = textLength(String(pinyin || "").replace(/\s+/g, ""));
  if (pinyinLen > 10) span += 1;

  return Math.min(MAX_SPAN, span);
}

function buildOne({ level, accent, outFile, rowsPerPage }) {
  const dataPath = path.resolve(__dirname, `../../xiaolearn_app/data/hsk${level}.json`);
  if (!fs.existsSync(dataPath)) {
    throw new Error(`Fichier introuvable: ${dataPath}`);
  }

  const raw = JSON.parse(fs.readFileSync(dataPath, "utf8"));
  const items = raw
    .map((item) => {
      const hanzi = sanitizeHanzi(item.hanzi);
      if (!hanzi) return null;
    return {
      hanzi,
      pinyin: item.pinyin ? item.pinyin.trim() : "",
      fr: pickFrench(item),
      span: 0
    };
  })
  .filter(Boolean);

  for (const item of items) {
    item.span = computeSpan(item);
  }

  const rows = [];
  let current = [];
  let total = 0;

  for (const item of items) {
    const span = Math.min(item.span, GRID_COLUMNS);
    if (current.length && total + span > GRID_COLUMNS) {
      rows.push({ items: current, total });
      current = [item];
      total = span;
      continue;
    }
    current.push(item);
    total += span;
  }

  if (current.length) rows.push({ items: current, total });

  for (const row of rows) {
    let remaining = GRID_COLUMNS - row.total;
    if (remaining <= 0) continue;
    const order = row.items
      .map((item, idx) => ({ idx, weight: item.span }))
      .sort((a, b) => b.weight - a.weight || a.idx - b.idx);
    let cursor = 0;
    while (remaining > 0) {
      const target = order[cursor % order.length];
      row.items[target.idx].span += 1;
      remaining -= 1;
      cursor += 1;
    }
  }

  const pages = [];
  for (let i = 0; i < rows.length; i += rowsPerPage) {
    pages.push(rows.slice(i, i + rowsPerPage));
  }

  const totalPages = pages.length;
  const pageMarkup = pages
    .map((pageRows, pageIndex) => {
      const cards = pageRows
        .flatMap((row) => row.items)
        .map(
          (item) => `      <article class="card" style="grid-column: span ${item.span};">
        <div class="pinyin">${escapeHtml(item.pinyin)}</div>
        <div class="hanzi">${escapeHtml(item.hanzi)}</div>
        <div class="fr">${escapeHtml(item.fr)}</div>
      </article>`
        )
        .join("\n");

      const pageNumber = pageIndex + 1;
      return `    <section class="page" style="--accent: ${accent};">
      <header class="page-header">
        <div class="badge">New HSK 3.0</div>
        <div class="title">
          <h1>Niveau ${level} · Vocabulaire</h1>
          <p class="subtitle">${items.length} mots · chinois · pinyin · français</p>
        </div>
        <div class="meta">2026</div>
      </header>

      <main class="grid">
${cards}
      </main>

      <footer class="page-footer">
        <div class="brand">${BRAND_TEXT}</div>
        <div class="page-number">Page ${pageNumber} / ${totalPages}</div>
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

function getArg(name) {
  const index = process.argv.indexOf(`--${name}`);
  if (index === -1) return null;
  return process.argv[index + 1] || null;
}

const isAll = process.argv.includes("--all");
const rowsArg = Number(getArg("rows")) || null;

if (isAll) {
  [1, 2, 3, 4, 5].forEach((level) => {
    const accent = getArg("accent") || LEVEL_COLORS[level] || LEVEL_COLORS[1];
    const outFile = `index_hsk${level}.html`;
    const rowsPerPage = rowsArg || LEVEL_ROWS[level] || DEFAULT_ROWS_PER_PAGE;
    const result = buildOne({ level, accent, outFile, rowsPerPage });
    console.log(`OK -> HSK${level} (${result.count} cartes) -> ${result.outPath}`);
  });
} else {
  const level = Number(getArg("level")) || 1;
  const accent = getArg("accent") || LEVEL_COLORS[level] || LEVEL_COLORS[1];
  const outFile = getArg("out") || "index.html";
  const rowsPerPage = rowsArg || LEVEL_ROWS[level] || DEFAULT_ROWS_PER_PAGE;
  const result = buildOne({ level, accent, outFile, rowsPerPage });
  console.log(`OK -> HSK${level} (${result.count} cartes) -> ${result.outPath}`);
}
