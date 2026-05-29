/**
 * cleanup-residual-data.mjs
 *
 * Nettoie les 28 entrées avec du latin résiduel dans `chinese`
 * après les passes précédentes. Catégories :
 *
 *   A. Légitimes (HSK, VIP, GDP, URLs, variables A/B, guillemets péda) — skip
 *   B. Format "hanzi - traduction" sans pinyin entre les 2 — extrait
 *   C. Bugs/typos précis — patch direct par mapping hardcodé
 *
 * Usage :
 *   node scripts/cleanup-residual-data.mjs            # dry-run
 *   node scripts/cleanup-residual-data.mjs --write    # applique
 */

import { readFileSync, writeFileSync, copyFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pinyin } from 'pinyin-pro';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '..', 'data');
const REPORT_PATH = join(__dirname, 'cleanup-residual-report.json');

const WRITE = process.argv.includes('--write');
const HSK_FILES = ['hsk1.json', 'hsk2.json', 'hsk3.json', 'hsk4.json', 'hsk5.json', 'hsk6.json', 'hsk7.json'];

function ts() {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

function genPinyin(text) {
  return pinyin(text, {
    toneType: 'symbol',
    type: 'string',
    nonZh: 'consecutive',
    v: false,
    removeNonZh: false
  }).trim();
}

// === Catégorie C — bugs explicites, à patcher manuellement ===
// Clé = chinese ORIGINAL ; valeur = patch à appliquer
const HARDCODED_PATCHES = {
  // c parasite avant 靶子
  '他的目标是瞄准这个销售业绩的c靶子。': {
    chinese: '他的目标是瞄准这个销售业绩的靶子。',
    pinyin: 'tā de mùbiāo shì miáozhǔn zhège xiāoshòu yèjì de bǎzi.',
    translationFr: 'Son objectif est de viser la cible des résultats de vente.'
  },
  // "wrong person" anglais en plein milieu
  '他糊涂地把钱给了 wrong person.': {
    chinese: '他糊涂地把钱给了错的人。',
    pinyin: 'tā hútu de bǎ qián gěi le cuò de rén.',
    translationFr: "Distrait, il a donné l'argent à la mauvaise personne."
  },
  // HTML entity cassée
  '这个伤口很aacute;。': {
    chinese: '这个伤口很痛。',
    pinyin: 'zhège shāngkǒu hěn tòng.',
    translationFr: 'Cette plaie fait très mal.'
  },
  // 2e batch : 5 cas découverts au scan post-write
  '他提出了一个aacute;的问题。': {
    chinese: '他提出了一个尖锐的问题。',
    pinyin: 'tā tíchū le yīgè jiānruì de wèntí.',
    translationFr: 'Il a posé une question aiguë.'
  },
  '法官condamna le criminel。': {
    chinese: '法官惩罚了罪犯。',
    pinyin: 'fǎguān chéngfá le zuìfàn.',
    translationFr: 'Le juge a puni le criminel.'
  },
  '对父母的 qínghuái': {
    chinese: '对父母的情怀',
    pinyin: 'duì fùmǔ de qínghuái',
    translationFr: 'Sentiments envers les parents'
  },
  '他对这个城市的 qínghuái': {
    chinese: '他对这个城市的情怀',
    pinyin: 'tā duì zhège chéngshì de qínghuái',
    translationFr: 'Ses sentiments pour cette ville'
  },
  '占卜 fortune': {
    chinese: '占卜',
    pinyin: 'zhānbǔ',
    translationFr: 'Divination'
  }
};

// === Catégorie B — format "hanzi - traduction" sans pinyin entre les 2 ===
// Pattern : on prend tout ce qui est avant " - ", on regen le pinyin via
// pinyin-pro, on met la suite dans translationFr si vide.
const HANZI_DASH_TRAD_RE = /^([一-鿿，。、！？：；""''（）《》〈〉【】「」\s]+?)\s*[-—]\s*([^一-鿿]+)$/;

// === Catégorie A — légitime, ne pas toucher ===
function isLegitimate(chinese) {
  // Sigles techniques anglais (HSK, VIP, GDP, ABC pour variables, type sanguin A)
  if (/(?:HSK|VIP|GDP|CEO|CTO|UI|UX|TV|DVD|CD|PC|GPS|USB|API|SQL|HTML)/.test(chinese)) return true;
  // URLs et emails
  if (/(?:www\.|@|https?:\/\/)/.test(chinese)) return true;
  // Variables A/B, A型, etc. — une seule lettre majuscule isolée près d'un hanzi
  if (/^[A一-鿿]+(?:换|型|组|队|班)[B一-鿿]+/.test(chinese) || /^用[A-Z]换[A-Z]$/.test(chinese)) return true;
  if (/[A-Z]型/.test(chinese)) return true; // A型血, B型 etc.
  if (/维生素[A-Z]/.test(chinese)) return true; // 维生素A
  // Guillemets pédagogiques contenant du pinyin
  if (/[""].*?[a-zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüńňǹ].*?[""]/u.test(chinese)) return true;
  return false;
}

// Placeholders XXX — à virer
function isPlaceholder(chinese) {
  return /^\s*X{2,}\s*$/i.test(chinese);
}

function walkExamples(obj, onExample) {
  if (Array.isArray(obj)) {
    obj.forEach((v) => walkExamples(v, onExample));
    return;
  }
  if (obj && typeof obj === 'object') {
    if ('examples' in obj && Array.isArray(obj.examples)) {
      // On filtre en place pour pouvoir supprimer les placeholders
      const newExamples = [];
      obj.examples.forEach((ex) => {
        if (ex && typeof ex === 'object' && typeof ex.chinese === 'string') {
          const action = onExample(ex);
          if (action === 'drop') return; // ne push pas
        }
        newExamples.push(ex);
      });
      // Remplace l'array si modif (uniquement en mode write)
      if (WRITE && newExamples.length !== obj.examples.length) {
        obj.examples.length = 0;
        obj.examples.push(...newExamples);
      }
    }
    for (const k of Object.keys(obj)) {
      walkExamples(obj[k], onExample);
    }
  }
}

console.log(`Mode : ${WRITE ? 'WRITE' : 'DRY-RUN'}\n`);

const tsStr = ts();
const report = {
  generatedAt: new Date().toISOString(),
  mode: WRITE ? 'write' : 'dry-run',
  totals: { hardcoded: 0, hanziDash: 0, dropped: 0, skippedLegit: 0 },
  byFile: {}
};

for (const file of HSK_FILES) {
  const filePath = join(DATA_DIR, file);
  if (!existsSync(filePath)) continue;
  const raw = readFileSync(filePath, 'utf8');
  const data = JSON.parse(raw);

  const fileLog = { hardcoded: [], hanziDash: [], dropped: [], skipped: [] };

  walkExamples(data, (ex) => {
    const original = ex.chinese;

    // 1. Hardcoded patches
    if (HARDCODED_PATCHES[original]) {
      const patch = HARDCODED_PATCHES[original];
      if (WRITE) {
        ex.chinese = patch.chinese;
        ex.pinyin = patch.pinyin;
        if (!ex.translationFr || ex.translationFr.trim() === '') {
          ex.translationFr = patch.translationFr;
        }
      }
      fileLog.hardcoded.push({ before: original, after: patch.chinese });
      return;
    }

    // 2. Placeholder XXX — drop l'entrée
    if (isPlaceholder(original)) {
      fileLog.dropped.push(original);
      return 'drop';
    }

    // 3. Format hanzi - traduction
    const m = HANZI_DASH_TRAD_RE.exec(original);
    if (m) {
      const hanzi = m[1].trim();
      const trad = m[2].trim();
      // Sécurité : si la queue commence par du pinyin, ce n'est pas une
      // traduction française pure — skip (sera traité ailleurs ou laissé)
      if (/^[a-zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüńňǹ]+\s/.test(trad) &&
          !/[éèàùçâêîôûäëïöü]/.test(trad)) {
        return;
      }
      const generatedPinyin = genPinyin(hanzi);
      if (WRITE) {
        ex.chinese = hanzi;
        ex.pinyin = generatedPinyin;
        if (!ex.translationFr || ex.translationFr.trim() === '') {
          ex.translationFr = trad;
        }
      }
      fileLog.hanziDash.push({ before: original, hanzi, pinyin: generatedPinyin, trad });
      return;
    }

    // 4. Légitimes — skip
    if (isLegitimate(original)) {
      fileLog.skipped.push(original);
      return;
    }

    // Reste : entrées avec latin non classifiées
    if (/[a-zA-Z]/.test(original)) {
      fileLog.skipped.push(original + ' [non classifiée]');
    }
  });

  const total = fileLog.hardcoded.length + fileLog.hanziDash.length + fileLog.dropped.length;
  console.log(`${file}: ${total} modif(s) | hardcoded=${fileLog.hardcoded.length} hanziDash=${fileLog.hanziDash.length} drop=${fileLog.dropped.length} skip=${fileLog.skipped.length}`);

  if (WRITE && total > 0) {
    const bak = `${filePath}.bak.residual.${tsStr}`;
    copyFileSync(filePath, bak);
    writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
    console.log(`  → backup: ${bak.split('/').pop()}`);
  }

  report.byFile[file] = fileLog;
  report.totals.hardcoded += fileLog.hardcoded.length;
  report.totals.hanziDash += fileLog.hanziDash.length;
  report.totals.dropped += fileLog.dropped.length;
  report.totals.skippedLegit += fileLog.skipped.length;
}

writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2), 'utf8');
console.log('');
console.log(`Totals : hardcoded=${report.totals.hardcoded}, hanziDash=${report.totals.hanziDash}, dropped=${report.totals.dropped}, skippedLegit=${report.totals.skippedLegit}`);
console.log(`Rapport : ${REPORT_PATH}`);

if (!WRITE) {
  console.log('\nPour appliquer : node scripts/cleanup-residual-data.mjs --write');
}
