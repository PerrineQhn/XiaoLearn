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
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, TextInput, ActivityIndicator, Image, Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams, useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import { HSK_BINGJU } from '@/data/hskBingju';
import { HSK_IMAGES } from '@/data/hskImages';
import { dialogues as APP_DIALOGUES } from '@/data/dialogues';
import { loadDialogueManifest, type DialogueAudioManifest } from '@/hooks/useDialogueAudio';
import { logErrors, type ErrorEntry } from '@/data/errorLog';
import type { ExamDialogue } from '@/data/hskExam';
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
// Tous les niveaux sont transmis : le générateur réserve les textes avancés
// à la lecture longue du HSK 5-6 et puise dans les niveaux intermédiaires
// pour les triplets du 排序 (HSK 4).
const LONG_TEXTS: LongText[] = LECTURES
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

const SECTION_ICON: Record<SectionId, keyof typeof Ionicons.glyphMap> = {
  listening: 'headset', reading: 'book-outline', writing: 'create-outline',
};

/**
 * Dialogues de l'app aplatis pour l'épreuve d'écoute : les répliques sont
 * jouées l'une après l'autre (deux timbres alternés), puis les questions du
 * quiz — écrites pour CE dialogue — s'enchaînent, comme les 段话 du HSK.
 */
const EXAM_DIALOGUES: ExamDialogue[] = APP_DIALOGUES
  .filter(d => (d.dialogue.quiz?.length ?? 0) > 0)
  .map(d => ({
    id: d.dialogue.id,
    level: d.cecrLevel,
    lines: d.dialogue.lines.map(l => l.hanzi),
    questions: (d.dialogue.quiz ?? []).map(q => ({
      questionFr: q.questionFr,
      choicesFr: q.choicesFr,
      correct: q.correct,
    })),
  }));

/** Historique des épreuves blanches — relevés persistés localement. */
export const HSK_HISTORY_KEY = '@xiaolearn/hsk_history';
export interface HskAttempt {
  date: number;
  level: HskLevel;
  points: number;
  max: number;
  passed: boolean;
  sections: { id: SectionId; points: number; max: number }[];
}

/**
 * Mode d'emploi de chaque type d'exercice, pour la page intercalaire.
 * La consigne officielle (`instructionKey`) dit QUOI faire ; ces textes
 * disent COMMENT ça va se passer — audio automatique, réponse en chinois…
 */
const KIND_HELP: Record<string, string> = {
  'listen-truefalse': 'hsk.k.ltf',
  'listen-mcq':       'hsk.k.lmcq',
  'listen-dialogue':  'hsk.k.ldlg',
  'write-pic':        'hsk.k.pic',
  'listen-pic-tf':    'hsk.k.picTf',
  'listen-pic-mcq':   'hsk.k.picMcq',
  'read-pic-tf':      'hsk.k.readPicTf',
  'read-pic-match':   'hsk.k.picMatch',
  'read-truefalse':   'hsk.k.rtf',
  'read-match':       'hsk.k.match',
  'read-cloze':       'hsk.k.cloze',
  'read-passage':     'hsk.k.passage',
  'read-sort':        'hsk.k.sort',
  'read-bingju':      'hsk.k.bingju',
  'write-order':      'hsk.k.order',
  'write-char':       'hsk.k.char',
  'read-long':        'hsk.k.long',
  'write-essay':      'hsk.k.essay',
};

const isListening = (k: string) => k.startsWith('listen-');

const mmss = (s: number) =>
  `${Math.floor(s / 60)}:${String(Math.max(0, s % 60)).padStart(2, '0')}`;

export default function SimulateurScreen() {
  const scheme = useColorScheme();
  const c = Colors[scheme];
  const router = useRouter();
  const navigation = useNavigation();
  const { t, lang } = useI18n();
  const { access } = useEntitlements();
  const { playHanzi, playHanziSeq } = useAudio();
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

  /**
   * Page intercalaire de début de partie. À l'examen réel, chaque 部分
   * s'ouvre sur ses consignes ; ici, passer de « juge l'affirmation » à
   * « complète la phrase » sans transition désoriente. On ne la montre
   * qu'une fois par partie : revenir en arrière ne la réaffiche pas.
   */
  const [introKey, setIntroKey] = useState<string | null>(null);
  const shownIntros = useRef<Set<string>>(new Set());

  /**
   * Écoutes comptées PAR ITEM, comme à l'examen : l'audio passe deux fois
   * aux HSK 1-2, une seule fois à partir du HSK 3. La lecture automatique
   * consomme la première écoute. `bump` force le re-rendu du compteur.
   */
  const plays = useRef<Record<string, number>>({});
  const [, bump] = useState(0);
  const maxPlays = level === 'hsk1' || level === 'hsk2' ? 2 : 1;

  /** 缩写 (HSK 6) : heure de première lecture du texte, item par item. */
  const essayShownAt = useRef<Record<string, number>>({});

  /** 连词成句 : segments déjà posés (indices), item par item. */
  const [built, setBuilt] = useState<Record<string, number[]>>({});

  /** Grille de navigation (feuille de réponses) — visible ou non. */
  const [gridOpen, setGridOpen] = useState(false);

  /** Historique des épreuves, pour l'écran d'accueil. */
  const [history, setHistory] = useState<HskAttempt[]>([]);
  useEffect(() => {
    if (phase !== 'intro') return;
    AsyncStorage.getItem(HSK_HISTORY_KEY)
      .then(raw => { if (raw) setHistory(JSON.parse(raw)); })
      .catch(() => {});
  }, [phase]);

  /** Items déjà versés au cahier d'erreurs — pour griser le bouton. */
  const [logged, setLogged] = useState<Set<string>>(new Set());

  // ── Garde-fou : quitter une épreuve en cours perd la copie ────────────────
  useEffect(() => {
    if (phase !== 'exam') return;
    const sub = navigation.addListener('beforeRemove', (e: any) => {
      e.preventDefault();
      Alert.alert(t('hsk.quitTitle'), t('hsk.quitBody'), [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('hsk.quitConfirm'), style: 'destructive',
          onPress: () => navigation.dispatch(e.data.action),
        },
      ]);
    });
    return sub;
  }, [phase, navigation, t]);

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

  // ── Intercalaire : détecter l'entrée dans une partie jamais vue ──────────
  useEffect(() => {
    if (phase !== 'exam') return;
    const cur = flat[qIdx];
    if (!cur) return;
    const key = `${secIdx}-${cur.partNo}`;
    if (!shownIntros.current.has(key)) {
      shownIntros.current.add(key);
      setIntroKey(key);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, secIdx, qIdx, flat]);

  // ── Lecture automatique : à l'examen, l'audio part sans qu'on le demande ──
  // Un léger délai laisse l'écran se poser. Elle consomme la première écoute
  // du quota ; tant que l'intercalaire est affiché, rien ne joue.
  useEffect(() => {
    if (phase !== 'exam' || introKey) return;
    const it = flat[qIdx]?.item;
    if (!it || !isListening(it.kind)) return;
    if ((plays.current[it.id] ?? 0) >= maxPlays) return;
    // Un dialogue est joué au PREMIER item de son groupe ; les questions
    // suivantes partagent l'audio déjà entendu, comme à l'examen.
    if (it.group && flat[qIdx - 1]?.item.group === it.group) return;
    const h = setTimeout(() => playItem(it), 450);
    return () => clearTimeout(h);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, secIdx, qIdx, flat, introKey]);

  function start() {
    const exam = generateExam(level, HSK_VOCAB as unknown as VocabEntry[], LONG_TEXTS, HSK_BINGJU, EXAM_DIALOGUES);
    setExam(exam);
    setAnswers({});
    setEssays({});
    setGrades({});
    setBuilt({});
    setSecIdx(0);
    setQIdx(0);
    shownIntros.current.clear();
    setIntroKey(null);
    plays.current = {};
    essayShownAt.current = {};
    awarded.current = false;
    setLogged(new Set());
    setGridOpen(false);
    setPhase('exam');
  }

  /** Manifest des dialogues doublés (Azure, une voix par locuteur). */
  const dlgManifest = useRef<DialogueAudioManifest>({});
  useEffect(() => { loadDialogueManifest().then(m => { dlgManifest.current = m; }); }, []);

  /** Joue l'audio d'un item en décomptant l'écoute ; refuse au-delà du quota. */
  function playItem(it: ExamItem) {
    const n = plays.current[it.id] ?? 0;
    if (n >= maxPlays) return;
    plays.current[it.id] = n + 1;
    bump(x => x + 1);
    if (it.audioLines?.length) {
      // `group` porte l'id du dialogue (préfixe dlg-) : les pistes doublées
      // du manifest priment, la synthèse à deux timbres reste le secours.
      const urls = it.group ? dlgManifest.current[it.group.slice(4)]?.lines : undefined;
      void playHanziSeq(it.audioLines, urls);
    } else {
      void playHanzi(it.prompt);
    }
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
      .filter(it => it.kind === 'write-essay' || it.kind === 'write-pic') ?? [];

    if (essayItems.length) {
      setGrading(true);
      setPhase('result');
      // Corrigées en parallèle. Le 看图写作 passe par le même moteur, avec
      // un sujet qui impose le mot ; le grader ne voit pas l'image, il note
      // la phrase et l'emploi du mot — c'est ce que note aussi l'examinateur.
      const results = await Promise.all(essayItems.map(it =>
        gradeEssay({
          level: level === 'hsk6' ? 'hsk6' : 'hsk5',
          subject: it.kind === 'write-pic'
            ? `看图用词造句：请用「${it.prompt}」写一个句子。`
            : (it.question || it.prompt),
          answer: essays[it.id] ?? '',
          lang,
        }).then(g => [it.id, g] as const)));
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
      const mcq = items.filter(it => it.kind !== 'write-essay' && it.kind !== 'write-pic');
      const essays = items.filter(it => it.kind === 'write-essay' || it.kind === 'write-pic');
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

  // XP et historique à la fin — une seule fois, quand la correction des
  // rédactions est terminée (les points d'écriture en dépendent).
  const awarded = useRef(false);
  useEffect(() => {
    if (phase !== 'result' || !exam || grading || awarded.current) return;
    awarded.current = true;
    void addXp(passed ? 120 : 40);
    const attempt: HskAttempt = {
      date: Date.now(),
      level,
      points: totalPoints,
      max: exam.totalPoints,
      passed,
      sections: scores.map(sc => ({ id: sc.id, points: sc.points, max: sc.max })),
    };
    AsyncStorage.getItem(HSK_HISTORY_KEY)
      .then(raw => {
        const all: HskAttempt[] = raw ? JSON.parse(raw) : [];
        all.push(attempt);
        return AsyncStorage.setItem(HSK_HISTORY_KEY, JSON.stringify(all.slice(-60)));
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, exam, grading, passed, addXp]);

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

          {/* Les dernières copies : voir sa progression est la moitié de
              l'intérêt d'une épreuve blanche. */}
          {history.length > 0 && (
            <View style={[s.card, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}>
              <Text style={[s.rowValue, { color: c.textPrimary }]}>{t('hsk.historyTitle')}</Text>
              {history.slice(-6).reverse().map((h, i) => (
                <View key={i} style={s.row}>
                  <Text style={[s.rowLabel, { color: c.textSecondary }]}>
                    {h.level.toUpperCase().replace('HSK', 'HSK ')} · {new Date(h.date).toLocaleDateString()}
                  </Text>
                  <Text style={[s.rowValue, { color: h.passed ? c.jadeGreen : c.primaryRed }]}>
                    {h.points} / {h.max} {h.passed ? '✓' : '✗'}
                  </Text>
                </View>
              ))}
            </View>
          )}
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

          {/* ── Correction détaillée : la copie, question par question ──────
              C'est elle qui transforme l'épreuve blanche en outil de travail :
              chaque item montre l'énoncé (l'audio est révélé, l'examen est
              fini), ta réponse, la bonne, et l'explication. */}
          {(() => {
            const review = exam.sections.flatMap(sec =>
              sec.parts.flatMap(p => p.items)
                .filter(it => it.kind !== 'write-essay' && it.kind !== 'write-pic')
                .map(it => ({ sec: sec.id, it })));
            const wrong = review.filter(({ it }) => answers[it.id] !== it.correctIndex);

            const entryOf = (it: ExamItem): Omit<ErrorEntry, 'timestamp'> => ({
              // L'id du item entre dans la clé : deux questions bâties sur la
              // même phrase (une à l'écoute, une en lecture) sont deux fautes
              // distinctes et ne doivent pas se remplacer l'une l'autre.
              exerciseId: `hsk:${level}:${it.kind}:${it.id}:${(it.explanation || it.prompt).slice(0, 40)}`,
              source: 'hsk',
              lessonId: level,
              lessonTitle: `HSK ${level.slice(3)}`,
              prompt: it.question || it.prompt,
              correctAnswer: it.choices[it.correctIndex] ?? '',
              userAnswer: it.choices[answers[it.id] ?? -1] ?? '—',
              audioHanzi: /[一-鿿]/.test(it.prompt) && !it.audioLines ? it.prompt : undefined,
              explanation: it.explanation || undefined,
            });

            const toError = (its: ExamItem[]) => {
              if (!its.length) return;
              // Une seule écriture pour tout le lot : dix logError lancés en
              // parallèle se seraient écrasés les uns les autres.
              void logErrors(its.map(entryOf));
              setLogged(prev => {
                const next = new Set(prev);
                its.forEach(it => next.add(it.id));
                return next;
              });
            };

            return (
              <>
                <View style={s.reviewHead}>
                  <Text style={[s.rowValue, { color: c.textPrimary }]}>{t('hsk.reviewTitle')}</Text>
                  {wrong.length > 0 && (
                    <TouchableOpacity onPress={() => toError(wrong.map(w => w.it))}>
                      <Text style={[s.warn, { color: c.primaryRed, fontWeight: '700' }]}>
                        {t('hsk.logAll', { n: wrong.length })}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
                {review.map(({ it }, idx) => {
                  const your = answers[it.id];
                  const ok = your === it.correctIndex;
                  return (
                    <View
                      key={it.id}
                      style={[s.card, {
                        backgroundColor: c.cardBg,
                        borderColor: ok ? c.jadeGreen + '45' : c.primaryRed + '45',
                        gap: 6,
                      }]}
                    >
                      <View style={s.row}>
                        <Text style={[s.warn, { color: c.textTertiary }]}>
                          {idx + 1} · {t(SECTION_KEY[review[idx].sec])}
                        </Text>
                        <Ionicons
                          name={ok ? 'checkmark-circle' : 'close-circle'}
                          size={17}
                          color={ok ? c.jadeGreen : c.primaryRed}
                        />
                      </View>
                      {!!it.prompt && (
                        <Text style={[s.reviewPrompt, { color: c.textPrimary }]}>
                          {it.audioLines ? it.audioLines.join('\n') : it.prompt}
                        </Text>
                      )}
                      {!!it.pinyin && <Text style={[s.warn, { color: c.textTertiary }]}>{it.pinyin}</Text>}
                      {!!it.question && it.question !== it.prompt && (
                        <Text style={[s.warn, { color: c.textSecondary }]}>{it.question}</Text>
                      )}
                      <Text style={[s.reviewLine, { color: c.jadeGreen }]}>
                        ✓ {it.choices[it.correctIndex]}
                      </Text>
                      {!ok && (
                        <Text style={[s.reviewLine, { color: c.primaryRed }]}>
                          ✗ {your != null && your >= 0 && it.choices[your] != null
                            ? it.choices[your]
                            : t('hsk.noAnswer')}
                        </Text>
                      )}
                      {!!it.explanation && it.explanation !== it.choices[it.correctIndex] && (
                        <Text style={[s.warn, { color: c.textSecondary }]}>{it.explanation}</Text>
                      )}
                      {!ok && (
                        <TouchableOpacity onPress={() => toError([it])} disabled={logged.has(it.id)}>
                          <Text style={[s.warn, {
                            color: logged.has(it.id) ? c.textTertiary : c.primaryRed,
                            fontWeight: '700',
                          }]}>
                            {logged.has(it.id) ? t('hsk.loggedOne') : t('hsk.logOne')}
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  );
                })}
              </>
            );
          })()}

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
  const audible = isListening(it.kind);
  const urgent = left <= 60;
  const playCount = plays.current[it.id] ?? 0;
  const playsLeft = Math.max(0, maxPlays - playCount);

  // 缩写 (HSK 6) : le texte source n'est visible que dix minutes, comme à
  // l'examen — ensuite on résume de mémoire. Le tick du chrono re-rend
  // l'écran chaque seconde, le compte à rebours suit tout seul.
  const isHsk6Essay = it.kind === 'write-essay' && level === 'hsk6' && !!it.question;
  if (isHsk6Essay && !essayShownAt.current[it.id]) essayShownAt.current[it.id] = Date.now();
  const essayReadLeft = isHsk6Essay
    ? Math.max(0, 600 - Math.floor((Date.now() - essayShownAt.current[it.id]) / 1000))
    : 0;

  // ── Intercalaire de début de partie ───────────────────────────────────────
  // Le chronomètre reste visible et continue de tourner : à l'examen aussi,
  // le temps des consignes est pris sur celui de la section.
  if (introKey) {
    const partCount = flat.filter(f => f.partNo === current.partNo).length;
    return (
      <SafeAreaView style={[s.root, { backgroundColor: c.appBg }]}>
        <View style={s.examHead}>
          <View style={{ flex: 1 }}>
            <Text style={[s.sectionName, { color: c.textPrimary }]}>{t(SECTION_KEY[section.id])}</Text>
          </View>
          <View style={[s.clock, { backgroundColor: (urgent ? c.primaryRed : c.textSecondary) + '18' }]}>
            <Text style={[s.clockTxt, { color: urgent ? c.primaryRed : c.textSecondary }]}>{mmss(left)}</Text>
          </View>
        </View>

        <View style={s.introWrap}>
          <View style={[s.introBadge, { backgroundColor: c.primaryRed + '16' }]}>
            <Ionicons name={SECTION_ICON[section.id]} size={34} color={c.primaryRed} />
          </View>
          <Text style={[s.introPart, { color: c.textTertiary }]}>
            {t(SECTION_KEY[section.id])} · {t('hsk.partNo', { n: current.partNo })}
          </Text>
          <Text style={[s.introRule, { color: c.textPrimary }]}>{t(current.instructionKey)}</Text>
          <Text style={[s.introHelp, { color: c.textSecondary }]}>
            {t((
              // À partir du HSK 3, l'appariement s'inverse : consigne en
              // français, réponses en chinois — le mode d'emploi aussi.
              (it.kind === 'read-match' || it.kind === 'read-passage') &&
              level !== 'hsk1' && level !== 'hsk2'
                ? 'hsk.k.match2'
                : KIND_HELP[it.kind] ?? 'hsk.k.match'
            ) as any)}
          </Text>
          <Text style={[s.introCount, { color: c.textTertiary }]}>
            {t('hsk.partQuestions', { n: partCount })}
          </Text>
        </View>

        <View style={{ paddingHorizontal: 16, paddingBottom: 12 }}>
          <TouchableOpacity
            onPress={() => setIntroKey(null)}
            style={[s.cta, { backgroundColor: c.primaryRed }]}
            activeOpacity={0.85}
          >
            <Text style={s.ctaTxt}>{t('hsk.beginPart')}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

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
        {/* La feuille de réponses : répondu / pas répondu, saut direct. */}
        <TouchableOpacity onPress={() => setGridOpen(true)} hitSlop={8} style={s.gridBtn}>
          <Ionicons name="apps-outline" size={21} color={c.textSecondary} />
        </TouchableOpacity>
        <View style={[s.clock, { backgroundColor: (urgent ? c.primaryRed : c.textSecondary) + '18' }]}>
          <Text style={[s.clockTxt, { color: urgent ? c.primaryRed : c.textSecondary }]}>{mmss(left)}</Text>
        </View>
      </View>

      {gridOpen && (
        <Modal transparent animationType="fade" onRequestClose={() => setGridOpen(false)}>
          {/* Le fond fermant est une couche séparée : en parent du panneau,
              il empêchait la grille de défiler. Et il FAUT qu'elle défile —
              en HSK 6, 101 numéros ne tiennent pas dans 75 % de hauteur, les
              derniers étaient simplement hors d'atteinte. */}
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={[StyleSheet.absoluteFill, s.gridScrim]}
              activeOpacity={1}
              onPress={() => setGridOpen(false)}
            />
            <View style={s.gridBackdrop} pointerEvents="box-none">
            <View style={[s.gridPanel, { backgroundColor: c.appBg, borderColor: c.borderLight }]}>
              <Text style={[s.rowValue, { color: c.textPrimary, marginBottom: 10 }]}>
                {t('hsk.answerSheet', { n: Object.keys(answers).filter(id => flat.some(f => f.item.id === id)).length, total: flat.length })}
              </Text>
              <ScrollView showsVerticalScrollIndicator={false}>
              <View style={s.gridWrap}>
                {flat.map((f, i) => {
                  const answered = answers[f.item.id] != null;
                  const isCur = i === qIdx;
                  return (
                    <TouchableOpacity
                      key={f.item.id}
                      onPress={() => { setQIdx(i); setGridOpen(false); }}
                      style={[s.gridCell, {
                        backgroundColor: answered ? c.primaryRed + '18' : c.cardBg,
                        borderColor: isCur ? c.primaryRed : answered ? c.primaryRed + '60' : c.borderLight,
                        borderWidth: isCur ? 2 : 1,
                      }]}
                    >
                      <Text style={[s.gridCellTxt, { color: answered ? c.primaryRed : c.textSecondary }]}>
                        {i + 1}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              </ScrollView>
            </View>
            </View>
          </View>
        </Modal>
      )}

      <ScrollView contentContainerStyle={s.body}>
        <Text style={[s.instruction, { color: c.textTertiary }]}>{t(current.instructionKey)}</Text>

        {(audible || !!it.prompt || !!it.image) && (
          <View style={[s.card, { backgroundColor: c.cardBg, borderColor: c.borderLight, alignItems: 'center', gap: 10 }]}>
            {/* Photo réelle quand elle existe, pictogramme sinon. */}
            {!!it.image && it.kind !== 'listen-pic-mcq' && (
              HSK_IMAGES[it.imageKey ?? ''] ? (
                <Image source={HSK_IMAGES[it.imageKey!]} style={s.photo} resizeMode="cover" />
              ) : (
                <Text style={s.picture}>{it.image}</Text>
              )
            )}
            {audible ? (
              <>
                <TouchableOpacity
                  onPress={() => playItem(it)}
                  disabled={playsLeft === 0}
                  style={[s.play, { backgroundColor: playsLeft === 0 ? c.borderMedium : c.primaryRed }]}
                  activeOpacity={0.85}
                >
                  <Ionicons name={playsLeft === 0 ? 'volume-mute' : 'volume-high'} size={26} color="#FFF" />
                </TouchableOpacity>
                <Text style={[s.warn, { color: c.textTertiary }]}>
                  {playsLeft > 0 ? t('hsk.playsLeft', { n: playsLeft }) : t('hsk.playsOut')}
                </Text>
              </>
            ) : (
              <>
                {!!it.prompt && (
                  <Text style={[
                    it.kind === 'read-long' || it.kind === 'write-essay' || it.kind === 'read-sort'
                      ? s.longText
                      : /[一-鿿]/.test(it.prompt) ? s.hanzi : s.frPrompt,
                    { color: c.textPrimary }]}>{it.prompt}</Text>
                )}
                {it.kind === 'write-char' && (
                  <Text style={[s.warn, { color: c.textTertiary }]}>{it.question}</Text>
                )}
              </>
            )}
            {!audible && it.kind !== 'write-char' && it.kind !== 'write-order' && it.pinyin && (
              <Text style={[s.warn, { color: c.textTertiary }]}>{it.pinyin}</Text>
            )}
          </View>
        )}

        {(it.kind === 'listen-truefalse' || it.kind === 'read-truefalse' ||
          it.kind === 'write-order' || it.kind === 'listen-dialogue') && !!it.question && (
          <Text style={[s.claim, { color: c.textPrimary }]}>{it.question}</Text>
        )}

        {/* Phrase à trou : la traduction française sert de contexte — c'est
            elle qui dit ce que le mot manquant doit vouloir dire. */}
        {it.kind === 'read-cloze' && !!it.question && (
          <Text style={[s.claim, { color: c.textSecondary, fontStyle: 'italic' }]}>
            « {it.question} »
          </Text>
        )}

        {/* 连词成句 : on assemble la phrase segment par segment. */}
        {it.kind === 'write-order' && !!it.segments && (() => {
          const used = built[it.id] ?? [];
          const toggle = (idx: number) => {
            const next = used.includes(idx) ? used.filter(x => x !== idx) : [...used, idx];
            setBuilt(b => ({ ...b, [it.id]: next }));
            setAnswers(a => {
              const na = { ...a };
              if (next.length === it.segments!.length) {
                // Réponse posée : bonne si l'assemblage reproduit la phrase.
                na[it.id] = next.map(x => it.segments![x]).join('') === it.choices[0] ? 0 : -9;
              } else {
                delete na[it.id];
              }
              return na;
            });
          };
          return (
            <View style={{ gap: 10 }}>
              <View style={[s.builtZone, { borderColor: c.borderMedium, backgroundColor: c.cardBg }]}>
                {used.length === 0 ? (
                  <Text style={[s.warn, { color: c.textTertiary }]}>{t('hsk.orderBuild')}</Text>
                ) : (
                  <View style={s.segRow}>
                    {used.map(idx => (
                      <TouchableOpacity
                        key={idx}
                        onPress={() => toggle(idx)}
                        style={[s.seg, { backgroundColor: c.primaryRed + '14', borderColor: c.primaryRed }]}
                      >
                        <Text style={[s.segTxt, { color: c.primaryRed }]}>{it.segments![idx]}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
              <View style={s.segRow}>
                {it.segments.map((sg, idx) => used.includes(idx) ? null : (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => toggle(idx)}
                    style={[s.seg, { backgroundColor: c.cardBg, borderColor: c.borderMedium }]}
                  >
                    <Text style={[s.segTxt, { color: c.textPrimary }]}>{sg}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              {used.length > 0 && (
                <TouchableOpacity
                  onPress={() => {
                    setBuilt(b => ({ ...b, [it.id]: [] }));
                    setAnswers(a => { const na = { ...a }; delete na[it.id]; return na; });
                  }}
                >
                  <Text style={[s.warn, { color: c.textTertiary, textAlign: 'center' }]}>{t('hsk.orderClear')}</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })()}

        {/* 缩写 (HSK 6) : le texte source, masqué au bout de dix minutes. */}
        {isHsk6Essay && (
          <View style={[s.card, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}>
            {essayReadLeft > 0 ? (
              <>
                <Text style={[s.warn, { color: c.primaryRed, fontWeight: '700' }]}>
                  {t('hsk.essayHideIn', { t: mmss(essayReadLeft) })}
                </Text>
                <Text style={[s.longText, { color: c.textPrimary }]}>{it.question}</Text>
              </>
            ) : (
              <Text style={[s.warn, { color: c.textSecondary }]}>{t('hsk.essayHidden')}</Text>
            )}
          </View>
        )}

        {(it.kind === 'write-essay' || it.kind === 'write-pic') && (
          <>
            <Text style={[s.warn, { color: c.textTertiary }]}>
              {t(it.kind === 'write-pic' ? 'hsk.picHint' : 'hsk.essayHint')}
            </Text>
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

        {it.kind !== 'write-order' && (
          <View style={{ gap: 9 }}>
            {it.choices.map((ch, i) => {
              const on = answers[it.id] === i;
              const emojiChoice = it.kind === 'listen-pic-mcq';
              return (
                <TouchableOpacity
                  key={i}
                  onPress={() => setAnswers(a => ({ ...a, [it.id]: i }))}
                  activeOpacity={0.8}
                  style={[s.choice, {
                    backgroundColor: on ? c.primaryRed + '14' : c.cardBg,
                    borderColor: on ? c.primaryRed : c.borderLight,
                    alignItems: emojiChoice ? 'center' : undefined,
                  }]}
                >
                  {emojiChoice && HSK_IMAGES[it.choiceImageKeys?.[i] ?? ''] ? (
                    <Image
                      source={HSK_IMAGES[it.choiceImageKeys![i]]}
                      style={s.choicePhoto}
                      resizeMode="cover"
                    />
                  ) : (
                    <Text style={emojiChoice
                      ? s.choiceEmoji
                      : [s.choiceTxt, { color: on ? c.primaryRed : c.textPrimary }]}>{ch}</Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        )}
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
  choiceEmoji: { fontSize: 34 },
  picture: { fontSize: 56 },
  photo: { width: 180, height: 130, borderRadius: 12 },
  choicePhoto: { width: 140, height: 100, borderRadius: 10 },
  frPrompt: { fontSize: 16.5, fontWeight: '600', lineHeight: 24, textAlign: 'center' },
  builtZone: { minHeight: 54, borderWidth: 1.5, borderRadius: 12, borderStyle: 'dashed', padding: 10, justifyContent: 'center' },
  segRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  seg: { borderWidth: 1.5, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 9 },
  segTxt: { fontSize: 17, fontWeight: '600' },

  nav: { flexDirection: 'row', alignItems: 'center', gap: 10, borderTopWidth: 1, paddingHorizontal: 16, paddingTop: 10, paddingBottom: 10 },
  navBtn: { width: 46, height: 46, alignItems: 'center', justifyContent: 'center' },
  navMain: { flex: 1, borderRadius: 13, paddingVertical: 14, alignItems: 'center' },
  navMainTxt: { color: '#FFF', fontSize: 15, fontWeight: '800' },

  gridBtn: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center' },
  gridBackdrop: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center', padding: 20 },
  gridScrim: { backgroundColor: 'rgba(0,0,0,0.45)' },
  gridPanel: { width: '100%', maxWidth: 440, maxHeight: '75%', borderRadius: 18, borderWidth: 1, padding: 16 },
  gridWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  gridCell: { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  gridCellTxt: { fontSize: 13.5, fontWeight: '700', fontVariant: ['tabular-nums'] },

  reviewHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 },
  reviewPrompt: { fontSize: 16.5, fontWeight: '600', lineHeight: 24 },
  reviewLine: { fontSize: 14, fontWeight: '600', lineHeight: 20 },

  introWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 28, gap: 12 },
  introBadge: { width: 76, height: 76, borderRadius: 38, alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  introPart: { fontSize: 13, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.6 },
  introRule: { fontSize: 19, fontWeight: '800', textAlign: 'center', lineHeight: 26 },
  introHelp: { fontSize: 14.5, lineHeight: 22, textAlign: 'center' },
  introCount: { fontSize: 12.5, fontWeight: '600' },

  bigIcon: { fontSize: 44 },
  total: { fontSize: 30, fontWeight: '800' },
  verdict: { fontSize: 16, fontWeight: '700' },
  track: { height: 7, borderRadius: 4, overflow: 'hidden' },
});
