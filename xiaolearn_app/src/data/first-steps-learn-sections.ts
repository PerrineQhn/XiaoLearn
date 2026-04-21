/**
 * first-steps-learn-sections.ts — contenu pédagogique manuel pour les 12 leçons
 * du parcours "Premiers Pas" (phase "Apprentissage"). Ces sections sont
 * injectées sur les `LessonModule` correspondants avant d'être mappées vers
 * `LessonV2Data`.
 *
 * Règle produit : tous les `audio` référencés pointent vers un MP3/WAV
 * pré-généré (Azure Neural TTS) — cf. xiaolearn_audio_policy. Les chemins
 * ont été vérifiés à l'écriture ; en cas de missing WAV, le bouton 🔊 tombe
 * silencieusement (pas de fallback Web Speech).
 *
 * Conventions audio :
 *   - Caractères HSK1 : `audio/hsk1/hsk1_{hanzi}.wav`
 */

import type { LessonV2LearnSection } from '../types/lesson-learn';

// ---------------------------------------------------------------------------
// Leçon 1 — Salutations (phrases-1-greetings)
// ---------------------------------------------------------------------------

export const greetingsLearnSections: LessonV2LearnSection[] = [
  {
    id: 'greet-basic',
    title: 'Le passe-partout : 你好',
    titleEn: 'The universal greeting: 你好',
    body:
      'En mandarin, il n\'existe pas de « bonjour » unique comme en français. Le réflexe de base, c\'est 你好 (nǐ hǎo), littéralement « tu + bien ». On l\'utilise toute la journée, avec presque tout le monde.\nSa version respectueuse est 您好 (nín hǎo), avec 您 — un « vous » de politesse réservé aux personnes plus âgées, aux clients, aux professeurs.',
    bodyEn:
      'Mandarin has no single word for "hello" like English. The default reflex is 你好 (nǐ hǎo), literally "you + good". You can use it all day, with almost anyone.\nThe respectful version is 您好 (nín hǎo), with 您 — a polite "you" reserved for elders, customers, teachers.',
    items: [
      { hanzi: '你好', pinyin: 'nǐ hǎo', meaning: 'bonjour (standard)', meaningEn: 'hello (standard)', audio: 'audio/hsk1/hsk1_你好.wav' },
      { hanzi: '您', pinyin: 'nín', meaning: 'vous (poli, singulier)', meaningEn: 'you (polite, singular)', audio: 'audio/hsk1/hsk1_您.wav' },
      { hanzi: '你', pinyin: 'nǐ', meaning: 'tu', meaningEn: 'you', audio: 'audio/hsk1/hsk1_你.wav' },
      { hanzi: '好', pinyin: 'hǎo', meaning: 'bien, bon', meaningEn: 'good, well', audio: 'audio/hsk1/hsk1_好.wav' }
    ],
    tip:
      '你好 s\'utilise aussi pour « salut » entre amis — il n\'est pas aussi formel qu\'un « bonjour » français. Au téléphone, les Chinois disent souvent 喂 (wéi).',
    tipEn:
      '你好 works as "hi" between friends too — it is not as formal as a French "bonjour". On the phone, Chinese speakers typically say 喂 (wéi).'
  },
  {
    id: 'greet-time',
    title: 'Saluer selon le moment',
    titleEn: 'Greeting by time of day',
    body:
      'Pour une salutation plus chaleureuse ou contextuelle, on colle 好 (bien) après un moment de la journée. La structure est toujours la même : [moment] + 好.',
    bodyEn:
      'For a warmer or context-specific greeting, stick 好 (good) after a time of day. The pattern is always: [time] + 好.',
    items: [
      { hanzi: '早上', pinyin: 'zǎo shàng', meaning: 'le matin', meaningEn: 'morning', audio: 'audio/hsk1/hsk1_早上.wav' },
      { hanzi: '早', pinyin: 'zǎo', meaning: '« salut ! » (matin, familier)', meaningEn: '"morning!" (casual)', audio: 'audio/hsk1/hsk1_早.wav' },
      { hanzi: '中午', pinyin: 'zhōng wǔ', meaning: 'midi, la mi-journée', meaningEn: 'noon, midday', audio: 'audio/hsk1/hsk1_中午.wav' },
      { hanzi: '晚上', pinyin: 'wǎn shàng', meaning: 'le soir', meaningEn: 'evening', audio: 'audio/hsk1/hsk1_晚上.wav' }
    ],
    tip:
      '早上好 (zǎo shàng hǎo) = « bonjour (matin) », 晚上好 (wǎn shàng hǎo) = « bonsoir ». Un simple 早 ! suffit entre collègues en arrivant au bureau.',
    tipEn:
      '早上好 (zǎo shàng hǎo) = "good morning", 晚上好 (wǎn shàng hǎo) = "good evening". A plain 早! is enough between colleagues arriving at the office.'
  },
  {
    id: 'greet-bye',
    title: 'Prendre congé',
    titleEn: 'Saying goodbye',
    body:
      '再见 (zài jiàn) signifie littéralement « encore + voir » — « à la prochaine ». Entre amis, on utilise aussi 拜拜 (bái bái), calqué sur l\'anglais « bye bye ». Pour remercier en partant, 谢谢 (xiè xiè) est indispensable.',
    bodyEn:
      '再见 (zài jiàn) literally means "again + see" — "see you again". Between friends, 拜拜 (bái bái) is common, borrowed from English "bye bye". To thank as you leave, 谢谢 (xiè xiè) is a must.',
    items: [
      { hanzi: '再见', pinyin: 'zài jiàn', meaning: 'au revoir', meaningEn: 'goodbye', audio: 'audio/hsk1/hsk1_再见.wav' },
      { hanzi: '谢谢', pinyin: 'xiè xiè', meaning: 'merci', meaningEn: 'thank you', audio: 'audio/hsk1/hsk1_谢谢.wav' }
    ],
    tip:
      'Dans un contexte professionnel, on dit 明天见 (míng tiān jiàn) « à demain » ou 下次见 (xià cì jiàn) « à la prochaine fois ». Le 见 final fonctionne comme un modèle réutilisable.',
    tipEn:
      'In a professional context, 明天见 (míng tiān jiàn) "see you tomorrow" or 下次见 (xià cì jiàn) "see you next time" are common. The final 见 works as a reusable template.'
  }
];

// ---------------------------------------------------------------------------
// Leçon 2 — Se présenter (phrases-2-introductions)
// ---------------------------------------------------------------------------

export const introductionsLearnSections: LessonV2LearnSection[] = [
  {
    id: 'intro-pronouns',
    title: 'Les pronoms de base',
    titleEn: 'Basic pronouns',
    body:
      'Trois mots seulement pour désigner les gens au singulier : 我 (wǒ) = je, 你 (nǐ) = tu, 他/她 (tā) = il/elle. Au pluriel, on ajoute 们 (men) : 我们 = nous, 你们 = vous, 他们 = ils.\nLes pronoms ne changent jamais — pas de conjugaison, pas de déclinaison. 我 veut dire aussi bien « je », « moi », « mon ».',
    bodyEn:
      'Only three basic singular pronouns: 我 (wǒ) = I, 你 (nǐ) = you, 他/她 (tā) = he/she. For the plural, add 们 (men): 我们 = we, 你们 = you, 他们 = they.\nPronouns never change — no conjugation, no declension. 我 means "I", "me", or "my" depending on context.',
    items: [
      { hanzi: '我', pinyin: 'wǒ', meaning: 'je, moi', meaningEn: 'I, me', audio: 'audio/hsk1/hsk1_我.wav' },
      { hanzi: '你', pinyin: 'nǐ', meaning: 'tu, toi', meaningEn: 'you', audio: 'audio/hsk1/hsk1_你.wav' },
      { hanzi: '您', pinyin: 'nín', meaning: 'vous (poli)', meaningEn: 'you (polite)', audio: 'audio/hsk1/hsk1_您.wav' }
    ],
    tip:
      'À l\'écrit, 他 désigne un homme, 她 une femme, 它 un objet ou animal. Mais à l\'oral, ils se prononcent tous « tā » — impossible de les distinguer.',
    tipEn:
      'In writing, 他 is male, 她 is female, 它 is for objects/animals. In speech they all sound "tā" — no way to tell them apart.'
  },
  {
    id: 'intro-name',
    title: 'Dire son nom',
    titleEn: 'Saying your name',
    body:
      'Deux structures possibles. La plus naturelle : 我叫 + [nom] (wǒ jiào = « je m\'appelle »). La plus formelle : 我的名字是 + [nom] (wǒ de míng zì shì = « mon nom est »).\nPour demander à quelqu\'un son nom, on dit 你叫什么名字 ? (« tu + t\'appeles + quoi + nom ? »).',
    bodyEn:
      'Two structures. The most natural: 我叫 + [name] (wǒ jiào = "I am called"). The more formal: 我的名字是 + [name] (wǒ de míng zì shì = "my name is").\nTo ask someone\'s name: 你叫什么名字? ("you + called + what + name?").',
    items: [
      { hanzi: '叫', pinyin: 'jiào', meaning: 's\'appeler, appeler', meaningEn: 'to be called, to call', audio: 'audio/hsk1/hsk1_叫.wav' },
      { hanzi: '名字', pinyin: 'míng zì', meaning: 'le nom, le prénom', meaningEn: 'name', audio: 'audio/hsk1/hsk1_名字.wav' },
      { hanzi: '是', pinyin: 'shì', meaning: 'être', meaningEn: 'to be', audio: 'audio/hsk1/hsk1_是.wav' }
    ],
    tip:
      'En Chine, le nom de famille (姓 xìng) vient toujours en premier, le prénom ensuite. « Marie Dupont » se présente comme « Dupont Marie » dans l\'ordre chinois.',
    tipEn:
      'In China, the family name (姓 xìng) always comes first, given name after. "John Smith" would be introduced as "Smith John" in Chinese order.'
  },
  {
    id: 'intro-full',
    title: 'Se présenter complètement',
    titleEn: 'Full introduction',
    body:
      'Un schéma classique de 3 phrases :\n  • 你好 ! — Bonjour !\n  • 我叫 + [nom]. — Je m\'appelle …\n  • 很高兴认识你。 (hěn gāo xìng rèn shi nǐ) — Ravi de te rencontrer.\nPour enchaîner, on peut ajouter 我是法国人 (wǒ shì Fǎ guó rén) « je suis français ».',
    bodyEn:
      'A classic 3-sentence pattern:\n  • 你好! — Hello!\n  • 我叫 + [name]. — My name is …\n  • 很高兴认识你。 (hěn gāo xìng rèn shi nǐ) — Nice to meet you.\nTo keep going, add 我是法国人 (wǒ shì Fǎ guó rén) "I am French".',
    tip:
      'La phrase 很高兴认识你 est un bloc, apprends-la d\'un coup plutôt que mot à mot. Elle marche dans tous les contextes — business, école, amis.',
    tipEn:
      '很高兴认识你 is a chunk — learn it as a whole phrase rather than word-by-word. It works in every context — business, school, friends.'
  }
];

// ---------------------------------------------------------------------------
// Leçon 3 — Politesse (phrases-3-politeness)
// ---------------------------------------------------------------------------

export const politenessLearnSections: LessonV2LearnSection[] = [
  {
    id: 'pol-thanks',
    title: 'Remercier et répondre',
    titleEn: 'Thanking and replying',
    body:
      '谢谢 (xiè xiè) est le « merci » universel. On peut renforcer avec 谢谢你 (merci à toi) ou 非常感谢 (fēi cháng gǎn xiè) « merci beaucoup » dans un cadre plus formel.\nPour répondre, on dit 不客气 (bú kè qì), littéralement « ne + faire + cérémonie » — « pas de quoi ».',
    bodyEn:
      '谢谢 (xiè xiè) is the universal "thanks". You can strengthen with 谢谢你 (thanks to you) or 非常感谢 (fēi cháng gǎn xiè) "many thanks" in a more formal context.\nTo reply, say 不客气 (bú kè qì), literally "don\'t + make + ceremony" — "you\'re welcome".',
    items: [
      { hanzi: '谢谢', pinyin: 'xiè xiè', meaning: 'merci', meaningEn: 'thank you', audio: 'audio/hsk1/hsk1_谢谢.wav' },
      { hanzi: '不客气', pinyin: 'bú kè qì', meaning: 'pas de quoi, je t\'en prie', meaningEn: 'you\'re welcome', audio: 'audio/hsk1/hsk1_不客气.wav' },
      { hanzi: '请', pinyin: 'qǐng', meaning: 's\'il vous plaît, je vous prie', meaningEn: 'please', audio: 'audio/hsk1/hsk1_请.wav' }
    ],
    tip:
      '请 est aussi un verbe : 请进 (« entrez s\'il vous plaît »), 请坐 (« asseyez-vous »). On le place toujours en début de phrase, comme le « please » anglais avec un impératif.',
    tipEn:
      '请 is also a verb: 请进 ("please come in"), 请坐 ("please sit"). It is always placed at the start, like English "please" with an imperative.'
  },
  {
    id: 'pol-sorry',
    title: 'S\'excuser et pardonner',
    titleEn: 'Apologizing and forgiving',
    body:
      'Pour s\'excuser, deux niveaux. 对不起 (duì bu qǐ) est l\'excuse la plus forte, littéralement « pas + pouvoir + te + regarder en face ». 打扰 (dǎ rǎo) « je te dérange » s\'utilise quand on interrompt quelqu\'un.\nLa réponse bienveillante est 没关系 (méi guān xi) « pas grave, pas de rapport ».',
    bodyEn:
      'Two levels of apology. 对不起 (duì bu qǐ) is the strongest one, literally "cannot + face + you". 打扰 (dǎ rǎo) "I\'m bothering you" is used when interrupting someone.\nThe warm reply is 没关系 (méi guān xi) "no worries, it doesn\'t matter".',
    items: [
      { hanzi: '对不起', pinyin: 'duì bu qǐ', meaning: 'pardon, je suis désolé', meaningEn: 'sorry, I apologize', audio: 'audio/hsk1/hsk1_对不起.wav' },
      { hanzi: '没关系', pinyin: 'méi guān xi', meaning: 'ce n\'est rien, pas grave', meaningEn: 'no problem, it\'s OK', audio: 'audio/hsk1/hsk1_没关系.wav' },
      { hanzi: '没事', pinyin: 'méi shì', meaning: 'ce n\'est rien (familier)', meaningEn: 'it\'s nothing (casual)', audio: 'audio/hsk1/hsk1_没事.wav' },
      { hanzi: '打扰', pinyin: 'dǎ rǎo', meaning: 'déranger', meaningEn: 'to bother, disturb', audio: 'audio/hsk1/hsk1_打扰.wav' }
    ],
    tip:
      '对不起 est réservé aux vraies excuses. Pour un simple « pardon, excusez-moi » en passant, on dit plutôt 不好意思 (bù hǎo yì si) — plus léger, plus social.',
    tipEn:
      '对不起 is for real apologies. For a casual "excuse me" in passing, prefer 不好意思 (bù hǎo yì si) — softer and more social.'
  }
];

// ---------------------------------------------------------------------------
// Leçon 4 — Questions simples (phrases-4-questions)
// ---------------------------------------------------------------------------

export const questionsLearnSections: LessonV2LearnSection[] = [
  {
    id: 'q-what-who',
    title: 'Quoi ? Qui ?',
    titleEn: 'What? Who?',
    body:
      '什么 (shén me) = « quoi ». On le place où on veut avoir la réponse, sans inversion : 你叫什么 ? (« tu t\'appelles quoi ? »), 这是什么 ? (« c\'est quoi ça ? »).\n谁 (shéi, parfois shuí) = « qui ». Même logique : 他是谁 ? (« lui + est + qui ? »).',
    bodyEn:
      '什么 (shén me) = "what". Place it exactly where the answer goes, no word-swap: 你叫什么? ("you called what?"), 这是什么? ("this is what?").\n谁 (shéi, sometimes shuí) = "who". Same logic: 他是谁? ("he is who?").',
    items: [
      { hanzi: '什么', pinyin: 'shén me', meaning: 'quoi, quel', meaningEn: 'what', audio: 'audio/hsk1/hsk1_什么.wav' },
      { hanzi: '谁', pinyin: 'shéi', meaning: 'qui', meaningEn: 'who', audio: 'audio/hsk1/hsk1_谁.wav' }
    ],
    tip:
      'Règle d\'or des questions chinoises : pas d\'inversion. Tu prends ta phrase affirmative et tu remplaces l\'inconnu par un mot interrogatif à la même place.',
    tipEn:
      'Golden rule of Chinese questions: no inversion. Take your affirmative sentence and replace the unknown with a question word in the same spot.'
  },
  {
    id: 'q-where-how',
    title: 'Où ? Comment ?',
    titleEn: 'Where? How?',
    body:
      '哪 (nǎ) = « lequel, où » ; il se combine en 哪儿 (nǎr) ou 哪里 (nǎ lǐ) pour « où » (北京 vs sud).\n怎么 (zěn me) = « comment ». Il sert à demander une manière : 怎么说 ? (« comment dit-on ? »), 怎么去 ? (« comment y aller ? »).',
    bodyEn:
      '哪 (nǎ) = "which, where"; it combines into 哪儿 (nǎr) or 哪里 (nǎ lǐ) for "where" (北京 is used in the north, 哪里 in the south).\n怎么 (zěn me) = "how". Used to ask a manner: 怎么说? ("how do you say it?"), 怎么去? ("how to get there?").',
    items: [
      { hanzi: '哪', pinyin: 'nǎ', meaning: 'lequel', meaningEn: 'which', audio: 'audio/hsk1/hsk1_哪.wav' },
      { hanzi: '哪儿', pinyin: 'nǎr', meaning: 'où (nord de la Chine)', meaningEn: 'where (northern usage)', audio: 'audio/hsk1/hsk1_哪儿.wav' },
      { hanzi: '哪里', pinyin: 'nǎ lǐ', meaning: 'où (standard)', meaningEn: 'where (standard)', audio: 'audio/hsk1/hsk1_哪里.wav' },
      { hanzi: '怎么', pinyin: 'zěn me', meaning: 'comment, pourquoi', meaningEn: 'how, why', audio: 'audio/hsk1/hsk1_怎么.wav' }
    ],
    tip:
      '哪儿 (nǎr) sonne plus pékinois avec son « r » final. 哪里 (nǎ lǐ) est plus neutre et s\'écrit plus souvent dans les manuels. Les deux signifient exactement la même chose.',
    tipEn:
      '哪儿 (nǎr) sounds more Beijing-flavored with its final "r". 哪里 (nǎ lǐ) is more neutral and appears more often in textbooks. Both mean exactly the same thing.'
  },
  {
    id: 'q-how-many',
    title: 'Combien ?',
    titleEn: 'How many?',
    body:
      'Deux mots pour « combien ». 几 (jǐ) pour les petits nombres qu\'on imagine moins de 10 (几岁 = quel âge, 几点 = quelle heure). 多少 (duō shǎo) pour tout le reste, sans limite (多少钱 = combien ça coûte ?).',
    bodyEn:
      'Two words for "how many". 几 (jǐ) for small counts, typically under 10 (几岁 = how old, 几点 = what time). 多少 (duō shǎo) for everything else, no upper limit (多少钱 = how much does it cost?).',
    items: [
      { hanzi: '几', pinyin: 'jǐ', meaning: 'combien (peu)', meaningEn: 'how many (small)', audio: 'audio/hsk1/hsk1_几.wav' },
      { hanzi: '多少', pinyin: 'duō shǎo', meaning: 'combien (indéfini)', meaningEn: 'how much/many', audio: 'audio/hsk1/hsk1_多少.wav' },
      { hanzi: '吗', pinyin: 'ma', meaning: 'particule interrogative', meaningEn: 'question particle', audio: 'audio/hsk1/hsk1_吗.wav' }
    ],
    tip:
      '吗 transforme n\'importe quelle affirmation en question oui/non. 你好 (tu vas bien) → 你好吗 ? (tu vas bien ?). On le pose à la toute fin, et il est toujours au ton neutre.',
    tipEn:
      '吗 turns any affirmative sentence into a yes/no question. 你好 (you are well) → 你好吗? (are you well?). It sits at the very end, always in the neutral tone.'
  }
];

// ---------------------------------------------------------------------------
// Leçon 5 — Oui et non (phrases-5-yes-no)
// ---------------------------------------------------------------------------

export const yesNoLearnSections: LessonV2LearnSection[] = [
  {
    id: 'yn-no-direct',
    title: 'Pas de « oui / non » direct',
    titleEn: 'No direct "yes / no"',
    body:
      'Le chinois n\'a pas de mot qui signifie « oui » ou « non » de manière universelle. On répète le verbe de la question, affirmatif ou négatif.\nExemple : 你去吗 ? (tu y vas ?) → 去 (oui) / 不去 (non). 你是学生吗 ? (tu es étudiant ?) → 是 / 不是.',
    bodyEn:
      'Chinese has no universal word for "yes" or "no". You repeat the verb of the question, affirmatively or negatively.\nExample: 你去吗? (are you going?) → 去 (yes) / 不去 (no). 你是学生吗? (are you a student?) → 是 / 不是.',
    items: [
      { hanzi: '是', pinyin: 'shì', meaning: 'oui, être', meaningEn: 'yes, to be', audio: 'audio/hsk1/hsk1_是.wav' },
      { hanzi: '不', pinyin: 'bù', meaning: 'non (négation)', meaningEn: 'no, not', audio: 'audio/hsk1/hsk1_不.wav' },
      { hanzi: '对', pinyin: 'duì', meaning: 'exact, c\'est ça', meaningEn: 'right, correct', audio: 'audio/hsk1/hsk1_对.wav' }
    ],
    tip:
      '对 (duì) est plus proche de « oui, c\'est vrai » que de « oui, j\'ai fait cela ». On l\'utilise pour confirmer une information, pas pour répondre à une invitation.',
    tipEn:
      '对 (duì) is closer to "yes, that\'s right" than to "yes, I did". Use it to confirm information, not to accept an invitation.'
  },
  {
    id: 'yn-accept',
    title: 'Accepter, donner son accord',
    titleEn: 'Accepting, agreeing',
    body:
      'Pour dire « oui, d\'accord », on a plusieurs choix selon le registre :\n  • 好 (hǎo) — le plus courant, « bien, OK »\n  • 可以 (kě yǐ) — « c\'est possible, ça marche »\n  • 行 (xíng) — « ça va, ça roule » (plus informel)',
    bodyEn:
      'To say "yes, OK", several choices depending on register:\n  • 好 (hǎo) — most common, "fine, OK"\n  • 可以 (kě yǐ) — "possible, that works"\n  • 行 (xíng) — "that\'s fine, cool" (more casual)',
    items: [
      { hanzi: '好', pinyin: 'hǎo', meaning: 'bien, d\'accord', meaningEn: 'good, OK', audio: 'audio/hsk1/hsk1_好.wav' },
      { hanzi: '可以', pinyin: 'kě yǐ', meaning: 'pouvoir, c\'est possible', meaningEn: 'can, it\'s possible', audio: 'audio/hsk1/hsk1_可以.wav' },
      { hanzi: '行', pinyin: 'xíng', meaning: 'ça marche, ça va', meaningEn: 'OK, that works', audio: 'audio/hsk1/hsk1_行.wav' }
    ],
    tip:
      'Le 不 devant un autre mot change de ton selon le mot qui suit. Devant un 4e ton (不是 bú shì), il devient 2e ton. Devant les autres tons, il reste 4e ton (不去 bù qù).',
    tipEn:
      '不 changes tone depending on what follows. Before a 4th-tone syllable (不是 bú shì), it becomes 2nd tone. Elsewhere it stays 4th tone (不去 bù qù).'
  }
];

// ---------------------------------------------------------------------------
// Leçon 6 — Nombres 1-10 (phrases-6-numbers-1-10)
// ---------------------------------------------------------------------------

export const numbersLearnSections: LessonV2LearnSection[] = [
  {
    id: 'num-1-5',
    title: 'De 1 à 5',
    titleEn: 'From 1 to 5',
    body:
      'Les chiffres chinois sont des caractères simples, à connaître par cœur. Chaque chiffre a un ton précis : attention particulière à 一 (yī, 1er ton) et 五 (wǔ, 3e ton).',
    bodyEn:
      'Chinese numbers are simple characters to memorize. Each digit has a specific tone: pay attention to 一 (yī, 1st tone) and 五 (wǔ, 3rd tone).',
    items: [
      { hanzi: '一', pinyin: 'yī', meaning: 'un, 1', meaningEn: 'one, 1', audio: 'audio/hsk1/hsk1_一.wav' },
      { hanzi: '二', pinyin: 'èr', meaning: 'deux, 2', meaningEn: 'two, 2', audio: 'audio/hsk1/hsk1_二.wav' },
      { hanzi: '三', pinyin: 'sān', meaning: 'trois, 3', meaningEn: 'three, 3', audio: 'audio/hsk1/hsk1_三.wav' },
      { hanzi: '四', pinyin: 'sì', meaning: 'quatre, 4', meaningEn: 'four, 4', audio: 'audio/hsk1/hsk1_四.wav' },
      { hanzi: '五', pinyin: 'wǔ', meaning: 'cinq, 5', meaningEn: 'five, 5', audio: 'audio/hsk1/hsk1_五.wav' }
    ],
    tip:
      '一 (yī) change de ton en contexte : devant un 4e ton, il passe au 2e (一个 yí gè). Devant les autres tons, il passe au 4e (一天 yì tiān). Seul ou à la fin, il reste au 1er ton.',
    tipEn:
      '一 (yī) shifts tone in context: before a 4th tone it becomes 2nd (一个 yí gè). Before other tones it becomes 4th (一天 yì tiān). Alone or at the end, it stays 1st.'
  },
  {
    id: 'num-6-10',
    title: 'De 6 à 10',
    titleEn: 'From 6 to 10',
    body:
      'Après le 5, on continue de 六 à 十. Le 十 est particulièrement utile : il sert à former tous les nombres jusqu\'à 99.',
    bodyEn:
      'After 5, continue from 六 to 十. 十 is especially useful: it builds every number up to 99.',
    items: [
      { hanzi: '六', pinyin: 'liù', meaning: 'six, 6', meaningEn: 'six, 6', audio: 'audio/hsk1/hsk1_六.wav' },
      { hanzi: '七', pinyin: 'qī', meaning: 'sept, 7', meaningEn: 'seven, 7', audio: 'audio/hsk1/hsk1_七.wav' },
      { hanzi: '八', pinyin: 'bā', meaning: 'huit, 8', meaningEn: 'eight, 8', audio: 'audio/hsk1/hsk1_八.wav' },
      { hanzi: '九', pinyin: 'jiǔ', meaning: 'neuf, 9', meaningEn: 'nine, 9', audio: 'audio/hsk1/hsk1_九.wav' },
      { hanzi: '十', pinyin: 'shí', meaning: 'dix, 10', meaningEn: 'ten, 10', audio: 'audio/hsk1/hsk1_十.wav' }
    ],
    tip:
      'Pour 11 à 19 : 十 + chiffre (十一 = 11, 十五 = 15). Pour 20 à 99 : chiffre + 十 + chiffre (二十五 = 25). Logique et régulier, contrairement au français « quatre-vingt-dix-neuf ».',
    tipEn:
      'For 11–19: 十 + digit (十一 = 11, 十五 = 15). For 20–99: digit + 十 + digit (二十五 = 25). Logical and regular, unlike French "quatre-vingt-dix-neuf".'
  },
  {
    id: 'num-special',
    title: 'Zéro et grandes dizaines',
    titleEn: 'Zero and larger tens',
    body:
      'Le zéro se dit 零 (líng) et s\'écrit sous une forme simplifiée 〇 quand on écrit à la main.\n百 (bǎi) = cent, 千 (qiān) = mille. La progression est puissance de 10 comme en français, mais avec une rupture à partir de 10 000 (万 wàn).',
    bodyEn:
      'Zero is 零 (líng), often handwritten as 〇.\n百 (bǎi) = hundred, 千 (qiān) = thousand. The system follows powers of 10 like English, but breaks at 10,000 (万 wàn).',
    items: [
      { hanzi: '零', pinyin: 'líng', meaning: 'zéro, 0', meaningEn: 'zero, 0', audio: 'audio/hsk1/hsk1_零.wav' },
      { hanzi: '百', pinyin: 'bǎi', meaning: 'cent, 100', meaningEn: 'hundred, 100', audio: 'audio/hsk1/hsk1_百.wav' },
      { hanzi: '千', pinyin: 'qiān', meaning: 'mille, 1000', meaningEn: 'thousand, 1000', audio: 'audio/hsk1/hsk1_千.wav' }
    ],
    tip:
      'Dans un numéro de téléphone, on prononce chaque chiffre un par un. Pour 1 dans une séquence de chiffres, on préfère 幺 (yāo) à 一 pour éviter la confusion avec 七.',
    tipEn:
      'In a phone number, each digit is read individually. For "1" in a digit sequence, 幺 (yāo) replaces 一 to avoid confusion with 七 (seven).'
  }
];

// ---------------------------------------------------------------------------
// Leçon 7 — Heure et temps (phrases-7-time)
// ---------------------------------------------------------------------------

export const timeLearnSections: LessonV2LearnSection[] = [
  {
    id: 'time-now',
    title: 'Situer dans le temps',
    titleEn: 'Time reference points',
    body:
      'Trois mots pour se repérer : 现在 (xiàn zài) = maintenant, 今天 (jīn tiān) = aujourd\'hui, 明天 (míng tiān) = demain, 昨天 (zuó tiān) = hier.\nPoint clé : ces mots se placent au début de la phrase, pas à la fin comme en français. 我今天去北京 = « je vais à Pékin aujourd\'hui ».',
    bodyEn:
      'Four core reference words: 现在 (xiàn zài) = now, 今天 (jīn tiān) = today, 明天 (míng tiān) = tomorrow, 昨天 (zuó tiān) = yesterday.\nKey point: these words go at the start of the sentence, not the end like in English. 我今天去北京 = "I am going to Beijing today".',
    items: [
      { hanzi: '现在', pinyin: 'xiàn zài', meaning: 'maintenant', meaningEn: 'now', audio: 'audio/hsk1/hsk1_现在.wav' },
      { hanzi: '今天', pinyin: 'jīn tiān', meaning: 'aujourd\'hui', meaningEn: 'today', audio: 'audio/hsk1/hsk1_今天.wav' },
      { hanzi: '明天', pinyin: 'míng tiān', meaning: 'demain', meaningEn: 'tomorrow', audio: 'audio/hsk1/hsk1_明天.wav' },
      { hanzi: '昨天', pinyin: 'zuó tiān', meaning: 'hier', meaningEn: 'yesterday', audio: 'audio/hsk1/hsk1_昨天.wav' }
    ],
    tip:
      'Pas de conjugaison en chinois : c\'est 昨天/今天/明天 qui dit si l\'action est passée, présente ou future. Le verbe, lui, ne change jamais.',
    tipEn:
      'No conjugation in Chinese: 昨天/今天/明天 carry the time reference. The verb itself never changes.'
  },
  {
    id: 'time-day',
    title: 'Les moments de la journée',
    titleEn: 'Parts of the day',
    body:
      'Le chinois découpe la journée en blocs précis. Ces blocs se combinent avec 今天/明天 pour être encore plus précis : 今天下午 (cet après-midi), 明天上午 (demain matin).',
    bodyEn:
      'Chinese splits the day into distinct blocks. Combine them with 今天/明天 for precision: 今天下午 (this afternoon), 明天上午 (tomorrow morning).',
    items: [
      { hanzi: '早上', pinyin: 'zǎo shàng', meaning: 'tôt le matin', meaningEn: 'early morning', audio: 'audio/hsk1/hsk1_早上.wav' },
      { hanzi: '上午', pinyin: 'shàng wǔ', meaning: 'matinée', meaningEn: 'late morning', audio: 'audio/hsk1/hsk1_上午.wav' },
      { hanzi: '中午', pinyin: 'zhōng wǔ', meaning: 'midi', meaningEn: 'noon', audio: 'audio/hsk1/hsk1_中午.wav' },
      { hanzi: '下午', pinyin: 'xià wǔ', meaning: 'après-midi', meaningEn: 'afternoon', audio: 'audio/hsk1/hsk1_下午.wav' },
      { hanzi: '晚上', pinyin: 'wǎn shàng', meaning: 'soir', meaningEn: 'evening', audio: 'audio/hsk1/hsk1_晚上.wav' }
    ],
    tip:
      'Attention : 早上 couvre le tout tôt le matin (6-9h), 上午 plutôt 9h-midi. Après midi, 中午 court jusqu\'à 14h environ, puis 下午, puis 晚上.',
    tipEn:
      'Watch out: 早上 covers early morning (6-9 AM), 上午 roughly 9-noon. Afternoon 中午 runs to about 2 PM, then 下午, then 晚上.'
  },
  {
    id: 'time-hours',
    title: 'Donner l\'heure',
    titleEn: 'Telling the time',
    body:
      'L\'heure se construit chiffre + 点 (diǎn = heure) + chiffre + 分 (fēn = minute). Exemple : 三点十五分 (sān diǎn shí wǔ fēn) = 3h15.\nPour demander : 现在几点 ? (xiàn zài jǐ diǎn) — « il est quelle heure ? ».',
    bodyEn:
      'Time is built digit + 点 (diǎn = o\'clock) + digit + 分 (fēn = minute). Example: 三点十五分 (sān diǎn shí wǔ fēn) = 3:15.\nTo ask: 现在几点? (xiàn zài jǐ diǎn) — "what time is it?".',
    items: [
      { hanzi: '点', pinyin: 'diǎn', meaning: 'heure (pour les heures pleines)', meaningEn: 'o\'clock', audio: 'audio/hsk1/hsk1_点.wav' },
      { hanzi: '分', pinyin: 'fēn', meaning: 'minute', meaningEn: 'minute', audio: 'audio/hsk1/hsk1_分.wav' },
      { hanzi: '小时', pinyin: 'xiǎo shí', meaning: 'heure (durée)', meaningEn: 'hour (duration)', audio: 'audio/hsk1/hsk1_小时.wav' },
      { hanzi: '星期', pinyin: 'xīng qī', meaning: 'semaine', meaningEn: 'week', audio: 'audio/hsk1/hsk1_星期.wav' }
    ],
    tip:
      'Différence importante : 点 = heure à laquelle (2 点 = 2 heures), 小时 = durée en heures (2 小时 = 2 heures d\'affilée). Les deux ne sont pas interchangeables.',
    tipEn:
      'Important distinction: 点 = what time it is (2 点 = 2 o\'clock), 小时 = duration in hours (2 小时 = for 2 hours). Not interchangeable.'
  }
];

// ---------------------------------------------------------------------------
// Leçon 8 — Famille proche (phrases-8-family)
// ---------------------------------------------------------------------------

export const familyLearnSections: LessonV2LearnSection[] = [
  {
    id: 'fam-parents',
    title: 'Les parents',
    titleEn: 'Parents',
    body:
      '爸爸 (bà ba) = papa, 妈妈 (mā ma) = maman — les deux mots les plus doux du chinois, avec leur répétition affective. Pour une forme plus formelle, on dit 父亲 (fù qīn) et 母亲 (mǔ qīn).',
    bodyEn:
      '爸爸 (bà ba) = dad, 妈妈 (mā ma) = mom — the sweetest words in Chinese, with their affectionate reduplication. For a formal register, say 父亲 (fù qīn) and 母亲 (mǔ qīn).',
    items: [
      { hanzi: '爸爸', pinyin: 'bà ba', meaning: 'papa', meaningEn: 'dad', audio: 'audio/hsk1/hsk1_爸爸.wav' },
      { hanzi: '妈妈', pinyin: 'mā ma', meaning: 'maman', meaningEn: 'mom', audio: 'audio/hsk1/hsk1_妈妈.wav' },
      { hanzi: '家', pinyin: 'jiā', meaning: 'famille, foyer', meaningEn: 'family, home', audio: 'audio/hsk1/hsk1_家.wav' }
    ],
    tip:
      'La répétition (爸爸, 妈妈, 哥哥…) marque l\'affection et l\'oral courant. Les formes simples 父, 母 existent aussi mais sont surtout littéraires ou administratives.',
    tipEn:
      'The reduplication (爸爸, 妈妈, 哥哥…) marks affection and spoken usage. The single forms 父, 母 exist but are mostly literary or formal.'
  },
  {
    id: 'fam-siblings',
    title: 'Frères et sœurs',
    titleEn: 'Siblings',
    body:
      'Le chinois distingue toujours aîné et cadet pour les frères et sœurs. 哥哥 = grand frère, 弟弟 = petit frère, 姐姐 = grande sœur, 妹妹 = petite sœur.\nImpossible de dire juste « frère » sans préciser l\'ordre — l\'âge relatif est crucial dans la famille chinoise.',
    bodyEn:
      'Chinese always distinguishes older vs. younger siblings. 哥哥 = older brother, 弟弟 = younger brother, 姐姐 = older sister, 妹妹 = younger sister.\nThere\'s no way to say just "brother" without ranking — relative age is central in a Chinese family.',
    items: [
      { hanzi: '哥哥', pinyin: 'gē ge', meaning: 'grand frère', meaningEn: 'older brother', audio: 'audio/hsk1/hsk1_哥哥.wav' },
      { hanzi: '弟弟', pinyin: 'dì di', meaning: 'petit frère', meaningEn: 'younger brother', audio: 'audio/hsk1/hsk1_弟弟.wav' },
      { hanzi: '姐姐', pinyin: 'jiě jie', meaning: 'grande sœur', meaningEn: 'older sister', audio: 'audio/hsk1/hsk1_姐姐.wav' },
      { hanzi: '妹妹', pinyin: 'mèi mei', meaning: 'petite sœur', meaningEn: 'younger sister', audio: 'audio/hsk1/hsk1_妹妹.wav' }
    ],
    tip:
      'Par extension, on appelle 姐姐 (jiě jie) une femme un peu plus âgée qu\'on apprécie, même sans lien familial. Pareil pour 哥哥 avec un homme.',
    tipEn:
      'By extension, 姐姐 (jiě jie) is used for a slightly older woman you like, even without family ties. Same with 哥哥 for a man.'
  },
  {
    id: 'fam-kids',
    title: 'Enfants et conjoint',
    titleEn: 'Children and spouse',
    body:
      'Pour parler de ses enfants : 儿子 (ér zi) = fils, 女儿 (nǚ ér) = fille, 孩子 (hái zi) = enfant (terme général).\nPour le conjoint, formel : 丈夫 (zhàng fu) = mari, 妻子 (qī zi) = épouse. Familier : 老公, 老婆 (très utilisés à l\'oral).',
    bodyEn:
      'For your children: 儿子 (ér zi) = son, 女儿 (nǚ ér) = daughter, 孩子 (hái zi) = child (generic).\nFor a spouse, formal: 丈夫 (zhàng fu) = husband, 妻子 (qī zi) = wife. Casual: 老公, 老婆 (very common in speech).',
    items: [
      { hanzi: '儿子', pinyin: 'ér zi', meaning: 'fils', meaningEn: 'son', audio: 'audio/hsk1/hsk1_儿子.wav' },
      { hanzi: '女儿', pinyin: 'nǚ ér', meaning: 'fille (enfant)', meaningEn: 'daughter', audio: 'audio/hsk1/hsk1_女儿.wav' },
      { hanzi: '孩子', pinyin: 'hái zi', meaning: 'enfant', meaningEn: 'child', audio: 'audio/hsk1/hsk1_孩子.wav' },
      { hanzi: '丈夫', pinyin: 'zhàng fu', meaning: 'mari', meaningEn: 'husband', audio: 'audio/hsk1/hsk1_丈夫.wav' },
      { hanzi: '妻子', pinyin: 'qī zi', meaning: 'épouse', meaningEn: 'wife', audio: 'audio/hsk1/hsk1_妻子.wav' }
    ],
    tip:
      '« Avez-vous des enfants ? » se demande avec 你有孩子吗 ? (nǐ yǒu hái zi ma). Réponse typique : 有两个 (j\'en ai deux) ou 没有 (je n\'en ai pas).',
    tipEn:
      '"Do you have children?" is asked 你有孩子吗? (nǐ yǒu hái zi ma). Typical answers: 有两个 (I have two) or 没有 (I don\'t have any).'
  }
];

// ---------------------------------------------------------------------------
// Leçon 9 — Nourriture et boissons (phrases-9-food-drinks)
// ---------------------------------------------------------------------------

export const foodDrinksLearnSections: LessonV2LearnSection[] = [
  {
    id: 'food-verbs',
    title: 'Manger et boire',
    titleEn: 'Eating and drinking',
    body:
      'Deux verbes de base bien distincts : 吃 (chī) = manger, 喝 (hē) = boire. Aucun mot générique pour « consommer » — on choisit l\'un ou l\'autre selon la consistance.\nExemples : 吃饭 (« manger un repas »), 喝水 (« boire de l\'eau »).',
    bodyEn:
      'Two clearly distinct verbs: 吃 (chī) = to eat, 喝 (hē) = to drink. No umbrella verb for "consume" — you pick based on the consistency.\nExamples: 吃饭 ("eat a meal"), 喝水 ("drink water").',
    items: [
      { hanzi: '吃', pinyin: 'chī', meaning: 'manger', meaningEn: 'to eat', audio: 'audio/hsk1/hsk1_吃.wav' },
      { hanzi: '喝', pinyin: 'hē', meaning: 'boire', meaningEn: 'to drink', audio: 'audio/hsk1/hsk1_喝.wav' },
      { hanzi: '饭', pinyin: 'fàn', meaning: 'repas, riz cuit', meaningEn: 'meal, cooked rice', audio: 'audio/hsk1/hsk1_饭.wav' }
    ],
    tip:
      '吃饭 signifie plus généralement « prendre un repas », pas seulement « manger du riz ». 你吃饭了吗 ? (« tu as mangé ? ») est la phrase de politesse la plus courante à midi et le soir.',
    tipEn:
      '吃饭 means more broadly "to have a meal", not only "to eat rice". 你吃饭了吗? ("have you eaten?") is the most common polite phrase at lunch or dinner.'
  },
  {
    id: 'food-drinks',
    title: 'Les boissons de base',
    titleEn: 'Basic drinks',
    body:
      '水 (shuǐ) = eau, 茶 (chá) = thé, 咖啡 (kā fēi) = café, 牛奶 (niú nǎi) = lait.\n茶 est une valeur sûre en Chine : l\'eau chaude servie gratuitement dans les restaurants est presque toujours du thé de base.',
    bodyEn:
      '水 (shuǐ) = water, 茶 (chá) = tea, 咖啡 (kā fēi) = coffee, 牛奶 (niú nǎi) = milk.\n茶 is a safe bet in China: the hot water freely served in restaurants is almost always basic tea.',
    items: [
      { hanzi: '水', pinyin: 'shuǐ', meaning: 'eau', meaningEn: 'water', audio: 'audio/hsk1/hsk1_水.wav' },
      { hanzi: '茶', pinyin: 'chá', meaning: 'thé', meaningEn: 'tea', audio: 'audio/hsk1/hsk1_茶.wav' },
      { hanzi: '咖啡', pinyin: 'kā fēi', meaning: 'café', meaningEn: 'coffee', audio: 'audio/hsk1/hsk1_咖啡.wav' },
      { hanzi: '牛奶', pinyin: 'niú nǎi', meaning: 'lait', meaningEn: 'milk', audio: 'audio/hsk1/hsk1_牛奶.wav' }
    ],
    tip:
      'En Chine, l\'eau à boire est généralement chaude ou tiède, pas glacée. Si tu veux de l\'eau froide, précise 冰水 (bīng shuǐ). Dire simplement 我要水 te donnera probablement de l\'eau chaude.',
    tipEn:
      'In China, drinking water is usually hot or lukewarm, not iced. For cold water say 冰水 (bīng shuǐ). A plain 我要水 will likely get you hot water.'
  },
  {
    id: 'food-basics',
    title: 'Au restaurant',
    titleEn: 'At the restaurant',
    body:
      '菜 (cài) = plat, légume. 米饭 (mǐ fàn) = riz cuit servi en accompagnement. 苹果 (píng guǒ) = pomme.\nPour commander, une seule structure : 我要 + [plat] (« je veux… »), ou 我要吃 + [plat] (« je veux manger… »).',
    bodyEn:
      '菜 (cài) = dish, vegetable. 米饭 (mǐ fàn) = cooked rice as a side. 苹果 (píng guǒ) = apple.\nTo order, one pattern: 我要 + [item] ("I want…"), or 我要吃 + [dish] ("I want to eat…").',
    items: [
      { hanzi: '菜', pinyin: 'cài', meaning: 'plat, légume', meaningEn: 'dish, vegetable', audio: 'audio/hsk1/hsk1_菜.wav' },
      { hanzi: '米饭', pinyin: 'mǐ fàn', meaning: 'riz cuit', meaningEn: 'cooked rice', audio: 'audio/hsk1/hsk1_米饭.wav' },
      { hanzi: '苹果', pinyin: 'píng guǒ', meaning: 'pomme', meaningEn: 'apple', audio: 'audio/hsk1/hsk1_苹果.wav' },
      { hanzi: '喜欢', pinyin: 'xǐ huan', meaning: 'aimer (apprécier)', meaningEn: 'to like', audio: 'audio/hsk1/hsk1_喜欢.wav' }
    ],
    tip:
      '菜 est à la fois « légume » et « plat » au restaurant. Une 菜单 (cài dān) est un menu, un 点菜 (diǎn cài) c\'est le fait de choisir ses plats. Le contexte tranche toujours.',
    tipEn:
      '菜 means both "vegetable" and "dish" in restaurants. A 菜单 (cài dān) is a menu; 点菜 (diǎn cài) is choosing your dishes. Context always disambiguates.'
  }
];

// ---------------------------------------------------------------------------
// Leçon 10 — Vouloir et avoir besoin (phrases-10-wants-needs)
// ---------------------------------------------------------------------------

export const wantsNeedsLearnSections: LessonV2LearnSection[] = [
  {
    id: 'want-yao',
    title: 'Vouloir concret : 要',
    titleEn: 'Concrete wanting: 要',
    body:
      '要 (yào) exprime un désir concret, proche de « je veux, je vais prendre ». On l\'utilise au restaurant, au magasin, pour des besoins directs.\nConstruction : 我要 + [objet] / [verbe]. Exemples : 我要水 (« je veux de l\'eau »), 我要去北京 (« je vais à Pékin »).',
    bodyEn:
      '要 (yào) expresses a concrete wish, close to "I want, I\'ll take". Used at restaurants, shops, for direct needs.\nPattern: 我要 + [object] / [verb]. Examples: 我要水 ("I want water"), 我要去北京 ("I am going to Beijing").',
    items: [
      { hanzi: '要', pinyin: 'yào', meaning: 'vouloir, avoir besoin', meaningEn: 'to want, to need', audio: 'audio/hsk1/hsk1_要.wav' }
    ],
    tip:
      '要 + verbe peut aussi vouloir dire « aller bientôt » : 我要走了 = « je vais y aller » (proche futur). Le contexte indique s\'il s\'agit d\'un souhait ou d\'un plan.',
    tipEn:
      '要 + verb can also mean "going to soon": 我要走了 = "I\'m about to leave" (near future). Context shows whether it\'s a wish or a plan.'
  },
  {
    id: 'want-xiang',
    title: 'Vouloir moins ferme : 想',
    titleEn: 'Softer wanting: 想',
    body:
      '想 (xiǎng) est plus nuancé : « avoir envie, souhaiter, penser ». On s\'en sert quand le désir n\'est pas ferme, ou quand on parle de projets lointains.\nLa différence avec 要 est subtile mais importante : 我要吃面 = « je vais prendre des nouilles (décision). » 我想吃面 = « j\'aurais envie de nouilles (idée). »',
    bodyEn:
      '想 (xiǎng) is more nuanced: "to feel like, to wish, to think". Used when the want is softer, or for distant plans.\nThe difference with 要 is subtle but important: 我要吃面 = "I\'ll have noodles (decision)." 我想吃面 = "I feel like noodles (idea)."',
    items: [
      { hanzi: '想', pinyin: 'xiǎng', meaning: 'vouloir, penser, manquer', meaningEn: 'to want, think, miss', audio: 'audio/hsk1/hsk1_想.wav' }
    ],
    tip:
      '想 a aussi le sens émotionnel de « manquer à quelqu\'un ». 我想你 ne veut pas dire « je te veux » mais « tu me manques » — à éviter avec des étrangers au risque du malentendu.',
    tipEn:
      '想 also has the emotional meaning "to miss someone". 我想你 does not mean "I want you" but "I miss you" — avoid with strangers to prevent misunderstandings.'
  },
  {
    id: 'have-you',
    title: 'Avoir et ne pas avoir',
    titleEn: 'Having and not having',
    body:
      '有 (yǒu) = « avoir, il y a ». C\'est le seul verbe chinois dont la négation ne se fait PAS avec 不, mais avec 没 : 没有 (méi yǒu) = « ne pas avoir, il n\'y a pas ».\nExemples : 我有一只猫 (j\'ai un chat), 我没有钱 (je n\'ai pas d\'argent).',
    bodyEn:
      '有 (yǒu) = "to have, there is". It is the only Chinese verb whose negation is NOT with 不 but with 没: 没有 (méi yǒu) = "not to have, there isn\'t".\nExamples: 我有一只猫 (I have a cat), 我没有钱 (I don\'t have money).',
    items: [
      { hanzi: '有', pinyin: 'yǒu', meaning: 'avoir, il y a', meaningEn: 'to have, there is', audio: 'audio/hsk1/hsk1_有.wav' },
      { hanzi: '没有', pinyin: 'méi yǒu', meaning: 'ne pas avoir', meaningEn: 'not to have', audio: 'audio/hsk1/hsk1_没有.wav' },
      { hanzi: '没', pinyin: 'méi', meaning: 'ne pas (verbes d\'état / passé)', meaningEn: 'not (for 有 and past)', audio: 'audio/hsk1/hsk1_没.wav' }
    ],
    tip:
      'Règle simple à retenir : 没 uniquement pour 有 et pour nier le passé (我没去 = je n\'y suis pas allé). Pour tout le reste, c\'est 不 (我不去 = je n\'y vais pas).',
    tipEn:
      'Easy rule: 没 is only for 有 and for negating the past (我没去 = I didn\'t go). For everything else, use 不 (我不去 = I\'m not going).'
  }
];

// ---------------------------------------------------------------------------
// Leçon 11 — Verbes courants (phrases-11-common-verbs)
// ---------------------------------------------------------------------------

export const commonVerbsLearnSections: LessonV2LearnSection[] = [
  {
    id: 'verb-motion',
    title: 'Aller et venir',
    titleEn: 'Going and coming',
    body:
      'Deux verbes de mouvement incontournables : 去 (qù) = aller, partir (direction qui s\'éloigne), 来 (lái) = venir, arriver (direction qui se rapproche).\nLe point de référence est toujours celui qui parle. 来我家 = « viens chez moi » (je suis chez moi). 去他家 = « va chez lui » (je ne suis pas chez lui).',
    bodyEn:
      'Two essential motion verbs: 去 (qù) = to go, leave (moving away), 来 (lái) = to come, arrive (moving toward).\nThe reference point is always the speaker. 来我家 = "come to my place" (I\'m there). 去他家 = "go to his place" (I\'m not there).',
    items: [
      { hanzi: '去', pinyin: 'qù', meaning: 'aller, partir', meaningEn: 'to go, leave', audio: 'audio/hsk1/hsk1_去.wav' },
      { hanzi: '来', pinyin: 'lái', meaning: 'venir, arriver', meaningEn: 'to come', audio: 'audio/hsk1/hsk1_来.wav' },
      { hanzi: '回', pinyin: 'huí', meaning: 'rentrer, retourner', meaningEn: 'to return', audio: 'audio/hsk1/hsk1_回.wav' }
    ],
    tip:
      'Le verbe est invariable : 我去 / 你去 / 他去, tout le monde « 去 ». Pour le temps, on compte sur les marqueurs : 昨天 / 今天 / 明天. En revanche, 了 après un verbe marque l\'accomplissement (我去了 = je suis allé).',
    tipEn:
      'The verb never changes: 我去 / 你去 / 他去. Time is set by markers: 昨天 / 今天 / 明天. But 了 after a verb marks completion (我去了 = I went).'
  },
  {
    id: 'verb-senses',
    title: 'Voir, parler, écouter',
    titleEn: 'Seeing, speaking, listening',
    body:
      'Trois verbes de base pour les sens et la communication.\n看 (kàn) = regarder, voir, lire (un livre).\n说 (shuō) = dire, parler.\n听 (tīng) = écouter, entendre.\nOn dit 说中文 (parler chinois), 听音乐 (écouter de la musique), 看书 (lire un livre).',
    bodyEn:
      'Three core verbs for senses and communication.\n看 (kàn) = to look, see, read (a book).\n说 (shuō) = to say, speak.\n听 (tīng) = to listen, hear.\nYou say 说中文 (speak Chinese), 听音乐 (listen to music), 看书 (read a book).',
    items: [
      { hanzi: '看', pinyin: 'kàn', meaning: 'regarder, voir, lire', meaningEn: 'to look, see, read', audio: 'audio/hsk1/hsk1_看.wav' },
      { hanzi: '说', pinyin: 'shuō', meaning: 'dire, parler', meaningEn: 'to say, speak', audio: 'audio/hsk1/hsk1_说.wav' },
      { hanzi: '听', pinyin: 'tīng', meaning: 'écouter, entendre', meaningEn: 'to listen, hear', audio: 'audio/hsk1/hsk1_听.wav' },
      { hanzi: '读', pinyin: 'dú', meaning: 'lire (à voix haute)', meaningEn: 'to read aloud', audio: 'audio/hsk1/hsk1_读.wav' }
    ],
    tip:
      '看 et 读 tous deux traduits par « lire » : 看 = lire silencieusement, pour soi ; 读 = lire à voix haute ou étudier. Un élève 读 son cours, un adulte 看 un roman.',
    tipEn:
      '看 and 读 both translate as "read": 看 = read silently to oneself; 读 = read aloud or study. A student 读s a lesson, an adult 看s a novel.'
  },
  {
    id: 'verb-action',
    title: 'Faire, écrire, ouvrir',
    titleEn: 'Doing, writing, opening',
    body:
      'Un petit lot d\'actions très quotidiennes : 做 (zuò) = faire, 写 (xiě) = écrire, 开 (kāi) = ouvrir, démarrer, 关 (guān) = fermer.\n做 est extrêmement productif : 做饭 (cuisiner, « faire un repas »), 做作业 (faire les devoirs), 做工作 (faire un travail).',
    bodyEn:
      'A handful of daily actions: 做 (zuò) = to do, 写 (xiě) = to write, 开 (kāi) = to open, start, 关 (guān) = to close.\n做 is extremely productive: 做饭 (to cook, "make a meal"), 做作业 (do homework), 做工作 (do work).',
    items: [
      { hanzi: '做', pinyin: 'zuò', meaning: 'faire', meaningEn: 'to do, make', audio: 'audio/hsk1/hsk1_做.wav' },
      { hanzi: '写', pinyin: 'xiě', meaning: 'écrire', meaningEn: 'to write', audio: 'audio/hsk1/hsk1_写.wav' },
      { hanzi: '开', pinyin: 'kāi', meaning: 'ouvrir, démarrer', meaningEn: 'to open, start', audio: 'audio/hsk1/hsk1_开.wav' },
      { hanzi: '关', pinyin: 'guān', meaning: 'fermer, éteindre', meaningEn: 'to close, turn off', audio: 'audio/hsk1/hsk1_关.wav' }
    ],
    tip:
      '开 / 关 servent aussi pour les appareils : 开电视 = allumer la télé, 关门 = fermer la porte. C\'est le couple « marche / arrêt » universel du chinois.',
    tipEn:
      '开 / 关 also apply to devices: 开电视 = turn on the TV, 关门 = close the door. It is the universal "on / off" pair in Chinese.'
  }
];

// ---------------------------------------------------------------------------
// Leçon 12 — Actions quotidiennes (phrases-12-daily-actions)
// ---------------------------------------------------------------------------

export const dailyActionsLearnSections: LessonV2LearnSection[] = [
  {
    id: 'daily-morning',
    title: 'Le matin',
    titleEn: 'The morning',
    body:
      'La journée commence par deux verbes : 起床 (qǐ chuáng) = se lever, littéralement « se soulever du lit », et 睡觉 (shuì jiào) = dormir, « faire le sommeil ». Les deux sont des verbes composés qu\'on utilise tels quels.\nExemples : 我七点起床 (je me lève à 7h), 我十一点睡觉 (je dors à 23h).',
    bodyEn:
      'The day starts with two verbs: 起床 (qǐ chuáng) = to get up, literally "rise from the bed", and 睡觉 (shuì jiào) = to sleep, "do the sleeping". Both are compound verbs used as single units.\nExamples: 我七点起床 (I get up at 7), 我十一点睡觉 (I sleep at 11 PM).',
    items: [
      { hanzi: '起床', pinyin: 'qǐ chuáng', meaning: 'se lever', meaningEn: 'to get up', audio: 'audio/hsk1/hsk1_起床.wav' },
      { hanzi: '睡觉', pinyin: 'shuì jiào', meaning: 'dormir', meaningEn: 'to sleep', audio: 'audio/hsk1/hsk1_睡觉.wav' }
    ],
    tip:
      '起床 et 睡觉 sont appelés « verbes séparables » : on peut insérer des mots entre les deux syllabes. 睡一个好觉 = « faire un bon sommeil ». Pas besoin de s\'en préoccuper tout de suite — on les apprend d\'abord en bloc.',
    tipEn:
      '起床 and 睡觉 are "separable verbs": words can go between the two syllables. 睡一个好觉 = "have a good sleep". No need to worry about this yet — learn them as a unit first.'
  },
  {
    id: 'daily-work-study',
    title: 'Travailler, étudier',
    titleEn: 'Work, study',
    body:
      '工作 (gōng zuò) = travailler / travail (même mot pour le verbe et le nom). 学习 (xué xí) = étudier, apprendre.\nCes deux mots sont des blocs réutilisables : 我去工作 = « je vais travailler », 我学习中文 = « j\'étudie le chinois ».',
    bodyEn:
      '工作 (gōng zuò) = to work / work (same word for verb and noun). 学习 (xué xí) = to study, learn.\nBoth are reusable blocks: 我去工作 = "I\'m going to work", 我学习中文 = "I\'m studying Chinese".',
    items: [
      { hanzi: '工作', pinyin: 'gōng zuò', meaning: 'travailler, travail', meaningEn: 'to work, job', audio: 'audio/hsk1/hsk1_工作.wav' },
      { hanzi: '学习', pinyin: 'xué xí', meaning: 'étudier, apprendre', meaningEn: 'to study, learn', audio: 'audio/hsk1/hsk1_学习.wav' },
      { hanzi: '老师', pinyin: 'lǎo shī', meaning: 'professeur', meaningEn: 'teacher', audio: 'audio/hsk1/hsk1_老师.wav' }
    ],
    tip:
      'Beaucoup de mots chinois sont à la fois verbe et nom selon la place dans la phrase. 工作 = travailler OU un travail ; 学习 = étudier OU des études. Le contexte (et la grammaire) tranche.',
    tipEn:
      'Many Chinese words are both verb and noun depending on position. 工作 = to work OR a job; 学习 = to study OR studies. Context (and syntax) decides.'
  },
  {
    id: 'daily-transit',
    title: 'Aller au bureau, rentrer',
    titleEn: 'Going to work, coming back',
    body:
      '上 (shàng) et 下 (xià) sont les deux axes du quotidien chinois. 上 = monter, aller à ; 下 = descendre, finir.\nAppliqués à une activité : 上班 = aller au boulot (commencer le travail), 下班 = finir le boulot, 上学 = aller à l\'école, 上课 = commencer un cours.',
    bodyEn:
      '上 (shàng) and 下 (xià) are the two axes of Chinese daily life. 上 = to go up, to attend; 下 = to go down, to finish.\nApplied to an activity: 上班 = go to work, 下班 = leave work, 上学 = go to school, 上课 = start class.',
    items: [
      { hanzi: '上', pinyin: 'shàng', meaning: 'monter, sur, aller à', meaningEn: 'up, on, to go', audio: 'audio/hsk1/hsk1_上.wav' },
      { hanzi: '下', pinyin: 'xià', meaning: 'descendre, sous, finir', meaningEn: 'down, below, to finish', audio: 'audio/hsk1/hsk1_下.wav' },
      { hanzi: '上班', pinyin: 'shàng bān', meaning: 'aller au travail', meaningEn: 'to go to work', audio: 'audio/hsk1/hsk1_上班.wav' },
      { hanzi: '下班', pinyin: 'xià bān', meaning: 'finir le travail', meaningEn: 'to leave work', audio: 'audio/hsk1/hsk1_下班.wav' },
      { hanzi: '上学', pinyin: 'shàng xué', meaning: 'aller à l\'école', meaningEn: 'to go to school', audio: 'audio/hsk1/hsk1_上学.wav' }
    ],
    tip:
      'Tu peux résumer ta journée en une phrase : 我早上八点上班，下午六点下班 = « je commence à 8h, je finis à 18h ». 上 et 下 sont partout — dans les adresses, les transports, les étages.',
    tipEn:
      'Summarize your day in one sentence: 我早上八点上班，下午六点下班 = "I start at 8 AM, I leave at 6 PM". 上 and 下 are everywhere — in addresses, transport, floors.'
  }
];
