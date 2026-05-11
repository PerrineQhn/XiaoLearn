import type { Language } from '../i18n';
import type { EntitlementStatus } from '../hooks/useEntitlements';
import type { AccessTier } from '../utils/access';

interface SubscriptionPageProps {
  language: Language;
  subscription: EntitlementStatus | null;
  accessTier: AccessTier;
  trialDaysLeft: number;
  trialEndsAt: string | null;
  onSubscribe: (planId: string) => void;
  onManageSubscription: () => void;
}

export default function SubscriptionPage({
  language,
  subscription,
  accessTier,
  trialDaysLeft,
  trialEndsAt,
  onSubscribe,
  onManageSubscription
}: SubscriptionPageProps) {
  const subscriptionActive = accessTier === 'premium';
  const hasSubscription = Boolean(subscription?.subscriptionId);
  const hasLifetimeAccess = subscriptionActive && !hasSubscription;
  const renewalDate = subscription?.currentPeriodEnd ? new Date(subscription.currentPeriodEnd) : null;
  const renewalLabel = renewalDate
    ? renewalDate.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : null;
  const trialEndDate = trialEndsAt ? new Date(trialEndsAt) : null;
  const trialEndLabel = trialEndDate
    ? trialEndDate.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : null;

  const subscriptionStatusLabel =
    accessTier === 'premium'
      ? language === 'fr'
        ? 'Premium actif'
        : 'Premium active'
      : accessTier === 'trial'
      ? language === 'fr'
        ? `Essai (${trialDaysLeft} jour${trialDaysLeft > 1 ? 's' : ''} restant${trialDaysLeft > 1 ? 's' : ''})`
        : `Trial (${trialDaysLeft} day${trialDaysLeft > 1 ? 's' : ''} left)`
      : language === 'fr'
      ? 'Gratuit'
      : 'Free';

  // Plan Mensuel — la base premium accessible à tous les abonnés.
  // Features alignées sur les flags réellement câblés dans utils/access.ts
  // (canAccessAllLessons, srsMode='complete', canUseAI, syncEnabled,
  // canUseFloatingChat). Évite de mentionner C-Player puisque la feature
  // est désactivée à date.
  const monthlyFeatures =
    language === 'fr'
      ? [
          { label: 'Tous les cours A1 → C2' },
          { label: 'Flashcards SRS illimitées', badge: 'Populaire' },
          { label: 'Prof. Xiao IA 24/7' },
          { label: 'Dictionnaire HSK complet' },
          { label: 'Sync entre appareils' }
        ]
      : [
          { label: 'All A1 → C2 courses' },
          { label: 'Unlimited SRS flashcards', badge: 'Popular' },
          { label: 'Prof. Xiao AI 24/7' },
          { label: 'Full HSK dictionary' },
          { label: 'Cross-device sync' }
        ];

  // Plan Lifetime — UNIQUEMENT les bonus en plus du Mensuel. Le titre de
  // la liste ("Tout du Mensuel, plus :") est rendu séparément pour bien
  // visuellement séparer "ce que tu as déjà avec mensuel" de "ce que
  // lifetime ajoute en exclusif". À la Seonsaengnim.
  const lifetimeBonusFeatures =
    language === 'fr'
      ? [
          { label: 'Toutes les futures features incluses' },
          { label: 'Accès prioritaire au nouveau contenu' },
          { label: 'Simulateur de situations', badge: 'Exclusif Lifetime' },
          { label: 'Créer ses propres flashcards', badge: 'Exclusif Lifetime' }
        ]
      : [
          { label: 'All future features included' },
          { label: 'Priority access to new content' },
          { label: 'Situation Simulator', badge: 'Lifetime exclusive' },
          { label: 'Create your own flashcards', badge: 'Lifetime exclusive' }
        ];

  const lifetimeButtonLabel = hasLifetimeAccess
    ? language === 'fr'
      ? 'Déjà inclus'
      : 'Already included'
    : subscriptionActive && hasSubscription
    ? language === 'fr'
      ? 'Passer à vie'
      : 'Upgrade to lifetime'
    : language === 'fr'
    ? 'Choisir cette offre'
    : 'Choose this plan';

  const monthlyButtonLabel =
    hasSubscription && subscriptionActive
      ? language === 'fr'
        ? 'Déjà inclus'
        : 'Already included'
      : hasLifetimeAccess
      ? language === 'fr'
        ? 'Inclus avec accès à vie'
        : 'Included with lifetime'
      : language === 'fr'
      ? 'Démarrer (7 jours gratuits)'
      : 'Start (7 days free)';

  const lifetimeDisabled = hasLifetimeAccess;
  const monthlyDisabled = (hasSubscription && subscriptionActive) || hasLifetimeAccess;

  return (
    <div className="settings-page subscription-page">
      <header className="settings-header">
        <h1 className="page-title">{language === 'fr' ? 'Abonnement' : 'Subscription'}</h1>
        <p className="page-subtitle">
          {language === 'fr' ? 'Choisissez la formule qui vous convient' : 'Choose the plan that fits you'}
        </p>
      </header>

      <section className="settings-section modern settings-subscription-section">
        <div className="settings-subscription-header">
          <p className="settings-subscription-kicker">
            {language === 'fr' ? 'Abonnement' : 'Subscription'}
          </p>
          <h2 className="settings-subscription-title">
            <span>{language === 'fr' ? 'Choisissez' : 'Choose'}</span>{' '}
            {language === 'fr' ? 'votre formule' : 'your plan'}
          </h2>
          <p className="settings-subscription-subtitle">
            {language === 'fr' ? 'Tarifs simples et transparents' : 'Simple and transparent pricing'}
          </p>
        </div>

        <div className="settings-subscription-status-bar">
          <div>
            <p className={`settings-subscription-status ${subscriptionActive ? 'is-active' : 'is-inactive'}`}>
              {subscriptionStatusLabel}
            </p>
            {renewalLabel && (
              <p className="subscription-renewal">
                {language === 'fr' ? `Renouvellement le ${renewalLabel}` : `Renews on ${renewalLabel}`}
              </p>
            )}
            {!subscriptionActive && accessTier === 'trial' && trialEndLabel && (
              <p className="subscription-renewal">
                {language === 'fr' ? `Fin de l'essai le ${trialEndLabel}` : `Trial ends on ${trialEndLabel}`}
              </p>
            )}
          </div>
          <div className="settings-subscription-status-actions">
            {hasSubscription && subscriptionActive && (
              <button type="button" className="btn-secondary" onClick={onManageSubscription}>
                {language === 'fr' ? 'Gérer mon abonnement' : 'Manage subscription'}
              </button>
            )}
            {hasLifetimeAccess && (
              <span className="subscription-lifetime">
                {language === 'fr' ? 'Accès à vie actif' : 'Lifetime access active'}
              </span>
            )}
          </div>
        </div>

        <div className="settings-subscription-grid">
          <article className="settings-subscription-card is-featured">
            <span className="settings-subscription-top-badge">
              {language === 'fr' ? 'Meilleure offre' : 'Best value'}
            </span>

            <div className="settings-subscription-card-head">
              <h3>{language === 'fr' ? 'Accès Premium à vie' : 'Lifetime Premium Access'}</h3>
              <p>{language === 'fr' ? 'Accès illimité pour toujours' : 'Unlimited access forever'}</p>
            </div>

            <div className="settings-subscription-price-row">
              <span className="settings-subscription-price">{language === 'fr' ? '99€' : '€99'}</span>
            </div>
            <p className="settings-subscription-price-note">
              {language === 'fr' ? 'Paiement unique, accès à vie' : 'One-time payment, lifetime access'}
            </p>

            {/* Comparaison de valeur — 99€ = ~7 mois de mensuel, mais à vie.
                Aide à justifier le prix one-time face à l'option mensuelle. */}
            <p className="settings-subscription-value-compare">
              {language === 'fr'
                ? 'Équivalent à ~7 mois d\'abonnement, mais à vie'
                : 'Equivalent to ~7 months of subscription, but forever'}
            </p>

            <div className="settings-subscription-highlight-pill">
              ✓ {language === 'fr' ? 'Aucun abonnement mensuel' : 'No monthly subscription'}
            </div>

            {/* Intro de la liste features : indique clairement que le lifetime
                hérite de TOUT le mensuel, puis liste les bonus exclusifs. */}
            <p className="settings-subscription-features-intro">
              <strong>
                {language === 'fr' ? 'Tout du plan Mensuel, plus :' : 'Everything in Monthly, plus:'}
              </strong>
            </p>

            <ul className="settings-subscription-feature-list">
              {lifetimeBonusFeatures.map((feature) => (
                <li
                  key={feature.label}
                  className={`settings-subscription-feature-item${
                    feature.badge ? ' is-exclusive' : ''
                  }`}
                >
                  <span className="settings-subscription-check">✓</span>
                  <span>{feature.label}</span>
                  {feature.badge && <span className="settings-subscription-feature-badge">{feature.badge}</span>}
                </li>
              ))}
            </ul>

            <button
              type="button"
              className="btn-primary settings-subscription-cta"
              onClick={() => onSubscribe('app-lifetime')}
              disabled={lifetimeDisabled}
            >
              {lifetimeButtonLabel}
            </button>
          </article>

          <article className="settings-subscription-card">
            <div className="settings-subscription-card-head">
              <h3>{language === 'fr' ? 'Abonnement mensuel' : 'Monthly subscription'}</h3>
              <p>
                {language === 'fr'
                  ? "7 jours d'essai gratuit, sans engagement"
                  : '7-day free trial, no commitment'}
              </p>
            </div>

            <div className="settings-subscription-price-row">
              <span className="settings-subscription-price">{language === 'fr' ? '14€' : '€14'}</span>
              <span className="settings-subscription-price-period">
                {language === 'fr' ? '/mois' : '/month'}
              </span>
            </div>
            <p className="settings-subscription-price-note">
              {language === 'fr' ? 'Annulation à tout moment' : 'Cancel anytime'}
            </p>

            <ul className="settings-subscription-feature-list">
              {monthlyFeatures.map((feature) => (
                <li key={feature.label} className="settings-subscription-feature-item">
                  <span className="settings-subscription-check">✓</span>
                  <span>{feature.label}</span>
                  {feature.badge && <span className="settings-subscription-feature-badge">{feature.badge}</span>}
                </li>
              ))}
            </ul>

            <button
              type="button"
              className="btn-secondary settings-subscription-cta"
              onClick={() => onSubscribe('app-monthly')}
              disabled={monthlyDisabled}
            >
              {monthlyButtonLabel}
            </button>
          </article>
        </div>

        <p className="settings-subscription-disclaimer">
          {language === 'fr'
            ? 'Paiement sécurisé via Stripe. Annulation possible à tout moment depuis l\'app pour la formule mensuelle.'
            : 'Secure billing via Stripe. Cancel anytime from the app for the monthly plan.'}
        </p>

        {/* Social proof retirée tant qu'on n'a pas une vraie base d'utilisateurs.
            À ré-ajouter quand on aura passé un cap réel (par ex. 100 users
            actifs avec >5 reviews), avec un chiffre honnête. */}
      </section>
    </div>
  );
}
