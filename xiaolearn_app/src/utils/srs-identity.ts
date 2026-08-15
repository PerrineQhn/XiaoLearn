/**
 * srs-identity.ts — contrat d'identité de la répétition espacée
 * ---------------------------------------------------------------------------
 * Web et mobile écrivent dans le MÊME document Firestore (`users/{uid}`). Tant
 * que chaque plateforme nommait ses cartes à sa façon, un compte y accumulait
 * deux historiques étrangers l'un à l'autre : réviser 茶 sur iPhone ne changeait
 * rien dans le navigateur, et inversement.
 *
 * Ce fichier est l'UNIQUE endroit où le web décide comment une carte s'appelle
 * et sous quelle clé son état est stocké. Tout le reste importe d'ici — c'est
 * précisément la dispersion de `cl_word_srs_v1` en dur qui avait laissé les
 * deux applications diverger sans que personne s'en aperçoive.
 *
 * La source du contrat est `xiaolearn_mobile/data/cardIdentity.ts` : toute
 * modification ici doit y être répercutée à l'identique, sinon les deux
 * historiques se re-séparent silencieusement.
 *
 * ## Les trois natures de carte
 *
 * Un préfixe d'une lettre suivi de `:` désigne la nature. Le préfixe n'est pas
 * décoratif : il rend les trois espaces de noms disjoints par construction, si
 * bien qu'aucune collision n'est possible même si deux natures partagent le
 * même hanzi.
 *
 *   `w:<hanzi>`  MOT du catalogue de cours.
 *   `s:<hanzi>`  PHRASE — ligne de dialogue ou exemple de vocabulaire.
 *   `p:<opaque>` carte PERSONNELLE, créée de toutes pièces par l'utilisateur.
 */

/**
 * Clé de l'état SRS — version 2.
 *
 * La v1 mélangeait deux schémas d'identifiants incompatibles, celui du mobile
 * (positionnel) et celui du web (l'id catalogue `hsk1-0001`). La v2 est commune
 * aux deux plateformes et repose sur `cardIdForHanzi`.
 *
 * On ne migre PAS la v1 : ses clés ne désignent plus rien de fiable — côté
 * mobile un mot déplacé depuis leur écriture pointerait sur un autre mot, et
 * ressusciter une progression fausse serait pire que de repartir à zéro. La v1
 * est laissée en place, intacte, plutôt qu'effacée : elle ne coûte rien et
 * permettrait un retour en arrière.
 *
 * Le timestamp cloud associé suit la convention de `useFirestoreSync` :
 * `cl_word_srs_v2__updatedAt`.
 */
export const WORD_SRS_STORAGE_KEY = 'cl_word_srs_v2';

/**
 * Identifiant d'une carte : le mot lui-même.
 *
 * Reproduction à l'identique de `cardIdForHanzi` dans
 * `xiaolearn_mobile/hooks/useSrsData.ts`, qui porte le raisonnement complet.
 * En résumé :
 *
 *   - le hanzi est la seule chose stable et commune aux deux plateformes ; un
 *     identifiant de catalogue (`hsk1-0001`) ou une position dans le cours ne
 *     veut rien dire pour l'autre application, et ne survit pas à une refonte
 *     du contenu ;
 *   - la normalisation NFC évite que deux écritures Unicode du même caractère
 *     produisent deux cartes ;
 *   - le préfixe `w:` réserve la place pour d'autres natures de carte (`s:`
 *     pour une phrase, par exemple) sans risque de collision.
 *
 * Effet recherché : un mot enseigné dans plusieurs leçons ne donne qu'UNE
 * carte. Le maîtriser dans une leçon et l'avoir « nouveau » dans une autre
 * n'a aucun sens pour de la répétition espacée.
 */
export function cardIdForHanzi(hanzi: string): string {
  return `w:${hanzi.normalize('NFC')}`;
}

/**
 * Identifiant d'une phrase — ligne de dialogue ou exemple de vocabulaire.
 *
 * Les deux sources partagent volontairement le même espace de noms. Elles
 * étaient auparavant nommées `sent-{leçon}-{ligne}` et
 * `ex-{leçon}-{vocab}-{index}` : deux schémas positionnels, avec exactement le
 * défaut qu'on venait de corriger sur les mots. Insérer une ligne au milieu
 * d'un dialogue décalait toutes les suivantes, et l'historique de révision se
 * réattribuait en silence aux mauvaises phrases.
 *
 * Séparer les deux origines n'aurait rien apporté et aurait coûté cher : la
 * liste des phrases est de toute façon dédupliquée par hanzi, si bien qu'une
 * même phrase apparaissant dans un dialogue ET dans un exemple aurait produit
 * deux cartes concurrentes pour une seule phrase à l'écran.
 */
export function cardIdForSentence(hanzi: string): string {
  return `s:${hanzi.normalize('NFC')}`;
}

/**
 * Identifiant d'une carte personnelle : attribué une fois, jamais recalculé.
 *
 * Les cartes personnelles font exception au principe « le contenu EST
 * l'identifiant » : elles n'ont pas de contenu de référence. Deux cartes créées
 * à un mois d'intervalle sur le même hanzi sont deux fiches distinctes, avec
 * chacune sa note et son intention. L'opacité de l'identifiant garantit aussi
 * qu'une carte personnelle sur 茶 n'écrase pas l'historique du 茶 du catalogue.
 */
export function newPersonalCardId(): string {
  return `p:${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
}

export const isWordId = (id: string) => id.startsWith('w:');
export const isSentenceId = (id: string) => id.startsWith('s:');
export const isPersonalId = (id: string) => id.startsWith('p:');

/**
 * Ancien préfixe des cartes personnelles du web (`pf-1712…-a1b2c`).
 *
 * On migre ces identifiants — contrairement à l'état SRS, qu'on a délibérément
 * remis à zéro. La différence tient à ce que désigne la donnée : un historique
 * de révision attaché à un identifiant positionnel ne veut plus rien dire, on
 * ne perd donc rien à l'abandonner. Une carte personnelle, elle, est du texte
 * que l'utilisateur a tapé lui-même. La renommer est une opération sûre, la
 * jeter ne l'est pas.
 */
const LEGACY_PERSONAL_PREFIX = 'pf-';

/** `pf-1712…-a1b2c` → `p:1712…-a1b2c`. Sans effet sur un id déjà au bon format. */
export function migratePersonalId(id: string): string {
  return id.startsWith(LEGACY_PERSONAL_PREFIX)
    ? `p:${id.slice(LEGACY_PERSONAL_PREFIX.length)}`
    : id;
}
