/**
 * useLayout — une seule source de vérité pour la mise en page selon la largeur.
 *
 * ## Pourquoi centraliser
 *
 * Chaque écran recalculait sa propre notion de « grand écran » : `width >= 768`
 * ici, `maxWidth: 680` là, `numColumns` ailleurs, et `paddingHorizontal: 16`
 * codé en dur dans la moitié des cas. Trois conséquences : des marges qui ne
 * concordent pas d'un écran à l'autre, des seuils qui divergent au fil des
 * modifications, et au moins un bug réel — la grille de paires minimales de
 * `lesson.tsx` calcule sa largeur sur l'écran entier alors que son conteneur
 * est borné à 760 pt, donc elle déborde sur tablette.
 *
 * ## Les paliers
 *
 *   compact  < 700   téléphones, y compris en paysage
 *   moyen    < 1000  tablette en portrait, Split View large
 *   large    ≥ 1000  tablette en paysage — seul palier où deux colonnes
 *                    de contenu tiennent sans serrer
 *
 * Le seuil haut est à 1 000 pt et non 1 024 : un iPad 11" en paysage fait
 * 1 194 pt, un 10,2" en fait 1 080, et Split View à deux tiers descend vers
 * 1 000. Placer la limite juste en dessous évite qu'un mode d'affichage
 * courant bascule au mauvais moment.
 *
 * ## Ce que ça ne fait pas
 *
 * Rien n'est imposé : le hook renvoie des mesures, chaque écran décide. Un
 * écran de lecture continue de borner sa colonne à `READABLE_WIDTH` même en
 * `large`, parce que le confort de lecture ne dépend pas de la place
 * disponible.
 */
import { useWindowDimensions } from 'react-native';

/** Largeur maximale confortable pour du texte suivi, en points. */
export const READABLE_WIDTH = 760;

/** Au-delà, deux colonnes de contenu tiennent côte à côte. */
export const WIDE_BREAKPOINT = 1000;
/** En deçà, on est sur un téléphone : aucune adaptation. */
export const COMPACT_BREAKPOINT = 700;

export interface Layout {
  /** Largeur utile de la fenêtre, en points. */
  width: number;
  height: number;
  /** Téléphone : mise en page d'origine, sans adaptation. */
  compact: boolean;
  /** Tablette, toutes orientations. */
  tablet: boolean;
  /** Assez large pour deux colonnes de contenu. */
  wide: boolean;
  /** Marge latérale de l'écran, harmonisée entre tous les écrans. */
  gutter: number;
  /** Écart entre les éléments d'une grille. */
  gap: number;
  /**
   * Nombre de colonnes pour une grille dont les éléments font au moins
   * `minItemWidth` points de large.
   *
   * Raisonner en largeur minimale d'élément plutôt qu'en nombre de colonnes
   * fixe évite les vignettes démesurées : une carte à collectionner reste à sa
   * taille, quel qu'en soit le nombre par rangée.
   */
  columns: (minItemWidth: number, max?: number) => number;
  /** Largeur d'un élément dans une grille de `n` colonnes, marges déduites. */
  itemWidth: (n: number, available?: number) => number;
}

export function useLayout(): Layout {
  const { width, height } = useWindowDimensions();

  const compact = width < COMPACT_BREAKPOINT;
  const wide = width >= WIDE_BREAKPOINT;
  const gutter = compact ? 16 : 24;
  const gap = compact ? 10 : 14;

  const columns = (minItemWidth: number, max = 8): number => {
    const usable = width - gutter * 2;
    // `+ gap` des deux côtés : n éléments comptent n−1 écarts, l'ajouter au
    // numérateur et au dénominateur revient au même sans cas particulier.
    const n = Math.floor((usable + gap) / (minItemWidth + gap));
    return Math.max(1, Math.min(max, n));
  };

  const itemWidth = (n: number, available = width - gutter * 2): number =>
    (available - gap * (n - 1)) / n;

  return {
    width, height,
    compact,
    tablet: !compact,
    wide,
    gutter, gap,
    columns, itemWidth,
  };
}
