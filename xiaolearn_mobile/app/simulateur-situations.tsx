/**
 * Simulateur de Situations — jeu de rôle avec Prof. Xiao.
 *
 * Portage de l'écran web (`SimulatorPageV2`). Trois temps, dans cet ordre :
 *
 *   1. **Catalogue** — les vingt scénarios, filtrables par catégorie.
 *   2. **Briefing** — qui joue quoi, l'objectif, le vocabulaire utile, les
 *      étapes. On lit avant de se lancer : commencer une conversation en
 *      chinois sans savoir ce qu'on cherche à obtenir est décourageant.
 *   3. **Conversation** — le jeu de rôle proprement dit, avec l'étape en cours
 *      et ses suggestions en permanence sous les yeux.
 *
 * ## Ce qui change par rapport au web
 *
 * Le web est une page unique de 866 lignes plus 1 200 lignes de CSS ; rien de
 * tout cela ne se transpose. L'écran est donc réécrit, mais les DONNÉES sont
 * les mêmes fichiers, copiés à l'identique — un scénario corrigé d'un côté se
 * corrige de l'autre par simple recopie, sans traduction manuelle.
 *
 * La correction reste implicite, comme sur le web : le personnage ne signale
 * pas les fautes, il reformule correctement dans sa réponse. Les corrections
 * explicites remontées par le modèle sont regroupées à part, consultables
 * après coup — les afficher en plein milieu du dialogue casserait la fiction
 * qui fait tout l'intérêt de l'exercice.
 */
import { useCallback, useMemo, useRef, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList,
  TextInput, KeyboardAvoidingView, Platform, ActivityIndicator, Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useLayout } from '@/hooks/useLayout';
import Colors from '@/constants/Colors';
import { useI18n } from '@/contexts/LanguageContext';
import { useEntitlements } from '@/hooks/useEntitlements';
import { useUserStats } from '@/hooks/useUserStats';
import { PremiumGate } from '@/components/PremiumGate';
import { FilterChipRow } from '@/components/FilterChipRow';
import { AskXiaoBubble } from '@/components/AskXiaoBubble';
import { simulatorScenarios } from '@/data/simulatorScenarios';
import {
  SIMULATOR_CATEGORIES,
  type SimulatorCategory,
  type SimulatorScenario,
  type SimulatorTurn,
  type SimulatorCorrection,
} from '@/types/simulator';
import { sendSimulatorMessage, guessCurrentStepIndex } from '@/services/simulatorService';
import { Alert } from 'react-native';
import { copyText } from '@/utils/clipboard';
import { SelectableTextModal } from '@/components/SelectableTextModal';

type Palette = typeof Colors.light;

/** Même palette de niveaux que Lectures et Dialogues : un niveau = une
 *  couleur, où qu'on le croise. La pastille affichait le niveau mais se
 *  colorait selon la difficulté — deux scénarios A2 pouvaient porter la même
 *  étiquette dans deux couleurs. */
const LEVEL_COLORS: Record<string, string> = {
  a1: '#4CAF50', a2: '#8BC34A',
  'b1.1': '#F9A825', 'b1.2': '#FB8C00',
  'b2.1': '#F44336', 'b2.2': '#E91E63',
  'c1.1': '#9C27B0', 'c1.2': '#673AB7',
  'c2.1': '#3F51B5', 'c2.2': '#2196F3',
};

/** Ordre CECR pour le tri et la rangée de filtres. */
const LEVEL_ORDER = ['a1', 'a2', 'b1.1', 'b1.2', 'b2.1', 'b2.2', 'c1.1', 'c1.2', 'c2.1', 'c2.2'];

// ─── En-tête commune ─────────────────────────────────────────────────────────

function Head({ c, title, onBack }: { c: Palette; title: string; onBack: () => void }) {
  return (
    <View style={[s.head, { borderBottomColor: c.borderLight }]}>
      <TouchableOpacity onPress={onBack} style={s.headBtn} hitSlop={8}>
        <Ionicons name="arrow-back" size={24} color={c.textPrimary} />
      </TouchableOpacity>
      <Text style={[s.headTitle, { color: c.textPrimary }]} numberOfLines={1}>{title}</Text>
      <View style={s.headBtn} />
    </View>
  );
}

// ─── 1. Catalogue ────────────────────────────────────────────────────────────

function Catalogue({ c, onPick, onBack }: {
  c: Palette;
  onPick: (sc: SimulatorScenario) => void;
  onBack: () => void;
}) {
  const { t, lang, pick } = useI18n();
  const { gutter, gap, columns, itemWidth } = useLayout();
  const [filtre, setFiltre] = useState<SimulatorCategory | 'all'>('all');
  const [niveau, setNiveau] = useState<string | 'all'>('all');

  const cols = columns(300, 3);
  const largeur = itemWidth(cols);

  // Niveaux réellement présents dans le catalogue, dans l'ordre CECR.
  const niveaux = LEVEL_ORDER.filter(l => simulatorScenarios.some(x => x.levelFloor === l));

  // Les deux filtres se combinent, et la liste est triée par niveau : le
  // catalogue se lit comme une progression, pas comme un tirage aléatoire.
  const visibles = simulatorScenarios
    .filter(x => (filtre === 'all' || x.category === filtre)
              && (niveau === 'all' || x.levelFloor === niveau))
    .slice()
    .sort((a, b) => LEVEL_ORDER.indexOf(a.levelFloor) - LEVEL_ORDER.indexOf(b.levelFloor));

  const chips = [
    { key: 'all' as const, label: t('sim.allCategories'), emoji: '✳️' },
    ...SIMULATOR_CATEGORIES.map(m => ({
      key: m.key, label: lang === 'en' ? m.labelEn : m.labelFr, emoji: m.emoji,
    })),
  ].map(ch => {
    const on = filtre === ch.key;
    return (
      <TouchableOpacity
        key={ch.key}
        onPress={() => setFiltre(ch.key as SimulatorCategory | 'all')}
        style={[s.chip, {
          backgroundColor: on ? c.primaryRed : c.cardBg,
          borderColor: on ? c.primaryRed : c.borderLight,
        }]}
      >
        <Text style={[s.chipTxt, { color: on ? '#FFF' : c.textSecondary }]}>
          {ch.emoji}  {ch.label}
        </Text>
      </TouchableOpacity>
    );
  });

  return (
    <>
      <Head c={c} title={t('sim.title')} onBack={onBack} />
      <Text style={[s.intro, { color: c.textSecondary, paddingHorizontal: gutter }]}>
        {t('sim.intro')}
      </Text>

      <FilterChipRow gutter={gutter} height={44} marginTop={6}>
        {(['all', ...niveaux] as const).map(lv => {
          const on = niveau === lv;
          const accent = lv === 'all' ? c.primaryRed : (LEVEL_COLORS[lv] ?? c.primaryRed);
          return (
            <TouchableOpacity
              key={lv}
              onPress={() => setNiveau(lv)}
              style={[s.chip, {
                backgroundColor: on ? accent + '18' : c.cardBg,
                borderColor: on ? accent : c.borderLight,
              }]}
            >
              <Text style={[s.chipTxt, { color: on ? accent : c.textSecondary }]}>
                {lv === 'all' ? t('sim.allLevels') : lv.toUpperCase()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </FilterChipRow>

      <FilterChipRow gutter={gutter} height={44} marginTop={2} marginBottom={10}>{chips}</FilterChipRow>

      <FlatList
        style={{ flex: 1 }}
        data={visibles}
        key={cols}
        numColumns={cols}
        keyExtractor={x => x.id}
        contentContainerStyle={{ padding: gutter, gap }}
        columnWrapperStyle={cols > 1 ? { gap } : undefined}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[s.card, {
              backgroundColor: c.cardBg, borderColor: c.borderLight,
              width: cols > 1 ? largeur : undefined,
            }]}
            onPress={() => onPick(item)}
            activeOpacity={0.8}
          >
            <View style={s.cardTop}>
              <Text style={s.cardEmoji}>{item.emoji}</Text>
              <View style={[s.diff, { backgroundColor: (LEVEL_COLORS[item.levelFloor] ?? c.primaryRed) + '22' }]}>
                <Text style={[s.diffTxt, { color: LEVEL_COLORS[item.levelFloor] ?? c.primaryRed }]}>
                  {item.levelFloor.toUpperCase()}
                </Text>
              </View>
            </View>
            <Text style={[s.cardTitle, { color: c.textPrimary }]} numberOfLines={1}>
              {pick(item.titleFr, item.titleEn)}
            </Text>
            <Text style={[s.cardDesc, { color: c.textSecondary }]} numberOfLines={2}>
              {pick(item.descriptionFr, item.descriptionEn)}
            </Text>
            <View style={s.cardFoot}>
              <Ionicons name="footsteps-outline" size={13} color={c.textTertiary} />
              <Text style={[s.cardFootTxt, { color: c.textTertiary }]}>
                {t('sim.stepsCount', { n: String(item.steps.length) })}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </>
  );
}

// ─── 2. Briefing ─────────────────────────────────────────────────────────────

function Briefing({ c, scenario, onStart, onBack }: {
  c: Palette;
  scenario: SimulatorScenario;
  onStart: () => void;
  onBack: () => void;
}) {
  const { t, pick } = useI18n();
  const { gutter } = useLayout();

  const Bloc = ({ icon, titre, children }: {
    icon: React.ComponentProps<typeof Ionicons>['name'];
    titre: string;
    children: React.ReactNode;
  }) => (
    <View style={[s.bloc, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}>
      <View style={s.blocHead}>
        <Ionicons name={icon} size={16} color={c.primaryRed} />
        <Text style={[s.blocTitle, { color: c.textPrimary }]}>{titre}</Text>
      </View>
      {children}
    </View>
  );

  return (
    <>
      <Head c={c} title={pick(scenario.titleFr, scenario.titleEn)} onBack={onBack} />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: gutter, paddingBottom: 40, gap: 12 }}
      >
        <View style={s.hero}>
          <Text style={s.heroEmoji}>{scenario.emoji}</Text>
          <Text style={[s.heroTitle, { color: c.textPrimary }]}>
            {pick(scenario.titleFr, scenario.titleEn)}
          </Text>
          <Text style={[s.heroDesc, { color: c.textSecondary }]}>
            {pick(scenario.descriptionFr, scenario.descriptionEn)}
          </Text>
        </View>

        <Bloc icon="person-outline" titre={t('sim.persona')}>
          <Text style={[s.blocBody, { color: c.textSecondary }]}>
            {pick(scenario.personaFr, scenario.personaEn)}
          </Text>
        </Bloc>

        <Bloc icon="flag-outline" titre={t('sim.goal')}>
          <Text style={[s.blocBody, { color: c.textSecondary }]}>
            {pick(scenario.goalFr, scenario.goalEn)}
          </Text>
        </Bloc>

        <Bloc icon="book-outline" titre={t('sim.vocab')}>
          {scenario.vocab.map((v, i) => (
            <View key={`${v.hanzi}-${i}`} style={[s.vocabRow, { borderTopColor: c.borderLight }]}>
              <View style={{ flex: 1 }}>
                <Text style={[s.vocabHanzi, { color: c.textPrimary }]}>{v.hanzi}</Text>
                <Text style={[s.vocabPinyin, { color: c.textTertiary }]}>{v.pinyin}</Text>
              </View>
              <Text style={[s.vocabTrad, { color: c.textSecondary }]}>
                {pick(v.translationFr, v.translationEn)}
              </Text>
            </View>
          ))}
        </Bloc>

        <Bloc icon="footsteps-outline" titre={t('sim.steps')}>
          {scenario.steps.map((st, i) => (
            <View key={st.id} style={[s.stepRow, { borderTopColor: c.borderLight }]}>
              <View style={[s.stepNum, { backgroundColor: c.primaryRed + '1A' }]}>
                <Text style={[s.stepNumTxt, { color: c.primaryRed }]}>{i + 1}</Text>
              </View>
              <Text style={[s.stepName, { color: c.textSecondary }]}>
                {pick(st.nameFr, st.nameEn)}
              </Text>
            </View>
          ))}
        </Bloc>

        <TouchableOpacity
          style={[s.cta, { backgroundColor: c.primaryRed }]}
          onPress={onStart}
          activeOpacity={0.85}
        >
          <Ionicons name="play" size={18} color="#FFF" />
          <Text style={s.ctaTxt}>{t('sim.start')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

// ─── 3. Conversation ─────────────────────────────────────────────────────────

const nouvelId = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

function Conversation({ c, scenario, onBack }: {
  c: Palette;
  scenario: SimulatorScenario;
  onBack: () => void;
}) {
  const { t, lang, pick } = useI18n();
  const { gutter } = useLayout();
  const { addXp } = useUserStats();
  const listRef = useRef<FlatList<SimulatorTurn>>(null);
  const xpDonne = useRef(false);

  // Premier tour : la salutation d'ouverture du scénario si elle existe. La
  // poser nous-mêmes évite un aller-retour réseau avant que l'utilisateur
  // puisse lire quoi que ce soit.
  const [turns, setTurns] = useState<SimulatorTurn[]>(() =>
    scenario.openingLineHanzi
      ? [{
          id: nouvelId(), role: 'assistant',
          hanzi: scenario.openingLineHanzi,
          pinyin: scenario.openingLinePinyin,
          translationFr: scenario.openingLineFr,
          createdAt: Date.now(),
        }]
      : []
  );
  const [saisie, setSaisie] = useState('');
  const [enCours, setEnCours] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);
  const [fini, setFini] = useState(false);
  const [correctionsOuvertes, setCorrectionsOuvertes] = useState(false);
  // Texte ouvert dans la modale de sélection libre (poignées iOS).
  const [selText, setSelText] = useState<string | null>(null);
  // Pinyin et traduction débrayables : c'est un exercice — pouvoir se tester
  // sans les béquilles, puis les rallumer pour vérifier. Actifs au départ.
  const [showPinyin, setShowPinyin] = useState(true);
  const [showTrans, setShowTrans] = useState(true);

  const etape = guessCurrentStepIndex(scenario, turns);
  const etapeCourante = scenario.steps[Math.min(etape, scenario.steps.length - 1)];

  /**
   * Les aides d'étape, débarrassées du chinois tout prêt.
   *
   * Les données portent des suggestions du type « Commande un plat (我要一份…) » :
   * la parenthèse donne la phrase à recopier, et l'exercice — produire du
   * chinois soi-même — disparaît. On garde la consigne, on retire toute
   * parenthèse contenant des caractères chinois. Fait à l'affichage plutôt que
   * dans les données : elles restent identiques au web.
   */
  const aides = useMemo(() => {
    const brutes = pick(etapeCourante.hintsFr, etapeCourante.hintsEn) ?? [];
    return brutes
      .map(h => h.replace(/\s*[（(][^()（）]*[一-鿿][^()（）]*[)）]/g, '').trim())
      .filter(Boolean)
      .slice(0, 3);
  }, [etapeCourante, pick]);

  const corrections = useMemo(
    () => turns.flatMap(x => x.corrections ?? []),
    [turns],
  );

  const envoyer = useCallback(async () => {
    const texte = saisie.trim();
    if (!texte || enCours || fini) return;

    const mien: SimulatorTurn = {
      id: nouvelId(), role: 'user', hanzi: texte, createdAt: Date.now(),
    };
    // L'historique envoyé au modèle est celui d'AVANT ce message : le message
    // lui-même part dans `userMessage`. L'y remettre le ferait compter deux fois.
    const avant = turns;
    setTurns(prev => [...prev, mien]);
    setSaisie('');
    setEnCours(true);
    setErreur(null);

    try {
      const rep = await sendSimulatorMessage(scenario, avant, texte, lang);
      setTurns(prev => [...prev, {
        id: nouvelId(), role: 'assistant',
        hanzi: rep.hanzi, pinyin: rep.pinyin, translationFr: rep.translationFr,
        corrections: rep.corrections.length ? rep.corrections : undefined,
        createdAt: Date.now(),
      }]);
      if (rep.isComplete) {
        setFini(true);
        if (!xpDonne.current) { xpDonne.current = true; void addXp(60); }
      }
    } catch (e: any) {
      // On retire le message envoyé : le laisser afficher alors qu'il n'est
      // jamais parvenu au personnage laisserait croire qu'il a été ignoré.
      setTurns(prev => prev.filter(x => x.id !== mien.id));
      setSaisie(texte);
      setErreur(e?.message ?? t('sim.errorGeneric'));
    } finally {
      setEnCours(false);
    }
  }, [saisie, enCours, fini, turns, scenario, lang, addXp, t]);

  const copierBulle = (item: SimulatorTurn) => {
    // iOS ne permet pas d'étirer une sélection sur un texte affiché (limite
    // React Native) : l'appui long offre donc la copie par nature de contenu,
    // le chinois seul étant ce qu'on recolle le plus souvent.
    const actions = [
      item.hanzi ? { text: t('copy.hanzi'), onPress: () => copyText(item.hanzi!) } : null,
      item.pinyin ? { text: t('copy.pinyin'), onPress: () => copyText(item.pinyin!) } : null,
      item.translationFr ? { text: t('copy.translation'), onPress: () => copyText(item.translationFr!) } : null,
    ].filter(Boolean) as { text: string; onPress: () => void }[];
    Alert.alert(t('copy.title'), item.hanzi ?? '', [
      ...actions,
      {
        text: t('copy.select'),
        onPress: () => setSelText([item.hanzi, item.pinyin, item.translationFr].filter(Boolean).join('\n')),
      },
      { text: t('common.cancel'), style: 'cancel' as const },
    ]);
  };

  const bulle = ({ item }: { item: SimulatorTurn }) => {
    const moi = item.role === 'user';
    return (
      <View style={[s.bubbleWrap, moi ? s.bubbleRight : s.bubbleLeft]}>
        <Pressable onLongPress={() => copierBulle(item)} delayLongPress={350} style={[s.bubble, {
          backgroundColor: moi ? c.primaryRed : c.cardBg,
          borderColor: moi ? c.primaryRed : c.borderLight,
        }]}>
          <Text style={[s.bubbleHanzi, { color: moi ? '#FFF' : c.textPrimary }]}>
            {item.hanzi}
          </Text>
          {showPinyin && !!item.pinyin && (
            <Text style={[s.bubblePinyin, { color: moi ? '#FFFFFFAA' : c.textTertiary }]}>
              {item.pinyin}
            </Text>
          )}
          {showTrans && !!item.translationFr && (
            <Text style={[s.bubbleTrad, { color: moi ? '#FFFFFFCC' : c.textSecondary }]}>
              {item.translationFr}
            </Text>
          )}
        </Pressable>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 8 : 0}
    >
      <Head c={c} title={pick(scenario.titleFr, scenario.titleEn)} onBack={onBack} />

      {/* Progression : une pastille par étape. Le modèle décide lui-même du
          rythme, cette barre reflète les répliques données, pas une validation. */}
      <View style={[s.progress, { paddingHorizontal: gutter, borderBottomColor: c.borderLight }]}>
        <View style={s.progressDots}>
          {scenario.steps.map((st, i) => (
            <View
              key={st.id}
              style={[s.dot, {
                backgroundColor: i <= etape ? c.primaryRed : c.borderLight,
                width: i === etape ? 20 : 8,
              }]}
            />
          ))}
        </View>
        <View style={s.stepRow2}>
          <Text style={[s.progressTxt, { color: c.textSecondary, flex: 1 }]} numberOfLines={1}>
            {t('sim.stepLabel', {
              n: String(Math.min(etape + 1, scenario.steps.length)),
              name: pick(etapeCourante.nameFr, etapeCourante.nameEn),
            })}
          </Text>
          {/* Pinyin et traduction débrayables, comme dans le lecteur de
              dialogues : on se teste béquilles coupées, on les rallume pour
              vérifier. */}
          <TouchableOpacity
            onPress={() => setShowPinyin(v => !v)}
            style={[s.toggleBtn, { borderColor: showPinyin ? c.primaryRed : c.borderMedium, backgroundColor: showPinyin ? c.primaryRed + '14' : 'transparent' }]}
            hitSlop={6}
          >
            <Text style={[s.toggleBtnTxt, { color: showPinyin ? c.primaryRed : c.textTertiary }]}>pīn</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowTrans(v => !v)}
            style={[s.toggleBtn, { borderColor: showTrans ? c.primaryRed : c.borderMedium, backgroundColor: showTrans ? c.primaryRed + '14' : 'transparent' }]}
            hitSlop={6}
          >
            <Ionicons name="language" size={14} color={showTrans ? c.primaryRed : c.textTertiary} />
          </TouchableOpacity>
        </View>
        {/* Les aides vivent ici, sous l'étape qu'elles décrivent — pas collées
            à la zone de saisie, où elles ressemblaient à du texte à recopier.
            Et sans le chinois tout prêt : la consigne dit QUOI faire, à
            l'apprenant de trouver COMMENT le dire. */}
        {!fini && aides.length > 0 && (
          <View style={s.hintsInline}>
            {aides.map((h, i) => (
              <Text key={i} style={[s.hint, { color: c.textTertiary }]} numberOfLines={1}>
                · {h}
              </Text>
            ))}
          </View>
        )}
      </View>

      <FlatList
        ref={listRef}
        style={{ flex: 1 }}
        data={turns}
        keyExtractor={x => x.id}
        renderItem={bulle}
        contentContainerStyle={{ padding: gutter, gap: 10, paddingBottom: 16 }}
        onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
        ListFooterComponent={
          <>
            {enCours && (
              <View style={[s.bubbleWrap, s.bubbleLeft]}>
                <View style={[s.bubble, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}>
                  <ActivityIndicator size="small" color={c.primaryRed} />
                </View>
              </View>
            )}
            {fini && (
              <View style={[s.done, { backgroundColor: '#4CAF5018', borderColor: '#4CAF50' }]}>
                <Ionicons name="checkmark-circle" size={22} color="#4CAF50" />
                <Text style={[s.doneTxt, { color: c.textPrimary }]}>
                  {pick(scenario.successMessageFr, scenario.successMessageEn) ?? t('sim.done')}
                </Text>
              </View>
            )}
          </>
        }
      />

      {!!erreur && (
        <Text style={[s.err, { color: c.primaryRed, paddingHorizontal: gutter }]} numberOfLines={2}>
          {erreur}
        </Text>
      )}

      {corrections.length > 0 && (
        <TouchableOpacity
          style={[s.corrToggle, { borderTopColor: c.borderLight, paddingHorizontal: gutter }]}
          onPress={() => setCorrectionsOuvertes(v => !v)}
        >
          <Ionicons name="school-outline" size={16} color={c.primaryRed} />
          <Text style={[s.corrToggleTxt, { color: c.primaryRed }]}>
            {t('sim.corrections', { n: String(corrections.length) })}
          </Text>
          <Ionicons
            name={correctionsOuvertes ? 'chevron-down' : 'chevron-up'}
            size={15} color={c.primaryRed}
          />
        </TouchableOpacity>
      )}
      {correctionsOuvertes && (
        <ScrollView style={{ maxHeight: 200 }} contentContainerStyle={{ paddingHorizontal: gutter }}>
          {corrections.map((co: SimulatorCorrection, i) => (
            <View key={i} style={[s.corr, { borderBottomColor: c.borderLight }]}>
              <Text style={[s.corrLine, { color: c.textPrimary }]}>
                <Text style={{ textDecorationLine: 'line-through', color: c.textTertiary }}>{co.wrong}</Text>
                {'  →  '}
                <Text style={{ fontWeight: '800' }}>{co.correct}</Text>
              </Text>
              {!!co.explanation && (
                <Text style={[s.corrWhy, { color: c.textSecondary }]}>{co.explanation}</Text>
              )}
            </View>
          ))}
        </ScrollView>
      )}

      <View style={[s.inputBar, { borderTopColor: c.borderLight, backgroundColor: c.appBg, paddingHorizontal: gutter }]}>
        <TextInput
          style={[s.input, { backgroundColor: c.cardBg, borderColor: c.borderLight, color: c.textPrimary }]}
          value={saisie}
          onChangeText={setSaisie}
          placeholder={fini ? t('sim.finished') : t('sim.placeholder')}
          placeholderTextColor={c.textTertiary}
          editable={!fini}
          multiline
          onSubmitEditing={envoyer}
        />
        <TouchableOpacity
          style={[s.send, { backgroundColor: saisie.trim() && !enCours && !fini ? c.primaryRed : c.borderLight }]}
          onPress={envoyer}
          disabled={!saisie.trim() || enCours || fini}
        >
          <Ionicons name="send" size={18} color="#FFF" />
        </TouchableOpacity>
      </View>
      <AskXiaoBubble prompt={t('xiao.askPrefill', { title: pick(scenario.titleFr, scenario.titleEn) })} />
      {selText !== null && <SelectableTextModal text={selText} onClose={() => setSelText(null)} />}
    </KeyboardAvoidingView>
  );
}

// ─── Écran ───────────────────────────────────────────────────────────────────

type Vue =
  | { ecran: 'catalogue' }
  | { ecran: 'briefing'; scenario: SimulatorScenario }
  | { ecran: 'conversation'; scenario: SimulatorScenario };

export default function SimulateurSituationsScreen() {
  const scheme = useColorScheme();
  const c = Colors[scheme];
  const router = useRouter();
  const { t } = useI18n();
  const { access } = useEntitlements();
  const [vue, setVue] = useState<Vue>({ ecran: 'catalogue' });

  // Verrou Lifetime, et non Premium : le web présente ce simulateur comme une
  // exclusivité de l'accès à vie. L'ouvrir aux abonnés mensuels ici ferait de
  // l'argumentaire du web une promesse fausse dans un sens ou dans l'autre.
  if (!access.isLifetime) {
    return (
      <SafeAreaView style={[s.root, { backgroundColor: c.appBg }]} edges={['top', 'bottom']}>
        <Head c={c} title={t('sim.title')} onBack={() => router.back()} />
        <PremiumGate colors={c} titleKey="gate.simTitle" bodyKey="gate.simBody" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[s.root, { backgroundColor: c.appBg }]} edges={['top', 'bottom']}>
      {vue.ecran === 'catalogue' && (
        <Catalogue
          c={c}
          onPick={sc => setVue({ ecran: 'briefing', scenario: sc })}
          onBack={() => router.back()}
        />
      )}
      {vue.ecran === 'briefing' && (
        <Briefing
          c={c}
          scenario={vue.scenario}
          onStart={() => setVue({ ecran: 'conversation', scenario: vue.scenario })}
          onBack={() => setVue({ ecran: 'catalogue' })}
        />
      )}
      {vue.ecran === 'conversation' && (
        <Conversation
          c={c}
          scenario={vue.scenario}
          // Retour au briefing plutôt qu'au catalogue : on quitte souvent une
          // conversation pour relire le vocabulaire, pas pour changer de scénario.
          onBack={() => setVue({ ecran: 'briefing', scenario: vue.scenario })}
        />
      )}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },

  head: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 8, paddingVertical: 8, borderBottomWidth: 1,
  },
  headBtn: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center' },
  headTitle: { flex: 1, fontSize: 17, fontWeight: '800', textAlign: 'center' },

  intro: { fontSize: 13, lineHeight: 18, marginTop: 10 },
  chip: { paddingHorizontal: 13, paddingVertical: 8, borderRadius: 20, borderWidth: 1.5 },
  chipTxt: { fontSize: 12.5, fontWeight: '700' },

  card: { borderRadius: 16, borderWidth: 1, padding: 14, gap: 6, flex: 1 },
  cardTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cardEmoji: { fontSize: 28 },
  diff: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  diffTxt: { fontSize: 10.5, fontWeight: '800' },
  cardTitle: { fontSize: 15.5, fontWeight: '800' },
  cardDesc: { fontSize: 12.5, lineHeight: 17 },
  cardFoot: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  cardFootTxt: { fontSize: 11.5, fontWeight: '600' },

  hero: { alignItems: 'center', gap: 6, paddingVertical: 8 },
  heroEmoji: { fontSize: 52 },
  heroTitle: { fontSize: 20, fontWeight: '800', textAlign: 'center' },
  heroDesc: { fontSize: 13.5, lineHeight: 19, textAlign: 'center' },

  bloc: { borderRadius: 14, borderWidth: 1, padding: 14, gap: 8 },
  blocHead: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  blocTitle: { fontSize: 13, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.4 },
  blocBody: { fontSize: 14, lineHeight: 20 },

  vocabRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingTop: 8, borderTopWidth: 1 },
  vocabHanzi: { fontSize: 17, fontWeight: '700' },
  vocabPinyin: { fontSize: 12 },
  vocabTrad: { fontSize: 13, flex: 1, textAlign: 'right' },

  stepRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingTop: 8, borderTopWidth: 1 },
  stepNum: { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  stepNumTxt: { fontSize: 12, fontWeight: '800' },
  stepName: { fontSize: 14, flex: 1 },

  cta: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    paddingVertical: 15, borderRadius: 14, marginTop: 6,
  },
  ctaTxt: { color: '#FFF', fontSize: 15.5, fontWeight: '800' },

  progress: { paddingVertical: 10, gap: 6, borderBottomWidth: 1 },
  progressDots: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  dot: { height: 8, borderRadius: 4 },
  progressTxt: { fontSize: 12.5, fontWeight: '700' },
  stepRow2: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  toggleBtn: {
    borderRadius: 8, borderWidth: 1.5, paddingHorizontal: 8, paddingVertical: 3,
    alignItems: 'center', justifyContent: 'center', minWidth: 34,
  },
  toggleBtnTxt: { fontSize: 12, fontWeight: '700' },
  hintsInline: { gap: 1, marginTop: 2 },

  bubbleWrap: { flexDirection: 'row' },
  bubbleLeft: { justifyContent: 'flex-start' },
  bubbleRight: { justifyContent: 'flex-end' },
  // `flexShrink: 1` avec le `maxWidth` : même précaution que les bulles du
  // lecteur de dialogues, où son absence rognait le dernier caractère.
  bubble: { maxWidth: '82%', flexShrink: 1, borderRadius: 16, borderWidth: 1, paddingHorizontal: 13, paddingVertical: 10, gap: 3 },
  bubbleHanzi: { fontSize: 17, fontWeight: '600', lineHeight: 24 },
  bubblePinyin: { fontSize: 12.5 },
  bubbleTrad: { fontSize: 13, fontStyle: 'italic', lineHeight: 18 },

  done: {
    flexDirection: 'row', alignItems: 'center', gap: 9,
    borderRadius: 14, borderWidth: 1.5, padding: 14, marginTop: 10,
  },
  doneTxt: { flex: 1, fontSize: 14, fontWeight: '700', lineHeight: 19 },

  err: { fontSize: 12.5, fontWeight: '600', paddingBottom: 6 },

  hint: { fontSize: 12, lineHeight: 17 },

  corrToggle: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingVertical: 10, borderTopWidth: 1,
  },
  corrToggleTxt: { flex: 1, fontSize: 13, fontWeight: '700' },
  corr: { paddingVertical: 9, borderBottomWidth: 1, gap: 3 },
  corrLine: { fontSize: 14.5 },
  corrWhy: { fontSize: 12.5, lineHeight: 17 },

  inputBar: {
    flexDirection: 'row', alignItems: 'flex-end', gap: 8,
    paddingVertical: 9, borderTopWidth: 1,
  },
  input: {
    flex: 1, borderRadius: 20, borderWidth: 1,
    paddingHorizontal: 14, paddingTop: 10, paddingBottom: 10,
    fontSize: 15, maxHeight: 110,
  },
  send: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
});
