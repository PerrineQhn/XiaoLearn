/**
 * grammar-lessons-hsk2-modaux.ts — 5 fiches HSK2 : verbes modaux + adverbes clés
 * ------------------------------------------------------------------------------
 *   1. 想 (xiǎng)          — vouloir / avoir envie de
 *   2. 要 (yào)            — vouloir / falloir
 *   3. 能 vs 可以           — pouvoir (capacité) / être autorisé à
 *   4. 一点(儿) vs 有点儿    — « un peu » positif vs négatif
 *   5. 又 vs 再 vs 还        — « encore » (passé / futur / état continu)
 *
 * Chaque entrée respecte le shape `LessonItem` (grammarExplanation complet +
 * examples + quiz + grammarQuiz).
 */
import type { LessonItem } from '../types';

export const grammarLessonsHsk2Modaux: LessonItem[] = [
  // ============================================
  // HSK2 — 想 (vouloir / avoir envie de)
  // ============================================
  {
    id: 'grammar-modal-xiang',
    level: 'hsk2',
    hanzi: '想',
    pinyin: 'xiǎng',
    translation: 'want to / would like to',
    translationFr: 'vouloir / avoir envie de',
    category: 'grammaire',
    explanation: 'Le modal 想 (xiǎng) exprime un DÉSIR ou une INTENTION plus douce que 要. Il correspond au « I would like to » anglais.',
    grammarExplanation: {
      whenToUse: '**想** est le modal de désir doux, l\'un des plus polis. Registre neutre à familier, très fréquent à l\'oral (top 50). Trois sous-cas majeurs :\n\n**Sous-cas 1 : désir / souhait subjectif** — « avoir envie de »\n• 我想吃冰淇淋 = J\'ai envie d\'une glace\n• 你想去哪儿？ = Où as-tu envie d\'aller ?\n\n**Sous-cas 2 : intention souple, projet en réflexion**\n• 我想学中文 = Je pense apprendre le chinois (pas encore décidé)\n• 他想找一个新工作 = Il envisage de chercher un nouveau job\n\n**Sous-cas 3 : verbe autonome « penser / manquer »**\n• 我想你 = Tu me manques / je pense à toi\n• 我想我的父母 = Mes parents me manquent\n\n**Sous-cas 4 : cogitation / hypothèse** — « penser que »\n• 我想他不来 = Je pense qu\'il ne viendra pas\n• 你想想 = Réfléchis un peu\n\nTon : DOUX, POLI, propositionnel. Plus soft que 要 (ferme) ou 会 (certitude). Idéal pour formuler des envies, faire des suggestions, exprimer des rêves sans engagement fort.',
      whenToUseEn: '**想** is the soft-desire modal, one of the most polite. Neutral to familiar register, very common in speech (top 50). Three main sub-cases:\n\n**Case 1: subjective wish / desire** — "feel like"\n• 我想吃冰淇淋 = I feel like an ice cream\n• 你想去哪儿？ = Where do you feel like going?\n\n**Case 2: flexible intention, plan being considered**\n• 我想学中文 = I\'m thinking of learning Chinese (not yet decided)\n• 他想找一个新工作 = He\'s considering a new job\n\n**Case 3: standalone verb "to think / to miss"**\n• 我想你 = I miss you / I\'m thinking of you\n• 我想我的父母 = I miss my parents\n\n**Case 4: cogitation / hypothesis** — "to think that"\n• 我想他不来 = I think he\'s not coming\n• 你想想 = Think about it\n\nTone: SOFT, POLITE, propositional. Softer than 要 (firm) or 会 (certain). Ideal for wishes, suggestions, dreams without strong commitment.',
      howToUse: '**Structure 1 : Sujet + 想 + Verbe (+ Objet)** — modal principal\n• 我想去中国 (wǒ xiǎng qù Zhōngguó) = J\'ai envie d\'aller en Chine\n• 我想吃饺子 (wǒ xiǎng chī jiǎozi) = Je veux manger des raviolis\n• 他想学中文 (tā xiǎng xué Zhōngwén) = Il a envie d\'apprendre le chinois\n• 我想休息一下 = J\'ai envie de me reposer un peu\n• 你想喝什么？ = Qu\'est-ce que tu veux boire ?\n• 明天我想去公园 = Demain j\'ai envie d\'aller au parc\n\n**Structure 2 : négation** — Sujet + **不想** + Verbe\n• 我不想去 = Je n\'ai pas envie d\'y aller\n• 他不想吃 = Il ne veut pas manger\n• 我今天不想工作 = Aujourd\'hui je n\'ai pas envie de bosser\n\n**Structure 3 : question** — Sujet + 想...吗？ / 想不想 + Verbe ?\n• 你想去吗？ = Tu as envie d\'y aller ?\n• 你想不想吃火锅？ = Tu veux du hot pot, oui ou non ?\n\n**Structure 4 : verbe autonome (« penser / manquer »)**\n• 我想你 = Tu me manques\n• 我想家 = J\'ai le mal du pays\n• 你想什么？ = À quoi tu penses ?\n• 我想想 = Laisse-moi réfléchir (réduplication)\n\n**Structure 5 : renforcement** — 很想 / 特别想 / 真想\n• 我很想见你 = J\'ai vraiment envie de te voir\n• 我特别想吃火锅 = J\'ai super envie de manger du hot pot\n• 真想去旅行 = J\'ai tellement envie de voyager',
      howToUseEn: '**Structure 1: Subject + 想 + Verb (+ Object)** — main modal\n• 我想去中国 = I\'d like to go to China\n• 我想吃饺子 = I want to eat dumplings\n• 他想学中文 = He wants to learn Chinese\n• 我想休息一下 = I want to rest a bit\n• 你想喝什么？ = What do you want to drink?\n• 明天我想去公园 = Tomorrow I want to go to the park\n\n**Structure 2: negation** — Subject + **不想** + Verb\n• 我不想去 = I don\'t feel like going\n• 他不想吃 = He doesn\'t want to eat\n• 我今天不想工作 = I don\'t feel like working today\n\n**Structure 3: question** — Subject + 想...吗？ / 想不想 + Verb?\n• 你想去吗？ = Do you want to go?\n• 你想不想吃火锅？ = Do you want hot pot or not?\n\n**Structure 4: standalone verb ("to think / to miss")**\n• 我想你 = I miss you\n• 我想家 = I\'m homesick\n• 你想什么？ = What are you thinking of?\n• 我想想 = Let me think (reduplication)\n\n**Structure 5: intensification** — 很想 / 特别想 / 真想\n• 我很想见你 = I really want to see you\n• 我特别想吃火锅 = I really really want hot pot\n• 真想去旅行 = I really want to travel',
      commonMistakes: '❌ 我想去中国吗？(mauvaise place du 吗) ; ✅ 你想去中国吗？— le 吗 va TOUJOURS en fin de phrase, et « je » ne se pose pas la question à soi-même.\n\n❌ 我没想去 (calque du français « je n\'ai pas envie ») ; ✅ 我不想去 — la négation de 想 est TOUJOURS 不想 (jamais 没想).\n\n❌ 我想中国 (calque du français « je veux la Chine ») ; ✅ 我想去中国 — 想 + VERBE, il faut un verbe entre 想 et la destination.\n\n❌ 我想是学生 ; ✅ 我想当学生 OU 我想做学生 — pas de « je veux être X » avec 是 après 想 ; on utilise 当 ou 做.\n\n❌ Confondre 想 (envie) et 要 (volonté ferme) — dans un contexte poli, préférez 想.\n\n❌ 我想有钱 (calque bizarre) ; ✅ 我想赚钱 / 我想有钱 (rare, souvent 我想变有钱).\n\n❌ 想到 vs 想 — 想到 = « penser à qch » (soudain), 想 seul = désir / réflexion continue.',
      commonMistakesEn: '❌ 我想去中国吗？(wrong 吗 placement); ✅ 你想去中国吗？— 吗 ALWAYS goes at the end, and "I" doesn\'t ask itself the question.\n\n❌ 我没想去 (English calque "I didn\'t want to go"); ✅ 我不想去 — the negation of 想 is ALWAYS 不想 (never 没想).\n\n❌ 我想中国 (English calque "I want China"); ✅ 我想去中国 — 想 + VERB, need a verb between 想 and the destination.\n\n❌ 我想是学生; ✅ 我想当学生 OR 我想做学生 — no "I want to be X" with 是 after 想; use 当 or 做.\n\n❌ Confusing 想 (wish) with 要 (firm will) — in polite context prefer 想.\n\n❌ 我想有钱 (odd calque); ✅ 我想赚钱 / 我想有钱 (rare, often 我想变有钱).\n\n❌ 想到 vs 想 — 想到 = "to think of sth" (sudden), 想 alone = ongoing wish / reflection.',
      tips: '💡 **Mnémo hiérarchie** : dans les modaux de volonté, du plus DOUX au plus FERME :\n  想 (envie) < 要 (volonté) < 必须 (obligation forte)\n\n💡 **想 comme verbe seul** = « penser à / manquer » — ultra-fréquent dans les échanges affectifs :\n  • 我想你 = Tu me manques (le plus courant à distance)\n  • 我很想家 = J\'ai le mal du pays\n\n💡 **Réduplication 想想** = « réfléchir un peu » — ton doux, invite à cogiter :\n  • 你想想 = Réfléchis un peu\n  • 我想想 = Laisse-moi réfléchir\n\n💡 **Contraste avec 觉得** — les deux traduisent parfois « penser » :\n  • 我想他会来 = Je pense qu\'il viendra (opinion / prédiction)\n  • 我觉得他会来 = Je trouve / il me semble qu\'il viendra (sensation, avis)\n\n💡 **Question polie** : 你想...吗？est plus doux que 你要...吗？au restaurant, avec un invité, dans un cadre pro.\n\n💡 **Expressions figées** :\n  • 想办法 = trouver une solution\n  • 想不到 = ne pas s\'attendre à\n  • 想开点 = « prends du recul » (consolation)\n  • 想得美 = « tu rêves ! » (ironique)\n\n💡 **Prononciation** : xiǎng (3e ton). Souvent suivi d\'un verbe au ton neutre.',
      tipsEn: '💡 **Modal hierarchy mnemonic**: from softest to firmest volitional modals:\n  想 (wish) < 要 (will) < 必须 (strong obligation)\n\n💡 **想 as standalone verb** = "to think of / to miss" — very common in emotional exchanges:\n  • 我想你 = I miss you (most common at a distance)\n  • 我很想家 = I\'m very homesick\n\n💡 **Reduplication 想想** = "think a bit" — soft tone, invitation to consider:\n  • 你想想 = Think about it\n  • 我想想 = Let me think\n\n💡 **Contrast with 觉得** — both can translate "think":\n  • 我想他会来 = I think he\'ll come (opinion / prediction)\n  • 我觉得他会来 = It seems to me he\'ll come (feeling, view)\n\n💡 **Polite question**: 你想...吗？is softer than 你要...吗？at a restaurant, with a guest, in a pro setting.\n\n💡 **Fixed expressions**:\n  • 想办法 = find a solution\n  • 想不到 = not to expect\n  • 想开点 = "take some perspective" (comfort)\n  • 想得美 = "you wish!" (sarcastic)\n\n💡 **Pronunciation**: xiǎng (3rd tone). Often followed by a neutral-tone verb.',
      relatedGrammar: ['grammar-modal-yao', 'grammar-modal-hui']
    },
    audio: 'audio/grammar/grammar-modal-xiang.wav',
    examples: [
      { hanzi: '我想喝茶', pinyin: 'wǒ xiǎng hē chá', translation: 'I\'d like to drink tea', translationFr: 'J\'ai envie de boire du thé' },
      { hanzi: '你想去哪儿？', pinyin: 'nǐ xiǎng qù nǎr?', translation: 'Where would you like to go?', translationFr: 'Où as-tu envie d\'aller ?' },
      { hanzi: '他想学画画', pinyin: 'tā xiǎng xué huàhuà', translation: 'He\'d like to learn painting', translationFr: 'Il a envie d\'apprendre à peindre' },
      { hanzi: '我很想你', pinyin: 'wǒ hěn xiǎng nǐ', translation: 'I miss you a lot', translationFr: 'Tu me manques beaucoup' },
      { hanzi: '我不想去', pinyin: 'wǒ bù xiǎng qù', translation: 'I don\'t want to go', translationFr: 'Je n\'ai pas envie d\'y aller' },
      { hanzi: '你想不想吃火锅？', pinyin: 'nǐ xiǎng bu xiǎng chī huǒguō?', translation: 'Do you want to eat hot pot?', translationFr: 'Tu as envie de hot pot ?' }
    ],
    quiz: {
      prompt: 'Quel modal exprime « avoir envie de » (désir doux) ?',
      choices: ['会', '能', '想', '可以'],
      correctChoiceIndex: 2
    },
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '我___去看电影',
      translation: 'J\'ai envie d\'aller voir un film',
      translationEn: 'I want to go see a movie',
      choices: ['想', '会', '能', '可以'],
      correctChoice: '想',
      pinyin: 'wǒ ___ qù kàn diànyǐng',
      explanation: '想 exprime le désir / l\'envie, plus doux que 要.'
    },
    tags: ['grammaire', 'modal', 'désir', 'hsk2'],
    theme: 'grammar'
  },

  // ============================================
  // HSK2 — 要 (vouloir / falloir / futur imminent)
  // ============================================
  {
    id: 'grammar-modal-yao',
    level: 'hsk2',
    hanzi: '要',
    pinyin: 'yào',
    translation: 'want / need / must / will soon',
    translationFr: 'vouloir / falloir',
    category: 'grammaire',
    explanation: '要 (yào) fonctionne comme modal ET comme verbe autonome. Il exprime une volonté ferme, un besoin, un futur imminent ou une obligation.',
    grammarExplanation: {
      whenToUse: '**要** est un « couteau suisse » : à la fois modal ET verbe autonome. Registre neutre, ultra-fréquent (top 30). Beaucoup plus FERME et engagé que 想. Cinq grands sous-cas :\n\n**Sous-cas 1 : volonté FERME / décision prise** — « je VEUX X »\n• 我要一杯咖啡 = Je veux (je prends) un café — décidé, engagé\n• 我要买这个 = Je vais acheter ça\n\n**Sous-cas 2 : verbe autonome, demande / commande (restau, magasin)**\n• 你要什么？ = Vous prenez quoi ?\n• 我要这个 = Je prends celui-ci\n\n**Sous-cas 3 : futur planifié / imminent** — « aller faire / bientôt »\n• 我明天要去北京 = Demain je vais à Pékin (planifié)\n• 快要下雨了 = Il va bientôt pleuvoir\n\n**Sous-cas 4 : obligation / conseil** — « il faut / tu dois »\n• 你要小心 = Tu dois faire attention\n• 学中文要努力 = Pour apprendre le chinois il faut être appliqué\n\n**Sous-cas 5 : besoin objectif** — « avoir besoin de »\n• 学画画要天赋 = Pour apprendre à peindre il faut du talent\n• 这个要多少钱？ = Combien ça coûte ? (litt. « ça demande combien ? »)\n\nRegistre : neutre, universel. Fondamental en commerce et dans les instructions.',
      whenToUseEn: '**要** is a "Swiss army knife": both modal AND standalone verb. Neutral register, extremely common (top 30). Much FIRMER and more committed than 想. Five main sub-cases:\n\n**Case 1: FIRM will / decision made** — "I WANT X"\n• 我要一杯咖啡 = I want (I\'ll take) a coffee — decided, committed\n• 我要买这个 = I\'m buying this\n\n**Case 2: standalone verb, ordering / requesting (restaurant, shop)**\n• 你要什么？ = What will you have?\n• 我要这个 = I\'ll take this one\n\n**Case 3: planned / imminent future** — "going to do / soon"\n• 我明天要去北京 = Tomorrow I\'m going to Beijing (planned)\n• 快要下雨了 = It\'s about to rain\n\n**Case 4: obligation / advice** — "must / should"\n• 你要小心 = You must be careful\n• 学中文要努力 = Learning Chinese requires effort\n\n**Case 5: objective need** — "to require"\n• 学画画要天赋 = Learning painting requires talent\n• 这个要多少钱？ = How much does it cost? (lit. "how much does it require?")\n\nRegister: neutral, universal. Fundamental in commerce and instructions.',
      howToUse: '**Structure 1 : MODAL — Sujet + 要 + Verbe**\n• 我要走了 (wǒ yào zǒu le) = Je vais partir (imminent)\n• 你要小心 (nǐ yào xiǎoxīn) = Tu dois faire attention\n• 我明天要去上海 = Demain je vais à Shanghai (décidé)\n• 学中文要每天练习 = Pour apprendre le chinois il faut s\'entraîner chaque jour\n\n**Structure 2 : VERBE AUTONOME — Sujet + 要 + Objet** (au restau, magasin)\n• 我要一杯茶 (wǒ yào yì bēi chá) = Je voudrais un thé\n• 他要那本书 = Il veut ce livre-là\n• 你要几个？ = Tu en veux combien ?\n• 我要两碗米饭 = Je prends deux bols de riz\n\n**Structure 3 : IMMINENCE — 快要 + Verbe + 了 / 就要 + Verbe + 了**\n• 快要下雨了 = Il va bientôt pleuvoir\n• 火车就要开了 = Le train va partir dans une minute\n• 我要走了 = Je m\'en vais\n\n**Structure 4 : NÉGATIONS différentes selon le sens**\n• « ne pas vouloir » : Sujet + **不要** + Objet → 我不要 = Je n\'en veux pas\n• INTERDICTION : **不要** + Verbe → 不要说话！ = Ne parle pas !\n• « pas besoin de » : Sujet + **不用** + Verbe → 你不用来 = Tu n\'as pas besoin de venir (JAMAIS 不要来 qui signifie « ne viens pas ! »)\n\n**Structure 5 : question**\n• 你要吗？ = Tu en veux ?\n• 你要不要来？ = Tu viens ou pas ?\n• 我们要不要走？ = On y va ?',
      howToUseEn: '**Structure 1: MODAL — Subject + 要 + Verb**\n• 我要走了 = I\'m about to leave (imminent)\n• 你要小心 = You must be careful\n• 我明天要去上海 = Tomorrow I\'m going to Shanghai (decided)\n• 学中文要每天练习 = Learning Chinese requires daily practice\n\n**Structure 2: STANDALONE VERB — Subject + 要 + Object** (restaurant, shop)\n• 我要一杯茶 = I\'d like a cup of tea\n• 他要那本书 = He wants that book\n• 你要几个？ = How many do you want?\n• 我要两碗米饭 = I\'ll take two bowls of rice\n\n**Structure 3: IMMINENCE — 快要 + Verb + 了 / 就要 + Verb + 了**\n• 快要下雨了 = It\'s about to rain\n• 火车就要开了 = The train is about to leave\n• 我要走了 = I\'m off\n\n**Structure 4: DIFFERENT NEGATIONS by meaning**\n• "don\'t want": Subject + **不要** + Object → 我不要 = I don\'t want it\n• PROHIBITION: **不要** + Verb → 不要说话！= Don\'t speak!\n• "no need to": Subject + **不用** + Verb → 你不用来 = You don\'t need to come (NEVER 不要来 which means "don\'t come!")\n\n**Structure 5: question**\n• 你要吗？ = Do you want?\n• 你要不要来？ = Are you coming or not?\n• 我们要不要走？ = Shall we go?',
      commonMistakes: '❌ 你不要来 (voulu : « tu n\'as pas besoin de venir ») ; ✅ 你不用来 — **不要 + Verbe = INTERDICTION** (« ne viens pas ! »), pas « pas besoin ». Piège majeur.\n\n❌ 我要中国 (calque du français « je veux la Chine ») ; ✅ 我要去中国 — 要 + VERBE pour aller quelque part.\n\n❌ Confondre 要 (ferme) et 想 (envie) — au restau avec un client important, préférez 想 (plus poli). Entre amis / commande vite, 要 est OK.\n\n❌ 我很要 (calque du français « je le veux beaucoup ») ; ✅ 我很想要 OU 我特别想要 — 要 seul ne prend pas 很 devant.\n\n❌ 明天我要下雨 (calque bizarre) ; ✅ 明天要下雨 — 要 en futur/imminence n\'a pas besoin de sujet humain.\n\n❌ 我没要 (calque du passé) ; ✅ 我不要 (présent) OU 我没(有)要 (rare, pour insister « je n\'ai pas demandé »).\n\n❌ Confondre 要 (besoin, décision) et 需要 (besoin objectif, plus formel) : 我需要休息 sonne plus formel que 我要休息.',
      commonMistakesEn: '❌ 你不要来 (intended: "you don\'t need to come"); ✅ 你不用来 — **不要 + Verb = PROHIBITION** ("don\'t come!"), not "no need". Major pitfall.\n\n❌ 我要中国 (English calque "I want China"); ✅ 我要去中国 — 要 + VERB to go somewhere.\n\n❌ Confusing 要 (firm) with 想 (wish) — at a restaurant with an important guest, prefer 想 (more polite). Between friends / quick orders, 要 is fine.\n\n❌ 我很要 (English calque "I really want"); ✅ 我很想要 OR 我特别想要 — 要 alone doesn\'t take 很.\n\n❌ 明天我要下雨 (odd calque); ✅ 明天要下雨 — 要 for future/imminence doesn\'t need a human subject.\n\n❌ 我没要 (past calque); ✅ 我不要 (present) OR 我没(有)要 (rare, insisting "I didn\'t ask for it").\n\n❌ Confusing 要 (need, decision) with 需要 (objective need, more formal): 我需要休息 sounds more formal than 我要休息.',
      tips: '💡 **Piège CRITIQUE : 不要 a DEUX sens**\n  • **不要 + Nom** = « ne pas vouloir » → 我不要 (je n\'en veux pas)\n  • **不要 + Verbe** = INTERDICTION → 不要说话！ (ne parle pas !)\n  Pour « pas besoin de » → **不用** + Verbe.\n\n💡 **Hiérarchie des modaux de volonté** :\n  想 (envie douce) < 要 (volonté ferme) < 必须 (obligation)\n\n💡 **要 marque le futur planifié** : 我明天要考试 = J\'ai un exam demain (planifié). Différent de 会 (probabilité) et de 想 (envie).\n\n💡 **Imminence — les 3 structures parallèles** :\n  • 快要...了 = ça arrive vite\n  • 就要...了 = ça arrive très vite (parfois avec moment précis)\n  • 要...了 = ça arrive (le plus léger)\n\n💡 **Expressions figées** :\n  • 要不然 (yàoburán) = sinon\n  • 要是 (yàoshì) = si (conditionnel)\n  • 只要 (zhǐyào) = du moment que\n  • 不要紧 (bú yàojǐn) = ce n\'est pas grave\n\n💡 **要 au restau/magasin** = LE verbe standard :\n  • 你要什么？ = Vous prenez quoi ?\n  • 我要这个和那个 = Je prends celui-ci et celui-là.\n  Plus direct que 想 (qui sonne trop poli / hésitant).\n\n💡 **Prononciation** : yào (4e ton). Un des mots les plus utilisés au quotidien.',
      tipsEn: '💡 **CRITICAL trap: 不要 has TWO meanings**\n  • **不要 + Noun** = "don\'t want" → 我不要 (I don\'t want it)\n  • **不要 + Verb** = PROHIBITION → 不要说话！ (don\'t speak!)\n  For "no need to" → **不用** + Verb.\n\n💡 **Volitional modal hierarchy**:\n  想 (soft wish) < 要 (firm will) < 必须 (obligation)\n\n💡 **要 marks planned future**: 我明天要考试 = I have an exam tomorrow (planned). Different from 会 (probability) and 想 (wish).\n\n💡 **Imminence — three parallel structures**:\n  • 快要...了 = coming fast\n  • 就要...了 = coming very fast (sometimes with precise time)\n  • 要...了 = about to (lightest)\n\n💡 **Fixed expressions**:\n  • 要不然 = otherwise\n  • 要是 = if (conditional)\n  • 只要 = as long as\n  • 不要紧 = it doesn\'t matter\n\n💡 **要 at restaurants/shops** = THE standard verb:\n  • 你要什么？ = What will you have?\n  • 我要这个和那个 = I\'ll take this and that.\n  More direct than 想 (which sounds too polite / hesitant).\n\n💡 **Pronunciation**: yào (4th tone). One of the most common daily words.',
      relatedGrammar: ['grammar-modal-xiang', 'grammar-negation-bu', 'grammar-kuai-le-imminence']
    },
    audio: 'audio/grammar/grammar-modal-yao.wav',
    examples: [
      { hanzi: '我要一杯咖啡', pinyin: 'wǒ yào yì bēi kāfēi', translation: 'I want a cup of coffee', translationFr: 'Je voudrais un café' },
      { hanzi: '你要小心', pinyin: 'nǐ yào xiǎoxīn', translation: 'You must be careful', translationFr: 'Tu dois faire attention' },
      { hanzi: '他要走了', pinyin: 'tā yào zǒu le', translation: 'He\'s about to leave', translationFr: 'Il est sur le point de partir' },
      { hanzi: '不要说话！', pinyin: 'bú yào shuōhuà!', translation: 'Don\'t speak!', translationFr: 'Ne parlez pas !' },
      { hanzi: '你不用来', pinyin: 'nǐ bú yòng lái', translation: 'You don\'t need to come', translationFr: 'Tu n\'as pas besoin de venir' },
      { hanzi: '明天我要去北京', pinyin: 'míngtiān wǒ yào qù Běijīng', translation: 'Tomorrow I\'m going to Beijing', translationFr: 'Demain je vais à Pékin' }
    ],
    quiz: {
      prompt: 'Quel modal exprime une volonté FERME ou une commande ?',
      choices: ['想', '会', '要', '能'],
      correctChoiceIndex: 2
    },
    grammarQuiz: {
      type: 'translation-to-chinese',
      translation: 'Je voudrais une tasse de café',
      translationEn: 'I want a cup of coffee',
      correctAnswer: '我要一杯咖啡',
      pinyin: 'wǒ yào yì bēi kāfēi',
      choices: ['我要一杯咖啡', '我想一杯咖啡', '我会一杯咖啡', '我能一杯咖啡']
    },
    tags: ['grammaire', 'modal', 'volonté', 'hsk2'],
    theme: 'grammar'
  },

  // ============================================
  // HSK2 — 能 vs 可以 (pouvoir / permission)
  // ============================================
  {
    id: 'grammar-modal-neng-keyi',
    level: 'hsk2',
    hanzi: '能 / 可以',
    pinyin: 'néng / kěyǐ',
    translation: 'can (capacity) / may (permission)',
    translationFr: 'pouvoir (capacité) / être autorisé à',
    category: 'grammaire',
    explanation: 'Deux modaux traduisent « pouvoir ». 能 (néng) = capacité physique / circonstancielle. 可以 (kěyǐ) = permission ou possibilité neutre. Souvent interchangeables mais avec des nuances clés.',
    grammarExplanation: {
      whenToUse: '**能** et **可以** couvrent tous les deux le champ de « pouvoir » (français) / « can, may » (anglais). Ils se chevauchent souvent, mais chacun a une zone de prédilection. Il faut ajouter à ce trio **会** pour la capacité APPRISE. Registre : neutre, très fréquent (HSK2 essentiel).\n\n**能 (néng)** — capacité PHYSIQUE / CIRCONSTANCIELLE :\n• Sous-cas 1 : capacité maintenant (en fonction du contexte)\n  → 我今天能来 = Je peux venir aujourd\'hui (j\'ai le temps)\n• Sous-cas 2 : capacité physique brute\n  → 他能跑十公里 = Il peut courir 10 km (endurance)\n• Sous-cas 3 : possibilité factuelle\n  → 这里能停车吗？ = Peut-on se garer ici ? (est-ce possible ?)\n• Sous-cas 4 : négation forte / interdiction\n  → 你不能这样做 = Tu ne peux pas faire ça (fort)\n\n**可以 (kěyǐ)** — PERMISSION / possibilité SOCIALE :\n• Sous-cas 1 : demande polie de permission\n  → 我可以进来吗？ = Puis-je entrer ?\n• Sous-cas 2 : autorisation accordée\n  → 你可以走了 = Tu peux partir (je t\'y autorise)\n• Sous-cas 3 : suggestion / possibilité neutre\n  → 我们可以试试 = On peut essayer\n• Sous-cas 4 : évaluation « pas mal »\n  → 他中文可以 = Son chinois est correct\n\nZone de chevauchement importante : « 我今天能来 » et « 我今天可以来 » sont tous deux acceptables.',
      whenToUseEn: '**能** and **可以** both cover "can, may". They overlap often but each has a preferred zone. Add **会** for LEARNED ability. Register: neutral, very common (HSK2 essential).\n\n**能 (néng)** — PHYSICAL / CIRCUMSTANTIAL ability:\n• Case 1: capacity right now (context-dependent)\n  → 我今天能来 = I can come today (I have time)\n• Case 2: raw physical ability\n  → 他能跑十公里 = He can run 10 km (endurance)\n• Case 3: factual possibility\n  → 这里能停车吗？ = Can we park here? (is it possible?)\n• Case 4: strong negation / prohibition\n  → 你不能这样做 = You can\'t do this (strong)\n\n**可以 (kěyǐ)** — PERMISSION / SOCIAL possibility:\n• Case 1: polite request for permission\n  → 我可以进来吗？ = May I come in?\n• Case 2: granted authorization\n  → 你可以走了 = You may go (I authorize it)\n• Case 3: neutral suggestion / possibility\n  → 我们可以试试 = We can try\n• Case 4: "not bad" evaluation\n  → 他中文可以 = His Chinese is OK\n\nSignificant overlap: "我今天能来" and "我今天可以来" are both acceptable.',
      howToUse: '**Structure de base : Sujet + 能/可以 + Verbe (+ Objet)**\n\n**Exemples avec 能 (capacité)** :\n• 我今天能来 = Je peux venir aujourd\'hui (contexte permet)\n• 他能跑十公里 = Il peut courir 10 km (capacité physique)\n• 一天能学多少个汉字？ = Combien de caractères peut-on apprendre en un jour ?\n• 我能听懂 = Je peux comprendre (à l\'oreille)\n• 你能帮我吗？ = Peux-tu m\'aider ? (demande, un peu directe)\n\n**Exemples avec 可以 (permission / suggestion)** :\n• 我可以进来吗？ = Puis-je entrer ? (permission)\n• 你可以走了 = Tu peux partir (autorisation)\n• 你可以试试这个 = Tu peux essayer ça (suggestion)\n• 这里可以拍照吗？ = On peut prendre des photos ici ?\n• 我可以借你的书吗？ = Est-ce que je peux emprunter ton livre ?\n\n**Négations — attention aux nuances !**\n• 不能 = incapable OU fortement interdit\n  → 我不能吃辣 = Je ne peux pas manger épicé (allergie / limite)\n  → 你不能进去 = Tu ne peux/dois pas entrer (fort)\n• 不可以 = pas autorisé (règle sociale, moins fort)\n  → 这里不可以吸烟 = On ne peut pas fumer ici (règle)\n\n**Question 可以吗 / 能不能** :\n• 我可以试试吗？ = Je peux essayer ?\n• 你能不能来？ = Tu peux venir ou pas ?\n• 能不能 est plus insistant que 可以吗\n\n**Comparaison avec 会** — capacité APPRISE :\n• 我会说中文 = Je sais parler chinois (appris)\n• 我能说三种语言 = Je peux parler trois langues (capable maintenant)\n• Ne pas confondre : 会 = appris ; 能 = capable ; 可以 = autorisé',
      howToUseEn: '**Basic structure: Subject + 能/可以 + Verb (+ Object)**\n\n**Examples with 能 (capacity)**:\n• 我今天能来 = I can come today (context allows)\n• 他能跑十公里 = He can run 10 km (physical ability)\n• 一天能学多少个汉字？ = How many characters can one learn in a day?\n• 我能听懂 = I can understand (by ear)\n• 你能帮我吗？ = Can you help me? (a bit direct)\n\n**Examples with 可以 (permission / suggestion)**:\n• 我可以进来吗？ = May I come in?\n• 你可以走了 = You may go\n• 你可以试试这个 = You can try this (suggestion)\n• 这里可以拍照吗？ = Can I take photos here?\n• 我可以借你的书吗？ = May I borrow your book?\n\n**Negations — watch the nuances!**\n• 不能 = incapable OR strongly forbidden\n  → 我不能吃辣 = I can\'t eat spicy (allergy / limit)\n  → 你不能进去 = You can\'t/mustn\'t enter (strong)\n• 不可以 = not allowed (social rule, milder)\n  → 这里不可以吸烟 = No smoking here (rule)\n\n**Question 可以吗 / 能不能**:\n• 我可以试试吗？ = Can I try?\n• 你能不能来？ = Can you come or not?\n• 能不能 is more insistent than 可以吗\n\n**Comparison with 会** — LEARNED ability:\n• 我会说中文 = I can speak Chinese (learned)\n• 我能说三种语言 = I can speak three languages (able now)\n• Don\'t confuse: 会 = learned; 能 = able; 可以 = allowed',
      commonMistakes: '❌ 我能中文 (calque « je peux le chinois ») ; ✅ 我会中文 OU 我能说中文 — pour une compétence LINGUISTIQUE, on utilise 会 (appris). 能 seul sans verbe ne va pas.\n\n❌ Confondre 会 (appris), 能 (capable maintenant), 可以 (autorisé) :\n  • 我会开车 = J\'ai appris à conduire (permis)\n  • 我今天不能开车 = Aujourd\'hui je ne peux pas conduire (fatigué, bu)\n  • 这里可以开车吗？ = Peut-on conduire ici ? (permis, autorisation)\n\n❌ 我可以跑十公里 (calque de capacité physique) ; ✅ 我能跑十公里 — pour une capacité physique brute, préférez 能.\n\n❌ 你不要进 (voulu : « tu ne peux pas entrer ») ; ✅ 你不能进 OU 你不可以进 — 不要 = interdiction directe (ne fais pas !), 不能/不可以 = pas autorisé.\n\n❌ 你能进来吗？(pour demander poliment « puis-je entrer ? ») ; ✅ 我可以进来吗？— 可以 est PLUS POLI pour la permission, 能 sonne plus utilitaire.\n\n❌ 我能中文很好 ; ✅ 我中文很好 OU 我中文不错 — 能 ne va pas avec une évaluation.\n\n❌ 昨天我能去 (pour passé) ; ✅ 昨天我可以去 OU 昨天我去了 — 能 au passé est souvent remplacé par 可以 ou reformulé.',
      commonMistakesEn: '❌ 我能中文 (calque "I can Chinese"); ✅ 我会中文 OR 我能说中文 — for a LANGUAGE skill, use 会 (learned). 能 alone without verb doesn\'t work.\n\n❌ Confusing 会 (learned), 能 (able now), 可以 (allowed):\n  • 我会开车 = I know how to drive (have licence)\n  • 我今天不能开车 = I can\'t drive today (tired, drunk)\n  • 这里可以开车吗？ = Can we drive here? (allowed)\n\n❌ 我可以跑十公里 (calque of physical ability); ✅ 我能跑十公里 — for raw physical ability, prefer 能.\n\n❌ 你不要进 (intended "you can\'t come in"); ✅ 你不能进 OR 你不可以进 — 不要 = direct prohibition (don\'t!), 不能/不可以 = not allowed.\n\n❌ 你能进来吗？(to politely ask "may I come in?"); ✅ 我可以进来吗？— 可以 is MORE POLITE for permission, 能 sounds more utilitarian.\n\n❌ 我能中文很好; ✅ 我中文很好 OR 我中文不错 — 能 doesn\'t go with an evaluation.\n\n❌ 昨天我能去 (for past); ✅ 昨天我可以去 OR 昨天我去了 — 能 in the past is often replaced by 可以 or reformulated.',
      tips: '💡 **Trio à retenir** — dans l\'ordre chronologique :\n  1. **会** = as-tu APPRIS ? (savoir-faire acquis)\n  2. **能** = as-tu la CAPACITÉ MAINTENANT ? (contexte, physique)\n  3. **可以** = as-tu la PERMISSION ? (autorisation, règle)\n\n💡 **Exemple filé** :\n  • 我会游泳 (j\'ai appris à nager)\n  • 我今天不能游泳 (trop fatigué aujourd\'hui)\n  • 这里可以游泳吗？ (est-ce autorisé ici ?)\n\n💡 **Registre poli** — pour demander UNE PERMISSION à un supérieur / inconnu, préférez 可以 :\n  • 我可以问一个问题吗？ = Puis-je poser une question ?\n  • 请问我可以... ？ = Excusez-moi, puis-je... ?\n\n💡 **能 = capacité brute** est plus fréquent pour :\n  • Sports / performances physiques\n  • Circonstances (temps, énergie)\n  • Possibilité factuelle (« ça marche »)\n\n💡 **Négations à contraster** :\n  • 不能 = interdit / impossible (fort)\n  • 不可以 = pas autorisé (règle, moins fort)\n  • 不会 = ne sait pas / peu probable\n  • 不用 = pas besoin\n\n💡 **可以 tout seul** = « ça va, c\'est bon » (réponse affirmative)\n  • Q : 我们六点走？ R : 可以 = OK, très bien.\n\n💡 **Expressions figées** :\n  • 可不可以 = équivalent à 可以吗\n  • 不可以 = ferme mais poli\n  • 能干 (nénggàn) = capable, compétent (adjectif)\n  • 不能不 = double négation = obligation forte',
      tipsEn: '💡 **Trio to memorise** — in chronological order:\n  1. **会** = did you LEARN? (acquired skill)\n  2. **能** = do you have the CAPACITY NOW? (context, physical)\n  3. **可以** = do you have PERMISSION? (authorization, rule)\n\n💡 **Full example**:\n  • 我会游泳 (I learned to swim)\n  • 我今天不能游泳 (too tired today)\n  • 这里可以游泳吗？ (is it allowed here?)\n\n💡 **Polite register** — to ask PERMISSION from a superior / stranger, prefer 可以:\n  • 我可以问一个问题吗？ = May I ask a question?\n  • 请问我可以... ？ = Excuse me, may I...?\n\n💡 **能 = raw capacity** is more common for:\n  • Sports / physical performances\n  • Circumstances (time, energy)\n  • Factual possibility ("it works")\n\n💡 **Negations to contrast**:\n  • 不能 = forbidden / impossible (strong)\n  • 不可以 = not allowed (rule, milder)\n  • 不会 = doesn\'t know / unlikely\n  • 不用 = no need\n\n💡 **可以 alone** = "OK, fine" (affirmative answer)\n  • Q: 我们六点走？ A: 可以 = OK, fine.\n\n💡 **Fixed expressions**:\n  • 可不可以 = equivalent to 可以吗\n  • 不可以 = firm but polite\n  • 能干 (nénggàn) = capable, competent (adjective)\n  • 不能不 = double negative = strong obligation',
      relatedGrammar: ['grammar-modal-hui', 'grammar-modal-xiang']
    },
    audio: 'audio/grammar/grammar-modal-neng-keyi.wav',
    examples: [
      { hanzi: '我明天能来', pinyin: 'wǒ míngtiān néng lái', translation: 'I can come tomorrow', translationFr: 'Je peux venir demain' },
      { hanzi: '你可以借我的书', pinyin: 'nǐ kěyǐ jiè wǒ de shū', translation: 'You may borrow my book', translationFr: 'Tu peux emprunter mon livre' },
      { hanzi: '我不能吃辣的', pinyin: 'wǒ bù néng chī là de', translation: 'I can\'t eat spicy food', translationFr: 'Je ne peux pas manger épicé' },
      { hanzi: '这里可以拍照吗？', pinyin: 'zhèli kěyǐ pāizhào ma?', translation: 'Can I take photos here?', translationFr: 'On peut prendre des photos ici ?' },
      { hanzi: '他能跑二十公里', pinyin: 'tā néng pǎo èrshí gōnglǐ', translation: 'He can run 20 km', translationFr: 'Il peut courir 20 km' },
      { hanzi: '我可以试试吗？', pinyin: 'wǒ kěyǐ shì shi ma?', translation: 'May I try?', translationFr: 'Je peux essayer ?' }
    ],
    quiz: {
      prompt: 'Pour demander une permission polie, on utilise...',
      choices: ['会', '能', '可以', '想'],
      correctChoiceIndex: 2
    },
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '请问，我___进来吗？',
      translation: 'Excusez-moi, puis-je entrer ?',
      translationEn: 'Excuse me, may I come in?',
      choices: ['会', '能', '可以', '想'],
      correctChoice: '可以',
      pinyin: 'qǐngwèn, wǒ ___ jìnlái ma?',
      explanation: '可以 est le meilleur choix pour demander une PERMISSION polie.'
    },
    tags: ['grammaire', 'modal', 'permission', 'capacité', 'hsk2'],
    theme: 'grammar'
  },

  // ============================================
  // HSK2 — 一点(儿) vs 有(一)点儿
  // ============================================
  {
    id: 'grammar-yidian-vs-youdian',
    level: 'hsk2',
    hanzi: '一点(儿) / 有点儿',
    pinyin: 'yìdiǎnr / yǒudiǎnr',
    translation: '"a little": positive (一点) vs negative (有点儿)',
    translationFr: '« un peu » : positif (一点) vs négatif (有点儿)',
    category: 'grammaire',
    explanation: 'Deux « un peu » aux positions et significations différentes. 一点(儿) se place APRÈS le mot (sens neutre / comparatif). 有(一)点儿 se place AVANT l\'adjectif (sens souvent NÉGATIF ou déplaisant).',
    grammarExplanation: {
      whenToUse: 'Le chinois distingue **一点儿** et **有点儿** — deux « un peu » qui ne s\'échangent PAS. Un piège majeur HSK2 pour francophones : le français « un peu » couvre les deux. Registre : oral surtout, 儿 optionnel au sud. Fréquence : ultra-fréquent.\n\n**一点儿 (yìdiǎnr)** — QUANTITÉ ou COMPARATIF, ton NEUTRE :\n• Sous-cas 1 : après un ADJ comparatif = « un peu plus X »\n  → 大一点儿 = un peu plus grand\n  → 便宜一点儿 = un peu moins cher\n• Sous-cas 2 : quantité minimale d\'un nom = « un peu de X »\n  → 我要一点儿水 = Je veux un peu d\'eau\n• Sous-cas 3 : après un verbe = « faire un peu de X »\n  → 说一点儿中文 = parler un peu chinois\n• Sous-cas 4 : demande polie de modération\n  → 慢一点儿 = un peu plus lentement\n  → 大点声 = un peu plus fort\n\n**有点儿 (yǒudiǎnr)** — ADVERBE de degré léger, ton souvent NÉGATIF :\n• Sous-cas 1 : avant un ADJ à connotation négative / déplaisant\n  → 有点儿累 = un peu fatigué\n  → 有点儿贵 = un peu cher\n• Sous-cas 2 : sensations désagréables\n  → 有点儿冷 / 有点儿饿 / 有点儿难 = un peu froid/faim/difficile\n• Sous-cas 3 : hésitation, réserve subjective\n  → 有点儿奇怪 = un peu bizarre\n• Sous-cas 4 : rare avec adj. positif (mais possible, avec ironie)\n\nRegistre : oral, 儿 typiquement pékinois. Au sud, on entend 一点 / 有点 sans 儿.',
      whenToUseEn: 'Chinese distinguishes **一点儿** and **有点儿** — two "a little" that DON\'T swap. Major HSK2 trap for English speakers: English "a little" covers both. Register: mainly spoken, 儿 optional in the south. Extremely frequent.\n\n**一点儿 (yìdiǎnr)** — QUANTITY or COMPARATIVE, NEUTRAL tone:\n• Case 1: after a comparative ADJ = "a bit more X"\n  → 大一点儿 = a bit bigger\n  → 便宜一点儿 = a bit cheaper\n• Case 2: minimum quantity of a noun = "a little X"\n  → 我要一点儿水 = I want a little water\n• Case 3: after a verb = "do a little X"\n  → 说一点儿中文 = speak a little Chinese\n• Case 4: polite request for moderation\n  → 慢一点儿 = a bit slower\n  → 大点声 = a bit louder\n\n**有点儿 (yǒudiǎnr)** — light-degree ADVERB, often NEGATIVE tone:\n• Case 1: before an ADJ with negative connotation\n  → 有点儿累 = a bit tired\n  → 有点儿贵 = a bit expensive\n• Case 2: unpleasant sensations\n  → 有点儿冷 / 有点儿饿 / 有点儿难 = a bit cold/hungry/hard\n• Case 3: hesitation, subjective reserve\n  → 有点儿奇怪 = a bit odd\n• Case 4: rare with positive adj (possible with irony)\n\nRegister: spoken, 儿 typically Beijing. In the south you hear 一点 / 有点 without 儿.',
      howToUse: '**Structure 1 : 一点儿 — POSITION APRÈS l\'ADJ / le VERBE**\n\n**1a. Adjectif + 一点儿** (comparatif implicite)\n• 大一点儿 (dà yìdiǎnr) = un peu plus grand\n• 便宜一点儿 (piányi yìdiǎnr) = un peu moins cher\n• 快一点儿 = un peu plus vite\n• 好一点儿 = un peu mieux\n\n**1b. Verbe + 一点儿** (petite quantité d\'action)\n• 说慢一点儿 = parle un peu plus lentement\n• 吃一点儿 = manger un peu\n• 睡一点儿 = dormir un peu\n\n**1c. 一点儿 + Nom** (quantité minimale)\n• 我要一点儿水 = Je veux un peu d\'eau\n• 有一点儿钱 = Un peu d\'argent\n• 我会一点儿中文 = Je parle un peu chinois\n\n**Structure 2 : 有(一)点儿 — POSITION AVANT l\'ADJ**\n\n**2a. Sujet + 有点儿 + Adjectif (négatif)**\n• 这个有点儿贵 = C\'est un peu cher (déplaisant)\n• 我有点儿累 = Je suis un peu fatigué\n• 今天有点儿冷 = Il fait un peu froid aujourd\'hui\n• 这个菜有点儿咸 = Ce plat est un peu salé\n• 他有点儿不高兴 = Il est un peu contrarié\n\n**2b. 有点儿 + Verbe d\'état** (rare mais possible)\n• 有点儿想家 = J\'ai un peu le mal du pays\n• 有点儿担心 = Un peu inquiet\n\n**Structure 3 : combinaison des deux (attention !)**\n• 你能不能便宜一点儿？(commercial : « un peu moins cher ? ») + 太贵了，有点儿贵 (« c\'est un peu cher »)\n\n**Structure 4 : demande polie**\n• Sujet + Verbe + Adj + **一点儿** — pour demander poliment\n• 请说慢一点儿 = Parlez un peu plus lentement s\'il vous plaît\n• 便宜一点儿吧 = Faites un peu moins cher\n• 早一点儿来 = Viens un peu plus tôt',
      howToUseEn: '**Structure 1: 一点儿 — POSITION AFTER the ADJ / VERB**\n\n**1a. Adjective + 一点儿** (implicit comparative)\n• 大一点儿 = a bit bigger\n• 便宜一点儿 = a bit cheaper\n• 快一点儿 = a bit faster\n• 好一点儿 = a bit better\n\n**1b. Verb + 一点儿** (small quantity of action)\n• 说慢一点儿 = speak a bit slower\n• 吃一点儿 = eat a little\n• 睡一点儿 = sleep a little\n\n**1c. 一点儿 + Noun** (minimum quantity)\n• 我要一点儿水 = I want a little water\n• 有一点儿钱 = a bit of money\n• 我会一点儿中文 = I speak a little Chinese\n\n**Structure 2: 有(一)点儿 — POSITION BEFORE the ADJ**\n\n**2a. Subject + 有点儿 + Adjective (negative)**\n• 这个有点儿贵 = This is a bit expensive (regret)\n• 我有点儿累 = I\'m a bit tired\n• 今天有点儿冷 = It\'s a bit cold today\n• 这个菜有点儿咸 = This dish is a bit salty\n• 他有点儿不高兴 = He\'s a bit upset\n\n**2b. 有点儿 + Stative verb** (rare but possible)\n• 有点儿想家 = A bit homesick\n• 有点儿担心 = A bit worried\n\n**Structure 3: combining both (careful!)**\n• 你能不能便宜一点儿？(commercial: "a bit cheaper?") + 太贵了，有点儿贵 ("it\'s a bit expensive")\n\n**Structure 4: polite request**\n• Subject + Verb + Adj + **一点儿** — for polite requests\n• 请说慢一点儿 = Please speak a bit slower\n• 便宜一点儿吧 = Make it a bit cheaper\n• 早一点儿来 = Come a bit earlier',
      commonMistakes: '❌ 这个一点儿贵 (pour « c\'est un peu cher » — déplaisant) ; ✅ 这个有点儿贵 — avant l\'adjectif déplaisant, TOUJOURS 有点儿.\n\n❌ 有点儿一点儿 (redondance) ; ✅ choisir 一点儿 OU 有点儿 selon la position.\n\n❌ 我说慢有点儿 ; ✅ 我说慢一点儿 — pour demander poliment (verbe + adj + un peu), c\'est TOUJOURS 一点儿 APRÈS.\n\n❌ 有点儿漂亮 (calque du français « c\'est un peu joli ») ; ✅ 挺漂亮 OU 很漂亮 — 有点儿 avec un adj POSITIF sonne bizarre. Exception : ton ironique.\n\n❌ 我要有点儿水 ; ✅ 我要一点儿水 — pour la quantité d\'un NOM, on met 一点儿 devant.\n\n❌ 有一点儿贵一点儿 (mélange) ; ✅ 有点儿贵 (à l\'oral, 有一点儿 est plus soutenu).\n\n❌ 我一点儿累 (calque) ; ✅ 我有点儿累 — fatigue déplaisante = 有点儿.\n\n❌ 快点儿一点儿 ; ✅ 快一点儿 OU 快点 — pas de double marqueur.',
      commonMistakesEn: '❌ 这个一点儿贵 (for "it\'s a bit expensive" — unpleasant); ✅ 这个有点儿贵 — before an unpleasant adjective, ALWAYS 有点儿.\n\n❌ 有点儿一点儿 (redundancy); ✅ pick 一点儿 OR 有点儿 based on position.\n\n❌ 我说慢有点儿; ✅ 我说慢一点儿 — for polite requests (verb + adj + a bit), ALWAYS 一点儿 AFTER.\n\n❌ 有点儿漂亮 (English calque "it\'s a bit pretty"); ✅ 挺漂亮 OR 很漂亮 — 有点儿 with a POSITIVE adj sounds odd. Exception: ironic tone.\n\n❌ 我要有点儿水; ✅ 我要一点儿水 — for quantity of a NOUN, use 一点儿 before.\n\n❌ 有一点儿贵一点儿 (mix); ✅ 有点儿贵 (in speech, 有一点儿 is more formal).\n\n❌ 我一点儿累 (calque); ✅ 我有点儿累 — unpleasant tiredness = 有点儿.\n\n❌ 快点儿一点儿; ✅ 快一点儿 OR 快点 — no double marker.',
      tips: '💡 **Mnémo POSITION** :\n  • **有点儿** = AVANT l\'adjectif (« il est un peu fatigué » 他有点儿累)\n  • **一点儿** = APRÈS l\'adjectif (« un peu PLUS » 大一点儿)\n\n💡 **Mnémo SENS** :\n  • **有点儿** = « un chouïa PÉNIBLE » (ton subjectif, souvent négatif)\n  • **一点儿** = « un chouïa PLUS » (ton neutre, comparatif ou quantité)\n\n💡 **Astuce polie ULTRA-utile** : pour demander à qqn de faire moins/plus, TOUJOURS 一点儿 :\n  • 慢一点儿 = plus lentement\n  • 大声一点儿 = plus fort\n  • 便宜一点儿 = moins cher\n  • 快一点儿 = plus vite\n\n💡 **Contraste 有点儿 vs 一点也不** :\n  • 有点儿贵 = un peu cher (léger)\n  • 一点也不贵 = pas du tout cher (négation renforcée)\n\n💡 **儿 optionnel** : au sud de la Chine (Shanghai, Canton, Taïwan), on dit 一点 / 有点 sans 儿. À Pékin et au Nord, 儿 est quasi obligatoire à l\'oral.\n\n💡 **Version raccourcie familière** : 点儿 tout court à l\'oral rapide.\n  • 慢点儿 = plus doux / plus lent\n  • 快点 = plus vite (impératif)\n\n💡 **有点儿 + adj POSITIF ironique** :\n  • 有点儿意思 = c\'est un peu intéressant (positif ! exception à la règle)\n  • 有点儿好看 = pas mal, quoi (ironique / mesuré)\n\n💡 **Comparatif complet** : 比+ personne + adj + 一点儿 = « un peu plus X que »\n  • 我比他高一点儿 = Je suis un peu plus grand que lui',
      tipsEn: '💡 **POSITION mnemonic**:\n  • **有点儿** = BEFORE the adjective ("he\'s a bit tired" 他有点儿累)\n  • **一点儿** = AFTER the adjective ("a bit MORE" 大一点儿)\n\n💡 **MEANING mnemonic**:\n  • **有点儿** = "a tad ANNOYING" (subjective, often negative)\n  • **一点儿** = "a tad MORE" (neutral, comparative or quantity)\n\n💡 **Super useful polite trick**: to ask someone to do less/more, ALWAYS 一点儿:\n  • 慢一点儿 = slower\n  • 大声一点儿 = louder\n  • 便宜一点儿 = cheaper\n  • 快一点儿 = faster\n\n💡 **Contrast 有点儿 vs 一点也不**:\n  • 有点儿贵 = a bit expensive (mild)\n  • 一点也不贵 = not at all expensive (reinforced negative)\n\n💡 **Optional 儿**: in southern China (Shanghai, Canton, Taiwan), people say 一点 / 有点 without 儿. In Beijing and the north, 儿 is nearly mandatory in speech.\n\n💡 **Short colloquial form**: just 点儿 in fast speech.\n  • 慢点儿 = a bit slower\n  • 快点 = faster (imperative)\n\n💡 **有点儿 + POSITIVE adj ironic**:\n  • 有点儿意思 = it\'s kind of interesting (positive! exception)\n  • 有点儿好看 = not bad (ironic / measured)\n\n💡 **Full comparative**: 比 + person + adj + 一点儿 = "a bit more X than"\n  • 我比他高一点儿 = I\'m a bit taller than him',
      relatedGrammar: ['grammar-comparison-bi', 'grammar-adjectives-hen']
    },
    audio: 'audio/grammar/grammar-yidian-vs-youdian.wav',
    examples: [
      { hanzi: '你可以说慢一点儿吗？', pinyin: 'nǐ kěyǐ shuō màn yìdiǎnr ma?', translation: 'Can you speak a bit slower?', translationFr: 'Peux-tu parler un peu plus lentement ?' },
      { hanzi: '我有点儿饿', pinyin: 'wǒ yǒudiǎnr è', translation: 'I\'m a bit hungry', translationFr: 'J\'ai un peu faim' },
      { hanzi: '这件衣服有点儿贵', pinyin: 'zhè jiàn yīfu yǒudiǎnr guì', translation: 'This piece of clothing is a bit expensive', translationFr: 'Ce vêtement est un peu cher' },
      { hanzi: '便宜一点儿吧', pinyin: 'piányi yìdiǎnr ba', translation: 'A bit cheaper please', translationFr: 'Un peu moins cher, s\'il vous plaît' },
      { hanzi: '我会一点儿中文', pinyin: 'wǒ huì yìdiǎnr Zhōngwén', translation: 'I speak a little Chinese', translationFr: 'Je parle un peu chinois' },
      { hanzi: '今天有点儿冷', pinyin: 'jīntiān yǒudiǎnr lěng', translation: 'It\'s a bit cold today', translationFr: 'Il fait un peu froid aujourd\'hui' }
    ],
    quiz: {
      prompt: 'Pour dire « un peu fatigué » (sens négatif), on dit...',
      choices: ['一点儿累', '有点儿累', '累一点儿', '有累'],
      correctChoiceIndex: 1
    },
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '今天我___累',
      translation: 'Aujourd\'hui je suis un peu fatigué',
      translationEn: 'Today I\'m a bit tired',
      choices: ['一点儿', '有点儿', '很', '非常'],
      correctChoice: '有点儿',
      pinyin: 'jīntiān wǒ ___ lèi',
      explanation: '有点儿 précède un adjectif à connotation négative (累 = fatigué).'
    },
    tags: ['grammaire', 'adverbe', 'degré', 'hsk2'],
    theme: 'grammar'
  },

  // ============================================
  // HSK2 — 又 vs 再 vs 还 (répétition / continuation)
  // ============================================
  {
    id: 'grammar-you-zai-hai-repetition',
    level: 'hsk2',
    hanzi: '又 / 再 / 还',
    pinyin: 'yòu / zài / hái',
    translation: '"again": 又 (past), 再 (future), 还 (still)',
    translationFr: '« encore » : 又 (déjà), 再 (à venir), 还 (toujours)',
    category: 'grammaire',
    explanation: 'Trois adverbes de répétition / continuation aux valeurs distinctes. Piège classique intermédiaire : chaque mot indique un temps différent (passé, futur, état continu).',
    grammarExplanation: {
      whenToUse: 'Le français « encore » se traduit par TROIS adverbes chinois différents selon le temps de l\'action. Piège HSK2 majeur. Registre : neutre, ultra-fréquent (top 100).\n\n**又 (yòu)** — répétition PASSÉE ou HABITUELLE :\n• Sous-cas 1 : événement RÉPÉTÉ dans le passé + 了\n  → 他又迟到了 = Il est ENCORE en retard (comme d\'hab)\n  → 你又忘了！ = Tu as ENCORE oublié !\n• Sous-cas 2 : événement CYCLIQUE / attendu\n  → 春天又来了 = Le printemps revient\n• Sous-cas 3 : coordination « à la fois X et Y »\n  → 又高又漂亮 = à la fois grand et beau\n• Sous-cas 4 : contradiction / concession\n  → 想去又不想去 = j\'ai envie d\'y aller mais pas vraiment\n\n**再 (zài)** — répétition FUTURE :\n• Sous-cas 1 : action à REFAIRE dans le futur\n  → 再来一次 = Refais-le une fois\n  → 明天再说 = On en reparlera demain\n• Sous-cas 2 : ordre séquentiel « puis... »\n  → 先吃饭再看电视 = D\'abord manger puis regarder la TV\n• Sous-cas 3 : suggestion / proposition\n  → 再试试 = Essaie encore\n• Sous-cas 4 : intensification d\'ordre\n  → 再多说一次 = Redis-le\n\n**还 (hái)** — CONTINUATION d\'un état, « ENCORE en cours » :\n• Sous-cas 1 : état qui perdure\n  → 我还在学中文 = J\'étudie encore le chinois\n• Sous-cas 2 : négation « pas encore »\n  → 他还没来 = Il n\'est TOUJOURS PAS arrivé\n• Sous-cas 3 : addition « en plus, aussi »\n  → 我还要一杯 = J\'en veux ENCORE une\n• Sous-cas 4 : renforcement / mise en évidence\n  → 你还问？ = Tu oses encore demander ?\n\nRegistre : les trois sont universels, aucune connotation.',
      whenToUseEn: 'English "again" translates to THREE different Chinese adverbs by tense. Major HSK2 pitfall. Register: neutral, extremely common (top 100).\n\n**又 (yòu)** — PAST or HABITUAL repetition:\n• Case 1: event REPEATED in the past + 了\n  → 他又迟到了 = He\'s late AGAIN (as usual)\n  → 你又忘了！= You forgot AGAIN!\n• Case 2: CYCLIC / expected event\n  → 春天又来了 = Spring is back\n• Case 3: coordination "both X and Y"\n  → 又高又漂亮 = both tall and beautiful\n• Case 4: contradiction / concession\n  → 想去又不想去 = I want to go but also don\'t\n\n**再 (zài)** — FUTURE repetition:\n• Case 1: action to REDO in the future\n  → 再来一次 = Do it again\n  → 明天再说 = We\'ll talk tomorrow\n• Case 2: sequential order "then..."\n  → 先吃饭再看电视 = First eat, then watch TV\n• Case 3: suggestion / proposal\n  → 再试试 = Try again\n• Case 4: order intensification\n  → 再多说一次 = Say it again\n\n**还 (hái)** — CONTINUATION of a state, "STILL":\n• Case 1: state persists\n  → 我还在学中文 = I\'m still studying Chinese\n• Case 2: negation "not yet"\n  → 他还没来 = He\'s STILL NOT here\n• Case 3: addition "also, in addition"\n  → 我还要一杯 = I want ANOTHER one\n• Case 4: reinforcement / highlighting\n  → 你还问？ = You dare ask again?\n\nRegister: all three universal, no connotation.',
      howToUse: '**Structure 1 : 又 — Sujet + 又 + Verbe + 了** (passé + événement répété)\n• 他又迟到了 (tā yòu chídào le) = Il est ENCORE en retard\n• 你又忘了！(nǐ yòu wàng le!) = Tu as ENCORE oublié !\n• 今天又下雨了 = Il pleut ENCORE aujourd\'hui\n• 他又哭了 = Il pleure encore\n\n**Cas particulier : 又...又... (coordination)** — sans 了\n• 又高又胖 = à la fois grand et gros\n• 又便宜又好 = à la fois pas cher et de qualité\n\n**Structure 2 : 再 — Sujet + 再 + Verbe** (futur / suggestion)\n• 再来一次 = Refais-le une fois\n• 再见 = À la prochaine (litt. « re-voir »)\n• 明天再谈 = On reparlera demain\n• 你再想想 = Réfléchis encore\n• 再吃一点儿 = Reprends-en un peu\n\n**Cas séquentiel : 先...再...**\n• 先做作业再玩 = D\'abord les devoirs, puis jouer\n• 我先洗澡再吃饭 = Je me douche d\'abord puis je mange\n\n**Structure 3 : 还 — Sujet + 还 + Verbe / Adjectif** (état continu)\n• 我还在学中文 (wǒ hái zài xué Zhōngwén) = J\'étudie encore le chinois\n• 他还没来 (tā hái méi lái) = Il n\'est toujours pas là\n• 你还年轻 = Tu es encore jeune\n• 我还想吃 = J\'ai encore envie de manger\n• 天还没黑 = Il ne fait pas encore nuit\n\n**Cas d\'ADDITION : 还 = « en plus »**\n• 我要一杯茶，还要一个蛋糕 = Je veux un thé, ET AUSSI un gâteau\n• 除了英文，他还会说法文 = En plus de l\'anglais, il parle aussi français\n\n**Structure 4 : NÉGATIONS**\n• 又...了 → 又不 (rare) ou 又没 + Verbe → 他又没来 = Il n\'est ENCORE pas venu\n• 再 → 不再 = ne plus → 我不再吸烟 = Je ne fume plus\n• 还 → 还没 = pas encore → 我还没吃饭 = Je n\'ai pas encore mangé\n\n**Structure 5 : questions**\n• Q : 你还去吗？ = Tu y vas encore ?\n• Q : 再来一杯？ = Encore un verre ?\n• Q : 又迟到了吗？ = Encore en retard ?',
      howToUseEn: '**Structure 1: 又 — Subject + 又 + Verb + 了** (past + repeated)\n• 他又迟到了 = He\'s late AGAIN\n• 你又忘了！= You forgot AGAIN!\n• 今天又下雨了 = It\'s raining AGAIN today\n• 他又哭了 = He\'s crying again\n\n**Special case: 又...又... (coordination)** — no 了\n• 又高又胖 = both tall and fat\n• 又便宜又好 = both cheap and good\n\n**Structure 2: 再 — Subject + 再 + Verb** (future / suggestion)\n• 再来一次 = Do it again\n• 再见 = See you (lit. "again-see")\n• 明天再谈 = We\'ll talk tomorrow\n• 你再想想 = Think again\n• 再吃一点儿 = Have some more\n\n**Sequential: 先...再...**\n• 先做作业再玩 = First homework, then play\n• 我先洗澡再吃饭 = I\'ll shower first then eat\n\n**Structure 3: 还 — Subject + 还 + Verb / Adjective** (ongoing state)\n• 我还在学中文 = I\'m still studying Chinese\n• 他还没来 = He\'s still not here\n• 你还年轻 = You\'re still young\n• 我还想吃 = I still want to eat\n• 天还没黑 = It\'s not dark yet\n\n**ADDITION case: 还 = "also, in addition"**\n• 我要一杯茶，还要一个蛋糕 = I want a tea AND ALSO a cake\n• 除了英文，他还会说法文 = Besides English, he also speaks French\n\n**Structure 4: NEGATIONS**\n• 又...了 → 又不 (rare) or 又没 + Verb → 他又没来 = He\'s STILL not come\n• 再 → 不再 = no longer → 我不再吸烟 = I don\'t smoke anymore\n• 还 → 还没 = not yet → 我还没吃饭 = I haven\'t eaten yet\n\n**Structure 5: questions**\n• Q: 你还去吗？ = Are you still going?\n• Q: 再来一杯？ = Another drink?\n• Q: 又迟到了吗？ = Late again?',
      commonMistakes: '❌ 明天他又来 (calque : « demain il vient encore ») ; ✅ 明天他再来 — pour un événement FUTUR, on utilise 再, pas 又.\n\n❌ 他再迟到了 (calque : « il est encore en retard ») ; ✅ 他又迟到了 — pour un événement PASSÉ, c\'est 又 + 了, pas 再.\n\n❌ 我还去了 (calque : « j\'y suis allé encore ») ; ✅ 我又去了 — pour « je suis encore allé », c\'est 又 + 了.\n\n❌ 我又想吃 (au présent) ; ✅ 我还想吃 — pour un ÉTAT CONTINU (envie toujours là), c\'est 还.\n\n❌ 你还来吗？(pour le futur) ; ambigu — 你再来吗？ = viendras-tu encore ? OU 你还来吗？ = viendras-tu toujours ?\n\n❌ 又见 (calque de 再见) ; ✅ 再见 — « au revoir » est TOUJOURS 再见 (jamais 又见).\n\n❌ 他没又来 ; ✅ 他又没来 — l\'ordre est 又 + négation (jamais l\'inverse).\n\n❌ 我又是学生 (calque bizarre) ; ✅ 我还是学生 — pour « je suis TOUJOURS étudiant », c\'est 还.',
      commonMistakesEn: '❌ 明天他又来 (calque "tomorrow he comes again"); ✅ 明天他再来 — for a FUTURE event, use 再, not 又.\n\n❌ 他再迟到了 (calque "he\'s late again"); ✅ 他又迟到了 — for a PAST event, it\'s 又 + 了, not 再.\n\n❌ 我还去了 (calque "I went again"); ✅ 我又去了 — for "I went again", it\'s 又 + 了.\n\n❌ 我又想吃 (in present); ✅ 我还想吃 — for an ONGOING STATE (still hungry), it\'s 还.\n\n❌ 你还来吗？(for future); ambiguous — 你再来吗？= will you come again? OR 你还来吗？= are you still coming?\n\n❌ 又见 (calque of 再见); ✅ 再见 — "goodbye" is ALWAYS 再见 (never 又见).\n\n❌ 他没又来; ✅ 他又没来 — order is 又 + negation (never the other way).\n\n❌ 我又是学生 (odd calque); ✅ 我还是学生 — for "I\'m STILL a student", use 还.',
      tips: '💡 **Mnémo temporel — LE test à retenir** :\n  • 又 + 了 → PASSÉ (déjà arrivé une nouvelle fois)\n  • 再 + Verbe → FUTUR (à refaire)\n  • 还 + Verbe/Adj → CONTINU (état qui dure)\n\n💡 **Astuce ultra-rapide** :\n  • Y a-t-il 了 en fin de phrase ? → 又\n  • Le futur est-il évoqué (明天, 后天...) ? → 再\n  • L\'état est-il « pas encore terminé » ? → 还\n\n💡 **Expressions figées ultra-fréquentes** :\n  • 再见 = au revoir (« se revoir »)\n  • 又...又... = à la fois X et Y\n  • 再说 = « on en reparlera » / « d\'ailleurs »\n  • 还是 = ou bien (dans une question)\n  • 还有 = et aussi, il y a encore\n  • 又来了 = « c\'est reparti ! » (excédé)\n\n💡 **Nuance affective** :\n  • 又 porte souvent un ton d\'AGACEMENT (« encore ! »)\n  • 再 est neutre / suggestion\n  • 还 exprime la surprise que ça dure\n\n💡 **Contraste 还 vs 也** :\n  • 我要茶，也要蛋糕 = et je veux aussi un gâteau (parallèle)\n  • 我要茶，还要蛋糕 = et EN PLUS un gâteau (ajout)\n  Les deux sont possibles mais 还 insiste davantage sur l\'addition.\n\n💡 **Contraste 还 vs 仍然** :\n  • 还 = oral, familier\n  • 仍然 (réngrán) = écrit, soutenu\n  Sens identique pour « toujours ».\n\n💡 **Bonus : ordre séquentiel 先...再...** — très utile pour organiser des actions.\n  → 先...然后... est plus soutenu.',
      tipsEn: '💡 **Temporal mnemonic — THE test to remember**:\n  • 又 + 了 → PAST (already happened again)\n  • 再 + Verb → FUTURE (to redo)\n  • 还 + Verb/Adj → CONTINUOUS (state still holds)\n\n💡 **Ultra-quick trick**:\n  • Is there 了 at the end? → 又\n  • Is the future mentioned (明天, 后天...)? → 再\n  • Is the state "not yet done"? → 还\n\n💡 **Ultra-frequent fixed expressions**:\n  • 再见 = goodbye ("see you again")\n  • 又...又... = both X and Y\n  • 再说 = "we\'ll talk about it later" / "besides"\n  • 还是 = or (in questions)\n  • 还有 = and also, there\'s still\n  • 又来了 = "here we go again!" (annoyed)\n\n💡 **Emotional nuance**:\n  • 又 often carries an ANNOYED tone ("again!")\n  • 再 is neutral / suggestion\n  • 还 expresses surprise it lasts\n\n💡 **还 vs 也 contrast**:\n  • 我要茶，也要蛋糕 = I want tea, also a cake (parallel)\n  • 我要茶，还要蛋糕 = I want tea, AND ALSO a cake (addition)\n  Both possible, 还 stresses the addition more.\n\n💡 **还 vs 仍然 contrast**:\n  • 还 = spoken, familiar\n  • 仍然 (réngrán) = written, formal\n  Same meaning for "still".\n\n💡 **Bonus: sequential 先...再...** — very useful for organizing actions.\n  → 先...然后... is more formal.',
      relatedGrammar: ['grammar-aspect-le']
    },
    audio: 'audio/grammar/grammar-you-zai-hai-repetition.wav',
    examples: [
      { hanzi: '你又忘了！', pinyin: 'nǐ yòu wàng le!', translation: 'You forgot again!', translationFr: 'Tu as encore oublié !' },
      { hanzi: '我们下次再见', pinyin: 'wǒmen xià cì zài jiàn', translation: 'See you next time', translationFr: 'On se revoit la prochaine fois' },
      { hanzi: '你还在吗？', pinyin: 'nǐ hái zài ma?', translation: 'Are you still there?', translationFr: 'Tu es toujours là ?' },
      { hanzi: '今天又下雨了', pinyin: 'jīntiān yòu xià yǔ le', translation: 'It\'s raining again today', translationFr: 'Il pleut encore aujourd\'hui' },
      { hanzi: '他还没来', pinyin: 'tā hái méi lái', translation: 'He\'s not here yet', translationFr: 'Il n\'est toujours pas là' },
      { hanzi: '再来一杯茶', pinyin: 'zài lái yì bēi chá', translation: 'Another cup of tea please', translationFr: 'Encore une tasse de thé' }
    ],
    quiz: {
      prompt: '« Il est ENCORE en retard (comme d\'habitude) » utilise quel adverbe ?',
      choices: ['又', '再', '还', '也'],
      correctChoiceIndex: 0
    },
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '你明天___来吗？',
      translation: 'Tu reviens demain ?',
      translationEn: 'Are you coming again tomorrow?',
      choices: ['又', '再', '还', '也'],
      correctChoice: '再',
      pinyin: 'nǐ míngtiān ___ lái ma?',
      explanation: '再 marque une répétition dans le FUTUR (明天 = demain).'
    },
    tags: ['grammaire', 'adverbe', 'répétition', 'hsk2'],
    theme: 'grammar'
  }
];
