/**
 * cecr-b2-1-learn-sections.ts — contenu pédagogique manuel pour les 17 leçons B2.1.
 * Injecté dans cecr-course.ts via `learnSections: ...` sur chaque `LessonModule`.
 *
 * Règle produit : tous les `audio` pointent vers un fichier MP3/WAV pré-généré
 * (Azure Neural TTS — cf. xiaolearn_audio_policy). Convention :
 *   audio/hsk{N}/hsk{N}_{hanzi}.wav  (N = niveau HSK réel du mot)
 */

import type { LessonV2LearnSection } from '../types/lesson-learn';

// ═════════════════════════════════════════════════════════════════════════════
// Grammaire B2.1 — 连…也/都 · 除了…以外 · 不但…而且 · 无论 · 即使 · 虽然/尽管
// ═════════════════════════════════════════════════════════════════════════════

// --- cecr-b21-grammar-lian-m1 — 连 + N + 也/都 (même X) ---------------------
export const b21GrammarLianM1LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b21-lian-n-pattern',
    title: '连 + nom extrême + 也/都 + V',
    titleEn: '连 + extreme noun + 也/都 + V',
    body:
      'Choisis un nom qui surprend : le plus petit, le plus évident, le plus improbable. Règle : place-le entre 连 et 也/都. L\'effet ? L\'interlocuteur comprend que TOUT le reste est concerné a fortiori. 连小孩也知道 = même un enfant sait → donc tout adulte le sait aussi. Astuce : sans 连, tu dis un fait ; avec 连, tu fais un argument.',
    bodyEn:
      'Pick a surprising noun: the smallest, most obvious, most unlikely. Place it between 连 and 也/都. The effect? Your listener gets that EVERYTHING else is concerned a fortiori. 连小孩也知道 = even a child knows → any adult knows too. Without 连 you state a fact; with 连 you build an argument.',
    items: [
      { hanzi: '连小孩也知道', pinyin: 'lián xiǎo hái yě zhī dào', meaning: 'même un enfant le sait', meaningEn: 'even a child knows', audio: 'audio/hsk2/hsk2_小孩.wav' },
      { hanzi: '连我都不相信', pinyin: 'lián wǒ dōu bù xiāng xìn', meaning: 'même moi je n\'y crois pas', meaningEn: 'even I don\'t believe it', audio: 'audio/hsk4/hsk4_相信.wav' },
      { hanzi: '连周末也工作', pinyin: 'lián zhōu mò yě gōng zuò', meaning: 'travailler même le week-end', meaningEn: 'even work on weekends', audio: 'audio/hsk2/hsk2_周末.wav' },
      { hanzi: '连一分钱也没有', pinyin: 'lián yī fēn qián yě méi yǒu', meaning: 'ne pas avoir un seul centime', meaningEn: 'not have a single cent', audio: 'audio/hsk2/hsk2_钱.wav' },
      { hanzi: '连饭也忘了吃', pinyin: 'lián fàn yě wàng le chī', meaning: 'oublier même de manger', meaningEn: 'even forgot to eat', audio: 'audio/hsk3/hsk3_忘.wav' }
    ],
    tip:
      '也 et 都 sont interchangeables dans cette structure. Préfère 都 quand le sujet est pluriel ou exhaustif, 也 pour souligner un cas isolé.',
    tipEn:
      '也 and 都 are interchangeable here. Prefer 都 with plural / exhaustive subjects, 也 to highlight an isolated case.'
  },
  {
    id: 'b21-lian-n-minimal',
    title: 'Poussée à l\'extrême : 连一 + spécificatif + N + 也/都 + 没/不',
    titleEn: 'Pushed to the extreme: 连一 + measure + N + 也/都 + 没/不',
    body:
      'Quand le nom est réduit à « un seul X », la phrase devient une négation absolue. 连一个朋友也没有 = il n\'a même pas un seul ami. 连一分钟也不想等 = je ne veux pas attendre une seule minute. RÈGLE D\'OR : 连 + 一 + spécificatif + N + 也/都 + NÉGATION + V. Attention : le 一 est obligatoire — sans lui, la force rhétorique disparaît. Construction très fréquente dans les dialogues intenses ou les plaidoiries.',
    bodyEn:
      'When the noun shrinks to "one single X", the sentence becomes an absolute negation. 连一个朋友也没有 = he doesn\'t have a single friend. 连一分钟也不想等 = I don\'t want to wait a single minute. Formula: 连 + 一 + measure + N + 也/都 + NEGATION + V. The 一 is mandatory — without it, the rhetorical punch vanishes.',
    items: [
      { hanzi: '连一个', pinyin: 'lián yī gè', meaning: 'pas même un seul', meaningEn: 'not even one', audio: 'audio/hsk1/hsk1_一.wav' },
      { hanzi: '连一分钟', pinyin: 'lián yī fēn zhōng', meaning: 'pas même une minute', meaningEn: 'not even a minute', audio: 'audio/hsk1/hsk1_分钟.wav' },
      { hanzi: '连一点', pinyin: 'lián yī diǎn', meaning: 'pas même un peu', meaningEn: 'not even a bit', audio: 'audio/hsk1/hsk1_一点.wav' },
      { hanzi: '连一句话也没说', pinyin: 'lián yī jù huà yě méi shuō', meaning: 'ne pas avoir dit un seul mot', meaningEn: 'did not say a single word', audio: 'audio/hsk2/hsk2_话.wav' },
      { hanzi: '连一次机会都不给', pinyin: 'lián yī cì jī huì dōu bù gěi', meaning: 'ne pas donner une seule chance', meaningEn: 'not give a single chance', audio: 'audio/hsk3/hsk3_机会.wav' }
    ],
    tip:
      'À l\'examen HSK 5, cette construction est un classique. Mémorise le squelette 连 + 一 + MW + N + 也/都 + 没/不 + V comme un seul bloc — en autopilot.',
    tipEn:
      'On HSK 5 exams, this structure is a classic. Memorize the skeleton 连 + 一 + MW + N + 也/都 + 没/不 + V as one block — on autopilot.'
  }
];

// --- cecr-b21-grammar-lian-m2 — 连 + V + 也/都 + 不/没 + V -------------------
export const b21GrammarLianM2LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b21-lian-verb-repeat',
    title: 'Répéter le verbe autour de 也/都',
    titleEn: 'Repeating the verb around 也/都',
    body:
      'Règle : S + 连 + V + 也/都 + 不/没 + V (+ complément). Le verbe apparaît deux fois : la première après 连 ressemble à une affirmation, la seconde porte la vraie négation. En français : « même pas + V ». 他连看也没看一眼 = il n\'a même pas jeté un regard. Astuce : très oral, très expressif — parfait pour montrer la surprise ou l\'indignation.',
    bodyEn:
      'Structure: S + 连 + V + 也/都 + 不/没 + V (+ complement). The verb appears twice: first after 连 looks affirmative, second carries the real negation. In English: "not even + V". 他连看也没看一眼 = he didn\'t even glance. Very spoken, very expressive — perfect for surprise or indignation.',
    items: [
      { hanzi: '连看也没看', pinyin: 'lián kàn yě méi kàn', meaning: 'ne même pas regarder', meaningEn: 'not even look', audio: 'audio/hsk1/hsk1_看.wav' },
      { hanzi: '连想也没想过', pinyin: 'lián xiǎng yě méi xiǎng guò', meaning: 'ne même pas y avoir pensé', meaningEn: 'not even thought about it', audio: 'audio/hsk1/hsk1_想.wav' },
      { hanzi: '连说也不说', pinyin: 'lián shuō yě bù shuō', meaning: 'ne pas même en parler', meaningEn: 'not even talk about it', audio: 'audio/hsk1/hsk1_说.wav' },
      { hanzi: '连听都没听说过', pinyin: 'lián tīng dōu méi tīng shuō guò', meaning: 'n\'en avoir jamais entendu parler', meaningEn: 'never even heard of it', audio: 'audio/hsk1/hsk1_听.wav' },
      { hanzi: '一眼', pinyin: 'yī yǎn', meaning: 'un coup d\'œil', meaningEn: 'a glance', audio: 'audio/hsk3/hsk3_眼.wav' }
    ],
    tip:
      'Ne traduis jamais mot-à-mot. La double apparition du verbe est une idiomatie — le français se contente de « même pas ».',
    tipEn:
      'Never translate word-for-word. The doubled verb is an idiom — English just uses "not even".'
  },
  {
    id: 'b21-lian-verb-quantifier',
    title: 'Accentuer avec 一 + spécificatif après le verbe',
    titleEn: 'Boosting with 一 + measure after the verb',
    body:
      'Pour pousser l\'indignation encore plus loin, on ajoute 一 + spécificatif MINIMAL après le verbe nié. 连看也没看一眼 = ne pas même jeter un coup d\'œil. 连喝也没喝一口 = ne pas même prendre une gorgée. 连说也没说一句 = ne pas même prononcer un mot. Règle : le spécificatif choisi dépend du verbe : 一眼 (regards), 一口 (liquides/bouchées), 一句 (paroles), 一声 (bruits/salutations), 一下 (actes courts). Astuce : cette couche additionnelle rend la négation quasi théâtrale — très prisé dans les romans et les podcasts.',
    bodyEn:
      'To push indignation further, add 一 + a MINIMAL measure word after the negated verb. 连看也没看一眼 = didn\'t even glance once. 连喝也没喝一口 = didn\'t even take one sip. 连说也没说一句 = didn\'t even say one sentence. The measure depends on the verb: 一眼 (looks), 一口 (drinks/bites), 一句 (utterances), 一声 (sounds/greetings), 一下 (short acts). This extra layer makes the negation almost theatrical — big in novels and podcasts.',
    items: [
      { hanzi: '一眼', pinyin: 'yī yǎn', meaning: 'un coup d\'œil', meaningEn: 'a glance', audio: 'audio/hsk3/hsk3_眼.wav' },
      { hanzi: '一口', pinyin: 'yī kǒu', meaning: 'une gorgée / bouchée', meaningEn: 'a sip / a bite', audio: 'audio/hsk3/hsk3_口.wav' },
      { hanzi: '一句', pinyin: 'yī jù', meaning: 'une phrase', meaningEn: 'one sentence', audio: 'audio/hsk2/hsk2_句.wav' },
      { hanzi: '一声', pinyin: 'yī shēng', meaning: 'un son / un bonjour', meaningEn: 'one sound / a hello', audio: 'audio/hsk3/hsk3_声.wav' },
      { hanzi: '一下', pinyin: 'yī xià', meaning: 'un bref instant', meaningEn: 'a moment', audio: 'audio/hsk2/hsk2_一下.wav' }
    ],
    tip:
      'Règle de sélection rapide : regarder → 一眼 ; boire/goûter → 一口 ; parler → 一句/一声 ; faire/bouger → 一下. Si tu hésites, 一下 dépanne presque toujours.',
    tipEn:
      'Quick picker: look → 一眼; drink/taste → 一口; speak → 一句/一声; do/move → 一下. If in doubt, 一下 saves the day almost always.'
  }
];

// --- cecr-b21-grammar-lian-m3 — 除了…以外 ------------------------------------
export const b21GrammarLianM3LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b21-chule-two-uses',
    title: '除了…以外 : inclusion OU exclusion',
    titleEn: '除了…以外: inclusion OR exclusion',
    body:
      'RÈGLE D\'OR : tout dépend de la SECONDE partie. Avec 还/也 → inclusion : « à part X, il y a AUSSI Y » (les deux). Avec 都 + négation → exclusion : « à part X, tous » (X est hors). 除了中文以外，我还会英文 → je parle les deux. 除了小王以外，大家都来了 → Xiao Wang est le seul absent. Attention : un changement d\'auxiliaire renverse le sens à 180 degrés.',
    bodyEn:
      'Everything hinges on the SECOND clause. With 还/也 → inclusion: "besides X, ALSO Y" (both). With 都 + negation → exclusion: "apart from X, all" (X is out). 除了中文以外，我还会英文 → I speak both. 除了小王以外，大家都来了 → Xiao Wang is the only absentee. Swapping the auxiliary flips the meaning 180 degrees.',
    items: [
      { hanzi: '除了', pinyin: 'chú le', meaning: 'à part, sauf', meaningEn: 'besides, except', audio: 'audio/hsk4/hsk4_除了.wav' },
      { hanzi: '以外', pinyin: 'yǐ wài', meaning: 'hors de, en dehors', meaningEn: 'outside, apart', audio: 'audio/hsk4/hsk4_以外.wav' },
      { hanzi: '还', pinyin: 'hái', meaning: 'encore, en plus', meaningEn: 'still, also', audio: 'audio/hsk2/hsk2_还.wav' },
      { hanzi: '都', pinyin: 'dōu', meaning: 'tous, tout', meaningEn: 'all', audio: 'audio/hsk1/hsk1_都.wav' },
      { hanzi: '大家', pinyin: 'dà jiā', meaning: 'tout le monde', meaningEn: 'everyone', audio: 'audio/hsk2/hsk2_大家.wav' }
    ],
    tip:
      '以外 s\'omet souvent à l\'oral (除了中文，我还会英文). En B2, garde-le pour bien marquer la structure, notamment à l\'écrit.',
    tipEn:
      '以外 is often dropped in speech (除了中文，我还会英文). At B2, keep it to mark the structure, especially in writing.'
  },
  {
    id: 'b21-chule-variants',
    title: 'Variantes : 除非 (condition), 之外 (écrit)',
    titleEn: 'Variants: 除非 (condition), 之外 (formal)',
    body:
      'Attention : trois cousins à ne pas confondre. **除了…以外** = inclusion / exclusion. **除非 A，否则 B** = « à moins que A, sinon B » — condition exclusive, très utilisée pour les menaces ou ultimatums. 除非你道歉，否则我不去 = à moins que tu ne t\'excuses, je n\'y vais pas. Remarque : **除…之外** = variante écrite/soutenue de 除…以外, préférée dans la presse. 除个别案例之外，方法可行 = hormis quelques cas isolés, la méthode est viable.',
    bodyEn:
      'Three cousins not to confuse. **除了…以外** = inclusion / exclusion. **除非 A，否则 B** = "unless A, otherwise B" — exclusive condition, widely used for ultimatums: 除非你道歉，否则我不去 = unless you apologize, I\'m not going. **除…之外** = written/formal variant of 除…以外, preferred in press: 除个别案例之外，方法可行 = apart from a few isolated cases, the method works.',
    items: [
      { hanzi: '除非', pinyin: 'chú fēi', meaning: 'à moins que', meaningEn: 'unless', audio: 'audio/hsk5/hsk5_除非.wav' },
      { hanzi: '否则', pinyin: 'fǒu zé', meaning: 'sinon', meaningEn: 'otherwise', audio: 'audio/hsk4/hsk4_否则.wav' },
      { hanzi: '之外', pinyin: 'zhī wài', meaning: 'en dehors de (écrit)', meaningEn: 'beyond / apart from (formal)', audio: 'audio/hsk5/hsk5_之外.wav' },
      { hanzi: '道歉', pinyin: 'dào qiàn', meaning: 's\'excuser', meaningEn: 'apologize', audio: 'audio/hsk4/hsk4_道歉.wav' },
      { hanzi: '个别', pinyin: 'gè bié', meaning: 'isolé, spécifique', meaningEn: 'isolated, specific', audio: 'audio/hsk5/hsk5_个别.wav' }
    ],
    tip:
      '除非 se combine souvent avec 才 (et non 就) : 除非你努力，才能成功. On garde l\'idée de condition nécessaire exclusive, cohérente avec le couple 只有…才.',
    tipEn:
      '除非 often pairs with 才 (not 就): 除非你努力，才能成功. It keeps the idea of an exclusive necessary condition, in line with the 只有…才 duo.'
  }
];

// --- cecr-b21-grammar-conj-m1 — 不但…而且 ------------------------------------
export const b21GrammarConjM1LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b21-bu-dan-er-qie',
    title: '不但 A 而且 B — progression positive',
    titleEn: '不但 A 而且 B — positive progression',
    body:
      'La formule classique pour enchaîner deux qualités / deux actions. RÈGLE D\'OR : même sujet → 他不但聪明，而且努力. Exception : sujets différents, le second sujet va APRÈS 而且 — 不但他来，而且他弟弟也来. Remarque : pour plus formel, remplace 不但 par 不仅 (écrit). 而且 peut se remplacer par 并且, 也, 还. Attention : évite d\'empiler 也 ET 而且 dans la même partie.',
    bodyEn:
      'The classic pattern to chain two qualities / two actions. Same subject: 他不但聪明，而且努力. Different subjects: the second subject goes AFTER 而且 — 不但他来，而且他弟弟也来. For more formal, swap 不但 for 不仅 (written). 而且 can be replaced by 并且, 也, 还. Avoid stacking 也 AND 而且 in the same clause.',
    items: [
      { hanzi: '不但', pinyin: 'bù dàn', meaning: 'non seulement', meaningEn: 'not only', audio: 'audio/hsk4/hsk4_不但.wav' },
      { hanzi: '而且', pinyin: 'ér qiě', meaning: 'mais aussi', meaningEn: 'but also', audio: 'audio/hsk3/hsk3_而且.wav' },
      { hanzi: '不仅', pinyin: 'bù jǐn', meaning: 'non seulement (écrit)', meaningEn: 'not only (written)', audio: 'audio/hsk5/hsk5_不仅.wav' },
      { hanzi: '并且', pinyin: 'bìng qiě', meaning: 'et en outre', meaningEn: 'and furthermore', audio: 'audio/hsk5/hsk5_并且.wav' },
      { hanzi: '聪明', pinyin: 'cōng míng', meaning: 'intelligent', meaningEn: 'smart', audio: 'audio/hsk3/hsk3_聪明.wav' },
      { hanzi: '努力', pinyin: 'nǔ lì', meaning: 'travailleur', meaningEn: 'hard-working', audio: 'audio/hsk3/hsk3_努力.wav' }
    ],
    tip:
      'Piège fréquent : 不但 se place APRÈS le sujet si celui-ci est commun aux deux parties (他不但…, 而且…), mais AVANT le sujet si les sujets diffèrent (不但他来，而且他妈也来). Inverser = faute classique.',
    tipEn:
      'Common trap: 不但 goes AFTER the subject if it\'s shared (他不但…, 而且…), but BEFORE the subject if subjects differ (不但他来，而且他妈也来). Swapping = classic error.'
  },
  {
    id: 'b21-bu-dan-escalation',
    title: 'Monter d\'un cran : 甚至 — progression extrême',
    titleEn: 'Cranking it up: 甚至 — extreme progression',
    body:
      'Pour une progression qui surprend, remplace 而且 par 甚至 (« voire, au point que »). 他不但聪明，甚至可以用十种语言写作 = non seulement il est intelligent, il écrit même dans dix langues. Astuce : 甚至 introduit un élément que l\'interlocuteur n\'attendait pas — on dépasse l\'addition simple pour entrer dans le spectaculaire. Remarque : combinaison favorite à l\'écrit, 不仅…甚至. Cette escalade structure bien les plaidoiries, critiques d\'art et éditoriaux.',
    bodyEn:
      'For a surprising escalation, swap 而且 for 甚至 ("even, to the point that"). 他不但聪明，甚至可以用十种语言写作 = not only is he smart, he even writes in ten languages. 甚至 introduces something the listener didn\'t expect — we go beyond simple addition into the spectacular. Favorite written combo: 不仅…甚至. This escalation structures arguments, art criticism and editorials nicely.',
    items: [
      { hanzi: '甚至', pinyin: 'shèn zhì', meaning: 'voire, au point que', meaningEn: 'even, to the point', audio: 'audio/hsk4/hsk4_甚至.wav' },
      { hanzi: '语言', pinyin: 'yǔ yán', meaning: 'langue', meaningEn: 'language', audio: 'audio/hsk3/hsk3_语言.wav' },
      { hanzi: '写作', pinyin: 'xiě zuò', meaning: 'écrire (œuvre)', meaningEn: 'write (works)', audio: 'audio/hsk5/hsk5_写作.wav' },
      { hanzi: '还', pinyin: 'hái', meaning: 'en plus (oral)', meaningEn: 'also, still', audio: 'audio/hsk2/hsk2_还.wav' },
      { hanzi: '另外', pinyin: 'lìng wài', meaning: 'par ailleurs', meaningEn: 'besides', audio: 'audio/hsk4/hsk4_另外.wav' }
    ],
    tip:
      'Chaîne gagnante pour un écrit soutenu : 不仅 A，而且 B，甚至 C. Trois paliers, trois niveaux d\'intensité. Parfait pour une dissertation HSK 6 ou un post LinkedIn en chinois.',
    tipEn:
      'Winning chain for formal writing: 不仅 A, 而且 B, 甚至 C. Three tiers, three intensity levels. Ideal for an HSK 6 essay or a LinkedIn post in Chinese.'
  }
];

// --- cecr-b21-grammar-conj-m2 — 无论…都 --------------------------------------
export const b21GrammarConjM2LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b21-wulun-universal',
    title: '无论 / 不管 + interrogatif + 都',
    titleEn: '无论 / 不管 + interrogative + 都',
    body:
      'RÈGLE D\'OR : pour dire « peu importe X, Y », il TE FAUT (1) 无论 (écrit) ou 不管 (oral), (2) un mot interrogatif 谁/什么/哪/怎么 OU une alternative A还是B, (3) 都 ou 也 dans la seconde clause. Attention : sans ces trois pièces, la structure est bancale. 无论谁来，我都欢迎. 不管多忙，他都去健身房.',
    bodyEn:
      'To say "no matter X, Y", you NEED: (1) 无论 (written) or 不管 (spoken), (2) a question word 谁/什么/哪/怎么 OR an A还是B alternative, (3) 都 or 也 in the second clause. Missing any piece = broken structure. 无论谁来，我都欢迎. 不管多忙，他都去健身房.',
    items: [
      { hanzi: '无论', pinyin: 'wú lùn', meaning: 'peu importe (écrit)', meaningEn: 'no matter (written)', audio: 'audio/hsk5/hsk5_无论.wav' },
      { hanzi: '不管', pinyin: 'bù guǎn', meaning: 'peu importe (oral)', meaningEn: 'no matter (spoken)', audio: 'audio/hsk4/hsk4_不管.wav' },
      { hanzi: '欢迎', pinyin: 'huān yíng', meaning: 'accueillir', meaningEn: 'welcome', audio: 'audio/hsk2/hsk2_欢迎.wav' },
      { hanzi: '天气', pinyin: 'tiān qì', meaning: 'temps, météo', meaningEn: 'weather', audio: 'audio/hsk1/hsk1_天气.wav' },
      { hanzi: '还是', pinyin: 'hái shì', meaning: 'ou (alternative)', meaningEn: 'or (alternative)', audio: 'audio/hsk3/hsk3_还是.wav' }
    ],
    tip:
      'Registre : 无论 domine à l\'écrit, discours formel, presse. 不管 domine à l\'oral, dans les conversations courantes.',
    tipEn:
      'Register: 无论 rules in writing, formal speech, press. 不管 rules in daily conversation.'
  },
  {
    id: 'b21-wulun-question-vs-alternative',
    title: 'Deux chemins : interrogatif OU 还是',
    titleEn: 'Two paths: question word OR 还是',
    body:
      'Règle : il y a exactement deux manières de remplir la première clause. VOIE 1 — avec un mot interrogatif ouvert, 无论谁/什么/哪/怎么/多 (qui/quoi/lequel/comment/à quel point). Ex : 无论多贵，我都要买 = peu importe le prix, je l\'achète. VOIE 2 — avec 还是 entre deux alternatives fermées, 无论 A 还是 B. Ex : 不管是男生还是女生，都可以报名 = garçons ou filles, tous peuvent s\'inscrire. Attention : ne mélange pas 还是 avec un mot interrogatif (✗ 无论谁还是什么). Choisis une voie, pas les deux.',
    bodyEn:
      'There are exactly two ways to build the first clause. WAY 1 — with an open question word: 无论谁/什么/哪/怎么/多 (who/what/which/how/how very). Ex: 无论多贵，我都要买 = whatever the price, I buy it. WAY 2 — with 还是 between two closed alternatives: 无论 A 还是 B. Ex: 不管是男生还是女生，都可以报名 = boys or girls, all can register. COMMON MISTAKE: mixing 还是 with a question word (✗ 无论谁还是什么). Pick one path, not both.',
    items: [
      { hanzi: '多', pinyin: 'duō', meaning: 'à quel point (intensif)', meaningEn: 'how very (intensifier)', audio: 'audio/hsk1/hsk1_多.wav' },
      { hanzi: '贵', pinyin: 'guì', meaning: 'cher', meaningEn: 'expensive', audio: 'audio/hsk1/hsk1_贵.wav' },
      { hanzi: '报名', pinyin: 'bào míng', meaning: 's\'inscrire', meaningEn: 'sign up', audio: 'audio/hsk3/hsk3_报名.wav' },
      { hanzi: '结果', pinyin: 'jié guǒ', meaning: 'résultat', meaningEn: 'result', audio: 'audio/hsk3/hsk3_结果.wav' },
      { hanzi: '条件', pinyin: 'tiáo jiàn', meaning: 'condition', meaningEn: 'condition', audio: 'audio/hsk4/hsk4_条件.wav' }
    ],
    tip:
      '无论 / 不管 expriment que le résultat ne dépend PAS de la variable. Si tu veux dire l\'inverse (le résultat DÉPEND des conditions), repasse sur 要是/如果…就.',
    tipEn:
      '无论 / 不管 say the result does NOT depend on the variable. If you mean the opposite (result DOES depend on conditions), switch back to 要是/如果…就.'
  }
];

// --- cecr-b21-grammar-conj-m3 — 即使…也 --------------------------------------
export const b21GrammarConjM3LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b21-jishi-hypo',
    title: '即使 A 也 B — hypothèse, pas fait',
    titleEn: '即使 A 也 B — hypothesis, not fact',
    body:
      'RÈGLE D\'OR : 即使 introduit un cas imaginé, souvent extrême — « même si X arrivait, B quand même ». 即使下雨，我也去 = même s\'il pleut, j\'y vais. Attention : 虽然 au contraire constate un fait réel. 虽然下雨了，我还是去了 = il a plu (réel) et je suis quand même allé. Astuce : pour forcer le cas extrême, prends 哪怕. 哪怕只剩一块钱，我也要走.',
    bodyEn:
      '即使 introduces an imagined, often extreme case: "even if X, B still". 即使下雨，我也去 = even if it rains, I\'ll go. 虽然 by contrast states a real fact: 虽然下雨了，我还是去了 = it rained (real) and I still went. To push the extreme case, use 哪怕: 哪怕只剩一块钱，我也要走.',
    items: [
      { hanzi: '即使', pinyin: 'jí shǐ', meaning: 'même si', meaningEn: 'even if', audio: 'audio/hsk5/hsk5_即使.wav' },
      { hanzi: '就算', pinyin: 'jiù suàn', meaning: 'même si (oral)', meaningEn: 'even if (spoken)', audio: 'audio/hsk5/hsk5_就算.wav' },
      { hanzi: '哪怕', pinyin: 'nǎ pà', meaning: 'même dans le pire cas', meaningEn: 'even in the worst case', audio: 'audio/hsk5/hsk5_哪怕.wav' },
      { hanzi: '下雨', pinyin: 'xià yǔ', meaning: 'pleuvoir', meaningEn: 'to rain', audio: 'audio/hsk1/hsk1_下雨.wav' },
      { hanzi: '虽然', pinyin: 'suī rán', meaning: 'bien que (fait)', meaningEn: 'although (fact)', audio: 'audio/hsk2/hsk2_虽然.wav' }
    ],
    tip:
      'Astuce oral/écrit : 即使 est neutre et passe partout, 就算 sonne plus parlé (conversation, dialogue), 哪怕 dramatise — réserve-le aux cas les plus extrêmes.',
    tipEn:
      'Oral/written tip: 即使 is neutral and fits anywhere, 就算 feels more spoken (conversation, dialogue), 哪怕 dramatizes — save it for the most extreme cases.'
  },
  {
    id: 'b21-jishi-concession-chain',
    title: 'Chaîner 即使 avec la concession réelle',
    titleEn: 'Chaining 即使 with a real concession',
    body:
      'Astuce : un mouvement fréquent à l\'écrit HSK 5/6 — d\'abord concéder un fait (虽然 + réel), puis pousser l\'hypothèse extrême (即使 + imaginé). Ex : 虽然这次失败了，但即使下次还失败，我也不会放弃 = j\'ai échoué cette fois, mais même si j\'échoue encore la prochaine, je n\'abandonnerai pas. RÈGLE D\'OR : le 也 est OBLIGATOIRE dans la clause 即使 (jamais 就). Attention : si tu l\'oublies, la phrase s\'effondre — c\'est la faute la plus corrigée par les profs chinois.',
    bodyEn:
      'A common HSK 5/6 written move: first concede a fact (虽然 + real), then push the extreme hypothesis (即使 + imagined). Ex: 虽然这次失败了，但即使下次还失败，我也不会放弃 = I failed this time, but even if I fail again next time, I won\'t give up. The 也 is MANDATORY in the 即使 clause (never 就). Drop it and the sentence collapses — the most teacher-flagged mistake.',
    items: [
      { hanzi: '失败', pinyin: 'shī bài', meaning: 'échouer', meaningEn: 'fail', audio: 'audio/hsk4/hsk4_失败.wav' },
      { hanzi: '放弃', pinyin: 'fàng qì', meaning: 'abandonner', meaningEn: 'give up', audio: 'audio/hsk4/hsk4_放弃.wav' },
      { hanzi: '困难', pinyin: 'kùn nán', meaning: 'difficulté', meaningEn: 'difficulty', audio: 'audio/hsk4/hsk4_困难.wav' },
      { hanzi: '继续', pinyin: 'jì xù', meaning: 'continuer', meaningEn: 'continue', audio: 'audio/hsk4/hsk4_继续.wav' },
      { hanzi: '勇敢', pinyin: 'yǒng gǎn', meaning: 'courageux', meaningEn: 'brave', audio: 'audio/hsk4/hsk4_勇敢.wav' }
    ],
    tip:
      'Différence 即使…也 vs 只要…就 : le premier dit « le résultat tient MÊME dans le pire cas », le second « il suffit d\'UNE condition minimale ». Ne les confonds jamais en rédaction.',
    tipEn:
      '即使…也 vs 只要…就: the first says "the result holds EVEN in the worst case", the second "just ONE minimum condition is enough". Never mix them in writing.'
  }
];

// --- cecr-b21-grammar-conj-m4 — 虽然 vs 尽管 ---------------------------------
export const b21GrammarConjM4LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b21-jinguan-vs-suiran',
    title: '虽然 (neutre) vs 尽管 (emphatique)',
    titleEn: '虽然 (neutral) vs 尽管 (emphatic)',
    body:
      '虽然 et 尽管 = « bien que », mais 尽管 ajoute une nuance d\'effort ou d\'obstacle surmonté. 虽然很累，但是我继续工作 = je continue malgré la fatigue (neutre). 尽管很累，他还是坚持到最后 = bien qu\'épuisé, il a tenu jusqu\'au bout (on admire l\'effort). Attention : 尽管 seul, sans seconde proposition, signifie « n\'hésitez pas » — 你尽管说 = parlez sans retenue.',
    bodyEn:
      '虽然 and 尽管 both = "although", but 尽管 adds a nuance of effort or overcome obstacle. 虽然很累，但是我继续工作 = I work on despite tiredness (neutral). 尽管很累，他还是坚持到最后 = though exhausted, he held to the end (effort admired). Major pitfall: 尽管 alone, without a second clause, means "feel free" — 你尽管说 = speak freely.',
    items: [
      { hanzi: '虽然', pinyin: 'suī rán', meaning: 'bien que', meaningEn: 'although', audio: 'audio/hsk2/hsk2_虽然.wav' },
      { hanzi: '尽管', pinyin: 'jǐn guǎn', meaning: 'bien que (emphatique)', meaningEn: 'although (emphatic)', audio: 'audio/hsk4/hsk4_尽管.wav' },
      { hanzi: '但是', pinyin: 'dàn shì', meaning: 'mais', meaningEn: 'but', audio: 'audio/hsk2/hsk2_但是.wav' },
      { hanzi: '然而', pinyin: 'rán ér', meaning: 'cependant (soutenu)', meaningEn: 'however (formal)', audio: 'audio/hsk4/hsk4_然而.wav' },
      { hanzi: '坚持', pinyin: 'jiān chí', meaning: 'persévérer', meaningEn: 'persist', audio: 'audio/hsk4/hsk4_坚持.wav' }
    ],
    tip:
      'Dans la presse et les rapports, 尽管 est préféré — plus cultivé. À l\'oral courant, 虽然 passe mieux.',
    tipEn:
      'In press and reports, 尽管 is preferred — more cultivated. In daily speech, 虽然 feels better.'
  },
  {
    id: 'b21-jinguan-standalone',
    title: '尽管 seul = « n\'hésite pas »',
    titleEn: '尽管 alone = "feel free"',
    body:
      'Règle : hors structure concessive, 尽管 devant un verbe signifie « sans retenue, sans hésiter ». 你尽管说 = parle sans retenue. 有什么问题，你尽管问 = pose toutes tes questions, sans gêne. 你尽管试 = essaie librement. Attention : ce sens est ultra-fréquent à l\'oral et c\'est un faux-ami redoutable. Des étudiants traduisent mécaniquement par « bien que » et produisent du charabia. Astuce : contextualise TOUJOURS avant de traduire.',
    bodyEn:
      'Outside a concessive structure, 尽管 before a verb means "without holding back, feel free to". 你尽管说 = speak freely. 有什么问题，你尽管问 = ask any questions, no shyness. 你尽管试 = try freely. This sense is super common in speech and a notorious false friend: students mechanically translate "although" and produce nonsense. ALWAYS contextualize before translating.',
    items: [
      { hanzi: '放心', pinyin: 'fàng xīn', meaning: 'être rassuré', meaningEn: 'set one\'s mind at ease', audio: 'audio/hsk3/hsk3_放心.wav' },
      { hanzi: '帮忙', pinyin: 'bāng máng', meaning: 'aider', meaningEn: 'help', audio: 'audio/hsk3/hsk3_帮忙.wav' },
      { hanzi: '需要', pinyin: 'xū yào', meaning: 'avoir besoin', meaningEn: 'need', audio: 'audio/hsk3/hsk3_需要.wav' },
      { hanzi: '建议', pinyin: 'jiàn yì', meaning: 'suggérer', meaningEn: 'suggest', audio: 'audio/hsk4/hsk4_建议.wav' },
      { hanzi: '随便', pinyin: 'suí biàn', meaning: 'comme tu veux', meaningEn: 'as you wish', audio: 'audio/hsk4/hsk4_随便.wav' }
    ],
    tip:
      'Règle de détection : si 尽管 est suivi d\'un VERBE direct (尽管说, 尽管用) = « n\'hésite pas ». S\'il est suivi d\'un ADJECTIF ou d\'une proposition complète (尽管很累, 尽管下雨了) = « bien que ».',
    tipEn:
      'Detection rule: if 尽管 is followed by a VERB directly (尽管说, 尽管用) = "feel free". If followed by an ADJECTIVE or full clause (尽管很累, 尽管下雨了) = "although".'
  }
];

// ═════════════════════════════════════════════════════════════════════════════
// Technologie et internet
// ═════════════════════════════════════════════════════════════════════════════

// --- cecr-b21-tech-m1 — Informatique et internet ---------------------------
export const b21TechM1LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b21-tech-m1-hardware',
    title: 'Matériel et interfaces',
    titleEn: 'Hardware and interfaces',
    body:
      'Le numérique chinois moderne tient dans trois objets : 电脑, 手机, 屏幕. On ouvre un 浏览器, on visite un 网站, on accède à un 账号 via un 密码. À noter : en Chine continentale, le mobile domine largement le desktop — un 电脑 sert surtout au travail, le reste passe par 手机.',
    bodyEn:
      'Modern Chinese digital life fits in three devices: 电脑, 手机, 屏幕. You open a 浏览器, visit a 网站, access an 账号 via a 密码. Note: in mainland China, mobile vastly dominates desktop — a 电脑 is mostly for work, everything else goes through 手机.',
    items: [
      { hanzi: '电脑', pinyin: 'diàn nǎo', meaning: 'ordinateur', meaningEn: 'computer', audio: 'audio/hsk1/hsk1_电脑.wav' },
      { hanzi: '手机', pinyin: 'shǒu jī', meaning: 'téléphone portable', meaningEn: 'mobile phone', audio: 'audio/hsk1/hsk1_手机.wav' },
      { hanzi: '屏幕', pinyin: 'píng mù', meaning: 'écran', meaningEn: 'screen', audio: 'audio/hsk5/hsk5_屏幕.wav' },
      { hanzi: '浏览器', pinyin: 'liú lǎn qì', meaning: 'navigateur', meaningEn: 'browser', audio: 'audio/hsk6/hsk6_浏览器.wav' },
      { hanzi: '密码', pinyin: 'mì mǎ', meaning: 'mot de passe', meaningEn: 'password', audio: 'audio/hsk4/hsk4_密码.wav' },
      { hanzi: '账号', pinyin: 'zhàng hào', meaning: 'compte utilisateur', meaningEn: 'user account', audio: 'audio/hsk5/hsk5_账号.wav' }
    ]
  },
  {
    id: 'b21-tech-m1-actions',
    title: 'Actions en ligne et place de WeChat',
    titleEn: 'Online actions and WeChat\'s role',
    body:
      '上网 pour « être en ligne », 下载 pour « télécharger », 登录 / 注册 pour l\'authentification. Tout converge ensuite vers 微信 — mini-programmes 小程序, paiement, chat, réservations. Sans 微信, la vie quotidienne chinoise est quasi impossible.',
    bodyEn:
      '上网 for "be online", 下载 for "download", 登录 / 注册 for authentication. Everything then converges on 微信 — mini-programs 小程序, payments, chat, bookings. Without 微信, daily Chinese life is nearly impossible.',
    items: [
      { hanzi: '上网', pinyin: 'shàng wǎng', meaning: 'surfer sur internet', meaningEn: 'go online', audio: 'audio/hsk3/hsk3_上网.wav' },
      { hanzi: '下载', pinyin: 'xià zài', meaning: 'télécharger', meaningEn: 'download', audio: 'audio/hsk4/hsk4_下载.wav' },
      { hanzi: '登录', pinyin: 'dēng lù', meaning: 'se connecter', meaningEn: 'log in', audio: 'audio/hsk5/hsk5_登录.wav' },
      { hanzi: '注册', pinyin: 'zhù cè', meaning: 's\'inscrire', meaningEn: 'sign up', audio: 'audio/hsk5/hsk5_注册.wav' },
      { hanzi: '微信', pinyin: 'wēi xìn', meaning: 'WeChat', meaningEn: 'WeChat', audio: 'audio/hsk3/hsk3_微信.wav' }
    ],
    tip:
      'Différence 注册 vs 登录 : 注册 = créer un compte (une fois) ; 登录 = s\'y connecter (à chaque session).',
    tipEn:
      '注册 vs 登录: 注册 = create an account (once); 登录 = sign in to it (every session).'
  }
];

// --- cecr-b21-tech-m2 — IA et données ---------------------------------------
export const b21TechM2LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b21-tech-m2-ai',
    title: 'IA et big data',
    titleEn: 'AI and big data',
    body:
      '人工智能 se décompose en « intelligence (智能) fabriquée par l\'homme (人工) ». Trois briques : 算法 (l\'algorithme), 数据 (les données), 云计算 (le cloud). Les LLM chinois — 文心一言, 通义千问, DeepSeek — sont entraînés sur des 大数据 hébergés sur des 云. Comprendre ce trio est la clé pour lire la presse tech chinoise.',
    bodyEn:
      '人工智能 breaks into "intelligence (智能) man-made (人工)". Three bricks: 算法 (algorithm), 数据 (data), 云计算 (cloud). Chinese LLMs — 文心一言, 通义千问, DeepSeek — are trained on 大数据 hosted on 云. Grasping this trio is the key to reading Chinese tech press.',
    items: [
      { hanzi: '人工智能', pinyin: 'rén gōng zhì néng', meaning: 'intelligence artificielle', meaningEn: 'artificial intelligence', audio: 'audio/hsk6/hsk6_人工智能.wav' },
      { hanzi: '算法', pinyin: 'suàn fǎ', meaning: 'algorithme', meaningEn: 'algorithm', audio: 'audio/hsk6/hsk6_算法.wav' },
      { hanzi: '数据', pinyin: 'shù jù', meaning: 'données', meaningEn: 'data', audio: 'audio/hsk5/hsk5_数据.wav' },
      { hanzi: '大数据', pinyin: 'dà shù jù', meaning: 'big data', meaningEn: 'big data', audio: 'audio/hsk6/hsk6_大数据.wav' },
      { hanzi: '云计算', pinyin: 'yún jì suàn', meaning: 'cloud computing', meaningEn: 'cloud computing', audio: 'audio/hsk6/hsk6_云计算.wav' }
    ]
  },
  {
    id: 'b21-tech-m2-privacy',
    title: 'Vie privée et surveillance',
    titleEn: 'Privacy and surveillance',
    body:
      'La contrepartie du « tout-numérique » chinois : 人脸识别 partout (paiement, métro, sécurité), 监控 omniprésent. Le mot 隐私 (vie privée) reste débattu — la société chinoise tolère davantage la surveillance en échange de la sécurité publique, mais les critiques montent, notamment sur les 大数据 commerciales.',
    bodyEn:
      'The flipside of "all-digital" China: 人脸识别 everywhere (payments, metro, security), 监控 ubiquitous. The word 隐私 (privacy) remains debated — Chinese society tolerates surveillance more in exchange for public safety, but critiques are rising, especially about commercial 大数据.',
    items: [
      { hanzi: '隐私', pinyin: 'yǐn sī', meaning: 'vie privée', meaningEn: 'privacy', audio: 'audio/hsk6/hsk6_隐私.wav' },
      { hanzi: '监控', pinyin: 'jiān kòng', meaning: 'surveillance', meaningEn: 'surveillance', audio: 'audio/hsk6/hsk6_监控.wav' },
      { hanzi: '人脸识别', pinyin: 'rén liǎn shí bié', meaning: 'reconnaissance faciale', meaningEn: 'facial recognition', audio: 'audio/hsk6/hsk6_人脸识别.wav' },
      { hanzi: '安全', pinyin: 'ān quán', meaning: 'sécurité', meaningEn: 'safety', audio: 'audio/hsk4/hsk4_安全.wav' }
    ]
  }
];

// --- cecr-b21-tech-m3 — E-commerce et paiement mobile ----------------------
export const b21TechM3LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b21-tech-m3-payment',
    title: 'Payer sans cash : 扫码 et apps',
    titleEn: 'Paying without cash: 扫码 and apps',
    body:
      'En Chine, on paie avec 支付宝 ou 微信支付 en scannant un QR code (扫码). Les actions : 付款 (payer), 转账 (virer de l\'argent), 红包 (enveloppe rouge, cadeau numérique). Les billets papier disparaissent — même les marchés alimentaires acceptent les QR codes. Le cash reste utile seulement pour les touristes ou les très petits commerces ruraux.',
    bodyEn:
      'In China, you pay with 支付宝 or 微信支付 by scanning a QR code (扫码). Actions: 付款 (pay), 转账 (transfer), 红包 (digital red envelope / gift). Paper bills are vanishing — even food markets accept QR codes. Cash stays useful only for tourists or very small rural shops.',
    items: [
      { hanzi: '支付宝', pinyin: 'zhī fù bǎo', meaning: 'Alipay', meaningEn: 'Alipay', audio: 'audio/hsk5/hsk5_支付宝.wav' },
      { hanzi: '微信支付', pinyin: 'wēi xìn zhī fù', meaning: 'WeChat Pay', meaningEn: 'WeChat Pay', audio: 'audio/hsk5/hsk5_微信支付.wav' },
      { hanzi: '扫码', pinyin: 'sǎo mǎ', meaning: 'scanner le QR code', meaningEn: 'scan QR code', audio: 'audio/hsk5/hsk5_扫码.wav' },
      { hanzi: '付款', pinyin: 'fù kuǎn', meaning: 'payer', meaningEn: 'pay', audio: 'audio/hsk5/hsk5_付款.wav' },
      { hanzi: '转账', pinyin: 'zhuǎn zhàng', meaning: 'faire un virement', meaningEn: 'transfer money', audio: 'audio/hsk6/hsk6_转账.wav' }
    ]
  },
  {
    id: 'b21-tech-m3-platforms',
    title: 'Plateformes d\'achat et livraison',
    titleEn: 'Shopping platforms and delivery',
    body:
      'Le trio e-commerce : 淘宝 (C2C, tout et n\'importe quoi), 京东 (B2C, plus qualitatif), 拼多多 (achats groupés low-cost, montée fulgurante). Pour la restauration, 美团 et 饿了么 dominent le 外卖. La livraison express 快递 arrive souvent le lendemain, parfois le jour même — infrastructure qui stupéfie les Occidentaux.',
    bodyEn:
      'The e-commerce trio: 淘宝 (C2C, everything), 京东 (B2C, higher quality), 拼多多 (group buying low-cost, exploding). For food, 美团 and 饿了么 dominate 外卖. Express 快递 usually arrives next day, sometimes same day — infrastructure that stuns Westerners.',
    items: [
      { hanzi: '淘宝', pinyin: 'táo bǎo', meaning: 'Taobao', meaningEn: 'Taobao', audio: 'audio/hsk4/hsk4_淘宝.wav' },
      { hanzi: '京东', pinyin: 'jīng dōng', meaning: 'JD.com', meaningEn: 'JD.com', audio: 'audio/hsk5/hsk5_京东.wav' },
      { hanzi: '快递', pinyin: 'kuài dì', meaning: 'livraison express', meaningEn: 'express delivery', audio: 'audio/hsk4/hsk4_快递.wav' },
      { hanzi: '外卖', pinyin: 'wài mài', meaning: 'livraison de repas', meaningEn: 'food delivery', audio: 'audio/hsk4/hsk4_外卖.wav' },
      { hanzi: '双十一', pinyin: 'shuāng shí yī', meaning: '« Singles\' Day » (11/11)', meaningEn: 'Singles\' Day (11/11)', audio: 'audio/hsk5/hsk5_双十一.wav' }
    ]
  }
];

// --- cecr-b21-tech-m4 — 5G et IoT -------------------------------------------
export const b21TechM4LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b21-tech-m4-5g',
    title: '5G, IoT et smart city',
    titleEn: '5G, IoT and smart city',
    body:
      'La Chine a déployé la 5G sur tout son territoire avant la plupart des pays occidentaux. Trois termes à connaître : 5G网络, 物联网 (Internet of Things, litt. « internet des objets »), 智慧城市 (smart city). Objets connectés : 智能家居 (maison intelligente), 智能音箱 (enceinte intelligente — 小爱 de Xiaomi, 天猫精灵 d\'Alibaba, dans presque chaque salon).',
    bodyEn:
      'China rolled out 5G nationwide before most Western countries. Three terms to know: 5G网络, 物联网 (IoT, lit. "internet of things"), 智慧城市 (smart city). Connected devices: 智能家居 (smart home), 智能音箱 (smart speaker — Xiaomi\'s 小爱, Alibaba\'s 天猫精灵, in almost every living room).',
    items: [
      { hanzi: '物联网', pinyin: 'wù lián wǎng', meaning: 'Internet des objets', meaningEn: 'Internet of Things', audio: 'audio/hsk6/hsk6_物联网.wav' },
      { hanzi: '智慧城市', pinyin: 'zhì huì chéng shì', meaning: 'smart city', meaningEn: 'smart city', audio: 'audio/hsk6/hsk6_智慧城市.wav' },
      { hanzi: '智能家居', pinyin: 'zhì néng jiā jū', meaning: 'maison intelligente', meaningEn: 'smart home', audio: 'audio/hsk6/hsk6_智能家居.wav' },
      { hanzi: '共享', pinyin: 'gòng xiǎng', meaning: 'partager (économie)', meaningEn: 'share (economy)', audio: 'audio/hsk5/hsk5_共享.wav' },
      { hanzi: '华为', pinyin: 'huá wéi', meaning: 'Huawei', meaningEn: 'Huawei', audio: 'audio/hsk5/hsk5_华为.wav' }
    ],
    tip:
      '共享 est le préfixe marketing des années 2015-2020 : 共享单车 (vélos), 共享充电宝 (batteries), 共享汽车 (voitures)… tout ce qui s\'emprunte via QR code.',
    tipEn:
      '共享 was the marketing prefix of 2015-2020: 共享单车 (bikes), 共享充电宝 (power banks), 共享汽车 (cars)… anything unlocked by QR code.'
  }
];

// ═════════════════════════════════════════════════════════════════════════════
// Environnement et société
// ═════════════════════════════════════════════════════════════════════════════

// --- cecr-b21-env-m1 — Pollution --------------------------------------------
export const b21EnvM1LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b21-env-m1-pollution',
    title: '污染 et 雾霾 — 10 ans de choc pékinois',
    titleEn: '污染 and 雾霾 — 10 years of Beijing shock',
    body:
      'Le mot 雾霾 (« brouillard pollué », smog) est entré dans la langue courante autour de 2012-2013, quand la qualité de l\'air de Pékin est devenue mondialement connue. 空气质量 se mesure via l\'indice AQI et le PM2.5. Les habitants ont adopté 口罩 et 空气净化器. La politique environnementale (环保) est devenue centrale dans l\'agenda politique.',
    bodyEn:
      'The word 雾霾 ("polluted fog", smog) entered everyday language around 2012-2013, when Beijing\'s air quality became globally infamous. 空气质量 is measured via AQI and PM2.5. Residents adopted 口罩 and 空气净化器. Environmental policy (环保) became central to the political agenda.',
    items: [
      { hanzi: '污染', pinyin: 'wū rǎn', meaning: 'pollution', meaningEn: 'pollution', audio: 'audio/hsk5/hsk5_污染.wav' },
      { hanzi: '空气', pinyin: 'kōng qì', meaning: 'air', meaningEn: 'air', audio: 'audio/hsk3/hsk3_空气.wav' },
      { hanzi: '雾霾', pinyin: 'wù mái', meaning: 'smog', meaningEn: 'smog', audio: 'audio/hsk6/hsk6_雾霾.wav' },
      { hanzi: '口罩', pinyin: 'kǒu zhào', meaning: 'masque', meaningEn: 'mask', audio: 'audio/hsk5/hsk5_口罩.wav' },
      { hanzi: '环保', pinyin: 'huán bǎo', meaning: 'protection environnementale', meaningEn: 'environmental protection', audio: 'audio/hsk5/hsk5_环保.wav' },
      { hanzi: '太阳能', pinyin: 'tài yáng néng', meaning: 'énergie solaire', meaningEn: 'solar energy', audio: 'audio/hsk6/hsk6_太阳能.wav' }
    ]
  }
];

// --- cecr-b21-env-m2 — Changement climatique --------------------------------
export const b21EnvM2LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b21-env-m2-climate',
    title: '气候变化 et double deadline 2030/2060',
    titleEn: '气候变化 and the 2030/2060 double deadline',
    body:
      'En 2020, Xi Jinping a annoncé à l\'ONU deux objectifs : 碳达峰 (pic carbone) d\'ici 2030 et 碳中和 (neutralité carbone) d\'ici 2060. Ce « double carbone » (双碳) structure la politique énergétique chinoise. Vocabulaire à comprendre : 温室气体 (gaz à effet de serre), 二氧化碳 (CO₂), 极端天气 (météo extrême, de plus en plus fréquente depuis 2020).',
    bodyEn:
      'In 2020, Xi Jinping announced two UN targets: 碳达峰 (carbon peak) by 2030 and 碳中和 (carbon neutrality) by 2060. This "double carbon" (双碳) frames Chinese energy policy. Vocabulary to grasp: 温室气体 (greenhouse gases), 二氧化碳 (CO₂), 极端天气 (extreme weather, ever more frequent since 2020).',
    items: [
      { hanzi: '气候变化', pinyin: 'qì hòu biàn huà', meaning: 'changement climatique', meaningEn: 'climate change', audio: 'audio/hsk6/hsk6_气候变化.wav' },
      { hanzi: '全球变暖', pinyin: 'quán qiú biàn nuǎn', meaning: 'réchauffement climatique', meaningEn: 'global warming', audio: 'audio/hsk6/hsk6_全球变暖.wav' },
      { hanzi: '温室气体', pinyin: 'wēn shì qì tǐ', meaning: 'gaz à effet de serre', meaningEn: 'greenhouse gas', audio: 'audio/hsk6/hsk6_温室气体.wav' },
      { hanzi: '二氧化碳', pinyin: 'èr yǎng huà tàn', meaning: 'dioxyde de carbone', meaningEn: 'CO₂', audio: 'audio/hsk6/hsk6_二氧化碳.wav' },
      { hanzi: '极端天气', pinyin: 'jí duān tiān qì', meaning: 'météo extrême', meaningEn: 'extreme weather', audio: 'audio/hsk6/hsk6_极端天气.wav' },
      { hanzi: '碳中和', pinyin: 'tàn zhōng hé', meaning: 'neutralité carbone', meaningEn: 'carbon neutrality', audio: 'audio/hsk6/hsk6_碳中和.wav' }
    ]
  }
];

// --- cecr-b21-env-m3 — Tri des déchets --------------------------------------
export const b21EnvM3LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b21-env-m3-sorting',
    title: '垃圾分类 — 4 catégories, amendes réelles',
    titleEn: '垃圾分类 — 4 categories, real fines',
    body:
      'Depuis juillet 2019, Shanghai impose quatre catégories de tri : 可回收物 (recyclables), 有害垃圾 (dangereux), 湿垃圾 (humide/organique), 干垃圾 (sec/autre). Les amendes vont jusqu\'à 200 yuans pour les particuliers, plusieurs milliers pour les entreprises. D\'autres villes suivent — Pékin, Hangzhou. Un vocabulaire militant émerge autour de 一次性 (jetable) et 塑料袋 (sac plastique).',
    bodyEn:
      'Since July 2019, Shanghai enforces four sorting categories: 可回收物 (recyclables), 有害垃圾 (hazardous), 湿垃圾 (wet/organic), 干垃圾 (dry/other). Fines reach 200 yuan for individuals, thousands for businesses. Other cities follow — Beijing, Hangzhou. An activist vocabulary is emerging around 一次性 (disposable) and 塑料袋 (plastic bag).',
    items: [
      { hanzi: '垃圾', pinyin: 'lā jī', meaning: 'déchets', meaningEn: 'garbage', audio: 'audio/hsk4/hsk4_垃圾.wav' },
      { hanzi: '分类', pinyin: 'fēn lèi', meaning: 'classer, trier', meaningEn: 'classify, sort', audio: 'audio/hsk5/hsk5_分类.wav' },
      { hanzi: '可回收', pinyin: 'kě huí shōu', meaning: 'recyclable', meaningEn: 'recyclable', audio: 'audio/hsk6/hsk6_可回收.wav' },
      { hanzi: '有害', pinyin: 'yǒu hài', meaning: 'nocif', meaningEn: 'harmful', audio: 'audio/hsk5/hsk5_有害.wav' },
      { hanzi: '一次性', pinyin: 'yí cì xìng', meaning: 'jetable, à usage unique', meaningEn: 'disposable', audio: 'audio/hsk5/hsk5_一次性.wav' },
      { hanzi: '塑料袋', pinyin: 'sù liào dài', meaning: 'sac plastique', meaningEn: 'plastic bag', audio: 'audio/hsk5/hsk5_塑料袋.wav' }
    ]
  }
];

// ═════════════════════════════════════════════════════════════════════════════
// Économie et travail
// ═════════════════════════════════════════════════════════════════════════════

// --- cecr-b21-economics-m1 — Économie générale ------------------------------
export const b21EconomicsM1LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b21-eco-m1-macro',
    title: 'Le socle macroéconomique',
    titleEn: 'The macro bedrock',
    body:
      '经济 = l\'économie. Sa santé se juge par 经济增长 (croissance), indice PIB/GDP (国内生产总值). Quand la croissance s\'emballe on craint l\'inflation (通货膨胀), quand elle ralentit on redoute la déflation (通货紧缩). La Chine a connu 1990-2010 des taux à deux chiffres puis un ralentissement structurel autour de 5-6 %.',
    bodyEn:
      '经济 = the economy. Its health is judged via 经济增长 (growth), PIB/GDP index (国内生产总值). When growth overheats, we fear inflation (通货膨胀); when it slows, we dread deflation (通货紧缩). China saw double-digit rates 1990-2010 then structural slowdown around 5-6 %.',
    items: [
      { hanzi: '经济', pinyin: 'jīng jì', meaning: 'économie', meaningEn: 'economy', audio: 'audio/hsk4/hsk4_经济.wav' },
      { hanzi: '增长', pinyin: 'zēng zhǎng', meaning: 'croissance', meaningEn: 'growth', audio: 'audio/hsk5/hsk5_增长.wav' },
      { hanzi: '危机', pinyin: 'wēi jī', meaning: 'crise', meaningEn: 'crisis', audio: 'audio/hsk5/hsk5_危机.wav' },
      { hanzi: '通货膨胀', pinyin: 'tōng huò péng zhàng', meaning: 'inflation', meaningEn: 'inflation', audio: 'audio/hsk6/hsk6_通货膨胀.wav' },
      { hanzi: '股市', pinyin: 'gǔ shì', meaning: 'marché boursier', meaningEn: 'stock market', audio: 'audio/hsk6/hsk6_股市.wav' },
      { hanzi: '贷款', pinyin: 'dài kuǎn', meaning: 'prêt', meaningEn: 'loan', audio: 'audio/hsk5/hsk5_贷款.wav' }
    ]
  }
];

// --- cecr-b21-economics-m2 — Entrepreneuriat --------------------------------
export const b21EconomicsM2LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b21-eco-m2-startup',
    title: '创业 et licornes chinoises',
    titleEn: '创业 and Chinese unicorns',
    body:
      '创业 signifie littéralement « créer (创) une affaire (业) ». L\'écosystème start-up chinois se concentre à 中关村 (Pékin) et 深圳 (hub tech du sud). Étapes classiques : 融资 (levée de fonds), 估值 (valorisation), atteinte du statut 独角兽 (licorne > 1 Md $), puis 上市 (entrée en bourse). Des noms phares : Alibaba, Meituan, ByteDance, BYD — tous passés par ces étapes.',
    bodyEn:
      '创业 literally means "create (创) a venture (业)". The Chinese startup ecosystem concentrates at 中关村 (Beijing) and 深圳 (southern tech hub). Classic stages: 融资 (raise funds), 估值 (valuation), hitting 独角兽 (unicorn > $1B), then 上市 (IPO). Big names: Alibaba, Meituan, ByteDance, BYD — all went through these steps.',
    items: [
      { hanzi: '创业', pinyin: 'chuàng yè', meaning: 'entreprendre', meaningEn: 'start a business', audio: 'audio/hsk5/hsk5_创业.wav' },
      { hanzi: '创始人', pinyin: 'chuàng shǐ rén', meaning: 'fondateur', meaningEn: 'founder', audio: 'audio/hsk6/hsk6_创始人.wav' },
      { hanzi: '投资', pinyin: 'tóu zī', meaning: 'investir', meaningEn: 'invest', audio: 'audio/hsk5/hsk5_投资.wav' },
      { hanzi: '融资', pinyin: 'róng zī', meaning: 'lever des fonds', meaningEn: 'raise funds', audio: 'audio/hsk6/hsk6_融资.wav' },
      { hanzi: '独角兽', pinyin: 'dú jiǎo shòu', meaning: 'licorne (start-up)', meaningEn: 'unicorn (startup)', audio: 'audio/hsk6/hsk6_独角兽.wav' },
      { hanzi: '上市', pinyin: 'shàng shì', meaning: 'entrer en bourse (IPO)', meaningEn: 'go public (IPO)', audio: 'audio/hsk5/hsk5_上市.wav' }
    ]
  }
];

// --- cecr-b21-economics-m3 — Carrière ---------------------------------------
export const b21EconomicsM3LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b21-eco-m3-career',
    title: 'Progression, rupture, réseau',
    titleEn: 'Progress, rupture, network',
    body:
      'Monde du travail chinois : on rêve de 升职 (promotion) et 加薪 (augmentation), on pratique le 跳槽 (changement de poste — très courant chez les moins de 35 ans), on redoute 裁员 et 失业. Jack Ma a popularisé le débat sur 996 en 2019. Mais tout n\'est pas purement méritocratique : 关系 (le réseau) reste un facteur d\'avancement aussi puissant qu\'implicite.',
    bodyEn:
      'Chinese work life: people dream of 升职 (promotion) and 加薪 (raise), practice 跳槽 (changing jobs — very common under 35), fear 裁员 and 失业. Jack Ma sparked the 996 debate in 2019. But it\'s not purely meritocratic: 关系 (network) remains an advancement factor as powerful as it is implicit.',
    items: [
      { hanzi: '升职', pinyin: 'shēng zhí', meaning: 'être promu', meaningEn: 'get promoted', audio: 'audio/hsk5/hsk5_升职.wav' },
      { hanzi: '加薪', pinyin: 'jiā xīn', meaning: 'augmenter le salaire', meaningEn: 'get a raise', audio: 'audio/hsk5/hsk5_加薪.wav' },
      { hanzi: '跳槽', pinyin: 'tiào cáo', meaning: 'changer de job', meaningEn: 'change jobs', audio: 'audio/hsk6/hsk6_跳槽.wav' },
      { hanzi: '裁员', pinyin: 'cái yuán', meaning: 'licencier', meaningEn: 'lay off', audio: 'audio/hsk6/hsk6_裁员.wav' },
      { hanzi: '失业', pinyin: 'shī yè', meaning: 'chômage', meaningEn: 'unemployment', audio: 'audio/hsk5/hsk5_失业.wav' },
      { hanzi: '关系', pinyin: 'guān xi', meaning: 'relations, réseau', meaningEn: 'connections, network', audio: 'audio/hsk3/hsk3_关系.wav' }
    ],
    tip:
      '跳槽 se dit souvent en positif en Chine : c\'est une preuve de valeur sur le marché. À l\'inverse, rester trop longtemps au même poste peut être perçu comme un manque d\'ambition.',
    tipEn:
      '跳槽 is often spoken of positively in China: it proves market value. Conversely, staying too long in one job can read as a lack of ambition.'
  }
];

// ═════════════════════════════════════════════════════════════════════════════
// VAGUE B2.1 — Conversation + Nuances
// ═════════════════════════════════════════════════════════════════════════════

// === CONVERSATION B2.1 =======================================================

export const b21ConvM1LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b21-meeting-lead',
    title: 'Animer une réunion : ouvrir et structurer',
    titleEn: 'Lead a meeting: open and structure',
    body:
      'Ouvrir : 大家好，我们今天的会议有三个议题 (bonjour, on a 3 sujets à l\'agenda). Lancer un sujet : 第一个议题是 X / 我们先来讨论 X. Donner la parole : 老张，你先说 / 你怎么看 ? Recadrer : 这个问题我们一会儿再讨论 / 我们先回到主题. Vocab-clé : 议题 (yìtí, ordre du jour), 主持 (zhǔchí, présider), 主题 (sujet), 进度 (avancement). Remarque : phrase culturellement attendue, 大家有什么想法都可以提 (n\'hésitez pas à proposer vos idées) — montre que tu invites la participation, sinon les Chinois plus jeunes attendent que tu désignes.',
    bodyEn:
      'Open: 大家好，我们今天的会议有三个议题 (hello, we have 3 agenda items). Launch a topic: 第一个议题是 X / 我们先来讨论 X. Give the floor: 老张，你先说 / 你怎么看？Refocus: 这个问题我们一会儿再讨论 / 我们先回到主题. Key vocab: 议题 (agenda item), 主持 (chair), 主题 (topic), 进度 (progress). Culturally expected: 大家有什么想法都可以提 (feel free to share ideas) — shows you invite participation, otherwise younger Chinese wait to be called on.',
    items: [
      { hanzi: '议题', pinyin: 'yì tí', meaning: 'point d\'agenda', meaningEn: 'agenda item', audio: 'audio/hsk6/hsk6_议题.wav' },
      { hanzi: '主持', pinyin: 'zhǔ chí', meaning: 'présider', meaningEn: 'chair', audio: 'audio/hsk5/hsk5_主持.wav' },
      { hanzi: '主题', pinyin: 'zhǔ tí', meaning: 'sujet, thème', meaningEn: 'theme, topic', audio: 'audio/hsk5/hsk5_主题.wav' },
      { hanzi: '进度', pinyin: 'jìn dù', meaning: 'avancement', meaningEn: 'progress', audio: 'audio/hsk5/hsk5_进度.wav' },
      { hanzi: '提', pinyin: 'tí', meaning: 'proposer, soulever', meaningEn: 'raise, bring up', audio: 'audio/hsk3/hsk3_提.wav' }
    ],
    tip:
      'En réunion chinoise, désigne nommément ceux que tu veux entendre : « 老李，你的看法 ? » Sinon, par hiérarchie ou timidité, beaucoup ne prennent pas la parole spontanément.',
    tipEn:
      'In Chinese meetings, name the people you want to hear: «老李，你的看法?» Otherwise, by hierarchy or shyness, many won\'t speak up spontaneously.'
  },
  {
    id: 'b21-meeting-conclude',
    title: 'Conclure une réunion + actions',
    titleEn: 'Close a meeting + action items',
    body:
      'Récapituler : 我总结一下今天的讨论 (je résume ce qu\'on a vu aujourd\'hui). Points-clés : 我们达成了几个共识 (on est tombés d\'accord sur plusieurs points). Actions : 接下来谁负责 X ? (qui s\'occupe de X ?). Deadline : 我们的目标是 X 之前完成 (objectif : finir avant X). Suivi : 下次会议安排在 X (prochaine réunion prévue X). Règle : toujours conclure par 谢谢大家辛苦了 (merci à tous pour votre travail) — c\'est une marque de respect attendue, pas optionnelle. Attention : la réunion sans 辛苦了 final laisse un goût froid.',
    bodyEn:
      'Recap: 我总结一下今天的讨论 (let me summarize today\'s discussion). Key points: 我们达成了几个共识 (we reached agreement on several points). Actions: 接下来谁负责 X？(who handles X next?). Deadline: 我们的目标是 X 之前完成 (goal: finish before X). Follow-up: 下次会议安排在 X (next meeting set for X). Always close with 谢谢大家辛苦了 (thanks everyone for your work) — it\'s an expected mark of respect, not optional. A meeting without final 辛苦了 leaves a cold feeling.',
    items: [
      { hanzi: '总结', pinyin: 'zǒng jié', meaning: 'résumer, synthèse', meaningEn: 'summarize', audio: 'audio/hsk4/hsk4_总结.wav' },
      { hanzi: '共识', pinyin: 'gòng shí', meaning: 'consensus', meaningEn: 'consensus', audio: 'audio/hsk6/hsk6_共识.wav' },
      { hanzi: '负责', pinyin: 'fù zé', meaning: 'être responsable', meaningEn: 'be in charge', audio: 'audio/hsk4/hsk4_负责.wav' },
      { hanzi: '目标', pinyin: 'mù biāo', meaning: 'objectif', meaningEn: 'goal', audio: 'audio/hsk4/hsk4_目标.wav' },
      { hanzi: '安排', pinyin: 'ān pái', meaning: 'organiser', meaningEn: 'arrange', audio: 'audio/hsk4/hsk4_安排.wav' }
    ],
    tip:
      'Après une réunion en Chine, envoie systématiquement le 会议纪要 (huìyì jìyào, compte-rendu) sur WeChat dans les 24 h. C\'est une preuve d\'engagement professionnel attendue.',
    tipEn:
      'After a Chinese meeting, systematically send the 会议纪要 (huìyì jìyào, minutes) on WeChat within 24h. It\'s an expected mark of professional engagement.'
  }
];

export const b21ConvM2LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b21-negocier',
    title: 'Négocier un contrat / un prix pro',
    titleEn: 'Negotiate a contract / pro price',
    body:
      'Ouvrir : 我们想了解一下贵公司的报价 (on aimerait connaître votre offre). Pousser : 这个价格我们觉得有点高 (un peu élevé), 还有没有调整的空间 ? (y a-t-il de la marge ?). Astuce : 空间 (espace) = vocabulaire de négociation chinois clé. Vous proposer un compromis : 如果 X，我们可以考虑 Y. Forcer la main poliment : 我们的预算有限 (notre budget est limité), 这是我们的最后报价 (c\'est notre dernière offre). Conclure : 我们达成协议了 ! (on a un accord !). Remarque : en culture chinoise, négocier dur est NORMAL et attendu — accepter le 1er prix peut faire perdre du respect.',
    bodyEn:
      'Open: 我们想了解一下贵公司的报价 (we\'d like to know your offer). Push: 这个价格我们觉得有点高 (a bit high), 还有没有调整的空间？(any room?). 空间 (space) = key Chinese negotiation vocab. Propose compromise: 如果 X，我们可以考虑 Y. Politely force: 我们的预算有限 (our budget is limited), 这是我们的最后报价 (this is our final offer). Close: 我们达成协议了！(we have an agreement!). In Chinese culture, hard negotiation is NORMAL and expected — accepting the first price can lose respect.',
    items: [
      { hanzi: '报价', pinyin: 'bào jià', meaning: 'devis, prix offert', meaningEn: 'quote', audio: 'audio/hsk6/hsk6_报价.wav' },
      { hanzi: '空间', pinyin: 'kōng jiān', meaning: 'marge, espace', meaningEn: 'room, space', audio: 'audio/hsk5/hsk5_空间.wav' },
      { hanzi: '预算', pinyin: 'yù suàn', meaning: 'budget', meaningEn: 'budget', audio: 'audio/hsk5/hsk5_预算.wav' },
      { hanzi: '协议', pinyin: 'xié yì', meaning: 'accord', meaningEn: 'agreement', audio: 'audio/hsk5/hsk5_协议.wav' },
      { hanzi: '达成', pinyin: 'dá chéng', meaning: 'parvenir à', meaningEn: 'reach', audio: 'audio/hsk5/hsk5_达成.wav' }
    ],
    tip:
      '« 还有没有调整的空间 ? » est la formule MAGIQUE de négociation pro chinoise. Plus polie que « 能再便宜一点 ? » (marché). À utiliser systématiquement face à un devis.',
    tipEn:
      '«还有没有调整的空间？» is the MAGIC formula of Chinese pro negotiation. More polite than «能再便宜一点?» (market). Use systematically when receiving a quote.'
  },
  {
    id: 'b21-conditions',
    title: 'Discuter des conditions d\'un contrat',
    titleEn: 'Discuss contract terms',
    body:
      'Vocab : 条款 (tiáokuǎn, clauses), 条件 (tiáojiàn, conditions), 期限 (qīxiàn, échéance), 责任 (zérèn, responsabilité), 违约 (wéiyuē, rupture de contrat). Demander à clarifier : 这个条款是什么意思 ? / 我对 X 有点疑问. Proposer une modif : 我们可以加一条 X (on peut ajouter une clause X). Pour s\'assurer : 我可以再考虑一下吗 ? (je peux réfléchir ?). Attention : piège culturel — ne JAMAIS signer sur place, même si la pression est forte. La culture chinoise respecte qui prend son temps. Astuce : phrase magique, 我需要跟我的团队商量一下 (je dois en discuter avec mon équipe).',
    bodyEn:
      'Vocab: 条款 (clauses), 条件 (conditions), 期限 (deadline), 责任 (responsibility), 违约 (breach of contract). Ask to clarify: 这个条款是什么意思？/ 我对 X 有点疑问. Propose change: 我们可以加一条 X (we can add an X clause). To safeguard: 我可以再考虑一下吗？(can I think it over?). CULTURAL TRAP: NEVER sign on the spot, even under pressure. Chinese culture respects taking time. Magic phrase: 我需要跟我的团队商量一下 (I need to discuss with my team).',
    items: [
      { hanzi: '条款', pinyin: 'tiáo kuǎn', meaning: 'clause', meaningEn: 'clause', audio: 'audio/hsk6/hsk6_条款.wav' },
      { hanzi: '条件', pinyin: 'tiáo jiàn', meaning: 'condition', meaningEn: 'condition', audio: 'audio/hsk4/hsk4_条件.wav' },
      { hanzi: '期限', pinyin: 'qī xiàn', meaning: 'échéance', meaningEn: 'deadline', audio: 'audio/hsk6/hsk6_期限.wav' },
      { hanzi: '责任', pinyin: 'zé rèn', meaning: 'responsabilité', meaningEn: 'responsibility', audio: 'audio/hsk4/hsk4_责任.wav' },
      { hanzi: '商量', pinyin: 'shāng liang', meaning: 'discuter, consulter', meaningEn: 'discuss, consult', audio: 'audio/hsk4/hsk4_商量.wav' }
    ],
    tip:
      'En Chine, dire « 我需要跟我的团队商量一下 » est respectable même si tu décides seul. Ça donne du temps + montre que tu prends la décision au sérieux. Utilise sans gêne.',
    tipEn:
      'In China, saying «我需要跟我的团队商量一下» is respectable even if you decide alone. Gains time + shows you take the decision seriously. Use without hesitation.'
  }
];

export const b21ConvM3LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b21-rapport',
    title: 'Rendre compte d\'un avancement (status update)',
    titleEn: 'Give a status update',
    body:
      'Structure : 项目目前的进度 (l\'avancement actuel), 已完成的部分 (ce qui est fait), 正在进行 (en cours), 计划中的下一步 (étapes prévues). Vocab : 完成度 (taux d\'achèvement), 进展顺利 (avancée fluide), 遇到了一些问题 (rencontré des difficultés). Phrase positive : 总体上按计划进行 (globalement dans les temps). Si retard : 因为 X，我们可能要延期一周 (cause + délai). RÈGLE D\'OR : toujours proposer une SOLUTION en même temps — 我们的解决方案是 Y. Attention : reporter un problème SANS solution est culturellement perçu comme manque d\'initiative.',
    bodyEn:
      'Structure: 项目目前的进度 (current progress), 已完成的部分 (what\'s done), 正在进行 (in progress), 计划中的下一步 (planned next steps). Vocab: 完成度 (completion rate), 进展顺利 (going smoothly), 遇到了一些问题 (encountered issues). Positive phrase: 总体上按计划进行 (overall on schedule). If delayed: 因为 X，我们可能要延期一周 (cause + delay). Always propose a SOLUTION at the same time: 我们的解决方案是 Y. Reporting a problem WITHOUT a solution is culturally seen as lack of initiative.',
    items: [
      { hanzi: '进度', pinyin: 'jìn dù', meaning: 'avancement', meaningEn: 'progress', audio: 'audio/hsk5/hsk5_进度.wav' },
      { hanzi: '完成度', pinyin: 'wán chéng dù', meaning: 'taux d\'achèvement', meaningEn: 'completion rate', audio: 'audio/hsk3/hsk3_完成.wav' },
      { hanzi: '进展', pinyin: 'jìn zhǎn', meaning: 'progrès', meaningEn: 'progress', audio: 'audio/hsk5/hsk5_进展.wav' },
      { hanzi: '延期', pinyin: 'yán qī', meaning: 'reporter, prolonger', meaningEn: 'postpone', audio: 'audio/hsk6/hsk6_延期.wav' },
      { hanzi: '解决方案', pinyin: 'jiě jué fāng àn', meaning: 'solution', meaningEn: 'solution', audio: 'audio/hsk5/hsk5_方案.wav' }
    ],
    tip:
      'Règle d\'or pro chinoise : si tu remontes UN problème, remonte AUSSI une solution proposée. « 我有一个问题，我建议这样解决 X » = remontée mature. Sans solution = perçu comme se défausser.',
    tipEn:
      'Golden Chinese pro rule: if you raise A problem, also raise a proposed solution. «我有一个问题，我建议这样解决 X» = mature escalation. Without solution = seen as passing the buck.'
  },
  {
    id: 'b21-data-pres',
    title: 'Présenter des résultats avec données',
    titleEn: 'Present results with data',
    body:
      'Introduire : 根据我们的数据 (selon nos données). Verbes : 增长 (croissance), 下降 (baisse), 保持 (maintenir), 超过 (dépasser), 达到 (atteindre). Quantifier : 增长了 X 个百分点 = augmentation de X points (≠ X% — différence subtile mais importante). Comparer : 比上个季度 X (vs trimestre précédent). Souligner : 值得注意的是 X (ce qui est notable c\'est X). Conclure : 总体来看 (globalement), 数据显示 X (les données montrent X). Astuce : phrase nuancée — 这个数据需要进一步分析 (ces données méritent plus d\'analyse) — montre la prudence intellectuelle, valorisée en pro chinois.',
    bodyEn:
      'Introduce: 根据我们的数据 (based on our data). Verbs: 增长 (growth), 下降 (decline), 保持 (maintain), 超过 (exceed), 达到 (reach). Quantify: 增长了 X 个百分点 = increased X percentage points (≠ X% — subtle but important). Compare: 比上个季度 X (vs last quarter). Highlight: 值得注意的是 X (notable is X). Close: 总体来看 (overall), 数据显示 X (data shows X). Nuanced phrase: 这个数据需要进一步分析 (this data deserves more analysis) — shows intellectual caution, valued in Chinese pro settings.',
    items: [
      { hanzi: '数据', pinyin: 'shù jù', meaning: 'données', meaningEn: 'data', audio: 'audio/hsk5/hsk5_数据.wav' },
      { hanzi: '增长', pinyin: 'zēng zhǎng', meaning: 'croissance', meaningEn: 'growth', audio: 'audio/hsk5/hsk5_增长.wav' },
      { hanzi: '下降', pinyin: 'xià jiàng', meaning: 'baisse', meaningEn: 'decline', audio: 'audio/hsk5/hsk5_下降.wav' },
      { hanzi: '百分点', pinyin: 'bǎi fēn diǎn', meaning: 'point de pourcentage', meaningEn: 'percentage point', audio: 'audio/hsk6/hsk6_百分点.wav' },
      { hanzi: '分析', pinyin: 'fēn xī', meaning: 'analyser', meaningEn: 'analyze', audio: 'audio/hsk4/hsk4_分析.wav' }
    ],
    tip:
      'Distinction CRITIQUE : « 增长了 5%% » (= +5%) ≠ « 增长了 5 个百分点 » (= passé de X% à X+5%). Confondre dans un rapport pro = erreur lourde, à éviter absolument.',
    tipEn:
      'CRITICAL distinction: «增长了 5%%» (= +5%) ≠ «增长了 5 个百分点» (= went from X% to X+5%). Mixing them in a pro report = serious mistake, absolutely avoid.'
  }
];

export const b21ConvM4LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b21-conflit',
    title: 'Gérer un conflit pro avec calme',
    titleEn: 'Handle a professional conflict calmly',
    body:
      'Reconnaître la tension : 我感觉我们之间有一些误会 (j\'ai l\'impression qu\'il y a un malentendu). Inviter à la discussion : 我们能不能坐下来好好聊一下 ? (peut-on s\'asseoir pour en discuter ?). Astuce : 误会 (wùhuì, malentendu) est le mot-clé — il EXTÉRIORISE la cause sans accuser. Règle : préfère TOUJOURS « il y a un malentendu » à « tu as fait une erreur ». Pour exposer ton point : 从我的角度看 X, 让我们澄清一下 (clarifions). Pour reconnaître ta part : 我也有责任 (j\'ai aussi ma part). Remarque : en culture chinoise, partager la responsabilité 50/50 conclut souvent un conflit même quand l\'autre a 80% de torts.',
    bodyEn:
      'Acknowledge tension: 我感觉我们之间有一些误会 (I feel there\'s a misunderstanding). Invite discussion: 我们能不能坐下来好好聊一下？(can we sit down to discuss?). 误会 (wùhuì, misunderstanding) is the key word: it EXTERNALIZES the cause without accusing. Always prefer «there\'s a misunderstanding» over «you made a mistake». To state your point: 从我的角度看 X, 让我们澄清一下 (let\'s clarify). To own your part: 我也有责任 (I also bear responsibility). In Chinese culture, splitting responsibility 50/50 often closes a conflict even when the other is 80% at fault.',
    items: [
      { hanzi: '误会', pinyin: 'wù huì', meaning: 'malentendu', meaningEn: 'misunderstanding', audio: 'audio/hsk4/hsk4_误会.wav' },
      { hanzi: '澄清', pinyin: 'chéng qīng', meaning: 'clarifier', meaningEn: 'clarify', audio: 'audio/hsk6/hsk6_澄清.wav' },
      { hanzi: '责任', pinyin: 'zé rèn', meaning: 'responsabilité', meaningEn: 'responsibility', audio: 'audio/hsk4/hsk4_责任.wav' },
      { hanzi: '解决', pinyin: 'jiě jué', meaning: 'résoudre', meaningEn: 'resolve', audio: 'audio/hsk4/hsk4_解决.wav' },
      { hanzi: '冷静', pinyin: 'lěng jìng', meaning: 'calme', meaningEn: 'calm', audio: 'audio/hsk5/hsk5_冷静.wav' }
    ],
    tip:
      'Phrase magique en conflit chinois : « 我们之间有些误会 » (il y a un malentendu entre nous). Personne n\'est désigné coupable, donc personne ne perd la face. Désamorce souvent en 1 phrase.',
    tipEn:
      'Magic phrase in Chinese conflict: «我们之间有些误会» (there\'s a misunderstanding between us). No one is named guilty, so no one loses face. Often defuses in 1 phrase.'
  },
  {
    id: 'b21-mediator',
    title: 'Jouer le médiateur entre 2 collègues',
    titleEn: 'Mediate between 2 colleagues',
    body:
      'Position neutre : 我不想偏袒任何一方 (je ne veux pas prendre parti). Remarque : 偏袒 (piāntǎn, favoriser) est un mot lourd, à utiliser pour signaler ta neutralité. Inviter chacun à exprimer : 你先说，我听 / 现在轮到你 (à toi maintenant). Synthétiser : 我听到的是 X，对吗 ? (ce que j\'entends c\'est X, correct ?). Proposer un terrain commun : 我们能不能找一个双方都能接受的方案 ? (on peut chercher une solution acceptable pour les deux ?). Astuce : 双方 (les deux parties) est le mot-clé. Conclure : 这件事就到这里 (l\'affaire s\'arrête là) — invite chacun à passer à autre chose.',
    bodyEn:
      'Neutral stance: 我不想偏袒任何一方 (I don\'t want to take sides). 偏袒 (piāntǎn, favor) is a heavy word, use to signal your neutrality. Invite each to speak: 你先说，我听 / 现在轮到你 (your turn). Synthesize: 我听到的是 X，对吗？(what I heard is X, correct?). Propose common ground: 我们能不能找一个双方都能接受的方案？(can we find a solution both sides accept?). 双方 (both parties) is key. Close: 这件事就到这里 (this case stops here) — invites each to move on.',
    items: [
      { hanzi: '偏袒', pinyin: 'piān tǎn', meaning: 'favoriser, prendre parti', meaningEn: 'be partial', audio: 'audio/hsk6/hsk6_偏袒.wav' },
      { hanzi: '中立', pinyin: 'zhōng lì', meaning: 'neutre', meaningEn: 'neutral', audio: 'audio/hsk6/hsk6_中立.wav' },
      { hanzi: '双方', pinyin: 'shuāng fāng', meaning: 'les deux parties', meaningEn: 'both parties', audio: 'audio/hsk5/hsk5_双方.wav' },
      { hanzi: '接受', pinyin: 'jiē shòu', meaning: 'accepter', meaningEn: 'accept', audio: 'audio/hsk4/hsk4_接受.wav' },
      { hanzi: '轮到', pinyin: 'lún dào', meaning: 'à son tour', meaningEn: 'one\'s turn', audio: 'audio/hsk6/hsk6_轮.wav' }
    ],
    tip:
      'Si tu médies entre Chinois, ne t\'attache PAS à trouver « qui a raison ». Cherche un compromis OPÉRATIONNEL. La culture chinoise valorise la paix sociale > la justice de surface.',
    tipEn:
      'When mediating between Chinese, DON\'T fixate on «who\'s right». Seek an OPERATIONAL compromise. Chinese culture values social peace > surface justice.'
  }
];

export const b21ConvM5LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b21-networking',
    title: 'Networking pro et premier contact',
    titleEn: 'Pro networking and first contact',
    body:
      'Aborder : 不好意思，可以加您一下微信吗 ? (excusez, je peux vous ajouter sur WeChat ?). Remarque : le QR code WeChat = la carte de visite chinoise moderne. Présenter : 我是 X 公司的 X，我做 X (je suis X de l\'entreprise X, je travaille en X). Trouver un point commun : 我们都做 X (on fait tous les deux X). Pour l\'après-rencontre : 很高兴认识您 (ravi de faire votre connaissance), 以后多联系 (on garde contact). Sur WeChat juste après : 您好，我是今天活动认识的 X (bonjour, je suis X rencontré à l\'événement). Attention : sans ce message dans les 24 h, ton ajout est oublié.',
    bodyEn:
      'Approach: 不好意思，可以加您一下微信吗？(excuse me, may I add you on WeChat?). The WeChat QR code = the modern Chinese business card. Introduce: 我是 X 公司的 X，我做 X (I\'m X from X company, I work in X). Find common ground: 我们都做 X (we both do X). After meeting: 很高兴认识您 (nice to meet you), 以后多联系 (let\'s stay in touch). On WeChat right after: 您好，我是今天活动认识的 X (hello, I\'m X met at today\'s event). Without this message within 24h, your add is forgotten.',
    items: [
      { hanzi: '加微信', pinyin: 'jiā wēi xìn', meaning: 'ajouter sur WeChat', meaningEn: 'add on WeChat', audio: 'audio/hsk5/hsk5_微信.wav' },
      { hanzi: '认识', pinyin: 'rèn shi', meaning: 'connaître, faire connaissance', meaningEn: 'know, meet', audio: 'audio/hsk1/hsk1_认识.wav' },
      { hanzi: '联系', pinyin: 'lián xì', meaning: 'contacter', meaningEn: 'contact', audio: 'audio/hsk4/hsk4_联系.wav' },
      { hanzi: '活动', pinyin: 'huó dòng', meaning: 'événement, activité', meaningEn: 'event', audio: 'audio/hsk4/hsk4_活动.wav' },
      { hanzi: '名片', pinyin: 'míng piàn', meaning: 'carte de visite', meaningEn: 'business card', audio: 'audio/hsk5/hsk5_名片.wav' }
    ],
    tip:
      'Ajouter qqn sur WeChat = pas grand-chose. Le LIEN SE CRÉE dans les 48 h via 1-2 messages personnalisés. Sans suivi, le contact dort à jamais. Discipline networking n°1 en Chine.',
    tipEn:
      'Adding someone on WeChat = nothing much. The CONNECTION FORMS in the next 48h via 1-2 personalized messages. Without follow-up, the contact sleeps forever. Chinese networking discipline n°1.'
  },
  {
    id: 'b21-wechat-pro',
    title: 'Maintenir une relation pro sur WeChat',
    titleEn: 'Maintain a pro relationship on WeChat',
    body:
      'Règle : wishes saisonniers — 中秋节快乐 / 春节快乐 envoyés à TOUTES les relations pro chinoises ; absence = note négative. Anniversaire : noter le 生日 visible sur WeChat et envoyer 生日快乐 + emoji. Échanges utiles : 看到这篇文章，想到你 + lien (j\'ai vu cet article, j\'ai pensé à toi). Demander un service après long silence : 不好意思打扰您，最近有件事想麻烦您 + précision. Astuce : phrase qui sauve — 好久没联系，希望您一切都好 (longtemps sans contact, j\'espère que tout va bien). Réinitialise une relation pro endormie poliment.',
    bodyEn:
      'Seasonal wishes: 中秋节快乐 / 春节快乐 (sent to ALL Chinese pro contacts; absence = negative mark). Birthday: note the 生日 visible on WeChat and send 生日快乐 + emoji. Useful exchanges: 看到这篇文章，想到你 + link (saw this article, thought of you). Ask a favor after long silence: 不好意思打扰您，最近有件事想麻烦您 + detail. Lifesaver phrase: 好久没联系，希望您一切都好 (long time no chat, hope you\'re well). Politely resets a dormant pro relationship.',
    items: [
      { hanzi: '中秋节', pinyin: 'zhōng qiū jié', meaning: 'fête de la mi-automne', meaningEn: 'Mid-Autumn festival', audio: 'audio/hsk4/hsk4_中秋节.wav' },
      { hanzi: '春节', pinyin: 'chūn jié', meaning: 'Nouvel An chinois', meaningEn: 'Chinese New Year', audio: 'audio/hsk2/hsk2_春节.wav' },
      { hanzi: '打扰', pinyin: 'dǎ rǎo', meaning: 'déranger', meaningEn: 'disturb', audio: 'audio/hsk4/hsk4_打扰.wav' },
      { hanzi: '好久', pinyin: 'hǎo jiǔ', meaning: 'longtemps', meaningEn: 'a long time', audio: 'audio/hsk2/hsk2_好久.wav' },
      { hanzi: '一切', pinyin: 'yí qiè', meaning: 'tout', meaningEn: 'everything', audio: 'audio/hsk5/hsk5_一切.wav' }
    ],
    tip:
      'Envoie 中秋节快乐 le matin du jour J (pas en avance, pas en retard). Petit message + emoji 🌕. Ton réseau te garde 1 an de plus en mémoire grâce à ce simple geste annuel.',
    tipEn:
      'Send 中秋节快乐 on the morning of the day (not early, not late). Small message + 🌕 emoji. Your network remembers you for another year thanks to this simple annual gesture.'
  }
];

export const b21ConvM6LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b21-formal-speech',
    title: 'Discours formel : ouvrir et clôturer',
    titleEn: 'Formal speech: open and close',
    body:
      'Ouvrir : 各位领导，各位同事，下午好 (mesdames et messieurs les responsables, chers collègues, bonjour). Remarque : le hello 各位 (chacun de vous) + hiérarchie est culturellement attendu. Reconnaître l\'audience : 非常感谢大家今天能抽时间参加 (merci d\'avoir pris le temps de venir). Annoncer le sujet : 今天我想跟大家分享 X. Clôturer : 我的发言到此结束 (mon discours s\'achève ici), 谢谢大家的聆听 (merci de votre écoute attentive). Astuce : phrase de conclusion typique — 希望今天的内容对大家有所帮助 (j\'espère que ce contenu vous a été utile). Très formel, très chinois.',
    bodyEn:
      'Open: 各位领导，各位同事，下午好 (esteemed leaders, dear colleagues, good afternoon). The 各位 (each of you) + hierarchy hello is culturally expected. Acknowledge audience: 非常感谢大家今天能抽时间参加 (thanks for taking time to attend). Announce topic: 今天我想跟大家分享 X. Close: 我的发言到此结束 (my speech ends here), 谢谢大家的聆听 (thanks for your attentive listening). Typical conclusion: 希望今天的内容对大家有所帮助 (hope today\'s content was helpful). Very formal, very Chinese.',
    items: [
      { hanzi: '各位', pinyin: 'gè wèi', meaning: 'chacun de vous', meaningEn: 'each of you', audio: 'audio/hsk5/hsk5_各位.wav' },
      { hanzi: '领导', pinyin: 'lǐng dǎo', meaning: 'leader, supérieur', meaningEn: 'leader', audio: 'audio/hsk4/hsk4_领导.wav' },
      { hanzi: '抽时间', pinyin: 'chōu shí jiān', meaning: 'prendre du temps', meaningEn: 'take time', audio: 'audio/hsk4/hsk4_抽.wav' },
      { hanzi: '分享', pinyin: 'fēn xiǎng', meaning: 'partager', meaningEn: 'share', audio: 'audio/hsk5/hsk5_分享.wav' },
      { hanzi: '聆听', pinyin: 'líng tīng', meaning: 'écouter attentivement', meaningEn: 'listen attentively', audio: 'audio/hsk6/hsk6_聆听.wav' }
    ],
    tip:
      'Hierarchy d\'adresse à l\'audience : 各位领导 (responsables) en premier, puis 各位同事 (collègues), puis 各位朋友 (amis). Inverser l\'ordre = manque de respect ressenti.',
    tipEn:
      'Audience address hierarchy: 各位领导 (leaders) first, then 各位同事 (colleagues), then 各位朋友 (friends). Inverting the order = perceived lack of respect.'
  },
  {
    id: 'b21-toast',
    title: 'Porter un toast à un dîner pro',
    titleEn: 'Make a toast at a pro dinner',
    body:
      'Levée de verre : 我提议大家举杯 (je propose qu\'on lève nos verres). Dédier : 为我们的合作干杯 ! (à notre collaboration, santé !). Remarque : 干杯 (gānbēi, litt. « assécher la coupe ») = cul sec dans les vraies cérémonies, mais aujourd\'hui on tolère « 随意 » (suíyì, à votre convenance — petite gorgée). Phrases-clés : 祝大家身体健康，工作顺利 (santé et succès professionnel à tous). Pour un succès récent : 庆祝我们项目的成功 ! RÈGLE D\'OR : ne JAMAIS commencer à boire avant le toast. La séquence chinoise = leader propose → tous boivent → on peut boire ensuite. Attention : brûler l\'étape = manque de respect.',
    bodyEn:
      'Raise glasses: 我提议大家举杯 (I propose we raise our glasses). Dedicate: 为我们的合作干杯！(to our collaboration, cheers!). 干杯 (gānbēi, lit. «empty the cup») = bottoms up in real ceremonies, but today «随意» (suíyì, as you please — small sip) is tolerated. Key phrases: 祝大家身体健康，工作顺利 (health and pro success to all). For a recent success: 庆祝我们项目的成功！NEVER start drinking before the toast. Chinese sequence = leader proposes → all drink → you can drink after. Skipping the step = disrespect.',
    items: [
      { hanzi: '举杯', pinyin: 'jǔ bēi', meaning: 'lever son verre', meaningEn: 'raise the glass', audio: 'audio/hsk6/hsk6_举杯.wav' },
      { hanzi: '干杯', pinyin: 'gān bēi', meaning: 'cul sec / santé', meaningEn: 'cheers / bottoms up', audio: 'audio/hsk2/hsk2_干杯.wav' },
      { hanzi: '随意', pinyin: 'suí yì', meaning: 'à votre convenance', meaningEn: 'as you please', audio: 'audio/hsk6/hsk6_随意.wav' },
      { hanzi: '合作', pinyin: 'hé zuò', meaning: 'collaboration', meaningEn: 'collaboration', audio: 'audio/hsk4/hsk4_合作.wav' },
      { hanzi: '庆祝', pinyin: 'qìng zhù', meaning: 'célébrer', meaningEn: 'celebrate', audio: 'audio/hsk5/hsk5_庆祝.wav' }
    ],
    tip:
      'Si tu ne veux pas boire (santé, religion), dis 我以茶代酒 (je remplace l\'alcool par du thé) — formule consacrée et acceptée. Lever la tasse de thé compte. Ne pas trinquer du tout = malaise social.',
    tipEn:
      'If you don\'t want to drink (health, religion), say 我以茶代酒 (I substitute tea for alcohol) — sanctioned and accepted formula. Raising the tea cup counts. Not toasting at all = social discomfort.'
  }
];

export const b21ConvM7LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b21-cv-letter',
    title: 'Lettre de motivation et CV',
    titleEn: 'Cover letter and CV',
    body:
      'Ouverture pro : 尊敬的招聘负责人 (cher responsable de recrutement) — formule consacrée, plus formelle que 你好. Présentation : 我是 X，毕业于 X 大学，目前在 X 公司工作. Motivation : 我对贵公司的 X 项目非常感兴趣 (très intéressé par le projet X). Compétences : 我具备 X / 我有 X 经验. Conclusion : 期待您的回复 (j\'attends votre réponse) puis 此致 + 敬礼 (formule de clôture obligatoire en chinois — l\'équivalent du « cordialement »). Attention : sans 此致敬礼, ta lettre paraît incomplète/irrespectueuse en milieu pro chinois.',
    bodyEn:
      'Pro opener: 尊敬的招聘负责人 (esteemed recruiter) — sanctioned formula, more formal than 你好. Introduction: 我是 X，毕业于 X 大学，目前在 X 公司工作. Motivation: 我对贵公司的 X 项目非常感兴趣 (very interested in the X project). Skills: 我具备 X / 我有 X 经验. Conclusion: 期待您的回复 (looking forward to your reply) then 此致 + 敬礼 (mandatory Chinese closing formula — equivalent to «sincerely»). Without 此致敬礼, your letter feels incomplete/disrespectful in Chinese pro context.',
    items: [
      { hanzi: '尊敬', pinyin: 'zūn jìng', meaning: 'respecté, estimé', meaningEn: 'esteemed', audio: 'audio/hsk5/hsk5_尊敬.wav' },
      { hanzi: '招聘', pinyin: 'zhāo pìn', meaning: 'recrutement', meaningEn: 'recruitment', audio: 'audio/hsk5/hsk5_招聘.wav' },
      { hanzi: '具备', pinyin: 'jù bèi', meaning: 'posséder (compétence)', meaningEn: 'possess (skill)', audio: 'audio/hsk6/hsk6_具备.wav' },
      { hanzi: '回复', pinyin: 'huí fù', meaning: 'réponse', meaningEn: 'reply', audio: 'audio/hsk4/hsk4_回复.wav' },
      { hanzi: '此致', pinyin: 'cǐ zhì', meaning: 'cordialement (formule)', meaningEn: 'sincerely (formula)', audio: 'audio/hsk6/hsk6_此致.wav' }
    ],
    tip:
      'CV chinois : ajoute TOUJOURS une photo de toi (sérieuse, fond uni). Sans photo, ton CV semble incomplet. C\'est l\'inverse du standard occidental où la photo est devenue rare.',
    tipEn:
      'Chinese CV: ALWAYS add a serious photo of yourself (plain background). Without a photo, your CV feels incomplete. Opposite of Western standard where photos have become rare.'
  },
  {
    id: 'b21-mail-formel',
    title: 'Email pro formel : structure et formules',
    titleEn: 'Formal pro email: structure and formulas',
    body:
      'Sujet (主题) : court et clair (X 项目的进度更新). Ouverture : 您好，X (poli) ou 尊敬的 X 先生/女士 (très formel). Corps : courtoisie + objet + détail + action attendue. Relance : 不知道您是否收到了上次的邮件 (je ne sais pas si vous avez reçu mon dernier mail) — non accusateur. Demande : 麻烦您 + verbe (« merci de bien vouloir »). Règle : clôture FORMELLE — 此致 / 敬礼 ou 顺祝商祺 (vœux de prospérité commerciale — très chic). Signature : nom + titre + entreprise. Astuce : phrase magique pour conclure poliment — 期待您的回复 (j\'attends votre retour avec intérêt).',
    bodyEn:
      'Subject (主题): short and clear (X 项目的进度更新). Opening: 您好，X (polite) or 尊敬的 X 先生/女士 (very formal). Body: courtesy + object + detail + expected action. Follow-up: 不知道您是否收到了上次的邮件 (I don\'t know if you received my last email) — non-accusatory. Request: 麻烦您 + verb («kindly please»). FORMAL closing: 此致 / 敬礼 or 顺祝商祺 (wishing business prosperity — very classy). Signature: name + title + company. Magic closing phrase: 期待您的回复 (looking forward to your reply).',
    items: [
      { hanzi: '主题', pinyin: 'zhǔ tí', meaning: 'sujet', meaningEn: 'subject', audio: 'audio/hsk5/hsk5_主题.wav' },
      { hanzi: '收到', pinyin: 'shōu dào', meaning: 'recevoir', meaningEn: 'receive', audio: 'audio/hsk2/hsk2_收到.wav' },
      { hanzi: '邮件', pinyin: 'yóu jiàn', meaning: 'email', meaningEn: 'email', audio: 'audio/hsk5/hsk5_邮件.wav' },
      { hanzi: '麻烦', pinyin: 'má fan', meaning: 'déranger, demander', meaningEn: 'trouble, ask', audio: 'audio/hsk4/hsk4_麻烦.wav' },
      { hanzi: '顺祝商祺', pinyin: 'shùn zhù shāng qí', meaning: 'vœux de prospérité comm.', meaningEn: 'business prosperity wish', audio: 'audio/hsk6/hsk6_顺.wav' }
    ],
    tip:
      '« 顺祝商祺 » est la formule de clôture la plus chic en email B2B chinois. Si tu l\'utilises, ton interlocuteur sait que tu maîtrises les codes pro chinois. Effet immédiat sur la perception.',
    tipEn:
      '«顺祝商祺» is the classiest closing formula in Chinese B2B email. Using it tells your contact you master Chinese pro codes. Immediate perception boost.'
  }
];

// === NUANCES B2.1 ============================================================

export const b21NuancesM1LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b21-fanzheng-wulun',
    title: '反正 vs 无论如何 vs 不管 — peu importe',
    titleEn: '反正 vs 无论如何 vs 不管 — no matter what',
    body:
      '反正 (fǎnzheng, de toute façon, oral familier) = peu importe ce qui s\'est passé, voici la conclusion. 反正我不去 = de toute façon je n\'y vais pas. 无论如何 (wúlùn rúhé, en tout état de cause, formel) = quelles que soient les circonstances. 无论如何，我们必须完成 = en tout état de cause, on doit finir. 不管 (bùguǎn, peu importe, neutre, oral et écrit) = peu importe X, Y reste vrai. 不管下不下雨，我都去 = qu\'il pleuve ou non, j\'y vais. Règle : hierarchy de registre — 反正 (oral, attitude « peu importe je tranche ») < 不管 (neutre conditionnel) < 无论如何 (formel, engagement absolu). Attention : 反正 peut sonner fataliste/désinvolte ; 无论如何 montre la détermination.',
    bodyEn:
      '反正 (fǎnzheng, anyway, casual oral) = no matter what happened, here\'s the conclusion. 反正我不去 = anyway I\'m not going. 无论如何 (wúlùn rúhé, in any event, formal) = whatever the circumstances. 无论如何，我们必须完成 = in any event we must finish. 不管 (bùguǎn, no matter, neutral, oral and written) = no matter what X, Y still holds. 不管下不下雨，我都去 = whether it rains or not, I\'m going. Hierarchy: 反正 (oral, «whatever, I\'m deciding» attitude) < 不管 (neutral conditional) < 无论如何 (formal, absolute commitment). 反正 can sound fatalistic/dismissive; 无论如何 shows determination.',
    items: [
      { hanzi: '反正', pinyin: 'fǎn zheng', meaning: 'de toute façon', meaningEn: 'anyway', audio: 'audio/hsk5/hsk5_反正.wav' },
      { hanzi: '无论如何', pinyin: 'wú lùn rú hé', meaning: 'en tout cas (formel)', meaningEn: 'in any event', audio: 'audio/hsk6/hsk6_无论.wav' },
      { hanzi: '不管', pinyin: 'bù guǎn', meaning: 'peu importe', meaningEn: 'no matter', audio: 'audio/hsk4/hsk4_不管.wav' },
      { hanzi: '无论', pinyin: 'wú lùn', meaning: 'peu importe (formel)', meaningEn: 'no matter (formal)', audio: 'audio/hsk5/hsk5_无论.wav' },
      { hanzi: '都', pinyin: 'dōu', meaning: 'tous, en tout cas', meaningEn: 'all, in any case', audio: 'audio/hsk1/hsk1_都.wav' }
    ],
    tip:
      'En milieu pro chinois, 无论如何 sonne sérieux et engagé. 反正 sonne désinvolte. Pour un client important : « 无论如何，我们会准时交付 » (en tout cas on livrera à temps) = forte impression de fiabilité.',
    tipEn:
      'In Chinese pro settings, 无论如何 sounds serious and committed. 反正 sounds dismissive. For an important client: «无论如何，我们会准时交付» (in any event we\'ll deliver on time) = strong impression of reliability.'
  },
  {
    id: 'b21-suoyi-yinci',
    title: '所以 vs 因此 vs 因而 vs 故 — donc (registre)',
    titleEn: '所以 vs 因此 vs 因而 vs 故 — so (register)',
    body:
      '所以 (suǒyǐ, donc — NEUTRE oral et écrit). Le plus universel. 因此 (yīncǐ, par conséquent — un peu plus écrit). Sons sérieux, structurant. 因而 (yīn\'ér, de ce fait — FORMEL écrit). 故 (gù, ainsi — TRÈS FORMEL, écrit académique/juridique/littéraire, parfois poétique). Règle : hierarchy de registre — 所以 (universel) < 因此 (mixte) < 因而 (écrit) < 故 (très formel). Astuce : à l\'oral, 所以 partout. À l\'écrit pro, alterne 因此 et 因而. Attention : JAMAIS 故 à l\'oral spontané. Remarque : combo classique en démonstration — 由于 X，故 Y (étant donné X, donc Y), très juridique.',
    bodyEn:
      '所以 (suǒyǐ, so — NEUTRAL oral and written). The most universal. 因此 (yīncǐ, therefore — slightly more written). Sounds serious, structuring. 因而 (yīn\'ér, hence — FORMAL written). 故 (gù, thus — VERY FORMAL, academic/legal/literary writing, sometimes poetic). Hierarchy: 所以 (universal) < 因此 (mixed) < 因而 (written) < 故 (very formal). In speech, 所以 everywhere. In pro writing, alternate 因此 and 因而. NEVER 故 in spontaneous speech. Classic demonstration combo: 由于 X，故 Y (given X, thus Y) — very legal.',
    items: [
      { hanzi: '所以', pinyin: 'suǒ yǐ', meaning: 'donc (universel)', meaningEn: 'so (universal)', audio: 'audio/hsk2/hsk2_所以.wav' },
      { hanzi: '因此', pinyin: 'yīn cǐ', meaning: 'par conséquent', meaningEn: 'therefore', audio: 'audio/hsk4/hsk4_因此.wav' },
      { hanzi: '因而', pinyin: 'yīn ér', meaning: 'de ce fait (formel)', meaningEn: 'hence (formal)', audio: 'audio/hsk6/hsk6_因而.wav' },
      { hanzi: '故', pinyin: 'gù', meaning: 'ainsi (très formel)', meaningEn: 'thus (very formal)', audio: 'audio/hsk6/hsk6_故.wav' },
      { hanzi: '由于', pinyin: 'yóu yú', meaning: 'du fait que', meaningEn: 'due to', audio: 'audio/hsk4/hsk4_由于.wav' }
    ],
    tip:
      'En écrit B2.1+, alterne 因此/因而/从而 pour rythmer. Évite de répéter 所以 plus de 2x dans un essai — sonne oral. À l\'oral, 所以 reste imbattable.',
    tipEn:
      'In B2.1+ writing, alternate 因此/因而/从而 for rhythm. Avoid repeating 所以 more than 2x in an essay — sounds spoken. In speech, 所以 remains unbeatable.'
  }
];

export const b21NuancesM2LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b21-zhiyu-guanyu',
    title: '至于 vs 关于 vs 对于 — quant à / concernant',
    titleEn: '至于 vs 关于 vs 对于 — as for / concerning',
    body:
      '关于 (guānyú, concernant) introduit le SUJET d\'une discussion. 关于这个问题，我有几点想法 = concernant cette question, j\'ai quelques idées. Sert à OUVRIR un sujet. 对于 (duìyú, à l\'égard de, vis-à-vis de) introduit la POSITION sur un sujet. 对于这个问题，我的态度是… = vis-à-vis de cette question, ma position est… Plus engageant. 至于 (zhìyú, quant à) introduit un CHANGEMENT de sujet/aspect. 这是大原则。至于细节，我们以后讨论 = c\'est le grand principe. Quant aux détails, on en discute plus tard. Astuce : 至于 marque une transition organisée. Attention : erreur classique — confondre 关于 (sujet) et 对于 (position).',
    bodyEn:
      '关于 (guānyú, concerning) introduces the TOPIC of a discussion. 关于这个问题，我有几点想法 = on this question, I have some thoughts. Used to OPEN a topic. 对于 (duìyú, regarding, vis-à-vis) introduces the POSITION on a topic. 对于这个问题，我的态度是… = on this question, my stance is… More committing. 至于 (zhìyú, as for) introduces a SHIFT of topic/aspect. 这是大原则。至于细节，我们以后讨论 = that\'s the big principle. As for details, we\'ll discuss later. 至于 marks an organized transition. Common mistake: confusing 关于 (topic) and 对于 (position).',
    items: [
      { hanzi: '关于', pinyin: 'guān yú', meaning: 'concernant', meaningEn: 'concerning', audio: 'audio/hsk3/hsk3_关于.wav' },
      { hanzi: '对于', pinyin: 'duì yú', meaning: 'vis-à-vis de', meaningEn: 'regarding', audio: 'audio/hsk4/hsk4_对于.wav' },
      { hanzi: '至于', pinyin: 'zhì yú', meaning: 'quant à', meaningEn: 'as for', audio: 'audio/hsk5/hsk5_至于.wav' },
      { hanzi: '态度', pinyin: 'tài dù', meaning: 'attitude, position', meaningEn: 'attitude', audio: 'audio/hsk4/hsk4_态度.wav' },
      { hanzi: '原则', pinyin: 'yuán zé', meaning: 'principe', meaningEn: 'principle', audio: 'audio/hsk5/hsk5_原则.wav' }
    ],
    tip:
      'Test rapide : peut-on remplacer par « concernant » → 关于. Par « ma position sur » → 对于. Par « quant à (transition vers un autre point) » → 至于. Mémoriser comme un trio organisé.',
    tipEn:
      'Quick test: replace with «concerning» → 关于. With «my stance on» → 对于. With «as for (transition to another point)» → 至于. Memorize as an organized trio.'
  },
  {
    id: 'b21-jisuan-chongfen',
    title: '充分 vs 充足 vs 足够 — suffisant',
    titleEn: '充分 vs 充足 vs 足够 — sufficient',
    body:
      '充分 (chōngfèn, plein, complet — adjectif/adverbe d\'INTENSITÉ). 充分准备 = bien préparer / 充分理解 = comprendre pleinement. Souvent abstrait : engagement, attention, compréhension. 充足 (chōngzú, abondant — adjectif de QUANTITÉ matérielle). 资金充足 = fonds suffisants / 阳光充足 = lumière abondante. Toujours concret. 足够 (zúgòu, assez, suffisant — adjectif/verbe SIMPLE de besoin). 时间足够 = il y a assez de temps. Le plus oral et le plus universel. Règle : hierarchy — 足够 (oral simple) < 充足 (concret abondant) < 充分 (abstrait engagé). Attention : erreur, 时间充分 ✗ → 时间足够 ✓.',
    bodyEn:
      '充分 (chōngfèn, full, complete — INTENSITY adjective/adverb). 充分准备 = thoroughly prepare / 充分理解 = fully understand. Often abstract: commitment, attention, understanding. 充足 (chōngzú, abundant — material QUANTITY adjective). 资金充足 = sufficient funds / 阳光充足 = abundant sunlight. Always concrete. 足够 (zúgòu, enough, sufficient — SIMPLE need adjective/verb). 时间足够 = there\'s enough time. Most oral and universal. Hierarchy: 足够 (simple oral) < 充足 (concrete abundant) < 充分 (abstract committed). Mistake: 时间充分 ✗ → 时间足够 ✓.',
    items: [
      { hanzi: '充分', pinyin: 'chōng fèn', meaning: 'pleinement', meaningEn: 'fully', audio: 'audio/hsk5/hsk5_充分.wav' },
      { hanzi: '充足', pinyin: 'chōng zú', meaning: 'abondant', meaningEn: 'abundant', audio: 'audio/hsk5/hsk5_充足.wav' },
      { hanzi: '足够', pinyin: 'zú gòu', meaning: 'suffisant', meaningEn: 'enough', audio: 'audio/hsk5/hsk5_足够.wav' },
      { hanzi: '资金', pinyin: 'zī jīn', meaning: 'fonds, capital', meaningEn: 'funds', audio: 'audio/hsk6/hsk6_资金.wav' },
      { hanzi: '理解', pinyin: 'lǐ jiě', meaning: 'comprendre', meaningEn: 'understand', audio: 'audio/hsk3/hsk3_理解.wav' }
    ],
    tip:
      'Mémoriser 3 collocations clés : 充分准备 (bien préparer), 充足资金 (fonds abondants), 足够时间 (assez de temps). Ces blocs figés sont irremplaçables.',
    tipEn:
      'Memorize 3 key collocations: 充分准备 (thoroughly prepare), 充足资金 (abundant funds), 足够时间 (enough time). These fixed blocks are irreplaceable.'
  }
];

export const b21NuancesM3LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b21-suanshi-suanle',
    title: '算是 vs 算了 vs 算上 — counter / forget / count in',
    titleEn: '算是 vs 算了 vs 算上 — counts / forget / count in',
    body:
      '算是 (suànshi) = on peut considérer comme / cela compte comme. 这算是一个不错的开始 = on peut considérer ça comme un bon début. Atténue, qualifie. 算了 (suànle) = laisse tomber, c\'est bon, OK. 算了，我自己来 = laisse, je me débrouille. Marque RENONCEMENT (pas vraiment positif). 算上 (suàn shàng) = inclure, compter dans. 把我也算上 = compte-moi aussi. Marque INCLUSION. Attention : trois sens TRÈS différents avec le même verbe-base 算 (compter, calculer). Astuce : 算是 (qualifier) ≠ 算了 (renoncer) ≠ 算上 (inclure).',
    bodyEn:
      '算是 (suànshi) = can be considered as / counts as. 这算是一个不错的开始 = this can be considered a good start. Softens, qualifies. 算了 (suànle) = forget it, OK, leave it. 算了，我自己来 = forget it, I\'ll do it myself. Marks GIVING UP (not really positive). 算上 (suàn shàng) = include, count in. 把我也算上 = count me in too. Marks INCLUSION. Three VERY different senses with the same base verb 算 (count, calculate). Remember: 算是 (qualify) ≠ 算了 (give up) ≠ 算上 (include).',
    items: [
      { hanzi: '算是', pinyin: 'suàn shi', meaning: 'considérer comme', meaningEn: 'count as', audio: 'audio/hsk5/hsk5_算.wav' },
      { hanzi: '算了', pinyin: 'suàn le', meaning: 'laisse tomber', meaningEn: 'forget it', audio: 'audio/hsk4/hsk4_算了.wav' },
      { hanzi: '算上', pinyin: 'suàn shàng', meaning: 'inclure, compter', meaningEn: 'count in', audio: 'audio/hsk4/hsk4_算.wav' },
      { hanzi: '算', pinyin: 'suàn', meaning: 'compter, calculer', meaningEn: 'count, calculate', audio: 'audio/hsk2/hsk2_算.wav' },
      { hanzi: '不错', pinyin: 'bú cuò', meaning: 'pas mal', meaningEn: 'not bad', audio: 'audio/hsk2/hsk2_不错.wav' }
    ],
    tip:
      '算了 utilisé pour soi-même = renoncer. Utilisé envers l\'autre (« 算了吧 ! ») = un peu agacé/dismissif. Ton + contexte changent tout. Prudence en pro avec un supérieur.',
    tipEn:
      '算了 used about yourself = giving up. Used toward another («算了吧!») = slightly annoyed/dismissive. Tone + context change everything. Caution in pro with a superior.'
  },
  {
    id: 'b21-jiuhua-haoba',
    title: '就这样 / 就好 / 就行 — c\'est bon comme ça',
    titleEn: '就这样 / 就好 / 就行 — that\'s fine',
    body:
      '就这样 (jiù zhèyàng) = c\'est comme ça, point final. Souvent à la fin d\'une discussion pour conclure. 就好 (jiù hǎo, c\'est bien comme ça) marque la SUFFISANCE simple. 这样就好 = c\'est bien comme ça (rien à ajouter). 就行 (jiù xíng, ça suffira) marque la FONCTIONNALITÉ. 简单一点就行 = quelque chose de simple suffit. Règle : hierarchy — 就好 (suffisant émotif) < 就行 (suffisant pratique) < 就这样 (point final, parfois sec). Astuce : pour clore poliment une commande / discussion, 就这样吧 (ajoute 吧 pour adoucir) = OK c\'est bon.',
    bodyEn:
      '就这样 (jiù zhèyàng) = that\'s how it is, final. Often at the end of a discussion to close. 就好 (jiù hǎo, that\'s fine) marks simple SUFFICIENCY. 这样就好 = that\'s good as is (nothing to add). 就行 (jiù xíng, that\'ll do) marks FUNCTIONALITY. 简单一点就行 = something simple will do. Hierarchy: 就好 (emotional sufficiency) < 就行 (practical sufficiency) < 就这样 (final, sometimes blunt). To politely close an order/discussion, 就这样吧 (add 吧 to soften) = OK we\'re good.',
    items: [
      { hanzi: '就这样', pinyin: 'jiù zhè yàng', meaning: 'c\'est comme ça', meaningEn: 'that\'s it', audio: 'audio/hsk2/hsk2_就.wav' },
      { hanzi: '就好', pinyin: 'jiù hǎo', meaning: 'c\'est bien', meaningEn: 'that\'s fine', audio: 'audio/hsk1/hsk1_好.wav' },
      { hanzi: '就行', pinyin: 'jiù xíng', meaning: 'ça suffira', meaningEn: 'that\'ll do', audio: 'audio/hsk2/hsk2_行.wav' },
      { hanzi: '吧', pinyin: 'ba', meaning: 'particule adoucissante', meaningEn: 'softener', audio: 'audio/hsk2/hsk2_吧.wav' },
      { hanzi: '简单', pinyin: 'jiǎn dān', meaning: 'simple', meaningEn: 'simple', audio: 'audio/hsk3/hsk3_简单.wav' }
    ],
    tip:
      'Au resto, après commande : « 就这样吧 » = on commande ça et c\'est bon. Sans 吧, sonne brusque. Cette particule de fin est ton AMI dans toutes les conclusions polies.',
    tipEn:
      'At a restaurant after ordering: «就这样吧» = we\'ll order this and that\'s it. Without 吧, sounds abrupt. This final particle is your FRIEND in all polite conclusions.'
  }
];

export const b21NuancesM4LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b21-zhi-jinjin',
    title: '只 vs 只是 vs 仅仅 — seulement (intensité)',
    titleEn: '只 vs 只是 vs 仅仅 — only (intensity)',
    body:
      '只 (zhǐ) = seulement (NEUTRE, oral et écrit). 我只有 100 块 = je n\'ai que 100 yuans. 只是 (zhǐshì) = seulement, simplement (atténuation, INSISTANCE sur la limitation). 我只是问问 = je demande juste comme ça. Marque la modestie ou minimisation. 仅仅 (jǐnjǐn) = seulement, ne…que (RENFORCÉ, écrit). 仅仅一年时间 = seulement un an. Plus dramatique, souligne la limite. Règle : hierarchy — 只 (neutre) < 只是 (atténuation oral) < 仅仅 (insistance écrit). Attention : 仅仅 à l\'oral spontané sonne pédant. Réserve aux écrits ou discours préparés.',
    bodyEn:
      '只 (zhǐ) = only (NEUTRAL, oral and written). 我只有 100 块 = I only have 100 yuan. 只是 (zhǐshì) = only, simply (mitigation, EMPHASIS on the limitation). 我只是问问 = I\'m just asking. Marks modesty or downplay. 仅仅 (jǐnjǐn) = only, merely (REINFORCED, written). 仅仅一年时间 = only one year. More dramatic, highlights the limit. Hierarchy: 只 (neutral) < 只是 (oral mitigation) < 仅仅 (written emphasis). Mistake: 仅仅 in spontaneous speech sounds pedantic. Reserve for writing or prepared speeches.',
    items: [
      { hanzi: '只', pinyin: 'zhǐ', meaning: 'seulement', meaningEn: 'only', audio: 'audio/hsk2/hsk2_只.wav' },
      { hanzi: '只是', pinyin: 'zhǐ shì', meaning: 'simplement', meaningEn: 'just, simply', audio: 'audio/hsk3/hsk3_只是.wav' },
      { hanzi: '仅仅', pinyin: 'jǐn jǐn', meaning: 'seulement (insistant)', meaningEn: 'merely', audio: 'audio/hsk6/hsk6_仅仅.wav' },
      { hanzi: '仅', pinyin: 'jǐn', meaning: 'seulement (formel)', meaningEn: 'only (formal)', audio: 'audio/hsk5/hsk5_仅.wav' },
      { hanzi: '不过', pinyin: 'bú guò', meaning: 'mais (atténuation)', meaningEn: 'but (mild)', audio: 'audio/hsk3/hsk3_不过.wav' }
    ],
    tip:
      '« 我只是问问 » est l\'une des phrases les plus utiles à l\'oral B2.1 — elle DÉSAMORCE la pression d\'une question (« je demande juste, sans intention »). Très polie.',
    tipEn:
      '«我只是问问» is one of the most useful B2.1 oral phrases — it DEFUSES the pressure of a question («just asking, no intent»). Very polite.'
  },
  {
    id: 'b21-buguo-buduo',
    title: '不仅 vs 不只 vs 不但 — non seulement (registre)',
    titleEn: '不仅 vs 不只 vs 不但 — not only (register)',
    body:
      '不但 (búdàn) = non seulement (NEUTRE oral et écrit, le plus universel). 不但 X 而且 Y. 不只 (bùzhǐ) = pas seulement (ORAL, plus familier). 不只我，他也喜欢 = pas seulement moi, lui aussi. 不仅 (bùjǐn) = non seulement (FORMEL écrit, plus structurant). 不仅 X 而且 Y. Règle : hierarchy — 不只 (oral) < 不但 (neutre) < 不仅 (écrit) < 不仅仅 (insistant). Astuce : à l\'oral, 不但 ou 不只. À l\'écrit B2.1+, alterne 不仅 et 不但 pour le rythme. Remarque : combo formel intensif — 不仅仅是 X 的问题 (ce n\'est pas QU\'une question de X), formule rhétorique très efficace.',
    bodyEn:
      '不但 (búdàn) = not only (NEUTRAL oral and written, most universal). 不但 X 而且 Y. 不只 (bùzhǐ) = not just (ORAL, more casual). 不只我，他也喜欢 = not just me, he too. 不仅 (bùjǐn) = not only (FORMAL written, more structuring). 不仅 X 而且 Y. Hierarchy: 不只 (oral) < 不但 (neutral) < 不仅 (written) < 不仅仅 (emphatic). In speech, 不但 or 不只. In B2.1+ writing, alternate 不仅 and 不但 for rhythm. Intense formal combo: 不仅仅是 X 的问题 (it\'s not JUST a question of X) — very effective rhetorical formula.',
    items: [
      { hanzi: '不但', pinyin: 'bú dàn', meaning: 'non seulement', meaningEn: 'not only', audio: 'audio/hsk2/hsk2_不但.wav' },
      { hanzi: '不只', pinyin: 'bù zhǐ', meaning: 'pas seulement', meaningEn: 'not just', audio: 'audio/hsk5/hsk5_不只.wav' },
      { hanzi: '不仅', pinyin: 'bù jǐn', meaning: 'non seulement (formel)', meaningEn: 'not only (formal)', audio: 'audio/hsk5/hsk5_不仅.wav' },
      { hanzi: '不仅仅', pinyin: 'bù jǐn jǐn', meaning: 'pas seulement (insistant)', meaningEn: 'not just (emphatic)', audio: 'audio/hsk6/hsk6_不仅仅.wav' },
      { hanzi: '而且', pinyin: 'ér qiě', meaning: 'mais aussi', meaningEn: 'but also', audio: 'audio/hsk3/hsk3_而且.wav' }
    ],
    tip:
      '« 这不仅仅是钱的问题 » = ce n\'est pas QU\'une question d\'argent. Formule rhétorique percutante en débat ou éditorial. Niveau B2.1+ qui montre la maîtrise.',
    tipEn:
      '«这不仅仅是钱的问题» = it\'s not JUST a money issue. Punchy rhetorical formula in debate or op-ed. B2.1+ level showing mastery.'
  }
];

export const b21NuancesM5LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b21-juran-jingran',
    title: '居然 vs 竟然 vs 偏偏 — étonnamment / précisément',
    titleEn: '居然 vs 竟然 vs 偏偏 — surprisingly / precisely',
    body:
      '居然 (jūrán, figure-toi que / contre toute attente) = surprise + souvent NÉGATIVE/incompréhension. 他居然忘了我的生日 = il a osé oublier mon anniversaire (incompréhensible). 竟然 (jìngrán, identique mais ORAL plus expressif). 你竟然来了 ! = mais tu es venu ! 偏偏 (piānpiān, justement / précisément, comme un fait exprès) = NÉGATIF surtout, marque la malchance ou la persistance. 偏偏今天下雨 = il a fallu qu\'il pleuve juste aujourd\'hui. 我说东，他偏偏要西 = je dis est, il insiste sur ouest. Règle : hierarchy — 居然 (surprise écrite/oral) ≈ 竟然 (oral expressif) ≠ 偏偏 (malchance/contrariété).',
    bodyEn:
      '居然 (jūrán, would you believe / against all odds) = surprise + often NEGATIVE/incomprehension. 他居然忘了我的生日 = he had the nerve to forget my birthday (unbelievable). 竟然 (jìngrán, identical but more expressive ORAL). 你竟然来了！= you actually came! 偏偏 (piānpiān, precisely / as if on purpose) = mostly NEGATIVE, marks bad luck or stubbornness. 偏偏今天下雨 = it had to rain today of all days. 我说东，他偏偏要西 = I say east, he insists on west. Hierarchy: 居然 (written/oral surprise) ≈ 竟然 (expressive oral) ≠ 偏偏 (bad luck/contrariness).',
    items: [
      { hanzi: '居然', pinyin: 'jū rán', meaning: 'figure-toi (surprise)', meaningEn: 'unexpectedly', audio: 'audio/hsk5/hsk5_居然.wav' },
      { hanzi: '竟然', pinyin: 'jìng rán', meaning: 'figure-toi (oral)', meaningEn: 'actually (spoken)', audio: 'audio/hsk5/hsk5_竟然.wav' },
      { hanzi: '偏偏', pinyin: 'piān piān', meaning: 'comme un fait exprès', meaningEn: 'as if on purpose', audio: 'audio/hsk6/hsk6_偏偏.wav' },
      { hanzi: '没想到', pinyin: 'méi xiǎng dào', meaning: 'inattendu', meaningEn: 'unexpected', audio: 'audio/hsk4/hsk4_没想到.wav' },
      { hanzi: '碰巧', pinyin: 'pèng qiǎo', meaning: 'par hasard', meaningEn: 'by chance', audio: 'audio/hsk5/hsk5_碰巧.wav' }
    ],
    tip:
      '偏偏 + événement = sentiment de fatalité. « 偏偏今天我有事 » = il fallait que j\'aie justement quelque chose aujourd\'hui (regret/contrariété). Très expressif, à utiliser pour donner du relief émotionnel.',
    tipEn:
      '偏偏 + event = sense of fate. «偏偏今天我有事» = I just had to have something on today of all days (regret/contrariness). Very expressive, use to add emotional relief.'
  },
  {
    id: 'b21-wushou-wuhuo',
    title: '难免 vs 必然 vs 难怪 — inévitable / pas étonnant',
    titleEn: '难免 vs 必然 vs 难怪 — inevitable / no wonder',
    body:
      '难免 (nánmiǎn, inévitable, on ne peut éviter) = quelque chose va arriver à coup sûr, souvent NÉGATIF. 学语言难免会犯错 = en apprenant une langue, on fait forcément des erreurs. Adoucit. 必然 (bìrán, nécessairement, formellement inévitable — formel) = conclusion logique forte. 这是必然的结果 = c\'est le résultat nécessaire. 难怪 (nánguài, pas étonnant) = exclamation de RÉALISATION rétrospective. 难怪你不来，原来你病了 = pas étonnant que tu ne viennes pas, en fait tu es malade. Astuce : très utile pour ponctuer une compréhension. Règle : hierarchy — 难免 (inévitable doux) < 必然 (formel logique) ; 难怪 (réalisation a posteriori).',
    bodyEn:
      '难免 (nánmiǎn, inevitable, can\'t be avoided) = something is bound to happen, often NEGATIVE. 学语言难免会犯错 = learning a language, you\'re bound to make mistakes. Softens. 必然 (bìrán, necessarily, formally inevitable — formal) = strong logical conclusion. 这是必然的结果 = it\'s the necessary result. 难怪 (nánguài, no wonder) = exclamation of retrospective REALIZATION. 难怪你不来，原来你病了 = no wonder you\'re not coming, you\'re sick. Very useful for punctuating understanding. Hierarchy: 难免 (gentle inevitable) < 必然 (formal logical); 难怪 (after-the-fact realization).',
    items: [
      { hanzi: '难免', pinyin: 'nán miǎn', meaning: 'inévitable', meaningEn: 'inevitable', audio: 'audio/hsk5/hsk5_难免.wav' },
      { hanzi: '必然', pinyin: 'bì rán', meaning: 'nécessairement', meaningEn: 'necessarily', audio: 'audio/hsk5/hsk5_必然.wav' },
      { hanzi: '难怪', pinyin: 'nán guài', meaning: 'pas étonnant', meaningEn: 'no wonder', audio: 'audio/hsk5/hsk5_难怪.wav' },
      { hanzi: '原来', pinyin: 'yuán lái', meaning: 'en fait, originellement', meaningEn: 'actually, originally', audio: 'audio/hsk4/hsk4_原来.wav' },
      { hanzi: '犯错', pinyin: 'fàn cuò', meaning: 'faire une erreur', meaningEn: 'make a mistake', audio: 'audio/hsk5/hsk5_犯.wav' }
    ],
    tip:
      '« 学语言难免会犯错 » est la phrase de réconfort universelle pour un apprenant. Si un Chinois te corrige, réponds avec un sourire « 学中文难免有错误 » = parfaitement humble.',
    tipEn:
      '«学语言难免会犯错» is the universal reassurance phrase for a learner. If a Chinese corrects you, smile and reply «学中文难免有错误» = perfectly humble.'
  }
];

export const b21NuancesM6LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b21-hekuang-kuangqie',
    title: '何况 vs 况且 vs 再说 — d\'autant plus que',
    titleEn: '何况 vs 况且 vs 再说 — moreover / on top of that',
    body:
      '何况 (hékuàng, d\'autant plus que / sans parler de — formel, RENFORCE l\'argument). 这件事连专家都不知道，何况我 ? = même les experts ne savent pas, alors moi ? Marque le fortiori. 况且 (kuàngqiě, en plus, formel écrit) = ajoute un argument supplémentaire dans une démonstration. 这个方案有风险，况且费用高 = ce plan est risqué, et en plus il coûte cher. 再说 (zàishuō, d\'ailleurs, oral) = ajoute un argument supplémentaire moins formel. 我不喜欢这部电影，再说太长了 = je n\'aime pas ce film, et puis il est trop long. Règle : hierarchy — 再说 (oral) < 况且 (formel écrit) < 何况 (à fortiori, percutant).',
    bodyEn:
      '何况 (hékuàng, all the more so / not to mention — formal, REINFORCES the argument). 这件事连专家都不知道，何况我？= even experts don\'t know, let alone me. Marks a fortiori. 况且 (kuàngqiě, moreover, formal written) = adds a supplementary argument in a demonstration. 这个方案有风险，况且费用高 = this plan is risky, and on top of that it\'s expensive. 再说 (zàishuō, besides, oral) = adds a supplementary argument less formally. 我不喜欢这部电影，再说太长了 = I don\'t like this film, besides it\'s too long. Hierarchy: 再说 (oral) < 况且 (formal written) < 何况 (a fortiori, punchy).',
    items: [
      { hanzi: '何况', pinyin: 'hé kuàng', meaning: 'd\'autant plus que', meaningEn: 'all the more so', audio: 'audio/hsk5/hsk5_何况.wav' },
      { hanzi: '况且', pinyin: 'kuàng qiě', meaning: 'en plus (formel)', meaningEn: 'moreover (formal)', audio: 'audio/hsk6/hsk6_况且.wav' },
      { hanzi: '再说', pinyin: 'zài shuō', meaning: 'd\'ailleurs (oral)', meaningEn: 'besides (oral)', audio: 'audio/hsk3/hsk3_再说.wav' },
      { hanzi: '专家', pinyin: 'zhuān jiā', meaning: 'expert', meaningEn: 'expert', audio: 'audio/hsk4/hsk4_专家.wav' },
      { hanzi: '风险', pinyin: 'fēng xiǎn', meaning: 'risque', meaningEn: 'risk', audio: 'audio/hsk5/hsk5_风险.wav' }
    ],
    tip:
      '何况 + question rhétorique = formule très puissante. « 大学生都做不到，何况小学生 ? » = même les étudiants n\'y arrivent pas, alors les élèves ? Argumentation à fortiori percutante.',
    tipEn:
      '何况 + rhetorical question = very powerful formula. «大学生都做不到，何况小学生?» = even college students can\'t, let alone elementary kids? Punchy a fortiori argument.'
  },
  {
    id: 'b21-bishi-erqie',
    title: 'Connecteurs avancés : 此外 vs 另外 vs 此外',
    titleEn: 'Advanced connectors: 此外 vs 另外',
    body:
      '另外 (lìngwài, par ailleurs / en outre — neutre, oral et écrit). 我喜欢这个，另外那个也不错 = j\'aime celui-là, et par ailleurs l\'autre est bien aussi. Polyvalent. 此外 (cǐwài, en outre — formel, écrit). 这个项目有几个特点。此外，它还有 X 个优势 = ce projet a plusieurs caractéristiques. En outre, il a X avantages. Plus structuré. Attention : à l\'oral, JAMAIS 此外 (sonne pédant). Astuce : à l\'écrit B2.1+, 此外 est l\'outil n°1 pour ENCHAÎNER les arguments dans un essai/rapport. Remarque : combo classique — 首先 X，其次 Y，此外 Z (premièrement X, deuxièmement Y, en outre Z), structure d\'essai par excellence.',
    bodyEn:
      '另外 (lìngwài, additionally / moreover — neutral, oral and written). 我喜欢这个，另外那个也不错 = I like this one, and additionally that one is also good. Versatile. 此外 (cǐwài, in addition — formal, written). 这个项目有几个特点。此外，它还有 X 个优势 = this project has several features. In addition, it has X advantages. More structured. In speech, NEVER 此外 (sounds pedantic). In B2.1+ writing, 此外 is the n°1 tool for CHAINING arguments in an essay/report. Classic combo: 首先 X，其次 Y，此外 Z (firstly X, secondly Y, in addition Z) — essay structure par excellence.',
    items: [
      { hanzi: '另外', pinyin: 'lìng wài', meaning: 'par ailleurs', meaningEn: 'additionally', audio: 'audio/hsk4/hsk4_另外.wav' },
      { hanzi: '此外', pinyin: 'cǐ wài', meaning: 'en outre (formel)', meaningEn: 'in addition (formal)', audio: 'audio/hsk5/hsk5_此外.wav' },
      { hanzi: '首先', pinyin: 'shǒu xiān', meaning: 'd\'abord', meaningEn: 'firstly', audio: 'audio/hsk3/hsk3_首先.wav' },
      { hanzi: '其次', pinyin: 'qí cì', meaning: 'ensuite', meaningEn: 'secondly', audio: 'audio/hsk5/hsk5_其次.wav' },
      { hanzi: '最后', pinyin: 'zuì hòu', meaning: 'enfin, à la fin', meaningEn: 'finally', audio: 'audio/hsk3/hsk3_最后.wav' }
    ],
    tip:
      'Pour structurer un essai B2+ : 首先 (1°) → 其次 (2°) → 此外 (3°, ajout) → 最后 (4°/conclusion). Cette structure est CULTURELLEMENT attendue dans les écrits académiques chinois.',
    tipEn:
      'To structure a B2+ essay: 首先 (1st) → 其次 (2nd) → 此外 (3rd, addition) → 最后 (4th/conclusion). This structure is CULTURALLY expected in Chinese academic writing.'
  }
];

export const b21NuancesM7LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b21-fangbu-fanger',
    title: '反而 vs 反倒 vs 却 — au contraire',
    titleEn: '反而 vs 反倒 vs 却 — on the contrary',
    body:
      '反而 (fǎn\'ér, au contraire — neutre/oral standard) = inverse l\'attente. 我以为他会生气，他反而笑了 = je pensais qu\'il se fâcherait, au contraire il a ri. 反倒 (fǎndào, oral familier) = même sens, ton plus familier/expressif. 我以为他帮我，他反倒批评我 = je pensais qu\'il m\'aiderait, au contraire il m\'a critiqué. 却 (què, mais cependant — adverbe avant le verbe, plus écrit) = simple opposition légère. 他答应了，却没来 = il a accepté, mais n\'est pas venu. Règle : différence — 反而/反倒 INVERSE l\'attente (surprise) ; 却 = simple contraste sans surprise.',
    bodyEn:
      '反而 (fǎn\'ér, on the contrary — neutral/standard oral) = inverts expectation. 我以为他会生气，他反而笑了 = I thought he\'d be angry, on the contrary he laughed. 反倒 (fǎndào, casual oral) = same meaning, more colloquial/expressive tone. 我以为他帮我，他反倒批评我 = I thought he\'d help me, on the contrary he criticized me. 却 (què, however — adverb before verb, more written) = simple mild opposition. 他答应了，却没来 = he agreed, but didn\'t come. Difference: 反而/反倒 = INVERTS expectation (surprise); 却 = simple contrast without surprise.',
    items: [
      { hanzi: '反而', pinyin: 'fǎn ér', meaning: 'au contraire', meaningEn: 'on the contrary', audio: 'audio/hsk4/hsk4_反而.wav' },
      { hanzi: '反倒', pinyin: 'fǎn dào', meaning: 'au contraire (oral)', meaningEn: 'on the contrary (oral)', audio: 'audio/hsk6/hsk6_反.wav' },
      { hanzi: '却', pinyin: 'què', meaning: 'mais cependant', meaningEn: 'however', audio: 'audio/hsk4/hsk4_却.wav' },
      { hanzi: '相反', pinyin: 'xiāng fǎn', meaning: 'à l\'inverse', meaningEn: 'on the contrary', audio: 'audio/hsk4/hsk4_相反.wav' },
      { hanzi: '答应', pinyin: 'dā ying', meaning: 'accepter, promettre', meaningEn: 'agree, promise', audio: 'audio/hsk4/hsk4_答应.wav' }
    ],
    tip:
      '反而 + verbe = retournement de situation. À utiliser pour souligner un effet inattendu. « 他越说越糊涂，反而让人更加困惑 » = plus il parle, plus c\'est confus, créant encore plus de perplexité. Très expressif.',
    tipEn:
      '反而 + verb = reversal of situation. Use to emphasize an unexpected effect. «他越说越糊涂，反而让人更加困惑» = the more he talks, the more confused it gets, creating even more perplexity. Very expressive.'
  },
  {
    id: 'b21-yueyue-eryue',
    title: '越来越 vs 越…越 — de plus en plus',
    titleEn: '越来越 vs 越…越 — more and more',
    body:
      '越来越 + adjectif/verbe = de plus en plus. 天气越来越冷 = il fait de plus en plus froid. Marque une PROGRESSION continue. La structure la plus courante. 越 X 越 Y = plus X, plus Y (DEUX variables qui augmentent ensemble). 越说越生气 = plus on en parle, plus on s\'énerve. RÈGLE D\'OR : différence — 越来越 = UNE variable progresse ; 越…越 = relation entre DEUX variables. Attention : erreur classique, 越来越说越来越生气 ✗ → 越说越生气 ✓. Remarque : variantes formelles — 日益 (rìyì, de jour en jour, formel écrit). 经济日益发展 = l\'économie se développe de jour en jour. 与日俱增 (chengyu : croître chaque jour).',
    bodyEn:
      '越来越 + adjective/verb = more and more. 天气越来越冷 = the weather is getting colder. Marks continuous PROGRESSION. Most common structure. 越 X 越 Y = the more X, the more Y (TWO variables increasing together). 越说越生气 = the more we talk, the angrier we get. Difference: 越来越 = ONE variable progresses; 越…越 = relation between TWO variables. Common mistake: 越来越说越来越生气 ✗ → 越说越生气 ✓. Formal variants: 日益 (rìyì, day by day, formal written). 经济日益发展 = the economy develops day by day. 与日俱增 (chengyu: grows day by day).',
    items: [
      { hanzi: '越来越', pinyin: 'yuè lái yuè', meaning: 'de plus en plus', meaningEn: 'more and more', audio: 'audio/hsk3/hsk3_越来越.wav' },
      { hanzi: '越…越', pinyin: 'yuè yuè', meaning: 'plus…plus', meaningEn: 'the more…the more', audio: 'audio/hsk3/hsk3_越.wav' },
      { hanzi: '日益', pinyin: 'rì yì', meaning: 'de jour en jour', meaningEn: 'day by day', audio: 'audio/hsk6/hsk6_日益.wav' },
      { hanzi: '生气', pinyin: 'shēng qì', meaning: 'se fâcher', meaningEn: 'get angry', audio: 'audio/hsk3/hsk3_生气.wav' },
      { hanzi: '增加', pinyin: 'zēng jiā', meaning: 'augmenter', meaningEn: 'increase', audio: 'audio/hsk4/hsk4_增加.wav' }
    ],
    tip:
      'Phrase poétique : « 越是简单的事情越是难做好 » = plus une chose est simple, plus elle est difficile à bien faire. Sentence philosophique chinoise très utilisée — cite-la pour montrer ta réflexion.',
    tipEn:
      'Poetic phrase: «越是简单的事情越是难做好» = the simpler a thing, the harder to do well. Very-used Chinese philosophical maxim — cite it to show your reflection.'
  }
];
