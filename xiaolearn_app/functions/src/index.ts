/**
 * XiaoLearn Cloud Functions — point d'entrée Stripe.
 *
 * Trois endpoints HTTP exposés :
 *   - createCheckout      : POST {productId, uid, email} → {url}
 *   - createPortal        : POST {uid, returnUrl} → {url}
 *   - stripeWebhook       : POST <stripe-signed-payload> → 200 OK
 *
 * Tous sont déclarés en v2 (firebase-functions/v2/https) pour bénéficier de
 * Cloud Run sous le capot : cold starts plus rapides, scaling à zéro, et
 * les secrets gérés par Google Secret Manager (plus sécurisé que les configs
 * runtime de la v1).
 *
 * Région : europe-west1 (Belgique, proche des users francophones et de
 * Cloudflare Pages CDG1). Réduit la latence sur le checkout (~50 ms) vs
 * us-central1 par défaut.
 */

import { initializeApp } from 'firebase-admin/app';
import { onRequest } from 'firebase-functions/v2/https';
import { logger, setGlobalOptions } from 'firebase-functions/v2';
import type { Stripe } from 'stripe';
import {
  getStripeClient,
  resolvePriceId,
  buildReturnUrls,
  STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET,
  STRIPE_PRICE_MONTHLY,
  STRIPE_PRICE_LIFETIME
} from './stripeClient';
import {
  writeAppEntitlement,
  findUidByCustomerId,
  type AppEntitlement
} from './entitlements';

initializeApp();
setGlobalOptions({ region: 'europe-west1', maxInstances: 10 });

// ---------------------------------------------------------------------------
// CORS helper : nos requêtes viennent de app.xiaolearn.com (origin cross-domain
// par rapport au domaine cloudfunctions.net). On autorise explicitement nos
// origins légitimes, et on répond aux preflight OPTIONS.
// ---------------------------------------------------------------------------
const ALLOWED_ORIGINS = new Set([
  'https://app.xiaolearn.com',
  'https://xiaolearn.com',
  'https://www.xiaolearn.com',
  'http://localhost:5173', // Vite dev server
  'http://localhost:4173'  // Vite preview
]);

function applyCors(req: { headers: Record<string, string | string[] | undefined> }, res: any): boolean {
  const origin = (req.headers.origin as string | undefined) ?? '';
  if (ALLOWED_ORIGINS.has(origin)) {
    res.set('Access-Control-Allow-Origin', origin);
    res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.set('Access-Control-Max-Age', '3600');
  }
  if (req.headers['access-control-request-method']) {
    // Preflight — pas de body, juste 204 avec les headers ci-dessus.
    res.status(204).send('');
    return true;
  }
  return false;
}

// ===========================================================================
//  1. createCheckout  —  démarre une session Stripe Checkout
// ===========================================================================

export const createCheckout = onRequest(
  {
    secrets: [STRIPE_SECRET_KEY, STRIPE_PRICE_MONTHLY, STRIPE_PRICE_LIFETIME]
  },
  async (req, res) => {
    if (applyCors(req, res)) return;
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    try {
      const { productId, uid, email } = req.body ?? {};

      if (!productId || typeof productId !== 'string') {
        res.status(400).json({ error: 'productId is required' });
        return;
      }
      if (!uid || typeof uid !== 'string') {
        res.status(400).json({ error: 'uid is required' });
        return;
      }

      const stripe = getStripeClient();
      const { priceId, mode } = resolvePriceId(productId);
      const { successUrl, cancelUrl } = buildReturnUrls();

      // Pour les subscriptions, on attache un trial de 7 jours à la première
      // souscription. Le user n'est débité qu'à la fin du trial. Cohérent avec
      // TRIAL_DURATION_DAYS=7 dans utils/access.ts côté frontend.
      const subscriptionData: Stripe.Checkout.SessionCreateParams.SubscriptionData | undefined =
        mode === 'subscription'
          ? {
              trial_period_days: 7,
              metadata: { uid, productId }
            }
          : undefined;

      const session = await stripe.checkout.sessions.create({
        mode,
        payment_method_types: ['card'],
        line_items: [{ price: priceId, quantity: 1 }],
        success_url: successUrl,
        cancel_url: cancelUrl,
        // L'email côté Stripe sert pour les reçus et la facturation. Si fourni
        // par le frontend (depuis Firebase Auth), on évite à l'user de le retaper.
        customer_email: email || undefined,
        // Les metadata sont copiées sur le Customer et la Subscription créés.
        // Le webhook les utilise pour identifier l'uid Firebase de l'acheteur.
        client_reference_id: uid,
        metadata: { uid, productId },
        subscription_data: subscriptionData,
        // Active la collecte d'adresse de facturation pour les pays EU
        // (obligation TVA). Stripe la stocke automatiquement.
        billing_address_collection: 'auto',
        // Pour les achats one-time (lifetime), on dit explicitement de créer
        // un Customer (sinon Stripe en crée un anonyme). On en aura besoin
        // pour qu'il puisse gérer ses factures depuis le Customer Portal.
        ...(mode === 'payment' ? { customer_creation: 'always' } : {})
      });

      if (!session.url) {
        logger.error('Stripe session created without URL', { sessionId: session.id });
        res.status(500).json({ error: 'No checkout URL returned' });
        return;
      }

      logger.info('Checkout session created', {
        sessionId: session.id,
        productId,
        uid,
        mode
      });

      res.status(200).json({ url: session.url });
    } catch (err) {
      logger.error('createCheckout error', err);
      const message = err instanceof Error ? err.message : 'Unknown error';
      res.status(500).json({ error: message });
    }
  }
);

// ===========================================================================
//  2. createPortal  —  redirige vers le Stripe Customer Portal
// ===========================================================================

export const createPortal = onRequest(
  { secrets: [STRIPE_SECRET_KEY] },
  async (req, res) => {
    if (applyCors(req, res)) return;
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    try {
      const { uid, returnUrl } = req.body ?? {};
      if (!uid || typeof uid !== 'string') {
        res.status(400).json({ error: 'uid is required' });
        return;
      }

      // Lookup du customerId Stripe à partir de l'uid Firebase. On l'a stocké
      // dans users/{uid}.entitlements.app.customerId lors du premier checkout.
      const { getFirestore } = await import('firebase-admin/firestore');
      const db = getFirestore();
      const userSnap = await db.doc(`users/${uid}`).get();
      const customerId = userSnap.data()?.entitlements?.app?.customerId;

      if (!customerId) {
        res.status(404).json({
          error: 'No Stripe customer found for this user. A purchase must be made first.'
        });
        return;
      }

      const stripe = getStripeClient();
      const session = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: returnUrl || 'https://app.xiaolearn.com/subscription'
      });

      res.status(200).json({ url: session.url });
    } catch (err) {
      logger.error('createPortal error', err);
      const message = err instanceof Error ? err.message : 'Unknown error';
      res.status(500).json({ error: message });
    }
  }
);

// ===========================================================================
//  3. stripeWebhook  —  reçoit les events Stripe et update Firestore
// ===========================================================================

export const stripeWebhook = onRequest(
  {
    secrets: [STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET],
    // On désactive le CORS et l'auth check ici : Stripe nous appelle depuis
    // SES IPs (et signe les requêtes), pas depuis un navigateur user.
    invoker: 'public'
  },
  async (req, res) => {
    if (req.method !== 'POST') {
      res.status(405).send('Method not allowed');
      return;
    }

    const sig = req.headers['stripe-signature'];
    if (!sig || typeof sig !== 'string') {
      logger.error('Missing stripe-signature header');
      res.status(400).send('Missing signature');
      return;
    }

    let event: Stripe.Event;
    try {
      // IMPORTANT : on doit valider la signature sur le BODY BRUT (raw bytes),
      // pas sur l'objet JSON parsé. Firebase Functions v2 expose `req.rawBody`
      // pour ça. Sans cette vérif, n'importe qui pourrait nous envoyer un faux
      // event et nous faire activer un entitlement gratuitement.
      const stripe = getStripeClient();
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        sig,
        STRIPE_WEBHOOK_SECRET.value()
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      logger.error('Webhook signature verification failed', { message });
      res.status(400).send(`Webhook Error: ${message}`);
      return;
    }

    logger.info('Stripe webhook received', { type: event.type, id: event.id });

    try {
      await handleStripeEvent(event);
      res.status(200).json({ received: true });
    } catch (err) {
      logger.error('Webhook handler error', { type: event.type, err });
      // Renvoie 500 → Stripe retentera l'event automatiquement (jusqu'à 3j).
      res.status(500).send('Internal error');
    }
  }
);

/**
 * Dispatcher des events Stripe vers les handlers Firestore.
 * On gère les events les plus importants pour notre flow :
 *
 *   - checkout.session.completed       → checkout terminé, paiement OK
 *                                        (subscription créée, ou one-time payment)
 *   - customer.subscription.updated    → renouvellement, changement de plan,
 *                                        statut (active → past_due, etc.)
 *   - customer.subscription.deleted    → annulation effective
 *   - invoice.payment_failed           → paiement raté (carte expirée, etc.)
 *
 * Les autres events sont loggés mais pas traités — on peut les ajouter si on
 * en a besoin plus tard.
 */
async function handleStripeEvent(event: Stripe.Event): Promise<void> {
  switch (event.type) {
    case 'checkout.session.completed':
      await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
      break;

    case 'customer.subscription.created':
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted':
      await handleSubscriptionChange(event.data.object as Stripe.Subscription);
      break;

    case 'invoice.payment_failed':
      await handlePaymentFailed(event.data.object as Stripe.Invoice);
      break;

    default:
      logger.info(`Unhandled event type: ${event.type}`);
  }
}

/**
 * checkout.session.completed → c'est ICI qu'on active le lifetime (mode 'payment')
 * et qu'on note l'uid pour les futures subscriptions.
 */
async function handleCheckoutCompleted(session: Stripe.Checkout.Session): Promise<void> {
  const uid = (session.metadata?.uid as string) ?? session.client_reference_id ?? null;
  const email = session.customer_email ?? session.customer_details?.email ?? null;
  const customerId =
    typeof session.customer === 'string'
      ? session.customer
      : session.customer?.id ?? null;

  if (!customerId) {
    logger.warn('Checkout completed without customerId, skipping', { sessionId: session.id });
    return;
  }

  const isLifetime = session.mode === 'payment';

  // Pour le lifetime, on a tout ce qu'il faut : active = true, immutable.
  // Pour la subscription, c'est l'event customer.subscription.created qui
  // suit (et qui contient les détails de période) qui finira de remplir le
  // entitlement. Mais on peut déjà marquer comme actif côté lifetime ici.
  if (isLifetime) {
    const entitlement: AppEntitlement = {
      active: true,
      status: 'lifetime',
      isLifetime: true,
      subscriptionId: null,
      priceId: session.metadata?.priceId ?? null,
      customerId,
      currentPeriodEnd: null,
      cancelAtPeriodEnd: false
    };

    await writeAppEntitlement({ uid, email, entitlement });
    logger.info('Lifetime activated', { uid, email, customerId });
  } else {
    // Subscription : on attend l'event customer.subscription.created pour avoir
    // les détails (currentPeriodEnd, status). Mais on enregistre déjà le
    // customerId si on a l'uid, pour que le Customer Portal lookup marche.
    if (uid) {
      logger.info('Subscription checkout completed, waiting for subscription event', {
        uid,
        customerId
      });
    }
  }
}

/**
 * Subscription created/updated/deleted → met à jour active + currentPeriodEnd.
 */
async function handleSubscriptionChange(sub: Stripe.Subscription): Promise<void> {
  const customerId = typeof sub.customer === 'string' ? sub.customer : sub.customer.id;
  // Explicitement typé `string | null` — sinon TS infère `string` à partir de
  // la première assignation et refuse l'assignation null du fallback.
  let uid: string | null = (sub.metadata?.uid as string) ?? null;
  if (!uid) {
    // Fallback : retrouver l'uid via le customerId si jamais le metadata
    // s'est perdu en chemin (rare, mais possible).
    uid = await findUidByCustomerId(customerId);
  }

  const firstItem = sub.items.data[0];
  const priceId = firstItem?.price.id ?? null;
  const active = ['active', 'trialing'].includes(sub.status);

  // Depuis l'API Stripe 2025-10-29.acacia, `current_period_end` n'est plus
  // sur la Subscription elle-même mais sur chaque Subscription Item (un
  // subscription peut avoir plusieurs items facturés à des cadences
  // différentes). Pour XiaoLearn on n'a qu'un seul item par subscription
  // (mensuel ou rien), donc on lit le premier item.
  const periodEnd =
    (firstItem as { current_period_end?: number | null } | undefined)
      ?.current_period_end ?? null;

  const entitlement: AppEntitlement = {
    active,
    status: sub.status,
    isLifetime: false,
    subscriptionId: sub.id,
    priceId,
    customerId,
    currentPeriodEnd: periodEnd ? new Date(periodEnd * 1000).toISOString() : null,
    cancelAtPeriodEnd: sub.cancel_at_period_end
  };

  await writeAppEntitlement({ uid, email: null, entitlement });
  logger.info('Subscription updated', {
    uid,
    customerId,
    status: sub.status,
    active
  });
}

/**
 * invoice.payment_failed → flag passé à `past_due` mais on garde `active=true`
 * pendant la période de grâce (3 retries auto par Stripe sur 1-2 semaines).
 * Si tous les retries échouent, customer.subscription.deleted sera reçu et
 * on bascule à active=false à ce moment-là.
 */
async function handlePaymentFailed(invoice: Stripe.Invoice): Promise<void> {
  const customerId =
    typeof invoice.customer === 'string'
      ? invoice.customer
      : invoice.customer?.id ?? null;
  if (!customerId) return;

  logger.warn('Payment failed', {
    customerId,
    invoiceId: invoice.id,
    attemptCount: invoice.attempt_count
  });

  // On laisse la subscription.updated qui suit gérer le status — l'event
  // payment_failed est juste informatif pour les logs et un éventuel email
  // de relance qu'on pourrait câbler ici plus tard.
}
