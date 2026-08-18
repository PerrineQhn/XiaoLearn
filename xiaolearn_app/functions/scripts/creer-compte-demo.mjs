/**
 * creer-compte-demo — le compte que la revue App Store utilisera.
 *
 * Apple exige un identifiant de connexion dès qu'une app en demande un. Le
 * relecteur doit pouvoir ouvrir l'app et voir ce qu'elle propose, y compris
 * derrière le paiement — sans quoi il ne peut pas juger les achats intégrés,
 * et le rejet tombe avec la mention « we were unable to access the full
 * functionality of your app ».
 *
 * ## Pourquoi un script plutôt qu'une inscription à la main
 *
 * Un compte créé depuis l'app est un compte ordinaire : il bénéficie de la
 * période d'essai de 7 jours, puis retombe en gratuit. Une revue qui traîne,
 * un rejet suivi d'une re-soumission, et le relecteur suivant ne voit plus
 * rien. Ce script pose donc un entitlement permanent dans Firestore.
 *
 * Et il ne peut PAS se faire depuis le client : les règles Firestore
 * interdisent au SDK client d'écrire `entitlements`, précisément pour que
 * personne ne s'accorde le premium tout seul. Il faut l'Admin SDK.
 *
 * ## Où vit ce fichier, et pourquoi ici
 *
 * Il est dans `functions/scripts/` et non dans `xiaolearn_app/scripts/`, parce
 * que Node résout les imports depuis l'emplacement du FICHIER et non depuis le
 * dossier courant : seul `functions/node_modules` contient firebase-admin.
 *
 * ## Usage
 *
 * S'authentifier d'abord, au choix :
 *
 *   gcloud auth application-default login        (rien à télécharger)
 *   export GOOGLE_APPLICATION_CREDENTIALS=…json  (clé de compte de service)
 *
 * puis, depuis n'importe où :
 *
 *   node xiaolearn_app/functions/scripts/creer-compte-demo.mjs \
 *     --email demo@xiaolearn.com --nom "Compte de démonstration"
 *
 * Le mot de passe est demandé de façon interactive : il ne passe ni par la
 * ligne de commande (visible dans l'historique du shell et dans `ps`), ni par
 * un fichier. Ajoute `--sans-premium` pour créer un compte ordinaire, qui
 * verra la page d'abonnement et permettra de tester l'achat en bac à sable.
 */
import { initializeApp, applicationDefault, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'node:fs';
import readline from 'node:readline';
import { Writable } from 'node:stream';

// --- arguments ---------------------------------------------------------------
const args = process.argv.slice(2);
const lire = (nom) => {
  const i = args.indexOf(nom);
  return i >= 0 ? args[i + 1] : null;
};
const email = lire('--email');
const nom = lire('--nom') ?? 'Compte de démonstration';
const sansPremium = args.includes('--sans-premium');

if (!email) {
  console.error('Usage : node creer-compte-demo.mjs --email <adresse> [--nom "…"] [--sans-premium]');
  process.exit(1);
}

// --- identifiants, AVANT toute saisie ----------------------------------------
// La bibliothèque Google ne résout les identifiants qu'au premier appel réseau.
// Sans ce contrôle, on tape son mot de passe pour s'entendre dire, ensuite,
// que la clé est introuvable — et il faut tout recommencer.
{
  const chemin = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  const aide =
    "Authentifie-toi d'abord, au choix :\n" +
    '  • clé de compte de service (console Firebase → Paramètres du projet →\n' +
    '    Comptes de service → Générer une nouvelle clé privée), puis\n' +
    '        export GOOGLE_APPLICATION_CREDENTIALS=/chemin/reel/vers/la-cle.json\n' +
    '  • ou, sans fichier de clé :\n' +
    '        gcloud auth application-default login';

  if (chemin) {
    if (!fs.existsSync(chemin)) {
      console.error(`Clé introuvable : ${chemin}\n\n${aide}`);
      process.exit(1);
    }
    try {
      const j = JSON.parse(fs.readFileSync(chemin, 'utf8'));
      if (j.type !== 'service_account' || !j.private_key) {
        console.error(`Ce fichier n'est pas une clé de compte de service : ${chemin}`);
        process.exit(1);
      }
      console.log(`Projet : ${j.project_id}`);
    } catch (e) {
      console.error(`Clé illisible (${e.message})\n\n${aide}`);
      process.exit(1);
    }
  } else {
    // Identifiants par défaut de l'utilisateur, posés par gcloud.
    const parDefaut = `${process.env.HOME}/.config/gcloud/application_default_credentials.json`;
    if (!fs.existsSync(parDefaut)) {
      console.error(`Aucun identifiant Google trouvé.\n\n${aide}`);
      process.exit(1);
    }
  }
}

/** Saisie masquée — le mot de passe ne s'affiche pas et ne part pas dans l'historique. */
function demanderMotDePasse(invite) {
  return new Promise((resolve) => {
    let muet = false;
    const sortie = new Writable({
      write(chunk, encoding, cb) { if (!muet) process.stdout.write(chunk, encoding); cb(); },
    });
    const rl = readline.createInterface({ input: process.stdin, output: sortie, terminal: true });
    rl.question(invite, (rep) => { rl.close(); process.stdout.write('\n'); resolve(rep); });
    muet = true;
  });
}

const motDePasse = await demanderMotDePasse('Mot de passe du compte de démonstration : ');
if (motDePasse.length < 6) {
  console.error('Firebase exige au moins 6 caractères.');
  process.exit(1);
}

// --- initialisation ----------------------------------------------------------
// Un défaut d'identifiants ne se manifeste qu'au premier appel réseau, avec un
// message opaque. On préfère le dire tout de suite et en français.
try {
  if (!getApps().length) initializeApp({ credential: applicationDefault() });
} catch {
  console.error(
    "Identifiants Google introuvables. Authentifie-toi d'abord :\n" +
    '  gcloud auth application-default login\n' +
    'ou     export GOOGLE_APPLICATION_CREDENTIALS=/chemin/reel/vers/serviceAccount.json'
  );
  process.exit(1);
}
const auth = getAuth();
const db = getFirestore();

// --- création ou réutilisation ------------------------------------------------
let user;
try {
  user = await auth.getUserByEmail(email);
  console.log(`Compte déjà présent (${user.uid}) — mot de passe réinitialisé.`);
  await auth.updateUser(user.uid, { password: motDePasse, displayName: nom, emailVerified: true });
} catch (e) {
  if (e.code !== 'auth/user-not-found') throw e;
  user = await auth.createUser({
    email,
    password: motDePasse,
    displayName: nom,
    // Vérifié d'office : le relecteur n'a pas accès à cette boîte mail et
    // resterait bloqué sur un écran de confirmation.
    emailVerified: true,
  });
  console.log(`Compte créé (${user.uid}).`);
}

// --- droits ------------------------------------------------------------------
if (sansPremium) {
  console.log('Aucun entitlement posé : le compte verra la page d\'abonnement.');
} else {
  await db.doc(`users/${user.uid}`).set({
    entitlements: {
      app: {
        active: true,
        status: 'active',
        isLifetime: true,
        subscriptionId: null,
        priceId: 'demo-appstore-review',
        customerId: 'demo-appstore-review',
        currentPeriodEnd: null,
        cancelAtPeriodEnd: false,
      },
    },
    updatedAt: new Date().toISOString(),
  }, { merge: true });
  console.log('Entitlement premium à vie posé — le relecteur voit tout le contenu.');
}

// Profil public : sans lui, le compte n'apparaît ni au classement ni à la
// recherche, et l'écran communautaire semble cassé au relecteur.
await db.doc(`publicProfiles/${user.uid}`).set({
  uid: user.uid,
  displayName: nom,
  totalXp: 0,
  updatedAt: new Date().toISOString(),
}, { merge: true });

console.log(`\nÀ recopier dans App Store Connect :\n  Nom d'utilisateur : ${email}\n  Mot de passe      : celui que tu viens de saisir`);
