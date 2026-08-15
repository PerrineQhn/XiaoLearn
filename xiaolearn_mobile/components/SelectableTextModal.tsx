/**
 * SelectableTextModal — sélection libre d'une PARTIE de texte.
 *
 * iOS ne fournit pas de poignées de sélection sur un texte affiché (limite
 * React Native) : la seule surface où la sélection partielle existe est un
 * champ de saisie. Cette modale exploite exactement cela — le texte de la
 * réplique est versé dans un TextInput, où l'appui long donne les vraies
 * poignées iOS.
 *
 * Le champ est volontairement ÉDITABLE : c'est une copie de travail. Rogner
 * le texte pour ne garder que 几位 puis « Tout copier » est souvent plus
 * rapide que d'ajuster deux poignées au caractère près.
 */
import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Pressable,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useI18n } from '@/contexts/LanguageContext';
import { copyText } from '@/utils/clipboard';

export function SelectableTextModal({ text, onClose }: { text: string; onClose: () => void }) {
  const scheme = useColorScheme();
  const c = Colors[scheme];
  const { t } = useI18n();
  const [value, setValue] = useState(text);

  return (
    <Modal transparent animationType="fade" onRequestClose={onClose}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {/* Couche de fermeture séparée : en parent du panneau, elle disputait
            au champ de saisie ses gestes — défilement d'un texte long et
            glissement des poignées de sélection, qui sont pourtant toute la
            raison d'être de cette modale. */}
        <View style={{ flex: 1 }}>
          <Pressable style={[StyleSheet.absoluteFill, st.scrim]} onPress={onClose} />
          <View style={st.backdrop} pointerEvents="box-none">
          <View style={[st.panel, { backgroundColor: c.appBg, borderColor: c.borderLight }]}>
            <View style={st.head}>
              <Text style={[st.title, { color: c.textPrimary }]}>{t('copy.selectTitle')}</Text>
              <TouchableOpacity onPress={onClose} hitSlop={8}>
                <Ionicons name="close" size={22} color={c.textSecondary} />
              </TouchableOpacity>
            </View>
            <Text style={[st.hint, { color: c.textTertiary }]}>{t('copy.selectHint')}</Text>
            <TextInput
              style={[st.input, { backgroundColor: c.cardBg, borderColor: c.borderLight, color: c.textPrimary }]}
              value={value}
              onChangeText={setValue}
              multiline
              autoCorrect={false}
              spellCheck={false}
            />
            <TouchableOpacity
              style={[st.copyBtn, { backgroundColor: c.primaryRed }]}
              onPress={async () => { await copyText(value); onClose(); }}
            >
              <Ionicons name="copy-outline" size={16} color="#FFF" />
              <Text style={st.copyTxt}>{t('copy.all')}</Text>
            </TouchableOpacity>
          </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const st = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center', justifyContent: 'center', padding: 16,
  },
  scrim: { backgroundColor: 'rgba(0,0,0,0.45)' },
  panel: {
    width: '100%', maxWidth: 460, borderRadius: 18, borderWidth: 1, padding: 16, gap: 10,
  },
  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: 16, fontWeight: '800' },
  hint: { fontSize: 12, lineHeight: 17 },
  input: {
    borderRadius: 12, borderWidth: 1, padding: 12,
    fontSize: 18, lineHeight: 28, minHeight: 96, maxHeight: 220,
    textAlignVertical: 'top',
  },
  copyBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    borderRadius: 12, paddingVertical: 12,
  },
  copyTxt: { color: '#FFF', fontSize: 14.5, fontWeight: '700' },
});
