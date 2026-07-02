export const PRODUCTS = {
  'app-yearly': {
    mode: 'subscription',
    priceEnv: 'STRIPE_PRICE_APP_YEARLY',
    entitlement: 'app',
    successBaseEnv: 'MARKETPLACE_BASE_URL',
    cancelBaseEnv: 'MARKETPLACE_BASE_URL'
  },
  'app-lifetime': {
    mode: 'payment',
    priceEnv: 'STRIPE_PRICE_APP_LIFETIME',
    entitlement: 'app',
    successBaseEnv: 'MARKETPLACE_BASE_URL',
    cancelBaseEnv: 'MARKETPLACE_BASE_URL',
    grantEntitlement: true
  },
  'manuels-v1-v2': {
    mode: 'payment',
    priceEnv: 'STRIPE_PRICE_MANUELS_V1_V2',
    entitlement: 'download:manuels-v1-v2',
    successBaseEnv: 'MARKETPLACE_BASE_URL',
    cancelBaseEnv: 'MARKETPLACE_BASE_URL',
    downloadKey: 'manuels-v1-v2'
  },
  'vocabulary-all-hsk': {
    mode: 'payment',
    priceEnv: 'STRIPE_PRICE_VOCABULARY_ALL_HSK',
    entitlement: 'download:vocabulary-all-hsk',
    successBaseEnv: 'MARKETPLACE_BASE_URL',
    cancelBaseEnv: 'MARKETPLACE_BASE_URL',
    downloadKey: 'vocabulary-all-hsk'
  },
  'vocabulary-one-hsk': {
    mode: 'payment',
    priceEnv: 'STRIPE_PRICE_VOCABULARY_ONE_HSK',
    entitlement: 'download:vocabulary-one-hsk',
    successBaseEnv: 'MARKETPLACE_BASE_URL',
    cancelBaseEnv: 'MARKETPLACE_BASE_URL',
    downloadKey: 'vocabulary-one-hsk',
    requiresLevel: true
  },
  'writing-all-hsk': {
    mode: 'payment',
    priceEnv: 'STRIPE_PRICE_WRITING_ALL_HSK',
    entitlement: 'download:writing-all-hsk',
    successBaseEnv: 'MARKETPLACE_BASE_URL',
    cancelBaseEnv: 'MARKETPLACE_BASE_URL',
    downloadKey: 'writing-all-hsk'
  },
  'writing-one-hsk': {
    mode: 'payment',
    priceEnv: 'STRIPE_PRICE_WRITING_ONE_HSK',
    entitlement: 'download:writing-one-hsk',
    successBaseEnv: 'MARKETPLACE_BASE_URL',
    cancelBaseEnv: 'MARKETPLACE_BASE_URL',
    downloadKey: 'writing-one-hsk',
    requiresLevel: true
  },
  'vocabulary-writing-all-hsk': {
    mode: 'payment',
    priceEnv: 'STRIPE_PRICE_VOCABULARY_WRITING_ALL_HSK',
    entitlement: 'download:vocabulary-writing-all-hsk',
    successBaseEnv: 'MARKETPLACE_BASE_URL',
    cancelBaseEnv: 'MARKETPLACE_BASE_URL',
    downloadKey: 'vocabulary-writing-all-hsk'
  },
  'vocabulary-writing-one-hsk': {
    mode: 'payment',
    priceEnv: 'STRIPE_PRICE_VOCABULARY_WRITING_ONE_HSK',
    entitlement: 'download:vocabulary-writing-one-hsk',
    successBaseEnv: 'MARKETPLACE_BASE_URL',
    cancelBaseEnv: 'MARKETPLACE_BASE_URL',
    downloadKey: 'vocabulary-writing-one-hsk',
    requiresLevel: true
  },
  anki: {
    mode: 'payment',
    priceEnv: 'STRIPE_PRICE_ANKI',
    entitlement: 'download:anki',
    successBaseEnv: 'MARKETPLACE_BASE_URL',
    cancelBaseEnv: 'MARKETPLACE_BASE_URL',
    downloadKey: 'anki'
  }
};

export const resolveProduct = (productId, env) => {
  const product = PRODUCTS[productId];
  if (!product) {
    const error = new Error(`Produit inconnu: ${productId}`);
    error.code = 'PRODUCT_NOT_FOUND';
    throw error;
  }
  const priceId = env[product.priceEnv];
  if (!priceId) {
    const error = new Error(`Variable manquante: ${product.priceEnv}`);
    error.code = 'PRICE_NOT_CONFIGURED';
    throw error;
  }
  return { ...product, id: productId, priceId };
};
