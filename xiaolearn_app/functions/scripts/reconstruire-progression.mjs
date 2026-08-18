/**
 * reconstruire-progression — retrouver les leçons terminées après un écrasement.
 *
 * ## Ce qui s'est passé
 *
 * Trois clés du document utilisateur ont été remises à leur valeur par défaut
 * à la même milliseconde : `cl_completed_lessons` → `[]`,
 * `cl_flashcard_activity_v4` → `{}`, `cl_learning_stats_v1` → tout à zéro.
 * Un état vide poussé vers le cloud par un chemin de synchronisation qui
 * n'était pas protégé. Le correctif est dans `useFirestoreSync` (V19) ; ce
 * script s'occupe de la réparation des données déjà perdues.
 *
 * ## Pourquoi la reconstruction est possible
 *
 * La liste des leçons terminées n'est pas la seule trace d'une leçon faite.
 * Chaque exercice répondu laisse une entrée dans `cl_word_srs_v1` sous une
 * clé de la forme `cecr-a1-hello-m4:1:0` — identifiant de leçon, bloc,
 * exercice — et chaque leçon révisée laisse une entrée dans
 * `cl_lesson_mastery_v7`. Ces deux clés ont survécu. On en déduit les leçons
 * traversées, on ne garde que celles qui existent réellement au catalogue, et
 * on les réunit à ce qui reste dans `cl_completed_lessons`.
 *
 * ## Ce que le script ne fait jamais
 *
 * Il n'enlève rien. La liste écrite est l'UNION de l'existant et du
 * reconstruit : si une leçon est déjà là, elle y reste. Sans `--appliquer`,
 * il n'écrit rien du tout et se contente d'afficher ce qu'il ferait.
 *
 * ## Usage
 *
 *   node xiaolearn_app/functions/scripts/reconstruire-progression.mjs \
 *     --email p.quenn27@gmail.com              # simulation
 *   … --email … --appliquer                     # écriture réelle
 */
import { initializeApp, applicationDefault, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const lire = (nom) => { const i = args.indexOf(nom); return i >= 0 ? args[i + 1] : null; };
const email = lire('--email');
const appliquer = args.includes('--appliquer');
const PROJET = lire('--projet') ?? process.env.GOOGLE_CLOUD_PROJECT ?? 'xiaolearn-db9e6';

if (!email) {
  console.error('Usage : node reconstruire-progression.mjs --email <adresse> [--appliquer]');
  process.exit(1);
}

// --- catalogue de référence ---------------------------------------------------
// On ne restaure que des identifiants qui existent vraiment. Un identifiant
// hérité d'une ancienne version du cours ferait apparaître une leçon fantôme
// dans les compteurs, sans page derrière.
const racine = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const COURS = path.join(racine, 'src/data/cecr-course.ts');
const catalogue = new Set(
  (fs.readFileSync(COURS, 'utf8').match(/cecr-[a-z0-9]+-[a-z]+-m\d+/g) ?? [])
);
if (catalogue.size === 0) {
  console.error(`Catalogue introuvable ou vide : ${COURS}`);
  process.exit(1);
}

if (!getApps().length) initializeApp({ credential: applicationDefault(), projectId: PROJET });
const auth = getAuth();
const db = getFirestore();

const user = await auth.getUserByEmail(email);
const ref = db.doc(`users/${user.uid}`);
const snap = await ref.get();
if (!snap.exists) {
  console.error(`Aucun document pour ${email} (${user.uid}).`);
  process.exit(1);
}
const data = snap.data();

/** Les valeurs sont stockées sérialisées ; une clé absente ou illisible vaut vide. */
const json = (cle, defaut) => {
  const brut = data[cle];
  if (typeof brut !== 'string') return defaut;
  try { return JSON.parse(brut); } catch { return defaut; }
};

const dejaLa = json('cl_completed_lessons', []);
const srs = json('cl_word_srs_v1', {});
const maitrise = json('cl_lesson_mastery_v7', {});

// --- déduction ----------------------------------------------------------------
const deduites = new Set();
const ecarte = new Set();
const retenir = (id) => (catalogue.has(id) ? deduites.add(id) : ecarte.add(id));

// `cecr-a1-hello-m4:1:0` → la partie avant le premier deux-points.
for (const cle of Object.keys(srs)) {
  if (!cle.startsWith('cecr-')) continue;      // les autres sont des mots (hsk1-…, supp-…)
  retenir(cle.split(':')[0]);
}
for (const [cle, v] of Object.entries(maitrise)) retenir(v?.lessonId ?? cle);

const union = new Set([...dejaLa, ...deduites]);
const ajoutees = [...deduites].filter((id) => !dejaLa.includes(id));

// --- compte rendu -------------------------------------------------------------
const parNiveau = {};
for (const id of ajoutees) {
  const n = id.split('-')[1];
  parNiveau[n] = (parNiveau[n] ?? 0) + 1;
}

console.log(`Compte      : ${email} (${user.uid})`);
console.log(`Catalogue   : ${catalogue.size} leçons`);
console.log(`Actuellement: ${dejaLa.length} leçon(s) marquée(s) terminée(s)`);
console.log(`Déduites    : ${deduites.size} depuis le SRS et la maîtrise`);
console.log(`À ajouter   : ${ajoutees.length}`);
if (Object.keys(parNiveau).length) {
  console.log('  par niveau :', Object.entries(parNiveau)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([n, c]) => `${n.toUpperCase()} ${c}`).join('  ·  '));
}
if (ecarte.size) {
  console.log(`Écartées    : ${ecarte.size} identifiant(s) absent(s) du catalogue` +
    ` (${[...ecarte].slice(0, 3).join(', ')}${ecarte.size > 3 ? '…' : ''})`);
}
console.log(`Résultat    : ${union.size} leçon(s)`);

if (!appliquer) {
  console.log('\nSimulation — rien n\'a été écrit. Relance avec --appliquer pour valider.');
  process.exit(0);
}

// --- écriture -----------------------------------------------------------------
// L'horodatage doit être postérieur à celui que porte l'appareil, sinon le
// last-write-wins ferait regagner la version appauvrie au prochain reconcile.
const nowIso = new Date().toISOString();
await ref.set({
  cl_completed_lessons: JSON.stringify([...union]),
  cl_completed_lessons__updatedAt: nowIso,
  lastUpdated: nowIso,
}, { merge: true });

console.log(`\nÉcrit : ${union.size} leçon(s), horodatées ${nowIso}.`);
console.log('Sur chaque appareil, vide le stockage local du site (ou déconnecte-toi puis reconnecte-toi)');
console.log('pour que la version restaurée redescende plutôt que l\'inverse.');
