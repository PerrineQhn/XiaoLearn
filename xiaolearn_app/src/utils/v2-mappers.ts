/**
 * v2-mappers.ts
 * -------------
 * Mappers centralisés V1 → V2 pour le swap direct des pages V2.
 *
 * Chaque mapper prend un type V1 existant (LessonModule, LessonItem…) et le
 * convertit en type autonome V2 attendu par les nouvelles pages.
 *
 * Isolé dans ce fichier pour garder App.tsx lisible.
 */

import type { LessonItem } from '../types';
import type { LessonModule } from '../types/lesson-structure';
import type { Language } from '../i18n';
import type {
  LessonV2Data,
  LessonV2Example,
  LessonV2Exercise,
  LessonV2HskLevel,
  LessonV2Category
} from '../pages/StructuredLessonPageV2';
import type {
  FlashcardV2Item,
  FlashcardsV2HskLevel,
  FlashcardV2SrsState
} from '../pages/FlashcardPageV2';
import type {
  GrammarDrillTopic
} from '../pages/GrammarDrillsPageV2';
import type {
  EvaluationV2Config
} from '../pages/EvaluationPageV2';
import type {
  CommunityV2Announcement,
  CommunityV2Challenge,
  CommunityV2LeaderboardEntry
} from '../pages/CommunityPageV2';
import { cecrExercisesV2All as cecrExercisesV2 } from '../data/cecr-exercises-all';

// ---------------------------------------------------------------------------
// LessonModule → LessonV2Data
// ---------------------------------------------------------------------------

const hskNumberToV2 = (level: number): LessonV2HskLevel => {
  if (level >= 1 && level <= 7) return `hsk${level}` as LessonV2HskLevel;
  return 'hsk1';
};

const lessonCategoryToV2 = (category: string): LessonV2Category => {
  switch (category) {
    case 'vocabulary':
    case 'grammar':
    case 'pronunciation':
    case 'conversation':
    case 'culture':
    case 'writing':
    case 'reading':
      return category as LessonV2Category;
    default:
      return 'vocabulary';
  }
};

/**
 * Convertit un LessonModule en LessonV2Data.
 * Les exemples et exercices sont dérivés des flashcards résolues.
 */
export function lessonModuleToV2(
  module: LessonModule,
  resolveFlashcards: (ids: string[]) => LessonItem[],
  language: Language = 'fr'
): LessonV2Data {
  const items = resolveFlashcards(module.flashcards);

  // Exemples : on prend les 5 premiers items avec leur premier exemple ou leur hanzi.
  // L'URL audio (MP3/WAV pré-enregistré) est propagée depuis LessonItem.audio /
  // audioLetter vers example.audio pour que les boutons 🔊 fonctionnent en
  // phase "Exemples" (règle produit : tout audio vient d'un fichier pré-généré,
  // jamais de Web Speech — cf. mémoire xiaolearn_audio_policy).
  //
  // RÈGLE IMPORTANTE : quand on utilise un `firstExample` (phrase multi-caractères),
  // on NE propage PAS le son du caractère unique `itemAudio` — sinon le bouton 🔊
  // joue « 他 » seul alors que la phrase affichée est « 他爱好音乐 ». Mieux vaut
  // masquer le bouton (audio undefined) que de jouer un son trompeur. Si l'exemple
  // porte son propre `audio` explicite, on le garde.
  const examples: LessonV2Example[] = items.slice(0, 5).map((item) => {
    const itemAudio = item.audio ?? item.audioLetter;
    const firstExample = item.examples?.[0];
    if (firstExample) {
      const explicitExampleAudio = (firstExample as any).audio as string | undefined;
      // On n'autorise le fallback vers itemAudio que si la phrase d'exemple est
      // en réalité ce caractère unique (cas rare) — sinon on laisse undefined.
      const fallback =
        firstExample.hanzi === item.hanzi ? itemAudio : undefined;
      return {
        hanzi: firstExample.hanzi,
        pinyin: firstExample.pinyin,
        translation: (firstExample as any).translationFr ?? firstExample.translation ?? '',
        translationEn: firstExample.translation,
        audio: explicitExampleAudio ?? fallback
      };
    }
    return {
      hanzi: item.hanzi,
      pinyin: item.pinyin,
      translation: item.translationFr ?? item.translation,
      translationEn: item.translation,
      audio: itemAudio
    };
  });

  // Exercices : priorité aux exercices CECR pré-générés (mcq + fill), sinon
  // fallback sur un QCM auto-généré à partir des flashcards.
  const curatedExercises = cecrExercisesV2[module.id];
  const exercises: LessonV2Exercise[] = curatedExercises && curatedExercises.length > 0
    ? curatedExercises
    : items.slice(0, 5).map((item, index) => {
        const distractors = items
          .filter((x) => x.id !== item.id)
          .slice(0, 3)
          .map((x) => x.hanzi);
        const choices = [...distractors.slice(0, 3), item.hanzi];
        const correctIndex = choices.indexOf(item.hanzi);
        return {
          id: `${module.id}-ex-${index}`,
          type: 'mcq',
          prompt: language === 'fr'
            ? `Quel hanzi correspond à « ${item.translationFr ?? item.translation} » ?`
            : `Which hanzi matches "${item.translation}"?`,
          promptEn: `Which hanzi matches "${item.translation}"?`,
          choices: choices.length >= 2 ? choices : [item.hanzi, '?'],
          correctIndex: correctIndex >= 0 ? correctIndex : 0,
          explanation: `${item.hanzi} (${item.pinyin}) — ${item.translationFr ?? item.translation}`,
          explanationEn: `${item.hanzi} (${item.pinyin}) — ${item.translation}`
        };
      });

  const intro = module.introduction;
  return {
    id: module.id,
    title: intro.title ?? module.title,
    titleEn: intro.titleEn ?? module.titleEn,
    subtitle: intro.quickIntro,
    subtitleEn: intro.quickIntroEn,
    level: hskNumberToV2(module.hskLevel),
    category: lessonCategoryToV2(module.category),
    estimatedMinutes: module.duration,
    objectives: intro.objectives ?? [],
    objectivesEn: intro.objectivesEn,
    // Propagation directe du contenu pédagogique manuel (phase learn).
    // Si absent, la page V2 skippe automatiquement l'étape (4 étapes au lieu de 5).
    learnSections: module.learnSections,
    examples: examples.length > 0 ? examples : [
      { hanzi: module.title, pinyin: '', translation: intro.title ?? '' }
    ],
    exercises: exercises.length > 0 ? exercises : [],
    keyTakeaways: intro.objectives?.slice(0, 3) ?? [],
    keyTakeawaysEn: intro.objectivesEn?.slice(0, 3),
    xpReward: 50,
    dialogue: module.dialogue,
    reading: module.reading
  };
}

// ---------------------------------------------------------------------------
// LessonItem → FlashcardV2Item
// ---------------------------------------------------------------------------

const levelToV2: Record<string, FlashcardsV2HskLevel> = {
  hsk1: 'hsk1',
  hsk2: 'hsk2',
  hsk3: 'hsk3',
  hsk4: 'hsk4',
  hsk5: 'hsk5',
  hsk6: 'hsk6',
  hsk7: 'hsk7'
};

export function lessonItemToFlashcardV2(
  item: LessonItem,
  masteredIds?: Set<string>,
  difficultIds?: Set<string>,
  learnedIds?: Set<string>,
  reviewedIds?: Set<string>,
  srsMap?: Record<string, { lastReviewedAt?: number }>
): FlashcardV2Item {
  let srsState: FlashcardV2SrsState = 'new';
  if (masteredIds?.has(item.id)) srsState = 'mastered';
  else if (difficultIds?.has(item.id)) srsState = 'difficult';
  else if (learnedIds?.has(item.id)) srsState = 'learning';

  // Source canonique : timestamp réel issu de la SRS (`useWordSRS.map`).
  // Fallback : marqueur arbitraire `1` (non-nul mais sans valeur métier) si
  // la carte est dans `reviewedIds` mais qu'on n'a pas le map sous la main.
  // Le marqueur reste compatible avec la table plate V5 (classement
  // "En cours" vs "Nouveau") sans introduire de date erronée.
  const realTs = srsMap?.[item.id]?.lastReviewedAt;
  const lastReviewedAt =
    realTs && realTs > 0
      ? realTs
      : reviewedIds?.has(item.id)
        ? 1
        : undefined;

  return {
    id: item.id,
    hanzi: item.hanzi,
    pinyin: item.pinyin,
    translation: item.translationFr ?? item.translation,
    translationEn: item.translation,
    level: levelToV2[item.level] ?? 'hsk1',
    theme: item.theme,
    tokens: item.hanzi.length,
    srsState,
    lastReviewedAt,
    // Propagation de l'URL audio pré-enregistrée (WAV/MP3) vers les flashcards :
    // elle sera utilisée par ListeningCard / FlipCard au lieu de Web Speech quand
    // disponible, garantissant un son identique sur Chrome / Safari / mobile.
    audio: item.audio ?? item.audioLetter
  };
}

// ---------------------------------------------------------------------------
// Defaults autonomes pour les nouvelles pages (drills, eval, community)
// ---------------------------------------------------------------------------

export const DEFAULT_GRAMMAR_DRILLS: GrammarDrillTopic[] = [
  {
    key: 'measure-words',
    title: 'Classificateurs (量词)',
    titleEn: 'Measure words (量词)',
    hint: 'En chinois, chaque nom a son classificateur. Associe chaque nom au bon classificateur.',
    hintEn: 'Every Chinese noun uses a measure word. Match each noun with its classifier.',
    columns: ['Classificateur', 'Exemple'],
    columnsEn: ['Measure word', 'Example'],
    rows: [
      {
        id: 'mw-person',
        label: '人 (personne)',
        labelEn: '人 (person)',
        cells: [
          { answer: '个', pinyin: 'gè', choices: ['个', '只', '本', '张'], explanation: '个 est le classificateur le plus courant, utilisé pour les personnes.', explanationEn: '个 is the most common measure word, used for people.' },
          { answer: '一个人', choices: ['一个人', '一本人', '一张人', '一只人'] }
        ]
      },
      {
        id: 'mw-book',
        label: '书 (livre)',
        labelEn: '书 (book)',
        cells: [
          { answer: '本', pinyin: 'běn', choices: ['本', '个', '张', '只'], explanation: '本 s\'utilise pour les livres et objets reliés.', explanationEn: '本 is used for books and bound objects.' },
          { answer: '一本书', choices: ['一本书', '一个书', '一张书', '一只书'] }
        ]
      },
      {
        id: 'mw-paper',
        label: '桌子 (table / objet plat)',
        labelEn: '桌子 (table / flat object)',
        cells: [
          { answer: '张', pinyin: 'zhāng', choices: ['张', '本', '个', '把'], explanation: '张 pour les objets plats : papier, table, billet.', explanationEn: '张 for flat objects: paper, table, ticket.' },
          { answer: '一张桌子', choices: ['一张桌子', '一本桌子', '一只桌子', '一个桌子'] }
        ]
      }
    ]
  },
  {
    key: 'aspects',
    title: 'Aspects verbaux (了 / 过 / 着)',
    titleEn: 'Verbal aspects (了 / 过 / 着)',
    hint: 'Le chinois marque l\'aspect, pas le temps. Associe la phrase à la bonne particule.',
    hintEn: 'Chinese marks aspect, not tense. Match the sentence to the correct particle.',
    columns: ['Particule', 'Exemple'],
    columnsEn: ['Particle', 'Example'],
    rows: [
      {
        id: 'asp-le',
        label: 'Action accomplie',
        labelEn: 'Completed action',
        cells: [
          { answer: '了', pinyin: 'le', choices: ['了', '过', '着', '的'], explanation: '了 marque une action accomplie ou un changement.', explanationEn: '了 marks a completed action or a change.' },
          { answer: '我吃了', choices: ['我吃了', '我吃过', '我吃着', '我的吃'] }
        ]
      },
      {
        id: 'asp-guo',
        label: 'Expérience vécue',
        labelEn: 'Lived experience',
        cells: [
          { answer: '过', pinyin: 'guo', choices: ['过', '了', '着', '的'], explanation: '过 marque une expérience vécue au moins une fois.', explanationEn: '过 marks an experience lived at least once.' },
          { answer: '我去过北京', choices: ['我去过北京', '我去了北京', '我去着北京', '我的去北京'] }
        ]
      },
      {
        id: 'asp-zhe',
        label: 'Action en cours / état',
        labelEn: 'Ongoing state',
        cells: [
          { answer: '着', pinyin: 'zhe', choices: ['着', '了', '过', '的'], explanation: '着 marque un état ou une action en cours.', explanationEn: '着 marks a state or ongoing action.' },
          { answer: '门开着', choices: ['门开着', '门开了', '门开过', '门的开'] }
        ]
      }
    ]
  },
  {
    key: 'de-particles',
    title: 'Les trois 的 / 地 / 得',
    titleEn: 'The three de: 的 / 地 / 得',
    hint: 'Trois particules qui se prononcent « de » mais ont des rôles différents.',
    hintEn: 'Three particles pronounced "de" with different roles.',
    columns: ['Particule', 'Exemple'],
    columnsEn: ['Particle', 'Example'],
    rows: [
      {
        id: 'de-possessive',
        label: 'Attributif (avant un nom)',
        labelEn: 'Attributive (before a noun)',
        cells: [
          { answer: '的', pinyin: 'de', choices: ['的', '地', '得', '了'], explanation: '的 relie un attribut ou possesseur à un nom.', explanationEn: '的 links an attribute or possessor to a noun.' },
          { answer: '我的书', choices: ['我的书', '我地书', '我得书', '我了书'] }
        ]
      },
      {
        id: 'de-adverbial',
        label: 'Adverbial (avant un verbe)',
        labelEn: 'Adverbial (before a verb)',
        cells: [
          { answer: '地', pinyin: 'de', choices: ['地', '的', '得', '了'], explanation: '地 transforme un adjectif en adverbe avant un verbe.', explanationEn: '地 turns an adjective into an adverb before a verb.' },
          { answer: '慢慢地走', choices: ['慢慢地走', '慢慢的走', '慢慢得走', '慢慢了走'] }
        ]
      },
      {
        id: 'de-degree',
        label: 'Complément de degré (après un verbe)',
        labelEn: 'Degree complement (after a verb)',
        cells: [
          { answer: '得', pinyin: 'de', choices: ['得', '的', '地', '了'], explanation: '得 introduit un complément de degré ou de manière.', explanationEn: '得 introduces a complement of degree or manner.' },
          { answer: '跑得快', choices: ['跑得快', '跑的快', '跑地快', '跑了快'] }
        ]
      }
    ]
  }
];

export function buildDefaultEvaluation(level: 'hsk1' | 'hsk2' | 'hsk3' = 'hsk1'): EvaluationV2Config {
  return {
    id: `mock-${level}`,
    level,
    title: level === 'hsk1'
      ? 'Mock HSK 1'
      : level === 'hsk2'
      ? 'Mock HSK 2'
      : 'Mock HSK 3',
    titleEn: level === 'hsk1'
      ? 'Mock HSK 1'
      : level === 'hsk2'
      ? 'Mock HSK 2'
      : 'Mock HSK 3',
    subtitle: 'Évaluation rapide pour situer ton niveau avant de continuer.',
    subtitleEn: 'Quick check to place your level before moving on.',
    durationSeconds: 10 * 60,
    passingPercent: 60,
    xpReward: 100,
    sections: [
      {
        id: `${level}-vocab`,
        kind: 'vocabulary',
        title: 'Vocabulaire',
        titleEn: 'Vocabulary',
        questions: [
          {
            id: `${level}-v1`,
            prompt: 'Que signifie 你好 ?',
            promptEn: 'What does 你好 mean?',
            choices: ['Bonjour', 'Au revoir', 'Merci', 'Pardon'],
            correctIndex: 0,
            explanation: '你好 (nǐ hǎo) = Bonjour.'
          },
          {
            id: `${level}-v2`,
            prompt: 'Que signifie 谢谢 ?',
            promptEn: 'What does 谢谢 mean?',
            choices: ['Pardon', 'Merci', 'S\'il te plaît', 'De rien'],
            correctIndex: 1,
            explanation: '谢谢 (xièxie) = Merci.'
          }
        ]
      },
      {
        id: `${level}-grammar`,
        kind: 'grammar',
        title: 'Grammaire',
        titleEn: 'Grammar',
        questions: [
          {
            id: `${level}-g1`,
            prompt: 'Complète : 我 ___ 学生.',
            promptEn: 'Fill in: 我 ___ 学生.',
            choices: ['是', '不', '很', '的'],
            correctIndex: 0,
            explanation: '是 (shì) = être. « Je suis étudiant » = 我是学生.'
          }
        ]
      },
      {
        id: `${level}-reading`,
        kind: 'reading',
        title: 'Compréhension écrite',
        titleEn: 'Reading',
        questions: [
          {
            id: `${level}-r1`,
            context: '今天天气很好.',
            contextEn: '今天天气很好.',
            prompt: 'Que dit le texte ?',
            promptEn: 'What does the text say?',
            choices: [
              'Le temps est mauvais aujourd\'hui',
              'Le temps est bon aujourd\'hui',
              'Il pleut demain',
              'Il fait chaud'
            ],
            correctIndex: 1,
            explanation: '今天天气很好 = « Le temps est très bon aujourd\'hui ».'
          }
        ]
      }
    ]
  };
}

// ---------------------------------------------------------------------------
// Community defaults — teaser "bientôt"
// ---------------------------------------------------------------------------

export const DEFAULT_ANNOUNCEMENTS: CommunityV2Announcement[] = [
  {
    id: 'ann-audio-dict-2026-05',
    title: 'Audio sur le dictionnaire',
    titleEn: 'Audio on dictionary entries',
    body:
      'Chaque fiche de vocabulaire dans le dictionnaire dispose maintenant d\'un bouton 🔊 à côté du mot principal et de chaque phrase d\'exemple. Tu peux entendre la prononciation native (voix Cloudflare Workers AI) avant de tester ton oreille.',
    bodyEn:
      'Every vocabulary card in the dictionary now has a 🔊 button next to the main word and each example sentence. You can hear the native pronunciation (Cloudflare Workers AI voice) before testing your ear.',
    date: '2026-05-12',
    tag: 'Audio',
    category: 'audio',
    icon: '🔊',
    pinned: true
  },
  {
    id: 'ann-smartmix-audio-2026-05',
    title: 'SmartMix : audio sur les questions d\'écoute',
    titleEn: 'SmartMix: audio on listening questions',
    body:
      'Les questions de type "Écoute le ton et identifie la bonne syllabe" jouent désormais l\'audio automatiquement, avec un bouton 🔊 pour relancer la lecture. Tes exercices de discrimination tonale deviennent réalistes.',
    bodyEn:
      'Listening questions ("hear the tone and pick the right syllable") now auto-play their audio with a 🔊 button to replay. Tone discrimination exercises become realistic.',
    date: '2026-05-11',
    tag: 'Révisions',
    category: 'review',
    icon: '🎧',
    pinned: true
  },
  {
    id: 'ann-pinyin-quiz-2026-05',
    title: 'Quiz Pinyin reformulés en langage clair',
    titleEn: 'Pinyin quizzes rewritten in plain language',
    body:
      'Fini les "vélaire palatale" et "rétroflexe" dans les leçons Pinyin. Les énoncés ont été réécrits ("son du fond de la bouche", "langue plate puis recourbée"). 6 quiz de traduction non pertinents ont aussi été retirés.',
    bodyEn:
      'No more "velar palatal" or "retroflex" in Pinyin lessons. Quiz prompts have been rewritten with accessible language. 6 non-pertinent translation quizzes were also removed.',
    date: '2026-05-10',
    tag: 'Apprendre',
    category: 'fix',
    icon: '🔤'
  },
  {
    id: 'ann-stripe-2026-05',
    title: 'Abonnements XiaoLearn : Mensuel + Lifetime',
    titleEn: 'XiaoLearn plans: Monthly + Lifetime',
    body:
      'Tu peux désormais souscrire à XiaoLearn Premium : 14€/mois ou 99€ à vie. Le paiement est sécurisé par Stripe, et débloque le Simulateur Prof. Xiao, les révisions illimitées et tous les mini-jeux.',
    bodyEn:
      'You can now subscribe to XiaoLearn Premium: €14/month or €99 lifetime. Payments are secured by Stripe and unlock Prof. Xiao Simulator, unlimited reviews, and all mini-games.',
    date: '2026-05-08',
    tag: 'Premium',
    category: 'feature',
    icon: '💎',
    pinned: true
  },
  {
    id: 'ann-cloudflare-2026-05',
    title: 'XiaoLearn migre sur Cloudflare',
    titleEn: 'XiaoLearn migrates to Cloudflare',
    body:
      'L\'app et le site tournent désormais sur Cloudflare Pages avec audios servis depuis Cloudflare R2 (CDN mondial). Résultat : chargement audio ~4× plus rapide et zéro coupure.',
    bodyEn:
      'The app and site now run on Cloudflare Pages with audio served from Cloudflare R2 (global CDN). Result: ~4× faster audio loading and zero outages.',
    date: '2026-05-05',
    tag: 'Infra',
    category: 'fix',
    icon: '⚡'
  },
  {
    id: 'ann-prof-xiao-2026-04',
    title: 'Page Prof. Xiao complète',
    titleEn: 'Full Prof. Xiao page',
    body:
      'Le chat flottant a désormais une page complète avec presets par thème (grammaire, vocabulaire, culture) et prompts contextuels selon ta leçon en cours.',
    bodyEn:
      'The floating chat now has a full dedicated page with preset categories (grammar, vocabulary, culture) and contextual prompts based on your current lesson.',
    date: '2026-04-18',
    tag: 'Feature',
    category: 'feature',
    icon: '🤖'
  },
  {
    id: 'ann-simulator-2026-04',
    title: 'Simulateur de Situations',
    titleEn: 'Situations Simulator',
    body:
      'Plonge dans des conversations interactives en chinois : commander au restaurant, prendre le métro, échanger avec un commerçant. Disponible avec Premium Lifetime.',
    bodyEn:
      'Dive into interactive Chinese conversations: order at a restaurant, take the metro, chat with a shopkeeper. Available with Premium Lifetime.',
    date: '2026-04-12',
    tag: 'Feature',
    category: 'feature',
    icon: '🎭'
  },
  {
    id: 'ann-flashcards-v5-2026-04',
    title: 'Flashcards : 3 grosses nouveautés',
    titleEn: 'Flashcards: 3 big new features',
    body:
      'Mode mixte (reconnaissance + production), audio natif sur toutes les cartes, et système SRS basé sur la fluidité de réponse. Tes révisions sont enfin alignées avec la science.',
    bodyEn:
      'Mixed mode (recognition + production), native audio on all cards, and SRS based on response fluency. Your reviews are finally aligned with science.',
    date: '2026-04-06',
    tag: 'Flashcards',
    category: 'flashcards',
    icon: '🗂️'
  },
  {
    id: 'ann-reviews-v3-2026-04',
    title: 'Révisions multi-leçons',
    titleEn: 'Multi-lesson reviews',
    body:
      'Le nouveau système de révision sélectionne intelligemment les leçons à revoir en fonction de ta maîtrise et de l\'oubli. Modes SmartMix, Daily, Weakness, Free.',
    bodyEn:
      'The new review system intelligently picks which lessons to revisit based on your mastery and forgetting curve. Modes: SmartMix, Daily, Weakness, Free.',
    date: '2026-04-04',
    tag: 'Révisions',
    category: 'review',
    icon: '📚'
  },
  {
    id: 'ann-culture-dictee-2026-04',
    title: 'Nouveaux parcours Culture + Dictée',
    titleEn: 'New Culture + Dictation paths',
    body:
      '10 parcours au total — 2 nouveaux parcours Culture chinoise (fêtes, philosophie, art) et Dictée (entraîne ton oreille à transcrire le mandarin) ont été ajoutés.',
    bodyEn:
      '10 paths in total — two new paths (Chinese Culture: festivals, philosophy, art) and Dictation (train your ear to transcribe Mandarin) are live.',
    date: '2026-04-02',
    tag: 'Contenu',
    category: 'content',
    icon: '🏮'
  },
  {
    id: 'ann-grammar-2026-03',
    title: 'Refonte des fiches de grammaire',
    titleEn: 'Grammar cards redesigned',
    body:
      'Chaque point grammatical possède maintenant une fiche dédiée avec exemples audio, exercices ciblés et lien vers les nuances associées. 200+ fiches sont disponibles.',
    bodyEn:
      'Each grammar point now has a dedicated card with audio examples, targeted exercises, and links to related nuances. 200+ cards available.',
    date: '2026-03-22',
    tag: 'Contenu',
    category: 'content',
    icon: '📖'
  },
  {
    id: 'ann-streak-2026-03',
    title: 'Streak jokers : protège ta série',
    titleEn: 'Streak jokers: protect your streak',
    body:
      'Tu peux désormais utiliser un "joker" pour conserver ta série quand tu rates un jour. 1 joker gagné toutes les 7 sessions complétées.',
    bodyEn:
      'You can now spend a "joker" to keep your streak alive when you miss a day. 1 joker earned every 7 completed sessions.',
    date: '2026-03-15',
    tag: 'Gamification',
    category: 'community',
    icon: '🔥'
  }
];

export const DEFAULT_CHALLENGES: CommunityV2Challenge[] = [
  {
    id: 'ch-apr-2026',
    title: '30 jours de caractères',
    titleEn: '30 days of hanzi',
    prompt: 'Écris un hanzi par jour en contexte, poste le résultat en fin de mois.',
    promptEn: 'Write one hanzi per day in context, share your recap at month end.',
    endsAt: '2026-04-30',
    participants: 0
  }
];

export const DEFAULT_LEADERBOARD: CommunityV2LeaderboardEntry[] = [];

