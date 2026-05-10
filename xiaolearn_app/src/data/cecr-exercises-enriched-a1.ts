/**
 * cecr-exercises-enriched-a1.ts
 * -----------------------------
 * Exercices A1 rédigés à la main — extension V8 de cecr-exercises.ts.
 *
 * Structure par module : 8 items variés, ancrés sur les flashcards et les
 * objectifs pédagogiques précis de la leçon (cf. cecr-course.ts).
 *
 * Typologie par item :
 *   1. grammar-quiz / mcq  — compréhension conceptuelle (registre, sens)
 *   2. fill                — phrase à trou (phrase courte, choix unique)
 *   3. order               — remise dans l'ordre (avec distracteurs)
 *   4. translation zh→fr   — phrase + 4 choix FR
 *   5. translation fr→zh   — phrase + 4 choix ZH
 *   6. error-correction    — trouver le segment mal placé
 *   7. mcq listening       — avec audioHanzi + autoPlay
 *   8. mcq reverse         — donner le hanzi à partir du sens FR
 *
 * Cf. docs/V8.md pour la grille pédagogique détaillée.
 */

import type { LessonV2Exercise } from '../pages/StructuredLessonPageV2';

// ============================================================================
//  A1 — HELLO / SALUTATIONS (4 modules)
// ============================================================================

// --- A1 Hello M1 : Dire bonjour & au revoir -------------------------------
// Flashcards : 你好, 您好, 早上好, 晚上好, 再见, 明天见, 晚安, 拜拜
const A1_HELLO_M1: LessonV2Exercise[] = [
  {
    id: 'cecr-a1-hello-m1-gq1',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Tu arrives à un rendez-vous professionnel avec un client âgé. Quelle salutation choisir ?',
    promptEn: 'You arrive to a business meeting with an elderly client. Which greeting do you pick?',
    choices: ['你好', '您好', '拜拜', '早上好'],
    correctIndex: 1,
    explanation: '您 (nín) est le « tu » poli. On l\u2019utilise avec clients, personnes âgées, supérieurs hiérarchiques. 你好 serait trop familier dans ce contexte.',
    explanationEn: '您 (nín) is the polite «you». Use it with clients, elders, superiors. 你好 would be too casual here.'
  },
  {
    id: 'cecr-a1-hello-m1-fill1',
    type: 'fill',
    category: 'vocabulary',
    prompt: 'Il est 8h du matin, tu croises ton voisin.',
    promptEn: 'It\u2019s 8 a.m., you meet your neighbour.',
    sentence: '___\uFF01\u4F60\u597D\u5417\uFF1F',
    sentenceEn: '___! How are you?',
    choices: ['\u665A\u5B89', '\u65E9\u4E0A\u597D', '\u665A\u4E0A\u597D', '\u518D\u89C1'],
    correctIndex: 1,
    explanation: '早上好 = « bonjour (matin) ». 晚上好 pour le soir, 晚安 = bonne nuit (au coucher), 再见 = au revoir.',
    explanationEn: '早上好 = «good morning». 晚上好 for evening, 晚安 = good night (bedtime), 再见 = goodbye.'
  },
  {
    id: 'cecr-a1-hello-m1-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Remets les caractères dans l\u2019ordre : « À demain, professeur ! »',
    promptEn: 'Reorder: «See you tomorrow, teacher!»',
    sentence: 'À demain, professeur !',
    sentenceEn: 'See you tomorrow, teacher!',
    choices: ['\u8001\u5E08', '\uFF0C', '\u660E\u5929', '\u89C1'],
    correctIndex: 0,
    explanation: 'Ordre chinois : interpellation + virgule + expression. 老师 + ， + 明天 + 见. « Voir demain » = 明天见.',
    explanationEn: 'Chinese order: address + comma + expression. 老师，明天见. «See tomorrow» = 明天见.'
  },
  {
    id: 'cecr-a1-hello-m1-trans-zh2fr',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis en français : « 晚安，明天见！»',
    promptEn: 'Translate to French: «晚安，明天见!»',
    choices: [
      'Bonsoir, à demain !',
      'Bonne nuit, à demain !',
      'Au revoir, bonne soirée !',
      'Bonjour, à bientôt !'
    ],
    correctIndex: 1,
    explanation: '晚安 (wǎn\u2019ān) = bonne nuit (au coucher, pas « bonsoir » qui se dit 晚上好). 明天见 = à demain.',
    explanationEn: '晚安 (wǎn\u2019ān) = good night (at bedtime, not «good evening» which is 晚上好). 明天见 = see you tomorrow.'
  },
  {
    id: 'cecr-a1-hello-m1-trans-fr2zh',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis en chinois : « Bonsoir ! »',
    promptEn: 'Translate to Chinese: «Good evening!»',
    choices: ['\u665A\u5B89\uFF01', '\u665A\u4E0A\u597D\uFF01', '\u4F60\u597D\uFF01', '\u62DC\u62DC\uFF01'],
    correctIndex: 1,
    explanation: '« Bonsoir » (salutation) = 晚上好. 晚安 = « bonne nuit » (on part dormir). Distinction fine qui piège les débutants.',
    explanationEn: '«Good evening» (greeting) = 晚上好. 晚安 = «good night» (going to sleep). Fine distinction that trips beginners.'
  },
  {
    id: 'cecr-a1-hello-m1-err1',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Tu parles à ton meilleur ami. Quel mot est socialement inapproprié dans « 您好，朋友！» ?',
    promptEn: 'You\u2019re talking to your best friend. Which word is socially wrong in «您好，朋友!»?',
    sentence: '\u60A8\u597D\uFF0C\u670B\u53CB\uFF01',
    choices: ['\u60A8', '\u597D', '\u670B\u53CB', '\uFF01'],
    correctIndex: 0,
    explanation: '您 (poli) entre amis sonne ironique ou distant. Dire 你好 朋友 ou simplement 嘿 entre proches.',
    explanationEn: '您 (polite) sounds ironic or distant between friends. Say 你好 朋友 or simply 嘿 with close friends.'
  },
  {
    id: 'cecr-a1-hello-m1-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute — que viens-tu d\u2019entendre ?',
    promptEn: 'Listen — what did you just hear?',
    choices: [
      '晚上好 (bonsoir)',
      '晚安 (bonne nuit)',
      '早上好 (bonjour matin)',
      '再见 (au revoir)'
    ],
    correctIndex: 1,
    explanation: '晚安 = wǎn\u2019ān (deux syllabes, ton 3 + ton 1). Se dit au coucher. 晚上好 (trois syllabes) = « bonsoir » en arrivant. Distinction essentielle.',
    explanationEn: '晚安 = wǎn\u2019ān (two syllables, tone 3 + tone 1). Said at bedtime. 晚上好 (three syllables) = «good evening» on arrival. Crucial distinction.',
    audioHanzi: '\u665A\u5B89',
    autoPlay: true
  },
  {
    id: 'cecr-a1-hello-m1-mcq-reverse',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Entre jeunes, quelle est la manière la plus décontractée de dire « salut / au revoir » ?',
    promptEn: 'Among young people, what\u2019s the most casual way to say «bye»?',
    choices: ['再见', '晚安', '拜拜', '您好'],
    correctIndex: 2,
    explanation: '拜拜 (bái bái) est un emprunt à l\u2019anglais « bye-bye », très employé entre jeunes ou à l\u2019oral informel.',
    explanationEn: '拜拜 (bái bái) is borrowed from English «bye-bye», common among young people and in casual speech.'
  }
];

// --- A1 Hello M2 : Merci & s'excuser --------------------------------------
// Flashcards : 谢谢, 不客气, 对不起, 没关系, 不好意思, 请, 打扰了, 麻烦你
const A1_HELLO_M2: LessonV2Exercise[] = [
  {
    id: 'cecr-a1-hello-m2-gq1',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Tu bouscules quelqu\u2019un dans la rue par accident — quel mot utiliser ?',
    promptEn: 'You bump into someone by accident — which word?',
    choices: ['对不起', '不好意思', '谢谢', '请'],
    correctIndex: 1,
    explanation: '不好意思 = excuse légère (gêne, bousculade, demande). 对不起 est plus grave (erreur sérieuse, offense).',
    explanationEn: '不好意思 = light apology (awkward, bumping, asking). 对不起 is heavier (serious mistake, offense).'
  },
  {
    id: 'cecr-a1-hello-m2-fill1',
    type: 'fill',
    category: 'vocabulary',
    prompt: 'Quelqu\u2019un te remercie. Tu réponds :',
    promptEn: 'Someone thanks you. You reply:',
    sentence: '\u2014 \u8C22\u8C22\uFF01\n\u2014 ___\uFF01',
    sentenceEn: '— Thanks!\n— ___!',
    choices: ['\u5BF9\u4E0D\u8D77', '\u4E0D\u5BA2\u6C14', '\u6CA1\u5173\u7CFB', '\u8BF7'],
    correctIndex: 1,
    explanation: 'Réponse à 谢谢 = 不客气 (« de rien »). 没关系 répond à 对不起. Les deux paires ne se croisent pas.',
    explanationEn: 'Reply to 谢谢 = 不客气 («you\u2019re welcome»). 没关系 replies to 对不起. Never cross the pairs.'
  },
  {
    id: 'cecr-a1-hello-m2-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Ordonne : « Désolé de te déranger. »',
    promptEn: 'Reorder: «Sorry to bother you.»',
    sentence: 'Désolé de te déranger.',
    sentenceEn: 'Sorry to bother you.',
    choices: ['\u4E0D\u597D\u610F\u601D', '\uFF0C', '\u6253\u6270', '\u4F60\u4E86'],
    correctIndex: 0,
    explanation: 'Ordre : 不好意思，打扰你了. 打扰 = déranger, 了 marque l\u2019action accomplie. Formule standard pour interrompre.',
    explanationEn: 'Order: 不好意思，打扰你了. 打扰 = to bother, 了 marks completed action. Standard interruption opener.'
  },
  {
    id: 'cecr-a1-hello-m2-trans-zh2fr',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « 麻烦你，请帮我一下。»',
    promptEn: 'Translate: «麻烦你，请帮我一下。»',
    choices: [
      'Merci de votre aide, je vous en prie.',
      'Excusez-moi, s\u2019il vous plaît aidez-moi un instant.',
      'Désolé, je ne peux pas vous aider.',
      'Bonjour, pouvez-vous m\u2019aider ?'
    ],
    correctIndex: 1,
    explanation: '麻烦你 = « excusez-moi de vous déranger » (poli pour demander un service). 一下 atténue la demande (« un petit peu »).',
    explanationEn: '麻烦你 = «sorry to trouble you» (polite for favors). 一下 softens the request («just a moment»).'
  },
  {
    id: 'cecr-a1-hello-m2-trans-fr2zh',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « Je suis vraiment désolé. »',
    promptEn: 'Translate: «I\u2019m really sorry.»',
    choices: [
      '\u4E0D\u597D\u610F\u601D\u3002',
      '\u6211\u771F\u7684\u5F88\u5BF9\u4E0D\u8D77\u3002',
      '\u6CA1\u5173\u7CFB\u3002',
      '\u8C22\u8C22\u4F60\u3002'
    ],
    correctIndex: 1,
    explanation: 'Pour une excuse grave, on renforce 对不起 avec 真的很 (« vraiment très »). 不好意思 serait trop léger ici.',
    explanationEn: 'For a serious apology, intensify 对不起 with 真的很 («really very»). 不好意思 is too light.'
  },
  {
    id: 'cecr-a1-hello-m2-err1',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Quel segment est mal placé : « 请 / 坐 / 一下 / 您 » ?',
    promptEn: 'Which segment is misplaced in «请 / 坐 / 一下 / 您»?',
    sentence: '\u8BF7 / \u5750 / \u4E00\u4E0B / \u60A8',
    choices: ['\u8BF7', '\u5750', '\u4E00\u4E0B', '\u60A8'],
    correctIndex: 3,
    explanation: '您 (sujet) doit venir AVANT 请 ou disparaître. Correct : 您请坐 ou simplement 请坐 (« asseyez-vous je vous en prie »).',
    explanationEn: '您 (subject) must come BEFORE 请 or be dropped. Correct: 您请坐 or simply 请坐 («please sit»).'
  },
  {
    id: 'cecr-a1-hello-m2-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute — quelle formule viens-tu d\u2019entendre ?',
    promptEn: 'Listen — which phrase did you hear?',
    choices: ['谢谢 (merci)', '对不起 (désolé)', '不客气 (de rien)', '不好意思 (excusez-moi)'],
    correctIndex: 3,
    explanation: '不好意思 = bù hǎo yìsi. Trois syllabes, intonation descendante-montante-descendante-neutre.',
    explanationEn: '不好意思 = bù hǎo yìsi. Four syllables with falling-rising-falling-neutral tone pattern.',
    audioHanzi: '\u4E0D\u597D\u610F\u601D',
    autoPlay: true
  },
  {
    id: 'cecr-a1-hello-m2-mcq-reverse',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Comment dire « Ce n\u2019est rien » (en réponse à une excuse) ?',
    promptEn: 'How to say «It\u2019s nothing» (replying to an apology)?',
    choices: ['不客气', '没关系', '打扰了', '麻烦你'],
    correctIndex: 1,
    explanation: '没关系 (méi guānxi) = littéralement « pas de relation/conséquence ». Réponse exclusive à 对不起 ou 不好意思.',
    explanationEn: '没关系 (méi guānxi) = literally «no relation/consequence». Exclusive reply to 对不起 or 不好意思.'
  }
];

// --- A1 Hello M3 : Se présenter -------------------------------------------
// Flashcards : 我叫, 我是, 你叫什么, 名字, 很高兴, 认识, 你呢, 我也是
const A1_HELLO_M3: LessonV2Exercise[] = [
  {
    id: 'cecr-a1-hello-m3-gq1',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Quelle structure est la plus naturelle pour dire son nom ?',
    promptEn: 'Which structure is the most natural to state your name?',
    choices: ['我叫保罗', '我是叫保罗', '我名字保罗', '保罗我'],
    correctIndex: 0,
    explanation: '我叫 + nom = structure standard (« on m\u2019appelle… »). 我是 + 保罗 est accepté mais moins idiomatique. Ne jamais combiner 是 + 叫.',
    explanationEn: '我叫 + name = standard («I\u2019m called…»). 我是 + Paul is OK but less idiomatic. Never combine 是 + 叫.'
  },
  {
    id: 'cecr-a1-hello-m3-fill1',
    type: 'fill',
    category: 'grammar',
    prompt: 'Demander son nom à quelqu\u2019un.',
    promptEn: 'Ask someone\u2019s name.',
    sentence: '\u4F60___\u4EC0\u4E48\u540D\u5B57\uFF1F',
    sentenceEn: 'What\u2019s your name?',
    choices: ['\u662F', '\u53EB', '\u6709', '\u60F3'],
    correctIndex: 1,
    explanation: '叫 = « s\u2019appeler » (verbe). 你叫什么名字 ? est la formule standard pour demander un prénom.',
    explanationEn: '叫 = «to be called» (verb). 你叫什么名字? is the standard «what\u2019s your name?».'
  },
  {
    id: 'cecr-a1-hello-m3-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Ordonne : « Enchanté de te connaître, et toi ? »',
    promptEn: 'Reorder: «Nice to meet you, and you?»',
    sentence: 'Enchanté de te connaître, et toi ?',
    sentenceEn: 'Nice to meet you, and you?',
    choices: ['\u5F88', '\u9AD8\u5174', '\u8BA4\u8BC6\u4F60', '\uFF0C', '\u4F60\u5462'],
    correctIndex: 0,
    explanation: 'Ordre canonique : 很高兴认识你，你呢 ? 很高兴 (très heureux) + 认识 (connaître) + 你. 你呢 renvoie la question.',
    explanationEn: 'Canonical order: 很高兴认识你，你呢? 很高兴 (very happy) + 认识 (to know) + 你. 你呢 bounces back the question.'
  },
  {
    id: 'cecr-a1-hello-m3-trans-zh2fr',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « 我姓王，叫王小明。»',
    promptEn: 'Translate: «我姓王，叫王小明。»',
    choices: [
      'Mon prénom est Wang, je m\u2019appelle Xiao Ming.',
      'Mon nom de famille est Wang, je m\u2019appelle Wang Xiao Ming.',
      'Je suis Wang Xiao Ming, enchanté.',
      'Wang est mon ami, il s\u2019appelle Xiao Ming.'
    ],
    correctIndex: 1,
    explanation: '我姓X = « mon nom de famille est X » (formel). 我叫X = « on m\u2019appelle X » (nom complet). Combinaison typique dans un CV oral.',
    explanationEn: '我姓X = «my family name is X» (formal). 我叫X = «I\u2019m called X» (full name). Typical combo in a formal intro.'
  },
  {
    id: 'cecr-a1-hello-m3-trans-fr2zh',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « Moi aussi, enchanté ! »',
    promptEn: 'Translate: «Me too, nice to meet you!»',
    choices: [
      '\u4F60\u4E5F\u9AD8\u5174\u3002',
      '\u6211\u4E5F\u662F\uFF0C\u5F88\u9AD8\u5174\u8BA4\u8BC6\u4F60\uFF01',
      '\u6211\u9AD8\u5174\uFF0C\u4F60\u5462\uFF1F',
      '\u8BA4\u8BC6\u4F60\u6211\u4E5F\u3002'
    ],
    correctIndex: 1,
    explanation: '我也是 = « moi aussi » (littéralement « moi aussi je le suis »). On enchaîne avec 很高兴认识你 pour boucler l\u2019échange.',
    explanationEn: '我也是 = «me too» (literally «I also am»). Follow with 很高兴认识你 to close the exchange.'
  },
  {
    id: 'cecr-a1-hello-m3-err1',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Quel mot est de trop : « 我 / 是 / 叫 / 小明 » ?',
    promptEn: 'Which word is extra in «我 / 是 / 叫 / 小明»?',
    sentence: '\u6211 / \u662F / \u53EB / \u5C0F\u660E',
    choices: ['\u6211', '\u662F', '\u53EB', '\u5C0F\u660E'],
    correctIndex: 1,
    explanation: '是 + 叫 est redondant. On dit soit 我叫小明 (usuel), soit 我是小明 (= « je suis Xiao Ming »). Jamais 我是叫.',
    explanationEn: '是 + 叫 is redundant. Say either 我叫小明 (usual) or 我是小明 (= «I am Xiao Ming»). Never 我是叫.'
  },
  {
    id: 'cecr-a1-hello-m3-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute — quel mot viens-tu d\u2019entendre ?',
    promptEn: 'Listen — which word did you hear?',
    choices: [
      '名字 (le prénom)',
      '认识 (connaître)',
      '高兴 (content)',
      '也是 (également)'
    ],
    correctIndex: 1,
    explanation: '认识 = rèn shi (ton 4 + neutre). Signifie « faire connaissance, reconnaître ». Phrase clé : 很高兴认识你.',
    explanationEn: '认识 = rèn shi (tone 4 + neutral). Means «to get acquainted, recognize». Key phrase: 很高兴认识你.',
    audioHanzi: '\u8BA4\u8BC6',
    autoPlay: true
  },
  {
    id: 'cecr-a1-hello-m3-mcq-reverse',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Quelle formule renvoie la question à son interlocuteur (« et toi ? ») ?',
    promptEn: 'Which phrase bounces the question back («and you?»)?',
    choices: ['你呢', '我也是', '认识你', '你是谁'],
    correctIndex: 0,
    explanation: '你呢 ? = « et toi ? » en fin de réplique. Très idiomatique, évite de reposer la question complète.',
    explanationEn: '你呢? = «and you?» at the end of a reply. Very idiomatic, avoids repeating the full question.'
  }
];

// --- A1 Hello M4 : D'où viens-tu ? -----------------------------------------
// Flashcards : 哪里, 来自, 中国, 法国, 美国, 英国, 国家, 人
const A1_HELLO_M4: LessonV2Exercise[] = [
  {
    id: 'cecr-a1-hello-m4-gq1',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Comment former « je suis Français » ?',
    promptEn: 'How to form «I am French»?',
    choices: ['我是法国', '我是法国人', '我法国人', '我来法国'],
    correctIndex: 1,
    explanation: 'Pays + 人 = nationalité. 法国人 = Français, 中国人 = Chinois. Oublier 人 donne « je suis la France ».',
    explanationEn: 'Country + 人 = nationality. 法国人 = French, 中国人 = Chinese. Omitting 人 means «I am France».'
  },
  {
    id: 'cecr-a1-hello-m4-fill1',
    type: 'fill',
    category: 'vocabulary',
    prompt: 'Annoncer ton origine avec 来自.',
    promptEn: 'State your origin with 来自.',
    sentence: '\u6211___\u6CD5\u56FD\u3002',
    sentenceEn: 'I come from France.',
    choices: ['\u662F', '\u6765\u81EA', '\u53BB', '\u5230'],
    correctIndex: 1,
    explanation: '来自 = « venir de » (littéralement « venir/depuis »). 我来自法国 = 我是法国人 (équivalents).',
    explanationEn: '来自 = «come from» (literally «come/from»). 我来自法国 = 我是法国人 (equivalent).'
  },
  {
    id: 'cecr-a1-hello-m4-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Ordonne la question : « Tu es de quel pays ? »',
    promptEn: 'Reorder: «What country are you from?»',
    sentence: 'Tu es de quel pays ?',
    sentenceEn: 'What country are you from?',
    choices: ['\u4F60', '\u662F', '\u54EA\u56FD', '\u4EBA', '\uFF1F'],
    correctIndex: 0,
    explanation: 'Ordre : 你 + 是 + 哪 + 国 + 人 + ？. 哪国人 = « de quelle nationalité ». Note : 哪 remplace 什么 devant 国.',
    explanationEn: 'Order: 你 + 是 + 哪 + 国 + 人 + ?. 哪国人 = «what nationality». 哪 replaces 什么 before 国.'
  },
  {
    id: 'cecr-a1-hello-m4-trans-zh2fr',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « 你从哪里来？»',
    promptEn: 'Translate: «你从哪里来?»',
    choices: [
      'Où vas-tu ?',
      'D\u2019où viens-tu ?',
      'Où es-tu né ?',
      'Où habites-tu ?'
    ],
    correctIndex: 1,
    explanation: '从 + 哪里 + 来 = « venir d\u2019où ». Équivalent plus oral que 你来自哪里 ? On répond avec 我从…来 ou 我来自….',
    explanationEn: '从 + 哪里 + 来 = «come from where». More casual than 你来自哪里? Answer with 我从…来 or 我来自….'
  },
  {
    id: 'cecr-a1-hello-m4-trans-fr2zh',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « Je suis Américain. »',
    promptEn: 'Translate: «I am American.»',
    choices: [
      '\u6211\u662F\u82F1\u56FD\u4EBA\u3002',
      '\u6211\u662F\u7F8E\u56FD\u4EBA\u3002',
      '\u6211\u6765\u81EA\u4E2D\u56FD\u3002',
      '\u6211\u662F\u7F8E\u56FD\u3002'
    ],
    correctIndex: 1,
    explanation: '美国 = USA (littéralement « pays magnifique » — transcription historique). 美国人 = Américain. 英国人 = Britannique.',
    explanationEn: '美国 = USA (literally «beautiful country» — historical transcription). 美国人 = American. 英国人 = British.'
  },
  {
    id: 'cecr-a1-hello-m4-err1',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Quel segment manque dans « 我 / 是 / 中国 » ?',
    promptEn: 'Which segment is missing in «我 / 是 / 中国»?',
    sentence: '\u6211 / \u662F / \u4E2D\u56FD',
    choices: [
      'Il manque 从 avant 中国',
      'Il manque 人 après 中国',
      'Il manque 在 après 是',
      'Il ne manque rien'
    ],
    correctIndex: 1,
    explanation: 'Sans 人, 我是中国 = « je suis la Chine ». Pour dire « je suis Chinois », il faut toujours ajouter 人.',
    explanationEn: 'Without 人, 我是中国 = «I am China». To say «I\u2019m Chinese», always add 人.'
  },
  {
    id: 'cecr-a1-hello-m4-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute — quel pays est mentionné ?',
    promptEn: 'Listen — which country is mentioned?',
    choices: ['法国 (France)', '美国 (USA)', '英国 (Royaume-Uni)', '中国 (Chine)'],
    correctIndex: 0,
    explanation: '法国 = fǎ guó. Le 法 (fǎ) est ton 3 : descend puis remonte. Distinction clé avec 美国 (měi guó) et 英国 (yīng guó).',
    explanationEn: '法国 = fǎ guó. 法 (fǎ) is tone 3: dips then rises. Key distinction from 美国 (měi guó) and 英国 (yīng guó).',
    audioHanzi: '\u6CD5\u56FD',
    autoPlay: true
  },
  {
    id: 'cecr-a1-hello-m4-mcq-reverse',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Quel caractère signifie « pays » et compose tous les noms de pays ?',
    promptEn: 'Which character means «country» and builds every country name?',
    choices: ['\u4EBA', '\u56FD', '\u54EA', '\u6765'],
    correctIndex: 1,
    explanation: '国 (guó) = pays. Sert de suffixe : 中国 (pays central), 法国, 美国, 英国, 日本国 (ancien). 国家 = « (le) pays/État ».',
    explanationEn: '国 (guó) = country. Suffix in: 中国 (central country), 法国, 美国, 英国. 国家 = «nation/state».'
  }
];

// ============================================================================
//  A1 — NUMBERS / NOMBRES & TEMPS (5 modules)
// ============================================================================

// --- A1 Numbers M1 : Compter de 0 à 10 ------------------------------------
// Flashcards : 零, 一, 二, 三, 四, 五, 六, 七, 八, 九, 十
const A1_NUMBERS_M1: LessonV2Exercise[] = [
  {
    id: 'cecr-a1-numbers-m1-gq1',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Comment dire « deux personnes » ?',
    promptEn: 'How to say «two people»?',
    choices: ['二个人', '两个人', '二人们', '两二人'],
    correctIndex: 1,
    explanation: 'Devant un classificateur (ici 个), on utilise 两 (liǎng), jamais 二. 两个人 = 2 personnes. 二 reste pour les numéros abstraits (第二, 十二, téléphone…).',
    explanationEn: 'Before a classifier (here 个), use 两 (liǎng), never 二. 两个人 = 2 people. 二 stays for abstract numbers (ordinals, phone numbers…).'
  },
  {
    id: 'cecr-a1-numbers-m1-fill1',
    type: 'fill',
    category: 'vocabulary',
    prompt: 'Lis à haute voix.',
    promptEn: 'Read aloud.',
    sentence: '\u6211\u5BB6\u6709___\u4E2A\u4EBA\uFF08=4 personnes\uFF09\u3002',
    sentenceEn: 'My family has ___ people (= 4).',
    choices: ['\u56DB', '\u516B', '\u4E8C', '\u5341'],
    correctIndex: 0,
    explanation: '四 = 4 (sì, ton 4). Avec 个人, on garde 四 (contrairement à 二 qui devient 两, les autres chiffres ne changent pas).',
    explanationEn: '四 = 4 (sì, tone 4). With 个人, keep 四 (unlike 二 which becomes 两, other digits stay the same).'
  },
  {
    id: 'cecr-a1-numbers-m1-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Ordonne : « huit juin » (le 8 juin).',
    promptEn: 'Reorder: «June 8th».',
    sentence: 'le 8 juin',
    sentenceEn: 'June 8th',
    choices: ['\u516D', '\u6708', '\u516B', '\u65E5'],
    correctIndex: 0,
    explanation: 'Ordre chinois grand → petit : mois + 月 + jour + 日. 六月八日 = « 6ᵉ mois, 8ᵉ jour ». L\u2019inverse du français/anglais.',
    explanationEn: 'Chinese order big → small: month + 月 + day + 日. 六月八日 = «6th month, 8th day». Opposite of French/English.'
  },
  {
    id: 'cecr-a1-numbers-m1-trans-zh2fr',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « 我七岁，他十岁。»',
    promptEn: 'Translate: «我七岁，他十岁。»',
    choices: [
      'J\u2019ai 10 ans, il a 7 ans.',
      'J\u2019ai 7 ans, il a 10 ans.',
      'Nous avons 7 et 10 ans.',
      'J\u2019ai 7 ans, il en a 11.'
    ],
    correctIndex: 1,
    explanation: '七 = 7 (qī), 十 = 10 (shí). 岁 = « an(s) d\u2019âge ». Attention à ne pas inverser les deux tons : qī (ton 1 haut plat) vs shí (ton 2 montant).',
    explanationEn: '七 = 7 (qī), 十 = 10 (shí). 岁 = «years of age». Don\u2019t mix up the tones: qī (tone 1 high flat) vs shí (tone 2 rising).'
  },
  {
    id: 'cecr-a1-numbers-m1-trans-fr2zh',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « zéro trois cinq » (un début de numéro de tél).',
    promptEn: 'Translate: «zero three five» (phone-number style).',
    choices: ['\u96F6\u4E09\u4E94', '\u4E09\u96F6\u4E94', '\u96F6\u4E94\u4E09', '\u5341\u4E09\u4E94'],
    correctIndex: 0,
    explanation: 'Les numéros de téléphone se lisent chiffre par chiffre, dans l\u2019ordre. 零三五 = 0-3-5. Les Chinois épèlent souvent 一 comme « yāo » à l\u2019oral pour éviter la confusion avec 七.',
    explanationEn: 'Phone numbers are read digit by digit, in order. 零三五 = 0-3-5. Spoken Chinese often pronounces 一 as «yāo» to avoid confusion with 七.'
  },
  {
    id: 'cecr-a1-numbers-m1-err1',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Quel est le mot incorrect dans « 我有 / 二 / 个 / 朋友 » ?',
    promptEn: 'Which word is wrong in «我有 / 二 / 个 / 朋友»?',
    sentence: '\u6211\u6709 / \u4E8C / \u4E2A / \u670B\u53CB',
    choices: ['\u6211\u6709', '\u4E8C', '\u4E2A', '\u670B\u53CB'],
    correctIndex: 1,
    explanation: 'Devant un classificateur (个), on utilise 两, pas 二. Correct : 我有两个朋友 (« j\u2019ai deux amis »).',
    explanationEn: 'Before a classifier (个), use 两, not 二. Correct: 我有两个朋友 («I have two friends»).'
  },
  {
    id: 'cecr-a1-numbers-m1-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute — quel chiffre ?',
    promptEn: 'Listen — which digit?',
    choices: ['四 (4, sì)', '十 (10, shí)', '是 (shì, être)', '七 (7, qī)'],
    correctIndex: 1,
    explanation: '十 = shí (ton 2, montant). 四 = sì (ton 4, descendant). 是 = shì (ton 4, descendant) — même voyelle que 四 mais consonne différente. 七 = qī (ton 1).',
    explanationEn: '十 = shí (tone 2, rising). 四 = sì (tone 4, falling). 是 = shì (tone 4, falling) — same vowel as 四 but different consonant. 七 = qī (tone 1).',
    audioHanzi: '\u5341',
    autoPlay: true
  },
  {
    id: 'cecr-a1-numbers-m1-mcq-reverse',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Quel caractère signifie « zéro » et s\u2019écrit parfois comme un petit cercle ?',
    promptEn: 'Which character means «zero» and is sometimes written as a small circle?',
    choices: ['\u96F6', '\u4E00', '\u767E', '\u5341'],
    correctIndex: 0,
    explanation: '零 (líng) = zéro. Dans l\u2019écriture familière ou numérique, on trouve aussi ○. Utilisé partout (adresses, téléphones, dates).',
    explanationEn: '零 (líng) = zero. In casual or numeric writing, ○ is also used. Appears in addresses, phone numbers, dates.'
  }
];

// --- A1 Numbers M2 : De 11 à 100 ------------------------------------------
// Flashcards : 十一, 二十, 五十, 九十九, 一百, 两百, 五百, 一千
const A1_NUMBERS_M2: LessonV2Exercise[] = [
  {
    id: 'cecr-a1-numbers-m2-gq1',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Comment écrit-on 35 en chinois ?',
    promptEn: 'How do you write 35 in Chinese?',
    choices: ['\u4E09\u5341\u4E94', '\u4E09\u5341\u96F6\u4E94', '\u4E94\u5341\u4E09', '\u4E09\u5341\u5341\u4E94'],
    correctIndex: 0,
    explanation: 'Logique mathématique : 3 × 10 + 5 = 三十五. Pas de 零 entre la dizaine et l\u2019unité (seulement si on saute un rang : 一百零五 = 105).',
    explanationEn: 'Mathematical logic: 3 × 10 + 5 = 三十五. No 零 between tens and units (only when skipping a rank: 一百零五 = 105).'
  },
  {
    id: 'cecr-a1-numbers-m2-fill1',
    type: 'fill',
    category: 'grammar',
    prompt: 'Complète pour obtenir 105.',
    promptEn: 'Fill to get 105.',
    sentence: '\u4E00\u767E___\u4E94',
    sentenceEn: 'one hundred ___ five (= 105)',
    choices: ['\u96F6', '\u5341', '\u4E00', '\u4E8C'],
    correctIndex: 0,
    explanation: '一百零五 = 100 + 0 (dizaines vides) + 5. Le 零 est OBLIGATOIRE pour marquer le saut de rang. Sans lui : 一百五 se lit 150 (= 百 + 5 dizaines).',
    explanationEn: '一百零五 = 100 + 0 (empty tens) + 5. 零 is MANDATORY to mark a skipped rank. Without it, 一百五 reads as 150.'
  },
  {
    id: 'cecr-a1-numbers-m2-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Ordonne pour écrire 99 (quatre-vingt-dix-neuf).',
    promptEn: 'Reorder to write 99 (ninety-nine).',
    sentence: '99',
    sentenceEn: '99',
    choices: ['\u4E5D', '\u5341', '\u4E5D'],
    correctIndex: 0,
    explanation: '九十九 = 9 × 10 + 9. Beaucoup plus régulier que « quatre-vingt-dix-neuf ».',
    explanationEn: '九十九 = 9 × 10 + 9. Much more regular than «quatre-vingt-dix-neuf».'
  },
  {
    id: 'cecr-a1-numbers-m2-trans-zh2fr',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « 这本书两百块钱。»',
    promptEn: 'Translate: «这本书两百块钱。»',
    choices: [
      'Ce livre coûte 22 yuans.',
      'Ce livre coûte 200 yuans.',
      'Ce livre coûte 2000 yuans.',
      'Ce livre coûte 20 yuans.'
    ],
    correctIndex: 1,
    explanation: '两百 = 200 (200 est un nombre « comptable » donc 两, pas 二). 块 = unité informelle pour le yuan (= 元). 两百块 = 200 yuans.',
    explanationEn: '两百 = 200 (200 is «countable», so 两, not 二). 块 = casual unit for yuan (= 元). 两百块 = 200 yuans.'
  },
  {
    id: 'cecr-a1-numbers-m2-trans-fr2zh',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « mille trois cents » (1 300).',
    promptEn: 'Translate: «one thousand three hundred» (1,300).',
    choices: ['\u4E00\u5343\u4E09', '\u4E00\u5343\u4E09\u767E', '\u4E00\u4E09\u767E', '\u5343\u4E09\u767E'],
    correctIndex: 1,
    explanation: '1 300 = 1 × 1000 + 3 × 100 = 一千三百. Attention : 一千三 se comprend 1 300 à l\u2019oral (par abréviation), mais la forme pleine 一千三百 est plus sûre à l\u2019écrit.',
    explanationEn: '1,300 = 1 × 1000 + 3 × 100 = 一千三百. Note: 一千三 can be understood as 1,300 orally (abbreviated), but the full form 一千三百 is safer in writing.'
  },
  {
    id: 'cecr-a1-numbers-m2-err1',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Quel segment doit être ajouté dans « 一百 / 五 » pour signifier 105 ?',
    promptEn: 'Which segment must be added in «一百 / 五» to mean 105?',
    sentence: '\u4E00\u767E / \u4E94',
    choices: [
      'Ajouter 十 entre 一百 et 五',
      'Ajouter 零 entre 一百 et 五',
      'Ajouter 千 devant 一百',
      'Rien à ajouter'
    ],
    correctIndex: 1,
    explanation: 'Sans 零, 一百五 = 150 (car le « 5 » se lit comme un demi : 一百五 = 100 + 50). Avec 零 : 一百零五 = 105. Le 零 est un marqueur obligatoire.',
    explanationEn: 'Without 零, 一百五 = 150 (because «5» reads as a half: 100 + 50). With 零: 一百零五 = 105. 零 is a mandatory marker.'
  },
  {
    id: 'cecr-a1-numbers-m2-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute — quel caractère de rang ?',
    promptEn: 'Listen — which rank character?',
    choices: ['百 (100)', '千 (1 000)', '万 (10 000)', '十 (10)'],
    correctIndex: 2,
    explanation: '万 = wàn (ton 4 descendant) = 10 000. Unité à part en chinois : 100 000 = 十万 (« 10 × wàn »), 1 000 000 = 一百万 (« 100 × wàn »).',
    explanationEn: '万 = wàn (tone 4 falling) = 10,000. Its own unit: 100,000 = 十万 («10 × wàn»), 1,000,000 = 一百万 («100 × wàn»).',
    audioHanzi: '\u4E07',
    autoPlay: true
  },
  {
    id: 'cecr-a1-numbers-m2-mcq-reverse',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Pour dire « 200 », quelle est la forme la plus courante à l\u2019oral ?',
    promptEn: 'To say «200», which form is most common orally?',
    choices: ['\u4E8C\u767E', '\u4E24\u767E', '\u4E00\u767E\u4E8C', '\u4E8C\u5341\u767E'],
    correctIndex: 1,
    explanation: '两百 domine à l\u2019oral (comme pour 两个). 二百 reste acceptable à l\u2019écrit formel. 一百二 = 120. 二十百 n\u2019existe pas.',
    explanationEn: '两百 dominates orally (like 两个). 二百 is still OK in formal writing. 一百二 = 120. 二十百 doesn\u2019t exist.'
  }
];

// --- A1 Numbers M3 : Jours & semaine --------------------------------------
// Flashcards : 星期一..六, 星期天, 今天, 明天, 昨天
const A1_NUMBERS_M3: LessonV2Exercise[] = [
  {
    id: 'cecr-a1-numbers-m3-gq1',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Comment dit-on « dimanche » en chinois ?',
    promptEn: 'How to say «Sunday» in Chinese?',
    choices: ['\u661F\u671F\u4E03', '\u661F\u671F\u516B', '\u661F\u671F\u5929', '\u661F\u671F\u9646'],
    correctIndex: 2,
    explanation: 'Exception majeure : le dimanche n\u2019est PAS 星期七. On dit 星期天 (oral) ou 星期日 (écrit). Tous les autres jours sont numérotés (星期一 = lundi…星期六 = samedi).',
    explanationEn: 'Major exception: Sunday is NOT 星期七. Say 星期天 (oral) or 星期日 (written). All other days are numbered (星期一 = Monday…星期六 = Saturday).'
  },
  {
    id: 'cecr-a1-numbers-m3-fill1',
    type: 'fill',
    category: 'vocabulary',
    prompt: 'Quel est le jour d\u2019hier si aujourd\u2019hui est mercredi ?',
    promptEn: 'If today is Wednesday, what was yesterday?',
    sentence: '\u6628\u5929\u662F___\u3002',
    sentenceEn: 'Yesterday was ___.',
    choices: ['\u661F\u671F\u4E00', '\u661F\u671F\u4E8C', '\u661F\u671F\u56DB', '\u661F\u671F\u4E94'],
    correctIndex: 1,
    explanation: 'Mercredi = 星期三, donc la veille = 星期二 (mardi). Mémo : 星期 + numéro = numéro du jour dans la semaine (en partant du lundi).',
    explanationEn: 'Wednesday = 星期三, so the day before = 星期二 (Tuesday). Mnemonic: 星期 + number = day\u2019s position in the week (starting Monday).'
  },
  {
    id: 'cecr-a1-numbers-m3-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Ordonne : « lundi prochain ».',
    promptEn: 'Reorder: «next Monday».',
    sentence: 'lundi prochain',
    sentenceEn: 'next Monday',
    choices: ['\u4E0B', '\u4E2A', '\u661F\u671F', '\u4E00'],
    correctIndex: 0,
    explanation: 'Structure 下个 + unité de temps : 下个星期 = la semaine prochaine. + numéro = jour précis. 下个星期一 = lundi prochain.',
    explanationEn: 'Structure 下个 + time unit: 下个星期 = next week. + number = specific day. 下个星期一 = next Monday.'
  },
  {
    id: 'cecr-a1-numbers-m3-trans-zh2fr',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « 我明天上班。»',
    promptEn: 'Translate: «我明天上班。»',
    choices: [
      'Je travaille aujourd\u2019hui.',
      'Je travaille demain.',
      'J\u2019ai travaillé hier.',
      'Je travaille cette semaine.'
    ],
    correctIndex: 1,
    explanation: '明天 = demain (míng tiān, ton 2 + ton 1). 上班 = aller au travail. Le temps est souvent en tête de phrase en chinois, sans conjugaison.',
    explanationEn: '明天 = tomorrow (míng tiān, tone 2 + tone 1). 上班 = go to work. Time usually sits at the start of a Chinese sentence, no conjugation needed.'
  },
  {
    id: 'cecr-a1-numbers-m3-trans-fr2zh',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « Hier, c\u2019était samedi. »',
    promptEn: 'Translate: «Yesterday was Saturday.»',
    choices: [
      '\u660E\u5929\u662F\u661F\u671F\u516D\u3002',
      '\u6628\u5929\u662F\u661F\u671F\u516D\u3002',
      '\u4ECA\u5929\u662F\u661F\u671F\u516D\u3002',
      '\u6628\u5929\u662F\u661F\u671F\u5929\u3002'
    ],
    correctIndex: 1,
    explanation: '昨天 = hier, 星期六 = samedi. Pas d\u2019imparfait en chinois : le verbe 是 reste au présent, c\u2019est le mot 昨天 qui situe dans le passé.',
    explanationEn: '昨天 = yesterday, 星期六 = Saturday. No imperfect in Chinese: the verb 是 stays in present form; 昨天 handles the past.'
  },
  {
    id: 'cecr-a1-numbers-m3-err1',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Quel jour est écrit INCORRECTEMENT : « 星期一 / 星期三 / 星期七 / 星期六 » ?',
    promptEn: 'Which day is written INCORRECTLY among «星期一 / 星期三 / 星期七 / 星期六»?',
    sentence: '\u661F\u671F\u4E00 / \u661F\u671F\u4E09 / \u661F\u671F\u4E03 / \u661F\u671F\u516D',
    choices: ['\u661F\u671F\u4E00', '\u661F\u671F\u4E09', '\u661F\u671F\u4E03', '\u661F\u671F\u516D'],
    correctIndex: 2,
    explanation: '星期七 n\u2019existe pas. Le dimanche est 星期天 (ou 星期日). Erreur fréquente des apprenants qui appliquent la logique au 7ᵉ jour.',
    explanationEn: '星期七 doesn\u2019t exist. Sunday is 星期天 (or 星期日). A common learner mistake extending the number logic to day 7.'
  },
  {
    id: 'cecr-a1-numbers-m3-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute — à quel moment fait-il référence ?',
    promptEn: 'Listen — which time does it refer to?',
    choices: ['aujourd\u2019hui (今天)', 'demain (明天)', 'hier (昨天)', 'maintenant (现在)'],
    correctIndex: 1,
    explanation: '明天 = míng tiān (ton 2 + ton 1). 今天 = jīn tiān (ton 1 + ton 1), 昨天 = zuó tiān (ton 2 + ton 1). Distinction par la 1ʳᵉ syllabe.',
    explanationEn: '明天 = míng tiān (tone 2 + tone 1). 今天 = jīn tiān (tone 1 + tone 1), 昨天 = zuó tiān (tone 2 + tone 1). Tell them apart by the first syllable.',
    audioHanzi: '\u660E\u5929',
    autoPlay: true
  },
  {
    id: 'cecr-a1-numbers-m3-mcq-reverse',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Quel est le synonyme court et oral de 星期 (la semaine) ?',
    promptEn: 'Which is the short, oral synonym of 星期 (week)?',
    choices: ['\u793C\u62DC', '\u5468', '\u65E5\u5B50', '\u5C0F\u65F6'],
    correctIndex: 1,
    explanation: '周 (zhōu) = synonyme plus court. 周一 = 星期一. 礼拜 (lǐ bài) existe aussi, plus familier. Les trois cohabitent.',
    explanationEn: '周 (zhōu) = shorter synonym. 周一 = 星期一. 礼拜 (lǐ bài) also exists, more colloquial. All three coexist.'
  }
];

// --- A1 Numbers M4 : L'heure qu'il est -------------------------------------
// Flashcards : 现在, 几点, 点, 分, 半, 刻, 早上, 晚上, 中午
const A1_NUMBERS_M4: LessonV2Exercise[] = [
  {
    id: 'cecr-a1-numbers-m4-gq1',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Comment demander l\u2019heure en chinois ?',
    promptEn: 'How do you ask the time in Chinese?',
    choices: [
      '\u73B0\u5728\u4EC0\u4E48\u70B9\uFF1F',
      '\u73B0\u5728\u51E0\u70B9\uFF1F',
      '\u73B0\u5728\u591A\u5C11\u70B9\uFF1F',
      '\u4EC0\u4E48\u70B9\u73B0\u5728\uFF1F'
    ],
    correctIndex: 1,
    explanation: '几 (jǐ) sert à demander un petit nombre (< 10) : 几点 ? = « quelle heure ? ». 什么点 est incorrect. 多少 s\u2019emploie pour les grands nombres.',
    explanationEn: '几 (jǐ) asks for a small number (< 10): 几点? = «what time?». 什么点 is wrong. 多少 is for large numbers.'
  },
  {
    id: 'cecr-a1-numbers-m4-fill1',
    type: 'fill',
    category: 'vocabulary',
    prompt: 'Il est 3h30.',
    promptEn: 'It\u2019s 3:30.',
    sentence: '\u73B0\u5728\u4E09\u70B9___\u3002',
    sentenceEn: 'It is 3 ___.',
    choices: ['\u523B', '\u534A', '\u5206', '\u4E2D'],
    correctIndex: 1,
    explanation: '半 = demi. 三点半 = 3h30. 三点一刻 = 3h15 (un quart), 三点三刻 = 3h45. 三点十分 = 3h10.',
    explanationEn: '半 = half. 三点半 = 3:30. 三点一刻 = 3:15 (a quarter), 三点三刻 = 3:45. 三点十分 = 3:10.'
  },
  {
    id: 'cecr-a1-numbers-m4-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Ordonne : « 8h du matin ».',
    promptEn: 'Reorder: «8 a.m.».',
    sentence: '8 h du matin',
    sentenceEn: '8 a.m.',
    choices: ['\u65E9\u4E0A', '\u516B', '\u70B9'],
    correctIndex: 0,
    explanation: 'En chinois, on précise TOUJOURS la partie de la journée AVANT l\u2019heure : 早上/上午 (matin), 下午 (après-midi), 晚上 (soir), 中午 (midi). 早上八点 = 8h du matin.',
    explanationEn: 'In Chinese, ALWAYS state the time of day BEFORE the hour: 早上/上午 (morning), 下午 (afternoon), 晚上 (evening), 中午 (noon). 早上八点 = 8 a.m.'
  },
  {
    id: 'cecr-a1-numbers-m4-trans-zh2fr',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « 我们晚上七点见。»',
    promptEn: 'Translate: «我们晚上七点见。»',
    choices: [
      'On se voit à 7h du matin.',
      'On se voit à 19h.',
      'On se voit dans 7 heures.',
      'On s\u2019est vus à 7h hier soir.'
    ],
    correctIndex: 1,
    explanation: '晚上七点 = 7h du soir = 19h (les Chinois raisonnent en horloge 12h avec précision du moment). 见 en fin = « se voir / rendez-vous ».',
    explanationEn: '晚上七点 = 7 p.m. = 19:00 (Chinese use a 12-hour clock with time-of-day markers). 见 at the end = «meet / see you».'
  },
  {
    id: 'cecr-a1-numbers-m4-trans-fr2zh',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « Il est midi. »',
    promptEn: 'Translate: «It\u2019s noon.»',
    choices: [
      '\u73B0\u5728\u4E0A\u5348\u5341\u4E8C\u70B9\u3002',
      '\u73B0\u5728\u4E2D\u5348\u5341\u4E8C\u70B9\u3002',
      '\u73B0\u5728\u665A\u4E0A\u5341\u4E8C\u70B9\u3002',
      '\u73B0\u5728\u5341\u4E8C\u70B9\u534A\u3002'
    ],
    correctIndex: 1,
    explanation: '中午 = midi (la mi-journée). 中午十二点 = 12h pile. 上午 = avant-midi (9-11h), 下午 = après-midi.',
    explanationEn: '中午 = noon (midday). 中午十二点 = exactly 12. 上午 = late morning (9-11), 下午 = afternoon.'
  },
  {
    id: 'cecr-a1-numbers-m4-err1',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Quel segment est mal placé : « 八点 / 早上 / 现在 / 是 » ?',
    promptEn: 'Which segment is misplaced in «八点 / 早上 / 现在 / 是»?',
    sentence: '\u516B\u70B9 / \u65E9\u4E0A / \u73B0\u5728 / \u662F',
    choices: ['\u516B\u70B9', '\u65E9\u4E0A', '\u73B0\u5728', '\u662F'],
    correctIndex: 0,
    explanation: 'Ordre correct : 现在是早上八点 (« maintenant c\u2019est 8h du matin »). Le moment (早上) vient AVANT l\u2019heure (八点), jamais après.',
    explanationEn: 'Correct order: 现在是早上八点 («it\u2019s now 8 in the morning»). The time-of-day (早上) comes BEFORE the hour (八点), never after.'
  },
  {
    id: 'cecr-a1-numbers-m4-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute — quel moment de la journée ?',
    promptEn: 'Listen — which part of the day?',
    choices: ['早上 (matin)', '中午 (midi)', '下午 (après-midi)', '晚上 (soir)'],
    correctIndex: 3,
    explanation: '晚上 = wǎn shàng (ton 3 + ton 4). Contraste avec 早上 (zǎo shàng, tons 3+4) et 中午 (zhōng wǔ, tons 1+3).',
    explanationEn: '晚上 = wǎn shàng (tone 3 + tone 4). Contrast with 早上 (zǎo shàng, tones 3+4) and 中午 (zhōng wǔ, tones 1+3).',
    audioHanzi: '\u665A\u4E0A',
    autoPlay: true
  },
  {
    id: 'cecr-a1-numbers-m4-mcq-reverse',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Quel caractère sépare l\u2019heure et les minutes (ex. 3h → 3___) ?',
    promptEn: 'Which character marks the hour (e.g. 3 o\u2019clock → 3___)?',
    choices: ['\u5206', '\u534A', '\u523B', '\u70B9'],
    correctIndex: 3,
    explanation: '点 (diǎn) = « heure pile » (marqueur d\u2019heure). 分 = minute, 半 = demi, 刻 = quart. Structure : H + 点 + M + 分.',
    explanationEn: '点 (diǎn) = «o\u2019clock» (hour marker). 分 = minute, 半 = half, 刻 = quarter. Structure: H + 点 + M + 分.'
  }
];

// --- A1 Numbers M5 : Mois & dates -----------------------------------------
// Flashcards : 一月, 二月, 号, 月, 年, 今年, 去年, 明年, 生日
const A1_NUMBERS_M5: LessonV2Exercise[] = [
  {
    id: 'cecr-a1-numbers-m5-gq1',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Quel est l\u2019ordre canonique d\u2019une date en chinois ?',
    promptEn: 'What is the canonical order of a Chinese date?',
    choices: [
      'jour > mois > année',
      'mois > jour > année',
      'année > mois > jour',
      'année > jour > mois'
    ],
    correctIndex: 2,
    explanation: 'Toujours du plus grand au plus petit : 2026年4月21日 = « 21 avril 2026 ». Logique inverse du français/anglais mais intuitive (on affine le contexte).',
    explanationEn: 'Always big to small: 2026年4月21日 = «21 April 2026». Opposite of French/English but intuitive (narrow the context down).'
  },
  {
    id: 'cecr-a1-numbers-m5-fill1',
    type: 'fill',
    category: 'vocabulary',
    prompt: 'Février en chinois.',
    promptEn: 'February in Chinese.',
    sentence: '\u4ECA\u5929\u662F___\u4E00\u53F7\u3002',
    sentenceEn: 'Today is ___ the 1st.',
    choices: ['\u4E8C\u6708', '\u4E24\u6708', '\u4E8C\u53F7', '\u4E8C\u5E74'],
    correctIndex: 0,
    explanation: 'Les mois sont numérotés : 一月 = janvier, 二月 = février, etc. jusqu\u2019à 十二月. Attention : pour les mois on garde TOUJOURS 二 (pas 两).',
    explanationEn: 'Months are numbered: 一月 = January, 二月 = February, etc. up to 十二月. Note: for months always use 二 (not 两).'
  },
  {
    id: 'cecr-a1-numbers-m5-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Ordonne : « le 18 avril 2026 ».',
    promptEn: 'Reorder: «April 18, 2026».',
    sentence: 'le 18 avril 2026',
    sentenceEn: 'April 18, 2026',
    choices: ['2026\u5E74', '4\u6708', '18\u65E5'],
    correctIndex: 0,
    explanation: 'Année + 年, mois + 月, jour + 日 (formel) ou 号 (oral). Ordre grand → petit : 2026年 4月 18日.',
    explanationEn: 'Year + 年, month + 月, day + 日 (formal) or 号 (oral). Big → small order: 2026年 4月 18日.'
  },
  {
    id: 'cecr-a1-numbers-m5-trans-zh2fr',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « 我的生日是十月三号。»',
    promptEn: 'Translate: «我的生日是十月三号。»',
    choices: [
      'Mon anniversaire est le 10 mars.',
      'Mon anniversaire est le 3 octobre.',
      'Mon anniversaire est le 13 octobre.',
      'Mon anniversaire est le 30 octobre.'
    ],
    correctIndex: 1,
    explanation: '十月 = 10ᵉ mois = octobre. 三号 = jour 3. Ordre chinois : mois + jour. Ne pas inverser comme en français !',
    explanationEn: '十月 = 10th month = October. 三号 = day 3. Chinese order: month + day. Don\u2019t flip as in French!'
  },
  {
    id: 'cecr-a1-numbers-m5-trans-fr2zh',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « L\u2019année prochaine, j\u2019aurai 30 ans. »',
    promptEn: 'Translate: «Next year, I\u2019ll be 30.»',
    choices: [
      '\u4ECA\u5E74\u6211\u4E09\u5341\u5C81\u3002',
      '\u53BB\u5E74\u6211\u4E09\u5341\u5C81\u3002',
      '\u660E\u5E74\u6211\u4E09\u5341\u5C81\u3002',
      '\u540E\u5E74\u6211\u4E09\u5341\u5C81\u3002'
    ],
    correctIndex: 2,
    explanation: '明年 = l\u2019année prochaine (miroir de 明天 = demain). 今年 = cette année, 去年 = l\u2019an dernier. 岁 = an(s) d\u2019âge. Pas de futur conjugué en chinois.',
    explanationEn: '明年 = next year (mirrors 明天 = tomorrow). 今年 = this year, 去年 = last year. 岁 = years of age. No future conjugation in Chinese.'
  },
  {
    id: 'cecr-a1-numbers-m5-err1',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Quel segment est mal placé : « 8号 / 2026年 / 6月 » ?',
    promptEn: 'Which segment is misplaced in «8号 / 2026年 / 6月»?',
    sentence: '8\u53F7 / 2026\u5E74 / 6\u6708',
    choices: ['8\u53F7', '2026\u5E74', '6\u6708'],
    correctIndex: 0,
    explanation: 'Ordre correct : 2026年 6月 8号. Le jour (8号) doit être en dernier, pas en premier. Règle chinoise : grand → petit.',
    explanationEn: 'Correct order: 2026年 6月 8号. Day (8号) comes last, not first. Chinese rule: big → small.'
  },
  {
    id: 'cecr-a1-numbers-m5-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute — à quelle année le mot fait-il référence ?',
    promptEn: 'Listen — which year does the word refer to?',
    choices: ['今年 (cette année)', '去年 (l\u2019an dernier)', '明年 (l\u2019an prochain)', '今天 (aujourd\u2019hui)'],
    correctIndex: 2,
    explanation: '明年 = míng nián (ton 2 + ton 2). 今年 = jīn nián (ton 1 + ton 2), 去年 = qù nián (ton 4 + ton 2). Distinction par la 1ʳᵉ syllabe.',
    explanationEn: '明年 = míng nián (tone 2 + tone 2). 今年 = jīn nián (tone 1 + tone 2), 去年 = qù nián (tone 4 + tone 2). First syllable is the tell.',
    audioHanzi: '\u660E\u5E74',
    autoPlay: true
  },
  {
    id: 'cecr-a1-numbers-m5-mcq-reverse',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Quel caractère marque le jour du mois à l\u2019oral (familier) ?',
    promptEn: 'Which character marks the day-of-month casually?',
    choices: ['\u65E5', '\u53F7', '\u5929', '\u6708'],
    correctIndex: 1,
    explanation: '号 = marqueur oral du jour (八号 = le 8). 日 est plus formel/écrit (八日). 天 = jour au sens « journée ». 月 = mois.',
    explanationEn: '号 = oral day marker (八号 = the 8th). 日 is more formal/written (八日). 天 = day as «a day». 月 = month.'
  }
];

// ============================================================================
//  A1 — FAMILY / FAMILLE, ÂGE, PRONOMS, COULEURS (4 modules)
// ============================================================================

// --- A1 Family M1 : Les membres de la famille -----------------------------
// Flashcards : 爸爸, 妈妈, 哥哥, 姐姐, 弟弟, 妹妹, 爷爷, 奶奶, 我的
const A1_FAMILY_M1: LessonV2Exercise[] = [
  {
    id: 'cecr-a1-family-m1-gq1',
    type: 'grammar-quiz',
    category: 'vocabulary',
    prompt: 'Comment dire « grande sœur » en chinois ?',
    promptEn: 'How to say «older sister»?',
    choices: ['\u59B9\u59B9', '\u59D0\u59D0', '\u59B9\u5C0F\u59D0', '\u5927\u59D0\u59B9'],
    correctIndex: 1,
    explanation: '姐姐 (jiě jie) = grande sœur, 妹妹 (mèi mei) = petite sœur. Le chinois distingue toujours aîné / cadet — pas de « sœur » neutre.',
    explanationEn: '姐姐 (jiě jie) = older sister, 妹妹 (mèi mei) = younger sister. Chinese always distinguishes elder/younger — no neutral «sister».'
  },
  {
    id: 'cecr-a1-family-m1-fill1',
    type: 'fill',
    category: 'grammar',
    prompt: 'Marque la possession.',
    promptEn: 'Mark possession.',
    sentence: '\u8FD9\u662F\u6211___\u5988\u5988\u3002',
    sentenceEn: 'This is my mother.',
    choices: ['\u5BB6', '\u7684', '\u662F', '\u6709'],
    correctIndex: 1,
    explanation: '的 (de) = particule de possession. 我的 = « le mien ». Pour les proches très proches (parents, fratrie), on peut l\u2019omettre : 我妈妈 = ma mère.',
    explanationEn: '的 (de) = possession particle. 我的 = «mine». For very close relatives (parents, siblings) it can be dropped: 我妈妈 = my mother.'
  },
  {
    id: 'cecr-a1-family-m1-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Ordonne : « mon petit frère ».',
    promptEn: 'Reorder: «my younger brother».',
    sentence: 'mon petit frère',
    sentenceEn: 'my younger brother',
    choices: ['\u6211', '\u7684', '\u5F1F\u5F1F'],
    correctIndex: 0,
    explanation: 'Ordre : possesseur + 的 + possédé. 我 + 的 + 弟弟 = mon petit frère. Avec 我弟弟 (sans 的) c\u2019est plus familier.',
    explanationEn: 'Order: possessor + 的 + possessed. 我 + 的 + 弟弟 = my younger brother. 我弟弟 (without 的) is more casual.'
  },
  {
    id: 'cecr-a1-family-m1-trans-zh2fr',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « 我爷爷八十岁了。»',
    promptEn: 'Translate: «我爷爷八十岁了。»',
    choices: [
      'Mon grand-père a 80 ans.',
      'Ma grand-mère a 80 ans.',
      'Mon grand-père est âgé.',
      'Mon grand-père aura 80 ans.'
    ],
    correctIndex: 0,
    explanation: '爷爷 = grand-père paternel (奶奶 = grand-mère paternelle). 了 en fin marque « maintenant atteint/changé » (= « il a désormais 80 »).',
    explanationEn: '爷爷 = paternal grandfather (奶奶 = paternal grandmother). Final 了 marks «now reached/changed» (= «he\u2019s now 80»).'
  },
  {
    id: 'cecr-a1-family-m1-trans-fr2zh',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « J\u2019ai un grand frère et deux petites sœurs. »',
    promptEn: 'Translate: «I have one older brother and two younger sisters.»',
    choices: [
      '\u6211\u6709\u4E00\u4E2A\u5F1F\u5F1F\u548C\u4E24\u4E2A\u59D0\u59D0\u3002',
      '\u6211\u6709\u4E00\u4E2A\u54E5\u54E5\u548C\u4E24\u4E2A\u59B9\u59B9\u3002',
      '\u6211\u6709\u4E00\u4E2A\u54E5\u54E5\u548C\u4E8C\u4E2A\u59B9\u59B9\u3002',
      '\u6211\u6709\u54E5\u54E5\u548C\u4E24\u4E2A\u59B9\u59B9\u3002'
    ],
    correctIndex: 1,
    explanation: '哥哥 = grand frère, 妹妹 = petite sœur. 两个 (pas 二个) devant 妹妹 car classificateur 个. Structure : 我 + 有 + [quantité + classificateur + membre].',
    explanationEn: '哥哥 = older brother, 妹妹 = younger sister. 两个 (not 二个) before 妹妹 because of classifier 个. Structure: 我 + 有 + [number + classifier + member].'
  },
  {
    id: 'cecr-a1-family-m1-err1',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Trouve l\u2019erreur : « 他的妹妹是我的哥哥的姐姐 » — quelle relation est impossible ?',
    promptEn: 'Find the error: «他的妹妹是我的哥哥的姐姐» — which relation is impossible?',
    sentence: '\u4ED6\u7684\u59B9\u59B9 = \u6211\u7684\u54E5\u54E5\u7684\u59D0\u59D0',
    choices: [
      '« sa petite sœur » est OK',
      '« ma sœur aînée de mon grand frère » est OK',
      '« petite sœur » ne peut pas être « grande sœur » (aînée)',
      'Tout est correct'
    ],
    correctIndex: 2,
    explanation: 'Une 妹妹 (cadette) ne peut pas être 姐姐 (aînée) d\u2019un 哥哥 — par définition, 哥哥 est déjà plus âgé que la narratrice. Contradiction logique.',
    explanationEn: 'A 妹妹 (younger) cannot be the 姐姐 (older) of a 哥哥 — by definition 哥哥 is already older than the narrator. Logical contradiction.'
  },
  {
    id: 'cecr-a1-family-m1-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute — quel membre de la famille ?',
    promptEn: 'Listen — which family member?',
    choices: ['爸爸 (papa)', '妈妈 (maman)', '哥哥 (grand frère)', '爷爷 (grand-père)'],
    correctIndex: 1,
    explanation: '妈妈 = mā ma (ton 1 + neutre). 爸爸 = bà ba (ton 4 + neutre). Différence par la consonne initiale (m- vs b-) et le ton de la 1ʳᵉ syllabe.',
    explanationEn: '妈妈 = mā ma (tone 1 + neutral). 爸爸 = bà ba (tone 4 + neutral). Tell apart by initial consonant (m- vs b-) and first-syllable tone.',
    audioHanzi: '\u5988\u5988',
    autoPlay: true
  },
  {
    id: 'cecr-a1-family-m1-mcq-reverse',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Le redoublement (爸爸, 妈妈, 姐姐…) correspond à quel ton sur la 2ᵉ syllabe ?',
    promptEn: 'The doubling (爸爸, 妈妈, 姐姐…) gives what tone on the 2nd syllable?',
    choices: ['ton 1', 'ton 2', 'ton 3', 'neutre (toneless)'],
    correctIndex: 3,
    explanation: 'Dans les mots affectifs redoublés, la 2ᵉ syllabe prend un ton neutre : mā·ma, bà·ba, jiě·jie. Le premier conserve son ton étymologique.',
    explanationEn: 'In doubled affectionate words, the 2nd syllable takes a neutral tone: mā·ma, bà·ba, jiě·jie. The first keeps its etymological tone.'
  }
];

// --- A1 Family M2 : Mon âge, ton âge --------------------------------------
// Flashcards : 多大, 岁, 我, 今年, 你呢, 他, 她, 大, 小
const A1_FAMILY_M2: LessonV2Exercise[] = [
  {
    id: 'cecr-a1-family-m2-gq1',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Tu demandes son âge à un enfant de 6 ans. Que dis-tu ?',
    promptEn: 'You ask a 6-year-old\u2019s age. What do you say?',
    choices: [
      '\u4F60\u591A\u5927\uFF1F',
      '\u4F60\u51E0\u5C81\uFF1F',
      '\u60A8\u591A\u5927\u5E74\u7EAA\uFF1F',
      '\u4F60\u591A\u5C11\u5C81\uFF1F'
    ],
    correctIndex: 1,
    explanation: '你几岁 ? s\u2019adresse aux enfants (< 10 ans). 你多大 ? à un adulte. 您多大年纪 ? à une personne âgée. 多少岁 est incorrect.',
    explanationEn: '你几岁? is for children (< 10). 你多大? for adults. 您多大年纪? for elders. 多少岁 is wrong.'
  },
  {
    id: 'cecr-a1-family-m2-fill1',
    type: 'fill',
    category: 'vocabulary',
    prompt: 'Donne ton âge.',
    promptEn: 'Give your age.',
    sentence: '\u6211\u4ECA\u5E74\u4E8C\u5341\u4E94___\u3002',
    sentenceEn: 'I\u2019m 25 this year.',
    choices: ['\u5C81', '\u5E74', '\u4E2A', '\u5C0F'],
    correctIndex: 0,
    explanation: '岁 est le classificateur d\u2019âge OBLIGATOIRE. 我二十五岁 ou 我今年二十五岁 — jamais juste 我二十五 (ça voudrait dire un numéro, pas un âge).',
    explanationEn: '岁 is the MANDATORY age classifier. 我二十五岁 or 我今年二十五岁 — never just 我二十五 (that would be a number, not an age).'
  },
  {
    id: 'cecr-a1-family-m2-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Ordonne : « Cette année, j\u2019ai trente ans. »',
    promptEn: 'Reorder: «This year, I am thirty.»',
    sentence: 'Cette année, j\u2019ai trente ans.',
    sentenceEn: 'This year, I am thirty.',
    choices: ['\u6211', '\u4ECA\u5E74', '\u4E09\u5341', '\u5C81'],
    correctIndex: 0,
    explanation: 'Ordre SVC : sujet + marqueur temporel + nombre + classificateur. 我 + 今年 + 三十 + 岁. Pas de verbe « avoir » : 岁 suffit.',
    explanationEn: 'Order SVC: subject + time marker + number + classifier. 我 + 今年 + 三十 + 岁. No «to have»: 岁 is enough.'
  },
  {
    id: 'cecr-a1-family-m2-trans-zh2fr',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « 她比我大两岁。»',
    promptEn: 'Translate: «她比我大两岁。»',
    choices: [
      'Elle a deux ans de moins que moi.',
      'Elle a deux ans de plus que moi.',
      'Elle a le même âge que moi.',
      'Elle est grande de deux centimètres.'
    ],
    correctIndex: 1,
    explanation: 'Structure comparative : A + 比 + B + adjectif + quantité. 她比我大两岁 = « elle, par rapport à moi, est plus grande de deux ans ».',
    explanationEn: 'Comparative: A + 比 + B + adjective + quantity. 她比我大两岁 = «she, compared to me, is older by two years».'
  },
  {
    id: 'cecr-a1-family-m2-trans-fr2zh',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « Et toi, quel âge as-tu ? »',
    promptEn: 'Translate: «And you, how old are you?»',
    choices: [
      '\u4F60\u5462\uFF1F\u591A\u5927\uFF1F',
      '\u90A3\u4F60\u51E0\u5C81\uFF1F',
      '\u4F60\u591A\u5927\u4E86\uFF1F',
      '\u4F60\u4ECA\u5E74\u591A\u5927\uFF1F'
    ],
    correctIndex: 3,
    explanation: '你今年多大 ? formule neutre pour adulte. La proposition 2 s\u2019adresse à un enfant. La 1 et la 3 sont possibles mais moins complètes.',
    explanationEn: '你今年多大? neutral wording for an adult. Option 2 is for a child. Options 1 and 3 are OK but less complete.'
  },
  {
    id: 'cecr-a1-family-m2-err1',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Quel mot manque dans « 我 / 今年 / 三十 » ?',
    promptEn: 'Which word is missing in «我 / 今年 / 三十»?',
    sentence: '\u6211 / \u4ECA\u5E74 / \u4E09\u5341',
    choices: [
      'Il manque 是 après 我',
      'Il manque 岁 à la fin',
      'Il manque 了 à la fin',
      'Rien ne manque'
    ],
    correctIndex: 1,
    explanation: 'Sans 岁, 我今年三十 = « moi cette année 30 » — ambigu (30 quoi ?). 岁 est OBLIGATOIRE pour un âge.',
    explanationEn: 'Without 岁, 我今年三十 = «me this year 30» — ambiguous (30 what?). 岁 is MANDATORY for an age.'
  },
  {
    id: 'cecr-a1-family-m2-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute — qu\u2019entends-tu ?',
    promptEn: 'Listen — what do you hear?',
    choices: ['大 (grand)', '小 (petit)', '他 (il)', '她 (elle)'],
    correctIndex: 0,
    explanation: '大 = dà (ton 4). 小 = xiǎo (ton 3). Opposition de tons mais aussi de consonnes (d- vs x-). 他 et 她 sonnent pareil (tā, ton 1).',
    explanationEn: '大 = dà (tone 4). 小 = xiǎo (tone 3). Tone contrast plus consonant contrast (d- vs x-). 他 and 她 sound identical (tā, tone 1).',
    audioHanzi: '\u5927',
    autoPlay: true
  },
  {
    id: 'cecr-a1-family-m2-mcq-reverse',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Quel couple d\u2019adjectifs désigne « grand / petit » dans le sens de l\u2019âge (aîné/cadet) ?',
    promptEn: 'Which adjective pair means «big / small» in the age sense (elder/younger)?',
    choices: ['\u5927 / \u5C0F', '\u591A / \u5C11', '\u9AD8 / \u77ED', '\u8001 / \u5E74\u8F7B'],
    correctIndex: 0,
    explanation: '大 / 小 servent à l\u2019âge : 我大你两岁 (« j\u2019ai 2 ans de plus »). 老 est réservé aux personnes vraiment âgées. 高/矮 = taille. 多/少 = quantité.',
    explanationEn: '大 / 小 apply to age: 我大你两岁 («I\u2019m 2 years older»). 老 only for the truly elderly. 高/矮 = height. 多/少 = quantity.'
  }
];

// --- A1 Family M3 : Les pronoms de base -----------------------------------
// Flashcards : 我, 你, 他, 她, 我们, 你们, 他们, 它, 大家
const A1_FAMILY_M3: LessonV2Exercise[] = [
  {
    id: 'cecr-a1-family-m3-gq1',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Comment former « nous » en chinois ?',
    promptEn: 'How to form «we» in Chinese?',
    choices: ['\u6211\u4EEC', '\u6211\u7684\u4EEC', '\u591A\u6211', '\u6211\u6211'],
    correctIndex: 0,
    explanation: 'Pluriel = pronom + 们. 我 → 我们 (nous), 你 → 你们 (vous), 他 → 他们 (ils). Règle ultra-simple, zéro exception parmi ces trois.',
    explanationEn: 'Plural = pronoun + 们. 我 → 我们 (we), 你 → 你们 (you all), 他 → 他们 (they). Dead-simple rule, zero exceptions here.'
  },
  {
    id: 'cecr-a1-family-m3-fill1',
    type: 'fill',
    category: 'grammar',
    prompt: 'Complète le pronom.',
    promptEn: 'Fill the pronoun.',
    sentence: '___\u662F\u6CD5\u56FD\u4EBA\u3002\uFF08ma sœur\uFF09',
    sentenceEn: '___ is French. (my sister)',
    choices: ['\u4ED6', '\u5979', '\u5B83', '\u4F60'],
    correctIndex: 1,
    explanation: '她 = elle (forme écrite réservée au féminin humain). À l\u2019oral tā est ambigu, seul l\u2019écrit tranche. 它 est pour les objets/animaux.',
    explanationEn: '她 = she (written form reserved for female humans). Orally tā is ambiguous; only writing disambiguates. 它 is for objects/animals.'
  },
  {
    id: 'cecr-a1-family-m3-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Ordonne : « Ils sont tous Chinois. »',
    promptEn: 'Reorder: «They are all Chinese.»',
    sentence: 'Ils sont tous Chinois.',
    sentenceEn: 'They are all Chinese.',
    choices: ['\u4ED6\u4EEC', '\u90FD', '\u662F', '\u4E2D\u56FD\u4EBA'],
    correctIndex: 0,
    explanation: 'Ordre : sujet + 都 (adverbe « tous ») + verbe + attribut. 都 se met TOUJOURS avant le verbe, jamais avant le sujet.',
    explanationEn: 'Order: subject + 都 (adverb «all») + verb + attribute. 都 ALWAYS goes before the verb, never before the subject.'
  },
  {
    id: 'cecr-a1-family-m3-trans-zh2fr',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « 大家好，我是王老师。»',
    promptEn: 'Translate: «大家好，我是王老师。»',
    choices: [
      'Bonjour les amis, je suis M. Wang.',
      'Bonjour tout le monde, je suis le professeur Wang.',
      'Bonjour, Wang est mon prof.',
      'Bonjour, je salue M. Wang.'
    ],
    correctIndex: 1,
    explanation: '大家 = tout le monde (littéralement « grande famille »). 大家好 = formule d\u2019ouverture pour s\u2019adresser à un groupe (cours, réunion, vidéo).',
    explanationEn: '大家 = everyone (literally «big family»). 大家好 = opening phrase for addressing a group (class, meeting, video).'
  },
  {
    id: 'cecr-a1-family-m3-trans-fr2zh',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « Vous êtes tous mes amis. »',
    promptEn: 'Translate: «You are all my friends.»',
    choices: [
      '\u4F60\u4EEC\u90FD\u662F\u6211\u7684\u670B\u53CB\u3002',
      '\u4F60\u662F\u6211\u4EEC\u7684\u670B\u53CB\u3002',
      '\u5927\u5BB6\u662F\u6211\u7684\u670B\u53CB\u3002',
      '\u4ED6\u4EEC\u90FD\u662F\u4F60\u7684\u670B\u53CB\u3002'
    ],
    correctIndex: 0,
    explanation: '你们 = vous (2ᵉ pers. pluriel). 都 placé avant 是. 我的朋友 = mes amis. Option 3 est acceptable mais moins précise (« tout le monde » ≠ « vous »).',
    explanationEn: '你们 = you (2nd person plural). 都 before 是. 我的朋友 = my friends. Option 3 is acceptable but less precise («everyone» ≠ «you all»).'
  },
  {
    id: 'cecr-a1-family-m3-err1',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Quel pronom est inapproprié pour « le chat » dans « 它 / 他 / 她 » ?',
    promptEn: 'Which pronoun is inappropriate for «the cat» among «它 / 他 / 她»?',
    sentence: 'pour désigner un chat',
    choices: ['\u5B83 (neutre)', '\u4ED6 (masc.)', '\u5979 (fém.)', 'les trois sont OK'],
    correctIndex: 2,
    explanation: '它 (tā, clé 宀) désigne les animaux et objets. 他 (masculin humain). 她 (féminin humain) est inapproprié pour un animal en chinois moderne standard.',
    explanationEn: '它 (tā, roof radical) is for animals and objects. 他 (male human). 她 (female human) is inappropriate for an animal in modern standard Chinese.'
  },
  {
    id: 'cecr-a1-family-m3-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute — quel pronom pluriel ?',
    promptEn: 'Listen — which plural pronoun?',
    choices: ['我们 (nous)', '你们 (vous)', '他们 (ils)', '大家 (tout le monde)'],
    correctIndex: 0,
    explanation: '我们 = wǒ men (ton 3 + neutre). 你们 = nǐ men, 他们 = tā men. Le pronom singulier dicte le ton ; 们 reste toujours neutre.',
    explanationEn: '我们 = wǒ men (tone 3 + neutral). 你们 = nǐ men, 他们 = tā men. The singular pronoun sets the tone; 们 is always neutral.',
    audioHanzi: '\u6211\u4EEC',
    autoPlay: true
  },
  {
    id: 'cecr-a1-family-m3-mcq-reverse',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Combien de formes de conjugaison changent entre 我是, 你是, 他是 ?',
    promptEn: 'How many conjugation forms change across 我是, 你是, 他是?',
    choices: ['3 (comme en français)', '2', '1', '0 (aucune conjugaison)'],
    correctIndex: 3,
    explanation: 'Le verbe 是 ne se conjugue pas. C\u2019est une constante du chinois : pas de personne, pas de temps, pas de nombre. Seuls les pronoms changent.',
    explanationEn: 'The verb 是 doesn\u2019t conjugate. A constant of Chinese: no person, no tense, no number. Only the pronoun changes.'
  }
];

// --- A1 Family M4 : Les couleurs ------------------------------------------
// Flashcards : 红色, 蓝色, 白色, 黑色, 黄色, 绿色, 颜色, 喜欢
const A1_FAMILY_M4: LessonV2Exercise[] = [
  {
    id: 'cecr-a1-family-m4-gq1',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Comment dit-on « rouge » sous forme d\u2019adjectif complet ?',
    promptEn: 'How do you say «red» as a full adjective?',
    choices: ['\u7EA2', '\u7EA2\u8272', '\u7EA2\u7684', '\u989C\u8272\u7EA2'],
    correctIndex: 1,
    explanation: 'Couleur = racine + 色. 红色 = rouge. À l\u2019oral on peut simplifier en 红, mais la forme avec 色 est la plus sûre pour un apprenant.',
    explanationEn: 'Color = root + 色. 红色 = red. Orally you can shorten to 红, but the 色 form is safer for learners.'
  },
  {
    id: 'cecr-a1-family-m4-fill1',
    type: 'fill',
    category: 'vocabulary',
    prompt: 'Complète avec la couleur du deuil en Chine.',
    promptEn: 'Fill with the color of mourning in China.',
    sentence: '\u4E2D\u56FD\u4EBA\u9001\u846C\u65F6\u7A7F___\u3002',
    sentenceEn: 'At funerals, Chinese people wear ___.',
    choices: ['\u7EA2\u8272', '\u9ED1\u8272', '\u767D\u8272', '\u84DD\u8272'],
    correctIndex: 2,
    explanation: '白色 (blanc) = deuil en Chine traditionnelle, opposition culturelle avec l\u2019Occident où c\u2019est le noir. 红色 est réservé aux joies (mariage, Nouvel An).',
    explanationEn: '白色 (white) = mourning in traditional Chinese culture — opposite of Western black. 红色 is reserved for joyful events (weddings, New Year).'
  },
  {
    id: 'cecr-a1-family-m4-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Ordonne : « J\u2019aime le bleu. »',
    promptEn: 'Reorder: «I like blue.»',
    sentence: 'J\u2019aime le bleu.',
    sentenceEn: 'I like blue.',
    choices: ['\u6211', '\u559C\u6B22', '\u84DD\u8272'],
    correctIndex: 0,
    explanation: 'Structure simple SVO : 我 + 喜欢 + objet. 喜欢 = aimer (sentiment). Les couleurs peuvent être objet direct sans 的.',
    explanationEn: 'Simple SVO: 我 + 喜欢 + object. 喜欢 = to like (feeling). Colors can be direct objects without 的.'
  },
  {
    id: 'cecr-a1-family-m4-trans-zh2fr',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « 我不喜欢黄色电影。»',
    promptEn: 'Translate: «我不喜欢黄色电影。»',
    choices: [
      'Je n\u2019aime pas les films jaunes.',
      'Je n\u2019aime pas les films colorés.',
      'Je n\u2019aime pas les films pour adultes.',
      'Je n\u2019aime pas les vieux films.'
    ],
    correctIndex: 2,
    explanation: 'Piège culturel : 黄色 (jaune) désigne aussi le contenu pornographique en chinois (comme « blue » en anglais). 黄色电影 = films X, pas films jaunes.',
    explanationEn: 'Cultural trap: 黄色 (yellow) also refers to pornographic content in Chinese (like «blue» in English). 黄色电影 = adult films, not yellow films.'
  },
  {
    id: 'cecr-a1-family-m4-trans-fr2zh',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « Ma voiture est noire. »',
    promptEn: 'Translate: «My car is black.»',
    choices: [
      '\u6211\u7684\u8F66\u662F\u9ED1\u7684\u3002',
      '\u6211\u7684\u8F66\u662F\u9ED1\u8272\u7684\u3002',
      '\u6211\u8F66\u9ED1\u8272\u3002',
      '\u6211\u9ED1\u7684\u8F66\u3002'
    ],
    correctIndex: 1,
    explanation: 'Structure d\u2019attribution avec 是…的 : « X est (de) Y ». 我的车是黑色的 = « ma voiture, c\u2019est du noir ». Accepté sans 的 à l\u2019oral mais plus clair avec.',
    explanationEn: 'Attribution with 是…的: «X is (of) Y». 我的车是黑色的 = «my car is (in) black». The 的 can drop orally but reads clearer.'
  },
  {
    id: 'cecr-a1-family-m4-err1',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Quelle couleur est INAPPROPRIÉE pour un mariage traditionnel chinois : « 红色 / 黑色 / 白色 / 黄色 » ?',
    promptEn: 'Which color is INAPPROPRIATE for a traditional Chinese wedding among «红色 / 黑色 / 白色 / 黄色»?',
    sentence: 'couleurs de cérémonie',
    choices: ['\u7EA2\u8272 (rouge)', '\u9ED1\u8272 (noir)', '\u767D\u8272 (blanc)', '\u9EC4\u8272 (jaune)'],
    correctIndex: 2,
    explanation: '白色 = deuil en Chine, donc interdit à un mariage. 红色 est au contraire la couleur du bonheur, omniprésente lors des noces.',
    explanationEn: '白色 = mourning in China, hence banned at weddings. 红色 is the color of happiness — everywhere at Chinese weddings.'
  },
  {
    id: 'cecr-a1-family-m4-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute — quelle couleur ?',
    promptEn: 'Listen — which color?',
    choices: ['红色 (rouge)', '绿色 (vert)', '黄色 (jaune)', '黑色 (noir)'],
    correctIndex: 0,
    explanation: '红色 = hóng sè (ton 2 + ton 4). Symbole chinois du bonheur, de la chance et de la prospérité. Omniprésent au Nouvel An.',
    explanationEn: '红色 = hóng sè (tone 2 + tone 4). The Chinese symbol of joy, luck, and prosperity. Everywhere at New Year.',
    audioHanzi: '\u7EA2\u8272',
    autoPlay: true
  },
  {
    id: 'cecr-a1-family-m4-mcq-reverse',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Comment dit-on « J\u2019aime beaucoup le vert » ?',
    promptEn: 'How to say «I really like green»?',
    choices: [
      '\u6211\u5F88\u559C\u6B22\u7EFF\u8272\u3002',
      '\u6211\u5F88\u591A\u559C\u6B22\u7EFF\u8272\u3002',
      '\u6211\u559C\u6B22\u5F88\u7EFF\u8272\u3002',
      '\u6211\u7EFF\u8272\u5F88\u559C\u6B22\u3002'
    ],
    correctIndex: 0,
    explanation: '很 (très) se met AVANT le verbe ou l\u2019adjectif. 我 + 很 + 喜欢 + 绿色. 多 ne marque pas l\u2019intensité avec 喜欢, c\u2019est 很 ou 非常 qu\u2019il faut.',
    explanationEn: '很 (very) goes BEFORE the verb or adjective. 我 + 很 + 喜欢 + 绿色. 多 doesn\u2019t mark intensity with 喜欢; use 很 or 非常.'
  }
];

// ============================================================================
//  A1 — GRAMMAR / GRAMMAIRE DE BASE (5 modules)
// ============================================================================

// --- A1 Grammar M1 : Le verbe 是 ------------------------------------------
// Flashcards : 是, 我是, 你是, 他是, 学生, 老师, 朋友, 中国人
const A1_GRAMMAR_M1: LessonV2Exercise[] = [
  {
    id: 'cecr-a1-grammar-m1-gq1',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Quelle phrase utilise 是 correctement ?',
    promptEn: 'Which sentence uses 是 correctly?',
    choices: [
      '\u6211\u662F\u7D2F\u3002 (je suis fatigué)',
      '\u6211\u662F\u5B66\u751F\u3002 (je suis étudiant)',
      '\u5979\u662F\u6F02\u4EAE\u3002 (elle est belle)',
      '\u4ED6\u662F\u9AD8\u3002 (il est grand)'
    ],
    correctIndex: 1,
    explanation: '是 = « être » seulement pour identifier (X = Y). Jamais devant un adjectif. Pour un adjectif : 我很累, 她很漂亮, 他很高. 很 sert de liaison obligatoire.',
    explanationEn: '是 = «to be» only for identification (X = Y). Never before an adjective. For adjectives: 我很累, 她很漂亮, 他很高. 很 is a mandatory linker.'
  },
  {
    id: 'cecr-a1-grammar-m1-fill1',
    type: 'fill',
    category: 'grammar',
    prompt: 'Tu t\u2019identifies.',
    promptEn: 'Identify yourself.',
    sentence: '\u6211___\u8001\u5E08\u3002',
    sentenceEn: 'I am a teacher.',
    choices: ['\u5F88', '\u662F', '\u4E5F', '\u90FD'],
    correctIndex: 1,
    explanation: '老师 est un nom (identification), donc 是. Si c\u2019était un adjectif (« je suis occupé »), ce serait 我很忙. Règle : 是 + nom, 很 + adjectif.',
    explanationEn: '老师 is a noun (identification), so 是. If it were an adjective («I\u2019m busy»), it would be 我很忙. Rule: 是 + noun, 很 + adjective.'
  },
  {
    id: 'cecr-a1-grammar-m1-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Ordonne : « Nous sommes tous Chinois. »',
    promptEn: 'Reorder: «We are all Chinese.»',
    sentence: 'Nous sommes tous Chinois.',
    sentenceEn: 'We are all Chinese.',
    choices: ['\u6211\u4EEC', '\u90FD', '\u662F', '\u4E2D\u56FD\u4EBA'],
    correctIndex: 0,
    explanation: 'Ordre fixe : sujet + 都 + 是 + attribut. 都 avant le verbe, jamais entre 是 et l\u2019attribut. 我们都是中国人.',
    explanationEn: 'Fixed order: subject + 都 + 是 + attribute. 都 before the verb, never between 是 and the attribute. 我们都是中国人.'
  },
  {
    id: 'cecr-a1-grammar-m1-trans-zh2fr',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « 他不是我的朋友，他是我的老师。»',
    promptEn: 'Translate: «他不是我的朋友，他是我的老师。»',
    choices: [
      'Il n\u2019est pas mon ami, il est mon professeur.',
      'Mon ami est mon professeur.',
      'Il est mon ami et mon professeur.',
      'Mon professeur n\u2019est pas mon ami.'
    ],
    correctIndex: 0,
    explanation: '不是 = « ne pas être ». La structure 是/不是 permet d\u2019opposer deux identifications. Ordre simple : A不是X，A是Y.',
    explanationEn: '不是 = «not be». The 是/不是 pattern contrasts two identifications. Simple order: A不是X，A是Y.'
  },
  {
    id: 'cecr-a1-grammar-m1-trans-fr2zh',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « Elle est très belle. »',
    promptEn: 'Translate: «She is very beautiful.»',
    choices: [
      '\u5979\u662F\u6F02\u4EAE\u3002',
      '\u5979\u5F88\u6F02\u4EAE\u3002',
      '\u5979\u662F\u5F88\u6F02\u4EAE\u3002',
      '\u5979\u6F02\u4EAE\u662F\u3002'
    ],
    correctIndex: 1,
    explanation: '漂亮 est un adjectif → 很 obligatoire, PAS 是. 她很漂亮 (« elle est belle », 很 ne signifie pas vraiment « très » ici, c\u2019est juste la liaison).',
    explanationEn: '漂亮 is an adjective → 很 required, NOT 是. 她很漂亮 («she is beautiful»; 很 doesn\u2019t really mean «very» here — it\u2019s just the linker).'
  },
  {
    id: 'cecr-a1-grammar-m1-err1',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Quel mot est en trop : « 我 / 是 / 很 / 忙 » ?',
    promptEn: 'Which word is extra in «我 / 是 / 很 / 忙»?',
    sentence: '\u6211 / \u662F / \u5F88 / \u5FD9',
    choices: ['\u6211', '\u662F', '\u5F88', '\u5FD9'],
    correctIndex: 1,
    explanation: '忙 (occupé) est un adjectif → pas de 是. Correct : 我很忙. Combinaison 是 + 很 + adjectif est toujours fautive.',
    explanationEn: '忙 (busy) is an adjective → no 是. Correct: 我很忙. The combo 是 + 很 + adjective is always wrong.'
  },
  {
    id: 'cecr-a1-grammar-m1-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute — quel verbe ?',
    promptEn: 'Listen — which verb?',
    choices: [
      '\u662F (être)',
      '\u4E5F (aussi)',
      '\u4E0D (pas, négation)',
      '\u6709 (avoir)'
    ],
    correctIndex: 0,
    explanation: '是 = shì (ton 4 descendant). Très proche de 十 (shí, ton 2 montant) — seul le ton distingue. 也 = yě (ton 3). 有 = yǒu (ton 3).',
    explanationEn: '是 = shì (tone 4 falling). Very close to 十 (shí, tone 2 rising) — only the tone differs. 也 = yě (tone 3). 有 = yǒu (tone 3).',
    audioHanzi: '\u662F',
    autoPlay: true
  },
  {
    id: 'cecr-a1-grammar-m1-mcq-reverse',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Le chinois ne conjugue pas. Combien de formes de 是 existent ?',
    promptEn: 'Chinese doesn\u2019t conjugate. How many forms of 是 exist?',
    choices: [
      '6 (comme en français)',
      '3 (je/tu/il)',
      '1 (invariable)',
      '2 (singulier/pluriel)'
    ],
    correctIndex: 2,
    explanation: '是 reste 是, quel que soit le sujet (我/你/他/我们/你们/他们). Ni temps, ni personne, ni nombre. Invariable.',
    explanationEn: '是 stays 是 regardless of subject (我/你/他/我们/你们/他们). No tense, person, or number. Invariable.'
  }
];

// --- A1 Grammar M2 : La négation avec 不 ----------------------------------
// Flashcards : 不是, 不去, 不要, 不好, 不喜欢, 不能, 不会, 不对
const A1_GRAMMAR_M2: LessonV2Exercise[] = [
  {
    id: 'cecr-a1-grammar-m2-gq1',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Quelle est la négation correcte de 我有一本书 (j\u2019ai un livre) ?',
    promptEn: 'What\u2019s the correct negation of 我有一本书 (I have a book)?',
    choices: [
      '\u6211\u4E0D\u6709\u4E00\u672C\u4E66\u3002',
      '\u6211\u6CA1\u6709\u4E00\u672C\u4E66\u3002',
      '\u6211\u4E0D\u4E00\u672C\u4E66\u3002',
      '\u6211\u6709\u4E0D\u4E00\u672C\u4E66\u3002'
    ],
    correctIndex: 1,
    explanation: 'Exception fondamentale : 有 se nie avec 没, JAMAIS avec 不. 没有 = ne pas avoir. Règle à graver : 不有 ✗, 没有 ✓.',
    explanationEn: 'Key exception: 有 is negated with 没, NEVER with 不. 没有 = not have. Memorize: 不有 ✗, 没有 ✓.'
  },
  {
    id: 'cecr-a1-grammar-m2-fill1',
    type: 'fill',
    category: 'grammar',
    prompt: 'Négation d\u2019une action future.',
    promptEn: 'Negate a planned action.',
    sentence: '\u6211\u660E\u5929___\u53BB\u5B66\u6821\u3002',
    sentenceEn: 'I will not go to school tomorrow.',
    choices: ['\u6CA1', '\u4E0D', '\u4E5F', '\u90FD'],
    correctIndex: 1,
    explanation: '不 nie une action future, habituelle ou volontaire. 没(有) nie une action passée/achevée. « Je n\u2019irai pas demain » = 不去. « Je ne suis pas allé hier » = 没去.',
    explanationEn: '不 negates future, habitual, or volitional action. 没(有) negates past/completed action. «I won\u2019t go tomorrow» = 不去. «I didn\u2019t go yesterday» = 没去.'
  },
  {
    id: 'cecr-a1-grammar-m2-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Ordonne : « Je n\u2019aime pas cette couleur. »',
    promptEn: 'Reorder: «I don\u2019t like this color.»',
    sentence: 'Je n\u2019aime pas cette couleur.',
    sentenceEn: 'I don\u2019t like this color.',
    choices: ['\u6211', '\u4E0D', '\u559C\u6B22', '\u8FD9\u4E2A\u989C\u8272'],
    correctIndex: 0,
    explanation: '不 se colle DIRECTEMENT devant le verbe. Ordre : sujet + 不 + verbe + objet. Ne jamais séparer 不 du verbe.',
    explanationEn: '不 attaches DIRECTLY to the verb. Order: subject + 不 + verb + object. Never separate 不 from the verb.'
  },
  {
    id: 'cecr-a1-grammar-m2-trans-zh2fr',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « 他不会说中文。»',
    promptEn: 'Translate: «他不会说中文。»',
    choices: [
      'Il ne veut pas parler chinois.',
      'Il ne doit pas parler chinois.',
      'Il ne sait pas parler chinois.',
      'Il ne peut pas parler chinois.'
    ],
    correctIndex: 2,
    explanation: '会 = savoir faire (compétence apprise). 不会 = ne pas savoir. À distinguer de 不能 (ne pas pouvoir, interdiction) et 不要 (ne pas vouloir).',
    explanationEn: '会 = knowing how (learned skill). 不会 = cannot/don\u2019t know how. Distinguish from 不能 (not allowed) and 不要 (don\u2019t want).'
  },
  {
    id: 'cecr-a1-grammar-m2-trans-fr2zh',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « Ce n\u2019est pas correct. »',
    promptEn: 'Translate: «That\u2019s not right.»',
    choices: [
      '\u8FD9\u4E2A\u6CA1\u5BF9\u3002',
      '\u8FD9\u4E2A\u4E0D\u5BF9\u3002',
      '\u8FD9\u4E2A\u4E0D\u662F\u5BF9\u3002',
      '\u8FD9\u4E2A\u662F\u4E0D\u5BF9\u3002'
    ],
    correctIndex: 1,
    explanation: '不对 = incorrect (figé). On peut aussi dire 不正确 mais 不对 domine en conversation. 没对 n\u2019existe pas — 对 est un adjectif, pas 有.',
    explanationEn: '不对 = incorrect (fixed phrase). 不正确 exists too, but 不对 dominates in conversation. 没对 is not a thing — 对 is an adjective, not 有.'
  },
  {
    id: 'cecr-a1-grammar-m2-err1',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Quel élément est faux : « 我 / 不 / 有 / 钱 » ?',
    promptEn: 'Which element is wrong in «我 / 不 / 有 / 钱»?',
    sentence: '\u6211 / \u4E0D / \u6709 / \u94B1',
    choices: ['\u6211', '\u4E0D', '\u6709', '\u94B1'],
    correctIndex: 1,
    explanation: '不有 n\u2019existe pas. 有 se nie avec 没. Correct : 我没有钱 (« je n\u2019ai pas d\u2019argent »). C\u2019est la seule grande exception avec 不.',
    explanationEn: '不有 doesn\u2019t exist. 有 is negated with 没. Correct: 我没有钱 («I have no money»). This is the main exception to 不.'
  },
  {
    id: 'cecr-a1-grammar-m2-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute — tu entends 不 + quel verbe ?',
    promptEn: 'Listen — what verb follows 不?',
    choices: [
      '\u4E0D\u53BB (ne pas y aller)',
      '\u4E0D\u662F (ne pas être)',
      '\u4E0D\u8981 (ne pas vouloir)',
      '\u4E0D\u559C\u6B22 (ne pas aimer)'
    ],
    correctIndex: 1,
    explanation: '不是 = bú shì (le 不 passe au ton 2 devant le ton 4 de 是 : sandhi automatique). Même règle pour 不去 (bú qù), 不要 (bú yào).',
    explanationEn: '不是 = bú shì (不 shifts to tone 2 before tone-4 是: automatic sandhi). Same rule for 不去 (bú qù), 不要 (bú yào).',
    audioHanzi: '\u4E0D\u662F',
    autoPlay: true
  },
  {
    id: 'cecr-a1-grammar-m2-mcq-reverse',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Que devient le ton de 不 devant un 4ᵉ ton ?',
    promptEn: 'What tone does 不 take before a 4th tone?',
    choices: [
      'Il reste au ton 4 (bù)',
      'Il passe au ton 2 (bú)',
      'Il passe au ton 3 (bǔ)',
      'Il devient neutre (bu)'
    ],
    correctIndex: 1,
    explanation: 'Sandhi tonal : 不 (ton 4) + ton 4 → 不 devient bú (ton 2). 不是 bú shì, 不去 bú qù. Devant les tons 1/2/3, 不 reste bù.',
    explanationEn: 'Tone sandhi: 不 (tone 4) + tone 4 → 不 becomes bú (tone 2). 不是 bú shì, 不去 bú qù. Before tones 1/2/3, 不 stays bù.'
  }
];

// --- A1 Grammar M3 : Les questions avec 吗 --------------------------------
// Flashcards : 吗, 你好吗, 你是吗, 是吗, 对吗, 呢, 好吗, 可以吗
const A1_GRAMMAR_M3: LessonV2Exercise[] = [
  {
    id: 'cecr-a1-grammar-m3-gq1',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Transforme 他是法国人 (il est français) en question oui/non.',
    promptEn: 'Turn 他是法国人 (he is French) into a yes/no question.',
    choices: [
      '\u4ED6\u662F\u6CD5\u56FD\u4EBA\u5417\uFF1F',
      '\u4ED6\u5417\u662F\u6CD5\u56FD\u4EBA\uFF1F',
      '\u5417\u4ED6\u662F\u6CD5\u56FD\u4EBA\uFF1F',
      '\u4ED6\u662F\u5417\u6CD5\u56FD\u4EBA\uFF1F'
    ],
    correctIndex: 0,
    explanation: '吗 se place TOUJOURS à la fin de la phrase affirmative. Pas d\u2019inversion, pas de réorganisation. Simple et universel.',
    explanationEn: '吗 ALWAYS goes at the end of the statement. No inversion, no restructuring. Simple and universal.'
  },
  {
    id: 'cecr-a1-grammar-m3-fill1',
    type: 'fill',
    category: 'grammar',
    prompt: 'Tu renvoies la question.',
    promptEn: 'Bounce the question back.',
    sentence: '\u6211\u5F88\u597D\uFF0C\u4F60___\uFF1F',
    sentenceEn: 'I\u2019m good, and you?',
    choices: ['\u5417', '\u5462', '\u554A', '\u7684'],
    correctIndex: 1,
    explanation: '呢 (ne) = « et toi ? / et X ? ». Marque le retour de question sans la reformuler. Contraste avec 吗 (question oui/non complète).',
    explanationEn: '呢 (ne) = «and you? / what about X?». Bounces back the question without repeating it. Contrast with 吗 (full yes/no question).'
  },
  {
    id: 'cecr-a1-grammar-m3-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Ordonne : « Tu aimes le café ? »',
    promptEn: 'Reorder: «Do you like coffee?»',
    sentence: 'Tu aimes le café ?',
    sentenceEn: 'Do you like coffee?',
    choices: ['\u4F60', '\u559C\u6B22', '\u5496\u5561', '\u5417'],
    correctIndex: 0,
    explanation: 'Ordre : sujet + verbe + objet + 吗. La particule 吗 vient en dernier, toujours. 你喜欢咖啡吗 ?',
    explanationEn: 'Order: subject + verb + object + 吗. The particle 吗 comes last, always. 你喜欢咖啡吗?'
  },
  {
    id: 'cecr-a1-grammar-m3-trans-zh2fr',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « 你是学生，他呢？»',
    promptEn: 'Translate: «你是学生，他呢?»',
    choices: [
      'Tu es étudiant, et lui ?',
      'Tu es étudiant, il aussi ?',
      'Es-tu étudiant, ou lui ?',
      'Étudies-tu, et lui ?'
    ],
    correctIndex: 0,
    explanation: '呢 après un pronom renvoie la question sans la répéter. Équivalent exact de « et lui / elle / vous ? » en français.',
    explanationEn: '呢 after a pronoun bounces the question without repeating it. Exact match for English «and him/her/you?».'
  },
  {
    id: 'cecr-a1-grammar-m3-trans-fr2zh',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « Est-ce que tu vas bien ? »',
    promptEn: 'Translate: «How are you? (lit. are you well?)»',
    choices: [
      '\u4F60\u600E\u4E48\u6837\uFF1F',
      '\u4F60\u597D\u5417\uFF1F',
      '\u4F60\u662F\u597D\u5417\uFF1F',
      '\u4F60\u597D\u5462\uFF1F'
    ],
    correctIndex: 1,
    explanation: '你好吗 ? = formule fermée (réponse oui/non attendue). 你怎么样 ? est plus ouvert (« comment ça va »). Note : 你好吗 est plus rare en Chine continentale qu\u2019en manuel.',
    explanationEn: '你好吗? = closed form (yes/no answer expected). 你怎么样? is more open («how\u2019s it going»). Note: 你好吗 is rarer in mainland usage than in textbooks.'
  },
  {
    id: 'cecr-a1-grammar-m3-err1',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Quelle question est FAUSSE ?',
    promptEn: 'Which question is WRONG?',
    sentence: '?',
    choices: [
      '\u4F60\u662F\u8C01\u5417\uFF1F (qui es-tu ?)',
      '\u4F60\u662F\u5B66\u751F\u5417\uFF1F',
      '\u4F60\u53BB\u54EA\u91CC\uFF1F',
      '\u4F60\u559C\u6B22\u4EC0\u4E48\uFF1F'
    ],
    correctIndex: 0,
    explanation: '吗 est incompatible avec un mot interrogatif (什么, 哪里, 谁...). 你是谁 ? est déjà une question. 你是谁吗 ? ✗.',
    explanationEn: '吗 is incompatible with a question word (什么, 哪里, 谁...). 你是谁? is already a question. 你是谁吗? ✗.'
  },
  {
    id: 'cecr-a1-grammar-m3-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute — quelle particule interrogative ?',
    promptEn: 'Listen — which question particle?',
    choices: [
      '\u5417 (ma, oui/non)',
      '\u5462 (ne, renvoi)',
      '\u554A (a, expressif)',
      '\u7684 (de, possessif)'
    ],
    correctIndex: 0,
    explanation: '吗 = ma (ton neutre). 呢 = ne (ton neutre). Les deux finissent par un -a/-e court. 啊 = a (ton neutre) mais sans consonne. Le m- initial tranche.',
    explanationEn: '吗 = ma (neutral). 呢 = ne (neutral). Both end in short -a/-e. 啊 = a (neutral) but has no consonant. The initial m- is the tell.',
    audioHanzi: '\u5417',
    autoPlay: true
  },
  {
    id: 'cecr-a1-grammar-m3-mcq-reverse',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Comment dit-on « Vraiment ? » en chinois courant ?',
    promptEn: 'How to say «Really?» in everyday Chinese?',
    choices: ['\u662F\u5417\uFF1F', '\u597D\u5417\uFF1F', '\u5BF9\u5417\uFF1F', 'toutes ces réponses'],
    correctIndex: 3,
    explanation: 'Les trois fonctionnent dans certains contextes. 是吗 = « ah vraiment ? » (surprise), 对吗 = « c\u2019est ça ? » (confirmation), 好吗 = « d\u2019accord ? » (permission).',
    explanationEn: 'All three work in different contexts. 是吗 = «oh really?» (surprise), 对吗 = «is that right?» (confirmation), 好吗 = «OK?» (permission).'
  }
];

// --- A1 Grammar M4 : Le 的 possessif --------------------------------------
// Flashcards : 的, 我的, 你的, 他的, 谁的, 朋友的, 老师的, 学校的
const A1_GRAMMAR_M4: LessonV2Exercise[] = [
  {
    id: 'cecr-a1-grammar-m4-gq1',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Dans « 老师的书 », que signifie 的 ?',
    promptEn: 'In «老师的书», what does 的 do?',
    choices: [
      'Il marque le pluriel',
      'Il marque une négation',
      'Il marque la possession (« le livre du prof »)',
      'Il marque une question'
    ],
    correctIndex: 2,
    explanation: '的 relie le possesseur au possédé. 老师 + 的 + 书 = « le livre DU prof ». Ordre inverse du français mais logique : on pose d\u2019abord le cadre (qui), puis l\u2019objet.',
    explanationEn: '的 links possessor to possessed. 老师 + 的 + 书 = «the book OF the teacher». Reverse of English order but logical: frame first (whose), then object.'
  },
  {
    id: 'cecr-a1-grammar-m4-fill1',
    type: 'fill',
    category: 'grammar',
    prompt: 'Question sur la propriété.',
    promptEn: 'Ask whose.',
    sentence: '\u8FD9\u662F___\u624B\u673A\uFF1F',
    sentenceEn: 'Whose phone is this?',
    choices: ['\u4EC0\u4E48', '\u8C01\u7684', '\u54EA\u91CC', '\u600E\u4E48'],
    correctIndex: 1,
    explanation: '谁的 = « à qui » (interrogation possessive). 谁 (qui) + 的 (de). La réponse est du même format : 我的 / 他的 / 老师的.',
    explanationEn: '谁的 = «whose» (possessive question). 谁 (who) + 的 (of). Reply matches the format: 我的 / 他的 / 老师的.'
  },
  {
    id: 'cecr-a1-grammar-m4-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Ordonne : « le livre de mon ami ».',
    promptEn: 'Reorder: «my friend\u2019s book».',
    sentence: 'le livre de mon ami',
    sentenceEn: 'my friend\u2019s book',
    choices: ['\u6211', '\u670B\u53CB', '\u7684', '\u4E66'],
    correctIndex: 0,
    explanation: 'Chaîne possessive : 我 (moi) + 朋友 (ami) + 的 + 书. Le 的 entre le possesseur (我朋友) et le possédé (书). Noter que 我朋友 peut omettre le 的 interne.',
    explanationEn: 'Possessive chain: 我 (me) + 朋友 (friend) + 的 + 书. The 的 sits between possessor (我朋友) and possessed (书). Inner 的 between 我 and 朋友 is often dropped.'
  },
  {
    id: 'cecr-a1-grammar-m4-trans-zh2fr',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « 我爸爸的朋友是一个老师。»',
    promptEn: 'Translate: «我爸爸的朋友是一个老师。»',
    choices: [
      'Mon ami est le prof de papa.',
      'L\u2019ami de mon père est un professeur.',
      'Mon père a un ami professeur.',
      'Le père de mon ami est prof.'
    ],
    correctIndex: 1,
    explanation: '我爸爸的朋友 = « l\u2019ami de mon père ». 我爸爸 (père) + 的 + 朋友 (ami). Sans 的 au milieu on aurait « mon papa, mon ami » (confus).',
    explanationEn: '我爸爸的朋友 = «my father\u2019s friend». 我爸爸 (father) + 的 + 朋友 (friend). Without the middle 的 you\u2019d get «my dad, my friend» (unclear).'
  },
  {
    id: 'cecr-a1-grammar-m4-trans-fr2zh',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « C\u2019est ma sœur aînée. » (familier)',
    promptEn: 'Translate: «This is my older sister.» (casual)',
    choices: [
      '\u8FD9\u662F\u6211\u7684\u7684\u59D0\u59D0\u3002',
      '\u8FD9\u662F\u6211\u59D0\u59D0\u3002',
      '\u8FD9\u662F\u6211\u7684\u59D0\u59D0\u59D0\u3002',
      '\u8FD9\u662F\u59D0\u59D0\u7684\u6211\u3002'
    ],
    correctIndex: 1,
    explanation: 'Avec les proches (parents, fratrie, amis), le 的 est souvent OMIS : 我姐姐, 我爸爸, 我朋友. Formes longues 我的姐姐 acceptables mais plus rigides.',
    explanationEn: 'With close relatives (parents, siblings, friends), 的 is often DROPPED: 我姐姐, 我爸爸, 我朋友. The long form 我的姐姐 is acceptable but stiffer.'
  },
  {
    id: 'cecr-a1-grammar-m4-err1',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Quel segment doit être ajouté entre « 老师 » et « 书 » dans « 老师 书 » ?',
    promptEn: 'What segment must be added between «老师» and «书» in «老师 书»?',
    sentence: '\u8001\u5E08 ? \u4E66',
    choices: [
      'Rien, la juxtaposition suffit',
      'Ajouter 的',
      'Ajouter 是',
      'Ajouter 有'
    ],
    correctIndex: 1,
    explanation: 'Deux noms ne peuvent pas s\u2019accoler pour exprimer une possession. Il faut 的 : 老师的书 = « le livre du prof ». Sans 的, ça ressemble à un composé inconnu.',
    explanationEn: 'Two nouns can\u2019t just butt up to express possession. Insert 的: 老师的书 = «the teacher\u2019s book». Without 的, it looks like an unknown compound.'
  },
  {
    id: 'cecr-a1-grammar-m4-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute — quelle particule ?',
    promptEn: 'Listen — which particle?',
    choices: ['\u7684 (possession)', '\u5730 (adverbe)', '\u5F97 (résultatif)', '\u4E86 (accompli)'],
    correctIndex: 0,
    explanation: '的 = de (ton neutre). Les 3 particules 的/地/得 se prononcent toutes DE mais ont des rôles différents (possession / adverbe / complément). Seul le contexte tranche à l\u2019oral.',
    explanationEn: '的 = de (neutral tone). The 3 particles 的/地/得 all sound DE but play different roles (possession / adverb / complement). Only context disambiguates orally.',
    audioHanzi: '\u7684',
    autoPlay: true
  },
  {
    id: 'cecr-a1-grammar-m4-mcq-reverse',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Quand peut-on OMETTRE le 的 ?',
    promptEn: 'When can 的 be DROPPED?',
    choices: [
      'Jamais, il est toujours obligatoire',
      'Avec les proches (famille, amis)',
      'Seulement avec les objets',
      'Seulement à l\u2019écrit formel'
    ],
    correctIndex: 1,
    explanation: 'Avec les proches : 我爸爸, 你妈妈, 他朋友. Règle sociale : plus la relation est proche, plus le 的 se perd. À l\u2019écrit formel, le 的 reste présent.',
    explanationEn: 'With close ones: 我爸爸, 你妈妈, 他朋友. Social rule: the closer the relationship, the more 的 gets dropped. In formal writing, 的 stays.'
  }
];

// --- A1 Grammar M5 : Les classificateurs 个 & 本 ---------------------------
// Flashcards : 个, 本, 一个, 两个, 一本书, 几本, 这个, 那个
const A1_GRAMMAR_M5: LessonV2Exercise[] = [
  {
    id: 'cecr-a1-grammar-m5-gq1',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Comment dire « un livre » en chinois ?',
    promptEn: 'How to say «one book»?',
    choices: ['\u4E00\u4E66', '\u4E00\u4E2A\u4E66', '\u4E00\u672C\u4E66', '\u4E00\u4E2A\u672C\u4E66'],
    correctIndex: 2,
    explanation: 'Entre le nombre et le nom, il FAUT un classificateur. 本 est le classificateur des livres/cahiers. 一个书 est grammaticalement possible mais très maladroit — 一本书 est la norme.',
    explanationEn: 'Between number and noun, a classifier is REQUIRED. 本 is the classifier for books/notebooks. 一个书 is technically possible but clumsy — 一本书 is standard.'
  },
  {
    id: 'cecr-a1-grammar-m5-fill1',
    type: 'fill',
    category: 'grammar',
    prompt: 'Combien de personnes ?',
    promptEn: 'How many people?',
    sentence: '\u6211\u4EEC\u5BB6\u6709\u4E94___\u4EBA\u3002',
    sentenceEn: 'My family has 5 people.',
    choices: ['\u4E2A', '\u672C', '\u53EA', '\u7247'],
    correctIndex: 0,
    explanation: '个 (ge) est le classificateur passe-partout. Obligatoire pour 人. 五个人 = 5 personnes. Note : après 两, on garde le classificateur (两个人).',
    explanationEn: '个 (ge) is the all-purpose classifier. Required for 人. 五个人 = 5 people. Note: after 两, keep the classifier (两个人).'
  },
  {
    id: 'cecr-a1-grammar-m5-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Ordonne : « cette personne ».',
    promptEn: 'Reorder: «this person».',
    sentence: 'cette personne',
    sentenceEn: 'this person',
    choices: ['\u8FD9', '\u4E2A', '\u4EBA'],
    correctIndex: 0,
    explanation: 'Avec 这 (ceci) / 那 (cela), le classificateur reste OBLIGATOIRE : 这个人 (cette personne), 那本书 (ce livre). Jamais 这人 (sauf littéraire).',
    explanationEn: 'With 这 (this) / 那 (that), the classifier is still MANDATORY: 这个人 (this person), 那本书 (that book). Never 这人 (except literary).'
  },
  {
    id: 'cecr-a1-grammar-m5-trans-zh2fr',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « 我想买两本中文书。»',
    promptEn: 'Translate: «我想买两本中文书。»',
    choices: [
      'Je veux acheter 2 livres chinois.',
      'Je veux lire 2 livres chinois.',
      'J\u2019ai acheté 2 livres chinois.',
      'Je veux acheter 22 livres chinois.'
    ],
    correctIndex: 0,
    explanation: '两本 = 2 (livres), pas 二本. 两 remplace 二 devant un classificateur. 买 = acheter, 想 = vouloir / penser.',
    explanationEn: '两本 = 2 (books), not 二本. 两 replaces 二 before classifiers. 买 = buy, 想 = want / think.'
  },
  {
    id: 'cecr-a1-grammar-m5-trans-fr2zh',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « Combien de livres as-tu ? »',
    promptEn: 'Translate: «How many books do you have?»',
    choices: [
      '\u4F60\u6709\u51E0\u672C\u4E66\uFF1F',
      '\u4F60\u6709\u51E0\u4E2A\u4E66\uFF1F',
      '\u4F60\u6709\u591A\u5C11\u4E66\uFF1F',
      '\u4F60\u6709\u4EC0\u4E48\u4E66\uFF1F'
    ],
    correctIndex: 0,
    explanation: '几 (< 10) + classificateur + nom. 多少 (grande quantité) peut aussi marcher sans classificateur : 多少本书 ou 多少书. Mais 几本书 est le choix standard pour peu d\u2019objets.',
    explanationEn: '几 (< 10) + classifier + noun. 多少 (larger quantity) can also work even without a classifier: 多少本书 or 多少书. 几本书 is standard for few objects.'
  },
  {
    id: 'cecr-a1-grammar-m5-err1',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Quel élément manque : « 我 / 有 / 三 / 朋友 » ?',
    promptEn: 'What\u2019s missing: «我 / 有 / 三 / 朋友»?',
    sentence: '\u6211 / \u6709 / \u4E09 / \u670B\u53CB',
    choices: [
      'Il manque 是 après 我',
      'Il manque 个 après 三',
      'Il manque 的 avant 朋友',
      'Rien ne manque'
    ],
    correctIndex: 1,
    explanation: 'Nombre + nom requiert un classificateur. 三朋友 est faux ; 三个朋友 est correct (« trois amis »). 个 est le classificateur des personnes par défaut.',
    explanationEn: 'Number + noun needs a classifier. 三朋友 is wrong; 三个朋友 is correct («three friends»). 个 is the default classifier for people.'
  },
  {
    id: 'cecr-a1-grammar-m5-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute — quel classificateur ?',
    promptEn: 'Listen — which classifier?',
    choices: ['\u4E2A (ge, général)', '\u672C (běn, livres)', '\u6761 (tiáo, long/fin)', '\u53EA (zhī, animal)'],
    correctIndex: 1,
    explanation: '本 = běn (ton 3). 个 = ge (neutre). 条 = tiáo (ton 2), 只 = zhī (ton 1). Chacun a son domaine : 本 pour livres/cahiers.',
    explanationEn: '本 = běn (tone 3). 个 = ge (neutral). 条 = tiáo (tone 2), 只 = zhī (tone 1). Each has its domain: 本 for books/notebooks.',
    audioHanzi: '\u672C',
    autoPlay: true
  },
  {
    id: 'cecr-a1-grammar-m5-mcq-reverse',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Quel classificateur est le plus « passe-partout » en chinois ?',
    promptEn: 'Which classifier is the most «all-purpose»?',
    choices: ['\u4E2A', '\u672C', '\u53EA', '\u6761'],
    correctIndex: 0,
    explanation: '个 (ge, ton neutre) couvre presque tout : personnes (个人), fruits, problèmes, questions, mois, heures… Si on ignore le classificateur spécifique, 个 est un choix sûr.',
    explanationEn: '个 (ge, neutral tone) covers almost everything: people (个人), fruits, problems, questions, months, hours… If you don\u2019t know the specific classifier, 个 is a safe bet.'
  }
];

// ============================================================================
//  A1 — DAILY / VIE QUOTIDIENNE (4 modules)
// ============================================================================

// --- A1 Daily M1 : Manger & boire -----------------------------------------
// Flashcards : 吃, 喝, 饭, 水, 茶, 米饭, 面条, 苹果, 牛奶
const A1_DAILY_M1: LessonV2Exercise[] = [
  {
    id: 'cecr-a1-daily-m1-gq1',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Comment dit-on « je mange » sans préciser quoi ?',
    promptEn: 'How to say «I\u2019m eating» without specifying what?',
    choices: ['\u6211\u5403', '\u6211\u5403\u996D', '\u6211\u5403\u4E00\u4E2A', '\u6211\u6B63\u5403'],
    correctIndex: 1,
    explanation: 'Le verbe 吃 seul est anormal : il lui faut un objet. 吃饭 (« manger un repas ») est l\u2019expression par défaut pour « manger / prendre un repas ».',
    explanationEn: 'Bare 吃 sounds incomplete — it needs an object. 吃饭 («eat a meal») is the default phrase for «to eat / have a meal».'
  },
  {
    id: 'cecr-a1-daily-m1-fill1',
    type: 'fill',
    category: 'vocabulary',
    prompt: 'Tu commandes une boisson.',
    promptEn: 'You order a drink.',
    sentence: '\u6211\u60F3___\u4E00\u676F\u8336\u3002',
    sentenceEn: 'I\u2019d like to ___ a cup of tea.',
    choices: ['\u5403', '\u559D', '\u7528', '\u6709'],
    correctIndex: 1,
    explanation: '喝 = boire (liquides). 吃 = manger (solides). Règle nette : 喝茶/喝水/喝牛奶, 吃饭/吃面/吃苹果. Jamais d\u2019inversion.',
    explanationEn: '喝 = drink (liquids). 吃 = eat (solids). Clean rule: 喝茶/喝水/喝牛奶, 吃饭/吃面/吃苹果. Never mix.'
  },
  {
    id: 'cecr-a1-daily-m1-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Ordonne : « Aujourd\u2019hui je mange des nouilles. »',
    promptEn: 'Reorder: «Today I eat noodles.»',
    sentence: 'Aujourd\u2019hui je mange des nouilles.',
    sentenceEn: 'Today I eat noodles.',
    choices: ['\u4ECA\u5929', '\u6211', '\u5403', '\u9762\u6761'],
    correctIndex: 0,
    explanation: 'Ordre : marqueur temporel + sujet + verbe + objet. 今天 placé en tête, c\u2019est très fréquent en chinois. Pas de conjugaison du verbe.',
    explanationEn: 'Order: time marker + subject + verb + object. 今天 at the head is very common in Chinese. No verb conjugation.'
  },
  {
    id: 'cecr-a1-daily-m1-trans-zh2fr',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « 你吃过米饭吗？»',
    promptEn: 'Translate: «你吃过米饭吗?»',
    choices: [
      'Tu manges du riz ?',
      'As-tu déjà mangé du riz blanc ?',
      'Tu aimes le riz ?',
      'Tu as fini le riz ?'
    ],
    correctIndex: 1,
    explanation: '过 (guo) après un verbe = expérience (« avoir déjà fait »). 吃过 = « avoir déjà mangé ». 米饭 = riz cuit (distinct de 米 = riz non cuit).',
    explanationEn: '过 (guo) after a verb = experiential aspect («have ever done»). 吃过 = «have eaten before». 米饭 = cooked rice (distinct from 米 = raw rice).'
  },
  {
    id: 'cecr-a1-daily-m1-trans-fr2zh',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « Je ne bois pas de lait. »',
    promptEn: 'Translate: «I don\u2019t drink milk.»',
    choices: [
      '\u6211\u4E0D\u5403\u725B\u5976\u3002',
      '\u6211\u4E0D\u559D\u725B\u5976\u3002',
      '\u6211\u6CA1\u559D\u725B\u5976\u3002',
      '\u6211\u4E0D\u662F\u559D\u725B\u5976\u3002'
    ],
    correctIndex: 1,
    explanation: '不 + verbe (habitude, futur). 喝 pour liquide. 不喝牛奶 = « ne pas boire du lait » (en général). 没喝 = « je n\u2019ai pas bu » (passé).',
    explanationEn: '不 + verb (habit, future). 喝 for liquid. 不喝牛奶 = «don\u2019t drink milk» (habitually). 没喝 = «didn\u2019t drink» (past).'
  },
  {
    id: 'cecr-a1-daily-m1-err1',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Quel verbe est inapproprié : « 我喝苹果 » ?',
    promptEn: 'Which verb is inappropriate in «我喝苹果»?',
    sentence: '\u6211 \u559D \u82F9\u679C',
    choices: [
      '\u6211 (ok)',
      '\u559D (inapproprié pour un fruit solide)',
      '\u82F9\u679C (ok)',
      'Tout est correct'
    ],
    correctIndex: 1,
    explanation: '苹果 = pomme (solide) → 吃. 喝苹果 n\u2019a pas de sens (sauf « boire du jus de pomme » = 喝苹果汁). Correct : 我吃苹果.',
    explanationEn: '苹果 = apple (solid) → 吃. 喝苹果 makes no sense (except «drink apple juice» = 喝苹果汁). Correct: 我吃苹果.'
  },
  {
    id: 'cecr-a1-daily-m1-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute — manger ou boire ?',
    promptEn: 'Listen — eat or drink?',
    choices: [
      '\u5403 (chī, manger)',
      '\u559D (hē, boire)',
      '\u6709 (yǒu, avoir)',
      '\u60F3 (xiǎng, vouloir)'
    ],
    correctIndex: 1,
    explanation: '喝 = hē (ton 1 haut plat). 吃 = chī (ton 1 aussi, mais consonne ch- vs h-). Proches mais la consonne initiale distingue nettement.',
    explanationEn: '喝 = hē (tone 1 high flat). 吃 = chī (tone 1 too, but consonant ch- vs h-). Close but initial consonant clearly separates them.',
    audioHanzi: '\u559D',
    autoPlay: true
  },
  {
    id: 'cecr-a1-daily-m1-mcq-reverse',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Quelle est la différence entre 饭 et 米饭 ?',
    promptEn: 'What\u2019s the difference between 饭 and 米饭?',
    choices: [
      'Aucune, ils sont synonymes',
      '饭 = repas en général / riz cuit ; 米饭 = riz blanc cuit précisément',
      '饭 est formel, 米饭 est familier',
      '饭 est du sud, 米饭 est du nord'
    ],
    correctIndex: 1,
    explanation: '饭 peut signifier « repas » (吃饭 = prendre un repas) OU « riz cuit » par défaut. 米饭 précise « riz blanc cuit ». En Chine du Nord, 饭 peut aussi désigner des pâtes ou mantou.',
    explanationEn: '饭 can mean «meal» (吃饭 = have a meal) OR «cooked rice» by default. 米饭 specifically means «cooked white rice». In Northern China, 饭 may also cover noodles or buns.'
  }
];

// --- A1 Daily M2 : Aller quelque part -------------------------------------
// Flashcards : 去, 来, 到, 家, 学校, 商店, 饭馆, 哪里
const A1_DAILY_M2: LessonV2Exercise[] = [
  {
    id: 'cecr-a1-daily-m2-gq1',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Tu es au bureau. Ton collègue dit qu\u2019il passera te voir. Il dit :',
    promptEn: 'You\u2019re at the office. Your coworker says he\u2019ll come see you. He says:',
    choices: ['\u6211\u53BB', '\u6211\u6765', '\u6211\u5230', '\u6211\u8D70'],
    correctIndex: 1,
    explanation: '来 = venir (vers le locuteur). 去 = aller (loin du locuteur). Ici il vient vers TOI → 我来. S\u2019il disait 我去, il s\u2019éloignerait de toi.',
    explanationEn: '来 = come (toward speaker). 去 = go (away from speaker). Here he\u2019s coming to YOU → 我来. If he said 我去, he\u2019d be moving away from you.'
  },
  {
    id: 'cecr-a1-daily-m2-fill1',
    type: 'fill',
    category: 'vocabulary',
    prompt: 'Rendez-vous au restaurant.',
    promptEn: 'Meeting at the restaurant.',
    sentence: '\u6211\u4EEC\u665A\u4E0A___\u996D\u9986\u3002',
    sentenceEn: 'Tonight we go to the restaurant.',
    choices: ['\u53BB', '\u6765', '\u5230', '\u5728'],
    correctIndex: 0,
    explanation: '去 + destination, sans préposition « à ». 去饭馆 = aller au restaurant. 来饭馆 si tu y es déjà. 在 = être situé à (sans mouvement).',
    explanationEn: '去 + destination, no «to» preposition. 去饭馆 = go to the restaurant. Use 来饭馆 if you\u2019re already there. 在 = be located (no movement).'
  },
  {
    id: 'cecr-a1-daily-m2-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Ordonne : « Je rentre à la maison. » (j\u2019arrive chez moi)',
    promptEn: 'Reorder: «I arrive home.»',
    sentence: 'J\u2019arrive à la maison.',
    sentenceEn: 'I arrive home.',
    choices: ['\u6211', '\u5230', '\u5BB6', '\u4E86'],
    correctIndex: 0,
    explanation: 'Ordre : sujet + 到 + lieu + 了. Le 了 final marque le changement d\u2019état « maintenant je suis à la maison ». Sans 了 on dirait une action en cours.',
    explanationEn: 'Order: subject + 到 + place + 了. Final 了 marks the state change «now I\u2019m home». Without 了 it sounds like an ongoing action.'
  },
  {
    id: 'cecr-a1-daily-m2-trans-zh2fr',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « 你去哪里？我去学校。»',
    promptEn: 'Translate: «你去哪里? 我去学校。»',
    choices: [
      'D\u2019où viens-tu ? Je viens de l\u2019école.',
      'Où vas-tu ? Je vais à l\u2019école.',
      'Où es-tu ? Je suis à l\u2019école.',
      'Où arrives-tu ? J\u2019arrive à l\u2019école.'
    ],
    correctIndex: 1,
    explanation: '去哪里 ? = « où vas-tu ? ». 我去学校 = « je vais à l\u2019école ». Le lieu suit DIRECTEMENT le verbe, sans préposition.',
    explanationEn: '去哪里? = «where are you going?». 我去学校 = «I\u2019m going to school». The place follows the verb DIRECTLY, no preposition.'
  },
  {
    id: 'cecr-a1-daily-m2-trans-fr2zh',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « Viens ici ! »',
    promptEn: 'Translate: «Come here!»',
    choices: ['\u8FD9\u91CC\u6765\uFF01', '\u6765\u8FD9\u91CC\uFF01', '\u53BB\u8FD9\u91CC\uFF01', '\u5230\u8FD9\u91CC\u6765\uFF01'],
    correctIndex: 1,
    explanation: '来 + lieu = venir à un endroit. 来这里 / 过来 = viens ici. On peut renforcer avec 请 : 请过来. 去这里 serait absurde (on y est déjà).',
    explanationEn: '来 + place = come to a spot. 来这里 / 过来 = come here. Softened with 请: 请过来. 去这里 is absurd (you\u2019re already there).'
  },
  {
    id: 'cecr-a1-daily-m2-err1',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Quel mot est en trop : « 我 / 去 / 到 / 学校 » ?',
    promptEn: 'Which word is extra: «我 / 去 / 到 / 学校»?',
    sentence: '\u6211 / \u53BB / \u5230 / \u5B66\u6821',
    choices: ['\u6211', '\u53BB', '\u5230', '\u5B66\u6821'],
    correctIndex: 2,
    explanation: '去 et 到 ne se combinent pas pour « aller à ». Soit 我去学校 (j\u2019y vais), soit 我到学校 (j\u2019y arrive). Pas 我去到学校.',
    explanationEn: '去 and 到 don\u2019t combine for «go to». Either 我去学校 (I\u2019m going) or 我到学校 (I arrive). Never 我去到学校.'
  },
  {
    id: 'cecr-a1-daily-m2-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute — quelle direction ?',
    promptEn: 'Listen — which direction?',
    choices: [
      '\u53BB (qù, aller)',
      '\u6765 (lái, venir)',
      '\u5230 (dào, arriver)',
      '\u8FD4 (fǎn, retourner)'
    ],
    correctIndex: 0,
    explanation: '去 = qù (ton 4 descendant). 来 = lái (ton 2 montant). 到 = dào (ton 4). Le ton 4 de 去 est sec et coupé ; 到 plus long.',
    explanationEn: '去 = qù (tone 4 falling). 来 = lái (tone 2 rising). 到 = dào (tone 4). 去 has a crisp, cut tone 4; 到 feels longer.',
    audioHanzi: '\u53BB',
    autoPlay: true
  },
  {
    id: 'cecr-a1-daily-m2-mcq-reverse',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Quelle préposition chinoise place-t-on entre « aller » et la destination ?',
    promptEn: 'Which preposition goes between «go» and the destination?',
    choices: ['\u5230', '\u5728', '\u4ECE', 'aucune'],
    correctIndex: 3,
    explanation: 'En chinois, le lieu suit DIRECTEMENT le verbe : 去北京, 来学校, 到家. Pas de préposition « à ». Piège classique des francophones/anglophones.',
    explanationEn: 'In Chinese, the place follows the verb DIRECTLY: 去北京, 来学校, 到家. No «to» preposition. Classic trap for French/English speakers.'
  }
];

// --- A1 Daily M3 : Parler, lire, écouter ----------------------------------
// Flashcards : 说, 看, 听, 读, 写, 中文, 书, 电视
const A1_DAILY_M3: LessonV2Exercise[] = [
  {
    id: 'cecr-a1-daily-m3-gq1',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Quel verbe pour « lire un livre (pour soi-même, en silence) » ?',
    promptEn: 'Which verb for «read a book (silently, to oneself)»?',
    choices: ['\u8BF4\u4E66', '\u770B\u4E66', '\u8BFB\u4E66', '\u542C\u4E66'],
    correctIndex: 1,
    explanation: '看书 = lire (silencieusement). 读书 = lire à voix haute / étudier. 看电视 = regarder la TV. Distinction importante au quotidien.',
    explanationEn: '看书 = read (silently). 读书 = read aloud / study. 看电视 = watch TV. Everyday distinction to master.'
  },
  {
    id: 'cecr-a1-daily-m3-fill1',
    type: 'fill',
    category: 'vocabulary',
    prompt: 'Compétence de musique.',
    promptEn: 'Music skill.',
    sentence: '\u6211\u559C\u6B22___\u97F3\u4E50\u3002',
    sentenceEn: 'I like to ___ music.',
    choices: ['\u8BF4', '\u542C', '\u770B', '\u8BFB'],
    correctIndex: 1,
    explanation: '听 = écouter. 听音乐 = écouter de la musique. 看 serait « regarder de la musique » (concert/clip vidéo), mais seul 听 marche pour l\u2019audio pur.',
    explanationEn: '听 = listen. 听音乐 = listen to music. 看 would be «watch music» (concert/video clip), but only 听 works for pure audio.'
  },
  {
    id: 'cecr-a1-daily-m3-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Ordonne : « J\u2019apprends à écrire le chinois. »',
    promptEn: 'Reorder: «I\u2019m learning to write Chinese.»',
    sentence: 'J\u2019apprends à écrire le chinois.',
    sentenceEn: 'I\u2019m learning to write Chinese.',
    choices: ['\u6211', '\u5B66', '\u5199', '\u4E2D\u6587'],
    correctIndex: 0,
    explanation: 'Enchaînement verbal : V1 + V2 (+ objet). 学写中文 = « apprendre à écrire le chinois ». Pas besoin de « à » ou « pour » entre 学 et 写.',
    explanationEn: 'Verb chain: V1 + V2 (+ object). 学写中文 = «learn to write Chinese». No need for «to» or «for» between 学 and 写.'
  },
  {
    id: 'cecr-a1-daily-m3-trans-zh2fr',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « 他会说中文，但是不会写。»',
    promptEn: 'Translate: «他会说中文，但是不会写。»',
    choices: [
      'Il parle chinois mais n\u2019aime pas écrire.',
      'Il sait parler chinois mais ne sait pas écrire.',
      'Il écrit le chinois mais ne le parle pas.',
      'Il aime le chinois mais pas écrire.'
    ],
    correctIndex: 1,
    explanation: '会 = savoir faire. 会说 = savoir parler, 会写 = savoir écrire. 但是 = mais. Schéma classique de l\u2019apprenant oral.',
    explanationEn: '会 = know how to. 会说 = can speak, 会写 = can write. 但是 = but. A classic oral learner\u2019s pattern.'
  },
  {
    id: 'cecr-a1-daily-m3-trans-fr2zh',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « Ne parle pas fort, je regarde la télé. »',
    promptEn: 'Translate: «Don\u2019t talk loud, I\u2019m watching TV.»',
    choices: [
      '\u522B\u5927\u58F0\u8BF4\uFF0C\u6211\u542C\u7535\u89C6\u3002',
      '\u522B\u5927\u58F0\u8BF4\uFF0C\u6211\u770B\u7535\u89C6\u3002',
      '\u4E0D\u8BF4\u5927\u58F0\uFF0C\u6211\u8BFB\u7535\u89C6\u3002',
      '\u522B\u8BF4\u5927\u58F0\uFF0C\u6211\u7535\u89C6\u770B\u3002'
    ],
    correctIndex: 1,
    explanation: '看电视 est la collocation fixe (« regarder la TV »). 别 = interdiction douce (« ne fais pas »). 大声 = à voix haute (« fort »).',
    explanationEn: '看电视 is the fixed collocation («watch TV»). 别 = gentle prohibition («don\u2019t»). 大声 = loud voice.'
  },
  {
    id: 'cecr-a1-daily-m3-err1',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Quel verbe est faux : « 我 / 读 / 电视 » ?',
    promptEn: 'Which verb is wrong in «我 / 读 / 电视»?',
    sentence: '\u6211 / \u8BFB / \u7535\u89C6',
    choices: ['\u6211', '\u8BFB', '\u7535\u89C6', 'Tout est OK'],
    correctIndex: 1,
    explanation: '读电视 n\u2019existe pas. On regarde la TV → 看电视. 读 s\u2019emploie pour un texte écrit (读书, 读报) ou une étude orale (读课文).',
    explanationEn: '读电视 doesn\u2019t exist. You watch TV → 看电视. 读 applies to written text (读书, 读报) or oral study (读课文).'
  },
  {
    id: 'cecr-a1-daily-m3-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute — quel verbe de communication ?',
    promptEn: 'Listen — which communication verb?',
    choices: [
      '\u8BF4 (shuō, parler)',
      '\u542C (tīng, écouter)',
      '\u770B (kàn, regarder)',
      '\u5199 (xiě, écrire)'
    ],
    correctIndex: 0,
    explanation: '说 = shuō (ton 1 haut plat). 听 = tīng (ton 1), 看 = kàn (ton 4), 写 = xiě (ton 3). Plusieurs commencent par des sons /sh/ /x/ proches — le ton et la finale tranchent.',
    explanationEn: '说 = shuō (tone 1 high flat). 听 = tīng (tone 1), 看 = kàn (tone 4), 写 = xiě (tone 3). Several start with similar /sh/ /x/ sounds — tone and ending distinguish.',
    audioHanzi: '\u8BF4',
    autoPlay: true
  },
  {
    id: 'cecr-a1-daily-m3-mcq-reverse',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Quel trio universel utilise-t-on pour parler/lire/écrire une langue ?',
    promptEn: 'Which universal trio means speak/read/write a language?',
    choices: [
      '\u8BF4 + \u770B + \u5199',
      '\u8BF4 + \u8BFB + \u5199',
      '\u8BB2 + \u770B + \u7B54',
      '\u542C + \u8BF4 + \u5199'
    ],
    correctIndex: 0,
    explanation: 'Pour une langue, le trio standard est 说 (parler), 看 (lire silencieux), 写 (écrire). On peut remplacer 看 par 读 selon le contexte, mais 说+看+写 est le plus courant.',
    explanationEn: 'For a language, the standard trio is 说 (speak), 看 (read silently), 写 (write). 看 can swap to 读 by context, but 说+看+写 is most common.'
  }
];

// --- A1 Daily M4 : Avoir 有 / 没有 -----------------------------------------
// Flashcards : 有, 没有, 有一个, 有什么, 没什么, 有吗, 还有, 都有
const A1_DAILY_M4: LessonV2Exercise[] = [
  {
    id: 'cecr-a1-daily-m4-gq1',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: '有 a deux sens. Lesquels ?',
    promptEn: '有 has two meanings. Which?',
    choices: [
      'avoir + pouvoir',
      'avoir + vouloir',
      'avoir + il y a',
      'être + avoir'
    ],
    correctIndex: 2,
    explanation: '有 exprime la possession (我有书 = j\u2019ai un livre) ET l\u2019existence (桌上有书 = il y a un livre sur la table). Un seul mot pour deux sens distincts en français.',
    explanationEn: '有 covers both possession (我有书 = I have a book) AND existence (桌上有书 = there\u2019s a book on the table). One word, two senses.'
  },
  {
    id: 'cecr-a1-daily-m4-fill1',
    type: 'fill',
    category: 'grammar',
    prompt: 'Négation de 有.',
    promptEn: 'Negation of 有.',
    sentence: '\u6211___\u5144\u5F1F\u59D0\u59B9\u3002',
    sentenceEn: 'I don\u2019t have siblings.',
    choices: ['\u4E0D', '\u6CA1', '\u6CA1\u6709', '\u4E0D\u6709'],
    correctIndex: 2,
    explanation: '有 se nie UNIQUEMENT avec 没有 (jamais 不有). 我没有兄弟姐妹 = je n\u2019ai pas de fratrie. 没 seul est correct en contexte verbal mais 没有 est plus sûr pour un débutant.',
    explanationEn: '有 is negated ONLY with 没有 (never 不有). 我没有兄弟姐妹 = I have no siblings. Bare 没 works in verbal contexts but 没有 is safer for beginners.'
  },
  {
    id: 'cecr-a1-daily-m4-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Ordonne : « Il y a trois livres sur la table. »',
    promptEn: 'Reorder: «There are three books on the table.»',
    sentence: 'Il y a trois livres sur la table.',
    sentenceEn: 'There are three books on the table.',
    choices: ['\u684C\u4E0A', '\u6709', '\u4E09\u672C', '\u4E66'],
    correctIndex: 0,
    explanation: 'Structure existentielle : LIEU + 有 + quantité + classificateur + objet. 桌上 + 有 + 三本 + 书. Le lieu vient TOUJOURS en tête, jamais après 有.',
    explanationEn: 'Existential pattern: PLACE + 有 + quantity + classifier + object. 桌上 + 有 + 三本 + 书. Place ALWAYS comes first, never after 有.'
  },
  {
    id: 'cecr-a1-daily-m4-trans-zh2fr',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « 我们家有一只猫，还有一只狗。»',
    promptEn: 'Translate: «我们家有一只猫，还有一只狗。»',
    choices: [
      'Nous avons un chat et un chien chez nous.',
      'Notre maison a un chat, pas de chien.',
      'Il y a un chat ou un chien à la maison.',
      'Nous n\u2019avons ni chat ni chien.'
    ],
    correctIndex: 0,
    explanation: '还有 = « et aussi / en plus ». Permet d\u2019ajouter un élément à une énumération. 只 = classificateur des animaux (猫, 狗).',
    explanationEn: '还有 = «and also / furthermore». Adds an item to a list. 只 = classifier for animals (cats, dogs).'
  },
  {
    id: 'cecr-a1-daily-m4-trans-fr2zh',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « Est-ce que vous avez des questions ? »',
    promptEn: 'Translate: «Do you have any questions?»',
    choices: [
      '\u4F60\u4EEC\u6709\u95EE\u9898\u5417\uFF1F',
      '\u4F60\u4EEC\u662F\u95EE\u9898\u5417\uFF1F',
      '\u4F60\u4EEC\u6709\u4EC0\u4E48\u5417\uFF1F',
      '\u4F60\u4EEC\u6CA1\u6709\u95EE\u9898\uFF1F'
    ],
    correctIndex: 0,
    explanation: '有 + objet + 吗 ? = question sur la possession. 你们有问题吗 ? = structure standard pour une classe ou une réunion.',
    explanationEn: '有 + object + 吗? = possession question. 你们有问题吗? = standard classroom/meeting phrasing.'
  },
  {
    id: 'cecr-a1-daily-m4-err1',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Quel segment est faux : « 我 / 不 / 有 / 时间 » ?',
    promptEn: 'Which segment is wrong in «我 / 不 / 有 / 时间»?',
    sentence: '\u6211 / \u4E0D / \u6709 / \u65F6\u95F4',
    choices: ['\u6211', '\u4E0D', '\u6709', '\u65F6\u95F4'],
    correctIndex: 1,
    explanation: 'La seule négation valide de 有 est 没有 (jamais 不). Correct : 我没有时间 (« je n\u2019ai pas le temps »). Exception unique à la règle générale de 不.',
    explanationEn: 'The only valid negation of 有 is 没有 (never 不). Correct: 我没有时间 («I don\u2019t have time»). Unique exception to the general 不 rule.'
  },
  {
    id: 'cecr-a1-daily-m4-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute — avoir ou ne pas avoir ?',
    promptEn: 'Listen — have or not have?',
    choices: [
      '\u6709 (avoir)',
      '\u6CA1\u6709 (ne pas avoir)',
      '\u8FD8\u6709 (il y a aussi)',
      '\u90FD\u6709 (tout avoir)'
    ],
    correctIndex: 1,
    explanation: '没有 = méi yǒu (deux syllabes : ton 2 + ton 3). 有 seul = yǒu (ton 3). La présence de 没 initiale est la signature de la négation.',
    explanationEn: '没有 = méi yǒu (two syllables: tone 2 + tone 3). Bare 有 = yǒu (tone 3). Initial 没 is the negation signature.',
    audioHanzi: '\u6CA1\u6709',
    autoPlay: true
  },
  {
    id: 'cecr-a1-daily-m4-mcq-reverse',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Comment dit-on « il n\u2019y a rien » ?',
    promptEn: 'How to say «there\u2019s nothing»?',
    choices: ['\u4E0D\u6709', '\u6CA1\u4EC0\u4E48', '\u4E0D\u4EC0\u4E48', '\u6709\u6CA1\u6709'],
    correctIndex: 1,
    explanation: '没什么 = « rien / pas grand-chose ». Très courant en conversation, aussi pour répondre à « merci » (= « de rien »). 不有 n\u2019existe pas.',
    explanationEn: '没什么 = «nothing / no big deal». Very common in conversation, also used to reply «thanks» (= «you\u2019re welcome»). 不有 doesn\u2019t exist.'
  }
];

// ============================================================================
//  EXPORT
// ============================================================================

export const cecrExercisesEnrichedA1: Record<string, LessonV2Exercise[]> = {
  // --- A1 Hello (4) ---
  'cecr-a1-hello-m1': A1_HELLO_M1,
  'cecr-a1-hello-m2': A1_HELLO_M2,
  'cecr-a1-hello-m3': A1_HELLO_M3,
  'cecr-a1-hello-m4': A1_HELLO_M4,
  // --- A1 Numbers (5) ---
  'cecr-a1-numbers-m1': A1_NUMBERS_M1,
  'cecr-a1-numbers-m2': A1_NUMBERS_M2,
  'cecr-a1-numbers-m3': A1_NUMBERS_M3,
  'cecr-a1-numbers-m4': A1_NUMBERS_M4,
  'cecr-a1-numbers-m5': A1_NUMBERS_M5,
  // --- A1 Family (4) ---
  'cecr-a1-family-m1': A1_FAMILY_M1,
  'cecr-a1-family-m2': A1_FAMILY_M2,
  'cecr-a1-family-m3': A1_FAMILY_M3,
  'cecr-a1-family-m4': A1_FAMILY_M4,
  // --- A1 Grammar (5) ---
  'cecr-a1-grammar-m1': A1_GRAMMAR_M1,
  'cecr-a1-grammar-m2': A1_GRAMMAR_M2,
  'cecr-a1-grammar-m3': A1_GRAMMAR_M3,
  'cecr-a1-grammar-m4': A1_GRAMMAR_M4,
  'cecr-a1-grammar-m5': A1_GRAMMAR_M5,
  // --- A1 Daily (4) ---
  'cecr-a1-daily-m1': A1_DAILY_M1,
  'cecr-a1-daily-m2': A1_DAILY_M2,
  'cecr-a1-daily-m3': A1_DAILY_M3,
  'cecr-a1-daily-m4': A1_DAILY_M4
};
