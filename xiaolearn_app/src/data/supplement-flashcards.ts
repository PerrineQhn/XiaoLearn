/**
 * supplement-flashcards.ts
 * ------------------------
 * Supplément consolidant toutes les flashcards référencées par les leçons
 * (lesson-paths, level1-course, level2-course, simple-lessons, grammar-lessons,
 *  dictation-phrases, culture-topics) mais absentes du dataset HSK JSON.
 *
 * Généré automatiquement par gen_supplement.py (R6).
 *
 * Contient deux parties :
 *   1. `level1WordBankFlat` : ré-export aplati de `level1LessonWordBank`
 *      (déjà défini dans level1-course.ts). Ces entrées existent mais n'étaient
 *      pas indexées par lessonByHanziIndex. On les ré-exporte pour permettre
 *      leur résolution globale.
 *   2. `newSupplementItems` : nouvelles LessonItems pour les refs encore
 *      sans définition (sentences de connecteurs, chengyu, vocabulaire).
 */

import type { LessonItem } from '../types';
import { level1LessonWordBank } from './level1-course';

const level1WordBankFlat: LessonItem[] = Object.values(level1LessonWordBank).flat();

const newSupplementItems: LessonItem[] = [
  {
    id: "supp-6532495a",
    level: "hsk2",
    hanzi: "一方面...另一方面",
    pinyin: "yī fāngmiàn... lìng yī fāngmiàn",
    translation: "on one hand... on the other hand",
    translationFr: "d'un côté... de l'autre côté",
    category: "phrase",
    examples: [
      {
        hanzi: "一方面...另一方面",
        pinyin: "yī fāngmiàn... lìng yī fāngmiàn",
        translation: "on one hand... on the other hand",
        translationFr: "d'un côté... de l'autre côté"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 一方面...另一方面 »",
      choices: ["d'un côté... de l'autre côté", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["phrase", "supplement"],
    theme: "expressions"
  },
  {
    id: "supp-48828c35",
    level: "hsk4",
    hanzi: "一点也不",
    pinyin: "yīdiǎn yě bù",
    translation: "not at all",
    translationFr: "pas du tout",
    category: "idiom",
    examples: [
      {
        hanzi: "一点也不",
        pinyin: "yīdiǎn yě bù",
        translation: "not at all",
        translationFr: "pas du tout"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 一点也不 »",
      choices: ["pas du tout", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement"],
    theme: "chengyu"
  },
  {
    id: "supp-0ccb8f35",
    level: "hsk2",
    hanzi: "三人行必有我师",
    pinyin: "sān rén xíng bì yǒu wǒ shī",
    translation: "among three walking, one can be my teacher (Confucius)",
    translationFr: "parmi trois personnes, il y a toujours un maître pour moi (Confucius)",
    category: "phrase",
    examples: [
      {
        hanzi: "三人行必有我师",
        pinyin: "sān rén xíng bì yǒu wǒ shī",
        translation: "among three walking, one can be my teacher (Confucius)",
        translationFr: "parmi trois personnes, il y a toujours un maître pour moi (Confucius)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 三人行必有我师 »",
      choices: ["parmi trois personnes, il y a toujours un maître pour moi (Confucius)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["phrase", "supplement"],
    theme: "expressions"
  },
  {
    id: "supp-7ff491d6",
    level: "hsk4",
    hanzi: "三国演义",
    pinyin: "sānguó yǎnyì",
    translation: "Romance of the Three Kingdoms (classical novel)",
    translationFr: "Les Trois Royaumes (roman classique)",
    category: "idiom",
    examples: [
      {
        hanzi: "三国演义",
        pinyin: "sānguó yǎnyì",
        translation: "Romance of the Three Kingdoms (classical novel)",
        translationFr: "Les Trois Royaumes (roman classique)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 三国演义 »",
      choices: ["Les Trois Royaumes (roman classique)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement"],
    theme: "chengyu"
  },
  {
    id: "supp-4f57dec1",
    level: "hsk3",
    hanzi: "不了",
    pinyin: "bù liǎo",
    translation: "can't (verbal complement)",
    translationFr: "ne pas pouvoir (complément verbal)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "不了",
        pinyin: "bù liǎo",
        translation: "can't (verbal complement)",
        translationFr: "ne pas pouvoir (complément verbal)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 不了 »",
      choices: ["ne pas pouvoir (complément verbal)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-13d3cb91",
    level: "hsk2",
    hanzi: "不仅...还",
    pinyin: "bùjǐn... hái",
    translation: "not only... but also",
    translationFr: "non seulement... mais aussi",
    category: "phrase",
    examples: [
      {
        hanzi: "不仅...还",
        pinyin: "bùjǐn... hái",
        translation: "not only... but also",
        translationFr: "non seulement... mais aussi"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 不仅...还 »",
      choices: ["non seulement... mais aussi", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["phrase", "supplement"],
    theme: "expressions"
  },
  {
    id: "supp-40dea0ca",
    level: "hsk3",
    hanzi: "不会",
    pinyin: "bù huì",
    translation: "cannot / don't know how to",
    translationFr: "ne sais pas / ne peux pas",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "不会",
        pinyin: "bù huì",
        translation: "cannot / don't know how to",
        translationFr: "ne sais pas / ne peux pas"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 不会 »",
      choices: ["ne sais pas / ne peux pas", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-2774f641",
    level: "hsk2",
    hanzi: "不但...而且",
    pinyin: "bùdàn... érqiě",
    translation: "not only... but also",
    translationFr: "non seulement... mais aussi",
    category: "phrase",
    examples: [
      {
        hanzi: "不但...而且",
        pinyin: "bùdàn... érqiě",
        translation: "not only... but also",
        translationFr: "non seulement... mais aussi"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 不但...而且 »",
      choices: ["non seulement... mais aussi", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["phrase", "supplement"],
    theme: "expressions"
  },
  {
    id: "supp-7b41c060",
    level: "hsk3",
    hanzi: "不太",
    pinyin: "bù tài",
    translation: "not very",
    translationFr: "pas très, pas trop",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "不太",
        pinyin: "bù tài",
        translation: "not very",
        translationFr: "pas très, pas trop"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 不太 »",
      choices: ["pas très, pas trop", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-d843f35c",
    level: "hsk3",
    hanzi: "不擅长",
    pinyin: "bù shàncháng",
    translation: "not good at",
    translationFr: "ne pas être doué pour",
    category: "expression",
    examples: [
      {
        hanzi: "不擅长",
        pinyin: "bù shàncháng",
        translation: "not good at",
        translationFr: "ne pas être doué pour"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 不擅长 »",
      choices: ["ne pas être doué pour", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["expression", "supplement"],
    theme: "expressions"
  },
  {
    id: "supp-38f9286b",
    level: "hsk3",
    hanzi: "不能",
    pinyin: "bù néng",
    translation: "cannot",
    translationFr: "ne peut pas",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "不能",
        pinyin: "bù néng",
        translation: "cannot",
        translationFr: "ne peut pas"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 不能 »",
      choices: ["ne peut pas", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-984f2baa",
    level: "hsk2",
    hanzi: "与其...不如",
    pinyin: "yǔqí... bùrú",
    translation: "rather than... it's better to",
    translationFr: "plutôt que... il vaut mieux",
    category: "phrase",
    examples: [
      {
        hanzi: "与其...不如",
        pinyin: "yǔqí... bùrú",
        translation: "rather than... it's better to",
        translationFr: "plutôt que... il vaut mieux"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 与其...不如 »",
      choices: ["plutôt que... il vaut mieux", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["phrase", "supplement"],
    theme: "expressions"
  },
  {
    id: "supp-12b73b80",
    level: "hsk1",
    hanzi: "义",
    pinyin: "yì",
    translation: "righteousness (Confucian value)",
    translationFr: "droiture, justice (valeur confucéenne)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "义",
        pinyin: "yì",
        translation: "righteousness (Confucian value)",
        translationFr: "droiture, justice (valeur confucéenne)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 义 »",
      choices: ["droiture, justice (valeur confucéenne)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "base"
  },
  {
    id: "supp-d3815ad7",
    level: "hsk3",
    hanzi: "书面语",
    pinyin: "shūmiànyǔ",
    translation: "written language",
    translationFr: "langue écrite",
    category: "expression",
    examples: [
      {
        hanzi: "书面语",
        pinyin: "shūmiànyǔ",
        translation: "written language",
        translationFr: "langue écrite"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 书面语 »",
      choices: ["langue écrite", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["expression", "supplement"],
    theme: "expressions"
  },
  {
    id: "supp-554003c7",
    level: "hsk3",
    hanzi: "买单",
    pinyin: "mǎidān",
    translation: "pay the bill",
    translationFr: "payer l'addition",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "买单",
        pinyin: "mǎidān",
        translation: "pay the bill",
        translationFr: "payer l'addition"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 买单 »",
      choices: ["payer l'addition", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-cfa6a08f",
    level: "hsk1",
    hanzi: "仁",
    pinyin: "rén",
    translation: "benevolence (Confucian value)",
    translationFr: "humanité, bienveillance (valeur confucéenne)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "仁",
        pinyin: "rén",
        translation: "benevolence (Confucian value)",
        translationFr: "humanité, bienveillance (valeur confucéenne)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 仁 »",
      choices: ["humanité, bienveillance (valeur confucéenne)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "base"
  },
  {
    id: "supp-474cd02d",
    level: "hsk3",
    hanzi: "付款",
    pinyin: "fùkuǎn",
    translation: "pay / payment",
    translationFr: "payer, paiement",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "付款",
        pinyin: "fùkuǎn",
        translation: "pay / payment",
        translationFr: "payer, paiement"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 付款 »",
      choices: ["payer, paiement", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-c5a345e7",
    level: "hsk3",
    hanzi: "传统与现代",
    pinyin: "chuántǒng yǔ xiàndài",
    translation: "tradition and modernity",
    translationFr: "tradition et modernité",
    category: "expression",
    examples: [
      {
        hanzi: "传统与现代",
        pinyin: "chuántǒng yǔ xiàndài",
        translation: "tradition and modernity",
        translationFr: "tradition et modernité"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 传统与现代 »",
      choices: ["tradition et modernité", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["expression", "supplement"],
    theme: "expressions"
  },
  {
    id: "supp-d1405288",
    level: "hsk3",
    hanzi: "例证",
    pinyin: "lìzhèng",
    translation: "illustrative example",
    translationFr: "exemple illustratif",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "例证",
        pinyin: "lìzhèng",
        translation: "illustrative example",
        translationFr: "exemple illustratif"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 例证 »",
      choices: ["exemple illustratif", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-fcfd9fba",
    level: "hsk3",
    hanzi: "信函",
    pinyin: "xìnhán",
    translation: "letter / correspondence",
    translationFr: "lettre, correspondance",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "信函",
        pinyin: "xìnhán",
        translation: "letter / correspondence",
        translationFr: "lettre, correspondance"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 信函 »",
      choices: ["lettre, correspondance", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-e19e085c",
    level: "hsk3",
    hanzi: "信服",
    pinyin: "xìnfú",
    translation: "be convinced",
    translationFr: "être convaincu",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "信服",
        pinyin: "xìnfú",
        translation: "be convinced",
        translationFr: "être convaincu"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 信服 »",
      choices: ["être convaincu", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-18420053",
    level: "hsk3",
    hanzi: "修辞",
    pinyin: "xiūcí",
    translation: "rhetoric",
    translationFr: "rhétorique",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "修辞",
        pinyin: "xiūcí",
        translation: "rhetoric",
        translationFr: "rhétorique"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 修辞 »",
      choices: ["rhétorique", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-243aced1",
    level: "hsk3",
    hanzi: "假说",
    pinyin: "jiǎshuō",
    translation: "hypothesis",
    translationFr: "hypothèse",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "假说",
        pinyin: "jiǎshuō",
        translation: "hypothesis",
        translationFr: "hypothèse"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 假说 »",
      choices: ["hypothèse", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-c9d4daa1",
    level: "hsk3",
    hanzi: "兴衰",
    pinyin: "xīngshuāi",
    translation: "rise and fall",
    translationFr: "essor et déclin",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "兴衰",
        pinyin: "xīngshuāi",
        translation: "rise and fall",
        translationFr: "essor et déclin"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 兴衰 »",
      choices: ["essor et déclin", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-c2c9bb81",
    level: "hsk3",
    hanzi: "典故",
    pinyin: "diǎngù",
    translation: "literary allusion",
    translationFr: "allusion littéraire",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "典故",
        pinyin: "diǎngù",
        translation: "literary allusion",
        translationFr: "allusion littéraire"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 典故 »",
      choices: ["allusion littéraire", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-74db5b4c",
    level: "hsk3",
    hanzi: "典籍",
    pinyin: "diǎnjí",
    translation: "ancient classics",
    translationFr: "classiques anciens",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "典籍",
        pinyin: "diǎnjí",
        translation: "ancient classics",
        translationFr: "classiques anciens"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 典籍 »",
      choices: ["classiques anciens", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-fa67bb22",
    level: "hsk4",
    hanzi: "几月几号",
    pinyin: "jǐ yuè jǐ hào",
    translation: "what month, what day",
    translationFr: "quel mois, quel jour",
    category: "idiom",
    examples: [
      {
        hanzi: "几月几号",
        pinyin: "jǐ yuè jǐ hào",
        translation: "what month, what day",
        translationFr: "quel mois, quel jour"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 几月几号 »",
      choices: ["quel mois, quel jour", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement"],
    theme: "chengyu"
  },
  {
    id: "supp-994f48ba",
    level: "hsk1",
    hanzi: "别",
    pinyin: "bié",
    translation: "don't (imperative)",
    translationFr: "ne pas (impératif négatif)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "别",
        pinyin: "bié",
        translation: "don't (imperative)",
        translationFr: "ne pas (impératif négatif)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 别 »",
      choices: ["ne pas (impératif négatif)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "base"
  },
  {
    id: "supp-81ea3a3b",
    level: "hsk2",
    hanzi: "即使...也",
    pinyin: "jíshǐ... yě",
    translation: "even if... still",
    translationFr: "même si... quand même",
    category: "phrase",
    examples: [
      {
        hanzi: "即使...也",
        pinyin: "jíshǐ... yě",
        translation: "even if... still",
        translationFr: "même si... quand même"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 即使...也 »",
      choices: ["même si... quand même", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["phrase", "supplement"],
    theme: "expressions"
  },
  {
    id: "supp-3d0a2df9",
    level: "hsk3",
    hanzi: "参数",
    pinyin: "cānshù",
    translation: "parameter",
    translationFr: "paramètre",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "参数",
        pinyin: "cānshù",
        translation: "parameter",
        translationFr: "paramètre"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 参数 »",
      choices: ["paramètre", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-fb507f2c",
    level: "hsk4",
    hanzi: "参考文献",
    pinyin: "cānkǎo wénxiàn",
    translation: "references / bibliography",
    translationFr: "références bibliographiques",
    category: "idiom",
    examples: [
      {
        hanzi: "参考文献",
        pinyin: "cānkǎo wénxiàn",
        translation: "references / bibliography",
        translationFr: "références bibliographiques"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 参考文献 »",
      choices: ["références bibliographiques", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement"],
    theme: "chengyu"
  },
  {
    id: "supp-f8f6cdf6",
    level: "hsk3",
    hanzi: "双关",
    pinyin: "shuāngguān",
    translation: "pun / double meaning",
    translationFr: "jeu de mots, double sens",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "双关",
        pinyin: "shuāngguān",
        translation: "pun / double meaning",
        translationFr: "jeu de mots, double sens"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 双关 »",
      choices: ["jeu de mots, double sens", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-156ffe12",
    level: "hsk3",
    hanzi: "反方",
    pinyin: "fǎnfāng",
    translation: "opposing side",
    translationFr: "partie opposée",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "反方",
        pinyin: "fǎnfāng",
        translation: "opposing side",
        translationFr: "partie opposée"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 反方 »",
      choices: ["partie opposée", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-d180f42f",
    level: "hsk3",
    hanzi: "反讽",
    pinyin: "fǎnfěng",
    translation: "irony",
    translationFr: "ironie",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "反讽",
        pinyin: "fǎnfěng",
        translation: "irony",
        translationFr: "ironie"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 反讽 »",
      choices: ["ironie", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-ddc7d28b",
    level: "hsk3",
    hanzi: "变量",
    pinyin: "biànliàng",
    translation: "variable",
    translationFr: "variable",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "变量",
        pinyin: "biànliàng",
        translation: "variable",
        translationFr: "variable"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 变量 »",
      choices: ["variable", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-a917c465",
    level: "hsk3",
    hanzi: "古文",
    pinyin: "gǔwén",
    translation: "classical Chinese",
    translationFr: "chinois classique",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "古文",
        pinyin: "gǔwén",
        translation: "classical Chinese",
        translationFr: "chinois classique"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 古文 »",
      choices: ["chinois classique", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-3130ccd4",
    level: "hsk3",
    hanzi: "可持续",
    pinyin: "kěchíxù",
    translation: "sustainable",
    translationFr: "durable, soutenable",
    category: "expression",
    examples: [
      {
        hanzi: "可持续",
        pinyin: "kěchíxù",
        translation: "sustainable",
        translationFr: "durable, soutenable"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 可持续 »",
      choices: ["durable, soutenable", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["expression", "supplement"],
    theme: "expressions"
  },
  {
    id: "supp-23ff256f",
    level: "hsk3",
    hanzi: "可靠性",
    pinyin: "kěkàoxìng",
    translation: "reliability",
    translationFr: "fiabilité",
    category: "expression",
    examples: [
      {
        hanzi: "可靠性",
        pinyin: "kěkàoxìng",
        translation: "reliability",
        translationFr: "fiabilité"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 可靠性 »",
      choices: ["fiabilité", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["expression", "supplement"],
    theme: "expressions"
  },
  {
    id: "supp-9ed8a813",
    level: "hsk3",
    hanzi: "史记",
    pinyin: "shǐjì",
    translation: "Records of the Grand Historian (Sima Qian)",
    translationFr: "Mémoires historiques (Sima Qian)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "史记",
        pinyin: "shǐjì",
        translation: "Records of the Grand Historian (Sima Qian)",
        translationFr: "Mémoires historiques (Sima Qian)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 史记 »",
      choices: ["Mémoires historiques (Sima Qian)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-6c3ccd82",
    level: "hsk3",
    hanzi: "听音乐",
    pinyin: "tīng yīnyuè",
    translation: "listen to music",
    translationFr: "écouter de la musique",
    category: "expression",
    examples: [
      {
        hanzi: "听音乐",
        pinyin: "tīng yīnyuè",
        translation: "listen to music",
        translationFr: "écouter de la musique"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 听音乐 »",
      choices: ["écouter de la musique", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["expression", "supplement"],
    theme: "expressions"
  },
  {
    id: "supp-ab20cc42",
    level: "hsk1",
    hanzi: "和",
    pinyin: "hé",
    translation: "and",
    translationFr: "et",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "和",
        pinyin: "hé",
        translation: "and",
        translationFr: "et"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 和 »",
      choices: ["et", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "base"
  },
  {
    id: "supp-b0f1e487",
    level: "hsk4",
    hanzi: "塞翁失马",
    pinyin: "sài wēng shī mǎ",
    translation: "a blessing in disguise",
    translationFr: "à quelque chose malheur est bon",
    category: "idiom",
    examples: [
      {
        hanzi: "塞翁失马",
        pinyin: "sài wēng shī mǎ",
        translation: "a blessing in disguise",
        translationFr: "à quelque chose malheur est bon"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 塞翁失马 »",
      choices: ["à quelque chose malheur est bon", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement"],
    theme: "chengyu"
  },
  {
    id: "supp-392a1e94",
    level: "hsk4",
    hanzi: "大失所望",
    pinyin: "dà shī suǒ wàng",
    translation: "greatly disappointed",
    translationFr: "être extrêmement déçu",
    category: "idiom",
    examples: [
      {
        hanzi: "大失所望",
        pinyin: "dà shī suǒ wàng",
        translation: "greatly disappointed",
        translationFr: "être extrêmement déçu"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 大失所望 »",
      choices: ["être extrêmement déçu", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement"],
    theme: "chengyu"
  },
  {
    id: "supp-63564453",
    level: "hsk4",
    hanzi: "大显身手",
    pinyin: "dà xiǎn shēn shǒu",
    translation: "to fully display one's talents",
    translationFr: "montrer pleinement ses talents",
    category: "idiom",
    examples: [
      {
        hanzi: "大显身手",
        pinyin: "dà xiǎn shēn shǒu",
        translation: "to fully display one's talents",
        translationFr: "montrer pleinement ses talents"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 大显身手 »",
      choices: ["montrer pleinement ses talents", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement"],
    theme: "chengyu"
  },
  {
    id: "supp-bc208cc9",
    level: "hsk4",
    hanzi: "天人合一",
    pinyin: "tiān rén hé yī",
    translation: "unity of heaven and humanity",
    translationFr: "l'unité du ciel et de l'homme",
    category: "idiom",
    examples: [
      {
        hanzi: "天人合一",
        pinyin: "tiān rén hé yī",
        translation: "unity of heaven and humanity",
        translationFr: "l'unité du ciel et de l'homme"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 天人合一 »",
      choices: ["l'unité du ciel et de l'homme", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement"],
    theme: "chengyu"
  },
  {
    id: "supp-9fc936f0",
    level: "hsk2",
    hanzi: "失败是成功之母",
    pinyin: "shībài shì chénggōng zhī mǔ",
    translation: "failure is the mother of success",
    translationFr: "l'échec est la mère du succès",
    category: "phrase",
    examples: [
      {
        hanzi: "失败是成功之母",
        pinyin: "shībài shì chénggōng zhī mǔ",
        translation: "failure is the mother of success",
        translationFr: "l'échec est la mère du succès"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 失败是成功之母 »",
      choices: ["l'échec est la mère du succès", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["phrase", "supplement"],
    theme: "expressions"
  },
  {
    id: "supp-4880bbcb",
    level: "hsk4",
    hanzi: "如虎添翼",
    pinyin: "rú hǔ tiān yì",
    translation: "like a tiger with added wings",
    translationFr: "comme un tigre à qui on ajoute des ailes",
    category: "idiom",
    examples: [
      {
        hanzi: "如虎添翼",
        pinyin: "rú hǔ tiān yì",
        translation: "like a tiger with added wings",
        translationFr: "comme un tigre à qui on ajoute des ailes"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 如虎添翼 »",
      choices: ["comme un tigre à qui on ajoute des ailes", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement"],
    theme: "chengyu"
  },
  {
    id: "supp-11148107",
    level: "hsk1",
    hanzi: "妈",
    pinyin: "mā",
    translation: "mom",
    translationFr: "maman",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "妈",
        pinyin: "mā",
        translation: "mom",
        translationFr: "maman"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 妈 »",
      choices: ["maman", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "base"
  },
  {
    id: "supp-644fcb0a",
    level: "hsk4",
    hanzi: "孝道",
    pinyin: "xiàodào",
    translation: "filial piety",
    translationFr: "piété filiale",
    category: "culture",
    examples: [
      {
        hanzi: "孝道",
        pinyin: "xiàodào",
        translation: "filial piety",
        translationFr: "piété filiale"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 孝道 »",
      choices: ["piété filiale", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["culture", "supplement"],
    theme: "confucianisme"
  },
  {
    id: "supp-662addf3",
    level: "hsk4",
    hanzi: "学无止境",
    pinyin: "xué wú zhǐ jìng",
    translation: "learning has no limit",
    translationFr: "l'apprentissage n'a pas de limite",
    category: "idiom",
    examples: [
      {
        hanzi: "学无止境",
        pinyin: "xué wú zhǐ jìng",
        translation: "learning has no limit",
        translationFr: "l'apprentissage n'a pas de limite"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 学无止境 »",
      choices: ["l'apprentissage n'a pas de limite", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement"],
    theme: "chengyu"
  },
  {
    id: "supp-0a0b77fe",
    level: "hsk3",
    hanzi: "学术界",
    pinyin: "xuéshù jiè",
    translation: "academia",
    translationFr: "le monde académique",
    category: "expression",
    examples: [
      {
        hanzi: "学术界",
        pinyin: "xuéshù jiè",
        translation: "academia",
        translationFr: "le monde académique"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 学术界 »",
      choices: ["le monde académique", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["expression", "supplement"],
    theme: "expressions"
  },
  {
    id: "supp-1d1c67a8",
    level: "hsk3",
    hanzi: "学派",
    pinyin: "xuépài",
    translation: "school of thought",
    translationFr: "école de pensée",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "学派",
        pinyin: "xuépài",
        translation: "school of thought",
        translationFr: "école de pensée"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 学派 »",
      choices: ["école de pensée", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-79d04d67",
    level: "hsk2",
    hanzi: "宁可...也",
    pinyin: "nìngkě... yě",
    translation: "would rather... than",
    translationFr: "plutôt... que",
    category: "phrase",
    examples: [
      {
        hanzi: "宁可...也",
        pinyin: "nìngkě... yě",
        translation: "would rather... than",
        translationFr: "plutôt... que"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 宁可...也 »",
      choices: ["plutôt... que", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["phrase", "supplement"],
    theme: "expressions"
  },
  {
    id: "supp-690bdea6",
    level: "hsk3",
    hanzi: "对偶",
    pinyin: "duì'ǒu",
    translation: "parallelism",
    translationFr: "parallélisme",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "对偶",
        pinyin: "duì'ǒu",
        translation: "parallelism",
        translationFr: "parallélisme"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 对偶 »",
      choices: ["parallélisme", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-969853b4",
    level: "hsk4",
    hanzi: "小题大做",
    pinyin: "xiǎo tí dà zuò",
    translation: "make a mountain out of a molehill",
    translationFr: "faire une montagne d'un rien",
    category: "idiom",
    examples: [
      {
        hanzi: "小题大做",
        pinyin: "xiǎo tí dà zuò",
        translation: "make a mountain out of a molehill",
        translationFr: "faire une montagne d'un rien"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 小题大做 »",
      choices: ["faire une montagne d'un rien", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement"],
    theme: "chengyu"
  },
  {
    id: "supp-c532de2a",
    level: "hsk5",
    hanzi: "巴金",
    pinyin: "bā jīn",
    translation: "Ba Jin (writer)",
    translationFr: "Ba Jin (écrivain)",
    category: "culture",
    examples: [
      {
        hanzi: "巴金",
        pinyin: "bā jīn",
        translation: "Ba Jin (writer)",
        translationFr: "Ba Jin (écrivain)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 巴金 »",
      choices: ["Ba Jin (écrivain)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["culture", "supplement"],
    theme: "auteurs"
  },
  {
    id: "supp-e51afd33",
    level: "hsk3",
    hanzi: "帝王",
    pinyin: "dìwáng",
    translation: "emperor / monarch",
    translationFr: "empereur, monarque",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "帝王",
        pinyin: "dìwáng",
        translation: "emperor / monarch",
        translationFr: "empereur, monarque"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 帝王 »",
      choices: ["empereur, monarque", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-e7dbe024",
    level: "hsk3",
    hanzi: "帮我",
    pinyin: "bāng wǒ",
    translation: "help me",
    translationFr: "aide-moi",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "帮我",
        pinyin: "bāng wǒ",
        translation: "help me",
        translationFr: "aide-moi"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 帮我 »",
      choices: ["aide-moi", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-03ee8b94",
    level: "hsk3",
    hanzi: "平板",
    pinyin: "píngbǎn",
    translation: "tablet (device)",
    translationFr: "tablette (appareil)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "平板",
        pinyin: "píngbǎn",
        translation: "tablet (device)",
        translationFr: "tablette (appareil)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 平板 »",
      choices: ["tablette (appareil)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-e4568847",
    level: "hsk3",
    hanzi: "引言",
    pinyin: "yǐnyán",
    translation: "introduction / preface",
    translationFr: "introduction, préface",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "引言",
        pinyin: "yǐnyán",
        translation: "introduction / preface",
        translationFr: "introduction, préface"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 引言 »",
      choices: ["introduction, préface", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-56cacd79",
    level: "hsk3",
    hanzi: "引证",
    pinyin: "yǐnzhèng",
    translation: "citation / to cite",
    translationFr: "citation, citer",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "引证",
        pinyin: "yǐnzhèng",
        translation: "citation / to cite",
        translationFr: "citation, citer"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 引证 »",
      choices: ["citation, citer", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-38d0acde",
    level: "hsk3",
    hanzi: "很高兴认识你",
    pinyin: "hěn gāoxìng rènshi nǐ",
    translation: "nice to meet you",
    translationFr: "ravi(e) de faire votre connaissance",
    category: "expression",
    examples: [
      {
        hanzi: "很高兴认识你",
        pinyin: "hěn gāoxìng rènshi nǐ",
        translation: "nice to meet you",
        translationFr: "ravi(e) de faire votre connaissance"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 很高兴认识你 »",
      choices: ["ravi(e) de faire votre connaissance", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["expression", "supplement"],
    theme: "expressions"
  },
  {
    id: "supp-27686b82",
    level: "hsk1",
    hanzi: "德",
    pinyin: "dé",
    translation: "virtue (Confucian value)",
    translationFr: "vertu (valeur confucéenne)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "德",
        pinyin: "dé",
        translation: "virtue (Confucian value)",
        translationFr: "vertu (valeur confucéenne)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 德 »",
      choices: ["vertu (valeur confucéenne)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "base"
  },
  {
    id: "supp-31a668c3",
    level: "hsk3",
    hanzi: "意境",
    pinyin: "yìjìng",
    translation: "poetic mood / artistic conception",
    translationFr: "atmosphère poétique",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "意境",
        pinyin: "yìjìng",
        translation: "poetic mood / artistic conception",
        translationFr: "atmosphère poétique"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 意境 »",
      choices: ["atmosphère poétique", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-6c07266d",
    level: "hsk3",
    hanzi: "意象",
    pinyin: "yìxiàng",
    translation: "poetic imagery",
    translationFr: "image poétique",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "意象",
        pinyin: "yìxiàng",
        translation: "poetic imagery",
        translationFr: "image poétique"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 意象 »",
      choices: ["image poétique", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-ea705d95",
    level: "hsk3",
    hanzi: "我也",
    pinyin: "wǒ yě",
    translation: "me too",
    translationFr: "moi aussi",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "我也",
        pinyin: "wǒ yě",
        translation: "me too",
        translationFr: "moi aussi"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 我也 »",
      choices: ["moi aussi", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-77e4a702",
    level: "hsk3",
    hanzi: "我叫",
    pinyin: "wǒ jiào",
    translation: "my name is",
    translationFr: "je m'appelle",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "我叫",
        pinyin: "wǒ jiào",
        translation: "my name is",
        translationFr: "je m'appelle"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 我叫 »",
      choices: ["je m'appelle", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-5a97440e",
    level: "hsk3",
    hanzi: "我是",
    pinyin: "wǒ shì",
    translation: "I am",
    translationFr: "je suis",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "我是",
        pinyin: "wǒ shì",
        translation: "I am",
        translationFr: "je suis"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 我是 »",
      choices: ["je suis", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-b60342c2",
    level: "hsk3",
    hanzi: "我来自",
    pinyin: "wǒ láizì",
    translation: "I come from",
    translationFr: "je viens de",
    category: "expression",
    examples: [
      {
        hanzi: "我来自",
        pinyin: "wǒ láizì",
        translation: "I come from",
        translationFr: "je viens de"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 我来自 »",
      choices: ["je viens de", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["expression", "supplement"],
    theme: "expressions"
  },
  {
    id: "supp-95874e22",
    level: "hsk3",
    hanzi: "批判性思维",
    pinyin: "pīpànxìng sīwéi",
    translation: "critical thinking",
    translationFr: "pensée critique",
    category: "expression",
    examples: [
      {
        hanzi: "批判性思维",
        pinyin: "pīpànxìng sīwéi",
        translation: "critical thinking",
        translationFr: "pensée critique"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 批判性思维 »",
      choices: ["pensée critique", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["expression", "supplement"],
    theme: "expressions"
  },
  {
    id: "supp-ab0a177f",
    level: "hsk3",
    hanzi: "找钱",
    pinyin: "zhǎoqián",
    translation: "give change",
    translationFr: "rendre la monnaie",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "找钱",
        pinyin: "zhǎoqián",
        translation: "give change",
        translationFr: "rendre la monnaie"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 找钱 »",
      choices: ["rendre la monnaie", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-7b83471a",
    level: "hsk3",
    hanzi: "抄送",
    pinyin: "chāosòng",
    translation: "carbon copy (Cc)",
    translationFr: "copie carbone (Cc)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "抄送",
        pinyin: "chāosòng",
        translation: "carbon copy (Cc)",
        translationFr: "copie carbone (Cc)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 抄送 »",
      choices: ["copie carbone (Cc)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-68729a2e",
    level: "hsk1",
    hanzi: "挨",
    pinyin: "āi",
    translation: "suffer / endure",
    translationFr: "subir, endurer",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "挨",
        pinyin: "āi",
        translation: "suffer / endure",
        translationFr: "subir, endurer"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 挨 »",
      choices: ["subir, endurer", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "base"
  },
  {
    id: "supp-d9e2b7e7",
    level: "hsk4",
    hanzi: "换句话说",
    pinyin: "huàn jù huà shuō",
    translation: "in other words",
    translationFr: "en d'autres termes",
    category: "idiom",
    examples: [
      {
        hanzi: "换句话说",
        pinyin: "huàn jù huà shuō",
        translation: "in other words",
        translationFr: "en d'autres termes"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 换句话说 »",
      choices: ["en d'autres termes", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement"],
    theme: "chengyu"
  },
  {
    id: "supp-eb69bf4d",
    level: "hsk3",
    hanzi: "排比",
    pinyin: "páibǐ",
    translation: "parallel enumeration",
    translationFr: "énumération parallèle",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "排比",
        pinyin: "páibǐ",
        translation: "parallel enumeration",
        translationFr: "énumération parallèle"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 排比 »",
      choices: ["énumération parallèle", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-8e74eef2",
    level: "hsk3",
    hanzi: "提案",
    pinyin: "tí'àn",
    translation: "proposal",
    translationFr: "proposition, motion",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "提案",
        pinyin: "tí'àn",
        translation: "proposal",
        translationFr: "proposition, motion"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 提案 »",
      choices: ["proposition, motion", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-336c26fe",
    level: "hsk3",
    hanzi: "敬上",
    pinyin: "jìng shàng",
    translation: "yours respectfully (closing)",
    translationFr: "respectueusement vôtre (formule)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "敬上",
        pinyin: "jìng shàng",
        translation: "yours respectfully (closing)",
        translationFr: "respectueusement vôtre (formule)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 敬上 »",
      choices: ["respectueusement vôtre (formule)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-8d1a4d7d",
    level: "hsk3",
    hanzi: "敬启",
    pinyin: "jìng qǐ",
    translation: "respectfully (opening)",
    translationFr: "bien à vous (formule d'ouverture)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "敬启",
        pinyin: "jìng qǐ",
        translation: "respectfully (opening)",
        translationFr: "bien à vous (formule d'ouverture)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 敬启 »",
      choices: ["bien à vous (formule d'ouverture)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-6450d843",
    level: "hsk4",
    hanzi: "数据分析",
    pinyin: "shùjù fēnxī",
    translation: "data analysis",
    translationFr: "analyse de données",
    category: "idiom",
    examples: [
      {
        hanzi: "数据分析",
        pinyin: "shùjù fēnxī",
        translation: "data analysis",
        translationFr: "analyse de données"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 数据分析 »",
      choices: ["analyse de données", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement"],
    theme: "chengyu"
  },
  {
    id: "supp-f9c14686",
    level: "hsk3",
    hanzi: "文言",
    pinyin: "wényán",
    translation: "literary Chinese",
    translationFr: "chinois littéraire",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "文言",
        pinyin: "wényán",
        translation: "literary Chinese",
        translationFr: "chinois littéraire"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 文言 »",
      choices: ["chinois littéraire", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-801c9de7",
    level: "hsk3",
    hanzi: "文采",
    pinyin: "wéncǎi",
    translation: "literary talent",
    translationFr: "talent littéraire",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "文采",
        pinyin: "wéncǎi",
        translation: "literary talent",
        translationFr: "talent littéraire"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 文采 »",
      choices: ["talent littéraire", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-0999cf01",
    level: "hsk3",
    hanzi: "新文化",
    pinyin: "xīn wénhuà",
    translation: "New Culture Movement",
    translationFr: "nouvelle culture (mouvement du 4 mai 1919)",
    category: "expression",
    examples: [
      {
        hanzi: "新文化",
        pinyin: "xīn wénhuà",
        translation: "New Culture Movement",
        translationFr: "nouvelle culture (mouvement du 4 mai 1919)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 新文化 »",
      choices: ["nouvelle culture (mouvement du 4 mai 1919)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["expression", "supplement"],
    theme: "expressions"
  },
  {
    id: "supp-6cb8f879",
    level: "hsk2",
    hanzi: "无论...都",
    pinyin: "wúlùn... dōu",
    translation: "no matter..., always",
    translationFr: "peu importe..., toujours",
    category: "phrase",
    examples: [
      {
        hanzi: "无论...都",
        pinyin: "wúlùn... dōu",
        translation: "no matter..., always",
        translationFr: "peu importe..., toujours"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 无论...都 »",
      choices: ["peu importe..., toujours", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["phrase", "supplement"],
    theme: "expressions"
  },
  {
    id: "supp-e0e4ddc5",
    level: "hsk2",
    hanzi: "既...又",
    pinyin: "jì... yòu",
    translation: "both... and",
    translationFr: "à la fois... et",
    category: "phrase",
    examples: [
      {
        hanzi: "既...又",
        pinyin: "jì... yòu",
        translation: "both... and",
        translationFr: "à la fois... et"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 既...又 »",
      choices: ["à la fois... et", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["phrase", "supplement"],
    theme: "expressions"
  },
  {
    id: "supp-e647d10f",
    level: "hsk1",
    hanzi: "明",
    pinyin: "míng",
    translation: "bright / clear",
    translationFr: "clair, brillant",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "明",
        pinyin: "míng",
        translation: "bright / clear",
        translationFr: "clair, brillant"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 明 »",
      choices: ["clair, brillant", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "base"
  },
  {
    id: "supp-5ce43821",
    level: "hsk1",
    hanzi: "星期一",
    pinyin: "xīngqī yī",
    translation: "Monday",
    translationFr: "lundi",
    category: "expression",
    examples: [
      {
        hanzi: "星期一",
        pinyin: "xīngqī yī",
        translation: "Monday",
        translationFr: "lundi"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 星期一 »",
      choices: ["lundi", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["expression", "supplement"],
    theme: "temps"
  },
  {
    id: "supp-711d996d",
    level: "hsk1",
    hanzi: "星期三",
    pinyin: "xīngqī sān",
    translation: "Wednesday",
    translationFr: "mercredi",
    category: "expression",
    examples: [
      {
        hanzi: "星期三",
        pinyin: "xīngqī sān",
        translation: "Wednesday",
        translationFr: "mercredi"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 星期三 »",
      choices: ["mercredi", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["expression", "supplement"],
    theme: "temps"
  },
  {
    id: "supp-34e5216b",
    level: "hsk1",
    hanzi: "星期二",
    pinyin: "xīngqī èr",
    translation: "Tuesday",
    translationFr: "mardi",
    category: "expression",
    examples: [
      {
        hanzi: "星期二",
        pinyin: "xīngqī èr",
        translation: "Tuesday",
        translationFr: "mardi"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 星期二 »",
      choices: ["mardi", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["expression", "supplement"],
    theme: "temps"
  },
  {
    id: "supp-450ea3af",
    level: "hsk1",
    hanzi: "星期五",
    pinyin: "xīngqī wǔ",
    translation: "Friday",
    translationFr: "vendredi",
    category: "expression",
    examples: [
      {
        hanzi: "星期五",
        pinyin: "xīngqī wǔ",
        translation: "Friday",
        translationFr: "vendredi"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 星期五 »",
      choices: ["vendredi", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["expression", "supplement"],
    theme: "temps"
  },
  {
    id: "supp-1ae72f68",
    level: "hsk1",
    hanzi: "星期六",
    pinyin: "xīngqī liù",
    translation: "Saturday",
    translationFr: "samedi",
    category: "expression",
    examples: [
      {
        hanzi: "星期六",
        pinyin: "xīngqī liù",
        translation: "Saturday",
        translationFr: "samedi"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 星期六 »",
      choices: ["samedi", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["expression", "supplement"],
    theme: "temps"
  },
  {
    id: "supp-3df6af79",
    level: "hsk1",
    hanzi: "星期四",
    pinyin: "xīngqī sì",
    translation: "Thursday",
    translationFr: "jeudi",
    category: "expression",
    examples: [
      {
        hanzi: "星期四",
        pinyin: "xīngqī sì",
        translation: "Thursday",
        translationFr: "jeudi"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 星期四 »",
      choices: ["jeudi", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["expression", "supplement"],
    theme: "temps"
  },
  {
    id: "supp-6ab1f177",
    level: "hsk1",
    hanzi: "晚上好",
    pinyin: "wǎnshàng hǎo",
    translation: "good evening",
    translationFr: "bonsoir",
    category: "expression",
    examples: [
      {
        hanzi: "晚上好",
        pinyin: "wǎnshàng hǎo",
        translation: "good evening",
        translationFr: "bonsoir"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 晚上好 »",
      choices: ["bonsoir", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["expression", "supplement"],
    theme: "temps"
  },
  {
    id: "supp-c49daac4",
    level: "hsk1",
    hanzi: "智",
    pinyin: "zhì",
    translation: "wisdom (Confucian value)",
    translationFr: "sagesse (valeur confucéenne)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "智",
        pinyin: "zhì",
        translation: "wisdom (Confucian value)",
        translationFr: "sagesse (valeur confucéenne)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 智 »",
      choices: ["sagesse (valeur confucéenne)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "base"
  },
  {
    id: "supp-ca1e6f18",
    level: "hsk4",
    hanzi: "更不用说",
    pinyin: "gèng bù yòng shuō",
    translation: "let alone / not to mention",
    translationFr: "sans parler de",
    category: "idiom",
    examples: [
      {
        hanzi: "更不用说",
        pinyin: "gèng bù yòng shuō",
        translation: "let alone / not to mention",
        translationFr: "sans parler de"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 更不用说 »",
      choices: ["sans parler de", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement"],
    theme: "chengyu"
  },
  {
    id: "supp-9e4ec1d3",
    level: "hsk3",
    hanzi: "最喜欢",
    pinyin: "zuì xǐhuān",
    translation: "like the most / favorite",
    translationFr: "préférer, aimer le plus",
    category: "expression",
    examples: [
      {
        hanzi: "最喜欢",
        pinyin: "zuì xǐhuān",
        translation: "like the most / favorite",
        translationFr: "préférer, aimer le plus"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 最喜欢 »",
      choices: ["préférer, aimer le plus", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["expression", "supplement"],
    theme: "expressions"
  },
  {
    id: "supp-0feae6d7",
    level: "hsk3",
    hanzi: "有一天",
    pinyin: "yǒu yī tiān",
    translation: "one day",
    translationFr: "un jour, il y a un jour",
    category: "expression",
    examples: [
      {
        hanzi: "有一天",
        pinyin: "yǒu yī tiān",
        translation: "one day",
        translationFr: "un jour, il y a un jour"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 有一天 »",
      choices: ["un jour, il y a un jour", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["expression", "supplement"],
    theme: "expressions"
  },
  {
    id: "supp-29a1c7e2",
    level: "hsk3",
    hanzi: "有东西",
    pinyin: "yǒu dōngxi",
    translation: "have something",
    translationFr: "il y a quelque chose",
    category: "expression",
    examples: [
      {
        hanzi: "有东西",
        pinyin: "yǒu dōngxi",
        translation: "have something",
        translationFr: "il y a quelque chose"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 有东西 »",
      choices: ["il y a quelque chose", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["expression", "supplement"],
    theme: "expressions"
  },
  {
    id: "supp-14eff746",
    level: "hsk3",
    hanzi: "有人",
    pinyin: "yǒurén",
    translation: "there is someone",
    translationFr: "il y a quelqu'un",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "有人",
        pinyin: "yǒurén",
        translation: "there is someone",
        translationFr: "il y a quelqu'un"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 有人 »",
      choices: ["il y a quelqu'un", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-bf5f9101",
    level: "hsk3",
    hanzi: "有地方",
    pinyin: "yǒu dìfāng",
    translation: "have a place",
    translationFr: "il y a un endroit",
    category: "expression",
    examples: [
      {
        hanzi: "有地方",
        pinyin: "yǒu dìfāng",
        translation: "have a place",
        translationFr: "il y a un endroit"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 有地方 »",
      choices: ["il y a un endroit", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["expression", "supplement"],
    theme: "expressions"
  },
  {
    id: "supp-e3d0c4d4",
    level: "hsk3",
    hanzi: "有志者事竟成",
    pinyin: "yǒu zhì zhě shì jìng chéng",
    translation: "where there's a will, there's a way",
    translationFr: "qui veut, peut (la volonté fait tout)",
    category: "expression",
    examples: [
      {
        hanzi: "有志者事竟成",
        pinyin: "yǒu zhì zhě shì jìng chéng",
        translation: "where there's a will, there's a way",
        translationFr: "qui veut, peut (la volonté fait tout)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 有志者事竟成 »",
      choices: ["qui veut, peut (la volonté fait tout)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["expression", "supplement"],
    theme: "expressions"
  },
  {
    id: "supp-44572668",
    level: "hsk3",
    hanzi: "有效性",
    pinyin: "yǒuxiàoxìng",
    translation: "effectiveness / validity",
    translationFr: "efficacité, validité",
    category: "expression",
    examples: [
      {
        hanzi: "有效性",
        pinyin: "yǒuxiàoxìng",
        translation: "effectiveness / validity",
        translationFr: "efficacité, validité"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 有效性 »",
      choices: ["efficacité, validité", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["expression", "supplement"],
    theme: "expressions"
  },
  {
    id: "supp-4eb50747",
    level: "hsk3",
    hanzi: "有点",
    pinyin: "yǒudiǎn",
    translation: "a little",
    translationFr: "un peu",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "有点",
        pinyin: "yǒudiǎn",
        translation: "a little",
        translationFr: "un peu"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 有点 »",
      choices: ["un peu", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-787c5438",
    level: "hsk3",
    hanzi: "服务员",
    pinyin: "fúwùyuán",
    translation: "waiter / waitress",
    translationFr: "serveur, serveuse",
    category: "expression",
    examples: [
      {
        hanzi: "服务员",
        pinyin: "fúwùyuán",
        translation: "waiter / waitress",
        translationFr: "serveur, serveuse"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 服务员 »",
      choices: ["serveur, serveuse", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["expression", "supplement"],
    theme: "expressions"
  },
  {
    id: "supp-e0a5e08a",
    level: "hsk1",
    hanzi: "木",
    pinyin: "mù",
    translation: "wood",
    translationFr: "bois",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "木",
        pinyin: "mù",
        translation: "wood",
        translationFr: "bois"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 木 »",
      choices: ["bois", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "base"
  },
  {
    id: "supp-a4fb8425",
    level: "hsk1",
    hanzi: "本",
    pinyin: "běn",
    translation: "measure word for books",
    translationFr: "classificateur pour les livres",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "本",
        pinyin: "běn",
        translation: "measure word for books",
        translationFr: "classificateur pour les livres"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 本 »",
      choices: ["classificateur pour les livres", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "base"
  },
  {
    id: "supp-86296f5a",
    level: "hsk1",
    hanzi: "杯",
    pinyin: "bēi",
    translation: "cup / glass (measure word)",
    translationFr: "tasse, verre (classificateur)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "杯",
        pinyin: "bēi",
        translation: "cup / glass (measure word)",
        translationFr: "tasse, verre (classificateur)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 杯 »",
      choices: ["tasse, verre (classificateur)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "base"
  },
  {
    id: "supp-b10f3f52",
    level: "hsk3",
    hanzi: "格律",
    pinyin: "gélǜ",
    translation: "poetic meter",
    translationFr: "métrique poétique",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "格律",
        pinyin: "gélǜ",
        translation: "poetic meter",
        translationFr: "métrique poétique"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 格律 »",
      choices: ["métrique poétique", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-58378f0d",
    level: "hsk3",
    hanzi: "正文",
    pinyin: "zhèngwén",
    translation: "main text",
    translationFr: "texte principal",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "正文",
        pinyin: "zhèngwén",
        translation: "main text",
        translationFr: "texte principal"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 正文 »",
      choices: ["texte principal", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-b218898e",
    level: "hsk3",
    hanzi: "正方",
    pinyin: "zhèngfāng",
    translation: "affirmative side",
    translationFr: "partie affirmative",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "正方",
        pinyin: "zhèngfāng",
        translation: "affirmative side",
        translationFr: "partie affirmative"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 正方 »",
      choices: ["partie affirmative", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-960b529f",
    level: "hsk5",
    hanzi: "水浒传",
    pinyin: "shuǐhǔ zhuàn",
    translation: "Water Margin (classical novel)",
    translationFr: "Au bord de l'eau (roman classique)",
    category: "culture",
    examples: [
      {
        hanzi: "水浒传",
        pinyin: "shuǐhǔ zhuàn",
        translation: "Water Margin (classical novel)",
        translationFr: "Au bord de l'eau (roman classique)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 水浒传 »",
      choices: ["Au bord de l'eau (roman classique)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["culture", "supplement"],
    theme: "littérature classique"
  },
  {
    id: "supp-b0d3e406",
    level: "hsk3",
    hanzi: "沿革",
    pinyin: "yángé",
    translation: "historical evolution",
    translationFr: "évolution historique",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "沿革",
        pinyin: "yángé",
        translation: "historical evolution",
        translationFr: "évolution historique"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 沿革 »",
      choices: ["évolution historique", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-d861ac63",
    level: "hsk4",
    hanzi: "深入浅出",
    pinyin: "shēn rù qiǎn chū",
    translation: "explain profound things simply",
    translationFr: "expliquer simplement ce qui est complexe",
    category: "idiom",
    examples: [
      {
        hanzi: "深入浅出",
        pinyin: "shēn rù qiǎn chū",
        translation: "explain profound things simply",
        translationFr: "expliquer simplement ce qui est complexe"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 深入浅出 »",
      choices: ["expliquer simplement ce qui est complexe", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement"],
    theme: "chengyu"
  },
  {
    id: "supp-c8be89e5",
    level: "hsk4",
    hanzi: "火上浇油",
    pinyin: "huǒ shàng jiāo yóu",
    translation: "add fuel to the fire",
    translationFr: "jeter de l'huile sur le feu",
    category: "idiom",
    examples: [
      {
        hanzi: "火上浇油",
        pinyin: "huǒ shàng jiāo yóu",
        translation: "add fuel to the fire",
        translationFr: "jeter de l'huile sur le feu"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 火上浇油 »",
      choices: ["jeter de l'huile sur le feu", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement"],
    theme: "chengyu"
  },
  {
    id: "supp-be604f8b",
    level: "hsk1",
    hanzi: "点",
    pinyin: "diǎn",
    translation: "point / o'clock",
    translationFr: "point, heure",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "点",
        pinyin: "diǎn",
        translation: "point / o'clock",
        translationFr: "point, heure"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 点 »",
      choices: ["point, heure", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "base"
  },
  {
    id: "supp-d85522be",
    level: "hsk3",
    hanzi: "点菜",
    pinyin: "diǎncài",
    translation: "order a dish",
    translationFr: "commander un plat",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "点菜",
        pinyin: "diǎncài",
        translation: "order a dish",
        translationFr: "commander un plat"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 点菜 »",
      choices: ["commander un plat", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-8d1b38be",
    level: "hsk4",
    hanzi: "熟能生巧",
    pinyin: "shú néng shēng qiǎo",
    translation: "practice makes perfect",
    translationFr: "la pratique rend parfait",
    category: "idiom",
    examples: [
      {
        hanzi: "熟能生巧",
        pinyin: "shú néng shēng qiǎo",
        translation: "practice makes perfect",
        translationFr: "la pratique rend parfait"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 熟能生巧 »",
      choices: ["la pratique rend parfait", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement"],
    theme: "chengyu"
  },
  {
    id: "supp-d0f8a941",
    level: "hsk4",
    hanzi: "现代文学",
    pinyin: "xiàndài wénxué",
    translation: "modern literature",
    translationFr: "littérature moderne",
    category: "idiom",
    examples: [
      {
        hanzi: "现代文学",
        pinyin: "xiàndài wénxué",
        translation: "modern literature",
        translationFr: "littérature moderne"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 现代文学 »",
      choices: ["littérature moderne", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement"],
    theme: "chengyu"
  },
  {
    id: "supp-9985f4a7",
    level: "hsk4",
    hanzi: "现在几点",
    pinyin: "xiànzài jǐ diǎn",
    translation: "what time is it",
    translationFr: "quelle heure est-il",
    category: "idiom",
    examples: [
      {
        hanzi: "现在几点",
        pinyin: "xiànzài jǐ diǎn",
        translation: "what time is it",
        translationFr: "quelle heure est-il"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 现在几点 »",
      choices: ["quelle heure est-il", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement"],
    theme: "chengyu"
  },
  {
    id: "supp-a02a19c9",
    level: "hsk4",
    hanzi: "甲方乙方",
    pinyin: "jiǎ fāng yǐ fāng",
    translation: "Party A and Party B (legal terms)",
    translationFr: "partie A et partie B (termes juridiques)",
    category: "idiom",
    examples: [
      {
        hanzi: "甲方乙方",
        pinyin: "jiǎ fāng yǐ fāng",
        translation: "Party A and Party B (legal terms)",
        translationFr: "partie A et partie B (termes juridiques)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 甲方乙方 »",
      choices: ["partie A et partie B (termes juridiques)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement"],
    theme: "chengyu"
  },
  {
    id: "supp-5e07daff",
    level: "hsk3",
    hanzi: "白话",
    pinyin: "báihuà",
    translation: "spoken language",
    translationFr: "langue parlée",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "白话",
        pinyin: "báihuà",
        translation: "spoken language",
        translationFr: "langue parlée"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 白话 »",
      choices: ["langue parlée", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-94b3fea9",
    level: "hsk3",
    hanzi: "白话文",
    pinyin: "báihuàwén",
    translation: "vernacular written Chinese",
    translationFr: "chinois vernaculaire écrit",
    category: "expression",
    examples: [
      {
        hanzi: "白话文",
        pinyin: "báihuàwén",
        translation: "vernacular written Chinese",
        translationFr: "chinois vernaculaire écrit"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 白话文 »",
      choices: ["chinois vernaculaire écrit", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["expression", "supplement"],
    theme: "expressions"
  },
  {
    id: "supp-fbcff4f7",
    level: "hsk3",
    hanzi: "百闻不如一见",
    pinyin: "bǎi wén bùrú yī jiàn",
    translation: "seeing once is better than hearing a hundred times",
    translationFr: "mieux vaut voir une fois qu'entendre cent fois",
    category: "expression",
    examples: [
      {
        hanzi: "百闻不如一见",
        pinyin: "bǎi wén bùrú yī jiàn",
        translation: "seeing once is better than hearing a hundred times",
        translationFr: "mieux vaut voir une fois qu'entendre cent fois"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 百闻不如一见 »",
      choices: ["mieux vaut voir une fois qu'entendre cent fois", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["expression", "supplement"],
    theme: "expressions"
  },
  {
    id: "supp-05a5d42d",
    level: "hsk3",
    hanzi: "盼复",
    pinyin: "pàn fù",
    translation: "looking forward to your reply (polite)",
    translationFr: "en attente de votre réponse (formule)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "盼复",
        pinyin: "pàn fù",
        translation: "looking forward to your reply (polite)",
        translationFr: "en attente de votre réponse (formule)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 盼复 »",
      choices: ["en attente de votre réponse (formule)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-9302446f",
    level: "hsk1",
    hanzi: "看",
    pinyin: "kàn",
    translation: "look at / watch",
    translationFr: "regarder",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "看",
        pinyin: "kàn",
        translation: "look at / watch",
        translationFr: "regarder"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 看 »",
      choices: ["regarder", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "base"
  },
  {
    id: "supp-e3ccf094",
    level: "hsk3",
    hanzi: "看书",
    pinyin: "kàn shū",
    translation: "read a book",
    translationFr: "lire un livre",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "看书",
        pinyin: "kàn shū",
        translation: "read a book",
        translationFr: "lire un livre"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 看书 »",
      choices: ["lire un livre", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-2d41be02",
    level: "hsk3",
    hanzi: "看电影",
    pinyin: "kàn diànyǐng",
    translation: "watch a movie",
    translationFr: "regarder un film",
    category: "expression",
    examples: [
      {
        hanzi: "看电影",
        pinyin: "kàn diànyǐng",
        translation: "watch a movie",
        translationFr: "regarder un film"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 看电影 »",
      choices: ["regarder un film", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["expression", "supplement"],
    theme: "expressions"
  },
  {
    id: "supp-2c91e637",
    level: "hsk4",
    hanzi: "研究方法",
    pinyin: "yánjiū fāngfǎ",
    translation: "research method",
    translationFr: "méthode de recherche",
    category: "idiom",
    examples: [
      {
        hanzi: "研究方法",
        pinyin: "yánjiū fāngfǎ",
        translation: "research method",
        translationFr: "méthode de recherche"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 研究方法 »",
      choices: ["méthode de recherche", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement"],
    theme: "chengyu"
  },
  {
    id: "supp-b7a0b613",
    level: "hsk1",
    hanzi: "礼",
    pinyin: "lǐ",
    translation: "ritual / propriety (Confucian value)",
    translationFr: "rite, politesse (valeur confucéenne)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "礼",
        pinyin: "lǐ",
        translation: "ritual / propriety (Confucian value)",
        translationFr: "rite, politesse (valeur confucéenne)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 礼 »",
      choices: ["rite, politesse (valeur confucéenne)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "base"
  },
  {
    id: "supp-67203177",
    level: "hsk3",
    hanzi: "章回",
    pinyin: "zhānghuí",
    translation: "chapter (classical novel)",
    translationFr: "chapitres (roman classique)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "章回",
        pinyin: "zhānghuí",
        translation: "chapter (classical novel)",
        translationFr: "chapitres (roman classique)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 章回 »",
      choices: ["chapitres (roman classique)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-918024a6",
    level: "hsk2",
    hanzi: "第一",
    pinyin: "dì yī",
    translation: "first",
    translationFr: "premier",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "第一",
        pinyin: "dì yī",
        translation: "first",
        translationFr: "premier"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 第一 »",
      choices: ["premier", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "nombres"
  },
  {
    id: "supp-9b9a5e28",
    level: "hsk2",
    hanzi: "第三",
    pinyin: "dì sān",
    translation: "third",
    translationFr: "troisième",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "第三",
        pinyin: "dì sān",
        translation: "third",
        translationFr: "troisième"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 第三 »",
      choices: ["troisième", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "nombres"
  },
  {
    id: "supp-726b6dc3",
    level: "hsk2",
    hanzi: "第二",
    pinyin: "dì èr",
    translation: "second",
    translationFr: "deuxième",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "第二",
        pinyin: "dì èr",
        translation: "second",
        translationFr: "deuxième"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 第二 »",
      choices: ["deuxième", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "nombres"
  },
  {
    id: "supp-058fe3a2",
    level: "hsk2",
    hanzi: "第五",
    pinyin: "dì wǔ",
    translation: "fifth",
    translationFr: "cinquième",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "第五",
        pinyin: "dì wǔ",
        translation: "fifth",
        translationFr: "cinquième"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 第五 »",
      choices: ["cinquième", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "nombres"
  },
  {
    id: "supp-5eaf12f3",
    level: "hsk2",
    hanzi: "第六",
    pinyin: "dì liù",
    translation: "sixth",
    translationFr: "sixième",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "第六",
        pinyin: "dì liù",
        translation: "sixth",
        translationFr: "sixième"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 第六 »",
      choices: ["sixième", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "nombres"
  },
  {
    id: "supp-b99327e4",
    level: "hsk2",
    hanzi: "第四",
    pinyin: "dì sì",
    translation: "fourth",
    translationFr: "quatrième",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "第四",
        pinyin: "dì sì",
        translation: "fourth",
        translationFr: "quatrième"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 第四 »",
      choices: ["quatrième", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "nombres"
  },
  {
    id: "supp-4b2de9d8",
    level: "hsk5",
    hanzi: "红楼梦",
    pinyin: "hónglóu mèng",
    translation: "Dream of the Red Chamber (classical novel)",
    translationFr: "Le Rêve dans le Pavillon rouge (roman classique)",
    category: "culture",
    examples: [
      {
        hanzi: "红楼梦",
        pinyin: "hónglóu mèng",
        translation: "Dream of the Red Chamber (classical novel)",
        translationFr: "Le Rêve dans le Pavillon rouge (roman classique)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 红楼梦 »",
      choices: ["Le Rêve dans le Pavillon rouge (roman classique)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["culture", "supplement"],
    theme: "littérature classique"
  },
  {
    id: "supp-6f2af118",
    level: "hsk3",
    hanzi: "纪传",
    pinyin: "jì zhuàn",
    translation: "historical biography",
    translationFr: "biographie historique",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "纪传",
        pinyin: "jì zhuàn",
        translation: "historical biography",
        translationFr: "biographie historique"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 纪传 »",
      choices: ["biographie historique", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-5ad7f5a8",
    level: "hsk3",
    hanzi: "结果",
    pinyin: "jiéguǒ",
    translation: "result",
    translationFr: "résultat",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "结果",
        pinyin: "jiéguǒ",
        translation: "result",
        translationFr: "résultat"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 结果 »",
      choices: ["résultat", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-e981be81",
    level: "hsk3",
    hanzi: "给我",
    pinyin: "gěi wǒ",
    translation: "give me",
    translationFr: "donne-moi",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "给我",
        pinyin: "gěi wǒ",
        translation: "give me",
        translationFr: "donne-moi"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 给我 »",
      choices: ["donne-moi", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-70537b1a",
    level: "hsk3",
    hanzi: "综述",
    pinyin: "zōngshù",
    translation: "overview / review",
    translationFr: "synthèse, revue",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "综述",
        pinyin: "zōngshù",
        translation: "overview / review",
        translationFr: "synthèse, revue"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 综述 »",
      choices: ["synthèse, revue", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-806c4388",
    level: "hsk1",
    hanzi: "绿",
    pinyin: "lǜ",
    translation: "green",
    translationFr: "vert",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "绿",
        pinyin: "lǜ",
        translation: "green",
        translationFr: "vert"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 绿 »",
      choices: ["vert", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "base"
  },
  {
    id: "supp-0dc20e43",
    level: "hsk3",
    hanzi: "编年",
    pinyin: "biānnián",
    translation: "chronology",
    translationFr: "chronologie",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "编年",
        pinyin: "biānnián",
        translation: "chronology",
        translationFr: "chronologie"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 编年 »",
      choices: ["chronologie", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-0f245e17",
    level: "hsk4",
    hanzi: "网络文化",
    pinyin: "wǎngluò wénhuà",
    translation: "internet culture",
    translationFr: "culture internet",
    category: "idiom",
    examples: [
      {
        hanzi: "网络文化",
        pinyin: "wǎngluò wénhuà",
        translation: "internet culture",
        translationFr: "culture internet"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 网络文化 »",
      choices: ["culture internet", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement"],
    theme: "chengyu"
  },
  {
    id: "supp-8cd1c82a",
    level: "hsk5",
    hanzi: "老舍",
    pinyin: "lǎo shě",
    translation: "Lao She (writer)",
    translationFr: "Lao She (écrivain)",
    category: "culture",
    examples: [
      {
        hanzi: "老舍",
        pinyin: "lǎo shě",
        translation: "Lao She (writer)",
        translationFr: "Lao She (écrivain)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 老舍 »",
      choices: ["Lao She (écrivain)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["culture", "supplement"],
    theme: "auteurs"
  },
  {
    id: "supp-a10a2296",
    level: "hsk3",
    hanzi: "脚注",
    pinyin: "jiǎozhù",
    translation: "footnote",
    translationFr: "note de bas de page",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "脚注",
        pinyin: "jiǎozhù",
        translation: "footnote",
        translationFr: "note de bas de page"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 脚注 »",
      choices: ["note de bas de page", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-6f372ad6",
    level: "hsk3",
    hanzi: "致函",
    pinyin: "zhì hán",
    translation: "address a letter",
    translationFr: "adresser une lettre",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "致函",
        pinyin: "zhì hán",
        translation: "address a letter",
        translationFr: "adresser une lettre"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 致函 »",
      choices: ["adresser une lettre", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-23393b42",
    level: "hsk3",
    hanzi: "范式",
    pinyin: "fànshì",
    translation: "paradigm",
    translationFr: "paradigme",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "范式",
        pinyin: "fànshì",
        translation: "paradigm",
        translationFr: "paradigme"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 范式 »",
      choices: ["paradigme", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-0d3d120d",
    level: "hsk5",
    hanzi: "茅盾",
    pinyin: "máo dùn",
    translation: "Mao Dun (writer)",
    translationFr: "Mao Dun (écrivain)",
    category: "culture",
    examples: [
      {
        hanzi: "茅盾",
        pinyin: "máo dùn",
        translation: "Mao Dun (writer)",
        translationFr: "Mao Dun (écrivain)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 茅盾 »",
      choices: ["Mao Dun (écrivain)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["culture", "supplement"],
    theme: "auteurs"
  },
  {
    id: "supp-4e9244f8",
    level: "hsk3",
    hanzi: "草莓",
    pinyin: "cǎoméi",
    translation: "strawberry",
    translationFr: "fraise",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "草莓",
        pinyin: "cǎoméi",
        translation: "strawberry",
        translationFr: "fraise"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 草莓 »",
      choices: ["fraise", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-2d5aef4f",
    level: "hsk1",
    hanzi: "行",
    pinyin: "xíng",
    translation: "ok / fine",
    translationFr: "d'accord, ok",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "行",
        pinyin: "xíng",
        translation: "ok / fine",
        translationFr: "d'accord, ok"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 行 »",
      choices: ["d'accord, ok", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "base"
  },
  {
    id: "supp-9db64a7a",
    level: "hsk5",
    hanzi: "西游记",
    pinyin: "xīyóu jì",
    translation: "Journey to the West (classical novel)",
    translationFr: "La Pérégrination vers l'Ouest (roman classique)",
    category: "culture",
    examples: [
      {
        hanzi: "西游记",
        pinyin: "xīyóu jì",
        translation: "Journey to the West (classical novel)",
        translationFr: "La Pérégrination vers l'Ouest (roman classique)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 西游记 »",
      choices: ["La Pérégrination vers l'Ouest (roman classique)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["culture", "supplement"],
    theme: "littérature classique"
  },
  {
    id: "supp-fd8043b2",
    level: "hsk3",
    hanzi: "论据",
    pinyin: "lùnjù",
    translation: "argument / evidence",
    translationFr: "argumentation",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "论据",
        pinyin: "lùnjù",
        translation: "argument / evidence",
        translationFr: "argumentation"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 论据 »",
      choices: ["argumentation", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-ad59848a",
    level: "hsk3",
    hanzi: "论点",
    pinyin: "lùndiǎn",
    translation: "thesis / main point",
    translationFr: "thèse, argument central",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "论点",
        pinyin: "lùndiǎn",
        translation: "thesis / main point",
        translationFr: "thèse, argument central"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 论点 »",
      choices: ["thèse, argument central", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-6cefeccd",
    level: "hsk3",
    hanzi: "设问",
    pinyin: "shèwèn",
    translation: "rhetorical question",
    translationFr: "question rhétorique",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "设问",
        pinyin: "shèwèn",
        translation: "rhetorical question",
        translationFr: "question rhétorique"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 设问 »",
      choices: ["question rhétorique", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-4590604f",
    level: "hsk3",
    hanzi: "评议",
    pinyin: "píngyì",
    translation: "appraisal / review",
    translationFr: "évaluation, critique",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "评议",
        pinyin: "píngyì",
        translation: "appraisal / review",
        translationFr: "évaluation, critique"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 评议 »",
      choices: ["évaluation, critique", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-5b526e0a",
    level: "hsk4",
    hanzi: "请多关照",
    pinyin: "qǐng duō guānzhào",
    translation: "please take care of me (polite)",
    translationFr: "je vous prie de prendre soin de moi (formule de politesse)",
    category: "idiom",
    examples: [
      {
        hanzi: "请多关照",
        pinyin: "qǐng duō guānzhào",
        translation: "please take care of me (polite)",
        translationFr: "je vous prie de prendre soin de moi (formule de politesse)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 请多关照 »",
      choices: ["je vous prie de prendre soin de moi (formule de politesse)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement"],
    theme: "chengyu"
  },
  {
    id: "supp-5719ca2b",
    level: "hsk3",
    hanzi: "谬误",
    pinyin: "miùwù",
    translation: "fallacy / error",
    translationFr: "erreur logique, fallacie",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "谬误",
        pinyin: "miùwù",
        translation: "fallacy / error",
        translationFr: "erreur logique, fallacie"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 谬误 »",
      choices: ["erreur logique, fallacie", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-3330104d",
    level: "hsk3",
    hanzi: "贵方",
    pinyin: "guì fāng",
    translation: "your side (polite)",
    translationFr: "votre partie (formule polie)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "贵方",
        pinyin: "guì fāng",
        translation: "your side (polite)",
        translationFr: "votre partie (formule polie)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 贵方 »",
      choices: ["votre partie (formule polie)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-be925af1",
    level: "hsk3",
    hanzi: "跟我",
    pinyin: "gēn wǒ",
    translation: "with me",
    translationFr: "avec moi",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "跟我",
        pinyin: "gēn wǒ",
        translation: "with me",
        translationFr: "avec moi"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 跟我 »",
      choices: ["avec moi", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-1993f80c",
    level: "hsk1",
    hanzi: "还",
    pinyin: "hái",
    translation: "still / also",
    translationFr: "encore, aussi",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "还",
        pinyin: "hái",
        translation: "still / also",
        translationFr: "encore, aussi"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 还 »",
      choices: ["encore, aussi", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "base"
  },
  {
    id: "supp-5c7d38bf",
    level: "hsk3",
    hanzi: "述评",
    pinyin: "shùpíng",
    translation: "exposition and review",
    translationFr: "exposé et commentaire",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "述评",
        pinyin: "shùpíng",
        translation: "exposition and review",
        translationFr: "exposé et commentaire"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 述评 »",
      choices: ["exposé et commentaire", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-d6f70d09",
    level: "hsk1",
    hanzi: "遭",
    pinyin: "zāo",
    translation: "suffer / encounter (misfortune)",
    translationFr: "subir, rencontrer (malheur)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "遭",
        pinyin: "zāo",
        translation: "suffer / encounter (misfortune)",
        translationFr: "subir, rencontrer (malheur)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 遭 »",
      choices: ["subir, rencontrer (malheur)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "base"
  },
  {
    id: "supp-85072190",
    level: "hsk3",
    hanzi: "都不",
    pinyin: "dōu bù",
    translation: "all... not",
    translationFr: "tous ne... pas",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "都不",
        pinyin: "dōu bù",
        translation: "all... not",
        translationFr: "tous ne... pas"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 都不 »",
      choices: ["tous ne... pas", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-559668e6",
    level: "hsk4",
    hanzi: "釜底抽薪",
    pinyin: "fǔ dǐ chōu xīn",
    translation: "tackle a problem at its root",
    translationFr: "retirer les bûches sous la marmite (résoudre à la racine)",
    category: "idiom",
    examples: [
      {
        hanzi: "釜底抽薪",
        pinyin: "fǔ dǐ chōu xīn",
        translation: "tackle a problem at its root",
        translationFr: "retirer les bûches sous la marmite (résoudre à la racine)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 釜底抽薪 »",
      choices: ["retirer les bûches sous la marmite (résoudre à la racine)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement"],
    theme: "chengyu"
  },
  {
    id: "supp-f95b04b2",
    level: "hsk3",
    hanzi: "隐喻",
    pinyin: "yǐnyù",
    translation: "metaphor",
    translationFr: "métaphore",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "隐喻",
        pinyin: "yǐnyù",
        translation: "metaphor",
        translationFr: "métaphore"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 隐喻 »",
      choices: ["métaphore", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-b02b60e9",
    level: "hsk3",
    hanzi: "雅语",
    pinyin: "yǎyǔ",
    translation: "refined language",
    translationFr: "langage soutenu, élégant",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "雅语",
        pinyin: "yǎyǔ",
        translation: "refined language",
        translationFr: "langage soutenu, élégant"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 雅语 »",
      choices: ["langage soutenu, élégant", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-24f3c27c",
    level: "hsk4",
    hanzi: "雪中送炭",
    pinyin: "xuě zhōng sòng tàn",
    translation: "send coals in the snow (timely help)",
    translationFr: "apporter du charbon dans la neige (aider au moment critique)",
    category: "idiom",
    examples: [
      {
        hanzi: "雪中送炭",
        pinyin: "xuě zhōng sòng tàn",
        translation: "send coals in the snow (timely help)",
        translationFr: "apporter du charbon dans la neige (aider au moment critique)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 雪中送炭 »",
      choices: ["apporter du charbon dans la neige (aider au moment critique)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement"],
    theme: "chengyu"
  },
  {
    id: "supp-86f89fb2",
    level: "hsk3",
    hanzi: "非正式",
    pinyin: "fēi zhèngshì",
    translation: "informal",
    translationFr: "informel, non officiel",
    category: "expression",
    examples: [
      {
        hanzi: "非正式",
        pinyin: "fēi zhèngshì",
        translation: "informal",
        translationFr: "informel, non officiel"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 非正式 »",
      choices: ["informel, non officiel", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["expression", "supplement"],
    theme: "expressions"
  },
  {
    id: "supp-814b1c8d",
    level: "hsk3",
    hanzi: "面条",
    pinyin: "miàntiáo",
    translation: "noodles",
    translationFr: "nouilles",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "面条",
        pinyin: "miàntiáo",
        translation: "noodles",
        translationFr: "nouilles"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 面条 »",
      choices: ["nouilles", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-ab2ef34d",
    level: "hsk1",
    hanzi: "韵",
    pinyin: "yùn",
    translation: "rhyme",
    translationFr: "rime",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "韵",
        pinyin: "yùn",
        translation: "rhyme",
        translationFr: "rime"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 韵 »",
      choices: ["rime", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "base"
  },
  {
    id: "supp-698bcb37",
    level: "hsk3",
    hanzi: "顺颂",
    pinyin: "shùn sòng",
    translation: "closing compliment (letter)",
    translationFr: "formule de politesse (fin de lettre)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "顺颂",
        pinyin: "shùn sòng",
        translation: "closing compliment (letter)",
        translationFr: "formule de politesse (fin de lettre)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 顺颂 »",
      choices: ["formule de politesse (fin de lettre)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-25ce7e02",
    level: "hsk3",
    hanzi: "驳斥",
    pinyin: "bóchì",
    translation: "refute",
    translationFr: "réfuter",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "驳斥",
        pinyin: "bóchì",
        translation: "refute",
        translationFr: "réfuter"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 驳斥 »",
      choices: ["réfuter", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-f9c56b1f",
    level: "hsk5",
    hanzi: "鲁迅",
    pinyin: "lǔ xùn",
    translation: "Lu Xun (writer)",
    translationFr: "Lu Xun (écrivain)",
    category: "culture",
    examples: [
      {
        hanzi: "鲁迅",
        pinyin: "lǔ xùn",
        translation: "Lu Xun (writer)",
        translationFr: "Lu Xun (écrivain)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 鲁迅 »",
      choices: ["Lu Xun (écrivain)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["culture", "supplement"],
    theme: "auteurs"
  },
  {
    id: "supp-ab10119e",
    level: "hsk1",
    hanzi: "爸",
    pinyin: "bà",
    translation: "dad",
    translationFr: "papa",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "爸",
        pinyin: "bà",
        translation: "dad",
        translationFr: "papa"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 爸 »",
      choices: ["papa", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "base"
  },
  {
    id: "supp-deb12cfd",
    level: "hsk3",
    hanzi: "一天",
    pinyin: "yī tiān",
    translation: "one day",
    translationFr: "un jour",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "一天",
        pinyin: "yī tiān",
        translation: "one day",
        translationFr: "un jour"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 一天 »",
      choices: ["un jour", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-1837e3d1",
    level: "hsk3",
    hanzi: "下雪",
    pinyin: "xià xuě",
    translation: "to snow",
    translationFr: "neiger",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "下雪",
        pinyin: "xià xuě",
        translation: "to snow",
        translationFr: "neiger"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 下雪 »",
      choices: ["neiger", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-d777fc59",
    level: "hsk3",
    hanzi: "不喜欢",
    pinyin: "bù xǐhuān",
    translation: "don't like",
    translationFr: "ne pas aimer",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "不喜欢",
        pinyin: "bù xǐhuān",
        translation: "don't like",
        translationFr: "ne pas aimer"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 不喜欢 »",
      choices: ["ne pas aimer", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-85ca94ce",
    level: "hsk3",
    hanzi: "乱世",
    pinyin: "luànshì",
    translation: "turbulent era",
    translationFr: "période troublée, temps de chaos",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "乱世",
        pinyin: "luànshì",
        translation: "turbulent era",
        translationFr: "période troublée, temps de chaos"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 乱世 »",
      choices: ["période troublée, temps de chaos", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-fe99227f",
    level: "hsk3",
    hanzi: "交替传译",
    pinyin: "jiāotì chuányì",
    translation: "consecutive interpretation",
    translationFr: "interprétation consécutive",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "交替传译",
        pinyin: "jiāotì chuányì",
        translation: "consecutive interpretation",
        translationFr: "interprétation consécutive"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 交替传译 »",
      choices: ["interprétation consécutive", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-8f277eff",
    level: "hsk3",
    hanzi: "今天天气很好",
    pinyin: "jīntiān tiānqì hěn hǎo",
    translation: "the weather is nice today",
    translationFr: "il fait beau aujourd'hui",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "今天天气很好",
        pinyin: "jīntiān tiānqì hěn hǎo",
        translation: "the weather is nice today",
        translationFr: "il fait beau aujourd'hui"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 今天天气很好 »",
      choices: ["il fait beau aujourd'hui", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-59df8b98",
    level: "hsk3",
    hanzi: "估值",
    pinyin: "gūzhí",
    translation: "valuation",
    translationFr: "valorisation",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "估值",
        pinyin: "gūzhí",
        translation: "valuation",
        translationFr: "valorisation"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 估值 »",
      choices: ["valorisation", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-787818f0",
    level: "hsk3",
    hanzi: "佛教",
    pinyin: "fójiào",
    translation: "Buddhism",
    translationFr: "bouddhisme",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "佛教",
        pinyin: "fójiào",
        translation: "Buddhism",
        translationFr: "bouddhisme"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 佛教 »",
      choices: ["bouddhisme", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-5f135b82",
    level: "hsk3",
    hanzi: "修行",
    pinyin: "xiūxíng",
    translation: "spiritual practice",
    translationFr: "pratique spirituelle",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "修行",
        pinyin: "xiūxíng",
        translation: "spiritual practice",
        translationFr: "pratique spirituelle"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 修行 »",
      choices: ["pratique spirituelle", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-4fb9544f",
    level: "hsk3",
    hanzi: "儒家",
    pinyin: "rújiā",
    translation: "Confucian school",
    translationFr: "école confucéenne",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "儒家",
        pinyin: "rújiā",
        translation: "Confucian school",
        translationFr: "école confucéenne"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 儒家 »",
      choices: ["école confucéenne", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-c5a64676",
    level: "hsk3",
    hanzi: "元明清",
    pinyin: "yuán míng qīng",
    translation: "Yuan, Ming and Qing (dynasties)",
    translationFr: "Yuan, Ming et Qing (dynasties)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "元明清",
        pinyin: "yuán míng qīng",
        translation: "Yuan, Ming and Qing (dynasties)",
        translationFr: "Yuan, Ming et Qing (dynasties)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 元明清 »",
      choices: ["Yuan, Ming et Qing (dynasties)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-386bf516",
    level: "hsk3",
    hanzi: "元曲",
    pinyin: "yuánqǔ",
    translation: "Yuan drama",
    translationFr: "théâtre des Yuan",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "元曲",
        pinyin: "yuánqǔ",
        translation: "Yuan drama",
        translationFr: "théâtre des Yuan"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 元曲 »",
      choices: ["théâtre des Yuan", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-163943ed",
    level: "hsk3",
    hanzi: "写景",
    pinyin: "xiějǐng",
    translation: "landscape description",
    translationFr: "description de paysage",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "写景",
        pinyin: "xiějǐng",
        translation: "landscape description",
        translationFr: "description de paysage"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 写景 »",
      choices: ["description de paysage", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-e5729e94",
    level: "hsk3",
    hanzi: "原文",
    pinyin: "yuánwén",
    translation: "original text",
    translationFr: "texte original",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "原文",
        pinyin: "yuánwén",
        translation: "original text",
        translationFr: "texte original"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 原文 »",
      choices: ["texte original", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-1d3ec391",
    level: "hsk3",
    hanzi: "变法",
    pinyin: "biànfǎ",
    translation: "political reform",
    translationFr: "réforme politique",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "变法",
        pinyin: "biànfǎ",
        translation: "political reform",
        translationFr: "réforme politique"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 变法 »",
      choices: ["réforme politique", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-8cb83c8a",
    level: "hsk3",
    hanzi: "口译",
    pinyin: "kǒuyì",
    translation: "oral interpretation",
    translationFr: "interprétation orale",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "口译",
        pinyin: "kǒuyì",
        translation: "oral interpretation",
        translationFr: "interprétation orale"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 口译 »",
      choices: ["interprétation orale", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-bf2c81a6",
    level: "hsk3",
    hanzi: "同声传译",
    pinyin: "tóngshēng chuányì",
    translation: "simultaneous interpretation",
    translationFr: "interprétation simultanée",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "同声传译",
        pinyin: "tóngshēng chuányì",
        translation: "simultaneous interpretation",
        translationFr: "interprétation simultanée"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 同声传译 »",
      choices: ["interprétation simultanée", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-29c617a9",
    level: "hsk3",
    hanzi: "同行评审",
    pinyin: "tóngháng píngshěn",
    translation: "peer review",
    translationFr: "évaluation par les pairs",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "同行评审",
        pinyin: "tóngháng píngshěn",
        translation: "peer review",
        translationFr: "évaluation par les pairs"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 同行评审 »",
      choices: ["évaluation par les pairs", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-2cc796fa",
    level: "hsk3",
    hanzi: "咏物",
    pinyin: "yǒngwù",
    translation: "object-chanting poetry",
    translationFr: "poésie décrivant un objet",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "咏物",
        pinyin: "yǒngwù",
        translation: "object-chanting poetry",
        translationFr: "poésie décrivant un objet"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 咏物 »",
      choices: ["poésie décrivant un objet", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-23ef9c7e",
    level: "hsk3",
    hanzi: "唐宋",
    pinyin: "táng sòng",
    translation: "Tang and Song (dynasties)",
    translationFr: "Tang et Song (dynasties)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "唐宋",
        pinyin: "táng sòng",
        translation: "Tang and Song (dynasties)",
        translationFr: "Tang et Song (dynasties)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 唐宋 »",
      choices: ["Tang et Song (dynasties)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-d220b3d8",
    level: "hsk3",
    hanzi: "唐诗",
    pinyin: "tángshī",
    translation: "Tang poetry",
    translationFr: "poésie Tang",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "唐诗",
        pinyin: "tángshī",
        translation: "Tang poetry",
        translationFr: "poésie Tang"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 唐诗 »",
      choices: ["poésie Tang", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-e7ddacbc",
    level: "hsk3",
    hanzi: "商业模式",
    pinyin: "shāngyè móshì",
    translation: "business model",
    translationFr: "modèle économique",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "商业模式",
        pinyin: "shāngyè móshì",
        translation: "business model",
        translationFr: "modèle économique"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 商业模式 »",
      choices: ["modèle économique", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-81754ed9",
    level: "hsk3",
    hanzi: "回电",
    pinyin: "huídiàn",
    translation: "return a call",
    translationFr: "rappeler (téléphone)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "回电",
        pinyin: "huídiàn",
        translation: "return a call",
        translationFr: "rappeler (téléphone)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 回电 »",
      choices: ["rappeler (téléphone)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-5fa6ae9e",
    level: "hsk3",
    hanzi: "墨家",
    pinyin: "mòjiā",
    translation: "Mohist school",
    translationFr: "école mohiste",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "墨家",
        pinyin: "mòjiā",
        translation: "Mohist school",
        translationFr: "école mohiste"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 墨家 »",
      choices: ["école mohiste", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-d3ec41c3",
    level: "hsk3",
    hanzi: "天使轮",
    pinyin: "tiānshǐ lún",
    translation: "angel round (funding)",
    translationFr: "tour de financement d'amorçage (angel)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "天使轮",
        pinyin: "tiānshǐ lún",
        translation: "angel round (funding)",
        translationFr: "tour de financement d'amorçage (angel)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 天使轮 »",
      choices: ["tour de financement d'amorçage (angel)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-a79b2af0",
    level: "hsk3",
    hanzi: "宋词",
    pinyin: "sòngcí",
    translation: "Song ci poetry",
    translationFr: "poésie cí des Song",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "宋词",
        pinyin: "sòngcí",
        translation: "Song ci poetry",
        translationFr: "poésie cí des Song"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 宋词 »",
      choices: ["poésie cí des Song", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-5946d20f",
    level: "hsk3",
    hanzi: "审稿",
    pinyin: "shěngǎo",
    translation: "review a manuscript",
    translationFr: "relire/réviser un manuscrit",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "审稿",
        pinyin: "shěngǎo",
        translation: "review a manuscript",
        translationFr: "relire/réviser un manuscrit"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 审稿 »",
      choices: ["relire/réviser un manuscrit", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-541167ce",
    level: "hsk3",
    hanzi: "小狗",
    pinyin: "xiǎogǒu",
    translation: "puppy",
    translationFr: "chiot, petit chien",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "小狗",
        pinyin: "xiǎogǒu",
        translation: "puppy",
        translationFr: "chiot, petit chien"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 小狗 »",
      choices: ["chiot, petit chien", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-acf5547a",
    level: "hsk3",
    hanzi: "小猫",
    pinyin: "xiǎomāo",
    translation: "kitten",
    translationFr: "chaton, petit chat",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "小猫",
        pinyin: "xiǎomāo",
        translation: "kitten",
        translationFr: "chaton, petit chat"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 小猫 »",
      choices: ["chaton, petit chat", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-a18833bf",
    level: "hsk3",
    hanzi: "展台",
    pinyin: "zhǎntái",
    translation: "exhibition booth",
    translationFr: "stand d'exposition",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "展台",
        pinyin: "zhǎntái",
        translation: "exhibition booth",
        translationFr: "stand d'exposition"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 展台 »",
      choices: ["stand d'exposition", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-4874ac7d",
    level: "hsk3",
    hanzi: "川菜",
    pinyin: "chuāncài",
    translation: "Sichuan cuisine",
    translationFr: "cuisine du Sichuan",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "川菜",
        pinyin: "chuāncài",
        translation: "Sichuan cuisine",
        translationFr: "cuisine du Sichuan"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 川菜 »",
      choices: ["cuisine du Sichuan", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-1ea1efd6",
    level: "hsk3",
    hanzi: "市场份额",
    pinyin: "shìchǎng fèn'é",
    translation: "market share",
    translationFr: "part de marché",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "市场份额",
        pinyin: "shìchǎng fèn'é",
        translation: "market share",
        translationFr: "part de marché"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 市场份额 »",
      choices: ["part de marché", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-40bdf1aa",
    level: "hsk3",
    hanzi: "幻灯片",
    pinyin: "huàndēngpiàn",
    translation: "slide (presentation)",
    translationFr: "diapositive",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "幻灯片",
        pinyin: "huàndēngpiàn",
        translation: "slide (presentation)",
        translationFr: "diapositive"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 幻灯片 »",
      choices: ["diapositive", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-847fe2bf",
    level: "hsk3",
    hanzi: "庄子",
    pinyin: "zhuāngzǐ",
    translation: "Zhuangzi (Taoist philosopher)",
    translationFr: "Zhuangzi (philosophe taoïste)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "庄子",
        pinyin: "zhuāngzǐ",
        translation: "Zhuangzi (Taoist philosopher)",
        translationFr: "Zhuangzi (philosophe taoïste)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 庄子 »",
      choices: ["Zhuangzi (philosophe taoïste)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-660029a5",
    level: "hsk3",
    hanzi: "开国",
    pinyin: "kāiguó",
    translation: "founding a dynasty",
    translationFr: "fondation d'une dynastie",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "开国",
        pinyin: "kāiguó",
        translation: "founding a dynasty",
        translationFr: "fondation d'une dynastie"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 开国 »",
      choices: ["fondation d'une dynastie", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-43f9cf94",
    level: "hsk3",
    hanzi: "开放获取",
    pinyin: "kāifàng huòqǔ",
    translation: "open access",
    translationFr: "libre accès (publications)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "开放获取",
        pinyin: "kāifàng huòqǔ",
        translation: "open access",
        translationFr: "libre accès (publications)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 开放获取 »",
      choices: ["libre accès (publications)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-a1728ac0",
    level: "hsk3",
    hanzi: "弹幕",
    pinyin: "dànmù",
    translation: "bullet comments",
    translationFr: "commentaires déroulants (bullet comments)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "弹幕",
        pinyin: "dànmù",
        translation: "bullet comments",
        translationFr: "commentaires déroulants (bullet comments)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 弹幕 »",
      choices: ["commentaires déroulants (bullet comments)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-fe168d37",
    level: "hsk3",
    hanzi: "影响因子",
    pinyin: "yǐngxiǎng yīnzǐ",
    translation: "impact factor",
    translationFr: "facteur d'impact",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "影响因子",
        pinyin: "yǐngxiǎng yīnzǐ",
        translation: "impact factor",
        translationFr: "facteur d'impact"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 影响因子 »",
      choices: ["facteur d'impact", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-3469637f",
    level: "hsk3",
    hanzi: "影评",
    pinyin: "yǐngpíng",
    translation: "film review",
    translationFr: "critique de film",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "影评",
        pinyin: "yǐngpíng",
        translation: "film review",
        translationFr: "critique de film"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 影评 »",
      choices: ["critique de film", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-f3e779fa",
    level: "hsk3",
    hanzi: "很久以前",
    pinyin: "hěn jiǔ yǐqián",
    translation: "long ago",
    translationFr: "il y a très longtemps",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "很久以前",
        pinyin: "hěn jiǔ yǐqián",
        translation: "long ago",
        translationFr: "il y a très longtemps"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 很久以前 »",
      choices: ["il y a très longtemps", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-cfbf6f4c",
    level: "hsk3",
    hanzi: "微信",
    pinyin: "wēixìn",
    translation: "WeChat",
    translationFr: "WeChat",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "微信",
        pinyin: "wēixìn",
        translation: "WeChat",
        translationFr: "WeChat"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 微信 »",
      choices: ["WeChat", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-fb050d6c",
    level: "hsk3",
    hanzi: "微博",
    pinyin: "wēibó",
    translation: "Weibo (microblog)",
    translationFr: "Weibo (microblog)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "微博",
        pinyin: "wēibó",
        translation: "Weibo (microblog)",
        translationFr: "Weibo (microblog)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 微博 »",
      choices: ["Weibo (microblog)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-8bd2c8e8",
    level: "hsk3",
    hanzi: "怀古",
    pinyin: "huáigǔ",
    translation: "nostalgia for the past",
    translationFr: "nostalgie du passé",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "怀古",
        pinyin: "huáigǔ",
        translation: "nostalgia for the past",
        translationFr: "nostalgie du passé"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 怀古 »",
      choices: ["nostalgie du passé", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-88f73cbe",
    level: "hsk3",
    hanzi: "思想家",
    pinyin: "sīxiǎngjiā",
    translation: "thinker",
    translationFr: "penseur",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "思想家",
        pinyin: "sīxiǎngjiā",
        translation: "thinker",
        translationFr: "penseur"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 思想家 »",
      choices: ["penseur", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-61ae8fe1",
    level: "hsk3",
    hanzi: "意译",
    pinyin: "yìyì",
    translation: "free / meaning-based translation",
    translationFr: "traduction libre / par le sens",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "意译",
        pinyin: "yìyì",
        translation: "free / meaning-based translation",
        translationFr: "traduction libre / par le sens"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 意译 »",
      choices: ["traduction libre / par le sens", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-7f7fcada",
    level: "hsk3",
    hanzi: "打乒乓球",
    pinyin: "dǎ pīngpāng qiú",
    translation: "play table tennis",
    translationFr: "jouer au ping-pong",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "打乒乓球",
        pinyin: "dǎ pīngpāng qiú",
        translation: "play table tennis",
        translationFr: "jouer au ping-pong"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 打乒乓球 »",
      choices: ["jouer au ping-pong", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-d61f1edd",
    level: "hsk3",
    hanzi: "打球",
    pinyin: "dǎ qiú",
    translation: "play ball",
    translationFr: "jouer au ballon",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "打球",
        pinyin: "dǎ qiú",
        translation: "play ball",
        translationFr: "jouer au ballon"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 打球 »",
      choices: ["jouer au ballon", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-f53ceb21",
    level: "hsk3",
    hanzi: "接电话",
    pinyin: "jiē diànhuà",
    translation: "answer the phone",
    translationFr: "répondre au téléphone",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "接电话",
        pinyin: "jiē diànhuà",
        translation: "answer the phone",
        translationFr: "répondre au téléphone"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 接电话 »",
      choices: ["répondre au téléphone", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-9919bb9d",
    level: "hsk3",
    hanzi: "提问环节",
    pinyin: "tíwèn huánjié",
    translation: "Q&A session",
    translationFr: "séance de questions",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "提问环节",
        pinyin: "tíwèn huánjié",
        translation: "Q&A session",
        translationFr: "séance de questions"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 提问环节 »",
      choices: ["séance de questions", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-39b4feb5",
    level: "hsk3",
    hanzi: "摆盘",
    pinyin: "bǎipán",
    translation: "plating",
    translationFr: "dressage, mise en assiette",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "摆盘",
        pinyin: "bǎipán",
        translation: "plating",
        translationFr: "dressage, mise en assiette"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 摆盘 »",
      choices: ["dressage, mise en assiette", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-97d07614",
    level: "hsk3",
    hanzi: "文本",
    pinyin: "wénběn",
    translation: "text",
    translationFr: "texte",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "文本",
        pinyin: "wénběn",
        translation: "text",
        translationFr: "texte"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 文本 »",
      choices: ["texte", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-19a3ac2e",
    level: "hsk3",
    hanzi: "无为",
    pinyin: "wúwéi",
    translation: "non-action (Taoism)",
    translationFr: "non-agir (taoïsme)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "无为",
        pinyin: "wúwéi",
        translation: "non-action (Taoism)",
        translationFr: "non-agir (taoïsme)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 无为 »",
      choices: ["non-agir (taoïsme)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-4e2f1c29",
    level: "hsk1",
    hanzi: "旦",
    pinyin: "dàn",
    translation: "female role (opera)",
    translationFr: "rôle féminin (opéra)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "旦",
        pinyin: "dàn",
        translation: "female role (opera)",
        translationFr: "rôle féminin (opéra)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 旦 »",
      choices: ["rôle féminin (opéra)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "base"
  },
  {
    id: "supp-a76bf740",
    level: "hsk3",
    hanzi: "时刻表",
    pinyin: "shíkèbiǎo",
    translation: "timetable / schedule",
    translationFr: "horaire, emploi du temps",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "时刻表",
        pinyin: "shíkèbiǎo",
        translation: "timetable / schedule",
        translationFr: "horaire, emploi du temps"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 时刻表 »",
      choices: ["horaire, emploi du temps", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-faec9d7e",
    level: "hsk3",
    hanzi: "昆曲",
    pinyin: "kūnqǔ",
    translation: "Kunqu opera",
    translationFr: "opéra Kunqu",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "昆曲",
        pinyin: "kūnqǔ",
        translation: "Kunqu opera",
        translationFr: "opéra Kunqu"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 昆曲 »",
      choices: ["opéra Kunqu", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-d3f74724",
    level: "hsk3",
    hanzi: "曲牌",
    pinyin: "qǔpái",
    translation: "fixed-tune name (opera, ci)",
    translationFr: "air fixé (opéra, ci)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "曲牌",
        pinyin: "qǔpái",
        translation: "fixed-tune name (opera, ci)",
        translationFr: "air fixé (opéra, ci)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 曲牌 »",
      choices: ["air fixé (opéra, ci)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-7ac6c234",
    level: "hsk3",
    hanzi: "有一次",
    pinyin: "yǒu yī cì",
    translation: "once, one time",
    translationFr: "une fois, il y a eu une fois",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "有一次",
        pinyin: "yǒu yī cì",
        translation: "once, one time",
        translationFr: "une fois, il y a eu une fois"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 有一次 »",
      choices: ["une fois, il y a eu une fois", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-85b06f01",
    level: "hsk3",
    hanzi: "有空",
    pinyin: "yǒu kòng",
    translation: "have free time",
    translationFr: "avoir du temps libre",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "有空",
        pinyin: "yǒu kòng",
        translation: "have free time",
        translationFr: "avoir du temps libre"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 有空 »",
      choices: ["avoir du temps libre", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-d3de57b2",
    level: "hsk3",
    hanzi: "朋友圈",
    pinyin: "péngyou quān",
    translation: "Moments (WeChat feed)",
    translationFr: "Moments (WeChat)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "朋友圈",
        pinyin: "péngyou quān",
        translation: "Moments (WeChat feed)",
        translationFr: "Moments (WeChat)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 朋友圈 »",
      choices: ["Moments (WeChat)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-f8484a6c",
    level: "hsk3",
    hanzi: "期刊",
    pinyin: "qīkān",
    translation: "journal / periodical",
    translationFr: "revue, périodique",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "期刊",
        pinyin: "qīkān",
        translation: "journal / periodical",
        translationFr: "revue, périodique"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 期刊 »",
      choices: ["revue, périodique", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-b8237e23",
    level: "hsk3",
    hanzi: "水袖",
    pinyin: "shuǐxiù",
    translation: "water sleeves (opera)",
    translationFr: "manches d'eau (opéra)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "水袖",
        pinyin: "shuǐxiù",
        translation: "water sleeves (opera)",
        translationFr: "manches d'eau (opéra)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 水袖 »",
      choices: ["manches d'eau (opéra)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-5ddd1af0",
    level: "hsk3",
    hanzi: "没想到",
    pinyin: "méi xiǎngdào",
    translation: "unexpectedly",
    translationFr: "à ne pas s'y attendre, inattendu",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "没想到",
        pinyin: "méi xiǎngdào",
        translation: "unexpectedly",
        translationFr: "à ne pas s'y attendre, inattendu"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 没想到 »",
      choices: ["à ne pas s'y attendre, inattendu", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-7592e5e7",
    level: "hsk3",
    hanzi: "没空",
    pinyin: "méi kòng",
    translation: "no free time",
    translationFr: "ne pas avoir de temps",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "没空",
        pinyin: "méi kòng",
        translation: "no free time",
        translationFr: "ne pas avoir de temps"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 没空 »",
      choices: ["ne pas avoir de temps", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-e9d94a72",
    level: "hsk3",
    hanzi: "法家",
    pinyin: "fǎjiā",
    translation: "Legalist school",
    translationFr: "école légiste",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "法家",
        pinyin: "fǎjiā",
        translation: "Legalist school",
        translationFr: "école légiste"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 法家 »",
      choices: ["école légiste", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-f9ce606d",
    level: "hsk3",
    hanzi: "淮扬菜",
    pinyin: "huáiyáng cài",
    translation: "Huaiyang cuisine",
    translationFr: "cuisine Huaiyang",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "淮扬菜",
        pinyin: "huáiyáng cài",
        translation: "Huaiyang cuisine",
        translationFr: "cuisine Huaiyang"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 淮扬菜 »",
      choices: ["cuisine Huaiyang", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-9e27f327",
    level: "hsk3",
    hanzi: "演唱会",
    pinyin: "yǎnchànghuì",
    translation: "concert",
    translationFr: "concert",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "演唱会",
        pinyin: "yǎnchànghuì",
        translation: "concert",
        translationFr: "concert"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 演唱会 »",
      choices: ["concert", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-41373d5e",
    level: "hsk3",
    hanzi: "爱情片",
    pinyin: "àiqíng piàn",
    translation: "romance film",
    translationFr: "film romantique",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "爱情片",
        pinyin: "àiqíng piàn",
        translation: "romance film",
        translationFr: "film romantique"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 爱情片 »",
      choices: ["film romantique", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-b30c1a98",
    level: "hsk1",
    hanzi: "生",
    pinyin: "shēng",
    translation: "male role (opera)",
    translationFr: "rôle masculin (opéra)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "生",
        pinyin: "shēng",
        translation: "male role (opera)",
        translationFr: "rôle masculin (opéra)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 生 »",
      choices: ["rôle masculin (opéra)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "base"
  },
  {
    id: "supp-11c28cb5",
    level: "hsk3",
    hanzi: "电竞",
    pinyin: "diànjìng",
    translation: "e-sports",
    translationFr: "e-sport",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "电竞",
        pinyin: "diànjìng",
        translation: "e-sports",
        translationFr: "e-sport"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 电竞 »",
      choices: ["e-sport", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-b3582589",
    level: "hsk3",
    hanzi: "盛世",
    pinyin: "shèngshì",
    translation: "golden age / flourishing era",
    translationFr: "âge d'or",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "盛世",
        pinyin: "shèngshì",
        translation: "golden age / flourishing era",
        translationFr: "âge d'or"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 盛世 »",
      choices: ["âge d'or", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-6e108ee6",
    level: "hsk3",
    hanzi: "直译",
    pinyin: "zhíyì",
    translation: "literal translation",
    translationFr: "traduction littérale",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "直译",
        pinyin: "zhíyì",
        translation: "literal translation",
        translationFr: "traduction littérale"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 直译 »",
      choices: ["traduction littérale", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-a798bba4",
    level: "hsk3",
    hanzi: "研究综述",
    pinyin: "yánjiū zōngshù",
    translation: "literature review",
    translationFr: "revue de la littérature",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "研究综述",
        pinyin: "yánjiū zōngshù",
        translation: "literature review",
        translationFr: "revue de la littérature"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 研究综述 »",
      choices: ["revue de la littérature", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-56fe4930",
    level: "hsk3",
    hanzi: "碳中和",
    pinyin: "tàn zhōnghé",
    translation: "carbon neutrality",
    translationFr: "neutralité carbone",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "碳中和",
        pinyin: "tàn zhōnghé",
        translation: "carbon neutrality",
        translationFr: "neutralité carbone"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 碳中和 »",
      choices: ["neutralité carbone", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-f015e4ff",
    level: "hsk1",
    hanzi: "禅",
    pinyin: "chán",
    translation: "Chan / Zen",
    translationFr: "chan / zen",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "禅",
        pinyin: "chán",
        translation: "Chan / Zen",
        translationFr: "chan / zen"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 禅 »",
      choices: ["chan / zen", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "base"
  },
  {
    id: "supp-b74fc1c3",
    level: "hsk3",
    hanzi: "秦汉",
    pinyin: "qín hàn",
    translation: "Qin and Han (dynasties)",
    translationFr: "Qin et Han (dynasties)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "秦汉",
        pinyin: "qín hàn",
        translation: "Qin and Han (dynasties)",
        translationFr: "Qin et Han (dynasties)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 秦汉 »",
      choices: ["Qin et Han (dynasties)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-b7612b71",
    level: "hsk1",
    hanzi: "空",
    pinyin: "kōng",
    translation: "emptiness (Buddhism)",
    translationFr: "vide, vacuité (bouddhisme)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "空",
        pinyin: "kōng",
        translation: "emptiness (Buddhism)",
        translationFr: "vide, vacuité (bouddhisme)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 空 »",
      choices: ["vide, vacuité (bouddhisme)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "base"
  },
  {
    id: "supp-86deeebc",
    level: "hsk3",
    hanzi: "立意",
    pinyin: "lìyì",
    translation: "theme / intention",
    translationFr: "intention, idée directrice",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "立意",
        pinyin: "lìyì",
        translation: "theme / intention",
        translationFr: "intention, idée directrice"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 立意 »",
      choices: ["intention, idée directrice", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-57b8c856",
    level: "hsk3",
    hanzi: "等效",
    pinyin: "děngxiào",
    translation: "equivalence",
    translationFr: "équivalence",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "等效",
        pinyin: "děngxiào",
        translation: "equivalence",
        translationFr: "équivalence"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 等效 »",
      choices: ["équivalence", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-1c173c83",
    level: "hsk3",
    hanzi: "粉丝",
    pinyin: "fěnsī",
    translation: "fans",
    translationFr: "fans",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "粉丝",
        pinyin: "fěnsī",
        translation: "fans",
        translationFr: "fans"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 粉丝 »",
      choices: ["fans", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-efab498e",
    level: "hsk3",
    hanzi: "粤菜",
    pinyin: "yuècài",
    translation: "Cantonese cuisine",
    translationFr: "cuisine cantonaise",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "粤菜",
        pinyin: "yuècài",
        translation: "Cantonese cuisine",
        translationFr: "cuisine cantonaise"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 粤菜 »",
      choices: ["cuisine cantonaise", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-5a769c83",
    level: "hsk3",
    hanzi: "美食家",
    pinyin: "měishíjiā",
    translation: "gourmet / foodie",
    translationFr: "gourmet",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "美食家",
        pinyin: "měishíjiā",
        translation: "gourmet / foodie",
        translationFr: "gourmet"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 美食家 »",
      choices: ["gourmet", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-2b0c0bee",
    level: "hsk3",
    hanzi: "老子",
    pinyin: "lǎozǐ",
    translation: "Laozi (Taoist philosopher)",
    translationFr: "Laozi (philosophe taoïste)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "老子",
        pinyin: "lǎozǐ",
        translation: "Laozi (Taoist philosopher)",
        translationFr: "Laozi (philosophe taoïste)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 老子 »",
      choices: ["Laozi (philosophe taoïste)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-413a4b18",
    level: "hsk3",
    hanzi: "脸谱",
    pinyin: "liǎnpǔ",
    translation: "facial painting (opera)",
    translationFr: "masque facial (opéra)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "脸谱",
        pinyin: "liǎnpǔ",
        translation: "facial painting (opera)",
        translationFr: "masque facial (opéra)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 脸谱 »",
      choices: ["masque facial (opéra)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-177b93f3",
    level: "hsk3",
    hanzi: "自我介绍",
    pinyin: "zìwǒ jièshào",
    translation: "self-introduction",
    translationFr: "se présenter",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "自我介绍",
        pinyin: "zìwǒ jièshào",
        translation: "self-introduction",
        translationFr: "se présenter"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 自我介绍 »",
      choices: ["se présenter", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-821ab608",
    level: "hsk3",
    hanzi: "茶具",
    pinyin: "chájù",
    translation: "tea set",
    translationFr: "service à thé",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "茶具",
        pinyin: "chájù",
        translation: "tea set",
        translationFr: "service à thé"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 茶具 »",
      choices: ["service à thé", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-b29425e6",
    level: "hsk3",
    hanzi: "茶道",
    pinyin: "chádào",
    translation: "tea ceremony",
    translationFr: "art du thé",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "茶道",
        pinyin: "chádào",
        translation: "tea ceremony",
        translationFr: "art du thé"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 茶道 »",
      choices: ["art du thé", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-5190ce60",
    level: "hsk3",
    hanzi: "译员",
    pinyin: "yìyuán",
    translation: "interpreter",
    translationFr: "interprète",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "译员",
        pinyin: "yìyuán",
        translation: "interpreter",
        translationFr: "interprète"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 译员 »",
      choices: ["interprète", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-cd2589e0",
    level: "hsk3",
    hanzi: "译文",
    pinyin: "yìwén",
    translation: "translated text",
    translationFr: "texte traduit",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "译文",
        pinyin: "yìwén",
        translation: "translated text",
        translationFr: "texte traduit"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 译文 »",
      choices: ["texte traduit", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-054786dd",
    level: "hsk3",
    hanzi: "赏析",
    pinyin: "shǎngxī",
    translation: "appreciation and analysis",
    translationFr: "appréciation critique",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "赏析",
        pinyin: "shǎngxī",
        translation: "appreciation and analysis",
        translationFr: "appréciation critique"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 赏析 »",
      choices: ["appréciation critique", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-1da081ab",
    level: "hsk3",
    hanzi: "踢足球",
    pinyin: "tī zúqiú",
    translation: "play soccer",
    translationFr: "jouer au football",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "踢足球",
        pinyin: "tī zúqiú",
        translation: "play soccer",
        translationFr: "jouer au football"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 踢足球 »",
      choices: ["jouer au football", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-aecc5b65",
    level: "hsk3",
    hanzi: "车票",
    pinyin: "chēpiào",
    translation: "ticket (train/bus)",
    translationFr: "billet (train/bus)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "车票",
        pinyin: "chēpiào",
        translation: "ticket (train/bus)",
        translationFr: "billet (train/bus)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 车票 »",
      choices: ["billet (train/bus)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-62032975",
    level: "hsk3",
    hanzi: "选课",
    pinyin: "xuǎnkè",
    translation: "course selection",
    translationFr: "choisir ses cours",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "选课",
        pinyin: "xuǎnkè",
        translation: "course selection",
        translationFr: "choisir ses cours"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 选课 »",
      choices: ["choisir ses cours", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-7bef7725",
    level: "hsk3",
    hanzi: "通关",
    pinyin: "tōngguān",
    translation: "clear a level / pass customs",
    translationFr: "passer un niveau / douane",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "通关",
        pinyin: "tōngguān",
        translation: "clear a level / pass customs",
        translationFr: "passer un niveau / douane"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 通关 »",
      choices: ["passer un niveau / douane", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-44559440",
    level: "hsk3",
    hanzi: "速记",
    pinyin: "sùjì",
    translation: "shorthand",
    translationFr: "sténographie",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "速记",
        pinyin: "sùjì",
        translation: "shorthand",
        translationFr: "sténographie"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 速记 »",
      choices: ["sténographie", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-bf8e8b56",
    level: "hsk3",
    hanzi: "道家",
    pinyin: "dàojiā",
    translation: "Taoist school",
    translationFr: "école taoïste",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "道家",
        pinyin: "dàojiā",
        translation: "Taoist school",
        translationFr: "école taoïste"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 道家 »",
      choices: ["école taoïste", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-89e44697",
    level: "hsk3",
    hanzi: "道德经",
    pinyin: "dàodé jīng",
    translation: "Tao Te Ching (Laozi)",
    translationFr: "Tao Te King (Laozi)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "道德经",
        pinyin: "dàodé jīng",
        translation: "Tao Te Ching (Laozi)",
        translationFr: "Tao Te King (Laozi)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 道德经 »",
      choices: ["Tao Te King (Laozi)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-7d2be0c7",
    level: "hsk3",
    hanzi: "那时候",
    pinyin: "nà shíhou",
    translation: "at that time",
    translationFr: "à cette époque-là",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "那时候",
        pinyin: "nà shíhou",
        translation: "at that time",
        translationFr: "à cette époque-là"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 那时候 »",
      choices: ["à cette époque-là", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-31eaf57e",
    level: "hsk3",
    hanzi: "阴阳",
    pinyin: "yīn yáng",
    translation: "yin and yang",
    translationFr: "yin et yang",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "阴阳",
        pinyin: "yīn yáng",
        translation: "yin and yang",
        translationFr: "yin et yang"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 阴阳 »",
      choices: ["yin et yang", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-025d1c5f",
    level: "hsk3",
    hanzi: "音乐节",
    pinyin: "yīnyuè jié",
    translation: "music festival",
    translationFr: "festival de musique",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "音乐节",
        pinyin: "yīnyuè jié",
        translation: "music festival",
        translationFr: "festival de musique"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 音乐节 »",
      choices: ["festival de musique", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-374c9101",
    level: "hsk3",
    hanzi: "预印本",
    pinyin: "yùyìnběn",
    translation: "preprint",
    translationFr: "préprint",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "预印本",
        pinyin: "yùyìnběn",
        translation: "preprint",
        translationFr: "préprint"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 预印本 »",
      choices: ["préprint", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-43589f00",
    level: "hsk3",
    hanzi: "食材",
    pinyin: "shícái",
    translation: "food ingredients",
    translationFr: "ingrédients alimentaires",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "食材",
        pinyin: "shícái",
        translation: "food ingredients",
        translationFr: "ingrédients alimentaires"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 食材 »",
      choices: ["ingrédients alimentaires", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-aa23dbb1",
    level: "hsk3",
    hanzi: "骑车",
    pinyin: "qí chē",
    translation: "ride a bike",
    translationFr: "faire du vélo",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "骑车",
        pinyin: "qí chē",
        translation: "ride a bike",
        translationFr: "faire du vélo"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 骑车 »",
      choices: ["faire du vélo", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-3d5bf69e",
    level: "hsk3",
    hanzi: "鲁菜",
    pinyin: "lǔcài",
    translation: "Shandong cuisine",
    translationFr: "cuisine du Shandong",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "鲁菜",
        pinyin: "lǔcài",
        translation: "Shandong cuisine",
        translationFr: "cuisine du Shandong"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 鲁菜 »",
      choices: ["cuisine du Shandong", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-20083fae",
    level: "hsk3",
    hanzi: "年 / 月 / 日",
    pinyin: "nián / yuè / rì",
    translation: "year / month / day",
    translationFr: "année / mois / jour",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "年 / 月 / 日",
        pinyin: "nián / yuè / rì",
        translation: "year / month / day",
        translationFr: "année / mois / jour"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 年 / 月 / 日 »",
      choices: ["année / mois / jour", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-15034b71",
    level: "hsk3",
    hanzi: "拜拜",
    pinyin: "bàibài",
    translation: "bye-bye (informal)",
    translationFr: "au revoir (informel)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "拜拜",
        pinyin: "bàibài",
        translation: "bye-bye (informal)",
        translationFr: "au revoir (informel)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 拜拜 »",
      choices: ["au revoir (informel)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-48f75a24",
    level: "hsk3",
    hanzi: "早上好",
    pinyin: "zǎoshang hǎo",
    translation: "good morning",
    translationFr: "bonjour (matin)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "早上好",
        pinyin: "zǎoshang hǎo",
        translation: "good morning",
        translationFr: "bonjour (matin)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 早上好 »",
      choices: ["bonjour (matin)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-7e6fcacc",
    level: "hsk3",
    hanzi: "明天见",
    pinyin: "míngtiān jiàn",
    translation: "see you tomorrow",
    translationFr: "à demain",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "明天见",
        pinyin: "míngtiān jiàn",
        translation: "see you tomorrow",
        translationFr: "à demain"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 明天见 »",
      choices: ["à demain", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-eab619fb",
    level: "hsk1",
    hanzi: "水",
    pinyin: "shuǐ",
    translation: "water",
    translationFr: "eau",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "水",
        pinyin: "shuǐ",
        translation: "water",
        translationFr: "eau"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 水 »",
      choices: ["eau", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "base"
  },
  {
    id: "supp-203312f3",
    level: "hsk3",
    hanzi: "点 / 分",
    pinyin: "diǎn / fēn",
    translation: "hour / minute",
    translationFr: "heure / minute",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "点 / 分",
        pinyin: "diǎn / fēn",
        translation: "hour / minute",
        translationFr: "heure / minute"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 点 / 分 »",
      choices: ["heure / minute", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-b4ebe3f5",
    level: "hsk3",
    hanzi: "没有",
    pinyin: "méiyǒu",
    translation: "not have",
    translationFr: "ne pas avoir",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "没有",
        pinyin: "méiyǒu",
        translation: "not have",
        translationFr: "ne pas avoir"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 没有 »",
      choices: ["ne pas avoir", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-c80bb5ac",
    level: "hsk3",
    hanzi: "真好吃",
    pinyin: "zhēn hǎochī",
    translation: "really delicious",
    translationFr: "vraiment délicieux",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "真好吃",
        pinyin: "zhēn hǎochī",
        translation: "really delicious",
        translationFr: "vraiment délicieux"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 真好吃 »",
      choices: ["vraiment délicieux", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-7d49b35c",
    level: "hsk1",
    hanzi: "着",
    pinyin: "zhe",
    translation: "continuous aspect particle",
    translationFr: "particule aspect continu",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "着",
        pinyin: "zhe",
        translation: "continuous aspect particle",
        translationFr: "particule aspect continu"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 着 »",
      choices: ["particule aspect continu", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "base"
  },
  {
    id: "supp-6c7c4335",
    level: "hsk3",
    hanzi: "谢谢你做的饭",
    pinyin: "xièxie nǐ zuò de fàn",
    translation: "thanks for the meal you cooked",
    translationFr: "merci pour le repas que tu as préparé",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "谢谢你做的饭",
        pinyin: "xièxie nǐ zuò de fàn",
        translation: "thanks for the meal you cooked",
        translationFr: "merci pour le repas que tu as préparé"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 谢谢你做的饭 »",
      choices: ["merci pour le repas que tu as préparé", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-a4c566f8",
    level: "hsk1",
    hanzi: "过",
    pinyin: "guò",
    translation: "past experience particle",
    translationFr: "particule d'expérience passée",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "过",
        pinyin: "guò",
        translation: "past experience particle",
        translationFr: "particule d'expérience passée"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 过 »",
      choices: ["particule d'expérience passée", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "base"
  },
  {
    id: "supp-03b6d7d1",
    level: "hsk3",
    hanzi: "麻烦你",
    pinyin: "máfan nǐ",
    translation: "sorry to bother you",
    translationFr: "désolé de te déranger",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "麻烦你",
        pinyin: "máfan nǐ",
        translation: "sorry to bother you",
        translationFr: "désolé de te déranger"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 麻烦你 »",
      choices: ["désolé de te déranger", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-ac007746",
    level: "hsk2",
    hanzi: "第",
    pinyin: "dì",
    translation: "ordinal prefix",
    translationFr: "préfixe ordinal",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "第",
        pinyin: "dì",
        translation: "ordinal prefix",
        translationFr: "préfixe ordinal"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 第 »",
      choices: ["préfixe ordinal", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "nombres"
  },
  {
    id: "supp-887d0fb9",
    level: "hsk3",
    hanzi: "一点",
    pinyin: "yīdiǎn",
    translation: "a little",
    translationFr: "un peu",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "一点",
        pinyin: "yīdiǎn",
        translation: "a little",
        translationFr: "un peu"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 一点 »",
      choices: ["un peu", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-61b05099",
    level: "hsk3",
    hanzi: "一百",
    pinyin: "yī bǎi",
    translation: "one hundred",
    translationFr: "cent",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "一百",
        pinyin: "yī bǎi",
        translation: "one hundred",
        translationFr: "cent"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 一百 »",
      choices: ["cent", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-889a3d94",
    level: "hsk3",
    hanzi: "一百零五",
    pinyin: "yī bǎi líng wǔ",
    translation: "one hundred and five",
    translationFr: "cent cinq",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "一百零五",
        pinyin: "yī bǎi líng wǔ",
        translation: "one hundred and five",
        translationFr: "cent cinq"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 一百零五 »",
      choices: ["cent cinq", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-74968da4",
    level: "hsk3",
    hanzi: "三十",
    pinyin: "sānshí",
    translation: "thirty",
    translationFr: "trente",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "三十",
        pinyin: "sānshí",
        translation: "thirty",
        translationFr: "trente"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 三十 »",
      choices: ["trente", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-79abd4ee",
    level: "hsk3",
    hanzi: "上周",
    pinyin: "shàngzhōu",
    translation: "last week",
    translationFr: "la semaine dernière",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "上周",
        pinyin: "shàngzhōu",
        translation: "last week",
        translationFr: "la semaine dernière"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 上周 »",
      choices: ["la semaine dernière", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-354129a5",
    level: "hsk3",
    hanzi: "不好吃",
    pinyin: "bù hǎochī",
    translation: "not tasty",
    translationFr: "pas bon (au goût)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "不好吃",
        pinyin: "bù hǎochī",
        translation: "not tasty",
        translationFr: "pas bon (au goût)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 不好吃 »",
      choices: ["pas bon (au goût)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-9d1e6f00",
    level: "hsk3",
    hanzi: "两百",
    pinyin: "liǎng bǎi",
    translation: "two hundred",
    translationFr: "deux cents",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "两百",
        pinyin: "liǎng bǎi",
        translation: "two hundred",
        translationFr: "deux cents"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 两百 »",
      choices: ["deux cents", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-39f55a21",
    level: "hsk3",
    hanzi: "二十",
    pinyin: "èrshí",
    translation: "twenty",
    translationFr: "vingt",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "二十",
        pinyin: "èrshí",
        translation: "twenty",
        translationFr: "vingt"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 二十 »",
      choices: ["vingt", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-8adffdaa",
    level: "hsk3",
    hanzi: "五十",
    pinyin: "wǔshí",
    translation: "fifty",
    translationFr: "cinquante",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "五十",
        pinyin: "wǔshí",
        translation: "fifty",
        translationFr: "cinquante"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 五十 »",
      choices: ["cinquante", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-b24186f7",
    level: "hsk3",
    hanzi: "公共汽车",
    pinyin: "gōnggòng qìchē",
    translation: "bus",
    translationFr: "bus",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "公共汽车",
        pinyin: "gōnggòng qìchē",
        translation: "bus",
        translationFr: "bus"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 公共汽车 »",
      choices: ["bus", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-367c9508",
    level: "hsk1",
    hanzi: "喂",
    pinyin: "wèi",
    translation: "hello (phone) / hey",
    translationFr: "allô ; hé !",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "喂",
        pinyin: "wèi",
        translation: "hello (phone) / hey",
        translationFr: "allô ; hé !"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 喂 »",
      choices: ["allô ; hé !", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "base"
  },
  {
    id: "supp-69a77dae",
    level: "hsk3",
    hanzi: "在哪儿",
    pinyin: "zài nǎr",
    translation: "where",
    translationFr: "où",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "在哪儿",
        pinyin: "zài nǎr",
        translation: "where",
        translationFr: "où"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 在哪儿 »",
      choices: ["où", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-57af3610",
    level: "hsk3",
    hanzi: "多少钱",
    pinyin: "duōshǎo qián",
    translation: "how much does it cost",
    translationFr: "combien ça coûte",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "多少钱",
        pinyin: "duōshǎo qián",
        translation: "how much does it cost",
        translationFr: "combien ça coûte"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 多少钱 »",
      choices: ["combien ça coûte", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-ef4605f8",
    level: "hsk3",
    hanzi: "头疼",
    pinyin: "tóuténg",
    translation: "headache",
    translationFr: "mal de tête",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "头疼",
        pinyin: "tóuténg",
        translation: "headache",
        translationFr: "mal de tête"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 头疼 »",
      choices: ["mal de tête", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-7eb7d343",
    level: "hsk3",
    hanzi: "怎么走",
    pinyin: "zěnme zǒu",
    translation: "how to get there",
    translationFr: "comment y aller",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "怎么走",
        pinyin: "zěnme zǒu",
        translation: "how to get there",
        translationFr: "comment y aller"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 怎么走 »",
      choices: ["comment y aller", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-8a240c39",
    level: "hsk3",
    hanzi: "我吃了。",
    pinyin: "wǒ chī le.",
    translation: "I ate.",
    translationFr: "J'ai mangé.",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "我吃了。",
        pinyin: "wǒ chī le.",
        translation: "I ate.",
        translationFr: "J'ai mangé."
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 我吃了。 »",
      choices: ["J'ai mangé.", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-05601f16",
    level: "hsk3",
    hanzi: "我吃了吗？",
    pinyin: "wǒ chī le ma?",
    translation: "Have I eaten?",
    translationFr: "Ai-je mangé ?",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "我吃了吗？",
        pinyin: "wǒ chī le ma?",
        translation: "Have I eaten?",
        translationFr: "Ai-je mangé ?"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 我吃了吗？ »",
      choices: ["Ai-je mangé ?", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-cf4d0376",
    level: "hsk3",
    hanzi: "我想…",
    pinyin: "wǒ xiǎng…",
    translation: "I would like…",
    translationFr: "Je voudrais…",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "我想…",
        pinyin: "wǒ xiǎng…",
        translation: "I would like…",
        translationFr: "Je voudrais…"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 我想… »",
      choices: ["Je voudrais…", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-92181a3f",
    level: "hsk3",
    hanzi: "我看了电影。",
    pinyin: "wǒ kàn le diànyǐng.",
    translation: "I watched a movie.",
    translationFr: "J'ai regardé un film.",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "我看了电影。",
        pinyin: "wǒ kàn le diànyǐng.",
        translation: "I watched a movie.",
        translationFr: "J'ai regardé un film."
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 我看了电影。 »",
      choices: ["J'ai regardé un film.", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-eaf34be3",
    level: "hsk3",
    hanzi: "我还没吃。",
    pinyin: "wǒ hái méi chī.",
    translation: "I haven't eaten yet.",
    translationFr: "Je n'ai pas encore mangé.",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "我还没吃。",
        pinyin: "wǒ hái méi chī.",
        translation: "I haven't eaten yet.",
        translationFr: "Je n'ai pas encore mangé."
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 我还没吃。 »",
      choices: ["Je n'ai pas encore mangé.", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-cef3bb04",
    level: "hsk1",
    hanzi: "才",
    pinyin: "cái",
    translation: "only / just",
    translationFr: "seulement ; viens juste de",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "才",
        pinyin: "cái",
        translation: "only / just",
        translationFr: "seulement ; viens juste de"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 才 »",
      choices: ["seulement ; viens juste de", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "base"
  },
  {
    id: "supp-3f08d9a5",
    level: "hsk3",
    hanzi: "故宫",
    pinyin: "gùgōng",
    translation: "the Forbidden City",
    translationFr: "la Cité Interdite",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "故宫",
        pinyin: "gùgōng",
        translation: "the Forbidden City",
        translationFr: "la Cité Interdite"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 故宫 »",
      choices: ["la Cité Interdite", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-4dbed2e6",
    level: "hsk3",
    hanzi: "日本",
    pinyin: "rìběn",
    translation: "Japan",
    translationFr: "Japon",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "日本",
        pinyin: "rìběn",
        translation: "Japan",
        translationFr: "Japon"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 日本 »",
      choices: ["Japon", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-489714ec",
    level: "hsk3",
    hanzi: "来一个…",
    pinyin: "lái yī gè…",
    translation: "give me a… (ordering)",
    translationFr: "donne-moi un… (commande)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "来一个…",
        pinyin: "lái yī gè…",
        translation: "give me a… (ordering)",
        translationFr: "donne-moi un… (commande)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 来一个… »",
      choices: ["donne-moi un… (commande)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-f5818fdf",
    level: "hsk3",
    hanzi: "法国",
    pinyin: "fǎguó",
    translation: "France",
    translationFr: "France",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "法国",
        pinyin: "fǎguó",
        translation: "France",
        translationFr: "France"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 法国 »",
      choices: ["France", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-1efc9783",
    level: "hsk3",
    hanzi: "美国",
    pinyin: "měiguó",
    translation: "United States",
    translationFr: "États-Unis",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "美国",
        pinyin: "měiguó",
        translation: "United States",
        translationFr: "États-Unis"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 美国 »",
      choices: ["États-Unis", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-a6bb21be",
    level: "hsk3",
    hanzi: "英国",
    pinyin: "yīngguó",
    translation: "United Kingdom",
    translationFr: "Royaume-Uni",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "英国",
        pinyin: "yīngguó",
        translation: "United Kingdom",
        translationFr: "Royaume-Uni"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 英国 »",
      choices: ["Royaume-Uni", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-f7d9d3ca",
    level: "hsk3",
    hanzi: "记住",
    pinyin: "jìzhù",
    translation: "remember / memorize",
    translationFr: "retenir, mémoriser",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "记住",
        pinyin: "jìzhù",
        translation: "remember / memorize",
        translationFr: "retenir, mémoriser"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 记住 »",
      choices: ["retenir, mémoriser", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-4719abeb",
    level: "hsk3",
    hanzi: "请问，厕所在哪儿？",
    pinyin: "qǐngwèn, cèsuǒ zài nǎr?",
    translation: "Excuse me, where is the toilet?",
    translationFr: "Excusez-moi, où sont les toilettes ?",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "请问，厕所在哪儿？",
        pinyin: "qǐngwèn, cèsuǒ zài nǎr?",
        translation: "Excuse me, where is the toilet?",
        translationFr: "Excusez-moi, où sont les toilettes ?"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 请问，厕所在哪儿？ »",
      choices: ["Excusez-moi, où sont les toilettes ?", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-ad2b0938",
    level: "hsk3",
    hanzi: "还没",
    pinyin: "hái méi",
    translation: "not yet",
    translationFr: "pas encore",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "还没",
        pinyin: "hái méi",
        translation: "not yet",
        translationFr: "pas encore"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 还没 »",
      choices: ["pas encore", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-3e90dfa4",
    level: "hsk3",
    hanzi: "退房",
    pinyin: "tuìfáng",
    translation: "check-out (hotel)",
    translationFr: "quitter la chambre (hôtel)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "退房",
        pinyin: "tuìfáng",
        translation: "check-out (hotel)",
        translationFr: "quitter la chambre (hôtel)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 退房 »",
      choices: ["quitter la chambre (hôtel)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-092acb9c",
    level: "hsk1",
    hanzi: "长",
    pinyin: "cháng",
    translation: "long",
    translationFr: "long",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "长",
        pinyin: "cháng",
        translation: "long",
        translationFr: "long"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 长 »",
      choices: ["long", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "base"
  },
  {
    id: "supp-592c5cd9",
    level: "hsk3",
    hanzi: "长城",
    pinyin: "chángchéng",
    translation: "the Great Wall",
    translationFr: "la Grande Muraille",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "长城",
        pinyin: "chángchéng",
        translation: "the Great Wall",
        translationFr: "la Grande Muraille"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 长城 »",
      choices: ["la Grande Muraille", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-09540e05",
    level: "hsk3",
    hanzi: "韩国",
    pinyin: "hánguó",
    translation: "South Korea",
    translationFr: "Corée du Sud",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "韩国",
        pinyin: "hánguó",
        translation: "South Korea",
        translationFr: "Corée du Sud"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 韩国 »",
      choices: ["Corée du Sud", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-38e97053",
    level: "hsk4",
    hanzi: "00后",
    pinyin: "líng líng hòu",
    translation: "post-00s generation",
    translationFr: "génération née après 2000",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "00后",
        pinyin: "líng líng hòu",
        translation: "post-00s generation",
        translationFr: "génération née après 2000"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 00后 »",
      choices: ["génération née après 2000", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-eb17bf55",
    level: "hsk4",
    hanzi: "211",
    pinyin: "èr yāo yāo",
    translation: "Project 211 (key universities)",
    translationFr: "211 (projet universitaire)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "211",
        pinyin: "èr yāo yāo",
        translation: "Project 211 (key universities)",
        translationFr: "211 (projet universitaire)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 211 »",
      choices: ["211 (projet universitaire)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-1be982b3",
    level: "hsk5",
    hanzi: "5G网络",
    pinyin: "wǔ G wǎngluò",
    translation: "5G network",
    translationFr: "réseau 5G",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "5G网络",
        pinyin: "wǔ G wǎngluò",
        translation: "5G network",
        translationFr: "réseau 5G"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 5G网络 »",
      choices: ["réseau 5G", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-28705dfb",
    level: "hsk4",
    hanzi: "80后",
    pinyin: "bā líng hòu",
    translation: "post-80s generation",
    translationFr: "génération née dans les années 80",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "80后",
        pinyin: "bā líng hòu",
        translation: "post-80s generation",
        translationFr: "génération née dans les années 80"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 80后 »",
      choices: ["génération née dans les années 80", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-3bef51f2",
    level: "hsk4",
    hanzi: "90后",
    pinyin: "jiǔ líng hòu",
    translation: "post-90s generation",
    translationFr: "génération née dans les années 90",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "90后",
        pinyin: "jiǔ líng hòu",
        translation: "post-90s generation",
        translationFr: "génération née dans les années 90"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 90后 »",
      choices: ["génération née dans les années 90", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-b0f460ab",
    level: "hsk4",
    hanzi: "985",
    pinyin: "jiǔ bā wǔ",
    translation: "Project 985 (elite universities)",
    translationFr: "985 (universités élites)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "985",
        pinyin: "jiǔ bā wǔ",
        translation: "Project 985 (elite universities)",
        translationFr: "985 (universités élites)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 985 »",
      choices: ["985 (universités élites)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-5c9b9ae6",
    level: "hsk4",
    hanzi: "996",
    pinyin: "jiǔ jiǔ liù",
    translation: "996 work schedule (9-9, 6 days/week)",
    translationFr: "horaire 9h-21h, 6j/7",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "996",
        pinyin: "jiǔ jiǔ liù",
        translation: "996 work schedule (9-9, 6 days/week)",
        translationFr: "horaire 9h-21h, 6j/7"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 996 »",
      choices: ["horaire 9h-21h, 6j/7", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-2d44e744",
    level: "hsk3",
    hanzi: "ma",
    pinyin: "ma",
    translation: "unmarked 'ma' syllable",
    translationFr: "syllabe 'ma' sans ton",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "ma",
        pinyin: "ma",
        translation: "unmarked 'ma' syllable",
        translationFr: "syllabe 'ma' sans ton"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « ma »",
      choices: ["syllabe 'ma' sans ton", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-52e2e7c1",
    level: "hsk3",
    hanzi: "mà",
    pinyin: "mà",
    translation: "ma tone 4: scold",
    translationFr: "ma ton 4 : gronder",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "mà",
        pinyin: "mà",
        translation: "ma tone 4: scold",
        translationFr: "ma ton 4 : gronder"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « mà »",
      choices: ["ma ton 4 : gronder", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-b5818b99",
    level: "hsk3",
    hanzi: "má",
    pinyin: "má",
    translation: "ma tone 2: hemp",
    translationFr: "ma ton 2 : chanvre",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "má",
        pinyin: "má",
        translation: "ma tone 2: hemp",
        translationFr: "ma ton 2 : chanvre"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « má »",
      choices: ["ma ton 2 : chanvre", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-6249c41f",
    level: "hsk3",
    hanzi: "mā",
    pinyin: "mā",
    translation: "ma tone 1: mother",
    translationFr: "ma ton 1 : maman",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "mā",
        pinyin: "mā",
        translation: "ma tone 1: mother",
        translationFr: "ma ton 1 : maman"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « mā »",
      choices: ["ma ton 1 : maman", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-f03812fc",
    level: "hsk3",
    hanzi: "mǎ",
    pinyin: "mǎ",
    translation: "ma tone 3: horse",
    translationFr: "ma ton 3 : cheval",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "mǎ",
        pinyin: "mǎ",
        translation: "ma tone 3: horse",
        translationFr: "ma ton 3 : cheval"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « mǎ »",
      choices: ["ma ton 3 : cheval", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-e64a1ab6",
    level: "hsk3",
    hanzi: "一个",
    pinyin: "yí gè",
    translation: "one (general measure word)",
    translationFr: "un (classificateur général)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "一个",
        pinyin: "yí gè",
        translation: "one (general measure word)",
        translationFr: "un (classificateur général)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 一个 »",
      choices: ["un (classificateur général)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-4d5458f9",
    level: "hsk3",
    hanzi: "一千",
    pinyin: "yì qiān",
    translation: "one thousand",
    translationFr: "mille",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "一千",
        pinyin: "yì qiān",
        translation: "one thousand",
        translationFr: "mille"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 一千 »",
      choices: ["mille", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-2523bddb",
    level: "hsk4",
    hanzi: "一句话",
    pinyin: "yí jù huà",
    translation: "one sentence",
    translationFr: "une phrase",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "一句话",
        pinyin: "yí jù huà",
        translation: "one sentence",
        translationFr: "une phrase"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 一句话 »",
      choices: ["une phrase", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-15263e54",
    level: "hsk5",
    hanzi: "一带一路",
    pinyin: "yí dài yí lù",
    translation: "Belt and Road Initiative",
    translationFr: "Nouvelles Routes de la Soie",
    category: "idiom",
    examples: [
      {
        hanzi: "一带一路",
        pinyin: "yí dài yí lù",
        translation: "Belt and Road Initiative",
        translationFr: "Nouvelles Routes de la Soie"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 一带一路 »",
      choices: ["Nouvelles Routes de la Soie", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-eeab9f6b",
    level: "hsk3",
    hanzi: "一月",
    pinyin: "yī yuè",
    translation: "January",
    translationFr: "janvier",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "一月",
        pinyin: "yī yuè",
        translation: "January",
        translationFr: "janvier"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 一月 »",
      choices: ["janvier", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-8c265359",
    level: "hsk4",
    hanzi: "一本书",
    pinyin: "yì běn shū",
    translation: "one book",
    translationFr: "un livre",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "一本书",
        pinyin: "yì běn shū",
        translation: "one book",
        translationFr: "un livre"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 一本书 »",
      choices: ["un livre", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-64bfc36a",
    level: "hsk3",
    hanzi: "一杯",
    pinyin: "yì bēi",
    translation: "one cup / glass",
    translationFr: "une tasse / un verre",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "一杯",
        pinyin: "yì bēi",
        translation: "one cup / glass",
        translationFr: "une tasse / un verre"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 一杯 »",
      choices: ["une tasse / un verre", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-a8389ea0",
    level: "hsk4",
    hanzi: "一直走",
    pinyin: "yìzhí zǒu",
    translation: "go straight",
    translationFr: "aller tout droit",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "一直走",
        pinyin: "yìzhí zǒu",
        translation: "go straight",
        translationFr: "aller tout droit"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 一直走 »",
      choices: ["aller tout droit", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-8d7cb183",
    level: "hsk3",
    hanzi: "一眼",
    pinyin: "yì yǎn",
    translation: "a glance",
    translationFr: "un coup d'œil",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "一眼",
        pinyin: "yì yǎn",
        translation: "a glance",
        translationFr: "un coup d'œil"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 一眼 »",
      choices: ["un coup d'œil", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-73a5c78b",
    level: "hsk3",
    hanzi: "一碗",
    pinyin: "yì wǎn",
    translation: "one bowl",
    translationFr: "un bol",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "一碗",
        pinyin: "yì wǎn",
        translation: "one bowl",
        translationFr: "un bol"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 一碗 »",
      choices: ["un bol", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-7cb968e3",
    level: "hsk5",
    hanzi: "一般来说",
    pinyin: "yìbān lái shuō",
    translation: "generally speaking",
    translationFr: "en général",
    category: "idiom",
    examples: [
      {
        hanzi: "一般来说",
        pinyin: "yìbān lái shuō",
        translation: "generally speaking",
        translationFr: "en général"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 一般来说 »",
      choices: ["en général", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-797936ea",
    level: "hsk5",
    hanzi: "万事如意",
    pinyin: "wàn shì rú yì",
    translation: "may all go as you wish",
    translationFr: "que tout se passe selon tes souhaits",
    category: "idiom",
    examples: [
      {
        hanzi: "万事如意",
        pinyin: "wàn shì rú yì",
        translation: "may all go as you wish",
        translationFr: "que tout se passe selon tes souhaits"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 万事如意 »",
      choices: ["que tout se passe selon tes souhaits", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-f29ed59f",
    level: "hsk3",
    hanzi: "三体",
    pinyin: "sān tǐ",
    translation: "The Three-Body Problem",
    translationFr: "Le Problème à trois corps",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "三体",
        pinyin: "sān tǐ",
        translation: "The Three-Body Problem",
        translationFr: "Le Problème à trois corps"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 三体 »",
      choices: ["Le Problème à trois corps", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-7138b6d7",
    level: "hsk3",
    hanzi: "三孩",
    pinyin: "sān hái",
    translation: "three-child policy",
    translationFr: "politique des trois enfants",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "三孩",
        pinyin: "sān hái",
        translation: "three-child policy",
        translationFr: "politique des trois enfants"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 三孩 »",
      choices: ["politique des trois enfants", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-9d328761",
    level: "hsk5",
    hanzi: "三顾茅庐",
    pinyin: "sān gù máo lú",
    translation: "three visits to the thatched cottage",
    translationFr: "solliciter avec persévérance (3 visites à Zhuge Liang)",
    category: "idiom",
    examples: [
      {
        hanzi: "三顾茅庐",
        pinyin: "sān gù máo lú",
        translation: "three visits to the thatched cottage",
        translationFr: "solliciter avec persévérance (3 visites à Zhuge Liang)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 三顾茅庐 »",
      choices: ["solliciter avec persévérance (3 visites à Zhuge Liang)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-6f86a938",
    level: "hsk4",
    hanzi: "上海话",
    pinyin: "Shànghǎi huà",
    translation: "Shanghainese",
    translationFr: "shanghaïen",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "上海话",
        pinyin: "Shànghǎi huà",
        translation: "Shanghainese",
        translationFr: "shanghaïen"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 上海话 »",
      choices: ["shanghaïen", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-8b2fafcb",
    level: "hsk4",
    hanzi: "下雨了",
    pinyin: "xià yǔ le",
    translation: "it started to rain",
    translationFr: "il s'est mis à pleuvoir",
    category: "grammar",
    examples: [
      {
        hanzi: "下雨了",
        pinyin: "xià yǔ le",
        translation: "it started to rain",
        translationFr: "il s'est mis à pleuvoir"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 下雨了 »",
      choices: ["il s'est mis à pleuvoir", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["grammar", "supplement", "cecr-v4"],
    theme: "grammaire"
  },
  {
    id: "supp-v4-3229631f",
    level: "hsk4",
    hanzi: "不一定",
    pinyin: "bù yídìng",
    translation: "not necessarily",
    translationFr: "pas forcément",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "不一定",
        pinyin: "bù yídìng",
        translation: "not necessarily",
        translationFr: "pas forcément"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 不一定 »",
      choices: ["pas forcément", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-dd1fdfeb",
    level: "hsk3",
    hanzi: "不去",
    pinyin: "bú qù",
    translation: "not going",
    translationFr: "ne pas y aller",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "不去",
        pinyin: "bú qù",
        translation: "not going",
        translationFr: "ne pas y aller"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 不去 »",
      choices: ["ne pas y aller", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-28b2205e",
    level: "hsk4",
    hanzi: "不去了",
    pinyin: "bú qù le",
    translation: "not going anymore",
    translationFr: "finalement je n'y vais plus",
    category: "grammar",
    examples: [
      {
        hanzi: "不去了",
        pinyin: "bú qù le",
        translation: "not going anymore",
        translationFr: "finalement je n'y vais plus"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 不去了 »",
      choices: ["finalement je n'y vais plus", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["grammar", "supplement", "cecr-v4"],
    theme: "grammaire"
  },
  {
    id: "supp-v4-b05673d1",
    level: "hsk4",
    hanzi: "不可以",
    pinyin: "bù kěyǐ",
    translation: "not allowed",
    translationFr: "ce n'est pas permis",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "不可以",
        pinyin: "bù kěyǐ",
        translation: "not allowed",
        translationFr: "ce n'est pas permis"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 不可以 »",
      choices: ["ce n'est pas permis", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-f33e0d4b",
    level: "hsk5",
    hanzi: "不可否认",
    pinyin: "bù kě fǒurèn",
    translation: "it cannot be denied",
    translationFr: "on ne peut pas nier",
    category: "idiom",
    examples: [
      {
        hanzi: "不可否认",
        pinyin: "bù kě fǒurèn",
        translation: "it cannot be denied",
        translationFr: "on ne peut pas nier"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 不可否认 »",
      choices: ["on ne peut pas nier", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-4d4f75fb",
    level: "hsk3",
    hanzi: "不吃",
    pinyin: "bù chī",
    translation: "not eat",
    translationFr: "ne pas manger",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "不吃",
        pinyin: "bù chī",
        translation: "not eat",
        translationFr: "ne pas manger"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 不吃 »",
      choices: ["ne pas manger", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-522e1731",
    level: "hsk4",
    hanzi: "不同意",
    pinyin: "bù tóngyì",
    translation: "disagree",
    translationFr: "ne pas être d'accord",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "不同意",
        pinyin: "bù tóngyì",
        translation: "disagree",
        translationFr: "ne pas être d'accord"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 不同意 »",
      choices: ["ne pas être d'accord", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-9b2fefd8",
    level: "hsk3",
    hanzi: "不好",
    pinyin: "bù hǎo",
    translation: "not good",
    translationFr: "pas bien",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "不好",
        pinyin: "bù hǎo",
        translation: "not good",
        translationFr: "pas bien"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 不好 »",
      choices: ["pas bien", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-0b768196",
    level: "hsk3",
    hanzi: "不对",
    pinyin: "bú duì",
    translation: "incorrect",
    translationFr: "pas juste",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "不对",
        pinyin: "bú duì",
        translation: "incorrect",
        translationFr: "pas juste"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 不对 »",
      choices: ["pas juste", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-1fc3b135",
    level: "hsk3",
    hanzi: "不想",
    pinyin: "bù xiǎng",
    translation: "not want to",
    translationFr: "ne pas vouloir",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "不想",
        pinyin: "bù xiǎng",
        translation: "not want to",
        translationFr: "ne pas vouloir"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 不想 »",
      choices: ["ne pas vouloir", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-6b85bf8a",
    level: "hsk3",
    hanzi: "不是",
    pinyin: "bú shì",
    translation: "is not",
    translationFr: "ne pas être",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "不是",
        pinyin: "bú shì",
        translation: "is not",
        translationFr: "ne pas être"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 不是 »",
      choices: ["ne pas être", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-817e81ba",
    level: "hsk3",
    hanzi: "不比",
    pinyin: "bù bǐ",
    translation: "not as... as",
    translationFr: "pas comparable à",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "不比",
        pinyin: "bù bǐ",
        translation: "not as... as",
        translationFr: "pas comparable à"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 不比 »",
      choices: ["pas comparable à", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-76dd4c62",
    level: "hsk5",
    hanzi: "不用找了",
    pinyin: "bú yòng zhǎo le",
    translation: "keep the change",
    translationFr: "gardez la monnaie",
    category: "idiom",
    examples: [
      {
        hanzi: "不用找了",
        pinyin: "bú yòng zhǎo le",
        translation: "keep the change",
        translationFr: "gardez la monnaie"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 不用找了 »",
      choices: ["gardez la monnaie", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-0677d3fe",
    level: "hsk4",
    hanzi: "不知道",
    pinyin: "bù zhīdào",
    translation: "don't know",
    translationFr: "ne pas savoir",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "不知道",
        pinyin: "bù zhīdào",
        translation: "don't know",
        translationFr: "ne pas savoir"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 不知道 »",
      choices: ["ne pas savoir", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-46f66a9e",
    level: "hsk4",
    hanzi: "不认识",
    pinyin: "bú rènshi",
    translation: "don't know (someone)",
    translationFr: "ne pas connaître",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "不认识",
        pinyin: "bú rènshi",
        translation: "don't know (someone)",
        translationFr: "ne pas connaître"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 不认识 »",
      choices: ["ne pas connaître", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-f8e6fde1",
    level: "hsk4",
    hanzi: "东南亚",
    pinyin: "Dōngnányà",
    translation: "Southeast Asia",
    translationFr: "Asie du Sud-Est",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "东南亚",
        pinyin: "Dōngnányà",
        translation: "Southeast Asia",
        translationFr: "Asie du Sud-Est"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 东南亚 »",
      choices: ["Asie du Sud-Est", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-500db8e6",
    level: "hsk5",
    hanzi: "丝绸之路",
    pinyin: "sīchóu zhī lù",
    translation: "Silk Road",
    translationFr: "Route de la Soie",
    category: "idiom",
    examples: [
      {
        hanzi: "丝绸之路",
        pinyin: "sīchóu zhī lù",
        translation: "Silk Road",
        translationFr: "Route de la Soie"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 丝绸之路 »",
      choices: ["Route de la Soie", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-cc7ff6d0",
    level: "hsk3",
    hanzi: "丢了",
    pinyin: "diū le",
    translation: "lost",
    translationFr: "perdu",
    category: "grammar",
    examples: [
      {
        hanzi: "丢了",
        pinyin: "diū le",
        translation: "lost",
        translationFr: "perdu"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 丢了 »",
      choices: ["perdu", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["grammar", "supplement", "cecr-v4"],
    theme: "grammaire"
  },
  {
    id: "supp-v4-5c2f1155",
    level: "hsk4",
    hanzi: "丢面子",
    pinyin: "diū miànzi",
    translation: "lose face",
    translationFr: "perdre la face",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "丢面子",
        pinyin: "diū miànzi",
        translation: "lose face",
        translationFr: "perdre la face"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 丢面子 »",
      choices: ["perdre la face", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-a7d84e93",
    level: "hsk3",
    hanzi: "两个",
    pinyin: "liǎng gè",
    translation: "two (of)",
    translationFr: "deux (unités)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "两个",
        pinyin: "liǎng gè",
        translation: "two (of)",
        translationFr: "deux (unités)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 两个 »",
      choices: ["deux (unités)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-c0e24bbf",
    level: "hsk3",
    hanzi: "两会",
    pinyin: "liǎng huì",
    translation: "Two Sessions (NPC + CPPCC)",
    translationFr: "les Deux Sessions (APN + CCPPC)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "两会",
        pinyin: "liǎng huì",
        translation: "Two Sessions (NPC + CPPCC)",
        translationFr: "les Deux Sessions (APN + CCPPC)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 两会 »",
      choices: ["les Deux Sessions (APN + CCPPC)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-f6797f96",
    level: "hsk3",
    hanzi: "严复",
    pinyin: "Yán Fù",
    translation: "Yan Fu (thinker, translator)",
    translationFr: "Yan Fu (penseur, traducteur, 1854-1921)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "严复",
        pinyin: "Yán Fù",
        translation: "Yan Fu (thinker, translator)",
        translationFr: "Yan Fu (penseur, traducteur, 1854-1921)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 严复 »",
      choices: ["Yan Fu (penseur, traducteur, 1854-1921)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-4b9d603d",
    level: "hsk5",
    hanzi: "个人信息",
    pinyin: "gèrén xìnxī",
    translation: "personal information",
    translationFr: "informations personnelles",
    category: "idiom",
    examples: [
      {
        hanzi: "个人信息",
        pinyin: "gèrén xìnxī",
        translation: "personal information",
        translationFr: "informations personnelles"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 个人信息 »",
      choices: ["informations personnelles", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-9cab2673",
    level: "hsk3",
    hanzi: "中号",
    pinyin: "zhōng hào",
    translation: "medium size",
    translationFr: "taille M",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "中号",
        pinyin: "zhōng hào",
        translation: "medium size",
        translationFr: "taille M"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 中号 »",
      choices: ["taille M", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-bfef6247",
    level: "hsk4",
    hanzi: "中国人",
    pinyin: "Zhōngguó rén",
    translation: "Chinese person",
    translationFr: "Chinois",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "中国人",
        pinyin: "Zhōngguó rén",
        translation: "Chinese person",
        translationFr: "Chinois"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 中国人 »",
      choices: ["Chinois", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-e1f82db2",
    level: "hsk4",
    hanzi: "中国梦",
    pinyin: "Zhōngguó mèng",
    translation: "Chinese Dream",
    translationFr: "rêve chinois",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "中国梦",
        pinyin: "Zhōngguó mèng",
        translation: "Chinese Dream",
        translationFr: "rêve chinois"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 中国梦 »",
      choices: ["rêve chinois", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-fcc3a4e7",
    level: "hsk3",
    hanzi: "中方",
    pinyin: "Zhōngfāng",
    translation: "Chinese side",
    translationFr: "partie chinoise",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "中方",
        pinyin: "Zhōngfāng",
        translation: "Chinese side",
        translationFr: "partie chinoise"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 中方 »",
      choices: ["partie chinoise", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-828a75fd",
    level: "hsk5",
    hanzi: "中秋快乐",
    pinyin: "Zhōngqiū kuàilè",
    translation: "Happy Mid-Autumn Festival",
    translationFr: "joyeuse fête de la Mi-Automne",
    category: "idiom",
    examples: [
      {
        hanzi: "中秋快乐",
        pinyin: "Zhōngqiū kuàilè",
        translation: "Happy Mid-Autumn Festival",
        translationFr: "joyeuse fête de la Mi-Automne"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 中秋快乐 »",
      choices: ["joyeuse fête de la Mi-Automne", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-0c8d2131",
    level: "hsk4",
    hanzi: "中秋节",
    pinyin: "Zhōngqiū jié",
    translation: "Mid-Autumn Festival",
    translationFr: "fête de la Mi-Automne",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "中秋节",
        pinyin: "Zhōngqiū jié",
        translation: "Mid-Autumn Festival",
        translationFr: "fête de la Mi-Automne"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 中秋节 »",
      choices: ["fête de la Mi-Automne", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-4cc5fb40",
    level: "hsk3",
    hanzi: "中考",
    pinyin: "zhōngkǎo",
    translation: "senior high school entrance exam",
    translationFr: "examen d'entrée au lycée",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "中考",
        pinyin: "zhōngkǎo",
        translation: "senior high school entrance exam",
        translationFr: "examen d'entrée au lycée"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 中考 »",
      choices: ["examen d'entrée au lycée", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-1beebeea",
    level: "hsk3",
    hanzi: "中辣",
    pinyin: "zhōng là",
    translation: "medium spicy",
    translationFr: "moyennement pimenté",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "中辣",
        pinyin: "zhōng là",
        translation: "medium spicy",
        translationFr: "moyennement pimenté"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 中辣 »",
      choices: ["moyennement pimenté", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-dc896eaf",
    level: "hsk5",
    hanzi: "义务教育",
    pinyin: "yìwù jiàoyù",
    translation: "compulsory education",
    translationFr: "éducation obligatoire",
    category: "idiom",
    examples: [
      {
        hanzi: "义务教育",
        pinyin: "yìwù jiàoyù",
        translation: "compulsory education",
        translationFr: "éducation obligatoire"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 义务教育 »",
      choices: ["éducation obligatoire", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-bdee46a8",
    level: "hsk3",
    hanzi: "之",
    pinyin: "zhī",
    translation: "classical particle (of, him/her/it)",
    translationFr: "particule classique (de, lui/elle, y)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "之",
        pinyin: "zhī",
        translation: "classical particle (of, him/her/it)",
        translationFr: "particule classique (de, lui/elle, y)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 之 »",
      choices: ["particule classique (de, lui/elle, y)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-5c8a3472",
    level: "hsk4",
    hanzi: "乌龙茶",
    pinyin: "wūlóng chá",
    translation: "oolong tea",
    translationFr: "thé oolong",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "乌龙茶",
        pinyin: "wūlóng chá",
        translation: "oolong tea",
        translationFr: "thé oolong"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 乌龙茶 »",
      choices: ["thé oolong", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-f299cd0c",
    level: "hsk3",
    hanzi: "乎",
    pinyin: "hū",
    translation: "classical particle (at, of, question)",
    translationFr: "particule classique (à, de, interrogatif)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "乎",
        pinyin: "hū",
        translation: "classical particle (at, of, question)",
        translationFr: "particule classique (à, de, interrogatif)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 乎 »",
      choices: ["particule classique (à, de, interrogatif)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-604238b8",
    level: "hsk4",
    hanzi: "九十九",
    pinyin: "jiǔshíjiǔ",
    translation: "ninety-nine",
    translationFr: "quatre-vingt-dix-neuf",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "九十九",
        pinyin: "jiǔshíjiǔ",
        translation: "ninety-nine",
        translationFr: "quatre-vingt-dix-neuf"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 九十九 »",
      choices: ["quatre-vingt-dix-neuf", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-0a490105",
    level: "hsk3",
    hanzi: "买了",
    pinyin: "mǎi le",
    translation: "bought",
    translationFr: "acheté",
    category: "grammar",
    examples: [
      {
        hanzi: "买了",
        pinyin: "mǎi le",
        translation: "bought",
        translationFr: "acheté"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 买了 »",
      choices: ["acheté", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["grammar", "supplement", "cecr-v4"],
    theme: "grammaire"
  },
  {
    id: "supp-v4-54363821",
    level: "hsk3",
    hanzi: "买的",
    pinyin: "mǎi de",
    translation: "(what was) bought",
    translationFr: "(ce qui est) acheté",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "买的",
        pinyin: "mǎi de",
        translation: "(what was) bought",
        translationFr: "(ce qui est) acheté"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 买的 »",
      choices: ["(ce qui est) acheté", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-1b82d4d1",
    level: "hsk3",
    hanzi: "二月",
    pinyin: "èr yuè",
    translation: "February",
    translationFr: "février",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "二月",
        pinyin: "èr yuè",
        translation: "February",
        translationFr: "février"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 二月 »",
      choices: ["février", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-a87ac4aa",
    level: "hsk4",
    hanzi: "二等座",
    pinyin: "èr děng zuò",
    translation: "second class seat",
    translationFr: "deuxième classe (train)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "二等座",
        pinyin: "èr děng zuò",
        translation: "second class seat",
        translationFr: "deuxième classe (train)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 二等座 »",
      choices: ["deuxième classe (train)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-24991469",
    level: "hsk5",
    hanzi: "五四运动",
    pinyin: "Wǔ Sì yùndòng",
    translation: "May Fourth Movement",
    translationFr: "Mouvement du 4 mai (1919)",
    category: "idiom",
    examples: [
      {
        hanzi: "五四运动",
        pinyin: "Wǔ Sì yùndòng",
        translation: "May Fourth Movement",
        translationFr: "Mouvement du 4 mai (1919)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 五四运动 »",
      choices: ["Mouvement du 4 mai (1919)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-bd3a1aa4",
    level: "hsk3",
    hanzi: "五百",
    pinyin: "wǔ bǎi",
    translation: "five hundred",
    translationFr: "cinq cents",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "五百",
        pinyin: "wǔ bǎi",
        translation: "five hundred",
        translationFr: "cinq cents"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 五百 »",
      choices: ["cinq cents", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-c7afd040",
    level: "hsk4",
    hanzi: "亚健康",
    pinyin: "yà jiànkāng",
    translation: "sub-health",
    translationFr: "santé sub-optimale",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "亚健康",
        pinyin: "yà jiànkāng",
        translation: "sub-health",
        translationFr: "santé sub-optimale"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 亚健康 »",
      choices: ["santé sub-optimale", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-054fc1f9",
    level: "hsk3",
    hanzi: "京东",
    pinyin: "Jīngdōng",
    translation: "JD.com",
    translationFr: "JD.com (e-commerce)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "京东",
        pinyin: "Jīngdōng",
        translation: "JD.com",
        translationFr: "JD.com (e-commerce)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 京东 »",
      choices: ["JD.com (e-commerce)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-b0984577",
    level: "hsk5",
    hanzi: "人民日报",
    pinyin: "Rénmín Rìbào",
    translation: "People's Daily",
    translationFr: "Quotidien du Peuple",
    category: "idiom",
    examples: [
      {
        hanzi: "人民日报",
        pinyin: "Rénmín Rìbào",
        translation: "People's Daily",
        translationFr: "Quotidien du Peuple"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 人民日报 »",
      choices: ["Quotidien du Peuple", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-559faf5c",
    level: "hsk5",
    hanzi: "人脸识别",
    pinyin: "rénliǎn shíbié",
    translation: "facial recognition",
    translationFr: "reconnaissance faciale",
    category: "idiom",
    examples: [
      {
        hanzi: "人脸识别",
        pinyin: "rénliǎn shíbié",
        translation: "facial recognition",
        translationFr: "reconnaissance faciale"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 人脸识别 »",
      choices: ["reconnaissance faciale", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-0168307e",
    level: "hsk5",
    hanzi: "什么时候",
    pinyin: "shénme shíhou",
    translation: "when",
    translationFr: "quand",
    category: "idiom",
    examples: [
      {
        hanzi: "什么时候",
        pinyin: "shénme shíhou",
        translation: "when",
        translationFr: "quand"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 什么时候 »",
      choices: ["quand", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-d0572e26",
    level: "hsk3",
    hanzi: "仄",
    pinyin: "zè",
    translation: "oblique tone (classical poetry)",
    translationFr: "ton oblique (poésie classique)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "仄",
        pinyin: "zè",
        translation: "oblique tone (classical poetry)",
        translationFr: "ton oblique (poésie classique)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 仄 »",
      choices: ["ton oblique (poésie classique)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-fd90836c",
    level: "hsk4",
    hanzi: "从来没",
    pinyin: "cónglái méi",
    translation: "never (past)",
    translationFr: "jamais (n'a)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "从来没",
        pinyin: "cónglái méi",
        translation: "never (past)",
        translationFr: "jamais (n'a)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 从来没 »",
      choices: ["jamais (n'a)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-e281e092",
    level: "hsk3",
    hanzi: "他也",
    pinyin: "tā yě",
    translation: "he too",
    translationFr: "lui aussi",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "他也",
        pinyin: "tā yě",
        translation: "he too",
        translationFr: "lui aussi"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 他也 »",
      choices: ["lui aussi", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-3ab6ec12",
    level: "hsk3",
    hanzi: "他是",
    pinyin: "tā shì",
    translation: "he is",
    translationFr: "il est",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "他是",
        pinyin: "tā shì",
        translation: "he is",
        translationFr: "il est"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 他是 »",
      choices: ["il est", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-aaf84efa",
    level: "hsk3",
    hanzi: "他的",
    pinyin: "tā de",
    translation: "his",
    translationFr: "son, sa (à lui)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "他的",
        pinyin: "tā de",
        translation: "his",
        translationFr: "son, sa (à lui)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 他的 »",
      choices: ["son, sa (à lui)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-87fb9973",
    level: "hsk3",
    hanzi: "付钱",
    pinyin: "fù qián",
    translation: "to pay",
    translationFr: "payer",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "付钱",
        pinyin: "fù qián",
        translation: "to pay",
        translationFr: "payer"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 付钱 »",
      choices: ["payer", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-f6172d2d",
    level: "hsk4",
    hanzi: "企业家",
    pinyin: "qǐyèjiā",
    translation: "entrepreneur",
    translationFr: "entrepreneur",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "企业家",
        pinyin: "qǐyèjiā",
        translation: "entrepreneur",
        translationFr: "entrepreneur"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 企业家 »",
      choices: ["entrepreneur", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-41e41656",
    level: "hsk3",
    hanzi: "会",
    pinyin: "huì",
    translation: "can / will",
    translationFr: "savoir faire / aller (futur)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "会",
        pinyin: "huì",
        translation: "can / will",
        translationFr: "savoir faire / aller (futur)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 会 »",
      choices: ["savoir faire / aller (futur)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-6d7e7fca",
    level: "hsk6",
    hanzi: "会...的",
    pinyin: "huì...de",
    translation: "will... (certainty)",
    translationFr: "va certainement...",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "会...的",
        pinyin: "huì...de",
        translation: "will... (certainty)",
        translationFr: "va certainement..."
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 会...的 »",
      choices: ["va certainement...", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-2ba4bbe5",
    level: "hsk4",
    hanzi: "会下雨",
    pinyin: "huì xià yǔ",
    translation: "it will rain",
    translationFr: "il va pleuvoir",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "会下雨",
        pinyin: "huì xià yǔ",
        translation: "it will rain",
        translationFr: "il va pleuvoir"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 会下雨 »",
      choices: ["il va pleuvoir", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-81912633",
    level: "hsk4",
    hanzi: "会开车",
    pinyin: "huì kāichē",
    translation: "know how to drive",
    translationFr: "savoir conduire",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "会开车",
        pinyin: "huì kāichē",
        translation: "know how to drive",
        translationFr: "savoir conduire"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 会开车 »",
      choices: ["savoir conduire", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-5eb76bad",
    level: "hsk3",
    hanzi: "会来",
    pinyin: "huì lái",
    translation: "will come",
    translationFr: "viendra",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "会来",
        pinyin: "huì lái",
        translation: "will come",
        translationFr: "viendra"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 会来 »",
      choices: ["viendra", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-48141d3b",
    level: "hsk4",
    hanzi: "会游泳",
    pinyin: "huì yóuyǒng",
    translation: "know how to swim",
    translationFr: "savoir nager",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "会游泳",
        pinyin: "huì yóuyǒng",
        translation: "know how to swim",
        translationFr: "savoir nager"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 会游泳 »",
      choices: ["savoir nager", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-30970705",
    level: "hsk4",
    hanzi: "会议室",
    pinyin: "huìyì shì",
    translation: "meeting room",
    translationFr: "salle de réunion",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "会议室",
        pinyin: "huìyì shì",
        translation: "meeting room",
        translationFr: "salle de réunion"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 会议室 »",
      choices: ["salle de réunion", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-5c731f7a",
    level: "hsk3",
    hanzi: "会说",
    pinyin: "huì shuō",
    translation: "can speak",
    translationFr: "savoir parler",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "会说",
        pinyin: "huì shuō",
        translation: "can speak",
        translationFr: "savoir parler"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 会说 »",
      choices: ["savoir parler", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-f98ddbc6",
    level: "hsk5",
    hanzi: "伤痕文学",
    pinyin: "shānghén wénxué",
    translation: "Scar Literature",
    translationFr: "littérature des cicatrices (post-RC)",
    category: "idiom",
    examples: [
      {
        hanzi: "伤痕文学",
        pinyin: "shānghén wénxué",
        translation: "Scar Literature",
        translationFr: "littérature des cicatrices (post-RC)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 伤痕文学 »",
      choices: ["littérature des cicatrices (post-RC)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-0bb4d0ea",
    level: "hsk3",
    hanzi: "住了",
    pinyin: "zhù le",
    translation: "lived / stayed",
    translationFr: "a habité / est logé",
    category: "grammar",
    examples: [
      {
        hanzi: "住了",
        pinyin: "zhù le",
        translation: "lived / stayed",
        translationFr: "a habité / est logé"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 住了 »",
      choices: ["a habité / est logé", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["grammar", "supplement", "cecr-v4"],
    theme: "grammaire"
  },
  {
    id: "supp-v4-78b491fb",
    level: "hsk3",
    hanzi: "余华",
    pinyin: "Yú Huá",
    translation: "Yu Hua (author)",
    translationFr: "Yu Hua (écrivain)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "余华",
        pinyin: "Yú Huá",
        translation: "Yu Hua (author)",
        translationFr: "Yu Hua (écrivain)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 余华 »",
      choices: ["Yu Hua (écrivain)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-98ae44d9",
    level: "hsk3",
    hanzi: "佛系",
    pinyin: "fó xì",
    translation: "Buddhist-style (detached attitude)",
    translationFr: "attitude bouddhiste (désengagée, zen)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "佛系",
        pinyin: "fó xì",
        translation: "Buddhist-style (detached attitude)",
        translationFr: "attitude bouddhiste (désengagée, zen)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 佛系 »",
      choices: ["attitude bouddhiste (désengagée, zen)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-41563e90",
    level: "hsk5",
    hanzi: "你叫什么",
    pinyin: "nǐ jiào shénme",
    translation: "what's your name?",
    translationFr: "tu t'appelles comment ?",
    category: "idiom",
    examples: [
      {
        hanzi: "你叫什么",
        pinyin: "nǐ jiào shénme",
        translation: "what's your name?",
        translationFr: "tu t'appelles comment ?"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 你叫什么 »",
      choices: ["tu t'appelles comment ?", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-3f6e2893",
    level: "hsk3",
    hanzi: "你呢",
    pinyin: "nǐ ne",
    translation: "and you?",
    translationFr: "et toi ?",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "你呢",
        pinyin: "nǐ ne",
        translation: "and you?",
        translationFr: "et toi ?"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 你呢 »",
      choices: ["et toi ?", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-302c5928",
    level: "hsk4",
    hanzi: "你好吗",
    pinyin: "nǐ hǎo ma",
    translation: "how are you?",
    translationFr: "comment vas-tu ?",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "你好吗",
        pinyin: "nǐ hǎo ma",
        translation: "how are you?",
        translationFr: "comment vas-tu ?"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 你好吗 »",
      choices: ["comment vas-tu ?", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-1556c1b7",
    level: "hsk3",
    hanzi: "你是",
    pinyin: "nǐ shì",
    translation: "you are",
    translationFr: "tu es",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "你是",
        pinyin: "nǐ shì",
        translation: "you are",
        translationFr: "tu es"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 你是 »",
      choices: ["tu es", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-9c64b9e7",
    level: "hsk4",
    hanzi: "你是吗",
    pinyin: "nǐ shì ma",
    translation: "is it you?",
    translationFr: "c'est toi ?",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "你是吗",
        pinyin: "nǐ shì ma",
        translation: "is it you?",
        translationFr: "c'est toi ?"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 你是吗 »",
      choices: ["c'est toi ?", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-03db4f3c",
    level: "hsk5",
    hanzi: "你是哪位",
    pinyin: "nǐ shì nǎ wèi",
    translation: "who's speaking?",
    translationFr: "qui est à l'appareil ?",
    category: "idiom",
    examples: [
      {
        hanzi: "你是哪位",
        pinyin: "nǐ shì nǎ wèi",
        translation: "who's speaking?",
        translationFr: "qui est à l'appareil ?"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 你是哪位 »",
      choices: ["qui est à l'appareil ?", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-e6547e3d",
    level: "hsk3",
    hanzi: "你的",
    pinyin: "nǐ de",
    translation: "your",
    translationFr: "ton, ta (à toi)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "你的",
        pinyin: "nǐ de",
        translation: "your",
        translationFr: "ton, ta (à toi)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 你的 »",
      choices: ["ton, ta (à toi)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-4904edf9",
    level: "hsk3",
    hanzi: "侨乡",
    pinyin: "qiáo xiāng",
    translation: "hometown of overseas Chinese",
    translationFr: "région d'émigration chinoise",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "侨乡",
        pinyin: "qiáo xiāng",
        translation: "hometown of overseas Chinese",
        translationFr: "région d'émigration chinoise"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 侨乡 »",
      choices: ["région d'émigration chinoise", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-5544cd9e",
    level: "hsk5",
    hanzi: "便宜点儿",
    pinyin: "piányi diǎnr",
    translation: "a bit cheaper",
    translationFr: "un peu moins cher",
    category: "idiom",
    examples: [
      {
        hanzi: "便宜点儿",
        pinyin: "piányi diǎnr",
        translation: "a bit cheaper",
        translationFr: "un peu moins cher"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 便宜点儿 »",
      choices: ["un peu moins cher", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-fdd64619",
    level: "hsk4",
    hanzi: "信达雅",
    pinyin: "xìn dá yǎ",
    translation: "faithfulness, expressiveness, elegance",
    translationFr: "fidélité, fluidité, élégance (Yan Fu)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "信达雅",
        pinyin: "xìn dá yǎ",
        translation: "faithfulness, expressiveness, elegance",
        translationFr: "fidélité, fluidité, élégance (Yan Fu)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 信达雅 »",
      choices: ["fidélité, fluidité, élégance (Yan Fu)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-7f12ec19",
    level: "hsk4",
    hanzi: "候车厅",
    pinyin: "hòuchē tīng",
    translation: "waiting hall",
    translationFr: "salle d'attente (gare)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "候车厅",
        pinyin: "hòuchē tīng",
        translation: "waiting hall",
        translationFr: "salle d'attente (gare)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 候车厅 »",
      choices: ["salle d'attente (gare)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-e915b194",
    level: "hsk3",
    hanzi: "做好",
    pinyin: "zuò hǎo",
    translation: "do well / finish",
    translationFr: "bien faire / finir",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "做好",
        pinyin: "zuò hǎo",
        translation: "do well / finish",
        translationFr: "bien faire / finir"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 做好 »",
      choices: ["bien faire / finir", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-e02b6e88",
    level: "hsk5",
    hanzi: "儒表法里",
    pinyin: "rú biǎo fǎ lǐ",
    translation: "Confucian on surface, Legalist underneath",
    translationFr: "confucéen en façade, légiste au fond",
    category: "idiom",
    examples: [
      {
        hanzi: "儒表法里",
        pinyin: "rú biǎo fǎ lǐ",
        translation: "Confucian on surface, Legalist underneath",
        translationFr: "confucéen en façade, légiste au fond"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 儒表法里 »",
      choices: ["confucéen en façade, légiste au fond", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-cb06e041",
    level: "hsk3",
    hanzi: "兔",
    pinyin: "tù",
    translation: "rabbit (zodiac)",
    translationFr: "lièvre (zodiaque)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "兔",
        pinyin: "tù",
        translation: "rabbit (zodiac)",
        translationFr: "lièvre (zodiaque)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 兔 »",
      choices: ["lièvre (zodiaque)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-19607217",
    level: "hsk5",
    hanzi: "全球变暖",
    pinyin: "quánqiú biàn nuǎn",
    translation: "global warming",
    translationFr: "réchauffement climatique",
    category: "idiom",
    examples: [
      {
        hanzi: "全球变暖",
        pinyin: "quánqiú biàn nuǎn",
        translation: "global warming",
        translationFr: "réchauffement climatique"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 全球变暖 »",
      choices: ["réchauffement climatique", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-5e44710e",
    level: "hsk5",
    hanzi: "全神贯注",
    pinyin: "quán shén guàn zhù",
    translation: "fully focused",
    translationFr: "entièrement concentré",
    category: "idiom",
    examples: [
      {
        hanzi: "全神贯注",
        pinyin: "quán shén guàn zhù",
        translation: "fully focused",
        translationFr: "entièrement concentré"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 全神贯注 »",
      choices: ["entièrement concentré", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-8e9f3d05",
    level: "hsk5",
    hanzi: "八仙过海",
    pinyin: "bā xiān guò hǎi",
    translation: "Eight Immortals crossing the sea (each with own skill)",
    translationFr: "les huit immortels traversent la mer (chacun son talent)",
    category: "idiom",
    examples: [
      {
        hanzi: "八仙过海",
        pinyin: "bā xiān guò hǎi",
        translation: "Eight Immortals crossing the sea (each with own skill)",
        translationFr: "les huit immortels traversent la mer (chacun son talent)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 八仙过海 »",
      choices: ["les huit immortels traversent la mer (chacun son talent)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-02409b5f",
    level: "hsk3",
    hanzi: "八折",
    pinyin: "bā zhé",
    translation: "20% off (80% of price)",
    translationFr: "-20% (80% du prix)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "八折",
        pinyin: "bā zhé",
        translation: "20% off (80% of price)",
        translationFr: "-20% (80% du prix)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 八折 »",
      choices: ["-20% (80% du prix)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-16c21c4a",
    level: "hsk4",
    hanzi: "公众号",
    pinyin: "gōngzhòng hào",
    translation: "official account (WeChat)",
    translationFr: "compte officiel (WeChat)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "公众号",
        pinyin: "gōngzhòng hào",
        translation: "official account (WeChat)",
        translationFr: "compte officiel (WeChat)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 公众号 »",
      choices: ["compte officiel (WeChat)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-b98bc9e8",
    level: "hsk5",
    hanzi: "共同富裕",
    pinyin: "gòngtóng fùyù",
    translation: "common prosperity",
    translationFr: "prospérité commune",
    category: "idiom",
    examples: [
      {
        hanzi: "共同富裕",
        pinyin: "gòngtóng fùyù",
        translation: "common prosperity",
        translationFr: "prospérité commune"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 共同富裕 »",
      choices: ["prospérité commune", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-e93d05b4",
    level: "hsk4",
    hanzi: "兵马俑",
    pinyin: "bīngmǎ yǒng",
    translation: "Terracotta Army",
    translationFr: "armée de terre cuite",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "兵马俑",
        pinyin: "bīngmǎ yǒng",
        translation: "Terracotta Army",
        translationFr: "armée de terre cuite"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 兵马俑 »",
      choices: ["armée de terre cuite", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-2b2045d3",
    level: "hsk3",
    hanzi: "内卷",
    pinyin: "nèi juǎn",
    translation: "involution (pointless competition)",
    translationFr: "involution (compétition stérile)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "内卷",
        pinyin: "nèi juǎn",
        translation: "involution (pointless competition)",
        translationFr: "involution (compétition stérile)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 内卷 »",
      choices: ["involution (compétition stérile)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-44211ed3",
    level: "hsk3",
    hanzi: "再来",
    pinyin: "zài lái",
    translation: "come again",
    translationFr: "revenir / remettre ça",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "再来",
        pinyin: "zài lái",
        translation: "come again",
        translationFr: "revenir / remettre ça"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 再来 »",
      choices: ["revenir / remettre ça", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-8e81ec19",
    level: "hsk3",
    hanzi: "写完",
    pinyin: "xiě wán",
    translation: "finish writing",
    translationFr: "finir d'écrire",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "写完",
        pinyin: "xiě wán",
        translation: "finish writing",
        translationFr: "finir d'écrire"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 写完 »",
      choices: ["finir d'écrire", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-7903cd80",
    level: "hsk5",
    hanzi: "写得漂亮",
    pinyin: "xiě de piàoliang",
    translation: "written beautifully",
    translationFr: "écrit joliment",
    category: "idiom",
    examples: [
      {
        hanzi: "写得漂亮",
        pinyin: "xiě de piàoliang",
        translation: "written beautifully",
        translationFr: "écrit joliment"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 写得漂亮 »",
      choices: ["écrit joliment", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-af2caa60",
    level: "hsk3",
    hanzi: "净土",
    pinyin: "jìng tǔ",
    translation: "Pure Land (Buddhism)",
    translationFr: "Terre pure (bouddhisme)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "净土",
        pinyin: "jìng tǔ",
        translation: "Pure Land (Buddhism)",
        translationFr: "Terre pure (bouddhisme)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 净土 »",
      choices: ["Terre pure (bouddhisme)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-d756735f",
    level: "hsk4",
    hanzi: "准备好",
    pinyin: "zhǔnbèi hǎo",
    translation: "be ready",
    translationFr: "être prêt",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "准备好",
        pinyin: "zhǔnbèi hǎo",
        translation: "be ready",
        translationFr: "être prêt"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 准备好 »",
      choices: ["être prêt", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-5d3ed727",
    level: "hsk3",
    hanzi: "减排",
    pinyin: "jiǎn pái",
    translation: "reduce emissions",
    translationFr: "réduire les émissions",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "减排",
        pinyin: "jiǎn pái",
        translation: "reduce emissions",
        translationFr: "réduire les émissions"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 减排 »",
      choices: ["réduire les émissions", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-d8f5df22",
    level: "hsk3",
    hanzi: "几本",
    pinyin: "jǐ běn",
    translation: "how many (books)",
    translationFr: "combien (livres)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "几本",
        pinyin: "jǐ běn",
        translation: "how many (books)",
        translationFr: "combien (livres)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 几本 »",
      choices: ["combien (livres)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-9be9633f",
    level: "hsk3",
    hanzi: "几点",
    pinyin: "jǐ diǎn",
    translation: "what time",
    translationFr: "quelle heure",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "几点",
        pinyin: "jǐ diǎn",
        translation: "what time",
        translationFr: "quelle heure"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 几点 »",
      choices: ["quelle heure", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-8e3d06a4",
    level: "hsk4",
    hanzi: "出生率",
    pinyin: "chūshēng lǜ",
    translation: "birth rate",
    translationFr: "taux de natalité",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "出生率",
        pinyin: "chūshēng lǜ",
        translation: "birth rate",
        translationFr: "taux de natalité"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 出生率 »",
      choices: ["taux de natalité", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-59667014",
    level: "hsk5",
    hanzi: "凿壁偷光",
    pinyin: "záo bì tōu guāng",
    translation: "pierce the wall to study",
    translationFr: "percer le mur pour étudier (idiome)",
    category: "idiom",
    examples: [
      {
        hanzi: "凿壁偷光",
        pinyin: "záo bì tōu guāng",
        translation: "pierce the wall to study",
        translationFr: "percer le mur pour étudier (idiome)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 凿壁偷光 »",
      choices: ["percer le mur pour étudier (idiome)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-58645eb6",
    level: "hsk4",
    hanzi: "刘慈欣",
    pinyin: "Liú Cíxīn",
    translation: "Liu Cixin (SF author)",
    translationFr: "Liu Cixin (auteur SF)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "刘慈欣",
        pinyin: "Liú Cíxīn",
        translation: "Liu Cixin (SF author)",
        translationFr: "Liu Cixin (auteur SF)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 刘慈欣 »",
      choices: ["Liu Cixin (auteur SF)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-3e872547",
    level: "hsk3",
    hanzi: "则",
    pinyin: "zé",
    translation: "then (classical)",
    translationFr: "alors, donc (classique)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "则",
        pinyin: "zé",
        translation: "then (classical)",
        translationFr: "alors, donc (classique)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 则 »",
      choices: ["alors, donc (classique)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-03009027",
    level: "hsk3",
    hanzi: "刮风",
    pinyin: "guā fēng",
    translation: "windy",
    translationFr: "le vent souffle",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "刮风",
        pinyin: "guā fēng",
        translation: "windy",
        translationFr: "le vent souffle"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 刮风 »",
      choices: ["le vent souffle", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-d17a99a1",
    level: "hsk3",
    hanzi: "到了",
    pinyin: "dào le",
    translation: "arrived",
    translationFr: "arrivé",
    category: "grammar",
    examples: [
      {
        hanzi: "到了",
        pinyin: "dào le",
        translation: "arrived",
        translationFr: "arrivé"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 到了 »",
      choices: ["arrivé", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["grammar", "supplement", "cecr-v4"],
    theme: "grammaire"
  },
  {
    id: "supp-v4-5d4fe583",
    level: "hsk3",
    hanzi: "刷卡",
    pinyin: "shuā kǎ",
    translation: "swipe the card",
    translationFr: "passer la carte",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "刷卡",
        pinyin: "shuā kǎ",
        translation: "swipe the card",
        translationFr: "passer la carte"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 刷卡 »",
      choices: ["passer la carte", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-62df10b5",
    level: "hsk3",
    hanzi: "刷牙",
    pinyin: "shuā yá",
    translation: "brush teeth",
    translationFr: "se brosser les dents",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "刷牙",
        pinyin: "shuā yá",
        translation: "brush teeth",
        translationFr: "se brosser les dents"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 刷牙 »",
      choices: ["se brosser les dents", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-ab5c7d93",
    level: "hsk3",
    hanzi: "剩女",
    pinyin: "shèng nǚ",
    translation: "leftover woman",
    translationFr: "femme célibataire (péjoratif)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "剩女",
        pinyin: "shèng nǚ",
        translation: "leftover woman",
        translationFr: "femme célibataire (péjoratif)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 剩女 »",
      choices: ["femme célibataire (péjoratif)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-dc5f82cc",
    level: "hsk3",
    hanzi: "剩饭",
    pinyin: "shèng fàn",
    translation: "leftovers",
    translationFr: "restes de repas",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "剩饭",
        pinyin: "shèng fàn",
        translation: "leftovers",
        translationFr: "restes de repas"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 剩饭 »",
      choices: ["restes de repas", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-7f722613",
    level: "hsk4",
    hanzi: "加好友",
    pinyin: "jiā hǎoyǒu",
    translation: "add as friend",
    translationFr: "ajouter en ami",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "加好友",
        pinyin: "jiā hǎoyǒu",
        translation: "add as friend",
        translationFr: "ajouter en ami"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 加好友 »",
      choices: ["ajouter en ami", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-f8dd26ec",
    level: "hsk3",
    hanzi: "加薪",
    pinyin: "jiā xīn",
    translation: "raise salary",
    translationFr: "augmenter le salaire",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "加薪",
        pinyin: "jiā xīn",
        translation: "raise salary",
        translationFr: "augmenter le salaire"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 加薪 »",
      choices: ["augmenter le salaire", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-eb5470d9",
    level: "hsk4",
    hanzi: "努力地",
    pinyin: "nǔlì de",
    translation: "diligently",
    translationFr: "avec effort",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "努力地",
        pinyin: "nǔlì de",
        translation: "diligently",
        translationFr: "avec effort"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 努力地 »",
      choices: ["avec effort", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-e75f3b2f",
    level: "hsk3",
    hanzi: "势",
    pinyin: "shì",
    translation: "momentum, force (strategy)",
    translationFr: "force, tendance (stratégie)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "势",
        pinyin: "shì",
        translation: "momentum, force (strategy)",
        translationFr: "force, tendance (stratégie)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 势 »",
      choices: ["force, tendance (stratégie)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-f420df22",
    level: "hsk4",
    hanzi: "北京话",
    pinyin: "Běijīng huà",
    translation: "Beijing dialect",
    translationFr: "parler pékinois",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "北京话",
        pinyin: "Běijīng huà",
        translation: "Beijing dialect",
        translationFr: "parler pékinois"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 北京话 »",
      choices: ["parler pékinois", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-76ded8fa",
    level: "hsk3",
    hanzi: "北大",
    pinyin: "Běi Dà",
    translation: "Peking University",
    translationFr: "Université de Pékin",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "北大",
        pinyin: "Běi Dà",
        translation: "Peking University",
        translationFr: "Université de Pékin"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 北大 »",
      choices: ["Université de Pékin", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-3043469b",
    level: "hsk3",
    hanzi: "医保",
    pinyin: "yī bǎo",
    translation: "medical insurance",
    translationFr: "assurance maladie",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "医保",
        pinyin: "yī bǎo",
        translation: "medical insurance",
        translationFr: "assurance maladie"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 医保 »",
      choices: ["assurance maladie", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-6e72f828",
    level: "hsk3",
    hanzi: "十一",
    pinyin: "Shí Yī",
    translation: "National Day (Oct 1)",
    translationFr: "Fête nationale (1er octobre)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "十一",
        pinyin: "Shí Yī",
        translation: "National Day (Oct 1)",
        translationFr: "Fête nationale (1er octobre)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 十一 »",
      choices: ["Fête nationale (1er octobre)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-e3bb59c6",
    level: "hsk6",
    hanzi: "千古第一才女",
    pinyin: "qiāngǔ dì yī cáinǚ",
    translation: "greatest female talent in history",
    translationFr: "première talentueuse de l'histoire (Li Qingzhao)",
    category: "idiom",
    examples: [
      {
        hanzi: "千古第一才女",
        pinyin: "qiāngǔ dì yī cáinǚ",
        translation: "greatest female talent in history",
        translationFr: "première talentueuse de l'histoire (Li Qingzhao)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 千古第一才女 »",
      choices: ["première talentueuse de l'histoire (Li Qingzhao)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-e31d8bc2",
    level: "hsk3",
    hanzi: "升职",
    pinyin: "shēng zhí",
    translation: "promotion (job)",
    translationFr: "promotion",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "升职",
        pinyin: "shēng zhí",
        translation: "promotion (job)",
        translationFr: "promotion"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 升职 »",
      choices: ["promotion", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-9333ed8c",
    level: "hsk3",
    hanzi: "华为",
    pinyin: "Huáwéi",
    translation: "Huawei",
    translationFr: "Huawei",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "华为",
        pinyin: "Huáwéi",
        translation: "Huawei",
        translationFr: "Huawei"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 华为 »",
      choices: ["Huawei", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-f038fed1",
    level: "hsk3",
    hanzi: "华语",
    pinyin: "Huá yǔ",
    translation: "Mandarin (Sinitic sphere)",
    translationFr: "mandarin (locuteurs sinophones)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "华语",
        pinyin: "Huá yǔ",
        translation: "Mandarin (Sinitic sphere)",
        translationFr: "mandarin (locuteurs sinophones)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 华语 »",
      choices: ["mandarin (locuteurs sinophones)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-78eebd61",
    level: "hsk4",
    hanzi: "单人间",
    pinyin: "dān rén jiān",
    translation: "single room",
    translationFr: "chambre simple",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "单人间",
        pinyin: "dān rén jiān",
        translation: "single room",
        translationFr: "chambre simple"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 单人间 »",
      choices: ["chambre simple", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-aa2164e2",
    level: "hsk3",
    hanzi: "博主",
    pinyin: "bó zhǔ",
    translation: "blogger / vlogger",
    translationFr: "blogueur, vlogger",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "博主",
        pinyin: "bó zhǔ",
        translation: "blogger / vlogger",
        translationFr: "blogueur, vlogger"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 博主 »",
      choices: ["blogueur, vlogger", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-e2ce70ea",
    level: "hsk3",
    hanzi: "原神",
    pinyin: "Yuán Shén",
    translation: "Genshin Impact",
    translationFr: "Genshin Impact",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "原神",
        pinyin: "Yuán Shén",
        translation: "Genshin Impact",
        translationFr: "Genshin Impact"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 原神 »",
      choices: ["Genshin Impact", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-bb762268",
    level: "hsk3",
    hanzi: "去了",
    pinyin: "qù le",
    translation: "went",
    translationFr: "allé",
    category: "grammar",
    examples: [
      {
        hanzi: "去了",
        pinyin: "qù le",
        translation: "went",
        translationFr: "allé"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 去了 »",
      choices: ["allé", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["grammar", "supplement", "cecr-v4"],
    theme: "grammaire"
  },
  {
    id: "supp-v4-848c4221",
    level: "hsk3",
    hanzi: "去过",
    pinyin: "qù guo",
    translation: "have been to",
    translationFr: "déjà été (à)",
    category: "grammar",
    examples: [
      {
        hanzi: "去过",
        pinyin: "qù guo",
        translation: "have been to",
        translationFr: "déjà été (à)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 去过 »",
      choices: ["déjà été (à)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["grammar", "supplement", "cecr-v4"],
    theme: "grammaire"
  },
  {
    id: "supp-v4-e41d5359",
    level: "hsk6",
    hanzi: "又...又...",
    pinyin: "yòu... yòu...",
    translation: "both... and...",
    translationFr: "à la fois... et...",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "又...又...",
        pinyin: "yòu... yòu...",
        translation: "both... and...",
        translationFr: "à la fois... et..."
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 又...又... »",
      choices: ["à la fois... et...", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-118c9d57",
    level: "hsk5",
    hanzi: "又下雨了",
    pinyin: "yòu xià yǔ le",
    translation: "it's raining again",
    translationFr: "il pleut encore",
    category: "idiom",
    examples: [
      {
        hanzi: "又下雨了",
        pinyin: "yòu xià yǔ le",
        translation: "it's raining again",
        translationFr: "il pleut encore"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 又下雨了 »",
      choices: ["il pleut encore", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-bdabbbff",
    level: "hsk4",
    hanzi: "又来了",
    pinyin: "yòu lái le",
    translation: "here we go again",
    translationFr: "encore une fois",
    category: "grammar",
    examples: [
      {
        hanzi: "又来了",
        pinyin: "yòu lái le",
        translation: "here we go again",
        translationFr: "encore une fois"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 又来了 »",
      choices: ["encore une fois", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["grammar", "supplement", "cecr-v4"],
    theme: "grammaire"
  },
  {
    id: "supp-v4-8d030158",
    level: "hsk4",
    hanzi: "又迟到",
    pinyin: "yòu chídào",
    translation: "late again",
    translationFr: "encore en retard",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "又迟到",
        pinyin: "yòu chídào",
        translation: "late again",
        translationFr: "encore en retard"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 又迟到 »",
      choices: ["encore en retard", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-bcf8e9a9",
    level: "hsk4",
    hanzi: "双人间",
    pinyin: "shuāng rén jiān",
    translation: "double room",
    translationFr: "chambre double",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "双人间",
        pinyin: "shuāng rén jiān",
        translation: "double room",
        translationFr: "chambre double"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 双人间 »",
      choices: ["chambre double", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-b389b092",
    level: "hsk4",
    hanzi: "双十一",
    pinyin: "Shuāng Shí Yī",
    translation: "Double 11 (Singles' Day)",
    translationFr: "Double 11 (Singles' Day)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "双十一",
        pinyin: "Shuāng Shí Yī",
        translation: "Double 11 (Singles' Day)",
        translationFr: "Double 11 (Singles' Day)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 双十一 »",
      choices: ["Double 11 (Singles' Day)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-2ea637e1",
    level: "hsk4",
    hanzi: "发消息",
    pinyin: "fā xiāoxi",
    translation: "send a message",
    translationFr: "envoyer un message",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "发消息",
        pinyin: "fā xiāoxi",
        translation: "send a message",
        translationFr: "envoyer un message"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 发消息 »",
      choices: ["envoyer un message", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-c7ac70b6",
    level: "hsk3",
    hanzi: "可乐",
    pinyin: "kělè",
    translation: "cola",
    translationFr: "Coca / cola",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "可乐",
        pinyin: "kělè",
        translation: "cola",
        translationFr: "Coca / cola"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 可乐 »",
      choices: ["Coca / cola", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-3cae1575",
    level: "hsk4",
    hanzi: "可以吗",
    pinyin: "kěyǐ ma",
    translation: "is it okay?",
    translationFr: "c'est bon ?",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "可以吗",
        pinyin: "kěyǐ ma",
        translation: "is it okay?",
        translationFr: "c'est bon ?"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 可以吗 »",
      choices: ["c'est bon ?", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-c73fe508",
    level: "hsk5",
    hanzi: "可以抽烟",
    pinyin: "kěyǐ chōu yān",
    translation: "smoking allowed",
    translationFr: "on peut fumer",
    category: "idiom",
    examples: [
      {
        hanzi: "可以抽烟",
        pinyin: "kěyǐ chōu yān",
        translation: "smoking allowed",
        translationFr: "on peut fumer"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 可以抽烟 »",
      choices: ["on peut fumer", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-ee4b6c3a",
    level: "hsk5",
    hanzi: "可以试试",
    pinyin: "kěyǐ shì shi",
    translation: "can try",
    translationFr: "on peut essayer",
    category: "idiom",
    examples: [
      {
        hanzi: "可以试试",
        pinyin: "kěyǐ shì shi",
        translation: "can try",
        translationFr: "on peut essayer"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 可以试试 »",
      choices: ["on peut essayer", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-5476fa74",
    level: "hsk4",
    hanzi: "可以走",
    pinyin: "kěyǐ zǒu",
    translation: "can leave",
    translationFr: "on peut y aller",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "可以走",
        pinyin: "kěyǐ zǒu",
        translation: "can leave",
        translationFr: "on peut y aller"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 可以走 »",
      choices: ["on peut y aller", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-3ef71fcd",
    level: "hsk5",
    hanzi: "可回收物",
    pinyin: "kě huíshōu wù",
    translation: "recyclable waste",
    translationFr: "déchets recyclables",
    category: "idiom",
    examples: [
      {
        hanzi: "可回收物",
        pinyin: "kě huíshōu wù",
        translation: "recyclable waste",
        translationFr: "déchets recyclables"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 可回收物 »",
      choices: ["déchets recyclables", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-12f0c94f",
    level: "hsk3",
    hanzi: "台湾",
    pinyin: "Táiwān",
    translation: "Taiwan",
    translationFr: "Taïwan",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "台湾",
        pinyin: "Táiwān",
        translation: "Taiwan",
        translationFr: "Taïwan"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 台湾 »",
      choices: ["Taïwan", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-653ea7ea",
    level: "hsk3",
    hanzi: "台语",
    pinyin: "Tái yǔ",
    translation: "Taiwanese (Hokkien)",
    translationFr: "taïwanais / hokkien",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "台语",
        pinyin: "Tái yǔ",
        translation: "Taiwanese (Hokkien)",
        translationFr: "taïwanais / hokkien"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 台语 »",
      choices: ["taïwanais / hokkien", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-d2ba27e4",
    level: "hsk3",
    hanzi: "吃了",
    pinyin: "chī le",
    translation: "ate",
    translationFr: "mangé",
    category: "grammar",
    examples: [
      {
        hanzi: "吃了",
        pinyin: "chī le",
        translation: "ate",
        translationFr: "mangé"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 吃了 »",
      choices: ["mangé", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["grammar", "supplement", "cecr-v4"],
    theme: "grammaire"
  },
  {
    id: "supp-v4-b3b512df",
    level: "hsk3",
    hanzi: "吃完",
    pinyin: "chī wán",
    translation: "finish eating",
    translationFr: "finir de manger",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "吃完",
        pinyin: "chī wán",
        translation: "finish eating",
        translationFr: "finir de manger"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 吃完 »",
      choices: ["finir de manger", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-9d4e9dfe",
    level: "hsk3",
    hanzi: "吃掉",
    pinyin: "chī diào",
    translation: "eat up",
    translationFr: "manger (disparition totale)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "吃掉",
        pinyin: "chī diào",
        translation: "eat up",
        translationFr: "manger (disparition totale)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 吃掉 »",
      choices: ["manger (disparition totale)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-71f2af33",
    level: "hsk4",
    hanzi: "吃早饭",
    pinyin: "chī zǎofàn",
    translation: "eat breakfast",
    translationFr: "prendre le petit-déjeuner",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "吃早饭",
        pinyin: "chī zǎofàn",
        translation: "eat breakfast",
        translationFr: "prendre le petit-déjeuner"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 吃早饭 »",
      choices: ["prendre le petit-déjeuner", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-8c5df33e",
    level: "hsk3",
    hanzi: "吃过",
    pinyin: "chī guo",
    translation: "have eaten",
    translationFr: "avoir déjà mangé (expérience)",
    category: "grammar",
    examples: [
      {
        hanzi: "吃过",
        pinyin: "chī guo",
        translation: "have eaten",
        translationFr: "avoir déjà mangé (expérience)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 吃过 »",
      choices: ["avoir déjà mangé (expérience)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["grammar", "supplement", "cecr-v4"],
    theme: "grammaire"
  },
  {
    id: "supp-v4-241612c2",
    level: "hsk5",
    hanzi: "各位领导",
    pinyin: "gè wèi lǐngdǎo",
    translation: "esteemed leaders",
    translationFr: "chers supérieurs",
    category: "idiom",
    examples: [
      {
        hanzi: "各位领导",
        pinyin: "gè wèi lǐngdǎo",
        translation: "esteemed leaders",
        translationFr: "chers supérieurs"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 各位领导 »",
      choices: ["chers supérieurs", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-385c0fb1",
    level: "hsk5",
    hanzi: "合作共赢",
    pinyin: "hézuò gòng yíng",
    translation: "win-win cooperation",
    translationFr: "coopération gagnant-gagnant",
    category: "idiom",
    examples: [
      {
        hanzi: "合作共赢",
        pinyin: "hézuò gòng yíng",
        translation: "win-win cooperation",
        translationFr: "coopération gagnant-gagnant"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 合作共赢 »",
      choices: ["coopération gagnant-gagnant", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-b60abb9a",
    level: "hsk4",
    hanzi: "同性恋",
    pinyin: "tóngxìng liàn",
    translation: "homosexuality",
    translationFr: "homosexualité",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "同性恋",
        pinyin: "tóngxìng liàn",
        translation: "homosexuality",
        translationFr: "homosexualité"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 同性恋 »",
      choices: ["homosexualité", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-53541fcd",
    level: "hsk3",
    hanzi: "听懂",
    pinyin: "tīng dǒng",
    translation: "understand by listening",
    translationFr: "comprendre à l'oreille",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "听懂",
        pinyin: "tīng dǒng",
        translation: "understand by listening",
        translationFr: "comprendre à l'oreille"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 听懂 »",
      choices: ["comprendre à l'oreille", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-01ff78df",
    level: "hsk3",
    hanzi: "吴语",
    pinyin: "Wú yǔ",
    translation: "Wu Chinese",
    translationFr: "wu (famille shanghaïenne)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "吴语",
        pinyin: "Wú yǔ",
        translation: "Wu Chinese",
        translationFr: "wu (famille shanghaïenne)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 吴语 »",
      choices: ["wu (famille shanghaïenne)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-49d4d75e",
    level: "hsk4",
    hanzi: "周杰伦",
    pinyin: "Zhōu Jiélún",
    translation: "Jay Chou (singer)",
    translationFr: "Jay Chou (chanteur)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "周杰伦",
        pinyin: "Zhōu Jiélún",
        translation: "Jay Chou (singer)",
        translationFr: "Jay Chou (chanteur)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 周杰伦 »",
      choices: ["Jay Chou (chanteur)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-d5f4184a",
    level: "hsk6",
    hanzi: "命运共同体",
    pinyin: "mìngyùn gòngtóng tǐ",
    translation: "community of shared destiny",
    translationFr: "communauté de destin",
    category: "idiom",
    examples: [
      {
        hanzi: "命运共同体",
        pinyin: "mìngyùn gòngtóng tǐ",
        translation: "community of shared destiny",
        translationFr: "communauté de destin"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 命运共同体 »",
      choices: ["communauté de destin", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-7b496839",
    level: "hsk4",
    hanzi: "咖啡馆",
    pinyin: "kāfēi guǎn",
    translation: "café",
    translationFr: "café (lieu)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "咖啡馆",
        pinyin: "kāfēi guǎn",
        translation: "café",
        translationFr: "café (lieu)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 咖啡馆 »",
      choices: ["café (lieu)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-1b0783d6",
    level: "hsk3",
    hanzi: "哉",
    pinyin: "zāi",
    translation: "classical exclamation particle",
    translationFr: "particule classique exclamative",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "哉",
        pinyin: "zāi",
        translation: "classical exclamation particle",
        translationFr: "particule classique exclamative"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 哉 »",
      choices: ["particule classique exclamative", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-f61eaffb",
    level: "hsk3",
    hanzi: "哥",
    pinyin: "gē",
    translation: "older brother",
    translationFr: "grand frère",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "哥",
        pinyin: "gē",
        translation: "older brother",
        translationFr: "grand frère"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 哥 »",
      choices: ["grand frère", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-109f8df4",
    level: "hsk3",
    hanzi: "哪吒",
    pinyin: "Nézhā",
    translation: "Nezha (deity / film)",
    translationFr: "Nezha (divinité / film)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "哪吒",
        pinyin: "Nézhā",
        translation: "Nezha (deity / film)",
        translationFr: "Nezha (divinité / film)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 哪吒 »",
      choices: ["Nezha (divinité / film)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-a8fd83f5",
    level: "hsk3",
    hanzi: "唐",
    pinyin: "Táng",
    translation: "Tang dynasty",
    translationFr: "dynastie Tang (618-907)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "唐",
        pinyin: "Táng",
        translation: "Tang dynasty",
        translationFr: "dynastie Tang (618-907)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 唐 »",
      choices: ["dynastie Tang (618-907)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-401eafef",
    level: "hsk4",
    hanzi: "唐人街",
    pinyin: "Tángrén jiē",
    translation: "Chinatown",
    translationFr: "Chinatown",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "唐人街",
        pinyin: "Tángrén jiē",
        translation: "Chinatown",
        translationFr: "Chinatown"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 唐人街 »",
      choices: ["Chinatown", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-84cdf0e3",
    level: "hsk3",
    hanzi: "唔该",
    pinyin: "mh gōi",
    translation: "thank you (Cantonese)",
    translationFr: "merci (cantonais)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "唔该",
        pinyin: "mh gōi",
        translation: "thank you (Cantonese)",
        translationFr: "merci (cantonais)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 唔该 »",
      choices: ["merci (cantonais)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-acf8f712",
    level: "hsk4",
    hanzi: "唱得好",
    pinyin: "chàng de hǎo",
    translation: "sings well",
    translationFr: "chante bien",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "唱得好",
        pinyin: "chàng de hǎo",
        translation: "sings well",
        translationFr: "chante bien"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 唱得好 »",
      choices: ["chante bien", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-6d594f00",
    level: "hsk4",
    hanzi: "商务茶",
    pinyin: "shāngwù chá",
    translation: "business tea",
    translationFr: "thé d'affaires",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "商务茶",
        pinyin: "shāngwù chá",
        translation: "business tea",
        translationFr: "thé d'affaires"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 商务茶 »",
      choices: ["thé d'affaires", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-2384851a",
    level: "hsk3",
    hanzi: "商榷",
    pinyin: "shāng què",
    translation: "to debate (formal)",
    translationFr: "discuter, débattre (formel)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "商榷",
        pinyin: "shāng què",
        translation: "to debate (formal)",
        translationFr: "discuter, débattre (formel)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 商榷 »",
      choices: ["discuter, débattre (formel)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-4582dddf",
    level: "hsk3",
    hanzi: "商鞅",
    pinyin: "Shāng Yāng",
    translation: "Shang Yang (Legalist reformer)",
    translationFr: "Shang Yang (légiste, -390 / -338)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "商鞅",
        pinyin: "Shāng Yāng",
        translation: "Shang Yang (Legalist reformer)",
        translationFr: "Shang Yang (légiste, -390 / -338)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 商鞅 »",
      choices: ["Shang Yang (légiste, -390 / -338)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-4d081535",
    level: "hsk3",
    hanzi: "啥",
    pinyin: "shá",
    translation: "what (colloquial)",
    translationFr: "quoi (familier)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "啥",
        pinyin: "shá",
        translation: "what (colloquial)",
        translationFr: "quoi (familier)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 啥 »",
      choices: ["quoi (familier)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-6df5bcb2",
    level: "hsk3",
    hanzi: "喀什",
    pinyin: "Kāshí",
    translation: "Kashgar",
    translationFr: "Kashgar",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "喀什",
        pinyin: "Kāshí",
        translation: "Kashgar",
        translationFr: "Kashgar"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 喀什 »",
      choices: ["Kashgar", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-ba9c14bd",
    level: "hsk3",
    hanzi: "喝光",
    pinyin: "hē guāng",
    translation: "drink up entirely",
    translationFr: "boire jusqu'au dernier",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "喝光",
        pinyin: "hē guāng",
        translation: "drink up entirely",
        translationFr: "boire jusqu'au dernier"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 喝光 »",
      choices: ["boire jusqu'au dernier", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-a5c431f6",
    level: "hsk4",
    hanzi: "嗓子疼",
    pinyin: "sǎngzi téng",
    translation: "sore throat",
    translationFr: "mal à la gorge",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "嗓子疼",
        pinyin: "sǎngzi téng",
        translation: "sore throat",
        translationFr: "mal à la gorge"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 嗓子疼 »",
      choices: ["mal à la gorge", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-404355fa",
    level: "hsk5",
    hanzi: "四大名著",
    pinyin: "sì dà míng zhù",
    translation: "Four Great Classical Novels",
    translationFr: "les quatre grands romans classiques",
    category: "idiom",
    examples: [
      {
        hanzi: "四大名著",
        pinyin: "sì dà míng zhù",
        translation: "Four Great Classical Novels",
        translationFr: "les quatre grands romans classiques"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 四大名著 »",
      choices: ["les quatre grands romans classiques", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-460ae93d",
    level: "hsk4",
    hanzi: "团圆饭",
    pinyin: "tuányuán fàn",
    translation: "reunion dinner",
    translationFr: "repas de retrouvailles (Nouvel An)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "团圆饭",
        pinyin: "tuányuán fàn",
        translation: "reunion dinner",
        translationFr: "repas de retrouvailles (Nouvel An)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 团圆饭 »",
      choices: ["repas de retrouvailles (Nouvel An)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-c1f8777d",
    level: "hsk4",
    hanzi: "国民党",
    pinyin: "Guómíndǎng",
    translation: "Kuomintang",
    translationFr: "Kuomintang (KMT)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "国民党",
        pinyin: "Guómíndǎng",
        translation: "Kuomintang",
        translationFr: "Kuomintang (KMT)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 国民党 »",
      choices: ["Kuomintang (KMT)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-adf1bdb3",
    level: "hsk6",
    hanzi: "国破山河在",
    pinyin: "guó pò shān hé zài",
    translation: "the state is shattered, mountains and rivers remain",
    translationFr: "l'État est brisé, montagnes et fleuves demeurent (Du Fu)",
    category: "idiom",
    examples: [
      {
        hanzi: "国破山河在",
        pinyin: "guó pò shān hé zài",
        translation: "the state is shattered, mountains and rivers remain",
        translationFr: "l'État est brisé, montagnes et fleuves demeurent (Du Fu)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 国破山河在 »",
      choices: ["l'État est brisé, montagnes et fleuves demeurent (Du Fu)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-fed4ff08",
    level: "hsk3",
    hanzi: "国语",
    pinyin: "guó yǔ",
    translation: "national language (Mandarin in Taiwan)",
    translationFr: "langue nationale (mandarin à Taïwan)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "国语",
        pinyin: "guó yǔ",
        translation: "national language (Mandarin in Taiwan)",
        translationFr: "langue nationale (mandarin à Taïwan)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 国语 »",
      choices: ["langue nationale (mandarin à Taïwan)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-7c2583f8",
    level: "hsk3",
    hanzi: "在做",
    pinyin: "zài zuò",
    translation: "doing (now)",
    translationFr: "être en train de faire",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "在做",
        pinyin: "zài zuò",
        translation: "doing (now)",
        translationFr: "être en train de faire"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 在做 »",
      choices: ["être en train de faire", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-126139e1",
    level: "hsk3",
    hanzi: "在吃",
    pinyin: "zài chī",
    translation: "eating (now)",
    translationFr: "être en train de manger",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "在吃",
        pinyin: "zài chī",
        translation: "eating (now)",
        translationFr: "être en train de manger"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 在吃 »",
      choices: ["être en train de manger", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-840c3984",
    level: "hsk5",
    hanzi: "在我看来",
    pinyin: "zài wǒ kàn lái",
    translation: "in my view",
    translationFr: "à mon avis",
    category: "idiom",
    examples: [
      {
        hanzi: "在我看来",
        pinyin: "zài wǒ kàn lái",
        translation: "in my view",
        translationFr: "à mon avis"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 在我看来 »",
      choices: ["à mon avis", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-54a38c24",
    level: "hsk3",
    hanzi: "在看",
    pinyin: "zài kàn",
    translation: "watching (now)",
    translationFr: "être en train de regarder",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "在看",
        pinyin: "zài kàn",
        translation: "watching (now)",
        translationFr: "être en train de regarder"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 在看 »",
      choices: ["être en train de regarder", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-7468489c",
    level: "hsk4",
    hanzi: "在睡觉",
    pinyin: "zài shuìjiào",
    translation: "sleeping (now)",
    translationFr: "être en train de dormir",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "在睡觉",
        pinyin: "zài shuìjiào",
        translation: "sleeping (now)",
        translationFr: "être en train de dormir"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 在睡觉 »",
      choices: ["être en train de dormir", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-1cea93ce",
    level: "hsk3",
    hanzi: "在说",
    pinyin: "zài shuō",
    translation: "saying (now)",
    translationFr: "être en train de dire",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "在说",
        pinyin: "zài shuō",
        translation: "saying (now)",
        translationFr: "être en train de dire"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 在说 »",
      choices: ["être en train de dire", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-3b195a3b",
    level: "hsk3",
    hanzi: "坐下",
    pinyin: "zuò xià",
    translation: "sit down",
    translationFr: "s'asseoir",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "坐下",
        pinyin: "zuò xià",
        translation: "sit down",
        translationFr: "s'asseoir"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 坐下 »",
      choices: ["s'asseoir", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-42f61fba",
    level: "hsk4",
    hanzi: "坐飞机",
    pinyin: "zuò fēijī",
    translation: "take a plane",
    translationFr: "prendre l'avion",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "坐飞机",
        pinyin: "zuò fēijī",
        translation: "take a plane",
        translationFr: "prendre l'avion"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 坐飞机 »",
      choices: ["prendre l'avion", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-bdb2a015",
    level: "hsk5",
    hanzi: "坚持不懈",
    pinyin: "jiānchí bú xiè",
    translation: "persevere relentlessly",
    translationFr: "persévérer sans relâche",
    category: "idiom",
    examples: [
      {
        hanzi: "坚持不懈",
        pinyin: "jiānchí bú xiè",
        translation: "persevere relentlessly",
        translationFr: "persévérer sans relâche"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 坚持不懈 »",
      choices: ["persévérer sans relâche", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-2f7c10c1",
    level: "hsk5",
    hanzi: "垃圾分类",
    pinyin: "lājī fēn lèi",
    translation: "waste sorting",
    translationFr: "tri des déchets",
    category: "idiom",
    examples: [
      {
        hanzi: "垃圾分类",
        pinyin: "lājī fēn lèi",
        translation: "waste sorting",
        translationFr: "tri des déchets"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 垃圾分类 »",
      choices: ["tri des déchets", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-d7778a09",
    level: "hsk3",
    hanzi: "堂哥",
    pinyin: "táng gē",
    translation: "older male paternal cousin",
    translationFr: "cousin (côté paternel)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "堂哥",
        pinyin: "táng gē",
        translation: "older male paternal cousin",
        translationFr: "cousin (côté paternel)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 堂哥 »",
      choices: ["cousin (côté paternel)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-e84875e2",
    level: "hsk4",
    hanzi: "塑料袋",
    pinyin: "sùliào dài",
    translation: "plastic bag",
    translationFr: "sac plastique",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "塑料袋",
        pinyin: "sùliào dài",
        translation: "plastic bag",
        translationFr: "sac plastique"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 塑料袋 »",
      choices: ["sac plastique", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-03a40789",
    level: "hsk4",
    hanzi: "声声慢",
    pinyin: "Shēng Shēng Màn",
    translation: "Slow, Slow Tune (Li Qingzhao)",
    translationFr: "« Son par son, lente » (Li Qingzhao)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "声声慢",
        pinyin: "Shēng Shēng Màn",
        translation: "Slow, Slow Tune (Li Qingzhao)",
        translationFr: "« Son par son, lente » (Li Qingzhao)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 声声慢 »",
      choices: ["« Son par son, lente » (Li Qingzhao)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-e4d1bb33",
    level: "hsk3",
    hanzi: "外滩",
    pinyin: "Wàitān",
    translation: "the Bund (Shanghai)",
    translationFr: "le Bund (Shanghai)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "外滩",
        pinyin: "Wàitān",
        translation: "the Bund (Shanghai)",
        translationFr: "le Bund (Shanghai)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 外滩 »",
      choices: ["le Bund (Shanghai)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-b1aaf50c",
    level: "hsk3",
    hanzi: "多久",
    pinyin: "duō jiǔ",
    translation: "how long",
    translationFr: "combien de temps",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "多久",
        pinyin: "duō jiǔ",
        translation: "how long",
        translationFr: "combien de temps"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 多久 »",
      choices: ["combien de temps", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-26f71853",
    level: "hsk3",
    hanzi: "多大",
    pinyin: "duō dà",
    translation: "how old / how big",
    translationFr: "quel âge / quelle taille",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "多大",
        pinyin: "duō dà",
        translation: "how old / how big",
        translationFr: "quel âge / quelle taille"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 多大 »",
      choices: ["quel âge / quelle taille", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-dd680ae0",
    level: "hsk5",
    hanzi: "多长时间",
    pinyin: "duō cháng shíjiān",
    translation: "how much time",
    translationFr: "combien de temps",
    category: "idiom",
    examples: [
      {
        hanzi: "多长时间",
        pinyin: "duō cháng shíjiān",
        translation: "how much time",
        translationFr: "combien de temps"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 多长时间 »",
      choices: ["combien de temps", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-fe648a60",
    level: "hsk4",
    hanzi: "大使馆",
    pinyin: "dàshǐ guǎn",
    translation: "embassy",
    translationFr: "ambassade",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "大使馆",
        pinyin: "dàshǐ guǎn",
        translation: "embassy",
        translationFr: "ambassade"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 大使馆 »",
      choices: ["ambassade", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-fcba7ef8",
    level: "hsk3",
    hanzi: "大号",
    pinyin: "dà hào",
    translation: "large size",
    translationFr: "taille L",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "大号",
        pinyin: "dà hào",
        translation: "large size",
        translationFr: "taille L"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 大号 »",
      choices: ["taille L", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-114000b2",
    level: "hsk5",
    hanzi: "大国外交",
    pinyin: "dàguó wàijiāo",
    translation: "major-country diplomacy",
    translationFr: "diplomatie de grande puissance",
    category: "idiom",
    examples: [
      {
        hanzi: "大国外交",
        pinyin: "dàguó wàijiāo",
        translation: "major-country diplomacy",
        translationFr: "diplomatie de grande puissance"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 大国外交 »",
      choices: ["diplomatie de grande puissance", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-7c57cac0",
    level: "hsk4",
    hanzi: "大床房",
    pinyin: "dà chuáng fáng",
    translation: "king-size bed room",
    translationFr: "chambre avec grand lit",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "大床房",
        pinyin: "dà chuáng fáng",
        translation: "king-size bed room",
        translationFr: "chambre avec grand lit"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 大床房 »",
      choices: ["chambre avec grand lit", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-030e4a37",
    level: "hsk4",
    hanzi: "大白话",
    pinyin: "dà bái huà",
    translation: "plain speech",
    translationFr: "langage courant / vulgarisé",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "大白话",
        pinyin: "dà bái huà",
        translation: "plain speech",
        translationFr: "langage courant / vulgarisé"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 大白话 »",
      choices: ["langage courant / vulgarisé", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-0853837d",
    level: "hsk4",
    hanzi: "大跃进",
    pinyin: "Dà Yuèjìn",
    translation: "Great Leap Forward",
    translationFr: "Grand Bond en avant (1958)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "大跃进",
        pinyin: "Dà Yuèjìn",
        translation: "Great Leap Forward",
        translationFr: "Grand Bond en avant (1958)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 大跃进 »",
      choices: ["Grand Bond en avant (1958)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-e81daf0a",
    level: "hsk6",
    hanzi: "天涯若比邻",
    pinyin: "tiān yá ruò bǐ lín",
    translation: "though worlds apart, close as neighbors",
    translationFr: "à l'autre bout du monde, proches comme voisins (Wang Bo)",
    category: "idiom",
    examples: [
      {
        hanzi: "天涯若比邻",
        pinyin: "tiān yá ruò bǐ lín",
        translation: "though worlds apart, close as neighbors",
        translationFr: "à l'autre bout du monde, proches comme voisins (Wang Bo)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 天涯若比邻 »",
      choices: ["à l'autre bout du monde, proches comme voisins (Wang Bo)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-f4643539",
    level: "hsk4",
    hanzi: "太极拳",
    pinyin: "tàijí quán",
    translation: "tai chi",
    translationFr: "taichi",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "太极拳",
        pinyin: "tàijí quán",
        translation: "tai chi",
        translationFr: "taichi"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 太极拳 »",
      choices: ["taichi", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-c6c4a436",
    level: "hsk3",
    hanzi: "央视",
    pinyin: "Yāng Shì",
    translation: "CCTV",
    translationFr: "CCTV",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "央视",
        pinyin: "Yāng Shì",
        translation: "CCTV",
        translationFr: "CCTV"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 央视 »",
      choices: ["CCTV", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-62c5506e",
    level: "hsk5",
    hanzi: "女权主义",
    pinyin: "nǚquán zhǔyì",
    translation: "feminism",
    translationFr: "féminisme",
    category: "idiom",
    examples: [
      {
        hanzi: "女权主义",
        pinyin: "nǚquán zhǔyì",
        translation: "feminism",
        translationFr: "féminisme"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 女权主义 »",
      choices: ["féminisme", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-11abf050",
    level: "hsk3",
    hanzi: "好了",
    pinyin: "hǎo le",
    translation: "done / okay now",
    translationFr: "c'est bon / terminé",
    category: "grammar",
    examples: [
      {
        hanzi: "好了",
        pinyin: "hǎo le",
        translation: "done / okay now",
        translationFr: "c'est bon / terminé"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 好了 »",
      choices: ["c'est bon / terminé", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["grammar", "supplement", "cecr-v4"],
    theme: "grammaire"
  },
  {
    id: "supp-v4-e64efb6e",
    level: "hsk3",
    hanzi: "好吗",
    pinyin: "hǎo ma",
    translation: "okay?",
    translationFr: "d'accord ?",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "好吗",
        pinyin: "hǎo ma",
        translation: "okay?",
        translationFr: "d'accord ?"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 好吗 »",
      choices: ["d'accord ?", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-a5d033c0",
    level: "hsk3",
    hanzi: "好玩",
    pinyin: "hǎo wán",
    translation: "fun",
    translationFr: "amusant",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "好玩",
        pinyin: "hǎo wán",
        translation: "fun",
        translationFr: "amusant"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 好玩 »",
      choices: ["amusant", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-ebebf1c4",
    level: "hsk3",
    hanzi: "姨妈",
    pinyin: "yímā",
    translation: "maternal aunt",
    translationFr: "tante maternelle",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "姨妈",
        pinyin: "yímā",
        translation: "maternal aunt",
        translationFr: "tante maternelle"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 姨妈 »",
      choices: ["tante maternelle", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-1d1b41d7",
    level: "hsk3",
    hanzi: "嫦娥",
    pinyin: "Cháng'é",
    translation: "Chang'e (moon goddess)",
    translationFr: "Chang'e (déesse de la lune)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "嫦娥",
        pinyin: "Cháng'é",
        translation: "Chang'e (moon goddess)",
        translationFr: "Chang'e (déesse de la lune)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 嫦娥 »",
      choices: ["Chang'e (déesse de la lune)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-80aceb21",
    level: "hsk3",
    hanzi: "子曰",
    pinyin: "zǐ yuē",
    translation: "the Master said (Confucius)",
    translationFr: "le Maître dit (Confucius)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "子曰",
        pinyin: "zǐ yuē",
        translation: "the Master said (Confucius)",
        translationFr: "le Maître dit (Confucius)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 子曰 »",
      choices: ["le Maître dit (Confucius)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-37816203",
    level: "hsk3",
    hanzi: "孔子",
    pinyin: "Kǒngzǐ",
    translation: "Confucius",
    translationFr: "Confucius",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "孔子",
        pinyin: "Kǒngzǐ",
        translation: "Confucius",
        translationFr: "Confucius"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 孔子 »",
      choices: ["Confucius", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-2e85d0ae",
    level: "hsk5",
    hanzi: "孔子学院",
    pinyin: "Kǒngzǐ xuéyuàn",
    translation: "Confucius Institutes",
    translationFr: "Instituts Confucius",
    category: "idiom",
    examples: [
      {
        hanzi: "孔子学院",
        pinyin: "Kǒngzǐ xuéyuàn",
        translation: "Confucius Institutes",
        translationFr: "Instituts Confucius"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 孔子学院 »",
      choices: ["Instituts Confucius", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-4ac20142",
    level: "hsk4",
    hanzi: "孙中山",
    pinyin: "Sūn Zhōngshān",
    translation: "Sun Yat-sen",
    translationFr: "Sun Yat-sen",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "孙中山",
        pinyin: "Sūn Zhōngshān",
        translation: "Sun Yat-sen",
        translationFr: "Sun Yat-sen"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 孙中山 »",
      choices: ["Sun Yat-sen", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-ee16ea5d",
    level: "hsk4",
    hanzi: "孙悟空",
    pinyin: "Sūn Wùkōng",
    translation: "Sun Wukong (Monkey King)",
    translationFr: "le Roi des Singes",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "孙悟空",
        pinyin: "Sūn Wùkōng",
        translation: "Sun Wukong (Monkey King)",
        translationFr: "le Roi des Singes"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 孙悟空 »",
      choices: ["le Roi des Singes", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-a8c2d248",
    level: "hsk3",
    hanzi: "孝",
    pinyin: "xiào",
    translation: "filial piety",
    translationFr: "piété filiale",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "孝",
        pinyin: "xiào",
        translation: "filial piety",
        translationFr: "piété filiale"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 孝 »",
      choices: ["piété filiale", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-6ef989be",
    level: "hsk3",
    hanzi: "孟子",
    pinyin: "Mèngzǐ",
    translation: "Mencius",
    translationFr: "Mencius",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "孟子",
        pinyin: "Mèngzǐ",
        translation: "Mencius",
        translationFr: "Mencius"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 孟子 »",
      choices: ["Mencius", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-ccbbb3eb",
    level: "hsk3",
    hanzi: "学了",
    pinyin: "xué le",
    translation: "studied / learned",
    translationFr: "étudié / appris",
    category: "grammar",
    examples: [
      {
        hanzi: "学了",
        pinyin: "xué le",
        translation: "studied / learned",
        translationFr: "étudié / appris"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 学了 »",
      choices: ["étudié / appris", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["grammar", "supplement", "cecr-v4"],
    theme: "grammaire"
  },
  {
    id: "supp-v4-18f74033",
    level: "hsk4",
    hanzi: "学校的",
    pinyin: "xuéxiào de",
    translation: "the school's",
    translationFr: "de l'école",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "学校的",
        pinyin: "xuéxiào de",
        translation: "the school's",
        translationFr: "de l'école"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 学校的 »",
      choices: ["de l'école", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-3f325ec9",
    level: "hsk5",
    hanzi: "学而不厌",
    pinyin: "xué ér bú yàn",
    translation: "study without tiring",
    translationFr: "étudier sans se lasser (Confucius)",
    category: "idiom",
    examples: [
      {
        hanzi: "学而不厌",
        pinyin: "xué ér bú yàn",
        translation: "study without tiring",
        translationFr: "étudier sans se lasser (Confucius)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 学而不厌 »",
      choices: ["étudier sans se lasser (Confucius)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-ba03efde",
    level: "hsk6",
    hanzi: "学而时习之",
    pinyin: "xué ér shí xí zhī",
    translation: "learn and regularly practice",
    translationFr: "étudier et le répéter régulièrement (Confucius)",
    category: "idiom",
    examples: [
      {
        hanzi: "学而时习之",
        pinyin: "xué ér shí xí zhī",
        translation: "learn and regularly practice",
        translationFr: "étudier et le répéter régulièrement (Confucius)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 学而时习之 »",
      choices: ["étudier et le répéter régulièrement (Confucius)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-97b1a69c",
    level: "hsk3",
    hanzi: "学过",
    pinyin: "xué guo",
    translation: "have studied",
    translationFr: "avoir étudié",
    category: "grammar",
    examples: [
      {
        hanzi: "学过",
        pinyin: "xué guo",
        translation: "have studied",
        translationFr: "avoir étudié"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 学过 »",
      choices: ["avoir étudié", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["grammar", "supplement", "cecr-v4"],
    theme: "grammaire"
  },
  {
    id: "supp-v4-86aa3920",
    level: "hsk4",
    hanzi: "安禄山",
    pinyin: "Ān Lùshān",
    translation: "An Lushan (rebel general)",
    translationFr: "An Lushan (général, -756)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "安禄山",
        pinyin: "Ān Lùshān",
        translation: "An Lushan (rebel general)",
        translationFr: "An Lushan (général, -756)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 安禄山 »",
      choices: ["An Lushan (général, -756)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-a163f5f6",
    level: "hsk4",
    hanzi: "安静地",
    pinyin: "ānjìng de",
    translation: "quietly",
    translationFr: "calmement",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "安静地",
        pinyin: "ānjìng de",
        translation: "quietly",
        translationFr: "calmement"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 安静地 »",
      choices: ["calmement", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-858d375c",
    level: "hsk3",
    hanzi: "宋",
    pinyin: "Sòng",
    translation: "Song dynasty",
    translationFr: "dynastie Song (960-1279)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "宋",
        pinyin: "Sòng",
        translation: "Song dynasty",
        translationFr: "dynastie Song (960-1279)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 宋 »",
      choices: ["dynastie Song (960-1279)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-362154ad",
    level: "hsk4",
    hanzi: "客家话",
    pinyin: "Kèjiā huà",
    translation: "Hakka",
    translationFr: "hakka",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "客家话",
        pinyin: "Kèjiā huà",
        translation: "Hakka",
        translationFr: "hakka"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 客家话 »",
      choices: ["hakka", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-c3bde661",
    level: "hsk5",
    hanzi: "宫保鸡丁",
    pinyin: "gōngbǎo jī dīng",
    translation: "kung pao chicken",
    translationFr: "poulet Kung Pao",
    category: "idiom",
    examples: [
      {
        hanzi: "宫保鸡丁",
        pinyin: "gōngbǎo jī dīng",
        translation: "kung pao chicken",
        translationFr: "poulet Kung Pao"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 宫保鸡丁 »",
      choices: ["poulet Kung Pao", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-501530b8",
    level: "hsk3",
    hanzi: "对吗",
    pinyin: "duì ma",
    translation: "right?",
    translationFr: "n'est-ce pas ?",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "对吗",
        pinyin: "duì ma",
        translation: "right?",
        translationFr: "n'est-ce pas ?"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 对吗 »",
      choices: ["n'est-ce pas ?", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-0421f7b4",
    level: "hsk5",
    hanzi: "寻寻觅觅",
    pinyin: "xún xún mì mì",
    translation: "seeking, seeking (Li Qingzhao)",
    translationFr: "chercher inlassablement (Li Qingzhao)",
    category: "idiom",
    examples: [
      {
        hanzi: "寻寻觅觅",
        pinyin: "xún xún mì mì",
        translation: "seeking, seeking (Li Qingzhao)",
        translationFr: "chercher inlassablement (Li Qingzhao)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 寻寻觅觅 »",
      choices: ["chercher inlassablement (Li Qingzhao)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-3612ba14",
    level: "hsk5",
    hanzi: "寻根文学",
    pinyin: "xún gēn wénxué",
    translation: "roots-seeking literature",
    translationFr: "littérature de la quête des racines",
    category: "idiom",
    examples: [
      {
        hanzi: "寻根文学",
        pinyin: "xún gēn wénxué",
        translation: "roots-seeking literature",
        translationFr: "littérature de la quête des racines"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 寻根文学 »",
      choices: ["littérature de la quête des racines", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-3b25bf7d",
    level: "hsk3",
    hanzi: "导语",
    pinyin: "dǎo yǔ",
    translation: "lead paragraph",
    translationFr: "chapeau d'article, introduction",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "导语",
        pinyin: "dǎo yǔ",
        translation: "lead paragraph",
        translationFr: "chapeau d'article, introduction"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 导语 »",
      choices: ["chapeau d'article, introduction", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-69b7fed4",
    level: "hsk4",
    hanzi: "尊敬的",
    pinyin: "zūnjìng de",
    translation: "esteemed / dear (formal)",
    translationFr: "respecté, cher (formule)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "尊敬的",
        pinyin: "zūnjìng de",
        translation: "esteemed / dear (formal)",
        translationFr: "respecté, cher (formule)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 尊敬的 »",
      choices: ["respecté, cher (formule)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-a788e724",
    level: "hsk3",
    hanzi: "小号",
    pinyin: "xiǎo hào",
    translation: "small size",
    translationFr: "taille S",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "小号",
        pinyin: "xiǎo hào",
        translation: "small size",
        translationFr: "taille S"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 小号 »",
      choices: ["taille S", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-a3941ccd",
    level: "hsk3",
    hanzi: "小孩",
    pinyin: "xiǎo hái",
    translation: "child",
    translationFr: "enfant",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "小孩",
        pinyin: "xiǎo hái",
        translation: "child",
        translationFr: "enfant"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 小孩 »",
      choices: ["enfant", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-41efa375",
    level: "hsk4",
    hanzi: "小红书",
    pinyin: "Xiǎo Hóng Shū",
    translation: "Xiaohongshu app",
    translationFr: "Little Red Book (Xiaohongshu)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "小红书",
        pinyin: "Xiǎo Hóng Shū",
        translation: "Xiaohongshu app",
        translationFr: "Little Red Book (Xiaohongshu)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 小红书 »",
      choices: ["Little Red Book (Xiaohongshu)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-ec69d975",
    level: "hsk4",
    hanzi: "少林寺",
    pinyin: "Shàolín sì",
    translation: "Shaolin Temple",
    translationFr: "temple Shaolin",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "少林寺",
        pinyin: "Shàolín sì",
        translation: "Shaolin Temple",
        translationFr: "temple Shaolin"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 少林寺 »",
      choices: ["temple Shaolin", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-d1ac0763",
    level: "hsk4",
    hanzi: "就会了",
    pinyin: "jiù huì le",
    translation: "you just get it",
    translationFr: "on y arrive (et après on sait)",
    category: "grammar",
    examples: [
      {
        hanzi: "就会了",
        pinyin: "jiù huì le",
        translation: "you just get it",
        translationFr: "on y arrive (et après on sait)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 就会了 »",
      choices: ["on y arrive (et après on sait)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["grammar", "supplement", "cecr-v4"],
    theme: "grammaire"
  },
  {
    id: "supp-v4-41aef7cb",
    level: "hsk5",
    hanzi: "就在这儿",
    pinyin: "jiù zài zhèr",
    translation: "right here",
    translationFr: "c'est juste ici",
    category: "idiom",
    examples: [
      {
        hanzi: "就在这儿",
        pinyin: "jiù zài zhèr",
        translation: "right here",
        translationFr: "c'est juste ici"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 就在这儿 »",
      choices: ["c'est juste ici", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-ece33930",
    level: "hsk3",
    hanzi: "就来",
    pinyin: "jiù lái",
    translation: "coming right away",
    translationFr: "j'arrive tout de suite",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "就来",
        pinyin: "jiù lái",
        translation: "coming right away",
        translationFr: "j'arrive tout de suite"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 就来 »",
      choices: ["j'arrive tout de suite", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-3851692a",
    level: "hsk3",
    hanzi: "尾款",
    pinyin: "wěi kuǎn",
    translation: "final payment",
    translationFr: "solde (paiement final)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "尾款",
        pinyin: "wěi kuǎn",
        translation: "final payment",
        translationFr: "solde (paiement final)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 尾款 »",
      choices: ["solde (paiement final)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-37c08c44",
    level: "hsk3",
    hanzi: "山东",
    pinyin: "Shāndōng",
    translation: "Shandong province",
    translationFr: "province du Shandong",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "山东",
        pinyin: "Shāndōng",
        translation: "Shandong province",
        translationFr: "province du Shandong"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 山东 »",
      choices: ["province du Shandong", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-bf106865",
    level: "hsk4",
    hanzi: "山水画",
    pinyin: "shān shuǐ huà",
    translation: "landscape painting",
    translationFr: "peinture de paysages",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "山水画",
        pinyin: "shān shuǐ huà",
        translation: "landscape painting",
        translationFr: "peinture de paysages"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 山水画 »",
      choices: ["peinture de paysages", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-d22a3a7d",
    level: "hsk5",
    hanzi: "山重水复",
    pinyin: "shān chóng shuǐ fù",
    translation: "mountains upon mountains, streams upon streams",
    translationFr: "montagnes enchaînées, fleuves répétés (Lu You)",
    category: "idiom",
    examples: [
      {
        hanzi: "山重水复",
        pinyin: "shān chóng shuǐ fù",
        translation: "mountains upon mountains, streams upon streams",
        translationFr: "montagnes enchaînées, fleuves répétés (Lu You)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 山重水复 »",
      choices: ["montagnes enchaînées, fleuves répétés (Lu You)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-e6c88d89",
    level: "hsk4",
    hanzi: "工作了",
    pinyin: "gōngzuò le",
    translation: "worked",
    translationFr: "a travaillé",
    category: "grammar",
    examples: [
      {
        hanzi: "工作了",
        pinyin: "gōngzuò le",
        translation: "worked",
        translationFr: "a travaillé"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 工作了 »",
      choices: ["a travaillé", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["grammar", "supplement", "cecr-v4"],
    theme: "grammaire"
  },
  {
    id: "supp-v4-c9a87b3e",
    level: "hsk5",
    hanzi: "工作经验",
    pinyin: "gōngzuò jīngyàn",
    translation: "work experience",
    translationFr: "expérience professionnelle",
    category: "idiom",
    examples: [
      {
        hanzi: "工作经验",
        pinyin: "gōngzuò jīngyàn",
        translation: "work experience",
        translationFr: "expérience professionnelle"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 工作经验 »",
      choices: ["expérience professionnelle", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-818ee8b0",
    level: "hsk4",
    hanzi: "帮帮我",
    pinyin: "bāng bang wǒ",
    translation: "help me",
    translationFr: "aide-moi",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "帮帮我",
        pinyin: "bāng bang wǒ",
        translation: "help me",
        translationFr: "aide-moi"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 帮帮我 »",
      choices: ["aide-moi", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-e84275fe",
    level: "hsk3",
    hanzi: "广州",
    pinyin: "Guǎngzhōu",
    translation: "Guangzhou",
    translationFr: "Canton (ville)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "广州",
        pinyin: "Guǎngzhōu",
        translation: "Guangzhou",
        translationFr: "Canton (ville)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 广州 »",
      choices: ["Canton (ville)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-d6645e62",
    level: "hsk5",
    hanzi: "庄周梦蝶",
    pinyin: "Zhuāng Zhōu mèng dié",
    translation: "Zhuangzi dreams of a butterfly",
    translationFr: "Zhuangzi rêve qu'il est un papillon",
    category: "idiom",
    examples: [
      {
        hanzi: "庄周梦蝶",
        pinyin: "Zhuāng Zhōu mèng dié",
        translation: "Zhuangzi dreams of a butterfly",
        translationFr: "Zhuangzi rêve qu'il est un papillon"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 庄周梦蝶 »",
      choices: ["Zhuangzi rêve qu'il est un papillon", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-a39038fd",
    level: "hsk4",
    hanzi: "度蜜月",
    pinyin: "dù mì yuè",
    translation: "honeymoon",
    translationFr: "partir en lune de miel",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "度蜜月",
        pinyin: "dù mì yuè",
        translation: "honeymoon",
        translationFr: "partir en lune de miel"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 度蜜月 »",
      choices: ["partir en lune de miel", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-fe4ef1c2",
    level: "hsk3",
    hanzi: "开药",
    pinyin: "kāi yào",
    translation: "prescribe medicine",
    translationFr: "prescrire un médicament",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "开药",
        pinyin: "kāi yào",
        translation: "prescribe medicine",
        translationFr: "prescrire un médicament"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 开药 »",
      choices: ["prescrire un médicament", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-0bbb4eaa",
    level: "hsk3",
    hanzi: "弄丢",
    pinyin: "nòng diū",
    translation: "lose (accidentally)",
    translationFr: "perdre (par inadvertance)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "弄丢",
        pinyin: "nòng diū",
        translation: "lose (accidentally)",
        translationFr: "perdre (par inadvertance)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 弄丢 »",
      choices: ["perdre (par inadvertance)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-34f805ef",
    level: "hsk4",
    hanzi: "张艺谋",
    pinyin: "Zhāng Yìmóu",
    translation: "Zhang Yimou (director)",
    translationFr: "Zhang Yimou (réalisateur)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "张艺谋",
        pinyin: "Zhāng Yìmóu",
        translation: "Zhang Yimou (director)",
        translationFr: "Zhang Yimou (réalisateur)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 张艺谋 »",
      choices: ["Zhang Yimou (réalisateur)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-1c2e5921",
    level: "hsk3",
    hanzi: "张骞",
    pinyin: "Zhāng Qiān",
    translation: "Zhang Qian (Han-era explorer)",
    translationFr: "Zhang Qian (explorateur, Han)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "张骞",
        pinyin: "Zhāng Qiān",
        translation: "Zhang Qian (Han-era explorer)",
        translationFr: "Zhang Qian (explorateur, Han)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 张骞 »",
      choices: ["Zhang Qian (explorateur, Han)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-9204990a",
    level: "hsk3",
    hanzi: "往前",
    pinyin: "wǎng qián",
    translation: "forward",
    translationFr: "vers l'avant",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "往前",
        pinyin: "wǎng qián",
        translation: "forward",
        translationFr: "vers l'avant"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 往前 »",
      choices: ["vers l'avant", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-4df25521",
    level: "hsk3",
    hanzi: "往右",
    pinyin: "wǎng yòu",
    translation: "to the right",
    translationFr: "à droite",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "往右",
        pinyin: "wǎng yòu",
        translation: "to the right",
        translationFr: "à droite"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 往右 »",
      choices: ["à droite", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-7bb43e7b",
    level: "hsk3",
    hanzi: "往左",
    pinyin: "wǎng zuǒ",
    translation: "to the left",
    translationFr: "à gauche",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "往左",
        pinyin: "wǎng zuǒ",
        translation: "to the left",
        translationFr: "à gauche"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 往左 »",
      choices: ["à gauche", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-68ff7862",
    level: "hsk3",
    hanzi: "很多",
    pinyin: "hěn duō",
    translation: "many",
    translationFr: "beaucoup",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "很多",
        pinyin: "hěn duō",
        translation: "many",
        translationFr: "beaucoup"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 很多 »",
      choices: ["beaucoup", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-0bb18899",
    level: "hsk3",
    hanzi: "很好",
    pinyin: "hěn hǎo",
    translation: "very good",
    translationFr: "très bien",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "很好",
        pinyin: "hěn hǎo",
        translation: "very good",
        translationFr: "très bien"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 很好 »",
      choices: ["très bien", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-4b1f4d5a",
    level: "hsk4",
    hanzi: "很好吃",
    pinyin: "hěn hǎo chī",
    translation: "very tasty",
    translationFr: "très bon (nourriture)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "很好吃",
        pinyin: "hěn hǎo chī",
        translation: "very tasty",
        translationFr: "très bon (nourriture)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 很好吃 »",
      choices: ["très bon (nourriture)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-56907086",
    level: "hsk4",
    hanzi: "很高兴",
    pinyin: "hěn gāoxìng",
    translation: "very happy",
    translationFr: "très content",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "很高兴",
        pinyin: "hěn gāoxìng",
        translation: "very happy",
        translationFr: "très content"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 很高兴 »",
      choices: ["très content", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-55d9ed30",
    level: "hsk3",
    hanzi: "律诗",
    pinyin: "lǜ shī",
    translation: "regulated verse (8 lines)",
    translationFr: "poème régulé (8 vers)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "律诗",
        pinyin: "lǜ shī",
        translation: "regulated verse (8 lines)",
        translationFr: "poème régulé (8 vers)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 律诗 »",
      choices: ["poème régulé (8 vers)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-c8b056c0",
    level: "hsk5",
    hanzi: "微信支付",
    pinyin: "Wēixìn zhīfù",
    translation: "WeChat Pay",
    translationFr: "WeChat Pay",
    category: "idiom",
    examples: [
      {
        hanzi: "微信支付",
        pinyin: "Wēixìn zhīfù",
        translation: "WeChat Pay",
        translationFr: "WeChat Pay"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 微信支付 »",
      choices: ["WeChat Pay", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-1f129bf8",
    level: "hsk3",
    hanzi: "微辣",
    pinyin: "wēi là",
    translation: "mildly spicy",
    translationFr: "légèrement pimenté",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "微辣",
        pinyin: "wēi là",
        translation: "mildly spicy",
        translationFr: "légèrement pimenté"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 微辣 »",
      choices: ["légèrement pimenté", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-3b309d8c",
    level: "hsk4",
    hanzi: "快快地",
    pinyin: "kuài kuài de",
    translation: "quickly",
    translationFr: "rapidement",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "快快地",
        pinyin: "kuài kuài de",
        translation: "quickly",
        translationFr: "rapidement"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 快快地 »",
      choices: ["rapidement", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-fb2c73a1",
    level: "hsk4",
    hanzi: "怎么来",
    pinyin: "zěnme lái",
    translation: "how to come / got here",
    translationFr: "comment est venu / venir",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "怎么来",
        pinyin: "zěnme lái",
        translation: "how to come / got here",
        translationFr: "comment est venu / venir"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 怎么来 »",
      choices: ["comment est venu / venir", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-f1707169",
    level: "hsk3",
    hanzi: "思乡",
    pinyin: "sī xiāng",
    translation: "homesickness",
    translationFr: "mal du pays",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "思乡",
        pinyin: "sī xiāng",
        translation: "homesickness",
        translationFr: "mal du pays"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 思乡 »",
      choices: ["mal du pays", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-8734dd53",
    level: "hsk5",
    hanzi: "性别歧视",
    pinyin: "xìngbié qíshì",
    translation: "gender discrimination",
    translationFr: "discrimination de genre",
    category: "idiom",
    examples: [
      {
        hanzi: "性别歧视",
        pinyin: "xìngbié qíshì",
        translation: "gender discrimination",
        translationFr: "discrimination de genre"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 性别歧视 »",
      choices: ["discrimination de genre", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-21febffe",
    level: "hsk5",
    hanzi: "恭喜发财",
    pinyin: "gōngxǐ fā cái",
    translation: "wishing you prosperity (New Year)",
    translationFr: "bonne fortune pour le Nouvel An",
    category: "idiom",
    examples: [
      {
        hanzi: "恭喜发财",
        pinyin: "gōngxǐ fā cái",
        translation: "wishing you prosperity (New Year)",
        translationFr: "bonne fortune pour le Nouvel An"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 恭喜发财 »",
      choices: ["bonne fortune pour le Nouvel An", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-b65e5a3a",
    level: "hsk3",
    hanzi: "您好",
    pinyin: "nín hǎo",
    translation: "hello (formal)",
    translationFr: "bonjour (formel)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "您好",
        pinyin: "nín hǎo",
        translation: "hello (formal)",
        translationFr: "bonjour (formel)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 您好 »",
      choices: ["bonjour (formel)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-1de4ff3b",
    level: "hsk5",
    hanzi: "悬梁刺股",
    pinyin: "xuán liáng cì gǔ",
    translation: "hang from beam, prick thigh (extreme studying)",
    translationFr: "se suspendre aux poutres, se piquer la cuisse (étudier avec acharnement)",
    category: "idiom",
    examples: [
      {
        hanzi: "悬梁刺股",
        pinyin: "xuán liáng cì gǔ",
        translation: "hang from beam, prick thigh (extreme studying)",
        translationFr: "se suspendre aux poutres, se piquer la cuisse (étudier avec acharnement)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 悬梁刺股 »",
      choices: ["se suspendre aux poutres, se piquer la cuisse (étudier avec acharnement)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-2b86eeaf",
    level: "hsk3",
    hanzi: "想你",
    pinyin: "xiǎng nǐ",
    translation: "miss you",
    translationFr: "penser à toi",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "想你",
        pinyin: "xiǎng nǐ",
        translation: "miss you",
        translationFr: "penser à toi"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 想你 »",
      choices: ["penser à toi", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-ecaa59e8",
    level: "hsk3",
    hanzi: "想家",
    pinyin: "xiǎng jiā",
    translation: "homesick",
    translationFr: "avoir le mal du pays",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "想家",
        pinyin: "xiǎng jiā",
        translation: "homesick",
        translationFr: "avoir le mal du pays"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 想家 »",
      choices: ["avoir le mal du pays", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-1834ba3f",
    level: "hsk5",
    hanzi: "意思意思",
    pinyin: "yìsi yìsi",
    translation: "a little token gesture",
    translationFr: "petit geste de politesse (cadeau)",
    category: "idiom",
    examples: [
      {
        hanzi: "意思意思",
        pinyin: "yìsi yìsi",
        translation: "a little token gesture",
        translationFr: "petit geste de politesse (cadeau)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 意思意思 »",
      choices: ["petit geste de politesse (cadeau)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-0aa0f0d0",
    level: "hsk4",
    hanzi: "感冒药",
    pinyin: "gǎnmào yào",
    translation: "cold medicine",
    translationFr: "médicament contre le rhume",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "感冒药",
        pinyin: "gǎnmào yào",
        translation: "cold medicine",
        translationFr: "médicament contre le rhume"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 感冒药 »",
      choices: ["médicament contre le rhume", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-ac1cbb4e",
    level: "hsk3",
    hanzi: "愠",
    pinyin: "yùn",
    translation: "be annoyed (classical)",
    translationFr: "se vexer, s'irriter (classique)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "愠",
        pinyin: "yùn",
        translation: "be annoyed (classical)",
        translationFr: "se vexer, s'irriter (classique)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 愠 »",
      choices: ["se vexer, s'irriter (classique)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-c3be70cb",
    level: "hsk4",
    hanzi: "慢慢地",
    pinyin: "màn màn de",
    translation: "slowly",
    translationFr: "lentement",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "慢慢地",
        pinyin: "màn màn de",
        translation: "slowly",
        translationFr: "lentement"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 慢慢地 »",
      choices: ["lentement", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-8f9cdb9c",
    level: "hsk4",
    hanzi: "我也是",
    pinyin: "wǒ yě shì",
    translation: "me too",
    translationFr: "moi aussi",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "我也是",
        pinyin: "wǒ yě shì",
        translation: "me too",
        translationFr: "moi aussi"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 我也是 »",
      choices: ["moi aussi", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-0b0a405e",
    level: "hsk4",
    hanzi: "我们都",
    pinyin: "wǒmen dōu",
    translation: "all of us",
    translationFr: "nous tous",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "我们都",
        pinyin: "wǒmen dōu",
        translation: "all of us",
        translationFr: "nous tous"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 我们都 »",
      choices: ["nous tous", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-889cd0ed",
    level: "hsk3",
    hanzi: "我想",
    pinyin: "wǒ xiǎng",
    translation: "I want / I think",
    translationFr: "je voudrais / je pense",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "我想",
        pinyin: "wǒ xiǎng",
        translation: "I want / I think",
        translationFr: "je voudrais / je pense"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 我想 »",
      choices: ["je voudrais / je pense", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-0238a429",
    level: "hsk3",
    hanzi: "我的",
    pinyin: "wǒ de",
    translation: "my / mine",
    translationFr: "mon, ma, mien",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "我的",
        pinyin: "wǒ de",
        translation: "my / mine",
        translationFr: "mon, ma, mien"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 我的 »",
      choices: ["mon, ma, mien", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-cb7ad61a",
    level: "hsk3",
    hanzi: "我要",
    pinyin: "wǒ yào",
    translation: "I want",
    translationFr: "je veux",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "我要",
        pinyin: "wǒ yào",
        translation: "I want",
        translationFr: "je veux"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 我要 »",
      choices: ["je veux", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-b869924a",
    level: "hsk4",
    hanzi: "我觉得",
    pinyin: "wǒ juéde",
    translation: "I feel / I think",
    translationFr: "je trouve / je pense",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "我觉得",
        pinyin: "wǒ juéde",
        translation: "I feel / I think",
        translationFr: "je trouve / je pense"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 我觉得 »",
      choices: ["je trouve / je pense", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-d99fb916",
    level: "hsk4",
    hanzi: "我认为",
    pinyin: "wǒ rènwéi",
    translation: "I consider / I believe",
    translationFr: "j'estime / je considère",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "我认为",
        pinyin: "wǒ rènwéi",
        translation: "I consider / I believe",
        translationFr: "j'estime / je considère"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 我认为 »",
      choices: ["j'estime / je considère", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-65ab4efb",
    level: "hsk5",
    hanzi: "战狼外交",
    pinyin: "zhàn láng wàijiāo",
    translation: "Wolf Warrior diplomacy",
    translationFr: "diplomatie du loup combattant",
    category: "idiom",
    examples: [
      {
        hanzi: "战狼外交",
        pinyin: "zhàn láng wàijiāo",
        translation: "Wolf Warrior diplomacy",
        translationFr: "diplomatie du loup combattant"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 战狼外交 »",
      choices: ["diplomatie du loup combattant", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-a51b2480",
    level: "hsk3",
    hanzi: "所",
    pinyin: "suǒ",
    translation: "classical particle (passive relativizer)",
    translationFr: "particule classique (relatif passif)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "所",
        pinyin: "suǒ",
        translation: "classical particle (passive relativizer)",
        translationFr: "particule classique (relatif passif)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 所 »",
      choices: ["particule classique (relatif passif)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-9f67bacc",
    level: "hsk4",
    hanzi: "才三点",
    pinyin: "cái sān diǎn",
    translation: "only three o'clock",
    translationFr: "il n'est que 3h",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "才三点",
        pinyin: "cái sān diǎn",
        translation: "only three o'clock",
        translationFr: "il n'est que 3h"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 才三点 »",
      choices: ["il n'est que 3h", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-bd020bb9",
    level: "hsk3",
    hanzi: "才来",
    pinyin: "cái lái",
    translation: "just arriving",
    translationFr: "vient seulement maintenant",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "才来",
        pinyin: "cái lái",
        translation: "just arriving",
        translationFr: "vient seulement maintenant"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 才来 »",
      choices: ["vient seulement maintenant", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-72ce8cb4",
    level: "hsk4",
    hanzi: "打工人",
    pinyin: "dǎgōng rén",
    translation: "worker (neologism)",
    translationFr: "travailleur / salarié (néologisme)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "打工人",
        pinyin: "dǎgōng rén",
        translation: "worker (neologism)",
        translationFr: "travailleur / salarié (néologisme)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 打工人 »",
      choices: ["travailleur / salarié (néologisme)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-88b65b76",
    level: "hsk4",
    hanzi: "打扰了",
    pinyin: "dǎrǎo le",
    translation: "sorry to disturb you",
    translationFr: "désolé de vous déranger",
    category: "grammar",
    examples: [
      {
        hanzi: "打扰了",
        pinyin: "dǎrǎo le",
        translation: "sorry to disturb you",
        translationFr: "désolé de vous déranger"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 打扰了 »",
      choices: ["désolé de vous déranger", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["grammar", "supplement", "cecr-v4"],
    theme: "grammaire"
  },
  {
    id: "supp-v4-0345588a",
    level: "hsk4",
    hanzi: "扫一扫",
    pinyin: "sǎo yì sǎo",
    translation: "scan (QR code)",
    translationFr: "scanner (QR code)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "扫一扫",
        pinyin: "sǎo yì sǎo",
        translation: "scan (QR code)",
        translationFr: "scanner (QR code)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 扫一扫 »",
      choices: ["scanner (QR code)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-9b5db5f3",
    level: "hsk3",
    hanzi: "找到",
    pinyin: "zhǎo dào",
    translation: "find",
    translationFr: "trouver",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "找到",
        pinyin: "zhǎo dào",
        translation: "find",
        translationFr: "trouver"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 找到 »",
      choices: ["trouver", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-22c6de48",
    level: "hsk3",
    hanzi: "把书",
    pinyin: "bǎ shū",
    translation: "take the book (把 construction)",
    translationFr: "prendre le livre (structure 把)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "把书",
        pinyin: "bǎ shū",
        translation: "take the book (把 construction)",
        translationFr: "prendre le livre (structure 把)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 把书 »",
      choices: ["prendre le livre (structure 把)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-b908da29",
    level: "hsk3",
    hanzi: "抓住",
    pinyin: "zhuā zhù",
    translation: "grab hold",
    translationFr: "saisir",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "抓住",
        pinyin: "zhuā zhù",
        translation: "grab hold",
        translationFr: "saisir"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 抓住 »",
      choices: ["saisir", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-02fc314b",
    level: "hsk3",
    hanzi: "抖音",
    pinyin: "Dǒuyīn",
    translation: "Douyin (Chinese TikTok)",
    translationFr: "Douyin (TikTok chinois)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "抖音",
        pinyin: "Dǒuyīn",
        translation: "Douyin (Chinese TikTok)",
        translationFr: "Douyin (TikTok chinois)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 抖音 »",
      choices: ["Douyin (TikTok chinois)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-323b47e7",
    level: "hsk3",
    hanzi: "报价",
    pinyin: "bàojià",
    translation: "price quote",
    translationFr: "devis",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "报价",
        pinyin: "bàojià",
        translation: "price quote",
        translationFr: "devis"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 报价 »",
      choices: ["devis", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-9ef5e70b",
    level: "hsk4",
    hanzi: "拉肚子",
    pinyin: "lā dùzi",
    translation: "have diarrhea",
    translationFr: "avoir la diarrhée",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "拉肚子",
        pinyin: "lā dùzi",
        translation: "have diarrhea",
        translationFr: "avoir la diarrhée"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 拉肚子 »",
      choices: ["avoir la diarrhée", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-55748693",
    level: "hsk3",
    hanzi: "拔罐",
    pinyin: "bá guàn",
    translation: "cupping therapy",
    translationFr: "ventouses (médecine chinoise)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "拔罐",
        pinyin: "bá guàn",
        translation: "cupping therapy",
        translationFr: "ventouses (médecine chinoise)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 拔罐 »",
      choices: ["ventouses (médecine chinoise)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-9f7b14eb",
    level: "hsk3",
    hanzi: "拟人",
    pinyin: "nǐ rén",
    translation: "personification",
    translationFr: "personnification (rhétorique)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "拟人",
        pinyin: "nǐ rén",
        translation: "personification",
        translationFr: "personnification (rhétorique)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 拟人 »",
      choices: ["personnification (rhétorique)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-1f0bb3c9",
    level: "hsk3",
    hanzi: "拿走",
    pinyin: "ná zǒu",
    translation: "take away",
    translationFr: "emporter",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "拿走",
        pinyin: "ná zǒu",
        translation: "take away",
        translationFr: "emporter"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 拿走 »",
      choices: ["emporter", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-2a2d44f7",
    level: "hsk4",
    hanzi: "拿起来",
    pinyin: "ná qǐlái",
    translation: "pick up",
    translationFr: "prendre (soulever)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "拿起来",
        pinyin: "ná qǐlái",
        translation: "pick up",
        translationFr: "prendre (soulever)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 拿起来 »",
      choices: ["prendre (soulever)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-c98b12ad",
    level: "hsk4",
    hanzi: "挂电话",
    pinyin: "guà diànhuà",
    translation: "hang up (phone)",
    translationFr: "raccrocher",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "挂电话",
        pinyin: "guà diànhuà",
        translation: "hang up (phone)",
        translationFr: "raccrocher"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 挂电话 »",
      choices: ["raccrocher", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-6ef9660d",
    level: "hsk3",
    hanzi: "推拿",
    pinyin: "tuī ná",
    translation: "tuina (Chinese massage)",
    translationFr: "tuina (massage chinois)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "推拿",
        pinyin: "tuī ná",
        translation: "tuina (Chinese massage)",
        translationFr: "tuina (massage chinois)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 推拿 »",
      choices: ["tuina (massage chinois)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-9972f54c",
    level: "hsk3",
    hanzi: "搬到",
    pinyin: "bān dào",
    translation: "move to",
    translationFr: "déménager à",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "搬到",
        pinyin: "bān dào",
        translation: "move to",
        translationFr: "déménager à"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 搬到 »",
      choices: ["déménager à", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-0bd561be",
    level: "hsk4",
    hanzi: "支付宝",
    pinyin: "Zhīfùbǎo",
    translation: "Alipay",
    translationFr: "Alipay",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "支付宝",
        pinyin: "Zhīfùbǎo",
        translation: "Alipay",
        translationFr: "Alipay"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 支付宝 »",
      choices: ["Alipay", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-6b4bb920",
    level: "hsk3",
    hanzi: "收款",
    pinyin: "shōu kuǎn",
    translation: "receive payment",
    translationFr: "recevoir un paiement",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "收款",
        pinyin: "shōu kuǎn",
        translation: "receive payment",
        translationFr: "recevoir un paiement"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 收款 »",
      choices: ["recevoir un paiement", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-8421aa9a",
    level: "hsk5",
    hanzi: "改革开放",
    pinyin: "gǎigé kāifàng",
    translation: "Reform and Opening",
    translationFr: "Réformes et Ouverture (1978)",
    category: "idiom",
    examples: [
      {
        hanzi: "改革开放",
        pinyin: "gǎigé kāifàng",
        translation: "Reform and Opening",
        translationFr: "Réformes et Ouverture (1978)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 改革开放 »",
      choices: ["Réformes et Ouverture (1978)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-60b71e8e",
    level: "hsk3",
    hanzi: "放下",
    pinyin: "fàng xià",
    translation: "put down",
    translationFr: "poser, reposer",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "放下",
        pinyin: "fàng xià",
        translation: "put down",
        translationFr: "poser, reposer"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 放下 »",
      choices: ["poser, reposer", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-5c30ca35",
    level: "hsk3",
    hanzi: "放到",
    pinyin: "fàng dào",
    translation: "place into",
    translationFr: "mettre à/dans",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "放到",
        pinyin: "fàng dào",
        translation: "place into",
        translationFr: "mettre à/dans"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 放到 »",
      choices: ["mettre à/dans", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-c0f42132",
    level: "hsk3",
    hanzi: "放在",
    pinyin: "fàng zài",
    translation: "put at",
    translationFr: "déposer à",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "放在",
        pinyin: "fàng zài",
        translation: "put at",
        translationFr: "déposer à"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 放在 »",
      choices: ["déposer à", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-a2364a96",
    level: "hsk4",
    hanzi: "敏感词",
    pinyin: "mǐngǎn cí",
    translation: "sensitive word",
    translationFr: "mot sensible (censure)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "敏感词",
        pinyin: "mǐngǎn cí",
        translation: "sensitive word",
        translationFr: "mot sensible (censure)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 敏感词 »",
      choices: ["mot sensible (censure)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-d8a6028d",
    level: "hsk5",
    hanzi: "教育背景",
    pinyin: "jiàoyù bèijǐng",
    translation: "educational background",
    translationFr: "parcours scolaire",
    category: "idiom",
    examples: [
      {
        hanzi: "教育背景",
        pinyin: "jiàoyù bèijǐng",
        translation: "educational background",
        translationFr: "parcours scolaire"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 教育背景 »",
      choices: ["parcours scolaire", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-f13bd8d9",
    level: "hsk3",
    hanzi: "敦煌",
    pinyin: "Dūnhuáng",
    translation: "Dunhuang (grottoes)",
    translationFr: "Dunhuang (grottes)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "敦煌",
        pinyin: "Dūnhuáng",
        translation: "Dunhuang (grottoes)",
        translationFr: "Dunhuang (grottes)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 敦煌 »",
      choices: ["Dunhuang (grottes)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-7917619a",
    level: "hsk3",
    hanzi: "敬酒",
    pinyin: "jìng jiǔ",
    translation: "propose a toast",
    translationFr: "porter un toast",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "敬酒",
        pinyin: "jìng jiǔ",
        translation: "propose a toast",
        translationFr: "porter un toast"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 敬酒 »",
      choices: ["porter un toast", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-4d23668a",
    level: "hsk5",
    hanzi: "文房四宝",
    pinyin: "wén fáng sì bǎo",
    translation: "Four Treasures of the Study",
    translationFr: "les quatre trésors du lettré",
    category: "idiom",
    examples: [
      {
        hanzi: "文房四宝",
        pinyin: "wén fáng sì bǎo",
        translation: "Four Treasures of the Study",
        translationFr: "les quatre trésors du lettré"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 文房四宝 »",
      choices: ["les quatre trésors du lettré", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-7c22587c",
    level: "hsk3",
    hanzi: "文综",
    pinyin: "wén zōng",
    translation: "humanities comprehensive exam",
    translationFr: "épreuve combinée sciences humaines (gaokao)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "文综",
        pinyin: "wén zōng",
        translation: "humanities comprehensive exam",
        translationFr: "épreuve combinée sciences humaines (gaokao)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 文综 »",
      choices: ["épreuve combinée sciences humaines (gaokao)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-5bef6245",
    level: "hsk4",
    hanzi: "文言文",
    pinyin: "wényánwén",
    translation: "Classical Chinese",
    translationFr: "chinois classique",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "文言文",
        pinyin: "wényánwén",
        translation: "Classical Chinese",
        translationFr: "chinois classique"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 文言文 »",
      choices: ["chinois classique", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-8beafb11",
    level: "hsk3",
    hanzi: "文革",
    pinyin: "Wéngé",
    translation: "Cultural Revolution",
    translationFr: "Révolution culturelle (1966-76)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "文革",
        pinyin: "Wéngé",
        translation: "Cultural Revolution",
        translationFr: "Révolution culturelle (1966-76)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 文革 »",
      choices: ["Révolution culturelle (1966-76)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-b85e9464",
    level: "hsk4",
    hanzi: "新华社",
    pinyin: "Xīnhuá shè",
    translation: "Xinhua News Agency",
    translationFr: "Agence Xinhua",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "新华社",
        pinyin: "Xīnhuá shè",
        translation: "Xinhua News Agency",
        translationFr: "Agence Xinhua"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 新华社 »",
      choices: ["Agence Xinhua", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-c5163294",
    level: "hsk5",
    hanzi: "新年快乐",
    pinyin: "xīnnián kuàilè",
    translation: "happy new year",
    translationFr: "bonne année",
    category: "idiom",
    examples: [
      {
        hanzi: "新年快乐",
        pinyin: "xīnnián kuàilè",
        translation: "happy new year",
        translationFr: "bonne année"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 新年快乐 »",
      choices: ["bonne année", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-c702538f",
    level: "hsk3",
    hanzi: "新的",
    pinyin: "xīn de",
    translation: "new one",
    translationFr: "nouveau (nominal)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "新的",
        pinyin: "xīn de",
        translation: "new one",
        translationFr: "nouveau (nominal)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 新的 »",
      choices: ["nouveau (nominal)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-27fe723a",
    level: "hsk5",
    hanzi: "新闻联播",
    pinyin: "Xīnwén Liánbō",
    translation: "flagship CCTV news",
    translationFr: "journal télévisé phare (CCTV)",
    category: "idiom",
    examples: [
      {
        hanzi: "新闻联播",
        pinyin: "Xīnwén Liánbō",
        translation: "flagship CCTV news",
        translationFr: "journal télévisé phare (CCTV)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 新闻联播 »",
      choices: ["journal télévisé phare (CCTV)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-e6de057a",
    level: "hsk3",
    hanzi: "於",
    pinyin: "yú",
    translation: "at, in (classical)",
    translationFr: "à, dans (classique)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "於",
        pinyin: "yú",
        translation: "at, in (classical)",
        translationFr: "à, dans (classique)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 於 »",
      choices: ["à, dans (classique)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-81ac39bb",
    level: "hsk3",
    hanzi: "明喻",
    pinyin: "míng yù",
    translation: "simile",
    translationFr: "comparaison (rhétorique)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "明喻",
        pinyin: "míng yù",
        translation: "simile",
        translationFr: "comparaison (rhétorique)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 明喻 »",
      choices: ["comparaison (rhétorique)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-5276417d",
    level: "hsk3",
    hanzi: "明月",
    pinyin: "míng yuè",
    translation: "bright moon",
    translationFr: "lune brillante",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "明月",
        pinyin: "míng yuè",
        translation: "bright moon",
        translationFr: "lune brillante"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 明月 »",
      choices: ["lune brillante", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-370f112a",
    level: "hsk3",
    hanzi: "春望",
    pinyin: "Chūn Wàng",
    translation: "Spring View (Du Fu)",
    translationFr: "« Vue de printemps » (Du Fu)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "春望",
        pinyin: "Chūn Wàng",
        translation: "Spring View (Du Fu)",
        translationFr: "« Vue de printemps » (Du Fu)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 春望 »",
      choices: ["« Vue de printemps » (Du Fu)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-cc7c502a",
    level: "hsk3",
    hanzi: "春联",
    pinyin: "chūn lián",
    translation: "spring couplets",
    translationFr: "distiques de printemps",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "春联",
        pinyin: "chūn lián",
        translation: "spring couplets",
        translationFr: "distiques de printemps"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 春联 »",
      choices: ["distiques de printemps", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-37d09ebc",
    level: "hsk3",
    hanzi: "春节",
    pinyin: "Chūn Jié",
    translation: "Spring Festival",
    translationFr: "Nouvel An chinois",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "春节",
        pinyin: "Chūn Jié",
        translation: "Spring Festival",
        translationFr: "Nouvel An chinois"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 春节 »",
      choices: ["Nouvel An chinois", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-56599107",
    level: "hsk5",
    hanzi: "昨天来的",
    pinyin: "zuótiān lái de",
    translation: "came yesterday (emphatic)",
    translationFr: "c'est hier que (je) suis venu",
    category: "idiom",
    examples: [
      {
        hanzi: "昨天来的",
        pinyin: "zuótiān lái de",
        translation: "came yesterday (emphatic)",
        translationFr: "c'est hier que (je) suis venu"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 昨天来的 »",
      choices: ["c'est hier que (je) suis venu", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-821ab79e",
    level: "hsk6",
    hanzi: "是...的",
    pinyin: "shì... de",
    translation: "shi...de emphatic construction",
    translationFr: "structure emphatique sur circonstance",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "是...的",
        pinyin: "shì... de",
        translation: "shi...de emphatic construction",
        translationFr: "structure emphatique sur circonstance"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 是...的 »",
      choices: ["structure emphatique sur circonstance", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-d04fe145",
    level: "hsk3",
    hanzi: "是吗",
    pinyin: "shì ma",
    translation: "really?",
    translationFr: "vraiment ?",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "是吗",
        pinyin: "shì ma",
        translation: "really?",
        translationFr: "vraiment ?"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 是吗 »",
      choices: ["vraiment ?", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-661ac7f8",
    level: "hsk3",
    hanzi: "晚了",
    pinyin: "wǎn le",
    translation: "too late",
    translationFr: "trop tard / en retard",
    category: "grammar",
    examples: [
      {
        hanzi: "晚了",
        pinyin: "wǎn le",
        translation: "too late",
        translationFr: "trop tard / en retard"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 晚了 »",
      choices: ["trop tard / en retard", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["grammar", "supplement", "cecr-v4"],
    theme: "grammaire"
  },
  {
    id: "supp-v4-353f668d",
    level: "hsk4",
    hanzi: "普洱茶",
    pinyin: "pǔ'ěr chá",
    translation: "Pu'er tea",
    translationFr: "thé pu'er",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "普洱茶",
        pinyin: "pǔ'ěr chá",
        translation: "Pu'er tea",
        translationFr: "thé pu'er"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 普洱茶 »",
      choices: ["thé pu'er", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-ea13ee26",
    level: "hsk5",
    hanzi: "智慧城市",
    pinyin: "zhìhuì chéngshì",
    translation: "smart city",
    translationFr: "ville intelligente",
    category: "idiom",
    examples: [
      {
        hanzi: "智慧城市",
        pinyin: "zhìhuì chéngshì",
        translation: "smart city",
        translationFr: "ville intelligente"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 智慧城市 »",
      choices: ["ville intelligente", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-e3f78e3c",
    level: "hsk5",
    hanzi: "智能家居",
    pinyin: "zhìnéng jiā jū",
    translation: "smart home",
    translationFr: "domotique",
    category: "idiom",
    examples: [
      {
        hanzi: "智能家居",
        pinyin: "zhìnéng jiā jū",
        translation: "smart home",
        translationFr: "domotique"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 智能家居 »",
      choices: ["domotique", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-5d95179e",
    level: "hsk3",
    hanzi: "暗喻",
    pinyin: "àn yù",
    translation: "metaphor",
    translationFr: "métaphore",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "暗喻",
        pinyin: "àn yù",
        translation: "metaphor",
        translationFr: "métaphore"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 暗喻 »",
      choices: ["métaphore", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-553f88d4",
    level: "hsk4",
    hanzi: "有一个",
    pinyin: "yǒu yí gè",
    translation: "there is a",
    translationFr: "il y a un",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "有一个",
        pinyin: "yǒu yí gè",
        translation: "there is a",
        translationFr: "il y a un"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 有一个 »",
      choices: ["il y a un", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-cd9e42c7",
    level: "hsk4",
    hanzi: "有什么",
    pinyin: "yǒu shénme",
    translation: "what's there",
    translationFr: "qu'est-ce qu'il y a",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "有什么",
        pinyin: "yǒu shénme",
        translation: "what's there",
        translationFr: "qu'est-ce qu'il y a"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 有什么 »",
      choices: ["qu'est-ce qu'il y a", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-a9199162",
    level: "hsk3",
    hanzi: "有吗",
    pinyin: "yǒu ma",
    translation: "is there?",
    translationFr: "y en a-t-il ?",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "有吗",
        pinyin: "yǒu ma",
        translation: "is there?",
        translationFr: "y en a-t-il ?"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 有吗 »",
      choices: ["y en a-t-il ?", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-2d31c079",
    level: "hsk5",
    hanzi: "有害垃圾",
    pinyin: "yǒu hài lājī",
    translation: "hazardous waste",
    translationFr: "déchets dangereux",
    category: "idiom",
    examples: [
      {
        hanzi: "有害垃圾",
        pinyin: "yǒu hài lājī",
        translation: "hazardous waste",
        translationFr: "déchets dangereux"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 有害垃圾 »",
      choices: ["déchets dangereux", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-7e6be232",
    level: "hsk4",
    hanzi: "有时候",
    pinyin: "yǒu shíhou",
    translation: "sometimes",
    translationFr: "parfois",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "有时候",
        pinyin: "yǒu shíhou",
        translation: "sometimes",
        translationFr: "parfois"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 有时候 »",
      choices: ["parfois", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-17f01550",
    level: "hsk3",
    hanzi: "朋",
    pinyin: "péng",
    translation: "friend (classical)",
    translationFr: "ami (classique)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "朋",
        pinyin: "péng",
        translation: "friend (classical)",
        translationFr: "ami (classique)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 朋 »",
      choices: ["ami (classique)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-c8329dd0",
    level: "hsk4",
    hanzi: "朋友的",
    pinyin: "péngyou de",
    translation: "friend's",
    translationFr: "de l'ami",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "朋友的",
        pinyin: "péngyou de",
        translation: "friend's",
        translationFr: "de l'ami"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 朋友的 »",
      choices: ["de l'ami", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-c0be45c5",
    level: "hsk6",
    hanzi: "服务工农兵",
    pinyin: "fúwù gōng nóng bīng",
    translation: "serve workers, peasants, soldiers",
    translationFr: "servir ouvriers, paysans, soldats",
    category: "idiom",
    examples: [
      {
        hanzi: "服务工农兵",
        pinyin: "fúwù gōng nóng bīng",
        translation: "serve workers, peasants, soldiers",
        translationFr: "servir ouvriers, paysans, soldats"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 服务工农兵 »",
      choices: ["servir ouvriers, paysans, soldats", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-5d0a1863",
    level: "hsk5",
    hanzi: "望梅止渴",
    pinyin: "wàng méi zhǐ kě",
    translation: "quench thirst by gazing at plums",
    translationFr: "voir des prunes pour calmer la soif (illusion)",
    category: "idiom",
    examples: [
      {
        hanzi: "望梅止渴",
        pinyin: "wàng méi zhǐ kě",
        translation: "quench thirst by gazing at plums",
        translationFr: "voir des prunes pour calmer la soif (illusion)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 望梅止渴 »",
      choices: ["voir des prunes pour calmer la soif (illusion)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-6006dc3a",
    level: "hsk4",
    hanzi: "本命年",
    pinyin: "běn mìng nián",
    translation: "zodiac year",
    translationFr: "année de son signe zodiacal",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "本命年",
        pinyin: "běn mìng nián",
        translation: "zodiac year",
        translationFr: "année de son signe zodiacal"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 本命年 »",
      choices: ["année de son signe zodiacal", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-29f6fa5e",
    level: "hsk3",
    hanzi: "术",
    pinyin: "shù",
    translation: "technique, art",
    translationFr: "technique, art (classique)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "术",
        pinyin: "shù",
        translation: "technique, art",
        translationFr: "technique, art (classique)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 术 »",
      choices: ["technique, art (classique)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-dd7b878a",
    level: "hsk4",
    hanzi: "李子柒",
    pinyin: "Lǐ Zǐqī",
    translation: "Li Ziqi (influencer)",
    translationFr: "Li Ziqi (influenceuse)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "李子柒",
        pinyin: "Lǐ Zǐqī",
        translation: "Li Ziqi (influencer)",
        translationFr: "Li Ziqi (influenceuse)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 李子柒 »",
      choices: ["Li Ziqi (influenceuse)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-7b5119dc",
    level: "hsk4",
    hanzi: "李清照",
    pinyin: "Lǐ Qīngzhào",
    translation: "Li Qingzhao (Song poetess)",
    translationFr: "Li Qingzhao (poétesse Song)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "李清照",
        pinyin: "Lǐ Qīngzhào",
        translation: "Li Qingzhao (Song poetess)",
        translationFr: "Li Qingzhao (poétesse Song)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 李清照 »",
      choices: ["Li Qingzhao (poétesse Song)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-c6968d83",
    level: "hsk3",
    hanzi: "李白",
    pinyin: "Lǐ Bái",
    translation: "Li Bai (Tang poet)",
    translationFr: "Li Bai (poète Tang)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "李白",
        pinyin: "Lǐ Bái",
        translation: "Li Bai (Tang poet)",
        translationFr: "Li Bai (poète Tang)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 李白 »",
      choices: ["Li Bai (poète Tang)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-d3487eff",
    level: "hsk3",
    hanzi: "杜甫",
    pinyin: "Dù Fǔ",
    translation: "Du Fu (Tang poet)",
    translationFr: "Du Fu (poète Tang)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "杜甫",
        pinyin: "Dù Fǔ",
        translation: "Du Fu (Tang poet)",
        translationFr: "Du Fu (poète Tang)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 杜甫 »",
      choices: ["Du Fu (poète Tang)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-9a6f3664",
    level: "hsk5",
    hanzi: "杯弓蛇影",
    pinyin: "bēi gōng shé yǐng",
    translation: "seeing bow shadow as snake in cup",
    translationFr: "voir une ombre d'arc dans un verre (paranoïa)",
    category: "idiom",
    examples: [
      {
        hanzi: "杯弓蛇影",
        pinyin: "bēi gōng shé yǐng",
        translation: "seeing bow shadow as snake in cup",
        translationFr: "voir une ombre d'arc dans un verre (paranoïa)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 杯弓蛇影 »",
      choices: ["voir une ombre d'arc dans un verre (paranoïa)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-39f3ab66",
    level: "hsk5",
    hanzi: "极端天气",
    pinyin: "jíduān tiānqì",
    translation: "extreme weather",
    translationFr: "événements météo extrêmes",
    category: "idiom",
    examples: [
      {
        hanzi: "极端天气",
        pinyin: "jíduān tiānqì",
        translation: "extreme weather",
        translationFr: "événements météo extrêmes"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 极端天气 »",
      choices: ["événements météo extrêmes", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-817b0f88",
    level: "hsk5",
    hanzi: "柳暗花明",
    pinyin: "liǔ àn huā míng",
    translation: "willows dim, flowers bright (new hope)",
    translationFr: "saules obscurs, fleurs vives (nouvelle issue)",
    category: "idiom",
    examples: [
      {
        hanzi: "柳暗花明",
        pinyin: "liǔ àn huā míng",
        translation: "willows dim, flowers bright (new hope)",
        translationFr: "saules obscurs, fleurs vives (nouvelle issue)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 柳暗花明 »",
      choices: ["saules obscurs, fleurs vives (nouvelle issue)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-39520a13",
    level: "hsk6",
    hanzi: "核心竞争力",
    pinyin: "héxīn jìngzhēng lì",
    translation: "core competitiveness",
    translationFr: "cœur de compétitivité",
    category: "idiom",
    examples: [
      {
        hanzi: "核心竞争力",
        pinyin: "héxīn jìngzhēng lì",
        translation: "core competitiveness",
        translationFr: "cœur de compétitivité"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 核心竞争力 »",
      choices: ["cœur de compétitivité", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-b9836d22",
    level: "hsk5",
    hanzi: "桃园结义",
    pinyin: "Táo yuán jié yì",
    translation: "Oath of the Peach Garden",
    translationFr: "serment du jardin des pêchers (San Guo)",
    category: "idiom",
    examples: [
      {
        hanzi: "桃园结义",
        pinyin: "Táo yuán jié yì",
        translation: "Oath of the Peach Garden",
        translationFr: "serment du jardin des pêchers (San Guo)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 桃园结义 »",
      choices: ["serment du jardin des pêchers (San Guo)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-d123be32",
    level: "hsk3",
    hanzi: "楷书",
    pinyin: "kǎi shū",
    translation: "regular script (kaishu)",
    translationFr: "écriture régulière",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "楷书",
        pinyin: "kǎi shū",
        translation: "regular script (kaishu)",
        translationFr: "écriture régulière"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 楷书 »",
      choices: ["écriture régulière", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-1d8ffa1d",
    level: "hsk4",
    hanzi: "歇后语",
    pinyin: "xiēhòu yǔ",
    translation: "two-part allegorical saying",
    translationFr: "dicton énigmatique",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "歇后语",
        pinyin: "xiēhòu yǔ",
        translation: "two-part allegorical saying",
        translationFr: "dicton énigmatique"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 歇后语 »",
      choices: ["dicton énigmatique", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-abe3895a",
    level: "hsk4",
    hanzi: "止痛药",
    pinyin: "zhǐ tòng yào",
    translation: "painkiller",
    translationFr: "antalgique",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "止痛药",
        pinyin: "zhǐ tòng yào",
        translation: "painkiller",
        translationFr: "antalgique"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 止痛药 »",
      choices: ["antalgique", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-88ae7b41",
    level: "hsk5",
    hanzi: "死神永生",
    pinyin: "Sǐ Shén Yǒng Shēng",
    translation: "Death's End (Three-Body III)",
    translationFr: "La Mort Immortelle (3e tome Trisolaris)",
    category: "idiom",
    examples: [
      {
        hanzi: "死神永生",
        pinyin: "Sǐ Shén Yǒng Shēng",
        translation: "Death's End (Three-Body III)",
        translationFr: "La Mort Immortelle (3e tome Trisolaris)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 死神永生 »",
      choices: ["La Mort Immortelle (3e tome Trisolaris)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-b75dbb2c",
    level: "hsk3",
    hanzi: "每天",
    pinyin: "měi tiān",
    translation: "every day",
    translationFr: "chaque jour",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "每天",
        pinyin: "měi tiān",
        translation: "every day",
        translationFr: "chaque jour"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 每天 »",
      choices: ["chaque jour", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-bf022376",
    level: "hsk6",
    hanzi: "比...大",
    pinyin: "bǐ... dà",
    translation: "bigger than...",
    translationFr: "plus grand que...",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "比...大",
        pinyin: "bǐ... dà",
        translation: "bigger than...",
        translationFr: "plus grand que..."
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 比...大 »",
      choices: ["plus grand que...", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-91c5e5c0",
    level: "hsk6",
    hanzi: "比...高",
    pinyin: "bǐ... gāo",
    translation: "taller than...",
    translationFr: "plus haut que...",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "比...高",
        pinyin: "bǐ... gāo",
        translation: "taller than...",
        translationFr: "plus haut que..."
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 比...高 »",
      choices: ["plus haut que...", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-13c16e03",
    level: "hsk4",
    hanzi: "毛泽东",
    pinyin: "Máo Zédōng",
    translation: "Mao Zedong",
    translationFr: "Mao Zedong",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "毛泽东",
        pinyin: "Máo Zédōng",
        translation: "Mao Zedong",
        translationFr: "Mao Zedong"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 毛泽东 »",
      choices: ["Mao Zedong", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-0d540ce7",
    level: "hsk5",
    hanzi: "气候变化",
    pinyin: "qìhòu biàn huà",
    translation: "climate change",
    translationFr: "changement climatique",
    category: "idiom",
    examples: [
      {
        hanzi: "气候变化",
        pinyin: "qìhòu biàn huà",
        translation: "climate change",
        translationFr: "changement climatique"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 气候变化 »",
      choices: ["changement climatique", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-203679a3",
    level: "hsk3",
    hanzi: "气功",
    pinyin: "qì gōng",
    translation: "qigong",
    translationFr: "qigong",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "气功",
        pinyin: "qì gōng",
        translation: "qigong",
        translationFr: "qigong"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 气功 »",
      choices: ["qigong", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-35ad3337",
    level: "hsk4",
    hanzi: "水墨画",
    pinyin: "shuǐ mò huà",
    translation: "ink-wash painting",
    translationFr: "peinture à l'encre",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "水墨画",
        pinyin: "shuǐ mò huà",
        translation: "ink-wash painting",
        translationFr: "peinture à l'encre"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 水墨画 »",
      choices: ["peinture à l'encre", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-f1a46681",
    level: "hsk4",
    hanzi: "求职信",
    pinyin: "qiúzhí xìn",
    translation: "cover letter",
    translationFr: "lettre de motivation",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "求职信",
        pinyin: "qiúzhí xìn",
        translation: "cover letter",
        translationFr: "lettre de motivation"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 求职信 »",
      choices: ["lettre de motivation", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-5322b892",
    level: "hsk3",
    hanzi: "汉",
    pinyin: "Hàn",
    translation: "Han (ethnicity/dynasty)",
    translationFr: "Han (peuple/dynastie)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "汉",
        pinyin: "Hàn",
        translation: "Han (ethnicity/dynasty)",
        translationFr: "Han (peuple/dynastie)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 汉 »",
      choices: ["Han (peuple/dynastie)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-0015f9a8",
    level: "hsk3",
    hanzi: "江湖",
    pinyin: "jiāng hú",
    translation: "jianghu (underworld of wanderers)",
    translationFr: "monde flottant (rivières et lacs)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "江湖",
        pinyin: "jiāng hú",
        translation: "jianghu (underworld of wanderers)",
        translationFr: "monde flottant (rivières et lacs)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 江湖 »",
      choices: ["monde flottant (rivières et lacs)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-c6206d69",
    level: "hsk3",
    hanzi: "没",
    pinyin: "méi",
    translation: "not (with 有/past actions)",
    translationFr: "ne...pas (négation avec 有/action passée)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "没",
        pinyin: "méi",
        translation: "not (with 有/past actions)",
        translationFr: "ne...pas (négation avec 有/action passée)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 没 »",
      choices: ["ne...pas (négation avec 有/action passée)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-c2108b3d",
    level: "hsk3",
    hanzi: "没人",
    pinyin: "méi rén",
    translation: "nobody",
    translationFr: "personne",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "没人",
        pinyin: "méi rén",
        translation: "nobody",
        translationFr: "personne"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 没人 »",
      choices: ["personne", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-c9e744a0",
    level: "hsk4",
    hanzi: "没什么",
    pinyin: "méi shénme",
    translation: "nothing special",
    translationFr: "rien de spécial",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "没什么",
        pinyin: "méi shénme",
        translation: "nothing special",
        translationFr: "rien de spécial"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 没什么 »",
      choices: ["rien de spécial", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-52f1035e",
    level: "hsk3",
    hanzi: "没去",
    pinyin: "méi qù",
    translation: "didn't go",
    translationFr: "n'est pas allé",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "没去",
        pinyin: "méi qù",
        translation: "didn't go",
        translationFr: "n'est pas allé"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 没去 »",
      choices: ["n'est pas allé", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-37ac3594",
    level: "hsk4",
    hanzi: "没去过",
    pinyin: "méi qù guo",
    translation: "never been",
    translationFr: "jamais allé",
    category: "grammar",
    examples: [
      {
        hanzi: "没去过",
        pinyin: "méi qù guo",
        translation: "never been",
        translationFr: "jamais allé"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 没去过 »",
      choices: ["jamais allé", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["grammar", "supplement", "cecr-v4"],
    theme: "grammaire"
  },
  {
    id: "supp-v4-bb91c804",
    level: "hsk3",
    hanzi: "没吃",
    pinyin: "méi chī",
    translation: "didn't eat",
    translationFr: "n'a pas mangé",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "没吃",
        pinyin: "méi chī",
        translation: "didn't eat",
        translationFr: "n'a pas mangé"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 没吃 »",
      choices: ["n'a pas mangé", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-7822869d",
    level: "hsk4",
    hanzi: "没吃过",
    pinyin: "méi chī guo",
    translation: "never eaten",
    translationFr: "jamais mangé",
    category: "grammar",
    examples: [
      {
        hanzi: "没吃过",
        pinyin: "méi chī guo",
        translation: "never eaten",
        translationFr: "jamais mangé"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 没吃过 »",
      choices: ["jamais mangé", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["grammar", "supplement", "cecr-v4"],
    theme: "grammaire"
  },
  {
    id: "supp-v4-b00ac808",
    level: "hsk6",
    hanzi: "没有...高",
    pinyin: "méi yǒu... gāo",
    translation: "not as tall as...",
    translationFr: "pas aussi haut que...",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "没有...高",
        pinyin: "méi yǒu... gāo",
        translation: "not as tall as...",
        translationFr: "pas aussi haut que..."
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 没有...高 »",
      choices: ["pas aussi haut que...", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-3395b244",
    level: "hsk5",
    hanzi: "没有没有",
    pinyin: "méi yǒu méi yǒu",
    translation: "not at all (modest)",
    translationFr: "non non (modeste)",
    category: "idiom",
    examples: [
      {
        hanzi: "没有没有",
        pinyin: "méi yǒu méi yǒu",
        translation: "not at all (modest)",
        translationFr: "non non (modeste)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 没有没有 »",
      choices: ["non non (modeste)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-acbd93a6",
    level: "hsk3",
    hanzi: "没看",
    pinyin: "méi kàn",
    translation: "didn't watch",
    translationFr: "n'a pas regardé",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "没看",
        pinyin: "méi kàn",
        translation: "didn't watch",
        translationFr: "n'a pas regardé"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 没看 »",
      choices: ["n'a pas regardé", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-ab395f5d",
    level: "hsk3",
    hanzi: "没过",
    pinyin: "méi guò",
    translation: "haven't yet",
    translationFr: "pas encore (achevé)",
    category: "grammar",
    examples: [
      {
        hanzi: "没过",
        pinyin: "méi guò",
        translation: "haven't yet",
        translationFr: "pas encore (achevé)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 没过 »",
      choices: ["pas encore (achevé)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["grammar", "supplement", "cecr-v4"],
    theme: "grammaire"
  },
  {
    id: "supp-v4-99c2200a",
    level: "hsk3",
    hanzi: "没钱",
    pinyin: "méi qián",
    translation: "no money",
    translationFr: "pas d'argent",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "没钱",
        pinyin: "méi qián",
        translation: "no money",
        translationFr: "pas d'argent"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 没钱 »",
      choices: ["pas d'argent", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-eda1cd29",
    level: "hsk5",
    hanzi: "注音符号",
    pinyin: "zhùyīn fúhào",
    translation: "Bopomofo (Zhuyin)",
    translationFr: "bopomofo (Taïwan)",
    category: "idiom",
    examples: [
      {
        hanzi: "注音符号",
        pinyin: "zhùyīn fúhào",
        translation: "Bopomofo (Zhuyin)",
        translationFr: "bopomofo (Taïwan)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 注音符号 »",
      choices: ["bopomofo (Taïwan)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-3a3813f6",
    level: "hsk4",
    hanzi: "洗干净",
    pinyin: "xǐ gānjìng",
    translation: "wash clean",
    translationFr: "laver proprement",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "洗干净",
        pinyin: "xǐ gānjìng",
        translation: "wash clean",
        translationFr: "laver proprement"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 洗干净 »",
      choices: ["laver proprement", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-ab80e11b",
    level: "hsk3",
    hanzi: "洗脸",
    pinyin: "xǐ liǎn",
    translation: "wash face",
    translationFr: "se laver le visage",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "洗脸",
        pinyin: "xǐ liǎn",
        translation: "wash face",
        translationFr: "se laver le visage"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 洗脸 »",
      choices: ["se laver le visage", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-3aa25abe",
    level: "hsk3",
    hanzi: "活着",
    pinyin: "Huó zhe",
    translation: "To Live (Yu Hua novel)",
    translationFr: "Vivre ! (roman Yu Hua)",
    category: "grammar",
    examples: [
      {
        hanzi: "活着",
        pinyin: "Huó zhe",
        translation: "To Live (Yu Hua novel)",
        translationFr: "Vivre ! (roman Yu Hua)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 活着 »",
      choices: ["Vivre ! (roman Yu Hua)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["grammar", "supplement", "cecr-v4"],
    theme: "grammaire"
  },
  {
    id: "supp-v4-b69cd8e1",
    level: "hsk5",
    hanzi: "流浪地球",
    pinyin: "Liúlàng Dìqiú",
    translation: "The Wandering Earth",
    translationFr: "La Terre Errante (Liu Cixin)",
    category: "idiom",
    examples: [
      {
        hanzi: "流浪地球",
        pinyin: "Liúlàng Dìqiú",
        translation: "The Wandering Earth",
        translationFr: "La Terre Errante (Liu Cixin)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 流浪地球 »",
      choices: ["La Terre Errante (Liu Cixin)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-8ad132b0",
    level: "hsk6",
    hanzi: "海内存知己",
    pinyin: "hǎi nèi cún zhī jǐ",
    translation: "within the seas, a true friend",
    translationFr: "dans les quatre mers, un ami (Wang Bo)",
    category: "idiom",
    examples: [
      {
        hanzi: "海内存知己",
        pinyin: "hǎi nèi cún zhī jǐ",
        translation: "within the seas, a true friend",
        translationFr: "dans les quatre mers, un ami (Wang Bo)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 海内存知己 »",
      choices: ["dans les quatre mers, un ami (Wang Bo)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-440c82d9",
    level: "hsk3",
    hanzi: "海归",
    pinyin: "hǎi guī",
    translation: "sea turtle (returnee)",
    translationFr: "rapatrié (étude à l'étranger)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "海归",
        pinyin: "hǎi guī",
        translation: "sea turtle (returnee)",
        translationFr: "rapatrié (étude à l'étranger)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 海归 »",
      choices: ["rapatrié (étude à l'étranger)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-48012260",
    level: "hsk3",
    hanzi: "淘宝",
    pinyin: "Táobǎo",
    translation: "Taobao",
    translationFr: "Taobao",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "淘宝",
        pinyin: "Táobǎo",
        translation: "Taobao",
        translationFr: "Taobao"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 淘宝 »",
      choices: ["Taobao", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-0990b1bc",
    level: "hsk3",
    hanzi: "清华",
    pinyin: "Qīng Huá",
    translation: "Tsinghua (University)",
    translationFr: "Tsinghua (Université)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "清华",
        pinyin: "Qīng Huá",
        translation: "Tsinghua (University)",
        translationFr: "Tsinghua (Université)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 清华 »",
      choices: ["Tsinghua (Université)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-56336974",
    level: "hsk5",
    hanzi: "清华大学",
    pinyin: "Qīnghuá dàxué",
    translation: "Tsinghua University",
    translationFr: "Université Tsinghua",
    category: "idiom",
    examples: [
      {
        hanzi: "清华大学",
        pinyin: "Qīnghuá dàxué",
        translation: "Tsinghua University",
        translationFr: "Université Tsinghua"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 清华大学 »",
      choices: ["Université Tsinghua", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-e0c1a0ce",
    level: "hsk5",
    hanzi: "温室气体",
    pinyin: "wēn shì qì tǐ",
    translation: "greenhouse gas",
    translationFr: "gaz à effet de serre",
    category: "idiom",
    examples: [
      {
        hanzi: "温室气体",
        pinyin: "wēn shì qì tǐ",
        translation: "greenhouse gas",
        translationFr: "gaz à effet de serre"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 温室气体 »",
      choices: ["gaz à effet de serre", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-d412965b",
    level: "hsk3",
    hanzi: "渴了",
    pinyin: "kě le",
    translation: "got thirsty",
    translationFr: "avoir soif",
    category: "grammar",
    examples: [
      {
        hanzi: "渴了",
        pinyin: "kě le",
        translation: "got thirsty",
        translationFr: "avoir soif"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 渴了 »",
      choices: ["avoir soif", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["grammar", "supplement", "cecr-v4"],
    theme: "grammaire"
  },
  {
    id: "supp-v4-effe4167",
    level: "hsk3",
    hanzi: "满月",
    pinyin: "mǎn yuè",
    translation: "full moon",
    translationFr: "pleine lune",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "满月",
        pinyin: "mǎn yuè",
        translation: "full moon",
        translationFr: "pleine lune"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 满月 »",
      choices: ["pleine lune", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-d4b55316",
    level: "hsk4",
    hanzi: "漂亮的",
    pinyin: "piàoliang de",
    translation: "pretty",
    translationFr: "joli(e)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "漂亮的",
        pinyin: "piàoliang de",
        translation: "pretty",
        translationFr: "joli(e)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 漂亮的 »",
      choices: ["joli(e)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-0b253ee2",
    level: "hsk3",
    hanzi: "炸",
    pinyin: "zhá",
    translation: "deep-fry",
    translationFr: "frire",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "炸",
        pinyin: "zhá",
        translation: "deep-fry",
        translationFr: "frire"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 炸 »",
      choices: ["frire", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-946959ec",
    level: "hsk3",
    hanzi: "热水",
    pinyin: "rè shuǐ",
    translation: "hot water",
    translationFr: "eau chaude",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "热水",
        pinyin: "rè shuǐ",
        translation: "hot water",
        translationFr: "eau chaude"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 热水 »",
      choices: ["eau chaude", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-848d19c0",
    level: "hsk4",
    hanzi: "物联网",
    pinyin: "wù lián wǎng",
    translation: "Internet of Things",
    translationFr: "Internet des objets",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "物联网",
        pinyin: "wù lián wǎng",
        translation: "Internet of Things",
        translationFr: "Internet des objets"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 物联网 »",
      choices: ["Internet des objets", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-c968ad73",
    level: "hsk5",
    hanzi: "狂人日记",
    pinyin: "Kuángrén Rìjì",
    translation: "Diary of a Madman (Lu Xun)",
    translationFr: "Journal d'un fou (Lu Xun)",
    category: "idiom",
    examples: [
      {
        hanzi: "狂人日记",
        pinyin: "Kuángrén Rìjì",
        translation: "Diary of a Madman (Lu Xun)",
        translationFr: "Journal d'un fou (Lu Xun)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 狂人日记 »",
      choices: ["Journal d'un fou (Lu Xun)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-e66bc81d",
    level: "hsk4",
    hanzi: "独角兽",
    pinyin: "dú jiǎo shòu",
    translation: "unicorn (startup)",
    translationFr: "licorne (startup)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "独角兽",
        pinyin: "dú jiǎo shòu",
        translation: "unicorn (startup)",
        translationFr: "licorne (startup)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 独角兽 »",
      choices: ["licorne (startup)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-8510466b",
    level: "hsk3",
    hanzi: "猴",
    pinyin: "hóu",
    translation: "monkey (zodiac)",
    translationFr: "singe (zodiaque)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "猴",
        pinyin: "hóu",
        translation: "monkey (zodiac)",
        translationFr: "singe (zodiaque)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 猴 »",
      choices: ["singe (zodiaque)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-326f81c1",
    level: "hsk4",
    hanzi: "王羲之",
    pinyin: "Wáng Xīzhī",
    translation: "Wang Xizhi (calligrapher)",
    translationFr: "Wang Xizhi (calligraphe, Jin)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "王羲之",
        pinyin: "Wáng Xīzhī",
        translation: "Wang Xizhi (calligrapher)",
        translationFr: "Wang Xizhi (calligraphe, Jin)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 王羲之 »",
      choices: ["Wang Xizhi (calligraphe, Jin)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-5380b60c",
    level: "hsk3",
    hanzi: "理综",
    pinyin: "lǐ zōng",
    translation: "science comprehensive exam",
    translationFr: "épreuve combinée sciences dures (gaokao)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "理综",
        pinyin: "lǐ zōng",
        translation: "science comprehensive exam",
        translationFr: "épreuve combinée sciences dures (gaokao)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 理综 »",
      choices: ["épreuve combinée sciences dures (gaokao)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-54a58c1d",
    level: "hsk5",
    hanzi: "生死疲劳",
    pinyin: "Shēng Sǐ Píláo",
    translation: "Life and Death are Wearing Me Out",
    translationFr: "Vie et mort (Mo Yan)",
    category: "idiom",
    examples: [
      {
        hanzi: "生死疲劳",
        pinyin: "Shēng Sǐ Píláo",
        translation: "Life and Death are Wearing Me Out",
        translationFr: "Vie et mort (Mo Yan)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 生死疲劳 »",
      choices: ["Vie et mort (Mo Yan)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-cf7e4d95",
    level: "hsk4",
    hanzi: "电影节",
    pinyin: "diànyǐng jié",
    translation: "film festival",
    translationFr: "festival de cinéma",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "电影节",
        pinyin: "diànyǐng jié",
        translation: "film festival",
        translationFr: "festival de cinéma"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 电影节 »",
      choices: ["festival de cinéma", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-7b352466",
    level: "hsk3",
    hanzi: "病了",
    pinyin: "bìng le",
    translation: "got sick",
    translationFr: "tombé malade",
    category: "grammar",
    examples: [
      {
        hanzi: "病了",
        pinyin: "bìng le",
        translation: "got sick",
        translationFr: "tombé malade"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 病了 »",
      choices: ["tombé malade", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["grammar", "supplement", "cecr-v4"],
    theme: "grammaire"
  },
  {
    id: "supp-v4-3a66d5ff",
    level: "hsk3",
    hanzi: "盖章",
    pinyin: "gài zhāng",
    translation: "stamp (seal)",
    translationFr: "apposer un sceau",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "盖章",
        pinyin: "gài zhāng",
        translation: "stamp (seal)",
        translationFr: "apposer un sceau"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 盖章 »",
      choices: ["apposer un sceau", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-51bca7f5",
    level: "hsk3",
    hanzi: "看了",
    pinyin: "kàn le",
    translation: "watched",
    translationFr: "regardé",
    category: "grammar",
    examples: [
      {
        hanzi: "看了",
        pinyin: "kàn le",
        translation: "watched",
        translationFr: "regardé"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 看了 »",
      choices: ["regardé", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["grammar", "supplement", "cecr-v4"],
    theme: "grammaire"
  },
  {
    id: "supp-v4-0343c5d3",
    level: "hsk3",
    hanzi: "看到",
    pinyin: "kàn dào",
    translation: "see",
    translationFr: "voir",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "看到",
        pinyin: "kàn dào",
        translation: "see",
        translationFr: "voir"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 看到 »",
      choices: ["voir", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-c84244dd",
    level: "hsk4",
    hanzi: "看起来",
    pinyin: "kàn qǐlái",
    translation: "looks like",
    translationFr: "avoir l'air",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "看起来",
        pinyin: "kàn qǐlái",
        translation: "looks like",
        translationFr: "avoir l'air"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 看起来 »",
      choices: ["avoir l'air", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-d8a7e112",
    level: "hsk3",
    hanzi: "看过",
    pinyin: "kàn guo",
    translation: "have seen",
    translationFr: "avoir déjà vu",
    category: "grammar",
    examples: [
      {
        hanzi: "看过",
        pinyin: "kàn guo",
        translation: "have seen",
        translationFr: "avoir déjà vu"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 看过 »",
      choices: ["avoir déjà vu", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["grammar", "supplement", "cecr-v4"],
    theme: "grammaire"
  },
  {
    id: "supp-v4-10041aa6",
    level: "hsk3",
    hanzi: "真好",
    pinyin: "zhēn hǎo",
    translation: "really good",
    translationFr: "vraiment bien",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "真好",
        pinyin: "zhēn hǎo",
        translation: "really good",
        translationFr: "vraiment bien"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 真好 »",
      choices: ["vraiment bien", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-ea06d04f",
    level: "hsk4",
    hanzi: "睡得晚",
    pinyin: "shuì de wǎn",
    translation: "sleep late",
    translationFr: "dormir tard",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "睡得晚",
        pinyin: "shuì de wǎn",
        translation: "sleep late",
        translationFr: "dormir tard"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 睡得晚 »",
      choices: ["dormir tard", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-91a7cb09",
    level: "hsk3",
    hanzi: "知乎",
    pinyin: "Zhīhū",
    translation: "Zhihu (Chinese Quora)",
    translationFr: "Zhihu (Quora chinois)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "知乎",
        pinyin: "Zhīhū",
        translation: "Zhihu (Chinese Quora)",
        translationFr: "Zhihu (Quora chinois)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 知乎 »",
      choices: ["Zhihu (Quora chinois)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-04c75f27",
    level: "hsk3",
    hanzi: "秦",
    pinyin: "Qín",
    translation: "Qin dynasty",
    translationFr: "dynastie Qin (-221/-206)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "秦",
        pinyin: "Qín",
        translation: "Qin dynasty",
        translationFr: "dynastie Qin (-221/-206)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 秦 »",
      choices: ["dynastie Qin (-221/-206)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-48bd373e",
    level: "hsk4",
    hanzi: "秦始皇",
    pinyin: "Qín Shǐ Huáng",
    translation: "Qin Shi Huang (first emperor)",
    translationFr: "Empereur Qin Shi Huang",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "秦始皇",
        pinyin: "Qín Shǐ Huáng",
        translation: "Qin Shi Huang (first emperor)",
        translationFr: "Empereur Qin Shi Huang"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 秦始皇 »",
      choices: ["Empereur Qin Shi Huang", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-b0d51011",
    level: "hsk5",
    hanzi: "空气污染",
    pinyin: "kōngqì wūrǎn",
    translation: "air pollution",
    translationFr: "pollution atmosphérique",
    category: "idiom",
    examples: [
      {
        hanzi: "空气污染",
        pinyin: "kōngqì wūrǎn",
        translation: "air pollution",
        translationFr: "pollution atmosphérique"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 空气污染 »",
      choices: ["pollution atmosphérique", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-63e1141d",
    level: "hsk5",
    hanzi: "空气质量",
    pinyin: "kōngqì zhìliàng",
    translation: "air quality",
    translationFr: "qualité de l'air",
    category: "idiom",
    examples: [
      {
        hanzi: "空气质量",
        pinyin: "kōngqì zhìliàng",
        translation: "air quality",
        translationFr: "qualité de l'air"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 空气质量 »",
      choices: ["qualité de l'air", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-865b3534",
    level: "hsk3",
    hanzi: "笔画",
    pinyin: "bǐ huà",
    translation: "stroke",
    translationFr: "trait (calligraphie)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "笔画",
        pinyin: "bǐ huà",
        translation: "stroke",
        translationFr: "trait (calligraphie)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 笔画 »",
      choices: ["trait (calligraphie)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-dadeea53",
    level: "hsk3",
    hanzi: "等",
    pinyin: "děng",
    translation: "wait / etc.",
    translationFr: "attendre, etc.",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "等",
        pinyin: "děng",
        translation: "wait / etc.",
        translationFr: "attendre, etc."
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 等 »",
      choices: ["attendre, etc.", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-5c9db952",
    level: "hsk3",
    hanzi: "等了",
    pinyin: "děng le",
    translation: "waited",
    translationFr: "attendu",
    category: "grammar",
    examples: [
      {
        hanzi: "等了",
        pinyin: "děng le",
        translation: "waited",
        translationFr: "attendu"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 等了 »",
      choices: ["attendu", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["grammar", "supplement", "cecr-v4"],
    theme: "grammaire"
  },
  {
    id: "supp-v4-005bdc8b",
    level: "hsk3",
    hanzi: "算法",
    pinyin: "suàn fǎ",
    translation: "algorithm",
    translationFr: "algorithme",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "算法",
        pinyin: "suàn fǎ",
        translation: "algorithm",
        translationFr: "algorithme"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 算法 »",
      choices: ["algorithme", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-82f52da9",
    level: "hsk3",
    hanzi: "粤语",
    pinyin: "Yuè yǔ",
    translation: "Cantonese",
    translationFr: "cantonais",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "粤语",
        pinyin: "Yuè yǔ",
        translation: "Cantonese",
        translationFr: "cantonais"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 粤语 »",
      choices: ["cantonais", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-43e2c0f3",
    level: "hsk5",
    hanzi: "糖醋里脊",
    pinyin: "táng cù lǐ jǐ",
    translation: "sweet and sour pork",
    translationFr: "filet de porc aigre-doux",
    category: "idiom",
    examples: [
      {
        hanzi: "糖醋里脊",
        pinyin: "táng cù lǐ jǐ",
        translation: "sweet and sour pork",
        translationFr: "filet de porc aigre-doux"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 糖醋里脊 »",
      choices: ["filet de porc aigre-doux", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-29d28235",
    level: "hsk3",
    hanzi: "累了",
    pinyin: "lèi le",
    translation: "got tired",
    translationFr: "fatigué",
    category: "grammar",
    examples: [
      {
        hanzi: "累了",
        pinyin: "lèi le",
        translation: "got tired",
        translationFr: "fatigué"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 累了 »",
      choices: ["fatigué", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["grammar", "supplement", "cecr-v4"],
    theme: "grammaire"
  },
  {
    id: "supp-v4-f11276a0",
    level: "hsk3",
    hanzi: "红的",
    pinyin: "hóng de",
    translation: "the red one",
    translationFr: "le rouge",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "红的",
        pinyin: "hóng de",
        translation: "the red one",
        translationFr: "le rouge"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 红的 »",
      choices: ["le rouge", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-0e7f6a2a",
    level: "hsk4",
    hanzi: "红高粱",
    pinyin: "Hóng Gāoliang",
    translation: "Red Sorghum (Mo Yan)",
    translationFr: "Le Sorgho Rouge (Mo Yan)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "红高粱",
        pinyin: "Hóng Gāoliang",
        translation: "Red Sorghum (Mo Yan)",
        translationFr: "Le Sorgho Rouge (Mo Yan)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 红高粱 »",
      choices: ["Le Sorgho Rouge (Mo Yan)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-ff7be876",
    level: "hsk4",
    hanzi: "纪念品",
    pinyin: "jìniàn pǐn",
    translation: "souvenir",
    translationFr: "souvenir",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "纪念品",
        pinyin: "jìniàn pǐn",
        translation: "souvenir",
        translationFr: "souvenir"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 纪念品 »",
      choices: ["souvenir", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-78e55f06",
    level: "hsk3",
    hanzi: "纵使",
    pinyin: "zòng shǐ",
    translation: "even if (formal)",
    translationFr: "même si (formel)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "纵使",
        pinyin: "zòng shǐ",
        translation: "even if (formal)",
        translationFr: "même si (formel)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 纵使 »",
      choices: ["même si (formel)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-2e490dfe",
    level: "hsk5",
    hanzi: "经济增长",
    pinyin: "jīngjì zēng zhǎng",
    translation: "economic growth",
    translationFr: "croissance économique",
    category: "idiom",
    examples: [
      {
        hanzi: "经济增长",
        pinyin: "jīngjì zēng zhǎng",
        translation: "economic growth",
        translationFr: "croissance économique"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 经济增长 »",
      choices: ["croissance économique", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-8ef64c06",
    level: "hsk3",
    hanzi: "经络",
    pinyin: "jīng luò",
    translation: "meridians (TCM)",
    translationFr: "méridiens (MTC)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "经络",
        pinyin: "jīng luò",
        translation: "meridians (TCM)",
        translationFr: "méridiens (MTC)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 经络 »",
      choices: ["méridiens (MTC)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-95a99584",
    level: "hsk4",
    hanzi: "结婚率",
    pinyin: "jiéhūn lǜ",
    translation: "marriage rate",
    translationFr: "taux de mariage",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "结婚率",
        pinyin: "jiéhūn lǜ",
        translation: "marriage rate",
        translationFr: "taux de mariage"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 结婚率 »",
      choices: ["taux de mariage", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-53ee84e9",
    level: "hsk4",
    hanzi: "给面子",
    pinyin: "gěi miànzi",
    translation: "give face",
    translationFr: "donner la face",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "给面子",
        pinyin: "gěi miànzi",
        translation: "give face",
        translationFr: "donner la face"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 给面子 »",
      choices: ["donner la face", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-4c9c6707",
    level: "hsk3",
    hanzi: "绝句",
    pinyin: "jué jù",
    translation: "quatrain",
    translationFr: "quatrain (poésie)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "绝句",
        pinyin: "jué jù",
        translation: "quatrain",
        translationFr: "quatrain (poésie)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 绝句 »",
      choices: ["quatrain (poésie)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-9ef8c2f7",
    level: "hsk5",
    hanzi: "综上所述",
    pinyin: "zōng shàng suǒ shù",
    translation: "in summary / to conclude",
    translationFr: "en somme / en conclusion",
    category: "idiom",
    examples: [
      {
        hanzi: "综上所述",
        pinyin: "zōng shàng suǒ shù",
        translation: "in summary / to conclude",
        translationFr: "en somme / en conclusion"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 综上所述 »",
      choices: ["en somme / en conclusion", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-fb1b5d39",
    level: "hsk3",
    hanzi: "网红",
    pinyin: "wǎng hóng",
    translation: "internet celebrity",
    translationFr: "influenceur, star du net",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "网红",
        pinyin: "wǎng hóng",
        translation: "internet celebrity",
        translationFr: "influenceur, star du net"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 网红 »",
      choices: ["influenceur, star du net", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-3e509109",
    level: "hsk5",
    hanzi: "网络安全",
    pinyin: "wǎngluò ān quán",
    translation: "cybersecurity",
    translationFr: "cybersécurité",
    category: "idiom",
    examples: [
      {
        hanzi: "网络安全",
        pinyin: "wǎngluò ān quán",
        translation: "cybersecurity",
        translationFr: "cybersécurité"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 网络安全 »",
      choices: ["cybersécurité", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-f2192979",
    level: "hsk6",
    hanzi: "网络安全法",
    pinyin: "Wǎngluò Ānquán Fǎ",
    translation: "Cybersecurity Law",
    translationFr: "Loi sur la cybersécurité",
    category: "idiom",
    examples: [
      {
        hanzi: "网络安全法",
        pinyin: "Wǎngluò Ānquán Fǎ",
        translation: "Cybersecurity Law",
        translationFr: "Loi sur la cybersécurité"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 网络安全法 »",
      choices: ["Loi sur la cybersécurité", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-e6988c8c",
    level: "hsk3",
    hanzi: "翻墙",
    pinyin: "fān qiáng",
    translation: "jump the Great Firewall",
    translationFr: "contourner le Grand Pare-feu",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "翻墙",
        pinyin: "fān qiáng",
        translation: "jump the Great Firewall",
        translationFr: "contourner le Grand Pare-feu"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 翻墙 »",
      choices: ["contourner le Grand Pare-feu", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-c221fda6",
    level: "hsk3",
    hanzi: "老了",
    pinyin: "lǎo le",
    translation: "got old",
    translationFr: "vieilli",
    category: "grammar",
    examples: [
      {
        hanzi: "老了",
        pinyin: "lǎo le",
        translation: "got old",
        translationFr: "vieilli"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 老了 »",
      choices: ["vieilli", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["grammar", "supplement", "cecr-v4"],
    theme: "grammaire"
  },
  {
    id: "supp-v4-ec8a9f68",
    level: "hsk4",
    hanzi: "老师的",
    pinyin: "lǎoshī de",
    translation: "the teacher's",
    translationFr: "du prof",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "老师的",
        pinyin: "lǎoshī de",
        translation: "the teacher's",
        translationFr: "du prof"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 老师的 »",
      choices: ["du prof", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-aff2ae69",
    level: "hsk3",
    hanzi: "背",
    pinyin: "bèi",
    translation: "recite / back",
    translationFr: "réciter, dos",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "背",
        pinyin: "bèi",
        translation: "recite / back",
        translationFr: "réciter, dos"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 背 »",
      choices: ["réciter, dos", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-80befbe8",
    level: "hsk4",
    hanzi: "能不能",
    pinyin: "néng bu néng",
    translation: "can or can't?",
    translationFr: "pouvoir ou non ?",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "能不能",
        pinyin: "néng bu néng",
        translation: "can or can't?",
        translationFr: "pouvoir ou non ?"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 能不能 »",
      choices: ["pouvoir ou non ?", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-2fe25952",
    level: "hsk3",
    hanzi: "能做",
    pinyin: "néng zuò",
    translation: "can do",
    translationFr: "pouvoir faire",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "能做",
        pinyin: "néng zuò",
        translation: "can do",
        translationFr: "pouvoir faire"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 能做 »",
      choices: ["pouvoir faire", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-5762933b",
    level: "hsk3",
    hanzi: "能吃",
    pinyin: "néng chī",
    translation: "can eat",
    translationFr: "pouvoir manger",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "能吃",
        pinyin: "néng chī",
        translation: "can eat",
        translationFr: "pouvoir manger"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 能吃 »",
      choices: ["pouvoir manger", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-9e21e483",
    level: "hsk3",
    hanzi: "能帮",
    pinyin: "néng bāng",
    translation: "can help",
    translationFr: "pouvoir aider",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "能帮",
        pinyin: "néng bāng",
        translation: "can help",
        translationFr: "pouvoir aider"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 能帮 »",
      choices: ["pouvoir aider", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-5859271b",
    level: "hsk3",
    hanzi: "能来",
    pinyin: "néng lái",
    translation: "can come",
    translationFr: "pouvoir venir",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "能来",
        pinyin: "néng lái",
        translation: "can come",
        translationFr: "pouvoir venir"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 能来 »",
      choices: ["pouvoir venir", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-e6f9b34a",
    level: "hsk4",
    hanzi: "能解决",
    pinyin: "néng jiějué",
    translation: "can solve",
    translationFr: "pouvoir résoudre",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "能解决",
        pinyin: "néng jiějué",
        translation: "can solve",
        translationFr: "pouvoir résoudre"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 能解决 »",
      choices: ["pouvoir résoudre", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-34f57707",
    level: "hsk3",
    hanzi: "英文",
    pinyin: "Yīng wén",
    translation: "English (written)",
    translationFr: "anglais (écrit)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "英文",
        pinyin: "Yīng wén",
        translation: "English (written)",
        translationFr: "anglais (écrit)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 英文 »",
      choices: ["anglais (écrit)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-bc81c558",
    level: "hsk3",
    hanzi: "草书",
    pinyin: "cǎo shū",
    translation: "cursive script",
    translationFr: "écriture cursive (herbeuse)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "草书",
        pinyin: "cǎo shū",
        translation: "cursive script",
        translationFr: "écriture cursive (herbeuse)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 草书 »",
      choices: ["écriture cursive (herbeuse)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-7c20b5f6",
    level: "hsk5",
    hanzi: "草船借箭",
    pinyin: "cǎo chuán jiè jiàn",
    translation: "borrow arrows with straw boats",
    translationFr: "emprunter des flèches avec des bateaux de paille",
    category: "idiom",
    examples: [
      {
        hanzi: "草船借箭",
        pinyin: "cǎo chuán jiè jiàn",
        translation: "borrow arrows with straw boats",
        translationFr: "emprunter des flèches avec des bateaux de paille"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 草船借箭 »",
      choices: ["emprunter des flèches avec des bateaux de paille", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-889a92e7",
    level: "hsk3",
    hanzi: "药房",
    pinyin: "yào fáng",
    translation: "pharmacy",
    translationFr: "pharmacie",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "药房",
        pinyin: "yào fáng",
        translation: "pharmacy",
        translationFr: "pharmacie"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 药房 »",
      choices: ["pharmacie", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-bf3aeae4",
    level: "hsk3",
    hanzi: "药片",
    pinyin: "yào piàn",
    translation: "tablet / pill",
    translationFr: "comprimé",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "药片",
        pinyin: "yào piàn",
        translation: "tablet / pill",
        translationFr: "comprimé"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 药片 »",
      choices: ["comprimé", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-cfa37b6f",
    level: "hsk3",
    hanzi: "莫言",
    pinyin: "Mò Yán",
    translation: "Mo Yan (2012 Nobel)",
    translationFr: "Mo Yan (Nobel 2012)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "莫言",
        pinyin: "Mò Yán",
        translation: "Mo Yan (2012 Nobel)",
        translationFr: "Mo Yan (Nobel 2012)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 莫言 »",
      choices: ["Mo Yan (Nobel 2012)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-a7f75e1c",
    level: "hsk3",
    hanzi: "蓝色",
    pinyin: "lán sè",
    translation: "blue",
    translationFr: "bleu",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "蓝色",
        pinyin: "lán sè",
        translation: "blue",
        translationFr: "bleu"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 蓝色 »",
      choices: ["bleu", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-a472ff60",
    level: "hsk3",
    hanzi: "虎",
    pinyin: "hǔ",
    translation: "tiger (zodiac)",
    translationFr: "tigre (zodiaque)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "虎",
        pinyin: "hǔ",
        translation: "tiger (zodiac)",
        translationFr: "tigre (zodiaque)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 虎 »",
      choices: ["tigre (zodiaque)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-7c045e78",
    level: "hsk3",
    hanzi: "表妹",
    pinyin: "biǎo mèi",
    translation: "younger female maternal cousin",
    translationFr: "cousine (côté maternel)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "表妹",
        pinyin: "biǎo mèi",
        translation: "younger female maternal cousin",
        translationFr: "cousine (côté maternel)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 表妹 »",
      choices: ["cousine (côté maternel)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-1345e32c",
    level: "hsk4",
    hanzi: "要工作",
    pinyin: "yào gōngzuò",
    translation: "need to work",
    translationFr: "il faut travailler",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "要工作",
        pinyin: "yào gōngzuò",
        translation: "need to work",
        translationFr: "il faut travailler"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 要工作 »",
      choices: ["il faut travailler", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-21e18bfe",
    level: "hsk5",
    hanzi: "视频通话",
    pinyin: "shìpín tōnghuà",
    translation: "video call",
    translationFr: "appel vidéo",
    category: "idiom",
    examples: [
      {
        hanzi: "视频通话",
        pinyin: "shìpín tōnghuà",
        translation: "video call",
        translationFr: "appel vidéo"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 视频通话 »",
      choices: ["appel vidéo", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-96aa8f7c",
    level: "hsk3",
    hanzi: "订票",
    pinyin: "dìng piào",
    translation: "book a ticket",
    translationFr: "réserver un billet",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "订票",
        pinyin: "dìng piào",
        translation: "book a ticket",
        translationFr: "réserver un billet"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 订票 »",
      choices: ["réserver un billet", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-7a1df068",
    level: "hsk4",
    hanzi: "认真地",
    pinyin: "rènzhēn de",
    translation: "seriously",
    translationFr: "sérieusement",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "认真地",
        pinyin: "rènzhēn de",
        translation: "seriously",
        translationFr: "sérieusement"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 认真地 »",
      choices: ["sérieusement", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-06dc03cb",
    level: "hsk4",
    hanzi: "讲解器",
    pinyin: "jiǎngjiě qì",
    translation: "audio guide",
    translationFr: "audioguide",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "讲解器",
        pinyin: "jiǎngjiě qì",
        translation: "audio guide",
        translationFr: "audioguide"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 讲解器 »",
      choices: ["audioguide", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-cefc5858",
    level: "hsk3",
    hanzi: "论语",
    pinyin: "Lún Yǔ",
    translation: "The Analects",
    translationFr: "Les Entretiens de Confucius",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "论语",
        pinyin: "Lún Yǔ",
        translation: "The Analects",
        translationFr: "Les Entretiens de Confucius"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 论语 »",
      choices: ["Les Entretiens de Confucius", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-4bbf09ab",
    level: "hsk3",
    hanzi: "词牌",
    pinyin: "cí pái",
    translation: "ci tune pattern",
    translationFr: "mélodie-type (poésie ci)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "词牌",
        pinyin: "cí pái",
        translation: "ci tune pattern",
        translationFr: "mélodie-type (poésie ci)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 词牌 »",
      choices: ["mélodie-type (poésie ci)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-829a81de",
    level: "hsk3",
    hanzi: "诗仙",
    pinyin: "shī xiān",
    translation: "Poetry Immortal (Li Bai)",
    translationFr: "Immortel de la poésie (Li Bai)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "诗仙",
        pinyin: "shī xiān",
        translation: "Poetry Immortal (Li Bai)",
        translationFr: "Immortel de la poésie (Li Bai)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 诗仙 »",
      choices: ["Immortel de la poésie (Li Bai)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-b42816dd",
    level: "hsk3",
    hanzi: "诗圣",
    pinyin: "shī shèng",
    translation: "Poetry Sage (Du Fu)",
    translationFr: "Saint de la poésie (Du Fu)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "诗圣",
        pinyin: "shī shèng",
        translation: "Poetry Sage (Du Fu)",
        translationFr: "Saint de la poésie (Du Fu)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 诗圣 »",
      choices: ["Saint de la poésie (Du Fu)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-74869232",
    level: "hsk4",
    hanzi: "说得好",
    pinyin: "shuō de hǎo",
    translation: "well said",
    translationFr: "bien dit",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "说得好",
        pinyin: "shuō de hǎo",
        translation: "well said",
        translationFr: "bien dit"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 说得好 »",
      choices: ["bien dit", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-fa6afa8d",
    level: "hsk4",
    hanzi: "说得对",
    pinyin: "shuō de duì",
    translation: "right you are",
    translationFr: "c'est juste",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "说得对",
        pinyin: "shuō de duì",
        translation: "right you are",
        translationFr: "c'est juste"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 说得对 »",
      choices: ["c'est juste", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-677bdd6c",
    level: "hsk4",
    hanzi: "诸葛亮",
    pinyin: "Zhūgě Liàng",
    translation: "Zhuge Liang (strategist)",
    translationFr: "Zhuge Liang (stratège)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "诸葛亮",
        pinyin: "Zhūgě Liàng",
        translation: "Zhuge Liang (strategist)",
        translationFr: "Zhuge Liang (stratège)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 诸葛亮 »",
      choices: ["Zhuge Liang (stratège)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-46df1884",
    level: "hsk5",
    hanzi: "诺贝尔奖",
    pinyin: "Nuòbèi'ěr jiǎng",
    translation: "Nobel Prize",
    translationFr: "prix Nobel",
    category: "idiom",
    examples: [
      {
        hanzi: "诺贝尔奖",
        pinyin: "Nuòbèi'ěr jiǎng",
        translation: "Nobel Prize",
        translationFr: "prix Nobel"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 诺贝尔奖 »",
      choices: ["prix Nobel", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-ef5ef80e",
    level: "hsk3",
    hanzi: "谁的",
    pinyin: "shéi de",
    translation: "whose",
    translationFr: "à qui",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "谁的",
        pinyin: "shéi de",
        translation: "whose",
        translationFr: "à qui"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 谁的 »",
      choices: ["à qui", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-20b7d88e",
    level: "hsk4",
    hanzi: "谈恋爱",
    pinyin: "tán liàn'ài",
    translation: "date / be in a relationship",
    translationFr: "sortir avec / flirter",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "谈恋爱",
        pinyin: "tán liàn'ài",
        translation: "date / be in a relationship",
        translationFr: "sortir avec / flirter"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 谈恋爱 »",
      choices: ["sortir avec / flirter", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-e0c868ac",
    level: "hsk3",
    hanzi: "谨",
    pinyin: "jǐn",
    translation: "respectfully (letter closing)",
    translationFr: "respectueusement (formule épistolaire)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "谨",
        pinyin: "jǐn",
        translation: "respectfully (letter closing)",
        translationFr: "respectueusement (formule épistolaire)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 谨 »",
      choices: ["respectueusement (formule épistolaire)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-148682ff",
    level: "hsk4",
    hanzi: "贵公司",
    pinyin: "guì gōng sī",
    translation: "your honorable company",
    translationFr: "votre honorable société",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "贵公司",
        pinyin: "guì gōng sī",
        translation: "your honorable company",
        translationFr: "votre honorable société"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 贵公司 »",
      choices: ["votre honorable société", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-01153045",
    level: "hsk4",
    hanzi: "贾樟柯",
    pinyin: "Jiǎ Zhāngkē",
    translation: "Jia Zhangke (director)",
    translationFr: "Jia Zhangke (réalisateur)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "贾樟柯",
        pinyin: "Jiǎ Zhāngkē",
        translation: "Jia Zhangke (director)",
        translationFr: "Jia Zhangke (réalisateur)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 贾樟柯 »",
      choices: ["Jia Zhangke (réalisateur)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-23f5ca2c",
    level: "hsk3",
    hanzi: "赏月",
    pinyin: "shǎng yuè",
    translation: "moon gazing",
    translationFr: "admirer la lune",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "赏月",
        pinyin: "shǎng yuè",
        translation: "moon gazing",
        translationFr: "admirer la lune"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 赏月 »",
      choices: ["admirer la lune", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-0b6b6f9d",
    level: "hsk3",
    hanzi: "走进",
    pinyin: "zǒu jìn",
    translation: "walk into",
    translationFr: "entrer",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "走进",
        pinyin: "zǒu jìn",
        translation: "walk into",
        translationFr: "entrer"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 走进 »",
      choices: ["entrer", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-14aa8d57",
    level: "hsk4",
    hanzi: "跑得快",
    pinyin: "pǎo de kuài",
    translation: "runs fast",
    translationFr: "court vite",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "跑得快",
        pinyin: "pǎo de kuài",
        translation: "runs fast",
        translationFr: "court vite"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 跑得快 »",
      choices: ["court vite", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-06c94c5b",
    level: "hsk3",
    hanzi: "跟谁",
    pinyin: "gēn shéi",
    translation: "with whom",
    translationFr: "avec qui",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "跟谁",
        pinyin: "gēn shéi",
        translation: "with whom",
        translationFr: "avec qui"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 跟谁 »",
      choices: ["avec qui", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-36441558",
    level: "hsk3",
    hanzi: "躺平",
    pinyin: "tǎng píng",
    translation: "lying flat (giving up the rat race)",
    translationFr: "lying flat (refus de la pression)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "躺平",
        pinyin: "tǎng píng",
        translation: "lying flat (giving up the rat race)",
        translationFr: "lying flat (refus de la pression)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 躺平 »",
      choices: ["lying flat (refus de la pression)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-76581b2a",
    level: "hsk3",
    hanzi: "转账",
    pinyin: "zhuǎn zhàng",
    translation: "bank transfer",
    translationFr: "virement",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "转账",
        pinyin: "zhuǎn zhàng",
        translation: "bank transfer",
        translationFr: "virement"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 转账 »",
      choices: ["virement", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-3794e439",
    level: "hsk3",
    hanzi: "轮回",
    pinyin: "lún huí",
    translation: "samsara / reincarnation",
    translationFr: "réincarnation (bouddhisme)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "轮回",
        pinyin: "lún huí",
        translation: "samsara / reincarnation",
        translationFr: "réincarnation (bouddhisme)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 轮回 »",
      choices: ["réincarnation (bouddhisme)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-81a840d9",
    level: "hsk3",
    hanzi: "软卧",
    pinyin: "ruǎn wò",
    translation: "soft sleeper (train)",
    translationFr: "couchette moelleuse (train)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "软卧",
        pinyin: "ruǎn wò",
        translation: "soft sleeper (train)",
        translationFr: "couchette moelleuse (train)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 软卧 »",
      choices: ["couchette moelleuse (train)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-10b1f49c",
    level: "hsk5",
    hanzi: "辛亥革命",
    pinyin: "Xīnhài gémìng",
    translation: "Xinhai Revolution (1911)",
    translationFr: "Révolution de 1911",
    category: "idiom",
    examples: [
      {
        hanzi: "辛亥革命",
        pinyin: "Xīnhài gémìng",
        translation: "Xinhai Revolution (1911)",
        translationFr: "Révolution de 1911"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 辛亥革命 »",
      choices: ["Révolution de 1911", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-6ed4ca8f",
    level: "hsk4",
    hanzi: "辛苦了",
    pinyin: "xīnkǔ le",
    translation: "thanks for your hard work",
    translationFr: "merci pour votre travail",
    category: "grammar",
    examples: [
      {
        hanzi: "辛苦了",
        pinyin: "xīnkǔ le",
        translation: "thanks for your hard work",
        translationFr: "merci pour votre travail"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 辛苦了 »",
      choices: ["merci pour votre travail", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["grammar", "supplement", "cecr-v4"],
    theme: "grammaire"
  },
  {
    id: "supp-v4-dc4a0653",
    level: "hsk3",
    hanzi: "达",
    pinyin: "dá",
    translation: "expressiveness (Yan Fu)",
    translationFr: "fluidité (信达雅)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "达",
        pinyin: "dá",
        translation: "expressiveness (Yan Fu)",
        translationFr: "fluidité (信达雅)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 达 »",
      choices: ["fluidité (信达雅)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-6d325adb",
    level: "hsk4",
    hanzi: "过奖了",
    pinyin: "guò jiǎng le",
    translation: "you flatter me",
    translationFr: "vous me flattez",
    category: "grammar",
    examples: [
      {
        hanzi: "过奖了",
        pinyin: "guò jiǎng le",
        translation: "you flatter me",
        translationFr: "vous me flattez"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 过奖了 »",
      choices: ["vous me flattez", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["grammar", "supplement", "cecr-v4"],
    theme: "grammaire"
  },
  {
    id: "supp-v4-ab1a354f",
    level: "hsk4",
    hanzi: "过马路",
    pinyin: "guò mǎlù",
    translation: "cross the road",
    translationFr: "traverser la rue",
    category: "grammar",
    examples: [
      {
        hanzi: "过马路",
        pinyin: "guò mǎlù",
        translation: "cross the road",
        translationFr: "traverser la rue"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 过马路 »",
      choices: ["traverser la rue", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["grammar", "supplement", "cecr-v4"],
    theme: "grammaire"
  },
  {
    id: "supp-v4-280d10cb",
    level: "hsk4",
    hanzi: "还不如",
    pinyin: "hái bù rú",
    translation: "might as well...",
    translationFr: "autant... (que)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "还不如",
        pinyin: "hái bù rú",
        translation: "might as well...",
        translationFr: "autant... (que)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 还不如 »",
      choices: ["autant... (que)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-a574205d",
    level: "hsk4",
    hanzi: "还不错",
    pinyin: "hái bú cuò",
    translation: "not bad",
    translationFr: "pas mal",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "还不错",
        pinyin: "hái bú cuò",
        translation: "not bad",
        translationFr: "pas mal"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 还不错 »",
      choices: ["pas mal", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-f4861c19",
    level: "hsk4",
    hanzi: "还可以",
    pinyin: "hái kěyǐ",
    translation: "so-so",
    translationFr: "ça va, acceptable",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "还可以",
        pinyin: "hái kěyǐ",
        translation: "so-so",
        translationFr: "ça va, acceptable"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 还可以 »",
      choices: ["ça va, acceptable", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-5e509e18",
    level: "hsk3",
    hanzi: "还在",
    pinyin: "hái zài",
    translation: "still here",
    translationFr: "encore là",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "还在",
        pinyin: "hái zài",
        translation: "still here",
        translationFr: "encore là"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 还在 »",
      choices: ["encore là", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-3b7ad58e",
    level: "hsk5",
    hanzi: "还差得远",
    pinyin: "hái chà de yuǎn",
    translation: "still far from it (modest)",
    translationFr: "loin d'être au niveau (modeste)",
    category: "idiom",
    examples: [
      {
        hanzi: "还差得远",
        pinyin: "hái chà de yuǎn",
        translation: "still far from it (modest)",
        translationFr: "loin d'être au niveau (modeste)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 还差得远 »",
      choices: ["loin d'être au niveau (modeste)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-1876f9f9",
    level: "hsk3",
    hanzi: "还有",
    pinyin: "hái yǒu",
    translation: "also has",
    translationFr: "il y a aussi",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "还有",
        pinyin: "hái yǒu",
        translation: "also has",
        translationFr: "il y a aussi"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 还有 »",
      choices: ["il y a aussi", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-c7106c27",
    level: "hsk3",
    hanzi: "还要",
    pinyin: "hái yào",
    translation: "also want",
    translationFr: "encore... (de plus)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "还要",
        pinyin: "hái yào",
        translation: "also want",
        translationFr: "encore... (de plus)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 还要 »",
      choices: ["encore... (de plus)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-ff9c5d17",
    level: "hsk4",
    hanzi: "退烧药",
    pinyin: "tuì shāo yào",
    translation: "fever reducer",
    translationFr: "fébrifuge",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "退烧药",
        pinyin: "tuì shāo yào",
        translation: "fever reducer",
        translationFr: "fébrifuge"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 退烧药 »",
      choices: ["fébrifuge", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-7de59eec",
    level: "hsk3",
    hanzi: "送礼",
    pinyin: "sòng lǐ",
    translation: "give a gift",
    translationFr: "offrir un cadeau",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "送礼",
        pinyin: "sòng lǐ",
        translation: "give a gift",
        translationFr: "offrir un cadeau"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 送礼 »",
      choices: ["offrir un cadeau", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-4d48cc56",
    level: "hsk3",
    hanzi: "送给",
    pinyin: "sòng gěi",
    translation: "give to",
    translationFr: "offrir à",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "送给",
        pinyin: "sòng gěi",
        translation: "give to",
        translationFr: "offrir à"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 送给 »",
      choices: ["offrir à", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-30221250",
    level: "hsk5",
    hanzi: "选秀节目",
    pinyin: "xuǎnxiù jiémù",
    translation: "talent show",
    translationFr: "télé-crochet",
    category: "idiom",
    examples: [
      {
        hanzi: "选秀节目",
        pinyin: "xuǎnxiù jiémù",
        translation: "talent show",
        translationFr: "télé-crochet"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 选秀节目 »",
      choices: ["télé-crochet", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-f8ed6961",
    level: "hsk4",
    hanzi: "邓丽君",
    pinyin: "Dèng Lìjūn",
    translation: "Teresa Teng",
    translationFr: "Teresa Teng (chanteuse)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "邓丽君",
        pinyin: "Dèng Lìjūn",
        translation: "Teresa Teng",
        translationFr: "Teresa Teng (chanteuse)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 邓丽君 »",
      choices: ["Teresa Teng (chanteuse)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-f043826c",
    level: "hsk4",
    hanzi: "邓小平",
    pinyin: "Dèng Xiǎopíng",
    translation: "Deng Xiaoping",
    translationFr: "Deng Xiaoping",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "邓小平",
        pinyin: "Dèng Xiǎopíng",
        translation: "Deng Xiaoping",
        translationFr: "Deng Xiaoping"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 邓小平 »",
      choices: ["Deng Xiaoping", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-7bf152c9",
    level: "hsk4",
    hanzi: "那一天",
    pinyin: "nà yì tiān",
    translation: "that day",
    translationFr: "ce jour-là",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "那一天",
        pinyin: "nà yì tiān",
        translation: "that day",
        translationFr: "ce jour-là"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 那一天 »",
      choices: ["ce jour-là", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-023b7554",
    level: "hsk3",
    hanzi: "郑和",
    pinyin: "Zhèng Hé",
    translation: "Zheng He (Ming navigator)",
    translationFr: "Zheng He (navigateur Ming)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "郑和",
        pinyin: "Zhèng Hé",
        translation: "Zheng He (Ming navigator)",
        translationFr: "Zheng He (navigateur Ming)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 郑和 »",
      choices: ["Zheng He (navigateur Ming)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-3803127e",
    level: "hsk3",
    hanzi: "都是",
    pinyin: "dōu shì",
    translation: "all are",
    translationFr: "tous sont",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "都是",
        pinyin: "dōu shì",
        translation: "all are",
        translationFr: "tous sont"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 都是 »",
      choices: ["tous sont", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-c147608e",
    level: "hsk3",
    hanzi: "都有",
    pinyin: "dōu yǒu",
    translation: "all have",
    translationFr: "tous ont",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "都有",
        pinyin: "dōu yǒu",
        translation: "all have",
        translationFr: "tous ont"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 都有 »",
      choices: ["tous ont", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-2943e372",
    level: "hsk5",
    hanzi: "酒桌文化",
    pinyin: "jiǔ zhuō wénhuà",
    translation: "drinking-table culture",
    translationFr: "culture de la table à alcool",
    category: "idiom",
    examples: [
      {
        hanzi: "酒桌文化",
        pinyin: "jiǔ zhuō wénhuà",
        translation: "drinking-table culture",
        translationFr: "culture de la table à alcool"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 酒桌文化 »",
      choices: ["culture de la table à alcool", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-201746d6",
    level: "hsk3",
    hanzi: "长安",
    pinyin: "Cháng'ān",
    translation: "Chang'an (ancient Tang capital)",
    translationFr: "Chang'an (ancienne capitale Tang)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "长安",
        pinyin: "Cháng'ān",
        translation: "Chang'an (ancient Tang capital)",
        translationFr: "Chang'an (ancienne capitale Tang)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 长安 »",
      choices: ["Chang'an (ancienne capitale Tang)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-01c9fe81",
    level: "hsk4",
    hanzi: "闽南语",
    pinyin: "Mǐn'nán yǔ",
    translation: "Min-nan (Hokkien)",
    translationFr: "min-nan (hokkien)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "闽南语",
        pinyin: "Mǐn'nán yǔ",
        translation: "Min-nan (Hokkien)",
        translationFr: "min-nan (hokkien)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 闽南语 »",
      choices: ["min-nan (hokkien)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-29d33e67",
    level: "hsk5",
    hanzi: "防火长城",
    pinyin: "Fánghuǒ Chángchéng",
    translation: "Great Firewall",
    translationFr: "Grand Pare-feu",
    category: "idiom",
    examples: [
      {
        hanzi: "防火长城",
        pinyin: "Fánghuǒ Chángchéng",
        translation: "Great Firewall",
        translationFr: "Grand Pare-feu"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 防火长城 »",
      choices: ["Grand Pare-feu", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-deb3a9e0",
    level: "hsk5",
    hanzi: "阿Q正传",
    pinyin: "Ā Q Zhèng Zhuàn",
    translation: "The True Story of Ah Q",
    translationFr: "La Véritable Histoire d'A Q (Lu Xun)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "阿Q正传",
        pinyin: "Ā Q Zhèng Zhuàn",
        translation: "The True Story of Ah Q",
        translationFr: "La Véritable Histoire d'A Q (Lu Xun)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 阿Q正传 »",
      choices: ["La Véritable Histoire d'A Q (Lu Xun)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-b4d260d7",
    level: "hsk4",
    hanzi: "陈凯歌",
    pinyin: "Chén Kǎigē",
    translation: "Chen Kaige (director)",
    translationFr: "Chen Kaige (réalisateur)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "陈凯歌",
        pinyin: "Chén Kǎigē",
        translation: "Chen Kaige (director)",
        translationFr: "Chen Kaige (réalisateur)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 陈凯歌 »",
      choices: ["Chen Kaige (réalisateur)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-c256f586",
    level: "hsk3",
    hanzi: "难吃",
    pinyin: "nán chī",
    translation: "bad-tasting",
    translationFr: "pas bon (à manger)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "难吃",
        pinyin: "nán chī",
        translation: "bad-tasting",
        translationFr: "pas bon (à manger)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 难吃 »",
      choices: ["pas bon (à manger)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-c67bbabf",
    level: "hsk3",
    hanzi: "雅",
    pinyin: "yǎ",
    translation: "elegance (Yan Fu)",
    translationFr: "élégance (信达雅)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "雅",
        pinyin: "yǎ",
        translation: "elegance (Yan Fu)",
        translationFr: "élégance (信达雅)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 雅 »",
      choices: ["élégance (信达雅)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-756e0cb2",
    level: "hsk4",
    hanzi: "雨果奖",
    pinyin: "Yǔguǒ jiǎng",
    translation: "Hugo Award",
    translationFr: "prix Hugo (SF)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "雨果奖",
        pinyin: "Yǔguǒ jiǎng",
        translation: "Hugo Award",
        translationFr: "prix Hugo (SF)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 雨果奖 »",
      choices: ["prix Hugo (SF)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-ec85e528",
    level: "hsk3",
    hanzi: "雾霾",
    pinyin: "wù mái",
    translation: "smog",
    translationFr: "smog",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "雾霾",
        pinyin: "wù mái",
        translation: "smog",
        translationFr: "smog"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 雾霾 »",
      choices: ["smog", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-20a1a0a2",
    level: "hsk4",
    hanzi: "静夜思",
    pinyin: "Jìng Yè Sī",
    translation: "Quiet Night Thoughts (Li Bai)",
    translationFr: "« Pensée d'une nuit tranquille » (Li Bai)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "静夜思",
        pinyin: "Jìng Yè Sī",
        translation: "Quiet Night Thoughts (Li Bai)",
        translationFr: "« Pensée d'une nuit tranquille » (Li Bai)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 静夜思 »",
      choices: ["« Pensée d'une nuit tranquille » (Li Bai)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-8bc6de67",
    level: "hsk5",
    hanzi: "韦编三绝",
    pinyin: "wéi biān sān jué",
    translation: "three times the leather thongs wore out",
    translationFr: "user trois fois les lacets du livre (lire avec acharnement)",
    category: "idiom",
    examples: [
      {
        hanzi: "韦编三绝",
        pinyin: "wéi biān sān jué",
        translation: "three times the leather thongs wore out",
        translationFr: "user trois fois les lacets du livre (lire avec acharnement)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 韦编三绝 »",
      choices: ["user trois fois les lacets du livre (lire avec acharnement)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-6c9d8e0b",
    level: "hsk3",
    hanzi: "韩非",
    pinyin: "Hán Fēi",
    translation: "Han Fei (Legalist)",
    translationFr: "Han Fei (penseur légiste)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "韩非",
        pinyin: "Hán Fēi",
        translation: "Han Fei (Legalist)",
        translationFr: "Han Fei (penseur légiste)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 韩非 »",
      choices: ["Han Fei (penseur légiste)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-a5536208",
    level: "hsk5",
    hanzi: "韬光养晦",
    pinyin: "tāo guāng yǎng huì",
    translation: "hide capabilities, bide time",
    translationFr: "cacher sa lumière, cultiver l'obscurité (Deng)",
    category: "idiom",
    examples: [
      {
        hanzi: "韬光养晦",
        pinyin: "tāo guāng yǎng huì",
        translation: "hide capabilities, bide time",
        translationFr: "cacher sa lumière, cultiver l'obscurité (Deng)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 韬光养晦 »",
      choices: ["cacher sa lumière, cultiver l'obscurité (Deng)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-be25e0a7",
    level: "hsk3",
    hanzi: "领证",
    pinyin: "lǐng zhèng",
    translation: "register (marriage)",
    translationFr: "retirer un certificat (mariage)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "领证",
        pinyin: "lǐng zhèng",
        translation: "register (marriage)",
        translationFr: "retirer un certificat (mariage)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 领证 »",
      choices: ["retirer un certificat (mariage)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-ff1e458d",
    level: "hsk5",
    hanzi: "风险投资",
    pinyin: "fēngxiǎn tóuzī",
    translation: "venture capital",
    translationFr: "capital-risque",
    category: "idiom",
    examples: [
      {
        hanzi: "风险投资",
        pinyin: "fēngxiǎn tóuzī",
        translation: "venture capital",
        translationFr: "capital-risque"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 风险投资 »",
      choices: ["capital-risque", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-29a9c445",
    level: "hsk3",
    hanzi: "食疗",
    pinyin: "shí liáo",
    translation: "food therapy",
    translationFr: "thérapie par l'alimentation",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "食疗",
        pinyin: "shí liáo",
        translation: "food therapy",
        translationFr: "thérapie par l'alimentation"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 食疗 »",
      choices: ["thérapie par l'alimentation", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-5243e5d7",
    level: "hsk3",
    hanzi: "饭前",
    pinyin: "fàn qián",
    translation: "before meal",
    translationFr: "avant le repas",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "饭前",
        pinyin: "fàn qián",
        translation: "before meal",
        translationFr: "avant le repas"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 饭前 »",
      choices: ["avant le repas", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-0b52ac35",
    level: "hsk3",
    hanzi: "饭后",
    pinyin: "fàn hòu",
    translation: "after meal",
    translationFr: "après le repas",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "饭后",
        pinyin: "fàn hòu",
        translation: "after meal",
        translationFr: "après le repas"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 饭后 »",
      choices: ["après le repas", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-b29135a8",
    level: "hsk3",
    hanzi: "饿了",
    pinyin: "è le",
    translation: "got hungry",
    translationFr: "avoir faim",
    category: "grammar",
    examples: [
      {
        hanzi: "饿了",
        pinyin: "è le",
        translation: "got hungry",
        translationFr: "avoir faim"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 饿了 »",
      choices: ["avoir faim", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["grammar", "supplement", "cecr-v4"],
    theme: "grammaire"
  },
  {
    id: "supp-v4-32d2972f",
    level: "hsk3",
    hanzi: "香港",
    pinyin: "Xiānggǎng",
    translation: "Hong Kong",
    translationFr: "Hong Kong",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "香港",
        pinyin: "Xiānggǎng",
        translation: "Hong Kong",
        translationFr: "Hong Kong"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 香港 »",
      choices: ["Hong Kong", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-6345fbe0",
    level: "hsk5",
    hanzi: "马到成功",
    pinyin: "mǎ dào chéng gōng",
    translation: "swift success (horse arrives, success)",
    translationFr: "réussite dès l'arrivée du cheval",
    category: "idiom",
    examples: [
      {
        hanzi: "马到成功",
        pinyin: "mǎ dào chéng gōng",
        translation: "swift success (horse arrives, success)",
        translationFr: "réussite dès l'arrivée du cheval"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 马到成功 »",
      choices: ["réussite dès l'arrivée du cheval", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-10545d27",
    level: "hsk4",
    hanzi: "高兴地",
    pinyin: "gāoxìng de",
    translation: "happily",
    translationFr: "avec joie",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "高兴地",
        pinyin: "gāoxìng de",
        translation: "happily",
        translationFr: "avec joie"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 高兴地 »",
      choices: ["avec joie", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-3093006c",
    level: "hsk5",
    hanzi: "鱼香肉丝",
    pinyin: "yú xiāng ròu sī",
    translation: "fish-fragrant pork",
    translationFr: "porc émincé sauce yu xiang",
    category: "idiom",
    examples: [
      {
        hanzi: "鱼香肉丝",
        pinyin: "yú xiāng ròu sī",
        translation: "fish-fragrant pork",
        translationFr: "porc émincé sauce yu xiang"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 鱼香肉丝 »",
      choices: ["porc émincé sauce yu xiang", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-5628b320",
    level: "hsk3",
    hanzi: "鸡娃",
    pinyin: "jī wá",
    translation: "chicken babies (tiger-parented kids)",
    translationFr: "enfants sur-stimulés (helicopter parenting)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "鸡娃",
        pinyin: "jī wá",
        translation: "chicken babies (tiger-parented kids)",
        translationFr: "enfants sur-stimulés (helicopter parenting)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 鸡娃 »",
      choices: ["enfants sur-stimulés (helicopter parenting)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-e3d41753",
    level: "hsk5",
    hanzi: "麻婆豆腐",
    pinyin: "má pó dòufu",
    translation: "mapo tofu",
    translationFr: "mapo tofu",
    category: "idiom",
    examples: [
      {
        hanzi: "麻婆豆腐",
        pinyin: "má pó dòufu",
        translation: "mapo tofu",
        translationFr: "mapo tofu"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 麻婆豆腐 »",
      choices: ["mapo tofu", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-690ce13c",
    level: "hsk3",
    hanzi: "黄山",
    pinyin: "Huáng Shān",
    translation: "Mount Huang",
    translationFr: "monts Huang",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "黄山",
        pinyin: "Huáng Shān",
        translation: "Mount Huang",
        translationFr: "monts Huang"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 黄山 »",
      choices: ["monts Huang", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-5d2ad7ee",
    level: "hsk4",
    hanzi: "黄鼠狼",
    pinyin: "huáng shǔ láng",
    translation: "weasel",
    translationFr: "belette / hermine (culture)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "黄鼠狼",
        pinyin: "huáng shǔ láng",
        translation: "weasel",
        translationFr: "belette / hermine (culture)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 黄鼠狼 »",
      choices: ["belette / hermine (culture)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  {
    id: "supp-v4-022b99e5",
    level: "hsk5",
    hanzi: "黑暗森林",
    pinyin: "hēi àn sēn lín",
    translation: "Dark Forest (Liu Cixin)",
    translationFr: "Forêt sombre (Liu Cixin)",
    category: "idiom",
    examples: [
      {
        hanzi: "黑暗森林",
        pinyin: "hēi àn sēn lín",
        translation: "Dark Forest (Liu Cixin)",
        translationFr: "Forêt sombre (Liu Cixin)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 黑暗森林 »",
      choices: ["Forêt sombre (Liu Cixin)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["idiom", "supplement", "cecr-v4"],
    theme: "expressions"
  },
  {
    id: "supp-v4-1d89df2b",
    level: "hsk3",
    hanzi: "鼠",
    pinyin: "shǔ",
    translation: "rat (zodiac)",
    translationFr: "rat (zodiaque)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "鼠",
        pinyin: "shǔ",
        translation: "rat (zodiac)",
        translationFr: "rat (zodiaque)"
      }
    ],
    quiz: {
      prompt: "Sélectionne la bonne traduction pour « 鼠 »",
      choices: ["rat (zodiaque)", "autre sens", "terme différent", "mot sans rapport"],
      correctChoiceIndex: 0
    },
    tags: ["vocabulaire", "supplement", "cecr-v4"],
    theme: "vocabulaire"
  },
  // ====================================================================
  // V5 — flashcards référencées par les modules B1.2 ajoutés dans V5-2.
  // ====================================================================
  {
    id: "supp-v5-round-face",
    level: "hsk4",
    hanzi: "圆脸",
    pinyin: "yuán liǎn",
    translation: "round face",
    translationFr: "visage rond",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "她有一张圆脸。",
        pinyin: "Tā yǒu yì zhāng yuán liǎn.",
        translation: "She has a round face.",
        translationFr: "Elle a un visage rond."
      }
    ],
    tags: ["portrait", "supplement", "cecr-v5"],
    theme: "description"
  },
  {
    id: "supp-v5-big-eyes",
    level: "hsk4",
    hanzi: "大眼睛",
    pinyin: "dà yǎnjing",
    translation: "big eyes",
    translationFr: "grands yeux",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "她有一双大眼睛。",
        pinyin: "Tā yǒu yì shuāng dà yǎnjing.",
        translation: "She has big eyes.",
        translationFr: "Elle a de grands yeux."
      }
    ],
    tags: ["portrait", "supplement", "cecr-v5"],
    theme: "description"
  },
  {
    id: "supp-v5-ting-dao",
    level: "hsk4",
    hanzi: "听到",
    pinyin: "tīng dào",
    translation: "to hear (successfully perceive)",
    translationFr: "entendre (percevoir avec succès)",
    category: "verbe",
    examples: [
      {
        hanzi: "我听到了鸟叫。",
        pinyin: "Wǒ tīng dào le niǎo jiào.",
        translation: "I hear the birds singing.",
        translationFr: "J'entends les oiseaux chanter."
      }
    ],
    tags: ["perception", "supplement", "cecr-v5"],
    theme: "perception"
  },
  {
    id: "supp-v5-wen-dao",
    level: "hsk4",
    hanzi: "闻到",
    pinyin: "wén dào",
    translation: "to smell (successfully perceive)",
    translationFr: "sentir une odeur (percevoir avec succès)",
    category: "verbe",
    examples: [
      {
        hanzi: "我闻到了花香。",
        pinyin: "Wǒ wén dào le huā xiāng.",
        translation: "I smell the scent of flowers.",
        translationFr: "Je sens le parfum des fleurs."
      }
    ],
    tags: ["perception", "supplement", "cecr-v5"],
    theme: "perception"
  },
  {
    id: "supp-v5-five-insurances-one-fund",
    level: "hsk5",
    hanzi: "五险一金",
    pinyin: "wǔ xiǎn yī jīn",
    translation: "five insurances & one housing fund (mandatory benefits in China)",
    translationFr: "cinq assurances et un fonds (prestations salariales obligatoires en Chine)",
    category: "expression",
    examples: [
      {
        hanzi: "这家公司提供五险一金。",
        pinyin: "Zhè jiā gōngsī tígōng wǔ xiǎn yī jīn.",
        translation: "This company offers the standard social benefits package.",
        translationFr: "Cette entreprise propose le paquet social standard."
      }
    ],
    tags: ["travail", "supplement", "cecr-v5"],
    theme: "emploi"
  },
  {
    id: "supp-v5-guo-qi",
    level: "hsk5",
    hanzi: "国企",
    pinyin: "guó qǐ",
    translation: "state-owned enterprise (abbr.)",
    translationFr: "entreprise d'État (abrégé)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "他在一家国企工作。",
        pinyin: "Tā zài yì jiā guó qǐ gōngzuò.",
        translation: "He works at a state-owned enterprise.",
        translationFr: "Il travaille dans une entreprise d'État."
      }
    ],
    tags: ["travail", "supplement", "cecr-v5"],
    theme: "emploi"
  },
  {
    id: "supp-v5-wai-qi",
    level: "hsk5",
    hanzi: "外企",
    pinyin: "wài qǐ",
    translation: "foreign enterprise (abbr.)",
    translationFr: "entreprise étrangère (abrégé)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "她在外企工作。",
        pinyin: "Tā zài wài qǐ gōngzuò.",
        translation: "She works at a foreign company.",
        translationFr: "Elle travaille dans une entreprise étrangère."
      }
    ],
    tags: ["travail", "supplement", "cecr-v5"],
    theme: "emploi"
  },
  {
    id: "supp-v5-si-qi",
    level: "hsk5",
    hanzi: "私企",
    pinyin: "sī qǐ",
    translation: "private enterprise (abbr.)",
    translationFr: "entreprise privée (abrégé)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "私企工资比国企高。",
        pinyin: "Sī qǐ gōngzī bǐ guó qǐ gāo.",
        translation: "Private firms pay better than state-owned ones.",
        translationFr: "Les privées paient mieux que les entreprises d'État."
      }
    ],
    tags: ["travail", "supplement", "cecr-v5"],
    theme: "emploi"
  },
  {
    id: "supp-v5-fake-news",
    level: "hsk6",
    hanzi: "假新闻",
    pinyin: "jiǎ xīnwén",
    translation: "fake news",
    translationFr: "fausse information",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "网上有很多假新闻。",
        pinyin: "Wǎng shàng yǒu hěn duō jiǎ xīnwén.",
        translation: "There are many fake news online.",
        translationFr: "Il y a beaucoup de fake news en ligne."
      }
    ],
    tags: ["media", "supplement", "cecr-v5"],
    theme: "médias"
  },
  {
    id: "supp-v5-pi-yao",
    level: "hsk6",
    hanzi: "辟谣",
    pinyin: "pì yáo",
    translation: "to refute a rumor",
    translationFr: "démentir une rumeur",
    category: "verbe",
    examples: [
      {
        hanzi: "官方已经辟谣。",
        pinyin: "Guānfāng yǐjīng pì yáo.",
        translation: "Officials have refuted the rumor.",
        translationFr: "Les autorités ont démenti la rumeur."
      }
    ],
    tags: ["media", "supplement", "cecr-v5"],
    theme: "médias"
  },
  {
    id: "supp-v5-clickbait",
    level: "hsk6",
    hanzi: "标题党",
    pinyin: "biāotí dǎng",
    translation: "clickbait (the people/articles doing it)",
    translationFr: "aguiche (racoleur·se de clics)",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "这篇文章太标题党了。",
        pinyin: "Zhè piān wénzhāng tài biāotí dǎng le.",
        translation: "This article is pure clickbait.",
        translationFr: "Cet article est du pur aguiche."
      }
    ],
    tags: ["media", "supplement", "cecr-v5"],
    theme: "médias"
  },
  {
    id: "supp-v5-xian-liang",
    level: "hsk5",
    hanzi: "限量",
    pinyin: "xiàn liàng",
    translation: "limited edition / limited quantity",
    translationFr: "édition limitée / quantité limitée",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "这款是限量版。",
        pinyin: "Zhè kuǎn shì xiàn liàng bǎn.",
        translation: "This model is a limited edition.",
        translationFr: "Ce modèle est en édition limitée."
      }
    ],
    tags: ["pub", "supplement", "cecr-v5"],
    theme: "publicité"
  },
  {
    id: "supp-v5-bao-kuan",
    level: "hsk6",
    hanzi: "爆款",
    pinyin: "bào kuǎn",
    translation: "hot-selling item / smash hit",
    translationFr: "article à succès / produit qui cartonne",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "这是今年的爆款。",
        pinyin: "Zhè shì jīnnián de bào kuǎn.",
        translation: "This is this year's hit product.",
        translationFr: "C'est le carton de l'année."
      }
    ],
    tags: ["pub", "supplement", "cecr-v5"],
    theme: "publicité"
  },
  {
    id: "supp-v5-livestreamer",
    level: "hsk6",
    hanzi: "带货主播",
    pinyin: "dài huò zhǔbō",
    translation: "live-commerce streamer",
    translationFr: "animateur·rice de live-shopping",
    category: "vocabulaire",
    examples: [
      {
        hanzi: "这位带货主播很有名。",
        pinyin: "Zhè wèi dài huò zhǔbō hěn yǒumíng.",
        translation: "This live-commerce streamer is very famous.",
        translationFr: "Cet animateur de live-shopping est très célèbre."
      }
    ],
    tags: ["pub", "supplement", "cecr-v5"],
    theme: "publicité"
  }
];

export const supplementLessons: LessonItem[] = [
  ...level1WordBankFlat,
  ...newSupplementItems
];
