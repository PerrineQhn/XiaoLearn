import React, { useState, useCallback } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, borderRadius, spacing, typography } from '../../utils/theme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear?: () => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onClear,
  placeholder = 'Rechercher par hanzi, pinyin ou français...',
}) => {
  const handleClear = useCallback(() => {
    onChangeText('');
    onClear?.();
  }, [onChangeText, onClear]);

  return (
    <View style={styles.container}>
      <Ionicons
        name="search"
        size={20}
        color={colors.textSecondary}
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    color: colors.text,
    ...typography.body,
  },
  clearButton: {
    marginLeft: spacing.sm,
    padding: spacing.xs,
  },
});
