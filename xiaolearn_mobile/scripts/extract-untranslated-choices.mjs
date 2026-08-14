/**
 * extract-untranslated-choices.mjs
 * --------------------------------
 * Recense les propositions de QCM qui restent en français quand l'interface
 * est en anglais, et prépare leur traduction.
 *
 * ## Le défaut
 *
 * `pick(ex.choices, ex.choicesEn)` retombe sur le français dès que
 * `choicesEn` est vide. C'est voulu — la plupart des choix sont du chinois,
 * identique dans les deux langues. Mais quand les propositions sont des
 * phrases françaises, l'anglophone lit une question en anglais suivie de
 * quatre réponses en français.
 *
 * ## Ce que le script sépare, et pourquoi c'est le point délicat
 *
 * « Contient des lettres latines » ne veut pas dire « à traduire ». Trois
 * familles sont légitimement identiques dans les deux langues :
 *
 *   - le pinyin seul (`mā`, `zhèngzài`) ;
 *   - les couples `汉字 — pinyin` ;
 *   - les nombres, symboles et noms propres.
 *
 * Les traduire serait au mieux inutile, au pire faux. On ne retient donc que
 * ce qui contient un mot français reconnaissable hors pinyin.
 *
 * ## Récupération avant traduction
 *
 * Le corpus contient déjà 437 exercices avec un `choicesEn` complet. Beaucoup
 * de propositions se répètent d'une leçon à l'autre — les quatre tons, les
 * intitulés d'initiales… On récolte donc d'abord ces couples FR → EN
 * existants : ils fournissent la traduction ET la formulation déjà retenue,
 * ce qui vaut mieux qu'une variante synonyme introduite au fil des lots.
 *
 * Produit `scripts/untranslated-choices.json` :
 *   { known: {fr: en}, todo: [fr…], stats: {…} }
 *
 * Usage : node scripts/extract-untranslated-choices.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function literal(file, name) {
  const src = fs.readFileSync(path.join(ROOT, file), 'utf8');
  const start = src.indexOf('{', src.indexOf('= {', src.indexOf(name)));
  let d = 0, i = start, q = null, esc = false;
  for (; i < src.length; i++) {
    const c = src[i];
    if (esc) { esc = false; continue; }
    if (c === '\\') { esc = true; continue; }
    if (q) { if (c === q) q = null; continue; }
    if (c === '"' || c === "'" || c === '`') { q = c; continue; }
    if (c === '{' || c === '[') d++;
    else if (c === '}' || c === ']') { d--; if (!d) { i++; break; } }
  }
  return src.slice(start, i);
}
const EXERCISES = (await import('data:text/javascript;base64,' + Buffer.from(
  `export default ${literal('data/cecrExercises.ts', 'EXERCISES')};`).toString('base64'))).default;

/**
 * Départager français et pinyin est le vrai piège de ce script : leurs
 * diacritiques se recouvrent largement. `é`, `è`, `à` et `ù` existent dans les
 * deux — « pèiòu » n'est pas du français.
 *
 * On s'appuie donc sur ce qui n'appartient qu'à l'un :
 *   - français seul : â ç ê ë î ï ô û œ æ ;
 *   - pinyin seul   : les macrons et carons ā ē ī ō ū ǎ ě ǐ ǒ ǔ ǖ ǘ ǚ ǜ ń ň ǹ.
 * Et, à défaut, sur les mots-outils français, qu'aucune syllabe de pinyin ne
 * produit.
 */
const FRENCH_ONLY = /[âçêëîïôûœæ]/i;
const PINYIN_ONLY = /[āēīōūǎěǐǒǔǖǘǚǜńňǹ]/;
const FRENCH_MARKERS = /\b(le|la|les|un|une|des|du|de|au|aux|et|ou|est|sont|ce|cette|ces|qui|que|quoi|pour|avec|sans|dans|sur|plus|moins|très|tout|tous|toute|pas|ne|on|il|elle|nous|vous|ils|elles|son|sa|ses|leur|mon|ma|mes|ton|ta|tes|par|en|se|si|mais|donc|car|quand|comme|aussi|même|entre|vers|chez|après|avant|depuis|jusqu|faire|dire|aller|voir|avoir|être|peut|doit|faut|oral|écrit|formel|familier|sens|verbe|nom|action|état)\b/i;

/** Forme « 汉字 — pinyin », très fréquente et identique dans les deux langues. */
const HANZI_PINYIN = /^[一-鿿…\s]+[—–-]\s*[a-zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüńňǹ\s'·]+$/i;

/**
 * Mots français courts, sous le seuil de trois lettres.
 *
 * Le premier jet exigeait une suite d'au moins trois lettres pour considérer
 * qu'il y avait du texte. « où », « ça », « il », « ou » passaient donc pour
 * des données neutres et étaient recopiés tels quels : quatre exercices se
 * retrouvaient avec une proposition en français dans l'interface anglaise,
 * dont deux fois sur la bonne réponse.
 */
const FRENCH_SHORT = /(^|[^a-zà-ÿ])(où|ça|çà|là|il|ils|elle|ou|et|un|une|le|la|les|de|du|des|au|ne|se|si|ma|ta|sa|mon|ton|son|en|par|sur|pas|que|qui|est|ai|as|va|vas|es)([^a-zà-ÿ]|$)/i;

/**
 * Autres mots français courts, hors mots-outils : noms et adjectifs de trois à
 * quatre lettres qu'un seuil de longueur laisse passer. « Été (夏天) »,
 * « Jus (果汁) », « nez », « Ami » étaient recopiés tels quels — parfois sur la
 * bonne réponse, au milieu de trois distracteurs traduits, ce qui la désignait.
 */
const FRENCH_SHORT_WORDS = /\b(ami|amie|cri|nez|jus|thé|feu|eau|riz|été|hier|gros|ici|oui|non|mer|ciel|nuit|jour|main|pied|bras|dos|dent|lit|clé|sac|rue|pont|parc|toit|mur|air|vent|pluie|neige|froid|chaud|vieux|jeune|beau|laid|vrai|faux|haut|loin|près|tôt|tard|vite|lent)\b/i;

/**
 * Glose française accolée à du pinyin : « 喝 (hē, boire) », « 本 (běn, livres) ».
 *
 * Le diacritique de la transcription faisait classer la chaîne entière comme
 * neutre, et la glose restait en français. C'est le défaut qui a touché le plus
 * de bonnes réponses : quatre exercices d'écoute où seule la bonne option
 * restait française. On isole donc ce qui suit la virgule, dans la parenthèse
 * ou après le tiret, avant de juger.
 */
function glossPart(latin) {
  const m = latin.match(/\(([^)]*)\)|[—–]\s*(.+)$/);
  if (!m) return '';
  const inner = m[1] ?? m[2] ?? '';
  // « hē, boire » → on ne juge que « boire » ; « fricative » reste entier.
  return inner.includes(',') ? inner.slice(inner.indexOf(',') + 1) : inner;
}

/** La proposition est-elle du texte de langue, ou une donnée neutre ? */
function needsTranslation(choice) {
  const s = String(choice ?? '').trim();
  if (!s) return false;
  if (HANZI_PINYIN.test(s)) return false;

  // Une proposition contenant du chinois peut porter une glose française
  // (« 都有 (tout avoir) ») : on ne l'écarte pas sur le seul critère du hanzi.
  const latin = s.replace(/[一-鿿]/g, ' ').trim();
  if (!latin || !/[a-zA-ZÀ-ÿ]/.test(latin)) return false;

  if (FRENCH_ONLY.test(latin) || FRENCH_MARKERS.test(latin)
    || FRENCH_SHORT.test(latin) || FRENCH_SHORT_WORDS.test(latin)) return true;

  // Avant de conclure « c'est du pinyin », on regarde la glose séparément :
  // c'est elle qui porte le français, pas la transcription.
  const gloss = glossPart(latin);
  if (gloss && (FRENCH_ONLY.test(gloss) || FRENCH_MARKERS.test(gloss)
    || FRENCH_SHORT_WORDS.test(gloss)
    || (/[a-zA-ZÀ-ÿ]{4,}/.test(gloss) && !PINYIN_ONLY.test(gloss)))) return true;

  if (!/[a-zA-ZÀ-ÿ]{3,}/.test(latin)) return false;
  // Reste du pinyin ou des sigles : neutre.
  if (PINYIN_ONLY.test(latin)) return false;
  // Un mot d'au moins quatre lettres sans diacritique de pinyin : du texte.
  return /[a-zA-ZÀ-ÿ]{4,}/.test(latin);
}

// ── Glossaire : couples déjà traduits ailleurs dans le corpus ───────────────
const known = new Map();
const conflicts = new Map();
for (const list of Object.values(EXERCISES)) {
  for (const e of list) {
    if (!e.choicesEn?.length || e.choicesEn.length !== e.choices.length) continue;
    for (let i = 0; i < e.choices.length; i++) {
      const fr = String(e.choices[i]).trim();
      const en = String(e.choicesEn[i]).trim();
      if (!fr || !en || fr === en) continue;
      if (known.has(fr) && known.get(fr) !== en) {
        if (!conflicts.has(fr)) conflicts.set(fr, new Set([known.get(fr)]));
        conflicts.get(fr).add(en);
        continue;
      }
      known.set(fr, en);
    }
  }
}

// ── Recensement ─────────────────────────────────────────────────────────────
const todo = new Set();
const affected = [];
let neutral = 0;
for (const [lessonId, list] of Object.entries(EXERCISES)) {
  for (const e of list) {
    if (e.choicesEn?.length) continue;
    const need = e.choices.filter(needsTranslation);
    if (!need.length) { if (e.choices.some(c => /[a-zA-Z]{4,}/.test(String(c)))) neutral++; continue; }
    affected.push({ lessonId, id: e.id });
    for (const c of e.choices) {
      const s = String(c).trim();
      if (needsTranslation(s) && !known.has(s)) todo.add(s);
    }
  }
}

const out = {
  stats: {
    exercicesConcernes: affected.length,
    exercicesNeutresIgnores: neutral,
    chainesDistinctesATraduire: todo.size,
    chainesDejaConnues: known.size,
    conflits: conflicts.size,
  },
  known: Object.fromEntries([...known].sort()),
  todo: [...todo].sort((a, b) => a.localeCompare(b, 'fr')),
};

fs.writeFileSync(path.join(ROOT, 'scripts/untranslated-choices.json'), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out.stats, null, 2));
if (conflicts.size) {
  console.log(`\n${conflicts.size} chaîne(s) traduites de deux façons dans le corpus (première retenue) :`);
  for (const [fr, set] of [...conflicts].slice(0, 5)) console.log(`  « ${fr} » → ${[...set].join(' | ')}`);
}
console.log('\nécrit : scripts/untranslated-choices.json');
