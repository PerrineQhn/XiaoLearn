/**
 * generate-reading-audio.mjs
 * --------------------------
 * Génère une piste MP3 par segment de chaque texte de lecture de XiaoLearn,
 * via Azure Neural TTS. Une voix unique est choisie par texte (narration)
 * plutôt que par personnage (le lecteur n'est pas un dialogue).
 * Émet un manifest JSON consommé par ReadingPlayer pour jouer les pistes
 * pré-doublées (fallback → Web Speech API côté navigateur).
 *
 * Usage :
 *   AZURE_SPEECH_KEY=xxx AZURE_SPEECH_REGION=eastus \
 *     node scripts/generate-reading-audio.mjs [options]
 *
 * Options :
 *   --force           : regénère tous les MP3 même s'ils existent déjà
 *   --level=a1,a2     : filtre par niveaux CECR (séparés par virgules)
 *   --limit=N         : ne traite que les N premiers textes (après tri)
 *   --reading=id1,…   : filtre par identifiants de reading
 *   --dry-run         : liste ce qui serait généré, n'appelle pas Azure
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import ts from 'typescript';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// ---------------------------------------------------------------------------
// CLI parsing
// ---------------------------------------------------------------------------
const argv = process.argv.slice(2);
const force = argv.includes('--force');
const dryRun = argv.includes('--dry-run');
// --slow active le mode shadowing : audio ralenti (rate -35% par défaut) avec
// pauses respiratoires sur la ponctuation. Sortie vers `audio/readings-slow/`.
const slowMode = argv.includes('--slow');

function parseFlag(prefix) {
  const raw = argv.find((a) => a.startsWith(prefix));
  if (!raw) return null;
  return raw.slice(prefix.length);
}

const levelFilter = parseFlag('--level=')?.split(',').map((s) => s.trim().toLowerCase()) ?? null;
const readingFilter = parseFlag('--reading=')?.split(',').map((s) => s.trim()) ?? null;
const limitFlag = parseFlag('--limit=');
const limit = limitFlag ? Math.max(1, parseInt(limitFlag, 10) || 0) : Infinity;
const rateOverride = parseFlag('--rate=');

// -10% en lecture normale (déjà posé), -35% en shadowing.
const PROSODY_RATE = rateOverride ?? (slowMode ? '-35%' : '-10%');
const SHADOWING_BREAK_MS = 350;

const folderName = slowMode ? 'readings-slow' : 'readings';
const publicAudioDir = path.join(projectRoot, 'public', 'audio', folderName);
const manifestPath = path.join(publicAudioDir, 'manifest.json');

// ---------------------------------------------------------------------------
// Azure credentials
// ---------------------------------------------------------------------------
const AZURE_KEY = process.env.AZURE_SPEECH_KEY;
const AZURE_REGION = process.env.AZURE_SPEECH_REGION || 'eastus';

if (!AZURE_KEY && !dryRun) {
  console.error('✗ AZURE_SPEECH_KEY manquant.');
  console.error('  Export :   export AZURE_SPEECH_KEY="<ta clé>"');
  console.error('  Région (défaut eastus) : export AZURE_SPEECH_REGION="westeurope"');
  console.error('  Ou utilise --dry-run pour prévisualiser sans appeler l\'API.');
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Pool de voix narratrices zh-CN : la même voix pour tout un texte donne
// une lecture cohérente, comme un livre audio. On varie d'un texte à l'autre
// par hash déterministe de l'id, pour ne pas entendre 15× la même voix.
// ---------------------------------------------------------------------------
const NARRATION_VOICES = [
  'zh-CN-XiaoxiaoNeural',  // F - chaleureuse, narratrice de référence
  'zh-CN-XiaohanNeural',   // F - posée, adulte
  'zh-CN-YunyangNeural',   // M - présentateur, clair
  'zh-CN-YunjianNeural',   // M - adulte, grave
  'zh-CN-XiaomoNeural'     // F - polyvalente
];

function hashString(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function pickVoiceForReading(readingId) {
  const idx = hashString(readingId) % NARRATION_VOICES.length;
  return NARRATION_VOICES[idx];
}

// ---------------------------------------------------------------------------
// Chargement des readings via le compilateur TypeScript
// ---------------------------------------------------------------------------
async function loadReadings() {
  const readingsTs = path.join(projectRoot, 'src/data/readings.ts');
  const cecrB2Ts = path.join(projectRoot, 'src/data/cecr-b2-texts.ts');
  const cecrExtraTs = path.join(projectRoot, 'src/data/cecr-extra-readings.ts');
  const cecrTalesTs = path.join(projectRoot, 'src/data/cecr-tales-daily-readings.ts');

  const tmpDir = path.join(__dirname, '.cache-reading-audio');
  fs.mkdirSync(tmpDir, { recursive: true });

  const compileOptions = {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2020,
    moduleResolution: ts.ModuleResolutionKind.NodeNext,
    esModuleInterop: true,
    isolatedModules: true
  };

  function compile(srcPath) {
    const src = fs.readFileSync(srcPath, 'utf8');
    return ts.transpileModule(src, { compilerOptions: compileOptions }).outputText;
  }

  // cecr-b2-texts.ts + cecr-extra-readings.ts sont des dépendances de readings.ts —
  // on les compile d'abord avant d'ajuster les chemins d'import.
  const cecrOutPath = path.join(tmpDir, 'cecr-b2-texts.mjs');
  fs.writeFileSync(cecrOutPath, compile(cecrB2Ts));

  const cecrExtraOutPath = path.join(tmpDir, 'cecr-extra-readings.mjs');
  fs.writeFileSync(cecrExtraOutPath, compile(cecrExtraTs));

  const cecrTalesOutPath = path.join(tmpDir, 'cecr-tales-daily-readings.mjs');
  fs.writeFileSync(cecrTalesOutPath, compile(cecrTalesTs));

  let readingsJs = compile(readingsTs);
  readingsJs = readingsJs.replace(
    /from\s+['"]\.\/cecr-b2-texts['"]/g,
    `from './cecr-b2-texts.mjs'`
  );
  readingsJs = readingsJs.replace(
    /from\s+['"]\.\/cecr-extra-readings['"]/g,
    `from './cecr-extra-readings.mjs'`
  );
  readingsJs = readingsJs.replace(
    /from\s+['"]\.\/cecr-tales-daily-readings['"]/g,
    `from './cecr-tales-daily-readings.mjs'`
  );
  const readingsOutPath = path.join(tmpDir, 'readings.mjs');
  fs.writeFileSync(readingsOutPath, readingsJs);

  const mod = await import(pathToFileURL(readingsOutPath).href);
  return { entries: mod.readings, tmpDir };
}

// ---------------------------------------------------------------------------
// Azure REST call
// ---------------------------------------------------------------------------
function escapeXml(s) {
  return s.replace(/[<>&'"]/g, (c) => (
    { '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]
  ));
}

/**
 * En shadowing, on ajoute une pause SSML après chaque ponctuation chinoise
 * forte pour caler la respiration de l'apprenant.
 */
function buildSsmlBody(text) {
  if (!slowMode) return escapeXml(text);
  const parts = text.split(/([。，！？；：、])/u).filter(Boolean);
  let out = '';
  for (const p of parts) {
    out += escapeXml(p);
    if (/[。，！？；：、]/u.test(p)) {
      out += `<break time="${SHADOWING_BREAK_MS}ms"/>`;
    }
  }
  return out;
}

function buildSsml(text, voiceName) {
  return [
    '<speak version="1.0" xml:lang="zh-CN" xmlns:mstts="https://www.w3.org/2001/mstts">',
    `  <voice name="${voiceName}">`,
    `    <prosody rate="${PROSODY_RATE}">${buildSsmlBody(text)}</prosody>`,
    '  </voice>',
    '</speak>'
  ].join('\n');
}

async function synthesize(text, voiceName) {
  const ssml = buildSsml(text, voiceName);
  const url = `https://${AZURE_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': AZURE_KEY,
      'Content-Type': 'application/ssml+xml',
      'X-Microsoft-OutputFormat': 'audio-48khz-96kbitrate-mono-mp3',
      'User-Agent': 'xiaolearn-audio-generator'
    },
    body: ssml
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Azure TTS ${res.status}: ${body.slice(0, 300)}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  return buf;
}

async function synthesizeWithRetry(text, voice, label) {
  let lastErr;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      return await synthesize(text, voice);
    } catch (err) {
      lastErr = err;
      console.warn(`  ⚠ tentative ${attempt} échec [${label}] : ${err.message}`);
      if (attempt < 3) await new Promise((r) => setTimeout(r, attempt * 800));
    }
  }
  throw lastErr;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log('📖 Génération audio readings · Azure Neural TTS');
  console.log(`     Region : ${AZURE_REGION}${dryRun ? ' · DRY-RUN' : ''}`);
  console.log(`     Mode   : ${slowMode ? '🐢 SHADOWING (slow)' : 'NORMAL'} · rate=${PROSODY_RATE}`);
  console.log(`     Output : public/audio/${folderName}/`);

  const { entries, tmpDir } = await loadReadings();
  console.log(`     ${entries.length} textes chargés`);

  let filtered = entries;
  if (levelFilter) {
    filtered = filtered.filter((e) => levelFilter.includes(e.cecrLevel.toLowerCase()));
  }
  if (readingFilter) {
    filtered = filtered.filter((e) => readingFilter.includes(e.reading.id));
  }
  if (Number.isFinite(limit)) {
    filtered = filtered.slice(0, limit);
  }
  console.log(`     ${filtered.length} textes à traiter\n`);

  fs.mkdirSync(publicAudioDir, { recursive: true });

  let manifest = {};
  if (fs.existsSync(manifestPath)) {
    try {
      manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    } catch {
      manifest = {};
    }
  }

  let totalGenerated = 0;
  let totalSkipped = 0;
  let totalFailed = 0;

  for (const entry of filtered) {
    const reading = entry.reading;
    const voice = pickVoiceForReading(reading.id);
    const dir = path.join(publicAudioDir, reading.id);
    fs.mkdirSync(dir, { recursive: true });

    console.log(`📝 ${reading.id} (${entry.cecrLevel}) — ${reading.segments.length} segments · ${voice}`);

    const segPaths = [];
    for (let i = 0; i < reading.segments.length; i++) {
      const seg = reading.segments[i];
      const outFile = path.join(dir, `${i}.mp3`);
      // L'URL servie au navigateur doit refléter le dossier réel (folderName)
      // — en mode --slow, on doit générer /audio/readings-slow/... et non
      // /audio/readings/... (sinon le manifest slow pointe vers le normal).
      const urlPath = `/audio/${folderName}/${reading.id}/${i}.mp3`;
      segPaths.push(urlPath);

      if (!force && fs.existsSync(outFile)) {
        totalSkipped++;
        continue;
      }
      if (dryRun) {
        console.log(`     ○ DRY [${i}] ${seg.hanzi.slice(0, 28)}`);
        totalGenerated++;
        continue;
      }

      try {
        const mp3 = await synthesizeWithRetry(seg.hanzi, voice, `${reading.id}#${i}`);
        fs.writeFileSync(outFile, mp3);
        totalGenerated++;
        console.log(`     ✓ [${i}]`);
      } catch (err) {
        totalFailed++;
        console.error(`     ✗ [${i}] — ${err.message}`);
      }
    }

    manifest[reading.id] = {
      voice,
      segments: segPaths
    };
  }

  if (!dryRun) {
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
    console.log(`\n📄 Manifest : ${path.relative(projectRoot, manifestPath)}`);
  }

  console.log(`\nTerminé · générés: ${totalGenerated} · ignorés: ${totalSkipped} · échecs: ${totalFailed}`);

  try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch { /* noop */ }

  if (totalFailed > 0) process.exit(1);
}

main().catch((err) => {
  console.error('Erreur fatale :', err);
  process.exit(1);
});
