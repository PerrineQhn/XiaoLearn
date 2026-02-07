import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, borderRadius, typography, shadows } from '../../utils/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'glass' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
  textStyle,
}) => {
  const buttonStyle = [
    styles.button,
    styles[size],
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`${size}Text`],
    textStyle,
  ];

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.7}
        style={buttonStyle}
      >
        <LinearGradient
          colors={[colors.primary, colors.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <Text style={textStyles}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  if (variant === 'glass') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.7}
        style={[buttonStyle, styles.glassButton]}
      >
        <Text style={textStyles}>{title}</Text>
      </TouchableOpacity>
    );
  }

  if (variant === 'outline') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.7}
        style={[buttonStyle, styles.outlineButton]}
      >
        <Text style={[textStyles, styles.outlineText]}>{title}</Text>
      </TouchableOpacity>
    );
  }

  // variant === 'secondary'
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      style={[buttonStyle, styles.secondaryButton]}
    >
      <Text style={textStyles}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.md,
  },
  gradient: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
  glassButton: {
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    paddingHorizontal: 24,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineText: {
    color: colors.primary,
  },
  secondaryButton: {
    backgroundColor: colors.surfaceLight,
    paddingHorizontal: 24,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.5,
  },

  // Sizes
  small: {
    minWidth: 80,
  },
  medium: {
    minWidth: 120,
  },
  large: {
    minWidth: 160,
  },

  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
});
