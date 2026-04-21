import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';
import admin from 'firebase-admin';
import { resolveDownloadsForPurchase } from './downloads.js';
import { resolveProduct } from './products.js';

const {
  STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET,
  FIREBASE_PROJECT_ID,
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_PRIVATE_KEY,
  APP_BASE_URL,
  MARKETPLACE_BASE_URL,
  DOWNLOADS_BASE_URL,
  RESEND_API_KEY,
  PURCHASE_EMAIL_FROM,
  PURCHASE_EMAIL_REPLY_TO,
  SUPPORT_REPORT_TO,
  SUPPORT_REPORT_FROM
} = process.env;

const SUPPORT_EMAIL_DEFAULT_TO = 'xiaolearn.mandarin@support.com';
const SUPPORT_SEVERITY_VALUES = new Set(['low', 'medium', 'high', 'critical']);

if (!STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY manquante');
}

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16'
});

const firebaseConfigured = Boolean(FIREBASE_PROJECT_ID && FIREBASE_CLIENT_EMAIL && FIREBASE_PRIVATE_KEY);
if (firebaseConfigured && admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: FIREBASE_PROJECT_ID,
      clientEmail: FIREBASE_CLIENT_EMAIL,
      privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    })
  });
}

const db = firebaseConfigured ? admin.firestore() : null;

const app = express();
app.use(cors({ origin: true }));

const jsonParser = express.json({ limit: '1mb' });

const getBaseUrl = (base) => {
  if (!base) return null;
  return base.endsWith('/') ? base.slice(0, -1) : base;
};

const buildSuccessUrl = (base, sessionToken = '{CHECKOUT_SESSION_ID}') => {
  const trimmed = getBaseUrl(base);
  if (!trimmed) return null;
  return `${trimmed}/merci?session_id=${sessionToken}`;
};

const buildCancelUrl = (base) => {
  const trimmed = getBaseUrl(base);
  if (!trimmed) return null;
  return `${trimmed}/produits`;
};

const getCheckoutUrls = (product) => {
  const successBase = product.successBaseEnv === 'APP_BASE_URL' ? APP_BASE_URL : MARKETPLACE_BASE_URL;
  const cancelBase = product.cancelBaseEnv === 'APP_BASE_URL' ? APP_BASE_URL : MARKETPLACE_BASE_URL;
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

  if (level) {
    metadata.level = level;
  }

  return metadata;
};

const PRODUCT_LABELS = {
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

const buildMerciUrl = (sessionId) => {
  const base = getBaseUrl(MARKETPLACE_BASE_URL);
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

const normalizeTextValue = (value, maxLength) => {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
};

const normalizeOptionalTextValue = (value, maxLength) => {
  if (typeof value !== 'string') return null;
  const normalized = value.trim().slice(0, maxLength);
  return normalized.length > 0 ? normalized : null;
};

const normalizeSupportReport = (payload = {}) => {
  const title = normalizeTextValue(payload.title, 180);
  const description = normalizeTextValue(payload.description, 5000);
  const severity = SUPPORT_SEVERITY_VALUES.has(payload.severity) ? payload.severity : 'medium';
  const language = payload.language === 'en' ? 'en' : 'fr';
  const pageUrl = normalizeOptionalTextValue(payload.pageUrl, 500);
  const userAgent = normalizeOptionalTextValue(payload.userAgent, 500);
  const reporterEmail = normalizeOptionalTextValue(payload.reporterEmail, 320);
  const reporterName = normalizeOptionalTextValue(payload.reporterName, 180);
  const reporterUid = normalizeOptionalTextValue(payload.reporterUid, 128);
  const occurredAt = normalizeOptionalTextValue(payload.occurredAt, 80);

  if (!title || !description) {
    throw new Error('title et description requis');
  }

  return {
    title,
    description,
    severity,
    language,
    pageUrl,
    userAgent,
    reporterEmail,
    reporterName,
    reporterUid,
    occurredAt
  };
};

const buildSupportReportEmail = ({ report, reportId }) => {
  const to = SUPPORT_REPORT_TO || SUPPORT_EMAIL_DEFAULT_TO;
  const from = SUPPORT_REPORT_FROM || PURCHASE_EMAIL_FROM;
  if (!RESEND_API_KEY || !from || !to) {
    throw new Error('Configuration email support incomplète');
  }

  const severityLabel =
    report.severity === 'critical'
      ? 'Critique'
      : report.severity === 'high'
      ? 'Élevée'
      : report.severity === 'low'
      ? 'Faible'
      : 'Moyenne';
  const submittedAt = new Date().toISOString();
  const subjectPrefix = report.language === 'en' ? '[XiaoLearn Support] Bug report' : '[XiaoLearn Support] Signalement bug';
  const subject = `${subjectPrefix} (${severityLabel}) - ${report.title}`;

  const text = [
    `ID: ${reportId}`,
    `Date: ${submittedAt}`,
    `Gravité: ${severityLabel} (${report.severity})`,
    report.reporterName ? `Nom: ${report.reporterName}` : null,
    report.reporterEmail ? `Email: ${report.reporterEmail}` : null,
    report.reporterUid ? `UID: ${report.reporterUid}` : null,
    report.pageUrl ? `Page: ${report.pageUrl}` : null,
    report.occurredAt ? `Date client: ${report.occurredAt}` : null,
    report.userAgent ? `User-Agent: ${report.userAgent}` : null,
    '',
    `Titre: ${report.title}`,
    '',
    'Description:',
    report.description
  ]
    .filter(Boolean)
    .join('\n');

  const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.5; color:#121212; background:#f7f5f4; padding:20px;">
      <div style="max-width:720px; margin:0 auto; background:#fff; border:1px solid #ece7e5; border-radius:12px;">
        <div style="padding:14px 18px; background:linear-gradient(120deg,#b22222,#d94f3d); color:#fff;">
          <h2 style="margin:0; font-size:18px;">Nouveau signalement XiaoLearn</h2>
        </div>
        <div style="padding:18px;">
          <p style="margin:0 0 10px;"><strong>ID:</strong> ${escapeHtml(reportId)}</p>
          <p style="margin:0 0 10px;"><strong>Gravité:</strong> ${escapeHtml(severityLabel)} (${escapeHtml(report.severity)})</p>
          ${report.reporterName ? `<p style="margin:0 0 10px;"><strong>Nom:</strong> ${escapeHtml(report.reporterName)}</p>` : ''}
          ${report.reporterEmail ? `<p style="margin:0 0 10px;"><strong>Email:</strong> ${escapeHtml(report.reporterEmail)}</p>` : ''}
          ${report.reporterUid ? `<p style="margin:0 0 10px;"><strong>UID:</strong> ${escapeHtml(report.reporterUid)}</p>` : ''}
          ${report.pageUrl ? `<p style="margin:0 0 10px;"><strong>Page:</strong> ${escapeHtml(report.pageUrl)}</p>` : ''}
          ${report.occurredAt ? `<p style="margin:0 0 10px;"><strong>Date client:</strong> ${escapeHtml(report.occurredAt)}</p>` : ''}
          ${report.userAgent ? `<p style="margin:0 0 10px;"><strong>User-Agent:</strong> ${escapeHtml(report.userAgent)}</p>` : ''}
          <hr style="border:none; border-top:1px solid #eee; margin:14px 0;" />
          <p style="margin:0 0 8px;"><strong>Titre:</strong> ${escapeHtml(report.title)}</p>
          <p style="margin:0;"><strong>Description:</strong></p>
          <pre style="white-space:pre-wrap; font-family:inherit; margin:8px 0 0; background:#faf9f8; border:1px solid #eee; border-radius:8px; padding:12px;">${escapeHtml(
            report.description
          )}</pre>
        </div>
      </div>
    </div>
  `;

  const payload = {
    from,
    to: [to],
    subject,
    text,
    html
  };
  if (report.reporterEmail) payload.reply_to = report.reporterEmail;

  return payload;
};

const sendSupportReportEmail = async ({ report, reportId }) => {
  const payload = buildSupportReportEmail({ report, reportId });
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${RESEND_API_KEY}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Email support impossible (${response.status}): ${errorText}`);
  }
};

const sendPurchaseEmail = async ({ session, product, downloads }) => {
  if (!RESEND_API_KEY || !PURCHASE_EMAIL_FROM) return;
  const to = resolveRecipientEmail(session);
  if (!to) return;

  const productName = PRODUCT_LABELS[product.id] || product.id;
  const merciUrl = buildMerciUrl(session?.id);
  const amount = formatAmount(session?.amount_total, session?.currency);
  const links = Array.isArray(downloads) ? downloads.filter((item) => item?.label && item?.url) : [];
  const supportEmail = PURCHASE_EMAIL_REPLY_TO || 'support@xiaolearn.com';
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
    from: PURCHASE_EMAIL_FROM,
    to: [to],
    subject: `Commande confirmée XiaoLearn - ${productName}`,
    html,
    text
  };
  if (PURCHASE_EMAIL_REPLY_TO) payload.reply_to = PURCHASE_EMAIL_REPLY_TO;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${RESEND_API_KEY}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Email achat impossible (${response.status}): ${errorText}`);
  }
};

const resolveCheckoutSession = async ({ productId, uid, email, level }) => {
  const product = resolveProduct(productId, process.env);
  const { successUrl, cancelUrl } = getCheckoutUrls(product);
  if (!successUrl || !cancelUrl) {
    throw new Error('URLs de redirection manquantes');
  }

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

const upsertUserByEmail = async (email, updater) => {
  if (!db || !email) return null;
  const snap = await db.collection('users').where('email', '==', email).limit(1).get();
  if (snap.empty) return null;
  const doc = snap.docs[0];
  await updater(doc.ref);
  return doc.id;
};

const upsertUserByCustomerId = async (customerId, updater) => {
  if (!db || !customerId) return null;
  const snap = await db.collection('users').where('stripeCustomerId', '==', customerId).limit(1).get();
  if (snap.empty) return null;
  const doc = snap.docs[0];
  await updater(doc.ref);
  return doc.id;
};

const upsertPendingByEmail = async (email, payload) => {
  if (!db || !email) return null;
  const docId = email.toLowerCase();
  const ref = db.collection('pending_entitlements').doc(docId);
  await ref.set(
    {
      email,
      ...payload,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    },
    { merge: true }
  );
  return docId;
};

const updateSubscriptionEntitlement = async ({
  uid,
  email,
  entitlement,
  subscription,
  customerId,
  priceId
}) => {
  if (!db) return;
  const currentPeriodEnd = subscription?.current_period_end
    ? new Date(subscription.current_period_end * 1000).toISOString()
    : null;
  const status = subscription?.status ?? 'active';
  const active = ['active', 'trialing'].includes(status);

  const payload = {
    entitlements: {
      [entitlement]: {
        active,
        status,
        currentPeriodEnd,
        subscriptionId: subscription?.id ?? null,
        priceId: priceId ?? null,
        customerId: customerId ?? null,
        cancelAtPeriodEnd: subscription?.cancel_at_period_end ?? false,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      }
    },
    stripeCustomerId: customerId ?? null,
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  };

  if (uid) {
    await db.collection('users').doc(uid).set(payload, { merge: true });
    return;
  }

  const updated = email
    ? await upsertUserByEmail(email, (ref) => ref.set(payload, { merge: true }))
    : null;

  if (!updated && email) {
    await upsertPendingByEmail(email, {
      entitlements: payload.entitlements,
      stripeCustomerId: customerId ?? null
    });
  }
};

const updateLifetimeEntitlement = async ({ uid, email, entitlement, customerId, priceId }) => {
  if (!db) return;

  const payload = {
    entitlements: {
      [entitlement]: {
        active: true,
        status: 'paid',
        currentPeriodEnd: null,
        subscriptionId: null,
        priceId: priceId ?? null,
        customerId: customerId ?? null,
        cancelAtPeriodEnd: false,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      }
    },
    stripeCustomerId: customerId ?? null,
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  };

  if (uid) {
    await db.collection('users').doc(uid).set(payload, { merge: true });
    return;
  }

  const updated = email
    ? await upsertUserByEmail(email, (ref) => ref.set(payload, { merge: true }))
    : null;

  if (!updated && email) {
    await upsertPendingByEmail(email, {
      entitlements: payload.entitlements,
      stripeCustomerId: customerId ?? null
    });
  }
};

const storePurchase = async ({ uid, email, productId, sessionId, amountTotal, currency }) => {
  if (!db) return;
  const purchasePayload = {
    purchases: {
      [productId]: {
        status: 'paid',
        sessionId,
        amountTotal,
        currency,
        paidAt: admin.firestore.FieldValue.serverTimestamp()
      }
    },
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  };

  if (uid) {
    await db.collection('users').doc(uid).set(purchasePayload, { merge: true });
    return;
  }

  const updated = email
    ? await upsertUserByEmail(email, (ref) => ref.set(purchasePayload, { merge: true }))
    : null;

  if (!updated && email) {
    await upsertPendingByEmail(email, { purchases: purchasePayload.purchases });
  }
};

const handleCheckoutCompleted = async (session) => {
  const productId = session?.metadata?.productId;
  if (!productId) return;
  const product = resolveProduct(productId, process.env);
  const uid = session.client_reference_id || session?.metadata?.uid || null;
  const email = session.customer_details?.email || session.customer_email || null;
  const downloads = product.downloadKey
    ? resolveDownloadsForPurchase({
        downloadKey: product.downloadKey,
        level: session?.metadata?.level,
        baseUrl: DOWNLOADS_BASE_URL
      })
    : [];

  if (product.mode === 'subscription') {
    const subscriptionId = session.subscription;
    if (!subscriptionId) return;
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const priceId = subscription.items?.data?.[0]?.price?.id ?? null;
    await updateSubscriptionEntitlement({
      uid,
      email,
      entitlement: product.entitlement,
      subscription,
      customerId: session.customer,
      priceId
    });
    try {
      await sendPurchaseEmail({ session, product, downloads });
    } catch (error) {
      console.error(error);
    }
  } else {
    await storePurchase({
      uid,
      email,
      productId,
      sessionId: session.id,
      amountTotal: session.amount_total,
      currency: session.currency
    });
    if (product.grantEntitlement) {
      await updateLifetimeEntitlement({
        uid,
        email,
        entitlement: product.entitlement,
        customerId: session.customer,
        priceId: product.priceId
      });
    }

    try {
      await sendPurchaseEmail({ session, product, downloads });
    } catch (error) {
      console.error(error);
    }
  }
};

const handleSubscriptionUpdated = async (subscription) => {
  const entitlement = subscription.metadata?.entitlement || 'app';
  const uid = subscription.metadata?.uid || null;
  const customerId = subscription.customer;
  const priceId = subscription.items?.data?.[0]?.price?.id ?? null;

  if (uid) {
    await updateSubscriptionEntitlement({
      uid,
      email: null,
      entitlement,
      subscription,
      customerId,
      priceId
    });
    return;
  }

  const updatedUid = await upsertUserByCustomerId(customerId, (ref) =>
    ref.set(
      {
        entitlements: {
          [entitlement]: {
            active: ['active', 'trialing'].includes(subscription.status),
            status: subscription.status,
            currentPeriodEnd: subscription.current_period_end
              ? new Date(subscription.current_period_end * 1000).toISOString()
              : null,
            subscriptionId: subscription.id,
            priceId,
            customerId,
            cancelAtPeriodEnd: subscription.cancel_at_period_end ?? false,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
          }
        },
        stripeCustomerId: customerId,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      },
      { merge: true }
    )
  );

  if (!updatedUid && subscription.customer_email) {
    await updateSubscriptionEntitlement({
      uid: null,
      email: subscription.customer_email,
      entitlement,
      subscription,
      customerId,
      priceId
    });
  }
};

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

app.get('/checkout', async (req, res) => {
  try {
    const productId = req.query.productId;
    if (!productId || typeof productId !== 'string') {
      res.status(400).json({ error: 'productId requis' });
      return;
    }
    const uid = typeof req.query.uid === 'string' ? req.query.uid : undefined;
    const email = typeof req.query.email === 'string' ? req.query.email : undefined;
    const level = typeof req.query.level === 'string' ? req.query.level : undefined;
    const session = await resolveCheckoutSession({ productId, uid, email, level });
    res.redirect(303, session.url);
  } catch (error) {
    res.status(400).send(error.message || 'Erreur checkout');
  }
});

app.post('/api/checkout', jsonParser, async (req, res) => {
  try {
    const { productId, uid, email, level } = req.body || {};
    if (!productId) {
      res.status(400).json({ error: 'productId requis' });
      return;
    }
    const session = await resolveCheckoutSession({ productId, uid, email, level });
    res.json({ url: session.url });
  } catch (error) {
    res.status(400).json({ error: error.message || 'Erreur checkout' });
  }
});

app.post('/api/portal', jsonParser, async (req, res) => {
  try {
    if (!db) {
      res.status(500).json({ error: 'Firebase non configuré' });
      return;
    }
    const { uid, returnUrl } = req.body || {};
    if (!uid) {
      res.status(400).json({ error: 'uid requis' });
      return;
    }
    const userDoc = await db.collection('users').doc(uid).get();
    if (!userDoc.exists) {
      res.status(404).json({ error: 'Utilisateur introuvable' });
      return;
    }
    const data = userDoc.data() || {};
    const customerId = data.stripeCustomerId;
    if (!customerId) {
      res.status(400).json({ error: 'Aucun client Stripe lié' });
      return;
    }
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl || APP_BASE_URL || MARKETPLACE_BASE_URL
    });
    res.json({ url: session.url });
  } catch (error) {
    res.status(400).json({ error: error.message || 'Erreur portail' });
  }
});

app.post('/api/support-report', jsonParser, async (req, res) => {
  try {
    const report = normalizeSupportReport(req.body || {});
    const reportId = `support-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

    await sendSupportReportEmail({ report, reportId });

    if (db) {
      try {
        await db.collection('support_reports').doc(reportId).set(
          {
            ...report,
            reportId,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            source: 'xiaolearn_app'
          },
          { merge: true }
        );
      } catch (error) {
        console.error('support_report firestore_write_failed', error);
      }
    }

    res.json({ ok: true, reportId });
  } catch (error) {
    const message = error.message || 'Erreur support';
    const status = message.includes('requis') ? 400 : 500;
    res.status(status).json({ error: message });
  }
});

app.get('/api/downloads', async (req, res) => {
  try {
    const sessionId = req.query.session_id;
    if (!sessionId || typeof sessionId !== 'string') {
      res.status(400).json({ error: 'session_id requis' });
      return;
    }
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (!['paid', 'no_payment_required'].includes(session.payment_status)) {
      res.status(403).json({ error: 'Paiement non confirmé' });
      return;
    }
    const productId = session.metadata?.productId;
    if (!productId) {
      res.json({ downloads: [] });
      return;
    }
    const product = resolveProduct(productId, process.env);
    if (!product.downloadKey) {
      res.json({ downloads: [] });
      return;
    }
    const downloads = resolveDownloadsForPurchase({
      downloadKey: product.downloadKey,
      level: session.metadata?.level,
      baseUrl: DOWNLOADS_BASE_URL
    });
    res.json({ downloads });
  } catch (error) {
    res.status(400).json({ error: error.message || 'Erreur téléchargement' });
  }
});

app.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  if (!STRIPE_WEBHOOK_SECRET) {
    res.status(400).send('Stripe webhook secret manquant');
    return;
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, req.headers['stripe-signature'], STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    res.status(400).send(`Webhook Error: ${error.message}`);
    return;
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object);
        break;
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        await handleSubscriptionUpdated(event.data.object);
        break;
      default:
        break;
    }
    res.json({ received: true });
  } catch (error) {
    res.status(500).send(`Webhook handler error: ${error.message}`);
  }
});

const port = process.env.PORT || 8787;
app.listen(port, () => {
  console.log(`Payments server listening on ${port}`);
});
