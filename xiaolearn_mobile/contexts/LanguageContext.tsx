/**
 * LanguageContext — langue de l'interface (fr | en), persistée.
 * Même clé que le web (`xl_language`) pour cohérence.
 *
 * Usage :
 *   const { t, lang, setLang } = useI18n();
 *   <Text>{t('home.priority')}</Text>
 *
 * Les traductions vivent dans i18n/translations.ts.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { NativeModules, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TRANSLATIONS, type TransKey } from '@/i18n/translations';

export type Lang = 'fr' | 'en';
const LANG_KEY = 'xl_language';

/**
 * Langue du téléphone → langue de départ. Téléphone en français : français ;
 * tout le reste : anglais. Même heuristique que le web (useLanguagePref.ts),
 * pour qu'un même utilisateur retrouve la même langue des deux côtés.
 *
 * On passe par `Intl` plutôt que par expo-localization : c'est du JS pur,
 * fourni par Hermes, donc aucun module natif à ajouter et aucune
 * reconstruction EAS. Les NativeModules servent de filet si Intl manque.
 *
 * Ce défaut ne sert QU'AU tout premier lancement. Dès que l'utilisateur a
 * touché au réglage, c'est son choix qui prime, sur ce téléphone comme après
 * réinstallation (la valeur est persistée).
 */
function detectDeviceLang(): Lang {
  let raw = '';
  try {
    raw = Intl.DateTimeFormat().resolvedOptions().locale ?? '';
  } catch { /* Intl absent : on tente les modules natifs */ }
  if (!raw) {
    try {
      raw = Platform.OS === 'ios'
        ? (NativeModules.SettingsManager?.settings?.AppleLocale
           ?? NativeModules.SettingsManager?.settings?.AppleLanguages?.[0] ?? '')
        : (NativeModules.I18nManager?.localeIdentifier ?? '');
    } catch { /* on retombera sur l'anglais */ }
  }
  return raw.toLowerCase().startsWith('fr') ? 'fr' : 'en';
}

interface LanguageCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  /** Traduit une clé. Interpolation optionnelle : t('key', { n: 3 }). */
  t: (key: TransKey, vars?: Record<string, string | number>) => string;
  /** Choisit la bonne variante d'un objet { fr, en } (contenu des données). */
  pick: <T>(fr: T, en: T | undefined | null) => T;
}

const Ctx = createContext<LanguageCtx>({
  lang: 'fr',
  setLang: () => {},
  t: (k) => String(k),
  pick: (fr) => fr,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Initialiseur paresseux : la langue du téléphone est connue dès le premier
  // rendu, donc pas de bascule visible fr → en après le chargement du storage.
  const [lang, setLangState] = useState<Lang>(detectDeviceLang);

  useEffect(() => {
    AsyncStorage.getItem(LANG_KEY).then(v => {
      if (v === 'en' || v === 'fr') setLangState(v);
    }).catch(() => {});
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    AsyncStorage.setItem(LANG_KEY, l).catch(() => {});
  }, []);

  const t = useCallback((key: TransKey, vars?: Record<string, string | number>) => {
    const entry = TRANSLATIONS[key];
    let s = (entry ? entry[lang] : undefined) ?? (entry ? entry.fr : undefined) ?? String(key);
    if (vars) for (const [k, v] of Object.entries(vars)) s = s.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
    return s;
  }, [lang]);

  /**
   * Choisit la variante anglaise si elle existe VRAIMENT.
   *
   * Le test `en != null` laissait passer la chaîne vide : une traduction
   * manquante dans les données produisait un bloc vide à l'écran plutôt qu'un
   * repli sur le français. C'est ce qui donnait, en anglais, un encadré
   * « Quiz » avec quatre réponses et aucune question. Même chose pour un
   * tableau vide, fréquent dans les phrases décomposées.
   */
  const pick = useCallback(<T,>(fr: T, en: T | undefined | null): T => {
    if (lang !== 'en' || en == null) return fr;
    if (typeof en === 'string' && en.trim() === '') return fr;
    if (Array.isArray(en) && en.length === 0) return fr;
    return en;
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t, pick }), [lang, setLang, t, pick]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useI18n() {
  return useContext(Ctx);
}
