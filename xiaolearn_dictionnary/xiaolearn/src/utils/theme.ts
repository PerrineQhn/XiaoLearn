// Design System - Glassmorphism Theme

export const colors = {
  primary: '#667eea',
  primaryDark: '#5568d3',
  secondary: '#764ba2',
  accent: '#f093fb',
  background: '#1a1a2e',
  backgroundLight: '#16213e',
  surface: 'rgba(255, 255, 255, 0.1)',
  surfaceLight: 'rgba(255, 255, 255, 0.15)',
  glass: 'rgba(255, 255, 255, 0.08)',
  glassBorder: 'rgba(255, 255, 255, 0.2)',
  text: '#ffffff',
  textSecondary: 'rgba(255, 255, 255, 0.7)',
  textMuted: 'rgba(255, 255, 255, 0.5)',
  success: '#4ecdc4',
  warning: '#ffe66d',
  error: '#ff6b6b',
  info: '#74b9ff',

  // Boutons de qualité pour flashcards
  again: '#ff6b6b',
  hard: '#ffa502',
  good: '#26de81',
  easy: '#20bf6b',
};

export const gradients = {
  primary: ['#667eea', '#764ba2'],
  background: ['#1a1a2e', '#16213e', '#0f3460'],
  card: ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)'],
  accent: ['#f093fb', '#f5576c'],
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  round: 999,
};

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700' as const,
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  bodyLarge: {
    fontSize: 18,
    fontWeight: '400' as const,
    lineHeight: 26,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  small: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 12,
  },
};
