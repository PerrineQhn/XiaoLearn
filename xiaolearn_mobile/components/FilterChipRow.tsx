/**
 * FilterChipRow — la rangée de filtres par niveau ou par catégorie.
 *
 * Trois écrans affichent la même rangée de pastilles au-dessus d'une liste :
 * Collection, Lectures, Dialogues. Tous les trois y ont attrapé le même défaut
 * d'affichage, et le corriger trois fois séparément n'aurait fait que déplacer
 * le problème vers le quatrième écran à venir. Le voici donc une seule fois.
 *
 * ## Le défaut : une rangée écrasée par sa voisine
 *
 * La liste placée en dessous n'a souvent pas de `flex` : elle se dimensionne
 * alors sur son contenu, déborde de la colonne, et Yoga compresse ses frères
 * pour rentrer. La rangée de filtres, seul frère compressible, encaisse tout —
 * les pastilles perdent quelques points de hauteur et se font rogner les
 * jambages. Le symptôme est trompeur : la rangée s'affiche correctement dès
 * qu'un filtre réduit la liste, et se rogne à nouveau sur « Tous ».
 *
 * D'où les deux moitiés du correctif, indissociables :
 *
 *   - ici, `flexShrink: 0` — la rangée ne se laisse plus comprimer ;
 *   - sur la liste voisine, `flex: 1` — elle ne déborde plus.
 *
 * La hauteur explicite reste nécessaire par-dessus : sans elle, une ScrollView
 * horizontale se réduit à la hauteur de police.
 *
 * ## Sur tablette, pas de défilement
 *
 * Les filtres tiennent dans la largeur. Un défilement horizontal y cacherait
 * des niveaux derrière un geste que rien ne signale, alors que la place ne
 * manque pas — ils passent donc à la ligne.
 */
import type { ReactNode } from 'react';
import { View, ScrollView } from 'react-native';
import { useLayout } from '@/hooks/useLayout';

export function FilterChipRow({
  children,
  gutter,
  height = 44,
  marginTop = 12,
  marginBottom = 0,
}: {
  children: ReactNode;
  /** Marge latérale de l'écran, pour aligner les pastilles sur le contenu. */
  gutter: number;
  /** Hauteur de la rangée sur téléphone — à ajuster si les pastilles sont hautes. */
  height?: number;
  marginTop?: number;
  /** À poser sur la DERNIÈRE rangée quand la liste en dessous colle trop. */
  marginBottom?: number;
}) {
  const { tablet } = useLayout();

  if (tablet) {
    return (
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 8,
          marginTop,
          marginBottom,
          paddingHorizontal: gutter,
        }}
      >
        {children}
      </View>
    );
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ flexGrow: 0, flexShrink: 0, height, marginTop, marginBottom }}
      contentContainerStyle={{
        paddingHorizontal: gutter,
        gap: 8,
        paddingVertical: 3,
        alignItems: 'center',
      }}
    >
      {children}
    </ScrollView>
  );
}
