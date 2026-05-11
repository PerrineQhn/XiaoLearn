/**
 * Stripe SDK client + helpers communs aux 3 functions (checkout / portal / webhook).
 *
 * Les credentials Stripe sont stockés via Firebase Functions Secrets (et non en
 * variables d'env classiques) — cf. https://firebase.google.com/docs/functions/config-env
 * On les déclare avec `defineSecret()` ET on les attache aux options de chaque
 * function exportée pour qu'elles soient injectées au runtime.
 *
 * Secrets requis (à configurer via `firebase functions:secrets:set STRIPE_SECRET_KEY` etc.) :
 *   - STRIPE_SECRET_KEY        : clé sk_live_... (ou sk_test_...) du compte Stripe
 *   - STRIPE_WEBHOOK_SECRET    : whsec_... généré par Stripe Dashboard → Webhooks
 *   - STRIPE_PRICE_MONTHLY     : price_XXX du Product "Premium Mensuel"
 *   - STRIPE_PRICE_LIFETIME    : price_XXX du Product "Premium Lifetime"
 */

import Stripe from 'stripe';
import { defineSecret } from 'firebase-functions/params';

export const STRIPE_SECRET_KEY = defineSecret('STRIPE_SECRET_KEY');
export const STRIPE_WEBHOOK_SECRET = defineSecret('STRIPE_WEBHOOK_SECRET');
export const STRIPE_PRICE_MONTHLY = defineSecret('STRIPE_PRICE_MONTHLY');
export const STRIPE_PRICE_LIFETIME = defineSecret('STRIPE_PRICE_LIFETIME');

/**
 * Construit un client Stripe à la volée. À ne pas hisser au module-level :
 * defineSecret().value() ne fonctionne QU'À l'intérieur du handler d'une
 * function dont les options déclarent ce secret. Un appel en module-level
 * échouerait au déploiement.
 */
export function getStripeClient(): Stripe {
  const apiKey = STRIPE_SECRET_KEY.value();
  return new Stripe(apiKey, {
    // Pin la version d'API pour éviter qu'une release Stripe casse silencieusement
    // notre code. À bumper consciemment quand on veut profiter d'un nouveau champ.
    apiVersion: '2025-10-29.acacia' as Stripe.LatestApiVersion,
    typescript: true,
    // Identifie ces requêtes dans les logs Stripe — utile pour debug.
    appInfo: {
      name: 'XiaoLearn',
      version: '1.0.0',
      url: 'https://app.xiaolearn.com'
    }
  });
}

/**
 * Mapping productId (envoyé par le frontend) → priceId Stripe.
 * Le frontend ne connaît pas les priceId Stripe (sensibles, peuvent changer
 * entre test et prod). Il envoie un identifiant logique stable, et le backend
 * fait la résolution.
 */
export type ProductId = 'app-monthly' | 'app-lifetime';

export function resolvePriceId(productId: string): {
  priceId: string;
  mode: 'subscription' | 'payment';
} {
  switch (productId) {
    case 'app-monthly':
      return {
        priceId: STRIPE_PRICE_MONTHLY.value(),
        mode: 'subscription'
      };
    case 'app-lifetime':
      return {
        priceId: STRIPE_PRICE_LIFETIME.value(),
        mode: 'payment'
      };
    default:
      throw new Error(`Unknown productId: ${productId}`);
  }
}

/**
 * URLs de retour après Stripe Checkout. En prod, on retourne sur l'app
 * Cloudflare Pages. En dev/test (firebase emulator), on retourne sur localhost.
 */
export function buildReturnUrls() {
  const base = process.env.APP_BASE_URL ?? 'https://app.xiaolearn.com';
  return {
    successUrl: `${base}/subscription?status=success&session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: `${base}/subscription?status=cancelled`
  };
}
