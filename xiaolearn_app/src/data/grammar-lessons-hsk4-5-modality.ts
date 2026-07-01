/**
 * grammar-lessons-hsk4-5-modality.ts — 4 leçons HSK4-5
 * ------------------------------------------------------------------
 * Causatifs formels et modalité épistémique :
 *   - HSK4 : 使 / 令 (causatifs formels)
 *   - HSK4 : 一...都/也...不/没 (négation absolue)
 *   - HSK5 : 大概 / 也许 / 可能 / 恐怕 (modalité épistémique)
 *   - HSK5 : 不见得 / 未必 / 说不定 (modalité négative nuancée)
 *
 * Chaque entrée respecte le shape `LessonItem` avec `grammarExplanation`
 * (when / how / mistakes / tips) + `examples` + `grammarQuiz`.
 */
import type { LessonItem } from '../types';

export const grammarLessonsHsk45Modality: LessonItem[] = [
  // ============================================
  // HSK4 — 使 / 令 (causatifs formels)
  // ============================================
  {
    id: 'grammar-shi-ling-causative',
    level: 'hsk4',
    hanzi: '使 / 令',
    pinyin: 'shǐ / lìng',
    translation: 'to make (someone feel/do); to cause',
    translationFr: '« faire faire, rendre » : 使 (formel), 令 (émotionnel)',
    category: 'grammaire',
    explanation: 'Deux causatifs plus formels que 让. 使 = registre écrit/formel. 令 = souvent avec un adjectif émotionnel (« rendre triste, ravi »).',
    grammarExplanation: {
      whenToUse: '**使** et **令** sont deux causatifs plus soutenus que 让. Chacun a son terrain de jeu.\n\n**Cas 1 — Dissertation / analyse :** 使 est le passe-partout de l\'écrit argumentatif (essais HSK5-6, articles de presse, rapports). « 这一政策使经济增长 » sonne académique.\n\n**Cas 2 — Émotion / réaction humaine :** 令 domine quand l\'objet est **人** ou un pronom personnel avec un état affectif (感动, 失望, 惊讶, 敬佩). Registre littéraire, éditorial, discours.\n\n**Cas 3 — Chengyu figés :** 令人失望, 令人感动, 令人钦佩, 令人发指, 使人振奋 — expressions cristallisées qui SEULES survivent à l\'oral cultivé.\n\n**Cas 4 — Titres et slogans :** 令 apparaît dans les titres journalistiques et publicités (« 令你惊艳的味道 »).\n\n**Cas 5 — Conte / roman :** 令 dans un récit littéraire pour dramatiser (« 这消息令她久久不能平静 »).\n\n**Registre :** 让 = ORAL universel • 使 = ÉCRIT neutre (dissertation, presse) • 令 = LITTÉRAIRE émotionnel (roman, éditorial, discours). Fréquence : à l\'écrit HSK5+, 使 = 40 %, 让 = 40 %, 令 = 20 %. À l\'oral casual, 使/令 tombent à <5 % (sauf chengyu).',
      whenToUseEn: '**使** and **令** are two causatives more formal than 让. Each has its own turf.\n\n**Case 1 — Essay / analysis:** 使 is the go-to for written argumentation (essays, press articles, reports). "这一政策使经济增长" sounds academic.\n\n**Case 2 — Emotion / human reaction:** 令 dominates when the object is **人** or a personal pronoun with an affective state (感动 moved, 失望 disappointed, 惊讶 amazed, 敬佩 admiring). Literary, editorial, oratorical register.\n\n**Case 3 — Frozen chengyu:** 令人失望, 令人感动, 令人钦佩, 令人发指, 使人振奋 — crystallized expressions that ALONE survive in cultivated speech.\n\n**Case 4 — Headlines and slogans:** 令 appears in news headlines and ads ("令你惊艳的味道").\n\n**Case 5 — Fiction / novel:** 令 in literary narrative to dramatize ("这消息令她久久不能平静").\n\n**Register:** 让 = SPOKEN universal • 使 = WRITTEN neutral (essay, press) • 令 = LITERARY emotional (novel, editorial, speech). Frequency: in HSK5+ writing, 使 = 40 %, 让 = 40 %, 令 = 20 %. In casual speech, 使/令 drop below 5 % (except chengyu).',
      howToUse: '**Structure 1 :** Sujet/Cause + **使** + Objet (personne/chose) + Adj/état résultant\n\nEx :\n• 这件事使我很生气 (zhè jiàn shì shǐ wǒ hěn shēngqì) = Cette affaire me met en colère\n• 时间使一切变得清晰 (shíjiān shǐ yíqiè biànde qīngxī) = Le temps rend tout limpide\n• 阅读使人进步 (yuèdú shǐ rén jìnbù) = La lecture fait progresser\n• 这项改革使经济发展迅速 = Cette réforme accélère le développement économique\n• 手机使我们的生活更方便 = Le téléphone rend notre vie plus pratique\n\n**Structure 2 :** Sujet + **令** + 人/Objet + adjectif ÉMOTIONNEL\n\nEx :\n• 他的话令人失望 (tā de huà lìng rén shīwàng) = Ses paroles déçoivent\n• 这部电影令我非常感动 = Ce film m\'a beaucoup touché\n• 结果令大家惊讶 = Le résultat a surpris tout le monde\n• 她的坚强令人敬佩 = Sa force force le respect\n• 这样的行为令人发指 (littéraire) = Un tel comportement est révoltant\n\n**Structure 3 — Chengyu 令人 + X (figés) :**\n• 令人失望 = décevant • 令人感动 = touchant • 令人满意 = satisfaisant • 令人担忧 = inquiétant • 令人愤怒 = révoltant • 令人耳目一新 = rafraîchissant\n\n**Structure 4 — 使 dans dissertation avec deux propositions :**\n• 全球化使各国联系更紧密，也使竞争更激烈 = La mondialisation resserre les liens entre pays et intensifie la concurrence\n\n**Négation (rare) :** 不 précède le verbe résultant (使我不快乐) ou reformule avec 让...不能.',
      howToUseEn: '**Structure 1:** Subject/Cause + **使** + Object (person/thing) + Adj/resulting state\n\nEx:\n• 这件事使我很生气 = This matter angers me\n• 时间使一切变得清晰 = Time makes everything clear\n• 阅读使人进步 = Reading makes one progress\n• 这项改革使经济发展迅速 = This reform accelerates economic development\n• 手机使我们的生活更方便 = Phones make our lives more convenient\n\n**Structure 2:** Subject + **令** + 人/Object + EMOTIONAL adjective\n\nEx:\n• 他的话令人失望 = His words are disappointing\n• 这部电影令我非常感动 = This film moved me deeply\n• 结果令大家惊讶 = The result surprised everyone\n• 她的坚强令人敬佩 = Her strength commands respect\n• 这样的行为令人发指 (literary) = Such behavior is outrageous\n\n**Structure 3 — Frozen 令人 + X chengyu:**\n• 令人失望 = disappointing • 令人感动 = moving • 令人满意 = satisfying • 令人担忧 = worrying • 令人愤怒 = infuriating • 令人耳目一新 = refreshing\n\n**Structure 4 — 使 in essays with two clauses:**\n• 全球化使各国联系更紧密，也使竞争更激烈 = Globalization tightens ties between nations and intensifies competition\n\n**Negation (rare):** 不 precedes the resulting verb (使我不快乐) or rephrase with 让...不能.',
      commonMistakes: '❌ 我妈妈使我洗碗 (« Ma mère me fait laver la vaisselle ») ; ✅ 我妈妈让我洗碗 — 使 ne s\'utilise PAS pour un ordre concret quotidien, c\'est 让.\n\n❌ 他令我做作业 ; ✅ 他让我做作业 — 令 ne s\'emploie pas pour une action commandée neutre, uniquement pour une émotion.\n\n❌ 这件事令我很累 ; ✅ 这件事使我很累 — 令 exige une émotion (surprise, tristesse, joie), pas un état physique neutre.\n\n❌ 让我们感动 dans un éditorial ; ✅ 令我们感动 — 让 sonne trop oral pour un texte de presse cultivée.\n\n❌ 使人失望 sonne bizarre ; ✅ 令人失望 — la forme figée avec 人 impersonnel se fait avec 令.\n\n❌ 他使我不去 (négation directe étrange) ; ✅ 他不让我去 — pour interdire, préférer 不让.\n\n❌ 这个东西使我 (sans complément) ; ✅ 使 exige TOUJOURS un état/résultat après.',
      commonMistakesEn: '❌ 我妈妈使我洗碗 ("My mother makes me wash dishes"); ✅ 我妈妈让我洗碗 — 使 is NOT used for a concrete daily order, use 让.\n\n❌ 他令我做作业; ✅ 他让我做作业 — 令 is not used for a neutral commanded action, only for emotions.\n\n❌ 这件事令我很累; ✅ 这件事使我很累 — 令 requires an emotion (surprise, sadness, joy), not a neutral physical state.\n\n❌ 让我们感动 in an editorial; ✅ 令我们感动 — 让 sounds too colloquial for cultivated press.\n\n❌ 使人失望 sounds odd; ✅ 令人失望 — the frozen form with impersonal 人 uses 令.\n\n❌ 他使我不去 (odd direct negation); ✅ 他不让我去 — to forbid, prefer 不让.\n\n❌ 这个东西使我 (no complement); ✅ 使 ALWAYS requires a resulting state after.',
      tips: '💡 **Matrice de registre :**\n  • Casual oral (ami, famille) → **让**\n  • Discussion sérieuse / cours → **让** ou **使**\n  • Dissertation / article → **使**\n  • Éditorial / poésie / discours → **令**\n\n💡 **Test du 人 impersonnel :** si tu peux dire « rendre les gens X », c\'est un candidat pour **令人 + X** (chengyu). Sinon, **使**.\n\n💡 **Chengyu à maîtriser passivement (fréquents HSK5-6) :** 令人失望, 令人感动, 令人钦佩, 令人瞩目, 令人惊叹, 令人发指, 使人振奋, 使人深思.\n\n💡 **Astuce dissertation :** varier 使 avec 让 dans un même essai évite les répétitions ; garder 令 pour les moments de « punch » émotionnel.\n\n💡 **Contraste 让 vs 使 vs 令 :** 让 = neutre, action possible ; 使 = cause objective, résultat ; 令 = émotion produite chez autrui.\n\n💡 **Faux ami :** ne pas confondre 令 causatif avec 命令 (ordonner, verbe distinct).',
      tipsEn: '💡 **Register matrix:**\n  • Casual speech (friend, family) → **让**\n  • Serious discussion / class → **让** or **使**\n  • Essay / article → **使**\n  • Editorial / poetry / speech → **令**\n\n💡 **The impersonal 人 test:** if you can say "make people X", it\'s a candidate for **令人 + X** (chengyu). Otherwise, **使**.\n\n💡 **Chengyu to master passively (frequent HSK5-6):** 令人失望, 令人感动, 令人钦佩, 令人瞩目, 令人惊叹, 令人发指, 使人振奋, 使人深思.\n\n💡 **Essay tip:** alternating 使 with 让 within the same essay avoids repetition; keep 令 for emotional "punch" moments.\n\n💡 **让 vs 使 vs 令 contrast:** 让 = neutral, possible action; 使 = objective cause, result; 令 = emotion produced in others.\n\n💡 **False friend:** don\'t confuse causative 令 with 命令 (to order, a distinct verb).',
      relatedGrammar: ['grammar-rang-causative']
    },
    audio: 'audio/grammar/shi-ling-causative.wav',
    examples: [
      { hanzi: '这本书使我很感动', pinyin: 'zhè běn shū shǐ wǒ hěn gǎndòng', translation: 'This book moves me deeply', translationFr: 'Ce livre me touche beaucoup' },
      { hanzi: '他的行为令人难以理解', pinyin: 'tā de xíngwéi lìng rén nányǐ lǐjiě', translation: 'His behavior is hard to understand', translationFr: 'Son comportement est difficile à comprendre' },
      { hanzi: '音乐使人放松', pinyin: 'yīnyuè shǐ rén fàngsōng', translation: 'Music relaxes people', translationFr: 'La musique détend' },
      { hanzi: '这次改革使经济迅速发展', pinyin: 'zhè cì gǎigé shǐ jīngjì xùnsù fāzhǎn', translation: 'This reform has rapidly developed the economy', translationFr: 'Cette réforme a permis à l\'économie de se développer rapidement' },
      { hanzi: '她的坚强令人钦佩', pinyin: 'tā de jiānqiáng lìng rén qīnpèi', translation: 'Her strength commands admiration', translationFr: 'Sa force force l\'admiration' },
      { hanzi: '这个消息令我久久不能平静', pinyin: 'zhège xiāoxi lìng wǒ jiǔjiǔ bùnéng píngjìng', translation: 'This news kept me unsettled for a long time', translationFr: 'Cette nouvelle m\'a bouleversé longtemps' },
      { hanzi: '教育使人独立思考', pinyin: 'jiàoyù shǐ rén dúlì sīkǎo', translation: 'Education makes people think independently', translationFr: 'L\'éducation apprend à penser par soi-même' }
    ],
    quiz: {
      prompt: '« Cela me touche » (registre formel) = ?',
      choices: ['这让我感动', '这使我感动', '这令我感动', '这叫我感动'],
      correctChoiceIndex: 1
    },
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '他的成功___大家吃惊',
      translation: 'Son succès étonne tout le monde',
      translationEn: 'His success surprises everyone',
      choices: ['让', '使', '令', '叫'],
      correctChoice: '使',
      explanation: '使 est le causatif formel adapté à un ton neutre/écrit avec un état résultant (吃惊 « étonné »).',
      pinyin: 'tā de chénggōng ___ dàjiā chījīng'
    },
    tags: ['grammaire', 'causatif', 'formel'],
    theme: 'grammar'
  },

  // ============================================
  // HSK4 — 一...都/也...不/没 (négation absolue)
  // ============================================
  {
    id: 'grammar-yi-dou-negation',
    level: 'hsk4',
    hanzi: '一...都/也...不/没',
    pinyin: 'yī...dōu/yě...bù/méi',
    translation: 'not a single one, not at all',
    translationFr: 'Négation absolue : « pas un seul, pas du tout »',
    category: 'grammaire',
    explanation: 'Structure d\'emphase pour NIER TOTALEMENT (« pas un seul, pas la moindre »).',
    grammarExplanation: {
      whenToUse: 'Structure d\'EMPHASE négative absolue. Usage courant, à l\'oral comme à l\'écrit.\n\n**Cas 1 — Nier une quantité minimale :** 一 + classificateur + 都 = « pas UN SEUL ». « 我一个朋友也没有 » = je n\'ai aucun ami (pas un seul).\n\n**Cas 2 — Nier un DEGRÉ (avec 一点) :** 一点都不/没 = « pas la moindre miette ». « 我一点都不知道 » = je n\'ai pas la moindre idée.\n\n**Cas 3 — Nier une DURÉE minimale :** 一分钟/一秒/一天 + 都 + 没 = pas une seconde. « 他一天都没休息 » = il n\'a pas eu un seul jour de repos.\n\n**Cas 4 — Nier une ACTION minimale :** 一句/一次/一步 + 都 + 没. « 她一句话也没说 » = elle n\'a pas dit un mot.\n\n**Cas 5 — Emphase émotionnelle (à l\'oral) :** exprime frustration, indignation, surprise (« 一分钱都没给我 ! »).\n\n**Cas 6 — Registre :** utile dans les DIALOGUES vivants, les monologues intérieurs, les argumentations orales. À l\'écrit soutenu, on préfère parfois 毫无, 丝毫不, 从来没. Fréquence : très haute (HSK4 courant).',
      whenToUseEn: 'Absolute negative EMPHASIS structure. Common in both speech and writing.\n\n**Case 1 — Negate a minimal quantity:** 一 + CL + 都 = "not a SINGLE one". "我一个朋友也没有" = I don\'t have a single friend.\n\n**Case 2 — Negate a DEGREE (with 一点):** 一点都不/没 = "not the slightest bit". "我一点都不知道" = I don\'t have the slightest idea.\n\n**Case 3 — Negate a minimal DURATION:** 一分钟/一秒/一天 + 都 + 没 = not one second. "他一天都没休息" = he hasn\'t had a single day of rest.\n\n**Case 4 — Negate a minimal ACTION:** 一句/一次/一步 + 都 + 没. "她一句话也没说" = she didn\'t say a word.\n\n**Case 5 — Emotional emphasis (spoken):** expresses frustration, indignation, surprise ("一分钱都没给我 !").\n\n**Case 6 — Register:** useful in lively DIALOGUES, inner monologues, oral argumentation. In formal writing, 毫无, 丝毫不, 从来没 are sometimes preferred. Frequency: very high (common HSK4).',
      howToUse: '**Structure 1 :** Sujet + **一 + Classificateur + Objet + 都/也 + 不/没 + Verbe**\n\nEx :\n• 我一个人都不认识 (wǒ yí gè rén dōu bú rènshi) = Je ne connais personne\n• 他一分钱也没给我 (tā yì fēn qián yě méi gěi wǒ) = Il ne m\'a pas donné un centime\n• 我一本书都没看完 = Je n\'ai pas fini un seul livre\n• 教室里一个学生也没有 = Il n\'y a aucun élève dans la salle\n\n**Structure 2 :** Sujet + **一点(儿) + 都/也 + 不/没 + Adj/Verbe** (nier un degré)\n\nEx :\n• 我一点都不累 = Je ne suis pas du tout fatigué\n• 这个菜一点也不辣 = Ce plat n\'est pas piquant du tout\n• 他一点都没变 = Il n\'a pas changé d\'un pouce\n• 我一点儿也不喜欢这部电影 = Je n\'aime pas ce film le moins du monde\n\n**Structure 3 :** Sujet + **一 + unité de temps + 都/也 + 没 + Verbe** (nier une durée)\n\nEx :\n• 他一天都没来 = Il n\'est pas venu une seule journée\n• 我一秒钟也没浪费 = Je n\'ai pas perdu une seconde\n• 一分钟都没等 = Il n\'a pas attendu une minute\n\n**Structure 4 — Variante avec 连 pour renforcer :** 连 + 一 + CL + Objet + 都/也 + 不/没\n\nEx :\n• 他连一句话也不说 = Il ne dit même pas un mot\n• 连一个字都不认识 = Il ne reconnaît même pas un caractère\n\n**Choix 都 vs 也 :** interchangeables ici. 都 est légèrement plus emphatique et plus fréquent. 也 est plus doux, souvent dans une comparaison implicite.\n\n**Choix 不 vs 没 :** 不 pour état/habitude/futur (不累, 不喜欢) ; 没 pour action passée (没来, 没说).',
      howToUseEn: '**Structure 1:** Subject + **一 + Classifier + Object + 都/也 + 不/没 + Verb**\n\nEx:\n• 我一个人都不认识 = I don\'t know a single person\n• 他一分钱也没给我 = He didn\'t give me a cent\n• 我一本书都没看完 = I didn\'t finish a single book\n• 教室里一个学生也没有 = There\'s not a single student in the classroom\n\n**Structure 2:** Subject + **一点(儿) + 都/也 + 不/没 + Adj/Verb** (negate a degree)\n\nEx:\n• 我一点都不累 = I\'m not tired at all\n• 这个菜一点也不辣 = This dish isn\'t spicy at all\n• 他一点都没变 = He hasn\'t changed a bit\n• 我一点儿也不喜欢这部电影 = I don\'t like this movie one bit\n\n**Structure 3:** Subject + **一 + time unit + 都/也 + 没 + Verb** (negate a duration)\n\nEx:\n• 他一天都没来 = He didn\'t come for a single day\n• 我一秒钟也没浪费 = I didn\'t waste one second\n• 一分钟都没等 = He didn\'t wait one minute\n\n**Structure 4 — Variant with 连 to reinforce:** 连 + 一 + CL + Object + 都/也 + 不/没\n\nEx:\n• 他连一句话也不说 = He won\'t say even a word\n• 连一个字都不认识 = He doesn\'t recognize even one character\n\n**Choice 都 vs 也:** interchangeable here. 都 is slightly more emphatic and more frequent. 也 is softer, often with an implicit comparison.\n\n**Choice 不 vs 没:** 不 for state/habit/future (不累, 不喜欢); 没 for past action (没来, 没说).',
      commonMistakes: '❌ 我一点不累 (raison : sans 都/也, la structure est BOITEUSE) ; ✅ 我一点都不累 (correct : 都 obligatoire pour l\'emphase totale).\n\n❌ 我不一点累 (mauvais ordre : 不 doit venir APRÈS 都/也) ; ✅ 我一点都不累.\n\n❌ 他一天都不来了 avec sens passé ; ✅ 他一天都没来 (action passée = 没, pas 不).\n\n❌ 我一分钱都没有一 (répétition parasite) ; ✅ 我一分钱都没有.\n\n❌ 一点都不太累 (redondant : 一点都不 + 不太) ; ✅ Choisir 一点都不累 OU 不太累.\n\n❌ Utiliser cette structure pour une négation FAIBLE (« un peu ») ; ✅ Cette structure = négation TOTALE. Pour « pas très », utiliser 不太.\n\n❌ 一点儿都没高兴 (adjectif d\'humeur passé avec 没) ; ✅ 一点儿都不高兴 (état = 不).',
      commonMistakesEn: '❌ 我一点不累 (reason: without 都/也, structure is LIMP); ✅ 我一点都不累 (correct: 都 mandatory for total emphasis).\n\n❌ 我不一点累 (wrong order: 不 must come AFTER 都/也); ✅ 我一点都不累.\n\n❌ 他一天都不来了 with past meaning; ✅ 他一天都没来 (past action = 没, not 不).\n\n❌ 我一分钱都没有一 (parasitic repetition); ✅ 我一分钱都没有.\n\n❌ 一点都不太累 (redundant: 一点都不 + 不太); ✅ Choose 一点都不累 OR 不太累.\n\n❌ Using this structure for WEAK negation ("a little"); ✅ This structure = TOTAL negation. For "not very", use 不太.\n\n❌ 一点儿都没高兴 (past mood adjective with 没); ✅ 一点儿都不高兴 (state = 不).',
      tips: '💡 **Mnémo :** « UN + CL + 都/也 + PAS ». Le 一 = point de départ minimal ; 都 = « même », 不/没 = négation.\n\n💡 **Renforcement max avec 连 :** 连一 + CL + 都/也 + 不/没 = « pas MÊME un ». C\'est le degré ultime.\n\n💡 **Contraste 一点都不 vs 不太 :**\n  • 一点都不好吃 = franchement pas bon (dégoût)\n  • 不太好吃 = pas très bon (nuance polie)\n\n💡 **À l\'écrit soutenu**, alterner avec **毫无** (« sans aucun »), **丝毫不** (« pas le moindre »), **从未** (« jamais »).\n\n💡 **Attention à l\'ambigüité tonale :** 一点都不难 peut être une vraie réponse (« c\'est facile ! ») ou une politesse chinoise (« oh c\'est rien du tout ! »). Le contexte tranche.\n\n💡 **Expressions figées à retenir :** 一点也不错 (parfaitement exact), 一分钱不值 (ne vaut pas un sou), 一无所知 (littéraire, sans rien savoir), 一无所有 (sans rien posséder).',
      tipsEn: '💡 **Mnemonic:** "ONE + CL + 都/也 + NOT". The 一 = minimal starting point; 都 = "even", 不/没 = negation.\n\n💡 **Max reinforcement with 连:** 连一 + CL + 都/也 + 不/没 = "not EVEN one". This is the ultimate degree.\n\n💡 **一点都不 vs 不太 contrast:**\n  • 一点都不好吃 = frankly not tasty (dislike)\n  • 不太好吃 = not very tasty (polite nuance)\n\n💡 **In formal writing**, alternate with **毫无** ("with no"), **丝毫不** ("not the slightest"), **从未** ("never").\n\n💡 **Watch tone ambiguity:** 一点都不难 can be a genuine reply ("it\'s easy!") or Chinese politeness ("oh, nothing at all!"). Context decides.\n\n💡 **Frozen expressions worth memorizing:** 一点也不错 (perfectly correct), 一分钱不值 (worthless), 一无所知 (literary, knowing nothing), 一无所有 (having nothing).',
      relatedGrammar: ['grammar-dou-all', 'grammar-negation-bu']
    },
    audio: 'audio/grammar/yi-dou-negation.wav',
    examples: [
      { hanzi: '我一点都不知道', pinyin: 'wǒ yìdiǎn dōu bù zhīdào', translation: 'I have no idea at all', translationFr: 'Je n\'en sais absolument rien' },
      { hanzi: '他一次也没来过', pinyin: 'tā yí cì yě méi lái guo', translation: 'He has never come, not even once', translationFr: 'Il n\'est jamais venu, pas une seule fois' },
      { hanzi: '这个字我一个都不会', pinyin: 'zhège zì wǒ yí ge dōu bú huì', translation: 'I don\'t know a single one of these characters', translationFr: 'Je n\'en connais pas un seul de ces caractères' },
      { hanzi: '他一分钱也没给我', pinyin: 'tā yì fēn qián yě méi gěi wǒ', translation: 'He didn\'t give me a single cent', translationFr: 'Il ne m\'a pas donné un centime' },
      { hanzi: '我连一句话也没说', pinyin: 'wǒ lián yí jù huà yě méi shuō', translation: 'I didn\'t even say one word', translationFr: 'Je n\'ai même pas dit un mot' },
      { hanzi: '这个菜一点儿都不辣', pinyin: 'zhège cài yìdiǎnr dōu bú là', translation: 'This dish isn\'t spicy at all', translationFr: 'Ce plat n\'est absolument pas piquant' },
      { hanzi: '我一天都没休息', pinyin: 'wǒ yì tiān dōu méi xiūxi', translation: 'I didn\'t rest for a single day', translationFr: 'Je ne me suis pas reposé une seule journée' }
    ],
    quiz: {
      prompt: '« Je ne suis PAS DU TOUT fatigué » = ?',
      choices: ['我不累', '我一点不累', '我一点都不累', '我很不累'],
      correctChoiceIndex: 2
    },
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '我___钱___没有',
      translation: 'Je n\'ai pas un sou',
      translationEn: 'I don\'t have a single cent',
      choices: ['一分 ... 都', '一分 ... 就', '很少 ... 也', '不 ... 都'],
      correctChoice: '一分 ... 都',
      explanation: 'Structure d\'emphase : 一 + classificateur (分) + 都 + 没 = négation absolue.',
      pinyin: 'wǒ ___ qián ___ méiyǒu'
    },
    tags: ['grammaire', 'négation', 'emphase'],
    theme: 'grammar'
  },

  // ============================================
  // HSK5 — 大概 / 也许 / 可能 / 恐怕 (modalité épistémique)
  // ============================================
  {
    id: 'grammar-epistemic-modality',
    level: 'hsk5',
    hanzi: '大概 / 也许 / 可能 / 恐怕',
    pinyin: 'dàgài / yěxǔ / kěnéng / kǒngpà',
    translation: 'probably / perhaps / possibly / I\'m afraid',
    translationFr: 'Modalité épistémique : « probablement / peut-être / j\'ai peur que »',
    category: 'grammaire',
    explanation: 'Adverbes ou modaux qui indiquent le DEGRÉ DE CERTITUDE du locuteur sur un fait. Nuances importantes.',
    grammarExplanation: {
      whenToUse: 'La modalité épistémique exprime le DEGRÉ DE CERTITUDE du locuteur sur un fait. Le chinois possède un système finement gradué qu\'il faut maîtriser pour ne pas surestimer ou sous-estimer une hypothèse.\n\n**大概 (~70 %) :** « probablement, environ ». Neutre, oral et écrit. Souvent utilisé pour une ESTIMATION chiffrée (« il doit avoir environ 30 ans »).\n\n**也许 (~50 %) :** « peut-être ». Plus soutenu, TRÈS fréquent à l\'écrit. Ouvre une hypothèse sans engagement fort. En tête de phrase le plus souvent.\n\n**可能 (~40-70 %) :** « possible ». Polyvalent (adverbe OU verbe modal). Le plus FRÉQUENT à l\'oral casual. Peu marqué émotionnellement, plutôt objectif.\n\n**恐怕 (~75-85 %) :** « je crains que ». Ton d\'INQUIÉTUDE ou de POLITESSE. Souvent devant une mauvaise nouvelle, un refus courtois, une prédiction pessimiste. Le locuteur est presque sûr mais anticipe une réaction négative.\n\n**或许 (~40-50 %) :** « peut-être » soutenu, littéraire. Alternative écrite à 也许. Sonne pensif, poétique.\n\n**说不定 (~50 % surprise) :** « qui sait ! ». Ouvert, positif, oral vivant. Voir la fiche 不见得/未必/说不定 pour le détail.\n\n**Registre :** 可能 oral > 大概 mixte > 也许/或许 écrit > 恐怕 poli/anxieux. Fréquence relative HSK5+ : 可能 40 %, 大概 20 %, 也许 20 %, 恐怕 15 %, 或许 5 %.',
      whenToUseEn: 'Epistemic modality expresses the speaker\'s DEGREE OF CERTAINTY. Chinese has a finely graded system that must be mastered to avoid over- or understating a hypothesis.\n\n**大概 (~70 %):** "probably, roughly". Neutral, spoken and written. Often used for a numerical ESTIMATE ("he\'s probably around 30").\n\n**也许 (~50 %):** "perhaps". More formal, VERY common in writing. Opens a hypothesis without strong commitment. Usually at the start of the sentence.\n\n**可能 (~40-70 %):** "possibly". Versatile (adverb OR modal verb). MOST common in casual speech. Emotionally neutral, rather objective.\n\n**恐怕 (~75-85 %):** "I\'m afraid". Tone of CONCERN or POLITENESS. Often before bad news, a polite refusal, a pessimistic prediction. Speaker is almost sure but anticipates a negative reaction.\n\n**或许 (~40-50 %):** "perhaps", formal, literary. Written alternative to 也许. Sounds thoughtful, poetic.\n\n**说不定 (~50 % surprise):** "who knows!". Open, positive, lively spoken. See the 不见得/未必/说不定 card for details.\n\n**Register:** 可能 spoken > 大概 mixed > 也许/或许 written > 恐怕 polite/anxious. HSK5+ relative frequency: 可能 40 %, 大概 20 %, 也许 20 %, 恐怕 15 %, 或许 5 %.',
      howToUse: '**Structure 1 — 大概 :** Sujet + 大概 + Verbe/état (souvent avec quantité approximative)\n\nEx :\n• 他大概三十岁 = Il a environ 30 ans\n• 大概要两个小时 = Ça prendra probablement deux heures\n• 她大概不知道这件事 = Elle ne doit pas être au courant\n• 大概五百块 = Environ 500 yuans\n• 他大概忘了 = Il a probablement oublié\n\n**Structure 2 — 也许 :** 也许 + Phrase (souvent en tête). Peut aussi être après le sujet.\n\nEx :\n• 也许他明天来 = Peut-être qu\'il viendra demain\n• 也许我错了 = Peut-être ai-je tort\n• 也许你说得对 = Tu as peut-être raison\n• 我也许去，也许不去 = Peut-être que j\'irai, peut-être pas (structure alternée soutenue)\n\n**Structure 3 — 可能 (adverbe) :** Sujet + 可能 + Verbe\n\nEx :\n• 明天可能下雨 = Il pleuvra peut-être demain\n• 他可能不来了 = Il ne viendra peut-être plus\n• 这可能是真的 = C\'est peut-être vrai\n\n**Structure 4 — 可能 (verbe modal / nom) :**\n• 这可能吗？= Est-ce possible ?\n• 有可能 = c\'est possible\n• 不可能 = c\'est impossible\n• 有这个可能 = il y a cette possibilité\n\n**Structure 5 — 恐怕 :** 恐怕 + Phrase (souvent en tête, pour annoncer une mauvaise nouvelle ou refuser poliment)\n\nEx :\n• 恐怕他不来了 = Je crains qu\'il ne vienne pas\n• 恐怕我们迟到了 = Je crains qu\'on ne soit en retard\n• 恐怕不行 = Je crains que ce ne soit pas possible (refus poli)\n• 恐怕来不及了 = Je crains qu\'il ne soit trop tard\n• 恐怕要下雨 = J\'ai peur qu\'il pleuve\n\n**Structure 6 — 或许 (littéraire) :**\n• 或许命运自有安排 = Peut-être que le destin a son plan\n• 或许我们还能再见 = Peut-être nous reverrons-nous\n\n**Position :** dans une phrase déclarative, ces adverbes se placent APRÈS le sujet et AVANT le verbe. À l\'écrit soutenu, 也许 et 或许 peuvent ouvrir la phrase en position TOPIC.',
      howToUseEn: '**Structure 1 — 大概:** Subject + 大概 + Verb/state (often with approximate quantity)\n\nEx:\n• 他大概三十岁 = He\'s about 30\n• 大概要两个小时 = It will probably take two hours\n• 她大概不知道这件事 = She probably doesn\'t know\n• 大概五百块 = About 500 yuan\n• 他大概忘了 = He probably forgot\n\n**Structure 2 — 也许:** 也许 + sentence (often initial). Can also follow the subject.\n\nEx:\n• 也许他明天来 = Perhaps he\'ll come tomorrow\n• 也许我错了 = Perhaps I\'m wrong\n• 也许你说得对 = You may be right\n• 我也许去，也许不去 = Maybe I\'ll go, maybe not (formal alternated structure)\n\n**Structure 3 — 可能 (adverb):** Subject + 可能 + Verb\n\nEx:\n• 明天可能下雨 = It may rain tomorrow\n• 他可能不来了 = He might not come\n• 这可能是真的 = This may be true\n\n**Structure 4 — 可能 (modal verb / noun):**\n• 这可能吗？= Is this possible?\n• 有可能 = it\'s possible\n• 不可能 = it\'s impossible\n• 有这个可能 = there\'s that possibility\n\n**Structure 5 — 恐怕:** 恐怕 + sentence (often initial, to announce bad news or politely refuse)\n\nEx:\n• 恐怕他不来了 = I\'m afraid he won\'t come\n• 恐怕我们迟到了 = I\'m afraid we\'re late\n• 恐怕不行 = I\'m afraid it\'s not possible (polite refusal)\n• 恐怕来不及了 = I\'m afraid it\'s too late\n• 恐怕要下雨 = I\'m afraid it will rain\n\n**Structure 6 — 或许 (literary):**\n• 或许命运自有安排 = Perhaps fate has its plan\n• 或许我们还能再见 = Perhaps we\'ll meet again\n\n**Position:** in a declarative sentence, these adverbs go AFTER the subject and BEFORE the verb. In formal writing, 也许 and 或许 can open the sentence in TOPIC position.',
      commonMistakes: '❌ 恐怕你今天真漂亮 (« Je crains que tu ne sois belle ») ; ✅ 恐怕 ne s\'utilise PAS pour un fait positif — utilise 也许 ou rien.\n\n❌ 也许可能他来 (empilement) ; ✅ 也许他来 ou 他可能来 — choisir UN seul modal.\n\n❌ 大概他 (sans verbe) ; ✅ 大概 exige un verbe/état après (他大概不来).\n\n❌ 恐怕他明天来 avec sens positif attendu ; ✅ 恐怕 = anticiper un problème. Si tu ATTENDS sa venue avec plaisir, dis 希望他明天来.\n\n❌ 或许 à l\'oral casual ; ✅ 或许 = littéraire. Préfère 也许 ou 可能 à l\'oral.\n\n❌ Placer 也许 après le verbe (他来也许) ; ✅ 也许 avant le verbe (也许他来).\n\n❌ 可能不可能 (double possibilité) ; ✅ 有没有可能 (structure question standard).\n\n❌ 大概是三十岁吗？ (question directe avec 大概) ; ✅ 大概 dans une AFFIRMATION. Pour une question, utiliser 大概几岁？',
      commonMistakesEn: '❌ 恐怕你今天真漂亮 ("I\'m afraid you look beautiful"); ✅ 恐怕 is NOT used for a positive fact — use 也许 or nothing.\n\n❌ 也许可能他来 (stacking); ✅ 也许他来 or 他可能来 — pick ONE modal.\n\n❌ 大概他 (no verb); ✅ 大概 requires a verb/state after (他大概不来).\n\n❌ 恐怕他明天来 with positive expected meaning; ✅ 恐怕 = anticipating a problem. If you\'re HAPPILY expecting his arrival, say 希望他明天来.\n\n❌ 或许 in casual speech; ✅ 或许 = literary. Prefer 也许 or 可能 in speech.\n\n❌ Placing 也许 after the verb (他来也许); ✅ 也许 before the verb (也许他来).\n\n❌ 可能不可能 (double possibility); ✅ 有没有可能 (standard question structure).\n\n❌ 大概是三十岁吗？(direct question with 大概); ✅ 大概 in a STATEMENT. For a question, use 大概几岁？',
      tips: '💡 **Échelle de certitude complète :**\n一定/肯定 (100 % → 95 %) > 应该 (85 %) > 恐怕/大概 (75 %) > 可能 (50-70 %) > 也许/或许 (~50 %) > 说不定 (surprise ouverte) > 不见得/未必 (contredit un préjugé)\n\n💡 **Test du ton :** demande-toi si le locuteur est PLUTÔT INQUIET (恐怕), PLUTÔT SÛR (大概), NEUTRE (可能), ou OUVERT (也许). Le choix du modal reflète l\'attitude.\n\n💡 **Refus poli chinois :** 恐怕不行 est LE refus formule diplomatique. À maîtriser absolument (négociations, invitations refusées).\n\n💡 **Modalité + 会 (futur/hypothétique) :** 可能会下雨, 也许会来 — ajouter 会 rend l\'hypothèse plus prospective.\n\n💡 **En dissertation :** varier 也许 et 或许 pour l\'écriture soutenue. Éviter le 大概 estimatif qui sonne oral.\n\n💡 **Faux ami :** 可能 tout seul = « possible » (adjectif/nom), pas « peut-être ». « 有可能 » = « c\'est possible », pas « peut-être qu\'il y a ».',
      tipsEn: '💡 **Full certainty scale:**\n一定/肯定 (100 % → 95 %) > 应该 (85 %) > 恐怕/大概 (75 %) > 可能 (50-70 %) > 也许/或许 (~50 %) > 说不定 (open surprise) > 不见得/未必 (contradicts assumption)\n\n💡 **Tone test:** ask whether the speaker is more WORRIED (恐怕), CONFIDENT (大概), NEUTRAL (可能), or OPEN (也许). The modal reflects the attitude.\n\n💡 **Chinese polite refusal:** 恐怕不行 is THE diplomatic refusal formula. A must-master (negotiations, declined invitations).\n\n💡 **Modality + 会 (future/hypothetical):** 可能会下雨, 也许会来 — adding 会 makes the hypothesis more prospective.\n\n💡 **In essays:** alternate 也许 and 或许 for formal writing. Avoid the estimative 大概 which sounds oral.\n\n💡 **False friend:** 可能 alone = "possible" (adj./noun), not "perhaps". "有可能" = "it\'s possible", not "perhaps there is".',
      relatedGrammar: []
    },
    audio: 'audio/grammar/epistemic-modality.wav',
    examples: [
      { hanzi: '他大概不知道', pinyin: 'tā dàgài bù zhīdào', translation: 'He probably doesn\'t know', translationFr: 'Il ne sait sans doute pas' },
      { hanzi: '也许我们应该等一下', pinyin: 'yěxǔ wǒmen yīnggāi děng yíxià', translation: 'Perhaps we should wait a bit', translationFr: 'Peut-être qu\'on devrait attendre un peu' },
      { hanzi: '恐怕这个方案不行', pinyin: 'kǒngpà zhège fāng\'àn bùxíng', translation: 'I\'m afraid this plan won\'t work', translationFr: 'Je crains que ce plan ne fonctionne pas' },
      { hanzi: '恐怕明天不能来了', pinyin: 'kǒngpà míngtiān bùnéng lái le', translation: 'I\'m afraid I won\'t be able to come tomorrow', translationFr: 'Je crains de ne pas pouvoir venir demain (refus poli)' },
      { hanzi: '这件事可能有点复杂', pinyin: 'zhè jiàn shì kěnéng yǒudiǎn fùzá', translation: 'This matter might be a bit complicated', translationFr: 'Cette affaire est peut-être un peu compliquée' },
      { hanzi: '大概还需要三天时间', pinyin: 'dàgài hái xūyào sān tiān shíjiān', translation: 'It will probably take three more days', translationFr: 'Il faudra encore trois jours environ' },
      { hanzi: '或许一切都会好起来', pinyin: 'huòxǔ yíqiè dōu huì hǎo qǐlái', translation: 'Perhaps everything will turn out fine', translationFr: 'Peut-être que tout ira bien (littéraire)' }
    ],
    quiz: {
      prompt: '« J\'ai peur qu\'il pleuve » (ton poli) = ?',
      choices: ['大概要下雨了', '也许要下雨了', '恐怕要下雨了', '一定要下雨了'],
      correctChoiceIndex: 2
    },
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '___他已经走了',
      translation: 'Peut-être qu\'il est déjà parti',
      translationEn: 'Perhaps he has already left',
      choices: ['大概', '也许', '可能', '恐怕'],
      correctChoice: '也许',
      explanation: '也许 (« peut-être ») s\'utilise souvent en tête de phrase pour marquer une hypothèse neutre ~50 %.',
      pinyin: '___ tā yǐjīng zǒu le'
    },
    tags: ['grammaire', 'modalité', 'certitude'],
    theme: 'grammar'
  },

  // ============================================
  // HSK5 — 不见得 / 未必 / 说不定 (modalité négative nuancée)
  // ============================================
  {
    id: 'grammar-bujiande-weibi-shuobuding',
    level: 'hsk5',
    hanzi: '不见得 / 未必 / 说不定',
    pinyin: 'bùjiàndé / wèibì / shuōbudìng',
    translation: 'not necessarily / who knows, maybe',
    translationFr: '« pas forcément » (不见得, 未必) vs « qui sait ! » (说不定)',
    category: 'grammaire',
    explanation: 'Trois modaux nuancés pour DOUTER, CONTREDIRE partiellement, ou ouvrir une possibilité inattendue.',
    grammarExplanation: {
      whenToUse: 'Trois modaux à FONCTION RHÉTORIQUE : ils servent à CONTREDIRE un préjugé ou OUVRIR une possibilité inattendue. Distincts des modaux épistémiques neutres (也许, 可能).\n\n**不见得 (~40-60 %) :** « pas forcément, pas nécessairement ». **CONTREDIT un préjugé courant.** Le locuteur pousse un contre-argument doux. Registre oral et écrit, très fréquent dans les DÉBATS et les échanges argumentés. Nuance de scepticisme poli.\n\n**未必 (~40-60 %) :** MÊME sens que 不见得, mais plus SOUTENU. Registre écrit, éditorial, dissertation. Plus concis, plus impersonnel. Un chinois cultivé dira 未必 dans un essai, 不见得 dans une conversation.\n\n**说不定 (~50 % surprise ouverte) :** « qui sait ! peut-être bien ! ». **OUVRE une possibilité inattendue**, souvent positive ou surprenante. Registre ORAL uniquement. Sonne vivant, optimiste ou taquin. Anglais « you never know! ».\n\n**Fonction pragmatique :**\n• 不见得/未必 = CONTREDIRE (« non, ce n\'est pas si simple »)\n• 说不定 = SPÉCULER positivement (« et si... ! »)\n\n**Situations typiques :**\n• Débat : « 有钱的人 » → « 不见得幸福 » (contrer un préjugé)\n• Encouragement : « 你会赢的，说不定还是冠军 » (ouvrir un espoir)\n• Dissertation : « 表面成功的方案未必可持续 » (nuancer une thèse)\n• Consolation : « 别灰心，说不定明天有好消息 » (« qui sait »)\n\n**Fréquence :** dans un dialogue argumenté HSK5, 不见得 apparaît 3-5 fois par 100 énoncés ; 说不定 est très fréquent à l\'oral quotidien.',
      whenToUseEn: 'Three modals with a RHETORICAL function: to CONTRADICT an assumption or OPEN an unexpected possibility. Distinct from neutral epistemic modals (也许, 可能).\n\n**不见得 (~40-60 %):** "not necessarily". **CONTRADICTS a common preconception.** Speaker pushes a gentle counter-argument. Spoken and written register, very common in DEBATES and argumentative exchanges. Nuance of polite skepticism.\n\n**未必 (~40-60 %):** SAME meaning as 不见得, but more FORMAL. Written register, editorial, essay. More concise, more impersonal. A cultivated Chinese will say 未必 in an essay, 不见得 in conversation.\n\n**说不定 (~50 % open surprise):** "who knows! maybe!". **OPENS an unexpected possibility**, often positive or surprising. SPOKEN register only. Sounds lively, optimistic or teasing. English "you never know!".\n\n**Pragmatic function:**\n• 不见得/未必 = CONTRADICT ("no, it\'s not that simple")\n• 说不定 = positively SPECULATE ("what if...!")\n\n**Typical situations:**\n• Debate: "rich people" → "不见得幸福" (counter a preconception)\n• Encouragement: "you\'ll win, maybe even become champion" (open a hope)\n• Essay: "a superficially successful plan 未必 sustainable" (nuance a thesis)\n• Consolation: "don\'t give up, 说不定 there\'s good news tomorrow" ("who knows")\n\n**Frequency:** in an argumentative HSK5 dialogue, 不见得 appears 3-5 times per 100 utterances; 说不定 is very common in daily speech.',
      howToUse: '**Structure 1 — 不见得 (contre-préjugé oral+écrit) :** Sujet/Topic + 不见得 + Adj/Verbe\n\nEx :\n• 贵的不见得好 (guì de bùjiàndé hǎo) = Cher ≠ forcément bon\n• 他不见得会来 = Il n\'est pas certain qu\'il vienne\n• 有钱的人不见得幸福 = Les riches ne sont pas forcément heureux\n• 你觉得的答案不见得对 = La réponse que tu crois n\'est pas forcément juste\n• 这个方案看起来不错，但不见得能实施 = Ce plan a l\'air bien mais ne pourra pas forcément être mis en œuvre\n\n**Structure 2 — 未必 (soutenu écrit) :** Sujet + 未必 + Adj/Verbe\n\nEx :\n• 他未必知道内情 = Il n\'est pas forcément au courant du fond de l\'affaire\n• 成功者未必是天才 = Ceux qui réussissent ne sont pas forcément des génies\n• 表面繁华未必真实 = Une prospérité de façade n\'est pas forcément réelle\n• 名牌大学的毕业生未必比其他人更优秀 = Les diplômés des grandes universités ne sont pas forcément meilleurs\n\n**Structure 3 — 说不定 (possibilité ouverte à l\'oral) :** (Sujet) + 说不定 + Phrase\n\nEx :\n• 说不定明天会下雨 = Qui sait, il pleuvra peut-être demain\n• 说不定他已经到了 = Il est peut-être déjà arrivé\n• 试试看，说不定成功了呢 = Essaie, qui sait, tu réussiras peut-être !\n• 你去问问他，说不定他知道 = Va lui demander, il sait peut-être\n• 说不定这就是命运 = Qui sait, c\'est peut-être ça, le destin\n\n**Structure 4 — Combinaison dialogique fréquente :**\n• A : 他一定会成功 → B : 不见得吧 (« pas si sûr »)\n• A : 这次没戏了 → B : 说不定还有希望 (« qui sait, il y a peut-être encore de l\'espoir »)\n\n**Structure 5 — Avec 呢 (particule d\'insistance à l\'oral) :** 说不定 + Phrase + 呢\n• 说不定他能帮我们呢 ! = Qui sait, il peut peut-être nous aider !\n\n**Position :** tous trois se placent APRÈS le sujet et AVANT le verbe/adjectif. 说不定 peut aussi ouvrir la phrase en position TOPIC.',
      howToUseEn: '**Structure 1 — 不见得 (counter-preconception, spoken+written):** Subject/Topic + 不见得 + Adj/Verb\n\nEx:\n• 贵的不见得好 = Expensive ≠ necessarily good\n• 他不见得会来 = He may not necessarily come\n• 有钱的人不见得幸福 = Rich people aren\'t necessarily happy\n• 你觉得的答案不见得对 = The answer you think isn\'t necessarily right\n• 这个方案看起来不错，但不见得能实施 = This plan looks good but can\'t necessarily be implemented\n\n**Structure 2 — 未必 (formal written):** Subject + 未必 + Adj/Verb\n\nEx:\n• 他未必知道内情 = He isn\'t necessarily aware of the inside story\n• 成功者未必是天才 = Successful people aren\'t necessarily geniuses\n• 表面繁华未必真实 = Surface prosperity isn\'t necessarily real\n• 名牌大学的毕业生未必比其他人更优秀 = Elite university graduates aren\'t necessarily better\n\n**Structure 3 — 说不定 (open possibility, spoken):** (Subject) + 说不定 + sentence\n\nEx:\n• 说不定明天会下雨 = Who knows, it might rain tomorrow\n• 说不定他已经到了 = He may have already arrived\n• 试试看，说不定成功了呢 = Try it, who knows, you might succeed!\n• 你去问问他，说不定他知道 = Go ask him, he might know\n• 说不定这就是命运 = Who knows, this might be fate\n\n**Structure 4 — Common dialogue combos:**\n• A: 他一定会成功 → B: 不见得吧 ("not so sure")\n• A: 这次没戏了 → B: 说不定还有希望 ("who knows, maybe still hope")\n\n**Structure 5 — With 呢 (spoken emphasis particle):** 说不定 + sentence + 呢\n• 说不定他能帮我们呢! = Who knows, he might help us!\n\n**Position:** all three follow the subject and precede the verb/adjective. 说不定 can also open the sentence in TOPIC position.',
      commonMistakes: '❌ 说不定 dans une dissertation formelle ; ✅ Utiliser 未必 ou 或许. 说不定 = strictement ORAL.\n\n❌ 未必 dans une conversation casual ; ✅ Utiliser 不见得. 未必 sonne pompeux à table.\n\n❌ Confondre 说不定 avec 不一定 : 不一定 = « pas forcément » (neutre, factuel) ; 说不定 = « qui sait ! » (ouvert, positif, dynamique).\n\n❌ 不见得 + question directe (不见得吗 ?) ; ✅ 不见得 est un ADVERBE affirmatif de nuance, pas une interrogation.\n\n❌ 说不定 comme prédiction sombre (« 说不定 il va mourir ») ; ✅ 说不定 penche vers le positif ou le neutre. Pour une mauvaise prédiction, utiliser 恐怕.\n\n❌ 未必不 avec double négation lourde ; ✅ Possible mais rare. Préfère la version affirmative reformulée.\n\n❌ Réponse tranchée « 是的 » à 说不定 X 吗 (question inexistante) ; ✅ 说不定 n\'introduit pas de question, c\'est une SPÉCULATION.\n\n❌ Empiler « 也许说不定 » ; ✅ Choisir UN modal.',
      commonMistakesEn: '❌ 说不定 in a formal essay; ✅ Use 未必 or 或许. 说不定 = strictly SPOKEN.\n\n❌ 未必 in casual chat; ✅ Use 不见得. 未必 sounds pompous over dinner.\n\n❌ Confusing 说不定 with 不一定: 不一定 = "not necessarily" (neutral, factual); 说不定 = "who knows!" (open, positive, dynamic).\n\n❌ 不见得 + direct question (不见得吗?); ✅ 不见得 is an assertive nuance ADVERB, not an interrogative.\n\n❌ 说不定 for a dark prediction ("说不定 he\'ll die"); ✅ 说不定 leans positive or neutral. For a bad prediction, use 恐怕.\n\n❌ 未必不 with heavy double negation; ✅ Possible but rare. Prefer a rephrased affirmative version.\n\n❌ Blunt reply "是的" to 说不定 X (no question); ✅ 说不定 doesn\'t introduce a question, it\'s a SPECULATION.\n\n❌ Stacking "也许说不定"; ✅ Pick ONE modal.',
      tips: '💡 **Test rhétorique :** te sens-tu en train de CONTREDIRE quelqu\'un ? → 不见得/未必. Te sens-tu en train de LANCER une possibilité positive ? → 说不定.\n\n💡 **Registre matrix :**\n  • Casual oral : 不见得, 说不定\n  • Cultivé oral / mixte : 不见得, 未必\n  • Écrit formel / dissertation : 未必 (jamais 说不定)\n  • Éditorial / poésie : 未必\n\n💡 **Formules figées à retenir :**\n  • 未必如此 = « ce n\'est pas si simple »\n  • 说不定呢 (à l\'oral) = « qui sait ! »\n  • 不见得吧 (réplique) = « pas si sûr »\n\n💡 **Contraste 不见得 vs 不一定 :** 不一定 est PLUS NEUTRE (« ça ne veut pas dire »). 不见得 a un TON contrariant, argumentatif. Dans un débat philosophique, 不见得 est plus efficace.\n\n💡 **Combo pratique pour nuancer :** « X 是这样，但也不见得 Y » (X est ainsi, mais Y n\'est pas garanti). Structure typique de dissertation nuancée.\n\n💡 **Ne pas confondre 说不定 avec 不好说 :** 不好说 = « c\'est difficile à dire » (prudence face à l\'incertitude). 说不定 = « qui sait, peut-être bien ! » (ouverture positive).',
      tipsEn: '💡 **Rhetorical test:** do you feel like CONTRADICTING someone? → 不见得/未必. Do you feel like FLOATING a positive possibility? → 说不定.\n\n💡 **Register matrix:**\n  • Casual spoken: 不见得, 说不定\n  • Cultivated spoken / mixed: 不见得, 未必\n  • Formal writing / essay: 未必 (never 说不定)\n  • Editorial / poetry: 未必\n\n💡 **Frozen formulas to memorize:**\n  • 未必如此 = "it\'s not that simple"\n  • 说不定呢 (spoken) = "who knows!"\n  • 不见得吧 (retort) = "not so sure"\n\n💡 **不见得 vs 不一定 contrast:** 不一定 is MORE NEUTRAL ("doesn\'t necessarily mean"). 不见得 has a CONTRARIAN, argumentative tone. In a philosophical debate, 不见得 is more effective.\n\n💡 **Practical combo for nuance:** "X 是这样，但也不见得 Y" (X is so, but Y isn\'t guaranteed). Typical nuanced-essay structure.\n\n💡 **Don\'t confuse 说不定 with 不好说:** 不好说 = "hard to say" (cautious in the face of uncertainty). 说不定 = "who knows, maybe!" (positive opening).',
      relatedGrammar: ['grammar-epistemic-modality']
    },
    audio: 'audio/grammar/bujiande-weibi-shuobuding.wav',
    examples: [
      { hanzi: '便宜的不见得不好', pinyin: 'piányi de bùjiàndé bù hǎo', translation: 'Cheap doesn\'t necessarily mean bad', translationFr: 'Ce qui est bon marché n\'est pas forcément mauvais' },
      { hanzi: '他未必知道这件事', pinyin: 'tā wèibì zhīdào zhè jiàn shì', translation: 'He doesn\'t necessarily know about this', translationFr: 'Il n\'est pas forcément au courant de cette affaire' },
      { hanzi: '说不定我们会再见面', pinyin: 'shuōbudìng wǒmen huì zài jiànmiàn', translation: 'Who knows, maybe we\'ll meet again', translationFr: 'Qui sait, on se reverra peut-être' },
      { hanzi: '有钱人不见得幸福', pinyin: 'yǒuqián rén bùjiàndé xìngfú', translation: 'Rich people aren\'t necessarily happy', translationFr: 'Les riches ne sont pas forcément heureux' },
      { hanzi: '别灰心，说不定明天有好消息', pinyin: 'bié huīxīn, shuōbudìng míngtiān yǒu hǎo xiāoxi', translation: 'Don\'t lose heart, who knows, maybe good news tomorrow', translationFr: 'Ne perds pas courage, qui sait, il y aura peut-être de bonnes nouvelles demain' },
      { hanzi: '成功者未必都是天才', pinyin: 'chénggōng zhě wèibì dōu shì tiāncái', translation: 'Successful people aren\'t all necessarily geniuses', translationFr: 'Ceux qui réussissent ne sont pas tous des génies (registre soutenu)' },
      { hanzi: '你去问问她，说不定她还记得', pinyin: 'nǐ qù wènwen tā, shuōbudìng tā hái jìde', translation: 'Go ask her, she might still remember', translationFr: 'Va lui demander, elle s\'en souvient peut-être encore' }
    ],
    quiz: {
      prompt: '« Ce qui est cher n\'est pas forcément bon » utilise... ?',
      choices: ['一定', '不见得', '大概', '也许'],
      correctChoiceIndex: 1
    },
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '___明天会有好消息',
      translation: 'Peut-être bien qu\'il y aura de bonnes nouvelles demain (qui sait !)',
      translationEn: 'Who knows, maybe there will be good news tomorrow',
      choices: ['一定', '不见得', '说不定', '未必'],
      correctChoice: '说不定',
      explanation: '说不定 ouvre une possibilité inattendue à l\'oral, avec un ton vivant « qui sait ! ».',
      pinyin: '___ míngtiān huì yǒu hǎo xiāoxi'
    },
    tags: ['grammaire', 'modalité', 'nuance'],
    theme: 'grammar'
  }
];
