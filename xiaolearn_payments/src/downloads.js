export const buildDownloadUrl = (baseUrl, file) => {
  if (!baseUrl || !file) return null;
  const trimmed = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  return `${trimmed}/${file}`;
};

const vocabByLevel = {
  hsk1: { label: 'Vocabulaire HSK 1', file: 'hsk_cards/fiche_hsk1.pdf' },
  hsk2: { label: 'Vocabulaire HSK 2', file: 'hsk_cards/fiche_hsk2.pdf' },
  hsk3: { label: 'Vocabulaire HSK 3', file: 'hsk_cards/fiche_hsk3.pdf' },
  hsk4: { label: 'Vocabulaire HSK 4', file: 'hsk_cards/fiche_hsk4.pdf' },
  hsk5: { label: 'Vocabulaire HSK 5', file: 'hsk_cards/fiche_hsk5.pdf' },
  hsk6: { label: 'Vocabulaire HSK 6', file: 'hsk_cards/fiche_hsk6.pdf' },
  hsk79: { label: 'Vocabulaire HSK 7-9', file: 'hsk_cards/fiche_hsk79.pdf' }
};

const writingByLevel = {
  hsk1: { label: 'Écriture HSK 1', file: 'hsk_cards/fiche_hsk12_writing.pdf' },
  hsk2: { label: 'Écriture HSK 2', file: 'hsk_cards/fiche_hsk12_writing.pdf' },
  hsk3: { label: 'Écriture HSK 3', file: 'hsk_cards/fiche_hsk3_writing.pdf' },
  hsk4: { label: 'Écriture HSK 4', file: 'hsk_cards/fiche_hsk4_writing.pdf' },
  hsk5: { label: 'Écriture HSK 5', file: 'hsk_cards/fiche_hsk5_writing.pdf' },
  hsk6: { label: 'Écriture HSK 6', file: 'hsk_cards/fiche_hsk6_writing.pdf' },
  hsk79: { label: 'Écriture HSK 7-9', file: 'hsk_cards/fiche_hsk79_writing.pdf' }
};

const HSK_LEVEL_KEYS = ['hsk1', 'hsk2', 'hsk3', 'hsk4', 'hsk5', 'hsk6', 'hsk79'];

const asBundle = (mapByLevel) => HSK_LEVEL_KEYS.map((key) => mapByLevel[key]).filter(Boolean);

const asByLevel = (mapByLevel) =>
  Object.fromEntries(
    HSK_LEVEL_KEYS.map((key) => [
      key,
      mapByLevel[key] ? [mapByLevel[key]] : []
    ])
  );

const vocabBundleFiles = asBundle(vocabByLevel);

const writingBundleFiles = [
  { label: 'Écriture HSK 1-2', file: 'hsk_cards/fiche_hsk12_writing.pdf' },
  { label: 'Écriture HSK 3', file: 'hsk_cards/fiche_hsk3_writing.pdf' },
  { label: 'Écriture HSK 4', file: 'hsk_cards/fiche_hsk4_writing.pdf' },
  { label: 'Écriture HSK 5', file: 'hsk_cards/fiche_hsk5_writing.pdf' },
  { label: 'Écriture HSK 6', file: 'hsk_cards/fiche_hsk6_writing.pdf' },
  { label: 'Écriture HSK 7-9', file: 'hsk_cards/fiche_hsk79_writing.pdf' }
];

export const DOWNLOADS = {
  'manuels-v1-v2': {
    files: [{ label: 'Pack Manuels XiaoLearn Vol.1 & Vol.2', file: 'manuels/manuels-v1-v2.zip' }]
  },
  'vocabulary-all-hsk': {
    files: vocabBundleFiles
  },
  'vocabulary-one-hsk': {
    files: [],
    byLevel: asByLevel(vocabByLevel)
  },
  'writing-all-hsk': {
    files: writingBundleFiles
  },
  'writing-one-hsk': {
    files: [],
    byLevel: asByLevel(writingByLevel)
  },
  'vocabulary-writing-all-hsk': {
    files: [...vocabBundleFiles, ...writingBundleFiles]
  },
  'vocabulary-writing-one-hsk': {
    files: [],
    byLevel: Object.fromEntries(
      HSK_LEVEL_KEYS.map((levelKey) => [
        levelKey,
        [vocabByLevel[levelKey], writingByLevel[levelKey]].filter(Boolean)
      ])
    )
  },
  anki: {
    files: [{ label: 'Deck Anki XiaoLearn', file: 'anki.apkg' }]
  }
};

const getLevelKey = (level) => {
  if (!level) return null;
  const normalized = String(level).trim().toLowerCase().replace(/\s+/g, '');
  if (!normalized.startsWith('hsk')) return null;
  if (normalized.includes('7-9') || normalized.includes('79')) return 'hsk79';
  const match = normalized.match(/^hsk([1-6])$/);
  if (!match) return null;
  return `hsk${match[1]}`;
};

const resolveDownloadEntries = (downloadKey, level) => {
  const definition = DOWNLOADS[downloadKey];
  if (!definition) return [];
  const levelKey = getLevelKey(level);
  if (levelKey && Array.isArray(definition.byLevel?.[levelKey])) {
    return definition.byLevel[levelKey];
  }
  return Array.isArray(definition.files) ? definition.files : [];
};

export const resolveDownloadsForPurchase = ({ downloadKey, level, baseUrl }) => {
  const entries = resolveDownloadEntries(downloadKey, level);
  return entries
    .map((entry) => ({
      label: entry.label,
      url: buildDownloadUrl(baseUrl, entry.file)
    }))
    .filter((entry) => entry.label && entry.url);
};
