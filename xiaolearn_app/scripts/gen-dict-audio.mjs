/**
 * gen-dict-audio.mjs
 * ------------------
 * Génère les MP3 manquants pour les entrées du dictionnaire CFDICT :
 *   - HSK1→HSK7 : depuis `public/data/dictionary/hsk/{level}/chunk-NNN.json`
 *     → `public/audio/hsk{N}/hsk{N}_{hanzi}.mp3` (convention historique)
 *   - Hors-HSK   : depuis `public/data/hors-hsk/chunk-NNN.json`
 *     → `public/audio/hors-hsk/hors-hsk_{hanzi}.mp3`
 *   - Exemples   : `public/audio/examples/{hash}.mp3` (hash FNV-1a 32-bit
 *     identique à src/utils/audio.ts → hashExampleName)
 *
 * Pensé pour le tier Azure F0 GRATUIT :
 *   - 0,5 M caractères / mois
 *   - 20 requêtes / 60 s (rate limit strict → pause par défaut 3,1 s)
 *   - Resume automatique (skip si fichier déjà présent)
 *   - --plan pour estimer sans appeler Azure
 *
 * Usage :
 *   export AZURE_SPEECH_KEY="..."
 *   export AZURE_SPEECH_REGION="westeurope"
 *   node scripts/gen-dict-audio.mjs --plan                           # audit + estimation
 *   node scripts/gen-dict-audio.mjs --target=hsk --limit=100         # batch HSK
 *   node scripts/gen-dict-audio.mjs --target=hors-hsk --limit=2000   # batch hors-HSK
 *   node scripts/gen-dict-audio.mjs --target=examples --limit=500    # exemples
 *   node scripts/gen-dict-audio.mjs --target=all --limit=10 --dry-run
 *
 * Flags :
 *   --plan          : audit complet (chars manquants, mois F0 nécessaires)
 *                     → n'appelle pas Azure, ne touche pas au disque
 *   --target=X      : 'hsk' | 'hors-hsk' | 'examples' | 'all' (défaut all)
 *   --limit=N       : ne génère que N fichiers max (utile pour étaler sur
 *                     plusieurs jours sans saturer le rate limit ou le quota)
 *   --dry-run       : log ce qui serait fait, n'appelle pas Azure
 *   --force         : ignore les fichiers existants, régénère
 *   --tier=f0|s0    : ⚠️ change UNIQUEMENT la cadence du script, PAS le SKU
 *                     Azure. F0 = pause 3.1s entre req (compatible quota
 *                     gratuit), S0 = pause 80ms (compatible burst payant).
 *                     Pour passer réellement en facturation S0, changer
 *                     manuellement le tier dans Azure Portal → xiaolearn-tts
 *                     → Niveau tarifaire → S0 (propagation 2-5 min).
 *   --voice=NAME    : voix Azure (défaut zh-CN-XiaoxiaoNeural)
 *
 * Conseil F0 : 0,5 M chars/mois suffit pour les hanzi seuls (~295k chars),
 * mais à 20 req/min = ~91h non-stop pour 109k requêtes. Lance par batchs
 * incrémentaux avec --limit=2000 et reprends le lendemain (le skip auto
 * évite de regénérer).
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const DICT_DIR = path.join(PROJECT_ROOT, 'public', 'data', 'dictionary', 'hsk');
const HORS_HSK_DIR = path.join(PROJECT_ROOT, 'public', 'data', 'hors-hsk');
const AUDIO_DIR = path.join(PROJECT_ROOT, 'public', 'audio');

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------
const argv = process.argv.slice(2);
const hasFlag = (name) => argv.includes(`--${name}`);
const getFlagValue = (name) => {
  const found = argv.find((a) => a.startsWith(`--${name}=`));
  return found ? found.slice(`--${name}=`.length) : null;
};

const planOnly = hasFlag('plan');
const dryRun = hasFlag('dry-run') || planOnly;
const force = hasFlag('force');
const target = getFlagValue('target') || 'all';
const limitArg = getFlagValue('limit');
const LIMIT = limitArg ? parseInt(limitArg, 10) : Infinity;
const tier = getFlagValue('tier') || 'f0';
const PAUSE_MS = tier === 's0' ? 80 : 3100;

// ---------------------------------------------------------------------------
// Azure config
// ---------------------------------------------------------------------------
const AZURE_KEY = process.env.AZURE_SPEECH_KEY;
const AZURE_REGION = process.env.AZURE_SPEECH_REGION || 'westeurope';
const VOICE = getFlagValue('voice') || 'zh-CN-XiaoxiaoNeural';
const RATE = process.env.AZURE_TTS_RATE || '-5%';

if (!AZURE_KEY && !dryRun) {
  console.error('❌ AZURE_SPEECH_KEY non défini. Exporte-le ou utilise --plan / --dry-run.');
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const hasRealHanzi = (s) => /[一-鿿]/.test(s);

/** Hash FNV-1a 32-bit → base36, identique à src/utils/audio.ts. */
function hashExampleName(hanzi) {
  let h = 0x811c9dc5;
  for (let i = 0; i < hanzi.length; i++) {
    h ^= hanzi.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(36);
}

function sanitizeFilenameHanzi(hanzi) {
  return hanzi.replace(/[\\/]/g, '-').replace(/\s+/g, '').trim();
}

function escapeXml(s) {
  return s.replace(/[<>&"']/g, (c) =>
    ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[c]
  );
}

function buildSsml(text) {
  return `<speak version="1.0" xml:lang="zh-CN"><voice name="${VOICE}"><prosody rate="${RATE}">${escapeXml(text)}</prosody></voice></speak>`;
}

async function azureTts(text) {
  const url = `https://${AZURE_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`;
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': AZURE_KEY,
      'Content-Type': 'application/ssml+xml',
      'X-Microsoft-OutputFormat': 'audio-48khz-96kbitrate-mono-mp3',
      'User-Agent': 'XiaoLearn-gen-dict-audio'
    },
    body: buildSsml(text)
  });
  if (!resp.ok) {
    const errBody = await resp.text().catch(() => '');
    throw new Error(`Azure TTS ${resp.status}: ${errBody.slice(0, 200)}`);
  }
  return Buffer.from(await resp.arrayBuffer());
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------------------------------------------------------------------------
// Collecte des jobs (un job = { text, outPath, category })
// ---------------------------------------------------------------------------
function collectHskJobs() {
  const jobs = [];
  const levels = ['hsk1', 'hsk2', 'hsk3', 'hsk4', 'hsk5', 'hsk6', 'hsk7'];
  for (const level of levels) {
    const dir = path.join(DICT_DIR, level);
    if (!fs.existsSync(dir)) continue;
    const chunks = fs
      .readdirSync(dir)
      .filter((f) => f.startsWith('chunk-') && f.endsWith('.json'))
      .sort();
    for (const chunk of chunks) {
      const data = JSON.parse(fs.readFileSync(path.join(dir, chunk), 'utf8'));
      for (const entry of Object.values(data)) {
        const hanzi = entry.hanzi;
        if (!hanzi || !hasRealHanzi(hanzi)) continue;
        // Convention historique : public/audio/hsk{N}/hsk{N}_{hanzi}.mp3
        const fname = `${level}_${sanitizeFilenameHanzi(hanzi)}.mp3`;
        const outPath = path.join(AUDIO_DIR, level, fname);
        jobs.push({ text: hanzi, outPath, category: 'hsk' });
      }
    }
  }
  return jobs;
}

function collectHorsHskJobs() {
  const jobs = [];
  if (!fs.existsSync(HORS_HSK_DIR)) return jobs;
  const chunks = fs
    .readdirSync(HORS_HSK_DIR)
    .filter((f) => f.startsWith('chunk-') && f.endsWith('.json'))
    .sort();
  for (const chunk of chunks) {
    const data = JSON.parse(fs.readFileSync(path.join(HORS_HSK_DIR, chunk), 'utf8'));
    for (const entry of data) {
      const hanzi = entry.hanzi;
      if (!hanzi || !hasRealHanzi(hanzi)) continue;
      // Nouveau dossier dédié : public/audio/hors-hsk/hors-hsk_{hanzi}.mp3
      // À mapper côté audio.ts en ajoutant la convention si le hanzi n'est
      // pas trouvé dans les HSK.
      const fname = `hors-hsk_${sanitizeFilenameHanzi(hanzi)}.mp3`;
      const outPath = path.join(AUDIO_DIR, 'hors-hsk', fname);
      jobs.push({ text: hanzi, outPath, category: 'hors-hsk' });
    }
  }
  return jobs;
}

function collectExampleJobs() {
  const jobs = [];
  const seen = new Set();
  const pushExample = (chinese) => {
    const clean = (chinese ?? '').replace(/\d+$/, '').trim();
    if (!clean || clean.length < 2) return; // single chars couverts par hsk
    if (!hasRealHanzi(clean)) return;
    if (seen.has(clean)) return;
    seen.add(clean);
    const hash = hashExampleName(clean);
    const outPath = path.join(AUDIO_DIR, 'examples', `${hash}.mp3`);
    jobs.push({ text: clean, outPath, category: 'examples' });
  };

  // HSK examples
  const levels = ['hsk1', 'hsk2', 'hsk3', 'hsk4', 'hsk5', 'hsk6', 'hsk7'];
  for (const level of levels) {
    const dir = path.join(DICT_DIR, level);
    if (!fs.existsSync(dir)) continue;
    const chunks = fs
      .readdirSync(dir)
      .filter((f) => f.startsWith('chunk-') && f.endsWith('.json'))
      .sort();
    for (const chunk of chunks) {
      const data = JSON.parse(fs.readFileSync(path.join(dir, chunk), 'utf8'));
      for (const entry of Object.values(data)) {
        for (const ex of entry.examples ?? []) {
          pushExample(ex.chinese);
        }
      }
    }
  }
  // Hors-HSK examples
  if (fs.existsSync(HORS_HSK_DIR)) {
    const chunks = fs
      .readdirSync(HORS_HSK_DIR)
      .filter((f) => f.startsWith('chunk-') && f.endsWith('.json'))
      .sort();
    for (const chunk of chunks) {
      const data = JSON.parse(fs.readFileSync(path.join(HORS_HSK_DIR, chunk), 'utf8'));
      for (const entry of data) {
        for (const ex of entry.examples ?? []) {
          pushExample(ex.chinese);
        }
      }
    }
  }
  return jobs;
}

// ---------------------------------------------------------------------------
// Audit / plan
// ---------------------------------------------------------------------------
function categorizeJobs(jobs) {
  const missing = [];
  const existing = [];
  for (const j of jobs) {
    if (fs.existsSync(j.outPath)) existing.push(j);
    else missing.push(j);
  }
  return { missing, existing };
}

function reportSection(name, jobs) {
  const { missing, existing } = categorizeJobs(jobs);
  const chars = missing.reduce((s, j) => s + j.text.length, 0);
  console.log(`  ${name}`);
  console.log(`    Total            : ${jobs.length}`);
  console.log(`    Déjà présents    : ${existing.length}`);
  console.log(`    À générer        : ${missing.length}`);
  console.log(`    Caractères TTS   : ${chars}`);
  console.log(`    F0 quota mensuel : ${(chars / 500_000 * 100).toFixed(1)}%`);
  return { missing, existing, chars };
}

// ---------------------------------------------------------------------------
// Quota pre-flight check
// ---------------------------------------------------------------------------
/**
 * Envoie une mini-requête (2 caractères, ~9 octets de SSML facturables) pour
 * tester si le quota Azure est dispo. Évite de lancer une session de 12h pour
 * découvrir au bout de 30 secondes qu'on est encore throttled.
 *
 * Retourne :
 *   - { ok: true }                 si HTTP 200
 *   - { ok: false, status: 429 }   si throttled (quota / rate limit)
 *   - { ok: false, status: 4xx }   si problème clé/permissions
 *   - { ok: false, status: null }  si erreur réseau
 *
 * En --dry-run / --plan on saute ce check (pas d'appel Azure du tout).
 */
async function quotaPreflight() {
  if (dryRun) return { ok: true };
  const url = `https://${AZURE_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`;
  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': AZURE_KEY,
        'Content-Type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat': 'audio-48khz-96kbitrate-mono-mp3',
        'User-Agent': 'XiaoLearn-gen-dict-audio-preflight'
      },
      body: `<speak version="1.0" xml:lang="zh-CN"><voice name="${VOICE}">测试</voice></speak>`
    });
    return { ok: resp.ok, status: resp.status };
  } catch (err) {
    return { ok: false, status: null, error: err.message };
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log(`🔊 Audit dictionary audio${planOnly ? ' (plan)' : dryRun ? ' (dry-run)' : ''}`);
  console.log(`   Region: ${AZURE_REGION} | Voice: ${VOICE} | Cadence: ${tier.toUpperCase()} | Pause: ${PAUSE_MS}ms`);
  if (tier === 's0') {
    console.log(`   ⚠ --tier=s0 = cadence rapide. Le SKU Azure doit AUSSI être passé`);
    console.log(`     en S0 manuellement (Portal → xiaolearn-tts → Niveau tarifaire),`);
    console.log(`     sinon Azure renverra 429 sur les bursts au-delà de 20 req/60s.`);
  }
  console.log('');

  // Pre-flight : on teste UNE seule requête de 2 chars (测试) avant de lancer
  // le batch. Skipé en --plan et --dry-run (pas d'appel Azure).
  if (!planOnly && !dryRun) {
    process.stdout.write('🚦 Test de quota Azure… ');
    const pre = await quotaPreflight();
    if (pre.ok) {
      console.log('✅ OK, on peut continuer.');
    } else if (pre.status === 429) {
      console.log('🛑 429 Quota Exceeded.');
      console.error(
        '\n  Le quota F0 est encore throttled. Réessaie dans quelques heures.\n' +
          '  Reset typique :\n' +
          '    - Cap horaire/journalier : entre 3 h et 24 h\n' +
          '    - Cap mensuel des 500k chars : 1er du mois prochain à 00:00 UTC\n' +
          '\n  Tu peux refaire le test seul avec :\n' +
          '    node scripts/gen-dict-audio.mjs --plan       # gratuit, montre l\'état\n' +
          '    node scripts/gen-dict-audio.mjs --limit=1    # essai 1 fichier\n'
      );
      process.exit(2);
    } else if (pre.status === 401 || pre.status === 403) {
      console.log(`🛑 HTTP ${pre.status}.`);
      console.error(
        `\n  Problème d'authentification : la clé AZURE_SPEECH_KEY est invalide,\n` +
          `  régénérée, ou la ressource a changé de SKU sans propager la clé.\n` +
          `  Vérifie sur Azure Portal → xiaolearn-tts → Clés et endpoint.\n`
      );
      process.exit(3);
    } else if (pre.status === null) {
      console.log('🛑 erreur réseau.');
      console.error(`\n  ${pre.error || 'Réseau indisponible'}. Vérifie ta connexion.\n`);
      process.exit(4);
    } else {
      console.log(`⚠️  HTTP ${pre.status} (non-200, mais pas 429). On continue prudemment.`);
    }
    console.log('');
  }

  const sections = {};
  if (target === 'hsk' || target === 'all') {
    console.log('📚 HSK 1→7 (entrées principales)');
    sections.hsk = reportSection('HSK', collectHskJobs());
    console.log('');
  }
  if (target === 'hors-hsk' || target === 'all') {
    console.log('📖 Hors-HSK (CFDICT)');
    sections['hors-hsk'] = reportSection('Hors-HSK', collectHorsHskJobs());
    console.log('');
  }
  if (target === 'examples' || target === 'all') {
    console.log('💬 Exemples (phrases ≥ 2 caractères)');
    sections.examples = reportSection('Examples', collectExampleJobs());
    console.log('');
  }

  const allMissing = Object.values(sections).flatMap((s) => s.missing);
  const totalChars = allMissing.reduce((s, j) => s + j.text.length, 0);

  console.log('—'.repeat(60));
  console.log(`📊 Total manquant         : ${allMissing.length} fichiers`);
  console.log(`📊 Caractères TTS total   : ${totalChars}`);
  console.log(`📊 % du quota F0 mensuel  : ${(totalChars / 500_000 * 100).toFixed(1)}%`);
  if (tier === 'f0') {
    const durationSec = allMissing.length * (PAUSE_MS / 1000);
    const hours = Math.floor(durationSec / 3600);
    const minutes = Math.floor((durationSec % 3600) / 60);
    console.log(`⏱  Durée estimée (F0)     : ${hours}h ${minutes}min`);
  }
  console.log('');

  if (planOnly) {
    console.log('✓ Plan terminé. Relance sans --plan pour générer.');
    return;
  }

  if (allMissing.length === 0) {
    console.log('✓ Aucun fichier manquant — tout est déjà généré.');
    return;
  }

  // Prépare les dossiers de sortie
  const dirsToEnsure = new Set(allMissing.map((j) => path.dirname(j.outPath)));
  for (const d of dirsToEnsure) fs.mkdirSync(d, { recursive: true });

  // Cap par --limit
  const toProcess = allMissing.slice(0, LIMIT);
  console.log(`▶ Génération de ${toProcess.length}/${allMissing.length} fichier(s)…`);
  console.log('');

  let generated = 0;
  let failed = 0;
  let usedChars = 0;
  const t0 = Date.now();

  for (let i = 0; i < toProcess.length; i++) {
    const job = toProcess[i];
    const rel = path.relative(PROJECT_ROOT, job.outPath);

    if (!force && fs.existsSync(job.outPath)) {
      // Cas course-condition : un autre process a créé le fichier entre-temps
      continue;
    }

    if (dryRun) {
      console.log(`  ○ [${i + 1}/${toProcess.length}] ${job.category}: ${job.text} → ${rel}`);
      continue;
    }

    try {
      const mp3 = await azureTts(job.text);
      fs.writeFileSync(job.outPath, mp3);
      usedChars += job.text.length;
      generated++;
      const remaining = toProcess.length - i - 1;
      const etaSec = Math.round(remaining * (PAUSE_MS / 1000));
      const etaMin = Math.floor(etaSec / 60);
      const pct = (((i + 1) / toProcess.length) * 100).toFixed(1);
      console.log(
        `  ✓ [${i + 1}/${toProcess.length} ${pct}%] ${job.text} → ${rel} (${(mp3.length / 1024).toFixed(1)}KB, ETA ${etaMin}min)`
      );
      if (i < toProcess.length - 1) await sleep(PAUSE_MS);
    } catch (err) {
      failed++;
      const msg = err.message?.split('\n')[0] ?? String(err);
      console.error(`  ✗ ${job.text}: ${msg}`);
      // Si on tape un 429 / 401 répété, on s'arrête pour pas brûler le retry
      if (msg.includes('429') || msg.includes('401') || msg.includes('403')) {
        console.error('  ⛔ Erreur Azure persistante — arrêt préventif. Relance plus tard.');
        break;
      }
      // Pause un peu plus longue avant le suivant si on échoue
      await sleep(PAUSE_MS * 2);
    }
  }

  const durMin = Math.round((Date.now() - t0) / 60000);
  console.log('');
  console.log(`Résumé :`);
  console.log(`  ✓ Générés       : ${generated}`);
  console.log(`  ✗ Échoués       : ${failed}`);
  console.log(`  ≈ Chars consommés: ${usedChars} (${((usedChars / 500_000) * 100).toFixed(2)}% du quota F0 mensuel)`);
  console.log(`  ⏱  Durée totale  : ${durMin}min`);
  if (allMissing.length > toProcess.length) {
    console.log(`  📌 ${allMissing.length - toProcess.length} fichier(s) restants — relance avec --limit pour continuer.`);
  }
}

main().catch((err) => {
  console.error('💥', err);
  process.exit(1);
});
