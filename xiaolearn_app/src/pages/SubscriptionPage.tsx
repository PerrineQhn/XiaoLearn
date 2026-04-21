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

  const lifetimeFeatures =
    language === 'fr'
      ? [
          { label: 'Accès à tous les cours' },
          { label: 'C-Player illimité', badge: 'Populaire' },
          { label: 'Questions illimitées à l’assistant' },
          { label: 'Vocabulaire complet' }
        ]
      : [
          { label: 'Access to all courses' },
          { label: 'Unlimited C-Player', badge: 'Popular' },
          { label: 'Unlimited assistant questions' },
          { label: 'Full vocabulary access' }
        ];

  const yearlyFeatures =
    language === 'fr'
      ? [
          { label: 'Accès à tous les cours' },
          { label: 'C-Player illimité', badge: 'Populaire' },
          { label: 'Questions illimitées à l’assistant' },
          { label: 'Vocabulaire complet' }
        ]
      : [
          { label: 'Access to all courses' },
          { label: 'Unlimited C-Player', badge: 'Popular' },
          { label: 'Unlimited assistant questions' },
          { label: 'Full vocabulary access' }
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

  const yearlyButtonLabel =
    hasSubscription && subscriptionActive
      ? language === 'fr'
        ? 'Déjà inclus'
        : 'Already included'
      : hasLifetimeAccess
      ? language === 'fr'
        ? 'Inclus avec accès à vie'
        : 'Included with lifetime'
      : language === 'fr'
      ? 'Choisir cette offre'
      : 'Choose this plan';

  const lifetimeDisabled = hasLifetimeAccess;
  const yearlyDisabled = (hasSubscription && subscriptionActive) || hasLifetimeAccess;

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
              <span className="settings-subscription-price">{language === 'fr' ? '259€' : '€259'}</span>
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
              <h3>{language === 'fr' ? 'Licence 1 an' : '1-Year License'}</h3>
              <p>{language === 'fr' ? 'Accès complet pendant 1 an' : 'Full access for 1 year'}</p>
            </div>

            <div className="settings-subscription-price-row">
              <span className="settings-subscription-price">{language === 'fr' ? '9€' : '€9'}</span>
              <span className="settings-subscription-price-period">
                {language === 'fr' ? '/mois' : '/month'}
              </span>
            </div>
            <p className="settings-subscription-price-note">
              {language === 'fr' ? 'Facturé 108€/an' : 'Billed €108/year'}
            </p>

            <ul className="settings-subscription-feature-list">
              {yearlyFeatures.map((feature) => (
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
              onClick={() => onSubscribe('app-yearly')}
              disabled={yearlyDisabled}
            >
              {yearlyButtonLabel}
            </button>
          </article>
        </div>

        <p className="settings-subscription-disclaimer">
          {language === 'fr'
            ? 'Paiement sécurisé. Annulation possible à tout moment pour la formule annuelle.'
            : 'Secure billing. You can cancel anytime for the yearly plan.'}
        </p>

        <div className="settings-subscription-proof">
          <span>{language === 'fr' ? '900+ apprenants' : '900+ learners'}</span>
          <span>★★★★★ 5/5</span>
        </div>
      </section>
    </div>
  );
}
