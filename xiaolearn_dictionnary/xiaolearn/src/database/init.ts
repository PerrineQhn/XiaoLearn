import * as SQLite from 'expo-sqlite';
import { createTablesSQL } from './schema';

const DB_NAME = 'xiaolearn.db';

let db: SQLite.SQLiteDatabase | null = null;

export const initDatabase = async (): Promise<SQLite.SQLiteDatabase> => {
  if (db) {
    return db;
  }

  try {
    db = await SQLite.openDatabaseAsync(DB_NAME);

    // Activer les foreign keys
    await db.execAsync('PRAGMA foreign_keys = ON;');

    // Créer les tables
    await db.execAsync(createTablesSQL);

    console.log('Database initialized successfully');
    return db;
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

export const getDatabase = async (): Promise<SQLite.SQLiteDatabase> => {
  if (!db) {
    return await initDatabase();
  }
  return db;
};

export const closeDatabase = async (): Promise<void> => {
  if (db) {
    await db.closeAsync();
    db = null;
    console.log('Database closed');
  }
};

export const resetDatabase = async (): Promise<void> => {
  try {
    const database = await getDatabase();

    // Supprimer toutes les tables
    await database.execAsync(`
      DROP TABLE IF EXISTS writing_practice;
      DROP TABLE IF EXISTS review_history;
      DROP TABLE IF EXISTS flashcard_list_items;
      DROP TABLE IF EXISTS flashcard_lists;
      DROP TABLE IF EXISTS flashcards;
      DROP TABLE IF EXISTS words;
      DROP TABLE IF EXISTS user_settings;
    `);

    // Recréer les tables
    await database.execAsync(createTablesSQL);

    console.log('Database reset successfully');
  } catch (error) {
    console.error('Error resetting database:', error);
    throw error;
  }
};
