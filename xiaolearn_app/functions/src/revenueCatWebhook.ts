/**
 * revenueCatWebhook.ts — webhook RevenueCat → Firestore.
 * ------------------------------------------------------
 * Reçoit les événements RevenueCat (achats/renouvellements/annulations
 * effectués dans l'app MOBILE via StoreKit / Google Play Billing) et écrit
 * le MÊME schéma `users/{uid}.entitlements.app` que le webhook Stripe.
 *
 * Résultat : un premium acheté sur mobile est reconnu sur le web (et
 * inversement), puisque les deux plateformes lisent la même source de vérité
 * Firestore via useEntitlements.
 *
 * Configuration côté RevenueCat (dashboard → Integrations → Webhooks) :
 *   - URL : https://europe-west1-<project>.cloudfunctions.net/revenueCatWebhook
 *   - Authorization header : "Bearer <REVENUECAT_WEBHOOK_SECRET>"
 *
 * IMPORTANT — matcher l'utilisateur :
 *   Le SDK mobile appelle Purchases.logIn(uid) au login (cf. _layout.tsx),
 *   donc `event.app_user_id` == uid Firebase. On écrit directement sur
 *   users/{uid}. Pas de fallback email nécessaire (l'app impose le login
 *   avant achat).
 *
 * Entitlement RevenueCat attendu : "premium".
 * Produit lifetime : "xiaolearn_lifetime" (non-consommable → isLifetime).
 */

import { onRequest } from 'firebase-functions/v2/https';
import { logger } from 'firebase-functions/v2';
import { defineSecret } from 'firebase-functions/params';
import { writeAppEntitlement, type AppEntitlement } from './entitlements';

export const REVENUECAT_WEBHOOK_SECRET = defineSecret('REVENUECAT_WEBHOOK_SECRET');

const ENTITLEMENT_ID = 'premium';
const LIFETIME_PRODUCTS = ['xiaolearn_lifetime'];

/** Types d'événements RevenueCat qui ACTIVENT le premium. */
const ACTIVATING = new Set([
  'INITIAL_PURCHASE',
  'RENEWAL',
  'UNCANCELLATION',
  'NON_RENEWING_PURCHASE', // achat one-time (lifetime)
  'PRODUCT_CHANGE',
  'SUBSCRIPTION_EXTENDED',
]);

/** Types qui DÉSACTIVENT (fin d'accès effective). */
const DEACTIVATING = new Set([
  'EXPIRATION',
  'BILLING_ISSUE', // accès coupé après échec de paiement définitif
]);
// NB : CANCELLATION n'est PAS désactivant — l'utilisateur garde l'accès
// jusqu'à l'expiration (event EXPIRATION). On reflète juste le statut.

export const revenueCatWebhook = onRequest(
  { secrets: [REVENUECAT_WEBHOOK_SECRET], cors: false },
  async (req, res) => {
    if (req.method !== 'POST') {
      res.status(405).send('Method Not Allowed');
      return;
    }

    // Vérif du header Authorization partagé (configuré dans RevenueCat)
    const expected = `Bearer ${REVENUECAT_WEBHOOK_SECRET.value()}`;
    if (req.headers.authorization !== expected) {
      logger.warn('[RevenueCat] mauvaise autorisation');
      res.status(401).send('Unauthorized');
      return;
    }

    const event = req.body?.event;
    if (!event || typeof event !== 'object') {
      res.status(400).send('Bad Request');
      return;
    }

    const type: string = event.type ?? '';
    const uid: string | null = event.app_user_id ?? null;
    const productId: string | null = event.product_id ?? null;
    const entitlementIds: string[] = event.entitlement_ids ?? [];

    // On ne traite que les events concernant l'entitlement "premium"
    const touchesPremium =
      entitlementIds.length === 0 || entitlementIds.includes(ENTITLEMENT_ID);
    if (!touchesPremium) {
      res.status(200).send('ignored (other entitlement)');
      return;
    }

    if (!uid) {
      logger.error('[RevenueCat] app_user_id absent', { type });
      res.status(200).send('ignored (no uid)'); // 200 pour éviter les retries en boucle
      return;
    }

    // RevenueCat n'est pas censé nous envoyer un uid anonyme ($RCAnonymousID)
    // puisqu'on fait logIn(uid). Si c'est le cas, on ignore.
    if (uid.startsWith('$RCAnonymousID')) {
      res.status(200).send('ignored (anonymous)');
      return;
    }

    const isLifetime = productId ? LIFETIME_PRODUCTS.includes(productId) : false;
    const expirationMs: number | null = event.expiration_at_ms ?? null;
    const currentPeriodEnd = expirationMs ? new Date(expirationMs).toISOString() : null;

    let active: boolean;
    let status: string;
    if (ACTIVATING.has(type)) {
      active = true;
      status = 'active';
    } else if (DEACTIVATING.has(type)) {
      active = false;
      status = type === 'BILLING_ISSUE' ? 'past_due' : 'expired';
    } else if (type === 'CANCELLATION') {
      // Annulé mais toujours actif jusqu'à l'expiration
      active = true;
      status = 'canceled';
    } else {
      // Event non pertinent (TRANSFER, TEST, etc.)
      res.status(200).send(`ignored (${type})`);
      return;
    }

    const entitlement: AppEntitlement = {
      active,
      status,
      isLifetime,
      subscriptionId: null, // RevenueCat gère l'abonnement store-side
      priceId: productId,
      customerId: event.original_app_user_id ?? uid,
      currentPeriodEnd: isLifetime ? null : currentPeriodEnd,
      cancelAtPeriodEnd: type === 'CANCELLATION',
    };

    try {
      await writeAppEntitlement({ uid, email: null, entitlement });
      logger.info('[RevenueCat] entitlement écrit', { uid, type, active, isLifetime });
      res.status(200).send('ok');
    } catch (err) {
      logger.error('[RevenueCat] écriture échouée', err);
      res.status(500).send('write failed');
    }
  }
);
