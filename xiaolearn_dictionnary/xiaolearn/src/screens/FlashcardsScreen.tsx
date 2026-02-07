import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Container, GlassCard, Button, Input } from '../components/shared';
import { ReviewScreen } from '../components/flashcards';
import { useFlashcardsStore } from '../store/flashcardsStore';
import { useDictionaryStore } from '../store/dictionaryStore';
import { Flashcard } from '../types';
import { colors, spacing, typography, borderRadius } from '../utils/theme';

type Tab = 'review' | 'all';

export const FlashcardsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('review');
  const [createListVisible, setCreateListVisible] = useState(false);
  const [newListName, setNewListName] = useState('');
  const {
    flashcards,
    dueFlashcards,
    lists,
    selectedListId,
    isLoading,
    isReviewMode,
    loadFlashcards,
    loadDueFlashcards,
    loadLists,
    createList,
    setSelectedListId,
    startReviewSession,
    endReviewSession,
  } = useFlashcardsStore();

  const { getWordById } = useDictionaryStore();

  useEffect(() => {
    loadFlashcards();
    loadDueFlashcards();
    loadLists();
  }, []);

  useEffect(() => {
    if (!isReviewMode) {
      // Recharger les données après la fin d'une session
      loadDueFlashcards();
      loadFlashcards();
    }
  }, [isReviewMode]);

  useEffect(() => {
    loadFlashcards(selectedListId);
    loadDueFlashcards(selectedListId);
  }, [selectedListId]);

  const handleStartReview = async () => {
    await startReviewSession();
  };

  const handleEndSession = () => {
    endReviewSession();
    setActiveTab('review');
  };

  const handleSelectList = (listId: number | null) => {
    setSelectedListId(listId);
  };

  const handleCreateList = async () => {
    const listId = await createList(newListName);
    if (!listId) {
      alert('Nom de liste invalide ou déjà utilisé.');
      return;
    }

    setNewListName('');
    setCreateListVisible(false);
    setSelectedListId(listId);
  };

  const renderFlashcard = ({ item }: { item: Flashcard }) => {
    const word = getWordById(item.wordId);
    if (!word) return null;

    const nextDate = new Date(item.nextReviewDate);
    const isOverdue = nextDate <= new Date();
    const daysUntil = Math.ceil(
      (nextDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );

    return (
      <GlassCard style={styles.flashcardItem}>
        <View style={styles.flashcardHeader}>
          <Text style={styles.hanzi}>{word.hanzi}</Text>
          <View
            style={[
              styles.statusBadge,
              isOverdue ? styles.overdueBadge : styles.scheduledBadge,
            ]}
          >
            <Text style={styles.statusText}>
              {isOverdue
                ? 'À réviser'
                : daysUntil === 0
                ? 'Aujourd\'hui'
                : `Dans ${daysUntil}j`}
            </Text>
          </View>
        </View>
        <Text style={styles.translation}>{word.translationFr}</Text>
        <View style={styles.flashcardFooter}>
          <Text style={styles.statsText}>
            Intervalle: {item.interval} jour{item.interval !== 1 ? 's' : ''}
          </Text>
          <Text style={styles.statsText}>
            Répétitions: {item.repetitions}
          </Text>
        </View>
      </GlassCard>
    );
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="albums-outline" size={80} color={colors.textMuted} />
      <Text style={styles.emptyTitle}>
        {activeTab === 'review' ? 'Aucune carte à réviser' : 'Aucune flashcard'}
      </Text>
      <Text style={styles.emptyText}>
        {activeTab === 'review'
          ? 'Revenez plus tard ou ajoutez de nouvelles cartes depuis le dictionnaire'
          : 'Ajoutez des mots depuis le dictionnaire pour créer vos flashcards'}
      </Text>
    </View>
  );

  if (isReviewMode) {
    return (
      <Container>
        <ReviewScreen onEndSession={handleEndSession} />
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Chargement...</Text>
        </View>
      </Container>
    );
  }

  const displayedCards = activeTab === 'review' ? dueFlashcards : flashcards;
  const selectedList = lists.find((list) => list.id === selectedListId) || null;

  return (
    <Container>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Flashcards</Text>
          <Text style={styles.subtitle}>
            {dueFlashcards.length} carte{dueFlashcards.length !== 1 ? 's' : ''} à
            réviser
          </Text>
          {selectedList && (
            <View style={styles.listBadge}>
              <Ionicons name="list" size={14} color={colors.textSecondary} />
              <Text style={styles.listBadgeText}>{selectedList.name}</Text>
            </View>
          )}
        </View>

        <View style={styles.listsHeader}>
          <Text style={styles.listsTitle}>Listes</Text>
          <TouchableOpacity
            style={styles.addListButton}
            onPress={() => setCreateListVisible(true)}
          >
            <Ionicons name="add" size={20} color={colors.text} />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.listsScrollView}
          contentContainerStyle={styles.listsScroll}
        >
          <TouchableOpacity
            style={[styles.listChip, !selectedListId && styles.listChipActive]}
            onPress={() => handleSelectList(null)}
          >
            <Text
              style={[
                styles.listChipText,
                !selectedListId && styles.listChipTextActive,
              ]}
            >
              Toutes
            </Text>
          </TouchableOpacity>

          {lists.map((list) => {
            const isActive = selectedListId === list.id;
            return (
              <TouchableOpacity
                key={list.id}
                style={[styles.listChip, isActive && styles.listChipActive]}
                onPress={() => handleSelectList(list.id)}
              >
                <Text
                  style={[
                    styles.listChipText,
                    isActive && styles.listChipTextActive,
                  ]}
                >
                  {list.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Bouton de démarrage */}
        {dueFlashcards.length > 0 && activeTab === 'review' && (
          <View style={styles.startButtonContainer}>
            <Button
              title={`Commencer la révision (${dueFlashcards.length})`}
              onPress={handleStartReview}
              variant="primary"
            />
          </View>
        )}

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'review' && styles.activeTab]}
            onPress={() => setActiveTab('review')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'review' && styles.activeTabText,
              ]}
            >
              À réviser ({dueFlashcards.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'all' && styles.activeTab]}
            onPress={() => setActiveTab('all')}
          >
            <Text
              style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}
            >
              Toutes ({flashcards.length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Liste des flashcards */}
        <FlatList
          data={displayedCards}
          renderItem={renderFlashcard}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={renderEmpty}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <Modal
        visible={createListVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setCreateListVisible(false)}
      >
        <View style={styles.createModalBackdrop}>
          <GlassCard style={styles.createModalCard}>
            <Text style={styles.createModalTitle}>Nouvelle liste</Text>
            <Input
              label="Nom de la liste"
              placeholder="Ex: Vocabulaire voyage"
              value={newListName}
              onChangeText={setNewListName}
              autoCapitalize="sentences"
            />
            <View style={styles.createModalActions}>
              <Button
                title="Annuler"
                onPress={() => {
                  setCreateListVisible(false);
                  setNewListName('');
                }}
                variant="glass"
              />
              <Button
                title="Créer"
                onPress={handleCreateList}
                disabled={newListName.trim().length === 0}
              />
            </View>
          </GlassCard>
        </View>
      </Modal>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  title: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
  },
  listBadge: {
    marginTop: spacing.sm,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.surfaceLight,
    borderRadius: borderRadius.round,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  listBadgeText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  startButtonContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  listsHeader: {
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  listsTitle: {
    ...typography.h3,
    color: colors.text,
  },
  addListButton: {
    backgroundColor: colors.glass,
    borderRadius: borderRadius.round,
    padding: spacing.xs,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  listsScrollView: {
    maxHeight: 54,
  },
  listsScroll: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
    alignItems: 'center',
    gap: spacing.sm,
  },
  listChip: {
    minHeight: 36,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.round,
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  listChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  listChipText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  listChipTextActive: {
    color: colors.text,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  tabText: {
    ...typography.body,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  activeTabText: {
    color: colors.text,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  flashcardItem: {
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  flashcardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  hanzi: {
    ...typography.h2,
    color: colors.text,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  overdueBadge: {
    backgroundColor: colors.error,
  },
  scheduledBadge: {
    backgroundColor: colors.info,
  },
  statusText: {
    ...typography.small,
    color: colors.text,
    fontWeight: '600',
  },
  translation: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  flashcardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statsText: {
    ...typography.small,
    color: colors.textMuted,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
  emptyContainer: {
    paddingVertical: spacing.xxl,
    alignItems: 'center',
  },
  emptyTitle: {
    ...typography.h2,
    color: colors.text,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: spacing.xl,
  },
  createModalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  createModalCard: {
    width: '100%',
    maxWidth: 420,
    padding: spacing.lg,
  },
  createModalTitle: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.md,
  },
  createModalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
    marginTop: spacing.sm,
  },
});
