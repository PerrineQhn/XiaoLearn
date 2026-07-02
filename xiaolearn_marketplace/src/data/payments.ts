const defaultBaseUrl = 'https://payments.xiaolearn.com';

export const PAYMENTS_BASE_URL = import.meta.env.PUBLIC_PAYMENTS_BASE_URL || defaultBaseUrl;

export interface CheckoutLinkParams {
  uid?: string;
  email?: string;
  level?: string;
}

export const buildCheckoutLink = (productId: string, params: CheckoutLinkParams = {}) => {
  const base = PAYMENTS_BASE_URL.endsWith('/') ? PAYMENTS_BASE_URL : `${PAYMENTS_BASE_URL}/`;
  const url = new URL('checkout', base);
  url.searchParams.set('productId', productId);

  if (params.uid) {
    url.searchParams.set('uid', params.uid);
  }
  if (params.email) {
    url.searchParams.set('email', params.email);
  }
  if (params.level) {
    url.searchParams.set('level', params.level);
  }

  return url.toString();
};
