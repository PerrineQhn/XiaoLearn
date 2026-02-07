import { useState } from 'react';
import type { Language } from '../i18n';

interface Plan {
  id: string;
  label: string;
  description: string;
  price: string;
  priceNote: string;
  features: string[];
  badge?: string;
  highlight?: boolean;
}

interface SubscriptionCopy {
  badge: string;
  title: string;
  subtitle: string;
  benefitsTitle: string;
  benefits: string[];
  plans: Plan[];
  cta: string;
  loginCta: string;
  disclaimer: string;
}

interface SubscriptionGateProps {
  language: Language;
  isAuthenticated: boolean;
  onLogin: () => void;
  onSubscribe: (planId: string) => Promise<void> | void;
}

const copyByLanguage: Record<Language, SubscriptionCopy> = {
  fr: {
    badge: 'Tarifs',
    title: 'Choisissez votre accès XiaoLearn',
    subtitle: 'Deux formules simples pour progresser durablement en mandarin.',
    benefitsTitle: 'Tout est inclus',
    benefits: [
      'Leçons new HSK 3.0 (2026) 1-7 et mises à jour futures',
      'SRS intelligent et statistiques de progression',
      'Assistant IA (en ligne uniquement), mini-jeux et dictées',
      'Dictionnaire intégré et audio natif',
      'Synchronisation multi-appareils et mode hors ligne'
    ],
    plans: [
      {
        id: 'app-lifetime',
        label: 'Accès à vie',
        description: 'Débloquez XiaoLearn une fois pour toutes.',
        price: '259€',
        priceNote: 'paiement unique',
        badge: 'Meilleur choix',
        highlight: true,
        features: [
          'Accès illimité sans expiration',
          'Toutes les nouveautés incluses',
          'Support prioritaire',
          'Accès premium sur tous vos appareils'
        ]
      },
      {
        id: 'app-yearly',
        label: 'Licence 1 an',
        description: 'Idéal pour progresser sur 12 mois.',
        price: '9€ / mois',
        priceNote: 'facturé 108€ / an',
        features: [
          'Accès complet pendant 12 mois',
          'Toutes les nouveautés incluses',
          'Support standard',
          'Accès premium sur tous vos appareils'
        ]
      }
    ],
    cta: 'Choisir',
    loginCta: 'Se connecter pour acheter',
    disclaimer: 'Paiement sécurisé par Stripe - Accès immédiat après achat'
  },
  en: {
    badge: 'Pricing',
    title: 'Choose your XiaoLearn access',
    subtitle: 'Two simple plans to keep progressing in Mandarin.',
    benefitsTitle: 'Everything included',
    benefits: [
      'HSK 3.0 lessons (2026) levels 1-7 + future updates',
      'Smart SRS with progress analytics',
      'AI assistant (online only), mini-games, and dictations',
      'Built-in dictionary with native audio',
      'Multi-device sync and offline mode'
    ],
    plans: [
      {
        id: 'app-lifetime',
        label: 'Lifetime access',
        description: 'Unlock XiaoLearn for good.',
        price: '€259',
        priceNote: 'one-time payment',
        badge: 'Best value',
        highlight: true,
        features: [
          'Unlimited access with no expiry',
          'All future updates included',
          'Priority support',
          'Premium access on all devices'
        ]
      },
      {
        id: 'app-yearly',
        label: '1-year license',
        description: 'Perfect for a focused 12-month journey.',
        price: '€9/month',
        priceNote: 'billed €108/year',
        features: [
          'Full access for 12 months',
          'All future updates included',
          'Standard support',
          'Premium access on all devices'
        ]
      }
    ],
    cta: 'Select',
    loginCta: 'Sign in to purchase',
    disclaimer: 'Secure checkout via Stripe - Instant access after purchase'
  }
};

const SubscriptionGate = ({ language, isAuthenticated, onLogin, onSubscribe }: SubscriptionGateProps) => {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const copy = copyByLanguage[language];

  const handleSubscribe = async (planId: string) => {
    try {
      setLoadingPlan(planId);
      await onSubscribe(planId);
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="subscription-gate">
      <div className="subscription-pricing">
        <header className="subscription-header">
          <span className="subscription-badge">{copy.badge}</span>
          <h1>{copy.title}</h1>
          <p className="subscription-subtitle">{copy.subtitle}</p>
        </header>

        <div className="subscription-body">
          <div className="subscription-benefits">
            <h2>{copy.benefitsTitle}</h2>
            <ul className="subscription-benefits-list">
              {copy.benefits.map((benefit) => (
                <li key={benefit} className="subscription-benefit">
                  <span className="subscription-check">✓</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="subscription-cards">
            {copy.plans.map((plan) => (
              <div
                key={plan.id}
                className={`subscription-plan-card${plan.highlight ? ' is-featured' : ''}`}
              >
                <div className="plan-header">
                  <div>
                    <h3>{plan.label}</h3>
                    <p className="plan-description">{plan.description}</p>
                  </div>
                  {plan.badge && <span className="plan-badge">{plan.badge}</span>}
                </div>

                <div className="plan-price-row">
                  <span className="plan-price">{plan.price}</span>
                  <span className="plan-price-note">{plan.priceNote}</span>
                </div>

                <ul className="plan-features">
                  {plan.features.map((feature) => (
                    <li key={feature} className="plan-feature">
                      <span className="subscription-check">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className={`plan-cta${plan.highlight ? ' primary' : ''}`}
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={!isAuthenticated || loadingPlan === plan.id}
                >
                  {loadingPlan === plan.id ? '...' : copy.cta}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="subscription-footer">
          <p className="subscription-disclaimer">{copy.disclaimer}</p>
          {!isAuthenticated && (
            <button type="button" className="subscription-login" onClick={onLogin}>
              {copy.loginCta}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionGate;
