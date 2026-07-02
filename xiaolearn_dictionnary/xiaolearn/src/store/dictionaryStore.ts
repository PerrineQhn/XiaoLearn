import { create } from 'zustand';
import MiniSearch from 'minisearch';
import { Word, HSKLevel, SearchFilters } from '../types';
import { getAllWords, searchWords as dbSearchWords } from '../database/queries';

interface DictionaryState {
  words: Word[];
  searchResults: Word[];
  searchQuery: string;
  filters: SearchFilters;
  isLoading: boolean;
  miniSearch: MiniSearch<Word> | null;

  // Actions
  initializeDictionary: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  search: (query: string) => void;
  setFilters: (filters: SearchFilters) => void;
  clearFilters: () => void;
  getWordById: (id: string) => Word | undefined;
}

export const useDictionaryStore = create<DictionaryState>((set, get) => ({
  words: [],
  searchResults: [],
  searchQuery: '',
  filters: {},
  isLoading: false,
  miniSearch: null,

  initializeDictionary: async () => {
    set({ isLoading: true });
    try {
      // Charger tous les mots depuis la base de données
      const words = await getAllWords();

      // Initialiser MiniSearch pour la recherche full-text
      const miniSearch = new MiniSearch<Word>({
        fields: ['hanzi', 'pinyin', 'translationFr', 'translation'],
        storeFields: ['id', 'hanzi', 'pinyin', 'translationFr', 'level', 'category', 'theme'],
        searchOptions: {
          boost: { hanzi: 3, pinyin: 2, translationFr: 1.5 },
          fuzzy: 0.2,
          prefix: true,
        },
      });

      // Indexer tous les mots
      miniSearch.addAll(words);

      set({
        words,
        miniSearch,
        searchResults: words.slice(0, 50), // Afficher les 50 premiers mots par défaut
        isLoading: false,
      });
    } catch (error) {
      console.error('Error initializing dictionary:', error);
      set({ isLoading: false });
    }
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },

  search: (query: string) => {
    const { miniSearch, words, filters } = get();
    set({ searchQuery: query });

    if (!query.trim()) {
      // Si pas de query, afficher les premiers mots (avec filtres appliqués)
      const filtered = applyFilters(words, filters);
      set({ searchResults: filtered.slice(0, 50) });
      return;
    }

    if (!miniSearch) {
      // Fallback si MiniSearch n'est pas initialisé
      const results = words.filter(
        (word) =>
          word.hanzi.includes(query) ||
          word.pinyin.toLowerCase().includes(query.toLowerCase()) ||
          word.translationFr.toLowerCase().includes(query.toLowerCase())
      );
      set({ searchResults: applyFilters(results, filters).slice(0, 50) });
      return;
    }

    // Recherche avec MiniSearch
    const searchResults = miniSearch.search(query);

    // Récupérer les mots complets depuis le store
    const fullResults = searchResults
      .map((result) => words.find((w) => w.id === result.id))
      .filter((w): w is Word => w !== undefined);

    // Appliquer les filtres
    const filtered = applyFilters(fullResults, filters);

    set({ searchResults: filtered.slice(0, 100) });
  },

  setFilters: (filters: SearchFilters) => {
    set({ filters });
    // Réappliquer la recherche avec les nouveaux filtres
    const { search, searchQuery } = get();
    search(searchQuery);
  },

  clearFilters: () => {
    set({ filters: {} });
    // Réappliquer la recherche sans filtres
    const { search, searchQuery } = get();
    search(searchQuery);
  },

  getWordById: (id: string) => {
    const { words } = get();
    return words.find((w) => w.id === id);
  },
}));

// Fonction helper pour appliquer les filtres
const applyFilters = (words: Word[], filters: SearchFilters): Word[] => {
  let filtered = words;

  if (filters.levels && filters.levels.length > 0) {
    filtered = filtered.filter((w) => filters.levels!.includes(w.level as HSKLevel));
  }

  if (filters.categories && filters.categories.length > 0) {
    filtered = filtered.filter((w) => filters.categories!.includes(w.category));
  }

  if (filters.themes && filters.themes.length > 0) {
    filtered = filtered.filter((w) => w.theme && filters.themes!.includes(w.theme));
  }

  return filtered;
};
