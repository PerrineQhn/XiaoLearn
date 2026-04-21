import type { LessonItem } from '../types';
import { grammarLessonsSubstack } from './grammar-lessons-substack';
import { grammarLessonsExtended } from './grammar-lessons-extended';

/**
 * Leçons de grammaire avec quiz adaptés
 * Ces leçons utilisent les nouveaux types de quiz pour mieux enseigner la grammaire
 */

const grammarLessonsBase: LessonItem[] = [
  // ============================================
  // NÉGATION (不/没)
  // ============================================
  {
    id: 'grammar-negation-bu',
    level: 'hsk1',
    hanzi: '不',
    pinyin: 'bù',
    translation: 'not (general negation)',
    translationFr: 'ne pas (négation générale)',
    category: 'grammaire',
    explanation: 'La particule 不 (bù) est utilisée pour nier des actions habituelles, des états ou le futur.',
    grammarExplanation: {
      whenToUse: '不 s\'utilise pour nier :\n• Des actions habituelles ou répétitives\n• Des états ou qualités\n• Des actions au futur\n• Le verbe 是 (être)',
      whenToUseEn: '不 is used to negate:\n• Habitual or repeated actions\n• States or qualities\n• Future actions\n• The verb 是 (to be)',
      howToUse: 'Structure : Sujet + 不 + Verbe/Adjectif\n\nExemples :\n• 我不喜欢 (wǒ bù xǐhuan) = Je n\'aime pas\n• 他不高 (tā bù gāo) = Il n\'est pas grand\n• 明天我不去 (míngtiān wǒ bú qù) = Demain je n\'irai pas',
      howToUseEn: 'Structure: Subject + 不 + Verb/Adjective\n\nExamples:\n• 我不喜欢 (wǒ bù xǐhuan) = I don\'t like\n• 他不高 (tā bù gāo) = He is not tall\n• 明天我不去 (míngtiān wǒ bú qù) = Tomorrow I won\'t go',
      commonMistakes: '❌ N\'utilisez PAS 不 pour nier le passé !\n• Incorrect : 我不吃饭了\n• Correct : 我没吃饭\n\n❌ Ne confondez pas 不 et 没有 pour la possession\n• Incorrect : 我不有钱\n• Correct : 我没有钱',
      commonMistakesEn: '❌ DON\'T use 不 to negate the past!\n• Incorrect: 我不吃饭了\n• Correct: 我没吃饭\n\n❌ Don\'t confuse 不 and 没有 for possession\n• Incorrect: 我不有钱\n• Correct: 我没有钱',
      tips: '💡 Astuce : "不" change de ton !\n• Devant un 4e ton : 不 devient bú (ton montant)\n• Exemple : 不是 (bú shì), 不对 (bú duì)\n\n💡 Pensez à "不" comme "ne...pas" en général, et "没" pour "n\'a pas fait"',
      tipsEn: '💡 Tip: "不" changes tone!\n• Before a 4th tone: 不 becomes bú (rising tone)\n• Example: 不是 (bú shì), 不对 (bú duì)\n\n💡 Think of "不" as general "not", and "没" as "didn\'t do"',
      relatedGrammar: ['grammar-negation-mei']
    },
    audio: 'audio/grammar/bu.wav',
    examples: [
      {
        hanzi: '我不喜欢咖啡',
        pinyin: 'wǒ bù xǐhuan kāfēi',
        translation: 'I don\'t like coffee',
        translationFr: 'Je n\'aime pas le café'
      },
      {
        hanzi: '他不是老师',
        pinyin: 'tā bú shì lǎoshī',
        translation: 'He is not a teacher',
        translationFr: 'Il n\'est pas professeur'
      }
    ],
    quiz: {
      prompt: 'Quelle particule de négation pour le présent/futur ?',
      choices: ['不', '没', '没有', '别'],
      correctChoiceIndex: 0
    },
    grammarQuiz: {
      type: 'particle-choice',
      sentenceBefore: '我',
      sentenceAfter: '去',
      translation: 'Je n\'irai pas',
      translationEn: 'I won\'t go',
      choices: ['不', '没', '没有', '别'],
      correctChoice: '不',
      explanation: 'On utilise 不 pour nier une action future ou habituelle'
    },
    tags: ['grammaire', 'négation', 'particule'],
    theme: 'grammar'
  },
  {
    id: 'grammar-negation-mei',
    level: 'hsk1',
    hanzi: '没',
    pinyin: 'méi',
    translation: 'not (past negation)',
    translationFr: 'ne pas (négation du passé)',
    category: 'grammaire',
    explanation: 'La particule 没 (méi) est utilisée pour nier des actions accomplies dans le passé.',
    grammarExplanation: {
      whenToUse: '没 s\'utilise pour nier :\n• Des actions accomplies dans le passé\n• La possession (没有)\n• L\'expérience d\'avoir fait quelque chose\n• Remplace 不 + 有',
      whenToUseEn: '没 is used to negate:\n• Completed actions in the past\n• Possession (没有)\n• Experience of having done something\n• Replaces 不 + 有',
      howToUse: 'Structure : Sujet + 没(有) + Verbe\n\nExemples :\n• 我没吃饭 (wǒ méi chī fàn) = Je n\'ai pas mangé\n• 他没来 (tā méi lái) = Il n\'est pas venu\n• 我没有钱 (wǒ méiyǒu qián) = Je n\'ai pas d\'argent',
      howToUseEn: 'Structure: Subject + 没(有) + Verb\n\nExamples:\n• 我没吃饭 (wǒ méi chī fàn) = I didn\'t eat\n• 他没来 (tā méi lái) = He didn\'t come\n• 我没有钱 (wǒ méiyǒu qián) = I don\'t have money',
      commonMistakes: '❌ N\'utilisez PAS 没 avec des adjectifs !\n• Incorrect : 我没高\n• Correct : 我不高\n\n❌ N\'utilisez PAS 没 avec 是 !\n• Incorrect : 他没是老师\n• Correct : 他不是老师\n\n❌ Ne mettez PAS 了 après un verbe avec 没 !\n• Incorrect : 我没吃了饭\n• Correct : 我没吃饭',
      commonMistakesEn: '❌ DON\'T use 没 with adjectives!\n• Incorrect: 我没高\n• Correct: 我不高\n\n❌ DON\'T use 没 with 是!\n• Incorrect: 他没是老师\n• Correct: 他不是老师\n\n❌ DON\'T put 了 after a verb with 没!\n• Incorrect: 我没吃了饭\n• Correct: 我没吃饭',
      tips: '💡 Mnémonique : "没" = "n\'ai PAS fait"\n• 没吃 = n\'ai pas mangé\n• 没去 = ne suis pas allé\n\n💡 没 et 没有 sont souvent interchangeables, mais 没 est plus courant dans la langue parlée',
      tipsEn: '💡 Mnemonic: "没" = "DIDN\'T do"\n• 没吃 = didn\'t eat\n• 没去 = didn\'t go\n\n💡 没 and 没有 are often interchangeable, but 没 is more common in spoken language',
      relatedGrammar: ['grammar-negation-bu', 'grammar-aspect-le']
    },
    audio: 'audio/grammar/mei.wav',
    examples: [
      {
        hanzi: '我没吃饭',
        pinyin: 'wǒ méi chī fàn',
        translation: 'I haven\'t eaten',
        translationFr: 'Je n\'ai pas mangé'
      },
      {
        hanzi: '他没来',
        pinyin: 'tā méi lái',
        translation: 'He didn\'t come',
        translationFr: 'Il n\'est pas venu'
      }
    ],
    quiz: {
      prompt: 'Quelle particule de négation pour le passé ?',
      choices: ['不', '没', '不是', '别'],
      correctChoiceIndex: 1
    },
    grammarQuiz: {
      type: 'particle-choice',
      sentenceBefore: '我昨天',
      sentenceAfter: '去学校',
      translation: 'Je ne suis pas allé à l\'école hier',
      translationEn: 'I didn\'t go to school yesterday',
      choices: ['不', '没', '没有', '别'],
      correctChoice: '没',
      explanation: 'On utilise 没 pour nier une action passée'
    },
    tags: ['grammaire', 'négation', 'particule', 'passé'],
    theme: 'grammar'
  },

  // ============================================
  // POSSESSION (的)
  // ============================================
  {
    id: 'grammar-possession-de',
    level: 'hsk1',
    hanzi: '的',
    pinyin: 'de',
    translation: 'possessive particle',
    translationFr: 'particule possessive',
    category: 'grammaire',
    explanation: 'La particule 的 (de) marque la possession : mon, ton, son livre...',
    grammarExplanation: {
      whenToUse: '的 s\'utilise pour :\n• Exprimer la possession (mon, ton, son)\n• Relier un nom à un autre nom (le livre de Pierre)\n• Créer des adjectifs composés\n• Indiquer une relation ou appartenance',
      whenToUseEn: '的 is used to:\n• Express possession (my, your, his/her)\n• Link one noun to another (Peter\'s book)\n• Create compound adjectives\n• Indicate a relationship or belonging',
      howToUse: 'Structure : Possesseur + 的 + Chose possédée\n\nExemples :\n• 我的书 (wǒ de shū) = mon livre\n• 老师的电脑 (lǎoshī de diànnǎo) = l\'ordinateur du professeur\n• 中国的文化 (zhōngguó de wénhuà) = la culture de la Chine\n• 红色的车 (hóngsè de chē) = une voiture rouge',
      howToUseEn: 'Structure: Possessor + 的 + Possessed thing\n\nExamples:\n• 我的书 (wǒ de shū) = my book\n• 老师的电脑 (lǎoshī de diànnǎo) = teacher\'s computer\n• 中国的文化 (zhōngguó de wénhuà) = China\'s culture\n• 红色的车 (hóngsè de chē) = a red car',
      commonMistakes: '❌ On peut OMETTRE 的 avec la famille proche !\n• 我妈妈 (wǒ māma) = ma mère ✅\n• 我的妈妈 (wǒ de māma) = ma mère ✅ (mais plus formel)\n\n❌ Ne confondez pas les 3 "de" :\n• 的 (de) = possession\n• 得 (de) = complément de degré\n• 地 (de) = manière (adverbe)',
      commonMistakesEn: '❌ You can OMIT 的 with close family!\n• 我妈妈 (wǒ māma) = my mother ✅\n• 我的妈妈 (wǒ de māma) = my mother ✅ (but more formal)\n\n❌ Don\'t confuse the 3 "de":\n• 的 (de) = possession\n• 得 (de) = complement of degree\n• 地 (de) = manner (adverb)',
      tips: '💡 Pensez à "de" en français !\n• "Le livre de Marie" = 玛丽的书\n• L\'ordre est inversé : possesseur d\'abord\n\n💡 Règle simple : si vous diriez "de" ou "\'s" en français/anglais, utilisez 的',
      tipsEn: '💡 Think of "of" or "\'s" in English!\n• "Mary\'s book" = 玛丽的书\n• Order is reversed: possessor comes first\n\n💡 Simple rule: if you\'d say "of" or "\'s", use 的',
      relatedGrammar: []
    },
    audio: 'audio/grammar/de.wav',
    examples: [
      {
        hanzi: '我的书',
        pinyin: 'wǒ de shū',
        translation: 'mon livre'
      },
      {
        hanzi: '老师的电脑',
        pinyin: 'lǎoshī de diànnǎo',
        translation: 'the teacher\'s computer',
        translationFr: 'l\'ordinateur du professeur'
      }
    ],
    quiz: {
      prompt: 'Quelle particule pour la possession ?',
      choices: ['的', '得', '地', '了'],
      correctChoiceIndex: 0
    },
    grammarQuiz: {
      type: 'sentence-reconstruction',
      translation: 'Le livre de ma mère',
      translationEn: 'My mother\'s book',
      words: ['妈妈', '的', '书', '我'],
      correctOrder: ['我', '妈妈', '的', '书'],
      pinyin: 'wǒ māma de shū'
    },
    tags: ['grammaire', 'possession', 'particule'],
    theme: 'grammar'
  },

  // ============================================
  // QUESTIONS AVEC 吗
  // ============================================
  {
    id: 'grammar-question-ma',
    level: 'hsk1',
    hanzi: '吗',
    pinyin: 'ma',
    translation: 'question particle',
    translationFr: 'particule interrogative',
    category: 'grammaire',
    explanation: 'La particule 吗 (ma) transforme une phrase affirmative en question oui/non.',
    grammarExplanation: {
      whenToUse: '吗 s\'utilise pour :\n• Poser des questions oui/non (fermées)\n• Transformer une affirmation en question\n• Demander confirmation\n• Questions polies et formelles',
      whenToUseEn: '吗 is used to:\n• Ask yes/no questions (closed questions)\n• Transform a statement into a question\n• Ask for confirmation\n• Polite and formal questions',
      howToUse: 'Structure : Phrase affirmative + 吗 ?\n\nExemples :\n• 你好吗？(nǐ hǎo ma?) = Comment vas-tu ?\n• 你是学生吗？(nǐ shì xuésheng ma?) = Es-tu étudiant ?\n• 你喜欢中文吗？(nǐ xǐhuan zhōngwén ma?) = Aimes-tu le chinois ?\n• 这是你的书吗？(zhè shì nǐ de shū ma?) = Est-ce ton livre ?',
      howToUseEn: 'Structure: Affirmative sentence + 吗 ?\n\nExamples:\n• 你好吗？(nǐ hǎo ma?) = How are you?\n• 你是学生吗？(nǐ shì xuésheng ma?) = Are you a student?\n• 你喜欢中文吗？(nǐ xǐhuan zhōngwén ma?) = Do you like Chinese?\n• 这是你的书吗？(zhè shì nǐ de shū ma?) = Is this your book?',
      commonMistakes: '❌ N\'utilisez PAS 吗 avec les mots interrogatifs !\n• Incorrect : 你叫什么吗？\n• Correct : 你叫什么？(Quel est ton nom ?)\n\n❌ 吗 va toujours à la FIN de la phrase !\n• Incorrect : 吗你好？\n• Correct : 你好吗？',
      commonMistakesEn: '❌ DON\'T use 吗 with question words!\n• Incorrect: 你叫什么吗？\n• Correct: 你叫什么？(What\'s your name?)\n\n❌ 吗 always goes at the END!\n• Incorrect: 吗你好？\n• Correct: 你好吗？',
      tips: '💡 Astuce ultra-simple :\n• Prenez n\'importe quelle phrase\n• Ajoutez 吗 à la fin\n• C\'est devenu une question !\n\n💡 Pour répondre : répétez le verbe\n• 你好吗？→ 我好 (Je vais bien)\n• 你是学生吗？→ 是，我是学生 (Oui, je suis étudiant)',
      tipsEn: '💡 Super simple trick:\n• Take any sentence\n• Add 吗 at the end\n• It became a question!\n\n💡 To answer: repeat the verb\n• 你好吗？→ 我好 (I\'m fine)\n• 你是学生吗？→ 是，我是学生 (Yes, I\'m a student)',
      relatedGrammar: ['grammar-negation-bu']
    },
    audio: 'audio/grammar/ma.wav',
    examples: [
      {
        hanzi: '你好吗？',
        pinyin: 'nǐ hǎo ma?',
        translation: 'How are you?',
        translationFr: 'Comment vas-tu ?'
      },
      {
        hanzi: '你是学生吗？',
        pinyin: 'nǐ shì xuésheng ma?',
        translation: 'Are you a student?',
        translationFr: 'Es-tu étudiant ?'
      }
    ],
    quiz: {
      prompt: 'Quelle particule pour poser une question ?',
      choices: ['吗', '呢', '啊', '吧'],
      correctChoiceIndex: 0
    },
    grammarQuiz: {
      type: 'sentence-reconstruction',
      translation: 'Aimes-tu le thé ?',
      translationEn: 'Do you like tea?',
      words: ['你', '喜欢', '茶', '吗', '？'],
      correctOrder: ['你', '喜欢', '茶', '吗', '？'],
      pinyin: 'nǐ xǐhuan chá ma?'
    },
    tags: ['grammaire', 'question', 'particule'],
    theme: 'grammar'
  },

  // ============================================
  // LOCALISATION (在)
  // ============================================
  {
    id: 'grammar-location-zai',
    level: 'hsk1',
    hanzi: '在',
    pinyin: 'zài',
    translation: 'to be at/in (location)',
    translationFr: 'être à/dans (localisation)',
    category: 'grammaire',
    explanation: 'Le verbe 在 (zài) indique où se trouve quelqu\'un ou quelque chose.',
    grammarExplanation: {
      whenToUse: '在 s\'utilise pour :\n• Indiquer où se trouve quelqu\'un/quelque chose\n• Exprimer "être à/dans/sur un lieu"\n• Avant un verbe pour indiquer où se déroule l\'action\n• Répondre à "où ?" (哪儿/哪里)',
      whenToUseEn: '在 is used to:\n• Indicate where someone/something is located\n• Express "to be at/in/on a place"\n• Before a verb to indicate where action takes place\n• Answer "where?" (哪儿/哪里)',
      howToUse: 'Structure 1 : Sujet + 在 + Lieu (être à)\nStructure 2 : 在 + Lieu + Verbe (faire quelque chose à un endroit)\n\nExemples :\n• 我在家 (wǒ zài jiā) = Je suis à la maison\n• 他在学校 (tā zài xuéxiào) = Il est à l\'école\n• 在中国学习 (zài zhōngguó xuéxí) = Étudier en Chine\n• 书在桌子上 (shū zài zhuōzi shàng) = Le livre est sur la table',
      howToUseEn: 'Structure 1: Subject + 在 + Place (to be at)\nStructure 2: 在 + Place + Verb (do sth at a place)\n\nExamples:\n• 我在家 (wǒ zài jiā) = I\'m at home\n• 他在学校 (tā zài xuéxiào) = He\'s at school\n• 在中国学习 (zài zhōngguó xuéxí) = Study in China\n• 书在桌子上 (shū zài zhuōzi shàng) = The book is on the table',
      commonMistakes: '❌ Ne confondez pas 在 et 是 !\n• Incorrect : 我是家\n• Correct : 我在家 (Je suis à la maison)\n\n❌ 在 pour les lieux, 是 pour l\'identité !\n• 我在北京 = Je suis à Pékin (localisation)\n• 我是老师 = Je suis professeur (identité)',
      commonMistakesEn: '❌ Don\'t confuse 在 and 是!\n• Incorrect: 我是家\n• Correct: 我在家 (I\'m at home)\n\n❌ 在 for places, 是 for identity!\n• 我在北京 = I\'m in Beijing (location)\n• 我是老师 = I\'m a teacher (identity)',
      tips: '💡 Pensez à la préposition "at/in/on" !\n• Si vous diriez "at/in/on" en anglais, utilisez 在\n• "I\'m AT home" = 我在家\n\n💡 Pour nier : 不在\n• 我不在家 (wǒ bú zài jiā) = Je ne suis pas à la maison',
      tipsEn: '💡 Think of the preposition "at/in/on"!\n• If you\'d say "at/in/on" in English, use 在\n• "I\'m AT home" = 我在家\n\n💡 To negate: 不在\n• 我不在家 (wǒ bú zài jiā) = I\'m not at home',
      relatedGrammar: ['grammar-negation-bu']
    },
    audio: 'audio/grammar/zai.wav',
    examples: [
      {
        hanzi: '我在家',
        pinyin: 'wǒ zài jiā',
        translation: 'I am at home',
        translationFr: 'Je suis à la maison'
      },
      {
        hanzi: '他在学校',
        pinyin: 'tā zài xuéxiào',
        translation: 'He is at school',
        translationFr: 'Il est à l\'école'
      }
    ],
    quiz: {
      prompt: 'Quel mot pour "être à/dans" ?',
      choices: ['在', '是', '有', '去'],
      correctChoiceIndex: 0
    },
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '妈妈___厨房',
      translation: 'Maman est dans la cuisine',
      translationEn: 'Mom is in the kitchen',
      choices: ['在', '是', '有', '去'],
      correctChoice: '在',
      pinyin: 'māma zài chúfáng'
    },
    tags: ['grammaire', 'localisation', 'verbe'],
    theme: 'grammar'
  },

  // ============================================
  // ASPECT ACCOMPLI (了)
  // ============================================
  {
    id: 'grammar-aspect-le',
    level: 'hsk2',
    hanzi: '了',
    pinyin: 'le',
    translation: 'completed action particle',
    translationFr: 'particule d\'action accomplie',
    category: 'grammaire',
    explanation: 'La particule 了 (le) indique qu\'une action est accomplie ou qu\'il y a un changement d\'état.',
    grammarExplanation: {
      whenToUse: '了 s\'utilise pour :\n• Indiquer qu\'une action est terminée/accomplie\n• Montrer un changement d\'état\n• Exprimer que quelque chose s\'est produit\n• Donner un ton définitif à la phrase',
      whenToUseEn: '了 is used to:\n• Indicate that an action is completed/finished\n• Show a change of state\n• Express that something happened\n• Give a definitive tone to the sentence',
      howToUse: 'Structure 1 : Verbe + 了 (+ Objet)\nStructure 2 : Phrase + 了 (changement)\n\nExemples :\n• 我吃了饭 (wǒ chī le fàn) = J\'ai mangé\n• 她来了 (tā lái le) = Elle est venue/arrivée\n• 下雨了 (xià yǔ le) = Il pleut (changement)\n• 我买了一本书 (wǒ mǎi le yì běn shū) = J\'ai acheté un livre',
      howToUseEn: 'Structure 1: Verb + 了 (+ Object)\nStructure 2: Sentence + 了 (change)\n\nExamples:\n• 我吃了饭 (wǒ chī le fàn) = I ate\n• 她来了 (tā lái le) = She came/arrived\n• 下雨了 (xià yǔ le) = It\'s raining (change)\n• 我买了一本书 (wǒ mǎi le yì běn shū) = I bought a book',
      commonMistakes: '❌ 了 n\'est PAS seulement le passé !\n• 我吃了饭 = J\'ai mangé (accompli)\n• 我没吃饭 = Je n\'ai pas mangé (PAS de 了 avec 没)\n\n❌ Ne mettez PAS 了 avec 没 !\n• Incorrect : 我没吃了饭\n• Correct : 我没吃饭\n\n❌ 了 peut être au présent pour un changement !\n• 下雨了！= Il pleut ! (maintenant)',
      commonMistakesEn: '❌ 了 is NOT just past tense!\n• 我吃了饭 = I ate (completed)\n• 我没吃饭 = I didn\'t eat (NO 了 with 没)\n\n❌ DON\'T put 了 with 没!\n• Incorrect: 我没吃了饭\n• Correct: 我没吃饭\n\n❌ 了 can be present for change!\n• 下雨了！= It\'s raining! (now)',
      tips: '💡 Deux positions pour 了 :\n• Après le verbe : action accomplie\n• Fin de phrase : changement d\'état\n\n💡 Pensez "accomplished" pas "past" !\n• C\'est l\'aspect, pas le temps\n• Focus sur : action terminée ✓',
      tipsEn: '💡 Two positions for 了:\n• After verb: completed action\n• End of sentence: change of state\n\n💡 Think "accomplished" not "past"!\n• It\'s aspect, not tense\n• Focus on: action finished ✓',
      relatedGrammar: ['grammar-negation-mei']
    },
    audio: 'audio/grammar/le.wav',
    examples: [
      {
        hanzi: '我吃了饭',
        pinyin: 'wǒ chī le fàn',
        translation: 'I have eaten',
        translationFr: 'J\'ai mangé'
      },
      {
        hanzi: '她来了',
        pinyin: 'tā lái le',
        translation: 'She came',
        translationFr: 'Elle est venue'
      }
    ],
    quiz: {
      prompt: 'Quelle particule pour une action accomplie ?',
      choices: ['了', '着', '过', '的'],
      correctChoiceIndex: 0
    },
    grammarQuiz: {
      type: 'particle-choice',
      sentenceBefore: '我买',
      sentenceAfter: '一本书',
      translation: 'J\'ai acheté un livre',
      translationEn: 'I bought a book',
      choices: ['了', '着', '过', '的'],
      correctChoice: '了',
      explanation: 'On utilise 了 après le verbe pour indiquer que l\'action est accomplie'
    },
    tags: ['grammaire', 'aspect', 'particule', 'passé'],
    theme: 'grammar'
  },

  // ============================================
  // COMPARAISON (比)
  // ============================================
  {
    id: 'grammar-comparison-bi',
    level: 'hsk2',
    hanzi: '比',
    pinyin: 'bǐ',
    translation: 'compared to',
    translationFr: 'comparé à',
    category: 'grammaire',
    explanation: 'La structure A 比 B + adjectif permet de comparer deux choses.',
    grammarExplanation: {
      whenToUse: '比 s\'utilise pour :\n• Comparer deux choses ou personnes\n• Dire qu\'une chose est "plus...que" une autre\n• Exprimer la supériorité\n• Comparer des qualités, tailles, prix, etc.',
      whenToUseEn: '比 is used to:\n• Compare two things or people\n• Say that one thing is "more...than" another\n• Express superiority\n• Compare qualities, sizes, prices, etc.',
      howToUse: 'Structure : A + 比 + B + Adjectif\n\nExemples :\n• 我比他高 (wǒ bǐ tā gāo) = Je suis plus grand que lui\n• 今天比昨天冷 (jīntiān bǐ zuótiān lěng) = Il fait plus froid aujourd\'hui qu\'hier\n• 茶比咖啡好喝 (chá bǐ kāfēi hǎohē) = Le thé est meilleur que le café\n• 这个比那个贵 (zhège bǐ nàge guì) = Celui-ci est plus cher que celui-là',
      howToUseEn: 'Structure: A + 比 + B + Adjective\n\nExamples:\n• 我比他高 (wǒ bǐ tā gāo) = I\'m taller than him\n• 今天比昨天冷 (jīntiān bǐ zuótiān lěng) = Today is colder than yesterday\n• 茶比咖啡好喝 (chá bǐ kāfēi hǎohē) = Tea is better than coffee\n• 这个比那个贵 (zhège bǐ nàge guì) = This is more expensive than that',
      commonMistakes: '❌ PAS de 很 avec 比 !\n• Incorrect : 我比他很高\n• Correct : 我比他高\n\n❌ Pour dire "pas aussi...que", utilisez 没有 !\n• 我没有他高 = Je ne suis pas aussi grand que lui\n• PAS : 我不比他高\n\n❌ L\'ordre est important !\n• 我比他高 ≠ 他比我高',
      commonMistakesEn: '❌ NO 很 with 比!\n• Incorrect: 我比他很高\n• Correct: 我比他高\n\n❌ For "not as...as", use 没有!\n• 我没有他高 = I\'m not as tall as him\n• NOT: 我不比他高\n\n❌ Order matters!\n• 我比他高 ≠ 他比我高',
      tips: '💡 Pensez à "A compared to B" !\n• A 比 B = A par rapport à B\n• L\'adjectif vient seul (pas de "plus")\n\n💡 Pour intensifier : ajoutez 一点儿, 得多\n• 我比他高一点儿 = Je suis un peu plus grand\n• 我比他高得多 = Je suis beaucoup plus grand',
      tipsEn: '💡 Think "A compared to B"!\n• A 比 B = A compared to B\n• Adjective comes alone (no "more")\n\n💡 To intensify: add 一点儿, 得多\n• 我比他高一点儿 = I\'m a bit taller\n• 我比他高得多 = I\'m much taller',
      relatedGrammar: []
    },
    audio: 'audio/grammar/bi.wav',
    examples: [
      {
        hanzi: '我比他高',
        pinyin: 'wǒ bǐ tā gāo',
        translation: 'I am taller than him',
        translationFr: 'Je suis plus grand que lui'
      },
      {
        hanzi: '今天比昨天冷',
        pinyin: 'jīntiān bǐ zuótiān lěng',
        translation: 'Today it\'s colder than yesterday',
        translationFr: 'Aujourd\'hui il fait plus froid qu\'hier'
      }
    ],
    quiz: {
      prompt: 'Quel mot pour comparer ?',
      choices: ['比', '跟', '和', '对'],
      correctChoiceIndex: 0
    },
    grammarQuiz: {
      type: 'sentence-reconstruction',
      translation: 'Le thé est meilleur que le café',
      translationEn: 'Tea is better than coffee',
      words: ['茶', '比', '咖啡', '好喝'],
      correctOrder: ['茶', '比', '咖啡', '好喝'],
      pinyin: 'chá bǐ kāfēi hǎohē'
    },
    tags: ['grammaire', 'comparaison', 'structure'],
    theme: 'grammar'
  },

  // ============================================
  // CONJONCTIONS (因为...所以)
  // ============================================
  {
    id: 'grammar-conjunction-yinwei-suoyi',
    level: 'hsk2',
    hanzi: '因为...所以',
    pinyin: 'yīnwèi...suǒyǐ',
    translation: 'because...therefore',
    translationFr: 'parce que...donc',
    category: 'grammaire',
    explanation: 'La structure 因为...所以 exprime la cause et la conséquence.',
    grammarExplanation: {
      whenToUse: '因为...所以 s\'utilise pour :\n• Exprimer une relation cause-effet\n• Expliquer pourquoi on fait quelque chose\n• Donner une raison suivie d\'une conséquence\n• Rendre le discours plus logique et clair',
      whenToUseEn: '因为...所以 is used to:\n• Express a cause-effect relationship\n• Explain why we do something\n• Give a reason followed by a consequence\n• Make speech more logical and clear',
      howToUse: 'Structure : 因为 + Cause, 所以 + Conséquence\n\nExemples :\n• 因为下雨，所以我不去 (yīnwèi xiàyǔ, suǒyǐ wǒ bú qù) = Parce qu\'il pleut, je n\'y vais pas\n• 因为很累，所以想睡觉 (yīnwèi hěn lèi, suǒyǐ xiǎng shuìjiào) = Parce que je suis fatigué, je veux dormir\n• 因为喜欢中文，所以学习中文 = Parce que j\'aime le chinois, j\'étudie le chinois',
      howToUseEn: 'Structure: 因为 + Cause, 所以 + Consequence\n\nExamples:\n• 因为下雨，所以我不去 (yīnwèi xiàyǔ, suǒyǐ wǒ bú qù) = Because it\'s raining, I won\'t go\n• 因为很累，所以想睡觉 (yīnwèi hěn lèi, suǒyǐ xiǎng shuìjiào) = Because I\'m tired, I want to sleep\n• 因为喜欢中文，所以学习中文 = Because I like Chinese, I study Chinese',
      commonMistakes: '❌ On peut OMETTRE 所以 (moins formel) !\n• 因为下雨，我不去 ✅\n• 因为下雨，所以我不去 ✅ (plus formel)\n\n❌ On peut commencer par 所以 aussi !\n• 所以我不去，因为下雨 ✅\n\n❌ Ne confondez pas avec 虽然...但是 !\n• 因为...所以 = cause → effet\n• 虽然...但是 = bien que...mais',
      commonMistakesEn: '❌ You can OMIT 所以 (less formal)!\n• 因为下雨，我不去 ✅\n• 因为下雨，所以我不去 ✅ (more formal)\n\n❌ You can start with 所以 too!\n• 所以我不去，因为下雨 ✅\n\n❌ Don\'t confuse with 虽然...但是!\n• 因为...所以 = because...so\n• 虽然...但是 = although...but',
      tips: '💡 Pensez à "PARCE QUE...DONC" !\n• 因为 = parce que (cause)\n• 所以 = donc (conséquence)\n\n💡 Structure flexible :\n• Les deux : 因为...所以... ✅\n• Seulement 因为 : 因为... ✅\n• Seulement 所以 : 所以... ✅',
      tipsEn: '💡 Think "BECAUSE...THEREFORE"!\n• 因为 = because (cause)\n• 所以 = so/therefore (consequence)\n\n💡 Flexible structure:\n• Both: 因为...所以... ✅\n• Only 因为: 因为... ✅\n• Only 所以: 所以... ✅',
      relatedGrammar: []
    },
    audio: 'audio/grammar/yinwei.wav',
    examples: [
      {
        hanzi: '因为下雨，所以我不去',
        pinyin: 'yīnwèi xiàyǔ, suǒyǐ wǒ bú qù',
        translation: 'Because it\'s raining, I\'m not going',
        translationFr: 'Parce qu\'il pleut, je n\'y vais pas'
      },
      {
        hanzi: '因为很累，所以想睡觉',
        pinyin: 'yīnwèi hěn lèi, suǒyǐ xiǎng shuìjiào',
        translation: 'Because I\'m tired, I want to sleep',
        translationFr: 'Parce que je suis fatigué, je veux dormir'
      }
    ],
    quiz: {
      prompt: 'Quelle structure pour "parce que...donc" ?',
      choices: ['因为...所以', '虽然...但是', '如果...就', '不但...而且'],
      correctChoiceIndex: 0
    },
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '___今天很冷，___我穿了很多衣服',
      translation: 'Parce qu\'il fait très froid aujourd\'hui, j\'ai mis beaucoup de vêtements',
      translationEn: 'Because it\'s very cold today, I wore many clothes',
      choices: ['因为...所以', '虽然...但是', '如果...就', '不但...而且'],
      correctChoice: '因为...所以',
      pinyin: 'yīnwèi jīntiān hěn lěng, suǒyǐ wǒ chuān le hěn duō yīfu'
    },
    tags: ['grammaire', 'conjonction', 'cause', 'conséquence'],
    theme: 'grammar'
  },

  // ============================================
  // VERBES MODAUX (会)
  // ============================================
  {
    id: 'grammar-modal-hui',
    level: 'hsk2',
    hanzi: '会',
    pinyin: 'huì',
    translation: 'can (learned ability)',
    translationFr: 'savoir faire (capacité apprise)',
    category: 'grammaire',
    explanation: 'Le verbe modal 会 (huì) exprime une capacité apprise, comme savoir parler une langue.',
    grammarExplanation: {
      whenToUse: '会 s\'utilise pour :\n• Exprimer une compétence APPRISE (savoir faire)\n• Parler de talents acquis par l\'apprentissage\n• Capacités qui nécessitent de l\'entraînement\n• Dire qu\'on maîtrise quelque chose',
      whenToUseEn: '会 is used to:\n• Express a LEARNED skill (know how to)\n• Talk about talents acquired through learning\n• Abilities that require training\n• Say that you master something',
      howToUse: 'Structure : Sujet + 会 + Verbe\n\nExemples :\n• 我会说中文 (wǒ huì shuō zhōngwén) = Je sais parler chinois\n• 他会游泳 (tā huì yóuyǒng) = Il sait nager\n• 她会开车 (tā huì kāichē) = Elle sait conduire\n• 我会做饭 (wǒ huì zuò fàn) = Je sais cuisiner',
      howToUseEn: 'Structure: Subject + 会 + Verb\n\nExamples:\n• 我会说中文 (wǒ huì shuō zhōngwén) = I can speak Chinese\n• 他会游泳 (tā huì yóuyǒng) = He can swim\n• 她会开车 (tā huì kāichē) = She can drive\n• 我会做饭 (wǒ huì zuò fàn) = I can cook',
      commonMistakes: '❌ Ne confondez pas 会, 能, 可以 !\n• 会 = compétence apprise (savoir)\n• 能 = capacité physique (pouvoir)\n• 可以 = permission (être autorisé)\n\nExemple :\n• 我会游泳 = Je sais nager (j\'ai appris)\n• 我能游泳 = Je peux nager (physiquement capable)\n• 我可以游泳吗？= Puis-je nager ? (permission)',
      commonMistakesEn: '❌ Don\'t confuse 会, 能, 可以!\n• 会 = learned skill (know how)\n• 能 = physical ability (can)\n• 可以 = permission (may)\n\nExample:\n• 我会游泳 = I can swim (learned)\n• 我能游泳 = I can swim (physically able)\n• 我可以游泳吗？= May I swim? (permission)',
      tips: '💡 Mnémonique pour 会 :\n• Si vous avez DÛ APPRENDRE → 会\n• Langues, instruments, sports → 会\n• "Je SAIS faire" = 会\n\n💡 Pour nier : 不会\n• 我不会说法语 = Je ne sais pas parler français',
      tipsEn: '💡 Mnemonic for 会:\n• If you had to LEARN it → 会\n• Languages, instruments, sports → 会\n• "I KNOW HOW to" = 会\n\n💡 To negate: 不会\n• 我不会说法语 = I can\'t speak French',
      relatedGrammar: ['grammar-negation-bu']
    },
    audio: 'audio/grammar/hui.wav',
    examples: [
      {
        hanzi: '我会说中文',
        pinyin: 'wǒ huì shuō zhōngwén',
        translation: 'I can speak Chinese',
        translationFr: 'Je sais parler chinois'
      },
      {
        hanzi: '他会游泳',
        pinyin: 'tā huì yóuyǒng',
        translation: 'He can swim',
        translationFr: 'Il sait nager'
      }
    ],
    quiz: {
      prompt: 'Quel modal pour une capacité apprise ?',
      choices: ['会', '能', '可以', '要'],
      correctChoiceIndex: 0
    },
    grammarQuiz: {
      type: 'translation-to-chinese',
      translation: 'Elle sait conduire',
      translationEn: 'She can drive',
      correctAnswer: '她会开车',
      pinyin: 'tā huì kāichē',
      choices: ['她会开车', '她能开车', '她可以开车', '她要开车']
    },
    tags: ['grammaire', 'modal', 'capacité'],
    theme: 'grammar'
  },

  // ============================================
  // STRUCTURE: SUJET + VERBE
  // ============================================
  {
    id: 'grammar-subject-verb',
    level: 'hsk1',
    hanzi: 'Sujet + Verbe',
    pinyin: 'Zhǔyǔ + Dòngcí',
    translation: 'Subject + Verb',
    translationFr: 'Sujet + Verbe',
    category: 'grammaire',
    explanation: 'La structure de base en chinois suit l\'ordre Sujet - Verbe - Objet (SVO), similaire au français.',
    grammarExplanation: {
      whenToUse: 'Cette structure est utilisée pour :\n• Toutes les phrases d\'action simples\n• Décrire ce que quelqu\'un fait\n• Former des phrases déclaratives de base',
      whenToUseEn: 'This structure is used for:\n• All simple action sentences\n• Describing what someone does\n• Forming basic declarative sentences',
      howToUse: 'Structure : **Sujet + Verbe + (Objet)**\n\nExemples :\n• 我吃饭 (wǒ chī fàn) = Je mange (du riz)\n• 他工作 (tā gōngzuò) = Il travaille\n• 妈妈做饭 (māma zuò fàn) = Maman cuisine\n• 学生学习 (xuésheng xuéxí) = L\'étudiant étudie',
      howToUseEn: 'Structure: **Subject + Verb + (Object)**\n\nExamples:\n• 我吃饭 (wǒ chī fàn) = I eat (rice)\n• 他工作 (tā gōngzuò) = He works\n• 妈妈做饭 (māma zuò fàn) = Mom cooks\n• 学生学习 (xuésheng xuéxí) = The student studies',
      commonMistakes: '❌ NE PAS inverser l\'ordre !\n• Incorrect : 吃我饭 ❌\n• Correct : 我吃饭 ✅\n\n❌ Le verbe vient TOUJOURS après le sujet\n• Incorrect : 工作他 ❌\n• Correct : 他工作 ✅',
      commonMistakesEn: '❌ DON\'T reverse the order!\n• Incorrect: 吃我饭 ❌\n• Correct: 我吃饭 ✅\n\n❌ The verb ALWAYS comes after the subject\n• Incorrect: 工作他 ❌\n• Correct: 他工作 ✅',
      tips: '💡 L\'ordre est FIXE en chinois\n• Contrairement au français où on peut dire "Mange, Pierre!", en chinois l\'ordre Sujet-Verbe ne change jamais\n\n💡 Pensez SVO = Sujet Verbe Objet\n• Comme en français : "Je (S) mange (V) du riz (O)"',
      tipsEn: '💡 The order is FIXED in Chinese\n• Unlike English where you can say "Eat, Peter!", in Chinese the Subject-Verb order never changes\n\n💡 Think SVO = Subject Verb Object\n• Same as English: "I (S) eat (V) rice (O)"',
      relatedGrammar: []
    },
    audio: 'audio/grammar/subject-verb.wav',
    examples: [
      {
        hanzi: '我学习',
        pinyin: 'wǒ xuéxí',
        translation: 'I study',
        translationFr: 'J\'étudie'
      },
      {
        hanzi: '他吃饭',
        pinyin: 'tā chī fàn',
        translation: 'He eats',
        translationFr: 'Il mange'
      },
      {
        hanzi: '老师工作',
        pinyin: 'lǎoshī gōngzuò',
        translation: 'The teacher is working',
        translationFr: 'Le professeur travaille'
      }
    ],
    quiz: {
      prompt: 'Quel est l\'ordre correct ?',
      choices: ['Sujet + Verbe', 'Verbe + Sujet', 'Objet + Verbe + Sujet', 'Verbe seul'],
      correctChoiceIndex: 0
    },
    grammarQuiz: {
      type: 'sentence-reconstruction',
      words: ['他', '工作'],
      translation: 'Il travaille',
      translationEn: 'He works',
      correctOrder: ['他', '工作'],
      pinyin: 'tā gōngzuò'
    },
    tags: ['grammaire', 'structure', 'base'],
    theme: 'grammar'
  },

  // ============================================
  // ADJECTIFS: 很 + ADJECTIF
  // ============================================
  {
    id: 'grammar-adjectives-hen',
    level: 'hsk1',
    hanzi: '很 + 形容词',
    pinyin: 'hěn + xíngróngcí',
    translation: '很 + adjective',
    translationFr: '很 + adjectif',
    category: 'grammaire',
    explanation: 'En chinois, les adjectifs prédicatifs (qui décrivent le sujet) doivent généralement être précédés de 很.',
    grammarExplanation: {
      whenToUse: '很 s\'utilise :\n• Avant un adjectif qui décrit le sujet\n• Pour former une phrase descriptive simple\n• Même quand on ne veut pas dire "très" !\n• Dans la majorité des phrases avec adjectifs',
      whenToUseEn: '很 is used:\n• Before an adjective describing the subject\n• To form a simple descriptive sentence\n• Even when you don\'t mean "very"!\n• In most sentences with adjectives',
      howToUse: 'Structure : **Sujet + 很 + Adjectif**\n\nExemples :\n• 我很高 (wǒ hěn gāo) = Je suis grand\n• 天气很好 (tiānqì hěn hǎo) = Le temps est beau\n• 他很忙 (tā hěn máng) = Il est occupé\n• 中文很难 (zhōngwén hěn nán) = Le chinois est difficile',
      howToUseEn: 'Structure: **Subject + 很 + Adjective**\n\nExamples:\n• 我很高 (wǒ hěn gāo) = I am tall\n• 天气很好 (tiānqì hěn hǎo) = The weather is nice\n• 他很忙 (tā hěn máng) = He is busy\n• 中文很难 (zhōngwén hěn nán) = Chinese is difficult',
      commonMistakes: '❌ NE PAS oublier 很 !\n• Incorrect : 我高 ❌ (sonne comme une comparaison)\n• Correct : 我很高 ✅\n\n❌ 很 ne signifie pas toujours "très"\n• 他很高 = Il est grand (pas forcément "très grand")\n• Pour dire "très", utilisez 非常 (fēicháng) ou accentuez 很',
      commonMistakesEn: '❌ DON\'T forget 很!\n• Incorrect: 我高 ❌ (sounds like a comparison)\n• Correct: 我很高 ✅\n\n❌ 很 doesn\'t always mean "very"\n• 他很高 = He is tall (not necessarily "very tall")\n• To say "very", use 非常 (fēicháng) or stress 很',
      tips: '💡 很 est un "mot grammatical"\n• Il rend la phrase complète, même si vous ne voulez pas dire "très"\n• Sans 很, la phrase sonne incomplète ou comparative\n\n💡 Quand VRAIMENT "très" ?\n• 非常好 (fēicháng hǎo) = vraiment très bien\n• 特别大 (tèbié dà) = particulièrement grand',
      tipsEn: '💡 很 is a "grammatical word"\n• It makes the sentence complete, even if you don\'t mean "very"\n• Without 很, the sentence sounds incomplete or comparative\n\n💡 When REALLY "very"?\n• 非常好 (fēicháng hǎo) = really very good\n• 特别大 (tèbié dà) = particularly big',
      relatedGrammar: ['grammar-comparison-bi']
    },
    audio: 'audio/grammar/adjectives.wav',
    examples: [
      {
        hanzi: '他很高',
        pinyin: 'tā hěn gāo',
        translation: 'He is tall',
        translationFr: 'Il est grand'
      },
      {
        hanzi: '这个很好',
        pinyin: 'zhège hěn hǎo',
        translation: 'This one is good',
        translationFr: 'Celui-ci est bien'
      },
      {
        hanzi: '天气很冷',
        pinyin: 'tiānqì hěn lěng',
        translation: 'It\'s cold',
        translationFr: 'Il fait froid'
      }
    ],
    quiz: {
      prompt: 'Que faut-il ajouter avant un adjectif ?',
      choices: ['很', '了', '的', '吗'],
      correctChoiceIndex: 0
    },
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '他___高',
      translation: 'Il est grand',
      translationEn: 'He is tall',
      choices: ['很', '了', '的', '在'],
      correctChoice: '很',
      explanation: 'En chinois, on utilise 很 avant les adjectifs prédicatifs',
      pinyin: 'tā ___ gāo'
    },
    tags: ['grammaire', 'adjectif', 'description'],
    theme: 'grammar'
  }
];

// Fusionner les leçons de base avec les leçons étendues
export const grammarLessons: LessonItem[] = [
  ...grammarLessonsSubstack,
  ...grammarLessonsBase,
  ...grammarLessonsExtended
];

// Fonction helper pour récupérer une leçon de grammaire par ID
export const getGrammarLessonById = (id: string): LessonItem | undefined => {
  return grammarLessons.find(lesson => lesson.id === id);
};

// Fonction pour récupérer toutes les leçons de grammaire par niveau
export const getGrammarLessonsByLevel = (level: string): LessonItem[] => {
  return grammarLessons.filter(lesson => lesson.level === level);
};
