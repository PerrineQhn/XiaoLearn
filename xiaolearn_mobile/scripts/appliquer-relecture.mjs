/**
 * appliquer-relecture — reporter dans les données les verdicts d'une relecture.
 *
 * Les relectures d'exercices produisent toutes le même objet : un identifiant,
 * un verdict, et selon le cas des choix à remplacer, une consigne à préciser ou
 * une explication à réécrire. Les appliquer à la main une campagne sur deux
 * avait déjà produit deux bugs — un index de bonne réponse déplacé, et une
 * version anglaise laissée derrière. D'où ce script, qui refuse toute
 * modification qui toucherait à la bonne réponse ou créerait un doublon.
 *
 * Usage : node scripts/appliquer-relecture.mjs /tmp/sfix1.json /tmp/sfix2.json …
 */
import fs from 'node:fs';
import path from 'node:path';

const racine = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const SOURCE = JSON.parse(fs.readFileSync('/tmp/tous.json', 'utf8'));
const PAR_ID = new Map(SOURCE.map(x => [x.id, x]));

/** Où vit chaque famille d'exercice, et comment ses champs s'y appellent. */
const FICHIERS = [
  { f: 'data/cecrExercises.ts', id: id => `id: ${JSON.stringify(id)},`,
    choix: 'choices:', choixEn: 'choicesEn:', index: 'correctIndex:',
    prompt: 'prompt:', promptEn: 'promptEn:', expl: 'explanation:', explEn: 'explanationEn:' },
  { f: 'data/cecrBilans.ts', id: id => `"id": ${JSON.stringify(id)}`,
    choix: '"choices"', choixEn: '"choicesEn"', index: '"correctIndex"',
    prompt: '"promptFr":', promptEn: '"promptEn":', expl: '"explanationFr":', explEn: '"explanationEn":' },
];

/**
 * Les questions de lecture ne sont pas des objets mais des appels
 * `lq(id, consigne, [choix], index, explication)`. On les traite à part, en
 * remplaçant argument par argument.
 */
function appliquerLecture(v, o) {
  const fichier = path.join(racine, 'data/cecrLectures.ts');
  let s = fs.readFileSync(fichier, 'utf8');
  const debut = s.indexOf(`lq('${v.id}'`);
  if (debut < 0) return false;
  // Fin de l'appel : la parenthèse fermante de même niveau.
  let prof = 0, fin = -1;
  for (let n = s.indexOf('(', debut); n < s.length; n++) {
    if (s[n] === '(') prof++;
    else if (s[n] === ')' && --prof === 0) { fin = n; break; }
  }
  let zone = s.slice(debut, fin + 1);

  if (v.remplacements && Object.keys(v.remplacements).length) {
    const b = zone.indexOf('['), e = zone.indexOf(']', b);
    const anciens = eval(zone.slice(b, e + 1));            // littéral TS, guillemets simples
    const neufs = [...anciens];
    for (const [k, val] of Object.entries(v.remplacements)) {
      const i = Number(k);
      if (i === o.bonne || !(i >= 0 && i < neufs.length)) return false;
      neufs[i] = val;
    }
    if (new Set(neufs).size !== neufs.length) return false;
    zone = zone.slice(0, b) + JSON.stringify(neufs) + zone.slice(e + 1);
  }
  if (v.prompt) {
    // 2e argument : entre la 1re et la 2e virgule de premier niveau.
    zone = zone.replace(/(lq\('[\w-]+',\s*)((?:'(?:[^'\\]|\\.)*')|(?:"(?:[^"\\]|\\.)*"))/,
      (_, a) => a + JSON.stringify(v.prompt));
  }
  const expl = v.explication ?? v.explanation;
  if (expl) {
    // dernier argument, juste avant la parenthèse fermante
    zone = zone.replace(/,\s*((?:'(?:[^'\\]|\\.)*')|(?:"(?:[^"\\]|\\.)*"))\s*\)$/,
      `, ${JSON.stringify(expl)})`);
  }
  fs.writeFileSync(fichier, s.slice(0, debut) + zone + s.slice(fin + 1));
  return true;
}

/**
 * Les dialogues ont leur source dans l'app web : corriger le fichier mobile
 * serait effacé au prochain export. On accumule donc les verdicts pour un
 * traitement à part.
 */
const DIALOGUES = [];
const SRC = new Map(FICHIERS.map(d => [d.f, fs.readFileSync(path.join(racine, d.f), 'utf8')]));

/** Bornes du tableau qui suit `nom`, en comptant les crochets. */
function bornesTableau(s, depuis, nom) {
  const k = s.indexOf(nom, depuis);
  if (k < 0 || k > depuis + 6000) return null;
  const i = s.indexOf('[', k);
  let prof = 0;
  for (let n = i; n < s.length; n++) {
    if (s[n] === '[') prof++;
    else if (s[n] === ']' && --prof === 0) return [i, n];
  }
  return null;
}

/** Remplace la valeur d'un champ chaîne, dans la fenêtre d'un exercice. */
function poserChaine(s, debut, fin, nom, valeur) {
  const re = new RegExp(`${nom.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*("(?:[^"\\\\]|\\\\.)*")`);
  const zone = s.slice(debut, fin);
  const m = zone.match(re);
  if (!m) return null;
  return s.slice(0, debut) + zone.replace(re, `${nom} ${JSON.stringify(valeur)}`) + s.slice(fin);
}

const compte = { choix: 0, consigne: 0, explication: 0, refus: [] };

for (const fichier of process.argv.slice(2)) {
  for (const v of JSON.parse(fs.readFileSync(fichier, 'utf8'))) {
    const o = PAR_ID.get(v.id);
    if (!o) { compte.refus.push([v.id, 'exercice inconnu']); continue; }

    if (v.id.startsWith('dlg-')) { DIALOGUES.push(v); continue; }
    if (o.type === 'lecture') {
      if (appliquerLecture(v, o)) compte.choix++;
      else compte.refus.push([v.id, 'question de lecture non modifiable']);
      continue;
    }
    const d = FICHIERS.find(d => SRC.get(d.f).includes(d.id(v.id)));
    if (!d) { compte.refus.push([v.id, 'introuvable dans les données']); continue; }
    let s = SRC.get(d.f);
    const debut = s.indexOf(d.id(v.id));
    // Fin de l'objet : l'accolade fermante de même indentation.
    const fin = Math.min(...['\n    },', '\n      },', '\n  },']
      .map(x => { const i = s.indexOf(x, debut); return i < 0 ? Infinity : i; }));

    // --- choix remplacés ---------------------------------------------------
    if (v.remplacements && Object.keys(v.remplacements).length) {
      const b = bornesTableau(s, debut, d.choix);
      if (!b) { compte.refus.push([v.id, 'tableau des choix introuvable']); continue; }
      const anciens = JSON.parse(s.slice(b[0], b[1] + 1).replace(/\n/g, ' '));
      const neufs = [...anciens];
      let bon = true;
      for (const [k, val] of Object.entries(v.remplacements)) {
        const i = Number(k);
        if (i === o.bonne) { compte.refus.push([v.id, 'viserait la bonne réponse']); bon = false; break; }
        if (!(i >= 0 && i < neufs.length)) { compte.refus.push([v.id, 'index hors bornes']); bon = false; break; }
        neufs[i] = val;
      }
      if (!bon) continue;
      if (new Set(neufs).size !== neufs.length) { compte.refus.push([v.id, 'créerait un doublon']); continue; }
      if (neufs[o.bonne] !== anciens[o.bonne]) { compte.refus.push([v.id, 'bonne réponse altérée']); continue; }
      s = s.slice(0, b[0]) + JSON.stringify(neufs) + s.slice(b[1] + 1);
      // La version anglaise recopie le chinois quand les choix sont chinois.
      const be = bornesTableau(s, debut, d.choixEn);
      if (be) {
        const en = JSON.parse(s.slice(be[0], be[1] + 1).replace(/\n/g, ' '));
        if (en.length === neufs.length && en.every((x, i) => x === anciens[i]))
          s = s.slice(0, be[0]) + JSON.stringify(neufs) + s.slice(be[1] + 1);
      }
      compte.choix++;
    }

    // --- consigne précisée -------------------------------------------------
    if (v.prompt) {
      const a = poserChaine(s, debut, fin, d.prompt, v.prompt);
      if (!a) { compte.refus.push([v.id, 'consigne introuvable']); continue; }
      s = a;
      if (v.promptEn) s = poserChaine(s, debut, fin, d.promptEn, v.promptEn) ?? s;
      compte.consigne++;
    }

    // --- explication réécrite ----------------------------------------------
    if (v.explication || v.explanation) {
      const fr = v.explication ?? v.explanation;
      const a = poserChaine(s, debut, fin, d.expl, fr);
      if (a) {
        s = a;
        if (v.explicationEn || v.explanationEn)
          s = poserChaine(s, debut, fin, d.explEn, v.explicationEn ?? v.explanationEn) ?? s;
        compte.explication++;
      } else compte.refus.push([v.id, 'explication introuvable']);
    }

    SRC.set(d.f, s);
  }
}

for (const [f, s] of SRC) fs.writeFileSync(path.join(racine, f), s);
if (DIALOGUES.length) {
  fs.writeFileSync('/tmp/dlg-a-corriger.json', JSON.stringify(DIALOGUES, null, 1));
  console.log(`${DIALOGUES.length} verdicts de dialogues mis de côté → /tmp/dlg-a-corriger.json`);
  console.log('   (leur source est xiaolearn_app ; corriger là-bas puis relancer export-dialogues-mobile.mjs)');
}
console.log(`choix remplacés ${compte.choix} · consignes précisées ${compte.consigne} · explications réécrites ${compte.explication}`);
if (compte.refus.length) {
  console.log(`refusés ${compte.refus.length} :`);
  for (const r of compte.refus) console.log('   ', r[0], '—', r[1]);
}
