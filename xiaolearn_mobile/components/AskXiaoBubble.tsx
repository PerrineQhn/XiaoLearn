/**
 * AskXiaoBubble — « je ne comprends pas, je demande au prof », sans quitter
 * l'écran.
 *
 * Deux pièces :
 *
 *   1. **La bulle flottante**, déplaçable au doigt. Un contenu ne se lit pas
 *      pareil d'un écran à l'autre : plutôt que de lui chercher LA bonne
 *      place, on laisse l'utilisateur la poser où elle ne gêne pas. La
 *      position est mémorisée (`xl_xiao_bubble_pos`) et bornée à l'écran.
 *      Un déplacement de moins de 6 pt reste un tap — qui ouvre le panneau.
 *
 *   2. **Le panneau de chat**, en surimpression sur l'écran courant — PAS une
 *      navigation vers l'onglet Prof : on pose sa question et on revient à sa
 *      lecture d'un geste, le contexte visuel jamais perdu.
 *
 * La conversation est enregistrée dans les MÊMES sessions que l'onglet Prof
 * (`cl_xiao_sessions`, même format) : on la retrouve dans son historique,
 * pour la poursuivre plus tard en grand.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Modal,
  Pressable, ScrollView, ActivityIndicator, PanResponder, Animated,
  KeyboardAvoidingView, Platform, useWindowDimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useI18n } from '@/contexts/LanguageContext';
import { useEntitlements } from '@/hooks/useEntitlements';
import { PremiumGate } from '@/components/PremiumGate';
import { askProfXiao, type ChatMessage } from '@/services/geminiService';
import {
  MarkdownText, CorrectionsBlock, XIAO_SESSIONS_KEY, MAX_SESSIONS,
  type AiMsg, type XiaoSession,
} from '@/app/(tabs)/messages';

const POS_KEY = 'xl_xiao_bubble_pos';
const BUBBLE = 52;

export function AskXiaoBubble({ prompt }: { prompt: string }) {
  const scheme = useColorScheme();
  const c = Colors[scheme];
  const { width, height } = useWindowDimensions();
  const [open, setOpen] = useState(false);

  // Position par défaut : bas-gauche, MAIS au-dessus de la zone où vivent les
  // barres de saisie (~90 pt) — la première version chevauchait celle du
  // simulateur.
  const pos = useRef(new Animated.ValueXY({ x: 16, y: height - BUBBLE - 120 })).current;
  const posRef = useRef({ x: 16, y: height - BUBBLE - 120 });

  const clamp = useCallback((x: number, y: number) => ({
    x: Math.min(Math.max(8, x), width - BUBBLE - 8),
    y: Math.min(Math.max(60, y), height - BUBBLE - 90),
  }), [width, height]);

  useEffect(() => {
    AsyncStorage.getItem(POS_KEY).then(raw => {
      if (!raw) return;
      try {
        const saved = clamp(JSON.parse(raw).x, JSON.parse(raw).y);
        posRef.current = saved;
        pos.setValue(saved);
      } catch { /* position par défaut */ }
    }).catch(() => {});
  }, [clamp, pos]);

  const pan = useRef(
    PanResponder.create({
      // En dessous de 6 pt de déplacement, c'est un tap : il ouvre le panneau.
      // Au-delà, c'est un déplacement de la bulle.
      onMoveShouldSetPanResponder: (_e, g) =>
        Math.abs(g.dx) > 6 || Math.abs(g.dy) > 6,
      onPanResponderMove: (_e, g) => {
        const p = clamp(posRef.current.x + g.dx, posRef.current.y + g.dy);
        pos.setValue(p);
      },
      onPanResponderRelease: (_e, g) => {
        const p = clamp(posRef.current.x + g.dx, posRef.current.y + g.dy);
        posRef.current = p;
        pos.setValue(p);
        AsyncStorage.setItem(POS_KEY, JSON.stringify(p)).catch(() => {});
      },
    })
  ).current;

  return (
    <>
      <Animated.View
        style={[st.fabWrap, { transform: pos.getTranslateTransform() }]}
        {...pan.panHandlers}
      >
        <TouchableOpacity
          style={[st.fab, { backgroundColor: c.cardBg, borderColor: c.borderMedium }]}
          activeOpacity={0.85}
          onPress={() => setOpen(true)}
        >
          <Image source={require('@/assets/professeur_xiao_profil.png')} style={st.avatar} />
          <View style={[st.badge, { backgroundColor: c.primaryRed, borderColor: c.cardBg }]}>
            <Ionicons name="help" size={10} color="#FFF" />
          </View>
        </TouchableOpacity>
      </Animated.View>

      {open && <XiaoQuickChat prompt={prompt} onClose={() => setOpen(false)} />}
    </>
  );
}

// ─── Panneau de chat en surimpression ────────────────────────────────────────

/**
 * Le panneau est exporté : d'autres écrans que la bulle flottante ont besoin
 * d'ouvrir Prof Xiao sur un contexte précis — « Mes erreurs » demande
 * l'explication d'une faute donnée, sans quitter la liste.
 *
 * `autoSend` distingue les deux usages. Depuis la bulle, l'amorce est une
 * invitation qu'on complète soi-même — la question appartient à
 * l'utilisateur. Depuis une faute, la question est déjà entièrement formée
 * (l'énoncé, ma réponse, la bonne) : la faire retaper serait absurde, on
 * l'envoie donc et la réponse arrive à l'ouverture.
 */
export function XiaoQuickChat({ prompt, autoSend = false, onClose }: {
  prompt: string;
  autoSend?: boolean;
  onClose: () => void;
}) {
  const scheme = useColorScheme();
  const c = Colors[scheme];
  const { t, lang } = useI18n();
  const { access } = useEntitlements();
  const { width, height } = useWindowDimensions();
  const large = width >= 700;

  const [messages, setMessages] = useState<AiMsg[]>([]);
  // L'amorce contextuelle est posée dans la saisie, jamais envoyée seule :
  // la question appartient à l'utilisateur — sauf en mode `autoSend`.
  const [input, setInput] = useState(autoSend ? '' : prompt);
  const [loading, setLoading] = useState(false);
  const historyRef = useRef<ChatMessage[]>([]);
  const sessionIdRef = useRef(Date.now().toString());
  const startedAtRef = useRef(new Date().toISOString());
  const scrollRef = useRef<ScrollView>(null);

  /**
   * Chaque échange complet est versé dans les sessions de l'onglet Prof —
   * même clé, même format. Écrit à chaque réponse plutôt qu'à la fermeture :
   * une app tuée en cours de route ne perd pas la conversation.
   */
  const persist = useCallback(async (msgs: AiMsg[]) => {
    if (!msgs.some(m => m.role === 'user')) return;
    try {
      const raw = await AsyncStorage.getItem(XIAO_SESSIONS_KEY);
      const sessions: XiaoSession[] = raw ? JSON.parse(raw) : [];
      const session: XiaoSession = {
        id: sessionIdRef.current,
        startedAt: startedAtRef.current,
        preview: msgs.find(m => m.role === 'user')!.text.slice(0, 80),
        messages: msgs,
        history: historyRef.current,
      };
      const updated = [session, ...sessions.filter(s => s.id !== session.id)].slice(0, MAX_SESSIONS);
      await AsyncStorage.setItem(XIAO_SESSIONS_KEY, JSON.stringify(updated));
    } catch { /* l'historique est un confort, pas une condition */ }
  }, []);

  const send = useCallback(async (override?: string) => {
    const text = (override ?? input).trim();
    if (!text || loading) return;
    if (!override) setInput('');
    setLoading(true);
    const mine: AiMsg = { id: `${Date.now()}u`, role: 'user', text };
    setMessages(prev => [...prev, mine]);
    try {
      const res = await askProfXiao(text, historyRef.current, lang);
      historyRef.current = [
        ...historyRef.current,
        { role: 'user', content: text },
        { role: 'assistant', content: res.text },
      ];
      setMessages(prev => {
        const next: AiMsg[] = [...prev, {
          id: `${Date.now()}a`, role: 'assistant', text: res.text,
          corrections: res.corrections.length ? res.corrections : undefined,
        }];
        void persist(next);
        return next;
      });
    } catch {
      setMessages(prev => [...prev, {
        id: `${Date.now()}e`, role: 'assistant', text: t('msg.xiaoError'),
      }]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, lang, persist, t]);

  // Envoi automatique à l'ouverture, une seule fois : la question est déjà
  // complète et l'utilisateur n'a rien à ajouter pour obtenir sa réponse.
  const autoSent = useRef(false);
  useEffect(() => {
    if (!autoSend || autoSent.current || !access.canUseAI) return;
    autoSent.current = true;
    void send(prompt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoSend, access.canUseAI]);

  return (
    <Modal transparent animationType="fade" onRequestClose={onClose}>
      {/* L'évitement du clavier enveloppe TOUT le panneau : posé à
          l'intérieur, il déplaçait le contenu dans un panneau à hauteur fixe
          qui, lui, restait centré sous le clavier — la zone de saisie était
          invisible pendant la frappe. Ici le clavier compresse le panneau
          (`flexShrink`), qui reste entier dans l'espace visible. */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
      {/* Le fond fermant est une couche À PART, derrière le panneau — et non
          son parent. Enveloppé dans un Pressable (celui qui empêchait le tap
          de fermer la fenêtre), le ScrollView de la conversation ne défilait
          plus : sur iOS, le Pressable parent s'empare du geste avant lui.
          Le panneau n'a donc plus aucun Pressable ancêtre, et la couche de
          centrage laisse passer les taps qui ne le visent pas (`box-none`). */}
      <View style={{ flex: 1 }}>
        <Pressable style={[StyleSheet.absoluteFill, st.scrim]} onPress={onClose} />
        <View style={st.backdrop} pointerEvents="box-none">
          <View
            style={[st.panel, {
              backgroundColor: c.appBg, borderColor: c.borderLight,
              width: large ? 440 : width - 24,
              height: Math.min(large ? height * 0.66 : height * 0.78, 620),
              flexShrink: 1,
            }]}
          >
          <View style={{ flex: 1 }}>
            {/* En-tête */}
            <View style={[st.head, { borderBottomColor: c.borderLight }]}>
              <Image source={require('@/assets/professeur_xiao_profil.png')} style={st.headAvatar} />
              <View style={{ flex: 1 }}>
                <Text style={[st.headName, { color: c.textPrimary }]}>Prof. Xiao Lin</Text>
                <Text style={[st.headSub, { color: c.textTertiary }]}>{t('xiao.quickChatSub')}</Text>
              </View>
              <TouchableOpacity onPress={onClose} hitSlop={8} style={st.closeBtn}>
                <Ionicons name="close" size={22} color={c.textSecondary} />
              </TouchableOpacity>
            </View>

            {!access.canUseAI ? (
              <View style={{ padding: 16 }}>
                <PremiumGate colors={c} titleKey="gate.aiTitle" bodyKey="gate.aiBody" compact />
              </View>
            ) : (
              <>
                <ScrollView
                  ref={scrollRef}
                  style={{ flex: 1 }}
                  contentContainerStyle={{ padding: 12, gap: 10 }}
                  onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
                >
                  {messages.length === 0 && (
                    <Text style={[st.emptyHint, { color: c.textTertiary }]}>
                      {t('xiao.quickChatEmpty')}
                    </Text>
                  )}
                  {messages.map(msg => (
                    <View key={msg.id}>
                      <View style={[st.msgRow, msg.role === 'user' && st.msgRowMe]}>
                        <View style={[
                          st.msgBubble,
                          msg.role === 'user'
                            ? { backgroundColor: c.primaryRed }
                            : { backgroundColor: c.cardBg, borderColor: c.borderLight, borderWidth: 1 },
                        ]}>
                          {msg.role === 'assistant' ? (
                            <MarkdownText text={msg.text} color={c.textPrimary} baseStyle={{ fontSize: 14, lineHeight: 20 }} />
                          ) : (
                            <Text selectable style={{ color: '#FFF', fontSize: 14, lineHeight: 20 }}>{msg.text}</Text>
                          )}
                        </View>
                      </View>
                      {!!msg.corrections?.length && (
                        <CorrectionsBlock corrections={msg.corrections} colors={c} />
                      )}
                    </View>
                  ))}
                  {loading && <ActivityIndicator color={c.primaryRed} style={{ marginTop: 4 }} />}
                </ScrollView>

                <View style={[st.inputBar, { borderTopColor: c.borderLight }]}>
                  <TextInput
                    style={[st.input, { backgroundColor: c.cardBg, borderColor: c.borderLight, color: c.textPrimary }]}
                    value={input}
                    onChangeText={setInput}
                    placeholder={t('msg.xiaoPlaceholder')}
                    placeholderTextColor={c.textTertiary}
                    multiline
                    autoFocus
                  />
                  <TouchableOpacity
                    style={[st.sendBtn, { backgroundColor: input.trim() && !loading ? c.primaryRed : c.borderMedium }]}
                    onPress={() => send()}
                    disabled={!input.trim() || loading}
                  >
                    <Ionicons name="arrow-up" size={18} color="#FFF" />
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
          </View>
        </View>
      </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const st = StyleSheet.create({
  fabWrap: { position: 'absolute', top: 0, left: 0, zIndex: 40 },
  fab: {
    width: BUBBLE, height: BUBBLE, borderRadius: BUBBLE / 2, borderWidth: 1,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOpacity: 0.18, shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 }, elevation: 5,
  },
  avatar: { width: BUBBLE - 8, height: BUBBLE - 8, borderRadius: (BUBBLE - 8) / 2 },
  badge: {
    position: 'absolute', top: -2, right: -2,
    width: 18, height: 18, borderRadius: 9, borderWidth: 2,
    alignItems: 'center', justifyContent: 'center',
  },

  // Le voile sombre appartient à la couche du dessous (le Pressable de
  // fermeture) ; celle-ci ne fait que centrer le panneau.
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center', justifyContent: 'center', padding: 12,
  },
  scrim: { backgroundColor: 'rgba(0,0,0,0.45)' },
  panel: { borderRadius: 20, borderWidth: 1, overflow: 'hidden' },
  head: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 14, paddingVertical: 10, borderBottomWidth: 1,
  },
  headAvatar: { width: 34, height: 34, borderRadius: 17 },
  headName: { fontSize: 15, fontWeight: '800' },
  headSub: { fontSize: 11.5 },
  closeBtn: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },

  emptyHint: { fontSize: 13, lineHeight: 19, textAlign: 'center', marginTop: 18, paddingHorizontal: 16 },
  msgRow: { flexDirection: 'row' },
  msgRowMe: { justifyContent: 'flex-end' },
  msgBubble: { maxWidth: '88%', flexShrink: 1, borderRadius: 14, paddingHorizontal: 12, paddingVertical: 9 },

  inputBar: {
    flexDirection: 'row', alignItems: 'flex-end', gap: 8,
    padding: 10, borderTopWidth: 1,
  },
  input: {
    flex: 1, borderRadius: 18, borderWidth: 1,
    paddingHorizontal: 12, paddingTop: 8, paddingBottom: 8,
    fontSize: 14, maxHeight: 96,
  },
  sendBtn: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
});
