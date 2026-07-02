const DEFAULT_PAYMENTS_BASE_URL = 'https://payments.xiaolearn.com';

const PAYMENTS_BASE_URL = import.meta.env.VITE_PAYMENTS_BASE_URL || DEFAULT_PAYMENTS_BASE_URL;

export const createCheckoutSession = async (productId: string, uid?: string, email?: string) => {
  const response = await fetch(`${PAYMENTS_BASE_URL}/api/checkout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ productId, uid, email })
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || 'Erreur lors de la création du paiement');
  }

  const data = await response.json();
  if (!data?.url) {
    throw new Error('Lien de paiement indisponible');
  }

  window.location.href = data.url;
};

export const createPortalSession = async (uid: string, returnUrl: string) => {
  const response = await fetch(`${PAYMENTS_BASE_URL}/api/portal`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ uid, returnUrl })
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || 'Erreur lors de l\'ouverture du portail');
  }

  const data = await response.json();
  if (!data?.url) {
    throw new Error('Lien du portail indisponible');
  }

  window.location.href = data.url;
};
