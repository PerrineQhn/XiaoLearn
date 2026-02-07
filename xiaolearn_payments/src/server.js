import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';
import admin from 'firebase-admin';
import { DOWNLOADS, buildDownloadUrl } from './downloads.js';
import { resolveProduct } from './products.js';

const {
  STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET,
  FIREBASE_PROJECT_ID,
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_PRIVATE_KEY,
  APP_BASE_URL,
  MARKETPLACE_BASE_URL,
  DOWNLOADS_BASE_URL
} = process.env;

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

const resolveCheckoutSession = async ({ productId, uid, email, level }) => {
  const product = resolveProduct(productId, process.env);
  const { successUrl, cancelUrl } = getCheckoutUrls(product);
  if (!successUrl || !cancelUrl) {
    throw new Error('URLs de redirection manquantes');
  }

  const metadata = buildMetadata(product, uid, email, level);

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

app.get('/api/downloads', async (req, res) => {
  try {
    const sessionId = req.query.session_id;
    if (!sessionId || typeof sessionId !== 'string') {
      res.status(400).json({ error: 'session_id requis' });
      return;
    }
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== 'paid') {
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
    const download = DOWNLOADS[product.downloadKey];
    const url = buildDownloadUrl(DOWNLOADS_BASE_URL, download?.file);
    if (!download || !url) {
      res.json({ downloads: [] });
      return;
    }
    res.json({ downloads: [{ label: download.label, url }] });
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
