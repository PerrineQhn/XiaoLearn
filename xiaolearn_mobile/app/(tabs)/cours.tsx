/**
 * XiaoLearn Mobile — Écran Cours
 * Sélecteur de niveaux CECR (A1, A2, …) en haut → affichage du seul niveau sélectionné.
 */
import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  type StyleProp, type ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useLayout } from '@/hooks/useLayout';
import Colors from '@/constants/Colors';
import { LESSON_DATA } from '@/data/cecrLessons';
import { cecrBilans, type CecrLevelSlug } from '@/data/cecrBilans';
import { CECR_LEVELS, LEVEL_SLUG as LEVEL_SLUG_IMPORT, type CecrLevel, type CecrModule } from '@/data/cecrLevelsMeta';
import { useEntitlements } from '@/hooks/useEntitlements';
import { isLevelPremiumLocked } from '@/utils/lessonGate';
import { useI18n } from '@/contexts/LanguageContext';

const LEVEL_SLUG = LEVEL_SLUG_IMPORT;

/**
 * Largeur du rail de niveaux. 300 pt laissent tenir « B1.2 — Intermédiaire »
 * sur une ligne, ce qui est la raison d'être du rail : voir où l'on en est
 * sans faire défiler.
 */
const LEVEL_RAIL_WIDTH = 300;

// ─────────────────────────────────────────────
// Composant leçon
// ─────────────────────────────────────────────
function LessonRow({
  lesson, index, done, accent, colors, moduleId,
}: { lesson:{id:string;title:string;titleEn?:string}; index:number; done:boolean; accent:string; colors: typeof Colors.light; moduleId: string }) {
  const router = useRouter();
  const { pick } = useI18n();
  return (
    <TouchableOpacity
      style={[styles.lessonRow, { borderColor: colors.borderLight }]}
      activeOpacity={0.7}
      onPress={() => router.push({ pathname: '/lesson', params: { id: lesson.id, moduleId, accent } })}
    >
      <View style={[styles.lessonNum, {
        backgroundColor: done ? accent+'22' : colors.cardBgAlt,
        borderColor: done ? accent : colors.borderMedium,
      }]}>
        {done
          ? <Ionicons name="checkmark" size={13} color={accent} />
          : <Text style={[styles.lessonNumTxt, { color: colors.textTertiary }]}>{index + 1}</Text>
        }
      </View>
      <Text style={[styles.lessonTitle, { color: done ? colors.textSecondary : colors.textPrimary }]} numberOfLines={2}>
        {pick(lesson.title, lesson.titleEn ?? lesson.title)}
      </Text>
      <Ionicons
        name={done ? 'checkmark-circle' : 'play-circle-outline'}
        size={18}
        color={done ? accent : accent+'80'}
      />
    </TouchableOpacity>
  );
}

// ─────────────────────────────────────────────
// Composant module (parcours)
// ─────────────────────────────────────────────
function ModuleCard({
  mod, completedIds, accent, colors, expanded, onToggle, style,
}: {
  mod: CecrModule;
  completedIds: Set<string>;
  accent: string;
  colors: typeof Colors.light;
  expanded: boolean;
  onToggle: () => void;
  /** Largeur imposée par la grille appelante, le cas échéant. */
  style?: StyleProp<ViewStyle>;
}) {
  const { t, pick } = useI18n();
  const lessons = LESSON_DATA[mod.id] ?? [];
  const doneCount = lessons.filter(l => completedIds.has(l.id)).length;
  const total = lessons.length;
  const pct = total > 0 ? Math.round((doneCount / total) * 100) : 0;
  const modDone = completedIds.has(mod.id);

  return (
    <View style={[styles.moduleWrap, style]}>
      <TouchableOpacity
        style={[styles.moduleHeader, {
          backgroundColor: expanded ? accent+'12' : colors.cardBg,
          borderColor: expanded ? accent+'40' : colors.borderLight,
        }]}
        onPress={onToggle}
        activeOpacity={0.75}
      >
        <View style={[styles.modIcon, {
          backgroundColor: modDone ? accent+'22' : colors.cardBgAlt,
          borderColor: modDone ? accent : colors.borderMedium,
        }]}>
          {modDone
            ? <Ionicons name="checkmark" size={13} color={accent} />
            : <Ionicons name="book-outline" size={13} color={accent} />
          }
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.modName, { color: colors.textPrimary }]} numberOfLines={2}>
            {pick(mod.name, mod.nameEn)}
          </Text>
          {total > 0 && (
            <Text style={[styles.modSub, { color: colors.textTertiary }]}>
              {doneCount}/{total} {t('cours.lessons')}{doneCount > 0 ? ` · ${pct}%` : ''}
            </Text>
          )}
        </View>
        <Ionicons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={16}
          color={colors.textTertiary}
        />
      </TouchableOpacity>

      {expanded && lessons.length > 0 && (
        <View style={[styles.lessonsBox, { backgroundColor: colors.cardBg, borderColor: colors.borderLight }]}>
          {lessons.map((lesson, i) => (
            <LessonRow
              key={lesson.id}
              lesson={lesson}
              index={i}
              done={completedIds.has(lesson.id)}
              accent={accent}
              colors={colors}
              moduleId={mod.id}
            />
          ))}
        </View>
      )}
    </View>
  );
}

// ─────────────────────────────────────────────
// Bannière bilan
// ─────────────────────────────────────────────
interface BilanEntry { bestScore: number; passed: boolean; attempts: number }

function BilanBanner({
  levelLabel, emoji, completionPct, entry, accent, colors, onStart,
}: {
  levelLabel: string; emoji: string;
  completionPct: number; entry?: BilanEntry;
  accent: string; colors: typeof Colors.light;
  onStart: () => void;
}) {
  const { t } = useI18n();
  const eligible = completionPct >= 80;
  const passed = entry?.passed ?? false;

  if (!eligible && !passed) {
    return (
      <View style={[bb.wrap, { backgroundColor: colors.cardBgAlt, borderColor: colors.borderLight }]}>
        <Text style={bb.lockEmoji}>🏆</Text>
        <View style={{ flex: 1 }}>
          <Text style={[bb.eyebrow, { color: colors.textTertiary }]}>{t('cours.bilanEyebrow', { label: levelLabel })}</Text>
          <Text style={[bb.sub, { color: colors.textTertiary }]}>
            {t('cours.bilanUnlock', { pct: String(completionPct) })}
          </Text>
          <View style={[bb.track, { backgroundColor: colors.borderMedium }]}>
            <View style={[bb.bar, { width: `${completionPct}%` as any, backgroundColor: accent + '80' }]} />
          </View>
        </View>
      </View>
    );
  }

  const bg = passed ? '#4CAF5018' : accent + '15';
  const border = passed ? '#4CAF5050' : accent + '50';
  const ctaLabel = passed ? t('cours.bilanImprove') : t('cours.bilanStart');
  const ctaBg = passed ? '#4CAF50' : accent;

  return (
    <View style={[bb.wrap, { backgroundColor: bg, borderColor: border }]}>
      <Text style={bb.lockEmoji}>{emoji}</Text>
      <View style={{ flex: 1 }}>
        <Text style={[bb.eyebrow, { color: colors.textPrimary }]}>{t('cours.bilanEnd', { label: levelLabel })}</Text>
        <Text style={[bb.sub, { color: colors.textSecondary }]}>
          {passed
            ? t('cours.bilanPassed', { score: String(entry!.bestScore), attempts: String(entry!.attempts) })
            : t('cours.bilanDesc')}
        </Text>
      </View>
      <TouchableOpacity style={[bb.cta, { backgroundColor: ctaBg }]} onPress={onStart}>
        <Text style={bb.ctaTxt}>{ctaLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}

const bb = StyleSheet.create({
  wrap: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    borderRadius: 12, borderWidth: 1, padding: 12, marginTop: 6,
  },
  lockEmoji: { fontSize: 22 },
  eyebrow: { fontSize: 12, fontWeight: '700', marginBottom: 2 },
  sub: { fontSize: 11, lineHeight: 16 },
  track: { height: 3, borderRadius: 2, marginTop: 6, overflow: 'hidden' },
  bar: { height: 3, borderRadius: 2 },
  cta: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, flexShrink: 0 },
  ctaTxt: { color: '#FFF', fontSize: 12, fontWeight: '700' },
});

// ─────────────────────────────────────────────
// Infos calculées par niveau
// ─────────────────────────────────────────────
interface LevelInfo {
  level: CecrLevel;
  prevLabel: string | null;
  done: number;
  total: number;
  pct: number;
  premiumLocked: boolean;
  bilanLocked: boolean;
  locked: boolean;
}

// ─────────────────────────────────────────────
// Screen principal
// ─────────────────────────────────────────────
export default function CoursScreen() {
  const scheme = useColorScheme();
  const colors = Colors[scheme];
  const { tablet, wide, gutter: px } = useLayout();

  const router = useRouter();
  const { t, pick } = useI18n();
  const { access } = useEntitlements();
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [expandedModules, setExpandedModules] = useState<Record<string,boolean>>({});
  const [bilanEntries, setBilanEntries] = useState<Record<string, BilanEntry>>({});
  // Niveau imposé par l'écran d'évaluation, le cas échéant.
  const { level: levelParam } = useLocalSearchParams<{ level?: string }>();
  const [selectedId, setSelectedId] = useState<string>(levelParam ?? 'cecr-a1');
  // Un niveau explicitement demandé ne doit pas être écrasé par la sélection
  // automatique : on la court-circuite d'emblée.
  const autoSelected = useRef(!!levelParam);

  useEffect(() => {
    AsyncStorage.getItem('cl_completed_lessons')
      .then(raw => { if (raw) try { setCompletedIds(new Set(JSON.parse(raw))); } catch {} })
      .catch(() => {});
    AsyncStorage.getItem('cl_bilans_v7')
      .then(raw => { if (raw) try { setBilanEntries(JSON.parse(raw)); } catch {} })
      .catch(() => {});
  }, []);

  const toggleModule = useCallback((id: string) => {
    setExpandedModules(p => ({ ...p, [id]: !p[id] }));
  }, []);

  // Calcule les infos de chaque niveau
  const levelInfos = useMemo<LevelInfo[]>(() => {
    return CECR_LEVELS.map((level, index) => {
      const prev = index > 0 ? CECR_LEVELS[index - 1] : null;
      const prevSlug = prev ? LEVEL_SLUG[prev.id] : null;
      const bilanLocked = !!prevSlug && !(bilanEntries[prevSlug]?.passed === true);
      const premiumLocked = isLevelPremiumLocked(access, level.id);
      const allLessons = level.modules.flatMap(m => LESSON_DATA[m.id] ?? []);
      const total = allLessons.length;
      const done = allLessons.filter(l => completedIds.has(l.id)).length;
      const pct = total > 0 ? Math.round((done / total) * 100) : 0;
      return {
        level, prevLabel: prev?.label ?? null,
        done, total, pct,
        premiumLocked, bilanLocked, locked: premiumLocked || bilanLocked,
      };
    });
  }, [access, completedIds, bilanEntries]);

  // Auto-sélection du niveau courant (le plus avancé déverrouillé et non terminé)
  useEffect(() => {
    if (autoSelected.current) return;
    if (completedIds.size === 0 && Object.keys(bilanEntries).length === 0) return;
    autoSelected.current = true;
    const unlocked = levelInfos.filter(li => !li.locked);
    // dernier niveau déverrouillé en cours (pct < 100), sinon dernier déverrouillé
    const inProgress = [...unlocked].reverse().find(li => li.pct < 100);
    const target = inProgress ?? unlocked[unlocked.length - 1] ?? levelInfos[0];
    if (target) setSelectedId(target.level.id);
  }, [levelInfos, completedIds, bilanEntries]);

  const selected = levelInfos.find(li => li.level.id === selectedId) ?? levelInfos[0];

  const totalLessons = Object.values(LESSON_DATA).reduce((a, l) => a + l.length, 0);
  const doneLessons = Object.values(LESSON_DATA).flat().filter(l => completedIds.has(l.id)).length;

  function onSelectLevel(li: LevelInfo) {
    if (li.premiumLocked) { router.push('/abonnement' as any); return; }
    setSelectedId(li.level.id);
  }

  // Les pastilles de niveau alimentent deux contenants — ruban horizontal
  // sous le seuil, rail vertical au-dessus — d'où cette définition unique.
  const levelChips = levelInfos.map(li => {
    const isSel = li.level.id === selected?.level.id;
    const accent = li.level.color;
    return (
      <TouchableOpacity
        key={li.level.id}
        activeOpacity={0.85}
        onPress={() => onSelectLevel(li)}
        style={[
          chip.wrap,
          {
            backgroundColor: isSel ? accent + '14' : colors.cardBg,
            borderColor: isSel ? accent : colors.borderLight,
            borderWidth: isSel ? 2 : 1,
            opacity: li.locked && !isSel ? 0.65 : 1,
          },
        ]}
      >
        <View style={chip.titleRow}>
          {li.locked
            ? <Ionicons name="lock-closed" size={13} color={colors.textTertiary} style={{ marginRight: 5 }} />
            : <Text style={chip.emoji}>{li.level.icon}</Text>}
          <Text
            style={[chip.title, { color: li.locked ? colors.textTertiary : colors.textPrimary }]}
            numberOfLines={1}
          >
            {li.level.label} — {pick(li.level.name, li.level.nameEn)}
          </Text>
        </View>
        <Text style={[chip.sub, { color: li.locked ? colors.textTertiary : accent }]}>
          {li.locked
            ? t('cours.locked')
            : `${li.done}/${li.total} · ${li.pct}%`}
        </Text>
      </TouchableOpacity>
    );
  });

  const moduleCards = selected && !selected.locked
    ? selected.level.modules.map(mod => (
        <ModuleCard
          key={mod.id}
          mod={mod}
          completedIds={completedIds}
          accent={selected.level.color}
          colors={colors}
          expanded={!!expandedModules[mod.id]}
          onToggle={() => toggleModule(mod.id)}
          style={wide ? styles.moduleHalf : undefined}
        />
      ))
    : null;

  const body = (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={wide ? { flex: 1 } : undefined}
      contentContainerStyle={[
        { paddingHorizontal: px, paddingBottom: 120, paddingTop: 8 },
        // Le plafond de 680 pt garde une colonne unique lisible ; en deux
        // colonnes il ne ferait que rétrécir la grille sans rien protéger.
        //
        // `width: '100%'` n'est pas décoratif. Seul, `alignSelf: 'center'`
        // retire au conteneur son étirement par défaut : il se réduit alors à
        // la largeur de son contenu, et comme les cartes n'ont pas de largeur
        // propre, elles se réduisent à leur tour — chacune tombait à la taille
        // de son icône, titres disparus. Ce n'était visible qu'entre 700 et
        // 1 000 pt, la seule plage où cette ligne s'applique.
        tablet && !wide && { width: '100%' as const, maxWidth: 680, alignSelf: 'center' as const },
      ]}
    >
      {selected && selected.bilanLocked && (
        <View style={[styles.noticeCard, { backgroundColor: colors.cardBgAlt, borderColor: colors.borderLight }]}>
          <Text style={styles.noticeEmoji}>🔒</Text>
          <Text style={[styles.noticeText, { color: colors.textSecondary }]}>
            {t('cours.bilanLock', { label: selected.prevLabel ?? '' })}
          </Text>
        </View>
      )}

      {selected && !selected.locked && (
        <>
          {wide
            ? <View style={styles.moduleGrid}>{moduleCards}</View>
            : moduleCards}
          {LEVEL_SLUG[selected.level.id] && (
            <BilanBanner
              levelLabel={selected.level.label}
              emoji={selected.level.icon}
              completionPct={selected.pct}
              entry={bilanEntries[LEVEL_SLUG[selected.level.id]!]}
              accent={selected.level.color}
              colors={colors}
              onStart={() => router.push({ pathname: '/bilan', params: { level: LEVEL_SLUG[selected.level.id] } })}
            />
          )}
        </>
      )}
    </ScrollView>
  );

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: colors.appBg }]}>
      <View style={[styles.pageHeader, { paddingHorizontal: px }]}>
        <Text style={[styles.pageTitle, { color: colors.textPrimary }]}>{t('cours.title')}</Text>
        <Text style={[styles.pageSub, { color: colors.textTertiary }]}>
          {doneLessons}/{totalLessons} {t('cours.lessons')} · {CECR_LEVELS.length} {t('hard.cecrLevels')}
        </Text>
      </View>

      {wide ? (
        /*
          Rail vertical : les dix niveaux CECR tiennent en hauteur, alors qu'en
          ruban horizontal la moitié d'entre eux restait hors champ derrière un
          défilement que rien ne signale. On voit sa progression d'ensemble et
          on change de niveau sans quitter la liste des modules.
        */
        <View style={styles.railRow}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={[styles.levelRail, { borderRightColor: colors.borderLight }]}
            contentContainerStyle={{ paddingHorizontal: px, gap: 10, paddingVertical: 8, paddingBottom: 120 }}
          >
            {levelChips}
          </ScrollView>
          {body}
        </View>
      ) : (
        <>
          {/* Sélecteur de niveaux horizontal */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: px, gap: 10, paddingVertical: 8 }}
            // `flexShrink: 0` : `flexGrow: 0` empêche la rangée de s'étirer,
            // pas de se faire comprimer. Sans lui, un contenu débordant en
            // dessous rogne les pastilles — le défaut corrigé sur Collection,
            // Lectures et Dialogues. Cet écran garde sa propre structure (sur
            // tablette les niveaux passent en rail vertical), il n'utilise donc
            // pas `FilterChipRow`, mais il lui fallait la même protection.
            style={{ flexGrow: 0, flexShrink: 0 }}
          >
            {levelChips}
          </ScrollView>

          {body}
        </>
      )}
    </SafeAreaView>
  );
}

const chip = StyleSheet.create({
  wrap: {
    borderRadius: 14, paddingHorizontal: 14, paddingVertical: 10,
    minWidth: 140, justifyContent: 'center',
  },
  titleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 3 },
  emoji: { fontSize: 15, marginRight: 5 },
  title: { fontSize: 14, fontWeight: '700', flexShrink: 1 },
  sub: { fontSize: 12, fontWeight: '600' },
});

const styles = StyleSheet.create({
  root: { flex: 1 },
  pageHeader: { paddingTop: 4, paddingBottom: 4 },
  pageTitle: { fontSize: 24, fontWeight: '700' },
  pageSub: { fontSize: 12, marginTop: 2 },

  noticeCard: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    borderRadius: 14, borderWidth: 1, padding: 16, marginTop: 4, marginBottom: 8,
  },
  noticeEmoji: { fontSize: 22 },
  noticeText: { flex: 1, fontSize: 13, lineHeight: 19, fontWeight: '500' },

  // Rail de niveaux + grille de modules (grand écran uniquement)
  railRow: { flex: 1, flexDirection: 'row' },
  levelRail: { width: LEVEL_RAIL_WIDTH, flexGrow: 0, borderRightWidth: 1 },
  moduleGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  moduleHalf: { width: '48%' },

  // Modules container
  moduleWrap: { marginBottom: 8 },
  moduleHeader: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 12, paddingVertical: 11, borderRadius: 12, borderWidth: 1,
  },
  modIcon: {
    width: 28, height: 28, borderRadius: 7, borderWidth: 1.5,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  modName: { fontSize: 13, fontWeight: '600', lineHeight: 18 },
  modSub: { fontSize: 11, marginTop: 1 },

  // Leçons
  lessonsBox: {
    marginTop: 4, borderRadius: 10, borderWidth: 1, overflow: 'hidden',
  },
  lessonRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 12, paddingVertical: 11, borderBottomWidth: 1,
  },
  lessonNum: {
    width: 26, height: 26, borderRadius: 6, borderWidth: 1.5,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  lessonNumTxt: { fontSize: 11, fontWeight: '600' },
  lessonTitle: { flex: 1, fontSize: 13, fontWeight: '500', lineHeight: 18 },
});
