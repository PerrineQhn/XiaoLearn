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
// Supplément vocab : pour chaque leçon avec un "gap" (hanzi qui apparaissent
// dans les exercices mais qui n'ont jamais été introduits dans les examples
// ou learnSections), entrées additionnelles {hanzi, pinyin, translation,
// example?} construites depuis le dico HSK. Cf scripts/lesson-vocab-gap-report
// et scripts/build-vocab-supplement.py.
import lessonVocabSupplementRaw from '../data/lesson-vocab-supplement.json';

type SupplementEntry = {
  hanzi: string;
  pinyin: string;
  translation: string;
  translationEn?: string;
  /** Pour les caractères qui n'ont pas d'entrée mono dans le dico, on a
   *  remonté un compound (ex: 朋友) — `missingChar` indique le hanzi
   *  d'origine pour traçabilité. */
  missingChar?: string | null;
  example?: {
    hanzi: string;
    pinyin: string;
    translation: string;
    translationEn?: string;
  };
};
const lessonVocabSupplement = lessonVocabSupplementRaw as Record<string, SupplementEntry[]>;

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
  // Hanzi déjà couverts par les flashcards de la leçon (pour ne pas
  // dupliquer dans le supplément).
  const coveredHanzi = new Set<string>();
  for (const it of items) {
    for (const ch of it.hanzi) coveredHanzi.add(ch);
  }

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

  // V12 — Enrichissement supplément : pour les leçons dont les exercices
  // utilisent des hanzi jamais introduits avant, on injecte des examples
  // additionnels (curés depuis le dico HSK). Préfère afficher la phrase
  // d'exemple du dico si disponible (sinon le hanzi seul). Skip les entries
  // déjà couvertes par les flashcards.
  const supplement = lessonVocabSupplement[module.id];
  if (supplement && supplement.length > 0) {
    for (const sup of supplement) {
      // Si tous les chars du sup.hanzi sont déjà couverts, skip
      const allCovered = Array.from(sup.hanzi).every((ch) => coveredHanzi.has(ch));
      if (allCovered) continue;
      // Préfère l'exemple-phrase quand disponible (plus pédagogique qu'un
      // hanzi nu). Sinon le hanzi lui-même.
      if (sup.example && sup.example.hanzi) {
        examples.push({
          hanzi: sup.example.hanzi,
          pinyin: sup.example.pinyin || '',
          translation: sup.example.translation || '',
          translationEn: sup.example.translationEn
        });
      } else {
        examples.push({
          hanzi: sup.hanzi,
          pinyin: sup.pinyin || '',
          translation: sup.translation || '',
          translationEn: sup.translationEn
        });
      }
      // Marque comme couvert pour les itérations suivantes
      for (const ch of sup.hanzi) coveredHanzi.add(ch);
    }
  }

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
// Community defaults — annonces de l'équipe XiaoLearn
// ---------------------------------------------------------------------------

export const DEFAULT_ANNOUNCEMENTS: CommunityV2Announcement[] = [
  // ─── Juin 2026 — Objectifs quotidiens personnalisés ─────────────────────
  {
    id: 'ann-custom-goals-2026-06',
    title: 'Objectifs quotidiens personnalisés',
    titleEn: 'Customizable daily goals',
    body:
      "Tu peux maintenant **régler finement** tes objectifs du jour depuis **Réglages → Apprentissage**, plutôt que d'être bloqué sur les valeurs par défaut.\n\n" +
      "### 🎯 Trois cibles ajustables\n\n" +
      "- **⭐ XP / jour** : entre 10 et 500 XP, par incrément de 10 (défaut : 50)\n" +
      "- **🃏 Cartes / jour** : 5 à 200 cartes, ou **∞ illimité** pour ne pas être tracké\n" +
      "- **📚 Leçons / jour** : 1 à 10 leçons, ou **∞ illimité** également\n\n" +
      "### ⏱️ Cible minutes pilotée par le preset\n\n" +
      "La cible minutes vient maintenant directement des tuiles **Décontracté / Régulier / Intensif / Extrême** (5 / 15 / 30 / 60 min). Plus de double réglage qui pouvait diverger.\n\n" +
      "### 🔁 Sync cross-device\n\n" +
      "Tes objectifs personnalisés sont synchronisés via **Firestore** entre tous tes appareils. Tu ajustes sur ton iPad, ça remonte sur ton MacBook au prochain refresh. Bouton **↺ Réinitialiser** pour revenir aux défauts (50 XP / 10 min / illimité).",
    bodyEn:
      "You can now **finely tune** your daily goals from **Settings → Learning**, instead of being stuck on the defaults.\n\n" +
      "### 🎯 Three adjustable targets\n\n" +
      "- **⭐ XP / day**: between 10 and 500 XP, by steps of 10 (default: 50)\n" +
      "- **🃏 Cards / day**: 5 to 200 cards, or **∞ unlimited** to not be tracked\n" +
      "- **📚 Lessons / day**: 1 to 10 lessons, or **∞ unlimited** too\n\n" +
      "### ⏱️ Minutes target driven by the preset\n\n" +
      "The minutes target now comes directly from the **Relaxed / Regular / Intense / Extreme** tiles (5 / 15 / 30 / 60 min). No more dual setting that could drift apart.\n\n" +
      "### 🔁 Cross-device sync\n\n" +
      "Your custom goals are synced via **Firestore** across all your devices. Adjust on iPad, see the change on your MacBook on next refresh. **↺ Reset** button to revert to defaults (50 XP / 10 min / unlimited).",
    date: '2026-06-07',
    tag: 'Réglages',
    category: 'feature',
    icon: '🎯',
    pinned: true
  },
  // ─── Juin 2026 — Tokens grammaticaux colorés ────────────────────────────
  {
    id: 'ann-grammar-tokens-2026-06',
    title: 'Grammaire en couleurs : tokens Sujet · Verbe · Objet',
    titleEn: 'Grammar in colors: Subject · Verb · Object tokens',
    body:
      "**Comprendre une phrase chinoise d'un seul coup d'œil**, sans relire trois fois pour décortiquer la structure. C'est la promesse des nouveaux tokens grammaticaux colorés, ajoutés sur **18 leçons** du A1 au B2.1.\n\n" +
      "### 🎨 10 rôles, 10 couleurs\n\n" +
      "Chaque mot d'une phrase d'exemple est encadré par une pastille colorée selon son rôle :\n\n" +
      "- 🔵 **Sujet**, 🟢 **Verbe**, 🟠 **Objet**, 🟡 **Particule**\n" +
      "- 🟣 **Temps**, 🟤 **Lieu**, ⚪ **Modificateur**, 🔴 **Copule** (是)\n" +
      "- 🟥 **Complément** (résultatifs / directionnels), 🟪 **Connecteur**\n\n" +
      "### 📚 Là où c'est déployé\n\n" +
      "- **A1** : Structure SVO de base, 是, 不, 吗, 的 (5 leçons)\n" +
      "- **A2** : 了 (perfectif), 过, 在 vs 正在 vs 着 (3 leçons)\n" +
      "- **B1.1** : 把, 被, 的 (tri), 是…的, 了 (changement d'état + durée) (7 leçons)\n" +
      "- **B1.2 / B2.1** : 比, compléments résultatifs et directionnels (3 leçons)\n\n" +
      "### 💡 Pourquoi c'est utile\n\n" +
      "Le chinois n'a pas d'accords ni de conjugaisons — la structure repose presque entièrement sur **l'ordre des mots** et les **particules**. Voir cette structure colorée aide à internaliser le schéma plutôt qu'à juste mémoriser des phrases. Inspiré directement du système de visualisation de Seonsaengnim (apprentissage du coréen).",
    bodyEn:
      "**Understand a Chinese sentence at a glance**, without rereading three times to dissect the structure. That's the promise of the new colored grammar tokens, added to **18 lessons** from A1 to B2.1.\n\n" +
      "### 🎨 10 roles, 10 colors\n\n" +
      "Each word in an example sentence is wrapped in a colored chip by role:\n\n" +
      "- 🔵 **Subject**, 🟢 **Verb**, 🟠 **Object**, 🟡 **Particle**\n" +
      "- 🟣 **Time**, 🟤 **Place**, ⚪ **Modifier**, 🔴 **Copula** (是)\n" +
      "- 🟥 **Complement** (resultative / directional), 🟪 **Connector**\n\n" +
      "### 📚 Where it ships\n\n" +
      "- **A1**: Basic SVO structure, 是, 不, 吗, 的 (5 lessons)\n" +
      "- **A2**: 了 (perfective), 过, 在 vs 正在 vs 着 (3 lessons)\n" +
      "- **B1.1**: 把, 被, 的 (sorting), 是…的, 了 (state change + duration) (7 lessons)\n" +
      "- **B1.2 / B2.1**: 比, resultative and directional complements (3 lessons)\n\n" +
      "### 💡 Why it helps\n\n" +
      "Chinese has no agreements or conjugations — structure rests almost entirely on **word order** and **particles**. Seeing that structure colored helps internalize the pattern rather than just memorize sentences. Directly inspired by the visualization system from Seonsaengnim (Korean learning).",
    date: '2026-06-05',
    tag: 'Grammaire',
    category: 'content',
    icon: '🎨',
    pinned: false
  },
  // ─── Mai 2026 — Atelier oral + écriture (Web Speech + HanziWriter) ──────
  {
    id: 'ann-atelier-prononciation-2026-05',
    title: 'Drill prononciation : parle, le micro évalue',
    titleEn: 'Pronunciation drill: speak, the mic grades you',
    body:
      "L'Atelier accueille un **nouveau drill oral** : tu appuies sur le micro, tu prononces le hanzi affiché, et XiaoLearn te donne un verdict immédiat ✓ / ~ / ✗ avec ce qu'il a entendu.\n\n" +
      "### 🎤 Comment ça marche\n\n" +
      "- Reconnaissance vocale chinoise (`zh-CN`) via la **Web Speech API** native du navigateur — pas d'envoi audio à un serveur, tout reste sur ton appareil\n" +
      "- Comparaison **tolérante au pinyin** : on accepte les tons numériques (`ni3` = `nǐ`) et on strip les accents avant de matcher\n" +
      "- 3 verdicts : **✓ Match** parfait, **~ Close** (proche, faute mineure), **✗ Mismatch** (rien à voir)\n" +
      "- Timeout 8 secondes — si tu ne parles pas, on annule poliment sans message d'erreur agressif\n\n" +
      "### 🃏 Où le retrouver\n\n" +
      "- **Atelier → Prononciation** : drill libre sur tes flashcards perso ou une liste de hanzi que tu colles\n" +
      "- **Flashcards** : bouton 🎤 à côté du 🔊 sur chaque carte, pour t'auto-tester en plus de la SRS classique\n" +
      "- **Leçons** : section drill prononciation en fin de leçon pour les mots fraîchement appris\n\n" +
      "### 🌐 Compatibilité\n\n" +
      "Fonctionne nativement sur **Chrome, Edge, Safari, Brave**. Sur Firefox, le bouton est désactivé avec un message explicite (pas d'API supportée). Sur mobile : autorisation micro requise à la première utilisation.",
    bodyEn:
      "The Atelier gets a **new oral drill**: tap the mic, speak the displayed hanzi, and XiaoLearn gives you an instant verdict ✓ / ~ / ✗ with what it heard.\n\n" +
      "### 🎤 How it works\n\n" +
      "- Chinese speech recognition (`zh-CN`) via the browser's native **Web Speech API** — no audio sent to a server, everything stays on your device\n" +
      "- **Pinyin-tolerant** comparison: numbered tones accepted (`ni3` = `nǐ`) and accents stripped before matching\n" +
      "- 3 verdicts: **✓ Match** perfect, **~ Close** (almost, minor slip), **✗ Mismatch** (way off)\n" +
      "- 8-second timeout — if you don't speak, we cancel politely without an aggressive error\n\n" +
      "### 🃏 Where to find it\n\n" +
      "- **Atelier → Pronunciation**: free drill on your personal flashcards or a hanzi list you paste\n" +
      "- **Flashcards**: 🎤 button next to 🔊 on every card, to self-test alongside the classic SRS\n" +
      "- **Lessons**: pronunciation drill section at the end of each lesson for freshly learned words\n\n" +
      "### 🌐 Compatibility\n\n" +
      "Works natively on **Chrome, Edge, Safari, Brave**. On Firefox the button is disabled with a clear message (no supported API). On mobile: mic permission requested on first use.",
    date: '2026-05-28',
    tag: 'Atelier',
    category: 'feature',
    icon: '🎤',
    pinned: true,
    illustration:
      '<img src="/img/announcements/drill-prononciation.png" alt="Drill prononciation — bouton micro et verdict" style="width:100%;border-radius:12px;display:block" />'
  },
  {
    id: 'ann-atelier-ecriture-2026-05',
    title: 'Drill écriture hanzi : trace au doigt, validation trait par trait',
    titleEn: 'Hanzi writing drill: trace with your finger, stroke-by-stroke check',
    body:
      "Apprendre à **écrire** le chinois, pas juste à le reconnaître. L'Atelier propose un nouveau drill calligraphique qui te fait tracer chaque caractère trait par trait, dans le bon ordre.\n\n" +
      "### ✍️ Le tracé en vrai\n\n" +
      "- Propulsé par **HanziWriter** : 9 000+ caractères supportés avec animations natives\n" +
      "- Trace au **doigt** (tactile), au **stylet** ou à la **souris** — la zone s'adapte à ton appareil\n" +
      "- **Validation trait par trait** : si tu rates l'ordre ou la direction, le trait clignote en rouge et tu refais\n" +
      "- **Hint** disponible quand tu bloques : un trait fantôme te montre par où passer\n" +
      "- Réussite = caractère qui se met en vert avec un petit pop visuel\n\n" +
      "### 🎯 Où l'utiliser\n\n" +
      "- **Atelier → Écriture** : drill libre sur tes flashcards ou une liste personnalisée (mots multi-caractères supportés)\n" +
      "- **Leçons** : drill écriture en fin de leçon pour ancrer le tracé des nouveaux mots\n" +
      "- **Flashcards** : mode « Écriture » dédié dans la rotation SRS, comme la prononciation\n\n" +
      "### 📊 Stats du tracé\n\n" +
      "Chaque caractère termine avec un récap : **nombre de traits**, **erreurs faites**, **hints utilisés**. C'est cumulé dans tes flashcards pour que la SRS sache si tu galères vraiment sur l'écriture (et pas juste la reconnaissance).\n\n" +
      "### 💡 Pourquoi c'est important\n\n" +
      "L'écriture est l'angle mort de 90 % des apps d'apprentissage du chinois — elles te font reconnaître et taper des hanzi, mais jamais en tracer un. Or l'ordre des traits est central pour mémoriser, lire les écritures cursives, et utiliser un dictionnaire papier.",
      bodyEn:
      "Learn to **write** Chinese, not just recognize it. The Atelier ships a new calligraphy drill that has you trace every character stroke by stroke, in the right order.\n\n" +
      "### ✍️ Real tracing\n\n" +
      "- Powered by **HanziWriter**: 9,000+ characters supported with native animations\n" +
      "- Trace with **finger** (touch), **stylus** or **mouse** — the canvas adapts to your device\n" +
      "- **Stroke-by-stroke validation**: miss the order or direction → the stroke flashes red and you retry\n" +
      "- **Hint** available when stuck: a ghost stroke shows the path\n" +
      "- Success = character turns green with a small visual pop\n\n" +
      "### 🎯 Where to use it\n\n" +
      "- **Atelier → Writing**: free drill on your flashcards or a custom list (multi-character words supported)\n" +
      "- **Lessons**: writing drill at the end of each lesson to lock in new word strokes\n" +
      "- **Flashcards**: dedicated « Writing » mode in the SRS rotation, just like pronunciation\n\n" +
      "### 📊 Tracing stats\n\n" +
      "Each character ends with a recap: **stroke count**, **mistakes made**, **hints used**. Cumulated in your flashcards so the SRS knows whether you're really struggling on writing (vs just recognition).\n\n" +
      "### 💡 Why it matters\n\n" +
      "Writing is the blind spot of 90% of Chinese learning apps — they make you recognize and type hanzi, but never trace one. Yet stroke order is central to memorization, reading cursive script, and using paper dictionaries.",
    date: '2026-05-28',
    tag: 'Atelier',
    category: 'feature',
    icon: '✍️',
    pinned: true,
    illustration:
      '<img src="/img/announcements/drill-ecriture-hanzi.png" alt="Drill écriture hanzi — tracé avec HanziWriter" style="width:100%;border-radius:12px;display:block" />'
  },
  // ─── Mai 2026 — refonte Prof. Xiao + popup vocab + recherche live ───────
  {
    id: 'ann-search-live-2026-05',
    title: 'Recherche universelle en direct',
    titleEn: 'Live universal search',
    body:
      "La barre de recherche en haut de XiaoLearn affiche maintenant un panneau de résultats **en direct**, plus besoin de naviguer entre les pages pour retrouver un mot ou une leçon.\n\n" +
      "### 🔍 Trois sections de résultats\n\n" +
      "- **Leçons** — les leçons parentes (ex: « Les chiffres — HSK 1 ») qui contiennent ton terme dans leur vocabulaire, avec un sous-titre « N mots correspondants » pour t'indiquer la richesse du match\n" +
      "- **Vocabulaire** — les mots HSK/CECR et tes flashcards perso qui matchent directement (hanzi, pinyin ou traduction), classés par pertinence (exact > commence par > contient)\n" +
      "- **Conversations Prof. Xiao** — tes anciennes discussions dont le titre matche, avec une date relative (« il y a 3j »)\n\n" +
      "### ✨ Raccourci Poser à Prof. Xiao\n\n" +
      "En bas du panneau, un bouton **« ✨ Poser à Prof. Xiao : <ta requête> »** apparaît systématiquement. Clic → tu es téléporté vers la page Prof. Xiao, le champ de saisie est pré-rempli, tu n'as plus qu'à valider. Pratique quand ta recherche n'a rien matché et que tu veux quand même creuser.\n\n" +
      "### 🎯 Navigation directe\n\n" +
      "Cliquer un résultat t'amène à la bonne page : la leçon s'ouvre directement (pas besoin de chercher dans le parcours), la conversation se charge, etc. La barre se ferme au clic dehors ou à Échap.",
    bodyEn:
      "The search bar at the top of XiaoLearn now shows a **live** results panel — no more navigating between pages to find a word or lesson.\n\n" +
      "### 🔍 Three result sections\n\n" +
      "- **Lessons** — parent lessons (e.g. « Numbers — HSK 1 ») that contain your term in their vocab, with an « N matching words » subtitle\n" +
      "- **Vocabulary** — HSK/CECR words and your personal flashcards that match directly (hanzi, pinyin or translation), ranked by relevance (exact > starts-with > contains)\n" +
      "- **Prof. Xiao conversations** — past discussions whose title matches, with a relative date (« 3d ago »)\n\n" +
      "### ✨ Ask Prof. Xiao shortcut\n\n" +
      "A **« ✨ Ask Prof. Xiao: <query> »** button always appears at the bottom. Click → you jump to the Prof. Xiao page with the composer pre-filled, just hit send. Useful when nothing matched and you want to dig deeper.\n\n" +
      "### 🎯 Direct navigation\n\n" +
      "Clicking a result jumps you to the right page: the lesson opens directly, the conversation loads, etc. The panel closes on outside-click or Escape.",
    date: '2026-05-13',
    tag: 'Recherche',
    category: 'feature',
    icon: '🔍',
    pinned: true,
    illustration:
      '<img src="/img/announcements/recherche-live.png" alt="Recherche universelle — panneau live avec résultats" style="width:100%;border-radius:12px;display:block" />'
  },
  {
    id: 'ann-mes-erreurs-2026-05',
    title: 'Mes erreurs : ton carnet de progression personnel',
    titleEn: 'My errors: your personal progress journal',
    body:
      "Un nouvel onglet **« Mes erreurs »** dans la sidebar gauche regroupe automatiquement chaque erreur que tu fais en discutant avec Prof. Xiao ou dans le Simulateur. Plus besoin de noter à la main ce que tu rates : XiaoLearn s'en occupe.\n\n" +
      "### 🏷️ Ce qui est capturé pour chaque erreur\n\n" +
      "- **Catégorie** parmi 11 types : particule, ton, prononciation, politesse, vocabulaire, grammaire, mesureur, caractère, traduction, orthographe, autre\n" +
      "- **Sévérité** : mineure (étourderie), importante (vraie confusion), critique (faux-sens)\n" +
      "- **Forme correcte** avec pinyin et traduction française\n" +
      "- **Explication contextuelle** rédigée par Prof. Xiao sur ton erreur précise\n" +
      "- **Source** : Prof. Xiao ou Simulateur\n\n" +
      "### 🔥 Section « À TRAVAILLER »\n\n" +
      "Les erreurs récurrentes (≥ 2 occurrences sur le même mot) sont automatiquement remontées en haut de page dans une bande rouge. Tu sais exactement quoi réviser en priorité, sans deviner.\n\n" +
      "### 🎚️ Filtres et tri\n\n" +
      "- Bascule entre **Tous**, **Prof. Xiao** et **Simulateur**\n" +
      "- Filtre par catégorie (clic sur les pastilles colorées en haut)\n" +
      "- Historique chronologique groupé par mois\n\n" +
      "### 🤖 Détection 100% auto\n\n" +
      "La capture se fait via un format **JSON structuré** que Gemini renvoie en même temps que sa réponse — pas de regex fragile, pas d'action manuelle. Si tu vois une carte de correction sous une bulle Prof. Xiao, c'est déjà enregistré dans Mes erreurs.",
    bodyEn:
      "A new **« My errors »** tab in the left sidebar automatically collects every mistake you make while chatting with Prof. Xiao or in the Simulator. No need to take notes — XiaoLearn does it for you.\n\n" +
      "### 🏷️ What's captured per error\n\n" +
      "- **Category** from 11 types: particle, tone, pronunciation, politeness, vocab, grammar, measure word, character, translation, spelling, other\n" +
      "- **Severity**: minor (slip), important (real confusion), critical (wrong meaning)\n" +
      "- **Correct form** with pinyin and French translation\n" +
      "- **Contextual explanation** written by Prof. Xiao on your specific mistake\n" +
      "- **Source**: Prof. Xiao or Simulator\n\n" +
      "### 🔥 « TO PRACTICE » section\n\n" +
      "Recurring errors (≥ 2 occurrences on the same word) automatically bubble up at the top of the page in a red band. You know exactly what to drill, no guessing.\n\n" +
      "### 🎚️ Filters and sorting\n\n" +
      "- Switch between **All**, **Prof. Xiao** and **Simulator**\n" +
      "- Filter by category (click the colored chips at the top)\n" +
      "- Chronological log grouped by month\n\n" +
      "### 🤖 100% auto detection\n\n" +
      "Capture runs on a **structured JSON** that Gemini returns alongside its reply — no brittle regex, no manual action. If you see a correction card under a Prof. Xiao bubble, it's already logged in My errors.",
    date: '2026-05-13',
    tag: 'Apprentissage',
    category: 'feature',
    icon: '📝',
    pinned: true,
    illustration:
      '<img src="/img/announcements/mes-erreurs.png" alt="Mes erreurs — carte erreur avec catégorie et correction" style="width:100%;border-radius:12px;display:block" />'
  },
  {
    id: 'ann-profxiao-refonte-2026-05',
    title: 'Prof. Xiao : interface simplifiée + popup vocabulaire',
    titleEn: 'Prof. Xiao: simplified UI + vocabulary popup',
    body:
      "La page Prof. Xiao a été entièrement repensée pour ressembler à un vrai chat moderne, avec en bonus un **popup vocabulaire** au clic sur chaque mot chinois.\n\n" +
      "### 🪟 Nouvelle interface\n\n" +
      "- **Layout deux colonnes** : historique des conversations à gauche, fil de discussion à droite\n" +
      "- **Hauteur fixe** avec scroll interne — la page ne s'étend plus indéfiniment\n" +
      "- **Header allégé** : avatar du prof + titre + sous-titre + badge En ligne\n" +
      "- Plus de sélecteur de mode visible (toujours sur Équilibré par défaut)\n\n" +
      "### 🈸 Popup vocabulaire au clic\n\n" +
      "Chaque bloc chinois ≥ 3 hanzi dans une bulle Prof. Xiao est tokenisé en mots cliquables, soulignés en pointillé rouge. Clic → popup avec :\n\n" +
      "- Le **hanzi** en gros + bouton 🔊 audio\n" +
      "- Le **pinyin** automatique\n" +
      "- La **traduction** (CFDICT ou décomposition caractère-par-caractère)\n" +
      "- Une **phrase d'exemple** extraite de la conversation, avec pinyin auto et traduction si détectable\n" +
      "- Un bouton **+ Ajouter à mes flashcards** (Lifetime), qui bascule en **✓ Dans tes flashcards** si la carte existe déjà\n\n" +
      "### 🎯 Pourquoi un seuil de 3 hanzi ?\n\n" +
      "Les mentions inline d'un caractère unique (genre « la particule 了 ») déclenchaient des popups avec une traduction CFDICT hors contexte (了 = « finir » alors qu'ici c'est une particule) et un pinyin polyphonique faux (`liǎo` au lieu de `le`). On filtre maintenant ces blocs courts pour ne garder que les vraies phrases d'exemple.",
    bodyEn:
      "The Prof. Xiao page was completely rebuilt to feel like a real modern chat, with a bonus **vocabulary popup** on every Chinese word click.\n\n" +
      "### 🪟 New interface\n\n" +
      "- **Two-column layout**: conversation history on the left, message thread on the right\n" +
      "- **Fixed height** with internal scroll — the page no longer expands forever\n" +
      "- **Lighter header**: teacher avatar + title + subtitle + Online badge\n" +
      "- No more visible mode selector (always on Balanced by default)\n\n" +
      "### 🈸 Click-to-define popup\n\n" +
      "Every Chinese block ≥ 3 hanzi in a Prof. Xiao bubble is tokenized into clickable words, underlined with red dotted lines. Click → popup with:\n\n" +
      "- Large **hanzi** + 🔊 audio button\n" +
      "- Auto **pinyin**\n" +
      "- **Translation** (CFDICT or per-character breakdown)\n" +
      "- An **example sentence** pulled from the conversation, with auto-pinyin and translation when detectable\n" +
      "- A **+ Add to flashcards** button (Lifetime), switching to **✓ In your flashcards** if already present\n\n" +
      "### 🎯 Why a 3-hanzi threshold?\n\n" +
      "Inline mentions of a single character (e.g. « the particle 了 ») used to trigger popups with out-of-context CFDICT translations (了 = « finish » when here it's a particle) and wrong polyphonic pinyin (`liǎo` instead of `le`). We now filter these short blocks to only keep real example sentences.",
    date: '2026-05-13',
    tag: 'Prof. Xiao',
    category: 'feature',
    icon: '👩‍🏫',
    pinned: true,
    illustration:
      '<img src="/img/announcements/profxiao-popup-vocab.png" alt="Prof. Xiao — popup vocabulaire au clic sur un hanzi" style="width:100%;border-radius:12px;display:block" />'
  },
  // ─── Mai 2026 — historique antérieur ────────────────────────────────────
  {
    id: 'ann-smartmix-audio-2026-05',
    title: 'SmartMix : audio sur les questions d\'écoute',
    titleEn: 'SmartMix: audio on listening questions',
    body:
      "Les questions de révision « Écoute le ton et identifie la bonne syllabe » jouent enfin l'audio automatiquement à l'affichage, avec un bouton 🔊 pour relancer.\n\n" +
      "### 🎧 Ce qui change concrètement\n\n" +
      "- **Auto-play** au chargement de la question (tu entends mā / má / mǎ / mà sans rien cliquer)\n" +
      "- Bouton **🔊 Rejouer** à côté de l'énoncé pour relancer autant de fois que nécessaire\n" +
      "- Audios issus du dataset **MP3 pré-généré** (voix native), plus de Web Speech navigateur — fini les prononciations bizarres sur Chrome Windows\n\n" +
      "### 📚 Disponible dans tous les modes de révision\n\n" +
      "- **SmartMix** — mélange algorithmique principal\n" +
      "- **Daily** — objectif quotidien\n" +
      "- **Weakness** — focus sur tes erreurs\n" +
      "- **Free** — leçons choisies manuellement\n\n" +
      "Les exercices de discrimination tonale deviennent enfin réalistes — exactement le format d'un test HSK oral.",
    bodyEn:
      "Listening review questions (« hear the tone and pick the right syllable ») now auto-play their audio when shown, with a 🔊 button to replay.\n\n" +
      "### 🎧 What changes concretely\n\n" +
      "- **Auto-play** when the question loads (you hear mā / má / mǎ / mà without clicking)\n" +
      "- **🔊 Replay** button next to the prompt for unlimited replays\n" +
      "- Audio from the **pre-generated MP3 dataset** (native voice), no more browser Web Speech — bye odd pronunciations on Chrome Windows\n\n" +
      "### 📚 Available in every review mode\n\n" +
      "- **SmartMix** — main algorithmic mix\n" +
      "- **Daily** — daily goal\n" +
      "- **Weakness** — focus on your mistakes\n" +
      "- **Free** — manually picked lessons\n\n" +
      "Tone discrimination drills finally feel realistic — exactly like a HSK oral exam format.",
    date: '2026-05-11',
    tag: 'Révisions',
    category: 'review',
    icon: '🎧',
    pinned: true
  },
  {
    id: 'ann-stripe-2026-05',
    title: 'Abonnements XiaoLearn : Mensuel + Lifetime',
    titleEn: 'XiaoLearn plans: Monthly + Lifetime',
    body:
      "XiaoLearn Premium est disponible avec deux formules au choix, accessibles depuis la page **Réglages → Abonnement**.\n\n" +
      "### 💎 Deux formules\n\n" +
      "- **Mensuel — 14 €/mois** : résiliable à tout moment, idéal pour tester\n" +
      "- **Lifetime — 99 €** : paiement unique, accès à vie à tout ce qui sortira (y compris les futures fonctionnalités IA)\n\n" +
      "### 🔓 Ce que Premium débloque\n\n" +
      "- **Simulateur Prof. Xiao** : 10+ scénarios immersifs (restaurant, métro, marchandage, entretien pro, consultation médicale…)\n" +
      "- **Révisions illimitées** : SmartMix sans cap quotidien\n" +
      "- **Mini-jeux** : Sentence Builder, Pinyin Typing, Tone Trainer, Dictation\n" +
      "- **500 flashcards perso** (deck custom avec pinyin auto)\n" +
      "- **Toutes les nouveautés futures** sans surcoût (Lifetime uniquement)\n\n" +
      "### 💳 Paiement sécurisé\n\n" +
      "Stripe Checkout : Visa, Mastercard, **Apple Pay**, **Google Pay**. Pas de compte additionnel à créer.\n\n" +
      "### 📱 Sync cross-device\n\n" +
      "À la souscription, ton compte est automatiquement reconnu sur **iPhone, iPad, Mac, PC, Android** via Firestore.",
    bodyEn:
      "XiaoLearn Premium is available with two plans, both accessible from **Settings → Subscription**.\n\n" +
      "### 💎 Two plans\n\n" +
      "- **Monthly — €14/mo**: cancel anytime, great to test\n" +
      "- **Lifetime — €99**: one-time payment, lifetime access to everything that ships (including future AI features)\n\n" +
      "### 🔓 What Premium unlocks\n\n" +
      "- **Prof. Xiao Simulator**: 10+ immersive scenarios (restaurant, metro, haggling, job interview, doctor's office…)\n" +
      "- **Unlimited reviews**: SmartMix with no daily cap\n" +
      "- **Mini-games**: Sentence Builder, Pinyin Typing, Tone Trainer, Dictation\n" +
      "- **500 personal flashcards** (custom deck with auto-pinyin)\n" +
      "- **All future features** at no extra cost (Lifetime only)\n\n" +
      "### 💳 Secure payment\n\n" +
      "Stripe Checkout: Visa, Mastercard, **Apple Pay**, **Google Pay**. No extra account to create.\n\n" +
      "### 📱 Cross-device sync\n\n" +
      "Once you subscribe, your account is automatically recognised on **iPhone, iPad, Mac, PC, Android** via Firestore.",
    date: '2026-05-08',
    tag: 'Premium',
    category: 'feature',
    icon: '💎',
    pinned: true
  },

  // ─── Avril 2026 ─────────────────────────────────────────────────────────
  {
    id: 'ann-simulator-2026-04',
    title: 'Simulateur de Situations',
    titleEn: 'Situations Simulator',
    body:
      "Plonge dans des conversations interactives en chinois, écrites par un native speaker et jouées par l'IA. Tu joues ton rôle, l'IA joue le sien, vous échangez librement en hanzi.\n\n" +
      "### 🎭 10+ scénarios immersifs\n\n" +
      "**Vie quotidienne**\n\n" +
      "- Commander au restaurant\n" +
      "- Prendre le métro à Shanghai\n" +
      "- Marchander au marché\n" +
      "- Demander son chemin\n\n" +
      "**Travail**\n\n" +
      "- Première rencontre professionnelle\n" +
      "- Négociation salariale\n" +
      "- Présentation produit\n\n" +
      "**Vie sociale**\n\n" +
      "- Échange culturel à un mariage\n" +
      "- Consultation médicale\n" +
      "- Location d'appartement\n" +
      "- Dialogue avec un parent chinois traditionnel\n\n" +
      "### 🎯 Comment ça marche\n\n" +
      "1. Tu choisis un scénario et lis le briefing (ton rôle, l'objectif, le vocab utile)\n" +
      "2. Tu démarres la conversation en chinois — Prof. Xiao joue l'autre personnage\n" +
      "3. Si tu rates, l'IA te corrige discrètement (et l'erreur file dans **Mes erreurs**)\n" +
      "4. À la fin tu reçois un score + un retour détaillé sur ce qui a marché ou non\n\n" +
      "### 🔓 Accès\n\n" +
      "Disponible avec **Premium Lifetime**. Le vocabulaire s'adapte à ton niveau (HSK 1 → 6).",
    bodyEn:
      "Dive into interactive Chinese conversations, written by a native speaker and played by the AI. You play your role, the AI plays its role, you exchange freely in hanzi.\n\n" +
      "### 🎭 10+ immersive scenarios\n\n" +
      "**Daily life**\n\n" +
      "- Ordering at a restaurant\n" +
      "- Taking the metro in Shanghai\n" +
      "- Haggling at a market\n" +
      "- Asking for directions\n\n" +
      "**Work**\n\n" +
      "- First professional meeting\n" +
      "- Salary negotiation\n" +
      "- Product pitch\n\n" +
      "**Social life**\n\n" +
      "- Cultural exchange at a wedding\n" +
      "- Doctor's appointment\n" +
      "- Apartment rental\n" +
      "- Dialogue with a traditional Chinese parent\n\n" +
      "### 🎯 How it works\n\n" +
      "1. Pick a scenario and read the briefing (your role, the goal, useful vocab)\n" +
      "2. Start the conversation in Chinese — Prof. Xiao plays the other character\n" +
      "3. If you slip, the AI corrects you quietly (and the mistake lands in **My errors**)\n" +
      "4. At the end you get a score + a detailed recap of what worked or didn't\n\n" +
      "### 🔓 Access\n\n" +
      "Available with **Premium Lifetime**. Vocabulary scales to your level (HSK 1 → 6).",
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

