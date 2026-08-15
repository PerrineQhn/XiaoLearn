/**
 * CatalogIcon — l'icône d'une entrée du catalogue d'écrans.
 *
 * Presque toutes les entrées portent un Ionicon ; quelques-unes sont mieux
 * servies par un SIGLE (le simulateur HSK affiche « HSK » — aucun ruban ne
 * dit « examen de chinois » aussi clairement que ces trois lettres). Le
 * catalogue est rendu à cinq endroits (accès rapide, menu Plus, rail,
 * explorateur, tâches du jour) : centraliser le choix texte/icône ici évite
 * cinq conditions dupliquées, et garantit qu'un futur sigle s'affichera
 * partout d'un coup.
 */
import { Text, type StyleProp, type TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function CatalogIcon({ entry, size, color, style }: {
  entry: { icon: any; iconText?: string };
  size: number;
  color: string;
  style?: StyleProp<TextStyle>;
}) {
  if (entry.iconText) {
    return (
      <Text
        style={[{
          // Trois lettres dans l'empreinte carrée d'un glyphe : la taille
          // de police vaut ~40 % de celle d'un Ionicon équivalent.
          fontSize: Math.round(size * 0.42),
          lineHeight: size,
          fontWeight: '900',
          letterSpacing: 0.4,
          color,
          textAlign: 'center',
          minWidth: size,
        }, style]}
        numberOfLines={1}
        allowFontScaling={false}
      >
        {entry.iconText}
      </Text>
    );
  }
  return <Ionicons name={entry.icon} size={size} color={color} style={style} />;
}
