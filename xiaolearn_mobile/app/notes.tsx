/**
 * Mes notes — carnet personnel, synchronisé avec le web.
 *
 * Même clé et même format que l'app web (`xl_notes_v1`) : une note prise ici
 * apparaît là-bas, et réciproquement.
 */
import { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList,
  Modal, Pressable, Alert, useWindowDimensions, KeyboardAvoidingView, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';
import { useI18n } from '@/contexts/LanguageContext';
import {
  useNotes, NOTE_TAGS, NOTE_TAG_LABELS, NOTE_TITLE_MAX, NOTE_CONTENT_MAX,
  type PersonalNote, type NoteTag,
} from '@/hooks/useNotes';

export default function NotesScreen() {
  const scheme = useColorScheme();
  const c = Colors[scheme];
  const router = useRouter();
  const { t, pick, lang } = useI18n();
  const { width } = useWindowDimensions();
  const px = width >= 768 ? 24 : 16;
  const { notes, upsert, remove } = useNotes();

  const [editing, setEditing] = useState<PersonalNote | null>(null);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState<string | undefined>();

  const startNew = () => {
    setEditing(null); setTitle(''); setContent(''); setTag(undefined); setOpen(true);
  };
  const startEdit = (n: PersonalNote) => {
    setEditing(n); setTitle(n.title); setContent(n.content); setTag(n.tag); setOpen(true);
  };
  const submit = async () => {
    await upsert({ id: editing?.id, title, content, tag });
    setOpen(false);
  };
  const confirmDelete = (n: PersonalNote) => {
    Alert.alert(t('notes.deleteAsk'), n.title || '—', [
      { text: t('common.cancel'), style: 'cancel' },
      { text: t('notes.delete'), style: 'destructive', onPress: () => { void remove(n.id); } },
    ]);
  };

  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString(lang === 'en' ? 'en-US' : 'fr-FR',
      { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <SafeAreaView style={[s.root, { backgroundColor: c.appBg }]} edges={['top']}>
      <View style={[s.header, { paddingHorizontal: px }]}>
        <TouchableOpacity onPress={() => router.back()} style={s.iconBtn}>
          <Ionicons name="arrow-back" size={24} color={c.textPrimary} />
        </TouchableOpacity>
        <View style={{ flex: 1, marginLeft: 4 }}>
          <Text style={[s.title, { color: c.textPrimary }]}>{t('notes.title')}</Text>
          {notes.length > 0 && (
            <Text style={[s.subtitle, { color: c.textSecondary }]}>
              {t('notes.count', { n: notes.length })}
            </Text>
          )}
        </View>
        <TouchableOpacity onPress={startNew} style={[s.addBtn, { backgroundColor: c.primaryRed }]}>
          <Ionicons name="add" size={22} color="#FFF" />
        </TouchableOpacity>
      </View>

      {notes.length === 0 ? (
        <View style={[s.empty, { paddingHorizontal: px }]}>
          <Ionicons name="document-text-outline" size={44} color={c.textTertiary} />
          <Text style={[s.emptyTitle, { color: c.textPrimary }]}>{t('notes.empty')}</Text>
          <Text style={[s.emptyTxt, { color: c.textSecondary }]}>{t('notes.emptyHint')}</Text>
          <TouchableOpacity onPress={startNew} style={[s.emptyBtn, { backgroundColor: c.primaryRed }]}>
            <Text style={s.emptyBtnTxt}>{t('notes.new')}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={notes}
          keyExtractor={n => n.id}
          contentContainerStyle={{ paddingHorizontal: px, paddingBottom: 32, gap: 10 }}
          renderItem={({ item }) => {
            const meta = item.tag ? NOTE_TAG_LABELS[item.tag as NoteTag] : undefined;
            return (
              <TouchableOpacity
                onPress={() => startEdit(item)}
                onLongPress={() => confirmDelete(item)}
                activeOpacity={0.8}
                style={[s.card, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}
              >
                <View style={s.cardTop}>
                  <Text style={[s.cardTitle, { color: c.textPrimary }]} numberOfLines={1}>
                    {item.title || '—'}
                  </Text>
                  {meta && (
                    <View style={[s.tag, { backgroundColor: meta.color + '22' }]}>
                      <Text style={[s.tagTxt, { color: meta.color }]}>{pick(meta.fr, meta.en)}</Text>
                    </View>
                  )}
                </View>
                {!!item.content && (
                  <Text style={[s.cardBody, { color: c.textSecondary }]} numberOfLines={3}>
                    {item.content}
                  </Text>
                )}
                <Text style={[s.cardDate, { color: c.textTertiary }]}>{fmt(item.updatedAt)}</Text>
              </TouchableOpacity>
            );
          }}
        />
      )}

      {/* Éditeur */}
      <Modal visible={open} transparent animationType="slide" onRequestClose={() => setOpen(false)}>
        <Pressable style={s.backdrop} onPress={() => setOpen(false)} />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={s.sheetWrap}
        >
          <View style={[s.sheet, { backgroundColor: c.cardBg }]}>
            <View style={s.sheetHead}>
              <Text style={[s.sheetTitle, { color: c.textPrimary }]}>
                {editing ? t('notes.edit') : t('notes.new')}
              </Text>
              <TouchableOpacity onPress={() => setOpen(false)} style={s.iconBtn}>
                <Ionicons name="close" size={22} color={c.textSecondary} />
              </TouchableOpacity>
            </View>

            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder={t('notes.titlePh')}
              placeholderTextColor={c.textTertiary}
              maxLength={NOTE_TITLE_MAX}
              style={[s.input, { color: c.textPrimary, backgroundColor: c.cardBgAlt, borderColor: c.borderLight }]}
            />
            <TextInput
              value={content}
              onChangeText={setContent}
              placeholder={t('notes.contentPh')}
              placeholderTextColor={c.textTertiary}
              maxLength={NOTE_CONTENT_MAX}
              multiline
              style={[s.input, s.textarea, { color: c.textPrimary, backgroundColor: c.cardBgAlt, borderColor: c.borderLight }]}
            />

            <View style={s.tags}>
              <TouchableOpacity
                onPress={() => setTag(undefined)}
                style={[s.tagPick, {
                  borderColor: tag ? c.borderLight : c.primaryRed,
                  backgroundColor: tag ? 'transparent' : c.primaryRed + '18',
                }]}
              >
                <Text style={[s.tagPickTxt, { color: tag ? c.textSecondary : c.primaryRed }]}>
                  {t('notes.noTag')}
                </Text>
              </TouchableOpacity>
              {NOTE_TAGS.map(tg => {
                const meta = NOTE_TAG_LABELS[tg];
                const on = tag === tg;
                return (
                  <TouchableOpacity
                    key={tg}
                    onPress={() => setTag(tg)}
                    style={[s.tagPick, {
                      borderColor: on ? meta.color : c.borderLight,
                      backgroundColor: on ? meta.color + '22' : 'transparent',
                    }]}
                  >
                    <Text style={[s.tagPickTxt, { color: on ? meta.color : c.textSecondary }]}>
                      {pick(meta.fr, meta.en)}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={s.actions}>
              {editing && (
                <TouchableOpacity
                  onPress={() => { setOpen(false); confirmDelete(editing); }}
                  style={[s.delBtn, { borderColor: c.borderLight }]}
                >
                  <Ionicons name="trash-outline" size={18} color="#E8543F" />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={submit}
                disabled={!title.trim() && !content.trim()}
                style={[s.saveBtn, {
                  backgroundColor: c.primaryRed,
                  opacity: !title.trim() && !content.trim() ? 0.4 : 1,
                }]}
              >
                <Text style={s.saveTxt}>{t('notes.save')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', paddingTop: 8, paddingBottom: 14 },
  iconBtn: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '800' },
  subtitle: { fontSize: 12.5, marginTop: 1 },
  addBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  card: { borderRadius: 16, borderWidth: 1, padding: 14, gap: 6 },
  cardTop: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  cardTitle: { flex: 1, fontSize: 15.5, fontWeight: '700' },
  tag: { borderRadius: 20, paddingHorizontal: 9, paddingVertical: 3 },
  tagTxt: { fontSize: 11, fontWeight: '700' },
  cardBody: { fontSize: 13.5, lineHeight: 19 },
  cardDate: { fontSize: 11.5 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10 },
  emptyTitle: { fontSize: 17, fontWeight: '700', textAlign: 'center' },
  emptyTxt: { fontSize: 14, lineHeight: 20, textAlign: 'center' },
  emptyBtn: { marginTop: 10, borderRadius: 14, paddingHorizontal: 22, paddingVertical: 12 },
  emptyBtnTxt: { color: '#FFF', fontSize: 15, fontWeight: '700' },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)' },
  sheetWrap: { flex: 1, justifyContent: 'flex-end' },
  sheet: { borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, gap: 12 },
  sheetHead: { flexDirection: 'row', alignItems: 'center' },
  sheetTitle: { flex: 1, fontSize: 18, fontWeight: '800' },
  input: { borderRadius: 14, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15 },
  textarea: { minHeight: 130, textAlignVertical: 'top' },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tagPick: { borderRadius: 20, borderWidth: 1.5, paddingHorizontal: 12, paddingVertical: 7 },
  tagPickTxt: { fontSize: 12.5, fontWeight: '600' },
  actions: { flexDirection: 'row', gap: 10, marginTop: 4 },
  delBtn: {
    width: 50, borderRadius: 14, borderWidth: 1,
    alignItems: 'center', justifyContent: 'center',
  },
  saveBtn: { flex: 1, borderRadius: 14, paddingVertical: 14, alignItems: 'center' },
  saveTxt: { color: '#FFF', fontSize: 15.5, fontWeight: '700' },
});
