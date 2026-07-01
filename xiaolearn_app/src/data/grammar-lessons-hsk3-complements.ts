/**
 * grammar-lessons-hsk3-complements.ts — 6 fiches HSK3
 * ----------------------------------------------------
 * Compléments verbaux + conditionnels de niveau B1 :
 *   - Complément de direction simple (V + 来/去)
 *   - Complément de direction composé (V + 上/下/进/出/回/过/起 + 来/去)
 *   - Complément de degré (V + 得 + adj)
 *   - Complément de possibilité (V + 得/不 + résultatif)
 *   - 如果...就 (si... alors)
 *   - 只有...才 (uniquement si..., alors seulement)
 *
 * Chaque entrée respecte le shape `LessonItem` avec `grammarExplanation`
 * complet (when / how / mistakes / tips) + `examples` + `grammarQuiz`.
 */
import type { LessonItem } from '../types';

export const grammarLessonsHsk3Complements: LessonItem[] = [
  // ============================================
  // HSK3 — Complément de direction simple (V + 来/去)
  // ============================================
  {
    id: 'grammar-directional-simple',
    level: 'hsk3',
    hanzi: 'V + 来/去',
    pinyin: 'V + lái/qù',
    translation: 'simple directional complement: toward me (来) / away from me (去)',
    translationFr: 'complément de direction simple : vers moi (来) / loin de moi (去)',
    category: 'grammaire',
    explanation: 'Après un verbe de mouvement, 来/去 précise l\'orientation par rapport au LOCUTEUR. 来 = vers moi. 去 = loin de moi.',
    grammarExplanation: {
      whenToUse: 'Précision d\'orientation pour verbes 上, 下, 进, 出, 回, 过, 起 (monter, descendre, entrer, sortir, revenir, traverser, se lever).',
      whenToUseEn: 'Direction marker for verbs 上, 下, 进, 出, 回, 过, 起 (go up, down, in, out, back, over, rise).',
      howToUse: 'Structure : Verbe + 来/去.\n\n• 上来 « monte (vers moi) » / 上去 « monte (loin de moi) »\n• 进来 « entre (chez moi) » / 进去 « entre (là-bas) »\n• 回来 « reviens ! » / 回去 « rentre chez toi »\n• 出来 « sors (vers moi) » / 出去 « sors (dehors) »\n\nAvec objet : Verbe + Objet + 来/去 (colloque) ou Verbe + 来/去 + Objet.',
      howToUseEn: 'Structure: Verb + 来/去.\n\n• 上来 "come up (to me)" / 上去 "go up (away)"\n• 进来 "come in (to my space)" / 进去 "go in (there)"\n• 回来 "come back!" / 回去 "go back home"\n• 出来 "come out (to me)" / 出去 "go out (away)"\n\nWith object: Verb + Object + 来/去 (colloquial) or Verb + 来/去 + Object.',
      commonMistakes: '❌ Ne pas mélanger le point de vue : 请进去 (bizarre si tu es DANS la pièce ; dis 请进来). Retiens : le locuteur est le POINT DE RÉFÉRENCE. 来 = « viens ici », 去 = « va là-bas ».',
      commonMistakesEn: '❌ Don\'t mix up the point of view: 请进去 (odd if you\'re INSIDE the room; say 请进来). The speaker is the REFERENCE POINT. 来 = "come here", 去 = "go there".',
      tips: '💡 Mnémo : 来 = « TO ME », 去 = « AWAY ». Toujours pense où EST LE LOCUTEUR.\n💡 回家去 = « rentre chez toi (moi je reste) », 回家来 = « rentre chez moi (viens ici) ».',
      tipsEn: '💡 Mnemonic: 来 = "TO ME", 去 = "AWAY". Always think about where the SPEAKER is.\n💡 回家去 = "go home (I stay)", 回家来 = "come to my home".',
      relatedGrammar: ['grammar-directional-compound']
    },
    audio: 'audio/grammar/grammar-directional-simple.wav',
    examples: [
      { hanzi: '快下来！', pinyin: 'kuài xiàlái!', translation: 'Come down quickly!', translationFr: 'Descends vite (vers moi) !' },
      { hanzi: '他上去了', pinyin: 'tā shàngqù le', translation: 'He went up', translationFr: 'Il est monté (loin de moi)' },
      { hanzi: '请进来', pinyin: 'qǐng jìnlái', translation: 'Please come in', translationFr: 'Entre s\'il te plaît (chez moi)' }
    ],
    quiz: {
      prompt: '"Monte (vers moi) !" =',
      choices: ['上去', '上来', '下去', '下来'],
      correctChoiceIndex: 1
    },
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '请___，外面冷',
      translation: 'Entre (chez moi), il fait froid dehors',
      translationEn: 'Come in, it\'s cold outside',
      choices: ['进来', '进去', '出来', '出去'],
      correctChoice: '进来',
      explanation: '进来 « entrer vers moi » — le locuteur est à l\'intérieur et invite l\'autre à le rejoindre.'
    },
    tags: ['grammaire', 'complément', 'direction'],
    theme: 'grammar'
  },

  // ============================================
  // HSK3 — Complément de direction composé
  // ============================================
  {
    id: 'grammar-directional-compound',
    level: 'hsk3',
    hanzi: 'V + 上/下/进/出/回/过/起 + 来/去',
    pinyin: 'V + shàng/xià/jìn/chū/huí/guò/qǐ + lái/qù',
    translation: 'compound directional complement (double orientation)',
    translationFr: 'complément de direction composé (double orientation)',
    category: 'grammaire',
    explanation: 'Combinaison : verbe d\'action + directionnel (上/下/进/出/回/过/起) + 来/去. Décrit un mouvement PRÉCIS avec double orientation.',
    grammarExplanation: {
      whenToUse: 'Pour un verbe d\'action MOUVEMENT complexe (walk in, run out, climb up, come back over...).',
      whenToUseEn: 'For a complex action MOTION verb (walk in, run out, climb up, come back over...).',
      howToUse: 'Structure : Verbe + Directionnel + 来/去.\n\n• 跑进来 « entrer en courant (vers moi) »\n• 走出去 « sortir en marchant (loin) »\n• 爬上去 « grimper là-haut »\n• 拿回来 « rapporter »\n• 站起来 « se lever »\n• 坐下来 « s\'asseoir »\n\nAvec objet : verbe + directionnel + Objet + 来/去 OU verbe + directionnel + 来/去 + Objet. Ex : 拿回一本书来 « rapporte-moi un livre ».',
      howToUseEn: 'Structure: Verb + Directional + 来/去.\n\n• 跑进来 "run in (toward me)"\n• 走出去 "walk out (away)"\n• 爬上去 "climb up (there)"\n• 拿回来 "bring back"\n• 站起来 "stand up"\n• 坐下来 "sit down"\n\nWith object: verb + directional + Object + 来/去 OR verb + directional + 来/去 + Object.',
      commonMistakes: '❌ Utiliser 来/去 seul quand un vrai verbe d\'action est visé : « il court entre » = ✅ 他跑进来 (pas 他进来 qui perd « en courant »). Ordre STRICT : verbe → directionnel → 来/去.',
      commonMistakesEn: '❌ Using 来/去 alone when a real action verb is meant: "he runs in" = ✅ 他跑进来 (not 他进来 which drops "running"). STRICT order: verb → directional → 来/去.',
      tips: '💡 Mnémo : décomposer en 3 : (1) VERBE d\'action (跑, 走, 拿), (2) DIRECTIONNEL (上/下/进/出/回), (3) POINT DE VUE (来/去).\n💡 Structures figurées : 起来 (« se mettre à... »), 下去 (« continuer à... »). Voir aussi les usages abstraits.',
      tipsEn: '💡 Mnemonic: 3 layers: (1) ACTION verb (跑, 走, 拿), (2) DIRECTIONAL (上/下/进/出/回), (3) VIEWPOINT (来/去).\n💡 Figurative uses: 起来 ("start to..."), 下去 ("keep on...").',
      relatedGrammar: ['grammar-directional-simple']
    },
    audio: 'audio/grammar/grammar-directional-compound.wav',
    examples: [
      { hanzi: '他跑进来了', pinyin: 'tā pǎo jìnlái le', translation: 'He ran in', translationFr: 'Il est entré en courant (vers moi)' },
      { hanzi: '请把书拿回来', pinyin: 'qǐng bǎ shū ná huílái', translation: 'Please bring the book back', translationFr: 'Rapporte le livre s\'il te plaît' },
      { hanzi: '站起来！', pinyin: 'zhàn qǐlái!', translation: 'Stand up!', translationFr: 'Debout !' }
    ],
    quiz: {
      prompt: '"Il court en sortant (loin)" :',
      choices: ['他跑进来', '他跑出去', '他走进来', '他走出去'],
      correctChoiceIndex: 1
    },
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '请把书___',
      translation: 'Rapporte le livre s\'il te plaît',
      translationEn: 'Please bring the book back',
      choices: ['拿回来', '拿回去', '拿出来', '拿出去'],
      correctChoice: '拿回来',
      explanation: '拿回来 = « rapporter (vers moi) » : verbe 拿 + directionnel 回 + 来 point de vue du locuteur.'
    },
    tags: ['grammaire', 'complément', 'direction', 'composé'],
    theme: 'grammar'
  },

  // ============================================
  // HSK3 — Complément de degré (V + 得 + adj)
  // ============================================
  {
    id: 'grammar-complement-degree-de',
    level: 'hsk3',
    hanzi: 'V + 得 + adj',
    pinyin: 'V + de + adj',
    translation: 'degree complement: describe HOW an action is done',
    translationFr: 'complément de degré : décrire COMMENT une action se fait',
    category: 'grammaire',
    explanation: 'Le complément de degré (得, prononcé « de ») décrit la QUALITÉ ou l\'INTENSITÉ d\'une action. Structure clé HSK3.',
    grammarExplanation: {
      whenToUse: 'Pour dire « bien / mal / vite / lentement / fort » à propos d\'un verbe. Décrit COMMENT l\'action est faite.',
      whenToUseEn: 'To say "well / badly / fast / slowly / loudly" about a verb. Describes HOW the action is done.',
      howToUse: 'Structure : Verbe + 得 + Adjectif (+ 很 souvent).\n\n• 他跑得很快 = « il court vite » (litt. « il court [à un degré] très rapide »)\n• 你说得很好 = « tu parles très bien »\n\nAvec objet, on RÉPÈTE le verbe : Sujet + Verbe + Objet + Verbe + 得 + Adjectif.\n• 他说汉语说得很好 = « il parle chinois très bien »\n• Ou on peut omettre le premier verbe : 他汉语说得很好.',
      howToUseEn: 'Structure: Verb + 得 + Adjective (+ 很 often).\n\n• 他跑得很快 = "he runs fast"\n• 你说得很好 = "you speak very well"\n\nWith an object, REPEAT the verb: S + V + O + V + 得 + Adj.\n• 他说汉语说得很好 = "he speaks Chinese very well"\n• Or drop the first verb: 他汉语说得很好.',
      commonMistakes: '❌ 他跑很快 (faux — il manque 得). ✅ 他跑得很快.\n❌ 他快跑 (« il court vite » n\'est PAS ça — « 快 » avant serait « adverbe » différent).\n❌ Confondre les 3 « de » : 的 possession, 得 degré, 地 manière.\n💡 Négation : 得 + 不 + adj. Ex : 他跑得不快.',
      commonMistakesEn: '❌ 他跑很快 (wrong — 得 missing). ✅ 他跑得很快.\n❌ 他快跑 (that\'s not "he runs fast" — 快 first is a different adverb use).\n❌ Confusing the 3 "de": 的 possession, 得 degree, 地 manner.\n💡 Negation: 得 + 不 + adj. Ex: 他跑得不快.',
      tips: '💡 Astuce des 3 « de » : 的 (nom+的+nom), 得 (verbe+得+adj), 地 (adj+地+verbe).\n💡 Le complément de degré est un TROPHÉE : « quel score l\'action mérite ? ».',
      tipsEn: '💡 The 3 "de" trick: 的 (noun+的+noun), 得 (verb+得+adj), 地 (adj+地+verb).\n💡 Think of the degree complement as a TROPHY: "what score does the action earn?".',
      relatedGrammar: ['grammar-possession-de', 'grammar-complement-possibility']
    },
    audio: 'audio/grammar/grammar-complement-degree-de.wav',
    examples: [
      { hanzi: '他汉语说得很好', pinyin: 'tā Hànyǔ shuō de hěn hǎo', translation: 'He speaks Chinese very well', translationFr: 'Il parle très bien chinois' },
      { hanzi: '你写得不错', pinyin: 'nǐ xiě de búcuò', translation: 'You write pretty well', translationFr: 'Tu écris pas mal' },
      { hanzi: '妹妹跑得非常快', pinyin: 'mèimei pǎo de fēicháng kuài', translation: 'Little sister runs extremely fast', translationFr: 'Ma petite sœur court extrêmement vite' }
    ],
    quiz: {
      prompt: '"Il parle vite" =',
      choices: ['他快说', '他说得很快', '他很快说', '他说的很快'],
      correctChoiceIndex: 1
    },
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '他跑___非常快',
      translation: 'Il court très vite',
      translationEn: 'He runs very fast',
      choices: ['的', '得', '地', '了'],
      correctChoice: '得',
      explanation: '得 est la particule du complément de degré : Verbe + 得 + Adjectif.'
    },
    tags: ['grammaire', 'complément', 'degré', '得'],
    theme: 'grammar'
  },

  // ============================================
  // HSK3 — Complément de possibilité (V + 得/不 + résultatif)
  // ============================================
  {
    id: 'grammar-complement-possibility',
    level: 'hsk3',
    hanzi: 'V + 得/不 + résultatif',
    pinyin: 'V + de/bù + résultatif',
    translation: 'possibility complement: able / unable to do',
    translationFr: 'complément de possibilité : capable / incapable de faire',
    category: 'grammaire',
    explanation: 'Structure qui exprime la POSSIBILITÉ ou l\'IMPOSSIBILITÉ d\'obtenir un résultat. « Puis-je le VOIR ? / Non, je ne PEUX PAS le voir ».',
    grammarExplanation: {
      whenToUse: 'Pour dire « je peux/peux pas + obtenir un résultat ». Très fréquent avec verbes de perception (voir, entendre, comprendre).',
      whenToUseEn: 'To say "I can/can\'t + reach a result". Very common with perception verbs (see, hear, understand).',
      howToUse: 'Positif : Verbe + 得 + Résultatif.\n• 看得懂 « peut comprendre en lisant »\n• 听得清楚 « peut entendre clairement »\n• 吃得完 « peut finir de manger »\n\nNégatif : Verbe + 不 + Résultatif.\n• 看不懂 « ne peut pas comprendre »\n• 听不见 « ne peut pas entendre »\n• 吃不完 « ne peut pas tout manger »\n\nQuestion : 看得懂看不懂？',
      howToUseEn: 'Positive: Verb + 得 + Result.\n• 看得懂 "can understand by reading"\n• 听得清楚 "can hear clearly"\n• 吃得完 "can finish eating"\n\nNegative: Verb + 不 + Result.\n• 看不懂 "cannot understand"\n• 听不见 "cannot hear"\n• 吃不完 "cannot finish eating"\n\nA/not-A question: 看得懂看不懂？',
      commonMistakes: '❌ Confondre avec 能 : 能看懂 = « peut/est autorisé à comprendre » (contexte externe). 看得懂 = « a la capacité INTRINSÈQUE de comprendre » (compétence). Différence subtile mais courante.\n❌ 不看懂 (faux) ; ✅ 看不懂. Placement STRICT : Verbe + 得/不 + Résultatif.',
      commonMistakesEn: '❌ Mixing with 能: 能看懂 = "can/is allowed to understand" (external). 看得懂 = "has the INTRINSIC capacity to understand" (competence). Subtle but common.\n❌ 不看懂 (wrong); ✅ 看不懂. STRICT placement: Verb + 得/不 + Result.',
      tips: '💡 Astuce : verbe + 得/不 + adjectif de résultat = « CAPABLE (得) / INCAPABLE (不) de faire résultat ».\n💡 Ex : 我听不见 « je n\'arrive pas à entendre » (bruit, distance).\n💡 Pour dire « je ne comprends pas ce livre » sans nuance de capacité, préfère 我看不懂这本书.',
      tipsEn: '💡 Trick: verb + 得/不 + result adjective = "ABLE (得) / UNABLE (不) to reach result".\n💡 Ex: 我听不见 "I can\'t hear" (noise, distance).\n💡 For "I don\'t understand this book" without capacity nuance, prefer 我看不懂这本书.',
      relatedGrammar: ['grammar-complement-degree-de']
    },
    audio: 'audio/grammar/grammar-complement-possibility.wav',
    examples: [
      { hanzi: '我看不懂这本书', pinyin: 'wǒ kàn bu dǒng zhè běn shū', translation: 'I can\'t understand this book', translationFr: 'Je n\'arrive pas à comprendre ce livre' },
      { hanzi: '你听得见吗？', pinyin: 'nǐ tīng de jiàn ma?', translation: 'Can you hear?', translationFr: 'Est-ce que tu peux entendre ?' },
      { hanzi: '我吃不完这个蛋糕', pinyin: 'wǒ chī bu wán zhè ge dàngāo', translation: 'I can\'t finish this cake', translationFr: 'Je n\'arriverai pas à finir ce gâteau' }
    ],
    quiz: {
      prompt: '"Je n\'arrive pas à comprendre (en lisant)" =',
      choices: ['我不看懂', '我看不懂', '我看得懂', '我不能看懂'],
      correctChoiceIndex: 1
    },
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '声音太小，我听___',
      translation: 'Le son est trop bas, je n\'arrive pas à entendre',
      translationEn: 'The sound is too low, I can\'t hear',
      choices: ['得见', '不见', '得懂', '不懂'],
      correctChoice: '不见',
      explanation: '听不见 = « ne pas arriver à entendre » (résultat perceptif : 见 « percevoir »).'
    },
    tags: ['grammaire', 'complément', 'possibilité', 'capacité'],
    theme: 'grammar'
  },

  // ============================================
  // HSK3 — 如果...就 (si... alors)
  // ============================================
  {
    id: 'grammar-ruguo-jiu',
    level: 'hsk3',
    hanzi: '如果...就',
    pinyin: 'rúguǒ...jiù',
    translation: '"if... then" (most common neutral conditional)',
    translationFr: '« si... alors » (conditionnel neutre le plus utilisé)',
    category: 'grammaire',
    explanation: 'Structure conditionnelle la plus fréquente et neutre en chinois moderne. Équivalent français « si...alors ».',
    grammarExplanation: {
      whenToUse: 'Pour toute hypothèse. Registre neutre à écrit. 要是 = variante orale familière. Autres variantes : 假如 (formel), 倘若 (littéraire).',
      whenToUseEn: 'For any hypothesis. Neutral to written register. 要是 = casual spoken variant. Other variants: 假如 (formal), 倘若 (literary).',
      howToUse: 'Structure : 如果 + Condition, (Sujet) + 就 + Conséquence.\n\n• 如果下雨，我就不去 « s\'il pleut, je n\'y vais pas »\n• 如果你有时间，我们就一起吃饭 « si tu as le temps, on mange ensemble »\n\nLe 就 est SOUVENT OMIS à l\'oral mais recommandé pour clarté.',
      howToUseEn: 'Structure: 如果 + Condition, (Subject) + 就 + Consequence.\n\n• 如果下雨，我就不去 = "if it rains, I won\'t go"\n• 如果你有时间，我们就一起吃饭 = "if you have time, we\'ll eat together"\n\n就 is OFTEN DROPPED in speech but recommended for clarity.',
      commonMistakes: '❌ Confondre 如果 et 因为 (si vs parce que).\n❌ Ne pas oublier de placer 就 DEVANT le verbe de la conséquence (jamais en début de proposition). ✅ 我就不去 ; ❌ 就我不去.\n💡 Autre variante : 如果...的话 (« si + 的话 » cadre la condition).',
      commonMistakesEn: '❌ Confusing 如果 with 因为 (if vs because).\n❌ Don\'t forget: 就 goes BEFORE the consequence verb (never at clause start). ✅ 我就不去 ; ❌ 就我不去.\n💡 Variant: 如果...的话 ("if...+ 的话" frames the condition).',
      tips: '💡 Mnémo : 如果 = « if », 就 = « then ».\n💡 Peut s\'ajouter 的话 : 如果下雨的话 « si vraiment il pleut ».\n💡 Registre : 如果 (neutre) > 要是 (oral) > 假如 (formel écrit).',
      tipsEn: '💡 Mnemonic: 如果 = "if", 就 = "then".\n💡 Add 的话: 如果下雨的话 = "if it really rains".\n💡 Register: 如果 (neutral) > 要是 (spoken) > 假如 (formal written).',
      relatedGrammar: ['grammar-yaoshi-jiu', 'grammar-dehua-if', 'grammar-zhiyao-jiu']
    },
    audio: 'audio/grammar/grammar-ruguo-jiu.wav',
    examples: [
      { hanzi: '如果明天不下雨，我就去公园', pinyin: 'rúguǒ míngtiān bú xiàyǔ, wǒ jiù qù gōngyuán', translation: 'If it doesn\'t rain tomorrow, I\'ll go to the park', translationFr: 'S\'il ne pleut pas demain, j\'irai au parc' },
      { hanzi: '如果你想学中文，就要坚持', pinyin: 'rúguǒ nǐ xiǎng xué Zhōngwén, jiù yào jiānchí', translation: 'If you want to learn Chinese, you have to persevere', translationFr: 'Si tu veux apprendre le chinois, il faut persévérer' },
      { hanzi: '如果有问题，请告诉我', pinyin: 'rúguǒ yǒu wèntí, qǐng gàosu wǒ', translation: 'If there\'s a problem, please tell me', translationFr: 'S\'il y a un problème, dis-le moi' }
    ],
    quiz: {
      prompt: 'Structure la plus neutre pour "si...alors" :',
      choices: ['如果...就', '要是...就', '假如...就', '因为...所以'],
      correctChoiceIndex: 0
    },
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '___你累了，___休息一下',
      translation: 'Si tu es fatigué, repose-toi un peu',
      translationEn: 'If you\'re tired, rest a bit',
      choices: ['如果 ... 就', '因为 ... 所以', '虽然 ... 但是', '不但 ... 而且'],
      correctChoice: '如果 ... 就',
      explanation: '如果...就 est LA structure conditionnelle neutre : hypothèse + conséquence.'
    },
    tags: ['grammaire', 'conditionnel', 'connecteur'],
    theme: 'grammar'
  },

  // ============================================
  // HSK3 — 只有...才 (uniquement si..., alors seulement)
  // ============================================
  {
    id: 'grammar-zhiyou-cai',
    level: 'hsk3',
    hanzi: '只有...才',
    pinyin: 'zhǐyǒu...cái',
    translation: '"only if..., then only"',
    translationFr: '« uniquement si..., alors seulement »',
    category: 'grammaire',
    explanation: 'Structure CONDITIONNELLE EXCLUSIVE : la conséquence n\'est possible QUE si la condition est remplie. Aucune autre voie.',
    grammarExplanation: {
      whenToUse: 'Pour exprimer une condition NÉCESSAIRE et EXCLUSIVE (« seulement dans ce cas, sinon rien »). Ton insistant.',
      whenToUseEn: 'To express a NECESSARY and EXCLUSIVE condition ("only in this case, otherwise nothing"). Insistent tone.',
      howToUse: 'Structure : 只有 + Condition, (Sujet) + 才 + Conséquence.\n\n• 只有努力学习，才能进步 « seulement en étudiant dur, on peut progresser »\n• 只有他来了，我们才开始 « on commence SEULEMENT quand il arrive »\n\nLe 才 est OBLIGATOIRE (pas 就).',
      howToUseEn: 'Structure: 只有 + Condition, (Subject) + 才 + Consequence.\n\n• 只有努力学习，才能进步 = "only through hard study can one progress"\n• 只有他来了，我们才开始 = "we start ONLY when he arrives"\n\n才 is REQUIRED (not 就).',
      commonMistakes: 'Distinction cruciale avec 只要...就 :\n• 只要...就 = « du moment que » (condition SUFFISANTE, il suffit de)\n• 只有...才 = « seulement si » (condition NÉCESSAIRE, sans quoi rien)\n\nEx : 只要有钱就可以 « il suffit d\'avoir de l\'argent » vs 只有有钱才可以 « SEUL l\'argent permet ».\n❌ 只有...就 (mélange faux) ; ✅ 只有...才.',
      commonMistakesEn: 'Crucial distinction with 只要...就:\n• 只要...就 = "as long as" (SUFFICIENT condition, it\'s enough to)\n• 只有...才 = "only if" (NECESSARY condition, otherwise nothing)\n\nEx: 只要有钱就可以 = "money is enough" vs 只有有钱才可以 = "ONLY money works".\n❌ 只有...就 (wrong mix); ✅ 只有...才.',
      tips: '💡 Astuce : ONLY + THEN. 只 = « only », 才 = « then/only then ». Aucune autre voie.\n💡 Contraste avec 只要...就 (« seulement il suffit »).',
      tipsEn: '💡 Trick: ONLY + THEN. 只 = "only", 才 = "then/only then". No other path.\n💡 Contrast with 只要...就 ("as long as").',
      relatedGrammar: ['grammar-ruguo-jiu', 'grammar-zhiyao-jiu']
    },
    audio: 'audio/grammar/grammar-zhiyou-cai.wav',
    examples: [
      { hanzi: '只有你才能帮我', pinyin: 'zhǐyǒu nǐ cái néng bāng wǒ', translation: 'Only you can help me', translationFr: 'Toi seul peux m\'aider' },
      { hanzi: '只有多练习，才能提高', pinyin: 'zhǐyǒu duō liànxí, cái néng tígāo', translation: 'Only by practicing more can one improve', translationFr: 'Seulement en s\'exerçant beaucoup on peut progresser' },
      { hanzi: '只有下雨，庄稼才能长', pinyin: 'zhǐyǒu xiàyǔ, zhuāngjia cái néng zhǎng', translation: 'Only with rain can crops grow', translationFr: 'C\'est seulement s\'il pleut que les récoltes peuvent pousser' }
    ],
    quiz: {
      prompt: '"Seulement toi peux m\'aider" =',
      choices: ['只有你就能帮我', '只有你才能帮我', '只要你就能帮我', '如果你就帮我'],
      correctChoiceIndex: 1
    },
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '___努力，___能成功',
      translation: 'Uniquement en travaillant dur, on peut réussir',
      translationEn: 'Only by working hard can one succeed',
      choices: ['只有 ... 才', '只要 ... 就', '如果 ... 就', '因为 ... 所以'],
      correctChoice: '只有 ... 才',
      explanation: '只有...才 marque une condition NÉCESSAIRE et EXCLUSIVE — aucune autre voie.'
    },
    tags: ['grammaire', 'conditionnel', 'exclusif', 'connecteur'],
    theme: 'grammar'
  }
];
