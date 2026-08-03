/**
 * Card3D — enveloppe une carte pour lui donner un relief façon carte à collectionner.
 *
 * L'utilisateur pose le doigt sur la carte et la penche : perspective réelle
 * (rotateX / rotateY), reflet spéculaire qui balaie la surface, et léger
 * agrandissement. Relâchement = retour élastique à plat.
 *
 * Uniquement l'API Animated de React Native — aucune dépendance supplémentaire,
 * et tout tourne sur le driver natif (60 fps, pas de passage par le pont JS).
 */
import { createContext, useContext, useMemo, useRef } from 'react';
import { Animated, PanResponder, StyleSheet, type ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const MAX_TILT = 14;      // degrés d'inclinaison maximale
const PERSPECTIVE = 900;  // plus la valeur est basse, plus l'effet est prononcé

/**
 * Expose l'inclinaison courante aux enfants, pour que les effets qui doivent
 * réagir à la lumière (voir CardShimmer) suivent le mouvement du doigt.
 * Vaut `null` hors d'un <Card3D> — les effets se rabattent alors sur leur
 * animation d'ambiance.
 */
const TiltContext = createContext<{ tx: Animated.Value; ty: Animated.Value } | null>(null);

export function useTilt() {
  return useContext(TiltContext);
}

export function Card3D({
  children,
  style,
  enabled = true,
  /** Reflet plus marqué pour les raretés élevées */
  intensity = 1,
  /** Déclenché si le geste était un simple tap (et non une inclinaison) */
  onTap,
  /** Signale le début/fin d'interaction — permet au parent de geler son défilement */
  onActive,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
  enabled?: boolean;
  intensity?: number;
  onTap?: () => void;
  onActive?: (active: boolean) => void;
}) {
  // -1 → +1 sur chaque axe
  const tx = useRef(new Animated.Value(0)).current;
  const ty = useRef(new Animated.Value(0)).current;
  const press = useRef(new Animated.Value(0)).current;

  function settle(toX: number, toY: number, toPress: number) {
    Animated.parallel([
      Animated.spring(tx, { toValue: toX, useNativeDriver: true, friction: 6, tension: 60 }),
      Animated.spring(ty, { toValue: toY, useNativeDriver: true, friction: 6, tension: 60 }),
      Animated.spring(press, { toValue: toPress, useNativeDriver: true, friction: 7, tension: 80 }),
    ]).start();
  }

  const gesture = useRef({ moved: 0, startedAt: 0 });

  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => enabled,
      onMoveShouldSetPanResponder: () => enabled,
      // Le doigt est sur la carte : le geste lui appartient. Sans ces deux
      // refus, la ScrollView parente confisquait le mouvement et la fiche
      // défilait au lieu d'incliner la carte.
      onPanResponderTerminationRequest: () => false,
      onShouldBlockNativeResponder: () => true,
      onPanResponderGrant: e => {
        gesture.current = { moved: 0, startedAt: Date.now() };
        onActiveRef.current?.(true);
        track(e.nativeEvent.locationX, e.nativeEvent.locationY);
        Animated.spring(press, { toValue: 1, useNativeDriver: true, friction: 7 }).start();
      },
      onPanResponderMove: (e, g) => {
        gesture.current.moved = Math.max(gesture.current.moved, Math.abs(g.dx) + Math.abs(g.dy));
        track(e.nativeEvent.locationX, e.nativeEvent.locationY);
      },
      onPanResponderRelease: () => {
        settle(0, 0, 0);
        onActiveRef.current?.(false);
        const { moved, startedAt } = gesture.current;
        // Peu de déplacement + geste court = l'utilisateur voulait taper
        if (onTapRef.current && moved < 10 && Date.now() - startedAt < 300) {
          onTapRef.current();
        }
      },
      onPanResponderTerminate: () => {
        settle(0, 0, 0);
        onActiveRef.current?.(false);
      },
    })
  ).current;

  // Refs pour que le PanResponder (figé à la création) voie toujours les callbacks courants
  const onTapRef = useRef(onTap);
  onTapRef.current = onTap;
  const onActiveRef = useRef(onActive);
  onActiveRef.current = onActive;

  function track(lx: number, ly: number) {
    const { w, h } = dimsRef.current;
    if (!w || !h) return;
    // Position du doigt ramenée à -1 … +1 depuis le centre
    tx.setValue(Math.max(-1, Math.min(1, (lx / w) * 2 - 1)));
    ty.setValue(Math.max(-1, Math.min(1, (ly / h) * 2 - 1)));
  }

  // Un ref parallèle : PanResponder est figé à la création et ne verrait pas le state
  const dimsRef = useRef({ w: 0, h: 0 });

  const rotateY = tx.interpolate({
    inputRange: [-1, 1],
    outputRange: [`-${MAX_TILT}deg`, `${MAX_TILT}deg`],
  });
  const rotateX = ty.interpolate({
    inputRange: [-1, 1],
    outputRange: [`${MAX_TILT}deg`, `-${MAX_TILT}deg`],
  });
  const scale = press.interpolate({ inputRange: [0, 1], outputRange: [1, 1.04] });

  // Reflet : se déplace à l'inverse de l'inclinaison, comme une vraie lumière
  const sheenX = tx.interpolate({ inputRange: [-1, 1], outputRange: [140, -140] });
  const sheenY = ty.interpolate({ inputRange: [-1, 1], outputRange: [140, -140] });
  const sheenOpacity = press.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Math.min(0.55, 0.28 * intensity + 0.12)],
  });

  const tiltValue = useMemo(() => ({ tx, ty }), [tx, ty]);

  return (
    <Animated.View
      {...(enabled ? pan.panHandlers : {})}
      onLayout={e => {
        const { width, height } = e.nativeEvent.layout;
        dimsRef.current = { w: width, h: height };
      }}
      style={[
        style,
        {
          transform: [{ perspective: PERSPECTIVE }, { rotateX }, { rotateY }, { scale }],
        },
      ]}
    >
      <TiltContext.Provider value={tiltValue}>{children}</TiltContext.Provider>

      {/* Reflet spéculaire — non interactif, purement décoratif */}
      <Animated.View
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFillObject,
          s.sheenClip,
          { opacity: sheenOpacity, transform: [{ translateX: sheenX }, { translateY: sheenY }] },
        ]}
      >
        <LinearGradient
          colors={[
            'rgba(255,255,255,0)',
            'rgba(255,255,255,0.55)',
            'rgba(255,255,255,0.12)',
            'rgba(255,255,255,0)',
          ]}
          locations={[0.28, 0.46, 0.56, 0.74]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={s.sheen}
        />
      </Animated.View>
    </Animated.View>
  );
}

const s = StyleSheet.create({
  sheenClip: { borderRadius: 20, overflow: 'hidden' },
  // Volontairement surdimensionné : le reflet doit pouvoir sortir du cadre en glissant
  sheen: { position: 'absolute', top: -160, left: -160, right: -160, bottom: -160 },
});
