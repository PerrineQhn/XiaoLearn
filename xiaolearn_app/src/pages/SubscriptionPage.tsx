import type { Language } from '../i18n';
import type { EntitlementStatus } from '../hooks/useEntitlements';
import type { AccessTier } from '../utils/access';
import '../styles/subscription-pricing.css';

interface SubscriptionPageProps {
  language: Language;
  subscription: EntitlementStatus | null;
  accessTier: AccessTier;
  trialDaysLeft: number;
  trialEndsAt: string | null;
  onSubscribe: (planId: string) => void;
  onManageSubscription: () => void;
}

/**
 * SubscriptionPage — visuel strictement aligné sur le site marketing
 * (xiaolearn_reference/src/pages/index.astro section #pricing).
 *
 * Layout 2 cards :
 *   - Mensuel (gauche, blanche, sobre)
 *   - Lifetime (droite, rouge sombre, "Meilleure offre")
 *
 * Différences avec le site :
 *   - On affiche un bandeau de statut au-dessus (Premium actif / Essai / Gratuit)
 *   - Les boutons sont contextuels (Déjà inclus / Démarrer / Passer à vie selon état)
 *   - Les boutons sont désactivés si l'utilisateur a déjà le plan
 */
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

  // Features alignées sur le site marketing — incluant "Niveau A1 complet — gratuit"
  // qui rappelle l'offre découverte gratuite. Cohérent avec le copy du site.
  const monthlyFeatures =
    language === 'fr'
      ? [
          'Niveau A1 complet — gratuit',
          'Cours structurés de A1 à C2',
          'Flashcards avec révision espacée (SRS)',
          'Prof. Xiao IA disponible 24/7',
          'Dictionnaire HSK complet + audio',
          'Communauté d\'apprenants',
          'Sync entre tous tes appareils'
        ]
      : [
          'Full A1 level — free',
          'Structured A1 → C2 courses',
          'Spaced-repetition flashcards (SRS)',
          'Prof. Xiao AI 24/7',
          'Full HSK dictionary with audio',
          'Learners community',
          'Cross-device sync'
        ];

  // Bonus Lifetime — uniquement ce qui s'ajoute au Mensuel
  const lifetimeBonusFeatures =
    language === 'fr'
      ? [
          { label: 'Accès illimité à toutes les fonctionnalités', exclusive: false },
          { label: 'Toutes les futures fonctionnalités incluses', exclusive: false },
          { label: 'Accès prioritaire aux nouveautés', exclusive: false },
          { label: '🎭 Simulateur de Situations (exclusif à vie)', exclusive: true },
          { label: '✨ Créer ses propres flashcards (exclusif à vie)', exclusive: true }
        ]
      : [
          { label: 'Unlimited access to all features', exclusive: false },
          { label: 'All future features included', exclusive: false },
          { label: 'Priority access to new releases', exclusive: false },
          { label: '🎭 Situations Simulator (lifetime exclusive)', exclusive: true },
          { label: '✨ Create your own flashcards (lifetime exclusive)', exclusive: true }
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
    ? "Débloquer l'accès à vie"
    : 'Unlock lifetime access';

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
      ? 'Commencer gratuitement'
      : 'Start free';

  const lifetimeDisabled = hasLifetimeAccess;
  const monthlyDisabled = (hasSubscription && subscriptionActive) || hasLifetimeAccess;

  return (
    <div className="settings-page subscription-page">
      <header className="settings-header">
        <h1 className="page-title">{language === 'fr' ? 'Abonnement' : 'Subscription'}</h1>
        <p className="page-subtitle">
          {language === 'fr' ? 'Un prix simple. Sans surprise.' : 'Simple pricing. No surprises.'}
        </p>
      </header>

      {/* Bandeau de statut */}
      <div className="sp-status-bar">
        <div>
          <p className={`sp-status ${subscriptionActive ? 'is-active' : 'is-inactive'}`}>
            {subscriptionStatusLabel}
          </p>
          {renewalLabel && (
            <p className="sp-status-renewal">
              {language === 'fr' ? `Renouvellement le ${renewalLabel}` : `Renews on ${renewalLabel}`}
            </p>
          )}
          {!subscriptionActive && accessTier === 'trial' && trialEndLabel && (
            <p className="sp-status-renewal">
              {language === 'fr' ? `Fin de l'essai le ${trialEndLabel}` : `Trial ends on ${trialEndLabel}`}
            </p>
          )}
        </div>
        <div className="sp-status-actions">
          {hasSubscription && subscriptionActive && (
            <button type="button" className="sp-manage-btn" onClick={onManageSubscription}>
              {language === 'fr' ? 'Gérer mon abonnement' : 'Manage subscription'}
            </button>
          )}
          {hasLifetimeAccess && (
            <span className="sp-lifetime-pill">
              {language === 'fr' ? 'Accès à vie actif' : 'Lifetime access active'}
            </span>
          )}
        </div>
      </div>

      {/* Grid 2 tuiles : Mensuel à gauche, Lifetime à droite */}
      <div className="sp-grid">
        {/* Tuile Mensuel — blanche, sobre */}
        <article className="sp-card sp-card--monthly">
          <span className="sp-label">{language === 'fr' ? 'Mensuel' : 'Monthly'}</span>
          <p className="sp-price">
            <span className="sp-price-amount">{language === 'fr' ? '14€' : '€14'}</span>
            <span className="sp-price-unit">{language === 'fr' ? '/mois' : '/month'}</span>
          </p>
          <p className="sp-note">{language === 'fr' ? 'Annule quand tu veux' : 'Cancel anytime'}</p>
          <button
            type="button"
            className="sp-btn"
            onClick={() => onSubscribe('app-monthly')}
            disabled={monthlyDisabled}
          >
            {monthlyButtonLabel}
          </button>
          <ul className="sp-features">
            {monthlyFeatures.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </article>

        {/* Tuile Lifetime — rouge sombre, mise en avant */}
        <article className="sp-card sp-card--lifetime">
          <span className="sp-badge">
            {language === 'fr' ? '★ Meilleure offre' : '★ Best value'}
          </span>
          <span className="sp-label sp-label--inverse">{language === 'fr' ? 'À vie' : 'Lifetime'}</span>
          <p className="sp-price sp-price--inverse">
            <span className="sp-price-amount">{language === 'fr' ? '99€' : '€99'}</span>
            <span className="sp-price-unit">
              {language === 'fr' ? 'une seule fois' : 'one-time'}
            </span>
          </p>
          <p className="sp-note sp-note--inverse">
            {language === 'fr' ? 'Accès illimité pour toujours' : 'Unlimited access forever'}
          </p>
          <button
            type="button"
            className="sp-btn sp-btn--filled"
            onClick={() => onSubscribe('app-lifetime')}
            disabled={lifetimeDisabled}
          >
            {lifetimeButtonLabel}
          </button>
          <p className="sp-intro">
            <strong>
              {language === 'fr' ? 'Tout le plan Mensuel, plus :' : 'Everything in Monthly, plus:'}
            </strong>
          </p>
          <ul className="sp-features sp-features--inverse">
            {lifetimeBonusFeatures.map((f) => (
              <li key={f.label} className={f.exclusive ? 'is-exclusive' : undefined}>
                {f.label}
              </li>
            ))}
          </ul>
        </article>
      </div>

      <p className="sp-foot">
        {language === 'fr'
          ? 'Les premiers cours sont gratuits. Pas de carte bancaire requise pour commencer. Paiement sécurisé via Stripe.'
          : 'First lessons are free. No card required to start. Secure payment via Stripe.'}
      </p>
    </div>
  );
}
