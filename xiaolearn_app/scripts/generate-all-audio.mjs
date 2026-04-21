/**
 * generate-all-audio.mjs
 * ----------------------
 * Script unifié de (re)génération de TOUS les audios de XiaoLearn via Azure
 * Neural TTS. Remplace les anciens scripts par catégorie (generate-audio.js,
 * audio_cloud_tts.py, generate-phrase-audio.mjs, etc.) par un seul point
 * d'entrée qui :
 *
 *   1. Charge les dictionnaires HSK1→HSK7 depuis /data/hsk{N}.json et génère
 *      un fichier MP3 par mot (convention `public/audio/hsk{N}/hsk{N}_{hanzi}.mp3`).
 *   2. Scanne tous les fichiers src/data/**.ts à la recherche de références
 *      `audio: 'audio/phrases|grammar|readings|pinyin/...'` et regénère les
 *      fichiers correspondants en utilisant le `hanzi` associé.
 *
 * Format de sortie : MP3 48 kHz 96 kbps (identique aux scripts dialogues/readings).
 *
 * Usage :
 *   AZURE_SPEECH_KEY=xxx AZURE_SPEECH_REGION=eastus \
 *     node scripts/generate-all-audio.mjs [options]
 *
 * Options :
 *   --force                 : regénère tous les fichiers même s'ils existent
 *   --category=hsk,phrases  : filtre les catégories (hsk,phrases,grammar,readings,pinyin)
 *                             défaut = toutes sauf readings (a son propre script)
 *   --level=hsk1,hsk2       : filtre les niveaux HSK (séparés par virgules)
 *   --limit=N               : ne traite que les N premiers items par catégorie
 *   --concurrency=N         : nombre d'appels Azure en parallèle (défaut 6)
 *   --dry-run               : liste ce qui serait généré sans appeler Azure
 *   --voice=name            : change de voix (défaut = zh-CN-XiaoxiaoNeural)
 *
 * Pré-requis :
 *   - Ressource Azure Speech (https://portal.azure.com → "Speech") :
 *     export AZURE_SPEECH_KEY="<ta clé>"
 *     export AZURE_SPEECH_REGION="westeurope"  # ou eastus, etc.
 *
 * Exemples :
 *   # Dry-run pour voir ce qui serait généré
 *   node scripts/generate-all-audio.mjs --dry-run
 *
 *   # Regénérer TOUS les HSK1 uniquement (force, écrase l'existant)
 *   node scripts/generate-all-audio.mjs --category=hsk --level=hsk1 --force
 *
 *   # Regénérer phrases + grammaire en écrasant tout
 *   node scripts/generate-all-audio.mjs --category=phrases,grammar --force
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const dataRoot = path.join(projectRoot, 'data');
const srcDataRoot = path.join(projectRoot, 'src', 'data');
const publicAudioDir = path.join(projectRoot, 'public', 'audio');

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

const ALL_CATEGORIES = ['hsk', 'phrases', 'grammar', 'readings', 'pinyin', 'examples'];
const DEFAULT_CATEGORIES = ['hsk', 'phrases', 'grammar', 'pinyin', 'examples']; // readings a son propre script dédié
const categoryFilter =
  parseFlag('--category=')
    ?.split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean) ?? DEFAULT_CATEGORIES;

for (const c of categoryFilter) {
  if (!ALL_CATEGORIES.includes(c)) {
    console.error(`✗ Catégorie inconnue : "${c}". Valeurs valides : ${ALL_CATEGORIES.join(', ')}`);
    process.exit(1);
  }
}

const levelFilter =
  parseFlag('--level=')
    ?.split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean) ?? null;
const limitFlag = parseFlag('--limit=');
const limit = limitFlag ? Math.max(1, parseInt(limitFlag, 10) || 0) : Infinity;
const concurrencyFlag = parseFlag('--concurrency=');
const concurrency = concurrencyFlag ? Math.max(1, parseInt(concurrencyFlag, 10) || 1) : 6;
const voiceOverride = parseFlag('--voice=');

// ---------------------------------------------------------------------------
// Azure credentials
// ---------------------------------------------------------------------------
const AZURE_KEY = process.env.AZURE_SPEECH_KEY;
const AZURE_REGION = process.env.AZURE_SPEECH_REGION || 'eastus';

if (!AZURE_KEY && !dryRun) {
  console.error('✗ AZURE_SPEECH_KEY manquant.');
  console.error('  Export :   export AZURE_SPEECH_KEY="<ta clé>"');
  console.error('  Région (défaut eastus) : export AZURE_SPEECH_REGION="westeurope"');
  console.error("  Ou utilise --dry-run pour prévisualiser sans appeler l'API.");
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Voix zh-CN Azure Neural.
//
// Décision pédagogique : pour le vocabulaire HSK, les phrases, la grammaire et
// le pinyin, on utilise UNE SEULE voix (Xiaoxiao) pour que l'apprenant ancre
// le son à un timbre cohérent. C'est ce que font Pleco, Anki, HelloChinese,
// etc. — la variété de voix est un feature pour les dialogues (scénarisé),
// pas pour la mémorisation de mots.
//
// Xiaoxiao (zh-CN-XiaoxiaoNeural) : voix Mandarin de référence chez Microsoft.
// Articulation claire, tons nets, débit mesuré, mandarin standard Pékinois.
// ---------------------------------------------------------------------------
const DEFAULT_VOICE = 'zh-CN-XiaoxiaoNeural';

function pickVoice() {
  return voiceOverride || DEFAULT_VOICE;
}

// ---------------------------------------------------------------------------
// Azure REST call
// ---------------------------------------------------------------------------
function escapeXml(s) {
  return s.replace(/[<>&'"]/g, (c) =>
    ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c])
  );
}

function buildSsml(text, voiceName, rate = '-5%') {
  return [
    '<speak version="1.0" xml:lang="zh-CN" xmlns:mstts="https://www.w3.org/2001/mstts">',
    `  <voice name="${voiceName}">`,
    `    <prosody rate="${rate}">${escapeXml(text)}</prosody>`,
    '  </voice>',
    '</speak>'
  ].join('\n');
}

// Erreur typée pour distinguer les cas de rate-limit/quota du reste.
class AzureError extends Error {
  constructor(status, body, retryAfter) {
    super(`Azure TTS ${status}: ${body.slice(0, 300)}`);
    this.status = status;
    this.body = body;
    this.retryAfter = retryAfter; // secondes, depuis le header Retry-After
  }
  isRateLimit() {
    return this.status === 429;
  }
  isQuotaExhausted() {
    // Azure renvoie 429 avec un body type "Quota Exceeded" pour le plan F0
    // épuisé mensuellement. Différent d'un simple throttle (429 + Retry-After
    // court). Heuristique : pas de Retry-After ET body mentionne quota.
    return (
      this.status === 429 &&
      /quota/i.test(this.body) &&
      (!this.retryAfter || this.retryAfter > 3600)
    );
  }
}

async function synthesize(text, voiceName, rate) {
  const ssml = buildSsml(text, voiceName, rate);
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
    const body = await res.text().catch(() => '');
    const retryAfterHeader = res.headers.get('retry-after');
    const retryAfter = retryAfterHeader ? parseInt(retryAfterHeader, 10) : null;
    throw new AzureError(res.status, body, retryAfter);
  }
  return Buffer.from(await res.arrayBuffer());
}

// Flag global qui coupe tout le pipeline quand on détecte un quota épuisé :
// inutile de continuer à cogner Azure si le plan F0 est vidé pour le mois.
let quotaExhausted = false;

async function synthesizeWithRetry(text, voice, label, rate = '-5%') {
  const MAX_ATTEMPTS = 6;
  let lastErr;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    if (quotaExhausted) throw lastErr ?? new Error('quota exhausted');
    try {
      return await synthesize(text, voice, rate);
    } catch (err) {
      lastErr = err;

      // Quota mensuel épuisé → on arrête tout, pas de retry.
      if (err instanceof AzureError && err.isQuotaExhausted()) {
        quotaExhausted = true;
        throw err;
      }

      // Backoff : sur 429, respecter Retry-After si présent, sinon
      // exponentiel agressif (1s, 3s, 9s, 27s, 60s). Autres erreurs : 800ms * n.
      let wait;
      if (err instanceof AzureError && err.isRateLimit()) {
        const header = err.retryAfter;
        const expo = Math.min(60, Math.pow(3, attempt - 1)); // 1,3,9,27,60,60
        wait = Math.max(header ? header * 1000 : 0, expo * 1000);
      } else {
        wait = attempt * 800;
      }

      if (attempt < MAX_ATTEMPTS) {
        const waitStr = wait >= 1000 ? `${(wait / 1000).toFixed(1)}s` : `${wait}ms`;
        console.warn(`  ⚠ tentative ${attempt}/${MAX_ATTEMPTS} échec [${label}] : ${err.message} — retry dans ${waitStr}`);
        await new Promise((r) => setTimeout(r, wait));
      }
    }
  }
  throw lastErr;
}

// ---------------------------------------------------------------------------
// Collection des jobs : { text, outFile, label, rate? }
// ---------------------------------------------------------------------------
function collectHskJobs() {
  const jobs = [];
  const levels = ['hsk1', 'hsk2', 'hsk3', 'hsk4', 'hsk5', 'hsk6', 'hsk7'];

  for (const lvl of levels) {
    if (levelFilter && !levelFilter.includes(lvl)) continue;

    const jsonPath = path.join(dataRoot, `${lvl}.json`);
    if (!fs.existsSync(jsonPath)) {
      console.warn(`  ⚠ ${jsonPath} introuvable, skip`);
      continue;
    }

    const entries = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    for (const entry of entries) {
      if (!entry.hanzi) continue;
      // Certains mots HSK ont un suffixe numérique pour la polysémie
      // (ex. "本1" / "本2" = mesure vs livre). Ces chiffres ne doivent PAS
      // être envoyés à Azure (sinon il les prononce : "běn yī"). Le
      // filename (audio field) est déjà nettoyé côté JSON.
      const cleanHanzi = entry.hanzi.replace(/\d+$/, '').trim();
      if (!cleanHanzi) continue;

      // Convention MP3 : on privilégie le chemin déclaré dans `audio` s'il
      // existe, sinon on reconstruit depuis hanzi nettoyé. Dans les deux cas,
      // on force l'extension .mp3 (le script produit du MP3).
      const declared = entry.audio || `audio/${lvl}/${lvl}_${cleanHanzi}.wav`;
      const normalized = declared.replace(/\.wav$/i, '.mp3');
      const outFile = path.join(projectRoot, 'public', normalized);
      jobs.push({
        text: cleanHanzi,
        outFile,
        label: `${lvl}:${entry.hanzi}`,
        category: 'hsk',
        rate: '-5%'
      });
    }
  }
  return jobs;
}

/**
 * Scanne src/data/**.ts à la recherche de références `audio: '...'` et
 * extrait le `hanzi: '...'` associé dans le même objet.
 *
 * Heuristique : on matche les objets littéraux de forme
 *   { hanzi: 'xxx', pinyin: '...', ..., audio: 'audio/xxx' }
 * ou l'inverse (audio avant hanzi). On parcourt tous les .ts et on capte
 * les couples (hanzi, audio) par un regex tolérant.
 */
function collectFromTsSources(folderPrefix /* 'audio/phrases' | 'audio/grammar' | ... */) {
  const jobs = [];
  const seen = new Set();

  // Liste récursive des .ts dans src/data
  function walk(dir) {
    const out = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) out.push(...walk(full));
      else if (entry.name.endsWith('.ts')) out.push(full);
    }
    return out;
  }

  const tsFiles = walk(srcDataRoot);

  // Regex d'un objet littéral à une seule ligne ou multi-lignes contenant
  // à la fois `hanzi: '...'` et `audio: '...'`.
  // On limite la fenêtre à ~500 chars autour de l'audio pour éviter les faux
  // couplages entre objets voisins.
  const audioRegex = /audio:\s*['"]([^'"]+)['"]/g;

  for (const file of tsFiles) {
    const content = fs.readFileSync(file, 'utf8');
    let m;
    audioRegex.lastIndex = 0;
    while ((m = audioRegex.exec(content)) !== null) {
      const audioPath = m[1];
      if (!audioPath.startsWith(folderPrefix)) continue;

      // Cherche le `hanzi: '...'` le plus proche (avant ou après), dans une
      // fenêtre de 500 chars. Note : ordre privilégié = avant (plus fréquent
      // dans nos data files).
      const windowStart = Math.max(0, m.index - 500);
      const windowEnd = Math.min(content.length, m.index + 500);
      const before = content.slice(windowStart, m.index);
      const after = content.slice(m.index, windowEnd);

      // Chinese text candidates : hanzi/chinese/text fields first, fallback
      // sur tout texte chinois brut dans la fenêtre.
      const fieldRegex = /(?:hanzi|chinese|text|zh)\s*:\s*['"]([^'"]*[\u3400-\u9FFF][^'"]*)['"]/g;
      let best = null;
      // priorise les matches AVANT l'audio (même objet généralement)
      let fm;
      while ((fm = fieldRegex.exec(before)) !== null) best = fm[1];
      if (!best) {
        fieldRegex.lastIndex = 0;
        while ((fm = fieldRegex.exec(after)) !== null) {
          best = fm[1];
          break;
        }
      }

      // Dernier recours : premier bloc de chinois brut trouvé dans la fenêtre
      if (!best) {
        const rawChinese = (before + after).match(/[\u3400-\u9FFF][\u3400-\u9FFF\s，。！？、：]*/);
        if (rawChinese) best = rawChinese[0].trim();
      }

      if (!best) continue;

      const key = audioPath;
      if (seen.has(key)) continue;
      seen.add(key);

      // Normalise en .mp3 (on force le format de sortie)
      const normalized = audioPath.replace(/\.wav$/i, '.mp3');
      const outFile = path.join(projectRoot, 'public', normalized);
      jobs.push({
        text: best,
        outFile,
        label: `${path.basename(file)}:${audioPath}`,
        category: folderPrefix.replace('audio/', ''),
        rate: best.length > 6 ? '-10%' : '-5%' // phrases plus lentes
      });
    }
  }

  return jobs;
}

/**
 * Hash FNV-1a 32-bit → base36 : nommage déterministe côté JS et côté Node
 * (côté app, `getExampleAudioUrl(hanzi)` utilise la même fonction dans
 * src/utils/audio.ts pour deviner l'URL à la volée).
 */
function hashExampleName(hanzi) {
  let h = 0x811c9dc5;
  for (let i = 0; i < hanzi.length; i++) {
    h ^= hanzi.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(36);
}

/**
 * Scanne tous les .ts de src/data pour trouver les blocs `examples: [ {...} ]`.
 * Chaque example sans champ `audio:` génère un MP3 dans `public/audio/examples/`
 * avec un nom dérivé du hash du hanzi (même nom = réutilise le MP3).
 *
 * Ne modifie PAS les .ts — côté app, c'est `getExampleAudioUrl(hanzi)` dans
 * audio.ts qui calcule l'URL en miroir.
 */
function collectLessonExampleJobs() {
  const jobs = [];
  const seen = new Set();

  function walk(dir) {
    const out = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) out.push(...walk(full));
      else if (entry.name.endsWith('.ts')) out.push(full);
    }
    return out;
  }

  const tsFiles = walk(srcDataRoot);
  const blockRegex = /examples\s*:\s*\[/g;

  for (const file of tsFiles) {
    const content = fs.readFileSync(file, 'utf8');
    blockRegex.lastIndex = 0;
    let m;
    while ((m = blockRegex.exec(content)) !== null) {
      // Extraction naïve du tableau jusqu'au ']' de fermeture
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

      // Sépare en objets { ... } au niveau 0
      let obj = '';
      let oDepth = 0;
      for (const ch of block) {
        if (ch === '{') { oDepth++; obj += ch; }
        else if (ch === '}') {
          oDepth--; obj += ch;
          if (oDepth === 0) {
            processObject(obj, file);
            obj = '';
          }
        } else if (oDepth > 0) obj += ch;
      }
    }
  }

  function processObject(o, file) {
    const hanziMatch = o.match(/hanzi\s*:\s*['"]([^'"]+)['"]/);
    if (!hanziMatch) return;
    const hanzi = hanziMatch[1];
    // Si l'exemple a déjà un champ audio, on ne génère rien (on respecte la
    // valeur déclarée — ce sera scanné par collectFromTsSources si besoin).
    if (/\baudio\s*:\s*['"][^'"]+['"]/.test(o)) return;

    const cleanHanzi = hanzi.replace(/\d+$/, '').trim();
    if (!cleanHanzi) return;

    const name = hashExampleName(cleanHanzi);
    const key = name;
    if (seen.has(key)) return;
    seen.add(key);

    const outFile = path.join(publicAudioDir, 'examples', `${name}.mp3`);
    jobs.push({
      text: cleanHanzi,
      outFile,
      label: `${path.basename(file)}:ex:${cleanHanzi.slice(0, 12)}`,
      category: 'examples',
      // Les exemples sont souvent des phrases entières → débit ralenti.
      rate: cleanHanzi.length > 6 ? '-10%' : '-5%'
    });
  }

  return jobs;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log('🎙️  Génération unifiée des audios · Azure Neural TTS');
  console.log(`     Region : ${AZURE_REGION}${dryRun ? ' · DRY-RUN' : ''}`);
  console.log(`     Catégories : ${categoryFilter.join(', ')}`);
  if (levelFilter) console.log(`     Niveaux : ${levelFilter.join(', ')}`);
  if (Number.isFinite(limit)) console.log(`     Limite par catégorie : ${limit}`);
  console.log(`     Concurrence : ${concurrency}`);
  console.log(`     Force : ${force ? 'oui (écrase l\'existant)' : 'non (skip si existe)'}`);
  console.log(`     Voix : ${voiceOverride || DEFAULT_VOICE}`);
  console.log('');

  // -------------------------------------------------------------------------
  // 1. Collecte des jobs par catégorie
  // -------------------------------------------------------------------------
  const allJobs = [];

  if (categoryFilter.includes('hsk')) {
    const hskJobs = collectHskJobs();
    console.log(`  📚 HSK : ${hskJobs.length} mots`);
    allJobs.push(...hskJobs.slice(0, limit));
  }

  if (categoryFilter.includes('phrases')) {
    const phraseJobs = collectFromTsSources('audio/phrases');
    console.log(`  💬 Phrases : ${phraseJobs.length} expressions`);
    allJobs.push(...phraseJobs.slice(0, limit));
  }

  if (categoryFilter.includes('grammar')) {
    const grammarJobs = collectFromTsSources('audio/grammar');
    console.log(`  📖 Grammaire : ${grammarJobs.length} points`);
    allJobs.push(...grammarJobs.slice(0, limit));
  }

  if (categoryFilter.includes('pinyin')) {
    const pinyinJobs = collectFromTsSources('audio/pinyin');
    console.log(`  🔤 Pinyin : ${pinyinJobs.length} exemples`);
    allJobs.push(...pinyinJobs.slice(0, limit));
  }

  if (categoryFilter.includes('readings')) {
    const readingJobs = collectFromTsSources('audio/readings');
    console.log(`  📄 Lectures : ${readingJobs.length} segments`);
    allJobs.push(...readingJobs.slice(0, limit));
  }

  if (categoryFilter.includes('examples')) {
    const exJobs = collectLessonExampleJobs();
    console.log(`  ✏️  Exemples de leçons : ${exJobs.length} phrases`);
    allJobs.push(...exJobs.slice(0, limit));
  }

  console.log(`\n  Total jobs : ${allJobs.length}\n`);

  if (allJobs.length === 0) {
    console.log('Rien à faire.');
    return;
  }

  // -------------------------------------------------------------------------
  // 2. Filtrage skip-si-existe (sauf --force)
  // -------------------------------------------------------------------------
  const toProcess = [];
  let skipped = 0;
  for (const job of allJobs) {
    if (!force && fs.existsSync(job.outFile)) {
      skipped++;
      continue;
    }
    toProcess.push(job);
  }
  console.log(`  À générer : ${toProcess.length} · ignorés (déjà existants) : ${skipped}\n`);

  if (toProcess.length === 0) {
    console.log('Tous les fichiers existent déjà. Utilise --force pour regénérer.');
    return;
  }

  if (dryRun) {
    const preview = toProcess.slice(0, 20);
    for (const job of preview) {
      const rel = path.relative(projectRoot, job.outFile);
      console.log(`  ○ [${job.category}] "${job.text.slice(0, 24)}" → ${rel}`);
    }
    if (toProcess.length > 20) console.log(`  … et ${toProcess.length - 20} autres`);
    console.log(`\nDRY-RUN : aucun appel Azure. ${toProcess.length} fichiers seraient générés.`);
    return;
  }

  // -------------------------------------------------------------------------
  // 3. Génération parallèle avec worker pool
  // -------------------------------------------------------------------------
  let generated = 0;
  let failed = 0;
  const failures = [];
  const t0 = Date.now();

  async function worker(workerId) {
    while (true) {
      if (quotaExhausted) return;
      const job = toProcess.shift();
      if (!job) return;
      const voice = pickVoice();
      try {
        fs.mkdirSync(path.dirname(job.outFile), { recursive: true });
        const mp3 = await synthesizeWithRetry(job.text, voice, job.label, job.rate);
        fs.writeFileSync(job.outFile, mp3);
        generated++;
        if (generated % 50 === 0 || generated < 5) {
          const elapsed = ((Date.now() - t0) / 1000).toFixed(0);
          const rate = (generated / Math.max(1, parseInt(elapsed))).toFixed(1);
          console.log(`  ✓ [w${workerId}] ${generated} générés (${rate}/s) — ${job.label}`);
        }
      } catch (err) {
        failed++;
        failures.push({ label: job.label, error: err.message });
        console.error(`  ✗ [w${workerId}] ${job.label} — ${err.message}`);
        // Si le quota est épuisé, on arrête immédiatement tout le pipeline.
        if (err instanceof AzureError && err.isQuotaExhausted()) {
          quotaExhausted = true;
          console.error(`\n  🛑 Quota Azure épuisé — arrêt de tous les workers.`);
          return;
        }
      }
    }
  }

  const workers = Array.from({ length: concurrency }, (_, i) => worker(i + 1));
  await Promise.all(workers);

  const total = Math.round((Date.now() - t0) / 1000);
  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`Terminé en ${total}s · générés : ${generated} · échecs : ${failed}`);

  if (quotaExhausted) {
    console.log(`\n💡 Le plan Azure Speech a épuisé son quota mensuel (429 Quota Exceeded).`);
    console.log(`   • Plan F0 (gratuit) = 500 000 caractères/mois offerts.`);
    console.log(`   • Passe à S0 (standard) dans le portail Azure : https://portal.azure.com`);
    console.log(`     → ta ressource Speech → Pricing Tier → Standard S0`);
    console.log(`   • Coût S0 : ~16 USD par million de caractères (voix Neural).`);
    console.log(`   • Les fichiers déjà générés sont conservés ; relance avec les mêmes`);
    console.log(`     options (sans --force) pour reprendre là où le script s'est arrêté.`);
  }

  if (failures.length > 0) {
    console.log(`\nÉchecs${failures.length > 20 ? ' (20 premiers)' : ''} :`);
    for (const f of failures.slice(0, 20)) {
      console.log(`  ✗ ${f.label} : ${f.error}`);
    }
    if (failures.length > 20) console.log(`  … et ${failures.length - 20} autres`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Erreur fatale :', err);
  process.exit(1);
});
