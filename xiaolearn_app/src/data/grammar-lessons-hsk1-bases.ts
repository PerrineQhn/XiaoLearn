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
      whenToUse: '**是** est la copule d\'identité la plus fréquente du chinois (registre neutre, oral comme écrit). Elle relie un sujet à un NOM ou GROUPE NOMINAL. Trois grands sous-cas :\n\n**Sous-cas 1 : identité / définition** — « qui/quoi je suis »\n• 我是学生 = Je suis étudiant\n• 这是我的手机 = C\'est mon téléphone\n\n**Sous-cas 2 : catégorie / classification** — « appartenance à une catégorie »\n• 熊猫是动物 = Le panda est un animal\n• 这是一本词典 = C\'est un dictionnaire\n\n**Sous-cas 3 : profession, nationalité, rôle**\n• 他是医生 = Il est médecin\n• 我是法国人 = Je suis français\n\n**Sous-cas 4 : structure de focus 是...的** (registre écrit / soutenu)\n• 我是坐火车来的 = C\'est en train que je suis venu\n\nFréquence : TRÈS élevée (top 20 mots du chinois). Registre : neutre, universel.',
      whenToUseEn: '**是** is the most frequent copula in Chinese (neutral register, spoken and written). It links a subject to a NOUN or noun phrase. Four main sub-cases:\n\n**Case 1: identity / definition** — "who/what I am"\n• 我是学生 = I am a student\n• 这是我的手机 = This is my phone\n\n**Case 2: category / classification**\n• 熊猫是动物 = Pandas are animals\n• 这是一本词典 = This is a dictionary\n\n**Case 3: profession, nationality, role**\n• 他是医生 = He is a doctor\n• 我是法国人 = I am French\n\n**Case 4: focus structure 是...的** (written / formal)\n• 我是坐火车来的 = It was by train that I came\n\nFrequency: VERY high (top 20 Chinese words). Register: neutral, universal.',
      howToUse: '**Structure 1 : affirmation basique** — Sujet + **是** + Nom\n• 我是学生 (wǒ shì xuésheng) = Je suis étudiant\n• 他是我的哥哥 (tā shì wǒ de gēge) = C\'est mon grand frère\n• 这是一本书 (zhè shì yì běn shū) = C\'est un livre\n• 我是法国人 (wǒ shì Fǎguórén) = Je suis français\n• 北京是中国的首都 (Běijīng shì Zhōngguó de shǒudū) = Pékin est la capitale de la Chine\n• 今天是星期一 (jīntiān shì xīngqīyī) = Aujourd\'hui c\'est lundi\n\n**Structure 2 : négation** — Sujet + **不是** + Nom (jamais 没是 !)\n• 我不是老师 (wǒ bú shì lǎoshī) = Je ne suis pas professeur\n• 这不是我的 (zhè bú shì wǒ de) = Ce n\'est pas à moi\n\n**Structure 3 : question fermée** — ...**是**...**吗**？ OU ...**是不是**...？\n• 你是学生吗？ = Tu es étudiant ?\n• 他是不是老师？ = Il est prof, oui ou non ?\n\n**Structure 4 : 是...的 (focus)** — pour souligner MOMENT, LIEU, MOYEN d\'une action passée\n• 我是昨天来的 = C\'est HIER que je suis venu\n• 他是从法国来的 = Il vient DE FRANCE\n\nPosition : **是** vient toujours APRÈS le sujet et AVANT le nom.',
      howToUseEn: '**Structure 1: basic affirmation** — Subject + **是** + Noun\n• 我是学生 = I am a student\n• 他是我的哥哥 = He is my older brother\n• 这是一本书 = This is a book\n• 我是法国人 = I am French\n• 北京是中国的首都 = Beijing is the capital of China\n• 今天是星期一 = Today is Monday\n\n**Structure 2: negation** — Subject + **不是** + Noun (never 没是!)\n• 我不是老师 = I\'m not a teacher\n• 这不是我的 = This is not mine\n\n**Structure 3: yes/no question** — ...**是**...**吗**？ OR ...**是不是**...？\n• 你是学生吗？ = Are you a student?\n• 他是不是老师？ = Is he a teacher or not?\n\n**Structure 4: 是...的 (focus)** — to emphasise TIME, PLACE, MEANS of a past action\n• 我是昨天来的 = It was YESTERDAY that I came\n• 他是从法国来的 = He comes FROM FRANCE\n\nPosition: **是** always comes AFTER the subject and BEFORE the noun.',
      commonMistakes: '❌ 他是高 (calque du français « il EST grand ») ; ✅ 他很高 — devant un adjectif SEUL, pas de 是, on met 很.\n\n❌ 我没是学生 ; ✅ 我不是学生 — la négation de 是 est UNIQUEMENT 不是 (jamais 没是).\n\n❌ 我是家 (calque du français « je suis à la maison ») ; ✅ 我在家 — pour la localisation, on emploie 在, pas 是.\n\n❌ 这是很好 ; ✅ 这很好 (« c\'est bien ») — pas de 是 devant un adjectif, même précédé de 很.\n\n❌ 我是三十岁 ; ✅ 我三十岁 — pour l\'âge, pas besoin de 是 en chinois (contrairement au français « j\'AI trente ans »).\n\n❌ 他是学生吗不？(mélange 吗 et 不 dans une question) ; ✅ 他是不是学生？OU 他是学生吗？',
      commonMistakesEn: '❌ 他是高 (calque of English "he IS tall"); ✅ 他很高 — before a lone adjective, no 是, use 很.\n\n❌ 我没是学生; ✅ 我不是学生 — the negation of 是 is ONLY 不是 (never 没是).\n\n❌ 我是家 (calque of "I am at home"); ✅ 我在家 — for location, use 在, not 是.\n\n❌ 这是很好; ✅ 这很好 ("this is good") — no 是 before an adjective, even with 很.\n\n❌ 我是三十岁; ✅ 我三十岁 — for age, no 是 needed in Chinese (unlike English "I AM thirty").\n\n❌ 他是学生吗不？(mixing 吗 and 不 in a question); ✅ 他是不是学生？OR 他是学生吗？',
      tips: '💡 **Mnémo clé** : 是 se met UNIQUEMENT devant un NOM. Devant un adjectif, on met 很.\n\n💡 **Contraste 是 vs 在 vs 有** — les 3 « verbes copules » du HSK1 :\n  • **是** = identité (« être = X ») → 我是老师\n  • **在** = localisation (« être à ») → 我在家\n  • **有** = possession/existence (« avoir / il y a ») → 我有钱\n\n💡 **Expressions figées à mémoriser** :\n  • 是的 (shì de) = « oui » (affirmation nette)\n  • 不是 (bú shì) = « non » (démentir une identification)\n  • 是不是？ = « n\'est-ce pas ? » (question de confirmation)\n  • 就是 (jiù shì) = « c\'est justement, exactement »\n\n💡 **Prononciation** : shì (4e ton). Dans la parole rapide, souvent atone (« shi » léger). Après un pronom, on peut presque ne plus l\'entendre.\n\n💡 **Astuce écrite** : le caractère 是 se décompose en 日 (soleil) + 正 (droit) — « ce qui est droit sous le soleil » = la vérité, l\'être.',
      tipsEn: '💡 **Key mnemonic**: 是 goes ONLY before a NOUN. Before an adjective, use 很.\n\n💡 **是 vs 在 vs 有 contrast** — the 3 "copula-like" verbs of HSK1:\n  • **是** = identity ("to be = X") → 我是老师\n  • **在** = location ("to be at") → 我在家\n  • **有** = possession/existence ("to have / there is") → 我有钱\n\n💡 **Fixed expressions to memorise**:\n  • 是的 = "yes" (firm affirmation)\n  • 不是 = "no" (denying identification)\n  • 是不是？= "isn\'t it?" (tag question)\n  • 就是 = "that\'s exactly it"\n\n💡 **Pronunciation**: shì (4th tone). In fast speech, often unstressed. After a pronoun, may almost disappear.\n\n💡 **Character trick**: 是 breaks down into 日 (sun) + 正 (upright) — "what stands upright under the sun" = truth, being.',
      relatedGrammar: ['grammar-adjectives-hen', 'grammar-location-zai', 'grammar-shi-de-focus']
    },
    audio: 'audio/grammar/shi-copula.wav',
    examples: [
      { hanzi: '我是学生', pinyin: 'wǒ shì xuésheng', translation: 'I am a student', translationFr: 'Je suis étudiant·e' },
      { hanzi: '他是我的老师', pinyin: 'tā shì wǒ de lǎoshī', translation: 'He is my teacher', translationFr: 'C\'est mon professeur' },
      { hanzi: '这是我的书', pinyin: 'zhè shì wǒ de shū', translation: 'This is my book', translationFr: 'C\'est mon livre' },
      { hanzi: '我不是中国人', pinyin: 'wǒ bú shì Zhōngguórén', translation: 'I am not Chinese', translationFr: 'Je ne suis pas chinois' },
      { hanzi: '你是不是学生？', pinyin: 'nǐ shì bu shì xuésheng?', translation: 'Are you a student?', translationFr: 'Es-tu étudiant, oui ou non ?' },
      { hanzi: '今天是我的生日', pinyin: 'jīntiān shì wǒ de shēngrì', translation: 'Today is my birthday', translationFr: 'Aujourd\'hui c\'est mon anniversaire' }
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
      whenToUse: '**有** est LE verbe de possession et d\'existence, ultra-fréquent (registre neutre, oral et écrit). Il couvre au moins 4 grands sous-cas :\n\n**Sous-cas 1 : possession concrète** — « j\'ai X »\n• 我有一辆车 = J\'ai une voiture\n• 你有笔吗？ = Tu as un stylo ?\n\n**Sous-cas 2 : existence à un endroit** — « il y a X à Y »\n• 桌子上有一本书 = Il y a un livre sur la table\n• 教室里有很多学生 = Il y a beaucoup d\'étudiants dans la salle\n\n**Sous-cas 3 : quantité / mesure** — « il y a X (durée/quantité) »\n• 有两个星期了 = Ça fait deux semaines\n• 这个孩子有一米高 = Cet enfant fait 1 mètre\n\n**Sous-cas 4 : relations familiales, expériences**\n• 我有两个哥哥 = J\'ai deux grands frères\n• 我有经验 = J\'ai de l\'expérience\n\nFréquence : TRÈS élevée (top 30). Registre : neutre. À l\'oral rapide, souvent réduit à 有 tout court, voire disparaît dans certaines expressions figées.',
      whenToUseEn: '**有** is THE verb of possession and existence, extremely frequent (neutral register, spoken and written). It covers at least 4 sub-cases:\n\n**Case 1: concrete possession** — "I have X"\n• 我有一辆车 = I have a car\n• 你有笔吗？ = Do you have a pen?\n\n**Case 2: existence at a place** — "there is X at Y"\n• 桌子上有一本书 = There is a book on the table\n• 教室里有很多学生 = There are many students in the classroom\n\n**Case 3: quantity / measurement** — "there is X (duration/quantity)"\n• 有两个星期了 = It\'s been two weeks\n• 这个孩子有一米高 = This child is 1 metre tall\n\n**Case 4: family relations, experiences**\n• 我有两个哥哥 = I have two older brothers\n• 我有经验 = I have experience\n\nFrequency: VERY high (top 30). Register: neutral. In fast speech, often reduced or dropped in fixed expressions.',
      howToUse: '**Structure 1 : POSSESSION** — Sujet + **有** + [Nombre + CL] + Objet\n• 我有两个孩子 (wǒ yǒu liǎng ge háizi) = J\'ai deux enfants\n• 他有很多朋友 (tā yǒu hěn duō péngyou) = Il a beaucoup d\'amis\n• 我有一个问题 (wǒ yǒu yí ge wèntí) = J\'ai une question\n• 你有时间吗？ (nǐ yǒu shíjiān ma?) = Tu as le temps ?\n\n**Structure 2 : EXISTENCE** — Lieu + **有** + [Nombre + CL] + Objet (l\'ordre commence par le LIEU !)\n• 桌子上有一本书 (zhuōzi shàng yǒu yì běn shū) = Il y a un livre sur la table\n• 我家附近有一个公园 = Près de chez moi il y a un parc\n• 里面有人吗？ = Il y a quelqu\'un à l\'intérieur ?\n• 冰箱里没有水 = Il n\'y a pas d\'eau dans le frigo\n\n**Structure 3 : NÉGATION OBLIGATOIRE 没有** (jamais 不有)\n• 我没有钱 (wǒ méi yǒu qián) = Je n\'ai pas d\'argent\n• 他没有女朋友 = Il n\'a pas de copine\n• 家里没有牛奶 = Il n\'y a pas de lait à la maison\n\n**Structure 4 : question** — 有...吗 ? OU 有没有...？\n• 你有没有中国朋友？ = Tu as un ami chinois, oui ou non ?\n• 有问题吗？ = Il y a des questions ?',
      howToUseEn: '**Structure 1: POSSESSION** — Subject + **有** + [Number + MW] + Object\n• 我有两个孩子 = I have two children\n• 他有很多朋友 = He has many friends\n• 我有一个问题 = I have a question\n• 你有时间吗？ = Do you have time?\n\n**Structure 2: EXISTENCE** — Place + **有** + [Number + MW] + Object (place FIRST!)\n• 桌子上有一本书 = There is a book on the table\n• 我家附近有一个公园 = There is a park near my home\n• 里面有人吗？ = Is anyone inside?\n• 冰箱里没有水 = There is no water in the fridge\n\n**Structure 3: MANDATORY NEGATION 没有** (never 不有)\n• 我没有钱 = I have no money\n• 他没有女朋友 = He has no girlfriend\n• 家里没有牛奶 = There\'s no milk at home\n\n**Structure 4: question** — 有...吗？ OR 有没有...？\n• 你有没有中国朋友？ = Do you have any Chinese friends?\n• 有问题吗？ = Any questions?',
      commonMistakes: '❌ 我不有钱 (calque du français « je n\'ai pas ») ; ✅ 我没有钱 — la négation de 有 est UNIQUEMENT 没有.\n\n❌ 桌子上是书 (pour « il y a un livre ») ; ✅ 桌子上有书 — pour l\'existence à un endroit, on utilise 有, pas 是.\n\n❌ 有书在桌子上 (calque du français « il y a un livre SUR la table ») ; ✅ 桌子上有书 — l\'ordre chinois est LIEU + 有 + OBJET, pas l\'inverse.\n\n❌ 我有是学生 ; ✅ 我是学生 — ne pas mélanger 有 et 是. On DIT « je suis étudiant » (是), pas « j\'ai étudiant » (有).\n\n❌ 我有两孩子 ; ✅ 我有两个孩子 — après un nombre, il faut TOUJOURS un classificateur (个).\n\n❌ 昨天我有去 (calque anglais « I had gone ») ; ✅ 昨天我去了 — 有 ne sert PAS à marquer un temps passé (sauf à Taïwan / Cantonais influencé).',
      commonMistakesEn: '❌ 我不有钱 (English calque "I don\'t have"); ✅ 我没有钱 — the negation of 有 is ONLY 没有.\n\n❌ 桌子上是书 (for "there is a book"); ✅ 桌子上有书 — for existence at a place, use 有, not 是.\n\n❌ 有书在桌子上 (English calque "there is a book ON the table"); ✅ 桌子上有书 — Chinese order is PLACE + 有 + OBJECT.\n\n❌ 我有是学生; ✅ 我是学生 — don\'t mix 有 and 是. We SAY "I am a student" (是), not "I have student" (有).\n\n❌ 我有两孩子; ✅ 我有两个孩子 — after a number, ALWAYS a measure word (个).\n\n❌ 昨天我有去 (English calque "I had gone"); ✅ 昨天我去了 — 有 does NOT mark past tense (except in Taiwanese / Cantonese-influenced Mandarin).',
      tips: '💡 **Mnémo clé** : 有 = « avoir » OU « il y a ». La négation est TOUJOURS 没有 (souvent abrégé en 没 à l\'oral rapide).\n\n💡 **Ordre inverse du français pour « il y a »** :\n  • Français : « Il y a un livre SUR LA TABLE »\n  • Chinois : « SUR LA TABLE il y a un livre » (桌子上有书)\n  Retenir : le LIEU vient TOUJOURS en premier.\n\n💡 **Contraste 有 vs 是 vs 在** — piège HSK1 :\n  • **有** = possession / existence (« il y a un livre »)\n  • **是** = identité (« c\'est un livre »)\n  • **在** = localisation d\'un objet DÉTERMINÉ (« le livre EST sur la table »)\n  Test : si l\'objet est déjà connu → 在. S\'il est introduit pour la première fois → 有.\n\n💡 **Expressions figées ultra-fréquentes** :\n  • 有时候 (yǒu shíhou) = parfois\n  • 有点儿 (yǒudiǎnr) = un peu (nuance négative)\n  • 有意思 (yǒu yìsi) = intéressant\n  • 没关系 (méi guānxi) = ce n\'est rien / pas grave\n  • 没问题 (méi wèntí) = pas de problème\n\n💡 **Prononciation** : yǒu (3e ton). À l\'oral rapide, le 3e ton peut être partiel (half third tone).',
      tipsEn: '💡 **Key mnemonic**: 有 = "have" OR "there is". Negation is ALWAYS 没有 (often shortened to 没 in fast speech).\n\n💡 **Reverse order from English for "there is"**:\n  • English: "There is a book ON THE TABLE"\n  • Chinese: "ON THE TABLE there is a book" (桌子上有书)\n  Remember: PLACE always comes FIRST.\n\n💡 **有 vs 是 vs 在 contrast** — HSK1 pitfall:\n  • **有** = possession / existence ("there is a book")\n  • **是** = identity ("this is a book")\n  • **在** = location of a KNOWN object ("the book IS on the table")\n  Test: if the object is known → 在. If it\'s introduced for the first time → 有.\n\n💡 **Ultra-frequent fixed expressions**:\n  • 有时候 = sometimes\n  • 有点儿 = a bit (negative nuance)\n  • 有意思 = interesting\n  • 没关系 = it doesn\'t matter\n  • 没问题 = no problem\n\n💡 **Pronunciation**: yǒu (3rd tone). In fast speech, often a half third tone.',
      relatedGrammar: ['grammar-negation-mei', 'grammar-shi-copula']
    },
    audio: 'audio/grammar/you-possession-existence.wav',
    examples: [
      { hanzi: '我有一个哥哥', pinyin: 'wǒ yǒu yí ge gēge', translation: 'I have an older brother', translationFr: 'J\'ai un grand frère' },
      { hanzi: '房间里有电视', pinyin: 'fángjiān lǐ yǒu diànshì', translation: 'There is a TV in the room', translationFr: 'Il y a une télé dans la chambre' },
      { hanzi: '你有时间吗？', pinyin: 'nǐ yǒu shíjiān ma?', translation: 'Do you have time?', translationFr: 'Tu as le temps ?' },
      { hanzi: '我没有钱', pinyin: 'wǒ méi yǒu qián', translation: 'I don\'t have money', translationFr: 'Je n\'ai pas d\'argent' },
      { hanzi: '桌子上有很多书', pinyin: 'zhuōzi shàng yǒu hěn duō shū', translation: 'There are many books on the table', translationFr: 'Il y a beaucoup de livres sur la table' },
      { hanzi: '你有没有中国朋友？', pinyin: 'nǐ yǒu méi yǒu Zhōngguó péngyou?', translation: 'Do you have any Chinese friends?', translationFr: 'Tu as des amis chinois ?' }
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
      whenToUse: 'Les mots interrogatifs (**什么, 谁, 哪儿, 多少, 几**) servent aux questions OUVERTES (contrairement à 吗 qui pose des questions fermées oui/non). Registre : neutre, ultra-fréquent.\n\n**Sous-cas 1 : 什么 (shénme)** — « quoi / quel »\n• Pronom : 你要什么？ = Tu veux quoi ?\n• Déterminant : 你喜欢什么书？ = Tu aimes quel livre ?\n\n**Sous-cas 2 : 谁 (shéi/shuí)** — « qui »\n• Sujet : 谁来了？ = Qui est venu ?\n• Objet : 你找谁？ = Tu cherches qui ?\n• shéi = registre oral ; shuí = registre soutenu (poésie, écrit)\n\n**Sous-cas 3 : 哪儿 / 哪里 (nǎr / nǎlǐ)** — « où »\n• 哪儿 = nordiste (Pékin), oral\n• 哪里 = neutre / méridional, écrit et oral\n\n**Sous-cas 4 : 多少 (duōshǎo)** — « combien » pour un grand nombre ou inconnu\n• Prix, populations, numéros de téléphone\n\n**Sous-cas 5 : 几 (jǐ)** — « combien » pour un petit nombre (< 10) avec classificateur obligatoire\n\n⚠️ **JAMAIS de 吗** avec ces mots (double marqueur interrogatif interdit).',
      whenToUseEn: 'Question words (**什么, 谁, 哪儿, 多少, 几**) form OPEN questions (unlike 吗 for yes/no). Register: neutral, extremely frequent.\n\n**Case 1: 什么** — "what / which"\n• Pronoun: 你要什么？ = What do you want?\n• Determiner: 你喜欢什么书？ = What kind of book do you like?\n\n**Case 2: 谁** — "who"\n• Subject: 谁来了？ = Who came?\n• Object: 你找谁？ = Who are you looking for?\n• shéi = spoken; shuí = formal (poetry, writing)\n\n**Case 3: 哪儿 / 哪里** — "where"\n• 哪儿 = northern (Beijing), spoken\n• 哪里 = neutral / southern, written and spoken\n\n**Case 4: 多少** — "how much/many" for large or unknown\n• Prices, populations, phone numbers\n\n**Case 5: 几** — "how many" for small numbers (< 10) with mandatory measure word\n\n⚠️ **NEVER use 吗** with these words (double interrogative marker forbidden).',
      howToUse: '**Règle d\'or** : le mot interrogatif prend la PLACE de la réponse — pas de déplacement en tête comme en français.\n\n**Structure 1 : 什么** — remplace un nom\n• 你叫什么？ (nǐ jiào shénme?) = Tu t\'appelles comment ?\n  → Réponse : 我叫小明 (« Xiaoming » à la place de 什么)\n• 你在做什么？ = Qu\'est-ce que tu fais ?\n• 这是什么？ = C\'est quoi ?\n• 你喜欢吃什么菜？ = Tu aimes quel type de plat ?\n\n**Structure 2 : 谁**\n• 谁是老师？ (shéi shì lǎoshī?) = Qui est le professeur ?\n• 你昨天见了谁？ = Qui as-tu vu hier ?\n• 这是谁的书？ = C\'est le livre de qui ?\n\n**Structure 3 : 哪儿 / 哪里**\n• 你在哪儿？ = Où es-tu ?\n• 你去哪里？ = Où vas-tu ?\n• 洗手间在哪儿？ = Où sont les toilettes ?\n\n**Structure 4 : 多少** (souvent sans classificateur)\n• 多少钱？ (duōshǎo qián?) = Combien ça coûte ?\n• 你的电话号码是多少？ = Quel est ton numéro ?\n• 学校有多少学生？ = Combien d\'élèves il y a dans l\'école ?\n\n**Structure 5 : 几 + CL + Nom** (petit nombre)\n• 你有几个孩子？ = Combien d\'enfants as-tu ?\n• 现在几点？ = Il est quelle heure ?\n• 你几岁？ = Quel âge as-tu ? (à un enfant)\n\n**Variantes régionales** : 什么 s\'écrit aussi 甚麼 en caractères traditionnels ; 哪儿 est majoritairement pékinois, ailleurs on entend plus 哪里.',
      howToUseEn: '**Golden rule**: the question word takes the PLACE of the answer — no fronting like in English.\n\n**Structure 1: 什么** — replaces a noun\n• 你叫什么？ = What\'s your name?\n  → Answer: 我叫小明 ("Xiaoming" replaces 什么)\n• 你在做什么？ = What are you doing?\n• 这是什么？ = What\'s this?\n• 你喜欢吃什么菜？ = What kind of food do you like?\n\n**Structure 2: 谁**\n• 谁是老师？ = Who is the teacher?\n• 你昨天见了谁？ = Whom did you see yesterday?\n• 这是谁的书？ = Whose book is this?\n\n**Structure 3: 哪儿 / 哪里**\n• 你在哪儿？ = Where are you?\n• 你去哪里？ = Where are you going?\n• 洗手间在哪儿？ = Where are the toilets?\n\n**Structure 4: 多少** (often without measure word)\n• 多少钱？ = How much?\n• 你的电话号码是多少？ = What\'s your phone number?\n• 学校有多少学生？ = How many students at the school?\n\n**Structure 5: 几 + MW + Noun** (small number)\n• 你有几个孩子？ = How many children do you have?\n• 现在几点？ = What time is it?\n• 你几岁？ = How old are you? (to a child)\n\n**Regional variants**: 什么 = 甚麼 in traditional characters; 哪儿 is mainly Beijing, 哪里 is more common elsewhere.',
      commonMistakes: '❌ 你叫什么吗？(calque du français « quel est ton nom ? ») ; ✅ 你叫什么？— JAMAIS de 吗 avec un mot interrogatif.\n\n❌ 什么你叫？(calque de l\'anglais « what is your name ») ; ✅ 你叫什么？— on NE déplace PAS le mot interrogatif en tête de phrase, il reste à la place de la réponse.\n\n❌ 你多少岁？(pour un adulte) ; ✅ 你多大？— pour l\'âge d\'un adulte on emploie 多大, pas 多少.\n\n❌ 几钱？ ; ✅ 多少钱？— le prix est TOUJOURS 多少 (grande quantité).\n\n❌ 我不知道什么他要 (calque du français « je ne sais pas ce qu\'il veut ») ; ✅ 我不知道他要什么 — 什么 reste APRÈS le verbe même dans une subordonnée.\n\n❌ 谁 est-ce que tu vois ? (mélange français-chinois) ; ✅ 你看见谁？— structure chinoise pure.\n\n❌ 你在哪儿吗？ ; ✅ 你在哪儿？— pas de 吗 avec 哪儿.',
      commonMistakesEn: '❌ 你叫什么吗？(English calque "what is your name?"); ✅ 你叫什么？— NEVER 吗 with a question word.\n\n❌ 什么你叫？(English calque "what is your name"); ✅ 你叫什么？— do NOT front the question word, it stays where the answer would go.\n\n❌ 你多少岁？(for an adult); ✅ 你多大？— for an adult\'s age use 多大, not 多少.\n\n❌ 几钱？; ✅ 多少钱？— prices ALWAYS use 多少 (large quantity).\n\n❌ 我不知道什么他要 (English calque "I don\'t know what he wants"); ✅ 我不知道他要什么 — 什么 stays AFTER the verb even in a subclause.\n\n❌ 谁 do you see? (mixed English-Chinese); ✅ 你看见谁？— pure Chinese structure.\n\n❌ 你在哪儿吗？; ✅ 你在哪儿？— no 吗 with 哪儿.',
      tips: '💡 **Règle d\'or** : la POSITION du mot interrogatif dans la question = la POSITION de la réponse dans la réponse. C\'est le principe le plus important.\n\n💡 **Exemple concret** :\n  • Q : 你在哪儿？(Sujet + 在 + INTERROGATIF)\n  • R : 我在家 (Sujet + 在 + LIEU) — 家 remplace 哪儿, MÊME POSITION.\n\n💡 **谁 vs 哪个** :\n  • 谁 = qui, sans classificateur\n  • 哪个 = lequel (parmi des choix connus), avec CL sous-entendu\n\n💡 **哪儿 vs 哪里** — deux régionalismes :\n  • 哪儿 = pékinois, familier, oral rapide\n  • 哪里 = standard, plus neutre, à l\'écrit préférer 哪里\n\n💡 **Usage indéfini !** (piège classique) — ces mots peuvent aussi vouloir dire « n\'importe quoi / quiconque / n\'importe où » :\n  • 什么都可以 = Tout va bien\n  • 谁都知道 = Tout le monde le sait\n  • 哪儿都行 = N\'importe où me va\n\n💡 **Expressions figées** :\n  • 什么时候 = quand (litt. « quel moment »)\n  • 为什么 = pourquoi\n  • 什么样 = de quel genre\n\n💡 **谁** — les DEUX prononciations : shéi (oral courant) et shuí (registre soutenu, poétique).',
      tipsEn: '💡 **Golden rule**: POSITION of question word in the question = POSITION of the answer in the reply. This is THE key principle.\n\n💡 **Concrete example**:\n  • Q: 你在哪儿？(Subject + 在 + INTERROGATIVE)\n  • A: 我在家 (Subject + 在 + PLACE) — 家 replaces 哪儿, SAME POSITION.\n\n💡 **谁 vs 哪个**:\n  • 谁 = who, no measure word\n  • 哪个 = which (among known choices), with implied MW\n\n💡 **哪儿 vs 哪里** — two regionalisms:\n  • 哪儿 = Beijing, colloquial, fast speech\n  • 哪里 = standard, more neutral, prefer 哪里 in writing\n\n💡 **Indefinite use!** (classic pitfall) — these words can also mean "anything / anyone / anywhere":\n  • 什么都可以 = Anything is fine\n  • 谁都知道 = Everyone knows\n  • 哪儿都行 = Anywhere works\n\n💡 **Fixed expressions**:\n  • 什么时候 = when (lit. "what moment")\n  • 为什么 = why\n  • 什么样 = what kind of\n\n💡 **谁** — TWO pronunciations: shéi (colloquial) and shuí (formal, poetic).',
      relatedGrammar: ['grammar-question-ma', 'grammar-shenme-dou-indefinite']
    },
    audio: 'audio/grammar/question-words.wav',
    examples: [
      { hanzi: '你叫什么名字？', pinyin: 'nǐ jiào shénme míngzi?', translation: 'What is your name?', translationFr: 'Comment tu t\'appelles ?' },
      { hanzi: '谁在教室？', pinyin: 'shéi zài jiàoshì?', translation: 'Who is in the classroom?', translationFr: 'Qui est dans la salle de classe ?' },
      { hanzi: '你家有几口人？', pinyin: 'nǐ jiā yǒu jǐ kǒu rén?', translation: 'How many people are in your family?', translationFr: 'Combien de personnes dans ta famille ?' },
      { hanzi: '多少钱？', pinyin: 'duōshǎo qián?', translation: 'How much does it cost?', translationFr: 'Combien ça coûte ?' },
      { hanzi: '洗手间在哪儿？', pinyin: 'xǐshǒujiān zài nǎr?', translation: 'Where are the toilets?', translationFr: 'Où sont les toilettes ?' },
      { hanzi: '这是谁的书？', pinyin: 'zhè shì shéi de shū?', translation: 'Whose book is this?', translationFr: 'À qui est ce livre ?' }
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
      whenToUse: 'Le chinois utilise DEUX mots pour « deux » selon le contexte grammatical. C\'est un point spécifique au chinois, sans équivalent français.\n\n**二 (èr) = chiffre ABSTRAIT / RANG** — s\'emploie quand :\n• On énumère (« un, deux, trois ») : 一，二，三\n• On lit un numéro chiffre par chiffre : 二 dans « 023 » ou dans un numéro de téléphone\n• On indique un RANG : 第二 (deuxième), 二楼 (2e étage), 二年级 (2e année)\n• On donne une DATE / un mois : 二月 (février), 二号 (le 2)\n• Dans les MATHS : 一加一等于二 (1+1=2)\n• Dans les nombres composés à partir des dizaines : 十二 (12), 二十 (20), 三百二十 (320)\n\n**两 (liǎng) = QUANTITÉ CONCRÈTE de 2 choses** — s\'emploie quand :\n• Devant un CLASSIFICATEUR + nom : 两个人 (2 personnes), 两本书 (2 livres)\n• Pour dire l\'heure « 2h » : 两点 (à ne pas confondre avec 十二点 = 12h)\n• Devant les grandes unités 千/万/亿 : 两千 (2000), 两万 (20 000)\n\nRegistre : les deux sont universels, aucune connotation.',
      whenToUseEn: 'Chinese uses TWO words for "two" depending on grammatical context. This is Chinese-specific with no English equivalent.\n\n**二 (èr) = ABSTRACT numeral / RANK** — used when:\n• Counting ("one, two, three"): 一，二，三\n• Reading a number digit by digit: 二 in "023" or phone numbers\n• Indicating a RANK: 第二 (second), 二楼 (2nd floor), 二年级 (2nd grade)\n• Giving a DATE / month: 二月 (February), 二号 (the 2nd)\n• MATH: 一加一等于二 (1+1=2)\n• In compound numbers from tens up: 十二 (12), 二十 (20), 三百二十 (320)\n\n**两 (liǎng) = CONCRETE QUANTITY of 2 things** — used when:\n• Before a MEASURE WORD + noun: 两个人 (2 people), 两本书 (2 books)\n• For "2 o\'clock": 两点 (not to confuse with 十二点 = 12 o\'clock)\n• Before big units 千/万/亿: 两千 (2000), 两万 (20,000)\n\nRegister: both are universal, no connotation.',
      howToUse: '**Règle d\'or** : demandez-vous s\'il y a un CLASSIFICATEUR derrière.\n• OUI → **两** : 两个, 两本, 两位, 两天, 两杯, 两只\n• NON → **二** : 二十, 一二三, 第二, 二楼, 二月\n\n**Structure 1 : 两 + CL + Nom** (compter des objets/personnes)\n• 两个朋友 (liǎng ge péngyou) = deux amis\n• 两本书 (liǎng běn shū) = deux livres\n• 两杯咖啡 (liǎng bēi kāfēi) = deux cafés\n• 两位老师 (liǎng wèi lǎoshī) = deux professeurs (poli)\n• 两只猫 (liǎng zhī māo) = deux chats\n• 两天 (liǎng tiān) = deux jours (天 est classificateur autonome)\n\n**Structure 2 : 二 dans les nombres composés / rangs / dates**\n• 二十 (èrshí) = 20\n• 二十二 (èrshí\'èr) = 22 (note : 22 s\'écrit 二 + 十 + 二, JAMAIS 两十)\n• 第二 (dì-èr) = deuxième\n• 二月 (èr yuè) = février\n• 二零二五年 = année 2025\n• 二楼 (èr lóu) = deuxième étage\n\n**Structure 3 : cas des grandes unités (piège !)**\n• 两千 (liǎng qiān) = 2000 — grande unité, on préfère 两\n• 两万 (liǎng wàn) = 20 000\n• 两亿 (liǎng yì) = 200 millions\n• MAIS dans un nombre COMPOSÉ, on garde 二 pour les positions internes :\n  → 十二亿 (1 milliard 200 millions) — pas 十两亿\n\n**Structure 4 : heure** — 2h = **两点** (jamais 二点), 12h = **十二点** (jamais 十两点)\n• 现在是两点半 = Il est 14h30\n• 我两点见你 = Je te vois à 2h\n\n**Structure 5 : lire un chiffre isolé** — pour lire chaque chiffre d\'un numéro de téléphone, code postal, on emploie 二 :\n• 电话号码 : 一三二四五 = 1-3-2-4-5',
      howToUseEn: '**Golden rule**: ask if there\'s a MEASURE WORD after.\n• YES → **两**: 两个, 两本, 两位, 两天, 两杯, 两只\n• NO → **二**: 二十, 一二三, 第二, 二楼, 二月\n\n**Structure 1: 两 + MW + Noun** (counting objects/people)\n• 两个朋友 = two friends\n• 两本书 = two books\n• 两杯咖啡 = two coffees\n• 两位老师 = two teachers (polite)\n• 两只猫 = two cats\n• 两天 = two days (天 acts as its own MW)\n\n**Structure 2: 二 in compound numbers / ranks / dates**\n• 二十 = 20\n• 二十二 = 22 (note: 22 is 二 + 十 + 二, NEVER 两十)\n• 第二 = second\n• 二月 = February\n• 二零二五年 = year 2025\n• 二楼 = 2nd floor\n\n**Structure 3: big units (pitfall!)**\n• 两千 = 2000 — big unit, prefer 两\n• 两万 = 20,000\n• 两亿 = 200 million\n• BUT in a COMPOUND number, use 二 for internal positions:\n  → 十二亿 (1.2 billion) — not 十两亿\n\n**Structure 4: time** — 2 o\'clock = **两点** (never 二点), 12 o\'clock = **十二点** (never 十两点)\n• 现在是两点半 = It\'s 2:30\n• 我两点见你 = I\'ll see you at 2\n\n**Structure 5: reading a single digit** — to read each digit of a phone number, postcode, use 二:\n• Phone: 一三二四五 = 1-3-2-4-5',
      commonMistakes: '❌ 二个人 (calque du chiffre pur) ; ✅ 两个人 — devant un classificateur, TOUJOURS 两.\n\n❌ 两月 (pour février) ; ✅ 二月 — les mois sont des rangs, on emploie 二.\n\n❌ 第两 (pour « deuxième ») ; ✅ 第二 — les rangs sont toujours en 二.\n\n❌ 二点 (pour 2h) ; ✅ 两点 — l\'heure 2 emploie 两 (heure = quantité).\n\n❌ 两十 (pour 20) ; ✅ 二十 — dans les dizaines, on emploie 二.\n\n❌ 两百 est ambigu — au NORD, on entend 两百, mais 二百 est plus standard. Pour 200, 二百 reste le plus sûr.\n\n❌ 十两 (pour 12) ; ✅ 十二 — dans un nombre composé interne, on emploie 二.\n\n❌ 二本书 ; ✅ 两本书 — devant 本 (classificateur des livres), c\'est 两.',
      commonMistakesEn: '❌ 二个人 (using the pure numeral); ✅ 两个人 — before a measure word, ALWAYS 两.\n\n❌ 两月 (for February); ✅ 二月 — months are ranks, use 二.\n\n❌ 第两 (for "second"); ✅ 第二 — ranks are always 二.\n\n❌ 二点 (for 2 o\'clock); ✅ 两点 — the hour 2 uses 两 (hour = quantity).\n\n❌ 两十 (for 20); ✅ 二十 — in tens, use 二.\n\n❌ 两百 is ambiguous — in the north you hear 两百, but 二百 is more standard. For 200, 二百 is safer.\n\n❌ 十两 (for 12); ✅ 十二 — inside a compound number, use 二.\n\n❌ 二本书; ✅ 两本书 — before 本 (measure word for books), it\'s 两.',
      tips: '💡 **Test ultra-rapide** : « Y a-t-il un classificateur (个, 本, 只, 位…) juste après ? »\n  → OUI : 两\n  → NON : 二\n\n💡 **Mnémo audio** : dis-toi « liǎng = deux objets bien tangibles » vs « èr = juste le chiffre 2 abstrait ».\n\n💡 **Heures qui piègent** :\n  • 2h = 两点 (heure comme quantité)\n  • 12h = 十二点 (nombre composé, garde 二)\n  • 22h = 二十二点 (composé)\n\n💡 **Grandes unités bonus** :\n  • 千 (mille), 万 (10 000), 亿 (100 millions) → 两千, 两万, 两亿\n  • Ces unités sont grandes et acceptent 两 comme « quantité »\n\n💡 **Piège du 200** : 两百 (nordiste, oral) vs 二百 (standard, écrit). Les deux se comprennent, mais l\'école enseigne 二百.\n\n💡 **Astuce mémo culturelle** : dans la calligraphie/tradition, 二 est le chiffre pur (idéogramme de « deux »), 两 vient de « paire » (idée d\'objet double, poids ancien).\n\n💡 **Contraste avec le classificateur 双** (paire) — pour parler d\'une paire : 一双鞋 (une paire de chaussures), différent de 两只鞋 (deux chaussures).',
      tipsEn: '💡 **Ultra-quick test**: "Is there a measure word (个, 本, 只, 位…) right after?"\n  → YES: 两\n  → NO: 二\n\n💡 **Audio mnemonic**: think "liǎng = two tangible objects" vs "èr = just the abstract digit 2".\n\n💡 **Tricky hours**:\n  • 2 o\'clock = 两点 (hour as quantity)\n  • 12 o\'clock = 十二点 (compound number, keeps 二)\n  • 22h = 二十二点 (compound)\n\n💡 **Big units bonus**:\n  • 千 (thousand), 万 (10,000), 亿 (100 million) → 两千, 两万, 两亿\n  • These big units take 两 as "quantity"\n\n💡 **The 200 trap**: 两百 (northern, spoken) vs 二百 (standard, written). Both are understood, but school teaches 二百.\n\n💡 **Cultural mnemonic**: in calligraphy/tradition, 二 is the pure digit (ideograph of "two"), while 两 comes from "pair" (idea of double object, ancient weight).\n\n💡 **Contrast with 双** (pair) — to say a pair: 一双鞋 (a pair of shoes), different from 两只鞋 (two shoes).',
      relatedGrammar: ['grammar-measure-words']
    },
    audio: 'audio/grammar/er-vs-liang.wav',
    examples: [
      { hanzi: '两个苹果', pinyin: 'liǎng ge píngguǒ', translation: 'two apples', translationFr: 'deux pommes' },
      { hanzi: '二月', pinyin: 'èr yuè', translation: 'February', translationFr: 'février' },
      { hanzi: '第二课', pinyin: 'dì èr kè', translation: 'lesson two', translationFr: 'leçon deux' },
      { hanzi: '两点半', pinyin: 'liǎng diǎn bàn', translation: 'half past two', translationFr: 'deux heures et demie' },
      { hanzi: '我住在二楼', pinyin: 'wǒ zhù zài èr lóu', translation: 'I live on the 2nd floor', translationFr: 'J\'habite au 2e étage' },
      { hanzi: '这本书两百块', pinyin: 'zhè běn shū liǎng bǎi kuài', translation: 'This book costs 200 yuan', translationFr: 'Ce livre coûte 200 yuans' }
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
      whenToUse: 'Le chinois oblige à ANTICIPER la taille de la réponse quand on demande « combien ». Choix stratégique — un mauvais choix ne bloque pas la compréhension mais sonne artificiel.\n\n**几 (jǐ)** — usage pour un PETIT nombre attendu :\n• Sous-cas 1 : quantité familiale / rapprochée : 几个孩子 (combien d\'enfants), 几口人 (combien de personnes dans la famille)\n• Sous-cas 2 : temps / heure : 几点 (quelle heure), 星期几 (quel jour de la semaine)\n• Sous-cas 3 : âge d\'un enfant (moins de 10 ans) : 你几岁？\n• Sous-cas 4 : petites quantités énumérables : 几本书, 几张纸\n• Obligation : classificateur derrière (sauf pour l\'heure et la date)\n• Fréquence : très fréquent à l\'oral\n\n**多少 (duōshao)** — usage pour un GRAND nombre ou inconnu :\n• Sous-cas 1 : PRIX (universellement) : 多少钱？\n• Sous-cas 2 : NUMÉROS (téléphone, adresse, code) : 你的电话号码是多少？\n• Sous-cas 3 : populations, quantités massives : 多少学生, 多少人口\n• Sous-cas 4 : quantités indéterminées / non comptables : 多少水, 多少钱\n• Classificateur optionnel (souvent absent)\n• Fréquence : très fréquent, notamment dans le commerce\n\nRegistre : les deux sont neutres, universels.',
      whenToUseEn: 'Chinese forces you to ANTICIPATE the size of the answer when asking "how many/much". Strategic choice — the wrong one doesn\'t block understanding but sounds unnatural.\n\n**几 (jǐ)** — for a SMALL expected number:\n• Case 1: family/close quantities: 几个孩子 (how many children), 几口人 (family size)\n• Case 2: time / hour: 几点 (what time), 星期几 (which day of the week)\n• Case 3: child\'s age (under 10): 你几岁？\n• Case 4: small countable quantities: 几本书, 几张纸\n• Requirement: measure word after (except for time and date)\n• Frequency: very common in speech\n\n**多少 (duōshao)** — for a LARGE or unknown number:\n• Case 1: PRICE (universally): 多少钱？\n• Case 2: NUMBERS (phone, address, code): 你的电话号码是多少？\n• Case 3: populations, mass quantities: 多少学生, 多少人口\n• Case 4: indeterminate / uncountable quantities: 多少水, 多少钱\n• Measure word optional (often absent)\n• Frequency: very common, especially in commerce\n\nRegister: both neutral, universal.',
      howToUse: '**Structure 1 : 几 + CL + Nom** (obligatoire d\'avoir un classificateur)\n• 你有几个孩子？ (nǐ yǒu jǐ ge háizi?) = Combien d\'enfants as-tu ? (on suppose < 10)\n• 你几岁？ = Quel âge as-tu ? (à un enfant)\n• 现在几点？ = Quelle heure est-il ? (0-12)\n• 你家有几口人？ = Combien de personnes dans ta famille ?\n• 你买了几本书？ = Combien de livres as-tu achetés ?\n• 今天星期几？ = On est quel jour ? (semaine = 1-7)\n\n**Structure 2 : 多少 (+ Nom, souvent sans CL)**\n• 多少钱？ (duōshǎo qián?) = Combien ça coûte ?\n• 你们班有多少学生？ = Combien d\'étudiants dans votre classe ? (potentiellement dizaines)\n• 你的电话号码是多少？ = Quel est ton numéro ?\n• 中国有多少人口？ = Quelle est la population de la Chine ?\n• 这个学校有多少老师？ = Combien de profs dans cette école ?\n• 你要多少？ = Tu en veux combien ? (quantité indéterminée)\n\n**Structure 3 : cas particulier de l\'âge**\n• Enfant (< 10) : 你几岁？\n• Adolescent / adulte : 你多大？ (jamais 几岁)\n• Personne âgée (respect) : 您多大年纪？ OU 您多大岁数？\n• Grand écart d\'âge inconnu : 他多大？\n\n**Structure 4 : combinaisons expressives**\n• 有多少就吃多少 = mange autant que tu peux\n• 不知道几个 = je ne sais pas combien (petit)\n• 有几个 = quelques-uns (usage indéfini !)',
      howToUseEn: '**Structure 1: 几 + MW + Noun** (measure word mandatory)\n• 你有几个孩子？ = How many children do you have? (assumed < 10)\n• 你几岁？ = How old are you? (to a child)\n• 现在几点？ = What time is it? (0-12)\n• 你家有几口人？ = How many in your family?\n• 你买了几本书？ = How many books did you buy?\n• 今天星期几？ = What day is it? (week = 1-7)\n\n**Structure 2: 多少 (+ Noun, often no MW)**\n• 多少钱？ = How much?\n• 你们班有多少学生？ = How many students in your class? (dozens possible)\n• 你的电话号码是多少？ = What\'s your phone number?\n• 中国有多少人口？ = What\'s the population of China?\n• 这个学校有多少老师？ = How many teachers at this school?\n• 你要多少？ = How much do you want?\n\n**Structure 3: age special case**\n• Child (< 10): 你几岁？\n• Teen / adult: 你多大？ (never 几岁)\n• Elder (respect): 您多大年纪？ OR 您多大岁数？\n• Unknown large gap: 他多大？\n\n**Structure 4: expressive combinations**\n• 有多少就吃多少 = eat as much as you can\n• 不知道几个 = I don\'t know how many (small)\n• 有几个 = a few (indefinite use!)',
      commonMistakes: '❌ 几钱？ ; ✅ 多少钱？ — le PRIX est toujours 多少 (grande quantité potentielle).\n\n❌ 你几岁？(à un adulte) ; ✅ 你多大？ — 几岁 est réservé aux enfants, sonne infantilisant sinon.\n\n❌ 几人？ (rare) ; ✅ 几个人？ — 几 exige un classificateur (个 par défaut).\n\n❌ 多少个孩子？ (sonne étrange si on suppose < 10) ; ✅ 几个孩子？ — pour une famille, on suppose < 10.\n\n❌ 你多少大？ ; ✅ 你多大？ — 多 seul introduit l\'échelle (litt. « combien grand »), pas 多少.\n\n❌ 多少号码？ (calque de l\'anglais) ; ✅ 号码是多少？ — 多少 vient APRÈS 是 pour les numéros.\n\n❌ 几 + 时间 ; ✅ 多少时间 OU 多长时间 — le temps est une quantité, on utilise 多少 ou 多长.\n\n❌ 你几年级？(HSK1 mais courant) — techniquement acceptable si < 10 ; à partir du lycée, 多大 est plus juste.',
      commonMistakesEn: '❌ 几钱？; ✅ 多少钱？— PRICE is always 多少 (potentially large quantity).\n\n❌ 你几岁？(to an adult); ✅ 你多大？— 几岁 is for children, otherwise sounds childish.\n\n❌ 几人？(rare); ✅ 几个人？— 几 requires a measure word (个 by default).\n\n❌ 多少个孩子？(sounds odd if <10 assumed); ✅ 几个孩子？— for family, we assume <10.\n\n❌ 你多少大？; ✅ 你多大？— 多 alone introduces the scale (lit. "how big"), not 多少.\n\n❌ 多少号码？(English calque); ✅ 号码是多少？— 多少 comes AFTER 是 for numbers.\n\n❌ 几 + 时间; ✅ 多少时间 OR 多长时间 — time is a quantity, use 多少 or 多长.\n\n❌ 你几年级？(HSK1 but common) — technically OK if <10; from high school on, 多大 is more accurate.',
      tips: '💡 **Règle des « doigts de la main »** : si le nombre attendu peut se compter sur une main (< 10) → **几**. Sinon → **多少**.\n\n💡 **Prix, populations, numéros de téléphone** → TOUJOURS **多少**, même si la valeur exacte est petite. La convention prime sur la logique.\n\n💡 **Âge** :\n  • Enfant → 几岁\n  • Adulte → 多大\n  • Personne âgée → 多大年纪 / 多大岁数 (registre respectueux)\n\n💡 **Astuce mémo culturelle** : 多少 contient 多 (« beaucoup »), donc pense « GRANDE quantité ». 几 était à l\'origine le nombre de « quelques doigts levés » → petite quantité.\n\n💡 **Piège des classificateurs** :\n  • 几 : classificateur OBLIGATOIRE (几个, 几本, 几只…)\n  • 多少 : classificateur OPTIONNEL (souvent absent)\n\n💡 **Usage indéfini !** (même piège que 什么/谁) — 几 peut aussi vouloir dire « quelques » (petit nombre indéfini) :\n  • 我有几个朋友 = J\'ai quelques amis\n  • 好几个 = plusieurs (renforcé)\n\n💡 **Contraste 几 vs 多少 vs 多长** — pour les questions de quantité :\n  • 几 = petit nombre discret (avec CL)\n  • 多少 = grand nombre / continu / prix\n  • 多长 = longueur / durée (litt. « quelle longueur »)\n\n💡 **Astuce sociale** : dans un magasin, TOUJOURS 多少钱 — même pour un article bon marché. C\'est la formule figée.',
      tipsEn: '💡 **"Hand rule"**: if the expected number can be counted on one hand (< 10) → **几**. Otherwise → **多少**.\n\n💡 **Prices, populations, phone numbers** → ALWAYS **多少**, even if the exact value is small. Convention beats logic.\n\n💡 **Age**:\n  • Child → 几岁\n  • Adult → 多大\n  • Elder → 多大年纪 / 多大岁数 (respectful)\n\n💡 **Cultural mnemonic**: 多少 contains 多 ("many"), so think "LARGE quantity". 几 originally meant "a few fingers held up" → small quantity.\n\n💡 **Measure-word pitfall**:\n  • 几: measure word MANDATORY (几个, 几本, 几只…)\n  • 多少: measure word OPTIONAL (often absent)\n\n💡 **Indefinite use!** (same pitfall as 什么/谁) — 几 can also mean "several / a few" (small indefinite number):\n  • 我有几个朋友 = I have a few friends\n  • 好几个 = quite a few (reinforced)\n\n💡 **几 vs 多少 vs 多长** — for quantity questions:\n  • 几 = small discrete number (with MW)\n  • 多少 = large number / continuous / price\n  • 多长 = length / duration (lit. "how long")\n\n💡 **Social tip**: in a shop, ALWAYS 多少钱 — even for a cheap item. It\'s the fixed formula.',
      relatedGrammar: ['grammar-question-words', 'grammar-measure-words']
    },
    audio: 'audio/grammar/ji-vs-duoshao.wav',
    examples: [
      { hanzi: '你家有几口人？', pinyin: 'nǐ jiā yǒu jǐ kǒu rén?', translation: 'How many people are in your family?', translationFr: 'Combien de personnes dans ta famille ?' },
      { hanzi: '多少钱？', pinyin: 'duōshao qián?', translation: 'How much?', translationFr: 'Combien ça coûte ?' },
      { hanzi: '你几岁？', pinyin: 'nǐ jǐ suì?', translation: 'How old are you? (to a child)', translationFr: 'Quel âge as-tu ? (à un enfant)' },
      { hanzi: '学校有多少学生？', pinyin: 'xuéxiào yǒu duōshao xuésheng?', translation: 'How many students are there at the school?', translationFr: 'Combien d\'étudiants dans l\'école ?' },
      { hanzi: '现在几点？', pinyin: 'xiànzài jǐ diǎn?', translation: 'What time is it now?', translationFr: 'Il est quelle heure ?' },
      { hanzi: '你的电话号码是多少？', pinyin: 'nǐ de diànhuà hàomǎ shì duōshao?', translation: 'What\'s your phone number?', translationFr: 'C\'est quoi ton numéro de téléphone ?' }
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
