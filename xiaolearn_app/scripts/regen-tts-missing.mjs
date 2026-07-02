/**
 * regen-tts-missing.mjs
 * ---------------------
 * Lit la collection Firestore `tts_missing` (peuplée par le fallback Gemini
 * runtime), génère pour chaque entrée un MP3 Azure Neural TTS qualité prod,
 * l'upload dans `public/audio/examples/<hash>.mp3` (et/ou Firebase Storage),
 * puis marque l'entrée comme `resolved: true` dans Firestore.
 *
 * Usage :
 *   firebase login
 *   export AZURE_SPEECH_KEY="..."
 *   export AZURE_SPEECH_REGION="eastus"
 *   node scripts/regen-tts-missing.mjs [--dry-run] [--limit=N]
 *
 * Pré-requis :
 *   - firebase-admin doit pouvoir authentifier (GOOGLE_APPLICATION_CREDENTIALS
 *     pointant vers une service account avec accès au project xiaolearn-db9e6)
 *   - AZURE_SPEECH_KEY + REGION env vars
 *
 * Workflow conseillé :
 *   1. Hebdomadaire : `node scripts/regen-tts-missing.mjs --dry-run`
 *      → liste les hanzi en attente, vérifie qu'aucun ne semble suspect
 *   2. Puis `node scripts/regen-tts-missing.mjs`
 *      → génère + upload + marque resolved
 *   3. Push (les nouveaux MP3 sont dans public/audio/examples/, à committer)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import admin from 'firebase-admin';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const EXAMPLES_DIR = path.join(PROJECT_ROOT, 'public', 'audio', 'examples');

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------
const argv = process.argv.slice(2);
const dryRun = argv.includes('--dry-run');
const limitArg = argv.find((a) => a.startsWith('--limit='))?.slice('--limit='.length);
const LIMIT = limitArg ? parseInt(limitArg, 10) : Infinity;

// ---------------------------------------------------------------------------
// Azure credentials
// ---------------------------------------------------------------------------
const AZURE_KEY = process.env.AZURE_SPEECH_KEY;
const AZURE_REGION = process.env.AZURE_SPEECH_REGION || 'eastus';
if (!AZURE_KEY) {
  console.error('✗ AZURE_SPEECH_KEY manquant. Export-le avant de lancer.');
  process.exit(1);
}

const VOICE = 'zh-CN-XiaoxiaoNeural';
const RATE = '-5%';

// ---------------------------------------------------------------------------
// FNV-1a 32-bit → base36 (identique à src/utils/audio.ts::hashExampleName)
// Sans ça, les MP3 générés ici ne matcheraient pas l'URL calculée côté app.
// ---------------------------------------------------------------------------
function hashExampleName(hanzi) {
  let h = 0x811c9dc5;
  for (let i = 0; i < hanzi.length; i++) {
    h ^= hanzi.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(36);
}

// ---------------------------------------------------------------------------
// Firebase admin init
// ---------------------------------------------------------------------------
admin.initializeApp({
  projectId: process.env.GCLOUD_PROJECT || 'xiaolearn-db9e6'
});
const db = admin.firestore();

// ---------------------------------------------------------------------------
// Azure TTS call
// ---------------------------------------------------------------------------
async function azureTts(text) {
  const ssml = `
    <speak version="1.0" xml:lang="zh-CN">
      <voice name="${VOICE}">
        <prosody rate="${RATE}">${text.replace(/[<>&"']/g, (c) => ({
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    '"': '&quot;',
    "'": '&apos;'
  })[c])}</prosody>
      </voice>
    </speak>`.trim();

  const url = `https://${AZURE_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`;
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': AZURE_KEY,
      'Content-Type': 'application/ssml+xml',
      'X-Microsoft-OutputFormat': 'audio-48khz-96kbitrate-mono-mp3',
      'User-Agent': 'XiaoLearn-regen-tts-missing'
    },
    body: ssml
  });
  if (!resp.ok) {
    const errBody = await resp.text().catch(() => '');
    throw new Error(`Azure TTS ${resp.status}: ${errBody.slice(0, 200)}`);
  }
  const buf = Buffer.from(await resp.arrayBuffer());
  return buf;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log(`🎙️  Régénération Azure des hanzi loggés Gemini${dryRun ? ' · DRY-RUN' : ''}`);
  console.log(`     Region : ${AZURE_REGION}`);
  console.log(`     Voix : ${VOICE}`);
  if (Number.isFinite(LIMIT)) console.log(`     Limite : ${LIMIT}`);
  console.log('');

  // Récupère les entrées non résolues, triées par requestCount desc pour
  // prioriser les hanzi les plus demandés
  const snap = await db
    .collection('tts_missing')
    .where('resolved', '==', false)
    .orderBy('requestCount', 'desc')
    .limit(Number.isFinite(LIMIT) ? LIMIT : 1000)
    .get();

  if (snap.empty) {
    console.log('✓ Aucun hanzi en attente — rien à faire.');
    return;
  }

  console.log(`  📋 ${snap.size} hanzi en attente`);

  fs.mkdirSync(EXAMPLES_DIR, { recursive: true });

  let resolved = 0;
  let skipped = 0;
  let failed = 0;

  for (const docSnap of snap.docs) {
    const data = docSnap.data();
    const hanzi = data.hanzi;
    if (!hanzi || typeof hanzi !== 'string') {
      skipped++;
      continue;
    }
    const hash = hashExampleName(hanzi.trim());
    const outPath = path.join(EXAMPLES_DIR, `${hash}.mp3`);

    // Skip si le fichier existe déjà (un autre run a déjà résolu, ou existait
    // dans la base sans être marqué resolved)
    if (fs.existsSync(outPath)) {
      console.log(`  ⏭  ${hanzi.slice(0, 20)} → déjà sur disque`);
      if (!dryRun) {
        await docSnap.ref.update({
          resolved: true,
          resolvedAt: admin.firestore.FieldValue.serverTimestamp()
        });
      }
      skipped++;
      continue;
    }

    if (dryRun) {
      console.log(`  ○ ${hanzi.slice(0, 30)} → ${path.relative(PROJECT_ROOT, outPath)} (×${data.requestCount ?? 1})`);
      continue;
    }

    try {
      const mp3 = await azureTts(hanzi.trim());
      fs.writeFileSync(outPath, mp3);
      await docSnap.ref.update({
        resolved: true,
        resolvedAt: admin.firestore.FieldValue.serverTimestamp(),
        resolvedFile: path.relative(PROJECT_ROOT, outPath)
      });
      console.log(`  ✓ ${hanzi.slice(0, 30)} → ${hash}.mp3`);
      resolved++;
    } catch (err) {
      console.error(`  ✗ ${hanzi.slice(0, 30)} : ${err.message}`);
      failed++;
    }

    // Petit délai pour ne pas saturer Azure
    await new Promise((r) => setTimeout(r, 80));
  }

  console.log('');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`✅ Terminé : ${resolved} générés, ${skipped} skip (déjà sur disque), ${failed} échecs`);
  if (!dryRun && resolved > 0) {
    console.log('💡 N\'oublie pas de commit + push les nouveaux .mp3 dans public/audio/examples/.');
  }
}

main().catch((err) => {
  console.error('✗ Fatal error:', err);
  process.exit(1);
});
