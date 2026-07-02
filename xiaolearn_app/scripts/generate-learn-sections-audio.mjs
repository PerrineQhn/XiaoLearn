/**
 * generate-learn-sections-audio.mjs
 * ---------------------------------
 * Consomme `scripts/audit-learn-sections-audio-report.json` et génère via
 * Azure Neural TTS les MP3 manquants des items de `learnSections[].items`.
 *
 * Chaque audio est écrit au chemin exact demandé par la ts (extension
 * normalisée en .mp3 puisque Azure renvoie du MP3 48 kHz 96 kbps ; si le TS
 * référence un .wav, on écrit quand même un .mp3 — le resolver côté app
 * accepte les deux).
 *
 * Usage :
 *   node scripts/generate-learn-sections-audio.mjs            # tout le rapport
 *   node scripts/generate-learn-sections-audio.mjs --limit=50 # test rapide
 *   node scripts/generate-learn-sections-audio.mjs --concurrency=4
 *
 * Charge automatiquement `.env.local` s'il existe (sans dépendance dotenv).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const PUBLIC_ROOT = path.join(PROJECT_ROOT, 'public');
const REPORT_PATH = path.join(__dirname, 'audit-learn-sections-audio-report.json');

// ── .env.local loader (minimal) ─────────────────────────────────────────────
const envLocal = path.join(PROJECT_ROOT, '.env.local');
if (fs.existsSync(envLocal)) {
  for (const line of fs.readFileSync(envLocal, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (!m) continue;
    if (!process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

const AZURE_KEY = process.env.AZURE_SPEECH_KEY;
const AZURE_REGION = process.env.AZURE_SPEECH_REGION || 'eastus';
if (!AZURE_KEY) {
  console.error('✗ AZURE_SPEECH_KEY manquant (ni env ni .env.local).');
  process.exit(1);
}

// ── CLI ─────────────────────────────────────────────────────────────────────
const argv = process.argv.slice(2);
const limit = Number(argv.find((a) => a.startsWith('--limit='))?.slice(8)) || Infinity;
const concurrency = Number(argv.find((a) => a.startsWith('--concurrency='))?.slice(14)) || 6;
const voice = argv.find((a) => a.startsWith('--voice='))?.slice(8) || 'zh-CN-XiaoxiaoNeural';
// --slow : raccourci shadowing → rate -35%, pauses sur ponctuation, sortie
// vers `audio/<groupe>-slow/...` à la place de `audio/<groupe>/...`.
const slowMode = argv.includes('--slow');
const rate = argv.find((a) => a.startsWith('--rate='))?.slice(7) || (slowMode ? '-35%' : '-5%');
const dryRun = argv.includes('--dry-run');
const SHADOWING_BREAK_MS = 350;

/**
 * Réécrit un chemin audio pour le mode shadowing en injectant `-slow` à la
 * fin du premier segment de répertoire après `audio/`.
 *   audio/learn-sections/a1/foo.mp3 → audio/learn-sections-slow/a1/foo.mp3
 *   audio/foo/bar.mp3               → audio/foo-slow/bar.mp3
 */
function toSlowPath(rel) {
  const parts = rel.split('/');
  const idx = parts.indexOf('audio');
  if (idx === -1 || idx + 1 >= parts.length) return rel;
  parts[idx + 1] = `${parts[idx + 1]}-slow`;
  return parts.join('/');
}

// ── SSML + fetch ────────────────────────────────────────────────────────────
function escapeXml(s) {
  return s.replace(/[<>&'"]/g, (c) =>
    ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c])
  );
}
function buildSsmlBody(text) {
  if (!slowMode) return escapeXml(text);
  const parts = text.split(/([。，！？；：、])/u).filter(Boolean);
  let out = '';
  for (const p of parts) {
    out += escapeXml(p);
    if (/[。，！？；：、]/u.test(p)) out += `<break time="${SHADOWING_BREAK_MS}ms"/>`;
  }
  return out;
}
function buildSsml(text) {
  return `<speak version="1.0" xml:lang="zh-CN" xmlns:mstts="https://www.w3.org/2001/mstts">
  <voice name="${voice}">
    <prosody rate="${rate}">${buildSsmlBody(text)}</prosody>
  </voice>
</speak>`;
}

async function synthesize(text) {
  const url = `https://${AZURE_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': AZURE_KEY,
      'Content-Type': 'application/ssml+xml',
      'X-Microsoft-OutputFormat': 'audio-48khz-96kbitrate-mono-mp3',
      'User-Agent': 'xiaolearn-learn-sections-audio'
    },
    body: buildSsml(text)
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    const retryAfter = parseInt(res.headers.get('retry-after') || '0', 10);
    const err = new Error(`Azure ${res.status}: ${body.slice(0, 200)}`);
    err.status = res.status;
    err.retryAfter = retryAfter;
    err.body = body;
    throw err;
  }
  return Buffer.from(await res.arrayBuffer());
}

async function synthesizeWithRetry(text, label) {
  const MAX = 5;
  let last;
  for (let i = 1; i <= MAX; i++) {
    try {
      return await synthesize(text);
    } catch (err) {
      last = err;
      if (err.status === 429 && /quota/i.test(err.body || '')) throw err; // quota → stop
      const wait = err.retryAfter ? err.retryAfter * 1000 : 800 * i * i;
      console.warn(`  ↻ retry ${i}/${MAX} for ${label}: ${err.message.slice(0, 80)} (wait ${wait}ms)`);
      await new Promise((r) => setTimeout(r, wait));
    }
  }
  throw last;
}

// ── Main ────────────────────────────────────────────────────────────────────
async function main() {
  if (!fs.existsSync(REPORT_PATH)) {
    console.error(`✗ rapport introuvable : ${REPORT_PATH}`);
    console.error('  Lance d\'abord : node scripts/audit-learn-sections-audio.mjs');
    process.exit(1);
  }
  const report = JSON.parse(fs.readFileSync(REPORT_PATH, 'utf8'));
  const jobs = report.missing.slice(0, limit);

  console.log(`🎙  Voice=${voice} rate=${rate} region=${AZURE_REGION}${dryRun ? ' DRY' : ''}${slowMode ? ' 🐢 SLOW' : ''}`);
  console.log(`📋 ${jobs.length}/${report.missing.length} audios à générer (concurrency=${concurrency})\n`);

  let ok = 0;
  let fail = 0;
  let idx = 0;
  const failures = [];

  async function worker(id) {
    while (idx < jobs.length) {
      const job = jobs[idx++];
      const n = idx;
      // Normalise vers .mp3 (on écrit toujours du MP3 même si TS référence .wav).
      // En slow-mode, redirige le chemin vers un dossier parallèle "-slow".
      const baseRel = job.audio.replace(/\.wav$/, '.mp3');
      const outRel = slowMode ? toSlowPath(baseRel) : baseRel;
      const outAbs = path.join(PUBLIC_ROOT, outRel);
      const label = `[${n}/${jobs.length}] ${job.hanzi.padEnd(8)} → ${outRel}`;

      if (fs.existsSync(outAbs)) {
        console.log(`  ⏭  ${label} (existe déjà)`);
        ok++;
        continue;
      }

      if (dryRun) {
        console.log(`  · ${label} (dry-run)`);
        ok++;
        continue;
      }

      try {
        fs.mkdirSync(path.dirname(outAbs), { recursive: true });
        const mp3 = await synthesizeWithRetry(job.hanzi, label);
        fs.writeFileSync(outAbs, mp3);
        ok++;
        console.log(`  ✓ ${label} (${(mp3.length / 1024).toFixed(0)} KiB)`);
      } catch (err) {
        fail++;
        failures.push({ hanzi: job.hanzi, audio: outRel, error: err.message });
        console.error(`  ✗ ${label} :: ${err.message.slice(0, 120)}`);
        if (err.status === 429 && /quota/i.test(err.body || '')) {
          console.error('  ⚠ Quota Azure épuisé — arrêt du worker.');
          return;
        }
      }
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, jobs.length) }, (_, i) => worker(i));
  await Promise.all(workers);

  console.log(`\n✅ OK : ${ok}  ✗ Échecs : ${fail}`);
  if (failures.length > 0) {
    const failPath = path.join(__dirname, 'generate-learn-sections-audio-failures.json');
    fs.writeFileSync(failPath, JSON.stringify({ at: new Date().toISOString(), failures }, null, 2));
    console.log(`📄 Rapport d'échec : ${path.relative(PROJECT_ROOT, failPath)}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
