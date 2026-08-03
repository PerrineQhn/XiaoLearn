/**
 * XiaoLearn Mobile — Évaluation
 * Test de niveau CECR avec questions adaptatives
 */
import { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';
import { useI18n } from '@/contexts/LanguageContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  EVAL_QUESTIONS, EVAL_LEVELS, LEVEL_ROUTE,
  estimateTheta, standardError, levelForTheta, pickNext, shouldStop,
  byLevel as byLevelOf, bySkill as bySkillOf, levelRange,
  START_LEVEL_INDEX, MIN_QUESTIONS, MAX_QUESTIONS,
  type EvalQuestion, type Response,
} from '@/data/evalQuestions';


type Phase = 'intro' | 'quiz' | 'result';

/** Dernier résultat d'évaluation. Lu par l'écran Cours pour ouvrir le bon niveau. */
export const EVAL_KEY = 'xl_level_eval_v1';

export default function EvaluationScreen() {
  const scheme = useColorScheme();
  const c = Colors[scheme];
  const router = useRouter();
  const { width } = useWindowDimensions();
  const px = width >= 768 ? 24 : 16;
  const { t, pick } = useI18n();

  const [phase, setPhase] = useState<Phase>('intro');
  const [responses, setResponses] = useState<Response[]>([]);
  const [q, setQ] = useState<EvalQuestion | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  /**
   * Le test est adaptatif : on ne connaît pas d'avance le nombre de questions.
   * La barre de progression se cale donc sur le minimum tant qu'on ne l'a pas
   * atteint, puis sur le maximum — elle indique un ordre de grandeur honnête
   * plutôt qu'une fausse précision.
   */
  const asked = responses.length;
  const theta = estimateTheta(responses);
  const level = levelForTheta(theta);
  const target = asked < MIN_QUESTIONS ? MIN_QUESTIONS : MAX_QUESTIONS;
  const score = responses.filter(r => r.correct).length;
  const pct = asked > 0 ? Math.round((score / asked) * 100) : 0;
  const se = standardError(theta, responses);

  const start = () => {
    // Première question au milieu de l'échelle : c'est là qu'une réponse
    // apporte le plus d'information quand on ne sait encore rien.
    const first = EVAL_QUESTIONS.filter(x => EVAL_LEVELS.indexOf(x.level) === START_LEVEL_INDEX);
    setResponses([]);
    setSelected(null);
    setQ(first[Math.floor(Math.random() * first.length)] ?? EVAL_QUESTIONS[0]);
    setPhase('quiz');
  };

  const choose = (i: number) => {
    if (selected !== null || !q) return;
    setSelected(i);
    setTimeout(() => {
      const next: Response[] = [...responses, { question: q, correct: i === q.correct }];
      setResponses(next);
      const th = estimateTheta(next);
      if (shouldStop(next, th)) { setPhase('result'); return; }
      const asked = new Set(next.map(r => r.question.q));
      const nq = pickNext(th, asked);
      if (!nq) { setPhase('result'); return; }
      setQ(nq);
      setSelected(null);
    }, 800);
  };

  const byLevel = byLevelOf(responses);
  const bySkill = bySkillOf(responses);

  const reset = () => { setPhase('intro'); setResponses([]); setQ(null); setSelected(null); };

  return (
    <SafeAreaView style={[s.root, { backgroundColor: c.appBg }]}>
      <View style={[s.header, { paddingHorizontal: px }]}>
        <TouchableOpacity onPress={() => router.canGoBack() ? router.back() : router.replace('/(tabs)')} style={s.backBtn}>
          <Ionicons name="arrow-back" size={22} color={c.textPrimary} />
        </TouchableOpacity>
        <Text style={[s.title, { color: c.textPrimary }]}>{t('eval.title')}</Text>
        <View style={{ width: 38 }} />
      </View>

      {phase === 'intro' && (
        <ScrollView contentContainerStyle={[s.center, { paddingHorizontal: px }]}>
          <Text style={s.bigIcon}>🎓</Text>
          <Text style={[s.h1, { color: c.textPrimary }]}>{t('eval.testTitle')}</Text>
          <Text style={[s.sub, { color: c.textSecondary }]}>
            {t('eval.introAdaptive', { min: MIN_QUESTIONS, max: MAX_QUESTIONS })}
          </Text>
          <View style={[s.infoRow, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}>
            {[['⏱', t('eval.mins')], ['❓', t('eval.questionsRange', { min: MIN_QUESTIONS, max: MAX_QUESTIONS })], ['🏅', 'A1 → C1']].map(([icon, txt]) => (
              <View key={txt} style={s.infoItem}>
                <Text style={s.infoIcon}>{icon}</Text>
                <Text style={[s.infoTxt, { color: c.textSecondary }]}>{txt}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity style={[s.startBtn, { backgroundColor: c.primaryRed }]} onPress={start}>
            <Text style={s.startTxt}>{t('eval.start')}</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      {phase === 'quiz' && q && (
        <View style={{ flex: 1, paddingHorizontal: px }}>
          {/* Progress */}
          <View style={[s.progTrack, { backgroundColor: c.primaryRedLight }]}>
            <View style={[s.progBar, {
              width: `${Math.min(100, (asked / target) * 100)}%` as any,
              backgroundColor: c.primaryRed,
            }]} />
          </View>
          <Text style={[s.progTxt, { color: c.textTertiary }]}>
            {t('eval.progress', { n: asked + 1, min: MIN_QUESTIONS, max: MAX_QUESTIONS })}
          </Text>

          <View style={[s.qCard, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}>
            <Text style={[s.levelBadge, { color: c.primaryRed, backgroundColor: c.primaryRedLight }]}>{q.level}</Text>
            <Text style={[s.qTxt, { color: c.textPrimary }]}>{pick(q.q, q.qEn)}</Text>
          </View>

          <View style={{ gap: 10, marginTop: 16 }}>
            {q.choices.map((ch, i) => {
              const isSelected = selected === i;
              const isCorrect = i === q.correct;
              const revealed = selected !== null;
              const bg = revealed
                ? isCorrect ? c.jadeGreenLight : isSelected ? '#FFE8E8' : c.cardBg
                : c.cardBg;
              const border = revealed
                ? isCorrect ? c.jadeGreen : isSelected ? '#FF4D4D' : c.borderLight
                : c.borderLight;
              return (
                <TouchableOpacity
                  key={i}
                  style={[s.choice, { backgroundColor: bg, borderColor: border }]}
                  onPress={() => choose(i)}
                  activeOpacity={0.75}
                >
                  <Text style={[s.choiceTxt, { color: c.textPrimary }]}>{pick(ch, q.choicesEn[i])}</Text>
                  {revealed && isCorrect && <Ionicons name="checkmark-circle" size={20} color={c.jadeGreen} />}
                  {revealed && isSelected && !isCorrect && <Ionicons name="close-circle" size={20} color="#FF4D4D" />}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      )}

      {phase === 'result' && (
        <ScrollView contentContainerStyle={[s.center, { paddingHorizontal: px }]}>
          <Text style={s.bigIcon}>{pct >= 80 ? '🏆' : pct >= 50 ? '👍' : '📚'}</Text>
          <Text style={[s.h1, { color: c.textPrimary }]}>{t('eval.estimated', { level })}</Text>
          <Text style={[s.sub, { color: c.textSecondary }]}>{t('eval.score', { score, total: asked, pct })}</Text>
          <View style={[s.levelCard, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}>
            <Text style={[s.levelCardTxt, { color: c.primaryRed }]}>{level}</Text>
            {(() => {
              const r = levelRange(theta, se);
              // Fourchette affichée seulement si elle apporte une information :
              // annoncer « B1.1 à B1.1 » n'aurait aucun sens.
              return r.low !== r.high ? (
                <Text style={[s.rangeTxt, { color: c.textTertiary }]}>
                  {t('eval.range', { low: r.low, high: r.high })}
                </Text>
              ) : null;
            })()}
            <Text style={[s.levelDesc, { color: c.textSecondary }]}>
              {level.startsWith('A1') ? t('eval.descA1')
                : level.startsWith('A2') ? t('eval.descA2')
                : level.startsWith('B1') ? t('eval.descB1')
                : level.startsWith('B2') ? t('eval.descB2') : t('eval.descC1')}
            </Text>
          </View>

          {/* Détail par palier : montre à quel étage la marche a cédé. */}
          <View style={[s.detail, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}>
            <Text style={[s.detailTitle, { color: c.textPrimary }]}>{t('eval.byLevel')}</Text>
            {byLevel.map(r => {
              const ok = r.total > 0 && r.good / r.total >= 2 / 3;
              return (
                <View key={r.level} style={s.detailRow}>
                  <Text style={[s.detailLabel, { color: c.textSecondary }]}>{r.level}</Text>
                  <View style={[s.detailTrack, { backgroundColor: c.borderLight }]}>
                    <View style={{
                      width: `${(r.good / Math.max(1, r.total)) * 100}%` as any,
                      backgroundColor: ok ? c.jadeGreen : c.primaryRed, height: 7,
                    }} />
                  </View>
                  <Text style={[s.detailVal, { color: c.textTertiary }]}>{r.good}/{r.total}</Text>
                </View>
              );
            })}
          </View>

          {/* Détail par compétence : dit QUOI réviser, pas seulement où. */}
          <View style={[s.detail, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}>
            <Text style={[s.detailTitle, { color: c.textPrimary }]}>{t('eval.bySkill')}</Text>
            {bySkill.map(r => (
              <View key={r.skill} style={s.detailRow}>
                <Text style={[s.detailLabel, { color: c.textSecondary, width: 96 }]}>
                  {t(('eval.skill.' + r.skill) as any)}
                </Text>
                <View style={[s.detailTrack, { backgroundColor: c.borderLight }]}>
                  <View style={{
                    width: `${(r.good / Math.max(1, r.total)) * 100}%` as any,
                    backgroundColor: r.good / r.total >= 2 / 3 ? c.jadeGreen : '#F59E0B', height: 7,
                  }} />
                </View>
                <Text style={[s.detailVal, { color: c.textTertiary }]}>{r.good}/{r.total}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity
            style={[s.startBtn, { backgroundColor: c.primaryRed }]}
            onPress={() => {
              // Le résultat n'était écrit nulle part et le bouton n'emportait
              // pas le niveau : on retombait sur la sélection automatique, et
              // relancer l'écran repartait de zéro.
              void AsyncStorage.setItem(EVAL_KEY, JSON.stringify({
                // theta et se sont conservés : ils permettront de dire, à un
                // second passage, si le niveau a bougé ou si c'est du bruit.
                level, score, total: asked, pct, theta, se,
                at: new Date().toISOString(),
              }));
              router.push({
                pathname: '/(tabs)/cours',
                // Les identifiants sont 'cecr-a1', 'cecr-b1-1'… : un simple
                // toLowerCase() produisait 'cecr-b1', qui n'existe pas, et
                // l'écran Cours retombait sur sa sélection automatique.
                params: { level: LEVEL_ROUTE[level] },
              } as any);
            }}
          >
            <Text style={s.startTxt}>{t('eval.goLessons', { level })}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={reset} style={s.retryBtn}>
            <Text style={[s.retryTxt, { color: c.textTertiary }]}>{t('eval.retry')}</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8, paddingBottom: 16 },
  backBtn: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 18, fontWeight: '700' },
  center: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 20, paddingBottom: 60 },
  bigIcon: { fontSize: 64, marginBottom: 16 },
  h1: { fontSize: 22, fontWeight: '800', textAlign: 'center', marginBottom: 10 },
  sub: { fontSize: 14, textAlign: 'center', lineHeight: 22, marginBottom: 24 },
  infoRow: { flexDirection: 'row', borderRadius: 16, borderWidth: 1, padding: 16, gap: 16, marginBottom: 28, width: '100%', justifyContent: 'space-around' },
  infoItem: { alignItems: 'center', gap: 4 },
  infoIcon: { fontSize: 22 },
  infoTxt: { fontSize: 12, fontWeight: '600' },
  startBtn: { borderRadius: 16, paddingVertical: 14, paddingHorizontal: 40, marginBottom: 12 },
  startTxt: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  progTrack: { height: 6, borderRadius: 3, marginBottom: 8, overflow: 'hidden', marginTop: 4 },
  progBar: { height: 6, borderRadius: 3 },
  progTxt: { fontSize: 12, textAlign: 'right', marginBottom: 16 },
  qCard: { borderRadius: 16, borderWidth: 1, padding: 20 },
  levelBadge: { fontSize: 11, fontWeight: '700', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, alignSelf: 'flex-start', marginBottom: 10, overflow: 'hidden' },
  qTxt: { fontSize: 17, fontWeight: '600', lineHeight: 26 },
  choice: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 14, borderWidth: 1, padding: 14 },
  choiceTxt: { fontSize: 14, flex: 1 },
  levelCard: { borderRadius: 16, borderWidth: 1, padding: 20, width: '100%', alignItems: 'center', marginBottom: 24 },
  rangeTxt: { fontSize: 12, marginTop: 2 },
  detail: { alignSelf: 'stretch', borderRadius: 14, borderWidth: 1, padding: 14, gap: 9, marginTop: 14 },
  detailTitle: { fontSize: 14, fontWeight: '800', marginBottom: 2 },
  detailRow: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  detailLabel: { fontSize: 12.5, fontWeight: '700', width: 44 },
  detailTrack: { flex: 1, height: 7, borderRadius: 4, overflow: 'hidden' },
  detailVal: { fontSize: 11.5, width: 34, textAlign: 'right' },
  levelCardTxt: { fontSize: 42, fontWeight: '900', marginBottom: 8 },
  levelDesc: { fontSize: 13, textAlign: 'center', lineHeight: 20 },
  retryBtn: { padding: 12 },
  retryTxt: { fontSize: 13 },
});
