/**
 * XiaoLearn Mobile — Accueil
 */
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  Image, Animated, PanResponder,
} from 'react-native';
import { useState, useEffect, useCallback, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useLayout } from '@/hooks/useLayout';
import { useTheme } from '@/contexts/ThemeContext';
import Colors from '@/constants/Colors';
import { CatalogIcon } from '@/components/CatalogIcon';
import { useAuth } from '@/contexts/AuthContext';
import { useUserStats, type UserStats } from '@/hooks/useUserStats';
import { LESSON_DATA } from '@/data/cecrLessons';
import { CECR_LEVELS, LEVEL_SLUG, MODULE_TO_LEVEL } from '@/data/cecrLevelsMeta';
import { getAllCards, useSrsData } from '@/hooks/useSrsData';
import { useSrs } from '@/contexts/SrsContext';
import { spacePinyin, mergePinyinPunct } from '@/utils/pinyinUtils';
import { useAudio } from '@/hooks/useAudio';
import { LEARN_SECTIONS } from '@/data/cecrLearnSections';
import { SRS_KEY, cardIdForHanzi } from '@/hooks/useSrsData';
import { EXERCISES } from '@/data/cecrExercises';
import { DICTATION_PHRASES } from '@/data/dictationPhrases';
import ToneColoredHanzi from '@/components/ToneColoredHanzi';
import { useDisplaySettings } from '@/contexts/DisplaySettingsContext';
import { useI18n } from '@/contexts/LanguageContext';
import { QUICK_SCREENS, type ScreenEntry } from '@/data/screenCatalog';
import { BrandGradient } from '@/components/BrandGradient';
import { CardRail } from '@/components/CardRail';
import { ProfileSummary } from '@/components/ProfileSummary';
import { DailyGoalCard } from '@/components/DailyGoalCard';
import { TrialBanner } from '@/components/TrialBanner';
import { AvatarEvolutionModal } from '@/components/AvatarEvolutionModal';
import { useAvatarEvolution } from '@/hooks/useAvatarEvolution';
import { useAvatar } from '@/hooks/useAvatar';
import RAW_HSK from '@/data/hskVocab.json';

// Lookup rapide hanzi → {category, example} depuis hskVocab
const HSK_MAP = new Map<string, { category: string; example: { zh: string; pinyin: string; fr: string; en: string } | null }>(
  (RAW_HSK as any[]).map((e: any) => [
    e.hanzi,
    {
      category: e.category ?? '',
      example: e.examples?.[0]
        ? { zh: e.examples[0].hanzi, pinyin: e.examples[0].pinyin, fr: e.examples[0].translation, en: e.examples[0].translationEn ?? e.examples[0].translation }
        : null,
    },
  ])
);

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

// ──────────────────────────────────────────────────────────────
// Raccourcis disponibles
// ──────────────────────────────────────────────────────────────
// La liste vient de `data/screenCatalog.ts`, partagée avec le menu « Plus ».
// Tenue à part, elle avait pris six écrans de retard sur lui — Dialogues,
// Statistiques, Simulateur HSK, Notes, Messages privés et Avis n'avaient
// aucun raccourci, sans que rien ne le signale.

// ──────────────────────────────────────────────────────────────
// Header avec logo + cloche
// ──────────────────────────────────────────────────────────────
function Header({ colors, px }: {
  colors: typeof Colors.light; px: number;
}) {
  const router = useRouter();
  const { colorScheme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const { wide } = useLayout();
  const isDark = colorScheme === 'dark';

  const logo = (
    <Image
      source={isDark ? require('@/assets/logo_long_dark.png') : require('@/assets/logo_long.png')}
      style={hdr.logo}
      resizeMode="contain"
    />
  );

  return (
    <View style={[hdr.wrap, { paddingHorizontal: px }]}>
      {/* Centrer le logo sur toute la largeur n'a de sens que si cette largeur
          est celle d'un téléphone : sur un écran large il flotte au milieu d'un
          vide, sans rapport avec quoi que ce soit. On le remet alors dans le
          flux, contre l'avatar, où il redevient la marque du coin supérieur. */}
      {!wide && (
        <View style={hdr.logoWrap} pointerEvents="none">{logo}</View>
      )}

      {/* Photo de profil — le personnage pixel, lui, ne vit que sur le tableau
          de bord : ici on attend la vraie identité, pas l'avatar de jeu.
          En mode large, le rail porte déjà une entrée « Mon profil » : deux
          accès au même écran à quelques centimètres l'un de l'autre. */}
      {!wide && (
        <TouchableOpacity
          style={[hdr.avatar, { backgroundColor: colors.primaryRed }]}
          onPress={() => router.push('/(tabs)/profil')}
        >
          {user?.photoURL ? (
            <Image source={{ uri: user.photoURL }} style={hdr.avatarImg} />
          ) : (
            <Ionicons name="person" size={16} color="#FFF" />
          )}
        </TouchableOpacity>
      )}

      {/* En mode large, le rail latéral porte déjà la marque : la répéter ici
          faisait deux logos côte à côte sur la même ligne. L'espaceur reste,
          lui, pour pousser le bouton de thème à droite. */}
      {wide && <View style={{ flex: 1 }} />}

      {/* Thème sombre/clair à droite */}
      <TouchableOpacity
        style={[hdr.iconBtn, { backgroundColor: colors.cardBg }]}
        onPress={toggleTheme}
      >
        <Ionicons name={isDark ? 'sunny-outline' : 'moon-outline'} size={17} color={colors.textSecondary} />
      </TouchableOpacity>
    </View>
  );
}


// ──────────────────────────────────────────────────────────────
// Salutation — Bonjour <prénom> 👋
// ──────────────────────────────────────────────────────────────
function Greeting({ colors, px }: { colors: typeof Colors.light; px: number }) {
  const { t } = useI18n();
  const { user } = useAuth();
  const hour = new Date().getHours();
  const hello = (hour < 5 || hour >= 18) ? t('home.greetingEvening') : t('home.greetingMorning');
  const name = user?.displayName?.split(' ')[0] ?? '';

  return (
    <View style={{ paddingHorizontal: px }}>
      <Text style={[gr.title, { color: colors.textPrimary }]}>
        {hello}{name ? ` ${name}` : ''} 👋
      </Text>
      <Text style={[gr.sub, { color: colors.textSecondary }]}>
        {t('home.ready')}
      </Text>
    </View>
  );
}
const gr = StyleSheet.create({
  title: { fontSize: 24, fontWeight: '800' },
  sub: { fontSize: 14.5, marginTop: 3 },
});

// ──────────────────────────────────────────────────────────────
// Panneau collection + accès rapide
//
// Réunit dans une même carte les dernières cartes obtenues et les
// raccourcis : deux blocs qui relèvent du même geste — « où j'en suis,
// où je vais » — et qui gagnent à ne pas être séparés par le reste du fil.
// ──────────────────────────────────────────────────────────────
function CollectionPanel({
  colors, px, stats,
}: {
  colors: typeof Colors.light;
  px: number;
  stats: UserStats;
}) {
  // px interne : le défilement horizontal doit affleurer le bord de la carte
  const inner = 14;
  return (
    <View
      style={[
        cp.card,
        { backgroundColor: colors.cardBg, borderColor: colors.borderLight, marginHorizontal: px },
      ]}
    >
      <ProfileSummary colors={colors} stats={stats} px={inner} />
      <View style={[cp.divider, { backgroundColor: colors.borderLight }]} />
      <CardRail colors={colors} px={inner} />
      <View style={[cp.divider, { backgroundColor: colors.borderLight }]} />
      <QuickAccess colors={colors} px={inner} />
    </View>
  );
}
const cp = StyleSheet.create({
  card: {
    borderRadius: 18, borderWidth: 1, paddingTop: 12, paddingBottom: 16, overflow: 'hidden',
    shadowColor: '#000', shadowOpacity: 0.07, shadowRadius: 10, shadowOffset: { width: 0, height: 3 }, elevation: 3,
  },
  divider: { height: 1, marginVertical: 14, marginHorizontal: 14, opacity: 0.7 },
});

// ──────────────────────────────────────────────────────────────
// Priorité du jour — carte sombre : N mots à réviser + CTA
// ──────────────────────────────────────────────────────────────
function PriorityCard({ colors, px }: { colors: typeof Colors.light; px: number }) {
  const { t } = useI18n();
  const router = useRouter();
  const { stats, loaded } = useSrs();
  if (!loaded) return null;

  const due = stats.dueNow;
  const label = due > 0
    ? `${due} mot${due !== 1 ? 's' : ''} à réviser`
    : stats.newCards > 0
      ? `${stats.newCards} nouveau${stats.newCards !== 1 ? 'x' : ''} mots à découvrir`
      : t('home.allUpToDate');
  const count = due > 0 ? due : stats.newCards;
  const mode = due > 0 ? 'due' : 'new';

  return (
    <View style={{ paddingHorizontal: px }}>
      <BrandGradient style={pr.card}>
        <Text style={pr.kicker}>{t('home.priority')}</Text>
        <View style={pr.row}>
          <View style={pr.countRow}>
            <Text style={pr.count}>{count}</Text>
            <Ionicons name="layers-outline" size={22} color="rgba(255,255,255,0.85)" />
          </View>
          {count > 0 && (
            <TouchableOpacity
              style={pr.cta}
              onPress={() => router.push({ pathname: '/review', params: { mode } } as any)}
              activeOpacity={0.85}
            >
              <Text style={[pr.ctaTxt, { color: colors.primaryRed }]}>{t('home.review')}</Text>
              <Ionicons name="arrow-forward" size={15} color={colors.primaryRed} />
            </TouchableOpacity>
          )}
        </View>
        <Text style={pr.label}>{label}</Text>
      </BrandGradient>
    </View>
  );
}
const pr = StyleSheet.create({
  card: {
    borderRadius: 20, padding: 18, overflow: 'hidden',
    shadowColor: '#E05040', shadowOpacity: 0.3, shadowRadius: 14, shadowOffset: { width: 0, height: 6 }, elevation: 5,
  },
  kicker: { color: 'rgba(255,255,255,0.85)', fontSize: 11, fontWeight: '800', letterSpacing: 1.2, marginBottom: 8 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  countRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  count: { color: '#FFF', fontSize: 40, fontWeight: '900', lineHeight: 44 },
  cta: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#FFF', borderRadius: 22, paddingHorizontal: 18, paddingVertical: 10,
  },
  ctaTxt: { fontSize: 14, fontWeight: '800' },
  label: { color: 'rgba(255,255,255,0.9)', fontSize: 13, marginTop: 4 },
});

// ──────────────────────────────────────────────────────────────
// Découvre l'app — checklist 4 écrans, dismissible
// ──────────────────────────────────────────────────────────────
const DISCOVER_KEY = 'xl_discover_v1';           // ids visités
const DISCOVER_DISMISSED_KEY = 'xl_discover_dismissed_v1';

const DISCOVER_ITEMS: { id: string; title: string; sub: string; icon: IoniconName; route: string }[] = [
  { id: 'lesson',  title: 'Continue une leçon',    sub: 'Le chemin de la méthode.',    icon: 'book-outline',                route: '/(tabs)/cours' },
  { id: 'review',  title: 'Révise tes cartes',     sub: 'Tes mots t\'attendent.',      icon: 'layers-outline',              route: '/(tabs)/flashcards' },
  { id: 'prof',    title: 'Parle avec Prof. Xiao', sub: 'Pose une question, 24h/24.',  icon: 'chatbubble-ellipses-outline', route: '/(tabs)/messages' },
  { id: 'dictee',  title: 'Essaie une dictée',     sub: 'Oreille + orthographe.',      icon: 'pencil-outline',              route: '/dictee' },
];

const DISCOVER_KEYS: Record<string, { title: any; sub: any }> = {
  lesson: { title: 'home.discoverLesson', sub: 'home.discoverLessonSub' },
  review: { title: 'home.discoverReview', sub: 'home.discoverReviewSub' },
  prof:   { title: 'home.discoverProf', sub: 'home.discoverProfSub' },
  dictee: { title: 'home.discoverDictee', sub: 'home.discoverDicteeSub' },
};

function DiscoverChecklist({ colors, px }: { colors: typeof Colors.light; px: number }) {
  const { t } = useI18n();
  const router = useRouter();
  const [done, setDone] = useState<Set<string>>(new Set());
  const [dismissed, setDismissed] = useState(true); // caché tant que non chargé

  useEffect(() => {
    (async () => {
      const [rawDone, rawDismissed] = await Promise.all([
        AsyncStorage.getItem(DISCOVER_KEY).catch(() => null),
        AsyncStorage.getItem(DISCOVER_DISMISSED_KEY).catch(() => null),
      ]);
      if (rawDone) { try { setDone(new Set(JSON.parse(rawDone))); } catch {} }
      setDismissed(rawDismissed === '1');
    })();
  }, []);

  const open = (item: (typeof DISCOVER_ITEMS)[number]) => {
    setDone(prev => {
      const next = new Set(prev).add(item.id);
      AsyncStorage.setItem(DISCOVER_KEY, JSON.stringify([...next])).catch(() => {});
      return next;
    });
    router.push(item.route as any);
  };

  const dismiss = () => {
    setDismissed(true);
    AsyncStorage.setItem(DISCOVER_DISMISSED_KEY, '1').catch(() => {});
  };

  const nDone = DISCOVER_ITEMS.filter(i => done.has(i.id)).length;
  if (dismissed || nDone === DISCOVER_ITEMS.length) return null;

  return (
    <View style={{ paddingHorizontal: px }}>
      <View style={[dc.card, { backgroundColor: colors.cardBg, borderColor: colors.borderLight }]}>
        <View style={dc.head}>
          <View style={{ flex: 1 }}>
            <View style={dc.titleRow}>
              <Ionicons name="sparkles-outline" size={16} color={colors.primaryRed} />
              <Text style={[dc.title, { color: colors.textPrimary }]}>{t('home.discover')}</Text>
            </View>
            <Text style={[dc.sub, { color: colors.textTertiary }]}>
              {t('home.discoverSub', { n: nDone, total: DISCOVER_ITEMS.length })}
            </Text>
          </View>
          <TouchableOpacity onPress={dismiss} style={dc.closeBtn} hitSlop={8}>
            <Ionicons name="close" size={18} color={colors.textTertiary} />
          </TouchableOpacity>
        </View>

        {DISCOVER_ITEMS.map(item => {
          const isDone = done.has(item.id);
          return (
            <TouchableOpacity key={item.id} style={dc.item} onPress={() => open(item)} activeOpacity={0.7}>
              {isDone ? (
                <View style={[dc.check, { backgroundColor: '#4CAF50' }]}>
                  <Ionicons name="checkmark" size={16} color="#FFF" />
                </View>
              ) : (
                <View style={[dc.iconWrap, { borderColor: colors.borderMedium }]}>
                  <CatalogIcon entry={item} size={16} color={colors.textSecondary} />
                </View>
              )}
              <View style={{ flex: 1 }}>
                <Text style={[
                  dc.itemTitle,
                  { color: isDone ? colors.textTertiary : colors.textPrimary },
                  isDone && { textDecorationLine: 'line-through' },
                ]}>
                  {t(DISCOVER_KEYS[item.id].title)}
                </Text>
                <Text style={[dc.itemSub, { color: colors.textTertiary }]}>{t(DISCOVER_KEYS[item.id].sub)}</Text>
              </View>
              <Ionicons name="chevron-forward" size={15} color={colors.textTertiary} />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
const dc = StyleSheet.create({
  card: { borderRadius: 18, borderWidth: 1, padding: 16, gap: 4 },
  head: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  title: { fontSize: 16, fontWeight: '800' },
  sub: { fontSize: 12, marginTop: 2 },
  closeBtn: { width: 28, height: 28, alignItems: 'center', justifyContent: 'center' },
  item: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10 },
  check: { width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  iconWrap: { width: 30, height: 30, borderRadius: 15, borderWidth: 1.2, alignItems: 'center', justifyContent: 'center' },
  itemTitle: { fontSize: 14.5, fontWeight: '600' },
  itemSub: { fontSize: 12, marginTop: 1 },
});

// ──────────────────────────────────────────────────────────────
// Accès rapides — style moderne (cartes carrées épurées)
// ──────────────────────────────────────────────────────────────
const QA_ORDER_KEY = '@xiaolearn/quick_order_v1';
const QA_ITEM_W = 72 + 14; // largeur carte + gap

function QuickAccess({ colors, px }: { colors: typeof Colors.light; px: number }) {
  const { t } = useI18n();
  const router = useRouter();
  // Bandeau horizontal en toutes largeurs, tablette comprise.
  //
  // Une grille avait été essayée sur grand écran : les quinze raccourcis y
  // étaient visibles d'un coup, mais l'accueil devenait interminable — la
  // grille pousse la priorité du jour et les objectifs hors de l'écran. Un
  // bandeau tient sur une ligne, garde la page compacte, et conserve le
  // glisser-déposer, dont le calcul est unidimensionnel.

  // Ordre personnalisable (persisté)
  const [order, setOrder] = useState<string[]>(QUICK_SCREENS.map(s => s.id));
  useEffect(() => {
    AsyncStorage.getItem(QA_ORDER_KEY).then(raw => {
      if (!raw) return;
      try {
        const saved: string[] = JSON.parse(raw);
        // Réconcilier avec les raccourcis actuels (ajouts/suppressions)
        const known = new Set(QUICK_SCREENS.map(s => s.id));
        const kept = saved.filter(id => known.has(id));
        const added = QUICK_SCREENS.map(s => s.id).filter(id => !kept.includes(id));
        setOrder([...kept, ...added]);
      } catch {}
    }).catch(() => {});
  }, []);

  const shortcuts = order
    .map(id => QUICK_SCREENS.find(s => s.id === id))
    .filter((s): s is ScreenEntry => !!s);

  // ── Drag & drop (maintenir puis déplacer) ────────────────────
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const dragX = useRef(new Animated.Value(0)).current;
  const dragIdxRef = useRef<number | null>(null);
  const orderRef = useRef(order);
  orderRef.current = order;

  const startDrag = (idx: number) => {
    dragIdxRef.current = idx;
    setDragIdx(idx);
    setHoverIdx(idx);
    dragX.setValue(0);
  };

  const endDrag = (dx: number) => {
    const from = dragIdxRef.current;
    dragIdxRef.current = null;
    setDragIdx(null);
    setHoverIdx(null);
    if (from == null) return;
    const shift = Math.round(dx / QA_ITEM_W);
    const to = Math.max(0, Math.min(orderRef.current.length - 1, from + shift));
    if (to === from) return;
    const next = [...orderRef.current];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    setOrder(next);
    AsyncStorage.setItem(QA_ORDER_KEY, JSON.stringify(next)).catch(() => {});
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: () => dragIdxRef.current !== null,
      onPanResponderMove: (_e, g) => {
        dragX.setValue(g.dx);
        const from = dragIdxRef.current;
        if (from != null) {
          const shift = Math.round(g.dx / QA_ITEM_W);
          setHoverIdx(Math.max(0, Math.min(orderRef.current.length - 1, from + shift)));
        }
      },
      onPanResponderRelease: (_e, g) => endDrag(g.dx),
      onPanResponderTerminate: (_e, g) => endDrag(g.dx),
    })
  ).current;

  const dragging = dragIdx !== null;

  /** Une tuile, indépendante du conteneur : seule sa largeur change. */
  const tile = (s: ScreenEntry, idx: number, isDragged: boolean) => (
    <TouchableOpacity
      style={qa.item}
      onPress={() => !dragging && router.push(s.route as any)}
      onLongPress={() => startDrag(idx)}
      delayLongPress={250}
      activeOpacity={0.7}
    >
      <View style={[qa.iconBox, {
        backgroundColor: colors.cardBg,
        borderColor: isDragged ? colors.primaryRed : colors.borderLight,
        borderWidth: isDragged ? 1.5 : 1,
      }]}>
        <CatalogIcon entry={{ icon: s.quickIcon ?? s.icon, iconText: s.iconText }} size={26} color={colors.textPrimary} />
      </View>
      <Text style={[qa.label, { color: colors.textSecondary }]} numberOfLines={1}>
        {t(s.labelKey as any)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={qa.section}>
      <View style={[qa.titleRow, { paddingHorizontal: px }]}>
        <Text style={[qa.sectionTitle, { color: colors.textPrimary }]}>{t('home.quickAccess')}</Text>
        <Text style={[qa.hint, { color: colors.textTertiary }]}>
          {dragging ? t('home.releaseToDrop') : t('home.holdToMove')}
        </Text>
      </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEnabled={!dragging}
          contentContainerStyle={[qa.grid, { paddingHorizontal: px }]}
          {...panResponder.panHandlers}
        >
          {shortcuts.map((s, idx) => {
            const isDragged = idx === dragIdx;
            // Décalage visuel des autres cartes pour montrer le point de dépôt
            let offset = 0;
            if (dragging && !isDragged && dragIdx !== null && hoverIdx !== null) {
              if (dragIdx < hoverIdx && idx > dragIdx && idx <= hoverIdx) offset = -QA_ITEM_W;
              else if (dragIdx > hoverIdx && idx < dragIdx && idx >= hoverIdx) offset = QA_ITEM_W;
            }
            return (
              <Animated.View
                key={s.id}
                style={[
                  isDragged
                    ? { transform: [{ translateX: dragX }, { scale: 1.12 }], zIndex: 10, elevation: 8 }
                    : { transform: [{ translateX: offset }] },
                  isDragged && { opacity: 0.95 },
                ]}
              >
                {tile(s, idx, isDragged)}
              </Animated.View>
            );
          })}
      </ScrollView>
    </View>
  );
}

// ──────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────
function findExampleSentence(hanzi: string): { zh: string; pinyin: string; fr: string; en: string } | null {
  // 1) Phrases tokenisées des leçons (avec rôles grammaticaux) — pas d'EN → fallback FR
  for (const sections of Object.values(LEARN_SECTIONS)) {
    for (const section of sections) {
      if (!(section as any).tokenizedSentences) continue;
      for (const s of (section as any).tokenizedSentences) {
        const zhText = s.zh.map((t: any) => t.text).join('');
        if (zhText.includes(hanzi)) {
          const fr = s.fr.map((t: any) => t.text).join(' ');
          return {
            zh: zhText,
            pinyin: s.zh.map((t: any) => t.pinyin).join(' '),
            fr,
            en: (s as any).en?.map?.((t: any) => t.text).join(' ') ?? fr,
          };
        }
      }
    }
  }
  // 2) Phrases de dictée (150 phrases HSK1-3 avec pinyin + trad)
  for (const p of DICTATION_PHRASES) {
    if (p.hanzi.includes(hanzi)) {
      return { zh: p.hanzi, pinyin: p.pinyin, fr: p.translationFr, en: (p as any).translationEn ?? p.translationFr };
    }
  }
  // 3) Phrases des exercices (sentence + sentenceFr, trous comblés)
  for (const exercises of Object.values(EXERCISES)) {
    for (const ex of exercises) {
      if (!ex.sentence || !ex.sentenceFr) continue;
      const zh = ex.sentence.replace(/_+/g, ex.choices?.[ex.correctIndex] ?? '');
      if (zh.includes(hanzi) && !/_/.test(zh)) {
        return { zh, pinyin: '', fr: ex.sentenceFr, en: (ex as any).sentenceEn ?? ex.sentenceFr };
      }
    }
  }
  // 4) Répliques de dialogues d'exercices (hanzi + pinyin + trad complètes)
  for (const exercises of Object.values(EXERCISES)) {
    for (const ex of exercises) {
      for (const t of ex.dialogue ?? []) {
        if (t.hanzi && t.hanzi.includes(hanzi) && t.translationFr) {
          return { zh: t.hanzi, pinyin: t.pinyin ?? '', fr: t.translationFr, en: (t as any).translationEn ?? t.translationFr };
        }
      }
    }
  }
  // 5) Exemples du dictionnaire HSK (8877 entrées, toutes avec exemples)
  for (const entry of RAW_HSK as any[]) {
    for (const ex of entry.examples ?? []) {
      if (ex.hanzi?.includes(hanzi) && ex.translation) {
        return { zh: ex.hanzi, pinyin: ex.pinyin ?? '', fr: ex.translation, en: ex.translationEn ?? ex.translation };
      }
    }
  }
  return null;
}

// ──────────────────────────────────────────────────────────────
// Mot du jour
// ──────────────────────────────────────────────────────────────
function WordOfDay({ colors, px }: { colors: typeof Colors.light; px: number }) {
  const { playHanzi, playing } = useAudio();
  const { t, pick } = useI18n();
  const { toneColors } = useDisplaySettings();
  const router = useRouter();
  const [added, setAdded] = useState(false);
  // Quelle zone joue l'audio (mot vs exemple) — pour l'indicateur 🔊
  const [playingKey, setPlayingKey] = useState<'word' | 'example' | null>(null);
  useEffect(() => { if (!playing) setPlayingKey(null); }, [playing]);
  const [card] = useState(() => {
    const all = getAllCards();
    if (!all.length) return null;
    const dayN = Math.floor(Date.now() / 86400000);
    return all[dayN % all.length];
  });

  // Vérifier si la carte est déjà dans les flashcards au montage
  useEffect(() => {
    if (!card) return;
    AsyncStorage.getItem(SRS_KEY).then(raw => {
      if (!raw) return;
      const state = JSON.parse(raw);
      if (state[card.id]) setAdded(true);
    }).catch(() => {});
  }, [card]);

  const addToFlashcards = async () => {
    if (!card || added) return;
    try {
      const raw = await AsyncStorage.getItem(SRS_KEY);
      const state: Record<string, any> = raw ? JSON.parse(raw) : {};
      if (!state[card.id]) {
        state[card.id] = {
          id: card.id, level: 0, dueAt: Date.now(),
          lastReviewedAt: 0, consecutiveAgain: 0, reviewCount: 0,
        };
        await AsyncStorage.setItem(SRS_KEY, JSON.stringify(state));
      }
      setAdded(true);
    } catch {}
  };

  if (!card) return null;

  const hskEntry = HSK_MAP.get(card.hanzi);
  const category = hskEntry?.category ?? '';
  const example = findExampleSentence(card.hanzi) ?? hskEntry?.example ?? null;

  return (
    <View style={{ paddingHorizontal: px }}>
      <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>{t('home.wordOfDay')}</Text>
      <View style={[styles.card, wod.card, { backgroundColor: colors.cardBg, borderColor: colors.borderLight }]}>

        {/* Hanzi (touch = audio) + infos côte à côte */}
        <View style={wod.mainRow}>
          <TouchableOpacity
            style={[wod.hanziBox, { backgroundColor: colors.cardBgAlt, borderColor: colors.borderLight }]}
            onPress={() => { setPlayingKey('word'); playHanzi(card.hanzi); }}
            activeOpacity={0.7}
          >
            <ToneColoredHanzi
              hanzi={card.hanzi}
              pinyin={card.pinyin}
              enabled={toneColors}
              style={[wod.hanzi, { color: colors.textPrimary }]}
            />
            <View style={wod.hanziAudioHint}>
              <Ionicons
                name={playingKey === 'word' && playing ? 'volume-high' : 'volume-medium-outline'}
                size={15}
                color={colors.textTertiary}
              />
            </View>
          </TouchableOpacity>

          <View style={wod.infoCol}>
            <Text style={[wod.pinyin, { color: colors.textTertiary }]}>{card.pinyin}</Text>
            <Text style={[wod.meaning, { color: colors.textPrimary }]} numberOfLines={2}>{pick(card.translation, card.translationEn ?? card.translation)}</Text>
            <View style={wod.badgeRow}>
              <View style={[wod.badge, { backgroundColor: card.levelColor + '18', borderColor: card.levelColor + '50' }]}>
                <Text style={[wod.badgeTxt, { color: card.levelColor }]}>{card.levelLabel}</Text>
              </View>
              {!!category && (
                <View style={[wod.badge, { backgroundColor: colors.borderLight, borderColor: colors.borderMedium }]}>
                  <Text style={[wod.badgeTxt, { color: colors.textSecondary }]}>{category}</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Exemple — touche pour écouter */}
        {example && (
          <TouchableOpacity
            style={[wod.exBox, { backgroundColor: colors.cardBgAlt, borderColor: colors.borderLight }]}
            onPress={() => { setPlayingKey('example'); playHanzi(example.zh); }}
            activeOpacity={0.7}
          >
            <View style={wod.exHead}>
              <Text style={[wod.exLabel, { color: colors.textTertiary }]}>{t('home.example')}</Text>
              <Ionicons
                name={playingKey === 'example' && playing ? 'volume-high' : 'volume-medium-outline'}
                size={14}
                color={playingKey === 'example' && playing ? colors.primaryRed : colors.textTertiary}
              />
            </View>
            <ToneColoredHanzi
              hanzi={example.zh}
              pinyin={example.pinyin || undefined}
              enabled={toneColors}
              style={[wod.exZh, { color: colors.textPrimary }]}
            />
            {(() => {
              // Garde le découpage source (你好=nǐhǎo) et insère la ponctuation
              const py = mergePinyinPunct(example.zh, example.pinyin) || example.pinyin;
              return py ? <Text style={[wod.exPinyin, { color: colors.textTertiary }]}>{py}</Text> : null;
            })()}
            <Text style={[wod.exFr, { color: colors.textSecondary }]}>{pick(example.fr, example.en)}</Text>
          </TouchableOpacity>
        )}

        {/* Boutons d'action */}
        <View style={wod.actions}>
          <TouchableOpacity
            style={[wod.btnPrimary, { backgroundColor: colors.primaryRed }]}
            onPress={() => router.push({ pathname: '/atelier', params: { hanzi: card.hanzi } })}
            activeOpacity={0.8}
          >
            <Ionicons name="pencil-outline" size={16} color="#FFF" style={{ marginRight: 6 }} />
            <Text style={wod.btnPrimaryTxt}>{t('home.practiceWriting')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[wod.btnSecondary, {
              backgroundColor: added ? colors.jadeGreenLight : colors.cardBgAlt,
              borderColor: added ? colors.jadeGreen : colors.borderMedium,
            }]}
            onPress={addToFlashcards}
            activeOpacity={0.8}
            disabled={added}
          >
            <Ionicons
              name={added ? 'checkmark-circle' : 'layers-outline'}
              size={16}
              color={added ? colors.jadeGreen : colors.textSecondary}
              style={{ marginRight: 6 }}
            />
            <Text style={[wod.btnSecondaryTxt, { color: added ? colors.jadeGreen : colors.textSecondary }]}>
              {added ? t('home.added') : t('home.addToCards')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// ──────────────────────────────────────────────────────────────
// Ton parcours

// ──────────────────────────────────────────────────────────────
type BilanEntry = { passed?: boolean; bestScore?: number; attempts?: number };

function PathProgress({ colors, px, completedIds, reloadKey }: {
  colors: typeof Colors.light; px: number; completedIds: string[]; reloadKey?: number;
}) {
  const router = useRouter();
  const { t, pick } = useI18n();
  const [bilanEntries, setBilanEntries] = useState<Record<string, BilanEntry>>({});
  // Hauteur mesurée d'une rangée « À suivre » : les rangées sont toutes bâties
  // pareil (une ligne de méta, un titre sur une ligne), donc mesurer la
  // première suffit à placer les extrémités du trait.
  const [rowH, setRowH] = useState(0);
  const completedSet = new Set(completedIds);

  // Lire les bilans depuis AsyncStorage (même clé que la web app)
  // reloadKey force un rechargement quand les stats changent
  useEffect(() => {
    AsyncStorage.getItem('cl_bilans_v7').then(raw => {
      if (raw) setBilanEntries(JSON.parse(raw));
    }).catch(() => {});
  }, [reloadKey]);

  // Construire la liste ordonnée des leçons par niveau, en respectant les verrous bilan
  const allLessons = CECR_LEVELS.flatMap((level, levelIdx) => {
    // Le premier niveau (A1) est toujours accessible
    const prevLevel = levelIdx > 0 ? CECR_LEVELS[levelIdx - 1] : null;
    const prevSlug = prevLevel ? LEVEL_SLUG[prevLevel.id] : null;
    const isLocked = !!prevSlug && !(bilanEntries[prevSlug]?.passed === true);
    if (isLocked) return []; // exclure les leçons des niveaux verrouillés
    return level.modules.flatMap(mod =>
      (LESSON_DATA[mod.id] ?? []).map(l => ({ ...l, moduleId: mod.id, levelLabel: level.label, levelColor: level.color }))
    );
  });

  // Trouver la vraie dernière leçon complétée par ID (pas par index naïf)
  const lastDoneIdx = (() => {
    let idx = -1;
    allLessons.forEach((l, i) => { if (completedSet.has(l.id)) idx = i; });
    return idx;
  })();
  const lastLesson = lastDoneIdx >= 0 ? allLessons[lastDoneIdx] : null;
  // Prochaines leçons = celles après la dernière faite, non encore complétées
  const upcoming = allLessons.slice(lastDoneIdx + 1).filter(l => !completedSet.has(l.id)).slice(0, 4);
  const lessonNum = (idx: number) => idx + 1;

  // Détecter le bilan à faire : plus de leçons accessibles ET bilan du niveau courant non passé
  const firstLockedIdx = CECR_LEVELS.findIndex((level, idx) => {
    if (idx === 0) return false;
    const prevSlug = LEVEL_SLUG[CECR_LEVELS[idx - 1].id];
    return !!prevSlug && !(bilanEntries[prevSlug]?.passed === true);
  });
  // Le niveau courant = dernier niveau accessible (juste avant le premier verrouillé)
  const currentLevelIdx = firstLockedIdx > 0 ? firstLockedIdx - 1 : CECR_LEVELS.length - 1;
  const currentLevel = CECR_LEVELS[currentLevelIdx];
  const currentSlug = LEVEL_SLUG[currentLevel.id];
  const currentBilanPassed = bilanEntries[currentSlug]?.passed === true;
  const nextLevel = CECR_LEVELS[currentLevelIdx + 1];
  // Afficher le CTA bilan si : toutes les leçons accessibles sont terminées ET bilan pas encore passé
  const showBilanCTA = upcoming.length === 0 && !currentBilanPassed && !!currentSlug;

  const goLesson = (moduleId: string, lessonId: string, levelColor?: string) => {
    router.push({ pathname: '/lesson', params: { id: lessonId, moduleId, accent: levelColor ?? colors.primaryRed } });
  };

  return (
    <View style={[styles.section, { paddingHorizontal: px }]}>
      <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>{t('home.yourPath')}</Text>

      <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.borderLight, padding: 0, overflow: 'hidden' }]}>
        {lastLesson && lastDoneIdx >= 0 && (
          <View style={[path.lastCard, { borderBottomColor: colors.borderLight }]}>
            {/* Ligne 1 : badge + meta + "Terminée" */}
            <View style={path.lastTopRow}>
              <View style={[path.numBadge, { backgroundColor: (lastLesson.levelColor ?? colors.primaryRed) + '20' }]}>
                <Text style={[path.numText, { color: lastLesson.levelColor ?? colors.primaryRed }]}>{lessonNum(lastDoneIdx)}</Text>
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={[path.lastMetaTop, { color: colors.textTertiary }]}>{t('home.lastLesson')}</Text>
                <Text style={[path.lastMetaSub, { color: lastLesson.levelColor ?? colors.primaryRed }]}>
                  {t('home.lessonN', { n: lessonNum(lastDoneIdx) })}{' · '}{lastLesson.levelLabel}
                </Text>
              </View>
              <View style={[path.donePill, { backgroundColor: colors.jadeGreenLight }]}>
                <Text style={[path.doneTxt, { color: colors.jadeGreen }]}>{t('home.done')}</Text>
              </View>
            </View>

            {/* Ligne 2 : titre de la leçon */}
            <Text style={[path.lastTitle, { color: colors.textPrimary }]}>{pick(lastLesson.title, (lastLesson as any).titleEn)}</Text>

            {/* Ligne 3 : lien Revoir */}
            <TouchableOpacity style={path.reviewLink} onPress={() => goLesson(lastLesson.moduleId, lastLesson.id, lastLesson.levelColor)}>
              <Text style={[path.reviewTxt, { color: colors.primaryRed }]}>{t('home.reviewLesson')}</Text>
              <Ionicons name="chevron-forward" size={13} color={colors.primaryRed} />
            </TouchableOpacity>
          </View>
        )}

        {showBilanCTA && (
          <TouchableOpacity
            style={[path.bilanCta, { backgroundColor: currentLevel.color + '12', borderColor: currentLevel.color + '40' }]}
            activeOpacity={0.8}
            onPress={() => router.push({ pathname: '/bilan', params: { level: currentSlug } })}
          >
            <View style={[path.bilanIcon, { backgroundColor: currentLevel.color + '20' }]}>
              <Text style={{ fontSize: 20 }}>{currentLevel.icon}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[path.bilanTitle, { color: currentLevel.color }]}>
                {t('home.bilanToDo', { level: currentLevel.label })}
              </Text>
              <Text style={[path.bilanSub, { color: colors.textTertiary }]}>
                {nextLevel ? t('home.bilanUnlock', { level: nextLevel.label }) : t('home.bilanValidate')}
              </Text>
            </View>
            <View style={[path.bilanBtn, { backgroundColor: currentLevel.color }]}>
              <Text style={path.bilanBtnTxt}>{t('home.bilanStart')}</Text>
              <Ionicons name="arrow-forward" size={13} color="#FFF" />
            </View>
          </TouchableOpacity>
        )}

        {upcoming.length > 0 && (
          <>
            <Text style={[path.upcomingLabel, { color: colors.textTertiary, borderBottomColor: colors.borderLight }]}>
              {t('home.upNext')}
            </Text>
            <View style={{ position: 'relative' }}>
              {/*
                Un seul trait, du haut de la première pastille au bas de la
                dernière. Ses extrémités ne sont plus calculées à la main
                (l'ancien `top: 24` supposait un bloc de texte haut de 20 pt,
                il en fait le double) mais déduites de la hauteur réellement
                mesurée d'une rangée : le centre d'une pastille tombe à la
                moitié de la rangée, son bord haut 10 pt plus tôt.
              */}
              {upcoming.length > 1 && rowH > 0 && (
                <View
                  style={[path.timelineTrack, {
                    backgroundColor: colors.borderMedium,
                    top: rowH / 2 - 10,
                    bottom: rowH / 2 - 10,
                  }]}
                />
              )}
              {upcoming.map((l, i) => {
                const absIdx = allLessons.findIndex(x => x.id === l.id);
                const isNext = i === 0;
                const levelColor = l.levelColor ?? colors.primaryRed;
                return (
                  <TouchableOpacity
                    key={l.id}
                    onLayout={i === 0 ? e => setRowH(e.nativeEvent.layout.height) : undefined}
                    style={[path.upRow, { borderBottomColor: colors.borderLight, borderBottomWidth: i < upcoming.length - 1 ? StyleSheet.hairlineWidth : 0 }]}
                    onPress={() => isNext ? goLesson(l.moduleId, l.id, l.levelColor) : undefined}
                    activeOpacity={isNext ? 0.75 : 1}
                  >
                    {/*
                      Timeline : deux demi-segments par ligne plutôt qu'un
                      trait absolu sur toute la colonne. Le trait unique partait
                      de `top: 24`, en supposant que le centre d'une pastille
                      tombe à 24 pt du haut de la ligne — vrai seulement si le
                      bloc de texte faisait la hauteur de la pastille. Il fait
                      deux lignes, donc les rangées sont plus hautes et le trait
                      s'arrêtait au-dessus de la dernière pastille.

                      Ici chaque demi-segment est ancré à 50 % de la hauteur
                      réelle de sa rangée, c'est-à-dire au centre exact de sa
                      pastille, quelle que soit la longueur des titres.
                    */}
                    <View style={path.timelineCol}>
                      <View style={[path.timelineDot, isNext
                        ? { backgroundColor: colors.primaryRed, borderColor: colors.primaryRed }
                        : { backgroundColor: 'transparent', borderColor: colors.borderMedium }
                      ]}>
                        {isNext && <Ionicons name="play" size={7} color="#FFF" />}
                      </View>
                    </View>

                    <View style={{ flex: 1, marginLeft: 12 }}>
                      <Text style={[path.meta, { color: colors.textTertiary }]}>
                        {t('home.lessonN', { n: lessonNum(absIdx) })}{' · '}<Text style={{ color: levelColor }}>{l.levelLabel}</Text>
                      </Text>
                      <Text style={[path.lessonTitle, { color: isNext ? colors.textPrimary : colors.textSecondary }]} numberOfLines={1}>
                        {pick(l.title, (l as any).titleEn)}
                      </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={15} color={isNext ? colors.primaryRed : colors.borderMedium} />
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        )}
      </View>

      <TouchableOpacity
        style={[styles.allLessonsBtn, { borderColor: colors.primaryRed + '50' }]}
        onPress={() => router.push('/(tabs)/cours')}
      >
        <Text style={[styles.allLessonsTxt, { color: colors.primaryRed }]}>{t('home.allLessons')}</Text>
        <Ionicons name="arrow-forward" size={14} color={colors.primaryRed} />
      </TouchableOpacity>
    </View>
  );
}

// ──────────────────────────────────────────────────────────────
// Écran principal
// ──────────────────────────────────────────────────────────────
export default function HomeScreen() {
  const scheme = useColorScheme();
  const colors = Colors[scheme];
  const { wide, gutter, gap } = useLayout();
  const px = gutter;
  const { stats, reload } = useUserStats();
  // Passage de palier : on le célèbre ici, c'est l'écran où vit l'avatar.
  const { avatarId } = useAvatar();
  const { pending, acknowledge } = useAvatarEvolution(stats.completedLessonIds);

  useFocusEffect(useCallback(() => { reload(); }, [reload]));

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: colors.appBg }]}>
      <Header colors={colors} px={px} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 110 }}>
        <View style={{ height: 14 }} />
        <Greeting colors={colors} px={px} />
        {/* Ne s'affiche que pendant l'essai — voir TrialBanner. */}
        <TrialBanner colors={colors} px={px} />
        <View style={styles.spacer} />

        {/*
          Deux colonnes plutôt qu'une pile à rallonge : empilés, ces blocs
          repoussent le parcours et le mot du jour à deux ou trois écrans de
          défilement alors que la largeur reste inutilisée.

          Le partage 5/7 sépare deux natures de contenu. À gauche, ce qui décrit
          l'état du compte — profil, cartes, raccourcis — un bloc dense qui ne
          gagne rien à s'élargir. À droite, ce qui appelle une action ou se lit :
          priorité, objectif, parcours, mot du jour, dont les titres et les
          listes ont besoin de place. La salutation et la bannière d'essai
          restent au-dessus, pleine largeur : elles s'adressent à l'écran entier,
          pas à l'une des colonnes.

          `px={0}` dans les colonnes : la marge latérale est portée une seule
          fois par la rangée, sinon chaque bloc la rajouterait à l'intérieur de
          sa propre colonne.
        */}
        {wide ? (
          <View style={[styles.twoCol, { paddingHorizontal: px, gap }]}>
            {/*
              Répartition par NATURE, pas par ordre d'apparition.

              Le premier découpage mettait le seul bloc d'identité à gauche et
              les cinq autres à droite : une colonne courte face à une colonne
              interminable, et il fallait faire défiler pour atteindre le mot du
              jour. On regroupe donc à gauche ce qui décrit l'apprenant — son
              profil, sa collection, ses raccourcis, sa découverte de l'app, le
              mot du jour — et à droite ce qu'il a à FAIRE : la priorité, les
              objectifs, la suite du parcours.
            */}
            <View style={styles.colLeft}>
              <CollectionPanel colors={colors} px={0} stats={stats} />
              <DiscoverChecklist colors={colors} px={0} />
              <WordOfDay colors={colors} px={0} />
            </View>
            <View style={styles.colRight}>
              <PriorityCard colors={colors} px={0} />
              {/* Objectif du jour — juste après la priorité : celle-ci dit quoi
                  faire maintenant, celui-là ce qu'il reste à faire dans la journée. */}
              <DailyGoalCard colors={colors} px={0} stats={stats} />
              <PathProgress colors={colors} px={0} completedIds={stats.completedLessonIds} reloadKey={stats.completedLessonsCount} />
            </View>
          </View>
        ) : (
          <>
            <CollectionPanel colors={colors} px={px} stats={stats} />
            <View style={styles.spacer} />
            <PriorityCard colors={colors} px={px} />
            <View style={styles.spacer} />
            {/* Objectif du jour — juste après la priorité : celle-ci dit quoi faire
                maintenant, celui-là ce qu'il reste à faire dans la journée. */}
            <DailyGoalCard colors={colors} px={px} stats={stats} />
            <View style={styles.spacer} />
            <DiscoverChecklist colors={colors} px={px} />
            <View style={styles.spacer} />

            <PathProgress colors={colors} px={px} completedIds={stats.completedLessonIds} reloadKey={stats.completedLessonsCount} />
            <View style={styles.spacer} />
            <WordOfDay colors={colors} px={px} />
          </>
        )}
      </ScrollView>

      {pending && avatarId && (
        <AvatarEvolutionModal
          characterId={avatarId}
          from={pending.from}
          to={pending.to}
          onDone={acknowledge}
        />
      )}
    </SafeAreaView>
  );
}

// ──────────────────────────────────────────────────────────────
// Styles
// ──────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: { flex: 1 },
  spacer: { height: 24 },
  // `alignItems: 'flex-start'` : chaque colonne s'arrête à la hauteur de son
  // contenu. Étirées, la plus courte hériterait de la hauteur de l'autre et sa
  // dernière carte s'allongerait sans raison.
  twoCol: { flexDirection: 'row', alignItems: 'flex-start' },
  colLeft: { flex: 6, gap: 24 },
  // L'écart entre blocs est repris du `spacer` de la pile, pour que les deux
  // dispositions respirent pareil.
  colRight: { flex: 6, gap: 24 },
  section: {},
  sectionTitle: { fontSize: 17, fontWeight: '700', marginBottom: 12 },
  card: {
    borderRadius: 16, borderWidth: 1, padding: 16,
    shadowColor: '#000', shadowOpacity: 0.07, shadowRadius: 10, shadowOffset: { width: 0, height: 3 }, elevation: 3,
  },
  cardRowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  cardTitle: { fontSize: 14, fontWeight: '600' },
  xpText: { fontSize: 13, fontWeight: '700' },
  progressTrack: { height: 8, borderRadius: 4, overflow: 'hidden', marginBottom: 10 },
  progressBar: { height: 8, borderRadius: 4 },
  streakRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  streakText: { fontSize: 12 },
  allLessonsBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 12, paddingVertical: 11, borderRadius: 12, borderWidth: 1 },
  allLessonsTxt: { fontSize: 13, fontWeight: '600' },
});

// Header
const hdr = StyleSheet.create({
  wrap: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8, paddingBottom: 8 },
  logoWrap: { position: 'absolute', left: 0, right: 0, alignItems: 'center' },
  logoInline: { marginLeft: 12 },
  logo: { height: 34, width: 150 },
  iconBtn: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  badge: {
    position: 'absolute', top: 0, right: 0,
    width: 16, height: 16, borderRadius: 8,
    alignItems: 'center', justifyContent: 'center',
  },
  badgeTxt: { color: '#FFF', fontSize: 9, fontWeight: '800' },
  avatar: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  avatarImg: { width: 34, height: 34, borderRadius: 17 },
});

// Quick Access
const qa = StyleSheet.create({
  section: {},
  titleRow: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 },
  sectionTitle: { fontSize: 17, fontWeight: '700' },
  hint: { fontSize: 11, fontWeight: '500' },
  grid: { flexDirection: 'row', gap: 14 },
  item: {
    width: 72,
    alignItems: 'center',
    gap: 7,
  },
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  label: { fontSize: 10, fontWeight: '600', textAlign: 'center' },
});

// Word of Day
const wod = StyleSheet.create({
  card: { padding: 20 },
  mainRow: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 16 },
  hanziBox: {
    minWidth: 96, minHeight: 96, borderRadius: 20, borderWidth: 1,
    alignItems: 'center', justifyContent: 'center',
    paddingHorizontal: 14, paddingVertical: 10,
  },
  hanziAudioHint: { position: 'absolute', bottom: 6, right: 8 },
  infoCol: { flex: 1, gap: 4 },
  hanzi: { fontSize: 46, fontWeight: '400', lineHeight: 58 },
  pinyin: { fontSize: 15 },
  meaning: { fontSize: 19, fontWeight: '700' },
  badgeRow: { flexDirection: 'row', gap: 8, marginTop: 6, flexWrap: 'wrap' },
  badge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20, borderWidth: 1 },
  badgeTxt: { fontSize: 11, fontWeight: '700' },
  exBox: { borderRadius: 12, borderWidth: 1, padding: 12, marginBottom: 16 },
  exHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  exLabel: { fontSize: 9, fontWeight: '700', letterSpacing: 1.2 },
  exZh: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  exPinyin: { fontSize: 12, marginBottom: 6 },
  exFr: { fontSize: 13, fontStyle: 'italic' },
  actions: { marginTop: 4, gap: 10 },
  btnPrimary: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 14, paddingVertical: 13 },
  btnPrimaryTxt: { color: '#FFF', fontSize: 15, fontWeight: '700' },
  btnSecondary: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 14, paddingVertical: 12, borderWidth: 1 },
  btnSecondaryTxt: { fontSize: 14, fontWeight: '600' },
});

// Path
const path = StyleSheet.create({
  lastRow: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16, borderBottomWidth: 1 },
  lastCard: { padding: 16, borderBottomWidth: StyleSheet.hairlineWidth },
  lastTopRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  lastMetaTop: { fontSize: 10, fontWeight: '700', letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 2 },
  lastMetaSub: { fontSize: 11, fontWeight: '600' },
  lastTitle: { fontSize: 18, fontWeight: '700', lineHeight: 26, marginBottom: 10 },
  numBadge: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  numText: { fontSize: 20, fontWeight: '700' },
  meta: { fontSize: 10, fontWeight: '700', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 2 },
  lessonTitle: { fontSize: 14, fontWeight: '600' },
  donePill: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  doneTxt: { fontSize: 11, fontWeight: '600' },
  reviewLink: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  reviewTxt: { fontSize: 12, fontWeight: '600' },
  upcomingLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 0.8, paddingHorizontal: 16, paddingVertical: 8, borderBottomWidth: 1 },
  upRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14 },
  check: { width: 20, height: 20, borderRadius: 10, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  // Timeline
  // alignSelf: 'stretch' — la colonne prend toute la hauteur de sa rangée,
  // sans quoi les 50 % des demi-segments se calculeraient sur la seule
  // pastille.
  timelineCol: { alignItems: 'center', width: 20, zIndex: 1 },
  timelineDot: { width: 20, height: 20, borderRadius: 10, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  // left = paddingH(16) + demi-pastille(10) - demi-trait(0.75) ≈ 25
  // top/bottom : posés à l'exécution, à partir de la hauteur mesurée d'une rangée
  timelineTrack: { position: 'absolute', left: 25, width: 1.5, zIndex: 0 },
  // Bilan CTA
  bilanCta: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16, borderTopWidth: 1 },
  bilanIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  bilanTitle: { fontSize: 13, fontWeight: '700', marginBottom: 2 },
  bilanSub: { fontSize: 11 },
  bilanBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20 },
  bilanBtnTxt: { color: '#FFF', fontSize: 12, fontWeight: '700' },
});
