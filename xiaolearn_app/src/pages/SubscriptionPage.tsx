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

  // Plan Mensuel — la base premium accessible à tous les abonnés
  const monthlyFeatures =
    language === 'fr'
      ? [
          { label: 'Tous les cours A1 → C2' },
          { label: 'Flashcards SRS illimitées', badge: 'Populaire' },
          { label: 'Prof. Xiao IA 24/7' },
          { label: 'C-Player illimité' },
          { label: 'Communauté' }
        ]
      : [
          { label: 'All A1 → C2 courses' },
          { label: 'Unlimited SRS flashcards', badge: 'Popular' },
          { label: 'Prof. Xiao AI 24/7' },
          { label: 'Unlimited C-Player' },
          { label: 'Community access' }
        ];

  // Plan Lifetime — la base + des features exclusives qui justifient
  // l'achat one-time. À la Seonsaengnim : différenciation produit, pas
  // juste de prix, pour ne pas faire passer le mensuel pour un "moins bon".
  const lifetimeFeatures =
    language === 'fr'
      ? [
          { label: 'Tout du plan Mensuel' },
          { label: 'Toutes les futures features incluses' },
          { label: 'Accès prioritaire au nouveau contenu' },
          { label: 'Simulateur de situations', badge: 'Exclusif Lifetime' },
          { label: 'Créer ses propres flashcards', badge: 'Exclusif Lifetime' }
        ]
      : [
          { label: 'Everything in Monthly' },
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
              {language === 'fr' ? 'Paiement unique' : 'One-time payment'}
            </p>

            <div className="settings-subscription-highlight-pill">
              ✓ {language === 'fr' ? 'Aucun abonnement mensuel' : 'No monthly subscription'}
            </div>

            <ul className="settings-subscription-feature-list">
              {lifetimeFeatures.map((feature) => (
                <li key={feature.label} className="settings-subscription-feature-item">
                  <span className="settings-subscription-check">✓</span>
                  <span>{feature.label}</span>
                  {feature.badge && <span className="settings-subscription-feature-badge">{feature.badge}</span>}
                </li>
              ))}
            </ul>

            <div className="settings-subscription-bonus-list">
              <p className="settings-subscription-bonus-item">
                🎁 {language === 'fr' ? 'Dictionnaire interactif inclus' : 'Interactive dictionary included'}
              </p>
              <p className="settings-subscription-bonus-item">
                📘 {language === 'fr' ? 'Bonus: pack de révision premium' : 'Bonus: premium review pack'}
              </p>
            </div>

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

        <div className="settings-subscription-proof">
          <span>{language === 'fr' ? '900+ apprenants' : '900+ learners'}</span>
          <span>★★★★★ 5/5</span>
        </div>
      </section>
    </div>
  );
}
