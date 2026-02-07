import { insertWord } from './queries';
import { initDatabase } from './init';
import { Word } from '../types';

// Imports statiques des fichiers JSON (requis par Metro bundler)
import hsk1Data from '../../data/hsk1.json';
import hsk2Data from '../../data/hsk2.json';
import hsk3Data from '../../data/hsk3.json';
import hsk4Data from '../../data/hsk4.json';
import hsk5Data from '../../data/hsk5.json';
import hsk6Data from '../../data/hsk6.json';
import hsk7Data from '../../data/hsk7.json';

// Map des niveaux HSK vers leurs données
const HSK_DATA_MAP: Record<string, any[]> = {
  hsk1: hsk1Data,
  hsk2: hsk2Data,
  hsk3: hsk3Data,
  hsk4: hsk4Data,
  hsk5: hsk5Data,
  hsk6: hsk6Data,
  hsk7: hsk7Data,
};

const HSK_LEVELS = ['hsk1', 'hsk2', 'hsk3', 'hsk4', 'hsk5', 'hsk6', 'hsk7'];

/**
 * Migre les données JSON depuis le dossier data/ vers SQLite
 */
export const migrateDataToSQLite = async (
  onProgress?: (current: number, total: number, level: string) => void
): Promise<void> => {
  try {
    console.log('Starting data migration...');

    // Initialiser la base de données
    await initDatabase();

    let totalWords = 0;

    // Importer chaque niveau HSK
    for (const level of HSK_LEVELS) {
      console.log(`Importing ${level}...`);

      try {
        const data = HSK_DATA_MAP[level];

        if (!Array.isArray(data)) {
          console.error(`Invalid data format for ${level}`);
          continue;
        }

        for (let i = 0; i < data.length; i++) {
          const word: Word = {
            id: data[i].id,
            level: data[i].level,
            hanzi: data[i].hanzi,
            pinyin: data[i].pinyin,
            translation: data[i].translation,
            translationFr: data[i].translationFr,
            category: data[i].category,
            explanation: data[i].explanation,
            explanationFr: data[i].explanationFr,
            audioPath: data[i].audio,
            theme: data[i].theme,
            tags: data[i].tags || [],
            translationFrAlt: data[i].translationFrAlt || [],
            examples: data[i].examples || [],
          };

          await insertWord(word);
          totalWords++;

          // Notification de progression
          if (onProgress && i % 50 === 0) {
            onProgress(i, data.length, level);
          }
        }

        console.log(`✓ ${level}: ${data.length} words imported`);
      } catch (error) {
        console.error(`Error importing ${level}:`, error);
      }
    }

    console.log(`Migration completed! Total: ${totalWords} words`);
  } catch (error) {
    console.error('Error during migration:', error);
    throw error;
  }
};

/**
 * Vérifie si la migration a déjà été effectuée
 */
export const isMigrationNeeded = async (): Promise<boolean> => {
  try {
    const db = await initDatabase();
    const result = await db.getFirstAsync<{ count: number }>(
      'SELECT COUNT(*) as count FROM words'
    );

    // Si la table est vide, migration nécessaire
    return (result?.count || 0) === 0;
  } catch (error) {
    console.error('Error checking migration status:', error);
    return true;
  }
};
