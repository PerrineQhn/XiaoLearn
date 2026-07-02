/**
 * gen-grammar-audio.mjs
 * ---------------------
 * Génère via Azure Neural TTS les MP3 manquants pour les points de
 * grammaire de XiaoLearn (catalogue GrammarPageV3 = `grammarLessons`).
 *
 * Particulièrement utile pour les STRUCTURES COMPOSÉES où Web Speech
 * était utilisé en fallback :
 *   - 不仅...而且 (bùjǐn... érqiě)
 *   - 由于...因此 (yóuyú... yīncǐ)
 *   - 一边...一边 (yībiān... yībiān)
 *   - 是...的    (shì... de)
 *   - 即使...也  (jíshǐ... yě)
 *
 * Sortie : public/audio/grammar/<safe-hanzi>.mp3
 *   où safe-hanzi = hanzi avec "..." remplacé par "_"
 *   (ex: "不仅...而且" → "不仅_而且.mp3")
 *
 * SSML : on REMPLACE chaque "..." par un break de 400ms pour que la
 * voix marque la pause attendue dans la structure, et on lit chaque
 * partie séparément. C'est plus parlant qu'une lecture cul-sec.
 *
 * Usage :
 *   firebase login
 *   export AZURE_SPEECH_KEY="..."
 *   export AZURE_SPEECH_REGION="francecentral"   # ou la région où ta clé Azure tourne
 *   node scripts/gen-grammar-audio.mjs [--dry-run] [--force] [--limit=N]
 *
 *   --dry-run : liste les fichiers qui seraient générés, sans toucher
 *               à disque ni Azure (consomme 0 caractères TTS)
 *   --force   : régénère même les fichiers déjà présents (utile pour
 *               changer la voix/rate sur tout le catalogue)
 *   --limit=N : limite à N entrées (debug rapide)
 *
 * Coût Azure : Neural TTS = ~15 €/1M caractères payant. Le catalogue
 * complet ≈ 40 points × ~8 chars/structure ≈ 320 chars → totalement
 * couvert par le tier gratuit F0 (0.5 M chars/mois). Réutilisable
 * pour 1500+ runs avant d'épuiser la franchise.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// On lit grammarLessons via tsx — le fichier est en TS et importe d'autres TS.
// On fait du parsing regex direct sur les sources pour rester simple/portable.

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const GRAMMAR_DIR = path.join(PROJECT_ROOT, 'public', 'audio', 'grammar');
const DATA_DIR = path.join(PROJECT_ROOT, 'src', 'data');

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------
const argv = process.argv.slice(2);
const dryRun = argv.includes('--dry-run');
const force = argv.includes('--force');
const clean = argv.includes('--clean');
const limitArg = argv.find((a) => a.startsWith('--limit='))?.slice('--limit='.length);
const LIMIT = limitArg ? parseInt(limitArg, 10) : Infinity;

// ---------------------------------------------------------------------------
// Azure config (laisse les défauts ou exporte tes env vars)
// ---------------------------------------------------------------------------
const AZURE_KEY = process.env.AZURE_SPEECH_KEY;
const AZURE_REGION = process.env.AZURE_SPEECH_REGION || 'francecentral';
const VOICE = process.env.AZURE_TTS_VOICE || 'zh-CN-XiaoxiaoNeural';
const RATE = process.env.AZURE_TTS_RATE || '-5%'; // un poil plus lent pour la péda

if (!AZURE_KEY && !dryRun) {
  console.error('❌ AZURE_SPEECH_KEY non défini. Exporte-le avant de lancer (ou utilise --dry-run pour preview).');
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Slug pour le nom de fichier — remplace "..." par "_" pour rester safe
// sur tous FS et lisible. Doit matcher la convention côté src/utils/audio.ts.
// ---------------------------------------------------------------------------
export function grammarAudioSlug(hanzi) {
  return hanzi
    .replace(/\.{2,}/g, '_')       // ... ou .. ou plus → _
    .replace(/[\\/]/g, '-')        // slashes interdits
    .replace(/\s+/g, '');          // espaces parasites
}

// ---------------------------------------------------------------------------
// Extraction des hanzi de grammarLessons via regex sur src/data/grammar-*.ts
// (Évite d'avoir à compiler/exécuter le TS — robust enough pour un format
// stable de littéraux d'objets.)
// ---------------------------------------------------------------------------
/** True si la chaîne contient au moins UN hanzi CJK Unified Ideograph.
 *  Sinon c'est probablement un libellé descriptif type "Sujet+Verbe"
 *  ou "Structure: ..." — ne pas générer de TTS pour ces entrées. */
function hasRealHanzi(s) {
  return /[一-鿿]/.test(s);
}

function extractGrammarHanzi() {
  const files = fs
    .readdirSync(DATA_DIR)
    .filter((f) => f.startsWith('grammar-lessons') && f.endsWith('.ts'));
  const hanziList = [];
  let skippedNonHanzi = 0;
  for (const f of files) {
    const txt = fs.readFileSync(path.join(DATA_DIR, f), 'utf8');
    // Match `hanzi: '...'` ou `hanzi: "..."`
    const re = /\bhanzi:\s*(['"])([^'"]+)\1/g;
    let m;
    while ((m = re.exec(txt)) !== null) {
      const h = m[2].trim();
      if (!h) continue;
      if (!hasRealHanzi(h)) {
        skippedNonHanzi++;
        continue;
      }
      if (!hanziList.includes(h)) hanziList.push(h);
    }
  }
  if (skippedNonHanzi > 0) {
    console.log(`ℹ️  ${skippedNonHanzi} entrée(s) skippée(s) (pas de hanzi CJK : libellés descriptifs type "Sujet+Verbe")`);
  }
  return hanziList;
}

// ---------------------------------------------------------------------------
// Convertit "不仅...而且" en SSML avec pause au milieu des "..."
// Chaque "..." devient un <break time="400ms"/>.
// ---------------------------------------------------------------------------
function hanziToSsml(hanzi) {
  const escaped = (s) =>
    s.replace(/[<>&"']/g, (c) =>
      ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[c]
    );
  // Découpe sur "..." (suite de 2+ points)
  const parts = hanzi.split(/\.{2,}/);
  const body = parts
    .map((p) => `<prosody rate="${RATE}">${escaped(p)}</prosody>`)
    .join('<break time="400ms"/>');
  return `
    <speak version="1.0" xml:lang="zh-CN">
      <voice name="${VOICE}">${body}</voice>
    </speak>`.trim();
}

// ---------------------------------------------------------------------------
// Azure TTS REST call
// ---------------------------------------------------------------------------
async function azureTts(hanzi) {
  const ssml = hanziToSsml(hanzi);
  const url = `https://${AZURE_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`;
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': AZURE_KEY,
      'Content-Type': 'application/ssml+xml',
      'X-Microsoft-OutputFormat': 'audio-48khz-96kbitrate-mono-mp3',
      'User-Agent': 'XiaoLearn-gen-grammar-audio'
    },
    body: ssml
  });
  if (!resp.ok) {
    const errBody = await resp.text().catch(() => '');
    throw new Error(`Azure TTS ${resp.status}: ${errBody.slice(0, 200)}`);
  }
  return Buffer.from(await resp.arrayBuffer());
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log(`🎙️  Génération MP3 grammaire${dryRun ? ' · DRY-RUN' : ''}`);
  console.log(`     Region : ${AZURE_REGION}`);
  console.log(`     Voix   : ${VOICE}`);
  console.log(`     Sortie : ${path.relative(PROJECT_ROOT, GRAMMAR_DIR)}/`);
  if (Number.isFinite(LIMIT)) console.log(`     Limite : ${LIMIT}`);
  console.log('');

  const hanziList = extractGrammarHanzi();
  console.log(`📋 ${hanziList.length} hanzi grammaire détectés dans src/data/grammar-lessons*.ts`);

  fs.mkdirSync(GRAMMAR_DIR, { recursive: true });

  // Mode --clean : supprime les MP3 dont le nom de fichier n'a aucun hanzi CJK
  // (générés à tort sur d'anciens libellés descriptifs type "Sujet+Verbe").
  if (clean) {
    const existing = fs.readdirSync(GRAMMAR_DIR).filter((f) => /\.(mp3|wav)$/i.test(f));
    let removed = 0;
    for (const file of existing) {
      const base = file.replace(/\.(mp3|wav)$/i, '');
      // On "dé-slugifie" en remplaçant _ par "..." pour comparer au hanzi original.
      // Mais le check simple : si pas de hanzi CJK dans le nom, on supprime.
      if (!hasRealHanzi(base)) {
        if (dryRun) {
          console.log(`  🗑  ${file} (orphelin, sans hanzi CJK)`);
        } else {
          try {
            fs.unlinkSync(path.join(GRAMMAR_DIR, file));
            console.log(`  🗑  ${file} supprimé`);
          } catch (err) {
            console.error(`  ✗ Impossible de supprimer ${file}: ${err.message}`);
          }
        }
        removed++;
      }
    }
    console.log(`\n🧹 ${removed} fichier(s) orphelin(s) ${dryRun ? 'détecté(s)' : 'supprimé(s)'}`);
    console.log('');
  }

  let generated = 0;
  let skipped = 0;
  let failed = 0;
  let totalChars = 0;

  for (const hanzi of hanziList.slice(0, LIMIT)) {
    const slug = grammarAudioSlug(hanzi);
    const outPath = path.join(GRAMMAR_DIR, `${slug}.mp3`);
    const relPath = path.relative(PROJECT_ROOT, outPath);

    if (!force && fs.existsSync(outPath)) {
      console.log(`  ⏭  ${hanzi} → ${relPath} (déjà présent)`);
      skipped++;
      continue;
    }

    totalChars += hanzi.replace(/\.{2,}/g, '').length;

    if (dryRun) {
      console.log(`  ○ ${hanzi} → ${relPath}`);
      continue;
    }

    try {
      const mp3 = await azureTts(hanzi);
      fs.writeFileSync(outPath, mp3);
      console.log(`  ✓ ${hanzi} → ${relPath} (${(mp3.length / 1024).toFixed(1)} KB)`);
      generated++;
      // Petite pause pour rester poli avec le rate limit Azure F0
      await new Promise((r) => setTimeout(r, 80));
    } catch (err) {
      console.error(`  ✗ ${hanzi} → ${err.message?.split('\n')[0] ?? err}`);
      failed++;
    }
  }

  console.log('');
  console.log(`Résumé :`);
  console.log(`  ✓ Générés  : ${generated}`);
  console.log(`  ⏭  Skippés  : ${skipped}`);
  console.log(`  ✗ Échoués  : ${failed}`);
  console.log(`  ≈ Chars TTS facturables : ${totalChars} (~${(totalChars * 0.000015).toFixed(4)} € au S1, gratuit en F0)`);
}

main().catch((err) => {
  console.error('💥', err);
  process.exit(1);
});
