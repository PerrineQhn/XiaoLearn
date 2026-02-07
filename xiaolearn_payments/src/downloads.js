export const DOWNLOADS = {
  'manuels-v1-v2': {
    label: 'Pack Manuels XiaoLearn Vol.1 & Vol.2',
    file: 'manuels-v1-v2.zip'
  },
  'vocabulary-all-hsk': {
    label: 'Vocabulaire HSK - Pack complet',
    file: 'vocabulary-all-hsk.zip'
  },
  'vocabulary-one-hsk': {
    label: 'Vocabulaire HSK - Niveau au choix',
    file: 'vocabulary-one-hsk.pdf'
  },
  'writing-all-hsk': {
    label: 'Écriture HSK - Pack complet',
    file: 'writing-all-hsk.zip'
  },
  'writing-one-hsk': {
    label: 'Écriture HSK - Niveau au choix',
    file: 'writing-one-hsk.pdf'
  },
  anki: {
    label: 'Deck Anki XiaoLearn',
    file: 'anki.apkg'
  }
};

export const buildDownloadUrl = (baseUrl, file) => {
  if (!baseUrl || !file) return null;
  const trimmed = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  return `${trimmed}/${file}`;
};
