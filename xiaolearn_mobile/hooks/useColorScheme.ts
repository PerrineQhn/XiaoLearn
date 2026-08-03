/**
 * useColorScheme — lit le thème depuis ThemeContext (persisté en AsyncStorage)
 * Remplace le hook natif React Native pour permettre le toggle manuel.
 */
import { useTheme } from '@/contexts/ThemeContext';

export function useColorScheme() {
  const { colorScheme } = useTheme();
  return colorScheme;
}
