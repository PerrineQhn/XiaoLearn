/**
 * cardIdentity.ts — comment une carte s'appelle, pour les deux applications.
 * ---------------------------------------------------------------------------
 * Web et mobile écrivent dans le MÊME document Firestore (`users/{uid}`). Le
 * nom d'une carte n'est donc pas un détail interne : c'est un contrat entre
 * deux bases de code. Tant que chacune nommait ses cartes à sa façon, un compte
 * accumulait deux historiques étrangers l'un à l'autre.
 *
 * Ce fichier est l'UNIQUE endroit du mobile où cette décision se prend. Son
 * jumeau côté web est `xiaolearn_app/src/utils/srs-identity.ts`, qui doit être
 * modifié à l'identique — sinon les deux historiques se re-séparent
 * silencieusement, ce qui est exactement ce qui s'était produit.
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
 *
 * ## Pourquoi le contenu comme identifiant, et pas une position
 *
 * Les mots comme les phrases étaient auparavant désignés par leur POSITION
 * dans le cours — `sectionId:3:12` côté mobile, `sent-{leçon}-{ligne}` côté
 * web. Un identifiant positionnel ne survit pas à une modification du cours :
 * insérer une ligne au milieu d'un dialogue décale toutes les suivantes, et
 * l'historique de révision se réattribue en silence aux mauvaises phrases.
 * C'est ce qui faisait remonter des centaines de cartes « à réviser » du jour
 * au lendemain.
 *
 * Le hanzi, lui, EST la carte. Il est stable, il est commun aux deux
 * plateformes, et il déduplique gratuitement : 茶 enseigné dans cinq leçons ne
 * donne qu'une carte, ce qui est la seule lecture sensée pour de la répétition
 * espacée.
 *
 * ## Pourquoi les cartes personnelles font exception
 *
 * Elles n'ont pas de contenu de référence : deux cartes créées à un mois
 * d'intervalle sur le même hanzi sont deux fiches distinctes, avec chacune sa
 * note et son intention. Leur identifiant reste donc opaque et attribué à la
 * création. C'est aussi ce qui garantit qu'une carte personnelle sur 茶 ne
 * vienne pas écraser l'historique du 茶 du catalogue.
 */

/** Normalisation Unicode : deux écritures du même caractère = une carte. */
const nfc = (s: string) => s.normalize('NFC');

/** Identifiant d'un mot du catalogue. */
export function cardIdForHanzi(hanzi: string): string {
  return `w:${nfc(hanzi)}`;
}

/** Identifiant d'une phrase — dialogue ou exemple, même espace de noms. */
export function cardIdForSentence(hanzi: string): string {
  return `s:${nfc(hanzi)}`;
}

/**
 * Identifiant d'une carte personnelle : attribué une fois, jamais recalculé.
 *
 * Base 36 sur l'horodatage suivi de cinq caractères aléatoires — assez court
 * pour rester lisible dans les journaux, assez large pour que deux créations
 * dans la même milliseconde ne se rencontrent pas.
 */
export function newPersonalCardId(): string {
  return `p:${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
}

export const isWordId = (id: string) => id.startsWith('w:');
export const isSentenceId = (id: string) => id.startsWith('s:');
export const isPersonalId = (id: string) => id.startsWith('p:');

/**
 * Ancien préfixe des cartes personnelles du mobile.
 *
 * On migre ces identifiants — contrairement à l'état SRS, qu'on a délibérément
 * remis à zéro. La différence tient à ce que désigne la donnée : un historique
 * de révision attaché à un identifiant positionnel ne veut plus rien dire, on
 * ne perd donc rien à l'abandonner. Une carte personnelle, elle, est du texte
 * que l'utilisateur a tapé lui-même. La renommer est une opération sûre, la
 * jeter ne l'est pas.
 */
const LEGACY_PERSONAL_PREFIX = 'custom:';

/** `custom:abc` → `p:abc`. Sans effet sur un identifiant déjà au bon format. */
export function migratePersonalId(id: string): string {
  return id.startsWith(LEGACY_PERSONAL_PREFIX)
    ? `p:${id.slice(LEGACY_PERSONAL_PREFIX.length)}`
    : id;
}
