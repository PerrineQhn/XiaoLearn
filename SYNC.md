# Synchronisation XiaoLearn — architecture et règles

Ce document est la carte de TOUT ce qui se sauvegarde et se synchronise :
entre navigateurs, entre appareils, et entre le web et le mobile. À lire avant
de toucher à une clé, et à tenir à jour quand on en ajoute une.

Dernière mise à jour : 2026-07-29 (audit complet + unification des dialectes).

## 1. Le modèle

Tout passe par UN document Firestore : `users/{uid}`. Chaque donnée y vit dans
un champ nommé comme sa clé de stockage local, accompagné d'un champ
`<clé>__updatedAt` (ISO). Localement : `localStorage` (web) et `AsyncStorage`
(mobile), avec un timestamp local `<clé>__ts` côté mobile.

Trois mécanismes cohabitent :

1. **useFirestoreSync** (web ET mobile, même convention `__updatedAt`) —
   réconciliation au chargement + écoute temps réel `onSnapshot`.
   - Web : « dernier gagne » par clé, MAIS les callbacks des hooks fusionnent
     défensivement (max, union) avant d'accepter une valeur cloud.
   - Mobile : « dernier gagne » par clé, SAUF pour les clés du registre
     `MERGERS` (voir §3) qui fusionnent comme le web.
2. **Synchronisations dédiées** avec fusion par entrée :
   - SRS `cl_word_srs_v2` : `useSrsData` (mobile) / `useWordSRS` (web) —
     fusion PAR MOT et PAR COMPÉTENCE (level max, dueAt min…). Cette clé ne
     doit JAMAIS passer par useFirestoreSync (retirée de SYNC_KEYS mobile).
     Les deux plateformes nomment leurs cartes `w:{hanzi NFC}` — contrat défini
     dans `xiaolearn_mobile/hooks/useSrsData.ts` (`cardIdForHanzi`) et repris
     à l'identique dans `xiaolearn_app/src/utils/srs-identity.ts`. La v1, où
     chacune avait son propre schéma, est abandonnée sans migration : ses clés
     ne désignent plus rien de fiable. Elle reste en place, non lue.
   - Cartes/hauts-faits : `useCards` (mobile) écrit LES DEUX formats —
     `cards` (map mobile) et `xl_achievements_v1` (JSON string web) — union,
     `xpClaimed: true` sur les entrées d'origine mobile pour ne pas verser
     l'XP deux fois.
3. **Documents annexes** : `publicProfiles/{uid}` (totalXp, affiché partout,
   toujours en max), `leaderboard/{uid}` (debounce 5 s), `conversations/…`,
   `reviews/{uid}`.

## 2. Qui possède quoi (matrice)

| Donnée | Clé canonique | Écrit par | Fusion |
|---|---|---|---|
| SRS (mots) | `cl_word_srs_v2` | web + mobile (sync dédiée) | par mot/compétence |
| Leçons complétées | `cl_completed_lessons` | web + mobile | union |
| Bilans | `cl_bilans_v7` | web + mobile | par niveau (passed OR, scores max) |
| XP total | `xl_xp_v2` (web) + `xl_xp_total` (mobile) | les deux | max ; addXp mobile écrit LES DEUX |
| Série | `xl_streak_v2` {current,best,lastDay} | les deux | lastDay le plus récent, best max |
| Activité/jour | `xl_activity_v2` {date: xp} | les deux | max par date |
| Jours pratiqués (mobile) | `xl_study_days` | mobile | union ; complété par les dates d'xl_activity_v2 |
| Stats legacy | `cl_learning_stats_v1` | web | max champ à champ |
| Cartes obtenues | `cards` + `xl_achievements_v1` | mobile écrit les 2 ; web écrit le 2ᵉ | union |
| Avatar | `avatarId` (champ direct) | mobile | dernier choix |
| Flashcards perso | `cl_personal_flashcards_v7` | web seul | web |
| Notes, erreurs, notes lues… | `xl_notes_v1`, `xl_error_journal_v1`, … | web seul | callbacks web |
| Préférences d'affichage | `xl_language`, `xl_show_pinyin_v1`, thème… | chaque plateforme | local (volontaire) |

**Règle d'or** : une donnée de progression ne régresse jamais. Toute fusion est
max/union/OR. Si tu ajoutes une clé de progression, ajoute sa fusion dans
`xiaolearn_mobile/hooks/useFirestoreSync.ts` (MERGERS) ET dans le callback du
hook web correspondant.

## 3. Le registre MERGERS (mobile)

`cl_completed_lessons` union · `xl_study_days` union · `cl_bilans_v7` par
niveau · `cl_learning_stats_v1` max/champ · `xl_xp_v2` max ·
`xl_activity_v2` max/date · `xl_streak_v2` par lastDay.

Testées hors app (fusions pures) : union, max, OR, cas nuls.

## 4. Pièges connus (et pourquoi ils existaient)

- **Deux dialectes XP/série/activité** : le tableau de bord web comptait dans
  `xl_xp_v2`/`xl_streak_v2`/`xl_activity_v2`, le mobile dans
  `xl_xp_total`/`xl_streak_days`/`xl_study_days`. L'XP mobile n'atteignait le
  web que via `publicProfiles.totalXp`… que le web n'a jamais relu. Corrigé :
  `addXp` mobile écrit les deux dialectes, l'affichage lit le max des deux.
- **Cartes invisibles sur mobile** : web dans `xl_achievements_v1`, mobile
  dans `cards`. Corrigé : pont bidirectionnel dans `useCards`.
- **SRS en double voie** : `cl_word_srs_v1` était AUSSI dans les SYNC_KEYS de
  `useUserStats` (blob « dernier gagne ») en concurrence avec la fusion par
  entrée de `useSrsData`. Retiré des SYNC_KEYS.
- **Écrasement en bloc** : le « dernier gagne » mobile pouvait perdre les
  leçons complétées hors-ligne quand l'autre appareil avait écrit après.
  Corrigé par le registre MERGERS.
- **Échecs silencieux** : toutes les écritures Firestore sont non-bloquantes
  par conception (offline-first). En cas de doute, chercher les
  `console.warn` avec code d'erreur ; `permission-denied` = règles non
  déployées → `firebase deploy --only firestore:rules` depuis `xiaolearn_app`.

## 5. Ce qui reste volontairement local

Thème sombre, langue d'interface (synchronisée mais sans enjeu de fusion),
réglages de notifications, ordre des raccourcis de l'accueil, caches LLM.
Perdre ces valeurs en changeant d'appareil est acceptable ; les synchroniser
avec fusion n'apporterait rien.
