import Stripe from 'stripe';
import { resolveDownloadsForPurchase } from './downloads.js';
import { resolveProduct } from './products.js';

const JSON_HEADERS = { 'content-type': 'application/json; charset=utf-8' };
const CORS_HEADERS = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET,POST,OPTIONS',
  'access-control-allow-headers': 'Content-Type, Authorization'
};

const encoder = new TextEncoder();
const GOOGLE_TOKEN_AUD = 'https://oauth2.googleapis.com/token';
const GOOGLE_DATASTORE_SCOPE = 'https://www.googleapis.com/auth/datastore';

let tokenCache = {
  key: '',
  token: '',
  expiresAt: 0
};

const json = (payload, status = 200, headers = {}) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { ...CORS_HEADERS, ...JSON_HEADERS, ...headers }
  });

const textResponse = (payload, status = 200, headers = {}) =>
  new Response(payload, {
    status,
    headers: { ...CORS_HEADERS, ...headers }
  });

const normalizeBaseUrl = (base) => {
  if (!base) return null;
  return base.endsWith('/') ? base.slice(0, -1) : base;
};

const buildSuccessUrl = (base, sessionToken = '{CHECKOUT_SESSION_ID}') => {
  const normalized = normalizeBaseUrl(base);
  if (!normalized) return null;
  return `${normalized}/merci?session_id=${sessionToken}`;
};

const buildCancelUrl = (base) => {
  const normalized = normalizeBaseUrl(base);
  if (!normalized) return null;
  return `${normalized}/produits`;
};

const getCheckoutUrls = (product, env) => {
  const successBase = product.successBaseEnv === 'APP_BASE_URL' ? env.APP_BASE_URL : env.MARKETPLACE_BASE_URL;
  const cancelBase = product.cancelBaseEnv === 'APP_BASE_URL' ? env.APP_BASE_URL : env.MARKETPLACE_BASE_URL;
  return {
    successUrl: buildSuccessUrl(successBase),
    cancelUrl: buildCancelUrl(cancelBase)
  };
};

const buildMetadata = (product, uid, email, level) => {
  const metadata = {
    productId: product.id,
    entitlement: product.entitlement,
    uid: uid || '',
    email: email || ''
  };
  if (level) metadata.level = level;
  return metadata;
};

const PRODUCT_LABELS = {
  __cart__: 'Panier XiaoLearn',
  'app-yearly': 'XiaoLearn App - Licence 1 an',
  'app-lifetime': 'XiaoLearn App - Accès à vie',
  'manuels-v1-v2': 'Pack Manuels XiaoLearn Vol.1 & Vol.2',
  'vocabulary-all-hsk': 'Vocabulaire HSK - Pack complet',
  'vocabulary-one-hsk': 'Vocabulaire HSK - Niveau au choix',
  'writing-all-hsk': 'Écriture HSK - Pack complet',
  'writing-one-hsk': 'Écriture HSK - Niveau au choix',
  'vocabulary-writing-all-hsk': 'Pack Vocabulaire + Écriture HSK',
  'vocabulary-writing-one-hsk': 'Vocabulaire + Écriture HSK - Niveau au choix',
  anki: 'Deck Anki XiaoLearn'
};

const CART_PRODUCT_ID = '__cart__';
const CART_METADATA_KEY = 'cart_items';
const CART_ITEMS_LIMIT = 20;

const escapeHtml = (value) =>
  String(value || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const resolveRecipientEmail = (session) => {
  const candidates = [session?.customer_details?.email, session?.customer_email, session?.metadata?.email];
  return candidates.find((value) => typeof value === 'string' && value.includes('@')) || null;
};

const maskEmail = (email) => {
  if (!email || !email.includes('@')) return null;
  const [local, domain] = email.split('@');
  if (!local || !domain) return null;
  const safeLocal = local.length <= 2 ? `${local[0] || '*'}*` : `${local.slice(0, 2)}***`;
  return `${safeLocal}@${domain}`;
};

const buildMerciUrl = (env, sessionId) => {
  const base = normalizeBaseUrl(env.MARKETPLACE_BASE_URL);
  if (!base || !sessionId) return null;
  return `${base}/merci?session_id=${encodeURIComponent(sessionId)}`;
};

const formatAmount = (amountTotal, currency) => {
  if (typeof amountTotal !== 'number') return null;
  const code = typeof currency === 'string' && currency ? currency.toUpperCase() : 'EUR';
  try {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: code }).format(amountTotal / 100);
  } catch {
    return `${(amountTotal / 100).toFixed(2)} ${code}`;
  }
};

const sendPurchaseEmail = async ({ env, session, product, downloads }) => {
  const apiKey = env.RESEND_API_KEY;
  const from = env.PURCHASE_EMAIL_FROM;
  const to = resolveRecipientEmail(session);
  if (!apiKey || !from || !to) {
    console.log('purchase_email skipped', {
      reason: 'missing_config_or_recipient',
      hasApiKey: Boolean(apiKey),
      hasFrom: Boolean(from),
      hasRecipient: Boolean(to)
    });
    return;
  }

  const productName = PRODUCT_LABELS[product.id] || product.id;
  const merciUrl = buildMerciUrl(env, session?.id);
  const amount = formatAmount(session?.amount_total, session?.currency);
  const links = Array.isArray(downloads) ? downloads.filter((item) => item?.label && item?.url) : [];
  const supportEmail = env.PURCHASE_EMAIL_REPLY_TO || 'support@xiaolearn.com';
  const hasDownloads = links.length > 0;
  const customerNameRaw = typeof session?.customer_details?.name === 'string' ? session.customer_details.name.trim() : '';
  const firstName = customerNameRaw ? customerNameRaw.split(/\s+/)[0] : '';
  const greeting = firstName ? `Bonjour ${firstName},` : 'Bonjour,';
  const greetingHtml = firstName ? `Bonjour ${escapeHtml(firstName)},` : 'Bonjour,';
  const orderRef = session?.id || null;

  const textLines = [
    greeting,
    '',
    'Merci beaucoup pour votre confiance.',
    'Votre commande XiaoLearn est confirmée et vos accès sont disponibles ci-dessous.',
    '',
    'Récapitulatif de commande',
    `- Produit: ${productName}`,
    amount ? `- Montant payé: ${amount}` : null,
    orderRef ? `- Référence: ${orderRef}` : null,
    '',
    hasDownloads ? 'Liens de téléchargement personnels:' : "Aucun lien de téléchargement n'est disponible pour le moment.",
    hasDownloads ? links.map((item) => `- ${item.label}: ${item.url}`).join('\n') : null,
    merciUrl ? `Récapitulatif complet: ${merciUrl}` : null,
    '',
    `Besoin d'aide ? Écrivez-nous à ${supportEmail}.`,
    '',
    'Avec toute notre gratitude,',
    'L\'équipe XiaoLearn'
  ];
  const text = textLines.filter(Boolean).join('\n');

  const linksHtml = hasDownloads
    ? `<div style="margin: 10px 0 0;">${links
        .map(
          (item) =>
            `<p style="margin:0 0 10px;"><a href="${escapeHtml(item.url)}" style="display:inline-block; background:#f5ecea; color:#8f1f1f; text-decoration:none; padding:9px 12px; border-radius:8px; border:1px solid #efdad6; font-weight:600;">Télécharger: ${escapeHtml(item.label)}</a></p>`
        )
        .join('')}</div>`
    : '<p style="margin:8px 0 0; color:#444;">Votre commande est bien enregistrée. Nous vous remercions pour votre confiance.</p>';

  const recapButtonHtml = merciUrl
    ? `<p style="margin: 18px 0 0;"><a href="${escapeHtml(
        merciUrl
      )}" style="display:inline-block; background:#b22222; color:#fff; text-decoration:none; padding:10px 16px; border-radius:8px; font-weight:600;">Voir mon récapitulatif complet</a></p>`
    : '';

  const amountHtml = amount
    ? `<p style="margin:8px 0 0; color:#222;"><strong>Montant payé:</strong> ${escapeHtml(amount)}</p>`
    : '';

  const referenceHtml = orderRef
    ? `<p style="margin:8px 0 0; color:#222;"><strong>Référence:</strong> ${escapeHtml(orderRef)}</p>`
    : '';

  const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.55; color: #111; background:#f4f1ef; padding:24px;">
      <div style="max-width:640px; margin:0 auto; background:#ffffff; border:1px solid #ececec; border-radius:12px; overflow:hidden;">
        <div style="padding:18px 22px; background:linear-gradient(120deg,#b22222,#d94f3d); color:#fff;">
          <p style="margin:0; font-size:15px; opacity:0.95;">XiaoLearn</p>
          <h2 style="margin:6px 0 0; font-size:20px;">Commande confirmée</h2>
        </div>
        <div style="padding:22px;">
          <p style="margin:0 0 12px;">${greetingHtml}</p>
          <p style="margin:0 0 12px;">Merci beaucoup pour votre confiance. Votre commande XiaoLearn est confirmée.</p>
          <div style="margin:0; padding:14px; border:1px solid #efe7e4; border-radius:10px; background:#fcfaf9;">
            <p style="margin:0; color:#111;"><strong>Récapitulatif de commande</strong></p>
            <p style="margin:8px 0 0; color:#222;"><strong>Produit:</strong> ${escapeHtml(productName)}</p>
            ${amountHtml}
            ${referenceHtml}
          </div>
          <h3 style="margin:18px 0 0; font-size:16px;">Vos liens de téléchargement</h3>
          ${linksHtml}
          ${recapButtonHtml}
          <p style="margin:20px 0 0; color:#444;">Si vous avez la moindre question, écrivez-nous à <a href="mailto:${escapeHtml(
            supportEmail
          )}" style="color:#b22222; text-decoration:none;">${escapeHtml(supportEmail)}</a>.</p>
          <p style="margin:16px 0 0; color:#444;">Avec toute notre gratitude,<br/>L'équipe XiaoLearn</p>
        </div>
      </div>
    </div>
  `;

  const payload = {
    from,
    to: [to],
    subject: `Commande confirmée XiaoLearn - ${productName}`,
    html,
    text
  };
  if (env.PURCHASE_EMAIL_REPLY_TO) payload.reply_to = env.PURCHASE_EMAIL_REPLY_TO;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${apiKey}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Email achat impossible (${response.status}): ${errorText}`);
  }

  const data = await response.json().catch(() => ({}));
  console.log('purchase_email sent', {
    sessionId: session?.id || null,
    productId: product?.id || null,
    recipient: maskEmail(to),
    resendId: data?.id || null
  });
};

const sendPurchaseEmailOnce = async ({ env, session, product, downloads, trigger }) => {
  const sessionId = session?.id;
  if (!sessionId) return;

  const canDeduplicate = firestoreConfigured(env);
  let dedupeAvailable = canDeduplicate;
  if (canDeduplicate) {
    try {
      const existing = await getDocument(env, 'purchase_email_logs', sessionId);
      if (existing?.data?.status === 'sent') {
        console.log('purchase_email skipped', { reason: 'already_sent', sessionId });
        return;
      }
    } catch (error) {
      dedupeAvailable = false;
      console.error('purchase_email dedupe_unavailable', error);
    }
  } else if (trigger === 'downloads_api') {
    // Avoid sending on every /api/downloads call when no durable store is available.
    console.log('purchase_email skipped', { reason: 'no_firestore_for_downloads_api', sessionId });
    return;
  }

  try {
    await sendPurchaseEmail({ env, session, product, downloads });
    if (dedupeAvailable) {
      try {
        await patchDocument(env, 'purchase_email_logs', sessionId, {
          status: 'sent',
          sentAt: new Date().toISOString(),
          trigger: trigger || 'unknown',
          email: resolveRecipientEmail(session),
          productId: product?.id || null
        });
      } catch (error) {
        console.error('purchase_email dedupe_write_failed', error);
      }
    }
  } catch (error) {
    if (dedupeAvailable) {
      try {
        await patchDocument(env, 'purchase_email_logs', sessionId, {
          status: 'error',
          updatedAt: new Date().toISOString(),
          trigger: trigger || 'unknown',
          email: resolveRecipientEmail(session),
          productId: product?.id || null,
          error: String(error?.message || error || 'unknown')
        });
      } catch (writeError) {
        console.error('purchase_email dedupe_write_failed', writeError);
      }
    }
    throw error;
  }
};

const toBase64Url = (input) =>
  btoa(input).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');

const bytesToBase64Url = (bytes) => {
  let binary = '';
  for (let i = 0; i < bytes.length; i += 1) binary += String.fromCharCode(bytes[i]);
  return toBase64Url(binary);
};

const pemToDer = (pem) => {
  const normalized = String(pem || '')
    .trim()
    .replace(/^"+|"+$/g, '')
    .replace(/\\n/g, '\n');
  const content = normalized
    .replace(/-----BEGIN [^-]+-----/g, '')
    .replace(/-----END [^-]+-----/g, '')
    .replace(/[^A-Za-z0-9+/=]/g, '');
  const binary = atob(content);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
};

const isPlainObject = (value) => Object.prototype.toString.call(value) === '[object Object]';

const toFirestoreValue = (value) => {
  if (value === null) return { nullValue: null };
  if (typeof value === 'boolean') return { booleanValue: value };
  if (typeof value === 'number') {
    if (Number.isInteger(value)) return { integerValue: String(value) };
    return { doubleValue: value };
  }
  if (typeof value === 'string') return { stringValue: value };
  if (Array.isArray(value)) {
    return {
      arrayValue: {
        values: value.map((item) => toFirestoreValue(item))
      }
    };
  }
  if (isPlainObject(value)) {
    return {
      mapValue: {
        fields: toFirestoreFields(value)
      }
    };
  }
  return { stringValue: String(value) };
};

const toFirestoreFields = (objectValue) => {
  const fields = {};
  for (const [key, value] of Object.entries(objectValue || {})) {
    if (value === undefined) continue;
    fields[key] = toFirestoreValue(value);
  }
  return fields;
};

const fromFirestoreValue = (value) => {
  if (!value || typeof value !== 'object') return null;
  if ('nullValue' in value) return null;
  if ('booleanValue' in value) return Boolean(value.booleanValue);
  if ('integerValue' in value) return Number(value.integerValue);
  if ('doubleValue' in value) return Number(value.doubleValue);
  if ('stringValue' in value) return value.stringValue;
  if ('timestampValue' in value) return value.timestampValue;
  if ('arrayValue' in value) return (value.arrayValue.values || []).map((item) => fromFirestoreValue(item));
  if ('mapValue' in value) return fromFirestoreFields(value.mapValue.fields || {});
  return null;
};

const fromFirestoreFields = (fields) => {
  const output = {};
  for (const [key, value] of Object.entries(fields || {})) {
    output[key] = fromFirestoreValue(value);
  }
  return output;
};

const firestoreConfigured = (env) =>
  Boolean(env.FIREBASE_PROJECT_ID && env.FIREBASE_CLIENT_EMAIL && env.FIREBASE_PRIVATE_KEY);

const firestoreRoot = (env) =>
  `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)`;

const firestoreDocumentsRoot = (env) => `${firestoreRoot(env)}/documents`;

const toDocPath = (...segments) => segments.map((segment) => encodeURIComponent(segment)).join('/');

const getGoogleAccessToken = async (env) => {
  if (!firestoreConfigured(env)) return null;
  const cacheKey = `${env.FIREBASE_PROJECT_ID}:${env.FIREBASE_CLIENT_EMAIL}`;
  const now = Math.floor(Date.now() / 1000);
  if (tokenCache.key === cacheKey && tokenCache.token && tokenCache.expiresAt > now + 60) {
    return tokenCache.token;
  }

  const der = pemToDer(env.FIREBASE_PRIVATE_KEY);
  const signingKey = await crypto.subtle.importKey(
    'pkcs8',
    der,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const header = { alg: 'RS256', typ: 'JWT' };
  const claims = {
    iss: env.FIREBASE_CLIENT_EMAIL,
    scope: GOOGLE_DATASTORE_SCOPE,
    aud: GOOGLE_TOKEN_AUD,
    iat: now,
    exp: now + 3600
  };

  const unsignedToken = `${toBase64Url(JSON.stringify(header))}.${toBase64Url(JSON.stringify(claims))}`;
  const signature = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', signingKey, encoder.encode(unsignedToken));
  const jwt = `${unsignedToken}.${bytesToBase64Url(new Uint8Array(signature))}`;

  const body = new URLSearchParams({
    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    assertion: jwt
  });

  const response = await fetch(GOOGLE_TOKEN_AUD, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: body.toString()
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Token Google impossible (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  tokenCache = {
    key: cacheKey,
    token: data.access_token,
    expiresAt: now + Number(data.expires_in || 3600)
  };
  return tokenCache.token;
};

const firestoreFetch = async (env, path, init = {}) => {
  const token = await getGoogleAccessToken(env);
  if (!token) throw new Error('Firebase non configuré');
  const headers = new Headers(init.headers || {});
  headers.set('authorization', `Bearer ${token}`);
  if (init.body && !headers.has('content-type')) {
    headers.set('content-type', 'application/json');
  }
  return fetch(`${firestoreDocumentsRoot(env)}/${path}`, { ...init, headers });
};

const getDocument = async (env, collection, docId) => {
  const response = await firestoreFetch(env, toDocPath(collection, docId), { method: 'GET' });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Lecture Firestore impossible (${response.status})`);
  const document = await response.json();
  return {
    id: docId,
    data: fromFirestoreFields(document.fields || {})
  };
};

const patchDocument = async (env, collection, docId, fields) => {
  const response = await firestoreFetch(env, toDocPath(collection, docId), {
    method: 'PATCH',
    body: JSON.stringify({ fields: toFirestoreFields(fields) })
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Ecriture Firestore impossible (${response.status}): ${errorText}`);
  }
};

const runUsersQuery = async (env, fieldPath, value) => {
  const token = await getGoogleAccessToken(env);
  if (!token) return null;

  const endpoint = `${firestoreRoot(env)}/documents:runQuery`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      structuredQuery: {
        from: [{ collectionId: 'users' }],
        where: {
          fieldFilter: {
            field: { fieldPath },
            op: 'EQUAL',
            value: toFirestoreValue(value)
          }
        },
        limit: 1
      }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Query Firestore impossible (${response.status}): ${errorText}`);
  }

  const rows = await response.json();
  const document = rows.find((row) => row.document)?.document;
  if (!document?.name) return null;
  const segments = document.name.split('/');
  const id = segments[segments.length - 1];
  return { id, data: fromFirestoreFields(document.fields || {}) };
};

const getMergedEntitlements = (currentData, entitlementKey, entitlementPayload) => ({
  ...(currentData?.entitlements || {}),
  [entitlementKey]: entitlementPayload
});

const updateSubscriptionEntitlement = async ({ env, uid, email, entitlement, subscription, customerId, priceId }) => {
  if (!firestoreConfigured(env)) return;

  const currentPeriodEnd = subscription?.current_period_end
    ? new Date(subscription.current_period_end * 1000).toISOString()
    : null;
  const status = subscription?.status ?? 'active';
  const active = ['active', 'trialing'].includes(status);

  const entitlementPayload = {
    active,
    status,
    currentPeriodEnd,
    subscriptionId: subscription?.id ?? null,
    priceId: priceId ?? null,
    customerId: customerId ?? null,
    cancelAtPeriodEnd: subscription?.cancel_at_period_end ?? false,
    updatedAt: new Date().toISOString()
  };

  if (uid) {
    const user = await getDocument(env, 'users', uid);
    await patchDocument(env, 'users', uid, {
      entitlements: getMergedEntitlements(user?.data, entitlement, entitlementPayload),
      stripeCustomerId: customerId ?? null,
      updatedAt: new Date().toISOString()
    });
    return;
  }

  if (email) {
    const user = await runUsersQuery(env, 'email', email);
    if (user?.id) {
      await patchDocument(env, 'users', user.id, {
        entitlements: getMergedEntitlements(user.data, entitlement, entitlementPayload),
        stripeCustomerId: customerId ?? null,
        updatedAt: new Date().toISOString()
      });
      return;
    }

    const pendingId = email.toLowerCase();
    await patchDocument(env, 'pending_entitlements', pendingId, {
      email,
      entitlements: getMergedEntitlements({}, entitlement, entitlementPayload),
      stripeCustomerId: customerId ?? null,
      updatedAt: new Date().toISOString()
    });
  }
};

const updateLifetimeEntitlement = async ({ env, uid, email, entitlement, customerId, priceId }) => {
  if (!firestoreConfigured(env)) return;

  const entitlementPayload = {
    active: true,
    status: 'paid',
    currentPeriodEnd: null,
    subscriptionId: null,
    priceId: priceId ?? null,
    customerId: customerId ?? null,
    cancelAtPeriodEnd: false,
    updatedAt: new Date().toISOString()
  };

  if (uid) {
    const user = await getDocument(env, 'users', uid);
    await patchDocument(env, 'users', uid, {
      entitlements: getMergedEntitlements(user?.data, entitlement, entitlementPayload),
      stripeCustomerId: customerId ?? null,
      updatedAt: new Date().toISOString()
    });
    return;
  }

  if (email) {
    const user = await runUsersQuery(env, 'email', email);
    if (user?.id) {
      await patchDocument(env, 'users', user.id, {
        entitlements: getMergedEntitlements(user.data, entitlement, entitlementPayload),
        stripeCustomerId: customerId ?? null,
        updatedAt: new Date().toISOString()
      });
      return;
    }

    const pendingId = email.toLowerCase();
    await patchDocument(env, 'pending_entitlements', pendingId, {
      email,
      entitlements: getMergedEntitlements({}, entitlement, entitlementPayload),
      stripeCustomerId: customerId ?? null,
      updatedAt: new Date().toISOString()
    });
  }
};

const storePurchase = async ({ env, uid, email, productId, purchaseKey, level, sessionId, amountTotal, currency }) => {
  if (!firestoreConfigured(env)) return;
  const key = purchaseKey || productId;

  const purchasePayload = {
    productId,
    level: level || null,
    status: 'paid',
    sessionId,
    amountTotal,
    currency,
    paidAt: new Date().toISOString()
  };

  if (uid) {
    const user = await getDocument(env, 'users', uid);
    await patchDocument(env, 'users', uid, {
      purchases: {
        ...(user?.data?.purchases || {}),
        [key]: purchasePayload
      },
      updatedAt: new Date().toISOString()
    });
    return;
  }

  if (email) {
    const user = await runUsersQuery(env, 'email', email);
    if (user?.id) {
      await patchDocument(env, 'users', user.id, {
        purchases: {
          ...(user.data?.purchases || {}),
          [key]: purchasePayload
        },
        updatedAt: new Date().toISOString()
      });
      return;
    }

    const pendingId = email.toLowerCase();
    await patchDocument(env, 'pending_entitlements', pendingId, {
      email,
      purchases: { [key]: purchasePayload },
      updatedAt: new Date().toISOString()
    });
  }
};

const normalizeLevel = (level) => (typeof level === 'string' ? level.trim() : '');

const buildCartItemKey = ({ productId, level }) => `${productId}::${normalizeLevel(level)}`;

const buildPurchaseKey = ({ productId, level }) => {
  const normalizedLevel = normalizeLevel(level);
  if (!normalizedLevel) return productId;
  return `${productId}#${normalizedLevel.toLowerCase().replace(/\s+/g, '')}`;
};

const normalizeCartItemsInput = (items) => {
  if (!Array.isArray(items)) return [];
  const deduped = new Map();

  for (const rawItem of items) {
    if (!rawItem || typeof rawItem !== 'object') continue;
    const productId = typeof rawItem.productId === 'string' ? rawItem.productId.trim() : '';
    if (!productId) continue;
    const level = normalizeLevel(rawItem.level);
    const normalized = level ? { productId, level } : { productId };
    deduped.set(buildCartItemKey(normalized), normalized);
    if (deduped.size >= CART_ITEMS_LIMIT) break;
  }

  return Array.from(deduped.values());
};

const encodeCartItemsMetadata = (items) =>
  items
    .map((item) => {
      const productToken = encodeURIComponent(item.productId);
      const levelToken = normalizeLevel(item.level) ? `@${encodeURIComponent(item.level)}` : '';
      return `${productToken}${levelToken}`;
    })
    .join('|');

const parseCartItemsMetadata = (value) => {
  if (typeof value !== 'string' || !value) return [];
  const tokens = value.split('|').map((token) => token.trim()).filter(Boolean);
  const decoded = tokens
    .map((token) => {
      try {
        const separatorIndex = token.indexOf('@');
        if (separatorIndex === -1) {
          return { productId: decodeURIComponent(token) };
        }
        return {
          productId: decodeURIComponent(token.slice(0, separatorIndex)),
          level: decodeURIComponent(token.slice(separatorIndex + 1))
        };
      } catch {
        return null;
      }
    })
    .filter(Boolean);
  return normalizeCartItemsInput(decoded);
};

const extractSessionItems = (session) => {
  const cartItems = parseCartItemsMetadata(session?.metadata?.[CART_METADATA_KEY]);
  if (cartItems.length > 0) return cartItems;

  const productId = session?.metadata?.productId;
  if (!productId || productId === CART_PRODUCT_ID) return [];
  const level = normalizeLevel(session?.metadata?.level);
  return [{ productId, ...(level ? { level } : {}) }];
};

const resolveDownloadsForSessionItems = ({ items, env }) => {
  const downloads = [];
  const seen = new Set();

  for (const item of items) {
    const product = resolveProduct(item.productId, env);
    if (!product.downloadKey) continue;
    const entries = resolveDownloadsForPurchase({
      downloadKey: product.downloadKey,
      level: item.level,
      baseUrl: env.DOWNLOADS_BASE_URL
    });
    for (const entry of entries) {
      const key = `${entry.label}::${entry.url}`;
      if (seen.has(key)) continue;
      seen.add(key);
      downloads.push(entry);
    }
  }

  return downloads;
};

const resolveCheckoutSession = async ({ stripe, env, productId, uid, email, level }) => {
  const product = resolveProduct(productId, env);
  const { successUrl, cancelUrl } = getCheckoutUrls(product, env);
  if (!successUrl || !cancelUrl) throw new Error('URLs de redirection manquantes');

  const checkoutLevel = typeof level === 'string' ? level.trim() : '';
  if (product.requiresLevel && !checkoutLevel) {
    throw new Error('level requis pour ce produit');
  }

  const metadata = buildMetadata(product, uid, email, checkoutLevel);
  const params = {
    mode: product.mode,
    line_items: [{ price: product.priceId, quantity: 1 }],
    success_url: successUrl,
    cancel_url: cancelUrl,
    allow_promotion_codes: true,
    client_reference_id: uid || undefined,
    customer_email: email || undefined,
    metadata
  };

  if (product.mode === 'subscription') {
    params.subscription_data = { metadata };
  } else {
    params.payment_intent_data = { metadata };
  }

  return stripe.checkout.sessions.create(params);
};

const resolveCartCheckoutSession = async ({ stripe, env, items, uid, email }) => {
  const normalizedItems = normalizeCartItemsInput(items);
  if (normalizedItems.length === 0) {
    throw new Error('items requis');
  }

  const enrichedItems = normalizedItems.map((item) => ({
    ...item,
    product: resolveProduct(item.productId, env)
  }));

  if (enrichedItems.some((item) => item.product.mode === 'subscription')) {
    throw new Error('Le panier ne prend pas encore en charge les abonnements');
  }

  for (const item of enrichedItems) {
    if (item.product.requiresLevel && !normalizeLevel(item.level)) {
      throw new Error(`level requis pour ${item.product.id}`);
    }
  }

  const firstProduct = enrichedItems[0]?.product;
  const { successUrl, cancelUrl } = getCheckoutUrls(firstProduct, env);
  if (!successUrl || !cancelUrl) throw new Error('URLs de redirection manquantes');

  const lineItemsByPrice = new Map();
  for (const item of enrichedItems) {
    const key = item.product.priceId;
    const current = lineItemsByPrice.get(key) || 0;
    lineItemsByPrice.set(key, current + 1);
  }
  const line_items = Array.from(lineItemsByPrice.entries()).map(([price, quantity]) => ({ price, quantity }));

  const metadata = {
    productId: CART_PRODUCT_ID,
    entitlement: 'cart',
    uid: uid || '',
    email: email || '',
    [CART_METADATA_KEY]: encodeCartItemsMetadata(normalizedItems)
  };

  return stripe.checkout.sessions.create({
    mode: 'payment',
    line_items,
    success_url: successUrl,
    cancel_url: cancelUrl,
    allow_promotion_codes: true,
    client_reference_id: uid || undefined,
    customer_email: email || undefined,
    metadata,
    payment_intent_data: { metadata }
  });
};

const handleCheckoutCompleted = async ({ stripe, env, session }) => {
  const sessionItems = extractSessionItems(session);
  if (sessionItems.length === 0) return;
  const resolvedItems = sessionItems.map((item) => ({
    ...item,
    product: resolveProduct(item.productId, env)
  }));
  const uid = session.client_reference_id || session?.metadata?.uid || null;
  const email = session.customer_details?.email || session.customer_email || null;
  const downloads = resolveDownloadsForSessionItems({ items: sessionItems, env });
  const firstItem = resolvedItems[0];

  if (resolvedItems.length === 1 && firstItem.product.mode === 'subscription') {
    const subscriptionId = session.subscription;
    if (!subscriptionId) return;
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const priceId = subscription.items?.data?.[0]?.price?.id ?? null;
    await updateSubscriptionEntitlement({
      env,
      uid,
      email,
      entitlement: firstItem.product.entitlement,
      subscription,
      customerId: session.customer,
      priceId
    });
    try {
      await sendPurchaseEmailOnce({ env, session, product: firstItem.product, downloads, trigger: 'webhook' });
    } catch (error) {
      console.error(error);
    }
    return;
  }

  if (resolvedItems.some((item) => item.product.mode === 'subscription')) {
    console.error('Panier invalide: mélange abonnement et paiement', {
      sessionId: session?.id || null
    });
    return;
  }

  for (const item of resolvedItems) {
    await storePurchase({
      env,
      uid,
      email,
      productId: item.product.id,
      purchaseKey: buildPurchaseKey({ productId: item.product.id, level: item.level }),
      level: item.level,
      sessionId: session.id,
      amountTotal: session.amount_total,
      currency: session.currency
    });

    if (item.product.grantEntitlement) {
      await updateLifetimeEntitlement({
        env,
        uid,
        email,
        entitlement: item.product.entitlement,
        customerId: session.customer,
        priceId: item.product.priceId
      });
    }
  }

  try {
    const emailProduct = resolvedItems.length > 1 ? { id: CART_PRODUCT_ID } : firstItem.product;
    await sendPurchaseEmailOnce({ env, session, product: emailProduct, downloads, trigger: 'webhook' });
  } catch (error) {
    console.error(error);
  }
};

const handleSubscriptionUpdated = async ({ env, subscription }) => {
  const entitlement = subscription.metadata?.entitlement || 'app';
  const uid = subscription.metadata?.uid || null;
  const customerId = subscription.customer;
  const priceId = subscription.items?.data?.[0]?.price?.id ?? null;

  if (uid) {
    await updateSubscriptionEntitlement({
      env,
      uid,
      email: null,
      entitlement,
      subscription,
      customerId,
      priceId
    });
    return;
  }

  if (customerId) {
    const user = await runUsersQuery(env, 'stripeCustomerId', customerId);
    if (user?.id) {
      await patchDocument(env, 'users', user.id, {
        entitlements: getMergedEntitlements(user.data, entitlement, {
          active: ['active', 'trialing'].includes(subscription.status),
          status: subscription.status,
          currentPeriodEnd: subscription.current_period_end
            ? new Date(subscription.current_period_end * 1000).toISOString()
            : null,
          subscriptionId: subscription.id,
          priceId,
          customerId,
          cancelAtPeriodEnd: subscription.cancel_at_period_end ?? false,
          updatedAt: new Date().toISOString()
        }),
        stripeCustomerId: customerId,
        updatedAt: new Date().toISOString()
      });
      return;
    }
  }

  if (subscription.customer_email) {
    await updateSubscriptionEntitlement({
      env,
      uid: null,
      email: subscription.customer_email,
      entitlement,
      subscription,
      customerId,
      priceId
    });
  }
};

const withStripe = (env) => {
  if (!env.STRIPE_SECRET_KEY) throw new Error('STRIPE_SECRET_KEY manquante');
  return new Stripe(env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });
};

const getCheckoutParamsFromRequest = async (request) => {
  if (request.method === 'GET') {
    const url = new URL(request.url);
    return {
      productId: url.searchParams.get('productId') || '',
      uid: url.searchParams.get('uid') || undefined,
      email: url.searchParams.get('email') || undefined,
      level: url.searchParams.get('level') || undefined
    };
  }

  const body = await request.json().catch(() => ({}));
  return {
    productId: body.productId || '',
    uid: body.uid || undefined,
    email: body.email || undefined,
    level: body.level || undefined
  };
};

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    try {
      const url = new URL(request.url);
      const path = url.pathname;

      if (request.method === 'GET' && path === '/health') {
        return json({ ok: true });
      }

      if ((request.method === 'GET' && path === '/checkout') || (request.method === 'POST' && path === '/api/checkout')) {
        const stripe = withStripe(env);
        const { productId, uid, email, level } = await getCheckoutParamsFromRequest(request);
        if (!productId) return json({ error: 'productId requis' }, 400);

        const session = await resolveCheckoutSession({ stripe, env, productId, uid, email, level });
        if (request.method === 'GET') return Response.redirect(session.url, 303);
        return json({ url: session.url });
      }

      if (request.method === 'POST' && path === '/api/checkout-cart') {
        const stripe = withStripe(env);
        const body = await request.json().catch(() => ({}));
        const items = Array.isArray(body.items) ? body.items : [];
        const uid = typeof body.uid === 'string' ? body.uid : undefined;
        const email = typeof body.email === 'string' ? body.email : undefined;
        try {
          const session = await resolveCartCheckoutSession({ stripe, env, items, uid, email });
          return json({ url: session.url });
        } catch (error) {
          return json({ error: error.message || 'Erreur checkout panier' }, 400);
        }
      }

      if (request.method === 'POST' && path === '/api/portal') {
        if (!firestoreConfigured(env)) return json({ error: 'Firebase non configuré' }, 500);

        const stripe = withStripe(env);
        const body = await request.json().catch(() => ({}));
        const uid = typeof body.uid === 'string' ? body.uid : '';
        const returnUrl = typeof body.returnUrl === 'string' ? body.returnUrl : '';
        if (!uid) return json({ error: 'uid requis' }, 400);

        const user = await getDocument(env, 'users', uid);
        if (!user) return json({ error: 'Utilisateur introuvable' }, 404);

        const customerId = user.data?.stripeCustomerId;
        if (!customerId) return json({ error: 'Aucun client Stripe lié' }, 400);

        const session = await stripe.billingPortal.sessions.create({
          customer: customerId,
          return_url: returnUrl || env.APP_BASE_URL || env.MARKETPLACE_BASE_URL
        });
        return json({ url: session.url });
      }

      if (request.method === 'GET' && path === '/api/downloads') {
        const stripe = withStripe(env);
        const sessionId = url.searchParams.get('session_id');
        if (!sessionId) return json({ error: 'session_id requis' }, 400);

        const session = await stripe.checkout.sessions.retrieve(sessionId);
        if (!['paid', 'no_payment_required'].includes(session.payment_status)) {
          return json({ error: 'Paiement non confirmé' }, 403);
        }

        const sessionItems = extractSessionItems(session);
        if (sessionItems.length === 0) return json({ downloads: [] });
        const downloads = resolveDownloadsForSessionItems({ items: sessionItems, env });

        try {
          const emailProduct =
            sessionItems.length > 1 ? { id: CART_PRODUCT_ID } : { id: sessionItems[0].productId };
          await sendPurchaseEmailOnce({ env, session, product: emailProduct, downloads, trigger: 'downloads_api' });
        } catch (error) {
          console.error(error);
        }

        return json({ downloads });
      }

      if (request.method === 'POST' && path === '/api/webhook') {
        if (!env.STRIPE_WEBHOOK_SECRET) {
          return textResponse('Stripe webhook secret manquant', 400);
        }
        const stripe = withStripe(env);
        const signature = request.headers.get('stripe-signature') || '';
        const payload = await request.text();

        let event;
        try {
          event = await stripe.webhooks.constructEventAsync(
            payload,
            signature,
            env.STRIPE_WEBHOOK_SECRET,
            undefined,
            Stripe.createSubtleCryptoProvider()
          );
        } catch (error) {
          return textResponse(`Webhook Error: ${error.message}`, 400);
        }

        try {
          switch (event.type) {
            case 'checkout.session.completed':
              await handleCheckoutCompleted({ stripe, env, session: event.data.object });
              break;
            case 'customer.subscription.updated':
            case 'customer.subscription.deleted':
              await handleSubscriptionUpdated({ env, subscription: event.data.object });
              break;
            default:
              break;
          }
          return json({ received: true });
        } catch (error) {
          return textResponse(`Webhook handler error: ${error.message}`, 500);
        }
      }

      return json({ error: 'Not found' }, 404);
    } catch (error) {
      return json({ error: error.message || 'Erreur serveur' }, 500);
    }
  }
};
