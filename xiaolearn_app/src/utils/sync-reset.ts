/**
 * sync-reset — effacer volontairement, dans un monde où la fusion ne le permet pas.
 *
 * ## Le problème que ça résout
 *
 * Depuis que la synchronisation fusionne au lieu de choisir, elle est
 * *croissante* : le résultat n'est jamais plus pauvre que ce qu'on avait.
 * C'est la propriété qui empêche un appareil neuf d'effacer une progression.
 * Mais c'est aussi ce qui rend « Réinitialiser ma progression » impossible :
 * l'appareil qui remet à zéro pousse une liste vide, un autre appareil garde
 * l'ancienne en local, et la fusion suivante la ramène. On ne peut pas à la
 * fois interdire l'appauvrissement accidentel et autoriser l'effacement
 * volontaire — pas avec la seule fusion.
 *
 * ## Le mécanisme
 *
 * Il faut donc un signal hors-bande, que les appareils respectent AVANT de
 * fusionner. C'est `xl_reset_epoch` : la date de la dernière remise à zéro
 * demandée par l'utilisateur, posée sur le document du compte.
 *
 * La règle tient en une phrase : **un appareil qui découvre une époque qu'il
 * n'a pas encore honorée purge sa progression locale et recharge.**
 *
 * Le traitement est volontairement global, et non clé par clé. Écarter les
 * valeurs locales une à une aurait paru plus fin, mais n'aurait pas suffi :
 * les consommateurs fusionnent AUSSI en mémoire — `App.tsx` fait
 * `new Set([...prev, ...data])` sur les leçons terminées, précisément pour
 * qu'un instantané cloud vide n'efface pas l'écran. Cet état React survit à
 * la purge du stockage et réécrirait ce qu'on vient d'effacer. Vider le
 * stockage puis recharger est la seule façon de repartir d'un état où plus
 * rien ne se souvient.
 *
 * Après le rechargement, le stockage local est vide : la réconciliation
 * adopte les valeurs du cloud, qui sont celles de la remise à zéro. Aucun cas
 * particulier n'est nécessaire dans la fusion elle-même.
 *
 * Un appareil qui a repris le travail APRÈS la remise à zéro a déjà honoré
 * cette époque — son marqueur le dit — et ne purge donc pas ce qu'il a fait
 * depuis.
 *
 * ## Pourquoi l'ancienne remise à zéro ne marchait pas
 *
 * Indépendamment de la fusion, elle supprimait des documents sous
 * `users/{uid}/data/{clé}`. Or la synchronisation n'a jamais rien écrit là :
 * elle range les valeurs en CHAMPS du document `users/{uid}`. On effaçait
 * donc des documents qui n'existaient pas, la vraie donnée restait intacte,
 * et le rechargement la faisait redescendre. Le bouton n'a jamais rien remis
 * à zéro ailleurs que dans le stockage local de l'appareil courant.
 */

/** Champ du document utilisateur portant la date de la dernière remise à zéro. */
export const RESET_EPOCH_FIELD = 'xl_reset_epoch';

/**
 * Clé locale retenant la dernière époque déjà honorée par CET appareil.
 *
 * Elle commence par `xl_` comme les clés de progression, mais ne doit surtout
 * pas être purgée avec elles : la perdre ferait redécouvrir l'époque au
 * prochain démarrage, donc repurger, donc recharger. Les deux endroits qui
 * font du ménage dans le stockage local l'excluent explicitement.
 */
export const EPOCH_APPLIQUEE_KEY = 'xl_reset_epoch_applied';

/**
 * Les clés que « Réinitialiser ma progression » efface.
 *
 * Volontairement absentes : les préférences d'interface (langue, thème), les
 * objectifs quotidiens et l'abonnement. Remettre sa progression à zéro n'est
 * pas repartir de l'écran d'accueil d'une app fraîchement installée — c'est
 * effacer ce qu'on a appris, pas comment on veut l'apprendre.
 */
export const CLES_DE_PROGRESSION = [
  'cl_completed_lessons',
  'cl_learned_words',
  'cl_bilans_v7',
  'cl_lesson_mastery_v7',
  'cl_word_srs_v1',
  'cl_word_srs_v2',
  'cl_learning_stats_v1',
  'cl_flashcard_activity_v4',
  'cl_personal_flashcards_v7',
  'cl_custom_lists',
  'xl_xp_v2',
  'xl_xp_total',
  'xl_xp_today',
  'xl_streak_v2',
  'xl_streak_days',
  'xl_streak_bonus_v1',
  'xl_activity_v2',
  'xl_study_days',
  'xl_achievements_v1',
  'xl_battle_stats_v1',
  'xl_mastered_cards_count',
  'xl_last_study_date',
  'xl_daily_counts_v1',
  'xl_chat_conversations_v1',
  'xl_error_journal_v1',
] as const;

/** La valeur « remise à zéro » de chaque clé, dans la forme que son lecteur attend. */
export const VALEUR_REMISE_A_ZERO: Record<string, string> = {
  cl_completed_lessons: '[]',
  cl_learned_words: '[]',
  cl_bilans_v7: '{}',
  cl_lesson_mastery_v7: '{}',
  cl_word_srs_v1: '{}',
  cl_word_srs_v2: '{}',
  cl_learning_stats_v1: '{"dailyMinutes":{},"totalMinutes":0,"streak":0,"lastDate":null}',
  cl_flashcard_activity_v4: '{}',
  cl_personal_flashcards_v7: '[]',
  cl_custom_lists: '[]',
  xl_xp_v2: '0',
  xl_xp_total: '"0"',
  xl_xp_today: '"0"',
  xl_streak_v2: '{"current":0,"best":0,"lastDay":null}',
  xl_streak_days: '"0"',
  xl_streak_bonus_v1: '{"milestonesClaimed":[],"lastDailyBonusAt":null}',
  xl_activity_v2: '{}',
  xl_study_days: '[]',
  xl_achievements_v1: '{}',
  xl_battle_stats_v1: '{"played":0,"won":0,"draw":0,"xpFromBattles":0,"recent":[]}',
  xl_mastered_cards_count: '0',
  xl_last_study_date: '""',
  xl_daily_counts_v1: '{}',
  xl_chat_conversations_v1: '[]',
  xl_error_journal_v1: '[]',
};
