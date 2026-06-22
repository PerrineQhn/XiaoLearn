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
        '你好 (nǐhǎo) est la réponse standard à 你好. 再见 = au revoir, 谢谢 = merci, 对不起 = pardon.',
      explanationEn:
        '你好 (nǐhǎo) is the standard reply. 再见 = goodbye, 谢谢 = thanks, 对不起 = sorry.'
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
        '我是 + nationalité = je suis [nationalité]. 法国人 (fǎguórén) = français(e). Structure : 我是X人.',
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
        '请再说一遍 (qǐng zàishuō yíbiàn) = répète une fois, s\'il te plaît. 一遍 = une fois (pour une action répétée). 请买单 = l\'addition, 请坐 = assieds-toi, 请进 = entre.',
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
  // ─── a1-conversation-m6 : Prendre congé ─────────────────────────────────
  'cecr-a1-conversation-m6': [
    {
      id: 'cecr-a1-conv-m6-dlg1',
      type: 'dialogue-response',
      category: 'vocabulary',
      prompt: 'Tu quittes une soirée chez un ami. Complète la conversation.',
      promptEn: "You're leaving a friend's party. Complete the conversation.",
      dialogue: [
        { speaker: 'Toi', speakerEn: 'You', hanzi: '我先走了。', pinyin: 'wǒ xiān zǒu le.', translationFr: 'Je vais y aller.', translationEn: "I'm heading out.", isUser: true },
        { speaker: 'Ami', speakerEn: 'Friend', hanzi: '' }
      ],
      choices: ['路上小心！', '我先走了！', '对不起！', '不客气！'],
      correctIndex: 0,
      explanation: '路上小心 (lùshang xiǎoxīn) = fais attention sur la route. Phrase culturelle obligatoire en chinois quand quelqu\'un part le soir.',
      explanationEn: '路上小心 = take care on the way. Cultural must-say when someone leaves at night.'
    }
  ],

  // ─── a1-conversation-m7 : Demander un service ────────────────────────────
  'cecr-a1-conversation-m7': [
    {
      id: 'cecr-a1-conv-m7-ctx1',
      type: 'context-react',
      category: 'vocabulary',
      prompt: 'Comment demander poliment ?',
      promptEn: 'How to ask politely?',
      context: 'Tu es perdu dans la rue et tu veux demander où se trouve la station de métro la plus proche.',
      contextEn: 'You\'re lost and want to ask where the nearest metro station is.',
      choices: ['请问，地铁站在哪儿？', '你好！地铁站！', '再见，地铁站！', '不客气，地铁站？'],
      correctIndex: 0,
      explanation: '请问 (qǐngwèn) = excusez-moi, puis-je demander. Formule polie pour interpeller un inconnu. 地铁站 = station de métro.',
      explanationEn: '请问 = excuse me, may I ask. Polite opener for a stranger. 地铁站 = metro station.'
    }
  ],

  // ─── a2-city-m1 : Demander son chemin ────────────────────────────────────
  'cecr-a2-city-m1': [
    {
      id: 'cecr-a2-city-m1-dlg1',
      type: 'dialogue-response',
      category: 'vocabulary',
      prompt: "Tu demandes ton chemin à un passant. Choisis ta réplique.",
      promptEn: 'You ask a passerby for directions. Choose your line.',
      dialogue: [
        { speaker: 'Toi', speakerEn: 'You', hanzi: '请问，去王府井怎么走？', pinyin: 'qǐng wèn, qù Wángfǔjǐng zěnme zǒu?', translationFr: 'Excusez-moi, comment va-t-on à Wangfujing ?', translationEn: 'Excuse me, how do I get to Wangfujing?', isUser: true },
        { speaker: 'Passant', speakerEn: 'Passerby', hanzi: '一直往前走，然后右转。', pinyin: 'yìzhí wǎng qián zǒu, ránhòu yòu zhuǎn.', translationFr: 'Tout droit, puis à droite.', translationEn: 'Straight ahead, then turn right.' },
        { speaker: 'Toi', speakerEn: 'You', hanzi: '', isUser: true }
      ],
      choices: ['谢谢您！', '对不起！', '我先走了！', '路上小心！'],
      correctIndex: 0,
      explanation: '谢谢您 (xièxie nín) = merci (forme polie). 您 marque le respect après que quelqu\'un t\'a aidé.',
      explanationEn: '谢谢您 = thanks (polite). 您 marks respect after being helped.'
    }
  ],

  // ─── a2-city-m4 : Réserver un taxi Didi ──────────────────────────────────
  'cecr-a2-city-m4': [
    {
      id: 'cecr-a2-city-m4-dlg1',
      type: 'dialogue-response',
      category: 'vocabulary',
      prompt: 'Le chauffeur Didi t\'appelle pour confirmer. Réponds.',
      promptEn: 'The Didi driver calls to confirm. Reply.',
      dialogue: [
        { speaker: 'Chauffeur', speakerEn: 'Driver', hanzi: '您好，您在小区门口吗？', pinyin: 'nín hǎo, nín zài xiǎoqū ménkǒu ma?', translationFr: 'Bonjour, vous êtes à l\'entrée de la résidence ?', translationEn: "Hi, are you at the residence entrance?" },
        { speaker: 'Toi', speakerEn: 'You', hanzi: '', isUser: true }
      ],
      choices: ['对，我在这里等您。', '不客气，我在这里。', '再见，我在这里。', '我叫这里。'],
      correctIndex: 0,
      explanation: '对 (duì) = oui, c\'est ça (confirme un fait). 在这里等您 = je vous attends ici. Forme parfaite pour confirmer un point de rendez-vous.',
      explanationEn: '对 = yes that\'s right. 在这里等您 = I wait for you here.'
    }
  ],

  // ─── a2-food-m1 : Au restaurant : commander ─────────────────────────────
  'cecr-a2-food-m1': [
    {
      id: 'cecr-a2-food-m1-dlg1',
      type: 'dialogue-response',
      category: 'vocabulary',
      prompt: 'Au restaurant. Réponds au serveur.',
      promptEn: 'At the restaurant. Reply to the waiter.',
      dialogue: [
        { speaker: 'Serveur', speakerEn: 'Waiter', hanzi: '你们要点什么？', pinyin: 'nǐmen yào diǎn shénme?', translationFr: 'Vous voulez commander quoi ?', translationEn: 'What would you like to order?' },
        { speaker: 'Toi', speakerEn: 'You', hanzi: '', isUser: true }
      ],
      choices: ['我们要一份宫保鸡丁和两碗米饭。', '我们叫宫保鸡丁。', '我们是宫保鸡丁。', '我们去宫保鸡丁。'],
      correctIndex: 0,
      explanation: '我们要 + quantité + plat = on veut X. 一份 (yī fèn) = une portion, 两碗 (liǎng wǎn) = deux bols. 米饭 = riz cuit.',
      explanationEn: '我们要 + quantity + dish = we want X. 一份 = one portion, 两碗 = two bowls.'
    }
  ],

  // ─── a2-day-m2 : Routine quotidienne ────────────────────────────────────
  'cecr-a2-day-m2': [
    {
      id: 'cecr-a2-day-m2-dlg1',
      type: 'dialogue-response',
      category: 'vocabulary',
      prompt: 'On te demande ta routine matinale. Réponds.',
      promptEn: 'Asked about your morning routine. Reply.',
      dialogue: [
        { speaker: 'Lin', hanzi: '你早上几点起床？', pinyin: 'nǐ zǎoshang jǐ diǎn qǐchuáng?', translationFr: 'Tu te lèves à quelle heure le matin ?', translationEn: 'What time do you get up in the morning?' },
        { speaker: 'Toi', speakerEn: 'You', hanzi: '', isUser: true }
      ],
      choices: ['我七点起床。', '我七点对不起。', '我七点再见。', '我七点不客气。'],
      correctIndex: 0,
      explanation: '我 + heure + 起床 (qǐchuáng) = je me lève à X. Structure : sujet + temps + verbe.',
      explanationEn: '我 + time + 起床 = I get up at X. Structure: subject + time + verb.'
    }
  ],

  // ─── a2-phone-m1 : Décrocher, raccrocher ────────────────────────────────
  'cecr-a2-phone-m1': [
    {
      id: 'cecr-a2-phone-m1-dlg1',
      type: 'dialogue-response',
      category: 'vocabulary',
      prompt: 'Tu décroches le téléphone. Que dire ?',
      promptEn: 'You pick up the phone. What to say?',
      dialogue: [
        { speaker: 'Sonnerie', speakerEn: 'Ring', hanzi: '☎️', pinyin: '', translationFr: '(le téléphone sonne)', translationEn: '(phone rings)' },
        { speaker: 'Toi', speakerEn: 'You', hanzi: '', isUser: true }
      ],
      choices: ['喂？您好。', '再见！', '不客气！', '对不起！'],
      correctIndex: 0,
      explanation: '喂 (wéi, parfois prononcé wèi) = allô au téléphone. UNIQUEMENT au téléphone, jamais en face. Souvent suivi de 您好 pour la politesse.',
      explanationEn: '喂 = hello on the phone. ONLY on the phone, never in person. Often followed by 您好 for politeness.'
    }
  ],

  // ─── a2-conversation-m1 : Négocier un prix ──────────────────────────────
  'cecr-a2-conversation-m1': [
    {
      id: 'cecr-a2-conv-m1-dlg1',
      type: 'dialogue-response',
      category: 'vocabulary',
      prompt: 'Au marché, le prix est trop cher. Réagis.',
      promptEn: 'At the market, the price is too high. React.',
      dialogue: [
        { speaker: 'Vendeur', speakerEn: 'Seller', hanzi: '这个一百块。', pinyin: 'zhège yī bǎi kuài.', translationFr: 'Celui-ci, c\'est cent yuan.', translationEn: 'This one\'s 100 yuan.' },
        { speaker: 'Toi', speakerEn: 'You', hanzi: '', isUser: true }
      ],
      choices: ['太贵了，便宜点儿吧。', '太贵了，再见。', '不客气，太贵了。', '太贵了，谢谢。'],
      correctIndex: 0,
      explanation: '太贵了 (tài guì le) = c\'est trop cher. 便宜点儿吧 (piányi diǎnr ba) = baisse un peu le prix. 吧 ajoute une douceur de suggestion.',
      explanationEn: '太贵了 = too expensive. 便宜点儿吧 = drop the price a bit. 吧 softens it as a suggestion.'
    }
  ],

  // ─── a2-conversation-m2 : Météo et saisons ──────────────────────────────
  'cecr-a2-conversation-m2': [
    {
      id: 'cecr-a2-conv-m2-dlg1',
      type: 'dialogue-response',
      category: 'vocabulary',
      prompt: 'Ton ami se plaint du temps. Donne un conseil adapté.',
      promptEn: 'Your friend complains about the weather. Give a fitting advice.',
      dialogue: [
        { speaker: 'Wang', hanzi: '今天太冷了！', pinyin: 'jīntiān tài lěng le!', translationFr: 'Il fait trop froid aujourd\'hui !', translationEn: "It's so cold today!" },
        { speaker: 'Toi', speakerEn: 'You', hanzi: '', isUser: true }
      ],
      choices: ['多穿点衣服吧！', '吃饭吧！', '再见！', '便宜点儿吧！'],
      correctIndex: 0,
      explanation: '多穿点衣服 (duō chuān diǎn yīfu) = mets plus de vêtements. Conseil naturel face au froid. 吧 = suggestion douce.',
      explanationEn: '多穿点衣服 = wear more clothes. Natural advice for the cold.'
    }
  ],

  // ─── a2-conversation-m3 : Dire qu'on ne sait pas ────────────────────────
  'cecr-a2-conversation-m3': [
    {
      id: 'cecr-a2-conv-m3-ctx1',
      type: 'context-react',
      category: 'vocabulary',
      prompt: 'Quelle phrase utiliser ?',
      promptEn: 'Which phrase to use?',
      context: "On te demande où se trouve un restaurant mais tu n'en as aucune idée.",
      contextEn: "You're asked where a restaurant is, but you have no idea.",
      choices: [
        '对不起，我不知道。',
        '对不起，我不客气。',
        '对不起，我不再见。',
        '对不起，我不你好。'
      ],
      correctIndex: 0,
      explanation: '我不知道 (wǒ bùzhī dào) = je ne sais pas. 不知道 = négation de 知道 (savoir). Précédé de 对不起 pour s\'excuser de ne pas pouvoir aider.',
      explanationEn: '我不知道 = I don\'t know. Preceded by 对不起 to apologize for not helping.'
    }
  ],

  // ─── a2-conversation-m4 : Prendre RDV + qui paie ────────────────────────
  'cecr-a2-conversation-m4': [
    {
      id: 'cecr-a2-conv-m4-dlg1',
      type: 'dialogue-response',
      category: 'vocabulary',
      prompt: 'Au resto, la note arrive. Que dis-tu ?',
      promptEn: 'At the restaurant, the bill comes. What do you say?',
      dialogue: [
        { speaker: 'Ami', speakerEn: 'Friend', hanzi: '我来付吧。', pinyin: 'wǒ lái fù ba.', translationFr: 'Je vais payer.', translationEn: "I'll pay." },
        { speaker: 'Toi', speakerEn: 'You', hanzi: '', isUser: true }
      ],
      choices: ['不用不用，我请客！', '好的，再见！', '不客气，谢谢！', '对不起，我付。'],
      correctIndex: 0,
      explanation: '不用不用 = pas la peine (refus poli, redouble pour insister). 我请客 (wǒ qǐngkè) = c\'est moi qui invite. Rituel social essentiel en Chine.',
      explanationEn: '不用不用 = no need (polite refusal, doubled for insistence). 我请客 = my treat. Essential Chinese social ritual.'
    }
  ],

  // ─── a2-conversation-m5 : Raconter sa journée + loisirs ─────────────────
  'cecr-a2-conversation-m5': [
    {
      id: 'cecr-a2-conv-m5-dlg1',
      type: 'dialogue-response',
      category: 'vocabulary',
      prompt: 'On te demande ce que tu aimes faire le week-end.',
      promptEn: 'Asked what you like to do on weekends.',
      dialogue: [
        { speaker: 'Lin', hanzi: '你周末喜欢做什么？', pinyin: 'nǐ zhōumò xǐhuan zuò shénme?', translationFr: "Qu'aimes-tu faire le week-end ?", translationEn: 'What do you like to do on weekends?' },
        { speaker: 'Toi', speakerEn: 'You', hanzi: '', isUser: true }
      ],
      choices: ['我喜欢看电影和听音乐。', '我叫看电影。', '我是看电影。', '再见看电影。'],
      correctIndex: 0,
      explanation: '我喜欢 + verbe = j\'aime [faire X]. 看电影 = regarder un film, 听音乐 = écouter de la musique. 和 = et.',
      explanationEn: '我喜欢 + verb = I like to [do X]. 和 = and.'
    }
  ],

  // ─── a2-conversation-m6 : Au restaurant : donner son avis ───────────────
  'cecr-a2-conversation-m6': [
    {
      id: 'cecr-a2-conv-m6-dlg1',
      type: 'dialogue-response',
      category: 'vocabulary',
      prompt: 'Ton ami te demande ton avis sur le plat. Réponds.',
      promptEn: 'Your friend asks your opinion of the dish. Reply.',
      dialogue: [
        { speaker: 'Wang', hanzi: '这个菜怎么样？', pinyin: 'zhège cài zěnmeyàng?', translationFr: 'Ce plat, qu\'en dis-tu ?', translationEn: 'How is this dish?' },
        { speaker: 'Toi', speakerEn: 'You', hanzi: '', isUser: true }
      ],
      choices: ['很好吃，有点辣。', '很好吃，再见！', '好吃，不客气！', '好吃，对不起！'],
      correctIndex: 0,
      explanation: '好吃 (hǎochī) = délicieux (pour les aliments). 有点辣 (yǒudiǎn là) = un peu piquant. Forme naturelle d\'un avis nuancé.',
      explanationEn: '好吃 = tasty (for food). 有点辣 = a bit spicy. Natural nuanced opinion.'
    }
  ],

  // ─── a2-conversation-m7 : Relations + personnalités ────────────────────
  'cecr-a2-conversation-m7': [
    {
      id: 'cecr-a2-conv-m7-dlg1',
      type: 'dialogue-response',
      category: 'vocabulary',
      prompt: 'Tu décris ton meilleur ami à quelqu\'un.',
      promptEn: 'You describe your best friend to someone.',
      dialogue: [
        { speaker: 'Lin', hanzi: '你最好的朋友是什么样的人？', pinyin: 'nǐ zuì hǎo de péngyou shì shénme yàng de rén?', translationFr: 'Comment est ton meilleur ami ?', translationEn: 'What\'s your best friend like?' },
        { speaker: 'Toi', speakerEn: 'You', hanzi: '', isUser: true }
      ],
      choices: ['他很聪明，也很有意思。', '他很聪明，再见。', '他很聪明，对不起。', '他很聪明，不客气。'],
      correctIndex: 0,
      explanation: '他很 + adjectif = il est X. 聪明 (cōngming) = intelligent. 有意思 (yǒu yìsi) = intéressant / amusant. 也 = aussi.',
      explanationEn: '他很 + adj = he is X. 聪明 = smart. 有意思 = interesting/fun. 也 = also.'
    }
  ],

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
  ],

  // ════════════════════════════════════════════════════════════════════════
  //  B1.1 — Travail, voyage, santé, débat
  // ════════════════════════════════════════════════════════════════════════
  'cecr-b11-work-m2': [{ id: 'cecr-b11-work-m2-dlg1', type: 'dialogue-response', category: 'vocabulary',
    prompt: 'En réunion, ton collègue propose un report. Réagis poliment.',
    promptEn: 'In a meeting, a colleague suggests postponing. React politely.',
    dialogue: [
      { speaker: 'Collègue', speakerEn: 'Colleague', hanzi: '我们能不能下周再开会？', pinyin: 'wǒmen néng bu néng xiàzhōu zài kāihuì?', translationFr: 'On peut reporter la réunion à la semaine prochaine ?', translationEn: 'Can we postpone the meeting to next week?' },
      { speaker: 'Toi', speakerEn: 'You', hanzi: '', isUser: true }
    ],
    choices: ['可以，但是请尽快确定时间。', '可以，再见。', '可以，不客气。', '可以，对不起。'],
    correctIndex: 0,
    explanation: '可以 (kěyǐ) = d\'accord. 但是 = mais. 请尽快确定时间 (qǐng jǐnkuài quèdìng shíjiān) = merci de fixer une heure au plus vite. Forme pro qui accepte avec une condition.',
    explanationEn: '可以 = OK. 但是 = but. 请尽快确定时间 = please confirm the time ASAP. Pro acceptance with a condition.'
  }],
  'cecr-b11-work-m4': [{ id: 'cecr-b11-work-m4-dlg1', type: 'dialogue-response', category: 'vocabulary',
    prompt: 'Entretien d\'embauche. Question classique du recruteur.',
    promptEn: 'Job interview. Classic recruiter question.',
    dialogue: [
      { speaker: 'Recruteur', speakerEn: 'Recruiter', hanzi: '你为什么想加入我们公司？', pinyin: 'nǐ wèi shénme xiǎng jiārù wǒmen gōngsī?', translationFr: 'Pourquoi voulez-vous rejoindre notre entreprise ?', translationEn: 'Why do you want to join our company?' },
      { speaker: 'Toi', speakerEn: 'You', hanzi: '', isUser: true }
    ],
    choices: ['因为贵公司的项目很有前景。', '因为我没有工作。', '因为再见。', '因为不客气。'],
    correctIndex: 0,
    explanation: '因为 (yīnwèi) = parce que. 贵公司 (guìgōngsī) = votre estimée entreprise (formule polie). 前景 (qiánjǐng) = perspectives d\'avenir. Réponse pro qui valorise.',
    explanationEn: '因为 = because. 贵公司 = your esteemed company. 前景 = future prospects.'
  }],
  'cecr-b11-travel-m1': [{ id: 'cecr-b11-travel-m1-dlg1', type: 'dialogue-response', category: 'vocabulary',
    prompt: 'Au guichet, tu réserves un billet de train.',
    promptEn: 'At the counter, you book a train ticket.',
    dialogue: [
      { speaker: 'Guichetier', speakerEn: 'Clerk', hanzi: '您要哪天的票？', pinyin: 'nín yào nǎ tiān de piào?', translationFr: 'Vous voulez le billet pour quel jour ?', translationEn: 'Which day\'s ticket?' },
      { speaker: 'Toi', speakerEn: 'You', hanzi: '', isUser: true }
    ],
    choices: ['明天上午八点到上海的高铁。', '明天再见。', '明天对不起。', '明天不客气。'],
    correctIndex: 0,
    explanation: '高铁 (gāotiě) = TGV chinois. Structure : 明天 (date) + 八点 (heure) + 到 + lieu = destination. Précise tout d\'un coup.',
    explanationEn: '高铁 = bullet train. Structure: date + time + 到 + place.'
  }],
  'cecr-b11-travel-m2': [{ id: 'cecr-b11-travel-m2-dlg1', type: 'dialogue-response', category: 'vocabulary',
    prompt: 'À l\'hôtel, à l\'arrivée.',
    promptEn: 'At hotel check-in.',
    dialogue: [
      { speaker: 'Réception', speakerEn: 'Front desk', hanzi: '欢迎光临，请问您预订了吗？', pinyin: 'huānyíng guānglín, qǐng wèn nín yùdìng le ma?', translationFr: 'Bienvenue, avez-vous réservé ?', translationEn: 'Welcome, did you book?' },
      { speaker: 'Toi', speakerEn: 'You', hanzi: '', isUser: true }
    ],
    choices: ['是的，我用王的名字订了一间房。', '是的，我再见。', '是的，对不起。', '是的，不客气。'],
    correctIndex: 0,
    explanation: '预订 (yùdìng) = réserver. 用…的名字 = au nom de. 一间房 = une chambre (mesureur 间 pour les pièces).',
    explanationEn: '预订 = to book. 用…的名字 = under the name of. 间 = measure word for rooms.'
  }],
  'cecr-b11-emo-m2': [{ id: 'cecr-b11-emo-m2-ctx1', type: 'context-react', category: 'vocabulary',
    prompt: 'Quelle phrase nuancer ?',
    promptEn: 'Which nuanced phrase?',
    context: 'Ton ami te demande ton avis sur un film qu\'il a aimé mais que tu trouves moyen. Comment être honnête sans le vexer ?',
    contextEn: "Your friend asks your opinion on a movie they liked but you found average. Honest but not hurtful?",
    choices: ['还可以，但是我觉得节奏有点慢。', '不好。', '再见。', '不客气。'],
    correctIndex: 0,
    explanation: '还可以 (háikěyǐ) = pas mal, ça va. Formule qui dit "moyen" sans heurter. 但是 + critique précise (节奏慢 = rythme lent) plus diplomate que "j\'ai pas aimé".',
    explanationEn: '还可以 = it\'s OK. Diplomatic "average" without offending.'
  }],
  'cecr-b11-health-m2': [{ id: 'cecr-b11-health-m2-dlg1', type: 'dialogue-response', category: 'vocabulary',
    prompt: 'Chez le médecin. Décris ton problème.',
    promptEn: 'At the doctor. Describe your problem.',
    dialogue: [
      { speaker: 'Médecin', speakerEn: 'Doctor', hanzi: '哪里不舒服？', pinyin: 'nǎlǐ bù shūfu?', translationFr: 'Qu\'est-ce qui ne va pas ?', translationEn: 'What\'s bothering you?' },
      { speaker: 'Toi', speakerEn: 'You', hanzi: '', isUser: true }
    ],
    choices: ['我头疼，还有点发烧。', '我再见。', '我不客气。', '我对不起。'],
    correctIndex: 0,
    explanation: '不舒服 (bù shūfu) = ne pas se sentir bien. 头疼 (tóuténg) = mal de tête, 发烧 (fāshāo) = fièvre, 还有 = en plus.',
    explanationEn: '不舒服 = unwell. 头疼 = headache, 发烧 = fever, 还有 = also.'
  }],
  'cecr-b11-conversation-m1': [{ id: 'cecr-b11-conv-m1-ctx1', type: 'context-react', category: 'vocabulary',
    prompt: 'Quelle nuance choisir ?',
    promptEn: 'Which nuance?',
    context: 'Ton collègue propose une idée. Tu n\'es pas convaincu mais tu veux rester ouvert.',
    contextEn: 'A colleague proposes an idea. You\'re not convinced but want to stay open.',
    choices: ['这个想法挺有意思的，不过我有些保留。', '不好。', '不客气。', '再见。'],
    correctIndex: 0,
    explanation: '挺…的 = adoucisseur (assez/plutôt). 不过 (búguò) = cependant. 有些保留 (yǒuxiē bǎoliú) = j\'ai quelques réserves. Disagrément poli.',
    explanationEn: '挺…的 = softener (quite). 不过 = however. 有些保留 = some reservations. Polite disagreement.'
  }],
  'cecr-b11-conversation-m2': [{ id: 'cecr-b11-conv-m2-dlg1', type: 'dialogue-response', category: 'vocabulary',
    prompt: 'On te demande de raconter ton voyage en détail.',
    promptEn: 'You\'re asked to tell about your trip in detail.',
    dialogue: [
      { speaker: 'Lin', hanzi: '你上次去日本怎么样？', pinyin: 'nǐ shàngcì qù Rìběn zěnmeyàng?', translationFr: 'Comment était ton dernier voyage au Japon ?', translationEn: 'How was your last Japan trip?' },
      { speaker: 'Toi', speakerEn: 'You', hanzi: '', isUser: true }
    ],
    choices: ['印象特别深，尤其是京都的寺庙。', '再见。', '不客气。', '对不起。'],
    correctIndex: 0,
    explanation: '印象深 (yìnxiàng shēn) = a laissé une forte impression. 尤其是 (yóuqíshì) = surtout / en particulier. Marqueur d\'emphase pour préciser.',
    explanationEn: '印象深 = made a strong impression. 尤其是 = especially.'
  }],
  'cecr-b11-conversation-m3': [{ id: 'cecr-b11-conv-m3-ctx1', type: 'context-react', category: 'vocabulary',
    prompt: 'Que dire en cas d\'imprévu ?',
    promptEn: 'What to say in an emergency?',
    context: 'Tu rates ton vol à cause d\'un embouteillage. Tu appelles ton hôte pour le prévenir.',
    contextEn: 'You missed your flight due to traffic. You call your host to warn them.',
    choices: ['真不好意思，我误了航班，能不能晚点到？', '再见，我误了航班。', '不客气，我误了航班。', '对不起，我误了再见。'],
    correctIndex: 0,
    explanation: '真不好意思 (zhēn bùhǎoyìsi) = je suis vraiment désolé (excuse forte). 误了 (wù le) = j\'ai raté. 能不能 = pourrais-je. Politesse + demande de flex.',
    explanationEn: '真不好意思 = really sorry. 误了 = missed. 能不能 = could I.'
  }],
  'cecr-b11-conversation-m4': [{ id: 'cecr-b11-conv-m4-dlg1', type: 'dialogue-response', category: 'vocabulary',
    prompt: 'Ton ami te complimente. Réponds modestement.',
    promptEn: 'Your friend compliments you. Reply modestly.',
    dialogue: [
      { speaker: 'Wang', hanzi: '你的中文说得真好！', pinyin: 'nǐ de zhōngwén shuō de zhēn hǎo!', translationFr: 'Tu parles vraiment bien chinois !', translationEn: 'Your Chinese is really good!' },
      { speaker: 'Toi', speakerEn: 'You', hanzi: '', isUser: true }
    ],
    choices: ['哪里哪里，还差得远呢。', '是的，谢谢。', '不客气。', '对不起。'],
    correctIndex: 0,
    explanation: '哪里哪里 = "mais non, mais non" (réfutation modeste obligatoire en chinois). 还差得远呢 = j\'ai encore beaucoup à apprendre. Rituel culturel : on refuse le compliment.',
    explanationEn: '哪里哪里 = "no no no" (obligatory modest deflection). Cultural ritual: deflect the compliment.'
  }],
  'cecr-b11-conversation-m5': [{ id: 'cecr-b11-conv-m5-dlg1', type: 'dialogue-response', category: 'vocabulary',
    prompt: 'Entretien pro. Présente-toi.',
    promptEn: 'Pro interview. Introduce yourself.',
    dialogue: [
      { speaker: 'Recruteur', speakerEn: 'Recruiter', hanzi: '请简单介绍一下自己。', pinyin: 'qǐng jiǎndān jièshào yīxià zìjǐ.', translationFr: 'Présentez-vous brièvement.', translationEn: 'Briefly introduce yourself.' },
      { speaker: 'Toi', speakerEn: 'You', hanzi: '', isUser: true }
    ],
    choices: ['您好，我叫张明，毕业于北京大学市场营销专业。', '您好，再见。', '您好，不客气。', '您好，对不起。'],
    correctIndex: 0,
    explanation: '毕业于 (bìyè yú) = diplômé de. 专业 (zhuānyè) = spécialité. Format pro : nom + cursus + spécialité en une phrase.',
    explanationEn: '毕业于 = graduated from. 专业 = major. Pro format: name + school + major in one line.'
  }],
  'cecr-b11-conversation-m6': [{ id: 'cecr-b11-conv-m6-ctx1', type: 'context-react', category: 'vocabulary',
    prompt: 'Comment conseiller ?',
    promptEn: 'How to advise?',
    context: 'Ton ami stressé veut quitter son boulot sans plan B. Tu le conseilles.',
    contextEn: 'Your stressed friend wants to quit without a plan B. You advise.',
    choices: ['我觉得你应该先找好下一份工作再辞职。', '再见。', '不客气。', '对不起。'],
    correctIndex: 0,
    explanation: '我觉得 = je pense que. 应该 (yīnggāi) = devrait. 先 X 再 Y = d\'abord X puis Y (séquence). 辞职 (cízhí) = démissionner. Conseil structuré.',
    explanationEn: '我觉得 = I think. 应该 = should. 先X再Y = first X then Y. 辞职 = quit.'
  }],
  'cecr-b11-conversation-m7': [{ id: 'cecr-b11-conv-m7-dlg1', type: 'dialogue-response', category: 'vocabulary',
    prompt: 'Tu présentes un projet. Réagis à la question.',
    promptEn: 'Presenting a project. React to the question.',
    dialogue: [
      { speaker: 'Manager', hanzi: '这个项目的目标是什么？', pinyin: 'zhège xiàngmù de mùbiāo shì shénme?', translationFr: 'Quel est l\'objectif du projet ?', translationEn: "What's the project goal?" },
      { speaker: 'Toi', speakerEn: 'You', hanzi: '', isUser: true }
    ],
    choices: ['主要目标是提高用户体验，预计三个月完成。', '主要再见。', '主要不客气。', '主要对不起。'],
    correctIndex: 0,
    explanation: '主要 (zhǔyào) = principal. 提高用户体验 (tígāo yònghù tǐyàn) = améliorer l\'UX. 预计 (yùjì) = prévoir. Format pro avec timeline.',
    explanationEn: '主要 = main. 提高用户体验 = improve UX. 预计 = expect. Pro format with timeline.'
  }],

  // ════════════════════════════════════════════════════════════════════════
  //  B1.2 — Critique, nostalgie, débats société, voyage avancé
  // ════════════════════════════════════════════════════════════════════════
  'cecr-b12-soc-m4': [{ id: 'cecr-b12-soc-m4-ctx1', type: 'context-react', category: 'vocabulary',
    prompt: 'Comment décrire ?', promptEn: 'How to describe?',
    context: 'On t\'interroge sur la difficulté de trouver son premier emploi en Chine pour un jeune diplômé.',
    contextEn: 'You\'re asked about job-hunting difficulty for fresh graduates in China.',
    choices: ['竞争非常激烈，对应届毕业生来说很有挑战。', '竞争再见。', '竞争对不起。', '竞争不客气。'],
    correctIndex: 0,
    explanation: '竞争激烈 (jìngzhēng jīliè) = compétition féroce. 应届毕业生 (yīngjiè bìyèshēng) = nouveau diplômé. 对…来说 = pour qq. Cadre sociétal.',
    explanationEn: '竞争激烈 = fierce competition. 应届毕业生 = fresh graduate.'
  }],
  'cecr-b12-conversation-m1': [{ id: 'cecr-b12-conv-m1-dlg1', type: 'dialogue-response', category: 'vocabulary',
    prompt: 'Un ami te demande ton avis sur un film. Tu nuances.',
    promptEn: 'A friend asks your opinion on a film. You nuance.',
    dialogue: [
      { speaker: 'Wang', hanzi: '这部电影你觉得怎么样？', pinyin: 'zhè bù diànyǐng nǐ juéde zěnmeyàng?', translationFr: 'Tu penses quoi du film ?', translationEn: 'What do you think of the movie?' },
      { speaker: 'Toi', speakerEn: 'You', hanzi: '', isUser: true }
    ],
    choices: ['剧情还不错，但是结尾有点仓促。', '剧情再见。', '剧情不客气。', '剧情对不起。'],
    correctIndex: 0,
    explanation: '剧情 (jùqíng) = intrigue. 还不错 = pas mal du tout. 仓促 (cāngcù) = précipité, bâclé. Critique nuancée typique de Douban (site de notation).',
    explanationEn: '剧情 = plot. 还不错 = not bad. 仓促 = rushed. Typical Douban-style nuanced critique.'
  }],
  'cecr-b12-conversation-m2': [{ id: 'cecr-b12-conv-m2-ctx1', type: 'context-react', category: 'vocabulary',
    prompt: 'Évoque un souvenir.', promptEn: 'Evoke a memory.',
    context: 'Tu retrouves une vieille photo de ton enfance et tu exprimes ta nostalgie à un ami.',
    contextEn: 'You find an old childhood photo and share your nostalgia.',
    choices: ['看到这张照片，我特别怀念小时候的时光。', '看到再见。', '看到对不起。', '看到不客气。'],
    correctIndex: 0,
    explanation: '怀念 (huáiniàn) = ressentir de la nostalgie. 小时候 = quand on était petit. 时光 (shíguāng) = moments / époque. Vocabulaire émotionnel B1.2.',
    explanationEn: '怀念 = feel nostalgic. 小时候 = childhood. 时光 = times/moments.'
  }],
  'cecr-b12-conversation-m3': [{ id: 'cecr-b12-conv-m3-dlg1', type: 'dialogue-response', category: 'vocabulary',
    prompt: 'Un sujet délicat est sur la table. Tu reformules avec tact.',
    promptEn: 'Sensitive topic on the table. Reframe tactfully.',
    dialogue: [
      { speaker: 'Collègue', speakerEn: 'Colleague', hanzi: '你怎么看这个政策？', pinyin: 'nǐ zěnme kàn zhège zhèngcè?', translationFr: 'Que penses-tu de cette politique ?', translationEn: "What's your take on this policy?" },
      { speaker: 'Toi', speakerEn: 'You', hanzi: '', isUser: true }
    ],
    choices: ['这个问题比较复杂，我们可以从几个角度看。', '这个再见。', '这个不客气。', '这个对不起。'],
    correctIndex: 0,
    explanation: '比较复杂 = plutôt complexe (esquive polie). 从几个角度看 (cóng jǐ ge jiǎodù kàn) = examiner sous plusieurs angles. Évite l\'engagement direct.',
    explanationEn: '比较复杂 = quite complex (polite deflection). 从几个角度看 = look from multiple angles.'
  }],
  'cecr-b12-conversation-m4': [{ id: 'cecr-b12-conv-m4-dlg1', type: 'dialogue-response', category: 'vocabulary',
    prompt: 'Tu racontes une mésaventure de voyage.',
    promptEn: 'You recount a travel mishap.',
    dialogue: [
      { speaker: 'Lin', hanzi: '上次在云南玩得怎么样？', pinyin: 'shàngcì zài Yúnnán wán de zěnmeyàng?', translationFr: 'Comment c\'était au Yunnan ?', translationEn: 'How was Yunnan?' },
      { speaker: 'Toi', speakerEn: 'You', hanzi: '', isUser: true }
    ],
    choices: ['总体不错，不过中途丢了钱包，挺麻烦的。', '总体再见。', '总体不客气。', '总体对不起。'],
    correctIndex: 0,
    explanation: '总体 (zǒngtǐ) = dans l\'ensemble. 中途 = en cours de route. 挺麻烦 (tǐng máfan) = vraiment embêtant. Récit nuancé.',
    explanationEn: '总体 = overall. 中途 = midway. 挺麻烦 = quite a hassle.'
  }],
  'cecr-b12-conversation-m5': [{ id: 'cecr-b12-conv-m5-ctx1', type: 'context-react', category: 'vocabulary',
    prompt: 'Décris une difficulté.', promptEn: 'Describe a difficulty.',
    context: 'Tu expliques à un ami que tes études de maths sont très exigeantes.',
    contextEn: "You explain to a friend that your math studies are very demanding.",
    choices: ['这门课程要求很高，我每天都要花很多时间复习。', '这门再见。', '这门对不起。', '这门不客气。'],
    correctIndex: 0,
    explanation: '门 (mén) = mesureur pour les cours. 要求高 = exigeant. 花时间 (huā shíjiān) = passer du temps. 复习 (fùxí) = réviser.',
    explanationEn: '门 = measure word for courses. 要求高 = demanding. 花时间 = spend time.'
  }],
  'cecr-b12-conversation-m6': [{ id: 'cecr-b12-conv-m6-dlg1', type: 'dialogue-response', category: 'vocabulary',
    prompt: 'Tu racontes un échec pro et ce que tu en as appris.',
    promptEn: 'You recount a pro failure and what you learned.',
    dialogue: [
      { speaker: 'Manager', hanzi: '可以分享一次失败的经验吗？', pinyin: 'kěyǐ fēnxiǎng yīcì shībài de jīngyàn ma?', translationFr: 'Peux-tu partager un échec ?', translationEn: 'Can you share a failure?' },
      { speaker: 'Toi', speakerEn: 'You', hanzi: '', isUser: true }
    ],
    choices: ['有一次项目延期了，我从中学到了风险管理的重要性。', '有一次再见。', '有一次不客气。', '有一次对不起。'],
    correctIndex: 0,
    explanation: '从中学到 (cóngzhōng xué dào) = en tirer la leçon. 风险管理 (fēngxiǎnguǎnlǐ) = gestion des risques. Format pro : échec + leçon.',
    explanationEn: '从中学到 = learn from it. 风险管理 = risk management. Pro format: failure + lesson.'
  }],
  'cecr-b12-conversation-m7': [{ id: 'cecr-b12-conv-m7-ctx1', type: 'context-react', category: 'vocabulary',
    prompt: 'Comment désaccorder avec ton chef ?',
    promptEn: 'How to disagree with your boss?',
    context: 'Ton supérieur propose une approche que tu juges risquée. Tu veux exprimer ton désaccord sans le froisser.',
    contextEn: 'Your boss proposes a risky approach. Disagree without offense.',
    choices: ['您的方案很有道理，不过我担心可能会带来一些风险。', '您的再见。', '您的不客气。', '您的对不起。'],
    correctIndex: 0,
    explanation: 'D\'abord 很有道理 (yǒu dàolǐ) = pertinent (compliment-tampon obligatoire). Puis 不过 + 担心 (dānxīn = m\'inquiète). Sandwich diplomatique.',
    explanationEn: 'First 很有道理 = makes sense (cushion). Then 不过 + 担心 (worry). Diplomatic sandwich.'
  }],

  // ════════════════════════════════════════════════════════════════════════
  //  B2.1 — Pro avancé : réunion, négociation, conflit, networking
  // ════════════════════════════════════════════════════════════════════════
  'cecr-b21-conversation-m1': [{ id: 'cecr-b21-conv-m1-dlg1', type: 'dialogue-response', category: 'vocabulary',
    prompt: 'Tu ouvres une réunion. Choisis ta phrase.',
    promptEn: 'You open a meeting. Choose your line.',
    dialogue: [
      { speaker: 'Toi', speakerEn: 'You', hanzi: '', isUser: true }
    ],
    choices: ['大家好，感谢各位百忙之中来参加今天的会议。', '大家再见。', '大家对不起。', '大家不客气。'],
    correctIndex: 0,
    explanation: '百忙之中 (bǎimáng zhīzhōng) = malgré votre emploi du temps chargé. Formule d\'ouverture formelle qui flatte les participants.',
    explanationEn: '百忙之中 = despite your busy schedule. Formal flattering opener.'
  }],
  'cecr-b21-conversation-m2': [{ id: 'cecr-b21-conv-m2-dlg1', type: 'dialogue-response', category: 'vocabulary',
    prompt: 'En négociation, l\'autre partie pousse trop loin.',
    promptEn: 'In negotiation, other side pushes too far.',
    dialogue: [
      { speaker: 'Client', hanzi: '我们希望价格再降百分之二十。', pinyin: 'wǒmen xīwàng jiàgé zài jiàng bǎi fēn zhī èrshí.', translationFr: 'On voudrait 20% de moins encore.', translationEn: 'We want another 20% off.' },
      { speaker: 'Toi', speakerEn: 'You', hanzi: '', isUser: true }
    ],
    choices: ['这个空间恐怕有限，我们能不能在其他方面让步？', '这个再见。', '这个不客气。', '这个对不起。'],
    correctIndex: 0,
    explanation: '空间有限 (kōngjiān yǒuxiàn) = peu de marge. 让步 (ràngbù) = concession. Refuse poliment + propose alternative. Classique en négo.',
    explanationEn: '空间有限 = limited room. 让步 = concession. Polite refusal + alternative.'
  }],
  'cecr-b21-conversation-m3': [{ id: 'cecr-b21-conv-m3-dlg1', type: 'dialogue-response', category: 'vocabulary',
    prompt: 'Status update : tu présentes l\'avancement.',
    promptEn: 'Status update: report progress.',
    dialogue: [
      { speaker: 'Manager', hanzi: '项目进展如何？', pinyin: 'xiàngmù jìnzhǎn rúhé?', translationFr: 'Où en est le projet ?', translationEn: "How's the project?" },
      { speaker: 'Toi', speakerEn: 'You', hanzi: '', isUser: true }
    ],
    choices: ['目前完成了百分之七十，预计下周可以交付。', '目前再见。', '目前不客气。', '目前对不起。'],
    correctIndex: 0,
    explanation: '目前 (mùqián) = à l\'heure actuelle. 百分之七十 = 70%. 交付 (jiāofù) = livrer. Format chiffré pro.',
    explanationEn: '目前 = currently. 交付 = deliver.'
  }],
  'cecr-b21-conversation-m4': [{ id: 'cecr-b21-conv-m4-ctx1', type: 'context-react', category: 'vocabulary',
    prompt: 'Tu médies un conflit.', promptEn: 'You mediate a conflict.',
    context: 'Deux collègues se disputent sur une décision. Tu interviens pour les rapprocher.',
    contextEn: 'Two colleagues dispute a decision. You step in to bridge them.',
    choices: ['我觉得双方都有道理，我们能不能找一个折中方案？', '我觉得再见。', '我觉得不客气。', '我觉得对不起。'],
    correctIndex: 0,
    explanation: '双方 (shuāngfāng) = les deux parties. 都有道理 = ont chacun raison. 折中方案 (zhézhōng fāng\'àn) = solution de compromis. Posture du médiateur.',
    explanationEn: '双方 = both sides. 都有道理 = both right. 折中方案 = compromise solution.'
  }],
  'cecr-b21-conversation-m5': [{ id: 'cecr-b21-conv-m5-dlg1', type: 'dialogue-response', category: 'vocabulary',
    prompt: 'Networking : tu maintiens la relation après échange de WeChat.',
    promptEn: 'Networking: maintain contact after WeChat exchange.',
    dialogue: [
      { speaker: 'Contact', hanzi: '今天认识您很高兴，以后多联系。', pinyin: 'jīntiān rènshi nín hěn gāoxìng, yǐhòu duō liánxì.', translationFr: 'Ravi de vous avoir rencontré, restons en contact.', translationEn: 'Glad to meet you, stay in touch.' },
      { speaker: 'Toi', speakerEn: 'You', hanzi: '', isUser: true }
    ],
    choices: ['同样，期待以后有合作的机会。', '同样再见。', '同样不客气。', '同样对不起。'],
    correctIndex: 0,
    explanation: '同样 (tóngyàng) = pareillement. 期待 (qīdài) = espérer / attendre avec impatience. 合作 (hézuò) = collaboration. Politesse pro + ouverture future.',
    explanationEn: '同样 = likewise. 期待 = look forward to. 合作 = collaboration.'
  }],
  'cecr-b21-conversation-m6': [{ id: 'cecr-b21-conv-m6-dlg1', type: 'dialogue-response', category: 'vocabulary',
    prompt: 'Tu portes un toast lors d\'un banquet pro.',
    promptEn: 'You toast at a pro banquet.',
    dialogue: [
      { speaker: 'Toi', speakerEn: 'You', hanzi: '', isUser: true }
    ],
    choices: ['我先敬大家一杯，祝合作愉快，干杯！', '我先再见！', '我先对不起！', '我先不客气！'],
    correctIndex: 0,
    explanation: '敬 (jìng) = porter un toast respectueux. 祝 (zhù) = souhaiter. 合作愉快 = bonne collaboration. 干杯 (gānbēi) = cul-sec / santé. Rituel banquet.',
    explanationEn: '敬 = formal toast. 祝 = wish. 干杯 = cheers / bottoms up.'
  }],
  'cecr-b21-conversation-m7': [{ id: 'cecr-b21-conv-m7-ctx1', type: 'context-react', category: 'vocabulary',
    prompt: 'Tu signes un email pro.', promptEn: 'Sign a pro email.',
    context: 'Tu termines un email officiel adressé à un partenaire commercial.',
    contextEn: 'You close an official email to a business partner.',
    choices: ['顺颂商祺。', '再见。', '不客气。', '对不起。'],
    correctIndex: 0,
    explanation: '顺颂商祺 (shùn sòng shāngqí) = formule de clôture biz formelle ("Avec mes salutations commerciales"). Standard pour emails B2B.',
    explanationEn: '顺颂商祺 = formal business sign-off. B2B email standard.'
  }],

  // ════════════════════════════════════════════════════════════════════════
  //  B2.2 — Débat, registres polis, mauvaises nouvelles, congés
  // ════════════════════════════════════════════════════════════════════════
  'cecr-b22-debate-m1': [{ id: 'cecr-b22-deb-m1-ctx1', type: 'context-react', category: 'vocabulary',
    prompt: 'Tu introduis ta thèse.', promptEn: 'Introduce your thesis.',
    context: 'Tu participes à un débat sur le télétravail. Tu introduis ta position.',
    contextEn: 'You join a debate on remote work. Introduce your position.',
    choices: ['我认为远程办公对提高效率有积极作用。', '我认为再见。', '我认为不客气。', '我认为对不起。'],
    correctIndex: 0,
    explanation: '我认为 (wǒ rènwéi) = je pense que (registre soutenu vs 我觉得 oral). 对…有积极作用 = a un impact positif sur. Pattern débat.',
    explanationEn: '我认为 = I believe (formal). 对…有积极作用 = has a positive impact on.'
  }],
  'cecr-b22-debate-m2': [{ id: 'cecr-b22-deb-m2-ctx1', type: 'context-react', category: 'vocabulary',
    prompt: 'Tu nuances ton propos.', promptEn: 'Add nuance.',
    context: 'On te demande si le télétravail est toujours la meilleure option.',
    contextEn: "Asked if remote work is always best.",
    choices: ['并不是所有情况都适合，需要看具体行业。', '并不是再见。', '并不是不客气。', '并不是对不起。'],
    correctIndex: 0,
    explanation: '并不是 (bìngbù shì) = ce n\'est pas que… (renforce la nuance). 具体 (jùtǐ) = concret / spécifique. Position nuancée typique débat.',
    explanationEn: '并不是 = it\'s not that... (strong nuance). 具体 = specific.'
  }],
  'cecr-b22-debate-m3': [{ id: 'cecr-b22-deb-m3-ctx1', type: 'context-react', category: 'vocabulary',
    prompt: 'Tu réfutes un argument.', promptEn: 'Refute an argument.',
    context: 'L\'autre côté dit que tous les jeunes préfèrent le télétravail. Tu réfutes.',
    contextEn: 'Other side claims all youth prefer remote. You refute.',
    choices: ['这种说法过于绝对，事实上很多年轻人也喜欢办公室的社交氛围。', '这种再见。', '这种不客气。', '这种对不起。'],
    correctIndex: 0,
    explanation: '过于绝对 (guòyú juéduì) = trop catégorique. 事实上 (shìshíshàng) = en réalité. 社交氛围 (shèjiāo fēnwéi) = ambiance sociale. Réfutation polie.',
    explanationEn: '过于绝对 = too absolute. 事实上 = in fact. 社交氛围 = social atmosphere.'
  }],
  'cecr-b22-debate-m4': [{ id: 'cecr-b22-deb-m4-ctx1', type: 'context-react', category: 'vocabulary',
    prompt: 'Tu compares.', promptEn: 'Compare.',
    context: 'Tu compares la culture du travail en Chine et en France.',
    contextEn: 'Compare work culture in China and France.',
    choices: ['相比之下，中国职场节奏更快，而法国更注重生活平衡。', '相比再见。', '相比不客气。', '相比对不起。'],
    correctIndex: 0,
    explanation: '相比之下 (xiāngbǐ zhīxià) = en comparaison. 而 (ér) = tandis que. 生活平衡 = équilibre vie. Comparatif formel.',
    explanationEn: '相比之下 = in comparison. 而 = whereas. 生活平衡 = work-life balance.'
  }],
  'cecr-b22-debate-m5': [{ id: 'cecr-b22-deb-m5-ctx1', type: 'context-react', category: 'vocabulary',
    prompt: 'Tu illustres avec un exemple.', promptEn: 'Illustrate with example.',
    context: 'Tu veux étayer ton argument avec un exemple concret.',
    contextEn: 'Back up your argument with a concrete example.',
    choices: ['据统计，去年有超过四成的员工选择了远程办公。', '据统计再见。', '据统计对不起。', '据统计不客气。'],
    correctIndex: 0,
    explanation: '据统计 (jùtǒngjì) = selon les statistiques. 超过四成 = plus de 40% (成 = 10%). Format données chiffrées.',
    explanationEn: '据统计 = per statistics. 超过四成 = over 40% (成 = 10%).'
  }],
  'cecr-b22-debate-m6': [{ id: 'cecr-b22-deb-m6-ctx1', type: 'context-react', category: 'vocabulary',
    prompt: 'Tu exprimes une cause.', promptEn: 'Express a cause.',
    context: 'Tu expliques pourquoi les jeunes Chinois changent souvent d\'emploi.',
    contextEn: 'Explain why young Chinese frequently change jobs.',
    choices: ['由于职业期待与现实差距较大，因此跳槽现象很普遍。', '由于再见。', '由于不客气。', '由于对不起。'],
    correctIndex: 0,
    explanation: '由于 X 因此 Y (yóuyú… yīncǐ…) = en raison de X, par conséquent Y. Structure cause-conséquence formelle. 跳槽 (tiàocáo) = changer d\'emploi.',
    explanationEn: '由于 X 因此 Y = due to X, therefore Y. Formal cause-effect. 跳槽 = job-hopping.'
  }],
  'cecr-b22-debate-m7': [{ id: 'cecr-b22-deb-m7-ctx1', type: 'context-react', category: 'vocabulary',
    prompt: 'Tu conclus ton intervention.', promptEn: 'Conclude your speech.',
    context: 'Tu boucles ton argumentaire en faisant une projection.',
    contextEn: 'Wrap up your argument with a projection.',
    choices: ['综上所述，展望未来，远程办公将成为常态。', '综上再见。', '综上不客气。', '综上对不起。'],
    correctIndex: 0,
    explanation: '综上所述 (zōngshàngsuǒshù) = en résumé. 展望未来 (zhǎnwàng wèilái) = en regardant vers l\'avenir. Conclusion formelle.',
    explanationEn: '综上所述 = in summary. 展望未来 = looking ahead.'
  }],
  'cecr-b22-conversation-m1': [{ id: 'cecr-b22-conv-m1-dlg1', type: 'dialogue-response', category: 'vocabulary',
    prompt: 'Un ami t\'annonce qu\'il s\'est marié. Réagis spontanément.',
    promptEn: 'A friend says they got married. React spontaneously.',
    dialogue: [
      { speaker: 'Ami', speakerEn: 'Friend', hanzi: '上个月我结婚了！', pinyin: 'shàng ge yuè wǒ jiéhūn le!', translationFr: 'Je me suis marié le mois dernier !', translationEn: 'I got married last month!' },
      { speaker: 'Toi', speakerEn: 'You', hanzi: '', isUser: true }
    ],
    choices: ['真的吗？太棒了，恭喜恭喜！', '真的再见。', '真的不客气。', '真的对不起。'],
    correctIndex: 0,
    explanation: '真的吗 = vraiment ? 太棒了 (tài bàng le) = génial ! 恭喜 (gōngxǐ) doublé = félicitations chaleureuses. Réaction émotionnelle naturelle.',
    explanationEn: '真的吗 = really? 太棒了 = awesome! 恭喜恭喜 = warm congrats.'
  }],
  'cecr-b22-conversation-m2': [{ id: 'cecr-b22-conv-m2-dlg1', type: 'dialogue-response', category: 'vocabulary',
    prompt: 'On te complimente. Accepte poliment.',
    promptEn: 'Complimented. Accept politely.',
    dialogue: [
      { speaker: 'Wang', hanzi: '你做的菜真好吃！', pinyin: 'nǐ zuò de cài zhēn hǎochī!', translationFr: 'Ton plat est délicieux !', translationEn: 'Your dish is delicious!' },
      { speaker: 'Toi', speakerEn: 'You', hanzi: '', isUser: true }
    ],
    choices: ['谢谢，你喜欢就好，我下次再做。', '谢谢，再见。', '谢谢，不客气。', '谢谢，对不起。'],
    correctIndex: 0,
    explanation: '你喜欢就好 (nǐ xǐhuan jiù hǎo) = tant que ça te plaît, c\'est bien. Forme polie qui détourne sur le plaisir de l\'autre. Plus moderne que 哪里哪里.',
    explanationEn: '你喜欢就好 = as long as you like it. Modern polite deflection, more current than 哪里哪里.'
  }],
  'cecr-b22-conversation-m3': [{ id: 'cecr-b22-conv-m3-ctx1', type: 'context-react', category: 'vocabulary',
    prompt: 'Désaccord poli quotidien.', promptEn: 'Polite daily disagreement.',
    context: 'Ton coloc veut commander une pizza, tu préfères thaï. Désaccord léger.',
    contextEn: 'Roommate wants pizza, you prefer Thai. Mild disagreement.',
    choices: ['其实我不是特别想吃披萨，不如试试泰国菜？', '其实再见。', '其实不客气。', '其实对不起。'],
    correctIndex: 0,
    explanation: '其实 (qíshí) = en fait. 不是特别想 = pas vraiment envie (forme adoucie). 不如 (bùrú) = pourquoi pas plutôt. Désaccord soft avec contre-proposition.',
    explanationEn: '其实 = actually. 不是特别想 = not really keen. 不如 = how about. Soft disagreement + counter.'
  }],
  'cecr-b22-conversation-m4': [{ id: 'cecr-b22-conv-m4-dlg1', type: 'dialogue-response', category: 'vocabulary',
    prompt: 'Tu envoies un message WeChat pro.',
    promptEn: 'Pro WeChat message.',
    dialogue: [
      { speaker: 'Toi', speakerEn: 'You', hanzi: '', isUser: true }
    ],
    choices: ['您好，关于昨天讨论的方案，方便周一开会进一步讨论吗？', '您好，再见。', '您好，对不起。', '您好，不客气。'],
    correctIndex: 0,
    explanation: '方便…吗 = est-ce que ça t\'arrange de… (politesse). 进一步 (jìnyíbù) = plus en détail. Format WeChat pro clair et concis.',
    explanationEn: '方便…吗 = is it convenient to... 进一步 = further. Clear concise pro WeChat format.'
  }],
  'cecr-b22-conversation-m5': [{ id: 'cecr-b22-conv-m5-dlg1', type: 'dialogue-response', category: 'vocabulary',
    prompt: 'Tu dois annoncer une mauvaise nouvelle à un client.',
    promptEn: 'Bad news to a client.',
    dialogue: [
      { speaker: 'Toi', speakerEn: 'You', hanzi: '', isUser: true }
    ],
    choices: ['非常抱歉地通知您，项目可能要延期一周。', '非常再见。', '非常不客气。', '非常对不起。'],
    correctIndex: 0,
    explanation: '非常抱歉 (fēicháng bàoqiàn) = je suis vraiment navré (plus formel que 对不起). 通知 (tōngzhī) = notifier. Formule pro pour mauvaise nouvelle.',
    explanationEn: '非常抱歉 = deeply apologetic (more formal). 通知 = inform.'
  }],
  'cecr-b22-conversation-m6': [{ id: 'cecr-b22-conv-m6-ctx1', type: 'context-react', category: 'vocabulary',
    prompt: 'Tu rapportes une rumeur.', promptEn: 'Report a rumor.',
    context: 'Tu partages une info entendue dont tu ne peux pas confirmer la source.',
    contextEn: 'You share info you heard but can\'t confirm.',
    choices: ['听说他们公司下个月要裁员，不过我也不太确定。', '听说再见。', '听说不客气。', '听说对不起。'],
    correctIndex: 0,
    explanation: '听说 (tīngshuō) = on dit / il paraît que. 不太确定 = pas vraiment sûr. Marque la rumeur tout en gardant la prudence.',
    explanationEn: '听说 = it\'s said that. 不太确定 = not really sure.'
  }],
  'cecr-b22-conversation-m7': [{ id: 'cecr-b22-conv-m7-dlg1', type: 'dialogue-response', category: 'vocabulary',
    prompt: 'Tu prends congé chaleureusement après un dîner.',
    promptEn: 'Warmly take leave after dinner.',
    dialogue: [
      { speaker: 'Toi', speakerEn: 'You', hanzi: '', isUser: true }
    ],
    choices: ['今晚太开心了，非常感谢您的盛情款待。', '今晚再见。', '今晚不客气。', '今晚对不起。'],
    correctIndex: 0,
    explanation: '盛情款待 (shèngqíng kuǎndài) = accueil chaleureux et généreux (formule fixe formelle). Très valorisant pour l\'hôte. Remerciement raffiné.',
    explanationEn: '盛情款待 = warm and generous hospitality (fixed formal phrase). Highly valuing the host.'
  }],

  // ════════════════════════════════════════════════════════════════════════
  //  C1.1 — Discours soutenu : nuance, suggestion, rhétorique
  // ════════════════════════════════════════════════════════════════════════
  'cecr-c11-conversation-m1': [{ id: 'cecr-c11-conv-m1-ctx1', type: 'context-react', category: 'vocabulary',
    prompt: 'Tu exposes ta position de manière nuancée.',
    promptEn: 'State your position with nuance.',
    context: 'On te demande ton avis sur la régulation de l\'IA, sujet où tu as une position complexe.',
    contextEn: 'Asked about AI regulation, where you hold a nuanced view.',
    choices: ['就我个人而言，我倾向于支持监管，但前提是不能扼杀创新。', '就我个人再见。', '就我个人不客气。', '就我个人对不起。'],
    correctIndex: 0,
    explanation: '就…而言 (jiù… ér yán) = en ce qui me concerne (formel). 倾向于 (qīngxiàngyú) = pencher vers. 前提是 (qiántí shì) = à condition que. 扼杀 (èshā) = étouffer.',
    explanationEn: '就…而言 = as for. 倾向于 = lean towards. 前提是 = provided that. 扼杀 = stifle.'
  }],
  'cecr-c11-conversation-m2': [{ id: 'cecr-c11-conv-m2-ctx1', type: 'context-react', category: 'vocabulary',
    prompt: 'Tu fais une suggestion diplomate.',
    promptEn: 'Make a diplomatic suggestion.',
    context: 'En réunion, tu veux proposer un changement majeur sans froisser ton supérieur.',
    contextEn: 'In a meeting, suggest a major change without offending your boss.',
    choices: ['不知道这样说会不会冒昧，我想提一个或许值得考虑的方案。', '不知道再见。', '不知道不客气。', '不知道对不起。'],
    correctIndex: 0,
    explanation: '冒昧 (màomèi) = présomptueux. 或许 (huòxǔ) = peut-être. 值得考虑 = mérite considération. Multi-niveaux de politesse pour une proposition lourde.',
    explanationEn: '冒昧 = presumptuous. 或许 = perhaps. 值得考虑 = worth considering. Layered politeness for a heavy proposal.'
  }],
  'cecr-c11-conversation-m3': [{ id: 'cecr-c11-conv-m3-ctx1', type: 'context-react', category: 'vocabulary',
    prompt: 'Tu utilises une question rhétorique.',
    promptEn: 'Use a rhetorical question.',
    context: 'Tu défends une position évidente pour toi en utilisant le pattern rhétorique 难道.',
    contextEn: 'Defend an obvious-to-you position with rhetorical 难道.',
    choices: ['难道我们就这样轻易放弃多年的努力吗？', '难道再见？', '难道不客气？', '难道对不起？'],
    correctIndex: 0,
    explanation: '难道…吗 (nándào… ma) = est-ce qu\'on va vraiment… ? Question rhétorique forte. 轻易 (qīngyì) = à la légère. Rhétorique typique du discours formel.',
    explanationEn: '难道…吗 = surely we won\'t...? Strong rhetorical question. 轻易 = lightly. Formal rhetorical device.'
  }],
  'cecr-c11-conversation-m4': [{ id: 'cecr-c11-conv-m4-ctx1', type: 'context-react', category: 'vocabulary',
    prompt: 'Tu te justifies face à une critique.',
    promptEn: 'Defend yourself against criticism.',
    context: 'On te reproche d\'avoir mal géré une crise. Tu te défends avec contexte.',
    contextEn: 'Blamed for mishandling a crisis. Defend with context.',
    choices: ['当时的情况下，我已经尽力做到最好，并非有意疏忽。', '当时再见。', '当时不客气。', '当时对不起。'],
    correctIndex: 0,
    explanation: '当时的情况下 (dāngshí de qíngkuàngxià) = dans le contexte d\'alors. 尽力 (jìnlì) = faire de son mieux. 并非 (bìngfēi) = ce n\'est nullement (formel pour 不是). 疏忽 (shūhū) = négligence.',
    explanationEn: '当时…下 = in that context. 尽力 = did one\'s best. 并非 = it\'s not at all (formal). 疏忽 = negligence.'
  }],
  'cecr-c11-conversation-m5': [{ id: 'cecr-c11-conv-m5-ctx1', type: 'context-react', category: 'vocabulary',
    prompt: 'Tu fais un éloge sincère.',
    promptEn: 'Sincere praise.',
    context: 'Tu présentes ton mentor lors d\'une conférence.',
    contextEn: 'Introduce your mentor at a conference.',
    choices: ['李教授不仅学识渊博，而且为人正直，深受同行敬重。', '李教授再见。', '李教授不客气。', '李教授对不起。'],
    correctIndex: 0,
    explanation: '不仅…而且 = non seulement… mais aussi (structure formelle d\'éloge). 学识渊博 (xuéshí yuānbó) = érudition vaste. 为人正直 = caractère intègre. 敬重 (jìngzhòng) = respecter profondément.',
    explanationEn: '不仅…而且 = not only... but also. 学识渊博 = vast erudition. 为人正直 = upright character. 敬重 = deep respect.'
  }],
  'cecr-c11-conversation-m6': [{ id: 'cecr-c11-conv-m6-ctx1', type: 'context-react', category: 'vocabulary',
    prompt: 'Tu utilises un proverbe.',
    promptEn: 'Use a proverb.',
    context: 'Tu réponds à un ami qui hésite à se lancer dans un projet ambitieux.',
    contextEn: 'Respond to a friend hesitating to launch a big project.',
    choices: ['俗话说，不入虎穴，焉得虎子。机会难得，应该把握。', '俗话再见。', '俗话不客气。', '俗话对不起。'],
    correctIndex: 0,
    explanation: '俗话说 (súhuàshuō) = comme dit le proverbe. 不入虎穴，焉得虎子 = qui n\'entre pas dans la tanière du tigre n\'aura pas le petit (qui ne risque rien n\'a rien). Cite un chéngyǔ pour appuyer.',
    explanationEn: '俗话说 = as the saying goes. 不入虎穴，焉得虎子 = nothing ventured, nothing gained. Quote a chéngyǔ to back up.'
  }],
  'cecr-c11-conversation-m7': [{ id: 'cecr-c11-conv-m7-ctx1', type: 'context-react', category: 'vocabulary',
    prompt: 'Tu décris une émotion complexe.',
    promptEn: 'Describe a complex emotion.',
    context: 'Tu racontes ton ressenti après avoir quitté un emploi que tu aimais.',
    contextEn: 'Your feelings after leaving a job you loved.',
    choices: ['心情五味杂陈，既有不舍，也有对未来的期待。', '心情再见。', '心情不客气。', '心情对不起。'],
    correctIndex: 0,
    explanation: '五味杂陈 (wǔwèi zá chén) = mélange de cinq saveurs (sentiments mêlés). 既…也… = à la fois… et… 不舍 (bù shě) = ne pas pouvoir se résoudre à partir.',
    explanationEn: '五味杂陈 = mixed feelings (five flavors blended). 既…也… = both... and... 不舍 = reluctance to part.'
  }],

  // ════════════════════════════════════════════════════════════════════════
  //  C1.2 — Business avancé, conclusions, comparaisons formelles
  // ════════════════════════════════════════════════════════════════════════
  'cecr-c12-business-m4': [{ id: 'cecr-c12-biz-m4-ctx1', type: 'context-react', category: 'vocabulary',
    prompt: 'Tu clôtures une négociation difficile.',
    promptEn: 'Close a tough negotiation.',
    context: 'Après plusieurs heures de discussion, vous arrivez à un accord. Tu formules la conclusion.',
    contextEn: 'After hours of talk, you reach a deal. Phrase the closing.',
    choices: ['经过双方的共同努力，我们终于达成了共识。', '经过再见。', '经过不客气。', '经过对不起。'],
    correctIndex: 0,
    explanation: '经过…的共同努力 = grâce aux efforts conjoints. 终于 (zhōngyú) = finalement. 达成共识 (dáchéng gòngshì) = parvenir à un consensus. Formule biz fixe pour clôture d\'accord.',
    explanationEn: '经过…共同努力 = through joint efforts. 终于 = finally. 达成共识 = reach consensus. Fixed biz closing phrase.'
  }],
  'cecr-c12-conversation-m1': [{ id: 'cecr-c12-conv-m1-ctx1', type: 'context-react', category: 'vocabulary',
    prompt: 'Tu interromps poliment.', promptEn: 'Politely interrupt.',
    context: 'En réunion, tu veux interrompre une longue intervention sans paraître impoli.',
    contextEn: 'In a meeting, interrupt a long talk politely.',
    choices: ['抱歉打断一下，我想就刚才的话题补充一点。', '抱歉再见。', '抱歉不客气。', '抱歉对不起。'],
    correctIndex: 0,
    explanation: '打断一下 = couper brièvement. 就…话题 = sur ce sujet. 补充 (bǔchōng) = compléter. Formule pro pour reprendre la parole.',
    explanationEn: '打断一下 = briefly interrupt. 就…话题 = on this topic. 补充 = add to.'
  }],
  'cecr-c12-conversation-m2': [{ id: 'cecr-c12-conv-m2-ctx1', type: 'context-react', category: 'vocabulary',
    prompt: 'Tu poses une question critique.', promptEn: 'Critical question.',
    context: 'Tu remets en question l\'hypothèse d\'un présentateur sans l\'agresser.',
    contextEn: "Challenge a speaker's assumption without aggression.",
    choices: ['您刚才提到的数据，能否说明一下样本来源？', '您刚才再见。', '您刚才不客气。', '您刚才对不起。'],
    correctIndex: 0,
    explanation: '能否 (néngfǒu) = pourriez-vous (formel). 样本来源 (yàngběn láiyuán) = source de l\'échantillon. Question critique pro qui demande de justifier.',
    explanationEn: '能否 = could you (formal). 样本来源 = data source. Pro critical question asking for justification.'
  }],
  'cecr-c12-conversation-m3': [{ id: 'cecr-c12-conv-m3-ctx1', type: 'context-react', category: 'vocabulary',
    prompt: 'Tu reformules en synthèse.', promptEn: 'Summarize as a synthesis.',
    context: 'En fin de discussion, tu reformules la position commune.',
    contextEn: 'End of discussion, restate the common position.',
    choices: ['如果我理解得没错，我们的共识是优先稳定，再谋发展。', '如果再见。', '如果不客气。', '如果对不起。'],
    correctIndex: 0,
    explanation: '如果我理解得没错 = si j\'ai bien compris. 优先 X 再谋 Y = prioriser X puis viser Y. Formule de synthèse pro.',
    explanationEn: '如果我理解得没错 = if I understand correctly. 优先 X 再谋 Y = prioritize X then pursue Y.'
  }],
  'cecr-c12-conversation-m4': [{ id: 'cecr-c12-conv-m4-ctx1', type: 'context-react', category: 'vocabulary',
    prompt: 'Tu poses un cadre.', promptEn: 'Set a frame.',
    context: 'Tu introduis un sujet complexe en posant ses limites.',
    contextEn: 'Open a complex topic by setting its boundaries.',
    choices: ['今天我们讨论的范围仅限于市场策略，不涉及人事问题。', '今天再见。', '今天不客气。', '今天对不起。'],
    correctIndex: 0,
    explanation: '讨论的范围 (tǎolùn de fànwéi) = la portée. 仅限于 (jǐn xiànyú) = se limite à. 不涉及 (bù shèjí) = ne concerne pas. Cadrage pro précis.',
    explanationEn: '讨论的范围 = scope. 仅限于 = limited to. 不涉及 = does not cover.'
  }],
  'cecr-c12-conversation-m5': [{ id: 'cecr-c12-conv-m5-ctx1', type: 'context-react', category: 'vocabulary',
    prompt: 'Tu opposes formellement.', promptEn: 'Formal opposition.',
    context: 'Tu contestes une décision lors d\'un comité.',
    contextEn: 'Challenge a decision in a committee.',
    choices: ['我对这一决定持保留意见，主要顾虑在于执行风险。', '我对再见。', '我对不客气。', '我对对不起。'],
    correctIndex: 0,
    explanation: '持保留意见 (chí bǎoliú yìjiàn) = avoir des réserves. 顾虑 (gùlǜ) = inquiétude. 执行风险 (zhíxíng fēngxiǎn) = risque d\'exécution. Opposition pro formelle.',
    explanationEn: '持保留意见 = have reservations. 顾虑 = concern. 执行风险 = execution risk.'
  }],
  'cecr-c12-conversation-m6': [{ id: 'cecr-c12-conv-m6-ctx1', type: 'context-react', category: 'vocabulary',
    prompt: 'Tu utilises une analogie.', promptEn: 'Use an analogy.',
    context: 'Tu expliques un concept abstrait à un client en utilisant une comparaison concrète.',
    contextEn: 'Explain an abstract concept to a client via concrete comparison.',
    choices: ['这就好比盖房子，没有打好地基，再漂亮也不稳固。', '这就再见。', '这就不客气。', '这就对不起。'],
    correctIndex: 0,
    explanation: '好比 (hǎobǐ) = c\'est comme. 地基 (dìjī) = fondations. Structure 没有 X, 再 Y 也… = sans X, même Y… Analogie pédagogique typique.',
    explanationEn: '好比 = it\'s like. 地基 = foundation. 没有 X, 再 Y 也 = without X, even Y... Teaching analogy.'
  }],
  'cecr-c12-conversation-m7': [{ id: 'cecr-c12-conv-m7-ctx1', type: 'context-react', category: 'vocabulary',
    prompt: 'Tu conclus un discours.', promptEn: 'Close a speech.',
    context: 'Tu termines une présentation devant le board.',
    contextEn: 'End a presentation to the board.',
    choices: ['最后，再次感谢各位的支持，期待与大家携手共创未来。', '最后再见。', '最后不客气。', '最后对不起。'],
    correctIndex: 0,
    explanation: '再次感谢 = remercier à nouveau. 携手共创未来 (xiéshǒu gòng chuàng wèilái) = bâtir ensemble l\'avenir. Formule de clôture inspirante très chinoise.',
    explanationEn: '再次感谢 = thanks again. 携手共创未来 = build the future together. Very Chinese inspirational closing.'
  }],

  // ════════════════════════════════════════════════════════════════════════
  //  C2.1 — Maîtrise littéraire / médiatique
  // ════════════════════════════════════════════════════════════════════════
  'cecr-c21-conversation-m1': [{ id: 'cecr-c21-conv-m1-ctx1', type: 'context-react', category: 'vocabulary',
    prompt: 'Registre littéraire.', promptEn: 'Literary register.',
    context: 'Tu décris une scène automnale dans un essai littéraire.',
    contextEn: 'Describe an autumn scene in a literary essay.',
    choices: ['秋风萧瑟，落叶纷飞，令人不禁感慨时光易逝。', '秋风再见。', '秋风不客气。', '秋风对不起。'],
    correctIndex: 0,
    explanation: '萧瑟 (xiāo sè) = mélancolique (vent). 纷飞 (fēnfēi) = voltiger. 不禁 (bùjīn) = ne pouvoir s\'empêcher. 时光易逝 = le temps file. Style essai chinois classique.',
    explanationEn: '萧瑟 = bleak (wind). 纷飞 = swirl down. 不禁 = can\'t help but. 时光易逝 = time flies. Classical essay style.'
  }],
  'cecr-c21-conversation-m2': [{ id: 'cecr-c21-conv-m2-ctx1', type: 'context-react', category: 'vocabulary',
    prompt: 'Critique de film.', promptEn: 'Film critique.',
    context: 'Tu rédiges une critique cinéma sur Douban.',
    contextEn: 'Write a film critique on Douban.',
    choices: ['这部影片以细腻的笔触刻画了一代人的精神困境。', '这部再见。', '这部不客气。', '这部对不起。'],
    correctIndex: 0,
    explanation: '细腻的笔触 (xìnì de bǐchù) = touche délicate. 刻画 (kèhuà) = dépeindre. 精神困境 (jīngshén kùnjìng) = dilemme spirituel. Lexique critique de cinéma raffiné.',
    explanationEn: '细腻笔触 = delicate brushwork. 刻画 = portray. 精神困境 = spiritual dilemma. Refined film critique vocab.'
  }],
  'cecr-c21-conversation-m3': [{ id: 'cecr-c21-conv-m3-ctx1', type: 'context-react', category: 'vocabulary',
    prompt: 'Édito politique.', promptEn: 'Political editorial.',
    context: 'Tu rédiges un édito pour un journal.',
    contextEn: 'Op-ed for a newspaper.',
    choices: ['此举不啻为一种倒退，亟需各方重新审视。', '此举再见。', '此举不客气。', '此举对不起。'],
    correctIndex: 0,
    explanation: '此举 (cǐ jǔ) = cette action (très soutenu). 不啻 (bùchì) = équivaut à. 倒退 (dàotuì) = recul. 亟需 (jí xū) = exiger urgemment. 审视 (shěnshì) = examiner. Édito très formel.',
    explanationEn: '此举 = this action (very formal). 不啻 = amounts to. 倒退 = regression. 亟需 = urgently need. 审视 = scrutinize.'
  }],
  'cecr-c21-conversation-m4': [{ id: 'cecr-c21-conv-m4-ctx1', type: 'context-react', category: 'vocabulary',
    prompt: 'Discours académique.', promptEn: 'Academic speech.',
    context: 'Tu présentes un papier en conférence universitaire.',
    contextEn: 'Present a paper at an academic conference.',
    choices: ['本研究旨在探讨城市化对传统文化的影响及其内在机制。', '本研究再见。', '本研究不客气。', '本研究对不起。'],
    correctIndex: 0,
    explanation: '旨在 (zhǐzài) = vise à. 探讨 (tàntǎo) = examiner. 内在机制 (nèizài jīzhì) = mécanisme sous-jacent. Lexique académique standard.',
    explanationEn: '旨在 = aims to. 探讨 = examine. 内在机制 = underlying mechanism. Academic standard.'
  }],
  'cecr-c21-conversation-m5': [{ id: 'cecr-c21-conv-m5-ctx1', type: 'context-react', category: 'vocabulary',
    prompt: 'Discours funèbre / hommage.', promptEn: 'Memorial / tribute speech.',
    context: 'Tu rends hommage à un collègue parti à la retraite.',
    contextEn: 'Tribute to a retiring colleague.',
    choices: ['他兢兢业业，三十年如一日，堪称我们行业的楷模。', '他兢兢业业再见。', '他兢兢业业不客气。', '他兢兢业业对不起。'],
    correctIndex: 0,
    explanation: '兢兢业业 (jīngjīngyèyè) = consciencieux. 三十年如一日 = trente ans avec la même constance. 堪称 (kānchēng) = digne d\'être appelé. 楷模 (kǎimó) = modèle exemplaire.',
    explanationEn: '兢兢业业 = diligent. 三十年如一日 = 30 years of consistency. 堪称 = worthy of being called. 楷模 = role model.'
  }],
  'cecr-c21-conversation-m6': [{ id: 'cecr-c21-conv-m6-ctx1', type: 'context-react', category: 'vocabulary',
    prompt: 'Discours juridique.', promptEn: 'Legal discourse.',
    context: 'Tu argumentes en faveur d\'une réforme légale.',
    contextEn: 'Argue for a legal reform.',
    choices: ['现行法规存在明显漏洞，亟待修订以适应新形势。', '现行再见。', '现行不客气。', '现行对不起。'],
    correctIndex: 0,
    explanation: '现行法规 (xiànxíng fǎguī) = règlements en vigueur. 漏洞 (lòudòng) = faille. 亟待修订 = exige révision urgente. 新形势 = nouveau contexte. Lexique juridique.',
    explanationEn: '现行法规 = current regulations. 漏洞 = loophole. 亟待修订 = urgently need revision.'
  }],
  'cecr-c21-conversation-m7': [{ id: 'cecr-c21-conv-m7-ctx1', type: 'context-react', category: 'vocabulary',
    prompt: 'Discussion philosophique.', promptEn: 'Philosophical discussion.',
    context: 'Tu participes à un débat sur le sens de la vie.',
    contextEn: 'Take part in a debate on the meaning of life.',
    choices: ['人生的意义并非外求，而在于内心的觉醒与对自我的超越。', '人生的再见。', '人生的不客气。', '人生的对不起。'],
    correctIndex: 0,
    explanation: '并非…而在于 = ce n\'est pas… mais réside dans. 外求 = chercher à l\'extérieur. 觉醒 (juéxǐng) = éveil. 超越 (chāoyuè) = transcender. Style philo bouddhiste.',
    explanationEn: '并非…而在于 = not... but lies in. 外求 = seek outside. 觉醒 = awakening. 超越 = transcend.'
  }],

  // ════════════════════════════════════════════════════════════════════════
  //  C2.2 — Style natif : ironie, sous-entendus, registres mixtes
  // ════════════════════════════════════════════════════════════════════════
  'cecr-c22-conversation-m1': [{ id: 'cecr-c22-conv-m1-ctx1', type: 'context-react', category: 'vocabulary',
    prompt: 'Ironie polie.', promptEn: 'Polite irony.',
    context: 'Un collègue arrive systématiquement en retard. Tu lui fais une remarque ironique mais subtile.',
    contextEn: 'A colleague chronically late. Subtle ironic remark.',
    choices: ['哎呀，今天可是难得的早到啊。', '哎呀，再见。', '哎呀，不客气。', '哎呀，对不起。'],
    correctIndex: 0,
    explanation: '可是 (kěshì) ici = vraiment, donc (emphase ironique, pas "mais"). 难得的早到 = un "tôt" si rare. Forme typique de pique amicale chinoise.',
    explanationEn: '可是 = indeed (ironic emphasis, not "but"). 难得的早到 = a rare "early arrival". Classic friendly Chinese jab.'
  }],
  'cecr-c22-conversation-m2': [{ id: 'cecr-c22-conv-m2-ctx1', type: 'context-react', category: 'vocabulary',
    prompt: 'Sous-entendu.', promptEn: 'Implication.',
    context: 'Tu suggères à un ami que sa décision n\'est peut-être pas la meilleure sans le dire directement.',
    contextEn: 'Hint a friend their choice might not be best, without saying it.',
    choices: ['这件事呢，你自己心里应该有数。', '这件事呢，再见。', '这件事呢，不客气。', '这件事呢，对不起。'],
    correctIndex: 0,
    explanation: '心里有数 (xīnlǐyǒushù) = en avoir conscience intérieurement. Particule 呢 = adoucissement. Pousse à la réflexion sans accuser. Très chinois.',
    explanationEn: '心里有数 = know in your heart. 呢 softener. Pushes reflection without accusing. Very Chinese.'
  }],
  'cecr-c22-conversation-m3': [{ id: 'cecr-c22-conv-m3-ctx1', type: 'context-react', category: 'vocabulary',
    prompt: 'Argot internet.', promptEn: 'Internet slang.',
    context: 'Tu réagis sur Weibo à une polémique avec un argot moderne.',
    contextEn: 'React to a controversy on Weibo with modern slang.',
    choices: ['这波操作真是让人吃瓜吃到饱。', '这波再见。', '这波不客气。', '这波对不起。'],
    correctIndex: 0,
    explanation: '这波操作 (zhè bō cāozuò) = "ce coup" (argot net). 吃瓜 (chī guā) = manger pastèque = spectateur passif d\'un drama. 到饱 = jusqu\'à plus faim. Très Weibo.',
    explanationEn: '这波操作 = "this move" (net slang). 吃瓜 = eat melon = bystander watching drama. 到饱 = until full. Pure Weibo style.'
  }],
  'cecr-c22-conversation-m4': [{ id: 'cecr-c22-conv-m4-ctx1', type: 'context-react', category: 'vocabulary',
    prompt: 'Refuser fermement.', promptEn: 'Firm refusal.',
    context: 'Un démarcheur insiste. Tu refuses sans laisser de place à l\'insistance.',
    contextEn: 'A pushy salesperson. Refuse leaving no room.',
    choices: ['不好意思，我真的没有兴趣，请您不要再打电话了。', '不好意思，再见。', '不好意思，不客气。', '不好意思，对不起。'],
    correctIndex: 0,
    explanation: '真的没有 + 请不要再 = excuse polie + ordre ferme. Combinaison classique pour fermer la porte sans agressivité.',
    explanationEn: '真的没有 + 请不要再 = polite excuse + firm command. Classic combo to firmly close door politely.'
  }],
  'cecr-c22-conversation-m5': [{ id: 'cecr-c22-conv-m5-ctx1', type: 'context-react', category: 'vocabulary',
    prompt: 'Style mixte (formel + familier).',
    promptEn: 'Mixed register (formal + casual).',
    context: 'En présentation à des amis pro, tu glisses une touche d\'humour.',
    contextEn: 'In a presentation to pro friends, drop a touch of humor.',
    choices: ['用大家的话说，咱们这次算是“卷”到极致了。', '用大家的话说，再见。', '用大家的话说，不客气。', '用大家的话说，对不起。'],
    correctIndex: 0,
    explanation: '用大家的话说 = comme on dit. 咱们 (zánmen) = nous (inclusif familier). 卷 (juǎn) = se rouler dessus (argot pour compétition féroce / burn-out). Mixe formel + slang 2020s.',
    explanationEn: '用大家的话说 = as we say. 咱们 = us (inclusive casual). 卷 = "involuted" / brutal competition (2020s slang). Mixed register.'
  }],
  'cecr-c22-conversation-m6': [{ id: 'cecr-c22-conv-m6-ctx1', type: 'context-react', category: 'vocabulary',
    prompt: 'Évoquer le passé avec poésie.',
    promptEn: 'Evoke past poetically.',
    context: 'Tu écris un post WeChat Moments réfléchissant sur ta dernière décennie.',
    contextEn: 'WeChat Moments post reflecting on your past decade.',
    choices: ['十年弹指一挥间，回首往事，恍如昨日。', '十年再见。', '十年不客气。', '十年对不起。'],
    correctIndex: 0,
    explanation: '弹指一挥间 (tánzhǐ yī huī jiān) = en un claquement de doigts (chéngyǔ). 回首往事 = se retourner sur le passé. 恍如昨日 = comme hier. Trois locutions chéngyǔ en cascade.',
    explanationEn: '弹指一挥间 = in a snap (chéngyǔ). 回首往事 = look back on the past. 恍如昨日 = as if yesterday. Three chéngyǔ in a row.'
  }],
  'cecr-c22-conversation-m7': [{ id: 'cecr-c22-conv-m7-ctx1', type: 'context-react', category: 'vocabulary',
    prompt: 'Trancher avec autorité.',
    promptEn: 'Cut through with authority.',
    context: 'En tant que leader, tu mets fin à un débat circulaire.',
    contextEn: 'As a leader, end a circular debate.',
    choices: ['行了，话不多说，就这么定了，下周一执行。', '行了，再见。', '行了，不客气。', '行了，对不起。'],
    correctIndex: 0,
    explanation: '行了 (xíng le) = ok ça suffit. 话不多说 = sans tergiverser. 就这么定了 = c\'est décidé. Ton autoritaire pro qui clôt. Phrase ultra naturelle de boss chinois.',
    explanationEn: '行了 = enough. 话不多说 = no more talk. 就这么定了 = it\'s settled. Authoritative pro tone. Very natural Chinese boss line.'
  }]
};
