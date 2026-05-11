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
    id: 'ann-reading-audio-player',
    title: 'Player audio dans les Lectures — Normal / Lent',
    titleEn: 'Audio player in Readings — Normal / Slow',
    body:
      'Chaque texte de la page Lecture embarque maintenant un lecteur compact au-dessus de l\'article : ' +
      'Play/Pause, barre de progression cliquable, retour au début, compteur de temps. Deux vitesses ' +
      'au choix — Normal pour l\'immersion façon locuteur natif, Lent pour le shadowing syllabe par ' +
      'syllabe. Tu peux basculer entre les deux en plein milieu d\'une écoute : le player se replace ' +
      'automatiquement à la même position dans la nouvelle version. Voix Azure Neural haut de gamme, ' +
      'à des kilomètres des TTS robotiques.',
    bodyEn:
      'Every text in the Reading section now has a compact player above the article: Play/Pause, ' +
      'clickable progress bar, restart, time counter. Two speeds — Normal for native-style immersion, ' +
      'Slow for syllable-by-syllable shadowing. You can switch mid-listen and the player resumes ' +
      'at the same spot in the new version. High-quality Azure Neural voice, light-years from robotic TTS.',
    date: '2026-05-11',
    tag: 'Lecture'
  },
  {
    id: 'ann-reading-tap-translate',
    title: 'Lectures interactives — tape un mot, ajoute-le à tes flashcards',
    titleEn: 'Interactive readings — tap any word, add it to your flashcards',
    body:
      'Toute la page Lecture devient cliquable caractère par caractère. Tu tapes un hanzi (ou un mot ' +
      'composé), tu obtiens son pinyin tonifié et sa traduction — d\'abord depuis nos leçons HSK (la ' +
      'plus précise, contextualisée à la phrase), puis en fallback depuis CFDICT. Bouton ➕ pour ' +
      'envoyer la carte dans tes flashcards perso en un clic, avec le titre de la lecture comme note. ' +
      'En bonus : un mini-quiz QCM de 3 questions à la fin de chaque texte, qui rapporte +50 XP la ' +
      'première fois et reste rejouable autant que tu veux. 33 textes du A1 au C2 — bonne lecture !',
    bodyEn:
      'The whole Reading page is now tappable character by character. Tap a hanzi (or compound word) ' +
      'and you get its tone-marked pinyin plus a sentence-aware translation — first from our HSK lessons ' +
      '(the precise one), then from CFDICT as a fallback. The ➕ button sends the card straight into ' +
      'your personal flashcards with the reading title as a note. Bonus: a 3-question QCM mini-quiz at ' +
      'the end of each text rewards +50 XP the first time and stays replayable. 33 texts from A1 to C2 — happy reading!',
    date: '2026-05-11',
    tag: 'Lecture'
  },
  {
    id: 'ann-1',
    title: 'Nouvelle refonte Culture + Dictée',
    titleEn: 'New Culture + Dictation paths',
    body: '10 parcours au total — 2 nouveaux parcours Culture chinoise et Dictée ont été ajoutés.',
    bodyEn: '10 paths in total — two new paths (Chinese Culture, Dictation) are live.',
    date: '2026-04-18',
    tag: 'Contenu'
  },
  {
    id: 'ann-2',
    title: 'Nouvelle page Prof. Xiao',
    titleEn: 'New Prof. Xiao page',
    body: 'Le chat flottant a désormais une page complète avec presets par thème et prompts contextuels.',
    bodyEn: 'The floating chat now has a full dedicated page with preset categories and contextual prompts.',
    date: '2026-04-18',
    tag: 'Feature'
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

