/**
 * XiaoLearn Mobile — Révision SRS interactive
 * Animation flip de carte + SM-2 simplifié + audio / prononciation / écriture
 */
import { useState, useRef, useCallback, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Animated, Dimensions, ScrollView, Modal, Pressable, ActivityIndicator, Alert,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';
import { useUserStats } from '@/hooks/useUserStats';
import { useAudio } from '@/hooks/useAudio';
import { usePronunciation } from '@/hooks/usePronunciation';
import { HanziWriter } from '@/components/HanziWriter';
import { useSrsData, computeNextSrs, SRS_SKILLS, type SrsEntry, type SrsSkill } from '@/hooks/useSrsData';
import { useSrs } from '@/contexts/SrsContext';
import ToneColoredHanzi from '@/components/ToneColoredHanzi';
import { useDisplaySettings } from '@/contexts/DisplaySettingsContext';
import { useI18n } from '@/contexts/LanguageContext';
import { useCardUnlocks } from '@/contexts/CardsContext';
import { cardGoalForStudy } from '@/data/dailyGoals';
import { useEntitlements } from '@/hooks/useEntitlements';

const { width } = Dimensions.get('window');

/** Message de feedback prononciation adapté au résultat.
 *  - Bon caractère, mauvais ton → explication spécifique
 *  - Mauvais caractère → montre ce qui a été reconnu
 *  - Rien reconnu → invite à réessayer
 */
type Translate = (k: any, v?: Record<string, string | number>) => string;

function pronFeedbackMsg(recognized: string, reference: string, t: Translate): string {
  const onlyHanzi = (s: string) => s.replace(/[^一-鿿㐀-䶿豈-﫿]/g, '');
  const rec = onlyHanzi(recognized);
  const ref = onlyHanzi(reference);
  if (!rec) return t('hard.pronNothing');
  // Pour les mots courts (≤3 chars), Azure retourne souvent le caractère de
  // référence même si la prononciation est mauvaise → le "recognized" ne
  // distingue pas vraiment si c'est le bon mot, c'est le ton qui est évalué.
  if (ref.length <= 3) return t('hard.pronTone');
  // Pour les phrases longues, une divergence réelle est possible.
  if (rec === ref) return t('hard.pronImprove');
  return t('hard.retryMic', { x: recognized });
}

/** Nettoie les annotations pédagogiques entre parenthèses des significations.
 *  Ex: "tous (ou = « o-ou »)" → "tous"
 *      "huit (non aspiré)" → "huit"
 *  Conserve les parenthèses qui font partie du sens réel : "il / lui" reste intact.
 */
function cleanTranslation(raw: string): string {
  // Supprime une ou plusieurs séquences (...) à la fin, incluant les séparateurs courants
  return raw.replace(/\s*\([^)]+\)\s*$/, '').replace(/\s*\([^)]+\)\s*$/, '').trim();
}

// ──────────────────────────────────────────────────────────────
// Types & données
// ──────────────────────────────────────────────────────────────
interface Card {
  id: string;
  hanzi: string;
  pinyin: string;
  translation: string;
  translationEn?: string;
  partOfSpeech?: string;
  example?: string;
  exampleFr?: string;
  levelLabel?: string;
  levelColor?: string;
  ease: number;
  interval: number;
}

type Rating = 'hard' | 'ok' | 'easy';
type Direction = 'zh_fr' | 'fr_zh' | 'mixed';
const XP_BY_RATING: Record<Rating, number> = { hard: 5, ok: 10, easy: 15 };

function computeNextInterval(card: Card, rating: Rating): { interval: number; ease: number } {
  const EASE_BONUS = { hard: -0.15, ok: 0, easy: 0.1 };
  const newEase = Math.min(2.5, Math.max(1.3, card.ease + EASE_BONUS[rating]));
  const interval =
    rating === 'hard' ? Math.max(1, Math.round(card.interval * 0.6)) :
    rating === 'ok'   ? (card.interval <= 1 ? 4 : Math.round(card.interval * newEase)) :
                        (card.interval <= 1 ? 7 : Math.round(card.interval * newEase * 1.3));
  return { interval, ease: newEase };
}

// ──────────────────────────────────────────────────────────────
// Carte flip — face avant + face arrière avec outils
// ──────────────────────────────────────────────────────────────
const SKILL_META: Record<SrsSkill, { icon: string; label: string }> = {
  recognition:   { icon: '👁', label: 'Reco' },
  pronunciation: { icon: '🗣', label: 'Prononc.' },
  writing:       { icon: '✍️', label: 'Écriture' },
};

/** Badges 👁🗣✍️ — niveaux des 3 compétences SRS indépendantes. */
function SkillBadges({ entry, colors }: { entry?: SrsEntry; colors: typeof Colors.light }) {
  return (
    <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'center', marginTop: 4 }}>
      {SRS_SKILLS.map(skill => {
        const lvl = entry?.skills?.[skill]?.level ?? 0;
        const col = lvl >= 4 ? '#4CAF50' : lvl > 0 ? '#FF9800' : colors.textTertiary;
        return (
          <View key={skill} style={{
            flexDirection: 'row', alignItems: 'center', gap: 3,
            paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10,
            backgroundColor: col + '15',
          }}>
            <Text style={{ fontSize: 11 }}>{SKILL_META[skill].icon}</Text>
            <Text style={{ fontSize: 10, fontWeight: '700', color: col }}>{lvl}/6</Text>
          </View>
        );
      })}
    </View>
  );
}

function FlipCard({ card, flipped, onFlip, colors, direction = 'zh_fr', entry, onWritingDone, onPronScored }: {
  card: Card; flipped: boolean; onFlip: () => void; colors: typeof Colors.light; direction?: 'zh_fr' | 'fr_zh';
  /** Entrée SRS du mot (pour afficher les 3 compteurs 👁🗣✍️) */
  entry?: SrsEntry;
  /** Appelé quand l'utilisateur termine le tracé d'un caractère (quiz) → compétence ✍️ writing */
  onWritingDone?: () => void;
  /** Appelé après un scoring micro → compétence 🗣 pronunciation (quality 1-4) */
  onPronScored?: (quality: 1 | 2 | 3 | 4, score?: number) => void;
}) {
  // zh_fr : face recto = hanzi, verso = traduction
  // fr_zh : face recto = traduction, verso = hanzi
  const anim = useRef(new Animated.Value(0)).current;
  const { toneColors } = useDisplaySettings();
  const { t, pick } = useI18n();

  // Audio
  const { playHanzi, playing } = useAudio();

  // Prononciation
  const {
    startRecording, stopAndScore, reset: resetPron,
    status: pronStatus, result: pronResult, error: pronError,
  } = usePronunciation();

  // Surface les erreurs micro à l'utilisateur (permission, réseau…)
  const lastErrRef = useRef<string | null>(null);
  useEffect(() => {
    if (pronStatus === 'error' && pronError && pronError !== lastErrRef.current) {
      lastErrRef.current = pronError;
      Alert.alert(t('review.micErrorTitle'), pronError);
    }
    if (pronStatus !== 'error') lastErrRef.current = null;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pronStatus, pronError]);

  // HanziWriter modal
  const [writerOpen, setWriterOpen] = useState(false);
  const [writerCharIdx, setWriterCharIdx] = useState(0);
  const [writerPhase, setWriterPhase] = useState<'animate' | 'quiz'>('animate');

  // Flip animation — dans useEffect pour éviter le setState-during-render
  useEffect(() => {
    Animated.spring(anim, {
      toValue: flipped ? 1 : 0,
      friction: 8, tension: 60, useNativeDriver: true,
    }).start();
    if (!flipped) resetPron();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flipped]);

  // Score micro → note la compétence 🗣 pronunciation (une fois par résultat)
  const lastPronRef = useRef<typeof pronResult>(null);
  useEffect(() => {
    if (!pronResult || pronResult === lastPronRef.current) return;
    lastPronRef.current = pronResult;
    const s = pronResult.pronunciationScore;
    onPronScored?.(s >= 90 ? 4 : s >= 80 ? 3 : s >= 55 ? 2 : 1, s);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pronResult]);

  const frontRotate = anim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] });
  const backRotate  = anim.interpolate({ inputRange: [0, 1], outputRange: ['180deg', '360deg'] });
  const frontOpacity = anim.interpolate({ inputRange: [0.4, 0.5], outputRange: [1, 0] });
  const backOpacity  = anim.interpolate({ inputRange: [0.4, 0.5], outputRange: [0, 1] });

  // Score couleur
  const scoreColor = pronResult
    ? pronResult.pronunciationScore >= 80 ? '#15803D'
      : pronResult.pronunciationScore >= 55 ? '#92400E' : '#B91C1C'
    : colors.primaryRed;
  const scoreBg = pronResult
    ? pronResult.pronunciationScore >= 80 ? '#F0FDF4'
      : pronResult.pronunciationScore >= 55 ? '#FFFBEB' : '#FEF2F2'
    : 'transparent';
  const scoreBorder = pronResult
    ? pronResult.pronunciationScore >= 80 ? '#86EFAC'
      : pronResult.pronunciationScore >= 55 ? '#FDE68A' : '#FECACA'
    : 'transparent';

  return (
    <>
      <TouchableOpacity activeOpacity={0.95} onPress={onFlip} style={styles.cardWrap}>
        {/* ── Face AVANT ── */}
        <Animated.View style={[
          styles.card,
          { backgroundColor: colors.cardBg, borderColor: colors.borderLight,
            transform: [{ rotateY: frontRotate }], opacity: frontOpacity },
        ]}>
          <Text style={[styles.cardHint, { color: colors.textTertiary }]}>{t('review.tapReveal')}</Text>
          {direction === 'fr_zh' ? (
            <>
              <Text style={[styles.cardTranslation, { color: colors.primaryRed, textAlign: 'center', fontSize: 28 }]}>
                {pick(cleanTranslation(card.translation), cleanTranslation(card.translationEn ?? card.translation))}
              </Text>
              {card.partOfSpeech ? (
                <View style={[styles.posPill, { backgroundColor: colors.cardBgAlt, marginTop: 8 }]}>
                  <Text style={[styles.posPillText, { color: colors.textTertiary }]}>{card.partOfSpeech}</Text>
                </View>
              ) : null}
            </>
          ) : (
            <>
              <ToneColoredHanzi hanzi={card.hanzi} pinyin={card.pinyin} enabled={toneColors} style={[styles.cardHanzi, { color: colors.textPrimary }]} />
              <Text style={[styles.cardPinyin, { color: colors.textSecondary }]}>{card.pinyin}</Text>
            </>
          )}
          <View style={[styles.tapHint, { backgroundColor: colors.cardBgAlt }]}>
            <Ionicons name="eye-outline" size={14} color={colors.textTertiary} />
            <Text style={[styles.tapHintText, { color: colors.textTertiary }]}>
              {direction === 'fr_zh' ? t('review.revealHanzi') : t('review.revealTranslation')}
            </Text>
          </View>
        </Animated.View>

        {/* ── Face ARRIÈRE ── */}
        <Animated.View style={[
          styles.card, styles.cardBack,
          { backgroundColor: colors.cardBg, borderColor: colors.primaryRedLight,
            transform: [{ rotateY: backRotate }], opacity: backOpacity },
        ]}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 8, flexGrow: 1, justifyContent: 'center' }}>
            {direction === 'fr_zh' ? (
              <>
                <ToneColoredHanzi hanzi={card.hanzi} pinyin={card.pinyin} enabled={toneColors} style={[styles.cardHanzi, { color: colors.textPrimary }]} />
                <Text style={[styles.cardPinyin, { color: colors.textSecondary }]}>{card.pinyin}</Text>
                <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />
                <Text style={[styles.cardTranslation, { color: colors.primaryRed }]}>{pick(cleanTranslation(card.translation), cleanTranslation(card.translationEn ?? card.translation))}</Text>
              </>
            ) : (
              <>
                <ToneColoredHanzi hanzi={card.hanzi} pinyin={card.pinyin} enabled={toneColors} style={[styles.cardHanzi, { color: colors.textPrimary }]} />
                <Text style={[styles.cardPinyin, { color: colors.textSecondary }]}>{card.pinyin}</Text>
                <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />
                <Text style={[styles.cardTranslation, { color: colors.primaryRed }]}>{pick(cleanTranslation(card.translation), cleanTranslation(card.translationEn ?? card.translation))}</Text>
              </>
            )}
            {card.partOfSpeech ? (
              <View style={[styles.posPill, { backgroundColor: colors.cardBgAlt }]}>
                <Text style={[styles.posPillText, { color: colors.textTertiary }]}>{card.partOfSpeech}</Text>
              </View>
            ) : card.levelLabel ? (
              <View style={[styles.posPill, { backgroundColor: (card.levelColor ?? '#999') + '18' }]}>
                <Text style={[styles.posPillText, { color: card.levelColor ?? '#999' }]}>{card.levelLabel}</Text>
              </View>
            ) : null}
            {/* 3 compteurs SRS indépendants 👁🗣✍️ */}
            <SkillBadges entry={entry} colors={colors} />
            {card.example ? (
              <View style={[styles.exampleBox, { backgroundColor: colors.appBg, borderColor: colors.borderLight }]}>
                <Text style={[styles.exampleHanzi, { color: colors.textPrimary }]}>{card.example}</Text>
                {card.exampleFr ? (
                  <Text style={[styles.exampleFr, { color: colors.textSecondary }]}>{card.exampleFr}</Text>
                ) : null}
              </View>
            ) : null}

            {/* ── Barre outils ── */}
            <View style={styles.toolRow}>
              {/* Audio */}
              <TouchableOpacity
                style={[styles.toolBtn, { backgroundColor: colors.primaryRedLight }]}
                onPress={() => playHanzi(card.hanzi)}
                activeOpacity={0.75}
              >
                <Ionicons
                  name={playing ? 'volume-high' : 'volume-medium-outline'}
                  size={22} color={colors.primaryRed}
                />
                <Text style={[styles.toolLabel, { color: colors.primaryRed }]}>{t('common.listen')}</Text>
              </TouchableOpacity>

              {/* Prononciation */}
              <TouchableOpacity
                style={[styles.toolBtn, {
                  backgroundColor: pronStatus === 'recording' ? '#FEE2E2' : colors.primaryRedLight,
                }]}
                onPress={() => {
                  if (pronStatus === 'recording') stopAndScore(card.hanzi);
                  else if (pronStatus === 'done') resetPron();
                  else startRecording();
                }}
                activeOpacity={0.75}
              >
                <Ionicons
                  name={pronStatus === 'recording' ? 'stop-circle' : pronStatus === 'loading' ? 'hourglass-outline' : 'mic-outline'}
                  size={22}
                  color={pronStatus === 'recording' ? '#DC2626' : colors.primaryRed}
                />
                <Text style={[styles.toolLabel, {
                  color: pronStatus === 'recording' ? '#DC2626' : colors.primaryRed,
                }]}>
                  {pronStatus === 'loading' ? '...'
                    : pronStatus === 'done' && pronResult
                      ? `${pronResult.pronunciationScore}%`
                      : 'Prononciation'}
                </Text>
              </TouchableOpacity>

              {/* Écriture */}
              <TouchableOpacity
                style={[styles.toolBtn, { backgroundColor: colors.primaryRedLight }]}
                onPress={() => { setWriterCharIdx(0); setWriterPhase('animate'); setWriterOpen(true); }}
                activeOpacity={0.75}
              >
                <Ionicons name="pencil-outline" size={22} color={colors.primaryRed} />
                <Text style={[styles.toolLabel, { color: colors.primaryRed }]}>{t('common.writing')}</Text>
              </TouchableOpacity>
            </View>

            {/* Score prononciation */}
            {pronStatus === 'done' && pronResult ? (
              <View style={[styles.pronScore, { backgroundColor: scoreBg, borderColor: scoreBorder }]}>
                <Text style={[styles.pronScoreTxt, { color: scoreColor }]}>
                  {pronResult.pronunciationScore >= 80 ? '✅ Excellente prononciation' :
                   pronResult.pronunciationScore >= 55 ? '⚠️ Correct, peut mieux faire' :
                   t('hard.verdictRetry')}
                  {` (${pronResult.pronunciationScore}%)`}
                </Text>
                <Text style={[styles.pronScoreSub, { color: scoreColor + 'AA' }]}>
                  {pronFeedbackMsg(pronResult.recognized, card.hanzi, t)}
                </Text>
              </View>
            ) : null}
          </ScrollView>
        </Animated.View>
      </TouchableOpacity>

      {/* ── Modal HanziWriter ── */}
      <Modal visible={writerOpen} transparent animationType="fade" onRequestClose={() => setWriterOpen(false)}>
        <Pressable style={styles.writerOverlay} onPress={() => setWriterOpen(false)}>
          <Pressable style={[styles.writerSheet, { backgroundColor: colors.cardBg }]} onPress={e => e.stopPropagation()}>

            {/* Phase indicator */}
            <View style={styles.phaseRow}>
              <View style={[styles.phaseDot, { backgroundColor: colors.primaryRed }]} />
              <Text style={[styles.phaseLabel, { color: colors.textTertiary }]}>
                {writerPhase === 'animate' ? t('hard.writeStep1') : t('hard.writeStep2')}
              </Text>
            </View>

            <Text style={[styles.writerTitle, { color: colors.textPrimary }]}>{card.hanzi}</Text>

            {/* Sélecteur de caractère si mot */}
            {card.hanzi.length > 1 ? (
              <View style={styles.charPicker}>
                {Array.from(card.hanzi).map((ch, i) => (
                  <TouchableOpacity
                    key={i}
                    style={[styles.charChip, {
                      backgroundColor: i === writerCharIdx ? colors.primaryRed : colors.primaryRedLight,
                    }]}
                    onPress={() => { setWriterCharIdx(i); setWriterPhase('animate'); }}
                  >
                    <Text style={{ color: i === writerCharIdx ? '#FFF' : colors.primaryRed, fontWeight: '400', fontSize: 18 }}>
                      {ch}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : null}

            <HanziWriter
              key={`${card.hanzi[writerCharIdx] ?? card.hanzi[0]}-${writerPhase}`}
              hanzi={card.hanzi[writerCharIdx] ?? card.hanzi[0]}
              size={220}
              strokeColor={colors.primaryRed}
              mode={writerPhase}
              onComplete={() => {
                if (writerPhase === 'animate') setWriterPhase('quiz');
                else onWritingDone?.();
              }}
            />

            <Text style={[styles.writerHint, { color: colors.textTertiary }]}>
              {writerPhase === 'animate'
                ? t('hard.autoAnim')
                : t('hard.strokeOrder')}
            </Text>

            <View style={styles.writerBtns}>
              {writerPhase === 'quiz' ? (
                <TouchableOpacity
                  style={[styles.writerBtnSecondary, { borderColor: colors.primaryRed }]}
                  onPress={() => setWriterPhase('animate')}
                >
                  <Ionicons name="play-outline" size={16} color={colors.primaryRed} />
                  <Text style={{ color: colors.primaryRed, fontWeight: '600', fontSize: 14 }}>Revoir</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[styles.writerBtnSecondary, { borderColor: colors.primaryRed }]}
                  onPress={() => setWriterPhase('quiz')}
                >
                  <Ionicons name="pencil-outline" size={16} color={colors.primaryRed} />
                  <Text style={{ color: colors.primaryRed, fontWeight: '600', fontSize: 14 }}>Tracer</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={[styles.writerClose, { backgroundColor: colors.primaryRed }]}
                onPress={() => setWriterOpen(false)}
              >
                <Text style={{ color: '#FFF', fontWeight: '700', fontSize: 15 }}>Fermer</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

// ──────────────────────────────────────────────────────────────
// Résumé de session
// ──────────────────────────────────────────────────────────────
function SessionSummary({
  results, totalXp, onClose, colors,
}: {
  results: { card: Card; rating: Rating }[];
  totalXp: number;
  onClose: () => void;
  colors: typeof Colors.light;
}) {
  const { t } = useI18n();
  const hard = results.filter(r => r.rating === 'hard').length;
  const ok   = results.filter(r => r.rating === 'ok').length;
  const easy = results.filter(r => r.rating === 'easy').length;

  return (
    <ScrollView contentContainerStyle={styles.summary}>
      <Text style={styles.summaryEmoji}>🎉</Text>
      <Text style={[styles.summaryTitle, { color: colors.textPrimary }]}>{t('review.finish')} !</Text>
      <Text style={[styles.summaryXp, { color: colors.primaryRed }]}>+{totalXp} XP</Text>

      <View style={styles.summaryStats}>
        <View style={[styles.summaryStatBox, { backgroundColor: '#4CAF5018' }]}>
          <Text style={[styles.summaryStatNum, { color: '#4CAF50' }]}>{easy}</Text>
          <Text style={[styles.summaryStatLabel, { color: '#4CAF50' }]}>{t('review.easy')}</Text>
        </View>
        <View style={[styles.summaryStatBox, { backgroundColor: '#2196F318' }]}>
          <Text style={[styles.summaryStatNum, { color: '#2196F3' }]}>{ok}</Text>
          <Text style={[styles.summaryStatLabel, { color: '#2196F3' }]}>{t('review.ok')}</Text>
        </View>
        <View style={[styles.summaryStatBox, { backgroundColor: '#FF572218' }]}>
          <Text style={[styles.summaryStatNum, { color: '#FF5722' }]}>{hard}</Text>
          <Text style={[styles.summaryStatLabel, { color: '#FF5722' }]}>{t('review.hard')}</Text>
        </View>
      </View>

      <TouchableOpacity style={[styles.doneBtn, { backgroundColor: colors.primaryRed }]} onPress={onClose}>
        <Text style={styles.doneBtnText}>{t('common.backHome')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// ──────────────────────────────────────────────────────────────
// Carte mode « Écriture » — tracer le hanzi de mémoire
// ──────────────────────────────────────────────────────────────
function WriteCard({ card, colors, revealed, onReveal, onTraced }: {
  card: Card; colors: typeof Colors.light;
  revealed: boolean;
  onReveal: () => void;
  onTraced: () => void;
}) {
  const { t, pick } = useI18n();
  const { toneColors } = useDisplaySettings();
  const { playHanzi, playing } = useAudio();
  const chars = Array.from(card.hanzi);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => { setCharIdx(0); }, [card.id]);

  return (
    <View style={styles.cardWrap}>
      <View style={[styles.card, {
        position: 'relative', backfaceVisibility: 'visible',
        backgroundColor: colors.cardBg, borderColor: colors.borderLight,
        alignItems: 'stretch', justifyContent: 'flex-start',
      }]}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 10, flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={[styles.cardHint, { color: colors.textTertiary }]}>{t('review.writePrompt')}</Text>
          <Text style={[styles.cardTranslation, { color: colors.primaryRed, fontSize: 24 }]}>
            {pick(cleanTranslation(card.translation), cleanTranslation(card.translationEn ?? card.translation))}
          </Text>
          <Text style={[styles.cardPinyin, { color: colors.textSecondary }]}>{card.pinyin}</Text>

          {!revealed ? (
            <>
              {chars.length > 1 && (
                <Text style={[styles.writeProgress, { color: colors.textTertiary }]}>
                  {charIdx + 1} / {chars.length}
                </Text>
              )}
              <HanziWriter
                key={`${card.id}-${charIdx}`}
                hanzi={chars[charIdx] ?? card.hanzi}
                size={200}
                strokeColor={colors.primaryRed}
                mode="quiz"
                onComplete={() => {
                  if (charIdx + 1 < chars.length) setCharIdx(i => i + 1);
                  else { onTraced(); onReveal(); }
                }}
              />
              <Text style={[styles.writerHint, { color: colors.textTertiary }]}>{t('review.tapToTrace')}</Text>
              <TouchableOpacity
                style={[styles.writeShowBtn, { borderColor: colors.borderMedium }]}
                onPress={onReveal}
              >
                <Ionicons name="eye-outline" size={16} color={colors.textSecondary} />
                <Text style={{ color: colors.textSecondary, fontSize: 13, fontWeight: '600' }}>{t('review.writeShowAnswer')}</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <ToneColoredHanzi hanzi={card.hanzi} pinyin={card.pinyin} enabled={toneColors} style={[styles.cardHanzi, { color: colors.textPrimary }]} />
              <TouchableOpacity
                style={[styles.toolBtn, { backgroundColor: colors.primaryRedLight, flexDirection: 'row', paddingHorizontal: 16 }]}
                onPress={() => playHanzi(card.hanzi)}
              >
                <Ionicons name={playing ? 'volume-high' : 'volume-medium-outline'} size={20} color={colors.primaryRed} />
                <Text style={[styles.toolLabel, { color: colors.primaryRed, fontSize: 12 }]}>{t('common.listen')}</Text>
              </TouchableOpacity>
              <Text style={[styles.writeDoneText, { color: '#4CAF50' }]}>✍️ {t('review.writeDone')}</Text>
            </>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

// ──────────────────────────────────────────────────────────────
// Écran principal
// ──────────────────────────────────────────────────────────────
export default function ReviewScreen() {
  const scheme = useColorScheme();
  const c = Colors[scheme];
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { addXp, bumpDaily } = useUserStats();
  const { t } = useI18n();
  const { trackAndCheck } = useCardUnlocks();
  const params = useLocalSearchParams<{ mode?: string; level?: string; maxCards?: string; direction?: string; study?: string }>();
  const mode = (params.mode as 'due' | 'new' | 'level' | 'mastered') ?? 'due';
  const levelFilter = params.level as string | undefined;
  const requestedCards = params.maxCards ? parseInt(params.maxCards) : 20;
  const directionParam = (params.direction as Direction | undefined) ?? 'zh_fr';
  const study = params.study === 'writing' ? 'writing' : 'flip';

  // Pour chaque carte, détermine zh_fr ou fr_zh (mixte = aléatoire)
  const cardDirections = useRef<Map<string, 'zh_fr' | 'fr_zh'>>(new Map());
  function getCardDirection(cardId: string): 'zh_fr' | 'fr_zh' {
    if (directionParam !== 'mixed') return directionParam;
    if (!cardDirections.current.has(cardId)) {
      cardDirections.current.set(cardId, Math.random() < 0.5 ? 'zh_fr' : 'fr_zh');
    }
    return cardDirections.current.get(cardId)!;
  }

  const { srsState, loaded, getSessionCards, saveEntry } = useSrs();
  const { access } = useEntitlements();
  /**
   * Plafond de session du plan gratuit. `reviewItemLimit` existait dans
   * AppAccess sans être lu : une session gratuite pouvait contenir autant de
   * cartes qu'une session Premium.
   */
  const maxCards = access.reviewItemLimit === null
    ? requestedCards
    : Math.min(requestedCards, access.reviewItemLimit);
  const [cards, setCards] = useState<Card[]>([]);
  const [cardsReady, setCardsReady] = useState(false);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [results, setResults] = useState<{ card: Card; rating: Rating }[]>([]);
  const [totalXp, setTotalXp] = useState(0);
  const [done, setDone] = useState(false);

  // Charger les cartes une fois le SRS state prêt
  useEffect(() => {
    if (!loaded) return;
    // La compétence conditionne la sélection : en mode écriture, ce sont les
    // cartes dues EN ÉCRITURE qu'il faut, pas celles dues en reconnaissance.
    // Sans ce 4ᵉ argument, quelqu'un qui maîtrise la reconnaissance de tout son
    // vocabulaire obtenait « Tout est à jour » avec un niveau d'écriture nul.
    const srsCards = getSessionCards(mode, levelFilter, maxCards,
      study === 'writing' ? 'writing' : 'recognition');
    const mapped: Card[] = srsCards.map(c => ({
      id: c.id,
      hanzi: c.hanzi,
      pinyin: c.pinyin,
      translation: c.translation,
      translationEn: c.translationEn,
      levelLabel: c.levelLabel,
      levelColor: c.levelColor,
      ease: (c as any).ease ?? 2.5,
      interval: (c as any).interval ?? 1,
    }));
    setCards(mapped);
    setCardsReady(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  const current = cards[index];
  const progress = cards.length > 0 ? index / cards.length : 0;

  const rate = useCallback(async (rating: Rating) => {
    if (!current) return;
    const xp = XP_BY_RATING[rating];
    const newXp = totalXp + xp;
    setResults(r => [...r, { card: current, rating }]);
    setTotalXp(newXp);
    await addXp(xp);
    void bumpDaily(cardGoalForStudy(study));

    // Persister l'état SRS (format web-compatible, par compétence) :
    // écriture = ✍️ writing · hanzi→fr = 👁 reconnaissance · fr→hanzi = 🗣 prononciation
    const quality: 1|2|3|4 = rating === 'hard' ? 2 : rating === 'ok' ? 3 : 4;
    const skill = study === 'writing' ? 'writing'
      : getCardDirection(current.id) === 'fr_zh' ? 'pronunciation' : 'recognition';
    const next = computeNextSrs(srsState[current.id], current.id, quality, skill);
    saveEntry(current.id, next).catch(() => {});

    if (index + 1 >= cards.length) {
      setDone(true);
      void trackAndCheck({ reviewSessions: 1, reviewedCards: cards.length });
    } else {
      setFlipped(false);
      setTimeout(() => setIndex(i => i + 1), 150);
    }
  }, [current, index, totalXp, addXp, bumpDaily, cards.length, srsState, saveEntry, study, trackAndCheck]);

  const goBack = () => router.canGoBack() ? router.back() : router.replace('/(tabs)' as any);

  // Chargement
  if (!cardsReady) {
    return (
      <SafeAreaView style={[styles.root, { backgroundColor: c.appBg }]}>
        <View style={styles.loadingCenter}>
          <ActivityIndicator color={c.primaryRed} size="large" />
          <Text style={[styles.loadingTxt, { color: c.textTertiary }]}>{t('review.preparing')}</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Aucune carte disponible
  if (cardsReady && cards.length === 0) {
    return (
      <SafeAreaView style={[styles.root, { backgroundColor: c.appBg }]}>
        <View style={styles.loadingCenter}>
          <Text style={{ fontSize: 48, marginBottom: 12 }}>🎉</Text>
          <Text style={[styles.loadingTxt, { color: c.textPrimary, fontSize: 17, fontWeight: '700' }]}>
            {t('review.noCards')}
          </Text>
          <Text style={[styles.loadingTxt, { color: c.textTertiary, marginTop: 6 }]}>
            {mode === 'due' ? t('hard.allCaughtUp') : t('hard.deckEmpty')}
          </Text>
          <TouchableOpacity style={[styles.doneBtn, { backgroundColor: c.primaryRed, marginTop: 24 }]} onPress={goBack}>
            <Text style={styles.doneBtnText}>Retour</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (done) {
    return (
      <SafeAreaView style={[styles.root, { backgroundColor: c.appBg }]}>
        <SessionSummary
          results={results} totalXp={totalXp}
          onClose={goBack}
          colors={c}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: c.appBg }]} edges={['bottom', 'left', 'right']}>
      {/* Header — paddingTop manuel pour fullScreenModal sur iPhone avec Dynamic Island */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 16) }]}>
        <TouchableOpacity onPress={goBack}>
          <Ionicons name="close" size={24} color={c.textSecondary} />
        </TouchableOpacity>
        <View style={[styles.progressTrack, { backgroundColor: c.primaryRedLight }]}>
          <View style={[styles.progressBar, { width: `${progress * 100}%` as any, backgroundColor: c.primaryRed }]} />
        </View>
        <Text style={[styles.counter, { color: c.textTertiary }]}>{index + 1}/{cards.length}</Text>
      </View>

      {/* Carte */}
      {study === 'writing' ? (
        <WriteCard
          card={current}
          colors={c}
          revealed={flipped}
          onReveal={() => setFlipped(true)}
          onTraced={() => {}}
        />
      ) : (
        <FlipCard
          card={current}
          flipped={flipped}
          onFlip={() => setFlipped(f => !f)}
          colors={c}
          direction={getCardDirection(current.id)}
          entry={srsState[current.id]}
          onWritingDone={() => {
            // Tracé réussi → note la compétence ✍️ writing (bien)
            const next = computeNextSrs(srsState[current.id], current.id, 3, 'writing');
            saveEntry(current.id, next).catch(() => {});
          }}
          onPronScored={(q, score) => {
            // Score micro → note la compétence 🗣 pronunciation
            const next = computeNextSrs(srsState[current.id], current.id, q, 'pronunciation');
            saveEntry(current.id, next).catch(() => {});
            if (typeof score === 'number') void trackAndCheck({ bestPronunciation: score });
          }}
        />
      )}

      {/* Boutons notation (visibles uniquement côté verso / après tracé) */}
      {flipped ? (
        <View style={styles.ratingRow}>
          <TouchableOpacity style={[styles.ratingBtn, styles.hardBtn]} onPress={() => rate('hard')}>
            <Text style={styles.ratingIcon}>😓</Text>
            <Text style={[styles.ratingLabel, { color: '#FF5722' }]}>{t('review.hard')}</Text>
            <Text style={styles.ratingXp}>+{XP_BY_RATING.hard} XP</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.ratingBtn, styles.okBtn]} onPress={() => rate('ok')}>
            <Text style={styles.ratingIcon}>🙂</Text>
            <Text style={[styles.ratingLabel, { color: '#2196F3' }]}>{t('review.ok')}</Text>
            <Text style={styles.ratingXp}>+{XP_BY_RATING.ok} XP</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.ratingBtn, styles.easyBtn]} onPress={() => rate('easy')}>
            <Text style={styles.ratingIcon}>😎</Text>
            <Text style={[styles.ratingLabel, { color: '#4CAF50' }]}>{t('review.easy')}</Text>
            <Text style={styles.ratingXp}>+{XP_BY_RATING.easy} XP</Text>
          </TouchableOpacity>
        </View>
      ) : study === 'flip' ? (
        <TouchableOpacity
          style={[styles.flipBtn, { backgroundColor: c.primaryRed }]}
          onPress={() => setFlipped(true)}
        >
          <Text style={styles.flipBtnText}>{t('review.revealAnswer')}</Text>
        </TouchableOpacity>
      ) : null}
    </SafeAreaView>
  );
}

// ──────────────────────────────────────────────────────────────
// Styles
// ──────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: { flex: 1 },

  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingTop: 8, paddingBottom: 12, gap: 12,
  },
  progressTrack: { flex: 1, height: 6, borderRadius: 3, overflow: 'hidden' },
  progressBar: { height: 6, borderRadius: 3 },
  counter: { fontSize: 12, fontWeight: '600', minWidth: 36, textAlign: 'right' },

  cardWrap: {
    flex: 1, marginHorizontal: 16, marginBottom: 12,
  },
  card: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    borderRadius: 20, borderWidth: 1, padding: 20,
    alignItems: 'center', justifyContent: 'center',
    backfaceVisibility: 'hidden',
    shadowColor: '#D8483E', shadowOpacity: 0.08, shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 }, elevation: 3,
  },
  cardBack: {
    alignItems: 'stretch', justifyContent: 'flex-start',
  },
  cardHint: { fontSize: 11, fontWeight: '600', letterSpacing: 0.5, marginBottom: 16, textTransform: 'uppercase' },
  cardHanzi: { fontSize: 52, fontWeight: '400', letterSpacing: 4, textAlign: 'center' },
  cardPinyin: { fontSize: 18, marginTop: 8, textAlign: 'center' },
  tapHint: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, marginTop: 24 },
  tapHintText: { fontSize: 12 },
  divider: { height: 1, marginVertical: 4 },
  cardTranslation: { fontSize: 22, fontWeight: '700', textAlign: 'center' },
  posPill: { alignSelf: 'center', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 },
  posPillText: { fontSize: 11, fontWeight: '500' },
  exampleBox: { borderRadius: 10, borderWidth: 1, padding: 12 },
  exampleHanzi: { fontSize: 14, marginBottom: 4 },
  exampleFr: { fontSize: 13 },

  // Outils (audio / prononciation / écriture)
  toolRow: { flexDirection: 'row', gap: 8, marginTop: 4 },
  toolBtn: { flex: 1, borderRadius: 12, paddingVertical: 10, alignItems: 'center', gap: 4 },
  toolLabel: { fontSize: 10, fontWeight: '700' },

  // Score prononciation
  pronScore: { borderRadius: 10, borderWidth: 1, padding: 10, alignItems: 'center', gap: 4 },
  pronScoreTxt: { fontSize: 13, fontWeight: '700', textAlign: 'center' },
  pronScoreSub: { fontSize: 11, textAlign: 'center' },

  // Mode écriture
  writeProgress: { fontSize: 12, fontWeight: '700' },
  writeShowBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, borderWidth: 1, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8, marginTop: 4 },
  writeDoneText: { fontSize: 14, fontWeight: '700', textAlign: 'center', marginTop: 4 },

  // Modal HanziWriter
  writerOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 24 },
  writerSheet: { borderRadius: 24, padding: 24, alignItems: 'center', gap: 10, width: '100%' },
  writerTitle: { fontSize: 17, fontWeight: '700' },
  writerHanzi: { fontSize: 44, fontWeight: '400', letterSpacing: 4 },
  charPicker: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', justifyContent: 'center' },
  charChip: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  phaseRow: { flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start' },
  phaseDot: { width: 6, height: 6, borderRadius: 3 },
  phaseLabel: { fontSize: 11, fontWeight: '600' },
  writerHint: { fontSize: 11, textAlign: 'center', lineHeight: 16 },
  writerBtns: { flexDirection: 'row', gap: 10, marginTop: 4, width: '100%' },
  writerBtnSecondary: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, borderRadius: 14, paddingVertical: 12, borderWidth: 1.5 },
  writerClose: { flex: 1, borderRadius: 14, paddingVertical: 12, alignItems: 'center', justifyContent: 'center' },

  // Boutons de notation
  ratingRow: { flexDirection: 'row', paddingHorizontal: 16, paddingBottom: 16, gap: 10 },
  ratingBtn: {
    flex: 1, borderRadius: 16, paddingVertical: 14,
    alignItems: 'center', gap: 2,
  },
  hardBtn: { backgroundColor: '#FFF3F0' },
  okBtn:   { backgroundColor: '#EFF6FF' },
  easyBtn: { backgroundColor: '#F0FDF4' },
  ratingIcon: { fontSize: 22 },
  ratingLabel: { fontSize: 13, fontWeight: '700' },
  ratingXp: { fontSize: 10, color: '#999', fontWeight: '500' },

  flipBtn: {
    marginHorizontal: 16, marginBottom: 16, borderRadius: 16,
    paddingVertical: 16, alignItems: 'center',
  },
  flipBtnText: { color: '#FFF', fontSize: 16, fontWeight: '700' },

  // Résumé de session
  summary: { padding: 24, alignItems: 'center', gap: 12 },
  summaryEmoji: { fontSize: 56 },
  summaryTitle: { fontSize: 24, fontWeight: '700' },
  summaryXp: { fontSize: 40, fontWeight: '800' },
  summaryStats: { flexDirection: 'row', gap: 12, marginTop: 8 },
  summaryStatBox: { flex: 1, borderRadius: 14, paddingVertical: 16, alignItems: 'center', gap: 4 },
  summaryStatNum: { fontSize: 28, fontWeight: '700' },
  summaryStatLabel: { fontSize: 12, fontWeight: '600' },
  doneBtn: { marginTop: 16, borderRadius: 16, paddingVertical: 16, paddingHorizontal: 48, alignItems: 'center' },
  doneBtnText: { color: '#FFF', fontSize: 16, fontWeight: '700' },

  // Loading / empty state
  loadingCenter: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32, gap: 8 },
  loadingTxt: { fontSize: 13, textAlign: 'center' },
});
