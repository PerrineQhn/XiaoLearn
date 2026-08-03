/**
 * enrich-exercises.mjs
 * --------------------
 * Complète `data/cecrExercises.ts` sur trois défauts mesurés :
 *
 *   1. 110 leçons n'avaient que 1 à 5 exercices, contre 9,4 en moyenne
 *      ailleurs, et n'utilisaient que 3 des 8 types disponibles ;
 *   2. 47 % du vocabulaire enseigné dans les sections n'était repris par
 *      AUCUN exercice — on apprenait dix mots, on en travaillait cinq ;
 *   3. les exercices d'écoute ne portaient pas d'`audioHanzi`, donc les
 *      leçons de prononciation se testaient à l'œil.
 *
 * Il corrige au passage neuf exercices existants défectueux (voir `PATCHES`) :
 * options dupliquées, et trous dont la réponse se lisait ailleurs dans la
 * phrase. Ces corrections vivent ici parce que le fichier de données est
 * régénéré — les y écrire directement les perdrait au prochain passage.
 *
 * ## Règle de fabrication : aucune phrase chinoise n'est inventée
 *
 * Tout le matériau vient de deux sources déjà relues :
 *
 *   - `LEARN_SECTIONS[...].items` — le vocabulaire réellement enseigné par la
 *     leçon, avec son sens FR et EN ;
 *   - `hskVocab.json` — 8 877 entrées, chacune avec ses phrases d'exemple
 *     bilingues, celles-là mêmes dont l'audio Azure est déjà généré.
 *
 * Chaque `audioHanzi` posé est vérifié fichier par fichier contre le dépôt web
 * voisin (`hasAudio`) : 63 mots enseignés n'ont pas d'enregistrement et ne
 * reçoivent donc pas de bouton 🔊 — ils sont listés dans
 * `enrich-exercises-missing-audio.json` pour une future génération.
 *
 * Générer une phrase chinoise par recombinaison produirait des énoncés
 * grammaticalement plausibles et idiomatiquement faux ; on s'interdit donc
 * de composer, on ne fait que sélectionner, trouer et apparier.
 *
 * ## Les cinq fabriques
 *
 *   translation  FR → ZH sur un mot enseigné, distracteurs pris dans la même
 *                leçon (donc du même registre, ce qui rend le choix réel).
 *   mcq          ZH → FR, avec `audioHanzi` : on entend le mot avant de
 *                choisir son sens.
 *   fill         phrase d'exemple authentique, mot cible retiré. Volontairement
 *                SANS audio : entendre la phrase donnerait la réponse.
 *   pair-error   quatre couples phrase/traduction, un seul faux. La traduction
 *                fautive est empruntée à un autre exemple, jamais réécrite.
 *   tone-error   quatre couples hanzi/pinyin, un seul faux. Le ton corrompu est
 *                vérifié absent du dictionnaire pour ce hanzi, ce qui écarte
 *                les 多音字 (为 wéi/wèi, 长 cháng/zhǎng…).
 *
 * Chaque fabrique a des garde-fous explicites (voir `gates` plus bas) : un
 * item qui ne les passe pas n'est pas produit. Mieux vaut une leçon à 8
 * exercices sûrs qu'à 9 dont un est ambigu.
 *
 * Usage : node scripts/enrich-exercises.mjs [--dry]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DRY = process.argv.includes('--dry');

/** Plancher d'exercices par leçon — la moyenne des leçons non générées. */
const FLOOR = 9;
/** Part du vocabulaire enseigné qui doit être reprise par un exercice. */
const COVERAGE_TARGET = 0.85;
/** Plafond de taille : au-delà, une leçon devient une séance de bachotage. */
const CEILING = 14;

/**
 * Niveau HSK maximal des distracteurs, par palier CECR de la leçon.
 *
 * Sans ce garde-fou, une leçon A1 sur les tons se voyait proposer 自身 (HSK 7)
 * comme distracteur : le débutant n'élimine pas une option qu'il ne peut pas
 * lire, il devine. Un distracteur n'instruit que s'il est plausible.
 */
const MAX_LEVEL = {
  a1: 1, a2: 2, b11: 3, b12: 4, b21: 5, b22: 5, c11: 6, c12: 6, c21: 7, c22: 7,
};
const LEVEL_RANK = { hsk1: 1, hsk2: 2, hsk3: 3, hsk4: 4, hsk5: 5, hsk6: 6, hsk7: 7 };
const lessonTier = id => MAX_LEVEL[(id.match(/^cecr-([a-z0-9]+)-/) ?? [])[1]] ?? 7;

// ─── Lecture des littéraux TS ────────────────────────────────────────────────
// Les fichiers de données sont du TypeScript annoté ; on isole le littéral qui
// suit `= {` (pas la première accolade, qui appartient au type Record<…>).
function literal(file, name) {
  const src = fs.readFileSync(path.join(ROOT, file), 'utf8');
  const start = src.indexOf('{', src.indexOf('= {', src.indexOf(name)));
  let depth = 0, i = start, quote = null, esc = false;
  for (; i < src.length; i++) {
    const ch = src[i];
    if (esc) { esc = false; continue; }
    if (ch === '\\') { esc = true; continue; }
    if (quote) { if (ch === quote) quote = null; continue; }
    if (ch === '"' || ch === "'" || ch === '`') { quote = ch; continue; }
    if (ch === '{' || ch === '[') depth++;
    else if (ch === '}' || ch === ']') { depth--; if (!depth) { i++; break; } }
  }
  return src.slice(start, i);
}
const evalLiteral = async (file, name) => (await import(
  'data:text/javascript;base64,' + Buffer.from(`export default ${literal(file, name)};`).toString('base64')
)).default;

const EXERCISES = await evalLiteral('data/cecrExercises.ts', 'EXERCISES');
const SECTIONS  = await evalLiteral('data/cecrLearnSections.ts', 'LEARN_SECTIONS');
const CONTENT   = await evalLiteral('data/cecrLessonContent.ts', 'LESSON_CONTENT');
const VOCAB     = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/hskVocab.json'), 'utf8'));

// ─── Index dictionnaire ──────────────────────────────────────────────────────
const BY_HANZI = new Map();
for (const v of VOCAB) if (v.hanzi && !BY_HANZI.has(v.hanzi)) BY_HANZI.set(v.hanzi, v);
/** Tous les pinyins attestés pour un hanzi — sert à écarter les 多音字. */
const READINGS = new Map();
for (const v of VOCAB) {
  if (!v.hanzi || !v.pinyin) continue;
  if (!READINGS.has(v.hanzi)) READINGS.set(v.hanzi, new Set());
  READINGS.get(v.hanzi).add(v.pinyin.replace(/\s+/g, '').toLowerCase());
}
/** Mots groupés par catégorie grammaticale, pour des distracteurs de même POS. */
const BY_CATEGORY = new Map();
for (const v of VOCAB) {
  if (!v.hanzi || !v.category) continue;
  if (!BY_CATEGORY.has(v.category)) BY_CATEGORY.set(v.category, []);
  BY_CATEGORY.get(v.category).push(v);
}

// ─── Audio réellement disponible ─────────────────────────────────────────────
/**
 * `playHanzi` retombe silencieusement sur la synthèse du téléphone quand aucun
 * fichier ne correspond. Poser un bouton 🔊 qui déclenche une voix robotique
 * là où le reste de l'app parle avec une voix neuronale est pire que de ne pas
 * le poser : l'apprenant entend une prononciation qu'il ne doit pas imiter.
 *
 * On ne pose donc `audioHanzi` que si le fichier existe vraiment. La
 * résolution reproduit `hooks/useAudio.ts` (hash FNV-1a des phrases, chemins
 * hsk1-7, hors-hsk). Les fichiers vivent dans le dépôt web voisin ; s'il n'est
 * pas là, on ne bloque pas et on laisse passer.
 */
const PUBLIC = path.resolve(ROOT, '../xiaolearn_app/public');
const HAS_PUBLIC = fs.existsSync(PUBLIC);
const fnv1a = s => {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193); }
  return (h >>> 0).toString(36);
};
const audioCache = new Map();
function hasAudio(hanzi) {
  if (!HAS_PUBLIC) return true;
  if (audioCache.has(hanzi)) return audioCache.get(hanzi);
  const c = hanzi.replace(/\d+$/, '').trim();
  const tries = [];
  if (c.length >= 2) tries.push(`audio/examples/${fnv1a(c)}.mp3`, `audio/examples/${fnv1a(c)}.wav`);
  for (let n = 1; n <= 7; n++) tries.push(`audio/hsk${n}/hsk${n}_${c}.wav`, `audio/hsk${n}/hsk${n}_${c}.mp3`);
  tries.push(`audio/hors-hsk/hors-hsk_${c}.mp3`, `audio/hors-hsk/hors-hsk_${c}.wav`);
  const ok = tries.some(r => fs.existsSync(path.join(PUBLIC, r)));
  audioCache.set(hanzi, ok);
  return ok;
}
const noAudio = new Set();

// ─── Aléatoire reproductible ─────────────────────────────────────────────────
// Une graine fixe : deux exécutions produisent le même fichier, sinon toute
// régénération ferait un diff illisible.
let seed = 0x5EED;
const rnd = () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 0x100000000;
const pickOne = a => a[Math.floor(rnd() * a.length)];
const shuffle = a => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };

// ─── Garde-fous partagés ─────────────────────────────────────────────────────
const HAN = /[一-鿿]/;
const ONLY_HAN = /^[一-鿿]+$/;
const norm = s => String(s ?? '').toLowerCase().replace(/[\s.,;:!?'"«»()’-]/g, '');

/** Évite « Quel livre ?. » quand on recolle une traduction déjà ponctuée. */
const stop = s => {
  const t = String(s ?? '').trim();
  return /[.!?。！？]$/.test(t) ? t : t + '.';
};
/** Inverse : une citation entre guillemets n'emporte pas son point final. */
// Un point de suspension n'est pas une ponctuation finale : « D'abord…
// puis… » doit rester intact, sans quoi on obtient « puis.. ».
const bare = s => String(s ?? '').trim().replace(/(?<![.。])\s*[.?!]$/, '');

/**
 * Retire l'annotation phonétique d'un sens.
 *
 * Les leçons de prononciation glosent leur vocabulaire pour l'oreille :
 * 他 y est défini « il / lui (t, aspiré) ». Utile dans la leçon, absurde dans
 * l'énoncé « Comment dit-on "il / lui (t, aspiré)" en chinois ? ».
 */
const PHONETIC = /\((?:[^)]*(?:aspir|non aspir|nasal|rétro|retro|initiale|finale|ton \d|tone \d|palatal)[^)]*|[a-zü]{1,3}[-]?)\)\s*$/i;
const clean = s => String(s ?? '').replace(PHONETIC, '').trim().replace(/[,;]$/, '');

/**
 * Deux sens sont-ils distinguables ? Un QCM dont deux options veulent dire la
 * même chose n'a pas de bonne réponse. On refuse l'égalité après
 * normalisation et l'inclusion d'un sens dans l'autre (« thé » vs « thé vert »).
 */
function distinct(meanings) {
  const n = meanings.map(norm).filter(Boolean);
  if (n.length !== meanings.length) return false;
  for (let i = 0; i < n.length; i++)
    for (let j = i + 1; j < n.length; j++)
      if (n[i] === n[j] || n[i].includes(n[j]) || n[j].includes(n[i])) return false;
  return true;
}

/** Les hanzi d'un lot doivent être distincts et ne pas s'emboîter (中国 / 中国梦). */
function distinctHanzi(list) {
  for (let i = 0; i < list.length; i++)
    for (let j = i + 1; j < list.length; j++)
      if (list[i] === list[j] || list[i].includes(list[j]) || list[j].includes(list[i])) return false;
  return true;
}

const TONE_MAP = {
  'ā':'á','á':'ǎ','ǎ':'à','à':'ā','ē':'é','é':'ě','ě':'è','è':'ē',
  'ī':'í','í':'ǐ','ǐ':'ì','ì':'ī','ō':'ó','ó':'ǒ','ǒ':'ò','ò':'ō',
  'ū':'ú','ú':'ǔ','ǔ':'ù','ù':'ū','ǖ':'ǘ','ǘ':'ǚ','ǚ':'ǜ','ǜ':'ǖ',
};

/**
 * Caractères à lectures multiples.
 *
 * L'index `READINGS` ne connaît que les lectures présentes dans le
 * dictionnaire HSK. 拉 y figure en lā seulement, mais se lit aussi lá dans
 * l'usage courant : déclarer « lá » faux serait une faute d'énoncé. On écarte
 * donc à la main les 多音字 fréquents dès qu'ils sont employés seuls, la
 * combinaison à deux caractères levant presque toujours l'ambiguïté.
 */
const DUOYINZI = new Set([...(
  '为长行乐了着重还差调将种相应少数多好教发和地得的没干背朝觉曲恶' +
  '中处传倒担当分缝供度尽空累量宁强曾扇盛似缩挑投吐系吓鲜血要扎' +
  '占便藏尝称冲畜创刺打弹否服更刮冠号喝横华划几假间角结解禁劲' +
  '露率落埋模难排刨喷片漂朴期奇强切圈雀塞散丧扫色刹厦舍参' +
  '拉溜遛抹磨弄哪那泊铺卡壳咳咖调重'
).replace(/[^一-鿿]/g, '')]);

/**
 * Décale d'un cran le ton de la dernière syllabe marquée.
 *
 * Renvoie null si le pinyin obtenu est une lecture attestée du même hanzi, ou
 * si le hanzi est un 多音字 connu employé seul : on ne veut pas déclarer
 * « faux » une prononciation qui existe.
 */
function corruptTone(pinyin, hanzi) {
  if (hanzi.length === 1 && DUOYINZI.has(hanzi)) return null;
  const chars = [...pinyin];
  for (let i = chars.length - 1; i >= 0; i--) {
    if (TONE_MAP[chars[i]]) {
      const out = [...chars.slice(0, i), TONE_MAP[chars[i]], ...chars.slice(i + 1)].join('');
      const known = READINGS.get(hanzi);
      if (known && known.has(out.replace(/\s+/g, '').toLowerCase())) return null;
      return out;
    }
  }
  return null;
}

// ─── Matériau d'une leçon ────────────────────────────────────────────────────
/** Mots enseignés par la leçon, dédoublonnés, dans l'ordre d'apparition. */
function taughtItems(lessonId) {
  const seen = new Set(); const out = [];
  for (const sec of SECTIONS[lessonId] ?? [])
    for (const it of sec.items ?? []) {
      if (!it?.hanzi || seen.has(it.hanzi) || !HAN.test(it.hanzi)) continue;
      seen.add(it.hanzi);
      out.push({
        hanzi: it.hanzi,
        pinyin: it.pinyin ?? BY_HANZI.get(it.hanzi)?.pinyin ?? '',
        fr: clean(it.meaning),
        en: clean(it.meaningEn || it.meaning),
      });
    }
  return out;
}

/** Texte de tous les exercices existants — sert à repérer le vocab orphelin. */
const blobOf = list => list
  .map(e => [e.prompt, e.promptEn, e.explanation, e.explanationEn, e.sentence,
             ...(e.choices ?? []), ...(e.choicesEn ?? [])].join(' '))
  .join(' ');

/**
 * Phrase d'exemple exploitable pour un trou.
 * Contraintes : le mot doit y figurer une seule fois (sinon le trou est
 * ambigu), la phrase doit être une vraie phrase (assez longue, pas une
 * collocation nue) et rester lisible sur mobile.
 */
function clozeSource(hanzi) {
  const entry = BY_HANZI.get(hanzi);
  if (!entry?.examples?.length) return null;
  for (const ex of entry.examples) {
    const zh = String(ex.hanzi ?? '');
    if (!zh || zh.length < hanzi.length + 3 || zh.length > 18) continue;
    if (zh.split(hanzi).length !== 2) continue;              // exactement une occurrence
    if (!ex.translation || !ex.translationEn) continue;
    // « 先...接着... » est un schéma de construction, pas une phrase : ni son
    // audio ni sa traduction ne se comportent comme celles d'un énoncé.
    if (/[.．…]/.test(zh)) continue;
    // ~218 exemples du dictionnaire ont une traduction anglaise laissée à
    // moitié en chinois. Elles passeraient telles quelles dans l'interface EN.
    if (HAN.test(ex.translationEn) || HAN.test(ex.translation)) continue;
    return { zh, fr: ex.translation, en: ex.translationEn, entry };
  }
  return null;
}

/**
 * Distracteurs pour un trou : même catégorie grammaticale (donc
 * syntaxiquement plausibles), thème différent (donc sémantiquement exclus),
 * niveau accessible au palier de la leçon, et absents de la phrase.
 */
function clozeDistractors(entry, sentence, tier, n = 3) {
  const pool = BY_CATEGORY.get(entry.category) ?? [];
  const out = [];
  for (const cand of shuffle(pool)) {
    if (out.length >= n) break;
    if (cand.hanzi === entry.hanzi) continue;
    if (cand.theme === entry.theme) continue;
    if ((LEVEL_RANK[cand.level] ?? 9) > tier) continue;
    if (cand.hanzi.length > 3 || !ONLY_HAN.test(cand.hanzi)) continue;
    if (sentence.includes(cand.hanzi)) continue;
    if (out.some(o => o.hanzi === cand.hanzi)) continue;
    if (!distinct([entry.translation, ...out.map(o => o.translation), cand.translation])) continue;
    out.push(cand);
  }
  return out.length === n ? out : null;
}

// ─── Fabriques ───────────────────────────────────────────────────────────────
const made = { translation: 0, mcq: 0, fill: 0, pairError: 0, toneError: 0 };

function fTranslation(id, target, others) {
  const pool = others.filter(o => o.fr && o.en);
  if (pool.length < 3) return null;
  const d = shuffle(pool).slice(0, 3);
  if (!distinct([target.fr, ...d.map(x => x.fr)])) return null;
  if (!distinct([target.en, ...d.map(x => x.en)])) return null;
  if (!distinctHanzi([target.hanzi, ...d.map(x => x.hanzi)])) return null;

  const opts = shuffle([target, ...d]);
  const correctIndex = opts.indexOf(target);
  const confus = d[0];
  made.translation++;
  return {
    id, type: 'translation',
    prompt: `Comment dit-on « ${target.fr} » en chinois ?`,
    promptEn: `How do you say «${target.en}» in Chinese?`,
    choices: opts.map(o => o.hanzi),
    choicesEn: [],
    correctIndex,
    explanation: `**${target.hanzi}** (${target.pinyin}) = ${bare(target.fr)}. À ne pas confondre avec ${confus.hanzi} (${bare(confus.fr)}).`,
    explanationEn: `**${target.hanzi}** (${target.pinyin}) = ${bare(target.en)}. Not to be confused with ${confus.hanzi} (${bare(confus.en)}).`,
  };
}

function fMeaningAudio(id, target, others) {
  const pool = others.filter(o => o.fr && o.en);
  if (pool.length < 3) return null;
  const d = shuffle(pool).slice(0, 3);
  if (!distinct([target.fr, ...d.map(x => x.fr)])) return null;
  if (!distinct([target.en, ...d.map(x => x.en)])) return null;

  const opts = shuffle([target, ...d]);
  const correctIndex = opts.indexOf(target);
  made.mcq++;
  return {
    id, type: 'mcq',
    prompt: `Écoute puis lis : que signifie ${target.hanzi} (${target.pinyin}) ?`,
    promptEn: `Listen, then read: what does ${target.hanzi} (${target.pinyin}) mean?`,
    choices: opts.map(o => o.fr),
    choicesEn: opts.map(o => o.en),
    correctIndex,
    explanation: `${target.hanzi} (${target.pinyin}) = ${bare(target.fr)}.`,
    explanationEn: `${target.hanzi} (${target.pinyin}) = ${bare(target.en)}.`,
    // Une entrée comme « 跟...相比 » n'a pas de fichier audio : les points de
    // suspension ne font pas partie du mot. On ne pose le bouton 🔊 que là où
    // il jouera vraiment le bon enregistrement.
    ...(ONLY_HAN.test(target.hanzi) && hasAudio(target.hanzi)
      ? { audioHanzi: target.hanzi }
      : (ONLY_HAN.test(target.hanzi) && noAudio.add(target.hanzi), {})),
  };
}

function fFill(id, target, tier) {
  const src = clozeSource(target.hanzi);
  if (!src) return null;
  const d = clozeDistractors(src.entry, src.zh, tier, 3);
  if (!d) return null;

  const opts = shuffle([{ hanzi: target.hanzi }, ...d.map(x => ({ hanzi: x.hanzi }))]);
  const correctIndex = opts.findIndex(o => o.hanzi === target.hanzi);
  made.fill++;
  // Pas d'audioHanzi ici : la phrase complète contient la réponse.
  return {
    id, type: 'fill',
    prompt: 'Complète la phrase avec le mot qui convient.',
    promptEn: 'Complete the sentence with the right word.',
    choices: opts.map(o => o.hanzi),
    choicesEn: [],
    correctIndex,
    sentence: src.zh.replace(target.hanzi, '____'),
    sentenceFr: src.fr,
    sentenceEn: src.en,
    explanation: `${src.zh} — ${stop(src.fr)} ${target.hanzi} (${target.pinyin}) = ${bare(target.fr)}.`,
    explanationEn: `${src.zh} — ${stop(src.en)} ${target.hanzi} (${target.pinyin}) = ${bare(target.en)}.`,
  };
}

/** Mots pleins d'une traduction, pour mesurer si deux sens se recoupent. */
const contentWords = s => new Set(
  String(s ?? '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .split(/[^a-z]+/).filter(w => w.length > 3));

function fPairError(id, targets) {
  // Cinq mots ayant chacun une phrase d'exemple courte et traduite : quatre
  // s'affichent, le cinquième prête sa traduction à l'intrus.
  //
  // La version précédente empruntait la traduction à l'une des quatre lignes
  // affichées : la même traduction apparaissait deux fois et se repérait sans
  // lire un caractère de chinois. Le donneur doit rester hors écran.
  const usable = [];
  for (const t of targets) {
    const s = clozeSource(t.hanzi);
    if (s && s.zh.length <= 14) usable.push({ t, s });
    if (usable.length === 5) break;
  }
  if (usable.length < 5) return null;
  const shown = usable.slice(0, 4);
  const donor = usable[4];
  if (!distinctHanzi([...shown.map(u => u.s.zh), donor.s.zh])) return null;

  const wrongPos = Math.floor(rnd() * 4);
  const victim = shown[wrongPos];
  // La traduction empruntée doit être franchement autre, sinon « faux » se
  // discute : on exige qu'elle ne partage aucun mot plein avec la vraie.
  const a = contentWords(victim.s.fr), b = contentWords(donor.s.fr);
  if (!a.size || !b.size) return null;
  for (const w of a) if (b.has(w)) return null;

  const choices = shown.map((u, i) => `${u.s.zh} — ${i === wrongPos ? donor.s.fr : u.s.fr}`);
  const choicesEn = shown.map((u, i) => `${u.s.zh} — ${i === wrongPos ? donor.s.en : u.s.en}`);
  made.pairError++;
  return {
    id, type: 'error-correction',
    prompt: 'Une seule de ces traductions est fausse. Laquelle ?',
    promptEn: 'Only one of these translations is wrong. Which one?',
    choices, choicesEn,
    correctIndex: wrongPos,
    sentence: 'Phrases et traductions',
    explanation: `${victim.s.zh} veut dire « ${bare(victim.s.fr)} ». La traduction affichée est en réalité celle de ${donor.s.zh}.`,
    explanationEn: `${victim.s.zh} means «${bare(victim.s.en)}». The translation shown actually belongs to ${donor.s.zh}.`,
  };
}

function fToneError(id, targets) {
  // Toutes les lignes affichées sont données pour justes : on n'y met que des
  // transcriptions confirmées par le dictionnaire. Sans ce contrôle, une
  // coquille des sections (朋友 noté « péngyòu » au lieu de « péngyou ») serait
  // présentée à l'apprenant comme la bonne réponse.
  const usable = targets.filter(t => {
    if (!t.pinyin || !/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/.test(t.pinyin)) return false;
    const ref = BY_HANZI.get(t.hanzi)?.pinyin;
    return !!ref && norm(ref) === norm(t.pinyin);
  });
  if (usable.length < 4) return null;
  const four = shuffle(usable).slice(0, 4);
  const wrongPos = Math.floor(rnd() * 4);
  const bad = corruptTone(four[wrongPos].pinyin, four[wrongPos].hanzi);
  if (!bad) return null;

  const choices = four.map((t, i) => `${t.hanzi} — ${i === wrongPos ? bad : t.pinyin}`);
  made.toneError++;
  return {
    id, type: 'error-correction',
    prompt: 'Une seule transcription est fausse. Repère le ton incorrect.',
    promptEn: 'One transcription is wrong. Spot the incorrect tone.',
    choices, choicesEn: [],
    correctIndex: wrongPos,
    sentence: 'Hanzi et pinyin',
    explanation: `${four[wrongPos].hanzi} se lit **${four[wrongPos].pinyin}**, pas ${bad}. Changer le ton change le mot : c'est la première cause de malentendu à l'oral.`,
    explanationEn: `${four[wrongPos].hanzi} reads **${four[wrongPos].pinyin}**, not ${bad}. Changing the tone changes the word — the number one cause of misunderstanding when speaking.`,
  };
}

// ─── Boucle principale ───────────────────────────────────────────────────────
const report = { lessons: 0, added: 0, byType: {}, coverageBefore: 0, coverageAfter: 0, taught: 0 };
const additions = {};

for (const lessonId of Object.keys(CONTENT)) {
  const existing = EXERCISES[lessonId] ?? [];
  const items = taughtItems(lessonId);
  if (!items.length) continue;

  const blob = blobOf(existing);
  const covered = new Set(items.filter(i => blob.includes(i.hanzi)).map(i => i.hanzi));
  report.taught += items.length;
  report.coverageBefore += covered.size;

  // Deux exigences indépendantes : remplir la leçon jusqu'au plancher, et
  // faire retravailler le vocabulaire orphelin. On produit tant que l'une des
  // deux n'est pas satisfaite, sans dépasser le plafond.
  const tier = lessonTier(lessonId);
  const stillOrphan = items.filter(i => !covered.has(i.hanzi));
  const covGoal = Math.ceil(items.length * COVERAGE_TARGET);
  const floorGoal = Math.max(0, FLOOR - existing.length);

  const out = [];
  const used = new Set(existing.map(e => e.id));
  let n = 0;
  const nextId = () => { let k; do { k = `${lessonId}-gen${++n}`; } while (used.has(k)); used.add(k); return k; };
  const done = () => out.length >= floorGoal
    && (covered.size >= covGoal || !stillOrphan.length);

  // Ordre des fabriques : on alterne pour garantir la variété des types plutôt
  // que d'empiler des QCM parce que c'est la fabrique la plus permissive. Une
  // fois le plancher atteint, on privilégie translation et mcq, qui exposent
  // quatre mots enseignés par question là où le trou n'en travaille qu'un.
  //
  // La rotation porte sur le nombre de TENTATIVES, pas sur le nombre de
  // réussites : une leçon dont le vocabulaire est absent du dictionnaire
  // (noms propres, 鲁迅, 狂人日记…) faisait échouer la fabrique « fill » à
  // chaque tour, et comme l'index ne bougeait pas, les quatre autres
  // fabriques n'étaient jamais essayées. Ces leçons repartaient à zéro ajout.
  // Une leçon de prononciation qui se teste à l'œil est un contresens : on y
  // fait passer d'abord les fabriques qui portent un son (mcq audio) ou qui
  // portent sur le ton lui-même.
  const isPhon = CONTENT[lessonId]?.category === 'pronunciation';
  const wheel = isPhon
    ? ['toneError', 'mcq', 'fill', 'translation', 'pairError']
    : ['fill', 'translation', 'pairError', 'mcq', 'toneError'];
  const covWheel = isPhon
    ? ['mcq', 'toneError', 'translation']
    : ['translation', 'pairError', 'mcq'];
  // Sans plafond par fabrique, une leçon en manque de couverture recevait six
  // « Comment dit-on… ? » d'affilée : la variété qu'on vient de gagner se
  // reperdrait à l'usage.
  const PER_KIND = 4;
  const kindCount = {};
  let guard = 0, spin = 0;
  while (!done() && out.length < CEILING - existing.length && guard++ < 80) {
    const w = out.length < floorGoal ? wheel : covWheel;
    const kind = w[spin++ % w.length];
    if ((kindCount[kind] ?? 0) >= PER_KIND) continue;
    const pool = stillOrphan.length ? stillOrphan : items;
    let ex = null;

    if (kind === 'pairError') ex = fPairError(nextId(), shuffle(pool.length >= 5 ? pool : items));
    else if (kind === 'toneError') ex = fToneError(nextId(), pool.length >= 4 ? pool : items);
    else {
      const focus = pickOne(pool);
      const others = items.filter(i => i.hanzi !== focus.hanzi);
      if (kind === 'fill') ex = fFill(nextId(), focus, tier);
      else if (kind === 'translation') ex = fTranslation(nextId(), focus, others);
      else ex = fMeaningAudio(nextId(), focus, others);
    }
    if (!ex) { used.delete(`${lessonId}-gen${n}`); n--; continue; }

    // Un item déjà produit à l'identique (même type, même bonne réponse)
    // n'apprend rien de plus.
    const sig = ex.type + '|' + ex.choices[ex.correctIndex] + '|' + (ex.sentence ?? '');
    if (out.some(o => o.type + '|' + o.choices[o.correctIndex] + '|' + (o.sentence ?? '') === sig)) {
      used.delete(`${lessonId}-gen${n}`); n--; continue;
    }

    out.push(ex);
    kindCount[kind] = (kindCount[kind] ?? 0) + 1;
    const seen = [ex.prompt, ex.explanation, ex.sentence ?? '', ...ex.choices].join(' ');
    for (const w of [...stillOrphan])
      if (seen.includes(w.hanzi)) { stillOrphan.splice(stillOrphan.indexOf(w), 1); covered.add(w.hanzi); }
  }

  if (!out.length) continue;
  additions[lessonId] = out;
  report.lessons++;
  report.added += out.length;
  for (const e of out) report.byType[e.type] = (report.byType[e.type] ?? 0) + 1;

  const after = new Set(covered);
  const blob2 = blobOf(out);
  for (const i of items) if (blob2.includes(i.hanzi)) after.add(i.hanzi);
  report.coverageAfter += after.size;
}

// Leçons non touchées : leur couverture reste celle d'avant.
for (const lessonId of Object.keys(CONTENT)) {
  if (additions[lessonId]) continue;
  const items = taughtItems(lessonId);
  if (!items.length) continue;
  const blob = blobOf(EXERCISES[lessonId] ?? []);
  report.coverageAfter += items.filter(i => blob.includes(i.hanzi)).length;
}

console.log('leçons complétées :', report.lessons);
console.log('exercices ajoutés :', report.added, JSON.stringify(report.byType));
console.log(`reprise du vocabulaire : ${(report.coverageBefore / report.taught * 100).toFixed(0)} % → ${(report.coverageAfter / report.taught * 100).toFixed(0)} %`);
if (noAudio.size) console.log(`sans enregistrement (bouton 🔊 non posé) : ${noAudio.size} mots — candidats à une génération Azure`);
fs.writeFileSync(path.join(ROOT, 'scripts/enrich-exercises-missing-audio.json'),
  JSON.stringify([...noAudio].sort(), null, 1));

fs.writeFileSync(path.join(ROOT, 'scripts/enrich-exercises-additions.json'),
  JSON.stringify(additions, null, 1));
console.log('\nécrit : scripts/enrich-exercises-additions.json');
if (DRY) { console.log('(--dry : cecrExercises.ts non modifié)'); process.exit(0); }

// ─── Réécriture de data/cecrExercises.ts ─────────────────────────────────────
// Le fichier porte « Auto-generated — DO NOT EDIT » : on le régénère en entier
// plutôt que d'y insérer des blocs à la main. L'en-tête et les types sont
// conservés tels quels, seul le littéral EXERCISES est reconstruit.
const FIELDS = [
  'id', 'type', 'prompt', 'promptEn', 'choices', 'choicesEn', 'correctIndex',
  'sentence', 'sentenceFr', 'sentenceEn', 'explanation', 'explanationEn',
  'context', 'contextEn', 'audioHanzi', 'dialogue', 'steps',
];
const s = v => JSON.stringify(v);

function serializeExercise(e, pad) {
  const lines = [];
  for (const k of FIELDS) {
    if (e[k] === undefined) continue;
    lines.push(`${pad}  ${k}: ${s(e[k])},`);
  }
  // Un champ inattendu vaut mieux recopié que perdu silencieusement.
  for (const k of Object.keys(e)) if (!FIELDS.includes(k)) lines.push(`${pad}  ${k}: ${s(e[k])},`);
  return `${pad}{\n${lines.join('\n')}\n${pad}}`;
}

/**
 * Corrections d'exercices existants.
 *
 * Quatre QCM proposaient deux fois la même option. Dans trois cas c'était un
 * distracteur en double — gênant sans être bloquant. Dans le quatrième
 * (`cecr-b12-nuances-m6-err1`) l'option dupliquée ÉTAIT la bonne réponse :
 * l'apprenant qui cliquait la première des deux étiquettes identiques était
 * compté faux. Les corrections vivent ici plutôt que dans le fichier généré,
 * sinon la prochaine régénération les effacerait.
 */
const PATCHES = {
  // 虽然 figurait deux fois. Remplacé par 只有, qui forme le couple 只有…才 —
  // le contraste exact que la leçon veut faire sentir avec 只要…就.
  'cecr-b22-conv-m2-mcq3': e => ({
    ...e,
    choices: e.choices.map((c, i) => (i === 3 && c === '虽然' ? '只有' : c)),
    explanation: '只要…就… = du moment que (condition suffisante). 只有…才… serait « seulement si » (condition nécessaire) : 只有你来，我才请客.',
    explanationEn: '只要…就… = as long as (sufficient condition). 只有…才… would be «only if» (necessary condition): 只有你来，我才请客.',
  }),
  // 昧 en double. 失 donne 冒失 (imprudent, cavalier), un vrai mot du même
  // paradigme : le distracteur devient instructif au lieu d'être inerte.
  'cecr-c11-conv-m2-fill2': e => ({
    ...e,
    choices: e.choices.map((c, i) => (i === 2 && c === '昧' ? '失' : c)),
    explanation: '冒昧 (màomèi) = oser, se permettre. Adoucisseur de demande formelle. Attention à 冒失 (màoshī), qui veut dire « cavalier, imprudent » — le contraire de l\'effet recherché.',
    explanationEn: '冒昧 (màomèi) = to take the liberty of. A formal request softener. Careful with 冒失 (màoshī), «rash, tactless» — the opposite of the intended effect.',
  }),
  // Les segments 时 apparaissaient deux fois, dont la bonne réponse. Reformulé
  // en choix de formulations complètes : le point enseigné (时 nu contre
  // 的时候 / 小时候) est le même, mais la question devient répondable.
  'cecr-b12-nuances-m6-err1': e => ({
    ...e,
    type: 'error-correction',
    prompt: 'Une de ces formulations sonne pédante à l\'oral. Laquelle ?',
    promptEn: 'One of these sounds stilted in speech. Which one?',
    choices: ['我小时，我喜欢玩', '在我小的时候，我喜欢玩', '小时候我喜欢玩', '我小时候喜欢玩'],
    choicesEn: [],
    correctIndex: 0,
    sentence: 'Quand j\'étais petit, j\'aimais jouer',
    explanation: '**时** employé seul relève de l\'écrit soutenu. À l\'oral on dit 小时候 (le plus courant) ou 在…的时候. Les trois autres formulations sont naturelles.',
    explanationEn: 'Bare **时** belongs to formal writing. In speech you say 小时候 (most common) or 在…的时候. The other three are all natural.',
  }),
  // 治 listé deux fois parmi huit segments. On ne garde qu'une occurrence :
  // la question porte sur 道, les doublons n'ajoutaient rien.
  'cecr-c21-nuances-m1-err1': e => ({
    ...e,
    choices: ['儒家', '提倡', '礼', '道', '治', '天下'],
    correctIndex: 3,
  }),

  // ── Trous dont la réponse était visible ailleurs dans la phrase ───────────
  // Le caractère à trouver figurait dans un autre mot du même énoncé (方 dans
  // 方案, 喜 dans 恭喜, 吃 dans 吃到饱, 行 dans 执行). L'exercice se résolvait
  // en recopiant, sans rien comprendre. On change la phrase, pas le point
  // enseigné.
  'cecr-b21-conv-m4-fill2': e => ({
    ...e,
    sentence: '我们应该找到双___都能接受的办法。',
    sentenceFr: 'Nous devons trouver une solution acceptable des deux côtés.',
    sentenceEn: 'We must find a solution both sides accept.',
  }),
  'cecr-b22-conv-m1-fill1': e => ({
    ...e,
    prompt: 'Tu félicites chaleureusement un ami pour sa promotion :',
    // Le redoublement 恭喜恭喜 mettait forcément 喜 sous les yeux. On garde le
    // point de langue dans la correction et on pose le trou sur une phrase où
    // le caractère n'apparaît qu'une fois.
    sentence: '听说你升职了，恭___你！',
    sentenceFr: 'J\'ai appris ta promotion, félicitations !',
    sentenceEn: 'I heard about your promotion, congratulations!',
    explanation: '恭喜 (gōngxǐ) = féliciter. À l\'oral on le redouble volontiers — 恭喜恭喜 — pour rendre la formule chaleureuse ; le redoublement des formules de politesse est très idiomatique en chinois.',
    explanationEn: '恭喜 (gōngxǐ) = to congratulate. In speech it is often doubled — 恭喜恭喜 — to sound warm; reduplicating set courtesy phrases is highly idiomatic in Chinese.',
  }),
  // 问 se lisait dans 问题, juste à côté du trou.
  'cecr-b12-narr-m3-fill-2': e => ({
    ...e,
    sentence: '老师___了我们一个难题。',
    sentenceFr: 'Le professeur nous a posé une question difficile.',
    sentenceEn: 'The teacher asked us a hard question.',
    explanation: '« Poser une question » = 问. 告诉 introduit une information donnée, 回答 est la réponse, 说 ne se construit pas avec un destinataire direct.',
    explanationEn: '«To ask a question» = 问. 告诉 introduces information given, 回答 is the reply, and 说 does not take a direct addressee.',
  }),
  'cecr-c22-conv-m3-fill1': e => ({
    ...e,
    sentence: '这波操作让___瓜群众大开眼界。',
    sentenceFr: 'Ce coup-là en a mis plein la vue aux badauds du web.',
    sentenceEn: 'That move was quite the eye-opener for the online onlookers.',
  }),
  'cecr-c22-conv-m7-fill2': e => ({
    ...e,
    sentence: '___了，按方案A来。',
    sentenceFr: 'Ça marche, on part sur la solution A.',
    sentenceEn: 'Fine, let\'s go with option A.',
  }),
};

const merged = {};
let patched = 0;
const applyPatch = e => {
  if (!PATCHES[e.id]) return e;
  patched++;
  return PATCHES[e.id](e);
};
for (const [id, list] of Object.entries(EXERCISES))
  merged[id] = [...list.map(applyPatch), ...(additions[id] ?? [])];
for (const [id, list] of Object.entries(additions)) if (!merged[id]) merged[id] = [...list];
console.log('exercices corrigés :', patched, '/', Object.keys(PATCHES).length);

const body = Object.entries(merged)
  .map(([id, list]) => `  ${s(id)}: [\n${list.map(e => serializeExercise(e, '    ')).join(',\n')}\n  ]`)
  .join(',\n');

const file = path.join(ROOT, 'data/cecrExercises.ts');
const src = fs.readFileSync(file, 'utf8');
const head = src.slice(0, src.indexOf('export const EXERCISES'));
fs.writeFileSync(file, `${head}export const EXERCISES: Record<string, Exercise[]> = {\n${body},\n};\n`);
console.log('réécrit : data/cecrExercises.ts');
