/**
 * XiaoLearn Mobile — Écran de conversation 1-1
 * Paramètres : convId (string), otherName (string)
 */
import { useEffect, useRef, useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  FlatList, KeyboardAvoidingView, Platform, Keyboard, ActivityIndicator,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';
import { useMessages, useConversations, type ConvMessage } from '@/hooks/useConversations';
import { useModeration, type ReportReason } from '@/hooks/useModeration';
import { useI18n } from '@/contexts/LanguageContext';
import { Alert } from 'react-native';

// ─── Helper avatar ────────────────────────────────────────────────────────────
const AVATAR_COLORS = ['#E53935','#D81B60','#8E24AA','#5E35B1','#1E88E5','#00897B','#43A047','#FB8C00'];
function avatarColor(uid: string): string {
  let h = 0;
  for (let i = 0; i < uid.length; i++) h = (h * 31 + uid.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}

// ─── Helper heure ─────────────────────────────────────────────────────────────
function formatTime(iso: string, locale: string, yesterdayLabel: string): string {
  try {
    const d = new Date(iso);
    const now = new Date();
    const sameDay = d.toDateString() === now.toDateString();
    if (sameDay) return d.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
    const yesterday = new Date(now.getTime() - 86400000);
    if (d.toDateString() === yesterday.toDateString()) return yesterdayLabel;
    return d.toLocaleDateString(locale, { day: 'numeric', month: 'short' });
  } catch { return ''; }
}

export default function ConversationScreen() {
  const scheme = useColorScheme();
  const colors = Colors[scheme];
  const router = useRouter();
  const { user } = useAuth();
  const insets = useSafeAreaInsets();
  const { t, lang } = useI18n();
  const params = useLocalSearchParams<{ convId: string; otherName: string; otherUid: string }>();
  const convId    = params.convId ?? '';
  const otherName = params.otherName ?? t('conv.userFallback');
  const otherUid  = params.otherUid ?? '';

  const { messages, loading } = useMessages(convId);
  const { sendMessage, markRead } = useConversations();
  const { isBlocked, block, unblock, report } = useModeration();
  const blocked = isBlocked(otherUid);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [kbVisible, setKbVisible] = useState(false);
  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    if (convId) markRead(convId);
    const show = Keyboard.addListener('keyboardWillShow', () => setKbVisible(true));
    const hide  = Keyboard.addListener('keyboardWillHide', () => setKbVisible(false));
    return () => { show.remove(); hide.remove(); };
  }, [convId, markRead]);

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 80);
    }
  }, [messages.length]);

  async function send() {
    const text = input.trim();
    if (!text || sending || blocked) return;
    setSending(true);
    setInput('');
    await sendMessage(convId, text);
    setSending(false);
  }

  /**
   * Signalement en deux temps : le motif d'abord, la confirmation ensuite.
   * Le signalement emporte les derniers messages — voir useModeration pour
   * la raison (la modération ne peut pas lire les conversations).
   */
  function askReport() {
    const motifs: { key: ReportReason; label: string }[] = [
      { key: 'harassment', label: t('mod.reasonHarassment') },
      { key: 'spam', label: t('mod.reasonSpam') },
      { key: 'inappropriate', label: t('mod.reasonInappropriate') },
      { key: 'other', label: t('mod.reasonOther') },
    ];
    Alert.alert(
      t('mod.reportTitle'),
      t('mod.reportBody', { name: otherName }),
      [
        ...motifs.map(m => ({
          text: m.label,
          onPress: async () => {
            const ok = await report({
              reportedUid: otherUid, reportedName: otherName,
              convId, reason: m.key, messages,
            });
            Alert.alert(ok ? t('mod.reportSentTitle') : t('common.error'),
              ok ? t('mod.reportSentBody') : t('mod.reportFailed'));
          },
        })),
        { text: t('common.cancel'), style: 'cancel' as const },
      ],
    );
  }

  function askBlock() {
    Alert.alert(
      t('mod.blockTitle', { name: otherName }),
      t('mod.blockBody'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('mod.blockConfirm'),
          style: 'destructive',
          onPress: async () => {
            // La conversation disparaît de la liste au retour : partir tout de
            // suite évite de laisser l'utilisateur sur un écran mort.
            if (await block(otherUid)) router.back();
          },
        },
      ],
    );
  }

  function openActions() {
    Alert.alert(otherName, undefined, [
      { text: t('mod.actionReport'), onPress: askReport },
      { text: t('mod.actionBlock'), style: 'destructive', onPress: askBlock },
      { text: t('common.cancel'), style: 'cancel' },
    ]);
  }

  const color = avatarColor(otherUid);
  const initial = otherName[0]?.toUpperCase() ?? '?';

  const renderItem = ({ item: msg, index }: { item: ConvMessage; index: number }) => {
    const isMe = msg.senderId === user?.uid;
    const prevMsg = messages[index - 1];
    const nextMsg = messages[index + 1];
    const sameAuthorPrev = prevMsg?.senderId === msg.senderId;
    const sameAuthorNext = nextMsg?.senderId === msg.senderId;

    return (
      <View style={[s.msgRow, isMe ? s.msgRowMe : s.msgRowOther, { marginBottom: sameAuthorNext ? 2 : 10 }]}>
        {!isMe && (
          <View style={[s.avatar, { backgroundColor: sameAuthorNext ? 'transparent' : color }]}>
            {!sameAuthorNext && <Text style={s.avatarTxt}>{initial}</Text>}
          </View>
        )}
        <View style={[s.bubbleWrap, isMe && { alignItems: 'flex-end' }]}>
          <View style={[
            s.bubble,
            isMe
              ? [s.bubbleMe, { backgroundColor: colors.primaryRed }]
              : [s.bubbleOther, { backgroundColor: colors.cardBg, borderColor: colors.borderLight }],
          ]}>
            <Text style={[s.bubbleText, { color: isMe ? '#FFF' : colors.textPrimary }]}>{msg.text}</Text>
          </View>
          {!sameAuthorNext && (
            <Text style={[s.msgTime, { color: colors.textTertiary }]}>{formatTime(msg.sentAt, lang === 'en' ? 'en-US' : 'fr-FR', t('conv.yesterday'))}</Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView edges={['top']} style={[s.root, { backgroundColor: colors.appBg }]}>
      {/* Header */}
      <View style={[s.header, { borderBottomColor: colors.borderLight, backgroundColor: colors.appBg }]}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <View style={[s.headerAvatar, { backgroundColor: color }]}>
          <Text style={s.headerAvatarTxt}>{initial}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[s.headerName, { color: colors.textPrimary }]} numberOfLines={1}>{otherName}</Text>
        </View>
        {/* Signaler / bloquer : accessibles depuis la conversation elle-même,
            là où l'abus se constate — pas au fond d'un écran de réglages. */}
        <TouchableOpacity onPress={openActions} style={s.backBtn} hitSlop={8}>
          <Ionicons name="ellipsis-horizontal" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        {loading
          ? <View style={s.center}><ActivityIndicator color={colors.primaryRed} /></View>
          : (
            <FlatList
              ref={listRef}
              data={messages}
              keyExtractor={m => m.id}
              renderItem={renderItem}
              contentContainerStyle={[s.list, { paddingBottom: 12 }]}
              showsVerticalScrollIndicator={false}
              onLayout={() => listRef.current?.scrollToEnd({ animated: false })}
              ListEmptyComponent={
                <View style={s.center}>
                  <Text style={{ fontSize: 28, marginBottom: 8 }}>👋</Text>
                  <Text style={[s.emptyTxt, { color: colors.textTertiary }]}>
                    {t('conv.empty', { name: otherName })}
                  </Text>
                </View>
              }
            />
          )
        }

        {/* Utilisateur bloqué : la zone de saisie cède la place à un bandeau
            explicite avec le chemin inverse. Une saisie simplement désactivée
            ressemblerait à une panne. */}
        {blocked && (
          <View style={[s.blockedBar, { backgroundColor: colors.cardBgAlt, borderTopColor: colors.borderLight, paddingBottom: insets.bottom + 10 }]}>
            <Text style={[s.blockedTxt, { color: colors.textSecondary }]}>
              {t('mod.blockedBanner', { name: otherName })}
            </Text>
            <TouchableOpacity onPress={() => unblock(otherUid)}>
              <Text style={[s.unblockTxt, { color: colors.primaryRed }]}>{t('mod.unblock')}</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Input */}
        {!blocked && (
        <View style={[
          s.inputBar,
          { backgroundColor: colors.cardBg, borderTopColor: colors.borderLight },
          // Marge basse calquée sur Prof. Xiao : juste l'encoche du bas.
          // Les 90 pt en dur venaient de la barre d'onglets, absente ici —
          // d'où le grand vide sous la zone de saisie.
          { paddingBottom: kbVisible ? 10 : insets.bottom + 10 },
        ]}>
          <TextInput
            style={[s.input, { color: colors.textPrimary, backgroundColor: colors.appBg }]}
            placeholder={t('conv.placeholder', { name: otherName })}
            placeholderTextColor={colors.textTertiary}
            value={input}
            onChangeText={setInput}
            multiline
            maxLength={2000}
            returnKeyType="send"
            onSubmitEditing={send}
          />
          <TouchableOpacity
            style={[s.sendBtn, { backgroundColor: (input.trim() && !sending) ? colors.primaryRed : colors.borderMedium }]}
            onPress={send}
            disabled={!input.trim() || sending}
          >
            {sending
              ? <ActivityIndicator size="small" color="#FFF" />
              : <Ionicons name="arrow-up" size={18} color="#FFF" />
            }
          </TouchableOpacity>
        </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 12, paddingVertical: 10, borderBottomWidth: 1,
  },
  backBtn: { padding: 4 },
  headerAvatar: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  headerAvatarTxt: { color: '#FFF', fontSize: 14, fontWeight: '700' },
  headerName: { fontSize: 16, fontWeight: '700' },
  list: { paddingHorizontal: 12, paddingTop: 12 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  emptyTxt: { fontSize: 14, textAlign: 'center' },
  msgRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 6 },
  msgRowOther: { justifyContent: 'flex-start' },
  msgRowMe: { flexDirection: 'row-reverse' },
  avatar: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  avatarTxt: { color: '#FFF', fontSize: 12, fontWeight: '700' },
  bubbleWrap: { maxWidth: '75%' },
  bubble: { borderRadius: 16, paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1 },
  bubbleOther: { borderBottomLeftRadius: 4 },
  bubbleMe: { borderBottomRightRadius: 4, borderColor: 'transparent' },
  bubbleText: { fontSize: 14, lineHeight: 20 },
  msgTime: { fontSize: 10, marginTop: 3, marginHorizontal: 4 },
  inputBar: {
    flexDirection: 'row', alignItems: 'flex-end', gap: 10,
    paddingHorizontal: 12, paddingVertical: 10, borderTopWidth: 1,
  },
  input: {
    flex: 1, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 9,
    fontSize: 15, maxHeight: 100,
  },
  sendBtn: {
    width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center',
  },
  blockedBar: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingHorizontal: 16, paddingTop: 12, borderTopWidth: 1,
  },
  blockedTxt: { flex: 1, fontSize: 13, lineHeight: 18 },
  unblockTxt: { fontSize: 13.5, fontWeight: '700' },
});
