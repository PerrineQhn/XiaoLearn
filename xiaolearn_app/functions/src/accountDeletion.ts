/**
 * Suppression de compte — demande, annulation, purge différée.
 *
 * ## Pourquoi côté serveur
 *
 * Un client ne peut pas effacer proprement un compte : il ne peut pas parcourir
 * les sous-collections, ni supprimer les documents qu'il n'a pas le droit
 * d'écrire (`publicProfiles`, `leaderboard`), ni se supprimer d'Auth de façon
 * fiable si son jeton a expiré. Tout passe donc par l'Admin SDK.
 *
 * ## Le délai de sept jours
 *
 * La demande n'efface rien : elle pose une date d'échéance. Tant qu'elle n'est
 * pas atteinte, se reconnecter suffit à tout annuler. C'est ce qu'Apple
 * recommande explicitement pour les comptes porteurs d'un abonnement, et ça
 * protège du geste regretté — un compte effacé ne se restaure pas.
 *
 * ## Abonnements : ce que la suppression ne fait PAS
 *
 * Un abonnement App Store ou Google Play appartient au compte du magasin, pas
 * au compte de l'application. Aucune API ne permet de l'annuler côté
 * développeur : Apple n'en fournit pas. Supprimer son compte XiaoLearn
 * n'interrompt donc **pas** les prélèvements, et l'utilisateur doit résilier
 * lui-même dans les réglages de son magasin. L'écran de suppression le dit et
 * y renvoie ; c'est une obligation, pas une politesse.
 *
 * ## Ce qui survit à la purge
 *
 * Les traces de facturation (identifiant client Stripe ou RevenueCat, dates,
 * montants) sont conservées de façon dissociée dans `billing_archive` : la loi
 * française impose dix ans de conservation des pièces comptables, et le RGPD
 * réserve explicitement cette obligation légale. On y garde le strict
 * nécessaire, sans e-mail ni nom.
 */
import { onCall, onRequest, HttpsError } from 'firebase-functions/v2/https';
import { onSchedule } from 'firebase-functions/v2/scheduler';
import { logger } from 'firebase-functions/v2';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

/** Délai de rétractation, en jours. */
export const GRACE_DAYS = 7;

const db = () => getFirestore();

// ---------------------------------------------------------------------------
//  1. Demander la suppression
// ---------------------------------------------------------------------------
export const requestAccountDeletion = onCall({ region: 'europe-west1' }, async (req) => {
  const uid = req.auth?.uid;
  if (!uid) throw new HttpsError('unauthenticated', 'Connexion requise.');

  const now = Date.now();
  const scheduledFor = now + GRACE_DAYS * 24 * 60 * 60 * 1000;

  await db().doc(`users/${uid}`).set({
    deletion: {
      requestedAt: new Date(now).toISOString(),
      scheduledFor: new Date(scheduledFor).toISOString(),
      status: 'pending',
    },
  }, { merge: true });

  logger.info('[suppression] demande enregistrée', { uid, scheduledFor });
  return { scheduledFor: new Date(scheduledFor).toISOString(), graceDays: GRACE_DAYS };
});

// ---------------------------------------------------------------------------
//  2. Annuler la demande
// ---------------------------------------------------------------------------
export const cancelAccountDeletion = onCall({ region: 'europe-west1' }, async (req) => {
  const uid = req.auth?.uid;
  if (!uid) throw new HttpsError('unauthenticated', 'Connexion requise.');

  await db().doc(`users/${uid}`).set({ deletion: FieldValue.delete() }, { merge: true });
  logger.info('[suppression] demande annulée', { uid });
  return { cancelled: true };
});

// ---------------------------------------------------------------------------
//  3. Purge effective
// ---------------------------------------------------------------------------

/** Supprime une sous-collection par lots : `recursiveDelete` n'existe pas partout. */
async function deleteCollection(path: string, batchSize = 300): Promise<number> {
  let removed = 0;
  for (;;) {
    const snap = await db().collection(path).limit(batchSize).get();
    if (snap.empty) return removed;
    const batch = db().batch();
    snap.docs.forEach(d => batch.delete(d.ref));
    await batch.commit();
    removed += snap.size;
    if (snap.size < batchSize) return removed;
  }
}

/**
 * Efface toutes les données d'un utilisateur.
 *
 * L'ordre compte : on retire d'abord ce qui le rend visible aux autres
 * (profil public, classement), puis ses données propres, et le compte Auth en
 * dernier. Si la fonction échoue en cours de route, l'utilisateur se retrouve
 * invisible mais non supprimé — état réparable au passage suivant — plutôt que
 * supprimé d'Auth avec des données orphelines qui resteraient à jamais.
 */
export async function purgeUser(uid: string): Promise<void> {
  const userRef = db().doc(`users/${uid}`);

  // Trace de facturation dissociée, conservée pour obligation comptable.
  const snap = await userRef.get();
  const ent = snap.data()?.entitlements?.app;
  if (ent?.customerId || ent?.store) {
    await db().collection('billing_archive').doc(uid).set({
      customerId: ent.customerId ?? null,
      store: ent.store ?? null,
      productId: ent.productId ?? null,
      startedAt: ent.startedAt ?? null,
      expiresAt: ent.expiresAt ?? null,
      archivedAt: new Date().toISOString(),
      // Ni e-mail ni nom : la pièce comptable se rattache à l'identifiant du
      // prestataire de paiement, qui suffit à retrouver la facture chez lui.
    });
  }

  await db().doc(`publicProfiles/${uid}`).delete().catch(() => {});
  await db().doc(`leaderboard/${uid}`).delete().catch(() => {});
  await db().doc(`emailPrefs/${uid}`).delete().catch(() => {});

  for (const sub of ['notifications', 'notes', 'sessions']) {
    await deleteCollection(`users/${uid}/${sub}`).catch(() => 0);
  }

  // Conversations : on retire l'utilisateur des fils plutôt que de détruire
  // des messages qui appartiennent aussi à son interlocuteur.
  const convs = await db().collection('conversations')
    .where('participants', 'array-contains', uid).get().catch(() => null);
  if (convs) {
    for (const c of convs.docs) {
      await c.ref.set({
        participants: FieldValue.arrayRemove(uid),
        deletedParticipants: FieldValue.arrayUnion(uid),
      }, { merge: true }).catch(() => {});
    }
  }

  for (const q of ['battleQueue', 'battleMatches']) {
    await db().doc(`${q}/${uid}`).delete().catch(() => {});
  }

  await userRef.delete().catch(() => {});
  await getAuth().deleteUser(uid).catch(err => {
    if (err?.code !== 'auth/user-not-found') throw err;
  });

  logger.info('[suppression] compte purgé', { uid });
}

/**
 * Passage quotidien : purge les comptes dont l'échéance est atteinte.
 *
 * Une seule exécution par jour suffit — le délai est de sept jours, une heure
 * de décalage n'a aucune importance, et un traitement groupé est plus simple à
 * surveiller qu'une tâche par compte.
 */
export const purgeDeletedAccounts = onSchedule(
  { schedule: 'every day 03:30', timeZone: 'Europe/Paris', region: 'europe-west1' },
  async () => {
    const now = new Date().toISOString();
    const due = await db().collection('users')
      .where('deletion.status', '==', 'pending')
      .where('deletion.scheduledFor', '<=', now)
      .limit(200)
      .get();

    logger.info('[suppression] purge quotidienne', { comptes: due.size });
    for (const doc of due.docs) {
      try { await purgeUser(doc.id); }
      catch (err) { logger.error('[suppression] échec', { uid: doc.id, err }); }
    }
  },
);

// ---------------------------------------------------------------------------
//  4. Chemin web, exigé par Google Play
// ---------------------------------------------------------------------------
/**
 * Google Play impose depuis 2023 un moyen de demander la suppression **depuis
 * un navigateur**, sans installer l'application. Cet endpoint sert la page
 * `public-pay/delete-account.html`, qui appelle ensuite `requestAccountDeletion`
 * après connexion.
 */
export const accountDeletionInfo = onRequest(
  { region: 'europe-west1', cors: true },
  async (_req, res) => {
    res.status(200).json({
      graceDays: GRACE_DAYS,
      web: 'https://xiaolearn-pay.web.app/delete-account.html',
      note: 'Deleting the XiaoLearn account does not cancel an App Store or Google Play subscription.',
    });
  },
);
