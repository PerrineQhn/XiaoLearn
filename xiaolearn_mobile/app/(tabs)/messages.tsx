/**
 * XiaoLearn Mobile — Onglet Prof. Xiao (IA).
 *
 * Les discussions entre apprenants vivent sur leur propre écran (app/dm.tsx) :
 * mélanger les deux derrière un sélecteur faisait qu'ouvrir « Prof » affichait
 * aussi la boîte de réception, et inversement. MessagesTab est exporté pour
 * que cet écran-là le rende.
 */
import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  FlatList, ScrollView, KeyboardAvoidingView, Keyboard, Platform,
  Image, ActivityIndicator, Modal, Pressable, Animated, PanResponder, Dimensions,
} from 'react-native';
import { useSwipeToDismiss } from '@/hooks/useSwipeToDismiss';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';
import { useI18n } from '@/contexts/LanguageContext';
import { type TransKey } from '@/i18n/translations';
import { useConversations, type Conversation } from '@/hooks/useConversations';
import { useUserSearch } from '@/hooks/useUserSearch';
import { askProfXiao, type ChatMessage, type AiCorrection } from '@/services/geminiService';
import { logError } from '@/data/errorLog';
import { useEntitlements } from '@/hooks/useEntitlements';
import { PremiumGate } from '@/components/PremiumGate';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const AVATAR_COLORS = ['#E53935','#D81B60','#8E24AA','#5E35B1','#1E88E5','#00897B','#43A047','#FB8C00'];
function avatarColor(uid: string): string {
  let h = 0;
  for (let i = 0; i < uid.length; i++) h = (h * 31 + uid.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function formatTime(iso: string, locale: string, yesterdayLabel: string): string {
  try {
    const d = new Date(iso);
    const now = new Date();
    if (d.toDateString() === now.toDateString())
      return d.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
    const yesterday = new Date(now.getTime() - 86400000);
    if (d.toDateString() === yesterday.toDateString()) return yesterdayLabel;
    return d.toLocaleDateString(locale, { day: 'numeric', month: 'short' });
  } catch { return ''; }
}

// ─── Modal recherche d'utilisateur ───────────────────────────────────────────

function NewMessageModal({
  colors,
  onClose,
  onPick,
}: {
  colors: typeof Colors.light;
  onClose: () => void;
  onPick: (uid: string, name: string) => void;
}) {
  const [q, setQ] = useState('');
  const { t } = useI18n();
  const { results, loading, search } = useUserSearch();

  useEffect(() => { search(q); }, [q, search]);

  return (
    <Modal transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={m.backdrop} onPress={onClose}>
        <Pressable style={[m.modal, { backgroundColor: colors.cardBg }]} onPress={() => {}}>
          <View style={[m.header, { borderBottomColor: colors.borderLight }]}>
            <Text style={[m.title, { color: colors.textPrimary }]}>{t('msg.newMessage')}</Text>
            <TouchableOpacity onPress={onClose} style={m.closeBtn}>
              <Ionicons name="close" size={22} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <View style={[m.searchRow, { borderBottomColor: colors.borderLight }]}>
            <Text style={[m.toLabel, { color: colors.textTertiary }]}>{t('hard.to')}</Text>
            <TextInput
              style={[m.searchInput, { color: colors.textPrimary }]}
              placeholder={t('msg.searchUser')}
              placeholderTextColor={colors.textTertiary}
              value={q}
              onChangeText={setQ}
              autoFocus
              autoCapitalize="none"
            />
          </View>

          {loading && (
            <View style={m.center}><ActivityIndicator color={colors.primaryRed} /></View>
          )}

          {!loading && q.trim().length > 0 && results.length === 0 && (
            <View style={m.center}>
              <Ionicons name="search-outline" size={28} color={colors.textTertiary} />
              <Text style={[m.noResult, { color: colors.textTertiary }]}>{t('msg.noUser')}</Text>
            </View>
          )}

          <FlatList
            data={results}
            keyExtractor={r => r.uid}
            style={{ maxHeight: 280 }}
            renderItem={({ item }) => {
              const color = avatarColor(item.uid);
              return (
                <TouchableOpacity
                  style={[m.resultRow, { borderBottomColor: colors.borderLight }]}
                  onPress={() => onPick(item.uid, item.displayName)}
                  activeOpacity={0.7}
                >
                  <View style={[m.resultAvatar, { backgroundColor: color }]}>
                    <Text style={m.resultAvatarTxt}>{initials(item.displayName)}</Text>
                  </View>
                  <Text style={[m.resultName, { color: colors.textPrimary }]}>{item.displayName}</Text>
                  <Ionicons name="chevron-forward" size={16} color={colors.textTertiary} />
                </TouchableOpacity>
              );
            }}
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
}

// ─── Liste des conversations ──────────────────────────────────────────────────

export function MessagesTab({ colors }: { colors: typeof Colors.light }) {
  const router = useRouter();
  const { user } = useAuth();
  const { t: tr, lang } = useI18n();
  const { conversations, loading, openOrCreate } = useConversations();
  const [modalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState('');

  const filtered = filter.trim()
    ? conversations.filter(c =>
        Object.values(c.participantNames).join(' ').toLowerCase().includes(filter.trim().toLowerCase())
      )
    : conversations;

  async function handlePick(uid: string, name: string) {
    setModalOpen(false);
    const convId = await openOrCreate({ uid, displayName: name });
    if (convId) {
      router.push({ pathname: '/conversation', params: { convId, otherName: name, otherUid: uid } });
    }
  }

  function openConv(conv: Conversation) {
    const otherUid = conv.participantIds.find(p => p !== user?.uid) ?? '';
    const otherName = conv.participantNames[otherUid] ?? tr('conv.userFallback');
    router.push({ pathname: '/conversation', params: { convId: conv.id, otherName, otherUid } });
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Barre de recherche */}
      <View style={[t.searchBar, { backgroundColor: colors.cardBgAlt, borderColor: colors.borderLight }]}>
        <Ionicons name="search" size={15} color={colors.textTertiary} />
        <TextInput
          style={[t.searchInput, { color: colors.textPrimary }]}
          placeholder={tr('msg.searchConv')}
          placeholderTextColor={colors.textTertiary}
          value={filter}
          onChangeText={setFilter}
        />
        {filter.length > 0 && (
          <TouchableOpacity onPress={() => setFilter('')}>
            <Ionicons name="close-circle" size={16} color={colors.textTertiary} />
          </TouchableOpacity>
        )}
      </View>

      {loading
        ? <View style={t.center}><ActivityIndicator color={colors.primaryRed} /></View>
        : filtered.length === 0
          ? (
            <View style={t.center}>
              <Text style={{ fontSize: 36, marginBottom: 12 }}>💬</Text>
              <Text style={[t.emptyTitle, { color: colors.textPrimary }]}>{tr('msg.noMessages')}</Text>
              <Text style={[t.emptySub, { color: colors.textTertiary }]}>{tr('msg.noMessagesSub')}</Text>
            </View>
          )
          : (
            <FlatList
              data={filtered}
              keyExtractor={c => c.id}
              contentContainerStyle={{ paddingTop: 4, paddingBottom: 120 }}
              renderItem={({ item: conv }) => {
                const otherUid   = conv.participantIds.find(p => p !== user?.uid) ?? '';
                const otherName  = conv.participantNames[otherUid] ?? tr('hard.userFallback');
                const unread     = conv.unreadCount?.[user?.uid ?? ''] ?? 0;
                const color      = avatarColor(otherUid);

                return (
                  <TouchableOpacity
                    style={[t.convRow, { borderBottomColor: colors.borderLight }]}
                    onPress={() => openConv(conv)}
                    activeOpacity={0.7}
                  >
                    <View style={[t.convAvatar, { backgroundColor: color }]}>
                      <Text style={t.convAvatarTxt}>{initials(otherName)}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <View style={t.convNameRow}>
                        <Text style={[t.convName, { color: colors.textPrimary, fontWeight: unread > 0 ? '700' : '600' }]} numberOfLines={1}>
                          {otherName}
                        </Text>
                        <Text style={[t.convTime, { color: colors.textTertiary }]}>{formatTime(conv.lastMessageAt, lang === 'en' ? 'en-US' : 'fr-FR', tr('msg.yesterday'))}</Text>
                      </View>
                      <View style={t.convPreviewRow}>
                        <Text
                          style={[t.convPreview, { color: unread > 0 ? colors.textPrimary : colors.textTertiary, fontWeight: unread > 0 ? '500' : '400' }]}
                          numberOfLines={1}
                        >
                          {conv.lastMessage
                            ? (conv.lastMessage.senderId === user?.uid ? tr('msg.youPrefix') : '') + conv.lastMessage.text
                            : tr('msg.startConv')}
                        </Text>
                        {unread > 0 && (
                          <View style={[t.unreadBadge, { backgroundColor: colors.primaryRed }]}>
                            <Text style={t.unreadTxt}>{unread > 9 ? '9+' : unread}</Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          )
      }

      {/* Bouton + flottant */}
      <TouchableOpacity
        style={[t.fab, { backgroundColor: colors.primaryRed }]}
        onPress={() => setModalOpen(true)}
        activeOpacity={0.85}
      >
        <Ionicons name="create-outline" size={22} color="#FFF" />
      </TouchableOpacity>

      {modalOpen && (
        <NewMessageModal
          colors={colors}
          onClose={() => setModalOpen(false)}
          onPick={handlePick}
        />
      )}
    </View>
  );
}

// ─── Rendu Markdown simple ────────────────────────────────────────────────────

/**
 * Rend du markdown minimal dans une bulle de chat :
 * **gras**, *italique*, `code`, lignes vides → paragraphes, "- " → bullet
 */
function MarkdownText({ text, color, baseStyle }: { text: string; color: string; baseStyle?: object }) {
  const lines = text.split('\n');

  return (
    <View style={{ gap: 3 }}>
      {lines.map((line, li) => {
        const trimmed = line.trimStart();
        const isBullet = trimmed.startsWith('- ') || trimmed.startsWith('• ');
        const content = isBullet ? trimmed.slice(2) : line;
        const isHeading = trimmed.startsWith('## ') || trimmed.startsWith('### ');
        const headingContent = isHeading ? trimmed.replace(/^#{2,3}\s/, '') : '';

        if (isHeading) {
          return (
            <Text key={li} style={[baseStyle, { color, fontWeight: '700', fontSize: 14, marginTop: 6 }]}>
              {renderInline(headingContent, color)}
            </Text>
          );
        }

        return (
          <View key={li} style={isBullet ? { flexDirection: 'row', gap: 6, paddingLeft: 2 } : undefined}>
            {isBullet && <Text style={{ color, fontSize: 13, marginTop: 2 }}>•</Text>}
            <Text style={[baseStyle, { color, flex: isBullet ? 1 : undefined }]}>
              {renderInline(content, color)}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

function renderInline(text: string, color: string): React.ReactNode[] {
  // Parse **bold**, *italic*, `code`
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <Text key={i} style={{ fontWeight: '700', color }}>{part.slice(2, -2)}</Text>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <Text key={i} style={{ fontStyle: 'italic', color }}>{part.slice(1, -1)}</Text>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <Text key={i} style={{ fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', color, backgroundColor: color + '18', borderRadius: 3, paddingHorizontal: 3 }}>{part.slice(1, -1)}</Text>;
    }
    return <Text key={i} style={{ color }}>{part}</Text>;
  });
}

// ─── Bloc corrections ─────────────────────────────────────────────────────────

const SEV_COLOR = { mineure: '#F59E0B', importante: '#EF4444', critique: '#7C3AED' } as Record<string, string>;

function CorrectionsBlock({ corrections, colors }: { corrections: AiCorrection[]; colors: typeof Colors.light }) {
  const { t } = useI18n();
  if (!corrections.length) return null;
  return (
    <View style={[x.corrBlock, { backgroundColor: '#FEF3C720', borderColor: '#F59E0B40' }]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 }}>
        <Text style={{ fontSize: 14 }}>✍️</Text>
        <Text style={[x.corrTitle, { color: colors.textPrimary }]}>{t('msg.corrections')}</Text>
      </View>
      {corrections.map((c, i) => (
        <View key={i} style={[x.corrItem, { borderLeftColor: SEV_COLOR[c.severity ?? 'importante'] ?? '#F59E0B' }]}>
          <View style={{ flexDirection: 'row', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
            <Text style={[x.corrWrong, { color: '#EF4444' }]}>{c.wrong}</Text>
            <Text style={{ color: colors.textTertiary, fontSize: 12 }}>→</Text>
            <Text style={[x.corrCorrect, { color: '#16A34A' }]}>{c.correct}</Text>
            {c.pinyin ? <Text style={{ color: colors.textTertiary, fontSize: 11 }}>({c.pinyin})</Text> : null}
          </View>
          <Text style={[x.corrExpl, { color: colors.textSecondary }]}>{c.explanation}</Text>
        </View>
      ))}
    </View>
  );
}

// ─── Onglet Prof. Xiao (IA) ───────────────────────────────────────────────────

interface AiMsg {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  corrections?: AiCorrection[];
}

interface XiaoSession {
  id: string;
  startedAt: string;
  preview: string;
  messages: AiMsg[];
  history: ChatMessage[];
}

const XIAO_SESSIONS_KEY = 'cl_xiao_sessions';
const MAX_SESSIONS = 20;

const SUGGESTION_KEYS: TransKey[] = ['msg.sugg1', 'msg.sugg2', 'msg.sugg3', 'msg.sugg4'];

// ─── Ligne swipeable (glisser gauche → supprimer) ───────────────────────────

const DELETE_WIDTH = 80;
const SCREEN_W = Dimensions.get('window').width;

function SwipeableHistoryRow({
  item,
  colors,
  onPress,
  onDelete,
}: {
  item: XiaoSession;
  colors: typeof Colors.light;
  onPress: () => void;
  onDelete: () => void;
}) {
  const translateX = useRef(new Animated.Value(0)).current;
  const revealedRef = useRef(false);

  const panResponder = useRef(PanResponder.create({
    onStartShouldSetPanResponder: () => false,
    onMoveShouldSetPanResponder: (_, { dx, dy }) => Math.abs(dx) > 6 && Math.abs(dx) > Math.abs(dy),
    onPanResponderTerminationRequest: () => false,
    onPanResponderMove: (_, { dx }) => {
      const base = revealedRef.current ? -DELETE_WIDTH : 0;
      const next = Math.max(-DELETE_WIDTH, Math.min(0, base + dx));
      translateX.setValue(next);
    },
    onPanResponderRelease: (_, { dx }) => {
      const base = revealedRef.current ? -DELETE_WIDTH : 0;
      const final = base + dx;
      if (final < -DELETE_WIDTH / 2) {
        Animated.spring(translateX, { toValue: -DELETE_WIDTH, useNativeDriver: true, bounciness: 0 }).start();
        revealedRef.current = true;
      } else {
        Animated.spring(translateX, { toValue: 0, useNativeDriver: true, bounciness: 0 }).start();
        revealedRef.current = false;
      }
    },
  })).current;

  const close = () => {
    Animated.spring(translateX, { toValue: 0, useNativeDriver: true, bounciness: 0 }).start();
    revealedRef.current = false;
  };

  const { t, lang } = useI18n();
  const date = new Date(item.startedAt);
  const label = date.toLocaleDateString(lang === 'en' ? 'en-US' : 'fr-FR', {
    day: 'numeric', month: 'short',
    hour: '2-digit', minute: '2-digit',
  });
  const userCount = item.messages.filter(m => m.role === 'user').length;

  return (
    // overflow hidden pour clipper le bouton supprimer à droite
    <View style={{ overflow: 'hidden', width: SCREEN_W }}>
      <Animated.View
        {...panResponder.panHandlers}
        style={{ flexDirection: 'row', width: SCREEN_W + DELETE_WIDTH, transform: [{ translateX }] }}
      >
        {/* Ligne principale — largeur écran */}
        <TouchableOpacity
          style={[hi.row, { borderBottomColor: colors.borderLight, width: SCREEN_W }]}
          onPress={() => { if (revealedRef.current) { close(); } else { onPress(); } }}
          activeOpacity={0.7}
        >
          <View style={[hi.rowIcon, { backgroundColor: colors.primaryRedLight }]}>
            <Ionicons name="chatbubble-outline" size={16} color={colors.primaryRed} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[hi.rowPreview, { color: colors.textPrimary }]} numberOfLines={1}>
              {item.preview}
            </Text>
            <Text style={[hi.rowDate, { color: colors.textTertiary }]}>
              {label} · {t('msg.msgCount', { n: userCount })}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={colors.textTertiary} />
        </TouchableOpacity>

        {/* Bouton supprimer — révélé par le glissement */}
        <TouchableOpacity
          style={hi.deleteBtn}
          onPress={onDelete}
          activeOpacity={0.85}
        >
          <Ionicons name="trash-outline" size={22} color="#FFF" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

// ─── Modal historique ─────────────────────────────────────────────────────────

function HistoryModal({
  sessions, colors, onClose, onRestore, onNew, onDelete,
}: {
  sessions: XiaoSession[];
  colors: typeof Colors.light;
  onClose: () => void;
  onRestore: (session: XiaoSession) => void;
  onNew: () => void;
  onDelete: (id: string) => void;
}) {
  const { t } = useI18n();
  const { translateY, overlayOpacity, panResponder, open } = useSwipeToDismiss(onClose);

  return (
    <Modal transparent animationType="none" onRequestClose={onClose} onShow={open}>
      {/* Overlay plein écran avec opacité liée au glissement */}
      <Animated.View
        style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(0,0,0,0.5)', opacity: overlayOpacity }]}
        pointerEvents="none"
      />
      <Pressable style={StyleSheet.absoluteFillObject} onPress={onClose} />

      {/* Sheet positionné en bas */}
      <Animated.View
        style={[hi.sheet, { backgroundColor: colors.cardBg, transform: [{ translateY }] }]}
      >
        {/* Handle — zone de glissement */}
        <View {...panResponder.panHandlers} style={hi.handleArea}>
          <View style={[hi.handle, { backgroundColor: colors.borderMedium }]} />
        </View>

        <View style={[hi.header, { borderBottomColor: colors.borderLight }]}>
          <Text style={[hi.title, { color: colors.textPrimary }]}>{t('msg.history')}</Text>
          <TouchableOpacity
            onPress={onNew}
            style={[hi.newBtn, { backgroundColor: colors.primaryRedLight }]}
          >
            <Ionicons name="create-outline" size={15} color={colors.primaryRed} />
            <Text style={[hi.newTxt, { color: colors.primaryRed }]}>{t('msg.new')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={hi.closeBtn}>
            <Ionicons name="close" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {sessions.length === 0 ? (
          <View style={hi.empty}>
            <Text style={{ fontSize: 32, marginBottom: 8 }}>💬</Text>
            <Text style={[hi.emptyTxt, { color: colors.textTertiary }]}>{t('msg.noSaved')}</Text>
          </View>
        ) : (
          <FlatList
            data={sessions}
            keyExtractor={s => s.id}
            style={{ maxHeight: 480 }}
            contentContainerStyle={{ paddingVertical: 8 }}
            renderItem={({ item }) => (
              <SwipeableHistoryRow
                item={item}
                colors={colors}
                onPress={() => onRestore(item)}
                onDelete={() => onDelete(item.id)}
              />
            )}
          />
        )}
        <View style={{ height: Platform.OS === 'ios' ? 34 : 16 }} />
      </Animated.View>
    </Modal>
  );
}

// ─── Prof. Xiao Tab ───────────────────────────────────────────────────────────

function ProfXiaoTab({ colors, kbVisible }: { colors: typeof Colors.light; kbVisible: boolean }) {
  const { t, lang } = useI18n();
  const { access } = useEntitlements();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [phase, setPhase] = useState<'intro' | 'chat'>('intro');
  const [messages, setMessages] = useState<AiMsg[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [sessions, setSessions] = useState<XiaoSession[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const sessionStartRef = useRef<string>(new Date().toISOString());
  const scrollRef = useRef<ScrollView>(null);
  const historyRef = useRef<ChatMessage[]>([]);

  // Charger les sessions sauvegardées au montage
  useEffect(() => {
    AsyncStorage.getItem(XIAO_SESSIONS_KEY).then(raw => {
      if (!raw) return;
      try {
        const saved: XiaoSession[] = JSON.parse(raw);
        setSessions(saved);
        // Restaurer la dernière session si elle contient des messages utilisateur
        if (saved.length > 0 && saved[0].messages.some(m => m.role === 'user')) {
          const last = saved[0];
          setMessages(last.messages);
          historyRef.current = last.history ?? [];
          setSessionId(last.id);
          sessionStartRef.current = last.startedAt;
          setPhase('chat');
        }
      } catch {}
    }).catch(() => {});
  }, []);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 80);
  }, []);

  const persistSession = useCallback((
    msgs: AiMsg[], hist: ChatMessage[], sid: string, startedAt: string,
  ) => {
    if (!msgs.some(m => m.role === 'user')) return;
    const session: XiaoSession = {
      id: sid,
      startedAt,
      preview: msgs.find(m => m.role === 'user')!.text.slice(0, 80),
      messages: msgs,
      history: hist,
    };
    setSessions(prev => {
      const updated = [session, ...prev.filter(s => s.id !== sid)].slice(0, MAX_SESSIONS);
      AsyncStorage.setItem(XIAO_SESSIONS_KEY, JSON.stringify(updated)).catch(() => {});
      return updated;
    });
  }, []);

  const startNew = useCallback(() => {
    if (sessionId && messages.some(m => m.role === 'user')) {
      persistSession(messages, historyRef.current, sessionId, sessionStartRef.current);
    }
    const newId = Date.now().toString();
    setMessages([]);
    historyRef.current = [];
    setSessionId(newId);
    sessionStartRef.current = new Date().toISOString();
    setPhase('intro');
    setHistoryOpen(false);
  }, [sessionId, messages, persistSession]);

  const deleteSession = useCallback((id: string) => {
    setSessions(prev => {
      const updated = prev.filter(s => s.id !== id);
      AsyncStorage.setItem(XIAO_SESSIONS_KEY, JSON.stringify(updated)).catch(() => {});
      return updated;
    });
  }, []);

  const restoreSession = useCallback((session: XiaoSession) => {
    if (sessionId && messages.some(m => m.role === 'user')) {
      persistSession(messages, historyRef.current, sessionId, sessionStartRef.current);
    }
    setMessages(session.messages);
    historyRef.current = session.history ?? [];
    setSessionId(session.id);
    sessionStartRef.current = session.startedAt;
    setPhase('chat');
    setHistoryOpen(false);
    scrollToBottom();
  }, [sessionId, messages, persistSession, scrollToBottom]);

  const send = useCallback(async (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg || loading) return;
    // L'assistant IA est vendu comme une fonction Premium : `canUseAI` existait
    // dans AppAccess mais n'était lu nulle part.
    if (!access.canUseAI) { router.push('/abonnement' as any); return; }
    setInput('');
    Keyboard.dismiss();

    const sid = sessionId ?? Date.now().toString();
    const startedAt = sessionId ? sessionStartRef.current : new Date().toISOString();
    if (!sessionId) {
      setSessionId(sid);
      sessionStartRef.current = startedAt;
    }

    const userMsg: AiMsg = { id: Date.now().toString(), role: 'user', text: msg };
    const updatedMsgs = [...messages, userMsg];
    setMessages(updatedMsgs);
    if (phase === 'intro') setPhase('chat');
    scrollToBottom();

    historyRef.current = [...historyRef.current, { role: 'user', content: msg }];

    setLoading(true);
    try {
      const res = await askProfXiao(msg, historyRef.current.slice(0, -1), lang);
      const assistantMsg: AiMsg = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: res.text,
        corrections: res.corrections,
      };
      // Chaque correction rejoint « Mes erreurs ». L'identifiant est bâti sur
      // la tournure fautive, pas sur l'horodatage : refaire la même faute dans
      // trois jours remonte l'entrée existante au lieu d'en créer une seconde.
      for (const corr of res.corrections ?? []) {
        void logError({
          exerciseId: `chat:${corr.wrong}`,
          source: 'chat',
          lessonId: '',
          lessonTitle: t('err.fromChat'),
          prompt: corr.category || t('err.fromChat'),
          correctAnswer: corr.correct,
          userAnswer: corr.wrong,
          audioHanzi: corr.correct,
          explanation: corr.explanation,
        });
      }

      const finalMsgs = [...updatedMsgs, assistantMsg];
      historyRef.current = [...historyRef.current, { role: 'assistant', content: res.text }];
      setMessages(finalMsgs);
      persistSession(finalMsgs, historyRef.current, sid, startedAt);
    } catch {
      setMessages(prev => [...prev, {
        id: (Date.now() + 2).toString(),
        role: 'assistant' as const,
        text: t('msg.xiaoError'),
      }]);
    } finally {
      setLoading(false);
      scrollToBottom();
    }
  }, [input, loading, messages, phase, sessionId, scrollToBottom, persistSession, access.canUseAI, router, t, lang]);

  // Barre de saisie partagée (intro + chat)
  const inputBar = (
    <View style={[
      x.inputBar,
      { backgroundColor: colors.cardBg, borderTopColor: colors.borderLight, paddingBottom: (kbVisible ? 10 : insets.bottom + 10) },
    ]}>
      <TextInput
        style={[x.input, { color: colors.textPrimary, backgroundColor: colors.appBg }]}
        placeholder={t('msg.xiaoPlaceholder')}
        placeholderTextColor={colors.textTertiary}
        value={input}
        onChangeText={setInput}
        multiline
        maxLength={1000}
        editable={!loading}
      />
      <TouchableOpacity
        style={[x.sendBtn, { backgroundColor: (input.trim() && !loading) ? colors.primaryRed : colors.borderMedium }]}
        onPress={() => send()}
        disabled={!input.trim() || loading}
      >
        {loading
          ? <ActivityIndicator size="small" color="#FFF" />
          : <Ionicons name="arrow-up" size={18} color="#FFF" />
        }
      </TouchableOpacity>
    </View>
  );

  // ── Écran d'intro ─────────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        {/* Header compact — toujours visible */}
        <View style={[xi.introHeaderRow, kbVisible && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.borderLight }]}>
          <TouchableOpacity onPress={() => router.navigate('/(tabs)' as any)} style={xi.hdrBtn}>
            <Ionicons name="arrow-back" size={22} color={colors.textSecondary} />
          </TouchableOpacity>
          {kbVisible ? (
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Image source={require('@/assets/professeur_xiao_profil.png')} style={xi.compactAvatar} />
              <Text style={[xi.compactName, { color: colors.textPrimary }]}>Prof. Xiao Lin</Text>
            </View>
          ) : (
            <View style={{ flex: 1 }} />
          )}
          <TouchableOpacity onPress={startNew} style={xi.hdrBtn}>
            <Ionicons name="create-outline" size={22} color={colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setHistoryOpen(true)} style={xi.hdrBtn}>
            <Ionicons name="time-outline" size={22} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Intro — cachée quand le clavier est ouvert */}
        {!kbVisible && (
          <ScrollView contentContainerStyle={xi.introContent} showsVerticalScrollIndicator={false}>
            <Image source={require('@/assets/professeur_xiao_profil.png')} style={xi.introAvatar} />
            <Text style={[xi.introName, { color: colors.textPrimary }]}>Prof. Xiao Lin</Text>
            <Text style={[xi.introTagline, { color: colors.primaryRed }]}>{t('msg.xiaoTagline')}</Text>
            <Text style={[xi.introDesc, { color: colors.textSecondary }]}>{t('msg.xiaoDesc')}</Text>

            {!access.canUseAI && (
              <PremiumGate colors={colors} titleKey="gate.aiTitle" bodyKey="gate.aiBody" compact />
            )}
            <View style={xi.chipGrid}>
              {SUGGESTION_KEYS.map(k => (
                <TouchableOpacity
                  key={k}
                  style={[xi.suggChip, { backgroundColor: colors.cardBg, borderColor: colors.borderMedium }]}
                  onPress={() => send(t(k))}
                  activeOpacity={0.7}
                >
                  <Text style={[xi.suggText, { color: colors.textSecondary }]}>{t(k)}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        )}

        {/* Suggestions horizontales quand clavier visible */}
        {kbVisible && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ flexGrow: 0 }}
            contentContainerStyle={{ gap: 8, paddingHorizontal: 12, paddingVertical: 10, alignItems: 'center' }}
            keyboardShouldPersistTaps="handled"
          >
            {SUGGESTION_KEYS.map(k => (
              <TouchableOpacity
                key={k}
                style={[xi.suggChipH, { backgroundColor: colors.cardBg, borderColor: colors.borderMedium }]}
                onPress={() => send(t(k))}
                activeOpacity={0.7}
              >
                <Text style={[xi.suggTextH, { color: colors.textSecondary }]}>{t(k)}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {inputBar}

        {historyOpen && (
          <HistoryModal
            sessions={sessions}
            colors={colors}
            onClose={() => setHistoryOpen(false)}
            onRestore={restoreSession}
            onNew={startNew}
            onDelete={deleteSession}
          />
        )}
      </KeyboardAvoidingView>
    );
  }

  // ── Écran de chat ─────────────────────────────────────────────
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={0}>
      {/* En-tête du chat */}
      <View style={[xi.chatHeader, { borderBottomColor: colors.borderLight, backgroundColor: colors.appBg }]}>
        <TouchableOpacity onPress={() => router.navigate('/(tabs)' as any)} style={xi.hdrBtn}>
          <Ionicons name="arrow-back" size={22} color={colors.textSecondary} />
        </TouchableOpacity>
        <Image source={require('@/assets/professeur_xiao_profil.png')} style={xi.chatAvatar} />
        <View style={{ flex: 1 }}>
          <Text style={[xi.chatName, { color: colors.textPrimary }]}>Prof. Xiao Lin</Text>
          <Text style={[xi.chatStatus, { color: '#22C55E' }]}>{t('msg.online')}</Text>
        </View>
        <TouchableOpacity onPress={startNew} style={xi.hdrBtn}>
          <Ionicons name="create-outline" size={21} color={colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setHistoryOpen(true)} style={xi.hdrBtn}>
          <Ionicons name="time-outline" size={21} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollRef}
        style={{ flex: 1 }}
        contentContainerStyle={x.list}
        showsVerticalScrollIndicator={false}
      >
        {messages.map(msg => (
          <View key={msg.id}>
            <View style={[x.row, msg.role === 'user' && x.rowMe]}>
              {msg.role === 'assistant' && (
                <Image source={require('@/assets/professeur_xiao_profil.png')} style={x.avatar} />
              )}
              <View style={[
                x.bubble,
                msg.role === 'assistant'
                  ? [x.bubbleAI, { backgroundColor: colors.cardBg, borderColor: colors.borderLight }]
                  : [x.bubbleMe, { backgroundColor: colors.primaryRed }],
              ]}>
                {msg.role === 'assistant' ? (
                  <MarkdownText
                    text={msg.text}
                    color={colors.textPrimary}
                    baseStyle={{ fontSize: 14, lineHeight: 20 }}
                  />
                ) : (
                  <Text style={[x.bubbleText, { color: '#FFF' }]}>{msg.text}</Text>
                )}
              </View>
            </View>

            {msg.corrections && msg.corrections.length > 0 && (
              <View style={{ marginLeft: 38 }}>
                <CorrectionsBlock corrections={msg.corrections} colors={colors} />
              </View>
            )}
          </View>
        ))}

        {loading && (
          <View style={x.row}>
            <Image source={require('@/assets/professeur_xiao_profil.png')} style={x.avatar} />
            <View style={[x.bubble, x.bubbleAI, x.typingBubble, { backgroundColor: colors.cardBg, borderColor: colors.borderLight }]}>
              <TypingDots color={colors.textTertiary} />
            </View>
          </View>
        )}
      </ScrollView>

      {inputBar}

      {historyOpen && (
        <HistoryModal
          sessions={sessions}
          colors={colors}
          onClose={() => setHistoryOpen(false)}
          onRestore={restoreSession}
          onNew={startNew}
          onDelete={deleteSession}
        />
      )}
    </KeyboardAvoidingView>
  );
}

// ─── Animation points de frappe ──────────────────────────────────────────────

function TypingDots({ color }: { color: string }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick(n => (n + 1) % 4), 400);
    return () => clearInterval(t);
  }, []);
  const dots = '.'.repeat(tick + 1).padEnd(3, ' ');
  return <Text style={{ color, fontSize: 20, letterSpacing: 2, fontWeight: '700' }}>{dots}</Text>;
}

// ─── Écran principal ──────────────────────────────────────────────────────────

type Tab = 'messages' | 'xiao';

export default function MessagesScreen() {
  const scheme = useColorScheme();
  const colors = Colors[scheme];
  const [kbVisible, setKbVisible] = useState(false);

  useEffect(() => {
    const show = Keyboard.addListener('keyboardWillShow', () => setKbVisible(true));
    const hide  = Keyboard.addListener('keyboardWillHide', () => setKbVisible(false));
    return () => { show.remove(); hide.remove(); };
  }, []);

  return (
    <SafeAreaView edges={['top']} style={[s.root, { backgroundColor: colors.appBg }]}>
      {/* Pas de bandeau ici : ProfXiaoTab affiche déjà son propre en-tête
          (avatar, « Prof. Xiao Lin », statut en ligne). En ajouter un second
          faisait doublon. */}
      <ProfXiaoTab colors={colors} kbVisible={kbVisible} />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },
  header: { flexDirection: 'row', borderBottomWidth: 1 },
  divider: { width: 1, marginVertical: 10 },
  tabBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, paddingVertical: 13 },
  tabBtnActive: { borderBottomWidth: 2 },
  tabLabel: { fontSize: 14, fontWeight: '700' },
  tabAvatar: { width: 22, height: 22, borderRadius: 11 },
});

// Liste conversations
const t = StyleSheet.create({
  searchBar: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    marginHorizontal: 16, marginTop: 12, marginBottom: 4,
    paddingHorizontal: 12, paddingVertical: 9,
    borderRadius: 12, borderWidth: 1,
  },
  searchInput: { flex: 1, fontSize: 14, padding: 0 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 80, gap: 8 },
  emptyTitle: { fontSize: 16, fontWeight: '700' },
  emptySub: { fontSize: 13, textAlign: 'center', paddingHorizontal: 40 },
  convRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingHorizontal: 16, paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  convAvatar: { width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  convAvatarTxt: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  convNameRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 },
  convName: { flex: 1, fontSize: 15, marginRight: 8 },
  convTime: { fontSize: 11 },
  convPreviewRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  convPreview: { flex: 1, fontSize: 13, marginRight: 8 },
  unreadBadge: { minWidth: 18, height: 18, borderRadius: 9, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4 },
  unreadTxt: { color: '#FFF', fontSize: 10, fontWeight: '700' },
  fab: {
    position: 'absolute', bottom: 100, right: 20,
    width: 52, height: 52, borderRadius: 26,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 8, shadowOffset: { width: 0, height: 3 }, elevation: 6,
  },
});

// Modal
const m = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'center', alignItems: 'center', padding: 24 },
  modal: { width: '100%', maxWidth: 440, borderRadius: 20, overflow: 'hidden', maxHeight: '80%' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 18, paddingVertical: 14, borderBottomWidth: 1,
  },
  title: { fontSize: 16, fontWeight: '700' },
  closeBtn: { padding: 4 },
  searchRow: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingHorizontal: 18, paddingVertical: 12, borderBottomWidth: 1,
  },
  toLabel: { fontSize: 14, fontWeight: '600' },
  searchInput: { flex: 1, fontSize: 15, padding: 0 },
  center: { alignItems: 'center', paddingVertical: 32, gap: 8 },
  noResult: { fontSize: 13 },
  resultRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingHorizontal: 18, paddingVertical: 13,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  resultAvatar: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center' },
  resultAvatarTxt: { color: '#FFF', fontSize: 14, fontWeight: '700' },
  resultName: { flex: 1, fontSize: 15, fontWeight: '600' },
});

// Prof. Xiao
const x = StyleSheet.create({
  list: { paddingHorizontal: 16, paddingVertical: 12, gap: 12 },
  row: { flexDirection: 'row', alignItems: 'flex-end', gap: 8 },
  rowMe: { flexDirection: 'row-reverse' },
  avatar: { width: 30, height: 30, borderRadius: 15 },
  bubble: { maxWidth: '78%', borderRadius: 16, padding: 12, borderWidth: 1 },
  bubbleAI: { borderBottomLeftRadius: 4 },
  bubbleMe: { borderBottomRightRadius: 4, borderColor: 'transparent' },
  bubbleText: { fontSize: 14, lineHeight: 20 },
  typingBubble: { paddingVertical: 8, paddingHorizontal: 14, minWidth: 60 },
  suggestions: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 },
  chip: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20, borderWidth: 1 },
  chipText: { fontSize: 13 },
  inputBar: {
    flexDirection: 'row', alignItems: 'flex-end', gap: 10,
    paddingHorizontal: 12, paddingTop: 10, borderTopWidth: 1,
  },
  input: { flex: 1, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 9, fontSize: 15, maxHeight: 100 },
  sendBtn: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center' },

  // Corrections
  corrBlock: { borderRadius: 12, borderWidth: 1, padding: 12, marginTop: 4, marginBottom: 4 },
  corrTitle: { fontSize: 13, fontWeight: '700' },
  corrItem: {
    borderLeftWidth: 3, paddingLeft: 10, paddingVertical: 4,
    marginBottom: 6,
  },
  corrWrong: { fontSize: 13, fontWeight: '700', textDecorationLine: 'line-through' },
  corrCorrect: { fontSize: 13, fontWeight: '700' },
  corrExpl: { fontSize: 12, marginTop: 2, lineHeight: 17 },
});

// Prof. Xiao — intro screen + chat header
const xi = StyleSheet.create({
  introHeaderRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 8, paddingBottom: 4 },
  hdrBtn: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center', borderRadius: 19 },
  introContent: { alignItems: 'center', paddingHorizontal: 28, paddingTop: 8, paddingBottom: 40 },
  introAvatar: { width: 96, height: 96, borderRadius: 48, marginBottom: 20 },
  introName: { fontSize: 24, fontWeight: '700', marginBottom: 4, textAlign: 'center' },
  introTagline: { fontSize: 14, fontWeight: '600', marginBottom: 16, textAlign: 'center' },
  introDesc: { fontSize: 14, lineHeight: 22, textAlign: 'center', marginBottom: 32 },
  chipGrid: { gap: 10, width: '100%' },
  suggChip: { borderRadius: 12, borderWidth: 1, paddingHorizontal: 16, paddingVertical: 12 },
  suggText: { fontSize: 14, fontWeight: '500' },
  chatHeader: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 12, paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  chatAvatar: { width: 36, height: 36, borderRadius: 18 },
  chatName: { fontSize: 15, fontWeight: '700' },
  chatStatus: { fontSize: 11, fontWeight: '500' },
  // Compact header (intro + clavier visible)
  compactAvatar: { width: 28, height: 28, borderRadius: 14 },
  compactName: { fontSize: 15, fontWeight: '700' },
  // Suggestions horizontales
  suggChipH: { borderRadius: 20, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 8, flexShrink: 0 },
  suggTextH: { fontSize: 13, fontWeight: '500', whiteSpace: 'nowrap' } as any,
});

// Modal historique
const hi = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  sheet: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 20,
    shadowOffset: { width: 0, height: -4 }, elevation: 20,
  },
  handleArea: { alignItems: 'center', paddingVertical: 14 },
  handle: { width: 36, height: 4, borderRadius: 2, alignSelf: 'center' },
  header: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingHorizontal: 16, paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: { fontSize: 17, fontWeight: '700', flex: 1 },
  newBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20 },
  newTxt: { fontSize: 12, fontWeight: '600' },
  closeBtn: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  row: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingHorizontal: 16, paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  rowIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  rowPreview: { fontSize: 14, fontWeight: '600', marginBottom: 2 },
  rowDate: { fontSize: 11 },
  empty: { alignItems: 'center', justifyContent: 'center', paddingVertical: 48 },
  emptyTxt: { fontSize: 14 },
  deleteBtn: {
    width: DELETE_WIDTH,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
