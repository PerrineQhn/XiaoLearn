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
  {
    id: 'm-search-live-2026-05-13',
    title: 'Recherche universelle en direct',
    description:
      'Panneau live : leçons, vocabulaire et conversations Prof. Xiao, plus raccourci ✨ Poser à Prof. Xiao.',
    status: 'delivered',
    date: '2026-05-13'
  },
  {
    id: 'm-profxiao-refonte-2026-05-13',
    title: 'Prof. Xiao : chat refondu + popup vocabulaire',
    description:
      'Interface 2 colonnes, popup vocabulaire au clic sur les hanzi, ajout direct aux flashcards.',
    status: 'delivered',
    date: '2026-05-13'
  },
  {
    id: 'm-mes-erreurs-2026-05-13',
    title: 'Mes erreurs : carnet auto de progression',
    description:
      'Capture auto des erreurs Prof. Xiao + Simulateur avec catégorie, sévérité et explication contextuelle.',
    status: 'delivered',
    date: '2026-05-13'
  },
  {
    id: 'm-community-2026-05-15',
    title: 'Communauté : Idées, Roadmap, Messagerie',
    description:
      'Annonces, votes communautaires, messagerie 1-1 et Idées & Roadmap publique — tout en ligne.',
    status: 'delivered',
    date: '2026-05-15'
  },
  {
    id: 'm-speech-2026-05-28',
    title: 'Reconnaissance vocale (drill prononciation)',
    description:
      'Atelier oral : tu parles dans le micro, verdict ✓ / ~ / ✗ immédiat via Web Speech API native.',
    status: 'delivered',
    date: '2026-05-28'
  },
  {
    id: 'm-handwriting-2026-05-28',
    title: 'Écriture des hanzi (drill calligraphie)',
    description:
      'Trace au doigt/souris, validation trait par trait via HanziWriter, hint disponible.',
    status: 'delivered',
    date: '2026-05-28'
  },
  {
    id: 'm-sync-cross-device-2026-06-02',
    title: 'Sync Firestore cross-device pour tous',
    description:
      'Sync progression, flashcards et erreurs entre tes appareils (gratuit ET premium).',
    status: 'delivered',
    date: '2026-06-02'
  },
  {
    id: 'm-grammar-tokens-2026-06-05',
    title: 'Tokens grammaticaux colorés',
    description:
      'Visualisation Sujet / Verbe / Objet / Particule sur 18 leçons de grammaire (A1 → B2.1).',
    status: 'delivered',
    date: '2026-06-05'
  },
  {
    id: 'm-custom-goals-2026-06-07',
    title: 'Objectifs quotidiens personnalisés',
    description:
      'Règle finement XP, cartes et leçons cibles dans les Réglages, sync cross-device.',
    status: 'delivered',
    date: '2026-06-07'
  },

  // ---- En cours -------------------------------------------------------------
  {
    id: 'm-battles-ranked-2026-06',
    title: 'Batailles de mots : ladder ranked',
    description:
      'Classement saisonnier 1v1 sur les flashcards : ELO, paliers Bronze → Master, récompenses XP.',
    status: 'in-dev'
  },
  {
    id: 'm-prof-xiao-correction-live',
    title: 'Prof. Xiao : correction en temps réel pendant la frappe',
    description:
      'Surligne les tons et particules suspects dans ta phrase avant même que tu envoies.',
    status: 'in-dev'
  },

  // ---- Prochainement (sans date — pas d'engagement calendaire) -------------
  {
    id: 'm-mobile-app',
    title: 'Applications iOS et Android natives',
    description: 'Notifications push, mode hors-ligne, widgets streak.',
    status: 'planned'
  },
  {
    id: 'm-offline',
    title: 'Mode hors-ligne complet',
    description:
      'Leçons, flashcards et révisions sans connexion — sync auto au retour en ligne.',
    status: 'planned'
  },
  {
    id: 'm-cantonese',
    title: 'Cantonais (粵語)',
    description: 'Deuxième langue : Jyutping, audio Hong Kong, dico Cantodict.',
    status: 'planned'
  },
  {
    id: 'm-stories',
    title: 'Histoires graduées + lecture guidée',
    description:
      'Nouvelles courtes par niveau HSK avec audio narré, glossaire intégré et compréhension.',
    status: 'planned'
  }
];
