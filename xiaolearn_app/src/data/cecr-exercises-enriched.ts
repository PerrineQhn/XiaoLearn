/**
 * cecr-exercises-enriched.ts
 * --------------------------
 * Exercices enrichis rédigés à la main — extension V8 de cecr-exercises.ts
 * (qui reste généré par gen_cecr_exercises.py).
 *
 * Philosophie :
 *   - 8 items par module, types variés (mcq, fill, order, grammar-quiz,
 *     translation, error-correction), différenciés par catégorie pédagogique
 *     (grammaire vs vocabulaire).
 *   - Chaque item est ancré dans le contenu de la leçon (hanzi/pinyin/thème).
 *   - Les corrections expliquent la règle, pas seulement la bonne réponse.
 *
 * Le fichier est fusionné avec cecrExercisesV2 via cecr-exercises-all.ts ;
 * les modules présents ici OVERRIDENT les modules générés par le script.
 *
 * Cf. docs/V8.md pour la grille pédagogique détaillée.
 */

import type { LessonV2Exercise } from '../pages/StructuredLessonPageV2';

// ============================================================================
//  B2.1 — GRAMMAIRE : connecteurs & emphase (7 modules)
// ============================================================================

const B21_GRAMMAR_LIAN_M1: LessonV2Exercise[] = [
  {
    id: 'cecr-b21-grammar-lian-m1-gq1',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Quelle est la structure d\u2019emphase correcte pour « même un enfant sait » ?',
    promptEn: 'Which emphasis structure correctly renders «even a child knows»?',
    choices: [
      '\u5C0F\u5B69\u77E5\u9053',
      '\u8FDE\u5C0F\u5B69\u4E5F\u77E5\u9053',
      '\u5C0F\u5B69\u4E5F\u77E5\u9053',
      '\u90FD\u5C0F\u5B69\u77E5\u9053'
    ],
    correctIndex: 1,
    explanation: 'La structure 连 + N + 也/都 + V met l\u2019élément en emphase. Ici : 连小孩 + 也 + 知道.',
    explanationEn: '连 + N + 也/都 + V structure emphasizes the noun. Here: 连小孩 + 也 + 知道.'
  },
  {
    id: 'cecr-b21-grammar-lian-m1-fill1',
    type: 'fill',
    category: 'grammar',
    prompt: 'Complète avec la bonne particule.',
    promptEn: 'Fill in with the correct particle.',
    sentence: '\u4ED6\u8FDE\u4E00\u53E5\u8BDD___\u6CA1\u8BF4\u3002',
    sentenceEn: 'He didn\u2019t say a single word.',
    choices: ['\u4E5F', '\u5C31', '\u624D', '\u8FD8'],
    correctIndex: 0,
    explanation: 'Avec 连…没… on utilise 也 (ou 都) pour maximaliser la négation.',
    explanationEn: 'With 连…没… we use 也 (or 都) to maximize the negation.'
  },
  {
    id: 'cecr-b21-grammar-lian-m1-mcq1',
    type: 'mcq',
    category: 'grammar',
    prompt: 'Que signifie « 连这个问题都不会 » ?',
    promptEn: 'What does «连这个问题都不会» mean?',
    choices: [
      'Il peut répondre à cette question',
      'Il ne sait même pas répondre à cette question',
      'Cette question est difficile',
      'Il refuse de répondre'
    ],
    correctIndex: 1,
    explanation: '连 X 都 + négation = « même pas X ». Emphase sur l\u2019évidence du manque.',
    explanationEn: '连 X 都 + negative = «not even X». Emphasis on the obvious lack.'
  },
  {
    id: 'cecr-b21-grammar-lian-m1-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Remets les segments dans l\u2019ordre correct.',
    promptEn: 'Reorder the segments correctly.',
    sentence: 'Il ne connaît même pas son propre père.',
    sentenceEn: 'He doesn\u2019t even know his own father.',
    choices: ['\u4ED6', '\u8FDE', '\u81EA\u5DF1\u7684\u7238\u7238', '\u90FD', '\u4E0D\u8BA4\u8BC6'],
    correctIndex: 0,
    explanation: 'Ordre : 他 + 连 + 自己的爸爸 + 都 + 不认识.',
    explanationEn: 'Order: 他 + 连 + 自己的爸爸 + 都 + 不认识.'
  },
  {
    id: 'cecr-b21-grammar-lian-m1-err1',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Quel segment est mal placé dans la phrase « 连 / 他 / 一口 / 都 / 没吃 » ?',
    promptEn: 'Which segment is misplaced in «连 / 他 / 一口 / 都 / 没吃»?',
    sentence: '\u8FDE / \u4ED6 / \u4E00\u53E3 / \u90FD / \u6CA1\u5403',
    choices: ['\u8FDE', '\u4ED6', '\u4E00\u53E3', '\u90FD'],
    correctIndex: 1,
    explanation: 'Le sujet 他 doit venir AVANT 连. Ordre correct : 他连一口都没吃 (« il n\u2019a même pas pris une bouchée »).',
    explanationEn: 'The subject 他 must come BEFORE 连. Correct order: 他连一口都没吃.'
  },
  {
    id: 'cecr-b21-grammar-lian-m1-trans1',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « Je n\u2019ai même pas un yuan. »',
    promptEn: 'Translate: «I don\u2019t even have one yuan.»',
    choices: [
      '\u6211\u6CA1\u6709\u4E00\u5757\u94B1',
      '\u6211\u8FDE\u4E00\u5757\u94B1\u4E5F\u6CA1\u6709',
      '\u6211\u4E00\u5757\u94B1\u4E5F\u6CA1\u6709',
      '\u6211\u90FD\u6CA1\u6709\u4E00\u5757\u94B1'
    ],
    correctIndex: 1,
    explanation: 'Structure emphatique : 连 + 一 + classificateur + N + 也/都 + 没 + V. 连一块钱也没有.',
    explanationEn: 'Emphatic structure: 连 + 一 + classifier + N + 也/都 + 没 + V.'
  },
  {
    id: 'cecr-b21-grammar-lian-m1-gq2',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Dans « 连老师也不知道答案 », quel rôle joue 连 ?',
    promptEn: 'In «连老师也不知道答案», what role does 连 play?',
    choices: [
      'Il connecte deux phrases',
      'Il introduit un élément extrême pour maximaliser',
      'Il signifie « tous »',
      'Il indique la cause'
    ],
    correctIndex: 1,
    explanation: '连 introduit un élément a priori peu susceptible (le professeur !) et 也/都 confirme la règle générale.',
    explanationEn: '连 introduces an unlikely element (the teacher!) and 也/都 confirms the broad rule.'
  },
  {
    id: 'cecr-b21-grammar-lian-m1-mcq2',
    type: 'mcq',
    category: 'grammar',
    prompt: 'Laquelle est la plus emphatique ?',
    promptEn: 'Which one is most emphatic?',
    choices: [
      '\u5B69\u5B50\u4E0D\u5403\u3002',
      '\u5B69\u5B50\u4EC0\u4E48\u4E5F\u4E0D\u5403\u3002',
      '\u8FDE\u5B69\u5B50\u4E5F\u4E0D\u5403\u3002',
      '\u5B69\u5B50\u90FD\u4E0D\u5403\u3002'
    ],
    correctIndex: 2,
    explanation: '连…也 ajoute une couche d\u2019emphase (« MÊME l\u2019enfant ne mange pas »), la plus forte des 4.',
    explanationEn: '连…也 adds an emphatic layer («EVEN the child won\u2019t eat»), strongest of the 4.'
  }
];

const B21_GRAMMAR_LIAN_M2: LessonV2Exercise[] = [
  {
    id: 'cecr-b21-grammar-lian-m2-gq1',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Pour dire « il n\u2019a même pas regardé », quelle structure est correcte ?',
    promptEn: 'To say «he didn\u2019t even look», which structure is correct?',
    choices: [
      '\u4ED6\u6CA1\u770B\u3002',
      '\u4ED6\u8FDE\u4E5F\u6CA1\u770B\u3002',
      '\u4ED6\u8FDE\u770B\u4E5F\u6CA1\u770B\u3002',
      '\u4ED6\u4E0D\u770B\u3002'
    ],
    correctIndex: 2,
    explanation: 'Structure : 连 + V + 也/都 + 没 + même V. Le verbe se répète.',
    explanationEn: 'Structure: 连 + V + 也/都 + 没 + same V. Verb repeats.'
  },
  {
    id: 'cecr-b21-grammar-lian-m2-fill1',
    type: 'fill',
    category: 'grammar',
    prompt: 'Complète : « 我连想 ___ 没想过。 »',
    promptEn: 'Fill in: «我连想 ___ 没想过。»',
    sentence: '\u6211\u8FDE\u60F3___\u6CA1\u60F3\u8FC7\u3002',
    sentenceEn: 'I didn\u2019t even think about it.',
    choices: ['\u90FD', '\u4E5F', '\u4E86', '\u8FC7'],
    correctIndex: 1,
    explanation: 'La structure canonique est : 连 + V + 也/都 + 没 + V. 也 ou 都 marchent ; ici 也 est plus fréquent.',
    explanationEn: 'Canonical: 连 + V + 也/都 + 没 + V. Both work; 也 is more common here.'
  },
  {
    id: 'cecr-b21-grammar-lian-m2-mcq1',
    type: 'mcq',
    category: 'grammar',
    prompt: 'Traduction de « 他连听也没听过 » :',
    promptEn: 'Translation of «他连听也没听过»:',
    choices: [
      'Il a bien entendu',
      'Il n\u2019a pas entendu',
      'Il n\u2019en a même jamais entendu parler',
      'Il refuse d\u2019entendre'
    ],
    correctIndex: 2,
    explanation: '连听也没听过 = « il n\u2019a même jamais entendu » ; 过 indique l\u2019expérience passée.',
    explanationEn: '连听也没听过 = «he has never even heard of it»; 过 marks past experience.'
  },
  {
    id: 'cecr-b21-grammar-lian-m2-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Reconstruis : « Il n\u2019a même pas dit un mot. »',
    promptEn: 'Rebuild: «He didn\u2019t even say a word.»',
    sentence: 'He didn\u2019t even say a word.',
    sentenceEn: 'He didn\u2019t even say a word.',
    choices: ['\u4ED6', '\u8FDE', '\u8BF4', '\u4E5F', '\u6CA1\u8BF4'],
    correctIndex: 0,
    explanation: 'Ordre : 他 + 连 + 说 + 也 + 没说.',
    explanationEn: 'Order: 他 + 连 + 说 + 也 + 没说.'
  },
  {
    id: 'cecr-b21-grammar-lian-m2-err1',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Dans « 他连看也看过一眼 », quel segment est fautif ?',
    promptEn: 'In «他连看也看过一眼», which segment is wrong?',
    sentence: '\u4ED6\u8FDE\u770B\u4E5F\u770B\u8FC7\u4E00\u773C',
    choices: ['\u8FDE', '\u4E5F', '\u770B\u8FC7', '\u4E00\u773C'],
    correctIndex: 2,
    explanation: 'Il manque la négation. La structure 连 V 也/都 impose un contexte négatif avec 没/不. Correct : 连看也没看一眼.',
    explanationEn: 'Negation is missing. 连 V 也/都 requires negative context with 没/不. Correct: 连看也没看一眼.'
  },
  {
    id: 'cecr-b21-grammar-lian-m2-trans1',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « Je n\u2019ai même pas essayé. »',
    promptEn: 'Translate: «I didn\u2019t even try.»',
    choices: [
      '\u6211\u6CA1\u8BD5\u3002',
      '\u6211\u4E0D\u8BD5\u3002',
      '\u6211\u8FDE\u8BD5\u4E5F\u6CA1\u8BD5\u8FC7\u3002',
      '\u6211\u8BD5\u4E86\u3002'
    ],
    correctIndex: 2,
    explanation: '« Même pas essayé » = 连 + 试 + 也 + 没 + 试过. Le 过 renforce l\u2019absence d\u2019expérience.',
    explanationEn: '«Even tried» = 连 + 试 + 也 + 没 + 试过. 过 reinforces no-experience.'
  },
  {
    id: 'cecr-b21-grammar-lian-m2-gq2',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Quel sentiment exprime 连 V 也没 V ?',
    promptEn: 'What feeling does 连 V 也没 V express?',
    choices: [
      'La fierté',
      'L\u2019étonnement ou l\u2019indignation',
      'La confirmation',
      'Le doute'
    ],
    correctIndex: 1,
    explanation: 'Cette structure est idiomatique pour souligner un manque surprenant, souvent avec indignation.',
    explanationEn: 'Idiomatic structure to stress a surprising lack, often with indignation.'
  },
  {
    id: 'cecr-b21-grammar-lian-m2-mcq2',
    type: 'mcq',
    category: 'grammar',
    prompt: 'Choisis la version la plus idiomatique pour « je n\u2019y ai même pas pensé » :',
    promptEn: 'Pick the most idiomatic for «I didn\u2019t even think of it»:',
    choices: [
      '\u6211\u6CA1\u60F3\u3002',
      '\u6211\u8FDE\u60F3\u4E5F\u6CA1\u60F3\u8FC7\u3002',
      '\u6211\u4E0D\u60F3\u3002',
      '\u6211\u60F3\u4E86\u3002'
    ],
    correctIndex: 1,
    explanation: '连想也没想过 est l\u2019idiome standard, surtout à l\u2019oral.',
    explanationEn: '连想也没想过 is the standard idiom, especially in speech.'
  }
];

const B21_GRAMMAR_LIAN_M3: LessonV2Exercise[] = [
  {
    id: 'cecr-b21-grammar-lian-m3-gq1',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: '« 除了小王以外，大家 ___ 来了 » — quelle suite donne une EXCLUSION ?',
    promptEn: '«除了小王以外，大家 ___ 来了» — which ending gives EXCLUSION?',
    choices: ['\u4E5F', '\u8FD8', '\u90FD', '\u5C31'],
    correctIndex: 2,
    explanation: '除了 X 以外 + 都 = exclusion (Xiao Wang EST l\u2019exception). 都 suit sans négation ici.',
    explanationEn: '除了 X 以外 + 都 = exclusion (Xiao Wang IS the exception).'
  },
  {
    id: 'cecr-b21-grammar-lian-m3-fill1',
    type: 'fill',
    category: 'grammar',
    prompt: 'Complète pour une INCLUSION.',
    promptEn: 'Fill in for INCLUSION.',
    sentence: '\u9664\u4E86\u4E2D\u6587\u4EE5\u5916\uFF0C\u6211___\u4F1A\u82F1\u6587\u3002',
    sentenceEn: 'Besides Chinese, I also speak English.',
    choices: ['\u90FD', '\u4E5F', '\u53EA', '\u5C31'],
    correctIndex: 1,
    explanation: '除了…以外 + 也/还 = inclusion (« en plus de X, aussi Y »).',
    explanationEn: '除了…以外 + 也/还 = inclusion («besides X, also Y»).'
  },
  {
    id: 'cecr-b21-grammar-lian-m3-mcq1',
    type: 'mcq',
    category: 'grammar',
    prompt: 'Sens de « 除了他以外，大家都走了 » :',
    promptEn: 'Meaning of «除了他以外，大家都走了»:',
    choices: [
      'Tout le monde y compris lui est parti',
      'Sauf lui, tout le monde est parti',
      'Personne n\u2019est parti',
      'Lui seul est parti'
    ],
    correctIndex: 1,
    explanation: '除了 X 以外 + 都 → exclusion. Lui reste, les autres partent.',
    explanationEn: '除了 X 以外 + 都 → exclusion. He stays, others leave.'
  },
  {
    id: 'cecr-b21-grammar-lian-m3-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Reconstruis : « À part le café, j\u2019aime aussi le thé. »',
    promptEn: 'Rebuild: «Besides coffee, I also like tea.»',
    sentence: 'Besides coffee, I also like tea.',
    sentenceEn: 'Besides coffee, I also like tea.',
    choices: ['\u9664\u4E86\u5496\u5561\u4EE5\u5916', '\u6211', '\u4E5F', '\u559C\u6B22', '\u8336'],
    correctIndex: 0,
    explanation: 'Ordre : 除了咖啡以外 + 我 + 也 + 喜欢 + 茶.',
    explanationEn: 'Order: 除了咖啡以外 + 我 + 也 + 喜欢 + 茶.'
  },
  {
    id: 'cecr-b21-grammar-lian-m3-err1',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Erreur dans « 除了他 / 以外 / 大家 / 也 / 没来 » ?',
    promptEn: 'Error in «除了他 / 以外 / 大家 / 也 / 没来»?',
    sentence: '\u9664\u4E86\u4ED6 / \u4EE5\u5916 / \u5927\u5BB6 / \u4E5F / \u6CA1\u6765',
    choices: ['\u9664\u4E86\u4ED6', '\u4EE5\u5916', '\u5927\u5BB6', '\u4E5F'],
    correctIndex: 3,
    explanation: 'Avec négation on veut une EXCLUSION → il faut 都, pas 也. Correct : 除了他以外，大家都没来 (« sauf lui, personne n\u2019est venu »).',
    explanationEn: 'With negation we want EXCLUSION → 都, not 也. Correct: 除了他以外，大家都没来.'
  },
  {
    id: 'cecr-b21-grammar-lian-m3-trans1',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « En plus du français, il parle aussi chinois. »',
    promptEn: 'Translate: «Besides French, he also speaks Chinese.»',
    choices: [
      '\u9664\u4E86\u6CD5\u8BED\u4EE5\u5916\uFF0C\u4ED6\u90FD\u4F1A\u4E2D\u6587\u3002',
      '\u9664\u4E86\u6CD5\u8BED\u4EE5\u5916\uFF0C\u4ED6\u4E5F\u4F1A\u4E2D\u6587\u3002',
      '\u4ED6\u53EA\u4F1A\u4E2D\u6587\u3002',
      '\u4ED6\u6CA1\u6709\u6CD5\u8BED\u3002'
    ],
    correctIndex: 1,
    explanation: 'Inclusion → 也/还 (pas 都). « Il parle français ET chinois. »',
    explanationEn: 'Inclusion → 也/还 (not 都). «He speaks French AND Chinese.»'
  },
  {
    id: 'cecr-b21-grammar-lian-m3-gq2',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Peut-on omettre 以外 dans « 除了小王以外 » ?',
    promptEn: 'Can we drop 以外 in «除了小王以外»?',
    choices: [
      'Non, jamais',
      'Oui, 以外 est souvent omissible en style oral',
      'Non, sauf au passé',
      'Non, sauf dans un contexte négatif'
    ],
    correctIndex: 1,
    explanation: '以外 est optionnel, surtout à l\u2019oral : 除了小王, ... est acceptable.',
    explanationEn: '以外 is optional, especially in speech: 除了小王, ... works.'
  },
  {
    id: 'cecr-b21-grammar-lian-m3-mcq2',
    type: 'mcq',
    category: 'grammar',
    prompt: 'Quelle phrase est AMBIGUË ?',
    promptEn: 'Which sentence is AMBIGUOUS?',
    choices: [
      '\u9664\u4E86\u4ED6\u4EE5\u5916\uFF0C\u5927\u5BB6\u90FD\u559C\u6B22\u3002',
      '\u9664\u4E86\u4ED6\u4EE5\u5916\uFF0C\u5927\u5BB6\u4E5F\u559C\u6B22\u3002',
      '\u9664\u4E86\u4ED6\uFF0C\u5927\u5BB6\u559C\u6B22\u3002',
      '\u4ED6\u559C\u6B22\u3002'
    ],
    correctIndex: 2,
    explanation: 'Sans 也/都 ET sans 以外, le sens inclusion/exclusion devient flou.',
    explanationEn: 'Without 也/都 AND 以外, inclusion/exclusion meaning gets blurry.'
  }
];

const B21_GRAMMAR_CONJ_M1: LessonV2Exercise[] = [
  {
    id: 'cecr-b21-grammar-conj-m1-gq1',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Quelle est la bonne position du sujet dans « 不但…而且 » si les deux sujets sont IDENTIQUES ?',
    promptEn: 'Correct subject position in «不但…而且» when both subjects are the SAME?',
    choices: [
      'Avant 不但',
      'Après 不但',
      'Après 而且',
      'N\u2019importe où'
    ],
    correctIndex: 0,
    explanation: 'Sujet identique → AVANT 不但. Ex : 他不但聪明，而且努力 (pas 不但他…).',
    explanationEn: 'Same subject → BEFORE 不但. Ex: 他不但聪明，而且努力.'
  },
  {
    id: 'cecr-b21-grammar-conj-m1-fill1',
    type: 'fill',
    category: 'grammar',
    prompt: 'Complète la progression.',
    promptEn: 'Fill in the progression.',
    sentence: '\u8FD9\u4E2A\u65B9\u6CD5\u4E0D\u4F46\u7B80\u5355\uFF0C___\u5F88\u6709\u6548\u3002',
    sentenceEn: 'This method is not only simple, but also very effective.',
    choices: ['\u800C\u4E14', '\u4F46\u662F', '\u6240\u4EE5', '\u56E0\u4E3A'],
    correctIndex: 0,
    explanation: '不但 A 而且 B : gradation positive. 而且 suit 不但.',
    explanationEn: '不但 A 而且 B: positive gradation. 而且 follows 不但.'
  },
  {
    id: 'cecr-b21-grammar-conj-m1-mcq1',
    type: 'mcq',
    category: 'grammar',
    prompt: 'Quelle variante de 不但 est la plus SOUTENUE ?',
    promptEn: 'Which 不但 variant is most FORMAL?',
    choices: ['\u4E0D\u4EC5', '\u4E0D\u4F46', '\u800C\u4E14', '\u5E76\u4E14'],
    correctIndex: 0,
    explanation: '不仅 est le registre écrit/formel de 不但.',
    explanationEn: '不仅 is the written/formal register of 不但.'
  },
  {
    id: 'cecr-b21-grammar-conj-m1-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Reconstruis : « Non seulement il viendra, mais sa mère aussi. »',
    promptEn: 'Rebuild: «Not only will he come, but his mother too.»',
    sentence: 'Not only will he come, but his mother too.',
    sentenceEn: 'Not only will he come, but his mother too.',
    choices: ['\u4E0D\u4F46', '\u4ED6\u4F1A\u6765', '\u800C\u4E14', '\u4ED6\u5988\u5988', '\u4E5F\u4F1A\u6765'],
    correctIndex: 0,
    explanation: 'Sujets différents → sujet APRÈS 不但 : 不但 + 他会来，而且 + 他妈妈 + 也会来.',
    explanationEn: 'Different subjects → subject AFTER 不但: 不但他会来，而且他妈妈也会来.'
  },
  {
    id: 'cecr-b21-grammar-conj-m1-err1',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Erreur dans « 他不但也聪明，而且也努力 » ?',
    promptEn: 'Error in «他不但也聪明，而且也努力»?',
    sentence: '\u4ED6\u4E0D\u4F46\u4E5F\u806A\u660E\uFF0C\u800C\u4E14\u4E5F\u52AA\u529B',
    choices: ['\u4E0D\u4F46', '\u4E5F\u806A\u660E', '\u800C\u4E14', '\u4E5F\u52AA\u529B'],
    correctIndex: 1,
    explanation: 'Il ne faut PAS mettre 也 dans la première clause. Correct : 他不但聪明，而且也努力.',
    explanationEn: 'Don\u2019t put 也 in the first clause. Correct: 他不但聪明，而且也努力.'
  },
  {
    id: 'cecr-b21-grammar-conj-m1-trans1',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « Cette ville est non seulement belle, mais aussi propre. »',
    promptEn: 'Translate: «This city is not only beautiful, but also clean.»',
    choices: [
      '\u8FD9\u4E2A\u57CE\u5E02\u6F02\u4EAE\u548C\u5E72\u51C0\u3002',
      '\u8FD9\u4E2A\u57CE\u5E02\u4E0D\u4F46\u6F02\u4EAE\uFF0C\u800C\u4E14\u5E72\u51C0\u3002',
      '\u8FD9\u4E2A\u57CE\u5E02\u53EA\u6F02\u4EAE\u3002',
      '\u8FD9\u4E2A\u57CE\u5E02\u5F88\u6F02\u4EAE\u3002'
    ],
    correctIndex: 1,
    explanation: 'Structure 不但 A 而且 B pour rendre « non seulement…mais aussi ».',
    explanationEn: '不但 A 而且 B for «not only…but also».'
  },
  {
    id: 'cecr-b21-grammar-conj-m1-gq2',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Quels connecteurs PEUVENT remplacer 而且 ?',
    promptEn: 'Which connectors CAN replace 而且?',
    choices: ['\u4F46\u662F', '\u5E76\u4E14 / \u4E5F / \u8FD8', '\u6240\u4EE5', '\u56E0\u4E3A'],
    correctIndex: 1,
    explanation: '并且, 也, 还 sont des substituts valides de 而且 dans le schéma 不但…而且.',
    explanationEn: '并且, 也, 还 are valid substitutes for 而且 in 不但…而且 pattern.'
  },
  {
    id: 'cecr-b21-grammar-conj-m1-mcq2',
    type: 'mcq',
    category: 'grammar',
    prompt: 'Quelle phrase est INCORRECTE ?',
    promptEn: 'Which sentence is INCORRECT?',
    choices: [
      '\u4ED6\u4E0D\u4F46\u806A\u660E\uFF0C\u800C\u4E14\u52AA\u529B\u3002',
      '\u4ED6\u4E0D\u4EC5\u806A\u660E\uFF0C\u5E76\u4E14\u52AA\u529B\u3002',
      '\u4ED6\u4E0D\u4F46\u806A\u660E\uFF0C\u4F46\u662F\u52AA\u529B\u3002',
      '\u4ED6\u4E0D\u4F46\u806A\u660E\uFF0C\u8FD8\u52AA\u529B\u3002'
    ],
    correctIndex: 2,
    explanation: '不但 attend une PROGRESSION (而且/也/还), PAS un contraste (但是).',
    explanationEn: '不但 expects PROGRESSION (而且/也/还), NOT contrast (但是).'
  }
];

const B21_GRAMMAR_CONJ_M2: LessonV2Exercise[] = [
  {
    id: 'cecr-b21-grammar-conj-m2-gq1',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: '« 无论 » exige la présence de quoi dans la clause qu\u2019il introduit ?',
    promptEn: 'What does «无论» require in the clause it introduces?',
    choices: [
      'Une négation',
      'Un mot interrogatif ou une alternative A 还是 B',
      'Le temps passé',
      'Un adjectif'
    ],
    correctIndex: 1,
    explanation: '无论 doit être suivi d\u2019une question (谁/什么/哪/怎么) ou d\u2019une alternative A 还是 B.',
    explanationEn: '无论 must be followed by a question word (谁/什么/哪/怎么) or an A 还是 B alternative.'
  },
  {
    id: 'cecr-b21-grammar-conj-m2-fill1',
    type: 'fill',
    category: 'grammar',
    prompt: 'Complète la clause conséquence.',
    promptEn: 'Fill in the result clause.',
    sentence: '\u65E0\u8BBA\u4F60\u8BF4\u4EC0\u4E48\uFF0C\u4ED6___\u4E0D\u542C\u3002',
    sentenceEn: 'No matter what you say, he doesn\u2019t listen.',
    choices: ['\u90FD', '\u624D', '\u5C31', '\u7684'],
    correctIndex: 0,
    explanation: '无论…都/也 : la deuxième clause DOIT porter 都 ou 也.',
    explanationEn: '无论…都/也: the second clause MUST carry 都 or 也.'
  },
  {
    id: 'cecr-b21-grammar-conj-m2-mcq1',
    type: 'mcq',
    category: 'grammar',
    prompt: '« 不管 » vs « 无论 » : laquelle est plus ORALE ?',
    promptEn: '«不管» vs «无论»: which is more ORAL?',
    choices: ['\u65E0\u8BBA', '\u4E0D\u7BA1', 'Les deux identiques', 'Ni l\u2019une ni l\u2019autre'],
    correctIndex: 1,
    explanation: '不管 est le registre oral ; 无论 est plus écrit.',
    explanationEn: '不管 is oral register; 无论 is more written.'
  },
  {
    id: 'cecr-b21-grammar-conj-m2-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Reconstruis : « Qu\u2019il fasse beau ou non, on y va. »',
    promptEn: 'Rebuild: «Whether the weather is good or not, we go.»',
    sentence: 'Whether the weather is good or not, we go.',
    sentenceEn: 'Whether the weather is good or not, we go.',
    choices: ['\u65E0\u8BBA', '\u5929\u6C14\u597D\u4E0D\u597D', '\u6211\u4EEC', '\u90FD', '\u53BB'],
    correctIndex: 0,
    explanation: 'Ordre : 无论 + 天气好不好 + 我们 + 都 + 去.',
    explanationEn: 'Order: 无论 + 天气好不好 + 我们 + 都 + 去.'
  },
  {
    id: 'cecr-b21-grammar-conj-m2-err1',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Erreur dans « 无论他来，我都去 » ?',
    promptEn: 'Error in «无论他来，我都去»?',
    sentence: '\u65E0\u8BBA / \u4ED6\u6765 / \u6211 / \u90FD / \u53BB',
    choices: ['\u65E0\u8BBA', '\u4ED6\u6765', '\u6211', '\u90FD'],
    correctIndex: 1,
    explanation: 'La clause après 无论 doit être interrogative. Correct : 无论他来不来，我都去 ou 无论谁来，我都去.',
    explanationEn: 'Clause after 无论 must be interrogative. Correct: 无论他来不来，我都去.'
  },
  {
    id: 'cecr-b21-grammar-conj-m2-trans1',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « Peu importe le prix, je l\u2019achète. »',
    promptEn: 'Translate: «No matter the price, I\u2019ll buy it.»',
    choices: [
      '\u4EF7\u94B1\u8D35\uFF0C\u6211\u4E70\u3002',
      '\u65E0\u8BBA\u4EF7\u94B1\u591A\u5C11\uFF0C\u6211\u90FD\u4E70\u3002',
      '\u6211\u4E0D\u4E70\u3002',
      '\u4EF7\u94B1\u4E0D\u8D35\uFF0C\u6211\u4E70\u3002'
    ],
    correctIndex: 1,
    explanation: 'Structure 无论 + 多少/什么 + …都. 无论价钱多少，我都买.',
    explanationEn: 'Structure 无论 + 多少/什么 + …都. 无论价钱多少，我都买.'
  },
  {
    id: 'cecr-b21-grammar-conj-m2-gq2',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Dans « 无论 A 还是 B », quel est le rôle de 还是 ?',
    promptEn: 'In «无论 A 还是 B», what is 还是\u2019s role?',
    choices: [
      'Il exprime une préférence',
      'Il forme une alternative couvrant toutes les possibilités',
      'Il marque la cause',
      'Il insiste sur B'
    ],
    correctIndex: 1,
    explanation: 'A 还是 B introduit une alternative exhaustive après 无论 (« A ou B, peu importe »).',
    explanationEn: 'A 还是 B introduces an exhaustive alternative after 无论.'
  },
  {
    id: 'cecr-b21-grammar-conj-m2-mcq2',
    type: 'mcq',
    category: 'grammar',
    prompt: 'Laquelle est CORRECTE ?',
    promptEn: 'Which is CORRECT?',
    choices: [
      '\u65E0\u8BBA\u4ED6\u3002',
      '\u65E0\u8BBA\u4ED6\u6765\u4E0D\u6765\uFF0C\u6211\u90FD\u7B49\u3002',
      '\u65E0\u8BBA\u4ED6\u6765\uFF0C\u6211\u7B49\u3002',
      '\u4ED6\u65E0\u8BBA\u6765\uFF0C\u6211\u90FD\u7B49\u3002'
    ],
    correctIndex: 1,
    explanation: 'Il faut (1) une interrogation/alternative après 无论 ET (2) 都/也 dans la deuxième clause.',
    explanationEn: 'Need (1) interrogation/alternative after 无论 AND (2) 都/也 in the second clause.'
  }
];

const B21_GRAMMAR_CONJ_M3: LessonV2Exercise[] = [
  {
    id: 'cecr-b21-grammar-conj-m3-gq1',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: '« 即使 » vs « 虽然 » : laquelle est hypothétique ?',
    promptEn: '«即使» vs «虽然»: which is hypothetical?',
    choices: [
      '\u5373\u4F7F',
      '\u867D\u7136',
      'Les deux',
      'Ni l\u2019une ni l\u2019autre'
    ],
    correctIndex: 0,
    explanation: '即使 = hypothèse (« même si, peut-être »). 虽然 = fait réel constaté (« bien que, effectivement »).',
    explanationEn: '即使 = hypothesis; 虽然 = actual fact.'
  },
  {
    id: 'cecr-b21-grammar-conj-m3-fill1',
    type: 'fill',
    category: 'grammar',
    prompt: 'Complète l\u2019hypothèse.',
    promptEn: 'Fill in the hypothesis.',
    sentence: '___\u4E0B\u96E8\uFF0C\u6211\u4E5F\u8981\u53BB\u3002',
    sentenceEn: 'Even if it rains, I\u2019ll still go.',
    choices: ['\u867D\u7136', '\u5373\u4F7F', '\u56E0\u4E3A', '\u6240\u4EE5'],
    correctIndex: 1,
    explanation: '« Même s\u2019il pleut » → hypothèse → 即使 (+ 也).',
    explanationEn: '«Even if it rains» → hypothesis → 即使 (+ 也).'
  },
  {
    id: 'cecr-b21-grammar-conj-m3-mcq1',
    type: 'mcq',
    category: 'grammar',
    prompt: 'Variante ORALE la plus fréquente de 即使 :',
    promptEn: 'Most frequent ORAL variant of 即使:',
    choices: ['\u7EB5\u7136', '\u54EA\u6015', '\u5C31\u7B97', '\u5373\u4F7F'],
    correctIndex: 2,
    explanation: '就算 est l\u2019équivalent oral/familier de 即使.',
    explanationEn: '就算 is the oral/casual equivalent of 即使.'
  },
  {
    id: 'cecr-b21-grammar-conj-m3-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Reconstruis : « Même si c\u2019est difficile, il doit essayer. »',
    promptEn: 'Rebuild: «Even if it\u2019s difficult, he must try.»',
    sentence: 'Even if it\u2019s difficult, he must try.',
    sentenceEn: 'Even if it\u2019s difficult, he must try.',
    choices: ['\u5373\u4F7F', '\u5F88\u96BE', '\u4ED6', '\u4E5F\u8981', '\u8BD5'],
    correctIndex: 0,
    explanation: 'Ordre : 即使 + 很难 + 他 + 也要 + 试.',
    explanationEn: 'Order: 即使 + 很难 + 他 + 也要 + 试.'
  },
  {
    id: 'cecr-b21-grammar-conj-m3-err1',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Erreur : « 虽然下雨，我也去 »',
    promptEn: 'Error: «虽然下雨，我也去»',
    sentence: '\u867D\u7136 / \u4E0B\u96E8 / \u6211 / \u4E5F / \u53BB',
    choices: ['\u867D\u7136', '\u4E0B\u96E8', '\u6211', '\u4E5F'],
    correctIndex: 3,
    explanation: '虽然 appelle 但是/可是/还是, pas 也. Correct : 虽然下雨，我还是去.',
    explanationEn: '虽然 pairs with 但是/可是/还是, not 也. Correct: 虽然下雨，我还是去.'
  },
  {
    id: 'cecr-b21-grammar-conj-m3-trans1',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « Même dans le pire des cas, on réussira. »',
    promptEn: 'Translate: «Even in the worst case, we\u2019ll succeed.»',
    choices: [
      '\u6700\u574F\u7684\u60C5\u51B5\uFF0C\u6211\u4EEC\u6210\u529F\u3002',
      '\u54EA\u6015\u6700\u574F\u7684\u60C5\u51B5\uFF0C\u6211\u4EEC\u4E5F\u4F1A\u6210\u529F\u3002',
      '\u867D\u7136\u60C5\u51B5\u574F\uFF0C\u6211\u4EEC\u6210\u529F\u3002',
      '\u6211\u4EEC\u4E0D\u4F1A\u6210\u529F\u3002'
    ],
    correctIndex: 1,
    explanation: '哪怕 insiste sur le cas extrême : « même dans le pire ».',
    explanationEn: '哪怕 stresses the extreme case: «even in the worst».'
  },
  {
    id: 'cecr-b21-grammar-conj-m3-gq2',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: '« 虽然下雨了 » vs « 即使下雨 » :',
    promptEn: '«虽然下雨了» vs «即使下雨»:',
    choices: [
      'Identique de sens',
      '虽然下雨了 : il pleut effectivement ; 即使下雨 : hypothèse (qu\u2019il pleuve ou non)',
      'Inversé',
      'Seulement au passé'
    ],
    correctIndex: 1,
    explanation: 'C\u2019est la règle d\u2019or : 虽然 = fait réel, 即使 = hypothèse.',
    explanationEn: 'Golden rule: 虽然 = real fact, 即使 = hypothesis.'
  },
  {
    id: 'cecr-b21-grammar-conj-m3-mcq2',
    type: 'mcq',
    category: 'grammar',
    prompt: 'Laquelle est SOUTENUE (littéraire) ?',
    promptEn: 'Which is FORMAL (literary)?',
    choices: ['\u5C31\u7B97', '\u5373\u4F7F', '\u7EB5\u7136', '\u54EA\u6015'],
    correctIndex: 2,
    explanation: '纵然 est très soutenu/écrit. 即使 est neutre, 就算 oral, 哪怕 emphatique.',
    explanationEn: '纵然 is very formal/written. 即使 neutral, 就算 oral, 哪怕 emphatic.'
  }
];

const B21_GRAMMAR_CONJ_M4: LessonV2Exercise[] = [
  {
    id: 'cecr-b21-grammar-conj-m4-gq1',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Nuance entre 虽然 et 尽管 :',
    promptEn: 'Nuance between 虽然 and 尽管:',
    choices: [
      'Identiques',
      '虽然 neutre ; 尽管 concession appuyée avec effort',
      '尽管 signifie « à cause de »',
      '虽然 est plus oral'
    ],
    correctIndex: 1,
    explanation: '虽然 = neutre. 尽管 = effort malgré l\u2019obstacle.',
    explanationEn: '虽然 = neutral. 尽管 = effort despite obstacle.'
  },
  {
    id: 'cecr-b21-grammar-conj-m4-fill1',
    type: 'fill',
    category: 'grammar',
    prompt: 'Complète.',
    promptEn: 'Fill in.',
    sentence: '___\u5F88\u7D2F\uFF0C\u4ED6\u8FD8\u662F\u575A\u6301\u3002',
    sentenceEn: 'Although very tired, he still persists.',
    choices: ['\u5C3D\u7BA1', '\u56E0\u4E3A', '\u4E3A\u4E86', '\u800C\u4E14'],
    correctIndex: 0,
    explanation: 'Contexte d\u2019effort → 尽管 (« bien qu\u2019épuisé, il persévère »).',
    explanationEn: 'Effort context → 尽管.'
  },
  {
    id: 'cecr-b21-grammar-conj-m4-mcq1',
    type: 'mcq',
    category: 'grammar',
    prompt: '« 你尽管说 » signifie :',
    promptEn: '«你尽管说» means:',
    choices: [
      'Bien que tu parles',
      'Parle sans retenue',
      'Ne parle pas',
      'Parle fort'
    ],
    correctIndex: 1,
    explanation: '尽管 seul (pas de 2\u1d49 clause) = adverbe « n\u2019hésitez pas à, librement ».',
    explanationEn: 'Standalone 尽管 (no 2nd clause) = adverb «feel free to».'
  },
  {
    id: 'cecr-b21-grammar-conj-m4-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Reconstruis : « Bien qu\u2019il pleuve, nous sommes quand même allés. »',
    promptEn: 'Rebuild: «Although it rained, we still went.»',
    sentence: 'Although it rained, we still went.',
    sentenceEn: 'Although it rained, we still went.',
    choices: ['\u867D\u7136', '\u4E0B\u96E8\u4E86', '\u6211\u4EEC', '\u8FD8\u662F', '\u53BB\u4E86'],
    correctIndex: 0,
    explanation: 'Ordre : 虽然 + 下雨了 + 我们 + 还是 + 去了.',
    explanationEn: 'Order: 虽然 + 下雨了 + 我们 + 还是 + 去了.'
  },
  {
    id: 'cecr-b21-grammar-conj-m4-err1',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Quelle version est FAUTIVE ?',
    promptEn: 'Which version is WRONG?',
    sentence: '\u9009\u62E9 :',
    choices: [
      '\u867D\u7136\u53BB\uFF0C\u4F46\u662F\u6CA1\u6210\u529F\u3002',
      '\u5C3D\u7BA1\u96BE\uFF0C\u6211\u4EEC\u8FD8\u662F\u6210\u529F\u4E86\u3002',
      '\u867D\u7136\u96BE\uFF0C\u7136\u800C\u6211\u4EEC\u6210\u529F\u3002',
      '\u867D\u7136\u96BE\uFF0C\u6211\u4EEC\u6210\u529F\u4E86\u3002'
    ],
    correctIndex: 3,
    explanation: '虽然 requiert un connecteur (但是/可是/然而/还是) dans la deuxième partie.',
    explanationEn: '虽然 needs a connector (但是/可是/然而/还是) in the second clause.'
  },
  {
    id: 'cecr-b21-grammar-conj-m4-trans1',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « Bien que fatigué, il continue à étudier. »',
    promptEn: 'Translate: «Although tired, he keeps studying.»',
    choices: [
      '\u4ED6\u7D2F\u4E86\uFF0C\u4ED6\u5B66\u4E60\u3002',
      '\u5C3D\u7BA1\u7D2F\uFF0C\u4ED6\u8FD8\u662F\u7EE7\u7EED\u5B66\u4E60\u3002',
      '\u4ED6\u4E0D\u7D2F\uFF0C\u4ED6\u5B66\u4E60\u3002',
      '\u4ED6\u53EA\u5B66\u4E60\u3002'
    ],
    correctIndex: 1,
    explanation: 'Nuance d\u2019effort → 尽管 + 还是. Parfait pour « bien que fatigué, continue ».',
    explanationEn: 'Effort nuance → 尽管 + 还是.'
  },
  {
    id: 'cecr-b21-grammar-conj-m4-gq2',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: '« 然而 » appartient à quel registre ?',
    promptEn: 'What register is «然而»?',
    choices: ['Oral familier', '\u00c9crit/soutenu', 'Registres mélangés', 'Argotique'],
    correctIndex: 1,
    explanation: '然而 (« toutefois, cependant ») est écrit/formel ; à l\u2019oral on préfère 但是.',
    explanationEn: '然而 is formal/written; orally we prefer 但是.'
  },
  {
    id: 'cecr-b21-grammar-conj-m4-mcq2',
    type: 'mcq',
    category: 'grammar',
    prompt: 'Laquelle est INCORRECTE comme seule phrase ?',
    promptEn: 'Which is INCORRECT as a standalone sentence?',
    choices: [
      '\u4F60\u5C3D\u7BA1\u8BF4\u3002',
      '\u5C3D\u7BA1\u96BE\u3002',
      '\u4ED6\u5C3D\u7BA1\u53BB\u3002',
      '\u4ED6\u5C3D\u7BA1\u8BD5\u8BD5\u3002'
    ],
    correctIndex: 1,
    explanation: '尽管 conjonction demande une 2\u1d49 clause ; 尽管 adv. (« n\u2019hésite pas ») modifie un verbe mais pas un adjectif seul.',
    explanationEn: '尽管 conj. needs a 2nd clause; 尽管 adv. modifies a verb, not a bare adjective.'
  }
];

// ============================================================================
//  B2.1 — VOCABULAIRE : tech / env / economics (10 modules)
// ============================================================================

const B21_TECH_M1: LessonV2Exercise[] = [
  {
    id: 'cecr-b21-tech-m1-mcq1',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Que signifie 浏览器 (liúlǎnqì) ?',
    promptEn: 'What does 浏览器 mean?',
    choices: ['Clavier', 'Site web', 'Navigateur', 'Mot de passe'],
    correctIndex: 2,
    explanation: '浏览器 = navigateur (ex : Chrome, Firefox).',
    explanationEn: '浏览器 = browser (e.g. Chrome, Firefox).'
  },
  {
    id: 'cecr-b21-tech-m1-mcq2',
    type: 'mcq',
    category: 'vocabulary',
    prompt: '« Se connecter à son compte » :',
    promptEn: '«Log into one\u2019s account»:',
    choices: ['\u6CE8\u518C\u8D26\u53F7', '\u767B\u5F55\u8D26\u53F7', '\u4E0A\u7F51\u8D26\u53F7', '\u4E0B\u8F7D\u8D26\u53F7'],
    correctIndex: 1,
    explanation: '登录 = se connecter. 注册 = s\u2019inscrire.',
    explanationEn: '登录 = log in. 注册 = sign up.'
  },
  {
    id: 'cecr-b21-tech-m1-fill1',
    type: 'fill',
    category: 'vocabulary',
    prompt: 'Complète.',
    promptEn: 'Fill in.',
    sentence: '\u6211\u5FD8\u4E86\u6211\u7684___\uFF0C\u7121\u6CD5\u767B\u5F55\u3002',
    sentenceEn: 'I forgot my password, can\u2019t log in.',
    choices: ['\u5BC6\u7801', '\u8D26\u53F7', '\u7F51\u9875', '\u624B\u673A'],
    correctIndex: 0,
    explanation: '密码 = mot de passe. 账号 = compte (identifiant).',
    explanationEn: '密码 = password. 账号 = account.'
  },
  {
    id: 'cecr-b21-tech-m1-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: '\uD83D\uDD0A « xiàzài » — traduction ?',
    promptEn: '\uD83D\uDD0A «xiàzài» — translation?',
    choices: ['T\u00e9l\u00e9charger', 'T\u00e9l\u00e9verser', 'Installer', 'Effacer'],
    correctIndex: 0,
    explanation: '\u4E0B\u8F7D (xi\u00e0z\u00e0i) = t\u00e9l\u00e9charger.',
    explanationEn: '\u4E0B\u8F7D = download.'
  },
  {
    id: 'cecr-b21-tech-m1-order1',
    type: 'order',
    category: 'vocabulary',
    prompt: 'Reconstruis : « Je dois d\u2019abord m\u2019inscrire sur ce site. »',
    promptEn: 'Rebuild: «I must first sign up on this site.»',
    sentence: 'I must first sign up on this site.',
    sentenceEn: 'I must first sign up on this site.',
    choices: ['\u6211', '\u5F97\u5148', '\u5728\u8FD9\u4E2A\u7F51\u7AD9', '\u6CE8\u518C'],
    correctIndex: 0,
    explanation: 'Ordre : 我 + 得先 + 在这个网站 + 注册.',
    explanationEn: 'Order: 我 + 得先 + 在这个网站 + 注册.'
  },
  {
    id: 'cecr-b21-tech-m1-trans1',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « Le WeChat est omniprésent en Chine. »',
    promptEn: 'Translate: «WeChat is ubiquitous in China.»',
    choices: [
      '\u5FAE\u4FE1\u5728\u4E2D\u56FD\u65E0\u5904\u4E0D\u5728\u3002',
      '\u4E2D\u56FD\u6709\u5FAE\u4FE1\u3002',
      '\u5FAE\u4FE1\u5F88\u4E2D\u56FD\u3002',
      '\u6211\u4E0D\u7528\u5FAE\u4FE1\u3002'
    ],
    correctIndex: 0,
    explanation: '无处不在 = omniprésent. 微信在中国无处不在.',
    explanationEn: '无处不在 = ubiquitous.'
  },
  {
    id: 'cecr-b21-tech-m1-mcq3',
    type: 'mcq',
    category: 'reading',
    prompt: 'En Chine, WeChat sert principalement à :',
    promptEn: 'In China, WeChat is mainly used for:',
    choices: [
      'Uniquement envoyer des messages',
      'Messagerie, paiement, ID, mini-programmes',
      'Naviguer sur internet',
      'Jouer aux jeux vidéo'
    ],
    correctIndex: 1,
    explanation: 'WeChat est un super-app : tout-en-un (messaging, pay, ID, services).',
    explanationEn: 'WeChat is a super-app: all-in-one (messaging, pay, ID, services).'
  },
  {
    id: 'cecr-b21-tech-m1-mcq4',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Synonyme de 网 (wǎng) :',
    promptEn: 'Synonym of 网 (wǎng):',
    choices: ['\u7535\u8111', '\u7F51\u7EDC', '\u624B\u673A', '\u952E\u76D8'],
    correctIndex: 1,
    explanation: '网 est l\u2019abréviation de 网络 (réseau/web).',
    explanationEn: '网 is the short form of 网络 (network/web).'
  }
];

const B21_TECH_M2: LessonV2Exercise[] = [
  {
    id: 'cecr-b21-tech-m2-mcq1',
    type: 'mcq',
    category: 'vocabulary',
    prompt: '人工智能 (rén gōng zhì néng) signifie :',
    promptEn: '人工智能 means:',
    choices: ['Robotique', 'Intelligence artificielle', 'Algorithmique', 'Big data'],
    correctIndex: 1,
    explanation: '人工 (fabriqué par l\u2019homme) + 智能 (intelligence) = IA.',
    explanationEn: '人工 (man-made) + 智能 (intelligence) = AI.'
  },
  {
    id: 'cecr-b21-tech-m2-mcq2',
    type: 'mcq',
    category: 'vocabulary',
    prompt: '算法 :',
    promptEn: '算法:',
    choices: ['Donn\u00e9es', 'Algorithme', 'Nuage', 'Internet'],
    correctIndex: 1,
    explanation: '算 (calculer) + 法 (m\u00e9thode) = algorithme.',
    explanationEn: '算 (compute) + 法 (method) = algorithm.'
  },
  {
    id: 'cecr-b21-tech-m2-fill1',
    type: 'fill',
    category: 'vocabulary',
    prompt: 'Complète.',
    promptEn: 'Fill in.',
    sentence: '\u5728\u4E2D\u56FD\uFF0C___\u8BC6\u522B\u7528\u4E8E\u652F\u4ED8\u548C\u5B89\u68C0\u3002',
    sentenceEn: 'In China, facial recognition is used for payment and security checks.',
    choices: ['\u5927\u6570\u636E', '\u4EBA\u8138', '\u4E91', '\u7B97\u6CD5'],
    correctIndex: 1,
    explanation: '人脸识别 = reconnaissance faciale.',
    explanationEn: '人脸识别 = facial recognition.'
  },
  {
    id: 'cecr-b21-tech-m2-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: '\uD83D\uDD0A « dàshùjù » :',
    promptEn: '\uD83D\uDD0A «dàshùjù»:',
    choices: ['Big data', 'Cloud', 'Algorithme', 'LLM'],
    correctIndex: 0,
    explanation: '\u5927\u6570\u636E (d\u00e0sh\u00f9j\u00f9) = big data.',
    explanationEn: '\u5927\u6570\u636E = big data.'
  },
  {
    id: 'cecr-b21-tech-m2-order1',
    type: 'order',
    category: 'vocabulary',
    prompt: 'Reconstruis : « L\u2019IA change nos vies quotidiennes. »',
    promptEn: 'Rebuild: «AI changes our daily lives.»',
    sentence: 'AI changes our daily lives.',
    sentenceEn: 'AI changes our daily lives.',
    choices: ['\u4EBA\u5DE5\u667A\u80FD', '\u6539\u53D8', '\u6211\u4EEC\u7684', '\u65E5\u5E38\u751F\u6D3B'],
    correctIndex: 0,
    explanation: 'Ordre : 人工智能 + 改变 + 我们的 + 日常生活.',
    explanationEn: 'Order: 人工智能 + 改变 + 我们的 + 日常生活.'
  },
  {
    id: 'cecr-b21-tech-m2-trans1',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « La vie privée est un grand débat. »',
    promptEn: 'Translate: «Privacy is a big debate.»',
    choices: [
      '\u9690\u79C1\u662F\u4E00\u4E2A\u5F88\u5927\u7684\u8BA8\u8BBA\u3002',
      '\u76D1\u63A7\u91CD\u8981\u3002',
      '\u6211\u6CA1\u6709\u9690\u79C1\u3002',
      '\u4EBA\u8138\u8BC6\u522B\u4E0D\u91CD\u8981\u3002'
    ],
    correctIndex: 0,
    explanation: '隐私 = vie privée. 讨论 = débat/discussion.',
    explanationEn: '隐私 = privacy. 讨论 = debate/discussion.'
  },
  {
    id: 'cecr-b21-tech-m2-mcq3',
    type: 'mcq',
    category: 'reading',
    prompt: 'Quel LLM est développé par Alibaba ?',
    promptEn: 'Which LLM is developed by Alibaba?',
    choices: ['\u6587\u5FC3\u4E00\u8A00', '\u901A\u4E49\u5343\u95EE', 'DeepSeek', 'ChatGPT'],
    correctIndex: 1,
    explanation: '通义千问 (Qwen) est d\u2019Alibaba. 文心一言 (Wenxin) est de Baidu.',
    explanationEn: '通义千问 (Qwen) is Alibaba\u2019s. 文心一言 (Wenxin) is Baidu\u2019s.'
  },
  {
    id: 'cecr-b21-tech-m2-mcq4',
    type: 'mcq',
    category: 'vocabulary',
    prompt: '云计算 se traduit par :',
    promptEn: '云计算 translates as:',
    choices: ['Cloud computing', 'Internet des objets', 'Réalité virtuelle', 'Blockchain'],
    correctIndex: 0,
    explanation: '云 (nuage) + 计算 (calcul) = cloud computing.',
    explanationEn: '云 (cloud) + 计算 (compute) = cloud computing.'
  }
];

const B21_TECH_M3: LessonV2Exercise[] = [
  {
    id: 'cecr-b21-tech-m3-mcq1',
    type: 'mcq',
    category: 'vocabulary',
    prompt: '扫码 (sǎomǎ) signifie :',
    promptEn: '扫码 means:',
    choices: ['Payer en cash', 'Scanner un QR code', 'Fermer un compte', 'Appeler un taxi'],
    correctIndex: 1,
    explanation: '扫 (scanner) + 码 (code) = scanner un QR code, omniprésent en Chine.',
    explanationEn: '扫 (scan) + 码 (code) = scan a QR code, ubiquitous in China.'
  },
  {
    id: 'cecr-b21-tech-m3-mcq2',
    type: 'mcq',
    category: 'vocabulary',
    prompt: '淘宝 est :',
    promptEn: '淘宝 is:',
    choices: [
      'Une banque',
      'La plateforme e-commerce d\u2019Alibaba (\u00e9quivalent eBay)',
      'Une application de chat',
      'Un r\u00e9seau social'
    ],
    correctIndex: 1,
    explanation: 'Taobao est le marketplace grand-public d\u2019Alibaba.',
    explanationEn: 'Taobao is Alibaba\u2019s consumer marketplace.'
  },
  {
    id: 'cecr-b21-tech-m3-fill1',
    type: 'fill',
    category: 'vocabulary',
    prompt: 'Complète.',
    promptEn: 'Fill in.',
    sentence: '\u53CC\u5341\u4E00\u662F\u4E16\u754C\u4E0A\u6700\u5927\u7684___\u8282\u3002',
    sentenceEn: 'Double 11 is the world\u2019s biggest shopping day.',
    choices: ['\u7F51\u8D2D', '\u8F6C\u8D26', '\u5916\u5356', '\u6536\u5165'],
    correctIndex: 0,
    explanation: '网购 = achats en ligne. 双十一 est le plus gros jour de 网购 au monde.',
    explanationEn: '网购 = online shopping. 双十一 is the world\u2019s biggest 网购 day.'
  },
  {
    id: 'cecr-b21-tech-m3-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: '\uD83D\uDD0A « w\u00e0im\u00e0i » :',
    promptEn: '\uD83D\uDD0A «w\u00e0im\u00e0i»:',
    choices: ['Colis express', 'Livraison de repas', 'Paiement mobile', 'Achat group\u00e9'],
    correctIndex: 1,
    explanation: '\u5916\u5356 = livraison de repas (Meituan, Ele.me).',
    explanationEn: '\u5916\u5356 = food delivery (Meituan, Ele.me).'
  },
  {
    id: 'cecr-b21-tech-m3-order1',
    type: 'order',
    category: 'vocabulary',
    prompt: 'Reconstruis : « J\u2019utilise WeChat Pay pour payer partout. »',
    promptEn: 'Rebuild: «I use WeChat Pay to pay everywhere.»',
    sentence: 'I use WeChat Pay to pay everywhere.',
    sentenceEn: 'I use WeChat Pay to pay everywhere.',
    choices: ['\u6211', '\u7528\u5FAE\u4FE1\u652F\u4ED8', '\u5230\u5904', '\u4ED8\u6B3E'],
    correctIndex: 0,
    explanation: 'Ordre : 我 + 用微信支付 + 到处 + 付款.',
    explanationEn: 'Order: 我 + 用微信支付 + 到处 + 付款.'
  },
  {
    id: 'cecr-b21-tech-m3-trans1',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « Le cash est presque disparu dans les grandes villes. »',
    promptEn: 'Translate: «Cash has almost disappeared in big cities.»',
    choices: [
      '\u5927\u57CE\u5E02\u6CA1\u6709\u94B1\u3002',
      '\u5728\u5927\u57CE\u5E02\uFF0C\u73B0\u91D1\u51E0\u4E4E\u6D88\u5931\u4E86\u3002',
      '\u6211\u4E0D\u7528\u73B0\u91D1\u3002',
      '\u73B0\u91D1\u5F88\u6D41\u884C\u3002'
    ],
    correctIndex: 1,
    explanation: '现金 = cash. 几乎消失了 = a presque disparu.',
    explanationEn: '现金 = cash. 几乎消失了 = has almost disappeared.'
  },
  {
    id: 'cecr-b21-tech-m3-mcq3',
    type: 'mcq',
    category: 'reading',
    prompt: '拼多多 se distingue de Taobao par :',
    promptEn: '拼多多 differs from Taobao by:',
    choices: [
      'Ses produits de luxe',
      'Ses achats groupés low-cost',
      'Son focus B2B',
      'Son service de livraison express'
    ],
    correctIndex: 1,
    explanation: 'Pinduoduo cible le marché bas de gamme avec des prix écrasés par les achats groupés.',
    explanationEn: 'Pinduoduo targets the low-end market with crushed prices via group buys.'
  },
  {
    id: 'cecr-b21-tech-m3-mcq4',
    type: 'mcq',
    category: 'vocabulary',
    prompt: '转账 :',
    promptEn: '转账:',
    choices: ['Retirer de l\u2019argent', 'Faire un virement', 'Ouvrir un compte', 'Payer par carte'],
    correctIndex: 1,
    explanation: '转账 = virement (bank transfer).',
    explanationEn: '转账 = bank transfer.'
  }
];

const B21_TECH_M4: LessonV2Exercise[] = [
  {
    id: 'cecr-b21-tech-m4-mcq1',
    type: 'mcq',
    category: 'vocabulary',
    prompt: '物联网 :',
    promptEn: '物联网:',
    choices: ['Internet mobile', 'Internet des objets (IoT)', 'R\u00e9seau 5G', 'Ville intelligente'],
    correctIndex: 1,
    explanation: '\u7269 (objet) + \u8054 (connecter) + \u7F51 (r\u00e9seau) = IoT.',
    explanationEn: '\u7269 (object) + \u8054 (connect) + \u7F51 (network) = IoT.'
  },
  {
    id: 'cecr-b21-tech-m4-mcq2',
    type: 'mcq',
    category: 'vocabulary',
    prompt: '智慧城市 :',
    promptEn: '智慧城市:',
    choices: ['Ville historique', 'Ville intelligente (smart city)', 'Ville portuaire', 'Ville jumelée'],
    correctIndex: 1,
    explanation: '智慧 (intelligent) + 城市 (ville) = smart city.',
    explanationEn: '智慧 (smart) + 城市 (city) = smart city.'
  },
  {
    id: 'cecr-b21-tech-m4-fill1',
    type: 'fill',
    category: 'vocabulary',
    prompt: 'Complète.',
    promptEn: 'Fill in.',
    sentence: '\u5171\u4EAB___\u5728\u4E2D\u56FD\u6BCF\u4E2A\u5927\u57CE\u5E02\u90FD\u6709\u3002',
    sentenceEn: 'Shared bikes are in every big Chinese city.',
    choices: ['\u5355\u8F66', '\u6C7D\u8F66', '\u5145\u7535\u5B9D', '\u96E8\u4F1E'],
    correctIndex: 0,
    explanation: '共享单车 = vélos en libre-service (Meituan, Hello).',
    explanationEn: '共享单车 = shared bikes (Meituan, Hello).'
  },
  {
    id: 'cecr-b21-tech-m4-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: '\uD83D\uDD0A « zh\u00ecn\u00e9ng ji\u0101j\u016b » :',
    promptEn: '\uD83D\uDD0A «zh\u00ecn\u00e9ng ji\u0101j\u016b»:',
    choices: ['Ville intelligente', 'Maison intelligente', 'Voiture connect\u00e9e', 'Usine 4.0'],
    correctIndex: 1,
    explanation: '\u667A\u80FD\u5BB6\u5C45 = maison intelligente.',
    explanationEn: '\u667A\u80FD\u5BB6\u5C45 = smart home.'
  },
  {
    id: 'cecr-b21-tech-m4-order1',
    type: 'order',
    category: 'vocabulary',
    prompt: 'Reconstruis : « La Chine est leader mondial de la 5G. »',
    promptEn: 'Rebuild: «China is the world leader in 5G.»',
    sentence: 'China is the world leader in 5G.',
    sentenceEn: 'China is the world leader in 5G.',
    choices: ['\u4E2D\u56FD', '\u5728', '5G\u9886\u57DF', '\u662F\u4E16\u754C\u9886\u5148'],
    correctIndex: 0,
    explanation: 'Ordre : 中国 + 在 + 5G领域 + 是世界领先.',
    explanationEn: 'Order: 中国 + 在 + 5G领域 + 是世界领先.'
  },
  {
    id: 'cecr-b21-tech-m4-trans1',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « La batterie portable partagée est pratique. »',
    promptEn: 'Translate: «Shared power banks are practical.»',
    choices: [
      '\u5171\u4EAB\u5145\u7535\u5B9D\u5F88\u65B9\u4FBF\u3002',
      '\u6211\u6CA1\u6709\u5145\u7535\u5B9D\u3002',
      '\u5171\u4EAB\u5355\u8F66\u5F88\u65B9\u4FBF\u3002',
      '\u7535\u6C60\u6CA1\u6709\u7528\u3002'
    ],
    correctIndex: 0,
    explanation: '充电宝 = batterie externe. 共享充电宝 = version partagée.',
    explanationEn: '充电宝 = power bank. 共享充电宝 = shared version.'
  },
  {
    id: 'cecr-b21-tech-m4-mcq3',
    type: 'mcq',
    category: 'reading',
    prompt: '华为 est principalement connue pour :',
    promptEn: '华为 is mainly known for:',
    choices: [
      'E-commerce',
      'Équipements télécoms et 5G',
      'Jeux vidéo',
      'Automobile'
    ],
    correctIndex: 1,
    explanation: 'Huawei est le leader mondial des équipements télécoms et de la 5G.',
    explanationEn: 'Huawei is the global leader in telecom equipment and 5G.'
  },
  {
    id: 'cecr-b21-tech-m4-mcq4',
    type: 'mcq',
    category: 'vocabulary',
    prompt: '« Partage » en chinois :',
    promptEn: '«Sharing» in Chinese:',
    choices: ['\u5171\u4EAB', '\u5171\u540C', '\u5206\u522B', '\u4EA4\u6362'],
    correctIndex: 0,
    explanation: '\u5171\u4EAB = partage ; p\u00e9p\u00e8re de l\u2019\u00e9conomie du partage.',
    explanationEn: '\u5171\u4EAB = sharing; root of the sharing economy.'
  }
];

const B21_ENV_M1: LessonV2Exercise[] = [
  {
    id: 'cecr-b21-env-m1-mcq1',
    type: 'mcq',
    category: 'vocabulary',
    prompt: '雾霾 (wùmái) :',
    promptEn: '雾霾:',
    choices: ['Pluie acide', 'Brouillard pollu\u00e9 / smog', 'Temp\u00eate de sable', 'Canicule'],
    correctIndex: 1,
    explanation: '\u96FE (brouillard) + \u973E (particules) = smog dense, connu des hivers p\u00e9kinois.',
    explanationEn: '\u96FE (fog) + \u973E (haze) = smog, known from Beijing winters.'
  },
  {
    id: 'cecr-b21-env-m1-mcq2',
    type: 'mcq',
    category: 'vocabulary',
    prompt: '空气质量 :',
    promptEn: '空气质量:',
    choices: ['Humidit\u00e9', 'Qualit\u00e9 de l\u2019air', 'Pression atmosph\u00e9rique', 'Temp\u00e9rature'],
    correctIndex: 1,
    explanation: '\u7A7A\u6C14 (air) + \u8D28\u91CF (qualit\u00e9) = air quality.',
    explanationEn: '\u7A7A\u6C14 (air) + \u8D28\u91CF (quality) = air quality.'
  },
  {
    id: 'cecr-b21-env-m1-fill1',
    type: 'fill',
    category: 'vocabulary',
    prompt: 'Complète.',
    promptEn: 'Fill in.',
    sentence: '\u5317\u4EAC\u51AC\u5929PM2.5\u5F88\u9AD8\uFF0C\u5E94\u8BE5\u6234___\u3002',
    sentenceEn: 'Beijing\u2019s PM2.5 is high in winter, we should wear a mask.',
    choices: ['\u53E3\u7F69', '\u773C\u955C', '\u5E3D\u5B50', '\u9632\u5BD2\u670D'],
    correctIndex: 0,
    explanation: '口罩 = masque facial (protection contre pollution ou virus).',
    explanationEn: '口罩 = face mask (protection against pollution/viruses).'
  },
  {
    id: 'cecr-b21-env-m1-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: '\uD83D\uDD0A « ji\u0103np\u00e1i » :',
    promptEn: '\uD83D\uDD0A «ji\u0103np\u00e1i»:',
    choices: ['Augmenter les \u00e9missions', 'R\u00e9duire les \u00e9missions', 'Produire plus', 'Transporter'],
    correctIndex: 1,
    explanation: '\u51CF\u6392 = r\u00e9duction des \u00e9missions.',
    explanationEn: '\u51CF\u6392 = emissions reduction.'
  },
  {
    id: 'cecr-b21-env-m1-order1',
    type: 'order',
    category: 'vocabulary',
    prompt: 'Reconstruis : « La Chine est leader mondial du solaire. »',
    promptEn: 'Rebuild: «China leads the world in solar.»',
    sentence: 'China leads the world in solar.',
    sentenceEn: 'China leads the world in solar.',
    choices: ['\u4E2D\u56FD', '\u5728\u592A\u9633\u80FD\u9886\u57DF', '\u662F', '\u4E16\u754C\u9886\u5148'],
    correctIndex: 0,
    explanation: 'Ordre : 中国 + 在太阳能领域 + 是 + 世界领先.',
    explanationEn: 'Order: 中国 + 在太阳能领域 + 是 + 世界领先.'
  },
  {
    id: 'cecr-b21-env-m1-trans1',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « La pollution de l\u2019air est un grave problème. »',
    promptEn: 'Translate: «Air pollution is a serious problem.»',
    choices: [
      '\u7A7A\u6C14\u6C61\u67D3\u662F\u4E00\u4E2A\u4E25\u91CD\u7684\u95EE\u9898\u3002',
      '\u7A7A\u6C14\u5F88\u597D\u3002',
      '\u6211\u4E0D\u5728\u4E4E\u3002',
      '\u6C61\u67D3\u6CA1\u6709\u95EE\u9898\u3002'
    ],
    correctIndex: 0,
    explanation: '严重 = grave. 污染 = pollution.',
    explanationEn: '严重 = serious. 污染 = pollution.'
  },
  {
    id: 'cecr-b21-env-m1-mcq3',
    type: 'mcq',
    category: 'reading',
    prompt: 'L\u2019AQI à Pékin dans les années 2013-2015 dépassait régulièrement :',
    promptEn: 'Beijing\u2019s AQI in 2013-2015 regularly exceeded:',
    choices: ['100', '300', '500', '1000'],
    correctIndex: 2,
    explanation: 'Pics à > 500 (« au-delà de l\u2019échelle ») étaient réguliers.',
    explanationEn: 'Peaks above 500 («off the scale») were common.'
  },
  {
    id: 'cecr-b21-env-m1-mcq4',
    type: 'mcq',
    category: 'vocabulary',
    prompt: '环保 = ?',
    promptEn: '环保 = ?',
    choices: [
      'Enveloppe',
      'Protection environnementale',
      'Circulation',
      'Chauffage'
    ],
    correctIndex: 1,
    explanation: '环境 (environnement) + 保护 (protection) → abrégé en 环保.',
    explanationEn: '环境 (environment) + 保护 (protection) → short form 环保.'
  }
];

const B21_ENV_M2: LessonV2Exercise[] = [
  {
    id: 'cecr-b21-env-m2-mcq1',
    type: 'mcq',
    category: 'vocabulary',
    prompt: '全球变暖 :',
    promptEn: '全球变暖:',
    choices: ['Réchauffement planétaire', 'Refroidissement global', 'Pollution des océans', 'Déforestation'],
    correctIndex: 0,
    explanation: '全球 (global) + 变暖 (se r\u00e9chauffer) = r\u00e9chauffement planétaire.',
    explanationEn: '全球 (global) + 变暖 (warm up) = global warming.'
  },
  {
    id: 'cecr-b21-env-m2-mcq2',
    type: 'mcq',
    category: 'vocabulary',
    prompt: '温室气体 :',
    promptEn: '温室气体:',
    choices: ['Gaz naturels', 'Gaz \u00e0 effet de serre', 'Gaz toxiques', 'Gaz nobles'],
    correctIndex: 1,
    explanation: '温室 (serre) + 气体 (gaz) = GES.',
    explanationEn: '温室 (greenhouse) + 气体 (gas) = GHG.'
  },
  {
    id: 'cecr-b21-env-m2-fill1',
    type: 'fill',
    category: 'vocabulary',
    prompt: 'Complète.',
    promptEn: 'Fill in.',
    sentence: '\u4E2D\u56FD\u8BA1\u5212\u5728\u4E8C\u96F6\u516D\u96F6\u5E74\u5B9E\u73B0___\u3002',
    sentenceEn: 'China plans to achieve carbon neutrality by 2060.',
    choices: ['\u78B3\u4E2D\u548C', '\u78B3\u8FBE\u5CF0', '\u51CF\u6392', '\u73AF\u4FDD'],
    correctIndex: 0,
    explanation: '碳中和 = neutralité carbone. 碳达峰 = pic carbone (2030).',
    explanationEn: '碳中和 = carbon neutrality. 碳达峰 = peak carbon (2030).'
  },
  {
    id: 'cecr-b21-env-m2-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: '\uD83D\uDD0A « j\u00edduan ti\u0101nq\u00ec » :',
    promptEn: '\uD83D\uDD0A «j\u00edduan ti\u0101nq\u00ec»:',
    choices: ['Temps normal', 'M\u00e9t\u00e9o extr\u00eame', 'Temp\u00e9rature douce', 'Changement saisonnier'],
    correctIndex: 1,
    explanation: '\u6781\u7AEF\u5929\u6C14 = m\u00e9t\u00e9o extr\u00eame (canicules, ouragans).',
    explanationEn: '\u6781\u7AEF\u5929\u6C14 = extreme weather (heatwaves, hurricanes).'
  },
  {
    id: 'cecr-b21-env-m2-order1',
    type: 'order',
    category: 'vocabulary',
    prompt: 'Reconstruis : « Les glaciers fondent rapidement. »',
    promptEn: 'Rebuild: «Glaciers are melting rapidly.»',
    sentence: 'Glaciers are melting rapidly.',
    sentenceEn: 'Glaciers are melting rapidly.',
    choices: ['\u51B0\u5DDD', '\u6B63\u5728', '\u8FC5\u901F', '\u878D\u5316'],
    correctIndex: 0,
    explanation: 'Ordre : 冰川 + 正在 + 迅速 + 融化.',
    explanationEn: 'Order: 冰川 + 正在 + 迅速 + 融化.'
  },
  {
    id: 'cecr-b21-env-m2-trans1',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « Il faut réduire les émissions de CO2. »',
    promptEn: 'Translate: «We must reduce CO2 emissions.»',
    choices: [
      '\u6211\u4EEC\u5FC5\u987B\u51CF\u5C11\u4E8C\u6C27\u5316\u78B3\u6392\u653E\u3002',
      '\u6211\u4EEC\u5FC5\u987B\u589E\u52A0\u6392\u653E\u3002',
      '\u4E8C\u6C27\u5316\u78B3\u4E0D\u91CD\u8981\u3002',
      '\u6211\u4EEC\u4E0D\u7528\u51CF\u6392\u3002'
    ],
    correctIndex: 0,
    explanation: '减少 = réduire. 二氧化碳 = CO2. 排放 = émissions.',
    explanationEn: '减少 = reduce. 二氧化碳 = CO2. 排放 = emissions.'
  },
  {
    id: 'cecr-b21-env-m2-mcq3',
    type: 'mcq',
    category: 'reading',
    prompt: 'Xi Jinping a annoncé les objectifs carbone en :',
    promptEn: 'Xi Jinping announced carbon goals in:',
    choices: ['2015', '2018', '2020', '2023'],
    correctIndex: 2,
    explanation: 'Septembre 2020, devant l\u2019ONU.',
    explanationEn: 'September 2020, at the UN.'
  },
  {
    id: 'cecr-b21-env-m2-mcq4',
    type: 'mcq',
    category: 'vocabulary',
    prompt: '海平面上升 :',
    promptEn: '海平面上升:',
    choices: ['Montée des mers', 'Chute des marées', 'Courant marin', 'Tempête'],
    correctIndex: 0,
    explanation: '海平面 (niveau de la mer) + 上升 (monter) = rising sea level.',
    explanationEn: '海平面 (sea level) + 上升 (rise) = rising sea level.'
  }
];

const B21_ENV_M3: LessonV2Exercise[] = [
  {
    id: 'cecr-b21-env-m3-mcq1',
    type: 'mcq',
    category: 'vocabulary',
    prompt: '垃圾分类 a été imposé à Shanghai en :',
    promptEn: '垃圾分类 was imposed in Shanghai in:',
    choices: ['2015', '2019', '2021', '2023'],
    correctIndex: 1,
    explanation: 'Juillet 2019, Shanghai a imposé le tri strict, du jamais vu en Chine.',
    explanationEn: 'July 2019, Shanghai imposed strict sorting, unprecedented in China.'
  },
  {
    id: 'cecr-b21-env-m3-mcq2',
    type: 'mcq',
    category: 'vocabulary',
    prompt: '可回收物 :',
    promptEn: '可回收物:',
    choices: ['D\u00e9chets dangereux', 'D\u00e9chets recyclables', 'D\u00e9chets humides', 'D\u00e9chets secs'],
    correctIndex: 1,
    explanation: '\u53EF (pouvoir) + \u56DE\u6536 (recycler) + \u7269 (objet) = recyclables.',
    explanationEn: '\u53EF (can) + \u56DE\u6536 (recycle) + \u7269 (item) = recyclables.'
  },
  {
    id: 'cecr-b21-env-m3-fill1',
    type: 'fill',
    category: 'vocabulary',
    prompt: 'Complète.',
    promptEn: 'Fill in.',
    sentence: '\u7535\u6C60\u548C\u836F\u54C1\u5C5E\u4E8E___\u3002',
    sentenceEn: 'Batteries and medicines are hazardous waste.',
    choices: ['\u6709\u5BB3\u5783\u573E', '\u6E7F\u5783\u573E', '\u5E72\u5783\u573E', '\u53EF\u56DE\u6536\u7269'],
    correctIndex: 0,
    explanation: '有害垃圾 = déchets dangereux (piles, médicaments).',
    explanationEn: '有害垃圾 = hazardous waste (batteries, medicines).'
  },
  {
    id: 'cecr-b21-env-m3-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: '\uD83D\uDD0A « y\u00ed c\u00ec x\u00ecng » :',
    promptEn: '\uD83D\uDD0A «y\u00ed c\u00ec x\u00ecng»:',
    choices: ['Durable', 'Jetable / \u00e0 usage unique', 'Multi-usage', 'R\u00e9utilisable'],
    correctIndex: 1,
    explanation: '\u4E00\u6B21\u6027 (une fois + qualit\u00e9) = jetable.',
    explanationEn: '\u4E00\u6B21\u6027 (one-time quality) = disposable.'
  },
  {
    id: 'cecr-b21-env-m3-order1',
    type: 'order',
    category: 'vocabulary',
    prompt: 'Reconstruis : « À Shanghai, il y a une amende en cas d\u2019erreur de tri. »',
    promptEn: 'Rebuild: «In Shanghai, there\u2019s a fine for sorting mistakes.»',
    sentence: 'In Shanghai, there\u2019s a fine for sorting mistakes.',
    sentenceEn: 'In Shanghai, there\u2019s a fine for sorting mistakes.',
    choices: ['\u5728\u4E0A\u6D77', '\u5206\u7C7B\u9519\u4E86', '\u4F1A', '\u7F5A\u6B3E'],
    correctIndex: 0,
    explanation: 'Ordre : 在上海 + 分类错了 + 会 + 罚款.',
    explanationEn: 'Order: 在上海 + 分类错了 + 会 + 罚款.'
  },
  {
    id: 'cecr-b21-env-m3-trans1',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « J\u2019apporte toujours un sac écolo. »',
    promptEn: 'Translate: «I always bring an eco-bag.»',
    choices: [
      '\u6211\u6603\u662F\u5E26\u73AF\u4FDD\u888B\u3002',
      '\u6211\u4ECE\u4E0D\u5E26\u888B\u5B50\u3002',
      '\u6211\u4E70\u4E00\u6B21\u6027\u888B\u3002',
      '\u6211\u4E0D\u559C\u6B22\u888B\u5B50\u3002'
    ],
    correctIndex: 0,
    explanation: '总是 = toujours. 环保袋 = sac écologique.',
    explanationEn: '总是 = always. 环保袋 = eco-bag.'
  },
  {
    id: 'cecr-b21-env-m3-mcq3',
    type: 'mcq',
    category: 'reading',
    prompt: 'Combien de catégories de tri à Shanghai ?',
    promptEn: 'How many sorting categories in Shanghai?',
    choices: ['2', '3', '4', '5'],
    correctIndex: 2,
    explanation: 'Quatre : 可回收物 / 有害垃圾 / 湿垃圾 / 干垃圾.',
    explanationEn: 'Four: 可回收物 / 有害垃圾 / 湿垃圾 / 干垃圾.'
  },
  {
    id: 'cecr-b21-env-m3-mcq4',
    type: 'mcq',
    category: 'vocabulary',
    prompt: '塑料袋 :',
    promptEn: '塑料袋:',
    choices: ['Sac en cuir', 'Sac en plastique', 'Sac en tissu', 'Sac en papier'],
    correctIndex: 1,
    explanation: '塑料 (plastique) + 袋 (sac) = sac plastique.',
    explanationEn: '塑料 (plastic) + 袋 (bag) = plastic bag.'
  }
];

const B21_ECONOMICS_M1: LessonV2Exercise[] = [
  {
    id: 'cecr-b21-economics-m1-mcq1',
    type: 'mcq',
    category: 'vocabulary',
    prompt: '通货膨胀 :',
    promptEn: '通货膨胀:',
    choices: ['Déflation', 'Inflation', 'Récession', 'Croissance'],
    correctIndex: 1,
    explanation: '通货 (monnaie) + 膨胀 (gonfler) = inflation.',
    explanationEn: '通货 (currency) + 膨胀 (swell) = inflation.'
  },
  {
    id: 'cecr-b21-economics-m1-mcq2',
    type: 'mcq',
    category: 'vocabulary',
    prompt: '股市 :',
    promptEn: '股市:',
    choices: ['March\u00e9 immobilier', 'Bourse', 'Supermarch\u00e9', 'March\u00e9 du travail'],
    correctIndex: 1,
    explanation: '\u80A1 (actions) + \u5E02 (march\u00e9) = bourse / stock market.',
    explanationEn: '\u80A1 (stocks) + \u5E02 (market) = stock market.'
  },
  {
    id: 'cecr-b21-economics-m1-fill1',
    type: 'fill',
    category: 'vocabulary',
    prompt: 'Complète.',
    promptEn: 'Fill in.',
    sentence: '\u6211\u5411\u94F6\u884C\u7533\u8BF7\u4E86\u4E00\u7B14___\u3002',
    sentenceEn: 'I applied for a loan from the bank.',
    choices: ['\u8D37\u6B3E', '\u5229\u7387', '\u80A1\u7968', '\u7ECF\u6D4E'],
    correctIndex: 0,
    explanation: '贷款 = prêt. 利率 = taux d\u2019intérêt.',
    explanationEn: '贷款 = loan. 利率 = interest rate.'
  },
  {
    id: 'cecr-b21-economics-m1-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: '\uD83D\uDD0A « j\u012bngj\u00ec z\u0113ngzh\u01ce\u014fng » :',
    promptEn: '\uD83D\uDD0A «j\u012bngj\u00ec z\u0113ngzh\u01ceng»:',
    choices: ['Crise \u00e9conomique', 'Croissance \u00e9conomique', 'Inflation', 'D\u00e9flation'],
    correctIndex: 1,
    explanation: '\u7ECF\u6D4E\u589E\u957F = croissance \u00e9conomique.',
    explanationEn: '\u7ECF\u6D4E\u589E\u957F = economic growth.'
  },
  {
    id: 'cecr-b21-economics-m1-order1',
    type: 'order',
    category: 'vocabulary',
    prompt: 'Reconstruis : « La Chine a connu une croissance à deux chiffres. »',
    promptEn: 'Rebuild: «China had double-digit growth.»',
    sentence: 'China had double-digit growth.',
    sentenceEn: 'China had double-digit growth.',
    choices: ['\u4E2D\u56FD', '\u7ECF\u5386\u8FC7', '\u4E24\u4F4D\u6570', '\u7684\u589E\u957F'],
    correctIndex: 0,
    explanation: 'Ordre : 中国 + 经历过 + 两位数 + 的增长.',
    explanationEn: 'Order: 中国 + 经历过 + 两位数 + 的增长.'
  },
  {
    id: 'cecr-b21-economics-m1-trans1',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « Les taux d\u2019intérêt augmentent. »',
    promptEn: 'Translate: «Interest rates are rising.»',
    choices: [
      '\u5229\u7387\u4E0A\u5347\u3002',
      '\u5229\u7387\u4E0B\u964D\u3002',
      '\u94B6\u884C\u5173\u95ED\u3002',
      '\u7ECF\u6D4E\u9000\u5316\u3002'
    ],
    correctIndex: 0,
    explanation: '利率 = taux. 上升 = monter.',
    explanationEn: '利率 = rate. 上升 = rise.'
  },
  {
    id: 'cecr-b21-economics-m1-mcq3',
    type: 'mcq',
    category: 'reading',
    prompt: 'La Chine a connu une croissance à deux chiffres entre :',
    promptEn: 'China had double-digit growth between:',
    choices: ['1980-2000', '1990-2010', '2000-2015', '2010-2020'],
    correctIndex: 1,
    explanation: 'Environ 1990-2010, puis ralentissement structurel.',
    explanationEn: 'Roughly 1990-2010, then structural slowdown.'
  },
  {
    id: 'cecr-b21-economics-m1-mcq4',
    type: 'mcq',
    category: 'vocabulary',
    prompt: '国内生产总值 abrégé :',
    promptEn: '国内生产总值 abbreviated:',
    choices: ['GDP (PIB)', 'CPI', 'VAT', 'M2'],
    correctIndex: 0,
    explanation: 'Littéralement « valeur totale de production intérieure » = GDP.',
    explanationEn: 'Literally «total domestic production value» = GDP.'
  }
];

const B21_ECONOMICS_M2: LessonV2Exercise[] = [
  {
    id: 'cecr-b21-economics-m2-mcq1',
    type: 'mcq',
    category: 'vocabulary',
    prompt: '独角兽 dans le contexte start-up :',
    promptEn: '独角兽 in start-up context:',
    choices: ['Start-up en difficulté', 'Start-up valorisée > 1 milliard $', 'Jeune entrepreneur', 'Concurrent international'],
    correctIndex: 1,
    explanation: 'Unicorn = start-up privée valorisée > 1 G$.',
    explanationEn: 'Unicorn = private start-up valued > $1B.'
  },
  {
    id: 'cecr-b21-economics-m2-mcq2',
    type: 'mcq',
    category: 'vocabulary',
    prompt: '创始人 :',
    promptEn: '创始人:',
    choices: ['Investisseur', 'Fondateur', 'Actionnaire', 'Client'],
    correctIndex: 1,
    explanation: '创始 (fonder/originer) + 人 (personne) = fondateur.',
    explanationEn: '创始 (found) + 人 (person) = founder.'
  },
  {
    id: 'cecr-b21-economics-m2-fill1',
    type: 'fill',
    category: 'vocabulary',
    prompt: 'Complète.',
    promptEn: 'Fill in.',
    sentence: '\u4ED6\u4EEC\u5728B\u8F6E___\u4E861\u4EBF\u7F8E\u5143\u3002',
    sentenceEn: 'They raised $100M in Series B.',
    choices: ['\u878D\u8D44', '\u6295\u8D44', '\u4E0A\u5E02', '\u521B\u4E1A'],
    correctIndex: 0,
    explanation: '融资 = lever des fonds.',
    explanationEn: '融资 = raise funds.'
  },
  {
    id: 'cecr-b21-economics-m2-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: '\uD83D\uDD0A « sh\u00e0ngsh\u00ec » :',
    promptEn: '\uD83D\uDD0A «sh\u00e0ngsh\u00ec»:',
    choices: ['Acheter en ville', 'Introduction en bourse (IPO)', 'March\u00e9 noir', 'Exporter'],
    correctIndex: 1,
    explanation: '\u4E0A\u5E02 = IPO (monter au march\u00e9).',
    explanationEn: '\u4E0A\u5E02 = IPO (go public).'
  },
  {
    id: 'cecr-b21-economics-m2-order1',
    type: 'order',
    category: 'vocabulary',
    prompt: 'Reconstruis : « Zhongguancun est surnommé la Silicon Valley de Pékin. »',
    promptEn: 'Rebuild: «Zhongguancun is called Beijing\u2019s Silicon Valley.»',
    sentence: 'Zhongguancun is called Beijing\u2019s Silicon Valley.',
    sentenceEn: 'Zhongguancun is called Beijing\u2019s Silicon Valley.',
    choices: ['\u4E2D\u5173\u6751', '\u88AB\u79F0\u4E3A', '\u5317\u4EAC\u7684', '\u7845\u8C37'],
    correctIndex: 0,
    explanation: 'Ordre : 中关村 + 被称为 + 北京的 + 硅谷.',
    explanationEn: 'Order: 中关村 + 被称为 + 北京的 + 硅谷.'
  },
  {
    id: 'cecr-b21-economics-m2-trans1',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « Créer son entreprise demande beaucoup de courage. »',
    promptEn: 'Translate: «Starting a company requires a lot of courage.»',
    choices: [
      '\u521B\u4E1A\u9700\u8981\u5F88\u5927\u7684\u52C7\u6C14\u3002',
      '\u521B\u4E1A\u5F88\u5BB9\u6613\u3002',
      '\u6211\u4E0D\u60F3\u521B\u4E1A\u3002',
      '\u52C7\u6C14\u4E0D\u91CD\u8981\u3002'
    ],
    correctIndex: 0,
    explanation: '创业 = entreprendre. 勇气 = courage.',
    explanationEn: '创业 = start a business. 勇气 = courage.'
  },
  {
    id: 'cecr-b21-economics-m2-mcq3',
    type: 'mcq',
    category: 'reading',
    prompt: '深圳 est connue comme :',
    promptEn: '深圳 is known as:',
    choices: ['Capitale politique', 'Cœur tech de la Chine', 'Centre financier', 'Cité historique'],
    correctIndex: 1,
    explanation: 'Shenzhen : HQ de Tencent, BYD, Huawei, SF Express.',
    explanationEn: 'Shenzhen: HQ of Tencent, BYD, Huawei, SF Express.'
  },
  {
    id: 'cecr-b21-economics-m2-mcq4',
    type: 'mcq',
    category: 'vocabulary',
    prompt: '风险投资 :',
    promptEn: '风险投资:',
    choices: ['Prêt bancaire', 'Capital-risque (VC)', 'Assurance', 'Investissement immobilier'],
    correctIndex: 1,
    explanation: '风险 (risque) + 投资 (investir) = VC.',
    explanationEn: '风险 (risk) + 投资 (invest) = VC.'
  }
];

const B21_ECONOMICS_M3: LessonV2Exercise[] = [
  {
    id: 'cecr-b21-economics-m3-mcq1',
    type: 'mcq',
    category: 'vocabulary',
    prompt: '996 fait référence à :',
    promptEn: '996 refers to:',
    choices: [
      '9 tâches par jour',
      'Travailler 9h-21h, 6 jours/semaine',
      'Salaire 996 yuans',
      '996 employés'
    ],
    correctIndex: 1,
    explanation: '9 (9h) + 9 (21h) + 6 (6 jours). Célèbre dans la tech chinoise.',
    explanationEn: '9 (9am) + 9 (9pm) + 6 (6 days). Famous in Chinese tech.'
  },
  {
    id: 'cecr-b21-economics-m3-mcq2',
    type: 'mcq',
    category: 'vocabulary',
    prompt: '跳槽 :',
    promptEn: '跳槽:',
    choices: ['\u00caTre promu', 'Changer de job', 'Prendre sa retraite', 'Fonder sa boîte'],
    correctIndex: 1,
    explanation: '跳 (sauter) + 槽 (mangeoire) — « sauter d\u2019une mangeoire à l\u2019autre » = changer de job.',
    explanationEn: '跳 (jump) + 槽 (trough) — «jump trough» = change jobs.'
  },
  {
    id: 'cecr-b21-economics-m3-fill1',
    type: 'fill',
    category: 'vocabulary',
    prompt: 'Complète.',
    promptEn: 'Fill in.',
    sentence: '\u516C\u53F8\u4ECA\u5E74\u8FDB\u884C\u4E86\u5927\u89C4\u6A21___\u3002',
    sentenceEn: 'The company had massive layoffs this year.',
    choices: ['\u88C1\u5458', '\u5347\u804C', '\u52A0\u85AA', '\u8DF3\u69FD'],
    correctIndex: 0,
    explanation: '裁员 = licenciement/plan social.',
    explanationEn: '裁员 = layoff.'
  },
  {
    id: 'cecr-b21-economics-m3-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: '\uD83D\uDD0A « gu\u0101nxi » :',
    promptEn: '\uD83D\uDD0A «gu\u0101nxi»:',
    choices: ['Salaire', 'Connexions / r\u00e9seau', 'Contrat', 'Heures suppl\u00e9mentaires'],
    correctIndex: 1,
    explanation: '\u5173\u7CFB = connexions/r\u00e9seau personnel, central dans la culture chinoise.',
    explanationEn: '\u5173\u7CFB = personal connections/network, central in Chinese culture.'
  },
  {
    id: 'cecr-b21-economics-m3-order1',
    type: 'order',
    category: 'vocabulary',
    prompt: 'Reconstruis : « J\u2019ai été promu et j\u2019ai eu une augmentation. »',
    promptEn: 'Rebuild: «I got promoted and got a raise.»',
    sentence: 'I got promoted and got a raise.',
    sentenceEn: 'I got promoted and got a raise.',
    choices: ['\u6211', '\u5347\u804C\u4E86', '\u4E5F', '\u52A0\u85AA\u4E86'],
    correctIndex: 0,
    explanation: 'Ordre : 我 + 升职了 + 也 + 加薪了.',
    explanationEn: 'Order: 我 + 升职了 + 也 + 加薪了.'
  },
  {
    id: 'cecr-b21-economics-m3-trans1',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « 996 est un sujet très débattu. »',
    promptEn: 'Translate: «996 is a highly debated topic.»',
    choices: [
      '996\u662F\u4E00\u4E2A\u70ED\u70B9\u8BDD\u9898\u3002',
      '\u6211\u4E0D\u559C\u6B22996\u3002',
      '996\u4E0D\u91CD\u8981\u3002',
      '\u6240\u6709\u4EBA\u90FD\u8D5E\u540C996\u3002'
    ],
    correctIndex: 0,
    explanation: '热点话题 = sujet br\u00fblant/très débattu.',
    explanationEn: '热点话题 = hot topic/widely debated.'
  },
  {
    id: 'cecr-b21-economics-m3-mcq3',
    type: 'mcq',
    category: 'reading',
    prompt: 'Qui a défendu le 996 comme « une bénédiction » en 2019 ?',
    promptEn: 'Who defended 996 as a «blessing» in 2019?',
    choices: ['Pony Ma', 'Jack Ma', 'Robin Li', 'Liu Qiangdong'],
    correctIndex: 1,
    explanation: 'Jack Ma (fondateur d\u2019Alibaba) l\u2019a défendu, provoquant un tollé.',
    explanationEn: 'Jack Ma (Alibaba founder) defended it, causing outrage.'
  },
  {
    id: 'cecr-b21-economics-m3-mcq4',
    type: 'mcq',
    category: 'vocabulary',
    prompt: '下属 :',
    promptEn: '下属:',
    choices: ['Sup\u00e9rieur', 'Subordonn\u00e9', 'Coll\u00e8gue', 'Client'],
    correctIndex: 1,
    explanation: '\u4E0B (inf\u00e9rieur) + \u5C5E (appartenir) = subordonn\u00e9.',
    explanationEn: '\u4E0B (below) + \u5C5E (belong) = subordinate.'
  }
];

// ============================================================================
//  Export consolidé — clés = IDs de modules
// ============================================================================

// ============================================================================
//  B2.2 — BATCH INITIAL (arts, santé, débat, grammaire structurale)
// ============================================================================
//
//  Volume : 6 modules × 8 items = 48 items. Seed pour la passe B2.2 —
//  même gabarit que B2.1 (types variés, `category` systématique, sentence
//  quand c'est du fill/error-correction). À étendre aux 10 modules restants
//  dans une passe ultérieure.
// ============================================================================

const B22_ARTS_M1: LessonV2Exercise[] = [
  {
    id: 'cecr-b22-arts-m1-mcq1',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Que signifie 水墨画 ?',
    promptEn: 'What does 水墨画 mean?',
    choices: ['calligraphie', 'peinture à l\'encre', 'sculpture', 'porcelaine'],
    correctIndex: 1,
    explanation: '水墨画 (shuǐ mò huà) désigne la peinture traditionnelle chinoise à l\'encre et à l\'eau.',
    explanationEn: '水墨画 (shuǐ mò huà) refers to traditional Chinese ink-and-water painting.'
  },
  {
    id: 'cecr-b22-arts-m1-mcq2',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Lequel est un opéra traditionnel chinois ?',
    promptEn: 'Which is a traditional Chinese opera?',
    choices: ['相声', '京剧', '评书', '快板'],
    correctIndex: 1,
    explanation: '京剧 (jīngjù) est l\'opéra de Pékin, forme d\'opéra traditionnelle emblématique.',
    explanationEn: '京剧 (jīngjù) is Peking Opera, the most emblematic traditional opera form.'
  },
  {
    id: 'cecr-b22-arts-m1-fill',
    type: 'fill',
    category: 'vocabulary',
    prompt: 'Complète la phrase.',
    promptEn: 'Fill in the blank.',
    sentence: '他从小就学习___，擅长画山水。',
    sentenceEn: 'He has studied ___ since childhood and excels at landscape painting.',
    choices: ['书法', '水墨画', '摄影', '陶艺'],
    correctIndex: 1,
    explanation: '水墨画 — peinture à l\'encre, cohérent avec « peindre des paysages » (山水).',
    explanationEn: '水墨画 — ink painting, consistent with painting landscapes (山水).'
  },
  {
    id: 'cecr-b22-arts-m1-gq1',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Dans « 这幅画是由王先生画的 », que marque la structure 是…的 ?',
    promptEn: 'In 这幅画是由王先生画的, what does 是…的 mark?',
    choices: [
      'le futur',
      'l\'emphase sur l\'agent de l\'action',
      'une hypothèse',
      'une obligation'
    ],
    correctIndex: 1,
    explanation: '是…的 met l\'accent sur un élément circonstanciel (ici l\'agent 由王先生).',
    explanationEn: '是…的 emphasizes a circumstantial element (here the agent 由王先生).'
  },
  {
    id: 'cecr-b22-arts-m1-order',
    type: 'order',
    category: 'translation',
    prompt: 'Remets dans l\'ordre : « Cette œuvre est d\'un style très particulier ».',
    promptEn: 'Rearrange: "This work is in a very distinctive style."',
    choices: ['这件作品', '的', '风格', '非常', '独特'],
    correctIndex: 4,
    explanation: 'Phrase complète : 这件作品的风格非常独特。',
    explanationEn: 'Full sentence: 这件作品的风格非常独特。'
  },
  {
    id: 'cecr-b22-arts-m1-translation',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « L\'opéra de Pékin combine chant, danse et arts martiaux. »',
    promptEn: 'Translate: "Peking Opera combines singing, dance and martial arts."',
    choices: [
      '京剧结合了唱歌、跳舞和武术。',
      '京剧是唱歌。',
      '京剧很有名。',
      '京剧在北京。'
    ],
    correctIndex: 0,
    explanation: '结合 (jiéhé) = combiner, 唱歌 = chanter, 跳舞 = danser, 武术 = arts martiaux.',
    explanationEn: '结合 (jiéhé) = to combine; matches singing/dancing/martial arts.'
  },
  {
    id: 'cecr-b22-arts-m1-listening',
    type: 'mcq',
    category: 'listening',
    prompt: '🔊 « 书法 » signifie :',
    promptEn: '🔊 "书法" means:',
    choices: ['poésie', 'calligraphie', 'musique', 'théâtre'],
    correctIndex: 1,
    explanation: '书法 (shūfǎ) — calligraphie, art de l\'écriture.',
    explanationEn: '书法 (shūfǎ) — calligraphy, the art of writing.'
  },
  {
    id: 'cecr-b22-arts-m1-error',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Quelle phrase est INCORRECTE ?',
    promptEn: 'Which sentence is INCORRECT?',
    choices: [
      '他的画很有名。',
      '这幅画是他画的。',
      '他画画得很好。',
      '他画画的很好。'
    ],
    correctIndex: 3,
    explanation: 'Le complément de degré se construit avec 得 (structurel), pas 的. Correct : 他画画得很好.',
    explanationEn: 'Degree complement uses 得 (structural marker), not 的. Correct: 他画画得很好.'
  }
];

const B22_ARTS_M2: LessonV2Exercise[] = [
  {
    id: 'cecr-b22-arts-m2-mcq1',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Que désigne 非物质文化遗产 ?',
    promptEn: 'What does 非物质文化遗产 refer to?',
    choices: [
      'patrimoine culturel immatériel',
      'patrimoine bâti',
      'monnaie ancienne',
      'musée national'
    ],
    correctIndex: 0,
    explanation: '非物质文化遗产 (fēi wùzhì wénhuà yíchǎn) — patrimoine culturel immatériel (ICH UNESCO).',
    explanationEn: '非物质文化遗产 — intangible cultural heritage (UNESCO ICH).'
  },
  {
    id: 'cecr-b22-arts-m2-mcq2',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Le 春节 correspond à quelle fête ?',
    promptEn: 'Which festival does 春节 refer to?',
    choices: ['Fête des lanternes', 'Nouvel An chinois', 'Fête des bateaux-dragons', 'Fête de la mi-automne'],
    correctIndex: 1,
    explanation: '春节 (chūnjié) est le Nouvel An chinois (lunaire), fête la plus importante.',
    explanationEn: '春节 (chūnjié) is Chinese (Lunar) New Year, the most important festival.'
  },
  {
    id: 'cecr-b22-arts-m2-fill',
    type: 'fill',
    category: 'grammar',
    prompt: 'Complète avec le bon connecteur formel.',
    promptEn: 'Fill in with the correct formal connector.',
    sentence: '___这项传统非常古老，我们仍在努力保护它。',
    sentenceEn: '___ this tradition is very old, we are still working to preserve it.',
    choices: ['因为', '尽管', '所以', '而且'],
    correctIndex: 1,
    explanation: '尽管 = « bien que » introduit une concession avant la principale.',
    explanationEn: '尽管 = "although" introduces a concession before the main clause.'
  },
  {
    id: 'cecr-b22-arts-m2-gq1',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Quel est le sens de « 既……又…… » ?',
    promptEn: 'What is the meaning of "既……又……"?',
    choices: [
      'ni… ni…',
      'à la fois… et… (deux qualités cumulées)',
      'soit… soit…',
      'non seulement… mais en plus…'
    ],
    correctIndex: 1,
    explanation: '既 A 又 B cumule deux qualités/états (« à la fois A et B »).',
    explanationEn: '既 A 又 B combines two simultaneous qualities ("both A and B").'
  },
  {
    id: 'cecr-b22-arts-m2-translation',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « La calligraphie est à la fois un art et une discipline. »',
    promptEn: 'Translate: "Calligraphy is both an art and a discipline."',
    choices: [
      '书法既是一门艺术，又是一种修养。',
      '书法是艺术。',
      '书法很难。',
      '书法和修养一样。'
    ],
    correctIndex: 0,
    explanation: '既…又… rend « à la fois » ; 修养 = discipline intérieure / culture de soi.',
    explanationEn: '既…又… for "both…and…"; 修养 = inner discipline / self-cultivation.'
  },
  {
    id: 'cecr-b22-arts-m2-order',
    type: 'order',
    category: 'translation',
    prompt: 'Remets dans l\'ordre : « Cette tradition a été transmise de génération en génération. »',
    promptEn: 'Rearrange: "This tradition has been passed down from generation to generation."',
    choices: ['这个传统', '一代', '一代', '地', '传', '了下来'],
    correctIndex: 5,
    explanation: 'Phrase complète : 这个传统一代一代地传了下来。 La réduplication 一代一代 exprime « chaque génération ».',
    explanationEn: 'Full sentence: 这个传统一代一代地传了下来。 Reduplication 一代一代 expresses "every generation".'
  },
  {
    id: 'cecr-b22-arts-m2-mcq3',
    type: 'mcq',
    category: 'reading',
    prompt: 'Dans « 这种工艺濒临失传 », que signifie 濒临失传 ?',
    promptEn: 'In 这种工艺濒临失传, what does 濒临失传 mean?',
    choices: [
      'est très populaire',
      'est au bord de la disparition',
      'est protégé',
      'est enseigné à l\'université'
    ],
    correctIndex: 1,
    explanation: '濒临 = au bord de, 失传 = (savoir-faire) qui se perd.',
    explanationEn: '濒临 = on the verge of; 失传 = (craft) being lost.'
  },
  {
    id: 'cecr-b22-arts-m2-error',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Quelle phrase contient une erreur ?',
    promptEn: 'Which sentence contains an error?',
    choices: [
      '他对传统文化很感兴趣。',
      '他很感兴趣传统文化。',
      '他对传统文化感兴趣。',
      '他非常感兴趣于传统文化。'
    ],
    correctIndex: 1,
    explanation: '感兴趣 se construit avec 对 : « 对 + objet + 感兴趣 ». La phrase 2 met 感兴趣 avant l\'objet sans 对.',
    explanationEn: '感兴趣 takes 对: "对 + object + 感兴趣". Sentence 2 wrongly puts 感兴趣 before the object without 对.'
  }
];

const B22_HEALTH_M1: LessonV2Exercise[] = [
  {
    id: 'cecr-b22-health-m1-mcq1',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Que signifie 心理健康 ?',
    promptEn: 'What does 心理健康 mean?',
    choices: ['santé mentale', 'cardiologie', 'psychologie sociale', 'hygiène'],
    correctIndex: 0,
    explanation: '心理健康 (xīnlǐ jiànkāng) — santé mentale / psychologique.',
    explanationEn: '心理健康 (xīnlǐ jiànkāng) — mental / psychological health.'
  },
  {
    id: 'cecr-b22-health-m1-mcq2',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Lequel signifie « burnout professionnel » ?',
    promptEn: 'Which means "professional burnout"?',
    choices: ['过劳', '失眠', '焦虑', '疲劳'],
    correctIndex: 0,
    explanation: '过劳 (guòláo) désigne l\'épuisement professionnel, 过劳死 = karōshi.',
    explanationEn: '过劳 (guòláo) refers to work-induced exhaustion / burnout (过劳死 = karōshi).'
  },
  {
    id: 'cecr-b22-health-m1-fill',
    type: 'fill',
    category: 'vocabulary',
    prompt: 'Complète.',
    promptEn: 'Fill in.',
    sentence: '长期的压力容易导致___和抑郁。',
    sentenceEn: 'Long-term stress easily leads to ___ and depression.',
    choices: ['运动', '焦虑', '健身', '睡觉'],
    correctIndex: 1,
    explanation: '焦虑 = anxiété, cohérent avec « pression » et « dépression ».',
    explanationEn: '焦虑 = anxiety, consistent with "pressure" and "depression".'
  },
  {
    id: 'cecr-b22-health-m1-gq1',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Dans « 压力越大，身体越容易出问题 », quelle structure est utilisée ?',
    promptEn: 'In 压力越大，身体越容易出问题, which structure is used?',
    choices: [
      '越……越…… (proportion)',
      '又……又……',
      '一边……一边……',
      '除了……以外……'
    ],
    correctIndex: 0,
    explanation: '越 A 越 B exprime « plus A, plus B » (corrélation).',
    explanationEn: '越 A 越 B expresses correlation ("the more A, the more B").'
  },
  {
    id: 'cecr-b22-health-m1-translation',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « Plus il travaille, moins il a de temps pour se reposer. »',
    promptEn: 'Translate: "The more he works, the less time he has to rest."',
    choices: [
      '他工作越多，休息的时间越少。',
      '他工作很多。',
      '他不工作。',
      '他有时间休息。'
    ],
    correctIndex: 0,
    explanation: 'Structure 越……越…… pour la proportion.',
    explanationEn: 'Structure 越……越…… for proportionality.'
  },
  {
    id: 'cecr-b22-health-m1-order',
    type: 'order',
    category: 'translation',
    prompt: 'Remets dans l\'ordre : « Les médecins recommandent de dormir au moins sept heures par nuit. »',
    promptEn: 'Rearrange: "Doctors recommend sleeping at least seven hours a night."',
    choices: ['医生', '建议', '每晚', '至少', '睡', '七个小时'],
    correctIndex: 5,
    explanation: 'Phrase complète : 医生建议每晚至少睡七个小时。',
    explanationEn: 'Full sentence: 医生建议每晚至少睡七个小时。'
  },
  {
    id: 'cecr-b22-health-m1-listening',
    type: 'mcq',
    category: 'listening',
    prompt: '🔊 « 焦虑 » signifie :',
    promptEn: '🔊 "焦虑" means:',
    choices: ['joyeux', 'anxieux', 'concentré', 'fatigué'],
    correctIndex: 1,
    explanation: '焦虑 (jiāolǜ) — anxieux, angoissé.',
    explanationEn: '焦虑 (jiāolǜ) — anxious.'
  },
  {
    id: 'cecr-b22-health-m1-error',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Quelle phrase est INCORRECTE ?',
    promptEn: 'Which sentence is INCORRECT?',
    choices: [
      '我最近压力很大。',
      '我最近很大压力。',
      '最近我感到压力很大。',
      '最近压力让我很累。'
    ],
    correctIndex: 1,
    explanation: 'L\'ordre correct est « sujet + 压力 + 很大 ». « 很大压力 » met l\'adjectif avant le nom sans structure 的.',
    explanationEn: 'Correct order is "subject + 压力 + 很大". "很大压力" places adjective before noun without 的.'
  }
];

const B22_DEBATE_M1: LessonV2Exercise[] = [
  {
    id: 'cecr-b22-debate-m1-mcq1',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Que signifie 立场 dans un débat ?',
    promptEn: 'What does 立场 mean in a debate?',
    choices: ['résumé', 'position (défendue)', 'conclusion', 'exemple'],
    correctIndex: 1,
    explanation: '立场 (lìchǎng) — position, point de vue défendu.',
    explanationEn: '立场 (lìchǎng) — position, stance being defended.'
  },
  {
    id: 'cecr-b22-debate-m1-mcq2',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Lequel signifie « réfuter » ?',
    promptEn: 'Which means "to refute"?',
    choices: ['支持', '反驳', '同意', '解释'],
    correctIndex: 1,
    explanation: '反驳 (fǎnbó) — réfuter, contrer un argument.',
    explanationEn: '反驳 (fǎnbó) — to refute, counter an argument.'
  },
  {
    id: 'cecr-b22-debate-m1-gq1',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Dans « 与其说他懒，不如说他累了 », que rend 与其……不如…… ?',
    promptEn: 'In 与其说他懒，不如说他累了, what does 与其……不如…… convey?',
    choices: [
      'une comparaison classique',
      'une préférence / une reformulation plus juste',
      'une négation',
      'une hypothèse'
    ],
    correctIndex: 1,
    explanation: '与其 A 不如 B = « plutôt que A, mieux vaut B » (préférence ou reformulation plus juste).',
    explanationEn: '与其 A 不如 B = "rather than A, better to B" (preference or a more accurate reformulation).'
  },
  {
    id: 'cecr-b22-debate-m1-fill',
    type: 'fill',
    category: 'grammar',
    prompt: 'Complète avec le bon connecteur formel.',
    promptEn: 'Fill in with the correct formal connector.',
    sentence: '我们___不应该忽视这个问题，___必须认真对待。',
    sentenceEn: 'We ___ should not ignore this issue, ___ must treat it seriously.',
    choices: ['不但/而且', '不是/就是', '不仅/反而', '如果/就'],
    correctIndex: 0,
    explanation: '不但 A 而且 B = non seulement A, mais en plus B (renforcement).',
    explanationEn: '不但 A 而且 B = "not only A but also B" (reinforcement).'
  },
  {
    id: 'cecr-b22-debate-m1-translation',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « Je ne partage absolument pas votre point de vue. »',
    promptEn: 'Translate: "I absolutely don\'t share your point of view."',
    choices: [
      '我完全不同意您的观点。',
      '我同意您的观点。',
      '我不知道您的观点。',
      '我不喜欢您。'
    ],
    correctIndex: 0,
    explanation: '完全不 = absolument pas ; 同意 = être d\'accord ; 观点 = point de vue.',
    explanationEn: '完全不 = absolutely not; 同意 = to agree; 观点 = viewpoint.'
  },
  {
    id: 'cecr-b22-debate-m1-order',
    type: 'order',
    category: 'translation',
    prompt: 'Remets dans l\'ordre : « Cet argument n\'est ni convaincant ni logique. »',
    promptEn: 'Rearrange: "This argument is neither convincing nor logical."',
    choices: ['这个论点', '既', '没有说服力', '，', '也', '不合逻辑'],
    correctIndex: 5,
    explanation: 'Phrase complète : 这个论点既没有说服力，也不合逻辑。 (既 A 也 B pour ni A ni B dans la négation.)',
    explanationEn: 'Full sentence: 这个论点既没有说服力，也不合逻辑。 (既 A 也 B for "neither … nor" in negation.)'
  },
  {
    id: 'cecr-b22-debate-m1-mcq3',
    type: 'mcq',
    category: 'reading',
    prompt: 'Dans « 他的论据站不住脚 », que signifie cette expression ?',
    promptEn: 'In 他的论据站不住脚, what does the expression mean?',
    choices: [
      'ses arguments sont solides',
      'ses arguments ne tiennent pas la route',
      'il refuse de parler',
      'il est fatigué'
    ],
    correctIndex: 1,
    explanation: '站不住脚 (littéralement « ne peut pas se tenir debout ») = ne tient pas la route.',
    explanationEn: '站不住脚 (lit. "can\'t stand on its feet") = doesn\'t hold up.'
  },
  {
    id: 'cecr-b22-debate-m1-error',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Laquelle contient une erreur de registre (trop familier pour un débat) ?',
    promptEn: 'Which contains a register error (too informal for a debate)?',
    choices: [
      '我认为这个观点值得商榷。',
      '这个观点真的很扯淡。',
      '我对此持保留意见。',
      '这一点确实值得讨论。'
    ],
    correctIndex: 1,
    explanation: '扯淡 est très familier / vulgaire, inapproprié en registre formel de débat.',
    explanationEn: '扯淡 is very informal/vulgar and inappropriate in formal debate register.'
  }
];

const B22_GRAMMAR_STRUCTURE_M1: LessonV2Exercise[] = [
  {
    id: 'cecr-b22-grammar-structure-m1-gq1',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Dans « 被 + agent + verbe », quelle est la fonction de 被 ?',
    promptEn: 'In "被 + agent + verb", what is the function of 被?',
    choices: [
      'marqueur de futur',
      'marqueur de la voix passive',
      'négation emphatique',
      'marqueur d\'aspect accompli'
    ],
    correctIndex: 1,
    explanation: '被 introduit la voix passive : S + 被 + agent + V (ex : 他被老师批评了).',
    explanationEn: '被 introduces the passive voice: S + 被 + agent + V (e.g. 他被老师批评了).'
  },
  {
    id: 'cecr-b22-grammar-structure-m1-gq2',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Dans « 把 + objet + verbe », que marque 把 ?',
    promptEn: 'In "把 + object + verb", what does 把 mark?',
    choices: [
      'une question',
      'que l\'objet subit une action transformatrice / déplaçante',
      'le passé simple',
      'une supposition'
    ],
    correctIndex: 1,
    explanation: '把 antéposé à l\'objet met en relief la transformation / le déplacement qu\'il subit.',
    explanationEn: '把 fronts the object to highlight the transformation/displacement it undergoes.'
  },
  {
    id: 'cecr-b22-grammar-structure-m1-fill',
    type: 'fill',
    category: 'grammar',
    prompt: 'Complète avec 把 ou 被.',
    promptEn: 'Fill in with 把 or 被.',
    sentence: '他___那本书看完了。',
    sentenceEn: 'He finished reading that book.',
    choices: ['把', '被', '让', '给'],
    correctIndex: 0,
    explanation: '« Finir de lire » est une action active sur l\'objet → 把. 被 servirait uniquement en passif (« le livre a été lu »).',
    explanationEn: '"Finish reading" is an active action on the object → 把. 被 would only fit for passive ("the book was read").'
  },
  {
    id: 'cecr-b22-grammar-structure-m1-fill2',
    type: 'fill',
    category: 'grammar',
    prompt: 'Complète avec 把 ou 被.',
    promptEn: 'Fill in with 把 or 被.',
    sentence: '我的自行车___偷了。',
    sentenceEn: 'My bicycle has been stolen.',
    choices: ['把', '被', '让', '给'],
    correctIndex: 1,
    explanation: 'Le vélo subit l\'action → passif → 被. 把 exigerait un agent qui agit.',
    explanationEn: 'The bicycle undergoes the action → passive → 被. 把 would require an agent acting.'
  },
  {
    id: 'cecr-b22-grammar-structure-m1-error',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Quelle phrase est INCORRECTE ?',
    promptEn: 'Which sentence is INCORRECT?',
    choices: [
      '他把作业做完了。',
      '他把作业做。',
      '他把窗户打开了。',
      '她把钥匙忘在家里了。'
    ],
    correctIndex: 1,
    explanation: '把 exige un complément de résultat ou d\'aspect sur le verbe (做完 ✓ / 做 ✗).',
    explanationEn: '把 requires a result or aspect complement on the verb (做完 ✓ / 做 ✗).'
  },
  {
    id: 'cecr-b22-grammar-structure-m1-order',
    type: 'order',
    category: 'translation',
    prompt: 'Remets dans l\'ordre (structure 把) : « Elle a posé la tasse sur la table. »',
    promptEn: 'Rearrange (把 structure): "She put the cup on the table."',
    choices: ['她', '把', '杯子', '放', '在', '桌子上', '了'],
    correctIndex: 6,
    explanation: 'Phrase complète : 她把杯子放在桌子上了。 Le complément locatif suit directement 放.',
    explanationEn: 'Full sentence: 她把杯子放在桌子上了。 The locative complement follows 放 directly.'
  },
  {
    id: 'cecr-b22-grammar-structure-m1-translation',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « Son discours a été très critiqué par les médias. »',
    promptEn: 'Translate: "His speech was heavily criticized by the media."',
    choices: [
      '他的演讲被媒体严厉地批评了。',
      '媒体批评演讲。',
      '他批评媒体。',
      '演讲很好。'
    ],
    correctIndex: 0,
    explanation: 'Voix passive avec 被 + agent (媒体) + adverbe 严厉地 + verbe 批评 + 了.',
    explanationEn: 'Passive voice with 被 + agent (媒体) + adverb 严厉地 + verb 批评 + 了.'
  },
  {
    id: 'cecr-b22-grammar-structure-m1-mcq',
    type: 'mcq',
    category: 'grammar',
    prompt: 'Quelle est la différence principale entre 把 et 被 ?',
    promptEn: 'What is the main difference between 把 and 被?',
    choices: [
      'Ils sont synonymes.',
      '把 est actif (le sujet agit sur l\'objet), 被 est passif (le sujet subit l\'action).',
      '把 est formel, 被 est familier.',
      '把 marque le passé, 被 marque le futur.'
    ],
    correctIndex: 1,
    explanation: '把 = perspective active sur l\'objet ; 被 = le sujet subit une action effectuée par l\'agent.',
    explanationEn: '把 = active perspective on the object; 被 = the subject undergoes an action performed by the agent.'
  }
];

const B22_GRAMMAR_COMPLEMENT_M1: LessonV2Exercise[] = [
  {
    id: 'cecr-b22-grammar-complement-m1-gq1',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Dans « 他跑得很快 », quel type de complément est 很快 ?',
    promptEn: 'In 他跑得很快, what type of complement is 很快?',
    choices: [
      'complément de degré',
      'complément directionnel',
      'complément potentiel',
      'complément de résultat'
    ],
    correctIndex: 0,
    explanation: '得 + adjectif = complément de degré (qualifie la manière ou le niveau).',
    explanationEn: '得 + adjective = degree complement (qualifies the manner or level).'
  },
  {
    id: 'cecr-b22-grammar-complement-m1-gq2',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Dans « 我听懂了 », que signale le complément 懂 ?',
    promptEn: 'In 我听懂了, what does the complement 懂 signal?',
    choices: [
      'la direction',
      'le résultat (réussi)',
      'la durée',
      'la possibilité'
    ],
    correctIndex: 1,
    explanation: '懂 après 听 est un complément de résultat : comprendre (résultat de l\'écoute).',
    explanationEn: '懂 after 听 is a result complement: to understand (result of listening).'
  },
  {
    id: 'cecr-b22-grammar-complement-m1-fill',
    type: 'fill',
    category: 'grammar',
    prompt: 'Complète avec le bon complément de résultat.',
    promptEn: 'Fill in with the correct result complement.',
    sentence: '他把信写___了。',
    sentenceEn: 'He finished writing the letter.',
    choices: ['完', '到', '出', '去'],
    correctIndex: 0,
    explanation: '写完 = finir d\'écrire. 写到 = écrire jusqu\'à ; 写出 = écrire (produire).',
    explanationEn: '写完 = finish writing. 写到 = write up to; 写出 = write out (produce).'
  },
  {
    id: 'cecr-b22-grammar-complement-m1-mcq',
    type: 'mcq',
    category: 'grammar',
    prompt: '« 我听不懂 » exprime :',
    promptEn: '"我听不懂" expresses:',
    choices: [
      'l\'impossibilité de comprendre (complément potentiel négatif)',
      'le refus',
      'le futur',
      'le passé'
    ],
    correctIndex: 0,
    explanation: 'V + 不 + résultat = complément potentiel négatif (« impossible de V au point de R »).',
    explanationEn: 'V + 不 + result = negative potential complement ("cannot V so as to achieve R").'
  },
  {
    id: 'cecr-b22-grammar-complement-m1-order',
    type: 'order',
    category: 'translation',
    prompt: 'Remets dans l\'ordre : « Il écrit mieux qu\'avant. »',
    promptEn: 'Rearrange: "He writes better than before."',
    choices: ['他', '写', '得', '比', '以前', '好'],
    correctIndex: 5,
    explanation: 'Phrase complète : 他写得比以前好。 La structure est V + 得 + 比 + référence + adjectif.',
    explanationEn: 'Full sentence: 他写得比以前好。 Structure: V + 得 + 比 + reference + adjective.'
  },
  {
    id: 'cecr-b22-grammar-complement-m1-error',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Quelle phrase est INCORRECTE ?',
    promptEn: 'Which sentence is INCORRECT?',
    choices: [
      '他跑得很快。',
      '他跑很快。',
      '他跑得真快。',
      '他今天跑得特别快。'
    ],
    correctIndex: 1,
    explanation: 'Il faut 得 entre le verbe et le complément de degré. « 他跑很快 » est incorrect.',
    explanationEn: '得 is required between the verb and the degree complement. "他跑很快" is incorrect.'
  },
  {
    id: 'cecr-b22-grammar-complement-m1-translation',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « Je peux lire les journaux chinois sans problème. »',
    promptEn: 'Translate: "I can read Chinese newspapers without any problem."',
    choices: [
      '我可以看懂中文报纸，没问题。',
      '我不会看中文报纸。',
      '我喜欢报纸。',
      '我学中文。'
    ],
    correctIndex: 0,
    explanation: '看懂 (complément de résultat) = lire et comprendre. 没问题 = sans problème.',
    explanationEn: '看懂 (result complement) = read and understand. 没问题 = no problem.'
  },
  {
    id: 'cecr-b22-grammar-complement-m1-listening',
    type: 'mcq',
    category: 'listening',
    prompt: '🔊 « 听不清楚 » signifie :',
    promptEn: '🔊 "听不清楚" means:',
    choices: [
      'je n\'entends pas clairement',
      'j\'écoute attentivement',
      'je ne veux pas écouter',
      'j\'entends trop fort'
    ],
    correctIndex: 0,
    explanation: '听不清楚 = complément potentiel négatif : « ne pas parvenir à entendre clairement ».',
    explanationEn: '听不清楚 = negative potential complement: "unable to hear clearly".'
  }
];

// ============================================================================
//  A1 — PINYIN & TONS : discrimination phonétique (6 modules)
// ----------------------------------------------------------------------------
//  Objectif pédagogique : remplacer les QCM de traduction (inadaptés pour des
//  leçons de prononciation) par des exercices d'écoute où l'utilisateur doit
//  distinguer tons, initiales ou finales à l'oreille. Chaque item embarque un
//  `audioHanzi` qui pointe vers un fichier WAV réel dans /public/audio/hsk1/.
//  `autoPlay: true` déclenche la lecture à l'apparition de l'exercice.
// ============================================================================

// m1 — Les 4 tons : écoute une syllabe, identifie son ton
const A1_PINYIN_M1_DISCRIM: LessonV2Exercise[] = [
  {
    id: 'cecr-a1-pinyin-m1-listen-tone1',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute bien : quel est le ton de cette syllabe ?',
    promptEn: 'Listen carefully: which tone is this syllable?',
    choices: [
      'Ton 1 — aigu et plat (ā)',
      'Ton 2 — montant (á)',
      'Ton 3 — descendant-montant (ǎ)',
      'Ton 4 — descendant, sec (à)'
    ],
    correctIndex: 0,
    explanation: '妈 (mā) = ton 1 : la voix reste haute et plate, comme si tu tenais une note de musique.',
    explanationEn: '妈 (mā) = tone 1: the voice stays high and flat, like holding a musical note.',
    audioHanzi: '妈',
    autoPlay: true
  },
  {
    id: 'cecr-a1-pinyin-m1-listen-tone3',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute et identifie le ton.',
    promptEn: 'Listen and identify the tone.',
    choices: [
      'Ton 1 — aigu et plat',
      'Ton 2 — montant',
      'Ton 3 — descendant-montant',
      'Ton 4 — descendant'
    ],
    correctIndex: 2,
    explanation: '马 (mǎ, cheval) = ton 3 : la voix descend puis remonte. C\'est le ton le plus « capricieux » et souvent le plus reconnaissable.',
    explanationEn: '马 (mǎ, horse) = tone 3: the voice dips down then rises. The trickiest tone, and often the most recognizable.',
    audioHanzi: '马',
    autoPlay: true
  },
  {
    id: 'cecr-a1-pinyin-m1-listen-tone4',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute : quel est ce ton ?',
    promptEn: 'Listen: which tone is this?',
    choices: [
      'Ton 1 — aigu plat',
      'Ton 2 — montant',
      'Ton 3 — descendant-montant',
      'Ton 4 — descendant sec'
    ],
    correctIndex: 3,
    explanation: '爸 (bà, papa) = ton 4 : la voix chute brusquement, comme une commande ferme. « Non ! » en français a ce même mouvement.',
    explanationEn: '爸 (bà, dad) = tone 4: the voice falls sharply, like a firm command.',
    audioHanzi: '爸',
    autoPlay: true
  },
  {
    id: 'cecr-a1-pinyin-m1-listen-tone2',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute et choisis le ton.',
    promptEn: 'Listen and pick the tone.',
    choices: [
      'Ton 1 — aigu plat',
      'Ton 2 — montant (comme une question)',
      'Ton 3 — descendant-montant',
      'Ton 4 — descendant'
    ],
    correctIndex: 1,
    explanation: '来 (lái, venir) = ton 2 : la voix monte, comme quand on pose une question en français (« Vraiment ? »).',
    explanationEn: '来 (lái, to come) = tone 2: the voice rises, like asking «Really?» in English.',
    audioHanzi: '来',
    autoPlay: true
  },
  {
    id: 'cecr-a1-pinyin-m1-listen-match1',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute : quelle syllabe entends-tu ?',
    promptEn: 'Listen: which syllable do you hear?',
    choices: ['nǐ (ton 3)', 'ní (ton 2)', 'nī (ton 1)', 'nì (ton 4)'],
    correctIndex: 0,
    explanation: '你 se prononce nǐ au ton 3 (descendant-montant). Attention, dans 你好 il devient ní par sandhi (2 tons 3 consécutifs).',
    explanationEn: '你 is nǐ, tone 3 (dipping). Note: in 你好 it becomes ní via sandhi (two consecutive tone-3s).',
    audioHanzi: '你',
    autoPlay: true
  },
  {
    id: 'cecr-a1-pinyin-m1-listen-match2',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute bien : quelle syllabe entends-tu ?',
    promptEn: 'Listen carefully: which syllable is it?',
    choices: ['bù (ton 4)', 'bú (ton 2)', 'bū (ton 1)', 'bǔ (ton 3)'],
    correctIndex: 0,
    explanation: '不 se prononce bù au ton 4 par défaut. Il devient bú (ton 2) seulement devant une autre syllabe au ton 4.',
    explanationEn: '不 is bù (tone 4) by default. It shifts to bú (tone 2) only before another tone-4 syllable.',
    audioHanzi: '不',
    autoPlay: true
  }
];

// m2 — Initiales b/p/m/f/d/t/n/l (aspirées vs non-aspirées)
const A1_PINYIN_M2_DISCRIM: LessonV2Exercise[] = [
  {
    id: 'cecr-a1-pinyin-m2-listen-b',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute : quelle initiale entends-tu ?',
    promptEn: 'Listen: which initial do you hear?',
    choices: ['b- (non aspirée)', 'p- (aspirée)', 'm-', 'f-'],
    correctIndex: 0,
    explanation: '爸 (bà) commence par b- : pas de souffle, les lèvres se décollent sans éclat. En français, c\'est proche d\'un « p » de « papa » sans voisement.',
    explanationEn: '爸 (bà) starts with b-: no puff of air, lips release quietly. Close to an unvoiced French «p» in «papa».',
    audioHanzi: '爸',
    autoPlay: true
  },
  {
    id: 'cecr-a1-pinyin-m2-listen-p',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute : b ou p ? (pose ta main devant ta bouche pour vérifier)',
    promptEn: 'Listen: b or p? (hand in front of your mouth to feel the puff)',
    choices: ['b- (sans souffle)', 'p- (avec souffle marqué)', 'm-', 'n-'],
    correctIndex: 1,
    explanation: '爬 (pá) commence par p- : souffle d\'air marqué qui doit presque éteindre une bougie. C\'est le signe distinctif vs « b » en mandarin.',
    explanationEn: '爬 (pá) starts with p-: a clear puff of air that should nearly blow out a candle. The key contrast vs «b» in Mandarin.',
    audioHanzi: '爬',
    autoPlay: true
  },
  {
    id: 'cecr-a1-pinyin-m2-listen-d',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute : quelle initiale ?',
    promptEn: 'Listen: which initial?',
    choices: ['d- (non aspirée)', 't- (aspirée)', 'n-', 'l-'],
    correctIndex: 0,
    explanation: '大 (dà) commence par d- : la langue touche les dents du haut, pas de souffle qui suit. Contraste d/t comme pour b/p.',
    explanationEn: '大 (dà) starts with d-: tongue touches upper teeth, no puff follows. Same d/t contrast as b/p.',
    audioHanzi: '大',
    autoPlay: true
  },
  {
    id: 'cecr-a1-pinyin-m2-listen-t',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute attentivement : d ou t ?',
    promptEn: 'Listen carefully: d or t?',
    choices: ['d- (silencieux)', 't- (avec souffle)', 'm-', 'n-'],
    correctIndex: 1,
    explanation: '他 (tā, il) commence par t- : le souffle est bien audible après la langue. Sans ce souffle, tu entendrais 大 (dà).',
    explanationEn: '他 (tā, he) starts with t-: clear puff after the tongue release. Without the puff you\'d hear 大 (dà).',
    audioHanzi: '他',
    autoPlay: true
  },
  {
    id: 'cecr-a1-pinyin-m2-listen-m',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute : quelle consonne commence cette syllabe ?',
    promptEn: 'Listen: which consonant starts this syllable?',
    choices: ['b-', 'p-', 'm- (nasale)', 'f-'],
    correctIndex: 2,
    explanation: '妈 (mā) commence par m- : son nasal, comme en français. Aucune aspiration possible avec m/n (nasales).',
    explanationEn: '妈 (mā) starts with m-: nasal sound, as in English. Nasals (m/n) can\'t be aspirated.',
    audioHanzi: '妈',
    autoPlay: true
  },
  {
    id: 'cecr-a1-pinyin-m2-listen-n',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute : m, n ou l ?',
    promptEn: 'Listen: m, n or l?',
    choices: ['m- (bilabiale nasale)', 'n- (dentale nasale)', 'l- (latérale)', 'd-'],
    correctIndex: 1,
    explanation: '你 (nǐ) commence par n- : la langue touche les dents du haut, air par le nez. Contraste fin avec l- où l\'air passe sur les côtés de la langue.',
    explanationEn: '你 (nǐ) starts with n-: tongue on upper teeth, air through the nose. Subtle contrast with l- where air flows around the tongue sides.',
    audioHanzi: '你',
    autoPlay: true
  }
];

// m3 — Initiales g/k/h/j/q/x (vélaires vs palatales)
const A1_PINYIN_M3_DISCRIM: LessonV2Exercise[] = [
  {
    id: 'cecr-a1-pinyin-m3-listen-g',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute : quelle initiale ?',
    promptEn: 'Listen: which initial?',
    choices: ['g- (non aspirée)', 'k- (aspirée)', 'h- (fricative)', 'j- (palatale)'],
    correctIndex: 0,
    explanation: '哥 (gē, grand frère) commence par g- : pas de souffle, son étouffé à l\'arrière de la bouche. Contraste avec k- comme b/p et d/t.',
    explanationEn: '哥 (gē, elder brother) starts with g-: no puff, muffled sound at the back of the mouth. Same contrast with k- as b/p and d/t.',
    audioHanzi: '哥',
    autoPlay: true
  },
  {
    id: 'cecr-a1-pinyin-m3-listen-k',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute : g ou k ?',
    promptEn: 'Listen: g or k?',
    choices: ['g- (silencieux)', 'k- (avec souffle marqué)', 'h-', 'q-'],
    correctIndex: 1,
    explanation: '看 (kàn, regarder) commence par k- : souffle d\'air audible juste après la consonne. Sans ce souffle : 哥 (gē).',
    explanationEn: '看 (kàn, to watch) starts with k-: audible puff right after. No puff → 哥 (gē).',
    audioHanzi: '看',
    autoPlay: true
  },
  {
    id: 'cecr-a1-pinyin-m3-listen-h',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute : quelle initiale ?',
    promptEn: 'Listen: which initial?',
    choices: ['g- (occlusive)', 'k-', 'h- (rauque, proche du j espagnol)', 'x-'],
    correctIndex: 2,
    explanation: '好 (hǎo) commence par h- : friction rauque à l\'arrière de la gorge, comme le « j » de « jota » en espagnol. Ce n\'est PAS un « h » muet comme en français.',
    explanationEn: '好 (hǎo) starts with h-: raspy friction at the back of the throat, like Spanish «j» in «jota». NOT a silent French «h».',
    audioHanzi: '好',
    autoPlay: true
  },
  {
    id: 'cecr-a1-pinyin-m3-listen-j',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute : quelle initiale entends-tu ?',
    promptEn: 'Listen: which initial do you hear?',
    choices: ['j- (dj doux)', 'q- (tch doux)', 'x- (ch très léger)', 'g-'],
    correctIndex: 0,
    explanation: '家 (jiā, maison) commence par j- : langue aplatie contre le palais, son proche d\'un « dj » léger. Attention : j/q/x se prononcent uniquement devant i ou ü.',
    explanationEn: '家 (jiā, home) starts with j-: tongue flat against the palate, sounds like a soft «dj». Note: j/q/x only appear before i or ü.',
    audioHanzi: '家',
    autoPlay: true
  },
  {
    id: 'cecr-a1-pinyin-m3-listen-q',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute : j, q ou x ?',
    promptEn: 'Listen: j, q or x?',
    choices: ['j- (dj doux)', 'q- (tch doux et soufflé)', 'x- (ch chuchoté)', 'k-'],
    correctIndex: 1,
    explanation: '去 (qù, aller) commence par q- : comme « j- » mais avec un souffle en plus. Pense à un « tchi » très doux. Souris en le prononçant !',
    explanationEn: '去 (qù, to go) starts with q-: like «j-» plus a puff. Think of a very soft «tchi». Smile when you say it!',
    audioHanzi: '去',
    autoPlay: true
  },
  {
    id: 'cecr-a1-pinyin-m3-listen-x',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute bien : j, q ou x ?',
    promptEn: 'Listen carefully: j, q or x?',
    choices: ['j-', 'q-', 'x- (ch léger, presque chuchoté)', 'sh-'],
    correctIndex: 2,
    explanation: '小 (xiǎo, petit) commence par x- : fricative très légère, comme un « ch » français chuchoté. C\'est le son le plus doux des trois.',
    explanationEn: '小 (xiǎo, small) starts with x-: very light fricative, like a whispered English «sh». The softest of the three.',
    audioHanzi: '小',
    autoPlay: true
  }
];

// m4 — Rétroflexes zh/ch/sh/r vs sifflantes z/c/s
const A1_PINYIN_M4_DISCRIM: LessonV2Exercise[] = [
  {
    id: 'cecr-a1-pinyin-m4-listen-zh',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute : rétroflexe (langue recourbée) ou sifflante ?',
    promptEn: 'Listen: retroflex (curled tongue) or sibilant?',
    choices: ['zh- (rétroflexe, proche d\'un « dj »)', 'z- (sifflante, proche de « dz »)', 'j-', 'sh-'],
    correctIndex: 0,
    explanation: '中 (zhōng) commence par zh- : la langue se recourbe vers l\'arrière, contre le palais. Son proche d\'un « dj » anglais. Sans recourbement : z- (comme « dz »).',
    explanationEn: '中 (zhōng) starts with zh-: the tongue curls back toward the palate. Sounds like English «j» in «jar». Without curling: z- (like «ds»).',
    audioHanzi: '中',
    autoPlay: true
  },
  {
    id: 'cecr-a1-pinyin-m4-listen-ch',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute : quelle initiale ?',
    promptEn: 'Listen: which initial?',
    choices: ['zh- (rétroflexe, silencieuse)', 'ch- (rétroflexe, aspirée)', 'c- (sifflante aspirée)', 'q-'],
    correctIndex: 1,
    explanation: '吃 (chī, manger) commence par ch- : langue recourbée + souffle d\'air marqué. Écoute l\'aspiration qui la distingue de zh-.',
    explanationEn: '吃 (chī, to eat) starts with ch-: curled tongue + clear puff of air. The puff distinguishes it from zh-.',
    audioHanzi: '吃',
    autoPlay: true
  },
  {
    id: 'cecr-a1-pinyin-m4-listen-sh',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute : quelle fricative ?',
    promptEn: 'Listen: which fricative?',
    choices: ['sh- (rétroflexe, comme le « ch » anglais de « she »)', 's- (sifflante claire)', 'x- (palatal chuchoté)', 'ch-'],
    correctIndex: 0,
    explanation: '是 (shì, être) commence par sh- : langue recourbée, son proche du « sh » anglais. Attention à ne pas confondre avec s- (langue plate, comme « sur ») ni x- (plus léger).',
    explanationEn: '是 (shì, to be) starts with sh-: curled tongue, like English «sh». Don\'t confuse with s- (flat tongue) or x- (lighter).',
    audioHanzi: '是',
    autoPlay: true
  },
  {
    id: 'cecr-a1-pinyin-m4-listen-r',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute : r chinois, l, ou autre ?',
    promptEn: 'Listen: Chinese r, l, or other?',
    choices: ['r- (rétroflexe, vibré très léger)', 'l-', 'n-', 'zh-'],
    correctIndex: 0,
    explanation: '人 (rén, personne) commence par r- : langue recourbée, son entre le « j » français de « je » et un « r » anglais. AUCUN rapport avec le « r » roulé français.',
    explanationEn: '人 (rén, person) starts with r-: curled tongue, sound between French «j» in «je» and English «r». NOT the French rolled «r».',
    audioHanzi: '人',
    autoPlay: true
  },
  {
    id: 'cecr-a1-pinyin-m4-listen-z',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute : langue plate (sifflante) ou langue recourbée (rétroflexe) ?',
    promptEn: 'Listen: flat tongue (sibilant) or curled tongue (retroflex)?',
    choices: ['z- (sifflante, langue contre les dents du bas)', 'zh- (rétroflexe)', 'c-', 'j-'],
    correctIndex: 0,
    explanation: '字 (zì, caractère) commence par z- : langue plate contre les dents du bas, son proche de « dz ». Sans voisement : s-.',
    explanationEn: '字 (zì, character) starts with z-: flat tongue against the lower teeth, sounds like «dz». Unvoiced version: s-.',
    audioHanzi: '字',
    autoPlay: true
  },
  {
    id: 'cecr-a1-pinyin-m4-listen-sh2',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute : s- ou sh- ?',
    promptEn: 'Listen: s- or sh-?',
    choices: ['s- (langue plate, claire)', 'sh- (langue recourbée, plus sourd)', 'x-', 'c-'],
    correctIndex: 1,
    explanation: '说 (shuō, parler) commence par sh-. Piège classique : 四 (sì, quatre) vs 是 (shì, être). Le contraste s/sh est vital en mandarin.',
    explanationEn: '说 (shuō, to speak) starts with sh-. Classic trap: 四 (sì, four) vs 是 (shì, to be). The s/sh contrast is vital in Mandarin.',
    audioHanzi: '说',
    autoPlay: true
  }
];

// m5 — Finales & diphtongues : distinguer -n/-ng, -ai/-ei, -ao/-ou, ü
const A1_PINYIN_M5_DISCRIM: LessonV2Exercise[] = [
  {
    id: 'cecr-a1-pinyin-m5-listen-ai',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute : quelle finale ?',
    promptEn: 'Listen: which final?',
    choices: ['-ai (comme « aïe »)', '-ei (comme « eï »)', '-ao', '-an'],
    correctIndex: 0,
    explanation: '爱 (ài, aimer) = finale -ai : bouche grande ouverte au début, ferme progressivement. Bien distinct de -ei (bouche plus fermée).',
    explanationEn: '爱 (ài, to love) = final -ai: mouth wide open at the start, closes gradually. Clearly distinct from -ei (more closed).',
    audioHanzi: '爱',
    autoPlay: true
  },
  {
    id: 'cecr-a1-pinyin-m5-listen-iao',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute : quelle finale composée ?',
    promptEn: 'Listen: which compound final?',
    choices: ['-ao (« aou »)', '-iao (« iaou »)', '-ou', '-iou'],
    correctIndex: 1,
    explanation: '要 (yào, vouloir) = y + ao → prononcé [iao]. La finale glisse de i vers ao : trois sons dans une syllabe.',
    explanationEn: '要 (yào, to want) = y + ao → pronounced [iao]. The final glides from i to ao: three sounds in one syllable.',
    audioHanzi: '要',
    autoPlay: true
  },
  {
    id: 'cecr-a1-pinyin-m5-listen-ue',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute : tu entends -üe (u français) ou -ue (ou) ?',
    promptEn: 'Listen: do you hear -üe (French «u») or -ue?',
    choices: ['-üe (u français + e, comme « ue » serré)', '-ue (« oué »)', '-ie', '-iu'],
    correctIndex: 0,
    explanation: '月 (yuè, mois/lune) = yu + e → [üe]. Le « ü » se prononce comme le « u » français de « lune ». Après y/j/q/x il s\'écrit « u » mais se prononce toujours [ü].',
    explanationEn: '月 (yuè, month/moon) = yu + e → [üe]. «ü» = French «u» in «lune». After y/j/q/x it\'s written «u» but pronounced [ü].',
    audioHanzi: '月',
    autoPlay: true
  },
  {
    id: 'cecr-a1-pinyin-m5-listen-eng',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute : finale nasale -n ou -ng ?',
    promptEn: 'Listen: nasal final -n or -ng?',
    choices: ['-en (nasale claire, langue en avant)', '-eng (nasale profonde, dans le nez)', '-an', '-ang'],
    correctIndex: 1,
    explanation: '能 (néng, pouvoir) = finale -eng : la nasalisation se sent profondément dans le nez, bouche plus ouverte. En -en, la langue touche les dents du haut.',
    explanationEn: '能 (néng, can) = final -eng: nasalization felt deep in the nose, mouth more open. In -en, the tongue touches the upper teeth.',
    audioHanzi: '能',
    autoPlay: true
  },
  {
    id: 'cecr-a1-pinyin-m5-listen-eng2',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute : -en ou -eng ?',
    promptEn: 'Listen: -en or -eng?',
    choices: ['-an', '-ang', '-en', '-eng'],
    correctIndex: 3,
    explanation: '冷 (lěng, froid) se termine par -eng : l-eng. Le -ng finale nasalise sans qu\'on prononce le « g », mais la bouche reste ouverte, son profond.',
    explanationEn: '冷 (lěng, cold) ends in -eng: l-eng. Final -ng nasalizes without pronouncing «g», mouth stays open, deep sound.',
    audioHanzi: '冷',
    autoPlay: true
  },
  {
    id: 'cecr-a1-pinyin-m5-listen-ou',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute : quelle finale ?',
    promptEn: 'Listen: which final?',
    choices: ['-ao (« aou »)', '-ou (« oou »)', '-uo (« ouo »)', '-iu'],
    correctIndex: 1,
    explanation: '有 (yǒu, avoir) = y + ou → [iou] qui sonne proche de [iou] ou « yo long ». Distinct de -uo (ouo, comme dans 我 wǒ).',
    explanationEn: '有 (yǒu, to have) = y + ou → [iou], close to a long «yo». Distinct from -uo (as in 我 wǒ).',
    audioHanzi: '有',
    autoPlay: true
  }
];

// m6 — Sandhi du 3e ton & 不/一
const A1_PINYIN_M6_DISCRIM: LessonV2Exercise[] = [
  {
    id: 'cecr-a1-pinyin-m6-listen-nihao',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute 你好 : comment est-ce réellement prononcé ?',
    promptEn: 'Listen to 你好: how is it actually pronounced?',
    choices: [
      'nǐ hǎo (ton 3 + ton 3, écrit)',
      'ní hǎo (ton 2 + ton 3, réel)',
      'nī hǎo (ton 1 + ton 3)',
      'nì hǎo (ton 4 + ton 3)'
    ],
    correctIndex: 1,
    explanation: 'Sandhi du 3e ton : deux tons 3 consécutifs → le premier devient ton 2. On écrit nǐ hǎo mais on prononce ní hǎo. Ce sandhi est automatique, l\'écriture pinyin ne le reflète pas.',
    explanationEn: '3rd-tone sandhi: two tone-3s in a row → the first becomes tone 2. Written nǐ hǎo but pronounced ní hǎo. Automatic, not reflected in pinyin spelling.',
    audioHanzi: '你好',
    autoPlay: true
  },
  {
    id: 'cecr-a1-pinyin-m6-listen-bushi',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute 不是 : comment est-ce prononcé ?',
    promptEn: 'Listen to 不是: how is it pronounced?',
    choices: [
      'bù shì (sans sandhi)',
      'bú shì (不 → ton 2 devant ton 4)',
      'bū shì (ton 1)',
      'bǔ shì (ton 3)'
    ],
    correctIndex: 1,
    explanation: 'Règle du 不 : devant un ton 4, 不 passe du ton 4 au ton 2 → bú. 是 (shì) étant ton 4, on dit bú shì. Devant ton 1/2/3, 不 reste bù.',
    explanationEn: 'The 不 rule: before a tone-4, 不 shifts from tone 4 to tone 2 → bú. Since 是 (shì) is tone 4, we say bú shì. Before tones 1/2/3, 不 stays bù.',
    audioHanzi: '不是',
    autoPlay: true
  },
  {
    id: 'cecr-a1-pinyin-m6-listen-buyao',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute 不要 : ton du 不 ?',
    promptEn: 'Listen to 不要: tone of 不?',
    choices: [
      'bù yào (ton 4 + ton 4)',
      'bú yào (ton 2 + ton 4) — sandhi appliqué',
      'bū yào (ton 1)',
      'bǔ yào (ton 3)'
    ],
    correctIndex: 1,
    explanation: '要 (yào) est ton 4 → 不 devient ton 2 : bú yào. Même règle automatique que bú shì. Tu l\'entendras partout en chinois courant.',
    explanationEn: '要 (yào) is tone 4 → 不 becomes tone 2: bú yào. Same automatic rule as bú shì. You\'ll hear it everywhere in everyday Chinese.',
    audioHanzi: '不要',
    autoPlay: true
  },
  {
    id: 'cecr-a1-pinyin-m6-listen-buhao',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute 不好 : ton du 不 ?',
    promptEn: 'Listen to 不好: tone of 不?',
    choices: [
      'bù hǎo (不 reste ton 4)',
      'bú hǎo (ton 2, sandhi)',
      'bū hǎo (ton 1)',
      'bǒ hǎo (ton 3)'
    ],
    correctIndex: 0,
    explanation: '好 (hǎo) est ton 3, PAS ton 4 → 不 reste bù. La règle ne s\'applique que devant un ton 4. Bonne habitude : écouter d\'abord le ton du 2e caractère.',
    explanationEn: '好 (hǎo) is tone 3, NOT tone 4 → 不 stays bù. The rule only applies before tone 4. Good habit: listen first to the 2nd character\'s tone.',
    audioHanzi: '不好',
    autoPlay: true
  },
  {
    id: 'cecr-a1-pinyin-m6-listen-yiqi',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute 一起 : comment est prononcé 一 ?',
    promptEn: 'Listen to 一起: how is 一 pronounced?',
    choices: [
      'yī qǐ (ton 1, de base)',
      'yí qǐ (ton 2)',
      'yì qǐ (ton 4, devant ton 1/2/3)',
      'yǐ qǐ (ton 3)'
    ],
    correctIndex: 2,
    explanation: 'Règle du 一 : devant tons 1/2/3 → 一 devient yì (ton 4) ; devant ton 4 → 一 devient yí (ton 2). 起 est ton 3, donc yì qǐ. Sa forme isolée est yī (ton 1).',
    explanationEn: 'The 一 rule: before tones 1/2/3 → 一 = yì (tone 4); before tone 4 → 一 = yí (tone 2). 起 is tone 3, so yì qǐ. In isolation, 一 = yī (tone 1).',
    audioHanzi: '一起',
    autoPlay: true
  },
  {
    id: 'cecr-a1-pinyin-m6-listen-yige',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute 一个 : comment prononcer 一 ?',
    promptEn: 'Listen to 一个: how is 一 pronounced?',
    choices: [
      'yī gè (ton 1)',
      'yí gè (ton 2, devant ton 4)',
      'yì gè (ton 4)',
      'yǐ gè (ton 3)'
    ],
    correctIndex: 1,
    explanation: '个 (gè) est ton 4 → 一 devient yí (ton 2). Symétrique de la règle du 不. Astuce mnémo : « 一 devant le 4 monte ».',
    explanationEn: '个 (gè) is tone 4 → 一 becomes yí (tone 2). Mirror of the 不 rule. Mnemonic: «一 before a 4 rises».',
    audioHanzi: '一个',
    autoPlay: true
  }
];

export const cecrExercisesEnriched: Record<string, LessonV2Exercise[]> = {
  // --- A1 Pinyin — discrimination phonétique (6 modules) ---
  'cecr-a1-pinyin-m1': A1_PINYIN_M1_DISCRIM,
  'cecr-a1-pinyin-m2': A1_PINYIN_M2_DISCRIM,
  'cecr-a1-pinyin-m3': A1_PINYIN_M3_DISCRIM,
  'cecr-a1-pinyin-m4': A1_PINYIN_M4_DISCRIM,
  'cecr-a1-pinyin-m5': A1_PINYIN_M5_DISCRIM,
  'cecr-a1-pinyin-m6': A1_PINYIN_M6_DISCRIM,
  // --- B2.1 Grammaire (7) ---
  'cecr-b21-grammar-lian-m1': B21_GRAMMAR_LIAN_M1,
  'cecr-b21-grammar-lian-m2': B21_GRAMMAR_LIAN_M2,
  'cecr-b21-grammar-lian-m3': B21_GRAMMAR_LIAN_M3,
  'cecr-b21-grammar-conj-m1': B21_GRAMMAR_CONJ_M1,
  'cecr-b21-grammar-conj-m2': B21_GRAMMAR_CONJ_M2,
  'cecr-b21-grammar-conj-m3': B21_GRAMMAR_CONJ_M3,
  'cecr-b21-grammar-conj-m4': B21_GRAMMAR_CONJ_M4,
  // --- B2.1 Vocabulaire (10) ---
  'cecr-b21-tech-m1': B21_TECH_M1,
  'cecr-b21-tech-m2': B21_TECH_M2,
  'cecr-b21-tech-m3': B21_TECH_M3,
  'cecr-b21-tech-m4': B21_TECH_M4,
  'cecr-b21-env-m1': B21_ENV_M1,
  'cecr-b21-env-m2': B21_ENV_M2,
  'cecr-b21-env-m3': B21_ENV_M3,
  'cecr-b21-economics-m1': B21_ECONOMICS_M1,
  'cecr-b21-economics-m2': B21_ECONOMICS_M2,
  'cecr-b21-economics-m3': B21_ECONOMICS_M3,
  // --- B2.2 Batch initial (6) ---
  'cecr-b22-arts-m1': B22_ARTS_M1,
  'cecr-b22-arts-m2': B22_ARTS_M2,
  'cecr-b22-health-m1': B22_HEALTH_M1,
  'cecr-b22-debate-m1': B22_DEBATE_M1,
  'cecr-b22-grammar-structure-m1': B22_GRAMMAR_STRUCTURE_M1,
  'cecr-b22-grammar-complement-m1': B22_GRAMMAR_COMPLEMENT_M1
};
