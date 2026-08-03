/**
 * XiaoLearn Mobile — Contexte thème clair/sombre
 * Persiste dans AsyncStorage (clé 'xl_dark_mode')
 */
import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useColorScheme as useSystemScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'xl_dark_mode';

type ColorSchemeName = 'light' | 'dark';

interface ThemeContextType {
  colorScheme: ColorSchemeName;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme(): ThemeContextType {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemScheme = useSystemScheme() ?? 'light';
  const [colorScheme, setColorScheme] = useState<ColorSchemeName>(systemScheme);
  const [loaded, setLoaded] = useState(false);

  // Charger la préférence sauvegardée au démarrage
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then(saved => {
        if (saved === 'dark' || saved === 'light') {
          setColorScheme(saved);
        }
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  function toggleTheme() {
    const next: ColorSchemeName = colorScheme === 'dark' ? 'light' : 'dark';
    setColorScheme(next);
    AsyncStorage.setItem(STORAGE_KEY, next).catch(() => {});
  }

  // Ne rien rendre tant que la préférence n'est pas chargée (évite le flash)
  if (!loaded) return null;

  return (
    <ThemeContext.Provider value={{ colorScheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
