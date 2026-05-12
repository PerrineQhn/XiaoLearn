/**
 * community-roadmap.ts — jalons curatés affichés sur la timeline
 * ---------------------------------------------------------------
 * Source pour MVP : hardcodé. À terme, basculer sur la collection
 * Firestore `community_roadmap` (read-only pour les users, write admin
 * via console).
 *
 * Ordre : par `date` ascendant. Le composant Timeline détecte le
 * jalon "aujourd'hui" (premier `upcoming/planned`) et place le curseur.
 */

import type { RoadmapMilestone } from '../types/community-feedback';

export const COMMUNITY_ROADMAP: RoadmapMilestone[] = [
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
  {
    id: 'm-community-2026-05-15',
    title: 'Idées & Conversations',
    description: 'Communauté : proposer des idées, échanger entre apprenants.',
    status: 'in-dev',
    date: '2026-05-15'
  },
  {
    id: 'm-mobile-2026-06-01',
    title: 'App mobile (iOS + Android)',
    description: 'Version native React Native, lecture audio offline.',
    status: 'planned',
    date: '2026-06-01'
  },
  {
    id: 'm-handwriting-2026-06-15',
    title: 'Reconnaissance écriture caractères',
    description: 'Pad tactile pour s\'entraîner aux hanzi.',
    status: 'planned',
    date: '2026-06-15'
  },
  {
    id: 'm-speech-2026-07-01',
    title: 'Reconnaissance vocale',
    description: 'Évaluation prononciation avec micro intégré.',
    status: 'upcoming',
    date: '2026-07-01'
  },
  {
    id: 'm-hsk-prep-2026-08-01',
    title: 'Préparation officielle HSK',
    description: 'Sessions blanches HSK 1-6.',
    status: 'upcoming',
    date: '2026-08-01'
  }
];
