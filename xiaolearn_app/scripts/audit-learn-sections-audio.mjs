/**
 * audit-learn-sections-audio.mjs
 * ------------------------------
 * Scanne tous les fichiers `cecr-*-learn-sections.ts` (+ `first-steps` et
 * `pinyin`) et vérifie que chaque item `{ hanzi, pinyin, meaning, audio }`
 * possède bien un fichier MP3 (ou WAV fallback) sur disque.
 *
 * Pourquoi un audit dédié :
 *   - `audit-example-audio.mjs` couvre seulement `examples: [{ hanzi }]` dans
 *     les modules et les dictionnaires HSK (`chinese:`).
 *   - Les `learnSections[].items[].audio` utilisent un chemin *explicite*
 *     (ex. "audio/hsk3/hsk3_经济.wav") et ne passent pas par le fallback hash.
 *   - Avec ~5 niveaux câblés (A2 → B2.2), plusieurs milliers d'items référencent
 *     des MP3 qui peuvent ne pas exister pour les mots modernes/techniques
 *     (人工智能, 物联网, 碳中和, etc.).
 *
 * Usage :
 *   node scripts/audit-learn-sections-audio.mjs
 *
 * Produit `scripts/audit-learn-sections-audio-report.json` : liste des audio
 * manquants, consommable par un script de génération Azure.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const SRC_DATA = path.join(PROJECT_ROOT, 'src', 'data');
const PUBLIC_ROOT = path.join(PROJECT_ROOT, 'public');

/**
 * Extrait les items `{ hanzi, pinyin, meaning, audio }` d'un fichier TS via
 * scan regex.
 * Gère les objets sur une seule ligne ET multi-lignes.
 */
function extractItems(content, file) {
  const results = [];
  // Cherche un `items: [` et parcourt l'intérieur
  const itemsRegex = /items\s*:\s*\[/g;
  let m;
  while ((m = itemsRegex.exec(content)) !== null) {
    let depth = 1;
    let i = m.index + m[0].length;
    const start = i;
    while (i < content.length && depth > 0) {
      const c = content[i];
      if (c === '[') depth++;
      else if (c === ']') depth--;
      i++;
    }
    const block = content.slice(start, i - 1);

    // Parse objets {...} dedans
    let obj = '';
    let oDepth = 0;
    let inStr = false;
    let strCh = '';
    for (const ch of block) {
      if (inStr) {
        obj += ch;
        if (ch === strCh && obj[obj.length - 2] !== '\\') inStr = false;
        continue;
      }
      if (ch === "'" || ch === '"') {
        inStr = true;
        strCh = ch;
        obj += ch;
        continue;
      }
      if (ch === '{') { oDepth++; obj += ch; }
      else if (ch === '}') {
        oDepth--; obj += ch;
        if (oDepth === 0) {
          const hanziMatch = obj.match(/hanzi\s*:\s*['"]([^'"]+)['"]/);
          const audioMatch = obj.match(/audio\s*:\s*['"]([^'"]+)['"]/);
          if (hanziMatch && audioMatch) {
            results.push({
              file: path.relative(PROJECT_ROOT, file),
              hanzi: hanziMatch[1],
              audio: audioMatch[1]
            });
          }
          obj = '';
        }
      } else if (oDepth > 0) obj += ch;
    }
  }
  return results;
}

function audioExists(relPath) {
  // Accepte MP3 ou WAV (toggle d'extension)
  const abs = path.join(PUBLIC_ROOT, relPath);
  if (fs.existsSync(abs)) return abs;
  if (relPath.endsWith('.wav')) {
    const mp3 = abs.replace(/\.wav$/, '.mp3');
    if (fs.existsSync(mp3)) return mp3;
  }
  if (relPath.endsWith('.mp3')) {
    const wav = abs.replace(/\.mp3$/, '.wav');
    if (fs.existsSync(wav)) return wav;
  }
  return null;
}

function main() {
  const targets = fs
    .readdirSync(SRC_DATA)
    .filter((n) => /learn-sections\.ts$/.test(n))
    .map((n) => path.join(SRC_DATA, n));

  console.log(`📂 Fichiers scannés : ${targets.length}`);

  const all = [];
  for (const f of targets) {
    const content = fs.readFileSync(f, 'utf8');
    all.push(...extractItems(content, f));
  }

  // Dédup par (hanzi + audio path)
  const byKey = new Map();
  for (const e of all) {
    const key = `${e.hanzi}|${e.audio}`;
    if (!byKey.has(key)) byKey.set(key, e);
  }
  const uniq = [...byKey.values()];

  console.log(`🔍 Items distincts avec audio : ${uniq.length} (sur ${all.length} occurrences)\n`);

  const missing = [];
  for (const e of uniq) {
    if (!audioExists(e.audio)) missing.push(e);
  }

  console.log(`✔ Présents       : ${uniq.length - missing.length}`);
  console.log(`✖ Manquants      : ${missing.length}\n`);

  if (missing.length > 0) {
    console.log(`⚠ Échantillon (15 premiers) :`);
    for (const m of missing.slice(0, 15)) {
      console.log(`  - ${m.hanzi.padEnd(10)} → ${m.audio}    (${m.file})`);
    }
    if (missing.length > 15) console.log(`  … et ${missing.length - 15} autres`);
    console.log('');

    const totalChars = missing.reduce((s, m) => s + m.hanzi.length, 0);
    console.log(`  Estimation Azure : ${totalChars} caractères ≈ ${((totalChars / 1_000_000) * 16).toFixed(4)} USD\n`);
  }

  const reportPath = path.join(PROJECT_ROOT, 'scripts', 'audit-learn-sections-audio-report.json');
  fs.writeFileSync(
    reportPath,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        scannedFiles: targets.map((t) => path.relative(PROJECT_ROOT, t)),
        totalItems: uniq.length,
        presentCount: uniq.length - missing.length,
        missingCount: missing.length,
        missing
      },
      null,
      2
    )
  );
  console.log(`📄 Rapport : ${path.relative(PROJECT_ROOT, reportPath)}`);
}

main();
