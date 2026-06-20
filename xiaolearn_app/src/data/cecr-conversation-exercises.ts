/**
 * cecr-conversation-exercises.ts
 * --------------------------------
 * Exercices spécifiques aux leçons category=conversation. Utilise les nouveaux
 * types `dialogue-response` (mini-dialogue + choix de la dernière réplique) et
 * `context-react` (situation décrite → choix de la phrase appropriée).
 *
 * Première phase : 15 leçons A1 (a1-hello-m1..m4, a1-family-m2,
 * a1-conversation-m1..m5). Chaque leçon a 2-3 exercices nouveaux qui s'ajoutent
 * aux exercices existants via Object.assign dans cecr-exercises-all.ts.
 *
 * Pattern recommandé pour étendre aux 80 autres leçons Conversation :
 *   - 1 dialogue-response qui met l'apprenant en situation réelle
 *   - 1 context-react pour fixer une expression idiomatique
 *   - 1 mcq classique sur le vocab (déjà dans cecr-exercises*.ts)
 */

import type { LessonV2Exercise } from '../pages/StructuredLessonPageV2';

export const cecrConversationExercises: Record<string, LessonV2Exercise[]> = {
  // ─── a1-hello-m1 : Dire bonjour & au revoir ──────────────────────────────
  'cecr-a1-hello-m1': [
    {
      id: 'cecr-a1-hello-m1-dlg1',
      type: 'dialogue-response',
      category: 'vocabulary',
      prompt: 'Tu rencontres un nouveau collègue chinois. Choisis ta réponse.',
      promptEn: 'You meet a new Chinese colleague. Choose your reply.',
      dialogue: [
        {
          speaker: 'Lin',
          hanzi: '你好！',
          pinyin: 'nǐ hǎo!',
          translationFr: 'Bonjour !',
          translationEn: 'Hello!'
        },
        {
          speaker: 'Toi',
          speakerEn: 'You',
          hanzi: '',
          isUser: true
        }
      ],
      choices: ['你好！', '再见！', '谢谢！', '对不起！'],
      correctIndex: 0,
      explanation:
        '你好 (nǐ hǎo) est la réponse standard à 你好. 再见 = au revoir, 谢谢 = merci, 对不起 = pardon.',
      explanationEn:
        '你好 (nǐ hǎo) is the standard reply. 再见 = goodbye, 谢谢 = thanks, 对不起 = sorry.'
    },
    {
      id: 'cecr-a1-hello-m1-ctx1',
      type: 'context-react',
      category: 'vocabulary',
      prompt: 'Quelle phrase utiliser ?',
      promptEn: 'Which phrase fits?',
      context: 'Tu quittes ton cours de chinois et tu salues ta professeur en partant.',
      contextEn: "You're leaving your Chinese class and saying goodbye to your teacher.",
      choices: ['老师再见！', '老师你好！', '老师对不起！', '老师早上好！'],
      correctIndex: 0,
      explanation:
        '老师再见 (lǎoshī zàijiàn) = au revoir, professeur. 老师你好 serait pour la rencontrer.',
      explanationEn: '老师再见 = goodbye, teacher. 老师你好 would be when meeting them.'
    },
    {
      id: 'cecr-a1-hello-m1-dlg2',
      type: 'dialogue-response',
      category: 'vocabulary',
      prompt: 'À la fin du dîner avec un ami. Complète sa réplique.',
      promptEn: 'End of dinner with a friend. Complete their reply.',
      dialogue: [
        {
          speaker: 'Toi',
          speakerEn: 'You',
          hanzi: '我要回家了。再见！',
          pinyin: 'wǒ yào huí jiā le. zàijiàn!',
          translationFr: 'Je rentre. Au revoir !',
          translationEn: "I'm going home. Bye!",
          isUser: true
        },
        {
          speaker: 'Wang',
          hanzi: '',
        }
      ],
      choices: ['好的，明天见！', '你好！', '不客气！', '没关系！'],
      correctIndex: 0,
      explanation:
        '明天见 (míngtiān jiàn) = à demain. Réponse naturelle à un au revoir entre amis. 不客气 = de rien (réponse à merci).',
      explanationEn:
        '明天见 = see you tomorrow. Natural reply to a goodbye between friends.'
    }
  ],

  // ─── a1-hello-m2 : Merci & s'excuser ─────────────────────────────────────
  'cecr-a1-hello-m2': [
    {
      id: 'cecr-a1-hello-m2-dlg1',
      type: 'dialogue-response',
      category: 'vocabulary',
      prompt: 'Tu marches dans la rue et tu bouscules quelqu\'un. Choisis ta réponse.',
      promptEn: 'You bump into someone on the street. Choose your reply.',
      dialogue: [
        {
          speaker: 'Toi',
          speakerEn: 'You',
          hanzi: '',
          isUser: true
        }
      ],
      choices: ['对不起！', '你好！', '再见！', '不客气！'],
      correctIndex: 0,
      explanation:
        '对不起 (duìbuqǐ) = pardon / excuse-moi. La phrase qu\'on dit immédiatement après avoir gêné quelqu\'un.',
      explanationEn: '对不起 (duìbuqǐ) = sorry. What you say right after inconveniencing someone.'
    },
    {
      id: 'cecr-a1-hello-m2-dlg2',
      type: 'dialogue-response',
      category: 'vocabulary',
      prompt: 'Un ami te tend un café. Complète sa réplique après ton remerciement.',
      promptEn: 'A friend hands you a coffee. Complete their reply after your thanks.',
      dialogue: [
        {
          speaker: 'Ami',
          speakerEn: 'Friend',
          hanzi: '给你的咖啡。',
          pinyin: 'gěi nǐ de kāfēi.',
          translationFr: 'Voilà ton café.',
          translationEn: 'Here\'s your coffee.'
        },
        {
          speaker: 'Toi',
          speakerEn: 'You',
          hanzi: '谢谢！',
          pinyin: 'xièxiè!',
          translationFr: 'Merci !',
          translationEn: 'Thanks!',
          isUser: true
        },
        {
          speaker: 'Ami',
          speakerEn: 'Friend',
          hanzi: ''
        }
      ],
      choices: ['不客气！', '对不起！', '你好！', '是的！'],
      correctIndex: 0,
      explanation:
        '不客气 (bú kèqi) = de rien / je t\'en prie. Réponse classique à 谢谢. 没关系 marcherait après 对不起 (= pas grave).',
      explanationEn: '不客气 = you\'re welcome. Classic reply to 谢谢. 没关系 would follow 对不起.'
    },
    {
      id: 'cecr-a1-hello-m2-ctx1',
      type: 'context-react',
      category: 'vocabulary',
      prompt: 'Que dire ?',
      promptEn: 'What do you say?',
      context: 'Tu arrives en retard à un rendez-vous important. Comment t\'excuser ?',
      contextEn: "You're late to an important meeting. How do you apologize?",
      choices: [
        '对不起，我迟到了。',
        '你好，我迟到了。',
        '再见，我迟到了。',
        '不客气，我迟到了。'
      ],
      correctIndex: 0,
      explanation:
        '对不起 ouvre l\'excuse. 迟到 (chídào) = être en retard. Forme habituelle : 对不起，我迟到了.',
      explanationEn:
        '对不起 opens the apology. 迟到 = to be late. Standard form: 对不起，我迟到了.'
    }
  ],

  // ─── a1-hello-m3 : Se présenter ──────────────────────────────────────────
  'cecr-a1-hello-m3': [
    {
      id: 'cecr-a1-hello-m3-dlg1',
      type: 'dialogue-response',
      category: 'vocabulary',
      prompt: 'Premier jour à l\'école. Réponds à la question.',
      promptEn: 'First day of school. Answer the question.',
      dialogue: [
        {
          speaker: 'Prof.',
          speakerEn: 'Teacher',
          hanzi: '你叫什么名字？',
          pinyin: 'nǐ jiào shénme míngzi?',
          translationFr: 'Comment t\'appelles-tu ?',
          translationEn: 'What\'s your name?'
        },
        {
          speaker: 'Toi',
          speakerEn: 'You',
          hanzi: '',
          isUser: true
        }
      ],
      choices: ['我叫李明。', '你好！', '谢谢！', '再见！'],
      correctIndex: 0,
      explanation:
        '我叫 + (prénom) = je m\'appelle X. Structure : 我叫 (wǒ jiào) + nom complet ou prénom. C\'est la réponse universelle à 你叫什么名字.',
      explanationEn:
        '我叫 + (name) = my name is X. Universal answer to 你叫什么名字.'
    },
    {
      id: 'cecr-a1-hello-m3-ctx1',
      type: 'context-react',
      category: 'vocabulary',
      prompt: 'Comment te présenter ?',
      promptEn: 'How do you introduce yourself?',
      context: 'Tu rencontres pour la première fois la famille de ton ami chinois et tu dois dire « bonjour, je suis Perrine, enchantée ».',
      contextEn: "You're meeting your Chinese friend's family for the first time and need to say \"hi, I'm Perrine, nice to meet you\".",
      choices: [
        '你们好，我叫 Perrine，认识你们很高兴。',
        '再见，我叫 Perrine。',
        '对不起，我叫 Perrine。',
        '不客气，我叫 Perrine。'
      ],
      correctIndex: 0,
      explanation:
        '认识你们很高兴 (rènshi nǐmen hěn gāoxìng) = enchanté(e) de vous rencontrer. Construction polie standard pour une présentation.',
      explanationEn:
        '认识你们很高兴 = nice to meet you. Standard polite phrasing for introductions.'
    }
  ],

  // ─── a1-hello-m4 : Dire d'où on vient ────────────────────────────────────
  'cecr-a1-hello-m4': [
    {
      id: 'cecr-a1-hello-m4-dlg1',
      type: 'dialogue-response',
      category: 'vocabulary',
      prompt: 'On te demande ta nationalité. Réponds.',
      promptEn: 'Someone asks your nationality. Answer.',
      dialogue: [
        {
          speaker: 'Wang',
          hanzi: '你是哪国人？',
          pinyin: 'nǐ shì nǎ guó rén?',
          translationFr: 'Tu viens de quel pays ?',
          translationEn: 'What country are you from?'
        },
        {
          speaker: 'Toi',
          speakerEn: 'You',
          hanzi: '',
          isUser: true
        }
      ],
      choices: ['我是法国人。', '我叫法国人。', '你好法国人。', '再见法国人。'],
      correctIndex: 0,
      explanation:
        '我是 + nationalité = je suis [nationalité]. 法国人 (fǎguó rén) = français(e). Structure : 我是X人.',
      explanationEn:
        '我是 + nationality = I am [nationality]. Structure: 我是 X 人.'
    },
    {
      id: 'cecr-a1-hello-m4-ctx1',
      type: 'context-react',
      category: 'vocabulary',
      prompt: 'Quelle question poser ?',
      promptEn: 'Which question to ask?',
      context: 'Tu veux demander poliment à quelqu\'un d\'où il vient.',
      contextEn: 'You want to politely ask someone where they\'re from.',
      choices: ['您是哪国人？', '您是什么名字？', '您几岁？', '您再见！'],
      correctIndex: 0,
      explanation:
        '哪国人 = de quel pays. 您 (nín) est la forme polie de 你. Mieux qu\'un simple 你 avec un inconnu.',
      explanationEn:
        '哪国人 = from which country. 您 is the polite form. Better than 你 with strangers.'
    }
  ],

  // ─── a1-family-m2 : Mon âge, ton âge ────────────────────────────────────
  'cecr-a1-family-m2': [
    {
      id: 'cecr-a1-family-m2-dlg1',
      type: 'dialogue-response',
      category: 'vocabulary',
      prompt: 'On te demande ton âge. Réponds.',
      promptEn: 'Someone asks your age. Answer.',
      dialogue: [
        {
          speaker: 'Wang',
          hanzi: '你今年多大？',
          pinyin: 'nǐ jīnnián duō dà?',
          translationFr: 'Quel âge as-tu cette année ?',
          translationEn: 'How old are you this year?'
        },
        {
          speaker: 'Toi',
          speakerEn: 'You',
          hanzi: '',
          isUser: true
        }
      ],
      choices: ['我今年二十岁。', '我叫二十。', '我是二十。', '再见二十！'],
      correctIndex: 0,
      explanation:
        '我今年 + nombre + 岁 = j\'ai X ans cette année. 岁 (suì) est obligatoire après le nombre pour l\'âge.',
      explanationEn:
        '我今年 + number + 岁 = I am X years old. 岁 is required after the number for age.'
    },
    {
      id: 'cecr-a1-family-m2-ctx1',
      type: 'context-react',
      category: 'vocabulary',
      prompt: 'Quelle question pour un enfant ?',
      promptEn: 'What question for a child?',
      context: 'Tu rencontres la petite fille de 5 ans d\'une amie et tu veux lui demander son âge.',
      contextEn: 'You meet your friend\'s 5-year-old daughter and want to ask her age.',
      choices: ['你几岁？', '你多大了？', '你今年多大？', '您高寿？'],
      correctIndex: 0,
      explanation:
        '你几岁 (jǐ suì) = quel âge as-tu ? — réservé aux enfants (< 10 ans). 你多大 / 你今年多大 = pour ados et adultes. 高寿 = formule très respectueuse pour les personnes âgées.',
      explanationEn:
        '你几岁 = for kids < 10. 你多大 = for teens and adults. 高寿 = respectful for elderly.'
    }
  ],

  // ─── a1-conversation-m1 : Les 4 mots de politesse ────────────────────────
  'cecr-a1-conversation-m1': [
    {
      id: 'cecr-a1-conv-m1-dlg1',
      type: 'dialogue-response',
      category: 'vocabulary',
      prompt: 'Au restaurant, tu demandes l\'addition. Choisis ta phrase.',
      promptEn: 'At the restaurant, you ask for the bill. Choose your line.',
      dialogue: [
        {
          speaker: 'Toi',
          speakerEn: 'You',
          hanzi: '',
          isUser: true
        },
        {
          speaker: 'Serveur',
          speakerEn: 'Waiter',
          hanzi: '好的，马上来。',
          pinyin: 'hǎo de, mǎshàng lái.',
          translationFr: 'D\'accord, j\'arrive tout de suite.',
          translationEn: 'OK, right away.'
        }
      ],
      choices: [
        '请买单，谢谢！',
        '对不起，买单！',
        '再见，买单！',
        '不客气，买单！'
      ],
      correctIndex: 0,
      explanation:
        '请 (qǐng) = s\'il te plaît / s\'il vous plaît. 买单 (mǎidān) = l\'addition. Forme polie : 请 + action + 谢谢.',
      explanationEn:
        '请 = please. 买单 = the bill. Polite form: 请 + action + 谢谢.'
    },
    {
      id: 'cecr-a1-conv-m1-ctx1',
      type: 'context-react',
      category: 'vocabulary',
      prompt: 'Quelle réponse polie ?',
      promptEn: 'Which polite reply?',
      context: 'Quelqu\'un te tient la porte. Tu remercies et lui réponds-toi à un éventuel "de rien".',
      contextEn: 'Someone holds the door for you. You thank them, then reply if they say "you\'re welcome".',
      choices: [
        '谢谢！ — 不客气！',
        '对不起！ — 没关系！',
        '你好！ — 你好！',
        '再见！ — 再见！'
      ],
      correctIndex: 0,
      explanation:
        '谢谢 ↔ 不客气 (merci ↔ de rien). 对不起 ↔ 没关系 (pardon ↔ pas grave). Bien distinguer les deux paires.',
      explanationEn:
        '谢谢 ↔ 不客气 (thanks ↔ welcome). 对不起 ↔ 没关系 (sorry ↔ no worries).'
    }
  ],

  // ─── a1-conversation-m2 : Je n'ai pas compris ────────────────────────────
  'cecr-a1-conversation-m2': [
    {
      id: 'cecr-a1-conv-m2-dlg1',
      type: 'dialogue-response',
      category: 'vocabulary',
      prompt: 'Ton interlocuteur parle trop vite. Choisis comment lui dire.',
      promptEn: 'Your speaker talks too fast. Choose how to say it.',
      dialogue: [
        {
          speaker: 'Wang',
          hanzi: '我昨天去了一个很有趣的地方，那里有很多美食和……',
          pinyin: 'wǒ zuótiān qù le yī gè hěn yǒuqù de dìfāng, nàlǐ yǒu hěn duō měishí hé...',
          translationFr: 'Hier je suis allé dans un endroit super intéressant, il y avait plein de bonnes choses à manger et…',
          translationEn: 'Yesterday I went to a really interesting place with lots of good food and...'
        },
        {
          speaker: 'Toi',
          speakerEn: 'You',
          hanzi: '',
          isUser: true
        }
      ],
      choices: [
        '对不起，请说慢一点。',
        '对不起，请再见。',
        '不好意思，我叫你。',
        '谢谢，我去了。'
      ],
      correctIndex: 0,
      explanation:
        '请说慢一点 (qǐng shuō màn yīdiǎn) = parle plus doucement s\'il te plaît. 慢一点 = un peu plus lentement. Formule clé quand on est dépassé.',
      explanationEn:
        '请说慢一点 = please speak more slowly. Key phrase when overwhelmed.'
    },
    {
      id: 'cecr-a1-conv-m2-ctx1',
      type: 'context-react',
      category: 'vocabulary',
      prompt: 'Que demander ?',
      promptEn: 'What to ask?',
      context: 'Ton ami chinois utilise un mot que tu ne connais pas. Comment demander qu\'il répète ?',
      contextEn: 'Your Chinese friend uses a word you don\'t know. How to ask them to repeat?',
      choices: [
        '请再说一遍。',
        '请买单。',
        '请坐。',
        '请进。'
      ],
      correctIndex: 0,
      explanation:
        '请再说一遍 (qǐng zài shuō yí biàn) = répète une fois, s\'il te plaît. 一遍 = une fois (pour une action répétée). 请买单 = l\'addition, 请坐 = assieds-toi, 请进 = entre.',
      explanationEn:
        '请再说一遍 = please say it again. 一遍 = one time (for repeated action).'
    }
  ],

  // ─── a1-conversation-m3 : Réactions courtes 是/对/好/行/明白了 ────────────
  'cecr-a1-conversation-m3': [
    {
      id: 'cecr-a1-conv-m3-dlg1',
      type: 'dialogue-response',
      category: 'vocabulary',
      prompt: 'Un ami te propose un plan. Choisis la réaction adaptée.',
      promptEn: 'A friend suggests a plan. Choose the right reaction.',
      dialogue: [
        {
          speaker: 'Ami',
          speakerEn: 'Friend',
          hanzi: '我们今天晚上去吃火锅，怎么样？',
          pinyin: 'wǒmen jīntiān wǎnshàng qù chī huǒguō, zěnmeyàng?',
          translationFr: 'On va manger un hot pot ce soir, qu\'en dis-tu ?',
          translationEn: 'Let\'s go for hot pot tonight, how about it?'
        },
        {
          speaker: 'Toi',
          speakerEn: 'You',
          hanzi: '',
          isUser: true
        }
      ],
      choices: ['好！', '是！', '对！', '明白了！'],
      correctIndex: 0,
      explanation:
        '好 (hǎo) = OK / d\'accord — accepter une proposition. 是 sert à confirmer une identité/fait, pas à accepter. 对 = exact (confirmer une info). 明白了 = j\'ai compris (après une explication).',
      explanationEn:
        '好 = OK to accept a proposal. 是 confirms an identity/fact, not an offer. 对 = right. 明白了 = I got it (after explanation).'
    },
    {
      id: 'cecr-a1-conv-m3-dlg2',
      type: 'dialogue-response',
      category: 'vocabulary',
      prompt: 'Le prof t\'explique une règle. Tu confirmes que tu as saisi.',
      promptEn: 'The teacher explains a rule. Confirm you understood.',
      dialogue: [
        {
          speaker: 'Prof.',
          speakerEn: 'Teacher',
          hanzi: '"了" 表示动作完成了。明白吗？',
          pinyin: '"le" biǎoshì dòngzuò wánchéng le. míngbai ma?',
          translationFr: '« 了 » indique que l\'action est terminée. Tu comprends ?',
          translationEn: '"了" marks that the action is completed. Got it?'
        },
        {
          speaker: 'Toi',
          speakerEn: 'You',
          hanzi: '',
          isUser: true
        }
      ],
      choices: ['明白了！', '好！', '是！', '对！'],
      correctIndex: 0,
      explanation:
        '明白了 (míngbai le) = j\'ai compris — saisi le sens d\'une explication. C\'est exactement ce qu\'on attend après une règle de grammaire. 好 serait pour accepter ; 是/对 = confirmer un fait.',
      explanationEn:
        '明白了 = I got it — caught the meaning of an explanation. Exactly the response after a grammar rule.'
    }
  ],

  // ─── a1-conversation-m4 : Hésiter sans se taire ──────────────────────────
  'cecr-a1-conversation-m4': [
    {
      id: 'cecr-a1-conv-m4-dlg1',
      type: 'dialogue-response',
      category: 'vocabulary',
      prompt: 'On te demande ton plat préféré, tu cherches tes mots. Comble le blanc.',
      promptEn: 'You\'re asked your favorite dish, you\'re searching for words. Fill the gap.',
      dialogue: [
        {
          speaker: 'Wang',
          hanzi: '你最喜欢什么中国菜？',
          pinyin: 'nǐ zuì xǐhuan shénme zhōngguó cài?',
          translationFr: 'Quel plat chinois préfères-tu ?',
          translationEn: 'What\'s your favorite Chinese dish?'
        },
        {
          speaker: 'Toi',
          speakerEn: 'You',
          hanzi: '',
          isUser: true
        }
      ],
      choices: [
        '嗯……那个……麻婆豆腐！',
        '再见……麻婆豆腐！',
        '对不起……麻婆豆腐！',
        '不客气……麻婆豆腐！'
      ],
      correctIndex: 0,
      explanation:
        '嗯 (ǹg) + 那个 (nèige) = fillers naturels qui gagnent du temps de réflexion. Sans eux, ton silence sonnerait comme "je n\'ai pas compris la question".',
      explanationEn:
        '嗯 + 那个 = natural fillers to buy thinking time. Without them, silence sounds like "I didn\'t understand".'
    },
    {
      id: 'cecr-a1-conv-m4-ctx1',
      type: 'context-react',
      category: 'vocabulary',
      prompt: 'Comment relancer ?',
      promptEn: 'How to prompt more?',
      context: 'Ton ami te raconte un voyage mais il s\'arrête. Tu veux qu\'il continue.',
      contextEn: 'Your friend is telling you about a trip but stops. You want them to continue.',
      choices: ['然后呢？', '再见！', '不客气！', '对不起！'],
      correctIndex: 0,
      explanation:
        '然后呢？(ránhòu ne?) = et ensuite ? Petite question parfaite pour relancer un récit. Sans elle, ton interlocuteur arrête.',
      explanationEn:
        '然后呢？= and then? Perfect short prompt to keep a story going.'
    }
  ],

  // ─── a1-conversation-m5 : Au café et en taxi ─────────────────────────────
  'cecr-a1-conversation-m5': [
    {
      id: 'cecr-a1-conv-m5-dlg1',
      type: 'dialogue-response',
      category: 'vocabulary',
      prompt: 'Au café, tu veux commander. Choisis ta phrase.',
      promptEn: 'At the café, you want to order. Choose your line.',
      dialogue: [
        {
          speaker: 'Serveur',
          speakerEn: 'Barista',
          hanzi: '您要什么？',
          pinyin: 'nín yào shénme?',
          translationFr: 'Vous voulez quoi ?',
          translationEn: 'What would you like?'
        },
        {
          speaker: 'Toi',
          speakerEn: 'You',
          hanzi: '',
          isUser: true
        }
      ],
      choices: [
        '我要一杯咖啡，谢谢。',
        '我叫一杯咖啡。',
        '再见，一杯咖啡。',
        '对不起，一杯咖啡。'
      ],
      correctIndex: 0,
      explanation:
        '我要 + quantité + objet = je voudrais X. 一杯 (yī bēi) = un verre / une tasse (mesureur pour les boissons). 我叫 = je m\'appelle, sans rapport.',
      explanationEn:
        '我要 + quantity + object = I\'d like X. 一杯 = one cup (measure word for drinks).'
    },
    {
      id: 'cecr-a1-conv-m5-dlg2',
      type: 'dialogue-response',
      category: 'vocabulary',
      prompt: 'Tu montes dans un taxi. Indique ta destination.',
      promptEn: 'You get into a taxi. State your destination.',
      dialogue: [
        {
          speaker: 'Chauffeur',
          speakerEn: 'Driver',
          hanzi: '您去哪儿？',
          pinyin: 'nín qù nǎr?',
          translationFr: 'Vous allez où ?',
          translationEn: 'Where to?'
        },
        {
          speaker: 'Toi',
          speakerEn: 'You',
          hanzi: '',
          isUser: true
        }
      ],
      choices: [
        '我去机场，谢谢。',
        '我叫机场。',
        '机场再见！',
        '机场对不起。'
      ],
      correctIndex: 0,
      explanation:
        '我去 + lieu = je vais à X. 机场 (jīchǎng) = aéroport. Formule basique pour donner une destination au chauffeur.',
      explanationEn:
        '我去 + place = I\'m going to X. 机场 = airport.'
    },
    {
      id: 'cecr-a1-conv-m5-ctx1',
      type: 'context-react',
      category: 'vocabulary',
      prompt: 'Comment payer ?',
      promptEn: 'How to pay?',
      context: 'Tu es arrivé à destination en taxi et tu veux payer la course.',
      contextEn: "You've arrived at your destination by taxi and want to pay.",
      choices: [
        '多少钱？',
        '什么钱？',
        '谁钱？',
        '哪儿钱？'
      ],
      correctIndex: 0,
      explanation:
        '多少钱？(duōshǎo qián?) = combien ça coûte ? Question universelle pour le prix. 多少 = combien (pour grands nombres).',
      explanationEn:
        '多少钱？= how much? Universal price question. 多少 = how much (for large numbers).'
    }
  ]
};
