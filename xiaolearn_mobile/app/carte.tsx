/**
 * Création et personnalisation d'une carte.
 *
 * Un seul écran pour deux gestes proches, parce que l'utilisateur ne fait pas
 * la différence : dans les deux cas il veut « une carte à moi ». C'est le
 * paramètre de route qui tranche.
 *
 *   /carte                     → création d'une carte de toutes pièces
 *   /carte?id=p:xyz            → modification d'une carte créée
 *   /carte?id=<carte du dico>  → personnalisation : seuls les champs modifiés
 *                                sont enregistrés, le hanzi reste en lecture
 *                                seule puisqu'il identifie la carte d'origine
 *
 * La création est réservée à Premium ; la personnalisation reste offerte —
 * annoter ce qu'on apprend relève du confort de base. Voir data/customCards.ts.
 */
import { useEffect, useMemo, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity,
  Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';
import { useI18n } from '@/contexts/LanguageContext';
import { useEntitlements } from '@/hooks/useEntitlements';
import { useSrs } from '@/contexts/SrsContext';
import { useFirestoreSync } from '@/hooks/useFirestoreSync';
import { PremiumGate } from '@/components/PremiumGate';
import { CECR_LEVELS } from '@/data/cecrLevelsMeta';
import {
  CUSTOM_CARDS_KEY, CARD_OVERRIDES_KEY, isCustomId, newCustomId,
  upsertCustomCard, deleteCustomCard, setOverride,
} from '@/data/customCards';

export default function CarteScreen() {
  const scheme = useColorScheme();
  const c = Colors[scheme];
  const router = useRouter();
  const { t } = useI18n();
  const { access } = useEntitlements();
  const { allCards, customCards, overrides, reloadCustom } = useSrs();
  const { save } = useFirestoreSync([CUSTOM_CARDS_KEY, CARD_OVERRIDES_KEY]);

  const { id, hanzi: presetHanzi } = useLocalSearchParams<{ id?: string; hanzi?: string }>();

  const mode: 'create' | 'editCustom' | 'override' =
    !id ? 'create' : isCustomId(id) ? 'editCustom' : 'override';

  const source = useMemo(() => {
    if (mode === 'editCustom') return customCards.find(x => x.id === id);
    if (mode === 'override') return allCards.find(x => x.id === id);
    return undefined;
  }, [mode, id, customCards, allCards]);

  const [hanzi, setHanzi] = useState('');
  const [pinyin, setPinyin] = useState('');
  const [translation, setTranslation] = useState('');
  const [note, setNote] = useState('');
  const [levelKey, setLevelKey] = useState(CECR_LEVELS[0]?.id ?? 'cecr-a1');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (mode === 'create') { setHanzi(presetHanzi ?? ''); return; }
    if (!source) return;
    setHanzi(source.hanzi);
    setPinyin(source.pinyin ?? '');
    setTranslation(source.translation ?? '');
    setLevelKey((source as any).levelKey ?? levelKey);
    setNote(
      mode === 'editCustom'
        ? (customCards.find(x => x.id === id)?.note ?? '')
        : (overrides[id!]?.note ?? ''),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, source, id]);

  // Le hanzi identifie la carte du dictionnaire : le modifier reviendrait à
  // parler d'un autre mot. On le verrouille en personnalisation.
  const hanziLocked = mode === 'override';
  const canSave = hanzi.trim().length > 0 && (mode === 'override' || translation.trim().length > 0);

  async function onSave() {
    if (!canSave || saving) return;
    setSaving(true);
    try {
      if (mode === 'override') {
        await setOverride(id!, {
          pinyin: pinyin.trim() !== source?.pinyin ? pinyin.trim() : undefined,
          translation: translation.trim() !== source?.translation ? translation.trim() : undefined,
          note: note.trim(),
        }, save);
      } else {
        await upsertCustomCard({
          id: mode === 'editCustom' ? id! : newCustomId(),
          hanzi: hanzi.trim(),
          pinyin: pinyin.trim(),
          translation: translation.trim(),
          note: note.trim() || undefined,
          levelKey,
        }, save);
      }
      await reloadCustom();
      router.back();
    } finally {
      setSaving(false);
    }
  }

  function onDelete() {
    Alert.alert(t('card.deleteTitle'), t('card.deleteBody'), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('card.delete'), style: 'destructive',
        onPress: async () => {
          await deleteCustomCard(id!, save);
          await reloadCustom();
          router.back();
        },
      },
    ]);
  }

  // Verrou d'abonnement : la création seulement.
  if (mode === 'create' && !access.canCreateCustomFlashcards) {
    return (
      <SafeAreaView style={[s.root, { backgroundColor: c.appBg }]}>
        <Header colors={c} title={t('card.newTitle')} onBack={() => router.back()} />
        <PremiumGate colors={c} titleKey="gate.customTitle" bodyKey="gate.customBody" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[s.root, { backgroundColor: c.appBg }]}>
      <Header
        colors={c}
        title={mode === 'override' ? t('card.customiseTitle') : mode === 'editCustom' ? t('card.editTitle') : t('card.newTitle')}
        onBack={() => router.back()}
      />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={s.body} keyboardShouldPersistTaps="handled">

          {mode === 'override' && (
            <Text style={[s.hint, { color: c.textTertiary }]}>{t('card.overrideHint')}</Text>
          )}

          <Field
            label={t('card.hanzi')} colors={c}
            value={hanzi} onChange={setHanzi}
            placeholder="你好" big editable={!hanziLocked}
          />
          <Field
            label={t('card.pinyin')} colors={c}
            value={pinyin} onChange={setPinyin} placeholder="nǐ hǎo"
          />
          <Field
            label={t('card.translation')} colors={c}
            value={translation} onChange={setTranslation} placeholder={t('card.translationPh')}
          />
          <Field
            label={t('card.note')} colors={c}
            value={note} onChange={setNote} placeholder={t('card.notePh')} multiline
          />

          {mode !== 'override' && (
            <View style={{ gap: 8 }}>
              <Text style={[s.label, { color: c.textSecondary }]}>{t('card.level')}</Text>
              <View style={s.levels}>
                {CECR_LEVELS.map(l => {
                  const on = l.id === levelKey;
                  return (
                    <TouchableOpacity
                      key={l.id}
                      onPress={() => setLevelKey(l.id)}
                      activeOpacity={0.8}
                      style={[s.levelChip, {
                        backgroundColor: on ? l.color : 'transparent',
                        borderColor: on ? l.color : c.borderMedium,
                      }]}
                    >
                      <Text style={[s.levelTxt, { color: on ? '#FFF' : c.textSecondary }]}>{l.label}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}

          <TouchableOpacity
            onPress={onSave}
            disabled={!canSave || saving}
            activeOpacity={0.85}
            style={[s.cta, { backgroundColor: canSave ? c.primaryRed : c.borderMedium }]}
          >
            <Text style={s.ctaTxt}>{t('card.save')}</Text>
          </TouchableOpacity>

          {mode === 'editCustom' && (
            <TouchableOpacity onPress={onDelete} style={s.del} activeOpacity={0.7}>
              <Ionicons name="trash-outline" size={15} color="#EF4444" />
              <Text style={s.delTxt}>{t('card.delete')}</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function Header({ colors, title, onBack }: { colors: typeof Colors.light; title: string; onBack: () => void }) {
  return (
    <View style={s.header}>
      <TouchableOpacity onPress={onBack} style={s.back}>
        <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
      </TouchableOpacity>
      <Text style={[s.title, { color: colors.textPrimary }]}>{title}</Text>
    </View>
  );
}

function Field({
  label, value, onChange, placeholder, colors, big, multiline, editable = true,
}: {
  label: string; value: string; onChange: (v: string) => void; placeholder: string;
  colors: typeof Colors.light; big?: boolean; multiline?: boolean; editable?: boolean;
}) {
  return (
    <View style={{ gap: 6 }}>
      <Text style={[s.label, { color: colors.textSecondary }]}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={colors.textTertiary}
        editable={editable}
        multiline={multiline}
        style={[s.input, {
          backgroundColor: editable ? colors.cardBg : colors.cardBgAlt,
          borderColor: colors.borderLight,
          color: colors.textPrimary,
          fontSize: big ? 24 : 15,
          minHeight: multiline ? 78 : 46,
          textAlignVertical: multiline ? 'top' : 'center',
          opacity: editable ? 1 : 0.7,
        }]}
      />
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 16, paddingTop: 8, paddingBottom: 10 },
  back: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: '800' },
  body: { paddingHorizontal: 16, paddingBottom: 40, gap: 16 },
  hint: { fontSize: 12.5, lineHeight: 18 },
  label: { fontSize: 12.5, fontWeight: '700' },
  input: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 13, paddingVertical: 11 },
  levels: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 },
  levelChip: { borderWidth: 1.5, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 7 },
  levelTxt: { fontSize: 12.5, fontWeight: '700' },
  cta: { borderRadius: 14, paddingVertical: 15, alignItems: 'center', marginTop: 4 },
  ctaTxt: { color: '#FFF', fontSize: 15.5, fontWeight: '800' },
  del: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, padding: 12 },
  delTxt: { color: '#EF4444', fontSize: 13, fontWeight: '700' },
});
