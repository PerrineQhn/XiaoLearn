/**
 * DisplaySettingsContext — réglages d'affichage du chinois.
 *   - toneColors : coloration Pleco des hanzi par ton (défaut : activé)
 *   - showPinyin : afficher le pinyin dans les exercices (défaut : activé)
 * Persistés en AsyncStorage avec les mêmes clés que le web (localStorage).
 */
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TONE_COLORS_KEY = 'xl_tone_colors_v1';
const SHOW_PINYIN_KEY = 'xl_show_pinyin_v1';

interface DisplaySettings {
  toneColors: boolean;
  showPinyin: boolean;
  setToneColors: (v: boolean) => void;
  setShowPinyin: (v: boolean) => void;
}

const Ctx = createContext<DisplaySettings>({
  toneColors: true,
  showPinyin: true,
  setToneColors: () => {},
  setShowPinyin: () => {},
});

export function DisplaySettingsProvider({ children }: { children: ReactNode }) {
  const [toneColors, setToneColorsState] = useState(true);
  const [showPinyin, setShowPinyinState] = useState(true);

  useEffect(() => {
    (async () => {
      const [tc, sp] = await Promise.all([
        AsyncStorage.getItem(TONE_COLORS_KEY).catch(() => null),
        AsyncStorage.getItem(SHOW_PINYIN_KEY).catch(() => null),
      ]);
      if (tc !== null) setToneColorsState(tc !== '0');
      if (sp !== null) setShowPinyinState(sp !== '0');
    })();
  }, []);

  const setToneColors = useCallback((v: boolean) => {
    setToneColorsState(v);
    AsyncStorage.setItem(TONE_COLORS_KEY, v ? '1' : '0').catch(() => {});
  }, []);

  const setShowPinyin = useCallback((v: boolean) => {
    setShowPinyinState(v);
    AsyncStorage.setItem(SHOW_PINYIN_KEY, v ? '1' : '0').catch(() => {});
  }, []);

  return (
    <Ctx.Provider value={{ toneColors, showPinyin, setToneColors, setShowPinyin }}>
      {children}
    </Ctx.Provider>
  );
}

export function useDisplaySettings() {
  return useContext(Ctx);
}
