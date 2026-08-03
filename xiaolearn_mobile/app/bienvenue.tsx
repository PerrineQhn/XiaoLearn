/**
 * Choix du personnage à la première ouverture.
 *
 * Affiché tant qu'aucun personnage n'est choisi — donc après une inscription,
 * mais aussi pour les comptes migrés depuis l'ancien catalogue figé. Gater sur
 * « pas d'avatar » plutôt que sur « vient de s'inscrire » évite d'avoir à
 * détecter la création de compte dans les trois chemins d'authentification
 * (email, Google, restauration de session).
 *
 * Le personnage n'est pas un détail cosmétique : c'est lui qu'on verra évoluer
 * pendant tout le parcours. Il mérite un écran, pas une ligne de réglages.
 */
import { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, useWindowDimensions, ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';
import { useI18n } from '@/contexts/LanguageContext';
import { useAvatar } from '@/hooks/useAvatar';
import { HumanAvatar } from '@/components/HumanAvatar';
import { AVATAR_CHARACTERS, STAGES, STAGE_COUNT } from '@/data/avatarEvolution';

export default function WelcomeScreen() {
  const scheme = useColorScheme();
  const colors = Colors[scheme];
  const { t, lang } = useI18n();
  const { width } = useWindowDimensions();
  const { select } = useAvatar();

  // Sélection locale : rien n'est enregistré tant qu'on n'a pas confirmé, pour
  // qu'on puisse comparer les personnages sans conséquence.
  const [picked, setPicked] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const px = width >= 768 ? 24 : 16;
  const cols = width >= 768 ? 5 : 3;
  const cardW = (width - px * 2 - (cols - 1) * 10) / cols;
  const chosen = AVATAR_CHARACTERS.find(c => c.id === picked);

  async function confirm() {
    if (!picked) return;
    setSaving(true);
    await select(picked);
    // Pas de navigation : le garde-fou du layout racine bascule tout seul sur
    // l'app dès que l'avatar est enregistré.
  }

  return (
    <SafeAreaView style={[s.root, { backgroundColor: colors.appBg }]}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: px, paddingBottom: 28, gap: 18 }}>
        <View style={s.head}>
          <Text style={[s.title, { color: colors.textPrimary }]}>
            {t('welcome.title')}
          </Text>
          <Text style={[s.subtitle, { color: colors.textSecondary }]}>
            {t('welcome.subtitle')}
          </Text>
        </View>

        {/* Les dix personnages, tous au palier 1 : on part du même point. */}
        <View style={s.grid}>
          {AVATAR_CHARACTERS.map(c => {
            const on = c.id === picked;
            return (
              <TouchableOpacity
                key={c.id}
                onPress={() => setPicked(c.id)}
                activeOpacity={0.85}
                style={[s.card, {
                  width: cardW,
                  backgroundColor: colors.cardBg,
                  borderColor: on ? c.accent : colors.borderLight,
                  borderWidth: on ? 2.5 : 1,
                }]}
              >
                <HumanAvatar avatarId={c.id} stage={1} size={cardW - 22} colors={colors} />
                <Text style={[s.name, { color: colors.textPrimary }]} numberOfLines={1}>
                  {lang === 'en' ? c.nameEn : c.nameFr}
                </Text>
                {on && (
                  <View style={[s.check, { backgroundColor: c.accent }]}>
                    <Ionicons name="checkmark" size={14} color="#FFF" />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Ce qui l'attend — sans montrer les tenues, qui restent la surprise */}
        <View style={[s.promise, {
          backgroundColor: colors.cardBgAlt,
          borderColor: chosen ? chosen.accent + '55' : colors.borderLight,
        }]}>
          <Ionicons
            name="sparkles-outline"
            size={16}
            color={chosen ? chosen.accent : colors.textTertiary}
          />
          <Text style={[s.promiseTxt, { color: colors.textSecondary }]}>
            {t('welcome.promise', {
              n: STAGE_COUNT,
              rank: lang === 'en' ? STAGES[STAGE_COUNT - 1].rankEn : STAGES[STAGE_COUNT - 1].rankFr,
            })}
          </Text>
        </View>
      </ScrollView>

      <View style={[s.footer, { paddingHorizontal: px, borderTopColor: colors.borderLight }]}>
        <TouchableOpacity
          onPress={confirm}
          disabled={!picked || saving}
          activeOpacity={0.85}
          // Le bouton reste au rouge XiaoLearn quel que soit le personnage.
          // Il l'a un temps pris la couleur signature, mais un bouton d'action
          // principale appartient à l'app, pas au contenu : le voir changer de
          // couleur à chaque sélection brouille le repère. Et deux accents
          // (Kenji, Rosa) passaient sous le seuil de contraste du texte blanc.
          style={[s.cta, {
            backgroundColor: picked ? colors.primaryRed : colors.borderMedium,
          }]}
        >
          {saving
            ? <ActivityIndicator color="#FFF" />
            : <Text style={s.ctaTxt}>{t('welcome.start')}</Text>}
        </TouchableOpacity>
        <Text style={[s.footNote, { color: colors.textTertiary }]}>
          {t('welcome.changeLater')}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },
  head: { paddingTop: 30, gap: 6 },
  title: { fontSize: 25, fontWeight: '800' },
  subtitle: { fontSize: 14, lineHeight: 20 },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center' },
  card: { borderRadius: 16, alignItems: 'center', paddingVertical: 10, gap: 2 },
  name: { fontSize: 13.5, fontWeight: '800' },
  check: {
    position: 'absolute', top: 6, right: 6,
    width: 20, height: 20, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
  },

  promise: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 9,
    borderRadius: 14, borderWidth: 1, padding: 13,
  },
  promiseTxt: { flex: 1, fontSize: 13, lineHeight: 19 },

  footer: { paddingTop: 12, paddingBottom: 8, borderTopWidth: 1, gap: 8 },
  cta: { borderRadius: 14, paddingVertical: 15, alignItems: 'center' },
  ctaTxt: { color: '#FFF', fontSize: 16, fontWeight: '800' },
  footNote: { fontSize: 11.5, textAlign: 'center' },
});
