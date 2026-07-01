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
      whenToUse: '使 = registre soutenu, écrit, essais, articles. Souvent avec un adjectif ou un état résultant.\n令 = émotionnel, littéraire — « rendre + émotion » (令我感动 « me toucher »).',
      whenToUseEn: '使 = formal register (essays, articles). Usually followed by an adjective or resulting state.\n令 = emotional, literary — "make + emotion" (令我感动 "move me").',
      howToUse: 'Structure : Sujet/Cause + 使/令 + Objet + Adj/Verbe\n\nExemples :\n• 这件事使我很生气 = Cette affaire me met en colère\n• 学习汉语令我很开心 = Apprendre le chinois me rend heureux\n• 他的话令人失望 = Ses paroles déçoivent (« font que les gens sont déçus »)\n\nLe 人 (indéfini « on ») est fréquent avec 令.',
      howToUseEn: 'Structure: Subject/Cause + 使/令 + Object + Adj/Verb\n\nExamples:\n• 这件事使我很生气 = This matter makes me angry\n• 学习汉语令我很开心 = Learning Chinese makes me happy\n• 他的话令人失望 = His words are disappointing\n\n人 (impersonal "one") is often used with 令.',
      commonMistakes: '❌ 使 à l\'oral casual : sonne pompeux. Préfère 让.\n❌ 令 sans émotion : 令 s\'accompagne quasi-toujours d\'un état émotionnel.\n\nNégation : très rare — reformuler avec 让 + 不 ou 不能让.',
      commonMistakesEn: '❌ 使 in casual speech sounds pompous — use 让 instead.\n❌ 令 without an emotion: 令 nearly always pairs with an emotional state.\n\nNegation is rare — rephrase with 让 + 不 or 不能让.',
      tips: '💡 Registre : 让 (oral, universel) → 使 (écrit, neutre) → 令 (littéraire, émotionnel).\n💡 Pour un essai ou une dissert : 使.\n💡 Pour un compliment / une critique émotionnelle : 令.',
      tipsEn: '💡 Register scale: 让 (spoken, universal) → 使 (written, neutral) → 令 (literary, emotional).\n💡 For an essay: use 使.\n💡 For an emotional compliment or critique: use 令.',
      relatedGrammar: ['grammar-rang-causative']
    },
    audio: 'audio/grammar/shi-ling-causative.wav',
    examples: [
      { hanzi: '这本书使我很感动', pinyin: 'zhè běn shū shǐ wǒ hěn gǎndòng', translation: 'This book moves me deeply', translationFr: 'Ce livre me touche beaucoup' },
      { hanzi: '他的行为令人难以理解', pinyin: 'tā de xíngwéi lìng rén nányǐ lǐjiě', translation: 'His behavior is hard to understand', translationFr: 'Son comportement est difficile à comprendre' },
      { hanzi: '音乐使人放松', pinyin: 'yīnyuè shǐ rén fàngsōng', translation: 'Music relaxes people', translationFr: 'La musique détend' }
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
      whenToUse: 'Pour marteler l\'absence totale de qch (un objet, une action, une quantité).',
      whenToUseEn: 'To emphatically deny even the smallest amount (an object, an action, a quantity).',
      howToUse: 'Structure : (Sujet) + 一 + Classificateur + Objet + 都/也 + 不/没 + Verbe\n\nExemples :\n• 我一点也不累 = Je ne suis pas du TOUT fatigué\n• 我一个也没有 = Je n\'en ai PAS UN SEUL\n• 他一句话也没说 = Il n\'a pas dit UN MOT\n• 我一分钟都没休息 = Je n\'ai PAS UNE MINUTE de repos',
      howToUseEn: 'Structure: (Subject) + 一 + CL + Object + 都/也 + 不/没 + Verb\n\nExamples:\n• 我一点也不累 = I\'m not tired AT ALL\n• 我一个也没有 = I don\'t have A SINGLE ONE\n• 他一句话也没说 = He didn\'t say ONE WORD\n• 我一分钟都没休息 = I didn\'t rest for A SINGLE MINUTE',
      commonMistakes: 'Le 都/也 est OBLIGATOIRE dans cette structure.\n❌ 我一点不累 (moins fort, incomplet)\n✅ 我一点都不累\n\nDifférence avec 不太 (pas trop) : 一点都不 = « pas du tout » (négation TOTALE).\n\nAvec 不 (verbes d\'état / futur) ou 没 (actions passées).',
      commonMistakesEn: '都/也 is MANDATORY in this structure.\n❌ 我一点不累 (weak, incomplete)\n✅ 我一点都不累\n\nDon\'t confuse with 不太 (not really): 一点都不 = "not at all" (TOTAL negation).\n\nUse 不 for state/future verbs, 没 for past actions.',
      tips: '💡 Astuce pour maîtriser l\'emphase : « UN + CL + 都/也 + PAS ».\n💡 C\'est LA structure pour renforcer une négation.\n💡 一 + 点 fonctionne comme un mini-quantifieur : « pas une miette ».\n💡 Le 都 se lit comme « TOUS pas », c\'est-à-dire « aucun ».',
      tipsEn: '💡 Memory trick: "ONE + CL + 都/也 + NOT".\n💡 THE structure to reinforce a negation.\n💡 一 + 点 works like a mini-quantifier: "not a crumb".\n💡 Read 都 as "ALL not" = "none".',
      relatedGrammar: ['grammar-dou-all', 'grammar-negation-bu']
    },
    audio: 'audio/grammar/yi-dou-negation.wav',
    examples: [
      { hanzi: '我一点都不知道', pinyin: 'wǒ yìdiǎn dōu bù zhīdào', translation: 'I have no idea at all', translationFr: 'Je n\'en sais absolument rien' },
      { hanzi: '他一次也没来过', pinyin: 'tā yí cì yě méi lái guo', translation: 'He has never come, not even once', translationFr: 'Il n\'est jamais venu, pas une seule fois' },
      { hanzi: '这个字我一个都不会', pinyin: 'zhège zì wǒ yí ge dōu bú huì', translation: 'I don\'t know a single one of these characters', translationFr: 'Je n\'en connais pas un seul de ces caractères' }
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
      whenToUse: '大概 = « approximativement, environ, probablement » (~70 % sûr).\n也许 = « peut-être » (~50 %, neutre).\n可能 = « possible, il est possible que » (indication objective).\n恐怕 = « j\'ai peur que, probablement (négatif) » (~80 %, ton anxieux).',
      whenToUseEn: '大概 = "roughly, probably" (~70 % sure).\n也许 = "perhaps" (~50 %, neutral).\n可能 = "possibly, it may be that" (objective).\n恐怕 = "I\'m afraid, probably (negative)" (~80 %, anxious tone).',
      howToUse: '大概 : Sujet + 大概 + Verbe\n• 他大概三十岁 = Il a probablement 30 ans\n\n也许 : plus souvent en TÊTE de phrase\n• 也许他明天来 = Peut-être qu\'il vient demain\n\n可能 : très polyvalent — adverbe ou verbe modal\n• 明天可能下雨 = Il pleuvra peut-être demain\n• 这可能吗？= Est-ce possible ?\n\n恐怕 : registre poli, ton d\'inquiétude\n• 恐怕他不来了 = J\'ai bien peur qu\'il ne vienne plus\n• 恐怕我们迟到了 = Je crains qu\'on ne soit en retard',
      howToUseEn: '大概: Subject + 大概 + Verb\n• 他大概三十岁 = He\'s probably 30\n\n也许: often at the START of the sentence\n• 也许他明天来 = Maybe he\'ll come tomorrow\n\n可能: versatile — adverb or modal verb\n• 明天可能下雨 = It may rain tomorrow\n• 这可能吗？= Is this possible?\n\n恐怕: polite, anxious tone\n• 恐怕他不来了 = I\'m afraid he won\'t come\n• 恐怕我们迟到了 = I\'m afraid we\'re late',
      commonMistakes: 'Ne pas confondre 大概 (probable, positif) avec 也许 (moitié-moitié).\n恐怕 sonne pessimiste — évite en compliment.\n\nÀ l\'ORAL : 可能 est le plus fréquent.\nÀ l\'ÉCRIT : 也许, 大概, 或许.\n\nÉviter d\'accumuler : « 也许可能大概 » sonne redondant.',
      commonMistakesEn: 'Don\'t confuse 大概 (probable, positive) with 也许 (50/50).\n恐怕 sounds pessimistic — avoid in compliments.\n\nSpoken: 可能 is most common.\nWritten: 也许, 大概, 或许.\n\nDon\'t stack them: "也许可能大概" sounds redundant.',
      tips: '💡 Échelle de certitude :\n一定 (100 %) > 肯定 (~95 %) > 大概/恐怕 (~70-80 %) > 可能 (~50-70 %) > 也许 (~50 %) > 或许 (~40 %)\n\n💡 恐怕 ajoute un ton POLI ou ANXIEUX. À réserver pour mauvaises nouvelles ou refus polis (恐怕不行).',
      tipsEn: '💡 Certainty scale:\n一定 (100 %) > 肯定 (~95 %) > 大概/恐怕 (~70-80 %) > 可能 (~50-70 %) > 也许 (~50 %) > 或许 (~40 %)\n\n💡 恐怕 adds a POLITE or ANXIOUS tone. Use for bad news or polite refusals (恐怕不行).',
      relatedGrammar: []
    },
    audio: 'audio/grammar/epistemic-modality.wav',
    examples: [
      { hanzi: '他大概不知道', pinyin: 'tā dàgài bù zhīdào', translation: 'He probably doesn\'t know', translationFr: 'Il ne sait sans doute pas' },
      { hanzi: '也许我们应该等一下', pinyin: 'yěxǔ wǒmen yīnggāi děng yíxià', translation: 'Perhaps we should wait a bit', translationFr: 'Peut-être qu\'on devrait attendre un peu' },
      { hanzi: '恐怕这个方案不行', pinyin: 'kǒngpà zhège fāng\'àn bùxíng', translation: 'I\'m afraid this plan won\'t work', translationFr: 'Je crains que ce plan ne fonctionne pas' }
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
      whenToUse: '不见得 = « pas forcément, pas nécessairement » (contredit un préjugé, oral et écrit).\n未必 = même sens que 不见得 mais plus soutenu/écrit.\n说不定 = « qui sait ! peut-être bien ! » (ouvre une possibilité surprenante, oral positif).',
      whenToUseEn: '不见得 = "not necessarily" (contradicts an assumption, spoken + written).\n未必 = same meaning as 不见得 but more formal/written.\n说不定 = "who knows! maybe!" (opens up a surprising possibility, spoken).',
      howToUse: '不见得 : Sujet + 不见得 + Adj/Verbe\n• 贵的不见得好 = Ce qui est cher n\'est pas forcément bon\n\n未必 : Sujet + 未必 + Adj/Verbe\n• 他未必来 = Il ne viendra pas forcément\n\n说不定 : Sujet + 说不定 + Verbe/Résultat\n• 说不定明天会下雨 = Qui sait, il pleuvra peut-être demain\n• 说不定他已经到了 = Il est peut-être déjà arrivé (qui sait !)',
      howToUseEn: '不见得: Subject + 不见得 + Adj/Verb\n• 贵的不见得好 = Expensive doesn\'t mean good\n\n未必: Subject + 未必 + Adj/Verb\n• 他未必来 = He won\'t necessarily come\n\n说不定: Subject + 说不定 + Verb/Result\n• 说不定明天会下雨 = Who knows, it might rain tomorrow\n• 说不定他已经到了 = He may have already arrived (you never know!)',
      commonMistakes: '❌ Confondre 说不定 (surprise positive/négative) avec 不一定 (« pas certainement »). 说不定 sonne plus VIVANT et OUVERT.\n\nRegistre :\n• 未必 = écrit / formel\n• 不见得 = oral et écrit\n• 说不定 = ORAL seulement\n\n❌ 不见得 en présentation formelle : préfère 未必.',
      commonMistakesEn: '❌ Don\'t confuse 说不定 (surprise) with 不一定 ("not for sure"). 说不定 is more LIVELY.\n\nRegister:\n• 未必 = written / formal\n• 不见得 = spoken and written\n• 说不定 = SPOKEN only\n\n❌ In a formal presentation, prefer 未必 to 不见得.',
      tips: '💡 Utile pour NUANCER une affirmation trop catégorique. « X est A » → « X 不见得 A ».\n💡 Pour ouvrir une possibilité : 说不定 = « you never know ! ».\n💡 Complémentaires du 也许/大概 basiques.',
      tipsEn: '💡 Great for NUANCING a categorical claim. "X is A" → "X 不见得 A".\n💡 To open a possibility: 说不定 = "you never know!".\n💡 Complement basic 也许/大概.',
      relatedGrammar: ['grammar-epistemic-modality']
    },
    audio: 'audio/grammar/bujiande-weibi-shuobuding.wav',
    examples: [
      { hanzi: '便宜的不见得不好', pinyin: 'piányi de bùjiàndé bù hǎo', translation: 'Cheap doesn\'t necessarily mean bad', translationFr: 'Ce qui est bon marché n\'est pas forcément mauvais' },
      { hanzi: '他未必知道这件事', pinyin: 'tā wèibì zhīdào zhè jiàn shì', translation: 'He doesn\'t necessarily know about this', translationFr: 'Il n\'est pas forcément au courant de cette affaire' },
      { hanzi: '说不定我们会再见面', pinyin: 'shuōbudìng wǒmen huì zài jiànmiàn', translation: 'Who knows, maybe we\'ll meet again', translationFr: 'Qui sait, on se reverra peut-être' }
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
