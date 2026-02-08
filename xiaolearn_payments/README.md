# XiaoLearn Payments

Service Stripe + Firestore compatible Cloudflare Workers.

## Mode Free (Cloudflare)

1. Installer les dépendances:

```bash
npm install
```

2. Se connecter à Cloudflare:

```bash
npx wrangler login
npx wrangler whoami
```

3. Configurer les variables/secrets:

```bash
npx wrangler secret put STRIPE_SECRET_KEY
npx wrangler secret put STRIPE_WEBHOOK_SECRET
npx wrangler secret put FIREBASE_PRIVATE_KEY
npx wrangler secret put FIREBASE_PROJECT_ID
npx wrangler secret put FIREBASE_CLIENT_EMAIL
npx wrangler secret put STRIPE_PRICE_APP_YEARLY
npx wrangler secret put STRIPE_PRICE_APP_LIFETIME
npx wrangler secret put STRIPE_PRICE_MANUELS_V1_V2
npx wrangler secret put STRIPE_PRICE_VOCABULARY_ALL_HSK
npx wrangler secret put STRIPE_PRICE_VOCABULARY_ONE_HSK
npx wrangler secret put STRIPE_PRICE_WRITING_ALL_HSK
npx wrangler secret put STRIPE_PRICE_WRITING_ONE_HSK
npx wrangler secret put STRIPE_PRICE_VOCABULARY_WRITING_ALL_HSK
npx wrangler secret put STRIPE_PRICE_VOCABULARY_WRITING_ONE_HSK
npx wrangler secret put STRIPE_PRICE_ANKI
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put PURCHASE_EMAIL_FROM
npx wrangler secret put PURCHASE_EMAIL_REPLY_TO
```

4. Vérifier les variables non sensibles dans `wrangler.toml` (`APP_BASE_URL`, `MARKETPLACE_BASE_URL`, `DOWNLOADS_BASE_URL`).

5. Déployer:

```bash
npm run deploy
```

6. Stripe webhook:
- endpoint: `https://payments.xiaolearn.com/api/webhook`
- events minimum: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`.

## Développement local Worker

```bash
npm run dev
```

## Développement Node (legacy)

```bash
cp .env.example .env
npm run dev:node
```

## Endpoints

- `GET /checkout?productId=app-yearly&uid=...&email=...` -> redirection Stripe Checkout.
- `POST /api/checkout` -> retourne `{ url }`.
- `POST /api/webhook` -> webhook Stripe (signature vérifiée).
- `GET /api/downloads?session_id=...` -> retourne les téléchargements autorisés.
- `POST /api/portal` -> ouvre le portail client Stripe.

## Liens de téléchargement (PDF/Anki)

- Le mapping produit -> fichiers est centralisé dans `src/downloads.js`.
- `GET /api/downloads` lit `session.metadata.productId` (et `session.metadata.level` si présent) puis renvoie `downloads: [{ label, url }]`.
- Les produits `vocabulary-one-hsk`, `writing-one-hsk` et `vocabulary-writing-one-hsk` exigent `level` au checkout.
- Pour un produit bundle, l'API peut renvoyer plusieurs liens dans `downloads`.

## Email post-achat

- Le webhook `checkout.session.completed` peut envoyer un email de confirmation avec les liens d'acces.
- L'envoi est actif si `RESEND_API_KEY` et `PURCHASE_EMAIL_FROM` sont configures.
- `PURCHASE_EMAIL_REPLY_TO` est optionnel.
