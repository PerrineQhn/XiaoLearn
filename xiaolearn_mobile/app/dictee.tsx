/**
 * XiaoLearn Mobile — Atelier dictée 🎧
 * Port de DictationGamePage (web) : écoute une phrase → écris-la en hanzi
 * ou en pinyin → vérifie → score final sur 10 phrases.
 */
import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput,
  ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';
import { useAudio } from '@/hooks/useAudio';
import { useUserStats } from '@/hooks/useUserStats';
import { getPhrasesByLevel, type DictationPhrase } from '@/data/dictationPhrases';
import ToneColoredHanzi from '@/components/ToneColoredHanzi';
import { useDisplaySettings } from '@/contexts/DisplaySettingsContext';
import { useI18n } from '@/contexts/LanguageContext';
import { bumpDailyCounter } from '@/data/dailyGoals';
import { logError } from '@/data/errorLog';
import { useEntitlements } from '@/hooks/useEntitlements';
import { PremiumGate } from '@/components/PremiumGate';

const LEVELS = ['hsk1', 'hsk2', 'hsk3'] as const;
type DictLevel = (typeof LEVELS)[number];

const LEVEL_COLORS: Record<DictLevel, string> = {
  hsk1: '#4CAF50', hsk2: '#8BC34A', hsk3: '#F9A825',
};

/** URL de la variante lente (shadowing) : audio/phrases/ → audio/phrases-slow/. */
function toSlowUrl(audio: string): string {
  return audio.replace('audio/phrases/', 'audio/phrases-slow/');
}

/** Normalise pour comparaison : minuscules, sans espaces/ponctuation, sans diacritiques pinyin. */
function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[\s。，、！？.,:;!?'’«»""]/g, '');
}

export default function DicteeScreen() {
  const scheme = useColorScheme();
  const c = Colors[scheme];
  const router = useRouter();
  const params = useLocalSearchParams<{ level?: string }>();
  const { playUrl, playing } = useAudio();
  const { addXp } = useUserStats();
  const { toneColors, showPinyin } = useDisplaySettings();
  const { t, pick } = useI18n();
  const { access } = useEntitlements();

  const [level, setLevel] = useState<DictLevel>(
    LEVELS.includes(params.level as DictLevel) ? (params.level as DictLevel) : 'hsk1'
  );
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [result, setResult] = useState<'correct' | 'incorrect' | null>(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [seed, setSeed] = useState(0); // re-tirage des phrases à chaque session
  const [slowMode, setSlowMode] = useState(false); // 🐢 vitesse lente (shadowing)

  const phrases = useMemo<DictationPhrase[]>(() => {
    const all = getPhrasesByLevel(level);
    return [...all].sort(() => Math.random() - 0.5).slice(0, 10);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level, seed]);

  const current = phrases[idx];
  const accent = LEVEL_COLORS[level];
  const isLast = idx === phrases.length - 1;
  const pct = attempts > 0 ? Math.round((score / attempts) * 100) : 0;

  const audioPath = useCallback(
    (p: DictationPhrase) => (slowMode ? toSlowUrl(p.audio) : p.audio),
    [slowMode]
  );

  // Auto-play à chaque nouvelle phrase
  const playedRef = useRef<string | null>(null);
  useEffect(() => {
    if (!started || completed || !current) return;
    if (playedRef.current === current.id) return;
    playedRef.current = current.id;
    const t = setTimeout(() => { playUrl(audioPath(current)).catch(() => {}); }, 500);
    return () => clearTimeout(t);
  }, [started, completed, current, playUrl, audioPath]);

  const start = useCallback(() => {
    setSeed(s => s + 1);
    setIdx(0); setInput(''); setRevealed(false); setResult(null);
    // Verrou d'abonnement : on redirige plutôt que de démarrer.
    if (!access.canUseAI) { router.push('/abonnement' as any); return; }
    setScore(0); setAttempts(0); setCompleted(false); setStarted(true);
    playedRef.current = null;
  }, []);

  const submit = useCallback(() => {
    if (!input.trim() || !current || revealed) return;
    setAttempts(a => a + 1);
    const ok = normalize(input) === normalize(current.hanzi)
            || normalize(input) === normalize(current.pinyin);
    if (ok) {
      setScore(s => s + 1);
      setResult('correct');
      addXp(10).catch(() => {});
      void bumpDailyCounter('dictation');
    } else {
      setResult('incorrect');
      void logError({
        exerciseId: `dictation:${current.hanzi}`,
        source: 'dictation',
        lessonId: '',
        lessonTitle: t('err.fromDictation'),
        prompt: current.pinyin,
        correctAnswer: current.hanzi,
        userAnswer: input.trim(),
        audioHanzi: current.hanzi,
      });
    }
    setRevealed(true);
  }, [input, current, revealed, addXp]);

  const skip = useCallback(() => {
    if (revealed) return;
    setAttempts(a => a + 1);
    setResult(null);
    setRevealed(true);
  }, [revealed]);

  const next = useCallback(() => {
    if (isLast) { setCompleted(true); return; }
    setIdx(i => i + 1);
    setInput(''); setRevealed(false); setResult(null);
  }, [isLast]);

  const goBack = () => router.canGoBack() ? router.back() : router.replace('/(tabs)' as any);

  /**
   * La dictée figure dans la promesse de l'abonnement (« Assistant IA,
   * mini-jeux et dictées ») mais n'était pas verrouillée. `AppAccess` n'a pas
   * de champ dédié : on la rattache à `canUseAI`, qui couvre déjà les
   * fonctions bâties sur les services vocaux Azure.
   */
  const dictationLocked = !access.canUseAI;

  // ── Écran d'intro ─────────────────────────────────────────────
  if (!started) {
    return (
      <SafeAreaView style={[s.root, { backgroundColor: c.appBg }]}>
        <View style={s.header}>
          <TouchableOpacity onPress={goBack} style={s.backBtn}>
            <Ionicons name="arrow-back" size={22} color={c.textPrimary} />
          </TouchableOpacity>
          <Text style={[s.headerTitle, { color: c.textPrimary }]}>{t('dictee.title')}</Text>
          <View style={{ width: 38 }} />
        </View>
        <ScrollView contentContainerStyle={{ padding: 20, gap: 16 }}>
          <Text style={[s.introSub, { color: c.textSecondary }]}>
            {t('dictee.intro')}
          </Text>

          {dictationLocked && (
            <PremiumGate
              colors={c}
              titleKey="gate.dictationTitle"
              bodyKey="gate.dictationBody"
              compact
            />
          )}

          {/* Sélecteur de niveau */}
          <View style={s.levelRow}>
            {LEVELS.map(l => {
              const active = l === level;
              const col = LEVEL_COLORS[l];
              return (
                <TouchableOpacity
                  key={l}
                  style={[s.levelBtn, {
                    backgroundColor: active ? col + '18' : c.cardBg,
                    borderColor: active ? col : c.borderLight,
                  }]}
                  onPress={() => setLevel(l)}
                  activeOpacity={0.7}
                >
                  <Text style={[s.levelBtnTxt, { color: active ? col : c.textTertiary }]}>
                    {l.replace('hsk', 'HSK ')}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={[s.rulesCard, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}>
            <Text style={[s.rulesTitle, { color: c.textPrimary }]}>{t('dictee.howTitle')}</Text>
            {[t('dictee.how1'), t('dictee.how2'), t('dictee.how3'), t('dictee.how4')].map((r, i) => (
              <Text key={i} style={[s.ruleTxt, { color: c.textSecondary }]}>{r}</Text>
            ))}
          </View>

          <TouchableOpacity style={[s.cta, { backgroundColor: accent }]} onPress={start}>
            <Text style={s.ctaTxt}>{t('dictee.start')}</Text>
            <Ionicons name="arrow-forward" size={18} color="#FFF" />
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ── Écran de fin ──────────────────────────────────────────────
  if (completed) {
    return (
      <SafeAreaView style={[s.root, { backgroundColor: c.appBg }]}>
        <View style={s.center}>
          <Text style={s.bigEmoji}>{pct >= 80 ? '🏆' : pct >= 50 ? '👏' : '💪'}</Text>
          <Text style={[s.doneTitle, { color: c.textPrimary }]}>{t('dictee.doneTitle')}</Text>
          <Text style={[s.doneScore, { color: accent }]}>{score}/{phrases.length}</Text>
          <Text style={[s.doneSub, { color: c.textSecondary }]}>
            {pct >= 80 ? 'Excellente oreille !' : pct >= 50 ? t('dictee.wellDone') : t('dictee.tryAgain')}
          </Text>
          <TouchableOpacity style={[s.cta, { backgroundColor: accent, alignSelf: 'stretch', marginHorizontal: 24 }]} onPress={start}>
            <Ionicons name="refresh" size={18} color="#FFF" />
            <Text style={s.ctaTxt}>{t('dictee.replayGame')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.ctaSecondary, { borderColor: c.borderMedium }]} onPress={goBack}>
            <Text style={[s.ctaSecondaryTxt, { color: c.textSecondary }]}>{t('dictee.backHome')}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ── Écran de jeu ──────────────────────────────────────────────
  return (
    <SafeAreaView style={[s.root, { backgroundColor: c.appBg }]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={s.header}>
          <TouchableOpacity onPress={goBack} style={s.backBtn}>
            <Ionicons name="close" size={22} color={c.textPrimary} />
          </TouchableOpacity>
          <Text style={[s.headerTitle, { color: c.textPrimary }]}>{idx + 1}/{phrases.length}</Text>
          <Text style={[s.scoreTxt, { color: accent }]}>{score} ✓</Text>
        </View>

        {/* Barre de progression */}
        <View style={[s.progressTrack, { backgroundColor: c.borderLight }]}>
          <View style={[s.progressFill, { backgroundColor: accent, width: `${((idx + (revealed ? 1 : 0)) / phrases.length) * 100}%` }]} />
        </View>

        <ScrollView contentContainerStyle={{ padding: 20, gap: 16, flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          {/* Bouton écoute */}
          <TouchableOpacity
            style={[s.playBtn, { backgroundColor: accent + '15', borderColor: accent }]}
            onPress={() => current && playUrl(audioPath(current)).catch(() => {})}
            disabled={playing}
            activeOpacity={0.8}
          >
            <Ionicons name={playing ? 'volume-high' : 'play'} size={34} color={accent} />
            <Text style={[s.playTxt, { color: accent }]}>
              {playing ? t('dictee.listening') : t('dictee.replay')}
            </Text>
          </TouchableOpacity>

          {/* Toggle vitesse lente (shadowing) */}
          <TouchableOpacity
            style={[s.slowToggle, {
              backgroundColor: slowMode ? accent + '18' : 'transparent',
              borderColor: slowMode ? accent : c.borderMedium,
            }]}
            onPress={() => setSlowMode(m => !m)}
            activeOpacity={0.7}
          >
            <Text style={{ fontSize: 14 }}>🐢</Text>
            <Text style={[s.slowToggleTxt, { color: slowMode ? accent : c.textTertiary }]}>
              {slowMode ? t('dictee.slowOn') : t('dictee.slow')}
            </Text>
          </TouchableOpacity>

          {/* Saisie */}
          <TextInput
            style={[s.input, {
              backgroundColor: c.cardBg, borderColor: revealed
                ? (result === 'correct' ? '#4CAF50' : '#EF4444')
                : c.borderMedium,
              color: c.textPrimary,
            }]}
            placeholder={t('dictee.placeholder')}
            placeholderTextColor={c.textTertiary}
            value={input}
            onChangeText={setInput}
            editable={!revealed}
            autoCorrect={false}
            autoCapitalize="none"
            onSubmitEditing={submit}
            returnKeyType="done"
          />

          {/* Résultat */}
          {revealed && current && (
            <View style={[s.revealCard, {
              backgroundColor: result === 'correct' ? '#F0FDF4' : '#FEF2F2',
              borderColor: result === 'correct' ? '#86EFAC' : '#FECACA',
            }]}>
              <Text style={[s.revealVerdict, { color: result === 'correct' ? '#15803D' : '#B91C1C' }]}>
                {result === 'correct' ? t('dictee.correct') : result === 'incorrect' ? t('dictee.incorrect') : t('dictee.answerWas')}
              </Text>
              <ToneColoredHanzi hanzi={current.hanzi} pinyin={current.pinyin} enabled={toneColors} style={s.revealHanzi} />
              {showPinyin ? <Text style={[s.revealPinyin, { color: '#6B7280' }]}>{current.pinyin}</Text> : null}
              <Text style={[s.revealFr, { color: '#374151' }]}>{pick(current.translationFr, current.translationEn)}</Text>
            </View>
          )}

          <View style={{ flex: 1 }} />

          {/* Actions */}
          {!revealed ? (
            <View style={s.actionRow}>
              <TouchableOpacity style={[s.ctaSecondary, { borderColor: c.borderMedium, flex: 1 }]} onPress={skip}>
                <Text style={[s.ctaSecondaryTxt, { color: c.textSecondary }]}>{t('dictee.skip')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[s.cta, { backgroundColor: input.trim() ? accent : c.borderMedium, flex: 2 }]}
                onPress={submit}
                disabled={!input.trim()}
              >
                <Text style={s.ctaTxt}>{t('dictee.check')}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={[s.cta, { backgroundColor: accent }]} onPress={next}>
              <Text style={s.ctaTxt}>{isLast ? t('dictee.seeScore') : t('dictee.next')}</Text>
              <Ionicons name="arrow-forward" size={18} color="#FFF" />
            </TouchableOpacity>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingTop: 8, paddingBottom: 12,
  },
  backBtn: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 17, fontWeight: '700' },
  scoreTxt: { fontSize: 15, fontWeight: '800', width: 38, textAlign: 'center' },

  progressTrack: { height: 4, marginHorizontal: 16, borderRadius: 2, overflow: 'hidden' },
  progressFill: { height: 4, borderRadius: 2 },

  introSub: { fontSize: 14.5, lineHeight: 22 },
  levelRow: { flexDirection: 'row', gap: 8 },
  levelBtn: {
    flex: 1, paddingVertical: 12, borderRadius: 12, borderWidth: 1.5,
    alignItems: 'center', justifyContent: 'center',
  },
  levelBtnTxt: { fontSize: 14, fontWeight: '800' },
  rulesCard: { borderRadius: 14, borderWidth: 1, padding: 16, gap: 8 },
  rulesTitle: { fontSize: 15, fontWeight: '700', marginBottom: 2 },
  ruleTxt: { fontSize: 13.5, lineHeight: 20 },

  playBtn: {
    borderRadius: 16, borderWidth: 1.5, paddingVertical: 28,
    alignItems: 'center', justifyContent: 'center', gap: 8,
  },
  playTxt: { fontSize: 14, fontWeight: '700' },

  slowToggle: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    alignSelf: 'center', borderRadius: 20, borderWidth: 1.2,
    paddingHorizontal: 14, paddingVertical: 7, marginTop: -6,
  },
  slowToggleTxt: { fontSize: 12.5, fontWeight: '700' },

  input: {
    borderRadius: 14, borderWidth: 1.5, paddingHorizontal: 16, paddingVertical: 14,
    fontSize: 18,
  },

  revealCard: { borderRadius: 14, borderWidth: 1, padding: 16, gap: 4, alignItems: 'center' },
  revealVerdict: { fontSize: 13, fontWeight: '800', marginBottom: 4 },
  revealHanzi: { fontSize: 26, fontWeight: '500', color: '#111827' },
  revealPinyin: { fontSize: 14 },
  revealFr: { fontSize: 13, fontStyle: 'italic', marginTop: 2 },

  actionRow: { flexDirection: 'row', gap: 10 },
  cta: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    borderRadius: 14, paddingVertical: 15,
  },
  ctaTxt: { color: '#FFF', fontSize: 15.5, fontWeight: '700' },
  ctaSecondary: {
    borderRadius: 14, borderWidth: 1.5, paddingVertical: 15,
    alignItems: 'center', justifyContent: 'center', marginTop: 0,
  },
  ctaSecondaryTxt: { fontSize: 14.5, fontWeight: '600' },

  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10, padding: 24 },
  bigEmoji: { fontSize: 56 },
  doneTitle: { fontSize: 22, fontWeight: '800' },
  doneScore: { fontSize: 40, fontWeight: '900' },
  doneSub: { fontSize: 14.5, marginBottom: 16 },
});
