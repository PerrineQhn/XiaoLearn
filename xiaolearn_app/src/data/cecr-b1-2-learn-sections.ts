/**
 * cecr-b1-2-learn-sections.ts — contenu pédagogique manuel pour les 30 leçons B1.2.
 * Injecté dans cecr-course.ts via `learnSections: ...` sur chaque `LessonModule`.
 *
 * Règle produit : tous les `audio` pointent vers un fichier MP3/WAV pré-généré
 * (Azure Neural TTS — cf. xiaolearn_audio_policy). Convention :
 *   audio/hsk{N}/hsk{N}_{hanzi}.wav  (N = niveau HSK réel du mot)
 */

import type { LessonV2LearnSection } from '../types/lesson-learn';

// ═════════════════════════════════════════════════════════════════════════════
// Grammaire B1.2 — 不/没 · modaux 会/能/可以 · 还/又 · 比 · compléments
// ═════════════════════════════════════════════════════════════════════════════

// --- cecr-b12-bu-m1 — 不 : refus subjectif, habitude, futur ----------------
export const b12BuLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b12-bu-scope',
    title: '不 = refus subjectif / habitude / futur',
    titleEn: '不 = subjective refusal / habit / future',
    body:
      '不 (bù) nie ce qui relève de la **volonté** ou du **général**. Il se place directement devant le verbe ou l\'adjectif.\n' +
      '\n' +
      'Quatre cas typiques :\n' +
      '- un goût : 我不吃肉\n' +
      '- un choix : 我不去\n' +
      '- une qualité : 她不漂亮\n' +
      '- un futur : 明天我不来\n' +
      '\n' +
      'RÈGLE D\'OR : pour les modaux (能, 会, 可以, 想), 不 est **toujours** la seule négation. 没能/没会 n\'existent pas.',
    bodyEn:
      '不 (bù) negates matters of WILL or general fact: a taste (我不吃肉), a choice (我不去), a quality (她不漂亮), a future (明天我不来). It sits directly before the verb/adjective. For modals — 能, 会, 可以, 想 — 不 is mandatory: 没能/没会 don\'t exist. Remember: 不 = subjective no; 没 handles unaccomplished facts.',
    items: [
      { hanzi: '不', pinyin: 'bù', meaning: 'ne...pas', meaningEn: 'not', audio: 'audio/hsk1/hsk1_不.wav' },
      { hanzi: '不是', pinyin: 'bú shì', meaning: 'ne pas être', meaningEn: 'is not', audio: 'audio/hsk1/hsk1_不是.wav' },
      { hanzi: '不要', pinyin: 'bú yào', meaning: 'ne pas vouloir / ne pas faire', meaningEn: 'don\'t want / don\'t do', audio: 'audio/hsk1/hsk1_不要.wav' },
      { hanzi: '不去', pinyin: 'bú qù', meaning: 'ne pas y aller', meaningEn: 'not go', audio: 'audio/hsk1/hsk1_去.wav' },
      { hanzi: '不能', pinyin: 'bù néng', meaning: 'ne pas pouvoir', meaningEn: 'cannot', audio: 'audio/hsk1/hsk1_能.wav' },
      { hanzi: '不喜欢', pinyin: 'bù xǐ huān', meaning: 'ne pas aimer', meaningEn: 'not like', audio: 'audio/hsk1/hsk1_喜欢.wav' }
    ],
    tip:
      'Sandhi obligatoire : 不 (ton 4) devient ton 2 DEVANT un autre ton 4. 不是 → bú shì, 不要 → bú yào. Devant les tons 1/2/3, il reste ton 4.',
    tipEn:
      'Mandatory sandhi: 不 (tone 4) becomes tone 2 BEFORE another tone 4. 不是 → bú shì, 不要 → bú yào. Before tones 1/2/3, it stays tone 4.'
  }
];

// --- cecr-b12-mei-m1 — 没 : action non accomplie, possession zéro ----------
export const b12MeiLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b12-mei-scope',
    title: '没 = fait non accompli ou possession zéro',
    titleEn: '没 = unaccomplished fact or zero possession',
    body:
      '没 (méi) — forme longue 没有 — nie un **fait**. Trois usages principaux :\n' +
      '- action non produite : 我没吃饭 (je n\'ai pas mangé)\n' +
      '- possession nulle : 我没有钱 (je n\'ai pas d\'argent)\n' +
      '- expérience jamais vécue : 我没去过中国\n' +
      '\n' +
      'Attention : **jamais** de 了 avec 没. 我没吃了 ✗ — 没 suffit à dire « pas réalisé ». Et avec les verbes d\'**état** (是, 认识, 知道, 喜欢), on garde 不, pas 没.',
    bodyEn:
      '没 (méi) — long form 没有 — negates a FACT: (1) action that didn\'t happen (我没吃饭 = I haven\'t eaten), (2) zero possession (我没有钱 = I have no money), (3) experience never had (我没去过中国). Forbidden: combining 没 with 了. 我没吃了 ✗ because 没 alone carries the «not realized» meaning. With STATE verbs (是, 认识, 知道, 喜欢), always negate with 不, not 没.',
    items: [
      { hanzi: '没', pinyin: 'méi', meaning: 'ne...pas (accompli)', meaningEn: 'not (completed)', audio: 'audio/hsk1/hsk1_没.wav' },
      { hanzi: '没有', pinyin: 'méi yǒu', meaning: 'ne pas avoir / ne pas', meaningEn: 'not have / didn\'t', audio: 'audio/hsk1/hsk1_没有.wav' },
      { hanzi: '没吃', pinyin: 'méi chī', meaning: 'ne pas avoir mangé', meaningEn: 'didn\'t eat', audio: 'audio/hsk1/hsk1_吃.wav' },
      { hanzi: '没去', pinyin: 'méi qù', meaning: 'ne pas y être allé', meaningEn: 'didn\'t go', audio: 'audio/hsk1/hsk1_去.wav' },
      { hanzi: '没钱', pinyin: 'méi qián', meaning: 'pas d\'argent', meaningEn: 'no money', audio: 'audio/hsk1/hsk1_钱.wav' },
      { hanzi: '没人', pinyin: 'méi rén', meaning: 'personne', meaningEn: 'nobody', audio: 'audio/hsk1/hsk1_人.wav' }
    ],
    tip:
      '« Pas encore » = 还没 + V (+ 呢). 我还没吃呢 = je n\'ai pas encore mangé. Le 呢 final est typique de la conversation et renforce l\'attente d\'action future.',
    tipEn:
      '«Not yet» = 还没 + V (+ 呢). 我还没吃呢 = I haven\'t eaten yet. The final 呢 is conversational and emphasizes pending future action.'
  }
];

// --- cecr-b12-bumei-m1 — 不 vs 没 : l'arbre de décision --------------------
export const b12BuMeiLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b12-bumei-tree',
    title: 'Arbre de décision en 3 questions',
    titleEn: 'Decision tree in 3 questions',
    body:
      'Avant de nier, pose-toi **3 questions** :\n' +
      '- habitude, goût, volonté ou futur ? → 不\n' +
      '- action qui aurait dû se produire mais n\'a pas eu lieu ? → 没\n' +
      '- possession ou existence ? → 没有\n' +
      '\n' +
      'Piège classique : 我不吃肉 (je suis végétarien — choix) vs 我没吃肉 (cette fois, je n\'ai pas mangé de viande — sous-entendu : d\'habitude si).\n' +
      '\n' +
      'Attention : les verbes d\'**état** (是, 认识, 知道) ne se nient **jamais** avec 没.',
    bodyEn:
      'Before negating, ask 3 questions. (1) Is it a habit, taste, will, or future? → 不. (2) Is it an action that should have happened but didn\'t? → 没. (3) Is it possession or existence? → 没有. Trap case: 我不吃肉 (I\'m vegetarian, choice) vs 我没吃肉 (this time I didn\'t eat meat — hint: usually I do). STATE verbs (是, 认识, 知道) are never negated with 没.',
    items: [
      { hanzi: '不吃', pinyin: 'bù chī', meaning: 'ne pas manger (habitude)', meaningEn: 'not eat (habit)', audio: 'audio/hsk1/hsk1_吃.wav' },
      { hanzi: '没吃', pinyin: 'méi chī', meaning: 'pas mangé (cette fois)', meaningEn: 'didn\'t eat (this time)', audio: 'audio/hsk1/hsk1_吃.wav' },
      { hanzi: '不去', pinyin: 'bú qù', meaning: 'ne pas y aller (choix)', meaningEn: 'not go (choice)', audio: 'audio/hsk1/hsk1_去.wav' },
      { hanzi: '没去', pinyin: 'méi qù', meaning: 'pas encore allé', meaningEn: 'didn\'t go yet', audio: 'audio/hsk1/hsk1_去.wav' },
      { hanzi: '不知道', pinyin: 'bù zhī dào', meaning: 'ne pas savoir', meaningEn: 'not know', audio: 'audio/hsk2/hsk2_知道.wav' },
      { hanzi: '不认识', pinyin: 'bú rèn shí', meaning: 'ne pas connaître', meaningEn: 'not know (someone)', audio: 'audio/hsk1/hsk1_认识.wav' }
    ],
    tip:
      'Tous les verbes d\'ÉTAT continu (是, 认识, 知道, 喜欢, 爱) prennent 不. 没知道 ✗. Si tu hésites, demande-toi : « est-ce une action ponctuelle ou un état continu ? ».',
    tipEn:
      'All CONTINUOUS-state verbs (是, 认识, 知道, 喜欢, 爱) take 不. 没知道 ✗. If unsure, ask: «is it a one-off action or a continuous state?».'
  }
];

// --- cecr-b12-hui-m1 — 会 : savoir-faire appris + probabilité -------------
export const b12HuiLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b12-hui-two-uses',
    title: '会 = compétence apprise OU événement probable',
    titleEn: '会 = learned skill OR probable event',
    body:
      '会 (huì) a deux sens bien distincts qu\'il faut trier par contexte :\n' +
      '- savoir-faire **appris** (conduire, nager, parler une langue) : 我会开车, 他会说中文\n' +
      '- probabilité, futur plausible : 明天会下雨 (il va pleuvoir demain)\n' +
      '\n' +
      'Astuce : le 会 de probabilité est souvent renforcé par un 的 final. 他会来的 (il viendra, c\'est **sûr**). La négation 不会 couvre les deux sens.',
    bodyEn:
      '会 (huì) has two distinct senses. (1) LEARNED skill: drive, swim, speak a language, draw. 我会开车 (I can drive), 他会说中文 (he speaks Chinese). (2) Probability, plausible future: 明天会下雨 (it will rain tomorrow). The probability 会 is often reinforced by final 的: 他会来的 (he\'ll come, for sure). Negation: 不会 covers both senses.',
    items: [
      { hanzi: '会', pinyin: 'huì', meaning: 'savoir / aller sûrement', meaningEn: 'know how / will surely', audio: 'audio/hsk1/hsk1_会.wav' },
      { hanzi: '会说', pinyin: 'huì shuō', meaning: 'savoir parler', meaningEn: 'can speak', audio: 'audio/hsk1/hsk1_说.wav' },
      { hanzi: '会开车', pinyin: 'huì kāi chē', meaning: 'savoir conduire', meaningEn: 'can drive', audio: 'audio/hsk3/hsk3_开车.wav' },
      { hanzi: '会游泳', pinyin: 'huì yóu yǒng', meaning: 'savoir nager', meaningEn: 'can swim', audio: 'audio/hsk2/hsk2_游泳.wav' },
      { hanzi: '不会', pinyin: 'bú huì', meaning: 'ne pas savoir / ne pas arriver', meaningEn: 'not know / won\'t happen', audio: 'audio/hsk1/hsk1_会.wav' },
      { hanzi: '会下雨', pinyin: 'huì xià yǔ', meaning: 'il va pleuvoir', meaningEn: 'it\'ll rain', audio: 'audio/hsk1/hsk1_下雨.wav' }
    ],
    tip:
      'Pour insister sur la quasi-certitude, encadre : 会 ... 的. 他会同意的 = il sera d\'accord, j\'en suis sûr. Sans le 的, l\'affirmation paraît moins ferme.',
    tipEn:
      'To insist on near-certainty, bracket: 会 ... 的. 他会同意的 = he\'ll agree, I\'m sure. Without 的, the claim sounds less firm.'
  }
];

// --- cecr-b12-neng-m1 — 能 : capacité conditionnée + quantité -------------
export const b12NengLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b12-neng-conditional',
    title: '能 = « capable cette fois »',
    titleEn: '能 = "able this time"',
    body:
      '能 (néng) parle de la capacité **actuelle** : on a appris **et** les conditions permettent. La compétence (会) reste, la capacité (能) peut être bloquée.\n' +
      '\n' +
      'Exemple clé : 我会游泳, 但今天感冒了, 不能游 (je sais nager, mais aujourd\'hui enrhumé, je ne peux pas).\n' +
      '\n' +
      'Autres usages courants :\n' +
      '- quantité : 他能吃三碗 (il peut manger 3 bols)\n' +
      '- possibilité d\'action : 这个办法能解决问题\n' +
      '- permission informelle : 我能进来吗 ?',
    bodyEn:
      '能 (néng) is about CURRENT ability: you\'ve learned AND conditions allow. 我会游泳, 但今天感冒了, 不能游 (I can swim, but today I have a cold, I can\'t). Competence (会) remains, ability (能) is blocked. Other uses: quantity (他能吃三碗 = he can eat 3 bowls), action possibility (这个办法能解决问题), informal permission (我能进来吗?). Negation: 不能.',
    items: [
      { hanzi: '能', pinyin: 'néng', meaning: 'pouvoir (capacité/conditions)', meaningEn: 'be able to', audio: 'audio/hsk1/hsk1_能.wav' },
      { hanzi: '能吃', pinyin: 'néng chī', meaning: 'pouvoir manger (quantité)', meaningEn: 'can eat (amount)', audio: 'audio/hsk1/hsk1_吃.wav' },
      { hanzi: '能帮', pinyin: 'néng bāng', meaning: 'pouvoir aider', meaningEn: 'can help', audio: 'audio/hsk2/hsk2_帮.wav' },
      { hanzi: '不能', pinyin: 'bù néng', meaning: 'ne pas pouvoir', meaningEn: 'cannot', audio: 'audio/hsk1/hsk1_能.wav' },
      { hanzi: '能不能', pinyin: 'néng bù néng', meaning: 'est-ce qu\'on peut ?', meaningEn: 'can we / can you?', audio: 'audio/hsk1/hsk1_能.wav' },
      { hanzi: '能来', pinyin: 'néng lái', meaning: 'pouvoir venir', meaningEn: 'can come', audio: 'audio/hsk1/hsk1_来.wav' }
    ],
    tip:
      'La forme A-不-A (能不能) rend la question plus douce que 能吗 ?. À l\'oral, 能不能帮我 ? sonne comme un « ça te dérangerait de... ».',
    tipEn:
      'The A-不-A form (能不能) softens the question compared with 能吗?. Orally, 能不能帮我? comes across like «would you mind...».'
  }
];

// --- cecr-b12-keyi-m1 — 可以 : permission formelle + suggestion -----------
export const b12KeyiLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b12-keyi-permission',
    title: '可以 = droit formel ou acceptabilité',
    titleEn: '可以 = formal right or acceptability',
    body:
      '可以 (kěyǐ) signifie « c\'est OK / c\'est autorisé ». Trois emplois principaux :\n' +
      '- permission : 你可以走了 (tu peux partir) ; 这里可以抽烟吗 ? (peut-on fumer ici ?)\n' +
      '- suggestion : 我们可以试试 (on peut essayer)\n' +
      '- accord : 我觉得这个方案可以 (je trouve ce plan OK)\n' +
      '\n' +
      'Attention : opposé à 能. **不能** = capacité bloquée (physique) ; **不可以** = interdit (plus fort, souvent officiel).',
    bodyEn:
      '可以 (kěyǐ) = «it\'s OK / it\'s allowed». (1) Permission: 你可以走了 (you may leave). 这里可以抽烟吗? (may one smoke here?). (2) Suggestion: 我们可以试试 (we can try). (3) Agreement: 我觉得这个方案可以 (I find this plan OK). Opposed to 能: 不能 = physical block; 不可以 = forbidden (stronger, often official). For «not allowed», prefer 不可以; for «not physically possible», 不能.',
    items: [
      { hanzi: '可以', pinyin: 'kě yǐ', meaning: 'pouvoir / c\'est OK', meaningEn: 'may / it\'s OK', audio: 'audio/hsk2/hsk2_可以.wav' },
      { hanzi: '不可以', pinyin: 'bù kě yǐ', meaning: 'interdit', meaningEn: 'forbidden', audio: 'audio/hsk2/hsk2_可以.wav' },
      { hanzi: '可以吗', pinyin: 'kě yǐ ma', meaning: 'est-ce possible ?', meaningEn: 'is that OK?', audio: 'audio/hsk2/hsk2_可以.wav' },
      { hanzi: '可以试试', pinyin: 'kě yǐ shì shì', meaning: 'on peut essayer', meaningEn: 'we can try', audio: 'audio/hsk3/hsk3_试.wav' },
      { hanzi: '可以走', pinyin: 'kě yǐ zǒu', meaning: 'pouvoir partir', meaningEn: 'may leave', audio: 'audio/hsk2/hsk2_走.wav' },
      { hanzi: '可以抽烟', pinyin: 'kě yǐ chōu yān', meaning: 'autorisé à fumer', meaningEn: 'smoking allowed', audio: 'audio/hsk4/hsk4_抽烟.wav' }
    ]
  }
];

// --- cecr-b12-modal-m1 — 会/能/可以 test de tri -----------------------------
export const b12ModalLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b12-modal-sorting',
    title: '3 scénarios, 3 choix',
    titleEn: '3 scenarios, 3 choices',
    body:
      'Un test express pour trancher entre 会, 能 et 可以 selon le scénario :\n' +
      '- scénario A, **compétence acquise** (il a APPRIS) : 他会说法语\n' +
      '- scénario B, **capacité bloquée** par les conditions : 我今天不能来 (je suis malade)\n' +
      '- scénario C, **permission / règle** : 这儿可以坐吗 ?\n' +
      '\n' +
      'Astuce : les trois se combinent souvent. 你会游泳吗 ? (compétence) → 你今天能游泳吗 ? (conditions) → 这儿可以游泳吗 ? (règle). À l\'oral, par fréquence : 能 > 可以 > 会.',
    bodyEn:
      'Quick test to choose. Scenario A — learned skill (they\'ve LEARNED it): 他会说法语. Scenario B — ability blocked by conditions: 我今天不能来 (I\'m sick). Scenario C — permission / rule: 这儿可以坐吗? The three often combine: 你会游泳吗? (skill) → 你今天能游泳吗? (conditions) → 这儿可以游泳吗? (rule). Spoken frequency: 能 > 可以 > 会.',
    items: [
      { hanzi: '会', pinyin: 'huì', meaning: 'savoir (appris)', meaningEn: 'know how (learned)', audio: 'audio/hsk1/hsk1_会.wav' },
      { hanzi: '能', pinyin: 'néng', meaning: 'pouvoir (conditions)', meaningEn: 'can (conditions)', audio: 'audio/hsk1/hsk1_能.wav' },
      { hanzi: '可以', pinyin: 'kě yǐ', meaning: 'pouvoir (règle)', meaningEn: 'may (rule)', audio: 'audio/hsk2/hsk2_可以.wav' },
      { hanzi: '不会', pinyin: 'bú huì', meaning: 'ne pas savoir', meaningEn: 'don\'t know how', audio: 'audio/hsk1/hsk1_会.wav' },
      { hanzi: '不能', pinyin: 'bù néng', meaning: 'ne pas pouvoir', meaningEn: 'cannot', audio: 'audio/hsk1/hsk1_能.wav' },
      { hanzi: '不可以', pinyin: 'bù kě yǐ', meaning: 'interdit', meaningEn: 'not allowed', audio: 'audio/hsk2/hsk2_可以.wav' }
    ],
    tip:
      'Si les 3 semblent possibles (« je peux t\'aider »), préfère 能 à l\'oral : 我能帮你. 会帮 est rare, 可以帮 un peu formel. 能 est le plus naturel.',
    tipEn:
      'If all 3 seem possible («I can help you»), prefer 能 orally: 我能帮你. 会帮 is rare, 可以帮 a bit formal. 能 is the most natural.'
  }
];

// --- cecr-b12-hai-m1 — 还 : continuation / addition / modération ----------
export const b12HaiLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b12-hai-three-senses',
    title: '还 = encore / en plus / pas mal',
    titleEn: '还 = still / also / not bad',
    body:
      '还 (hái) a trois valeurs à trier par contexte :\n' +
      '- continuation : 他还在睡觉 (il dort encore), placé avant le verbe\n' +
      '- addition : 我喜欢咖啡，还喜欢茶 (j\'aime le café, et aussi le thé)\n' +
      '- modération **à l\'oral** : 还不错 (pas mal), 还可以 (correct)\n' +
      '\n' +
      'Astuce : pour « pas encore », la combinaison 还没…呢 est quasi automatique. 我还没吃呢.',
    bodyEn:
      '还 (hái) has 3 values to sort by context. (1) Continuation: 他还在睡觉 (he\'s still sleeping). Placed before the verb. (2) Addition: 我喜欢咖啡，还喜欢茶 (I like coffee, and also tea). (3) Moderation, very common orally: 还不错 (not bad), 还可以 (OK). For «not yet», 还没…呢 is almost automatic: 我还没吃呢.',
    items: [
      { hanzi: '还', pinyin: 'hái', meaning: 'encore / aussi / pas mal', meaningEn: 'still / also / not bad', audio: 'audio/hsk2/hsk2_还.wav' },
      { hanzi: '还在', pinyin: 'hái zài', meaning: 'être encore en train de', meaningEn: 'still be (doing)', audio: 'audio/hsk2/hsk2_还.wav' },
      { hanzi: '还没', pinyin: 'hái méi', meaning: 'pas encore', meaningEn: 'not yet', audio: 'audio/hsk2/hsk2_还.wav' },
      { hanzi: '还有', pinyin: 'hái yǒu', meaning: 'il y a encore / en plus', meaningEn: 'still have / also', audio: 'audio/hsk2/hsk2_还.wav' },
      { hanzi: '还可以', pinyin: 'hái kě yǐ', meaning: 'ça va / correct', meaningEn: 'OK / fine', audio: 'audio/hsk2/hsk2_还.wav' },
      { hanzi: '还不错', pinyin: 'hái bú cuò', meaning: 'pas mal', meaningEn: 'not bad', audio: 'audio/hsk2/hsk2_不错.wav' }
    ],
    tip:
      'Ne pas confondre 还 (hái) et 还是 (háishì) — ce dernier sert à choisir : 你喝咖啡还是茶 ? (café ou thé ?). Sens totalement différent.',
    tipEn:
      'Don\'t mix up 还 (hái) and 还是 (háishì) — the latter introduces choice: 你喝咖啡还是茶? (coffee or tea?). Completely different sense.'
  }
];

// --- cecr-b12-you-m1 — 又 : répétition déjà réalisée -----------------------
export const b12YouLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b12-you-past',
    title: '又 + V + 了 = « encore une fois »',
    titleEn: '又 + V + 了 = "once again"',
    body:
      '又 (yòu) = « de nouveau » pour une action **déjà produite** (passé). Structure-clé : 又 + V + 了.\n' +
      '- 他又迟到了 (il est ENCORE en retard — soupir)\n' +
      '- 昨天下雨了，今天又下雨了\n' +
      '- usage parallèle 又...又... = « à la fois...et... » : 她又聪明又漂亮\n' +
      '\n' +
      'Attention : le 了 final est quasi-obligatoire. Pour un **futur**, on passe à 再 (zài). 明天我再来 (je reviendrai demain).',
    bodyEn:
      '又 (yòu) = «again» for an action ALREADY happened (past). Key structure: 又 + V + 了. 他又迟到了 (he\'s late AGAIN — sigh). 昨天下雨了，今天又下雨了. Final 了 is almost mandatory. For future, switch to 再 (zài): 明天我再来 (I\'ll come again tomorrow). Another use: 又...又... = «both...and...». 她又聪明又漂亮 (she\'s both smart and pretty).',
    items: [
      { hanzi: '又', pinyin: 'yòu', meaning: 'encore (déjà fait)', meaningEn: 'again (already done)', audio: 'audio/hsk3/hsk3_又.wav' },
      { hanzi: '又来了', pinyin: 'yòu lái le', meaning: 'et revoilà !', meaningEn: 'here we go again', audio: 'audio/hsk1/hsk1_来.wav' },
      { hanzi: '又下雨了', pinyin: 'yòu xià yǔ le', meaning: 'il re-pleut', meaningEn: 'raining again', audio: 'audio/hsk1/hsk1_下雨.wav' },
      { hanzi: '又迟到', pinyin: 'yòu chí dào', meaning: 'encore en retard', meaningEn: 'late again', audio: 'audio/hsk3/hsk3_迟到.wav' },
      { hanzi: '再', pinyin: 'zài', meaning: 'de nouveau (futur)', meaningEn: 'again (future)', audio: 'audio/hsk1/hsk1_再.wav' },
      { hanzi: '再来', pinyin: 'zài lái', meaning: 'revenir (futur)', meaningEn: 'come again (future)', audio: 'audio/hsk1/hsk1_来.wav' }
    ],
    tip:
      'Moyen sûr de ne pas se tromper : si l\'action est AVÉRÉE, c\'est 又. Si elle est projetée, c\'est 再. Passé = 又 + 了 ; futur = 再.',
    tipEn:
      'Surefire test: if the action is CONFIRMED, use 又. If it\'s planned, use 再. Past = 又 + 了; future = 再.'
  }
];

// --- cecr-b12-bi-m1 — 比 : le comparatif --------------------------------
export const b12BiLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b12-bi-structure',
    title: 'A 比 B + adjectif (sans 很 !)',
    titleEn: 'A 比 B + adjective (no 很!)',
    body:
      'Structure fixe : A + 比 + B + adjectif. 我比他高 (je suis plus grand que lui). Quatre variantes utiles :\n' +
      '- écart chiffré : A + 比 + B + adj + quantité — 我比他高五厘米 (5 cm de plus)\n' +
      '- intensification : A + 比 + B + 更 + adj — 她比他更聪明 (elle est encore plus intelligente)\n' +
      '- négation : A + 没有 + B + adj — 我没有他高 (je suis moins grand que lui)\n' +
      '- égalité : A + 跟 + B + 一样 + adj (sans 比)\n' +
      '\n' +
      'Attention : **jamais** de 很 devant l\'adjectif quand 比 est là. 我比他很高 ✗.',
    bodyEn:
      'Fixed structure: A + 比 + B + adjective. 我比他高 (I\'m taller than him). CAUTION: never put 很 before the adjective when 比 is there. 我比他很高 ✗. For the gap: A + 比 + B + adj + quantity. 我比他高五厘米 (5 cm taller). To intensify: A + 比 + B + 更 + adj. 她比他更聪明 (she\'s even smarter). Negation: A + 没有 + B + adj. 我没有他高 (I\'m not as tall as him).',
    items: [
      { hanzi: '比', pinyin: 'bǐ', meaning: 'comparé à', meaningEn: 'compared to', audio: 'audio/hsk2/hsk2_比.wav' },
      { hanzi: '比较', pinyin: 'bǐ jiào', meaning: 'relativement', meaningEn: 'relatively', audio: 'audio/hsk3/hsk3_比较.wav' },
      { hanzi: '更', pinyin: 'gèng', meaning: 'encore plus', meaningEn: 'even more', audio: 'audio/hsk3/hsk3_更.wav' },
      { hanzi: '没有', pinyin: 'méi yǒu', meaning: 'moins...que (dans 没有...)', meaningEn: 'less than (in 没有...)', audio: 'audio/hsk1/hsk1_没有.wav' },
      { hanzi: '一样', pinyin: 'yí yàng', meaning: 'pareil', meaningEn: 'same', audio: 'audio/hsk3/hsk3_一样.wav' },
      { hanzi: '不比', pinyin: 'bù bǐ', meaning: 'pas plus que (égalité)', meaningEn: 'no more than (equal)', audio: 'audio/hsk2/hsk2_比.wav' }
    ],
    tip:
      '« Pareil » ne se dit pas 比...一样 ✗ mais A 跟 B 一样 + adj. 这本书跟那本一样厚 (ce livre est aussi épais que l\'autre). Le 比 n\'apparaît pas.',
    tipEn:
      '«Same as» is not 比...一样 ✗ but A 跟 B 一样 + adj. 这本书跟那本一样厚 (this book is as thick as that one). No 比 here.'
  },
  {
    id: 'b12-bi-tokens',
    title: 'Structure visuelle : 比 ternaire vs français binaire',
    titleEn: 'Visual structure: ternary 比 vs binary English',
    body:
      'En français : « A est plus grand QUE B ». Trois mots-outils. En chinois : A + 比 + B + adj. Trois éléments, mais l\'adjectif vient en DERNIER, jamais dans l\'adjectif central comme en français.',
    bodyEn:
      'In English: «A is taller THAN B». In Chinese: A + 比 + B + adj. Three slots, but the adjective comes LAST, not in the middle as in English.',
    tokenizedSentences: [
      {
        zh: [
          { text: '我', pinyin: 'wǒ', role: 'sujet' },
          { text: '比', pinyin: 'bǐ', role: 'connecteur' },
          { text: '他', pinyin: 'tā', role: 'objet' },
          { text: '高', pinyin: 'gāo', role: 'verbe' }
        ],
        fr: [
          { text: 'Je', role: 'sujet' },
          { text: 'suis plus', role: 'verbe' },
          { text: 'grand', role: 'verbe' },
          { text: 'que lui', role: 'objet' }
        ],
        note: 'Comparatif simple. ⚠ JAMAIS 我比他很高 — pas de 很 quand 比 est présent.'
      },
      {
        zh: [
          { text: '我', pinyin: 'wǒ', role: 'sujet' },
          { text: '比', pinyin: 'bǐ', role: 'connecteur' },
          { text: '他', pinyin: 'tā', role: 'objet' },
          { text: '高', pinyin: 'gāo', role: 'verbe' },
          { text: '五厘米', pinyin: 'wǔ lí mǐ', role: 'complement' }
        ],
        fr: [
          { text: 'Je', role: 'sujet' },
          { text: 'fais', role: 'verbe' },
          { text: '5 cm de plus', role: 'complement' },
          { text: 'que lui', role: 'objet' }
        ],
        note: 'Avec un ÉCART : la quantité vient APRÈS l\'adjectif, en Complément.'
      },
      {
        zh: [
          { text: '她', pinyin: 'tā', role: 'sujet' },
          { text: '比', pinyin: 'bǐ', role: 'connecteur' },
          { text: '他', pinyin: 'tā', role: 'objet' },
          { text: '更', pinyin: 'gèng', role: 'modificateur' },
          { text: '聪明', pinyin: 'cōng míng', role: 'verbe' }
        ],
        fr: [
          { text: 'Elle est', role: 'sujet' },
          { text: 'encore plus', role: 'modificateur' },
          { text: 'intelligente', role: 'verbe' },
          { text: 'que lui', role: 'objet' }
        ],
        note: 'Intensifier : 更 (Modificateur) avant l\'adjectif. Idem 还 pour la même nuance.'
      }
    ],
    tip:
      'L\'œil cherche le pattern fixe : Sujet + 比 + Référence + Adjectif. Si tu vois 很 entre 比 et l\'adjectif, c\'est faux. Si tu vois une quantité, elle est après l\'adjectif.',
    tipEn:
      'Eye looks for the fixed pattern: Subject + 比 + Reference + Adjective. If you see 很 between 比 and the adjective, it\'s wrong. If you see a quantity, it goes after the adjective.'
  },
  {
    id: 'b12-bi-meiyou-buxiang',
    title: '没有 pour « pas aussi X que »',
    titleEn: '没有 for «not as X as»',
    body:
      'Structure : A + 没有 + B + adjectif = A n\'est pas aussi X que B.\n' +
      '\n' +
      'Ex : 这间房没有那间大 (zhè jiān fáng méiyǒu nà jiān dà) « cette pièce n\'est pas aussi grande que celle-là ».\n' +
      '\n' +
      'Astuce : pour insister sur l\'écart, ajoute 那么 (nàme) ou 这么 (zhème) avant l\'adjectif.\n' +
      '- 这间房没有那间那么大 (zhè jiān fáng méiyǒu nà jiān nàme dà) « loin d\'être aussi grande que celle-là »\n' +
      '\n' +
      'Alternative proche : 不像...那么... (búxiàng...nàme...) = « pas comme... à ce point là ».\n' +
      '- 他不像他哥哥那么高 (tā bú xiàng tā gēge nàme gāo) « il n\'est pas aussi grand que son grand frère »\n' +
      '\n' +
      'Règle : utilise 不像 quand la comparaison est plus une question de RESSEMBLANCE que de mesure précise.',
    bodyEn:
      'Structure: A + 没有 + B + adjective = A is not as X as B. 这间房没有那间大 = this room isn\'t as big as that one. To emphasize the gap, add 那么/这么 before the adjective: 这间房没有那间那么大 = far from being as big. Close alternative: 不像...那么... = «not like... to that extent». 他不像他哥哥那么高 = he\'s not as tall as his big brother. Use 不像 when the comparison is more about RESEMBLANCE than measurement.',
    items: [
      { hanzi: '没有', pinyin: 'méi yǒu', meaning: 'ne pas atteindre (moins que)', meaningEn: 'not reach (less than)', audio: 'audio/hsk1/hsk1_没有.wav' },
      { hanzi: '那么', pinyin: 'nà me', meaning: 'à ce point-là (loin)', meaningEn: 'to that extent (far)', audio: 'audio/hsk2/hsk2_那么.wav' },
      { hanzi: '这么', pinyin: 'zhè me', meaning: 'à ce point-là (proche)', meaningEn: 'to this extent (near)', audio: 'audio/hsk2/hsk2_这么.wav' },
      { hanzi: '不像', pinyin: 'bú xiàng', meaning: 'pas comme', meaningEn: 'not like', audio: 'audio/hsk3/hsk3_像.wav' },
      { hanzi: '高', pinyin: 'gāo', meaning: 'grand (taille)', meaningEn: 'tall', audio: 'audio/hsk1/hsk1_高.wav' },
      { hanzi: '大', pinyin: 'dà', meaning: 'grand', meaningEn: 'big', audio: 'audio/hsk1/hsk1_大.wav' }
    ],
    tip:
      '没有 est le choix par défaut pour dire « moins X que ». Ajoute 那么/这么 pour renforcer l\'impression d\'écart.',
    tipEn:
      '没有 is the default for «less X than». Add 那么/这么 to emphasize the gap.'
  },
  {
    id: 'b12-yiyang-you-question',
    title: '跟/和...一样 + 有 dans la question',
    titleEn: '跟/和...一样 + 有 in questions',
    body:
      'Structure « pareil » : A + 跟 (ou 和) + B + 一样.\n' +
      '- 我的手机跟你的一样 (wǒ de shǒujī gēn nǐ de yīyàng) « mon téléphone est identique au tien »\n' +
      '\n' +
      'Avec un adjectif pour préciser sur QUOI : A + 跟/和 + B + 一样 + adjectif.\n' +
      '- 我跟她一样忙 (wǒ gēn tā yīyàng máng) « je suis aussi occupée qu\'elle »\n' +
      '\n' +
      'Négation : 不 devant 一样 → A + 跟/和 + B + 不一样.\n' +
      '- 我的看法跟你的不一样 (wǒ de kànfǎ gēn nǐ de bù yīyàng) « mon avis diffère du tien »\n' +
      '\n' +
      'Version écrite/formelle : 相同 (xiāngtóng).\n' +
      '- 我们的想法相同 (wǒmen de xiǎngfǎ xiāngtóng) « nos idées sont identiques »\n' +
      '- À l\'oral, garde 一样.\n' +
      '\n' +
      'Attention : pour demander si A atteint le NIVEAU de B, on utilise 有 et non 一样. Structure : A + 有 + B + adj + 吗 ?\n' +
      '- 你有他高吗 ？ (nǐ yǒu tā gāo ma?) « est-ce que tu es aussi grand que lui ? »\n' +
      '- Renforcé : 你有他那么快吗 ？ (nǐ yǒu tā nàme kuài ma?) « t\'es aussi rapide que lui ? »\n' +
      '\n' +
      'Réponses typiques : 我没有他高 (moins) ou 我跟他一样高 (pareil). On ne répond pas avec 有 en réponse.',
    bodyEn:
      '«Same» structure: A + 跟 (or 和) + B + 一样. 我的手机跟你的一样 = my phone is the same as yours. With an adjective to specify: A + 跟/和 + B + 一样 + adj. 我跟她一样忙 = I\'m as busy as her. Negation: 不 before 一样. 我的看法跟你的不一样 = my opinion differs from yours. Formal written form: 相同 (xiāngtóng). 我们的想法相同 = our ideas are the same. Speak with 一样. IMPORTANT: to ask if A reaches B\'s level, use 有, not 一样: A + 有 + B + adj + 吗? 你有他高吗？= are you as tall as him? Reinforced: 你有他那么快吗？= are you as fast as him? Reply with 我没有他高 (less) or 我跟他一样高 (same), never 有 in the reply.',
    items: [
      { hanzi: '跟', pinyin: 'gēn', meaning: 'avec, comme', meaningEn: 'with, like', audio: 'audio/hsk3/hsk3_跟.wav' },
      { hanzi: '和', pinyin: 'hé', meaning: 'et, avec', meaningEn: 'and, with', audio: 'audio/hsk1/hsk1_和.wav' },
      { hanzi: '一样', pinyin: 'yí yàng', meaning: 'pareil', meaningEn: 'same', audio: 'audio/hsk3/hsk3_一样.wav' },
      { hanzi: '不一样', pinyin: 'bù yí yàng', meaning: 'différent', meaningEn: 'different', audio: 'audio/hsk3/hsk3_一样.wav' },
      { hanzi: '相同', pinyin: 'xiāng tóng', meaning: 'identique (écrit)', meaningEn: 'identical (written)', audio: 'audio/hsk5/hsk5_相同.wav' },
      { hanzi: '有', pinyin: 'yǒu', meaning: 'atteindre (question niveau)', meaningEn: 'reach (level question)', audio: 'audio/hsk1/hsk1_有.wav' },
      { hanzi: '看法', pinyin: 'kàn fǎ', meaning: 'point de vue', meaningEn: 'opinion', audio: 'audio/hsk4/hsk4_看法.wav' }
    ],
    tip:
      'À l\'oral, on demande TOUJOURS 有 + B + adj + 吗 (pas 一样). C\'est un des petits détails qui fait sonner ton chinois naturel.',
    tipEn:
      'In speech, ALWAYS ask 有 + B + adj + 吗 (not 一样). It\'s a small detail that makes your Chinese sound native.'
  },
  {
    id: 'b12-bi-geng-hai',
    title: '更 vs 还 après 比 : neutre vs émotionnel',
    titleEn: '更 vs 还 after 比: neutral vs emotional',
    body:
      'Structure : A + 比 + B + 更/还 + adjectif = « A est ENCORE PLUS X que B ».\n' +
      '\n' +
      '更 (gèng) = choix neutre, tous registres. Convient à l\'écrit comme à l\'oral.\n' +
      '- 他的手机比我的更贵 (tā de shǒujī bǐ wǒ de gèng guì) « son téléphone est encore plus cher que le mien »\n' +
      '\n' +
      '还 (hái) = émotion, surprise, réaction personnelle. Plus oral et vivant.\n' +
      '- 今天比昨天还冷 (jīntiān bǐ zuótiān hái lěng) « il fait ENCORE PLUS froid qu\'hier ! »\n' +
      '\n' +
      'Règle pratique : essai calme et factuel → 更. Surprise, émotion → 还. Dans un essai ou rapport → 更 par défaut ; dans une conversation animée → 还 est souvent plus naturel.\n' +
      '\n' +
      'Attention : 更 et 还 vivent DANS la structure 比. On ne peut pas dire 他更贵 seul comme comparaison sauf si le contexte a déjà posé la référence (une phrase avant, par exemple).',
    bodyEn:
      'Structure: A + 比 + B + 更/还 + adj = «A is EVEN MORE X than B». 更 (gèng) = neutral, all registers, spoken and written. 他的手机比我的更贵 = his phone is even more expensive than mine. 还 (hái) = emotion, surprise, personal reaction. More spoken, livelier. 今天比昨天还冷 = it\'s EVEN colder than yesterday! Practical rule: calm and factual → 更. Surprise, emotion → 还. In an essay or report → default to 更; in a lively conversation → 还 often feels more natural. NB: 更 and 还 live INSIDE the 比 structure. You can\'t say 他更贵 alone as a comparison unless the reference was set in the previous sentence.',
    items: [
      { hanzi: '更', pinyin: 'gèng', meaning: 'encore plus (neutre)', meaningEn: 'even more (neutral)', audio: 'audio/hsk3/hsk3_更.wav' },
      { hanzi: '还', pinyin: 'hái', meaning: 'encore (émotionnel)', meaningEn: 'even (emotional)', audio: 'audio/hsk2/hsk2_还.wav' },
      { hanzi: '贵', pinyin: 'guì', meaning: 'cher', meaningEn: 'expensive', audio: 'audio/hsk2/hsk2_贵.wav' },
      { hanzi: '冷', pinyin: 'lěng', meaning: 'froid', meaningEn: 'cold', audio: 'audio/hsk1/hsk1_冷.wav' },
      { hanzi: '聪明', pinyin: 'cōng míng', meaning: 'intelligent', meaningEn: 'smart', audio: 'audio/hsk3/hsk3_聪明.wav' },
      { hanzi: '手机', pinyin: 'shǒu jī', meaning: 'téléphone', meaningEn: 'phone', audio: 'audio/hsk2/hsk2_手机.wav' }
    ],
    tip:
      'Test rapide : si tu dirais « ENCORE PLUS X ! » avec un point d\'exclamation, prends 还. Si tu dirais juste « encore plus X », prends 更.',
    tipEn:
      'Quick test: if you\'d say «EVEN MORE X!» with an exclamation, use 还. If you\'d just say «even more X», use 更.'
  }
];

// --- cecr-b12-bi-m2 — 比 avancé : précision, actions, écarts ---------------
export const b12BiPrecisionLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b12-bi-gap-modifiers',
    title: 'Écart petit / grand : 一点儿, 一些, 得多, 多了',
    titleEn: 'Small / big gap: 一点儿, 一些, 得多, 多了',
    body:
      'Structure : A + 比 + B + adjectif + modificateur d\'écart.\n' +
      '\n' +
      'Écart petit :\n' +
      '- 一点儿 (yìdiǎnr) : oral, décontracté. Ex : 今天比昨天热一点儿 (jīntiān bǐ zuótiān rè yìdiǎnr) « il fait un peu plus chaud qu\'hier ».\n' +
      '- 一些 (yìxiē) : équivalent, un chouïa plus neutre. Ex : 这本书比那本厚一些 (zhè běn shū bǐ nà běn hòu yìxiē) « ce livre est un peu plus épais ».\n' +
      '\n' +
      'Écart grand :\n' +
      '- 得多 (de duō) : écrit et oral. Ex : 新电脑比旧电脑快得多 (xīn diànnǎo bǐ jiù diànnǎo kuài de duō) « le nouvel ordi est bien plus rapide que l\'ancien ».\n' +
      '- 多了 (duō le) : très fréquent à l\'oral. Ex : 新电脑比旧电脑快多了 (xīn diànnǎo bǐ jiù diànnǎo kuài duō le).\n' +
      '\n' +
      'Attention : le modificateur d\'écart vient TOUJOURS APRÈS l\'adjectif, jamais avant. 比旧电脑很多快 ✗, 比旧电脑很快 ✗. Une fois que 比 est là, on ne remet ni 很 ni 很多 devant l\'adjectif.',
    bodyEn:
      'Structure: A + 比 + B + adjective + gap modifier. Small gap: 一点儿 (yìdiǎnr) — casual, spoken (今天比昨天热一点儿 = a bit hotter than yesterday); 一些 (yìxiē) — equivalent, slightly more neutral. Big gap: 得多 (de duō) — spoken and written (新电脑比旧电脑快得多 = much faster); 多了 (duō le) — very common in speech (新电脑比旧电脑快多了). Warning: the gap modifier ALWAYS comes AFTER the adjective, never before. Once 比 is in play, no 很 or 很多 before the adjective.',
    items: [
      { hanzi: '一点儿', pinyin: 'yì diǎnr', meaning: 'un peu', meaningEn: 'a bit', audio: 'audio/hsk2/hsk2_一点儿.wav' },
      { hanzi: '一些', pinyin: 'yì xiē', meaning: 'un peu, quelques', meaningEn: 'a bit, some', audio: 'audio/hsk3/hsk3_一些.wav' },
      { hanzi: '得多', pinyin: 'de duō', meaning: 'beaucoup plus (post-adj)', meaningEn: 'much more (post-adj)', audio: 'audio/hsk3/hsk3_多.wav' },
      { hanzi: '多了', pinyin: 'duō le', meaning: 'beaucoup plus (oral)', meaningEn: 'much more (spoken)', audio: 'audio/hsk1/hsk1_多.wav' },
      { hanzi: '快', pinyin: 'kuài', meaning: 'rapide', meaningEn: 'fast', audio: 'audio/hsk2/hsk2_快.wav' },
      { hanzi: '热', pinyin: 'rè', meaning: 'chaud', meaningEn: 'hot', audio: 'audio/hsk1/hsk1_热.wav' },
      { hanzi: '厚', pinyin: 'hòu', meaning: 'épais', meaningEn: 'thick', audio: 'audio/hsk4/hsk4_厚.wav' }
    ],
    tip:
      'Ordre à mémoriser : A + 比 + B + adjectif + modificateur d\'écart. Le modificateur ne vient JAMAIS avant l\'adjectif.',
    tipEn:
      'Order to memorize: A + 比 + B + adjective + gap modifier. The modifier NEVER goes before the adjective.'
  },
  {
    id: 'b12-bi-quantity-complement',
    title: 'Écart exact : quantité après l\'adjectif',
    titleEn: 'Exact gap: quantity after the adjective',
    body:
      'Structure : A + 比 + B + adjectif mesurable + quantité chiffrée.\n' +
      '\n' +
      'Fonctionne uniquement avec des adjectifs MESURABLES : 大, 高, 长, 贵, 远, 重…\n' +
      '\n' +
      'Exemples :\n' +
      '- 她比我大三岁 (tā bǐ wǒ dà sān suì) « elle a 3 ans de plus que moi »\n' +
      '- 这本书比那本贵二十块 (zhè běn shū bǐ nà běn guì èrshí kuài) « ce livre est 20 yuan plus cher »\n' +
      '- 我家比他家远两公里 (wǒ jiā bǐ tā jiā yuǎn liǎng gōnglǐ) « ma maison est 2 km plus loin »\n' +
      '\n' +
      'Attention : le pattern ne marche PAS avec 没有. 我没有她大三岁 ✗ n\'existe pas.\n' +
      '\n' +
      'Astuce pour « X est moins Y que Z par N » :\n' +
      '- Option 1 : inverse l\'adjectif → 我比她小三岁 (wǒ bǐ tā xiǎo sān suì) « j\'ai 3 ans de moins qu\'elle ». Utilise l\'antonyme mesurable (小/矮/轻/低/短).\n' +
      '- Option 2 : renverse A et B → 她比我大三岁 (même info, autre perspective).',
    bodyEn:
      'Structure: A + 比 + B + measurable adjective + numeric quantity. Only works with MEASURABLE adjectives: 大, 高, 长, 贵, 远, 重… 她比我大三岁 = she\'s 3 years older than me. 这本书比那本贵二十块 = this book is 20 yuan more expensive. 我家比他家远两公里 = my place is 2 km farther. IMPORTANT: this pattern does NOT work with 没有. 我没有她大三岁 ✗ doesn\'t exist. To say «X is less Y than Z by N»: (a) flip the adjective — 我比她小三岁 = I\'m 3 years younger. Use the measurable antonym (小/矮/轻/低/短); (b) flip A and B — 她比我大三岁 (same info, different angle).',
    items: [
      { hanzi: '大', pinyin: 'dà', meaning: 'grand, âgé', meaningEn: 'big, older', audio: 'audio/hsk1/hsk1_大.wav' },
      { hanzi: '小', pinyin: 'xiǎo', meaning: 'petit, plus jeune', meaningEn: 'small, younger', audio: 'audio/hsk1/hsk1_小.wav' },
      { hanzi: '岁', pinyin: 'suì', meaning: 'ans (âge)', meaningEn: 'years (age)', audio: 'audio/hsk1/hsk1_岁.wav' },
      { hanzi: '贵', pinyin: 'guì', meaning: 'cher', meaningEn: 'expensive', audio: 'audio/hsk2/hsk2_贵.wav' },
      { hanzi: '远', pinyin: 'yuǎn', meaning: 'loin', meaningEn: 'far', audio: 'audio/hsk2/hsk2_远.wav' },
      { hanzi: '公里', pinyin: 'gōng lǐ', meaning: 'kilomètre', meaningEn: 'kilometer', audio: 'audio/hsk4/hsk4_公里.wav' },
      { hanzi: '块', pinyin: 'kuài', meaning: 'yuan (oral)', meaningEn: 'yuan (spoken)', audio: 'audio/hsk1/hsk1_块.wav' }
    ],
    tip:
      'Les natifs jonglent constamment entre les 2 options (inverser l\'adjectif ou inverser A/B). Choisis celle qui sonne le plus clair pour ta phrase.',
    tipEn:
      'Natives constantly juggle between the 2 options (flip the adjective or flip A/B). Pick whichever reads more clearly.'
  },
  {
    id: 'b12-bi-action-de-complement',
    title: 'Comparer des actions : le complément 得',
    titleEn: 'Comparing actions: the 得 complement',
    body:
      'Pour comparer non pas des personnes mais LA MANIÈRE dont elles font quelque chose, on utilise le complément 得.\n' +
      '\n' +
      'Structure 1 (comparaison d\'abord) : A + 比 + B + verbe + 得 + adjectif.\n' +
      '- 他比我跑得快 (tā bǐ wǒ pǎo de kuài) « il court plus vite que moi »\n' +
      '\n' +
      'Structure 2 (action d\'abord) : A + verbe + 得 + 比 + B + adjectif.\n' +
      '- 他跑得比我快 (tā pǎo de bǐ wǒ kuài) — même sens, plus naturel à l\'oral.\n' +
      '\n' +
      'Cas avec objet : quand le verbe a un objet, on RÉPÈTE le verbe avant 得.\n' +
      '- 他说汉语说得比我好 (tā shuō hànyǔ shuō de bǐ wǒ hǎo) « il parle chinois mieux que moi »\n' +
      '- Le premier 说 porte l\'objet 汉语, le second porte le complément.\n' +
      '\n' +
      'Cas avancé (verbes ET objets différents) :\n' +
      '- 你说法语说得比我说中文好 (nǐ shuō fǎyǔ shuō de bǐ wǒ shuō zhōngwén hǎo) « tu parles français mieux que je ne parle chinois ». Structure longue mais logique claire.\n' +
      '\n' +
      '一样 pour actions équivalentes : structures parallèles avec 跟/和 + B + 一样 + verbe + 得 + adj OU verbe + 得 + 跟 B 一样 + adj.\n' +
      '- 我跟他一样跑得快 = 我跑得跟他一样快 (les deux marchent).',
    bodyEn:
      'To compare not people but the WAY they do something, use the 得 complement. Structure 1 (comparison first): A + 比 + B + verb + 得 + adj. 他比我跑得快 = he runs faster than me. Structure 2 (action first): A + verb + 得 + 比 + B + adj. 他跑得比我快 — same meaning, more natural in speech. With an object: REPEAT the verb before 得. 他说汉语说得比我好 = he speaks Chinese better than me. First 说 carries the object 汉语, second carries the complement. Advanced case (different verbs AND objects): 你说法语说得比我说中文好 = you speak French better than I speak Chinese. 一样 for equivalent actions: A + 跟/和 + B + 一样 + verb + 得 + adj OR verb + 得 + 跟 B 一样 + adj. 我跟他一样跑得快 = 我跑得跟他一样快.',
    items: [
      { hanzi: '得', pinyin: 'de', meaning: 'particule de manière', meaningEn: 'manner particle', audio: 'audio/hsk1/hsk1_的.wav' },
      { hanzi: '跑', pinyin: 'pǎo', meaning: 'courir', meaningEn: 'run', audio: 'audio/hsk2/hsk2_跑.wav' },
      { hanzi: '快', pinyin: 'kuài', meaning: 'rapide', meaningEn: 'fast', audio: 'audio/hsk2/hsk2_快.wav' },
      { hanzi: '说', pinyin: 'shuō', meaning: 'parler', meaningEn: 'speak', audio: 'audio/hsk1/hsk1_说.wav' },
      { hanzi: '汉语', pinyin: 'hàn yǔ', meaning: 'chinois (langue)', meaningEn: 'Chinese (language)', audio: 'audio/hsk1/hsk1_汉语.wav' },
      { hanzi: '好', pinyin: 'hǎo', meaning: 'bien', meaningEn: 'well', audio: 'audio/hsk1/hsk1_好.wav' }
    ],
    tip:
      'La répétition du verbe surprend au début. Mémorise la formule « verbe + objet + verbe + 得 + comparaison » comme un bloc.',
    tipEn:
      'The verb repetition looks strange at first. Memorize «verb + object + verb + 得 + comparison» as a chunk.'
  },
  {
    id: 'b12-bi-duo-shao-zao-wan',
    title: '多/少/早/晚 : quantifier une action comparée',
    titleEn: '多/少/早/晚: quantifying a compared action',
    body:
      'Structure : A + 比 + B + [多/少/早/晚] + verbe + quantité.\n' +
      '\n' +
      'Direction : 多 (plus), 少 (moins), 早 (plus tôt), 晚 (plus tard). Ils viennent AVANT le verbe.\n' +
      '\n' +
      'Exemples :\n' +
      '- 我比他早到十五分钟 (wǒ bǐ tā zǎo dào shíwǔ fēnzhōng) « je suis arrivé 15 min plus tôt que lui »\n' +
      '- 我比他多吃了五个饺子 (wǒ bǐ tā duō chī le wǔ ge jiǎozi) « j\'ai mangé 5 raviolis de plus que lui »\n' +
      '- 她比我少睡两个小时 (tā bǐ wǒ shǎo shuì liǎng ge xiǎoshí) « elle dort 2 h de moins que moi »\n' +
      '- 他比我晚走了半个小时 (tā bǐ wǒ wǎn zǒu le bàn ge xiǎoshí) « il est parti 30 min plus tard »\n' +
      '\n' +
      'Règle mnémonique : 多/少/早/晚 = direction (plus/moins/plus tôt/plus tard) ; la quantité en fin de phrase = taille de l\'écart.',
    bodyEn:
      'Structure: A + 比 + B + [多/少/早/晚] + verb + quantity. Direction: 多 (more), 少 (less), 早 (earlier), 晚 (later). They come BEFORE the verb. 我比他早到十五分钟 = I arrived 15 min earlier than him. 我比他多吃了五个饺子 = I ate 5 more dumplings than him. 她比我少睡两个小时 = she sleeps 2 hours less than me. 他比我晚走了半个小时 = he left 30 min later. Mnemonic: 多/少/早/晚 = direction; quantity at the end = size of the gap.',
    items: [
      { hanzi: '多', pinyin: 'duō', meaning: 'plus (pré-verbe)', meaningEn: 'more (pre-verb)', audio: 'audio/hsk1/hsk1_多.wav' },
      { hanzi: '少', pinyin: 'shǎo', meaning: 'moins (pré-verbe)', meaningEn: 'less (pre-verb)', audio: 'audio/hsk1/hsk1_少.wav' },
      { hanzi: '早', pinyin: 'zǎo', meaning: 'plus tôt', meaningEn: 'earlier', audio: 'audio/hsk1/hsk1_早.wav' },
      { hanzi: '晚', pinyin: 'wǎn', meaning: 'plus tard', meaningEn: 'later', audio: 'audio/hsk2/hsk2_晚.wav' },
      { hanzi: '到', pinyin: 'dào', meaning: 'arriver', meaningEn: 'arrive', audio: 'audio/hsk2/hsk2_到.wav' },
      { hanzi: '睡', pinyin: 'shuì', meaning: 'dormir', meaningEn: 'sleep', audio: 'audio/hsk1/hsk1_睡.wav' },
      { hanzi: '饺子', pinyin: 'jiǎo zi', meaning: 'ravioli', meaningEn: 'dumpling', audio: 'audio/hsk4/hsk4_饺子.wav' },
      { hanzi: '分钟', pinyin: 'fēn zhōng', meaning: 'minute', meaningEn: 'minute', audio: 'audio/hsk1/hsk1_分钟.wav' }
    ],
    tip:
      'À distinguer du complément 得 (qui compare LA MANIÈRE d\'agir). Ici, on compare une QUANTITÉ ou un DÉLAI, pas la qualité.',
    tipEn:
      'Distinguish from the 得 complement (which compares the WAY of acting). Here we compare a QUANTITY or DELAY, not quality.'
  }
];

// --- cecr-b22-grammar-complement-m1 — Compléments de résultat --------------
export const b22GrammarComplementM1LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b22-compl-result-4',
    title: 'V + 完/好/懂/到 : préciser l\'état final',
    titleEn: 'V + 完/好/懂/到: specifying the end state',
    body:
      'Un verbe chinois seul est ambigu : 吃 veut-il dire « manger » ou « avoir fini de manger » ? Le **complément de résultat** tranche. Les quatre stars :\n' +
      '- 完 (finir) : 吃完 (finir de manger)\n' +
      '- 好 (bien/prêt) : 做好 (faire correctement / être prêt)\n' +
      '- 懂 (comprendre) : 听懂 (entendre-et-comprendre)\n' +
      '- 到 (atteindre) : 找到 (trouver = chercher + atteindre)\n' +
      '\n' +
      'Attention : négation 没 + V + complément. 我没听懂 = je n\'ai pas compris.',
    bodyEn:
      'A bare Chinese verb is ambiguous: does 吃 mean «eat» or «have finished eating»? The result complement settles it. The 4 stars: 完 (finish), 好 (well/ready), 懂 (understand), 到 (reach). 吃完 (finish eating), 做好 (do well/be ready), 听懂 (hear-and-understand), 找到 (find = search + reach). Negation: 没 + V + complement. 我没听懂 = I didn\'t understand.',
    items: [
      { hanzi: '完', pinyin: 'wán', meaning: 'finir', meaningEn: 'finish', audio: 'audio/hsk3/hsk3_完.wav' },
      { hanzi: '好', pinyin: 'hǎo', meaning: 'bien, prêt (après V)', meaningEn: 'well, ready (after V)', audio: 'audio/hsk1/hsk1_好.wav' },
      { hanzi: '懂', pinyin: 'dǒng', meaning: 'comprendre', meaningEn: 'understand', audio: 'audio/hsk2/hsk2_懂.wav' },
      { hanzi: '到', pinyin: 'dào', meaning: 'atteindre', meaningEn: 'reach', audio: 'audio/hsk2/hsk2_到.wav' },
      { hanzi: '听懂', pinyin: 'tīng dǒng', meaning: 'comprendre (oral)', meaningEn: 'understand (aural)', audio: 'audio/hsk2/hsk2_懂.wav' },
      { hanzi: '看到', pinyin: 'kàn dào', meaning: 'apercevoir', meaningEn: 'see', audio: 'audio/hsk2/hsk2_到.wav' },
      { hanzi: '找到', pinyin: 'zhǎo dào', meaning: 'trouver', meaningEn: 'find', audio: 'audio/hsk2/hsk2_找.wav' },
      { hanzi: '准备好', pinyin: 'zhǔn bèi hǎo', meaning: 'être prêt', meaningEn: 'be ready', audio: 'audio/hsk2/hsk2_准备.wav' }
    ],
    tip:
      'Distingue 看 (regarder) / 看到 (apercevoir) / 看懂 (comprendre ce qu\'on voit). Même racine, 3 résultats très différents. Pareil pour 听.',
    tipEn:
      'Distinguish 看 (watch) / 看到 (spot) / 看懂 (understand what you see). Same verb, 3 very different results. Same for 听.'
  },
  {
    id: 'b22-result-tokens',
    title: 'Structure visuelle : V (action) + résultat (état final)',
    titleEn: 'Visual structure: V (action) + result (end state)',
    body:
      'Le verbe (orange) dit l\'action commencée. Le complément résultatif (turquoise) dit ce qu\'on obtient au bout. Sans le résultatif, le verbe seul est ambigu — on ne sait pas si l\'objectif est atteint.',
    bodyEn:
      'The verb (orange) tells the started action. The result complement (teal) tells the end state. Without it, the bare verb is ambiguous — you don\'t know if the goal was reached.',
    tokenizedSentences: [
      {
        zh: [
          { text: '我', pinyin: 'wǒ', role: 'sujet' },
          { text: '听', pinyin: 'tīng', role: 'verbe' },
          { text: '懂', pinyin: 'dǒng', role: 'complement' },
          { text: '了', pinyin: 'le', role: 'particule' }
        ],
        fr: [
          { text: 'J\'ai', role: 'sujet' },
          { text: 'entendu', role: 'verbe' },
          { text: 'et compris', role: 'complement' }
        ],
        note: '听 = entendre (action). 懂 = comprendre (résultat). 听懂 = entendre AVEC succès. Sans 懂, j\'ai juste entendu sans capter le sens.'
      },
      {
        zh: [
          { text: '她', pinyin: 'tā', role: 'sujet' },
          { text: '找', pinyin: 'zhǎo', role: 'verbe' },
          { text: '到', pinyin: 'dào', role: 'complement' },
          { text: '了', pinyin: 'le', role: 'particule' },
          { text: '工作', pinyin: 'gōng zuò', role: 'objet' }
        ],
        fr: [
          { text: 'Elle a', role: 'sujet' },
          { text: 'trouvé', role: 'verbe' },
          { text: 'un travail', role: 'objet' }
        ],
        note: '找 = chercher. 到 = atteindre. 找到 = chercher AVEC succès = trouver. Sans 到, c\'est juste « chercher ».'
      },
      {
        zh: [
          { text: '我', pinyin: 'wǒ', role: 'sujet' },
          { text: '没', pinyin: 'méi', role: 'modificateur' },
          { text: '听', pinyin: 'tīng', role: 'verbe' },
          { text: '懂', pinyin: 'dǒng', role: 'complement' }
        ],
        fr: [
          { text: 'Je n\'ai', role: 'sujet' },
          { text: 'pas', role: 'modificateur' },
          { text: 'compris', role: 'complement' }
        ],
        note: 'NÉGATION : 没 + V + complément. Le résultat n\'a PAS été atteint. Pas de 了 dans la négation.'
      }
    ],
    tip:
      'Vérifier ta phrase chinoise : après un verbe d\'action, ajoutes-tu un résultatif pour confirmer le succès ? Sinon, l\'action peut être interprétée comme inachevée.',
    tipEn:
      'Check your Chinese sentence: after an action verb, do you add a resultative to confirm success? Without it, the action can be read as unfinished.'
  }
];

// --- cecr-b22-grammar-complement-m2 — Directionnels simples ---------------
export const b22GrammarComplementM2LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b22-compl-dir-simple',
    title: 'V + 上/下/进/出/回/过',
    titleEn: 'V + 上/下/进/出/回/过',
    body:
      'Les directionnels simples indiquent l\'orientation du mouvement, accolés au verbe :\n' +
      '- 上 (vers le haut), 下 (vers le bas)\n' +
      '- 进 (entrer), 出 (sortir)\n' +
      '- 回 (revenir), 过 (traverser / passer)\n' +
      '\n' +
      'Exemples : 走进 (entrer en marchant), 跑出 (sortir en courant), 坐下 (s\'asseoir). Attention : quand un lieu-objet s\'insère, il va **au milieu**. 走进房间 (entrer dans la pièce), pas 走房间进 ✗.',
    bodyEn:
      'Simple directionals indicate movement orientation: 上 (up/onto), 下 (down), 进 (enter), 出 (exit), 回 (return), 过 (across/past). Stuck to the verb: 走进 (walk in), 跑出 (run out), 坐下 (sit down). When a location-object inserts, it goes IN THE MIDDLE: 走进房间 (walk into the room), not 走房间进 ✗.',
    items: [
      { hanzi: '上', pinyin: 'shàng', meaning: 'monter / sur', meaningEn: 'up / onto', audio: 'audio/hsk1/hsk1_上.wav' },
      { hanzi: '下', pinyin: 'xià', meaning: 'descendre / sous', meaningEn: 'down / under', audio: 'audio/hsk1/hsk1_下.wav' },
      { hanzi: '进', pinyin: 'jìn', meaning: 'entrer', meaningEn: 'enter', audio: 'audio/hsk2/hsk2_进.wav' },
      { hanzi: '出', pinyin: 'chū', meaning: 'sortir', meaningEn: 'exit', audio: 'audio/hsk2/hsk2_出.wav' },
      { hanzi: '回', pinyin: 'huí', meaning: 'revenir', meaningEn: 'return', audio: 'audio/hsk1/hsk1_回.wav' },
      { hanzi: '过', pinyin: 'guò', meaning: 'passer / traverser', meaningEn: 'pass / cross', audio: 'audio/hsk1/hsk1_过.wav' },
      { hanzi: '走进', pinyin: 'zǒu jìn', meaning: 'entrer (à pied)', meaningEn: 'walk in', audio: 'audio/hsk2/hsk2_进.wav' },
      { hanzi: '坐下', pinyin: 'zuò xià', meaning: 's\'asseoir', meaningEn: 'sit down', audio: 'audio/hsk1/hsk1_下.wav' }
    ],
    tip:
      'Les directionnels simples peuvent aussi servir de verbes à part entière : 上楼 (monter l\'escalier), 下车 (descendre d\'un véhicule), 出门 (sortir de chez soi).',
    tipEn:
      'Simple directionals can also stand alone as verbs: 上楼 (go upstairs), 下车 (get off a vehicle), 出门 (leave the house).'
  },
  {
    id: 'b22-dir-tokens',
    title: 'Structure visuelle : le lieu s\'INSÈRE au milieu',
    titleEn: 'Visual structure: the location INSERTS in the middle',
    body:
      'V + 进 (entrer). Si on précise OÙ on entre, le lieu vient ENTRE le verbe et le directionnel, ou parfois après. Repère la position pour ne pas faire de fautes type 走房间进 ✗.',
    bodyEn:
      'V + 进 (enter). If you specify WHERE you enter, the location slots BETWEEN verb and directional, or sometimes after. Spot the position to avoid mistakes like 走房间进 ✗.',
    tokenizedSentences: [
      {
        zh: [
          { text: '他', pinyin: 'tā', role: 'sujet' },
          { text: '走', pinyin: 'zǒu', role: 'verbe' },
          { text: '进', pinyin: 'jìn', role: 'complement' },
          { text: '房间', pinyin: 'fáng jiān', role: 'lieu' }
        ],
        fr: [
          { text: 'Il', role: 'sujet' },
          { text: 'entre', role: 'verbe' },
          { text: 'dans la pièce', role: 'lieu' },
          { text: 'à pied', role: 'complement' }
        ],
        note: '走 (verbe d\'action) + 进 (directionnel) + lieu. Le directionnel précise l\'ENTRÉE.'
      },
      {
        zh: [
          { text: '请', pinyin: 'qǐng', role: 'verbe' },
          { text: '坐', pinyin: 'zuò', role: 'verbe' },
          { text: '下', pinyin: 'xià', role: 'complement' }
        ],
        fr: [
          { text: 'Veuillez', role: 'verbe' },
          { text: 'vous asseoir', role: 'verbe' }
        ],
        note: 'Sans lieu-objet : 坐下 = action complète. 下 indique le SENS du mouvement (vers le bas).'
      },
      {
        zh: [
          { text: '她', pinyin: 'tā', role: 'sujet' },
          { text: '跑', pinyin: 'pǎo', role: 'verbe' },
          { text: '出', pinyin: 'chū', role: 'complement' },
          { text: '教室', pinyin: 'jiào shì', role: 'lieu' }
        ],
        fr: [
          { text: 'Elle', role: 'sujet' },
          { text: 'sort', role: 'verbe' },
          { text: 'de la salle de classe', role: 'lieu' },
          { text: 'en courant', role: 'complement' }
        ],
        note: '跑 = courir (verbe). 出 = sortir (directionnel). Même position : lieu APRÈS le directionnel.'
      }
    ],
    tip:
      'Anti-mémo : NE PAS dire 走房间进, 跑教室出 ✗. Le directionnel reste collé au verbe ; le lieu suit. Verbe + directionnel + lieu.',
    tipEn:
      'Anti-memo: DON\'T say 走房间进, 跑教室出 ✗. The directional stays glued to the verb; the location follows. Verb + directional + location.'
  }
];

// --- cecr-b22-grammar-complement-m3 — Directionnels composés --------------
export const b22GrammarComplementM3LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b22-compl-dir-compound',
    title: 'La grille 6×2 : direction + 来/去',
    titleEn: 'The 6×2 grid: direction + 来/去',
    body:
      'Chaque directionnel simple (上/下/进/出/回/过) se combine avec **来** (vers le locuteur) ou **去** (loin du locuteur), ce qui donne 12 cases :\n' +
      '- 上来 / 上去, 下来 / 下去\n' +
      '- 进来 / 进去, 出来 / 出去\n' +
      '- 回来 / 回去, 过来 / 过去\n' +
      '\n' +
      '他走过来 (il vient par ici) vs 他走过去 (il va par là-bas). Astuce : usages abstraits très répandus — 看起来 (à première vue), 想起来 (se rappeler), 听下去 (continuer à écouter).',
    bodyEn:
      'Each simple directional (上/下/进/出/回/过) pairs with 来 (toward speaker) or 去 (away from speaker). That\'s 12 cells: 上来/上去, 下来/下去, 进来/进去, 出来/出去, 回来/回去, 过来/过去. 他走过来 (he comes over here) vs 他走过去 (he goes over there). Very common abstract uses: 看起来 (at first glance), 想起来 (remember), 听下去 (keep listening).',
    items: [
      { hanzi: '上来', pinyin: 'shàng lái', meaning: 'monter (vers moi)', meaningEn: 'come up (to me)', audio: 'audio/hsk2/hsk2_上来.wav' },
      { hanzi: '下去', pinyin: 'xià qù', meaning: 'descendre (loin de moi)', meaningEn: 'go down (away)', audio: 'audio/hsk2/hsk2_下去.wav' },
      { hanzi: '进来', pinyin: 'jìn lái', meaning: 'entrer (vers moi)', meaningEn: 'come in', audio: 'audio/hsk2/hsk2_进来.wav' },
      { hanzi: '出去', pinyin: 'chū qù', meaning: 'sortir (loin de moi)', meaningEn: 'go out', audio: 'audio/hsk2/hsk2_出去.wav' },
      { hanzi: '回来', pinyin: 'huí lái', meaning: 'revenir (vers moi)', meaningEn: 'come back', audio: 'audio/hsk2/hsk2_回来.wav' },
      { hanzi: '过来', pinyin: 'guò lái', meaning: 'venir par ici', meaningEn: 'come over', audio: 'audio/hsk2/hsk2_过来.wav' },
      { hanzi: '起来', pinyin: 'qǐ lái', meaning: 'se lever / commencer', meaningEn: 'get up / start', audio: 'audio/hsk2/hsk2_起来.wav' },
      { hanzi: '看起来', pinyin: 'kàn qǐ lái', meaning: 'à première vue', meaningEn: 'at first glance', audio: 'audio/hsk3/hsk3_看起来.wav' }
    ],
    tip:
      'Avec un objet : il se glisse AU MILIEU. 他拿出一本书来 ou 他拿出来一本书. Les deux sont corrects. À l\'oral, la 2e (avec objet à la fin) est plus courante.',
    tipEn:
      'With an object: it slips IN THE MIDDLE. 他拿出一本书来 or 他拿出来一本书. Both work. Orally, the second (object at the end) is more common.'
  }
];

// ═════════════════════════════════════════════════════════════════════════════
// Récits & anecdotes (cecr-b12-narration)
// ═════════════════════════════════════════════════════════════════════════════

// --- cecr-b12-narr-m1 — Marqueurs temporels du récit -----------------------
export const b12NarrTimeMarkersLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b12-narr-time-chain',
    title: 'La chaîne 首先 → 然后 → 后来 → 最后',
    titleEn: 'The chain 首先 → 然后 → 后来 → 最后',
    body:
      'Pour structurer un récit, le chinois s\'appuie sur quatre marqueurs de séquence :\n' +
      '- 首先 (shǒuxiān, d\'abord) pour ouvrir\n' +
      '- 然后 (ránhòu, ensuite) pour enchaîner\n' +
      '- 后来 (hòulái, plus tard — souvent après une pause narrative)\n' +
      '- 最后 (zuìhòu, finalement) pour clore\n' +
      '\n' +
      'Astuce : cette chaîne suffit à tenir une anecdote de 5 minutes. Place chaque connecteur **en tête** de phrase, suivi d\'une virgule.',
    bodyEn:
      'To structure a narrative, Chinese relies on 4 sequence markers. 首先 (first) to open; 然后 (then) to chain; 后来 (later — often after a narrative pause); 最后 (finally) to close. This chain alone holds a 5-minute anecdote. Put each connector AT THE START of the sentence, followed by a comma.',
    items: [
      { hanzi: '首先', pinyin: 'shǒu xiān', meaning: 'd\'abord', meaningEn: 'first', audio: 'audio/hsk4/hsk4_首先.wav' },
      { hanzi: '然后', pinyin: 'rán hòu', meaning: 'ensuite', meaningEn: 'then', audio: 'audio/hsk3/hsk3_然后.wav' },
      { hanzi: '后来', pinyin: 'hòu lái', meaning: 'plus tard', meaningEn: 'later on', audio: 'audio/hsk3/hsk3_后来.wav' },
      { hanzi: '最后', pinyin: 'zuì hòu', meaning: 'finalement', meaningEn: 'finally', audio: 'audio/hsk3/hsk3_最后.wav' },
      { hanzi: '突然', pinyin: 'tū rán', meaning: 'soudain', meaningEn: 'suddenly', audio: 'audio/hsk3/hsk3_突然.wav' },
      { hanzi: '当时', pinyin: 'dāng shí', meaning: 'à ce moment', meaningEn: 'at that moment', audio: 'audio/hsk4/hsk4_当时.wav' }
    ]
  },
  {
    id: 'b12-narr-time-because',
    title: 'Causalité & concession : 因为…所以, 虽然…但是',
    titleEn: 'Cause & concession: 因为…所以, 虽然…但是',
    body:
      'En chinois, les connecteurs logiques viennent **en paire**. Les deux paires reines :\n' +
      '- 因为... 所以... (parce que... donc...) : 因为下雨，所以我没去\n' +
      '- 虽然... 但是... / 可是... (bien que... mais...) : 虽然很累，但是我还要工作\n' +
      '\n' +
      'Attention : à l\'écrit, ne pas oublier l\'un des deux côtés.',
    bodyEn:
      'In Chinese, logical connectors come IN PAIRS. 因为 (because) pairs with 所以 (so) — both are mandatory in writing. Similarly, 虽然 (although) pairs with 但是 (but) or 可是. 因为下雨, 所以我没去 (because it was raining, I didn\'t go). 虽然很累, 但是我还要工作 (although I\'m tired, I still have to work). Don\'t drop either side.',
    items: [
      { hanzi: '因为', pinyin: 'yīn wèi', meaning: 'parce que', meaningEn: 'because', audio: 'audio/hsk2/hsk2_因为.wav' },
      { hanzi: '所以', pinyin: 'suǒ yǐ', meaning: 'donc', meaningEn: 'so', audio: 'audio/hsk2/hsk2_所以.wav' },
      { hanzi: '虽然', pinyin: 'suī rán', meaning: 'bien que', meaningEn: 'although', audio: 'audio/hsk3/hsk3_虽然.wav' },
      { hanzi: '但是', pinyin: 'dàn shì', meaning: 'mais', meaningEn: 'but', audio: 'audio/hsk2/hsk2_但是.wav' },
      { hanzi: '结果', pinyin: 'jié guǒ', meaning: 'résultat', meaningEn: 'result', audio: 'audio/hsk4/hsk4_结果.wav' }
    ],
    tip:
      'À l\'oral, on peut laisser tomber 因为 mais pas 所以. « 下雨, 所以我没去 » fonctionne ; « 因为下雨, 我没去 » aussi. Mais évite de supprimer les deux en écrit.',
    tipEn:
      'Orally, 因为 may be dropped but not 所以. «下雨, 所以我没去» works; «因为下雨, 我没去» too. Avoid dropping both in writing.'
  }
];

// --- cecr-b12-narr-m2 — Raconter au passé ----------------------------------
export const b12NarrPastLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b12-narr-past-date',
    title: 'Pose la date, puis oublie la conjugaison',
    titleEn: 'Set the date, then forget conjugation',
    body:
      'Le chinois ne conjugue pas : pour raconter au passé, on plante un **repère temporel** en ouverture, puis on laisse les verbes au présent. Trois repères utiles :\n' +
      '- date / époque : 去年夏天, 十年前, 那一天\n' +
      '- action unique vs habitude : 去年我去了中国，每天都吃面条 — 了 sur 去 seulement, pas sur 吃\n' +
      '- imparfait (action en cours) : 正在 ou 在 — 那时候我正在工作\n' +
      '\n' +
      'Astuce : pour bien distinguer 了 (action accomplie) et 过 (expérience vécue), vois la section suivante.',
    bodyEn:
      'Chinese doesn\'t conjugate. To tell a past story, plant a time anchor at the start (去年夏天, 十年前, 那一天) then leave verbs in the present. 去年我去了中国, 每天都吃面条: 了 only on 去 (one-off action), not on 吃 (habit during the trip). For «imperfect» (simultaneous actions), use 正在 or 在: 那时候我正在工作 (at that moment, I was working).',
    items: [
      { hanzi: '去年', pinyin: 'qù nián', meaning: 'l\'année dernière', meaningEn: 'last year', audio: 'audio/hsk2/hsk2_去年.wav' },
      { hanzi: '前年', pinyin: 'qián nián', meaning: 'il y a deux ans', meaningEn: 'year before last', audio: 'audio/hsk3/hsk3_前年.wav' },
      { hanzi: '以前', pinyin: 'yǐ qián', meaning: 'avant', meaningEn: 'before', audio: 'audio/hsk3/hsk3_以前.wav' },
      { hanzi: '那时候', pinyin: 'nà shí hòu', meaning: 'à cette époque', meaningEn: 'at that time', audio: 'audio/hsk3/hsk3_时候.wav' },
      { hanzi: '正在', pinyin: 'zhèng zài', meaning: 'être en train de', meaningEn: 'in the process of', audio: 'audio/hsk3/hsk3_正在.wav' },
      { hanzi: '刚才', pinyin: 'gāng cái', meaning: 'tout à l\'heure', meaningEn: 'just now', audio: 'audio/hsk3/hsk3_刚才.wav' }
    ],
    tip:
      '« J\'ai mangé » est un piège. 我吃了 ≠ 我吃过 ≠ 我吃过了. 了 = action accomplie, 过 = expérience (au moins une fois dans ma vie), 过了 = l\'expérience vient de se clore.',
    tipEn:
      '«I ate» is tricky. 我吃了 ≠ 我吃过 ≠ 我吃过了. 了 = completed action, 过 = experience (at least once), 过了 = the experience just closed.'
  }
];

// --- cecr-b12-narr-m3 — Discours rapporté ---------------------------------
export const b12NarrReportedLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b12-narr-reported-shuo',
    title: '说 sans concordance de temps',
    titleEn: '说 with no sequence of tenses',
    body:
      'Le chinois rapporte directement avec 说 (dire) : **pas de concordance des temps**, on garde le temps original. 他说他明天来 = « il dit qu\'il viendra demain ». Il n\'y a pas de mot pour « que ». Cinq verbes à distinguer :\n' +
      '- 说 (dire) — pas de destinataire requis\n' +
      '- 告诉 (dire à) — prend un complément d\'attribution : 他告诉我...\n' +
      '- 问 (demander), 回答 (répondre), 解释 (expliquer)\n' +
      '\n' +
      'Astuce : pour une question indirecte, on passe par A-不-A. 他问我去不去.',
    bodyEn:
      'Chinese reports directly with 说 (say). NO sequencing: keep the original tense. 他说他明天来 = «he says he\'s coming tomorrow». You can drop «that» — Chinese has no such word. Distinguish: 说 (say — no recipient needed), 告诉 (tell someone — takes an indirect object: 他告诉我...), 问 (ask), 回答 (answer), 解释 (explain). For an indirect question, use A-不-A: 他问我去不去.',
    items: [
      { hanzi: '说', pinyin: 'shuō', meaning: 'dire', meaningEn: 'say', audio: 'audio/hsk1/hsk1_说.wav' },
      { hanzi: '告诉', pinyin: 'gào sù', meaning: 'dire à', meaningEn: 'tell', audio: 'audio/hsk2/hsk2_告诉.wav' },
      { hanzi: '问', pinyin: 'wèn', meaning: 'demander', meaningEn: 'ask', audio: 'audio/hsk2/hsk2_问.wav' },
      { hanzi: '回答', pinyin: 'huí dá', meaning: 'répondre', meaningEn: 'answer', audio: 'audio/hsk3/hsk3_回答.wav' },
      { hanzi: '解释', pinyin: 'jiě shì', meaning: 'expliquer', meaningEn: 'explain', audio: 'audio/hsk4/hsk4_解释.wav' },
      { hanzi: '表示', pinyin: 'biǎo shì', meaning: 'exprimer', meaningEn: 'express', audio: 'audio/hsk4/hsk4_表示.wav' }
    ],
    tip:
      '告诉 est TOUJOURS suivi du destinataire : 告诉我, 告诉他. « Il m\'a dit que... » = 他告诉我... Ne jamais dire 他告诉... directement sans pronom.',
    tipEn:
      '告诉 is ALWAYS followed by the recipient: 告诉我, 告诉他. «He told me that...» = 他告诉我... Never say 他告诉... without a pronoun.'
  }
];

// --- cecr-b12-narr-m4 — Décrire une personne -------------------------------
export const b12NarrPortraitLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b12-narr-portrait-layers',
    title: 'Portrait en 4 couches',
    titleEn: 'Portrait in 4 layers',
    body:
      'Construis un portrait chinois en quatre couches successives :\n' +
      '- physique général : redoublement de l\'adjectif pour adoucir — 高高的 (grand), 瘦瘦的 (mince), 胖胖的 (enveloppé)\n' +
      '- visage : 圆脸, 大眼睛, 短头发\n' +
      '- vêtements avec 穿着 : 她穿着红色的裙子 (elle porte une robe rouge)\n' +
      '- caractère : 他性格很温柔 (son caractère est doux)\n' +
      '\n' +
      'Astuce : pour ajouter une impression, 看起来 + adj — 他看起来很聪明.',
    bodyEn:
      'Build a Chinese portrait in successive layers. (1) Overall build — reduplicating the adjective softens: 高高的 (tall), 瘦瘦的 (thin), 胖胖的 (plump). (2) Face: 圆脸, 大眼睛, 短头发. (3) Clothing with 穿着: 她穿着红色的裙子 (she\'s wearing a red dress). (4) Character: 他性格很温柔 (his character is gentle). To add an impression: 看起来 + adj (他看起来很聪明).',
    items: [
      { hanzi: '高', pinyin: 'gāo', meaning: 'grand', meaningEn: 'tall', audio: 'audio/hsk2/hsk2_高.wav' },
      { hanzi: '瘦', pinyin: 'shòu', meaning: 'mince', meaningEn: 'thin', audio: 'audio/hsk3/hsk3_瘦.wav' },
      { hanzi: '胖', pinyin: 'pàng', meaning: 'gros', meaningEn: 'chubby', audio: 'audio/hsk3/hsk3_胖.wav' },
      { hanzi: '穿着', pinyin: 'chuān zhe', meaning: 'porter (état)', meaningEn: 'wearing (state)', audio: 'audio/hsk2/hsk2_穿.wav' },
      { hanzi: '性格', pinyin: 'xìng gé', meaning: 'caractère', meaningEn: 'character', audio: 'audio/hsk4/hsk4_性格.wav' },
      { hanzi: '看起来', pinyin: 'kàn qǐ lái', meaning: 'avoir l\'air', meaningEn: 'look / seem', audio: 'audio/hsk3/hsk3_看起来.wav' }
    ]
  },
  {
    id: 'b12-narr-portrait-char',
    title: 'Adjectifs de caractère',
    titleEn: 'Character adjectives',
    body:
      'Le caractère se dit en deux caractères chinois la plupart du temps, toujours avec 很 ou un intensificateur. Structure : 他性格很 + adj. Les plus utilisés :\n' +
      '- 开朗 (ouvert / joyeux), 幽默 (humoristique), 大方 (généreux)\n' +
      '- 内向 (introverti), 害羞 (timide)\n' +
      '- 认真 (sérieux), 耐心 (patient)\n' +
      '\n' +
      'Astuce : pour nuancer — **比较** + adj (plutôt...), **特别** + adj (particulièrement...), **有点儿** + adj (un peu..., souvent négatif).',
    bodyEn:
      'Character traits are usually expressed with a 2-character word, always with 很 or an intensifier. The most used: 开朗 (outgoing), 内向 (introverted), 幽默 (humorous), 认真 (serious), 耐心 (patient), 大方 (generous), 害羞 (shy). Structure: 他性格很 + adj. To nuance: 比较 + adj (rather...), 特别 + adj (especially...), 有点儿 + adj (a bit... — often negative).',
    items: [
      { hanzi: '开朗', pinyin: 'kāi lǎng', meaning: 'ouvert, joyeux', meaningEn: 'outgoing, cheerful', audio: 'audio/hsk5/hsk5_开朗.wav' },
      { hanzi: '内向', pinyin: 'nèi xiàng', meaning: 'introverti', meaningEn: 'introverted', audio: 'audio/hsk5/hsk5_内向.wav' },
      { hanzi: '幽默', pinyin: 'yōu mò', meaning: 'humoristique', meaningEn: 'humorous', audio: 'audio/hsk4/hsk4_幽默.wav' },
      { hanzi: '认真', pinyin: 'rèn zhēn', meaning: 'sérieux', meaningEn: 'serious, diligent', audio: 'audio/hsk3/hsk3_认真.wav' },
      { hanzi: '耐心', pinyin: 'nài xīn', meaning: 'patient', meaningEn: 'patient', audio: 'audio/hsk4/hsk4_耐心.wav' },
      { hanzi: '害羞', pinyin: 'hài xiū', meaning: 'timide', meaningEn: 'shy', audio: 'audio/hsk5/hsk5_害羞.wav' }
    ],
    tip:
      'Évite de mettre 很 avec un adjectif redoublé : 高高的 ✓, 很高高的 ✗. Le redoublement FAIT le rôle de l\'intensificateur.',
    tipEn:
      'Don\'t combine 很 with a reduplicated adjective: 高高的 ✓, 很高高的 ✗. Reduplication ALREADY does the intensifying.'
  }
];

// --- cecr-b12-narr-m5 — Décrire un lieu & une ambiance --------------------
export const b12NarrSceneLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b12-narr-scene-frame',
    title: 'Cadrer : 在 + lieu + 有 + X',
    titleEn: 'Frame: 在 + place + 有 + X',
    body:
      'Pour planter un décor, le chinois adore la structure **在 + lieu + 有 + X** :\n' +
      '- 在公园里，有很多老人 (dans le parc, il y a beaucoup de personnes âgées)\n' +
      '- 在桌子上，有一杯茶 (sur la table, une tasse de thé)\n' +
      '\n' +
      'Astuce : les positions relatives se placent **après** le nom avec 的 optionnel — 桌子(的)旁边 (à côté de la table), 银行(的)对面 (en face de la banque). Six positions de base à mémoriser : 前面, 后面, 左边, 右边, 旁边, 中间.',
    bodyEn:
      'To set a scene, Chinese loves 在 + place + 有 + X. 在公园里, 有很多老人 (in the park, many elderly people). 在桌子上, 有一杯茶 (on the table, a cup of tea). Relative positions come AFTER the noun with optional 的: 桌子(的)旁边 (next to the table), 银行(的)对面 (across from the bank). 6 basic positions to memorize: 前面, 后面, 左边, 右边, 旁边, 中间.',
    items: [
      { hanzi: '前面', pinyin: 'qián miàn', meaning: 'devant', meaningEn: 'in front', audio: 'audio/hsk2/hsk2_前面.wav' },
      { hanzi: '后面', pinyin: 'hòu miàn', meaning: 'derrière', meaningEn: 'behind', audio: 'audio/hsk2/hsk2_后面.wav' },
      { hanzi: '左边', pinyin: 'zuǒ biān', meaning: 'à gauche', meaningEn: 'on the left', audio: 'audio/hsk2/hsk2_左边.wav' },
      { hanzi: '右边', pinyin: 'yòu biān', meaning: 'à droite', meaningEn: 'on the right', audio: 'audio/hsk2/hsk2_右边.wav' },
      { hanzi: '旁边', pinyin: 'páng biān', meaning: 'à côté', meaningEn: 'next to', audio: 'audio/hsk2/hsk2_旁边.wav' },
      { hanzi: '中间', pinyin: 'zhōng jiān', meaning: 'au milieu', meaningEn: 'in the middle', audio: 'audio/hsk3/hsk3_中间.wav' }
    ]
  },
  {
    id: 'b12-narr-scene-atmos',
    title: 'Qualifier l\'ambiance & enrichir les sens',
    titleEn: 'Qualify the mood & engage the senses',
    body:
      'Pour qualifier l\'atmosphère, cinq mots-clés :\n' +
      '- 安静 (calme), 舒服 (confortable)\n' +
      '- 热闹 (animé) — **positif** en Chine, contrairement au français\n' +
      '- 拥挤 (bondé)\n' +
      '- 气氛很好 (bonne ambiance)\n' +
      '\n' +
      'Attention : pour les sens, le chinois utilise 听到 et 闻到 — le **到** marque la perception **réussie**. 我听到鸟叫 (j\'entends les oiseaux chanter) ≠ 我听 (j\'écoute). 闻到花香 = je sens l\'odeur des fleurs.',
    bodyEn:
      'To qualify mood: 安静 (quiet), 热闹 (lively — positive in China, unlike English connotation), 拥挤 (crowded), 舒服 (comfortable), 气氛很好 (good atmosphere). For the senses, Chinese uses 听到 and 闻到 — the 到 is crucial as it marks SUCCESSFUL perception. 我听到鸟叫 (I hear the birds sing) ≠ 我听 (I listen). 闻到花香 (I smell the flowers).',
    items: [
      { hanzi: '安静', pinyin: 'ān jìng', meaning: 'calme', meaningEn: 'quiet', audio: 'audio/hsk3/hsk3_安静.wav' },
      { hanzi: '热闹', pinyin: 'rè nao', meaning: 'animé', meaningEn: 'lively', audio: 'audio/hsk4/hsk4_热闹.wav' },
      { hanzi: '拥挤', pinyin: 'yōng jǐ', meaning: 'bondé', meaningEn: 'crowded', audio: 'audio/hsk5/hsk5_拥挤.wav' },
      { hanzi: '气氛', pinyin: 'qì fēn', meaning: 'ambiance', meaningEn: 'atmosphere', audio: 'audio/hsk4/hsk4_气氛.wav' },
      { hanzi: '听到', pinyin: 'tīng dào', meaning: 'entendre (perçu)', meaningEn: 'hear (perceived)', audio: 'audio/hsk2/hsk2_到.wav' },
      { hanzi: '闻到', pinyin: 'wén dào', meaning: 'sentir (odeur)', meaningEn: 'smell (perceived)', audio: 'audio/hsk4/hsk4_闻.wav' }
    ],
    tip:
      '热闹 n\'est pas péjoratif en chinois. Un restaurant 热闹 = un bon restaurant plein de vie. Dire 这家店很热闹 est un compliment, pas une plainte.',
    tipEn:
      '热闹 isn\'t pejorative in Chinese. A 热闹 restaurant = a lively, popular place. Saying 这家店很热闹 is a compliment, not a complaint.'
  }
];

// ═════════════════════════════════════════════════════════════════════════════
// Éducation & société (cecr-b12-education-society)
// ═════════════════════════════════════════════════════════════════════════════

// --- cecr-b12-edu-m1 — Parcours scolaire chinois --------------------------
export const b12EduSchoolLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b12-edu-stages',
    title: '9 ans d\'obligation + le 高考',
    titleEn: '9 compulsory years + the 高考',
    body:
      'Le système scolaire chinois, de bas en haut :\n' +
      '- 幼儿园 (maternelle, 3-6 ans)\n' +
      '- 小学 (primaire, 6 ans), 初中 (collège, 3 ans) — ces 9 années forment la scolarité **obligatoire**\n' +
      '- 高中 (lycée, 3 ans), couronné par le 高考 (gāokǎo), l\'examen d\'entrée à l\'université\n' +
      '- 大学 avec ses cycles : 本科 (licence, 4 ans), 研究生 (master), 博士 (doctorat)\n' +
      '\n' +
      'Remarque : le 高考 est un examen titanesque — tous les élèves du pays le passent le même jour, et son score décide à la fois de l\'université et souvent de toute la carrière.',
    bodyEn:
      'Chinese school system, bottom up: 幼儿园 (kindergarten, 3-6 y), 小学 (primary, 6 y), 初中 (middle school, 3 y) — these 9 years form the compulsory years. Then 高中 (high school, 3 y), crowned by the 高考 (gāokǎo), the university entrance exam. A titanic exam: every student takes it on the same day, and the score decides both the university AND the whole career. Universities: 大学, with cycles 本科 (bachelor, 4 y), 研究生 (master), 博士 (PhD).',
    items: [
      { hanzi: '幼儿园', pinyin: 'yòu ér yuán', meaning: 'maternelle', meaningEn: 'kindergarten', audio: 'audio/hsk4/hsk4_幼儿园.wav' },
      { hanzi: '小学', pinyin: 'xiǎo xué', meaning: 'école primaire', meaningEn: 'primary school', audio: 'audio/hsk3/hsk3_小学.wav' },
      { hanzi: '初中', pinyin: 'chū zhōng', meaning: 'collège', meaningEn: 'middle school', audio: 'audio/hsk4/hsk4_初中.wav' },
      { hanzi: '高中', pinyin: 'gāo zhōng', meaning: 'lycée', meaningEn: 'high school', audio: 'audio/hsk4/hsk4_高中.wav' },
      { hanzi: '大学', pinyin: 'dà xué', meaning: 'université', meaningEn: 'university', audio: 'audio/hsk2/hsk2_大学.wav' },
      { hanzi: '高考', pinyin: 'gāo kǎo', meaning: 'examen d\'entrée à l\'uni', meaningEn: 'college entrance exam', audio: 'audio/hsk4/hsk4_高考.wav' },
      { hanzi: '本科', pinyin: 'běn kē', meaning: 'licence', meaningEn: 'bachelor\'s', audio: 'audio/hsk5/hsk5_本科.wav' },
      { hanzi: '研究生', pinyin: 'yán jiū shēng', meaning: 'étudiant en master', meaningEn: 'grad student', audio: 'audio/hsk4/hsk4_研究生.wav' }
    ],
    tip:
      '清华 (qīnghuá) et 北大 (Běi dà, abrev. de 北京大学) sont LES deux universités au sommet. Dire « 清北 » regroupe les deux — équivalent d\'« Oxbridge » en GB.',
    tipEn:
      '清华 (qīnghuá) and 北大 (Běi dà, short for 北京大学) are THE top two universities. Saying «清北» refers to both — the Chinese «Oxbridge».'
  }
];

// --- cecr-b12-edu-m2 — Apprendre & étudier --------------------------------
export const b12EduStudyLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b12-edu-study-xue',
    title: '学 (oral) vs 学习 (formel)',
    titleEn: '学 (oral) vs 学习 (formal)',
    body:
      'Deux verbes pour « apprendre / étudier » :\n' +
      '- 学 (xué, monosyllabe) — plus **oral**, accepte un COD précis : 学中文, 学开车, 学数学\n' +
      '- 学习 (xuéxí, dissyllabe) — plus **écrit**, plus formel, plus abstrait : 努力学习 (étudier dur), 学习经验 (tirer des enseignements)\n' +
      '\n' +
      'Astuce : autour d\'eux, le vocabulaire scolaire — 复习 (réviser), 预习 (préparer avant le cours), 练习 (s\'exercer), 做作业 (faire les devoirs), 背 (apprendre par cœur).',
    bodyEn:
      'Two verbs for «learn/study». 学 (xué, monosyllabic): more oral, takes a precise object. 学中文, 学开车, 学数学. 学习 (xué xí, bisyllabic): more written, more formal, more abstract. 努力学习 (study hard), 学习经验 (draw lessons). Around them, school vocabulary: 复习 (review), 预习 (prep before class), 练习 (practice), 做作业 (do homework), 背 (memorize).',
    items: [
      { hanzi: '学', pinyin: 'xué', meaning: 'apprendre', meaningEn: 'learn', audio: 'audio/hsk1/hsk1_学.wav' },
      { hanzi: '学习', pinyin: 'xué xí', meaning: 'étudier (formel)', meaningEn: 'study (formal)', audio: 'audio/hsk1/hsk1_学习.wav' },
      { hanzi: '复习', pinyin: 'fù xí', meaning: 'réviser', meaningEn: 'review', audio: 'audio/hsk3/hsk3_复习.wav' },
      { hanzi: '预习', pinyin: 'yù xí', meaning: 'préparer la leçon', meaningEn: 'prep before class', audio: 'audio/hsk4/hsk4_预习.wav' },
      { hanzi: '练习', pinyin: 'liàn xí', meaning: 'pratiquer', meaningEn: 'practice', audio: 'audio/hsk3/hsk3_练习.wav' },
      { hanzi: '作业', pinyin: 'zuò yè', meaning: 'devoirs', meaningEn: 'homework', audio: 'audio/hsk3/hsk3_作业.wav' },
      { hanzi: '考试', pinyin: 'kǎo shì', meaning: 'examen', meaningEn: 'exam', audio: 'audio/hsk2/hsk2_考试.wav' },
      { hanzi: '加油', pinyin: 'jiā yóu', meaning: 'bon courage !', meaningEn: 'keep going!', audio: 'audio/hsk3/hsk3_加油.wav' }
    ],
    tip:
      '加油 littéralement « ajouter de l\'huile » — LE mot d\'encouragement incontournable. S\'utilise avant un examen, un match, une montée... partout où on dirait « allez ! » en français.',
    tipEn:
      '加油 literally «add oil» — THE essential encouragement word. Used before exams, games, tough climbs... anywhere you\'d say «come on!» or «let\'s go!».'
  }
];

// --- cecr-b12-edu-m3 — Apprendre le chinois --------------------------------
export const b12EduChineseLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b12-edu-chi-meta',
    title: 'Parler de sa progression en chinois',
    titleEn: 'Talking about your Chinese progress',
    body:
      'Vocabulaire méta pour parler du chinois :\n' +
      '- mots de base : 汉字 (caractère), 拼音 (transcription), 声调 (ton), 笔画 (trait), 部首 (clé / radical)\n' +
      '- les 4 compétences : 听, 说, 读, 写\n' +
      '- décrire son niveau : 我学了三年 (j\'étudie depuis 3 ans), 我能看懂简单的文章 (je comprends des textes simples), 我的发音还不太准 (ma prononciation n\'est pas encore précise)\n' +
      '\n' +
      'Astuce : phrases utiles en classe — 请再说一遍 (répétez svp), 慢一点 (plus lentement), 这个字怎么写 ? (comment écrit-on ce caractère ?).',
    bodyEn:
      'Meta vocabulary for talking ABOUT Chinese. 汉字 (character), 拼音 (transcription), 声调 (tone), 笔画 (stroke), 部首 (radical). The 4 skills: 听, 说, 读, 写. Describe your level: 我学了三年 (I\'ve studied for 3 years), 我能看懂简单的文章 (I can read simple texts), 我的发音还不太准 (my pronunciation isn\'t yet precise). Useful phrases: 请再说一遍 (please say it again), 慢一点 (slower), 这个字怎么写? (how do you write this character?).',
    items: [
      { hanzi: '汉字', pinyin: 'hàn zì', meaning: 'caractère chinois', meaningEn: 'Chinese character', audio: 'audio/hsk2/hsk2_汉字.wav' },
      { hanzi: '拼音', pinyin: 'pīn yīn', meaning: 'pinyin', meaningEn: 'pinyin', audio: 'audio/hsk4/hsk4_拼音.wav' },
      { hanzi: '声调', pinyin: 'shēng diào', meaning: 'ton', meaningEn: 'tone', audio: 'audio/hsk5/hsk5_声调.wav' },
      { hanzi: '发音', pinyin: 'fā yīn', meaning: 'prononciation', meaningEn: 'pronunciation', audio: 'audio/hsk4/hsk4_发音.wav' },
      { hanzi: '听', pinyin: 'tīng', meaning: 'écouter', meaningEn: 'listen', audio: 'audio/hsk1/hsk1_听.wav' },
      { hanzi: '说', pinyin: 'shuō', meaning: 'parler', meaningEn: 'speak', audio: 'audio/hsk1/hsk1_说.wav' },
      { hanzi: '读', pinyin: 'dú', meaning: 'lire', meaningEn: 'read', audio: 'audio/hsk1/hsk1_读.wav' },
      { hanzi: '写', pinyin: 'xiě', meaning: 'écrire', meaningEn: 'write', audio: 'audio/hsk1/hsk1_写.wav' }
    ],
    tip:
      'Face au compliment « 你的中文真好 ! », la réponse attendue est l\'humilité : 哪里哪里 (« mais non, mais non ») ou 还差得远 (« je suis encore loin »). Accepter plat un compliment est gênant en Chine.',
    tipEn:
      'Faced with the compliment «你的中文真好!», the expected reply is humble: 哪里哪里 («not at all») or 还差得远 («I\'m still far from fluent»). Accepting a compliment flatly is awkward in China.'
  }
];

// --- cecr-b12-soc-m1 — La famille élargie ----------------------------------
export const b12SocFamilyLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b12-soc-family-sides',
    title: '外 = côté mère, rien = côté père',
    titleEn: '外 = mother\'s side, nothing = father\'s side',
    body:
      'Le chinois trie les parents par côté. Le préfixe **外** (wài, « extérieur ») marque systématiquement le côté **mère** — écho d\'un ancien patriarcat où la fille « partait » dans sa belle-famille.\n' +
      '- grands-parents : 爷爷 / 奶奶 (côté père) vs 外公 / 外婆 (côté mère)\n' +
      '- oncles côté père : 叔叔 (frère cadet), 伯伯 (frère aîné), 姑姑 (sœur du père)\n' +
      '- oncles côté mère : 舅舅 (frère), 姨妈 (sœur)\n' +
      '- cousins : préfixe **堂** côté père, préfixe **表** côté mère\n' +
      '\n' +
      'Remarque : avec la génération enfant unique, ces termes sont devenus plus techniques que pratiques pour les jeunes, mais restent indispensables à la lecture.',
    bodyEn:
      'Chinese sorts relatives by side. The prefix 外 (wài, «outer») always marks mother\'s side — echo of an old patriarchy where the daughter «left» for her in-laws. Grandparents: 爷爷/奶奶 (father\'s father, mother) vs 外公/外婆 (mother\'s father, mother). Uncles/aunts: 叔叔 (dad\'s younger brother), 伯伯 (dad\'s older brother), 姑姑 (dad\'s sister); 舅舅 (mom\'s brother), 姨妈 (mom\'s sister). Cousins: 堂 (dad\'s side), 表 (mom\'s side).',
    items: [
      { hanzi: '爷爷', pinyin: 'yé ye', meaning: 'grand-père paternel', meaningEn: 'paternal grandpa', audio: 'audio/hsk3/hsk3_爷爷.wav' },
      { hanzi: '奶奶', pinyin: 'nǎi nai', meaning: 'grand-mère paternelle', meaningEn: 'paternal grandma', audio: 'audio/hsk3/hsk3_奶奶.wav' },
      { hanzi: '外公', pinyin: 'wài gōng', meaning: 'grand-père maternel', meaningEn: 'maternal grandpa', audio: 'audio/hsk5/hsk5_外公.wav' },
      { hanzi: '外婆', pinyin: 'wài pó', meaning: 'grand-mère maternelle', meaningEn: 'maternal grandma', audio: 'audio/hsk5/hsk5_外婆.wav' },
      { hanzi: '叔叔', pinyin: 'shū shu', meaning: 'oncle (cadet du père)', meaningEn: 'uncle (dad\'s younger bro)', audio: 'audio/hsk3/hsk3_叔叔.wav' },
      { hanzi: '姑姑', pinyin: 'gū gu', meaning: 'tante paternelle', meaningEn: 'paternal aunt', audio: 'audio/hsk4/hsk4_姑姑.wav' },
      { hanzi: '舅舅', pinyin: 'jiù jiu', meaning: 'oncle maternel', meaningEn: 'maternal uncle', audio: 'audio/hsk5/hsk5_舅舅.wav' },
      { hanzi: '姨妈', pinyin: 'yí mā', meaning: 'tante maternelle', meaningEn: 'maternal aunt', audio: 'audio/hsk5/hsk5_姨妈.wav' }
    ],
    tip:
      'Avec la génération enfant unique (1980-2015), ces termes sont devenus plus techniques que pratiques pour les jeunes Chinois — mais restent indispensables pour lire un roman ou une biographie.',
    tipEn:
      'With the one-child generation (1980-2015), these terms grew more technical than practical for young Chinese — but remain essential for reading a novel or biography.'
  }
];

// --- cecr-b12-soc-m2 — Mariage & famille moderne --------------------------
export const b12SocMarriageLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b12-soc-marriage-steps',
    title: 'Les 5 étapes : 谈恋爱 → 领证 → 婚礼',
    titleEn: 'The 5 steps: 谈恋爱 → 领证 → 婚礼',
    body:
      'Mariage = 结婚 (jiéhūn), verbe **sécable** — 结了婚 (s\'est marié), 结三次婚 (s\'être marié 3 fois). Le parcours type :\n' +
      '- 谈恋爱 (sortir ensemble) → 订婚 (se fiancer)\n' +
      '- 领证 (aller chercher le certificat — c\'est le **vrai** mariage légal en Chine)\n' +
      '- 婚礼 (cérémonie, parfois des mois après) → 度蜜月 (lune de miel)\n' +
      '- divorce : 离婚 (líhūn)\n' +
      '\n' +
      'Remarque : politique de l\'enfant — 一孩政策 (1980-2015), 二孩政策 (2016-21), 三孩政策 (depuis 2021).',
    bodyEn:
      'Marriage = 结婚 (jiéhūn), separable verb: 结了婚 (got married), 结三次婚 (got married 3 times). Typical path: 谈恋爱 (dating) → 订婚 (engagement) → 领证 (get the certificate — that\'s the REAL legal marriage in China) → 婚礼 (ceremony, sometimes months later) → 度蜜月 (honeymoon). Divorce: 离婚 (líhūn). Child policy: 一孩政策 (1980-2015), 二孩政策 (2016-21), 三孩政策 (since 2021).',
    items: [
      { hanzi: '结婚', pinyin: 'jié hūn', meaning: 'se marier', meaningEn: 'get married', audio: 'audio/hsk3/hsk3_结婚.wav' },
      { hanzi: '离婚', pinyin: 'lí hūn', meaning: 'divorcer', meaningEn: 'divorce', audio: 'audio/hsk5/hsk5_离婚.wav' },
      { hanzi: '谈恋爱', pinyin: 'tán liàn ài', meaning: 'être en couple', meaningEn: 'be dating', audio: 'audio/hsk4/hsk4_谈恋爱.wav' },
      { hanzi: '订婚', pinyin: 'dìng hūn', meaning: 'se fiancer', meaningEn: 'get engaged', audio: 'audio/hsk5/hsk5_订婚.wav' },
      { hanzi: '领证', pinyin: 'lǐng zhèng', meaning: 'retirer le certificat', meaningEn: 'get marriage cert', audio: 'audio/hsk5/hsk5_领证.wav' },
      { hanzi: '婚礼', pinyin: 'hūn lǐ', meaning: 'cérémonie de mariage', meaningEn: 'wedding ceremony', audio: 'audio/hsk4/hsk4_婚礼.wav' },
      { hanzi: '孩子', pinyin: 'hái zi', meaning: 'enfant', meaningEn: 'child', audio: 'audio/hsk2/hsk2_孩子.wav' }
    ],
    tip:
      'Verbes sécables comme 结婚, 见面, 洗澡 : on insère entre les deux caractères. 结了婚 ✓, 结婚了 (sens différent, plus factuel), 结三年婚 (marié depuis 3 ans).',
    tipEn:
      'Separable verbs like 结婚, 见面, 洗澡: you insert between the two characters. 结了婚 ✓, 结婚了 (different meaning, more factual), 结三年婚 (married for 3 years).'
  }
];

// --- cecr-b12-soc-m3 — Générations 80后/90后/00后 --------------------------
export const b12SocGenerationsLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b12-soc-gen-decades',
    title: 'Lire la société par la décennie',
    titleEn: 'Reading society through birth decades',
    body:
      'En Chine, on étiquette abondamment par décennie de naissance : 80后 (bālínghòu, nés dans les 80), 90后, 00后 (línglínghòu). Chaque génération porte ses clichés :\n' +
      '- 80后 : première génération enfant-unique, bosseurs, premiers à acheter leur appart\n' +
      '- 90后 : digital natives, souvent critiqués comme « gâtés » mais plutôt plus ouverts\n' +
      '- 00后 : Z chinoise, TikTok (抖音), socialement plus libérale\n' +
      '\n' +
      'Astuce : trois expressions incontournables pour suivre le débat — **躺平** (s\'allonger à plat, refus du surmenage), **内卷** (compétition absurde), **打工人** (le travailleur, auto-dérision).',
    bodyEn:
      'In China, people heavily label by birth decade. 80后 (bā líng hòu, born in the 80s), 90后, 00后 (líng líng hòu). Each generation carries its clichés: 80后 = first one-child gen, hardworkers, first to buy apartments. 90后 = digital natives, often labeled «spoiled» but actually more open. 00后 = Chinese Z, TikTok (抖音), socially more liberal. Must-know expressions: 躺平 (lie flat, rejection of overwork), 内卷 (absurd competition), 打工人 (the worker, self-mockery).',
    items: [
      { hanzi: '年轻人', pinyin: 'nián qīng rén', meaning: 'les jeunes', meaningEn: 'young people', audio: 'audio/hsk3/hsk3_年轻.wav' },
      { hanzi: '一代', pinyin: 'yí dài', meaning: 'une génération', meaningEn: 'a generation', audio: 'audio/hsk5/hsk5_一代.wav' },
      { hanzi: '躺平', pinyin: 'tǎng píng', meaning: 's\'allonger à plat', meaningEn: 'lie flat', audio: 'audio/hsk6/hsk6_躺平.wav' },
      { hanzi: '内卷', pinyin: 'nèi juǎn', meaning: 'involution, compétition absurde', meaningEn: 'involution', audio: 'audio/hsk6/hsk6_内卷.wav' },
      { hanzi: '打工人', pinyin: 'dǎ gōng rén', meaning: 'le travailleur', meaningEn: 'the worker', audio: 'audio/hsk5/hsk5_打工.wav' },
      { hanzi: '抖音', pinyin: 'dǒu yīn', meaning: 'TikTok chinois', meaningEn: 'Douyin', audio: 'audio/hsk5/hsk5_抖音.wav' },
      { hanzi: '佛系', pinyin: 'fó xì', meaning: 'style bouddhiste, détaché', meaningEn: 'Buddha-style, chill', audio: 'audio/hsk6/hsk6_佛系.wav' }
    ],
    tip:
      '躺平 et 内卷 sont les deux faces d\'un même constat. 内卷 = le piège (compétition absurde), 躺平 = la sortie (refus). Comprendre ces deux mots, c\'est lire 70 % du discours des jeunes sur le travail.',
    tipEn:
      '躺平 and 内卷 are two sides of the same coin. 内卷 = the trap (absurd competition), 躺平 = the exit (refusal). Grasp these two words and you read 70% of young people\'s talk about work.'
  }
];

// --- cecr-b12-soc-m4 — Premier emploi & marché du travail -----------------
export const b12SocJobMarketLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b12-soc-job-vocab',
    title: '求职 : les 8 mots indispensables',
    titleEn: '求职: the 8 essential words',
    body:
      'Chercher un emploi = 求职 (qiúzhí). Le parcours candidat en quatre étapes :\n' +
      '- rédiger un 简历 (CV) ; passer un 面试 (entretien)\n' +
      '- espérer être 录取 (pris) ; négocier le 工资 (salaire)\n' +
      '- choisir son secteur : 国企 (public, stable, moins payé), 外企 (étranger, bien payé, exigeant), 私企 (privé, variable), 创业 (créer sa boîte)\n' +
      '\n' +
      'Astuce : côté employeur, les **五险一金** (5 assurances + 1 fonds logement) sont des cotisations sociales obligatoires — un bon indicateur de sérieux.',
    bodyEn:
      'Job hunt = 求职 (qiúzhí). The path: draft a 简历 (CV), take a 面试 (interview), hope to be 录取 (hired), negotiate the 工资 (salary). From the employer\'s side: 五险一金 (5 insurances + 1 housing fund) are mandatory social contributions — a seriousness indicator. Pick your sector: 国企 (state-owned, stable, lower pay), 外企 (foreign, well-paid, demanding), 私企 (private, variable), 创业 (start your own).',
    items: [
      { hanzi: '求职', pinyin: 'qiú zhí', meaning: 'chercher un emploi', meaningEn: 'job hunt', audio: 'audio/hsk5/hsk5_求职.wav' },
      { hanzi: '简历', pinyin: 'jiǎn lì', meaning: 'CV', meaningEn: 'résumé', audio: 'audio/hsk5/hsk5_简历.wav' },
      { hanzi: '面试', pinyin: 'miàn shì', meaning: 'entretien', meaningEn: 'interview', audio: 'audio/hsk4/hsk4_面试.wav' },
      { hanzi: '录取', pinyin: 'lù qǔ', meaning: 'être pris', meaningEn: 'be hired/admitted', audio: 'audio/hsk5/hsk5_录取.wav' },
      { hanzi: '工资', pinyin: 'gōng zī', meaning: 'salaire', meaningEn: 'salary', audio: 'audio/hsk4/hsk4_工资.wav' },
      { hanzi: '国企', pinyin: 'guó qǐ', meaning: 'entreprise d\'État', meaningEn: 'state-owned co.', audio: 'audio/hsk6/hsk6_国企.wav' },
      { hanzi: '外企', pinyin: 'wài qǐ', meaning: 'entreprise étrangère', meaningEn: 'foreign company', audio: 'audio/hsk6/hsk6_外企.wav' },
      { hanzi: '创业', pinyin: 'chuàng yè', meaning: 'créer sa boîte', meaningEn: 'start a business', audio: 'audio/hsk5/hsk5_创业.wav' }
    ],
    tip:
      '996 (9h-21h, 6 j/7) et 007 (24h/24, 7 j/7) sont devenus des critiques. « 我不想996 » = « je refuse le surmenage ». Les grands groupes tech ont reculé face à la pression sociale post-2022.',
    tipEn:
      '996 (9am-9pm, 6 days/week) and 007 (round the clock, every day) became critiques. «我不想996» = «I refuse overwork culture». Big tech groups eased up under social pressure post-2022.'
  }
];

// ═════════════════════════════════════════════════════════════════════════════
// Médias & actualité (cecr-b12-media)
// ═════════════════════════════════════════════════════════════════════════════

// --- cecr-b12-med-m1 — Vocabulaire de la presse ---------------------------
export const b12MedPressLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b12-med-press-types',
    title: 'Types d\'articles & médias',
    titleEn: 'Article types & media',
    body:
      'Le paysage médiatique chinois s\'organise autour de trois familles de mots à connaître.\n' +
      '\n' +
      'Types d\'articles :\n' +
      '- 头条 (tóutiáo) : la Une\n' +
      '- 报道 (bàodào) : reportage\n' +
      '- 评论 (pínglùn) : édito / commentaire\n' +
      '- 专访 (zhuānfǎng) : entretien exclusif\n' +
      '- 社论 (shèlùn) : éditorial institutionnel\n' +
      '\n' +
      'Supports : 报纸 (journal papier), 电视 (TV), 广播 (radio), 网站 (site web), 公众号 (**compte officiel WeChat**, équivalent blog/newsletter).\n' +
      '\n' +
      'Remarque : côté acteurs, retiens 记者 (journaliste), 编辑 (éditeur) et 主持人 (animateur).',
    bodyEn:
      'Articles: 头条 (tóu tiáo, front page), 报道 (bào dào, report), 评论 (píng lùn, op-ed), 专访 (zhuān fǎng, exclusive interview), 社论 (shè lùn, editorial). Media: 报纸 (paper), 电视 (TV), 广播 (radio), 网站 (website), 公众号 (official WeChat account, like a blog/newsletter). People: 记者 (jì zhě, journalist), 编辑 (biān jí, editor), 主持人 (zhǔ chí rén, host).',
    items: [
      { hanzi: '新闻', pinyin: 'xīn wén', meaning: 'actualités', meaningEn: 'news', audio: 'audio/hsk3/hsk3_新闻.wav' },
      { hanzi: '头条', pinyin: 'tóu tiáo', meaning: 'Une, titre', meaningEn: 'headline', audio: 'audio/hsk5/hsk5_头条.wav' },
      { hanzi: '报道', pinyin: 'bào dào', meaning: 'reportage', meaningEn: 'report', audio: 'audio/hsk4/hsk4_报道.wav' },
      { hanzi: '评论', pinyin: 'píng lùn', meaning: 'commentaire', meaningEn: 'comment', audio: 'audio/hsk4/hsk4_评论.wav' },
      { hanzi: '报纸', pinyin: 'bào zhǐ', meaning: 'journal', meaningEn: 'newspaper', audio: 'audio/hsk2/hsk2_报纸.wav' },
      { hanzi: '记者', pinyin: 'jì zhě', meaning: 'journaliste', meaningEn: 'journalist', audio: 'audio/hsk4/hsk4_记者.wav' },
      { hanzi: '编辑', pinyin: 'biān jí', meaning: 'éditeur', meaningEn: 'editor', audio: 'audio/hsk5/hsk5_编辑.wav' },
      { hanzi: '公众号', pinyin: 'gōng zhòng hào', meaning: 'compte WeChat officiel', meaningEn: 'WeChat official account', audio: 'audio/hsk6/hsk6_公众号.wav' }
    ],
    tip:
      'En Chine, le 公众号 WeChat est plus important que Twitter ou Facebook pour suivre les médias sérieux. Les journalistes y publient leurs scoops. S\'abonner = 关注 (guānzhù).',
    tipEn:
      'In China, WeChat 公众号 is bigger than Twitter or Facebook for following serious media. Journalists post scoops there. Subscribe = 关注 (guānzhù).'
  }
];

// --- cecr-b12-med-m2 — Lire un titre d'actualité --------------------------
export const b12MedHeadlineLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b12-med-headline-style',
    title: 'Titres compressés : omettre les particules',
    titleEn: 'Compressed headlines: drop the particles',
    body:
      'Un titre chinois compresse au maximum : il vire les particules (的, 了, 呢), coupe les sujets évidents et reste **au présent**.\n' +
      '\n' +
      'Exemples de décodage :\n' +
      '- 北京重霾 今停课 : à Pékin, forte pollution, cours suspendus aujourd\'hui\n' +
      '- 美国加息 人民币跌 : USA, hausse des taux, le yuan baisse\n' +
      '\n' +
      'Abréviations courantes : 央视 = 中央电视台 (CCTV), 北大 = 北京大学, 清华 = 清华大学, 美联储 = la **Fed**.\n' +
      '\n' +
      'Attention aux chiffres : 万 (10 000) et 亿 (100 millions). 十亿 = 1 milliard.',
    bodyEn:
      'A Chinese headline strips particles (的, 了, 呢), omits obvious subjects, stays in the present. Decoded: 北京重霾 今停课 = «Beijing, heavy smog, school cancelled today». 美国加息 人民币跌 = «USA, rate hike, yuan falls». Common abbreviations: 央视 = 中央电视台 (CCTV), 北大 = 北京大学, 清华 = 清华大学, 美联储 = the Fed. Numbers: 万 (10 000), 亿 (100 million). 十亿 = 1 billion.',
    items: [
      { hanzi: '头条', pinyin: 'tóu tiáo', meaning: 'titre / Une', meaningEn: 'headline', audio: 'audio/hsk5/hsk5_头条.wav' },
      { hanzi: '央视', pinyin: 'yāng shì', meaning: 'CCTV', meaningEn: 'CCTV', audio: 'audio/hsk6/hsk6_央视.wav' },
      { hanzi: '万', pinyin: 'wàn', meaning: '10 000', meaningEn: '10,000', audio: 'audio/hsk3/hsk3_万.wav' },
      { hanzi: '亿', pinyin: 'yì', meaning: '100 millions', meaningEn: '100 million', audio: 'audio/hsk5/hsk5_亿.wav' },
      { hanzi: '政府', pinyin: 'zhèng fǔ', meaning: 'gouvernement', meaningEn: 'government', audio: 'audio/hsk5/hsk5_政府.wav' },
      { hanzi: '政策', pinyin: 'zhèng cè', meaning: 'politique (policy)', meaningEn: 'policy', audio: 'audio/hsk5/hsk5_政策.wav' },
      { hanzi: '主席', pinyin: 'zhǔ xí', meaning: 'président', meaningEn: 'president', audio: 'audio/hsk5/hsk5_主席.wav' },
      { hanzi: '两会', pinyin: 'liǎng huì', meaning: 'les Deux Sessions', meaningEn: '2 Sessions (Congress)', audio: 'audio/hsk6/hsk6_两会.wav' }
    ],
    tip:
      'Attention à 亿 : le chinois segmente par tranche de 10 000, pas par 1 000. 1 milliard = 10 亿, pas 1 亿. Une erreur fréquente pour les francophones qui lisent les chiffres chinois.',
    tipEn:
      'Watch out for 亿: Chinese segments by 10,000s, not 1,000s. 1 billion = 10 亿, not 1 亿. A common mistake for English speakers reading Chinese numbers.'
  }
];

// --- cecr-b12-med-m3 — Réseaux sociaux chinois ----------------------------
export const b12MedSocialLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b12-med-social-platforms',
    title: 'L\'écosystème 微博/抖音/小红书',
    titleEn: 'The 微博/抖音/小红书 ecosystem',
    body:
      'La Chine a ses propres plateformes : Google, Facebook, YouTube et Instagram y sont **bloqués**.\n' +
      '\n' +
      'Les équivalents clés à connaître :\n' +
      '- 微博 (wēi bó) : Weibo ≈ Twitter\n' +
      '- 抖音 (dǒu yīn) : Douyin ≈ TikTok Chine\n' +
      '- 小红书 (xiǎohóng shū) : Red Note ≈ Instagram + Pinterest\n' +
      '- 知乎 (zhī hū) : ≈ Quora\n' +
      '- 哔哩哔哩 (bīlībīlī) : Bilibili ≈ YouTube jeune\n' +
      '- 百度 (bǎidù) : ≈ Google\n' +
      '\n' +
      'Astuce : les **actions** universelles sont 关注 (suivre), 点赞 (liker), 评论 (commenter), 转发 (partager/RT).',
    bodyEn:
      'China has its own platforms — Google, Facebook, YouTube, Instagram are blocked there. Key equivalents: 微博 (Weibo ≈ Twitter), 抖音 (Douyin ≈ Chinese TikTok), 小红书 (Xiǎo hóng shū, Red Note ≈ Instagram + Pinterest), 知乎 (Zhī hū ≈ Quora), 哔哩哔哩 (Bilibili ≈ YouTube for young people), 百度 (Bǎi dù ≈ Google). Actions: 关注 (follow), 点赞 (like), 评论 (comment), 转发 (share/RT).',
    items: [
      { hanzi: '微博', pinyin: 'wēi bó', meaning: 'Weibo', meaningEn: 'Weibo', audio: 'audio/hsk5/hsk5_微博.wav' },
      { hanzi: '抖音', pinyin: 'dǒu yīn', meaning: 'Douyin (TikTok CN)', meaningEn: 'Douyin', audio: 'audio/hsk5/hsk5_抖音.wav' },
      { hanzi: '小红书', pinyin: 'xiǎo hóng shū', meaning: 'Xiaohongshu', meaningEn: 'Xiaohongshu', audio: 'audio/hsk6/hsk6_小红书.wav' },
      { hanzi: '关注', pinyin: 'guān zhù', meaning: 'suivre', meaningEn: 'follow', audio: 'audio/hsk4/hsk4_关注.wav' },
      { hanzi: '点赞', pinyin: 'diǎn zàn', meaning: 'liker', meaningEn: 'like', audio: 'audio/hsk5/hsk5_点赞.wav' },
      { hanzi: '转发', pinyin: 'zhuǎn fā', meaning: 'partager', meaningEn: 'share/RT', audio: 'audio/hsk5/hsk5_转发.wav' },
      { hanzi: '粉丝', pinyin: 'fěn sī', meaning: 'fans', meaningEn: 'fans', audio: 'audio/hsk5/hsk5_粉丝.wav' },
      { hanzi: '网红', pinyin: 'wǎng hóng', meaning: 'influenceur', meaningEn: 'web star', audio: 'audio/hsk5/hsk5_网红.wav' }
    ],
    tip:
      '翻墙 (fān qiáng, « sauter le mur ») = utiliser un VPN pour accéder aux sites bloqués. Terme familier mais juridiquement gris : ne le suggère pas à des Chinois sans contexte de confiance.',
    tipEn:
      '翻墙 (fān qiáng, «jump the wall») = use a VPN to reach blocked sites. Slang but legally gray: don\'t suggest it to Chinese speakers without a trusting context.'
  }
];

// --- cecr-b12-med-m4 — Fake news & vérification ---------------------------
export const b12MedFakeNewsLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b12-med-fake-verify',
    title: 'Vérifier : 来源, 证据, 怀疑',
    titleEn: 'Verify: 来源, 证据, 怀疑',
    body:
      '假新闻 (jiǎxīnwén, **fake news**) est un sujet central sur les réseaux chinois.\n' +
      '\n' +
      'Vocabulaire pour vérifier :\n' +
      '- 谣言 (yáoyán) : rumeur\n' +
      '- 辟谣 (pìyáo) : démentir une rumeur\n' +
      '- 真相 (zhēnxiàng) : la vérité\n' +
      '- 来源 (láiyuán) : source\n' +
      '- 证据 (zhèngjù) : preuve\n' +
      '\n' +
      'Questions à poser : 这条新闻的来源是哪里？/ 有没有证据？/ 是谁发布的？\n' +
      '\n' +
      'Astuce : pense aux verbes critiques 相信 (croire), 怀疑 (douter), 确认 (confirmer), 证实 (prouver).',
    bodyEn:
      '假新闻 (jiǎ xīn wén, fake news) is a core topic on Chinese networks. Verification vocab: 谣言 (yáo yán, rumor), 辟谣 (pì yáo, refute a rumor), 真相 (zhēn xiàng, truth), 来源 (lái yuán, source), 证据 (zhèng jù, evidence). Questions to ask: 这条新闻的来源是哪里? / 有没有证据? / 是谁发布的? Critical verbs: 相信 (believe), 怀疑 (huái yí, doubt), 确认 (què rèn, confirm), 证实 (zhèng shí, prove).',
    items: [
      { hanzi: '假新闻', pinyin: 'jiǎ xīn wén', meaning: 'fake news', meaningEn: 'fake news', audio: 'audio/hsk5/hsk5_假.wav' },
      { hanzi: '谣言', pinyin: 'yáo yán', meaning: 'rumeur', meaningEn: 'rumor', audio: 'audio/hsk6/hsk6_谣言.wav' },
      { hanzi: '辟谣', pinyin: 'pì yáo', meaning: 'démentir', meaningEn: 'debunk', audio: 'audio/hsk6/hsk6_辟谣.wav' },
      { hanzi: '真相', pinyin: 'zhēn xiàng', meaning: 'la vérité', meaningEn: 'the truth', audio: 'audio/hsk5/hsk5_真相.wav' },
      { hanzi: '来源', pinyin: 'lái yuán', meaning: 'source', meaningEn: 'source', audio: 'audio/hsk5/hsk5_来源.wav' },
      { hanzi: '证据', pinyin: 'zhèng jù', meaning: 'preuve', meaningEn: 'evidence', audio: 'audio/hsk5/hsk5_证据.wav' },
      { hanzi: '怀疑', pinyin: 'huái yí', meaning: 'douter', meaningEn: 'doubt', audio: 'audio/hsk4/hsk4_怀疑.wav' },
      { hanzi: '证实', pinyin: 'zhèng shí', meaning: 'prouver, confirmer', meaningEn: 'confirm, prove', audio: 'audio/hsk5/hsk5_证实.wav' }
    ],
    tip:
      'Le terme 标题党 (biāo tí dǎng, « secte du titre ») désigne les sites à clickbait — titres racoleurs, contenu décevant. Bon test anti-fake : si le titre promet 震惊 (choquant !), méfie-toi.',
    tipEn:
      'The term 标题党 (biāo tí dǎng, «headline cult») designates clickbait sites — flashy titles, disappointing content. Good anti-fake test: if the headline screams 震惊 (shocking!), be wary.'
  }
];

// --- cecr-b12-med-m5 — Publicité & marketing chinois -----------------------
export const b12MedAdvertisingLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b12-med-ads-vocab',
    title: 'Slogans, promotions, mots-clés',
    titleEn: 'Slogans, promotions, keywords',
    body:
      'La publicité chinoise (广告, guǎnggào) utilise des formules courtes, souvent rythmées en **4 caractères**.\n' +
      '\n' +
      'Vocabulaire essentiel :\n' +
      '- 品牌 (pǐnpái) : marque\n' +
      '- 口号 (kǒuhào) : slogan\n' +
      '- 优惠 (yōuhuì) : promotion\n' +
      '- 打折 (dǎzhé) : remise\n' +
      '- 限时 (xiàn shí) : durée limitée\n' +
      '- 免费 (miǎnfèi) : gratuit\n' +
      '\n' +
      'Grands événements commerciaux : 双十一 (11/11, **Singles\' Day**, plus gros jour shopping au monde), 618 (anniversaire JD le 18 juin), 双十二 (12/12).\n' +
      '\n' +
      'Remarque : arguments incontournables — 性价比高 (bon rapport qualité/prix, phrase-reine du commerce chinois), 限量 (édition limitée), 爆款 (produit star).',
    bodyEn:
      'Chinese ads (广告, guǎng gào) use short formulas, often in rhythmic 4-character sets. Essential vocab: 品牌 (brand), 口号 (slogan), 优惠 (promotion), 打折 (discount), 限时 (time-limited), 免费 (free). Big shopping events: 双十一 (11/11, Singles\' Day, world\'s biggest shopping day), 618 (JD\'s anniversary on June 18), 双十二 (12/12). Must-know arguments: 性价比高 (good value for money — the king phrase of Chinese commerce), 限量 (limited edition), 爆款 (hit product).',
    items: [
      { hanzi: '广告', pinyin: 'guǎng gào', meaning: 'publicité', meaningEn: 'advertisement', audio: 'audio/hsk4/hsk4_广告.wav' },
      { hanzi: '品牌', pinyin: 'pǐn pái', meaning: 'marque', meaningEn: 'brand', audio: 'audio/hsk5/hsk5_品牌.wav' },
      { hanzi: '口号', pinyin: 'kǒu hào', meaning: 'slogan', meaningEn: 'slogan', audio: 'audio/hsk5/hsk5_口号.wav' },
      { hanzi: '优惠', pinyin: 'yōu huì', meaning: 'promotion', meaningEn: 'promotion', audio: 'audio/hsk5/hsk5_优惠.wav' },
      { hanzi: '打折', pinyin: 'dǎ zhé', meaning: 'remise', meaningEn: 'discount', audio: 'audio/hsk3/hsk3_打折.wav' },
      { hanzi: '免费', pinyin: 'miǎn fèi', meaning: 'gratuit', meaningEn: 'free', audio: 'audio/hsk4/hsk4_免费.wav' },
      { hanzi: '双十一', pinyin: 'shuāng shí yī', meaning: 'Singles\' Day 11/11', meaningEn: 'Singles\' Day', audio: 'audio/hsk6/hsk6_双十一.wav' },
      { hanzi: '性价比', pinyin: 'xìng jià bǐ', meaning: 'rapport qualité/prix', meaningEn: 'value for money', audio: 'audio/hsk6/hsk6_性价比.wav' },
      { hanzi: '爆款', pinyin: 'bào kuǎn', meaning: 'produit star', meaningEn: 'hit product', audio: 'audio/hsk6/hsk6_爆款.wav' }
    ],
    tip:
      'Le 打 dans 打折 = « frapper/tailler ». 打九折 = 10 % de remise (il reste 90 %, pas 10 % !). 打八折 = 20 % de remise. Piège de lecture : les Chinois disent « on taille à 9 », pas « on enlève 1 ».',
    tipEn:
      'The 打 in 打折 = «strike/cut». 打九折 = 10% off (90% of price remains, not 10%!). 打八折 = 20% off. Reading trap: Chinese says «we cut to 9», not «we subtract 1».'
  }
];

// ═════════════════════════════════════════════════════════════════════════════
// VAGUE B1.2 — Conversation + Nuances
// ═════════════════════════════════════════════════════════════════════════════

// === CONVERSATION B1.2 =======================================================

export const b12ConvM1LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b12-critique',
    title: 'Critiquer une œuvre (livre, film, restaurant)',
    titleEn: 'Critique a work (book, film, restaurant)',
    body:
      'Pour critiquer une œuvre en chinois, structure ton propos en positif puis nuance.\n' +
      '\n' +
      'Phrases-pivot :\n' +
      '- 我觉得这本书写得很好，特别是 X (j\'ai trouvé ce livre bien écrit, surtout X)\n' +
      '- 优点是… (le **point fort** est…) / 缺点是… (le **point faible** est…)\n' +
      '- 总体来说不错，但是… (dans l\'ensemble pas mal, mais…)\n' +
      '\n' +
      'Vocabulaire-clé : 情节 (intrigue), 人物 (personnages), 节奏 (rythme), 表演 (jeu d\'acteur), 剧本 (scénario), 风格 (style).\n' +
      '\n' +
      'Astuce : phrase d\'ouverture typique — 这部电影看完让我想了很久 (ce film m\'a fait réfléchir longtemps après) — **éloge fort** en chinois.',
    bodyEn:
      'Structured positive: 我觉得这本书写得很好，特别是 X (I found this book well-written, especially X). Give points: 优点是… (the strength is…), 缺点是… (the weakness is…). Qualify: 总体来说不错，但是… (overall not bad, but…). Key vocab: 情节 (plot), 人物 (characters), 节奏 (pace), 表演 (acting), 剧本 (script), 风格 (style). Typical Chinese opening: 这部电影看完让我想了很久 = this film made me think long after — strong Chinese praise.',
    items: [
      { hanzi: '优点', pinyin: 'yōu diǎn', meaning: 'point fort', meaningEn: 'strength', audio: 'audio/hsk5/hsk5_优点.wav' },
      { hanzi: '缺点', pinyin: 'quē diǎn', meaning: 'point faible', meaningEn: 'weakness', audio: 'audio/hsk5/hsk5_缺点.wav' },
      { hanzi: '情节', pinyin: 'qíng jié', meaning: 'intrigue', meaningEn: 'plot', audio: 'audio/hsk5/hsk5_情节.wav' },
      { hanzi: '节奏', pinyin: 'jié zòu', meaning: 'rythme', meaningEn: 'pace', audio: 'audio/hsk5/hsk5_节奏.wav' },
      { hanzi: '风格', pinyin: 'fēng gé', meaning: 'style', meaningEn: 'style', audio: 'audio/hsk5/hsk5_风格.wav' }
    ],
    tip:
      'Sur 大众点评 (Dianping, le Yelp chinois) ou 豆瓣 (Douban), structure ta critique en 3 temps : note globale + points forts + points faibles. Le format est culturellement attendu.',
    tipEn:
      'On 大众点评 (Dianping, Chinese Yelp) or 豆瓣 (Douban), structure your review in 3 parts: overall rating + strengths + weaknesses. The format is culturally expected.'
  },
  {
    id: 'b12-douban-rating',
    title: 'Notation et recommandation',
    titleEn: 'Rating and recommendation',
    body:
      'Notes : 五星 (5 étoiles), 四星 (4 étoiles, bien)… Verbes-clés : 推荐 (recommander), 不推荐 (déconseiller), 值得 (valoir), 不值得 (pas valoir le coup).\n' +
      '\n' +
      'Exemples typiques :\n' +
      '- 这部电影值得一看 (ce film vaut le coup d\'être vu)\n' +
      '- 我推荐你去 (je te le recommande)\n' +
      '\n' +
      'Échelle qualité, du moins fort au plus fort :\n' +
      '- 不错 : pas mal\n' +
      '- 很好 : très bien\n' +
      '- 太棒了 : super\n' +
      '- 神作 : œuvre divine (argot fan)\n' +
      '\n' +
      'Attention : à **éviter** — 烂 (nul, vulgaire), 垃圾 (poubelle, très péjoratif). Préfère 不太理想 (pas idéal) ou 期待落空 (attentes déçues), plus poli.',
    bodyEn:
      'Ratings: 五星 (5 stars), 四星 (4 stars, good)… Vocab: 推荐 (recommend), 不推荐 (don\'t recommend), 值得 (worth), 不值得 (not worth it). 这部电影值得一看 = this film is worth watching. 我推荐你去 (I recommend it to you). Quality scale: 不错 (not bad) < 很好 (very good) < 太棒了 (great) < 神作 (divine work — fan slang). Avoid: 烂 (lousy, vulgar), 垃圾 (garbage, very pejorative). Prefer 不太理想 (not ideal) or 期待落空 (expectations disappointed) — more polite.',
    items: [
      { hanzi: '推荐', pinyin: 'tuī jiàn', meaning: 'recommander', meaningEn: 'recommend', audio: 'audio/hsk4/hsk4_推荐.wav' },
      { hanzi: '值得', pinyin: 'zhí dé', meaning: 'valoir', meaningEn: 'worth', audio: 'audio/hsk4/hsk4_值得.wav' },
      { hanzi: '失望', pinyin: 'shī wàng', meaning: 'déçu', meaningEn: 'disappointed', audio: 'audio/hsk4/hsk4_失望.wav' },
      { hanzi: '神作', pinyin: 'shén zuò', meaning: 'œuvre divine (argot)', meaningEn: 'divine work (slang)', audio: 'audio/hsk6/hsk6_作.wav' },
      { hanzi: '理想', pinyin: 'lǐ xiǎng', meaning: 'idéal', meaningEn: 'ideal', audio: 'audio/hsk5/hsk5_理想.wav' }
    ],
    tip:
      'Pour rejeter poliment une recommandation : « 听起来不错，但暂时没时间 » (ça a l\'air bien mais pas le temps maintenant). Évite « 我不感兴趣 » sec — perçu comme froid.',
    tipEn:
      'To politely decline a recommendation: «听起来不错，但暂时没时间» (sounds good but no time right now). Avoid blunt «我不感兴趣» — feels cold.'
  }
];

export const b12ConvM2LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b12-nostalgie',
    title: 'Exprimer la nostalgie et les souvenirs',
    titleEn: 'Express nostalgia and memories',
    body:
      '怀念 (huáiniàn, regretter, manquer — émotionnel) est **LE** mot-clé chinois de la nostalgie. 我很怀念那段时光 = je regrette beaucoup cette époque.\n' +
      '\n' +
      'Phrases pour démarrer :\n' +
      '- 我还记得… : je me souviens encore…\n' +
      '- 那时候我们… : à cette époque on…\n' +
      '- 想起来真怀念 : en y pensant ça me manque vraiment\n' +
      '- 小时候我经常… : enfant, je souvent…\n' +
      '\n' +
      'Astuce : la phrase culturellement chargée 时间过得真快 (**le temps passe vite**) est quasi-rituelle quand on parle du passé. Réponse attendue : 是啊，转眼就… (oui, en un clin d\'œil…).',
    bodyEn:
      'Open: 我还记得 (I still remember), 那时候我们… (back then we…), 想起来真怀念 (thinking about it I really miss it). 怀念 (huáiniàn, miss, long for — emotional) is THE Chinese key word for nostalgia. 我很怀念那段时光 = I really miss that time. For childhood memories: 小时候我经常… (as a child I often…). Culturally charged phrase: 时间过得真快 (time flies) — almost ritual when speaking of the past. Expected reply: 是啊，转眼就… (yeah, in a blink…).',
    items: [
      { hanzi: '记得', pinyin: 'jì de', meaning: 'se souvenir', meaningEn: 'remember', audio: 'audio/hsk3/hsk3_记得.wav' },
      { hanzi: '怀念', pinyin: 'huái niàn', meaning: 'manquer (émotionnel)', meaningEn: 'long for', audio: 'audio/hsk5/hsk5_怀念.wav' },
      { hanzi: '小时候', pinyin: 'xiǎo shí hou', meaning: 'enfance', meaningEn: 'childhood', audio: 'audio/hsk3/hsk3_时候.wav' },
      { hanzi: '回忆', pinyin: 'huí yì', meaning: 'souvenir, mémoire', meaningEn: 'memory', audio: 'audio/hsk4/hsk4_回忆.wav' },
      { hanzi: '转眼', pinyin: 'zhuǎn yǎn', meaning: 'en un clin d\'œil', meaningEn: 'in a blink', audio: 'audio/hsk6/hsk6_转眼.wav' }
    ],
    tip:
      '« 时间过得真快 » est un brise-glace nostalgique universel en Chine. Si quelqu\'un te le dit, réponds 是啊，一晃就 X 年了 (oui, et hop, X années sont passées). Convention culturelle.',
    tipEn:
      '«时间过得真快» is a universal nostalgia icebreaker in China. If someone says it, reply 是啊，一晃就 X 年了 (yeah, and bam, X years have gone by). Cultural convention.'
  },
  {
    id: 'b12-old-photo',
    title: 'Évoquer un objet ou une photo qui rappelle le passé',
    titleEn: 'Evoke an object or photo that recalls the past',
    body:
      'Quelques formules-cadres pour évoquer un objet chargé de souvenirs :\n' +
      '- 这张照片让我想起 X : cette photo me rappelle X\n' +
      '- 这个东西陪了我很多年 : cet objet m\'a accompagné pendant des années\n' +
      '- 充满回忆 : **rempli** de souvenirs\n' +
      '- 不知道他现在怎么样 : je me demande comment il va maintenant (pour un ami perdu de vue)\n' +
      '\n' +
      'Pour conclure une discussion nostalgique : 那都是过去的事了 (c\'est du passé), 现在好好过 (vivons bien maintenant).\n' +
      '\n' +
      'Attention : la phrase poétique 时光荏苒 (shíguāng rěnrǎn, le temps passe en silence) est un **chengyu lettré**, à utiliser avec parcimonie.',
    bodyEn:
      '这张照片让我想起 X = this photo reminds me of X. 这个东西陪了我很多年 = this object kept me company for years. 充满回忆 (full of memories). For lost-touch friends: 不知道他现在怎么样 (I wonder how he\'s doing now). To close a nostalgic discussion: 那都是过去的事了 (it\'s all past now), 现在好好过 (let\'s live well now). Poetic phrase: 时光荏苒 (shíguāng rěnrǎn, time flows quietly — literary chengyu, use sparingly).',
    items: [
      { hanzi: '照片', pinyin: 'zhào piàn', meaning: 'photo', meaningEn: 'photo', audio: 'audio/hsk3/hsk3_照片.wav' },
      { hanzi: '陪', pinyin: 'péi', meaning: 'accompagner', meaningEn: 'accompany', audio: 'audio/hsk4/hsk4_陪.wav' },
      { hanzi: '充满', pinyin: 'chōng mǎn', meaning: 'rempli de', meaningEn: 'full of', audio: 'audio/hsk5/hsk5_充满.wav' },
      { hanzi: '过去', pinyin: 'guò qù', meaning: 'passé', meaningEn: 'past', audio: 'audio/hsk2/hsk2_过去.wav' },
      { hanzi: '荏苒', pinyin: 'rěn rǎn', meaning: 's\'écouler (lettré)', meaningEn: 'flow by (literary)', audio: 'audio/hsk6/hsk6_荏苒.wav' }
    ],
    tip:
      'Sur WeChat Moments, partager une vieille photo + « 陪了我很多年 » + emoji 🥹 est un format social très chinois. Tes amis chinois réagiront avec émotions partagées.',
    tipEn:
      'On WeChat Moments, sharing an old photo + «陪了我很多年» + 🥹 emoji is a very Chinese social format. Your Chinese friends will react with shared emotion.'
  }
];

export const b12ConvM3LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b12-societe',
    title: 'Argumenter sur un sujet de société',
    titleEn: 'Argue on a societal topic',
    body:
      'Sujets B1.2 : 教育 (éducation), 环境 (environnement), 工作压力 (stress au travail), 房价 (prix de l\'immobilier), 老龄化 (vieillissement).\n' +
      '\n' +
      'Structure d\'argumentation à mémoriser :\n' +
      '- 我觉得… : ta position\n' +
      '- 因为… : la raison\n' +
      '- 比如… : un exemple\n' +
      '- 不过… : la nuance\n' +
      '\n' +
      'Vocabulaire-clé : 现象 (phénomène), 趋势 (tendance), 影响 (impact), 解决 (résoudre), 改善 (améliorer).\n' +
      '\n' +
      'Astuce : la phrase d\'ouverture **polie** 这是个复杂的问题 (c\'est un sujet complexe) évite l\'air dogmatique. Pour reconnaître la nuance — 这个问题没有简单的答案 (cette question n\'a pas de réponse simple).',
    bodyEn:
      'B1.2 topics: 教育 (education), 环境 (environment), 工作压力 (work stress), 房价 (housing prices), 老龄化 (aging). Structure: 我觉得 + position + 因为 + reason + 比如 + example + 不过 + nuance. Key vocab: 现象 (phenomenon), 趋势 (trend), 影响 (impact), 解决 (solve), 改善 (improve). Polite opening: 这是个复杂的问题 (it\'s a complex topic) — avoids dogmatic air. To acknowledge nuance: 这个问题没有简单的答案 (this question has no simple answer).',
    items: [
      { hanzi: '现象', pinyin: 'xiàn xiàng', meaning: 'phénomène', meaningEn: 'phenomenon', audio: 'audio/hsk5/hsk5_现象.wav' },
      { hanzi: '趋势', pinyin: 'qū shì', meaning: 'tendance', meaningEn: 'trend', audio: 'audio/hsk5/hsk5_趋势.wav' },
      { hanzi: '影响', pinyin: 'yǐng xiǎng', meaning: 'impact', meaningEn: 'impact', audio: 'audio/hsk3/hsk3_影响.wav' },
      { hanzi: '改善', pinyin: 'gǎi shàn', meaning: 'améliorer', meaningEn: 'improve', audio: 'audio/hsk6/hsk6_改善.wav' },
      { hanzi: '复杂', pinyin: 'fù zá', meaning: 'complexe', meaningEn: 'complex', audio: 'audio/hsk4/hsk4_复杂.wav' }
    ],
    tip:
      'Sujets sensibles à NAVIGUER avec prudence : politique (政治), historique récent (Tibet, Tian\'anmen, Hong Kong), Taiwan (台湾). Préfère « 我对这个不太了解 » (je ne connais pas bien) plutôt que des opinions tranchées avec inconnus.',
    tipEn:
      'Sensitive topics to NAVIGATE carefully: politics (政治), recent history (Tibet, Tiananmen, Hong Kong), Taiwan (台湾). Prefer «我对这个不太了解» (I don\'t know much about this) over sharp opinions with strangers.'
  },
  {
    id: 'b12-shesheng',
    title: 'Sujets délicats : santé mentale, famille, mariage',
    titleEn: 'Delicate topics: mental health, family, marriage',
    body:
      'Sujets jadis tabous, maintenant discutés (surtout en milieu **urbain jeune**) :\n' +
      '- 抑郁症 : dépression\n' +
      '- 焦虑 : anxiété\n' +
      '- 单亲家庭 : famille monoparentale\n' +
      '- 离婚 : divorce\n' +
      '- 丁克 : Dink, couple sans enfants (concept importé)\n' +
      '- 不婚主义 : célibat choisi\n' +
      '\n' +
      'Formules-clés à mémoriser :\n' +
      '- pour aborder : 我可以问你一个比较私人的问题吗？(je peux te poser une question un peu perso ?)\n' +
      '- pour partager : 这是我自己的经历 (c\'est ma propre expérience)\n' +
      '- pour respecter : 你不想聊就不聊 (si tu n\'as pas envie d\'en parler, on n\'en parle pas)\n' +
      '\n' +
      'Remarque : le 不想聊 est une **porte de sortie sociale** très importante.',
    bodyEn:
      'Once-taboo topics now discussed (especially in young urban circles). 抑郁症 (depression), 焦虑 (anxiety), 单亲家庭 (single-parent family), 离婚 (divorce), 丁克 (Dink, child-free couple — imported), 不婚主义 (chosen singlehood). To broach delicately: 我可以问你一个比较私人的问题吗？(may I ask a personal question?). To share: 这是我自己的经历 (this is my own experience). To respect: 你不想聊就不聊 (if you don\'t want to discuss, we don\'t). The 不想聊 is a very important social exit.',
    items: [
      { hanzi: '抑郁', pinyin: 'yì yù', meaning: 'dépression', meaningEn: 'depression', audio: 'audio/hsk6/hsk6_抑郁.wav' },
      { hanzi: '焦虑', pinyin: 'jiāo lǜ', meaning: 'anxiété', meaningEn: 'anxiety', audio: 'audio/hsk6/hsk6_焦虑.wav' },
      { hanzi: '离婚', pinyin: 'lí hūn', meaning: 'divorcer', meaningEn: 'divorce', audio: 'audio/hsk5/hsk5_离婚.wav' },
      { hanzi: '私人', pinyin: 'sī rén', meaning: 'privé, personnel', meaningEn: 'private, personal', audio: 'audio/hsk5/hsk5_私人.wav' },
      { hanzi: '经历', pinyin: 'jīng lì', meaning: 'expérience', meaningEn: 'experience', audio: 'audio/hsk4/hsk4_经历.wav' }
    ],
    tip:
      'Avant d\'évoquer un sujet sensible, propose toujours une porte de sortie : « 你不想聊就不聊 ». Cette précaution distingue B1+ d\'apprenants qui plongent direct (et créent de la gêne).',
    tipEn:
      'Before raising a sensitive topic, always offer an exit: «你不想聊就不聊». This precaution distinguishes B1+ learners from those who dive straight in (creating awkwardness).'
  }
];

export const b12ConvM4LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b12-voyage',
    title: 'Donner ses impressions sur un voyage',
    titleEn: 'Share trip impressions',
    body:
      'Pour démarrer ton récit : 我刚从 X 回来 (je rentre tout juste de X) ou 我去 X 玩了一周 (j\'ai passé une semaine à X).\n' +
      '\n' +
      'Adjectifs voyage à connaître :\n' +
      '- 美 : beau\n' +
      '- 壮观 : grandiose\n' +
      '- 古老 : ancien\n' +
      '- 现代 : moderne\n' +
      '- 热闹 : animé\n' +
      '- 安静 : calme\n' +
      '\n' +
      'Conseils à formuler : 你一定要去 (tu dois absolument y aller), 我推荐 X (je recommande X), 别错过 X (ne rate pas X).\n' +
      '\n' +
      'Astuce : la phrase 那里的人很热情 (les gens là-bas sont chaleureux) est un **compliment universel**. Pour la nourriture, dis 当地的菜很地道 — 地道 (authentique) est un vrai compliment.',
    bodyEn:
      'Start: 我刚从 X 回来 (I just got back from X), 我去 X 玩了一周 (I spent a week in X). Travel adjectives: 美 (beautiful), 壮观 (grand), 古老 (ancient), 现代 (modern), 热闹 (lively), 安静 (quiet). Tips: 你一定要去 (you must go), 我推荐 X (I recommend X), 别错过 X (don\'t miss X). Typical phrase: 那里的人很热情 = the people there are warm (universal compliment). For food: 当地的菜很地道 (local cuisine is authentic). 地道 (authentic) is a real compliment.',
    items: [
      { hanzi: '壮观', pinyin: 'zhuàng guān', meaning: 'grandiose', meaningEn: 'spectacular', audio: 'audio/hsk6/hsk6_壮观.wav' },
      { hanzi: '古老', pinyin: 'gǔ lǎo', meaning: 'ancien', meaningEn: 'ancient', audio: 'audio/hsk5/hsk5_古老.wav' },
      { hanzi: '热闹', pinyin: 'rè nao', meaning: 'animé', meaningEn: 'lively, bustling', audio: 'audio/hsk4/hsk4_热闹.wav' },
      { hanzi: '推荐', pinyin: 'tuī jiàn', meaning: 'recommander', meaningEn: 'recommend', audio: 'audio/hsk4/hsk4_推荐.wav' },
      { hanzi: '地道', pinyin: 'dì dào', meaning: 'authentique', meaningEn: 'authentic', audio: 'audio/hsk5/hsk5_地道.wav' }
    ],
    tip:
      'Si on te demande tes impressions sur la Chine, mentionne 当地的菜很地道 (la nourriture authentique) ou 人很热情 (gens chaleureux). Ces 2 compliments font mouche universellement.',
    tipEn:
      'If asked about your impressions of China, mention 当地的菜很地道 (authentic food) or 人很热情 (warm people). These 2 compliments universally land.'
  },
  {
    id: 'b12-mishap',
    title: 'Mésaventure de voyage',
    titleEn: 'Travel mishap',
    body:
      'Vocabulaire de la galère voyage :\n' +
      '- 行李 : bagage\n' +
      '- 丢 : perdre\n' +
      '- 找不到 : impossible à trouver\n' +
      '- 错过 : rater\n' +
      '- 晚点 : en retard (transports)\n' +
      '- 取消 : annulé\n' +
      '\n' +
      'Phrases-types : 我的行李丢了 (j\'ai perdu mes bagages), 我错过了航班 (j\'ai raté l\'avion). Pour solliciter de l\'aide, combine 你能帮我吗 ? + 不好意思 + cause.\n' +
      '\n' +
      'Pour raconter l\'anecdote après-coup : 想起来真好笑 (en y repensant c\'était drôle), 后来还好 (heureusement après ça a été).\n' +
      '\n' +
      'Remarque : conclus **toujours positivement** avec 不过总体来说挺有意思 (mais dans l\'ensemble c\'était intéressant) — la culture chinoise valorise la résilience.',
    bodyEn:
      'Vocab: 行李 (luggage), 丢 (lose), 找不到 (can\'t find), 错过 (miss), 晚点 (late — for transport), 取消 (canceled). 我的行李丢了 = I lost my luggage. 我错过了航班 = I missed the flight. To ask for help: 你能帮我吗? + 不好意思 + cause. To report a funny anecdote afterwards: 想起来真好笑 (looking back it was funny), 后来还好 (luckily it turned out OK). Always conclude positively: 不过总体来说挺有意思 (but overall it was interesting) — Chinese culture values resilience.',
    items: [
      { hanzi: '行李', pinyin: 'xíng li', meaning: 'bagage', meaningEn: 'luggage', audio: 'audio/hsk4/hsk4_行李.wav' },
      { hanzi: '丢', pinyin: 'diū', meaning: 'perdre', meaningEn: 'lose', audio: 'audio/hsk4/hsk4_丢.wav' },
      { hanzi: '错过', pinyin: 'cuò guò', meaning: 'rater, manquer', meaningEn: 'miss', audio: 'audio/hsk5/hsk5_错过.wav' },
      { hanzi: '晚点', pinyin: 'wǎn diǎn', meaning: 'en retard (transport)', meaningEn: 'delayed', audio: 'audio/hsk5/hsk5_晚点.wav' },
      { hanzi: '取消', pinyin: 'qǔ xiāo', meaning: 'annuler', meaningEn: 'cancel', audio: 'audio/hsk4/hsk4_取消.wav' }
    ],
    tip:
      'Si tu as un vrai problème en voyage, va voir le 工作人员 (le personnel) plutôt qu\'un passager — solidarité institutionnelle plus efficace que l\'aide spontanée en Chine.',
    tipEn:
      'If you hit a real travel problem, find the 工作人员 (staff) rather than a fellow passenger — institutional solidarity is more efficient than spontaneous help in China.'
  }
];

export const b12ConvM5LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b12-academique',
    title: 'Parcours universitaire et études',
    titleEn: 'Academic path and studies',
    body:
      'Les niveaux scolaires chinois, du plus jeune au plus avancé :\n' +
      '- 小学 : primaire\n' +
      '- 初中 : collège\n' +
      '- 高中 : lycée\n' +
      '- 大学 : université\n' +
      '- 硕士 : master\n' +
      '- 博士 : doctorat\n' +
      '\n' +
      'Statuts : 本科生 (en licence), 研究生 (master/doctorat), 毕业生 (diplômé). Verbes-clés : 上课 (avoir cours), 上学 (aller à l\'école), 考试 (passer un examen), 复习 (réviser), 通过 (réussir), 不及格 (échouer). Phrase-type : 我大学学的是 X (à l\'université j\'ai étudié X).\n' +
      '\n' +
      'Attention : le **sujet brûlant** est 高考 (gāokǎo), le concours d\'entrée à l\'université — équivalent du bac mais d\'enjeu COLOSSAL en Chine. Mentionner 高考 = sujet immédiatement compris et chargé.',
    bodyEn:
      'Levels: 小学 (primary), 初中 (middle school), 高中 (high school), 大学 (university), 硕士 (master), 博士 (PhD). Degrees: 本科生 (undergrad), 研究生 (master/PhD student), 毕业生 (graduate). Verbs: 上课 (have class), 上学 (go to school), 考试 (take an exam), 复习 (review), 通过 (pass), 不及格 (fail). Phrase: 我大学学的是 X = at uni I studied X. Hot topic: 高考 (gāokǎo, the university entrance exam — equivalent to the SATs but with COLOSSAL stakes in China). Mentioning 高考 = immediately understood and charged.',
    items: [
      { hanzi: '本科', pinyin: 'běn kē', meaning: 'licence (Bac+3)', meaningEn: 'undergraduate', audio: 'audio/hsk5/hsk5_本科.wav' },
      { hanzi: '硕士', pinyin: 'shuò shì', meaning: 'master', meaningEn: 'master\'s', audio: 'audio/hsk5/hsk5_硕士.wav' },
      { hanzi: '博士', pinyin: 'bó shì', meaning: 'doctorat', meaningEn: 'PhD', audio: 'audio/hsk5/hsk5_博士.wav' },
      { hanzi: '高考', pinyin: 'gāo kǎo', meaning: 'concours d\'entrée université', meaningEn: 'university entrance exam', audio: 'audio/hsk6/hsk6_高考.wav' },
      { hanzi: '通过', pinyin: 'tōng guò', meaning: 'réussir, passer', meaningEn: 'pass', audio: 'audio/hsk4/hsk4_通过.wav' }
    ],
    tip:
      'En Chine, demander à un Chinois adulte « 你高考考了多少分 ? » (combien tu as eu au gaokao) est OK et fréquent — comparable à demander la promo d\'une grande école en France. Information sociale acceptée.',
    tipEn:
      'In China, asking an adult Chinese «你高考考了多少分?» (what did you score at gaokao) is OK and common — comparable to asking which prestigious school in France. Accepted social info.'
  },
  {
    id: 'b12-difficulte',
    title: 'Surmonter une difficulté académique',
    titleEn: 'Overcome an academic difficulty',
    body:
      'Trois étapes pour surmonter une difficulté académique en chinois.\n' +
      '\n' +
      'Décrire la difficulté :\n' +
      '- 我有点跟不上 : je n\'arrive pas tout à fait à suivre\n' +
      '- 我没听懂 : je n\'ai pas compris\n' +
      '\n' +
      'Demander de l\'aide ou s\'entraider :\n' +
      '- 你能给我讲一下吗？: peux-tu m\'expliquer ?\n' +
      '- 我有几个问题想问你 : j\'ai des questions pour toi\n' +
      '- 一起复习 / 互相帮助 : réviser ensemble / s\'entraider\n' +
      '- 我没及格，再考一次 : j\'ai raté, je repasse\n' +
      '\n' +
      'Astuce : pour encourager, sors les phrases magiques 失败是成功之母 (l\'échec est la **mère du succès**, chengyu populaire), 慢慢来 (vas-y doucement), 别给自己太大压力 (ne te mets pas trop de pression).',
    bodyEn:
      'Describe difficulty: 我有点跟不上 (I can\'t quite keep up), 我没听懂 (I didn\'t understand). Ask for help: 你能给我讲一下吗? (can you explain?), 我有几个问题想问你 (I have questions for you). Study together: 一起复习 (review together), 互相帮助 (help each other). Failure and retry: 我没及格，再考一次 (I failed, I\'ll retake it). Encouragement: 失败是成功之母 (failure is the mother of success — popular chengyu), 慢慢来 (take it easy), 别给自己太大压力 (don\'t pressure yourself too much).',
    items: [
      { hanzi: '跟不上', pinyin: 'gēn bù shàng', meaning: 'ne pas suivre', meaningEn: 'can\'t keep up', audio: 'audio/hsk3/hsk3_跟.wav' },
      { hanzi: '复习', pinyin: 'fù xí', meaning: 'réviser', meaningEn: 'review', audio: 'audio/hsk3/hsk3_复习.wav' },
      { hanzi: '互相', pinyin: 'hù xiāng', meaning: 'mutuellement', meaningEn: 'each other', audio: 'audio/hsk4/hsk4_互相.wav' },
      { hanzi: '及格', pinyin: 'jí gé', meaning: 'réussir (note minimale)', meaningEn: 'pass (min grade)', audio: 'audio/hsk5/hsk5_及格.wav' },
      { hanzi: '压力', pinyin: 'yā lì', meaning: 'pression', meaningEn: 'pressure', audio: 'audio/hsk4/hsk4_压力.wav' }
    ],
    tip:
      '失败是成功之母 (chengyu) est utilisé sincèrement en chinois — pas de cynisme. Si tu encourages un Chinois après un échec, dis-le ; ça touche.',
    tipEn:
      '失败是成功之母 (chengyu) is used sincerely in Chinese — no cynicism. If you encourage a Chinese person after a setback, say it; it lands.'
  }
];

export const b12ConvM6LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b12-echec',
    title: 'Raconter un échec et ce qu\'on a appris',
    titleEn: 'Tell a failure and what you learned',
    body:
      'En culture chinoise, raconter un échec **lucide** est valorisé : c\'est un signe de maturité 成熟 (chéngshú).\n' +
      '\n' +
      'Phrases-cadres pour un récit d\'échec :\n' +
      '- 我之前犯过一个错误 : j\'ai déjà fait une erreur\n' +
      '- 那次经历让我学到很多 : cette expérience m\'a beaucoup appris\n' +
      '- 这个教训我永远记得 : cette leçon, je m\'en souviendrai toujours\n' +
      '- 现在回头看，那次失败是宝贵的 : avec le recul, cet échec a été précieux\n' +
      '\n' +
      'Vocabulaire : 失败 (échec), 教训 (**leçon** au sens « ce que ça m\'a appris »), 反思 (réfléchir, auto-critique), 改进 (améliorer).',
    bodyEn:
      'Start humbly: 我之前犯过一个错误 (I made a mistake before), 那次经历让我学到很多 (that experience taught me a lot). Chinese people VALUE clear-eyed failure narratives — a sign of maturity 成熟 (chéngshú). Vocab: 失败 (failure), 教训 (lesson — meaning «what it taught me»), 反思 (reflect, self-critique), 改进 (improve). Typical phrase: 这个教训我永远记得 (I\'ll always remember this lesson). Conclude positively: 现在回头看，那次失败是宝贵的 (in hindsight, that failure was precious).',
    items: [
      { hanzi: '犯', pinyin: 'fàn', meaning: 'commettre (erreur)', meaningEn: 'commit (error)', audio: 'audio/hsk5/hsk5_犯.wav' },
      { hanzi: '教训', pinyin: 'jiào xun', meaning: 'leçon (vie)', meaningEn: 'lesson (life)', audio: 'audio/hsk5/hsk5_教训.wav' },
      { hanzi: '反思', pinyin: 'fǎn sī', meaning: 'réfléchir, auto-critique', meaningEn: 'reflect', audio: 'audio/hsk6/hsk6_反思.wav' },
      { hanzi: '改进', pinyin: 'gǎi jìn', meaning: 'améliorer', meaningEn: 'improve', audio: 'audio/hsk5/hsk5_改进.wav' },
      { hanzi: '宝贵', pinyin: 'bǎo guì', meaning: 'précieux', meaningEn: 'precious', audio: 'audio/hsk5/hsk5_宝贵.wav' }
    ],
    tip:
      'En entretien d\'embauche chinois, la question « 你最大的失败是什么 ? » attend une vraie réponse + une vraie leçon apprise. Ne pas avoir d\'échec = signe d\'immaturité.',
    tipEn:
      'In a Chinese job interview, «你最大的失败是什么?» expects a real answer + a real lesson learned. Having no failure = sign of immaturity.'
  },
  {
    id: 'b12-strategy',
    title: 'Présenter une stratégie / un plan d\'action',
    titleEn: 'Present a strategy / action plan',
    body:
      'Structure imparable d\'une présentation stratégique en chinois :\n' +
      '- 目标 : objectif\n' +
      '- 计划 : plan\n' +
      '- 步骤 : étapes\n' +
      '- 风险 : risques\n' +
      '- 备选方案 : **plan B**\n' +
      '\n' +
      'Phrases-cadres :\n' +
      '- 我们的目标是在 X 年内 X : notre objectif est X dans X années\n' +
      '- 主要分三个阶段 : en 3 phases principales\n' +
      '- 我们会根据情况调整 : on s\'adaptera selon la situation\n' +
      '- 关于风险，我们考虑过 X : concernant les risques, on a considéré X\n' +
      '\n' +
      'Vocabulaire : 实施 (mettre en œuvre), 执行 (exécuter), 评估 (évaluer), 调整 (ajuster).\n' +
      '\n' +
      'Attention : en présentation chinoise, **anticiper les contre-arguments** est très valorisé.',
    bodyEn:
      'Structure: 目标 (objective) → 计划 (plan) → 步骤 (steps) → 风险 (risks) → 备选方案 (plan B). Vocab: 实施 (implement), 执行 (execute), 评估 (evaluate), 调整 (adjust). 我们的目标是在 X 年内 X = our goal is X within X years. 主要分三个阶段 = in 3 main phases. To show flexibility: 我们会根据情况调整 (we\'ll adapt to circumstances). To anticipate questions: 关于风险，我们考虑过 X (regarding risks, we\'ve considered X). In Chinese presentations, anticipating counter-arguments is highly valued.',
    items: [
      { hanzi: '目标', pinyin: 'mù biāo', meaning: 'objectif', meaningEn: 'goal', audio: 'audio/hsk4/hsk4_目标.wav' },
      { hanzi: '阶段', pinyin: 'jiē duàn', meaning: 'phase', meaningEn: 'phase', audio: 'audio/hsk5/hsk5_阶段.wav' },
      { hanzi: '风险', pinyin: 'fēng xiǎn', meaning: 'risque', meaningEn: 'risk', audio: 'audio/hsk5/hsk5_风险.wav' },
      { hanzi: '调整', pinyin: 'tiáo zhěng', meaning: 'ajuster', meaningEn: 'adjust', audio: 'audio/hsk5/hsk5_调整.wav' },
      { hanzi: '执行', pinyin: 'zhí xíng', meaning: 'exécuter', meaningEn: 'execute', audio: 'audio/hsk5/hsk5_执行.wav' }
    ],
    tip:
      'En réunion chinoise, présente TOUJOURS un plan B (备选方案). Sans cela, perçu comme manque de prudence professionnelle. Même si le B est minimal.',
    tipEn:
      'In a Chinese meeting, ALWAYS present a plan B (备选方案). Without it, perceived as lacking professional caution. Even a minimal B counts.'
  }
];

export const b12ConvM7LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b12-feedback-pro',
    title: 'Donner et recevoir un feedback pro',
    titleEn: 'Give and receive professional feedback',
    body:
      '反馈 (fǎnkuì, feedback) est le mot moderne ; à côté tu trouveras 总结 (bilan), 评价 (évaluation), 评估 (évaluer).\n' +
      '\n' +
      'Donner un feedback (sandwich obligatoire) :\n' +
      '- positif : 我觉得你做得很好，特别是 X (très bien fait, surtout X)\n' +
      '- constructif : 你有几个优点，比如 X，不过 Y 可以再改进 (tu as des points forts, mais Y peut être amélioré)\n' +
      '\n' +
      'Recevoir un feedback :\n' +
      '- 谢谢你的反馈 : merci pour ton retour\n' +
      '- 我会认真考虑 : je vais y réfléchir sérieusement\n' +
      '- 你能再具体一点吗？: peux-tu être plus précis ?\n' +
      '\n' +
      'Attention : **toujours** rester ouvert verbalement même si tu n\'es pas d\'accord — la réaction se voit, le merci s\'entend.',
    bodyEn:
      'Give positive: 我觉得你做得很好，特别是 X (very well done, especially X). Constructive (sandwich mandatory): 你有几个优点，比如 X，不过 Y 可以再改进 (you have strengths, but Y can be improved). Receive: 谢谢你的反馈 (thanks for the feedback), 我会认真考虑 (I\'ll think seriously), 你能再具体一点吗？(can you be more specific?). 反馈 (fǎnkuì, feedback) is the modern word. Beyond: 总结 (summary), 评价 (evaluation), 评估 (assess). Always stay verbally open even if you disagree — reaction shows, thanks is heard.',
    items: [
      { hanzi: '反馈', pinyin: 'fǎn kuì', meaning: 'feedback', meaningEn: 'feedback', audio: 'audio/hsk6/hsk6_反馈.wav' },
      { hanzi: '改进', pinyin: 'gǎi jìn', meaning: 'améliorer', meaningEn: 'improve', audio: 'audio/hsk5/hsk5_改进.wav' },
      { hanzi: '具体', pinyin: 'jù tǐ', meaning: 'concret, précis', meaningEn: 'concrete, specific', audio: 'audio/hsk5/hsk5_具体.wav' },
      { hanzi: '评价', pinyin: 'píng jià', meaning: 'évaluation', meaningEn: 'evaluation', audio: 'audio/hsk4/hsk4_评价.wav' },
      { hanzi: '认真', pinyin: 'rèn zhēn', meaning: 'sérieux', meaningEn: 'serious', audio: 'audio/hsk3/hsk3_认真.wav' }
    ],
    tip:
      'En culture pro chinoise, le feedback PUBLIC négatif est tabou (perte de face). Préfère 1-1 ou WeChat privé. Une critique en réunion blesse profondément même si vraie.',
    tipEn:
      'In Chinese pro culture, PUBLIC negative feedback is taboo (loss of face). Prefer 1-1 or private WeChat. A critique in a meeting deeply hurts even if true.'
  },
  {
    id: 'b12-disaccord-pro',
    title: 'Désaccord pro avec un supérieur',
    titleEn: 'Pro disagreement with a superior',
    body:
      'Désaccord pro avec un supérieur : exercice **délicat**. La préface est obligatoire et la formulation doit rester en question, jamais en affirmation.\n' +
      '\n' +
      'Phrases-cadres :\n' +
      '- préface : 我有一个不同的想法，您看一下 (j\'ai une idée différente, qu\'en pensez-vous ?)\n' +
      '- proposer : 我们是不是可以考虑 X ? (et si on envisageait X ?)\n' +
      '- en cas de refus : 好的，我明白了 (très bien, je comprends — puis accepter sans rancune)\n' +
      '- insister via le risque : 这个方案有一个潜在的风险 (cette proposition a un risque potentiel — focalise sur le **risque**, pas sur le supérieur)\n' +
      '- sortie de secours : 我只是从我的角度提一个建议 (c\'est juste une suggestion de mon point de vue)',
    bodyEn:
      'Delicate. Mandatory preface: 我有一个不同的想法，您看一下 (I have a different thought, what do you think?). Always as QUESTION, not assertion: 我们是不是可以考虑 X ?. If refused: 好的，我明白了 + accept without grudge. To legitimately insist: 这个方案有一个潜在的风险 (this proposal has a potential risk) — focus on the RISK, not the superior. Magic phrase: 我只是从我的角度提一个建议 (it\'s just a suggestion from my perspective). Universal escape hatch.',
    items: [
      { hanzi: '不同', pinyin: 'bù tóng', meaning: 'différent', meaningEn: 'different', audio: 'audio/hsk3/hsk3_不同.wav' },
      { hanzi: '潜在', pinyin: 'qián zài', meaning: 'potentiel', meaningEn: 'potential', audio: 'audio/hsk6/hsk6_潜在.wav' },
      { hanzi: '风险', pinyin: 'fēng xiǎn', meaning: 'risque', meaningEn: 'risk', audio: 'audio/hsk5/hsk5_风险.wav' },
      { hanzi: '考虑', pinyin: 'kǎo lǜ', meaning: 'considérer', meaningEn: 'consider', audio: 'audio/hsk4/hsk4_考虑.wav' },
      { hanzi: '提建议', pinyin: 'tí jiàn yì', meaning: 'faire une suggestion', meaningEn: 'make a suggestion', audio: 'audio/hsk5/hsk5_提.wav' }
    ],
    tip:
      'Si ton supérieur chinois rejette ta suggestion, NE PAS insister à voix haute. Note l\'objection en privé puis revient avec un nouveau dossier dans 1-2 jours. La face est préservée des deux côtés.',
    tipEn:
      'If your Chinese superior rejects your suggestion, DON\'T push back out loud. Note the objection privately then come back with a new case in 1-2 days. Face is preserved on both sides.'
  }
];

// === NUANCES B1.2 ============================================================

export const b12NuancesM1LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b12-gang-gangcai',
    title: '刚 vs 刚才 — juste vs il y a un instant',
    titleEn: '刚 vs 刚才 — just vs a moment ago',
    body:
      'Deux mots qui se traduisent par « juste/à l\'instant » mais s\'emploient à des positions **syntaxiques différentes** :\n' +
      '- 刚 (gāng) : **adverbe**, va AVANT le verbe — l\'action vient juste de se finir (< 5 min). 我刚到 (je viens d\'arriver à l\'instant), 我刚回家 (je viens de rentrer)\n' +
      '- 刚才 (gāngcái) : **nom** temporel autonome — il y a quelques minutes/heures, dont on parle après. 刚才你说什么？(qu\'est-ce que tu disais à l\'instant ?), 刚才他来过 (il était venu il y a un instant)\n' +
      '\n' +
      'Astuce : « il y a un peu » → 刚才 ; « tout juste » → 刚. Attention : l\'erreur classique est de confondre les **deux positions syntaxiques**.',
    bodyEn:
      '刚 (gāng) = just (adverb — action just finished, less than ~5 min). 我刚到 = I just arrived (instantly). Goes BEFORE the verb. 刚才 (gāngcái) = a moment ago (NOUN/time referent — a few minutes/hours ago, talked about afterward). 刚才你说什么？= what did you just say? Functions as standalone time word. Test: «a moment ago» → 刚才; «just» → 刚. 我刚回家 = I just got home; 刚才他来过 = he came by a moment ago. Common mistake: confusing the two syntactic positions.',
    items: [
      { hanzi: '刚', pinyin: 'gāng', meaning: 'juste (adv)', meaningEn: 'just (adv)', audio: 'audio/hsk3/hsk3_刚.wav' },
      { hanzi: '刚才', pinyin: 'gāng cái', meaning: 'à l\'instant (nom)', meaningEn: 'a moment ago (noun)', audio: 'audio/hsk3/hsk3_刚才.wav' },
      { hanzi: '回家', pinyin: 'huí jiā', meaning: 'rentrer', meaningEn: 'go home', audio: 'audio/hsk1/hsk1_回家.wav' },
      { hanzi: '一会儿', pinyin: 'yí huìr', meaning: 'un moment', meaningEn: 'a while', audio: 'audio/hsk2/hsk2_一会儿.wav' },
      { hanzi: '马上', pinyin: 'mǎ shàng', meaning: 'tout de suite', meaningEn: 'right away', audio: 'audio/hsk3/hsk3_马上.wav' }
    ],
    tip:
      'Test position : si tu peux ajouter « il y a 5 min » → 刚才. Si « à l\'instant même » → 刚. « 我刚才看见他 » (il y a 5 min) ≠ « 我刚看见他 » (à l\'instant).',
    tipEn:
      'Position test: if you can add «5 min ago» → 刚才. If «right at this instant» → 刚. «我刚才看见他» (5 min ago) ≠ «我刚看见他» (this instant).'
  },
  {
    id: 'b12-mashang-likeshijian',
    title: '马上 vs 立刻 vs 立即 — immédiatement (registre)',
    titleEn: '马上 vs 立刻 vs 立即 — immediately (register)',
    body:
      'Trois mots pour « immédiatement » classés par **registre croissant** :\n' +
      '- 马上 (mǎshàng) : tout de suite — **oral** standard. 我马上来 (j\'arrive tout de suite). Promesse la plus courante en Chine, à comprendre comme « bientôt » plutôt que littéral (tolérance ~10 min)\n' +
      '- 立刻 (lìkè) : immédiatement — un peu plus écrit/sérieux. 我立刻处理 (je traite immédiatement)\n' +
      '- 立即 (lìjí) : sur-le-champ — **formel**, écrit, ordres. 立即停止 (arrêter sur-le-champ)\n' +
      '\n' +
      'Astuce : à l\'oral, 马上 partout ; à l\'écrit pro, alterne 立刻 et 立即.',
    bodyEn:
      '马上 (mǎshàng, right away — STANDARD oral). 我马上来 = I\'m coming right away. The most common promise in China; understand as «soon» rather than LITERAL «right away» (tolerance ~10 min). 立刻 (lìkè, immediately — slightly more written/serious). 我立刻处理 = I\'ll handle it immediately. 立即 (lìjí, this instant — formal, written, orders). 立即停止 = stop this instant. Hierarchy: 马上 (oral, elastic) < 立刻 (serious) < 立即 (formal/order). In speech, 马上 everywhere. In pro writing, alternate 立刻 and 立即.',
    items: [
      { hanzi: '马上', pinyin: 'mǎ shàng', meaning: 'tout de suite', meaningEn: 'right away', audio: 'audio/hsk3/hsk3_马上.wav' },
      { hanzi: '立刻', pinyin: 'lì kè', meaning: 'immédiatement', meaningEn: 'immediately', audio: 'audio/hsk5/hsk5_立刻.wav' },
      { hanzi: '立即', pinyin: 'lì jí', meaning: 'sur-le-champ', meaningEn: 'right this instant', audio: 'audio/hsk6/hsk6_立即.wav' },
      { hanzi: '处理', pinyin: 'chǔ lǐ', meaning: 'traiter, gérer', meaningEn: 'handle', audio: 'audio/hsk5/hsk5_处理.wav' },
      { hanzi: '停止', pinyin: 'tíng zhǐ', meaning: 'arrêter', meaningEn: 'stop', audio: 'audio/hsk4/hsk4_停止.wav' }
    ],
    tip:
      'Si un Chinois te dit 马上, prévois 5-15 min. C\'est culturel. 立刻 = vraiment imminent (1-2 min). 立即 = c\'est un ordre, sois prêt en quelques secondes.',
    tipEn:
      'If a Chinese person says 马上, plan for 5-15 min. It\'s cultural. 立刻 = really imminent (1-2 min). 立即 = it\'s an order, be ready in seconds.'
  }
];

export const b12NuancesM2LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b12-wancheng-jieshu',
    title: '完成 vs 结束 vs 完毕 — finir (registre)',
    titleEn: '完成 vs 结束 vs 完毕 — finish (register)',
    body:
      'Trois verbes pour « finir », chacun avec son centre de gravité :\n' +
      '- 完成 (wánchéng) : achever (un **objectif**, un projet). 我完成了任务 (j\'ai accompli la tâche) — accent sur le RÉSULTAT\n' +
      '- 结束 (jiéshù) : se terminer (un **événement**, une période). 会议结束了 (la réunion est finie) — accent sur la fin elle-même, neutre\n' +
      '- 完毕 (wánbì) : achevé / terminé — **formel**, écrit, militaire/admin. 报告完毕 (compte-rendu terminé)\n' +
      '\n' +
      'Attention : erreur classique — utiliser 完成 pour une réunion → 会议完成了 ✗ (utilise 结束).',
    bodyEn:
      '完成 (wánchéng) = accomplish (a GOAL, a project). 我完成了任务 = I accomplished the task. Stress on RESULT achieved. 结束 (jiéshù) = end (an EVENT, a period — neutral). 会议结束了 = the meeting ended. Stress on the end itself, no judgment. 完毕 (wánbì) = completed (FORMAL, written, military/admin). 报告完毕 = report ended. Hierarchy: 结束 (neutral, oral) < 完成 (result) < 完毕 (formal). Common mistake: using 完成 for a meeting → 会议完成了 ✗ (use 结束).',
    items: [
      { hanzi: '完成', pinyin: 'wán chéng', meaning: 'achever (résultat)', meaningEn: 'accomplish (result)', audio: 'audio/hsk3/hsk3_完成.wav' },
      { hanzi: '结束', pinyin: 'jié shù', meaning: 'se terminer (événement)', meaningEn: 'end (event)', audio: 'audio/hsk3/hsk3_结束.wav' },
      { hanzi: '完毕', pinyin: 'wán bì', meaning: 'terminé (formel)', meaningEn: 'completed (formal)', audio: 'audio/hsk6/hsk6_完毕.wav' },
      { hanzi: '任务', pinyin: 'rèn wù', meaning: 'tâche', meaningEn: 'task', audio: 'audio/hsk4/hsk4_任务.wav' },
      { hanzi: '报告', pinyin: 'bào gào', meaning: 'rapport', meaningEn: 'report', audio: 'audio/hsk5/hsk5_报告.wav' }
    ],
    tip:
      'Test : peut-on remplacer par « accomplir » → 完成. Par « se terminer » → 结束. Par « cessez tout » (formel/militaire) → 完毕. À l\'écrit pro, 完成 et 结束 alternés sont standard.',
    tipEn:
      'Test: replace with «accomplish» → 完成. With «end» → 结束. With «cease all» (formal/military) → 完毕. In pro writing, alternate 完成 and 结束 as standard.'
  },
  {
    id: 'b12-zhongyu-zuihou',
    title: '终于 vs 最后 vs 到底 — finalement',
    titleEn: '终于 vs 最后 vs 到底 — finally',
    body:
      'Trois mots pour « finalement » avec des charges émotionnelles très différentes :\n' +
      '- 终于 (zhōngyú) : **enfin** — après attente, soulagement émotionnel positif. 我终于到了 (je suis ENFIN arrivé)\n' +
      '- 最后 (zuìhòu) : à la fin, en dernier — **neutre**, séquence. 最后我们去了餐厅 (à la fin on est allés au resto)\n' +
      '- 到底 (dàodǐ) : en fin de compte / mais enfin — **insistance**, parfois agacée. 你到底来不来？(tu viens, oui ou non ?). Aussi en conclusion réfléchie : 到底有什么意义？(au fond, quel sens ça a ?)\n' +
      '\n' +
      'Attention : ne pas mélanger les trois — 终于 (émotion+) ≠ 最后 (neutre) ≠ 到底 (insistance/agacement).',
    bodyEn:
      '终于 (zhōngyú) = AT LAST (after waiting, emotional relief). 我终于到了 = I FINALLY arrived (I was waiting for this moment). Very positive. 最后 (zuìhòu) = at the end, lastly (NEUTRAL, sequence). 最后我们去了餐厅 = at the end we went to the restaurant. No emotion. 到底 (dàodǐ) = in the end / for crying out loud (insistence, sometimes annoyed). 你到底来不来？= are you coming or not?! For thoughtful conclusion: 到底有什么意义？= deep down, what\'s the meaning? Hierarchy: 终于 (emotion+) ≠ 最后 (neutral) ≠ 到底 (insistence/annoyance).',
    items: [
      { hanzi: '终于', pinyin: 'zhōng yú', meaning: 'enfin (soulagement)', meaningEn: 'finally (relief)', audio: 'audio/hsk3/hsk3_终于.wav' },
      { hanzi: '最后', pinyin: 'zuì hòu', meaning: 'à la fin', meaningEn: 'at the end', audio: 'audio/hsk3/hsk3_最后.wav' },
      { hanzi: '到底', pinyin: 'dào dǐ', meaning: 'en fin de compte', meaningEn: 'in the end', audio: 'audio/hsk4/hsk4_到底.wav' },
      { hanzi: '意义', pinyin: 'yì yì', meaning: 'sens, signification', meaningEn: 'meaning', audio: 'audio/hsk5/hsk5_意义.wav' },
      { hanzi: '究竟', pinyin: 'jiū jìng', meaning: 'au fond (formel)', meaningEn: 'in fact (formal)', audio: 'audio/hsk6/hsk6_究竟.wav' }
    ],
    tip:
      '到底 + question = insistance impatiente. 你到底想干嘛 ? = mais qu\'est-ce que tu VEUX à la fin ?! Évite avec un supérieur — perçu comme agressif. Réservé aux proches ou agacement assumé.',
    tipEn:
      '到底 + question = impatient insistence. 你到底想干嘛？= what do you ACTUALLY want?! Avoid with superiors — comes across as aggressive. Reserved for close relations or owned annoyance.'
  }
];

export const b12NuancesM3LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b12-nandao-buhuiba',
    title: '难道 vs 不会吧 — rhétoriques de doute',
    titleEn: '难道 vs 不会吧 — rhetorical doubts',
    body:
      'Deux marqueurs d\'incrédulité, l\'un fort et rhétorique, l\'autre oral et léger :\n' +
      '- 难道 (nándào) : est-ce que vraiment / ne me dis pas que… — **rhétorique d\'incrédulité**, fort. 难道你不知道？(ne me dis pas que tu ne sais pas ?!). Toujours suivi d\'une question affirmative\n' +
      '- 不会吧 (búhuì ba) : pas possible — incrédulité **orale familière**. 不会吧，他真的来了？(pas possible, il est vraiment venu ?). Plus léger que 难道\n' +
      '\n' +
      'Astuce : variantes orales classées du plus simple au plus fort — 真的吗？(confirmation info) < 不会吧 (incrédulité oral) < 难道 (rhétorique fort). Autres options : 不可能 ! et 怎么可能 ?',
    bodyEn:
      '难道 (nándào) = is it really / don\'t tell me (rhetorical incredulity, formal/strong oral). 难道你不知道？= don\'t tell me you don\'t know?! Always followed by an affirmative question to express strong doubt. 不会吧 (búhuì ba) = no way (CASUAL oral incredulity). 不会吧，他真的来了？= no way, did he really come? Lighter than 难道. Oral variants: 真的吗？(really?), 不可能！(impossible!), 怎么可能 (how possible). Hierarchy: 真的吗 (info confirmation) < 不会吧 (oral incredulity) < 难道 (strong rhetorical).',
    items: [
      { hanzi: '难道', pinyin: 'nán dào', meaning: 'est-ce vraiment', meaningEn: 'is it really', audio: 'audio/hsk5/hsk5_难道.wav' },
      { hanzi: '不会吧', pinyin: 'bú huì ba', meaning: 'pas possible', meaningEn: 'no way', audio: 'audio/hsk2/hsk2_会.wav' },
      { hanzi: '不可能', pinyin: 'bù kě néng', meaning: 'impossible', meaningEn: 'impossible', audio: 'audio/hsk2/hsk2_可能.wav' },
      { hanzi: '怎么可能', pinyin: 'zěn me kě néng', meaning: 'comment c\'est possible', meaningEn: 'how is it possible', audio: 'audio/hsk2/hsk2_可能.wav' },
      { hanzi: '吧', pinyin: 'ba', meaning: 'particule incertitude', meaningEn: 'uncertainty particle', audio: 'audio/hsk2/hsk2_吧.wav' }
    ],
    tip:
      '难道 + 不/没 + verbe = rhétorique très puissante. 难道你不爱我 ? = ne me dis pas que tu ne m\'aimes plus ? Phrase typique de drama chinois. À utiliser avec parcimonie pour ne pas sonner théâtral.',
    tipEn:
      '难道 + 不/没 + verb = very powerful rhetoric. 难道你不爱我？= don\'t tell me you don\'t love me? Typical Chinese drama line. Use sparingly to avoid sounding theatrical.'
  },
  {
    id: 'b12-bujian-deqi',
    title: '不见得 vs 未必 vs 不一定 — pas forcément',
    titleEn: '不见得 vs 未必 vs 不一定 — not necessarily',
    body:
      'Trois mots qui veulent dire « pas forcément », classés par registre :\n' +
      '- 不一定 (bùyídìng) : pas forcément — **neutre**, oral et écrit, le plus universel. 这个不一定对 (ce n\'est pas forcément vrai)\n' +
      '- 不见得 (bújiàndé) : pas nécessairement — un peu plus **oral**, scepticisme léger. 你说的不见得对 (ce que tu dis n\'est pas forcément vrai = je doute un peu)\n' +
      '- 未必 (wèibì) : pas certain — **formel**, écrit. 这个结论未必正确 (cette conclusion n\'est pas nécessairement correcte)\n' +
      '\n' +
      'Remarque : sens identique, registre différent. À l\'écrit B1+, alterne pour le **rythme**.',
    bodyEn:
      '不一定 (bùyídìng) = not necessarily (NEUTRAL, oral and written). 这个不一定对 = this isn\'t necessarily true. Most universal. 不见得 (bújiàndé) = not necessarily (slightly more oral, mild skepticism). 你说的不见得对 = what you say isn\'t necessarily true (= I have doubts). 未必 (wèibì) = not certain (FORMAL, written). 这个结论未必正确 = this conclusion isn\'t necessarily correct. Hierarchy: 不一定 (neutral) < 不见得 (oral skeptical) < 未必 (formal written). Test: same sense, different register. In B1+ writing, alternate for rhythm.',
    items: [
      { hanzi: '不一定', pinyin: 'bù yí dìng', meaning: 'pas forcément', meaningEn: 'not necessarily', audio: 'audio/hsk3/hsk3_不一定.wav' },
      { hanzi: '不见得', pinyin: 'bú jiàn dé', meaning: 'pas nécessairement', meaningEn: 'not necessarily (skeptical)', audio: 'audio/hsk6/hsk6_不见得.wav' },
      { hanzi: '未必', pinyin: 'wèi bì', meaning: 'pas certain (formel)', meaningEn: 'not certain (formal)', audio: 'audio/hsk6/hsk6_未必.wav' },
      { hanzi: '正确', pinyin: 'zhèng què', meaning: 'correct', meaningEn: 'correct', audio: 'audio/hsk4/hsk4_正确.wav' },
      { hanzi: '结论', pinyin: 'jié lùn', meaning: 'conclusion', meaningEn: 'conclusion', audio: 'audio/hsk5/hsk5_结论.wav' }
    ],
    tip:
      '不见得 (oral) sonne légèrement sceptique : « ah ouais, faut voir ». 未必 (écrit) est neutre. Si tu parles à un supérieur et que tu doutes, préfère 不一定 (neutre) — 不见得 peut sembler trop direct.',
    tipEn:
      '不见得 (oral) sounds mildly skeptical: «yeah, we\'ll see». 未必 (written) is neutral. If speaking to a superior and you doubt, prefer 不一定 (neutral) — 不见得 may seem too direct.'
  }
];

export const b12NuancesM4LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b12-chen-liyong',
    title: '趁 vs 利用 vs 借 — profiter de',
    titleEn: '趁 vs 利用 vs 借 — take advantage of',
    body:
      'Trois verbes pour « profiter de », chacun chargé d\'une connotation différente :\n' +
      '- 趁 (chèn) : profiter d\'une opportunité/d\'un moment **favorable** — positif, oral chaleureux. 趁热吃 (mange tant que c\'est chaud), 趁年轻 (tant qu\'on est jeune)\n' +
      '- 利用 (lìyòng) : utiliser un avantage — **neutre** sur une ressource, mais NÉGATIF sur une personne. 利用资源 (exploiter des ressources, neutre) vs 利用别人 (se servir des gens, très négatif)\n' +
      '- 借 (jiè) : emprunter (objet) ou se servir d\'une occasion — **formel**. 借这个机会 (à cette occasion, début de discours)\n' +
      '\n' +
      'Attention : retiens 趁 = opportunité positive, 利用 = exploiter (souvent froid), 借 = emprunter / occasion formelle.',
    bodyEn:
      '趁 (chèn) = take advantage of a FAVORABLE opportunity/moment (positive, common oral). 趁热吃 = eat while it\'s hot. 趁年轻 = while you\'re young. Very natural and warm. 利用 (lìyòng) = use (an advantage, sometimes others — neutral to NEGATIVE when applied to a person). 利用资源 = exploit resources (neutral). 利用别人 = use people (very negative). 借 (jiè) = borrow (object) or seize (an occasion, formal). 借这个机会 = on this occasion (formal, speech opener). Difference: 趁 = seize an opportunity (positive); 利用 = exploit (often cold); 借 = borrow / occasion (formal).',
    items: [
      { hanzi: '趁', pinyin: 'chèn', meaning: 'profiter de (positif)', meaningEn: 'take advantage of (positive)', audio: 'audio/hsk5/hsk5_趁.wav' },
      { hanzi: '利用', pinyin: 'lì yòng', meaning: 'utiliser, exploiter', meaningEn: 'use, exploit', audio: 'audio/hsk5/hsk5_利用.wav' },
      { hanzi: '借', pinyin: 'jiè', meaning: 'emprunter / saisir', meaningEn: 'borrow / seize', audio: 'audio/hsk3/hsk3_借.wav' },
      { hanzi: '机会', pinyin: 'jī huì', meaning: 'occasion', meaningEn: 'opportunity', audio: 'audio/hsk3/hsk3_机会.wav' },
      { hanzi: '资源', pinyin: 'zī yuán', meaning: 'ressource', meaningEn: 'resource', audio: 'audio/hsk5/hsk5_资源.wav' }
    ],
    tip:
      'Phrase culturellement chaleureuse : « 趁年轻多去看看世界 » (tant que tu es jeune, va voir le monde). C\'est l\'équivalent chinois du « carpe diem » — très utilisé en encouragement.',
    tipEn:
      'Culturally warm phrase: «趁年轻多去看看世界» (while young, go see the world). The Chinese equivalent of «carpe diem» — heavily used as encouragement.'
  },
  {
    id: 'b12-bian-shi-fa',
    title: '便 vs 是 vs 即 — c\'est-à-dire / alors (formel)',
    titleEn: '便 vs 是 vs 即 — that is / then (formal)',
    body:
      'À l\'écrit B1.2, tu rencontreras trois mots **formels** que tu dois savoir lire (pas forcément produire) :\n' +
      '- 便 (biàn) : alors, ainsi — synonyme de 就 mais **écrit**. 完成任务便可休息 (la tâche faite, on peut se reposer)\n' +
      '- 即 (jí) : c\'est-à-dire / soit — juxtaposition formelle. HSK 即 H 三 (HSK soit niveau 3)\n' +
      '- 是 : standard, reste de loin le plus fréquent dans tous les registres\n' +
      '\n' +
      'Phrase classique à reconnaître : 即所谓 X (c\'est ce qu\'on appelle X).\n' +
      '\n' +
      'Attention : à l\'oral, **jamais** 便 ou 即 — ça sonne extrêmement pédant. Réserve-les à l\'écrit académique ou journalistique.',
    bodyEn:
      'In B1.2 writing, you\'ll meet these 3 formal words: 便 (biàn) = then, thus (synonym of 就 but WRITTEN). 完成任务便可休息 = task done, one can rest. 即 (jí) = that is / namely (formal juxtaposition). HSK 即 H 三 = HSK namely level 3. Standard 是 remains by far the most common. In speech, NEVER 便 or 即 (sounds extremely pedantic). In academic/journalistic writing, 便 and 即 add rhythm. Recognizing for READING matters more than producing at this level. Classic phrase: 即所谓 X = which is what we call X.',
    items: [
      { hanzi: '便', pinyin: 'biàn', meaning: 'alors (écrit)', meaningEn: 'then (written)', audio: 'audio/hsk5/hsk5_便.wav' },
      { hanzi: '即', pinyin: 'jí', meaning: 'c\'est-à-dire', meaningEn: 'namely', audio: 'audio/hsk6/hsk6_即.wav' },
      { hanzi: '所谓', pinyin: 'suǒ wèi', meaning: 'ce qu\'on appelle', meaningEn: 'so-called', audio: 'audio/hsk6/hsk6_所谓.wav' },
      { hanzi: '即可', pinyin: 'jí kě', meaning: 'cela suffit (formel)', meaningEn: 'that suffices (formal)', audio: 'audio/hsk6/hsk6_即.wav' },
      { hanzi: '可', pinyin: 'kě', meaning: 'pouvoir (formel)', meaningEn: 'can (formal)', audio: 'audio/hsk5/hsk5_可.wav' }
    ],
    tip:
      'À l\'oral, dis 就/是. À l\'écrit académique, alterne 便/即/则 pour le rythme. Mais ne JAMAIS sortir 即 dans une conversation amicale, même sérieuse — ça te fait passer pour un vieux lettré.',
    tipEn:
      'In speech, say 就/是. In academic writing, alternate 便/即/则 for rhythm. But NEVER drop 即 in a friendly conversation, even serious — makes you sound like an old scholar.'
  }
];

export const b12NuancesM5LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b12-ba-jiang',
    title: '把 vs 将 — disposal (oral vs formel)',
    titleEn: '把 vs 将 — disposal (oral vs formal)',
    body:
      '把 (bǎ) est la **particule du disposal** : elle place un objet précis devant le verbe pour insister sur ce qu\'on en fait. 把书放在桌上 (pose le livre sur la table).\n' +
      '\n' +
      'Deux variantes par registre :\n' +
      '- 把 (bǎ) : **standard**, oral et écrit, universel\n' +
      '- 将 (jiāng) : même fonction mais **formel** — écrit administratif, juridique, journalistique. 将文件交给经理 (remettre le document au manager)\n' +
      '\n' +
      'Attention : à l\'oral, **jamais** 将 (sonne très soutenu). À l\'écrit B1.2, reconnaître 将 est important pour les contrats, annonces et presse.',
    bodyEn:
      '把 (bǎ) = «disposal» particle — places a specific object before the verb to highlight WHAT YOU DO with it. 把书放在桌上 = put the book on the table. STANDARD oral and written. 将 (jiāng) = same function BUT FORMAL (administrative, legal, journalistic writing). 将文件交给经理 = hand the document to the manager. In speech, NEVER 将 (sounds very formal). In B1.2 writing, RECOGNIZING 将 matters for contracts, announcements, press. In spontaneous speech: always 把. Hierarchy: 把 (universal oral+standard written) < 将 (formal written).',
    items: [
      { hanzi: '把', pinyin: 'bǎ', meaning: 'particule disposal', meaningEn: 'disposal particle', audio: 'audio/hsk3/hsk3_把.wav' },
      { hanzi: '将', pinyin: 'jiāng', meaning: 'particule disposal (formel)', meaningEn: 'disposal (formal)', audio: 'audio/hsk5/hsk5_将.wav' },
      { hanzi: '放', pinyin: 'fàng', meaning: 'poser', meaningEn: 'put', audio: 'audio/hsk2/hsk2_放.wav' },
      { hanzi: '交', pinyin: 'jiāo', meaning: 'remettre', meaningEn: 'hand over', audio: 'audio/hsk4/hsk4_交.wav' },
      { hanzi: '文件', pinyin: 'wén jiàn', meaning: 'document', meaningEn: 'document', audio: 'audio/hsk5/hsk5_文件.wav' }
    ],
    tip:
      '将 a aussi un sens d\'avenir formel : 将来 = avenir, 即将 = sur le point de. À reconnaître dans la presse et les annonces officielles. Souvent indique « prochainement ».',
    tipEn:
      '将 also has a formal future sense: 将来 = future, 即将 = about to. Recognize it in press and official announcements. Often indicates «soon, upcoming».'
  },
  {
    id: 'b12-zhi-de-de',
    title: '的 vs 地 vs 得 — trois particules « de » distinctes',
    titleEn: '的 vs 地 vs 得 — three distinct «de» particles',
    body:
      'Trois particules **homophones** (toutes prononcées « de ») mais grammaticalement différentes :\n' +
      '- 的 (de) : entre adjectif/déterminant et **nom**. 漂亮的衣服 (jolis vêtements), 我的书 (mon livre)\n' +
      '- 地 (de) : entre adverbe et **verbe**. 慢慢地走 (marcher doucement), 高兴地说 (dire joyeusement)\n' +
      '- 得 (de) : après le verbe pour introduire un **complément** (degré, manière, possibilité). 跑得很快 (courir vite), 说得不错 (parler bien)\n' +
      '\n' +
      'Règle d\'or : 的 + nom, 地 + verbe (avant), 得 + complément (après verbe).\n' +
      '\n' +
      'Attention : l\'erreur classique est de tout écrire 的. À l\'oral on n\'entend pas la différence, mais à l\'écrit B1.2 elle **compte**.',
    bodyEn:
      'THREE homophone particles (all pronounced «de») but grammatically DIFFERENT. 的 (de) = between adjective/determiner and NOUN. 漂亮的衣服 = pretty clothes. 我的书 = my book. 地 (de, never dì here) = between ADVERB and VERB. 慢慢地走 = walk slowly. 高兴地说 = say joyfully. 得 (de) = after VERB to introduce COMPLEMENT (degree, manner, possibility). 跑得很快 = run fast. 说得不错 = speak well. GOLDEN RULE: 的 + noun, 地 + verb (before), 得 + complement (after verb). Common mistake: writing 的 everywhere. Orally you can\'t hear the difference, in B1.2 writing IT MATTERS.',
    items: [
      { hanzi: '的', pinyin: 'de', meaning: 'particule (+ nom)', meaningEn: 'particle (+ noun)', audio: 'audio/hsk1/hsk1_的.wav' },
      { hanzi: '地', pinyin: 'de', meaning: 'particule (adv + verbe)', meaningEn: 'particle (adv + verb)', audio: 'audio/hsk1/hsk1_地.wav' },
      { hanzi: '得', pinyin: 'de', meaning: 'particule (verbe + compl.)', meaningEn: 'particle (verb + compl.)', audio: 'audio/hsk2/hsk2_得.wav' },
      { hanzi: '慢慢', pinyin: 'màn màn', meaning: 'lentement', meaningEn: 'slowly', audio: 'audio/hsk2/hsk2_慢.wav' },
      { hanzi: '跑步', pinyin: 'pǎo bù', meaning: 'courir', meaningEn: 'run', audio: 'audio/hsk2/hsk2_跑步.wav' }
    ],
    tip:
      'Mnémo : 的 (rond) = chose (nom) | 地 (terre) = manière (verbe d\'action sur la terre) | 得 (obtenir) = résultat (après le verbe, on obtient un résultat).',
    tipEn:
      'Mnemonic: 的 (round) = thing (noun) | 地 (earth) = manner (action verb on earth) | 得 (obtain) = result (after the verb, you obtain a result).'
  }
];

export const b12NuancesM6LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b12-dang-zai-shihou',
    title: '当 vs 在…的时候 vs 时 — quand',
    titleEn: '当 vs 在…的时候 vs 时 — when',
    body:
      'Trois manières de dire « quand » en chinois, à choisir selon le registre :\n' +
      '- 在 X 的时候 (zài X de shíhou) : **oral** standard, le plus naturel. 在我学中文的时候 (quand j\'apprends le chinois)\n' +
      '- 当 X 时 (dāng X shí) : un peu plus **formel**, écrit. 当我看到他时 (quand je l\'ai vu)\n' +
      '- 当 X 的时候 : combo universel des deux\n' +
      '\n' +
      'Astuce : à l\'oral, 在…的时候 ou 当…的时候 ; à l\'écrit, alterne avec 当…时. La structure complète est **indispensable** en chinois (pas comme « when X » anglais qui est plus court).\n' +
      '\n' +
      'Attention : évite « 时 » seul à l\'oral, pédant. Erreur classique : oublier 的 ou 时.',
    bodyEn:
      '在 X 的时候 (zài X de shíhou) = when X (standard oral, most natural). 在我学中文的时候 = when I\'m learning Chinese. 当 X 时 (dāng X shí) = when X (slightly more formal, written). 当我看到他时 = when I saw him. 当 X 的时候 = combo of both (universal). In B1.2 speech, 在…的时候 or 当…的时候; in writing, alternate with 当…时. Avoid bare «时» in speech — pedantic. Common mistake: forgetting 的 or 时. The full structure is INDISPENSABLE in Chinese (unlike English «when X» which is short).',
    items: [
      { hanzi: '当', pinyin: 'dāng', meaning: 'quand (formel)', meaningEn: 'when (formal)', audio: 'audio/hsk4/hsk4_当.wav' },
      { hanzi: '时候', pinyin: 'shí hou', meaning: 'moment, époque', meaningEn: 'time, moment', audio: 'audio/hsk1/hsk1_时候.wav' },
      { hanzi: '时', pinyin: 'shí', meaning: 'temps (formel)', meaningEn: 'time (formal)', audio: 'audio/hsk2/hsk2_时.wav' },
      { hanzi: '期间', pinyin: 'qī jiān', meaning: 'pendant', meaningEn: 'during', audio: 'audio/hsk5/hsk5_期间.wav' },
      { hanzi: '一旦', pinyin: 'yí dàn', meaning: 'dès que / une fois que', meaningEn: 'once', audio: 'audio/hsk5/hsk5_一旦.wav' }
    ],
    tip:
      'Pour « pendant » : 在…期间 (formel, écrit). 在会议期间 = pendant la réunion. 期间 ne marche que pour des PÉRIODES, pas des moments ponctuels.',
    tipEn:
      'For «during»: 在…期间 (formal, written). 在会议期间 = during the meeting. 期间 only works for PERIODS, not specific moments.'
  },
  {
    id: 'b12-yidan-suiran',
    title: '一旦 vs 如果 — dès que / si',
    titleEn: '一旦 vs 如果 — once / if',
    body:
      'Quatre mots pour « si / dès que », classés du plus oral au plus fort :\n' +
      '- 要是 (yàoshì) : si — **oral familier**\n' +
      '- 如果 (rúguǒ) : si — **neutre**, oral et écrit. 如果你来 (si tu viens)\n' +
      '- 假如 (jiǎrú) : si — **écrit formel**\n' +
      '- 一旦 (yídàn) : une fois que / dès que — hypothèse + **urgence/irréversibilité**. 一旦决定就不能改 (une fois décidé, on ne peut plus changer)\n' +
      '\n' +
      'Astuce : 如果 = simple hypothèse ; 一旦 = hypothèse + **irréversibilité**. À l\'écrit B1.2, alterne pour le rythme.',
    bodyEn:
      '如果 (rúguǒ) = if (hypothesis — neutral, oral and written). 如果你来 = if you come. 一旦 (yídàn) = once / as soon as (STRONG hypothesis + more formal). 一旦决定就不能改 = once decided, can\'t be changed. Difference: 如果 = simple hypothesis; 一旦 = hypothesis + URGENCY/IRREVERSIBILITY. In B1.2 writing, alternate for rhythm. Variants: 假如 (jiǎrú, if — formal written), 要是 (yàoshì, if — casual oral). Hierarchy: 要是 (casual oral) < 如果 (neutral) < 假如 (written) < 一旦 (urgency/irreversibility).',
    items: [
      { hanzi: '如果', pinyin: 'rú guǒ', meaning: 'si (hypothèse)', meaningEn: 'if (hypothesis)', audio: 'audio/hsk3/hsk3_如果.wav' },
      { hanzi: '一旦', pinyin: 'yí dàn', meaning: 'dès que / une fois que', meaningEn: 'once', audio: 'audio/hsk5/hsk5_一旦.wav' },
      { hanzi: '假如', pinyin: 'jiǎ rú', meaning: 'si (formel)', meaningEn: 'if (formal)', audio: 'audio/hsk6/hsk6_假如.wav' },
      { hanzi: '要是', pinyin: 'yào shì', meaning: 'si (oral)', meaningEn: 'if (oral)', audio: 'audio/hsk4/hsk4_要是.wav' },
      { hanzi: '万一', pinyin: 'wàn yī', meaning: 'au cas où', meaningEn: 'in case', audio: 'audio/hsk5/hsk5_万一.wav' }
    ],
    tip:
      '万一 (au cas où) est très utile pour les précautions. 你万一来不了，给我打电话 = au cas où tu ne pourrais pas venir, appelle-moi. Plus poli que 如果 dans ce contexte.',
    tipEn:
      '万一 (in case) is very useful for precautions. 你万一来不了，给我打电话 = in case you can\'t come, call me. More polite than 如果 in this context.'
  }
];

export const b12NuancesM7LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b12-mei-mei',
    title: '每 + 都 — chaque… (parallélisme obligatoire)',
    titleEn: '每 + 都 — every… (mandatory parallelism)',
    body:
      '每 (měi, **chaque**) doit être suivi presque **obligatoirement** de 都 (tous) dans la 2e partie de la phrase. Sans 都, la phrase sonne incomplète.\n' +
      '\n' +
      'Exemples-types :\n' +
      '- 每个人都喜欢 : chaque personne aime (tout le monde aime)\n' +
      '- 每天我都去跑步 : tous les jours je cours\n' +
      '- erreur classique : 每个人喜欢 ✗ → 每个人都喜欢 ✓\n' +
      '\n' +
      'Cas spéciaux : 每个 + nom (chaque X), 每天 (chaque jour), 每次 (chaque fois).\n' +
      '\n' +
      'Astuce : hierarchy avec synonymes — 每 (chaque, énumération exhaustive) < 任何 (rènhé, n\'importe quel, exception zéro) < 凡是 (凡是…的人都…, **formel** : tout X qui…).',
    bodyEn:
      '每 (měi) = every. Followed almost MANDATORILY by 都 (all) in the second clause. 每个人都喜欢 = every person likes (everyone likes). 每天我都去跑步 = every day I run. Without 都, the sentence sounds incomplete. Special cases: 每个 + noun (every X), 每天 (every day), 每次 (every time). Common mistake: 每个人喜欢 ✗ → 每个人都喜欢 ✓. Synonym: 任何 (rènhé, any) — 任何人都… (anyone…). Hierarchy: 每 (every, exhaustive enumeration) < 任何 (any, zero exception) < 凡是 (凡是…的人都…, formal: every X who…).',
    items: [
      { hanzi: '每', pinyin: 'měi', meaning: 'chaque', meaningEn: 'every', audio: 'audio/hsk2/hsk2_每.wav' },
      { hanzi: '任何', pinyin: 'rèn hé', meaning: 'n\'importe quel', meaningEn: 'any', audio: 'audio/hsk4/hsk4_任何.wav' },
      { hanzi: '凡是', pinyin: 'fán shì', meaning: 'tout X (formel)', meaningEn: 'every X (formal)', audio: 'audio/hsk6/hsk6_凡是.wav' },
      { hanzi: '所有', pinyin: 'suǒ yǒu', meaning: 'tous', meaningEn: 'all', audio: 'audio/hsk4/hsk4_所有.wav' },
      { hanzi: '都', pinyin: 'dōu', meaning: 'tous, tout', meaningEn: 'all', audio: 'audio/hsk1/hsk1_都.wav' }
    ],
    tip:
      'Règle de fer : si tu commences par 每, OBLIGATOIREMENT 都 dans la suite. À mémoriser comme paire indissociable. 每…都… = chaque…tous.',
    tipEn:
      'Iron rule: if you start with 每, MANDATORY 都 in the rest. Memorize as an inseparable pair. 每…都… = every…all.'
  },
  {
    id: 'b12-suoyou-yiqie',
    title: '所有 vs 一切 vs 全部 — tout (registre)',
    titleEn: '所有 vs 一切 vs 全部 — all (register)',
    body:
      'Trois mots pour dire « tout », chacun avec sa zone d\'emploi :\n' +
      '- 所有 (suǒyǒu) : **tous** (neutre, le plus universel) — 所有人都来了 (tout le monde est venu)\n' +
      '- 一切 (yíqiè) : tout (plus **abstrait**, souvent émotionnel) — 我愿意为你做一切 (je suis prêt à TOUT faire pour toi)\n' +
      '- 全部 (quánbù) : la **totalité** (neutre, nom ou adverbe) — 全部完成了 (tout est terminé)\n' +
      '\n' +
      'Attention : erreur classique — 一切人都… ✗ (utilise 所有人 ou 大家). 一切 reste pour la totalité **abstraite ou émotionnelle**.',
    bodyEn:
      '所有 (suǒyǒu) = all (NEUTRAL, most universal). 所有人都来了 = everyone came. 一切 (yíqiè) = everything (more ABSTRACT/literary, often emotional). 我愿意为你做一切 = I\'m willing to do EVERYTHING for you (emotional charge). 全部 (quánbù) = the totality (NEUTRAL, noun or adverb). 全部完成了 = all is done. Difference: 所有 (enumeration of people/things) ≠ 一切 (abstract/emotional totality) ≠ 全部 (totality of a finite set). Common mistake: 一切人都… ✗ (use 所有人 or 大家).',
    items: [
      { hanzi: '所有', pinyin: 'suǒ yǒu', meaning: 'tous', meaningEn: 'all', audio: 'audio/hsk4/hsk4_所有.wav' },
      { hanzi: '一切', pinyin: 'yí qiè', meaning: 'tout (abstrait)', meaningEn: 'everything (abstract)', audio: 'audio/hsk5/hsk5_一切.wav' },
      { hanzi: '全部', pinyin: 'quán bù', meaning: 'la totalité', meaningEn: 'totality', audio: 'audio/hsk5/hsk5_全部.wav' },
      { hanzi: '完整', pinyin: 'wán zhěng', meaning: 'complet', meaningEn: 'complete', audio: 'audio/hsk5/hsk5_完整.wav' },
      { hanzi: '愿意', pinyin: 'yuàn yì', meaning: 'être prêt à', meaningEn: 'willing to', audio: 'audio/hsk3/hsk3_愿意.wav' }
    ],
    tip:
      '« 我愿意为你做一切 » est une déclaration d\'amour CLASSIQUE chinoise. À ne pas utiliser à la légère : 一切 emporte un engagement total qui ne s\'efface pas.',
    tipEn:
      '«我愿意为你做一切» is a CLASSIC Chinese declaration of love. Don\'t use lightly: 一切 carries a total commitment that doesn\'t fade.'
  }
];
