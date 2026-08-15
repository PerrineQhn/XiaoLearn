/**
 * revenueCat.ts — wrapper GUARDÉ autour de react-native-purchases.
 * ---------------------------------------------------------------
 * Le SDK RevenueCat contient du code natif → indisponible dans Expo Go.
 * On l'importe donc dynamiquement : en Expo Go, `Purchases` reste null et
 * les fonctions se comportent en no-op (l'app continue de tourner, le
 * paiement réel n'étant testable que dans un build EAS/dev-client).
 *
 * Config attendue (app.json → extra ou .env) :
 *   EXPO_PUBLIC_REVENUECAT_IOS_KEY
 *   EXPO_PUBLIC_REVENUECAT_ANDROID_KEY
 *
 * Identifiants produits (à créer dans App Store Connect / Play Console,
 * puis mappés dans RevenueCat) :
 *   - xiaolearn_monthly  → abonnement mensuel
 *   - xiaolearn_lifetime → achat unique (accès à vie)
 * Entitlement RevenueCat : "premium".
 */
import { Platform } from 'react-native';
import Constants from 'expo-constants';

export const ENTITLEMENT_ID = 'premium';
export const PRODUCT_MONTHLY = 'xiaolearn_monthly';
export const PRODUCT_LIFETIME = 'xiaolearn_lifetime';

// Chargement dynamique — absent en Expo Go, présent en build natif.
let Purchases: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  Purchases = require('react-native-purchases').default;
} catch {
  Purchases = null;
}

export const isRevenueCatAvailable = (): boolean => Purchases !== null;

let configured = false;

/** Initialise le SDK avec la clé de la plateforme. À appeler une fois au boot. */
/**
 * Sommes-nous dans Expo Go ?
 *
 * Le magasin natif n'y est pas disponible : passer une vraie clé de magasin à
 * `Purchases.configure` y déclenche « Invalid API key », un bandeau d'erreur
 * rouge à chaque démarrage alors que rien n'est cassé. On ne configure donc
 * pas du tout, sauf si une clé de boutique de test est fournie — RevenueCat
 * en propose une, prévue exactement pour ce cas.
 */
function isExpoGo(): boolean {
  return Constants.appOwnership === 'expo'
      || Constants.executionEnvironment === 'storeClient';
}

export async function initRevenueCat(appUserId?: string): Promise<boolean> {
  if (!Purchases || configured) return configured;

  if (isExpoGo() && !process.env.EXPO_PUBLIC_REVENUECAT_TEST_KEY) {
    console.info('[RevenueCat] ignoré dans Expo Go — build de développement requis pour les achats');
    return false;
  }
  // Dans Expo Go, seule la boutique de test de RevenueCat fonctionne.
  const key = isExpoGo()
    ? process.env.EXPO_PUBLIC_REVENUECAT_TEST_KEY
    : Platform.select({
        ios: process.env.EXPO_PUBLIC_REVENUECAT_IOS_KEY,
        android: process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_KEY,
      });
  if (!key) {
    console.warn('[RevenueCat] clé API absente pour', Platform.OS);
    return false;
  }
  try {
    // Le SDK natif est très bavard par défaut : tant que les produits ne sont
    // pas actifs dans App Store Connect, il déverse une erreur rouge à chaque
    // démarrage, qui masque les vrais problèmes dans le journal. On garde les
    // avertissements, on coupe le reste.
    Purchases.setLogLevel?.('WARN');
    Purchases.configure({ apiKey: key, appUserID: appUserId ?? null });
    configured = true;
    return true;
  } catch (e) {
    console.warn('[RevenueCat] configure failed', e);
    return false;
  }
}

/** Associe l'achat à l'uid Firebase (pour matcher le webhook côté serveur). */
export async function identifyRevenueCat(uid: string): Promise<void> {
  if (!Purchases || !configured) return;
  try { await Purchases.logIn(uid); } catch (e) { console.warn('[RevenueCat] logIn', e); }
}

export async function logoutRevenueCat(): Promise<void> {
  if (!Purchases || !configured) return;
  try { await Purchases.logOut(); } catch { /* ignore */ }
}

/** Récupère l'offre courante (packages proposés à l'achat). */
export async function getOfferings(): Promise<any | null> {
  if (!Purchases || !configured) return null;
  try {
    const offerings = await Purchases.getOfferings();
    return offerings.current ?? null;
  } catch (e) {
    console.warn('[RevenueCat] getOfferings', e);
    return null;
  }
}

/** True si l'entitlement "premium" est actif dans les infos client. */
export function isPremiumActive(customerInfo: any): boolean {
  return Boolean(customerInfo?.entitlements?.active?.[ENTITLEMENT_ID]);
}

/**
 * Issue d'un achat ou d'une restauration.
 *
 * `null` ne suffisait pas : l'écran ne pouvait pas distinguer « l'utilisateur
 * a renoncé » de « le paiement a échoué ». Il ne disait donc rien dans les
 * deux cas, et un achat raté laissait l'écran strictement inchangé — le
 * réflexe naturel étant alors de réessayer, puis de croire l'app cassée.
 */
export type PurchaseOutcome =
  | { status: 'ok'; customerInfo: any }
  | { status: 'cancelled' }
  | { status: 'error'; message?: string };

/** Lance l'achat d'un package. */
export async function purchasePackage(pkg: any): Promise<PurchaseOutcome> {
  if (!Purchases || !configured) return { status: 'error' };
  try {
    const { customerInfo } = await Purchases.purchasePackage(pkg);
    return { status: 'ok', customerInfo };
  } catch (e: any) {
    if (e?.userCancelled) return { status: 'cancelled' };
    console.warn('[RevenueCat] purchase failed', e);
    return { status: 'error', message: e?.message };
  }
}

/**
 * Restaure les achats (bouton exigé par la revue Apple).
 *
 * On renvoie aussi `restored`, faux quand l'appel a réussi mais n'a rien
 * trouvé : l'écran affichait « ✓ restauré » quoi qu'il arrive, y compris sur
 * un compte sans achat — une confirmation qui ment est pire que pas de
 * confirmation du tout.
 */
export async function restorePurchases(): Promise<PurchaseOutcome & { restored?: boolean }> {
  if (!Purchases || !configured) return { status: 'error' };
  try {
    const customerInfo = await Purchases.restorePurchases();
    return { status: 'ok', customerInfo, restored: isPremiumActive(customerInfo) };
  } catch (e: any) {
    console.warn('[RevenueCat] restore', e);
    return { status: 'error', message: e?.message };
  }
}

/** Lit les infos client courantes (entitlements). */
export async function getCustomerInfo(): Promise<any | null> {
  if (!Purchases || !configured) return null;
  try { return await Purchases.getCustomerInfo(); }
  catch { return null; }
}
