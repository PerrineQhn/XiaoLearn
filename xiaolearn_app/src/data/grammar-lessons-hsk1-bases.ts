/**
 * grammar-lessons-hsk1-bases.ts — 5 fiches HSK1 « socle »
 * --------------------------------------------------------
 * Points de grammaire fondamentaux qui manquaient au catalogue :
 *   - 是 (copule d'identité)
 *   - 有 (possession / existence)
 *   - Pronoms interrogatifs (什么/谁/哪儿/多少/几)
 *   - 二 vs 两 (deux formes du « deux »)
 *   - 几 vs 多少 (deux « combien »)
 *
 * Chaque entrée suit STRICTEMENT le shape `LessonItem` avec
 * `grammarExplanation` complet + `examples` + `quiz` + `grammarQuiz`.
 */
import type { LessonItem } from '../types';

export const grammarLessonsHsk1Bases: LessonItem[] = [
  // ============================================
  // HSK1 — 是 (verbe être / copule)
  // ============================================
  {
    id: 'grammar-shi-copula',
    level: 'hsk1',
    hanzi: '是',
    pinyin: 'shì',
    translation: 'to be (copula of identity)',
    translationFr: 'être (copule d\'identité)',
    category: 'grammaire',
    explanation: '是 (shì) relie un sujet à un NOM pour affirmer identité, catégorie, fonction. À NE PAS utiliser avec des adjectifs (on emploie 很 à la place) ni pour la localisation (on emploie 在).',
    grammarExplanation: {
      whenToUse: '是 s\'emploie pour :\n• L\'identité (« je suis X ») : 我是学生\n• La catégorie / description (« c\'est un X ») : 这是书\n• La profession : 他是老师\n• La nationalité : 我是法国人\n• La structure de focus 是...的 (mise en relief)',
      whenToUseEn: '是 is used for:\n• Identity ("I am X"): 我是学生\n• Category / description ("this is an X"): 这是书\n• Profession: 他是老师\n• Nationality: 我是法国人\n• The 是...的 focus structure (highlighting)',
      howToUse: 'Structure : Sujet + 是 + Nom\n\nExemples :\n• 我是学生 (wǒ shì xuésheng) = Je suis étudiant\n• 他是老师 (tā shì lǎoshī) = Il est professeur\n• 这是书 (zhè shì shū) = C\'est un livre\n• 我是法国人 (wǒ shì Fǎguórén) = Je suis français',
      howToUseEn: 'Structure: Subject + 是 + Noun\n\nExamples:\n• 我是学生 = I am a student\n• 他是老师 = He is a teacher\n• 这是书 = This is a book\n• 我是法国人 = I am French',
      commonMistakes: '❌ NE PAS mettre 是 avant un adjectif seul\n• Incorrect : 他是高\n• Correct : 他很高 (« il est grand »)\n\n❌ Négation UNIQUE : 不是 (jamais 没是)\n• Incorrect : 他没是老师\n• Correct : 他不是老师\n\n❌ NE PAS utiliser 是 pour la localisation\n• Incorrect : 我是家\n• Correct : 我在家 (« je suis à la maison »)',
      commonMistakesEn: '❌ DON\'T put 是 before a standalone adjective\n• Incorrect: 他是高\n• Correct: 他很高 ("he is tall")\n\n❌ ONLY negation: 不是 (never 没是)\n• Incorrect: 他没是老师\n• Correct: 他不是老师\n\n❌ DON\'T use 是 for location\n• Incorrect: 我是家\n• Correct: 我在家 ("I am at home")',
      tips: '💡 是 = « est » copule d\'identité, uniquement devant un NOM.\n💡 Pour les adjectifs, utilise 很 : 他很高.\n💡 Pour la localisation, utilise 在 : 我在家.\n💡 是 se prononce shì (4e ton) et est souvent atonique dans la parole rapide.',
      tipsEn: '💡 是 = "is" identity copula, only before a NOUN.\n💡 For adjectives, use 很: 他很高.\n💡 For location, use 在: 我在家.\n💡 是 is pronounced shì (4th tone) and often unstressed in fast speech.',
      relatedGrammar: ['grammar-adjectives-hen', 'grammar-location-zai', 'grammar-shi-de-focus']
    },
    audio: 'audio/grammar/shi-copula.wav',
    examples: [
      { hanzi: '我是学生', pinyin: 'wǒ shì xuésheng', translation: 'I am a student', translationFr: 'Je suis étudiant·e' },
      { hanzi: '他是老师', pinyin: 'tā shì lǎoshī', translation: 'He is a teacher', translationFr: 'Il est professeur' },
      { hanzi: '这是我的书', pinyin: 'zhè shì wǒ de shū', translation: 'This is my book', translationFr: 'C\'est mon livre' }
    ],
    quiz: {
      prompt: 'Quel mot utilise-t-on pour dire « être » (identité) ?',
      choices: ['在', '有', '很', '是'],
      correctChoiceIndex: 3
    },
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '他___中国人',
      translation: 'Il est chinois',
      translationEn: 'He is Chinese',
      choices: ['是', '在', '有', '很'],
      correctChoice: '是',
      explanation: '是 est la copule d\'identité : Sujet + 是 + Nationalité. 在 = localisation, 有 = possession, 很 = pour les adjectifs.'
    },
    tags: ['grammaire', 'copule', 'identité', 'être'],
    theme: 'grammar'
  },

  // ============================================
  // HSK1 — 有 (avoir / il y a)
  // ============================================
  {
    id: 'grammar-you-possession-existence',
    level: 'hsk1',
    hanzi: '有',
    pinyin: 'yǒu',
    translation: 'to have / there is',
    translationFr: 'avoir / il y a',
    category: 'grammaire',
    explanation: '有 (yǒu) exprime à la fois la POSSESSION (« avoir ») et l\'EXISTENCE (« il y a »). C\'est un pilier du HSK1. Sa négation est UNIQUE : 没有 (jamais 不有).',
    grammarExplanation: {
      whenToUse: '有 s\'emploie pour :\n• La possession (« j\'ai X ») : 我有钱\n• L\'existence en un lieu (« il y a X à… ») : 桌子上有书\n• Une quantité générale : 我有两个孩子\n• Les questions de possession/existence : 你有吗？',
      whenToUseEn: '有 is used for:\n• Possession ("I have X"): 我有钱\n• Existence in a place ("there is X at…"): 桌子上有书\n• General quantities: 我有两个孩子\n• Possession/existence questions: 你有吗？',
      howToUse: 'POSSESSION → Sujet + 有 + Objet\n• 我有两个孩子 (wǒ yǒu liǎng ge háizi) = J\'ai deux enfants\n\nEXISTENCE → Lieu + 有 + Objet (l\'ordre commence par le LIEU !)\n• 桌子上有一本书 (zhuōzi shàng yǒu yì běn shū) = Il y a un livre sur la table\n\nNÉGATION OBLIGATOIRE : 没有 (jamais 不有)\n• 我没有钱 (wǒ méi yǒu qián) = Je n\'ai pas d\'argent',
      howToUseEn: 'POSSESSION → Subject + 有 + Object\n• 我有两个孩子 = I have two children\n\nEXISTENCE → Place + 有 + Object (place FIRST!)\n• 桌子上有一本书 = There is a book on the table\n\nMANDATORY NEGATION: 没有 (never 不有)\n• 我没有钱 = I don\'t have money',
      commonMistakes: '❌ Négation avec 不 est IMPOSSIBLE\n• Incorrect : 我不有钱\n• Correct : 我没有钱\n\n❌ NE PAS confondre 是 (identité) et 有 (possession/existence)\n• Incorrect : 桌子上是书 (pour « il y a un livre »)\n• Correct : 桌子上有书\n\n❌ Pour l\'existence, structure LIEU + 有\n• Incorrect : 有书桌子上\n• Correct : 桌子上有书',
      commonMistakesEn: '❌ Negation with 不 is IMPOSSIBLE\n• Incorrect: 我不有钱\n• Correct: 我没有钱\n\n❌ DON\'T confuse 是 (identity) with 有 (possession/existence)\n• Incorrect: 桌子上是书 (for "there is a book")\n• Correct: 桌子上有书\n\n❌ For existence, structure is PLACE + 有\n• Incorrect: 有书桌子上\n• Correct: 桌子上有书',
      tips: '💡 Mnémo : 有 = « avoir » OU « il y a ».\n💡 Négation UNIQUE : 没有 (souvent abrégé en 没 seul à l\'oral : 我没钱).\n💡 « il y a » = LIEU d\'abord, PUIS 有 : c\'est l\'inverse du français.\n💡 Question rapide : 你有吗？« tu en as ? »',
      tipsEn: '💡 Mnemonic: 有 = "have" OR "there is".\n💡 UNIQUE negation: 没有 (often shortened to 没 in speech: 我没钱).\n💡 "there is" = PLACE first, THEN 有 — reverse of English.\n💡 Quick question: 你有吗？"Do you have any?"',
      relatedGrammar: ['grammar-negation-mei', 'grammar-shi-copula']
    },
    audio: 'audio/grammar/you-possession-existence.wav',
    examples: [
      { hanzi: '我有一个哥哥', pinyin: 'wǒ yǒu yí ge gēge', translation: 'I have an older brother', translationFr: 'J\'ai un grand frère' },
      { hanzi: '房间里有电视', pinyin: 'fángjiān lǐ yǒu diànshì', translation: 'There is a TV in the room', translationFr: 'Il y a une télé dans la chambre' },
      { hanzi: '你有时间吗？', pinyin: 'nǐ yǒu shíjiān ma?', translation: 'Do you have time?', translationFr: 'Tu as le temps ?' }
    ],
    quiz: {
      prompt: 'Comment nie-t-on 有 (avoir) ?',
      choices: ['不', '没有', '不是', '别'],
      correctChoiceIndex: 1
    },
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '我___钱',
      translation: 'Je n\'ai pas d\'argent',
      translationEn: 'I don\'t have money',
      choices: ['不', '没有', '不是', '别'],
      correctChoice: '没有',
      explanation: '有 se nie EXCLUSIVEMENT avec 没有 (jamais 不有). 不 ne se combine pas avec 有.'
    },
    tags: ['grammaire', 'possession', 'existence', 'avoir'],
    theme: 'grammar'
  },

  // ============================================
  // HSK1 — Pronoms interrogatifs (什么/谁/哪儿/多少/几)
  // ============================================
  {
    id: 'grammar-question-words',
    level: 'hsk1',
    hanzi: '什么/谁/哪儿/多少/几',
    pinyin: 'shénme / shéi / nǎr / duōshǎo / jǐ',
    translation: 'question words (what, who, where, how much/many)',
    translationFr: 'mots interrogatifs (quoi, qui, où, combien)',
    category: 'grammaire',
    explanation: 'Les mots interrogatifs remplacent l\'élément inconnu à la PLACE où il apparaîtrait dans la réponse. L\'ORDRE des mots reste INCHANGÉ. On n\'ajoute PAS 吗 avec ces mots.',
    grammarExplanation: {
      whenToUse: 'Ces mots servent aux questions OUVERTES :\n• 什么 (shénme) = quoi / quel\n• 谁 (shéi/shuí) = qui\n• 哪儿 / 哪里 (nǎr / nǎlǐ) = où\n• 多少 (duōshǎo) = combien (grand nombre ou inconnu)\n• 几 (jǐ) = combien (petit nombre, avec classificateur)\n\n⚠️ SANS 吗 (contrairement aux questions oui/non).',
      whenToUseEn: 'These are for OPEN questions:\n• 什么 = what / which\n• 谁 = who\n• 哪儿 / 哪里 = where\n• 多少 = how much / how many (large or unknown)\n• 几 = how many (small, with measure word)\n\n⚠️ NO 吗 (unlike yes/no questions).',
      howToUse: 'Le mot interrogatif prend la PLACE de la réponse :\n\n• 你叫什么？(nǐ jiào shénme?) = Tu t\'appelles comment ?\n  → 我叫小明 (« Xiaoming » remplace 什么)\n\n• 谁是老师？(shéi shì lǎoshī?) = Qui est le professeur ?\n\n• 你在哪儿？(nǐ zài nǎr?) = Où es-tu ?\n  → 我在家\n\n• 多少钱？(duōshǎo qián?) = Combien ça coûte ?\n\n• 你有几个孩子？(nǐ yǒu jǐ ge háizi?) = Combien d\'enfants as-tu ?',
      howToUseEn: 'The question word takes the PLACE of the answer:\n\n• 你叫什么？= What\'s your name?\n  → 我叫小明 ("Xiaoming" replaces 什么)\n\n• 谁是老师？= Who is the teacher?\n\n• 你在哪儿？= Where are you?\n  → 我在家\n\n• 多少钱？= How much?\n\n• 你有几个孩子？= How many children do you have?',
      commonMistakes: '❌ NE PAS ajouter 吗 avec un mot interrogatif\n• Incorrect : 你叫什么吗？\n• Correct : 你叫什么？\n\n❌ NE PAS déplacer le mot interrogatif en tête de phrase\n• Incorrect : 什么你叫？\n• Correct : 你叫什么？\n\n❌ NE PAS confondre 多少 (grand nombre / inconnu / prix) et 几 (petit nombre, avec CL)\n• 多少钱？(combien ça coûte) ≠ 几个 (combien d\'unités)',
      commonMistakesEn: '❌ DON\'T add 吗 with a question word\n• Incorrect: 你叫什么吗？\n• Correct: 你叫什么？\n\n❌ DON\'T move the question word to the front\n• Incorrect: 什么你叫？\n• Correct: 你叫什么？\n\n❌ DON\'T mix up 多少 (large / unknown / price) and 几 (small, with CL)\n• 多少钱？(how much) ≠ 几个 (how many units)',
      tips: '💡 Règle d\'or : la POSITION du mot interrogatif = la POSITION de la réponse.\n💡 Ex : Q « 你在哪儿？» → R « 我在家 » — 家 prend la place de 哪儿.\n💡 谁 se prononce shéi mais aussi shuí (registre soutenu).\n💡 哪儿 est nordiste, 哪里 est plus neutre / méridional.',
      tipsEn: '💡 Golden rule: POSITION of question word = POSITION of the answer.\n💡 Ex: Q "你在哪儿？" → A "我在家" — 家 takes the place of 哪儿.\n💡 谁 is pronounced shéi but also shuí (more formal).\n💡 哪儿 is northern, 哪里 is more neutral / southern.',
      relatedGrammar: ['grammar-question-ma']
    },
    audio: 'audio/grammar/question-words.wav',
    examples: [
      { hanzi: '你叫什么名字？', pinyin: 'nǐ jiào shénme míngzi?', translation: 'What is your name?', translationFr: 'Comment tu t\'appelles ?' },
      { hanzi: '谁在教室？', pinyin: 'shéi zài jiàoshì?', translation: 'Who is in the classroom?', translationFr: 'Qui est dans la salle de classe ?' },
      { hanzi: '你家有几口人？', pinyin: 'nǐ jiā yǒu jǐ kǒu rén?', translation: 'How many people are in your family?', translationFr: 'Combien de personnes dans ta famille ?' },
      { hanzi: '多少钱？', pinyin: 'duōshǎo qián?', translation: 'How much does it cost?', translationFr: 'Combien ça coûte ?' }
    ],
    quiz: {
      prompt: 'Quel mot pour « combien » (grand nombre / prix) ?',
      choices: ['多少', '几', '什么', '哪儿'],
      correctChoiceIndex: 0
    },
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '你有___个哥哥？',
      translation: 'Combien de grands frères as-tu ?',
      translationEn: 'How many older brothers do you have?',
      choices: ['几', '多少', '什么', '谁'],
      correctChoice: '几',
      explanation: '几 s\'emploie pour un petit nombre attendu (< 10) AVEC classificateur (个). 多少 conviendrait pour un grand nombre ou une somme d\'argent.'
    },
    tags: ['grammaire', 'question', 'interrogatif', 'pronoms'],
    theme: 'grammar'
  },

  // ============================================
  // HSK1 — 二 vs 两 (deux formes de « deux »)
  // ============================================
  {
    id: 'grammar-er-vs-liang',
    level: 'hsk1',
    hanzi: '二 / 两',
    pinyin: 'èr / liǎng',
    translation: '"two": 二 (numeral) vs 两 (quantity)',
    translationFr: '« deux » : 二 (chiffre) ou 两 (quantité)',
    category: 'grammaire',
    explanation: 'Le chinois possède DEUX formes pour « deux » qui NE SONT PAS interchangeables : 二 pour les chiffres/dates/rangs, 两 pour compter des choses (devant un classificateur).',
    grammarExplanation: {
      whenToUse: '二 (èr) = chiffre PUR :\n• Numéros et rangs : 二楼 (2e étage), 第二 (deuxième)\n• Dates / mois : 二月 (février)\n• Séquences de chiffres : 一，二，三 / 电话号码里的二\n• Maths : 一加一等于二\n\n两 (liǎng) = QUANTITÉ devant un classificateur :\n• 两个人 (deux personnes)\n• 两杯茶 (deux tasses de thé)\n• 两点 (deux heures)',
      whenToUseEn: '二 (èr) = PURE numeral:\n• Numbers and ranks: 二楼 (2nd floor), 第二 (second)\n• Dates / months: 二月 (February)\n• Digit sequences: 一，二，三 / the "2" in a phone number\n• Math: 一加一等于二\n\n两 (liǎng) = QUANTITY before a measure word:\n• 两个人 (two people)\n• 两杯茶 (two cups of tea)\n• 两点 (two o\'clock)',
      howToUse: 'RÈGLE : y a-t-il un CLASSIFICATEUR derrière ?\n• OUI → 两 : 两个, 两本, 两位, 两天\n• NON → 二 : 二十, 一二三, 第二\n\nExceptions à retenir :\n• Grandes unités (千, 万, 亿) → souvent 两 : 两千, 两万, 两亿\n• Heures : 两点 (2h) mais 十二点 (12h) — le « 2 » d\'un nombre composé reste 二\n• Le « 2 » d\'un numéro téléphonique / code se lit 二',
      howToUseEn: 'RULE: is there a MEASURE WORD after?\n• YES → 两: 两个, 两本, 两位, 两天\n• NO → 二: 二十, 一二三, 第二\n\nExceptions worth memorising:\n• Big units (千, 万, 亿) → often 两: 两千, 两万, 两亿\n• Hours: 两点 (2 o\'clock) but 十二点 (12 o\'clock) — the "2" inside a compound stays 二\n• The "2" in a phone number / code is read 二',
      commonMistakes: '❌ Devant un classificateur, 二 est FAUX\n• Incorrect : 二个人\n• Correct : 两个人\n\n❌ Pour les mois, 两 est FAUX\n• Incorrect : 两月\n• Correct : 二月 (février)\n\n❌ Pour un rang, 两 est FAUX\n• Incorrect : 第两\n• Correct : 第二\n\n❌ Pour l\'heure « 2h », 二 est FAUX\n• Incorrect : 二点\n• Correct : 两点',
      commonMistakesEn: '❌ Before a measure word, 二 is WRONG\n• Incorrect: 二个人\n• Correct: 两个人\n\n❌ For months, 两 is WRONG\n• Incorrect: 两月\n• Correct: 二月 (February)\n\n❌ For a rank, 两 is WRONG\n• Incorrect: 第两\n• Correct: 第二\n\n❌ For "2 o\'clock", 二 is WRONG\n• Incorrect: 二点\n• Correct: 两点',
      tips: '💡 Test rapide : « Y a-t-il un classificateur ? »\n  → Oui : 两. Non : 二.\n💡 Pour lire un numéro chiffre par chiffre (0-2-3-4), on dit 二.\n💡 Pour un rang / une date / un étage → 二.\n💡 Pour une quantité comptable → 两.',
      tipsEn: '💡 Quick test: "Is there a measure word?"\n  → Yes: 两. No: 二.\n💡 To read a phone number digit by digit (0-2-3-4), say 二.\n💡 For a rank / date / floor → 二.\n💡 For a countable quantity → 两.',
      relatedGrammar: ['grammar-measure-words']
    },
    audio: 'audio/grammar/er-vs-liang.wav',
    examples: [
      { hanzi: '两个苹果', pinyin: 'liǎng ge píngguǒ', translation: 'two apples', translationFr: 'deux pommes' },
      { hanzi: '二月', pinyin: 'èr yuè', translation: 'February', translationFr: 'février' },
      { hanzi: '第二课', pinyin: 'dì èr kè', translation: 'lesson two', translationFr: 'leçon deux' },
      { hanzi: '两点半', pinyin: 'liǎng diǎn bàn', translation: 'half past two', translationFr: 'deux heures et demie' }
    ],
    quiz: {
      prompt: 'Comment dire « deux personnes » ?',
      choices: ['二个人', '两个人', '二人', '两人'],
      correctChoiceIndex: 1
    },
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '我买___本书',
      translation: 'J\'achète deux livres',
      translationEn: 'I buy two books',
      choices: ['二', '两', '双', '几'],
      correctChoice: '两',
      explanation: 'Devant un classificateur (本 pour les livres), on emploie 两 et non 二. 二本 est incorrect.'
    },
    tags: ['grammaire', 'nombre', 'deux', 'classificateur'],
    theme: 'grammar'
  },

  // ============================================
  // HSK1 — 几 vs 多少 (deux « combien »)
  // ============================================
  {
    id: 'grammar-ji-vs-duoshao',
    level: 'hsk1',
    hanzi: '几 / 多少',
    pinyin: 'jǐ / duōshao',
    translation: '"how many": 几 (small) vs 多少 (large/unknown)',
    translationFr: '« combien » : 几 (petit) vs 多少 (grand ou inconnu)',
    category: 'grammaire',
    explanation: 'Le chinois distingue deux mots pour « combien » selon la QUANTITÉ ATTENDUE : 几 pour un petit nombre (moins de 10), 多少 pour un grand nombre ou une quantité inconnue.',
    grammarExplanation: {
      whenToUse: '几 (jǐ) :\n• Quand on attend un PETIT nombre (< 10, souvent 1-9)\n• Classificateur OBLIGATOIRE derrière\n• Ex : 几个人？几本书？几岁？\n\n多少 (duōshao) :\n• Grand nombre attendu, ou nombre TOTALEMENT inconnu\n• Souvent SANS classificateur\n• Prix, populations, numéros, dizaines/centaines\n• Ex : 多少钱？多少学生？',
      whenToUseEn: '几 (jǐ):\n• Expects a SMALL number (< 10, often 1-9)\n• Measure word MANDATORY after\n• Ex: 几个人？几本书？几岁？\n\n多少 (duōshao):\n• Large or completely unknown number\n• Often WITHOUT measure word\n• Prices, populations, numbers, dozens/hundreds\n• Ex: 多少钱？多少学生？',
      howToUse: '几 + CL + Nom (obligatoire) :\n• 你有几个孩子？ = Combien d\'enfants as-tu ? (on suppose < 10)\n• 你几岁？ = Quel âge as-tu ? (enfant)\n• 现在几点？ = Quelle heure est-il ? (0-12)\n\n多少 (+ Nom, souvent sans CL) :\n• 多少钱？ = Combien ça coûte ?\n• 你们班有多少学生？ = Combien d\'étudiants dans votre classe ? (dizaines possibles)\n• 你的电话号码是多少？ = Quel est ton numéro ?',
      howToUseEn: '几 + MW + Noun (mandatory):\n• 你有几个孩子？ = How many children do you have? (assumed < 10)\n• 你几岁？ = How old are you? (child)\n• 现在几点？ = What time is it? (0-12)\n\n多少 (+ Noun, often no MW):\n• 多少钱？ = How much?\n• 你们班有多少学生？ = How many students in your class? (dozens possible)\n• 你的电话号码是多少？ = What is your phone number?',
      commonMistakes: '❌ Pour le prix, 几 est inadapté\n• Rare / faux : 几钱？\n• Correct : 多少钱？\n\n❌ Pour l\'âge :\n• Enfant : 你几岁？\n• Adulte : 你多大？(PAS 你几岁 — trop enfantin)\n• Personne âgée : 您多大年纪？\n\n❌ NE PAS oublier le classificateur avec 几\n• Incorrect : 几人？(rare, sonne étrange)\n• Correct : 几个人？\n\n❌ NE PAS confondre 多少 (quantité) et 什么 (« quoi »)',
      commonMistakesEn: '❌ For prices, 几 is unusual\n• Rare / wrong: 几钱？\n• Correct: 多少钱？\n\n❌ For age:\n• Child: 你几岁？\n• Adult: 你多大？(NOT 你几岁 — too childish)\n• Elder: 您多大年纪？\n\n❌ DON\'T forget the measure word with 几\n• Incorrect: 几人？(rare, sounds odd)\n• Correct: 几个人？\n\n❌ DON\'T confuse 多少 (quantity) with 什么 ("what")',
      tips: '💡 Règle des « doigts de la main » : si le nombre attendu peut se compter sur une main → 几. Sinon → 多少.\n💡 Prix, populations, numéros de téléphone → TOUJOURS 多少.\n💡 Âge d\'un enfant → 几岁 ; d\'un adulte → 多大.\n💡 Astuce mémo : 多少 contient 多 (« beaucoup »), donc pour les GRANDES quantités.',
      tipsEn: '💡 "Hand rule": if you can count the expected number on one hand → 几. Otherwise → 多少.\n💡 Prices, populations, phone numbers → ALWAYS 多少.\n💡 Age of a child → 几岁; of an adult → 多大.\n💡 Mnemonic: 多少 contains 多 ("many"), so use it for LARGE quantities.',
      relatedGrammar: ['grammar-question-words', 'grammar-measure-words']
    },
    audio: 'audio/grammar/ji-vs-duoshao.wav',
    examples: [
      { hanzi: '你家有几口人？', pinyin: 'nǐ jiā yǒu jǐ kǒu rén?', translation: 'How many people are in your family?', translationFr: 'Combien de personnes dans ta famille ?' },
      { hanzi: '多少钱？', pinyin: 'duōshao qián?', translation: 'How much?', translationFr: 'Combien ça coûte ?' },
      { hanzi: '你几岁？', pinyin: 'nǐ jǐ suì?', translation: 'How old are you? (to a child)', translationFr: 'Quel âge as-tu ? (à un enfant)' },
      { hanzi: '学校有多少学生？', pinyin: 'xuéxiào yǒu duōshao xuésheng?', translation: 'How many students are there at the school?', translationFr: 'Combien d\'étudiants dans l\'école ?' }
    ],
    quiz: {
      prompt: 'Comment demander le prix ?',
      choices: ['几钱？', '多少钱？', '什么钱？', '哪儿钱？'],
      correctChoiceIndex: 1
    },
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '你有___个哥哥？',
      translation: 'Combien de grands frères as-tu ?',
      translationEn: 'How many older brothers do you have?',
      choices: ['几', '多少', '什么', '哪'],
      correctChoice: '几',
      explanation: 'On attend un petit nombre (généralement 0 à 3 grands frères) avec le classificateur 个 → 几. 多少 conviendrait mieux à des dizaines/centaines.'
    },
    tags: ['grammaire', 'question', 'combien', 'quantité'],
    theme: 'grammar'
  }
];
