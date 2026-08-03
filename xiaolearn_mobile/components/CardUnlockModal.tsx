/**
 * CardUnlockModal — célébration à l'obtention d'une ou plusieurs cartes.
 * S'empile : on fait défiler les cartes une à une.
 */
import { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Modal, Pressable, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme } from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';
import { useI18n } from '@/contexts/LanguageContext';
import { CardArt } from '@/components/CardArt';
import { Card3D } from '@/components/Card3D';
import { RARITY_META, type CollectibleCard } from '@/data/cards';

export function CardUnlockModal({
  cards, onDone,
}: {
  cards: CollectibleCard[];
  onDone: () => void;
}) {
  const scheme = useColorScheme();
  const c = Colors[scheme];
  const { t, pick } = useI18n();
  const [idx, setIdx] = useState(0);

  const scale = useRef(new Animated.Value(0.7)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const shine = useRef(new Animated.Value(0)).current;

  const card = cards[idx];

  useEffect(() => {
    scale.setValue(0.7); opacity.setValue(0); shine.setValue(0);
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, friction: 6, tension: 70, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 220, useNativeDriver: true }),
      Animated.timing(shine, { toValue: 1, duration: 900, easing: Easing.out(Easing.quad), useNativeDriver: true }),
    ]).start();
  }, [idx]);

  if (!card) return null;
  const meta = RARITY_META[card.rarity];

  function next() {
    if (idx + 1 < cards.length) setIdx(idx + 1);
    else onDone();
  }

  return (
    <Modal visible transparent animationType="fade" onRequestClose={next}>
      <Pressable style={s.backdrop} onPress={next}>
        {/* Panneau : il englobe tout le contenu, du bandeau au « appuie pour
            continuer ». Avant, le rectangle visible n'était que le halo de la
            carte, d'où l'impression d'un bloc qui s'arrêtait en cours de route. */}
        <Animated.View
          style={[
            s.sheet,
            { opacity, transform: [{ scale }], borderColor: meta.glow + '22' },
          ]}
        >
          <LinearGradient
            colors={[meta.glow + '1F', meta.glow + '08', 'transparent']}
            style={StyleSheet.absoluteFill}
            pointerEvents="none"
          />
          {/* Titre */}
          <View style={[s.pill, { backgroundColor: meta.color }]}>
            <Ionicons name="sparkles" size={14} color="#FFF" />
            <Text style={s.pillTxt}>
              {cards.length > 1 && idx === 0
                ? t('cards2.newCards', { n: cards.length })
                : t('cards2.newCard')}
            </Text>
          </View>

          {/* Halo + carte */}
          <View>
            <Animated.View
              style={[
                s.halo,
                {
                  backgroundColor: meta.glow,
                  opacity: shine.interpolate({ inputRange: [0, 1], outputRange: [0.5, 0.22] }),
                  // Resserré : au-delà, le halo débordait du panneau et se
                  // lisait comme un second rectangle mal aligné.
                  transform: [{ scale: shine.interpolate({ inputRange: [0, 1], outputRange: [0.92, 1.12] }) }],
                },
              ]}
            />
            <Card3D
              style={{ width: 210 }}
              intensity={card.rarity === 'legendary' ? 2 : card.rarity === 'epic' ? 1.5 : 1}
              onTap={next}
            >
              <CardArt card={card} unlocked size="detail" />
            </Card3D>
          </View>

          <Text style={s.name}>{pick(card.nameFr, card.nameEn)}</Text>
          <Text style={s.lore} numberOfLines={4}>{pick(card.loreFr, card.loreEn)}</Text>

          <View style={s.xp}>
            <Ionicons name="flash" size={14} color="#F9A825" />
            <Text style={s.xpTxt}>{t('cards2.reward', { n: card.xpReward })}</Text>
          </View>

          <Text style={s.hint}>
            {cards.length > 1 ? `${idx + 1}/${cards.length} · ` : ''}{t('cards2.tapToContinue')}
          </Text>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}

const s = StyleSheet.create({
  backdrop: {
    flex: 1, backgroundColor: 'rgba(8,10,14,0.88)',
    alignItems: 'center', justifyContent: 'center', padding: 24,
  },
  sheet: {
    alignItems: 'center', gap: 14,
    alignSelf: 'stretch', maxWidth: 380,
    paddingHorizontal: 20, paddingTop: 20, paddingBottom: 22,
    borderRadius: 28, borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(18,20,26,0.72)',
    overflow: 'hidden',
  },
  pill: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20,
  },
  pillTxt: { color: '#FFF', fontSize: 14, fontWeight: '800' },
  halo: {
    position: 'absolute', top: -18, left: -18, right: -18, bottom: -18,
    borderRadius: 40,
  },
  name: { color: '#FFF', fontSize: 22, fontWeight: '800', textAlign: 'center' },
  lore: {
    color: 'rgba(255,255,255,0.82)', fontSize: 13.5, lineHeight: 20,
    textAlign: 'center', fontStyle: 'italic', maxWidth: 320,
  },
  xp: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: 'rgba(249,168,37,0.18)', borderRadius: 20,
    paddingHorizontal: 12, paddingVertical: 5,
  },
  xpTxt: { color: '#F9A825', fontSize: 13, fontWeight: '800' },
  hint: { color: 'rgba(255,255,255,0.55)', fontSize: 12, marginTop: 2 },
});
