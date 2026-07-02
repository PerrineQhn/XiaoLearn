import { getDatabase } from './init';
import { Word, Flashcard, ReviewHistory, WritingPractice, FlashcardList } from '../types';

// ==================== WORDS ====================

export const insertWord = async (word: Word): Promise<void> => {
  const db = await getDatabase();

  await db.runAsync(
    `INSERT OR REPLACE INTO words (
      id, level, hanzi, pinyin, translation, translationFr,
      category, explanation, explanationFr, audioPath, theme,
      tags, translationFrAlt, examples
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      word.id,
      word.level,
      word.hanzi,
      word.pinyin,
      word.translation,
      word.translationFr,
      word.category,
      word.explanation || null,
      word.explanationFr || null,
      word.audioPath || null,
      word.theme || null,
      JSON.stringify(word.tags || []),
      JSON.stringify(word.translationFrAlt || []),
      JSON.stringify(word.examples || []),
    ]
  );
};

export const getWordById = async (id: string): Promise<Word | null> => {
  const db = await getDatabase();
  const result = await db.getFirstAsync<any>(
    'SELECT * FROM words WHERE id = ?',
    [id]
  );

  if (!result) return null;

  return parseWord(result);
};

export const searchWords = async (
  query: string,
  limit: number = 50
): Promise<Word[]> => {
  const db = await getDatabase();
  const searchPattern = `%${query}%`;

  const results = await db.getAllAsync<any>(
    `SELECT * FROM words
     WHERE hanzi LIKE ? OR pinyin LIKE ? OR translationFr LIKE ?
     LIMIT ?`,
    [searchPattern, searchPattern, searchPattern, limit]
  );

  return results.map(parseWord);
};

export const getWordsByLevel = async (level: string): Promise<Word[]> => {
  const db = await getDatabase();
  const results = await db.getAllAsync<any>(
    'SELECT * FROM words WHERE level = ? ORDER BY hanzi',
    [level]
  );

  return results.map(parseWord);
};

export const getAllWords = async (): Promise<Word[]> => {
  const db = await getDatabase();
  const results = await db.getAllAsync<any>('SELECT * FROM words');
  return results.map(parseWord);
};

export const getWordCount = async (): Promise<number> => {
  const db = await getDatabase();
  const result = await db.getFirstAsync<{ count: number }>(
    'SELECT COUNT(*) as count FROM words'
  );
  return result?.count || 0;
};

// ==================== FLASHCARDS ====================

export const createFlashcard = async (
  wordId: string
): Promise<number> => {
  const db = await getDatabase();
  const now = new Date().toISOString();

  const result = await db.runAsync(
    `INSERT INTO flashcards (
      wordId, easinessFactor, interval, repetitions,
      nextReviewDate, createdAt
    ) VALUES (?, 2.5, 0, 0, ?, ?)`,
    [wordId, now, now]
  );

  return result.lastInsertRowId;
};

export const getFlashcardByWordId = async (
  wordId: string
): Promise<Flashcard | null> => {
  const db = await getDatabase();
  const result = await db.getFirstAsync<any>(
    'SELECT * FROM flashcards WHERE wordId = ?',
    [wordId]
  );

  return result ? parseFlashcard(result) : null;
};

export const updateFlashcard = async (
  id: number,
  updates: Partial<Flashcard>
): Promise<void> => {
  const db = await getDatabase();

  await db.runAsync(
    `UPDATE flashcards
     SET easinessFactor = ?, interval = ?, repetitions = ?,
         nextReviewDate = ?, lastReviewDate = ?
     WHERE id = ?`,
    [
      updates.easinessFactor,
      updates.interval,
      updates.repetitions,
      updates.nextReviewDate,
      updates.lastReviewDate,
      id,
    ]
  );
};

export const getFlashcardsDueForReview = async (): Promise<Flashcard[]> => {
  const db = await getDatabase();
  const now = new Date().toISOString();

  const results = await db.getAllAsync<any>(
    'SELECT * FROM flashcards WHERE nextReviewDate <= ? ORDER BY nextReviewDate',
    [now]
  );

  return results.map(parseFlashcard);
};

export const getAllFlashcards = async (): Promise<Flashcard[]> => {
  const db = await getDatabase();
  const results = await db.getAllAsync<any>('SELECT * FROM flashcards');
  return results.map(parseFlashcard);
};

export const deleteFlashcard = async (id: number): Promise<void> => {
  const db = await getDatabase();
  await db.runAsync('DELETE FROM flashcards WHERE id = ?', [id]);
};

// ==================== FLASHCARD LISTS ====================

export const createFlashcardList = async (name: string): Promise<number> => {
  const db = await getDatabase();
  const now = new Date().toISOString();

  const result = await db.runAsync(
    `INSERT INTO flashcard_lists (name, createdAt)
     VALUES (?, ?)`,
    [name, now]
  );

  return result.lastInsertRowId;
};

export const getFlashcardLists = async (): Promise<FlashcardList[]> => {
  const db = await getDatabase();
  const results = await db.getAllAsync<any>(
    'SELECT * FROM flashcard_lists ORDER BY createdAt DESC'
  );
  return results.map(parseFlashcardList);
};

export const getFlashcardListByName = async (
  name: string
): Promise<FlashcardList | null> => {
  const db = await getDatabase();
  const result = await db.getFirstAsync<any>(
    'SELECT * FROM flashcard_lists WHERE name = ?',
    [name]
  );

  return result ? parseFlashcardList(result) : null;
};

export const addFlashcardToList = async (
  flashcardId: number,
  listId: number
): Promise<void> => {
  const db = await getDatabase();
  const now = new Date().toISOString();

  await db.runAsync(
    `INSERT OR IGNORE INTO flashcard_list_items (listId, flashcardId, createdAt)
     VALUES (?, ?, ?)`,
    [listId, flashcardId, now]
  );
};

export const getFlashcardsForList = async (
  listId: number
): Promise<Flashcard[]> => {
  const db = await getDatabase();
  const results = await db.getAllAsync<any>(
    `SELECT f.* FROM flashcards f
     INNER JOIN flashcard_list_items i ON i.flashcardId = f.id
     WHERE i.listId = ?
     ORDER BY f.nextReviewDate`,
    [listId]
  );

  return results.map(parseFlashcard);
};

export const getFlashcardsDueForReviewByList = async (
  listId: number
): Promise<Flashcard[]> => {
  const db = await getDatabase();
  const now = new Date().toISOString();
  const results = await db.getAllAsync<any>(
    `SELECT f.* FROM flashcards f
     INNER JOIN flashcard_list_items i ON i.flashcardId = f.id
     WHERE i.listId = ? AND f.nextReviewDate <= ?
     ORDER BY f.nextReviewDate`,
    [listId, now]
  );

  return results.map(parseFlashcard);
};

export const getFlashcardCounts = async (): Promise<{
  total: number;
  due: number;
}> => {
  const db = await getDatabase();
  const now = new Date().toISOString();
  const totalRow = await db.getFirstAsync<{ count: number }>(
    'SELECT COUNT(*) as count FROM flashcards'
  );
  const dueRow = await db.getFirstAsync<{ count: number }>(
    'SELECT COUNT(*) as count FROM flashcards WHERE nextReviewDate <= ?',
    [now]
  );

  return {
    total: totalRow?.count || 0,
    due: dueRow?.count || 0,
  };
};

export const getReviewStats = async (): Promise<{
  total: number;
  correct: number;
  lastReviewDate: string | null;
}> => {
  const db = await getDatabase();
  const totalRow = await db.getFirstAsync<{ count: number }>(
    'SELECT COUNT(*) as count FROM review_history'
  );
  const correctRow = await db.getFirstAsync<{ count: number }>(
    'SELECT COUNT(*) as count FROM review_history WHERE quality >= 3'
  );
  const lastRow = await db.getFirstAsync<{ reviewDate: string }>(
    'SELECT reviewDate FROM review_history ORDER BY reviewDate DESC LIMIT 1'
  );

  return {
    total: totalRow?.count || 0,
    correct: correctRow?.count || 0,
    lastReviewDate: lastRow?.reviewDate || null,
  };
};

export const getReviewDates = async (): Promise<string[]> => {
  const db = await getDatabase();
  const results = await db.getAllAsync<any>(
    'SELECT reviewDate FROM review_history ORDER BY reviewDate DESC'
  );

  return results.map((row) => row.reviewDate);
};

// ==================== REVIEW HISTORY ====================

export const addReviewHistory = async (
  flashcardId: number,
  quality: number,
  timeSpentMs: number
): Promise<void> => {
  const db = await getDatabase();
  const now = new Date().toISOString();

  await db.runAsync(
    `INSERT INTO review_history (flashcardId, reviewDate, quality, timeSpentMs)
     VALUES (?, ?, ?, ?)`,
    [flashcardId, now, quality, timeSpentMs]
  );
};

export const getReviewHistoryForFlashcard = async (
  flashcardId: number
): Promise<ReviewHistory[]> => {
  const db = await getDatabase();
  const results = await db.getAllAsync<any>(
    'SELECT * FROM review_history WHERE flashcardId = ? ORDER BY reviewDate DESC',
    [flashcardId]
  );

  return results.map(parseReviewHistory);
};

export const getRecentReviews = async (limit: number = 100): Promise<ReviewHistory[]> => {
  const db = await getDatabase();
  const results = await db.getAllAsync<any>(
    'SELECT * FROM review_history ORDER BY reviewDate DESC LIMIT ?',
    [limit]
  );

  return results.map(parseReviewHistory);
};

// ==================== WRITING PRACTICE ====================

export const addWritingPractice = async (
  wordId: string,
  recognitionSuccess: boolean,
  attempts: number
): Promise<void> => {
  const db = await getDatabase();
  const now = new Date().toISOString();

  await db.runAsync(
    `INSERT INTO writing_practice (wordId, practiceDate, recognitionSuccess, attempts)
     VALUES (?, ?, ?, ?)`,
    [wordId, now, recognitionSuccess ? 1 : 0, attempts]
  );
};

export const getWritingPracticeForWord = async (
  wordId: string
): Promise<WritingPractice[]> => {
  const db = await getDatabase();
  const results = await db.getAllAsync<any>(
    'SELECT * FROM writing_practice WHERE wordId = ? ORDER BY practiceDate DESC',
    [wordId]
  );

  return results.map(parseWritingPractice);
};

export const getWritingStats = async (): Promise<{
  total: number;
  success: number;
  lastPracticeDate: string | null;
  uniqueWords: number;
}> => {
  const db = await getDatabase();
  const totalRow = await db.getFirstAsync<{ count: number }>(
    'SELECT COUNT(*) as count FROM writing_practice'
  );
  const successRow = await db.getFirstAsync<{ count: number }>(
    'SELECT COUNT(*) as count FROM writing_practice WHERE recognitionSuccess = 1'
  );
  const lastRow = await db.getFirstAsync<{ practiceDate: string }>(
    'SELECT practiceDate FROM writing_practice ORDER BY practiceDate DESC LIMIT 1'
  );
  const uniqueRow = await db.getFirstAsync<{ count: number }>(
    'SELECT COUNT(DISTINCT wordId) as count FROM writing_practice'
  );

  return {
    total: totalRow?.count || 0,
    success: successRow?.count || 0,
    lastPracticeDate: lastRow?.practiceDate || null,
    uniqueWords: uniqueRow?.count || 0,
  };
};

export const getWritingPracticeDates = async (): Promise<string[]> => {
  const db = await getDatabase();
  const results = await db.getAllAsync<any>(
    'SELECT practiceDate FROM writing_practice ORDER BY practiceDate DESC'
  );

  return results.map((row) => row.practiceDate);
};

// ==================== HELPER FUNCTIONS ====================

const parseWord = (row: any): Word => ({
  id: row.id,
  level: row.level,
  hanzi: row.hanzi,
  pinyin: row.pinyin,
  translation: row.translation,
  translationFr: row.translationFr,
  category: row.category,
  explanation: row.explanation,
  explanationFr: row.explanationFr,
  audioPath: row.audioPath,
  theme: row.theme,
  tags: row.tags ? JSON.parse(row.tags) : [],
  translationFrAlt: row.translationFrAlt ? JSON.parse(row.translationFrAlt) : [],
  examples: row.examples ? JSON.parse(row.examples) : [],
});

const parseFlashcard = (row: any): Flashcard => ({
  id: row.id,
  wordId: row.wordId,
  easinessFactor: row.easinessFactor,
  interval: row.interval,
  repetitions: row.repetitions,
  nextReviewDate: row.nextReviewDate,
  lastReviewDate: row.lastReviewDate,
  createdAt: row.createdAt,
});

const parseFlashcardList = (row: any): FlashcardList => ({
  id: row.id,
  name: row.name,
  createdAt: row.createdAt,
});

const parseReviewHistory = (row: any): ReviewHistory => ({
  id: row.id,
  flashcardId: row.flashcardId,
  reviewDate: row.reviewDate,
  quality: row.quality,
  timeSpentMs: row.timeSpentMs,
});

const parseWritingPractice = (row: any): WritingPractice => ({
  id: row.id,
  wordId: row.wordId,
  practiceDate: row.practiceDate,
  recognitionSuccess: row.recognitionSuccess === 1,
  attempts: row.attempts,
});
