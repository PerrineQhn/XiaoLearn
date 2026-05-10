/**
 * wav-to-azure-mp3.mjs
 * --------------------
 * Parcourt public/audio/ et, pour CHAQUE fichier .wav, génère le .mp3
 * équivalent via Azure Neural TTS (voix zh-CN-XiaoxiaoNeural) en extrayant
 * le hanzi du nom de fichier.
 *
 * Pourquoi pas `generate-all-audio.mjs` ?
 *   Ce dernier se base sur les dictionnaires data/hsk*.json. Tous les mots
 *   du dict ont déjà leur MP3. Les 9000+ WAV restants sont référencés par
 *   d'autres sources (src/data/cecr-*.ts, first-steps, WOTD hors-hsk, etc.)
 *   et/ou sont des vestiges historiques que l'app charge encore via les
 *   fallbacks .wav. Ce script les regénère tous en Azure pour uniformiser
 *   la voix.
 *
 * Usage :
 *   export AZURE_SPEECH_KEY="..."
 *   export AZURE_SPEECH_REGION="westeurope"
 *   node scripts/wav-to-azure-mp3.mjs [options]
 *
 * Options :
 *   --dry-run         liste les WAV à traiter sans appeler Azure
 *   --delete-wav      supprime le .wav après succès de génération du .mp3
 *   --force           regénère même si le .mp3 existe déjà
 *   --limit=N         ne traite que N fichiers (tests)
 *   --concurrency=N   appels Azure en parallèle (défaut 6)
 *   --voice=name      voix Azure (défaut zh-CN-XiaoxiaoNeural)
 *
 * Convention d'extraction du hanzi : nom de fichier `<prefix>_<hanzi>.wav`
 * où prefix ∈ {hsk1, hsk2, …, hsk7, hsk-7-9, hsk7-9}. Le hanzi peut contenir
 * des caractères multi-byte.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const AUDIO_ROOT = path.join(PROJECT_ROOT, 'public', 'audio');

// ---------------------------------------------------------------------------
// CLI parsing
// ---------------------------------------------------------------------------
const argv = process.argv.slice(2);
const dryRun = argv.includes('--dry-run');
const deleteWav = argv.includes('--delete-wav');
const force = argv.includes('--force');
const limitArg = argv.find((a) => a.startsWith('--limit='))?.slice('--limit='.length);
const concArg = argv.find((a) => a.startsWith('--concurrency='))?.slice('--concurrency='.length);
const voiceArg = argv.find((a) => a.startsWith('--voice='))?.slice('--voice='.length);

const LIMIT = limitArg ? parseInt(limitArg, 10) : Infinity;
const CONCURRENCY = concArg ? Math.max(1, parseInt(concArg, 10)) : 6;
const VOICE = voiceArg || 'zh-CN-XiaoxiaoNeural';
const RATE = '-5%';

const AZURE_KEY = process.env.AZURE_SPEECH_KEY;
const AZURE_REGION = process.env.AZURE_SPEECH_REGION;

if (!dryRun && (!AZURE_KEY || !AZURE_REGION)) {
  console.error('❌ AZURE_SPEECH_KEY et AZURE_SPEECH_REGION requis (ou utiliser --dry-run).');
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Azure TTS helpers (copiés de generate-all-audio.mjs pour rester autonome)
// ---------------------------------------------------------------------------
class AzureError extends Error {
  constructor(status, body) {
    super(`Azure TTS ${status}: ${body.slice(0, 120)}`);
    this.status = status;
    this.body = body;
  }
  isQuotaExhausted() {
    return this.status === 403 || this.status === 429 || /quota/i.test(this.body);
  }
}

function buildSsml(text, voice, rate) {
  return [
    '<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="zh-CN">',
    `  <voice name="${voice}">`,
    `    <prosody rate="${rate}">${text.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</prosody>`,
    '  </voice>',
    '</speak>'
  ].join('\n');
}

async function synthesize(text, voice, rate) {
  const ssml = buildSsml(text, voice, rate);
  const url = `https://${AZURE_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': AZURE_KEY,
      'Content-Type': 'application/ssml+xml',
      'X-Microsoft-OutputFormat': 'audio-48khz-96kbitrate-mono-mp3',
      'User-Agent': 'xiaolearn-wav-to-mp3'
    },
    body: ssml
  });
  if (!response.ok) {
    const body = await response.text();
    throw new AzureError(response.status, body);
  }
  return Buffer.from(await response.arrayBuffer());
}

async function synthesizeWithRetry(text, voice, label) {
  const MAX_RETRIES = 3;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await synthesize(text, voice, RATE);
    } catch (err) {
      if (err instanceof AzureError && err.isQuotaExhausted()) throw err;
      if (attempt === MAX_RETRIES) throw err;
      const backoff = 500 * Math.pow(2, attempt);
      console.warn(`  ⚠ ${label} : retry ${attempt + 1}/${MAX_RETRIES} dans ${backoff}ms — ${err.message}`);
      await new Promise((r) => setTimeout(r, backoff));
    }
  }
}

// ---------------------------------------------------------------------------
// Scanning public/audio/ pour trouver les .wav
// ---------------------------------------------------------------------------
function walkAudioDir(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walkAudioDir(full));
    } else if (entry.isFile() && full.toLowerCase().endsWith('.wav')) {
      out.push(full);
    }
  }
  return out;
}

/**
 * Extrait le hanzi du nom de fichier : `hsk1_你好.wav` → `你好`.
 * Retourne null si le pattern ne match pas (skip le fichier).
 */
function extractHanzi(filename) {
  const base = path.basename(filename, '.wav');
  // Accepte les préfixes : hsk1, hsk2, …, hsk7, hsk-7-9, hsk7-9
  const m = base.match(/^(hsk\d+|hsk-?7-9)_(.+)$/);
  if (!m) return null;
  return m[2];
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log('🎙️  wav-to-azure-mp3 · conversion des WAV historiques en MP3 Azure\n');
  console.log(`  Voix : ${VOICE}`);
  console.log(`  Région : ${AZURE_REGION || 'N/A (dry-run)'}`);
  console.log(`  Concurrence : ${CONCURRENCY}`);
  console.log(`  --force : ${force ? 'oui' : 'non (skip si .mp3 existe)'}`);
  console.log(`  --delete-wav : ${deleteWav ? 'oui (supprime WAV après)' : 'non (conserve WAV)'}`);
  console.log(`  --limit : ${LIMIT === Infinity ? 'aucune' : LIMIT}`);
  console.log(`  --dry-run : ${dryRun ? 'oui' : 'non'}\n`);

  if (!fs.existsSync(AUDIO_ROOT)) {
    console.error(`❌ ${AUDIO_ROOT} introuvable.`);
    process.exit(1);
  }

  console.log(`🔍 Scan ${AUDIO_ROOT}…`);
  const allWavs = walkAudioDir(AUDIO_ROOT);
  console.log(`   Trouvé ${allWavs.length} fichiers .wav\n`);

  // Filtre : WAV dont le .mp3 équivalent n'existe PAS (ou --force), et dont
  // on peut extraire un hanzi valide.
  const jobs = [];
  let skippedExisting = 0;
  let skippedNoHanzi = 0;
  for (const wav of allWavs) {
    const hanzi = extractHanzi(wav);
    if (!hanzi) {
      skippedNoHanzi++;
      continue;
    }
    const mp3 = wav.slice(0, -4) + '.mp3';
    if (!force && fs.existsSync(mp3)) {
      skippedExisting++;
      continue;
    }
    jobs.push({ wav, mp3, hanzi, label: path.relative(PROJECT_ROOT, wav) });
    if (jobs.length >= LIMIT) break;
  }

  console.log(`  À générer : ${jobs.length}`);
  console.log(`  Skippés (MP3 déjà présent) : ${skippedExisting}`);
  console.log(`  Skippés (pas de hanzi extractible) : ${skippedNoHanzi}\n`);

  if (jobs.length === 0) {
    console.log('Rien à faire.');
    return;
  }

  if (dryRun) {
    console.log('Aperçu (20 premiers) :');
    for (const j of jobs.slice(0, 20)) {
      console.log(`  ○ ${j.hanzi}  →  ${path.relative(PROJECT_ROOT, j.mp3)}`);
    }
    if (jobs.length > 20) console.log(`  … et ${jobs.length - 20} autres`);
    // Estimation coût : 2 caractères moyens par hanzi, 16 USD / M de chars.
    const estChars = jobs.reduce((s, j) => s + j.hanzi.length, 0);
    const estCost = (estChars / 1_000_000) * 16;
    console.log(`\nEstimation Azure : ${estChars} caractères ≈ ${estCost.toFixed(4)} USD`);
    console.log('\nDRY-RUN : aucun appel Azure effectué.');
    return;
  }

  // -------------------------------------------------------------------------
  // Worker pool
  // -------------------------------------------------------------------------
  const t0 = Date.now();
  let generated = 0;
  let failed = 0;
  let deletedWavs = 0;
  let quotaExhausted = false;
  const failures = [];

  async function worker(id) {
    while (true) {
      if (quotaExhausted) return;
      const job = jobs.shift();
      if (!job) return;
      try {
        const mp3Buffer = await synthesizeWithRetry(job.hanzi, VOICE, job.label);
        fs.mkdirSync(path.dirname(job.mp3), { recursive: true });
        fs.writeFileSync(job.mp3, mp3Buffer);
        generated++;
        if (deleteWav) {
          fs.unlinkSync(job.wav);
          deletedWavs++;
        }
        if (generated % 50 === 0 || generated < 5) {
          const elapsed = ((Date.now() - t0) / 1000).toFixed(0);
          const rate = (generated / Math.max(1, parseInt(elapsed, 10))).toFixed(1);
          console.log(`  ✓ [w${id}] ${generated} générés (${rate}/s) — ${job.hanzi}`);
        }
      } catch (err) {
        failed++;
        failures.push({ label: job.label, error: err.message });
        console.error(`  ✗ [w${id}] ${job.label} — ${err.message}`);
        if (err instanceof AzureError && err.isQuotaExhausted()) {
          quotaExhausted = true;
          console.error(`\n  🛑 Quota Azure épuisé — arrêt des workers.`);
          return;
        }
      }
    }
  }

  const workers = Array.from({ length: CONCURRENCY }, (_, i) => worker(i + 1));
  await Promise.all(workers);

  const elapsed = ((Date.now() - t0) / 1000).toFixed(0);
  console.log(`\n📊 Résumé :`);
  console.log(`  Générés : ${generated}`);
  console.log(`  Échecs : ${failed}`);
  if (deleteWav) console.log(`  WAV supprimés : ${deletedWavs}`);
  console.log(`  Durée : ${elapsed}s`);

  if (failed > 0) {
    console.log(`\n⚠ ${failed} échecs. Premiers :`);
    for (const f of failures.slice(0, 10)) {
      console.log(`  - ${f.label} : ${f.error}`);
    }
  }

  if (quotaExhausted) {
    console.log(`\n💡 Relance la commande plus tard : les MP3 déjà créés seront skippés.`);
  }
}

main().catch((err) => {
  console.error('Erreur fatale :', err);
  process.exit(1);
});
