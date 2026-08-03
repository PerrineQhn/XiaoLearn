/**
 * generate-missing-exercise-audio.mjs
 * -----------------------------------
 * Génère les MP3 manquants pour les exercices du mobile.
 *
 * ## Pourquoi un script de plus
 *
 * `generate-all-audio.mjs` balaie les blocs `examples:` des sources web et les
 * dictionnaires JSON. Les mots concernés ici viennent d'ailleurs : ce sont les
 * `items` des sections de leçons du dépôt mobile, repris par les exercices
 * générés. Ils étaient donc invisibles pour le pipeline existant, et
 * `enrich-exercises.mjs` refusait de leur poser un bouton 🔊 puisqu'aucun
 * fichier ne répondait.
 *
 * La liste est produite par le mobile :
 *   xiaolearn_mobile/scripts/enrich-exercises-missing-audio.json
 *
 * ## Cohérence avec l'existant
 *
 * Mêmes réglages que `generate-all-audio.mjs`, sans quoi ces phrases
 * détonneraient à l'écoute au milieu des autres :
 *
 *   voix    zh-CN-XiaoxiaoNeural
 *   débit   -10 % au-delà de 6 caractères, -5 % en deçà
 *   format  audio-48khz-96kbitrate-mono-mp3
 *   nom     audio/examples/<FNV-1a base36>.mp3
 *
 * Le nom de fichier est un hash du hanzi, calculé à l'identique côté app
 * (`useAudio.ts` en mobile, `src/utils/audio.ts` en web) : rien à déclarer
 * nulle part, le fichier est trouvé dès qu'il existe.
 *
 * ## Ce que le script ne fait pas
 *
 * Il écrit dans `public/audio/examples/` et s'arrête là. La mise en ligne
 * (R2 via `upload-audio-to-r2.mjs`, ou commit pour le miroir jsDelivr) reste
 * une décision séparée.
 *
 * Usage :
 *   node scripts/generate-missing-exercise-audio.mjs --dry-run
 *   node scripts/generate-missing-exercise-audio.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const PUBLIC_AUDIO = path.join(PROJECT_ROOT, 'public', 'audio');
const LIST = path.resolve(PROJECT_ROOT, '../xiaolearn_mobile/scripts/enrich-exercises-missing-audio.json');

// ── .env.local (même chargeur minimal que les autres scripts audio) ──────────
const envLocal = path.join(PROJECT_ROOT, '.env.local');
if (fs.existsSync(envLocal)) {
  for (const line of fs.readFileSync(envLocal, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}
const AZURE_KEY = process.env.AZURE_SPEECH_KEY;
const AZURE_REGION = process.env.AZURE_SPEECH_REGION || 'eastus';

const DRY = process.argv.includes('--dry-run');
const VOICE = 'zh-CN-XiaoxiaoNeural';

if (!AZURE_KEY && !DRY) {
  console.error('✗ AZURE_SPEECH_KEY manquant (ni env ni .env.local).');
  process.exit(1);
}

// ── Nommage : FNV-1a 32 bits → base36, identique app web et mobile ──────────
function hashExampleName(hanzi) {
  let h = 0x811c9dc5;
  for (let i = 0; i < hanzi.length; i++) { h ^= hanzi.charCodeAt(i); h = Math.imul(h, 0x01000193); }
  return (h >>> 0).toString(36);
}

const escapeXml = s => s.replace(/[<>&'"]/g, c =>
  ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]));

const buildSsml = (text, rate) => [
  '<speak version="1.0" xml:lang="zh-CN" xmlns:mstts="https://www.w3.org/2001/mstts">',
  `  <voice name="${VOICE}">`,
  `    <prosody rate="${rate}">${escapeXml(text)}</prosody>`,
  '  </voice>',
  '</speak>',
].join('\n');

class AzureError extends Error {
  constructor(status, body, retryAfter) {
    super(`Azure TTS ${status}: ${body.slice(0, 200)}`);
    this.status = status; this.body = body; this.retryAfter = retryAfter;
  }
  isQuotaExhausted() {
    return this.status === 429 && /quota/i.test(this.body) && (!this.retryAfter || this.retryAfter > 3600);
  }
}

async function synthesize(text, rate) {
  const res = await fetch(`https://${AZURE_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': AZURE_KEY,
      'Content-Type': 'application/ssml+xml',
      'X-Microsoft-OutputFormat': 'audio-48khz-96kbitrate-mono-mp3',
      'User-Agent': 'xiaolearn-audio-generator',
    },
    body: buildSsml(text, rate),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    const ra = res.headers.get('retry-after');
    throw new AzureError(res.status, body, ra ? parseInt(ra, 10) : null);
  }
  return Buffer.from(await res.arrayBuffer());
}

let quotaExhausted = false;
async function synthesizeWithRetry(text, rate, label) {
  let lastErr;
  for (let attempt = 1; attempt <= 6; attempt++) {
    if (quotaExhausted) throw lastErr ?? new Error('quota épuisé');
    try { return await synthesize(text, rate); }
    catch (err) {
      lastErr = err;
      if (err instanceof AzureError && err.isQuotaExhausted()) { quotaExhausted = true; throw err; }
      const wait = err instanceof AzureError && err.status === 429
        ? (err.retryAfter ? err.retryAfter * 1000 : [1000, 3000, 9000, 27000, 60000][attempt - 1] ?? 60000)
        : 800 * attempt;
      console.warn(`  ↻ ${label} — tentative ${attempt}/6 (${err.message.slice(0, 80)}) — attente ${Math.round(wait / 1000)} s`);
      await new Promise(r => setTimeout(r, wait));
    }
  }
  throw lastErr;
}

// ── Travaux ──────────────────────────────────────────────────────────────────
if (!fs.existsSync(LIST)) {
  console.error(`✗ liste introuvable : ${LIST}`);
  console.error('  Lance d\'abord : cd ../xiaolearn_mobile && node scripts/enrich-exercises.mjs');
  process.exit(1);
}
const words = JSON.parse(fs.readFileSync(LIST, 'utf8'));
fs.mkdirSync(path.join(PUBLIC_AUDIO, 'examples'), { recursive: true });

const jobs = [];
let already = 0;
for (const raw of words) {
  const text = String(raw).replace(/\d+$/, '').trim();
  if (!text) continue;
  const out = path.join(PUBLIC_AUDIO, 'examples', `${hashExampleName(text)}.mp3`);
  if (fs.existsSync(out)) { already++; continue; }
  // Les phrases longues passent à -10 %, comme les exemples du pipeline
  // principal : à débit normal une phrase de dix caractères devient un mur.
  jobs.push({ text, out, rate: text.length > 6 ? '-10%' : '-5%' });
}

console.log(`mots listés : ${words.length} · déjà présents : ${already} · à générer : ${jobs.length}`);
console.log(`voix : ${VOICE} · région : ${AZURE_REGION}`);
console.log(`caractères à synthétiser : ${jobs.reduce((n, j) => n + j.text.length, 0)}`);
if (DRY) {
  for (const j of jobs.slice(0, 10)) console.log(`  ${j.text.padEnd(14)} → ${path.basename(j.out)} (${j.rate})`);
  if (jobs.length > 10) console.log(`  … et ${jobs.length - 10} autres`);
  console.log('\n(--dry-run : aucun appel Azure, aucun fichier écrit)');
  process.exit(0);
}

let ok = 0; const failed = []; const written = [];
for (const [i, j] of jobs.entries()) {
  const label = `${i + 1}/${jobs.length} ${j.text}`;
  try {
    const mp3 = await synthesizeWithRetry(j.text, j.rate, label);
    // Un MP3 valide commence par ID3 ou une trame MPEG (0xFF 0xFB/0xF3/0xF2).
    // Azure renvoie parfois 200 avec un corps vide : l'écrire produirait un
    // fichier présent et muet, pire qu'un fichier absent.
    if (mp3.length < 1000) throw new Error(`réponse trop courte (${mp3.length} octets)`);
    fs.writeFileSync(j.out, mp3);
    written.push(path.relative(path.join(PROJECT_ROOT, 'public'), j.out).split(path.sep).join('/'));
    ok++;
    console.log(`  ✓ ${label} → ${path.basename(j.out)} (${(mp3.length / 1024).toFixed(0)} Ko)`);
  } catch (err) {
    failed.push({ text: j.text, error: err.message });
    console.error(`  ✗ ${label} — ${err.message}`);
    if (quotaExhausted) { console.error('  quota Azure épuisé — arrêt.'); break; }
  }
  await new Promise(r => setTimeout(r, 120)); // respiration, plan F0
}

console.log(`\ngénérés : ${ok}/${jobs.length}`);

// Liste des fichiers produits, à passer à l'upload R2.
//
// Sans elle, la seule trace des nouveaux fichiers serait la liste d'entrée du
// mobile — or celle-ci se vide dès qu'on régénère les exercices, puisque
// l'audio existe désormais. On perdrait donc, précisément après une génération
// réussie, le moyen de savoir quoi mettre en ligne.
const LIST_OUT = path.join(__dirname, 'generated-audio-files.txt');
if (written.length) {
  fs.writeFileSync(LIST_OUT, written.join('\n') + '\n');
  console.log(`liste écrite : scripts/${path.basename(LIST_OUT)}`);
  console.log('mise en ligne :');
  console.log(`  node --env-file=.env.local scripts/upload-audio-to-r2.mjs --files=scripts/${path.basename(LIST_OUT)}`);
}

if (failed.length) {
  console.log(`échecs : ${failed.length}`);
  for (const f of failed) console.log(`  ${f.text} — ${f.error}`);
  process.exitCode = 1;
}
