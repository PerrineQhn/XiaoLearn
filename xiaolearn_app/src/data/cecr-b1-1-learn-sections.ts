/**
 * cecr-b1-1-learn-sections.ts — contenu pédagogique manuel pour les 25 leçons B1.1.
 * Injecté dans cecr-course.ts via `learnSections: ...` sur chaque `LessonModule`.
 *
 * Règle produit : tous les `audio` pointent vers un fichier MP3/WAV pré-généré
 * (Azure Neural TTS — cf. xiaolearn_audio_policy). Convention :
 *   audio/hsk{N}/hsk{N}_{hanzi}.wav  (N = niveau HSK réel du mot)
 */

import type { LessonV2LearnSection } from '../types/lesson-learn';

// ═════════════════════════════════════════════════════════════════════════════
// Grammaire B1.1 — 了 · 把 · 被 · 的/地/得 · 是…的 · 就/才
// ═════════════════════════════════════════════════════════════════════════════

// --- cecr-b11-le-m1 — 了 changement d'état ---------------------------------
export const b11LeStateChangeLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-le-state-signal',
    title: '了 final = « maintenant c\'est devenu… »',
    titleEn: '了 at the end = "now it has become…"',
    body:
      'Placé à la FIN d\'une phrase (pas accolé au verbe), 了 signale un changement d\'état ou de situation. 我饿 décrit un état neutre ; 我饿了 affirme un changement : avant non, maintenant oui. De même 他是老师 (fait) → 他是老师了 (il l\'est DEVENU). Cherche toujours ce « voilà, les choses ont basculé ».',
    bodyEn:
      'Placed at the END of the sentence (not glued to the verb), 了 signals a change of state or situation. 我饿 describes a neutral state; 我饿了 claims a shift: not before, now yes. Same with 他是老师 (fact) → 他是老师了 (he HAS BECOME one). Always look for this "now things have flipped" reading.',
    items: [
      { hanzi: '饿了', pinyin: 'è le', meaning: 'avoir faim (maintenant)', meaningEn: 'hungry now', audio: 'audio/hsk3/hsk3_饿.wav' },
      { hanzi: '渴了', pinyin: 'kě le', meaning: 'avoir soif (maintenant)', meaningEn: 'thirsty now', audio: 'audio/hsk3/hsk3_渴.wav' },
      { hanzi: '累了', pinyin: 'lèi le', meaning: 'être fatigué', meaningEn: 'tired now', audio: 'audio/hsk2/hsk2_累.wav' },
      { hanzi: '下雨了', pinyin: 'xià yǔ le', meaning: 'il s\'est mis à pleuvoir', meaningEn: 'it started raining', audio: 'audio/hsk1/hsk1_下雨.wav' },
      { hanzi: '我不去了', pinyin: 'wǒ bù qù le', meaning: 'je n\'y vais plus', meaningEn: 'I\'m not going anymore', audio: 'audio/hsk1/hsk1_去.wav' }
    ],
    tip:
      'Un verbe peut porter DEUX 了 : un perfectif après V + un final en fin de phrase. 我吃了三个苹果了 = j\'ai déjà mangé 3 pommes (et c\'est clos maintenant).',
    tipEn:
      'A verb can carry TWO 了s: perfective after V + final at the end. 我吃了三个苹果了 = I\'ve eaten 3 apples (done for now).'
  },
  {
    id: 'b11-le-state-negation',
    title: 'Nier un changement : 不 + V + 了',
    titleEn: 'Negating a change: 不 + V + 了',
    body:
      'Pour nier un NOUVEAU comportement, on garde 了 final mais on place 不 devant le verbe. 我不吃肉了 = je ne mange plus de viande (avant oui, plus maintenant). Ça n\'a rien à voir avec le perfectif — c\'est une bascule d\'habitude. Jamais 没…了 : le perfectif nié perd son 了.',
    bodyEn:
      'To negate a NEW behaviour, keep final 了 but put 不 before the verb. 我不吃肉了 = I don\'t eat meat anymore (used to, not now). Nothing to do with the perfective — it\'s a habit switch. Never 没…了: a negated perfective drops its 了.',
    items: [
      { hanzi: '不吃了', pinyin: 'bù chī le', meaning: 'ne plus manger', meaningEn: 'not eating anymore', audio: 'audio/hsk1/hsk1_吃.wav' },
      { hanzi: '不去了', pinyin: 'bù qù le', meaning: 'ne plus y aller', meaningEn: 'not going anymore', audio: 'audio/hsk1/hsk1_去.wav' },
      { hanzi: '不想了', pinyin: 'bù xiǎng le', meaning: 'ne plus avoir envie', meaningEn: 'don\'t want to anymore', audio: 'audio/hsk1/hsk1_想.wav' },
      { hanzi: '老了', pinyin: 'lǎo le', meaning: 'avoir vieilli', meaningEn: 'gotten old', audio: 'audio/hsk1/hsk1_老.wav' },
      { hanzi: '好了', pinyin: 'hǎo le', meaning: 'c\'est bon / ça va', meaningEn: 'it\'s fine now', audio: 'audio/hsk1/hsk1_好.wav' }
    ]
  }
];

// --- cecr-b11-le-m2 — 了 quantité atteinte ---------------------------------
export const b11LeDurationLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-le-duration-double',
    title: 'Double 了 : action qui CONTINUE',
    titleEn: 'Double 了: ongoing action',
    body:
      'Structure : S + V + 了 + quantité/durée + 了. 我学了两年中文了 = j\'étudie le chinois depuis 2 ans (et je continue). Le premier 了 marque l\'action accomplie, le second 了 signale que le compteur tourne encore. Sans le second 了, l\'action est close : 我学了两年中文 = j\'ai étudié 2 ans (c\'est fini).',
    bodyEn:
      'Structure: S + V + 了 + quantity/duration + 了. 我学了两年中文了 = I\'ve been studying Chinese for 2 years (and continuing). First 了 marks the completed action, second 了 signals the clock is still running. Without the second 了, action is closed: 我学了两年中文 = I studied for 2 years (over).',
    items: [
      { hanzi: '学了', pinyin: 'xué le', meaning: 'avoir étudié', meaningEn: 'studied', audio: 'audio/hsk1/hsk1_学.wav' },
      { hanzi: '工作', pinyin: 'gōng zuò', meaning: 'travailler', meaningEn: 'work', audio: 'audio/hsk1/hsk1_工作.wav' },
      { hanzi: '等', pinyin: 'děng', meaning: 'attendre', meaningEn: 'wait', audio: 'audio/hsk2/hsk2_等.wav' },
      { hanzi: '已经', pinyin: 'yǐ jīng', meaning: 'déjà', meaningEn: 'already', audio: 'audio/hsk2/hsk2_已经.wav' },
      { hanzi: '多久', pinyin: 'duō jiǔ', meaning: 'combien de temps', meaningEn: 'how long', audio: 'audio/hsk3/hsk3_多久.wav' }
    ],
    tip:
      'Combine avec 已经 pour intensifier : 我已经等了半小时了 = ça fait déjà une demi-heure que j\'attends (sous-entendu : ça commence à faire long).',
    tipEn:
      'Pair with 已经 for emphasis: 我已经等了半小时了 = I\'ve been waiting half an hour already (implying: long enough).'
  }
];

// --- cecr-b11-le-m3 — 了 récap --------------------------------------------
export const b11LeRecapLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-le-recap-positions',
    title: '3 positions → 3 sens',
    titleEn: '3 positions → 3 meanings',
    body:
      'Carte mentale à coller sur le frigo. (1) V + 了 + O = perfectif, action accomplie : 我吃了饭. (2) Phrase + 了 (final) = changement d\'état : 下雨了. (3) V + 了 + quantité + 了 = action qui continue : 我学了两年中文了. La position du 了 change tout — l\'inversion « V了O了 » est la seule vraiment ambiguë et se lit au contexte.',
    bodyEn:
      'Fridge-worthy mental map. (1) V + 了 + O = perfective, completed action: 我吃了饭. (2) Sentence + 了 (final) = state change: 下雨了. (3) V + 了 + quantity + 了 = ongoing action: 我学了两年中文了. Position is everything — the "V了O了" merge is the only truly ambiguous one and needs context.',
    items: [
      { hanzi: '了', pinyin: 'le', meaning: 'particule 了', meaningEn: '了 particle', audio: 'audio/hsk1/hsk1_了.wav' },
      { hanzi: '没', pinyin: 'méi', meaning: 'négation du passé', meaningEn: 'past negation', audio: 'audio/hsk1/hsk1_没.wav' },
      { hanzi: '不', pinyin: 'bù', meaning: 'négation du présent', meaningEn: 'present negation', audio: 'audio/hsk1/hsk1_不.wav' },
      { hanzi: '还没', pinyin: 'hái méi', meaning: 'pas encore', meaningEn: 'not yet', audio: 'audio/hsk2/hsk2_还.wav' },
      { hanzi: '刚才', pinyin: 'gāng cái', meaning: 'à l\'instant', meaningEn: 'just now', audio: 'audio/hsk3/hsk3_刚才.wav' }
    ],
    tip:
      'Habitudes = JAMAIS 了. 我每天六点起床 ✓, 我每天六点起了床 ✗. Le 了 est réservé aux événements ponctuels ou aux changements, pas aux routines.',
    tipEn:
      'Habits = NEVER 了. 我每天六点起床 ✓, 我每天六点起了床 ✗. 了 is reserved for one-off events or changes, not routines.'
  }
];

// --- cecr-b11-ba-m1 — 把 construction ------------------------------------
export const b11BaUsageLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-ba-skeleton',
    title: 'S + 把 + OBJET + V + complément',
    titleEn: 'S + 把 + OBJECT + V + complement',
    body:
      'La construction 把 déplace l\'objet DEVANT le verbe pour insister sur ce qu\'il ADVIENT à cet objet. L\'objet doit être connu/spécifique (pas un générique). Et le verbe ne peut JAMAIS être nu : il doit être « complété » par 了, un résultatif, une direction ou une quantité.',
    bodyEn:
      'The 把 construction moves the object BEFORE the verb to stress what HAPPENS to that object. The object must be known/specific (not a generic). And the verb can NEVER be bare: it must be "completed" by 了, a resultative, a direction, or a quantity.',
    items: [
      { hanzi: '把', pinyin: 'bǎ', meaning: 'particule de disposition', meaningEn: 'disposal marker', audio: 'audio/hsk3/hsk3_把.wav' },
      { hanzi: '放', pinyin: 'fàng', meaning: 'poser, placer', meaningEn: 'put, place', audio: 'audio/hsk3/hsk3_放.wav' },
      { hanzi: '放在', pinyin: 'fàng zài', meaning: 'placer à', meaningEn: 'put at', audio: 'audio/hsk3/hsk3_放.wav' },
      { hanzi: '拿走', pinyin: 'ná zǒu', meaning: 'emporter', meaningEn: 'take away', audio: 'audio/hsk3/hsk3_拿.wav' },
      { hanzi: '送给', pinyin: 'sòng gěi', meaning: 'offrir à', meaningEn: 'give to', audio: 'audio/hsk2/hsk2_送.wav' }
    ],
    tip:
      'Question à se poser avant de choisir 把 : est-ce que je veux insister sur le RÉSULTAT/DEVENIR de l\'objet ? Si oui → 把. Si c\'est juste une description neutre → ordre SVO classique.',
    tipEn:
      'Ask yourself before picking 把: am I stressing the RESULT/fate of the object? If yes → 把. If it\'s a neutral description → classic SVO order.'
  }
];

// --- cecr-b11-ba-m2 — 5 compléments de 把 ---------------------------------
export const b11BaComplementsLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-ba-5-complements',
    title: 'Les 5 types de compléments qui débloquent 把',
    titleEn: 'The 5 complements that unlock 把',
    body:
      'Sans complément, 把 est agrammatical. (1) Lieu : 放在桌上. (2) Bénéficiaire : 给我. (3) Résultatif : 吃完, 写好, 洗干净. (4) Direction : 拿起来, 送过去. (5) Quantité/redoublement : 看一下, 想了想. La négation 没 se place AVANT 把, jamais après.',
    bodyEn:
      'Without a complement, 把 is ungrammatical. (1) Location: 放在桌上. (2) Beneficiary: 给我. (3) Resultative: 吃完, 写好, 洗干净. (4) Direction: 拿起来, 送过去. (5) Quantity/reduplication: 看一下, 想了想. Negation 没 goes BEFORE 把, never after.',
    items: [
      { hanzi: '吃完', pinyin: 'chī wán', meaning: 'finir de manger', meaningEn: 'finish eating', audio: 'audio/hsk2/hsk2_完.wav' },
      { hanzi: '做好', pinyin: 'zuò hǎo', meaning: 'avoir fini (bien) de faire', meaningEn: 'get done (well)', audio: 'audio/hsk1/hsk1_做.wav' },
      { hanzi: '洗干净', pinyin: 'xǐ gān jìng', meaning: 'laver proprement', meaningEn: 'wash clean', audio: 'audio/hsk3/hsk3_干净.wav' },
      { hanzi: '打扫', pinyin: 'dǎ sǎo', meaning: 'faire le ménage', meaningEn: 'clean up', audio: 'audio/hsk3/hsk3_打扫.wav' },
      { hanzi: '完成', pinyin: 'wán chéng', meaning: 'achever', meaningEn: 'complete', audio: 'audio/hsk3/hsk3_完成.wav' }
    ],
    tip:
      'Mnémo : résultatif = « verbe + adjectif/verbe-résultat ». 吃 (manger) + 完 (fini) = 吃完 (finir de manger). Cette composition permet à 把 de respirer.',
    tipEn:
      'Mnemonic: resultative = "verb + adjective/result verb". 吃 (eat) + 完 (done) = 吃完 (finish eating). This composition lets 把 breathe.'
  }
];

// --- cecr-b11-bei-m1 — passif 被 -----------------------------------------
export const b11BeiPassiveLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-bei-skeleton',
    title: 'OBJET + 被 + (agent) + V + complément',
    titleEn: 'OBJECT + 被 + (agent) + V + complement',
    body:
      '被 est le miroir de 把 : l\'objet (celui qui SUBIT) passe en tête, puis 被, puis un agent facultatif, puis le verbe avec complément obligatoire. 杯子被打破了 (le verre a été cassé) — l\'agent est omis. 我被老师批评了 (j\'ai été grondé par le prof) — agent présent. Comme 把, pas de verbe nu après 被.',
    bodyEn:
      '被 mirrors 把: the object (the one UNDERGOING) moves up front, then 被, then an optional agent, then the verb with a mandatory complement. 杯子被打破了 (the glass got broken) — agent omitted. 我被老师批评了 (I got told off by the teacher) — agent present. Like 把, no bare verb after 被.',
    items: [
      { hanzi: '被', pinyin: 'bèi', meaning: 'particule passive', meaningEn: 'passive marker', audio: 'audio/hsk3/hsk3_被.wav' },
      { hanzi: '打破', pinyin: 'dǎ pò', meaning: 'briser', meaningEn: 'break', audio: 'audio/hsk2/hsk2_打.wav' },
      { hanzi: '批评', pinyin: 'pī píng', meaning: 'critiquer', meaningEn: 'criticize', audio: 'audio/hsk4/hsk4_批评.wav' },
      { hanzi: '骂', pinyin: 'mà', meaning: 'gronder, insulter', meaningEn: 'scold', audio: 'audio/hsk4/hsk4_骂.wav' },
      { hanzi: '抓住', pinyin: 'zhuā zhù', meaning: 'attraper', meaningEn: 'catch', audio: 'audio/hsk4/hsk4_抓.wav' }
    ],
    tip:
      'Nuance culturelle : 被 garde en chinois moderne une charge NÉGATIVE (malheur subi). 他被老师表扬了 sonne étrange — on préfèrera 老师表扬了他. Pour les bonnes nouvelles, revient à l\'actif.',
    tipEn:
      'Cultural nuance: 被 keeps a NEGATIVE tint in modern Chinese (misfortune suffered). 他被老师表扬了 sounds off — prefer 老师表扬了他. For good news, go active.'
  }
];

// --- cecr-b11-de-m1 — 的 liaison -----------------------------------------
export const b11DeLinkLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-de-link-functions',
    title: '的 pointe TOUJOURS vers un nom',
    titleEn: '的 ALWAYS points to a noun',
    body:
      '4 usages, 1 règle unique : ce qui suit 的 est un nom. (1) Possessif : 我的书. (2) Adj. long + nom : 漂亮的女孩. (3) Proposition relative : 我买的书 (le livre que j\'ai acheté). (4) Nominalisation : 红的 (le rouge). Omission avec la famille/amis proches : 我妈, 我哥, 我朋友.',
    bodyEn:
      '4 uses, 1 rule: whatever follows 的 is a noun. (1) Possessive: 我的书. (2) Long adj + noun: 漂亮的女孩. (3) Relative clause: 我买的书 (the book I bought). (4) Nominalisation: 红的 (the red one). Omit with close family/friends: 我妈, 我哥, 我朋友.',
    items: [
      { hanzi: '的', pinyin: 'de', meaning: 'particule 的', meaningEn: '的 particle', audio: 'audio/hsk1/hsk1_的.wav' },
      { hanzi: '我的', pinyin: 'wǒ de', meaning: 'le mien / mon', meaningEn: 'mine / my', audio: 'audio/hsk1/hsk1_我.wav' },
      { hanzi: '他的', pinyin: 'tā de', meaning: 'le sien / son', meaningEn: 'his / his', audio: 'audio/hsk1/hsk1_他.wav' },
      { hanzi: '漂亮', pinyin: 'piào liang', meaning: 'joli', meaningEn: 'pretty', audio: 'audio/hsk1/hsk1_漂亮.wav' },
      { hanzi: '红', pinyin: 'hóng', meaning: 'rouge', meaningEn: 'red', audio: 'audio/hsk2/hsk2_红.wav' }
    ],
    tip:
      'Adjectifs monosyllabiques courants (小, 大, 好) : PAS de 的 entre adj et nom. 好朋友 ✓, 好的朋友 (grammaticalement OK mais plus précieux).',
    tipEn:
      'Common monosyllabic adjectives (小, 大, 好): NO 的 between adj and noun. 好朋友 ✓, 好的朋友 (grammatical but fussier).'
  }
];

// --- cecr-b11-de-m2 — 地 adverbe -----------------------------------------
export const b11DeAdvLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-di-adv-structure',
    title: '地 transforme un adjectif en adverbe',
    titleEn: '地 turns an adjective into an adverb',
    body:
      'Prononcé « de » (pas « dì »), 地 se glisse entre un adjectif et un verbe : adjectif + 地 + V. Redouble les monosyllabiques (慢慢地走, 好好地学), laisse tels quels les dissyllabiques (认真地工作, 安静地看). Comme pour 的, règle de pointage : 地 pointe TOUJOURS vers un verbe.',
    bodyEn:
      'Pronounced "de" (not "dì"), 地 slots between an adjective and a verb: adjective + 地 + V. Double monosyllabics (慢慢地走, 好好地学), keep dissyllabics as-is (认真地工作, 安静地看). Like 的, pointing rule: 地 ALWAYS points to a verb.',
    items: [
      { hanzi: '地', pinyin: 'de', meaning: 'particule adverbiale', meaningEn: 'adverbial particle', audio: 'audio/hsk3/hsk3_地.wav' },
      { hanzi: '慢慢', pinyin: 'màn màn', meaning: 'lentement', meaningEn: 'slowly', audio: 'audio/hsk3/hsk3_慢.wav' },
      { hanzi: '认真', pinyin: 'rèn zhēn', meaning: 'sérieusement', meaningEn: 'seriously', audio: 'audio/hsk3/hsk3_认真.wav' },
      { hanzi: '安静', pinyin: 'ān jìng', meaning: 'tranquillement', meaningEn: 'quietly', audio: 'audio/hsk3/hsk3_安静.wav' },
      { hanzi: '努力', pinyin: 'nǔ lì', meaning: 'avec effort', meaningEn: 'diligently', audio: 'audio/hsk3/hsk3_努力.wav' }
    ],
    tip:
      'Piège : à l\'écrit décontracté (forums, WeChat), les natifs écrivent souvent 的 à la place de 地. C\'est toléré mais incorrect en rédaction formelle.',
    tipEn:
      'Trap: in casual writing (forums, WeChat), natives often type 的 for 地. Tolerated but incorrect in formal writing.'
  }
];

// --- cecr-b11-de-m3 — 得 complément --------------------------------------
export const b11DeComplementLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-de-complement-rule',
    title: 'V + 得 + évaluation',
    titleEn: 'V + 得 + evaluation',
    body:
      '得 vient APRÈS le verbe et introduit un jugement sur la manière ou l\'intensité. 他跑得很快 (il court vite). 她唱得好 (elle chante bien). 我说得不清楚 (je parle pas clairement). Si un objet suit le verbe, on le duplique : 他说汉语说得很好 — ou on le met en tête : 他汉语说得很好.',
    bodyEn:
      '得 comes AFTER the verb and introduces a judgment on manner or intensity. 他跑得很快 (he runs fast). 她唱得好 (she sings well). 我说得不清楚 (I speak unclearly). If there\'s an object after the verb, you either duplicate: 他说汉语说得很好 — or front it: 他汉语说得很好.',
    items: [
      { hanzi: '得', pinyin: 'de', meaning: 'particule d\'évaluation', meaningEn: 'evaluative particle', audio: 'audio/hsk1/hsk1_得.wav' },
      { hanzi: '跑', pinyin: 'pǎo', meaning: 'courir', meaningEn: 'run', audio: 'audio/hsk2/hsk2_跑.wav' },
      { hanzi: '唱', pinyin: 'chàng', meaning: 'chanter', meaningEn: 'sing', audio: 'audio/hsk3/hsk3_唱.wav' },
      { hanzi: '写', pinyin: 'xiě', meaning: 'écrire', meaningEn: 'write', audio: 'audio/hsk1/hsk1_写.wav' },
      { hanzi: '怎么样', pinyin: 'zěn me yàng', meaning: 'comment (qualité)', meaningEn: 'how (quality)', audio: 'audio/hsk1/hsk1_怎么样.wav' }
    ],
    tip:
      'Question : V + 得 + 怎么样 ? (他跑得怎么样 ? = il court comment ?). Négation : V + 得 + 不 + adj (我睡得不好 = j\'ai mal dormi).',
    tipEn:
      'Question: V + 得 + 怎么样? (他跑得怎么样? = how does he run?). Negation: V + 得 + 不 + adj (我睡得不好 = I slept badly).'
  }
];

// --- cecr-b11-de-m4 — tri 的/地/得 --------------------------------------
export const b11DeSortingLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-de-sorting-heuristic',
    title: 'L\'heuristique infaillible',
    titleEn: 'The foolproof heuristic',
    body:
      'Trois questions, une réponse. (1) Ce qui SUIT est un nom ? → 的 (我的书, 漂亮的女孩). (2) Ce qui SUIT est un verbe ? → 地 (慢慢地走). (3) Ce qui PRÉCÈDE est un verbe suivi d\'une évaluation ? → 得 (跑得快). Applique dans cet ordre et 95 % des cas tombent.',
    bodyEn:
      'Three questions, one answer. (1) What FOLLOWS is a noun? → 的 (我的书, 漂亮的女孩). (2) What FOLLOWS is a verb? → 地 (慢慢地走). (3) What PRECEDES is a verb followed by an evaluation? → 得 (跑得快). Apply in order and 95% of cases fall into place.',
    items: [
      { hanzi: '的', pinyin: 'de', meaning: 'vers un nom', meaningEn: 'to a noun', audio: 'audio/hsk1/hsk1_的.wav' },
      { hanzi: '地', pinyin: 'de', meaning: 'vers un verbe', meaningEn: 'to a verb', audio: 'audio/hsk3/hsk3_地.wav' },
      { hanzi: '得', pinyin: 'de', meaning: 'après un verbe', meaningEn: 'after a verb', audio: 'audio/hsk1/hsk1_得.wav' }
    ],
    tip:
      'À l\'oral, les trois sonnent identiques (« de »). Ton cerveau doit décider sur la syntaxe, pas sur le son. Entraîne-toi avec des phrases écrites avant de passer à l\'écoute.',
    tipEn:
      'Orally, all three sound the same ("de"). Your brain must decide on syntax, not sound. Train on written sentences before listening drills.'
  }
];

// --- cecr-b11-shide-m1 — 是…的 -------------------------------------------
export const b11ShideLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-shide-focus',
    title: '是…的 met en relief un circonstant PASSÉ',
    titleEn: '是…的 highlights a PAST circumstance',
    body:
      'S + 是 + circonstant (quand/où/comment/avec qui) + V + 的. 我是昨天来的 (c\'est HIER que je suis venu — pas un autre jour). On ne remet pas en cause la venue, on pointe l\'élément précis. Usage uniquement passé et connu. Pour le futur ou une action toute neuve, utilise le 了 ou rien.',
    bodyEn:
      'S + 是 + circumstance (when/where/how/with whom) + V + 的. 我是昨天来的 (it\'s YESTERDAY I came — not another day). You don\'t doubt the coming, you point to a specific detail. Only for past and known events. For future or brand-new actions, use 了 or nothing.',
    items: [
      { hanzi: '是', pinyin: 'shì', meaning: 'être / focaliseur', meaningEn: 'be / focus', audio: 'audio/hsk1/hsk1_是.wav' },
      { hanzi: '昨天', pinyin: 'zuó tiān', meaning: 'hier', meaningEn: 'yesterday', audio: 'audio/hsk1/hsk1_昨天.wav' },
      { hanzi: '坐飞机', pinyin: 'zuò fēi jī', meaning: 'prendre l\'avion', meaningEn: 'fly', audio: 'audio/hsk1/hsk1_飞机.wav' },
      { hanzi: '怎么', pinyin: 'zěn me', meaning: 'comment', meaningEn: 'how', audio: 'audio/hsk1/hsk1_怎么.wav' },
      { hanzi: '跟谁', pinyin: 'gēn shuí', meaning: 'avec qui', meaningEn: 'with whom', audio: 'audio/hsk3/hsk3_跟.wav' }
    ],
    tip:
      'Objet : 2 positions possibles. V + O + 的 (我是在上海学中文的) ou V + 的 + O (我是在上海学的中文). Les deux sont corrects, la seconde est plus courante à Pékin.',
    tipEn:
      'Object: 2 possible slots. V + O + 的 (我是在上海学中文的) or V + 的 + O (我是在上海学的中文). Both OK, the second is more common in Beijing.'
  }
];

// --- cecr-b11-jiucai-m1 — 就 vs 才 --------------------------------------
export const b11JiuCaiLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-jiucai-timing',
    title: '就 = tôt/facile | 才 = tard/difficile',
    titleEn: '就 = early/easy | 才 = late/hard',
    body:
      'Les deux adverbes livrent un JUGEMENT sur le timing. 就 valorise la précocité ou la facilité : 他六点就起床了 (il était debout dès 6h), 他一看就懂 (il comprend au premier regard). 才 pointe le retard ou l\'effort : 他九点才起床 (il ne s\'est levé qu\'à 9h), 我学了三年才会说 (3 ans d\'étude avant de savoir parler).',
    bodyEn:
      'Both adverbs render a JUDGEMENT on timing. 就 praises earliness or ease: 他六点就起床了 (up already at 6am), 他一看就懂 (gets it at a glance). 才 flags lateness or effort: 他九点才起床 (didn\'t rise until 9am), 我学了三年才会说 (3 years of study to speak).',
    items: [
      { hanzi: '就', pinyin: 'jiù', meaning: 'déjà, dès, précisément', meaningEn: 'already, as early as', audio: 'audio/hsk2/hsk2_就.wav' },
      { hanzi: '才', pinyin: 'cái', meaning: 'seulement alors, tard', meaningEn: 'only then, late', audio: 'audio/hsk3/hsk3_才.wav' },
      { hanzi: '起床', pinyin: 'qǐ chuáng', meaning: 'se lever', meaningEn: 'get up', audio: 'audio/hsk2/hsk2_起床.wav' },
      { hanzi: '懂', pinyin: 'dǒng', meaning: 'comprendre', meaningEn: 'understand', audio: 'audio/hsk2/hsk2_懂.wav' },
      { hanzi: '会', pinyin: 'huì', meaning: 'savoir faire', meaningEn: 'be able to', audio: 'audio/hsk1/hsk1_会.wav' }
    ],
    tip:
      'Règle clé : 就 + passé prend 了 (他六点就来了). 才 + passé NE PREND PAS 了 (他九点才来, JAMAIS 他九点才来了). 才 contient déjà l\'idée de parcours accompli — le 了 deviendrait redondant.',
    tipEn:
      'Key rule: 就 + past takes 了 (他六点就来了). 才 + past DOES NOT take 了 (他九点才来, NEVER 他九点才来了). 才 already encodes "made it" — 了 would be redundant.'
  }
];

// ═════════════════════════════════════════════════════════════════════════════
// Travail & carrière (cecr-b11-work)
// ═════════════════════════════════════════════════════════════════════════════

// --- cecr-b11-work-m1 — Métiers & postes --------------------------------
export const b11WorkJobsLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-work-jobs-suffixes',
    title: 'Les suffixes 员 / 师 / 家',
    titleEn: 'The suffixes 员 / 师 / 家',
    body:
      'La plupart des métiers suivent un motif. 员 (yuán, membre) = exécutant : 服务员, 售货员, 销售员, 公务员. 师 (shī, maître) = expert : 老师, 律师, 厨师, 医师. 家 (jiā, spécialiste) = créateur : 作家 (écrivain), 画家 (peintre), 艺术家 (artiste). Ce repérage te permet de décoder un titre avant même d\'en connaître le sens.',
    bodyEn:
      'Most jobs follow a pattern. 员 (yuán, member) = doer: 服务员, 售货员, 销售员, 公务员. 师 (shī, master) = expert: 老师, 律师, 厨师, 医师. 家 (jiā, specialist) = creator: 作家 (writer), 画家 (painter), 艺术家 (artist). This spotting lets you decode a title before even knowing its meaning.',
    items: [
      { hanzi: '工作', pinyin: 'gōng zuò', meaning: 'travail', meaningEn: 'work', audio: 'audio/hsk1/hsk1_工作.wav' },
      { hanzi: '老板', pinyin: 'lǎo bǎn', meaning: 'patron', meaningEn: 'boss', audio: 'audio/hsk3/hsk3_老板.wav' },
      { hanzi: '经理', pinyin: 'jīng lǐ', meaning: 'manager', meaningEn: 'manager', audio: 'audio/hsk3/hsk3_经理.wav' },
      { hanzi: '同事', pinyin: 'tóng shì', meaning: 'collègue', meaningEn: 'colleague', audio: 'audio/hsk3/hsk3_同事.wav' },
      { hanzi: '律师', pinyin: 'lǜ shī', meaning: 'avocat', meaningEn: 'lawyer', audio: 'audio/hsk4/hsk4_律师.wav' },
      { hanzi: '医生', pinyin: 'yī shēng', meaning: 'médecin', meaningEn: 'doctor', audio: 'audio/hsk1/hsk1_医生.wav' }
    ],
    tip:
      'Formule « je travaille chez X » : 我在 X 工作 (action) plutôt que 我是 X 的员工 (statut). Les Chinois insistent sur l\'acte de travailler, pas sur l\'étiquette.',
    tipEn:
      '"I work at X" formula: 我在 X 工作 (action) rather than 我是 X 的员工 (status). Chinese speakers stress the act of working, not the label.'
  }
];

// --- cecr-b11-work-m2 — Réunion & agenda --------------------------------
export const b11WorkMeetingLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-work-meeting-verbs',
    title: '开会 = « ouvrir une réunion »',
    titleEn: '开会 = "open a meeting"',
    body:
      'En chinois pro, 开会 est LE verbe pour réunion. 有会 ne se dit pas. 开会 peut se décomposer avec durée ou objet inséré : 开一个小时的会 (tenir une réunion d\'une heure), 开一个会 (tenir une réunion). Le nom neutre est 会议. La clôture rituelle : 辛苦了 (littéralement « vous vous êtes fatigué », merci pour vos efforts).',
    bodyEn:
      'In pro Chinese, 开会 is THE verb for meeting. 有会 isn\'t said. 开会 can split to insert duration or object: 开一个小时的会 (hold a one-hour meeting), 开一个会 (hold a meeting). The neutral noun is 会议. Ritual closer: 辛苦了 (lit. "you\'ve worn yourself out", thanks for your efforts).',
    items: [
      { hanzi: '会议', pinyin: 'huì yì', meaning: 'réunion (nom)', meaningEn: 'meeting (noun)', audio: 'audio/hsk3/hsk3_会议.wav' },
      { hanzi: '开会', pinyin: 'kāi huì', meaning: 'tenir une réunion', meaningEn: 'hold a meeting', audio: 'audio/hsk3/hsk3_开.wav' },
      { hanzi: '讨论', pinyin: 'tǎo lùn', meaning: 'discuter', meaningEn: 'discuss', audio: 'audio/hsk3/hsk3_讨论.wav' },
      { hanzi: '决定', pinyin: 'jué dìng', meaning: 'décider', meaningEn: 'decide', audio: 'audio/hsk3/hsk3_决定.wav' },
      { hanzi: '总结', pinyin: 'zǒng jié', meaning: 'conclure, synthétiser', meaningEn: 'wrap up', audio: 'audio/hsk5/hsk5_总结.wav' },
      { hanzi: '辛苦了', pinyin: 'xīn kǔ le', meaning: 'merci pour vos efforts', meaningEn: 'thanks for the hard work', audio: 'audio/hsk4/hsk4_辛苦.wav' }
    ],
    tip:
      '辛苦了 ne se dit pas entre amis : réservé au monde pro ou au service rendu (livreur, chauffeur, collègue). Au quotidien amical, préfère 谢谢 tout court.',
    tipEn:
      '辛苦了 is not said between friends: reserved for work or service contexts (delivery driver, taxi, colleague). In everyday friendly settings, stick to 谢谢.'
  }
];

// --- cecr-b11-work-m3 — Emails formels ----------------------------------
export const b11WorkEmailLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-work-email-skeleton',
    title: 'La structure 称呼-正文-敬礼',
    titleEn: 'The 称呼-正文-敬礼 skeleton',
    body:
      'Un mail pro chinois ouvre par 尊敬的 [titre] + 您好 !, développe un corps concis (un sujet par paragraphe), clôt par 期待您的回复 puis la signature rituelle : 此致 敬礼 ! + nom. On utilise 您 (vous) partout, jamais 你. Pas d\'émojis. Mieux vaut en CC le 领导 (supérieur) en cas de doute.',
    bodyEn:
      'A pro Chinese email opens with 尊敬的 [title] + 您好!, develops a concise body (one topic per paragraph), closes with 期待您的回复 then the ritual signature: 此致 敬礼! + name. Use 您 (formal you) throughout, never 你. No emojis. Better to CC the 领导 (superior) when in doubt.',
    items: [
      { hanzi: '尊敬的', pinyin: 'zūn jìng de', meaning: 'cher (formel)', meaningEn: 'dear (formal)', audio: 'audio/hsk5/hsk5_尊敬.wav' },
      { hanzi: '您好', pinyin: 'nín hǎo', meaning: 'bonjour (poli)', meaningEn: 'hello (polite)', audio: 'audio/hsk2/hsk2_您.wav' },
      { hanzi: '感谢', pinyin: 'gǎn xiè', meaning: 'remercier', meaningEn: 'thank', audio: 'audio/hsk4/hsk4_感谢.wav' },
      { hanzi: '期待', pinyin: 'qī dài', meaning: 'attendre (avec impatience)', meaningEn: 'look forward to', audio: 'audio/hsk5/hsk5_期待.wav' },
      { hanzi: '回复', pinyin: 'huí fù', meaning: 'répondre', meaningEn: 'reply', audio: 'audio/hsk4/hsk4_回复.wav' },
      { hanzi: '敬礼', pinyin: 'jìng lǐ', meaning: 'salutations (fin de lettre)', meaningEn: 'yours sincerely', audio: 'audio/hsk5/hsk5_敬礼.wav' }
    ],
    tip:
      '此致 敬礼 ! est l\'équivalent exact de « veuillez recevoir mes salutations distinguées ». Figé, obligatoire dans toute correspondance professionnelle écrite.',
    tipEn:
      '此致 敬礼! is the exact equivalent of "yours faithfully/sincerely". Fixed phrase, mandatory in any written pro correspondence.'
  }
];

// --- cecr-b11-work-m4 — Entretien d'embauche ----------------------------
export const b11WorkInterviewLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-work-interview-5q',
    title: 'Les 5 questions rituelles',
    titleEn: 'The 5 ritual questions',
    body:
      '请自我介绍一下 (présente-toi), 你为什么想来我们公司 (pourquoi chez nous), 你的优点和缺点是什么 (forces/faiblesses), 你对薪水有什么期望 (attentes salariales), 你还有什么问题吗 (tes questions). Réponses attendues : factuelles, humbles, orientées collectif. Défaut cliché : 我最大的缺点是太认真 — socialement acceptable.',
    bodyEn:
      '请自我介绍一下 (introduce yourself), 你为什么想来我们公司 (why us), 你的优点和缺点是什么 (strengths/weaknesses), 你对薪水有什么期望 (salary expectations), 你还有什么问题吗 (your questions). Expected answers: factual, humble, team-oriented. Cliché flaw: 我最大的缺点是太认真 — socially acceptable.',
    items: [
      { hanzi: '面试', pinyin: 'miàn shì', meaning: 'entretien', meaningEn: 'interview', audio: 'audio/hsk4/hsk4_面试.wav' },
      { hanzi: '简历', pinyin: 'jiǎn lì', meaning: 'CV', meaningEn: 'résumé', audio: 'audio/hsk5/hsk5_简历.wav' },
      { hanzi: '自我介绍', pinyin: 'zì wǒ jiè shào', meaning: 'se présenter', meaningEn: 'introduce oneself', audio: 'audio/hsk3/hsk3_介绍.wav' },
      { hanzi: '优点', pinyin: 'yōu diǎn', meaning: 'qualité', meaningEn: 'strength', audio: 'audio/hsk4/hsk4_优点.wav' },
      { hanzi: '缺点', pinyin: 'quē diǎn', meaning: 'défaut', meaningEn: 'weakness', audio: 'audio/hsk4/hsk4_缺点.wav' },
      { hanzi: '经验', pinyin: 'jīng yàn', meaning: 'expérience', meaningEn: 'experience', audio: 'audio/hsk4/hsk4_经验.wav' }
    ],
    tip:
      'Code culturel : arrive 10 min en avance, tends le CV à DEUX mains, évite de trop sourire (= léger, peu sérieux en contexte pro chinois). Mentionne la stabilité à long terme : 稳定的职业发展.',
    tipEn:
      'Cultural code: arrive 10 min early, hand over résumé with BOTH hands, avoid over-smiling (= flighty in Chinese pro context). Mention long-term stability: 稳定的职业发展.'
  }
];

// ═════════════════════════════════════════════════════════════════════════════
// Voyage en Chine (cecr-b11-travel)
// ═════════════════════════════════════════════════════════════════════════════

// --- cecr-b11-travel-m1 — Réserver un train -----------------------------
export const b11TravelTrainLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-travel-train-types',
    title: '高铁 / 动车 / 普快 — 3 gammes',
    titleEn: '高铁 / 动车 / 普快 — 3 tiers',
    body:
      'Le réseau chinois propose 3 grandes gammes. 高铁 (G) : TGV, >300 km/h, moderne, cher. 动车 (D) : rapide, 200-250 km/h, confortable. 普快/快速/特快 (K, T) : trains classiques lents mais bon marché, parfois de nuit. Classes : 二等座 (standard), 一等座, 商务座, 硬卧/软卧 (couchettes nuit).',
    bodyEn:
      'The Chinese network has 3 main tiers. 高铁 (G): high-speed, >300 km/h, modern, pricey. 动车 (D): fast, 200-250 km/h, comfy. 普快/快速/特快 (K, T): classic slow trains, cheap, sometimes overnight. Classes: 二等座 (standard), 一等座, 商务座, 硬卧/软卧 (overnight sleepers).',
    items: [
      { hanzi: '高铁', pinyin: 'gāo tiě', meaning: 'TGV chinois', meaningEn: 'high-speed train', audio: 'audio/hsk4/hsk4_高铁.wav' },
      { hanzi: '动车', pinyin: 'dòng chē', meaning: 'train rapide D', meaningEn: 'D-train', audio: 'audio/hsk4/hsk4_动车.wav' },
      { hanzi: '火车', pinyin: 'huǒ chē', meaning: 'train', meaningEn: 'train', audio: 'audio/hsk2/hsk2_火车.wav' },
      { hanzi: '订票', pinyin: 'dìng piào', meaning: 'réserver un billet', meaningEn: 'book a ticket', audio: 'audio/hsk3/hsk3_票.wav' },
      { hanzi: '身份证', pinyin: 'shēn fèn zhèng', meaning: 'carte d\'identité', meaningEn: 'ID card', audio: 'audio/hsk4/hsk4_身份证.wav' },
      { hanzi: '候车厅', pinyin: 'hòu chē tīng', meaning: 'salle d\'attente', meaningEn: 'waiting room', audio: 'audio/hsk4/hsk4_候车.wav' }
    ],
    tip:
      'Les étrangers réservent sur 12306 (site officiel) avec le passeport — mais doivent souvent retirer un billet papier au guichet à la gare. Compte 15-20 min de marge avant embarquement.',
    tipEn:
      'Foreigners book on 12306 (official site) with passport — but often need to pick up a paper ticket at the station counter. Leave 15-20 min margin before boarding.'
  }
];

// --- cecr-b11-travel-m2 — À l'hôtel -------------------------------------
export const b11TravelHotelLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-travel-hotel-checkin',
    title: '入住 / 退房 + 押金 obligatoire',
    titleEn: '入住 / 退房 + mandatory 押金',
    body:
      '入住 (rù zhù) = check-in. 退房 (tuì fáng) = check-out, généralement avant midi. À l\'arrivée : 我预订了…的房间 (j\'ai réservé une chambre…). Presque tous les hôtels chinois exigent un 押金 (dépôt de caution) de 200-500 ¥, rendu au check-out. Types de chambres : 单人间 (simple), 双人间 (2 lits), 大床房 (lit double).',
    bodyEn:
      '入住 (rù zhù) = check-in. 退房 (tuì fáng) = check-out, usually before noon. On arrival: 我预订了…的房间 (I booked a … room). Almost all Chinese hotels require a 押金 (deposit) of 200-500 ¥, refunded at check-out. Room types: 单人间 (single), 双人间 (twin), 大床房 (double bed).',
    items: [
      { hanzi: '酒店', pinyin: 'jiǔ diàn', meaning: 'hôtel', meaningEn: 'hotel', audio: 'audio/hsk2/hsk2_酒店.wav' },
      { hanzi: '前台', pinyin: 'qián tái', meaning: 'réception', meaningEn: 'reception', audio: 'audio/hsk4/hsk4_前台.wav' },
      { hanzi: '入住', pinyin: 'rù zhù', meaning: 'check-in', meaningEn: 'check-in', audio: 'audio/hsk5/hsk5_入住.wav' },
      { hanzi: '退房', pinyin: 'tuì fáng', meaning: 'check-out', meaningEn: 'check-out', audio: 'audio/hsk4/hsk4_退.wav' },
      { hanzi: '押金', pinyin: 'yā jīn', meaning: 'caution', meaningEn: 'deposit', audio: 'audio/hsk5/hsk5_押金.wav' },
      { hanzi: '空调', pinyin: 'kōng tiáo', meaning: 'climatisation', meaningEn: 'air conditioning', audio: 'audio/hsk3/hsk3_空调.wav' }
    ],
    tip:
      'Pour signaler un problème : ...坏了 (…est en panne). 空调坏了, 热水坏了, 电视坏了. Formulation simple, ultra-efficace à la réception.',
    tipEn:
      'To report an issue: ...坏了 (…is broken). 空调坏了, 热水坏了, 电视坏了. Simple phrasing, maximally efficient at reception.'
  }
];

// --- cecr-b11-travel-m3 — Sites touristiques ----------------------------
export const b11TravelSitesLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-travel-sites-top5',
    title: 'Les 5 sites incontournables',
    titleEn: 'The top 5 sites',
    body:
      '长城 (Grande Muraille — sections 八达岭 touristique, 慕田峪 plus calme), 故宫 (Cité Interdite, Pékin — réservation en ligne 1 jour à l\'avance), 兵马俑 (Armée de terre cuite, Xi\'an), 外滩 (Bund, Shanghai) avec 东方明珠, 黄山 (Montagnes Jaunes). Le passeport est souvent requis pour acheter 门票. Évite 周末 (week-end) et jours fériés : 人山人海.',
    bodyEn:
      '长城 (Great Wall — sections 八达岭 touristy, 慕田峪 quieter), 故宫 (Forbidden City, Beijing — online booking 1 day ahead), 兵马俑 (Terracotta Army, Xi\'an), 外滩 (Bund, Shanghai) with 东方明珠, 黄山 (Yellow Mountains). Passport often needed to buy 门票. Avoid 周末 (weekends) and holidays: 人山人海.',
    items: [
      { hanzi: '长城', pinyin: 'cháng chéng', meaning: 'Grande Muraille', meaningEn: 'Great Wall', audio: 'audio/hsk4/hsk4_长城.wav' },
      { hanzi: '故宫', pinyin: 'gù gōng', meaning: 'Cité Interdite', meaningEn: 'Forbidden City', audio: 'audio/hsk5/hsk5_故宫.wav' },
      { hanzi: '门票', pinyin: 'mén piào', meaning: 'billet d\'entrée', meaningEn: 'entrance ticket', audio: 'audio/hsk4/hsk4_门票.wav' },
      { hanzi: '导游', pinyin: 'dǎo yóu', meaning: 'guide', meaningEn: 'tour guide', audio: 'audio/hsk4/hsk4_导游.wav' },
      { hanzi: '拍照', pinyin: 'pāi zhào', meaning: 'photographier', meaningEn: 'take pictures', audio: 'audio/hsk4/hsk4_拍.wav' },
      { hanzi: '纪念品', pinyin: 'jì niàn pǐn', meaning: 'souvenir', meaningEn: 'souvenir', audio: 'audio/hsk4/hsk4_纪念.wav' }
    ],
    tip:
      '人山人海 (littéralement « des gens-montagne des gens-mer ») décrit parfaitement un site touristique chinois à la fête nationale. Évite à tout prix la semaine du 1er octobre (国庆节).',
    tipEn:
      '人山人海 (lit. "people-mountain people-sea") perfectly captures a Chinese tourist site on National Day. Avoid the October 1st week (国庆节) at all costs.'
  }
];

// ═════════════════════════════════════════════════════════════════════════════
// Émotions & santé (cecr-b11-emotions-health)
// ═════════════════════════════════════════════════════════════════════════════

// --- cecr-b11-emo-m1 — Vocabulaire émotions -----------------------------
export const b11EmoVocabLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-emo-vocab-xin',
    title: 'Le radical 忄/心 au cœur des émotions',
    titleEn: 'The 忄/心 radical at the heart of emotion',
    body:
      'La plupart des mots d\'émotion portent le radical 忄 (latéral) ou 心 (en bas) — « cœur ». 快乐, 高兴, 难过, 伤心, 担心, 害怕, 紧张, 失望. Structure : S + 觉得/感到 + émotion. Pour intensifier : 非常, 特别 ; pour atténuer : 有点儿, 比较. Les Chinois atténuent souvent : 有点不高兴 = assez mécontent (sous-texte fort).',
    bodyEn:
      'Most emotion words carry the 忄 radical (side) or 心 (bottom) — "heart". 快乐, 高兴, 难过, 伤心, 担心, 害怕, 紧张, 失望. Structure: S + 觉得/感到 + emotion. Intensify: 非常, 特别; soften: 有点儿, 比较. Chinese often softens: 有点不高兴 = quite upset (strong undertone).',
    items: [
      { hanzi: '高兴', pinyin: 'gāo xìng', meaning: 'content', meaningEn: 'happy', audio: 'audio/hsk1/hsk1_高兴.wav' },
      { hanzi: '快乐', pinyin: 'kuài lè', meaning: 'joyeux', meaningEn: 'joyful', audio: 'audio/hsk2/hsk2_快乐.wav' },
      { hanzi: '难过', pinyin: 'nán guò', meaning: 'triste', meaningEn: 'sad', audio: 'audio/hsk3/hsk3_难过.wav' },
      { hanzi: '生气', pinyin: 'shēng qì', meaning: 'en colère', meaningEn: 'angry', audio: 'audio/hsk3/hsk3_生气.wav' },
      { hanzi: '担心', pinyin: 'dān xīn', meaning: 'inquiet', meaningEn: 'worried', audio: 'audio/hsk3/hsk3_担心.wav' },
      { hanzi: '紧张', pinyin: 'jǐn zhāng', meaning: 'tendu, nerveux', meaningEn: 'nervous', audio: 'audio/hsk4/hsk4_紧张.wav' }
    ],
    tip:
      'Déclarer son affection : les Chinois modernes emploient rarement 我爱你 hors couple intime. Pour amis/famille, préfère 我很在乎你 (je tiens à toi) — moins embarrassant, plus naturel.',
    tipEn:
      'Declaring affection: modern Chinese rarely use 我爱你 outside a romantic context. For friends/family, prefer 我很在乎你 (I care about you) — less awkward, more natural.'
  }
];

// --- cecr-b11-emo-m2 — Donner son avis ----------------------------------
export const b11EmoOpinionLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-emo-opinion-3levels',
    title: '3 niveaux d\'opinion : 觉得 / 认为 / 在我看来',
    titleEn: '3 levels: 觉得 / 认为 / 在我看来',
    body:
      '我觉得 = quotidien, ressenti (j\'ai l\'impression). 我认为 = posé, argumentatif (je pense que). 在我看来 = formel, dissertation (à mon sens). Pour nuancer : 可能, 也许, 好像. Pour équilibrer : 一方面…另一方面. Pour un désaccord poli : 我不太同意 plutôt que 我不同意.',
    bodyEn:
      '我觉得 = daily, feeling-based (I feel/find). 我认为 = measured, argumentative (I think). 在我看来 = formal, essayistic (in my view). Nuance: 可能, 也许, 好像. Balance: 一方面…另一方面. Polite disagreement: 我不太同意 rather than 我不同意.',
    items: [
      { hanzi: '我觉得', pinyin: 'wǒ jué de', meaning: 'je trouve, j\'ai l\'impression', meaningEn: 'I feel/find', audio: 'audio/hsk2/hsk2_觉得.wav' },
      { hanzi: '我认为', pinyin: 'wǒ rèn wéi', meaning: 'je pense que', meaningEn: 'I think that', audio: 'audio/hsk3/hsk3_认为.wav' },
      { hanzi: '可能', pinyin: 'kě néng', meaning: 'peut-être', meaningEn: 'possibly', audio: 'audio/hsk2/hsk2_可能.wav' },
      { hanzi: '同意', pinyin: 'tóng yì', meaning: 'être d\'accord', meaningEn: 'agree', audio: 'audio/hsk3/hsk3_同意.wav' },
      { hanzi: '不同意', pinyin: 'bù tóng yì', meaning: 'ne pas être d\'accord', meaningEn: 'disagree', audio: 'audio/hsk3/hsk3_同意.wav' },
      { hanzi: '说得对', pinyin: 'shuō de duì', meaning: 'tu as raison', meaningEn: 'you\'re right', audio: 'audio/hsk2/hsk2_对.wav' }
    ],
    tip:
      'Astuce conversation : avant d\'annoncer un désaccord, commence par acquiescer partiellement (你说得有道理, 但是…) — courant et bien vu en Chine.',
    tipEn:
      'Conversation trick: before disagreeing, half-agree first (你说得有道理, 但是… = you have a point, but…) — common and well-received in China.'
  }
];

// --- cecr-b11-emo-m3 — Compliments & politesse --------------------------
export const b11EmoComplimentLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-emo-compliment-nali',
    title: 'Refuser un compliment : la modestie chinoise',
    titleEn: 'Refusing a compliment: Chinese modesty',
    body:
      'En Chine, accepter un compliment par « merci ! » peut sonner arrogant. La réponse traditionnelle : 哪里哪里 (nǎ li nǎ li, « mais non »), 过奖了 (guò jiǎng le, « vous flattez trop »), 还差得远呢 (je suis encore loin). L\'émission : rester précise (evite « tu es bien »), préfère 你做得真好, 你的 [X] 真漂亮.',
    bodyEn:
      'In China, accepting a compliment with "thanks!" can sound arrogant. Traditional reply: 哪里哪里 (nǎ li nǎ li, "not at all"), 过奖了 (guò jiǎng le, "you flatter me"), 还差得远呢 (I\'m still far from it). When giving one: stay specific (avoid "you\'re nice"), prefer 你做得真好, 你的 [X] 真漂亮.',
    items: [
      { hanzi: '哪里', pinyin: 'nǎ li', meaning: 'mais non (refus compliment)', meaningEn: 'not at all', audio: 'audio/hsk1/hsk1_哪里.wav' },
      { hanzi: '过奖了', pinyin: 'guò jiǎng le', meaning: 'vous flattez trop', meaningEn: 'you flatter me', audio: 'audio/hsk5/hsk5_过奖.wav' },
      { hanzi: '聪明', pinyin: 'cōng míng', meaning: 'intelligent', meaningEn: 'smart', audio: 'audio/hsk3/hsk3_聪明.wav' },
      { hanzi: '漂亮', pinyin: 'piào liang', meaning: 'joli', meaningEn: 'pretty', audio: 'audio/hsk1/hsk1_漂亮.wav' },
      { hanzi: '真好', pinyin: 'zhēn hǎo', meaning: 'vraiment bien', meaningEn: 'really good', audio: 'audio/hsk1/hsk1_真.wav' },
      { hanzi: '客气', pinyin: 'kè qi', meaning: 'poli, formel', meaningEn: 'polite', audio: 'audio/hsk3/hsk3_客气.wav' }
    ],
    tip:
      'Les jeunes urbains chinois acceptent de plus en plus un 谢谢 direct. En contexte formel (prof, collègue senior, beaux-parents) : reste sur 哪里 par prudence.',
    tipEn:
      'Young urban Chinese increasingly accept a direct 谢谢. In formal settings (teacher, senior colleague, in-laws): stick to 哪里 to play safe.'
  }
];

// --- cecr-b11-health-m1 — Parties du corps ------------------------------
export const b11HealthBodyLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-health-body-map',
    title: 'Le corps en 15 mots',
    titleEn: 'The body in 15 words',
    body:
      'Haut : 头, 脸, 眼睛, 耳朵, 鼻子, 嘴, 牙. Tronc : 脖子, 肩膀, 胸, 肚子, 背. Membres : 手, 胳膊, 腿, 脚. Beaucoup de mots d\'organes portent le radical 月 (forme adoucie de 肉, chair) : 肚, 肺, 胃, 肝. Pour parler de douleur, formule universelle : [partie] 疼. 我头疼 (j\'ai mal à la tête).',
    bodyEn:
      'Top: 头, 脸, 眼睛, 耳朵, 鼻子, 嘴, 牙. Torso: 脖子, 肩膀, 胸, 肚子, 背. Limbs: 手, 胳膊, 腿, 脚. Many organ words carry the 月 radical (softened form of 肉, flesh): 肚, 肺, 胃, 肝. To speak of pain, universal pattern: [part] 疼. 我头疼 (my head hurts).',
    items: [
      { hanzi: '头', pinyin: 'tóu', meaning: 'tête', meaningEn: 'head', audio: 'audio/hsk3/hsk3_头.wav' },
      { hanzi: '眼睛', pinyin: 'yǎn jīng', meaning: 'yeux', meaningEn: 'eyes', audio: 'audio/hsk2/hsk2_眼睛.wav' },
      { hanzi: '鼻子', pinyin: 'bí zi', meaning: 'nez', meaningEn: 'nose', audio: 'audio/hsk3/hsk3_鼻子.wav' },
      { hanzi: '嘴', pinyin: 'zuǐ', meaning: 'bouche', meaningEn: 'mouth', audio: 'audio/hsk3/hsk3_嘴.wav' },
      { hanzi: '手', pinyin: 'shǒu', meaning: 'main', meaningEn: 'hand', audio: 'audio/hsk2/hsk2_手.wav' },
      { hanzi: '肚子', pinyin: 'dù zi', meaning: 'ventre', meaningEn: 'belly', audio: 'audio/hsk3/hsk3_肚子.wav' },
      { hanzi: '疼', pinyin: 'téng', meaning: 'douloureux, faire mal', meaningEn: 'painful, hurt', audio: 'audio/hsk3/hsk3_疼.wav' }
    ],
    tip:
      'Synonyme de 疼 : 痛 (tòng). Les deux sont interchangeables dans 我头疼/头痛. 痛 est légèrement plus littéraire et fréquent au sud ; 疼 est plus courant au nord et à l\'oral.',
    tipEn:
      'Synonym of 疼: 痛 (tòng). Interchangeable in 我头疼/头痛. 痛 is slightly more literary and frequent in the south; 疼 more common in the north and orally.'
  }
];

// --- cecr-b11-health-m2 — Chez le médecin -------------------------------
export const b11HealthDoctorLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-health-doctor-flow',
    title: '挂号 → spécialité → 开药',
    titleEn: '挂号 → specialty → 开药',
    body:
      'Parcours hôpital (医院) en Chine : (1) 挂号处 (bureau d\'enregistrement), paye la consultation, prends un ticket. (2) Rends-toi au service : 内科 (générale), 外科 (chirurgie), 儿科 (pédiatrie), 牙科 (dentaire). (3) Consulte, décris : 我觉得... (je me sens…), 我头疼 (j\'ai mal à la tête). (4) Le médecin 开药 (prescrit). (5) Va à la 药房 (pharmacie) de l\'hôpital.',
    bodyEn:
      'Hospital flow (医院) in China: (1) 挂号处 (registration desk), pay the consultation fee, get a ticket. (2) Go to the specialty: 内科 (general), 外科 (surgery), 儿科 (pediatrics), 牙科 (dental). (3) Consult, describe: 我觉得... (I feel…), 我头疼 (my head hurts). (4) Doctor 开药 (prescribes). (5) Head to the 药房 (pharmacy) in the hospital.',
    items: [
      { hanzi: '医院', pinyin: 'yī yuàn', meaning: 'hôpital', meaningEn: 'hospital', audio: 'audio/hsk1/hsk1_医院.wav' },
      { hanzi: '挂号', pinyin: 'guà hào', meaning: 'enregistrement hospitalier', meaningEn: 'hospital registration', audio: 'audio/hsk5/hsk5_挂号.wav' },
      { hanzi: '发烧', pinyin: 'fā shāo', meaning: 'avoir de la fièvre', meaningEn: 'have a fever', audio: 'audio/hsk3/hsk3_发烧.wav' },
      { hanzi: '咳嗽', pinyin: 'ké sou', meaning: 'tousser', meaningEn: 'cough', audio: 'audio/hsk4/hsk4_咳嗽.wav' },
      { hanzi: '感冒', pinyin: 'gǎn mào', meaning: 'rhume', meaningEn: 'cold', audio: 'audio/hsk3/hsk3_感冒.wav' },
      { hanzi: '开药', pinyin: 'kāi yào', meaning: 'prescrire un médicament', meaningEn: 'prescribe medicine', audio: 'audio/hsk2/hsk2_药.wav' }
    ],
    tip:
      'Hiérarchie des hôpitaux : 三甲 (sān jiǎ, niveau 3A, les plus réputés) > 二级 > 一级. Pour un souci sérieux, vise un 三甲 — file d\'attente longue mais qualité.',
    tipEn:
      'Hospital tiers: 三甲 (sān jiǎ, 3A grade, top-ranked) > 二级 > 一级. For a serious issue, aim for a 三甲 — long queues but best quality.'
  }
];

// --- cecr-b11-health-m3 — Pharmacie -------------------------------------
export const b11HealthPharmacyLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-health-pharmacy-forms',
    title: 'Formes & posologie',
    titleEn: 'Forms & dosage',
    body:
      '药店 (yào diàn) = pharmacie. Formes : 药片 (cachet), 胶囊 (gélule), 药水 (sirop), 药膏 (pommade). Médicaments : 感冒药, 退烧药, 止痛药, 消炎药, 抗生素. Posologie type : 一天三次，每次两片 (3 fois/jour, 2 cachets à chaque prise). Indications sur boîte : 饭前 (avant repas), 饭后 (après), 睡前 (coucher).',
    bodyEn:
      '药店 (yào diàn) = pharmacy. Forms: 药片 (tablet), 胶囊 (capsule), 药水 (syrup), 药膏 (ointment). Meds: 感冒药, 退烧药, 止痛药, 消炎药, 抗生素. Standard dosage: 一天三次，每次两片 (3 times/day, 2 tablets each). Box labels: 饭前 (before meals), 饭后 (after), 睡前 (bedtime).',
    items: [
      { hanzi: '药店', pinyin: 'yào diàn', meaning: 'pharmacie', meaningEn: 'pharmacy', audio: 'audio/hsk3/hsk3_药.wav' },
      { hanzi: '药片', pinyin: 'yào piàn', meaning: 'cachet', meaningEn: 'tablet', audio: 'audio/hsk3/hsk3_药.wav' },
      { hanzi: '感冒药', pinyin: 'gǎn mào yào', meaning: 'médicament rhume', meaningEn: 'cold medicine', audio: 'audio/hsk3/hsk3_感冒.wav' },
      { hanzi: '止痛药', pinyin: 'zhǐ tòng yào', meaning: 'antidouleur', meaningEn: 'painkiller', audio: 'audio/hsk5/hsk5_止.wav' },
      { hanzi: '中药', pinyin: 'zhōng yào', meaning: 'médecine chinoise', meaningEn: 'Chinese medicine', audio: 'audio/hsk5/hsk5_中药.wav' },
      { hanzi: '针灸', pinyin: 'zhēn jiǔ', meaning: 'acupuncture', meaningEn: 'acupuncture', audio: 'audio/hsk6/hsk6_针灸.wav' }
    ],
    tip:
      'Usage combiné : nombreux Chinois prennent simultanément 西医 (médecine occidentale) et 中医 (traditionnelle), chacune pour ses indications. Demander au pharmacien 有没有中药 ? ouvre cette deuxième voie.',
    tipEn:
      'Combined use: many Chinese take 西医 (Western medicine) and 中医 (traditional) simultaneously, each for its strengths. Asking the pharmacist 有没有中药? opens that second path.'
  }
];

// ═════════════════════════════════════════════════════════════════════════════
// VAGUE B1.1 — Conversation + Nuances
// ═════════════════════════════════════════════════════════════════════════════

// === CONVERSATION B1.1 =======================================================

export const b11ConvM1LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-opinion',
    title: 'Exprimer une opinion nuancée',
    titleEn: 'Express a nuanced opinion',
    body:
      'Au-delà du A2 « 我觉得 », le B1 nuance. Introduire : 在我看来 (à mon avis), 我个人认为 (personnellement je pense), 从我的角度 (de mon point de vue). Reconnaître l\'autre côté : 我理解你的意思，但是… (je comprends ton idée, mais…), 你说得有道理，不过… (tu as raison, cependant…). Renforcer : 确实如此 (c\'est exactement ça), 没错 (c\'est juste). Important : éviter le « 我觉得 » sec et impersonnel — ça sonne très débutant. Préfère 在我看来 ou 我个人认为 dès qu\'il s\'agit d\'argumenter.',
    bodyEn:
      'Beyond A2 «我觉得», B1 adds nuance. Introduce: 在我看来 (in my view), 我个人认为 (personally I think), 从我的角度 (from my perspective). Acknowledge the other side: 我理解你的意思，但是… (I get your point, but…), 你说得有道理，不过… (you have a point, however…). Reinforce: 确实如此 (that\'s exactly it), 没错 (that\'s right). Important: avoid bare impersonal «我觉得» — sounds very beginner. Prefer 在我看来 or 我个人认为 when arguing.',
    items: [
      { hanzi: '在我看来', pinyin: 'zài wǒ kàn lái', meaning: 'à mon avis', meaningEn: 'in my view', audio: 'audio/hsk4/hsk4_看法.wav' },
      { hanzi: '个人', pinyin: 'gè rén', meaning: 'personnel', meaningEn: 'personal', audio: 'audio/hsk3/hsk3_个人.wav' },
      { hanzi: '角度', pinyin: 'jiǎo dù', meaning: 'angle, point de vue', meaningEn: 'angle, perspective', audio: 'audio/hsk5/hsk5_角度.wav' },
      { hanzi: '道理', pinyin: 'dào lǐ', meaning: 'raison, sens', meaningEn: 'reason, sense', audio: 'audio/hsk5/hsk5_道理.wav' },
      { hanzi: '确实', pinyin: 'què shí', meaning: 'effectivement', meaningEn: 'indeed', audio: 'audio/hsk4/hsk4_确实.wav' }
    ],
    tip:
      'Astuce diplomatie : commence TOUJOURS par 我理解你 / 你说得有道理 avant de nuancer. Sans cette préface, ton désaccord sonne agressif en chinois.',
    tipEn:
      'Diplomacy tip: ALWAYS start with 我理解你 / 你说得有道理 before adding nuance. Without that preface, your disagreement sounds aggressive in Chinese.'
  },
  {
    id: 'b11-preference',
    title: 'Exprimer préférence et regret',
    titleEn: 'Express preference and regret',
    body:
      'Préférence : 我更喜欢 X (je préfère X), 比起 X，我更喜欢 Y (entre X et Y, je préfère Y), 我宁愿 X 也不 Y (je préférerais X plutôt que Y — fort). Regret : 我后悔了 (je regrette), 早知道就… (si j\'avais su, j\'aurais…), 要是…就好了 (si seulement…). Phrase typique : 早知道我就不来了 = si j\'avais su je ne serais pas venu. 早知道 marque la prise de conscience tardive. Soutenir : 别后悔 (ne regrette pas), 没关系，过去了 (laisse, c\'est passé).',
    bodyEn:
      'Preference: 我更喜欢 X (I prefer X), 比起 X，我更喜欢 Y (between X and Y, I prefer Y), 我宁愿 X 也不 Y (I\'d rather X than Y — strong). Regret: 我后悔了 (I regret), 早知道就… (if I\'d known…), 要是…就好了 (if only…). Typical phrase: 早知道我就不来了 = if I\'d known I wouldn\'t have come. 早知道 marks late realization. Support: 别后悔 (don\'t regret), 没关系，过去了 (let it go, it\'s past).',
    items: [
      { hanzi: '更', pinyin: 'gèng', meaning: 'plus, encore plus', meaningEn: 'more', audio: 'audio/hsk3/hsk3_更.wav' },
      { hanzi: '宁愿', pinyin: 'nìng yuàn', meaning: 'préférer (fort)', meaningEn: 'would rather', audio: 'audio/hsk5/hsk5_宁愿.wav' },
      { hanzi: '后悔', pinyin: 'hòu huǐ', meaning: 'regretter', meaningEn: 'regret', audio: 'audio/hsk4/hsk4_后悔.wav' },
      { hanzi: '早知道', pinyin: 'zǎo zhī dào', meaning: 'si j\'avais su', meaningEn: 'if I had known', audio: 'audio/hsk2/hsk2_知道.wav' },
      { hanzi: '要是', pinyin: 'yào shì', meaning: 'si (hypothèse)', meaningEn: 'if (hypothetical)', audio: 'audio/hsk4/hsk4_要是.wav' }
    ],
    tip:
      '« 要是…就好了 » est la formule magique du regret hypothétique chinois. 要是我学了中文就好了 = si seulement j\'avais appris le chinois. Très expressive, à utiliser sans complexe.',
    tipEn:
      '«要是…就好了» is the magic Chinese hypothetical-regret formula. 要是我学了中文就好了 = if only I had learned Chinese. Very expressive, use freely.'
  }
];

export const b11ConvM2LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-passe-detail',
    title: 'Raconter le passé en détail',
    titleEn: 'Tell about the past in detail',
    body:
      'Marqueurs temporels : 那时候 (à cette époque), 当时 (à ce moment-là), 后来 (par la suite), 接着 (ensuite), 突然 (soudain), 最后 (finalement). Aspect verbal : 了 (action accomplie), 过 (expérience vécue, jamais récente — 我去过中国 = j\'ai déjà été en Chine au moins 1 fois). Construction d\'un récit : situation initiale (那时候我…) + événement déclencheur (突然…) + développement (然后…) + résolution (最后…). Coloration narrative : 谁知道 (qui aurait cru), 没想到 (je n\'aurais pas pensé). Exemple : 那时候我才二十岁，突然接到一个电话…',
    bodyEn:
      'Time markers: 那时候 (back then), 当时 (at that moment), 后来 (later on), 接着 (next), 突然 (suddenly), 最后 (finally). Verbal aspect: 了 (completed action), 过 (lived experience, not necessarily recent — 我去过中国 = I\'ve been to China at least once). Story arc: initial situation (那时候我…) + trigger event (突然…) + development (然后…) + resolution (最后…). Narrative color: 谁知道 (who\'d have thought), 没想到 (didn\'t expect). Example: 那时候我才二十岁，突然接到一个电话…',
    items: [
      { hanzi: '那时候', pinyin: 'nà shí hou', meaning: 'à cette époque', meaningEn: 'back then', audio: 'audio/hsk3/hsk3_时候.wav' },
      { hanzi: '当时', pinyin: 'dāng shí', meaning: 'à ce moment-là', meaningEn: 'at the time', audio: 'audio/hsk5/hsk5_当时.wav' },
      { hanzi: '后来', pinyin: 'hòu lái', meaning: 'par la suite', meaningEn: 'later on', audio: 'audio/hsk3/hsk3_后来.wav' },
      { hanzi: '突然', pinyin: 'tū rán', meaning: 'soudainement', meaningEn: 'suddenly', audio: 'audio/hsk3/hsk3_突然.wav' },
      { hanzi: '没想到', pinyin: 'méi xiǎng dào', meaning: 'je n\'aurais pas pensé', meaningEn: 'didn\'t expect', audio: 'audio/hsk4/hsk4_没想到.wav' }
    ],
    tip:
      'Marqueur de coloration : « 谁知道 + événement inattendu » est un classique narratif chinois. 谁知道他真的来了！= et qui aurait cru, il est vraiment venu ! Très oral, très expressif.',
    tipEn:
      'Color marker: «谁知道 + unexpected event» is a Chinese narrative classic. 谁知道他真的来了！= and who\'d have thought, he actually came! Very oral, very expressive.'
  },
  {
    id: 'b11-anecdote',
    title: 'Raconter une anecdote drôle ou gênante',
    titleEn: 'Tell a funny or awkward anecdote',
    body:
      'Démarrer : 我跟你说一件好玩的事 (laisse-moi te raconter un truc drôle). Pour le drôle : 太搞笑了 (trop marrant), 笑死我了 (je suis mort de rire — argot oral), 真有意思 (vraiment amusant). Pour le gênant : 太尴尬了 (super gênant), 不好意思 (gêné), 我真想找个地缝钻进去 (j\'avais envie de me cacher dans un trou — idiomatique). Conclure : 这就是那时候发生的事 (voilà ce qui s\'est passé à l\'époque). Réaction de l\'autre attendue : 真的吗？/ 哈哈哈！ Sans réaction = froid.',
    bodyEn:
      'Start: 我跟你说一件好玩的事 (let me tell you something funny). For funny: 太搞笑了 (so funny), 笑死我了 (I died laughing — slang), 真有意思 (truly amusing). For awkward: 太尴尬了 (so awkward), 不好意思 (embarrassed), 我真想找个地缝钻进去 (I wanted to hide in a crack in the floor — idiomatic). Conclude: 这就是那时候发生的事 (that\'s what happened back then). Expected reaction: 真的吗？/ 哈哈哈！ No reaction = cold.',
    items: [
      { hanzi: '好玩', pinyin: 'hǎo wán', meaning: 'amusant', meaningEn: 'fun', audio: 'audio/hsk3/hsk3_好玩.wav' },
      { hanzi: '搞笑', pinyin: 'gǎo xiào', meaning: 'drôle', meaningEn: 'funny', audio: 'audio/hsk5/hsk5_搞笑.wav' },
      { hanzi: '尴尬', pinyin: 'gān gà', meaning: 'gênant', meaningEn: 'awkward', audio: 'audio/hsk5/hsk5_尴尬.wav' },
      { hanzi: '发生', pinyin: 'fā shēng', meaning: 'se produire', meaningEn: 'happen', audio: 'audio/hsk4/hsk4_发生.wav' },
      { hanzi: '哈哈哈', pinyin: 'hā hā hā', meaning: 'hahaha', meaningEn: 'hahaha', audio: 'audio/hsk1/hsk1_哈.wav' }
    ],
    tip:
      'Sur WeChat, montre que tu es engagé en répondant 哈哈哈 (3 哈 minimum). Un seul 哈 sonne sarcastique. 6 哈 = vraiment drôle. C\'est une vraie convention sociale numérique.',
    tipEn:
      'On WeChat, show you\'re engaged by replying 哈哈哈 (minimum 3 哈). A single 哈 sounds sarcastic. 6 哈 = really funny. It\'s a real digital social convention.'
  }
];

export const b11ConvM3LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-debate-simple',
    title: 'Débattre simplement : pour et contre',
    titleEn: 'Simple debate: for and against',
    body:
      'Pour : 我同意 (je suis d\'accord), 完全同意 (totalement), 我也是这么想的 (je pense pareil), 没错 (c\'est juste). Contre poliment : 我不太同意 (je ne suis pas tout à fait d\'accord), 我看法不一样 (j\'ai un avis différent), 我觉得不一定 (pas forcément). Donner un argument : 因为…, 由于…, 比如…, 据我所知 (à ma connaissance). Concession : 你说得对，不过… (tu as raison, mais…). Au B1, on évite encore 反对 (s\'opposer) sauf en débat formel — c\'est trop frontal en chinois social.',
    bodyEn:
      'For: 我同意 (I agree), 完全同意 (totally), 我也是这么想的 (I think the same), 没错 (right). Against politely: 我不太同意 (I don\'t fully agree), 我看法不一样 (I have a different view), 我觉得不一定 (not necessarily). Give an argument: 因为…, 由于…, 比如…, 据我所知 (to my knowledge). Concession: 你说得对，不过… (you\'re right, but…). At B1, still avoid 反对 (oppose) outside formal debate — too frontal in social Chinese.',
    items: [
      { hanzi: '同意', pinyin: 'tóng yì', meaning: 'd\'accord', meaningEn: 'agree', audio: 'audio/hsk3/hsk3_同意.wav' },
      { hanzi: '完全', pinyin: 'wán quán', meaning: 'totalement', meaningEn: 'completely', audio: 'audio/hsk4/hsk4_完全.wav' },
      { hanzi: '不一定', pinyin: 'bù yí dìng', meaning: 'pas forcément', meaningEn: 'not necessarily', audio: 'audio/hsk3/hsk3_不一定.wav' },
      { hanzi: '据我所知', pinyin: 'jù wǒ suǒ zhī', meaning: 'à ma connaissance', meaningEn: 'to my knowledge', audio: 'audio/hsk5/hsk5_据.wav' },
      { hanzi: '观点', pinyin: 'guān diǎn', meaning: 'point de vue', meaningEn: 'viewpoint', audio: 'audio/hsk5/hsk5_观点.wav' }
    ],
    tip:
      'Chez les Chinois, le débat « à la française » (frontal, contradictoire) peut surprendre. Préfère le sandwich : reconnais d\'abord (你说得有道理) + nuance (不过…). Sans la 1re partie, perçu comme agressif.',
    tipEn:
      'With Chinese people, French-style debate (frontal, contradictory) can surprise. Prefer the sandwich: acknowledge first (你说得有道理) + nuance (不过…). Without the first part, perceived as aggressive.'
  },
  {
    id: 'b11-imprevu',
    title: 'Gérer un imprévu : retard, annulation',
    titleEn: 'Handle the unexpected: late, cancellation',
    body:
      'Annoncer : 不好意思，我可能要迟到 (désolé, je vais être en retard), 突然有事，我去不了 (j\'ai un imprévu, je ne peux pas venir). Cause + remède : 因为堵车，我会晚 30 分钟 (cause = embouteillage, remède = 30 min de retard). Reprogrammer : 能不能改个时间？(on peut changer ?), 我们另外约 (refixons un autre RDV). Sur WeChat : message immédiat, pas attendre. Si vraiment urgent, envoie un vocal court (≤ 30s). Toujours conclure par 真的不好意思 / 给你添麻烦了 (désolé du dérangement).',
    bodyEn:
      'Announce: 不好意思，我可能要迟到 (sorry, I\'ll be late), 突然有事，我去不了 (something came up, I can\'t come). Cause + fix: 因为堵车，我会晚 30 分钟 (cause = traffic, fix = 30 min late). Reschedule: 能不能改个时间？(can we change?), 我们另外约 (let\'s set another time). On WeChat: message immediately, don\'t wait. If really urgent, send a short voice note (≤ 30s). Always close with 真的不好意思 / 给你添麻烦了 (sorry for the trouble).',
    items: [
      { hanzi: '迟到', pinyin: 'chí dào', meaning: 'arriver en retard', meaningEn: 'be late', audio: 'audio/hsk3/hsk3_迟到.wav' },
      { hanzi: '突然', pinyin: 'tū rán', meaning: 'soudain', meaningEn: 'suddenly', audio: 'audio/hsk3/hsk3_突然.wav' },
      { hanzi: '堵车', pinyin: 'dǔ chē', meaning: 'embouteillage', meaningEn: 'traffic jam', audio: 'audio/hsk4/hsk4_堵车.wav' },
      { hanzi: '另外', pinyin: 'lìng wài', meaning: 'autre, ailleurs', meaningEn: 'other, also', audio: 'audio/hsk4/hsk4_另外.wav' },
      { hanzi: '添麻烦', pinyin: 'tiān má fan', meaning: 'donner du trouble', meaningEn: 'cause trouble', audio: 'audio/hsk4/hsk4_麻烦.wav' }
    ],
    tip:
      '« 给你添麻烦了 » est la formule passe-partout d\'excuse pour avoir dérangé. Réponse standard : 不会不会, 没关系 (de rien). Sans cette phrase, ton excuse paraît incomplète.',
    tipEn:
      '«给你添麻烦了» is the all-purpose apology for having bothered. Standard reply: 不会不会, 没关系 (no worries). Without this phrase, your apology feels incomplete.'
  }
];

export const b11ConvM4LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-felicitation',
    title: 'Faire un vrai compliment + l\'accepter',
    titleEn: 'Give a real compliment + accept it',
    body:
      'Au-delà du « 你真棒 » (tu es super) générique du A2, le B1 précise : 你的中文进步真快 (ton chinois progresse vraiment vite), 你这个想法很有创意 (cette idée est très créative), 你做得太到位了 (parfaitement bien fait). Pour féliciter d\'un succès : 恭喜 ! (félicitations), 祝贺你 ! (jeux de la même famille), 太替你高兴了 (trop content pour toi). Acceptation moderne : 谢谢，你过奖了 (merci, vous me flattez). Plus moderne encore : 谢谢，我会继续努力 (merci, je continue à bosser). Mix de gratitude + humilité.',
    bodyEn:
      'Beyond generic A2 «你真棒» (you\'re great), B1 specifies: 你的中文进步真快 (your Chinese is really improving fast), 你这个想法很有创意 (this idea is very creative), 你做得太到位了 (perfectly done). To congratulate a success: 恭喜！(congrats), 祝贺你！(same family), 太替你高兴了 (so happy for you). Modern acceptance: 谢谢，你过奖了 (thanks, you flatter me). Even more modern: 谢谢，我会继续努力 (thanks, I\'ll keep working). Gratitude + humility mix.',
    items: [
      { hanzi: '进步', pinyin: 'jìn bù', meaning: 'progrès', meaningEn: 'progress', audio: 'audio/hsk4/hsk4_进步.wav' },
      { hanzi: '创意', pinyin: 'chuàng yì', meaning: 'créativité', meaningEn: 'creativity', audio: 'audio/hsk5/hsk5_创意.wav' },
      { hanzi: '到位', pinyin: 'dào wèi', meaning: 'au point', meaningEn: 'on point', audio: 'audio/hsk6/hsk6_到位.wav' },
      { hanzi: '恭喜', pinyin: 'gōng xǐ', meaning: 'félicitations', meaningEn: 'congrats', audio: 'audio/hsk2/hsk2_恭喜.wav' },
      { hanzi: '祝贺', pinyin: 'zhù hè', meaning: 'féliciter', meaningEn: 'congratulate', audio: 'audio/hsk5/hsk5_祝贺.wav' }
    ],
    tip:
      'Pour un succès académique/pro chinois, dire 恭喜 SEUL peut sonner sec. Combo classique : 恭喜恭喜 ! 你太厉害了 ! (réplique 恭喜 + un compliment précis). Le double 恭喜 est attendu.',
    tipEn:
      'For a Chinese academic/pro success, saying 恭喜 ALONE can sound dry. Classic combo: 恭喜恭喜！你太厉害了！(double 恭喜 + a specific compliment). The doubled 恭喜 is expected.'
  },
  {
    id: 'b11-souhait',
    title: 'Souhaits et formules de politesse étendues',
    titleEn: 'Wishes and extended polite formulas',
    body:
      '生日快乐 (joyeux anniversaire), 新年快乐 (bonne année), 节日快乐 (bonne fête). Pour mariages : 百年好合 (100 ans d\'union heureuse), 早生贵子 (avoir bientôt un beau garçon — chengyu traditionnel). Études : 学业进步 (progrès académiques), 考试顺利 (que l\'examen se passe bien). Voyage : 一路平安 (bon voyage en sécurité), 一路顺风 (vent favorable). Santé : 早日康复 (rétablissement rapide). Travail : 工作顺利 (que le boulot marche bien). Ces formules paraissent figées mais sont VRAIMENT attendues pour les occasions correspondantes — l\'absence est notée.',
    bodyEn:
      '生日快乐 (happy birthday), 新年快乐 (happy new year), 节日快乐 (happy holiday). For weddings: 百年好合 (100 years of happy union), 早生贵子 (have a fine boy soon — traditional chengyu). Studies: 学业进步 (academic progress), 考试顺利 (good luck on the exam). Travel: 一路平安 (safe travels), 一路顺风 (favorable wind). Health: 早日康复 (quick recovery). Work: 工作顺利 (work goes well). These formulas seem fixed but are REALLY expected for matching occasions — absence is noted.',
    items: [
      { hanzi: '快乐', pinyin: 'kuài lè', meaning: 'joyeux', meaningEn: 'happy', audio: 'audio/hsk2/hsk2_快乐.wav' },
      { hanzi: '顺利', pinyin: 'shùn lì', meaning: 'sans heurts', meaningEn: 'smooth', audio: 'audio/hsk4/hsk4_顺利.wav' },
      { hanzi: '康复', pinyin: 'kāng fù', meaning: 'rétablissement', meaningEn: 'recovery', audio: 'audio/hsk6/hsk6_康复.wav' },
      { hanzi: '一路平安', pinyin: 'yí lù píng ān', meaning: 'bon voyage', meaningEn: 'safe travels', audio: 'audio/hsk6/hsk6_平安.wav' },
      { hanzi: '祝你', pinyin: 'zhù nǐ', meaning: 'je te souhaite', meaningEn: 'I wish you', audio: 'audio/hsk3/hsk3_祝.wav' }
    ],
    tip:
      'Pour le Nouvel An chinois (春节), envoie le vœu sur WeChat le matin du jour J : 新年快乐！恭喜发财！(joyeux nouvel an + souhait de prospérité). Le double vœu est culturellement attendu, surtout aux aînés.',
    tipEn:
      'For Chinese New Year (春节), send wishes on WeChat the morning of: 新年快乐！恭喜发财！(happy new year + wishing prosperity). The double wish is culturally expected, especially to elders.'
  }
];

export const b11ConvM5LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-rdv-pro',
    title: 'Prendre un RDV professionnel',
    titleEn: 'Make a professional appointment',
    body:
      'Plus formel que le RDV amical du A2. Ouvrir : 您好，我想跟您约个时间 (bonjour, je voudrais convenir d\'un moment avec vous). Préciser : 关于 X 的事情 (concernant X), 大概需要 30 分钟 (environ 30 min). Proposer : 您下周二上午方便吗？(mardi prochain matin, ça vous va ?). Accepter : 没问题，我下午两点有空 (pas de souci, dispo à 14 h). Confirmer par mail/WeChat : 那就这样定了 (c\'est dit comme ça). 24 h avant, reconfirmer : 明天我们的会议还按计划进行吗？(notre réunion de demain est toujours prévue ?). Ce reconfirm est attendu.',
    bodyEn:
      'More formal than A2 friendly meet-up. Open: 您好，我想跟您约个时间 (hello, I\'d like to set a time with you). Specify: 关于 X 的事情 (about X), 大概需要 30 分钟 (about 30 min). Propose: 您下周二上午方便吗？(next Tuesday morning OK?). Accept: 没问题，我下午两点有空 (no problem, free at 2pm). Confirm by mail/WeChat: 那就这样定了 (settled then). 24h before, reconfirm: 明天我们的会议还按计划进行吗？(is tomorrow\'s meeting still on?). This reconfirm is expected.',
    items: [
      { hanzi: '约', pinyin: 'yuē', meaning: 'convenir, donner RDV', meaningEn: 'arrange, set', audio: 'audio/hsk3/hsk3_约.wav' },
      { hanzi: '关于', pinyin: 'guān yú', meaning: 'concernant', meaningEn: 'concerning', audio: 'audio/hsk3/hsk3_关于.wav' },
      { hanzi: '大概', pinyin: 'dà gài', meaning: 'environ', meaningEn: 'approximately', audio: 'audio/hsk4/hsk4_大概.wav' },
      { hanzi: '会议', pinyin: 'huì yì', meaning: 'réunion', meaningEn: 'meeting', audio: 'audio/hsk4/hsk4_会议.wav' },
      { hanzi: '计划', pinyin: 'jì huà', meaning: 'plan', meaningEn: 'plan', audio: 'audio/hsk4/hsk4_计划.wav' }
    ],
    tip:
      'En milieu pro chinois, reconfirmer un RDV 24 h avant n\'est pas optionnel — c\'est une marque de sérieux. Sans cela, le destinataire peut douter que tu viennes vraiment.',
    tipEn:
      'In Chinese pro settings, reconfirming a meeting 24h before is not optional — it\'s a mark of seriousness. Without it, the recipient may doubt you\'re really coming.'
  },
  {
    id: 'b11-job-interview',
    title: 'Mini entretien : se présenter pro',
    titleEn: 'Mini interview: introduce yourself professionally',
    body:
      'Structure : 我叫 X，今年 X 岁，毕业于 X 大学 (école), 主修 X (spécialité). Expérience : 我有 X 年工作经验 (X années d\'expérience), 在 X 公司工作过 (j\'ai travaillé chez X). Compétences : 我擅长 X (je suis fort en X), 我对 X 感兴趣 (je m\'intéresse à X). Pour conclure : 希望有机会跟您合作 (j\'espère pouvoir collaborer). Question fréquente : 你为什么想来我们公司 ? Réponse type : 我了解贵公司的项目，我觉得很有意思 + une raison précise.',
    bodyEn:
      'Structure: 我叫 X，今年 X 岁，毕业于 X 大学 (school), 主修 X (major). Experience: 我有 X 年工作经验 (X years of experience), 在 X 公司工作过 (I worked at X). Skills: 我擅长 X (I\'m good at X), 我对 X 感兴趣 (I\'m interested in X). To close: 希望有机会跟您合作 (I hope to have the chance to collaborate). Frequent question: 你为什么想来我们公司？ Sample reply: 我了解贵公司的项目，我觉得很有意思 + a specific reason.',
    items: [
      { hanzi: '毕业', pinyin: 'bì yè', meaning: 'diplômé', meaningEn: 'graduate', audio: 'audio/hsk4/hsk4_毕业.wav' },
      { hanzi: '专业', pinyin: 'zhuān yè', meaning: 'spécialité', meaningEn: 'major', audio: 'audio/hsk4/hsk4_专业.wav' },
      { hanzi: '经验', pinyin: 'jīng yàn', meaning: 'expérience', meaningEn: 'experience', audio: 'audio/hsk4/hsk4_经验.wav' },
      { hanzi: '擅长', pinyin: 'shàn cháng', meaning: 'fort en, expert', meaningEn: 'good at', audio: 'audio/hsk6/hsk6_擅长.wav' },
      { hanzi: '合作', pinyin: 'hé zuò', meaning: 'collaborer', meaningEn: 'collaborate', audio: 'audio/hsk4/hsk4_合作.wav' }
    ],
    tip:
      '« 贵公司 » (votre estimée entreprise) est une formule respectueuse au lieu de 你们公司. À utiliser dans toutes les conversations pro avec un client/employeur potentiel.',
    tipEn:
      '«贵公司» (your esteemed company) is a respectful formula instead of 你们公司. Use in all pro conversations with a client/potential employer.'
  }
];

export const b11ConvM6LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-conseiller',
    title: 'Conseiller un ami sans imposer',
    titleEn: 'Advise a friend without imposing',
    body:
      'Ouvrir : 我跟你说一下我的想法，你参考一下 (laisse-moi te dire ce que je pense, à toi de voir). 你为什么不试试…？(et si tu essayais…?). Suggérer : 也许你可以… (peut-être que tu pourrais…), 我建议你… (je te suggère…), 不如…吧 (autant…). Adoucir : 这只是我的建议 (c\'est juste un conseil), 你自己决定 (à toi de décider). À ÉVITER : 你应该 (tu devrais — sonne moralisateur), 你必须 (tu dois — autoritaire). Préfère 你可以考虑… (tu peux considérer…). Le conseil chinois est INDIRECT pour respecter l\'autonomie de l\'autre.',
    bodyEn:
      'Open: 我跟你说一下我的想法，你参考一下 (let me share my thoughts, you decide). 你为什么不试试…？(why not try…?). Suggest: 也许你可以… (maybe you could…), 我建议你… (I suggest…), 不如…吧 (might as well…). Soften: 这只是我的建议 (this is just my advice), 你自己决定 (you decide). AVOID: 你应该 (you should — moralizing), 你必须 (you must — authoritarian). Prefer 你可以考虑… (you could consider). Chinese advice is INDIRECT to respect the other\'s autonomy.',
    items: [
      { hanzi: '建议', pinyin: 'jiàn yì', meaning: 'suggérer', meaningEn: 'suggest', audio: 'audio/hsk4/hsk4_建议.wav' },
      { hanzi: '参考', pinyin: 'cān kǎo', meaning: 'consulter, à titre indicatif', meaningEn: 'reference', audio: 'audio/hsk4/hsk4_参考.wav' },
      { hanzi: '试试', pinyin: 'shì shi', meaning: 'essayer un peu', meaningEn: 'give a try', audio: 'audio/hsk2/hsk2_试.wav' },
      { hanzi: '考虑', pinyin: 'kǎo lǜ', meaning: 'considérer', meaningEn: 'consider', audio: 'audio/hsk4/hsk4_考虑.wav' },
      { hanzi: '决定', pinyin: 'jué dìng', meaning: 'décider', meaningEn: 'decide', audio: 'audio/hsk3/hsk3_决定.wav' }
    ],
    tip:
      'Conseil culturel : « 你参考一下 » (à titre indicatif) est essentiel pour préserver la face de l\'autre. Sans cette précaution, ton conseil sonne autoritaire/moralisateur.',
    tipEn:
      'Cultural tip: «你参考一下» (just for reference) is essential to preserve the other\'s face. Without that hedge, your advice sounds authoritarian/moralizing.'
  },
  {
    id: 'b11-plainte',
    title: 'Exprimer une plainte sans être agressif',
    titleEn: 'Voice a complaint without being aggressive',
    body:
      'Au resto, en magasin : 不好意思，这个菜有点问题 (excusez, ce plat a un souci). 我点的不是这个 (ce n\'est pas ce que j\'ai commandé). Demander un échange : 能不能换一下？(on peut changer ?). Pour un produit défectueux : 这个东西坏了 (cassé), 能退货吗？(je peux le retourner ?). Toujours commencer par 不好意思 ou 麻烦你 — adoucit énormément. Éviter le ton de colère : si tu hausses la voix, ton interlocuteur perd la face et devient défensif. Calme + précis = obtenir gain de cause.',
    bodyEn:
      'At a restaurant, in a store: 不好意思，这个菜有点问题 (sorry, this dish has an issue). 我点的不是这个 (this isn\'t what I ordered). Ask for an exchange: 能不能换一下？(can we swap?). For a defective product: 这个东西坏了 (broken), 能退货吗？(can I return it?). Always start with 不好意思 or 麻烦你 — softens hugely. Avoid an angry tone: if you raise your voice, the other loses face and becomes defensive. Calm + precise = winning your case.',
    items: [
      { hanzi: '问题', pinyin: 'wèn tí', meaning: 'problème', meaningEn: 'problem', audio: 'audio/hsk2/hsk2_问题.wav' },
      { hanzi: '换', pinyin: 'huàn', meaning: 'échanger', meaningEn: 'exchange', audio: 'audio/hsk3/hsk3_换.wav' },
      { hanzi: '坏', pinyin: 'huài', meaning: 'cassé, mauvais', meaningEn: 'broken, bad', audio: 'audio/hsk3/hsk3_坏.wav' },
      { hanzi: '退货', pinyin: 'tuì huò', meaning: 'retourner un achat', meaningEn: 'return goods', audio: 'audio/hsk5/hsk5_退货.wav' },
      { hanzi: '解决', pinyin: 'jiě jué', meaning: 'résoudre', meaningEn: 'solve', audio: 'audio/hsk4/hsk4_解决.wav' }
    ],
    tip:
      'Si tu rencontres un problème en Chine, formule : « 不好意思，能不能帮我解决一下？» (excusez-moi, pouvez-vous m\'aider à résoudre ça ?). Cette phrase ouvre des portes — tu demandes de l\'AIDE plutôt que de te plaindre.',
    tipEn:
      'If you hit a problem in China, frame: «不好意思，能不能帮我解决一下？» (excuse me, can you help me solve this?). This phrase opens doors — you ask for HELP rather than complain.'
  }
];

export const b11ConvM7LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-projet',
    title: 'Présenter un projet ou une idée',
    titleEn: 'Present a project or idea',
    body:
      'Structure : contexte → objectif → moyens → bénéfices. Ouvrir : 我想介绍一下我们的项目 (je voudrais présenter notre projet). Contexte : 大家都知道现在 X 是个问题 (chacun sait que X est un problème). Objectif : 我们希望解决 X (notre objectif est de résoudre X). Moyens : 通过 X 和 Y (par X et Y), 主要分三个步骤 (en 3 étapes principales). Bénéfices : 这样可以 X (ainsi on peut X). Conclure : 谢谢大家！欢迎提问 (merci, vos questions sont les bienvenues). Le format chinois est plus structuré et formel qu\'en Occident — l\'improvisation est mal vue en pro.',
    bodyEn:
      'Structure: context → objective → means → benefits. Open: 我想介绍一下我们的项目 (I\'d like to introduce our project). Context: 大家都知道现在 X 是个问题 (everyone knows X is a problem). Objective: 我们希望解决 X (our goal is to solve X). Means: 通过 X 和 Y (through X and Y), 主要分三个步骤 (mainly in 3 steps). Benefits: 这样可以 X (this way we can X). Close: 谢谢大家！欢迎提问 (thanks everyone, questions welcome). Chinese format is more structured and formal than the West — improvisation is frowned upon in pro settings.',
    items: [
      { hanzi: '项目', pinyin: 'xiàng mù', meaning: 'projet', meaningEn: 'project', audio: 'audio/hsk5/hsk5_项目.wav' },
      { hanzi: '介绍', pinyin: 'jiè shào', meaning: 'présenter', meaningEn: 'introduce', audio: 'audio/hsk2/hsk2_介绍.wav' },
      { hanzi: '解决', pinyin: 'jiě jué', meaning: 'résoudre', meaningEn: 'solve', audio: 'audio/hsk4/hsk4_解决.wav' },
      { hanzi: '步骤', pinyin: 'bù zhòu', meaning: 'étape', meaningEn: 'step', audio: 'audio/hsk5/hsk5_步骤.wav' },
      { hanzi: '提问', pinyin: 'tí wèn', meaning: 'poser une question', meaningEn: 'ask a question', audio: 'audio/hsk5/hsk5_提问.wav' }
    ],
    tip:
      'Lors d\'une présentation chinoise, éviter l\'humour spontané — risque de perdre la face si la blague tombe à plat. Le sérieux + structuré est valorisé. L\'humour vient APRÈS, en privé.',
    tipEn:
      'In a Chinese presentation, avoid spontaneous humor — risk of losing face if the joke falls flat. Serious + structured is valued. Humor comes LATER, in private.'
  },
  {
    id: 'b11-parcours',
    title: 'Parler de son parcours et ses ambitions',
    titleEn: 'Talk about your journey and ambitions',
    body:
      'Récit : 我在大学学了 X 年，毕业后去了 X 公司 (j\'ai étudié X années à l\'uni, après diplôme je suis allé chez X). Verbes-pivots : 学 (étudier), 毕业 (diplômé), 工作 (travailler), 换工作 (changer de job), 跳槽 (démissionner pour mieux — argot RH chinois), 创业 (créer une boîte). Ambitions : 我想在 X 年内 X (j\'aimerais X dans X années), 我的目标是 X. Pour le rêve : 我希望有一天 X (j\'espère un jour). Phrase moderne très utilisée par les jeunes : 我想找一份有意义的工作 (je veux un travail qui a du sens) — sujet d\'époque.',
    bodyEn:
      'Narrative: 我在大学学了 X 年，毕业后去了 X 公司 (studied X years at uni, after grad went to X company). Pivot verbs: 学 (study), 毕业 (graduate), 工作 (work), 换工作 (change jobs), 跳槽 (jump ship for better — Chinese HR slang), 创业 (start a business). Ambitions: 我想在 X 年内 X (I\'d like X within X years), 我的目标是 X. For dreams: 我希望有一天 X (I hope one day). Very common modern phrase among young people: 我想找一份有意义的工作 (I want a job that has meaning) — generational topic.',
    items: [
      { hanzi: '毕业', pinyin: 'bì yè', meaning: 'diplômé', meaningEn: 'graduate', audio: 'audio/hsk4/hsk4_毕业.wav' },
      { hanzi: '换工作', pinyin: 'huàn gōng zuò', meaning: 'changer de boulot', meaningEn: 'change jobs', audio: 'audio/hsk3/hsk3_换.wav' },
      { hanzi: '跳槽', pinyin: 'tiào cáo', meaning: 'démissionner pour mieux', meaningEn: 'jump ship', audio: 'audio/hsk6/hsk6_跳槽.wav' },
      { hanzi: '创业', pinyin: 'chuàng yè', meaning: 'créer une boîte', meaningEn: 'start a business', audio: 'audio/hsk5/hsk5_创业.wav' },
      { hanzi: '目标', pinyin: 'mù biāo', meaning: 'objectif', meaningEn: 'goal', audio: 'audio/hsk4/hsk4_目标.wav' }
    ],
    tip:
      '« 跳槽 » (« sauter du bac/auge ») est l\'argot RH chinois pour démissionner et aller chez la concurrence. Très utilisé en tech et finance. À reconnaître absolument en conversation pro.',
    tipEn:
      '«跳槽» («jumping the trough») is Chinese HR slang for resigning to join a competitor. Very common in tech and finance. Must recognize in pro conversations.'
  }
];

// === NUANCES B1.1 ============================================================

export const b11NuancesM1LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-rang-shi-jiao',
    title: '让 vs 使 vs 叫 — trois causatifs « faire faire »',
    titleEn: '让 vs 使 vs 叫 — three causatives «make do»',
    body:
      '让 (ràng) = laisser / faire faire (oral, neutre). 妈妈让我去 = maman me fait y aller / me laisse y aller. Le plus universel à l\'oral. 使 (shǐ) = causer (formel, écrit, abstrait — émotions, états). 这个故事使我感动 = cette histoire m\'émeut. JAMAIS 让我感动 dans un texte écrit soutenu. 叫 (jiào) = ordonner (oral, autoritaire — supérieur vers subordonné, parent vers enfant). 老板叫我加班 = le patron m\'a ordonné de faire des heures sup. Ton plus directif. Hierarchy : 让 (neutre) < 叫 (autorité) < 使 (formel/abstrait).',
    bodyEn:
      '让 (ràng) = let / make do (spoken, neutral). 妈妈让我去 = mom makes me go / lets me go. The most universal in speech. 使 (shǐ) = cause (formal, written, abstract — emotions, states). 这个故事使我感动 = this story moves me. NEVER 让我感动 in formal writing. 叫 (jiào) = order (spoken, authoritative — superior to subordinate, parent to child). 老板叫我加班 = boss ordered me to work overtime. More directive tone. Hierarchy: 让 (neutral) < 叫 (authority) < 使 (formal/abstract).',
    items: [
      { hanzi: '让', pinyin: 'ràng', meaning: 'laisser, faire faire', meaningEn: 'let, make do', audio: 'audio/hsk2/hsk2_让.wav' },
      { hanzi: '使', pinyin: 'shǐ', meaning: 'causer (formel)', meaningEn: 'cause (formal)', audio: 'audio/hsk3/hsk3_使.wav' },
      { hanzi: '叫', pinyin: 'jiào', meaning: 'ordonner', meaningEn: 'order, tell', audio: 'audio/hsk1/hsk1_叫.wav' },
      { hanzi: '感动', pinyin: 'gǎn dòng', meaning: 'émouvoir', meaningEn: 'move emotionally', audio: 'audio/hsk4/hsk4_感动.wav' },
      { hanzi: '加班', pinyin: 'jiā bān', meaning: 'faire des heures sup', meaningEn: 'work overtime', audio: 'audio/hsk4/hsk4_加班.wav' }
    ],
    tip:
      'Test rapide : si tu peux remplacer par « ordonner » → 叫. Par « émouvoir / rendre » devant un état abstrait → 使. Sinon → 让 par défaut. Le 让 est ton ami à l\'oral.',
    tipEn:
      'Quick test: if you can replace with «order» → 叫. With «move/render» before an abstract state → 使. Otherwise → 让 by default. 让 is your friend in speech.'
  },
  {
    id: 'b11-bei-rang',
    title: '让 (passif oral) vs 被 (passif standard)',
    titleEn: '让 (oral passive) vs 被 (standard passive)',
    body:
      'En plus du causatif, 让 sert AUSSI de passif à l\'oral. 我让他骗了 = je me suis fait avoir par lui (passif oral). 我被他骗了 = j\'ai été trompé par lui (passif standard). Différence : 让-passif est PLUS ORAL et garde une légère teinte « j\'ai laissé arriver ça » (responsabilité partielle). 被-passif est PLUS NEUTRE et peut être écrit. Synonyme oral encore : 给 (gěi) — 我给他骗了 (oral familier). Hierarchy oral → écrit : 给 < 让 < 被.',
    bodyEn:
      'Beyond causative, 让 ALSO serves as oral passive. 我让他骗了 = I got tricked by him (oral passive). 我被他骗了 = I was deceived by him (standard passive). Difference: 让-passive is MORE ORAL and carries a slight «I let it happen» tinge (partial responsibility). 被-passive is MORE NEUTRAL and can be written. Even more spoken synonym: 给 (gěi) — 我给他骗了 (casual oral). Hierarchy oral → written: 给 < 让 < 被.',
    items: [
      { hanzi: '被', pinyin: 'bèi', meaning: 'particule passive', meaningEn: 'passive particle', audio: 'audio/hsk3/hsk3_被.wav' },
      { hanzi: '骗', pinyin: 'piàn', meaning: 'tromper', meaningEn: 'deceive', audio: 'audio/hsk5/hsk5_骗.wav' },
      { hanzi: '偷', pinyin: 'tōu', meaning: 'voler', meaningEn: 'steal', audio: 'audio/hsk4/hsk4_偷.wav' },
      { hanzi: '丢', pinyin: 'diū', meaning: 'perdre', meaningEn: 'lose', audio: 'audio/hsk4/hsk4_丢.wav' },
      { hanzi: '抓', pinyin: 'zhuā', meaning: 'attraper', meaningEn: 'catch', audio: 'audio/hsk5/hsk5_抓.wav' }
    ],
    tip:
      'À l\'écrit B1+, préfère TOUJOURS 被 pour le passif. À l\'oral entre amis, 给/让 sont OK. En conversation pro avec un supérieur, garde 被 (plus neutre, sans suggérer ta responsabilité).',
    tipEn:
      'In B1+ writing, ALWAYS prefer 被 for passive. Orally among friends, 给/让 are fine. In pro conversation with a superior, keep 被 (more neutral, doesn\'t suggest your responsibility).'
  }
];

export const b11NuancesM2LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-gei-wei-ti',
    title: '给 vs 为 vs 替 — pour, à la place de, au profit de',
    titleEn: '给 vs 为 vs 替 — for, in place of, in favor of',
    body:
      '给 (gěi) = à, donner à (destinataire concret). 我给妈妈打电话 = j\'appelle maman (à elle). 为 (wèi) = pour, en faveur de (cause / motivation abstraite). 我为你高兴 = je suis content pour toi. 我为环境做点事 = je fais qqch pour l\'environnement. 替 (tì) = à la place de, en remplacement. 我替你去 = j\'y vais à ta place. Différences : 给 = transmission concrète (objet, message) ; 为 = motivation/cause abstraite ; 替 = substitution physique. Erreur classique : utiliser 为 pour un coup de fil → 我为妈妈打电话 ✗.',
    bodyEn:
      '给 (gěi) = to, give to (concrete recipient). 我给妈妈打电话 = I call mom (to her). 为 (wèi) = for, in favor of (abstract cause / motivation). 我为你高兴 = I\'m happy for you. 我为环境做点事 = I do something for the environment. 替 (tì) = in place of, as a substitute. 我替你去 = I\'ll go in your place. Differences: 给 = concrete transmission (object, message); 为 = abstract motivation/cause; 替 = physical substitution. Common mistake: using 为 for a phone call → 我为妈妈打电话 ✗.',
    items: [
      { hanzi: '给', pinyin: 'gěi', meaning: 'à, donner à', meaningEn: 'to, give to', audio: 'audio/hsk2/hsk2_给.wav' },
      { hanzi: '为', pinyin: 'wèi', meaning: 'pour (motivation)', meaningEn: 'for (motivation)', audio: 'audio/hsk3/hsk3_为.wav' },
      { hanzi: '替', pinyin: 'tì', meaning: 'à la place de', meaningEn: 'in place of', audio: 'audio/hsk4/hsk4_替.wav' },
      { hanzi: '环境', pinyin: 'huán jìng', meaning: 'environnement', meaningEn: 'environment', audio: 'audio/hsk3/hsk3_环境.wav' },
      { hanzi: '帮忙', pinyin: 'bāng máng', meaning: 'donner un coup de main', meaningEn: 'give a hand', audio: 'audio/hsk3/hsk3_帮忙.wav' }
    ],
    tip:
      'Astuce sentimentale : « 我为你高兴 » (je suis content POUR toi) est plus chaleureux que « 我替你高兴 » (je remplace ta joie). Sentir la différence affective entre 为 (motivation) et 替 (remplacement) est un vrai marqueur B1.',
    tipEn:
      'Emotional tip: «我为你高兴» (I\'m happy FOR you) is warmer than «我替你高兴» (I substitute your joy). Feeling the affective difference between 为 (motivation) and 替 (replacement) is a real B1 marker.'
  },
  {
    id: 'b11-yong-ti',
    title: '替 vs 代 — substitution informelle vs formelle',
    titleEn: '替 vs 代 — informal vs formal substitution',
    body:
      '替 (tì) = remplacer (oral, informel). 我替他去 = j\'y vais à sa place. 代 (dài) = remplacer (formel, écrit, structuré). 代表 = représentant. 代理 = agent. 代课 = cours de remplacement. Au B1, retiens : 替 pour les actions ponctuelles entre amis ; 代 pour les rôles institutionnels. Composé utile : 代我向他问好 = passe-lui mes salutations (au nom de moi). 替我向他问好 fonctionne aussi mais 代 est légèrement plus chic. À l\'écrit, préfère systématiquement 代.',
    bodyEn:
      '替 (tì) = replace (spoken, informal). 我替他去 = I go in his place. 代 (dài) = replace (formal, written, institutional). 代表 = representative. 代理 = agent. 代课 = substitute teaching. At B1, remember: 替 for casual one-off actions among friends; 代 for institutional roles. Useful compound: 代我向他问好 = pass on my regards (on my behalf). 替我向他问好 works too but 代 is slightly more refined. In writing, always prefer 代.',
    items: [
      { hanzi: '代', pinyin: 'dài', meaning: 'remplacer (formel)', meaningEn: 'substitute (formal)', audio: 'audio/hsk5/hsk5_代.wav' },
      { hanzi: '代表', pinyin: 'dài biǎo', meaning: 'représentant', meaningEn: 'representative', audio: 'audio/hsk4/hsk4_代表.wav' },
      { hanzi: '代理', pinyin: 'dài lǐ', meaning: 'agent, intérim', meaningEn: 'agent, acting', audio: 'audio/hsk6/hsk6_代理.wav' },
      { hanzi: '问好', pinyin: 'wèn hǎo', meaning: 'saluer', meaningEn: 'greet', audio: 'audio/hsk2/hsk2_问好.wav' },
      { hanzi: '向', pinyin: 'xiàng', meaning: 'vers, à', meaningEn: 'toward, to', audio: 'audio/hsk3/hsk3_向.wav' }
    ],
    tip:
      'Formule très utile à mémoriser : « 代我向 X 问好 » = passe mes salutations à X. Universellement utilisée et très appréciée en chinois — montre que tu te soucies des proches de l\'autre.',
    tipEn:
      'Very useful formula: «代我向 X 问好» = pass on my greetings to X. Universally used and very appreciated in Chinese — shows you care about the other\'s loved ones.'
  }
];

export const b11NuancesM3LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-qilai-xiaqu',
    title: '起来 vs 下去 vs 出来 — composés directionnels aspectuels',
    titleEn: '起来 vs 下去 vs 出来 — aspectual directional compounds',
    body:
      'Au-delà de leur sens directionnel basique, ces composés portent un ASPECT verbal. 起来 = commencer (action qui DÉMARRE). 我笑起来了 = je me suis mis à rire. 想起来 = se souvenir (l\'idée surgit). 看起来 = avoir l\'air de. 下去 = continuer (action qui PERSISTE). 说下去 = continue à parler. 看下去 = continue à lire. 出来 = se manifester (action qui RÉVÈLE). 我看出来了 = j\'ai compris (saisi par le regard). 听出来 = reconnaître à l\'oreille. Ces 3 sont fondamentaux à l\'oral B1.',
    bodyEn:
      'Beyond their basic directional sense, these compounds carry a verbal ASPECT. 起来 = start (action that BEGINS). 我笑起来了 = I started laughing. 想起来 = remember (idea surfaces). 看起来 = look like. 下去 = continue (action that PERSISTS). 说下去 = keep talking. 看下去 = keep reading. 出来 = manifest (action that REVEALS). 我看出来了 = I figured it out (caught visually). 听出来 = recognize by ear. These 3 are fundamental B1 oral.',
    items: [
      { hanzi: '起来', pinyin: 'qǐ lái', meaning: 'commencer (aspect)', meaningEn: 'start (aspect)', audio: 'audio/hsk3/hsk3_起来.wav' },
      { hanzi: '下去', pinyin: 'xià qù', meaning: 'continuer (aspect)', meaningEn: 'continue (aspect)', audio: 'audio/hsk3/hsk3_下去.wav' },
      { hanzi: '出来', pinyin: 'chū lái', meaning: 'révéler (aspect)', meaningEn: 'reveal (aspect)', audio: 'audio/hsk3/hsk3_出来.wav' },
      { hanzi: '想起来', pinyin: 'xiǎng qǐ lái', meaning: 'se souvenir', meaningEn: 'recall', audio: 'audio/hsk3/hsk3_想.wav' },
      { hanzi: '看出来', pinyin: 'kàn chū lái', meaning: 'comprendre, deviner', meaningEn: 'figure out', audio: 'audio/hsk1/hsk1_看.wav' }
    ],
    tip:
      'Trio mnémotechnique : 起来 = COMMENCER (debout = on commence) | 下去 = CONTINUER (descend = on poursuit) | 出来 = RÉVÉLER (sort = ça apparaît). À mémoriser comme bloc.',
    tipEn:
      'Mnemonic trio: 起来 = START (standing up = you begin) | 下去 = CONTINUE (going down = you keep going) | 出来 = REVEAL (coming out = it appears). Memorize as a block.'
  },
  {
    id: 'b11-qilai-suivant',
    title: '起来 d\'apparence : « 看起来 / 听起来 / 闻起来 »',
    titleEn: '起来 of appearance: «看起来 / 听起来 / 闻起来»',
    body:
      'Construction très utile : sens + 起来 = avoir l\'air / sembler. 看起来 (visuellement), 听起来 (auditivement), 闻起来 (olfactivement), 摸起来 (au toucher), 吃起来 (au goût), 用起来 (à l\'usage). 这个菜看起来很好吃 = ce plat a l\'air bon. 这个想法听起来不错 = cette idée semble bien. Erreur fréquente : utiliser 像 (sembler comme) → mauvais. 像 introduit une comparaison concrète, pas une impression sensorielle. « Ça a l\'air bon » = 看起来好 ; « ça ressemble à un poisson » = 像鱼.',
    bodyEn:
      'Very useful construction: sense + 起来 = look like / sound like. 看起来 (visually), 听起来 (auditorily), 闻起来 (olfactorily), 摸起来 (by touch), 吃起来 (by taste), 用起来 (by use). 这个菜看起来很好吃 = this dish looks tasty. 这个想法听起来不错 = this idea sounds good. Common mistake: using 像 (be like) — wrong. 像 introduces a concrete comparison, not a sensory impression. «Looks tasty» = 看起来好; «looks like a fish» = 像鱼.',
    items: [
      { hanzi: '看起来', pinyin: 'kàn qǐ lái', meaning: 'avoir l\'air', meaningEn: 'look like', audio: 'audio/hsk1/hsk1_看.wav' },
      { hanzi: '听起来', pinyin: 'tīng qǐ lái', meaning: 'sembler à l\'oreille', meaningEn: 'sound like', audio: 'audio/hsk1/hsk1_听.wav' },
      { hanzi: '闻起来', pinyin: 'wén qǐ lái', meaning: 'sentir', meaningEn: 'smell like', audio: 'audio/hsk5/hsk5_闻.wav' },
      { hanzi: '摸起来', pinyin: 'mō qǐ lái', meaning: 'au toucher', meaningEn: 'feels like', audio: 'audio/hsk5/hsk5_摸.wav' },
      { hanzi: '吃起来', pinyin: 'chī qǐ lái', meaning: 'au goût', meaningEn: 'tastes like', audio: 'audio/hsk1/hsk1_吃.wav' }
    ],
    tip:
      'Pour donner ton AVIS sur un plat sans engagement total : « 看起来不错，但我没尝过 » (ça a l\'air bon, mais je n\'ai pas goûté). Phrase de politesse universelle.',
    tipEn:
      'To give an OPINION on a dish without full commitment: «看起来不错，但我没尝过» (looks good but I haven\'t tasted). Universal polite phrase.'
  }
];

export const b11NuancesM4LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-xiang-haoxiang',
    title: '像 vs 好像 vs 似乎 — comme, on dirait, semble',
    titleEn: '像 vs 好像 vs 似乎 — like, seems, appears',
    body:
      '像 (xiàng) = ressembler à (comparaison CONCRÈTE). 他像他爸爸 = il ressemble à son père. 像你这样的人 = quelqu\'un comme toi. 好像 (hǎoxiàng) = on dirait, apparemment (impression INCERTAINE). 好像下雨了 = on dirait qu\'il pleut. 他好像不知道 = apparemment il ne sait pas. 似乎 (sìhū) = sembler (formel, écrit). 似乎不太可能 = cela semble peu probable. Hierarchy : 像 (concret comparaison) ≠ 好像 (impression oral) ≠ 似乎 (impression écrit). Erreur classique : utiliser 像 pour « il semble que » → préfère 好像.',
    bodyEn:
      '像 (xiàng) = resemble (CONCRETE comparison). 他像他爸爸 = he looks like his dad. 像你这样的人 = someone like you. 好像 (hǎoxiàng) = seems, apparently (UNCERTAIN impression). 好像下雨了 = seems like it\'s raining. 他好像不知道 = apparently he doesn\'t know. 似乎 (sìhū) = appear (formal, written). 似乎不太可能 = appears unlikely. Hierarchy: 像 (concrete comparison) ≠ 好像 (oral impression) ≠ 似乎 (written impression). Common mistake: using 像 for «it seems» → prefer 好像.',
    items: [
      { hanzi: '像', pinyin: 'xiàng', meaning: 'ressembler à', meaningEn: 'resemble', audio: 'audio/hsk3/hsk3_像.wav' },
      { hanzi: '好像', pinyin: 'hǎo xiàng', meaning: 'on dirait', meaningEn: 'seem', audio: 'audio/hsk4/hsk4_好像.wav' },
      { hanzi: '似乎', pinyin: 'sì hū', meaning: 'sembler (écrit)', meaningEn: 'appear (written)', audio: 'audio/hsk5/hsk5_似乎.wav' },
      { hanzi: '可能', pinyin: 'kě néng', meaning: 'peut-être', meaningEn: 'maybe', audio: 'audio/hsk2/hsk2_可能.wav' },
      { hanzi: '不太', pinyin: 'bú tài', meaning: 'pas trop', meaningEn: 'not very', audio: 'audio/hsk2/hsk2_不太.wav' }
    ],
    tip:
      'À l\'oral B1, 好像 est l\'outil n°1 pour adoucir une affirmation. « Il est en colère » → trop tranchant ; « 他好像生气了 » → impression nuancée. Fais-en ton ami.',
    tipEn:
      'In B1 speech, 好像 is the n°1 tool to soften an assertion. «He\'s angry» → too sharp; «他好像生气了» → nuanced impression. Make it your friend.'
  },
  {
    id: 'b11-shide-haoxiang',
    title: 'Variantes : 似的 / 一样 / 跟…一样',
    titleEn: 'Variants: 似的 / 一样 / 跟…一样',
    body:
      '似的 (shìde) = comme (à la fin de la comparaison). 像孩子似的 = comme un enfant. Souvent en duo avec 像 : 像 X 似的. 一样 (yíyàng) = pareil. 我跟你一样 = je suis comme toi. Combo classique : 跟 X 一样 + adjectif = aussi… que X. 他跟我一样高 = il est aussi grand que moi. À distinguer : 像 = ressemblance générale (comme), 一样 = égalité (pareil). 他像我 = il me ressemble (en partie) ; 他跟我一样 = il est comme moi (identique en ce point précis).',
    bodyEn:
      '似的 (shìde) = like (at the end of the comparison). 像孩子似的 = like a child. Often paired with 像: 像 X 似的. 一样 (yíyàng) = same. 我跟你一样 = I\'m like you. Classic combo: 跟 X 一样 + adjective = as… as X. 他跟我一样高 = he\'s as tall as me. Distinguish: 像 = general resemblance (like), 一样 = equality (same). 他像我 = he looks like me (partially); 他跟我一样 = he\'s like me (identical on that specific point).',
    items: [
      { hanzi: '似的', pinyin: 'shì de', meaning: 'comme (final)', meaningEn: 'like (final)', audio: 'audio/hsk5/hsk5_似的.wav' },
      { hanzi: '一样', pinyin: 'yí yàng', meaning: 'pareil', meaningEn: 'same', audio: 'audio/hsk3/hsk3_一样.wav' },
      { hanzi: '不一样', pinyin: 'bù yí yàng', meaning: 'différent', meaningEn: 'different', audio: 'audio/hsk3/hsk3_一样.wav' },
      { hanzi: '跟…一样', pinyin: 'gēn yí yàng', meaning: 'comme, aussi…que', meaningEn: 'same as, as…as', audio: 'audio/hsk3/hsk3_跟.wav' },
      { hanzi: '比', pinyin: 'bǐ', meaning: 'que (compare)', meaningEn: 'than', audio: 'audio/hsk2/hsk2_比.wav' }
    ],
    tip:
      'Astuce comparison : 跟…一样 (égalité) vs 比 (comparaison avec différence). 他跟我一样高 = il est aussi grand que moi (égal). 他比我高 = il est plus grand que moi (différent).',
    tipEn:
      'Comparison tip: 跟…一样 (equality) vs 比 (comparison with difference). 他跟我一样高 = he\'s as tall as me (equal). 他比我高 = he\'s taller than me (different).'
  }
];

export const b11NuancesM5LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-na-dai-bao',
    title: '拿 vs 带 vs 抱 — porter / apporter / serrer',
    titleEn: '拿 vs 带 vs 抱 — hold / bring / hug',
    body:
      '拿 (ná) = prendre / porter dans la main (objet petit, prise active). 我拿着一本书 = je tiens un livre. 帮我拿一下 = donne-moi un coup de main pour prendre. 带 (dài) = apporter / amener (objet OU personne, contexte de mouvement). 我带了水 = j\'ai apporté de l\'eau. 我带孩子去公园 = j\'amène les enfants au parc. 抱 (bào) = porter dans les bras / serrer. 抱孩子 (porter un bébé), 抱你一下 (un câlin). Différence : 拿 (main, objet) ≠ 带 (apporter avec soi) ≠ 抱 (bras, étreinte).',
    bodyEn:
      '拿 (ná) = take / hold in the hand (small object, active grip). 我拿着一本书 = I\'m holding a book. 帮我拿一下 = give me a hand to grab. 带 (dài) = bring / take along (object OR person, movement context). 我带了水 = I brought water. 我带孩子去公园 = I\'m taking the kids to the park. 抱 (bào) = hold in arms / hug. 抱孩子 (hold a baby), 抱你一下 (a hug). Difference: 拿 (hand, object) ≠ 带 (bring along) ≠ 抱 (arms, hug).',
    items: [
      { hanzi: '拿', pinyin: 'ná', meaning: 'tenir, prendre', meaningEn: 'hold, take', audio: 'audio/hsk3/hsk3_拿.wav' },
      { hanzi: '带', pinyin: 'dài', meaning: 'apporter, amener', meaningEn: 'bring, take along', audio: 'audio/hsk3/hsk3_带.wav' },
      { hanzi: '抱', pinyin: 'bào', meaning: 'porter dans les bras, étreindre', meaningEn: 'hug, hold in arms', audio: 'audio/hsk5/hsk5_抱.wav' },
      { hanzi: '提', pinyin: 'tí', meaning: 'porter (par anse)', meaningEn: 'carry (by handle)', audio: 'audio/hsk3/hsk3_提.wav' },
      { hanzi: '搬', pinyin: 'bān', meaning: 'déplacer (lourd)', meaningEn: 'move (heavy)', audio: 'audio/hsk5/hsk5_搬.wav' }
    ],
    tip:
      'Test rapide : « peux-tu attraper un livre ? » → 拿 (main). « Tu as pris ton parapluie ? » → 带 (apporter). « Tiens-moi le bébé » → 抱 (bras). Le verbe dépend du POIDS, du CANAL et du contexte.',
    tipEn:
      'Quick test: «can you grab a book?» → 拿 (hand). «Did you bring your umbrella?» → 带 (bring along). «Hold the baby» → 抱 (arms). The verb depends on WEIGHT, CHANNEL and context.'
  },
  {
    id: 'b11-songti-jihui',
    title: '送 vs 寄 vs 递 — donner / envoyer / passer',
    titleEn: '送 vs 寄 vs 递 — give / send / pass',
    body:
      '送 (sòng) = offrir / accompagner / livrer. 我送你一个礼物 = je t\'offre un cadeau. 我送你回家 = je te raccompagne. Verbe à 2 sens fondamentaux. 寄 (jì) = envoyer par la poste / par courrier. 我寄了一封信 = j\'ai envoyé une lettre. 寄快递 = envoi express. 递 (dì) = passer (de main à main). 把那个递给我 = passe-moi ça. Bagatelle, courte distance. 三个verbes ≠ : 送 (cadeau ou accompagnement), 寄 (par voie postale), 递 (de main à main). 邮递员 = facteur (composé : poste + passer + personne).',
    bodyEn:
      '送 (sòng) = give as a gift / accompany / deliver. 我送你一个礼物 = I give you a gift. 我送你回家 = I\'ll see you home. Verb with 2 fundamental senses. 寄 (jì) = send by mail / courier. 我寄了一封信 = I sent a letter. 寄快递 = express shipping. 递 (dì) = pass (hand to hand). 把那个递给我 = pass that to me. Trinket, short distance. Three different verbs: 送 (gift or escort), 寄 (postal), 递 (hand to hand). 邮递员 = postman (compound: mail + pass + person).',
    items: [
      { hanzi: '送', pinyin: 'sòng', meaning: 'offrir, accompagner', meaningEn: 'gift, escort', audio: 'audio/hsk2/hsk2_送.wav' },
      { hanzi: '寄', pinyin: 'jì', meaning: 'envoyer par poste', meaningEn: 'mail', audio: 'audio/hsk4/hsk4_寄.wav' },
      { hanzi: '递', pinyin: 'dì', meaning: 'passer de main', meaningEn: 'pass by hand', audio: 'audio/hsk6/hsk6_递.wav' },
      { hanzi: '快递', pinyin: 'kuài dì', meaning: 'livraison express', meaningEn: 'express delivery', audio: 'audio/hsk5/hsk5_快递.wav' },
      { hanzi: '礼物', pinyin: 'lǐ wù', meaning: 'cadeau', meaningEn: 'gift', audio: 'audio/hsk3/hsk3_礼物.wav' }
    ],
    tip:
      'En Chine, 送 a un sens très large : « je te raccompagne » utilise le même verbe que « je t\'offre un cadeau ». Comprendre cette polyvalence ouvre la porte au sens chinois de « accompagner = offrir du temps ».',
    tipEn:
      'In Chinese, 送 has a very broad sense: «I\'ll see you home» uses the same verb as «I give you a gift». Grasping this versatility opens the door to the Chinese sense of «accompanying = gifting time».'
  }
];

export const b11NuancesM6LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-tingjian-tingdao',
    title: '听 vs 听见 vs 听到 — entendre vs avoir entendu',
    titleEn: '听 vs 听见 vs 听到 — hear vs have heard',
    body:
      '听 (tīng) = écouter (action volontaire, processus). 我在听音乐 = j\'écoute de la musique. 听见 (tīngjiàn) = avoir entendu (perception accomplie, sans effort). 我听见了 = j\'ai entendu. 听到 (tīngdào) = entendre / avoir reçu une info (résultat + parfois nouvelle). 我听到他生病了 = j\'ai entendu dire qu\'il est malade. Différence : 听 = action, 听见 = perception physique aboutie, 听到 = info parvenue + perception. À l\'oral, 听见 et 听到 sont souvent interchangeables sauf quand 听到 introduit une INFO/RUMEUR.',
    bodyEn:
      '听 (tīng) = listen (voluntary action, process). 我在听音乐 = I\'m listening to music. 听见 (tīngjiàn) = have heard (effortless completed perception). 我听见了 = I heard it. 听到 (tīngdào) = hear / have received info (result + sometimes news). 我听到他生病了 = I heard he\'s sick. Difference: 听 = action, 听见 = completed physical perception, 听到 = info arrived + perception. In speech, 听见 and 听到 are often interchangeable except when 听到 introduces INFO/RUMOR.',
    items: [
      { hanzi: '听', pinyin: 'tīng', meaning: 'écouter', meaningEn: 'listen', audio: 'audio/hsk1/hsk1_听.wav' },
      { hanzi: '听见', pinyin: 'tīng jiàn', meaning: 'avoir entendu', meaningEn: 'have heard', audio: 'audio/hsk1/hsk1_听.wav' },
      { hanzi: '听到', pinyin: 'tīng dào', meaning: 'entendre (info)', meaningEn: 'hear (info)', audio: 'audio/hsk1/hsk1_听.wav' },
      { hanzi: '听说', pinyin: 'tīng shuō', meaning: 'j\'ai entendu dire', meaningEn: 'I heard', audio: 'audio/hsk2/hsk2_听说.wav' },
      { hanzi: '声音', pinyin: 'shēng yīn', meaning: 'son, voix', meaningEn: 'sound, voice', audio: 'audio/hsk3/hsk3_声音.wav' }
    ],
    tip:
      'Trois 听 + résultat : 听见 (perception physique : « tu m\'entends ? »), 听到 (info : « j\'ai entendu que… »), 听懂 (compréhension : « j\'ai compris ce que tu dis »). 听不懂 = je ne comprends pas (audio).',
    tipEn:
      'Three 听 + result: 听见 (physical perception: «do you hear me?»), 听到 (info: «I heard that…»), 听懂 (comprehension: «I understood what you said»). 听不懂 = I don\'t understand (audio).'
  },
  {
    id: 'b11-ganjue-juede',
    title: '感觉 vs 觉得 vs 感到 — sensation vs opinion',
    titleEn: '感觉 vs 觉得 vs 感到 — sensation vs opinion',
    body:
      '感觉 (gǎnjué) = sentir, sensation (PHYSIQUE ou ressenti corporel/émotionnel). 我感觉冷 = je sens du froid. 我感觉很累 = je me sens fatigué. 觉得 (juéde) = trouver, penser (OPINION subjective — déjà vu). 我觉得这个菜好吃 = je trouve ce plat bon. 感到 (gǎndào) = ressentir, éprouver (un peu plus formel/écrit que 感觉). 感到惊讶 = être surpris. Hierarchy : 感觉 (oral, sensation) < 觉得 (oral, opinion) < 感到 (écrit, ressenti structuré). Pour une douleur physique : préfère 感觉. Pour une opinion : préfère 觉得.',
    bodyEn:
      '感觉 (gǎnjué) = feel, sensation (PHYSICAL or bodily/emotional experience). 我感觉冷 = I feel cold. 我感觉很累 = I feel tired. 觉得 (juéde) = find, think (subjective OPINION — already covered). 我觉得这个菜好吃 = I find this dish tasty. 感到 (gǎndào) = experience, feel (slightly more formal/written than 感觉). 感到惊讶 = be surprised. Hierarchy: 感觉 (oral, sensation) < 觉得 (oral, opinion) < 感到 (written, structured feeling). For physical pain: prefer 感觉. For an opinion: prefer 觉得.',
    items: [
      { hanzi: '感觉', pinyin: 'gǎn jué', meaning: 'sentir, sensation', meaningEn: 'feel, sensation', audio: 'audio/hsk3/hsk3_感觉.wav' },
      { hanzi: '觉得', pinyin: 'jué de', meaning: 'trouver, penser', meaningEn: 'think, find', audio: 'audio/hsk2/hsk2_觉得.wav' },
      { hanzi: '感到', pinyin: 'gǎn dào', meaning: 'ressentir', meaningEn: 'experience', audio: 'audio/hsk4/hsk4_感到.wav' },
      { hanzi: '惊讶', pinyin: 'jīng yà', meaning: 'surpris', meaningEn: 'surprised', audio: 'audio/hsk5/hsk5_惊讶.wav' },
      { hanzi: '感动', pinyin: 'gǎn dòng', meaning: 'ému', meaningEn: 'moved', audio: 'audio/hsk4/hsk4_感动.wav' }
    ],
    tip:
      'Bonne pratique : à l\'oral, n\'hésite pas à utiliser 我感觉 quand tu décris une sensation ; 我觉得 pour une opinion. 我感到 reste utile à l\'écrit ou dans un discours soigné.',
    tipEn:
      'Good practice: in speech, freely use 我感觉 when describing a sensation; 我觉得 for an opinion. 我感到 remains useful in writing or in polished speech.'
  }
];

export const b11NuancesM7LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-yibian-youyou',
    title: '一边…一边… vs 又…又… — actions simultanées',
    titleEn: '一边…一边… vs 又…又… — simultaneous actions',
    body:
      '一边 X 一边 Y = faire X et Y en même temps (deux ACTIONS, même sujet, vraiment SIMULTANÉ). 我一边吃饭一边看电视 = je mange en regardant la télé. 又 X 又 Y = avoir X et Y en même temps (deux QUALITÉS / ÉTATS, parallélisme). 这个菜又好吃又便宜 = ce plat est à la fois bon et pas cher. Différence radicale : 一边 = ACTIONS qui se déroulent ; 又…又 = QUALITÉS qui coexistent. Erreur classique : 我又吃饭又看电视 = je mange ET je regarde la télé (énumération, pas simultané). Préfère toujours 一边…一边… pour les actions concurrentes.',
    bodyEn:
      '一边 X 一边 Y = doing X and Y at the same time (two ACTIONS, same subject, truly SIMULTANEOUS). 我一边吃饭一边看电视 = I eat while watching TV. 又 X 又 Y = having X and Y at the same time (two QUALITIES / STATES, parallelism). 这个菜又好吃又便宜 = this dish is both tasty and cheap. Radical difference: 一边 = ACTIONS taking place; 又…又 = QUALITIES coexisting. Common mistake: 我又吃饭又看电视 = I eat AND watch TV (enumeration, not simultaneous). Always prefer 一边…一边… for concurrent actions.',
    items: [
      { hanzi: '一边', pinyin: 'yì biān', meaning: 'd\'une part / en même temps', meaningEn: 'while', audio: 'audio/hsk3/hsk3_一边.wav' },
      { hanzi: '又', pinyin: 'yòu', meaning: 'aussi, à la fois', meaningEn: 'also, both', audio: 'audio/hsk3/hsk3_又.wav' },
      { hanzi: '同时', pinyin: 'tóng shí', meaning: 'en même temps', meaningEn: 'simultaneously', audio: 'audio/hsk4/hsk4_同时.wav' },
      { hanzi: '看电视', pinyin: 'kàn diàn shì', meaning: 'regarder la télé', meaningEn: 'watch TV', audio: 'audio/hsk1/hsk1_电视.wav' },
      { hanzi: '便宜', pinyin: 'pián yi', meaning: 'pas cher', meaningEn: 'cheap', audio: 'audio/hsk2/hsk2_便宜.wav' }
    ],
    tip:
      'Test rapide : VERBE simultané → 一边…一边. ADJECTIF coexistant → 又…又. « marcher en parlant » → 一边走一边说. « grand et fort » → 又高又壮.',
    tipEn:
      'Quick test: simultaneous VERB → 一边…一边. Coexisting ADJECTIVE → 又…又. «Walk while talking» → 一边走一边说. «Tall and strong» → 又高又壮.'
  },
  {
    id: 'b11-bingqie-erqie',
    title: '并且 vs 而且 — et de plus (registre)',
    titleEn: '并且 vs 而且 — and moreover (register)',
    body:
      '而且 (érqiě) = de plus, en outre (NEUTRE, oral et écrit). Très commun. 这个工作很有意思，而且工资也不错 = ce travail est intéressant, en plus le salaire est bon. 并且 (bìngqiě) = et de plus (FORMEL, écrit, plus structuré). 项目按时完成，并且超出预期 = le projet a été achevé à temps, et a dépassé les attentes. À l\'oral B1, 而且 partout. À l\'écrit (essais, rapports), alterne 而且 et 并且 pour le rythme. JAMAIS 并且 dans une conversation décontractée — sonne pédant.',
    bodyEn:
      '而且 (érqiě) = moreover, also (NEUTRAL, oral and written). Very common. 这个工作很有意思，而且工资也不错 = this job is interesting, plus the salary is good. 并且 (bìngqiě) = and moreover (FORMAL, written, more structured). 项目按时完成，并且超出预期 = the project was completed on time and exceeded expectations. In B1 speech, 而且 everywhere. In writing (essays, reports), alternate 而且 and 并且 for rhythm. NEVER 并且 in casual conversation — sounds pedantic.',
    items: [
      { hanzi: '而且', pinyin: 'ér qiě', meaning: 'de plus', meaningEn: 'moreover', audio: 'audio/hsk3/hsk3_而且.wav' },
      { hanzi: '并且', pinyin: 'bìng qiě', meaning: 'et de plus (formel)', meaningEn: 'and moreover (formal)', audio: 'audio/hsk5/hsk5_并且.wav' },
      { hanzi: '另外', pinyin: 'lìng wài', meaning: 'par ailleurs', meaningEn: 'in addition', audio: 'audio/hsk4/hsk4_另外.wav' },
      { hanzi: '此外', pinyin: 'cǐ wài', meaning: 'en outre (formel)', meaningEn: 'besides (formal)', audio: 'audio/hsk5/hsk5_此外.wav' },
      { hanzi: '工资', pinyin: 'gōng zī', meaning: 'salaire', meaningEn: 'salary', audio: 'audio/hsk4/hsk4_工资.wav' }
    ],
    tip:
      'Hierarchy oral → écrit pour « de plus » : 还 (oral, basique) < 而且 (oral standard) < 并且 (écrit) < 此外 (très soutenu, écrit). Choisis selon le registre attendu.',
    tipEn:
      'Hierarchy oral → written for «moreover»: 还 (oral, basic) < 而且 (oral standard) < 并且 (written) < 此外 (very formal, written). Choose by expected register.'
  }
];
