/**
 * Largeur de lecture sur grand écran.
 *
 * ## Ce que ce composant fait — et ne fait plus
 *
 * Une première version bornait TOUT le contenu à 560 points et centrait le
 * reste : l'application occupait alors une colonne étroite au milieu d'un iPad,
 * avec de larges bandes vides de part et d'autre. C'était trop prudent. Un
 * tableau de bord fait de cartes, de grilles et de boutons gagne à s'étaler ;
 * ce sont les paragraphes qui souffrent d'une largeur excessive, pas les
 * cartes.
 *
 * Le cadrage global a donc été retiré. Il ne subsiste qu'ici, sous forme d'un
 * style à appliquer aux écrans réellement chargés en texte — leçon, lecture,
 * fiche de grammaire — où une ligne de 1 000 points ferait perdre sa ligne à
 * l'œil au retour à la ligne.
 *
 * ## Le seuil
 *
 * 760 points correspond à environ 90 caractères dans la taille de corps de
 * l'application : au-delà, la lecture suivie se dégrade nettement. En dessous
 * du seuil — tous les téléphones — la contrainte ne s'applique pas.
 */
import { StyleSheet } from 'react-native';
// Le seuil vit dans le hook de mise en page : deux définitions finiraient par
// diverger, et c'est exactement ce genre d'écart qui a fait déborder la grille
// de paires minimales.
import { READABLE_WIDTH } from '@/hooks/useLayout';

export { READABLE_WIDTH };

/**
 * À étaler dans le `contentContainerStyle` d'un ScrollView de lecture.
 *
 * `width: '100%'` conserve le comportement téléphone, `maxWidth` ne mord que
 * sur les grands écrans, et `alignSelf` centre la colonne dans l'espace
 * disponible.
 */
export const readableContent = StyleSheet.create({
  bloc: { width: '100%', maxWidth: READABLE_WIDTH, alignSelf: 'center' },
}).bloc;
