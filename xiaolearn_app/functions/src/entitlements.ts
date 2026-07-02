/**
 * Logique d'écriture des entitlements dans Firestore après un événement Stripe.
 *
 * Schéma Firestore (collection `users`, doc `{uid}`) :
 *   entitlements: {
 *     app: {
 *       active: boolean,
 *       status: 'active' | 'canceled' | 'past_due' | 'trialing' | ...,
 *       isLifetime: boolean,             // true si achat one-time, false si subscription
 *       subscriptionId: string | null,   // null pour les lifetime
 *       priceId: string,                 // référence du Price Stripe
 *       customerId: string,              // cus_XXX
 *       currentPeriodEnd: ISO date | null,
 *       cancelAtPeriodEnd: boolean
 *     }
 *   }
 *
 * Le hook useEntitlements côté frontend lit en live ce doc via onSnapshot,
 * et l'app passe en `premium` tier dès que `active === true`.
 *
 * NOTE : on ne fait JAMAIS de delete d'entitlement, même quand le user annule.
 * On flagge juste `active: false` ET on garde l'historique pour audit /
 * réactivation éventuelle / debug support.
 */

import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { logger } from 'firebase-functions/v2';

export interface AppEntitlement {
  active: boolean;
  status: string;
  isLifetime: boolean;
  subscriptionId: string | null;
  priceId: string | null;
  customerId: string;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
}

interface WriteOptions {
  /** uid Firebase Auth de l'utilisateur. Pris dans le metadata Stripe ou via lookup customerId */
  uid: string | null;
  /** email du compte Stripe — fallback pour le claim si l'uid n'est pas connu */
  email: string | null;
  entitlement: AppEntitlement;
}

/**
 * Écrit l'entitlement à la bonne place :
 *  - Si on connaît l'uid → users/{uid}.entitlements.app
 *  - Sinon → pending_entitlements/{email_lowercase}, qui sera "claimé" par
 *    useEntitlements lors de la prochaine connexion de l'utilisateur
 *
 * Le frontend (claimPendingEntitlements dans useEntitlements.ts) copie le doc
 * pending → users/{uid} et supprime le pending une fois utilisé.
 */
export async function writeAppEntitlement(opts: WriteOptions): Promise<void> {
  const db = getFirestore();

  const payload = {
    entitlements: {
      app: opts.entitlement
    },
    updatedAt: new Date().toISOString()
  };

  if (opts.uid) {
    logger.info(`Writing entitlement to users/${opts.uid}`, {
      active: opts.entitlement.active,
      isLifetime: opts.entitlement.isLifetime
    });
    await db.doc(`users/${opts.uid}`).set(payload, { merge: true });
    return;
  }

  if (opts.email) {
    const key = opts.email.toLowerCase();
    logger.info(`Writing pending entitlement to pending_entitlements/${key}`, {
      active: opts.entitlement.active,
      isLifetime: opts.entitlement.isLifetime
    });
    await db.doc(`pending_entitlements/${key}`).set(
      {
        ...payload,
        createdAt: FieldValue.serverTimestamp()
      },
      { merge: true }
    );
    return;
  }

  logger.error('Cannot write entitlement : neither uid nor email provided', opts);
  throw new Error('Cannot write entitlement without uid or email');
}

/**
 * Cherche l'uid Firebase Auth à partir du customerId Stripe en remontant la
 * collection `users`. Utilisé par le webhook quand on reçoit un event sur
 * un customer mais sans metadata uid (cas rare mais possible).
 *
 * Coût : 1 query indexée sur entitlements.app.customerId. Tu peux ajouter
 * cet index dans Firestore Console → Indexes si la query devient lente.
 */
export async function findUidByCustomerId(customerId: string): Promise<string | null> {
  const db = getFirestore();
  const snap = await db
    .collection('users')
    .where('entitlements.app.customerId', '==', customerId)
    .limit(1)
    .get();
  if (snap.empty) return null;
  return snap.docs[0].id;
}
