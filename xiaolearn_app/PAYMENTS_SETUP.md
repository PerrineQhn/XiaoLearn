# Paiements — Setup Stripe + Firebase Functions

XiaoLearn vend deux offres :

| Plan          | Prix       | Type           | Trial       | Features exclusives |
| ------------- | ---------- | -------------- | ----------- | ------------------- |
| **Mensuel**   | 14 €/mois  | Subscription   | 7 jours     | —                   |
| **Lifetime**  | 99 € one-time | Payment one-time | —        | Simulateur de situations, créer ses propres flashcards, accès prioritaire aux nouvelles features |

L'infrastructure de paiement vit dans `functions/` (Firebase Cloud Functions
en région `europe-west1`). Le frontend ne touche **jamais** Stripe directement :
il fait des `fetch` HTTP vers nos 3 endpoints qui font le pont avec Stripe.

---

## Architecture

```
┌─────────────────────┐      ┌──────────────────────┐      ┌──────────────┐
│   App XiaoLearn     │      │   Cloud Functions    │      │    Stripe    │
│   (Cloudflare Pages)│      │   (europe-west1)     │      │              │
│                     │      │                      │      │              │
│  SubscriptionPage   │──────▶  createCheckout      │──────▶ Checkout API │
│  → "Acheter"        │ POST │                      │      │              │
│                     │◀─────  { url: "...stripe" } │      │              │
│                     │      │                      │      │              │
│  Redirect to Stripe │──────────────────────────────────▶ User pays      │
│                     │                             │      │              │
│                     │                             │◀─────  Webhook event│
│                     │      ┌──────────────────────│              │
│                     │      │  stripeWebhook       │              │
│                     │      │  (signed)            │              │
│                     │      │  → write Firestore   │              │
│                     │      └──────────┬───────────┘              │
│                     │                 │                          │
│  useEntitlements    │◀──── onSnapshot ┘                          │
│  → premium = true   │                                            │
└─────────────────────┘                                            │
                                                                   │
                       ┌───────────────────────────────────────────┘
                       │
                       ▼
                  Customer Portal (gestion abonnement)
                  via createPortal()
```

---

## Setup initial (une seule fois)

### Phase A — Côté Stripe (~30 min)

#### 1. Créer ou activer ton compte Stripe

[stripe.com](https://stripe.com) → si pas déjà fait, créer un compte et
compléter le profil business (SIRET, IBAN pour les payouts, vérification
d'identité — peut prendre 1-2 jours côté Stripe).

Travaille en mode **Test** d'abord (bouton en haut à droite du dashboard,
toggle "View test data"). Tu pourras basculer en Live quand tout sera vérifié.

#### 2. Créer les deux Products

Stripe Dashboard → **Products** → **Add product** :

**Product 1 — XiaoLearn Premium Mensuel**
- Name : `XiaoLearn Premium Mensuel`
- Description : `Accès complet à XiaoLearn — annulation à tout moment`
- Pricing : **Recurring**
  - Price : `14.00` EUR
  - Billing period : `Monthly`
  - ⚠ Le trial de 7 jours est géré **côté code** (pas dans la config du Price),
    parce que ça nous permet de l'appliquer uniquement aux nouveaux abonnés et
    pas aux réactivations.
- **Save product**
- Note le `price_XXX` du Price créé → ce sera ton `STRIPE_PRICE_MONTHLY`

**Product 2 — XiaoLearn Premium Lifetime**
- Name : `XiaoLearn Premium Lifetime`
- Description : `Accès à vie à XiaoLearn — paiement unique`
- Pricing : **One-off** (pas Recurring)
  - Price : `99.00` EUR
- **Save product**
- Note le `price_XXX` du Price créé → ce sera ton `STRIPE_PRICE_LIFETIME`

#### 3. Récupérer la clé secrète

Dashboard → **Developers → API keys** → copie la **Secret key** (commence par
`sk_test_...` en mode Test, `sk_live_...` en Live). → ce sera ton `STRIPE_SECRET_KEY`.

### Phase B — Côté Firebase Functions (~30 min)

#### 1. Installer Firebase CLI si pas déjà fait

```bash
npm install --save-dev firebase-tools  # ou en global selon ton OS
npx firebase login  # une seule fois, ouvre le navigateur pour l'OAuth
```

#### 2. Installer les dépendances functions

```bash
cd functions
npm install
cd ..
```

#### 3. Configurer les secrets Firebase

Les credentials Stripe ne sont **jamais** committées. Elles sont stockées
dans Google Secret Manager (chiffré, accessible uniquement aux functions
qui les déclarent explicitement).

```bash
npx firebase functions:secrets:set STRIPE_SECRET_KEY
# → colle ta clé sk_test_... (ou sk_live_...) quand demandé

npx firebase functions:secrets:set STRIPE_PRICE_MONTHLY
# → colle price_XXX du Product Mensuel

npx firebase functions:secrets:set STRIPE_PRICE_LIFETIME
# → colle price_XXX du Product Lifetime

# Le webhook secret sera configuré plus tard (étape 5), une fois les
# functions déployées et leur URL connue de Stripe.
```

#### 4. Déployer les Cloud Functions

```bash
npx firebase deploy --only functions
```

Au premier déploiement, Firebase active automatiquement les APIs Google Cloud
nécessaires (Cloud Functions, Cloud Run, Cloud Build, Artifact Registry).
Si on te demande, dis oui à tout.

À la fin, le terminal t'affichera 3 URLs comme :
```
✔ functions[createCheckout(europe-west1)]   https://createcheckout-xxx.a.run.app
✔ functions[createPortal(europe-west1)]     https://createportal-xxx.a.run.app
✔ functions[stripeWebhook(europe-west1)]    https://stripewebhook-xxx.a.run.app
```

Note l'URL `stripeWebhook` — elle te sert tout de suite pour la phase 5.

#### 5. Configurer le webhook Stripe

Stripe Dashboard → **Developers → Webhooks** → **Add endpoint** :
- Endpoint URL : l'URL `stripeWebhook` notée à l'étape précédente
- Events to listen : sélectionne au minimum :
  - `checkout.session.completed`
  - `customer.subscription.created`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
  - `invoice.payment_failed`
- **Add endpoint**

Stripe te montre alors un **Signing secret** (commence par `whsec_`). Copie-le
et stocke-le dans Firebase :

```bash
npx firebase functions:secrets:set STRIPE_WEBHOOK_SECRET
# → colle whsec_XXX

# Redéploie pour que les functions chargent le nouveau secret :
npx firebase deploy --only functions:stripeWebhook
```

### Phase C — Côté Cloudflare Pages (~5 min)

#### 1. Mettre à jour la variable VITE_PAYMENTS_BASE_URL

Cloudflare Dashboard → ton projet `xiaolearnapp` → **Settings → Environment
variables** → Production :

| Variable                 | Value                                                    |
| ------------------------ | -------------------------------------------------------- |
| `VITE_PAYMENTS_BASE_URL` | (l'URL de base des Functions — voir explication ci-dessous) |

**Deux options pour cette URL :**

**Option 1 (rapide) — URLs Cloud Run directes**

Tes Functions exposent des URLs comme `https://createcheckout-xxx.a.run.app`.
Le frontend appelle `${VITE_PAYMENTS_BASE_URL}/api/checkout` mais nos URLs
ne suivent pas ce pattern → il faut adapter le frontend, ou mieux : utiliser
l'Option 2.

**Option 2 (recommandé) — Firebase Hosting rewrites pour avoir `pay.xiaolearn.com`**

Plus propre : les Functions sont exposées via un domaine custom qui matche
ce que ton code frontend attend déjà. Crée un nouveau site Firebase Hosting
pour les paiements :

```bash
# Dans Firebase Console : Hosting → Add another site → site ID "xiaolearn-pay"
# Custom domain : pay.xiaolearn.com (TTL DNS + SSL ~10 min)
```

Puis crée à la racine du repo un fichier `firebase-hosting-pay.json` (ou
configure manuellement le site dans `firebase.json` avec un tableau `hosting`)
qui rewrite les URLs vers les Functions. Voir docs Firebase Hosting rewrites
pour Cloud Functions.

**Variante minimaliste** : laisse le frontend appeler les URLs Cloud Run
directes en adaptant `src/services/payments.ts`. Plus rapide pour tester,
moins propre pour la prod.

#### 2. Re-deploy Cloudflare Pages

Push un commit vide ou clique "Retry deployment" pour que les nouvelles
env vars soient prises en compte.

---

## Test E2E (~10 min)

### En mode Test Stripe

1. App en prod → page Abonnement → clique "Lifetime"
2. Tu es redirigé vers Stripe Checkout
3. Carte test Stripe : `4242 4242 4242 4242`, expiry n'importe quelle date
   future (ex `12/30`), CVC `123`, code postal n'importe lequel
4. Stripe redirige vers `app.xiaolearn.com/subscription?status=success&session_id=...`
5. Dans les ~5 secondes, ton entitlement est mis à jour dans Firestore par
   le webhook → l'app passe en "Premium actif" (Lifetime)

### Vérifications

**Cloud Functions logs** (en cas de souci) :
```bash
npx firebase functions:log --only stripeWebhook
```
Tu dois voir `Stripe webhook received { type: 'checkout.session.completed' }`
puis `Lifetime activated`.

**Firestore** : Console Firebase → Firestore → `users/<ton-uid>` →
champ `entitlements.app` doit ressembler à :
```json
{
  "active": true,
  "status": "lifetime",
  "isLifetime": true,
  "customerId": "cus_XXX",
  "priceId": null,
  "subscriptionId": null,
  ...
}
```

**Côté app** : SubscriptionPage doit afficher "Accès à vie actif" et le
Simulateur (page protégée par `canUseSimulator`) doit être accessible.

### Cartes test Stripe utiles pour reproduire des cas

| Numéro de carte           | Comportement                            |
| ------------------------- | --------------------------------------- |
| `4242 4242 4242 4242`     | Succès                                  |
| `4000 0000 0000 0002`     | Carte refusée                           |
| `4000 0000 0000 9995`     | Fonds insuffisants                      |
| `4000 0025 0000 3155`     | Authentification 3D Secure requise      |

[Liste complète](https://stripe.com/docs/testing#cards)

---

## Passage en Live

Quand tu es satisfaite des tests :

1. Stripe Dashboard → toggle **Live mode** (en haut à droite)
2. Re-créer les 2 Products avec les **mêmes prix** (les Products Test ne
   migrent pas automatiquement)
3. Récupérer les nouveaux `price_XXX` (différents en Live) et la nouvelle
   `sk_live_...`
4. Mettre à jour les secrets Firebase :
   ```bash
   firebase functions:secrets:set STRIPE_SECRET_KEY    # nouvelle sk_live_
   firebase functions:secrets:set STRIPE_PRICE_MONTHLY # nouveau price_
   firebase functions:secrets:set STRIPE_PRICE_LIFETIME
   ```
5. Recréer le webhook en Live (l'URL `stripeWebhook` reste la même mais le
   `whsec_` change → re-set le secret)
6. Redéployer : `firebase deploy --only functions`

---

## Dépannage

### "Impossible de démarrer le paiement" (alert frontend)

Le frontend a fait un POST à `createCheckout` qui a échoué. Inspecter :
- DevTools → Network → POST vers `createCheckout` → onglet Response. Tu verras
  le message d'erreur exact renvoyé par la function.
- `firebase functions:log --only createCheckout` pour le log côté serveur.

### Le user paie mais l'app ne passe pas en Premium

Le webhook n'a pas réussi à updater Firestore. Inspecter :
- Stripe Dashboard → Webhooks → ton endpoint → "Events" → trouve l'event
  `checkout.session.completed` → regarde la **réponse HTTP** reçue (200 = OK,
  4xx ou 5xx = problème).
- Si 400 "signature verification failed" : le `STRIPE_WEBHOOK_SECRET` ne
  matche pas. Re-récupère-le depuis Stripe Dashboard et `firebase functions:secrets:set`.
- Si 500 : `firebase functions:log --only stripeWebhook` pour voir l'erreur
  Firestore (souvent un problème de règles : vérifier que les Cloud Functions
  ont bien le rôle `Cloud Datastore User` IAM).

### "Customer not found" sur createPortal

L'utilisateur essaie d'ouvrir le portail de gestion mais n'a jamais fait
d'achat → pas de `customerId` dans son doc Firestore. Comportement attendu —
côté UI le bouton "Gérer mon abonnement" ne devrait être affiché qu'aux
utilisateurs avec un abonnement actif (`hasSubscription && subscriptionActive`).

---

## Coûts

**Stripe** : 1,4 % + 0,25 € par transaction EU (cartes EU). 2,9 % + 0,25 €
pour les cartes hors EU. Pas d'abonnement mensuel.

**Firebase Cloud Functions** (plan Blaze, déjà activé pour XiaoLearn) :
- 2 millions d'invocations gratuites/mois
- 400 000 GB-seconds gratuits/mois
- Au-delà : ~0,40 $ / million d'invocations

Réaliste : pour 1 000 paiements/mois, le coût Functions reste **0 €** (tu
es très loin du free tier).

**Firestore** : déjà inclus dans ton usage existant, impact négligeable
(~3 reads/writes par paiement).

---

## Ce que XiaoLearn n'a PAS (encore)

Pour info, fonctionnalités courantes que tu pourrais vouloir plus tard mais
qui ne sont pas dans cette première version :
- Codes promo / réductions
- TVA explicite (Stripe calcule auto, mais pas affichée côté UI)
- Paiement SEPA (uniquement carte pour l'instant)
- Apple Pay / Google Pay (faciles à activer côté Stripe, pas activé ici)
- Facture PDF téléchargeable depuis l'app (le Customer Portal gère ça via Stripe)
- Notifications email custom (Stripe envoie déjà reçu + factures auto)

Ajouts faciles si besoin — chacun demande quelques heures de code en plus.
