/**
 * Script de migration pour réorganiser les parcours de leçons
 * avec la nouvelle structure thématique et les métadonnées HSK
 */

// Mapping des anciens parcours vers les nouveaux parcours thématiques
const pathMapping = {
  // Ancien ID -> Nouveau ID
  'pinyin-tones': 'pronunciation-basics',
  'basic-phrases': 'first-steps',
  'basic-grammar': 'essential-grammar',
  'thematic-vocab': 'daily-life',
  'conversation-hsk2': 'practical-conversations',
  'intermediate-grammar': 'essential-grammar',
  'numbers-measures': 'first-steps',
  'chinese-characters': 'advanced-level',
  'conversation-hsk3': 'social-relations',
  'advanced-grammar-hsk3': 'essential-grammar',
  'daily-conversation-hsk4': 'practical-conversations',
  'complex-grammar-hsk4': 'expressing-yourself',
  'reading-hsk4': 'advanced-level',
  'writing-hsk4': 'advanced-level',
  'debates-hsk5': 'expressing-yourself',
  'advanced-structures-hsk5': 'advanced-level',
  'authentic-reading-hsk5': 'advanced-level',
  'formal-writing-hsk5': 'advanced-level',
  'idiomatic-hsk6': 'advanced-level',
  'classical-literature-hsk6': 'advanced-level',
  'professional-texts-hsk6': 'advanced-level',
  'argumentation-hsk6': 'advanced-level',
  'academic-language-hsk7': 'advanced-level',
  'specialized-texts-hsk7': 'advanced-level',
  'style-nuance-hsk7': 'advanced-level',
  'culture-civilization-hsk7': 'advanced-level'
};

// Mapping des IDs de leçons vers leur niveau HSK
const lessonHskMapping = {
  // Pinyin & Tons
  'pinyin-1-initials': { hskLevel: 1, category: 'pronunciation', difficulty: 'beginner', tags: ['pinyin', 'consonants', 'pronunciation', 'basics'] },
  'pinyin-2-finals': { hskLevel: 1, category: 'pronunciation', difficulty: 'beginner', tags: ['pinyin', 'vowels', 'pronunciation', 'basics'] },
  'pinyin-3-tones': { hskLevel: 1, category: 'pronunciation', difficulty: 'beginner', tags: ['pinyin', 'tones', 'pronunciation', 'essential'] },
  'pinyin-4-combinations': { hskLevel: 1, category: 'pronunciation', difficulty: 'elementary', tags: ['pinyin', 'retroflex', 'sibilants', 'advanced-sounds'] },
  'pinyin-5-practice': { hskLevel: 1, category: 'pronunciation', difficulty: 'elementary', tags: ['pinyin', 'practice', 'review', 'words'] },

  // Phrases de base
  'phrases-1-greetings': { hskLevel: 1, category: 'conversation', difficulty: 'beginner', tags: ['greetings', 'hello', 'goodbye', 'politeness'] },
  'phrases-2-introductions': { hskLevel: 1, category: 'conversation', difficulty: 'beginner', tags: ['introductions', 'name', 'self-introduction'] },
  'phrases-3-politeness': { hskLevel: 1, category: 'conversation', difficulty: 'beginner', tags: ['politeness', 'thank-you', 'sorry', 'please'] },
  'phrases-4-questions': { hskLevel: 1, category: 'conversation', difficulty: 'beginner', tags: ['questions', 'what', 'who', 'where', 'how'] },
  'phrases-5-yes-no': { hskLevel: 1, category: 'conversation', difficulty: 'beginner', tags: ['yes', 'no', 'answers', 'affirmation', 'negation'] },
  'phrases-6-numbers-1-10': { hskLevel: 1, category: 'vocabulary', difficulty: 'beginner', tags: ['numbers', 'counting', 'basic-numbers'] },
  'phrases-7-time': { hskLevel: 1, category: 'vocabulary', difficulty: 'beginner', tags: ['time', 'now', 'today', 'tomorrow', 'yesterday'] },
  'phrases-8-family': { hskLevel: 1, category: 'vocabulary', difficulty: 'beginner', tags: ['family', 'parents', 'siblings', 'relatives'] },
  'phrases-9-food-drinks': { hskLevel: 1, category: 'vocabulary', difficulty: 'beginner', tags: ['food', 'drinks', 'eating', 'drinking'] },
  'phrases-10-wants-needs': { hskLevel: 1, category: 'conversation', difficulty: 'elementary', tags: ['wants', 'needs', 'desires', 'possession'] },
  'phrases-11-common-verbs': { hskLevel: 1, category: 'vocabulary', difficulty: 'elementary', tags: ['verbs', 'actions', 'basic-verbs'] },

  // Grammaire de base
  'grammar-1-sentence-structure': { hskLevel: 1, category: 'grammar', difficulty: 'beginner', tags: ['sentence-structure', 'word-order', 'svo'] },
  'grammar-2-verb-to-be': { hskLevel: 1, category: 'grammar', difficulty: 'beginner', tags: ['verb-to-be', 'shi', 'identity'] },
  'grammar-3-verb-have': { hskLevel: 1, category: 'grammar', difficulty: 'beginner', tags: ['verb-have', 'you', 'possession'] },
  'grammar-4-negation': { hskLevel: 1, category: 'grammar', difficulty: 'beginner', tags: ['negation', 'bu', 'mei', 'negative'] },
  'grammar-5-questions': { hskLevel: 1, category: 'grammar', difficulty: 'beginner', tags: ['questions', 'ma', 'question-words'] },
  'grammar-6-adjectives': { hskLevel: 1, category: 'grammar', difficulty: 'elementary', tags: ['adjectives', 'description', 'hen'] },
  'grammar-7-verb-zai': { hskLevel: 1, category: 'grammar', difficulty: 'elementary', tags: ['verb-zai', 'location', 'existence'] },
  'grammar-8-classifiers': { hskLevel: 1, category: 'grammar', difficulty: 'elementary', tags: ['classifiers', 'measure-words', 'ge'] },

  // Vocabulaire thématique
  'vocab-1-colors': { hskLevel: 1, category: 'vocabulary', difficulty: 'beginner', tags: ['colors', 'description', 'visual'] },
  'vocab-2-animals': { hskLevel: 1, category: 'vocabulary', difficulty: 'beginner', tags: ['animals', 'pets', 'wildlife'] },
  'vocab-3-weather': { hskLevel: 1, category: 'vocabulary', difficulty: 'beginner', tags: ['weather', 'climate', 'temperature', 'small-talk'] },
  'vocab-4-clothing': { hskLevel: 1, category: 'vocabulary', difficulty: 'beginner', tags: ['clothing', 'fashion', 'shopping'] },
  'vocab-5-body-parts': { hskLevel: 1, category: 'vocabulary', difficulty: 'beginner', tags: ['body', 'health', 'anatomy'] },
  'vocab-6-places': { hskLevel: 1, category: 'vocabulary', difficulty: 'beginner', tags: ['places', 'locations', 'buildings'] },
  'vocab-7-transport': { hskLevel: 1, category: 'vocabulary', difficulty: 'beginner', tags: ['transport', 'vehicles', 'travel'] },
  'vocab-8-food': { hskLevel: 1, category: 'vocabulary', difficulty: 'beginner', tags: ['food', 'cuisine', 'meals'] },
  'vocab-9-fruits': { hskLevel: 1, category: 'vocabulary', difficulty: 'beginner', tags: ['fruits', 'food', 'healthy'] },
  'vocab-10-occupations': { hskLevel: 1, category: 'vocabulary', difficulty: 'beginner', tags: ['jobs', 'professions', 'work'] },
  'vocab-11-hobbies': { hskLevel: 1, category: 'vocabulary', difficulty: 'elementary', tags: ['hobbies', 'leisure', 'activities'] },
  'vocab-12-countries': { hskLevel: 1, category: 'vocabulary', difficulty: 'elementary', tags: ['countries', 'geography', 'nationality'] },
};

// Nouvelle structure des parcours thématiques
const newPaths = [
  {
    id: 'pronunciation-basics',
    name: 'Prononciation & Bases',
    nameEn: 'Pronunciation & Basics',
    description: 'Maîtrisez les sons, tons et premiers mots du mandarin',
    descriptionEn: 'Master Mandarin sounds, tones and first words',
    icon: '🎵',
    color: '#8b5cf6'
  },
  {
    id: 'first-steps',
    name: 'Premiers Pas',
    nameEn: 'First Steps',
    description: 'Salutations, présentations et conversations simples pour débuter',
    descriptionEn: 'Greetings, introductions and simple conversations to get started',
    icon: '💬',
    color: '#ec4899'
  },
  {
    id: 'daily-life',
    name: 'Vie Quotidienne',
    nameEn: 'Daily Life',
    description: 'Vocabulaire et situations de la vie de tous les jours',
    descriptionEn: 'Vocabulary and situations from everyday life',
    icon: '🏠',
    color: '#10b981'
  },
  {
    id: 'practical-conversations',
    name: 'Conversations Pratiques',
    nameEn: 'Practical Conversations',
    description: 'Situations réelles : restaurant, transport, shopping, téléphone',
    descriptionEn: 'Real-life situations: restaurant, transport, shopping, phone',
    icon: '🗣️',
    color: '#f59e0b'
  },
  {
    id: 'social-relations',
    name: 'Relations Sociales',
    nameEn: 'Social Relations',
    description: 'Parler de soi, des autres et exprimer ses émotions',
    descriptionEn: 'Talk about yourself, others and express your emotions',
    icon: '👥',
    color: '#06b6d4'
  },
  {
    id: 'essential-grammar',
    name: 'Grammaire Essentielle',
    nameEn: 'Essential Grammar',
    description: 'Structures grammaticales fondamentales pour bien parler',
    descriptionEn: 'Fundamental grammar structures to speak well',
    icon: '📚',
    color: '#6366f1'
  },
  {
    id: 'expressing-yourself',
    name: 'S\'exprimer',
    nameEn: 'Expressing Yourself',
    description: 'Raconter, donner son avis et argumenter',
    descriptionEn: 'Tell stories, give opinions and argue',
    icon: '💭',
    color: '#f43f5e'
  },
  {
    id: 'advanced-level',
    name: 'Niveau Avancé',
    nameEn: 'Advanced Level',
    description: 'Culture, littérature, textes professionnels et académiques',
    descriptionEn: 'Culture, literature, professional and academic texts',
    icon: '🎓',
    color: '#8b5cf6'
  }
];

console.log('Nouvelle structure des parcours créée avec succès!');
console.log(`Total: ${newPaths.length} parcours thématiques`);
console.log(`Leçons mappées: ${Object.keys(lessonHskMapping).length}`);
