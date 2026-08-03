/**
 * Simulateur HSK — passation d'une épreuve blanche.
 *
 * Le déroulé reproduit les contraintes de l'examen réel, qui sont l'essentiel
 * de sa difficulté :
 *
 *   - une section à la fois, dans l'ordre officiel ;
 *   - un chronomètre PAR section, pas un chronomètre global ;
 *   - passage automatique à la section suivante quand le temps est écoulé,
 *     sans possibilité de revenir en arrière.
 *
 * On peut en revanche naviguer librement entre les questions d'une même
 * section, comme sur la feuille de réponses papier.
 *
 * La copie finale reprend la présentation du relevé officiel : score par
 * section, total, note de passage, admis ou non.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, TextInput, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';
import { useI18n } from '@/contexts/LanguageContext';
import { useEntitlements } from '@/hooks/useEntitlements';
import { useAudio } from '@/hooks/useAudio';
import { useUserStats } from '@/hooks/useUserStats';
import { PremiumGate } from '@/components/PremiumGate';
import HSK_VOCAB from '@/data/hskVocab.json';
import { LECTURES } from '@/data/cecrLectures';
import { gradeEssay, type EssayGrade } from '@/services/hskGrading';
import {
  BLUEPRINT, countQuestions, generateExam,
  type Exam, type ExamItem, type HskLevel, type SectionId, type VocabEntry, type LongText,
} from '@/data/hskExam';

const LEVELS: HskLevel[] = ['hsk1', 'hsk2', 'hsk3', 'hsk4', 'hsk5', 'hsk6'];

/**
 * Passages longs de la lecture HSK 5-6.
 *
 * Ils viennent des lectures écrites pour l'app, avec LEURS questions de
 * compréhension : un texte long assemblé à partir de phrases de dictionnaire
 * n'aurait ni cohérence ni questions valables. On ne garde que les niveaux
 * avancés, seuls comparables à la difficulté attendue.
 */
const LONG_TEXTS: LongText[] = LECTURES
  .filter(l => ['b2.1', 'b2.2', 'c1.1', 'c1.2', 'c2.1', 'c2.2'].includes(l.level))
  .map(l => ({
    id: l.id,
    level: l.level,
    titleZh: l.titleZh,
    text: l.text,
    questions: l.questions.map(q => ({
      promptFr: q.promptFr,
      choices: q.choices,
      correctIndex: q.correctIndex,
      explanationFr: q.explanationFr,
    })),
  }));
const SECTION_KEY: Record<SectionId, 'hsk.listening' | 'hsk.reading' | 'hsk.writing'> = {
  listening: 'hsk.listening', reading: 'hsk.reading', writing: 'hsk.writing',
};

const mmss = (s: number) =>
  `${Math.floor(s / 60)}:${String(Math.max(0, s % 60)).padStart(2, '0')}`;

export default function SimulateurScreen() {
  const scheme = useColorScheme();
  const c = Colors[scheme];
  const router = useRouter();
  const { t, lang } = useI18n();
  const { access } = useEntitlements();
  const { playHanzi } = useAudio();
  const { addXp } = useUserStats();
  const { level: levelParam } = useLocalSearchParams<{ level?: string }>();

  const [phase, setPhase] = useState<'intro' | 'exam' | 'result'>('intro');
  const [level, setLevel] = useState<HskLevel>(
    LEVELS.includes(levelParam as HskLevel) ? (levelParam as HskLevel) : 'hsk1');
  const [exam, setExam] = useState<Exam | null>(null);
  const [secIdx, setSecIdx] = useState(0);
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [left, setLeft] = useState(0);
  /** Copies de rédaction (HSK 5-6), saisies librement. */
  const [essays, setEssays] = useState<Record<string, string>>({});
  const [grades, setGrades] = useState<Record<string, EssayGrade>>({});
  const [grading, setGrading] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  /** Questions de la section courante, aplaties dans l'ordre officiel. */
  const flat = useMemo(() => {
    if (!exam) return [] as { item: ExamItem; partNo: number; instructionKey: any }[];
    return exam.sections[secIdx].parts.flatMap(p =>
      p.items.map(item => ({ item, partNo: p.partNo, instructionKey: p.instructionKey })));
  }, [exam, secIdx]);

  const current = flat[qIdx];
  const section = exam?.sections[secIdx];

  // ── Chronomètre : une horloge par section ─────────────────────────────────
  useEffect(() => {
    if (phase !== 'exam' || !section) return;
    setLeft(section.minutes * 60);
    timer.current && clearInterval(timer.current);
    timer.current = setInterval(() => {
      setLeft(v => {
        if (v <= 1) { nextSection(); return 0; }
        return v - 1;
      });
    }, 1000);
    return () => { timer.current && clearInterval(timer.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, secIdx]);

  function start() {
    const exam = generateExam(level, HSK_VOCAB as unknown as VocabEntry[], LONG_TEXTS);
    setExam(exam);
    setAnswers({});
    setEssays({});
    setGrades({});
    setSecIdx(0);
    setQIdx(0);
    setPhase('exam');
  }

  function nextSection() {
    timer.current && clearInterval(timer.current);
    setSecIdx(i => {
      if (!exam || i + 1 >= exam.sections.length) { finish(); return i; }
      setQIdx(0);
      return i + 1;
    });
  }

  function confirmNextSection() {
    if (!exam) return;
    const last = secIdx + 1 >= exam.sections.length;
    Alert.alert(
      last ? t('hsk.finishTitle') : t('hsk.nextSectionTitle'),
      last ? t('hsk.finishBody') : t('hsk.nextSectionBody'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        { text: t('hsk.confirm'), onPress: nextSection },
      ],
    );
  }

  async function finish() {
    timer.current && clearInterval(timer.current);
    const essayItems = exam?.sections
      .flatMap(sec => sec.parts).flatMap(p => p.items)
      .filter(it => it.kind === 'write-essay') ?? [];

    if (essayItems.length && (level === 'hsk5' || level === 'hsk6')) {
      setGrading(true);
      setPhase('result');
      // Corrigées en parallèle : jusqu'à deux copies en HSK 5.
      const results = await Promise.all(essayItems.map(it =>
        gradeEssay({ level, subject: it.question || it.prompt, answer: essays[it.id] ?? '', lang })
          .then(g => [it.id, g] as const)));
      setGrades(Object.fromEntries(results));
      setGrading(false);
      return;
    }
    setPhase('result');
  }

  /** Score par section, au barème officiel (points répartis à parts égales). */
  const scores = useMemo(() => {
    if (!exam) return [];
    return exam.sections.map(sec => {
      const items = sec.parts.flatMap(p => p.items);
      const mcq = items.filter(it => it.kind !== 'write-essay');
      const essays = items.filter(it => it.kind === 'write-essay');
      const good = mcq.filter(it => answers[it.id] === it.correctIndex).length;

      // Les points de la section se répartissent au prorata du nombre d'items,
      // rédaction comprise : en HSK 6 elle vaut à elle seule les 100 points.
      const unit = items.length ? sec.points / items.length : 0;
      const mcqPts = good * unit;
      const essayPts = essays.reduce((n, it) => n + ((grades[it.id]?.score ?? 0) / 100) * unit, 0);

      return {
        id: sec.id,
        good,
        total: mcq.length,
        essays: essays.length,
        points: Math.round(mcqPts + essayPts),
        max: sec.points,
      };
    });
  }, [exam, answers, grades]);

  const totalPoints = scores.reduce((n, s) => n + s.points, 0);
  const passed = exam ? totalPoints >= exam.passMark : false;

  // XP à la fin — une seule fois, à l'affichage de la copie.
  const awarded = useRef(false);
  useEffect(() => {
    if (phase === 'result' && exam && !awarded.current) {
      awarded.current = true;
      void addXp(passed ? 120 : 40);
    }
  }, [phase, exam, passed, addXp]);

  // ── Verrou d'abonnement ───────────────────────────────────────────────────
  if (!access.canUseSimulator) {
    return (
      <SafeAreaView style={[s.root, { backgroundColor: c.appBg }]}>
        <Head colors={c} title={t('hsk.title')} onBack={() => router.back()} />
        <PremiumGate colors={c} titleKey="gate.hskTitle" bodyKey="gate.hskBody" />
      </SafeAreaView>
    );
  }

  // ── Accueil ───────────────────────────────────────────────────────────────
  if (phase === 'intro') {
    const plan = BLUEPRINT[level];
    return (
      <SafeAreaView style={[s.root, { backgroundColor: c.appBg }]}>
        <Head colors={c} title={t('hsk.title')} onBack={() => router.back()} />
        <ScrollView contentContainerStyle={s.body}>
          <Text style={[s.intro, { color: c.textSecondary }]}>{t('hsk.intro')}</Text>

          <View style={s.levelRow}>
            {LEVELS.map(l => {
              const on = l === level;
              return (
                <TouchableOpacity
                  key={l}
                  onPress={() => setLevel(l)}
                  activeOpacity={0.8}
                  style={[s.levelBtn, {
                    backgroundColor: on ? c.primaryRed : 'transparent',
                    borderColor: on ? c.primaryRed : c.borderMedium,
                  }]}
                >
                  <Text style={[s.levelTxt, { color: on ? '#FFF' : c.textSecondary }]}>
                    {l.toUpperCase().replace('HSK', 'HSK ')}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={[s.card, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}>
            <Row label={t('hsk.questions')} value={String(countQuestions(level))} colors={c} />
            <Row label={t('hsk.duration')} value={t('hsk.min', { n: plan.minutes })} colors={c} />
            <Row label={t('hsk.scoring')} value={`${plan.sections.reduce((n, x) => n + x.points, 0)}`} colors={c} />
            <Row label={t('hsk.passMark')} value={String(plan.passMark)} colors={c} />
            <View style={[s.sep, { backgroundColor: c.borderLight }]} />
            {plan.sections.map(sec => (
              <Row
                key={sec.id}
                label={t(SECTION_KEY[sec.id])}
                value={`${sec.parts.reduce((n, p) => n + p.count, 0)} · ${t('hsk.min', { n: sec.minutes })}`}
                colors={c}
              />
            ))}
          </View>

          <Text style={[s.warn, { color: c.textTertiary }]}>{t('hsk.audioCaveat')}</Text>

          <TouchableOpacity onPress={start} style={[s.cta, { backgroundColor: c.primaryRed }]} activeOpacity={0.85}>
            <Text style={s.ctaTxt}>{t('hsk.start')}</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ── Copie ─────────────────────────────────────────────────────────────────
  if (phase === 'result' && exam) {
    return (
      <SafeAreaView style={[s.root, { backgroundColor: c.appBg }]}>
        <Head colors={c} title={t('hsk.report')} onBack={() => router.back()} />
        <ScrollView contentContainerStyle={s.body}>
          <View style={[s.card, {
            backgroundColor: c.cardBg,
            borderColor: passed ? c.jadeGreen + '60' : c.primaryRed + '50',
            alignItems: 'center', gap: 6,
          }]}>
            <Text style={s.bigIcon}>{passed ? '🏆' : '📚'}</Text>
            <Text style={[s.total, { color: passed ? c.jadeGreen : c.primaryRed }]}>
              {totalPoints} / {exam.totalPoints}
            </Text>
            <Text style={[s.verdict, { color: c.textPrimary }]}>
              {passed ? t('hsk.passed') : t('hsk.failed')}
            </Text>
            <Text style={[s.warn, { color: c.textTertiary }]}>
              {t('hsk.passMarkIs', { n: exam.passMark })}
            </Text>
          </View>

          {grading && (
            <View style={[s.card, { backgroundColor: c.cardBg, borderColor: c.borderLight, flexDirection: 'row', alignItems: 'center', gap: 10 }]}>
              <ActivityIndicator color={c.primaryRed} />
              <Text style={[s.warn, { color: c.textSecondary, flex: 1 }]}>{t('hsk.grading')}</Text>
            </View>
          )}

          {Object.values(grades).map((g, i) => (
            <View key={i} style={[s.card, {
              backgroundColor: c.cardBg,
              borderColor: g.graded ? c.borderLight : '#F59E0B55',
            }]}>
              <View style={s.row}>
                <Text style={[s.rowLabel, { color: c.textSecondary }]}>{t('hsk.writing')}</Text>
                <Text style={[s.rowValue, { color: c.textPrimary }]}>{g.graded ? `${g.score}/100` : '—'}</Text>
              </View>
              <Text style={[s.warn, { color: c.textSecondary }]}>{g.feedback}</Text>
            </View>
          ))}

          <View style={[s.card, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}>
            {scores.map(sc => (
              <View key={sc.id} style={{ gap: 5 }}>
                <View style={s.row}>
                  <Text style={[s.rowLabel, { color: c.textSecondary }]}>{t(SECTION_KEY[sc.id])}</Text>
                  <Text style={[s.rowValue, { color: c.textPrimary }]}>{sc.points} / {sc.max}</Text>
                </View>
                <View style={[s.track, { backgroundColor: c.borderLight }]}>
                  <View style={{
                    width: `${(sc.points / sc.max) * 100}%` as any,
                    backgroundColor: sc.points >= sc.max * 0.6 ? c.jadeGreen : c.primaryRed,
                    height: 7,
                  }} />
                </View>
                <Text style={[s.warn, { color: c.textTertiary }]}>
                  {t('hsk.correctOf', { n: sc.good, total: sc.total })}
                </Text>
              </View>
            ))}
          </View>

          <TouchableOpacity onPress={() => setPhase('intro')} style={[s.cta, { backgroundColor: c.primaryRed }]} activeOpacity={0.85}>
            <Text style={s.ctaTxt}>{t('hsk.again')}</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ── Passation ─────────────────────────────────────────────────────────────
  if (!current || !section) return null;
  const it = current.item;
  const audible = it.kind === 'listen-truefalse' || it.kind === 'listen-mcq';
  const urgent = left <= 60;

  return (
    <SafeAreaView style={[s.root, { backgroundColor: c.appBg }]}>
      <View style={s.examHead}>
        <View style={{ flex: 1 }}>
          <Text style={[s.sectionName, { color: c.textPrimary }]}>
            {t(SECTION_KEY[section.id])} · {t('hsk.partNo', { n: current.partNo })}
          </Text>
          <Text style={[s.progress, { color: c.textTertiary }]}>
            {qIdx + 1} / {flat.length}
          </Text>
        </View>
        <View style={[s.clock, { backgroundColor: (urgent ? c.primaryRed : c.textSecondary) + '18' }]}>
          <Text style={[s.clockTxt, { color: urgent ? c.primaryRed : c.textSecondary }]}>{mmss(left)}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={s.body}>
        <Text style={[s.instruction, { color: c.textTertiary }]}>{t(current.instructionKey)}</Text>

        <View style={[s.card, { backgroundColor: c.cardBg, borderColor: c.borderLight, alignItems: 'center', gap: 10 }]}>
          {audible ? (
            <>
              <TouchableOpacity
                onPress={() => playHanzi(it.prompt)}
                style={[s.play, { backgroundColor: c.primaryRed }]}
                activeOpacity={0.85}
              >
                <Ionicons name="volume-high" size={26} color="#FFF" />
              </TouchableOpacity>
              <Text style={[s.warn, { color: c.textTertiary }]}>{t('hsk.tapToListen')}</Text>
            </>
          ) : (
            <>
              <Text style={[it.kind === 'read-long' || it.kind === 'write-essay'
                ? s.longText : s.hanzi, { color: c.textPrimary }]}>{it.prompt}</Text>
              {it.kind === 'write-char' && (
                <Text style={[s.warn, { color: c.textTertiary }]}>{it.question}</Text>
              )}
            </>
          )}
          {!audible && it.kind !== 'write-char' && it.kind !== 'write-order' && it.pinyin && (
            <Text style={[s.warn, { color: c.textTertiary }]}>{it.pinyin}</Text>
          )}
        </View>

        {(it.kind === 'listen-truefalse' || it.kind === 'read-truefalse' || it.kind === 'write-order') && (
          <Text style={[s.claim, { color: c.textPrimary }]}>{it.question}</Text>
        )}

        {it.kind === 'write-essay' && (
          <>
            <Text style={[s.warn, { color: c.textTertiary }]}>{t('hsk.essayHint')}</Text>
            <TextInput
              value={essays[it.id] ?? ''}
              onChangeText={v => setEssays(e => ({ ...e, [it.id]: v }))}
              placeholder={t('hsk.essayPh')}
              placeholderTextColor={c.textTertiary}
              multiline
              style={[s.essay, {
                backgroundColor: c.cardBg, borderColor: c.borderLight, color: c.textPrimary,
              }]}
            />
            <Text style={[s.warn, { color: c.textTertiary, textAlign: 'right' }]}>
              {t('hsk.essayChars', { n: (essays[it.id] ?? '').replace(/\s/g, '').length })}
            </Text>
          </>
        )}

        <View style={{ gap: 9 }}>
          {it.choices.map((ch, i) => {
            const on = answers[it.id] === i;
            return (
              <TouchableOpacity
                key={i}
                onPress={() => setAnswers(a => ({ ...a, [it.id]: i }))}
                activeOpacity={0.8}
                style={[s.choice, {
                  backgroundColor: on ? c.primaryRed + '14' : c.cardBg,
                  borderColor: on ? c.primaryRed : c.borderLight,
                }]}
              >
                <Text style={[s.choiceTxt, { color: on ? c.primaryRed : c.textPrimary }]}>{ch}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View style={[s.nav, { borderTopColor: c.borderLight }]}>
        <TouchableOpacity
          onPress={() => setQIdx(i => Math.max(0, i - 1))}
          disabled={qIdx === 0}
          style={[s.navBtn, { opacity: qIdx === 0 ? 0.4 : 1 }]}
        >
          <Ionicons name="chevron-back" size={20} color={c.textSecondary} />
        </TouchableOpacity>

        {qIdx + 1 < flat.length ? (
          <TouchableOpacity
            onPress={() => setQIdx(i => i + 1)}
            style={[s.navMain, { backgroundColor: c.primaryRed }]}
            activeOpacity={0.85}
          >
            <Text style={s.navMainTxt}>{t('hsk.next')}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={confirmNextSection}
            style={[s.navMain, { backgroundColor: c.primaryRed }]}
            activeOpacity={0.85}
          >
            <Text style={s.navMainTxt}>
              {secIdx + 1 >= (exam?.sections.length ?? 1) ? t('hsk.finish') : t('hsk.nextSection')}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

function Head({ colors, title, onBack }: { colors: typeof Colors.light; title: string; onBack: () => void }) {
  return (
    <View style={s.header}>
      <TouchableOpacity onPress={onBack} style={s.back}>
        <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
      </TouchableOpacity>
      <Text style={[s.title, { color: colors.textPrimary }]}>{title}</Text>
    </View>
  );
}

function Row({ label, value, colors }: { label: string; value: string; colors: typeof Colors.light }) {
  return (
    <View style={s.row}>
      <Text style={[s.rowLabel, { color: colors.textSecondary }]}>{label}</Text>
      <Text style={[s.rowValue, { color: colors.textPrimary }]}>{value}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 16, paddingTop: 8, paddingBottom: 10 },
  back: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: '800' },
  body: { paddingHorizontal: 16, paddingBottom: 40, gap: 16 },

  intro: { fontSize: 13.5, lineHeight: 20 },
  levelRow: { flexDirection: 'row', gap: 8 },
  levelBtn: { flex: 1, borderWidth: 1.5, borderRadius: 11, paddingVertical: 10, alignItems: 'center' },
  levelTxt: { fontSize: 13, fontWeight: '800' },

  card: { borderRadius: 14, borderWidth: 1, padding: 15, gap: 10 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  rowLabel: { fontSize: 13 },
  rowValue: { fontSize: 13.5, fontWeight: '700' },
  sep: { height: StyleSheet.hairlineWidth, marginVertical: 3 },
  warn: { fontSize: 11.5, lineHeight: 16 },

  cta: { borderRadius: 14, paddingVertical: 15, alignItems: 'center' },
  ctaTxt: { color: '#FFF', fontSize: 15.5, fontWeight: '800' },

  examHead: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 16, paddingTop: 10, paddingBottom: 8 },
  sectionName: { fontSize: 15, fontWeight: '800' },
  progress: { fontSize: 12 },
  clock: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
  clockTxt: { fontSize: 15, fontWeight: '800', fontVariant: ['tabular-nums'] },

  instruction: { fontSize: 12.5, lineHeight: 18 },
  hanzi: { fontSize: 30, fontWeight: '500' },
  longText: { fontSize: 15.5, lineHeight: 26, alignSelf: 'stretch' },
  play: { width: 62, height: 62, borderRadius: 31, alignItems: 'center', justifyContent: 'center' },
  claim: { fontSize: 15, fontWeight: '600', lineHeight: 21 },
  essay: { borderWidth: 1, borderRadius: 12, padding: 13, minHeight: 190, fontSize: 15, textAlignVertical: 'top' },

  choice: { borderWidth: 1.5, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 13 },
  choiceTxt: { fontSize: 14.5, fontWeight: '600' },

  nav: { flexDirection: 'row', alignItems: 'center', gap: 10, borderTopWidth: 1, paddingHorizontal: 16, paddingTop: 10, paddingBottom: 10 },
  navBtn: { width: 46, height: 46, alignItems: 'center', justifyContent: 'center' },
  navMain: { flex: 1, borderRadius: 13, paddingVertical: 14, alignItems: 'center' },
  navMainTxt: { color: '#FFF', fontSize: 15, fontWeight: '800' },

  bigIcon: { fontSize: 44 },
  total: { fontSize: 30, fontWeight: '800' },
  verdict: { fontSize: 16, fontWeight: '700' },
  track: { height: 7, borderRadius: 4, overflow: 'hidden' },
});
