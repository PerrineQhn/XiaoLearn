/**
 * generate-dialogue-audio.mjs
 * --------------------------
 * Génère une piste MP3 par réplique de chaque dialogue de XiaoLearn, en
 * utilisant Azure Neural TTS avec une voix différente par personnage.
 * Émet également un manifest JSON consommé par DialoguePlayer pour jouer
 * les pistes pré-doublées (fallback → Web Speech API côté navigateur).
 *
 * Usage :
 *   AZURE_SPEECH_KEY=xxx AZURE_SPEECH_REGION=eastus \
 *     node scripts/generate-dialogue-audio.mjs [options]
 *
 * Options :
 *   --force           : regénère tous les MP3 même s'ils existent déjà
 *   --level=a1,a2     : filtre par niveaux CECR (séparés par virgules)
 *   --limit=N         : ne traite que les N premiers dialogues (après tri)
 *   --dialogue=id1,…  : filtre par identifiants de dialogue
 *   --dry-run         : liste ce qui serait généré, n'appelle pas Azure
 *
 * Pré-requis : créer une ressource Azure Speech (Cognitive Services)
 *   https://portal.azure.com → "Speech" → créer la ressource
 *   Récupérer KEY1 et la région (ex: eastus, westeurope).
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import ts from 'typescript';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const publicAudioDir = path.join(projectRoot, 'public', 'audio', 'dialogues');
const manifestPath = path.join(publicAudioDir, 'manifest.json');

// ---------------------------------------------------------------------------
// CLI parsing
// ---------------------------------------------------------------------------
const argv = process.argv.slice(2);
const force = argv.includes('--force');
const dryRun = argv.includes('--dry-run');

function parseFlag(prefix) {
  const raw = argv.find((a) => a.startsWith(prefix));
  if (!raw) return null;
  return raw.slice(prefix.length);
}

const levelFilter = parseFlag('--level=')?.split(',').map((s) => s.trim().toLowerCase()) ?? null;
const dialogueFilter = parseFlag('--dialogue=')?.split(',').map((s) => s.trim()) ?? null;
const limitFlag = parseFlag('--limit=');
const limit = limitFlag ? Math.max(1, parseInt(limitFlag, 10) || 0) : Infinity;

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
// Pool de voix Azure Neural zh-CN
// ---------------------------------------------------------------------------
// Sélection variée : alternance F/M, jeune/adulte, timbres distincts.
const VOICE_POOL = [
  'zh-CN-XiaoxiaoNeural',   // F - jeune, chaleureuse (défaut)
  'zh-CN-YunxiNeural',      // M - jeune
  'zh-CN-XiaoyiNeural',     // F - jeune, expressive
  'zh-CN-YunjianNeural',    // M - adulte
  'zh-CN-XiaohanNeural',    // F - adulte
  'zh-CN-YunyangNeural',    // M - présentateur
  'zh-CN-XiaomoNeural',     // F - polyvalente
  'zh-CN-YunfengNeural',    // M - adulte, grave
  'zh-CN-XiaoqiuNeural',    // F - âgée
  'zh-CN-XiaoshuangNeural'  // F - enfant
];

// Indices : nom du personnage (chinois ou rôle) → voix préférée.
// Utile pour associer "老师" à une voix adulte chaleureuse, etc.
const SPEAKER_HINTS = {
  '老师': 'zh-CN-XiaohanNeural',
  '学生': 'zh-CN-YunxiNeural',
  '服务员': 'zh-CN-XiaoyiNeural',
  '客人': 'zh-CN-YunjianNeural',
  '顾客': 'zh-CN-YunjianNeural',
  '爸爸': 'zh-CN-YunjianNeural',
  '父亲': 'zh-CN-YunjianNeural',
  '妈妈': 'zh-CN-XiaohanNeural',
  '母亲': 'zh-CN-XiaohanNeural',
  '奶奶': 'zh-CN-XiaoqiuNeural',
  '爷爷': 'zh-CN-YunfengNeural',
  '孩子': 'zh-CN-XiaoshuangNeural',
  '小孩': 'zh-CN-XiaoshuangNeural',
  '儿子': 'zh-CN-YunxiNeural',
  '女儿': 'zh-CN-XiaoyiNeural',
  '朋友': 'zh-CN-YunxiNeural',
  '医生': 'zh-CN-XiaohanNeural',
  '病人': 'zh-CN-YunjianNeural'
};

/**
 * Assigne une voix unique à chaque personnage d'un dialogue.
 *   1) Respecte l'indice SPEAKER_HINTS si disponible et pas déjà pris.
 *   2) Sinon, distribue les voix du pool en round-robin (sans doublon tant
 *      qu'il reste des voix disponibles).
 */
function pickVoicesForDialogue(speakers) {
  const out = new Map();
  const used = new Set();
  let cursor = 0;

  // Première passe : respecter les hints.
  for (const speaker of speakers) {
    const hint = SPEAKER_HINTS[speaker];
    if (hint && !used.has(hint)) {
      out.set(speaker, hint);
      used.add(hint);
    }
  }
  // Deuxième passe : combler avec le pool.
  for (const speaker of speakers) {
    if (out.has(speaker)) continue;
    let guard = 0;
    while (used.size < VOICE_POOL.length && used.has(VOICE_POOL[cursor % VOICE_POOL.length])) {
      cursor++;
      if (++guard > VOICE_POOL.length * 2) break;
    }
    const picked = VOICE_POOL[cursor % VOICE_POOL.length];
    out.set(speaker, picked);
    used.add(picked);
    cursor++;
  }
  return out;
}

// ---------------------------------------------------------------------------
// Chargement des dialogues via le compilateur TypeScript
// ---------------------------------------------------------------------------
// On compile à la volée dialogues.ts + son unique import valeur
// cecr-b2-texts.ts dans un tmpdir, puis on fait un dynamic import.
async function loadDialogues() {
  const dialoguesTs = path.join(projectRoot, 'src/data/dialogues.ts');
  const cecrB2Ts = path.join(projectRoot, 'src/data/cecr-b2-texts.ts');

  // On utilise un cache local au projet (au lieu d'os.tmpdir) : certaines
  // sandboxes n'autorisent pas l'import ESM depuis /tmp.
  const tmpDir = path.join(__dirname, '.cache-dialogue-audio');
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

  // cecr-b2-texts.ts → compilé en premier (dialogues.ts en dépend).
  const cecrOutPath = path.join(tmpDir, 'cecr-b2-texts.mjs');
  fs.writeFileSync(cecrOutPath, compile(cecrB2Ts));

  // dialogues.ts : on re-route l'import relatif './cecr-b2-texts' vers le .mjs tmp.
  let dialoguesJs = compile(dialoguesTs);
  dialoguesJs = dialoguesJs.replace(
    /from\s+['"]\.\/cecr-b2-texts['"]/g,
    `from './cecr-b2-texts.mjs'`
  );
  const dialoguesOutPath = path.join(tmpDir, 'dialogues.mjs');
  fs.writeFileSync(dialoguesOutPath, dialoguesJs);

  const mod = await import(pathToFileURL(dialoguesOutPath).href);
  return { entries: mod.dialogues, tmpDir };
}

// ---------------------------------------------------------------------------
// Azure REST call
// ---------------------------------------------------------------------------
function escapeXml(s) {
  return s.replace(/[<>&'"]/g, (c) => (
    { '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]
  ));
}

function buildSsml(text, voiceName) {
  return [
    '<speak version="1.0" xml:lang="zh-CN" xmlns:mstts="https://www.w3.org/2001/mstts">',
    `  <voice name="${voiceName}">`,
    `    <prosody rate="-8%">${escapeXml(text)}</prosody>`,
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

// Simple retry wrapper (3 tentatives, backoff linéaire).
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
  console.log('🎙️  Génération audio dialogues · Azure Neural TTS');
  console.log(`     Region : ${AZURE_REGION}${dryRun ? ' · DRY-RUN' : ''}`);

  const { entries, tmpDir } = await loadDialogues();
  console.log(`     ${entries.length} dialogues chargés`);

  let filtered = entries;
  if (levelFilter) {
    filtered = filtered.filter((e) => levelFilter.includes(e.cecrLevel.toLowerCase()));
  }
  if (dialogueFilter) {
    filtered = filtered.filter((e) => dialogueFilter.includes(e.dialogue.id));
  }
  if (Number.isFinite(limit)) {
    filtered = filtered.slice(0, limit);
  }
  console.log(`     ${filtered.length} dialogues à traiter\n`);

  fs.mkdirSync(publicAudioDir, { recursive: true });

  // Charger le manifest existant pour conserver les entrées non-regénérées.
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
    const dlg = entry.dialogue;
    const speakers = [];
    for (const line of dlg.lines) {
      if (!speakers.includes(line.speaker)) speakers.push(line.speaker);
    }
    const voiceMap = pickVoicesForDialogue(speakers);
    const dlgDir = path.join(publicAudioDir, dlg.id);
    fs.mkdirSync(dlgDir, { recursive: true });

    console.log(`📝 ${dlg.id} (${entry.cecrLevel}) — ${dlg.lines.length} répliques`);
    for (const [sp, v] of voiceMap.entries()) {
      console.log(`     • ${sp} → ${v}`);
    }

    const linePaths = [];
    for (let i = 0; i < dlg.lines.length; i++) {
      const line = dlg.lines[i];
      const outFile = path.join(dlgDir, `${i}.mp3`);
      const urlPath = `/audio/dialogues/${dlg.id}/${i}.mp3`;
      linePaths.push(urlPath);

      if (!force && fs.existsSync(outFile)) {
        totalSkipped++;
        continue;
      }
      if (dryRun) {
        console.log(`     ○ DRY [${i}] ${line.speaker} : ${line.hanzi.slice(0, 24)}`);
        totalGenerated++;
        continue;
      }

      const voice = voiceMap.get(line.speaker);
      try {
        const mp3 = await synthesizeWithRetry(line.hanzi, voice, `${dlg.id}#${i}`);
        fs.writeFileSync(outFile, mp3);
        totalGenerated++;
        console.log(`     ✓ [${i}] ${line.speaker} (${voice})`);
      } catch (err) {
        totalFailed++;
        console.error(`     ✗ [${i}] ${line.speaker} — ${err.message}`);
      }
    }

    manifest[dlg.id] = {
      voices: Object.fromEntries(voiceMap.entries()),
      lines: linePaths
    };
  }

  if (!dryRun) {
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
    console.log(`\n📄 Manifest : ${path.relative(projectRoot, manifestPath)}`);
  }

  console.log(`\nTerminé · générés: ${totalGenerated} · ignorés: ${totalSkipped} · échecs: ${totalFailed}`);

  // Nettoyage du tmp
  try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch { /* noop */ }

  if (totalFailed > 0) process.exit(1);
}

main().catch((err) => {
  console.error('Erreur fatale :', err);
  process.exit(1);
});
