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
  // ─── Mai 2026 — refonte Prof. Xiao + popup vocab + recherche live ───────
  {
    id: 'ann-search-live-2026-05',
    title: 'Recherche universelle en direct',
    titleEn: 'Live universal search',
    body:
      "La barre de recherche en haut de l'app affiche maintenant un panneau de résultats live, organisé en trois sections : (1) Leçons — les leçons parentes qui contiennent ton terme dans leur vocabulaire, avec le nombre de mots correspondants ; (2) Vocabulaire — les mots HSK/CECR et tes flashcards perso qui matchent, classés par pertinence (exact > commence par > contient) ; (3) Conversations Prof. Xiao — tes anciennes discussions dont le titre matche, avec une date relative. Un raccourci en bas du panneau te permet de poser ta requête directement à Prof. Xiao s'il n'y a pas de résultat — le champ se pré-remplit, tu n'as plus qu'à valider. Cliquer un résultat te téléporte directement à la bonne page (leçon ouverte, conversation chargée, etc.).",
    bodyEn:
      "The search bar at the top of the app now shows a live results panel split into three sections: (1) Lessons — parent lessons that contain your term in their vocabulary, with the matching word count; (2) Vocabulary — HSK/CECR words and your personal flashcards that match, ranked by relevance (exact > starts-with > contains); (3) Prof. Xiao conversations — past discussions whose title matches, with a relative date. A shortcut at the bottom lets you send the query straight to Prof. Xiao when no result fits — the composer pre-fills, you just hit send. Clicking a result jumps you directly to the right page (lesson, conversation, etc.).",
    date: '2026-05-13',
    tag: 'Recherche',
    category: 'feature',
    icon: '🔍',
    pinned: true
  },
  {
    id: 'ann-mes-erreurs-2026-05',
    title: 'Mes erreurs : ton carnet de progression personnel',
    titleEn: 'My errors: your personal progress journal',
    body:
      "Un nouvel onglet « Mes erreurs » regroupe automatiquement chaque erreur que tu fais en discutant avec Prof. Xiao ou dans le Simulateur. Chaque entrée porte une catégorie (particule, ton, prononciation, politesse, vocabulaire, grammaire, mesureur, caractère, traduction, orthographe), une sévérité (mineure / importante / critique) et l'explication contextuelle de Prof. Xiao. Les erreurs récurrentes (≥ 2 occurrences sur le même mot) sont mises en avant dans une section « À TRAVAILLER ». Tu peux filtrer par source (Prof. Xiao ou Simulateur), par catégorie, ou revoir l'historique chronologique. La détection se fait via un format JSON structuré renvoyé par Gemini — pas de heuristique fragile, tu n'as rien à faire de manuel.",
    bodyEn:
      "A new « My errors » tab automatically collects every mistake you make while chatting with Prof. Xiao or in the Simulator. Each entry has a category (particle, tone, pronunciation, politeness, vocab, grammar, measure word, character, translation, spelling), a severity (minor / important / critical), and Prof. Xiao's contextual explanation. Recurring errors (≥ 2 occurrences on the same word) bubble up into a « TO PRACTICE » section. You can filter by source (Prof. Xiao or Simulator), by category, or scroll through the chronological log. Detection is driven by a structured JSON contract that Gemini returns — no brittle heuristics, nothing to do manually.",
    date: '2026-05-13',
    tag: 'Apprentissage',
    category: 'feature',
    icon: '📝',
    pinned: true
  },
  {
    id: 'ann-profxiao-refonte-2026-05',
    title: 'Prof. Xiao : interface simplifiée + popup vocabulaire',
    titleEn: 'Prof. Xiao: simplified UI + vocabulary popup',
    body:
      "La page Prof. Xiao a été repensée pour ressembler à un vrai chat moderne : layout deux colonnes (historique des conversations à gauche, fil de discussion à droite), hauteur fixe avec scroll interne (la page ne s'étend plus indéfiniment), header allégé avec l'avatar du prof + badge En ligne. Côté contenu, chaque mot chinois écrit par Prof. Xiao est désormais cliquable : un soulignage rouge pointillé t'indique l'affordance, et un clic ouvre un popup avec le hanzi, le pinyin, la traduction, une phrase d'exemple extraite de la conversation (avec pinyin auto et traduction si détectable) et un bouton ✚ pour ajouter le mot à tes flashcards personnelles (Lifetime). Le popup détecte si la carte est déjà dans ton deck (✓ Dans tes flashcards) et gère le cap des 500 cartes.",
    bodyEn:
      "The Prof. Xiao page was rebuilt to feel like a real modern chat: two-column layout (conversation history on the left, message thread on the right), fixed height with internal scroll (the page no longer expands forever), lighter header with the teacher's avatar + Online badge. On the content side, every Chinese word Prof. Xiao writes is now clickable: a red dotted underline hints at the affordance, and a click opens a popup with the hanzi, pinyin, translation, an example sentence pulled from the conversation (auto-pinyin + translation when detectable), and a ✚ button to add the word to your personal flashcards (Lifetime). The popup detects if the card already exists (✓ In your flashcards) and respects the 500-card cap.",
    date: '2026-05-13',
    tag: 'Prof. Xiao',
    category: 'feature',
    icon: '👩‍🏫',
    pinned: true
  },
  {
    id: 'ann-fallback-cf-ai-2026-05',
    title: 'Prof. Xiao résilient : fallback Cloudflare Workers AI',
    titleEn: 'Resilient Prof. Xiao: Cloudflare Workers AI fallback',
    body:
      "Quand Gemini est saturé (quota free atteint, erreur 5xx, timeout), Prof. Xiao bascule automatiquement sur Cloudflare Workers AI (modèle Qwen / Llama 3.3, excellent pour le chinois) — 10 000 neurons/jour gratuits sans carte bancaire. Tu ne vois rien, la conversation continue, juste avec un autre moteur derrière. La bascule s'applique aussi au Simulateur et au correcteur d'écriture. Le système prompt est identique sur les deux moteurs (pédagogie chaleureuse, détection structurée d'erreurs), donc la qualité reste cohérente.",
    bodyEn:
      "When Gemini is saturated (free quota hit, 5xx error, timeout), Prof. Xiao automatically falls back to Cloudflare Workers AI (Qwen / Llama 3.3 model, great at Chinese) — 10,000 neurons/day free, no credit card needed. You don't see anything: the conversation just continues with a different engine behind. The failover also applies to the Simulator and Writing Corrector. The system prompt is identical on both engines (warm pedagogy, structured error detection), so quality stays consistent.",
    date: '2026-05-13',
    tag: 'Prof. Xiao',
    category: 'fix',
    icon: '⚡'
  },

  // ─── Mai 2026 — historique antérieur ────────────────────────────────────
  {
    id: 'ann-smartmix-audio-2026-05',
    title: 'SmartMix : audio sur les questions d\'écoute',
    titleEn: 'SmartMix: audio on listening questions',
    body:
      "Les questions de révision de type « Écoute le ton et identifie la bonne syllabe » jouent désormais l'audio automatiquement à l'affichage, avec un bouton 🔊 à côté de l'énoncé pour relancer la lecture autant de fois que tu veux. Les exercices de discrimination tonale (mā/má/mǎ/mà) deviennent enfin réalistes : tu entends, tu choisis, tu vérifies — exactement comme dans un test HSK oral. La fonctionnalité est dispo dans tous les modes de révision (SmartMix, Daily, Weakness, Free) et fonctionne avec les audios pré-générés MP3, pas avec la synthèse vocale du navigateur (plus de prononciations bizarres sur Chrome Windows).",
    bodyEn:
      "Review questions of type « Listen to the tone and pick the right syllable » now auto-play their audio when shown, with a 🔊 button next to the prompt to replay as many times as you want. Tone discrimination drills (mā/má/mǎ/mà) finally feel realistic: you hear, you pick, you verify — exactly like an oral HSK exam. Available in every review mode (SmartMix, Daily, Weakness, Free) and built on top of pre-generated MP3 audio rather than browser TTS (no more odd pronunciations on Chrome Windows).",
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
      "Fini les termes de linguistique pure (« occlusive vélaire palatale », « consonne rétroflexe ») dans les quiz de prononciation Pinyin. Tous les énoncés ont été réécrits avec un vocabulaire accessible : « son qui part du fond de la bouche », « langue plate puis recourbée vers l'arrière », « comme un J anglais mais sans souffle ». 6 questions de traduction qui mélangeaient prononciation et sens (donc impossibles à évaluer correctement) ont été retirées, et 4 nouveaux quiz audio ciblés sur les paires zh/ch/sh ↔ j/q/x ont été ajoutés. Si tu refais une leçon Pinyin, tu retrouveras tout ce contenu mis à jour automatiquement.",
    bodyEn:
      "No more pure linguistics jargon (« velar palatal stop », « retroflex consonant ») in Pinyin pronunciation quizzes. Every prompt was rewritten with accessible language: « a sound from the back of the mouth », « flat tongue then curled back », « like an English J but without the breath ». 6 translation questions that mixed pronunciation and meaning (and were thus unscorable) were removed, and 4 new audio quizzes targeting the zh/ch/sh ↔ j/q/x pairs were added. Replay any Pinyin lesson to get the updated content automatically.",
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
      "Tu peux désormais souscrire à XiaoLearn Premium directement depuis l'app, en deux formules : Mensuel à 14 €/mois (résiliable à tout moment) ou Lifetime à 99 € (paiement unique, accès à vie à tout ce qui sortira). Le paiement passe par Stripe Checkout (cartes Visa/Mastercard, Apple Pay, Google Pay), tu n'as pas à créer de compte additionnel. Le Premium débloque : Simulateur Prof. Xiao (10+ scénarios immersifs), révisions illimitées, tous les mini-jeux (Sentence Builder, Pinyin Typing, Tone Trainer, Dictation), 500 flashcards perso, et toutes les nouveautés futures. À la souscription, ton compte est automatiquement reconnu sur tous tes appareils (Firestore sync, fonctionne sur iPhone, iPad, Mac, PC).",
    bodyEn:
      "You can now subscribe to XiaoLearn Premium straight from the app in two flavors: Monthly at €14/mo (cancel anytime) or Lifetime at €99 (one-time payment, lifetime access to everything that ships). Payment runs through Stripe Checkout (Visa/Mastercard, Apple Pay, Google Pay) — no extra account to create. Premium unlocks: Prof. Xiao Simulator (10+ immersive scenarios), unlimited reviews, all mini-games (Sentence Builder, Pinyin Typing, Tone Trainer, Dictation), 500 personal flashcards, and all future features. Once you subscribe, your account is automatically recognised on all your devices (Firestore sync — works on iPhone, iPad, Mac, PC).",
    date: '2026-05-08',
    tag: 'Premium',
    category: 'feature',
    icon: '💎',
    pinned: true
  },

  // ─── Avril 2026 ─────────────────────────────────────────────────────────
  {
    id: 'ann-prof-xiao-2026-04',
    title: 'Page Prof. Xiao complète',
    titleEn: 'Full Prof. Xiao page',
    body:
      "Le chat flottant qui squattait le coin bas-droite de toutes les pages a laissé sa place à une vraie page dédiée. Tu y trouves : un historique des conversations (chaque discussion est sauvegardée et synchronisée Firestore), des presets de prompts par thème (grammaire, prononciation, culture, conversation, correction d'écriture), et une zone de saisie avec touche Entrée pour envoyer / Shift+Entrée pour aller à la ligne. Prof. Xiao tourne sur Gemini 2.5 Flash (gratuit, 1500 requêtes/jour) — assez large pour tes journées d'étude les plus intenses.",
    bodyEn:
      "The floating chat that squatted the bottom-right corner of every page has been replaced by a proper dedicated page. You get: a conversation history (each chat is saved and synced via Firestore), prompt presets per topic (grammar, pronunciation, culture, conversation, writing correction), and an input area with Enter to send / Shift+Enter for newline. Prof. Xiao runs on Gemini 2.5 Flash (free, 1500 requests/day) — plenty for your most intense study days.",
    date: '2026-04-18',
    tag: 'Prof. Xiao',
    category: 'feature',
    icon: '🤖'
  },
  {
    id: 'ann-simulator-2026-04',
    title: 'Simulateur de Situations',
    titleEn: 'Situations Simulator',
    body:
      "Plonge dans des conversations interactives en chinois écrites par un native speaker et jouées par l'IA. 10+ scénarios actuels : commander au restaurant, prendre le métro à Shanghai, marchander au marché, demander son chemin, première rencontre professionnelle, échange culturel à un mariage, consultation médicale, location d'appart, négociation salariale, dialogue avec un parent chinois traditionnel. Chaque scénario a un objectif clair (« décrocher la table », « obtenir une réduction ») et l'IA évalue ta performance à chaque tour. Les erreurs sont automatiquement enregistrées dans Mes erreurs avec leur contexte. Disponible avec Premium Lifetime.",
    bodyEn:
      "Dive into interactive Chinese conversations written by a native speaker and played by the AI. 10+ scenarios so far: ordering at a restaurant, taking the metro in Shanghai, haggling at a market, asking for directions, first professional meeting, cultural exchange at a wedding, doctor's appointment, apartment rental, salary negotiation, dialogue with a traditional Chinese parent. Each scenario has a clear goal (« land the table », « get a discount ») and the AI scores your performance turn by turn. Mistakes are auto-logged in My errors with their context. Available with Premium Lifetime.",
    date: '2026-04-12',
    tag: 'Simulateur',
    category: 'feature',
    icon: '🎭'
  },
  {
    id: 'ann-flashcards-v5-2026-04',
    title: 'Flashcards : 3 grosses nouveautés',
    titleEn: 'Flashcards: 3 big new features',
    body:
      "Refonte complète du module flashcards : (1) Mode mixte qui alterne reconnaissance (hanzi → traduction) et production (traduction → hanzi), pour ne pas se reposer sur la mémoire passive ; (2) Audio natif sur 884 cartes HSK 1→6 (voix Cloudflare Workers AI), jouable à la révision et sur le verso de la carte ; (3) Système SRS basé sur la fluidité de réponse plutôt qu'un score binaire — quatre boutons (Encore / Difficile / Bien / Facile) qui calibrent les intervalles selon ta réactivité. Tu peux aussi créer jusqu'à 500 flashcards perso (Lifetime) avec pinyin auto via le dictionnaire CFDICT compact embarqué.",
    bodyEn:
      "Complete rebuild of the flashcards module: (1) Mixed mode that alternates recognition (hanzi → translation) and production (translation → hanzi), so you can't lean on passive memory; (2) Native audio on 884 HSK 1→6 cards (Cloudflare Workers AI voice), playable during reviews and on the card back; (3) Response-fluency SRS rather than a binary score — four buttons (Again / Hard / Good / Easy) that calibrate intervals based on how fast you answered. You can also create up to 500 personal flashcards (Lifetime) with auto-pinyin via the embedded CFDICT compact dictionary.",
    date: '2026-04-06',
    tag: 'Flashcards',
    category: 'flashcards',
    icon: '🗂️'
  },
  {
    id: 'ann-reviews-v3-2026-04',
    title: 'Révisions multi-leçons intelligentes',
    titleEn: 'Smart multi-lesson reviews',
    body:
      "Le système de révision a été refait pour piocher intelligemment dans toutes tes leçons terminées plutôt que de te faire revoir une leçon entière à la fois. Quatre modes : SmartMix (algorithme principal, mélange mots dûs + faiblesses + nouveautés selon ta courbe d'oubli), Daily (objectif quotidien calibré à ton niveau), Weakness (focus sur tes erreurs récentes et les cartes en bas du leaderboard SRS), et Free (tu choisis manuellement les leçons à mixer). La progression t'est restituée à la fin de chaque session avec un récap : maîtrise gagnée par catégorie, points faibles persistants, recommandation pour la prochaine session.",
    bodyEn:
      "The review system was rebuilt to smart-pick across all your finished lessons rather than making you redo one full lesson at a time. Four modes: SmartMix (main algorithm, mixes due words + weaknesses + new content based on your forgetting curve), Daily (daily goal calibrated to your level), Weakness (focus on recent mistakes and bottom-of-SRS cards), and Free (you pick the lessons to mix manually). Each session ends with a recap: mastery gained per category, persistent weak points, and a recommendation for next time.",
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
      "Deux nouveaux parcours s'ajoutent aux 8 existants. Parcours Culture chinoise : 12 leçons sur les fêtes traditionnelles (春节, 中秋节, 端午节), la philosophie (儒家, 道家, 法家), l'art classique (calligraphie, peinture à l'encre), la cuisine régionale (sichuan, cantonais, dongbei), et les codes sociaux modernes. Parcours Dictée : 8 leçons d'entraînement à transcrire le mandarin parlé — tu entends une phrase, tu tapes le pinyin (puis le hanzi), avec feedback immédiat sur les tons. Le parcours Dictée fonctionne sur audio pré-généré + Speech Recognition côté navigateur quand dispo.",
    bodyEn:
      "Two new paths join the existing 8. Chinese Culture path: 12 lessons on traditional festivals (春节, 中秋节, 端午节), philosophy (儒家, 道家, 法家), classical art (calligraphy, ink painting), regional cuisine (Sichuan, Cantonese, Dongbei), and modern social codes. Dictation path: 8 lessons training you to transcribe spoken Mandarin — you hear a sentence, type the pinyin (then the hanzi), with instant feedback on tones. The Dictation path runs on pre-generated audio + browser Speech Recognition where available.",
    date: '2026-04-02',
    tag: 'Contenu',
    category: 'content',
    icon: '🏮'
  },

  // ─── Mars 2026 ──────────────────────────────────────────────────────────
  {
    id: 'ann-grammar-2026-03',
    title: 'Refonte des fiches de grammaire',
    titleEn: 'Grammar cards redesigned',
    body:
      "Chaque point grammatical possède maintenant une fiche dédiée avec : une règle expliquée en 2 paragraphes maximum (pas de pavé), 3 à 5 exemples avec audio natif, un mini-quiz de 3 questions ciblées sur le point, et des liens vers les nuances proches (ex : 在 vs 正在 vs 着 pour exprimer la continuité). 200+ fiches couvrent HSK 1 à 6 et CECR A1 à C1. Tu peux y accéder soit via l'onglet « Grammaire » dans la sidebar (catalogue complet), soit directement depuis une leçon (cartes contextuelles) ou Prof. Xiao (presets de prompts).",
    bodyEn:
      "Every grammar point now has a dedicated card with: a rule explained in max 2 paragraphs (no walls of text), 3–5 examples with native audio, a 3-question mini-quiz on the point, and links to nearby nuances (e.g. 在 vs 正在 vs 着 for ongoing actions). 200+ cards cover HSK 1→6 and CEFR A1→C1. Reach them via the « Grammar » sidebar tab (full catalogue), from inside a lesson (contextual cards), or from Prof. Xiao (prompt presets).",
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
      "Tu peux désormais brûler un « joker » pour conserver ta série quotidienne quand tu rates un jour. Tu gagnes 1 joker toutes les 7 sessions complétées, avec un stock max de 3 jokers (au-delà, c'est gâché). Quand un jour saute, l'app te demande automatiquement si tu veux dépenser un joker pour sauver ta série — tu peux dire non si tu préfères repartir à 0. Les jokers se synchronisent entre tous tes appareils via Firestore. Mention spéciale : un Bonus XP de série débloque +3 XP/jour à 2 jours, des multiplicateurs à 7, 30 et 100 jours.",
    bodyEn:
      "You can now burn a « joker » to keep your daily streak alive when you miss a day. You earn 1 joker every 7 completed sessions, capped at 3 jokers in stock (beyond that they're wasted). When a day is skipped, the app prompts you to spend a joker — you can decline if you'd rather start over from 0. Jokers sync across all your devices via Firestore. Bonus: the Streak XP Bonus unlocks +3 XP/day at 2 days, with multipliers at 7, 30 and 100 days.",
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

