/**
 * community-roadmap.ts — jalons curatés affichés sur la timeline
 * ---------------------------------------------------------------
 * Source pour MVP : hardcodé. À terme, basculer sur la collection
 * Firestore `community_roadmap` (read-only pour les users, write admin
 * via console).
 *
 * Convention :
 *   - Items avec `date` ISO : positionnés chronologiquement sur la timeline
 *     (livré / en cours).
 *   - Items SANS `date` : regroupés en fin sous "Prochainement". Permet
 *     d'annoncer ce qui est sur la table sans s'engager sur un calendrier
 *     non encore arrêté.
 */

import type { RoadmapMilestone } from '../types/community-feedback';

export const COMMUNITY_ROADMAP: RoadmapMilestone[] = [
  // ---- Livrés (par date croissante) ----------------------------------------
  {
    id: 'm-cloudflare-2026-05-05',
    title: 'Migration Cloudflare R2',
    description: 'Audios servis depuis Cloudflare R2, CDN mondial.',
    status: 'delivered',
    date: '2026-05-05'
  },
  {
    id: 'm-stripe-2026-05-08',
    title: 'Abonnements Mensuel + Lifetime',
    description: 'Paiement Stripe, déblocage Premium.',
    status: 'delivered',
    date: '2026-05-08'
  },
  {
    id: 'm-audio-dict-2026-05-12',
    title: 'Audio sur le dictionnaire',
    description: 'Bouton 🔊 sur chaque fiche et exemple.',
    status: 'delivered',
    date: '2026-05-12'
  },

  // ---- En cours -------------------------------------------------------------
  {
    id: 'm-community-2026-05-15',
    title: 'Idées & Conversations',
    description: 'Communauté : proposer des idées, échanger entre apprenants.',
    status: 'in-dev',
    date: '2026-05-15'
  },

  // ---- Prochainement (sans date — pas d'engagement calendaire) -------------
  {
    id: 'm-handwriting',
    title: 'Reconnaissance écriture caractères',
    description: 'Pad tactile pour s\'entraîner aux hanzi.',
    status: 'planned'
  },
  {
    id: 'm-speech',
    title: 'Reconnaissance vocale',
    description: 'Évaluation prononciation avec micro intégré.',
    status: 'planned'
  }
];
