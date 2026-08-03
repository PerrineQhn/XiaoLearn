/**
 * CardShimmer — scintillement réservé aux cartes de rareté élevée.
 *
 * Trois couches, activées progressivement selon la rareté :
 *   • holo    — voile arc-en-ciel qui dérive lentement, et suit l'inclinaison
 *               quand la carte est enveloppée dans <Card3D>.
 *   • sparks  — étincelles qui s'allument et s'éteignent en décalé.
 *   • sweep   — bande lumineuse qui traverse la carte par intermittence.
 *
 * Uniquement opacité et transform : tout tourne sur le driver natif, donc
 * aucune de ces animations ne passe par le pont JS.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, AccessibilityInfo, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTilt } from '@/components/Card3D';
import type { CardRarity } from '@/data/cards';

/**
 * Dosage par rareté. `holo` est une opacité, `sparks` un nombre d'étincelles.
 *
 * Volontairement discret : les illustrations sont déjà très dorées et pleines
 * de reflets. Un voile trop marqué les rend laiteuses au lieu de les faire
 * briller — l'effet doit se remarquer au mouvement, pas à l'arrêt.
 */
const CONFIG: Record<CardRarity, { holo: number; sparks: number; sweep: boolean }> = {
  common:    { holo: 0,    sparks: 0, sweep: false },
  rare:      { holo: 0.06, sparks: 3, sweep: false },
  epic:      { holo: 0.11, sparks: 5, sweep: false },
  legendary: { holo: 0.16, sparks: 7, sweep: true  },
};

const HOLO_COLORS = [
  'rgba(255,255,255,0)',
  'rgba(255,138,196,0.95)',
  'rgba(255,214,120,0.85)',
  'rgba(126,232,255,0.95)',
  'rgba(186,148,255,0.90)',
  'rgba(255,255,255,0)',
] as const;

/** Générateur pseudo-aléatoire déterministe : la même carte scintille toujours pareil. */
function seededRandom(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

export function CardShimmer({
  rarity,
  cardId,
  size = 'grid',
  radius = 14,
}: {
  rarity: CardRarity;
  /** Sert de graine : les étincelles sont placées de façon stable par carte. */
  cardId: string;
  size?: 'grid' | 'detail';
  radius?: number;
}) {
  const isDetail = size === 'detail';
  const cfg = CONFIG[rarity];

  // Respecte le réglage système « Réduire les animations »
  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    let alive = true;
    AccessibilityInfo.isReduceMotionEnabled().then(v => { if (alive) setReduceMotion(v); });
    const sub = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduceMotion);
    return () => { alive = false; sub?.remove(); };
  }, []);

  const [width, setWidth] = useState(isDetail ? 200 : 80);

  // En grille les cartes sont petites et nombreuses : on allège.
  const sparkCount = isDetail ? cfg.sparks : Math.ceil(cfg.sparks / 2);

  const sparks = useMemo(() => {
    const rnd = seededRandom(cardId);
    return Array.from({ length: sparkCount }, () => ({
      left: 8 + rnd() * 84,        // %
      top: 6 + rnd() * 74,         // %
      size: (isDetail ? 7 : 5) + rnd() * (isDetail ? 7 : 4),
      delay: rnd() * 2600,
      gap: 1400 + rnd() * 2200,
    }));
  }, [cardId, sparkCount, isDetail]);

  const drift = useRef(new Animated.Value(0)).current;
  const sweep = useRef(new Animated.Value(0)).current;
  const tilt = useTilt();

  useEffect(() => {
    if (reduceMotion || cfg.holo === 0) return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(drift, { toValue: 1, duration: 4200, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(drift, { toValue: 0, duration: 4200, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [reduceMotion, cfg.holo]);

  useEffect(() => {
    if (reduceMotion || !cfg.sweep) return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(sweep, { toValue: 1, duration: 1150, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
        Animated.delay(3400),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [reduceMotion, cfg.sweep]);

  if (cfg.holo === 0 && sparkCount === 0) return null;

  // Dérive lente + inclinaison du doigt : les deux se cumulent.
  const driftX = drift.interpolate({ inputRange: [0, 1], outputRange: [-26, 26] });
  const holoX = tilt
    ? Animated.add(driftX, tilt.tx.interpolate({ inputRange: [-1, 1], outputRange: [70, -70] }))
    : driftX;

  return (
    <View
      pointerEvents="none"
      style={[StyleSheet.absoluteFillObject, { borderRadius: radius, overflow: 'hidden' }]}
      onLayout={e => setWidth(e.nativeEvent.layout.width)}
    >
      {/* Voile holographique */}
      {cfg.holo > 0 && (
        <Animated.View
          style={[s.holoWrap, { opacity: cfg.holo, transform: [{ translateX: holoX }] }]}
        >
          <LinearGradient
            colors={HOLO_COLORS as unknown as [string, string]}
            locations={[0, 0.2, 0.4, 0.6, 0.8, 1]}
            start={{ x: 0, y: 0.15 }}
            end={{ x: 1, y: 0.85 }}
            style={StyleSheet.absoluteFillObject}
          />
        </Animated.View>
      )}

      {/* Étincelles */}
      {sparks.map((sp, i) => (
        <Spark key={i} {...sp} still={reduceMotion} />
      ))}

      {/* Balayage lumineux — légendaires uniquement */}
      {cfg.sweep && !reduceMotion && (
        <Animated.View
          style={[
            s.sweep,
            {
              opacity: sweep.interpolate({ inputRange: [0, 0.2, 0.8, 1], outputRange: [0, 0.75, 0.75, 0] }),
              transform: [
                { translateX: sweep.interpolate({ inputRange: [0, 1], outputRange: [-width, width * 1.6] }) },
                { rotate: '18deg' },
              ],
            },
          ]}
        >
          <LinearGradient
            colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.75)', 'rgba(255,255,255,0)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFillObject}
          />
        </Animated.View>
      )}
    </View>
  );
}

/** Une étincelle : deux barres croisées qui grossissent en s'allumant. */
function Spark({
  left, top, size, delay, gap, still,
}: {
  left: number; top: number; size: number; delay: number; gap: number; still: boolean;
}) {
  const v = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (still) { v.setValue(0.45); return; }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(v, { toValue: 1, duration: 620, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        Animated.timing(v, { toValue: 0, duration: 700, easing: Easing.in(Easing.quad), useNativeDriver: true }),
        Animated.delay(gap),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [delay, gap, still]);

  const scale = v.interpolate({ inputRange: [0, 1], outputRange: [0.35, 1] });
  const bar = { backgroundColor: '#FFF', borderRadius: size, position: 'absolute' as const };

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: `${left}%`,
        top: `${top}%`,
        width: size,
        height: size,
        opacity: v,
        transform: [{ scale }],
      }}
    >
      <View style={[bar, { left: size / 2 - size * 0.09, top: 0, width: size * 0.18, height: size }]} />
      <View style={[bar, { top: size / 2 - size * 0.09, left: 0, height: size * 0.18, width: size }]} />
    </Animated.View>
  );
}

const s = StyleSheet.create({
  // Surdimensionné : le voile doit pouvoir glisser sans découvrir de bord.
  holoWrap: { position: 'absolute', top: 0, bottom: 0, left: -90, right: -90 },
  sweep: { position: 'absolute', top: -40, bottom: -40, width: 46 },
});
