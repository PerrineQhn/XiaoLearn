# XiaoLearn Payments

Service Node/Express pour créer des sessions Stripe Checkout, gérer les webhooks et mettre à jour Firestore.

## Démarrage rapide

```bash
cp .env.example .env
npm install
npm run dev
```

## Endpoints

- `GET /checkout?productId=app-yearly&uid=...&email=...` → redirige vers Stripe Checkout.
- `POST /api/checkout` → retourne `{ url }` pour rediriger côté client.
- `POST /api/webhook` → webhook Stripe (raw body).
- `GET /api/downloads?session_id=...` → renvoie les liens de téléchargement payés.
- `POST /api/portal` → crée un lien vers le portail client Stripe.

## Produits

Les identifiants produits sont définis dans `src/products.js`.
Renseignez les `STRIPE_PRICE_*` correspondants dans `.env`.

## Notes

- `MARKETPLACE_BASE_URL` et `APP_BASE_URL` servent aux redirections après paiement.
- `DOWNLOADS_BASE_URL` doit pointer vers l'endroit où vous hébergez les fichiers PDF/Anki.
