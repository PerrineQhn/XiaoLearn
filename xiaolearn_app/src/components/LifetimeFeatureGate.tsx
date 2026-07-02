/**
 * LifetimeFeatureGate.tsx
 *
 * Composant d'upsell affiché à la place d'une feature Lifetime-exclusive
 * (Simulateur, Custom flashcards) quand l'utilisateur n'a pas le plan
 * Lifetime (= isLifetime: false). Cohérent avec la promesse de la
 * SubscriptionPage qui marque ces features comme "Exclusif Lifetime".
 *
 * Pourquoi un composant dédié plutôt qu'un redirect vers la page Abonnement :
 * l'utilisateur a explicitement cliqué sur la feature (onglet Simulateur,
 * bouton +Ajouter), il veut comprendre POURQUOI elle n'est pas dispo, pas
 * être téléporté ailleurs. Le gate explique le manque + propose l'achat.
 */

import type { Language } from '../i18n';

interface LifetimeFeatureGateProps {
  language: Language;
  /** Nom court de la feature, ex. "Simulateur de situations". */
  featureName: string;
  featureNameEn?: string;
  /** Description optionnelle (1-2 phrases) de ce que fait la feature. */
  description?: string;
  descriptionEn?: string;
  /** Emoji affiché en haut du gate. Default 🔒. */
  icon?: string;
  /** Callback déclenché par le clic sur le CTA. Devrait setView('subscription'). */
  onSeePlans: () => void;
}

export default function LifetimeFeatureGate({
  language,
  featureName,
  featureNameEn,
  description,
  descriptionEn,
  icon = '🔒',
  onSeePlans
}: LifetimeFeatureGateProps) {
  const name = language === 'en' && featureNameEn ? featureNameEn : featureName;
  const desc = language === 'en' && descriptionEn ? descriptionEn : description;

  return (
    <div className="lifetime-gate">
      <div className="lifetime-gate__card">
        <div className="lifetime-gate__icon" aria-hidden>
          {icon}
        </div>
        <span className="lifetime-gate__badge">
          {language === 'fr' ? 'Exclusif Lifetime' : 'Lifetime exclusive'}
        </span>
        <h1 className="lifetime-gate__title">{name}</h1>
        {desc && <p className="lifetime-gate__description">{desc}</p>}
        <p className="lifetime-gate__pitch">
          {language === 'fr'
            ? "Cette fonctionnalité est réservée aux membres Accès à vie. Le plan Lifetime débloque définitivement le simulateur, la création de flashcards personnalisées et toutes les futures features de XiaoLearn."
            : "This feature is reserved for Lifetime members. The Lifetime plan permanently unlocks the simulator, custom flashcard creation, and all future features of XiaoLearn."}
        </p>
        <button
          type="button"
          className="btn-primary lifetime-gate__cta"
          onClick={onSeePlans}
        >
          {language === 'fr' ? 'Voir l\'offre Lifetime — 99€' : 'See Lifetime plan — €99'}
        </button>
        <p className="lifetime-gate__note">
          {language === 'fr'
            ? 'Paiement unique · Pas d\'abonnement · Accès permanent'
            : 'One-time payment · No subscription · Permanent access'}
        </p>
      </div>
    </div>
  );
}
