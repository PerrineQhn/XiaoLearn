/**
 * json-wav-to-mp3.mjs
 * --------------------
 * Réécrit les liens `audio: "audio/hskN/hskN_<hanzi>.wav"` en `.mp3` dans tous
 * les `data/hsk{1..7}.json` (et `data/hsk*.json` de manière plus large).
 *
 * À lancer APRÈS `wav-to-azure-mp3.mjs` qui aura généré les .mp3 Azure
 * correspondants. Par défaut, ne remplace que si le .mp3 existe sur disque
 * (sécurité — on ne casse pas un lien qui marchait). Avec `--force`, remplace
 * tous les .wav par .mp3 sans vérifier (utile si tu sais que tous les .mp3
 * sont déjà sur Firebase Storage / dans public/audio/).
 *
 * Usage :
 *   node scripts/json-wav-to-mp3.mjs                # safe: verify mp3 exists
 *   node scripts/json-wav-to-mp3.mjs --force        # rewrite all .wav → .mp3
 *   node scripts/json-wav-to-mp3.mjs --dry-run      # show changes without writing
 *   node scripts/json-wav-to-mp3.mjs --pattern=hsk1 # only hsk1.json
 *
 * Le script gère :
 *   - le champ top-level `audio` sur chaque entrée
 *   - les champs `audio` imbriqués dans `examples[]` si présents
 *   - les autres références `.wav` dans des champs textuels (fallback regex)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(PROJECT_ROOT, 'data');
const AUDIO_ROOT = path.join(PROJECT_ROOT, 'public');

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------
const argv = process.argv.slice(2);
const dryRun = argv.includes('--dry-run');
const force = argv.includes('--force');
const patternArg = argv.find((a) => a.startsWith('--pattern='))?.slice('--pattern='.length);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const mp3ExistsCache = new Map();
function mp3ExistsForWav(wavRelPath) {
  // wavRelPath: "audio/hsk1/hsk1_爱.wav"
  if (!wavRelPath.endsWith('.wav')) return false;
  const mp3Rel = wavRelPath.slice(0, -4) + '.mp3';
  if (mp3ExistsCache.has(mp3Rel)) return mp3ExistsCache.get(mp3Rel);
  const abs = path.join(AUDIO_ROOT, mp3Rel);
  const exists = fs.existsSync(abs);
  mp3ExistsCache.set(mp3Rel, exists);
  return exists;
}

/**
 * Réécrit récursivement toute string `*.wav` en `*.mp3` dans un objet JSON.
 * Retourne un nouvel objet + des stats {replaced, kept}.
 */
function rewriteWavInObject(node, stats) {
  if (typeof node === 'string') {
    if (node.endsWith('.wav')) {
      if (force || mp3ExistsForWav(node)) {
        stats.replaced++;
        return node.slice(0, -4) + '.mp3';
      } else {
        stats.kept++;
        return node;
      }
    }
    // Aussi gérer les strings qui CONTIENNENT .wav (cas rare, ex: HTML embed)
    if (node.includes('.wav')) {
      let out = node;
      let touched = false;
      out = out.replace(/([^"'\s]+)\.wav/g, (match, base) => {
        const relGuess = match;
        if (force || mp3ExistsForWav(relGuess)) {
          touched = true;
          return base + '.mp3';
        }
        return match;
      });
      if (touched) {
        stats.replaced++;
        return out;
      }
    }
    return node;
  }
  if (Array.isArray(node)) {
    return node.map((item) => rewriteWavInObject(item, stats));
  }
  if (node && typeof node === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(node)) {
      out[k] = rewriteWavInObject(v, stats);
    }
    return out;
  }
  return node;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const allFiles = fs.readdirSync(DATA_DIR).filter((f) => /^hsk.*\.json$/i.test(f));
const targetFiles = patternArg
  ? allFiles.filter((f) => f.includes(patternArg))
  : allFiles;

if (targetFiles.length === 0) {
  console.error(
    `Aucun fichier hsk*.json trouvé${patternArg ? ` avec pattern "${patternArg}"` : ''}.`
  );
  process.exit(1);
}

console.log(`📋 Mode: ${dryRun ? 'DRY-RUN' : 'WRITE'}${force ? ' + FORCE' : ''}`);
console.log(`📁 Fichiers ciblés (${targetFiles.length}): ${targetFiles.join(', ')}\n`);

const globalStats = { replaced: 0, kept: 0, files: 0 };

for (const file of targetFiles) {
  const filePath = path.join(DATA_DIR, file);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const json = JSON.parse(raw);

  const stats = { replaced: 0, kept: 0 };
  const rewritten = rewriteWavInObject(json, stats);

  globalStats.replaced += stats.replaced;
  globalStats.kept += stats.kept;
  globalStats.files++;

  if (stats.replaced === 0 && stats.kept === 0) {
    console.log(`  ${file}: aucun .wav trouvé (déjà migré ?)`);
    continue;
  }

  const action = stats.replaced > 0 ? '✏️' : '⏭️';
  console.log(
    `  ${action} ${file}: ${stats.replaced} remplacé(s), ${stats.kept} conservé(s) (mp3 absent)`
  );

  if (!dryRun && stats.replaced > 0) {
    // Préserve l'indentation 2-spaces des JSON existants
    fs.writeFileSync(filePath, JSON.stringify(rewritten, null, 2) + '\n', 'utf-8');
  }
}

console.log('');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(
  `✅ Terminé : ${globalStats.replaced} liens migrés .wav → .mp3, ${globalStats.kept} conservés (mp3 manquant).`
);
if (dryRun) {
  console.log('   (Aucun fichier n\'a été modifié — relance sans --dry-run pour appliquer.)');
}
if (globalStats.kept > 0 && !force) {
  console.log('');
  console.log(`💡 Astuce : ${globalStats.kept} entrées gardent leur .wav car le .mp3`);
  console.log('   correspondant n\'existe pas encore. Pour les migrer aussi :');
  console.log('   1) Lance `node scripts/wav-to-azure-mp3.mjs` pour générer les .mp3 Azure');
  console.log('   2) Relance ce script (les nouveaux .mp3 seront détectés)');
  console.log('   Ou utilise `--force` si tu sais que les .mp3 sont déjà ailleurs (Firebase Storage).');
}
