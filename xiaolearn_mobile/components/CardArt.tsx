/**
 * CardArt — rendu visuel d'une carte.
 *
 * Si une illustration existe dans assets/cards/<id>.jpg elle est affichée ;
 * sinon un rendu de repli soigné (emblème + dégradé de rareté) prend le relais,
 * ce qui permet d'ajouter les images au fur et à mesure.
 *
 * L'illustration porte déjà son cadre, son bandeau de nom et le cartouche du
 * logo : quand elle est là, on ne superpose ni pastille de nom ni liseré.
 */
import { View, Text, Image, StyleSheet, type ImageSourcePropType } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { CardShimmer } from '@/components/CardShimmer';
import { RARITY_META, type CollectibleCard } from '@/data/cards';

/**
 * Illustrations disponibles. `require` doit être statique en React Native :
 * ajoute simplement une ligne quand tu déposes une image.
 *   'review_first_session': require('@/assets/cards/review_first_session.jpg'),
 */
export const CARD_IMAGES: Record<string, ImageSourcePropType> = {
  'review_first_session': require('@/assets/cards/review_first_session.jpg'),
  'review_ten_sessions': require('@/assets/cards/review_ten_sessions.jpg'),
  'review_hundred_cards': require('@/assets/cards/review_hundred_cards.jpg'),
  'review_fifty_mastered': require('@/assets/cards/review_fifty_mastered.jpg'),
  'review_three_hundred_mastered': require('@/assets/cards/review_three_hundred_mastered.jpg'),
  'level_first_bilan': require('@/assets/cards/level_first_bilan.jpg'),
  'level_three_bilans': require('@/assets/cards/level_three_bilans.jpg'),
  'level_perfect_bilan': require('@/assets/cards/level_perfect_bilan.jpg'),
  'level_six_bilans': require('@/assets/cards/level_six_bilans.jpg'),
  'lesson_first': require('@/assets/cards/lesson_first.jpg'),
  'lesson_ten': require('@/assets/cards/lesson_ten.jpg'),
  'lesson_fifty': require('@/assets/cards/lesson_fifty.jpg'),
  'lesson_a1_complete': require('@/assets/cards/lesson_a1_complete.jpg'),
  'streak_three': require('@/assets/cards/streak_three.jpg'),
  'streak_seven': require('@/assets/cards/streak_seven.jpg'),
  'streak_thirty': require('@/assets/cards/streak_thirty.jpg'),
  'streak_hundred': require('@/assets/cards/streak_hundred.jpg'),
  'special_xp_1000': require('@/assets/cards/special_xp_1000.jpg'),
  'special_xp_10000': require('@/assets/cards/special_xp_10000.jpg'),
  'special_games': require('@/assets/cards/special_games.jpg'),
  'special_readings': require('@/assets/cards/special_readings.jpg'),
  'special_pronunciation': require('@/assets/cards/special_pronunciation.jpg'),
  'avatar_halfway': require('@/assets/cards/avatar_halfway.jpg'),
  'avatar_shifu': require('@/assets/cards/avatar_shifu.jpg'),
};

/** Silhouettes désaturées, affichées tant que la carte n'est pas obtenue. */
export const CARD_IMAGES_LOCKED: Record<string, ImageSourcePropType> = {
  review_first_session: require('@/assets/cards/locked/review_first_session.jpg'),
  review_ten_sessions: require('@/assets/cards/locked/review_ten_sessions.jpg'),
  review_hundred_cards: require('@/assets/cards/locked/review_hundred_cards.jpg'),
  review_fifty_mastered: require('@/assets/cards/locked/review_fifty_mastered.jpg'),
  review_three_hundred_mastered: require('@/assets/cards/locked/review_three_hundred_mastered.jpg'),
  level_first_bilan: require('@/assets/cards/locked/level_first_bilan.jpg'),
  level_three_bilans: require('@/assets/cards/locked/level_three_bilans.jpg'),
  level_perfect_bilan: require('@/assets/cards/locked/level_perfect_bilan.jpg'),
  level_six_bilans: require('@/assets/cards/locked/level_six_bilans.jpg'),
  lesson_first: require('@/assets/cards/locked/lesson_first.jpg'),
  lesson_ten: require('@/assets/cards/locked/lesson_ten.jpg'),
  lesson_fifty: require('@/assets/cards/locked/lesson_fifty.jpg'),
  lesson_a1_complete: require('@/assets/cards/locked/lesson_a1_complete.jpg'),
  streak_three: require('@/assets/cards/locked/streak_three.jpg'),
  streak_seven: require('@/assets/cards/locked/streak_seven.jpg'),
  streak_thirty: require('@/assets/cards/locked/streak_thirty.jpg'),
  streak_hundred: require('@/assets/cards/locked/streak_hundred.jpg'),
  special_xp_1000: require('@/assets/cards/locked/special_xp_1000.jpg'),
  special_xp_10000: require('@/assets/cards/locked/special_xp_10000.jpg'),
  special_games: require('@/assets/cards/locked/special_games.jpg'),
  special_readings: require('@/assets/cards/locked/special_readings.jpg'),
  special_pronunciation: require('@/assets/cards/locked/special_pronunciation.jpg'),
  avatar_halfway: require('@/assets/cards/locked/avatar_halfway.jpg'),
  avatar_shifu: require('@/assets/cards/locked/avatar_shifu.jpg'),
};

export function CardArt({
  card, unlocked, size = 'grid', shimmer = true,
}: {
  card: CollectibleCard;
  unlocked: boolean;
  size?: 'grid' | 'detail';
  /** Scintillement des raretés élevées — coupable si besoin (aperçus, captures). */
  shimmer?: boolean;
}) {
  const meta = RARITY_META[card.rarity];
  const isDetail = size === 'detail';
  // Verrouillée : silhouette désaturée plutôt que l'illustration assombrie.
  // On voit ce qu'on cherche à obtenir, ce qui donne envie de l'obtenir.
  const img = unlocked ? CARD_IMAGES[card.id] : (CARD_IMAGES_LOCKED[card.id] ?? CARD_IMAGES[card.id]);

  return (
    <View style={[s.frame, isDetail && s.frameDetail, { borderColor: unlocked ? meta.color : '#00000022' }]}>
      {img ? (
        // width/height explicites : sans elles, l'Image conserve sa taille
        // intrinsèque (900 px) et l'on ne voit qu'un coin de l'illustration.
        <Image source={img} style={s.fill} resizeMode="cover" />
      ) : (
        <LinearGradient
          colors={(unlocked ? meta.gradient : ['#9AA5AD', '#6E7B84']) as unknown as [string, string]}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFillObject}
        />
      )}

      {/* Scintillement — au-dessus de l'illustration, sous le texte */}
      {unlocked && shimmer && (
        <CardShimmer
          rarity={card.rarity}
          cardId={card.id}
          size={size}
          radius={isDetail ? 20 : 14}
        />
      )}

      {/* Verrouillée : sur une silhouette, un voile léger suffit — l'image est
          déjà désaturée, l'assombrir davantage masquerait la créature. */}
      {!unlocked && (
        <View
          style={[
            StyleSheet.absoluteFillObject,
            s.lockVeil,
            { backgroundColor: img ? 'rgba(20,24,28,0.14)' : 'rgba(20,24,28,0.42)' },
          ]}
        >
          <View style={[s.lockBadge, isDetail && s.lockBadgeDetail]}>
            <Ionicons name="lock-closed" size={isDetail ? 26 : 15} color="rgba(255,255,255,0.95)" />
          </View>
        </View>
      )}

      {/* Rendu de repli : l'emblème et le nom ne servent que sans illustration,
          celle-ci portant déjà son propre bandeau. */}
      {unlocked && !img && (
        <View style={s.inner}>
          <Text style={[s.emoji, isDetail && s.emojiDetail]}>{card.emoji}</Text>
          <View style={s.nameplate}>
            <Text style={[s.hanzi, isDetail && s.hanziDetail]} numberOfLines={1}>{card.hanzi}</Text>
            {isDetail && <Text style={s.pinyin}>{card.pinyin}</Text>}
          </View>
        </View>
      )}

      {/* Liseré de rareté — inutile sur une illustration, dont il trancherait
          le cadre doré : la bordure colorée du cadre suffit à situer la rareté. */}
      {!img && (
        <View style={[s.rarityStrip, { backgroundColor: unlocked ? meta.color : '#7A868E' }]} />
      )}
    </View>
  );
}

const s = StyleSheet.create({
  frame: {
    // Exactement le rapport des illustrations (900×1342) : le `cover` ne rogne
    // donc rien, et le cartouche du logo reste entier tout en bas.
    aspectRatio: 900 / 1342,
    borderRadius: 14,
    borderWidth: 2,
    overflow: 'hidden',
    backgroundColor: '#5C6B73',
    justifyContent: 'flex-end',
  },
  frameDetail: { borderRadius: 20, borderWidth: 3 },
  fill: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' },
  lockVeil: { alignItems: 'center', justifyContent: 'center' },
  lockBadge: {
    width: 30, height: 30, borderRadius: 15,
    backgroundColor: 'rgba(18,22,26,0.62)',
    alignItems: 'center', justifyContent: 'center',
  },
  lockBadgeDetail: { width: 52, height: 52, borderRadius: 26 },
  inner: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 8 },
  emoji: { fontSize: 40, textAlign: 'center' },
  emojiDetail: { fontSize: 96 },
  nameplate: {
    position: 'absolute', bottom: 8, left: 6, right: 6,
    backgroundColor: 'rgba(0,0,0,0.42)',
    borderRadius: 8, paddingVertical: 4, paddingHorizontal: 6,
    alignItems: 'center',
  },
  hanzi: { color: '#FFF', fontSize: 15, fontWeight: '800', letterSpacing: 1 },
  hanziDetail: { fontSize: 30 },
  pinyin: { color: 'rgba(255,255,255,0.85)', fontSize: 13, fontStyle: 'italic', marginTop: 2 },
  rarityStrip: { position: 'absolute', top: 0, left: 0, right: 0, height: 4 },
});
