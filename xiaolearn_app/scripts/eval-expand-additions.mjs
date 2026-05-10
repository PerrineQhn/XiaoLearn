/**
 * eval-expand-additions.mjs
 * -------------------------
 * Données d'extension pour les évaluations HSK — 10 questions par section.
 * Exporte un objet `ADDITIONS` dont les clés sont des `id: '<sectionId>'` et
 * les valeurs des tableaux de chaînes (blocs de questions prêts à injecter
 * AVANT le `]` fermant du tableau `questions`).
 *
 * Série A (originale) : 4 Q (ou 3 pour certains listening) → on complète.
 * Série B : 6-7 Q → on complète jusqu'à 10.
 *
 * Les questions sont rédigées en FR (promptEn EN). Les audios de la Série A
 * réutilisent les MP3 existants de la bibliothèque hsk1-6/. Pour la Série B,
 * les nouvelles phrases utilisent le chemin `audio/phrases/eval-hsk<N>-b-<n>.mp3`
 * et seront synthétisées par Azure TTS au prochain run du pipeline.
 */

// Helper — construit un bloc question standardisé.
const q = ({ id, prompt, promptEn, context, contextEn, audio, hanzi, choices, correctIndex, explanation, explanationEn }) => {
  const lines = ['        {', `          id: '${id}',`];
  if (context) lines.push(`          context: ${JSON.stringify(context)},`);
  if (contextEn) lines.push(`          contextEn: ${JSON.stringify(contextEn)},`);
  lines.push(`          prompt: ${JSON.stringify(prompt)},`);
  if (promptEn) lines.push(`          promptEn: ${JSON.stringify(promptEn)},`);
  if (hanzi) lines.push(`          hanzi: ${JSON.stringify(hanzi)},`);
  if (audio) lines.push(`          audio: ${JSON.stringify(audio)},`);
  lines.push(`          choices: ${JSON.stringify(choices)},`);
  lines.push(`          correctIndex: ${correctIndex},`);
  if (explanation) lines.push(`          explanation: ${JSON.stringify(explanation)},`);
  if (explanationEn) lines.push(`          explanationEn: ${JSON.stringify(explanationEn)}`);
  lines.push('        }');
  return lines.join('\n');
};

export const ADDITIONS = {
  // =================================================================
  //  HSK 1 — Série A
  // =================================================================
  'hsk1-vocab': [
    q({ id: 'hsk1-v5', prompt: 'Que signifie 水 ?', promptEn: 'What does 水 mean?', choices: ['Feu', 'Eau', 'Terre', 'Bois'], correctIndex: 1, explanation: '水 (shuǐ) = eau.', explanationEn: '水 (shuǐ) = water.' }),
    q({ id: 'hsk1-v6', prompt: 'Quel est le pinyin de 书 ?', promptEn: 'Pinyin of 书?', choices: ['shū', 'shuǐ', 'shàng', 'sì'], correctIndex: 0, explanation: '书 (shū) = livre.', explanationEn: '书 = book.' }),
    q({ id: 'hsk1-v7', prompt: 'Lequel est un chiffre ?', promptEn: 'Which one is a number?', choices: ['学', '五', '家', '汉'], correctIndex: 1, explanation: '五 (wǔ) = cinq.', explanationEn: '五 = five.' }),
    q({ id: 'hsk1-v8', prompt: 'Que signifie 车 ?', promptEn: 'What does 车 mean?', choices: ['Train', 'Voiture / véhicule', 'Vélo', 'Moto'], correctIndex: 1, explanation: '车 (chē) = véhicule, voiture.', explanationEn: '车 = vehicle / car.' }),
    q({ id: 'hsk1-v9', prompt: 'Que signifie 大 ?', promptEn: 'What does 大 mean?', choices: ['Petit', 'Grand', 'Beaucoup', 'Peu'], correctIndex: 1, explanation: '大 (dà) = grand.', explanationEn: '大 = big.' }),
    q({ id: 'hsk1-v10', prompt: 'Lequel désigne une boisson ?', promptEn: 'Which one is a drink?', choices: ['茶', '桌子', '书', '狗'], correctIndex: 0, explanation: '茶 (chá) = thé.', explanationEn: '茶 = tea.' }),
  ],
  'hsk1-grammar': [
    q({ id: 'hsk1-g5', prompt: 'Complète : 我 ___ 学生。', promptEn: 'Fill in: 我 ___ 学生。', choices: ['是', '有', '在', '和'], correctIndex: 0, explanation: '是 relie sujet et attribut : « Je suis étudiant ».', explanationEn: '是 links subject + predicate noun.' }),
    q({ id: 'hsk1-g6', prompt: 'Complète : 这 ___ 什么？', promptEn: 'Fill in: 这 ___ 什么？', choices: ['是', '有', '要', '会'], correctIndex: 0, explanation: '« Qu\'est-ce que c\'est ? » = 这是什么？', explanationEn: '« What is this? » = 这是什么？' }),
    q({ id: 'hsk1-g7', prompt: 'Complète : 我 ___ 喝咖啡。', promptEn: 'Fill in: 我 ___ 喝咖啡。', choices: ['不', '没', '别', '也不'], correctIndex: 0, explanation: '不 nie le présent / préférence.', explanationEn: '不 negates present / preference.' }),
    q({ id: 'hsk1-g8', prompt: 'Complète : 你 ___ 朋友？', promptEn: 'Fill in: 你 ___ 朋友？', choices: ['有', '是', '在', '的'], correctIndex: 0, explanation: '有 = avoir : « As-tu des amis ? »', explanationEn: '有 = have.' }),
    q({ id: 'hsk1-g9', prompt: 'Complète : 今天 ___ 星期一。', promptEn: 'Fill in: 今天 ___ 星期一。', choices: ['是', '在', '和', '都'], correctIndex: 0, explanation: '今天是星期一 = aujourd\'hui est lundi.', explanationEn: 'Today is Monday.' }),
    q({ id: 'hsk1-g10', prompt: 'Complète : 我 ___ 爱我妈妈。', promptEn: 'Fill in: 我 ___ 爱我妈妈。', choices: ['很', '是', '在', '了'], correctIndex: 0, explanation: '很 + adjectif/émotion pour l\'assertion simple.', explanationEn: '很 + adj/emotion for a plain assertion.' }),
  ],
  'hsk1-reading': [
    q({ id: 'hsk1-r5', context: '我家有四个人：爸爸、妈妈、哥哥和我。', contextEn: '我家有四个人：爸爸、妈妈、哥哥和我。', prompt: 'Combien sont-ils dans la famille ?', promptEn: 'How many in the family?', choices: ['3', '4', '5', '6'], correctIndex: 1, explanation: '四个人 = 4 personnes.', explanationEn: '四个人 = 4 people.' }),
    q({ id: 'hsk1-r6', context: '我喜欢吃水果，特别是苹果。', contextEn: '我喜欢吃水果，特别是苹果。', prompt: 'Quel est son fruit préféré ?', promptEn: 'Favourite fruit?', choices: ['Banane', 'Pomme', 'Orange', 'Raisin'], correctIndex: 1, explanation: '苹果 = pomme.', explanationEn: '苹果 = apple.' }),
    q({ id: 'hsk1-r7', context: '今天天气很冷。我穿了很多衣服。', contextEn: '今天天气很冷。我穿了很多衣服。', prompt: 'Quel temps fait-il ?', promptEn: 'What\'s the weather?', choices: ['Chaud', 'Froid', 'Pluie', 'Vent'], correctIndex: 1, explanation: '天气很冷 = il fait très froid.', explanationEn: 'Very cold.' }),
    q({ id: 'hsk1-r8', context: '我八点去学校，下午四点回家。', contextEn: '我八点去学校，下午四点回家。', prompt: 'À quelle heure rentre-t-il ?', promptEn: 'When does he go home?', choices: ['8h', '12h', '16h', '18h'], correctIndex: 2, explanation: '下午四点 = 16h.', explanationEn: '下午四点 = 4 PM.' }),
    q({ id: 'hsk1-r9', context: '我姐姐在北京工作。', contextEn: '我姐姐在北京工作。', prompt: 'Où travaille la grande sœur ?', promptEn: 'Where does the older sister work?', choices: ['Shanghai', 'Pékin', 'Canton', 'Chengdu'], correctIndex: 1, explanation: '在北京工作 = travaille à Pékin.', explanationEn: 'Works in Beijing.' }),
    q({ id: 'hsk1-r10', context: '这个苹果五块钱。', contextEn: '这个苹果五块钱。', prompt: 'Combien coûte la pomme ?', promptEn: 'Price of the apple?', choices: ['5 yuans', '15 yuans', '50 yuans', 'Gratuit'], correctIndex: 0, explanation: '五块钱 = 5 yuans.', explanationEn: '五块钱 = 5 yuan.' }),
  ],
  'hsk1-listening': [
    q({ id: 'hsk1-l5', prompt: 'Écoute et indique le sens.', promptEn: 'Listen and pick the meaning.', audio: 'audio/hsk1/hsk1_老师.mp3', choices: ['Étudiant', 'Professeur', 'Médecin', 'Ami'], correctIndex: 1, explanation: '老师 = professeur.', explanationEn: '老师 = teacher.' }),
    q({ id: 'hsk1-l6', prompt: 'Écoute et choisis la bonne traduction.', promptEn: 'Listen and pick the translation.', audio: 'audio/hsk1/hsk1_妈妈.mp3', choices: ['Papa', 'Maman', 'Frère', 'Sœur'], correctIndex: 1, explanation: '妈妈 = maman.', explanationEn: '妈妈 = mom.' }),
    q({ id: 'hsk1-l7', prompt: 'Écoute et indique le sens.', promptEn: 'Listen and pick the meaning.', audio: 'audio/hsk1/hsk1_朋友.mp3', choices: ['Ami', 'Collègue', 'Voisin', 'Famille'], correctIndex: 0, explanation: '朋友 = ami.', explanationEn: '朋友 = friend.' }),
    q({ id: 'hsk1-l8', prompt: 'Écoute et choisis la bonne réponse.', promptEn: 'Listen and pick the right answer.', audio: 'audio/hsk1/hsk1_水.mp3', choices: ['Feu', 'Eau', 'Terre', 'Bois'], correctIndex: 1, explanation: '水 = eau.', explanationEn: '水 = water.' }),
    q({ id: 'hsk1-l9', prompt: 'Écoute et indique le sens.', promptEn: 'Listen and pick the meaning.', audio: 'audio/hsk1/hsk1_工作.mp3', choices: ['Étudier', 'Travail / travailler', 'Dormir', 'Jouer'], correctIndex: 1, explanation: '工作 = travail.', explanationEn: '工作 = work.' }),
    q({ id: 'hsk1-l10', prompt: 'Écoute et choisis la bonne réponse.', promptEn: 'Listen and pick the right answer.', audio: 'audio/hsk1/hsk1_今天.mp3', choices: ['Hier', 'Aujourd\'hui', 'Demain', 'Bientôt'], correctIndex: 1, explanation: '今天 = aujourd\'hui.', explanationEn: '今天 = today.' }),
  ],

  // =================================================================
  //  HSK 2 — Série A
  // =================================================================
  'hsk2-vocab': [
    q({ id: 'hsk2-v5', prompt: 'Que signifie 开始 ?', promptEn: 'What does 开始 mean?', choices: ['Finir', 'Commencer', 'Arrêter', 'Continuer'], correctIndex: 1, explanation: '开始 (kāi shǐ) = commencer.', explanationEn: '开始 = begin.' }),
    q({ id: 'hsk2-v6', prompt: 'Lequel est une couleur ?', promptEn: 'Which one is a color?', choices: ['白色', '星期', '时间', '机场'], correctIndex: 0, explanation: '白色 (bái sè) = blanc.', explanationEn: '白色 = white.' }),
    q({ id: 'hsk2-v7', prompt: 'Que signifie 告诉 ?', promptEn: 'What does 告诉 mean?', choices: ['Cacher', 'Dire à / informer', 'Oublier', 'Demander'], correctIndex: 1, explanation: '告诉 (gào su) = dire à qqn, informer.', explanationEn: '告诉 = tell, inform.' }),
    q({ id: 'hsk2-v8', prompt: 'Lequel désigne un animal ?', promptEn: 'Which one is an animal?', choices: ['猫', '笔', '书', '桌子'], correctIndex: 0, explanation: '猫 (māo) = chat.', explanationEn: '猫 = cat.' }),
    q({ id: 'hsk2-v9', prompt: 'Que signifie 介绍 ?', promptEn: 'What does 介绍 mean?', choices: ['Refuser', 'Présenter', 'Ignorer', 'Oublier'], correctIndex: 1, explanation: '介绍 (jiè shào) = présenter.', explanationEn: '介绍 = introduce.' }),
    q({ id: 'hsk2-v10', prompt: 'Que signifie 出租车 ?', promptEn: 'What does 出租车 mean?', choices: ['Bus', 'Taxi', 'Métro', 'Train'], correctIndex: 1, explanation: '出租车 (chū zū chē) = taxi.', explanationEn: '出租车 = taxi.' }),
  ],
  'hsk2-grammar': [
    q({ id: 'hsk2-g5', prompt: 'Complète : 我 ___ 去过中国。', promptEn: 'Fill in: 我 ___ 去过中国。', choices: ['没', '不', '别', '还'], correctIndex: 0, explanation: '没 nie les expériences passées avec 过.', explanationEn: '没 negates past experience with 过.' }),
    q({ id: 'hsk2-g6', prompt: 'Complète : 他比我 ___ 三岁。', promptEn: 'Fill in: 他比我 ___ 三岁。', choices: ['大', '多', '高', '好'], correctIndex: 0, explanation: 'A 比 B 大 N 岁 = A a N ans de plus que B.', explanationEn: 'A 比 B 大 N 岁 = A is N years older than B.' }),
    q({ id: 'hsk2-g7', prompt: 'Complète : 你想 ___ 一点儿水吗？', promptEn: 'Fill in: 你想 ___ 一点儿水吗？', choices: ['喝', '吃', '看', '听'], correctIndex: 0, explanation: '喝水 = boire de l\'eau.', explanationEn: '喝水 = drink water.' }),
    q({ id: 'hsk2-g8', prompt: 'Complète : 我 ___ 在家。', promptEn: 'Fill in: 我 ___ 在家。', choices: ['还', '就', '都', '只'], correctIndex: 0, explanation: '还 = encore ; « Je suis encore à la maison ».', explanationEn: '还 = still.' }),
    q({ id: 'hsk2-g9', prompt: 'Complète : 我给朋友 ___ 电话。', promptEn: 'Fill in: 我给朋友 ___ 电话。', choices: ['打', '做', '看', '听'], correctIndex: 0, explanation: '打电话 = appeler au téléphone.', explanationEn: '打电话 = make a phone call.' }),
    q({ id: 'hsk2-g10', prompt: 'Complète : 他 ___ 高兴。', promptEn: 'Fill in: 他 ___ 高兴。', choices: ['非常', '一共', '不会', '以前'], correctIndex: 0, explanation: '非常 + adj = très, extrêmement.', explanationEn: '非常 + adj = very.' }),
  ],
  'hsk2-reading': [
    q({ id: 'hsk2-r5', context: '小王每天都起得很早。他早上六点起床，然后去跑步。', contextEn: '小王每天都起得很早。他早上六点起床，然后去跑步。', prompt: 'Que fait Xiao Wang le matin ?', promptEn: 'What does Xiao Wang do in the morning?', choices: ['Il dort tard', 'Il se lève tôt et court', 'Il lit le journal', 'Il prend son petit-déj au café'], correctIndex: 1, explanation: '六点起床 + 跑步 = lever à 6h + course.', explanationEn: 'Gets up at 6 and runs.' }),
    q({ id: 'hsk2-r6', context: '我妹妹今年五岁。她喜欢画画儿。', contextEn: '我妹妹今年五岁。她喜欢画画儿。', prompt: 'Quel est le passe-temps de la petite sœur ?', promptEn: 'Little sister\'s hobby?', choices: ['Lire', 'Dessiner', 'Chanter', 'Courir'], correctIndex: 1, explanation: '画画儿 = dessiner.', explanationEn: '画画儿 = draw.' }),
    q({ id: 'hsk2-r7', context: '这家饭店的菜很好吃，也不贵。', contextEn: '这家饭店的菜很好吃，也不贵。', prompt: 'Que dit-on du restaurant ?', promptEn: 'What about the restaurant?', choices: ['Bon et pas cher', 'Cher et mauvais', 'Loin', 'Fermé'], correctIndex: 0, explanation: '好吃 + 不贵.', explanationEn: 'Tasty and affordable.' }),
    q({ id: 'hsk2-r8', context: '昨天我买了一件新衣服。', contextEn: '昨天我买了一件新衣服。', prompt: 'Qu\'a-t-il acheté hier ?', promptEn: 'What did he buy yesterday?', choices: ['Un livre', 'Un vêtement', 'Un téléphone', 'Un sac'], correctIndex: 1, explanation: '一件新衣服 = un nouveau vêtement.', explanationEn: 'A new garment.' }),
    q({ id: 'hsk2-r9', context: '我家离地铁站很近，走路五分钟。', contextEn: '我家离地铁站很近，走路五分钟。', prompt: 'Que sait-on du domicile ?', promptEn: 'What about the home?', choices: ['Loin du métro', 'À 5 min de marche du métro', 'Près d\'une gare', 'Dans un village'], correctIndex: 1, explanation: '离地铁站很近，走路五分钟.', explanationEn: 'Near the subway, 5 min walk.' }),
    q({ id: 'hsk2-r10', context: '我不喜欢下雨，因为不能出去玩。', contextEn: '我不喜欢下雨，因为不能出去玩。', prompt: 'Pourquoi n\'aime-t-il pas la pluie ?', promptEn: 'Why doesn\'t he like rain?', choices: ['Parce qu\'il tombe malade', 'Parce qu\'il ne peut pas sortir jouer', 'Parce qu\'il a peur', 'Parce qu\'il fait froid'], correctIndex: 1, explanation: '不能出去玩 = ne peut pas sortir jouer.', explanationEn: 'Can\'t go out and play.' }),
  ],
  'hsk2-listening': [
    q({ id: 'hsk2-l5', prompt: 'Écoute et choisis le sens.', promptEn: 'Listen and pick the meaning.', audio: 'audio/hsk2/hsk2_便宜.mp3', choices: ['Cher', 'Bon marché', 'Gratuit', 'Rapide'], correctIndex: 1, explanation: '便宜 = bon marché.', explanationEn: '便宜 = cheap.' }),
    q({ id: 'hsk2-l6', prompt: 'Écoute et choisis la bonne traduction.', promptEn: 'Listen and pick the translation.', audio: 'audio/hsk2/hsk2_机场.mp3', choices: ['Aéroport', 'Gare', 'Port', 'Bus'], correctIndex: 0, explanation: '机场 = aéroport.', explanationEn: '机场 = airport.' }),
    q({ id: 'hsk2-l7', prompt: 'Écoute et indique le sens.', promptEn: 'Listen and pick the meaning.', audio: 'audio/hsk2/hsk2_高兴.mp3', choices: ['Content', 'Triste', 'En colère', 'Fatigué'], correctIndex: 0, explanation: '高兴 = content.', explanationEn: '高兴 = happy.' }),
    q({ id: 'hsk2-l8', prompt: 'Écoute et choisis le sens.', promptEn: 'Listen and pick the meaning.', audio: 'audio/hsk2/hsk2_帮助.mp3', choices: ['Aider', 'Refuser', 'Demander', 'Vendre'], correctIndex: 0, explanation: '帮助 = aider.', explanationEn: '帮助 = help.' }),
    q({ id: 'hsk2-l9', prompt: 'Écoute et choisis la bonne réponse.', promptEn: 'Listen and pick the right answer.', audio: 'audio/hsk2/hsk2_旅游.mp3', choices: ['Voyager', 'Dormir', 'Étudier', 'Manger'], correctIndex: 0, explanation: '旅游 = voyager.', explanationEn: '旅游 = travel.' }),
    q({ id: 'hsk2-l10', prompt: 'Écoute et indique le sens.', promptEn: 'Listen and pick the meaning.', audio: 'audio/hsk2/hsk2_希望.mp3', choices: ['Espérer', 'Détester', 'Oublier', 'Comprendre'], correctIndex: 0, explanation: '希望 = espérer.', explanationEn: '希望 = hope.' }),
  ],

  // =================================================================
  //  HSK 3 — Série A
  // =================================================================
  'hsk3-vocab': [
    q({ id: 'hsk3-v5', prompt: 'Que signifie 影响 ?', promptEn: 'What does 影响 mean?', choices: ['Influence', 'Célébrité', 'Vacances', 'Rêve'], correctIndex: 0, explanation: '影响 (yǐng xiǎng) = influence.', explanationEn: '影响 = influence.' }),
    q({ id: 'hsk3-v6', prompt: 'Lequel signifie « compliqué » ?', promptEn: 'Which means "complicated"?', choices: ['简单', '复杂', '漂亮', '舒服'], correctIndex: 1, explanation: '复杂 (fù zá) = complexe.', explanationEn: '复杂 = complex.' }),
    q({ id: 'hsk3-v7', prompt: 'Que signifie 解决 ?', promptEn: 'What does 解决 mean?', choices: ['Créer', 'Résoudre', 'Ignorer', 'Cacher'], correctIndex: 1, explanation: '解决 (jiě jué) = résoudre.', explanationEn: '解决 = solve.' }),
    q({ id: 'hsk3-v8', prompt: 'Lequel désigne un lieu ?', promptEn: 'Which is a place?', choices: ['银行', '高兴', '干净', '简单'], correctIndex: 0, explanation: '银行 = banque.', explanationEn: '银行 = bank.' }),
    q({ id: 'hsk3-v9', prompt: 'Que signifie 注意 ?', promptEn: 'What does 注意 mean?', choices: ['Ignorer', 'Faire attention', 'Dormir', 'Rire'], correctIndex: 1, explanation: '注意 (zhù yì) = faire attention.', explanationEn: '注意 = pay attention.' }),
    q({ id: 'hsk3-v10', prompt: 'Que signifie 机会 ?', promptEn: 'What does 机会 mean?', choices: ['Défaut', 'Occasion', 'Voiture', 'Cadeau'], correctIndex: 1, explanation: '机会 (jī huì) = occasion.', explanationEn: '机会 = chance.' }),
  ],
  'hsk3-grammar': [
    q({ id: 'hsk3-g5', prompt: 'Complète : 只要你努力， ___ 一定会成功。', promptEn: 'Fill in: 只要你努力， ___ 一定会成功。', choices: ['就', '才', '还', '也'], correctIndex: 0, explanation: '只要…就 = il suffit que... alors.', explanationEn: '只要…就 = as long as... then.' }),
    q({ id: 'hsk3-g6', prompt: 'Complète : 你 ___ 书放在桌子上。', promptEn: 'Fill in: 你 ___ 书放在桌子上。', choices: ['把', '被', '让', '比'], correctIndex: 0, explanation: '把 + objet + verbe + complément.', explanationEn: '把 + object + verb + complement.' }),
    q({ id: 'hsk3-g7', prompt: 'Complète : 这个问题 ___ 小王回答对了。', promptEn: 'Fill in: 这个问题 ___ 小王回答对了。', choices: ['被', '把', '从', '让'], correctIndex: 0, explanation: '被 marque le passif.', explanationEn: '被 marks the passive.' }),
    q({ id: 'hsk3-g8', prompt: 'Complète : 我 ___ 不喜欢吃辣的。', promptEn: 'Fill in: 我 ___ 不喜欢吃辣的。', choices: ['从来', '已经', '就要', '刚才'], correctIndex: 0, explanation: '从来 + 不 = je n\'ai jamais aimé…', explanationEn: '从来 + 不 = never.' }),
    q({ id: 'hsk3-g9', prompt: 'Complète : ___ 你不去，我也不去。', promptEn: 'Fill in: ___ 你不去，我也不去。', choices: ['如果', '因为', '虽然', '不管'], correctIndex: 0, explanation: '如果…就/也 = si... alors.', explanationEn: '如果…也 = if... then.' }),
    q({ id: 'hsk3-g10', prompt: 'Complète : 他 ___ 同意了。', promptEn: 'Fill in: 他 ___ 同意了。', choices: ['终于', '从来', '突然', '正在'], correctIndex: 0, explanation: '终于 = enfin (aboutissement).', explanationEn: '终于 = finally.' }),
  ],
  'hsk3-reading': [
    q({ id: 'hsk3-r5', context: '我昨天买了一辆新自行车，现在每天骑车上班。', contextEn: '我昨天买了一辆新自行车，现在每天骑车上班。', prompt: 'Comment va-t-il au travail ?', promptEn: 'How does he commute?', choices: ['En voiture', 'À vélo', 'En métro', 'À pied'], correctIndex: 1, explanation: '骑车上班 = aller au travail à vélo.', explanationEn: 'Bikes to work.' }),
    q({ id: 'hsk3-r6', context: '我哥哥是一名医生，他经常晚上加班。', contextEn: '我哥哥是一名医生，他经常晚上加班。', prompt: 'Que fait le grand frère ?', promptEn: 'What does the older brother do?', choices: ['Il travaille en journée', 'Médecin, fait souvent des heures sup le soir', 'Il est professeur', 'Il est chauffeur'], correctIndex: 1, explanation: '医生 + 晚上加班.', explanationEn: 'Doctor, often works nights.' }),
    q({ id: 'hsk3-r7', context: '这本书我已经看了三遍了，真的很有意思。', contextEn: '这本书我已经看了三遍了，真的很有意思。', prompt: 'Que pense-t-il du livre ?', promptEn: 'His opinion of the book?', choices: ['Ennuyeux', 'Très intéressant', 'Difficile', 'Trop court'], correctIndex: 1, explanation: '看了三遍 + 很有意思.', explanationEn: 'Read 3 times, very interesting.' }),
    q({ id: 'hsk3-r8', context: '我觉得北京的秋天最漂亮。', contextEn: '我觉得北京的秋天最漂亮。', prompt: 'Quelle saison préfère-t-il à Pékin ?', promptEn: 'Favorite Beijing season?', choices: ['Printemps', 'Été', 'Automne', 'Hiver'], correctIndex: 2, explanation: '秋天 = automne.', explanationEn: 'Autumn.' }),
    q({ id: 'hsk3-r9', context: '我朋友说这个电影不太好看，所以我不想去看。', contextEn: '我朋友说这个电影不太好看，所以我不想去看。', prompt: 'Pourquoi n\'ira-t-il pas voir ce film ?', promptEn: 'Why skip the movie?', choices: ['Trop cher', 'Ami l\'a trouvé décevant', 'Cinéma trop loin', 'Il dort'], correctIndex: 1, explanation: '朋友说不太好看 = ami dit pas terrible.', explanationEn: 'Friend says not good.' }),
    q({ id: 'hsk3-r10', context: '今天的作业很多，我得快点儿做完。', contextEn: '今天的作业很多，我得快点儿做完。', prompt: 'Que doit-il faire ?', promptEn: 'What does he have to do?', choices: ['Finir les devoirs rapidement', 'Regarder la TV', 'Aller se coucher', 'Jouer'], correctIndex: 0, explanation: '快点儿做完 = finir vite.', explanationEn: 'Finish quickly.' }),
  ],
  'hsk3-listening': [
    q({ id: 'hsk3-l4', prompt: 'Écoute et choisis le sens.', promptEn: 'Listen and pick the meaning.', audio: 'audio/hsk3/hsk3_锻炼.mp3', choices: ['Courir', 'Faire de l\'exercice / s\'entraîner', 'Se reposer', 'Cuisiner'], correctIndex: 1, explanation: '锻炼 = s\'entraîner.', explanationEn: '锻炼 = exercise.' }),
    q({ id: 'hsk3-l5', prompt: 'Écoute et indique le sens.', promptEn: 'Listen and pick the meaning.', audio: 'audio/hsk3/hsk3_习惯.mp3', choices: ['Habitude', 'Décision', 'Accident', 'Objectif'], correctIndex: 0, explanation: '习惯 = habitude.', explanationEn: '习惯 = habit.' }),
    q({ id: 'hsk3-l6', prompt: 'Écoute et choisis la bonne traduction.', promptEn: 'Listen and pick the translation.', audio: 'audio/hsk3/hsk3_着急.mp3', choices: ['Calme', 'Anxieux, pressé', 'Joyeux', 'Triste'], correctIndex: 1, explanation: '着急 = anxieux.', explanationEn: '着急 = anxious.' }),
    q({ id: 'hsk3-l7', prompt: 'Écoute et indique le sens.', promptEn: 'Listen and pick the meaning.', audio: 'audio/hsk3/hsk3_结束.mp3', choices: ['Commencer', 'Finir', 'Continuer', 'Déménager'], correctIndex: 1, explanation: '结束 = finir.', explanationEn: '结束 = end.' }),
    q({ id: 'hsk3-l8', prompt: 'Écoute et choisis le sens.', promptEn: 'Listen and pick the meaning.', audio: 'audio/hsk3/hsk3_认为.mp3', choices: ['Penser, considérer', 'Savoir', 'Voir', 'Oublier'], correctIndex: 0, explanation: '认为 = considérer, estimer.', explanationEn: '认为 = think, consider.' }),
    q({ id: 'hsk3-l9', prompt: 'Écoute et choisis la bonne réponse.', promptEn: 'Listen and pick the right answer.', audio: 'audio/hsk3/hsk3_熊猫.mp3', choices: ['Ours', 'Panda', 'Tigre', 'Chat'], correctIndex: 1, explanation: '熊猫 = panda.', explanationEn: '熊猫 = panda.' }),
    q({ id: 'hsk3-l10', prompt: 'Écoute et indique le sens.', promptEn: 'Listen and pick the meaning.', audio: 'audio/hsk3/hsk3_努力.mp3', choices: ['Abandonner', 'S\'efforcer', 'Se reposer', 'Discuter'], correctIndex: 1, explanation: '努力 = s\'efforcer.', explanationEn: '努力 = strive.' }),
  ],

  // =================================================================
  //  HSK 4 — Série A
  // =================================================================
  'hsk4-vocab': [
    q({ id: 'hsk4-v5', prompt: 'Que signifie 减少 ?', promptEn: 'What does 减少 mean?', choices: ['Augmenter', 'Diminuer, réduire', 'Stabiliser', 'Multiplier'], correctIndex: 1, explanation: '减少 (jiǎn shǎo) = diminuer.', explanationEn: '减少 = reduce.' }),
    q({ id: 'hsk4-v6', prompt: 'Que signifie 打扰 ?', promptEn: 'What does 打扰 mean?', choices: ['Aider', 'Déranger', 'Remercier', 'Saluer'], correctIndex: 1, explanation: '打扰 (dǎ rǎo) = déranger.', explanationEn: '打扰 = disturb.' }),
    q({ id: 'hsk4-v7', prompt: 'Que signifie 调查 ?', promptEn: 'What does 调查 mean?', choices: ['Organiser', 'Enquêter, sonder', 'Publier', 'Conseiller'], correctIndex: 1, explanation: '调查 (diào chá) = enquêter.', explanationEn: '调查 = investigate.' }),
    q({ id: 'hsk4-v8', prompt: 'Que signifie 成功 ?', promptEn: 'What does 成功 mean?', choices: ['Échec', 'Succès', 'Effort', 'Vitesse'], correctIndex: 1, explanation: '成功 (chéng gōng) = succès.', explanationEn: '成功 = success.' }),
    q({ id: 'hsk4-v9', prompt: 'Lequel signifie « riche » ?', promptEn: 'Which means "rich"?', choices: ['辛苦', '富', '失望', '厉害'], correctIndex: 1, explanation: '富 (fù) = riche.', explanationEn: '富 = rich.' }),
    q({ id: 'hsk4-v10', prompt: 'Que signifie 适合 ?', promptEn: 'What does 适合 mean?', choices: ['Convenir, être adapté à', 'Rejeter', 'Choisir', 'Acheter'], correctIndex: 0, explanation: '适合 (shì hé) = convenir, être adapté.', explanationEn: '适合 = suit.' }),
  ],
  'hsk4-grammar': [
    q({ id: 'hsk4-g5', prompt: 'Complète : ___ 努力，也很难成功。', promptEn: 'Fill in: ___ 努力，也很难成功。', choices: ['即使', '既然', '除非', '宁可'], correctIndex: 0, explanation: '即使 + phrase + 也 = même si... quand même.', explanationEn: '即使 + clause + 也 = even if... still.' }),
    q({ id: 'hsk4-g6', prompt: 'Complète : 我 ___ 累得不行了。', promptEn: 'Fill in: 我 ___ 累得不行了。', choices: ['实在', '以前', '比较', '主要'], correctIndex: 0, explanation: '实在 + adj = vraiment, très.', explanationEn: '实在 + adj = truly.' }),
    q({ id: 'hsk4-g7', prompt: 'Complète : 这件衣服 ___ 我穿正合适。', promptEn: 'Fill in: 这件衣服 ___ 我穿正合适。', choices: ['对', '被', '让', '把'], correctIndex: 0, explanation: '对 + sujet + 来说/穿 = pour...' , explanationEn: '对 + N = for ...'}),
    q({ id: 'hsk4-g8', prompt: 'Complète : ___ 他的帮助，我才能完成。', promptEn: 'Fill in: ___ 他的帮助，我才能完成。', choices: ['由于', '虽然', '不管', '除非'], correctIndex: 0, explanation: '由于 = en raison de.', explanationEn: '由于 = due to.' }),
    q({ id: 'hsk4-g9', prompt: 'Complète : 他 ___ 会来的。', promptEn: 'Fill in: 他 ___ 会来的。', choices: ['一定', '难道', '其实', '到底'], correctIndex: 0, explanation: '一定 = assurément.', explanationEn: '一定 = certainly.' }),
    q({ id: 'hsk4-g10', prompt: 'Complète : 这件事 ___ 我来做吧。', promptEn: 'Fill in: 这件事 ___ 我来做吧。', choices: ['由', '对', '把', '向'], correctIndex: 0, explanation: '由 + agent + 来 + V = laisser X faire.', explanationEn: '由 + agent + 来 + V = let X do.' }),
  ],
  'hsk4-reading': [
    q({ id: 'hsk4-r5', context: '最近我开始学钢琴，虽然很难，但是我很喜欢。', contextEn: '最近我开始学钢琴，虽然很难，但是我很喜欢。', prompt: 'Que pense-t-il du piano ?', promptEn: 'What about the piano?', choices: ['Dur mais il aime', 'Facile et amusant', 'Inintéressant', 'Trop cher'], correctIndex: 0, explanation: '虽然很难，但是我很喜欢.', explanationEn: 'Hard but loves it.' }),
    q({ id: 'hsk4-r6', context: '为了身体健康，我决定每天早上跑步。', contextEn: '为了身体健康，我决定每天早上跑步。', prompt: 'Pourquoi court-il le matin ?', promptEn: 'Why the morning run?', choices: ['Pour la santé', 'Pour perdre du poids', 'Pour un concours', 'Par ennui'], correctIndex: 0, explanation: '为了身体健康 = pour la santé.', explanationEn: 'For health.' }),
    q({ id: 'hsk4-r7', context: '我们公司下个月要招聘十个新员工。', contextEn: '我们公司下个月要招聘十个新员工。', prompt: 'Que fera la société le mois prochain ?', promptEn: 'What will the company do next month?', choices: ['Licencier', 'Embaucher 10 personnes', 'Déménager', 'Fusionner'], correctIndex: 1, explanation: '招聘十个新员工.', explanationEn: 'Hire 10 new employees.' }),
    q({ id: 'hsk4-r8', context: '他的普通话说得非常流利，几乎没有口音。', contextEn: '他的普通话说得非常流利，几乎没有口音。', prompt: 'Que dit-on de son mandarin ?', promptEn: 'What about his Mandarin?', choices: ['Avec fort accent', 'Très courant, quasi sans accent', 'Hésitant', 'Débutant'], correctIndex: 1, explanation: '非常流利 + 几乎没有口音.', explanationEn: 'Very fluent, almost no accent.' }),
    q({ id: 'hsk4-r9', context: '这个超市周末经常打折，很受欢迎。', contextEn: '这个超市周末经常打折，很受欢迎。', prompt: 'Pourquoi le supermarché est-il populaire ?', promptEn: 'Why popular?', choices: ['Soldes fréquents le week-end', 'Il est neuf', 'Il est près de chez moi', 'Il est grand'], correctIndex: 0, explanation: '周末经常打折 = soldes week-end.', explanationEn: 'Frequent weekend discounts.' }),
    q({ id: 'hsk4-r10', context: '她的性格很开朗，所以朋友很多。', contextEn: '她的性格很开朗，所以朋友很多。', prompt: 'Pourquoi a-t-elle beaucoup d\'amis ?', promptEn: 'Why many friends?', choices: ['Elle est riche', 'Elle est enjouée', 'Elle habite près d\'eux', 'Elle est vieille'], correctIndex: 1, explanation: '开朗 = ouverte, joyeuse.', explanationEn: '开朗 = cheerful.' }),
  ],
  'hsk4-listening': [
    q({ id: 'hsk4-l4', prompt: 'Écoute et choisis le sens.', promptEn: 'Listen and pick the meaning.', audio: 'audio/hsk4/hsk4_坚持.mp3', choices: ['Persévérer', 'Céder', 'Attendre', 'Discuter'], correctIndex: 0, explanation: '坚持 = persévérer.', explanationEn: '坚持 = persist.' }),
    q({ id: 'hsk4-l5', prompt: 'Écoute et indique le sens.', promptEn: 'Listen and pick the meaning.', audio: 'audio/hsk4/hsk4_原因.mp3', choices: ['Raison, cause', 'Conséquence', 'Secret', 'Choix'], correctIndex: 0, explanation: '原因 = cause.', explanationEn: '原因 = cause.' }),
    q({ id: 'hsk4-l6', prompt: 'Écoute et choisis la bonne traduction.', promptEn: 'Listen and pick the translation.', audio: 'audio/hsk4/hsk4_准备.mp3', choices: ['Préparer', 'Finir', 'Oublier', 'Discuter'], correctIndex: 0, explanation: '准备 = préparer.', explanationEn: '准备 = prepare.' }),
    q({ id: 'hsk4-l7', prompt: 'Écoute et indique le sens.', promptEn: 'Listen and pick the meaning.', audio: 'audio/hsk4/hsk4_紧张.mp3', choices: ['Détendu', 'Tendu, stressé', 'Ennuyeux', 'Rapide'], correctIndex: 1, explanation: '紧张 = tendu.', explanationEn: '紧张 = nervous.' }),
    q({ id: 'hsk4-l8', prompt: 'Écoute et choisis le sens.', promptEn: 'Listen and pick the meaning.', audio: 'audio/hsk4/hsk4_耐心.mp3', choices: ['Patience', 'Colère', 'Ennui', 'Impulsivité'], correctIndex: 0, explanation: '耐心 = patience.', explanationEn: '耐心 = patience.' }),
    q({ id: 'hsk4-l9', prompt: 'Écoute et indique le sens.', promptEn: 'Listen and pick the meaning.', audio: 'audio/hsk4/hsk4_污染.mp3', choices: ['Propreté', 'Pollution', 'Amélioration', 'Progrès'], correctIndex: 1, explanation: '污染 = pollution.', explanationEn: '污染 = pollution.' }),
    q({ id: 'hsk4-l10', prompt: 'Écoute et choisis la bonne réponse.', promptEn: 'Listen and pick the right answer.', audio: 'audio/hsk4/hsk4_经验.mp3', choices: ['Expérience', 'Âge', 'Salaire', 'Diplôme'], correctIndex: 0, explanation: '经验 = expérience.', explanationEn: '经验 = experience.' }),
  ],

  // =================================================================
  //  HSK 5 — Série A
  // =================================================================
  'hsk5-vocab': [
    q({ id: 'hsk5-v5', prompt: 'Que signifie 规定 ?', promptEn: 'What does 规定 mean?', choices: ['Suggestion', 'Règlement, règle', 'Accident', 'Liberté'], correctIndex: 1, explanation: '规定 (guī dìng) = règle.', explanationEn: '规定 = regulation.' }),
    q({ id: 'hsk5-v6', prompt: 'Que signifie 发挥 ?', promptEn: 'What does 发挥 mean?', choices: ['Cacher', 'Mettre en œuvre, déployer', 'Ignorer', 'Oublier'], correctIndex: 1, explanation: '发挥 (fā huī) = déployer.', explanationEn: '发挥 = bring into play.' }),
    q({ id: 'hsk5-v7', prompt: 'Que signifie 实际 ?', promptEn: 'What does 实际 mean?', choices: ['Virtuel', 'Réel, concret', 'Imaginaire', 'Abstrait'], correctIndex: 1, explanation: '实际 (shí jì) = réel.', explanationEn: '实际 = actual.' }),
    q({ id: 'hsk5-v8', prompt: 'Que signifie 承担 ?', promptEn: 'What does 承担 mean?', choices: ['Assumer', 'Refuser', 'Détourner', 'Diviser'], correctIndex: 0, explanation: '承担 = assumer.', explanationEn: '承担 = take on.' }),
    q({ id: 'hsk5-v9', prompt: 'Que signifie 缺乏 ?', promptEn: 'What does 缺乏 mean?', choices: ['Abondance', 'Manque de', 'Progrès', 'Retard'], correctIndex: 1, explanation: '缺乏 = manquer.', explanationEn: '缺乏 = lack.' }),
    q({ id: 'hsk5-v10', prompt: 'Que signifie 合作 ?', promptEn: 'What does 合作 mean?', choices: ['Conflit', 'Coopération', 'Compétition', 'Séparation'], correctIndex: 1, explanation: '合作 = coopération.', explanationEn: '合作 = cooperation.' }),
  ],
  'hsk5-grammar': [
    q({ id: 'hsk5-g5', prompt: 'Complète : ___ 不累，我们也要完成这项工作。', promptEn: 'Fill in: ___ 不累，我们也要完成这项工作。', choices: ['即使', '既然', '只有', '除非'], correctIndex: 0, explanation: '即使…也 = même si... quand même.', explanationEn: '即使…也 = even if... still.' }),
    q({ id: 'hsk5-g6', prompt: 'Complète : 他 ___ 年轻， ___ 经验丰富。', promptEn: 'Fill in: 他 ___ 年轻， ___ 经验丰富。', choices: ['虽然…但是', '如果…就', '只要…就', '因为…所以'], correctIndex: 0, explanation: '虽然…但是 = bien que... cependant.', explanationEn: '虽然…但是 = although... yet.' }),
    q({ id: 'hsk5-g7', prompt: 'Complète : 无论天气怎么样，他 ___ 去跑步。', promptEn: 'Fill in: 无论天气怎么样，他 ___ 去跑步。', choices: ['都', '就', '才', '还'], correctIndex: 0, explanation: '无论…都 = quoi qu\'il en soit... quand même.', explanationEn: '无论…都 = no matter... still.' }),
    q({ id: 'hsk5-g8', prompt: 'Complète : 他 ___ 老师， ___ 作家。', promptEn: 'Fill in: 他 ___ 老师， ___ 作家。', choices: ['既…又', '不是…而是', '虽然…但是', '一边…一边'], correctIndex: 0, explanation: '既…又 = à la fois... et.', explanationEn: '既…又 = both...and.' }),
    q({ id: 'hsk5-g9', prompt: 'Complète : ___ 你的建议，我才能完成这个项目。', promptEn: 'Fill in: ___ 你的建议，我才能完成这个项目。', choices: ['多亏', '由于', '关于', '为了'], correctIndex: 0, explanation: '多亏 = grâce à.', explanationEn: '多亏 = thanks to.' }),
    q({ id: 'hsk5-g10', prompt: 'Complète : 这件事 ___ 我们共同解决。', promptEn: 'Fill in: 这件事 ___ 我们共同解决。', choices: ['由', '对', '把', '向'], correctIndex: 0, explanation: '由 + nous + 共同 solve = résolu par nous.', explanationEn: '由 = by (agent).' }),
  ],
  'hsk5-reading': [
    q({ id: 'hsk5-r5', context: '随着城市化的发展，很多人离开了农村。', contextEn: '随着城市化的发展，很多人离开了农村。', prompt: 'Quelle tendance est décrite ?', promptEn: 'What trend is described?', choices: ['Retour à la campagne', 'Exode rural', 'Stagnation', 'Baisse de population'], correctIndex: 1, explanation: '离开农村 = quitter la campagne.', explanationEn: 'Leaving rural areas.' }),
    q({ id: 'hsk5-r6', context: '保护环境是每个人的责任。', contextEn: '保护环境是每个人的责任。', prompt: 'Quel est le message ?', promptEn: 'Main idea?', choices: ['L\'État seul est responsable', 'Responsabilité de tous', 'On ne peut rien faire', 'Question trop complexe'], correctIndex: 1, explanation: '每个人的责任 = responsabilité de chacun.', explanationEn: 'Everyone\'s duty.' }),
    q({ id: 'hsk5-r7', context: '学习一门语言需要不断的练习和耐心。', contextEn: '学习一门语言需要不断的练习和耐心。', prompt: 'Que faut-il pour apprendre une langue ?', promptEn: 'What does learning a language require?', choices: ['Argent', 'Pratique continue et patience', 'Voyager à l\'étranger', 'Un prof célèbre'], correctIndex: 1, explanation: '不断的练习和耐心.', explanationEn: 'Continuous practice + patience.' }),
    q({ id: 'hsk5-r8', context: '现代生活节奏快，人们容易感到疲劳。', contextEn: '现代生活节奏快，人们容易感到疲劳。', prompt: 'Quel problème est soulevé ?', promptEn: 'Problem raised?', choices: ['Ennui', 'Fatigue due au rythme rapide', 'Solitude', 'Pauvreté'], correctIndex: 1, explanation: '节奏快 + 容易疲劳 = rythme rapide + fatigue.', explanationEn: 'Fast pace → fatigue.' }),
    q({ id: 'hsk5-r9', context: '一个成功的领导者需要具备良好的沟通能力。', contextEn: '一个成功的领导者需要具备良好的沟通能力。', prompt: 'Quelle qualité est clé pour un leader ?', promptEn: 'Key leadership trait?', choices: ['Être sévère', 'Bonne communication', 'Être jeune', 'Parler fort'], correctIndex: 1, explanation: '良好的沟通能力 = bonne capacité de communication.', explanationEn: 'Good communication skills.' }),
    q({ id: 'hsk5-r10', context: '失败是成功之母，不要轻易放弃。', contextEn: '失败是成功之母，不要轻易放弃。', prompt: 'Quel message est donné ?', promptEn: 'Main message?', choices: ['Accepter la défaite', 'L\'échec précède le succès, ne pas abandonner', 'Éviter l\'échec', 'Rester prudent'], correctIndex: 1, explanation: '失败是成功之母 + 不要放弃.', explanationEn: 'Failure is the mother of success, don\'t give up.' }),
  ],
  'hsk5-listening': [
    q({ id: 'hsk5-l4', prompt: 'Écoute et choisis le sens.', promptEn: 'Listen and pick the meaning.', audio: 'audio/hsk5/hsk5_改善.mp3', choices: ['Dégrader', 'Améliorer', 'Stabiliser', 'Réorganiser'], correctIndex: 1, explanation: '改善 = améliorer.', explanationEn: '改善 = improve.' }),
    q({ id: 'hsk5-l5', prompt: 'Écoute et indique le sens.', promptEn: 'Listen and pick the meaning.', audio: 'audio/hsk5/hsk5_传统.mp3', choices: ['Tradition', 'Modernité', 'Révolution', 'Loi'], correctIndex: 0, explanation: '传统 = tradition.', explanationEn: '传统 = tradition.' }),
    q({ id: 'hsk5-l6', prompt: 'Écoute et choisis la bonne traduction.', promptEn: 'Listen and pick the translation.', audio: 'audio/hsk5/hsk5_观念.mp3', choices: ['Observation', 'Conception, notion', 'Apparence', 'Plainte'], correctIndex: 1, explanation: '观念 = conception / idée.', explanationEn: '观念 = notion.' }),
    q({ id: 'hsk5-l7', prompt: 'Écoute et indique le sens.', promptEn: 'Listen and pick the meaning.', audio: 'audio/hsk5/hsk5_明显.mp3', choices: ['Léger', 'Évident', 'Caché', 'Secondaire'], correctIndex: 1, explanation: '明显 = évident.', explanationEn: '明显 = obvious.' }),
    q({ id: 'hsk5-l8', prompt: 'Écoute et choisis le sens.', promptEn: 'Listen and pick the meaning.', audio: 'audio/hsk5/hsk5_争取.mp3', choices: ['Gagner, rechercher', 'Renoncer', 'Reculer', 'Calmer'], correctIndex: 0, explanation: '争取 = s\'efforcer d\'obtenir.', explanationEn: '争取 = strive for.' }),
    q({ id: 'hsk5-l9', prompt: 'Écoute et indique le sens.', promptEn: 'Listen and pick the meaning.', audio: 'audio/hsk5/hsk5_意义.mp3', choices: ['Sens, importance', 'Ennui', 'Plaisir', 'Complexité'], correctIndex: 0, explanation: '意义 = sens, signification.', explanationEn: '意义 = meaning.' }),
    q({ id: 'hsk5-l10', prompt: 'Écoute et choisis la bonne réponse.', promptEn: 'Listen and pick the right answer.', audio: 'audio/hsk5/hsk5_思考.mp3', choices: ['Réfléchir', 'Dormir', 'Rêver', 'Écrire'], correctIndex: 0, explanation: '思考 = réfléchir.', explanationEn: '思考 = ponder.' }),
  ],

  // =================================================================
  //  HSK 6 — Série A
  // =================================================================
  'hsk6-vocab': [
    q({ id: 'hsk6-v5', prompt: 'Que signifie 繁荣 ?', promptEn: 'What does 繁荣 mean?', choices: ['Déclin', 'Prospérité', 'Guerre', 'Famine'], correctIndex: 1, explanation: '繁荣 (fán róng) = prospérité.', explanationEn: '繁荣 = prosperity.' }),
    q({ id: 'hsk6-v6', prompt: 'Que signifie 忽视 ?', promptEn: 'What does 忽视 mean?', choices: ['Surveiller', 'Négliger, ignorer', 'Respecter', 'Admirer'], correctIndex: 1, explanation: '忽视 = ignorer.', explanationEn: '忽视 = ignore.' }),
    q({ id: 'hsk6-v7', prompt: 'Que signifie 弥补 ?', promptEn: 'What does 弥补 mean?', choices: ['Compenser', 'Détruire', 'Oublier', 'Accélérer'], correctIndex: 0, explanation: '弥补 = compenser.', explanationEn: '弥补 = make up for.' }),
    q({ id: 'hsk6-v8', prompt: 'Que signifie 矛盾 ?', promptEn: 'What does 矛盾 mean?', choices: ['Contradiction', 'Harmonie', 'Discussion', 'Consensus'], correctIndex: 0, explanation: '矛盾 = contradiction.', explanationEn: '矛盾 = contradiction.' }),
    q({ id: 'hsk6-v9', prompt: 'Que signifie 陶醉 ?', promptEn: 'What does 陶醉 mean?', choices: ['Être enivré, fasciné par', 'Abandonner', 'Déplorer', 'Cacher'], correctIndex: 0, explanation: '陶醉 (táo zuì) = être enivré/fasciné.', explanationEn: '陶醉 = revel in.' }),
    q({ id: 'hsk6-v10', prompt: 'Que signifie 显著 ?', promptEn: 'What does 显著 mean?', choices: ['Insignifiant', 'Remarquable', 'Normal', 'Ordinaire'], correctIndex: 1, explanation: '显著 = notable.', explanationEn: '显著 = remarkable.' }),
  ],
  'hsk6-grammar': [
    q({ id: 'hsk6-g5', prompt: 'Complète : ___ 天气再冷，他也要去锻炼。', promptEn: 'Fill in: ___ 天气再冷，他也要去锻炼。', choices: ['不管', '除非', '只有', '宁可'], correctIndex: 0, explanation: '不管 + 再 + adj = peu importe à quel point.', explanationEn: '不管 + 再 + adj = no matter how.' }),
    q({ id: 'hsk6-g6', prompt: 'Complète : 他 ___ 不成功， ___ 不放弃。', promptEn: 'Fill in: 他 ___ 不成功， ___ 不放弃。', choices: ['宁可…也', '与其…不如', '不但…而且', '既然…就'], correctIndex: 0, explanation: '宁可…也 = plutôt X que Y.', explanationEn: '宁可…也 = would rather X than Y.' }),
    q({ id: 'hsk6-g7', prompt: 'Complète : 这本书 ___ 难懂， ___ 值得一读。', promptEn: 'Fill in: 这本书 ___ 难懂， ___ 值得一读。', choices: ['尽管…但是', '只要…就', '既然…就', '除非…才'], correctIndex: 0, explanation: '尽管…但是 = bien que... néanmoins.', explanationEn: '尽管…但是 = although... still.' }),
    q({ id: 'hsk6-g8', prompt: 'Complète : 事情 ___ 发生， ___ 努力解决。', promptEn: 'Fill in: 事情 ___ 发生， ___ 努力解决。', choices: ['既然…就', '与其…不如', '不管…都', '只有…才'], correctIndex: 0, explanation: '既然…就 = puisque... alors.', explanationEn: '既然…就 = since... then.' }),
    q({ id: 'hsk6-g9', prompt: 'Complète : 这个项目 ___ 他来负责最合适。', promptEn: 'Fill in: 这个项目 ___ 他来负责最合适。', choices: ['由', '对', '把', '被'], correctIndex: 0, explanation: '由 + agent + 来 + V = laisser X s\'occuper de.', explanationEn: '由 + agent + 来 + V = for X to handle.' }),
    q({ id: 'hsk6-g10', prompt: 'Complète : ___ 其他方法都没用， ___ 试试这个办法吧。', promptEn: 'Fill in: ___ 其他方法都没用， ___ 试试这个办法吧。', choices: ['既然…就', '宁可…也', '不管…都', '只要…就'], correctIndex: 0, explanation: '既然…就 = puisque... alors.', explanationEn: '既然…就 = since... then.' }),
  ],
  'hsk6-reading': [
    q({ id: 'hsk6-r5', context: '文化的传承需要每一代人的努力，不能只依靠政府。', contextEn: '文化的传承需要每一代人的努力，不能只依靠政府。', prompt: 'Quelle idée est défendue ?', promptEn: 'What idea is argued?', choices: ['L\'État seul suffit', 'Chaque génération doit contribuer', 'La culture se perd', 'Il faut imiter les autres'], correctIndex: 1, explanation: '每一代人的努力 = effort de chaque génération.', explanationEn: 'Each generation must contribute.' }),
    q({ id: 'hsk6-r6', context: '真正的友谊经得起时间的考验。', contextEn: '真正的友谊经得起时间的考验。', prompt: 'Quel est le critère d\'une vraie amitié ?', promptEn: 'Criterion of true friendship?', choices: ['Argent', 'Résister à l\'épreuve du temps', 'Vivre près', 'Faire la fête'], correctIndex: 1, explanation: '经得起时间的考验.', explanationEn: 'Endures time.' }),
    q({ id: 'hsk6-r7', context: '面对困难，我们应该保持冷静，寻找解决办法。', contextEn: '面对困难，我们应该保持冷静，寻找解决办法。', prompt: 'Quel conseil est donné ?', promptEn: 'What advice?', choices: ['Paniquer', 'Rester calme et chercher des solutions', 'Abandonner', 'Demander de l\'aide'], correctIndex: 1, explanation: '保持冷静 + 寻找办法.', explanationEn: 'Stay calm + find solutions.' }),
    q({ id: 'hsk6-r8', context: '随着科技的进步，人们的生活方式发生了巨大变化。', contextEn: '随着科技的进步，人们的生活方式发生了巨大变化。', prompt: 'Quel est le sujet ?', promptEn: 'Topic?', choices: ['Disparition de la tech', 'Changement des modes de vie dus à la tech', 'Progrès médical', 'Politique'], correctIndex: 1, explanation: '随着科技进步 + 生活方式变化.', explanationEn: 'Tech advances → lifestyle change.' }),
    q({ id: 'hsk6-r9', context: '教育的目的不仅是传授知识，更是培养独立思考的能力。', contextEn: '教育的目的不仅是传授知识，更是培养独立思考的能力。', prompt: 'Quel est le but ultime de l\'éducation ?', promptEn: 'Ultimate goal of education?', choices: ['Apprendre par cœur', 'Former la pensée autonome', 'Réussir aux examens', 'Décrocher un emploi'], correctIndex: 1, explanation: '独立思考的能力.', explanationEn: 'Independent thinking.' }),
    q({ id: 'hsk6-r10', context: '一个社会的文明程度可以从对弱者的态度看出来。', contextEn: '一个社会的文明程度可以从对弱者的态度看出来。', prompt: 'Quel critère de civilisation est donné ?', promptEn: 'Civilization marker?', choices: ['Richesse', 'Traitement des plus faibles', 'Armée', 'Population'], correctIndex: 1, explanation: '对弱者的态度.', explanationEn: 'Treatment of the weak.' }),
  ],
  'hsk6-listening': [
    q({ id: 'hsk6-l4', prompt: 'Écoute et choisis le sens.', promptEn: 'Listen and pick the meaning.', audio: 'audio/hsk6/hsk6_潜力.mp3', choices: ['Potentiel', 'Faiblesse', 'Faille', 'Défaut'], correctIndex: 0, explanation: '潜力 = potentiel.', explanationEn: '潜力 = potential.' }),
    q({ id: 'hsk6-l5', prompt: 'Écoute et indique le sens.', promptEn: 'Listen and pick the meaning.', audio: 'audio/hsk6/hsk6_克服.mp3', choices: ['Fuir', 'Surmonter', 'Négocier', 'Abandonner'], correctIndex: 1, explanation: '克服 = surmonter.', explanationEn: '克服 = overcome.' }),
    q({ id: 'hsk6-l6', prompt: 'Écoute et choisis la bonne traduction.', promptEn: 'Listen and pick the translation.', audio: 'audio/hsk6/hsk6_珍贵.mp3', choices: ['Ordinaire', 'Précieux, rare', 'Fragile', 'Fréquent'], correctIndex: 1, explanation: '珍贵 = précieux.', explanationEn: '珍贵 = precious.' }),
    q({ id: 'hsk6-l7', prompt: 'Écoute et indique le sens.', promptEn: 'Listen and pick the meaning.', audio: 'audio/hsk6/hsk6_遗憾.mp3', choices: ['Regret', 'Joie', 'Surprise', 'Indifférence'], correctIndex: 0, explanation: '遗憾 = regret.', explanationEn: '遗憾 = regret.' }),
    q({ id: 'hsk6-l8', prompt: 'Écoute et choisis le sens.', promptEn: 'Listen and pick the meaning.', audio: 'audio/hsk6/hsk6_辉煌.mp3', choices: ['Brillant, splendide', 'Simple', 'Sombre', 'Passé'], correctIndex: 0, explanation: '辉煌 = brillant.', explanationEn: '辉煌 = glorious.' }),
    q({ id: 'hsk6-l9', prompt: 'Écoute et indique le sens.', promptEn: 'Listen and pick the meaning.', audio: 'audio/hsk6/hsk6_衡量.mp3', choices: ['Mesurer, évaluer', 'Réparer', 'Ignorer', 'Accélérer'], correctIndex: 0, explanation: '衡量 = évaluer.', explanationEn: '衡量 = measure / weigh.' }),
    q({ id: 'hsk6-l10', prompt: 'Écoute et choisis la bonne réponse.', promptEn: 'Listen and pick the right answer.', audio: 'audio/hsk6/hsk6_辩论.mp3', choices: ['Débat', 'Silence', 'Consensus', 'Annonce'], correctIndex: 0, explanation: '辩论 = débat.', explanationEn: '辩论 = debate.' }),
  ],

  // =================================================================
  //  SÉRIE B — compléments (6-7 Q → 10 Q)
  // =================================================================
  'hsk1b-vocab': [
    q({ id: 'hsk1b-v7', prompt: 'Que signifie 菜 ?', promptEn: 'What does 菜 mean?', choices: ['Riz', 'Plat / légume', 'Fruit', 'Thé'], correctIndex: 1, explanation: '菜 = plat / légume.', explanationEn: '菜 = dish/veggie.' }),
    q({ id: 'hsk1b-v8', prompt: 'Lequel signifie « nombre » ?', promptEn: 'Which means "number"?', choices: ['几', '多少', '几/多少 (les deux)', 'Aucun'], correctIndex: 2, explanation: '几 et 多少 interrogent la quantité.', explanationEn: '几 & 多少 both ask quantity.' }),
    q({ id: 'hsk1b-v9', prompt: 'Que signifie 听 ?', promptEn: 'What does 听 mean?', choices: ['Voir', 'Entendre, écouter', 'Parler', 'Lire'], correctIndex: 1, explanation: '听 = écouter.', explanationEn: '听 = listen.' }),
    q({ id: 'hsk1b-v10', prompt: 'Que signifie 看 ?', promptEn: 'What does 看 mean?', choices: ['Regarder / voir', 'Sentir', 'Toucher', 'Goûter'], correctIndex: 0, explanation: '看 = regarder.', explanationEn: '看 = look/watch.' }),
  ],
  'hsk1b-grammar': [
    q({ id: 'hsk1b-g7', prompt: 'Complète : 我 ___ 喝茶， ___ 喝咖啡。', promptEn: 'Fill in: 我 ___ 喝茶， ___ 喝咖啡。', choices: ['喜欢…不喜欢', '是…不是', '有…没有', '想…不想'], correctIndex: 0, explanation: 'Opposition directe préférence.', explanationEn: 'Direct preference contrast.' }),
    q({ id: 'hsk1b-g8', prompt: 'Complète : 现在 ___ 三点。', promptEn: 'Fill in: 现在 ___ 三点。', choices: ['是', '有', '在', '了'], correctIndex: 0, explanation: '是 relie l\'heure.', explanationEn: '是 links time.' }),
    q({ id: 'hsk1b-g9', prompt: 'Complète : 你 ___ 在哪儿？', promptEn: 'Fill in: 你 ___ 在哪儿？', choices: ['现在', '已经', '就要', '马上'], correctIndex: 0, explanation: '现在 = maintenant.', explanationEn: '现在 = now.' }),
    q({ id: 'hsk1b-g10', prompt: 'Complète : 我 ___ 朋友一起去看电影。', promptEn: 'Fill in: 我 ___ 朋友一起去看电影。', choices: ['和', '是', '都', '在'], correctIndex: 0, explanation: '和 = avec.', explanationEn: '和 = with.' }),
  ],
  'hsk1b-reading': [
    q({ id: 'hsk1b-r7', context: '我有一个中国朋友，他叫小李。', contextEn: '我有一个中国朋友，他叫小李。', prompt: 'Comment s\'appelle son ami ?', promptEn: 'Friend\'s name?', choices: ['Xiao Wang', 'Xiao Li', 'Xiao Ming', 'Xiao Zhang'], correctIndex: 1, explanation: '他叫小李.', explanationEn: 'Called Xiao Li.' }),
    q({ id: 'hsk1b-r8', context: '我家有一只小狗，它很可爱。', contextEn: '我家有一只小狗，它很可爱。', prompt: 'Quel est l\'animal ?', promptEn: 'Which animal?', choices: ['Chat', 'Chien', 'Oiseau', 'Poisson'], correctIndex: 1, explanation: '小狗 = petit chien.', explanationEn: '小狗 = puppy.' }),
    q({ id: 'hsk1b-r9', context: '明天我们去北京。', contextEn: '明天我们去北京。', prompt: 'Où vont-ils demain ?', promptEn: 'Where tomorrow?', choices: ['Shanghai', 'Pékin', 'Canton', 'Hong Kong'], correctIndex: 1, explanation: '去北京 = aller à Pékin.', explanationEn: 'Going to Beijing.' }),
    q({ id: 'hsk1b-r10', context: '我下午去商店买东西。', contextEn: '我下午去商店买东西。', prompt: 'Quand va-t-il faire des courses ?', promptEn: 'When shopping?', choices: ['Matin', 'Après-midi', 'Soir', 'Nuit'], correctIndex: 1, explanation: '下午 = après-midi.', explanationEn: '下午 = afternoon.' }),
  ],
  'hsk1b-listening': [
    q({ id: 'hsk1b-l7', prompt: 'Écoute et choisis le sens.', promptEn: 'Listen and pick the meaning.', audio: 'audio/phrases/eval-hsk1-b-7.mp3', hanzi: '我的生日是五月十号。', choices: ['Le 10 mai est son anniv', 'Le 5 octobre est son anniv', 'Le 10 mars', 'Le 5 mai'], correctIndex: 0, explanation: '五月十号 = 10 mai.', explanationEn: 'May 10.' }),
    q({ id: 'hsk1b-l8', prompt: 'Écoute et choisis le sens.', promptEn: 'Listen and pick the meaning.', audio: 'audio/phrases/eval-hsk1-b-8.mp3', hanzi: '我妈妈是老师。', choices: ['Maman est prof', 'Papa est prof', 'Maman est médecin', 'Sœur est prof'], correctIndex: 0, explanation: '妈妈是老师 = maman est prof.', explanationEn: 'Mom is a teacher.' }),
    q({ id: 'hsk1b-l9', prompt: 'Écoute et indique le sens.', promptEn: 'Listen and pick the meaning.', audio: 'audio/phrases/eval-hsk1-b-9.mp3', hanzi: '我不想去学校。', choices: ['Il veut aller à l\'école', 'Il ne veut pas aller à l\'école', 'Il aime l\'école', 'Il est à l\'école'], correctIndex: 1, explanation: '不想去 = ne veut pas y aller.', explanationEn: 'Doesn\'t want to go.' }),
    q({ id: 'hsk1b-l10', prompt: 'Écoute et choisis le sens.', promptEn: 'Listen and pick the meaning.', audio: 'audio/phrases/eval-hsk1-b-10.mp3', hanzi: '请坐，喝茶。', choices: ['Asseyez-vous, buvez du thé', 'Levez-vous', 'Partez maintenant', 'Mangez du riz'], correctIndex: 0, explanation: '请坐，喝茶 = invitation polie.', explanationEn: 'Polite invitation.' }),
  ],
  'hsk2b-vocab': [
    q({ id: 'hsk2b-v7', prompt: 'Que signifie 认识 ?', promptEn: 'What does 认识 mean?', choices: ['Savoir (fait)', 'Connaître (personne/lieu)', 'Oublier', 'Apprendre'], correctIndex: 1, explanation: '认识 = connaître qqn/qqch.', explanationEn: '认识 = know/recognize.' }),
    q({ id: 'hsk2b-v8', prompt: 'Que signifie 参加 ?', promptEn: 'What does 参加 mean?', choices: ['Participer à', 'Quitter', 'Écouter', 'Apprendre'], correctIndex: 0, explanation: '参加 = participer.', explanationEn: '参加 = participate.' }),
    q({ id: 'hsk2b-v9', prompt: 'Que signifie 完成 ?', promptEn: 'What does 完成 mean?', choices: ['Commencer', 'Terminer, achever', 'Répéter', 'Corriger'], correctIndex: 1, explanation: '完成 = achever.', explanationEn: '完成 = complete.' }),
    q({ id: 'hsk2b-v10', prompt: 'Que signifie 准备 ?', promptEn: 'What does 准备 mean?', choices: ['Préparer', 'Refuser', 'Oublier', 'Rejeter'], correctIndex: 0, explanation: '准备 = préparer.', explanationEn: '准备 = prepare.' }),
  ],
  'hsk2b-grammar': [
    q({ id: 'hsk2b-g7', prompt: 'Complète : 我 ___ 着急呢！', promptEn: 'Fill in: 我 ___ 着急呢！', choices: ['正在', '已经', '一点', '刚才'], correctIndex: 0, explanation: '正在…呢 = en train de.', explanationEn: '正在…呢 = in the middle of.' }),
    q({ id: 'hsk2b-g8', prompt: 'Complète : 他 ___ 我， ___ 我的朋友。', promptEn: 'Fill in: 他 ___ 我， ___ 我的朋友。', choices: ['认识…是', '知道…是', '看…是', '听…是'], correctIndex: 0, explanation: '认识 = connaître (personne).', explanationEn: '认识 = know (person).' }),
    q({ id: 'hsk2b-g9', prompt: 'Complète : 我 ___ 你一本书。', promptEn: 'Fill in: 我 ___ 你一本书。', choices: ['送给', '给', '送', '寄'], correctIndex: 0, explanation: '送给 = offrir à.', explanationEn: '送给 = give (as gift).' }),
    q({ id: 'hsk2b-g10', prompt: 'Complète : 你 ___ 来， ___ 打电话。', promptEn: 'Fill in: 你 ___ 来， ___ 打电话。', choices: ['不…就', '要…就', '别…就', '没…就'], correctIndex: 0, explanation: '不...就 = si pas... alors.', explanationEn: '不…就 = if not... then.' }),
  ],
  'hsk2b-reading': [
    q({ id: 'hsk2b-r7', context: '我今天坐飞机去上海开会。', contextEn: '我今天坐飞机去上海开会。', prompt: 'Pourquoi va-t-il à Shanghai ?', promptEn: 'Why Shanghai?', choices: ['Vacances', 'Réunion', 'Études', 'Famille'], correctIndex: 1, explanation: '开会 = tenir une réunion.', explanationEn: '开会 = meeting.' }),
    q({ id: 'hsk2b-r8', context: '今天我很累，想早点儿回家。', contextEn: '今天我很累，想早点儿回家。', prompt: 'Que veut-il faire ?', promptEn: 'What does he want?', choices: ['Travailler plus', 'Rentrer tôt', 'Sortir avec amis', 'Dîner dehors'], correctIndex: 1, explanation: '早点儿回家.', explanationEn: 'Go home early.' }),
    q({ id: 'hsk2b-r9', context: '我妹妹正在准备明天的考试。', contextEn: '我妹妹正在准备明天的考试。', prompt: 'Que fait la petite sœur ?', promptEn: 'Little sister\'s activity?', choices: ['Elle dort', 'Elle révise', 'Elle chante', 'Elle cuisine'], correctIndex: 1, explanation: '准备考试 = réviser pour un examen.', explanationEn: 'Studying for exam.' }),
    q({ id: 'hsk2b-r10', context: '这个地方的风景很美。', contextEn: '这个地方的风景很美。', prompt: 'Que dit-on du lieu ?', promptEn: 'What about the place?', choices: ['Beau paysage', 'Ennuyeux', 'Cher', 'Bruyant'], correctIndex: 0, explanation: '风景很美 = beau paysage.', explanationEn: 'Beautiful scenery.' }),
  ],
  'hsk2b-listening': [
    q({ id: 'hsk2b-l7', prompt: 'Écoute et choisis.', promptEn: 'Listen and pick.', audio: 'audio/phrases/eval-hsk2-b-7.mp3', hanzi: '我姐姐在医院工作。', choices: ['Grande sœur travaille à l\'hôpital', 'Elle étudie à l\'hôpital', 'Elle est malade', 'Elle rend visite à un ami'], correctIndex: 0, explanation: '在医院工作 = travaille à l\'hôpital.', explanationEn: 'Works at a hospital.' }),
    q({ id: 'hsk2b-l8', prompt: 'Écoute et trouve la décision.', promptEn: 'Listen and find the decision.', audio: 'audio/phrases/eval-hsk2-b-8.mp3', hanzi: '我打算下个月去旅游。', choices: ['Voyage prévu le mois prochain', 'Cesser les voyages', 'Voyager cette semaine', 'Rester chez soi'], correctIndex: 0, explanation: '打算 + 下个月 + 旅游.', explanationEn: 'Plans to travel next month.' }),
    q({ id: 'hsk2b-l9', prompt: 'Écoute et choisis le sens.', promptEn: 'Listen and pick the meaning.', audio: 'audio/phrases/eval-hsk2-b-9.mp3', hanzi: '这个房间太小了。', choices: ['La chambre est trop petite', 'La chambre est grande', 'La chambre est propre', 'La chambre est sombre'], correctIndex: 0, explanation: '太小了 = trop petit.', explanationEn: 'Too small.' }),
    q({ id: 'hsk2b-l10', prompt: 'Écoute et identifie l\'action.', promptEn: 'Listen and identify the action.', audio: 'audio/phrases/eval-hsk2-b-10.mp3', hanzi: '你可以帮我一下吗？', choices: ['Il demande de l\'aide', 'Il refuse de l\'aide', 'Il salue', 'Il remercie'], correctIndex: 0, explanation: '帮我一下 = m\'aider un peu.', explanationEn: 'Asking for help.' }),
  ],
  'hsk3b-vocab': [
    q({ id: 'hsk3b-v7', prompt: 'Que signifie 接受 ?', promptEn: 'What does 接受 mean?', choices: ['Rejeter', 'Accepter, recevoir', 'Envoyer', 'Refuser'], correctIndex: 1, explanation: '接受 = accepter.', explanationEn: '接受 = accept.' }),
    q({ id: 'hsk3b-v8', prompt: 'Que signifie 提醒 ?', promptEn: 'What does 提醒 mean?', choices: ['Rappeler à qqn', 'Cacher', 'Oublier', 'Réveiller'], correctIndex: 0, explanation: '提醒 = rappeler à qqn.', explanationEn: '提醒 = remind.' }),
    q({ id: 'hsk3b-v9', prompt: 'Que signifie 拒绝 ?', promptEn: 'What does 拒绝 mean?', choices: ['Refuser', 'Accepter', 'Hésiter', 'Réfléchir'], correctIndex: 0, explanation: '拒绝 = refuser.', explanationEn: '拒绝 = refuse.' }),
    q({ id: 'hsk3b-v10', prompt: 'Que signifie 表演 ?', promptEn: 'What does 表演 mean?', choices: ['Performance, spectacle', 'Étude', 'Recherche', 'Écriture'], correctIndex: 0, explanation: '表演 = spectacle, performance.', explanationEn: '表演 = performance.' }),
  ],
  'hsk3b-grammar': [
    q({ id: 'hsk3b-g7', prompt: 'Complète : 他 ___ 比我 ___ 得多。', promptEn: 'Fill in: 他 ___ 比我 ___ 得多。', choices: ['跑…快', '走…慢', '吃…多', '看…少'], correctIndex: 0, explanation: 'A 比 B + V + 得多 = bien plus...', explanationEn: 'A 比 B + V + 得多 = far more.' }),
    q({ id: 'hsk3b-g8', prompt: 'Complète : 我 ___ 同学们一起复习。', promptEn: 'Fill in: 我 ___ 同学们一起复习。', choices: ['和', '是', '都', '只'], correctIndex: 0, explanation: '和...一起 = avec.', explanationEn: '和...一起 = together with.' }),
    q({ id: 'hsk3b-g9', prompt: 'Complète : 别担心， ___ 我来处理。', promptEn: 'Fill in: 别担心， ___ 我来处理。', choices: ['让', '把', '被', '叫'], correctIndex: 0, explanation: '让 + me 来 + V = laisse-moi faire.', explanationEn: '让 + me 来 + V = let me handle.' }),
    q({ id: 'hsk3b-g10', prompt: 'Complète : 我 ___ 你的帮助， ___ 很感谢。', promptEn: 'Fill in: 我 ___ 你的帮助， ___ 很感谢。', choices: ['对…感到', '把…感到', '让…感到', '被…感到'], correctIndex: 0, explanation: '对...感到 = se sentir... à propos de.', explanationEn: '对...感到 = feel ... about.' }),
  ],
  'hsk3b-reading': [
    q({ id: 'hsk3b-r7', context: '我最喜欢的季节是春天，因为天气不冷不热。', contextEn: '我最喜欢的季节是春天，因为天气不冷不热。', prompt: 'Pourquoi aime-t-il le printemps ?', promptEn: 'Why spring?', choices: ['Il fait chaud', 'Ni froid ni chaud', 'Les fleurs', 'Les vacances'], correctIndex: 1, explanation: '不冷不热 = ni froid ni chaud.', explanationEn: 'Neither cold nor hot.' }),
    q({ id: 'hsk3b-r8', context: '这家店的衣服质量不错，价格也不贵。', contextEn: '这家店的衣服质量不错，价格也不贵。', prompt: 'Que dit-on du magasin ?', promptEn: 'What about the shop?', choices: ['Qualité + prix OK', 'Cher', 'Mauvaise qualité', 'Fermé'], correctIndex: 0, explanation: '质量不错 + 价格不贵.', explanationEn: 'Good quality + cheap.' }),
    q({ id: 'hsk3b-r9', context: '儿童应该多运动，少看手机。', contextEn: '儿童应该多运动，少看手机。', prompt: 'Quel conseil pour les enfants ?', promptEn: 'Advice for kids?', choices: ['Plus d\'écrans', 'Plus de sport, moins d\'écrans', 'Dormir plus', 'Étudier plus'], correctIndex: 1, explanation: '多运动，少看手机.', explanationEn: 'More sport, less phone.' }),
    q({ id: 'hsk3b-r10', context: '如果你有问题，可以随时给我打电话。', contextEn: '如果你有问题，可以随时给我打电话。', prompt: 'Que propose la personne ?', promptEn: 'What is offered?', choices: ['Appeler à tout moment', 'Envoyer un mail', 'Venir en personne', 'Oublier le problème'], correctIndex: 0, explanation: '随时打电话 = appeler à tout moment.', explanationEn: 'Call anytime.' }),
  ],
  'hsk3b-listening': [
    q({ id: 'hsk3b-l7', prompt: 'Écoute et choisis le sens.', promptEn: 'Listen and pick the meaning.', audio: 'audio/phrases/eval-hsk3-b-7.mp3', hanzi: '请你帮我把窗户关上。', choices: ['Ferme la fenêtre SVP', 'Ouvre la fenêtre SVP', 'Lave la fenêtre', 'Répare la fenêtre'], correctIndex: 0, explanation: '把窗户关上 = fermer la fenêtre.', explanationEn: 'Close the window.' }),
    q({ id: 'hsk3b-l8', prompt: 'Écoute et identifie l\'information.', promptEn: 'Listen and identify the info.', audio: 'audio/phrases/eval-hsk3-b-8.mp3', hanzi: '我今年二十五岁了。', choices: ['25 ans', '20 ans', '15 ans', '30 ans'], correctIndex: 0, explanation: '二十五岁 = 25 ans.', explanationEn: '25 years old.' }),
    q({ id: 'hsk3b-l9', prompt: 'Écoute et choisis le but.', promptEn: 'Listen and pick the purpose.', audio: 'audio/phrases/eval-hsk3-b-9.mp3', hanzi: '为了考试，我每天都复习。', choices: ['Pour l\'examen, révise chaque jour', 'Il travaille', 'Il voyage', 'Il se repose'], correctIndex: 0, explanation: '为了 = pour, en vue de.', explanationEn: 'In order to (exam).' }),
    q({ id: 'hsk3b-l10', prompt: 'Écoute et choisis le sens.', promptEn: 'Listen and pick the meaning.', audio: 'audio/phrases/eval-hsk3-b-10.mp3', hanzi: '我打算下周去看望爷爷。', choices: ['Visite grand-père la semaine prochaine', 'Hier il a visité', 'Aujourd\'hui à l\'hôpital', 'Demain un ami'], correctIndex: 0, explanation: '下周去看望 = la sem. prochaine aller voir.', explanationEn: 'Visit grandpa next week.' }),
  ],
  'hsk4b-vocab': [
    q({ id: 'hsk4b-v8', prompt: 'Que signifie 尊重 ?', promptEn: 'What does 尊重 mean?', choices: ['Respecter', 'Ignorer', 'Critiquer', 'Imiter'], correctIndex: 0, explanation: '尊重 = respecter.', explanationEn: '尊重 = respect.' }),
    q({ id: 'hsk4b-v9', prompt: 'Que signifie 危险 ?', promptEn: 'What does 危险 mean?', choices: ['Sûr', 'Dangereux', 'Difficile', 'Amusant'], correctIndex: 1, explanation: '危险 = dangereux.', explanationEn: '危险 = dangerous.' }),
    q({ id: 'hsk4b-v10', prompt: 'Que signifie 安排 ?', promptEn: 'What does 安排 mean?', choices: ['Organiser, arranger', 'Annuler', 'Refuser', 'Oublier'], correctIndex: 0, explanation: '安排 = arranger.', explanationEn: '安排 = arrange.' }),
  ],
  'hsk4b-grammar': [
    q({ id: 'hsk4b-g7', prompt: 'Complète : 我 ___ 来 ___ 早。', promptEn: 'Fill in: 我 ___ 来 ___ 早。', choices: ['越…越', '越来越', '一边…一边', '又…又'], correctIndex: 1, explanation: '越来越 + adj = de plus en plus.', explanationEn: '越来越 + adj = more and more.' }),
    q({ id: 'hsk4b-g8', prompt: 'Complète : 不但…而且 : 这本书 ___ 好看 ___ 便宜。', promptEn: 'Fill in: 不但…而且 : 这本书 ___ 好看 ___ 便宜。', choices: ['不但…而且', '虽然…但是', '因为…所以', '既然…就'], correctIndex: 0, explanation: '不但…而且 = non seulement... mais aussi.', explanationEn: '不但…而且 = not only... but also.' }),
    q({ id: 'hsk4b-g9', prompt: 'Complète : 只要努力， ___ 一定能成功。', promptEn: 'Fill in: 只要努力， ___ 一定能成功。', choices: ['就', '才', '还', '也'], correctIndex: 0, explanation: '只要…就 = il suffit que...', explanationEn: '只要…就 = as long as... then.' }),
    q({ id: 'hsk4b-g10', prompt: 'Complète : 通过 ___ 努力，他终于成功了。', promptEn: 'Fill in: 通过 ___ 努力，他终于成功了。', choices: ['的', '地', '得', '了'], correctIndex: 0, explanation: '通过 + N + 的努力.', explanationEn: '通过 + N\'s efforts.' }),
  ],
  'hsk4b-reading': [
    q({ id: 'hsk4b-r7', context: '很多人都说读书可以让人变得更有智慧。', contextEn: '很多人都说读书可以让人变得更有智慧。', prompt: 'Quel effet de la lecture ?', promptEn: 'Effect of reading?', choices: ['Plus intelligent / sage', 'Plus fatigué', 'Moins attentif', 'Sans effet'], correctIndex: 0, explanation: '更有智慧 = plus sage.', explanationEn: 'Wiser.' }),
    q({ id: 'hsk4b-r8', context: '学外语不能只靠课本，还要多看电影听音乐。', contextEn: '学外语不能只靠课本，还要多看电影听音乐。', prompt: 'Quelle est la méthode suggérée ?', promptEn: 'Method suggested?', choices: ['Juste les livres', 'Combiner livres + films/musique', 'Voyager', 'Prendre des cours privés'], correctIndex: 1, explanation: '多看电影听音乐 = beaucoup films et musique.', explanationEn: 'Watch movies + listen to music.' }),
    q({ id: 'hsk4b-r9', context: '保护眼睛很重要，使用电脑不要超过两个小时。', contextEn: '保护眼睛很重要，使用电脑不要超过两个小时。', prompt: 'Quel conseil pour les yeux ?', promptEn: 'Advice for eyes?', choices: ['Limite écrans à 2h', 'Utiliser PC 8h', 'Porter lunettes', 'Rien de spécial'], correctIndex: 0, explanation: '不要超过两个小时.', explanationEn: 'Cap at 2h.' }),
    q({ id: 'hsk4b-r10', context: '这次活动很成功，参加的人比预计的多。', contextEn: '这次活动很成功，参加的人比预计的多。', prompt: 'Que dit-on de l\'événement ?', promptEn: 'About the event?', choices: ['Plus de monde qu\'attendu', 'Annulé', 'Peu fréquenté', 'Sans succès'], correctIndex: 0, explanation: '参加的人比预计的多.', explanationEn: 'More attendees than expected.' }),
  ],
  'hsk4b-listening': [
    q({ id: 'hsk4b-l7', prompt: 'Écoute et identifie l\'avis.', promptEn: 'Listen and pick the view.', audio: 'audio/phrases/eval-hsk4-b-7.mp3', hanzi: '我觉得学好汉语需要大量的练习。', choices: ['Maîtriser le chinois demande beaucoup de pratique', 'Le chinois est facile', 'Il n\'aime pas le chinois', 'Il enseigne le chinois'], correctIndex: 0, explanation: '学好汉语需要大量的练习.', explanationEn: 'Mastering Chinese needs lots of practice.' }),
    q({ id: 'hsk4b-l8', prompt: 'Écoute et choisis l\'action.', promptEn: 'Listen and pick the action.', audio: 'audio/phrases/eval-hsk4-b-8.mp3', hanzi: '我们应该尊重别人的意见。', choices: ['Respecter l\'avis d\'autrui', 'Critiquer les autres', 'Ignorer les avis', 'Changer d\'avis'], correctIndex: 0, explanation: '尊重别人的意见.', explanationEn: 'Respect others\' views.' }),
    q({ id: 'hsk4b-l9', prompt: 'Écoute et identifie l\'information.', promptEn: 'Listen and identify the info.', audio: 'audio/phrases/eval-hsk4-b-9.mp3', hanzi: '明天的会议推迟到下周一。', choices: ['Réunion reportée à lundi prochain', 'Annulée', 'Avancée', 'Maintenue'], correctIndex: 0, explanation: '推迟到下周一.', explanationEn: 'Postponed to next Monday.' }),
    q({ id: 'hsk4b-l10', prompt: 'Écoute et choisis l\'intention.', promptEn: 'Listen and pick the intention.', audio: 'audio/phrases/eval-hsk4-b-10.mp3', hanzi: '她希望将来成为一名医生。', choices: ['Elle espère devenir médecin', 'Elle est déjà médecin', 'Elle n\'aime pas la médecine', 'Elle étudie le droit'], correctIndex: 0, explanation: '希望将来成为医生.', explanationEn: 'Hopes to become a doctor.' }),
  ],
  'hsk5b-vocab': [
    q({ id: 'hsk5b-v8', prompt: 'Que signifie 批评 ?', promptEn: 'What does 批评 mean?', choices: ['Critiquer', 'Louer', 'Ignorer', 'Féliciter'], correctIndex: 0, explanation: '批评 = critiquer.', explanationEn: '批评 = criticize.' }),
    q({ id: 'hsk5b-v9', prompt: 'Que signifie 尽管 ?', promptEn: 'What does 尽管 mean?', choices: ['Bien que', 'Parce que', 'Si', 'Donc'], correctIndex: 0, explanation: '尽管 = bien que.', explanationEn: '尽管 = although.' }),
    q({ id: 'hsk5b-v10', prompt: 'Que signifie 主张 ?', promptEn: 'What does 主张 mean?', choices: ['Préconiser', 'Refuser', 'Éviter', 'Attendre'], correctIndex: 0, explanation: '主张 = préconiser.', explanationEn: '主张 = advocate.' }),
  ],
  'hsk5b-grammar': [
    q({ id: 'hsk5b-g7', prompt: 'Complète : 他的观点 ___ 新颖， ___ 有深度。', promptEn: 'Fill in: 他的观点 ___ 新颖， ___ 有深度。', choices: ['不但…而且', '虽然…但是', '除了…以外', '要么…要么'], correctIndex: 0, explanation: '不但…而且 = non seulement... mais aussi.', explanationEn: '不但…而且 = not only... but also.' }),
    q({ id: 'hsk5b-g8', prompt: 'Complète : ___ 他的经验， ___ 他的智慧，都值得学习。', promptEn: 'Fill in: ___ 他的经验， ___ 他的智慧，都值得学习。', choices: ['无论…还是', '只要…就', '除非…才', '与其…不如'], correctIndex: 0, explanation: '无论…还是 = que ce soit... ou.', explanationEn: '无论…还是 = whether... or.' }),
    q({ id: 'hsk5b-g9', prompt: 'Complète : ___ 你再忙， ___ 要陪家人。', promptEn: 'Fill in: ___ 你再忙， ___ 要陪家人。', choices: ['不管…都', '如果…就', '因为…所以', '只要…就'], correctIndex: 0, explanation: '不管…都 = peu importe... quand même.', explanationEn: '不管…都 = no matter... still.' }),
    q({ id: 'hsk5b-g10', prompt: 'Complète : ___ 你不同意， ___ 不能强迫别人。', promptEn: 'Fill in: ___ 你不同意， ___ 不能强迫别人。', choices: ['即使…也', '既然…就', '虽然…但是', '不仅…还'], correctIndex: 0, explanation: '即使…也 = même si... quand même.', explanationEn: '即使…也 = even if... still.' }),
  ],
  'hsk5b-reading': [
    q({ id: 'hsk5b-r7', context: '互联网的普及使人与人之间的距离越来越近。', contextEn: '互联网的普及使人与人之间的距离越来越近。', prompt: 'Quelle est la conséquence d\'Internet ?', promptEn: 'Consequence of the internet?', choices: ['Gens plus proches', 'Plus isolés', 'Plus de conflits', 'Moins de communication'], correctIndex: 0, explanation: '距离越来越近 = de plus en plus proches.', explanationEn: 'People feel closer.' }),
    q({ id: 'hsk5b-r8', context: '健康的饮食应该搭配合理，不能只吃一种食物。', contextEn: '健康的饮食应该搭配合理，不能只吃一种食物。', prompt: 'Quel est le conseil ?', promptEn: 'Advice?', choices: ['Varier l\'alimentation', 'Manger un seul aliment', 'Ne rien manger', 'Manger beaucoup'], correctIndex: 0, explanation: '搭配合理 = équilibrer.', explanationEn: 'Balance variety.' }),
    q({ id: 'hsk5b-r9', context: '尽管工作很辛苦，他依然保持乐观的态度。', contextEn: '尽管工作很辛苦，他依然保持乐观的态度。', prompt: 'Quelle est son attitude ?', promptEn: 'His attitude?', choices: ['Pessimiste', 'Optimiste malgré la dureté', 'Indifférent', 'Triste'], correctIndex: 1, explanation: '依然保持乐观.', explanationEn: 'Remains optimistic.' }),
    q({ id: 'hsk5b-r10', context: '学习一门艺术需要长时间的积累。', contextEn: '学习一门艺术需要长时间的积累。', prompt: 'Qu\'apprend-on de l\'art ?', promptEn: 'Art lesson?', choices: ['Nécessite une longue accumulation', 'Rapide à maîtriser', 'Fait pour peu de gens', 'Trop cher'], correctIndex: 0, explanation: '长时间的积累 = longue accumulation.', explanationEn: 'Long accumulation.' }),
  ],
  'hsk5b-listening': [
    q({ id: 'hsk5b-l7', prompt: 'Écoute et choisis la position.', promptEn: 'Listen and pick the stance.', audio: 'audio/phrases/eval-hsk5-b-7.mp3', hanzi: '尽管他失败过，但他从不放弃。', choices: ['Il abandonne souvent', 'Malgré ses échecs, il ne renonce pas', 'Il a toujours réussi', 'Il évite les défis'], correctIndex: 1, explanation: '尽管 + 从不放弃.', explanationEn: 'Despite failure, never gives up.' }),
    q({ id: 'hsk5b-l8', prompt: 'Écoute et trouve l\'opinion.', promptEn: 'Listen and find the opinion.', audio: 'audio/phrases/eval-hsk5-b-8.mp3', hanzi: '我觉得诚实比聪明更重要。', choices: ['Honnêteté > intelligence', 'Intelligence seulement', 'Ni l\'un ni l\'autre', 'Les deux égaux'], correctIndex: 0, explanation: '诚实比聪明更重要.', explanationEn: 'Honesty > smarts.' }),
    q({ id: 'hsk5b-l9', prompt: 'Écoute et identifie la décision.', promptEn: 'Listen and identify the decision.', audio: 'audio/phrases/eval-hsk5-b-9.mp3', hanzi: '为了提高效率，我们需要改变工作方式。', choices: ['Changer la méthode pour plus d\'efficacité', 'Rien ne change', 'Diminuer le travail', 'Augmenter les salaires'], correctIndex: 0, explanation: '提高效率 + 改变工作方式.', explanationEn: 'Change method to raise efficiency.' }),
    q({ id: 'hsk5b-l10', prompt: 'Écoute et trouve le conseil.', promptEn: 'Listen and find the advice.', audio: 'audio/phrases/eval-hsk5-b-10.mp3', hanzi: '无论做什么，都要有计划。', choices: ['Toujours planifier', 'Agir vite sans plan', 'Copier les autres', 'Attendre les ordres'], correctIndex: 0, explanation: '无论…都要有计划.', explanationEn: 'Always plan.' }),
  ],
  'hsk6b-vocab': [
    q({ id: 'hsk6b-v8', prompt: 'Que signifie 渗透 ?', promptEn: 'What does 渗透 mean?', choices: ['Imprégner, pénétrer', 'Évaporer', 'Emballer', 'Délimiter'], correctIndex: 0, explanation: '渗透 = imprégner.', explanationEn: '渗透 = permeate.' }),
    q({ id: 'hsk6b-v9', prompt: 'Que signifie 盲目 ?', promptEn: 'What does 盲目 mean?', choices: ['Aveugle, sans réflexion', 'Lucide', 'Méthodique', 'Ouvert'], correctIndex: 0, explanation: '盲目 = aveugle (au sens figuré).', explanationEn: '盲目 = blind (figurative).' }),
    q({ id: 'hsk6b-v10', prompt: 'Que signifie 制约 ?', promptEn: 'What does 制约 mean?', choices: ['Contraindre, limiter', 'Libérer', 'Stabiliser', 'Accroître'], correctIndex: 0, explanation: '制约 = contraindre.', explanationEn: '制约 = restrict.' }),
  ],
  'hsk6b-grammar': [
    q({ id: 'hsk6b-g7', prompt: 'Complète : ___ 时间紧迫， ___ 他仍保持冷静。', promptEn: 'Fill in: ___ 时间紧迫， ___ 他仍保持冷静。', choices: ['尽管…但是', '因为…所以', '只要…就', '一旦…就'], correctIndex: 0, explanation: '尽管…但是 = bien que... cependant.', explanationEn: '尽管…但是 = although... yet.' }),
    q({ id: 'hsk6b-g8', prompt: 'Complète : ___ 你同意 ___ 反对，都可以投票。', promptEn: 'Fill in: ___ 你同意 ___ 反对，都可以投票。', choices: ['无论…还是', '只要…就', '除非…才', '不仅…还'], correctIndex: 0, explanation: '无论…还是 = que... ou.', explanationEn: '无论…还是 = whether... or.' }),
    q({ id: 'hsk6b-g9', prompt: 'Complète : 他的话 ___ 真诚， ___ 让人信服。', promptEn: 'Fill in: 他的话 ___ 真诚， ___ 让人信服。', choices: ['既…又', '不但…而且', '一边…一边', '无论…都'], correctIndex: 1, explanation: '不但…而且 = non seulement... mais aussi.', explanationEn: '不但…而且 = not only... but also.' }),
    q({ id: 'hsk6b-g10', prompt: 'Complète : 一旦下决心， ___ 不能轻易改变。', promptEn: 'Fill in: 一旦下决心， ___ 不能轻易改变。', choices: ['就', '才', '还', '也'], correctIndex: 0, explanation: '一旦…就 = une fois que... alors.', explanationEn: '一旦…就 = once... then.' }),
  ],
  'hsk6b-reading': [
    q({ id: 'hsk6b-r7', context: '社会的进步离不开每一个普通人的努力。', contextEn: '社会的进步离不开每一个普通人的努力。', prompt: 'Que soutient le texte ?', promptEn: 'Main claim?', choices: ['Progrès grâce aux gens ordinaires', 'Progrès = seuls les élites', 'Pas de progrès possible', 'Le passé est mieux'], correctIndex: 0, explanation: '离不开每一个普通人的努力.', explanationEn: 'Depends on every ordinary person.' }),
    q({ id: 'hsk6b-r8', context: '语言不仅是交流的工具，也是文化的载体。', contextEn: '语言不仅是交流的工具，也是文化的载体。', prompt: 'Quelle double fonction du langage ?', promptEn: 'Dual role of language?', choices: ['Communication + vecteur culturel', 'Uniquement outil', 'Uniquement culturel', 'Juste esthétique'], correctIndex: 0, explanation: '交流的工具 + 文化的载体.', explanationEn: 'Tool + cultural carrier.' }),
    q({ id: 'hsk6b-r9', context: '盲目追求名利往往让人迷失自我。', contextEn: '盲目追求名利往往让人迷失自我。', prompt: 'Quel risque est pointé ?', promptEn: 'Risk pointed out?', choices: ['Perdre son identité', 'Gagner trop', 'Devenir trop discret', 'Être mal vu'], correctIndex: 0, explanation: '迷失自我 = se perdre.', explanationEn: 'Lose oneself.' }),
    q({ id: 'hsk6b-r10', context: '只有经历过挫折，才能真正懂得珍惜。', contextEn: '只有经历过挫折，才能真正懂得珍惜。', prompt: 'Quelle leçon est tirée ?', promptEn: 'Lesson?', choices: ['L\'adversité apprend la valeur des choses', 'Il faut éviter les difficultés', 'Le succès facile est mieux', 'Chacun fait comme il veut'], correctIndex: 0, explanation: '经历挫折 + 懂得珍惜.', explanationEn: 'Hardship teaches appreciation.' }),
  ],
  'hsk6b-listening': [
    q({ id: 'hsk6b-l7', prompt: 'Écoute et choisis la thèse.', promptEn: 'Listen and pick the thesis.', audio: 'audio/phrases/eval-hsk6-b-7.mp3', hanzi: '知识改变命运，但态度决定成败。', choices: ['Savoir change le destin, attitude décide du succès', 'Seul le savoir compte', 'Le destin est fixé', 'Rien ne change'], correctIndex: 0, explanation: '知识改变命运 + 态度决定成败.', explanationEn: 'Knowledge changes fate, attitude decides outcome.' }),
    q({ id: 'hsk6b-l8', prompt: 'Écoute et trouve la nuance.', promptEn: 'Listen and find the nuance.', audio: 'audio/phrases/eval-hsk6-b-8.mp3', hanzi: '真正的智慧来源于不断的反思。', choices: ['Vraie sagesse = réflexion constante', 'Sagesse innée', 'Sagesse = argent', 'Aucune sagesse'], correctIndex: 0, explanation: '智慧 + 反思.', explanationEn: 'Wisdom = ongoing reflection.' }),
    q({ id: 'hsk6b-l9', prompt: 'Écoute et identifie l\'argument.', promptEn: 'Listen and identify the argument.', audio: 'audio/phrases/eval-hsk6-b-9.mp3', hanzi: '盲目跟从他人的选择，往往会后悔。', choices: ['Suivre aveuglément mène au regret', 'Toujours bien de suivre', 'L\'indépendance nuit', 'Rien à voir'], correctIndex: 0, explanation: '盲目跟从 + 后悔.', explanationEn: 'Blind following → regret.' }),
    q({ id: 'hsk6b-l10', prompt: 'Écoute et choisis l\'idée.', promptEn: 'Listen and pick the idea.', audio: 'audio/phrases/eval-hsk6-b-10.mp3', hanzi: '世上无难事，只怕有心人。', choices: ['Rien n\'est impossible pour qui veut vraiment', 'Tout est impossible', 'Seul le talent compte', 'Le destin décide'], correctIndex: 0, explanation: 'Proverbe classique.', explanationEn: 'Classical proverb.' }),
  ],
};
