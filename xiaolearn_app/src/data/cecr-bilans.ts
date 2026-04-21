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
      ['再见 (zàijiàn)', '你好 (nǐ hǎo)', '谢谢 (xièxie)', '对不起 (duìbuqǐ)'],
      1,
      "你好 signifie littéralement « tu bien » et s'utilise à toute heure. 再见 = « au revoir », 谢谢 = « merci », 对不起 = « désolé ».",
      { topic: 'vocab' }
    ),
    q(
      'a1-q2',
      'mcq',
      'Quel est le pronom personnel « je » en chinois ?',
      ['你 (nǐ)', '他 (tā)', '我 (wǒ)', '她 (tā)'],
      2,
      '我 (wǒ) = je / moi. 你 = tu, 他 = il, 她 = elle.',
      { topic: 'grammar' }
    ),
    q(
      'a1-q3',
      'fill',
      'Complète : 我 ___ 法国人 (je suis français).',
      ['是', '有', '在', '不'],
      0,
      '是 (shì) signifie « être ». La structure A 是 B = A est B. « 我是法国人 » = « je suis français ».',
      { contextFr: '我 ___ 法国人。', topic: 'grammar' }
    ),
    q(
      'a1-q4',
      'mcq',
      'Quel chiffre correspond à 三 ?',
      ['1', '2', '3', '4'],
      2,
      '三 (sān) = 3. Les chiffres 1-10 : 一 (yī), 二 (èr), 三 (sān), 四 (sì), 五 (wǔ), 六 (liù), 七 (qī), 八 (bā), 九 (jiǔ), 十 (shí).',
      { topic: 'characters' }
    ),
    q(
      'a1-q5',
      'mcq',
      'Comment former une question fermée (oui/non) à partir de « 他是老师 » ?',
      ['他是老师吧', '他是老师吗', '他是老师呢', '他是老师啊'],
      1,
      'La particule 吗 placée en fin de phrase transforme une affirmation en question oui/non. 他是老师吗？ = « Est-il professeur ? »',
      { topic: 'grammar' }
    ),
    q(
      'a1-q6',
      'mcq',
      'Quel est le ton de 妈 dans 妈妈 (maman) ?',
      ['1er ton (ā)', '2e ton (á)', '3e ton (ǎ)', '4e ton (à)'],
      0,
      '妈 se prononce mā, au 1er ton (haut et plat). C\'est d\'ailleurs l\'exemple classique qu\'on oppose à 马 (mǎ, cheval, 3e ton).',
      { topic: 'tones' }
    ),
    q(
      'a1-q7',
      'fill',
      'Je n\'ai pas de livre : 我 ___ 书。',
      ['不有', '没有', '不是', '没是'],
      1,
      'La négation de 有 est TOUJOURS 没有, jamais 不有. 不 ne nie pas 有. Exception unique du système : partout ailleurs, 不 est la négation standard.',
      { contextFr: '我 ___ 书。', topic: 'grammar' }
    ),
    q(
      'a1-q8',
      'mcq',
      'Comment dit-on « merci » ?',
      ['对不起', '请', '没关系', '谢谢'],
      3,
      '谢谢 (xièxie) = merci. 对不起 = désolé, 请 = s\'il vous plaît (en tête de demande), 没关系 = ce n\'est rien.',
      { topic: 'vocab' }
    ),
    q(
      'a1-q9',
      'mcq',
      'Quel classificateur (mot de mesure) s\'utilise avec la plupart des noms communs en A1 ?',
      ['只 (zhī)', '本 (běn)', '个 (gè)', '条 (tiáo)'],
      2,
      '个 est le classificateur passe-partout : 一个人 (une personne), 一个朋友 (un ami). 本 = pour les livres, 只 = animaux, 条 = objets longs.',
      { topic: 'grammar' }
    ),
    q(
      'a1-q10',
      'mcq',
      'Que signifie le dialogue : « A: 你好吗？ B: 我很好，谢谢。 » ?',
      [
        'A: Tu as quel âge ? B: J\'ai vingt ans, merci.',
        'A: Comment vas-tu ? B: Je vais très bien, merci.',
        'A: Tu es d\'où ? B: Je suis de Paris, merci.',
        'A: Comment t\'appelles-tu ? B: Je m\'appelle Li, merci.'
      ],
      1,
      '你好吗 = « comment vas-tu ? » (litt. « tu bien ? »). 很 = très, placé devant un adjectif prédicat. 我很好 = « je vais très bien ».',
      { topic: 'dialogue', contextFr: 'A: 你好吗？\nB: 我很好，谢谢。' }
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
      'Il est allé à Pékin : 他 ___ 北京 ___ 。',
      ['去 / 了', '去 / 吗', '要 / 了', '在 / 吗'],
      0,
      'Le marqueur 了 en fin de phrase (ou après le verbe) indique un changement d\'état ou un événement accompli. 他去北京了 = « il est allé / parti à Pékin ».',
      { contextFr: '他 ___ 北京 ___ 。', topic: 'grammar' }
    ),
    q(
      'a2-q2',
      'mcq',
      'Comment demander « où » en chinois ?',
      ['什么', '谁', '哪里', '几'],
      2,
      '哪里 (nǎlǐ) ou 哪儿 (nǎr, plus oral) = « où ». 什么 = quoi, 谁 = qui, 几 = combien (petit nombre).',
      { topic: 'grammar' }
    ),
    q(
      'a2-q3',
      'mcq',
      'Quelle phrase signifie « Je veux boire du thé » ?',
      ['我喝茶了', '我想喝茶', '我会喝茶', '我没喝茶'],
      1,
      '想 exprime l\'envie ou le souhait. 会 = savoir (faire), 了 = accompli, 没 = négation du passé.',
      { topic: 'grammar' }
    ),
    q(
      'a2-q4',
      'fill',
      "Le livre de mon ami : 我朋友 ___ 书。",
      ['的', '得', '地', '了'],
      0,
      '的 marque la possession ou la qualification : 我朋友的书 = le livre de mon ami. 得 et 地 sont des particules différentes (complément / adverbe).',
      { contextFr: '我朋友 ___ 书。', topic: 'grammar' }
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
      { topic: 'grammar' }
    ),
    q(
      'a2-q6',
      'mcq',
      'Quel jour vient après 星期四 ?',
      ['星期一', '星期三', '星期五', '星期天'],
      2,
      '星期 + chiffre : 星期一 lundi, 星期二 mardi, 星期三 mercredi, 星期四 jeudi, 星期五 vendredi, 星期六 samedi, 星期天 (ou 星期日) dimanche.',
      { topic: 'vocab' }
    ),
    q(
      'a2-q7',
      'mcq',
      'Comment dire « demain il fera chaud » ?',
      ['昨天很热', '明天很热', '今天很冷', '后天很冷'],
      1,
      '明天 = demain, 很热 = très chaud. 昨天 = hier, 今天 = aujourd\'hui, 后天 = après-demain, 冷 = froid.',
      { topic: 'vocab' }
    ),
    q(
      'a2-q8',
      'fill',
      'Je sais parler chinois : 我 ___ 说汉语。',
      ['想', '要', '会', '可以'],
      2,
      '会 = savoir (faire), compétence acquise par apprentissage. 想 = vouloir/envie, 要 = vouloir (plus ferme), 可以 = pouvoir (permission).',
      { contextFr: '我 ___ 说汉语。', topic: 'grammar' }
    ),
    q(
      'a2-q9',
      'mcq',
      'Combien coûte ceci en chinois se dit :',
      ['这个多少钱？', '这个几钱？', '这个哪钱？', '这个什么钱？'],
      0,
      '多少 sert à demander une quantité potentiellement grande (prix, population). 几 sert pour un petit nombre attendu (< 10). 多少钱 = combien ça coûte.',
      { topic: 'dialogue' }
    ),
    q(
      'a2-q10',
      'mcq',
      'Dialogue : « A: 你有几个兄弟姐妹？ B: 我有两个姐姐。 » — Que veut dire B ?',
      [
        "J'ai deux petites sœurs.",
        "J'ai deux grandes sœurs.",
        "J'ai deux frères.",
        "J'ai deux cousins."
      ],
      1,
      '姐姐 = grande sœur (aînée). 妹妹 = petite sœur, 哥哥 = grand frère, 弟弟 = petit frère. Le chinois distingue systématiquement aîné/cadet dans la fratrie.',
      { topic: 'dialogue', contextFr: 'A: 你有几个兄弟姐妹？\nB: 我有两个姐姐。' }
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
      "J'ai fini de lire ce livre : 我 ___ 这本书 ___ 完了。",
      ['把 / 看', '在 / 看', '给 / 读', '对 / 看'],
      0,
      'La structure 把 déplace l\'objet avant le verbe pour insister sur le résultat de l\'action. 把 + OBJ + VERBE + RÉSULTATIF. 我把这本书看完了 = « j\'ai fini de lire ce livre ».',
      { contextFr: '我 ___ 这本书 ___ 完了。', topic: 'grammar' }
    ),
    q(
      'b11-q2',
      'mcq',
      'Comment exprimer « Il est plus grand que moi » ?',
      ['他很高比我', '他比我高', '他和我一样高', '他比我更高'],
      1,
      'Structure du comparatif : A + 比 + B + ADJ. 他比我高 = il est plus grand que moi. 比 ne s\'accompagne PAS de 很 ni 更 (sauf nuance spéciale).',
      { topic: 'grammar' }
    ),
    q(
      'b11-q3',
      'fill',
      'Il est en train de lire : 他 ___ 看书。',
      ['在', '正在', '了', 'A et B sont corrects'],
      3,
      '正在 et 在 expriment tous deux l\'aspect progressif. 正在 insiste sur le moment précis, 在 est plus neutre. 他（正）在看书 = « il est (en train) de lire ».',
      { contextFr: '他 ___ 看书。', topic: 'grammar' }
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
      { topic: 'grammar' }
    ),
    q(
      'b11-q5',
      'fill',
      "J'ai donné un cadeau à ma mère : 我 ___ 妈妈 ___ 一个礼物。",
      ['送 / 给', '给 / 送', '给 / 了', '对 / 送'],
      0,
      '送给 est le verbe + préposition ditransitif pour « offrir à ». 我送给妈妈一个礼物 = « j\'ai offert un cadeau à maman ». On peut aussi inverser avec 我把礼物送给了妈妈.',
      { contextFr: '我 ___ 妈妈 ___ 一个礼物。', topic: 'grammar' }
    ),
    q(
      'b11-q6',
      'mcq',
      'Quel complément de degré correspond à « extrêmement bon » ?',
      ['很好', '好很', '好极了', '很好了'],
      2,
      '极了 se place APRÈS l\'adjectif pour marquer l\'extrême : 好极了 = excellent / extra. Équivalents : 太...了, ...死了 (familier).',
      { topic: 'grammar' }
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
      { topic: 'grammar' }
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
      { topic: 'grammar' }
    ),
    q(
      'b11-q9',
      'mcq',
      'Quelle phrase utilise correctement 没 ?',
      ['我明天没去', '我没去过中国', '我不没想', '我没会说'],
      1,
      '没 nie les actions accomplies ou l\'expérience (avec 过). 我没去过中国 = « je ne suis jamais allé en Chine ». Pour le futur ou les généralités, on utilise 不.',
      { topic: 'grammar' }
    ),
    q(
      'b11-q10',
      'mcq',
      'Dialogue : « A: 你觉得这个电影怎么样？ B: 挺好看的，就是有点儿长。 » — B trouve le film :',
      [
        'Court mais ennuyeux',
        'Plutôt bien, juste un peu long',
        'Long et excellent',
        'Trop long pour être bien'
      ],
      1,
      '挺...的 = « assez / plutôt... » (ton familier nuancé positif). 就是 = « c\'est juste que... » (concession). 有点儿 = « un peu » (avec connotation légèrement négative).',
      { topic: 'dialogue', contextFr: 'A: 你觉得这个电影怎么样？\nB: 挺好看的，就是有点儿长。' }
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
      "___ 天气很冷，___ 我们还是去跑步了。",
      ['因为 / 所以', '虽然 / 但是', '如果 / 就', '不但 / 而且'],
      1,
      'La paire 虽然...但是 = « bien que... cependant » marque une concession. Les autres paires expriment cause/conséquence, condition, ou addition.',
      { contextFr: '___ 天气很冷，___ 我们还是去跑步了。', topic: 'grammar' }
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
      { topic: 'grammar' }
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
      { topic: 'grammar' }
    ),
    q(
      'b12-q4',
      'fill',
      'Il est entré dans la salle : 他走 ___ 教室 ___ 。',
      ['进 / 来', '上 / 去', '出 / 来', '下 / 去'],
      0,
      'Complément directionnel composé : VERBE + 进 (entrer dans) + 来/去 (vers locuteur / loin de). 走进教室来 = « entrer dans la salle (vers moi) ».',
      { contextFr: '他走 ___ 教室 ___ 。', topic: 'grammar' }
    ),
    q(
      'b12-q5',
      'mcq',
      'Comment exprimer « de plus en plus difficile » ?',
      ['很难很难', '难死了', '越来越难', '更难更难'],
      2,
      '越来越 + ADJ/V = « de plus en plus ». 越来越难 = de plus en plus difficile. C\'est une structure figée très fréquente.',
      { topic: 'grammar' }
    ),
    q(
      'b12-q6',
      'fill',
      "Si tu as le temps, appelle-moi : ___ 你有时间，___ 给我打电话。",
      ['因为 / 所以', '如果 / 就', '虽然 / 但是', '一边 / 一边'],
      1,
      '如果...就... = conditionnelle « si... alors... ». 如果你有时间，就给我打电话 = « si tu as le temps, appelle-moi ». 就 est optionnel mais très courant.',
      { contextFr: '___ 你有时间，___ 给我打电话。', topic: 'grammar' }
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
      { topic: 'grammar' }
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
      { topic: 'grammar' }
    ),
    q(
      'b12-q9',
      'mcq',
      'Que veut dire le chengyu 马马虎虎 ?',
      ['Très bien', 'Comme-ci, comme-ça', 'Très rapide', 'Très stupide'],
      1,
      '马马虎虎 (mǎmǎhūhū) signifie littéralement « cheval cheval tigre tigre » et s\'emploie pour dire « bof », « passable », « ni bien ni mal ». Très courant à l\'oral.',
      { topic: 'culture' }
    ),
    q(
      'b12-q10',
      'mcq',
      'Dialogue : « A: 你做完作业了吗？ B: 还没呢，我正在做。 » — Que fait B en ce moment ?',
      [
        'Il a fini ses devoirs.',
        'Il est en train de faire ses devoirs.',
        'Il n\'a pas commencé ses devoirs.',
        'Il refuse de faire ses devoirs.'
      ],
      1,
      '还没...呢 = « pas encore... ». 正在 + V = « en train de V ». Donc B n\'a pas fini mais est en train de faire ses devoirs.',
      { topic: 'dialogue', contextFr: 'A: 你做完作业了吗？\nB: 还没呢，我正在做。' }
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
      "Il court vite : 他跑 ___ 很快。",
      ['的', '得', '地', '了'],
      1,
      '得 introduit un complément de degré / manière APRÈS le verbe : 跑得快 = « court vite ». 的 = possessif, 地 = transforme adjectif en adverbe avant le verbe.',
      { contextFr: '他跑 ___ 很快。', topic: 'grammar' }
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
      { topic: 'grammar' }
    ),
    q(
      'b21-q3',
      'fill',
      '___ 他会说中文，___ 会说日文。',
      ['不但 / 而且', '虽然 / 但是', '因为 / 所以', '如果 / 就'],
      0,
      '不但...而且... = « non seulement... mais aussi... ». 不但他会说中文，而且（他）还会说日文 = il parle non seulement chinois mais aussi japonais.',
      { contextFr: '___ 他会说中文，___ 会说日文。', topic: 'grammar' }
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
      { topic: 'grammar' }
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
      { topic: 'grammar' }
    ),
    q(
      'b21-q6',
      'mcq',
      'Quel terme correspond le mieux à « économie » ?',
      ['经济', '政治', '文化', '科学'],
      0,
      '经济 = économie. 政治 = politique, 文化 = culture, 科学 = science. Vocabulaire abstrait standard HSK 4.',
      { topic: 'vocab' }
    ),
    q(
      'b21-q7',
      'fill',
      'Elle parle très poliment : 她说话 ___ 礼貌。',
      ['得很', '的很', '地很', '了很'],
      0,
      '得 + ADJ + 很 (ou 得很 en fin) = complément de degré. 她说话说得很礼貌 = « elle parle très poliment ». 很 suit l\'adjectif porté par 得.',
      { contextFr: '她说话 ___ 礼貌。', topic: 'grammar' }
    ),
    q(
      'b21-q8',
      'mcq',
      'Que signifie 幸亏 dans « 幸亏你提醒我 » ?',
      ['Hélas', 'Heureusement', 'Évidemment', 'Malheureusement'],
      1,
      '幸亏 = heureusement (que) — introduit un événement positif qui a évité un malheur. 幸亏你提醒我 = « heureusement que tu m\'as prévenu ».',
      { topic: 'vocab' }
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
      { topic: 'grammar' }
    ),
    q(
      'b21-q10',
      'mcq',
      'Dialogue : « A: 你怎么看这件事？ B: 我觉得似乎有点儿问题。 » — B exprime :',
      [
        'Une certitude absolue',
        'Une hésitation prudente',
        'Un refus catégorique',
        'De l\'enthousiasme'
      ],
      1,
      '似乎 = « il semble que / on dirait que » — nuance de prudence, d\'hésitation. Combiné avec 有点儿 (un peu) et 觉得 (trouver / penser), B donne un avis prudent et nuancé.',
      { topic: 'dialogue', contextFr: 'A: 你怎么看这件事？\nB: 我觉得似乎有点儿问题。' }
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
      { topic: 'grammar' }
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
      { topic: 'grammar' }
    ),
    q(
      'b22-q3',
      'fill',
      '这本书 ___ 妈妈送给我的，特别珍贵。',
      ['是', '被', '把', '给'],
      0,
      'Ici 是...的 met en relief le complément (qui a offert). 是妈妈送给我的 = « c\'est maman qui me l\'a offert ». 被 serait incorrect sémantiquement dans ce cadre relationnel.',
      { contextFr: '这本书 ___ 妈妈送给我的，特别珍贵。', topic: 'grammar' }
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
      { topic: 'culture' }
    ),
    q(
      'b22-q5',
      'mcq',
      'Que signifie « 记者 » ?',
      ['Professeur', 'Journaliste', 'Étudiant', 'Fonctionnaire'],
      1,
      '记者 = journaliste / reporter. Vocabulaire média de base. 记 (enregistrer, noter) + 者 (suffixe « celui qui »).',
      { topic: 'vocab' }
    ),
    q(
      'b22-q6',
      'fill',
      '他把钥匙 ___ 在门上。',
      ['了', '的', '着', '过'],
      2,
      '着 marque un état persistant résultant d\'une action. 挂着 / 放着 / 留着. 他把钥匙留着在门上 est moins courant ; mieux : 钥匙还挂着 « la clé est toujours accrochée ». 着 est le marqueur d\'état résiduel.',
      { contextFr: '他把钥匙 ___ 在门上。', topic: 'grammar' }
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
      { topic: 'vocab' }
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
      { topic: 'grammar' }
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
      { topic: 'grammar' }
    ),
    q(
      'b22-q10',
      'mcq',
      'Dialogue : « A: 这个方案你觉得怎么样？ B: 从长远来看，利大于弊。 » — B pense :',
      [
        'Le projet a plus d\'inconvénients que d\'avantages.',
        'À long terme, les avantages l\'emportent sur les inconvénients.',
        'Les avantages et inconvénients s\'équilibrent.',
        'Le projet n\'a ni avantage ni inconvénient.'
      ],
      1,
      '从长远来看 = « vu à long terme / à long terme ». 利大于弊 = « bénéfices supérieurs aux pertes ». Formulation typique du registre argumentatif / médiatique.',
      { topic: 'dialogue', contextFr: 'A: 这个方案你觉得怎么样？\nB: 从长远来看，利大于弊。' }
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
      '画蛇添足 (huà shé tiān zú) : « dessiner un serpent et lui ajouter des pattes » = rendre quelque chose moins bien en voulant l\'améliorer. Origine : fable du royaume de Chu.',
      { topic: 'culture' }
    ),
    q(
      'c11-q2',
      'fill',
      '___ 下雨，我们 ___ 去爬山。',
      ['尽管 / 还是', '虽然 / 但是', '如果 / 就', '万一 / 都'],
      0,
      '尽管...还是... = « bien que... malgré tout... ». Proche de 虽然...但是 mais registre légèrement plus élevé et plus insistant sur la persévérance.',
      { contextFr: '___ 下雨，我们 ___ 去爬山。', topic: 'grammar' }
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
      { topic: 'grammar' }
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
      { topic: 'grammar' }
    ),
    q(
      'c11-q5',
      'mcq',
      'Quel mot correspond à « concept » (au sens philosophique/idéologique) ?',
      ['观念', '观点', '意见', '主张'],
      0,
      '观念 = concept / notion (plus abstrait, souvent culturel ou moral). 观点 = point de vue, 意见 = avis (concret), 主张 = position défendue.',
      { topic: 'vocab' }
    ),
    q(
      'c11-q6',
      'mcq',
      'Que signifie 责任 ?',
      ['Responsabilité', 'Liberté', 'Justice', 'Droit'],
      0,
      '责任 = responsabilité. 自由 = liberté, 公正/正义 = justice, 权利 = droit. Vocabulaire abstrait de débat.',
      { topic: 'vocab' }
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
      { topic: 'grammar' }
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
      { topic: 'culture' }
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
      { topic: 'grammar' }
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
      { topic: 'grammar' }
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
      { topic: 'grammar' }
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
      { topic: 'grammar' }
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
      { topic: 'grammar' }
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
      { topic: 'grammar' }
    ),
    q(
      'c12-q5',
      'mcq',
      'Lequel est le plus soutenu ?',
      ['所以', '因此', '因为所以', '这样'],
      1,
      '因此 est le plus soutenu (« par conséquent »). 所以 est neutre. 因为...所以... est courant à l\'oral mais lourd à l\'écrit, on préfère ...因此... ou simplement 所以 seul.',
      { topic: 'grammar' }
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
      { topic: 'culture' }
    ),
    q(
      'c12-q7',
      'mcq',
      'Le mot 趋势 signifie :',
      ['Attitude', 'Tendance / évolution', 'Pouvoir', 'Tradition'],
      1,
      '趋势 = tendance, évolution, courant. Typique du discours analytique/économique. 未来的趋势 = les tendances futures.',
      { topic: 'vocab' }
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
      { topic: 'grammar' }
    ),
    q(
      'c12-q9',
      'mcq',
      'Le registre écrit soutenu privilégierait :',
      ['吧', '啊', '矣 (classique) ou absence de particule finale', '呢'],
      2,
      'À l\'écrit formel / littéraire, les particules modales finales (吧/啊/呢) sont réduites ou absentes. 矣 est une trace classique (guwen). Les textes académiques utilisent rarement les particules orales.',
      { topic: 'grammar' }
    ),
    q(
      'c12-q10',
      'mcq',
      'Dialogue : « A: 你觉得远程办公会成为主流吗？ B: 从目前的趋势来看，恐怕是不可避免的。 » — B pense :',
      [
        'Le télétravail est à éviter.',
        'Vu la tendance actuelle, c\'est probablement inévitable.',
        'Le télétravail restera marginal.',
        'Il faut craindre le télétravail.'
      ],
      1,
      '恐怕 = « je crains que / probablement » (nuance prudente). 不可避免 = inévitable. Registre analytique / argumentatif.',
      { topic: 'dialogue', contextFr: 'A: 你觉得远程办公会成为主流吗？\nB: 从目前的趋势来看，恐怕是不可避免的。' }
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
      { topic: 'vocab' }
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
      { topic: 'culture' }
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
      { topic: 'grammar' }
    ),
    q(
      'c21-q4',
      'mcq',
      'Le terme 改革 signifie :',
      ['Révolution', 'Réforme', 'Renversement', 'Régression'],
      1,
      '改革 = réforme. 革命 = révolution, 推翻 = renverser. Vocabulaire politique standard.',
      { topic: 'vocab' }
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
      { topic: 'grammar' }
    ),
    q(
      'c21-q6',
      'mcq',
      'Le mot 通货膨胀 signifie :',
      ['Déflation', 'Inflation', 'Chômage', 'Taux de change'],
      1,
      '通货膨胀 = inflation (litt. « la monnaie s\'enfle »). Vocabulaire économique HSK 6. 通货紧缩 = déflation.',
      { topic: 'vocab' }
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
      { topic: 'grammar' }
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
      { topic: 'culture' }
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
      { topic: 'grammar' }
    ),
    q(
      'c21-q10',
      'mcq',
      'Dialogue formel : « A: 对这项政策，您持何种看法？ B: 我认为它具有一定的前瞻性，但仍有改进空间。 » — B dit :',
      [
        'La politique est rétrograde.',
        'Elle a un certain caractère visionnaire, mais reste perfectible.',
        'Elle est parfaite.',
        'Il ne prend pas position.'
      ],
      1,
      '前瞻性 = « caractère visionnaire / tourné vers l\'avenir ». 改进空间 = marge d\'amélioration. 具有 = posséder / comporter. Registre institutionnel soigné.',
      { topic: 'dialogue', contextFr: 'A: 对这项政策，您持何种看法？\nB: 我认为它具有一定的前瞻性，但仍有改进空间。' }
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
      { topic: 'culture' }
    ),
    q(
      'c22-q2',
      'mcq',
      'Le caractère classique 亦 (yì) signifie :',
      ['Si', 'Aussi / également (registre classique)', 'Pas', 'Seulement'],
      1,
      '亦 = 也 en chinois classique. Toujours trouvé dans les textes lettrés, les citations philosophiques, ou certains chengyu (不亦乐乎 « n\'est-ce pas réjouissant ? »).',
      { topic: 'culture' }
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
      { topic: 'culture' }
    ),
    q(
      'c22-q4',
      'mcq',
      'Quel terme signifie « conjoncture » dans un contexte économique/politique ?',
      ['局势', '情况', '方面', '具体'],
      0,
      '局势 = conjoncture, situation globale. 情况 = situation (plus neutre et local). 局势紧张 = la situation est tendue. Vocabulaire éditorial / géopolitique.',
      { topic: 'vocab' }
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
      { topic: 'culture' }
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
      { topic: 'vocab' }
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
      { topic: 'culture' }
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
      { topic: 'culture' }
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
      { topic: 'culture' }
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
      { topic: 'grammar' }
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

// Sanity check at import (dev only) — 10 questions par bilan.
// On utilise import.meta.env (Vite) au lieu de process.env pour éviter la
// dépendance aux types Node.
if (import.meta.env?.DEV) {
  cecrBilansList.forEach((b) => {
    if (b.questions.length !== 10) {
      console.warn(
        `[cecr-bilans] ${b.level} has ${b.questions.length} questions (expected 10)`
      );
    }
  });
}
