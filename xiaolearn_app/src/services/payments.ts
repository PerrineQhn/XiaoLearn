/**
 * Appels aux endpoints Stripe (Cloud Functions).
 *
 * Les deux endpoints exigent désormais un jeton Firebase et en tirent
 * eux-mêmes l'uid : l'`uid` n'est plus transmis dans le corps, il ne servait
 * qu'à laisser un tiers se faire passer pour un autre client. Voir
 * `functions/src/index.ts`, helper `requireAuth`.
 */
import { getAuth } from 'firebase/auth';

const DEFAULT_PAYMENTS_BASE_URL = 'https://payments.xiaolearn.com';

const PAYMENTS_BASE_URL = import.meta.env.VITE_PAYMENTS_BASE_URL || DEFAULT_PAYMENTS_BASE_URL;

/**
 * En-têtes d'une requête authentifiée.
 *
 * `getIdToken()` rafraîchit le jeton s'il a expiré : on le demande au moment
 * de l'appel plutôt que de le mettre en cache, une session laissée ouverte une
 * heure produisant sinon un 401 au moment le plus gênant — le paiement.
 */
const authHeaders = async (): Promise<Record<string, string>> => {
  const user = getAuth().currentUser;
  if (!user) throw new Error('Connexion requise');
  const token = await user.getIdToken();
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
};

const post = async (path: string, body: unknown, fallbackError: string) => {
  const response = await fetch(`${PAYMENTS_BASE_URL}${path}`, {
    method: 'POST',
    headers: await authHeaders(),
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    if (response.status === 401) throw new Error('Session expirée, reconnecte-toi.');
    throw new Error(error.error || fallbackError);
  }

  const data = await response.json();
  if (!data?.url) throw new Error('Lien indisponible');
  return data.url as string;
};

export const createCheckoutSession = async (productId: string, _uid?: string, email?: string) => {
  // `_uid` est conservé dans la signature pour ne pas casser les appelants,
  // mais il n'est plus envoyé : le serveur ne lit que le jeton.
  window.location.href = await post(
    '/api/checkout',
    { productId, email },
    'Erreur lors de la création du paiement'
  );
};

export const createPortalSession = async (_uid: string, returnUrl: string) => {
  window.location.href = await post(
    '/api/portal',
    { returnUrl },
    "Erreur lors de l'ouverture du portail"
  );
};
