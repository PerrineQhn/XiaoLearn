// Schéma SQLite pour XiaoLearn

export const createTablesSQL = `
-- Table des mots
CREATE TABLE IF NOT EXISTS words (
  id TEXT PRIMARY KEY,
  level TEXT NOT NULL,
  hanzi TEXT NOT NULL,
  pinyin TEXT NOT NULL,
  translation TEXT NOT NULL,
  translationFr TEXT NOT NULL,
  category TEXT,
  explanation TEXT,
  explanationFr TEXT,
  audioPath TEXT,
  theme TEXT,
  tags TEXT,
  translationFrAlt TEXT,
  examples TEXT
);

-- Index pour améliorer les recherches
CREATE INDEX IF NOT EXISTS idx_hanzi ON words(hanzi);
CREATE INDEX IF NOT EXISTS idx_pinyin ON words(pinyin);
CREATE INDEX IF NOT EXISTS idx_level ON words(level);
CREATE INDEX IF NOT EXISTS idx_theme ON words(theme);

-- Table des flashcards
CREATE TABLE IF NOT EXISTS flashcards (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  wordId TEXT NOT NULL,
  easinessFactor REAL DEFAULT 2.5,
  interval INTEGER DEFAULT 0,
  repetitions INTEGER DEFAULT 0,
  nextReviewDate TEXT NOT NULL,
  lastReviewDate TEXT,
  createdAt TEXT NOT NULL,
  FOREIGN KEY (wordId) REFERENCES words(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_next_review ON flashcards(nextReviewDate);
CREATE INDEX IF NOT EXISTS idx_word_id ON flashcards(wordId);

-- Table des listes de flashcards
CREATE TABLE IF NOT EXISTS flashcard_lists (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  createdAt TEXT NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_flashcard_lists_name ON flashcard_lists(name);

-- Table d'association flashcards <-> listes
CREATE TABLE IF NOT EXISTS flashcard_list_items (
  listId INTEGER NOT NULL,
  flashcardId INTEGER NOT NULL,
  createdAt TEXT NOT NULL,
  PRIMARY KEY (listId, flashcardId),
  FOREIGN KEY (listId) REFERENCES flashcard_lists(id) ON DELETE CASCADE,
  FOREIGN KEY (flashcardId) REFERENCES flashcards(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_flashcard_list_items_list ON flashcard_list_items(listId);
CREATE INDEX IF NOT EXISTS idx_flashcard_list_items_flashcard ON flashcard_list_items(flashcardId);

-- Table de l'historique des révisions
CREATE TABLE IF NOT EXISTS review_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  flashcardId INTEGER NOT NULL,
  reviewDate TEXT NOT NULL,
  quality INTEGER NOT NULL,
  timeSpentMs INTEGER NOT NULL,
  FOREIGN KEY (flashcardId) REFERENCES flashcards(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_review_date ON review_history(reviewDate);
CREATE INDEX IF NOT EXISTS idx_flashcard_id ON review_history(flashcardId);

-- Table de pratique d'écriture
CREATE TABLE IF NOT EXISTS writing_practice (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  wordId TEXT NOT NULL,
  practiceDate TEXT NOT NULL,
  recognitionSuccess INTEGER NOT NULL,
  attempts INTEGER NOT NULL,
  FOREIGN KEY (wordId) REFERENCES words(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_writing_date ON writing_practice(practiceDate);
CREATE INDEX IF NOT EXISTS idx_writing_word ON writing_practice(wordId);

-- Table des préférences utilisateur
CREATE TABLE IF NOT EXISTS user_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
`;

export const dropTablesSQL = `
DROP TABLE IF EXISTS writing_practice;
DROP TABLE IF EXISTS review_history;
DROP TABLE IF EXISTS flashcard_list_items;
DROP TABLE IF EXISTS flashcard_lists;
DROP TABLE IF EXISTS flashcards;
DROP TABLE IF EXISTS words;
DROP TABLE IF EXISTS user_settings;
`;
