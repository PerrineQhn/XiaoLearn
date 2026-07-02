import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Container } from '../components/shared';
import { SearchBar, WordCard, FilterChips, WordDetailModal } from '../components/dictionary';
import { FlashcardListPickerModal } from '../components/flashcards';
import { useDictionaryStore } from '../store/dictionaryStore';
import { useFlashcardsStore } from '../store/flashcardsStore';
import { Word, HSKLevel } from '../types';
import { colors, spacing, typography } from '../utils/theme';
import { playAudio } from '../utils/audio';
import { addFlashcardToList, createFlashcard, getFlashcardByWordId } from '../database/queries';

export const DictionaryScreen: React.FC = () => {
  const {
    searchResults,
    searchQuery,
    isLoading,
    filters,
    initializeDictionary,
    search,
    setFilters,
    clearFilters,
  } = useDictionaryStore();

  const { lists, loadLists, createList } = useFlashcardsStore();

  const [selectedWord, setSelectedWord] = useState<Word | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [listModalVisible, setListModalVisible] = useState(false);
  const [listWord, setListWord] = useState<Word | null>(null);

  useEffect(() => {
    initializeDictionary();
  }, []);

  useEffect(() => {
    loadLists();
  }, []);

  const handleSearch = useCallback(
    (query: string) => {
      search(query);
    },
    [search]
  );

  const handleToggleLevel = useCallback(
    (level: HSKLevel) => {
      const currentLevels = filters.levels || [];
      const newLevels = currentLevels.includes(level)
        ? currentLevels.filter((l) => l !== level)
        : [...currentLevels, level];

      setFilters({ ...filters, levels: newLevels });
    },
    [filters, setFilters]
  );

  const handleWordPress = useCallback((word: Word) => {
    setSelectedWord(word);
    setModalVisible(true);
  }, []);

  const handlePlayAudio = useCallback((word: Word) => {
    if (word.audioPath) {
      playAudio(word.audioPath).catch((error) => {
        console.error('Failed to play audio:', error);
      });
    }
  }, []);

  const handleAddToFlashcards = useCallback((word: Word) => {
    setListWord(word);
    setListModalVisible(true);
    setModalVisible(false);
  }, []);

  const handleSubmitToLists = useCallback(
    async (selectedIds: number[], newListName: string) => {
      if (!listWord) return;
      try {
        const listIds = [...selectedIds];
        const trimmedName = newListName.trim();
        if (trimmedName) {
          const listId = await createList(trimmedName);
          if (listId) {
            listIds.push(listId);
          }
        }

        if (listIds.length === 0) {
          alert('Sélectionnez au moins une liste.');
          return;
        }

        const existing = await getFlashcardByWordId(listWord.id);
        const flashcardId = existing ? existing.id : await createFlashcard(listWord.id);

        await Promise.all(
          listIds.map((listId) => addFlashcardToList(flashcardId, listId))
        );

        alert('Carte ajoutée aux listes sélectionnées !');
        setListModalVisible(false);
        setListWord(null);
      } catch (error) {
        console.error('Error adding to flashcard lists:', error);
        alert('Erreur lors de l\'ajout aux listes');
      }
    },
    [listWord, createList]
  );

  const renderWord = useCallback(
    ({ item }: { item: Word }) => (
      <WordCard
        word={item}
        onPress={() => handleWordPress(item)}
        onPlayAudio={() => handlePlayAudio(item)}
        onAddToFlashcards={() => handleAddToFlashcards(item)}
      />
    ),
    [handleWordPress, handlePlayAudio, handleAddToFlashcards]
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        {searchQuery ? 'Aucun résultat trouvé' : 'Utilisez la recherche pour trouver des mots'}
      </Text>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>Dictionnaire</Text>
      <Text style={styles.subtitle}>
        {searchResults.length > 0
          ? `${searchResults.length} résultat${searchResults.length > 1 ? 's' : ''}`
          : 'Recherchez parmi 11,000+ mots'}
      </Text>
    </View>
  );

  if (isLoading) {
    return (
      <Container>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Chargement du dictionnaire...</Text>
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <View style={styles.container}>
        {renderHeader()}

        <View style={styles.searchContainer}>
          <SearchBar
            value={searchQuery}
            onChangeText={handleSearch}
            placeholder="Rechercher par hanzi, pinyin ou français..."
          />
        </View>

        <FilterChips
          selectedLevels={filters.levels || []}
          onToggleLevel={handleToggleLevel}
          onClearFilters={clearFilters}
        />

        <FlatList
          data={searchResults}
          renderItem={renderWord}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={renderEmpty}
          showsVerticalScrollIndicator={false}
        />

        <WordDetailModal
          visible={modalVisible}
          word={selectedWord}
          onClose={() => setModalVisible(false)}
          onPlayAudio={() => selectedWord && handlePlayAudio(selectedWord)}
          onAddToFlashcards={() =>
            selectedWord && handleAddToFlashcards(selectedWord)
          }
        />

        <FlashcardListPickerModal
          visible={listModalVisible}
          lists={lists}
          onClose={() => {
            setListModalVisible(false);
            setListWord(null);
          }}
          onSubmit={handleSubmitToLists}
        />
      </View>
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
  searchContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
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
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
