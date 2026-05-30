/**
 * dictionary.ts — loader unifié pour le dictionnaire CFDICT.
 *
 * Sources :
 *   - HSK1 à HSK7 : public/data/dictionary/hsk/{level}/chunk-NNN.json
 *                   format : map { id: DictionaryEntry, ... }
 *   - Hors-HSK    : public/data/hors-hsk/chunk-NNN.json
 *                   format : array DictionaryEntry[]
 *
 * Toutes les fonctions chargent à la demande (lazy) avec cache mémoire pour
 * éviter de re-fetch entre les pages. La meta HSK est chargée 1 fois au mount.
 */

import type {
  DictionaryEntry,
  DictionaryLevel,
  HskMeta
} from '../types/dictionary';

const HSK_LEVELS: DictionaryLevel[] = ['hsk1', 'hsk2', 'hsk3', 'hsk4', 'hsk5', 'hsk6', 'hsk7'];

// Cache mémoire : level → array d'entries chargées.
const levelCache = new Map<DictionaryLevel, DictionaryEntry[]>();
// Cache : id → entry (pour fiche détail rapide).
const entryByIdCache = new Map<string, DictionaryEntry>();
let metaCache: HskMeta | null = null;

const baseUrl = () => {
  const base = import.meta.env.BASE_URL ?? '/';
  return base.endsWith('/') ? base : `${base}/`;
};

/** Charge le meta.json HSK (chunkSize + nb par niveau). */
export async function fetchHskMeta(): Promise<HskMeta> {
  if (metaCache) return metaCache;
  const resp = await fetch(`${baseUrl()}data/dictionary/hsk/meta.json`);
  if (!resp.ok) {
    throw new Error(`Failed to fetch HSK meta: ${resp.status}`);
  }
  metaCache = (await resp.json()) as HskMeta;
  return metaCache;
}

/** Charge toutes les entrées d'un niveau (concatène tous ses chunks). */
export async function fetchLevelEntries(
  level: DictionaryLevel
): Promise<DictionaryEntry[]> {
  const cached = levelCache.get(level);
  if (cached) return cached;

  let entries: DictionaryEntry[] = [];

  if (level === 'hors-hsk') {
    // Hors-HSK : 110 chunks × ~1000 entries = 109k entrées au total. Le
    // manifest dédié (`hors-hsk/manifest.json`) liste les noms de chunks
    // exacts. Pour la page DictionaryLevelPage / DictionaryPage on charge
    // TOUT en parallèle (~60 MB compressé) ; le browser le fait en quelques
    // secondes sur connexion modérée et le résultat est ensuite caché en
    // mémoire (`levelCache`). Pour la fiche détail unique on aurait pu
    // charger un seul chunk via l'id, mais ce code path passe d'abord par
    // fetchEntryById → fetchLevelEntries qui veut tout l'index.
    const manifestResp = await fetch(`${baseUrl()}data/hors-hsk/manifest.json`).catch(() => null);
    let chunkFiles: string[] = [];
    if (manifestResp?.ok) {
      try {
        const manifest = await manifestResp.json();
        if (Array.isArray(manifest.chunks)) {
          chunkFiles = manifest.chunks;
        }
      } catch {
        /* fallback ci-dessous */
      }
    }
    if (chunkFiles.length === 0) {
      // Fallback : 110 chunks numérotés
      for (let i = 1; i <= 110; i++) {
        chunkFiles.push(`chunk-${String(i).padStart(3, '0')}.json`);
      }
    }
    const promises: Promise<DictionaryEntry[]>[] = chunkFiles.map((name) => {
      const url = `${baseUrl()}data/hors-hsk/${name}`;
      return fetch(url)
        .then((r) => (r.ok ? r.json() : []))
        .catch(() => []);
    });
    const chunks = await Promise.all(promises);
    entries = chunks.flat() as DictionaryEntry[];
  } else {
    // HSK : structure level/chunk-NNN.json format map { id: entry }
    const meta = await fetchHskMeta();
    const levelCount = meta.levels[level] ?? 0;
    if (levelCount === 0) return [];
    const chunkSize = meta.chunkSize ?? 500;
    const chunkCount = Math.ceil(levelCount / chunkSize);

    const promises: Promise<Record<string, DictionaryEntry>>[] = [];
    for (let i = 1; i <= chunkCount; i++) {
      const url = `${baseUrl()}data/dictionary/hsk/${level}/chunk-${String(i).padStart(3, '0')}.json`;
      promises.push(
        fetch(url)
          .then((r) => (r.ok ? r.json() : {}))
          .catch(() => ({}))
      );
    }
    const chunks = await Promise.all(promises);
    entries = chunks.flatMap((chunk) => Object.values(chunk));
  }

  // Indexe pour lookup par id
  for (const e of entries) {
    if (e.id) entryByIdCache.set(e.id, e);
  }

  levelCache.set(level, entries);
  return entries;
}

/** Récupère une entrée par son id (level inféré depuis le préfixe). */
export async function fetchEntryById(id: string): Promise<DictionaryEntry | null> {
  if (entryByIdCache.has(id)) return entryByIdCache.get(id)!;

  // Infère le niveau depuis l'id ('hsk1-0001', 'hors-hsk-000001')
  let level: DictionaryLevel | null = null;
  if (id.startsWith('hors-hsk-')) {
    level = 'hors-hsk';
  } else {
    for (const lvl of HSK_LEVELS) {
      if (id.startsWith(`${lvl}-`)) {
        level = lvl;
        break;
      }
    }
  }
  if (!level) return null;

  await fetchLevelEntries(level);
  return entryByIdCache.get(id) ?? null;
}

/** Renvoie les stats : nb d'entrées par niveau. */
export async function fetchDictionaryStats(): Promise<Record<DictionaryLevel, number>> {
  const meta = await fetchHskMeta();
  const stats: Record<string, number> = {};
  for (const lvl of HSK_LEVELS) {
    stats[lvl] = meta.levels[lvl] ?? 0;
  }
  // hors-hsk : lit son manifest dédié (`totalEntries`). Fallback 0 si absent.
  try {
    const r = await fetch(`${baseUrl()}data/hors-hsk/manifest.json`);
    if (r.ok) {
      const m = await r.json();
      stats['hors-hsk'] = m.totalEntries ?? 0;
    } else {
      stats['hors-hsk'] = 0;
    }
  } catch {
    stats['hors-hsk'] = 0;
  }
  return stats as Record<DictionaryLevel, number>;
}

/** Pré-clés HSK pour les UI. */
export const ALL_DICTIONARY_LEVELS: DictionaryLevel[] = [
  ...HSK_LEVELS,
  'hors-hsk'
];

export const LEVEL_LABEL: Record<DictionaryLevel, string> = {
  hsk1: 'HSK 1',
  hsk2: 'HSK 2',
  hsk3: 'HSK 3',
  hsk4: 'HSK 4',
  hsk5: 'HSK 5',
  hsk6: 'HSK 6',
  hsk7: 'HSK 7-9',
  'hors-hsk': 'Hors-HSK'
};

export const LEVEL_COLOR: Record<DictionaryLevel, string> = {
  hsk1: '#2E7D32',
  hsk2: '#1565C0',
  hsk3: '#E65100',
  hsk4: '#C2185B',
  hsk5: '#6A1B9A',
  hsk6: '#006064',
  hsk7: '#BF360C',
  'hors-hsk': '#546E7A'
};

export const LEVEL_BG: Record<DictionaryLevel, string> = {
  hsk1: '#E8F5E9',
  hsk2: '#E3F2FD',
  hsk3: '#FFF3E0',
  hsk4: '#FCE4EC',
  hsk5: '#F3E5F5',
  hsk6: '#E0F7FA',
  hsk7: '#FFF8E1',
  'hors-hsk': '#ECEFF1'
};

export const LEVEL_DESCRIPTION: Record<DictionaryLevel, string> = {
  hsk1: 'Niveau débutant — 300 mots essentiels',
  hsk2: 'Niveau élémentaire — 300 mots supplémentaires',
  hsk3: 'Niveau intermédiaire — 600 mots',
  hsk4: 'Niveau intermédiaire avancé — 1200 mots',
  hsk5: 'Niveau avancé — vocabulaire étendu',
  hsk6: 'Niveau avancé supérieur — compréhension approfondie',
  hsk7: 'Niveau expert — maîtrise étendue du mandarin',
  'hors-hsk': 'Vocabulaire courant hors programme HSK officiel'
};

/**
 * Cherche une entrée du dictionnaire à partir d'un hanzi exact. Parcourt
 * d'abord les niveaux HSK (du plus simple au plus complexe), puis hors-HSK.
 * Renvoie la première correspondance trouvée. Utilisé pour router les hits
 * "vocab" de la barre de recherche vers la fiche dictionnaire.
 */
export async function findEntryByHanzi(hanzi: string): Promise<DictionaryEntry | null> {
  const cleaned = hanzi.trim();
  if (!cleaned) return null;
  // 1) On regarde d'abord ce qui est déjà en cache mémoire — instantané.
  for (const entry of entryByIdCache.values()) {
    if (entry.hanzi === cleaned) return entry;
  }
  // 2) Sinon on parcourt les niveaux dans l'ordre. On charge à la demande.
  for (const lvl of ALL_DICTIONARY_LEVELS) {
    const entries = await fetchLevelEntries(lvl);
    const found = entries.find((e) => e.hanzi === cleaned);
    if (found) return found;
  }
  return null;
}
