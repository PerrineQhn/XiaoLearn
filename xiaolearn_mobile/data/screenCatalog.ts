/**
 * screenCatalog.ts — la liste des écrans de l'application, une seule fois.
 *
 * Deux surfaces de navigation présentent les mêmes écrans : le menu « Plus »
 * (et son rail latéral en paysage) et l'accès rapide de l'accueil. Elles
 * étaient saisies à la main, séparément. Elles ont dérivé : six écrans —
 * Dialogues, Statistiques, Simulateur HSK, Notes, Messages privés, Avis —
 * figuraient dans le menu et nulle part dans l'accès rapide. Rien ne le
 * signalait, puisque chaque liste était cohérente avec elle-même.
 *
 * Ce fichier est désormais la seule source. Ajouter un écran ici le fait
 * apparaître aux deux endroits ; l'oublier quelque part n'est plus possible.
 *
 * ## Pourquoi deux libellés par écran
 *
 * Le menu « Plus » reprend le vocabulaire de la barre latérale du web
 * (« Parcours »), l'accès rapide un vocabulaire plus court qui tient sous
 * une tuile (« Leçons »). Ces deux formulations-là sont voulues :
 * `labelKey` sert à l'accès rapide, `navLabelKey` au menu quand il diffère.
 *
 * En revanche, un même écran ne doit pas porter des noms DIFFÉRENTS d'une
 * surface à l'autre. Les flashcards s'appelaient « Mots » dans la barre
 * d'onglets, « Cartes » dans l'accès rapide, « Flashcards » dans le menu et
 * « Mes mots » dans le rail : quatre noms pour une destination, et rien
 * pour dire au lecteur qu'il s'agissait de la même. Elles s'appellent
 * « Mes mots » partout.
 *
 * ## Pourquoi deux ordres
 *
 * `group` place l'écran dans une section du menu « Plus » ; `quickOrder` fixe
 * sa position par défaut dans l'accès rapide. Les deux surfaces ne racontent
 * pas la même chose — le menu classe par domaine, l'accès rapide par fréquence
 * d'usage — et l'utilisateur peut de toute façon réordonner l'accès rapide au
 * doigt. Un écran sans `quickOrder` se range à la fin.
 */
import type { Ionicons } from '@expo/vector-icons';

type IoniconName = keyof typeof Ionicons.glyphMap;

/** Sections du menu « Plus », dans leur ordre d'affichage. */
export const SCREEN_GROUPS = ['pinned', 'practice', 'readingDict', 'community', 'news'] as const;
export type ScreenGroup = (typeof SCREEN_GROUPS)[number];

export interface ScreenEntry {
  /**
   * Identifiant stable. Il sert de clé à l'ordre personnalisé de l'accès
   * rapide, enregistré sur l'appareil : le renommer ferait perdre à
   * l'utilisateur l'agencement qu'il s'est composé.
   */
  id: string;
  route: string;
  icon: IoniconName;
  /** Icône propre à l'accès rapide, quand elle diffère de celle du menu. */
  quickIcon?: IoniconName;
  /**
   * Sigle affiché À LA PLACE de l'icône (ex. « HSK »). L'icône reste
   * renseignée en secours pour tout rendu qui ne gère pas le texte.
   */
  iconText?: string;
  /** Clé i18n du libellé en accès rapide. */
  labelKey: string;
  /** Clé i18n du libellé dans le menu « Plus », si le vocabulaire y diffère. */
  navLabelKey?: string;
  group: ScreenGroup;
  /** Présent dans l'accès rapide de l'accueil. */
  quick: boolean;
  /** Position par défaut en accès rapide. Absent = rangé à la fin. */
  quickOrder?: number;
  /**
   * Position dans le rail latéral des grands écrans. Absent = pas dans le
   * rail (l'écran reste atteignable par « Plus » et l'accès rapide).
   */
  railOrder?: number;
  /**
   * Famille d'appartenance dans le rail — un filet sépare les familles.
   * Le rail suit la journée d'un apprenant, pas l'architecture du menu :
   * on apprend, on mémorise, on s'entraîne, on cherche un mot.
   */
  railBand?: RailBand;
  /** Libellé plus court quand celui du menu déborde de la largeur du rail. */
  railLabelKey?: string;
  /** Compteur affiché en pastille : cartes dues, fautes en attente… */
  railBadge?: 'due' | 'errors';
}

/** Familles du rail, dans l'ordre d'affichage. */
export type RailBand = 'learn' | 'memorize' | 'practise' | 'lookup';
export const RAIL_BANDS: RailBand[] = ['learn', 'memorize', 'practise', 'lookup'];

export const SCREENS: ScreenEntry[] = [
  // ── Épinglé : les quatre onglets principaux ──────────────────────────────
  // L'accueil est le seul écran que l'accès rapide n'affiche pas : il y
  // pointerait sur la page qui le contient.
  { id: 'accueil', route: '/(tabs)', icon: 'home-outline',
    labelKey: 'nav.home', group: 'pinned', quick: false,
    railOrder: 1, railBand: 'learn' },
  { id: 'cours', route: '/(tabs)/cours', icon: 'book-outline',
    labelKey: 'sc.lessons', navLabelKey: 'nav.path', group: 'pinned', quick: true, quickOrder: 4,
    railOrder: 2, railBand: 'learn' },
  { id: 'cartes', route: '/(tabs)/flashcards', icon: 'layers-outline',
    labelKey: 'sc.cards', navLabelKey: 'nav.flashcards',
    group: 'pinned', quick: true, quickOrder: 2,
    railOrder: 4, railBand: 'memorize', railBadge: 'due' },
  { id: 'prof', route: '/(tabs)/messages', icon: 'chatbubble-ellipses-outline',
    labelKey: 'sc.prof', group: 'pinned', quick: true, quickOrder: 3,
    railOrder: 3, railBand: 'learn' },

  // ── Pratique ─────────────────────────────────────────────────────────────
  // Ni dans le rail, ni dans l'accès rapide : « Mes mots » est la porte
  // d'entrée des révisions — son bouton principal lance directement les
  // cartes dues, et il offre en plus le choix du nombre de cartes, du sens
  // et du mode (retournement/écriture). Deux entrées voisines nommées
  // « Révisions » et « Mes mots » ne se distinguaient pas à la lecture, et
  // l'accueil porte déjà une carte « À réviser » qui lance la séance d'un
  // geste. L'écran reste listé dans « Plus », section Pratique.
  { id: 'revisions', route: '/review', icon: 'fitness-outline',
    labelKey: 'sc.revisions', group: 'practice', quick: false },
  { id: 'statistiques', route: '/statistiques', icon: 'stats-chart-outline',
    labelKey: 'sc.stats', group: 'practice', quick: true, quickOrder: 16 },
  { id: 'simulateur', route: '/simulateur', icon: 'ribbon-outline', iconText: 'HSK',
    labelKey: 'sc.hsk', railLabelKey: 'rail.hsk', group: 'practice', quick: true, quickOrder: 17,
    railOrder: 9, railBand: 'practise' },
  // Deux « simulateurs » voisins mais sans rapport : celui du dessus fait
  // passer une épreuve HSK blanche, celui-ci met en scène une conversation.
  // Ils portent donc des icônes nettement différentes, sans quoi la seule
  // façon de les distinguer serait de lire l'étiquette en entier.
  { id: 'simulateurSituations', route: '/simulateur-situations', icon: 'people-outline',
    labelKey: 'sim.title', group: 'practice', quick: true, quickOrder: 22 },
  { id: 'atelier', route: '/atelier', icon: 'mic-outline',
    labelKey: 'sc.studio', group: 'practice', quick: true, quickOrder: 14 },
  { id: 'dialogues', route: '/dialogues', icon: 'chatbubbles-outline',
    labelKey: 'nav.dialogues', group: 'practice', quick: true, quickOrder: 18,
    railOrder: 8, railBand: 'practise' },
  { id: 'battle', route: '/battle', icon: 'flash-outline',
    labelKey: 'sc.battle', navLabelKey: 'nav.battles', group: 'practice', quick: true, quickOrder: 8 },
  { id: 'erreurs', route: '/erreurs', icon: 'warning-outline',
    labelKey: 'sc.errors', group: 'practice', quick: true, quickOrder: 11,
    railOrder: 5, railBand: 'memorize', railBadge: 'errors' },
  { id: 'notes', route: '/notes', icon: 'document-text-outline',
    labelKey: 'nav.notes', group: 'practice', quick: true, quickOrder: 19 },
  { id: 'evaluation', route: '/evaluation', icon: 'trophy-outline',
    labelKey: 'sc.eval', group: 'practice', quick: true, quickOrder: 12 },
  // L'accès rapide illustre la dictée par une oreille — c'est l'écoute qui
  // fait l'exercice — quand le menu montre un crayon. Divergence conservée.
  { id: 'dictee', route: '/dictee', icon: 'pencil-outline', quickIcon: 'ear-outline',
    labelKey: 'sc.dictation', group: 'practice', quick: true, quickOrder: 15 },
  { id: 'minijeux', route: '/minijeux', icon: 'game-controller-outline',
    labelKey: 'sc.minigames', group: 'practice', quick: true, quickOrder: 7 },

  // ── Lecture et dictionnaire ──────────────────────────────────────────────
  { id: 'lectures', route: '/lectures', icon: 'reader-outline',
    labelKey: 'sc.readings', navLabelKey: 'nav.reading', group: 'readingDict', quick: true, quickOrder: 5,
    railOrder: 7, railBand: 'practise' },
  { id: 'dico', route: '/dictionnaire', icon: 'search-outline',
    labelKey: 'sc.dico', group: 'readingDict', quick: true, quickOrder: 9,
    railOrder: 10, railBand: 'lookup' },
  { id: 'grammaire', route: '/grammaire', icon: 'school-outline',
    labelKey: 'sc.grammar', group: 'readingDict', quick: true, quickOrder: 10,
    railOrder: 11, railBand: 'lookup' },

  // ── Communauté ───────────────────────────────────────────────────────────
  { id: 'dm', route: '/dm', icon: 'mail-outline',
    labelKey: 'nav.messages', group: 'community', quick: true, quickOrder: 20 },
  { id: 'classement', route: '/classement', icon: 'podium-outline',
    labelKey: 'sc.ranking', group: 'community', quick: true, quickOrder: 13 },
  { id: 'collection', route: '/collection', icon: 'ribbon-outline',
    labelKey: 'sc.collection', navLabelKey: 'nav.collection', group: 'community', quick: true, quickOrder: 6 },

  // ── Actualités et retours ────────────────────────────────────────────────
  { id: 'avis', route: '/avis', icon: 'star-outline',
    labelKey: 'nav.reviews', group: 'news', quick: true, quickOrder: 21 },
];

/** Écrans d'une section du menu « Plus ». */
export const screensInGroup = (group: ScreenGroup) => SCREENS.filter(s => s.group === group);

/**
 * Entrées du rail latéral, dans l'ordre.
 *
 * Le rail se lisait depuis une liste écrite en dur dans `_layout.tsx`, qui
 * avait déjà divergé du catalogue : Collection y figurait, Dialogues et le
 * simulateur HSK n'y étaient pas, et le sigle « HSK » ne s'y affichait pas.
 * Une seule source, donc, comme pour l'accès rapide.
 */
export const railScreens = (): ScreenEntry[] =>
  SCREENS.filter(s => s.railOrder != null)
         .sort((a, b) => (a.railOrder ?? 99) - (b.railOrder ?? 99));

/**
 * Écrans de l'accès rapide, dans l'ordre par défaut.
 *
 * Cet ordre ne s'applique qu'aux nouveaux comptes : l'accueil réconcilie ce
 * qu'il trouve sur l'appareil avec cette liste, en conservant l'agencement
 * choisi par l'utilisateur et en ajoutant à la fin les écrans qu'il ne
 * connaissait pas encore.
 */
export const QUICK_SCREENS = SCREENS
  .filter(s => s.quick)
  .sort((a, b) => (a.quickOrder ?? Infinity) - (b.quickOrder ?? Infinity));
