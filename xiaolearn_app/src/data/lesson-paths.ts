import type { LessonPath } from '../types/lesson-structure';

export const lessonPaths: LessonPath[] = [
  // ============================================
  // PATH 1: PRONONCIATION & BASES
  // ============================================
  {
    id: 'pronunciation-basics',
    name: 'Prononciation & Bases',
    nameEn: 'Pronunciation & Basics',
    description: 'Maîtrise la prononciation et les tons du mandarin',
    descriptionEn: 'Master Mandarin pronunciation and tones',
    icon: '🎵',
    color: '#8b5cf6',
    lessons: [
{
        id: 'pinyin-1-initials',
        title: 'Consonnes initiales',
        titleEn: 'Initial Consonants',
        duration: 15,
        completed: false,
        locked: false,
        hskLevel: 1,
        category: 'pronunciation',
        difficulty: 'beginner',
        tags: ["pronunciation", "pinyin", "tones"],
        introduction: {
          title: 'Bienvenue dans votre première leçon de prononciation !',
          titleEn: 'Welcome to your first pronunciation lesson!',
          content: 'Dans cette leçon, vous allez apprendre les consonnes initiales du pinyin. Ce sont les sons qui commencent les syllabes en mandarin.',
          contentEn: 'In this lesson, you will learn the initial consonants of pinyin. These are the sounds that begin syllables in Mandarin.',
          objectives: [
            'Maîtriser les consonnes b, p, m, f',
            'Différencier d, t, n, l',
            'Prononcer correctement chaque son',
            'Reconnaître les sons à l\'écoute'
          ],
          objectivesEn: [
            'Master consonants b, p, m, f',
            'Differentiate d, t, n, l',
            'Pronounce each sound correctly',
            'Recognize sounds by listening'
          ]
        },
        flashcards: [
          'py-initial-b',
          'py-initial-p',
          'py-initial-m',
          'py-initial-f',
          'py-initial-d',
          'py-initial-t',
          'py-initial-n',
          'py-initial-l',
          'py-initial-g',
          'py-initial-k',
          'py-initial-h',
          'py-initial-z',
          'py-initial-c',
          'py-initial-s',
          'py-initial-zh',
          'py-initial-ch',
          'py-initial-sh',
          'py-initial-r',
          'py-initial-j',
          'py-initial-q',
          'py-initial-x'
        ],
        quizQuestions: 6
      },
{
        id: 'pinyin-2-finals',
        title: 'Voyelles finales',
        titleEn: 'Final Vowels',
        duration: 15,
        completed: false,
        locked: false,
        hskLevel: 1,
        category: 'pronunciation',
        difficulty: 'beginner',
        tags: ["pronunciation", "pinyin", "tones"],
        introduction: {
          title: 'Les voyelles du mandarin',
          titleEn: 'Mandarin Vowels',
          content: 'Apprenez les voyelles finales qui complètent les syllabes. La prononciation correcte des voyelles est essentielle pour être compris.',
          contentEn: 'Learn the final vowels that complete syllables. Correct vowel pronunciation is essential to be understood.',
          objectives: [
            'Prononcer a, o, e, i, u, ü',
            'Comprendre les différences subtiles',
            'Combiner avec les consonnes',
            'Éviter les erreurs courantes'
          ],
          objectivesEn: [
            'Pronounce a, o, e, i, u, ü',
            'Understand subtle differences',
            'Combine with consonants',
            'Avoid common mistakes'
          ]
        },
        flashcards: ['py-final-a', 'py-final-o', 'py-final-e', 'py-final-i', 'py-final-u', 'py-final-umlaut'],
        quizQuestions: 5
      },
{
        id: 'pinyin-3-tones',
        title: 'Les 4 tons',
        titleEn: 'The 4 Tones',
        duration: 20,
        completed: false,
        locked: false,
        hskLevel: 1,
        category: 'pronunciation',
        difficulty: 'beginner',
        tags: ["pronunciation", "pinyin", "tones"],
        introduction: {
          title: 'Le système tonal du mandarin',
          titleEn: 'The Mandarin Tonal System',
          content: 'Le mandarin utilise 4 tons qui changent complètement le sens des mots. Maîtriser les tons est crucial !',
          contentEn: 'Mandarin uses 4 tones that completely change word meanings. Mastering tones is crucial!',
          objectives: [
            'Reconnaître les 4 tons',
            'Prononcer chaque ton correctement',
            'Distinguer les tons à l\'écoute',
            'Utiliser mā, má, mǎ, mà'
          ],
          objectivesEn: [
            'Recognize the 4 tones',
            'Pronounce each tone correctly',
            'Distinguish tones by listening',
            'Use mā, má, mǎ, mà'
          ]
        },
        flashcards: ['py-tone-1', 'py-tone-2', 'py-tone-3', 'py-tone-4'],
        quizQuestions: 8
      },
{
        id: 'pinyin-4-combinations',
        title: 'Combinaisons complexes',
        titleEn: 'Complex Combinations',
        duration: 20,
        completed: false,
        locked: false,
        hskLevel: 1,
        category: 'pronunciation',
        difficulty: 'beginner',
        tags: ["pronunciation", "pinyin", "tones"],
        introduction: {
          title: 'Sons rétroflexes et sifflants',
          titleEn: 'Retroflex and Sibilant Sounds',
          content: 'Découvrez les sons plus complexes du mandarin : zh, ch, sh, r, z, c, s. Ces sons n\'existent pas en français !',
          contentEn: 'Discover the more complex Mandarin sounds: zh, ch, sh, r, z, c, s. These sounds don\'t exist in French!',
          objectives: [
            'Maîtriser zh, ch, sh, r',
            'Différencier z, c, s',
            'Position de la langue',
            'Exercices de prononciation'
          ],
          objectivesEn: [
            'Master zh, ch, sh, r',
            'Differentiate z, c, s',
            'Tongue position',
            'Pronunciation exercises'
          ]
        },
        flashcards: ['py-combo-zh', 'py-combo-ch', 'py-combo-sh', 'py-combo-r', 'py-combo-z', 'py-combo-c', 'py-combo-s'],
        quizQuestions: 7
      },
{
        id: 'pinyin-5-practice',
        title: 'Pratique complète',
        titleEn: 'Complete Practice',
        duration: 25,
        completed: false,
        locked: false,
        hskLevel: 1,
        category: 'pronunciation',
        difficulty: 'beginner',
        tags: ["pronunciation", "pinyin", "tones"],
        introduction: {
          title: 'Révision complète du pinyin',
          titleEn: 'Complete Pinyin Review',
          content: 'Combinez tout ce que vous avez appris : consonnes, voyelles et tons ensemble pour former des mots réels.',
          contentEn: 'Combine everything you\'ve learned: consonants, vowels and tones together to form real words.',
          objectives: [
            'Lire des mots complets en pinyin',
            'Appliquer les règles de prononciation',
            'Reconnaître les syllabes complexes',
            'Pratiquer avec des mots usuels'
          ],
          objectivesEn: [
            'Read complete words in pinyin',
            'Apply pronunciation rules',
            'Recognize complex syllables',
            'Practice with common words'
          ]
        },
        flashcards: ['妈', '爸', '朋友', '老师', '茶', '喝', '吃', '中国'],
        quizQuestions: 10
      }
    ]
  },

  // ============================================
  // PATH 2: PREMIERS PAS
  // ============================================
  {
    id: 'first-steps',
    name: 'Premiers Pas',
    nameEn: 'First Steps',
    description: 'Expressions essentielles pour débuter',
    descriptionEn: 'Essential expressions to get started',
    icon: '💬',
    color: '#ec4899',
    lessons: [
{
        id: 'phrases-1-greetings',
        title: 'Salutations',
        titleEn: 'Greetings',
        duration: 15,
        completed: false,
        locked: false,
        hskLevel: 1,
        category: 'conversation',
        difficulty: 'beginner',
        tags: ["politeness", "greetings"],
        introduction: {
          title: 'Dire bonjour en chinois',
          titleEn: 'Saying Hello in Chinese',
          content: 'Apprenez les salutations de base pour commencer vos conversations en chinois.',
          contentEn: 'Learn basic greetings to start your conversations in Chinese.',
          objectives: [
            'Dire 你好 (nǐ hǎo)',
            'Saluer selon le moment',
            'Dire au revoir',
            'Utiliser les formules de politesse'
          ],
          objectivesEn: [
            'Say 你好 (nǐ hǎo)',
            'Greet according to time',
            'Say goodbye',
            'Use polite formulas'
          ]
        },
        flashcards: ['你好', '早', '晚上好', '再见', '您', '谢谢'],
        quizQuestions: 6
      },
{
        id: 'phrases-2-introductions',
        title: 'Se présenter',
        titleEn: 'Introductions',
        duration: 15,
        completed: false,
        locked: false,
        hskLevel: 1,
        category: 'conversation',
        difficulty: 'beginner',
        tags: ["introductions"],
        introduction: {
          title: 'Présentez-vous',
          titleEn: 'Introduce Yourself',
          content: 'Apprenez à dire qui vous êtes, comment vous vous appelez et d\'où vous venez.',
          contentEn: 'Learn to say who you are, what your name is and where you\'re from.',
          objectives: [
            'Dire votre nom',
            'Demander le nom de quelqu\'un',
            'Utiliser 我 (wǒ) et 你 (nǐ)',
            'Se présenter complètement'
          ],
          objectivesEn: [
            'Say your name',
            'Ask someone\'s name',
            'Use 我 (wǒ) and 你 (nǐ)',
            'Introduce yourself completely'
          ]
        },
        flashcards: ['你好', '我', '你', '叫', '名字', '是'],
        quizQuestions: 6
      },
{
        id: 'phrases-3-politeness',
        title: 'Politesse',
        titleEn: 'Politeness',
        duration: 15,
        completed: false,
        locked: false,
        hskLevel: 1,
        category: 'conversation',
        difficulty: 'beginner',
        tags: ["politeness", "greetings"],
        introduction: {
          title: 'Être poli en chinois',
          titleEn: 'Being Polite in Chinese',
          content: 'Les expressions de politesse sont essentielles dans la culture chinoise.',
          contentEn: 'Polite expressions are essential in Chinese culture.',
          objectives: [
            'Dire merci',
            'Répondre à un remerciement',
            'S\'excuser',
            'Accepter des excuses'
          ],
          objectivesEn: [
            'Say thank you',
            'Respond to thanks',
            'Apologize',
            'Accept apologies'
          ]
        },
        flashcards: ['谢谢', '对不起', '请', '不客气', '没关系', '麻烦'],
        quizQuestions: 6
      },
{
        id: 'phrases-4-questions',
        title: 'Questions simples',
        titleEn: 'Simple Questions',
        duration: 15,
        completed: false,
        locked: false,
        hskLevel: 1,
        category: 'conversation',
        difficulty: 'beginner',
        tags: ["questions"],
        introduction: {
          title: 'Poser des questions',
          titleEn: 'Asking Questions',
          content: 'Maîtrisez les mots interrogatifs de base pour obtenir des informations.',
          contentEn: 'Master basic question words to get information.',
          objectives: [
            'Utiliser 什么 (quoi)',
            'Demander où avec 哪里',
            'Demander qui avec 谁',
            'Former des questions simples'
          ],
          objectivesEn: [
            'Use 什么 (what)',
            'Ask where with 哪里',
            'Ask who with 谁',
            'Form simple questions'
          ]
        },
        flashcards: ['什么', '谁', '哪', '怎么', '几', '多少', '吗', '哪儿'],
        quizQuestions: 8
      },
{
        id: 'phrases-5-yes-no',
        title: 'Oui et non',
        titleEn: 'Yes and No',
        duration: 10,
        completed: false,
        locked: false,
        hskLevel: 1,
        category: 'conversation',
        difficulty: 'beginner',
        tags: ["general"],
        introduction: {
          title: 'Répondre aux questions',
          titleEn: 'Answering Questions',
          content: 'Le chinois n\'a pas vraiment de mot pour "oui" et "non". Découvrez comment répondre aux questions.',
          contentEn: 'Chinese doesn\'t really have words for "yes" and "no". Discover how to answer questions.',
          objectives: [
            'Utiliser 是 et 不是',
            'Confirmer avec 对',
            'Nier avec 不',
            'Répondre naturellement'
          ],
          objectivesEn: [
            'Use 是 and 不是',
            'Confirm with 对',
            'Negate with 不',
            'Answer naturally'
          ]
        },
        flashcards: ['是', '不是', '对', '好', '可以', '行'],
        quizQuestions: 5
      },
{
        id: 'phrases-6-numbers-1-10',
        title: 'Nombres 1-10',
        titleEn: 'Numbers 1-10',
        duration: 15,
        completed: false,
        locked: false,
        hskLevel: 2,
        category: 'conversation',
        difficulty: 'elementary',
        tags: ["numbers"],
        introduction: {
          title: 'Compter en chinois',
          titleEn: 'Counting in Chinese',
          content: 'Les nombres chinois sont logiques et faciles à apprendre. Commencez par les dix premiers !',
          contentEn: 'Chinese numbers are logical and easy to learn. Start with the first ten!',
          objectives: [
            'Compter de 1 à 10',
            'Prononcer les tons correctement',
            'Reconnaître les caractères',
            'Utiliser dans des phrases'
          ],
          objectivesEn: [
            'Count from 1 to 10',
            'Pronounce tones correctly',
            'Recognize characters',
            'Use in sentences'
          ]
        },
        flashcards: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'],
        quizQuestions: 10
      },
{
        id: 'phrases-7-time',
        title: 'Heure et temps',
        titleEn: 'Time',
        duration: 15,
        completed: false,
        locked: false,
        hskLevel: 1,
        category: 'conversation',
        difficulty: 'beginner',
        tags: ["time"],
        introduction: {
          title: 'Parler du temps',
          titleEn: 'Talking About Time',
          content: 'Exprimez le moment : maintenant, aujourd\'hui, demain, hier.',
          contentEn: 'Express when: now, today, tomorrow, yesterday.',
          objectives: [
            'Dire 现在 (maintenant)',
            'Parler des jours',
            'Utiliser 今天, 明天, 昨天',
            'Demander l\'heure'
          ],
          objectivesEn: [
            'Say 现在 (now)',
            'Talk about days',
            'Use 今天, 明天, 昨天',
            'Ask the time'
          ]
        },
        flashcards: [],
        quizQuestions: 8
      },
{
        id: 'phrases-8-family',
        title: 'Famille proche',
        titleEn: 'Close Family',
        duration: 15,
        completed: false,
        locked: false,
        hskLevel: 1,
        category: 'conversation',
        difficulty: 'beginner',
        tags: ["family"],
        introduction: {
          title: 'Votre famille',
          titleEn: 'Your Family',
          content: 'Apprenez à parler de vos parents et frères et sœurs.',
          contentEn: 'Learn to talk about your parents and siblings.',
          objectives: [
            'Dire papa et maman',
            'Parler de vos frères et sœurs',
            'Différencier aîné et cadet',
            'Présenter sa famille'
          ],
          objectivesEn: [
            'Say dad and mom',
            'Talk about siblings',
            'Differentiate older and younger',
            'Introduce your family'
          ]
        },
        flashcards: [],
        quizQuestions: 8
      },
{
        id: 'phrases-9-food-drinks',
        title: 'Nourriture et boissons',
        titleEn: 'Food and Drinks',
        duration: 15,
        completed: false,
        locked: false,
        hskLevel: 1,
        category: 'conversation',
        difficulty: 'beginner',
        tags: ["food", "restaurant"],
        introduction: {
          title: 'Manger et boire',
          titleEn: 'Eating and Drinking',
          content: 'Vocabulaire essentiel pour les repas et boissons du quotidien.',
          contentEn: 'Essential vocabulary for daily meals and drinks.',
          objectives: [
            'Dire "manger" et "boire"',
            'Commander de l\'eau, du thé',
            'Parler du riz',
            'Expressions au restaurant'
          ],
          objectivesEn: [
            'Say "to eat" and "to drink"',
            'Order water, tea',
            'Talk about rice',
            'Restaurant expressions'
          ]
        },
        flashcards: [],
        quizQuestions: 7
      },
{
        id: 'phrases-10-wants-needs',
        title: 'Vouloir et avoir besoin',
        titleEn: 'Wants and Needs',
        duration: 15,
        completed: false,
        locked: false,
        hskLevel: 1,
        category: 'conversation',
        difficulty: 'beginner',
        tags: ["general"],
        introduction: {
          title: 'Exprimer vos besoins',
          titleEn: 'Express Your Needs',
          content: 'Dites ce que vous voulez et ce que vous avez avec 要, 想, 有.',
          contentEn: 'Say what you want and what you have with 要, 想, 有.',
          objectives: [
            'Utiliser 要 (vouloir)',
            'Dire 想 (penser, vouloir)',
            'Avoir avec 有',
            'Nier avec 没有'
          ],
          objectivesEn: [
            'Use 要 (to want)',
            'Say 想 (to think, want)',
            'Have with 有',
            'Negate with 没有'
          ]
        },
        flashcards: [],
        quizQuestions: 8
      },
{
        id: 'phrases-11-common-verbs',
        title: 'Verbes courants',
        titleEn: 'Common Verbs',
        duration: 15,
        completed: false,
        locked: false,
        hskLevel: 1,
        category: 'conversation',
        difficulty: 'beginner',
        tags: ["general"],
        introduction: {
          title: 'Actions de base',
          titleEn: 'Basic Actions',
          content: 'Les verbes les plus utilisés au quotidien : aller, venir, voir, parler, écouter.',
          contentEn: 'The most commonly used daily verbs: to go, come, see, speak, listen.',
          objectives: [
            'Dire "aller" et "venir"',
            'Utiliser "voir" et "regarder"',
            'Parler et écouter',
            'Former des phrases simples'
          ],
          objectivesEn: [
            'Say "to go" and "to come"',
            'Use "to see" and "to look"',
            'Speak and listen',
            'Form simple sentences'
          ]
        },
        flashcards: [],
        quizQuestions: 8
      },
{
        id: 'phrases-12-daily-actions',
        title: 'Actions quotidiennes',
        titleEn: 'Daily Actions',
        duration: 15,
        completed: false,
        locked: false,
        hskLevel: 1,
        category: 'conversation',
        difficulty: 'beginner',
        tags: ["general"],
        introduction: {
          title: 'Votre routine',
          titleEn: 'Your Routine',
          content: 'Décrivez votre journée : se lever, dormir, travailler, étudier.',
          contentEn: 'Describe your day: wake up, sleep, work, study.',
          objectives: [
            'Dire "se lever"',
            'Parler de dormir',
            'Exprimer "travailler"',
            'Dire "étudier"'
          ],
          objectivesEn: [
            'Say "to get up"',
            'Talk about sleeping',
            'Express "to work"',
            'Say "to study"'
          ]
        },
        flashcards: [],
        quizQuestions: 6
      }
    ]
  },

  // ============================================
  // PATH 3: VIE QUOTIDIENNE
  // ============================================
  {
    id: 'daily-life',
    name: 'Vie Quotidienne',
    nameEn: 'Daily Life',
    description: 'Vocabulaire thématique du quotidien',
    descriptionEn: 'Daily thematic vocabulary',
    icon: '🏠',
    color: '#10b981',
    lessons: [
{
        id: 'vocab-1-colors',
        title: 'Couleurs',
        titleEn: 'Colors',
        duration: 15,
        completed: false,
        locked: false,
        hskLevel: 2,
        category: 'vocabulary',
        difficulty: 'elementary',
        tags: ["colors", "vocabulary"],
        introduction: {
          title: 'Les couleurs en chinois',
          titleEn: 'Colors in Chinese',
          content: 'Apprenez les couleurs de base pour décrire le monde qui vous entoure.',
          contentEn: 'Learn basic colors to describe the world around you.',
          objectives: [
            'Couleurs primaires',
            'Noir et blanc',
            'Décrire des objets',
            'Utiliser 色 (sè)'
          ],
          objectivesEn: [
            'Primary colors',
            'Black and white',
            'Describe objects',
            'Use 色 (sè)'
          ]
        },
        flashcards: ['红', '蓝', '黄', '绿', '黑', '白', '紫', '灰'],
        quizQuestions: 8
      },
{
        id: 'vocab-2-animals',
        title: 'Animaux',
        titleEn: 'Animals',
        duration: 15,
        completed: false,
        locked: false,
        hskLevel: 2,
        category: 'vocabulary',
        difficulty: 'elementary',
        tags: ["vocabulary", "animals"],
        introduction: {
          title: 'Animaux courants',
          titleEn: 'Common Animals',
          content: 'Découvrez le nom des animaux domestiques et familiers.',
          contentEn: 'Discover names of domestic and familiar animals.',
          objectives: [
            'Animaux domestiques',
            'Animaux de ferme',
            'Parler de vos animaux',
            'Décrire les animaux'
          ],
          objectivesEn: [
            'Domestic animals',
            'Farm animals',
            'Talk about your pets',
            'Describe animals'
          ]
        },
        flashcards: ['猫', '狗', '鸟', '鱼', '马', '牛'],
        quizQuestions: 6
      },
{
        id: 'vocab-3-weather',
        title: 'Météo',
        titleEn: 'Weather',
        duration: 15,
        completed: false,
        locked: false,
        hskLevel: 2,
        category: 'vocabulary',
        difficulty: 'elementary',
        tags: ["weather", "vocabulary"],
        introduction: {
          title: 'Parler du temps qu\'il fait',
          titleEn: 'Talking About the Weather',
          content: 'Vocabulaire essentiel pour décrire la météo et les températures.',
          contentEn: 'Essential vocabulary to describe weather and temperatures.',
          objectives: [
            'Dire "il fait chaud/froid"',
            'Parler de la pluie',
            'Décrire le temps',
            'Small talk météo'
          ],
          objectivesEn: [
            'Say "it\'s hot/cold"',
            'Talk about rain',
            'Describe weather',
            'Weather small talk'
          ]
        },
        flashcards: ['天气', '晴', '雨', '雪', '冷', '热', '风', '云'],
        quizQuestions: 6
      },
{
        id: 'vocab-4-clothing',
        title: 'Vêtements',
        titleEn: 'Clothing',
        duration: 15,
        completed: false,
        locked: false,
        hskLevel: 2,
        category: 'vocabulary',
        difficulty: 'elementary',
        tags: ["vocabulary", "clothing"],
        introduction: {
          title: 'S\'habiller',
          titleEn: 'Getting Dressed',
          content: 'Apprenez les noms des vêtements et accessoires de base.',
          contentEn: 'Learn names of basic clothing and accessories.',
          objectives: [
            'Vêtements du quotidien',
            'Chaussures et accessoires',
            'Dire ce que vous portez',
            'Faire du shopping'
          ],
          objectivesEn: [
            'Daily clothing',
            'Shoes and accessories',
            'Say what you wear',
            'Go shopping'
          ]
        },
        flashcards: ['衣服', '裤子', '裙子', '鞋', '帽子', '外套'],
        quizQuestions: 6
      },
{
        id: 'vocab-5-body-parts',
        title: 'Corps humain',
        titleEn: 'Body Parts',
        duration: 15,
        completed: false,
        locked: false,
        hskLevel: 2,
        category: 'vocabulary',
        difficulty: 'elementary',
        tags: ["body", "vocabulary"],
        introduction: {
          title: 'Votre corps',
          titleEn: 'Your Body',
          content: 'Les parties du corps les plus importantes à connaître.',
          contentEn: 'The most important body parts to know.',
          objectives: [
            'Tête et visage',
            'Membres',
            'Décrire des douleurs',
            'Chez le médecin'
          ],
          objectivesEn: [
            'Head and face',
            'Limbs',
            'Describe pain',
            'At the doctor'
          ]
        },
        flashcards: ['头', '眼睛', '耳朵', '鼻子', '嘴', '手', '脚', '腿'],
        quizQuestions: 8
      },
{
        id: 'vocab-6-places',
        title: 'Lieux',
        titleEn: 'Places',
        duration: 15,
        completed: false,
        locked: false,
        hskLevel: 2,
        category: 'vocabulary',
        difficulty: 'elementary',
        tags: ["places", "vocabulary"],
        introduction: {
          title: 'Lieux du quotidien',
          titleEn: 'Daily Places',
          content: 'Les endroits que vous visitez régulièrement.',
          contentEn: 'Places you visit regularly.',
          objectives: [
            'Maison, école, hôpital',
            'Restaurant et magasin',
            'Dire où vous allez',
            'Demander le chemin'
          ],
          objectivesEn: [
            'Home, school, hospital',
            'Restaurant and shop',
            'Say where you go',
            'Ask for directions'
          ]
        },
        flashcards: ['学校', '医院', '商店', '家', '公园', '饭店', '机场', '车站'],
        quizQuestions: 7
      },
{
        id: 'vocab-7-transport',
        title: 'Transports',
        titleEn: 'Transportation',
        duration: 15,
        completed: false,
        locked: false,
        hskLevel: 2,
        category: 'vocabulary',
        difficulty: 'elementary',
        tags: ["transport", "vocabulary"],
        introduction: {
          title: 'Moyens de transport',
          titleEn: 'Means of Transportation',
          content: 'Comment vous déplacez-vous ? Voiture, avion, train, taxi...',
          contentEn: 'How do you get around? Car, plane, train, taxi...',
          objectives: [
            'Véhicules courants',
            'Dire comment vous voyagez',
            'Prendre le taxi',
            'Transport public'
          ],
          objectivesEn: [
            'Common vehicles',
            'Say how you travel',
            'Take a taxi',
            'Public transport'
          ]
        },
        flashcards: ['车', '火车', '飞机', '出租车', '自行车', '地铁', '公交车', '船'],
        quizQuestions: 6
      },
{
        id: 'vocab-8-food',
        title: 'Aliments',
        titleEn: 'Food',
        duration: 15,
        completed: false,
        locked: false,
        hskLevel: 2,
        category: 'vocabulary',
        difficulty: 'elementary',
        tags: ["food", "restaurant", "vocabulary"],
        introduction: {
          title: 'Nourriture de base',
          titleEn: 'Basic Food',
          content: 'Les aliments de base de la cuisine chinoise et internationale.',
          contentEn: 'Basic foods from Chinese and international cuisine.',
          objectives: [
            'Riz et nouilles',
            'Légumes et viande',
            'Fruits',
            'Commander au restaurant'
          ],
          objectivesEn: [
            'Rice and noodles',
            'Vegetables and meat',
            'Fruits',
            'Order at restaurant'
          ]
        },
        flashcards: ['米饭', '面条', '饺子', '包子', '鸡蛋', '肉', '鱼', '蔬菜'],
        quizQuestions: 7
      },
{
        id: 'vocab-9-fruits',
        title: 'Fruits',
        titleEn: 'Fruits',
        duration: 15,
        completed: false,
        locked: false,
        hskLevel: 2,
        category: 'vocabulary',
        difficulty: 'elementary',
        tags: ["fruits", "vocabulary"],
        introduction: {
          title: 'Fruits populaires',
          titleEn: 'Popular Fruits',
          content: 'Les fruits les plus courants en Chine et ailleurs.',
          contentEn: 'The most common fruits in China and elsewhere.',
          objectives: [
            'Pomme, banane, orange',
            'Fruits tropicaux',
            'Acheter des fruits',
            'Exprimer ses préférences'
          ],
          objectivesEn: [
            'Apple, banana, orange',
            'Tropical fruits',
            'Buy fruits',
            'Express preferences'
          ]
        },
        flashcards: ['苹果', '香蕉', '橙子', '葡萄', '西瓜', '草莓'],
        quizQuestions: 6
      },
{
        id: 'vocab-13-rooms',
        title: 'Pièces de la maison',
        titleEn: 'Rooms',
        duration: 15,
        completed: false,
        locked: false,
        hskLevel: 2,
        category: 'vocabulary',
        difficulty: 'elementary',
        tags: ["home", "vocabulary"],
        introduction: {
          title: 'À la maison',
          titleEn: 'At Home',
          content: 'Les différentes pièces de votre maison ou appartement.',
          contentEn: 'The different rooms in your house or apartment.',
          objectives: [
            'Cuisine, salle de bain',
            'Chambre, salon',
            'Décrire votre maison',
            'Donner une visite'
          ],
          objectivesEn: [
            'Kitchen, bathroom',
            'Bedroom, living room',
            'Describe your home',
            'Give a tour'
          ]
        },
        flashcards: ['客厅', '卧室', '厨房', '卫生间', '房间', '阳台'],
        quizQuestions: 6
      },
{
        id: 'vocab-14-electronics',
        title: 'Électronique',
        titleEn: 'Electronics',
        duration: 15,
        completed: false,
        locked: false,
        hskLevel: 2,
        category: 'vocabulary',
        difficulty: 'elementary',
        tags: ["vocabulary", "technology"],
        introduction: {
          title: 'Appareils électroniques',
          titleEn: 'Electronic Devices',
          content: 'Les appareils que vous utilisez tous les jours.',
          contentEn: 'Devices you use every day.',
          objectives: [
            'Ordinateur, téléphone',
            'Portable, télévision',
            'Parler de technologie',
            'Utilisation quotidienne'
          ],
          objectivesEn: [
            'Computer, phone',
            'Mobile, television',
            'Talk about technology',
            'Daily usage'
          ]
        },
        flashcards: ['电脑', '手机', '电视', '相机', '电话', '平板'],
        quizQuestions: 6
      },
{
        id: 'vocab-15-money-shopping',
        title: 'Argent et achats',
        titleEn: 'Money and Shopping',
        duration: 15,
        completed: false,
        locked: false,
        hskLevel: 2,
        category: 'vocabulary',
        difficulty: 'elementary',
        tags: ["shopping", "money", "vocabulary"],
        introduction: {
          title: 'Faire du shopping',
          titleEn: 'Going Shopping',
          content: 'Vocabulaire essentiel pour acheter et parler d\'argent.',
          contentEn: 'Essential vocabulary for buying and talking about money.',
          objectives: [
            'Acheter et vendre',
            'Cher et pas cher',
            'Négocier les prix',
            'Payer'
          ],
          objectivesEn: [
            'Buy and sell',
            'Expensive and cheap',
            'Negotiate prices',
            'Pay'
          ]
        },
        flashcards: ['钱', '块', '元', '便宜', '贵', '买', '卖', '价格'],
        quizQuestions: 7
      }
    ]
  },

  // ============================================
  // PATH 4: CONVERSATIONS PRATIQUES
  // ============================================
  {
    id: 'practical-conversations',
    name: 'Conversations Pratiques',
    nameEn: 'Practical Conversations',
    description: 'Dialogues et situations du quotidien',
    descriptionEn: 'Daily dialogues and situations',
    icon: '🗣️',
    color: '#f59e0b',
    lessons: [
{
        id: 'convo-1-restaurant',
        title: 'Au restaurant',
        titleEn: 'At the Restaurant',
        duration: 20,
        completed: false,
        locked: false,
        hskLevel: 2,
        category: 'conversation',
        difficulty: 'elementary',
        tags: ["conversation", "food", "restaurant"],
        introduction: {
          title: 'Commander au restaurant',
          titleEn: 'Ordering at a Restaurant',
          content: 'Apprenez à lire le menu, commander vos plats et payer l\'addition.',
          contentEn: 'Learn to read the menu, order your dishes and pay the bill.',
          objectives: [
            'Lire le menu',
            'Commander des plats',
            'Demander l\'addition',
            'Phrases de politesse'
          ],
          objectivesEn: [
            'Read the menu',
            'Order dishes',
            'Ask for the bill',
            'Polite phrases'
          ]
        },
        flashcards: ['菜单', '服务员', '好吃', '买单', '饭', '菜'],
        quizQuestions: 8
      },
{
        id: 'convo-2-shopping',
        title: 'Faire les courses',
        titleEn: 'Shopping',
        duration: 20,
        completed: false,
        locked: false,
        hskLevel: 2,
        category: 'conversation',
        difficulty: 'elementary',
        tags: ["shopping", "conversation", "money"],
        introduction: {
          title: 'Au magasin',
          titleEn: 'At the Store',
          content: 'Demandez les prix, cherchez des réductions et achetez ce dont vous avez besoin.',
          contentEn: 'Ask for prices, look for discounts and buy what you need.',
          objectives: [
            'Demander le prix',
            'Négocier',
            'Essayer des vêtements',
            'Payer'
          ],
          objectivesEn: [
            'Ask the price',
            'Negotiate',
            'Try on clothes',
            'Pay'
          ]
        },
        flashcards: ['买', '便宜', '贵', '钱', '这', '那'],
        quizQuestions: 8
      },
{
        id: 'convo-3-directions',
        title: 'Demander son chemin',
        titleEn: 'Asking Directions',
        duration: 20,
        completed: false,
        locked: false,
        hskLevel: 2,
        category: 'conversation',
        difficulty: 'elementary',
        tags: ["conversation", "directions"],
        introduction: {
          title: 'Trouver votre chemin',
          titleEn: 'Find Your Way',
          content: 'Demandez et donnez des directions : gauche, droite, tout droit, devant, derrière.',
          contentEn: 'Ask and give directions: left, right, straight, front, back.',
          objectives: [
            'Demander où est un lieu',
            'Comprendre les directions',
            'Gauche, droite',
            'Devant, derrière'
          ],
          objectivesEn: [
            'Ask where a place is',
            'Understand directions',
            'Left, right',
            'Front, back'
          ]
        },
        flashcards: ['左', '右', '前', '后', '旁边', '对面'],
        quizQuestions: 8
      },
{
        id: 'convo-5-phone-call',
        title: 'Téléphoner',
        titleEn: 'Phone Call',
        duration: 20,
        completed: false,
        locked: false,
        hskLevel: 2,
        category: 'conversation',
        difficulty: 'elementary',
        tags: ["conversation", "phone"],
        introduction: {
          title: 'Au téléphone',
          titleEn: 'On the Phone',
          content: 'Apprenez à répondre au téléphone, demander quelqu\'un et laisser un message.',
          contentEn: 'Learn to answer the phone, ask for someone and leave a message.',
          objectives: [
            'Dire "allô"',
            'Demander quelqu\'un',
            'Faire patienter',
            'Raccrocher poliment'
          ],
          objectivesEn: [
            'Say "hello"',
            'Ask for someone',
            'Make wait',
            'Hang up politely'
          ]
        },
        flashcards: ['电话', '打电话', '号码', '喂', '找'],
        quizQuestions: 6
      },
{
        id: 'convo-6-doctor',
        title: 'Chez le médecin',
        titleEn: 'At the Doctor',
        duration: 20,
        completed: false,
        locked: false,
        hskLevel: 2,
        category: 'conversation',
        difficulty: 'elementary',
        tags: ["conversation", "health"],
        introduction: {
          title: 'Décrire ses symptômes',
          titleEn: 'Describe Symptoms',
          content: 'Expliquez ce qui ne va pas, où vous avez mal et comprenez les conseils du médecin.',
          contentEn: 'Explain what\'s wrong, where it hurts and understand doctor\'s advice.',
          objectives: [
            'Dire "je suis malade"',
            'Exprimer la douleur',
            'Parler de médicaments',
            'Conseils de repos'
          ],
          objectivesEn: [
            'Say "I\'m sick"',
            'Express pain',
            'Talk about medicine',
            'Rest advice'
          ]
        },
        flashcards: ['医生', '病', '疼', '药', '医院', '感冒'],
        quizQuestions: 6
      },
{
        id: 'convo-7-weather-talk',
        title: 'Parler de la météo',
        titleEn: 'Talking About Weather',
        duration: 20,
        completed: false,
        locked: false,
        hskLevel: 2,
        category: 'conversation',
        difficulty: 'elementary',
        tags: ["conversation", "weather"],
        introduction: {
          title: 'Small talk météo',
          titleEn: 'Weather Small Talk',
          content: 'La météo est un sujet de conversation universel. Apprenez à en parler naturellement.',
          contentEn: 'Weather is a universal conversation topic. Learn to talk about it naturally.',
          objectives: [
            'Beau temps, nuageux',
            'Neige et vent',
            'Prévisions météo',
            'S\'adapter au temps'
          ],
          objectivesEn: [
            'Sunny, cloudy',
            'Snow and wind',
            'Weather forecast',
            'Adapt to weather'
          ]
        },
        flashcards: ['天气', '晴', '雨', '冷', '热', '怎么样'],
        quizQuestions: 6
      },
{
        id: 'convo-8-complaints',
        title: 'Exprimer un problème',
        titleEn: 'Expressing Problems',
        duration: 20,
        completed: false,
        locked: false,
        hskLevel: 2,
        category: 'conversation',
        difficulty: 'elementary',
        tags: ["conversation", "problems"],
        introduction: {
          title: 'Gérer les problèmes',
          titleEn: 'Handle Problems',
          content: 'Exprimez poliment un problème, demandez de l\'aide et trouvez des solutions.',
          contentEn: 'Politely express a problem, ask for help and find solutions.',
          objectives: [
            'Dire "trop..."',
            'Exprimer un problème',
            'Demander de l\'aide',
            'Trouver une solution'
          ],
          objectivesEn: [
            'Say "too..."',
            'Express a problem',
            'Ask for help',
            'Find a solution'
          ]
        },
        flashcards: ['问题', '不行', '修理', '换', '坏'],
        quizQuestions: 6
      },
{
        id: 'numbers-1-large',
        title: 'Grands nombres',
        titleEn: 'Large Numbers',
        duration: 15,
        completed: false,
        locked: false,
        hskLevel: 2,
        category: 'vocabulary',
        difficulty: 'elementary',
        tags: ["numbers"],
        introduction: {
          title: 'Compter au-delà de 10',
          titleEn: 'Count Beyond 10',
          content: 'Apprenez les dizaines, centaines, milliers et dix-milliers en chinois.',
          contentEn: 'Learn tens, hundreds, thousands and ten-thousands in Chinese.',
          objectives: [
            'Dizaines (20, 30, 40...)',
            'Centaines (100, 200...)',
            'Milliers (1000, 2000...)',
            'Dix-milliers (万)'
          ],
          objectivesEn: [
            'Tens (20, 30, 40...)',
            'Hundreds (100, 200...)',
            'Thousands (1000, 2000...)',
            'Ten-thousands (万)'
          ]
        },
        flashcards: ['百', '千', '万', '亿', '十', '一'],
        quizQuestions: 8
      },
{
        id: 'numbers-2-ordinals',
        title: 'Nombres ordinaux',
        titleEn: 'Ordinal Numbers',
        duration: 15,
        completed: false,
        locked: false,
        hskLevel: 2,
        category: 'vocabulary',
        difficulty: 'elementary',
        tags: ["ordinal-numbers", "numbers"],
        introduction: {
          title: 'Premier, deuxième, troisième...',
          titleEn: 'First, Second, Third...',
          content: 'Ajoutez 第 (dì) devant un nombre pour en faire un nombre ordinal.',
          contentEn: 'Add 第 (dì) before a number to make it ordinal.',
          objectives: [
            'Formule : 第 + nombre',
            'Premier, deuxième...',
            'Ordre et classement',
            'Dates et étages'
          ],
          objectivesEn: [
            'Formula: 第 + number',
            'First, second...',
            'Order and ranking',
            'Dates and floors'
          ]
        },
        flashcards: ['第一', '第二', '第三', '第四', '第五', '第六'],
        quizQuestions: 6
      },
{
        id: 'numbers-3-dates',
        title: 'Dates et calendrier',
        titleEn: 'Dates and Calendar',
        duration: 20,
        completed: false,
        locked: false,
        hskLevel: 2,
        category: 'vocabulary',
        difficulty: 'elementary',
        tags: ["time", "numbers"],
        introduction: {
          title: 'Dire la date',
          titleEn: 'Say the Date',
          content: 'Exprimez les années, mois, jours et jours de la semaine.',
          contentEn: 'Express years, months, days and days of the week.',
          objectives: [
            'Année, mois, jour',
            'Jours de la semaine',
            'Dire la date complète',
            'Demander la date'
          ],
          objectivesEn: [
            'Year, month, day',
            'Days of the week',
            'Say complete date',
            'Ask the date'
          ]
        },
        flashcards: ['年', '月', '日', '号', '星期', '今天'],
        quizQuestions: 10
      },
{
        id: 'numbers-4-money-prices',
        title: 'Prix et monnaie',
        titleEn: 'Prices and Money',
        duration: 15,
        completed: false,
        locked: false,
        hskLevel: 2,
        category: 'vocabulary',
        difficulty: 'elementary',
        tags: ["money", "numbers"],
        introduction: {
          title: 'Parler d\'argent',
          titleEn: 'Talk About Money',
          content: 'Les unités monétaires chinoises : yuan (块/元), jiao (毛), fen (分).',
          contentEn: 'Chinese monetary units: yuan (块/元), jiao (毛), fen (分).',
          objectives: [
            'Yuan, jiao, fen',
            'Dire les prix',
            'Payer et rendre la monnaie',
            'Bargaining'
          ],
          objectivesEn: [
            'Yuan, jiao, fen',
            'Say prices',
            'Pay and get change',
            'Bargaining'
          ]
        },
        flashcards: ['块', '元', '毛', '分', '钱', '便宜'],
        quizQuestions: 7
      }
    ]
  },

  // ============================================
  // PATH 5: RELATIONS SOCIALES
  // ============================================
  {
    id: 'social-relations',
    name: 'Relations Sociales',
    nameEn: 'Social Relations',
    description: 'Parler de soi, des autres et des relations',
    descriptionEn: 'Talk about yourself, others and relationships',
    icon: '👥',
    color: '#06b6d4',
    lessons: [
{
        id: 'vocab-10-occupations',
        title: 'Métiers',
        titleEn: 'Occupations',
        duration: 15,
        completed: false,
        locked: false,
        hskLevel: 2,
        category: 'vocabulary',
        difficulty: 'elementary',
        tags: ["work", "vocabulary"],
        introduction: {
          title: 'Professions courantes',
          titleEn: 'Common Professions',
          content: 'Les métiers les plus courants à connaître.',
          contentEn: 'The most common professions to know.',
          objectives: [
            'Médecin, professeur',
            'Étudiant, serveur',
            'Parler de votre métier',
            'Demander la profession'
          ],
          objectivesEn: [
            'Doctor, teacher',
            'Student, waiter',
            'Talk about your job',
            'Ask about occupation'
          ]
        },
        flashcards: ['老师', '医生', '学生', '工人', '司机', '经理'],
        quizQuestions: 6
      },
{
        id: 'vocab-11-hobbies',
        title: 'Loisirs',
        titleEn: 'Hobbies',
        duration: 15,
        completed: false,
        locked: false,
        hskLevel: 2,
        category: 'vocabulary',
        difficulty: 'elementary',
        tags: ["hobbies", "vocabulary"],
        introduction: {
          title: 'Vos activités préférées',
          titleEn: 'Your Favorite Activities',
          content: 'Parlez de ce que vous aimez faire pendant votre temps libre.',
          contentEn: 'Talk about what you like to do in your free time.',
          objectives: [
            'Lire, regarder des films',
            'Écouter de la musique',
            'Faire du sport',
            'Partager vos hobbies'
          ],
          objectivesEn: [
            'Read, watch movies',
            'Listen to music',
            'Do sports',
            'Share your hobbies'
          ]
        },
        flashcards: ['看书', '听音乐', '运动', '旅游', '看电影', '游泳'],
        quizQuestions: 6
      },
{
        id: 'vocab-12-emotions',
        title: 'Émotions',
        titleEn: 'Emotions',
        duration: 15,
        completed: false,
        locked: false,
        hskLevel: 2,
        category: 'vocabulary',
        difficulty: 'elementary',
        tags: ["emotions", "vocabulary"],
        introduction: {
          title: 'Exprimer vos sentiments',
          titleEn: 'Express Your Feelings',
          content: 'Dites comment vous vous sentez : content, triste, en colère, fatigué.',
          contentEn: 'Say how you feel: happy, sad, angry, tired.',
          objectives: [
            'Émotions de base',
            'États physiques',
            'Exprimer son humeur',
            'Demander comment on va'
          ],
          objectivesEn: [
            'Basic emotions',
            'Physical states',
            'Express your mood',
            'Ask how someone is'
          ]
        },
        flashcards: ['高兴', '难过', '生气', '累', '紧张', '害怕', '开心', '兴奋'],
        quizQuestions: 6
      },
{
        id: 'convo-4-making-plans',
        title: 'Faire des plans',
        titleEn: 'Making Plans',
        duration: 20,
        completed: false,
        locked: false,
        hskLevel: 2,
        category: 'conversation',
        difficulty: 'elementary',
        tags: ["conversation", "social"],
        introduction: {
          title: 'Organiser une sortie',
          titleEn: 'Organize an Outing',
          content: 'Proposez des activités, fixez un rendez-vous, planifiez le week-end.',
          contentEn: 'Propose activities, set an appointment, plan the weekend.',
          objectives: [
            'Parler du week-end',
            'Proposer une activité',
            'Fixer un rendez-vous',
            'Dire "ensemble"'
          ],
          objectivesEn: [
            'Talk about weekend',
            'Propose an activity',
            'Set an appointment',
            'Say "together"'
          ]
        },
        flashcards: ['见面', '时间', '地方', '一起', '约', '安排'],
        quizQuestions: 8
      },
{
        id: 'convo-9-invitations',
        title: 'Invitations',
        titleEn: 'Invitations',
        duration: 20,
        completed: false,
        locked: false,
        hskLevel: 2,
        category: 'conversation',
        difficulty: 'elementary',
        tags: ["invitations", "conversation"],
        introduction: {
          title: 'Inviter et accepter',
          titleEn: 'Invite and Accept',
          content: 'Invitez des amis, acceptez ou refusez poliment une invitation.',
          contentEn: 'Invite friends, accept or politely decline an invitation.',
          objectives: [
            'Inviter quelqu\'un',
            'Accepter une invitation',
            'Refuser poliment',
            'Participer à un événement'
          ],
          objectivesEn: [
            'Invite someone',
            'Accept an invitation',
            'Politely decline',
            'Participate in event'
          ]
        },
        flashcards: ['请', '邀请', '参加', '来', '去', '聚会'],
        quizQuestions: 7
      },
{
        id: 'convo-10-opinions',
        title: 'Donner son avis',
        titleEn: 'Giving Opinions',
        duration: 20,
        completed: false,
        locked: false,
        hskLevel: 2,
        category: 'conversation',
        difficulty: 'elementary',
        tags: ["conversation", "opinions"],
        introduction: {
          title: 'Exprimer votre opinion',
          titleEn: 'Express Your Opinion',
          content: 'Dites ce que vous pensez, soyez d\'accord ou pas d\'accord, donnez votre avis.',
          contentEn: 'Say what you think, agree or disagree, give your opinion.',
          objectives: [
            'Dire "je pense que"',
            'Être d\'accord',
            'Pas d\'accord',
            'Nuancer son opinion'
          ],
          objectivesEn: [
            'Say "I think that"',
            'Agree',
            'Disagree',
            'Nuance opinion'
          ]
        },
        flashcards: ['觉得', '认为', '同意', '看法', '意见', '想'],
        quizQuestions: 7
      },
{
        id: 'conv-hsk3-1-meeting-friends',
        title: 'Retrouver des amis',
        titleEn: 'Meeting Friends',
        duration: 25,
        completed: false,
        locked: false,
        hskLevel: 3,
        category: 'conversation',
        difficulty: 'intermediate',
        tags: ["general"],
        introduction: {
          title: 'Conversations avec des amis',
          titleEn: 'Conversations with Friends',
          content: 'Apprenez à parler de vos activités, partager des nouvelles et faire des plans avec vos amis.',
          contentEn: 'Learn to talk about your activities, share news and make plans with friends.',
          objectives: [
            'Raconter ce que vous avez fait récemment',
            'Demander des nouvelles',
            'Proposer des activités',
            'Exprimer votre intérêt ou désintérêt'
          ],
          objectivesEn: [
            'Tell what you\'ve done recently',
            'Ask for news',
            'Suggest activities',
            'Express interest or disinterest'
          ]
        },
        flashcards: ['见面', '最近', '活动', '打算', '有意思', '同意', '决定', '参加'],
        quizQuestions: 8
      }
    ]
  },

  // ============================================
  // PATH 6: GRAMMAIRE ESSENTIELLE
  // ============================================
  {
    id: 'essential-grammar',
    name: 'Grammaire Essentielle',
    nameEn: 'Essential Grammar',
    description: 'Structures grammaticales fondamentales',
    descriptionEn: 'Fundamental grammar structures',
    icon: '📚',
    color: '#6366f1',
    lessons: [
{
        id: 'grammar-1-subject-verb',
        title: 'Sujet + Verbe',
        titleEn: 'Subject + Verb',
        duration: 15,
        completed: false,
        locked: false,
        hskLevel: 1,
        category: 'grammar',
        difficulty: 'beginner',
        tags: ["grammar"],
        introduction: {
          title: 'Structure de phrase de base',
          titleEn: 'Basic Sentence Structure',
          content: 'La structure la plus simple en chinois : Sujet + Verbe + (Objet)',
          contentEn: 'The simplest structure in Chinese: Subject + Verb + (Object)',
          objectives: [
            'Comprendre Sujet-Verbe',
            'Former des phrases simples',
            'Ajouter un objet',
            'Ordre des mots'
          ],
          objectivesEn: [
            'Understand Subject-Verb',
            'Form simple sentences',
            'Add an object',
            'Word order'
          ]
        },
        flashcards: ['grammar-subject-verb'],
        quizQuestions: 0
      },
{
        id: 'grammar-1-negation',
        title: 'Négation (不/没)',
        titleEn: 'Negation (不/没)',
        duration: 15,
        completed: false,
        locked: false,
        hskLevel: 1,
        category: 'grammar',
        difficulty: 'beginner',
        tags: ["grammar", "negation"],
        introduction: {
          title: 'Dire "non" en chinois',
          titleEn: 'Saying "no" in Chinese',
          content: 'Deux façons de nier en chinois : 不 (bù) pour le général et 没 (méi) pour le passé',
          contentEn: 'Two ways to negate in Chinese: 不 (bù) for general and 没 (méi) for past',
          objectives: [
            'Utiliser 不 pour le présent/futur',
            'Utiliser 没 pour le passé',
            'Différencier 不是 et 没有',
            'Pratiquer avec des phrases complètes'
          ],
          objectivesEn: [
            'Use 不 for present/future',
            'Use 没 for past',
            'Differentiate 不是 and 没有',
            'Practice with complete sentences'
          ]
        },
        flashcards: ['grammar-negation-bu', 'grammar-negation-mei'],
        quizQuestions: 0
      },
{
        id: 'grammar-3-adjectives',
        title: 'Adjectifs (很 + adj)',
        titleEn: 'Adjectives (很 + adj)',
        duration: 15,
        completed: false,
        locked: false,
        hskLevel: 1,
        category: 'grammar',
        difficulty: 'beginner',
        tags: ["adjectives", "grammar"],
        introduction: {
          title: 'Utiliser les adjectifs',
          titleEn: 'Using Adjectives',
          content: 'En chinois, on utilise souvent 很 (hěn) avec les adjectifs, même sans l\'idée de "très".',
          contentEn: 'In Chinese, we often use 很 (hěn) with adjectives, even without the idea of "very".',
          objectives: [
            'Structure : 很 + adjectif',
            'Décrire des choses',
            'Adjectifs courants',
            'Phrases descriptives'
          ],
          objectivesEn: [
            'Structure: 很 + adjective',
            'Describe things',
            'Common adjectives',
            'Descriptive sentences'
          ]
        },
        flashcards: ['grammar-adjectives-hen'],
        quizQuestions: 0
      },
{
        id: 'grammar-3-questions',
        title: 'Questions avec 吗',
        titleEn: 'Questions with 吗',
        duration: 15,
        completed: false,
        locked: false,
        hskLevel: 1,
        category: 'grammar',
        difficulty: 'beginner',
        tags: ["grammar", "questions"],
        introduction: {
          title: 'Poser des questions oui/non',
          titleEn: 'Asking Yes/No Questions',
          content: 'La façon la plus simple de poser une question : ajouter 吗 (ma) à la fin !',
          contentEn: 'The simplest way to ask a question: add 吗 (ma) at the end!',
          objectives: [
            'Ajouter 吗 à une affirmation',
            'Reconstituer des questions',
            'Répondre aux questions',
            'Former des questions diverses'
          ],
          objectivesEn: [
            'Add 吗 to a statement',
            'Reconstruct questions',
            'Answer questions',
            'Form various questions'
          ]
        },
        flashcards: ['grammar-question-ma'],
        quizQuestions: 0
      },
{
        id: 'grammar-2-possession',
        title: 'Possession (的)',
        titleEn: 'Possession (的)',
        duration: 15,
        completed: false,
        locked: false,
        hskLevel: 1,
        category: 'grammar',
        difficulty: 'beginner',
        tags: ["grammar", "possession"],
        introduction: {
          title: 'Exprimer la possession',
          titleEn: 'Expressing Possession',
          content: 'Utilisez 的 (de) pour indiquer la possession : mon, ton, son...',
          contentEn: 'Use 的 (de) to indicate possession: my, your, his...',
          objectives: [
            'Structure : possesseur + 的 + chose',
            'Reconstituer des phrases possessives',
            'Mon, ton, son',
            'Relations et possessions'
          ],
          objectivesEn: [
            'Structure: possessor + 的 + thing',
            'Reconstruct possessive phrases',
            'My, your, his/her',
            'Relations and possessions'
          ]
        },
        flashcards: ['grammar-possession-de'],
        quizQuestions: 0
      },
{
        id: 'grammar-4-location',
        title: 'Localisation (在)',
        titleEn: 'Location (在)',
        duration: 15,
        completed: false,
        locked: false,
        hskLevel: 1,
        category: 'grammar',
        difficulty: 'beginner',
        tags: ["location", "grammar"],
        introduction: {
          title: 'Dire où vous êtes',
          titleEn: 'Saying Where You Are',
          content: 'Le verbe 在 (zài) exprime la localisation : être à/dans un endroit.',
          contentEn: 'The verb 在 (zài) expresses location: to be at/in a place.',
          objectives: [
            'Utiliser 在 pour la position',
            'Compléter des phrases avec 在',
            'Mots de lieu',
            'Dire où on est'
          ],
          objectivesEn: [
            'Use 在 for position',
            'Complete sentences with 在',
            'Location words',
            'Say where you are'
          ]
        },
        flashcards: ['grammar-location-zai'],
        quizQuestions: 0
      },
{
        id: 'grammar-7-measure-words',
        title: 'Spécificatifs (个/本/杯)',
        titleEn: 'Measure Words (个/本/杯)',
        duration: 20,
        completed: false,
        locked: false,
        hskLevel: 1,
        category: 'grammar',
        difficulty: 'beginner',
        tags: ["measure-words", "grammar"],
        introduction: {
          title: 'Les classificateurs',
          titleEn: 'Classifiers',
          content: 'En chinois, on ne peut pas dire "un livre" directement. Il faut un classificateur entre le nombre et le nom.',
          contentEn: 'In Chinese, you can\'t say "one book" directly. You need a classifier between the number and noun.',
          objectives: [
            'Comprendre les spécificatifs',
            'Utiliser 个 (général)',
            'Autres spécificatifs courants',
            'Nombre + spécificatif + nom'
          ],
          objectivesEn: [
            'Understand classifiers',
            'Use 个 (general)',
            'Other common classifiers',
            'Number + classifier + noun'
          ]
        },
        flashcards: ['grammar-measure-words'],
        quizQuestions: 0
      },
{
        id: 'grammar-8-time-expressions',
        title: 'Expressions temporelles',
        titleEn: 'Time Expressions',
        duration: 15,
        completed: false,
        locked: false,
        hskLevel: 1,
        category: 'grammar',
        difficulty: 'beginner',
        tags: ["time", "grammar"],
        introduction: {
          title: 'Situer dans le temps',
          titleEn: 'Situating in Time',
          content: 'Exprimez quand une action se passe : maintenant, avant, après, au moment de...',
          contentEn: 'Express when an action happens: now, before, after, at the time of...',
          objectives: [
            'Utiliser 现在, 以前, 以后',
            'Expression "的时候"',
            'Ordre temporel dans la phrase',
            'Situer les actions'
          ],
          objectivesEn: [
            'Use 现在, 以前, 以后',
            'Expression "的时候"',
            'Time order in sentences',
            'Situate actions'
          ]
        },
        flashcards: ['grammar-time-expressions'],
        quizQuestions: 0
      },
{
        id: 'grammar2-1-aspect-le',
        title: 'Aspect accompli (了)',
        titleEn: 'Completed Aspect (了)',
        duration: 20,
        completed: false,
        locked: false,
        hskLevel: 2,
        category: 'grammar',
        difficulty: 'elementary',
        tags: ["grammar", "aspect"],
        introduction: {
          title: 'La particule 了',
          titleEn: 'The Particle 了',
          content: 'Exprimez qu\'une action est accomplie avec la particule 了 (le).',
          contentEn: 'Express that an action is completed with the particle 了 (le).',
          objectives: [
            'Utiliser 了 après le verbe',
            'Action accomplie',
            'Différence avec le passé',
            'Changement d\'état'
          ],
          objectivesEn: [
            'Use 了 after verb',
            'Completed action',
            'Difference with past',
            'Change of state'
          ]
        },
        flashcards: ['了', '过', '着', '正在'],
        quizQuestions: 8
      },
{
        id: 'grammar2-2-duration',
        title: 'Durée temporelle',
        titleEn: 'Time Duration',
        duration: 20,
        completed: false,
        locked: false,
        hskLevel: 2,
        category: 'grammar',
        difficulty: 'elementary',
        tags: ["grammar", "duration"],
        introduction: {
          title: 'Exprimer la durée',
          titleEn: 'Expressing Duration',
          content: 'Dites combien de temps vous avez fait quelque chose.',
          contentEn: 'Say how long you did something.',
          objectives: [
            'Verbe + durée',
            'Pendant X temps',
            'Depuis X temps',
            'Position de la durée'
          ],
          objectivesEn: [
            'Verb + duration',
            'For X time',
            'Since X time',
            'Duration position'
          ]
        },
        flashcards: ['小时', '天', '年', '月', '星期', '分钟'],
        quizQuestions: 7
      },
{
        id: 'grammar2-3-comparison',
        title: 'Comparaison (比)',
        titleEn: 'Comparison (比)',
        duration: 20,
        completed: false,
        locked: false,
        hskLevel: 2,
        category: 'grammar',
        difficulty: 'elementary',
        tags: ["comparison", "grammar"],
        introduction: {
          title: 'Comparer deux choses',
          titleEn: 'Compare Two Things',
          content: 'Utilisez 比 pour comparer : plus grand que, moins cher que...',
          contentEn: 'Use 比 to compare: bigger than, cheaper than...',
          objectives: [
            'A 比 B + adjectif',
            'Plus... que',
            'Plus avec 更',
            'Le plus avec 最'
          ],
          objectivesEn: [
            'A 比 B + adjective',
            'More... than',
            'More with 更',
            'Most with 最'
          ]
        },
        flashcards: ['比', '更', '最', '一样', '没有'],
        quizQuestions: 8
      },
{
        id: 'grammar2-4-modal-verbs',
        title: 'Verbes modaux (会/能/可以)',
        titleEn: 'Modal Verbs (会/能/可以)',
        duration: 20,
        completed: false,
        locked: false,
        hskLevel: 2,
        category: 'grammar',
        difficulty: 'elementary',
        tags: ["grammar", "modal-verbs"],
        introduction: {
          title: 'Pouvoir, savoir, devoir',
          titleEn: 'Can, Know How, Must',
          content: 'Différenciez 会 (savoir faire), 能 (pouvoir physiquement), 可以 (avoir la permission).',
          contentEn: 'Differentiate 会 (know how), 能 (can physically), 可以 (have permission).',
          objectives: [
            '会 : capacité apprise',
            '能 : possibilité physique',
            '可以 : permission',
            '应该 : devoir moral'
          ],
          objectivesEn: [
            '会: learned ability',
            '能: physical possibility',
            '可以: permission',
            '应该: moral duty'
          ]
        },
        flashcards: ['会', '能', '可以', '应该', '想', '要'],
        quizQuestions: 8
      },
{
        id: 'grammar2-5-progressive',
        title: 'Progressif (在/正在)',
        titleEn: 'Progressive (在/正在)',
        duration: 20,
        completed: false,
        locked: false,
        hskLevel: 2,
        category: 'grammar',
        difficulty: 'elementary',
        tags: ["progressive", "grammar"],
        introduction: {
          title: 'Action en cours',
          titleEn: 'Ongoing Action',
          content: 'Exprimez qu\'une action est en train de se passer maintenant.',
          contentEn: 'Express that an action is happening right now.',
          objectives: [
            '在 + verbe',
            '正在 + verbe',
            'Je suis en train de...',
            'Différence avec le présent simple'
          ],
          objectivesEn: [
            '在 + verb',
            '正在 + verb',
            'I am... ing',
            'Difference with simple present'
          ]
        },
        flashcards: ['在', '正在', '呢', '着'],
        quizQuestions: 6
      },
{
        id: 'grammar2-6-resultative',
        title: 'Compléments de résultat',
        titleEn: 'Resultative Complements',
        duration: 20,
        completed: false,
        locked: false,
        hskLevel: 2,
        category: 'grammar',
        difficulty: 'elementary',
        tags: ["grammar", "resultative"],
        introduction: {
          title: 'Résultat de l\'action',
          titleEn: 'Result of Action',
          content: 'Ajoutez un complément au verbe pour indiquer le résultat : comprendre en écoutant, voir en regardant...',
          contentEn: 'Add a complement to the verb to indicate result: understand by listening, see by looking...',
          objectives: [
            'Verbe + résultat',
            '听懂 (comprendre en écoutant)',
            '看见 (voir)',
            '找到 (trouver)'
          ],
          objectivesEn: [
            'Verb + result',
            '听懂 (understand by listening)',
            '看见 (see)',
            '找到 (find)'
          ]
        },
        flashcards: ['完', '好', '到', '懂', '见', '清楚'],
        quizQuestions: 7
      },
{
        id: 'grammar2-7-conjunctions',
        title: 'Conjonctions',
        titleEn: 'Conjunctions',
        duration: 20,
        completed: false,
        locked: false,
        hskLevel: 2,
        category: 'grammar',
        difficulty: 'elementary',
        tags: ["conjunctions", "grammar"],
        introduction: {
          title: 'Relier les phrases',
          titleEn: 'Connect Sentences',
          content: 'Utilisez les conjonctions pour créer des phrases complexes : parce que, donc, mais, si...',
          contentEn: 'Use conjunctions to create complex sentences: because, therefore, but, if...',
          objectives: [
            '因为...所以 (parce que...donc)',
            '但是 (mais)',
            '如果 (si)',
            'Phrases complexes'
          ],
          objectivesEn: [
            '因为...所以 (because...therefore)',
            '但是 (but)',
            '如果 (if)',
            'Complex sentences'
          ]
        },
        flashcards: ['因为', '所以', '虽然', '但是', '如果', '就'],
        quizQuestions: 8
      },
{
        id: 'gram-hsk3-1-comparisons',
        title: 'Comparaisons',
        titleEn: 'Comparisons',
        duration: 25,
        completed: false,
        locked: false,
        hskLevel: 3,
        category: 'grammar',
        difficulty: 'intermediate',
        tags: ["comparison"],
        introduction: {
          title: 'Comparer deux choses',
          titleEn: 'Compare Two Things',
          content: 'Maîtrisez les structures de comparaison en chinois (比, 跟...一样, 没有...那么).',
          contentEn: 'Master comparison structures in Chinese (比, 跟...一样, 没有...那么).',
          objectives: [
            'Utiliser 比 pour comparer',
            'Exprimer l\'égalité avec 跟...一样',
            'Comparaisons négatives',
            'Superlatif avec 最'
          ],
          objectivesEn: [
            'Use 比 to compare',
            'Express equality with 跟...一样',
            'Negative comparisons',
            'Superlative with 最'
          ]
        },
        flashcards: ['比', '一样', '更', '最', '差不多', '相同', '不同', '像'],
        quizQuestions: 8
      },
{
        id: 'gram-hsk3-2-duration',
        title: 'Durée et fréquence',
        titleEn: 'Duration and Frequency',
        duration: 25,
        completed: false,
        locked: false,
        hskLevel: 3,
        category: 'grammar',
        difficulty: 'intermediate',
        tags: ["duration"],
        introduction: {
          title: 'Exprimer le temps',
          titleEn: 'Express Time',
          content: 'Apprenez à parler de la durée d\'une action et de sa fréquence.',
          contentEn: 'Learn to talk about duration of an action and its frequency.',
          objectives: [
            'Durée après le verbe',
            'Fréquence avec 次, 遍',
            'Depuis... (déjà)',
            'Encore combien de temps'
          ],
          objectivesEn: [
            'Duration after verb',
            'Frequency with 次, 遍',
            'Since... (already)',
            'How much longer'
          ]
        },
        flashcards: ['次', '遍', '已经', '刚', '还', '再', '又', '从'],
        quizQuestions: 8
      },
{
        id: 'gram-hsk3-3-resultative',
        title: 'Compléments de résultat',
        titleEn: 'Resultative Complements',
        duration: 30,
        completed: false,
        locked: false,
        hskLevel: 3,
        category: 'grammar',
        difficulty: 'intermediate',
        tags: ["resultative"],
        introduction: {
          title: 'Exprimer le résultat d\'une action',
          titleEn: 'Express Result of an Action',
          content: 'Les compléments de résultat indiquent l\'aboutissement d\'une action.',
          contentEn: 'Resultative complements indicate the outcome of an action.',
          objectives: [
            'Structure verbe + résultat',
            'Compléments courants (完, 好, 到, 见)',
            'Forme négative et interrogative',
            'Différence avec les particules'
          ],
          objectivesEn: [
            'Verb + result structure',
            'Common complements (完, 好, 到, 见)',
            'Negative and interrogative forms',
            'Difference with particles'
          ]
        },
        flashcards: ['完', '好', '到', '见', '懂', '清楚', '错', '对'],
        quizQuestions: 8
      },
{
        id: 'gram-hsk3-4-passive',
        title: 'Forme passive',
        titleEn: 'Passive Voice',
        duration: 25,
        completed: false,
        locked: false,
        hskLevel: 3,
        category: 'grammar',
        difficulty: 'intermediate',
        tags: ["general"],
        introduction: {
          title: 'La voix passive avec 被',
          titleEn: 'Passive Voice with 被',
          content: 'Apprenez à utiliser la construction passive pour changer la perspective.',
          contentEn: 'Learn to use the passive construction to change perspective.',
          objectives: [
            'Structure 被 + agent + verbe',
            'Quand utiliser le passif',
            'Passif sans agent',
            'Connotation négative'
          ],
          objectivesEn: [
            'Structure 被 + agent + verb',
            'When to use passive',
            'Passive without agent',
            'Negative connotation'
          ]
        },
        flashcards: ['被', '让', '给', '受', '遭', '挨', '遇到', '发生'],
        quizQuestions: 8
      }
    ]
  },

  // ============================================
  // PATH 7: S'EXPRIMER
  // ============================================
  {
    id: 'expression',
    name: 'S\'exprimer',
    nameEn: 'Expression',
    description: 'Raconter, décrire, donner son opinion',
    descriptionEn: 'Tell stories, describe, give opinions',
    icon: '💭',
    color: '#f43f5e',
    lessons: [
{
        id: 'chars-1-radicals',
        title: 'Radicaux de base',
        titleEn: 'Basic Radicals',
        duration: 25,
        completed: false,
        locked: false,
        hskLevel: 3,
        category: 'writing',
        difficulty: 'intermediate',
        tags: ["characters", "writing"],
        introduction: {
          title: 'Comprendre les radicaux',
          titleEn: 'Understanding Radicals',
          content: 'Les radicaux sont les éléments de base des caractères. Apprenez les plus importants !',
          contentEn: 'Radicals are the basic elements of characters. Learn the most important ones!',
          objectives: [
            'Radicaux des 5 éléments',
            'Radical de la personne',
            'Rôle des radicaux',
            'Chercher dans le dictionnaire'
          ],
          objectivesEn: [
            'Radicals of 5 elements',
            'Person radical',
            'Role of radicals',
            'Look up in dictionary'
          ]
        },
        flashcards: ['人', '手', '口', '心', '水', '火', '土', '日'],
        quizQuestions: 8
      },
{
        id: 'chars-2-strokes',
        title: 'Ordre des traits',
        titleEn: 'Stroke Order',
        duration: 25,
        completed: false,
        locked: false,
        hskLevel: 3,
        category: 'writing',
        difficulty: 'intermediate',
        tags: ["characters", "writing"],
        introduction: {
          title: 'Règles d\'écriture',
          titleEn: 'Writing Rules',
          content: 'L\'ordre des traits n\'est pas aléatoire. Suivez les règles pour bien écrire !',
          contentEn: 'Stroke order isn\'t random. Follow the rules to write correctly!',
          objectives: [
            'Types de traits',
            'Règles d\'ordre',
            'De gauche à droite',
            'De haut en bas'
          ],
          objectivesEn: [
            'Types of strokes',
            'Order rules',
            'Left to right',
            'Top to bottom'
          ]
        },
        flashcards: ['一', '二', '三', '人', '大', '小'],
        quizQuestions: 6
      },
{
        id: 'chars-3-pictographs',
        title: 'Pictogrammes',
        titleEn: 'Pictographs',
        duration: 20,
        completed: false,
        locked: false,
        hskLevel: 3,
        category: 'writing',
        difficulty: 'intermediate',
        tags: ["pictographs", "writing"],
        introduction: {
          title: 'Caractères imagés',
          titleEn: 'Picture Characters',
          content: 'Certains caractères représentent directement ce qu\'ils signifient. Fascinant !',
          contentEn: 'Some characters directly represent what they mean. Fascinating!',
          objectives: [
            'Soleil et lune',
            'Montagne et rivière',
            'Origine des caractères',
            'Mémorisation visuelle'
          ],
          objectivesEn: [
            'Sun and moon',
            'Mountain and river',
            'Character origins',
            'Visual memorization'
          ]
        },
        flashcards: ['日', '月', '山', '水', '火', '人', '口', '木'],
        quizQuestions: 6
      },
{
        id: 'chars-4-compounds',
        title: 'Caractères composés',
        titleEn: 'Compound Characters',
        duration: 25,
        completed: false,
        locked: false,
        hskLevel: 3,
        category: 'writing',
        difficulty: 'intermediate',
        tags: ["compounds", "writing"],
        introduction: {
          title: 'Combiner pour créer du sens',
          titleEn: 'Combine to Create Meaning',
          content: 'Deux éléments ensemble créent un nouveau sens. Découvrez la logique !',
          contentEn: 'Two elements together create new meaning. Discover the logic!',
          objectives: [
            'Idéogrammes composés',
            'Femme + enfant = bien',
            'Soleil + lune = lumineux',
            'Logique des combinaisons'
          ],
          objectivesEn: [
            'Compound ideograms',
            'Woman + child = good',
            'Sun + moon = bright',
            'Logic of combinations'
          ]
        },
        flashcards: ['好', '看', '想', '听', '说', '明'],
        quizQuestions: 7
      },
{
        id: 'chars-5-phonetic',
        title: 'Composants phonétiques',
        titleEn: 'Phonetic Components',
        duration: 25,
        completed: false,
        locked: false,
        hskLevel: 3,
        category: 'writing',
        difficulty: 'intermediate',
        tags: ["phone", "phonetic-components", "writing"],
        introduction: {
          title: 'Indices de prononciation',
          titleEn: 'Pronunciation Clues',
          content: '80% des caractères ont un composant qui indique la prononciation !',
          contentEn: '80% of characters have a component that indicates pronunciation!',
          objectives: [
            'Composant phonétique',
            'Composant sémantique',
            'Famille de caractères "ma"',
            'Deviner la prononciation'
          ],
          objectivesEn: [
            'Phonetic component',
            'Semantic component',
            'Character family "ma"',
            'Guess pronunciation'
          ]
        },
        flashcards: ['妈', '吗', '马', '们', '问', '闻'],
        quizQuestions: 6
      },
{
        id: 'chars-6-writing-practice',
        title: 'Pratique de calligraphie',
        titleEn: 'Calligraphy Practice',
        duration: 30,
        completed: false,
        locked: false,
        hskLevel: 3,
        category: 'writing',
        difficulty: 'intermediate',
        tags: ["writing"],
        introduction: {
          title: 'L\'art de l\'écriture',
          titleEn: 'The Art of Writing',
          content: 'Pratiquez l\'écriture de caractères complets avec le bon ordre des traits.',
          contentEn: 'Practice writing complete characters with correct stroke order.',
          objectives: [
            'Les 8 traits de base (永)',
            'Écrire 中国',
            'Calligraphie artistique',
            'Pratique quotidienne'
          ],
          objectivesEn: [
            'The 8 basic strokes (永)',
            'Write 中国',
            'Artistic calligraphy',
            'Daily practice'
          ]
        },
        flashcards: ['一', '二', '三', '人', '大', '小', '中', '国'],
        quizQuestions: 8
      },
{
        id: 'conv-hsk3-2-shopping',
        title: 'Faire les courses',
        titleEn: 'Shopping',
        duration: 25,
        completed: false,
        locked: false,
        hskLevel: 3,
        category: 'conversation',
        difficulty: 'intermediate',
        tags: ["shopping", "money"],
        introduction: {
          title: 'Au magasin',
          titleEn: 'At the Store',
          content: 'Maîtrisez le vocabulaire et les phrases pour faire vos achats en chinois.',
          contentEn: 'Master vocabulary and phrases for shopping in Chinese.',
          objectives: [
            'Demander le prix',
            'Comparer des produits',
            'Négocier',
            'Exprimer vos préférences'
          ],
          objectivesEn: [
            'Ask for prices',
            'Compare products',
            'Negotiate',
            'Express preferences'
          ]
        },
        flashcards: ['价格', '便宜', '贵', '合适', '质量', '选择', '付款', '找钱'],
        quizQuestions: 8
      },
{
        id: 'conv-hsk3-3-travel',
        title: 'Voyager',
        titleEn: 'Traveling',
        duration: 30,
        completed: false,
        locked: false,
        hskLevel: 3,
        category: 'conversation',
        difficulty: 'intermediate',
        tags: ["travel"],
        introduction: {
          title: 'En voyage',
          titleEn: 'On a Trip',
          content: 'Vocabulaire et expressions utiles pour voyager en Chine.',
          contentEn: 'Useful vocabulary and expressions for traveling in China.',
          objectives: [
            'Réserver un hôtel',
            'Demander son chemin',
            'Prendre les transports',
            'Visiter des attractions touristiques'
          ],
          objectivesEn: [
            'Book a hotel',
            'Ask for directions',
            'Take transportation',
            'Visit tourist attractions'
          ]
        },
        flashcards: ['旅游', '订', '地图', '方向', '景点', '票', '游客', '导游'],
        quizQuestions: 8
      },
{
        id: 'conv-hsk3-4-restaurant',
        title: 'Au restaurant',
        titleEn: 'At a Restaurant',
        duration: 25,
        completed: false,
        locked: false,
        hskLevel: 3,
        category: 'conversation',
        difficulty: 'intermediate',
        tags: ["food", "restaurant"],
        introduction: {
          title: 'Commander au restaurant',
          titleEn: 'Ordering at a Restaurant',
          content: 'Apprenez à commander, exprimer vos goûts et payer au restaurant.',
          contentEn: 'Learn to order, express your tastes and pay at a restaurant.',
          objectives: [
            'Lire un menu',
            'Commander des plats',
            'Demander des recommandations',
            'Payer l\'addition'
          ],
          objectivesEn: [
            'Read a menu',
            'Order dishes',
            'Ask for recommendations',
            'Pay the bill'
          ]
        },
        flashcards: ['菜单', '点菜', '推荐', '味道', '辣', '甜', '咸', '结账'],
        quizQuestions: 8
      }
    ]
  },

  // ============================================
  // PATH 8: NIVEAU AVANCÉ
  // ============================================
  {
    id: 'advanced-level',
    name: 'Niveau Avancé',
    nameEn: 'Advanced Level',
    description: 'Contenu avancé HSK 4-7',
    descriptionEn: 'Advanced content HSK 4-7',
    icon: '🎓',
    color: '#8b5cf6',
    lessons: [
{
        id: 'conv-hsk4-1-workplace',
        title: 'Au travail',
        titleEn: 'At Work',
        duration: 30,
        completed: false,
        locked: false,
        hskLevel: 4,
        category: 'conversation',
        difficulty: 'advanced',
        tags: ["work", "places"],
        introduction: {
          title: 'Communication professionnelle',
          titleEn: 'Professional Communication',
          content: 'Apprenez à communiquer efficacement dans un environnement professionnel.',
          contentEn: 'Learn to communicate effectively in a professional environment.',
          objectives: [
            'Parler de votre travail',
            'Organiser des réunions',
            'Discuter de projets',
            'Faire des présentations'
          ],
          objectivesEn: [
            'Talk about your work',
            'Organize meetings',
            'Discuss projects',
            'Make presentations'
          ]
        },
        flashcards: ['职业', '工作', '公司', '会议', '项目', '报告', '同事', '经理'],
        quizQuestions: 8
      },
{
        id: 'conv-hsk4-2-health',
        title: 'Santé et bien-être',
        titleEn: 'Health and Wellness',
        duration: 30,
        completed: false,
        locked: false,
        hskLevel: 4,
        category: 'conversation',
        difficulty: 'advanced',
        tags: ["health"],
        introduction: {
          title: 'Parler de santé',
          titleEn: 'Talking about Health',
          content: 'Vocabulaire médical et expressions pour parler de votre santé.',
          contentEn: 'Medical vocabulary and expressions to talk about your health.',
          objectives: [
            'Décrire des symptômes',
            'Aller chez le médecin',
            'Parler de sport et exercice',
            'Discuter d\'alimentation saine'
          ],
          objectivesEn: [
            'Describe symptoms',
            'Go to the doctor',
            'Talk about sports and exercise',
            'Discuss healthy eating'
          ]
        },
        flashcards: ['健康', '医生', '医院', '感冒', '药', '运动', '锻炼', '营养'],
        quizQuestions: 8
      },
{
        id: 'conv-hsk4-3-education',
        title: 'Éducation',
        titleEn: 'Education',
        duration: 30,
        completed: false,
        locked: false,
        hskLevel: 4,
        category: 'conversation',
        difficulty: 'advanced',
        tags: ["education"],
        introduction: {
          title: 'Système éducatif',
          titleEn: 'Education System',
          content: 'Parlez d\'éducation, d\'études et d\'apprentissage.',
          contentEn: 'Talk about education, studies and learning.',
          objectives: [
            'Parler de vos études',
            'Discuter de méthodes d\'apprentissage',
            'Comparer les systèmes éducatifs',
            'Exprimer vos objectifs académiques'
          ],
          objectivesEn: [
            'Talk about your studies',
            'Discuss learning methods',
            'Compare education systems',
            'Express academic goals'
          ]
        },
        flashcards: ['教育', '学习', '学校', '大学', '专业', '考试', '成绩', '毕业'],
        quizQuestions: 8
      },
{
        id: 'conv-hsk4-4-culture',
        title: 'Culture et loisirs',
        titleEn: 'Culture and Leisure',
        duration: 30,
        completed: false,
        locked: false,
        hskLevel: 4,
        category: 'conversation',
        difficulty: 'advanced',
        tags: ["culture"],
        introduction: {
          title: 'Activités culturelles',
          titleEn: 'Cultural Activities',
          content: 'Discutez de vos loisirs, hobbies et intérêts culturels.',
          contentEn: 'Discuss your leisure activities, hobbies and cultural interests.',
          objectives: [
            'Parler de films et livres',
            'Discuter de musique et art',
            'Partager vos hobbies',
            'Planifier des sorties culturelles'
          ],
          objectivesEn: [
            'Talk about movies and books',
            'Discuss music and art',
            'Share your hobbies',
            'Plan cultural outings'
          ]
        },
        flashcards: ['文化', '电影', '音乐', '艺术', '博物馆', '展览', '爱好', '兴趣'],
        quizQuestions: 8
      },
{
        id: 'gram-hsk4-1-conjunctions',
        title: 'Conjonctions complexes',
        titleEn: 'Complex Conjunctions',
        duration: 30,
        completed: false,
        locked: false,
        hskLevel: 4,
        category: 'grammar',
        difficulty: 'advanced',
        tags: ["conjunctions"],
        introduction: {
          title: 'Relier des idées',
          titleEn: 'Connecting Ideas',
          content: 'Maîtrisez les conjonctions pour construire des phrases complexes.',
          contentEn: 'Master conjunctions to build complex sentences.',
          objectives: [
            'Cause et effet (因为...所以)',
            'Conditions (如果...就)',
            'Concession (虽然...但是)',
            'But et intention (为了...)'
          ],
          objectivesEn: [
            'Cause and effect (因为...所以)',
            'Conditions (如果...就)',
            'Concession (虽然...但是)',
            'Purpose and intention (为了...)'
          ]
        },
        flashcards: ['因为', '所以', '如果', '就', '虽然', '但是', '为了', '而且'],
        quizQuestions: 8
      },
{
        id: 'gram-hsk4-2-aspect-markers',
        title: 'Marqueurs d\'aspect',
        titleEn: 'Aspect Markers',
        duration: 30,
        completed: false,
        locked: false,
        hskLevel: 4,
        category: 'grammar',
        difficulty: 'advanced',
        tags: ["aspect"],
        introduction: {
          title: 'Temps et aspect',
          titleEn: 'Time and Aspect',
          content: 'Comprenez l\'utilisation avancée de 了, 过, 着 et leurs combinaisons.',
          contentEn: 'Understand advanced use of 了, 过, 着 and their combinations.',
          objectives: [
            'Double 了',
            '过 d\'expérience',
            '着 duratif',
            'Combinaisons d\'aspects'
          ],
          objectivesEn: [
            'Double 了',
            '过 of experience',
            '着 durative',
            'Aspect combinations'
          ]
        },
        flashcards: ['了', '过', '着', '正在', '刚才', '曾经', '将要', '快要'],
        quizQuestions: 8
      },
{
        id: 'gram-hsk4-3-directional',
        title: 'Compléments directionnels',
        titleEn: 'Directional Complements',
        duration: 30,
        completed: false,
        locked: false,
        hskLevel: 4,
        category: 'grammar',
        difficulty: 'advanced',
        tags: ["directions"],
        introduction: {
          title: 'Direction du mouvement',
          titleEn: 'Direction of Movement',
          content: 'Utilisez les compléments directionnels pour préciser le mouvement.',
          contentEn: 'Use directional complements to specify movement.',
          objectives: [
            'Directions simples (上, 下, 进, 出)',
            'Directions composées (起来, 下去)',
            'Sens figurés',
            'Avec objets'
          ],
          objectivesEn: [
            'Simple directions (上, 下, 进, 出)',
            'Compound directions (起来, 下去)',
            'Figurative meanings',
            'With objects'
          ]
        },
        flashcards: ['上', '下', '进', '出', '回', '过', '起来', '下去'],
        quizQuestions: 8
      },
{
        id: 'gram-hsk4-4-potential',
        title: 'Forme potentielle',
        titleEn: 'Potential Form',
        duration: 30,
        completed: false,
        locked: false,
        hskLevel: 4,
        category: 'grammar',
        difficulty: 'advanced',
        tags: ["general"],
        introduction: {
          title: 'Capacité et possibilité',
          titleEn: 'Ability and Possibility',
          content: 'Exprimez la capacité ou l\'impossibilité de faire quelque chose.',
          contentEn: 'Express the ability or impossibility to do something.',
          objectives: [
            'Structure V-得/不-complément',
            'Potentiel avec résultatifs',
            'Potentiel avec directionnels',
            'Différence avec 能 et 会'
          ],
          objectivesEn: [
            'Structure V-得/不-complement',
            'Potential with resultatives',
            'Potential with directionals',
            'Difference with 能 and 会'
          ]
        },
        flashcards: ['得', '不', '能', '会', '可以', '行', '得了', '不了'],
        quizQuestions: 8
      },
{
        id: 'reading-hsk4-1-news',
        title: 'Articles de presse',
        titleEn: 'News Articles',
        duration: 35,
        completed: false,
        locked: false,
        hskLevel: 4,
        category: 'reading',
        difficulty: 'advanced',
        tags: ["reading"],
        introduction: {
          title: 'Comprendre l\'actualité',
          titleEn: 'Understanding Current Events',
          content: 'Lisez et comprenez des articles de presse simplifiés en chinois.',
          contentEn: 'Read and understand simplified news articles in Chinese.',
          objectives: [
            'Vocabulaire journalistique',
            'Structure des articles',
            'Repérer les informations clés',
            'Comprendre le contexte'
          ],
          objectivesEn: [
            'Journalistic vocabulary',
            'Article structure',
            'Identify key information',
            'Understand context'
          ]
        },
        flashcards: ['新闻', '报道', '记者', '采访', '发表', '消息', '事件', '社会'],
        quizQuestions: 10
      },
{
        id: 'reading-hsk4-2-stories',
        title: 'Histoires courtes',
        titleEn: 'Short Stories',
        duration: 35,
        completed: false,
        locked: false,
        hskLevel: 4,
        category: 'reading',
        difficulty: 'advanced',
        tags: ["reading"],
        introduction: {
          title: 'Littérature narrative',
          titleEn: 'Narrative Literature',
          content: 'Lisez des histoires courtes pour améliorer votre compréhension.',
          contentEn: 'Read short stories to improve your comprehension.',
          objectives: [
            'Suivre une narration',
            'Comprendre les personnages',
            'Identifier le message',
            'Vocabulaire descriptif'
          ],
          objectivesEn: [
            'Follow narration',
            'Understand characters',
            'Identify the message',
            'Descriptive vocabulary'
          ]
        },
        flashcards: ['故事', '情节', '人物', '描写', '结局', '主题', '意义', '感情'],
        quizQuestions: 10
      },
{
        id: 'reading-hsk4-3-instructions',
        title: 'Instructions et notices',
        titleEn: 'Instructions and Notices',
        duration: 30,
        completed: false,
        locked: false,
        hskLevel: 4,
        category: 'reading',
        difficulty: 'advanced',
        tags: ["reading"],
        introduction: {
          title: 'Textes pratiques',
          titleEn: 'Practical Texts',
          content: 'Comprenez des instructions, notices et modes d\'emploi.',
          contentEn: 'Understand instructions, notices and user manuals.',
          objectives: [
            'Lire des instructions',
            'Comprendre les étapes',
            'Vocabulaire technique de base',
            'Suivre des procédures'
          ],
          objectivesEn: [
            'Read instructions',
            'Understand steps',
            'Basic technical vocabulary',
            'Follow procedures'
          ]
        },
        flashcards: ['说明', '步骤', '方法', '使用', '注意', '禁止', '按照', '操作'],
        quizQuestions: 8
      },
{
        id: 'reading-hsk4-4-emails',
        title: 'E-mails et messages',
        titleEn: 'Emails and Messages',
        duration: 30,
        completed: false,
        locked: false,
        hskLevel: 4,
        category: 'reading',
        difficulty: 'advanced',
        tags: ["reading"],
        introduction: {
          title: 'Communication écrite',
          titleEn: 'Written Communication',
          content: 'Lisez et comprenez des e-mails, messages et lettres.',
          contentEn: 'Read and understand emails, messages and letters.',
          objectives: [
            'Format des e-mails',
            'Formules de politesse',
            'Comprendre l\'intention',
            'Rédiger une réponse'
          ],
          objectivesEn: [
            'Email format',
            'Polite expressions',
            'Understand intention',
            'Write a response'
          ]
        },
        flashcards: ['邮件', '信', '收到', '回复', '附件', '转发', '抄送', '联系'],
        quizQuestions: 8
      },
{
        id: 'writing-hsk4-1-paragraphs',
        title: 'Construire des paragraphes',
        titleEn: 'Building Paragraphs',
        duration: 30,
        completed: false,
        locked: false,
        hskLevel: 4,
        category: 'writing',
        difficulty: 'advanced',
        tags: ["general"],
        introduction: {
          title: 'Structure de paragraphe',
          titleEn: 'Paragraph Structure',
          content: 'Apprenez à organiser vos idées en paragraphes cohérents.',
          contentEn: 'Learn to organize your ideas into coherent paragraphs.',
          objectives: [
            'Phrase principale',
            'Phrases de support',
            'Transition entre idées',
            'Conclusion du paragraphe'
          ],
          objectivesEn: [
            'Topic sentence',
            'Supporting sentences',
            'Transition between ideas',
            'Paragraph conclusion'
          ]
        },
        flashcards: ['段落', '主题', '支持', '连接', '首先', '其次', '最后', '总之'],
        quizQuestions: 8
      },
{
        id: 'writing-hsk4-2-descriptions',
        title: 'Descriptions',
        titleEn: 'Descriptions',
        duration: 30,
        completed: false,
        locked: false,
        hskLevel: 4,
        category: 'writing',
        difficulty: 'advanced',
        tags: ["general"],
        introduction: {
          title: 'Décrire en détail',
          titleEn: 'Describe in Detail',
          content: 'Développez vos compétences pour décrire des personnes, lieux et objets.',
          contentEn: 'Develop your skills to describe people, places and objects.',
          objectives: [
            'Adjectifs descriptifs',
            'Détails sensoriels',
            'Ordre logique',
            'Comparaisons'
          ],
          objectivesEn: [
            'Descriptive adjectives',
            'Sensory details',
            'Logical order',
            'Comparisons'
          ]
        },
        flashcards: ['描述', '特点', '外观', '性格', '环境', '气氛', '印象', '细节'],
        quizQuestions: 8
      },
{
        id: 'writing-hsk4-3-narration',
        title: 'Narration',
        titleEn: 'Narration',
        duration: 35,
        completed: false,
        locked: false,
        hskLevel: 4,
        category: 'writing',
        difficulty: 'advanced',
        tags: ["general"],
        introduction: {
          title: 'Raconter une histoire',
          titleEn: 'Tell a Story',
          content: 'Apprenez à raconter des événements de manière chronologique et engageante.',
          contentEn: 'Learn to narrate events chronologically and engagingly.',
          objectives: [
            'Chronologie claire',
            'Connecteurs temporels',
            'Point de vue narratif',
            'Maintenir l\'intérêt'
          ],
          objectivesEn: [
            'Clear chronology',
            'Temporal connectors',
            'Narrative point of view',
            'Maintain interest'
          ]
        },
        flashcards: ['叙述', '事情', '经过', '开始', '然后', '接着', '突然', '终于'],
        quizQuestions: 8
      },
{
        id: 'writing-hsk4-4-opinions',
        title: 'Exprimer des opinions',
        titleEn: 'Expressing Opinions',
        duration: 35,
        completed: false,
        locked: false,
        hskLevel: 4,
        category: 'writing',
        difficulty: 'advanced',
        tags: ["opinions"],
        introduction: {
          title: 'Argumenter son point de vue',
          titleEn: 'Argue Your Point of View',
          content: 'Exprimez et défendez vos opinions de manière structurée.',
          contentEn: 'Express and defend your opinions in a structured way.',
          objectives: [
            'Présenter son opinion',
            'Donner des arguments',
            'Exemples concrets',
            'Conclure efficacement'
          ],
          objectivesEn: [
            'Present your opinion',
            'Give arguments',
            'Concrete examples',
            'Conclude effectively'
          ]
        },
        flashcards: ['观点', '看法', '认为', '同意', '反对', '理由', '例子', '证明'],
        quizQuestions: 8
      },
{
        id: 'debate-hsk5-1-social-issues',
        title: 'Questions sociales',
        titleEn: 'Social Issues',
        duration: 40,
        completed: false,
        locked: false,
        hskLevel: 5,
        category: 'conversation',
        difficulty: 'advanced',
        tags: ["debate", "opinions"],
        introduction: {
          title: 'Discuter de sujets sociaux',
          titleEn: 'Discuss Social Topics',
          content: 'Apprenez à discuter de questions sociales complexes avec nuance.',
          contentEn: 'Learn to discuss complex social issues with nuance.',
          objectives: [
            'Présenter différents points de vue',
            'Analyser des problèmes sociaux',
            'Proposer des solutions',
            'Débattre avec respect'
          ],
          objectivesEn: [
            'Present different viewpoints',
            'Analyze social problems',
            'Propose solutions',
            'Debate respectfully'
          ]
        },
        flashcards: ['社会', '问题', '现象', '影响', '原因', '解决', '措施', '效果'],
        quizQuestions: 10
      },
{
        id: 'debate-hsk5-2-technology',
        title: 'Technologie et société',
        titleEn: 'Technology and Society',
        duration: 40,
        completed: false,
        locked: false,
        hskLevel: 5,
        category: 'conversation',
        difficulty: 'advanced',
        tags: ["debate", "opinions"],
        introduction: {
          title: 'Impact de la technologie',
          titleEn: 'Impact of Technology',
          content: 'Discutez des avantages et inconvénients de la technologie moderne.',
          contentEn: 'Discuss advantages and disadvantages of modern technology.',
          objectives: [
            'Vocabulaire technologique',
            'Analyser l\'impact social',
            'Perspectives multiples',
            'Prédire les tendances'
          ],
          objectivesEn: [
            'Technology vocabulary',
            'Analyze social impact',
            'Multiple perspectives',
            'Predict trends'
          ]
        },
        flashcards: ['科技', '发展', '进步', '创新', '应用', '普及', '变革', '趋势'],
        quizQuestions: 10
      },
{
        id: 'debate-hsk5-3-environment',
        title: 'Environnement',
        titleEn: 'Environment',
        duration: 40,
        completed: false,
        locked: false,
        hskLevel: 5,
        category: 'conversation',
        difficulty: 'advanced',
        tags: ["debate", "opinions"],
        introduction: {
          title: 'Protection environnementale',
          titleEn: 'Environmental Protection',
          content: 'Débattez des enjeux environnementaux et du développement durable.',
          contentEn: 'Debate environmental issues and sustainable development.',
          objectives: [
            'Problèmes environnementaux',
            'Développement durable',
            'Responsabilité individuelle',
            'Politiques publiques'
          ],
          objectivesEn: [
            'Environmental problems',
            'Sustainable development',
            'Individual responsibility',
            'Public policies'
          ]
        },
        flashcards: ['环境', '保护', '污染', '资源', '可持续', '节约', '循环', '生态'],
        quizQuestions: 10
      },
{
        id: 'debate-hsk5-4-cultural',
        title: 'Échanges culturels',
        titleEn: 'Cultural Exchange',
        duration: 40,
        completed: false,
        locked: false,
        hskLevel: 5,
        category: 'conversation',
        difficulty: 'advanced',
        tags: ["debate", "opinions"],
        introduction: {
          title: 'Culture et mondialisation',
          titleEn: 'Culture and Globalization',
          content: 'Explorez les questions d\'identité culturelle et de mondialisation.',
          contentEn: 'Explore questions of cultural identity and globalization.',
          objectives: [
            'Diversité culturelle',
            'Tradition vs modernité',
            'Échanges interculturels',
            'Préservation du patrimoine'
          ],
          objectivesEn: [
            'Cultural diversity',
            'Tradition vs modernity',
            'Intercultural exchanges',
            'Heritage preservation'
          ]
        },
        flashcards: ['文化', '传统', '现代', '交流', '融合', '差异', '认同', '遗产'],
        quizQuestions: 10
      },
{
        id: 'gram-hsk5-1-complex-sentences',
        title: 'Phrases complexes',
        titleEn: 'Complex Sentences',
        duration: 40,
        completed: false,
        locked: false,
        hskLevel: 5,
        category: 'grammar',
        difficulty: 'advanced',
        tags: ["general"],
        introduction: {
          title: 'Construction de phrases élaborées',
          titleEn: 'Building Elaborate Sentences',
          content: 'Apprenez à construire des phrases longues et complexes.',
          contentEn: 'Learn to build long and complex sentences.',
          objectives: [
            'Subordination multiple',
            'Phrases imbriquées',
            'Coordination complexe',
            'Maintenir la clarté'
          ],
          objectivesEn: [
            'Multiple subordination',
            'Nested sentences',
            'Complex coordination',
            'Maintain clarity'
          ]
        },
        flashcards: ['不但...而且', '不仅...还', '既...又', '一方面...另一方面', '与其...不如', '宁可...也', '无论...都', '即使...也'],
        quizQuestions: 10
      },
{
        id: 'gram-hsk5-2-advanced-modality',
        title: 'Modalité avancée',
        titleEn: 'Advanced Modality',
        duration: 40,
        completed: false,
        locked: false,
        hskLevel: 5,
        category: 'grammar',
        difficulty: 'advanced',
        tags: ["modal-verbs"],
        introduction: {
          title: 'Exprimer des nuances',
          titleEn: 'Express Nuances',
          content: 'Maîtrisez l\'expression de la possibilité, probabilité et nécessité.',
          contentEn: 'Master expression of possibility, probability and necessity.',
          objectives: [
            'Degrés de certitude',
            'Modalité épistémique',
            'Obligation et permission',
            'Nuances subtiles'
          ],
          objectivesEn: [
            'Degrees of certainty',
            'Epistemic modality',
            'Obligation and permission',
            'Subtle nuances'
          ]
        },
        flashcards: ['应该', '必须', '难免', '未必', '恐怕', '估计', '大概', '也许'],
        quizQuestions: 10
      },
{
        id: 'gram-hsk5-3-discourse-markers',
        title: 'Marqueurs de discours',
        titleEn: 'Discourse Markers',
        duration: 40,
        completed: false,
        locked: false,
        hskLevel: 5,
        category: 'grammar',
        difficulty: 'advanced',
        tags: ["general"],
        introduction: {
          title: 'Structurer le discours',
          titleEn: 'Structure Discourse',
          content: 'Utilisez des marqueurs pour organiser votre discours.',
          contentEn: 'Use markers to organize your discourse.',
          objectives: [
            'Connecteurs logiques',
            'Transitions',
            'Emphase et contraste',
            'Cohérence textuelle'
          ],
          objectivesEn: [
            'Logical connectors',
            'Transitions',
            'Emphasis and contrast',
            'Textual coherence'
          ]
        },
        flashcards: ['换句话说', '总而言之', '此外', '然而', '因此', '否则', '反之', '至于'],
        quizQuestions: 10
      },
{
        id: 'gram-hsk5-4-idiomatic-patterns',
        title: 'Structures idiomatiques',
        titleEn: 'Idiomatic Patterns',
        duration: 40,
        completed: false,
        locked: false,
        hskLevel: 5,
        category: 'grammar',
        difficulty: 'advanced',
        tags: ["idioms"],
        introduction: {
          title: 'Expressions idiomatiques',
          titleEn: 'Idiomatic Expressions',
          content: 'Apprenez les structures grammaticales idiomatiques du chinois.',
          contentEn: 'Learn idiomatic grammatical structures of Chinese.',
          objectives: [
            'Chengyu et structures',
            'Expressions figées',
            'Patterns culturels',
            'Usage naturel'
          ],
          objectivesEn: [
            'Chengyu and structures',
            'Fixed expressions',
            'Cultural patterns',
            'Natural usage'
          ]
        },
        flashcards: ['难怪', '怪不得', '别说', '更不用说', '说不定', '算了', '难免', '未免'],
        quizQuestions: 10
      },
{
        id: 'reading-hsk5-1-literature',
        title: 'Extraits littéraires',
        titleEn: 'Literary Excerpts',
        duration: 45,
        completed: false,
        locked: false,
        hskLevel: 5,
        category: 'reading',
        difficulty: 'advanced',
        tags: ["literature", "reading"],
        introduction: {
          title: 'Littérature contemporaine',
          titleEn: 'Contemporary Literature',
          content: 'Découvrez des extraits de la littérature chinoise moderne.',
          contentEn: 'Discover excerpts from modern Chinese literature.',
          objectives: [
            'Style littéraire',
            'Analyse de textes',
            'Comprendre le contexte',
            'Appréciation esthétique'
          ],
          objectivesEn: [
            'Literary style',
            'Text analysis',
            'Understand context',
            'Aesthetic appreciation'
          ]
        },
        flashcards: ['作家', '作品', '小说', '散文', '情节', '人物', '风格', '主题'],
        quizQuestions: 12
      },
{
        id: 'reading-hsk5-2-essays',
        title: 'Essais et articles',
        titleEn: 'Essays and Articles',
        duration: 45,
        completed: false,
        locked: false,
        hskLevel: 5,
        category: 'reading',
        difficulty: 'advanced',
        tags: ["reading"],
        introduction: {
          title: 'Textes argumentatifs',
          titleEn: 'Argumentative Texts',
          content: 'Lisez et analysez des essais et articles d\'opinion.',
          contentEn: 'Read and analyze essays and opinion articles.',
          objectives: [
            'Identifier les arguments',
            'Analyser la structure',
            'Évaluer la logique',
            'Point de vue critique'
          ],
          objectivesEn: [
            'Identify arguments',
            'Analyze structure',
            'Evaluate logic',
            'Critical viewpoint'
          ]
        },
        flashcards: ['论点', '论据', '分析', '评价', '观点', '立场', '逻辑', '结论'],
        quizQuestions: 12
      },
{
        id: 'reading-hsk5-3-reports',
        title: 'Rapports et études',
        titleEn: 'Reports and Studies',
        duration: 45,
        completed: false,
        locked: false,
        hskLevel: 5,
        category: 'reading',
        difficulty: 'advanced',
        tags: ["reading"],
        introduction: {
          title: 'Documents professionnels',
          titleEn: 'Professional Documents',
          content: 'Comprenez des rapports, études et documents professionnels.',
          contentEn: 'Understand reports, studies and professional documents.',
          objectives: [
            'Langage formel',
            'Données et statistiques',
            'Méthodologie',
            'Conclusions'
          ],
          objectivesEn: [
            'Formal language',
            'Data and statistics',
            'Methodology',
            'Conclusions'
          ]
        },
        flashcards: ['报告', '研究', '调查', '数据', '统计', '方法', '结果', '建议'],
        quizQuestions: 12
      },
{
        id: 'reading-hsk5-4-media',
        title: 'Médias et actualité',
        titleEn: 'Media and Current Events',
        duration: 45,
        completed: false,
        locked: false,
        hskLevel: 5,
        category: 'reading',
        difficulty: 'advanced',
        tags: ["reading"],
        introduction: {
          title: 'Presse et médias',
          titleEn: 'Press and Media',
          content: 'Lisez des articles de presse et comprenez l\'actualité.',
          contentEn: 'Read press articles and understand current events.',
          objectives: [
            'Langage journalistique',
            'Faits et opinions',
            'Sources d\'information',
            'Analyse critique'
          ],
          objectivesEn: [
            'Journalistic language',
            'Facts and opinions',
            'Information sources',
            'Critical analysis'
          ]
        },
        flashcards: ['新闻', '媒体', '报道', '评论', '来源', '事实', '观点', '分析'],
        quizQuestions: 12
      },
{
        id: 'writing-hsk5-1-essays',
        title: 'Rédaction d\'essais',
        titleEn: 'Essay Writing',
        duration: 45,
        completed: false,
        locked: false,
        hskLevel: 5,
        category: 'writing',
        difficulty: 'advanced',
        tags: ["general"],
        introduction: {
          title: 'Essais argumentatifs',
          titleEn: 'Argumentative Essays',
          content: 'Apprenez à rédiger des essais structurés et convaincants.',
          contentEn: 'Learn to write structured and convincing essays.',
          objectives: [
            'Structure d\'essai',
            'Développer des arguments',
            'Exemples et preuves',
            'Conclusion forte'
          ],
          objectivesEn: [
            'Essay structure',
            'Develop arguments',
            'Examples and evidence',
            'Strong conclusion'
          ]
        },
        flashcards: ['论文', '引言', '正文', '论证', '例证', '反驳', '总结', '结论'],
        quizQuestions: 10
      },
{
        id: 'writing-hsk5-2-reports',
        title: 'Rédaction de rapports',
        titleEn: 'Report Writing',
        duration: 45,
        completed: false,
        locked: false,
        hskLevel: 5,
        category: 'writing',
        difficulty: 'advanced',
        tags: ["general"],
        introduction: {
          title: 'Rapports professionnels',
          titleEn: 'Professional Reports',
          content: 'Maîtrisez la rédaction de rapports formels et professionnels.',
          contentEn: 'Master writing formal and professional reports.',
          objectives: [
            'Format de rapport',
            'Présenter des données',
            'Analyse objective',
            'Recommandations'
          ],
          objectivesEn: [
            'Report format',
            'Present data',
            'Objective analysis',
            'Recommendations'
          ]
        },
        flashcards: ['报告', '摘要', '背景', '方法', '结果', '分析', '讨论', '建议'],
        quizQuestions: 10
      },
{
        id: 'writing-hsk5-3-correspondence',
        title: 'Correspondance formelle',
        titleEn: 'Formal Correspondence',
        duration: 40,
        completed: false,
        locked: false,
        hskLevel: 5,
        category: 'writing',
        difficulty: 'advanced',
        tags: ["general"],
        introduction: {
          title: 'Lettres et e-mails formels',
          titleEn: 'Formal Letters and Emails',
          content: 'Rédigez des lettres et e-mails professionnels appropriés.',
          contentEn: 'Write appropriate professional letters and emails.',
          objectives: [
            'Format formel',
            'Formules de politesse',
            'Ton approprié',
            'Clarté et précision'
          ],
          objectivesEn: [
            'Formal format',
            'Polite expressions',
            'Appropriate tone',
            'Clarity and precision'
          ]
        },
        flashcards: ['信函', '敬启', '贵方', '致函', '附件', '盼复', '顺颂', '敬上'],
        quizQuestions: 10
      },
{
        id: 'writing-hsk5-4-proposals',
        title: 'Propositions et projets',
        titleEn: 'Proposals and Projects',
        duration: 45,
        completed: false,
        locked: false,
        hskLevel: 5,
        category: 'writing',
        difficulty: 'advanced',
        tags: ["general"],
        introduction: {
          title: 'Rédiger des propositions',
          titleEn: 'Writing Proposals',
          content: 'Apprenez à rédiger des propositions de projets convaincantes.',
          contentEn: 'Learn to write convincing project proposals.',
          objectives: [
            'Présenter un projet',
            'Justifier l\'intérêt',
            'Plan d\'action',
            'Budget et ressources'
          ],
          objectivesEn: [
            'Present a project',
            'Justify interest',
            'Action plan',
            'Budget and resources'
          ]
        },
        flashcards: ['方案', '提案', '目标', '计划', '实施', '预算', '效益', '评估'],
        quizQuestions: 10
      },
{
        id: 'idiom-hsk6-1-chengyu',
        title: 'Chengyu classiques',
        titleEn: 'Classical Chengyu',
        duration: 50,
        completed: false,
        locked: false,
        hskLevel: 6,
        category: 'culture',
        difficulty: 'superior',
        tags: ["idioms"],
        introduction: {
          title: 'Expressions de 4 caractères',
          titleEn: '4-Character Expressions',
          content: 'Découvrez les chengyu les plus utilisés et leur contexte culturel.',
          contentEn: 'Discover the most commonly used chengyu and their cultural context.',
          objectives: [
            'Comprendre l\'origine',
            'Usage approprié',
            'Connotations culturelles',
            'Variations modernes'
          ],
          objectivesEn: [
            'Understand origins',
            'Appropriate usage',
            'Cultural connotations',
            'Modern variations'
          ]
        },
        flashcards: ['一举两得', '画蛇添足', '井底之蛙', '刻舟求剑', '守株待兔', '亡羊补牢', '掩耳盗铃', '自相矛盾'],
        quizQuestions: 12
      },
{
        id: 'idiom-hsk6-2-proverbs',
        title: 'Proverbes et dictons',
        titleEn: 'Proverbs and Sayings',
        duration: 50,
        completed: false,
        locked: false,
        hskLevel: 6,
        category: 'culture',
        difficulty: 'superior',
        tags: ["idioms"],
        introduction: {
          title: 'Sagesse populaire',
          titleEn: 'Popular Wisdom',
          content: 'Apprenez les proverbes chinois et leur sagesse ancestrale.',
          contentEn: 'Learn Chinese proverbs and their ancestral wisdom.',
          objectives: [
            'Proverbes courants',
            'Contexte d\'utilisation',
            'Équivalents en français',
            'Valeurs culturelles'
          ],
          objectivesEn: [
            'Common proverbs',
            'Usage context',
            'French equivalents',
            'Cultural values'
          ]
        },
        flashcards: ['熟能生巧', '有志者事竟成', '百闻不如一见', '塞翁失马', '三人行必有我师', '学无止境', '水滴石穿', '失败是成功之母'],
        quizQuestions: 12
      },
{
        id: 'idiom-hsk6-3-metaphors',
        title: 'Métaphores et langage figuré',
        titleEn: 'Metaphors and Figurative Language',
        duration: 50,
        completed: false,
        locked: false,
        hskLevel: 6,
        category: 'culture',
        difficulty: 'superior',
        tags: ["idioms"],
        introduction: {
          title: 'Langage poétique',
          titleEn: 'Poetic Language',
          content: 'Explorez les métaphores et le langage figuré du chinois.',
          contentEn: 'Explore Chinese metaphors and figurative language.',
          objectives: [
            'Métaphores courantes',
            'Images poétiques',
            'Références culturelles',
            'Utilisation créative'
          ],
          objectivesEn: [
            'Common metaphors',
            'Poetic images',
            'Cultural references',
            'Creative usage'
          ]
        },
        flashcards: ['如虎添翼', '雪中送炭', '锦上添花', '画龙点睛', '火上浇油', '釜底抽薪', '对牛弹琴', '胸有成竹'],
        quizQuestions: 12
      },
{
        id: 'idiom-hsk6-4-collocations',
        title: 'Collocations avancées',
        titleEn: 'Advanced Collocations',
        duration: 45,
        completed: false,
        locked: false,
        hskLevel: 6,
        category: 'culture',
        difficulty: 'superior',
        tags: ["idioms", "location"],
        introduction: {
          title: 'Associations naturelles',
          titleEn: 'Natural Associations',
          content: 'Maîtrisez les collocations pour un chinois plus naturel.',
          contentEn: 'Master collocations for more natural Chinese.',
          objectives: [
            'Collocations verbales',
            'Collocations nominales',
            'Adjectifs idiomatiques',
            'Usage naturel'
          ],
          objectivesEn: [
            'Verbal collocations',
            'Nominal collocations',
            'Idiomatic adjectives',
            'Natural usage'
          ]
        },
        flashcards: ['大显身手', '大失所望', '大惊小怪', '小题大做', '深入浅出', '苦尽甘来', '喜出望外', '恍然大悟'],
        quizQuestions: 12
      },
{
        id: 'lit-hsk6-1-poetry',
        title: 'Poésie classique',
        titleEn: 'Classical Poetry',
        duration: 50,
        completed: false,
        locked: false,
        hskLevel: 6,
        category: 'culture',
        difficulty: 'superior',
        tags: ["literature"],
        introduction: {
          title: 'Chefs-d\'œuvre poétiques',
          titleEn: 'Poetic Masterpieces',
          content: 'Lisez et appréciez la poésie classique chinoise.',
          contentEn: 'Read and appreciate classical Chinese poetry.',
          objectives: [
            'Poèmes Tang et Song',
            'Formes poétiques',
            'Thèmes classiques',
            'Appréciation esthétique'
          ],
          objectivesEn: [
            'Tang and Song poems',
            'Poetic forms',
            'Classical themes',
            'Aesthetic appreciation'
          ]
        },
        flashcards: ['诗', '词', '韵', '格律', '意境', '典故', '修辞', '意象'],
        quizQuestions: 12
      },
{
        id: 'lit-hsk6-2-prose',
        title: 'Prose classique',
        titleEn: 'Classical Prose',
        duration: 50,
        completed: false,
        locked: false,
        hskLevel: 6,
        category: 'culture',
        difficulty: 'superior',
        tags: ["literature"],
        introduction: {
          title: 'Textes en prose',
          titleEn: 'Prose Texts',
          content: 'Explorez les textes philosophiques et littéraires classiques.',
          contentEn: 'Explore classical philosophical and literary texts.',
          objectives: [
            'Styles classiques',
            'Philosophes chinois',
            'Textes historiques',
            'Interprétation'
          ],
          objectivesEn: [
            'Classical styles',
            'Chinese philosophers',
            'Historical texts',
            'Interpretation'
          ]
        },
        flashcards: ['散文', '古文', '文言', '典籍', '经典', '注释', '传承', '思想'],
        quizQuestions: 12
      },
{
        id: 'lit-hsk6-3-novels',
        title: 'Romans classiques',
        titleEn: 'Classical Novels',
        duration: 50,
        completed: false,
        locked: false,
        hskLevel: 6,
        category: 'culture',
        difficulty: 'superior',
        tags: ["literature"],
        introduction: {
          title: 'Grands romans',
          titleEn: 'Great Novels',
          content: 'Découvrez les quatre grands romans classiques et autres œuvres.',
          contentEn: 'Discover the four great classical novels and other works.',
          objectives: [
            'Quatre grands romans',
            'Personnages emblématiques',
            'Thèmes majeurs',
            'Impact culturel'
          ],
          objectivesEn: [
            'Four great novels',
            'Iconic characters',
            'Major themes',
            'Cultural impact'
          ]
        },
        flashcards: ['红楼梦', '水浒传', '西游记', '三国演义', '章回', '人物', '情节', '主题'],
        quizQuestions: 12
      },
{
        id: 'lit-hsk6-4-modern-classics',
        title: 'Classiques modernes',
        titleEn: 'Modern Classics',
        duration: 50,
        completed: false,
        locked: false,
        hskLevel: 6,
        category: 'culture',
        difficulty: 'superior',
        tags: ["literature"],
        introduction: {
          title: 'Littérature du 20e siècle',
          titleEn: '20th Century Literature',
          content: 'Lisez les grands auteurs chinois modernes.',
          contentEn: 'Read great modern Chinese authors.',
          objectives: [
            'Auteurs majeurs',
            'Mouvements littéraires',
            'Contexte historique',
            'Style moderne'
          ],
          objectivesEn: [
            'Major authors',
            'Literary movements',
            'Historical context',
            'Modern style'
          ]
        },
        flashcards: ['鲁迅', '巴金', '老舍', '茅盾', '现代文学', '白话文', '新文化', '批判'],
        quizQuestions: 12
      },
{
        id: 'prof-hsk6-1-business',
        title: 'Documents commerciaux',
        titleEn: 'Business Documents',
        duration: 50,
        completed: false,
        locked: false,
        hskLevel: 6,
        category: 'conversation',
        difficulty: 'superior',
        tags: ["business"],
        introduction: {
          title: 'Communication d\'affaires',
          titleEn: 'Business Communication',
          content: 'Lisez et rédigez des documents commerciaux professionnels.',
          contentEn: 'Read and write professional business documents.',
          objectives: [
            'Contrats',
            'Rapports d\'activité',
            'Correspondance commerciale',
            'Présentations'
          ],
          objectivesEn: [
            'Contracts',
            'Activity reports',
            'Business correspondence',
            'Presentations'
          ]
        },
        flashcards: ['合同', '协议', '条款', '履行', '违约', '索赔', '仲裁', '甲方乙方'],
        quizQuestions: 12
      },
{
        id: 'prof-hsk6-2-technical',
        title: 'Textes techniques',
        titleEn: 'Technical Texts',
        duration: 50,
        completed: false,
        locked: false,
        hskLevel: 6,
        category: 'conversation',
        difficulty: 'superior',
        tags: ["business"],
        introduction: {
          title: 'Documentation technique',
          titleEn: 'Technical Documentation',
          content: 'Comprenez les manuels techniques et spécifications.',
          contentEn: 'Understand technical manuals and specifications.',
          objectives: [
            'Terminologie technique',
            'Manuels d\'utilisation',
            'Spécifications',
            'Procédures'
          ],
          objectivesEn: [
            'Technical terminology',
            'User manuals',
            'Specifications',
            'Procedures'
          ]
        },
        flashcards: ['技术', '规格', '参数', '性能', '操作', '维护', '故障', '排除'],
        quizQuestions: 12
      },
{
        id: 'prof-hsk6-3-academic',
        title: 'Textes académiques',
        titleEn: 'Academic Texts',
        duration: 50,
        completed: false,
        locked: false,
        hskLevel: 6,
        category: 'conversation',
        difficulty: 'superior',
        tags: ["business", "academic"],
        introduction: {
          title: 'Communication académique',
          titleEn: 'Academic Communication',
          content: 'Lisez et écrivez des textes académiques de niveau avancé.',
          contentEn: 'Read and write advanced academic texts.',
          objectives: [
            'Articles de recherche',
            'Thèses',
            'Bibliographie',
            'Argumentation académique'
          ],
          objectivesEn: [
            'Research articles',
            'Theses',
            'Bibliography',
            'Academic argumentation'
          ]
        },
        flashcards: ['论文', '研究', '假说', '实验', '证据', '结论', '文献', '引用'],
        quizQuestions: 12
      },
{
        id: 'prof-hsk6-4-legal',
        title: 'Textes juridiques',
        titleEn: 'Legal Texts',
        duration: 50,
        completed: false,
        locked: false,
        hskLevel: 6,
        category: 'conversation',
        difficulty: 'superior',
        tags: ["business"],
        introduction: {
          title: 'Langage juridique',
          titleEn: 'Legal Language',
          content: 'Comprenez les bases du langage juridique chinois.',
          contentEn: 'Understand the basics of Chinese legal language.',
          objectives: [
            'Terminologie juridique',
            'Structure des lois',
            'Documents légaux',
            'Droits et obligations'
          ],
          objectivesEn: [
            'Legal terminology',
            'Law structure',
            'Legal documents',
            'Rights and obligations'
          ]
        },
        flashcards: ['法律', '法规', '条例', '权利', '义务', '诉讼', '判决', '法院'],
        quizQuestions: 12
      },
{
        id: 'rhet-hsk6-1-persuasion',
        title: 'Techniques de persuasion',
        titleEn: 'Persuasion Techniques',
        duration: 50,
        completed: false,
        locked: false,
        hskLevel: 6,
        category: 'conversation',
        difficulty: 'superior',
        tags: ["general"],
        introduction: {
          title: 'Art de convaincre',
          titleEn: 'Art of Persuasion',
          content: 'Apprenez les techniques rhétoriques pour convaincre.',
          contentEn: 'Learn rhetorical techniques to persuade.',
          objectives: [
            'Ethos, pathos, logos',
            'Arguments rationnels',
            'Appel émotionnel',
            'Crédibilité'
          ],
          objectivesEn: [
            'Ethos, pathos, logos',
            'Rational arguments',
            'Emotional appeal',
            'Credibility'
          ]
        },
        flashcards: ['说服', '论证', '理性', '感性', '信服', '辩护', '反驳', '证明'],
        quizQuestions: 12
      },
{
        id: 'rhet-hsk6-2-debate',
        title: 'Débat structuré',
        titleEn: 'Structured Debate',
        duration: 50,
        completed: false,
        locked: false,
        hskLevel: 6,
        category: 'conversation',
        difficulty: 'superior',
        tags: ["debate", "opinions"],
        introduction: {
          title: 'Art du débat',
          titleEn: 'Art of Debate',
          content: 'Maîtrisez les techniques du débat formel.',
          contentEn: 'Master formal debate techniques.',
          objectives: [
            'Structure de débat',
            'Contre-arguments',
            'Réfutation',
            'Synthèse finale'
          ],
          objectivesEn: [
            'Debate structure',
            'Counter-arguments',
            'Refutation',
            'Final synthesis'
          ]
        },
        flashcards: ['辩论', '立场', '反方', '正方', '质疑', '驳斥', '总结', '裁判'],
        quizQuestions: 12
      },
{
        id: 'rhet-hsk6-3-public-speaking',
        title: 'Discours public',
        titleEn: 'Public Speaking',
        duration: 50,
        completed: false,
        locked: false,
        hskLevel: 6,
        category: 'conversation',
        difficulty: 'superior',
        tags: ["general"],
        introduction: {
          title: 'Expression orale publique',
          titleEn: 'Public Oral Expression',
          content: 'Développez vos compétences en prise de parole publique.',
          contentEn: 'Develop your public speaking skills.',
          objectives: [
            'Structure de discours',
            'Captiver l\'audience',
            'Langage corporel',
            'Impact émotionnel'
          ],
          objectivesEn: [
            'Speech structure',
            'Captivate audience',
            'Body language',
            'Emotional impact'
          ]
        },
        flashcards: ['演讲', '开场白', '论点', '论据', '例子', '高潮', '结尾', '互动'],
        quizQuestions: 12
      },
{
        id: 'rhet-hsk6-4-critical-thinking',
        title: 'Pensée critique',
        titleEn: 'Critical Thinking',
        duration: 50,
        completed: false,
        locked: false,
        hskLevel: 6,
        category: 'conversation',
        difficulty: 'superior',
        tags: ["general"],
        introduction: {
          title: 'Analyse critique',
          titleEn: 'Critical Analysis',
          content: 'Développez votre esprit critique et analytique.',
          contentEn: 'Develop your critical and analytical thinking.',
          objectives: [
            'Identifier les sophismes',
            'Évaluer les sources',
            'Logique argumentative',
            'Biais cognitifs'
          ],
          objectivesEn: [
            'Identify fallacies',
            'Evaluate sources',
            'Argumentative logic',
            'Cognitive biases'
          ]
        },
        flashcards: ['批判性思维', '逻辑', '谬误', '偏见', '客观', '主观', '证据', '推理'],
        quizQuestions: 12
      },
{
        id: 'acad-hsk7-1-research',
        title: 'Méthodologie de recherche',
        titleEn: 'Research Methodology',
        duration: 60,
        completed: false,
        locked: false,
        hskLevel: 7,
        category: 'reading',
        difficulty: 'superior',
        tags: ["academic"],
        introduction: {
          title: 'Recherche académique',
          titleEn: 'Academic Research',
          content: 'Comprenez et rédigez des travaux de recherche de niveau doctoral.',
          contentEn: 'Understand and write doctoral-level research work.',
          objectives: [
            'Problématique de recherche',
            'Revue de littérature',
            'Méthodologie',
            'Résultats et discussion'
          ],
          objectivesEn: [
            'Research question',
            'Literature review',
            'Methodology',
            'Results and discussion'
          ]
        },
        flashcards: ['课题', '研究方法', '假设', '变量', '样本', '数据分析', '有效性', '可靠性'],
        quizQuestions: 15
      },
{
        id: 'acad-hsk7-2-academic-writing',
        title: 'Rédaction académique',
        titleEn: 'Academic Writing',
        duration: 60,
        completed: false,
        locked: false,
        hskLevel: 7,
        category: 'reading',
        difficulty: 'superior',
        tags: ["academic"],
        introduction: {
          title: 'Style académique avancé',
          titleEn: 'Advanced Academic Style',
          content: 'Perfectionnez votre style d\'écriture académique en chinois.',
          contentEn: 'Perfect your academic writing style in Chinese.',
          objectives: [
            'Précision terminologique',
            'Argumentation complexe',
            'Citations et références',
            'Objectivité scientifique'
          ],
          objectivesEn: [
            'Terminological precision',
            'Complex argumentation',
            'Citations and references',
            'Scientific objectivity'
          ]
        },
        flashcards: ['论述', '阐述', '综述', '述评', '引证', '参考文献', '脚注', '摘要'],
        quizQuestions: 15
      },
{
        id: 'acad-hsk7-3-specialized',
        title: 'Domaines spécialisés',
        titleEn: 'Specialized Fields',
        duration: 60,
        completed: false,
        locked: false,
        hskLevel: 7,
        category: 'reading',
        difficulty: 'superior',
        tags: ["academic"],
        introduction: {
          title: 'Terminologie spécialisée',
          titleEn: 'Specialized Terminology',
          content: 'Apprenez le vocabulaire de différents domaines académiques.',
          contentEn: 'Learn vocabulary from different academic fields.',
          objectives: [
            'Sciences humaines',
            'Sciences sociales',
            'Sciences naturelles',
            'Sciences formelles'
          ],
          objectivesEn: [
            'Humanities',
            'Social sciences',
            'Natural sciences',
            'Formal sciences'
          ]
        },
        flashcards: ['理论', '概念', '范畴', '体系', '模型', '框架', '范式', '学派'],
        quizQuestions: 15
      },
{
        id: 'acad-hsk7-4-conferences',
        title: 'Conférences académiques',
        titleEn: 'Academic Conferences',
        duration: 55,
        completed: false,
        locked: false,
        hskLevel: 7,
        category: 'reading',
        difficulty: 'superior',
        tags: ["academic"],
        introduction: {
          title: 'Communication scientifique',
          titleEn: 'Scientific Communication',
          content: 'Participez et présentez lors de conférences académiques.',
          contentEn: 'Participate and present at academic conferences.',
          objectives: [
            'Présentation orale',
            'Questions-réponses',
            'Débat scientifique',
            'Réseautage académique'
          ],
          objectivesEn: [
            'Oral presentation',
            'Q&A session',
            'Scientific debate',
            'Academic networking'
          ]
        },
        flashcards: ['演讲', '报告', '提问', '讨论', '评议', '交流', '合作', '学术界'],
        quizQuestions: 15
      },
{
        id: 'spec-hsk7-1-philosophy',
        title: 'Philosophie chinoise',
        titleEn: 'Chinese Philosophy',
        duration: 60,
        completed: false,
        locked: false,
        hskLevel: 7,
        category: 'reading',
        difficulty: 'superior',
        tags: ["general"],
        introduction: {
          title: 'Pensée philosophique',
          titleEn: 'Philosophical Thought',
          content: 'Explorez les textes philosophiques classiques et modernes.',
          contentEn: 'Explore classical and modern philosophical texts.',
          objectives: [
            'Confucianisme',
            'Taoïsme',
            'Bouddhisme',
            'Philosophie contemporaine'
          ],
          objectivesEn: [
            'Confucianism',
            'Taoism',
            'Buddhism',
            'Contemporary philosophy'
          ]
        },
        flashcards: ['道', '德', '仁', '义', '礼', '智', '信', '天人合一'],
        quizQuestions: 15
      },
{
        id: 'spec-hsk7-2-history',
        title: 'Textes historiques',
        titleEn: 'Historical Texts',
        duration: 60,
        completed: false,
        locked: false,
        hskLevel: 7,
        category: 'reading',
        difficulty: 'superior',
        tags: ["general"],
        introduction: {
          title: 'Documents historiques',
          titleEn: 'Historical Documents',
          content: 'Lisez et analysez des documents historiques chinois.',
          contentEn: 'Read and analyze Chinese historical documents.',
          objectives: [
            'Annales historiques',
            'Documents officiels',
            'Chroniques',
            'Historiographie'
          ],
          objectivesEn: [
            'Historical annals',
            'Official documents',
            'Chronicles',
            'Historiography'
          ]
        },
        flashcards: ['史记', '编年', '纪传', '朝代', '帝王', '变革', '兴衰', '沿革'],
        quizQuestions: 15
      },
{
        id: 'spec-hsk7-3-science',
        title: 'Textes scientifiques',
        titleEn: 'Scientific Texts',
        duration: 60,
        completed: false,
        locked: false,
        hskLevel: 7,
        category: 'reading',
        difficulty: 'superior',
        tags: ["general"],
        introduction: {
          title: 'Communication scientifique',
          titleEn: 'Scientific Communication',
          content: 'Comprenez la littérature scientifique spécialisée.',
          contentEn: 'Understand specialized scientific literature.',
          objectives: [
            'Articles de recherche',
            'Revues spécialisées',
            'Rapports techniques',
            'Innovations'
          ],
          objectivesEn: [
            'Research articles',
            'Specialized journals',
            'Technical reports',
            'Innovations'
          ]
        },
        flashcards: ['实验', '观察', '测量', '分析', '理论', '应用', '创新', '突破'],
        quizQuestions: 15
      },
{
        id: 'spec-hsk7-4-arts',
        title: 'Arts et esthétique',
        titleEn: 'Arts and Aesthetics',
        duration: 60,
        completed: false,
        locked: false,
        hskLevel: 7,
        category: 'reading',
        difficulty: 'superior',
        tags: ["general"],
        introduction: {
          title: 'Critique artistique',
          titleEn: 'Artistic Criticism',
          content: 'Analysez des textes sur l\'art et l\'esthétique chinoise.',
          contentEn: 'Analyze texts on Chinese art and aesthetics.',
          objectives: [
            'Théorie artistique',
            'Critique d\'art',
            'Esthétique chinoise',
            'Mouvements artistiques'
          ],
          objectivesEn: [
            'Artistic theory',
            'Art criticism',
            'Chinese aesthetics',
            'Artistic movements'
          ]
        },
        flashcards: ['艺术', '美学', '鉴赏', '风格', '流派', '创作', '表现', '意境'],
        quizQuestions: 15
      },
{
        id: 'style-hsk7-1-registers',
        title: 'Registres de langue',
        titleEn: 'Language Registers',
        duration: 55,
        completed: false,
        locked: false,
        hskLevel: 7,
        category: 'reading',
        difficulty: 'superior',
        tags: ["general"],
        introduction: {
          title: 'Maîtrise des registres',
          titleEn: 'Mastery of Registers',
          content: 'Naviguez avec aisance entre les différents registres de langue.',
          contentEn: 'Navigate easily between different language registers.',
          objectives: [
            'Formel vs informel',
            'Oral vs écrit',
            'Littéraire vs quotidien',
            'Adaptation contextuelle'
          ],
          objectivesEn: [
            'Formal vs informal',
            'Oral vs written',
            'Literary vs everyday',
            'Contextual adaptation'
          ]
        },
        flashcards: ['正式', '非正式', '书面语', '口语', '文言', '白话', '雅语', '俗语'],
        quizQuestions: 15
      },
{
        id: 'style-hsk7-2-subtlety',
        title: 'Nuances et subtilités',
        titleEn: 'Nuances and Subtleties',
        duration: 55,
        completed: false,
        locked: false,
        hskLevel: 7,
        category: 'reading',
        difficulty: 'superior',
        tags: ["general"],
        introduction: {
          title: 'Expression nuancée',
          titleEn: 'Nuanced Expression',
          content: 'Exprimez des idées avec précision et subtilité.',
          contentEn: 'Express ideas with precision and subtlety.',
          objectives: [
            'Connotations',
            'Implicites culturels',
            'Sous-entendus',
            'Euphémismes'
          ],
          objectivesEn: [
            'Connotations',
            'Cultural implications',
            'Undertones',
            'Euphemisms'
          ]
        },
        flashcards: ['含蓄', '委婉', '暗示', '隐喻', '双关', '讽刺', '幽默', '反讽'],
        quizQuestions: 15
      },
{
        id: 'style-hsk7-3-eloquence',
        title: 'Éloquence et rhétorique',
        titleEn: 'Eloquence and Rhetoric',
        duration: 55,
        completed: false,
        locked: false,
        hskLevel: 7,
        category: 'reading',
        difficulty: 'superior',
        tags: ["general"],
        introduction: {
          title: 'Art de l\'éloquence',
          titleEn: 'Art of Eloquence',
          content: 'Développez un style éloquent et persuasif.',
          contentEn: 'Develop an eloquent and persuasive style.',
          objectives: [
            'Figures de style',
            'Rythme et sonorité',
            'Élégance stylistique',
            'Impact rhétorique'
          ],
          objectivesEn: [
            'Figures of speech',
            'Rhythm and sonority',
            'Stylistic elegance',
            'Rhetorical impact'
          ]
        },
        flashcards: ['修辞', '比喻', '夸张', '对偶', '排比', '反复', '设问', '反问'],
        quizQuestions: 15
      },
{
        id: 'style-hsk7-4-creative',
        title: 'Écriture créative',
        titleEn: 'Creative Writing',
        duration: 60,
        completed: false,
        locked: false,
        hskLevel: 7,
        category: 'reading',
        difficulty: 'superior',
        tags: ["general"],
        introduction: {
          title: 'Expression créative',
          titleEn: 'Creative Expression',
          content: 'Libérez votre créativité en chinois.',
          contentEn: 'Unleash your creativity in Chinese.',
          objectives: [
            'Style personnel',
            'Innovation linguistique',
            'Expérimentation',
            'Voix unique'
          ],
          objectivesEn: [
            'Personal style',
            'Linguistic innovation',
            'Experimentation',
            'Unique voice'
          ]
        },
        flashcards: ['创作', '灵感', '想象', '创意', '表达', '独特', '风采', '文采'],
        quizQuestions: 15
      },
{
        id: 'cult-hsk7-1-traditions',
        title: 'Traditions ancestrales',
        titleEn: 'Ancestral Traditions',
        duration: 60,
        completed: false,
        locked: false,
        hskLevel: 7,
        category: 'culture',
        difficulty: 'superior',
        tags: ["general"],
        introduction: {
          title: 'Patrimoine culturel',
          titleEn: 'Cultural Heritage',
          content: 'Explorez en profondeur les traditions millénaires chinoises.',
          contentEn: 'Explore in depth the thousand-year-old Chinese traditions.',
          objectives: [
            'Rituels et cérémonies',
            'Fêtes traditionnelles',
            'Coutumes ancestrales',
            'Transmission culturelle'
          ],
          objectivesEn: [
            'Rituals and ceremonies',
            'Traditional festivals',
            'Ancestral customs',
            'Cultural transmission'
          ]
        },
        flashcards: ['传统', '习俗', '仪式', '祭祀', '礼仪', '节日', '庆典', '传承'],
        quizQuestions: 15
      },
{
        id: 'cult-hsk7-2-values',
        title: 'Valeurs et mentalité',
        titleEn: 'Values and Mentality',
        duration: 60,
        completed: false,
        locked: false,
        hskLevel: 7,
        category: 'culture',
        difficulty: 'superior',
        tags: ["general"],
        introduction: {
          title: 'Système de valeurs',
          titleEn: 'Value System',
          content: 'Comprenez les valeurs fondamentales de la société chinoise.',
          contentEn: 'Understand the fundamental values of Chinese society.',
          objectives: [
            'Valeurs confucéennes',
            'Harmonie sociale',
            'Piété filiale',
            'Collectivisme'
          ],
          objectivesEn: [
            'Confucian values',
            'Social harmony',
            'Filial piety',
            'Collectivism'
          ]
        },
        flashcards: ['价值观', '道德', '孝道', '和谐', '中庸', '面子', '人情', '关系'],
        quizQuestions: 15
      },
{
        id: 'cult-hsk7-3-historical',
        title: 'Contexte historique',
        titleEn: 'Historical Context',
        duration: 60,
        completed: false,
        locked: false,
        hskLevel: 7,
        category: 'culture',
        difficulty: 'superior',
        tags: ["general"],
        introduction: {
          title: 'Histoire et culture',
          titleEn: 'History and Culture',
          content: 'Comprenez l\'influence de l\'histoire sur la culture actuelle.',
          contentEn: 'Understand the influence of history on current culture.',
          objectives: [
            'Grandes dynasties',
            'Révolutions culturelles',
            'Modernisation',
            'Identité contemporaine'
          ],
          objectivesEn: [
            'Great dynasties',
            'Cultural revolutions',
            'Modernization',
            'Contemporary identity'
          ]
        },
        flashcards: ['历史', '朝代', '变迁', '改革', '现代化', '传统与现代', '继承', '发展'],
        quizQuestions: 15
      },
{
        id: 'cult-hsk7-4-contemporary',
        title: 'Culture contemporaine',
        titleEn: 'Contemporary Culture',
        duration: 60,
        completed: false,
        locked: false,
        hskLevel: 7,
        category: 'culture',
        difficulty: 'superior',
        tags: ["general"],
        introduction: {
          title: 'Chine moderne',
          titleEn: 'Modern China',
          content: 'Analysez la culture chinoise contemporaine et ses évolutions.',
          contentEn: 'Analyze contemporary Chinese culture and its evolutions.',
          objectives: [
            'Culture populaire',
            'Médias et société',
            'Urbanisation',
            'Globalisation culturelle'
          ],
          objectivesEn: [
            'Popular culture',
            'Media and society',
            'Urbanization',
            'Cultural globalization'
          ]
        },
        flashcards: ['当代', '潮流', '都市', '网络文化', '流行', '时尚', '青年', '多元'],
        quizQuestions: 15
      }
    ]
  }
];

/**
 * Obtient une leçon par son ID
 */
export function getLessonModuleById(lessonId: string) {
  for (const path of lessonPaths) {
    const lesson = path.lessons.find(l => l.id === lessonId);
    if (lesson) {
      return lesson;
    }
  }
  return undefined;
}

/**
 * Obtient le parcours contenant une leçon donnée
 */
export function getPathForLesson(lessonId: string) {
  return lessonPaths.find(path =>
    path.lessons.some(lesson => lesson.id === lessonId)
  );
}
