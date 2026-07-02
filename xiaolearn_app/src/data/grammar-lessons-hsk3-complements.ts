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
      whenToUse: 'Après un verbe de mouvement, 来/去 précise l\'orientation par rapport au LOCUTEUR. Registre universel (oral et écrit, tous les jours).\n\n**Sous-cas typiques :**\n1. **Invitation** : 请进来 (« entre chez moi »), 请上来 (« monte me rejoindre »).\n2. **Ordre / suggestion** : 快下来！ (« descends vite ! »), 你回去吧 (« rentre chez toi »).\n3. **Description factuelle** : 他上去了 (« il est monté »), 她刚回来 (« elle vient de rentrer »).\n4. **Verbes de base concernés** : 上 (monter), 下 (descendre), 进 (entrer), 出 (sortir), 回 (revenir), 过 (traverser), 起 (se lever).\n5. **Perspective du locuteur** : le point de référence est TOUJOURS le locuteur (où IL se trouve au moment où il parle).\n\nFréquence : très élevée dans le langage courant. Impossible de parler chinois naturellement sans maîtriser 来/去.',
      whenToUseEn: 'After a motion verb, 来/去 marks direction relative to the SPEAKER. Universal register (spoken and written, everyday).\n\n**Typical sub-cases:**\n1. **Invitation**: 请进来 ("come in to me"), 请上来 ("come up here").\n2. **Command / suggestion**: 快下来！("come down quickly!"), 你回去吧 ("go back home").\n3. **Factual description**: 他上去了 ("he went up"), 她刚回来 ("she just came back").\n4. **Base verbs involved**: 上 (up), 下 (down), 进 (in), 出 (out), 回 (back), 过 (across), 起 (rise).\n5. **Speaker perspective**: reference point is ALWAYS the speaker (where they are when talking).\n\nFrequency: very high in daily language. Impossible to speak Chinese naturally without mastering 来/去.',
      howToUse: '**Structure 1 :** Verbe + 来/去 (sans objet).\n• Ex : 上来 (shànglái) = monte vers moi\n• Ex : 上去 (shàngqù) = monte là-bas\n• Ex : 进来 (jìnlái) = entre (chez moi)\n• Ex : 进去 (jìnqù) = entre (là-bas)\n• Ex : 回来 (huílái) = reviens (ici)\n• Ex : 回去 (huíqù) = rentre (chez toi)\n• Ex : 出去 (chūqù) = sors (loin de moi)\n\n**Structure 2 :** Verbe + Lieu + 来/去 (le lieu s\'insère entre le verbe et 来/去).\n• Ex : 上楼来 (shàng lóu lái) = monte à l\'étage (vers moi)\n• Ex : 回家去 (huí jiā qù) = rentre chez toi\n• Ex : 进屋来 (jìn wū lái) = entre dans la pièce (chez moi)\n• Ex : 到中国去 (dào Zhōngguó qù) = va en Chine\n\n**Structure 3 :** Négation avec 不 devant le verbe.\n• Ex : 他不上来 (tā bù shànglái) = il ne monte pas (vers moi)\n• Ex : 我不回去 (wǒ bù huíqù) = je ne rentre pas\n\n**Structure 4 :** Question avec 吗 ou reformulation A/pas A.\n• Ex : 你回来吗？(nǐ huílái ma?) = tu reviens ?\n• Ex : 他上来不上来？(tā shànglái bù shànglái?) = est-ce qu\'il monte ?\n\n**Structure 5 :** Avec 了 (action accomplie).\n• Ex : 他回来了 (tā huílái le) = il est revenu\n• Ex : 妈妈出去了 (māma chūqù le) = maman est sortie',
      howToUseEn: '**Structure 1:** Verb + 来/去 (no object).\n• Ex: 上来 (shànglái) = come up (to me)\n• Ex: 上去 (shàngqù) = go up (there)\n• Ex: 进来 (jìnlái) = come in (to me)\n• Ex: 进去 (jìnqù) = go in (there)\n• Ex: 回来 (huílái) = come back (here)\n• Ex: 回去 (huíqù) = go back (there)\n• Ex: 出去 (chūqù) = go out (away)\n\n**Structure 2:** Verb + Place + 来/去 (place inserted between verb and 来/去).\n• Ex: 上楼来 (shàng lóu lái) = come upstairs (to me)\n• Ex: 回家去 (huí jiā qù) = go back home\n• Ex: 进屋来 (jìn wū lái) = come into the room (to me)\n• Ex: 到中国去 (dào Zhōngguó qù) = go to China\n\n**Structure 3:** Negation with 不 before the verb.\n• Ex: 他不上来 (tā bù shànglái) = he\'s not coming up\n• Ex: 我不回去 (wǒ bù huíqù) = I\'m not going back\n\n**Structure 4:** Question with 吗 or A/not-A reformulation.\n• Ex: 你回来吗？(nǐ huílái ma?) = are you coming back?\n• Ex: 他上来不上来？= is he coming up or not?\n\n**Structure 5:** With 了 (completed action).\n• Ex: 他回来了 (tā huílái le) = he\'s back\n• Ex: 妈妈出去了 (māma chūqù le) = mom went out',
      commonMistakes: '❌ 请进去 quand tu es DANS la pièce (bizarre) ; ✅ 请进来 (le locuteur est à l\'intérieur, donc « viens vers moi »).\n❌ 你回来吧 dit par quelqu\'un qui va lui-même partir ; ✅ 你回去吧 (« rentre chez toi », le locuteur ne va PAS là-bas).\n❌ **Calque du français** : « il vient » traduit par 他来 tout court sans direction ; ✅ 他过来 ou 他上来 selon le contexte.\n❌ Placer le lieu APRÈS 来/去 : 我上来楼 ; ✅ 我上楼来 (le lieu s\'insère AU MILIEU).\n❌ Utiliser 去 quand le locuteur est la destination : « viens me voir » traduit 你去看我 ; ✅ 你来看我.\n❌ Ordre inversé : 来上 ou 去回 ; ✅ TOUJOURS verbe + 来/去.\n❌ Confondre avec 走 : 走 (marcher) n\'exprime pas la direction ; il faut 走过来 (« viens vers moi en marchant »).',
      commonMistakesEn: '❌ 请进去 when you\'re INSIDE the room (odd); ✅ 请进来 (speaker is inside → "come to me").\n❌ 你回来吧 said by someone who\'s about to leave; ✅ 你回去吧 ("go back", speaker is NOT going there).\n❌ **French calque**: "he comes" translated as 他来 without direction; ✅ 他过来 or 他上来 depending on context.\n❌ Placing the location AFTER 来/去: 我上来楼; ✅ 我上楼来 (location goes IN THE MIDDLE).\n❌ Using 去 when the speaker is the destination: "come see me" as 你去看我; ✅ 你来看我.\n❌ Wrong order: 来上 or 去回; ✅ ALWAYS verb + 来/去.\n❌ Confusing with 走: 走 (walk) doesn\'t encode direction; use 走过来 ("walk over to me").',
      tips: '💡 **Mnémo de base** : 来 = « TO ME » (aimant vers le locuteur), 去 = « AWAY » (loin du locuteur). Pense TOUJOURS à la position du locuteur.\n💡 **Deux personnes = deux points de vue** : « rentre chez toi » se dit 回去 (le locuteur reste), mais si tu invites chez toi c\'est 回来.\n💡 **Insertion du lieu** : Verbe + LIEU + 来/去 est la forme la plus naturelle. Mémorise 回家来 vs 回家去 comme paire.\n💡 **Contraste avec 走/跑** : les verbes de manière (走 marcher, 跑 courir) DOIVENT être combinés avec 上/下/进/出 + 来/去 pour indiquer la direction (voir fiche « complément composé »).\n💡 **Expression courante** : 出来 en fin de phrase peut aussi être figuratif (voir fiche « directionnels figuratifs »).\n💡 **Astuce téléphone** : au téléphone, la personne au bout du fil est « là-bas », donc 你什么时候回来？ = « quand reviens-tu (ici) ? ».',
      tipsEn: '💡 **Core mnemonic**: 来 = "TO ME" (magnet toward speaker), 去 = "AWAY" (away from speaker). ALWAYS think about the speaker\'s position.\n💡 **Two people = two viewpoints**: "go home" is 回去 (speaker stays), but if inviting to your home it\'s 回来.\n💡 **Location insertion**: Verb + PLACE + 来/去 is the most natural form. Memorize 回家来 vs 回家去 as a pair.\n💡 **Contrast with 走/跑**: manner verbs (走 walk, 跑 run) MUST combine with 上/下/进/出 + 来/去 to encode direction (see "compound directional" card).\n💡 **Common idiom**: 出来 at sentence end can also be figurative (see "figurative directionals" card).\n💡 **Phone tip**: on the phone, the other side is "over there", so 你什么时候回来？= "when are you coming back (here)?"',
      relatedGrammar: ['grammar-directional-compound']
    },
    audio: 'audio/grammar/grammar-directional-simple.wav',
    examples: [
      { hanzi: '快下来！', pinyin: 'kuài xiàlái!', translation: 'Come down quickly!', translationFr: 'Descends vite (vers moi) !' },
      { hanzi: '他上去了', pinyin: 'tā shàngqù le', translation: 'He went up', translationFr: 'Il est monté (loin de moi)' },
      { hanzi: '请进来', pinyin: 'qǐng jìnlái', translation: 'Please come in', translationFr: 'Entre s\'il te plaît (chez moi)' },
      { hanzi: '你什么时候回来？', pinyin: 'nǐ shénme shíhou huílái?', translation: 'When are you coming back?', translationFr: 'Quand est-ce que tu reviens ?' },
      { hanzi: '妈妈出去买菜了', pinyin: 'māma chūqù mǎi cài le', translation: 'Mom went out to buy groceries', translationFr: 'Maman est sortie faire les courses' },
      { hanzi: '请上楼来', pinyin: 'qǐng shàng lóu lái', translation: 'Please come upstairs', translationFr: 'Monte à l\'étage s\'il te plaît' },
      { hanzi: '你回家去吧，我留在这里', pinyin: 'nǐ huí jiā qù ba, wǒ liú zài zhèlǐ', translation: 'Go home, I\'ll stay here', translationFr: 'Rentre chez toi, moi je reste ici' }
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
      whenToUse: 'Pour décrire un mouvement PRÉCIS qui combine (1) une manière d\'action (courir, marcher, porter…), (2) une direction spatiale (haut, bas, dedans, dehors…) et (3) une orientation par rapport au locuteur. Registre : universel, très fréquent à l\'oral comme à l\'écrit.\n\n**Sous-cas typiques :**\n1. **Verbes de déplacement** : 走 (marcher), 跑 (courir), 跳 (sauter), 飞 (voler) + directionnel + 来/去.\n2. **Verbes de manipulation** : 拿 (prendre), 带 (emporter), 送 (livrer), 搬 (déménager) + directionnel + 来/去 + objet.\n3. **Verbes de posture** : 站起来 (se lever), 坐下来 (s\'asseoir), 躺下来 (s\'allonger), 蹲下去 (s\'accroupir).\n4. **Verbes de perception/pensée** (usage figuratif de 起来/下来/出来 — voir fiche dédiée).\n5. **Constructions avec 把** : 把 + Objet + Verbe + Directionnel + 来/去 (structure clé).\n\nFréquence : indispensable dès qu\'on décrit un mouvement en détail (récit, instructions, action).',
      whenToUseEn: 'To describe a PRECISE motion that combines (1) a manner of action (run, walk, carry…), (2) a spatial direction (up, down, in, out…) and (3) orientation relative to the speaker. Register: universal, very common in speech and writing.\n\n**Typical sub-cases:**\n1. **Motion verbs**: 走 (walk), 跑 (run), 跳 (jump), 飞 (fly) + directional + 来/去.\n2. **Handling verbs**: 拿 (take), 带 (bring), 送 (deliver), 搬 (move) + directional + 来/去 + object.\n3. **Posture verbs**: 站起来 (stand up), 坐下来 (sit down), 躺下来 (lie down), 蹲下去 (squat down).\n4. **Perception/thought verbs** (figurative use of 起来/下来/出来 — see dedicated card).\n5. **把 constructions**: 把 + Object + Verb + Directional + 来/去 (key pattern).\n\nFrequency: indispensable when describing detailed motion (narrative, instructions, action).',
      howToUse: '**Structure 1 :** Verbe + Directionnel + 来/去 (sans objet).\n• Ex : 跑进来 (pǎo jìnlái) = entrer en courant (vers moi)\n• Ex : 走出去 (zǒu chūqù) = sortir en marchant (loin)\n• Ex : 爬上去 (pá shàngqù) = grimper là-haut\n• Ex : 拿回来 (ná huílái) = rapporter (vers moi)\n• Ex : 站起来 (zhàn qǐlái) = se lever\n• Ex : 坐下来 (zuò xiàlái) = s\'asseoir\n• Ex : 跳过去 (tiào guòqù) = sauter par-dessus (loin)\n\n**Structure 2 :** Verbe + Directionnel + Objet + 来/去 (objet INSÉRÉ).\n• Ex : 拿回一本书来 (ná huí yì běn shū lái) = rapporte-moi un livre\n• Ex : 带回礼物来 (dài huí lǐwù lái) = ramène des cadeaux\n• Ex : 买回一些水果来 (mǎi huí yìxiē shuǐguǒ lái) = achète et ramène des fruits\n\n**Structure 3 :** Verbe + Directionnel + 来/去 + Objet (moins fréquent, oral).\n• Ex : 拿出来一本书 (ná chūlái yì běn shū) = sortir un livre\n• Ex : 搬进来家具 (bān jìnlái jiājù) = emménager des meubles\n\n**Structure 4 :** Avec 把 (structure privilégiée à l\'écrit).\n• Ex : 请把书拿回来 (qǐng bǎ shū ná huílái) = rapporte le livre s\'il te plaît\n• Ex : 他把猫带回家来 (tā bǎ māo dài huí jiā lái) = il a ramené le chat à la maison\n• Ex : 把行李搬上去 (bǎ xíngli bān shàngqù) = monte les bagages\n\n**Structure 5 :** Négation avec 不 devant le verbe.\n• Ex : 他不跑出去 (tā bù pǎo chūqù) = il ne sort pas en courant\n• Ex : 我不搬进去 (wǒ bù bān jìnqù) = je n\'emménage pas\n\n**Structure 6 :** Avec 了 (action accomplie).\n• Ex : 他跑进来了 (tā pǎo jìnlái le) = il est entré en courant\n• Ex : 我拿回来了 (wǒ ná huílái le) = je l\'ai rapporté',
      howToUseEn: '**Structure 1:** Verb + Directional + 来/去 (no object).\n• Ex: 跑进来 (pǎo jìnlái) = run in (toward me)\n• Ex: 走出去 (zǒu chūqù) = walk out (away)\n• Ex: 爬上去 (pá shàngqù) = climb up (there)\n• Ex: 拿回来 (ná huílái) = bring back (to me)\n• Ex: 站起来 (zhàn qǐlái) = stand up\n• Ex: 坐下来 (zuò xiàlái) = sit down\n• Ex: 跳过去 (tiào guòqù) = jump over (away)\n\n**Structure 2:** Verb + Directional + Object + 来/去 (object INSERTED).\n• Ex: 拿回一本书来 = bring me back a book\n• Ex: 带回礼物来 = bring back gifts\n• Ex: 买回一些水果来 = buy and bring back some fruit\n\n**Structure 3:** Verb + Directional + 来/去 + Object (less common, spoken).\n• Ex: 拿出来一本书 = take out a book\n• Ex: 搬进来家具 = move furniture in\n\n**Structure 4:** With 把 (preferred in writing).\n• Ex: 请把书拿回来 = please bring the book back\n• Ex: 他把猫带回家来 = he brought the cat home\n• Ex: 把行李搬上去 = carry the luggage up\n\n**Structure 5:** Negation with 不 before verb.\n• Ex: 他不跑出去 = he doesn\'t run out\n• Ex: 我不搬进去 = I\'m not moving in\n\n**Structure 6:** With 了 (completed action).\n• Ex: 他跑进来了 = he ran in\n• Ex: 我拿回来了 = I brought it back',
      commonMistakes: '❌ 他进来 pour dire « il entre en courant » (perd le verbe d\'action) ; ✅ 他跑进来 (tā pǎo jìnlái).\n❌ Ordre inversé : 进跑来 ou 跑来进 ; ✅ ORDRE STRICT verbe → directionnel → 来/去.\n❌ **Calque du français** : « il court dans la maison » traduit 他跑在房子里 ; ✅ 他跑进房子里去.\n❌ Oublier 来/去 : 他跑进 (incomplet) ; ✅ 他跑进来 ou 他跑进去.\n❌ **Objet mal placé** : 拿一本书回来 (rare) ; ✅ 拿回一本书来 (objet entre directionnel et 来/去) ou avec 把 : 把一本书拿回来.\n❌ Confondre les usages littéraux et figuratifs : 站起来 = se lever (littéral), MAIS 说起来 = « en parlant » (figuratif, voir fiche dédiée).\n❌ Mauvais choix du directionnel : 走出来 pour un objet caché (marche pas), 拿出来 pour extraire un objet (correct).',
      commonMistakesEn: '❌ 他进来 for "he runs in" (loses action verb); ✅ 他跑进来 (tā pǎo jìnlái).\n❌ Wrong order: 进跑来 or 跑来进; ✅ STRICT ORDER verb → directional → 来/去.\n❌ **French calque**: "he runs in the house" as 他跑在房子里; ✅ 他跑进房子里去.\n❌ Missing 来/去: 他跑进 (incomplete); ✅ 他跑进来 or 他跑进去.\n❌ **Object misplaced**: 拿一本书回来 (rare); ✅ 拿回一本书来 (object between directional and 来/去) or with 把: 把一本书拿回来.\n❌ Mixing literal and figurative uses: 站起来 = stand up (literal), BUT 说起来 = "speaking of" (figurative, see dedicated card).\n❌ Wrong directional choice: 走出来 for a hidden object (won\'t work); 拿出来 for extracting (correct).',
      tips: '💡 **Décomposition en 3 couches** : (1) VERBE d\'action (跑, 走, 拿, 搬), (2) DIRECTIONNEL (上/下/进/出/回/过/起), (3) POINT DE VUE (来/去).\n💡 **Mnémo objet** : quand il y a un objet, préfère la structure 把 à l\'écrit ; 把 + objet + verbe + directionnel + 来/去 est la forme la plus claire.\n💡 **Paires à mémoriser** : 站起来 (lever) vs 坐下来 (asseoir), 跑进来 (entrer courant) vs 跑出去 (sortir courant).\n💡 **Verbes fréquents avec 起** : 起 apparaît surtout avec 站 (se lever), 拿 (soulever), 拉 (tirer vers le haut) — presque toujours suivi de 来.\n💡 **Usages figuratifs** : 起来 (« se mettre à… »), 下去 (« continuer à… »), 出来 (« déduire »), 下来 (« garder trace ») — voir la fiche « directionnels figuratifs ».\n💡 **Astuce narrative** : pour raconter une scène (roman, film), ces compléments composés sont indispensables — sans eux, la narration paraît plate et vague.',
      tipsEn: '💡 **3-layer breakdown**: (1) ACTION verb (跑, 走, 拿, 搬), (2) DIRECTIONAL (上/下/进/出/回/过/起), (3) VIEWPOINT (来/去).\n💡 **Object mnemonic**: with an object, prefer 把 structure in writing; 把 + object + verb + directional + 来/去 is clearest.\n💡 **Memorize pairs**: 站起来 (stand) vs 坐下来 (sit), 跑进来 (run in) vs 跑出去 (run out).\n💡 **Verbs frequent with 起**: 起 appears mostly with 站 (rise), 拿 (lift), 拉 (pull up) — almost always followed by 来.\n💡 **Figurative uses**: 起来 ("start to…"), 下去 ("keep on…"), 出来 ("figure out"), 下来 ("keep record") — see "figurative directionals" card.\n💡 **Narrative tip**: to describe a scene (novel, film), these compound complements are essential — without them, narration sounds flat and vague.',
      relatedGrammar: ['grammar-directional-simple']
    },
    audio: 'audio/grammar/grammar-directional-compound.wav',
    examples: [
      { hanzi: '他跑进来了', pinyin: 'tā pǎo jìnlái le', translation: 'He ran in', translationFr: 'Il est entré en courant (vers moi)' },
      { hanzi: '请把书拿回来', pinyin: 'qǐng bǎ shū ná huílái', translation: 'Please bring the book back', translationFr: 'Rapporte le livre s\'il te plaît' },
      { hanzi: '站起来！', pinyin: 'zhàn qǐlái!', translation: 'Stand up!', translationFr: 'Debout !' },
      { hanzi: '孩子们跳上去了', pinyin: 'háizimen tiào shàngqù le', translation: 'The kids jumped up', translationFr: 'Les enfants ont sauté là-haut' },
      { hanzi: '他从口袋里拿出来一支笔', pinyin: 'tā cóng kǒudài lǐ ná chūlái yì zhī bǐ', translation: 'He took a pen out of his pocket', translationFr: 'Il a sorti un stylo de sa poche' },
      { hanzi: '请把行李搬上去', pinyin: 'qǐng bǎ xíngli bān shàngqù', translation: 'Please carry the luggage up', translationFr: 'Monte les bagages s\'il te plaît' },
      { hanzi: '妈妈买回一些水果来', pinyin: 'māma mǎi huí yìxiē shuǐguǒ lái', translation: 'Mom brought back some fruit', translationFr: 'Maman a ramené des fruits' }
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
      whenToUse: 'Pour ÉVALUER la qualité, l\'intensité ou la manière dont une action se déroule. Registre : universel, essentiel dès le HSK3.\n\n**Sous-cas typiques :**\n1. **Évaluation de compétence** : 你说得很好 = « tu parles très bien » (juger comment quelqu\'un fait quelque chose).\n2. **Manière physique** : 他跑得很快 = « il court vite ».\n3. **Question sur la manière** : 他跑得怎么样？= « comment court-il ? ».\n4. **Comparaison implicite** : 他做得比我好 = « il le fait mieux que moi ».\n5. **Autocritique / autoévaluation** : 我说得不太好 = « je ne parle pas très bien ».\n\nFréquence : très élevée. Chaque fois qu\'on veut caractériser COMMENT une action est faite (bien/mal/vite/lentement/joliment…), on utilise cette structure. C\'est LA structure évaluative de base en chinois.',
      whenToUseEn: 'To EVALUATE the quality, intensity, or manner of an action. Register: universal, essential from HSK3 onward.\n\n**Typical sub-cases:**\n1. **Skill evaluation**: 你说得很好 = "you speak very well" (judging how someone does something).\n2. **Physical manner**: 他跑得很快 = "he runs fast".\n3. **Asking about manner**: 他跑得怎么样？= "how does he run?".\n4. **Implicit comparison**: 他做得比我好 = "he does it better than me".\n5. **Self-critique / self-evaluation**: 我说得不太好 = "I don\'t speak very well".\n\nFrequency: very high. Every time you want to describe HOW an action is done (well/badly/fast/slowly/beautifully…), you use this structure. It IS the basic evaluative structure in Chinese.',
      howToUse: '**Structure 1 :** Verbe + 得 + Adjectif (souvent avec 很).\n• Ex : 他跑得很快 (tā pǎo de hěn kuài) = il court très vite\n• Ex : 你说得很好 (nǐ shuō de hěn hǎo) = tu parles très bien\n• Ex : 她唱得非常好听 (tā chàng de fēicháng hǎotīng) = elle chante magnifiquement\n• Ex : 孩子写得不错 (háizi xiě de búcuò) = l\'enfant écrit pas mal\n\n**Structure 2 :** Sujet + Verbe + Objet + Verbe + 得 + Adjectif (répétition du verbe avec objet).\n• Ex : 他说汉语说得很好 (tā shuō Hànyǔ shuō de hěn hǎo) = il parle chinois très bien\n• Ex : 她写字写得很漂亮 (tā xiě zì xiě de hěn piàoliang) = elle écrit joliment\n• Ex : 我做菜做得不太好 (wǒ zuò cài zuò de bú tài hǎo) = je ne cuisine pas très bien\n\n**Structure 3 :** Sujet + Objet + Verbe + 得 + Adjectif (topicalisation — 1er verbe supprimé).\n• Ex : 他汉语说得很好 = il parle chinois très bien\n• Ex : 她钢琴弹得很棒 = elle joue du piano superbement\n\n**Structure 4 :** Négation avec 不.\n• Ex : 他跑得不快 (tā pǎo de bú kuài) = il ne court pas vite\n• Ex : 我说得不清楚 (wǒ shuō de bù qīngchu) = je ne parle pas clairement\n• Attention : 得 + 不 + adj, JAMAIS 不得.\n\n**Structure 5 :** Question A/pas A ou avec 怎么样.\n• Ex : 他跑得快不快？= court-il vite ?\n• Ex : 你说得怎么样？= comment est ta prononciation ?\n\n**Structure 6 :** Comparaison intégrée avec 比.\n• Ex : 他跑得比我快 (tā pǎo de bǐ wǒ kuài) = il court plus vite que moi\n• Ex : 她说得比老师还好 = elle parle encore mieux que le prof\n\n**Structure 7 :** Avec degrés intensifs.\n• Ex : 他跑得极快 = il court extrêmement vite\n• Ex : 她累得不得了 = elle est vraiment épuisée (idiomatique)',
      howToUseEn: '**Structure 1:** Verb + 得 + Adjective (often with 很).\n• Ex: 他跑得很快 = he runs very fast\n• Ex: 你说得很好 = you speak very well\n• Ex: 她唱得非常好听 = she sings beautifully\n• Ex: 孩子写得不错 = the kid writes pretty well\n\n**Structure 2:** Subject + Verb + Object + Verb + 得 + Adjective (verb repeated with object).\n• Ex: 他说汉语说得很好 = he speaks Chinese very well\n• Ex: 她写字写得很漂亮 = she writes beautifully\n• Ex: 我做菜做得不太好 = I don\'t cook very well\n\n**Structure 3:** Subject + Object + Verb + 得 + Adjective (topicalization — first verb dropped).\n• Ex: 他汉语说得很好 = he speaks Chinese very well\n• Ex: 她钢琴弹得很棒 = she plays the piano superbly\n\n**Structure 4:** Negation with 不.\n• Ex: 他跑得不快 = he doesn\'t run fast\n• Ex: 我说得不清楚 = I don\'t speak clearly\n• Note: 得 + 不 + adj, NEVER 不得.\n\n**Structure 5:** A/not-A question or with 怎么样.\n• Ex: 他跑得快不快？= does he run fast?\n• Ex: 你说得怎么样？= how\'s your pronunciation?\n\n**Structure 6:** Comparison integrated with 比.\n• Ex: 他跑得比我快 = he runs faster than me\n• Ex: 她说得比老师还好 = she speaks even better than the teacher\n\n**Structure 7:** With intensive degrees.\n• Ex: 他跑得极快 = he runs extremely fast\n• Ex: 她累得不得了 = she\'s terribly tired (idiom)',
      commonMistakes: '❌ 他跑很快 (verbe + adj direct, sans 得) ; ✅ 他跑得很快.\n❌ 他快跑 (« il court vite » n\'est PAS ça — 快 en tête = « vite ! », impératif).\n❌ **Calque du français** : « il parle très bien chinois » traduit 他说很好汉语 ; ✅ 他汉语说得很好.\n❌ **Confusion des 3 « de »** : 的 (possession), 得 (degré), 地 (manière) — voir fiche dédiée.\n❌ **Négation mal placée** : 他不跑得快 ; ✅ 他跑得不快 (négation APRÈS 得).\n❌ Oublier de répéter le verbe avec objet : 他说汉语得很好 ; ✅ 他说汉语说得很好 ou 他汉语说得很好.\n❌ Utiliser un ADVERBE au lieu d\'un ADJECTIF après 得 : 他跑得慢慢 ; ✅ 他跑得很慢 (adjectif) ou 他慢慢地跑 (adverbe avec 地).\n❌ **Piège piège** : « très bien » traduit sans 很 : 他说得好 (grammatical mais sonne incomplet) ; ✅ 他说得很好.',
      commonMistakesEn: '❌ 他跑很快 (verb + adj direct, no 得); ✅ 他跑得很快.\n❌ 他快跑 (that\'s not "he runs fast" — 快 up front = "quick!", imperative).\n❌ **French calque**: "he speaks Chinese very well" as 他说很好汉语; ✅ 他汉语说得很好.\n❌ **The 3 "de" confusion**: 的 (possession), 得 (degree), 地 (manner) — see dedicated card.\n❌ **Wrong negation position**: 他不跑得快; ✅ 他跑得不快 (negation AFTER 得).\n❌ Forgetting to repeat the verb with object: 他说汉语得很好; ✅ 他说汉语说得很好 or 他汉语说得很好.\n❌ Using an ADVERB instead of ADJECTIVE after 得: 他跑得慢慢; ✅ 他跑得很慢 (adjective) or 他慢慢地跑 (adverb with 地).\n❌ **Sneaky trap**: "very well" without 很: 他说得好 (grammatical but sounds incomplete); ✅ 他说得很好.',
      tips: '💡 **Astuce des 3 « de »** : 的 (nom+的+nom), 得 (verbe+得+adj), 地 (adj+地+verbe). Voir la fiche « 的 / 得 / 地 ».\n💡 **Mnémo TROPHÉE** : 得 est un trophée — « à quel niveau l\'action est-elle réalisée ? ».\n💡 **Le 很 quasi obligatoire** : sans 很, l\'adjectif seul (他说得好) est perçu comme une COMPARAISON implicite (« il parle bien [mieux qu\'attendu] ») ou incomplet. Ajoute toujours 很, 非常, 太, 特别…\n💡 **Contraste avec 地** : 他慢慢地走 = « il marche lentement » (manière AVANT le verbe, focus sur le processus) ; 他走得很慢 = « il marche lentement » (évaluation APRÈS le verbe, focus sur le résultat).\n💡 **Objet + 得** : si tu as un objet, tu as 2 options : (a) répéter le verbe (他说汉语说得很好), (b) topicaliser l\'objet (他汉语说得很好). Le (b) est plus naturel à l\'oral.\n💡 **Verbes préférés** : 说 (parler), 写 (écrire), 唱 (chanter), 跑 (courir), 做 (faire), 弹 (jouer instrument), 学 (apprendre) — tous utilisent souvent 得.',
      tipsEn: '💡 **The 3 "de" trick**: 的 (noun+的+noun), 得 (verb+得+adj), 地 (adj+地+verb). See "的 / 得 / 地" card.\n💡 **TROPHY mnemonic**: 得 is a trophy — "at what level was the action performed?".\n💡 **The near-mandatory 很**: without 很, a bare adjective (他说得好) is heard as an implicit COMPARISON ("he speaks well [better than expected]") or incomplete. Always add 很, 非常, 太, 特别…\n💡 **Contrast with 地**: 他慢慢地走 = "he walks slowly" (manner BEFORE the verb, focus on process); 他走得很慢 = "he walks slowly" (evaluation AFTER the verb, focus on outcome).\n💡 **Object + 得**: with an object, 2 options: (a) repeat the verb (他说汉语说得很好), (b) topicalize the object (他汉语说得很好). Option (b) is more natural in speech.\n💡 **Common verbs**: 说 (speak), 写 (write), 唱 (sing), 跑 (run), 做 (do), 弹 (play instrument), 学 (learn) — all frequently use 得.',
      relatedGrammar: ['grammar-possession-de', 'grammar-complement-possibility']
    },
    audio: 'audio/grammar/grammar-complement-degree-de.wav',
    examples: [
      { hanzi: '他汉语说得很好', pinyin: 'tā Hànyǔ shuō de hěn hǎo', translation: 'He speaks Chinese very well', translationFr: 'Il parle très bien chinois' },
      { hanzi: '你写得不错', pinyin: 'nǐ xiě de búcuò', translation: 'You write pretty well', translationFr: 'Tu écris pas mal' },
      { hanzi: '妹妹跑得非常快', pinyin: 'mèimei pǎo de fēicháng kuài', translation: 'Little sister runs extremely fast', translationFr: 'Ma petite sœur court extrêmement vite' },
      { hanzi: '她钢琴弹得比我好', pinyin: 'tā gāngqín tán de bǐ wǒ hǎo', translation: 'She plays the piano better than me', translationFr: 'Elle joue du piano mieux que moi' },
      { hanzi: '我说得不太清楚', pinyin: 'wǒ shuō de bú tài qīngchu', translation: 'I don\'t speak very clearly', translationFr: 'Je ne parle pas très clairement' },
      { hanzi: '这个孩子长得真快', pinyin: 'zhège háizi zhǎng de zhēn kuài', translation: 'This kid is growing so fast', translationFr: 'Cet enfant grandit vraiment vite' },
      { hanzi: '你昨晚睡得好不好？', pinyin: 'nǐ zuówǎn shuì de hǎo bù hǎo?', translation: 'Did you sleep well last night?', translationFr: 'As-tu bien dormi cette nuit ?' }
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
      whenToUse: 'Pour exprimer la POSSIBILITÉ ou l\'IMPOSSIBILITÉ intrinsèque d\'obtenir un résultat. Registre : très fréquent à l\'oral, la FORME NÉGATIVE (V + 不 + résultatif) est particulièrement courante.\n\n**Sous-cas typiques :**\n1. **Perception** : 看得见/看不见 (peut/ne peut pas voir), 听得见/听不见 (peut/ne peut pas entendre).\n2. **Compréhension** : 看得懂/看不懂 (comprendre en lisant), 听得懂/听不懂 (comprendre à l\'oral).\n3. **Achèvement** : 吃得完/吃不完 (pouvoir/ne pas pouvoir finir), 做得完/做不完.\n4. **Résultat / accessibilité** : 买得到/买不到 (trouver à acheter), 找得到/找不到 (trouver).\n5. **Capacité physique** : 拿得动/拿不动 (avoir la force de porter), 走得动/走不动 (pouvoir marcher).\n6. **Compatibilité / adéquation** : 穿得下/穿不下 (rentrer dans un vêtement), 放得下/放不下 (avoir la place).\n\nFréquence : ULTRA fréquent à l\'oral. C\'est la manière PRIVILÉGIÉE de dire « je peux/je ne peux pas » quand il s\'agit d\'une capacité INHÉRENTE (pas d\'une permission).',
      whenToUseEn: 'To express INTRINSIC POSSIBILITY or IMPOSSIBILITY of achieving a result. Register: very common in speech; the NEGATIVE FORM (V + 不 + result) is especially frequent.\n\n**Typical sub-cases:**\n1. **Perception**: 看得见/看不见 (can/can\'t see), 听得见/听不见 (can/can\'t hear).\n2. **Comprehension**: 看得懂/看不懂 (understand by reading), 听得懂/听不懂 (understand by ear).\n3. **Completion**: 吃得完/吃不完 (can/can\'t finish), 做得完/做不完.\n4. **Result / accessibility**: 买得到/买不到 (find to buy), 找得到/找不到 (find).\n5. **Physical capacity**: 拿得动/拿不动 (strong enough to carry), 走得动/走不动 (can/can\'t walk on).\n6. **Fit / room**: 穿得下/穿不下 (fit in clothes), 放得下/放不下 (have room).\n\nFrequency: ULTRA common in speech. It\'s the PREFERRED way to say "I can/can\'t" when it\'s about INHERENT capacity (not permission).',
      howToUse: '**Structure 1 :** Positif — Verbe + 得 + Résultatif.\n• Ex : 看得懂 (kàn de dǒng) = peut comprendre en lisant\n• Ex : 听得清楚 (tīng de qīngchu) = peut entendre clairement\n• Ex : 吃得完 (chī de wán) = peut finir de manger\n• Ex : 买得到 (mǎi de dào) = trouver à acheter\n• Ex : 找得到 (zhǎo de dào) = trouver\n\n**Structure 2 :** Négatif — Verbe + 不 + Résultatif (LE PLUS FRÉQUENT).\n• Ex : 看不懂 (kàn bu dǒng) = ne peut pas comprendre\n• Ex : 听不见 (tīng bu jiàn) = ne peut pas entendre\n• Ex : 吃不完 (chī bu wán) = ne peut pas tout manger\n• Ex : 买不到 (mǎi bu dào) = ne peut pas trouver à acheter\n• Ex : 走不动 (zǒu bu dòng) = ne peut plus marcher (fatigué)\n\n**Structure 3 :** Question A/pas A.\n• Ex : 你看得懂看不懂？(nǐ kàn de dǒng kàn bu dǒng?) = est-ce que tu comprends ?\n• Ex : 听得见吗？(tīng de jiàn ma?) = tu entends ?\n\n**Structure 4 :** Avec objet inséré.\n• Ex : 看得懂中文 (kàn de dǒng Zhōngwén) = pouvoir lire le chinois\n• Ex : 吃不完这么多菜 (chī bu wán zhème duō cài) = ne peut pas tout manger\n• Ex : 找不到我的钥匙 (zhǎo bu dào wǒ de yàoshi) = je ne trouve pas mes clés\n\n**Structure 5 :** Verbes fréquents avec résultatifs.\n• **懂** (comprendre) : 看懂 / 听懂\n• **见** (percevoir) : 看见 / 听见\n• **完** (finir) : 吃完 / 做完 / 说完\n• **到** (atteindre) : 买到 / 找到 / 拿到\n• **动** (mouvoir) : 走动 / 拿动 / 搬动\n• **下** (contenir) : 坐下 / 装下 / 穿下\n• **起** (soulever, capable) : 买起 / 吃起 / 用起\n\n**Structure 6 :** Différence subtile avec 能.\n• 我能看懂 (autorisation/possibilité externe) vs 我看得懂 (capacité intrinsèque).\n• Pour NIER une capacité, préfère 我看不懂 à 我不能看懂 (plus naturel).',
      howToUseEn: '**Structure 1:** Positive — Verb + 得 + Result.\n• Ex: 看得懂 = can understand by reading\n• Ex: 听得清楚 = can hear clearly\n• Ex: 吃得完 = can finish eating\n• Ex: 买得到 = can find to buy\n• Ex: 找得到 = can find\n\n**Structure 2:** Negative — Verb + 不 + Result (MOST COMMON).\n• Ex: 看不懂 = cannot understand\n• Ex: 听不见 = cannot hear\n• Ex: 吃不完 = cannot finish\n• Ex: 买不到 = cannot find to buy\n• Ex: 走不动 = cannot walk anymore (tired)\n\n**Structure 3:** A/not-A question.\n• Ex: 你看得懂看不懂？= can you understand?\n• Ex: 听得见吗？= can you hear?\n\n**Structure 4:** With inserted object.\n• Ex: 看得懂中文 = can read Chinese\n• Ex: 吃不完这么多菜 = can\'t finish so much food\n• Ex: 找不到我的钥匙 = I can\'t find my keys\n\n**Structure 5:** Common result verbs.\n• **懂** (understand): 看懂 / 听懂\n• **见** (perceive): 看见 / 听见\n• **完** (finish): 吃完 / 做完 / 说完\n• **到** (reach): 买到 / 找到 / 拿到\n• **动** (move): 走动 / 拿动 / 搬动\n• **下** (contain): 坐下 / 装下 / 穿下\n• **起** (afford, able): 买起 / 吃起 / 用起\n\n**Structure 6:** Subtle difference with 能.\n• 我能看懂 (permission/external possibility) vs 我看得懂 (intrinsic capacity).\n• To DENY capacity, prefer 我看不懂 to 我不能看懂 (more natural).',
      commonMistakes: '❌ **Confusion avec 能** : 能看懂 = « avoir la permission/possibilité de comprendre » ; 看得懂 = « avoir la capacité intrinsèque ». Pour la négation, PRÉFÈRE 看不懂 (plus naturel) à 不能看懂.\n❌ 不看懂 (négation en tête) ; ✅ 看不懂 (négation ENTRE le verbe et le résultat).\n❌ 不吃完 (« pas fini de manger », mais évoque un CHOIX, pas une IMPOSSIBILITÉ) ; ✅ 吃不完 (« incapable de finir »).\n❌ **Calque du français** : « je ne peux pas trouver mes clés » traduit 我不能找我的钥匙 ; ✅ 我找不到我的钥匙 (capacité de trouver).\n❌ Ne pas ajouter le résultatif : 我看不 (incomplet) ; ✅ 我看不懂/看不见.\n❌ Ordre inversé : 得看懂 ou 不看得懂 ; ✅ 看得懂 ou 看不懂.\n❌ Mélanger avec le complément de degré : 他跑得很快 (degré) vs 他跑得动 (capacité) — deux structures avec 得, sens totalement différent.\n❌ Utiliser un adjectif ordinaire au lieu d\'un résultatif : 看得好 ≠ 看得懂 (le premier = « bien voir », le second = « comprendre en lisant »).',
      commonMistakesEn: '❌ **Confusion with 能**: 能看懂 = "have permission/possibility to understand"; 看得懂 = "have intrinsic capacity". For negation, PREFER 看不懂 (more natural) to 不能看懂.\n❌ 不看懂 (negation up front); ✅ 看不懂 (negation BETWEEN verb and result).\n❌ 不吃完 ("not finished eating", suggests CHOICE, not INABILITY); ✅ 吃不完 ("unable to finish").\n❌ **French calque**: "I can\'t find my keys" as 我不能找我的钥匙; ✅ 我找不到我的钥匙 (capacity to find).\n❌ Missing result verb: 我看不 (incomplete); ✅ 我看不懂/看不见.\n❌ Wrong order: 得看懂 or 不看得懂; ✅ 看得懂 or 看不懂.\n❌ Confusing with degree complement: 他跑得很快 (degree) vs 他跑得动 (capacity) — both use 得, totally different meaning.\n❌ Using a plain adjective instead of a result verb: 看得好 ≠ 看得懂 (former = "see well", latter = "understand by reading").',
      tips: '💡 **Formule clé** : verbe + 得/不 + résultatif = « CAPABLE (得) / INCAPABLE (不) de + atteindre le résultat ».\n💡 **Négation privilégiée** : 看不懂 sonne 10x plus naturel que 不能看懂 pour dire « je ne comprends pas [ce texte] ».\n💡 **Paires à mémoriser** : 看得见/看不见 (voir), 听得见/听不见 (entendre), 看得懂/看不懂 (lire+comprendre), 听得懂/听不懂 (entendre+comprendre).\n💡 **Contexte bruit/distance** : 听不见 est parfait pour « je n\'entends pas (il y a trop de bruit) », alors que 我听不懂 = « je n\'entends pas au sens de comprendre ».\n💡 **Attention aux 得 doubles** : 得 dans « complément de degré » (他跑得快) ≠ 得 dans « complément de possibilité » (他跑得动) — l\'un mesure la qualité, l\'autre la capacité.\n💡 **Idiomes utiles** : 说不定 (« qui sait », lit. « pas capable de fixer »), 对不起 (« désolé », lit. « incapable de faire face »), 差不多 (« presque »), 了不起 (« extraordinaire »).\n💡 **Astuce audio** : le 得 dans cette structure se prononce « de » atone (comme 的). Ne pas confondre avec 得 (děi) « devoir ».',
      tipsEn: '💡 **Key formula**: verb + 得/不 + result = "ABLE (得) / UNABLE (不) to + reach result".\n💡 **Preferred negation**: 看不懂 sounds 10x more natural than 不能看懂 for "I can\'t understand [this text]".\n💡 **Memorize pairs**: 看得见/看不见 (see), 听得见/听不见 (hear), 看得懂/看不懂 (read+understand), 听得懂/听不懂 (hear+understand).\n💡 **Noise/distance context**: 听不见 is perfect for "I can\'t hear (too much noise)", while 我听不懂 = "I don\'t catch the meaning".\n💡 **Two 得s to watch**: 得 in "degree complement" (他跑得快) ≠ 得 in "possibility complement" (他跑得动) — one measures quality, the other capacity.\n💡 **Useful idioms**: 说不定 ("who knows", lit. "unable to fix"), 对不起 ("sorry", lit. "unable to face"), 差不多 ("almost"), 了不起 ("extraordinary").\n💡 **Audio tip**: 得 in this structure is unstressed "de" (like 的). Don\'t confuse with 得 (děi) "must".',
      relatedGrammar: ['grammar-complement-degree-de']
    },
    audio: 'audio/grammar/grammar-complement-possibility.wav',
    examples: [
      { hanzi: '我看不懂这本书', pinyin: 'wǒ kàn bu dǒng zhè běn shū', translation: 'I can\'t understand this book', translationFr: 'Je n\'arrive pas à comprendre ce livre' },
      { hanzi: '你听得见吗？', pinyin: 'nǐ tīng de jiàn ma?', translation: 'Can you hear?', translationFr: 'Est-ce que tu peux entendre ?' },
      { hanzi: '我吃不完这个蛋糕', pinyin: 'wǒ chī bu wán zhè ge dàngāo', translation: 'I can\'t finish this cake', translationFr: 'Je n\'arriverai pas à finir ce gâteau' },
      { hanzi: '这里买不到这种茶', pinyin: 'zhèlǐ mǎi bu dào zhè zhǒng chá', translation: 'You can\'t find this tea here', translationFr: 'On ne trouve pas ce thé ici' },
      { hanzi: '我找不到我的手机', pinyin: 'wǒ zhǎo bu dào wǒ de shǒujī', translation: 'I can\'t find my phone', translationFr: 'Je ne trouve pas mon téléphone' },
      { hanzi: '这个行李太重了，我拿不动', pinyin: 'zhège xíngli tài zhòng le, wǒ ná bu dòng', translation: 'This luggage is too heavy, I can\'t lift it', translationFr: 'Ce bagage est trop lourd, je ne peux pas le porter' },
      { hanzi: '你听得懂中文吗？', pinyin: 'nǐ tīng de dǒng Zhōngwén ma?', translation: 'Do you understand spoken Chinese?', translationFr: 'Est-ce que tu comprends le chinois parlé ?' }
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
      whenToUse: 'Structure conditionnelle la PLUS FRÉQUENTE et neutre en chinois moderne. Registre : universel (oral et écrit, formel et informel).\n\n**Sous-cas typiques :**\n1. **Hypothèse simple** : 如果下雨，我就不去 = « s\'il pleut, je n\'y vais pas ».\n2. **Condition + conseil** : 如果你累了，就休息 = « si tu es fatigué, repose-toi ».\n3. **Condition + promesse** : 如果你来，我就做饭 = « si tu viens, je cuisine ».\n4. **Hypothèse irréelle / futur** : 如果我有钱，我就买一辆车 = « si j\'avais de l\'argent, j\'achèterais une voiture ».\n5. **Condition + question rhétorique** : 如果这样，怎么办？= « si c\'est comme ça, on fait quoi ? ».\n\n**Variantes de registre :**\n• 如果 (rúguǒ) = neutre, TOUT REGISTRE — le plus fréquent.\n• 要是 (yàoshi) = ORAL, familier, très courant à l\'oral quotidien.\n• 假如 (jiǎrú) = ÉCRIT/FORMEL, un peu littéraire.\n• 倘若 (tǎngruò) = LITTÉRAIRE, écrit soutenu.\n• 假使 (jiǎshǐ) = FORMEL, rare à l\'oral.\n\nFréquence : c\'est LA conjonction conditionnelle par défaut. À maîtriser dès HSK3.',
      whenToUseEn: 'Most FREQUENT and neutral conditional structure in modern Chinese. Register: universal (spoken and written, formal and informal).\n\n**Typical sub-cases:**\n1. **Simple hypothesis**: 如果下雨，我就不去 = "if it rains, I\'m not going".\n2. **Condition + advice**: 如果你累了，就休息 = "if you\'re tired, rest".\n3. **Condition + promise**: 如果你来，我就做饭 = "if you come, I\'ll cook".\n4. **Unreal / future hypothesis**: 如果我有钱，我就买一辆车 = "if I had money, I\'d buy a car".\n5. **Condition + rhetorical question**: 如果这样，怎么办？= "if that\'s the case, what do we do?".\n\n**Register variants:**\n• 如果 (rúguǒ) = neutral, ANY REGISTER — most common.\n• 要是 (yàoshi) = SPOKEN, casual, very common in daily speech.\n• 假如 (jiǎrú) = WRITTEN/FORMAL, slightly literary.\n• 倘若 (tǎngruò) = LITERARY, refined writing.\n• 假使 (jiǎshǐ) = FORMAL, rare in speech.\n\nFrequency: it IS the default conditional conjunction. Master it from HSK3.',
      howToUse: '**Structure 1 :** 如果 + Condition, (Sujet) + 就 + Conséquence.\n• Ex : 如果下雨，我就不去 (rúguǒ xiàyǔ, wǒ jiù bú qù) = s\'il pleut, je n\'y vais pas\n• Ex : 如果你有时间，我们就一起吃饭 = si tu as le temps, on mange ensemble\n• Ex : 如果他来，我们就出发 = s\'il vient, on part\n• Ex : 如果明天不上课，我就睡懒觉 = s\'il n\'y a pas cours demain, je fais la grasse mat\n\n**Structure 2 :** 如果 + Condition + 的话, ... 就 ...\n• Ex : 如果下雨的话，我就不去 = si jamais il pleut, je n\'y vais pas\n• Ex : 如果你不喜欢的话，就别买 = si ça ne te plaît pas, n\'achète pas\n• 的话 renforce l\'hypothèse (« au cas où »).\n\n**Structure 3 :** Ordre inversé — Conséquence, 如果 Condition.\n• Ex : 我就不去，如果下雨的话 = je n\'irai pas, si jamais il pleut\n• Ex : 我们出发，如果他来 = on partira, s\'il vient (rare à l\'écrit).\n\n**Structure 4 :** Omission de 如果 (implicite à l\'oral).\n• Ex : 下雨我就不去 = s\'il pleut je n\'y vais pas (contexte suffit)\n• Ex : 你累了就休息 = fatigué → repose-toi.\n\n**Structure 5 :** Variantes de registre.\n• Oral : 要是下雨，我就不去 (familier, très fréquent).\n• Formel : 假如下雨，我就不去.\n• Littéraire : 倘若下雨，我便不去 (avec 便 au lieu de 就).\n\n**Structure 6 :** Placement de 就 (IMPORTANT).\n• 就 vient TOUJOURS APRÈS le sujet et AVANT le verbe de conséquence.\n• Ex : 如果下雨，我 + 就 + 不去 ✅\n• Ex : ❌ 就我不去 (placement fautif).\n\n**Structure 7 :** Combinaisons utiles.\n• 如果...就 + 那 : 如果你不来，那我就走了 = si tu ne viens pas, alors je pars.\n• 如果...就...了 : 如果早知道，我就不来了 = si j\'avais su, je ne serais pas venu.',
      howToUseEn: '**Structure 1:** 如果 + Condition, (Subject) + 就 + Consequence.\n• Ex: 如果下雨，我就不去 = if it rains, I won\'t go\n• Ex: 如果你有时间，我们就一起吃饭 = if you have time, we\'ll eat together\n• Ex: 如果他来，我们就出发 = if he comes, we\'ll leave\n• Ex: 如果明天不上课，我就睡懒觉 = if no class tomorrow, I\'ll sleep in\n\n**Structure 2:** 如果 + Condition + 的话, ... 就 ...\n• Ex: 如果下雨的话，我就不去 = in case it rains, I won\'t go\n• Ex: 如果你不喜欢的话，就别买 = if you don\'t like it, don\'t buy it\n• 的话 reinforces the hypothesis ("in case").\n\n**Structure 3:** Reversed order — Consequence, 如果 Condition.\n• Ex: 我就不去，如果下雨的话 = I won\'t go, if it rains\n• Ex: 我们出发，如果他来 = we\'ll leave, if he comes (rare in writing).\n\n**Structure 4:** Omitting 如果 (implicit in speech).\n• Ex: 下雨我就不去 = if it rains I\'m not going (context enough)\n• Ex: 你累了就休息 = tired → rest.\n\n**Structure 5:** Register variants.\n• Spoken: 要是下雨，我就不去 (casual, very common).\n• Formal: 假如下雨，我就不去.\n• Literary: 倘若下雨，我便不去 (with 便 instead of 就).\n\n**Structure 6:** Placement of 就 (IMPORTANT).\n• 就 ALWAYS comes AFTER the subject and BEFORE the consequence verb.\n• Ex: 如果下雨，我 + 就 + 不去 ✅\n• Ex: ❌ 就我不去 (wrong placement).\n\n**Structure 7:** Useful combinations.\n• 如果...就 + 那: 如果你不来，那我就走了 = if you don\'t come, then I\'m leaving.\n• 如果...就...了: 如果早知道，我就不来了 = if I\'d known, I wouldn\'t have come.',
      commonMistakes: '❌ Confondre 如果 et 因为 (si ≠ parce que) : « s\'il pleut je ne sors pas » ≠ « parce qu\'il pleut je ne sors pas ». ✅ 如果下雨，我就不出去 vs 因为下雨，所以我不出去.\n❌ **Placement de 就** : 如果下雨，就我不去 (faux) ; ✅ 如果下雨，我就不去 (就 APRÈS le sujet).\n❌ Oublier 就 quand il y a un sujet : à l\'oral OK, mais à l\'écrit c\'est PRÉFÉRABLE de le garder pour la clarté.\n❌ **Calque du français** : « si tu viens, tu me diras » traduit 如果你来，你会告诉我 (redondance) ; ✅ 如果你来，就告诉我 (就 remplace le sujet répété).\n❌ Confondre avec 只要...就 : 如果 = « SI » (hypothèse) ; 只要 = « DU MOMENT QUE » (condition suffisante affirmée). Voir fiche dédiée.\n❌ Confondre avec 只有...才 : 只有 marque une condition NÉCESSAIRE exclusive, pas une simple hypothèse.\n❌ Utiliser 才 au lieu de 就 : 如果下雨我才不去 (bizarre) ; ✅ 如果下雨我就不去. 才 marque la nécessité, 就 la conséquence naturelle.\n❌ Confondre 如果 (« si ») avec 如何 (« comment ») ou 如同 (« comme »).',
      commonMistakesEn: '❌ Confusing 如果 with 因为 (if ≠ because): "if it rains I won\'t go out" ≠ "because it rains I don\'t go out". ✅ 如果下雨，我就不出去 vs 因为下雨，所以我不出去.\n❌ **Placement of 就**: 如果下雨，就我不去 (wrong); ✅ 如果下雨，我就不去 (就 AFTER the subject).\n❌ Dropping 就 when there\'s a subject: OK in speech, but PREFERABLE in writing for clarity.\n❌ **French calque**: "if you come, you\'ll tell me" as 如果你来，你会告诉我 (redundant); ✅ 如果你来，就告诉我 (就 replaces repeated subject).\n❌ Confusing with 只要...就: 如果 = "IF" (hypothesis); 只要 = "AS LONG AS" (asserted sufficient condition). See dedicated card.\n❌ Confusing with 只有...才: 只有 marks an EXCLUSIVE necessary condition, not just a hypothesis.\n❌ Using 才 instead of 就: 如果下雨我才不去 (odd); ✅ 如果下雨我就不去. 才 marks necessity, 就 natural consequence.\n❌ Confusing 如果 ("if") with 如何 ("how") or 如同 ("like").',
      tips: '💡 **Mnémo** : 如果 = « if », 就 = « then ». Duo systématique en chinois.\n💡 **Variante avec 的话** : 如果下雨的话 (« si vraiment il pleut ») ajoute une nuance « au cas où ». Peut se combiner avec 要是 ou 假如.\n💡 **Registres** : 如果 (universel), 要是 (oral familier), 假如 (formel écrit), 倘若 (littéraire). Adapte selon le contexte.\n💡 **Piège du sujet** : quand le sujet est le même dans les deux propositions, place 就 directement (如果下雨就不去). Quand ils diffèrent, garde-les (如果他来，我就走).\n💡 **Combo 要 + 如果** : à l\'oral spontané, 要是 + 就 est TRÈS fréquent : 要是你来我就等你 = « si tu viens je t\'attends ».\n💡 **Hypothèse irréelle passée** : 如果...就...了 exprime un regret. Ex : 如果我早点起床，就不会迟到了 = « si je m\'étais levé plus tôt, je ne serais pas en retard ».\n💡 **Contraste avec 只有...才** : 如果 = « SI en général » (condition suffisante possible), 只有 = « SEULEMENT SI » (condition nécessaire unique). Bien distinguer !',
      tipsEn: '💡 **Mnemonic**: 如果 = "if", 就 = "then". Systematic duo in Chinese.\n💡 **Variant with 的话**: 如果下雨的话 ("in case it rains") adds a "just in case" nuance. Can combine with 要是 or 假如.\n💡 **Registers**: 如果 (universal), 要是 (casual spoken), 假如 (formal writing), 倘若 (literary). Adapt to context.\n💡 **Subject trap**: when the subject is the same in both clauses, place 就 directly (如果下雨就不去). When different, keep both (如果他来，我就走).\n💡 **Combo 要 + 如果**: in spontaneous speech, 要是 + 就 is VERY common: 要是你来我就等你 = "if you come I\'ll wait".\n💡 **Counterfactual past**: 如果...就...了 expresses regret. Ex: 如果我早点起床，就不会迟到了 = "if I\'d got up earlier, I wouldn\'t be late".\n💡 **Contrast with 只有...才**: 如果 = "IF in general" (possible sufficient condition), 只有 = "ONLY IF" (unique necessary condition). Distinguish carefully!',
      relatedGrammar: ['grammar-yaoshi-jiu', 'grammar-dehua-if', 'grammar-zhiyao-jiu']
    },
    audio: 'audio/grammar/grammar-ruguo-jiu.wav',
    examples: [
      { hanzi: '如果明天不下雨，我就去公园', pinyin: 'rúguǒ míngtiān bú xiàyǔ, wǒ jiù qù gōngyuán', translation: 'If it doesn\'t rain tomorrow, I\'ll go to the park', translationFr: 'S\'il ne pleut pas demain, j\'irai au parc' },
      { hanzi: '如果你想学中文，就要坚持', pinyin: 'rúguǒ nǐ xiǎng xué Zhōngwén, jiù yào jiānchí', translation: 'If you want to learn Chinese, you have to persevere', translationFr: 'Si tu veux apprendre le chinois, il faut persévérer' },
      { hanzi: '如果有问题，请告诉我', pinyin: 'rúguǒ yǒu wèntí, qǐng gàosu wǒ', translation: 'If there\'s a problem, please tell me', translationFr: 'S\'il y a un problème, dis-le moi' },
      { hanzi: '要是你饿了，就吃点东西', pinyin: 'yàoshi nǐ è le, jiù chī diǎn dōngxi', translation: 'If you\'re hungry, eat something', translationFr: 'Si tu as faim, mange quelque chose' },
      { hanzi: '如果早知道，我就不来了', pinyin: 'rúguǒ zǎo zhīdào, wǒ jiù bù lái le', translation: 'If I\'d known earlier, I wouldn\'t have come', translationFr: 'Si j\'avais su plus tôt, je ne serais pas venu' },
      { hanzi: '如果他不来的话，我们就走', pinyin: 'rúguǒ tā bù lái de huà, wǒmen jiù zǒu', translation: 'If he doesn\'t come, we\'ll leave', translationFr: 'S\'il ne vient pas, on part' },
      { hanzi: '如果我是你，我就会告诉他', pinyin: 'rúguǒ wǒ shì nǐ, wǒ jiù huì gàosu tā', translation: 'If I were you, I\'d tell him', translationFr: 'Si j\'étais toi, je le lui dirais' }
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
      whenToUse: 'Pour exprimer une condition NÉCESSAIRE et EXCLUSIVE : la conséquence ne peut se produire QUE si cette condition est remplie, aucune autre voie. Registre : neutre, plus fréquent à l\'écrit et dans les discours argumentés.\n\n**Sous-cas typiques :**\n1. **Condition nécessaire unique** : 只有努力，才能成功 = « seul le travail mène au succès ».\n2. **Restriction stricte** : 只有他知道密码 = « lui seul connaît le mot de passe ».\n3. **Argumentation** : 只有减少污染，我们才能保护环境 = « seule la réduction de pollution protège l\'environnement ».\n4. **Ton insistant / catégorique** : 只有你才能帮我 = « toi seul peux m\'aider ».\n5. **Condition indispensable** : 只有下雨，庄稼才能长 = « seule la pluie fait pousser les cultures ».\n\n**Contraste crucial :**\n• 只有...才 = condition NÉCESSAIRE (sans quoi RIEN).\n• 只要...就 = condition SUFFISANTE (il suffit de, plein d\'autres voies possibles).\n• 如果...就 = simple hypothèse (neutre, ni nécessaire ni suffisant).\n\nFréquence : moins fréquent que 如果...就 mais essentiel dans les argumentations, avis, jugements catégoriques.',
      whenToUseEn: 'To express a NECESSARY and EXCLUSIVE condition: the consequence can happen ONLY if this condition holds, no other way. Register: neutral, more common in writing and argumentative speech.\n\n**Typical sub-cases:**\n1. **Unique necessary condition**: 只有努力，才能成功 = "only work leads to success".\n2. **Strict restriction**: 只有他知道密码 = "only he knows the password".\n3. **Argumentation**: 只有减少污染，我们才能保护环境 = "only reducing pollution protects the environment".\n4. **Insistent / categorical tone**: 只有你才能帮我 = "only you can help me".\n5. **Indispensable condition**: 只有下雨，庄稼才能长 = "only rain makes crops grow".\n\n**Crucial contrast:**\n• 只有...才 = NECESSARY condition (without which NOTHING).\n• 只要...就 = SUFFICIENT condition (it\'s enough to, many other paths possible).\n• 如果...就 = simple hypothesis (neutral, neither necessary nor sufficient).\n\nFrequency: less common than 如果...就 but essential in arguments, opinions, categorical judgments.',
      howToUse: '**Structure 1 :** 只有 + Condition, (Sujet) + 才 + Conséquence.\n• Ex : 只有努力学习，才能进步 (zhǐyǒu nǔlì xuéxí, cái néng jìnbù) = seulement en étudiant dur, on peut progresser\n• Ex : 只有他来了，我们才开始 = on ne commence que quand il arrive\n• Ex : 只有多练习，你才能说得好 = seul l\'entraînement te fera bien parler\n• Ex : 只有下雨，庄稼才能长 = les cultures ne poussent qu\'avec la pluie\n\n**Structure 2 :** 才 est OBLIGATOIRE (jamais 就).\n• Ex : ❌ 只有努力，就能成功 (faux mélange) ; ✅ 只有努力，才能成功.\n• Ex : ❌ 只有他来，就开始 ; ✅ 只有他来，才开始.\n\n**Structure 3 :** Position de 才.\n• 才 se place APRÈS le sujet et AVANT le verbe de conséquence.\n• Ex : 只有努力，你 + 才 + 能成功 ✅.\n• Ex : ❌ 才你能成功 (faux placement).\n\n**Structure 4 :** Avec 能 (très fréquent).\n• Ex : 只有多喝水才能健康 = seule une bonne hydratation garantit la santé.\n• Ex : 只有努力才能实现梦想 = seul l\'effort réalise les rêves.\n• Le combo 才 + 能 renforce l\'idée de « possibilité conditionnée ».\n\n**Structure 5 :** Contraste explicite avec 只要...就.\n• 只要有钱就可以 = « il suffit d\'avoir de l\'argent » (SUFFISANT — beaucoup d\'autres choses OK aussi).\n• 只有有钱才可以 = « SEUL l\'argent permet » (NÉCESSAIRE — rien d\'autre ne marche).\n• Paire test : 只要努力就能成功 (« il suffit de travailler ») vs 只有努力才能成功 (« SEUL le travail »).\n\n**Structure 6 :** Négation dans la condition.\n• Ex : 只有不放弃，才能胜利 = seulement en n\'abandonnant pas, on peut vaincre.\n• Ex : 只有不迟到，才能得到奖 = seulement si tu n\'es pas en retard, tu peux gagner.\n\n**Structure 7 :** Variante avec 除非 (« à moins que »).\n• 除非你答应，我才走 = « à moins que tu acceptes, je ne partirai pas » (autre manière d\'exprimer la nécessité).\n• 只有 est plus positif, 除非 plus négatif.',
      howToUseEn: '**Structure 1:** 只有 + Condition, (Subject) + 才 + Consequence.\n• Ex: 只有努力学习，才能进步 = only through hard study can one progress\n• Ex: 只有他来了，我们才开始 = we only start when he arrives\n• Ex: 只有多练习，你才能说得好 = only practice will make you speak well\n• Ex: 只有下雨，庄稼才能长 = crops only grow with rain\n\n**Structure 2:** 才 is REQUIRED (never 就).\n• Ex: ❌ 只有努力，就能成功 (wrong mix); ✅ 只有努力，才能成功.\n• Ex: ❌ 只有他来，就开始; ✅ 只有他来，才开始.\n\n**Structure 3:** Position of 才.\n• 才 goes AFTER the subject and BEFORE the consequence verb.\n• Ex: 只有努力，你 + 才 + 能成功 ✅.\n• Ex: ❌ 才你能成功 (wrong placement).\n\n**Structure 4:** With 能 (very frequent).\n• Ex: 只有多喝水才能健康 = only hydration guarantees health.\n• Ex: 只有努力才能实现梦想 = only effort realizes dreams.\n• The combo 才 + 能 reinforces "conditional possibility".\n\n**Structure 5:** Explicit contrast with 只要...就.\n• 只要有钱就可以 = "money is enough" (SUFFICIENT — many other things OK too).\n• 只有有钱才可以 = "ONLY money works" (NECESSARY — nothing else works).\n• Test pair: 只要努力就能成功 ("work is enough") vs 只有努力才能成功 ("ONLY work").\n\n**Structure 6:** Negation in the condition.\n• Ex: 只有不放弃，才能胜利 = only by not giving up can we win.\n• Ex: 只有不迟到，才能得到奖 = only if you\'re not late can you win the prize.\n\n**Structure 7:** Variant with 除非 ("unless").\n• 除非你答应，我才走 = "unless you agree, I won\'t go" (another way to express necessity).\n• 只有 is more positive, 除非 more negative.',
      commonMistakes: '❌ **Mélange fatal** 只有...就 : c\'est TOUJOURS 才 avec 只有. 只有努力，就能成功 (faux) ; ✅ 只有努力，才能成功.\n❌ **Confusion 只要 / 只有** : 只要 = « il suffit que » (condition SUFFISANTE), 只有 = « seulement si » (condition NÉCESSAIRE). Ne pas confondre !\n❌ **Placement de 才** : 才你能成功 (faux) ; ✅ 你才能成功 (才 APRÈS le sujet).\n❌ **Calque du français** : « seulement si tu travailles, tu réussiras » traduit avec 如果 ; ✅ utiliser 只有...才 pour la nuance exclusive.\n❌ Utiliser 只有...才 pour une simple hypothèse : 只有下雨，我才不去 (trop dramatique pour une simple météo) ; préférer 如果下雨，我就不去.\n❌ Omission de 只有 quand la condition est nécessaire : 努力才能成功 (grammatical mais moins clair) ; ✅ 只有努力才能成功 (plus catégorique).\n❌ Confondre avec 只是 (« juste, seulement ») qui n\'exprime pas de condition.\n❌ Utiliser 只有 sans « seule condition » : « seulement il pleut » traduit 只有下雨 seul (bizarre) ; il faut la structure complète 只有A，才B.',
      commonMistakesEn: '❌ **Fatal mix** 只有...就: it\'s ALWAYS 才 with 只有. 只有努力，就能成功 (wrong); ✅ 只有努力，才能成功.\n❌ **Confusion 只要 / 只有**: 只要 = "as long as" (SUFFICIENT condition), 只有 = "only if" (NECESSARY condition). Don\'t confuse!\n❌ **Placement of 才**: 才你能成功 (wrong); ✅ 你才能成功 (才 AFTER the subject).\n❌ **French calque**: "only if you work, you\'ll succeed" translated with 如果; ✅ use 只有...才 for exclusive nuance.\n❌ Using 只有...才 for a simple hypothesis: 只有下雨，我才不去 (too dramatic for weather); prefer 如果下雨，我就不去.\n❌ Omitting 只有 when the condition is necessary: 努力才能成功 (grammatical but less clear); ✅ 只有努力才能成功 (more categorical).\n❌ Confusing with 只是 ("just, only") which doesn\'t express a condition.\n❌ Using 只有 without "sole condition": "only it rains" as bare 只有下雨 (odd); need full structure 只有A，才B.',
      tips: '💡 **Formule ONLY + THEN** : 只 = « only », 才 = « then/only then ». Aucune autre voie possible.\n💡 **Test rapide** : puis-je remplacer la condition ? Si NON → 只有...才. Si OUI → 只要...就.\n💡 **Contraste 3 conditionnels** :\n  - 如果...就 = simple hypothèse (neutre)\n  - 只要...就 = condition SUFFISANTE (il suffit de)\n  - 只有...才 = condition NÉCESSAIRE (rien d\'autre)\n💡 **Astuce mnémo** : 有 (« avoir ») dans 只有 évoque le seul chemin possible. 只有 = « il n\'y a qu\'un chemin ».\n💡 **Contexte argumentatif** : 只有...才 est parfait pour donner un avis catégorique ou faire une leçon. Ex : 只有多读书，才能提高.\n💡 **Combo littéraire** : 唯有...方能 est une variante littéraire de 只有...才能. Ex : 唯有努力，方能成功.\n💡 **Distinction 才 (nécessaire) vs 就 (naturel)** : 就 fait avancer la conséquence facilement, 才 la rend difficile/rare.',
      tipsEn: '💡 **ONLY + THEN formula**: 只 = "only", 才 = "then/only then". No other way.\n💡 **Quick test**: can I substitute the condition? If NO → 只有...才. If YES → 只要...就.\n💡 **3-way conditional contrast**:\n  - 如果...就 = simple hypothesis (neutral)\n  - 只要...就 = SUFFICIENT condition (it\'s enough to)\n  - 只有...才 = NECESSARY condition (nothing else)\n💡 **Mnemonic**: 有 ("have") in 只有 evokes the sole possible path. 只有 = "there\'s only one path".\n💡 **Argumentative context**: 只有...才 is perfect for a categorical stance or teaching. Ex: 只有多读书，才能提高.\n💡 **Literary combo**: 唯有...方能 is a literary variant of 只有...才能. Ex: 唯有努力，方能成功.\n💡 **才 (necessary) vs 就 (natural)**: 就 moves the consequence along easily, 才 makes it hard/rare.',
      relatedGrammar: ['grammar-ruguo-jiu', 'grammar-zhiyao-jiu']
    },
    audio: 'audio/grammar/grammar-zhiyou-cai.wav',
    examples: [
      { hanzi: '只有你才能帮我', pinyin: 'zhǐyǒu nǐ cái néng bāng wǒ', translation: 'Only you can help me', translationFr: 'Toi seul peux m\'aider' },
      { hanzi: '只有多练习，才能提高', pinyin: 'zhǐyǒu duō liànxí, cái néng tígāo', translation: 'Only by practicing more can one improve', translationFr: 'Seulement en s\'exerçant beaucoup on peut progresser' },
      { hanzi: '只有下雨，庄稼才能长', pinyin: 'zhǐyǒu xiàyǔ, zhuāngjia cái néng zhǎng', translation: 'Only with rain can crops grow', translationFr: 'C\'est seulement s\'il pleut que les récoltes peuvent pousser' },
      { hanzi: '只有努力工作，才能实现梦想', pinyin: 'zhǐyǒu nǔlì gōngzuò, cái néng shíxiàn mèngxiǎng', translation: 'Only hard work realizes dreams', translationFr: 'Seul le travail acharné réalise les rêves' },
      { hanzi: '只有他知道密码', pinyin: 'zhǐyǒu tā zhīdào mìmǎ', translation: 'Only he knows the password', translationFr: 'Lui seul connaît le mot de passe' },
      { hanzi: '只有不放弃，我们才能成功', pinyin: 'zhǐyǒu bú fàngqì, wǒmen cái néng chénggōng', translation: 'Only by not giving up can we succeed', translationFr: 'Seulement en n\'abandonnant pas peut-on réussir' },
      { hanzi: '只有多喝水，皮肤才会好', pinyin: 'zhǐyǒu duō hē shuǐ, pífū cái huì hǎo', translation: 'Only by drinking a lot can your skin be good', translationFr: 'Seulement en buvant beaucoup, la peau devient belle' }
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
