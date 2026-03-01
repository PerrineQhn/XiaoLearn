import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

const cedictPath = path.resolve(root, '..', 'xiaolearn_anki', 'cedict_ts.txt');
const targetFiles = [
  path.join(root, 'data', 'hors-hsk.json'),
  path.resolve(root, '..', 'xiaolearn_reference', 'src', 'data', 'hors-hsk.json'),
  path.resolve(root, '..', 'xiaolearn_dictionnary', 'data', 'hors-hsk.json'),
  path.resolve(root, '..', 'xiaolearn_dictionnary', 'data', 'data', 'hors-hsk.json'),
  path.resolve(root, '..', 'xiaolearn_dictionnary', 'xiaolearn', 'data', 'hors-hsk.json'),
  path.resolve(root, '..', 'xiaolearn_dictionnary', 'xiaolearn', 'data', 'data', 'hors-hsk.json'),
];

function parseCedict(text) {
  const map = new Map();
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const match = trimmed.match(/^(\S+)\s+(\S+)\s+\[([^\]]+)\]\s+\/(.+)\/$/);
    if (!match) continue;
    const [, , simplified, , definitions] = match;
    const translationList = definitions.split('/').map((s) => s.trim()).filter(Boolean);
    if (!translationList.length) continue;
    map.set(simplified, { translation: translationList[0] });
  }
  return map;
}

const toneMap = {
  a: ['ā', 'á', 'ǎ', 'à'],
  e: ['ē', 'é', 'ě', 'è'],
  i: ['ī', 'í', 'ǐ', 'ì'],
  o: ['ō', 'ó', 'ǒ', 'ò'],
  u: ['ū', 'ú', 'ǔ', 'ù'],
  ü: ['ǖ', 'ǘ', 'ǚ', 'ǜ'],
};

function applyToneNumberToSyllable(raw = '') {
  const match = raw.match(/^([a-züv:]+)([1-5])$/i);
  if (!match) return raw.toLowerCase().replace(/v/g, 'ü').replace(/u:/g, 'ü');

  let syllable = match[1].toLowerCase().replace(/v/g, 'ü').replace(/u:/g, 'ü');
  const tone = Number(match[2]);
  if (tone === 5 || tone === 0) return syllable;

  let index = -1;
  if (syllable.includes('a')) index = syllable.indexOf('a');
  else if (syllable.includes('e')) index = syllable.indexOf('e');
  else if (syllable.includes('ou')) index = syllable.indexOf('o');
  else {
    for (const vowel of Object.keys(toneMap)) {
      const pos = syllable.lastIndexOf(vowel);
      if (pos !== -1) {
        index = pos;
        break;
      }
    }
  }

  if (index === -1) return syllable;
  const chars = [...syllable];
  const vowel = chars[index];
  const toned = toneMap[vowel]?.[tone - 1] ?? vowel;
  chars[index] = toned;
  return chars.join('');
}

function prettifyPinyin(raw = '') {
  const normalized = raw
    .replace(/u:/gi, 'ü')
    .replace(/([A-Za-z])\s*:\s*([1-5])/g, '$1:$2')
    .replace(/([1-5])(?=[A-Za-züÜvV:])/g, '$1 ');

  return normalized
    .split(/\s+/)
    .filter(Boolean)
    .map((token) => token.split("'").map(applyToneNumberToSyllable).join("'"))
    .join(' ');
}

function cleanCedictReference(value = '') {
  return value
    .replace(/([^\s|/]+)\|([^\s|/]+)/g, '$2')
    .replace(/\[([^\]]*)\]/g, (_, pinyin) => `[${prettifyPinyin(String(pinyin))}]`)
    .replace(/\s+\[/g, '[')
    .replace(/\s+/g, ' ')
    .replace(/\s*[,;:]\s*$/, '')
    .trim();
}

function toFrenchLikeReference(english = '') {
  const source = english.trim();
  const oldVariant = source.match(/^old variant of\s+(.+)$/i);
  if (oldVariant) return `ancienne variante de ${cleanCedictReference(oldVariant[1])}`;

  const variant = source.match(/^variant of\s+(.+)$/i);
  if (variant) return `variante de ${cleanCedictReference(variant[1])}`;

  const see = source.match(/^see\s+(.+)$/i);
  if (see) return `voir ${cleanCedictReference(see[1])}`;

  const usedIn = source.match(/^used in\s+(.+)$/i);
  if (usedIn) return `utilisé dans ${cleanCedictReference(usedIn[1])}`;

  const abbr = source.match(/^abbr\.?\s*for\s+(.+)$/i);
  if (abbr) return `abréviation de ${cleanCedictReference(abbr[1])}`;

  return '';
}

function cleanFrenchNoise(value = '') {
  return value
    .replace(/\[[^\]]*]/g, '')
    .replace(/,+/g, ', ')
    .replace(/\s+,/g, ',')
    .replace(/,\s*,+/g, ', ')
    .replace(/\s{2,}/g, ' ')
    .replace(/^,\s*/, '')
    .replace(/\s*[,，;:]\s*$/, '')
    .trim();
}

function isGenericFrench(value = '') {
  return /^(les|le|la|un|une|des)$/i.test(value.trim());
}

function isSuspiciousFrench(value = '') {
  const text = value.trim();
  if (!text) return true;
  if (text.includes(',,,')) return true;
  if (/\[[^\]]*$/.test(text)) return true;
  if (/^(variante de|utilisé en|voir)\s*,+/i.test(text)) return true;
  if (isGenericFrench(text)) return true;
  return false;
}

function repairEntry(entry, cedictMap) {
  const cedictEnglish = cedictMap.get(entry.hanzi)?.translation || '';
  const english = cedictEnglish || entry.translationEn || entry.translation || '';
  const ruleBased = toFrenchLikeReference(english);
  if (ruleBased && ruleBased !== entry.translationFr) {
    entry.translationFr = ruleBased;
    return true;
  }

  const current = entry.translationFr || '';
  const cleanedCurrent = cleanFrenchNoise(current);
  const suspicious = isSuspiciousFrench(current);

  if (!suspicious && cleanedCurrent === current) {
    return false;
  }

  if (cleanedCurrent && !isSuspiciousFrench(cleanedCurrent)) {
    if (cleanedCurrent !== entry.translationFr) {
      entry.translationFr = cleanedCurrent;
      return true;
    }
    return false;
  }

  const englishFallback = cleanCedictReference(english);
  if (englishFallback && englishFallback !== entry.translationFr) {
    entry.translationFr = englishFallback;
    return true;
  }

  return false;
}

async function run() {
  const cedictText = await fs.readFile(cedictPath, 'utf-8');
  const cedictMap = parseCedict(cedictText);

  for (const filePath of targetFiles) {
    const payload = await fs.readFile(filePath, 'utf-8');
    const entries = JSON.parse(payload);
    let changed = 0;

    for (const entry of entries) {
      if (repairEntry(entry, cedictMap)) changed += 1;
    }

    if (changed > 0) {
      await fs.writeFile(filePath, `${JSON.stringify(entries, null, 2)}\n`, 'utf-8');
    }
    console.log(`${path.relative(process.cwd(), filePath)} -> ${changed} entrées corrigées`);
  }
}

run().catch((error) => {
  console.error('Erreur réparation hors-HSK:', error);
  process.exitCode = 1;
});
