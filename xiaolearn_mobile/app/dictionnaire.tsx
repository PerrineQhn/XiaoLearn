/**
 * XiaoLearn Mobile — Dictionnaire
 * Source : mêmes données HSK que l'app web (hsk1 + hsk2 + hsk3)
 */
import { useState, useMemo } from 'react';
import {
  View, Text, StyleSheet, TextInput, FlatList,
  TouchableOpacity, useWindowDimensions, Modal, ScrollView, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';
import { useAudio } from '@/hooks/useAudio';
import { HanziWriter } from '@/components/HanziWriter';
import ToneColoredHanzi from '@/components/ToneColoredHanzi';
import { useDisplaySettings } from '@/contexts/DisplaySettingsContext';
import { spacePinyin } from '@/utils/pinyinUtils';
import { useI18n } from '@/contexts/LanguageContext';

// ── Données HSK (même source que l'app web) ───────────────────
import RAW_VOCAB from '@/data/hskVocab.json';
import { useSrs } from '@/contexts/SrsContext';

interface Example {
  hanzi: string;
  pinyin: string;
  translation: string;
  translationEn?: string;
}

interface DictEntry {
  id: string;
  hanzi: string;
  pinyin: string;
  translation: string;
  translationEn?: string;
  translationAlt: string[];
  explanation: string;
  explanationEn?: string;
  category: string;
  categoryEn?: string;
  level: string;
  theme: string;
  themeEn?: string;
  tags: string[];
  examples: Example[];
}

const ALL_VOCAB = RAW_VOCAB as DictEntry[];

const LEVEL_COLOR: Record<string, string> = {
  hsk1: '#4CAF50', hsk2: '#8BC34A', hsk3: '#F9A825',
  hsk4: '#FF9800', hsk5: '#E91E63', hsk6: '#9C27B0', hsk7: '#607D8B',
};

const LEVEL_FILTERS = ['Tous', 'HSK1', 'HSK2', 'HSK3', 'HSK4', 'HSK5', 'HSK6', 'HSK7'];

export default function DictionnaireScreen() {
  const scheme = useColorScheme();
  const c = Colors[scheme];
  const { toneColors } = useDisplaySettings();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const px = width >= 768 ? 24 : 16;
  const [query, setQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('Tous');
  const [history, setHistory] = useState<DictEntry[]>([]);
  const selected = history[history.length - 1] ?? null;
  const [writerMode, setWriterMode] = useState<'animate' | 'quiz'>('animate');
  const { playHanzi } = useAudio();
  const { t, pick, lang } = useI18n();
  // Le mot est-il déjà suivi par le SRS ? Décide entre surcharge et création.
  const { srsState } = useSrs();
  const srsIds = useMemo(() => new Set(Object.keys(srsState)), [srsState]);

  // Ouvre une fiche depuis la liste (réinitialise l'historique)
  function openDetail(item: DictEntry) {
    setWriterMode('animate');
    setHistory([item]);
  }

  // Navigation vers un autre mot (empile dans l'historique)
  function navigateTo(item: DictEntry) {
    setWriterMode('animate');
    setHistory(prev => [...prev, item]);
  }

  // ← Retour : revient au mot précédent
  function goBack() {
    setHistory(prev => prev.slice(0, -1));
  }

  // ✕ Ferme le modal complètement
  function closeModal() {
    setHistory([]);
  }

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let filtered = ALL_VOCAB;

    if (levelFilter !== 'Tous') {
      filtered = filtered.filter(e => e.level === levelFilter.toLowerCase());
    }
    if (!q) return filtered.slice(0, 80);

    return filtered.filter(e =>
      e.hanzi.includes(query) ||
      e.pinyin.toLowerCase().includes(q) ||
      e.translation.toLowerCase().includes(q) ||
      (e.translationEn ?? '').toLowerCase().includes(q)
    ).slice(0, 100);
  }, [query, levelFilter]);

  const renderItem = ({ item }: { item: DictEntry }) => {
    const levelCol = LEVEL_COLOR[item.level] ?? c.primaryRed;
    return (
      <TouchableOpacity
        style={[s.row, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}
        onPress={() => openDetail(item)}
        activeOpacity={0.75}
      >
        <TouchableOpacity
          style={[s.playBtn, { backgroundColor: c.primaryRedLight }]}
          onPress={() => playHanzi(item.hanzi)}
        >
          <Ionicons name="volume-high-outline" size={18} color={c.primaryRed} />
        </TouchableOpacity>

        <View style={{ flex: 1 }}>
          <View style={s.topRow}>
            <ToneColoredHanzi hanzi={item.hanzi} pinyin={item.pinyin} enabled={toneColors} style={[s.hanzi, { color: c.textPrimary }]} />
            <Text style={[s.pinyin, { color: c.textTertiary }]}>{item.pinyin}</Text>
            <View style={[s.levelBadge, { backgroundColor: levelCol + '18' }]}>
              <Text style={[s.levelTxt, { color: levelCol }]}>{item.level.toUpperCase()}</Text>
            </View>
          </View>
          <Text style={[s.translation, { color: c.textSecondary }]}>{pick(item.translation, item.translationEn ?? item.translation)}</Text>
          {item.category ? (
            <Text style={[s.category, { color: c.textTertiary }]}>{pick(item.category, item.categoryEn ?? item.category)}</Text>
          ) : null}
        </View>

        <Ionicons name="chevron-forward" size={16} color={c.textTertiary} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[s.root, { backgroundColor: c.appBg }]}>
      {/* Header */}
      <View style={[s.header, { paddingHorizontal: px }]}>
        <TouchableOpacity onPress={() => router.canGoBack() ? router.back() : router.replace('/(tabs)')} style={s.backBtn}>
          <Ionicons name="arrow-back" size={22} color={c.textPrimary} />
        </TouchableOpacity>
        <Text style={[s.title, { color: c.textPrimary }]}>{t('dict.title')}</Text>
        <View style={{ width: 38 }} />
      </View>

      {/* Barre de recherche */}
      <View style={[s.searchWrap, { paddingHorizontal: px }]}>
        <View style={[s.searchBar, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}>
          <Ionicons name="search-outline" size={18} color={c.textTertiary} />
          <TextInput
            style={[s.searchInput, { color: c.textPrimary }]}
            placeholder={t('dict.searchPlaceholder')}
            placeholderTextColor={c.textTertiary}
            value={query}
            onChangeText={setQuery}
            autoCorrect={false}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Ionicons name="close-circle" size={18} color={c.textTertiary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filtre par niveau */}
      <View style={[s.filterRow, { paddingHorizontal: px }]}>
        {LEVEL_FILTERS.map(lvl => {
          const active = lvl === levelFilter;
          const col = lvl === 'Tous' ? c.primaryRed : (LEVEL_COLOR[lvl.toLowerCase()] ?? c.primaryRed);
          return (
            <TouchableOpacity
              key={lvl}
              style={[s.filterBtn, {
                backgroundColor: active ? col + '18' : 'transparent',
                borderColor: active ? col : c.borderLight,
              }]}
              onPress={() => setLevelFilter(lvl)}
            >
              <Text style={[s.filterTxt, { color: active ? col : c.textTertiary }]}>{lvl === 'Tous' ? t('dict.all') : lvl}</Text>
            </TouchableOpacity>
          );
        })}
        <Text style={[s.count, { color: c.textTertiary }]}>
          {results.length}{!query && results.length === 80 ? '+' : ''} {t('dict.wordsUnit')}
        </Text>
      </View>

      <FlatList
        data={results}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: px, paddingBottom: 40, gap: 8 }}
        showsVerticalScrollIndicator={false}
      />

      {/* ── Modal détail ── */}
      <Modal
        visible={!!selected}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={closeModal}
      >
        {selected && (
          <SafeAreaView style={[s.modal, { backgroundColor: c.appBg }]}>
            {/* Modal header */}
            <View style={[s.modalHeader, { borderBottomColor: c.borderLight }]}>
              {history.length > 1 ? (
                <TouchableOpacity onPress={goBack} style={s.modalBackBtn}>
                  <Ionicons name="arrow-back" size={20} color={c.textPrimary} />
                  <Text style={[s.modalBackTxt, { color: c.textPrimary }]}>{t('dict.back')}</Text>
                </TouchableOpacity>
              ) : (
                <View style={{ width: 80 }} />
              )}
              <Text style={[s.modalTitle, { color: c.textPrimary }]}>{t('dict.wordCard')}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <TouchableOpacity
                  style={[s.audioBtn, { backgroundColor: c.primaryRedLight }]}
                  onPress={() => playHanzi(selected.hanzi)}
                >
                  <Ionicons name="volume-high-outline" size={20} color={c.primaryRed} />
                </TouchableOpacity>
                <TouchableOpacity onPress={closeModal} style={s.backBtn}>
                  <Ionicons name="close" size={22} color={c.textPrimary} />
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView contentContainerStyle={s.modalBody} showsVerticalScrollIndicator={false}>
              {/* ── En-tête : hanzi + pinyin + badges ── */}
              <View style={[s.infoCard, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                  <ToneColoredHanzi hanzi={selected.hanzi} pinyin={selected.pinyin} enabled={toneColors} style={[s.detailHanzi, { color: c.textPrimary }]} />
                  {(() => {
                    const col = LEVEL_COLOR[selected.level] ?? c.primaryRed;
                    return (
                      <View style={[s.levelBadgeLg, { backgroundColor: col }]}>
                        <Text style={s.levelTxtLg}>{selected.level.toUpperCase()}</Text>
                      </View>
                    );
                  })()}
                </View>
                <Text style={[s.detailPinyin, { color: c.primaryRed }]}>{selected.pinyin}</Text>
                <Text style={[s.detailTranslation, { color: c.textPrimary }]}>{pick(selected.translation, selected.translationEn ?? selected.translation)}</Text>

                {/*
                  Deux portes vers la personnalisation, selon que le mot est
                  déjà dans le SRS ou non :
                    - présent  → on le personnalise (surcharge)
                    - absent   → on crée une carte, hanzi pré-rempli
                  L'utilisateur ne voit qu'un bouton, la distinction est interne.
                */}
                <TouchableOpacity
                  onPress={() => router.push({
                    pathname: '/carte',
                    params: srsIds.has(selected.id)
                      ? { id: selected.id }
                      : { hanzi: selected.hanzi },
                  } as any)}
                  style={[s.customBtn, { borderColor: c.primaryRed + '50' }]}
                  activeOpacity={0.8}
                >
                  <Ionicons name="create-outline" size={15} color={c.primaryRed} />
                  <Text style={[s.customTxt, { color: c.primaryRed }]}>
                    {srsIds.has(selected.id) ? t('card.customise') : t('card.addNew')}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* ── Autres traductions ── */}
              {lang === 'fr' && selected.translationAlt?.length > 0 && (
                <View style={s.section}>
                  <Text style={[s.sectionTitle, { color: c.textPrimary }]}>{t('dict.altTranslations')}</Text>
                  {selected.translationAlt.map((alt, i) => (
                    <View key={i} style={[s.altRow, { backgroundColor: c.primaryRedLight }]}>
                      <Text style={[s.altTxt, { color: c.textSecondary }]}>{alt}</Text>
                    </View>
                  ))}
                </View>
              )}

              {/* ── Explication ── */}
              {!!selected.explanation && (
                <View style={s.section}>
                  <Text style={[s.sectionTitle, { color: c.textPrimary }]}>{t('dict.explanation')}</Text>
                  <Text style={[s.explanationTxt, { color: c.textSecondary }]}>{pick(selected.explanation, selected.explanationEn ?? selected.explanation)}</Text>
                </View>
              )}

              {/* ── Exemples ── */}
              {selected.examples?.length > 0 && (
                <View style={s.section}>
                  <Text style={[s.sectionTitle, { color: c.textPrimary }]}>{t('dict.examples')}</Text>
                  {selected.examples.map((ex, i) => (
                    <View key={i} style={[s.exampleCard, { backgroundColor: c.cardBg, borderColor: c.borderLight, borderLeftColor: c.primaryRed }]}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={[s.exHanzi, { color: c.textPrimary }]}>{ex.hanzi}</Text>
                        <TouchableOpacity
                          style={[s.exAudioBtn, { backgroundColor: c.primaryRedLight }]}
                          onPress={() => playHanzi(ex.hanzi)}
                        >
                          <Ionicons name="volume-high-outline" size={14} color={c.primaryRed} />
                        </TouchableOpacity>
                      </View>
                      <Text style={[s.exPinyin, { color: c.primaryRed }]}>{ex.pinyin}</Text>
                      <Text style={[s.exTranslation, { color: c.textSecondary }]}>{pick(ex.translation, ex.translationEn ?? ex.translation)}</Text>
                    </View>
                  ))}
                </View>
              )}

              {/* ── Infos (catégorie, thème, tags) ── */}
              <View style={[s.infoGrid, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}>
                <Text style={[s.sectionTitle, { color: c.textPrimary }]}>{t('dict.info')}</Text>
                {selected.category ? <View style={s.infoRow}>
                  <Text style={[s.infoKey, { color: c.textTertiary }]}>{t('dict.category')}</Text>
                  <Text style={[s.infoVal, { color: c.textPrimary }]}>{pick(selected.category, selected.categoryEn ?? selected.category)}</Text>
                </View> : null}
                {selected.theme ? <View style={s.infoRow}>
                  <Text style={[s.infoKey, { color: c.textTertiary }]}>{t('dict.theme')}</Text>
                  <Text style={[s.infoVal, { color: c.textPrimary }]}>{pick(selected.theme, selected.themeEn ?? selected.theme)}</Text>
                </View> : null}
                {selected.tags?.length > 0 && (
                  <View style={[s.infoRow, { alignItems: 'flex-start', marginTop: 4 }]}>
                    <Text style={[s.infoKey, { color: c.textTertiary }]}>{t('dict.tags')}</Text>
                    <View style={{ flexDirection: 'row', gap: 6, flexWrap: 'wrap', flex: 1 }}>
                      {selected.tags.map(tag => (
                        <View key={tag} style={[s.tagChip, { backgroundColor: c.borderLight }]}>
                          <Text style={[s.tagTxt, { color: c.textTertiary }]}>{tag}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                )}
              </View>

              {/* ── Voir aussi (mots composés contenant ce caractère) ── */}
              {(() => {
                const compounds = ALL_VOCAB.filter(
                  e => e.hanzi !== selected.hanzi && e.hanzi.includes(selected.hanzi)
                ).slice(0, 8);
                if (!compounds.length) return null;
                return (
                  <View style={s.section}>
                    <Text style={[s.sectionTitle, { color: c.textPrimary }]}>{t('dict.seeAlso')}</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                      {compounds.map(e => (
                        <TouchableOpacity
                          key={e.id}
                          style={[s.compoundChip, { backgroundColor: c.cardBg, borderColor: c.borderMedium }]}
                          onPress={() => navigateTo(e)}
                        >
                          <Text style={[s.compoundHanzi, { color: c.textPrimary }]}>{e.hanzi}</Text>
                          <Text style={[s.compoundPinyin, { color: c.primaryRed }]}>{e.pinyin}</Text>
                          <Text style={[s.compoundTrans, { color: c.textTertiary }]} numberOfLines={1}>{e.translation}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                );
              })()}

              {/* ── Tracé du caractère ── */}
              <View style={s.section}>
                <Text style={[s.sectionTitle, { color: c.textPrimary }]}>{t('dict.stroke')}</Text>
                <View style={[s.writerCard, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}>
                  <HanziWriter
                    key={`${selected.hanzi}-${writerMode}`}
                    hanzi={selected.hanzi}
                    mode={writerMode}
                    size={200}
                    onComplete={() => {
                      if (writerMode === 'animate') setWriterMode('quiz');
                    }}
                  />
                </View>
                <View style={s.phaseBtns}>
                  <TouchableOpacity
                    style={[s.phaseBtn, { backgroundColor: c.primaryRed }]}
                    onPress={() => setWriterMode('animate')}
                  >
                    <Ionicons name="play-outline" size={16} color="#FFF" />
                    <Text style={s.phaseBtnTxt}>{t('dict.animation')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[s.phaseBtn, { backgroundColor: c.cardBg, borderColor: c.borderMedium, borderWidth: 1.5 }]}
                    onPress={() => setWriterMode('quiz')}
                  >
                    <Ionicons name="pencil-outline" size={16} color={c.textPrimary} />
                    <Text style={[s.phaseBtnTxt, { color: c.textPrimary }]}>{t('dict.trace')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        )}
      </Modal>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: 8, paddingBottom: 12,
  },
  backBtn: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 18, fontWeight: '700' },

  searchWrap: { marginBottom: 10 },
  searchBar: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    borderRadius: 14, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 11,
  },
  searchInput: { flex: 1, fontSize: 15 },

  filterRow: {
    flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12, flexWrap: 'wrap',
  },
  filterBtn: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20, borderWidth: 1 },
  filterTxt: { fontSize: 12, fontWeight: '600' },
  count: { fontSize: 12, marginLeft: 'auto' },

  row: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    borderRadius: 14, borderWidth: 1, padding: 14,
  },
  playBtn: {
    width: 40, height: 40, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  topRow: { flexDirection: 'row', alignItems: 'baseline', gap: 8, marginBottom: 3, flexWrap: 'wrap' },
  hanzi: { fontSize: 22, fontWeight: '500' },
  pinyin: { fontSize: 13 },
  levelBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  levelTxt: { fontSize: 10, fontWeight: '700' },
  translation: { fontSize: 13, lineHeight: 18 },
  category: { fontSize: 11, marginTop: 2, fontStyle: 'italic' },

  // Modal
  modal: { flex: 1 },
  modalHeader: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1,
  },
  modalTitle: { fontSize: 17, fontWeight: '700' },
  audioBtn: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center' },
  modalBackBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingVertical: 6, paddingRight: 8 },
  modalBackTxt: { fontSize: 15, fontWeight: '500' },

  modalBody: { padding: 16, gap: 14 },

  infoCard: {
    borderRadius: 18, borderWidth: 1, padding: 18, gap: 4,
  },
  detailHanzi: { fontSize: 48, fontWeight: '400', lineHeight: 60 },
  levelBadgeLg: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  levelTxtLg: { fontSize: 12, fontWeight: '700', color: '#FFF' },
  detailPinyin: { fontSize: 17, fontWeight: '500', fontStyle: 'italic' },
  customBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 12, borderWidth: 1, borderRadius: 11, paddingVertical: 9 },
  customTxt: { fontSize: 13, fontWeight: '700' },
  detailTranslation: { fontSize: 16, lineHeight: 22, fontWeight: '500' },

  section: { gap: 10 },
  sectionTitle: { fontSize: 15, fontWeight: '700' },

  altRow: { borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8 },
  altTxt: { fontSize: 14, lineHeight: 20 },

  explanationTxt: { fontSize: 14, lineHeight: 22 },

  exampleCard: {
    borderRadius: 12, borderWidth: 1, borderLeftWidth: 4,
    padding: 12, gap: 2,
  },
  exHanzi: { fontSize: 18, fontWeight: '400' },
  exPinyin: { fontSize: 13, fontStyle: 'italic' },
  exTranslation: { fontSize: 13 },
  exAudioBtn: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },

  infoGrid: { borderRadius: 14, borderWidth: 1, padding: 14, gap: 8 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  infoKey: { fontSize: 12, fontWeight: '600', width: 72 },
  infoVal: { fontSize: 13, flex: 1 },
  tagChip: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  tagTxt: { fontSize: 11, fontWeight: '500' },

  writerCard: {
    borderRadius: 18, borderWidth: 1, padding: 16,
    alignItems: 'center', justifyContent: 'center',
    alignSelf: 'center', width: 232, height: 232,
  },

  phaseBtns: { flexDirection: 'row', gap: 12 },
  phaseBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6, borderRadius: 14, paddingVertical: 13,
  },
  phaseBtnTxt: { fontSize: 14, fontWeight: '600', color: '#FFF' },

  compoundChip: {
    borderRadius: 12, borderWidth: 1, padding: 10, minWidth: 90, maxWidth: 140,
  },
  compoundHanzi: { fontSize: 18, fontWeight: '500' },
  compoundPinyin: { fontSize: 12, fontStyle: 'italic' },
  compoundTrans: { fontSize: 11, marginTop: 2 },
});
