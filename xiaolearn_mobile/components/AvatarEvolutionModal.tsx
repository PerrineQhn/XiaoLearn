/**
 * AvatarEvolutionModal — l'évolution, façon Pokémon.
 *
 * La chorégraphie d'origine tient en quatre temps, et c'est le troisième qui
 * fait tout le travail :
 *
 *   1. le personnage tremble, en couleurs, sur fond sombre ;
 *   2. tout devient silhouette blanche ;
 *   3. l'ancienne et la nouvelle forme ALTERNENT, de plus en plus vite, la
 *      silhouette s'étirant à chaque bascule ;
 *   4. flash blanc, et la nouvelle tenue apparaît en couleurs.
 *
 * L'alternation accélérée est la signature : c'est elle qui raconte « quelque
 * chose est en train de se décider ». Un simple fondu n'a pas cet effet.
 *
 * Une difficulté propre à XiaoLearn : chez Pokémon les deux formes n'ont rien
 * à voir, alors qu'ici les paliers ne diffèrent que d'un accessoire. Deux
 * silhouettes presque identiques alterneraient en scintillement illisible.
 * D'où l'étirement vertical appliqué à chaque bascule — c'est lui qui donne
 * la sensation d'un corps qui se transforme, pas la différence des contours.
 *
 * Un toucher passe à la suite : personne ne doit être retenu par une animation.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  View, Text, StyleSheet, Modal, Pressable, Animated, Easing,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useI18n } from '@/contexts/LanguageContext';
import { avatarStageSource, STAGES, AVATAR_CHARACTERS } from '@/data/avatarEvolution';

type Phase = 'charge' | 'morph' | 'done';

/** Tremblement initial avant que la lumière ne prenne le dessus. */
const CHARGE_MS = 800;
/** Première bascule, puis chacune 18 % plus courte, plancher à 55 ms. */
const FIRST_SWAP_MS = 420;
const SWAP_DECAY = 0.82;
const MIN_SWAP_MS = 55;
// Nombre impair : la dernière bascule montre la NOUVELLE forme, si bien que
// le flash révèle ce qu'on venait juste d'entrevoir.
const SWAPS = 19;

export function AvatarEvolutionModal({
  characterId, from, to, onDone,
}: {
  characterId: string | null | undefined;
  from: number;
  to: number;
  onDone: () => void;
}) {
  const { t, lang } = useI18n();
  const [phase, setPhase] = useState<Phase>('charge');
  /** Pendant l'alternation : true = nouvelle forme, false = ancienne. */
  const [showNew, setShowNew] = useState(false);

  const rays = useRef(new Animated.Value(0)).current;
  const shake = useRef(new Animated.Value(0)).current;
  const stretch = useRef(new Animated.Value(0)).current;
  const flash = useRef(new Animated.Value(0)).current;
  const pop = useRef(new Animated.Value(0.5)).current;
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Rayons, halo et libellés prennent la couleur signature du personnage :
  // l'écran célèbre TON avatar, pas l'app. Jade pour Lin, terracotta pour Hao,
  // indigo pour Malik…
  const accent = AVATAR_CHARACTERS.find(c => c.id === characterId)?.accent ?? '#F9A825';
  const before = avatarStageSource(characterId, from);
  const after = avatarStageSource(characterId, to);

  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };

  const finish = useCallback(() => {
    clearTimers();
    setPhase('done');
    Animated.sequence([
      Animated.timing(flash, { toValue: 1, duration: 120, useNativeDriver: true }),
      Animated.timing(flash, { toValue: 0, duration: 450, useNativeDriver: true }),
    ]).start();
    Animated.spring(pop, { toValue: 1, friction: 5, tension: 70, useNativeDriver: true }).start();
  }, [flash, pop]);

  useEffect(() => {
    // Rayons : tournent pendant toute la scène, plus vite pendant la mue.
    Animated.loop(
      Animated.timing(rays, { toValue: 1, duration: 9000, easing: Easing.linear, useNativeDriver: true }),
    ).start();

    // Phase 1 — le personnage tremble, en couleurs.
    Animated.loop(
      Animated.sequence([
        Animated.timing(shake, { toValue: 1, duration: 70, useNativeDriver: true }),
        Animated.timing(shake, { toValue: -1, duration: 70, useNativeDriver: true }),
      ]),
    ).start();

    timers.current.push(setTimeout(() => {
      setPhase('morph');

      // Phase 2-3 — bascules de plus en plus rapprochées. Un enchaînement de
      // setTimeout plutôt qu'un intervalle fixe : c'est l'accélération qui
      // fait monter la tension.
      let delay = FIRST_SWAP_MS;
      let elapsed = 0;
      for (let i = 0; i < SWAPS; i++) {
        elapsed += delay;
        const isNew = i % 2 === 0;
        timers.current.push(setTimeout(() => {
          setShowNew(isNew);
          // Étirement vertical à chaque bascule : sans lui, deux silhouettes
          // qui ne diffèrent que d'un accessoire ne feraient que clignoter.
          stretch.setValue(0);
          Animated.timing(stretch, {
            toValue: 1, duration: Math.max(delay, 90), easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }).start();
        }, elapsed));
        delay = Math.max(MIN_SWAP_MS, delay * SWAP_DECAY);
      }
      timers.current.push(setTimeout(finish, elapsed + 260));
    }, CHARGE_MS));

    return clearTimers;
  }, [finish, rays, shake, stretch]);

  const spin = rays.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  const shakeX = shake.interpolate({ inputRange: [-1, 1], outputRange: [-4, 4] });
  // 1.18 → 1 en vertical, 0.88 → 1 en horizontal : le corps s'allonge puis
  // retombe, comme une goutte.
  const scaleY = stretch.interpolate({ inputRange: [0, 1], outputRange: [1.18, 1] });
  const scaleX = stretch.interpolate({ inputRange: [0, 1], outputRange: [0.88, 1] });

  const morphing = phase === 'morph';
  const silhouette = morphing ? (showNew ? after : before) : undefined;

  return (
    <Modal visible transparent animationType="fade" onRequestClose={onDone}>
      <Pressable
        style={[s.backdrop, morphing && s.backdropMorph]}
        onPress={phase === 'done' ? onDone : finish}
      >
        <Animated.View style={[s.rays, { transform: [{ rotate: spin }] }]} pointerEvents="none">
          {Array.from({ length: 12 }, (_, i) => (
            <View
              key={i}
              style={[s.ray, {
                backgroundColor: morphing ? '#FFF' : accent,
                transform: [{ rotate: `${(180 / 12) * i}deg` }],
              }]}
            />
          ))}
        </Animated.View>

        {/* Pendant la mue, l'écran ne montre QUE la silhouette : le texte
            reviendrait dire ce qui est en train de se jouer. */}
        {!morphing && (
          <>
            <Text style={s.kicker}>
              {phase === 'done' ? t('evo.done') : t('evo.something')}
            </Text>
            <Text style={s.title}>
              {phase === 'done'
                ? t('evo.titleRank', { rank: lang === 'en' ? STAGES[to - 1].rankEn : STAGES[to - 1].rankFr })
                : t('evo.titleCharge')}
            </Text>
          </>
        )}

        <View style={s.stage}>
          <Animated.View
            style={[s.halo, {
              backgroundColor: morphing ? '#FFF' : accent,
              opacity: morphing ? 0.16 : phase === 'done' ? 0.26 : 0.3,
            }]}
          />

          {phase === 'charge' && before && (
            <Animated.Image
              source={before}
              style={[s.art, { transform: [{ translateX: shakeX }] }]}
              resizeMode="contain"
            />
          )}

          {morphing && silhouette && (
            <Animated.Image
              source={silhouette}
              style={[s.art, {
                tintColor: '#FFFFFF',
                transform: [{ scaleX }, { scaleY }],
              }]}
              resizeMode="contain"
            />
          )}

          {phase === 'done' && after && (
            <Animated.Image
              source={after}
              style={[s.art, { transform: [{ scale: pop }] }]}
              resizeMode="contain"
            />
          )}
        </View>

        {!morphing && (
          <>
            <View style={s.pills}>
              <View style={[s.pill, { backgroundColor: 'rgba(255,255,255,0.12)' }]}>
                <Text style={[s.pillTxt, { color: 'rgba(255,255,255,0.65)' }]}>
                  {t('evo.stageShort', { n: from })}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={14} color="rgba(255,255,255,0.45)" />
              <View style={[s.pill, { backgroundColor: accent }]}>
                <Text style={[s.pillTxt, { color: '#0B0D12' }]}>
                  {t('evo.stageShort', { n: to })}
                </Text>
              </View>
            </View>

            {phase === 'done' && (
              <>
                <Text style={[s.stageName, { color: accent }]}>
                  {lang === 'en' ? STAGES[to - 1].rankEn : STAGES[to - 1].rankFr}
                </Text>
                <Text style={s.stageOutfit}>
                  {lang === 'en' ? STAGES[to - 1].outfitEn : STAGES[to - 1].outfitFr}
                </Text>
              </>
            )}

            <Text style={s.hint}>
              {phase === 'done' ? t('evo.tapClose') : t('evo.tapSkip')}
            </Text>
          </>
        )}

        <Animated.View
          pointerEvents="none"
          style={[StyleSheet.absoluteFill, { backgroundColor: '#FFF', opacity: flash }]}
        />
      </Pressable>
    </Modal>
  );
}

const s = StyleSheet.create({
  backdrop: {
    flex: 1, backgroundColor: 'rgba(6,8,12,0.96)',
    alignItems: 'center', justifyContent: 'center', padding: 28, gap: 10,
  },
  // Pendant la mue le fond vire au noir franc : la silhouette blanche doit
  // être la seule chose lumineuse à l'écran.
  backdropMorph: { backgroundColor: '#04050A' },
  rays: {
    position: 'absolute', width: 900, height: 900,
    alignItems: 'center', justifyContent: 'center', opacity: 0.09,
  },
  ray: { position: 'absolute', width: 900, height: 34, borderRadius: 17 },

  kicker: {
    color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: '800',
    letterSpacing: 2, textTransform: 'uppercase',
  },
  title: { color: '#FFF', fontSize: 21, fontWeight: '800', textAlign: 'center' },

  stage: { width: 230, height: 230, alignItems: 'center', justifyContent: 'center' },
  halo: { position: 'absolute', width: 200, height: 200, borderRadius: 100 },
  art: { width: 210, height: 210 },

  pills: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  pill: { paddingHorizontal: 13, paddingVertical: 5, borderRadius: 14 },
  pillTxt: { fontSize: 12.5, fontWeight: '800' },

  stageName: { fontSize: 19, fontWeight: '800' },
  stageOutfit: { color: 'rgba(255,255,255,0.6)', fontSize: 13, marginTop: -6 },
  hint: { color: 'rgba(255,255,255,0.42)', fontSize: 12, marginTop: 4 },
});
