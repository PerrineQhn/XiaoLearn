import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { FlashcardList } from '../../types';
import { GlassCard } from '../shared/GlassCard';
import { Button } from '../shared/Button';
import { Input } from '../shared/Input';
import { colors, spacing, typography, borderRadius, gradients } from '../../utils/theme';

interface FlashcardListPickerModalProps {
  visible: boolean;
  lists: FlashcardList[];
  onClose: () => void;
  onSubmit: (selectedIds: number[], newListName: string) => void;
}

export const FlashcardListPickerModal: React.FC<FlashcardListPickerModalProps> = ({
  visible,
  lists,
  onClose,
  onSubmit,
}) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [newListName, setNewListName] = useState('');

  useEffect(() => {
    if (visible) {
      setSelectedIds([]);
      setNewListName('');
    }
  }, [visible]);

  const toggleList = (listId: number) => {
    setSelectedIds((prev) =>
      prev.includes(listId) ? prev.filter((id) => id !== listId) : [...prev, listId]
    );
  };

  const canSubmit = selectedIds.length > 0 || newListName.trim().length > 0;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <LinearGradient colors={gradients.background} style={styles.backdrop}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <Ionicons name="close" size={24} color={colors.text} />
          </TouchableOpacity>

          <GlassCard style={styles.card}>
            <Text style={styles.title}>Ajouter à une liste</Text>
            <Text style={styles.subtitle}>
              Sélectionnez une ou plusieurs listes, ou créez-en une nouvelle.
            </Text>

            <ScrollView
              style={styles.listContainer}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
            >
              {lists.length === 0 ? (
                <Text style={styles.emptyText}>
                  Aucune liste pour le moment.
                </Text>
              ) : (
                lists.map((list) => {
                  const isSelected = selectedIds.includes(list.id);
                  return (
                    <TouchableOpacity
                      key={list.id}
                      onPress={() => toggleList(list.id)}
                      style={[styles.listItem, isSelected && styles.listItemSelected]}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          styles.listItemText,
                          isSelected && styles.listItemTextSelected,
                        ]}
                      >
                        {list.name}
                      </Text>
                      <Ionicons
                        name={isSelected ? 'checkmark-circle' : 'ellipse-outline'}
                        size={22}
                        color={isSelected ? colors.primary : colors.textSecondary}
                      />
                    </TouchableOpacity>
                  );
                })
              )}
            </ScrollView>

            <Input
              label="Nouvelle liste (optionnel)"
              placeholder="Ex: Vocabulaire voyage"
              value={newListName}
              onChangeText={setNewListName}
              autoCapitalize="sentences"
            />

            <Button
              title="Ajouter"
              onPress={() => onSubmit(selectedIds, newListName)}
              disabled={!canSubmit}
              variant="primary"
              style={styles.submitButton}
            />
          </GlassCard>
        </View>
      </LinearGradient>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: spacing.lg,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: spacing.md,
    backgroundColor: colors.glass,
    borderRadius: borderRadius.round,
    padding: spacing.sm,
  },
  card: {
    padding: spacing.lg,
  },
  title: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  listContainer: {
    maxHeight: 240,
    marginBottom: spacing.md,
  },
  listContent: {
    gap: spacing.sm,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  listItemSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.surfaceLight,
  },
  listItemText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  listItemTextSelected: {
    color: colors.text,
    fontWeight: '600',
  },
  emptyText: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: 'center',
    paddingVertical: spacing.lg,
  },
  submitButton: {
    marginTop: spacing.sm,
  },
});
