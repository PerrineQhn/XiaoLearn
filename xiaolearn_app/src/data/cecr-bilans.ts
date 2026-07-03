/**
 * cecr-bilans.ts — Bilans de fin de niveau CECR (XiaoLearn V7)
 * --------------------------------------------------------------
 * 10 niveaux CECR × 10 questions authored-hand = 100 questions de synthèse.
 *
 * Chaque bilan couvre transversalement le niveau (vocab, grammaire,
 * dialogue, culture/caractères/tons selon le niveau).
 *
 * Règles éditoriales :
 *  - 10 questions par niveau, progression en difficulté intra-bilan
 *  - correctIndex 0-based
 *  - explications toujours renseignées
 *  - pas de tricky pure : on teste la synthèse, pas les pièges
 *  - tonalité respectueuse, explicative, francophone
 */
import type { LevelBilan, BilanQuestion } from '../types/bilan';
import type { CecrLevelSlug } from '../types/simulator';
import { BILAN_DEFAULT_PASSING, BILAN_XP_REWARD } from '../types/bilan';

// ============================================================================
//  HELPER
// ============================================================================
const q = (
  id: string,
  type: BilanQuestion['type'],
  prompt: string,
  choices: string[],
  correctIndex: number,
  explanation: string,
  extras: Partial<Omit<BilanQuestion, 'id' | 'type' | 'promptFr' | 'choices' | 'correctIndex' | 'explanationFr'>> = {}
): BilanQuestion => ({
  id,
  type,
  promptFr: prompt,
  choices,
  correctIndex,
  explanationFr: explanation,
  ...extras
});

// ============================================================================
//  A1 — Débutant (HSK 1 ish)
// ============================================================================
const a1: LevelBilan = {
  level: 'a1',
  titleFr: 'Bilan A1 — Premiers pas',
  titleEn: 'A1 Level Check — First Steps',
  descriptionFr:
    "Valide les bases : salutations, pronoms, chiffres, 是, 有, les 4 tons de base et les premiers caractères usuels.",
  descriptionEn:
    'Validates the foundations: greetings, pronouns, numbers, 是, 有, the 4 basic tones and the first common characters.',
  emoji: '🌱',
  passingScore: BILAN_DEFAULT_PASSING,
  xpReward: BILAN_XP_REWARD,
  questions: [
    q(
      'a1-q1',
      'mcq',
      'Comment dit-on « Bonjour » en chinois ?',
      ['再见 (zàijiàn)', '你好 (nǐhǎo)', '谢谢 (xièxie)', '对不起 (duìbuqǐ)'],
      1,
      "你好 signifie littéralement « tu bien » et s'utilise à toute heure. 再见 = « au revoir », 谢谢 = « merci », 对不起 = « désolé ».",
      { topic: 'vocab', promptEn: 'How do you say "Hello" in Chinese?', explanationEn: '你好 literally means "you good" and works at any time of day. 再见 = "goodbye", 谢谢 = "thank you", 对不起 = "sorry".' }
    ),
    q(
      'a1-q2',
      'mcq',
      'Quel est le pronom personnel « je » en chinois ?',
      ['你 (nǐ)', '他 (tā)', '我 (wǒ)', '她 (tā)'],
      2,
      '我 (wǒ) = je / moi. 你 = tu, 他 = il, 她 = elle.',
      { topic: 'grammar', promptEn: 'What is the personal pronoun "I" in Chinese?', explanationEn: '我 (wǒ) = I / me. 你 = you, 他 = he, 她 = she.' }
    ),
    q(
      'a1-q3',
      'fill',
      'Complète la phrase ci-dessous (« je suis français »).',
      ['是', '有', '在', '不'],
      0,
      '是 (shì) signifie « être ». La structure A 是 B = A est B. « 我是法国人 » = « je suis français ».',
      { contextFr: '我 ___ 法国人。', topic: 'grammar', promptEn: 'Fill in the sentence below ("I am French").', contextEn: '我 ___ 法国人。', explanationEn: '是 (shì) means "to be". Structure A 是 B = A is B. "我是法国人" = "I am French".' }
    ),
    q(
      'a1-q4',
      'mcq',
      'Quel chiffre correspond à 三 ?',
      ['1', '2', '3', '4'],
      2,
      '三 (sān) = 3. Les chiffres 1-10 : 一 (yī), 二 (èr), 三 (sān), 四 (sì), 五 (wǔ), 六 (liù), 七 (qī), 八 (bā), 九 (jiǔ), 十 (shí).',
      { topic: 'characters', promptEn: 'Which number matches 三?', explanationEn: '三 (sān) = 3. Numbers 1-10: 一 (yī), 二 (èr), 三 (sān), 四 (sì), 五 (wǔ), 六 (liù), 七 (qī), 八 (bā), 九 (jiǔ), 十 (shí).' }
    ),
    q(
      'a1-q5',
      'mcq',
      'Comment former une question fermée (oui/non) à partir de « 他是老师 » ?',
      ['他是老师吧', '他是老师吗', '他是老师呢', '他是老师啊'],
      1,
      'La particule 吗 placée en fin de phrase transforme une affirmation en question oui/non. 他是老师吗？ = « Est-il professeur ? »',
      { topic: 'grammar', promptEn: 'How do you turn "他是老师" into a yes/no question?', explanationEn: 'The particle 吗 at the end of a sentence turns a statement into a yes/no question. 他是老师吗？ = "Is he a teacher?"' }
    ),
    q(
      'a1-q6',
      'mcq',
      'Quel est le ton de 妈 dans 妈妈 (maman) ?',
      ['1er ton (ā)', '2e ton (á)', '3e ton (ǎ)', '4e ton (à)'],
      0,
      '妈 se prononce mā, au 1er ton (haut et plat). C\'est d\'ailleurs l\'exemple classique qu\'on oppose à 马 (mǎ, cheval, 3e ton).',
      { topic: 'tones', promptEn: 'What tone does 妈 carry in 妈妈 (mom)?', explanationEn: '妈 is pronounced mā, first tone (high and flat). It\'s the classic contrast to 马 (mǎ, horse, third tone).', choicesEn: ['1st tone (ā)', '2nd tone (á)', '3rd tone (ǎ)', '4th tone (à)'] }
    ),
    q(
      'a1-q7',
      'fill',
      'Complète la phrase ci-dessous pour dire « je n\'ai pas de livre ».',
      ['不有', '没有', '不是', '没是'],
      1,
      'La négation de 有 est TOUJOURS 没有, jamais 不有. 不 ne nie pas 有. Exception unique du système : partout ailleurs, 不 est la négation standard.',
      { contextFr: '我 ___ 书。', topic: 'grammar', promptEn: 'Fill in the sentence below to say "I don\'t have a book".', contextEn: '我 ___ 书。', explanationEn: 'The negation of 有 is ALWAYS 没有, never 不有. 不 does not negate 有. This is the unique exception: everywhere else, 不 is the standard negation.' }
    ),
    q(
      'a1-q8',
      'mcq',
      'Comment dit-on « merci » ?',
      ['对不起', '请', '没关系', '谢谢'],
      3,
      '谢谢 (xièxie) = merci. 对不起 = désolé, 请 = s\'il vous plaît (en tête de demande), 没关系 = ce n\'est rien.',
      { topic: 'vocab', promptEn: 'How do you say "thank you"?', explanationEn: '谢谢 (xièxie) = thank you. 对不起 = sorry, 请 = please (at the head of a request), 没关系 = it\'s nothing.' }
    ),
    q(
      'a1-q9',
      'mcq',
      'Quel classificateur (mot de mesure) s\'utilise avec la plupart des noms communs en A1 ?',
      ['只 (zhī)', '本 (běn)', '个 (gè)', '条 (tiáo)'],
      2,
      '个 est le classificateur passe-partout : 一个人 (une personne), 一个朋友 (un ami). 本 = pour les livres, 只 = animaux, 条 = objets longs.',
      { topic: 'grammar', promptEn: 'Which classifier (measure word) is used with most common nouns at A1?', explanationEn: '个 is the all-purpose classifier: 一个人 (one person), 一个朋友 (one friend). 本 = for books, 只 = animals, 条 = long objects.' }
    ),
    q(
      'a1-q10',
      'mcq',
      'Que signifie le dialogue ci-dessous ?',
      [
        'A: Tu as quel âge ? B: J\'ai vingt ans, merci.',
        'A: Comment vas-tu ? B: Je vais très bien, merci.',
        'A: Tu es d\'où ? B: Je suis de Paris, merci.',
        'A: Comment t\'appelles-tu ? B: Je m\'appelle Li, merci.'
      ],
      1,
      '你好吗 = « comment vas-tu ? » (litt. « tu bien ? »). 很 = très, placé devant un adjectif prédicat. 我很好 = « je vais très bien ».',
      { topic: 'dialogue', contextFr: 'A: 你好吗？\nB: 我很好，谢谢。', promptEn: 'What does the dialogue below mean?', contextEn: 'A: 你好吗？\nB: 我很好，谢谢。', explanationEn: '你好吗 = "how are you?" (lit. "you good?"). 很 = very, placed before a predicate adjective. 我很好 = "I am very well".', choicesEn: ['A: How old are you? B: I am twenty, thank you.', 'A: How are you? B: I am very well, thank you.', 'A: Where are you from? B: I am from Paris, thank you.', 'A: What\'s your name? B: My name is Li, thank you.'] }
    ),
    q(
      'a1-q11',
      'mcq',
      'Quel pinyin correspond au caractère 谢 (« remercier ») ?',
      ['xié', 'xiè', 'jié', 'shè'],
      1,
      '谢 se prononce xiè au 4e ton (descendant). Le doublement 谢谢 (xièxie) atténue souvent le second ton (neutre).',
      { topic: 'tones', promptEn: 'Which pinyin matches the character 谢 ("to thank")?', explanationEn: '谢 is pronounced xiè in the fourth tone (falling). In doubled form 谢谢 (xièxie), the second syllable is often reduced to neutral tone.' }
    ),
    q(
      'a1-q12',
      'mcq',
      'Comment se dit « grand-père paternel » en chinois ?',
      ['爸爸 (bàba)', '哥哥 (gēge)', '爷爷 (yéye)', '叔叔 (shūshu)'],
      2,
      '爷爷 = grand-père paternel. 奶奶 = grand-mère paternelle. La famille chinoise distingue côté paternel et maternel : 外公/外婆 côté maternel.',
      { topic: 'vocab', promptEn: 'How do you say "paternal grandfather" in Chinese?', explanationEn: '爷爷 = paternal grandfather. 奶奶 = paternal grandmother. Chinese family terms distinguish paternal and maternal sides: 外公/外婆 for the maternal side.' }
    ),
    q(
      'a1-q13',
      'mcq',
      'Quel chiffre s\'écrit 八 ?',
      ['6', '7', '8', '9'],
      2,
      '八 (bā) = 8. Le 8 est considéré comme chiffre porte-bonheur en Chine car 八 se prononce comme 发 (fā, « prospérer »).',
      { topic: 'characters', promptEn: 'Which digit is written 八?', explanationEn: '八 (bā) = 8. Eight is a lucky number in China because 八 sounds like 发 (fā, "to prosper").' }
    ),
    q(
      'a1-q14',
      'fill',
      'Complète : « Bonjour, professeur ! »',
      ['老师好', '好老师', '老师你', '你老师好'],
      0,
      'La formule de salutation respectueuse est NOM + 好 : 老师好 (bonjour professeur), 大家好 (bonjour tout le monde). Construction figée à connaître.',
      { contextFr: 'A: ___ ！\nB: 你们好！', topic: 'dialogue', promptEn: 'Fill in: "Hello, teacher!"', contextEn: 'A: ___ ！\nB: 你们好！', explanationEn: 'The respectful greeting is NAME + 好: 老师好 (hello teacher), 大家好 (hello everyone). A fixed construction to memorize.' }
    ),
    q(
      'a1-q15',
      'mcq',
      'Quelle est la différence de ton entre 妈 (mā) et 马 (mǎ) ?',
      [
        '1er ton plat vs 3e ton creux (bas-remontant)',
        '2e ton montant vs 4e ton descendant',
        '3e ton vs 4e ton',
        'Aucune différence'
      ],
      0,
      '妈 = 1er ton haut et plat (mā). 马 = 3e ton, bas avec une légère remontée (mǎ). Confondre les tons change le sens : maman vs cheval.',
      { topic: 'tones', promptEn: 'What is the tonal difference between 妈 (mā) and 马 (mǎ)?', explanationEn: '妈 = first tone, high and flat (mā). 马 = third tone, low with a slight rise (mǎ). Confusing the tones changes the meaning: mom vs horse.', choicesEn: ['1st tone (flat) vs 3rd tone (low, dipping)', '2nd tone (rising) vs 4th tone (falling)', '3rd tone vs 4th tone', 'No difference'] }
    ),
    q(
      'a1-q16',
      'mcq',
      'Comment dit-on « j\'ai 25 ans » ?',
      ['我二十五岁', '我有二十五年', '我是二十五', '我二十五年'],
      0,
      'L\'âge se dit SUJET + NOMBRE + 岁. 我二十五岁 = « j\'ai 25 ans ». Pas besoin de 是 ni de 有 : le verbe est implicite.',
      { topic: 'vocab', promptEn: 'How do you say "I am 25 years old"?', explanationEn: 'Age is expressed as SUBJECT + NUMBER + 岁. 我二十五岁 = "I am 25". No need for 是 or 有: the verb is implicit.' }
    ),
    q(
      'a1-q17',
      'mcq',
      'Quel est le sens de 大 et de 小 ?',
      [
        '大 = grand / 小 = petit',
        '大 = petit / 小 = grand',
        '大 = vieux / 小 = jeune',
        '大 = beau / 小 = laid'
      ],
      0,
      '大 (dà) = grand, 小 (xiǎo) = petit. Ce sont aussi des préfixes affectifs : 小李 = « petit Li » (familier), 大家 = « tout le monde » (litt. grande famille).',
      { topic: 'characters', promptEn: 'What do 大 and 小 mean?', explanationEn: '大 (dà) = big, 小 (xiǎo) = small. They are also affectionate prefixes: 小李 = "little Li" (informal), 大家 = "everyone" (lit. "big family").', choicesEn: ['大 = big / 小 = small', '大 = small / 小 = big', '大 = old / 小 = young', '大 = beautiful / 小 = ugly'] }
    ),
    q(
      'a1-q18',
      'mcq',
      'Dans le dialogue ci-dessous, comment A est-il salué ?',
      [
        'On lui demande son nom.',
        'On lui dit au revoir.',
        'On lui souhaite la bienvenue.',
        'On lui présente quelqu\'un.'
      ],
      1,
      '再见 (zàijiàn) = « au revoir » (litt. « à se revoir »). 明天 = demain. C\'est une formule de séparation polie standard.',
      { topic: 'dialogue', contextFr: 'A: 我走了。\nB: 再见，明天见！', promptEn: 'In the dialogue below, how is A being addressed?', contextEn: 'A: 我走了。\nB: 再见，明天见！', explanationEn: '再见 (zàijiàn) = "goodbye" (lit. "see again"). 明天 = tomorrow. A standard polite parting phrase.', choicesEn: ['They\'re asked for their name.', 'They\'re being told goodbye.', 'They\'re being welcomed.', 'They\'re being introduced to someone.'] }
    )
  ]
};

// ============================================================================
//  A2 — Élémentaire (HSK 2 ish)
// ============================================================================
const a2: LevelBilan = {
  level: 'a2',
  titleFr: 'Bilan A2 — Communication quotidienne',
  titleEn: 'A2 Level Check — Daily Communication',
  descriptionFr:
    "Vérifie les acquis du quotidien : temps (了, 要, 会), questions ouvertes, lieu, possessif 的, expressions de base avec modaux.",
  descriptionEn:
    'Checks daily-life foundations: time markers (了, 要, 会), open questions, location, 的 possessive, basic modals.',
  emoji: '🌿',
  passingScore: BILAN_DEFAULT_PASSING,
  xpReward: BILAN_XP_REWARD,
  questions: [
    q(
      'a2-q1',
      'fill',
      'Complète la phrase ci-dessous (« il est allé à Pékin »).',
      ['去 / 了', '去 / 吗', '要 / 了', '在 / 吗'],
      0,
      'Le marqueur 了 en fin de phrase (ou après le verbe) indique un changement d\'état ou un événement accompli. 他去北京了 = « il est allé / parti à Pékin ».',
      { contextFr: '他 ___ 北京 ___ 。', topic: 'grammar', promptEn: 'Fill in the sentence below ("he went to Beijing").', contextEn: '他 ___ 北京 ___ 。', explanationEn: 'The marker 了 at the end of a sentence (or after the verb) signals a change of state or completed event. 他去北京了 = "he went / left for Beijing".', choicesEn: ['去 / 了', '去 / 吗', '要 / 了', '在 / 吗'] }
    ),
    q(
      'a2-q2',
      'mcq',
      'Comment demander « où » en chinois ?',
      ['什么', '谁', '哪里', '几'],
      2,
      '哪里 (nǎlǐ) ou 哪儿 (nǎr, plus oral) = « où ». 什么 = quoi, 谁 = qui, 几 = combien (petit nombre).',
      { topic: 'grammar', promptEn: 'How do you ask "where" in Chinese?', explanationEn: '哪里 (nǎlǐ) or 哪儿 (nǎr, more colloquial) = "where". 什么 = what, 谁 = who, 几 = how many (small number).' }
    ),
    q(
      'a2-q3',
      'mcq',
      'Quelle phrase signifie « Je veux boire du thé » ?',
      ['我喝茶了', '我想喝茶', '我会喝茶', '我没喝茶'],
      1,
      '想 exprime l\'envie ou le souhait. 会 = savoir (faire), 了 = accompli, 没 = négation du passé.',
      { topic: 'grammar', promptEn: 'Which sentence means "I want to drink tea"?', explanationEn: '想 expresses desire or wish. 会 = to know how to, 了 = completed, 没 = past negation.' }
    ),
    q(
      'a2-q4',
      'fill',
      'Complète la phrase ci-dessous (« le livre de mon ami »).',
      ['的', '得', '地', '了'],
      0,
      '的 marque la possession ou la qualification : 我朋友的书 = le livre de mon ami. 得 et 地 sont des particules différentes (complément / adverbe).',
      { contextFr: '我朋友 ___ 书。', topic: 'grammar', promptEn: 'Fill in the sentence below ("my friend\'s book").', contextEn: '我朋友 ___ 书。', explanationEn: '的 marks possession or qualification: 我朋友的书 = my friend\'s book. 得 and 地 are different particles (complement / adverb).' }
    ),
    q(
      'a2-q5',
      'mcq',
      'Que signifie « 他在图书馆 » ?',
      [
        'Il va à la bibliothèque.',
        'Il est à la bibliothèque.',
        'Il va rentrer à la bibliothèque.',
        'Il sort de la bibliothèque.'
      ],
      1,
      '在 + lieu = « se trouver à » (verbe localisatif). À distinguer de 去 (aller à). 他在图书馆 = il est à la bibliothèque.',
      { topic: 'grammar', promptEn: 'What does "他在图书馆" mean?', explanationEn: '在 + place = "to be at" (locative verb). To be distinguished from 去 (to go to). 他在图书馆 = he is at the library.', choicesEn: ['He\'s going to the library.', 'He\'s at the library.', 'He\'s about to head back to the library.', 'He\'s leaving the library.'] }
    ),
    q(
      'a2-q6',
      'mcq',
      'Quel jour vient après 星期四 ?',
      ['星期一', '星期三', '星期五', '星期天'],
      2,
      '星期 + chiffre : 星期一 lundi, 星期二 mardi, 星期三 mercredi, 星期四 jeudi, 星期五 vendredi, 星期六 samedi, 星期天 (ou 星期日) dimanche.',
      { topic: 'vocab', promptEn: 'Which day comes after 星期四?', explanationEn: '星期 + number: 星期一 Monday, 星期二 Tuesday, 星期三 Wednesday, 星期四 Thursday, 星期五 Friday, 星期六 Saturday, 星期天 (or 星期日) Sunday.' }
    ),
    q(
      'a2-q7',
      'mcq',
      'Comment dire « demain il fera chaud » ?',
      ['昨天很热', '明天很热', '今天很冷', '后天很冷'],
      1,
      '明天 = demain, 很热 = très chaud. 昨天 = hier, 今天 = aujourd\'hui, 后天 = après-demain, 冷 = froid.',
      { topic: 'vocab', promptEn: 'How do you say "tomorrow will be hot"?', explanationEn: '明天 = tomorrow, 很热 = very hot. 昨天 = yesterday, 今天 = today, 后天 = the day after tomorrow, 冷 = cold.' }
    ),
    q(
      'a2-q8',
      'fill',
      'Complète la phrase ci-dessous (« je sais parler chinois »).',
      ['想', '要', '会', '可以'],
      2,
      '会 = savoir (faire), compétence acquise par apprentissage. 想 = vouloir/envie, 要 = vouloir (plus ferme), 可以 = pouvoir (permission).',
      { contextFr: '我 ___ 说汉语。', topic: 'grammar', promptEn: 'Fill in the sentence below ("I can speak Chinese").', contextEn: '我 ___ 说汉语。', explanationEn: '会 = to know how to (a skill acquired through learning). 想 = to want / feel like, 要 = to want (stronger), 可以 = to be allowed to (permission).' }
    ),
    q(
      'a2-q9',
      'mcq',
      'Combien coûte ceci en chinois se dit :',
      ['这个多少钱？', '这个几钱？', '这个哪钱？', '这个什么钱？'],
      0,
      '多少 sert à demander une quantité potentiellement grande (prix, population). 几 sert pour un petit nombre attendu (< 10). 多少钱 = combien ça coûte.',
      { topic: 'dialogue', promptEn: '"How much does this cost?" in Chinese is:', explanationEn: '多少 asks about a potentially large quantity (price, population). 几 asks about a small expected number (< 10). 多少钱 = how much does it cost.' }
    ),
    q(
      'a2-q10',
      'mcq',
      'Dans le dialogue ci-dessous, que veut dire B ?',
      [
        "J'ai deux petites sœurs.",
        "J'ai deux grandes sœurs.",
        "J'ai deux frères.",
        "J'ai deux cousins."
      ],
      1,
      '姐姐 = grande sœur (aînée). 妹妹 = petite sœur, 哥哥 = grand frère, 弟弟 = petit frère. Le chinois distingue systématiquement aîné/cadet dans la fratrie.',
      { topic: 'dialogue', contextFr: 'A: 你有几个兄弟姐妹？\nB: 我有两个姐姐。', promptEn: 'In the dialogue below, what does B say?', contextEn: 'A: 你有几个兄弟姐妹？\nB: 我有两个姐姐。', explanationEn: '姐姐 = older sister. 妹妹 = younger sister, 哥哥 = older brother, 弟弟 = younger brother. Chinese systematically distinguishes older/younger siblings.', choicesEn: ['I have two younger sisters.', 'I have two older sisters.', 'I have two brothers.', 'I have two cousins.'] }
    ),
    q(
      'a2-q11',
      'mcq',
      'Comment dire « il est 3h de l\'après-midi » ?',
      ['下午三点', '上午三点', '晚上三点', '早上三点'],
      0,
      '下午 = après-midi, 上午 = matin (avant midi), 早上 = tôt le matin, 晚上 = soir. 点 = heure. 下午三点 = 15h.',
      { topic: 'vocab', promptEn: 'How do you say "it\'s 3pm"?', explanationEn: '下午 = afternoon, 上午 = morning (before noon), 早上 = early morning, 晚上 = evening. 点 = o\'clock. 下午三点 = 3pm.' }
    ),
    q(
      'a2-q12',
      'fill',
      'Complète la phrase ci-dessous (« je rentre chez moi en bus »).',
      ['坐 / 回家', '开 / 回家', '走 / 回家', '骑 / 回家'],
      0,
      '坐 + véhicule = prendre (un transport assis). 我坐公共汽车回家 = je rentre en bus. 开车 = conduire, 骑 = enfourcher (vélo, moto).',
      { contextFr: '我 ___ 公共汽车 ___ 。', topic: 'grammar', promptEn: 'Fill in the sentence below ("I go home by bus").', contextEn: '我 ___ 公共汽车 ___ 。', explanationEn: '坐 + vehicle = to take (seated transport). 我坐公共汽车回家 = I take the bus home. 开车 = to drive, 骑 = to ride astride (bike, motorbike).', choicesEn: ['坐 / 回家', '开 / 回家', '走 / 回家', '骑 / 回家'] }
    ),
    q(
      'a2-q13',
      'mcq',
      'Quelle phrase est correcte pour exprimer la date du 5 mars ?',
      ['三月五号', '五月三号', '三五号月', '号五三月'],
      0,
      'Ordre chinois pour la date : ANNÉE + MOIS + JOUR. 三月五号 = 5 mars (litt. « mois 3 jour 5 »). 号 est la version orale de 日.',
      { topic: 'vocab', promptEn: 'Which sentence correctly expresses the date "March 5"?', explanationEn: 'Chinese date order: YEAR + MONTH + DAY. 三月五号 = March 5 (lit. "month 3 day 5"). 号 is the spoken form of 日.' }
    ),
    q(
      'a2-q14',
      'mcq',
      'Que signifie 一点儿 dans « 我会说一点儿汉语 » ?',
      ['Beaucoup', 'Un peu', 'Pas du tout', 'Couramment'],
      1,
      '一点儿 = « un peu » (quantité réduite). 我会说一点儿汉语 = « je parle un peu chinois ». À ne pas confondre avec 有点儿 (légèrement, avec nuance négative).',
      { topic: 'grammar', promptEn: 'What does 一点儿 mean in "我会说一点儿汉语"?', explanationEn: '一点儿 = "a little" (small quantity). 我会说一点儿汉语 = "I speak a little Chinese". Don\'t confuse with 有点儿 (slightly, with a mild negative nuance).', choicesEn: ['A lot', 'A little', 'Not at all', 'Fluently'] }
    ),
    q(
      'a2-q15',
      'fill',
      'Complète : « ce vêtement est très joli » (avec mise en relief avec 的).',
      ['是 / 的', '在 / 的', '了 / 的', '不 / 的'],
      0,
      '是...的 met en relief un élément de la phrase (ici la qualité). 这件衣服是很漂亮的 = « ce vêtement est vraiment joli ».',
      { contextFr: '这件衣服 ___ 很漂亮 ___ 。', topic: 'grammar', promptEn: 'Fill in: "this piece of clothing is really pretty" (with 是...的 for emphasis).', contextEn: '这件衣服 ___ 很漂亮 ___ 。', explanationEn: '是...的 emphasizes an element of the sentence (here the quality). 这件衣服是很漂亮的 = "this piece of clothing really is pretty".', choicesEn: ['是 / 的', '在 / 的', '了 / 的', '不 / 的'] }
    ),
    q(
      'a2-q16',
      'mcq',
      'Comment dire « j\'aime beaucoup le café » ?',
      ['我很喜欢咖啡', '我喜欢很咖啡', '我咖啡很喜欢', '咖啡我喜欢很'],
      0,
      'Ordre standard : SUJET + 很 + VERBE/ADJ + COD. 很 se place TOUJOURS devant le prédicat (verbe d\'état ou adjectif), jamais après l\'objet.',
      { topic: 'grammar', promptEn: 'How do you say "I really like coffee"?', explanationEn: 'Standard order: SUBJECT + 很 + VERB/ADJ + OBJECT. 很 ALWAYS goes before the predicate (stative verb or adjective), never after the object.' }
    ),
    q(
      'a2-q17',
      'mcq',
      'Que veut dire 一起 ?',
      ['Ensemble', 'Seul', 'Une fois', 'Encore'],
      0,
      '一起 (yīqǐ) = ensemble. 我们一起去 = « on y va ensemble ». À distinguer de 一次 (une fois) et 一下 (un petit instant).',
      { topic: 'vocab', promptEn: 'What does 一起 mean?', explanationEn: '一起 (yīqǐ) = together. 我们一起去 = "let\'s go together". Don\'t confuse with 一次 (once) or 一下 (a brief moment).', choicesEn: ['Together', 'Alone', 'Once', 'Again'] }
    ),
    q(
      'a2-q18',
      'fill',
      'Complète la phrase ci-dessous (« j\'ai déjà mangé »).',
      ['过', '了', '着', '在'],
      1,
      '了 marque ici l\'accompli (action achevée). 我已经吃了 = « j\'ai déjà mangé ». 过 marque l\'expérience (avoir déjà fait au moins une fois), 着 l\'état persistant.',
      { contextFr: '我已经吃 ___ 。', topic: 'grammar', promptEn: 'Fill in the sentence below ("I\'ve already eaten").', contextEn: '我已经吃 ___ 。', explanationEn: '了 marks completion here (action finished). 我已经吃了 = "I\'ve already eaten". 过 marks experience (having done something at least once), 着 marks a persistent state.' }
    ),
    q(
      'a2-q19',
      'mcq',
      'Que signifie 觉得 ?',
      ['Dormir', 'Penser / trouver que', 'Être réveillé', 'Sentir une odeur'],
      1,
      '觉得 (juéde) = trouver que, penser que (avis personnel). 我觉得很有意思 = « je trouve ça intéressant ». 睡觉 (shuìjiào) = dormir.',
      { topic: 'vocab', promptEn: 'What does 觉得 mean?', explanationEn: '觉得 (juéde) = to find that, to think that (personal opinion). 我觉得很有意思 = "I find it interesting". 睡觉 (shuìjiào) = to sleep.', choicesEn: ['To sleep', 'To think / find that', 'To be awake', 'To smell'] }
    ),
    q(
      'a2-q20',
      'mcq',
      'Dans le dialogue ci-dessous, que propose A ?',
      [
        'Aller voir un film ensemble.',
        'Rester à la maison.',
        'Refuser une invitation.',
        'Acheter un cadeau.'
      ],
      0,
      '一起 = ensemble, 看电影 = regarder un film, 怎么样 = qu\'en penses-tu ? Formule typique d\'invitation. 好啊 = oui d\'accord (registre amical).',
      { topic: 'dialogue', contextFr: 'A: 我们一起去看电影，怎么样？\nB: 好啊！', promptEn: 'In the dialogue below, what does A suggest?', contextEn: 'A: 我们一起去看电影，怎么样？\nB: 好啊！', explanationEn: '一起 = together, 看电影 = to watch a movie, 怎么样 = how about it? A typical invitation formula. 好啊 = yes, sure (friendly register).', choicesEn: ['Going to see a movie together.', 'Staying home.', 'Turning down an invitation.', 'Buying a gift.'] }
    ),
    q(
      'a2-q21',
      'mcq',
      'Quelle phrase exprime correctement « il aime jouer au foot » ?',
      ['他喜欢踢足球', '他喜欢打足球', '他喜欢玩足球', '他喜欢做足球'],
      0,
      'En chinois, on utilise 踢 (kicker) pour le foot : 踢足球. 打 pour les sports de raquette ou de main : 打篮球 (basket), 打网球 (tennis). 玩 = jouer (général).',
      { topic: 'vocab', promptEn: 'Which sentence correctly says "he likes to play soccer"?', explanationEn: 'In Chinese, 踢 (to kick) is used for soccer: 踢足球. 打 is for racket or hand sports: 打篮球 (basketball), 打网球 (tennis). 玩 = to play (general).' }
    )
  ]
};

// ============================================================================
//  B1.1 — Intermédiaire seuil (HSK 3 début)
// ============================================================================
const b11: LevelBilan = {
  level: 'b1.1',
  titleFr: 'Bilan B1.1 — Premiers dialogues complexes',
  titleEn: 'B1.1 Level Check — First Complex Dialogues',
  descriptionFr:
    "Vérifie les premières structures complexes : 把, 比 (comparatif), 正在, compléments de degré, résultatifs simples, 给 ditransitif.",
  descriptionEn:
    'Checks first complex structures: 把, 比 (comparative), 正在, degree complements, simple resultatives, 给 ditransitive.',
  emoji: '🌸',
  passingScore: BILAN_DEFAULT_PASSING,
  xpReward: BILAN_XP_REWARD,
  questions: [
    q(
      'b11-q1',
      'fill',
      'Complète la phrase ci-dessous (« j\'ai fini de lire ce livre »).',
      ['把 / 看', '在 / 看', '给 / 读', '对 / 看'],
      0,
      'La structure 把 déplace l\'objet avant le verbe pour insister sur le résultat de l\'action. 把 + OBJ + VERBE + RÉSULTATIF. 我把这本书看完了 = « j\'ai fini de lire ce livre ».',
      { contextFr: '我 ___ 这本书 ___ 完了。', topic: 'grammar', promptEn: 'Fill in the sentence below ("I finished reading this book").', contextEn: '我 ___ 这本书 ___ 完了。', explanationEn: 'The 把 construction moves the object before the verb to emphasize the result of the action. 把 + OBJ + VERB + RESULTATIVE. 我把这本书看完了 = "I finished reading this book".', choicesEn: ['把 / 看', '在 / 看', '给 / 读', '对 / 看'] }
    ),
    q(
      'b11-q2',
      'mcq',
      'Comment exprimer « Il est plus grand que moi » ?',
      ['他很高比我', '他比我高', '他和我一样高', '他比我更高'],
      1,
      'Structure du comparatif : A + 比 + B + ADJ. 他比我高 = il est plus grand que moi. 比 ne s\'accompagne PAS de 很 ni 更 (sauf nuance spéciale).',
      { topic: 'grammar', promptEn: 'How do you express "He is taller than me"?', explanationEn: 'Comparative structure: A + 比 + B + ADJ. 他比我高 = he is taller than me. 比 is NOT paired with 很 or 更 (except for special nuance).' }
    ),
    q(
      'b11-q3',
      'fill',
      'Complète la phrase ci-dessous (« il est en train de lire »).',
      ['在', '正在', '了', 'A et B sont corrects'],
      3,
      '正在 et 在 expriment tous deux l\'aspect progressif. 正在 insiste sur le moment précis, 在 est plus neutre. 他（正）在看书 = « il est (en train) de lire ».',
      { contextFr: '他 ___ 看书。', topic: 'grammar', promptEn: 'Fill in the sentence below ("he is reading right now").', contextEn: '他 ___ 看书。', explanationEn: 'Both 正在 and 在 express the progressive aspect. 正在 emphasizes the precise moment, 在 is more neutral. 他（正）在看书 = "he is (currently) reading".', choicesEn: ['在', '正在', '了', 'A and B are both correct'] }
    ),
    q(
      'b11-q4',
      'mcq',
      'Que signifie « 听懂 » ?',
      [
        'Écouter attentivement',
        'Écouter et comprendre',
        'Entendre par hasard',
        'Ne pas écouter'
      ],
      1,
      '懂 est un complément résultatif signifiant « comprendre ». 听懂 = « écouter-et-comprendre » = saisir ce qu\'on entend. Comparer : 看懂 (lire-et-comprendre).',
      { topic: 'grammar', promptEn: 'What does "听懂" mean?', explanationEn: '懂 is a resultative complement meaning "to understand". 听懂 = "listen-and-understand" = to grasp what you hear. Compare: 看懂 (read-and-understand).', choicesEn: ['To listen attentively', 'To listen and understand', 'To overhear', 'To not listen'] }
    ),
    q(
      'b11-q5',
      'fill',
      'Complète la phrase ci-dessous (« j\'ai offert un cadeau à ma mère »).',
      ['送 / 给', '给 / 送', '给 / 了', '对 / 送'],
      0,
      '送给 est le verbe + préposition ditransitif pour « offrir à ». 我送给妈妈一个礼物 = « j\'ai offert un cadeau à maman ». On peut aussi inverser avec 我把礼物送给了妈妈.',
      { contextFr: '我 ___ 妈妈 ___ 一个礼物。', topic: 'grammar', promptEn: 'Fill in the sentence below ("I gave my mother a present").', contextEn: '我 ___ 妈妈 ___ 一个礼物。', explanationEn: '送给 is the ditransitive verb + preposition for "to give to". 我送给妈妈一个礼物 = "I gave a gift to mom". You can also invert with 我把礼物送给了妈妈.', choicesEn: ['送 / 给', '给 / 送', '给 / 了', '对 / 送'] }
    ),
    q(
      'b11-q6',
      'mcq',
      'Quel complément de degré correspond à « extrêmement bon » ?',
      ['很好', '好很', '好极了', '很好了'],
      2,
      '极了 se place APRÈS l\'adjectif pour marquer l\'extrême : 好极了 = excellent / extra. Équivalents : 太...了, ...死了 (familier).',
      { topic: 'grammar', promptEn: 'Which degree complement corresponds to "extremely good"?', explanationEn: '极了 goes AFTER the adjective to mark an extreme: 好极了 = excellent / great. Equivalents: 太...了, ...死了 (colloquial).' }
    ),
    q(
      'b11-q7',
      'mcq',
      'Comment dire « J\'ai étudié le chinois pendant 3 ans » ?',
      [
        '我三年学了汉语',
        '我学汉语了三年',
        '我学了三年汉语',
        '我学汉语三年'
      ],
      2,
      'Structure de la durée : SUJET + V + 了 + DURÉE + OBJET. 我学了三年汉语 = « j\'ai étudié le chinois 3 ans ». La durée se place après 了 pour les phrases avec objet.',
      { topic: 'grammar', promptEn: 'How do you say "I studied Chinese for 3 years"?', explanationEn: 'Duration structure: SUBJECT + V + 了 + DURATION + OBJECT. 我学了三年汉语 = "I studied Chinese for 3 years". The duration goes after 了 in sentences with an object.' }
    ),
    q(
      'b11-q8',
      'mcq',
      'Que veut dire « 一边...一边... » ?',
      [
        'D\'un côté... et de l\'autre...',
        'Soit... soit...',
        'Faire deux actions simultanément',
        'Un peu, puis encore un peu'
      ],
      2,
      '一边 V1 一边 V2 = faire V1 et V2 en même temps. 他一边吃饭一边看电视 = « il mange en regardant la télé ».',
      { topic: 'grammar', promptEn: 'What does "一边...一边..." mean?', explanationEn: '一边 V1 一边 V2 = to do V1 and V2 at the same time. 他一边吃饭一边看电视 = "he eats while watching TV".', choicesEn: ['On one hand... on the other...', 'Either... or...', 'To do two actions simultaneously', 'A bit, then a bit more'] }
    ),
    q(
      'b11-q9',
      'mcq',
      'Quelle phrase utilise correctement 没 ?',
      ['我明天没去', '我没去过中国', '我不没想', '我没会说'],
      1,
      '没 nie les actions accomplies ou l\'expérience (avec 过). 我没去过中国 = « je ne suis jamais allé en Chine ». Pour le futur ou les généralités, on utilise 不.',
      { topic: 'grammar', promptEn: 'Which sentence uses 没 correctly?', explanationEn: '没 negates completed actions or experience (with 过). 我没去过中国 = "I have never been to China". For future or general statements, use 不.' }
    ),
    q(
      'b11-q10',
      'mcq',
      'Dans le dialogue ci-dessous, B trouve le film :',
      [
        'Court mais ennuyeux',
        'Plutôt bien, juste un peu long',
        'Long et excellent',
        'Trop long pour être bien'
      ],
      1,
      '挺...的 = « assez / plutôt... » (ton familier nuancé positif). 就是 = « c\'est juste que... » (concession). 有点儿 = « un peu » (avec connotation légèrement négative).',
      { topic: 'dialogue', contextFr: 'A: 你觉得这个电影怎么样？\nB: 挺好看的，就是有点儿长。', promptEn: 'In the dialogue below, B finds the movie:', contextEn: 'A: 你觉得这个电影怎么样？\nB: 挺好看的，就是有点儿长。', explanationEn: '挺...的 = "fairly / pretty..." (colloquial, mildly positive). 就是 = "it\'s just that..." (concession). 有点儿 = "a bit" (with a slightly negative nuance).', choicesEn: ['Short but boring', 'Pretty good, just a bit long', 'Long and excellent', 'Too long to be good'] }
    ),
    q(
      'b11-q11',
      'fill',
      'Complète la phrase ci-dessous avec le résultatif adéquat (« j\'ai correctement compris »).',
      ['对', '完', '好', '到'],
      0,
      '对 comme résultatif signifie « correctement, juste ». 听懂 = comprendre, 听对 = avoir compris correctement (sans erreur). 听完 = avoir fini d\'écouter, 听好 = bien écouter.',
      { contextFr: '我听 ___ 了。', topic: 'grammar', promptEn: 'Fill in the sentence below with the right resultative ("I understood correctly").', contextEn: '我听 ___ 了。', explanationEn: '对 as a resultative means "correctly, right". 听懂 = to understand, 听对 = to have heard correctly (no mistake). 听完 = to have finished listening, 听好 = to listen carefully.' }
    ),
    q(
      'b11-q12',
      'mcq',
      'Comment dire « la pomme rouge sur la table » ?',
      ['桌子上的红苹果', '红苹果的桌子上', '苹果红桌子上的', '上桌子的红苹果'],
      0,
      'Le chinois place les compléments AVANT le nom modifié, avec 的. 桌子上的红苹果 = « la pomme rouge (qui est) sur la table ». L\'ordre suit : déterminant + 的 + noyau.',
      { topic: 'grammar', promptEn: 'How do you say "the red apple on the table"?', explanationEn: 'Chinese places modifiers BEFORE the modified noun, with 的. 桌子上的红苹果 = "the red apple (that is) on the table". Order: determiner + 的 + head noun.' }
    ),
    q(
      'b11-q13',
      'mcq',
      'Que signifie le chengyu 入乡随俗 ?',
      [
        'À Rome, fais comme les Romains.',
        'Voyager loin de chez soi.',
        'Suivre ses coutumes ancestrales.',
        'Ne jamais quitter son village.'
      ],
      0,
      '入乡随俗 (rù xiāng suí sú) = « entrer dans un village, en suivre les coutumes ». S\'adapter aux usages locaux. Très courant pour parler d\'interculturalité.',
      { topic: 'culture', promptEn: 'What does the chengyu 入乡随俗 mean?', explanationEn: '入乡随俗 (rù xiāng suí sú) = "enter a village, follow its customs". Adapt to local ways. Very common when discussing intercultural matters.', choicesEn: ['When in Rome, do as the Romans do.', 'Traveling far from home.', 'Following ancestral customs.', 'Never leaving your village.'] }
    ),
    q(
      'b11-q14',
      'fill',
      'Complète la phrase ci-dessous (« je vais demain au cinéma »).',
      ['去 / 看', '看 / 去', '到 / 看', '在 / 看'],
      0,
      'Structure de plusieurs verbes en série : 我明天去电影院看电影 = « je vais demain au cinéma voir un film ». 去 introduit la destination, le 2e verbe le but.',
      { contextFr: '我明天 ___ 电影院 ___ 电影。', topic: 'grammar', promptEn: 'Fill in the sentence below ("I\'m going to the cinema tomorrow").', contextEn: '我明天 ___ 电影院 ___ 电影。', explanationEn: 'Serial verb structure: 我明天去电影院看电影 = "I\'m going to the cinema tomorrow to see a movie". 去 introduces the destination, the second verb the purpose.', choicesEn: ['去 / 看', '看 / 去', '到 / 看', '在 / 看'] }
    ),
    q(
      'b11-q15',
      'mcq',
      'Que signifie 差不多 ?',
      ['Très différent', 'À peu près / presque pareil', 'Tout à fait différent', 'Complètement faux'],
      1,
      '差不多 (chàbuduō) = « à peu près / presque ». Très utilisé pour relativiser, approximer. 差不多 = ils sont à peu près pareils.',
      { topic: 'vocab', promptEn: 'What does 差不多 mean?', explanationEn: '差不多 (chàbuduō) = "about / almost". Very commonly used to relativize or approximate. 差不多 = they\'re about the same.', choicesEn: ['Very different', 'About / almost the same', 'Completely different', 'Completely wrong'] }
    ),
    q(
      'b11-q16',
      'mcq',
      'Comment exprimer « il pleut depuis ce matin » ?',
      [
        '从今天早上开始下雨',
        '今天早上开始下雨从',
        '下雨开始从今天早上',
        '今天早上从下雨开始'
      ],
      0,
      'Structure : 从 + DÉBUT + 开始 + ACTION. 从今天早上开始下雨 = « il pleut depuis ce matin ». 从 = depuis, 开始 = commencer.',
      { topic: 'grammar', promptEn: 'How do you express "it has been raining since this morning"?', explanationEn: 'Structure: 从 + START + 开始 + ACTION. 从今天早上开始下雨 = "it has been raining since this morning". 从 = since, 开始 = to begin.' }
    ),
    q(
      'b11-q17',
      'fill',
      'Complète la phrase ci-dessous (« j\'ai déjà été en Chine »).',
      ['了', '过', '着', '到'],
      1,
      '过 marque l\'expérience vécue au moins une fois. 我去过中国 = « j\'ai déjà été en Chine (au moins une fois) ». À distinguer de 了 (action achevée précise).',
      { contextFr: '我去 ___ 中国。', topic: 'grammar', promptEn: 'Fill in the sentence below ("I have been to China before").', contextEn: '我去 ___ 中国。', explanationEn: '过 marks lived experience at least once. 我去过中国 = "I have been to China (at least once)". Distinct from 了 (specific completed action).' }
    ),
    q(
      'b11-q18',
      'mcq',
      'Que veut dire 千万 dans « 你千万要小心 » ?',
      ['Dix millions', 'Absolument / surtout', 'Mille fois', 'Peut-être'],
      1,
      '千万 (qiānwàn) en début de phrase = « surtout / absolument » (recommandation insistante). 你千万要小心 = « surtout, fais attention ! ». À l\'origine litt. « 10 millions ».',
      { topic: 'vocab', promptEn: 'What does 千万 mean in "你千万要小心"?', explanationEn: '千万 (qiānwàn) at the start of a clause = "above all / by all means" (strong recommendation). 你千万要小心 = "please, be careful!". Literally 10 million originally.', choicesEn: ['Ten million', 'Absolutely / above all', 'A thousand times', 'Perhaps'] }
    ),
    q(
      'b11-q19',
      'mcq',
      'Quelle phrase utilise correctement 着 (état persistant) ?',
      ['他坐着看书', '他着坐看书', '他坐看着书', '着他坐看书'],
      0,
      '着 se place IMMÉDIATEMENT après le verbe principal pour marquer un état/posture maintenu. 他坐着看书 = « il lit assis (en restant assis) ». Structure : V1 + 着 + V2.',
      { topic: 'grammar', promptEn: 'Which sentence uses 着 (persistent state) correctly?', explanationEn: '着 goes IMMEDIATELY after the main verb to mark a maintained state or posture. 他坐着看书 = "he reads while sitting". Structure: V1 + 着 + V2.' }
    ),
    q(
      'b11-q20',
      'fill',
      'Complète : Il est plus jeune que moi de 3 ans.',
      ['比 / 小', '比 / 少', '从 / 小', '和 / 少'],
      0,
      'Structure du comparatif chiffré : A + 比 + B + ADJ + ÉCART. 他比我小三岁 = « il a 3 ans de moins que moi ». 小 s\'emploie pour l\'âge, pas 少.',
      { contextFr: '他 ___ 我 ___ 三岁。', topic: 'grammar', promptEn: 'Fill in: He is 3 years younger than me.', contextEn: '他 ___ 我 ___ 三岁。', explanationEn: 'Numeric comparative structure: A + 比 + B + ADJ + GAP. 他比我小三岁 = "he is 3 years younger than me". 小 is used for age, not 少.', choicesEn: ['比 / 小', '比 / 少', '从 / 小', '和 / 少'] }
    ),
    q(
      'b11-q21',
      'mcq',
      'Dans le dialogue ci-dessous, que veut dire B ?',
      [
        'Il est libre demain.',
        'Il est occupé demain mais libre après-demain.',
        'Il refuse de venir.',
        'Il ne sait pas encore.'
      ],
      1,
      '没空 = ne pas avoir le temps. 后天 = après-demain. 怎么样 = ça te va ? B propose un report : pas dispo demain mais OK après-demain.',
      { topic: 'dialogue', contextFr: 'A: 明天有空吗？\nB: 明天没空，后天怎么样？', promptEn: 'In the dialogue below, what does B say?', contextEn: 'A: 明天有空吗？\nB: 明天没空，后天怎么样？', explanationEn: '没空 = to not have time. 后天 = the day after tomorrow. 怎么样 = does that work? B suggests a reschedule: not free tomorrow but OK the day after.', choicesEn: ['He\'s free tomorrow.', 'He\'s busy tomorrow but free the day after.', 'He refuses to come.', 'He doesn\'t know yet.'] }
    )
  ]
};

// ============================================================================
//  B1.2 — Intermédiaire consolidé (HSK 3 fin + HSK 4 début)
// ============================================================================
const b12: LevelBilan = {
  level: 'b1.2',
  titleFr: 'Bilan B1.2 — Articuler les idées',
  titleEn: 'B1.2 Level Check — Connecting Ideas',
  descriptionFr:
    'Teste les connecteurs logiques (虽然...但是, 如果...就, 因为...所以), le passif 被, la causation 让/叫, les compléments directionnels.',
  descriptionEn:
    'Tests logical connectors, 被 passive, 让/叫 causatives, directional complements.',
  emoji: '🌼',
  passingScore: BILAN_DEFAULT_PASSING,
  xpReward: BILAN_XP_REWARD,
  questions: [
    q(
      'b12-q1',
      'fill',
      'Complète la phrase ci-dessous avec la paire de connecteurs adéquate.',
      ['因为 / 所以', '虽然 / 但是', '如果 / 就', '不但 / 而且'],
      1,
      'La paire 虽然...但是 = « bien que... cependant » marque une concession. Les autres paires expriment cause/conséquence, condition, ou addition.',
      { contextFr: '___ 天气很冷，___ 我们还是去跑步了。', topic: 'grammar', promptEn: 'Fill in the sentence below with the right connector pair.', contextEn: '___ 天气很冷，___ 我们还是去跑步了。', explanationEn: 'The pair 虽然...但是 = "although... nevertheless" marks a concession. The other pairs express cause/effect, condition, or addition.', choicesEn: ['因为 / 所以', '虽然 / 但是', '如果 / 就', '不但 / 而且'] }
    ),
    q(
      'b12-q2',
      'mcq',
      'Quelle phrase utilise correctement le passif 被 ?',
      [
        '我被他看见了',
        '他被写完作业了',
        '书被了他',
        '我被去了'
      ],
      0,
      'Structure du passif : PATIENT + 被 + AGENT + VERBE + COMPLÉMENT. 我被他看见了 = « j\'ai été vu par lui ». 被 introduit l\'agent, pas le patient.',
      { topic: 'grammar', promptEn: 'Which sentence uses the passive 被 correctly?', explanationEn: 'Passive structure: PATIENT + 被 + AGENT + VERB + COMPLEMENT. 我被他看见了 = "I was seen by him". 被 introduces the agent, not the patient.' }
    ),
    q(
      'b12-q3',
      'mcq',
      'Que signifie 让 dans « 妈妈让我做作业 » ?',
      [
        'Permettre',
        'Demander / faire faire',
        'Laisser tomber',
        'Céder la place'
      ],
      1,
      '让 + qqn + VERBE = « faire en sorte que qqn fasse... » (causation douce). 妈妈让我做作业 = « maman me fait faire mes devoirs ». 叫 + qqn a un sens similaire plus ferme.',
      { topic: 'grammar', promptEn: 'What does 让 mean in "妈妈让我做作业"?', explanationEn: '让 + someone + VERB = "to make/have someone do..." (soft causation). 妈妈让我做作业 = "mom has me do my homework". 叫 + someone has a similar but firmer sense.', choicesEn: ['To allow', 'To have someone do / to make someone do', 'To let go', 'To yield the way'] }
    ),
    q(
      'b12-q4',
      'fill',
      'Complète la phrase ci-dessous (« il est entré dans la salle, vers le locuteur »).',
      ['进 / 来', '上 / 去', '出 / 来', '下 / 去'],
      0,
      'Complément directionnel composé : VERBE + 进 (entrer dans) + 来/去 (vers locuteur / loin de). 走进教室来 = « entrer dans la salle (vers moi) ».',
      { contextFr: '他走 ___ 教室 ___ 。', topic: 'grammar', promptEn: 'Fill in the sentence below ("he entered the classroom, toward the speaker").', contextEn: '他走 ___ 教室 ___ 。', explanationEn: 'Compound directional complement: VERB + 进 (to enter) + 来/去 (toward speaker / away from speaker). 走进教室来 = "to walk into the classroom (toward me)".', choicesEn: ['进 / 来', '上 / 去', '出 / 来', '下 / 去'] }
    ),
    q(
      'b12-q5',
      'mcq',
      'Comment exprimer « de plus en plus difficile » ?',
      ['很难很难', '难死了', '越来越难', '更难更难'],
      2,
      '越来越 + ADJ/V = « de plus en plus ». 越来越难 = de plus en plus difficile. C\'est une structure figée très fréquente.',
      { topic: 'grammar', promptEn: 'How do you express "more and more difficult"?', explanationEn: '越来越 + ADJ/V = "more and more". 越来越难 = more and more difficult. This is a very common fixed structure.' }
    ),
    q(
      'b12-q6',
      'fill',
      'Complète la phrase ci-dessous (« si tu as le temps, appelle-moi »).',
      ['因为 / 所以', '如果 / 就', '虽然 / 但是', '一边 / 一边'],
      1,
      '如果...就... = conditionnelle « si... alors... ». 如果你有时间，就给我打电话 = « si tu as le temps, appelle-moi ». 就 est optionnel mais très courant.',
      { contextFr: '___ 你有时间，___ 给我打电话。', topic: 'grammar', promptEn: 'Fill in the sentence below ("if you have time, call me").', contextEn: '___ 你有时间，___ 给我打电话。', explanationEn: '如果...就... = the conditional "if... then...". 如果你有时间，就给我打电话 = "if you have time, call me". 就 is optional but very common.', choicesEn: ['因为 / 所以', '如果 / 就', '虽然 / 但是', '一边 / 一边'] }
    ),
    q(
      'b12-q7',
      'mcq',
      'Que signifie « 即使下雨，我们也要去 » ?',
      [
        'S\'il pleut, nous irons.',
        'Même s\'il pleut, nous irons.',
        'Parce qu\'il pleut, nous irons.',
        'Quand il pleuvra, nous irons.'
      ],
      1,
      '即使...也... = « même si... quand même... ». C\'est une concession hypothétique plus forte que 如果...就.',
      { topic: 'grammar', promptEn: 'What does "即使下雨，我们也要去" mean?', explanationEn: '即使...也... = "even if... still...". A stronger hypothetical concession than 如果...就.', choicesEn: ['If it rains, we\'ll go.', 'Even if it rains, we\'ll go.', 'Because it\'s raining, we\'ll go.', 'When it rains, we\'ll go.'] }
    ),
    q(
      'b12-q8',
      'mcq',
      'Quelle est la différence entre 能, 会 et 可以 ?',
      [
        'Aucune, ils sont interchangeables.',
        '会 = savoir par apprentissage, 能 = capacité physique/possibilité, 可以 = permission / proposition.',
        '会 = permission, 能 = savoir, 可以 = capacité.',
        'Tous signifient « vouloir ».'
      ],
      1,
      'Distinction clé : 会 (compétence apprise — 我会说汉语), 能 (capacité contextuelle ou possibilité — 我今天能来), 可以 (permission ou proposition — 我可以进来吗?).',
      { topic: 'grammar', promptEn: 'What is the difference between 能, 会 and 可以?', explanationEn: 'Key distinction: 会 (learned skill — 我会说汉语), 能 (contextual capacity or possibility — 我今天能来), 可以 (permission or suggestion — 我可以进来吗?).', choicesEn: ['None, they\'re interchangeable.', '会 = learned skill, 能 = physical capacity / possibility, 可以 = permission / suggestion.', '会 = permission, 能 = knowing, 可以 = capacity.', 'They all mean "to want".'] }
    ),
    q(
      'b12-q9',
      'mcq',
      'Que veut dire le chengyu 马马虎虎 ?',
      ['Très bien', 'Comme-ci, comme-ça', 'Très rapide', 'Très stupide'],
      1,
      '马马虎虎 (mǎmǎhūhū) signifie littéralement « cheval cheval tigre tigre » et s\'emploie pour dire « bof », « passable », « ni bien ni mal ». Très courant à l\'oral.',
      { topic: 'culture', promptEn: 'What does the chengyu 马马虎虎 mean?', explanationEn: '马马虎虎 (mǎmǎhūhū) literally means "horse horse tiger tiger" and is used to say "so-so", "passable", "neither good nor bad". Very common in speech.', choicesEn: ['Very good', 'So-so', 'Very fast', 'Very stupid'] }
    ),
    q(
      'b12-q10',
      'mcq',
      'Dans le dialogue ci-dessous, que fait B en ce moment ?',
      [
        'Il a fini ses devoirs.',
        'Il est en train de faire ses devoirs.',
        'Il n\'a pas commencé ses devoirs.',
        'Il refuse de faire ses devoirs.'
      ],
      1,
      '还没...呢 = « pas encore... ». 正在 + V = « en train de V ». Donc B n\'a pas fini mais est en train de faire ses devoirs.',
      { topic: 'dialogue', contextFr: 'A: 你做完作业了吗？\nB: 还没呢，我正在做。', promptEn: 'In the dialogue below, what is B doing right now?', contextEn: 'A: 你做完作业了吗？\nB: 还没呢，我正在做。', explanationEn: '还没...呢 = "not yet...". 正在 + V = "in the middle of V-ing". So B hasn\'t finished but is currently doing homework.', choicesEn: ['He has finished his homework.', 'He is doing his homework right now.', 'He hasn\'t started his homework.', 'He refuses to do his homework.'] }
    ),
    q(
      'b12-q11',
      'mcq',
      'Que signifie « 把...当作... » ?',
      [
        'Mettre... contre...',
        'Considérer... comme...',
        'Échanger... avec...',
        'Choisir entre... et...'
      ],
      1,
      '把 X 当作 Y = « considérer X comme Y / prendre X pour Y ». 他把我当作朋友 = « il me considère comme un ami ». Très utile pour exprimer une relation perçue.',
      { topic: 'grammar', promptEn: 'What does "把...当作..." mean?', explanationEn: '把 X 当作 Y = "to consider X as Y / to take X for Y". 他把我当作朋友 = "he considers me a friend". Very useful for expressing a perceived relationship.', choicesEn: ['To put... against...', 'To consider... as...', 'To exchange... with...', 'To choose between... and...'] }
    ),
    q(
      'b12-q12',
      'fill',
      'Complète la phrase ci-dessous (« plus tu apprends, plus tu progresses »).',
      ['越 / 越', '更 / 更', '比 / 比', '又 / 又'],
      0,
      '越 + V1，越 + V2 = « plus on V1, plus on V2 ». 你越学，越进步 = « plus tu apprends, plus tu progresses ». Structure de gradation parallèle.',
      { contextFr: '你 ___ 学，___ 进步。', topic: 'grammar', promptEn: 'Fill in the sentence below ("the more you learn, the more you progress").', contextEn: '你 ___ 学，___ 进步。', explanationEn: '越 + V1，越 + V2 = "the more one V1s, the more one V2s". 你越学，越进步 = "the more you learn, the more you progress". Parallel gradation structure.', choicesEn: ['越 / 越', '更 / 更', '比 / 比', '又 / 又'] }
    ),
    q(
      'b12-q13',
      'mcq',
      'Que veut dire le chengyu 半途而废 ?',
      [
        'Abandonner à mi-chemin.',
        'Réussir à mi-temps.',
        'Voyager dans deux directions.',
        'Diviser en deux parts égales.'
      ],
      0,
      '半途而废 (bàn tú ér fèi) : « à mi-route, on abandonne ». Critique de ceux qui laissent tomber avant la fin. Origine : Liji.',
      { topic: 'culture', promptEn: 'What does the chengyu 半途而废 mean?', explanationEn: '半途而废 (bàn tú ér fèi): "halfway along, one gives up". A critique of those who quit before the end. Origin: Liji.', choicesEn: ['To give up halfway.', 'To succeed part-time.', 'To travel in two directions.', 'To split into two equal parts.'] }
    ),
    q(
      'b12-q14',
      'mcq',
      'Quel mot signifie « bien que / même si » au registre familier ?',
      ['尽管', '哪怕', '虽说', '即便'],
      2,
      '虽说 = registre oral familier de 虽然. 尽管 = bien que (un peu plus soutenu), 即便/哪怕 = même si (concessif fort). À l\'oral, 虽说 sonne plus naturel.',
      { topic: 'vocab', promptEn: 'Which word means "although / even though" in a colloquial register?', explanationEn: '虚说 = oral, colloquial register of 虽然. 尽管 = although (a bit more formal), 即便/哪怕 = even if (strong concession). In speech, 虚说 sounds more natural.' }
    ),
    q(
      'b12-q15',
      'fill',
      'Complète la phrase ci-dessous (« le travail est trop fatigant, je ne veux plus le faire »).',
      ['得 / 不', '了 / 没', '过 / 不', '着 / 没'],
      0,
      'V + 得 + 太 + ADJ + 了 = complément de degré. Puis 不想 + V = ne veut plus faire. 工作累得不想做了 marque la conséquence d\'un état excessif.',
      { contextFr: '工作累 ___ 我 ___ 想做了。', topic: 'grammar', promptEn: 'Fill in the sentence below ("the work is too tiring, I don\'t want to do it anymore").', contextEn: '工作累 ___ 我 ___ 想做了。', explanationEn: 'V + 得 + 太 + ADJ + 了 = degree complement. Then 不想 + V = doesn\'t want to anymore. 工作累得不想做了 marks the consequence of an excessive state.', choicesEn: ['得 / 不', '了 / 没', '过 / 不', '着 / 没'] }
    ),
    q(
      'b12-q16',
      'mcq',
      'Comment exprimer « plus on est nombreux, plus c\'est joyeux » ?',
      [
        '人越多越热闹',
        '人多越热闹越',
        '越人多越热闹',
        '人越热闹越多'
      ],
      0,
      'Structure 越... 越... avec sujet : SUJET + 越 + ADJ1，越 + ADJ2. 人越多越热闹 = « plus il y a de monde, plus c\'est animé ». Proverbe quotidien.',
      { topic: 'grammar', promptEn: 'How do you express "the more people, the livelier"?', explanationEn: '越... 越... structure with a subject: SUBJECT + 越 + ADJ1，越 + ADJ2. 人越多越热闹 = "the more people there are, the livelier it gets". A everyday saying.' }
    ),
    q(
      'b12-q17',
      'mcq',
      'Que signifie 不见得 ?',
      ['Invisible', 'Pas forcément / pas si sûr', 'Jamais vu', 'Très évident'],
      1,
      '不见得 = « pas forcément, ce n\'est pas dit que ». Adoucisseur très utilisé pour exprimer le doute. 他不见得会来 = « il ne viendra pas forcément ».',
      { topic: 'vocab', promptEn: 'What does 不见得 mean?', explanationEn: '不见得 = "not necessarily, it\'s not certain that". A very common hedge to express doubt. 他不见得会来 = "he won\'t necessarily come".', choicesEn: ['Invisible', 'Not necessarily / not so sure', 'Never seen', 'Very obvious'] }
    ),
    q(
      'b12-q18',
      'mcq',
      'Dans le dialogue ci-dessous, que dit B ?',
      [
        'Elle n\'a pas trouvé son téléphone.',
        'Quelqu\'un lui a volé son téléphone.',
        'Elle a cassé son téléphone.',
        'Elle a oublié son téléphone à la maison.'
      ],
      1,
      'Passif avec 被 : 手机被偷了 = « le téléphone a été volé ». Structure typique pour exprimer un événement subi. 怎么了 = qu\'est-ce qui se passe ?',
      { topic: 'dialogue', contextFr: 'A: 你怎么了？\nB: 我的手机被偷了！', promptEn: 'In the dialogue below, what does B say?', contextEn: 'A: 你怎么了？\nB: 我的手机被偷了！', explanationEn: 'Passive with 被: 手机被偷了 = "the phone was stolen". Typical structure for expressing an event undergone. 怎么了 = what\'s going on?', choicesEn: ['She couldn\'t find her phone.', 'Her phone was stolen.', 'She broke her phone.', 'She forgot her phone at home.'] }
    )
  ]
};

// ============================================================================
//  B2.1 — Avancé seuil (HSK 4 consolidé)
// ============================================================================
const b21: LevelBilan = {
  level: 'b2.1',
  titleFr: 'Bilan B2.1 — Nuances et registres',
  titleEn: 'B2.1 Level Check — Nuance and Register',
  descriptionFr:
    "Évalue les nuances : 连...都/也, 不但...而且, 除了...以外, la distinction 得/的/地, et un vocabulaire plus abstrait.",
  descriptionEn:
    'Tests nuances: 连...都/也, 不但...而且, 除了...以外, the 得/的/地 distinction, and more abstract vocabulary.',
  emoji: '🌳',
  passingScore: BILAN_DEFAULT_PASSING,
  xpReward: BILAN_XP_REWARD,
  questions: [
    q(
      'b21-q1',
      'fill',
      'Complète la phrase ci-dessous (« il court vite »).',
      ['的', '得', '地', '了'],
      1,
      '得 introduit un complément de degré / manière APRÈS le verbe : 跑得快 = « court vite ». 的 = possessif, 地 = transforme adjectif en adverbe avant le verbe.',
      { contextFr: '他跑 ___ 很快。', topic: 'grammar', promptEn: 'Fill in the sentence below ("he runs fast").', contextEn: '他跑 ___ 很快。', explanationEn: '得 introduces a degree / manner complement AFTER the verb: 跑得快 = "runs fast". 的 = possessive, 地 = turns an adjective into an adverb before the verb.' }
    ),
    q(
      'b21-q2',
      'mcq',
      'Que signifie « 连小孩都知道 » ?',
      [
        'Les enfants savent ensemble.',
        'Même les enfants le savent.',
        'Reliez les enfants qui savent.',
        'Seuls les enfants savent.'
      ],
      1,
      '连 + N + 都/也 = « même... » (inclusion extrême). 连小孩都知道 = « même les enfants le savent » — emphase sur l\'évidence.',
      { topic: 'grammar', promptEn: 'What does "连小孩都知道" mean?', explanationEn: '连 + N + 都/也 = "even..." (extreme inclusion). 连小孩都知道 = "even children know it" — emphasis on how obvious it is.', choicesEn: ['Children know together.', 'Even children know it.', 'Link the children who know.', 'Only children know.'] }
    ),
    q(
      'b21-q3',
      'fill',
      'Complète la phrase ci-dessous (« non seulement il parle chinois, mais il parle aussi japonais »).',
      ['不但 / 而且', '虽然 / 但是', '因为 / 所以', '如果 / 就'],
      0,
      '不但...而且... = « non seulement... mais aussi... ». 不但他会说中文，而且（他）还会说日文 = il parle non seulement chinois mais aussi japonais.',
      { contextFr: '___ 他会说中文，___ 会说日文。', topic: 'grammar', promptEn: 'Fill in the sentence below ("not only does he speak Chinese, he also speaks Japanese").', contextEn: '___ 他会说中文，___ 会说日文。', explanationEn: '不但...而且... = "not only... but also...". 不但他会说中文，而且（他）还会说日文 = he speaks not only Chinese but also Japanese.', choicesEn: ['不但 / 而且', '虽然 / 但是', '因为 / 所以', '如果 / 就'] }
    ),
    q(
      'b21-q4',
      'mcq',
      'Quelle phrase utilise correctement 除了...以外 ?',
      [
        '除了他以外，别人都来了。',
        '除了他以外，别人来都了。',
        '他除了以外，别人来了。',
        '除了以外他，别人都来了。'
      ],
      0,
      '除了 + NOM + 以外，主语 + 都/也... = « sauf / hormis + NOM, les autres... ». 除了他以外，别人都来了 = « sauf lui, les autres sont tous venus ».',
      { topic: 'grammar', promptEn: 'Which sentence uses 除了...以外 correctly?', explanationEn: '除了 + NOUN + 以外，subject + 都/也... = "except / apart from + NOUN, the others...". 除了他以外，别人都来了 = "apart from him, the others all came".' }
    ),
    q(
      'b21-q5',
      'mcq',
      'Que veut dire « 他不是中国人，而是韩国人 » ?',
      [
        'Il est chinois mais aussi coréen.',
        'Il n\'est pas chinois, mais coréen.',
        'Il est soit chinois, soit coréen.',
        'Il n\'est ni chinois ni coréen.'
      ],
      1,
      '不是...而是... = « ce n\'est pas... mais... » (correction / précision). C\'est une structure contrastive très courante en expression écrite.',
      { topic: 'grammar', promptEn: 'What does "他不是中国人，而是韩国人" mean?', explanationEn: '不是...而是... = "it\'s not... but rather..." (correction / precision). Very common contrastive structure, especially in writing.', choicesEn: ['He is Chinese but also Korean.', 'He is not Chinese, but Korean.', 'He is either Chinese or Korean.', 'He is neither Chinese nor Korean.'] }
    ),
    q(
      'b21-q6',
      'mcq',
      'Quel terme correspond le mieux à « économie » ?',
      ['经济', '政治', '文化', '科学'],
      0,
      '经济 = économie. 政治 = politique, 文化 = culture, 科学 = science. Vocabulaire abstrait standard HSK 4.',
      { topic: 'vocab', promptEn: 'Which term best matches "economy"?', explanationEn: '经济 = economy. 政治 = politics, 文化 = culture, 科学 = science. Standard HSK 4 abstract vocabulary.' }
    ),
    q(
      'b21-q7',
      'fill',
      'Complète la phrase ci-dessous (« elle parle très poliment »).',
      ['得很', '的很', '地很', '了很'],
      0,
      '得 + ADJ + 很 (ou 得很 en fin) = complément de degré. 她说话说得很礼貌 = « elle parle très poliment ». 很 suit l\'adjectif porté par 得.',
      { contextFr: '她说话 ___ 礼貌。', topic: 'grammar', promptEn: 'Fill in the sentence below ("she speaks very politely").', contextEn: '她说话 ___ 礼貌。', explanationEn: '得 + ADJ + 很 (or 得很 at the end) = degree complement. 她说话说得很礼貌 = "she speaks very politely". 很 follows the adjective carried by 得.', choicesEn: ['得很', '的很', '地很', '了很'] }
    ),
    q(
      'b21-q8',
      'mcq',
      'Que signifie 幸亏 dans « 幸亏你提醒我 » ?',
      ['Hélas', 'Heureusement', 'Évidemment', 'Malheureusement'],
      1,
      '幸亏 = heureusement (que) — introduit un événement positif qui a évité un malheur. 幸亏你提醒我 = « heureusement que tu m\'as prévenu ».',
      { topic: 'vocab', promptEn: 'What does 幸亏 mean in "幸亏你提醒我"?', explanationEn: '幸亏 = fortunately (that) — introduces a positive event that averted misfortune. 幸亏你提醒我 = "luckily you reminded me".', choicesEn: ['Alas', 'Fortunately', 'Obviously', 'Unfortunately'] }
    ),
    q(
      'b21-q9',
      'mcq',
      'Comment rendre l\'idée de « partout / où qu\'il aille » ?',
      [
        '无论他去哪儿，都带着相机',
        '他去哪儿无论都相机',
        '他都去无论哪儿相机',
        '无论都他去哪儿带相机'
      ],
      0,
      '无论...都... = « quel que soit... » (universalité). 无论 X 都 Y = « peu importe X, Y ». 无论他去哪儿，都带着相机 = « où qu\'il aille, il emporte son appareil ».',
      { topic: 'grammar', promptEn: 'How do you convey the idea of "everywhere / wherever he goes"?', explanationEn: '无论...都... = "no matter what..." (universality). 无论 X 都 Y = "regardless of X, Y". 无论他去哪儿，都带着相机 = "wherever he goes, he takes his camera".' }
    ),
    q(
      'b21-q10',
      'mcq',
      'Dans le dialogue ci-dessous, B exprime :',
      [
        'Une certitude absolue',
        'Une hésitation prudente',
        'Un refus catégorique',
        'De l\'enthousiasme'
      ],
      1,
      '似乎 = « il semble que / on dirait que » — nuance de prudence, d\'hésitation. Combiné avec 有点儿 (un peu) et 觉得 (trouver / penser), B donne un avis prudent et nuancé.',
      { topic: 'dialogue', contextFr: 'A: 你怎么看这件事？\nB: 我觉得似乎有点儿问题。', promptEn: 'In the dialogue below, B expresses:', contextEn: 'A: 你怎么看这件事？\nB: 我觉得似乎有点儿问题。', explanationEn: '似乎 = "it seems that / one would say that" — a cautious, hedging nuance. Combined with 有点儿 (a bit) and 觉得 (to feel / think), B gives a careful, nuanced opinion.', choicesEn: ['Absolute certainty', 'Cautious hesitation', 'A flat refusal', 'Enthusiasm'] }
    ),
    q(
      'b21-q11',
      'mcq',
      'Que signifie 既然 dans « 既然你来了，就坐一会儿吧 » ?',
      [
        'Puisque (cause connue)',
        'Si jamais',
        'Bien que',
        'Au cas où'
      ],
      0,
      '既然...就... = « puisque... alors... ». Introduit une cause considérée comme acquise. Distinct de 因为 (cause objective) : 既然 présuppose la situation comme un fait partagé.',
      { topic: 'grammar', promptEn: 'What does 既然 mean in "既然你来了，就坐一会儿吧"?', explanationEn: '既然...就... = "since... then...". Introduces a cause taken as given. Different from 因为 (objective cause): 既然 presupposes the situation as a shared fact.', choicesEn: ['Since (known cause)', 'Should ever', 'Although', 'In case'] }
    ),
    q(
      'b21-q12',
      'mcq',
      'Que signifie 一旦 dans « 一旦决定，就不要后悔 » ?',
      [
        'Un matin',
        'Une fois que / dès que',
        'Tout à coup',
        'Lentement'
      ],
      1,
      '一旦 = « une fois que / dès lors que ». Hypothèse à conséquence forte. 一旦决定就不要后悔 = « une fois la décision prise, pas de regrets ».',
      { topic: 'grammar', promptEn: 'What does 一旦 mean in "一旦决定，就不要后悔"?', explanationEn: '一旦 = "once / as soon as". A hypothesis with strong consequences. 一旦决定就不要后悔 = "once the decision is made, no regrets".', choicesEn: ['One morning', 'Once / as soon as', 'Suddenly', 'Slowly'] }
    ),
    q(
      'b21-q13',
      'mcq',
      'Quel terme signifie « environnement (naturel) » ?',
      ['环境', '场所', '位置', '范围'],
      0,
      '环境 = environnement, milieu. 场所 = lieu (public), 位置 = position, 范围 = portée. 保护环境 = protéger l\'environnement.',
      { topic: 'vocab', promptEn: 'Which word means "(natural) environment"?', explanationEn: '环境 = environment, surroundings. 场所 = venue (public), 位置 = position, 范围 = scope. 保护环境 = protect the environment.' }
    ),
    q(
      'b21-q14',
      'fill',
      'Complète la phrase ci-dessous (« j\'attends depuis 2 heures, il n\'est toujours pas venu »).',
      ['了 / 还', '过 / 也', '着 / 也', '了 / 都'],
      0,
      'Structure de durée + 还/还没 : 我等了两个小时，他还没来 = « j\'attends depuis 2h, il n\'est toujours pas venu ». 还 marque la persistance / continuation.',
      { contextFr: '我等 ___ 两个小时，他 ___ 没来。', topic: 'grammar', promptEn: 'Fill in the sentence below ("I\'ve been waiting 2 hours, he still hasn\'t come").', contextEn: '我等 ___ 两个小时，他 ___ 没来。', explanationEn: 'Duration + 还/还没 structure: 我等了两个小时，他还没来 = "I\'ve waited 2 hours, he still hasn\'t come". 还 marks persistence / continuation.', choicesEn: ['了 / 还', '过 / 也', '着 / 也', '了 / 都'] }
    ),
    q(
      'b21-q15',
      'mcq',
      'Que veut dire le chengyu 名副其实 ?',
      [
        'Le nom correspond à la réalité (mérité).',
        'Avoir mauvaise réputation.',
        'Changer de nom.',
        'Sans nom officiel.'
      ],
      0,
      '名副其实 (míng fù qí shí) = « le nom répond à la réalité ». Désigne quelqu\'un ou quelque chose qui mérite réellement sa réputation. Contraire : 名不副实.',
      { topic: 'culture', promptEn: 'What does the chengyu 名副其实 mean?', explanationEn: '名副其实 (míng fù qí shí) = "the name matches the reality". Refers to someone or something that truly deserves its reputation. Opposite: 名不副实.', choicesEn: ['The name matches the reality (deserved).', 'To have a bad reputation.', 'To change one\'s name.', 'With no official name.'] }
    ),
    q(
      'b21-q16',
      'mcq',
      'Quelle est la nuance de 反而 par rapport à 但是 ?',
      [
        'Identique, interchangeable.',
        '反而 = contraire à l\'attente, 但是 = simple opposition.',
        '反而 = renforcement, 但是 = contradiction.',
        '反而 = cause, 但是 = conséquence.'
      ],
      1,
      '但是 marque une simple opposition. 反而 marque un résultat CONTRAIRE à ce qui était attendu. 我以为他生气，他反而笑了 = « je pensais qu\'il se fâcherait, au contraire il a ri ».',
      { topic: 'grammar', promptEn: 'What is the nuance of 反而 compared to 但是?', explanationEn: '但是 marks a simple opposition. 反而 marks a result CONTRARY to what was expected. 我以为他生气，他反而笑了 = "I thought he\'d be angry, but instead he laughed".', choicesEn: ['Identical, interchangeable.', '反而 = contrary to expectation, 但是 = simple opposition.', '反而 = reinforcement, 但是 = contradiction.', '反而 = cause, 但是 = consequence.'] }
    )
  ]
};

// ============================================================================
//  B2.2 — Avancé consolidé (HSK 4 maîtrise)
// ============================================================================
const b22: LevelBilan = {
  level: 'b2.2',
  titleFr: 'Bilan B2.2 — Fluidité et structures complexes',
  titleEn: 'B2.2 Level Check — Fluency and Complex Structures',
  descriptionFr:
    "Pousse l'expression : interactions 把 + 被, topique-commentaire, 万一 / 宁可, chengyu de la vie active, vocabulaire média et débat.",
  descriptionEn:
    'Pushes expression: 把 + 被 interactions, topic-comment inversion, 万一 / 宁可, active-life chengyu, media & debate vocabulary.',
  emoji: '🎋',
  passingScore: BILAN_DEFAULT_PASSING,
  xpReward: BILAN_XP_REWARD,
  questions: [
    q(
      'b22-q1',
      'mcq',
      'Que signifie « 这件事万一出问题，我们就麻烦了 » ?',
      [
        'Si jamais cette affaire pose problème, on aura des soucis.',
        '10 000 de ces affaires posent problème.',
        'Cette affaire pose toujours problème.',
        'Ce problème est très grave.'
      ],
      0,
      '万一 = « si jamais / au cas où » — condition hypothétique peu probable mais redoutée. 麻烦 = ennui, souci.',
      { topic: 'grammar', promptEn: 'What does "这件事万一出问题，我们就麻烦了" mean?', explanationEn: '万一 = "if by any chance / in case" — an unlikely but dreaded hypothesis. 麻烦 = trouble, hassle.', choicesEn: ['If this matter happens to go wrong, we\'ll be in trouble.', '10,000 of these matters go wrong.', 'This matter is always a problem.', 'This problem is very serious.'] }
    ),
    q(
      'b22-q2',
      'mcq',
      'Choisissez la meilleure traduction de « 宁可多花点儿钱，也要买好的 ».',
      [
        'Dépenser plus d\'argent et acheter des bonnes choses.',
        'Je préfère dépenser plus, mais acheter de la qualité.',
        'Si on dépense plus, on achète mieux.',
        'Ne pas dépenser d\'argent mais acheter bien.'
      ],
      1,
      '宁可 A 也要 B = « préférer A pour obtenir B » (choix assumé malgré un coût). Implique une préférence forte et volontaire.',
      { topic: 'grammar', promptEn: 'Choose the best translation for "宁可多花点儿钱，也要买好的".', explanationEn: '宁可 A 也要 B = "to prefer A in order to get B" (an accepted trade-off). Implies a strong, deliberate preference.', choicesEn: ['Spending more money and buying good things.', 'I\'d rather spend more, but buy quality.', 'If you spend more, you buy better.', 'Don\'t spend money but buy good things.'] }
    ),
    q(
      'b22-q3',
      'fill',
      'Complète la phrase ci-dessous avec la particule de mise en relief.',
      ['是', '被', '把', '给'],
      0,
      'Ici 是...的 met en relief le complément (qui a offert). 是妈妈送给我的 = « c\'est maman qui me l\'a offert ». 被 serait incorrect sémantiquement dans ce cadre relationnel.',
      { contextFr: '这本书 ___ 妈妈送给我的，特别珍贵。', topic: 'grammar', promptEn: 'Fill in the sentence below with the emphasis particle.', contextEn: '这本书 ___ 妈妈送给我的，特别珍贵。', explanationEn: 'Here 是...的 emphasizes the complement (who gave it). 是妈妈送给我的 = "it\'s mom who gave it to me". 被 would be semantically wrong in this relational context.', choicesEn: ['是', '被', '把', '给'] }
    ),
    q(
      'b22-q4',
      'mcq',
      'Quel est le sens du chengyu 一举两得 ?',
      [
        'Faire d\'une pierre deux coups',
        'Échouer deux fois',
        'Payer deux fois',
        'Deux personnes main dans la main'
      ],
      0,
      '一举两得 (yī jǔ liǎng dé) = « en un geste, deux gains » = faire d\'une pierre deux coups. Chengyu très fréquent.',
      { topic: 'culture', promptEn: 'What is the meaning of the chengyu 一举两得?', explanationEn: '一举两得 (yī jǔ liǎng dé) = "one action, two gains" = killing two birds with one stone. A very common chengyu.', choicesEn: ['Killing two birds with one stone', 'Failing twice', 'Paying twice', 'Two people hand in hand'] }
    ),
    q(
      'b22-q5',
      'mcq',
      'Que signifie « 记者 » ?',
      ['Professeur', 'Journaliste', 'Étudiant', 'Fonctionnaire'],
      1,
      '记者 = journaliste / reporter. Vocabulaire média de base. 记 (enregistrer, noter) + 者 (suffixe « celui qui »).',
      { topic: 'vocab', promptEn: 'What does "记者" mean?', explanationEn: '记者 = journalist / reporter. Basic media vocabulary. 记 (to record, to note) + 者 (suffix "one who").', choicesEn: ['Teacher', 'Journalist', 'Student', 'Civil servant'] }
    ),
    q(
      'b22-q6',
      'fill',
      'Complète la phrase ci-dessous avec le marqueur d\'état persistant.',
      ['了', '的', '着', '过'],
      2,
      '着 marque un état persistant résultant d\'une action. 挂着 / 放着 / 留着. 他把钥匙留着在门上 est moins courant ; mieux : 钥匙还挂着 « la clé est toujours accrochée ». 着 est le marqueur d\'état résiduel.',
      { contextFr: '他把钥匙 ___ 在门上。', topic: 'grammar', promptEn: 'Fill in the sentence below with the persistent-state marker.', contextEn: '他把钥匙 ___ 在门上。', explanationEn: '着 marks a persistent state resulting from an action. 挂着 / 放着 / 留着. 他把钥匙留着在门上 is less common; better: 钥匙还挂着 "the key is still hanging". 着 is the residual-state marker.', choicesEn: ['了', '的', '着', '过'] }
    ),
    q(
      'b22-q7',
      'mcq',
      'Que veut dire « 好像 » ?',
      [
        'Bien ressembler',
        'Sembler / on dirait que',
        'Tout à fait comme',
        'Réellement'
      ],
      1,
      '好像 = « on dirait que / sembler » — adoucisseur prudentiel très courant. 他好像累了 = « on dirait qu\'il est fatigué ».',
      { topic: 'vocab', promptEn: 'What does "好像" mean?', explanationEn: '好像 = "it seems / one would say" — a very common hedging softener. 他好像累了 = "he seems tired".', choicesEn: ['To resemble well', 'To seem / it seems that', 'Exactly like', 'Truly'] }
    ),
    q(
      'b22-q8',
      'mcq',
      'Quelle nuance porte 反而 dans « 我以为他会生气，他反而笑了 » ?',
      [
        'Cause',
        'Contrairement aux attentes',
        'Conséquence',
        'Addition'
      ],
      1,
      '反而 = « au contraire / à l\'inverse de ce qu\'on attendait ». Exprime un résultat contraire aux attentes : « je pensais qu\'il se fâcherait, au contraire il a ri ».',
      { topic: 'grammar', promptEn: 'What nuance does 反而 carry in "我以为他会生气，他反而笑了"?', explanationEn: '反而 = "on the contrary / against expectation". Expresses a result contrary to what was expected: "I thought he\'d be angry, but instead he laughed".', choicesEn: ['Cause', 'Against expectation', 'Consequence', 'Addition'] }
    ),
    q(
      'b22-q9',
      'mcq',
      'Comment exprimer « quel que soit ce qu\'il fasse, il réussit » ?',
      [
        '他做什么成功都',
        '无论他做什么，都能成功',
        '什么都他做能成功',
        '他做都无论成功什么'
      ],
      1,
      'Structure figée : 无论 + QUESTION (什么 / 怎么 / 谁...), 都 + RÉSULTAT. 无论他做什么，都能成功 = « peu importe ce qu\'il fait, il réussit ».',
      { topic: 'grammar', promptEn: 'How do you express "whatever he does, he succeeds"?', explanationEn: 'Fixed structure: 无论 + QUESTION (什么 / 怎么 / 谁...), 都 + RESULT. 无论他做什么，都能成功 = "no matter what he does, he succeeds".' }
    ),
    q(
      'b22-q10',
      'mcq',
      'Dans le dialogue ci-dessous, B pense :',
      [
        'Le projet a plus d\'inconvénients que d\'avantages.',
        'À long terme, les avantages l\'emportent sur les inconvénients.',
        'Les avantages et inconvénients s\'équilibrent.',
        'Le projet n\'a ni avantage ni inconvénient.'
      ],
      1,
      '从长远来看 = « vu à long terme / à long terme ». 利大于弊 = « bénéfices supérieurs aux pertes ». Formulation typique du registre argumentatif / médiatique.',
      { topic: 'dialogue', contextFr: 'A: 这个方案你觉得怎么样？\nB: 从长远来看，利大于弊。', promptEn: 'In the dialogue below, B thinks:', contextEn: 'A: 这个方案你觉得怎么样？\nB: 从长远来看，利大于弊。', explanationEn: '从长远来看 = "seen from a long-term view / in the long run". 利大于弊 = "benefits outweigh costs". A typical argumentative / media phrasing.', choicesEn: ['The project has more downsides than upsides.', 'In the long run, benefits outweigh drawbacks.', 'Pros and cons balance out.', 'The project has neither benefit nor drawback.'] }
    ),
    q(
      'b22-q11',
      'mcq',
      'Quel terme signifie « publier (un article, une nouvelle) » au sens éditorial ?',
      ['发表', '出现', '发生', '表现'],
      0,
      '发表 = publier (un article, un discours, une opinion). 出现 = apparaître, 发生 = se produire, 表现 = manifester / performance. Vocabulaire média.',
      { topic: 'vocab', promptEn: 'Which term means "to publish (an article, a piece of news)" in the editorial sense?', explanationEn: '发表 = to publish (an article, a speech, an opinion). 出现 = to appear, 发生 = to happen, 表现 = to display / performance. Media vocabulary.' }
    ),
    q(
      'b22-q12',
      'mcq',
      'Que signifie « 难免 » dans « 工作中难免出错 » ?',
      [
        'Impossible',
        'Inévitablement / on ne peut éviter que',
        'Sans difficulté',
        'Très évident'
      ],
      1,
      '难免 = « difficile à éviter / inévitablement ». Souligne qu\'un événement (souvent négatif) est statistiquement attendu. 工作中难免出错 = « au travail, on ne peut pas éviter de faire des erreurs ».',
      { topic: 'vocab', promptEn: 'What does "难免" mean in "工作中难免出错"?', explanationEn: '难免 = "hard to avoid / inevitably". Emphasizes that an event (often a negative one) is statistically to be expected. 工作中难免出错 = "at work, mistakes are bound to happen".', choicesEn: ['Impossible', 'Inevitably / unavoidably', 'Without difficulty', 'Very obvious'] }
    ),
    q(
      'b22-q13',
      'mcq',
      'Que veut dire le chengyu 入木三分 ?',
      [
        'Pénétrer profondément, perçant et incisif (analyse).',
        'Trois personnes entrent dans le bois.',
        'Sculpter pendant trois minutes.',
        'Diviser un arbre en trois.'
      ],
      0,
      '入木三分 (rù mù sān fēn) : « pénétrer trois fen dans le bois ». Origine : la calligraphie de Wang Xizhi laissait sa trace profondément. Désigne une analyse particulièrement perspicace.',
      { topic: 'culture', promptEn: 'What does the chengyu 入木三分 mean?', explanationEn: '入木三分 (rù mù sān fēn): "to penetrate three fen into the wood". Origin: Wang Xizhi\'s calligraphy left deep marks on the wood. Describes a particularly incisive analysis.', choicesEn: ['To penetrate deeply, incisive and sharp (analysis).', 'Three people enter the woods.', 'To sculpt for three minutes.', 'To split a tree into three.'] }
    ),
    q(
      'b22-q14',
      'fill',
      'Complète la phrase ci-dessous (« non seulement c\'est rapide, mais c\'est aussi pas cher »).',
      ['不仅 / 而且 / 还', '虽然 / 但是 / 又', '因为 / 所以 / 而', '既然 / 就 / 也'],
      0,
      'Structure tripartite renforcée : 不仅 X，而且 Y，还 Z. 不仅快，而且便宜，还方便 = « non seulement rapide, mais aussi pas cher, en plus pratique ». 不仅 = équivalent soutenu de 不但.',
      { contextFr: '___ 快，___ 便宜，___ 方便。', topic: 'grammar', promptEn: 'Fill in the sentence below ("not only is it fast, it\'s also cheap").', contextEn: '___ 快，___ 便宜，___ 方便。', explanationEn: 'Reinforced tripartite structure: 不仅 X，而且 Y，还 Z. 不仅快，而且便宜，还方便 = "not only fast, but also cheap, and convenient too". 不仅 = formal equivalent of 不但.', choicesEn: ['不仅 / 而且 / 还', '虽然 / 但是 / 又', '因为 / 所以 / 而', '既然 / 就 / 也'] }
    )
  ]
};

// ============================================================================
//  C1.1 — Autonome seuil (HSK 5 début)
// ============================================================================
const c11: LevelBilan = {
  level: 'c1.1',
  titleFr: 'Bilan C1.1 — Chengyu et abstraction',
  titleEn: 'C1.1 Level Check — Chengyu and Abstraction',
  descriptionFr:
    "Teste les chengyu d'usage, les connecteurs fins (尽管, 何况, 以免), et le vocabulaire abstrait (思想, 观念, 责任).",
  descriptionEn:
    'Tests common chengyu, fine connectors, and abstract vocabulary.',
  emoji: '🌲',
  passingScore: BILAN_DEFAULT_PASSING,
  xpReward: BILAN_XP_REWARD,
  questions: [
    q(
      'c11-q1',
      'mcq',
      'Que signifie le chengyu 画蛇添足 ?',
      [
        'Dessiner un serpent et ajouter des pattes — compliquer inutilement',
        'Peindre un serpent pour lui donner vie',
        'Observer un serpent marcher',
        'Serpent agile comme un pied'
      ],
      0,
      '画蛇添足 (huàshétiānzú) : « dessiner un serpent et lui ajouter des pattes » = rendre quelque chose moins bien en voulant l\'améliorer. Origine : fable du royaume de Chu.',
      { topic: 'culture', promptEn: 'What does the chengyu 画蛇添足 mean?', explanationEn: '画蛇添足 (huàshétiānzú): "to draw a snake and add feet to it" = to make something worse by overdoing it. Origin: a fable from the Kingdom of Chu.', choicesEn: ['Drawing a snake and adding feet — overdoing it uselessly', 'Painting a snake to give it life', 'Watching a snake walk', 'A snake as agile as a foot'] }
    ),
    q(
      'c11-q2',
      'fill',
      'Complète la phrase ci-dessous (« bien qu\'il pleuve, nous y allons quand même »).',
      ['尽管 / 还是', '虽然 / 但是', '如果 / 就', '万一 / 都'],
      0,
      '尽管...还是... = « bien que... malgré tout... ». Proche de 虽然...但是 mais registre légèrement plus élevé et plus insistant sur la persévérance.',
      { contextFr: '___ 下雨，我们 ___ 去爬山。', topic: 'grammar', promptEn: 'Fill in the sentence below ("although it\'s raining, we\'re going anyway").', contextEn: '___ 下雨，我们 ___ 去爬山。', explanationEn: '尽管...还是... = "even though... still...". Similar to 虽然...但是 but a slightly higher register, emphasizing persistence.', choicesEn: ['尽管 / 还是', '虽然 / 但是', '如果 / 就', '万一 / 都'] }
    ),
    q(
      'c11-q3',
      'mcq',
      'Que veut dire « 何况 » ?',
      [
        'Comment se porte-t-il ?',
        'À plus forte raison / sans parler de',
        'Comment et pourquoi',
        'Très peu'
      ],
      1,
      '何况 = « à plus forte raison / d\'autant plus que » — renforce un argument en ajoutant une raison plus forte. 他连一只狗都怕，何况是狮子？= « il a peur d\'un chien, alors d\'un lion ! ».',
      { topic: 'grammar', promptEn: 'What does "何况" mean?', explanationEn: '何况 = "let alone / all the more so" — strengthens an argument by adding a stronger reason. 他连一只狗都怕，何况是狮子？= "he\'s afraid of a dog, let alone a lion!".', choicesEn: ['How is he doing?', 'Let alone / all the more so', 'How and why', 'Very little'] }
    ),
    q(
      'c11-q4',
      'mcq',
      'Que signifie « 以免 » ?',
      [
        'Afin de',
        'Afin d\'éviter que',
        'Sauf si',
        'Grâce à'
      ],
      1,
      '以免 = « de peur que / pour éviter que ». 请保持安静，以免打扰别人 = « restez silencieux pour ne pas déranger ». Registre écrit.',
      { topic: 'grammar', promptEn: 'What does "以免" mean?', explanationEn: '以免 = "for fear that / in order to avoid". 请保持安静，以免打扰别人 = "please stay quiet so as not to disturb others". Written register.', choicesEn: ['In order to', 'In order to avoid', 'Unless', 'Thanks to'] }
    ),
    q(
      'c11-q5',
      'mcq',
      'Quel mot correspond à « concept » (au sens philosophique/idéologique) ?',
      ['观念', '观点', '意见', '主张'],
      0,
      '观念 = concept / notion (plus abstrait, souvent culturel ou moral). 观点 = point de vue, 意见 = avis (concret), 主张 = position défendue.',
      { topic: 'vocab', promptEn: 'Which word corresponds to "concept" (in a philosophical / ideological sense)?', explanationEn: '观念 = concept / notion (more abstract, often cultural or moral). 观点 = viewpoint, 意见 = opinion (concrete), 主张 = a position defended.' }
    ),
    q(
      'c11-q6',
      'mcq',
      'Que signifie 责任 ?',
      ['Responsabilité', 'Liberté', 'Justice', 'Droit'],
      0,
      '责任 = responsabilité. 自由 = liberté, 公正/正义 = justice, 权利 = droit. Vocabulaire abstrait de débat.',
      { topic: 'vocab', promptEn: 'What does 责任 mean?', explanationEn: '责任 = responsibility. 自由 = freedom, 公正/正义 = justice, 权利 = right. Abstract debate vocabulary.', choicesEn: ['Responsibility', 'Freedom', 'Justice', 'Right'] }
    ),
    q(
      'c11-q7',
      'mcq',
      'Comment rendre « rien que d\'y penser, j\'ai envie de rire » ?',
      [
        '我想笑一想',
        '一想就我笑',
        '我一想就想笑',
        '想笑一就我'
      ],
      2,
      '一 + V1 + 就 + V2 = « dès que V1, V2 ». 我一想就想笑 = « dès que j\'y pense, j\'ai envie de rire ». Structure figée pour relier action et conséquence immédiate.',
      { topic: 'grammar', promptEn: 'How do you convey "just thinking about it makes me want to laugh"?', explanationEn: '一 + V1 + 就 + V2 = "as soon as V1, V2". 我一想就想笑 = "as soon as I think about it, I want to laugh". A fixed structure linking action and immediate consequence.' }
    ),
    q(
      'c11-q8',
      'mcq',
      'Le chengyu 守株待兔 évoque :',
      [
        'La persévérance dans le travail',
        'Attendre passivement la chance (et rater les occasions)',
        'Protéger ses biens',
        'Être rapide comme un lièvre'
      ],
      1,
      '守株待兔 : « garder sa souche en attendant un lièvre ». Un paysan ayant vu un lièvre se tuer contre une souche abandonne son travail pour attendre d\'autres lièvres. = croire à une chance reproductible, être passif.',
      { topic: 'culture', promptEn: 'The chengyu 守株待兔 evokes:', explanationEn: '守株待兔: "guarding a stump waiting for a rabbit". A farmer who saw a rabbit kill itself against a stump abandoned his work to wait for more rabbits. = believing luck will repeat itself, being passive.', choicesEn: ['Perseverance at work', 'Waiting passively for luck (and missing opportunities)', 'Protecting one\'s belongings', 'Being as fast as a hare'] }
    ),
    q(
      'c11-q9',
      'mcq',
      'Que veut dire « 与其...不如... » ?',
      [
        'Plutôt que... autant...',
        'Ni... ni...',
        'Soit... soit...',
        'À la fois... et...'
      ],
      0,
      '与其 A 不如 B = « plutôt que de A, mieux vaut B » — comparaison préférentielle. 与其等他，不如自己去 = « plutôt que de l\'attendre, vas-y toi-même ».',
      { topic: 'grammar', promptEn: 'What does "与其...不如..." mean?', explanationEn: '与其 A 不如 B = "rather than A, it\'s better to B" — preferential comparison. 与其等他，不如自己去 = "rather than wait for him, go yourself".', choicesEn: ['Rather than... it\'s better to...', 'Neither... nor...', 'Either... or...', 'Both... and...'] }
    ),
    q(
      'c11-q10',
      'mcq',
      'Dans un texte argumentatif, lire « 然而 » suggère :',
      [
        'Une cause',
        'Un contraste formel',
        'Une conclusion',
        'Un exemple'
      ],
      1,
      '然而 = « cependant / toutefois » (registre écrit, formel). Équivalent soutenu de 但是 / 可是. Souvent utilisé en début de paragraphe pour pivoter.',
      { topic: 'grammar', promptEn: 'In an argumentative text, seeing "然而" signals:', explanationEn: '然而 = "however / nevertheless" (formal, written register). Formal equivalent of 但是 / 可是. Often used at the start of a paragraph to pivot.', choicesEn: ['A cause', 'A formal contrast', 'A conclusion', 'An example'] }
    ),
    q(
      'c11-q11',
      'mcq',
      'Que veut dire le chengyu 一举两得 dans un cadre stratégique ?',
      [
        'Échouer deux fois.',
        'Atteindre deux objectifs en une action.',
        'Choisir entre deux options.',
        'Hésiter longtemps.'
      ],
      1,
      '一举两得 = « en une action, double gain » = faire d\'une pierre deux coups. Très utilisé en argumentation pour vanter l\'efficacité d\'une stratégie.',
      { topic: 'culture', promptEn: 'What does the chengyu 一举两得 mean in a strategic context?', explanationEn: '一举两得 = "one action, two gains" = killing two birds with one stone. Heavily used in argumentation to praise strategic efficiency.', choicesEn: ['Failing twice.', 'Achieving two goals in one action.', 'Choosing between two options.', 'Hesitating for a long time.'] }
    ),
    q(
      'c11-q12',
      'mcq',
      'Quel terme signifie « efficacité » au sens d\'optimisation des ressources ?',
      ['效率', '效果', '结果', '作用'],
      0,
      '效率 = efficacité (rendement, productivité). 效果 = effet (résultat observé), 结果 = résultat / conclusion, 作用 = fonction / rôle. 提高效率 = améliorer l\'efficacité.',
      { topic: 'vocab', promptEn: 'Which term means "efficiency" in the sense of optimizing resources?', explanationEn: '效率 = efficiency (yield, productivity). 效果 = effect (observed result), 结果 = result / conclusion, 作用 = function / role. 提高效率 = to improve efficiency.' }
    )
  ]
};

// ============================================================================
//  C1.2 — Autonome consolidé (HSK 5 fin)
// ============================================================================
const c12: LevelBilan = {
  level: 'c1.2',
  titleFr: 'Bilan C1.2 — Débattre et persuader',
  titleEn: 'C1.2 Level Check — Debating and Persuading',
  descriptionFr:
    "Valide le registre argumentatif : 以...为..., 反之, 倒, questions rhétoriques, distinction oral/écrit.",
  descriptionEn:
    'Validates argumentative register: 以...为..., 反之, 倒, rhetorical questions, spoken-written distinction.',
  emoji: '🏯',
  passingScore: BILAN_DEFAULT_PASSING,
  xpReward: BILAN_XP_REWARD,
  questions: [
    q(
      'c12-q1',
      'mcq',
      'Que signifie « 以质量为本 » ?',
      [
        'Considérer la qualité comme fondamentale',
        'Avec la qualité on fait la base',
        'La qualité est un livre',
        'Fabriquer avec qualité'
      ],
      0,
      '以 X 为 Y = « prendre X pour Y / considérer X comme Y ». Structure figée du discours formel. 以质量为本 = « placer la qualité au fondement ».',
      { topic: 'grammar', promptEn: 'What does "以质量为本" mean?', explanationEn: '以 X 为 Y = "to take X as Y / to consider X as Y". A fixed formal-discourse structure. 以质量为本 = "to place quality at the foundation".', choicesEn: ['To consider quality as foundational', 'With quality you make the base', 'Quality is a book', 'Manufacturing with quality'] }
    ),
    q(
      'c12-q2',
      'mcq',
      'Que veut dire « 反之 » dans un raisonnement ?',
      [
        'Au contraire / inversement',
        'En revanche (contraste faible)',
        'Par conséquent',
        'En d\'autres termes'
      ],
      0,
      '反之 = « inversement / dans le sens opposé ». Registre écrit, typique du raisonnement académique ou scientifique. 反之亦然 = « et réciproquement ».',
      { topic: 'grammar', promptEn: 'What does "反之" mean in an argument?', explanationEn: '反之 = "conversely / in the opposite direction". Written register, typical of academic or scientific reasoning. 反之亦然 = "and vice versa".', choicesEn: ['Conversely / on the contrary', 'On the other hand (mild contrast)', 'Consequently', 'In other words'] }
    ),
    q(
      'c12-q3',
      'mcq',
      'Que signale « 倒 » dans « 他倒不生气 » ?',
      [
        'Intensification de la colère',
        'Étonnement / contraste avec l\'attente',
        'Négation renforcée',
        'Politesse excessive'
      ],
      1,
      '倒 (dào) modal exprime un léger étonnement ou un contraste avec une attente. 他倒不生气 = « étonnamment, il ne se fâche pas ». Registre oral nuancé.',
      { topic: 'grammar', promptEn: 'What does "倒" signal in "他倒不生气"?', explanationEn: 'Modal 倒 (dào) expresses a mild surprise or a contrast with expectations. 他倒不生气 = "surprisingly, he isn\'t angry". Nuanced spoken register.', choicesEn: ['An intensification of anger', 'Surprise / contrast with expectation', 'Reinforced negation', 'Excessive politeness'] }
    ),
    q(
      'c12-q4',
      'mcq',
      'Une question rhétorique typique est « 难道你不懂吗？ ». Elle signifie :',
      [
        'Ne pourrait-il pas que tu ne comprennes pas ?',
        'Serait-il possible que tu ne comprennes pas ?! (emphase accusatoire)',
        'Tu comprends difficilement.',
        'Comprends-tu avec difficulté ?'
      ],
      1,
      '难道...吗？ = question rhétorique marquant surprise indignée. 难道你不懂吗？ = « tu ne comprends pas, vraiment ?! ».',
      { topic: 'grammar', promptEn: 'A typical rhetorical question is "难道你不懂吗？". It means:', explanationEn: '难道...吗？ = a rhetorical question marking indignant surprise. 难道你不懂吗？ = "you really don\'t understand?!".', choicesEn: ['Could it be that you don\'t understand?', 'Could it be you really don\'t understand?! (accusatory emphasis)', 'You have trouble understanding.', 'Do you understand with difficulty?'] }
    ),
    q(
      'c12-q5',
      'mcq',
      'Lequel est le plus soutenu ?',
      ['所以', '因此', '因为所以', '这样'],
      1,
      '因此 est le plus soutenu (« par conséquent »). 所以 est neutre. 因为...所以... est courant à l\'oral mais lourd à l\'écrit, on préfère ...因此... ou simplement 所以 seul.',
      { topic: 'grammar', promptEn: 'Which is the most formal?', explanationEn: '因此 is the most formal ("consequently"). 所以 is neutral. 因为...所以... is common in speech but heavy in writing; prefer ...因此... or just 所以 alone.' }
    ),
    q(
      'c12-q6',
      'mcq',
      'Que signifie le chengyu 百闻不如一见 ?',
      [
        'Entendre cent fois ne vaut pas voir une fois',
        'Répéter cent fois avant de voir',
        'Un entendu vaut cent vus',
        'Tout voir en une fois'
      ],
      0,
      '百闻不如一见 : « cent ouï-dire ne valent pas une vision ». Importance de l\'expérience directe. Souvent cité par les touristes étrangers arrivant en Chine.',
      { topic: 'culture', promptEn: 'What does the chengyu 百闻不如一见 mean?', explanationEn: '百闻不如一见: "a hundred hearings are not worth one seeing". The importance of direct experience. Often quoted by foreign visitors arriving in China.', choicesEn: ['Hearing a hundred times is not worth seeing once', 'Repeating a hundred times before seeing', 'One hearing is worth a hundred sights', 'Seeing everything at once'] }
    ),
    q(
      'c12-q7',
      'mcq',
      'Le mot 趋势 signifie :',
      ['Attitude', 'Tendance / évolution', 'Pouvoir', 'Tradition'],
      1,
      '趋势 = tendance, évolution, courant. Typique du discours analytique/économique. 未来的趋势 = les tendances futures.',
      { topic: 'vocab', promptEn: 'The word 趋势 means:', explanationEn: '趋势 = trend, evolution, current. Typical of analytical / economic discourse. 未来的趋势 = future trends.', choicesEn: ['Attitude', 'Trend / evolution', 'Power', 'Tradition'] }
    ),
    q(
      'c12-q8',
      'mcq',
      'Que signifie « 动不动就 » ?',
      [
        'Rester immobile',
        'Continuellement en mouvement',
        'À la moindre occasion / pour un rien',
        'Ne pas bouger'
      ],
      2,
      '动不动就 = « à tout bout de champ / pour un rien ». Exprime un comportement répétitif disproportionné. 他动不动就生气 = « il se fâche pour un rien ».',
      { topic: 'grammar', promptEn: 'What does "动不动就" mean?', explanationEn: '动不动就 = "at the drop of a hat / for no good reason". Expresses disproportionate repetitive behavior. 他动不动就生气 = "he gets angry over the slightest thing".', choicesEn: ['Staying still', 'Continuously in motion', 'At the slightest thing / for no reason', 'Not moving'] }
    ),
    q(
      'c12-q9',
      'mcq',
      'Le registre écrit soutenu privilégierait :',
      ['吧', '啊', '矣 (classique) ou absence de particule finale', '呢'],
      2,
      'À l\'écrit formel / littéraire, les particules modales finales (吧/啊/呢) sont réduites ou absentes. 矣 est une trace classique (guwen). Les textes académiques utilisent rarement les particules orales.',
      { topic: 'grammar', promptEn: 'Formal written register would prefer:', explanationEn: 'In formal / literary writing, final modal particles (吧/啊/呢) are reduced or absent. 矣 is a classical trace (guwen). Academic texts rarely use oral particles.', choicesEn: ['吧', '啊', '矣 (classical) or no final particle', '呢'] }
    ),
    q(
      'c12-q10',
      'mcq',
      'Dans le dialogue ci-dessous, B pense :',
      [
        'Le télétravail est à éviter.',
        'Vu la tendance actuelle, c\'est probablement inévitable.',
        'Le télétravail restera marginal.',
        'Il faut craindre le télétravail.'
      ],
      1,
      '恐怕 = « je crains que / probablement » (nuance prudente). 不可避免 = inévitable. Registre analytique / argumentatif.',
      { topic: 'dialogue', contextFr: 'A: 你觉得远程办公会成为主流吗？\nB: 从目前的趋势来看，恐怕是不可避免的。', promptEn: 'In the dialogue below, B thinks:', contextEn: 'A: 你觉得远程办公会成为主流吗？\nB: 从目前的趋势来看，恐怕是不可避免的。', explanationEn: '恐怕 = "I\'m afraid that / probably" (a cautious nuance). 不可避免 = inevitable. An analytical / argumentative register.', choicesEn: ['Remote work should be avoided.', 'Given the current trend, it\'s probably inevitable.', 'Remote work will stay marginal.', 'Remote work is to be feared.'] }
    )
  ]
};

// ============================================================================
//  C2.1 — Maîtrise seuil (HSK 6 début)
// ============================================================================
const c21: LevelBilan = {
  level: 'c2.1',
  titleFr: 'Bilan C2.1 — Littérarité et registres élevés',
  titleEn: 'C2.1 Level Check — Literary and Elevated Registers',
  descriptionFr:
    "Teste les structures littéraires, le vocabulaire économique et politique, et les tournures héritées du chinois classique.",
  descriptionEn:
    'Tests literary structures, economic/political vocabulary, classical-influenced turns of phrase.',
  emoji: '⛩️',
  passingScore: BILAN_DEFAULT_PASSING,
  xpReward: BILAN_XP_REWARD,
  questions: [
    q(
      'c21-q1',
      'mcq',
      'Que signifie 赋予 ?',
      ['Priver', 'Conférer / attribuer', 'Accumuler', 'Gérer'],
      1,
      '赋予 (fùyǔ) = conférer, attribuer (sens solennel). 赋予权力 = conférer un pouvoir. Registre écrit, souvent juridique ou institutionnel.',
      { topic: 'vocab', promptEn: 'What does 赋予 mean?', explanationEn: '赋予 (fùyǔ) = to confer, to bestow (solemn sense). 赋予权力 = to confer power. Written register, often legal or institutional.', choicesEn: ['To deprive', 'To confer / to bestow', 'To accumulate', 'To manage'] }
    ),
    q(
      'c21-q2',
      'mcq',
      'Le chengyu 趋之若鹜 s\'emploie quand :',
      [
        'Les gens se ruent en foule vers quelque chose (souvent avec connotation critique).',
        'Les oiseaux volent vers l\'est.',
        'On poursuit un rêve impossible.',
        'On abandonne à mi-chemin.'
      ],
      0,
      '趋之若鹜 : « se ruer comme des canards sauvages ». Souvent péjoratif : critique la foule qui suit une mode sans discernement.',
      { topic: 'culture', promptEn: 'The chengyu 趋之若鹜 is used when:', explanationEn: '趋之若鹜: "to rush like wild ducks". Often pejorative: criticizes the crowd that follows a fad without discernment.', choicesEn: ['People rush in droves toward something (often with a critical connotation).', 'Birds fly east.', 'One chases an impossible dream.', 'One gives up halfway.'] }
    ),
    q(
      'c21-q3',
      'mcq',
      'Que veut dire « 莫非 » ?',
      [
        'Ne pourrait-ce pas être que... (supposition prudente)',
        'Certainement pas',
        'Exactement',
        'N\'importe quoi'
      ],
      0,
      '莫非 = « serait-ce que... ? » — conjecture prudente, souvent rhétorique. Registre littéraire. 莫非你忘了？ = « aurais-tu donc oublié ? ».',
      { topic: 'grammar', promptEn: 'What does "莫非" mean?', explanationEn: '莫非 = "could it be that...?" — cautious, often rhetorical conjecture. Literary register. 莫非你忘了？ = "could it be you\'ve forgotten?".', choicesEn: ['Could it be that... (cautious supposition)', 'Certainly not', 'Exactly', 'Nonsense'] }
    ),
    q(
      'c21-q4',
      'mcq',
      'Le terme 改革 signifie :',
      ['Révolution', 'Réforme', 'Renversement', 'Régression'],
      1,
      '改革 = réforme. 革命 = révolution, 推翻 = renverser. Vocabulaire politique standard.',
      { topic: 'vocab', promptEn: 'The term 改革 means:', explanationEn: '改革 = reform. 革命 = revolution, 推翻 = to overthrow. Standard political vocabulary.', choicesEn: ['Revolution', 'Reform', 'Overthrow', 'Regression'] }
    ),
    q(
      'c21-q5',
      'mcq',
      'Que veut dire « 岂非 » (岂有不...之理) ?',
      [
        'N\'est-ce pas évidemment...?',
        'Comment pourrait-on...?',
        'Il y a peut-être...',
        'C\'est interdit.'
      ],
      0,
      '岂非 = « n\'est-ce pas manifestement... ? ». Registre élevé. 岂有此理 = « c\'est absurde ! ». Marqueurs héritiers du chinois classique.',
      { topic: 'grammar', promptEn: 'What does "岂非" mean (岂有不...之理)?', explanationEn: '岂非 = "is it not manifestly...?". Elevated register. 岂有此理 = "this is absurd!". Markers inherited from classical Chinese.', choicesEn: ['Is it not obviously...?', 'How could one...?', 'Perhaps there is...', 'It is forbidden.'] }
    ),
    q(
      'c21-q6',
      'mcq',
      'Le mot 通货膨胀 signifie :',
      ['Déflation', 'Inflation', 'Chômage', 'Taux de change'],
      1,
      '通货膨胀 = inflation (litt. « la monnaie s\'enfle »). Vocabulaire économique HSK 6. 通货紧缩 = déflation.',
      { topic: 'vocab', promptEn: 'The word 通货膨胀 means:', explanationEn: '通货膨胀 = inflation (lit. "currency swells"). HSK 6 economic vocabulary. 通货紧缩 = deflation.', choicesEn: ['Deflation', 'Inflation', 'Unemployment', 'Exchange rate'] }
    ),
    q(
      'c21-q7',
      'mcq',
      'Comment traduire « il est non seulement intelligent, mais encore plus travailleur » ?',
      [
        '他不但聪明，而且更勤奋',
        '他聪明而且工作',
        '他聪明不但勤奋',
        '他更聪明勤奋而且'
      ],
      0,
      '不但...而且（更）... = « non seulement... mais (encore plus)... ». La présence de 更 renforce la gradation. Structure soignée à l\'écrit.',
      { topic: 'grammar', promptEn: 'How do you translate "he is not only smart, but even more hard-working"?', explanationEn: '不但...而且（更）... = "not only... but (even more)...". The presence of 更 strengthens the gradation. A polished structure in writing.' }
    ),
    q(
      'c21-q8',
      'mcq',
      'Que signifie l\'expression 以身作则 ?',
      [
        'Donner l\'exemple par sa conduite',
        'Travailler avec son corps',
        'Suivre les règles strictement',
        'Être ferme et juste'
      ],
      0,
      '以身作则 : « prendre son propre corps pour règle » = donner l\'exemple. Applicable aux parents, aux enseignants, aux dirigeants.',
      { topic: 'culture', promptEn: 'What does the expression 以身作则 mean?', explanationEn: '以身作则: "to take one\'s own body as the rule" = to set an example. Applicable to parents, teachers, leaders.', choicesEn: ['To set an example through one\'s conduct', 'To work with one\'s body', 'To follow rules strictly', 'To be firm and fair'] }
    ),
    q(
      'c21-q9',
      'mcq',
      'Dans un essai, 综上所述 signifie :',
      [
        'En introduction',
        'Pour résumer / en conclusion',
        'Par ailleurs',
        'Selon la tradition'
      ],
      1,
      '综上所述 = « en résumé de ce qui précède / en conclusion ». Formule figée de clôture de paragraphe ou d\'essai.',
      { topic: 'grammar', promptEn: 'In an essay, 综上所述 means:', explanationEn: '综上所述 = "summarizing the above / in conclusion". A fixed closing formula for a paragraph or essay.', choicesEn: ['In the introduction', 'To summarize / in conclusion', 'Furthermore', 'According to tradition'] }
    ),
    q(
      'c21-q10',
      'mcq',
      'Dans le dialogue formel ci-dessous, B dit :',
      [
        'La politique est rétrograde.',
        'Elle a un certain caractère visionnaire, mais reste perfectible.',
        'Elle est parfaite.',
        'Il ne prend pas position.'
      ],
      1,
      '前瞻性 = « caractère visionnaire / tourné vers l\'avenir ». 改进空间 = marge d\'amélioration. 具有 = posséder / comporter. Registre institutionnel soigné.',
      { topic: 'dialogue', contextFr: 'A: 对这项政策，您持何种看法？\nB: 我认为它具有一定的前瞻性，但仍有改进空间。', promptEn: 'In the formal dialogue below, B says:', contextEn: 'A: 对这项政策，您持何种看法？\nB: 我认为它具有一定的前瞻性，但仍有改进空间。', explanationEn: '前瞻性 = "forward-looking character". 改进空间 = room for improvement. 具有 = to possess / to bear. Polished institutional register.', choicesEn: ['The policy is regressive.', 'It has a certain forward-looking character but still has room for improvement.', 'It is perfect.', 'He takes no position.'] }
    ),
    q(
      'c21-q11',
      'mcq',
      'Que signifie 鉴于 dans un texte officiel ?',
      [
        'Considérant que / vu que',
        'À l\'opposé de',
        'Malgré',
        'Au-delà de'
      ],
      0,
      '鉴于 = « considérant que / vu que » (registre juridique et institutionnel). Ouvre une justification officielle. 鉴于上述情况 = « vu ce qui précède ».',
      { topic: 'grammar', promptEn: 'What does 鉴于 mean in an official text?', explanationEn: '鉴于 = "whereas / given that" (legal and institutional register). Opens an official justification. 鉴于上述情况 = "given the above circumstances".', choicesEn: ['Whereas / given that', 'In contrast to', 'Despite', 'Beyond'] }
    ),
    q(
      'c21-q12',
      'mcq',
      'Le chengyu 厚积薄发 évoque :',
      [
        'Une accumulation patiente avant un déploiement maîtrisé.',
        'Acheter beaucoup et vendre peu.',
        'Économiser sans dépenser.',
        'Travailler peu mais bien.'
      ],
      0,
      '厚积薄发 (hòu jī bó fā) : « accumuler épaissement, déployer parcimonieusement ». Cite Su Shi. Valeur cardinale du travail à long terme avant l\'éclat public.',
      { topic: 'culture', promptEn: 'The chengyu 厚积薄发 evokes:', explanationEn: '厚积薄发 (hòu jī bó fā): "to accumulate thickly, to release sparingly". Quotes Su Shi. A cardinal value of long-term work before public brilliance.', choicesEn: ['Patient accumulation before a measured release.', 'Buying a lot and selling little.', 'Saving without spending.', 'Working little but well.'] }
    ),
    q(
      'c21-q13',
      'mcq',
      'Quel terme désigne le « patrimoine culturel » au sens institutionnel ?',
      ['文化遗产', '文化背景', '文化交流', '文化差异'],
      0,
      '文化遗产 = patrimoine culturel. 文化背景 = contexte culturel, 文化交流 = échanges culturels, 文化差异 = différences culturelles. Vocabulaire UNESCO / institutionnel.',
      { topic: 'vocab', promptEn: 'Which term designates "cultural heritage" in an institutional sense?', explanationEn: '文化遗产 = cultural heritage. 文化背景 = cultural background, 文化交流 = cultural exchanges, 文化差异 = cultural differences. UNESCO / institutional vocabulary.' }
    ),
    q(
      'c21-q14',
      'mcq',
      'Que signifie 旨在 dans « 本政策旨在改善民生 » ?',
      [
        'A pour but de',
        'Hésite à',
        'Refuse de',
        'Réussit à'
      ],
      0,
      '旨在 = « avoir pour but de / viser à ». Registre administratif et écrit. 本政策旨在改善民生 = « cette politique vise à améliorer le bien-être de la population ».',
      { topic: 'grammar', promptEn: 'What does 旨在 mean in "本政策旨在改善民生"?', explanationEn: '旨在 = "to aim at / to be intended to". Administrative, written register. 本政策旨在改善民生 = "this policy aims to improve people\'s welfare".', choicesEn: ['Aims to', 'Hesitates to', 'Refuses to', 'Succeeds in'] }
    )
  ]
};

// ============================================================================
//  C2.2 — Maîtrise experte (HSK 6 maîtrise + lettres)
// ============================================================================
const c22: LevelBilan = {
  level: 'c2.2',
  titleFr: 'Bilan C2.2 — Rhétorique et lettrés',
  titleEn: 'C2.2 Level Check — Rhetoric and Literati',
  descriptionFr:
    "Bilan final : tournures rhétoriques, échos classiques (亦, 矣, 也), vocabulaire savant, poésie et proverbes lettrés.",
  descriptionEn:
    'Final level check: rhetorical turns, classical echoes, scholarly vocabulary, literary proverbs.',
  emoji: '🎎',
  passingScore: BILAN_DEFAULT_PASSING,
  xpReward: BILAN_XP_REWARD,
  questions: [
    q(
      'c22-q1',
      'mcq',
      'Le chengyu 青出于蓝而胜于蓝 évoque :',
      [
        'Le bleu est plus beau que le vert.',
        'L\'élève dépasse le maître.',
        'Les couleurs primaires.',
        'La patience est bleue.'
      ],
      1,
      '青出于蓝而胜于蓝 : « le bleu-vert sort de l\'indigo mais le surpasse ». Tiré de Xunzi. Signifie que l\'élève peut dépasser son maître.',
      { topic: 'culture', promptEn: 'The chengyu 青出于蓝而胜于蓝 evokes:', explanationEn: '青出于蓝而胜于蓝: "blue-green comes from indigo but surpasses it". From Xunzi. Means the student can surpass the master.', choicesEn: ['Blue is prettier than green.', 'The student surpasses the master.', 'The primary colors.', 'Patience is blue.'] }
    ),
    q(
      'c22-q2',
      'mcq',
      'Le caractère classique 亦 (yì) signifie :',
      ['Si', 'Aussi / également (registre classique)', 'Pas', 'Seulement'],
      1,
      '亦 = 也 en chinois classique. Toujours trouvé dans les textes lettrés, les citations philosophiques, ou certains chengyu (不亦乐乎 « n\'est-ce pas réjouissant ? »).',
      { topic: 'culture', promptEn: 'The classical character 亦 (yì) means:', explanationEn: '亦 = 也 in Classical Chinese. Always found in literary texts, philosophical quotations, or certain chengyu (不亦乐乎 "is this not delightful?").', choicesEn: ['If', 'Also / as well (classical register)', 'Not', 'Only'] }
    ),
    q(
      'c22-q3',
      'mcq',
      'Qu\'exprime « 矣 » à la fin d\'une phrase classique ?',
      [
        'Une question',
        'Un accompli / état atteint (équivalent ~了)',
        'Un ordre',
        'Un doute'
      ],
      1,
      '矣 marque l\'accompli ou un changement d\'état en chinois classique. Proche de 了 moderne. 天命矣 = « c\'est la volonté du ciel ». Souvent cité dans les textes traditionnels.',
      { topic: 'culture', promptEn: 'What does "矣" express at the end of a classical sentence?', explanationEn: '矣 marks completion or a change of state in Classical Chinese. Close to modern 了. 天命矣 = "it is the will of Heaven". Often quoted in traditional texts.', choicesEn: ['A question', 'Completion / attained state (equivalent to ~了)', 'A command', 'A doubt'] }
    ),
    q(
      'c22-q4',
      'mcq',
      'Quel terme signifie « conjoncture » dans un contexte économique/politique ?',
      ['局势', '情况', '方面', '具体'],
      0,
      '局势 = conjoncture, situation globale. 情况 = situation (plus neutre et local). 局势紧张 = la situation est tendue. Vocabulaire éditorial / géopolitique.',
      { topic: 'vocab', promptEn: 'Which term means "conjuncture" in an economic / political context?', explanationEn: '局势 = conjuncture, overall situation. 情况 = situation (more neutral, local). 局势紧张 = the situation is tense. Editorial / geopolitical vocabulary.', choicesEn: ['局势', '情况', '方面', '具体'] }
    ),
    q(
      'c22-q5',
      'mcq',
      'Le chengyu 杯弓蛇影 évoque :',
      [
        'Une frayeur imaginaire causée par sa propre imagination.',
        'Un serpent qui boit dans une coupe.',
        'Une amitié sincère.',
        'La beauté des reflets.'
      ],
      0,
      '杯弓蛇影 : « l\'ombre de l\'arc dans la coupe ressemblant à un serpent ». Un convive effrayé par le reflet d\'un arc suspendu. = s\'alarmer pour rien, peur imaginaire.',
      { topic: 'culture', promptEn: 'The chengyu 杯弓蛇影 evokes:', explanationEn: '杯弓蛇影: "the reflection of the bow in the cup looking like a snake". A guest scared by the reflection of a hanging bow. = to worry about nothing, imaginary fears.', choicesEn: ['An imagined fright caused by one\'s own imagination.', 'A snake drinking from a cup.', 'A sincere friendship.', 'The beauty of reflections.'] }
    ),
    q(
      'c22-q6',
      'mcq',
      'Le mot 寄予 signifie :',
      [
        'Attribuer (un espoir, une attente — sens solennel)',
        'Envoyer par la poste',
        'Donner un cadeau',
        'Trahir'
      ],
      0,
      '寄予 = « placer (un espoir, une confiance) en ». 寄予厚望 = nourrir de grands espoirs pour. Registre très soutenu, médiatique / officiel.',
      { topic: 'vocab', promptEn: 'The word 寄予 means:', explanationEn: '寄予 = "to place (hope, trust) in". 寄予厚望 = to hold high hopes for. Very formal register, media / official.', choicesEn: ['To place (a hope, an expectation — solemn sense)', 'To send by post', 'To give a gift', 'To betray'] }
    ),
    q(
      'c22-q7',
      'mcq',
      'Que veut dire « 耐人寻味 » ?',
      [
        'Qui donne à réfléchir / savoureux à méditer',
        'Supporter la fatigue',
        'Goûter patiemment',
        'Être indécis'
      ],
      0,
      '耐人寻味 : « qui mérite d\'être savouré / médité ». Utilisé pour un livre, un propos, une œuvre d\'art qui invite à la réflexion.',
      { topic: 'culture', promptEn: 'What does "耐人寻味" mean?', explanationEn: '耐人寻味: "worth savoring / meditating on". Used for a book, a remark, or a work of art that invites reflection.', choicesEn: ['Thought-provoking / worth pondering', 'To endure fatigue', 'To taste patiently', 'To be indecisive'] }
    ),
    q(
      'c22-q8',
      'mcq',
      'Comment rendre « il se distingue dans son domaine » dans un registre soutenu ?',
      [
        '他在领域里很好',
        '他在该领域独树一帜',
        '他做得不错在领域',
        '他好领域的'
      ],
      1,
      '独树一帜 : « planter son propre drapeau » = se démarquer, avoir son propre style. 在该领域 = « dans ce domaine » (registre formel avec 该 démonstratif lettré).',
      { topic: 'culture', promptEn: 'How do you render "he stands out in his field" in a formal register?', explanationEn: '独树一帜: "to plant one\'s own flag" = to stand out, to have one\'s own style. 在该领域 = "in this field" (formal register with the literary demonstrative 该).' }
    ),
    q(
      'c22-q9',
      'mcq',
      'Le vers de Du Fu « 国破山河在 » évoque :',
      [
        'L\'État est détruit, mais fleuves et monts demeurent.',
        'Il pleut sur les montagnes.',
        'Les rivières sont fières.',
        'Les États guerroient.'
      ],
      0,
      '« 国破山河在 » : premier vers du poème « 春望 » (« Vue printanière ») de Du Fu (杜甫), Tang. Réflexion sur la permanence de la nature face à la chute dynastique. Culture lettrée de base au niveau C2.',
      { topic: 'culture', promptEn: 'The line by Du Fu "国破山河在" evokes:', explanationEn: '"国破山河在": opening line of the poem "春望" ("Spring View") by Du Fu (杜甫), Tang dynasty. A reflection on the permanence of nature against the fall of a dynasty. Basic literary culture at C2.', choicesEn: ['The state is destroyed, but rivers and mountains remain.', 'It rains on the mountains.', 'The rivers are proud.', 'States wage war.'] }
    ),
    q(
      'c22-q10',
      'mcq',
      'Essai formel : quelle phrase est la plus soignée pour conclure ?',
      [
        '所以我觉得这样就好了',
        '综上所述，此议具有深远影响，值得进一步探讨',
        '我觉得很好',
        '说得对'
      ],
      1,
      '综上所述 = « en résumé ». 此议 = « cette proposition » (此 démonstratif lettré). 具有深远影响 = « a une portée profonde ». 值得进一步探讨 = « mérite d\'être approfondi ». Formule complète de conclusion académique.',
      { topic: 'grammar', promptEn: 'Formal essay: which sentence is the most polished conclusion?', explanationEn: '综上所述 = "in summary". 此议 = "this proposal" (此 literary demonstrative). 具有深远影响 = "has a far-reaching impact". 值得进一步探讨 = "deserves further exploration". A complete academic-conclusion formula.' }
    )
  ]
};

// ============================================================================
//  EXPORTS
// ============================================================================
export const cecrBilans: Record<CecrLevelSlug, LevelBilan> = {
  a1,
  a2,
  'b1.1': b11,
  'b1.2': b12,
  'b2.1': b21,
  'b2.2': b22,
  'c1.1': c11,
  'c1.2': c12,
  'c2.1': c21,
  'c2.2': c22
};

export const cecrBilansList: LevelBilan[] = [
  a1,
  a2,
  b11,
  b12,
  b21,
  b22,
  c11,
  c12,
  c21,
  c22
];

export const getBilanForLevel = (level: CecrLevelSlug): LevelBilan | undefined =>
  cecrBilans[level];

// Sanity check at import (dev only) — nb de questions cible par niveau.
// Le nombre de questions varie selon la richesse du parcours du niveau.
// On utilise import.meta.env (Vite) au lieu de process.env pour éviter la
// dépendance aux types Node.
const EXPECTED_QUESTIONS_PER_LEVEL: Record<CecrLevelSlug, number> = {
  a1: 18,
  a2: 21,
  'b1.1': 21,
  'b1.2': 18,
  'b2.1': 16,
  'b2.2': 14,
  'c1.1': 12,
  'c1.2': 10,
  'c2.1': 14,
  'c2.2': 10
};

if (import.meta.env?.DEV) {
  cecrBilansList.forEach((b) => {
    const expected = EXPECTED_QUESTIONS_PER_LEVEL[b.level];
    if (b.questions.length !== expected) {
      console.warn(
        `[cecr-bilans] ${b.level} has ${b.questions.length} questions (expected ${expected})`
      );
    }
  });
}
