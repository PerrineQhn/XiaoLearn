/**
 * cecr-course.ts — Parcours CECR A1 → C2 subdivisé (v4)
 * ------------------------------------------------------
 * XiaoLearn — 10 niveaux, 299 leçons, contenu pédagogique rédigé à la main.
 *
 * Architecture :
 *   Niveau 1  — A1     (28 leçons)  — Fondations absolues HSK 1
 *   Niveau 2  — A2     (28 leçons)  — Survie de base HSK 2
 *   Niveau 3  — B1.1   (30 leçons)  — Le passé, les aspects (了, 过, 着, 在)
 *   Niveau 4  — B1.2   (30 leçons)  — Les grandes structures (把, 被, de/地/得, 是…的)
 *   Niveau 5  — B2.1   (30 leçons)  — Connecteurs & nuances (不但…而且, 只要…就…)
 *   Niveau 6  — B2.2   (30 leçons)  — Argumentation (一方面…, 与其…不如…)
 *   Niveau 7  — C1.1   (30 leçons)  — Chengyu & style soutenu
 *   Niveau 8  — C1.2   (30 leçons)  — Littérature moderne
 *   Niveau 9  — C2.1   (30 leçons)  — Poésie classique & wenyan
 *   Niveau 10 — C2.2   (33 leçons)  — Philosophie & textes fondamentaux
 *
 * Chaque leçon a une intro rédigée à la main : exemple contrasté, objectifs
 * concrets, piège fréquent signalé. Les leçons « une particule par usage »
 * (了, 过, 把, 被, 的/地/得, 就/才, 还/又, 会/能/可以, 不/没, 虽然/尽管) reçoivent
 * un traitement approfondi avec comparaisons et règles claires.
 */

import type { LessonPath } from '../types/lesson-structure';
import {
  pinyinInitialsLearnSections,
  pinyinFinalsLearnSections,
  pinyinTonesLearnSections,
  pinyinCombinationsLearnSections,
  pinyinPracticeLearnSections,
} from './pinyin-learn-sections';
import {
  greetingsLearnSections,
  introductionsLearnSections,
  politenessLearnSections,
  questionsLearnSections,
  yesNoLearnSections,
  numbersLearnSections,
  timeLearnSections,
  familyLearnSections,
  foodDrinksLearnSections,
  wantsNeedsLearnSections,
  commonVerbsLearnSections,
  dailyActionsLearnSections,
} from './first-steps-learn-sections';
import {
  pinyinInitials1LearnSections,
  pinyinInitials2LearnSections,
  pinyinInitials3LearnSections,
  nationalitiesLearnSections,
  numbersExtendedLearnSections,
  weekDaysLearnSections,
  monthsDatesLearnSections,
  ageLearnSections,
  pronounsLearnSections,
  colorsLearnSections,
  shiVerbLearnSections,
  buNegationLearnSections,
  maQuestionsLearnSections,
  dePossessiveLearnSections,
  classifiersLearnSections,
} from './cecr-a1-extra-learn-sections';

export interface CecrLevelMeta {
  level: string;             // 'a1' | 'a2' | 'b1.1' | ... | 'c2.2'
  order: number;             // 1..10
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  icon: string;
  color: string;
  hskRange: string;          // ex: "1", "2", "3-4", "5", "7"
  pathIds: string[];
}

export const cecrLevels: CecrLevelMeta[] = [
  {
    level: "a1", order: 1,
    name: "A1 — Fondations", nameEn: "A1 — Foundations",
    description: "Premiers pas : pinyin, tons, salutations, nombres, famille, « je suis ».",
    descriptionEn: "First steps: pinyin, tones, greetings, numbers, family, \"I am\".",
    icon: "🌱", color: "green", hskRange: "1",
    pathIds: ["cecr-a1-pinyin", "cecr-a1-hello", "cecr-a1-numbers", "cecr-a1-family", "cecr-a1-grammar"]
  },
  {
    level: "a2", order: 2,
    name: "A2 — Survie", nameEn: "A2 — Survival",
    description: "Commander, acheter, prendre le métro, faire un rendez-vous simple.",
    descriptionEn: "Order, shop, take the metro, make a simple appointment.",
    icon: "🎒", color: "yellow", hskRange: "2",
    // Ordre pédagogique : grammaire (了/过/在/也-都/要-想) remontée juste après la ville,
    // car elle est requise dans les dialogues de resto, shopping, quotidien.
    pathIds: ["cecr-a2-city", "cecr-a2-grammar", "cecr-a2-food-shopping", "cecr-a2-day-phone", "cecr-a2-culture"]
  },
  {
    level: "b1.1", order: 3,
    name: "B1.1 — Seuil débutant", nameEn: "B1.1 — Threshold Novice",
    description: "Raconter le passé (了, 过), exprimer une expérience, les aspects verbaux.",
    descriptionEn: "Tell the past (了, 过), express experience, verbal aspects.",
    icon: "📖", color: "lime", hskRange: "3",
    // Ordre pédagogique entrelacé : chaque bloc de grammaire est immédiatement
    // appliqué dans un parcours thématique (了 → travail, 把/被 → voyage, etc.)
    pathIds: ["cecr-b11-grammar", "cecr-b11-work", "cecr-b11-travel", "cecr-b11-emotions-health"]
  },
  {
    level: "b1.2", order: 4,
    name: "B1.2 — Seuil confirmé", nameEn: "B1.2 — Threshold Confirmed",
    description: "Le 把, le 被, les 3 particules de/地/得, modaux comparés, connecteurs.",
    descriptionEn: "The 把, the 被, the 3 particles de/地/得, modals compared, connectors.",
    icon: "🔧", color: "emerald", hskRange: "3-4",
    // Entrelacé + ajout des compléments résultatifs (完/好/懂/到), qui sont HSK3
    // et étaient mal placés en B2.2 : un learner B1 en a besoin pour "听懂了", "做完了".
    pathIds: ["cecr-b12-grammar", "cecr-b12-narration", "cecr-b12-education-society", "cecr-b12-media"]
  },
  {
    level: "b2.1", order: 5,
    name: "B2.1 — Avancé débutant", nameEn: "B2.1 — Advanced Novice",
    description: "Connecteurs complexes, nuances, médias, éducation, entretien.",
    descriptionEn: "Complex connectors, nuances, media, education, interviews.",
    icon: "🎯", color: "cyan", hskRange: "4",
    // Entrelacé : 连…也/都 appliqué immédiatement en contexte tech, puis conjonctions → env/éco.
    pathIds: ["cecr-b21-grammar", "cecr-b21-tech", "cecr-b21-env", "cecr-b21-economics"]
  },
  {
    level: "b2.2", order: 6,
    name: "B2.2 — Avancé confirmé", nameEn: "B2.2 — Advanced Confirmed",
    description: "Argumenter, nuancer, débattre. Connecteurs littéraires.",
    descriptionEn: "Argue, nuance, debate. Literary connectors.",
    icon: "⚖️", color: "teal", hskRange: "4-5",
    // Compléments résultatifs déplacés en B1.2 (plus cohérent HSK3).
    // B2.2 : grammaire argumentative (与其/宁可/只要-只有) → mise en pratique en débat, puis arts/santé.
    pathIds: ["cecr-b22-grammar-structure", "cecr-b22-debate", "cecr-b22-arts", "cecr-b22-health"]
  },
  {
    level: "c1.1", order: 7,
    name: "C1.1 — Autonome débutant", nameEn: "C1.1 — Autonomous Novice",
    description: "Chengyu courants, registre soutenu, presse, opinion.",
    descriptionEn: "Common chengyu, formal register, press, opinion pieces.",
    icon: "🏛️", color: "sky", hskRange: "5",
    pathIds: ["cecr-c11-chengyu-basic", "cecr-c11-media-discourse", "cecr-c11-history", "cecr-c11-style-formal"]
  },
  {
    level: "c1.2", order: 8,
    name: "C1.2 — Autonome confirmé", nameEn: "C1.2 — Autonomous Confirmed",
    description: "Littérature moderne : Lu Xun, Lao She, Mo Yan, cinéma auteur.",
    descriptionEn: "Modern literature: Lu Xun, Lao She, Mo Yan, art cinema.",
    icon: "📚", color: "indigo", hskRange: "5-6",
    pathIds: ["cecr-c12-chengyu-advanced", "cecr-c12-business", "cecr-c12-education-system", "cecr-c12-law-society"]
  },
  {
    level: "c2.1", order: 9,
    name: "C2.1 — Maîtrise débutante", nameEn: "C2.1 — Mastery Novice",
    description: "Wenyan basique, poésie Tang/Song, Quatre Grands Romans.",
    descriptionEn: "Basic wenyan, Tang/Song poetry, Four Great Novels.",
    icon: "🏮", color: "purple", hskRange: "6",
    pathIds: ["cecr-c21-wenyan-intro", "cecr-c21-philo-classique", "cecr-c21-poetry"]
  },
  {
    level: "c2.2", order: 10,
    name: "C2.2 — Maîtrise", nameEn: "C2.2 — Mastery",
    description: "Philosophie (儒/道/佛), Quatre Livres, esthétique, spécialisés.",
    descriptionEn: "Philosophy (Confucian/Taoist/Buddhist), Four Books, aesthetics, specialties.",
    icon: "☯️", color: "rose", hskRange: "7",
    pathIds: ["cecr-c22-rhetoric-translation", "cecr-c22-modern-lit", "cecr-c22-dialects", "cecr-c22-global-china"]
  }
];

export const cecrLessonPaths: LessonPath[] = [
  // ========================================================================
  // ========================================================================
  // NIVEAU 1 — A1 FONDATIONS (28 leçons)
  // ========================================================================
  {
    id: "cecr-a1-pinyin",
    name: "Pinyin & tons",
    nameEn: "Pinyin & Tones",
    description: "Lire le mandarin sans caractère : initiales, finales, 4 tons, sandhi.",
    descriptionEn: "Read Mandarin without characters: initials, finals, 4 tones, sandhi.",
    icon: "🔤",
    color: "blue",
    lessons: [
      {
        id: "cecr-a1-pinyin-m1",
        title: "Les 4 tons du mandarin",
        titleEn: "The 4 tones of Mandarin",
        duration: 15, locked: false, completed: false,
        hskLevel: 1, hskLevels: [1], category: "pronunciation", difficulty: "beginner",
        tags: ["pronunciation", "tones", "cecr:a1"],
        introduction: {
          title: "4 tons, 4 mots différents",
          titleEn: "4 tones, 4 different words",
          content: "La même syllabe 'ma' peut vouloir dire « maman » (mā, ton 1), « chanvre » (má, ton 2), « cheval » (mǎ, ton 3) ou « gronder » (mà, ton 4). Le mandarin n'a pas d'accent tonique comme le français : la musique de chaque syllabe change son sens. Ton 1 = aigu et plat. Ton 2 = montant (comme une question). Ton 3 = descendant puis remontant (le plus capricieux). Ton 4 = descendant, sec.",
          contentEn: "The same syllable 'ma' can mean «mom» (mā, tone 1), «hemp» (má, tone 2), «horse» (mǎ, tone 3), or «scold» (mà, tone 4). Mandarin has no stress accent like French: each syllable's pitch changes its meaning. Tone 1 = high and flat. Tone 2 = rising (like a question). Tone 3 = dipping down then up (the trickiest). Tone 4 = falling, sharp.",
          objectives: [
            "Reconnaître à l'oreille les 4 tons sur une même syllabe (mā má mǎ mà)",
            "Reproduire le mouvement mélodique de chaque ton",
            "Lire la notation pinyin avec accents (ā á ǎ à)",
            "Éviter l'erreur classique : prononcer un ton 3 trop long"
          ],
          objectivesEn: [
            "Hear the 4 tones on the same syllable (mā má mǎ mà)",
            "Reproduce each tone's melodic movement",
            "Read pinyin with tone marks (ā á ǎ à)",
            "Avoid the classic mistake: over-lengthening tone 3"
          ]
        },
        flashcards: ["mā", "má", "mǎ", "mà", "ma", "一", "二", "三", "四"],
        quizQuestions: 8,
        learnSections: pinyinTonesLearnSections
      },
      {
        id: "cecr-a1-pinyin-m2",
        title: "Initiales : b p m f d t n l",
        titleEn: "Initials: b p m f d t n l",
        duration: 12, locked: false, completed: false,
        hskLevel: 1, hskLevels: [1], category: "pronunciation", difficulty: "beginner",
        tags: ["pronunciation", "initials", "cecr:a1"],
        introduction: {
          title: "Les 8 consonnes faciles",
          titleEn: "The 8 easy consonants",
          content: "Ces 8 initiales se prononcent presque comme en français — c'est votre rampe d'accès. Attention : en mandarin, 'b' et 'p' se distinguent par l'aspiration (souffle d'air), pas par la sonorité comme en français. Mettez votre main devant la bouche : 'p' de 爬 (pá) doit éteindre une bougie, pas 'b' de 八 (bā). Idem pour d/t.",
          contentEn: "These 8 initials sound almost like French — your on-ramp. Watch out: in Mandarin, 'b' vs 'p' differ by aspiration (puff of air), not voicing as in French. Put your hand in front of your mouth: 'p' in 爬 (pá) should blow out a candle, 'b' in 八 (bā) shouldn't. Same for d/t.",
          objectives: [
            "Distinguer b/p par l'aspiration, pas la sonorité",
            "Prononcer 爸爸 (bàba) vs 怕 (pà) sans confusion",
            "Lire 妈 ma, 大 dà, 你 nǐ, 来 lái au premier essai",
            "Repérer l'initiale d'une syllabe en pinyin"
          ],
          objectivesEn: [
            "Tell b/p apart by aspiration, not voicing",
            "Pronounce 爸爸 (bàba) vs 怕 (pà) without confusion",
            "Read 妈 ma, 大 dà, 你 nǐ, 来 lái on first try",
            "Spot the initial of a pinyin syllable"
          ]
        },
        flashcards: ["爸", "妈", "不", "大", "他", "你", "来", "了"],
        quizQuestions: 8,
        learnSections: pinyinInitials1LearnSections
      },
      {
        id: "cecr-a1-pinyin-m3",
        title: "Initiales : g k h j q x",
        titleEn: "Initials: g k h j q x",
        duration: 12, locked: false, completed: false,
        hskLevel: 1, hskLevels: [1], category: "pronunciation", difficulty: "beginner",
        tags: ["pronunciation", "initials", "cecr:a1"],
        introduction: {
          title: "Le piège du j/q/x",
          titleEn: "The j/q/x trap",
          content: "g/k/h sont presque comme en français (attention : 'h' est plus rauque, comme le 'j' espagnol). Mais j/q/x sont des sons uniques au mandarin : ils se prononcent devant 'i' ou 'ü' avec la langue aplatie contre le palais. 'j' ≈ 'dj' doux, 'q' ≈ 'tch' doux, 'x' ≈ 'ch' très léger. Pensez à sourire en les disant.",
          contentEn: "g/k/h are almost like French (note: 'h' is more raspy, like Spanish 'j'). But j/q/x are Mandarin-only sounds: pronounced before 'i' or 'ü' with the tongue flat against the palate. 'j' ≈ soft 'dj', 'q' ≈ soft 'tch', 'x' ≈ very light 'ch'. Smile while saying them.",
          objectives: [
            "Aplatir la langue au palais pour j/q/x",
            "Distinguer 家 jiā, 去 qù, 小 xiǎo",
            "Ne pas prononcer 'h' comme un 'h' français muet",
            "Reproduire 哥哥 gēge et 看 kàn"
          ],
          objectivesEn: [
            "Flatten the tongue against the palate for j/q/x",
            "Tell 家 jiā, 去 qù, 小 xiǎo apart",
            "Don't pronounce 'h' like a silent French 'h'",
            "Reproduce 哥哥 gēge and 看 kàn"
          ]
        },
        flashcards: ["哥", "看", "好", "家", "去", "小", "喝", "今天"],
        quizQuestions: 8,
        learnSections: pinyinInitials2LearnSections
      },
      {
        id: "cecr-a1-pinyin-m4",
        title: "Initiales : zh ch sh r z c s",
        titleEn: "Initials: zh ch sh r z c s",
        duration: 14, locked: false, completed: false,
        hskLevel: 1, hskLevels: [1], category: "pronunciation", difficulty: "beginner",
        tags: ["pronunciation", "initials", "cecr:a1"],
        introduction: {
          title: "Rétroflexes & sifflantes",
          titleEn: "Retroflex & sibilants",
          content: "zh/ch/sh/r sont les sons les plus difficiles pour un francophone : la langue se recourbe vers l'arrière (rétroflexe). Ils s'opposent à z/c/s où la langue reste plate contre les dents du bas. Ne pas confondre : 四 sì (quatre) ≠ 是 shì (être). L'accent pékinois est très rétroflexe, le shanghaïen plus plat — partout intelligible, rassurez-vous.",
          contentEn: "zh/ch/sh/r are the hardest sounds for French speakers: the tongue curls back (retroflex). They contrast with z/c/s where the tongue stays flat against the lower teeth. Don't mix up: 四 sì (four) ≠ 是 shì (to be). Beijing accent is highly retroflex, Shanghai flatter — both intelligible everywhere.",
          objectives: [
            "Recourber la langue pour zh/ch/sh/r",
            "Distinguer 是 shì vs 四 sì",
            "Placer la langue plate pour z/c/s",
            "Prononcer 中国 Zhōngguó et 吃 chī"
          ],
          objectivesEn: [
            "Curl the tongue back for zh/ch/sh/r",
            "Tell 是 shì from 四 sì",
            "Flatten the tongue for z/c/s",
            "Say 中国 Zhōngguó and 吃 chī"
          ]
        },
        flashcards: ["中", "吃", "是", "人", "字", "菜", "说", "什么"],
        quizQuestions: 8,
        learnSections: pinyinInitials3LearnSections
      },
      {
        id: "cecr-a1-pinyin-m5",
        title: "Finales & diphtongues",
        titleEn: "Finals & diphthongs",
        duration: 12, locked: false, completed: false,
        hskLevel: 1, hskLevels: [1], category: "pronunciation", difficulty: "beginner",
        tags: ["pronunciation", "finals", "cecr:a1"],
        introduction: {
          title: "Les voyelles qui glissent",
          titleEn: "Vowels that glide",
          content: "Après l'initiale vient la finale : simple (a, o, e, i, u, ü) ou composée (ai, ei, ao, ou, an, en, ang, eng). Chaque syllabe mandarine = une initiale (optionnelle) + une finale. Point délicat : le 'ü' (écrit 'u' après j/q/x/y) se prononce comme le 'u' français de « lune ». Le '-ng' final se sent dans le nez mais sans prononcer le 'g'.",
          contentEn: "After the initial comes the final: simple (a, o, e, i, u, ü) or compound (ai, ei, ao, ou, an, en, ang, eng). Each Mandarin syllable = optional initial + final. Tricky bit: 'ü' (written 'u' after j/q/x/y) sounds like French 'u' in «lune». Final '-ng' nasalizes but doesn't pronounce the 'g'.",
          objectives: [
            "Prononcer le 'ü' comme le 'u' français",
            "Nasaliser -ng sans dire le 'g'",
            "Différencier -an (clair) vs -ang (profond)",
            "Lire 爱 ài, 要 yào, 冷 lěng"
          ],
          objectivesEn: [
            "Pronounce 'ü' like French 'u'",
            "Nasalize -ng without pronouncing the 'g'",
            "Tell -an (clear) from -ang (deep)",
            "Read 爱 ài, 要 yào, 冷 lěng"
          ]
        },
        flashcards: ["爱", "要", "也", "月", "有", "冷", "能", "还"],
        quizQuestions: 8,
        learnSections: pinyinFinalsLearnSections
      },
      {
        id: "cecr-a1-pinyin-m6",
        title: "Sandhi du 3e ton & changements 不/一",
        titleEn: "3rd-tone sandhi & 不/一 shifts",
        duration: 14, locked: false, completed: false,
        hskLevel: 1, hskLevels: [1, 2], category: "pronunciation", difficulty: "elementary",
        tags: ["pronunciation", "sandhi", "cecr:a1"],
        introduction: {
          title: "Quand les tons changent tout seuls",
          titleEn: "When tones shift on their own",
          content: "Deux 3e tons consécutifs = le premier devient 2e ton : 你好 s'écrit nǐ hǎo mais se prononce ní hǎo. Le caractère 不 (bù) devient bú devant un 4e ton : 不是 = bú shì. Le caractère 一 (yī) devient yí devant un 4e ton (一定 yídìng) et yì devant les autres (一起 yìqǐ). Ces sandhi s'apprennent comme des règles automatiques.",
          contentEn: "Two 3rd tones in a row = the first becomes 2nd tone: 你好 is written nǐ hǎo but pronounced ní hǎo. 不 (bù) becomes bú before a 4th tone: 不是 = bú shì. 一 (yī) becomes yí before a 4th tone (一定 yídìng) and yì before others (一起 yìqǐ). These sandhi are learned as automatic rules.",
          objectives: [
            "Appliquer le sandhi 3+3 → 2+3 automatiquement",
            "Changer 不 en bú devant un 4e ton",
            "Adapter le ton de 一 selon la suite",
            "Dire 你好 (ní hǎo) sans hésiter"
          ],
          objectivesEn: [
            "Apply 3+3 → 2+3 sandhi automatically",
            "Shift 不 to bú before a 4th tone",
            "Adapt 一's tone depending on what follows",
            "Say 你好 (ní hǎo) fluently"
          ]
        },
        flashcards: ["你好", "很好", "不是", "不要", "一个", "一起", "很多", "走"],
        quizQuestions: 8,
        learnSections: pinyinPracticeLearnSections
      }
    ]
  },
  {
    id: "cecr-a1-hello",
    name: "Salutations & présentations",
    nameEn: "Greetings & Introductions",
    description: "Saluer, se présenter, dire d'où on vient.",
    descriptionEn: "Greet, introduce yourself, say where you're from.",
    icon: "👋",
    color: "cyan",
    lessons: [
      {
        id: "cecr-a1-hello-m1",
        title: "Dire bonjour & au revoir",
        titleEn: "Say hello & goodbye",
        duration: 10, locked: false, completed: false,
        hskLevel: 1, hskLevels: [1], category: "conversation", difficulty: "beginner",
        tags: ["greetings", "conversation", "cecr:a1"],
        introduction: {
          title: "Les 8 salutations qui couvrent 90% des situations",
          titleEn: "The 8 greetings that cover 90% of situations",
          content: "你好 est universel. 您好 (nín hǎo) est la forme polie (client, personne âgée, supérieur). Le chinois précise souvent le moment : 早上好 (matin), 下午好 (après-midi), 晚上好 (soir). Pour partir : 再见 (« à se revoir »), ou plus précis 明天见 (« à demain »), 下周见 (« à la semaine prochaine »). 晚安 = bonne nuit. Dans un contexte familier les jeunes disent 拜拜 (bái bái, emprunté à l'anglais).",
          contentEn: "你好 is universal. 您好 (nín hǎo) is the polite form (customer, elder, superior). Chinese often specifies the time: 早上好 (morning), 下午好 (afternoon), 晚上好 (evening). To leave: 再见 («see again»), or more specific 明天见 («see you tomorrow»), 下周见 («see you next week»). 晚安 = good night. Informal young speakers say 拜拜 (bái bái, borrowed from English).",
          objectives: [
            "Choisir entre 你好 et 您好 selon le contexte",
            "Utiliser 早上好 / 晚上好 selon l'heure",
            "Varier les au revoir : 再见 / 明天见 / 晚安",
            "Éviter de dire 您好 entre amis (trop formel)"
          ],
          objectivesEn: [
            "Pick between 你好 and 您好 by context",
            "Use 早上好 / 晚上好 by time of day",
            "Vary goodbyes: 再见 / 明天见 / 晚安",
            "Avoid 您好 with friends (too formal)"
          ]
        },
        flashcards: ["你好", "您好", "早上好", "晚上好", "再见", "明天见", "晚安", "拜拜"],
        quizQuestions: 8,
        learnSections: greetingsLearnSections
      },
      {
        id: "cecr-a1-hello-m2",
        title: "Merci & s'excuser",
        titleEn: "Thanks & apologies",
        duration: 10, locked: false, completed: false,
        hskLevel: 1, hskLevels: [1], category: "conversation", difficulty: "beginner",
        tags: ["politeness", "conversation", "cecr:a1"],
        introduction: {
          title: "Merci, désolé — les 3 registres",
          titleEn: "Thanks, sorry — the 3 registers",
          content: "谢谢 (xièxie) pour remercier. Réponse attendue : 不客气 (bú kèqi, « de rien ») ou 没事 (familier). 对不起 (duìbuqǐ) = désolé (erreur sérieuse). 不好意思 (bù hǎoyìsi) = désolé plus léger, aussi pour interpeller un inconnu (« excusez-moi »). La réponse à 对不起 est 没关系 (méi guānxi, « ce n'est rien »). 请 (qǐng) sert pour « s'il vous plaît » et aussi pour inviter (« je vous en prie »).",
          contentEn: "谢谢 (xièxie) to thank. Expected reply: 不客气 (bú kèqi, «you're welcome») or casual 没事. 对不起 (duìbuqǐ) = sorry (serious mistake). 不好意思 (bù hǎoyìsi) = lighter sorry, also used to get a stranger's attention («excuse me»). Reply to 对不起: 没关系 (méi guānxi, «it's nothing»). 请 (qǐng) means «please» and also «please go ahead».",
          objectives: [
            "Distinguer 对不起 (grave) de 不好意思 (léger)",
            "Répondre correctement : 不客气, 没关系",
            "Interpeller un inconnu avec 不好意思",
            "Utiliser 请 dans les deux sens (svp / je vous en prie)"
          ],
          objectivesEn: [
            "Tell 对不起 (serious) from 不好意思 (light)",
            "Reply correctly: 不客气, 没关系",
            "Address a stranger with 不好意思",
            "Use 请 both ways (please / go ahead)"
          ]
        },
        flashcards: ["谢谢", "不客气", "对不起", "没关系", "不好意思", "请", "打扰了", "麻烦你"],
        quizQuestions: 8,
        learnSections: politenessLearnSections
      },
      {
        id: "cecr-a1-hello-m3",
        title: "Se présenter",
        titleEn: "Introduce yourself",
        duration: 12, locked: false, completed: false,
        hskLevel: 1, hskLevels: [1], category: "conversation", difficulty: "beginner",
        tags: ["introduction", "conversation", "cecr:a1"],
        introduction: {
          title: "Dire son nom en chinois — 2 structures",
          titleEn: "Say your name in Chinese — 2 structures",
          content: "Deux façons de dire son nom : 我叫 + nom complet (« on m'appelle X », usuel) ou 我姓 + nom de famille (« mon nom de famille est X », pour se présenter formellement, souvent suivi de 我叫 + prénom). Pour demander : 你叫什么名字 ? (« comment t'appelles-tu ? »). Le classique 很高兴认识你 (« enchanté de te connaître ») est la bonne réponse après la présentation. 我也 = « moi aussi ».",
          contentEn: "Two ways to say your name: 我叫 + full name («I'm called X», usual) or 我姓 + family name («my last name is X», more formal, often followed by 我叫 + first name). To ask: 你叫什么名字? («what's your name?»). The classic 很高兴认识你 («nice to meet you») is the right reply after introductions. 我也 = «me too».",
          objectives: [
            "Se présenter avec 我叫 + nom complet",
            "Utiliser 我姓 dans un contexte formel",
            "Demander 你叫什么名字 ?",
            "Répondre 很高兴认识你, 我也是"
          ],
          objectivesEn: [
            "Introduce yourself with 我叫 + full name",
            "Use 我姓 in formal settings",
            "Ask 你叫什么名字?",
            "Reply 很高兴认识你, 我也是"
          ]
        },
        flashcards: ["我叫", "我是", "你叫什么", "名字", "很高兴", "认识", "你呢", "我也是"],
        quizQuestions: 8,
        learnSections: introductionsLearnSections
      },
      {
        id: "cecr-a1-hello-m4",
        title: "D'où viens-tu ?",
        titleEn: "Where are you from?",
        duration: 10, locked: false, completed: false,
        hskLevel: 1, hskLevels: [1, 2], category: "conversation", difficulty: "beginner",
        tags: ["origin", "conversation", "cecr:a1"],
        introduction: {
          title: "Pays, nationalités, origine",
          titleEn: "Countries, nationalities, origin",
          content: "La structure typique est 我来自 + pays ou 我是 + pays + 人 (« je suis X-ais »). Exemple : 我来自法国 = 我是法国人 = « je viens de France / je suis français ». Le suffixe 人 (personne) attaché à un pays donne la nationalité : 中国人 (Chinois), 美国人 (Américain), 日本人 (Japonais). Pour demander : 你是哪国人 ? (« tu es de quel pays ? ») ou 你从哪里来 ? (« d'où viens-tu ? »).",
          contentEn: "Typical structure: 我来自 + country or 我是 + country + 人 («I am X-ish»). Example: 我来自法国 = 我是法国人 = «I'm from France / I'm French». The suffix 人 (person) with a country gives the nationality: 中国人 (Chinese), 美国人 (American), 日本人 (Japanese). To ask: 你是哪国人? («what country are you from?») or 你从哪里来? («where do you come from?»).",
          objectives: [
            "Choisir entre 我来自X et 我是X人",
            "Former une nationalité en ajoutant 人",
            "Poser 你是哪国人 ?",
            "Répondre naturellement sans hésiter"
          ],
          objectivesEn: [
            "Pick between 我来自X and 我是X人",
            "Form a nationality by adding 人",
            "Ask 你是哪国人?",
            "Reply naturally without hesitating"
          ]
        },
        flashcards: ["哪里", "来自", "中国", "法国", "美国", "英国", "国家", "人"],
        quizQuestions: 8,
        learnSections: nationalitiesLearnSections
      }
    ]
  }
  ,
  {
    id: "cecr-a1-numbers",
    name: "Nombres & temps",
    nameEn: "Numbers & Time",
    description: "Compter, dire l'heure, les jours, les dates, l'âge.",
    descriptionEn: "Count, tell the time, days, dates, age.",
    icon: "🔢",
    color: "purple",
    lessons: [
      {
        id: "cecr-a1-numbers-m1",
        title: "Compter de 0 à 10",
        titleEn: "Count 0 to 10",
        duration: 10, locked: false, completed: false,
        hskLevel: 1, hskLevels: [1], category: "vocabulary", difficulty: "beginner",
        tags: ["numbers", "vocabulary", "cecr:a1"],
        introduction: {
          title: "11 caractères pour toute une vie",
          titleEn: "11 characters for a lifetime",
          content: "Les nombres 0-10 sont une vraie économie d'apprentissage : 11 caractères suffisent ensuite pour dire n'importe quel nombre. 零 = zéro (moderne) ou ○ (écriture occasionnelle). Les caractères 一 二 三 quatre quatre 四 sont parmi les plus simples de l'écriture chinoise. Particularité : 两 (liǎng) remplace 二 quand on compte des objets (两个 ≠ 二个). Ce distinguo arrive dès qu'on utilise un classificateur — patience, on y revient.",
          contentEn: "Numbers 0-10 are a learning bargain: 11 characters get you to any number. 零 = zero (modern) or ○ (occasional writing). 一 二 三 are among the simplest Chinese characters. Twist: 两 (liǎng) replaces 二 when counting objects (两个 ≠ 二个). This distinction kicks in as soon as you use a classifier — more on that soon.",
          objectives: [
            "Mémoriser 0-10 en caractères et pinyin",
            "Connaître la nuance 二 (abstrait) vs 两 (comptable)",
            "Lire une date simple : 六月八日",
            "Prononcer avec le bon ton (一 yī, 二 èr, 三 sān...)"
          ],
          objectivesEn: [
            "Memorize 0-10 as characters and pinyin",
            "Know the 二 (abstract) vs 两 (countable) nuance",
            "Read a simple date: 六月八日",
            "Say each with the correct tone"
          ]
        },
        flashcards: ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"],
        quizQuestions: 8,
        learnSections: numbersLearnSections
      },
      {
        id: "cecr-a1-numbers-m2",
        title: "De 11 à 100",
        titleEn: "From 11 to 100",
        duration: 10, locked: false, completed: false,
        hskLevel: 1, hskLevels: [1, 2], category: "vocabulary", difficulty: "beginner",
        tags: ["numbers", "vocabulary", "cecr:a1"],
        introduction: {
          title: "La logique mathématique parfaite",
          titleEn: "Perfectly mathematical logic",
          content: "Le chinois compte exactement comme on l'écrit : 十一 = 10+1 = 11. 二十 = 2×10 = 20. 二十一 = 2×10+1 = 21. 一百 = 100, 一百零五 = 100+0+5 = 105 (le 零 est obligatoire pour marquer la 'dizaine vide'). Cette régularité bat largement le français (soixante-dix, quatre-vingt-dix). Un piège : pour 200, on peut dire 两百 ou 二百, les deux passent. Mille = 千, dix mille = 万 (et non « dix mille »).",
          contentEn: "Chinese counts exactly as you'd write it: 十一 = 10+1 = 11. 二十 = 2×10 = 20. 二十一 = 2×10+1 = 21. 一百 = 100, 一百零五 = 100+0+5 = 105 (the 零 is needed to mark the 'empty tens'). This regularity beats French (soixante-dix, quatre-vingt-dix). Tiny trap: 200 can be 两百 or 二百. 千 = 1000, 万 = 10,000 (one word, not «ten thousand»).",
          objectives: [
            "Former n'importe quel nombre 11-99",
            "Placer le 零 pour les dizaines vides (105 = 一百零五)",
            "Distinguer 两百 et 二百",
            "Lire 千 et 万 correctement"
          ],
          objectivesEn: [
            "Build any number 11-99",
            "Insert 零 for empty tens (105 = 一百零五)",
            "Distinguish 两百 and 二百",
            "Read 千 and 万 correctly"
          ]
        },
        flashcards: ["十一", "二十", "五十", "九十九", "一百", "两百", "五百", "一千"],
        quizQuestions: 8,
        learnSections: numbersExtendedLearnSections
      },
      {
        id: "cecr-a1-numbers-m3",
        title: "Jours & semaine",
        titleEn: "Days of the week",
        duration: 12, locked: false, completed: false,
        hskLevel: 1, hskLevels: [1], category: "vocabulary", difficulty: "beginner",
        tags: ["time", "vocabulary", "cecr:a1"],
        introduction: {
          title: "Semaine numérotée + exception du dimanche",
          titleEn: "Numbered week + the Sunday exception",
          content: "Les jours sont numérotés : 星期一 = lundi, 星期二 = mardi... jusqu'à 星期六 = samedi. Exception : le dimanche se dit 星期天 ou 星期日 (jamais 星期七). 周 est un synonyme plus court de 星期 : 周一 = 星期一. 礼拜 est un troisième synonyme, plus familier. 今天 / 明天 / 昨天 = aujourd'hui / demain / hier. Pour dire « la semaine prochaine » : 下个星期 (ou 下周).",
          contentEn: "Days are numbered: 星期一 = Monday, 星期二 = Tuesday... up to 星期六 = Saturday. Exception: Sunday is 星期天 or 星期日 (never 星期七). 周 is a shorter synonym for 星期: 周一 = 星期一. 礼拜 is a third, more colloquial synonym. 今天 / 明天 / 昨天 = today / tomorrow / yesterday. «Next week» is 下个星期 (or 下周).",
          objectives: [
            "Lister les 7 jours sans hésiter",
            "Ne pas dire 星期七 pour dimanche",
            "Alterner 星期 / 周 / 礼拜",
            "Construire « lundi prochain » : 下个星期一"
          ],
          objectivesEn: [
            "List all 7 days fluently",
            "Avoid 星期七 for Sunday",
            "Alternate 星期 / 周 / 礼拜",
            "Build «next Monday»: 下个星期一"
          ]
        },
        flashcards: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期天", "今天", "明天", "昨天"],
        quizQuestions: 8,
        learnSections: weekDaysLearnSections
      },
      {
        id: "cecr-a1-numbers-m4",
        title: "L'heure qu'il est",
        titleEn: "What time is it",
        duration: 12, locked: false, completed: false,
        hskLevel: 1, hskLevels: [1, 2], category: "vocabulary", difficulty: "beginner",
        tags: ["time", "vocabulary", "cecr:a1"],
        introduction: {
          title: "现在几点 ? La structure de l'heure",
          titleEn: "现在几点? How Chinese tells time",
          content: "Demander l'heure : 现在几点 ? (« maintenant, quelle heure ? »). Dire une heure pile : 三点 (3 h). Avec minutes : 三点十分 (3h10). Et demi : 三点半 (3h30). Un quart : 三点一刻 (3h15), trois quarts : 三点三刻 (3h45). Pour préciser le moment : 早上八点 (8h du matin), 下午三点 (15h), 晚上十点 (22h). Le chinois préfère l'horloge 12h avec précision du moment que l'horloge 24h.",
          contentEn: "Ask the time: 现在几点? («now, what hour?»). On the hour: 三点 (3:00). With minutes: 三点十分 (3:10). Half past: 三点半 (3:30). Quarter past: 三点一刻 (3:15), quarter to: 三点三刻 (3:45). To specify: 早上八点 (8 AM), 下午三点 (3 PM), 晚上十点 (10 PM). Chinese prefers 12-hour clock with time-of-day markers over 24-hour.",
          objectives: [
            "Demander 现在几点 ?",
            "Dire une heure pile, demie, avec minutes",
            "Préciser le moment : 早上 / 下午 / 晚上",
            "Lire 三点半 et 三点一刻"
          ],
          objectivesEn: [
            "Ask 现在几点?",
            "Say sharp hour, half, with minutes",
            "Specify period: 早上 / 下午 / 晚上",
            "Read 三点半 and 三点一刻"
          ]
        },
        flashcards: ["现在", "几点", "点", "分", "半", "刻", "早上", "晚上", "中午"],
        quizQuestions: 8,
        learnSections: timeLearnSections
      },
      {
        id: "cecr-a1-numbers-m5",
        title: "Mois & dates",
        titleEn: "Months & dates",
        duration: 12, locked: false, completed: false,
        hskLevel: 1, hskLevels: [1, 2], category: "vocabulary", difficulty: "beginner",
        tags: ["time", "vocabulary", "cecr:a1"],
        introduction: {
          title: "Date à la chinoise : grand → petit",
          titleEn: "Chinese dates: big to small",
          content: "Les mois se construisent par numérotation : 一月 = janvier, 十二月 = décembre. Pour dire une date : 六月八日 ou 六月八号 (« 8 juin »). L'ordre chinois est toujours du plus grand au plus petit : année → mois → jour (opposé du français et anglais). Exemple : 2026年4月18日 = « le 18 avril 2026 ». 号 (familier) et 日 (formel) sont interchangeables pour le jour. 今年 / 去年 / 明年 = cette année / l'an dernier / l'an prochain.",
          contentEn: "Months are numbered: 一月 = January, 十二月 = December. To say a date: 六月八日 or 六月八号 («June 8»). Chinese order is always big to small: year → month → day (opposite of English). Example: 2026年4月18日 = «April 18, 2026». 号 (casual) and 日 (formal) are interchangeable for the day. 今年 / 去年 / 明年 = this / last / next year.",
          objectives: [
            "Former n'importe quelle date en chinois",
            "Respecter l'ordre grand → petit",
            "Alterner 号 (oral) et 日 (écrit)",
            "Dire « mon anniversaire est le X »"
          ],
          objectivesEn: [
            "Build any date in Chinese",
            "Respect the big → small order",
            "Alternate 号 (oral) and 日 (formal)",
            "Say «my birthday is on X»"
          ]
        },
        flashcards: ["一月", "二月", "号", "月", "年", "今年", "去年", "明年", "生日"],
        quizQuestions: 8,
        learnSections: monthsDatesLearnSections
      }
    ]
  },
  {
    id: "cecr-a1-family",
    name: "Famille & moi",
    nameEn: "Family & Me",
    description: "Parler de sa famille, son âge, ses proches.",
    descriptionEn: "Talk about family, age, close relatives.",
    icon: "👨‍👩‍👧",
    color: "orange",
    lessons: [
      {
        id: "cecr-a1-family-m1",
        title: "Les membres de la famille",
        titleEn: "Family members",
        duration: 12, locked: false, completed: false,
        hskLevel: 1, hskLevels: [1], category: "vocabulary", difficulty: "beginner",
        tags: ["family", "vocabulary", "cecr:a1"],
        introduction: {
          title: "Famille chinoise : 8 mots noyau",
          titleEn: "Chinese family: 8 core words",
          content: "Le chinois redouble souvent les syllabes pour les mots d'affection : 爸爸 (papa), 妈妈 (maman), 哥哥 (grand frère), 姐姐 (grande sœur), 弟弟 (petit frère), 妹妹 (petite sœur). Crucial : le chinois distingue toujours aîné / cadet dans la fratrie — impossible de dire juste « frère ». 爷爷 = grand-père paternel, 奶奶 = grand-mère paternelle (le maternel utilise 外公/外婆, plus tard). 我的 = « le mien ».",
          contentEn: "Chinese often doubles syllables for affectionate words: 爸爸 (dad), 妈妈 (mom), 哥哥 (older brother), 姐姐 (older sister), 弟弟 (younger brother), 妹妹 (younger sister). Key point: Chinese always distinguishes elder/younger in siblings — no plain «brother». 爷爷 = paternal grandfather, 奶奶 = paternal grandmother (maternal uses 外公/外婆, later). 我的 = «mine».",
          objectives: [
            "Nommer 8 membres de famille proche",
            "Distinguer 哥哥 et 弟弟 (aîné/cadet)",
            "Former 我的爸爸 avec 的",
            "Comprendre le redoublement affectif (爸爸, 妈妈)"
          ],
          objectivesEn: [
            "Name 8 core family members",
            "Tell 哥哥 from 弟弟 (elder/younger)",
            "Build 我的爸爸 with 的",
            "Understand affectionate doubling (爸爸, 妈妈)"
          ]
        },
        flashcards: ["爸爸", "妈妈", "哥哥", "姐姐", "弟弟", "妹妹", "爷爷", "奶奶", "我的"],
        quizQuestions: 8,
        learnSections: familyLearnSections
      },
      {
        id: "cecr-a1-family-m2",
        title: "Mon âge, ton âge",
        titleEn: "My age, your age",
        duration: 10, locked: false, completed: false,
        hskLevel: 1, hskLevels: [1, 2], category: "conversation", difficulty: "beginner",
        tags: ["age", "conversation", "cecr:a1"],
        introduction: {
          title: "Demander l'âge — 3 façons",
          titleEn: "Asking age — 3 ways",
          content: "En chinois, on ne demande pas l'âge de la même façon à un enfant, un adulte et un aîné. À un enfant : 你几岁 ? (« tu as combien d'années ? »). À un adulte : 你多大 ? (« tu es grand comment ? »). À une personne âgée : 您多大年纪 ? (poli, littéralement « combien d'années d'âge »). Répondre : 我今年二十岁 (« j'ai 20 ans cette année »). Le 岁 (suì) est obligatoire comme classificateur d'âge.",
          contentEn: "In Chinese, you don't ask age the same way to a child, adult, or elder. To a child: 你几岁? («how many years old?»). To an adult: 你多大? («how big are you?»). To an elder: 您多大年纪? (polite, literally «how many years of age»). Reply: 我今年二十岁 («I'm 20 this year»). 岁 (suì) is the mandatory age classifier.",
          objectives: [
            "Choisir 几岁 / 多大 / 多大年纪 selon l'âge",
            "Répondre 我今年 + nombre + 岁",
            "Ne jamais oublier le classificateur 岁",
            "Retourner la question : 你呢 ? (et toi ?)"
          ],
          objectivesEn: [
            "Pick 几岁 / 多大 / 多大年纪 by age",
            "Answer 我今年 + number + 岁",
            "Always include the 岁 classifier",
            "Bounce the question: 你呢? (and you?)"
          ]
        },
        flashcards: ["多大", "岁", "我", "今年", "你呢", "他", "她", "大", "小"],
        quizQuestions: 8,
        learnSections: ageLearnSections
      },
      {
        id: "cecr-a1-family-m3",
        title: "Les pronoms de base",
        titleEn: "Basic pronouns",
        duration: 10, locked: false, completed: false,
        hskLevel: 1, hskLevels: [1], category: "grammar", difficulty: "beginner",
        tags: ["pronouns", "grammar", "cecr:a1"],
        introduction: {
          title: "Un pronom, un pluriel, zéro conjugaison",
          titleEn: "One pronoun, one plural, no conjugation",
          content: "Pronoms chinois : 我 (je), 你 (tu), 他 (il), 她 (elle), 它 (ça, pour objets/animaux). Pour le pluriel, on ajoute 们 : 我们 (nous), 你们 (vous), 他们 (ils). 她 et 它 ne se prononcent pas différemment de 他 — seul l'écrit distingue. 咱们 est un « nous inclusif » (toi + moi, nordiste), peu utilisé dans le sud. 大家 = « tout le monde », très courant. Et surtout : rien ne se conjugue — 我是 / 你是 / 他是 utilisent tous 是.",
          contentEn: "Chinese pronouns: 我 (I), 你 (you), 他 (he), 她 (she), 它 (it, for objects/animals). For plural, add 们: 我们 (we), 你们 (you all), 他们 (they). 她 and 它 sound the same as 他 — only writing distinguishes. 咱们 is an inclusive «we» (you + me, Northern), rare in the South. 大家 = «everyone», very common. And crucially: nothing conjugates — 我是 / 你是 / 他是 all use 是.",
          objectives: [
            "Lister les 5 pronoms singuliers",
            "Former le pluriel avec 们",
            "Distinguer 他 / 她 / 它 à l'écrit",
            "Accepter la simplicité : zéro conjugaison"
          ],
          objectivesEn: [
            "List the 5 singular pronouns",
            "Form plural with 们",
            "Tell 他 / 她 / 它 apart in writing",
            "Embrace the simplicity: no conjugation"
          ]
        },
        flashcards: ["我", "你", "他", "她", "我们", "你们", "他们", "它", "大家"],
        quizQuestions: 8,
        learnSections: pronounsLearnSections
      },
      {
        id: "cecr-a1-family-m4",
        title: "Les couleurs",
        titleEn: "Colors",
        duration: 10, locked: false, completed: false,
        hskLevel: 1, hskLevels: [1, 2], category: "vocabulary", difficulty: "beginner",
        tags: ["colors", "vocabulary", "cecr:a1"],
        introduction: {
          title: "Couleur = caractère + 色",
          titleEn: "Color = character + 色",
          content: "La plupart des couleurs se composent d'un adjectif + 色 (couleur) : 红色 (rouge), 蓝色 (bleu), 白色 (blanc), 黑色 (noir), 黄色 (jaune), 绿色 (vert). Le 色 est souvent optionnel dans l'usage oral : 我喜欢红 peut se dire 我喜欢红色. Culturellement, le rouge 红 est la couleur du bonheur et de la fête (mariage, Nouvel An), le blanc 白 celle du deuil et du funéraire. 黄色 = jaune mais attention, désigne aussi le contenu pour adultes (comme le bleu rose en français).",
          contentEn: "Most colors are adjective + 色 (color): 红色 (red), 蓝色 (blue), 白色 (white), 黑色 (black), 黄色 (yellow), 绿色 (green). 色 is often optional in speech: 我喜欢红 can be said for 我喜欢红色. Culturally, red 红 is happiness and celebration (wedding, New Year), white 白 is mourning. 黄色 = yellow but also means adult content (like «blue» in English).",
          objectives: [
            "Former une couleur : X + 色",
            "Savoir que 色 est souvent optionnel à l'oral",
            "Connaître la charge culturelle du rouge et du blanc",
            "Attention à l'ambiguïté de 黄色"
          ],
          objectivesEn: [
            "Build a color: X + 色",
            "Know 色 is often optional in speech",
            "Understand the cultural weight of red and white",
            "Watch out for the double meaning of 黄色"
          ]
        },
        flashcards: ["红色", "蓝色", "白色", "黑色", "黄色", "绿色", "颜色", "喜欢"],
        quizQuestions: 8,
        learnSections: colorsLearnSections
      }
    ]
  },
  {
    id: "cecr-a1-grammar",
    name: "Grammaire & vie quotidienne",
    nameEn: "Grammar & Daily Life",
    description: "Les briques de base : 是, 有, classificateurs, 也/都, 很, interrogatives — appliquées aux actions du quotidien.",
    descriptionEn: "Core building blocks: 是, 有, classifiers, 也/都, 很, question words — applied to daily actions.",
    icon: "🧩",
    color: "emerald",
    lessons: [
{
        id: "cecr-a1-grammar-m1",
        title: "Le verbe 是 (être)",
        titleEn: "The verb 是 (to be)",
        duration: 10, locked: false, completed: false,
        hskLevel: 1, hskLevels: [1], category: "grammar", difficulty: "beginner",
        tags: ["shi", "grammar", "cecr:a1"],
        introduction: {
          title: "是 ne sert QUE à identifier",
          titleEn: "是 is ONLY for identifying",
          content: "是 (shì) sert uniquement à identifier : X = Y. « Je suis étudiant » = 我是学生. « Elle est française » = 她是法国人. Piège majeur : on ne dit PAS 我是累了 (je suis fatigué) ni 她是漂亮 (elle est belle). Avec un adjectif, le chinois utilise 很 + adjectif directement : 我很累, 她很漂亮 — ici 很 n'a pas son sens de « très », c'est juste une liaison obligatoire. Rien ne se conjugue : 我是 / 你是 / 他是 / 我们是 — toujours 是.",
          contentEn: "是 (shì) is only for identifying: X = Y. «I am a student» = 我是学生. «She is French» = 她是法国人. Big trap: DON'T say 我是累了 (I'm tired) or 她是漂亮 (she's pretty). With an adjective, Chinese uses 很 + adjective directly: 我很累, 她很漂亮 — here 很 doesn't mean «very», it's just a required linker. Nothing conjugates: 我是 / 你是 / 他是 / 我们是 — always 是.",
          objectives: [
            "Utiliser 是 uniquement pour identifier",
            "Ne JAMAIS dire 是 + adjectif",
            "Utiliser 很 + adjectif à la place",
            "Construire des phrases type 我是学生"
          ],
          objectivesEn: [
            "Use 是 only for identification",
            "NEVER say 是 + adjective",
            "Use 很 + adjective instead",
            "Build sentences like 我是学生"
          ]
        },
        flashcards: ["是", "我是", "你是", "他是", "学生", "老师", "朋友", "中国人"],
        quizQuestions: 8,
        learnSections: shiVerbLearnSections
      },
      {
        id: "cecr-a1-grammar-m2",
        title: "La négation avec 不",
        titleEn: "Negation with 不",
        duration: 10, locked: false, completed: false,
        hskLevel: 1, hskLevels: [1], category: "grammar", difficulty: "beginner",
        tags: ["negation", "grammar", "cecr:a1"],
        introduction: {
          title: "不 se colle devant le verbe",
          titleEn: "不 goes directly before the verb",
          content: "不 (bù) se place toujours juste avant le verbe ou l'adjectif : 不是 (ne pas être), 不去 (ne pas aller), 不好 (pas bon), 不喜欢 (ne pas aimer). Aucune exception pour les verbes d'action et d'état, sauf pour 有 qui se nie avec 没 (pas 不有 ✗, mais 没有). Rappel crucial : 不 devient bú devant un 4e ton — 不是 se prononce bú shì, 不去 bú qù, 不要 bú yào. Ce sandhi est automatique et obligatoire.",
          contentEn: "不 (bù) always goes right before the verb or adjective: 不是 (not be), 不去 (not go), 不好 (not good), 不喜欢 (not like). No exception for action or stative verbs, except for 有 which is negated with 没 (not 不有 ✗, but 没有). Crucial: 不 shifts to bú before a 4th tone — 不是 pronounced bú shì, 不去 bú qù, 不要 bú yào. This sandhi is automatic and mandatory.",
          objectives: [
            "Placer 不 juste avant le verbe",
            "Appliquer le sandhi bù → bú (4e ton)",
            "Négation de 有 = 没有 (jamais 不有)",
            "Construire phrases : 我不是, 我不喜欢"
          ],
          objectivesEn: [
            "Place 不 right before the verb",
            "Apply bù → bú sandhi (4th tone)",
            "Negation of 有 = 没有 (never 不有)",
            "Build sentences: 我不是, 我不喜欢"
          ]
        },
        flashcards: ["不是", "不去", "不要", "不好", "不喜欢", "不能", "不会", "不对"],
        quizQuestions: 8,
        learnSections: buNegationLearnSections
      },
      {
        id: "cecr-a1-grammar-m3",
        title: "Les questions avec 吗",
        titleEn: "Yes/no questions with 吗",
        duration: 10, locked: false, completed: false,
        hskLevel: 1, hskLevels: [1], category: "grammar", difficulty: "beginner",
        tags: ["questions", "grammar", "cecr:a1"],
        introduction: {
          title: "Ajouter 吗 à la fin — c'est tout",
          titleEn: "Add 吗 at the end — that's it",
          content: "Pour poser une question fermée (réponse oui/non), on ajoute simplement 吗 (ma) à la fin d'une phrase affirmative : 你是学生 → 你是学生吗 ? (« es-tu étudiant ? »). Pas d'inversion, pas d'intonation spéciale. Attention : si la phrase contient déjà un mot interrogatif (什么, 哪里, 谁...), on NE met PAS 吗. La particule 呢 marque le retour de question : 我很好, 你呢 ? (« je vais bien, et toi ? »). Utile pour relancer.",
          contentEn: "To ask a yes/no question, just add 吗 (ma) at the end of a statement: 你是学生 → 你是学生吗? («are you a student?»). No inversion, no special intonation. Watch out: if the sentence already has a question word (什么, 哪里, 谁...), you do NOT add 吗. The particle 呢 bounces a question back: 我很好, 你呢? («I'm fine, and you?»). Useful to keep talk going.",
          objectives: [
            "Former une question en ajoutant 吗",
            "Ne pas utiliser 吗 avec 什么/哪里/谁",
            "Utiliser 呢 pour rebondir",
            "Répondre directement oui/non (没有 / 是)"
          ],
          objectivesEn: [
            "Make a question by adding 吗",
            "Don't use 吗 with 什么/哪里/谁",
            "Use 呢 to bounce back",
            "Answer directly yes/no (没有 / 是)"
          ]
        },
        flashcards: ["吗", "你好吗", "你是吗", "是吗", "对吗", "呢", "好吗", "可以吗"],
        quizQuestions: 8,
        learnSections: maQuestionsLearnSections
      },
      {
        id: "cecr-a1-grammar-m4",
        title: "Le 的 possessif",
        titleEn: "The possessive 的",
        duration: 10, locked: false, completed: false,
        hskLevel: 1, hskLevels: [1], category: "grammar", difficulty: "beginner",
        tags: ["possession", "de", "grammar", "cecr:a1"],
        introduction: {
          title: "Possesseur + 的 + possession",
          titleEn: "Possessor + 的 + thing",
          content: "Le 的 (de) relie le possesseur à la chose possédée : 我的书 (mon livre), 朋友的电话 (le téléphone de l'ami), 妈妈的衣服 (les vêtements de maman). Ordre inversé par rapport au français. Exception très importante : avec les proches parents et les amis, le 的 peut être omis : 我爸爸 (mon papa), 他妈妈 (sa maman), 我朋友 (mon ami). Le 的 fera l'objet de leçons plus poussées en B1.2 (qualifieur, nominaliseur), mais la possession reste son usage le plus simple.",
          contentEn: "的 (de) links possessor to possessed: 我的书 (my book), 朋友的电话 (friend's phone), 妈妈的衣服 (mom's clothes). Opposite order from English (with «of»). Very important exception: with close family and friends, 的 can be dropped: 我爸爸 (my dad), 他妈妈 (his mom), 我朋友 (my friend). 的 gets deeper treatment in B1.2 (qualifier, nominalizer), but possession is its easiest use.",
          objectives: [
            "Relier possesseur + 的 + possession",
            "Omettre 的 avec famille/amis : 我爸爸",
            "Former 谁的 ? (à qui ?)",
            "Accepter l'ordre inverse du français"
          ],
          objectivesEn: [
            "Link possessor + 的 + thing",
            "Drop 的 with family/friends: 我爸爸",
            "Build 谁的? (whose?)",
            "Accept the reverse word order"
          ]
        },
        flashcards: ["的", "我的", "你的", "他的", "谁的", "朋友的", "老师的", "学校的"],
        quizQuestions: 8,
        learnSections: dePossessiveLearnSections
      },
      {
        id: "cecr-a1-grammar-m5",
        title: "Les classificateurs 个 & 本",
        titleEn: "Classifiers 个 & 本",
        duration: 12, locked: false, completed: false,
        hskLevel: 1, hskLevels: [1], category: "grammar", difficulty: "beginner",
        tags: ["classifiers", "grammar", "cecr:a1"],
        introduction: {
          title: "En chinois, on ne compte jamais directement",
          titleEn: "In Chinese, you never count directly",
          content: "Entre le nombre et le nom, il faut TOUJOURS un classificateur : pas 一书 ✗ mais 一本书 (un livre). 个 (ge) est le classificateur passe-partout, utilisable presque partout : 一个人 (une personne), 一个苹果 (une pomme), 一个问题 (un problème). 本 est dédié aux livres et cahiers. Après 这 (ce) / 那 (ça), le classificateur est aussi obligatoire : 这个人 (cette personne), 那本书 (ce livre). Chaque objet a son classificateur « naturel » — 个 est la solution de secours correcte dans presque tous les cas.",
          contentEn: "Between a number and a noun, you ALWAYS need a classifier: not 一书 ✗ but 一本书 (one book). 个 (ge) is the all-purpose classifier, usable almost anywhere: 一个人 (one person), 一个苹果 (one apple), 一个问题 (one problem). 本 is dedicated to books and notebooks. After 这 (this) / 那 (that), the classifier is also required: 这个人 (this person), 那本书 (that book). Every object has its «natural» classifier — 个 is a safe fallback in most cases.",
          objectives: [
            "Ne jamais compter sans classificateur",
            "Utiliser 个 par défaut",
            "Utiliser 本 pour livres/cahiers",
            "Placer le classificateur après 这 / 那"
          ],
          objectivesEn: [
            "Never count without a classifier",
            "Use 个 by default",
            "Use 本 for books/notebooks",
            "Place the classifier after 这 / 那"
          ]
        },
        flashcards: ["个", "本", "一个", "两个", "一本书", "几本", "这个", "那个"],
        quizQuestions: 8,
        learnSections: classifiersLearnSections
      },
{
        id: "cecr-a1-daily-m1",
        title: "Manger & boire",
        titleEn: "Eat & drink",
        duration: 10, locked: false, completed: false,
        hskLevel: 1, hskLevels: [1], category: "vocabulary", difficulty: "beginner",
        tags: ["food", "vocabulary", "cecr:a1"],
        introduction: {
          title: "吃 / 喝 + un objet toujours",
          titleEn: "吃 / 喝 + always an object",
          content: "吃 (chī) = manger. 喝 (hē) = boire. Contrairement au français, ces verbes prennent presque toujours un objet en chinois : on ne dit pas « je mange » tout seul, mais 我吃饭 (je mange du riz / je prends un repas). 吃饭 est d'ailleurs l'expression idiomatique pour « prendre un repas ». Les classiques : 米饭 (riz blanc), 面条 (nouilles), 苹果 (pomme), 水 (eau), 茶 (thé), 牛奶 (lait). Piège : 饭 veut dire « riz cuit » mais aussi « repas ».",
          contentEn: "吃 (chī) = eat. 喝 (hē) = drink. Unlike English, these verbs almost always take an object in Chinese: not just «I eat», but 我吃饭 (I eat rice / I'm having a meal). 吃饭 is actually the idiom for «having a meal». Classics: 米饭 (cooked rice), 面条 (noodles), 苹果 (apple), 水 (water), 茶 (tea), 牛奶 (milk). Trap: 饭 means «cooked rice» and also «meal».",
          objectives: [
            "Ne jamais laisser 吃 ou 喝 seul",
            "Comprendre que 吃饭 = prendre un repas",
            "Distinguer 饭 (riz cuit) et 米 (riz non cuit)",
            "Former 我喝水 / 他吃面条"
          ],
          objectivesEn: [
            "Never leave 吃 or 喝 alone",
            "Understand 吃饭 = having a meal",
            "Distinguish 饭 (cooked rice) from 米 (uncooked)",
            "Build 我喝水 / 他吃面条"
          ]
        },
        flashcards: ["吃", "喝", "饭", "水", "茶", "米饭", "面条", "苹果", "牛奶"],
        quizQuestions: 8,
        learnSections: foodDrinksLearnSections
      },
      {
        id: "cecr-a1-daily-m2",
        title: "Aller quelque part",
        titleEn: "Go somewhere",
        duration: 10, locked: false, completed: false,
        hskLevel: 1, hskLevels: [1], category: "vocabulary", difficulty: "beginner",
        tags: ["movement", "vocabulary", "cecr:a1"],
        introduction: {
          title: "去 / 来 / 到 — trois directions",
          titleEn: "去 / 来 / 到 — three directions",
          content: "去 (qù) = aller (direction opposée au locuteur). 来 (lái) = venir (direction vers le locuteur). 到 (dào) = arriver à. Usage : 我去学校 (je vais à l'école), 请来这里 (viens ici), 我到家了 (je suis arrivé à la maison). En chinois, la destination se place directement après le verbe, sans préposition « à » : 去北京 (aller à Pékin), pas 去到北京. Question : 去哪里 ? (où vas-tu ?).",
          contentEn: "去 (qù) = go (direction away from speaker). 来 (lái) = come (toward speaker). 到 (dào) = arrive at. Usage: 我去学校 (I go to school), 请来这里 (come here), 我到家了 (I arrived home). In Chinese, the destination goes right after the verb — no preposition «to»: 去北京 (go to Beijing), not 去到北京. Question: 去哪里? (where are you going?).",
          objectives: [
            "Choisir 去 / 来 selon la direction",
            "Placer la destination sans préposition",
            "Poser 你去哪里 ?",
            "Différencier 到 (arriver) de 去 (aller)"
          ],
          objectivesEn: [
            "Pick 去 / 来 by direction",
            "Place destination without preposition",
            "Ask 你去哪里?",
            "Tell 到 (arrive) from 去 (go)"
          ]
        },
        flashcards: ["去", "来", "到", "家", "学校", "商店", "饭馆", "哪里"],
        quizQuestions: 8,
        learnSections: commonVerbsLearnSections
      },
      {
        id: "cecr-a1-daily-m3",
        title: "Parler, lire, écouter",
        titleEn: "Speak, read, listen",
        duration: 12, locked: false, completed: false,
        hskLevel: 1, hskLevels: [1, 2], category: "vocabulary", difficulty: "beginner",
        tags: ["skills", "vocabulary", "cecr:a1"],
        introduction: {
          title: "Les 5 verbes de la communication",
          titleEn: "The 5 communication verbs",
          content: "说 (shuō) = parler, dire. 看 (kàn) = regarder, lire (看书 = lire un livre, 看电视 = regarder la TV). 听 (tīng) = écouter. 读 (dú) = lire à voix haute, étudier. 写 (xiě) = écrire. Le chinois n'a pas un « lire » neutre : selon qu'on lit un livre (看书) ou qu'on étudie un texte (读课文), on change de verbe. Astuce : 说中文 / 看中文 / 写中文 forment le trio universel « parler/lire/écrire le chinois ».",
          contentEn: "说 (shuō) = speak, say. 看 (kàn) = watch, read (看书 = read a book, 看电视 = watch TV). 听 (tīng) = listen. 读 (dú) = read aloud, study. 写 (xiě) = write. Chinese has no neutral «read»: whether you read a book (看书) or study a text (读课文), you switch verbs. Tip: 说中文 / 看中文 / 写中文 form the universal trio «speak/read/write Chinese».",
          objectives: [
            "Distinguer 看 (regarder) et 读 (étudier)",
            "Construire 说中文 / 听音乐",
            "Ne pas confondre 看 et 看见 (on y reviendra)",
            "Former le trio 说 + 看 + 写"
          ],
          objectivesEn: [
            "Tell 看 (watch) from 读 (study)",
            "Build 说中文 / 听音乐",
            "Don't mix 看 and 看见 (later)",
            "Form the trio 说 + 看 + 写"
          ]
        },
        flashcards: ["说", "看", "听", "读", "写", "中文", "书", "电视"],
        quizQuestions: 8,
        learnSections: dailyActionsLearnSections
      },
      {
        id: "cecr-a1-daily-m4",
        title: "Avoir & ne pas avoir 有/没有",
        titleEn: "Have & not have 有/没有",
        duration: 10, locked: false, completed: false,
        hskLevel: 1, hskLevels: [1], category: "grammar", difficulty: "beginner",
        tags: ["you", "meiyou", "grammar", "cecr:a1"],
        introduction: {
          title: "有 = avoir + il y a",
          titleEn: "有 = have + there is/are",
          content: "有 (yǒu) a deux usages : possession (« avoir ») et existence (« il y a »). 我有两个苹果 (j'ai deux pommes) + 桌上有一本书 (il y a un livre sur la table). Sa négation est toujours 没有 (méi yǒu), jamais 不有 ✗ — c'est une des rares irrégularités du chinois. Aussi : 没 peut se dire sans 有 dans des structures comme 我没吃 (je n'ai pas mangé) — mais ça, c'est B1.1. Pour l'instant : 有 / 没有.",
          contentEn: "有 (yǒu) has two uses: possession («have») and existence («there is/are»). 我有两个苹果 (I have two apples) + 桌上有一本书 (there's a book on the table). Its negation is always 没有 (méi yǒu), never 不有 ✗ — one of the few Chinese irregularities. Also: 没 can appear without 有 in structures like 我没吃 (I didn't eat) — but that's B1.1. For now: 有 / 没有.",
          objectives: [
            "Utiliser 有 pour possession ET existence",
            "Nier uniquement avec 没有, jamais 不有",
            "Former 我有 / 他没有 / 这里有",
            "Poser 你有吗 ? et répondre"
          ],
          objectivesEn: [
            "Use 有 for both possession AND existence",
            "Negate only with 没有, never 不有",
            "Build 我有 / 他没有 / 这里有",
            "Ask 你有吗? and reply"
          ]
        },
        flashcards: ["有", "没有", "有一个", "有什么", "没什么", "有吗", "还有", "都有"],
        quizQuestions: 8,
        learnSections: wantsNeedsLearnSections
      }
    ]
  },

  
  // ═══════════════════════════════════════════════════════════════════════════
  // A2 — Survie (28 leçons / 7 parcours)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "cecr-a2-city",
    name: "En ville & transports",
    nameEn: "In town & transports",
    description: "Se repérer, demander son chemin, utiliser les transports chinois.",
    descriptionEn: "Find your way, ask directions, use Chinese transport.",
    icon: "🚇",
    color: "amber",
    lessons: [
      {
        id: "cecr-a2-city-m1",
        title: "Demander son chemin",
        titleEn: "Asking for directions",
        duration: 12, locked: false, completed: false,
        hskLevel: 2, hskLevels: [1, 2], category: "conversation", difficulty: "elementary",
        tags: ["directions", "city", "cecr:a2"],
        introduction: {
          title: "请问, ...怎么走 ? — la formule magique",
          titleEn: "请问, ...how to get there? — the magic phrase",
          content: "Pour demander un chemin en chinois, la structure est ultra-stable : 请问, [lieu] 怎么走 ? (littéralement « excusez-moi, [lieu] comment marcher ? »). 请问 (qǐng wèn) n'est pas optionnel — c'est ce qui rend votre question polie. Les réponses utilisent 4 verbes clés : 往 (wǎng, vers) + direction + 走 (zǒu, marcher) : 往前走 (tout droit), 往左拐 (tourner à gauche), 往右拐 (tourner à droite). Distance : 一直走 (tout droit sans s'arrêter), 过马路 (traverser la rue).",
          contentEn: "To ask directions in Chinese, the structure is ultra-stable: 请问, [place] 怎么走? (literally «excuse me, [place] how to walk?»). 请问 (qǐng wèn) is not optional — it's what makes your question polite. Answers use 4 key verbs: 往 (wǎng, toward) + direction + 走 (zǒu, walk): 往前走 (straight), 往左拐 (turn left), 往右拐 (turn right). Distance: 一直走 (straight without stopping), 过马路 (cross the street).",
          objectives: [
            "Formuler 请问, ... 怎么走 ?",
            "Comprendre 往前/左/右 + 走/拐",
            "Repérer 附近, 旁边, 对面",
            "Localiser : 在左边/右边/前面/后面"
          ],
          objectivesEn: [
            "Form 请问, ... how do I get there?",
            "Understand 往 + direction + 走/拐",
            "Identify 附近, 旁边, 对面",
            "Localize: 在 left/right/front/back"
          ]
        },
        flashcards: ["请问", "怎么走", "往前", "往左", "往右", "拐", "一直走", "过马路", "附近", "旁边", "对面"],
        quizQuestions: 8
      },
      {
        id: "cecr-a2-city-m2",
        title: "Les transports urbains",
        titleEn: "Urban transports",
        duration: 12, locked: false, completed: false,
        hskLevel: 2, hskLevels: [1, 2, 3], category: "vocabulary", difficulty: "elementary",
        tags: ["transport", "subway", "cecr:a2"],
        introduction: {
          title: "坐 vs 骑 — monter DANS vs monter SUR",
          titleEn: "坐 vs 骑 — get IN vs get ON",
          content: "Pour « prendre » un transport, le chinois distingue deux verbes selon la position du corps. 坐 (zuò, s'asseoir) pour tout ce dans quoi on est assis : 坐地铁, 坐公共汽车, 坐出租车, 坐飞机, 坐火车. 骑 (qí, chevaucher) pour tout ce qu'on enfourche : 骑自行车 (vélo), 骑摩托车 (moto), 骑马 (cheval). Erreur classique : 坐自行车 ✗ — on ne « s'assoit » pas sur un vélo au sens chinois, on le chevauche. Mesures de temps : 一个小时, 二十分钟.",
          contentEn: "For «taking» transport, Chinese distinguishes two verbs based on body position. 坐 (zuò, to sit) for anything you sit in: 坐地铁, 坐公共汽车, 坐出租车, 坐飞机, 坐火车. 骑 (qí, to ride astride) for anything you straddle: 骑自行车 (bike), 骑摩托车 (motorbike), 骑马 (horse). Classic mistake: 坐自行车 ✗ — you don't «sit» on a bike in the Chinese sense, you ride it. Time measures: 一个小时, 二十分钟.",
          objectives: [
            "Choisir 坐 (assis DANS) vs 骑 (à califourchon SUR)",
            "Nommer 8 moyens de transport",
            "Utiliser 从...到... avec un transport",
            "Demander combien de temps : 多长时间 ?"
          ],
          objectivesEn: [
            "Choose 坐 (sitting IN) vs 骑 (astride ON)",
            "Name 8 transport modes",
            "Use 从...到... with a transport",
            "Ask how long: 多长时间?"
          ]
        },
        flashcards: ["坐", "骑", "地铁", "公共汽车", "出租车", "飞机", "火车", "自行车", "从", "到", "多长时间"],
        quizQuestions: 8
      },
      {
        id: "cecr-a2-city-m3",
        title: "Lieux de la ville",
        titleEn: "Places in the city",
        duration: 10, locked: false, completed: false,
        hskLevel: 2, hskLevels: [1, 2, 3], category: "vocabulary", difficulty: "elementary",
        tags: ["places", "city", "cecr:a2"],
        introduction: {
          title: "Le suffixe 店 (magasin)",
          titleEn: "The 店 suffix (shop)",
          content: "Beaucoup de lieux urbains chinois se construisent sur un modèle fixe : [fonction] + 店 (diàn, magasin) ou [fonction] + 馆 (guǎn, établissement) ou [fonction] + 院 (yuàn, institution). 书店 librairie, 饭店 restaurant, 商店 boutique, 花店 fleuriste · 图书馆 bibliothèque, 博物馆 musée, 咖啡馆 café · 医院 hôpital, 电影院 cinéma. Une fois que vous reconnaissez ces 3 suffixes, vous déduisez 80% des noms de lieux sans dictionnaire. Le mot pour « banque » est une exception : 银行 (yín háng, littéralement « maison d'argent »).",
          contentEn: "Many Chinese urban places follow a fixed pattern: [function] + 店 (diàn, shop) or [function] + 馆 (guǎn, establishment) or [function] + 院 (yuàn, institution). 书店 bookstore, 饭店 restaurant, 商店 shop, 花店 florist · 图书馆 library, 博物馆 museum, 咖啡馆 café · 医院 hospital, 电影院 cinema. Once you recognize these 3 suffixes, you deduce 80% of place names without a dictionary. «Bank» is an exception: 银行 (yín háng, literally «money house»).",
          objectives: [
            "Reconnaître les suffixes 店 / 馆 / 院",
            "Nommer 10 lieux urbains",
            "Situer avec 在 : 我在银行",
            "Poser : ...在哪儿 ?"
          ],
          objectivesEn: [
            "Recognize suffixes 店 / 馆 / 院",
            "Name 10 urban places",
            "Locate with 在: 我在银行",
            "Ask: ...在哪儿?"
          ]
        },
        flashcards: ["书店", "饭店", "商店", "图书馆", "博物馆", "咖啡馆", "医院", "电影院", "银行", "邮局", "超市"],
        quizQuestions: 8
      },
      {
        id: "cecr-a2-city-m4",
        title: "Réserver un taxi (Didi)",
        titleEn: "Booking a taxi (Didi)",
        duration: 10, locked: false, completed: false,
        hskLevel: 2, hskLevels: [2, 3], category: "conversation", difficulty: "elementary",
        tags: ["taxi", "didi", "cecr:a2"],
        introduction: {
          title: "去 + lieu = « allez à »",
          titleEn: "去 + place = «go to»",
          content: "Avec un chauffeur (taxi, Didi), la phrase chinoise est bien plus courte qu'en français. Au lieu de « Pouvez-vous m'emmener à... s'il vous plaît ? », vous dites simplement : 师傅 (shī fu, chef/maître — terme de respect pour un chauffeur), 我去 [destination]. Ou encore plus direct : 去 [destination]. 师傅 est crucial en Chine : l'utiliser change immédiatement le ton. À l'arrivée : 到了 (c'est arrivé), 就在这儿 (juste ici), 谢谢 (merci). Payer : 多少钱 ? (combien ?) 用微信 (via WeChat).",
          contentEn: "With a driver (taxi, Didi), the Chinese phrase is much shorter than in French. Instead of «Can you take me to... please?», you simply say: 师傅 (shī fu, master — respect term for driver), 我去 [destination]. Or even more direct: 去 [destination]. 师傅 is crucial in China: using it instantly changes the tone. On arrival: 到了 (we're here), 就在这儿 (right here), 谢谢 (thanks). Paying: 多少钱? (how much?) 用微信 (via WeChat).",
          objectives: [
            "Dire 师傅 au chauffeur",
            "Donner une destination avec 去",
            "Signaler l'arrivée : 到了, 就在这儿",
            "Payer par WeChat : 用微信 / 扫码"
          ],
          objectivesEn: [
            "Say 师傅 to the driver",
            "Give a destination with 去",
            "Signal arrival: 到了, 就在这儿",
            "Pay via WeChat: 用微信 / 扫码"
          ]
        },
        flashcards: ["师傅", "去", "到了", "就在这儿", "多少钱", "微信", "扫码", "不用找了"],
        quizQuestions: 8
      }
    ]
  },
  {
    id: "cecr-a2-food-shopping",
    name: "Restaurants & courses",
    nameEn: "Dining & Shopping",
    description: "Commander au restaurant, faire ses courses, négocier un prix, payer.",
    descriptionEn: "Order at a restaurant, go shopping, bargain, pay.",
    icon: "🛒",
    color: "orange",
    lessons: [
{
        id: "cecr-a2-food-m1",
        title: "Au restaurant : commander",
        titleEn: "At the restaurant: ordering",
        duration: 12, locked: false, completed: false,
        hskLevel: 2, hskLevels: [1, 2, 3], category: "conversation", difficulty: "elementary",
        tags: ["restaurant", "order", "cecr:a2"],
        introduction: {
          title: "点菜 : le verbe roi du restaurant",
          titleEn: "点菜: the king verb at the restaurant",
          content: "« Commander » en français = un seul verbe. En chinois, on sépare le contenant du contenu. 点菜 (diǎn cài, « pointer-plat ») = commander la nourriture. 点饮料 (diǎn yǐn liào) = commander les boissons. La structure de commande est fixe : 服务员 (fú wù yuán, serveur), 我要一个...和一碗... (je veux un [plat] et un bol de...). Les classificateurs varient selon l'aliment : 一个 pour les plats en général, 一碗 (yī wǎn) pour les bols (soupe, riz, nouilles), 一杯 (yī bēi) pour les verres. Politesse : 谢谢 même au serveur (en Chine moderne, usage de plus en plus fréquent).",
          contentEn: "«Order» in English = one verb. In Chinese, container and content are split. 点菜 (diǎn cài, «point-dish») = order food. 点饮料 (diǎn yǐn liào) = order drinks. Order structure is fixed: 服务员 (fú wù yuán, waiter), 我要一个...和一碗... (I want one [dish] and one bowl of...). Classifiers vary by food: 一个 for dishes in general, 一碗 (yī wǎn) for bowls (soup, rice, noodles), 一杯 (yī bēi) for glasses. Politeness: 谢谢 even to the waiter (increasingly common in modern China).",
          objectives: [
            "Appeler le serveur : 服务员",
            "Commander avec 我要 + classificateur + plat",
            "Choisir 个/碗/杯 selon le contenant",
            "Payer : 买单 ou 结账"
          ],
          objectivesEn: [
            "Call waiter: 服务员",
            "Order with 我要 + classifier + dish",
            "Choose 个/碗/杯 by container",
            "Pay: 买单 or 结账"
          ]
        },
        flashcards: ["点菜", "服务员", "我要", "一个", "一碗", "一杯", "菜单", "买单", "结账", "好吃"],
        quizQuestions: 8
      },
      {
        id: "cecr-a2-food-m2",
        title: "Goûts & saveurs",
        titleEn: "Tastes & flavors",
        duration: 10, locked: false, completed: false,
        hskLevel: 2, hskLevels: [2, 3], category: "vocabulary", difficulty: "elementary",
        tags: ["taste", "flavor", "cecr:a2"],
        introduction: {
          title: "Les 5 saveurs chinoises",
          titleEn: "The 5 Chinese flavors",
          content: "La gastronomie chinoise distingue traditionnellement 5 saveurs fondamentales, qui correspondent aussi aux 5 éléments : 酸 (suān, acide/aigre), 甜 (tián, sucré), 苦 (kǔ, amer), 辣 (là, piquant — techniquement une douleur, pas un goût, mais toujours compté), 咸 (xián, salé). Pour dire « pas trop piquant », on dit 不要太辣 ou encore 微辣 (légèrement piquant) / 中辣 (moyen) / 特辣 (extra piquant) — échelle standard au Sichuan. Astuce essentielle : la phrase 我吃不了辣 (je ne peux pas manger piquant) peut vous sauver d'un choc culinaire au Hunan ou Sichuan.",
          contentEn: "Chinese cuisine traditionally distinguishes 5 fundamental flavors, also matching the 5 elements: 酸 (suān, sour), 甜 (tián, sweet), 苦 (kǔ, bitter), 辣 (là, spicy — technically pain, not taste, but always counted), 咸 (xián, salty). To say «not too spicy», say 不要太辣 or 微辣 (mild) / 中辣 (medium) / 特辣 (extra hot) — standard Sichuan scale. Essential tip: the phrase 我吃不了辣 (I can't eat spicy) can save you from a culinary shock in Hunan or Sichuan.",
          objectives: [
            "Nommer 酸甜苦辣咸 (les 5 saveurs)",
            "Graduer le piquant : 微/中/特辣",
            "Dire 我吃不了辣",
            "Décrire un plat : 很好吃 / 有点咸"
          ],
          objectivesEn: [
            "Name 酸甜苦辣咸 (5 flavors)",
            "Grade spiciness: 微/中/特辣",
            "Say 我吃不了辣",
            "Describe a dish: 很好吃 / 有点咸"
          ]
        },
        flashcards: ["酸", "甜", "苦", "辣", "咸", "好吃", "难吃", "有点", "太", "微辣", "中辣"],
        quizQuestions: 8
      },
      {
        id: "cecr-a2-food-m3",
        title: "Plats emblématiques",
        titleEn: "Iconic dishes",
        duration: 10, locked: false, completed: false,
        hskLevel: 2, hskLevels: [2, 3, 4], category: "culture", difficulty: "elementary",
        tags: ["food", "dishes", "cecr:a2"],
        introduction: {
          title: "Lire un menu chinois sans paniquer",
          titleEn: "Reading a Chinese menu without panic",
          content: "Un nom de plat chinois suit presque toujours le schéma : [ingrédient principal] + [méthode de cuisson] + [accompagnement]. 宫保鸡丁 = 宫保 (style « Gong Bao ») + 鸡丁 (dés de poulet). 糖醋里脊 = 糖醋 (sucré-acide) + 里脊 (filet de porc). 麻婆豆腐 = 麻婆 (« grand-mère grêlée ») + 豆腐 (tofu). Si vous savez lire l'ingrédient principal (鸡 poulet, 牛肉 bœuf, 猪肉 porc, 鱼 poisson, 豆腐 tofu, 菜 légume) et les modes (炒 sauté, 炖 mijoté, 炸 frit, 蒸 vapeur), vous commandez sans surprise. Règle d'or : évitez 生 (cru) si vous n'êtes pas sûr.",
          contentEn: "A Chinese dish name almost always follows: [main ingredient] + [cooking method] + [side]. 宫保鸡丁 = 宫保 (Gong Bao style) + 鸡丁 (chicken cubes). 糖醋里脊 = 糖醋 (sweet-sour) + 里脊 (pork tenderloin). 麻婆豆腐 = 麻婆 («pockmarked granny») + 豆腐 (tofu). If you can read the main ingredient (鸡 chicken, 牛肉 beef, 猪肉 pork, 鱼 fish, 豆腐 tofu, 菜 veggies) and methods (炒 stir-fried, 炖 stewed, 炸 deep-fried, 蒸 steamed), you order without surprises. Golden rule: avoid 生 (raw) if unsure.",
          objectives: [
            "Décoder un nom : ingrédient + méthode",
            "Reconnaître 5 protéines clés",
            "Identifier 4 modes de cuisson",
            "Commander 3 plats iconiques"
          ],
          objectivesEn: [
            "Decode a name: ingredient + method",
            "Recognize 5 key proteins",
            "Identify 4 cooking methods",
            "Order 3 iconic dishes"
          ]
        },
        flashcards: ["宫保鸡丁", "麻婆豆腐", "糖醋里脊", "鱼香肉丝", "饺子", "米饭", "面条", "炒", "蒸", "炸", "炖"],
        quizQuestions: 8
      },
      {
        id: "cecr-a2-food-m4",
        title: "Boissons & thé",
        titleEn: "Drinks & tea",
        duration: 10, locked: false, completed: false,
        hskLevel: 2, hskLevels: [1, 2, 3], category: "culture", difficulty: "elementary",
        tags: ["drinks", "tea", "cecr:a2"],
        introduction: {
          title: "茶 : le mot qui a conquis le monde",
          titleEn: "茶: the word that conquered the world",
          content: "Le mot 茶 (chá) est à l'origine de deux familles mondiales : les langues qui ont emprunté le mot par la mer (Fujian, « te ») → tea/thé/Tee ; celles qui l'ont emprunté par la route (Mandarin, « cha ») → chai/шай/çay. En Chine, on distingue surtout par couleur : 绿茶 (thé vert, Zhejiang), 红茶 (thé rouge = thé noir en Occident), 乌龙茶 (oolong, semi-fermenté, Fujian), 普洱茶 (pu'er, fermenté, Yunnan), 白茶 (thé blanc). Autres boissons : 水 eau, 果汁 jus, 啤酒 bière, 可乐 coca, 咖啡 café. Culture : on ne demande jamais « une eau » au restaurant — l'eau servie est toujours chaude (开水, eau bouillie).",
          contentEn: "The word 茶 (chá) gave birth to two global families: languages that borrowed by sea (Fujian, «te») → tea/thé/Tee; those by land (Mandarin, «cha») → chai/шай/çay. In China, classification is mostly by color: 绿茶 (green, Zhejiang), 红茶 (red = black tea in West), 乌龙茶 (oolong, semi-fermented, Fujian), 普洱茶 (pu'er, fermented, Yunnan), 白茶 (white). Other drinks: 水 water, 果汁 juice, 啤酒 beer, 可乐 coke, 咖啡 coffee. Culture: never ask for «a water» in restaurants — served water is always hot (开水, boiled water).",
          objectives: [
            "Distinguer 绿/红/乌龙/普洱茶",
            "Nommer 6 boissons courantes",
            "Comprendre 开水 (eau chaude par défaut)",
            "Commander : 我要一杯...(要)热/凉"
          ],
          objectivesEn: [
            "Tell apart green/red/oolong/pu'er tea",
            "Name 6 common drinks",
            "Understand 开水 (hot water default)",
            "Order: 我要一杯... hot/cold"
          ]
        },
        flashcards: ["茶", "绿茶", "红茶", "乌龙茶", "普洱茶", "水", "开水", "果汁", "啤酒", "可乐", "咖啡"],
        quizQuestions: 8
      },
{
        id: "cecr-a2-shopping-m1",
        title: "Les prix : 块, 毛, 分",
        titleEn: "Prices: 块, 毛, 分",
        duration: 12, locked: false, completed: false,
        hskLevel: 2, hskLevels: [1, 2, 3], category: "vocabulary", difficulty: "elementary",
        tags: ["money", "prices", "cecr:a2"],
        introduction: {
          title: "块 parlé vs 元 écrit",
          titleEn: "块 spoken vs 元 written",
          content: "La monnaie officielle chinoise s'appelle 人民币 (rén mín bì, RMB), l'unité est le 元 (yuán) à l'écrit et 块 (kuài) à l'oral. Un Chinois ne dira jamais 十元 à l'oral, mais 十块. Subdivisions : 1 元 = 10 角 (jiǎo, écrit) = 10 毛 (máo, oral) ; 1 角 = 10 分 (fēn). Prononciation typique : 25,50 ¥ = 二十五块五毛. Les 分 ne se disent presque plus. Au marché, demandez toujours : 多少钱 ? (combien ?) — si vous voulez négocier : 便宜点儿 (moins cher !), 能打折吗 ? (réduction possible ?). Le 7-8折 (7-8 %) = 70-80 % du prix, càd 20-30 % de remise (système inversé !).",
          contentEn: "Chinese currency is 人民币 (rén mín bì, RMB). Unit: 元 (yuán) written, 块 (kuài) spoken. A Chinese speaker never says 十元 aloud, but 十块. Subdivisions: 1 元 = 10 角 (jiǎo, written) = 10 毛 (máo, spoken); 1 角 = 10 分 (fēn). Typical reading: 25.50 ¥ = 二十五块五毛. 分 is almost never spoken anymore. At the market, always ask: 多少钱? (how much?) — to bargain: 便宜点儿 (cheaper!), 能打折吗? (any discount?). 7-8折 = 70-80 % of price, i.e. 20-30 % off (inverted system!).",
          objectives: [
            "Distinguer 块 (oral) / 元 (écrit)",
            "Comprendre 块/毛/分 (1=10=100)",
            "Lire un prix : 二十五块五毛",
            "Négocier : 便宜点儿, 打几折 ?"
          ],
          objectivesEn: [
            "Tell 块 (spoken) / 元 (written)",
            "Understand 块/毛/分 (1=10=100)",
            "Read a price: 二十五块五毛",
            "Bargain: 便宜点儿, 打几折?"
          ]
        },
        flashcards: ["人民币", "元", "块", "毛", "分", "多少钱", "便宜", "贵", "打折", "便宜点儿"],
        quizQuestions: 8
      },
      {
        id: "cecr-a2-shopping-m2",
        title: "Vêtements & tailles",
        titleEn: "Clothes & sizes",
        duration: 10, locked: false, completed: false,
        hskLevel: 2, hskLevels: [2, 3], category: "vocabulary", difficulty: "elementary",
        tags: ["clothes", "shopping", "cecr:a2"],
        introduction: {
          title: "穿 = porter (vêtements)",
          titleEn: "穿 = wear (clothes)",
          content: "En chinois, « porter » se décline selon ce qu'on porte. 穿 (chuān) : vêtements et chaussures (穿衣服, 穿鞋). 戴 (dài) : accessoires (戴眼镜 lunettes, 戴帽子 chapeau, 戴手表 montre, 戴戒指 bague). Règle mnémotechnique : ce qui couvre le tronc = 穿 ; ce qui « s'accroche » = 戴. Tailles : S/M/L/XL sont directement écrits, mais on dit aussi 小/中/大号. Pour essayer : 我可以试试吗 ? (puis-je essayer ?), 试衣间在哪儿 ? (où est la cabine ?). Demander autre couleur : 有别的颜色吗 ?",
          contentEn: "In Chinese, «wear» splits by item type. 穿 (chuān): clothes and shoes (穿衣服, 穿鞋). 戴 (dài): accessories (戴眼镜 glasses, 戴帽子 hat, 戴手表 watch, 戴戒指 ring). Mnemonic: what covers the torso = 穿; what «hangs on» = 戴. Sizes: S/M/L/XL written directly, but also 小/中/大号. To try: 我可以试试吗? (may I try?), 试衣间在哪儿? (where's the fitting room?). Ask another color: 有别的颜色吗?",
          objectives: [
            "Distinguer 穿 (vêtements) / 戴 (accessoires)",
            "Nommer 8 vêtements",
            "Demander une taille : 小/中/大号",
            "Essayer : 我可以试试吗 ?"
          ],
          objectivesEn: [
            "Tell 穿 (clothes) / 戴 (accessories)",
            "Name 8 clothing items",
            "Ask for size: 小/中/大号",
            "Try on: 我可以试试吗?"
          ]
        },
        flashcards: ["穿", "戴", "衣服", "鞋", "帽子", "眼镜", "大号", "中号", "小号", "试", "颜色"],
        quizQuestions: 8
      },
      {
        id: "cecr-a2-shopping-m3",
        title: "Payer en Chine (微信/支付宝)",
        titleEn: "Paying in China (WeChat/Alipay)",
        duration: 10, locked: false, completed: false,
        hskLevel: 2, hskLevels: [2, 3], category: "culture", difficulty: "elementary",
        tags: ["pay", "wechat", "alipay", "cecr:a2"],
        introduction: {
          title: "扫码 : scanner est un verbe",
          titleEn: "扫码: scanning is a verb",
          content: "La Chine est devenue quasi cashless. 2 apps dominent : 微信支付 (WēiXìn Zhīfù, WeChat Pay) et 支付宝 (Zhīfùbǎo, Alipay). Le verbe universel : 扫码 (sǎo mǎ, scanner le code QR) ou 扫一下 (scanner vite fait). Scène type : le vendeur dit 扫这个 (scanne ça) en montrant son QR. Vous répondez 好 et scannez avec votre app. À l'inverse, le vendeur peut vous demander 您扫我还是我扫您 ? (vous scannez moi, ou moi je vous scanne ?). Le cash (现金 xiàn jīn) n'est presque plus accepté — dans les petits marchés, on dit parfois : 我只要现金 (je ne prends que du cash), mais c'est devenu rare.",
          contentEn: "China became nearly cashless. 2 dominant apps: 微信支付 (WeChat Pay) and 支付宝 (Alipay). Universal verb: 扫码 (sǎo mǎ, scan QR code) or 扫一下 (quick scan). Typical scene: vendor says 扫这个 (scan this) showing their QR. You reply 好 and scan with your app. Conversely, vendor may ask 您扫我还是我扫您? (you scan me or I scan you?). Cash (现金 xiàn jīn) is barely accepted anymore — in small markets, some say 我只要现金 (cash only), but rare now.",
          objectives: [
            "Connaître 微信支付 et 支付宝",
            "Utiliser le verbe 扫码",
            "Répondre à 您扫我还是我扫您 ?",
            "Distinguer 现金 (cash) des paiements mobiles"
          ],
          objectivesEn: [
            "Know 微信支付 and 支付宝",
            "Use verb 扫码",
            "Reply to 您扫我还是我扫您?",
            "Tell 现金 (cash) from mobile payments"
          ]
        },
        flashcards: ["微信支付", "支付宝", "扫码", "二维码", "现金", "刷卡", "转账", "付钱", "收款"],
        quizQuestions: 8
      },
      {
        id: "cecr-a2-shopping-m4",
        title: "Quantités & classificateurs",
        titleEn: "Quantities & classifiers",
        duration: 12, locked: false, completed: false,
        hskLevel: 2, hskLevels: [1, 2, 3], category: "grammar", difficulty: "elementary",
        tags: ["classifier", "quantity", "cecr:a2"],
        introduction: {
          title: "Un classificateur par famille d'objet",
          titleEn: "One classifier per object family",
          content: "En chinois, on ne dit JAMAIS « deux livres » mais « deux [classificateur] livre ». Le classificateur est obligatoire entre le nombre et le nom. 个 (gè) est le plus générique — si vous ne savez pas, utilisez 个, vous serez compris. Mais chaque famille d'objets a son vrai classificateur : 本 (běn) livres, 张 (zhāng) objets plats (papier, billet, table), 条 (tiáo) objets longs et fins (poisson, rue, pantalon), 件 (jiàn) vêtements / événements, 把 (bǎ) objets à poignée (couteau, parapluie, chaise), 杯 (bēi) verres, 碗 (wǎn) bols. Apprendre le bon classificateur = parler comme un Chinois. Erreur fréquente : 三个书 ✗, il faut 三本书.",
          contentEn: "In Chinese, you NEVER say «two books» but «two [classifier] book». The classifier is mandatory between number and noun. 个 (gè) is most generic — if unsure, use 个, you'll be understood. But each object family has its true classifier: 本 (běn) books, 张 (zhāng) flat objects (paper, ticket, table), 条 (tiáo) long thin objects (fish, road, pants), 件 (jiàn) clothes / events, 把 (bǎ) handle objects (knife, umbrella, chair), 杯 (bēi) glasses, 碗 (wǎn) bowls. Learning the right classifier = speaking like a native. Common mistake: 三个书 ✗, should be 三本书.",
          objectives: [
            "Mémoriser 本/张/条/件/把/杯/碗",
            "Ne JAMAIS dire 个 + livre",
            "Compter : 两本书, 三张纸, 四条鱼",
            "Se rabattre sur 个 en cas de doute"
          ],
          objectivesEn: [
            "Memorize 本/张/条/件/把/杯/碗",
            "NEVER say 个 + book",
            "Count: 两本书, 三张纸, 四条鱼",
            "Fall back on 个 when in doubt"
          ]
        },
        flashcards: ["个", "本", "张", "条", "件", "把", "杯", "碗", "只", "辆", "双"],
        quizQuestions: 10
      }
    ]
  },

  {
    id: "cecr-a2-day-phone",
    name: "Journée & communication",
    nameEn: "Daily Routine & Communication",
    description: "Raconter sa journée, l'heure, les rendez-vous, passer un appel, envoyer un message.",
    descriptionEn: "Describe your day, time, appointments, make a phone call, send a message.",
    icon: "⏰",
    color: "amber",
    lessons: [
{
        id: "cecr-a2-day-m1",
        title: "L'heure en chinois",
        titleEn: "Telling time in Chinese",
        duration: 12, locked: false, completed: false,
        hskLevel: 2, hskLevels: [1, 2], category: "grammar", difficulty: "elementary",
        tags: ["time", "hours", "cecr:a2"],
        introduction: {
          title: "点 heure, 分 minute, 半 demi, 刻 quart",
          titleEn: "点 hour, 分 minute, 半 half, 刻 quarter",
          content: "L'heure chinoise suit une logique stricte : [nombre] 点 [nombre] 分. 8h30 = 八点三十分 ou, plus naturel, 八点半 (8h et demie). Les quarts : 一刻 (un quart, 15 min), 三刻 (trois quarts, 45 min) — 两刻 (30 min) existe mais on préfère 半. Pour « moins » : 差 (chà, manquer). 8h45 = 九点差一刻 (à 9h moins un quart). AM/PM : 上午 (shàngwǔ, matin), 中午 (zhōngwǔ, midi), 下午 (xiàwǔ, après-midi), 晚上 (wǎnshàng, soir) — placés AVANT l'heure : 下午三点 (15h). Question : 现在几点 ? (il est quelle heure ?).",
          contentEn: "Chinese time follows strict logic: [number] 点 [number] 分. 8:30 = 八点三十分 or, more natural, 八点半 (8 and a half). Quarters: 一刻 (one quarter, 15 min), 三刻 (three quarters, 45 min) — 两刻 (30 min) exists but 半 preferred. For «to»: 差 (chà, lack). 8:45 = 九点差一刻 (a quarter to 9). AM/PM: 上午 (morning), 中午 (noon), 下午 (afternoon), 晚上 (evening) — placed BEFORE the time: 下午三点 (3pm). Question: 现在几点? (what time is it?).",
          objectives: [
            "Dire l'heure avec 点/分/半/刻",
            "Utiliser 差 pour « moins »",
            "Placer 上午/下午/晚上 avant l'heure",
            "Demander 现在几点 ?"
          ],
          objectivesEn: [
            "Tell time with 点/分/半/刻",
            "Use 差 for «to/minus»",
            "Place 上午/下午/晚上 before time",
            "Ask 现在几点?"
          ]
        },
        flashcards: ["点", "分", "半", "刻", "差", "上午", "中午", "下午", "晚上", "现在", "几点"],
        quizQuestions: 8
      },
      {
        id: "cecr-a2-day-m2",
        title: "Routine quotidienne",
        titleEn: "Daily routine",
        duration: 10, locked: false, completed: false,
        hskLevel: 2, hskLevels: [1, 2, 3], category: "conversation", difficulty: "elementary",
        tags: ["routine", "daily", "cecr:a2"],
        introduction: {
          title: "L'ordre TEMPS-SUJET-VERBE du chinois",
          titleEn: "Chinese TIME-SUBJECT-VERB order",
          content: "En chinois, le temps vient TOUJOURS avant le verbe, soit avant, soit après le sujet : 我早上七点起床 ou 早上七点我起床 (je me lève à 7h du matin). Jamais après le verbe : 我起床早上 ✗. Verbes du matin : 起床 (se lever), 刷牙 (se brosser les dents), 洗脸 (se laver le visage), 吃早饭 (prendre le petit-déj). Du soir : 下班 (finir le travail), 吃晚饭 (dîner), 看电视 (regarder la TV), 睡觉 (dormir). Fréquence : 每天 (chaque jour), 常常 (souvent), 有时候 (parfois), 从不 (jamais) — tous avant le verbe.",
          contentEn: "In Chinese, time ALWAYS comes before the verb, either before or after subject: 我早上七点起床 or 早上七点我起床 (I get up at 7am). Never after verb: 我起床早上 ✗. Morning verbs: 起床 (get up), 刷牙 (brush teeth), 洗脸 (wash face), 吃早饭 (eat breakfast). Evening: 下班 (leave work), 吃晚饭 (dinner), 看电视 (watch TV), 睡觉 (sleep). Frequency: 每天 (every day), 常常 (often), 有时候 (sometimes), 从不 (never) — all before verb.",
          objectives: [
            "Placer le temps AVANT le verbe",
            "Décrire 6 actions quotidiennes",
            "Utiliser 每天/常常/有时候/从不",
            "Conjuguer rien (chinois invariable)"
          ],
          objectivesEn: [
            "Place time BEFORE the verb",
            "Describe 6 daily actions",
            "Use 每天/常常/有时候/从不",
            "Conjugate nothing (Chinese is invariable)"
          ]
        },
        flashcards: ["起床", "刷牙", "洗脸", "吃早饭", "上班", "下班", "睡觉", "每天", "常常", "有时候", "从不"],
        quizQuestions: 8
      },
      {
        id: "cecr-a2-day-m3",
        title: "Météo & saisons",
        titleEn: "Weather & seasons",
        duration: 10, locked: false, completed: false,
        hskLevel: 2, hskLevels: [1, 2, 3], category: "vocabulary", difficulty: "elementary",
        tags: ["weather", "seasons", "cecr:a2"],
        introduction: {
          title: "Le pattern 天气 + 很 + adjectif",
          titleEn: "The 天气 + 很 + adjective pattern",
          content: "Pour parler météo, la structure chinoise est 今天天气很... (aujourd'hui le temps est très...). Le 很 (hěn, très) n'a presque pas son sens littéral : il sert de liaison obligatoire entre le sujet et l'adjectif (pas de verbe « être » avec adjectif !). Adjectifs météo : 冷 (froid), 热 (chaud), 暖和 (doux/tiède), 凉快 (frais). Phénomènes (verbes !) : 下雨 (il pleut, littéralement « tomber pluie »), 下雪 (il neige), 刮风 (il vente). Saisons : 春天 (printemps), 夏天 (été), 秋天 (automne), 冬天 (hiver). Erreur typique : 今天是冷 ✗ — pas besoin de 是 !",
          contentEn: "To talk weather, Chinese structure is 今天天气很... (today's weather is very...). The 很 (hěn, very) barely has its literal meaning: it's a mandatory link between subject and adjective (no «to be» with adjectives!). Weather adjectives: 冷 (cold), 热 (hot), 暖和 (mild), 凉快 (cool). Phenomena (verbs!): 下雨 (it rains, lit. «fall rain»), 下雪 (it snows), 刮风 (it's windy). Seasons: 春天 (spring), 夏天 (summer), 秋天 (autumn), 冬天 (winter). Typical mistake: 今天是冷 ✗ — no 是 needed!",
          objectives: [
            "Construire 天气很 + adjectif (sans 是)",
            "Utiliser 下雨/下雪/刮风 comme verbes",
            "Nommer les 4 saisons",
            "Décrire la météo du jour"
          ],
          objectivesEn: [
            "Build 天气很 + adj (no 是)",
            "Use 下雨/下雪/刮风 as verbs",
            "Name the 4 seasons",
            "Describe today's weather"
          ]
        },
        flashcards: ["天气", "冷", "热", "暖和", "凉快", "下雨", "下雪", "刮风", "春天", "夏天", "秋天", "冬天"],
        quizQuestions: 8
      },
      {
        id: "cecr-a2-day-m4",
        title: "Dates & jours",
        titleEn: "Dates & days",
        duration: 10, locked: false, completed: false,
        hskLevel: 2, hskLevels: [1, 2], category: "vocabulary", difficulty: "elementary",
        tags: ["date", "day", "cecr:a2"],
        introduction: {
          title: "Grand au petit : année > mois > jour",
          titleEn: "Big to small: year > month > day",
          content: "Le chinois date du plus grand au plus petit — exactement l'inverse du français. 2026年4月18日 = « année 2026, mois 4, jour 18 ». L'année se lit chiffre par chiffre : 二零二六年 (2-0-2-6 année), pas « deux mille vingt-six ». Jours de la semaine : 星期一 (lundi), 星期二 (mardi), ..., 星期六 (samedi), 星期天 ou 星期日 (dimanche — le seul qui ne suit pas le chiffre). Variante orale : 周一, 周二... Demander : 今天几月几号 ? (quelle date aujourd'hui ?). 今天星期几 ? (quel jour aujourd'hui ?).",
          contentEn: "Chinese dates go largest to smallest — exact opposite of French. 2026年4月18日 = «year 2026, month 4, day 18». Year is read digit by digit: 二零二六年 (2-0-2-6 year), not «two thousand twenty-six». Weekdays: 星期一 (Mon), 星期二 (Tue), ..., 星期六 (Sat), 星期天 or 星期日 (Sun — the only one not following a number). Oral variant: 周一, 周二... Ask: 今天几月几号? (today's date?). 今天星期几? (what day today?).",
          objectives: [
            "Écrire une date : 年月日 (grand → petit)",
            "Lire l'année chiffre par chiffre",
            "Nommer les 7 jours avec 星期",
            "Demander 几月几号 / 星期几"
          ],
          objectivesEn: [
            "Write a date: 年月日 (big→small)",
            "Read year digit by digit",
            "Name 7 days with 星期",
            "Ask 几月几号 / 星期几"
          ]
        },
        flashcards: ["年", "月", "日", "号", "星期", "星期一", "星期二", "星期天", "今天", "明天", "昨天"],
        quizQuestions: 8
      },
{
        id: "cecr-a2-phone-m1",
        title: "Décrocher, raccrocher",
        titleEn: "Pick up, hang up",
        duration: 10, locked: false, completed: false,
        hskLevel: 2, hskLevels: [1, 2], category: "conversation", difficulty: "elementary",
        tags: ["phone", "call", "cecr:a2"],
        introduction: {
          title: "喂 ? — le « allô » chinois",
          titleEn: "喂? — the Chinese «hello»",
          content: "Au téléphone, le chinois ouvre la conversation par 喂 ? (wèi, avec un ton interrogatif monté — à l'oral c'est presque « wéi »). Le ton 2 au lieu du ton 4 est la convention téléphonique, elle sonne plus douce. Puis on demande : 你是哪位 ? (vous êtes qui ?) — formule polie ; ou 你是谁 ? (plus familier). Si on se présente : 我是 [nom]. Verbes clés : 打电话 (dǎ diànhuà, passer un appel, lit. « frapper un téléphone »), 接电话 (jiē, décrocher/répondre), 挂电话 (guà, raccrocher). Pour dire « je te rappelle » : 我一会儿打给你 (je t'appelle dans un moment).",
          contentEn: "On the phone, Chinese opens with 喂? (wèi, rising questioning tone — almost «wéi» orally). Tone 2 instead of tone 4 is phone convention, sounds softer. Then you ask: 你是哪位? (who's this? polite); or 你是谁? (more casual). To introduce yourself: 我是 [name]. Key verbs: 打电话 (dǎ diànhuà, make a call, lit. «hit a phone»), 接电话 (jiē, pick up/answer), 挂电话 (guà, hang up). To say «I'll call back»: 我一会儿打给你 (I'll call you in a bit).",
          objectives: [
            "Ouvrir avec 喂 ? (ton 2 par convention)",
            "Demander 你是哪位 ?",
            "Utiliser 打/接/挂电话",
            "Dire 我一会儿打给你"
          ],
          objectivesEn: [
            "Open with 喂? (tone 2 convention)",
            "Ask 你是哪位?",
            "Use 打/接/挂电话",
            "Say 我一会儿打给你"
          ]
        },
        flashcards: ["喂", "打电话", "接电话", "挂电话", "你是哪位", "我是", "电话", "手机", "一会儿"],
        quizQuestions: 8
      },
      {
        id: "cecr-a2-phone-m2",
        title: "Messages WeChat",
        titleEn: "WeChat messages",
        duration: 10, locked: false, completed: false,
        hskLevel: 2, hskLevels: [2, 3], category: "culture", difficulty: "elementary",
        tags: ["wechat", "text", "cecr:a2"],
        introduction: {
          title: "微信 est plus que WhatsApp",
          titleEn: "微信 is more than WhatsApp",
          content: "微信 (Wēi Xìn, lit. « micro-message ») est omniprésent en Chine : messagerie, paiement, réseau social, mini-apps, santé publique... Vocabulaire essentiel : 加好友 (jiā hǎoyǒu, ajouter un ami), 扫一扫 (sǎo yī sǎo, scanner le QR code pour ajouter), 发消息 (fā xiāoxi, envoyer un message), 语音 (yǔyīn, message vocal — la forme préférée en Chine !), 视频通话 (shìpín tōnghuà, appel vidéo), 朋友圈 (péngyou quān, Moments — le fil d'actualité). Codes sociaux : en Chine on envoie surtout des audios plutôt que des textes. Répondre en texte peut sembler froid. Ne pas lire un message WeChat pendant plus de 3 jours = impolitesse.",
          contentEn: "微信 (Wēi Xìn, lit. «micro-message») is everywhere in China: messaging, payment, social network, mini-apps, public health... Essential vocab: 加好友 (jiā hǎoyǒu, add friend), 扫一扫 (scan QR code to add), 发消息 (fā xiāoxi, send message), 语音 (yǔyīn, voice message — preferred form in China!), 视频通话 (video call), 朋友圈 (péngyou quān, Moments — the feed). Social codes: in China people mostly send audios rather than texts. Text-replying can feel cold. Not reading a WeChat for over 3 days = rude.",
          objectives: [
            "Ajouter un ami : 加好友 / 扫一扫",
            "Envoyer message/audio/vidéo",
            "Partager sur 朋友圈",
            "Comprendre la culture audio en Chine"
          ],
          objectivesEn: [
            "Add friend: 加好友 / 扫一扫",
            "Send message/audio/video",
            "Share on 朋友圈",
            "Understand audio culture in China"
          ]
        },
        flashcards: ["微信", "加好友", "扫一扫", "发消息", "语音", "视频通话", "朋友圈", "点赞", "评论"],
        quizQuestions: 8
      },
      {
        id: "cecr-a2-phone-m3",
        title: "Urgence & problème",
        titleEn: "Emergency & problem",
        duration: 10, locked: false, completed: false,
        hskLevel: 2, hskLevels: [2, 3], category: "vocabulary", difficulty: "elementary",
        tags: ["emergency", "help", "cecr:a2"],
        introduction: {
          title: "Les 3 numéros d'urgence chinois",
          titleEn: "China's 3 emergency numbers",
          content: "À connaître absolument : 110 (police 警察), 119 (pompiers 消防), 120 (ambulance 救护车). Pour appeler au secours : 救命 ! (jiù mìng !, « sauvez-moi ! », cri universel), 帮帮我 ! (bāngbang wǒ, aidez-moi !). Expliquer un problème : 我病了 (je suis malade), 我受伤了 (je suis blessé), 我的东西丢了 (j'ai perdu mes affaires), 我迷路了 (je me suis perdu). Le 了 ici marque un changement d'état. Contacter l'ambassade : 联系大使馆 (liánxì dàshǐguǎn). Avoir sur soi : 护照 (passeport), adresse en caractères sur un papier — les chauffeurs de taxi ne lisent pas le pinyin !",
          contentEn: "Must-know: 110 (police 警察), 119 (fire 消防), 120 (ambulance 救护车). To call for help: 救命! (jiù mìng!, «save me!», universal cry), 帮帮我! (help me!). Explain a problem: 我病了 (I'm sick), 我受伤了 (I'm hurt), 我的东西丢了 (I lost my stuff), 我迷路了 (I got lost). The 了 here marks a state change. Contact embassy: 联系大使馆 (liánxì dàshǐguǎn). Carry with you: 护照 (passport), address in characters on paper — taxi drivers don't read pinyin!",
          objectives: [
            "Mémoriser 110/119/120",
            "Crier 救命 ! / 帮帮我 !",
            "Décrire un problème avec V + 了",
            "Connaître 护照 / 大使馆"
          ],
          objectivesEn: [
            "Memorize 110/119/120",
            "Shout 救命! / 帮帮我!",
            "Describe problem with V + 了",
            "Know 护照 / 大使馆"
          ]
        },
        flashcards: ["救命", "帮帮我", "警察", "消防", "救护车", "病了", "受伤", "丢了", "迷路", "护照", "大使馆"],
        quizQuestions: 8
      }
    ]
  },
  {
    id: "cecr-a2-grammar",
    name: "Grammaire A2",
    nameEn: "A2 Grammar",
    description: "了 perfectif, 过 expérience, 在 progressif, 也/都, 要/想.",
    descriptionEn: "了 perfective, 过 experience, 在 progressive, 也/都, 要/想.",
    icon: "🧩",
    color: "amber",
    lessons: [
      {
        id: "cecr-a2-grammar-m1",
        title: "了 (1/3) : perfectif après le verbe",
        titleEn: "了 (1/3): perfective after verb",
        duration: 15, locked: false, completed: false,
        hskLevel: 2, hskLevels: [1, 2, 3], category: "grammar", difficulty: "elementary",
        tags: ["le", "perfective", "grammar", "cecr:a2"],
        introduction: {
          title: "了 derrière le verbe = action terminée",
          titleEn: "了 after verb = completed action",
          content: "了 (le) est le mot chinois le plus ambigu — il a 3 usages distincts. Dans cette leçon, on ne traite QUE le premier : le 了 perfectif, placé juste après le verbe. Il indique qu'une action est terminée : 我吃了饭 (j'ai mangé le repas). Attention : 了 ne veut PAS dire « passé » — le chinois n'a pas de temps grammatical. 我吃饭 = je mange / je vais manger (selon contexte). 我吃了饭 = j'ai fini de manger. Piège : sans complément (COD, quantité, adverbe), 我吃了 est incomplet à l'oral. Il faut : 我吃了饭 ou 我吃了两碗. Négation : 没 + verbe (SANS 了). 我没吃饭 (je n'ai pas mangé). Jamais 我没吃了饭 ✗.",
          contentEn: "了 (le) is the most ambiguous Chinese word — it has 3 distinct uses. This lesson covers ONLY the first: the perfective 了, placed right after the verb. It marks a completed action: 我吃了饭 (I ate/have eaten). Careful: 了 does NOT mean «past» — Chinese has no grammatical tense. 我吃饭 = I eat / I will eat (per context). 我吃了饭 = I finished eating. Trap: without complement (object, quantity, adverb), 我吃了 sounds incomplete orally. You need: 我吃了饭 or 我吃了两碗. Negation: 没 + verb (WITHOUT 了). 我没吃饭 (I didn't eat). Never 我没吃了饭 ✗.",
          objectives: [
            "Placer 了 juste après le verbe",
            "Comprendre : 了 = complétion, pas passé",
            "Compléter : verbe + 了 + objet/quantité",
            "Nier avec 没 (sans 了)"
          ],
          objectivesEn: [
            "Place 了 right after verb",
            "Understand: 了 = completion, not past",
            "Complete: verb + 了 + object/quantity",
            "Negate with 没 (no 了)"
          ]
        },
        flashcards: ["了", "吃了", "去了", "买了", "看了", "没", "没吃", "没去", "已经"],
        quizQuestions: 10
      },
      {
        id: "cecr-a2-grammar-m2",
        title: "过 : expérience vécue",
        titleEn: "过: lived experience",
        duration: 12, locked: false, completed: false,
        hskLevel: 2, hskLevels: [2, 3], category: "grammar", difficulty: "elementary",
        tags: ["guo", "experience", "grammar", "cecr:a2"],
        introduction: {
          title: "过 = « avoir déjà... un jour »",
          titleEn: "过 = «have ever... once»",
          content: "过 (guo, atone) après un verbe signale une expérience déjà vécue au moins une fois dans la vie. 我去过中国 (je suis allé en Chine — au moins une fois, dans ma vie). 你吃过饺子吗 ? (tu as déjà mangé des raviolis ?). Contraste essentiel avec 了 : 我吃了饺子 = j'ai mangé les raviolis (l'action spécifique, récente) ; 我吃过饺子 = j'ai déjà mangé des raviolis (dans ma vie). Négation : 没 + verbe + 过. 我没去过中国 (je ne suis jamais allé en Chine). Jamais 不 avec 过.",
          contentEn: "过 (guo, toneless) after a verb marks a life experience had at least once. 我去过中国 (I've been to China — at least once, in my life). 你吃过饺子吗? (have you ever eaten dumplings?). Key contrast with 了: 我吃了饺子 = I ate the dumplings (specific recent action); 我吃过饺子 = I've tried dumplings (in my life). Negation: 没 + verb + 过. 我没去过中国 (I've never been to China). Never 不 with 过.",
          objectives: [
            "Placer 过 après le verbe",
            "Distinguer 过 (expérience) / 了 (complétion)",
            "Poser : V + 过 + 吗 ?",
            "Nier : 没 + V + 过"
          ],
          objectivesEn: [
            "Place 过 after verb",
            "Tell 过 (experience) / 了 (completion)",
            "Ask: V + 过 + 吗?",
            "Negate: 没 + V + 过"
          ]
        },
        flashcards: ["过", "去过", "吃过", "看过", "学过", "没去过", "没吃过", "从来没"],
        quizQuestions: 8
      },
      {
        id: "cecr-a2-grammar-m3",
        title: "在 : action en cours",
        titleEn: "在: action in progress",
        duration: 10, locked: false, completed: false,
        hskLevel: 2, hskLevels: [1, 2, 3], category: "grammar", difficulty: "elementary",
        tags: ["zai", "progressive", "grammar", "cecr:a2"],
        introduction: {
          title: "在 + verbe = « être en train de »",
          titleEn: "在 + verb = «be doing»",
          content: "Le même caractère 在 (zài) a deux usages totalement différents : (1) comme verbe d'emplacement : 我在家 (je suis à la maison) — 在 = « être à » + lieu ; (2) comme marqueur de progressif : 我在吃饭 (je suis en train de manger) — 在 + verbe = action en cours. Pour renforcer : 正在 (zhèng zài, exactement en train de). 他正在睡觉 (il est justement en train de dormir). À la fin, on ajoute parfois 呢 : 我在看书呢 (je lis, là maintenant). Différence avec -ing anglais : le chinois 在 souligne l'instantanéité, pas la continuité abstraite.",
          contentEn: "The same 在 (zài) has two totally different uses: (1) as location verb: 我在家 (I'm home) — 在 = «be at» + place; (2) as progressive marker: 我在吃饭 (I'm eating). To reinforce: 正在 (zhèng zài, precisely in progress). 他正在睡觉 (he's just sleeping now). Often final 呢: 我在看书呢 (I'm reading, right now). Vs English -ing: Chinese 在 stresses immediacy, not abstract continuity.",
          objectives: [
            "Distinguer 在 lieu / 在 progressif",
            "Former 在 + verbe pour une action en cours",
            "Renforcer avec 正在",
            "Ajouter 呢 à la fin"
          ],
          objectivesEn: [
            "Tell 在 location / 在 progressive",
            "Form 在 + verb for ongoing action",
            "Reinforce with 正在",
            "Add final 呢"
          ]
        },
        flashcards: ["在", "正在", "呢", "在吃", "在看", "在做", "在说", "在睡觉"],
        quizQuestions: 8
      },
      {
        id: "cecr-a2-grammar-m4",
        title: "也 vs 都 : aussi et tous",
        titleEn: "也 vs 都: also and all",
        duration: 10, locked: false, completed: false,
        hskLevel: 1, hskLevels: [1, 2], category: "grammar", difficulty: "elementary",
        tags: ["ye", "dou", "grammar", "cecr:a2"],
        introduction: {
          title: "也 = « aussi », 都 = « tous sans exception »",
          titleEn: "也 = «also», 都 = «all without exception»",
          content: "Ces deux petits adverbes sont souvent confondus par les débutants. 也 (yě) = « aussi » au sens « moi aussi / elle aussi ». Il fait écho à un sujet précédent : 他喜欢咖啡，我也喜欢 (il aime le café, moi aussi). 都 (dōu) = « tous sans exception », totalisateur. 我们都是学生 (nous sommes tous étudiants). Règle absolue : les deux se placent AVANT le verbe, jamais avant le sujet. Erreur : 也我喜欢 ✗ — il faut 我也喜欢. Les deux peuvent coexister : 我们也都是学生 (nous aussi nous sommes tous étudiants). Ordre fixe : 也 avant 都.",
          contentEn: "These two little adverbs confuse beginners. 也 (yě) = «also» in the sense «me too / her too». Echoes a previous subject: 他喜欢咖啡，我也喜欢 (he likes coffee, me too). 都 (dōu) = «all without exception», totalizer. 我们都是学生 (we're all students). Absolute rule: both before the verb, never before subject. Error: 也我喜欢 ✗ — should be 我也喜欢. Can coexist: 我们也都是学生 (we too are all students). Fixed order: 也 before 都.",
          objectives: [
            "Utiliser 也 pour l'écho du sujet",
            "Utiliser 都 pour « tous sans exception »",
            "Placer 也/都 AVANT le verbe",
            "Respecter l'ordre 也 + 都"
          ],
          objectivesEn: [
            "Use 也 for subject echo",
            "Use 都 for «all without exception»",
            "Place 也/都 BEFORE verb",
            "Respect order 也 then 都"
          ]
        },
        flashcards: ["也", "都", "我也", "他也", "都是", "都不", "都有", "我们都"],
        quizQuestions: 8
      },
      {
        id: "cecr-a2-grammar-m5",
        title: "要 vs 想 : vouloir en deux nuances",
        titleEn: "要 vs 想: want in two shades",
        duration: 12, locked: false, completed: false,
        hskLevel: 2, hskLevels: [1, 2, 3], category: "grammar", difficulty: "elementary",
        tags: ["yao", "xiang", "modal", "grammar", "cecr:a2"],
        introduction: {
          title: "要 = volonté ferme, 想 = désir/projet",
          titleEn: "要 = firm will, 想 = desire/plan",
          content: "Les deux traduisent « vouloir », mais avec des forces différentes. 要 (yào) : volonté décidée, proche de « I want / I will ». 我要一杯咖啡 (je veux un café — au serveur). 想 (xiǎng) : désir plus hypothétique, proche de « I'd like / I'm thinking of ». 我想喝咖啡 (j'ai envie de boire un café). Quand on commande au restau : TOUJOURS 要 (direct). Quand on parle d'un projet futur : souvent 想 (moins engageant). 想 a aussi le sens de « penser à » : 我想你 (tu me manques = je pense à toi). 要 peut aussi signifier « devoir/falloir » : 我要工作 (je dois travailler). Négation : 不要 (ne pas vouloir), 不想 (pas envie).",
          contentEn: "Both translate «want», but with different strengths. 要 (yào): decisive will, close to «I want / I will». 我要一杯咖啡 (I want a coffee — to waiter). 想 (xiǎng): hypothetical desire, close to «I'd like / I'm thinking of». 我想喝咖啡 (I feel like drinking coffee). When ordering: ALWAYS 要 (direct). For future plans: often 想 (less committing). 想 also means «to miss/think of»: 我想你 (I miss you). 要 can mean «must/need»: 我要工作 (I have to work). Negation: 不要 (don't want), 不想 (don't feel like).",
          objectives: [
            "Choisir 要 (volonté ferme) / 想 (désir)",
            "Utiliser 要 au restaurant",
            "Exprimer un projet avec 想",
            "Comprendre 想 = « manquer » (emotional)"
          ],
          objectivesEn: [
            "Choose 要 (firm will) / 想 (desire)",
            "Use 要 at the restaurant",
            "Express plan with 想",
            "Understand 想 = «miss» emotionally"
          ]
        },
        flashcards: ["要", "想", "不要", "不想", "我要", "我想", "想你", "想家", "要工作"],
        quizQuestions: 10
      }
    ]
  },

  {
    id: "cecr-a2-culture",
    name: "Fêtes & traditions",
    nameEn: "Festivals & traditions",
    description: "Nouvel An chinois, fêtes traditionnelles, étiquette.",
    descriptionEn: "Chinese New Year, traditional festivals, etiquette.",
    icon: "🧧",
    color: "amber",
    lessons: [
      {
        id: "cecr-a2-culture-m1",
        title: "春节 : le Nouvel An chinois",
        titleEn: "春节: Chinese New Year",
        duration: 12, locked: false, completed: false,
        hskLevel: 2, hskLevels: [2, 3, 4], category: "culture", difficulty: "elementary",
        tags: ["festival", "newyear", "cecr:a2"],
        introduction: {
          title: "La plus grande migration humaine",
          titleEn: "The world's largest migration",
          content: "Le 春节 (Chūnjié, « Fête du Printemps ») est la plus grande fête chinoise, célébrée sur 15 jours autour du 1er jour du calendrier lunaire (fin janvier-mi-février). Rituels clés : 团圆饭 (tuányuán fàn, repas de retrouvailles la veille), 红包 (hóngbāo, enveloppes rouges avec de l'argent, données aux enfants), 春联 (chūnlián, distiques rouges collés sur les portes), 鞭炮 (biānpào, pétards pour chasser les démons), 饺子 (raviolis obligatoires au nord le soir du réveillon). Salutation : 新年快乐 ! (xīnnián kuàilè, bonne année !) ou 恭喜发财 ! (gōngxǐ fācái, prospérité !). Tabous : ne pas balayer le 1er jour (balaye la chance), ne pas casser de vaisselle.",
          contentEn: "春节 (Chūnjié, «Spring Festival») is the biggest Chinese holiday, celebrated 15 days around day 1 of the lunar calendar (late Jan-mid Feb). Key rituals: 团圆饭 (reunion dinner on New Year's Eve), 红包 (hóngbāo, red envelopes with money, given to children), 春联 (chūnlián, red couplets pasted on doors), 鞭炮 (firecrackers to scare demons), 饺子 (mandatory dumplings in the north on NY Eve). Greetings: 新年快乐! (happy new year!) or 恭喜发财! (prosperity!). Taboos: no sweeping on day 1 (sweeps luck away), no breaking dishes.",
          objectives: [
            "Nommer 5 rituels clés",
            "Souhaiter 新年快乐 / 恭喜发财",
            "Savoir recevoir un 红包",
            "Connaître 3 tabous du jour 1"
          ],
          objectivesEn: [
            "Name 5 key rituals",
            "Wish 新年快乐 / 恭喜发财",
            "Know how to receive a 红包",
            "Know 3 day-1 taboos"
          ]
        },
        flashcards: ["春节", "团圆饭", "红包", "春联", "鞭炮", "饺子", "新年快乐", "恭喜发财"],
        quizQuestions: 8
      },
      {
        id: "cecr-a2-culture-m2",
        title: "中秋节 : Fête de la Lune",
        titleEn: "中秋节: Mid-Autumn Festival",
        duration: 10, locked: false, completed: false,
        hskLevel: 2, hskLevels: [3, 4], category: "culture", difficulty: "elementary",
        tags: ["festival", "midautumn", "cecr:a2"],
        introduction: {
          title: "团圆 : la lune pleine = la famille réunie",
          titleEn: "团圆: full moon = family reunited",
          content: "中秋节 (Zhōngqiū jié, Fête de la mi-automne, 15e jour du 8e mois lunaire, généralement septembre) est la 2e fête la plus importante. Symbole central : la pleine lune (满月) incarne la réunion familiale (团圆). On mange des 月饼 (yuè bǐng, gâteaux de lune) — petits gâteaux ronds, gras et sucrés, fourrés de pâte de haricot rouge, de graines de lotus, ou d'un jaune d'œuf salé au centre qui représente la lune. Légende : 嫦娥 (Cháng'é), la déesse de la lune, a bu l'élixir d'immortalité et s'est envolée vers la lune. On offre aussi des 月饼 aux collègues et partenaires pro — c'est un moment clé du business chinois.",
          contentEn: "中秋节 (Zhōngqiū jié, Mid-Autumn Festival, 15th day of 8th lunar month, usually September) is the 2nd most important holiday. Central symbol: full moon (满月) embodies family reunion (团圆). People eat 月饼 (mooncakes) — round, rich, sweet cakes, filled with red bean paste, lotus seeds, or a salted egg yolk in the center representing the moon. Legend: 嫦娥 (Cháng'é), moon goddess, drank the immortality elixir and flew to the moon. 月饼 are also offered to colleagues and business partners — a key moment in Chinese business.",
          objectives: [
            "Dater 中秋节 (15e jour du 8e mois lunaire)",
            "Connaître 月饼 et leurs fourrages",
            "Raconter la légende de 嫦娥",
            "Comprendre 团圆 = réunion familiale"
          ],
          objectivesEn: [
            "Date 中秋节 (15th day of 8th lunar month)",
            "Know 月饼 and fillings",
            "Tell the 嫦娥 legend",
            "Understand 团圆 = family reunion"
          ]
        },
        flashcards: ["中秋节", "月饼", "满月", "团圆", "嫦娥", "赏月", "农历", "中秋快乐"],
        quizQuestions: 8
      },
      {
        id: "cecr-a2-culture-m3",
        title: "Étiquette à table",
        titleEn: "Table etiquette",
        duration: 10, locked: false, completed: false,
        hskLevel: 2, hskLevels: [2, 3, 4], category: "culture", difficulty: "elementary",
        tags: ["etiquette", "meal", "cecr:a2"],
        introduction: {
          title: "Les baguettes : 5 règles sacrées",
          titleEn: "Chopsticks: 5 sacred rules",
          content: "Règles à respecter absolument. (1) Ne JAMAIS planter ses 筷子 verticalement dans le riz : ça évoque l'encens rituel pour les morts, très tabou. (2) Ne pas tapoter son bol avec les baguettes : c'est un geste de mendiant. (3) Ne pas passer de nourriture d'une baguette à une autre : rappelle le rite funéraire des os crémés. (4) Au début du repas, l'aîné ou l'hôte mange en premier, on attend. (5) Servir les autres avant soi, surtout pour 茶 (thé) ou 酒 (alcool). Compliment standard après le repas : 很好吃，谢谢 (très bon, merci) — l'hôte répondra par une auto-dévalorisation polie : 哪里，很一般 (pas du tout, c'est très ordinaire).",
          contentEn: "Must-respect rules. (1) NEVER stick your 筷子 vertically in rice: evokes ritual incense for the dead, taboo. (2) Don't tap bowl with chopsticks: beggar gesture. (3) Don't pass food chopstick-to-chopstick: mirrors cremated-bones funeral rite. (4) At meal start, elder/host eats first, you wait. (5) Serve others before yourself, especially 茶 (tea) or 酒 (alcohol). Standard compliment after meal: 很好吃，谢谢 — host will reply with polite self-deprecation: 哪里，很一般 (not at all, very ordinary).",
          objectives: [
            "Mémoriser les 5 règles des baguettes",
            "Attendre l'aîné / l'hôte",
            "Servir les autres d'abord",
            "Remercier : 很好吃，谢谢"
          ],
          objectivesEn: [
            "Memorize 5 chopstick rules",
            "Wait for elder / host",
            "Serve others first",
            "Thank: 很好吃，谢谢"
          ]
        },
        flashcards: ["筷子", "碗", "盘子", "勺子", "敬酒", "干杯", "请", "谢谢", "很好吃"],
        quizQuestions: 8
      },
      {
        id: "cecr-a2-culture-m4",
        title: "Zodiaque chinois",
        titleEn: "Chinese zodiac",
        duration: 10, locked: false, completed: false,
        hskLevel: 2, hskLevels: [3, 4], category: "culture", difficulty: "elementary",
        tags: ["zodiac", "culture", "cecr:a2"],
        introduction: {
          title: "十二生肖 : 12 animaux, cycle de 12 ans",
          titleEn: "十二生肖: 12 animals, 12-year cycle",
          content: "Le zodiaque chinois (生肖, shēngxiào) compte 12 animaux dans un ordre fixe : 鼠 (rat), 牛 (bœuf), 虎 (tigre), 兔 (lapin), 龙 (dragon), 蛇 (serpent), 马 (cheval), 羊 (chèvre), 猴 (singe), 鸡 (coq), 狗 (chien), 猪 (cochon). Chaque année lunaire est associée à un animal. 2026 est l'année du 马 (cheval). Question typique en Chine : 你属什么 ? (tu es de quel signe ?) — réponse : 我属龙 (je suis dragon). Attention : ça permet de deviner l'âge à 12 ans près ! Le 龙 est le plus prestigieux ; les naissances explosent dans les années du dragon. Cérémonie du 本命年 (běnmìng nián, année de son signe, tous les 12 ans) : porter du rouge pour conjurer la malchance.",
          contentEn: "Chinese zodiac (生肖) has 12 animals in fixed order: 鼠 (rat), 牛 (ox), 虎 (tiger), 兔 (rabbit), 龙 (dragon), 蛇 (snake), 马 (horse), 羊 (goat), 猴 (monkey), 鸡 (rooster), 狗 (dog), 猪 (pig). Each lunar year is paired with an animal. 2026 is year of the 马 (horse). Typical question in China: 你属什么? (what's your sign?) — answer: 我属龙 (I'm a dragon). Warning: it reveals age within 12 years! 龙 is most prestigious; births surge in dragon years. 本命年 ceremony (own-sign year, every 12 years): wear red to ward off bad luck.",
          objectives: [
            "Nommer les 12 animaux du zodiaque",
            "Dire 我属 + animal",
            "Connaître l'année en cours",
            "Comprendre 本命年 et le rouge"
          ],
          objectivesEn: [
            "Name the 12 zodiac animals",
            "Say 我属 + animal",
            "Know this year's animal",
            "Understand 本命年 and red"
          ]
        },
        flashcards: ["生肖", "属", "鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪", "本命年"],
        quizQuestions: 10
      }
    ]
  }
  ,
  // ═══════════════════════════════════════════════════════════════════════════
  // B1.1 — Seuil (1/2) : 30 leçons / 7 parcours
  // Focus : grammaires polysémiques (了 états, 把, 被, 是…的, 的/地/得, 就/才)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "cecr-b11-grammar",
    name: "Grammaire B1.1 — 了 · 把 · 被 · 的/地/得 · 是…的",
    nameEn: "Grammar B1.1 — 了 · 把 · 被 · 的/地/得 · 是…的",
    description: "Le cœur grammatical du B1 : les 3 emplois de 了, la construction 把, le passif 被, les 3 particules 的/地/得, la focale 是…的.",
    descriptionEn: "The B1 grammar core: the 3 uses of 了, the 把 construction, passive 被, the 3 particles 的/地/得, the 是…的 focus construction.",
    icon: "🕰️",
    color: "violet",
    lessons: [
{
        id: "cecr-b11-le-m1",
        title: "了 (2/3) : changement d'état",
        titleEn: "了 (2/3): state change",
        duration: 15, locked: false, completed: false,
        hskLevel: 3, hskLevels: [2, 3], category: "grammar", difficulty: "intermediate",
        tags: ["le", "state", "grammar", "cecr:b11"],
        introduction: {
          title: "了 final = « maintenant, c'est devenu... »",
          titleEn: "final 了 = «now it has become...»",
          content: "Le 2e usage de 了 n'a RIEN à voir avec le perfectif. Placé à la FIN de la phrase (pas après le verbe), il signale un changement de situation, un nouvel état. Comparez : 他是老师 (il est prof — fait statique) vs 他是老师了 (il est devenu prof — maintenant il l'est). 我饿 (j'ai faim — description) vs 我饿了 (j'ai faim MAINTENANT — avant non). 下雨了 (il s'est mis à pleuvoir). 我不去了 (je n'y vais plus — décision nouvelle). C'est le 了 le plus puissant émotionnellement : il signale toujours « voilà, les choses ont changé ». En français, souvent rendu par « maintenant », « il est devenu », « finalement ». Piège : un verbe peut avoir DEUX 了 (un perfectif + un final) : 我吃了三个苹果了 (j'ai déjà mangé 3 pommes — et j'en ai fini). Le 1er marque la complétion, le 2e marque que l'événement est clos maintenant.",
          contentEn: "了's 2nd use has NOTHING to do with the perfective. Placed at the END of the sentence (not after the verb), it marks a situation change, a new state. Compare: 他是老师 (he is a teacher — static fact) vs 他是老师了 (he has become a teacher — now he is). 我饿 (I'm hungry — description) vs 我饿了 (I'm hungry NOW — wasn't before). 下雨了 (it started raining). 我不去了 (I'm not going anymore — new decision). This is the most emotionally loaded 了: it always signals «there, things have changed». In English, often rendered by «now», «has become», «finally». Trap: a verb can have TWO 了s (perfective + final): 我吃了三个苹果了 (I've eaten 3 apples — and I'm done).",
          objectives: [
            "Placer 了 à la FIN pour un changement d'état",
            "Distinguer 我饿 (description) / 我饿了 (nouveau)",
            "Comprendre 下雨了, 我不去了",
            "Reconnaître les doubles 了"
          ],
          objectivesEn: [
            "Place 了 at the END for state change",
            "Tell 我饿 (static) / 我饿了 (new)",
            "Understand 下雨了, 我不去了",
            "Recognize double 了"
          ]
        },
        flashcards: ["下雨了", "不去了", "饿了", "渴了", "累了", "晚了", "老了", "好了"],
        quizQuestions: 10
      },
      {
        id: "cecr-b11-le-m2",
        title: "了 (3/3) : quantité atteinte",
        titleEn: "了 (3/3): quantity reached",
        duration: 12, locked: false, completed: false,
        hskLevel: 3, hskLevels: [2, 3], category: "grammar", difficulty: "intermediate",
        tags: ["le", "quantity", "grammar", "cecr:b11"],
        introduction: {
          title: "了 + quantité + 了 : durée accumulée",
          titleEn: "了 + quantity + 了: accumulated duration",
          content: "Le 3e usage combine les deux précédents et sert à exprimer une durée/quantité accumulée ET qui continue. Structure : S + V + 了 + quantité + 了. 我学了两年中文了 = j'apprends le chinois depuis 2 ans (et je continue). Comparez : 我学了两年中文 (j'ai étudié 2 ans — c'est fini) vs 我学了两年中文了 (j'étudie depuis 2 ans — toujours en cours). La présence des DEUX 了 est ce qui distingue l'action close de l'action en cours. Même logique pour la quantité : 我吃了三碗 (j'ai mangé 3 bols) vs 我吃了三碗了 (j'ai déjà mangé 3 bols — et je compte continuer, ou du moins ce chiffre est déjà atteint maintenant).",
          contentEn: "The 3rd use combines both previous and expresses accumulated duration/quantity that CONTINUES. Structure: S + V + 了 + quantity + 了. 我学了两年中文了 = I've been studying Chinese for 2 years (and continuing). Compare: 我学了两年中文 (I studied for 2 years — done) vs 我学了两年中文了 (I've been studying for 2 years — still ongoing). The two 了s are what tells closed action from ongoing. Same for quantity: 我吃了三碗 (I ate 3 bowls) vs 我吃了三碗了 (I've already eaten 3 bowls — count is reached now).",
          objectives: [
            "Former V + 了 + quantité + 了",
            "Exprimer une durée qui continue",
            "Distinguer un seul 了 (fini) / deux 了 (en cours)",
            "Utiliser avec 年/月/天/次/碗/本"
          ],
          objectivesEn: [
            "Form V + 了 + quantity + 了",
            "Express an ongoing duration",
            "Tell single 了 (done) / double 了 (ongoing)",
            "Use with 年/月/天/次/碗/本"
          ]
        },
        flashcards: ["学了", "工作了", "住了", "等了", "已经", "多久", "多长时间", "还在"],
        quizQuestions: 8
      },
      {
        id: "cecr-b11-le-m3",
        title: "了 : récap & pièges",
        titleEn: "了: recap & traps",
        duration: 15, locked: false, completed: false,
        hskLevel: 3, hskLevels: [2, 3], category: "grammar", difficulty: "intermediate",
        tags: ["le", "recap", "grammar", "cecr:b11"],
        introduction: {
          title: "3 positions, 3 sens — la carte mentale",
          titleEn: "3 positions, 3 meanings — the mental map",
          content: "Récapitulons. (1) V + 了 = action complète : 我吃了饭. (2) Phrase + 了 (fin) = changement d'état : 我吃饭了 (je mange maintenant / je me mets à manger). (3) V + 了 + quantité + 了 = durée en cours : 我吃了半小时了. Pièges fréquents : avec 不/没 pour nier, JAMAIS 不 + V + 了 ✗ et JAMAIS 没 + V + 了 ✗. Nier le perfectif : 我没吃饭. Nier un changement d'état : 我不吃了 (je ne mange plus — 了 reste, car c'est le nouvel état). Avec 常常, 每天, toujours, on n'utilise JAMAIS 了 : 我每天吃饭 ✓, 我每天吃了饭 ✗. Avec 是 + nom, on préfère omettre 了 sauf pour marquer le changement (他是老师了 = il est devenu prof).",
          contentEn: "Recap. (1) V + 了 = completed action: 我吃了饭. (2) Sentence + 了 (end) = state change: 我吃饭了 (I'm eating now / starting). (3) V + 了 + quantity + 了 = ongoing duration: 我吃了半小时了. Frequent traps: with 不/没 for negation, NEVER 不 + V + 了 ✗ and NEVER 没 + V + 了 ✗. Negate perfective: 我没吃饭. Negate state change: 我不吃了 (I'm not eating anymore — 了 stays, it's the new state). With 常常, 每天, habits, NEVER use 了: 我每天吃饭 ✓, 我每天吃了饭 ✗. With 是 + noun, prefer no 了 unless marking change (他是老师了 = he has become a teacher).",
          objectives: [
            "Classer toute phrase avec 了 en 3 types",
            "Nier correctement (没 ou 不, jamais avec 了)",
            "Proscrire 了 avec 每天/常常/总是",
            "Maîtriser le double 了"
          ],
          objectivesEn: [
            "Sort any 了 sentence into 3 types",
            "Negate correctly (没 or 不, never with 了)",
            "Ban 了 with 每天/常常/总是",
            "Master double 了"
          ]
        },
        flashcards: ["了", "没", "不", "已经", "还没", "常常", "每天", "刚才"],
        quizQuestions: 12
      },
{
        id: "cecr-b11-ba-m1",
        title: "把 (1/2) : qu'est-ce qu'on en fait ?",
        titleEn: "把 (1/2): what do we do WITH it?",
        duration: 15, locked: false, completed: false,
        hskLevel: 3, hskLevels: [3, 4], category: "grammar", difficulty: "intermediate",
        tags: ["ba", "disposal", "grammar", "cecr:b11"],
        introduction: {
          title: "把 = « prendre X et lui faire quelque chose »",
          titleEn: "把 = «take X and do something to it»",
          content: "La construction 把 est la signature du chinois intermédiaire. Structure : S + 把 + OBJET + V + complément. Elle déplace l'objet AVANT le verbe et oblige le verbe à être « complété » (avec 了, un résultatif, une direction, une quantité — jamais un verbe nu !). 我把书放在桌上 (j'ai mis le livre sur la table) vs 我放书在桌上 ✗ — l'ordre objet-avant-verbe est obligatoire quand on veut insister sur ce qu'il ADVIENT à l'objet. Comparez : 我吃了那个苹果 (j'ai mangé cette pomme — juste une constatation) vs 我把那个苹果吃了 (j'ai traité la pomme = l'ai bel et bien mangée, elle n'existe plus). 把 suggère qu'on DISPOSE DE l'objet : on le déplace, transforme, détruit, range.",
          contentEn: "把 construction is the signature of intermediate Chinese. Structure: S + 把 + OBJECT + V + complement. It moves object BEFORE verb and forces the verb to be «completed» (with 了, a resultative, direction, quantity — never a bare verb!). 我把书放在桌上 (I put the book on the table) vs 我放书在桌上 ✗ — object-before-verb is mandatory to stress what HAPPENS to the object. Compare: 我吃了那个苹果 (I ate that apple — just a fact) vs 我把那个苹果吃了 (I dealt with the apple = thoroughly ate it, it's gone). 把 implies DISPOSING OF the object: moving, transforming, destroying, tidying.",
          objectives: [
            "Former S + 把 + O + V + complément",
            "Ne JAMAIS mettre un verbe nu après 把",
            "Différencier 我吃了 X / 我把 X 吃了",
            "Utiliser 把 pour déplacer, transformer, ranger"
          ],
          objectivesEn: [
            "Form S + 把 + O + V + complement",
            "NEVER use bare verb after 把",
            "Differ 我吃了 X / 我把 X 吃了",
            "Use 把 to move, transform, tidy"
          ]
        },
        flashcards: ["把", "把书", "放在", "放到", "拿走", "搬到", "送给", "放下"],
        quizQuestions: 10
      },
      {
        id: "cecr-b11-ba-m2",
        title: "把 (2/2) : les 5 compléments obligatoires",
        titleEn: "把 (2/2): the 5 required complements",
        duration: 12, locked: false, completed: false,
        hskLevel: 3, hskLevels: [3, 4], category: "grammar", difficulty: "intermediate",
        tags: ["ba", "complement", "grammar", "cecr:b11"],
        introduction: {
          title: "Les 5 types de compléments qui débloquent 把",
          titleEn: "The 5 complement types that unlock 把",
          content: "Sans complément, la phrase en 把 est agrammaticale. Les 5 compléments possibles : (1) Lieu avec 在/到 : 我把书放在桌上. (2) Bénéficiaire avec 给 : 我把钱给她. (3) Résultatif : V + 完/好/干净. 我把饭吃完了 (j'ai fini le repas). 我把房间打扫干净了 (j'ai nettoyé la chambre). (4) Direction : V + 起来/出去/过来. 他把手举起来 (il a levé la main). (5) Quantité/redoublement : 我把衣服洗了一下 (j'ai vite lavé les vêtements). Négation : 没 AVANT 把. 我没把书放好 (je n'ai pas bien rangé le livre). Jamais 把没 ✗. Utilisez 把 quand vous voulez insister sur le résultat, l'effet concret sur l'objet.",
          contentEn: "Without a complement, a 把 sentence is ungrammatical. The 5 possible complements: (1) Location with 在/到: 我把书放在桌上. (2) Beneficiary with 给: 我把钱给她. (3) Resultative: V + 完/好/干净. 我把饭吃完了 (I finished the meal). 我把房间打扫干净了 (I cleaned the room). (4) Direction: V + 起来/出去/过来. 他把手举起来 (he raised his hand). (5) Quantity/reduplication: 我把衣服洗了一下 (I quickly washed the clothes). Negation: 没 BEFORE 把. 我没把书放好 (I didn't put the book away properly). Never 把没 ✗. Use 把 to emphasize the concrete effect on the object.",
          objectives: [
            "Utiliser les 5 compléments de 把",
            "Placer 没 AVANT 把 pour nier",
            "Éviter 把 + verbe nu",
            "Choisir 把 quand on insiste sur le résultat"
          ],
          objectivesEn: [
            "Use the 5 把 complements",
            "Place 没 BEFORE 把 to negate",
            "Avoid 把 + bare verb",
            "Pick 把 when stressing result"
          ]
        },
        flashcards: ["吃完", "做好", "洗干净", "写完", "喝光", "拿起来", "打扫", "完成"],
        quizQuestions: 10
      },
      {
        id: "cecr-b11-bei-m1",
        title: "被 : le passif chinois",
        titleEn: "被: Chinese passive",
        duration: 15, locked: false, completed: false,
        hskLevel: 3, hskLevels: [3, 4], category: "grammar", difficulty: "intermediate",
        tags: ["bei", "passive", "grammar", "cecr:b11"],
        introduction: {
          title: "被 = « subir l'action de... »",
          titleEn: "被 = «undergo the action of...»",
          content: "被 est le miroir de 把 : là où 把 met l'accent sur qui agit, 被 met l'accent sur qui subit. Structure : OBJET + 被 + (agent) + V + complément. 书被我放在桌上 (le livre a été mis sur la table par moi). 杯子被打破了 (le verre a été cassé — agent omis). Le complément est OBLIGATOIRE comme avec 把 (jamais 被 + verbe nu). Nuance culturelle cruciale : en chinois classique, 被 a une connotation NÉGATIVE (subir quelque chose de désagréable). 他被妈妈骂了 (il s'est fait gronder par maman) sonne naturel ; mais 他被妈妈表扬了 (il a été félicité par maman) sonne bizarre — on préférerait une structure active. Le passif neutre s'étend dans le chinois moderne, mais le réflexe reste : 被 = souvent mauvaise nouvelle.",
          contentEn: "被 is 把's mirror: where 把 stresses who acts, 被 stresses who undergoes. Structure: OBJECT + 被 + (agent) + V + complement. 书被我放在桌上 (the book was put on the table by me). 杯子被打破了 (the glass was broken — agent omitted). Complement MANDATORY like with 把 (never 被 + bare verb). Crucial cultural nuance: in classical Chinese, 被 has NEGATIVE connotation (suffering something unpleasant). 他被妈妈骂了 (he got scolded by mom) sounds natural; but 他被妈妈表扬了 (he was praised by mom) sounds odd — an active structure is preferred. Neutral passive spreads in modern Chinese, but the reflex remains: 被 = often bad news.",
          objectives: [
            "Former O + 被 + (agent) + V + complément",
            "Rendre l'agent optionnel",
            "Ressentir la connotation négative de 被",
            "Ajouter le complément obligatoire"
          ],
          objectivesEn: [
            "Form O + 被 + (agent) + V + complement",
            "Make agent optional",
            "Feel 被's negative connotation",
            "Add mandatory complement"
          ]
        },
        flashcards: ["被", "打破", "偷", "骂", "批评", "吃掉", "弄丢", "抓住"],
        quizQuestions: 10
      },
{
        id: "cecr-b11-de-m1",
        title: "的 : la particule de liaison",
        titleEn: "的: the connector particle",
        duration: 12, locked: false, completed: false,
        hskLevel: 3, hskLevels: [1, 2, 3], category: "grammar", difficulty: "intermediate",
        tags: ["de", "grammar", "cecr:b11"],
        introduction: {
          title: "的 lie un déterminant à un nom",
          titleEn: "的 links a determiner to a noun",
          content: "的 (de) est la plus fréquente des trois — c'est la particule du possessif et des subordonnées. Usage 1 : possessif. 我的书 (mon livre), 他的车 (sa voiture). Omissible avec la famille proche : 我妈 = 我的妈. Usage 2 : adjectif à plusieurs syllabes + nom. 漂亮的女孩 (une jolie fille), 很贵的车 (une voiture très chère). On omet 的 avec les adjectifs monosyllabiques courants : 小狗 (petit chien), 好朋友 (bon ami). Usage 3 : proposition relative — proposition + 的 + nom. 我买的书 (le livre que j'ai acheté), 昨天来的朋友 (l'ami qui est venu hier). C'est l'équivalent du « qui/que » français, mais placé AVANT le nom. Usage 4 : nominalisation. 红的 = le rouge (celui-ci). Règle en or : 的 relie TOUJOURS vers un nom (à gauche ou à droite).",
          contentEn: "的 (de) is the most frequent of the three — it's the possessive and subordinate particle. Use 1: possessive. 我的书 (my book), 他的车 (his car). Omissible with close family: 我妈 = 我的妈. Use 2: multisyllabic adjective + noun. 漂亮的女孩 (a pretty girl), 很贵的车 (a very expensive car). Omit 的 with common monosyllabic adjectives: 小狗 (small dog), 好朋友 (good friend). Use 3: relative clause — clause + 的 + noun. 我买的书 (the book I bought), 昨天来的朋友 (the friend who came yesterday). Equivalent of «who/that/which» but placed BEFORE the noun. Use 4: nominalization. 红的 = the red one. Golden rule: 的 ALWAYS points to a noun (left or right).",
          objectives: [
            "Former un possessif : sujet + 的 + nom",
            "Placer 的 après un adjectif long",
            "Construire une relative : clause + 的 + nom",
            "Nominaliser : adjectif + 的"
          ],
          objectivesEn: [
            "Form possessive: subject + 的 + noun",
            "Place 的 after a long adjective",
            "Build a relative: clause + 的 + noun",
            "Nominalize: adjective + 的"
          ]
        },
        flashcards: ["的", "我的", "他的", "漂亮的", "昨天", "买的", "红的", "新的"],
        quizQuestions: 10
      },
      {
        id: "cecr-b11-de-m2",
        title: "地 : la particule de l'adverbe",
        titleEn: "地: the adverb particle",
        duration: 12, locked: false, completed: false,
        hskLevel: 3, hskLevels: [3, 4], category: "grammar", difficulty: "intermediate",
        tags: ["de", "adverb", "grammar", "cecr:b11"],
        introduction: {
          title: "地 transforme un adjectif en adverbe",
          titleEn: "地 turns an adjective into an adverb",
          content: "地 (attention : ici prononcé « de », pas « dì ») se place entre un adjectif/expression et un verbe pour créer un adverbe de manière. 慢 (lent) + 地 + 说 = 慢慢地说 (parler lentement). 认真 (sérieux) + 地 + 学习 = 认真地学习 (étudier sérieusement). Règle simple : 地 pointe toujours vers un VERBE (à droite). Les adjectifs monosyllabiques sont souvent redoublés avant 地 : 慢慢地, 快快地, 好好地. Pour un adjectif long, pas de redoublement : 认真地, 安静地. Comparez avec 的 : 慢的火车 (un train lent — 的 → nom) vs 慢慢地走 (marcher lentement — 地 → verbe). Comprendre cette distinction = gagner 20 points de grammaire.",
          contentEn: "地 (pronounced «de», not «dì») is placed between an adjective/expression and a verb to form a manner adverb. 慢 (slow) + 地 + 说 = 慢慢地说 (speak slowly). 认真 (serious) + 地 + 学习 = 认真地学习 (study seriously). Simple rule: 地 always points to a VERB (rightward). Monosyllabic adjectives often doubled before 地: 慢慢地, 快快地, 好好地. Long adjectives: no doubling: 认真地, 安静地. Compare with 的: 慢的火车 (a slow train — 的 → noun) vs 慢慢地走 (walk slowly — 地 → verb). Getting this distinction = 20 grammar points.",
          objectives: [
            "Placer 地 entre adjectif et verbe",
            "Redoubler les adjectifs monosyllabiques",
            "Distinguer 的 (→nom) / 地 (→verbe)",
            "Transformer 6 adjectifs en adverbes"
          ],
          objectivesEn: [
            "Place 地 between adjective and verb",
            "Double monosyllabic adjectives",
            "Tell 的 (→noun) / 地 (→verb)",
            "Turn 6 adjectives into adverbs"
          ]
        },
        flashcards: ["地", "慢慢地", "快快地", "认真地", "安静地", "高兴地", "努力地"],
        quizQuestions: 8
      },
      {
        id: "cecr-b11-de-m3",
        title: "得 : la particule du complément",
        titleEn: "得: the complement particle",
        duration: 15, locked: false, completed: false,
        hskLevel: 3, hskLevels: [2, 3, 4], category: "grammar", difficulty: "intermediate",
        tags: ["de", "complement", "grammar", "cecr:b11"],
        introduction: {
          title: "得 introduit une évaluation",
          titleEn: "得 introduces an evaluation",
          content: "得 (ici « de ») vient APRÈS le verbe et introduit une évaluation sur la manière/intensité de l'action. Structure : V + 得 + évaluation. 他跑得很快 (il court (très) vite). 她唱得好 (elle chante bien). 我说得不清楚 (je parle pas clairement). Si le verbe a un objet, il faut le répéter ou utiliser la structure avec objet en premier : 他说汉语说得很好 OU 他汉语说得很好 (il parle bien chinois). La forme 他说得很好汉语 ✗ est fausse. Question : V + 得 + 怎么样 ? 他跑得怎么样 ? (il court comment ?). Négation : V + 得 + 不 + adjectif. 我睡得不好 (j'ai mal dormi). Rappel : 的 pointe vers un nom, 地 vers un verbe (à droite), 得 évalue un verbe (à gauche).",
          contentEn: "得 (here «de») comes AFTER the verb and introduces an evaluation of how/how much. Structure: V + 得 + evaluation. 他跑得很快 (he runs fast). 她唱得好 (she sings well). 我说得不清楚 (I don't speak clearly). If verb has an object, repeat it or front the object: 他说汉语说得很好 OR 他汉语说得很好 (he speaks Chinese well). 他说得很好汉语 ✗ is wrong. Question: V + 得 + 怎么样? 他跑得怎么样? (how does he run?). Negation: V + 得 + 不 + adjective. 我睡得不好 (I slept badly). Recap: 的 points to a noun, 地 to a verb (rightward), 得 evaluates a verb (leftward).",
          objectives: [
            "Former V + 得 + évaluation",
            "Répéter le verbe si objet présent",
            "Demander V + 得 + 怎么样 ?",
            "Distinguer les 3 « de »"
          ],
          objectivesEn: [
            "Form V + 得 + evaluation",
            "Repeat verb if object present",
            "Ask V + 得 + 怎么样?",
            "Tell apart the 3 «de»"
          ]
        },
        flashcards: ["得", "跑得快", "唱得好", "说得好", "写得漂亮", "睡得晚", "怎么样"],
        quizQuestions: 10
      },
      {
        id: "cecr-b11-de-m4",
        title: "的/地/得 : quiz de tri",
        titleEn: "的/地/得: sorting quiz",
        duration: 15, locked: false, completed: false,
        hskLevel: 3, hskLevels: [2, 3, 4], category: "grammar", difficulty: "intermediate",
        tags: ["de", "recap", "grammar", "cecr:b11"],
        introduction: {
          title: "Une heuristique infaillible",
          titleEn: "A fool-proof heuristic",
          content: "Pour ne plus jamais se tromper, appliquez cette heuristique en 3 questions. (1) Ce qui suit est-il un NOM ? → 的. Ex : 我的书 (nom), 漂亮的女孩 (nom). (2) Ce qui suit est-il un VERBE ? → 地. Ex : 慢慢地走 (verbe), 认真地工作 (verbe). (3) Ce qui PRÉCÈDE est-il un verbe, et ce qui suit une évaluation ? → 得. Ex : 跑得快, 唱得好. Astuce : à l'écrit (y compris sur les forums chinois), les natifs confondent souvent de ↔ 地. À l'oral, les trois sont homophones. Si vous êtes bloqué en écoute, regardez ce qui suit : nom = 的, verbe = 地. Ce qui précède un verbe + évaluation = 得. Avec ça, 95 % des cas sont tranchés.",
          contentEn: "To never mess up again, apply this 3-question heuristic. (1) Is what follows a NOUN? → 的. Ex: 我的书 (noun), 漂亮的女孩 (noun). (2) Is what follows a VERB? → 地. Ex: 慢慢地走 (verb), 认真地工作 (verb). (3) Does what PRECEDES is a verb, and what follows an evaluation? → 得. Ex: 跑得快, 唱得好. Tip: in writing (including Chinese forums), natives often confuse de ↔ 地. All three are homophones orally. If stuck when listening, check what follows: noun = 的, verb = 地. Before a verb + evaluation = 得. That solves 95 % of cases.",
          objectives: [
            "Appliquer l'heuristique en 3 questions",
            "Classer 20 phrases en 的/地/得",
            "Corriger des erreurs natives",
            "Ne plus jamais confondre à l'écrit"
          ],
          objectivesEn: [
            "Apply the 3-question heuristic",
            "Sort 20 sentences into 的/地/得",
            "Fix common native mistakes",
            "Never confuse them in writing"
          ]
        },
        flashcards: ["的", "地", "得", "我的", "慢慢地", "跑得快"],
        quizQuestions: 15
      },
{
        id: "cecr-b11-shide-m1",
        title: "是…的 : insister sur le comment/quand",
        titleEn: "是…的: emphasize how/when",
        duration: 15, locked: false, completed: false,
        hskLevel: 3, hskLevels: [3, 4], category: "grammar", difficulty: "intermediate",
        tags: ["shi-de", "emphasis", "grammar", "cecr:b11"],
        introduction: {
          title: "是…的 met en relief un circonstant",
          titleEn: "是…的 highlights a circumstance",
          content: "La structure 是…的 est unique en chinois : elle insiste sur UN élément précis d'une action PASSÉE et CONNUE (le simple fait qu'elle ait eu lieu n'est pas remis en question). Structure : S + 是 + circonstant + V + 的. 我是昨天来的 (c'est hier que je suis venu — on sait que je suis venu, on insiste sur QUAND). 他是坐飞机来的 (c'est en avion qu'il est venu). 我是在上海学的中文 (c'est à Shanghai que j'ai appris le chinois). Objet souvent entre le verbe et 的 : V + O + 的, ou V + 的 + O. On NE PEUT PAS utiliser 是…的 sur une action future ou sans complément circonstanciel. 是…的 ≠ 了 : 我昨天来了 = fait de venir / 我是昨天来的 = c'est hier (pas un autre jour).",
          contentEn: "The 是…的 structure is unique in Chinese: it emphasizes ONE specific element of a PAST and KNOWN action (the fact of its occurrence isn't questioned). Structure: S + 是 + circumstance + V + 的. 我是昨天来的 (it's yesterday that I came — we know I came, stressing WHEN). 他是坐飞机来的 (it's by plane he came). 我是在上海学的中文 (it's in Shanghai I learned Chinese). Object often between verb and 的: V + O + 的, or V + 的 + O. CANNOT use 是…的 for future actions or without circumstance. 是…的 ≠ 了: 我昨天来了 = I came / 我是昨天来的 = it was yesterday (not another day).",
          objectives: [
            "Former S + 是 + circonstant + V + 的",
            "Insister sur quand/où/comment",
            "Distinguer 是…的 / 了",
            "Placer l'objet avant ou après 的"
          ],
          objectivesEn: [
            "Form S + 是 + circumstance + V + 的",
            "Stress when/where/how",
            "Tell 是…的 / 了 apart",
            "Place object before or after 的"
          ]
        },
        flashcards: ["是...的", "昨天来的", "坐飞机", "怎么来", "什么时候", "跟谁"],
        quizQuestions: 10
      },
      {
        id: "cecr-b11-jiucai-m1",
        title: "就 vs 才 : tôt vs tard",
        titleEn: "就 vs 才: early vs late",
        duration: 15, locked: false, completed: false,
        hskLevel: 3, hskLevels: [3, 4], category: "grammar", difficulty: "intermediate",
        tags: ["jiu", "cai", "grammar", "cecr:b11"],
        introduction: {
          title: "就 = « dès que, tôt, facile » / 才 = « seulement alors, tard, difficile »",
          titleEn: "就 = «as soon as, early, easy» / 才 = «only then, late, hard»",
          content: "Ces deux adverbes expriment un jugement sur le TIMING d'une action. 就 (jiù) : plus tôt que prévu / avec peu d'effort. 他六点就起床了 (il s'est levé dès 6h — c'est tôt). 他一看就懂 (il comprend au premier coup d'œil). 才 (cái) : plus tard que prévu / avec beaucoup d'effort. 他九点才起床 (il ne s'est levé qu'à 9h — c'est tard). 我学了三年才会说 (j'ai dû étudier 3 ans pour savoir parler). Règle grammaticale critique : avec 就 + temps passé, on ajoute 了 ; avec 才 + temps passé, on N'AJOUTE PAS 了 (我九点才起床 ✓, 我九点才起床了 ✗). Pourquoi ? 才 suggère déjà qu'on a mis du temps — le 了 serait redondant et sonnerait faux.",
          contentEn: "These two adverbs express judgment on timing. 就 (jiù): earlier than expected / with little effort. 他六点就起床了 (he got up as early as 6am). 他一看就懂 (he gets it at first glance). 才 (cái): later than expected / with much effort. 他九点才起床 (he didn't get up until 9am). 我学了三年才会说 (I had to study 3 years to speak). Critical grammar rule: with 就 + past time, add 了; with 才 + past time, DO NOT add 了 (我九点才起床 ✓, 我九点才起床了 ✗). Why? 才 already implies it took time — 了 would be redundant.",
          objectives: [
            "Utiliser 就 pour « tôt/facile »",
            "Utiliser 才 pour « tard/difficile »",
            "Ajouter 了 avec 就, JAMAIS avec 才",
            "Placer 就/才 avant le verbe"
          ],
          objectivesEn: [
            "Use 就 for «early/easy»",
            "Use 才 for «late/hard»",
            "Add 了 with 就, NEVER with 才",
            "Place 就/才 before verb"
          ]
        },
        flashcards: ["就", "才", "就是", "就来", "才来", "才三点", "就会了"],
        quizQuestions: 12
      }
    ]
  },


  {
    id: "cecr-b11-work",
    name: "Travail & carrière",
    nameEn: "Work & career",
    description: "Collègues, réunions, mails, entretien d'embauche.",
    descriptionEn: "Colleagues, meetings, emails, job interview.",
    icon: "👔",
    color: "lime",
    lessons: [
      {
        id: "cecr-b11-work-m1",
        title: "Métiers & postes",
        titleEn: "Jobs & positions",
        duration: 10, locked: false, completed: false,
        hskLevel: 3, hskLevels: [2, 3, 4], category: "vocabulary", difficulty: "intermediate",
        tags: ["job", "work", "cecr:b11"],
        introduction: {
          title: "Le suffixe 员 et le préfixe 师",
          titleEn: "The 员 suffix and 师 prefix",
          content: "Les noms de métiers suivent souvent un motif. Suffixe 员 (yuán, membre) = exécutant : 服务员 serveur, 售货员 vendeur, 工程师 ingénieur, 销售员 commercial, 公务员 fonctionnaire. Suffixe 师 (shī, maître) = expert : 老师 prof, 工程师 ingénieur, 律师 avocat, 医师/医生 médecin, 厨师 chef cuisinier. Question type : 你做什么工作 ? (quel est ton métier ?) ou plus formel 您从事什么行业 ? (dans quel secteur travaillez-vous ?). Réponse : 我是 [métier] OU 我在 [entreprise] 工作 (je travaille chez...). Hiérarchie en entreprise : 老板 (patron), 经理 (manager), 主管 (responsable), 同事 (collègue), 下属 (subordonné).",
          contentEn: "Job names often follow a pattern. Suffix 员 (yuán, member) = executor: 服务员 waiter, 售货员 salesperson, 工程师 engineer, 销售员 sales, 公务员 civil servant. Suffix 师 (shī, master) = expert: 老师 teacher, 工程师 engineer, 律师 lawyer, 医师/医生 doctor, 厨师 chef. Typical question: 你做什么工作? (your job?) or more formal 您从事什么行业? (what industry?). Reply: 我是 [job] OR 我在 [company] 工作 (I work at...). Office hierarchy: 老板 (boss), 经理 (manager), 主管 (head), 同事 (colleague), 下属 (subordinate).",
          objectives: [
            "Reconnaître 员 / 师 / 家",
            "Répondre à 你做什么工作 ?",
            "Nommer 6 titres d'entreprise",
            "Situer dans la hiérarchie"
          ],
          objectivesEn: [
            "Recognize 员 / 师 / 家",
            "Answer 你做什么工作?",
            "Name 6 corporate titles",
            "Place oneself in the hierarchy"
          ]
        },
        flashcards: ["工作", "老板", "经理", "同事", "工程师", "律师", "医生", "老师", "公司", "公务员"],
        quizQuestions: 8
      },
      {
        id: "cecr-b11-work-m2",
        title: "Réunion & agenda",
        titleEn: "Meetings & schedule",
        duration: 10, locked: false, completed: false,
        hskLevel: 3, hskLevels: [3, 4], category: "conversation", difficulty: "intermediate",
        tags: ["meeting", "schedule", "cecr:b11"],
        introduction: {
          title: "开会 = « ouvrir une réunion »",
          titleEn: "开会 = «open a meeting»",
          content: "En chinois pro, 开会 (kāi huì, littéralement « ouvrir-réunion ») est le verbe standard pour « être en réunion » ou « tenir une réunion ». On ne dit pas 有会 mais 开会. Convoquer : 通知开会 (annoncer la réunion). Horaire : 下午三点开会. Durée : 开一个小时的会. Salle : 会议室 (huìyì shì). Ordre du jour : 议程 (yìchéng). Vocabulaire critique : 讨论 (discuter), 决定 (décider), 汇报 (faire un rapport), 总结 (conclure). Politesse rituelle : 会议结束，辛苦了 (la réunion est terminée, merci pour vos efforts) — 辛苦了 (xīnkǔ le) est incontournable dans le monde pro chinois.",
          contentEn: "In pro Chinese, 开会 (kāi huì, lit. «open-meeting») is the standard verb for «to be in a meeting». You don't say 有会 but 开会. To call one: 通知开会 (announce the meeting). Time: 下午三点开会. Duration: 开一个小时的会. Room: 会议室 (huìyì shì). Agenda: 议程 (yìchéng). Key vocab: 讨论 (discuss), 决定 (decide), 汇报 (report), 总结 (conclude). Ritual politeness: 会议结束，辛苦了 (meeting's over, thanks for your efforts) — 辛苦了 (xīnkǔ le) is unavoidable in the Chinese workplace.",
          objectives: [
            "Utiliser le verbe 开会",
            "Distinguer 会议 (nom) / 开会 (verbe)",
            "Nommer 4 phases d'une réunion",
            "Clôturer avec 辛苦了"
          ],
          objectivesEn: [
            "Use the 开会 verb",
            "Tell 会议 (noun) / 开会 (verb)",
            "Name 4 meeting phases",
            "Close with 辛苦了"
          ]
        },
        flashcards: ["会议", "开会", "会议室", "议程", "讨论", "决定", "汇报", "总结", "辛苦了"],
        quizQuestions: 8
      },
      {
        id: "cecr-b11-work-m3",
        title: "Emails & messages formels",
        titleEn: "Formal emails & messages",
        duration: 12, locked: false, completed: false,
        hskLevel: 3, hskLevels: [3, 4], category: "writing", difficulty: "intermediate",
        tags: ["email", "formal", "writing", "cecr:b11"],
        introduction: {
          title: "La structure email chinoise",
          titleEn: "Chinese email structure",
          content: "Un email pro chinois suit un ordre précis. (1) 称呼 (salutation) : 尊敬的 [titre] 先生/女士 (cher M/Mme), 您好 ! (2) 开场白 (ouverture) : 感谢您的... (merci de votre...), 希望您一切顺利 (j'espère que tout va bien). (3) 正文 (corps) : concis, un sujet par paragraphe. (4) 结语 (clôture) : 期待您的回复 (dans l'attente de votre réponse), 如有任何问题，请随时联系 (si questions, n'hésitez pas). (5) 署名 (signature) : 此致 (veuillez recevoir...), 敬礼 ! (salutations !), nom, poste. Spécificités : utiliser 您 (vous respectueux), éviter le tutoiement 你 ; signer avec nom chinois en caractères ; éviter les émojis ; toujours CC le 领导 (supérieur hiérarchique) si pertinent.",
          contentEn: "A pro Chinese email follows a strict order. (1) 称呼 (greeting): 尊敬的 [title] 先生/女士 (Dear Mr/Ms), 您好! (2) 开场白 (opening): 感谢您的... (thanks for your...), 希望您一切顺利 (hope all's well). (3) 正文 (body): concise, one topic per paragraph. (4) 结语 (closing): 期待您的回复 (looking forward to your reply), 如有任何问题，请随时联系 (any questions, feel free). (5) 署名 (signature): 此致 (kindly receive), 敬礼! (regards!), name, title. Specifics: use 您 (respectful you), avoid 你; sign with Chinese name in characters; no emojis; always CC 领导 (superior) if relevant.",
          objectives: [
            "Ouvrir avec 尊敬的... 您好 !",
            "Structurer en 5 parties",
            "Clôturer avec 此致 敬礼 !",
            "Utiliser 您 et éviter 你"
          ],
          objectivesEn: [
            "Open with 尊敬的... 您好!",
            "Structure in 5 parts",
            "Close with 此致 敬礼!",
            "Use 您, avoid 你"
          ]
        },
        flashcards: ["尊敬的", "您好", "感谢", "期待", "回复", "此致", "敬礼", "领导", "您"],
        quizQuestions: 10
      },
      {
        id: "cecr-b11-work-m4",
        title: "Entretien d'embauche",
        titleEn: "Job interview",
        duration: 12, locked: false, completed: false,
        hskLevel: 3, hskLevels: [3, 4], category: "conversation", difficulty: "intermediate",
        tags: ["interview", "job", "cecr:b11"],
        introduction: {
          title: "Les 5 questions incontournables",
          titleEn: "The 5 unavoidable questions",
          content: "En entretien chinois, 5 questions reviennent systématiquement : (1) 请自我介绍一下 (présentez-vous). Réponse : nom, âge, formation, expérience — 1 min max. (2) 你为什么想来我们公司 ? (pourquoi chez nous ?). (3) 你的优点和缺点是什么 ? (qualités et défauts ?). Astuce : 我最大的缺点是太认真 (mon plus grand défaut est d'être trop sérieux) — cliché assumé. (4) 你对薪水有什么期望 ? (attentes salariales ?). (5) 你还有什么问题吗 ? (des questions ?). Codes culturels : montrer l'humilité (不好意思，我还在学习), parler de l'équipe plutôt que de soi, mentionner la stabilité (稳定的职业发展). Arriver 10 min en avance, remettre le CV à deux mains.",
          contentEn: "In Chinese interviews, 5 questions come up every time: (1) 请自我介绍一下 (introduce yourself). Answer: name, age, education, experience — 1 min max. (2) 你为什么想来我们公司? (why us?). (3) 你的优点和缺点是什么? (strengths and weaknesses?). Tip: 我最大的缺点是太认真 (my biggest flaw is being too serious) — assumed cliché. (4) 你对薪水有什么期望? (salary expectations?). (5) 你还有什么问题吗? (any questions?). Cultural codes: show humility (不好意思，我还在学习), speak of the team, mention stability (稳定的职业发展). Arrive 10 min early, hand over CV with both hands.",
          objectives: [
            "Se présenter en 1 min",
            "Justifier 为什么选择公司",
            "Équilibrer 优点 et 缺点",
            "Négocier le 薪水 poliment"
          ],
          objectivesEn: [
            "Introduce self in 1 min",
            "Justify 为什么选择公司",
            "Balance 优点 and 缺点",
            "Negotiate 薪水 politely"
          ]
        },
        flashcards: ["面试", "简历", "自我介绍", "优点", "缺点", "薪水", "期望", "经验", "学历"],
        quizQuestions: 10
      }
    ]
  },
  {
    id: "cecr-b11-travel",
    name: "Voyage en Chine",
    nameEn: "Traveling in China",
    description: "Réserver, hôtel, train, sites touristiques.",
    descriptionEn: "Book, hotel, train, tourist sites.",
    icon: "✈️",
    color: "lime",
    lessons: [
      {
        id: "cecr-b11-travel-m1",
        title: "Réserver un train",
        titleEn: "Booking a train",
        duration: 12, locked: false, completed: false,
        hskLevel: 3, hskLevels: [3, 4], category: "conversation", difficulty: "intermediate",
        tags: ["train", "booking", "cecr:b11"],
        introduction: {
          title: "高铁 vs 动车 vs 普快 : quel train choisir ?",
          titleEn: "高铁 vs 动车 vs 普快: which train?",
          content: "Le réseau ferroviaire chinois est le plus vaste au monde. Types : 高铁 (gāo tiě, G-train, >300 km/h) ultra-rapide, moderne ; 动车 (dòng chē, D-train, 200-250 km/h) rapide ; 特快 (T-train), 快速 (K-train), 普快 (normal) — trains classiques, plus lents mais moins chers. Classes : 一等座 (1re classe), 二等座 (2e classe, standard), 商务座 (business), 硬座 (dur, pas cher), 软卧 (couchette molle, nuit), 硬卧 (couchette dure). Réserver : 订票 (ordre billet), via 12306 (site officiel). Préparez le 身份证 (carte d'identité, obligatoire) ou le passeport. Arrivée en gare : 进站 (entrer), 安检 (sécurité), 候车厅 (salle d'attente), 检票 (contrôle), 上车 (monter).",
          contentEn: "China's rail network is the world's largest. Types: 高铁 (gāo tiě, G-train, >300 km/h) ultra-fast, modern; 动车 (dòng chē, D-train, 200-250 km/h) fast; 特快 (T-train), 快速 (K-train), 普快 (normal) — classic trains, slower but cheaper. Classes: 一等座 (1st), 二等座 (2nd, standard), 商务座 (business), 硬座 (hard seat, cheap), 软卧 (soft sleeper, night), 硬卧 (hard sleeper). Book: 订票, via 12306 (official). Have 身份证 (ID, mandatory) or passport ready. At station: 进站 (enter), 安检 (security), 候车厅 (waiting area), 检票 (ticket check), 上车 (board).",
          objectives: [
            "Choisir 高铁/动车/普快",
            "Réserver via 12306 avec 身份证",
            "Naviguer 进站 → 安检 → 候车厅 → 上车",
            "Distinguer 硬座/软卧/二等座"
          ],
          objectivesEn: [
            "Choose 高铁/动车/普快",
            "Book via 12306 with 身份证",
            "Navigate 进站 → 安检 → waiting → board",
            "Tell 硬座/软卧/二等座"
          ]
        },
        flashcards: ["高铁", "动车", "火车", "订票", "车票", "身份证", "候车厅", "二等座", "软卧"],
        quizQuestions: 10
      },
      {
        id: "cecr-b11-travel-m2",
        title: "À l'hôtel",
        titleEn: "At the hotel",
        duration: 10, locked: false, completed: false,
        hskLevel: 3, hskLevels: [2, 3, 4], category: "conversation", difficulty: "intermediate",
        tags: ["hotel", "booking", "cecr:b11"],
        introduction: {
          title: "Check-in : 入住 / Check-out : 退房",
          titleEn: "Check-in: 入住 / Check-out: 退房",
          content: "Hôtel = 酒店 (jiǔdiàn) ou 宾馆 (bīnguǎn, plus traditionnel). Auberge = 旅馆 (lǚguǎn). Réception = 前台 (qiántái). À l'arrivée : 我预订了一间 [X] 的房间，我的名字是 [...] (j'ai réservé une chambre [X] au nom de...). Types de chambre : 单人间 (simple), 双人间 (double, 2 lits séparés), 大床房 (lit double). Documents : 护照, 押金 (caution) — en Chine, on laisse souvent 200-500 RMB de caution cash ou sur carte. Service : 打扫 (faire le ménage), 退房 (check-out), avant midi en général. Souci ? 空调坏了 (la clim est cassée), 没有热水 (pas d'eau chaude), 请换一间 (changez-moi de chambre).",
          contentEn: "Hotel = 酒店 (jiǔdiàn) or 宾馆 (bīnguǎn, more traditional). Hostel = 旅馆 (lǚguǎn). Reception = 前台 (qiántái). On arrival: 我预订了一间 [X] 的房间，我的名字是 [...] (I booked an X room under...). Room types: 单人间 (single), 双人间 (double, 2 beds), 大床房 (1 big bed). Docs: 护照, 押金 (deposit) — in China, often 200-500 RMB cash/card deposit. Service: 打扫 (clean), 退房 (check-out), usually before noon. Problem? 空调坏了 (AC broken), 没有热水 (no hot water), 请换一间 (change my room).",
          objectives: [
            "Dire 入住 / 退房",
            "Choisir 单人间/双人间/大床房",
            "Comprendre 押金 (caution cash)",
            "Signaler un problème : ...坏了"
          ],
          objectivesEn: [
            "Say 入住 / 退房",
            "Choose 单人间/双人间/大床房",
            "Understand 押金 (cash deposit)",
            "Report issues: ...坏了"
          ]
        },
        flashcards: ["酒店", "前台", "入住", "退房", "押金", "单人间", "双人间", "大床房", "空调", "热水"],
        quizQuestions: 8
      },
      {
        id: "cecr-b11-travel-m3",
        title: "Sites touristiques",
        titleEn: "Tourist sites",
        duration: 10, locked: false, completed: false,
        hskLevel: 3, hskLevels: [3, 4], category: "culture", difficulty: "intermediate",
        tags: ["tourism", "sites", "cecr:b11"],
        introduction: {
          title: "Les 5 sites que tout étranger veut voir",
          titleEn: "The 5 sites every foreigner wants",
          content: "Les classiques : (1) 长城 (Chángchéng, Grande Muraille) — sections 八达岭 (touristique) et 慕田峪 (moins bondée). (2) 故宫 (Gùgōng, Cité Interdite) à Pékin — réserver en ligne avec le passeport, 1 jour à l'avance minimum. (3) 兵马俑 (Bīngmǎyǒng, Armée de terre cuite) à Xi'an — musée impressionnant. (4) 外滩 (Wàitān, Bund) + 东方明珠 (Oriental Pearl Tower) à Shanghai. (5) 黄山 (Huáng Shān, Montagnes Jaunes) pour la nature. Vocabulaire touristique : 门票 (ticket), 开放时间 (horaires), 导游 (guide), 讲解器 (audioguide), 拍照 (photographier), 纪念品 (souvenir). Souvent besoin du passeport pour acheter les billets. Éviter les week-ends et jours fériés : 人山人海 (foules énormes).",
          contentEn: "The classics: (1) 长城 (Great Wall) — sections 八达岭 (touristy) and 慕田峪 (quieter). (2) 故宫 (Forbidden City) in Beijing — book online with passport, min 1 day ahead. (3) 兵马俑 (Terracotta Army) in Xi'an — impressive museum. (4) 外滩 (Bund) + 东方明珠 (Oriental Pearl Tower) in Shanghai. (5) 黄山 (Yellow Mountains) for nature. Tourist vocab: 门票 (ticket), 开放时间 (hours), 导游 (guide), 讲解器 (audioguide), 拍照 (photo), 纪念品 (souvenir). Often need passport to buy tickets. Avoid weekends and holidays: 人山人海 (massive crowds).",
          objectives: [
            "Nommer 5 sites emblématiques",
            "Réserver un 门票 avec 护照",
            "Louer un 导游 / 讲解器",
            "Éviter les 人山人海"
          ],
          objectivesEn: [
            "Name 5 iconic sites",
            "Book 门票 with 护照",
            "Rent a 导游 / 讲解器",
            "Avoid 人山人海 (crowds)"
          ]
        },
        flashcards: ["长城", "故宫", "兵马俑", "外滩", "黄山", "门票", "导游", "讲解器", "拍照", "纪念品"],
        quizQuestions: 8
      }
    ]
  },

  {
    id: "cecr-b11-emotions-health",
    name: "Émotions & santé",
    nameEn: "Feelings & Health",
    description: "Exprimer ses émotions, décrire un symptôme, consulter un médecin, aller à la pharmacie.",
    descriptionEn: "Express feelings, describe symptoms, see a doctor, visit the pharmacy.",
    icon: "💭",
    color: "pink",
    lessons: [
{
        id: "cecr-b11-emo-m1",
        title: "Vocabulaire des émotions",
        titleEn: "Emotion vocabulary",
        duration: 10, locked: false, completed: false,
        hskLevel: 3, hskLevels: [2, 3, 4], category: "vocabulary", difficulty: "intermediate",
        tags: ["emotion", "feeling", "cecr:b11"],
        introduction: {
          title: "心 (cœur) : le caractère au cœur des émotions",
          titleEn: "心 (heart): the character at the heart of emotions",
          content: "En chinois, la plupart des émotions portent le radical 忄 (xīn, cœur — version latérale) ou 心 (en bas). 高兴 (content), 快乐 (joyeux), 幸福 (heureux) — vs 难过 (triste), 伤心 (peiné), 生气 (en colère), 害怕 (effrayé), 担心 (inquiet), 紧张 (tendu), 失望 (déçu). Structure : S + 感到/觉得 + émotion. 我感到很高兴 (je ressens du bonheur). Pour intensifier : 特别 (spécialement), 非常 (extrêmement), 有点儿 (un peu), 比较 (assez). Règle culturelle : les Chinois modernes expriment moins directement les émotions fortes. Un « je t'aime » peut être remplacé par 我很在乎你 (je tiens beaucoup à toi). Les émotions négatives sont souvent atténuées : 有点不高兴 (un peu pas content) = en réalité assez contrarié.",
          contentEn: "In Chinese, most emotions carry the 忄 radical (xīn, heart — side form) or 心 (bottom). 高兴 (happy), 快乐 (joyful), 幸福 (blissful) — vs 难过 (sad), 伤心 (hurt), 生气 (angry), 害怕 (afraid), 担心 (worried), 紧张 (nervous), 失望 (disappointed). Structure: S + 感到/觉得 + emotion. 我感到很高兴 (I feel happy). To intensify: 特别, 非常, 有点儿, 比较. Cultural rule: modern Chinese express strong emotions less directly. An «I love you» may be replaced by 我很在乎你 (I really care about you). Negative emotions are often softened: 有点不高兴 (a bit unhappy) actually means quite upset.",
          objectives: [
            "Repérer le radical 忄/心",
            "Nommer 10 émotions positives/négatives",
            "Utiliser 感到/觉得 + émotion",
            "Atténuer avec 有点 / intensifier avec 非常"
          ],
          objectivesEn: [
            "Spot the 忄/心 radical",
            "Name 10 positive/negative emotions",
            "Use 感到/觉得 + emotion",
            "Soften with 有点 / intensify with 非常"
          ]
        },
        flashcards: ["高兴", "快乐", "幸福", "难过", "伤心", "生气", "害怕", "担心", "紧张", "失望", "在乎"],
        quizQuestions: 10
      },
      {
        id: "cecr-b11-emo-m2",
        title: "Donner son avis",
        titleEn: "Giving an opinion",
        duration: 10, locked: false, completed: false,
        hskLevel: 3, hskLevels: [3, 4], category: "conversation", difficulty: "intermediate",
        tags: ["opinion", "cecr:b11"],
        introduction: {
          title: "我觉得 / 我认为 / 在我看来 : 3 niveaux",
          titleEn: "我觉得 / 我认为 / 在我看来: 3 levels",
          content: "Trois façons principales de donner son avis, classées du plus informel au plus formel. (1) 我觉得 (wǒ juéde, je trouve) : quotidien, ressenti. 我觉得这部电影很好看 (je trouve que ce film est bien). (2) 我认为 (wǒ rènwéi, je pense que) : plus posé, argumentatif. 我认为教育很重要 (je pense que l'éducation est importante). (3) 在我看来 (zài wǒ kàn lái, à mon sens / littéralement « dans mon regard ») : formel, presque dissertation. 在我看来，这个政策有问题 (à mon sens, cette politique pose problème). Exprimer le doute : 可能 (peut-être), 也许 (sans doute), 好像 (on dirait). Nuancer : 一方面...，另一方面 (d'un côté... de l'autre). Accord : 你说得对 (tu as raison), 我同意 (je suis d'accord). Désaccord poli : 我不太同意 (je ne suis pas trop d'accord).",
          contentEn: "Three main ways to give an opinion, ranked informal to formal. (1) 我觉得 (wǒ juéde, I feel/find): daily, subjective. 我觉得这部电影很好看 (I find this movie good). (2) 我认为 (wǒ rènwéi, I think): more argumentative. 我认为教育很重要 (I think education matters). (3) 在我看来 (zài wǒ kàn lái, from my view): formal, essayistic. 在我看来，这个政策有问题 (in my view, this policy is problematic). Express doubt: 可能, 也许, 好像. Nuance: 一方面...，另一方面 (on one hand... on the other). Agreement: 你说得对, 我同意. Polite disagreement: 我不太同意 (I don't quite agree).",
          objectives: [
            "Choisir 觉得 / 认为 / 在我看来",
            "Nuancer avec 可能 / 也许",
            "Acquiescer : 你说得对",
            "Nuancer un désaccord : 不太同意"
          ],
          objectivesEn: [
            "Pick 觉得 / 认为 / 在我看来",
            "Nuance with 可能 / 也许",
            "Agree: 你说得对",
            "Soften disagreement: 不太同意"
          ]
        },
        flashcards: ["我觉得", "我认为", "在我看来", "可能", "也许", "同意", "不同意", "说得对", "问题"],
        quizQuestions: 8
      },
      {
        id: "cecr-b11-emo-m3",
        title: "Compliments & politesse",
        titleEn: "Compliments & politeness",
        duration: 10, locked: false, completed: false,
        hskLevel: 3, hskLevels: [2, 3, 4], category: "culture", difficulty: "intermediate",
        tags: ["compliment", "politeness", "cecr:b11"],
        introduction: {
          title: "Refuser un compliment : la modestie chinoise",
          titleEn: "Refusing a compliment: Chinese modesty",
          content: "En Chine, recevoir un compliment avec « merci ! » peut sembler arrogant. La réponse traditionnelle est une négation polie : 哪里哪里 (nǎli nǎli, « mais non, mais non »), 过奖了 (guò jiǎng le, « vous flattez trop »), 没有没有 (méiyǒu méiyǒu, « pas du tout »). Exemple : A : 你的中文真好 ! → B : 哪里哪里，还差得远呢 (oh non, je suis encore loin). Complimenter : 你真聪明 (tu es très intelligent), 你做得真好 (tu as bien fait), 你的 [X] 真漂亮. Le compliment doit être précis : dire « tu es gentil » reste vague, mieux vaut « tu es vraiment attentionné ». Cette culture évolue : les jeunes générations acceptent davantage un 谢谢 direct, mais le 哪里 reste la réponse sûre en contexte formel.",
          contentEn: "In China, accepting a compliment with «thanks!» can sound arrogant. Traditional reply is a polite denial: 哪里哪里 (nǎli nǎli, «not at all, not at all»), 过奖了 (guò jiǎng le, «you flatter me»), 没有没有 (no no). Example: A: 你的中文真好! → B: 哪里哪里，还差得远呢 (oh no, I'm still far from it). To compliment: 你真聪明 (you're smart), 你做得真好 (you did great), 你的 [X] 真漂亮. Compliment should be specific: «you're kind» stays vague, better «you're truly thoughtful». This culture shifts: younger generations accept a direct 谢谢, but 哪里 stays safe in formal contexts.",
          objectives: [
            "Répondre à un compliment avec 哪里",
            "Émettre un compliment précis",
            "Utiliser 过奖了 / 没有没有",
            "Naviguer entre modestie et 谢谢"
          ],
          objectivesEn: [
            "Reply to a compliment with 哪里",
            "Craft a precise compliment",
            "Use 过奖了 / 没有没有",
            "Balance modesty and 谢谢"
          ]
        },
        flashcards: ["哪里", "过奖了", "没有没有", "聪明", "漂亮", "真好", "还差得远", "客气"],
        quizQuestions: 8
      },
{
        id: "cecr-b11-health-m1",
        title: "Parties du corps",
        titleEn: "Body parts",
        duration: 10, locked: false, completed: false,
        hskLevel: 3, hskLevels: [2, 3, 4], category: "vocabulary", difficulty: "intermediate",
        tags: ["body", "anatomy", "cecr:b11"],
        introduction: {
          title: "Le corps chinois : 20 mots essentiels",
          titleEn: "The Chinese body: 20 key words",
          content: "Tête et haut : 头 (tête), 脸 (visage), 眼睛 (yeux), 耳朵 (oreilles), 鼻子 (nez), 嘴 (bouche), 牙 (dents). Tronc : 脖子 (cou), 肩膀 (épaule), 胸 (poitrine), 肚子 (ventre), 背 (dos). Membres : 手 (main), 手指 (doigt), 胳膊 (bras), 腿 (jambe), 脚 (pied). Organes internes : 心 (cœur), 肺 (poumons), 胃 (estomac), 肝 (foie). Caractère récurrent : 肉 → 肚 肺 肝 胃 (tous ont le radical « chair »). Expression type : [partie] 疼 = avoir mal. 我头疼 (j'ai mal à la tête). 我肚子疼 (j'ai mal au ventre). Il suffit d'ajouter 疼 (téng, mal) à la partie concernée.",
          contentEn: "Head and top: 头 (head), 脸 (face), 眼睛 (eyes), 耳朵 (ears), 鼻子 (nose), 嘴 (mouth), 牙 (teeth). Torso: 脖子 (neck), 肩膀 (shoulder), 胸 (chest), 肚子 (belly), 背 (back). Limbs: 手 (hand), 手指 (finger), 胳膊 (arm), 腿 (leg), 脚 (foot). Internal organs: 心 (heart), 肺 (lungs), 胃 (stomach), 肝 (liver). Recurring character: 肉 → 肚 肺 肝 胃 (all share the «flesh» radical). Typical expression: [part] 疼 = to hurt. 我头疼 (my head hurts). 我肚子疼 (my stomach hurts). Just add 疼 (téng, ache) to the part in question.",
          objectives: [
            "Nommer 20 parties du corps",
            "Repérer le radical 肉 / 月",
            "Dire ... 疼 pour toute douleur",
            "Localiser une douleur"
          ],
          objectivesEn: [
            "Name 20 body parts",
            "Spot the 肉/月 radical",
            "Say ... 疼 for any pain",
            "Locate pain"
          ]
        },
        flashcards: ["头", "脸", "眼睛", "耳朵", "鼻子", "嘴", "手", "脚", "肚子", "背", "疼"],
        quizQuestions: 10
      },
      {
        id: "cecr-b11-health-m2",
        title: "Chez le médecin",
        titleEn: "At the doctor's",
        duration: 12, locked: false, completed: false,
        hskLevel: 3, hskLevels: [3, 4], category: "conversation", difficulty: "intermediate",
        tags: ["doctor", "health", "cecr:b11"],
        introduction: {
          title: "挂号 : enregistrement = obligatoire",
          titleEn: "挂号: registration = mandatory",
          content: "En Chine, pour voir un médecin, il faut 挂号 (guà hào, enregistrement). À l'hôpital (医院), direction le 挂号处 (bureau d'enregistrement), payer les frais de base, obtenir un ticket et aller au service concerné. Spécialités : 内科 (médecine générale), 外科 (chirurgie), 儿科 (pédiatrie), 妇科 (gynéco), 牙科 (dentaire). Symptômes standards : 发烧 (fièvre), 咳嗽 (toux), 感冒 (rhume), 拉肚子 (diarrhée), 头疼 (mal de tête), 嗓子疼 (mal de gorge). Décrire : 我觉得... (je me sens...), 我有点 ... (j'ai un peu...). Intensité : 有点疼 (un peu) < 很疼 (très) < 非常疼 (extrêmement). Le médecin prescrit : 开药 (donner une ordonnance), vous allez à la 药房 (pharmacie) de l'hôpital.",
          contentEn: "In China, to see a doctor, you must 挂号 (guà hào, register). At the hospital (医院), go to 挂号处 (registration desk), pay a base fee, get a ticket, head to the relevant department. Specialties: 内科 (internal medicine), 外科 (surgery), 儿科 (pediatrics), 妇科 (gyn), 牙科 (dental). Standard symptoms: 发烧 (fever), 咳嗽 (cough), 感冒 (cold), 拉肚子 (diarrhea), 头疼 (headache), 嗓子疼 (sore throat). Describe: 我觉得... (I feel...), 我有点... (I'm a bit...). Intensity: 有点疼 (a bit) < 很疼 (very) < 非常疼 (extremely). Doctor prescribes: 开药 (gives a script), go to the 药房 (pharmacy) in the hospital.",
          objectives: [
            "Faire son 挂号 et aller au service",
            "Choisir entre 内/外/儿/妇科",
            "Décrire un symptôme avec 我觉得",
            "Graduer la douleur"
          ],
          objectivesEn: [
            "Do 挂号 and go to the department",
            "Choose 内/外/儿/妇 specialty",
            "Describe symptom with 我觉得",
            "Grade pain"
          ]
        },
        flashcards: ["医院", "挂号", "发烧", "咳嗽", "感冒", "拉肚子", "头疼", "嗓子疼", "开药", "药房", "内科"],
        quizQuestions: 10
      },
      {
        id: "cecr-b11-health-m3",
        title: "Pharmacie & médicaments",
        titleEn: "Pharmacy & medicines",
        duration: 10, locked: false, completed: false,
        hskLevel: 3, hskLevels: [3, 4], category: "vocabulary", difficulty: "intermediate",
        tags: ["pharmacy", "medicine", "cecr:b11"],
        introduction: {
          title: "Types de médicaments en chinois",
          titleEn: "Types of medicines in Chinese",
          content: "药店 (yàodiàn) = pharmacie. Formes : 药片 (cachet), 胶囊 (gélule), 药水 (sirop), 药膏 (pommade), 眼药水 (collyre). Médicaments courants : 感冒药 (médoc rhume), 退烧药 (antipyrétique), 止痛药 (antidouleur), 消炎药 (anti-inflammatoire), 抗生素 (antibiotique). Posologie : 一天三次，每次两片 (3 fois par jour, 2 cachets à chaque fois). Notation sur la boîte : 饭前 (avant repas), 饭后 (après), 睡前 (avant le coucher). Médecine chinoise traditionnelle (中医 zhōngyī) : 中药 (médicaments herbaux), 针灸 (acupuncture), 拔罐 (ventouses), 按摩 (massage). Les Chinois combinent souvent 西医 (occidentale) et 中医.",
          contentEn: "药店 (yàodiàn) = pharmacy. Forms: 药片 (tablet), 胶囊 (capsule), 药水 (syrup), 药膏 (ointment), 眼药水 (eye drops). Common meds: 感冒药 (cold med), 退烧药 (antipyretic), 止痛药 (painkiller), 消炎药 (anti-inflammatory), 抗生素 (antibiotic). Dosage: 一天三次，每次两片 (3 times a day, 2 tablets each). Box notation: 饭前 (before meals), 饭后 (after), 睡前 (before bed). Traditional Chinese Medicine (中医 zhōngyī): 中药 (herbal meds), 针灸 (acupuncture), 拔罐 (cupping), 按摩 (massage). Chinese people often combine 西医 (Western) and 中医.",
          objectives: [
            "Nommer 5 formes de médicaments",
            "Choisir entre 感冒药/退烧药/止痛药",
            "Lire une posologie : 一天三次",
            "Connaître 针灸, 拔罐, 中药"
          ],
          objectivesEn: [
            "Name 5 medicine forms",
            "Choose 感冒药/退烧药/止痛药",
            "Read dosage: 一天三次",
            "Know 针灸, 拔罐, 中药"
          ]
        },
        flashcards: ["药店", "药片", "胶囊", "感冒药", "退烧药", "止痛药", "中药", "针灸", "饭后", "饭前"],
        quizQuestions: 8
      }
    ]
  }
  ,
  // ═══════════════════════════════════════════════════════════════════════════
  // B1.2 — Seuil (2/2) : 30 leçons / 7 parcours
  // Focus : 不/没, 会/能/可以, 还/又, 比 comparatif, récits, éducation, société
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "cecr-b12-grammar",
    name: "Grammaire B1.2 — modaux · négation · compléments",
    nameEn: "Grammar B1.2 — modals · negation · complements",
    description: "不/没, 会/能/可以, 还/又, 比 comparatif, et les compléments résultatifs (完, 好, 懂, 到) : tout ce qui structure la nuance en B1.2.",
    descriptionEn: "不/没, 会/能/可以, 还/又, 比 comparatives, and resultative complements (完, 好, 懂, 到): everything that structures B1.2 nuance.",
    icon: "🔑",
    color: "violet",
    lessons: [
{
        id: "cecr-b12-bu-m1",
        title: "不 : nier l'habitude, la volonté, le futur",
        titleEn: "不: negate habits, will, future",
        duration: 12, locked: false, completed: false,
        hskLevel: 3, hskLevels: [1, 2, 3], category: "grammar", difficulty: "intermediate",
        tags: ["bu", "negation", "grammar", "cecr:b12"],
        introduction: {
          title: "不 = refus subjectif ou habitude",
          titleEn: "不 = subjective refusal or habit",
          content: "不 (bù) se place avant les verbes et les adjectifs pour nier : (1) une habitude : 我不吃肉 (je ne mange pas de viande — en général) ; (2) une volonté : 我不去 (je ne veux/vais pas y aller) ; (3) une qualité : 她不漂亮 (elle n'est pas jolie) ; (4) le futur : 明天我不来 (je ne viendrai pas demain). Règle de tonalité : 不 (ton 4) devient 不 (ton 2) DEVANT un autre ton 4. 不是 → bú shì, 不要 → bú yào. Mémotechnique : deux tons 4 successifs fatiguent la voix, le chinois évite. Pour les modaux, 不 est obligatoire : 不能, 不会, 不可以, 不想. Ne JAMAIS utiliser 没 avec les modaux (sauf 没有 pour « ne pas avoir »).",
          contentEn: "不 (bù) goes before verbs and adjectives to negate: (1) a habit: 我不吃肉 (I don't eat meat — in general); (2) a will: 我不去 (I don't want/won't go); (3) a quality: 她不漂亮 (she's not pretty); (4) the future: 明天我不来 (I won't come tomorrow). Tone rule: 不 (tone 4) becomes 不 (tone 2) BEFORE another tone 4. 不是 → bú shì, 不要 → bú yào. Mnemonic: two tone-4s in a row tire the voice, Chinese avoids it. With modals, 不 is mandatory: 不能, 不会, 不可以, 不想. NEVER 没 with modals (except 没有 for «not have»).",
          objectives: [
            "Utiliser 不 pour l'habitude et la volonté",
            "Appliquer le sandhi 不 (ton 2 avant ton 4)",
            "Nier le futur avec 不",
            "Utiliser 不能/不会/不想"
          ],
          objectivesEn: [
            "Use 不 for habit and will",
            "Apply sandhi 不 (tone 2 before tone 4)",
            "Negate future with 不",
            "Use 不能/不会/不想"
          ]
        },
        flashcards: ["不", "不是", "不要", "不去", "不能", "不会", "不想", "不喜欢"],
        quizQuestions: 8
      },
      {
        id: "cecr-b12-mei-m1",
        title: "没 : nier l'action accomplie, l'existence",
        titleEn: "没: negate completed actions, existence",
        duration: 12, locked: false, completed: false,
        hskLevel: 3, hskLevels: [1, 2, 3], category: "grammar", difficulty: "intermediate",
        tags: ["mei", "negation", "grammar", "cecr:b12"],
        introduction: {
          title: "没 = fait non accompli ou possession zéro",
          titleEn: "没 = unaccomplished fact or zero possession",
          content: "没 (méi) — et sa forme longue 没有 (méi yǒu) — sert à nier : (1) l'existence ou la possession : 我没有钱 (je n'ai pas d'argent) ; (2) une action accomplie : 我没吃饭 (je n'ai pas mangé — fait non accompli) ; (3) avec 过 (expérience) : 我没去过中国 (je ne suis jamais allé en Chine). Règle absolue : 没 nie un FAIT objectif ; 不 exprime un refus subjectif. Comparez : 我不吃饭 (je ne mange pas — choix/habitude) vs 我没吃饭 (je n'ai pas mangé — constat d'action non réalisée). Ne jamais combiner 没 avec 了 (双重否定) : 我没吃了 ✗. Avec les verbes d'état (是, 认识, 知道), 没 est rare : on préfère 不是, 不认识, 不知道.",
          contentEn: "没 (méi) — and full form 没有 (méi yǒu) — negates: (1) existence/possession: 我没有钱 (I have no money); (2) a completed action: 我没吃饭 (I haven't eaten — unaccomplished fact); (3) with 过 (experience): 我没去过中国 (I've never been to China). Absolute rule: 没 negates an OBJECTIVE fact; 不 expresses subjective refusal. Compare: 我不吃饭 (I don't eat — choice/habit) vs 我没吃饭 (I haven't eaten — unfulfilled action). Never combine 没 with 了: 我没吃了 ✗. With state verbs (是, 认识, 知道), 没 is rare: 不是, 不认识, 不知道 preferred.",
          objectives: [
            "Utiliser 没 pour l'accompli non réalisé",
            "Utiliser 没有 pour la possession",
            "Éviter 没...了 (double négation interdite)",
            "Distinguer 我不吃 / 我没吃"
          ],
          objectivesEn: [
            "Use 没 for unaccomplished facts",
            "Use 没有 for possession",
            "Avoid 没...了 (forbidden double neg)",
            "Distinguish 我不吃 / 我没吃"
          ]
        },
        flashcards: ["没", "没有", "没吃", "没去", "没看", "没过", "没钱", "没人"],
        quizQuestions: 8
      },
      {
        id: "cecr-b12-bumei-m1",
        title: "不 vs 没 : les 10 cas-types",
        titleEn: "不 vs 没: the 10 typical cases",
        duration: 15, locked: false, completed: false,
        hskLevel: 3, hskLevels: [1, 2, 3], category: "grammar", difficulty: "intermediate",
        tags: ["bu", "mei", "negation", "grammar", "cecr:b12"],
        introduction: {
          title: "L'arbre de décision définitif",
          titleEn: "The definitive decision tree",
          content: "Face à une phrase à nier, posez-vous 3 questions : (1) Est-ce une habitude / un goût / une volonté / un futur ? → 不. (2) Est-ce une action qui aurait dû avoir lieu mais n'a pas eu lieu ? → 没. (3) S'agit-il de possession / existence ? → 没有. Cas piège : « je ne mange pas de viande ». 我不吃肉 (je suis végétarien, c'est mon choix) vs 我没吃肉 (cette fois, je n'ai pas mangé de viande — mais d'habitude oui). Autre piège : 知道 (savoir). On dit 我不知道 (je ne sais pas) et non 我没知道 ✗. Pourquoi ? 知道 est un état continu, pas une action ponctuelle. Pareil pour 认识, 是, 喜欢. Règle sécurité : tous les verbes d'ÉTAT se nient avec 不.",
          contentEn: "Facing a sentence to negate, ask 3 questions: (1) Is it a habit / taste / will / future? → 不. (2) Is it an action that was expected but didn't happen? → 没. (3) Is it possession / existence? → 没有. Trap case: «I don't eat meat». 我不吃肉 (I'm vegetarian, my choice) vs 我没吃肉 (this time, I didn't eat meat — but usually I do). Another trap: 知道 (know). You say 我不知道 (I don't know), not 我没知道 ✗. Why? 知道 is a continuous state, not a one-off action. Same for 认识, 是, 喜欢. Safety rule: all STATE verbs take 不.",
          objectives: [
            "Appliquer l'arbre de décision 不/没",
            "Corriger 10 phrases tordues",
            "Proscrire 没 + verbes d'état",
            "Maîtriser 我不吃肉 vs 我没吃肉"
          ],
          objectivesEn: [
            "Apply the 不/没 decision tree",
            "Fix 10 twisted sentences",
            "Ban 没 + state verbs",
            "Master 我不吃肉 vs 我没吃肉"
          ]
        },
        flashcards: ["不", "没", "不吃", "没吃", "不去", "没去", "不知道", "不认识"],
        quizQuestions: 12
      },
{
        id: "cecr-b12-hui-m1",
        title: "会 : savoir-faire et probabilité",
        titleEn: "会: learned skill and likelihood",
        duration: 12, locked: false, completed: false,
        hskLevel: 3, hskLevels: [1, 2, 3], category: "grammar", difficulty: "intermediate",
        tags: ["hui", "modal", "grammar", "cecr:b12"],
        introduction: {
          title: "会 = compétence apprise OU événement probable",
          titleEn: "会 = learned ability OR probable event",
          content: "会 (huì) a deux usages. (1) Savoir-faire qui s'apprend : 我会开车 (je sais conduire), 他会说中文 (il sait parler chinois), 她会游泳 (elle sait nager). Pas besoin d'avoir la compétence aujourd'hui — il suffit de l'avoir apprise. (2) Probabilité, futur : 明天会下雨 (il va pleuvoir demain), 他会来的 (il viendra, sûrement). Le 会 de probabilité est souvent renforcé par 的 à la fin : 他会同意的 (il sera d'accord, c'est sûr). Négation : 不会 (ne sait pas / ne va pas). 我不会说日语 (je ne parle pas japonais), 不会下雨 (il ne pleuvra pas). Distinction-clé avec 能 : si l'action demande APPRENTISSAGE (parler langue, conduire, dessiner), c'est 会.",
          contentEn: "会 (huì) has two uses. (1) Learned skill: 我会开车 (I can drive), 他会说中文 (he can speak Chinese), 她会游泳 (she can swim). Doesn't matter if you can today — enough to have learned. (2) Likelihood, future: 明天会下雨 (it will rain tomorrow), 他会来的 (he'll come, for sure). The 会 of probability often reinforced by final 的: 他会同意的 (he'll agree, sure). Negation: 不会. 我不会说日语 (I don't speak Japanese), 不会下雨 (it won't rain). Key distinction from 能: if the action requires LEARNING (speak language, drive, draw), it's 会.",
          objectives: [
            "Utiliser 会 pour un savoir-faire appris",
            "Utiliser 会 pour une probabilité",
            "Renforcer avec 的 final",
            "Distinguer 会 (appris) de 能 (capable)"
          ],
          objectivesEn: [
            "Use 会 for a learned skill",
            "Use 会 for a likelihood",
            "Reinforce with final 的",
            "Tell 会 (learned) from 能 (able)"
          ]
        },
        flashcards: ["会", "会说", "会开车", "会游泳", "会下雨", "会来", "不会", "会...的"],
        quizQuestions: 10
      },
      {
        id: "cecr-b12-neng-m1",
        title: "能 : capacité physique et possibilité",
        titleEn: "能: physical ability and possibility",
        duration: 12, locked: false, completed: false,
        hskLevel: 3, hskLevels: [1, 2, 3], category: "grammar", difficulty: "intermediate",
        tags: ["neng", "modal", "grammar", "cecr:b12"],
        introduction: {
          title: "能 = « être capable cette fois »",
          titleEn: "能 = «able this time»",
          content: "能 (néng) porte sur la capacité conditionnelle du moment : on a appris ET les conditions permettent. 我会游泳，但今天我感冒了，不能游 (je sais nager, mais aujourd'hui je suis enrhumé, je ne peux pas). La compétence (会) reste, la capacité (能) est bloquée. Autres usages : (1) Quantité : 他能吃三碗饭 (il peut manger 3 bols). (2) Possibilité : 这个办法能解决问题 (cette méthode peut résoudre le problème). (3) Permission informelle : 我能进来吗 ? (puis-je entrer ?) — équivalent soft de 可以. Négation : 不能 (ne pouvoir — capacité bloquée). 你不能进来 (tu ne peux pas entrer). Note : 能 est plus concret que 可以 ; il suggère une capacité réelle, pas juste un droit.",
          contentEn: "能 (néng) refers to conditional ability at a moment: you've learned AND conditions allow. 我会游泳，但今天我感冒了，不能游 (I can swim, but today I have a cold, I can't). Competence (会) stays, ability (能) is blocked. Other uses: (1) Quantity: 他能吃三碗饭 (he can eat 3 bowls). (2) Possibility: 这个办法能解决问题 (this method can solve the problem). (3) Informal permission: 我能进来吗? (may I come in?) — soft version of 可以. Negation: 不能 (can't — ability blocked). 你不能进来 (you can't come in). Note: 能 is more concrete than 可以; suggests real ability, not just a right.",
          objectives: [
            "Utiliser 能 pour la capacité conditionnée",
            "Exprimer une quantité avec 能",
            "Demander permission informelle avec 能",
            "Distinguer 会 / 能"
          ],
          objectivesEn: [
            "Use 能 for conditional ability",
            "Express quantity with 能",
            "Ask informal permission with 能",
            "Tell 会 / 能 apart"
          ]
        },
        flashcards: ["能", "能吃", "能做", "不能", "能不能", "能解决", "能帮", "能来"],
        quizQuestions: 10
      },
      {
        id: "cecr-b12-keyi-m1",
        title: "可以 : permission et suggestion",
        titleEn: "可以: permission and suggestion",
        duration: 10, locked: false, completed: false,
        hskLevel: 3, hskLevels: [1, 2, 3], category: "grammar", difficulty: "intermediate",
        tags: ["keyi", "modal", "grammar", "cecr:b12"],
        introduction: {
          title: "可以 = droit formel ou acceptabilité",
          titleEn: "可以 = formal right or acceptability",
          content: "可以 (kěyǐ) exprime une permission officielle ou une acceptabilité. (1) Permission : 你可以走了 (tu peux partir — c'est autorisé). 这里可以抽烟吗 ? (peut-on fumer ici ?). (2) Suggestion / acceptabilité : 我们可以试试 (on peut essayer). (3) « C'est OK » : 我觉得这个方案可以 (je trouve cette solution OK). Différence-clé avec 能 : 能 = capacité réelle, 可以 = règle ou avis. 我不能游泳 (je ne peux pas nager — jambe cassée) vs 这儿不可以游泳 (il est interdit de nager ici — règlement). Négation : 不可以 est fort, quasi « interdit ». 不能 est plus neutre. Pour « pas pouvoir + modal », on préfère souvent 不能.",
          contentEn: "可以 (kěyǐ) expresses formal permission or acceptability. (1) Permission: 你可以走了 (you may leave — it's allowed). 这里可以抽烟吗? (can one smoke here?). (2) Suggestion / acceptability: 我们可以试试 (we can try). (3) «It's OK»: 我觉得这个方案可以 (I find this plan OK). Key difference from 能: 能 = real capability, 可以 = rule or opinion. 我不能游泳 (I can't swim — broken leg) vs 这儿不可以游泳 (swimming forbidden here — regulation). Negation: 不可以 is strong, almost «forbidden». 不能 is more neutral. For general «cannot + modal», 不能 is often preferred.",
          objectives: [
            "Utiliser 可以 pour une permission",
            "Utiliser 可以 pour une suggestion",
            "Dire 不可以 = interdit",
            "Choisir entre 能 / 可以"
          ],
          objectivesEn: [
            "Use 可以 for permission",
            "Use 可以 for suggestion",
            "Say 不可以 = forbidden",
            "Pick 能 / 可以"
          ]
        },
        flashcards: ["可以", "不可以", "可以吗", "可以试试", "可以走", "可以抽烟"],
        quizQuestions: 8
      },
      {
        id: "cecr-b12-modal-m1",
        title: "会/能/可以 : le test de tri",
        titleEn: "会/能/可以: the sorting test",
        duration: 15, locked: false, completed: false,
        hskLevel: 3, hskLevels: [1, 2, 3], category: "grammar", difficulty: "intermediate",
        tags: ["modal", "hui", "neng", "keyi", "cecr:b12"],
        introduction: {
          title: "3 scénarios, 3 choix",
          titleEn: "3 scenarios, 3 choices",
          content: "Appliquez ce test. Scénario A — « Il sait parler français » : 他 [ ? ] 说法语. La compétence s'apprend → 会. Scénario B — « Je ne peux pas venir demain, je suis malade » : 我明天 [ ? ] 来，我生病了. Capacité bloquée par conditions → 不能. Scénario C — « On peut s'asseoir ici ? » : 这儿 [ ? ] 坐吗 ? Demande de permission → 可以. Cas mixtes : « Tu sais nager ? » → 你会游泳吗 ? (compétence). « Tu peux nager aujourd'hui ? » → 你今天能游泳吗 ? (conditions actuelles). « On peut nager ici ? » → 这儿可以游泳吗 ? (règle). Trois mots, trois angles. Le plus fréquent à l'oral chinois : 能, suivi de 可以, puis 会.",
          contentEn: "Apply this test. Scenario A — «He can speak French»: 他 [?] 说法语. Learned skill → 会. Scenario B — «I can't come tomorrow, I'm sick»: 我明天 [?] 来，我生病了. Ability blocked by conditions → 不能. Scenario C — «May we sit here?»: 这儿 [?] 坐吗? Permission request → 可以. Mixed cases: «Do you know how to swim?» → 你会游泳吗? (skill). «Can you swim today?» → 你今天能游泳吗? (current conditions). «Can we swim here?» → 这儿可以游泳吗? (rule). 3 words, 3 angles. Most frequent orally: 能, then 可以, then 会.",
          objectives: [
            "Trier 15 phrases en 会/能/可以",
            "Reformuler la même idée avec les 3",
            "Choisir la négation adaptée",
            "Savoir quand les 3 sont interchangeables"
          ],
          objectivesEn: [
            "Sort 15 sentences into 会/能/可以",
            "Rephrase the same idea with all 3",
            "Pick the right negation",
            "Know when all 3 are interchangeable"
          ]
        },
        flashcards: ["会", "能", "可以", "不会", "不能", "不可以"],
        quizQuestions: 12
      },
{
        id: "cecr-b12-hai-m1",
        title: "还 : continuation ou addition",
        titleEn: "还: continuation or addition",
        duration: 12, locked: false, completed: false,
        hskLevel: 3, hskLevels: [2, 3, 4], category: "grammar", difficulty: "intermediate",
        tags: ["hai", "grammar", "cecr:b12"],
        introduction: {
          title: "还 = « encore, toujours, en plus »",
          titleEn: "还 = «still, yet, also»",
          content: "还 (hái) a 3 valeurs. (1) Continuation : « toujours, encore ». 他还在睡觉 (il dort toujours). 我还没吃 (je n'ai pas encore mangé). Se place AVANT le verbe. (2) Addition : « en plus, aussi ». 我喜欢咖啡，还喜欢茶 (j'aime le café, et aussi le thé). 我有一本书，还有一支笔 (j'ai un livre, et aussi un stylo). (3) Modération / insistance : « assez, pas mal ». 还不错 (pas mal), 这本书还可以 (ce livre est correct). Le 3e sens est très fréquent à l'oral — 你中国菜做得怎么样 ? 还可以 (comment tu cuisines chinois ? ça va). Piège : le 还 de continuation se combine souvent avec 没 pour dire « pas encore ». 还没…呢 est un classique.",
          contentEn: "还 (hái) has 3 values. (1) Continuation: «still, yet». 他还在睡觉 (he's still sleeping). 我还没吃 (I haven't eaten yet). Goes BEFORE verb. (2) Addition: «also, in addition». 我喜欢咖啡，还喜欢茶 (I like coffee, and also tea). 我有一本书，还有一支笔 (I have a book, and also a pen). (3) Moderation / emphasis: «fairly, not bad». 还不错 (not bad), 这本书还可以 (this book is OK). The 3rd sense is very common orally — 你中国菜做得怎么样? 还可以 (how's your Chinese cooking? OK). Trap: continuation 还 often pairs with 没 for «not yet». 还没…呢 is a classic.",
          objectives: [
            "Utiliser 还 pour la continuation",
            "Utiliser 还 pour l'addition",
            "Saisir 还不错 / 还可以",
            "Combiner 还 + 没...呢"
          ],
          objectivesEn: [
            "Use 还 for continuation",
            "Use 还 for addition",
            "Grasp 还不错 / 还可以",
            "Combine 还 + 没...呢"
          ]
        },
        flashcards: ["还", "还在", "还没", "还有", "还可以", "还不错", "还要", "还是"],
        quizQuestions: 10
      },
      {
        id: "cecr-b12-you-m1",
        title: "又 : répétition dans le passé",
        titleEn: "又: repetition in the past",
        duration: 12, locked: false, completed: false,
        hskLevel: 3, hskLevels: [2, 3, 4], category: "grammar", difficulty: "intermediate",
        tags: ["you", "grammar", "cecr:b12"],
        introduction: {
          title: "又 = « de nouveau » (déjà arrivé)",
          titleEn: "又 = «again» (already happened)",
          content: "又 (yòu) signifie « de nouveau / encore une fois » pour une action qui a DÉJÀ eu lieu (généralement au passé). 他又迟到了 (il est ENCORE en retard — ça s'est déjà produit, un reproche dans le ton). 昨天下雨了，今天又下雨了 (il a plu hier, et il re-pleut aujourd'hui). Structure type : 又 + V + 了. Le 了 est presque obligatoire car l'action s'est produite. Différent de 再 (zài) = « de nouveau » dans le futur : 明天我再来 (je reviendrai demain). Piège : 他又来 ✗ (manque 了 ou contexte futur). Correct : 他又来了 (passé) ou 明天他再来 (futur). Autre usage : 又...又... = « à la fois...et... ». 她又聪明又漂亮 (elle est à la fois intelligente et jolie).",
          contentEn: "又 (yòu) means «again/once more» for an action that HAS ALREADY happened (usually past). 他又迟到了 (he's late AGAIN — it happened before, reproach in the tone). 昨天下雨了，今天又下雨了 (rained yesterday, and raining again today). Typical structure: 又 + V + 了. 了 is almost mandatory as the action occurred. Different from 再 (zài) = «again» in the future: 明天我再来 (I'll come again tomorrow). Trap: 他又来 ✗ (missing 了 or future context). Correct: 他又来了 (past) or 明天他再来 (future). Another use: 又...又... = «both...and...». 她又聪明又漂亮 (she's both smart and pretty).",
          objectives: [
            "Utiliser 又 pour une répétition passée",
            "Combiner 又 + V + 了",
            "Éviter 又 pour un futur (→ 再)",
            "Utiliser 又...又... pour « à la fois »"
          ],
          objectivesEn: [
            "Use 又 for past repetition",
            "Combine 又 + V + 了",
            "Avoid 又 for future (→ 再)",
            "Use 又...又... for «both...and...»"
          ]
        },
        flashcards: ["又", "又来了", "又下雨了", "又迟到", "又...又...", "再", "再来"],
        quizQuestions: 10
      },
      {
        id: "cecr-b12-bi-m1",
        title: "比 : le comparatif clair",
        titleEn: "比: the clear comparative",
        duration: 15, locked: false, completed: false,
        hskLevel: 3, hskLevels: [2, 3, 4], category: "grammar", difficulty: "intermediate",
        tags: ["bi", "comparative", "grammar", "cecr:b12"],
        introduction: {
          title: "A 比 B + adjectif = A est plus... que B",
          titleEn: "A 比 B + adjective = A is more... than B",
          content: "比 (bǐ) construit le comparatif chinois. Structure fixe : A + 比 + B + adjectif. 我比他高 (je suis plus grand que lui). 中国比法国大 (la Chine est plus grande que la France). Pas de 很 ni de 更 devant l'adjectif quand il y a 比 ! Erreur classique : 我比他很高 ✗. On peut préciser la différence : A + 比 + B + adj + quantité. 我比他高五厘米 (je suis plus grand que lui de 5 cm), 他比我大两岁 (il a 2 ans de plus que moi). Pour marquer une intensité : A + 比 + B + 更 + adj. 她比他更聪明 (elle est encore plus intelligente que lui). Négation : 没有 + B + adj. 我没有他高 (je ne suis pas aussi grand que lui — littéralement « je n'ai pas sa hauteur »). 不比 existe mais signifie « pas plus que » (égalité), différent.",
          contentEn: "比 (bǐ) forms the Chinese comparative. Fixed structure: A + 比 + B + adjective. 我比他高 (I'm taller than him). 中国比法国大 (China is bigger than France). NO 很 or 更 before the adjective when 比 is present! Classic error: 我比他很高 ✗. You can specify the gap: A + 比 + B + adj + quantity. 我比他高五厘米 (I'm 5 cm taller), 他比我大两岁 (he's 2 years older). To intensify: A + 比 + B + 更 + adj. 她比他更聪明 (she's even smarter than him). Negation: 没有 + B + adj. 我没有他高 (I'm not as tall as him — lit. «I don't have his tallness»). 不比 exists but means «no more than» (equality), different.",
          objectives: [
            "Former A + 比 + B + adjectif (sans 很)",
            "Quantifier la différence : 高五厘米",
            "Intensifier avec 更",
            "Nier : A + 没有 + B + adj"
          ],
          objectivesEn: [
            "Form A + 比 + B + adj (no 很)",
            "Quantify the gap: 高五厘米",
            "Intensify with 更",
            "Negate: A + 没有 + B + adj"
          ]
        },
        flashcards: ["比", "比较", "更", "比...高", "比...大", "没有...高", "一样", "不比"],
        quizQuestions: 10
      },
{
        id: "cecr-b22-grammar-complement-m1",
        title: "Compléments de résultat : 完/好/懂/到",
        titleEn: "Result complements: 完/好/懂/到",
        duration: 12, locked: false, completed: false,
        hskLevel: 3, hskLevels: [3, 4], category: "grammar", difficulty: "advanced",
        tags: ["result-complement", "grammar", "cecr:b22"],
        introduction: {
          title: "V + résultat : le verbe dit l'action, le complément dit la fin",
          titleEn: "V + result: the verb says the action, the complement says the end",
          content: "Un verbe seul est ambigu : 吃 = « manger » mais sans dire si c'est fini. Les compléments de résultat précisent l'état final. Les 4 plus courants : 完 (wán, finir — 吃完 finir de manger), 好 (hǎo, bien/complet — 做好 bien faire, 准备好 être prêt), 懂 (dǒng, comprendre — 听懂 entendre-comprendre, 看懂 lire-comprendre), 到 (dào, atteindre/parvenir — 找到 trouver, 看到 voir, 听到 entendre). La négation se fait avec 没 : 我没听懂 (« je n'ai pas compris [à l'oreille] »). Impossible avec 不 pour un fait accompli — on dit 听不懂 (« incapable de comprendre », potentiel).",
          contentEn: "A verb alone is ambiguous: 吃 = «eat» but doesn't say if it's done. Result complements specify the end state. The 4 most common: 完 (finish — 吃完 finish eating), 好 (well/complete — 做好 do well, 准备好 be ready), 懂 (understand — 听懂 hear-understand, 看懂 read-understand), 到 (reach — 找到 find, 看到 see, 听到 hear). Negation uses 没: 我没听懂 («I didn't understand [aurally]»). Impossible with 不 for an accomplished fact — we say 听不懂 («unable to understand», potential).",
          objectives: [
            "Utiliser 完/好/懂/到 après verbe",
            "Différencier 看 vs 看到 vs 看懂",
            "Nier avec 没, pas 不",
            "Maîtriser 准备好/找到/听懂"
          ],
          objectivesEn: [
            "Use 完/好/懂/到 after verb",
            "Differentiate 看 vs 看到 vs 看懂",
            "Negate with 没, not 不",
            "Master 准备好/找到/听懂"
          ]
        },
        flashcards: ["完", "好", "懂", "到", "听懂", "看到", "找到", "准备好"],
        quizQuestions: 8
      },
      {
        id: "cecr-b22-grammar-complement-m2",
        title: "Compléments directionnels simples : 上/下/进/出/回/过",
        titleEn: "Simple directional complements: 上/下/进/出/回/过",
        duration: 12, locked: false, completed: false,
        hskLevel: 3, hskLevels: [3, 4], category: "grammar", difficulty: "advanced",
        tags: ["direction-complement", "grammar", "cecr:b22"],
        introduction: {
          title: "V + 上/下/进/出 — direction physique",
          titleEn: "V + 上/下/进/出 — physical direction",
          content: "Les compléments directionnels simples indiquent la direction du mouvement : 上 (shàng, vers le haut/dessus), 下 (xià, vers le bas), 进 (jìn, entrer), 出 (chū, sortir), 回 (huí, revenir), 过 (guò, passer). Accolés à un verbe de mouvement : 走进 (entrer en marchant), 跑出 (sortir en courant), 坐下 (s'asseoir), 站起 (se lever — forme tronquée de 站起来). Quand il y a un objet-lieu : il va AU MILIEU (verbe + lieu + complément) : 走进房间 ou 走进房间去. Ne pas confondre avec 来/去 qui sont également complémentaires.",
          contentEn: "Simple directional complements indicate movement direction: 上 (up/onto), 下 (down), 进 (enter), 出 (exit), 回 (return), 过 (pass). Attached to a motion verb: 走进 (walk in), 跑出 (run out), 坐下 (sit down), 站起 (stand up — shortened form of 站起来). When there's a location object: it goes in the MIDDLE (verb + location + complement): 走进房间 or 走进房间去. Don't confuse with 来/去 which are also complements.",
          objectives: [
            "Combiner V + 上/下/进/出/回/过",
            "Placer l'objet-lieu au milieu",
            "Utiliser 坐下/站起/走进",
            "Décrire un parcours de mouvement"
          ],
          objectivesEn: [
            "Combine V + 上/下/进/出/回/过",
            "Place location object in the middle",
            "Use 坐下/站起/走进",
            "Describe a motion path"
          ]
        },
        flashcards: ["上", "下", "进", "出", "回", "过", "走进", "坐下"],
        quizQuestions: 8
      },
      {
        id: "cecr-b22-grammar-complement-m3",
        title: "Compléments directionnels composés : 上来/下去/进来/出去",
        titleEn: "Compound directional complements: 上来/下去/进来/出去",
        duration: 12, locked: false, completed: false,
        hskLevel: 4, hskLevels: [4, 5], category: "grammar", difficulty: "advanced",
        tags: ["direction-complement", "compound", "cecr:b22"],
        introduction: {
          title: "La grille 6×2 : direction + perspective",
          titleEn: "The 6×2 grid: direction + perspective",
          content: "Chacun des 6 directionnels (上/下/进/出/回/过) se combine avec 来 (vers le locuteur) ou 去 (loin du locuteur) : 上来/上去, 下来/下去, 进来/进去, 出来/出去, 回来/回去, 过来/过去. Exemples : 他走过来 (« il vient par ici ») vs 他走过去 (« il va par là-bas »). 请进来 (« entrez [vers moi] »). Usage abstrait : 看起来 (« à première vue »), 想起来 (« se souvenir »), 听下去 (« continuer à écouter »). Un verbe + V directionnel composé + objet = objet AU MILIEU : 他拿出来一本书 ou 他拿出一本书来. Régularité absolue de la grille 6×2 une fois mémorisée.",
          contentEn: "Each of the 6 directionals (上/下/进/出/回/过) combines with 来 (toward speaker) or 去 (away from speaker): 上来/上去, 下来/下去, 进来/进去, 出来/出去, 回来/回去, 过来/过去. Examples: 他走过来 («he comes over here») vs 他走过去 («he goes over there»). 请进来 («come in [toward me]»). Abstract use: 看起来 («at first glance»), 想起来 («remember»), 听下去 («keep listening»). A verb + compound directional + object = object in the MIDDLE: 他拿出来一本书 or 他拿出一本书来. Absolutely regular 6×2 grid once memorized.",
          objectives: [
            "Mémoriser la grille 6 × 来/去",
            "Choisir selon position du locuteur",
            "Placer l'objet au milieu",
            "Utiliser 看起来/想起来 abstrait"
          ],
          objectivesEn: [
            "Memorize the 6 × 来/去 grid",
            "Choose based on speaker position",
            "Place object in middle",
            "Use 看起来/想起来 abstractly"
          ]
        },
        flashcards: ["上来", "下去", "进来", "出去", "回来", "过来", "起来", "看起来"],
        quizQuestions: 8
      }
    ]
  },

  {
    id: "cecr-b12-narration",
    name: "Récits & anecdotes",
    nameEn: "Stories & anecdotes",
    description: "Raconter au passé, structurer un récit, marqueurs temporels.",
    descriptionEn: "Narrate in the past, structure a story, time markers.",
    icon: "✍️",
    color: "emerald",
    lessons: [
      {
        id: "cecr-b12-narr-m1",
        title: "Marqueurs temporels du récit",
        titleEn: "Story time markers",
        duration: 12, locked: false, completed: false,
        hskLevel: 3, hskLevels: [2, 3, 4], category: "grammar", difficulty: "intermediate",
        tags: ["narration", "time", "cecr:b12"],
        introduction: {
          title: "Les connecteurs qui font un récit chinois",
          titleEn: "The connectors that make a Chinese story",
          content: "Pour structurer un récit : (1) 首先 (shǒu xiān, d'abord), (2) 然后 (rán hòu, ensuite), (3) 后来 (hòu lái, plus tard — souvent après une pause narrative), (4) 最后 (zuì hòu, finalement). Positionnement temporel : 那时候 (à ce moment-là), 当时 (alors), 突然 (soudain), 正在 (juste en train de). Causalité : 因为…所以 (parce que…donc — les DEUX sont en chinois, pas comme en français). Concession : 虽然…但是 (bien que…mais — les deux aussi). Ordre chronologique : 以前 (avant), 以后 (après), 同时 (en même temps). Finir : 从此 (dès lors), 结果 (résultat). Avec ces 12 connecteurs, n'importe quelle anecdote devient claire.",
          contentEn: "To structure a narrative: (1) 首先 (shǒu xiān, first), (2) 然后 (rán hòu, then), (3) 后来 (hòu lái, later — often after a narrative pause), (4) 最后 (zuì hòu, finally). Time positioning: 那时候 (at that moment), 当时 (then), 突然 (suddenly), 正在 (just in the middle of). Causality: 因为…所以 (because…so — BOTH in Chinese, unlike English). Concession: 虽然…但是 (although…but — both too). Chronological: 以前 (before), 以后 (after), 同时 (simultaneously). Ending: 从此 (from then on), 结果 (as a result). With these 12 connectors, any anecdote becomes clear.",
          objectives: [
            "Enchaîner 首先/然后/后来/最后",
            "Utiliser 突然/当时 pour le drama",
            "Former 因为...所以 et 虽然...但是",
            "Clôturer avec 结果 / 从此"
          ],
          objectivesEn: [
            "Chain 首先/然后/后来/最后",
            "Use 突然/当时 for drama",
            "Form 因为...所以 and 虽然...但是",
            "Close with 结果 / 从此"
          ]
        },
        flashcards: ["首先", "然后", "后来", "最后", "突然", "当时", "因为", "所以", "虽然", "但是", "结果"],
        quizQuestions: 10
      },
      {
        id: "cecr-b12-narr-m2",
        title: "Raconter au passé",
        titleEn: "Telling in the past",
        duration: 12, locked: false, completed: false,
        hskLevel: 3, hskLevels: [2, 3, 4], category: "writing", difficulty: "intermediate",
        tags: ["narration", "past", "cecr:b12"],
        introduction: {
          title: "Le chinois ne conjugue pas — il date",
          titleEn: "Chinese doesn't conjugate — it dates",
          content: "Pas de passé simple ni d'imparfait en chinois. On situe le récit dans le passé avec : (1) une date explicite : 去年夏天 (l'été dernier), 十年前 (il y a 10 ans), 那一天 (ce jour-là). (2) Une fois la date posée, tous les verbes restent au présent ! 去年我去了中国，每天都吃面条 (l'année dernière je suis allé en Chine, je mangeais des nouilles chaque jour) — remarquez : 了 seulement sur 去 (action unique), pas sur 吃 (habitude du séjour). (3) Pour l'imparfait (actions simultanées en cours), on utilise 在 / 正在 : 那时候我正在工作 (à ce moment-là, j'étais en train de travailler). Ce principe libère : pas de conjugaison, juste un bon usage des marqueurs de temps et des aspects 了/过/在.",
          contentEn: "No past simple or imperfect in Chinese. The narrative is set in the past via: (1) explicit date: 去年夏天 (last summer), 十年前 (10 years ago), 那一天 (that day). (2) Once date is set, verbs stay in present form! 去年我去了中国，每天都吃面条 (last year I went to China, I ate noodles every day) — note: 了 only on 去 (one-off action), not 吃 (habit during stay). (3) For the imperfect (simultaneous ongoing actions), use 在 / 正在: 那时候我正在工作 (at that time, I was working). This principle frees you: no conjugation, just good use of time markers and 了/过/在 aspects.",
          objectives: [
            "Poser un cadre temporel au début",
            "Ne conjuguer RIEN — tout au présent",
            "Placer 了 seulement sur les actions uniques",
            "Utiliser 在/正在 pour l'imparfait"
          ],
          objectivesEn: [
            "Set a time frame at the start",
            "Conjugate NOTHING — all present",
            "Place 了 only on one-off actions",
            "Use 在/正在 for the imperfect"
          ]
        },
        flashcards: ["去年", "前年", "以前", "那一天", "那时候", "正在", "当时", "刚才"],
        quizQuestions: 8
      },
      {
        id: "cecr-b12-narr-m3",
        title: "Discours rapporté",
        titleEn: "Reported speech",
        duration: 10, locked: false, completed: false,
        hskLevel: 3, hskLevels: [3, 4], category: "grammar", difficulty: "intermediate",
        tags: ["reported", "speech", "cecr:b12"],
        introduction: {
          title: "说 : le verbe central du discours rapporté",
          titleEn: "说: the core verb for reported speech",
          content: "En chinois, on rapporte simplement avec 说 (dire) : 他说他明天来 (il dit qu'il vient demain). Pas de concordance des temps ! On conserve le temps original. Autres verbes : 告诉 (dire à — nécessite un destinataire : 他告诉我...) ; 问 (demander) ; 回答 (répondre) ; 解释 (expliquer). Pour une question indirecte, on ne met PAS 吗, mais on utilise 是否 (formel) ou l'alternative A-不-A : 他问我去不去 (il m'a demandé si j'y vais). Citation directe : 他说 :『我来』. Citation indirecte : 他说他来. En chinois moderne, la citation indirecte sans que (我说他来 = « je dis qu'il vient ») est la norme — pas de 说 + 的 ni autre marqueur. C'est fluide et économique.",
          contentEn: "In Chinese, one reports simply with 说 (say): 他说他明天来 (he says he's coming tomorrow). No sequence of tenses! Keep the original tense. Other verbs: 告诉 (tell — needs a recipient: 他告诉我...); 问 (ask); 回答 (answer); 解释 (explain). For indirect questions, DON'T use 吗, but 是否 (formal) or A-不-A alternative: 他问我去不去 (he asked if I'm going). Direct quote: 他说 :『我来』. Indirect: 他说他来. In modern Chinese, indirect quotes without «that» (我说他来 = «I say he's coming») is the norm — no 说 + 的 or other marker. Fluid and economical.",
          objectives: [
            "Utiliser 说 sans concordance",
            "Distinguer 说 / 告诉 / 问",
            "Former une question indirecte avec A-不-A",
            "Passer direct ↔ indirect"
          ],
          objectivesEn: [
            "Use 说 without tense sequencing",
            "Tell 说 / 告诉 / 问 apart",
            "Form indirect questions with A-不-A",
            "Switch direct ↔ indirect speech"
          ]
        },
        flashcards: ["说", "告诉", "问", "回答", "解释", "是否", "表示", "提到"],
        quizQuestions: 8
      },
      {
        id: "cecr-b12-narr-m4",
        title: "Décrire une personne",
        titleEn: "Describing a person",
        duration: 12, locked: false, completed: false,
        hskLevel: 3, hskLevels: [2, 3, 4], category: "writing", difficulty: "intermediate",
        tags: ["narration", "portrait", "cecr:b12"],
        introduction: {
          title: "Du physique au caractère en 4 couches",
          titleEn: "From physical to character in 4 layers",
          content: "Un portrait chinois se construit en couches. (1) Physique général : 高高的 (grand), 瘦瘦的 (mince), 胖胖的 (enveloppé) — le redoublement de l'adjectif adoucit et donne un air affectueux. (2) Visage : 圆脸 (visage rond), 大眼睛 (grands yeux), 短头发 (cheveux courts). (3) Vêtements : 穿着 + vêtement (穿着红色的裙子, elle porte une robe rouge — 穿着 est le marqueur d'état). (4) Caractère : 性格 + adjectif (他性格很温柔, son caractère est très doux). Adjectifs de caractère fréquents : 开朗 (joyeux), 内向 (introverti), 幽默 (humoristique), 认真 (sérieux), 耐心 (patient), 大方 (généreux), 害羞 (timide). Pour une impression : 看起来 (a l'air) + adj : 他看起来很聪明 (il a l'air intelligent). Piège : ne pas empiler 很 avant un adjectif redoublé (高高的 ✓, 很高高的 ✗).",
          contentEn: "A Chinese portrait is built in layers. (1) General build: 高高的 (tall), 瘦瘦的 (thin), 胖胖的 (plump) — reduplicating the adjective softens it and adds warmth. (2) Face: 圆脸 (round face), 大眼睛 (big eyes), 短头发 (short hair). (3) Clothing: 穿着 + garment (穿着红色的裙子, she's wearing a red dress — 穿着 is the state marker). (4) Character: 性格 + adjective (他性格很温柔, his character is very gentle). Common character adjectives: 开朗 (cheerful), 内向 (introverted), 幽默 (humorous), 认真 (serious), 耐心 (patient), 大方 (generous), 害羞 (shy). For impression: 看起来 (seems/looks) + adj: 他看起来很聪明 (he looks smart). Trap: don't stack 很 before a reduplicated adjective (高高的 ✓, 很高高的 ✗).",
          objectives: [
            "Empiler physique → vêtements → caractère",
            "Utiliser 穿着 pour décrire les habits",
            "Choisir 开朗 / 内向 / 幽默 / 认真",
            "Former 看起来 + adjectif"
          ],
          objectivesEn: [
            "Stack body → clothes → character",
            "Use 穿着 to describe clothes",
            "Pick 开朗 / 内向 / 幽默 / 认真",
            "Form 看起来 + adjective"
          ]
        },
        flashcards: ["高", "瘦", "胖", "圆脸", "大眼睛", "穿着", "性格", "开朗", "内向", "幽默", "认真", "看起来"],
        quizQuestions: 10
      },
      {
        id: "cecr-b12-narr-m5",
        title: "Décrire un lieu & une ambiance",
        titleEn: "Describing a place & atmosphere",
        duration: 12, locked: false, completed: false,
        hskLevel: 3, hskLevels: [3, 4], category: "writing", difficulty: "intermediate",
        tags: ["narration", "scene", "cecr:b12"],
        introduction: {
          title: "Du plan large aux détails, de l'espace à l'émotion",
          titleEn: "From wide shot to details, from space to feeling",
          content: "Pour planter un décor : (1) Cadrer l'espace avec 在 + lieu + 有 + objet. 在公园里，有很多老人 (dans le parc, il y a beaucoup de personnes âgées). (2) Situer avec les localisations relatives : 前面 (devant), 后面 (derrière), 左边 (à gauche), 右边 (à droite), 旁边 (à côté), 中间 (au milieu). Note : la structure est 名词 + 的 + position : 桌子的旁边 (à côté de la table). (3) Décrire l'ambiance : 安静 (calme), 热闹 (animé, l'exact opposé de calme, très positif en Chine), 拥挤 (bondé), 舒服 (confortable), 气氛很好 (l'ambiance est bonne). (4) Enrichir avec des sons et des odeurs : 听到 + son, 闻到 + odeur. 我听到了鸟叫 (j'entends les oiseaux chanter), 闻到了花香 (je sens l'odeur des fleurs). Ce verbe 到 après le verbe de perception marque qu'on a BIEN perçu — distinction importante avec un simple 听 (écouter).",
          contentEn: "To set a scene: (1) Frame the space with 在 + place + 有 + object. 在公园里，有很多老人 (in the park, there are many elderly people). (2) Situate with relative positions: 前面 (front), 后面 (behind), 左边 (left), 右边 (right), 旁边 (next to), 中间 (middle). Note: structure is noun + 的 + position: 桌子的旁边 (next to the table). (3) Describe atmosphere: 安静 (quiet), 热闹 (lively, opposite of quiet, very positive in China), 拥挤 (crowded), 舒服 (comfortable), 气氛很好 (good atmosphere). (4) Enrich with sounds and smells: 听到 + sound, 闻到 + smell. 我听到了鸟叫 (I hear the birds sing), 闻到了花香 (I smell the flowers). The 到 after a perception verb marks that perception succeeded — important distinction from mere 听 (to listen).",
          objectives: [
            "Ouvrir sur 在 + lieu + 有 + X",
            "Utiliser 前/后/左/右/旁边/中间",
            "Qualifier avec 安静 / 热闹 / 拥挤",
            "Rendre perceptible avec 听到 / 闻到"
          ],
          objectivesEn: [
            "Open with 在 + place + 有 + X",
            "Use 前/后/左/右/旁边/中间",
            "Qualify with 安静 / 热闹 / 拥挤",
            "Make tangible with 听到 / 闻到"
          ]
        },
        flashcards: ["前面", "后面", "左边", "右边", "旁边", "中间", "安静", "热闹", "拥挤", "气氛", "听到", "闻到"],
        quizQuestions: 10
      }
    ]
  },
  {
    id: "cecr-b12-education-society",
    name: "Éducation & société",
    nameEn: "Education & Society",
    description: "Le système scolaire chinois (gaokao, classe), la famille moderne, les générations, le mariage, le travail.",
    descriptionEn: "Chinese school system (gaokao, class), modern families, generations, marriage, work.",
    icon: "🏫",
    color: "blue",
    lessons: [
{
        id: "cecr-b12-edu-m1",
        title: "Parcours scolaire chinois",
        titleEn: "Chinese school system",
        duration: 10, locked: false, completed: false,
        hskLevel: 3, hskLevels: [2, 3, 4], category: "culture", difficulty: "intermediate",
        tags: ["school", "education", "cecr:b12"],
        introduction: {
          title: "9 ans d'obligation, puis le gaokao",
          titleEn: "9 years compulsory, then the gaokao",
          content: "Système scolaire chinois : 幼儿园 (yòu'éryuán, maternelle, 3-6 ans), 小学 (xiǎoxué, primaire, 6 ans), 初中 (chūzhōng, collège, 3 ans) — les 9 années obligatoires. Puis 高中 (gāozhōng, lycée, 3 ans), couronné par le 高考 (gāokǎo, examen d'entrée à l'université) — l'un des concours les plus difficiles au monde, déterminant toute la carrière. Université : 大学 (dàxué), 本科 (licence, 4 ans), 研究生 (master), 博士 (doctorat). Classement des unis : 一本 (top-tier, « C9 »), 二本, 三本. Le 清华 et le 北大 (Tsinghua, Peking University) sont les deux sommets. Profession d'enseignant : 老师 (générique), 教授 (prof d'université), 导师 (directeur de thèse).",
          contentEn: "Chinese school system: 幼儿园 (yòu'éryuán, kindergarten, 3-6 y), 小学 (xiǎoxué, primary, 6 y), 初中 (chūzhōng, middle school, 3 y) — the 9 compulsory years. Then 高中 (gāozhōng, high school, 3 y), crowned by the 高考 (gāokǎo, university entrance exam) — one of the world's hardest, determining one's whole career. University: 大学 (dàxué), 本科 (bachelor, 4 y), 研究生 (master), 博士 (PhD). Uni rankings: 一本 (top-tier, «C9»), 二本, 三本. 清华 and 北大 (Tsinghua, Peking University) are the two peaks. Teacher titles: 老师 (generic), 教授 (professor), 导师 (thesis advisor).",
          objectives: [
            "Nommer les 5 étapes scolaires",
            "Comprendre l'enjeu du 高考",
            "Distinguer 本科 / 研究生 / 博士",
            "Connaître 清华 et 北大"
          ],
          objectivesEn: [
            "Name the 5 school stages",
            "Understand the 高考 stakes",
            "Tell 本科 / 研究生 / 博士 apart",
            "Know 清华 and 北大"
          ]
        },
        flashcards: ["幼儿园", "小学", "初中", "高中", "大学", "高考", "本科", "研究生", "博士", "教授"],
        quizQuestions: 10
      },
      {
        id: "cecr-b12-edu-m2",
        title: "Apprendre & étudier",
        titleEn: "Learning & studying",
        duration: 10, locked: false, completed: false,
        hskLevel: 3, hskLevels: [1, 2, 3], category: "grammar", difficulty: "intermediate",
        tags: ["learn", "study", "cecr:b12"],
        introduction: {
          title: "学 vs 学习 : apprendre en deux verbes",
          titleEn: "学 vs 学习: learn in two verbs",
          content: "学 (xué) et 学习 (xuéxí) veulent tous deux dire « apprendre / étudier », mais diffèrent en registre. 学 (monosyllabe) : plus oral, souvent suivi d'un COD. 学中文 (apprendre le chinois), 学开车 (apprendre à conduire). 学习 (dissyllabe) : plus écrit, plus formel, plus abstrait. 努力学习 (étudier dur), 学习经验 (apprendre de l'expérience). Phrases type : 复习 (réviser), 预习 (préparer avant le cours), 练习 (s'exercer), 做作业 (faire les devoirs), 背 (apprendre par cœur), 记 (retenir). Pour les examens : 考试 (examen), 考得怎么样 ? (ça s'est passé comment ?), 及格 (avoir la moyenne), 不及格 (recalé), 满分 (20/20). 加油 ! (bon courage !) est LE mot magique pour les étudiants chinois.",
          contentEn: "学 (xué) and 学习 (xuéxí) both mean «learn/study» but differ in register. 学 (monosyllabic): more spoken, often followed by a direct object. 学中文 (learn Chinese), 学开车 (learn to drive). 学习 (bisyllabic): more written, formal, abstract. 努力学习 (study hard), 学习经验 (learn from experience). Typical phrases: 复习 (review), 预习 (prep before class), 练习 (practice), 做作业 (do homework), 背 (memorize), 记 (remember). For exams: 考试 (exam), 考得怎么样? (how did it go?), 及格 (pass), 不及格 (fail), 满分 (perfect score). 加油! (keep going!) is THE magic word for Chinese students.",
          objectives: [
            "Choisir 学 (oral) / 学习 (formel)",
            "Distinguer 复习/预习/练习",
            "Utiliser 做作业, 背, 记",
            "Encourager avec 加油 !"
          ],
          objectivesEn: [
            "Pick 学 (oral) / 学习 (formal)",
            "Tell 复习/预习/练习 apart",
            "Use 做作业, 背, 记",
            "Cheer with 加油!"
          ]
        },
        flashcards: ["学", "学习", "复习", "预习", "练习", "作业", "背", "考试", "及格", "加油"],
        quizQuestions: 8
      },
      {
        id: "cecr-b12-edu-m3",
        title: "Apprendre le chinois",
        titleEn: "Learning Chinese",
        duration: 10, locked: false, completed: false,
        hskLevel: 3, hskLevels: [2, 3, 4], category: "vocabulary", difficulty: "intermediate",
        tags: ["chinese", "learning", "cecr:b12"],
        introduction: {
          title: "La méta-leçon : parler de sa progression",
          titleEn: "The meta-lesson: talking about your progress",
          content: "Vocabulaire indispensable pour parler de votre apprentissage du chinois. 汉字 (hànzì, caractère), 拼音 (pīnyīn, transcription phonétique), 声调 (shēngdiào, tons), 笔画 (bǐhuà, trait), 部首 (bùshǒu, radical/clé). Quatre compétences : 听 (écouter), 说 (parler), 读 (lire), 写 (écrire). Les Chinois vous diront toujours : 你的中文真好 ! (ton chinois est super !) — soyez modeste : 哪里哪里，还差得远. Décrire son niveau : 我学了三年 (j'étudie depuis 3 ans), 我能看懂简单的文章 (je comprends des textes simples), 我的发音还不太准 (ma prononciation n'est pas encore précise). Demander une reformulation : 请再说一遍 (répétez s'il vous plaît), 慢一点 (plus lentement), 这个字怎么写 ? (comment écrit-on ce caractère ?).",
          contentEn: "Essential vocab to talk about your Chinese journey. 汉字 (hànzì, character), 拼音 (pīnyīn, phonetic transcription), 声调 (shēngdiào, tones), 笔画 (bǐhuà, stroke), 部首 (bùshǒu, radical/key). 4 skills: 听 (listen), 说 (speak), 读 (read), 写 (write). Chinese people will always say: 你的中文真好! (your Chinese is great!) — be modest: 哪里哪里，还差得远. Describe your level: 我学了三年 (I've studied for 3 years), 我能看懂简单的文章 (I can read simple texts), 我的发音还不太准 (my pronunciation isn't precise yet). Ask for a reformulation: 请再说一遍 (please repeat), 慢一点 (slower), 这个字怎么写? (how do you write this?).",
          objectives: [
            "Nommer 汉字/拼音/声调/笔画",
            "Décrire son niveau avec 学了...年",
            "Demander 再说一遍 / 慢一点",
            "Gérer le compliment avec 哪里"
          ],
          objectivesEn: [
            "Name 汉字/拼音/声调/笔画",
            "Describe level with 学了...年",
            "Ask 再说一遍 / 慢一点",
            "Handle compliment with 哪里"
          ]
        },
        flashcards: ["汉字", "拼音", "声调", "笔画", "部首", "听", "说", "读", "写", "发音"],
        quizQuestions: 8
      },
{
        id: "cecr-b12-soc-m1",
        title: "La famille élargie",
        titleEn: "The extended family",
        duration: 12, locked: false, completed: false,
        hskLevel: 3, hskLevels: [2, 3, 4], category: "culture", difficulty: "intermediate",
        tags: ["family", "society", "cecr:b12"],
        introduction: {
          title: "Côté père / côté mère : tout est distinct",
          titleEn: "Dad's side / Mom's side: everything splits",
          content: "Le chinois distingue soigneusement les parents paternels et maternels. Grand-parents : 爷爷 (gr. père paternel) ≠ 外公 (gr. père maternel) ; 奶奶 (gr. mère paternelle) ≠ 外婆 (gr. mère maternelle). Le 外 (wài, « extérieur ») marque tout ce qui vient du côté mère — rappel de l'ancien patriarcat : la fille « part » dans sa belle-famille. Oncle/tante : 叔叔 (oncle paternel cadet), 伯伯 (oncle paternel aîné), 姑姑 (tante paternelle), vs 舅舅 (oncle maternel), 姨妈 (tante maternelle). Cousins : 堂 (du côté père), 表 (du côté mère) : 堂兄/堂弟/表哥/表妹. Aîné/cadet : toujours marqué (哥/弟, 姐/妹). Avec l'enfant unique, ce vocabulaire devient technique mais reste nécessaire pour comprendre la société et la littérature.",
          contentEn: "Chinese carefully distinguishes paternal and maternal relatives. Grandparents: 爷爷 (paternal grandpa) ≠ 外公 (maternal grandpa); 奶奶 (paternal grandma) ≠ 外婆 (maternal grandma). The 外 (wài, «outer») marks everything on Mom's side — echo of old patriarchy: daughter «leaves» for her in-laws. Uncle/aunt: 叔叔 (dad's younger brother), 伯伯 (dad's older brother), 姑姑 (dad's sister), vs 舅舅 (mom's brother), 姨妈 (mom's sister). Cousins: 堂 (dad's side), 表 (mom's side): 堂兄/堂弟/表哥/表妹. Older/younger always marked (哥/弟, 姐/妹). With the one-child generation, this vocab becomes technical but still needed for society and literature.",
          objectives: [
            "Distinguer 爷爷/外公, 奶奶/外婆",
            "Utiliser 叔叔/伯伯/姑姑/舅舅/姨妈",
            "Comprendre 堂 (père) vs 表 (mère)",
            "Marquer l'aîné/cadet"
          ],
          objectivesEn: [
            "Tell 爷爷/外公, 奶奶/外婆 apart",
            "Use 叔叔/伯伯/姑姑/舅舅/姨妈",
            "Understand 堂 (dad) vs 表 (mom)",
            "Mark older/younger"
          ]
        },
        flashcards: ["爷爷", "奶奶", "外公", "外婆", "叔叔", "伯伯", "姑姑", "舅舅", "姨妈", "堂哥", "表妹"],
        quizQuestions: 10
      },
      {
        id: "cecr-b12-soc-m2",
        title: "Mariage & famille moderne",
        titleEn: "Marriage & modern family",
        duration: 10, locked: false, completed: false,
        hskLevel: 3, hskLevels: [3, 4], category: "culture", difficulty: "intermediate",
        tags: ["marriage", "society", "cecr:b12"],
        introduction: {
          title: "结婚 : plus qu'une cérémonie",
          titleEn: "结婚: more than a ceremony",
          content: "Mariage : 结婚 (jié hūn). Verbe sécable : 结了婚 (s'est marié). Étapes : 谈恋爱 (sortir ensemble), 订婚 (se fiancer), 领证 (aller chercher le certificat de mariage — c'est le mariage légal), 婚礼 (cérémonie), 度蜜月 (lune de miel). Note culturelle : en Chine, le 领证 est la vraie union officielle ; la cérémonie (婚礼) peut avoir lieu des mois plus tard. La pression sociale sur le mariage est forte — les 剩女 (shèngnǚ, « femmes restantes » de plus de 27 ans) et les 光棍 (guānggùn, « bâtons nus » = hommes célibataires) sont des étiquettes connues mais contestées. Divorce : 离婚 (lí hūn). Enfant : 孩子 / 子女. Politique de l'enfant : 一孩政策 (1980-2015), 二孩政策 (2016-21), maintenant 三孩政策 depuis 2021.",
          contentEn: "Marriage: 结婚 (jié hūn). Separable verb: 结了婚 (got married). Steps: 谈恋爱 (dating), 订婚 (engagement), 领证 (get the marriage certificate — that's the legal marriage), 婚礼 (ceremony), 度蜜月 (honeymoon). Cultural note: in China, 领证 is the real official union; the ceremony (婚礼) may happen months later. Social pressure on marriage is strong — 剩女 (shèngnǚ, «leftover women» over 27) and 光棍 (guānggùn, «bare sticks» = single men) are known but contested labels. Divorce: 离婚 (lí hūn). Child: 孩子 / 子女. Child policy: 一孩政策 (1980-2015), 二孩政策 (2016-21), now 三孩政策 since 2021.",
          objectives: [
            "Utiliser 结婚 comme verbe sécable",
            "Connaître 谈恋爱 / 订婚 / 领证 / 婚礼",
            "Comprendre la distinction 领证 / 婚礼",
            "Connaître la politique de l'enfant"
          ],
          objectivesEn: [
            "Use 结婚 as a separable verb",
            "Know 谈恋爱 / 订婚 / 领证 / 婚礼",
            "Understand 领证 vs 婚礼",
            "Know the child policy history"
          ]
        },
        flashcards: ["结婚", "离婚", "谈恋爱", "订婚", "领证", "婚礼", "度蜜月", "剩女", "孩子"],
        quizQuestions: 8
      },
      {
        id: "cecr-b12-soc-m3",
        title: "Générations : 90后, 00后",
        titleEn: "Generations: 90s, 00s kids",
        duration: 10, locked: false, completed: false,
        hskLevel: 3, hskLevels: [3, 4], category: "culture", difficulty: "intermediate",
        tags: ["generation", "society", "cecr:b12"],
        introduction: {
          title: "Lire la société par la décennie de naissance",
          titleEn: "Reading society through birth decade",
          content: "En Chine, on parle beaucoup des générations par leur décennie de naissance. 80后 (bā líng hòu, nés dans les années 80), 90后, 00后 (ling líng hòu, nés dans les années 2000 — prononcé « líng líng hòu »). Chaque génération a son étiquette : 80后 = première génération enfant unique, bosseurs, achetant leurs premiers appartements. 90后 = digital natives, souvent critiqués comme « gâtés », en réalité plus ouverts. 00后 = Z chinoise, TikTok (抖音), ultra-connectée, socialement plus libérale. Expressions récentes : 躺平 (tǎng píng, « s'allonger à plat » — refus d'une compétition économique infinie), 内卷 (nèi juǎn, « involution » — compétition absurde où plus personne ne gagne), 打工人 (dǎ gōng rén, « le travailleur » — autodérision des 90后/00后). Ces termes sont partout dans le chinois en ligne.",
          contentEn: "In China, people talk a lot about generations by birth decade. 80后 (bā líng hòu, born in the 80s), 90后, 00后 (líng líng hòu, born in the 2000s — pronounced «líng líng hòu»). Each gen has its label: 80后 = first one-child generation, hardworking, buying their first apartments. 90后 = digital natives, often labeled «spoiled», actually more open. 00后 = Chinese Z, TikTok (抖音), ultra-connected, socially more liberal. Recent expressions: 躺平 (tǎng píng, «lie flat» — rejection of endless economic competition), 内卷 (nèi juǎn, «involution» — absurd competition where no one wins), 打工人 (dǎ gōng rén, «the worker» — self-mockery of 90/00s). These terms are everywhere in online Chinese.",
          objectives: [
            "Utiliser 80后/90后/00后",
            "Saisir 躺平 et 内卷",
            "Se dire 打工人 (self-deprecation)",
            "Lire un débat générationnel"
          ],
          objectivesEn: [
            "Use 80后/90后/00后",
            "Grasp 躺平 and 内卷",
            "Call oneself 打工人 (self-mockery)",
            "Read a generational debate"
          ]
        },
        flashcards: ["80后", "90后", "00后", "躺平", "内卷", "打工人", "抖音", "佛系"],
        quizQuestions: 8
      },
      {
        id: "cecr-b12-soc-m4",
        title: "Premier emploi & marché du travail",
        titleEn: "First job & job market",
        duration: 12, locked: false, completed: false,
        hskLevel: 4, hskLevels: [3, 4], category: "conversation", difficulty: "intermediate",
        tags: ["work", "society", "career", "cecr:b12"],
        introduction: {
          title: "求职 : chercher un emploi en Chine aujourd'hui",
          titleEn: "求职: looking for a job in China today",
          content: "Le marché de l'emploi chinois est tendu pour les jeunes diplômés (le taux de chômage 16-24 ans a dépassé 20 % en 2023). Vocabulaire clé : 求职 (qiú zhí, chercher un emploi), 简历 (jiǎn lì, CV), 面试 (miàn shì, entretien), 录取 (lù qǔ, être pris), 工资 (gōng zī, salaire), 五险一金 (wǔ xiǎn yī jīn, « 5 assurances + 1 fonds », les cotisations sociales obligatoires). Secteurs : 国企 (guó qǐ, entreprise d'État — stable, moins payé), 外企 (wài qǐ, entreprise étrangère — bien payée, exigeant), 私企 (sī qǐ, entreprise privée — variable), 创业 (chuàng yè, créer sa boîte). Phrases utiles en entretien : 我对贵公司很感兴趣 (je suis très intéressé par votre entreprise), 我的优势是... (mon point fort est...), 您希望什么时候入职 ? (vous souhaitez que je commence quand ?). Terme en vogue : 996 (9h à 21h, 6 j/7), 007 (24h/24, 7 j/7) — critiques du surmenage.",
          contentEn: "China's job market is tight for graduates (youth unemployment topped 20% in 2023). Key vocab: 求职 (job hunt), 简历 (résumé), 面试 (interview), 录取 (get hired), 工资 (salary), 五险一金 («5 insurances + 1 fund», mandatory social contributions). Sectors: 国企 (state-owned — stable, lower pay), 外企 (foreign — well-paid, demanding), 私企 (private — variable), 创业 (start your own). Useful interview phrases: 我对贵公司很感兴趣 (I'm very interested in your company), 我的优势是... (my strength is...), 您希望什么时候入职? (when would you like me to start?). Buzzwords: 996 (9am-9pm, 6 days), 007 (round the clock, 7 days) — critiques of overwork.",
          objectives: [
            "Former un mini-CV oral (专业, 经验, 优势)",
            "Utiliser 求职 / 面试 / 录取 / 工资",
            "Comparer 国企 / 外企 / 私企 / 创业",
            "Saisir 996 / 007 dans le débat social"
          ],
          objectivesEn: [
            "Give a mini oral CV (专业, 经验, 优势)",
            "Use 求职 / 面试 / 录取 / 工资",
            "Compare 国企 / 外企 / 私企 / 创业",
            "Grasp 996 / 007 in the social debate"
          ]
        },
        flashcards: ["求职", "简历", "面试", "录取", "工资", "五险一金", "国企", "外企", "私企", "创业", "996"],
        quizQuestions: 10
      }
    ]
  },

  {
    id: "cecr-b12-media",
    name: "Médias & actualité",
    nameEn: "Media & news",
    description: "Presse, radio, réseaux, lire un article simple.",
    descriptionEn: "Press, radio, social media, read a simple article.",
    icon: "📺",
    color: "emerald",
    lessons: [
      {
        id: "cecr-b12-med-m1",
        title: "Vocabulaire de la presse",
        titleEn: "Press vocabulary",
        duration: 10, locked: false, completed: false,
        hskLevel: 3, hskLevels: [3, 4], category: "vocabulary", difficulty: "intermediate",
        tags: ["press", "news", "cecr:b12"],
        introduction: {
          title: "新闻 : le squelette d'une actualité",
          titleEn: "新闻: the skeleton of a news item",
          content: "新闻 (xīnwén) = actualités/nouvelles. Types : 头条 (titre, Une), 报道 (reportage), 评论 (commentaire/édito), 专访 (entretien exclusif), 社论 (éditorial). Médias : 报纸 (journal papier), 电视 (TV), 广播 (radio), 网站 (site web), 公众号 (compte officiel WeChat — équivalent blog/newsletter en Chine). Journalistes : 记者 (jìzhě), 编辑 (éditeur), 主持人 (animateur). Verbe type : 报道 = rapporter/relater ; 发布 = publier ; 转发 = partager/retransmettre. Structure typique d'un article chinois : le qui-quoi-où-quand-comment (5W) est en tête de phrase, les détails après — modèle identique à la presse anglo-saxonne. Exemple d'entête : 昨天，北京发生地震 (hier, à Pékin, tremblement de terre).",
          contentEn: "新闻 (xīnwén) = news. Types: 头条 (headline, front page), 报道 (report), 评论 (op-ed), 专访 (exclusive interview), 社论 (editorial). Media: 报纸 (paper), 电视 (TV), 广播 (radio), 网站 (website), 公众号 (WeChat official account — Chinese blog/newsletter). Journalists: 记者 (jìzhě), 编辑 (editor), 主持人 (host). Typical verbs: 报道 = report; 发布 = publish; 转发 = share/forward. Typical Chinese article structure: who-what-where-when-how (5W) up front, details after — same model as Anglo-Saxon press. Example opening: 昨天，北京发生地震 (yesterday, in Beijing, an earthquake occurred).",
          objectives: [
            "Nommer les types d'articles (头条/报道/评论)",
            "Distinguer les médias (报纸/网站/公众号)",
            "Repérer 记者 / 编辑 / 主持人",
            "Comprendre la structure 5W chinoise"
          ],
          objectivesEn: [
            "Name article types (头条/报道/评论)",
            "Tell media (报纸/网站/公众号)",
            "Spot 记者 / 编辑 / 主持人",
            "Understand Chinese 5W structure"
          ]
        },
        flashcards: ["新闻", "头条", "报道", "评论", "报纸", "电视", "记者", "编辑", "公众号", "转发"],
        quizQuestions: 8
      },
      {
        id: "cecr-b12-med-m2",
        title: "Lire un titre d'actualité",
        titleEn: "Reading a news headline",
        duration: 12, locked: false, completed: false,
        hskLevel: 3, hskLevels: [3, 4, 5], category: "reading", difficulty: "intermediate",
        tags: ["news", "reading", "cecr:b12"],
        introduction: {
          title: "Les codes compressés du titre chinois",
          titleEn: "The compressed codes of Chinese headlines",
          content: "Un titre chinois omet les particules (的/了/呢), les sujets évidents, et compresse au maximum. Exemples décodés : 北京重霾 今停课 (Pékin, forte pollution, cours suspendus aujourd'hui). 美国加息 人民币跌 (USA hausse taux, yuan baisse). Les verbes sont au présent, pas de marqueur temporel. Abréviations courantes : 央视 = 中央电视台 (CCTV), 北大 = 北京大学, 清华 = 清华大学, 地铁 = 城市地下铁路, 美联储 = la Fed. Chiffres en chinois : 万 (10 000), 亿 (100 millions). 十亿 = 1 milliard. Sujet économique courant : GDP = 国内生产总值 ; inflation = 通货膨胀 / 通胀. Politique : 政府 (gouvernement), 政策 (politique — au sens policy), 主席 (président), 两会 (2 sessions — Congrès National).",
          contentEn: "A Chinese headline omits particles (的/了/呢), obvious subjects, and compresses maximally. Decoded examples: 北京重霾 今停课 (Beijing, heavy pollution, classes suspended today). 美国加息 人民币跌 (US rate hike, yuan falls). Verbs are present, no time markers. Common abbreviations: 央视 = 中央电视台 (CCTV), 北大 = 北京大学, 清华 = 清华大学, 地铁 = 城市地下铁路, 美联储 = the Fed. Chinese numbers: 万 (10 000), 亿 (100 million). 十亿 = 1 billion. Common economic topics: GDP = 国内生产总值; inflation = 通货膨胀 / 通胀. Politics: 政府 (government), 政策 (policy), 主席 (president), 两会 (2 Sessions — National Congress).",
          objectives: [
            "Décoder un titre compressé",
            "Reconnaître les abréviations (央视, 北大...)",
            "Lire les grands nombres (万, 亿)",
            "Identifier le sujet d'un article en 5 sec"
          ],
          objectivesEn: [
            "Decode a compressed headline",
            "Recognize abbreviations (央视, 北大...)",
            "Read big numbers (万, 亿)",
            "ID an article's topic in 5 sec"
          ]
        },
        flashcards: ["头条", "央视", "北大", "清华", "万", "亿", "政府", "政策", "主席", "两会"],
        quizQuestions: 10
      },
      {
        id: "cecr-b12-med-m3",
        title: "Réseaux sociaux chinois",
        titleEn: "Chinese social media",
        duration: 10, locked: false, completed: false,
        hskLevel: 3, hskLevels: [3, 4], category: "culture", difficulty: "intermediate",
        tags: ["social", "internet", "cecr:b12"],
        introduction: {
          title: "L'écosystème 微博/抖音/小红书",
          titleEn: "The 微博/抖音/小红书 ecosystem",
          content: "La Chine a ses propres plateformes — Google, Facebook, YouTube, Instagram sont bloqués. Équivalents : 微博 (Weibo ≈ Twitter), 抖音 (Douyin ≈ TikTok Chine), 小红书 (Xiǎohóngshū, Red Note ≈ Instagram + Pinterest), 知乎 (Zhīhū ≈ Quora), 哔哩哔哩 (Bilibili ≈ YouTube jeune), 百度 (Bǎidù ≈ Google). Actions : 关注 (guānzhù, follow), 点赞 (diǎnzàn, like), 评论 (pínglùn, commenter), 转发 (zhuǎnfā, partager/RT), 分享 (fēnxiǎng, partager). Figures : 粉丝 (fěnsī, fans), 大V (dà V, influenceur vérifié, V pour « verified »), 网红 (wǎnghóng, star du web), 博主 (bózhǔ, blogueur). Pour traverser le pare-feu : 翻墙 (fān qiáng, « sauter le mur »), terme familier pour utiliser un VPN. La suggestion d'utiliser un VPN reste délicate légalement.",
          contentEn: "China has its own platforms — Google, Facebook, YouTube, Instagram are blocked. Equivalents: 微博 (Weibo ≈ Twitter), 抖音 (Douyin ≈ Chinese TikTok), 小红书 (Xiǎohóngshū, Red Note ≈ Instagram + Pinterest), 知乎 (Zhīhū ≈ Quora), 哔哩哔哩 (Bilibili ≈ Young YouTube), 百度 (Bǎidù ≈ Google). Actions: 关注 (follow), 点赞 (like), 评论 (comment), 转发 (share/RT), 分享 (share). Figures: 粉丝 (fans), 大V (dà V, verified influencer, V for «verified»), 网红 (web star), 博主 (blogger). To cross the firewall: 翻墙 (fān qiáng, «jump the wall»), casual term for VPN use. VPN use remains legally delicate.",
          objectives: [
            "Nommer les 6 grandes plateformes",
            "Utiliser 关注/点赞/评论/转发",
            "Comprendre 粉丝/大V/网红/博主",
            "Saisir 翻墙 dans son contexte"
          ],
          objectivesEn: [
            "Name the 6 main platforms",
            "Use 关注/点赞/评论/转发",
            "Understand 粉丝/大V/网红/博主",
            "Grasp 翻墙 in context"
          ]
        },
        flashcards: ["微博", "抖音", "小红书", "知乎", "关注", "点赞", "转发", "粉丝", "网红", "博主", "翻墙"],
        quizQuestions: 8
      },
      {
        id: "cecr-b12-med-m4",
        title: "Fake news & vérification",
        titleEn: "Fake news & fact-checking",
        duration: 12, locked: false, completed: false,
        hskLevel: 4, hskLevels: [4, 5], category: "reading", difficulty: "intermediate",
        tags: ["news", "critical-thinking", "cecr:b12"],
        introduction: {
          title: "假新闻 : reconnaître et vérifier une info",
          titleEn: "假新闻: spotting and checking info",
          content: "假新闻 (jiǎ xīnwén, fake news) est devenu un sujet majeur sur les réseaux chinois. Vocabulaire : 谣言 (yáo yán, rumeur), 辟谣 (pì yáo, démentir une rumeur), 真相 (zhēn xiàng, la vérité), 真实 (zhēn shí, authentique), 可信 (kě xìn, fiable), 来源 (lái yuán, source), 证据 (zhèng jù, preuve). Questions à se poser : 这条新闻的来源是哪里 ? (quelle est la source ?), 有没有证据 ? (y a-t-il des preuves ?), 是谁发布的 ? (qui l'a publié ?). Verbes critiques : 相信 (croire), 怀疑 (huái yí, douter), 确认 (què rèn, confirmer), 证实 (zhèng shí, prouver). Phénomène typique en chinois : 标题党 (biāo tí dǎng, « secte des titres » — les sites à clickbait). Précieux à connaître : 澎湃新闻 (The Paper, sérieux), 新华社 (agence Xinhua, officiel), 财新 (Caixin, économie indépendant).",
          contentEn: "假新闻 (fake news) is a major topic on Chinese social media. Vocab: 谣言 (rumor), 辟谣 (refute a rumor), 真相 (truth), 真实 (authentic), 可信 (trustworthy), 来源 (source), 证据 (evidence). Questions to ask: 这条新闻的来源是哪里? (what's the source?), 有没有证据? (is there evidence?), 是谁发布的? (who published it?). Critical verbs: 相信 (believe), 怀疑 (doubt), 确认 (confirm), 证实 (prove). Typical phenomenon: 标题党 (biāo tí dǎng, «headline cult» — clickbait sites). Worth knowing: 澎湃新闻 (The Paper, serious), 新华社 (Xinhua agency, official), 财新 (Caixin, independent economics).",
          objectives: [
            "Nommer 谣言 / 辟谣 / 真相",
            "Interroger une source (来源, 证据)",
            "Utiliser 怀疑 / 确认 / 证实",
            "Reconnaître 标题党"
          ],
          objectivesEn: [
            "Name 谣言 / 辟谣 / 真相",
            "Question a source (来源, 证据)",
            "Use 怀疑 / 确认 / 证实",
            "Recognize 标题党"
          ]
        },
        flashcards: ["假新闻", "谣言", "辟谣", "真相", "真实", "来源", "证据", "怀疑", "确认", "证实", "标题党"],
        quizQuestions: 10
      },
      {
        id: "cecr-b12-med-m5",
        title: "Publicité & marketing chinois",
        titleEn: "Chinese advertising & marketing",
        duration: 12, locked: false, completed: false,
        hskLevel: 4, hskLevels: [3, 4], category: "culture", difficulty: "intermediate",
        tags: ["advertising", "marketing", "cecr:b12"],
        introduction: {
          title: "广告 : lire un slogan, repérer un argument",
          titleEn: "广告: reading a slogan, spotting an argument",
          content: "La publicité chinoise (广告, guǎng gào) utilise des formules courtes, souvent rythmées en 4 caractères, parfois en vers. Vocabulaire : 品牌 (pǐn pái, marque), 标志 / 标识 (biāo zhì, logo), 口号 (kǒu hào, slogan), 优惠 (yōu huì, promotion), 打折 (dǎ zhé, remise), 限时 (xiàn shí, durée limitée), 免费 (miǎn fèi, gratuit). Les grands événements commerciaux : 双十一 (Shuāng Shí Yī, le « Singles' Day » du 11/11, plus gros jour shopping au monde), 618 (fête d'anniversaire JD le 18 juin), 双十二 (12/12). Arguments publicitaires classiques : 性价比高 (xìng jià bǐ gāo, bon rapport qualité/prix — mot-roi du commerce chinois), 限量 (xiàn liàng, édition limitée), 爆款 (bào kuǎn, produit star). Influenceurs vendeurs : 带货主播 (dài huò zhǔ bō, live-sellers, phénomène énorme en Chine). Marques locales qui montent : 李宁, 华为, 大疆, 比亚迪.",
          contentEn: "Chinese advertising (广告) uses short formulas, often rhythmic in 4 characters, sometimes verse. Vocab: 品牌 (brand), 标志 / 标识 (logo), 口号 (slogan), 优惠 (promotion), 打折 (discount), 限时 (time-limited), 免费 (free). Big shopping events: 双十一 (11/11 Singles' Day, world's biggest shopping day), 618 (JD's anniversary on June 18), 双十二 (12/12). Classic ad arguments: 性价比高 (good value for money — king phrase of Chinese commerce), 限量 (limited edition), 爆款 (hit product). Selling influencers: 带货主播 (live-sellers, huge in China). Rising local brands: 李宁, 华为, 大疆, 比亚迪.",
          objectives: [
            "Décoder 品牌 / 口号 / 优惠 / 打折",
            "Connaître 双十一 / 618",
            "Utiliser 性价比 / 限量 / 爆款",
            "Saisir 带货主播"
          ],
          objectivesEn: [
            "Decode 品牌 / 口号 / 优惠 / 打折",
            "Know 双十一 / 618",
            "Use 性价比 / 限量 / 爆款",
            "Grasp 带货主播"
          ]
        },
        flashcards: ["广告", "品牌", "口号", "优惠", "打折", "免费", "双十一", "性价比", "限量", "爆款", "带货主播"],
        quizQuestions: 10
      }
    ]
  }
  ,
  // ============================================================
  // B2.1 — Avancé 1/2 — Structures argumentatives + Tech + Environnement
  // ============================================================
  {
    id: "cecr-b21-grammar",
    name: "Grammaire B2.1 — connecteurs & emphase",
    nameEn: "Grammar B2.1 — Connectors & Emphasis",
    description: "连…也/都, 不但…而且, 只要…就, 只有…才, 虽然…但是, 尽管 : articuler un discours nuancé.",
    descriptionEn: "连…也/都, 不但…而且, 只要…就, 只有…才, 虽然…但是, 尽管: articulate nuanced discourse.",
    icon: "🔀",
    color: "teal",
    lessons: [
{
        id: "cecr-b21-grammar-lian-m1",
        title: "连 + nom + 也/都 (même X)",
        titleEn: "连 + noun + 也/都 (even X)",
        duration: 12, locked: false, completed: false,
        hskLevel: 4, hskLevels: [4, 5], category: "grammar", difficulty: "advanced",
        tags: ["lian", "emphasis", "cecr:b21"],
        introduction: {
          title: "连 + X + 也/都 — la structure d'emphase forte",
          titleEn: "连 + X + 也/都 — the strong emphasis structure",
          content: "La structure 连…也/都 met en relief un élément inattendu pour souligner qu'il s'inscrit dans la norme décrite : 连小孩也知道 (« même un enfant sait »). Formule : 连 + nom (souvent extrême ou surprenant) + 也/都 + verbe. 也 et 都 sont interchangeables ici. Souvent utilisé au négatif pour maximaliser : 他连一句话也没说 (« il n'a pas dit UN SEUL mot »). Comparaison : sans 连 → 他没说话 (neutre). Avec 连 → on souligne l'étendue de l'absence.",
          contentEn: "The 连…也/都 structure highlights an unexpected element to stress it falls within the described norm: 连小孩也知道 («even a child knows»). Formula: 连 + noun (often extreme or surprising) + 也/都 + verb. 也 and 都 are interchangeable here. Often used in the negative to maximize: 他连一句话也没说 («he didn't say A SINGLE word»). Comparison: without 连 → 他没说话 (neutral). With 连 → we emphasize the extent of the absence.",
          objectives: [
            "Construire 连 + N + 也/都 + V",
            "Utiliser 连 au négatif pour maximaliser",
            "Distinguer avec/sans 连",
            "Choisir un nom « extrême » adapté"
          ],
          objectivesEn: [
            "Build 连 + N + 也/都 + V",
            "Use 连 in negative for maximal effect",
            "Distinguish with/without 连",
            "Pick a fitting «extreme» noun"
          ]
        },
        flashcards: ["连", "也", "都", "一句话", "小孩", "知道"],
        quizQuestions: 8
      },
      {
        id: "cecr-b21-grammar-lian-m2",
        title: "连 + verbe + 也/都 + 不/没 + même verbe",
        titleEn: "连 + verb + 也/都 + 不/没 + same verb",
        duration: 12, locked: false, completed: false,
        hskLevel: 5, hskLevels: [4, 5], category: "grammar", difficulty: "advanced",
        tags: ["lian", "emphasis", "cecr:b21"],
        introduction: {
          title: "« Même pas fait » — 连 + V + 也/都 + 不/没 + V",
          titleEn: "«Not even done» — 连 + V + 也/都 + 不/没 + V",
          content: "Variante verbale : on répète le verbe de part et d'autre de 也/都 pour dire « même pas faire X ». 他连看也没看一眼 (« il n'a même pas jeté un regard »), 我连想也没想过 (« je n'y ai même pas pensé »). Le verbe apparaît deux fois : avant 也/都 (affirmatif apparent) puis après en négatif. Structure idiomatique ultra-fréquente à l'oral pour exprimer l'étonnement ou l'indignation. Impossible à traduire littéralement — passe par « même pas » en français.",
          contentEn: "Verbal variant: we repeat the verb on both sides of 也/都 to say «not even do X». 他连看也没看一眼 («he didn't even glance»), 我连想也没想过 («I didn't even think about it»). The verb appears twice: before 也/都 (seemingly affirmative) then after in negative. Ultra-frequent idiomatic structure orally to express surprise or indignation. Impossible to translate literally — rendered by «not even» in English.",
          objectives: [
            "Former 连 + V + 也 + 没 + V",
            "Utiliser avec 看/想/说/听",
            "Exprimer indignation/étonnement",
            "Comprendre la répétition du verbe"
          ],
          objectivesEn: [
            "Form 连 + V + 也 + 没 + V",
            "Use with 看/想/说/听",
            "Express indignation/surprise",
            "Understand verb repetition"
          ]
        },
        flashcards: ["连", "一眼", "想", "看", "过", "没"],
        quizQuestions: 8
      },
      {
        id: "cecr-b21-grammar-lian-m3",
        title: "除了…以外 + 也/还/都 (à part…)",
        titleEn: "除了…以外 + 也/还/都 (apart from…)",
        duration: 12, locked: false, completed: false,
        hskLevel: 4, hskLevels: [4, 5], category: "grammar", difficulty: "advanced",
        tags: ["chule", "inclusion", "cecr:b21"],
        introduction: {
          title: "除了…以外 — inclusion vs exclusion selon la suite",
          titleEn: "除了…以外 — inclusion vs exclusion depending on follow-up",
          content: "除了 X 以外 = « à part X ». Le sens dépend de la conjonction qui suit. Avec 还/也 (inclusion) : 除了中文以外，我也会英文 (« à part le chinois, je parle AUSSI anglais » → les deux). Avec 都 + négation (exclusion) : 除了小王以外，大家都来了 (« à part Xiao Wang, tout le monde est venu » → Xiao Wang est exclu). 以外 est souvent omissible mais garder la structure complète au début est plus sûr. Piège : confondre inclusion et exclusion donne exactement l'opposé du sens voulu.",
          contentEn: "除了 X 以外 = «apart from X». The meaning depends on the following conjunction. With 还/也 (inclusion): 除了中文以外，我也会英文 («apart from Chinese, I ALSO speak English» → both). With 都 + negation (exclusion): 除了小王以外，大家都来了 («apart from Xiao Wang, everyone came» → Xiao Wang excluded). 以外 often omissible but keeping the full structure early is safer. Pitfall: mixing inclusion/exclusion gives the exact opposite meaning.",
          objectives: [
            "Utiliser 除了…以外 + 也/还 (inclusion)",
            "Utiliser 除了…以外 + 都 (exclusion)",
            "Choisir selon le sens voulu",
            "Construire des phrases complètes"
          ],
          objectivesEn: [
            "Use 除了…以外 + 也/还 (inclusion)",
            "Use 除了…以外 + 都 (exclusion)",
            "Choose based on intended meaning",
            "Build complete sentences"
          ]
        },
        flashcards: ["除了", "以外", "还", "都", "大家", "英文"],
        quizQuestions: 8
      },
{
        id: "cecr-b21-grammar-conj-m1",
        title: "不但…而且 — « non seulement…mais aussi »",
        titleEn: "不但…而且 — «not only…but also»",
        duration: 12, locked: false, completed: false,
        hskLevel: 4, hskLevels: [4, 5], category: "grammar", difficulty: "advanced",
        tags: ["conjunctions", "progression", "cecr:b21"],
        introduction: {
          title: "La progression positive — 不但 A 而且 B",
          titleEn: "Positive progression — 不但 A 而且 B",
          content: "不但…而且 construit une gradation positive : 他不但聪明，而且努力 (« il est non seulement intelligent, mais aussi travailleur »). Variantes : 不仅 = 不但 (soutenu à l'écrit) ; 并且 / 也 / 还 peuvent remplacer 而且. Si le sujet est le même dans les deux parties, il se place AVANT 不但. Si différent, il se place après : 不但他会来，而且他妈妈也会来. Piège : ne pas mettre « aussi » deux fois (évitez 也…而且). En anglais : not only…but also.",
          contentEn: "不但…而且 builds a positive gradation: 他不但聪明，而且努力 («he is not only smart, but also hard-working»). Variants: 不仅 = 不但 (more formal written); 并且 / 也 / 还 can replace 而且. If the subject is the same in both parts, it goes BEFORE 不但. If different, it goes after: 不但他会来，而且他妈妈也会来. Pitfall: don't use «also» twice (avoid 也…而且). In English: not only…but also.",
          objectives: [
            "Construire 不但 A 而且 B",
            "Placer le sujet correctement",
            "Utiliser 不仅/并且 comme variantes",
            "Éviter la redondance avec 也"
          ],
          objectivesEn: [
            "Build 不但 A 而且 B",
            "Place subject correctly",
            "Use 不仅/并且 as variants",
            "Avoid redundancy with 也"
          ]
        },
        flashcards: ["不但", "而且", "不仅", "并且", "聪明", "努力"],
        quizQuestions: 8
      },
      {
        id: "cecr-b21-grammar-conj-m2",
        title: "无论…都 — « peu importe… »",
        titleEn: "无论…都 — «no matter…»",
        duration: 12, locked: false, completed: false,
        hskLevel: 4, hskLevels: [4, 5], category: "grammar", difficulty: "advanced",
        tags: ["conjunctions", "concessive", "cecr:b21"],
        introduction: {
          title: "无论 / 不管 + interrogation + 都 / 也",
          titleEn: "无论 / 不管 + interrogative + 都 / 也",
          content: "无论 (écrit) = 不管 (oral) introduisent une concession universelle : « peu importe X, Y ». Une interrogation DOIT suivre : un mot en 谁/什么/哪/怎么 ou une alternative A 还是 B. Ex. : 无论谁来，我都欢迎 (« peu importe qui vient, je l'accueille »), 不管你说什么，他都不听 (« peu importe ce que tu dis, il n'écoute pas »), 无论天气好不好，我们都去 (« qu'il fasse beau ou non, on y va »). 都 (ou 也) dans la deuxième partie est obligatoire. Piège : sans interrogation ou alternative, 无论 est incorrect.",
          contentEn: "无论 (written) = 不管 (oral) introduce a universal concession: «no matter X, Y». A question MUST follow: a word in 谁/什么/哪/怎么 or an alternative A 还是 B. Ex.: 无论谁来，我都欢迎 («no matter who comes, I welcome them»), 不管你说什么，他都不听 («no matter what you say, he doesn't listen»), 无论天气好不好，我们都去 («whether weather is good or not, we go»). 都 (or 也) in the second part is mandatory. Pitfall: without an interrogation or alternative, 无论 is incorrect.",
          objectives: [
            "Construire 无论/不管 + 谁/什么/哪/怎么 + 都",
            "Utiliser A 还是 B comme alternative",
            "Choisir 无论 (écrit) vs 不管 (oral)",
            "Ne jamais oublier 都/也"
          ],
          objectivesEn: [
            "Build 无论/不管 + 谁/什么/哪/怎么 + 都",
            "Use A 还是 B as alternative",
            "Choose 无论 (written) vs 不管 (oral)",
            "Never forget 都/也"
          ]
        },
        flashcards: ["无论", "不管", "都", "也", "欢迎", "天气"],
        quizQuestions: 8
      },
      {
        id: "cecr-b21-grammar-conj-m3",
        title: "即使…也 — « même si… »",
        titleEn: "即使…也 — «even if…»",
        duration: 12, locked: false, completed: false,
        hskLevel: 5, hskLevels: [4, 5], category: "grammar", difficulty: "advanced",
        tags: ["conjunctions", "hypothetical", "cecr:b21"],
        introduction: {
          title: "即使 A 也 B — la concession hypothétique",
          titleEn: "即使 A 也 B — the hypothetical concession",
          content: "即使…也 (« même si… quand même ») introduit une concession hypothétique : 即使下雨，我也去 (« même s'il pleut, j'y vais »). Variantes : 就算 (oral, plus familier), 哪怕 (insiste sur le cas extrême : « même dans le pire cas »), 纵然 (très soutenu). Différence avec 虽然 : 虽然 = fait réel constaté (« bien que ») ; 即使 = hypothèse (« même si », l'événement peut ne pas arriver). Ne pas confondre : 虽然下雨了 = il pleut effectivement ; 即使下雨 = qu'il pleuve ou non.",
          contentEn: "即使…也 («even if… still») introduces a hypothetical concession: 即使下雨，我也去 («even if it rains, I'll go»). Variants: 就算 (oral, more casual), 哪怕 (insists on the extreme case: «even in the worst case»), 纵然 (very formal). Difference with 虽然: 虽然 = real fact stated («although»); 即使 = hypothesis («even if», event may not happen). Don't mix up: 虽然下雨了 = it's actually raining; 即使下雨 = whether it rains or not.",
          objectives: [
            "Construire 即使 A 也 B",
            "Distinguer 即使 vs 虽然",
            "Utiliser 就算 à l'oral",
            "Utiliser 哪怕 pour cas extrême"
          ],
          objectivesEn: [
            "Build 即使 A 也 B",
            "Distinguish 即使 vs 虽然",
            "Use 就算 orally",
            "Use 哪怕 for extreme cases"
          ]
        },
        flashcards: ["即使", "就算", "哪怕", "也", "下雨", "虽然"],
        quizQuestions: 8
      },
      {
        id: "cecr-b21-grammar-conj-m4",
        title: "虽然 vs 尽管 — nuances de concession",
        titleEn: "虽然 vs 尽管 — nuances of concession",
        duration: 12, locked: false, completed: false,
        hskLevel: 5, hskLevels: [4, 5], category: "grammar", difficulty: "advanced",
        tags: ["conjunctions", "concessive", "cecr:b21"],
        introduction: {
          title: "虽然 vs 尽管 — deux « bien que » qui ne sont pas identiques",
          titleEn: "虽然 vs 尽管 — two «although» that aren't identical",
          content: "虽然 et 尽管 signifient tous deux « bien que » MAIS : 虽然 introduit un fait accepté de façon neutre (虽然下雨，但是我们还是去了 — « bien qu'il pleuve, nous sommes allés »). 尽管 a une nuance de concession appuyée, souvent avec idée d'effort malgré l'obstacle (尽管很累，他还是坚持 — « bien qu'épuisé, il persévère »). 尽管 peut aussi signifier « n'hésitez pas à » dans 你尽管说 (« parlez sans retenue »). Les deux s'accompagnent de 但是/可是/然而/还是 dans la seconde partie. Piège : 尽管 seul (sans seconde clause) = « n'hésitez pas », sens totalement différent.",
          contentEn: "虽然 and 尽管 both mean «although» BUT: 虽然 introduces a neutrally accepted fact (虽然下雨，但是我们还是去了 — «although it rained, we still went»). 尽管 has a stressed concessive nuance, often with effort-despite-obstacle (尽管很累，他还是坚持 — «although exhausted, he persists»). 尽管 can also mean «don't hesitate to» in 你尽管说 («speak freely»). Both pair with 但是/可是/然而/还是 in the second clause. Pitfall: standalone 尽管 (no second clause) = «feel free to», totally different meaning.",
          objectives: [
            "Utiliser 虽然…但是 neutre",
            "Utiliser 尽管…还是 avec effort",
            "Distinguer 尽管 conj. vs 尽管 adv.",
            "Ajouter 但是/可是/然而"
          ],
          objectivesEn: [
            "Use 虽然…但是 neutrally",
            "Use 尽管…还是 with effort",
            "Distinguish 尽管 conj. vs adv.",
            "Add 但是/可是/然而"
          ]
        },
        flashcards: ["虽然", "尽管", "但是", "然而", "还是", "坚持"],
        quizQuestions: 8
      }
    ]
  },

  {
    id: "cecr-b21-tech",
    name: "Technologie et internet",
    nameEn: "Technology and internet",
    description: "Vocabulaire moderne : IA, numérique, e-commerce.",
    descriptionEn: "Modern vocabulary: AI, digital, e-commerce.",
    color: "#0EA5E9",
    icon: "💻",
    lessons: [
      {
        id: "cecr-b21-tech-m1",
        title: "Informatique et internet",
        titleEn: "IT and internet",
        duration: 12, locked: false, completed: false,
        hskLevel: 4, hskLevels: [4, 5], category: "vocabulary", difficulty: "advanced",
        tags: ["tech", "internet", "cecr:b21"],
        introduction: {
          title: "Le vocabulaire de base du numérique",
          titleEn: "Basic digital vocabulary",
          content: "Matériel : 电脑 (diànnǎo, ordinateur), 手机 (shǒujī, téléphone), 屏幕 (píngmù, écran), 键盘 (jiànpán, clavier), 鼠标 (shǔbiāo, souris). Internet : 网络/网 (wǎngluò, réseau/web), 网站 (wǎngzhàn, site), 网页 (wǎngyè, page), 浏览器 (liúlǎnqì, navigateur), 密码 (mìmǎ, mot de passe), 账号 (zhànghào, compte). Actions : 上网 (shàngwǎng, être en ligne), 下载 (xiàzài, télécharger), 登录 (dēnglù, se connecter), 注册 (zhùcè, s'inscrire). Note : en Chine, 微信 (WeChat) remplace la plupart des services occidentaux — messagerie, paiement, ID, mini-programmes.",
          contentEn: "Hardware: 电脑 (computer), 手机 (phone), 屏幕 (screen), 键盘 (keyboard), 鼠标 (mouse). Internet: 网络/网 (network/web), 网站 (site), 网页 (page), 浏览器 (browser), 密码 (password), 账号 (account). Actions: 上网 (be online), 下载 (download), 登录 (log in), 注册 (sign up). Note: in China, 微信 (WeChat) replaces most Western services — messaging, payments, ID, mini-programs.",
          objectives: [
            "Nommer matériel et réseau",
            "Utiliser 上网/下载/登录/注册",
            "Comprendre place de WeChat",
            "Prononcer les néologismes"
          ],
          objectivesEn: [
            "Name hardware and network",
            "Use 上网/下载/登录/注册",
            "Understand WeChat's role",
            "Pronounce neologisms"
          ]
        },
        flashcards: ["电脑", "手机", "网络", "浏览器", "密码", "下载", "登录", "注册", "微信"],
        quizQuestions: 8
      },
      {
        id: "cecr-b21-tech-m2",
        title: "Intelligence artificielle et données",
        titleEn: "Artificial intelligence and data",
        duration: 12, locked: false, completed: false,
        hskLevel: 5, hskLevels: [5, 6], category: "vocabulary", difficulty: "advanced",
        tags: ["ai", "data", "cecr:b21"],
        introduction: {
          title: "人工智能 et l'économie numérique chinoise",
          titleEn: "人工智能 and the Chinese digital economy",
          content: "Termes phares : 人工智能 (rén gōng zhì néng, IA, litt. « intelligence fabriquée par l'homme »). 算法 (suànfǎ, algorithme), 数据 (shùjù, données), 大数据 (dàshùjù, big data), 云 (yún, cloud), 云计算 (yún jìsuàn, cloud computing). Compétition internationale : la Chine a développé ses propres LLM (文心一言 Wenxin de Baidu, 通义千问 Qwen d'Alibaba, DeepSeek). Enjeux : 隐私 (yǐnsī, vie privée), 监控 (jiānkòng, surveillance), 人脸识别 (rén liǎn shíbié, reconnaissance faciale) — omniprésents dans les villes chinoises pour les paiements mais source de débats.",
          contentEn: "Key terms: 人工智能 (AI, lit. «man-made intelligence»). 算法 (algorithm), 数据 (data), 大数据 (big data), 云 (cloud), 云计算 (cloud computing). International competition: China has developed its own LLMs (文心一言 Baidu's Wenxin, 通义千问 Alibaba's Qwen, DeepSeek). Issues: 隐私 (privacy), 监控 (surveillance), 人脸识别 (facial recognition) — ubiquitous in Chinese cities for payments but debated.",
          objectives: [
            "Décrypter 人工智能/算法/数据",
            "Nommer les LLM chinois",
            "Débattre 隐私/监控",
            "Utiliser 大数据/云计算"
          ],
          objectivesEn: [
            "Decode 人工智能/算法/数据",
            "Name Chinese LLMs",
            "Discuss 隐私/监控",
            "Use 大数据/云计算"
          ]
        },
        flashcards: ["人工智能", "算法", "数据", "大数据", "云", "隐私", "监控", "人脸识别"],
        quizQuestions: 8
      },
      {
        id: "cecr-b21-tech-m3",
        title: "E-commerce et paiement mobile",
        titleEn: "E-commerce and mobile payment",
        duration: 12, locked: false, completed: false,
        hskLevel: 4, hskLevels: [4, 5], category: "vocabulary", difficulty: "advanced",
        tags: ["ecommerce", "payment", "cecr:b21"],
        introduction: {
          title: "网购 et 扫码 — l'économie sans cash",
          titleEn: "网购 and 扫码 — the cashless economy",
          content: "La Chine a quasi éliminé les espèces via 支付宝 (Zhīfùbǎo, Alipay) et 微信支付 (Wēixìn zhīfù, WeChat Pay). Actions : 扫码 (sǎomǎ, scanner un QR code), 付款 (fùkuǎn, payer), 转账 (zhuǎnzhàng, virement). Plateformes : 淘宝 (Táobǎo, Taobao, le « eBay chinois »), 京东 (Jīngdōng, JD.com, concurrent premium), 拼多多 (Pīnduōduō, achats groupés low-cost). Livraison ultra-rapide : 快递 (kuàidì, colis express), 外卖 (wàimài, livraison de repas — 美团 et 饿了么 dominent). Mots-clés : 双十一 (Shuāng Shíyī, « Double 11 », fête des célibataires = plus grande journée d'achats du monde).",
          contentEn: "China has nearly eliminated cash via 支付宝 (Alipay) and 微信支付 (WeChat Pay). Actions: 扫码 (scan QR), 付款 (pay), 转账 (transfer). Platforms: 淘宝 (Taobao, the «Chinese eBay»), 京东 (JD.com, premium competitor), 拼多多 (Pinduoduo, low-cost group buying). Ultra-fast delivery: 快递 (express parcel), 外卖 (food delivery — 美团 and 饿了么 dominate). Keywords: 双十一 («Double 11», Singles' Day = world's biggest shopping day).",
          objectives: [
            "Utiliser 扫码/付款/转账",
            "Connaître 淘宝/京东/拼多多",
            "Commander via 外卖",
            "Comprendre 双十一"
          ],
          objectivesEn: [
            "Use 扫码/付款/转账",
            "Know 淘宝/京东/拼多多",
            "Order via 外卖",
            "Understand 双十一"
          ]
        },
        flashcards: ["支付宝", "微信支付", "扫码", "淘宝", "京东", "快递", "外卖", "双十一"],
        quizQuestions: 8
      },
      {
        id: "cecr-b21-tech-m4",
        title: "Réseau 5G et objets connectés",
        titleEn: "5G and IoT",
        duration: 12, locked: false, completed: false,
        hskLevel: 5, hskLevels: [5, 6], category: "vocabulary", difficulty: "advanced",
        tags: ["5g", "iot", "cecr:b21"],
        introduction: {
          title: "5G, smart city et infrastructure numérique",
          titleEn: "5G, smart city and digital infrastructure",
          content: "La Chine a déployé massivement la 5G avant l'Occident. Termes : 5G网络 (wǔjí wǎngluò, réseau 5G), 物联网 (wùliánwǎng, IoT litt. « internet des objets »), 智慧城市 (zhìhuì chéngshì, smart city). Objets connectés : 智能家居 (zhìnéng jiājū, maison intelligente), 智能音箱 (zhìnéng yīnxiāng, enceinte intelligente, type 小爱 de Xiaomi ou 天猫精灵 d'Alibaba). Mobilité : 共享 (gòngxiǎng, partage) — 共享单车 (vélos en libre-service type 美团单车), 共享充电宝 (batterie portable partagée, omniprésente). Une tension stratégique existe autour de 华为 (Huáwéi), leader mondial de la 5G.",
          contentEn: "China deployed 5G massively before the West. Terms: 5G网络 (5G network), 物联网 (IoT lit. «internet of things»), 智慧城市 (smart city). Connected devices: 智能家居 (smart home), 智能音箱 (smart speaker, like Xiaomi's 小爱 or Alibaba's 天猫精灵). Mobility: 共享 (sharing) — 共享单车 (shared bikes, like 美团单车), 共享充电宝 (shared power bank, ubiquitous). Strategic tension exists around 华为 (Huawei), global 5G leader.",
          objectives: [
            "Parler de 5G/物联网/智慧城市",
            "Décrire 智能家居/智能音箱",
            "Utiliser 共享 dans l'économie",
            "Comprendre tension Huawei"
          ],
          objectivesEn: [
            "Talk about 5G/IoT/smart city",
            "Describe smart home/speaker",
            "Use 共享 in the economy",
            "Understand Huawei tension"
          ]
        },
        flashcards: ["5G网络", "物联网", "智慧城市", "智能家居", "共享", "华为"],
        quizQuestions: 8
      }
    ]
  },
  {
    id: "cecr-b21-env",
    name: "Environnement et société",
    nameEn: "Environment and society",
    description: "Climat, pollution, durabilité en Chine.",
    descriptionEn: "Climate, pollution, sustainability in China.",
    color: "#059669",
    icon: "🌿",
    lessons: [
      {
        id: "cecr-b21-env-m1",
        title: "Pollution et pollution de l'air",
        titleEn: "Pollution and air pollution",
        duration: 12, locked: false, completed: false,
        hskLevel: 5, hskLevels: [4, 5], category: "vocabulary", difficulty: "advanced",
        tags: ["environment", "pollution", "cecr:b21"],
        introduction: {
          title: "雾霾 : quand Pékin devenait gris",
          titleEn: "雾霾: when Beijing turned grey",
          content: "La pollution est un enjeu majeur en Chine. Mots clés : 污染 (wūrǎn, pollution), 空气污染 (kōngqì wūrǎn, pollution de l'air), 雾霾 (wùmái, smog/brouillard pollué), 空气质量 (kōngqì zhìliàng, qualité de l'air), PM2.5 (PM diǎn èr wǔ). Les années 2013-2015 à Pékin, l'indice AQI dépassait régulièrement 500. Réponses : 口罩 (kǒuzhào, masque), 空气净化器 (kōngqì jìnghuàqì, purificateur d'air). Politique : 环保 (huánbǎo, protection environnementale), 减排 (jiǎnpái, réduction des émissions). La Chine est aujourd'hui leader mondial du solaire (太阳能) et de l'éolien (风能).",
          contentEn: "Pollution is a major issue in China. Keywords: 污染 (pollution), 空气污染 (air pollution), 雾霾 (smog/polluted fog), 空气质量 (air quality), PM2.5. In 2013-2015 in Beijing, AQI regularly exceeded 500. Responses: 口罩 (mask), 空气净化器 (air purifier). Policy: 环保 (environmental protection), 减排 (emissions reduction). China is now the world leader in solar (太阳能) and wind (风能).",
          objectives: [
            "Parler de 污染/雾霾/PM2.5",
            "Décrire 空气质量",
            "Nommer 口罩/空气净化器",
            "Utiliser 环保/减排"
          ],
          objectivesEn: [
            "Talk about 污染/雾霾/PM2.5",
            "Describe 空气质量",
            "Name mask/purifier",
            "Use 环保/减排"
          ]
        },
        flashcards: ["污染", "空气污染", "雾霾", "空气质量", "口罩", "环保", "减排", "太阳能"],
        quizQuestions: 8
      },
      {
        id: "cecr-b21-env-m2",
        title: "Changement climatique",
        titleEn: "Climate change",
        duration: 12, locked: false, completed: false,
        hskLevel: 5, hskLevels: [5, 6], category: "vocabulary", difficulty: "advanced",
        tags: ["climate", "global-warming", "cecr:b21"],
        introduction: {
          title: "气候变化 et 碳中和",
          titleEn: "气候变化 and 碳中和",
          content: "气候变化 (qìhòu biànhuà, changement climatique), 全球变暖 (quánqiú biànnuǎn, réchauffement planétaire). Causes : 温室气体 (wēnshì qìtǐ, gaz à effet de serre), 二氧化碳 (èryǎnghuàtàn, CO2). Conséquences : 冰川融化 (bīngchuān rónghuà, fonte des glaciers), 海平面上升 (hǎi píngmiàn shàngshēng, montée des océans), 极端天气 (jíduān tiānqì, météo extrême). Objectif chinois : 碳达峰 (tàn dáfēng, pic carbone) d'ici 2030 et 碳中和 (tàn zhōnghé, neutralité carbone) d'ici 2060 — annoncé par Xi Jinping en 2020.",
          contentEn: "气候变化 (climate change), 全球变暖 (global warming). Causes: 温室气体 (greenhouse gases), 二氧化碳 (CO2). Consequences: 冰川融化 (glacier melt), 海平面上升 (sea level rise), 极端天气 (extreme weather). Chinese goal: 碳达峰 (peak carbon) by 2030 and 碳中和 (carbon neutrality) by 2060 — announced by Xi Jinping in 2020.",
          objectives: [
            "Utiliser 气候变化/全球变暖",
            "Citer 温室气体/二氧化碳",
            "Décrire les conséquences",
            "Connaître 碳达峰/碳中和 2030/2060"
          ],
          objectivesEn: [
            "Use 气候变化/全球变暖",
            "Cite 温室气体/二氧化碳",
            "Describe consequences",
            "Know 碳达峰/碳中和 2030/2060"
          ]
        },
        flashcards: ["气候变化", "全球变暖", "温室气体", "二氧化碳", "极端天气", "碳中和"],
        quizQuestions: 8
      },
      {
        id: "cecr-b21-env-m3",
        title: "Tri des déchets et écologie urbaine",
        titleEn: "Waste sorting and urban ecology",
        duration: 12, locked: false, completed: false,
        hskLevel: 5, hskLevels: [4, 5], category: "vocabulary", difficulty: "advanced",
        tags: ["recycling", "urban", "cecr:b21"],
        introduction: {
          title: "垃圾分类 à Shanghai — la révolution 2019",
          titleEn: "垃圾分类 in Shanghai — the 2019 revolution",
          content: "En juillet 2019, Shanghai a imposé le 垃圾分类 (lājī fēnlèi, tri des déchets) strict, du jamais vu en Chine. Quatre catégories : 可回收物 (kě huíshōu wù, recyclables), 有害垃圾 (yǒuhài lājī, déchets dangereux), 湿垃圾/厨余垃圾 (shī lājī, déchets humides/de cuisine), 干垃圾/其他垃圾 (gān lājī, déchets secs/autres). Amendes pour erreurs. Vocabulaire utile : 回收 (huíshōu, recycler), 环保袋 (huánbǎo dài, sac écolo), 一次性 (yí cì xìng, jetable). Débat : sacs plastiques 塑料袋 (sùliào dài), toujours omniprésents dans les petits commerces.",
          contentEn: "In July 2019, Shanghai imposed strict 垃圾分类 (waste sorting), unprecedented in China. Four categories: 可回收物 (recyclables), 有害垃圾 (hazardous waste), 湿垃圾/厨余垃圾 (wet/kitchen waste), 干垃圾/其他垃圾 (dry/other waste). Fines for mistakes. Useful vocabulary: 回收 (recycle), 环保袋 (eco bag), 一次性 (disposable). Debate: plastic bags 塑料袋, still ubiquitous in small shops.",
          objectives: [
            "Trier en 4 catégories chinoises",
            "Utiliser 可回收/有害/湿/干",
            "Comprendre 2019 Shanghai",
            "Dire 一次性/环保袋"
          ],
          objectivesEn: [
            "Sort into 4 Chinese categories",
            "Use 可回收/有害/湿/干",
            "Understand 2019 Shanghai",
            "Say 一次性/环保袋"
          ]
        },
        flashcards: ["垃圾分类", "可回收物", "有害垃圾", "回收", "一次性", "塑料袋"],
        quizQuestions: 8
      }
    ]
  },
  {
    id: "cecr-b21-economics",
    name: "Économie et travail",
    nameEn: "Economy and work",
    description: "Marché, entreprises, carrière.",
    descriptionEn: "Market, companies, career.",
    color: "#CA8A04",
    icon: "📈",
    lessons: [
      {
        id: "cecr-b21-economics-m1",
        title: "Économie générale : 经济/通货膨胀",
        titleEn: "General economy: 经济/通货膨胀",
        duration: 12, locked: false, completed: false,
        hskLevel: 5, hskLevels: [5, 6], category: "vocabulary", difficulty: "advanced",
        tags: ["economy", "inflation", "cecr:b21"],
        introduction: {
          title: "Le vocabulaire macroéconomique",
          titleEn: "Macroeconomic vocabulary",
          content: "经济 (jīngjì, économie), 经济增长 (zēngzhǎng, croissance), 经济危机 (wēijī, crise). Indicateurs : GDP → 国内生产总值 (guónèi shēngchǎn zǒngzhí) ou l'abréviation GDP est très utilisée. 通货膨胀 (tōnghuò péngzhàng, inflation), 通货紧缩 (jǐnsuō, déflation). Marché : 市场 (shìchǎng, marché), 股市 (gǔshì, bourse), 股票 (gǔpiào, action). Banques : 银行 (yínháng), 利率 (lìlǜ, taux d'intérêt), 贷款 (dàikuǎn, prêt). La Chine a connu une croissance à deux chiffres 1990-2010, puis un ralentissement structurel.",
          contentEn: "经济 (economy), 经济增长 (growth), 经济危机 (crisis). Indicators: GDP → 国内生产总值 or the abbreviation GDP is widely used. 通货膨胀 (inflation), 通货紧缩 (deflation). Market: 市场 (market), 股市 (stock market), 股票 (stock). Banks: 银行 (bank), 利率 (interest rate), 贷款 (loan). China saw double-digit growth 1990-2010, then structural slowdown.",
          objectives: [
            "Utiliser 经济/增长/危机",
            "Maîtriser 通货膨胀/通货紧缩",
            "Parler de 股市/股票",
            "Décrire les banques"
          ],
          objectivesEn: [
            "Use 经济/增长/危机",
            "Master 通货膨胀/通货紧缩",
            "Talk about 股市/股票",
            "Describe banks"
          ]
        },
        flashcards: ["经济", "经济增长", "通货膨胀", "股市", "股票", "银行", "贷款"],
        quizQuestions: 8
      },
      {
        id: "cecr-b21-economics-m2",
        title: "Entrepreneuriat et start-up",
        titleEn: "Entrepreneurship and start-ups",
        duration: 12, locked: false, completed: false,
        hskLevel: 5, hskLevels: [5, 6], category: "vocabulary", difficulty: "advanced",
        tags: ["startup", "business", "cecr:b21"],
        introduction: {
          title: "创业 et la génération des licornes chinoises",
          titleEn: "创业 and China's unicorn generation",
          content: "创业 (chuàngyè, créer une entreprise, entreprendre), 创业者 (chuàngyèzhě, entrepreneur), 创始人 (chuàngshǐrén, fondateur), 企业家 (qǐyèjiā, chef d'entreprise). Financement : 投资 (tóuzī, investir), 风险投资 (fēngxiǎn tóuzī, VC/capital-risque), 融资 (róngzī, lever des fonds), 估值 (gūzhí, valorisation), 独角兽 (dújiǎoshòu, licorne, > 1 milliard $). Structure : 公司 (gōngsī, entreprise), 上市 (shàngshì, entrer en bourse, IPO), 股东 (gǔdōng, actionnaire). Écosystème : 中关村 (Zhōngguāncūn, « Silicon Valley de Pékin »), 深圳 (Shēnzhèn, cœur tech).",
          contentEn: "创业 (start a business), 创业者 (entrepreneur), 创始人 (founder), 企业家 (business leader). Funding: 投资 (invest), 风险投资 (VC/venture capital), 融资 (raise funds), 估值 (valuation), 独角兽 (unicorn, >$1 billion). Structure: 公司 (company), 上市 (IPO), 股东 (shareholder). Ecosystem: 中关村 (Zhongguancun, «Beijing's Silicon Valley»), 深圳 (Shenzhen, tech heart).",
          objectives: [
            "Utiliser 创业/创始人/企业家",
            "Parler de 风险投资/融资",
            "Comprendre 独角兽/估值",
            "Nommer 中关村/深圳"
          ],
          objectivesEn: [
            "Use 创业/创始人/企业家",
            "Talk about VC/funding",
            "Understand unicorn/valuation",
            "Name 中关村/深圳"
          ]
        },
        flashcards: ["创业", "创始人", "企业家", "风险投资", "融资", "独角兽", "上市"],
        quizQuestions: 8
      },
      {
        id: "cecr-b21-economics-m3",
        title: "Carrière et monde du travail",
        titleEn: "Career and world of work",
        duration: 12, locked: false, completed: false,
        hskLevel: 4, hskLevels: [4, 5], category: "vocabulary", difficulty: "advanced",
        tags: ["career", "work", "cecr:b21"],
        introduction: {
          title: "996, leadership et culture d'entreprise chinoise",
          titleEn: "996, leadership and Chinese corporate culture",
          content: "996 (jiǔ jiǔ liù) : travailler de 9h à 21h, 6 jours sur 7, célèbre/notoire dans la tech chinoise — Jack Ma l'a défendu en 2019 comme une « bénédiction ». Vocabulaire : 职场 (zhíchǎng, monde professionnel), 升职 (shēngzhí, promotion), 加薪 (jiāxīn, augmentation), 跳槽 (tiàocáo, changer de job), 裁员 (cáiyuán, licenciement), 失业 (shīyè, chômage). Rôles : 老板 (lǎobǎn, patron), 同事 (tóngshì, collègue), 下属 (xiàshǔ, subordonné). Culture : 关系 (guānxi, connexions/réseau) reste central pour avancer, bien plus que le seul mérite.",
          contentEn: "996: work 9am-9pm, 6 days a week, famous/notorious in Chinese tech — Jack Ma defended it in 2019 as a «blessing». Vocabulary: 职场 (workplace), 升职 (promotion), 加薪 (raise), 跳槽 (change jobs), 裁员 (layoff), 失业 (unemployment). Roles: 老板 (boss), 同事 (colleague), 下属 (subordinate). Culture: 关系 (connections/network) stays central for advancement, far more than pure merit.",
          objectives: [
            "Comprendre 996 et son débat",
            "Utiliser 升职/加薪/跳槽/裁员",
            "Nommer 老板/同事/下属",
            "Expliquer 关系"
          ],
          objectivesEn: [
            "Understand 996 and its debate",
            "Use 升职/加薪/跳槽/裁员",
            "Name 老板/同事/下属",
            "Explain 关系"
          ]
        },
        flashcards: ["996", "升职", "加薪", "跳槽", "裁员", "失业", "老板", "关系"],
        quizQuestions: 8
      }
    ]
  },
  // ============================================================
  // B2.2 — Avancé 2/2 — Argumentation + Arts + Médecine + Société
  // ============================================================
  {
    id: "cecr-b22-grammar-structure",
    name: "Structures argumentatives fines",
    nameEn: "Fine argumentative structures",
    description: "与其…不如, 宁可…也, 只要…就 / 只有…才.",
    descriptionEn: "与其…不如, 宁可…也, 只要…就 / 只有…才.",
    color: "#BE123C",
    icon: "⚖️",
    lessons: [
      {
        id: "cecr-b22-grammar-structure-m1",
        title: "与其 A 不如 B — « plutôt que A, B »",
        titleEn: "与其 A 不如 B — «rather than A, B»",
        duration: 12, locked: false, completed: false,
        hskLevel: 5, hskLevels: [5, 6], category: "grammar", difficulty: "advanced",
        tags: ["preference", "grammar", "cecr:b22"],
        introduction: {
          title: "Le choix préférentiel — 与其…不如",
          titleEn: "Preferential choice — 与其…不如",
          content: "与其 A 不如 B exprime un choix préférentiel : « plutôt que A, B vaut mieux ». 与其等他，不如我们先走 (« plutôt que l'attendre, on ferait mieux de partir »). 与其 marque l'option rejetée ; 不如 introduit l'option meilleure. La phrase peut omettre 与其 si le contexte est clair : 不如你来 (« mieux vaut que TU viennes »). Différence avec 比 : 比 compare objectivement (A 比 B 好), 与其…不如 propose un choix/conseil subjectif. Synonyme : 还不如 (« autant valoir »).",
          contentEn: "与其 A 不如 B expresses a preferential choice: «rather than A, B is better». 与其等他，不如我们先走 («rather than wait for him, we'd better leave first»). 与其 marks the rejected option; 不如 introduces the better option. The sentence can drop 与其 if context is clear: 不如你来 («better YOU come»). Difference with 比: 比 compares objectively (A 比 B 好), 与其…不如 proposes a subjective choice/advice. Synonym: 还不如 («might as well»).",
          objectives: [
            "Construire 与其 A 不如 B",
            "Choisir 与其 vs 比",
            "Omettre 与其 en contexte",
            "Utiliser 还不如"
          ],
          objectivesEn: [
            "Build 与其 A 不如 B",
            "Choose 与其 vs 比",
            "Omit 与其 in context",
            "Use 还不如"
          ]
        },
        flashcards: ["与其", "不如", "等", "先", "还不如"],
        quizQuestions: 8
      },
      {
        id: "cecr-b22-grammar-structure-m2",
        title: "宁可 A 也 B — « plutôt faire A que B »",
        titleEn: "宁可 A 也 B — «rather do A than B»",
        duration: 12, locked: false, completed: false,
        hskLevel: 5, hskLevels: [5, 6], category: "grammar", difficulty: "advanced",
        tags: ["preference", "grammar", "cecr:b22"],
        introduction: {
          title: "La préférence dans le sacrifice — 宁可…也",
          titleEn: "Preference through sacrifice — 宁可…也",
          content: "宁可 (nìngkě) A 也 B = « je préfère A même si cela signifie B ». 我宁可饿着，也不吃剩饭 (« je préfère avoir faim plutôt que manger des restes »). Nuance de sacrifice/détermination : on accepte A (souvent désagréable) pour éviter B (pire). Variantes : 宁愿 = 宁可. 宁可 A 也不 B (forme négative après 也) insiste sur le refus. Compare avec 与其…不如 (choix entre deux possibilités). 宁可 est plus résolu, avec un ton de fermeté personnelle : « je préfère mourir plutôt que… » → 宁死也不 (formule classique).",
          contentEn: "宁可 A 也 B = «I prefer A even if it means B». 我宁可饿着，也不吃剩饭 («I'd rather go hungry than eat leftovers»). Sacrifice/determination nuance: we accept A (often unpleasant) to avoid B (worse). Variants: 宁愿 = 宁可. 宁可 A 也不 B (negative form after 也) stresses refusal. Compare with 与其…不如 (choice between two possibilities). 宁可 is more resolute, with a tone of personal firmness: «I'd rather die than…» → 宁死也不 (classical formula).",
          objectives: [
            "Construire 宁可 A 也 B",
            "Utiliser la forme négative 也不",
            "Exprimer détermination/sacrifice",
            "Distinguer 宁可 vs 与其"
          ],
          objectivesEn: [
            "Build 宁可 A 也 B",
            "Use negative 也不 form",
            "Express determination/sacrifice",
            "Distinguish 宁可 vs 与其"
          ]
        },
        flashcards: ["宁可", "宁愿", "也", "饿", "剩饭"],
        quizQuestions: 8
      },
      {
        id: "cecr-b22-grammar-structure-m3",
        title: "只要…就 vs 只有…才 — conditions suffisantes vs nécessaires",
        titleEn: "只要…就 vs 只有…才 — sufficient vs necessary conditions",
        duration: 12, locked: false, completed: false,
        hskLevel: 4, hskLevels: [4, 5], category: "grammar", difficulty: "advanced",
        tags: ["conditionals", "grammar", "cecr:b22"],
        introduction: {
          title: "Deux conditionnels opposés — ouvert vs exclusif",
          titleEn: "Two opposing conditionals — open vs exclusive",
          content: "只要 A 就 B (« il suffit que A pour que B ») = condition suffisante : 只要你来，我就开心 (« il suffit que tu viennes pour que je sois heureux »). Ouvert : d'autres conditions peuvent aussi suffire. 只有 A 才 B (« seulement si A, alors B ») = condition nécessaire exclusive : 只有努力，才能成功 (« il faut impérativement travailler dur pour réussir »). Fermé : rien d'autre ne marche. Piège majeur : confondre 就 (permissif) et 才 (restrictif) inverse totalement le sens. Astuce : 就 = dès que ça suffit / 才 = pas avant que.",
          contentEn: "只要 A 就 B («it's enough for A, then B») = sufficient condition: 只要你来，我就开心 («it's enough that you come for me to be happy»). Open: other conditions could also suffice. 只有 A 才 B («only if A, then B») = exclusive necessary condition: 只有努力，才能成功 («only hard work leads to success»). Closed: nothing else works. Major pitfall: confusing 就 (permissive) and 才 (restrictive) inverts the meaning. Tip: 就 = as soon as it suffices / 才 = not before.",
          objectives: [
            "Différencier 只要 (suffisant) vs 只有 (nécessaire)",
            "Associer 只要→就 / 只有→才",
            "Construire avec 能/可以",
            "Ne jamais inverser 就/才"
          ],
          objectivesEn: [
            "Differentiate 只要 (sufficient) vs 只有 (necessary)",
            "Pair 只要→就 / 只有→才",
            "Build with 能/可以",
            "Never swap 就/才"
          ]
        },
        flashcards: ["只要", "只有", "就", "才", "努力", "成功"],
        quizQuestions: 8
      }
    ]
  },
  {
    id: "cecr-b22-arts",
    name: "Arts et littérature moderne",
    nameEn: "Arts and modern literature",
    description: "Lu Xun, cinéma, musique pop.",
    descriptionEn: "Lu Xun, cinema, pop music.",
    color: "#7E22CE",
    icon: "🎨",
    lessons: [
      {
        id: "cecr-b22-arts-m1",
        title: "Littérature moderne : 鲁迅 et la nouvelle ère",
        titleEn: "Modern literature: 鲁迅 and the new era",
        duration: 12, locked: false, completed: false,
        hskLevel: 6, hskLevels: [5, 6], category: "culture", difficulty: "advanced",
        tags: ["literature", "luxun", "cecr:b22"],
        introduction: {
          title: "鲁迅 (Lu Xun) — le père de la littérature chinoise moderne",
          titleEn: "鲁迅 (Lu Xun) — the father of modern Chinese literature",
          content: "鲁迅 (1881-1936) est la figure tutélaire de la littérature moderne chinoise. Formé à la médecine au Japon, il abandonne pour « soigner les esprits ». Œuvres clés : 《狂人日记》(Kuángrén Rìjì, « Journal d'un fou », 1918) — premier texte en 白话文 (báihuàwén, chinois vernaculaire) contre le 文言文 (wényánwén, chinois classique). 《阿Q正传》(Ā Q Zhèngzhuàn, « La véritable histoire d'A Q ») — satire cinglante de la « victoire spirituelle ». Mouvement du 4 mai 1919 (五四运动, Wǔsì Yùndòng) — réforme culturelle et linguistique. Le 白话文 devient la norme : les romanciers écrivent désormais comme ils parlent. Lu Xun reste une figure d'autorité morale, enseignée dans toutes les écoles chinoises.",
          contentEn: "鲁迅 (1881-1936) is the tutelary figure of modern Chinese literature. Trained in medicine in Japan, he abandoned it to «heal minds». Key works: 《狂人日记》(«Diary of a Madman», 1918) — first text in 白话文 (vernacular Chinese) against 文言文 (classical Chinese). 《阿Q正传》(«The True Story of Ah Q») — scathing satire on «spiritual victory». May Fourth Movement 1919 (五四运动) — cultural and linguistic reform. 白话文 becomes the norm: novelists now write as they speak. Lu Xun remains a moral authority, taught in every Chinese school.",
          objectives: [
            "Connaître 鲁迅 et son rôle",
            "Distinguer 白话文 vs 文言文",
            "Citer 狂人日记/阿Q正传",
            "Situer le 五四运动 (1919)"
          ],
          objectivesEn: [
            "Know 鲁迅 and his role",
            "Distinguish 白话文 vs 文言文",
            "Cite 狂人日记/阿Q正传",
            "Place the May Fourth Movement (1919)"
          ]
        },
        flashcards: ["鲁迅", "白话文", "文言文", "狂人日记", "阿Q正传", "五四运动"],
        quizQuestions: 8
      },
      {
        id: "cecr-b22-arts-m2",
        title: "Cinéma chinois : de la 5ème génération à aujourd'hui",
        titleEn: "Chinese cinema: from the 5th generation to today",
        duration: 12, locked: false, completed: false,
        hskLevel: 5, hskLevels: [5, 6], category: "culture", difficulty: "advanced",
        tags: ["cinema", "film", "cecr:b22"],
        introduction: {
          title: "张艺谋, 陈凯歌, 贾樟柯 : trois générations",
          titleEn: "张艺谋, 陈凯歌, 贾樟柯: three generations",
          content: "La 5ème génération (années 80-90) : 张艺谋 (Zhāng Yìmóu, Zhang Yimou) — 《红高粱》(Hóng Gāoliáng, Le sorgho rouge), 《大红灯笼高高挂》(Les lanternes rouges), 《英雄》(Hero). 陈凯歌 (Chén Kǎigē, Chen Kaige) — 《霸王别姬》(Adieu ma concubine), Palme d'or 1993. 6ème génération (années 2000) : 贾樟柯 (Jiǎ Zhāngkē) — films réalistes sur la Chine urbaine en mutation (《小武》, 《三峡好人》). Vocabulaire : 导演 (dǎoyǎn, réalisateur), 演员 (yǎnyuán, acteur), 电影节 (diànyǐngjié, festival), 票房 (piàofáng, box-office). Le marché chinois est aujourd'hui le premier au monde.",
          contentEn: "5th generation (80s-90s): 张艺谋 (Zhang Yimou) — 《红高粱》(Red Sorghum), 《大红灯笼高高挂》(Raise the Red Lantern), 《英雄》(Hero). 陈凯歌 (Chen Kaige) — 《霸王别姬》(Farewell My Concubine), Palme d'Or 1993. 6th generation (2000s): 贾樟柯 (Jia Zhangke) — realist films on urban China in transition (《小武》, 《三峡好人》). Vocabulary: 导演 (director), 演员 (actor), 电影节 (festival), 票房 (box office). The Chinese market is now the world's largest.",
          objectives: [
            "Distinguer 5e et 6e générations",
            "Citer 张艺谋/陈凯歌/贾樟柯",
            "Connaître 霸王别姬 (1993)",
            "Utiliser 导演/演员/票房"
          ],
          objectivesEn: [
            "Distinguish 5th and 6th generations",
            "Cite 张艺谋/陈凯歌/贾樟柯",
            "Know 霸王别姬 (1993)",
            "Use 导演/演员/票房"
          ]
        },
        flashcards: ["导演", "演员", "电影节", "票房", "张艺谋", "陈凯歌", "贾樟柯"],
        quizQuestions: 8
      },
      {
        id: "cecr-b22-arts-m3",
        title: "Musique populaire : de 邓丽君 à C-pop",
        titleEn: "Popular music: from 邓丽君 to C-pop",
        duration: 12, locked: false, completed: false,
        hskLevel: 5, hskLevels: [4, 5], category: "culture", difficulty: "advanced",
        tags: ["music", "pop", "cecr:b22"],
        introduction: {
          title: "La bande-son de la Chine moderne",
          titleEn: "The soundtrack of modern China",
          content: "邓丽君 (Dèng Lìjūn, Teresa Teng, 1953-1995) — voix phare des années 70-80, surnommée « le soleil du jour, Teng la nuit ». Ses chansons ont franchi le rideau de bambou : 《月亮代表我的心》(La lune représente mon cœur). 周杰伦 (Zhōu Jiélún, Jay Chou) — star taïwanaise dominant les années 2000, mélange rap/jazz/éléments traditionnels. Mandopop (国语流行, Guóyǔ liúxíng) vs Cantopop (粤语流行). Aujourd'hui : 华语乐坛 (Huáyǔ Yuètán, scène musicale sinophone) dominée par la télé-réalité 选秀节目 (xuǎnxiù jiémù) et des artistes comme 华晨宇 (Huá Chényǔ), G.E.M. 邓紫棋. Vocabulaire : 歌手 (gēshǒu, chanteur), 专辑 (zhuānjí, album), 演唱会 (yǎnchànghuì, concert).",
          contentEn: "邓丽君 (Teresa Teng, 1953-1995) — iconic voice of the 70s-80s, nicknamed «the sun by day, Teng by night». Her songs crossed the bamboo curtain: 《月亮代表我的心》(The Moon Represents My Heart). 周杰伦 (Jay Chou) — Taiwanese star dominating the 2000s, blend of rap/jazz/traditional elements. Mandopop (国语流行) vs Cantopop (粤语流行). Today: 华语乐坛 (Chinese-language music scene) dominated by talent shows 选秀节目 and artists like 华晨宇, G.E.M. 邓紫棋. Vocabulary: 歌手 (singer), 专辑 (album), 演唱会 (concert).",
          objectives: [
            "Connaître 邓丽君 et 周杰伦",
            "Distinguer Mandopop vs Cantopop",
            "Utiliser 歌手/专辑/演唱会",
            "Comprendre 选秀节目"
          ],
          objectivesEn: [
            "Know 邓丽君 and 周杰伦",
            "Distinguish Mandopop vs Cantopop",
            "Use 歌手/专辑/演唱会",
            "Understand 选秀节目"
          ]
        },
        flashcards: ["邓丽君", "周杰伦", "歌手", "专辑", "演唱会", "选秀节目"],
        quizQuestions: 8
      },
      {
        id: "cecr-b22-arts-m4",
        title: "Calligraphie et peinture chinoise",
        titleEn: "Chinese calligraphy and painting",
        duration: 12, locked: false, completed: false,
        hskLevel: 5, hskLevels: [5, 6], category: "culture", difficulty: "advanced",
        tags: ["calligraphy", "painting", "cecr:b22"],
        introduction: {
          title: "书法 : l'écriture comme art suprême",
          titleEn: "书法: writing as the supreme art",
          content: "书法 (shūfǎ, calligraphie) : art majeur depuis 2 000 ans, mêlant esthétique et spiritualité. Les 文房四宝 (wénfáng sì bǎo, les « quatre trésors du lettré ») : 笔 (bǐ, pinceau), 墨 (mò, encre), 纸 (zhǐ, papier), 砚 (yàn, pierre à encre). Cinq styles principaux : 篆书 (zhuànshū, sigillaire), 隶书 (lìshū, scribale), 楷书 (kǎishū, régulier), 行书 (xíngshū, courant), 草书 (cǎoshū, cursif/« herbe folle »). Calligraphes légendaires : 王羲之 (Wáng Xīzhī, 303-361), considéré comme 书圣 (shūshèng, « saint de la calligraphie »). Peinture 国画 (guóhuà, peinture chinoise) / 水墨画 (shuǐmòhuà, peinture à l'encre) — montagnes-rivières 山水画 (shānshuǐhuà) dominantes.",
          contentEn: "书法 (calligraphy): a major art for 2,000 years, blending aesthetics and spirituality. The 文房四宝 («Four Treasures of the Study»): 笔 (brush), 墨 (ink), 纸 (paper), 砚 (inkstone). Five main styles: 篆书 (seal), 隶书 (clerical), 楷书 (regular), 行书 (running), 草书 (cursive/«wild grass»). Legendary calligraphers: 王羲之 (303-361), considered 书圣 («Sage of Calligraphy»). Painting 国画 (Chinese painting) / 水墨画 (ink painting) — mountains-rivers 山水画 dominant.",
          objectives: [
            "Nommer les 文房四宝",
            "Distinguer 5 styles de 书法",
            "Connaître 王羲之 (书圣)",
            "Utiliser 国画/水墨画/山水画"
          ],
          objectivesEn: [
            "Name the 文房四宝",
            "Distinguish 5 calligraphy styles",
            "Know 王羲之 (Sage of Calligraphy)",
            "Use 国画/水墨画/山水画"
          ]
        },
        flashcards: ["书法", "文房四宝", "笔", "墨", "楷书", "草书", "王羲之", "国画", "水墨画", "山水画"],
        quizQuestions: 8
      }
    ]
  },
  {
    id: "cecr-b22-health",
    name: "Santé : médecines traditionnelle et moderne",
    nameEn: "Health: traditional and modern medicine",
    description: "中医 vs 西医, système hospitalier, pharmacie.",
    descriptionEn: "中医 vs 西医, hospital system, pharmacy.",
    color: "#0F766E",
    icon: "❤️",
    lessons: [
      {
        id: "cecr-b22-health-m1",
        title: "中医 : médecine traditionnelle chinoise",
        titleEn: "中医: traditional Chinese medicine",
        duration: 12, locked: false, completed: false,
        hskLevel: 5, hskLevels: [5, 6], category: "vocabulary", difficulty: "advanced",
        tags: ["tcm", "medicine", "cecr:b22"],
        introduction: {
          title: "中医 — 2000 ans de sagesse médicale",
          titleEn: "中医 — 2000 years of medical wisdom",
          content: "中医 (Zhōngyī, médecine chinoise traditionnelle, TCM) : système cohérent basé sur l'équilibre 阴阳 (yīnyáng) et les 5 éléments 五行 (wǔxíng). Diagnostic par 望闻问切 (wàng-wén-wèn-qiè, « observer-écouter/sentir-demander-palper [le pouls] »). Thérapies : 针灸 (zhēnjiǔ, acupuncture et moxibustion), 推拿 (tuīná, massage thérapeutique), 中药 (zhōngyào, pharmacopée — herbes et minéraux), 拔罐 (báguàn, ventouses). Concepts : 气 (qì, énergie vitale), 血 (xuè, sang), 经络 (jīngluò, méridiens). La TCM est reconnue par l'UNESCO ; en Chine on consulte souvent l'un APRÈS l'autre, avec parfois des ordonnances mixtes 中西医结合.",
          contentEn: "中医 (TCM, Traditional Chinese Medicine): coherent system based on 阴阳 (yin-yang) balance and the 5 elements 五行. Diagnosis via 望闻问切 («look-smell/listen-ask-palpate [pulse]»). Therapies: 针灸 (acupuncture and moxibustion), 推拿 (therapeutic massage), 中药 (pharmacopoeia — herbs and minerals), 拔罐 (cupping). Concepts: 气 (qi, vital energy), 血 (blood), 经络 (meridians). TCM is UNESCO-recognized; in China people often consult both in turn, with sometimes mixed prescriptions 中西医结合.",
          objectives: [
            "Décrire 望闻问切",
            "Nommer 针灸/推拿/中药",
            "Comprendre 气/血/经络",
            "Distinguer 中医 vs 西医"
          ],
          objectivesEn: [
            "Describe 望闻问切",
            "Name 针灸/推拿/中药",
            "Understand 气/血/经络",
            "Distinguish 中医 vs 西医"
          ]
        },
        flashcards: ["中医", "针灸", "推拿", "中药", "气", "经络", "拔罐", "阴阳"],
        quizQuestions: 8
      },
      {
        id: "cecr-b22-health-m2",
        title: "Hôpital et consultation moderne",
        titleEn: "Hospital and modern consultation",
        duration: 12, locked: false, completed: false,
        hskLevel: 4, hskLevels: [4, 5], category: "vocabulary", difficulty: "advanced",
        tags: ["hospital", "healthcare", "cecr:b22"],
        introduction: {
          title: "Navigation dans le système hospitalier chinois",
          titleEn: "Navigating the Chinese hospital system",
          content: "医院 (yīyuàn, hôpital), 门诊 (ménzhěn, consultations externes), 急诊 (jízhěn, urgences), 住院 (zhùyuàn, hospitalisation). Étapes typiques : 挂号 (guàhào, prendre un ticket) → 候诊 (hòuzhěn, attendre) → 看病 (kànbìng, consulter) → 开药 (kāiyào, prescrire) → 取药 (qǔyào, retirer les médicaments) → 付款 (fùkuǎn, payer). Services : 内科 (nèikē, médecine interne), 外科 (wàikē, chirurgie), 儿科 (érkē, pédiatrie), 皮肤科 (pífūkē, dermatologie). En Chine, le système est payant et beaucoup d'hôpitaux exigent un dépôt 押金 (yājīn) avant admission. L'assurance 医保 (yībǎo) couvre une partie.",
          contentEn: "医院 (hospital), 门诊 (outpatient), 急诊 (emergency), 住院 (admission). Typical steps: 挂号 (get ticket) → 候诊 (wait) → 看病 (consult) → 开药 (prescribe) → 取药 (collect drugs) → 付款 (pay). Departments: 内科 (internal medicine), 外科 (surgery), 儿科 (pediatrics), 皮肤科 (dermatology). In China, the system is fee-based and many hospitals require a deposit 押金 before admission. Insurance 医保 covers part.",
          objectives: [
            "Maîtriser le parcours 挂号→看病→取药",
            "Nommer services (内/外/儿/皮肤科)",
            "Comprendre 押金/医保",
            "Utiliser 门诊/急诊/住院"
          ],
          objectivesEn: [
            "Master the 挂号→看病→取药 flow",
            "Name departments (内/外/儿/皮肤科)",
            "Understand 押金/医保",
            "Use 门诊/急诊/住院"
          ]
        },
        flashcards: ["医院", "门诊", "急诊", "挂号", "看病", "开药", "内科", "外科", "医保"],
        quizQuestions: 8
      },
      {
        id: "cecr-b22-health-m3",
        title: "Bien-être et modes de vie",
        titleEn: "Well-being and lifestyles",
        duration: 12, locked: false, completed: false,
        hskLevel: 5, hskLevels: [4, 5], category: "vocabulary", difficulty: "advanced",
        tags: ["wellness", "lifestyle", "cecr:b22"],
        introduction: {
          title: "养生 : cultiver la vie",
          titleEn: "养生: nurturing life",
          content: "养生 (yǎngshēng, « nourrir la vie ») : concept central du bien-être chinois. Inclut alimentation, sommeil, émotions, exercice. Activités typiques : 太极拳 (tàijíquán, taichi), 气功 (qìgōng, qigong), 散步 (sànbù, promenade matinale dans les parcs — typique des seniors chinois). Diète : 食疗 (shíliáo, soigner par l'alimentation) — 夏天吃西瓜 (en été on mange de la pastèque), 冬天补 (en hiver on se « reconstitue »). Boissons : 喝热水 (hē rè shuǐ, boire de l'eau chaude) — incontournable en Chine, jamais de l'eau froide, considérée mauvaise pour le 气. Stress moderne : 亚健康 (yàjiànkāng, « sub-santé » — fatigue, stress mais sans maladie), 抑郁症 (yìyùzhèng, dépression).",
          contentEn: "养生 («nourish life»): central Chinese wellness concept. Includes food, sleep, emotions, exercise. Typical activities: 太极拳 (tai chi), 气功 (qigong), 散步 (morning park walks — typical of Chinese seniors). Diet: 食疗 (food therapy) — 夏天吃西瓜 (watermelon in summer), 冬天补 (reconstitute in winter). Drinks: 喝热水 (drink hot water) — essential in China, never cold water, considered bad for 气. Modern stress: 亚健康 («sub-health» — fatigue, stress without disease), 抑郁症 (depression).",
          objectives: [
            "Comprendre 养生 et ses piliers",
            "Pratiquer 太极拳/气功/散步",
            "Expliquer 喝热水 culturellement",
            "Parler de 亚健康/抑郁症"
          ],
          objectivesEn: [
            "Understand 养生 and its pillars",
            "Practice 太极拳/气功/散步",
            "Explain 喝热水 culturally",
            "Talk about 亚健康/抑郁症"
          ]
        },
        flashcards: ["养生", "太极拳", "气功", "散步", "食疗", "热水", "亚健康", "抑郁症"],
        quizQuestions: 8
      }
    ]
  },
  {
    id: "cecr-b22-debate",
    name: "Argumentation et débat",
    nameEn: "Argumentation and debate",
    description: "Construire un argument, nuancer, réfuter.",
    descriptionEn: "Build an argument, qualify, refute.",
    color: "#374151",
    icon: "💬",
    lessons: [
      {
        id: "cecr-b22-debate-m1",
        title: "Introduire et soutenir un point de vue",
        titleEn: "Introduce and support a viewpoint",
        duration: 12, locked: false, completed: false,
        hskLevel: 5, hskLevels: [4, 5], category: "conversation", difficulty: "advanced",
        tags: ["debate", "argumentation", "cecr:b22"],
        introduction: {
          title: "La trousse à outils de l'argumentation",
          titleEn: "The argumentation toolkit",
          content: "Introduire : 我认为 (wǒ rènwéi, je pense que), 在我看来 (zài wǒ kàn lái, selon moi), 从…来看 (cóng…lái kàn, à partir de…). Expliquer/justifier : 因为 (yīnwèi, parce que), 由于 (yóuyú, du fait que — plus soutenu), 原因是 (yuányīn shì, la raison est), 之所以…是因为 (zhīsuǒyǐ…shì yīnwèi, si…c'est parce que). Illustrer : 例如 (lìrú, par exemple), 比如 (bǐrú, comme), 举例来说 (jǔ lì lái shuō, pour donner un exemple). Ajouter : 另外 (lìngwài, en outre), 此外 (cǐwài, en plus), 再说 (zàishuō, d'ailleurs). Ces formules structurent un développement oral ou écrit B2.",
          contentEn: "Introduce: 我认为 (I think that), 在我看来 (in my view), 从…来看 (from…'s perspective). Explain/justify: 因为 (because), 由于 (due to — more formal), 原因是 (the reason is), 之所以…是因为 (if…it is because). Illustrate: 例如 (for example), 比如 (like), 举例来说 (to give an example). Add: 另外 (furthermore), 此外 (in addition), 再说 (besides). These formulas structure a B2 oral or written argument.",
          objectives: [
            "Introduire avec 我认为/在我看来",
            "Justifier avec 因为/由于/之所以",
            "Illustrer avec 例如/比如",
            "Ajouter avec 另外/此外"
          ],
          objectivesEn: [
            "Introduce with 我认为/在我看来",
            "Justify with 因为/由于/之所以",
            "Illustrate with 例如/比如",
            "Add with 另外/此外"
          ]
        },
        flashcards: ["认为", "在我看来", "因为", "由于", "例如", "另外", "此外"],
        quizQuestions: 8
      },
      {
        id: "cecr-b22-debate-m2",
        title: "Nuancer et relativiser",
        titleEn: "Qualify and relativize",
        duration: 12, locked: false, completed: false,
        hskLevel: 5, hskLevels: [5, 6], category: "conversation", difficulty: "advanced",
        tags: ["debate", "nuance", "cecr:b22"],
        introduction: {
          title: "L'art de dire « oui, mais »",
          titleEn: "The art of saying «yes, but»",
          content: "Reconnaître un point adverse : 虽然…但是 (suīrán…dànshì, bien que…mais), 的确 (díquè, certes), 不可否认 (bùkě fǒurèn, on ne peut nier). Introduire une nuance : 不过 (búguò, cependant — plus léger que 但是), 然而 (rán'ér, toutefois — soutenu), 其实 (qíshí, en réalité). Généraliser avec prudence : 一般来说 (yībān lái shuō, en général), 通常 (tōngcháng, d'habitude), 大多数 (dàduōshù, la plupart). Restreindre : 只是 (zhǐshì, simplement), 不一定 (bùyídìng, pas forcément). Ces marqueurs évitent le style tranché et signalent une pensée nuancée — très valorisé dans les débats chinois « civils ».",
          contentEn: "Acknowledge an opposing point: 虽然…但是 (although…but), 的确 (admittedly), 不可否认 (one cannot deny). Introduce nuance: 不过 (however — milder than 但是), 然而 (yet — formal), 其实 (actually). Generalize cautiously: 一般来说 (generally speaking), 通常 (usually), 大多数 (most). Restrict: 只是 (simply), 不一定 (not necessarily). These markers avoid stark style and signal nuanced thought — highly valued in «civil» Chinese debate.",
          objectives: [
            "Reconnaître avec 虽然/的确",
            "Nuancer avec 不过/然而/其实",
            "Généraliser avec 一般来说/通常",
            "Restreindre avec 只是/不一定"
          ],
          objectivesEn: [
            "Acknowledge with 虽然/的确",
            "Qualify with 不过/然而/其实",
            "Generalize with 一般来说/通常",
            "Restrict with 只是/不一定"
          ]
        },
        flashcards: ["的确", "不可否认", "不过", "然而", "其实", "一般来说", "通常", "不一定"],
        quizQuestions: 8
      },
      {
        id: "cecr-b22-debate-m3",
        title: "Réfuter et conclure",
        titleEn: "Refute and conclude",
        duration: 12, locked: false, completed: false,
        hskLevel: 5, hskLevels: [5, 6], category: "conversation", difficulty: "advanced",
        tags: ["debate", "refutation", "cecr:b22"],
        introduction: {
          title: "Réfuter sans offenser + conclure fermement",
          titleEn: "Refute without offending + conclude firmly",
          content: "Réfuter poliment : 我不太同意 (wǒ bú tài tóngyì, je ne suis pas tout à fait d'accord), 恐怕不是这样 (kǒngpà búshì zhèyàng, je crains que non), 这种看法值得商榷 (zhè zhǒng kànfǎ zhídé shāngquè, ce point de vue mérite discussion — très soutenu). Plus direct : 我反对 (wǒ fǎnduì, je m'oppose), 这是错的 (zhè shì cuò de, c'est faux — à ÉVITER en contexte formel chinois, jugé frontal). Conclure : 总之 (zǒngzhī, en bref), 总的来说 (zǒng de láishuō, en somme), 综上所述 (zōng shàng suǒ shù, au vu de ce qui précède — écrit), 因此 (yīncǐ, par conséquent). La culture chinoise valorise la 面子 (miànzi, face) : préférer 商榷/恐怕 à des réfutations directes.",
          contentEn: "Refute politely: 我不太同意 (I don't quite agree), 恐怕不是这样 (I'm afraid not so), 这种看法值得商榷 (this view deserves discussion — very formal). More direct: 我反对 (I object), 这是错的 (this is wrong — to AVOID in formal Chinese contexts, seen as confrontational). Conclude: 总之 (in short), 总的来说 (overall), 综上所述 (in light of the above — written), 因此 (therefore). Chinese culture values 面子 (face): prefer 商榷/恐怕 over direct refutations.",
          objectives: [
            "Réfuter avec 不太同意/恐怕/商榷",
            "Conclure avec 总之/综上所述/因此",
            "Éviter réfutations frontales",
            "Comprendre 面子 dans un débat"
          ],
          objectivesEn: [
            "Refute with 不太同意/恐怕/商榷",
            "Conclude with 总之/综上所述/因此",
            "Avoid frontal refutations",
            "Understand 面子 in debate"
          ]
        },
        flashcards: ["同意", "反对", "恐怕", "商榷", "总之", "综上所述", "因此", "面子"],
        quizQuestions: 8
      }
    ]
  }
  ,
  // ============================================================
  // C1.1 — Autonome 1/2 — Chengyu + Discours journalistique + Histoire
  // ============================================================
  {
    id: "cecr-c11-chengyu-basic",
    name: "成语 : expressions à 4 caractères (essentiels)",
    nameEn: "成语: four-character expressions (essentials)",
    description: "Les 20 chengyu les plus utilisés au quotidien.",
    descriptionEn: "The 20 most commonly used chengyu.",
    color: "#7C2D12",
    icon: "🌟",
    lessons: [
      {
        id: "cecr-c11-chengyu-basic-m1",
        title: "Chengyu positifs : 一举两得, 马到成功, 锦上添花",
        titleEn: "Positive chengyu: 一举两得, 马到成功, 锦上添花",
        duration: 12, locked: false, completed: false,
        hskLevel: 6, hskLevels: [5, 6], category: "vocabulary", difficulty: "superior",
        tags: ["chengyu", "idioms", "cecr:c11"],
        introduction: {
          title: "« Faire d'une pierre deux coups » version chinoise",
          titleEn: "«Kill two birds with one stone» the Chinese way",
          content: "Un 成语 (chéngyǔ) est une formule figée de 4 caractères, souvent issue d'un classique, qui condense une idée complète. Positifs courants : 一举两得 (yì jǔ liǎng dé, « une action, deux gains » = faire d'une pierre deux coups), 马到成功 (mǎ dào chénggōng, « dès que le cheval arrive, victoire » = succès immédiat), 锦上添花 (jǐn shàng tiān huā, « ajouter une fleur sur un brocart » = ajouter au mieux une beauté superflue — cadeau à quelqu'un qui a déjà tout). Grammaticalement, un chengyu fonctionne comme un adjectif ou un groupe verbal : 这真是一举两得 (« c'est vraiment faire d'une pierre deux coups »). Utiliser un chengyu juste marque la maîtrise — mais mal placé, il ridiculise.",
          contentEn: "A 成语 (chengyu) is a fixed 4-character expression, often from a classic, condensing a complete idea. Common positives: 一举两得 («one action, two gains» = kill two birds with one stone), 马到成功 («as soon as horse arrives, victory» = immediate success), 锦上添花 («add a flower to brocade» = icing on the cake — gift to someone who already has it all). Grammatically, a chengyu functions as an adjective or verb phrase: 这真是一举两得 («this is really killing two birds with one stone»). Correctly using a chengyu marks mastery — but misplaced, it's ridiculous.",
          objectives: [
            "Comprendre la structure du 成语 (4 car.)",
            "Utiliser 一举两得/马到成功/锦上添花",
            "Placer un chengyu comme adj./verbe",
            "Éviter les emplois inappropriés"
          ],
          objectivesEn: [
            "Understand 成语 structure (4 chars)",
            "Use 一举两得/马到成功/锦上添花",
            "Place a chengyu as adj./verb",
            "Avoid inappropriate uses"
          ]
        },
        flashcards: ["成语", "一举两得", "马到成功", "锦上添花"],
        quizQuestions: 8
      },
      {
        id: "cecr-c11-chengyu-basic-m2",
        title: "Chengyu descriptifs : 人山人海, 五花八门, 千变万化",
        titleEn: "Descriptive chengyu: 人山人海, 五花八门, 千变万化",
        duration: 12, locked: false, completed: false,
        hskLevel: 6, hskLevels: [5, 6], category: "vocabulary", difficulty: "superior",
        tags: ["chengyu", "descriptive", "cecr:c11"],
        introduction: {
          title: "Peindre une scène en 4 caractères",
          titleEn: "Painting a scene in 4 characters",
          content: "人山人海 (rén shān rén hǎi, « [une] montagne de gens, [une] mer de gens » = foule dense) — indispensable pour décrire 春运 (Spring Festival travel rush). 五花八门 (wǔ huā bā mén, « 5 fleurs, 8 portes » = toutes sortes, varié) — 商店里五花八门的东西都有 (« dans le magasin il y a de tout »). 千变万化 (qiān biàn wàn huà, « mille changements, dix mille transformations » = en perpétuelle évolution) — souvent pour décrire la nature ou le marché. Ces chengyu sont fréquents dans la presse et les conversations soutenues. Note prosodique : les 4 caractères forment souvent une symétrie 2+2 (人山/人海) qui aide à la mémorisation.",
          contentEn: "人山人海 («a mountain of people, a sea of people» = dense crowd) — essential for describing 春运 (Spring Festival travel rush). 五花八门 («5 flowers, 8 doors» = all sorts, varied) — 商店里五花八门的东西都有 («the shop has all kinds of things»). 千变万化 («a thousand changes, ten thousand transformations» = constantly evolving) — often for nature or the market. These chengyu are frequent in press and formal conversation. Prosodic note: the 4 characters often form a 2+2 symmetry (人山/人海) that aids memorization.",
          objectives: [
            "Décrire une foule avec 人山人海",
            "Utiliser 五花八门 pour variété",
            "Appliquer 千变万化 au changement",
            "Repérer la structure 2+2"
          ],
          objectivesEn: [
            "Describe a crowd with 人山人海",
            "Use 五花八门 for variety",
            "Apply 千变万化 to change",
            "Spot the 2+2 structure"
          ]
        },
        flashcards: ["人山人海", "五花八门", "千变万化"],
        quizQuestions: 8
      },
      {
        id: "cecr-c11-chengyu-basic-m3",
        title: "Chengyu négatifs/critiques : 自相矛盾, 画蛇添足, 杯弓蛇影",
        titleEn: "Negative/critical chengyu: 自相矛盾, 画蛇添足, 杯弓蛇影",
        duration: 12, locked: false, completed: false,
        hskLevel: 6, hskLevels: [6], category: "vocabulary", difficulty: "superior",
        tags: ["chengyu", "criticism", "cecr:c11"],
        introduction: {
          title: "L'art de critiquer avec 4 caractères",
          titleEn: "The art of criticizing in 4 characters",
          content: "自相矛盾 (zì xiāng máodùn, « se contredire — lance contre bouclier ») — du paradoxe classique du vendeur d'armes prétendant que sa lance perce TOUT et son bouclier est IM-PER-ÇABLE. Quand quelqu'un dit A puis non-A : 你的话自相矛盾. 画蛇添足 (huà shé tiān zú, « dessiner un serpent et lui ajouter des pattes » = gâcher par excès de zèle). 杯弓蛇影 (bēi gōng shé yǐng, « l'arc [reflété] dans la coupe, [pris pour] l'ombre d'un serpent » = se faire peur tout seul, soupçons imaginaires) — légende d'un homme malade pendant des jours après avoir cru voir un serpent dans sa coupe de vin. Ces chengyu permettent une critique lettrée et voilée.",
          contentEn: "自相矛盾 («self-contradiction — spear vs shield») — from the classic paradox of the arms seller claiming his spear pierces EVERYTHING and his shield is UNPIERCEABLE. When someone says A then non-A: 你的话自相矛盾. 画蛇添足 («draw a snake and add legs» = ruin through overzealousness). 杯弓蛇影 («the bow [reflected] in the cup, [mistaken for] a snake's shadow» = frighten oneself, imagined suspicions) — legend of a man sick for days after thinking he'd seen a snake in his wine cup. These chengyu allow learned and veiled criticism.",
          objectives: [
            "Signaler contradiction : 自相矛盾",
            "Critiquer excès : 画蛇添足",
            "Décrire paranoïa : 杯弓蛇影",
            "Connaître leurs origines classiques"
          ],
          objectivesEn: [
            "Flag contradiction: 自相矛盾",
            "Criticize overzeal: 画蛇添足",
            "Describe paranoia: 杯弓蛇影",
            "Know their classical origins"
          ]
        },
        flashcards: ["自相矛盾", "画蛇添足", "杯弓蛇影"],
        quizQuestions: 8
      },
      {
        id: "cecr-c11-chengyu-basic-m4",
        title: "Chengyu sur la volonté : 坚持不懈, 勇往直前, 一心一意",
        titleEn: "Willpower chengyu: 坚持不懈, 勇往直前, 一心一意",
        duration: 12, locked: false, completed: false,
        hskLevel: 6, hskLevels: [5, 6], category: "vocabulary", difficulty: "superior",
        tags: ["chengyu", "perseverance", "cecr:c11"],
        introduction: {
          title: "La détermination en 4 caractères",
          titleEn: "Determination in 4 characters",
          content: "坚持不懈 (jiānchí bù xiè, « persévérer sans relâche ») — formule de clôture dans les discours motivants. 勇往直前 (yǒng wǎng zhí qián, « avancer courageusement [droit devant] ») — souvent utilisé pour encourager. 一心一意 (yì xīn yí yì, « un cœur, une intention » = se dévouer totalement). 全神贯注 (quán shén guàn zhù, « toute l'âme et la concentration » = totale concentration). 废寝忘食 (fèi qǐn wàng shí, « oublier le sommeil et la nourriture » = se dévouer sans compter). Ces chengyu sont adorés dans les discours officiels, les médias éducatifs, et les lettres de motivation — les utiliser signale une élégance lettrée.",
          contentEn: "坚持不懈 («persevere without slacking») — closing formula in motivational speeches. 勇往直前 («advance courageously [straight ahead]») — often used to encourage. 一心一意 («one heart, one intention» = devote oneself fully). 全神贯注 («full spirit and focus» = total concentration). 废寝忘食 («forget sleep and food» = devote oneself unsparingly). These chengyu are beloved in official speeches, educational media, and motivation letters — using them signals literary elegance.",
          objectives: [
            "Encourager avec 坚持不懈/勇往直前",
            "Exprimer dévouement : 一心一意/全神贯注",
            "Décrire engagement : 废寝忘食",
            "Appliquer en contexte motivant"
          ],
          objectivesEn: [
            "Encourage with 坚持不懈/勇往直前",
            "Express dedication: 一心一意/全神贯注",
            "Describe commitment: 废寝忘食",
            "Apply in motivational contexts"
          ]
        },
        flashcards: ["坚持不懈", "勇往直前", "一心一意", "全神贯注", "废寝忘食"],
        quizQuestions: 8
      }
    ]
  },
  {
    id: "cecr-c11-media-discourse",
    name: "Discours médiatique et journalistique",
    nameEn: "Media and journalistic discourse",
    description: "Lire la presse, comprendre un JT.",
    descriptionEn: "Read the press, understand a news broadcast.",
    color: "#1E40AF",
    icon: "📰",
    lessons: [
      {
        id: "cecr-c11-media-discourse-m1",
        title: "Structure d'un article de presse chinoise",
        titleEn: "Structure of a Chinese press article",
        duration: 12, locked: false, completed: false,
        hskLevel: 6, hskLevels: [5, 6], category: "reading", difficulty: "superior",
        tags: ["news", "press", "cecr:c11"],
        introduction: {
          title: "Anatomie d'un 新闻 chinois",
          titleEn: "Anatomy of a Chinese 新闻",
          content: "Une dépêche chinoise (新闻, xīnwén) suit l'ordre : 标题 (biāotí, titre) → 导语 (dǎoyǔ, chapeau, condense les faits essentiels 5W+H) → 主体 (zhǔtǐ, corps, détails chronologiques ou thématiques) → 结尾 (jiéwěi, conclusion). Presse officielle : 人民日报 (Rénmín Rìbào, Quotidien du Peuple, organe du Parti), 新华社 (Xīnhuá Shè, Agence Xinhua), 中央电视台 / 央视 (CCTV, TV nationale), 新闻联播 (Xīnwén Liánbò, JT de 19h tous les soirs, TRÈS codifié). Presse plus libre (dans les limites) : 南方周末 (Nánfāng Zhōumò, Southern Weekly, investigation), 财新 (Cáixīn, économie). Conventions : noms complets introduits puis abrégés ; titres de fonctions toujours avant le nom ; dates en format AAAA年MM月DD日.",
          contentEn: "A Chinese news dispatch (新闻) follows the order: 标题 (title) → 导语 (lede, condensing essential 5W+H facts) → 主体 (body, chronological or thematic details) → 结尾 (closing). Official press: 人民日报 (People's Daily, Party organ), 新华社 (Xinhua Agency), 中央电视台 / 央视 (CCTV, national TV), 新闻联播 (the 7pm news, HIGHLY codified). Freer press (within limits): 南方周末 (Southern Weekly, investigative), 财新 (Caixin, economy). Conventions: full names introduced then abbreviated; titles always before the name; dates in YYYY年MM月DD日 format.",
          objectives: [
            "Repérer 标题/导语/主体/结尾",
            "Connaître 人民日报/新华社/央视",
            "Comprendre 新闻联播 et ses codes",
            "Respecter le format date AAAA年MM月DD日"
          ],
          objectivesEn: [
            "Spot 标题/导语/主体/结尾",
            "Know 人民日报/新华社/央视",
            "Understand 新闻联播 and its codes",
            "Respect YYYY年MM月DD日 date format"
          ]
        },
        flashcards: ["新闻", "标题", "导语", "人民日报", "新华社", "央视", "新闻联播"],
        quizQuestions: 8
      },
      {
        id: "cecr-c11-media-discourse-m2",
        title: "Lexique politique : 改革/开放/发展",
        titleEn: "Political lexicon: 改革/开放/发展",
        duration: 12, locked: false, completed: false,
        hskLevel: 6, hskLevels: [5, 6], category: "reading", difficulty: "superior",
        tags: ["politics", "policy", "cecr:c11"],
        introduction: {
          title: "Le triptyque fondateur du discours officiel",
          titleEn: "The founding triptych of official discourse",
          content: "Trois mots reviennent dans TOUTES les déclarations officielles depuis 1978 : 改革 (gǎigé, réforme), 开放 (kāifàng, ouverture), 发展 (fāzhǎn, développement). 改革开放 (Gǎigé Kāifàng, « Réforme et Ouverture ») : politique lancée par Deng Xiaoping fin 1978, fondement de la Chine moderne. Autres termes saturés : 和谐 (héxié, harmonie — mot-clé sous Hu Jintao), 中国梦 (Zhōngguó Mèng, Rêve chinois — slogan de Xi Jinping depuis 2012), 一带一路 (Yídài Yílù, « Nouvelles Routes de la Soie »), 共同富裕 (Gòngtóng Fùyù, prospérité commune). Sigles politiques : 中央 = gouvernement central, 党 (dǎng) = le Parti, souvent avec 的 : 党的领导 (« la direction du Parti »). Ce lexique sature tout discours formel et médiatique.",
          contentEn: "Three words recur in ALL official statements since 1978: 改革 (reform), 开放 (opening), 发展 (development). 改革开放 («Reform and Opening»): policy launched by Deng Xiaoping in late 1978, foundation of modern China. Other saturated terms: 和谐 (harmony — key word under Hu Jintao), 中国梦 (Chinese Dream — Xi Jinping's slogan since 2012), 一带一路 («Belt and Road Initiative»), 共同富裕 (common prosperity). Political acronyms: 中央 = central government, 党 = the Party, often with 的: 党的领导 («Party leadership»). This lexicon saturates all formal and media discourse.",
          objectives: [
            "Décoder 改革/开放/发展",
            "Connaître 改革开放 (1978)",
            "Identifier 中国梦/一带一路/共同富裕",
            "Repérer 党的领导"
          ],
          objectivesEn: [
            "Decode 改革/开放/发展",
            "Know 改革开放 (1978)",
            "Identify 中国梦/一带一路/共同富裕",
            "Spot 党的领导"
          ]
        },
        flashcards: ["改革", "开放", "发展", "改革开放", "中国梦", "一带一路", "共同富裕", "党"],
        quizQuestions: 8
      },
      {
        id: "cecr-c11-media-discourse-m3",
        title: "Relations internationales",
        titleEn: "International relations",
        duration: 12, locked: false, completed: false,
        hskLevel: 6, hskLevels: [5, 6], category: "reading", difficulty: "superior",
        tags: ["international", "diplomacy", "cecr:c11"],
        introduction: {
          title: "Le vocabulaire diplomatique chinois",
          titleEn: "Chinese diplomatic vocabulary",
          content: "Noms de pays : 美国 (Měiguó, USA), 俄罗斯 (Éluósī, Russie), 欧盟 (Ōuméng, UE), 日本 (Rìběn, Japon), 韩国 (Hánguó, Corée du Sud), 法国 (Fǎguó, France). Relations : 外交 (wàijiāo, diplomatie), 合作 (hézuò, coopération), 冲突 (chōngtū, conflit), 谈判 (tánpàn, négociation), 制裁 (zhìcái, sanctions). Sujets clés : 台湾 (Táiwān, question très sensible — CCTV dit toujours 台湾问题 « la question de Taïwan »), 香港 (Xiānggǎng), 南海 (Nánhǎi, Mer de Chine méridionale), 一个中国原则 (yígè Zhōngguó yuánzé, « principe d'une seule Chine »). Discours : 中方 (Zhōngfāng, « partie chinoise ») vs 美方 (Měifāng, « partie US »), 双边 (shuāngbiān, bilatéral), 多边 (duōbiān, multilatéral).",
          contentEn: "Country names: 美国 (USA), 俄罗斯 (Russia), 欧盟 (EU), 日本 (Japan), 韩国 (South Korea), 法国 (France). Relations: 外交 (diplomacy), 合作 (cooperation), 冲突 (conflict), 谈判 (negotiation), 制裁 (sanctions). Key topics: 台湾 (very sensitive — CCTV always says 台湾问题 «the Taiwan question»), 香港 (Hong Kong), 南海 (South China Sea), 一个中国原则 («One China principle»). Discourse: 中方 («Chinese side») vs 美方 («US side»), 双边 (bilateral), 多边 (multilateral).",
          objectives: [
            "Nommer 美/俄/欧/日/韩/法",
            "Utiliser 外交/合作/谈判/制裁",
            "Maîtriser 中方 / X方",
            "Comprendre 一个中国原则"
          ],
          objectivesEn: [
            "Name USA/Russia/EU/Japan/Korea/France",
            "Use 外交/合作/谈判/制裁",
            "Master 中方 / X-side",
            "Understand One China principle"
          ]
        },
        flashcards: ["美国", "外交", "合作", "冲突", "谈判", "制裁", "台湾", "中方", "双边"],
        quizQuestions: 8
      },
      {
        id: "cecr-c11-media-discourse-m4",
        title: "Lire un éditorial — registre 书面语",
        titleEn: "Reading an editorial — 书面语 register",
        duration: 12, locked: false, completed: false,
        hskLevel: 6, hskLevels: [6], category: "reading", difficulty: "superior",
        tags: ["editorial", "formal", "cecr:c11"],
        introduction: {
          title: "书面语 vs 口语 — deux chinois qui coexistent",
          titleEn: "书面语 vs 口语 — two coexisting Chinese registers",
          content: "Un éditorial chinois bascule dans le 书面语 (shūmiànyǔ, langue écrite/soutenue), riche en mots à un caractère hérités du classique et en structures elliptiques. Exemples : 之 (zhī) = 的, 于 (yú) = 在/在…上, 为 (wéi) = 是, 而 (ér) = relation logique, 则 (zé) = 就. Conjonctions soutenues : 因此 (yīncǐ, donc), 然而 (rán'ér, toutefois), 纵使 (zòngshǐ, même si), 倘若 (tǎngruò, si jamais). Structures : 以 X 为 Y (« considérer X comme Y »), 以…为主 (« avec…comme principal »). Le 4-syllabe domine la prosodie : chaque phrase tend à se découper en groupes de 4 caractères. Pour lire vite : repérer les conjonctions qui structurent l'argumentation, ne pas traduire mot à mot.",
          contentEn: "A Chinese editorial switches to 书面语 (formal/written language), rich in single-character words inherited from classical and elliptical structures. Examples: 之 = 的, 于 = 在/在…上, 为 = 是, 而 = logical link, 则 = 就. Formal conjunctions: 因此 (therefore), 然而 (yet), 纵使 (even if), 倘若 (should). Structures: 以 X 为 Y («consider X as Y»), 以…为主 («with…as main»). The 4-syllable dominates prosody: each sentence tends to break into 4-character groups. To read fast: spot conjunctions structuring argument, don't translate word-by-word.",
          objectives: [
            "Identifier 之/于/为/而/则",
            "Utiliser 因此/然而/纵使/倘若",
            "Décomposer 以 X 为 Y",
            "Repérer les groupes de 4 caractères"
          ],
          objectivesEn: [
            "Identify 之/于/为/而/则",
            "Use 因此/然而/纵使/倘若",
            "Parse 以 X 为 Y",
            "Spot 4-character groupings"
          ]
        },
        flashcards: ["之", "于", "为", "而", "则", "因此", "然而", "纵使", "倘若"],
        quizQuestions: 8
      }
    ]
  },
  {
    id: "cecr-c11-history",
    name: "Histoire et civilisations",
    nameEn: "History and civilizations",
    description: "Dynasties clés, figures majeures, grands événements.",
    descriptionEn: "Key dynasties, major figures, great events.",
    color: "#7F1D1D",
    icon: "📜",
    lessons: [
      {
        id: "cecr-c11-history-m1",
        title: "Les dynasties : 秦汉唐宋元明清",
        titleEn: "The dynasties: 秦汉唐宋元明清",
        duration: 12, locked: false, completed: false,
        hskLevel: 6, hskLevels: [5, 6], category: "culture", difficulty: "superior",
        tags: ["history", "dynasties", "cecr:c11"],
        introduction: {
          title: "La timeline impériale en 7 syllabes",
          titleEn: "The imperial timeline in 7 syllables",
          content: "Les écoliers chinois mémorisent la séquence : 秦 (Qín, -221→-206, unification des royaumes combattants par 秦始皇 Qínshǐhuáng, premier empereur), 汉 (Hàn, -206→220, dynastie qui donne son nom à l'ethnie 汉族 et à la langue 汉语), 唐 (Táng, 618-907, âge d'or culturel, poésie de 李白 Lǐ Bái et 杜甫 Dù Fǔ), 宋 (Sòng, 960-1279, innovations : poudre à canon, boussole, imprimerie), 元 (Yuán, 1271-1368, mongols, 忽必烈 Kūbìliè = Kubilai Khan), 明 (Míng, 1368-1644, Cité interdite construite, 郑和 Zhèng Hé explore l'océan), 清 (Qīng, 1644-1912, mandchous, fin avec révolution 辛亥革命 1911). Ensuite 中华民国 1912-1949, 中华人民共和国 1949→.",
          contentEn: "Chinese schoolchildren memorize the sequence: 秦 (Qin, 221-206 BCE, unification of the Warring States by 秦始皇 First Emperor), 汉 (Han, 206 BCE-220 CE, dynasty that gives its name to the 汉族 ethnicity and the language 汉语), 唐 (Tang, 618-907, cultural golden age, poetry of 李白 and 杜甫), 宋 (Song, 960-1279, innovations: gunpowder, compass, printing), 元 (Yuan, 1271-1368, Mongols, 忽必烈 = Kublai Khan), 明 (Ming, 1368-1644, Forbidden City built, 郑和 explores the ocean), 清 (Qing, 1644-1912, Manchus, ending with Xinhai Revolution 辛亥革命 1911). Then Republic of China 中华民国 1912-1949, People's Republic 中华人民共和国 1949-.",
          objectives: [
            "Mémoriser 秦汉唐宋元明清",
            "Associer à 秦始皇/李白/郑和",
            "Connaître dates charnières (1911, 1949)",
            "Distinguer 汉族 vs 中华民族"
          ],
          objectivesEn: [
            "Memorize 秦汉唐宋元明清",
            "Link to 秦始皇/李白/郑和",
            "Know pivot dates (1911, 1949)",
            "Distinguish 汉族 vs 中华民族"
          ]
        },
        flashcards: ["秦", "汉", "唐", "宋", "元", "明", "清", "秦始皇", "辛亥革命"],
        quizQuestions: 8
      },
      {
        id: "cecr-c11-history-m2",
        title: "La Chine au XXe siècle : 1911, 1949, 1978",
        titleEn: "China in the 20th century: 1911, 1949, 1978",
        duration: 12, locked: false, completed: false,
        hskLevel: 6, hskLevels: [6], category: "culture", difficulty: "superior",
        tags: ["history", "20th-century", "cecr:c11"],
        introduction: {
          title: "Trois dates pour comprendre la Chine moderne",
          titleEn: "Three dates to understand modern China",
          content: "1911 — 辛亥革命 (Xīnhài Gémìng) renverse la dynastie Qing. 孙中山 (Sūn Zhōngshān, Sun Yat-sen) fonde la 中华民国 (République de Chine). 1949 — 中华人民共和国 (République populaire) fondée par 毛泽东 (Máo Zédōng) après la guerre civile contre le 国民党 (Guómíndǎng, Kuomintang) de 蒋介石 (Jiǎng Jièshí, Tchang Kaï-chek), qui se replie à Taïwan. Période 1949-1976 : 大跃进 (Dà Yuèjìn, Grand Bond en avant, 1958-1961, catastrophe), 文化大革命 / 文革 (Wénhuà Dà Gémìng / Wéngé, Révolution culturelle, 1966-1976). 1978 — 邓小平 (Dèng Xiǎopíng) lance 改革开放, qui propulse la Chine vers la 2e économie mondiale.",
          contentEn: "1911 — 辛亥革命 (Xinhai Revolution) overthrows the Qing dynasty. 孙中山 (Sun Yat-sen) founds the 中华民国 (Republic of China). 1949 — 中华人民共和国 (People's Republic) founded by 毛泽东 (Mao Zedong) after civil war against 国民党 (Kuomintang) of 蒋介石 (Chiang Kai-shek), who retreats to Taiwan. 1949-1976: 大跃进 (Great Leap Forward, 1958-1961, catastrophe), 文化大革命 / 文革 (Cultural Revolution, 1966-1976). 1978 — 邓小平 (Deng Xiaoping) launches 改革开放, propelling China to the world's 2nd economy.",
          objectives: [
            "Fixer 1911/1949/1978",
            "Connaître 孙中山/毛泽东/邓小平",
            "Situer 大跃进 et 文革",
            "Expliquer 国共 et Taïwan"
          ],
          objectivesEn: [
            "Pin 1911/1949/1978",
            "Know 孙中山/毛泽东/邓小平",
            "Place 大跃进 and 文革",
            "Explain 国共 and Taiwan"
          ]
        },
        flashcards: ["辛亥革命", "孙中山", "毛泽东", "邓小平", "大跃进", "文革", "国民党"],
        quizQuestions: 8
      },
      {
        id: "cecr-c11-history-m3",
        title: "Les 4 grands romans classiques",
        titleEn: "The 4 great classical novels",
        duration: 12, locked: false, completed: false,
        hskLevel: 6, hskLevels: [6], category: "culture", difficulty: "superior",
        tags: ["literature", "classics", "cecr:c11"],
        introduction: {
          title: "四大名著 : le canon littéraire chinois",
          titleEn: "四大名著: the Chinese literary canon",
          content: "四大名著 (sì dà míngzhù, « les 4 grands classiques ») sont les 4 piliers de la littérature chinoise : (1) 《三国演义》(Sānguó Yǎnyì, « Les Trois Royaumes »), roman historique de Luo Guanzhong (XIVe) sur 220-280 — figures mythiques 关羽 Guān Yǔ (dieu de la guerre), 诸葛亮 Zhūgě Liàng (stratège). (2) 《水浒传》(Shuǐhǔ Zhuàn, « Au bord de l'eau »), 108 bandits héroïques. (3) 《西游记》(Xīyóujì, « La Pérégrination vers l'Ouest »), le singe 孙悟空 (Sūn Wùkōng) et le moine 唐僧 (Táng Sēng) partent chercher les sutras en Inde. (4) 《红楼梦》(Hónglóumèng, « Le Rêve dans le pavillon rouge ») de Cao Xueqin (XVIIIe), sommet absolu — étude d'une grande famille Qing en déclin.",
          contentEn: "四大名著 («the 4 great classics») are the 4 pillars of Chinese literature: (1) 《三国演义》(«Romance of the Three Kingdoms»), historical novel by Luo Guanzhong (14th c.) about 220-280 — mythical figures 关羽 (war god), 诸葛亮 (strategist). (2) 《水浒传》(«Water Margin»), 108 heroic bandits. (3) 《西游记》(«Journey to the West»), the Monkey King 孙悟空 and monk 唐僧 seek sutras in India. (4) 《红楼梦》(«Dream of the Red Chamber») by Cao Xueqin (18th c.), absolute peak — study of a declining great Qing family.",
          objectives: [
            "Citer les 4 名著 avec époque",
            "Identifier 孙悟空/关羽/诸葛亮",
            "Connaître 《红楼梦》 comme sommet",
            "Utiliser le titre en citation"
          ],
          objectivesEn: [
            "Cite the 4 名著 with era",
            "Identify 孙悟空/关羽/诸葛亮",
            "Know 《红楼梦》 as peak",
            "Use titles in citation form"
          ]
        },
        flashcards: ["四大名著", "三国演义", "水浒传", "西游记", "红楼梦", "孙悟空", "诸葛亮"],
        quizQuestions: 8
      },
      {
        id: "cecr-c11-history-m4",
        title: "La Route de la Soie, passée et présente",
        titleEn: "The Silk Road, past and present",
        duration: 12, locked: false, completed: false,
        hskLevel: 5, hskLevels: [5, 6], category: "culture", difficulty: "superior",
        tags: ["silkroad", "history", "cecr:c11"],
        introduction: {
          title: "丝绸之路 : de 张骞 à 一带一路",
          titleEn: "丝绸之路: from 张骞 to Belt and Road",
          content: "丝绸之路 (Sīchóu zhī Lù, Route de la Soie) : réseau de routes caravanières ouvert par l'explorateur Han 张骞 (Zhāng Qiān, ambassadeur vers l'ouest en -138). Transportait soie, thé, porcelaine vers la Méditerranée ; ramenait chevaux, verre, religions (bouddhisme en premier). Villes-étapes : 长安 (Cháng'ān, aujourd'hui Xi'an, terminus est), 敦煌 (Dūnhuáng, oasis célèbre pour ses grottes bouddhistes 莫高窟 Mògāokū), 喀什 (Kāshí, Kashgar). Route maritime parallèle (XVe) : 郑和 (Zhèng Hé) fait 7 voyages jusqu'à l'Afrique. Aujourd'hui : 一带一路 (Yídài Yílù) = « Nouvelles Routes de la Soie », projet géoéconomique de Xi Jinping depuis 2013, corridor terrestre + maritime.",
          contentEn: "丝绸之路 (Silk Road): network of caravan routes opened by Han explorer 张骞 (Zhang Qian, westward envoy in 138 BCE). Transported silk, tea, porcelain to the Mediterranean; brought back horses, glass, religions (Buddhism first). Way stations: 长安 (Chang'an, today Xi'an, eastern terminus), 敦煌 (Dunhuang, oasis famous for Buddhist caves 莫高窟), 喀什 (Kashgar). Parallel maritime route (15th c.): 郑和 (Zheng He) made 7 voyages to Africa. Today: 一带一路 = «Belt and Road Initiative», Xi Jinping's geoeconomic project since 2013, land + maritime corridor.",
          objectives: [
            "Suivre la 丝绸之路 historique",
            "Connaître 张骞/郑和",
            "Situer 长安/敦煌/喀什",
            "Relier au 一带一路 moderne"
          ],
          objectivesEn: [
            "Trace the historic 丝绸之路",
            "Know 张骞/郑和",
            "Place 长安/敦煌/喀什",
            "Link to modern 一带一路"
          ]
        },
        flashcards: ["丝绸之路", "张骞", "长安", "敦煌", "喀什", "郑和", "一带一路"],
        quizQuestions: 8
      }
    ]
  },
  {
    id: "cecr-c11-style-formal",
    name: "Style formel et écrits professionnels",
    nameEn: "Formal style and professional writing",
    description: "Lettres, discours, CV, email professionnel.",
    descriptionEn: "Letters, speeches, CVs, professional email.",
    color: "#52525B",
    icon: "📝",
    lessons: [
      {
        id: "cecr-c11-style-formal-m1",
        title: "Email et lettre professionnelle",
        titleEn: "Professional email and letter",
        duration: 12, locked: false, completed: false,
        hskLevel: 5, hskLevels: [5, 6], category: "writing", difficulty: "superior",
        tags: ["email", "formal", "cecr:c11"],
        introduction: {
          title: "Les codes du courrier formel chinois",
          titleEn: "Formal Chinese correspondence codes",
          content: "Ouverture : 尊敬的 X 先生/女士 (« Honoré Monsieur/Madame X »), 您好! (pluriel formel). Corps en 书面语 : 致函原因 (zhìhán yuányīn, « objet »), 谨 (jǐn, « respectueusement ») + verbe : 谨此通知 (« nous avons l'honneur d'informer »), 感谢 + 您 + verbe. Clôture : 此致 / 敬礼 (cǐzhì / jìnglǐ, formule de respect finale, très rituelle, 此致 seule sur une ligne puis 敬礼 seule en-dessous). Signature : 您的 + nom, 敬上 (jìngshàng, « respectueusement soumis »). Email pro suit ces mêmes codes mais peut omettre 此致 / 敬礼. Ne JAMAIS commencer par 你好 dans un contexte formel — c'est trop familier.",
          contentEn: "Opening: 尊敬的 X 先生/女士 («Honored Mr./Ms. X»), 您好! (formal plural). Body in 书面语: 致函原因 («subject line»), 谨 («respectfully») + verb: 谨此通知 («we have the honor to inform»), 感谢 + 您 + verb. Closing: 此致 / 敬礼 (final respect formula, very ritual, 此致 alone on a line then 敬礼 alone below). Signature: 您的 + name, 敬上 («respectfully submitted»). Pro email follows these codes but may skip 此致 / 敬礼. NEVER start with 你好 in a formal context — too casual.",
          objectives: [
            "Ouvrir avec 尊敬的 + 您好",
            "Rédiger corps en 书面语",
            "Clôturer avec 此致敬礼",
            "Signer avec 敬上"
          ],
          objectivesEn: [
            "Open with 尊敬的 + 您好",
            "Body in 书面语",
            "Close with 此致敬礼",
            "Sign with 敬上"
          ]
        },
        flashcards: ["尊敬", "您", "谨", "此致", "敬礼", "敬上"],
        quizQuestions: 8
      },
      {
        id: "cecr-c11-style-formal-m2",
        title: "CV chinois (简历) et lettre de motivation",
        titleEn: "Chinese CV (简历) and cover letter",
        duration: 12, locked: false, completed: false,
        hskLevel: 5, hskLevels: [5, 6], category: "writing", difficulty: "superior",
        tags: ["cv", "professional", "cecr:c11"],
        introduction: {
          title: "简历 : la structure type",
          titleEn: "简历: the standard structure",
          content: "简历 (jiǎnlì, CV) chinois standard : 个人信息 (gèrén xìnxī, informations personnelles : nom, sexe, âge, lieu de naissance — oui, âge et photo sont normaux sur un CV chinois), 教育背景 (jiàoyù bèijǐng, formation), 工作经验 (gōngzuò jīngyàn, expérience), 技能 (jìnéng, compétences), 语言能力 (yǔyán nénglì, langues), 奖项 (jiǎngxiàng, distinctions), 自我评价 (zìwǒ píngjià, auto-évaluation — partie type très « standardisée »). Lettre de motivation 求职信 (qiúzhíxìn) : mentionne où on a vu l'annonce, pourquoi on postule, atouts, disponibilité. Clôture systématique : 期待您的回复 (« dans l'attente de votre réponse »). Envoi : 您的 + nom + 敬上.",
          contentEn: "Standard Chinese 简历 (CV): 个人信息 (personal info: name, gender, age, birthplace — yes, age and photo are normal on a Chinese CV), 教育背景 (education), 工作经验 (experience), 技能 (skills), 语言能力 (languages), 奖项 (awards), 自我评价 (self-evaluation — very «standardized» part). Cover letter 求职信: mentions where you saw the ad, why you apply, strengths, availability. Standard closing: 期待您的回复 («awaiting your reply»). Sign-off: 您的 + name + 敬上.",
          objectives: [
            "Structurer 简历 en 6 sections",
            "Rédiger 自我评价 sans lieu commun",
            "Écrire 求职信 clair",
            "Clôturer avec 期待您的回复"
          ],
          objectivesEn: [
            "Structure 简历 in 6 sections",
            "Write 自我评价 without clichés",
            "Write clear 求职信",
            "Close with 期待您的回复"
          ]
        },
        flashcards: ["简历", "个人信息", "教育背景", "工作经验", "技能", "求职信"],
        quizQuestions: 8
      },
      {
        id: "cecr-c11-style-formal-m3",
        title: "Rédiger un discours ou un toast (敬酒)",
        titleEn: "Writing a speech or toast (敬酒)",
        duration: 12, locked: false, completed: false,
        hskLevel: 6, hskLevels: [5, 6], category: "writing", difficulty: "superior",
        tags: ["speech", "toast", "cecr:c11"],
        introduction: {
          title: "敬酒 : l'art du toast chinois",
          titleEn: "敬酒: the art of the Chinese toast",
          content: "En Chine, un banquet 宴会 (yànhuì) est inséparable des 敬酒 (jìngjiǔ, toasts portés). Ordre : l'hôte lève le verre en premier, puis chacun à son tour, de l'aîné/le plus haut placé vers le plus jeune. Formules : 为 X 干杯 (« à X, cul sec »), 祝 X 健康 (« je souhaite santé à X »), 一帆风顺 (yì fān fēng shùn, « voile déployée, vent favorable » = bon vent à vos projets), 万事如意 (wàn shì rú yì, « que les 10 000 choses vous soient favorables »). Règles : quand on trinque avec un senior, tenir son verre PLUS BAS que le sien (signe de respect). 干杯 = cul sec ; 随意 (suíyì) = boire à sa guise. Un discours officiel reprend ces formules + 感谢 (gǎnxiè, merci) abondant + une citation ou chengyu pour finir.",
          contentEn: "In China, a banquet 宴会 is inseparable from 敬酒 (toasts). Order: host raises glass first, then each in turn, from the eldest/highest-ranking to the youngest. Formulas: 为 X 干杯 («to X, bottoms up»), 祝 X 健康 («wishing X health»), 一帆风顺 («sail full, wind fair» = smooth sailing to your projects), 万事如意 («may the 10,000 things go your way»). Rules: when clinking with a senior, hold your glass LOWER than theirs (sign of respect). 干杯 = bottoms up; 随意 = drink as you wish. An official speech uses these formulas + abundant 感谢 (thanks) + a quote or chengyu to close.",
          objectives: [
            "Connaître protocole des 敬酒",
            "Utiliser 干杯 vs 随意",
            "Intégrer 一帆风顺/万事如意",
            "Construire un discours 宴会"
          ],
          objectivesEn: [
            "Know toast protocol",
            "Use 干杯 vs 随意",
            "Integrate 一帆风顺/万事如意",
            "Build a banquet speech"
          ]
        },
        flashcards: ["宴会", "敬酒", "干杯", "随意", "一帆风顺", "万事如意"],
        quizQuestions: 8
      }
    ]
  }
  ,
  // ============================================================
  // C1.2 — Autonome 2/2 — Chengyu avancés + Business culture + Éducation + Droit
  // ============================================================
  {
    id: "cecr-c12-chengyu-advanced",
    name: "成语 avancés et allusions classiques",
    nameEn: "Advanced chengyu and classical allusions",
    description: "Chengyu historiques, usages rhétoriques.",
    descriptionEn: "Historical chengyu, rhetorical uses.",
    color: "#831843",
    icon: "📚",
    lessons: [
      {
        id: "cecr-c12-chengyu-advanced-m1",
        title: "Chengyu issus des Trois Royaumes",
        titleEn: "Chengyu from the Three Kingdoms",
        duration: 12, locked: false, completed: false,
        hskLevel: 6, hskLevels: [6], category: "vocabulary", difficulty: "superior",
        tags: ["chengyu", "three-kingdoms", "cecr:c12"],
        introduction: {
          title: "三国 : matrice des chengyu stratégiques",
          titleEn: "三国: matrix of strategic chengyu",
          content: "Les Trois Royaumes (220-280) ont nourri des dizaines de chengyu : 三顾茅庐 (sān gù máolú, « 3 visites à la chaumière » = solliciter un talent avec persévérance — Liu Bei qui vient 3 fois recruter Zhuge Liang). 桃园结义 (táo yuán jié yì, « serment du verger de pêchers » = pacte fraternel) — Liu Bei, Guan Yu, Zhang Fei. 望梅止渴 (wàng méi zhǐ kě, « voir les prunes et apaiser sa soif » = se consoler avec un espoir illusoire) — ruse de Cao Cao faisant marcher ses troupes assoiffées. 草船借箭 (cǎo chuán jiè jiàn, « emprunter des flèches avec des bateaux de paille ») — Zhuge Liang. Utiliser ces chengyu au travail impressionne : 我们需要三顾茅庐的精神 (« il nous faut l'esprit des 3 visites »).",
          contentEn: "The Three Kingdoms (220-280) nourished dozens of chengyu: 三顾茅庐 («3 visits to the thatched cottage» = pursue a talent with perseverance — Liu Bei coming 3 times to recruit Zhuge Liang). 桃园结义 («oath in the peach garden» = fraternal pact) — Liu Bei, Guan Yu, Zhang Fei. 望梅止渴 («see plums and quench thirst» = console oneself with an illusory hope) — Cao Cao's ruse to march thirsty troops. 草船借箭 («borrow arrows with straw boats») — Zhuge Liang. Using these at work impresses: 我们需要三顾茅庐的精神 («we need the spirit of 3 visits»).",
          objectives: [
            "Connaître 三顾茅庐/桃园结义",
            "Utiliser 望梅止渴 métaphoriquement",
            "Citer 草船借箭",
            "Rattacher à Liu Bei/Zhuge Liang"
          ],
          objectivesEn: [
            "Know 三顾茅庐/桃园结义",
            "Use 望梅止渴 metaphorically",
            "Cite 草船借箭",
            "Link to Liu Bei/Zhuge Liang"
          ]
        },
        flashcards: ["三顾茅庐", "桃园结义", "望梅止渴", "草船借箭"],
        quizQuestions: 8
      },
      {
        id: "cecr-c12-chengyu-advanced-m2",
        title: "Chengyu sur l'apprentissage",
        titleEn: "Chengyu on learning",
        duration: 12, locked: false, completed: false,
        hskLevel: 6, hskLevels: [6], category: "vocabulary", difficulty: "superior",
        tags: ["chengyu", "learning", "cecr:c12"],
        introduction: {
          title: "Étudier comme les anciens",
          titleEn: "Study like the ancients",
          content: "La Chine vénère le savoir : 悬梁刺股 (xuán liáng cì gǔ, « pendre sa tresse à la poutre, se piquer la cuisse ») — deux anecdotes d'étudiants qui se maintenaient éveillés (Sun Jing attachait ses cheveux, Su Qin se piquait). 凿壁偷光 (záo bì tōu guāng, « percer le mur pour voler la lumière ») — Kuang Heng, pauvre, faisait un trou dans le mur du voisin pour lire. 韦编三绝 (wéi biān sān jué, « les sangles [du livre en bambou] rompues 3 fois ») — Confucius aurait lu le Yijing si souvent que les lanières de cuir s'usèrent 3 fois. 学而不厌 (xué ér bú yàn, « étudier sans se lasser ») — citation de Confucius dans 《论语》. Ces chengyu sont omniprésents dans les discours motivants et sur les murs d'école.",
          contentEn: "China venerates knowledge: 悬梁刺股 («hang braid from beam, prick own thigh») — two anecdotes of students staying awake (Sun Jing tied his hair, Su Qin pricked himself). 凿壁偷光 («drill the wall to steal light») — Kuang Heng, poor, made a hole in the neighbor's wall to read. 韦编三绝 («the [bamboo book] straps broken 3 times») — Confucius reportedly read the Yijing so often that leather straps wore out 3 times. 学而不厌 («study without weariness») — Confucius quote in 《论语》. These chengyu are omnipresent in motivational speeches and school walls.",
          objectives: [
            "Citer 悬梁刺股/凿壁偷光",
            "Connaître 韦编三绝 / Confucius",
            "Utiliser 学而不厌",
            "Relier aux 论语"
          ],
          objectivesEn: [
            "Cite 悬梁刺股/凿壁偷光",
            "Know 韦编三绝 / Confucius",
            "Use 学而不厌",
            "Link to 论语"
          ]
        },
        flashcards: ["悬梁刺股", "凿壁偷光", "韦编三绝", "学而不厌", "论语"],
        quizQuestions: 8
      },
      {
        id: "cecr-c12-chengyu-advanced-m3",
        title: "歇后语 : les formules à chute",
        titleEn: "歇后语: two-part allegorical sayings",
        duration: 12, locked: false, completed: false,
        hskLevel: 6, hskLevels: [6], category: "vocabulary", difficulty: "superior",
        tags: ["xiehouyu", "idioms", "cecr:c12"],
        introduction: {
          title: "歇后语 : l'humour classique de la langue populaire",
          titleEn: "歇后语: classical humor of the popular language",
          content: "Un 歇后语 (xiēhòuyǔ) est un dicton en deux parties : une métaphore énigmatique suivie de son explication, souvent omise car sous-entendue. Ex. : 外甥打灯笼 — 照舅(旧) (« le neveu porte la lanterne — éclaire son oncle (comme d'habitude) ») : jeu sur 舅 (oncle) et 旧 (ancien), même prononciation jiù, signifie « comme avant ». 黄鼠狼给鸡拜年 — 没安好心 (« la belette souhaite bonne année au poulet — pas avec de bonnes intentions »). 八仙过海 — 各显神通 (« les 8 immortels traversent la mer — chacun déploie ses talents »). Les Chinois en connaissent des centaines. Les utiliser à propos signale une très bonne maîtrise. N'utiliser QUE la première partie est fréquent : l'auditeur comprend la chute implicite.",
          contentEn: "A 歇后语 is a two-part saying: an enigmatic metaphor followed by its explanation, often omitted as implied. Ex.: 外甥打灯笼 — 照舅(旧) («nephew carries lantern — lights up his uncle (as always)»): pun on 舅 (uncle) and 旧 (old), same pronunciation jiù, means «as before». 黄鼠狼给鸡拜年 — 没安好心 («weasel wishes chicken happy new year — not with good intentions»). 八仙过海 — 各显神通 («Eight Immortals cross the sea — each displays their power»). Chinese people know hundreds. Using them aptly signals very strong mastery. Using ONLY the first part is common: the listener infers the punchline.",
          objectives: [
            "Définir 歇后语 (2 parties)",
            "Utiliser 外甥打灯笼",
            "Citer 黄鼠狼给鸡拜年",
            "Omettre la chute à l'oral"
          ],
          objectivesEn: [
            "Define 歇后语 (2 parts)",
            "Use 外甥打灯笼",
            "Cite 黄鼠狼给鸡拜年",
            "Omit the punchline orally"
          ]
        },
        flashcards: ["歇后语", "外甥", "灯笼", "八仙过海", "黄鼠狼"],
        quizQuestions: 8
      }
    ]
  },
  {
    id: "cecr-c12-business",
    name: "Culture d'affaires et négociation",
    nameEn: "Business culture and negotiation",
    description: "关系, 面子, 酒桌文化, contrats.",
    descriptionEn: "关系, 面子, 酒桌文化, contracts.",
    color: "#1E3A8A",
    icon: "💼",
    lessons: [
      {
        id: "cecr-c12-business-m1",
        title: "关系 et 面子 — les deux piliers invisibles",
        titleEn: "关系 and 面子 — the two invisible pillars",
        duration: 12, locked: false, completed: false,
        hskLevel: 5, hskLevels: [5, 6], category: "culture", difficulty: "superior",
        tags: ["business", "guanxi", "cecr:c12"],
        introduction: {
          title: "关系 : le réseau invisible qui fait tout marcher",
          titleEn: "关系: the invisible network that makes everything work",
          content: "关系 (guānxi) littéralement « connexion », en pratique : réseau d'obligations mutuelles basé sur famille, amis d'école 同学 (tóngxué), compatriotes 老乡 (lǎoxiāng), ou intermédiaires. 有关系 = on peut faire avancer les choses ; 没关系 au sens propre (pas au sens « de rien ») = système fermé. Se construit par : 吃饭 (repas), 送礼 (sòng lǐ, offrir cadeau), 喝酒 (boire ensemble), réciprocité sur la durée. 面子 (miànzi, litt. « visage ») = honneur social, ce que les autres voient de vous. 给面子 = donner face ; 丢面子 = perdre face ; 留面子 = préserver la face de l'autre. Règle d'or : ne JAMAIS corriger ou refuser frontalement en public — fait perdre la face à votre interlocuteur.",
          contentEn: "关系 (guanxi) literally «connection», practically: network of mutual obligations based on family, classmates 同学, compatriots 老乡, or intermediaries. 有关系 = you can get things done; literally 没关系 (not the «you're welcome» sense) = closed system. Built via: 吃饭 (meals), 送礼 (gift-giving), 喝酒 (drinking together), long-term reciprocity. 面子 (mianzi, lit. «face») = social honor, what others see of you. 给面子 = give face; 丢面子 = lose face; 留面子 = preserve the other's face. Golden rule: NEVER correct or refuse frontally in public — makes your counterpart lose face.",
          objectives: [
            "Expliquer 关系 et ses leviers",
            "Distinguer 给/丢/留 + 面子",
            "Utiliser 同学/老乡 comme relais",
            "Éviter refus frontal en public"
          ],
          objectivesEn: [
            "Explain 关系 and its levers",
            "Distinguish 给/丢/留 + 面子",
            "Use 同学/老乡 as connectors",
            "Avoid frontal refusal in public"
          ]
        },
        flashcards: ["关系", "面子", "给面子", "丢面子", "同学", "老乡", "送礼"],
        quizQuestions: 8
      },
      {
        id: "cecr-c12-business-m2",
        title: "酒桌文化 — négocier à table",
        titleEn: "酒桌文化 — negotiating at the table",
        duration: 12, locked: false, completed: false,
        hskLevel: 6, hskLevels: [5, 6], category: "culture", difficulty: "superior",
        tags: ["business", "banquet", "cecr:c12"],
        introduction: {
          title: "酒桌文化 : les vraies négos n'ont pas lieu au bureau",
          titleEn: "酒桌文化: real negotiations don't happen at the office",
          content: "酒桌文化 (jiǔzhuō wénhuà, « culture de la table de banquet ») : en Chine, on ne conclut pas un gros deal lors d'une réunion — on le conclut autour d'un 白酒 (báijiǔ, alcool de sorgho à 50-55°) partagé. Séquence-type : hôte reçoit, commande plat par plat (le plus haut placé choisit), chacun porte des 敬酒 (toasts), le « traité » se négocie dans cette atmosphère. Signaux : accepter le toast = respect ; décliner = faire perdre la face. Règles : 干杯 (cul sec) est un vrai défi si proposé par le patron ; 意思意思 (yìsi yìsi, « petit geste ») pour signifier une acceptation. Alternative moderne : 商务茶 (shāngwù chá, thé d'affaires), plus sobre. Mot-clé contrat : 合同 (hétong).",
          contentEn: "酒桌文化 («banquet table culture»): in China, big deals aren't closed at meetings — they're closed over shared 白酒 (sorghum liquor at 50-55° ABV). Typical sequence: host receives, orders dish by dish (highest-ranking chooses), everyone raises 敬酒 (toasts), the «treaty» is negotiated in this atmosphere. Signals: accepting the toast = respect; declining = making lose face. Rules: 干杯 (bottoms up) is a real challenge if the boss proposes it; 意思意思 («a small gesture») to signal acceptance. Modern alternative: 商务茶 (business tea), more sober. Contract keyword: 合同.",
          objectives: [
            "Décrire 酒桌文化 complète",
            "Distinguer 干杯 vs 意思意思",
            "Utiliser 商务茶 comme alternative",
            "Signer un 合同"
          ],
          objectivesEn: [
            "Describe full 酒桌文化",
            "Distinguish 干杯 vs 意思意思",
            "Use 商务茶 alternative",
            "Sign a 合同"
          ]
        },
        flashcards: ["酒桌文化", "白酒", "干杯", "意思意思", "商务茶", "合同"],
        quizQuestions: 8
      },
      {
        id: "cecr-c12-business-m3",
        title: "Négocier : chiffre, remise, clause",
        titleEn: "Negotiating: figure, discount, clause",
        duration: 12, locked: false, completed: false,
        hskLevel: 5, hskLevels: [5, 6], category: "vocabulary", difficulty: "superior",
        tags: ["business", "negotiation", "cecr:c12"],
        introduction: {
          title: "Le vocabulaire de la négociation en 3 temps",
          titleEn: "Negotiation vocabulary in 3 phases",
          content: "Proposition : 我们的报价是 X (wǒmen de bàojià shì, notre cotation est), 最低价 (zuìdījià, prix plancher), 批发 (pīfā, gros) vs 零售 (língshòu, détail). Discussion : 能打折吗? (néng dǎzhé ma? peut-on avoir une remise?), 打八折 (dǎ bā zhé, -20% — attention : 八折 = 80% du prix, pas -80%!), 再便宜一点 (zài piányi yìdiǎn, un peu moins cher). Clauses : 付款方式 (fùkuǎn fāngshì, mode de paiement), 定金 (dìngjīn, acompte), 尾款 (wěikuǎn, solde), 交货期 (jiāohuòqī, délai de livraison). Signature : 签合同 (qiān hétong), 盖章 (gàizhāng, apposer le sceau — plus important que la signature en Chine). Post-signature : 履行合同 (respecter le contrat). Piège : 八折 = 80% non 20% — le chiffre indique ce qu'on paie.",
          contentEn: "Proposal: 我们的报价是 X (our quote is), 最低价 (floor price), 批发 (wholesale) vs 零售 (retail). Discussion: 能打折吗? (can we get a discount?), 打八折 (-20% — watch out: 八折 = 80% of price, not -80%!), 再便宜一点 (a bit cheaper). Clauses: 付款方式 (payment terms), 定金 (deposit), 尾款 (balance), 交货期 (delivery period). Signature: 签合同 (sign contract), 盖章 (affix seal — more important than signature in China). Post-signature: 履行合同 (honor the contract). Pitfall: 八折 = 80% not 20% — the number indicates what you pay.",
          objectives: [
            "Distinguer 报价 vs 最低价",
            "Calculer 打八折 correctement (= 80%)",
            "Négocier clauses 定金/尾款",
            "Comprendre 盖章 vs signature"
          ],
          objectivesEn: [
            "Distinguish 报价 vs 最低价",
            "Compute 打八折 correctly (= 80%)",
            "Negotiate 定金/尾款",
            "Understand 盖章 vs signature"
          ]
        },
        flashcards: ["报价", "打折", "八折", "付款", "定金", "尾款", "盖章"],
        quizQuestions: 8
      },
      {
        id: "cecr-c12-business-m4",
        title: "Présentation et pitch en chinois",
        titleEn: "Chinese presentation and pitch",
        duration: 12, locked: false, completed: false,
        hskLevel: 6, hskLevels: [5, 6], category: "conversation", difficulty: "superior",
        tags: ["business", "presentation", "cecr:c12"],
        introduction: {
          title: "La structure d'une prés. d'entreprise chinoise",
          titleEn: "Structure of a Chinese business presentation",
          content: "Ouverture : 各位领导，各位来宾 (« chers dirigeants, chers invités »), 大家好! (polyphonique). Présentation société : 成立于 X 年 (fondée en X), 总部在 (siège à), 主营业务 (zhǔyíng yèwù, activité principale), 市场份额 (shìchǎng fèn'é, part de marché). Produit : 核心竞争力 (héxīn jìngzhēnglì, avantage concurrentiel), 技术优势 (jìshù yōushì, atout technologique). Données : 年收入 (nián shōurù, CA annuel), 利润率 (lìrùnlǜ, marge), 增长率 (zēngzhǎnglǜ, taux de croissance). Partenariat : 合作共赢 (hézuò gòngyíng, « gagnant-gagnant »), 互利互惠 (hùlì hùhuì, bénéfice mutuel). Clôture : 期待与贵公司合作 (« en espérant coopérer avec votre honorable société ») + 感谢 + chengyu : 互相学习 ou 共创未来. 贵 + 公司/校/国 = marque de respect pour l'entité du partenaire.",
          contentEn: "Opening: 各位领导，各位来宾 («dear leaders, dear guests»), 大家好! (polyphonic). Company presentation: 成立于 X 年 (founded in X), 总部在 (HQ in), 主营业务 (main business), 市场份额 (market share). Product: 核心竞争力 (competitive edge), 技术优势 (tech advantage). Data: 年收入 (annual revenue), 利润率 (profit margin), 增长率 (growth rate). Partnership: 合作共赢 («win-win»), 互利互惠 (mutual benefit). Closing: 期待与贵公司合作 («hope to cooperate with your honorable company») + 感谢 + chengyu: 互相学习 or 共创未来. 贵 + 公司/校/国 = respectful marker for the partner's entity.",
          objectives: [
            "Ouvrir avec 各位领导",
            "Utiliser 核心竞争力/市场份额",
            "Conclure avec 合作共赢",
            "Ajouter 贵 + 公司"
          ],
          objectivesEn: [
            "Open with 各位领导",
            "Use 核心竞争力/市场份额",
            "Close with 合作共赢",
            "Add 贵 + 公司"
          ]
        },
        flashcards: ["各位领导", "成立", "总部", "市场份额", "核心竞争力", "合作共赢", "贵公司"],
        quizQuestions: 8
      }
    ]
  },
  {
    id: "cecr-c12-education-system",
    name: "Système éducatif et 高考",
    nameEn: "Education system and 高考",
    description: "De la maternelle à l'université, 高考.",
    descriptionEn: "From kindergarten to university, 高考.",
    color: "#0369A1",
    icon: "🎓",
    lessons: [
      {
        id: "cecr-c12-education-system-m1",
        title: "Parcours scolaire : 6-3-3-4",
        titleEn: "School path: 6-3-3-4",
        duration: 12, locked: false, completed: false,
        hskLevel: 5, hskLevels: [4, 5], category: "culture", difficulty: "superior",
        tags: ["education", "school", "cecr:c12"],
        introduction: {
          title: "Le système 9 ans obligatoires + lycée + fac",
          titleEn: "The 9 mandatory years + high school + university system",
          content: "Structure : 幼儿园 (yòu'éryuán, maternelle, 3-6 ans), 小学 (xiǎoxué, primaire, 6 ans), 初中 (chūzhōng, collège, 3 ans), 高中 (gāozhōng, lycée, 3 ans), 大学 (dàxué, université, 4 ans en 本科 běnkē licence + 2-3 ans en 研究生 yánjiūshēng master). 义务教育 (yìwù jiàoyù, scolarité obligatoire) = 9 ans (primaire + collège). Examens-charnières : 中考 (zhōngkǎo, examen d'entrée au lycée, fin de 初中) et surtout 高考 (gāokǎo, examen national d'entrée à l'université, fin de 高中, objet de la leçon suivante). Noter : 大一 dà yī = 1re année de fac, 大二 = 2e, etc. Terme en vogue : 鸡娃 (jīwá, « enfant-poule » = enfant hyper-poussé académiquement par ses parents).",
          contentEn: "Structure: 幼儿园 (kindergarten, 3-6), 小学 (primary, 6 years), 初中 (middle school, 3 years), 高中 (high school, 3 years), 大学 (university, 4 years 本科 bachelor + 2-3 years 研究生 master). 义务教育 (compulsory schooling) = 9 years (primary + middle). Pivot exams: 中考 (entry exam to high school, end of 初中) and especially 高考 (national university entry exam, end of 高中, subject of next lesson). Note: 大一 = Year 1 of uni, 大二 = Y2, etc. Trending term: 鸡娃 («chicken kid» = child hyper-pushed academically by parents).",
          objectives: [
            "Parcourir 幼/小/初/高/大学",
            "Comprendre 义务教育 (9 ans)",
            "Distinguer 中考 vs 高考",
            "Expliquer 鸡娃"
          ],
          objectivesEn: [
            "Walk through 幼/小/初/高/大学",
            "Understand 义务教育 (9 years)",
            "Distinguish 中考 vs 高考",
            "Explain 鸡娃"
          ]
        },
        flashcards: ["幼儿园", "小学", "初中", "高中", "大学", "义务教育", "中考", "鸡娃"],
        quizQuestions: 8
      },
      {
        id: "cecr-c12-education-system-m2",
        title: "高考 : l'examen qui décide tout",
        titleEn: "高考: the exam that decides everything",
        duration: 12, locked: false, completed: false,
        hskLevel: 6, hskLevels: [5, 6], category: "culture", difficulty: "superior",
        tags: ["gaokao", "exam", "cecr:c12"],
        introduction: {
          title: "高考 : le 7 juin de 10 millions de destins",
          titleEn: "高考: June 7th, 10 million destinies",
          content: "高考 (gāokǎo) : examen national sur 2 ou 3 jours début juin (typiquement 7-9). Épreuves : 语文 (yǔwén, chinois), 数学 (shùxué, maths), 英语 (yīngyǔ, anglais), puis 文综 (wénzōng, sciences humaines : histoire/géo/politique) OU 理综 (lǐzōng, sciences : physique/chimie/bio). Score sur 750. Les universités sont hiérarchisées : 985 工程 (985 Engineering, 39 universités d'élite dont 北大 Pékin, 清华 Tsinghua), 211 工程 (211 Engineering, top 100). Vocabulaire : 考生 (kǎoshēng, candidat), 录取 (lùqǔ, admission), 分数线 (fēnshùxiàn, barre d'admission), 状元 (zhuàngyuán, major de la province — titre impérial recyclé !). Le 高考 est considéré comme l'exam le plus compétitif au monde ; un mauvais score peut sceller une carrière.",
          contentEn: "高考 (gaokao): national exam over 2 or 3 days in early June (typically 7-9). Tests: 语文 (Chinese), 数学 (math), 英语 (English), then 文综 (humanities: history/geography/politics) OR 理综 (science: physics/chemistry/biology). Score out of 750. Universities are tiered: 985 工程 (985 Project, 39 elite universities including 北大 Peking, 清华 Tsinghua), 211 工程 (211 Project, top 100). Vocabulary: 考生 (candidate), 录取 (admission), 分数线 (admission cutoff), 状元 (province's top scorer — recycled imperial title!). 高考 is considered the world's most competitive exam; a bad score can seal a career.",
          objectives: [
            "Décrire structure des 高考",
            "Citer 985/211 et leurs élites",
            "Utiliser 录取/分数线/状元",
            "Expliquer l'enjeu social"
          ],
          objectivesEn: [
            "Describe 高考 structure",
            "Cite 985/211 and elites",
            "Use 录取/分数线/状元",
            "Explain the social stakes"
          ]
        },
        flashcards: ["高考", "语文", "数学", "文综", "理综", "985", "211", "录取", "状元"],
        quizQuestions: 8
      },
      {
        id: "cecr-c12-education-system-m3",
        title: "Universités chinoises et études à l'étranger",
        titleEn: "Chinese universities and studying abroad",
        duration: 12, locked: false, completed: false,
        hskLevel: 5, hskLevels: [5, 6], category: "culture", difficulty: "superior",
        tags: ["university", "abroad", "cecr:c12"],
        introduction: {
          title: "De 清华 à 留学",
          titleEn: "From 清华 to studying abroad",
          content: "Top universités chinoises : 清华大学 (Qīnghuá Dàxué, Tsinghua, Pékin, sciences/ingénierie), 北京大学 / 北大 (Běidà, Peking U., lettres/sciences sociales), 复旦大学 (Fùdàn, Shanghai), 上海交大 (Shànghǎi Jiāodà, Shanghai Jiao Tong, ingénierie), 浙大 (Zhèdà, Zhejiang, Hangzhou). Diplômes : 学士 (xuéshì, licence), 硕士 (shuòshì, master), 博士 (bóshì, doctorat). Études à l'étranger : 留学 (liúxué, étudier à l'étranger), 留学生 (étudiant étranger OU étudiant chinois parti à l'étranger). 海归 (hǎiguī, « tortue de mer » homophone = diplômé revenu d'outre-mer — statut prestigieux en décroissance). Échanges : 交换生 (jiāohuànshēng, étudiant en échange), 奖学金 (jiǎngxuéjīn, bourse). HSK devient pour les étrangers ce que TOEFL est pour les Chinois.",
          contentEn: "Top Chinese universities: 清华大学 (Tsinghua, Beijing, science/engineering), 北京大学 / 北大 (Peking U., humanities/social sciences), 复旦大学 (Fudan, Shanghai), 上海交大 (Shanghai Jiao Tong, engineering), 浙大 (Zhejiang, Hangzhou). Degrees: 学士 (bachelor), 硕士 (master), 博士 (PhD). Studying abroad: 留学 (study abroad), 留学生 (foreign student OR Chinese student abroad). 海归 («sea turtle» homophone = overseas graduate returned — prestigious status in decline). Exchanges: 交换生 (exchange student), 奖学金 (scholarship). HSK becomes for foreigners what TOEFL is for Chinese.",
          objectives: [
            "Nommer 清华/北大/复旦/交大",
            "Utiliser 学士/硕士/博士",
            "Comprendre 留学/海归",
            "Distinguer 交换生/奖学金"
          ],
          objectivesEn: [
            "Name 清华/北大/复旦/交大",
            "Use 学士/硕士/博士",
            "Understand 留学/海归",
            "Distinguish 交换生/奖学金"
          ]
        },
        flashcards: ["清华大学", "北大", "学士", "硕士", "博士", "留学", "海归", "奖学金"],
        quizQuestions: 8
      }
    ]
  },
  {
    id: "cecr-c12-law-society",
    name: "Droit et société",
    nameEn: "Law and society",
    description: "Droit, institutions, grands débats sociaux.",
    descriptionEn: "Law, institutions, major social debates.",
    color: "#44403C",
    icon: "🏛️",
    lessons: [
      {
        id: "cecr-c12-law-society-m1",
        title: "Système juridique chinois",
        titleEn: "Chinese legal system",
        duration: 12, locked: false, completed: false,
        hskLevel: 6, hskLevels: [6], category: "vocabulary", difficulty: "superior",
        tags: ["law", "legal", "cecr:c12"],
        introduction: {
          title: "宪法, 法律 et 法院",
          titleEn: "宪法, 法律 and 法院",
          content: "宪法 (xiànfǎ, Constitution, texte fondamental adopté 1982 avec plusieurs amendements). Hiérarchie des normes : 法律 (fǎlǜ, lois votées par le 全国人大 ANP), 行政法规 (xíngzhèng fǎguī, règlements), 部门规章 (bùmén guīzhāng, arrêtés ministériels). Tribunaux : 最高人民法院 (zuìgāo rénmín fǎyuàn, Cour suprême), 中级/基层 (tribunaux intermédiaires/de base). Acteurs : 法官 (fǎguān, juge), 律师 (lǜshī, avocat), 原告 (yuángào, plaignant), 被告 (bèigào, accusé). Procédure : 起诉 (qǐsù, poursuivre), 判决 (pànjué, juger/rendre un verdict), 上诉 (shàngsù, faire appel). Peines : 有期徒刑 (yǒuqī túxíng, prison à durée déterminée), 无期 (wúqī, perpétuité), 死刑 (sǐxíng, peine de mort — la Chine l'applique encore).",
          contentEn: "宪法 (Constitution, fundamental text adopted 1982 with several amendments). Hierarchy of norms: 法律 (laws voted by 全国人大 NPC), 行政法规 (regulations), 部门规章 (ministerial orders). Courts: 最高人民法院 (Supreme People's Court), 中级/基层 (intermediate/basic). Actors: 法官 (judge), 律师 (lawyer), 原告 (plaintiff), 被告 (defendant). Procedure: 起诉 (sue), 判决 (judge/rule), 上诉 (appeal). Penalties: 有期徒刑 (fixed-term imprisonment), 无期 (life), 死刑 (death penalty — still applied in China).",
          objectives: [
            "Hiérarchiser 宪法/法律/法规",
            "Nommer 法官/律师/原告/被告",
            "Utiliser 起诉/判决/上诉",
            "Comprendre 有期/无期/死刑"
          ],
          objectivesEn: [
            "Rank 宪法/法律/法规",
            "Name 法官/律师/原告/被告",
            "Use 起诉/判决/上诉",
            "Understand 有期/无期/死刑"
          ]
        },
        flashcards: ["宪法", "法律", "法院", "法官", "律师", "原告", "被告", "判决"],
        quizQuestions: 8
      },
      {
        id: "cecr-c12-law-society-m2",
        title: "Débats de société : genre, mariage, natalité",
        titleEn: "Social debates: gender, marriage, birthrate",
        duration: 12, locked: false, completed: false,
        hskLevel: 6, hskLevels: [5, 6], category: "culture", difficulty: "superior",
        tags: ["society", "debate", "cecr:c12"],
        introduction: {
          title: "Les tensions sociales contemporaines",
          titleEn: "Contemporary social tensions",
          content: "Genre : 性别 (xìngbié, genre), 性别歧视 (xìngbié qíshì, discrimination), 女权主义 (nǚquán zhǔyì, féminisme — sujet sensible sur les réseaux chinois). 剩女 (shèngnǚ, « femmes restantes » — terme péjoratif pour célibataires 27+, critiqué mais encore répandu), 剩男 (shèngnán, équivalent masculin, bcp plus nombreux dû au déséquilibre de genre). Mariage et natalité : 结婚率 (jiéhūnlǜ, taux de mariage, en chute libre), 离婚率 (líhūnlǜ, en hausse), 出生率 (chūshēnglǜ, natalité, très bas — 2022 pour la 1re fois population en baisse). Politique : 一孩 (1978-2015), 二孩 (2016-2021), 三孩 (2021→) — assouplissements successifs peu efficaces. LGBTQ : 同性恋 (tóngxìngliàn, homosexualité) — dépénalisé en 1997, dépathologisé en 2001, mais non reconnu légalement.",
          contentEn: "Gender: 性别 (gender), 性别歧视 (discrimination), 女权主义 (feminism — sensitive topic on Chinese networks). 剩女 («leftover women» — pejorative term for 27+ singles, criticized but still widespread), 剩男 (male equivalent, many more due to gender imbalance). Marriage and birthrate: 结婚率 (marriage rate, plummeting), 离婚率 (rising), 出生率 (birthrate, very low — 2022 population declined for the first time). Policy: 一孩 (1978-2015), 二孩 (2016-2021), 三孩 (2021-) — successive loosenings with little effect. LGBTQ: 同性恋 (homosexuality) — decriminalized 1997, depathologized 2001, but not legally recognized.",
          objectives: [
            "Utiliser 性别歧视/女权主义",
            "Expliquer 剩女/剩男",
            "Retracer 一孩→二孩→三孩",
            "Comprendre 同性恋 en Chine"
          ],
          objectivesEn: [
            "Use 性别歧视/女权主义",
            "Explain 剩女/剩男",
            "Trace 一孩→二孩→三孩",
            "Understand 同性恋 in China"
          ]
        },
        flashcards: ["性别", "性别歧视", "女权主义", "剩女", "结婚率", "出生率", "三孩", "同性恋"],
        quizQuestions: 8
      },
      {
        id: "cecr-c12-law-society-m3",
        title: "Cybersécurité et censure",
        titleEn: "Cybersecurity and censorship",
        duration: 12, locked: false, completed: false,
        hskLevel: 6, hskLevels: [6], category: "vocabulary", difficulty: "superior",
        tags: ["censorship", "internet", "cecr:c12"],
        introduction: {
          title: "防火长城 : le Grand Firewall",
          titleEn: "防火长城: the Great Firewall",
          content: "防火长城 (fánghuǒ chángchéng, « Grande muraille de feu ») est le surnom officieux du Great Firewall (GFW). Terme officiel : 网络长城 (wǎngluò chángchéng). Sites étrangers bloqués : Google, Facebook, YouTube, Twitter/X, Instagram, WhatsApp, Wikipedia (partiel), presse étrangère (NYT, BBC Chinese…). Contournement : 翻墙 (fān qiáng, « sauter le mur » = utiliser un VPN), légalement zone grise. Termes techniques : 网络安全 (wǎngluò ānquán, cybersécurité), 数据安全 (shùjù ānquán, sécurité des données). Loi centrale : 网络安全法 (2017). Censure de contenu : 敏感词 (mǐngǎncí, mots sensibles filtrés — 64 = 4 juin 1989, noms de dissidents, etc.). Éviter ces sujets en ligne en Chine est une règle de prudence basique.",
          contentEn: "防火长城 («Great Firewall of Fire») is the unofficial nickname for the Great Firewall (GFW). Official term: 网络长城. Foreign sites blocked: Google, Facebook, YouTube, Twitter/X, Instagram, WhatsApp, Wikipedia (partial), foreign press (NYT, BBC Chinese…). Circumvention: 翻墙 («jump the wall» = use a VPN), legally grey area. Technical terms: 网络安全 (cybersecurity), 数据安全 (data security). Key law: 网络安全法 (2017). Content censorship: 敏感词 (sensitive words filtered — 64 = June 4, 1989, dissidents' names, etc.). Avoiding these topics online in China is basic prudence.",
          objectives: [
            "Expliquer 防火长城/GFW",
            "Utiliser 翻墙 avec prudence",
            "Nommer 网络安全/数据安全",
            "Comprendre 敏感词"
          ],
          objectivesEn: [
            "Explain 防火长城/GFW",
            "Use 翻墙 cautiously",
            "Name 网络安全/数据安全",
            "Understand 敏感词"
          ]
        },
        flashcards: ["防火长城", "翻墙", "网络安全", "敏感词", "网络安全法"],
        quizQuestions: 8
      }
    ]
  }
  ,
  // ============================================================
  // C2.1 — Maîtrise 1/2 — Chinois classique + Philosophie + Poésie
  // ============================================================
  {
    id: "cecr-c21-wenyan-intro",
    name: "文言文 : initiation au chinois classique",
    nameEn: "文言文: introduction to classical Chinese",
    description: "Grammaire, particules, premiers textes.",
    descriptionEn: "Grammar, particles, first texts.",
    color: "#92400E",
    icon: "📜",
    lessons: [
      {
        id: "cecr-c21-wenyan-intro-m1",
        title: "Pourquoi et comment le 文言文",
        titleEn: "Why and how of 文言文",
        duration: 12, locked: false, completed: false,
        hskLevel: 7, hskLevels: [6, 7], category: "reading", difficulty: "superior",
        tags: ["classical", "wenyan", "cecr:c21"],
        introduction: {
          title: "Le chinois classique : 2 500 ans de littérature en un mode",
          titleEn: "Classical Chinese: 2,500 years of literature in one mode",
          content: "文言文 (wényánwén, chinois classique) est la langue écrite du monde chinois depuis Confucius (Ve siècle av. JC) jusqu'à la réforme de 1919. Caractéristiques : un seul caractère = un mot (vs bi-syllabes modernes), pas de ponctuation (ajoutée au XXe siècle), grammaire ultra-concise. Lire un poème Tang, un édit impérial, une pensée bouddhiste passe par le 文言. Même le chinois moderne cite : 学而不厌 (Confucius), 知之为知之 (« savoir ce qu'on sait »). Difficulté principale : polysémie — un caractère peut signifier 10 choses selon contexte. Approche : lire lentement, chercher les particules d'articulation (之, 者, 也, 乎, 於), repérer le verbe.",
          contentEn: "文言文 (classical Chinese) is the written language of the Chinese world from Confucius (5th c. BCE) until the 1919 reform. Features: one character = one word (vs modern bisyllables), no punctuation (added in 20th c.), ultra-concise grammar. Reading a Tang poem, an imperial edict, Buddhist thought passes through 文言. Modern Chinese even quotes: 学而不厌 (Confucius), 知之为知之 («know what you know»). Main difficulty: polysemy — a character can mean 10 things depending on context. Approach: read slowly, seek articulating particles (之, 者, 也, 乎, 於), spot the verb.",
          objectives: [
            "Situer le 文言 historiquement",
            "Comprendre « 1 caractère = 1 mot »",
            "Repérer particules 之/者/也/乎",
            "Lire lentement en contexte"
          ],
          objectivesEn: [
            "Historically situate 文言",
            "Understand «1 char = 1 word»",
            "Spot particles 之/者/也/乎",
            "Read slowly in context"
          ]
        },
        flashcards: ["文言文", "之", "者", "也", "乎", "於"],
        quizQuestions: 8
      },
      {
        id: "cecr-c21-wenyan-intro-m2",
        title: "Particules 之 / 者 / 所 / 所以",
        titleEn: "Particles 之 / 者 / 所 / 所以",
        duration: 12, locked: false, completed: false,
        hskLevel: 7, hskLevels: [7], category: "reading", difficulty: "superior",
        tags: ["classical", "particles", "cecr:c21"],
        introduction: {
          title: "Les 4 particules qui articulent le 文言",
          titleEn: "The 4 particles that articulate 文言",
          content: "之 (zhī) : 3 usages — (1) 的 déterminatif : 孔子之书 (« les livres DE Confucius »), (2) pronom objet 3e personne : 爱之 (« aimer [quelqu'un] ») et (3) verbe « aller » : 之于 X (« se rendre à X »). 者 (zhě) : nominalisateur — 善者 (« celui qui est bon », « le bien »), 古之学者 (« les lettrés d'autrefois »). 所 (suǒ) : forme passive « ce qui est » — 所爱 (« ce qui est aimé, l'être aimé »), 所闻 (« ce qu'on entend »). 所以 (suǒyǐ) : « ce par quoi », cause ou moyen — 所以然 (« la raison pour laquelle [c'est ainsi] »). Astuce pédagogique : en 文言, là où le chinois moderne dirait 的, il y a souvent 之 ; là où on dirait « la chose qui… », il y a 所.",
          contentEn: "之 (zhī): 3 uses — (1) 的 determiner: 孔子之书 («Confucius'S books»), (2) 3rd-person object pronoun: 爱之 («love [someone]»), (3) verb «go to»: 之于 X («go to X»). 者 (zhě): nominalizer — 善者 («the good one», «goodness»), 古之学者 («scholars of old»). 所 (suǒ): passive form «that which is» — 所爱 («what is loved, the beloved»), 所闻 («what is heard»). 所以 (suǒyǐ): «that by which», cause or means — 所以然 («the reason why [it is so]»). Pedagogical tip: where modern Chinese says 的, 文言 often has 之; where we'd say «the thing that…», 文言 has 所.",
          objectives: [
            "Démêler les 3 usages de 之",
            "Nominaliser avec 者",
            "Former passif avec 所",
            "Utiliser 所以 pour la cause"
          ],
          objectivesEn: [
            "Untangle 3 uses of 之",
            "Nominalize with 者",
            "Form passive with 所",
            "Use 所以 for cause"
          ]
        },
        flashcards: ["之", "者", "所", "所以", "爱", "善"],
        quizQuestions: 8
      },
      {
        id: "cecr-c21-wenyan-intro-m3",
        title: "Finales 也 / 矣 / 乎 / 哉",
        titleEn: "Finals 也 / 矣 / 乎 / 哉",
        duration: 12, locked: false, completed: false,
        hskLevel: 7, hskLevels: [7], category: "reading", difficulty: "superior",
        tags: ["classical", "finals", "cecr:c21"],
        introduction: {
          title: "Les finales : ponctuation interne du 文言",
          titleEn: "Finals: internal punctuation of 文言",
          content: "Les finales 文言 fonctionnent comme ponctuation + nuance : 也 (yě) marque une affirmation définitionnelle — 仁者，爱人也 (« Être humain, c'est aimer les autres »). 矣 (yǐ) marque un état accompli ou un jugement final — 此之谓大丈夫矣 (« voilà ce qui s'appelle un vrai homme »). 乎 (hū) = particule interrogative ou d'exclamation — 学而时习之，不亦说乎? (« n'est-ce pas réjouissant d'apprendre et de revoir régulièrement? »), célèbre incipit des Analectes. 哉 (zāi) marque une exclamation admirative — 善哉! (« comme c'est bien! »). Dans un texte 文言 sans virgules, ces finales sont VOS virgules et points. Les repérer = découper la phrase.",
          contentEn: "文言 finals function as punctuation + nuance: 也 (yě) marks a definitional affirmation — 仁者，爱人也 («To be human is to love others»). 矣 (yǐ) marks accomplished state or final judgment — 此之谓大丈夫矣 («this is what is called a true man»). 乎 (hū) = interrogative or exclamatory particle — 学而时习之，不亦说乎? («is it not a joy to learn and review regularly?»), famous opening of the Analects. 哉 (zāi) marks admiring exclamation — 善哉! («how good!»). In an unpunctuated 文言 text, these finals are your commas and periods. Spotting them = parsing the sentence.",
          objectives: [
            "Reconnaître 也 comme affirmation def.",
            "Identifier 矣 comme aspect accompli",
            "Poser question avec 乎",
            "Exclamer avec 哉"
          ],
          objectivesEn: [
            "Recognize 也 as definitional affirmation",
            "Identify 矣 as accomplished aspect",
            "Ask questions with 乎",
            "Exclaim with 哉"
          ]
        },
        flashcards: ["也", "矣", "乎", "哉", "仁", "善"],
        quizQuestions: 8
      },
      {
        id: "cecr-c21-wenyan-intro-m4",
        title: "Lire un passage : 《论语》学而第一",
        titleEn: "Reading a passage: 《论语》Book 1",
        duration: 12, locked: false, completed: false,
        hskLevel: 7, hskLevels: [7], category: "reading", difficulty: "superior",
        tags: ["classical", "analects", "cecr:c21"],
        introduction: {
          title: "子曰 : lire Confucius en VO",
          titleEn: "子曰: reading Confucius in the original",
          content: "Les 《论语》(Lúnyǔ, Analectes) s'ouvrent par : 子曰：「学而时习之，不亦说乎? 有朋自远方来，不亦乐乎? 人不知而不愠，不亦君子乎?」 (« Le Maître dit : Apprendre et le revoir en temps voulu, n'est-ce pas une joie? Avoir un ami qui vient de loin, n'est-ce pas un bonheur? N'être point reconnu des hommes et ne pas s'en offusquer, n'est-ce pas être un homme de bien? »). Vocabulaire clé : 子 (zǐ, le Maître), 曰 (yuē, dire — jamais 说 en 文言), 时习 (étudier à propos), 朋 (ami), 愠 (yùn, se fâcher intérieurement), 君子 (jūnzǐ, homme de bien). Ce passage est appris par cœur par tous les écoliers chinois. Il illustre les finales 乎 / 之 étudiées.",
          contentEn: "The 《论语》(Analects) opens with: 子曰：「学而时习之，不亦说乎? 有朋自远方来，不亦乐乎? 人不知而不愠，不亦君子乎?」 («The Master said: To learn and review it in due season, is it not a joy? To have a friend coming from afar, is it not a pleasure? Not to be recognized by others and not resent it, is this not the mark of a gentleman?»). Key vocabulary: 子 (the Master), 曰 (say — never 说 in 文言), 时习 (study timely), 朋 (friend), 愠 (resent inwardly), 君子 (gentleman/noble man). This passage is memorized by every Chinese schoolchild. It illustrates the 乎 / 之 finals studied.",
          objectives: [
            "Lire le 1er paragraphe des 论语",
            "Identifier 子曰/君子/朋",
            "Repérer 乎 triple interrogation",
            "Mémoriser cette ouverture"
          ],
          objectivesEn: [
            "Read the Analects' first paragraph",
            "Identify 子曰/君子/朋",
            "Spot triple 乎 interrogation",
            "Memorize this opening"
          ]
        },
        flashcards: ["论语", "子曰", "学而时习之", "君子", "朋", "远方", "愠"],
        quizQuestions: 8
      }
    ]
  },
  {
    id: "cecr-c21-philo-classique",
    name: "Philosophie classique : 儒, 道, 法, 佛",
    nameEn: "Classical philosophy: 儒, 道, 法, 佛",
    description: "Les 4 écoles qui ont façonné la pensée chinoise.",
    descriptionEn: "The 4 schools that shaped Chinese thought.",
    color: "#78350F",
    icon: "⛰️",
    lessons: [
      {
        id: "cecr-c21-philo-classique-m1",
        title: "儒家 : Confucius et l'éthique sociale",
        titleEn: "儒家: Confucius and social ethics",
        duration: 12, locked: false, completed: false,
        hskLevel: 7, hskLevels: [6, 7], category: "culture", difficulty: "superior",
        tags: ["confucianism", "philosophy", "cecr:c21"],
        introduction: {
          title: "孔子 : le maître qui a structuré 2500 ans",
          titleEn: "孔子: the master who structured 2,500 years",
          content: "孔子 (Kǒngzǐ, Confucius, -551 → -479) est le fondateur du 儒家 (Rújiā, école confucéenne). Valeurs cardinales : 仁 (rén, humanité, amour des hommes — concept central), 义 (yì, justice/droiture), 礼 (lǐ, rites/bienséance), 智 (zhì, sagesse), 信 (xìn, fiabilité). Les cinq sont les 五常 (wǔcháng, 5 vertus constantes). Relations sociales = 五伦 (wǔlún) : souverain-sujet, père-fils, mari-femme, aîné-cadet, ami-ami. Chaque rôle a des devoirs. 孝 (xiào, piété filiale) reste fondamental. Texte : 《论语》rassemble les paroles de Confucius. Héritier majeur : 孟子 (Mèngzǐ, Mencius, -372 → -289). Aujourd'hui, le confucianisme est réhabilité officiellement en Chine.",
          contentEn: "孔子 (Confucius, 551-479 BCE) founded 儒家 (Confucian school). Cardinal values: 仁 (humanity, love of humans — central concept), 义 (righteousness), 礼 (rites/propriety), 智 (wisdom), 信 (trustworthiness). The five are 五常 (5 constant virtues). Social relations = 五伦 : ruler-subject, father-son, husband-wife, elder-younger, friend-friend. Each role has duties. 孝 (filial piety) remains fundamental. Text: 《论语》gathers Confucius' sayings. Major heir: 孟子 (Mencius, 372-289 BCE). Today, Confucianism is officially rehabilitated in China.",
          objectives: [
            "Connaître 孔子 et ses dates",
            "Lister 仁义礼智信 (五常)",
            "Nommer 五伦",
            "Distinguer 孔子 vs 孟子"
          ],
          objectivesEn: [
            "Know 孔子 and his dates",
            "List 仁义礼智信 (五常)",
            "Name 五伦",
            "Distinguish 孔子 vs 孟子"
          ]
        },
        flashcards: ["儒家", "孔子", "仁", "义", "礼", "智", "信", "孝", "论语", "孟子"],
        quizQuestions: 8
      },
      {
        id: "cecr-c21-philo-classique-m2",
        title: "道家 : Laozi, Zhuangzi et le 无为",
        titleEn: "道家: Laozi, Zhuangzi and 无为",
        duration: 12, locked: false, completed: false,
        hskLevel: 7, hskLevels: [6, 7], category: "culture", difficulty: "superior",
        tags: ["daoism", "philosophy", "cecr:c21"],
        introduction: {
          title: "道 : ce qu'on ne peut nommer",
          titleEn: "道: that which cannot be named",
          content: "道家 (Dàojiā, école taoïste) est fondée par 老子 (Lǎozǐ, Laozi, VIe s. av. JC) dans le 《道德经》(Dàodéjīng, Livre de la Voie et de la Vertu) — texte de 81 chapitres qui s'ouvre par : 道可道，非常道 (« la Voie qu'on peut nommer n'est pas la Voie éternelle »). Concept central : 道 (dào, la Voie, principe indifférencié). Autre concept majeur : 无为 (wúwéi, non-agir — agir selon le naturel sans forcer). 庄子 (Zhuāngzǐ, IVe s. av. JC) développe le taoïsme avec des paraboles (le rêve du papillon : 庄周梦蝶). Contraste 儒 vs 道 : ordre social vs spontanéité naturelle — deux pôles complémentaires de l'âme chinoise.",
          contentEn: "道家 (Daoist school) is founded by 老子 (Laozi, 6th c. BCE) in the 《道德经》(Dao De Jing, Book of the Way and Virtue) — 81-chapter text opening with: 道可道，非常道 («the Way that can be named is not the eternal Way»). Central concept: 道 (Dao, the Way, undifferentiated principle). Another major concept: 无为 (wuwei, non-action — act according to the natural without forcing). 庄子 (Zhuangzi, 4th c. BCE) develops Daoism with parables (the butterfly dream: 庄周梦蝶). 儒 vs 道 contrast: social order vs natural spontaneity — two complementary poles of the Chinese soul.",
          objectives: [
            "Lire 道可道非常道",
            "Comprendre 无为",
            "Distinguer 老子 vs 庄子",
            "Opposer 儒/道 complémentairement"
          ],
          objectivesEn: [
            "Read 道可道非常道",
            "Understand 无为",
            "Distinguish 老子 vs 庄子",
            "Contrast 儒/道 complementarily"
          ]
        },
        flashcards: ["道家", "老子", "庄子", "道", "无为", "道德经", "庄周梦蝶"],
        quizQuestions: 8
      },
      {
        id: "cecr-c21-philo-classique-m3",
        title: "法家 : l'école légiste",
        titleEn: "法家: the Legalist school",
        duration: 12, locked: false, completed: false,
        hskLevel: 7, hskLevels: [7], category: "culture", difficulty: "superior",
        tags: ["legalism", "philosophy", "cecr:c21"],
        introduction: {
          title: "法家 : gouverner par la loi, pas par la vertu",
          titleEn: "法家: rule by law, not by virtue",
          content: "法家 (Fǎjiā, école légiste) s'oppose au confucianisme : les hommes sont naturellement mauvais, donc gouverner par la loi (法 fǎ), la stratégie politique (术 shù) et la position de pouvoir (势 shì). Théoriciens : 商鞅 (Shāng Yāng, IVe s. av. JC, réforma le royaume de Qin), 韩非 (Hán Fēi, IIIe s. av. JC, synthèse définitive dans 《韩非子》). Application historique : le Qin qui unifia la Chine en -221 appliqua rigoureusement le légisme — efficacité militaire redoutable, mais dynastie qui ne dura que 15 ans. Depuis, la Chine oscille entre 儒表法里 (« confucéen en façade, légiste à l'intérieur »). Le légisme reste pertinent pour comprendre la gouvernance contemporaine.",
          contentEn: "法家 (Legalist school) opposes Confucianism: humans are naturally bad, so govern via law (法 fǎ), political strategy (术 shù) and position of power (势 shì). Theorists: 商鞅 (Shang Yang, 4th c. BCE, reformed Qin kingdom), 韩非 (Han Feizi, 3rd c. BCE, definitive synthesis in 《韩非子》). Historical application: the Qin that unified China in 221 BCE rigorously applied Legalism — formidable military efficiency, but the dynasty lasted only 15 years. Since then, China has oscillated between 儒表法里 («Confucian on the surface, Legalist inside»). Legalism remains relevant to understand contemporary governance.",
          objectives: [
            "Définir 法家 par 法/术/势",
            "Citer 商鞅 et 韩非",
            "Relier légisme au Qin -221",
            "Expliquer 儒表法里"
          ],
          objectivesEn: [
            "Define 法家 by 法/术/势",
            "Cite 商鞅 and 韩非",
            "Link Legalism to Qin 221 BCE",
            "Explain 儒表法里"
          ]
        },
        flashcards: ["法家", "商鞅", "韩非", "法", "术", "势", "儒表法里"],
        quizQuestions: 8
      },
      {
        id: "cecr-c21-philo-classique-m4",
        title: "佛教 : l'arrivée du bouddhisme",
        titleEn: "佛教: the arrival of Buddhism",
        duration: 12, locked: false, completed: false,
        hskLevel: 7, hskLevels: [7], category: "culture", difficulty: "superior",
        tags: ["buddhism", "religion", "cecr:c21"],
        introduction: {
          title: "佛 : la Voie venue d'Inde",
          titleEn: "佛: the Way from India",
          content: "佛教 (Fójiào, bouddhisme) entre en Chine par la Route de la Soie au Ier siècle de notre ère. Sinisation progressive : le chan 禅 (chán, méditation → jap. Zen) naît de la rencontre 佛 + 道. Concepts clés : 佛 (fó, Bouddha — « l'Éveillé »), 菩萨 (púsà, bodhisattva), 轮回 (lúnhuí, samsara, cycle des renaissances), 业 (yè, karma), 因果 (yīnguǒ, cause-effet). Pratique : 念佛 (niànfó, réciter le nom du Bouddha), 烧香 (shāoxiāng, brûler l'encens), 磕头 (kētóu, se prosterner). Sites : 少林寺 (Shàolínsì, Shaolin), 白马寺 (Báimǎsì, Temple du Cheval Blanc — le premier). Trois écoles : 净土 (Jìngtǔ, Terre Pure — la plus populaire), 禅宗 (Chánzōng, Chan), 密宗 (Mìzōng, Tantrique). Aujourd'hui cohabite avec 道教 et christianisme en pleine croissance.",
          contentEn: "佛教 (Buddhism) enters China via the Silk Road in the 1st century CE. Gradual sinicization: 禅 (Chan, meditation → Japanese Zen) arose from 佛 + 道 encounter. Key concepts: 佛 (Buddha — «the Awakened»), 菩萨 (bodhisattva), 轮回 (samsara, rebirth cycle), 业 (karma), 因果 (cause-effect). Practice: 念佛 (recite Buddha's name), 烧香 (burn incense), 磕头 (prostrate). Sites: 少林寺 (Shaolin), 白马寺 (White Horse Temple — the first). Three schools: 净土 (Pure Land — most popular), 禅宗 (Chan), 密宗 (Tantric). Today coexists with 道教 and growing Christianity.",
          objectives: [
            "Dater l'entrée du 佛教 (Ier s.)",
            "Définir 佛/菩萨/轮回/业",
            "Distinguer 净土/禅宗/密宗",
            "Relier 禅 à Zen japonais"
          ],
          objectivesEn: [
            "Date Buddhism's arrival (1st c.)",
            "Define 佛/菩萨/轮回/业",
            "Distinguish 净土/禅宗/密宗",
            "Link 禅 to Japanese Zen"
          ]
        },
        flashcards: ["佛教", "佛", "菩萨", "轮回", "业", "禅", "净土", "少林寺"],
        quizQuestions: 8
      }
    ]
  },
  {
    id: "cecr-c21-poetry",
    name: "Poésie Tang et formes classiques",
    nameEn: "Tang poetry and classical forms",
    description: "绝句, 律诗, 词 — Li Bai, Du Fu, Li Qingzhao.",
    descriptionEn: "绝句, 律诗, 词 — Li Bai, Du Fu, Li Qingzhao.",
    color: "#134E4A",
    icon: "🪶",
    lessons: [
      {
        id: "cecr-c21-poetry-m1",
        title: "Les formes poétiques : 绝句 et 律诗",
        titleEn: "Poetic forms: 绝句 and 律诗",
        duration: 12, locked: false, completed: false,
        hskLevel: 7, hskLevels: [6, 7], category: "culture", difficulty: "superior",
        tags: ["poetry", "forms", "cecr:c21"],
        introduction: {
          title: "La grammaire invisible de la poésie chinoise",
          titleEn: "The invisible grammar of Chinese poetry",
          content: "La poésie classique se joue sur quelques formes codifiées. 绝句 (juéjù, quatrain) : 4 vers, chacun de 5 (五绝) ou 7 (七绝) caractères. 律诗 (lǜshī, poème régulé) : 8 vers, 5 ou 7 caractères, avec contraintes strictes de ton (平/仄, píng/zè = plat/oblique) et d'antithèse entre vers 3-4 et 5-6. 词 (cí, « mot », genre né sous les Tang et épanoui sous les Song) suit une mélodie (词牌 cípái) avec nombre de caractères et de tons fixés par mélodie. Rimer en chinois classique : ce sont les tons (平声) en fin de vers qui riment, en général les vers pairs. Lire un poème = ne rien comprendre à la 1re lecture puis tout comprendre à la 5e grâce aux images.",
          contentEn: "Classical poetry plays on a few codified forms. 绝句 (quatrain): 4 lines, each of 5 (五绝) or 7 (七绝) characters. 律诗 (regulated poem): 8 lines, 5 or 7 characters, with strict tone (平/仄 = level/oblique) and antithesis constraints between lines 3-4 and 5-6. 词 («word», genre born under Tang and flourished under Song) follows a melody (词牌) with character count and tones fixed per melody. Rhyming in classical Chinese: level-tone (平声) line-endings rhyme, usually even-numbered lines. Reading a poem = understanding nothing on first read then everything on the fifth through images.",
          objectives: [
            "Distinguer 绝句 vs 律诗",
            "Connaître 5字 et 7字",
            "Comprendre 平/仄 rimique",
            "Présenter 词 et 词牌"
          ],
          objectivesEn: [
            "Distinguish 绝句 vs 律诗",
            "Know 5- and 7-char lines",
            "Understand 平/仄 rhyming",
            "Introduce 词 and 词牌"
          ]
        },
        flashcards: ["绝句", "律诗", "词", "词牌", "平", "仄"],
        quizQuestions: 8
      },
      {
        id: "cecr-c21-poetry-m2",
        title: "李白 : le poète errant et ivre",
        titleEn: "李白: the wandering and drunken poet",
        duration: 12, locked: false, completed: false,
        hskLevel: 7, hskLevels: [7], category: "culture", difficulty: "superior",
        tags: ["poetry", "libai", "cecr:c21"],
        introduction: {
          title: "李白 (701-762) : 诗仙 — l'Immortel de la poésie",
          titleEn: "李白 (701-762): 诗仙 — the Immortal of Poetry",
          content: "李白 (Lǐ Bái) est la figure emblématique de la poésie chinoise. Surnommé 诗仙 (shīxiān, Immortel de la poésie), fasciné par le vin et les voyages. Le quatrain le plus célèbre de toute la littérature chinoise : 《静夜思》(Jìngyè sī, « Pensée d'une nuit paisible ») — 床前明月光，疑是地上霜。举头望明月，低头思故乡。(« Devant mon lit la clarté de la lune / Je crois d'abord qu'il s'agit de givre sur le sol. / Je lève la tête, je regarde la lune brillante / Je baisse la tête, je pense au pays natal. ») Chaque écolier chinois le connaît. Thèmes : lune 月, vin 酒, nostalgie 思乡, voyage. Style : libre, imagé, musical, cosmique. Contraste avec Du Fu, plus grave et politique.",
          contentEn: "李白 (Li Bai) is the emblematic figure of Chinese poetry. Nicknamed 诗仙 (Immortal of Poetry), fascinated by wine and travel. The most famous quatrain in all Chinese literature: 《静夜思》(«Thoughts on a Quiet Night») — 床前明月光，疑是地上霜。举头望明月，低头思故乡。(«Before my bed the moonlight's glow / I took it first for frost on ground. / I raise my head and gaze at the bright moon / I lower my head and think of home.») Every Chinese schoolchild knows it. Themes: moon 月, wine 酒, nostalgia 思乡, travel. Style: free, imagistic, musical, cosmic. Contrast with Du Fu, more serious and political.",
          objectives: [
            "Connaître 李白 (701-762)",
            "Réciter 《静夜思》",
            "Identifier thèmes : lune/vin/nostalgie",
            "Opposer 诗仙 vs 诗圣"
          ],
          objectivesEn: [
            "Know 李白 (701-762)",
            "Recite 《静夜思》",
            "Identify themes: moon/wine/nostalgia",
            "Contrast 诗仙 vs 诗圣"
          ]
        },
        flashcards: ["李白", "诗仙", "静夜思", "明月", "故乡", "思乡"],
        quizQuestions: 8
      },
      {
        id: "cecr-c21-poetry-m3",
        title: "杜甫 : 诗圣, poète du peuple",
        titleEn: "杜甫: 诗圣, poet of the people",
        duration: 12, locked: false, completed: false,
        hskLevel: 7, hskLevels: [7], category: "culture", difficulty: "superior",
        tags: ["poetry", "dufu", "cecr:c21"],
        introduction: {
          title: "杜甫 (712-770) : la souffrance rendue belle",
          titleEn: "杜甫 (712-770): suffering rendered beautiful",
          content: "杜甫 (Dù Fǔ) contemporain et ami de Li Bai, mais esprit opposé : grave, politique, ancré dans la souffrance historique. Surnommé 诗圣 (shīshèng, Saint de la poésie). Vit la rébellion d'An Lushan (755-763) qui bouleverse la dynastie Tang, et en fait l'un des grands sujets de son œuvre. Son vers le plus cité : 国破山河在 (« L'État est brisé, montagnes et fleuves demeurent ») dans 《春望》(Chūnwàng). Style : rigoureux, contraint, plein de résonance historique. Thèmes : guerre, pauvreté, solidarité. Ce contraste 李白-杜甫 structure la conscience poétique chinoise : le ciel (Li) et la terre (Du), le génie vagabond et la conscience morale.",
          contentEn: "杜甫 (Du Fu) was Li Bai's contemporary and friend but opposite in spirit: serious, political, rooted in historical suffering. Nicknamed 诗圣 (Saint of Poetry). Lived through the An Lushan rebellion (755-763) that shook the Tang dynasty, making it one of his great subjects. His most quoted line: 国破山河在 («The state is shattered, mountains and rivers remain») in 《春望》(Spring View). Style: rigorous, constrained, full of historical resonance. Themes: war, poverty, solidarity. This 李白-杜甫 contrast structures Chinese poetic consciousness: sky (Li) and earth (Du), wandering genius and moral conscience.",
          objectives: [
            "Connaître 杜甫 (712-770)",
            "Citer 国破山河在",
            "Situer la rébellion d'An Lushan",
            "Opposer 杜 grave à 李 libre"
          ],
          objectivesEn: [
            "Know 杜甫 (712-770)",
            "Cite 国破山河在",
            "Place An Lushan rebellion",
            "Contrast serious Du vs free Li"
          ]
        },
        flashcards: ["杜甫", "诗圣", "春望", "国破山河在", "安禄山"],
        quizQuestions: 8
      },
      {
        id: "cecr-c21-poetry-m4",
        title: "李清照 : la grande voix féminine",
        titleEn: "李清照: the great female voice",
        duration: 12, locked: false, completed: false,
        hskLevel: 7, hskLevels: [7], category: "culture", difficulty: "superior",
        tags: ["poetry", "liqingzhao", "cecr:c21"],
        introduction: {
          title: "李清照 (1084-1155) : la poétesse Song",
          titleEn: "李清照 (1084-1155): the Song poetess",
          content: "李清照 (Lǐ Qīngzhào) est la plus grande voix féminine de la poésie chinoise, spécialiste du 词. Éduquée dans une famille lettrée, elle écrit avec une sensibilité inédite — joies conjugales, puis deuil et exil après l'invasion Jürchen (1127). Son 词 le plus cité : 《声声慢》(Shēng shēng màn) ouvre sur 寻寻觅觅，冷冷清清，凄凄惨惨戚戚 (« Je cherche et cherche, froid et désolation, triste, triste, navrante… ») — 14 caractères redoublés qui construisent un climat de détresse sans équivalent. On l'appelle 千古第一才女 (« la première femme de génie à travers les siècles »). Elle prouve que la littérature classique chinoise, malgré la société confucéenne, a fait place à des voix féminines d'exception.",
          contentEn: "李清照 (Li Qingzhao) is the greatest female voice of Chinese poetry, a 词 specialist. Educated in a literate family, she writes with unprecedented sensitivity — marital joys, then mourning and exile after the Jurchen invasion (1127). Her most cited 词: 《声声慢》(Shēng shēng màn) opens with 寻寻觅觅，冷冷清清，凄凄惨惨戚戚 («I seek and seek, cold and desolate, sad sad and miserable…») — 14 reduplicated characters building an unparalleled atmosphere of distress. She is called 千古第一才女 («the greatest female genius through the ages»). She proves that classical Chinese literature, despite Confucian society, made room for exceptional female voices.",
          objectives: [
            "Connaître 李清照 (1084-1155)",
            "Réciter l'ouverture de 声声慢",
            "Comprendre 千古第一才女",
            "Situer l'invasion Jürchen (1127)"
          ],
          objectivesEn: [
            "Know 李清照 (1084-1155)",
            "Recite the opening of 声声慢",
            "Understand 千古第一才女",
            "Place the Jurchen invasion (1127)"
          ]
        },
        flashcards: ["李清照", "声声慢", "寻寻觅觅", "千古第一才女", "词"],
        quizQuestions: 8
      }
    ]
  }
  ,
  // ============================================================
  // C2.2 — Maîtrise 2/2 — Rhétorique + Traduction + Littérature contemporaine + Dialectes
  // ============================================================
  {
    id: "cecr-c22-rhetoric-translation",
    name: "Rhétorique & traduction",
    nameEn: "Rhetoric & Translation",
    description: "Figures de style chinoises (对偶, 比喻, 双关), défis classiques de traduction zh↔fr, idiomes intraduisibles.",
    descriptionEn: "Chinese figures of speech (对偶, 比喻, 双关), classic zh↔fr translation challenges, untranslatable idioms.",
    icon: "✒️",
    color: "rose",
    lessons: [
{
        id: "cecr-c22-rhetoric-m1",
        title: "对偶 : le parallélisme, colonne vertébrale du style",
        titleEn: "对偶: parallelism, the backbone of style",
        duration: 12, locked: false, completed: false,
        hskLevel: 7, hskLevels: [6, 7], category: "writing", difficulty: "superior",
        tags: ["rhetoric", "parallelism", "cecr:c22"],
        introduction: {
          title: "对偶 (duìǒu) : la rhétorique d'équilibre",
          titleEn: "对偶 (parallelism): the rhetoric of balance",
          content: "Le 对偶 (duì'ǒu, parallélisme) est le procédé rhétorique fondamental du chinois classique et soutenu. Deux propositions de longueur égale (souvent 4 ou 7 caractères) se répondent en miroir : même nombre de syllabes, même structure syntaxique, mots de même catégorie grammaticale, tons opposés (平 vs 仄). Ex. : 山重水复疑无路，柳暗花明又一村 (« Montagnes empilées, eaux repliées — je crois qu'il n'y a plus de route / Saules sombres, fleurs brillantes — encore un village »), de Lu You. Autre : 海内存知己，天涯若比邻 (« Tant qu'on a un ami au sein des quatre mers, les confins semblent voisins »), de Wang Bo. Les couplets du Nouvel An 春联 (chūnlián) collés aux portes sont des 对偶. Un article journalistique soutenu ou un discours officiel en contient souvent plusieurs pour marquer la rhétorique.",
          contentEn: "对偶 (parallelism) is the fundamental rhetorical device of classical and formal Chinese. Two clauses of equal length (often 4 or 7 characters) mirror each other: same syllable count, same syntactic structure, same grammatical category words, opposite tones (level vs oblique). Ex.: 山重水复疑无路，柳暗花明又一村 («Mountains piled, waters folded — I think there's no road / Dark willows, bright flowers — yet another village»), by Lu You. Another: 海内存知己，天涯若比邻 («As long as there's a friend within the Four Seas, the ends seem like neighbors»), by Wang Bo. New Year couplets 春联 pasted to doors are 对偶. A formal article or official speech often contains several for rhetorical emphasis.",
          objectives: [
            "Définir 对偶 (structure miroir)",
            "Identifier un parallélisme dans un texte",
            "Composer un 春联 simple",
            "Reconnaître dans un discours"
          ],
          objectivesEn: [
            "Define 对偶 (mirror structure)",
            "Spot a parallelism in a text",
            "Compose a simple 春联",
            "Recognize in a speech"
          ]
        },
        flashcards: ["对偶", "春联", "山重水复", "柳暗花明", "海内存知己", "天涯若比邻"],
        quizQuestions: 8
      },
      {
        id: "cecr-c22-rhetoric-m2",
        title: "比喻, 拟人, 夸张 — les figures du quotidien littéraire",
        titleEn: "比喻, 拟人, 夸张 — everyday literary figures",
        duration: 12, locked: false, completed: false,
        hskLevel: 7, hskLevels: [6, 7], category: "writing", difficulty: "superior",
        tags: ["rhetoric", "figures", "cecr:c22"],
        introduction: {
          title: "Les 3 figures majeures de la prose",
          titleEn: "The 3 major figures of prose",
          content: "比喻 (bǐyù, métaphore/comparaison) : explicite (明喻) avec 像/如/仿佛 (« comme ») — 她像花一样美 (« belle comme une fleur ») ; implicite (暗喻) sans mot de liaison — 她是花 (« elle est une fleur »). Dans le 借喻 (contre-métaphore), le comparé est remplacé directement par le comparant. 拟人 (nǐrén, personnification) prête des traits humains à l'inanimé : 风唱着歌 (« le vent chante »). 夸张 (kuāzhāng, hyperbole) amplifie à l'extrême — 李白 excelle : 白发三千丈 (« mes cheveux blancs ont mille zhang de long »). Une prose C2 sans ces figures sonne plate ; un abus sonne kitsch.",
          contentEn: "比喻 (metaphor/simile): explicit (明喻) with 像/如/仿佛 («like/as») — 她像花一样美 («beautiful like a flower»); implicit (暗喻) without a linking word — 她是花 («she is a flower»). In 借喻 (direct metaphor), the tenor is replaced directly by the vehicle. 拟人 (personification) gives human traits to the inanimate: 风唱着歌 («the wind sings»). 夸张 (hyperbole) amplifies to the extreme — 李白 excels: 白发三千丈 («my white hair is three thousand zhang long»). C2 prose without these figures sounds flat; overuse sounds kitschy.",
          objectives: [
            "Distinguer 明喻 vs 暗喻 vs 借喻",
            "Utiliser 像/如/仿佛",
            "Créer une 拟人 naturelle",
            "Doser la 夸张 sans excès"
          ],
          objectivesEn: [
            "Distinguish 明喻 vs 暗喻 vs 借喻",
            "Use 像/如/仿佛",
            "Craft a natural 拟人",
            "Calibrate 夸张 without excess"
          ]
        },
        flashcards: ["比喻", "明喻", "暗喻", "拟人", "夸张", "像", "如", "仿佛"],
        quizQuestions: 8
      },
      {
        id: "cecr-c22-rhetoric-m3",
        title: "Registres et public — du 大白话 au 书面语",
        titleEn: "Registers and audience — from 大白话 to 书面语",
        duration: 12, locked: false, completed: false,
        hskLevel: 7, hskLevels: [7], category: "writing", difficulty: "superior",
        tags: ["rhetoric", "register", "cecr:c22"],
        introduction: {
          title: "Adapter le niveau de langue à l'auditoire",
          titleEn: "Tailoring language level to audience",
          content: "Le chinois offre un spectre très étendu. 大白话 (dàbáihuà, langage très familier) : 咱们 zánmen (nous incl.), 啥 shá (= 什么), 瞧 qiáo (= 看) — parlé, oral, ton de convivialité. 标准普通话 (biāozhǔn pǔtōnghuà, mandarin standard) : le registre du JT, du manuel scolaire, neutre. 书面语 (shūmiànyǔ) : style écrit, soutenu, avec 该 gāi pour 这, 之 pour 的, phrases longues et structurées. 文言化 (wényánhuà) : fortement teinté de classique, pour discours solennels, articles académiques, calligraphie. Erreur de registre : en écrivant 咱们 dans un rapport d'entreprise (trop oral) ou 之 dans un SMS (trop soutenu), on déclenche malaise. Maîtrise C2 = savoir naviguer sciemment sur le spectre.",
          contentEn: "Chinese offers a very wide spectrum. 大白话 (very casual speech): 咱们 (inclusive we), 啥 (= 什么), 瞧 (= 看) — spoken, oral, chummy tone. 标准普通话 (standard Mandarin): the register of the news, textbook, neutral. 书面语: written, formal, with 该 for 这, 之 for 的, long structured sentences. 文言化: heavily classical-tinged, for solemn speeches, academic articles, calligraphy. Register error: writing 咱们 in a business report (too oral) or 之 in an SMS (too formal) triggers awkwardness. C2 mastery = navigating the spectrum knowingly.",
          objectives: [
            "Identifier 4 registres",
            "Éviter erreurs de registre",
            "Passer de 大白话 à 书面语",
            "Connaître 文言化 solennel"
          ],
          objectivesEn: [
            "Identify 4 registers",
            "Avoid register errors",
            "Shift from casual to formal",
            "Know solemn 文言化"
          ]
        },
        flashcards: ["大白话", "书面语", "普通话", "咱们", "啥", "之"],
        quizQuestions: 8
      },
{
        id: "cecr-c22-translation-m1",
        title: "信达雅 : les 3 critères de Yan Fu",
        titleEn: "信达雅: Yan Fu's 3 criteria",
        duration: 12, locked: false, completed: false,
        hskLevel: 7, hskLevels: [6, 7], category: "writing", difficulty: "superior",
        tags: ["translation", "theory", "cecr:c22"],
        introduction: {
          title: "La devise fondatrice de la traductologie chinoise",
          titleEn: "The founding motto of Chinese translation studies",
          content: "En 1898, le traducteur 严复 (Yán Fù, Yan Fu) formule dans sa préface à la traduction de T.H. Huxley la devise : 信达雅 (xìn-dá-yǎ). 信 (xìn, fidélité) : ne pas trahir le sens. 达 (dá, fluidité) : que le texte coule naturellement dans la langue cible. 雅 (yǎ, élégance) : choisir un registre élevé. Débats modernes : Lu Xun privilégie 信 au prix de 达 (« plutôt dur que déformé »). Nida (États-Unis) conceptualise l'« équivalence dynamique ». En pratique : les 3 critères sont hiérarchisés selon le texte (juridique = 信 prioritaire, poésie = 雅 central). La traduction n'est jamais neutre : chaque choix est un compromis.",
          contentEn: "In 1898, translator 严复 (Yan Fu) formulates in his preface to T.H. Huxley's translation the motto: 信达雅 (xìn-dá-yǎ). 信 (fidelity): don't betray meaning. 达 (fluency): let the text flow naturally in the target language. 雅 (elegance): choose an elevated register. Modern debates: Lu Xun prioritizes 信 over 达 («rather hard than distorted»). Nida (USA) conceptualizes «dynamic equivalence». In practice: the 3 criteria are prioritized by text type (legal = 信 paramount, poetry = 雅 central). Translation is never neutral: each choice is a compromise.",
          objectives: [
            "Définir 信/达/雅",
            "Citer 严复 (1898)",
            "Hiérarchiser selon le texte",
            "Opposer Yan Fu à Lu Xun"
          ],
          objectivesEn: [
            "Define 信/达/雅",
            "Cite 严复 (1898)",
            "Prioritize by text type",
            "Contrast Yan Fu with Lu Xun"
          ]
        },
        flashcards: ["信达雅", "信", "达", "雅", "严复", "翻译"],
        quizQuestions: 8
      },
      {
        id: "cecr-c22-translation-m2",
        title: "Pièges typiques et faux amis",
        titleEn: "Typical pitfalls and false friends",
        duration: 12, locked: false, completed: false,
        hskLevel: 7, hskLevels: [6, 7], category: "writing", difficulty: "superior",
        tags: ["translation", "pitfalls", "cecr:c22"],
        introduction: {
          title: "Les pièges qui piègent TOUJOURS",
          titleEn: "The pitfalls that ALWAYS trap",
          content: "Pièges de traduction FR/EN → chinois : (1) Articles le/la/the n'existent pas en chinois. (2) Pluriels pas marqués sauf via 些/们. (3) Temps grammatical rendu par aspect + adverbe temporel. (4) Pronoms relatifs (qui, que, dont) = subordonnée antéposée avec 的. (5) Polysémie trompeuse : 厉害 = « terrible » ET « formidable » selon contexte ; « funny » anglais = 好玩 (ludique) OU 可笑 (risible). (6) Ordre nom propre : en chinois on dit PAYS + personne avant le nom : 中国著名作家鲁迅 (« le célèbre auteur chinois Lu Xun »). (7) Faux amis : 爱人 (àiren) peut signifier « conjoint » (pas « amant(e) ») ; 同志 (tóngzhì) = « camarade » mais aussi argot pour « homosexuel ». (8) Proverbes : traduire LITTÉRALEMENT un proverbe français en chinois produit une absurdité.",
          contentEn: "FR/EN → Chinese translation pitfalls: (1) Articles le/la/the don't exist in Chinese. (2) Plurals unmarked except via 些/们. (3) Grammatical tense rendered via aspect + time adverb. (4) Relative pronouns (who, that, whose) = pre-posed subordinate clause with 的. (5) Deceptive polysemy: 厉害 = «terrible» AND «great» depending on context; English «funny» = 好玩 (playful) OR 可笑 (laughable). (6) Proper noun order: Chinese says COUNTRY + person before the name: 中国著名作家鲁迅 («the famous Chinese author Lu Xun»). (7) False friends: 爱人 can mean «spouse» (not «lover»); 同志 = «comrade» but also slang for «homosexual». (8) Proverbs: translating a French proverb LITERALLY into Chinese produces absurdity.",
          objectives: [
            "Éviter traduction littérale d'articles",
            "Rendre relatifs avec 的",
            "Désambiguïser 厉害/爱人/同志",
            "Respecter l'ordre nom propre chinois"
          ],
          objectivesEn: [
            "Avoid literal article translation",
            "Render relatives with 的",
            "Disambiguate 厉害/爱人/同志",
            "Respect Chinese proper-noun order"
          ]
        },
        flashcards: ["厉害", "爱人", "同志", "好玩", "可笑", "的", "们"],
        quizQuestions: 8
      },
      {
        id: "cecr-c22-translation-m3",
        title: "L'intraduisible : 缘分, 气, 江湖, 孝",
        titleEn: "The untranslatable: 缘分, 气, 江湖, 孝",
        duration: 12, locked: false, completed: false,
        hskLevel: 7, hskLevels: [7], category: "writing", difficulty: "superior",
        tags: ["translation", "untranslatable", "cecr:c22"],
        introduction: {
          title: "Ces mots qui n'ont pas d'équivalent",
          titleEn: "Words without equivalents",
          content: "Certains concepts n'existent que dans l'univers mental chinois : 缘分 (yuánfèn, « affinité prédestinée » — la rencontre providentielle, idée bouddhiste). 气 (qì, énergie vitale — pas seulement « souffle » mais principe animique). 江湖 (jiānghú, litt. « fleuves et lacs » — monde parallèle des chevaliers errants, codes d'honneur, martial arts ; sens moderne étendu à tous les milieux marginaux). 孝 (xiào, piété filiale — ne se réduit pas au « respect des parents » : tout un système moral). 面子 (on l'a vu, «face»), 关系 (réseau), 委屈 (wěiqu, sensation d'injustice subie sans pouvoir se plaindre), 吃苦 (chīkǔ, « manger l'amer » = endurer les épreuves) — concept-vertu, pas seulement « souffrir ». Traduire = souvent expliquer. Parfois, laisser le mot chinois en italiques est le meilleur choix.",
          contentEn: "Some concepts only exist in the Chinese mental universe: 缘分 («predestined affinity» — providential meeting, Buddhist idea). 气 (vital energy — not just «breath» but animating principle). 江湖 (lit. «rivers and lakes» — parallel world of wandering knights, honor codes, martial arts; modern meaning extends to all marginal milieus). 孝 (filial piety — not just «respect for parents»: a whole moral system). 面子 (face), 关系 (network), 委屈 (feeling of undeserved injustice without being able to complain), 吃苦 («eat the bitter» = endure hardship) — a virtue-concept, not just «suffer». Translating often = explaining. Sometimes, leaving the Chinese word in italics is the best choice.",
          objectives: [
            "Saisir 缘分 (affinité)",
            "Distinguer 气 spirituel vs respiratoire",
            "Contextualiser 江湖",
            "Valoriser 吃苦 comme vertu"
          ],
          objectivesEn: [
            "Grasp 缘分 (affinity)",
            "Distinguish spiritual vs breath 气",
            "Contextualize 江湖",
            "Value 吃苦 as virtue"
          ]
        },
        flashcards: ["缘分", "气", "江湖", "孝", "委屈", "吃苦"],
        quizQuestions: 8
      }
    ]
  },

  {
    id: "cecr-c22-modern-lit",
    name: "Littérature contemporaine chinoise",
    nameEn: "Contemporary Chinese literature",
    description: "Lu Xun à Mo Yan, Liu Cixin, Can Xue.",
    descriptionEn: "Lu Xun to Mo Yan, Liu Cixin, Can Xue.",
    color: "#9F1239",
    icon: "📖",
    lessons: [
      {
        id: "cecr-c22-modern-lit-m1",
        title: "Les années Mao et après : 1949-1989",
        titleEn: "The Mao years and after: 1949-1989",
        duration: 12, locked: false, completed: false,
        hskLevel: 7, hskLevels: [6, 7], category: "culture", difficulty: "superior",
        tags: ["literature", "20th-century", "cecr:c22"],
        introduction: {
          title: "Survivre pour écrire",
          titleEn: "Writing through survival",
          content: "Sous Mao (1949-1976), la littérature est 服务工农兵 (« au service des ouvriers, paysans et soldats »). Écrivains emprisonnés ou réduits au silence. Après 1978 apparaît la 伤痕文学 (shānghén wénxué, « littérature des cicatrices ») qui raconte la Révolution culturelle : 刘心武 《班主任》(1977). Puis 寻根文学 (xúngēn wénxué, « littérature des racines ») retourne aux traditions rurales : 韩少功, 阿城. Années 80 : 余华 (Yú Huá, Yu Hua) écrit 《活着》(Huózhe, « Vivre ! », 1993) — histoire d'un paysan qui perd tout sous les soubresauts du XXe siècle, peut-être le roman chinois contemporain le plus traduit. Adaptation par Zhang Yimou en 1994.",
          contentEn: "Under Mao (1949-1976), literature is 服务工农兵 («in the service of workers, peasants and soldiers»). Writers imprisoned or silenced. After 1978 appears 伤痕文学 («scar literature») telling the Cultural Revolution: 刘心武 《班主任》(1977). Then 寻根文学 («roots literature») returns to rural traditions: 韩少功, 阿城. 80s: 余华 (Yu Hua) writes 《活着》(«To Live», 1993) — story of a peasant who loses everything amid 20th-century upheavals, perhaps the most translated contemporary Chinese novel. Film adaptation by Zhang Yimou in 1994.",
          objectives: [
            "Distinguer 伤痕 vs 寻根",
            "Connaître 余华 et 《活着》",
            "Situer 服务工农兵",
            "Relier au film de 张艺谋"
          ],
          objectivesEn: [
            "Distinguish 伤痕 vs 寻根",
            "Know 余华 and 《活着》",
            "Place 服务工农兵",
            "Link to 张艺谋's film"
          ]
        },
        flashcards: ["伤痕文学", "寻根文学", "余华", "活着", "服务工农兵"],
        quizQuestions: 8
      },
      {
        id: "cecr-c22-modern-lit-m2",
        title: "莫言 : prix Nobel 2012",
        titleEn: "莫言: Nobel Prize 2012",
        duration: 12, locked: false, completed: false,
        hskLevel: 7, hskLevels: [7], category: "culture", difficulty: "superior",
        tags: ["literature", "moyan", "nobel", "cecr:c22"],
        introduction: {
          title: "莫言 : le réalisme hallucinatoire chinois",
          titleEn: "莫言: Chinese hallucinatory realism",
          content: "莫言 (Mò Yán, pseudo signifiant « Ne parle pas », né 1955) reçoit le prix Nobel de littérature en 2012 — premier écrivain de RPC à l'obtenir. Son œuvre phare : 《红高粱家族》(Hóng Gāoliáng Jiāzú, « Le clan du sorgho »), adapté au cinéma par Zhang Yimou en 1988 (Ours d'or à Berlin). Style : « réalisme hallucinatoire » (selon l'Académie Nobel), fusion entre réel, folklore et grotesque — parenté avec García Márquez mais ancré dans le 山东 (Shāndōng) rural. Autres œuvres : 《丰乳肥臀》 (Seins et hanches, 1995), 《生死疲劳》(La dure loi du karma, 2006). Réception internationale enthousiaste, plus contestée en Chine (accusé de complaisance envers le régime).",
          contentEn: "莫言 (Mo Yan, pseudonym meaning «don't speak», born 1955) received the Nobel Prize in Literature in 2012 — first PRC writer to win it. Flagship work: 《红高粱家族》(«Red Sorghum Clan»), adapted by Zhang Yimou in 1988 (Golden Bear in Berlin). Style: «hallucinatory realism» (per Nobel Academy), fusion of real, folklore and grotesque — kinship with García Márquez but anchored in rural 山东 (Shandong). Other works: 《丰乳肥臀》 (Big Breasts and Wide Hips, 1995), 《生死疲劳》(Life and Death Are Wearing Me Out, 2006). Enthusiastic international reception, more contested in China (accused of complacency toward the regime).",
          objectives: [
            "Connaître 莫言 (Nobel 2012)",
            "Citer 《红高粱》et le film",
            "Définir « réalisme hallucinatoire »",
            "Situer 山东 rural"
          ],
          objectivesEn: [
            "Know 莫言 (Nobel 2012)",
            "Cite 《红高粱》 and film",
            "Define «hallucinatory realism»",
            "Place rural 山东"
          ]
        },
        flashcards: ["莫言", "红高粱", "诺贝尔奖", "山东", "生死疲劳"],
        quizQuestions: 8
      },
      {
        id: "cecr-c22-modern-lit-m3",
        title: "刘慈欣 et la SF chinoise",
        titleEn: "刘慈欣 and Chinese sci-fi",
        duration: 12, locked: false, completed: false,
        hskLevel: 7, hskLevels: [6, 7], category: "culture", difficulty: "superior",
        tags: ["literature", "scifi", "liucixin", "cecr:c22"],
        introduction: {
          title: "三体 : la SF chinoise devient globale",
          titleEn: "三体: Chinese SF goes global",
          content: "刘慈欣 (Liú Cíxīn, Liu Cixin, né 1963), ingénieur devenu écrivain, publie 《三体》(Sāntǐ, « Le Problème à trois corps », 2008), puis 《黑暗森林》(2008) et 《死神永生》(2010), formant la trilogie 《地球往事》(Passé de la Terre). Le premier volume obtient le Hugo Award 2015 — événement majeur : une œuvre de SF chinoise devient internationalement iconique. Adaptations : série Tencent 2023, puis Netflix 2024. Concepts introduits dans le vocabulaire général : 黑暗森林 (hēi'àn sēnlín, « forêt noire » — hypothèse d'un cosmos hostile où toute civilisation visible est détruite), 三体文明 (civilisation de Trisolaris). La SF chinoise explose ensuite : Hao Jingfang (Hugo 2016), Chen Qiufan, Xia Jia.",
          contentEn: "刘慈欣 (Liu Cixin, born 1963), an engineer turned writer, publishes 《三体》(«The Three-Body Problem», 2008), then 《黑暗森林》(2008) and 《死神永生》(2010), forming the trilogy 《地球往事》(«Remembrance of Earth's Past»). The first volume wins the 2015 Hugo Award — a major event: a Chinese SF work becomes internationally iconic. Adaptations: Tencent series 2023, then Netflix 2024. Concepts introduced into general vocabulary: 黑暗森林 («dark forest» — hypothesis of a hostile cosmos where every visible civilization is destroyed), 三体文明 (Trisolaran civilization). Chinese SF then explodes: Hao Jingfang (Hugo 2016), Chen Qiufan, Xia Jia.",
          objectives: [
            "Connaître 刘慈欣 et sa trilogie",
            "Comprendre 黑暗森林 (hypothèse)",
            "Citer Hugo 2015 et adaptations",
            "Nommer autres SF chinois"
          ],
          objectivesEn: [
            "Know 刘慈欣 and his trilogy",
            "Understand 黑暗森林 (hypothesis)",
            "Cite Hugo 2015 and adaptations",
            "Name other Chinese SF authors"
          ]
        },
        flashcards: ["刘慈欣", "三体", "黑暗森林", "死神永生", "雨果奖"],
        quizQuestions: 8
      }
    ]
  },
  {
    id: "cecr-c22-dialects",
    name: "Dialectes et variations régionales",
    nameEn: "Dialects and regional variation",
    description: "普通话, 粤语, 上海话, 闽南语.",
    descriptionEn: "普通话, 粤语, 上海话, 闽南语.",
    color: "#065F46",
    icon: "🗺️",
    lessons: [
      {
        id: "cecr-c22-dialects-m1",
        title: "普通话 et sa diffusion",
        titleEn: "普通话 and its spread",
        duration: 12, locked: false, completed: false,
        hskLevel: 6, hskLevels: [5, 6], category: "culture", difficulty: "superior",
        tags: ["dialects", "mandarin", "cecr:c22"],
        introduction: {
          title: "« Langue commune » : comment un dialecte devint la norme",
          titleEn: "«Common tongue»: how one dialect became the norm",
          content: "普通话 (pǔtōnghuà, litt. « langue commune ») = le mandarin standard, fondé sur la prononciation de Pékin, le lexique des dialectes nordiques et la grammaire des œuvres vernaculaires modernes. Promu officiellement en 1956 comme langue nationale de la RPC. À Taïwan : 国语 (Guóyǔ, « langue nationale ») — même base mais prononciation légèrement différente (davantage conservatrice, utilise 注音符号 bopomofo plutôt que pinyin). À Singapour/Malaisie : 华语 (Huáyǔ, « langue sinophone »). Le vocabulaire diffère : 自行车/脚踏车 (vélo), 出租车/计程车/的士 (taxi). Un locuteur de 普通话 comprendra 95% du 国语 et vice-versa. Aujourd'hui, > 80% de la population chinoise parle 普通话, contre ~50% en 1950.",
          contentEn: "普通话 (pǔtōnghuà, lit. «common language») = Standard Mandarin, based on Beijing pronunciation, Northern dialect lexicon, and modern vernacular grammar. Officially promoted in 1956 as the national language of the PRC. In Taiwan: 国语 (Guóyǔ, «national language») — same base but slightly different pronunciation (more conservative, uses 注音符号 bopomofo rather than pinyin). In Singapore/Malaysia: 华语 (Huáyǔ, «Sinophone language»). Vocabulary differs: 自行车/脚踏车 (bike), 出租车/计程车/的士 (taxi). A 普通话 speaker understands 95% of 国语 and vice versa. Today > 80% of China's population speaks 普通话, vs ~50% in 1950.",
          objectives: [
            "Définir 普通话 (origine/base)",
            "Distinguer 普通话/国语/华语",
            "Repérer variations lexicales",
            "Dater la promotion (1956)"
          ],
          objectivesEn: [
            "Define 普通话 (origin/base)",
            "Distinguish 普通话/国语/华语",
            "Spot lexical variations",
            "Date the promotion (1956)"
          ]
        },
        flashcards: ["普通话", "国语", "华语", "注音符号", "自行车", "出租车"],
        quizQuestions: 8
      },
      {
        id: "cecr-c22-dialects-m2",
        title: "粤语 : le cantonais et Hong Kong",
        titleEn: "粤语: Cantonese and Hong Kong",
        duration: 12, locked: false, completed: false,
        hskLevel: 7, hskLevels: [6, 7], category: "culture", difficulty: "superior",
        tags: ["dialects", "cantonese", "cecr:c22"],
        introduction: {
          title: "粤语 : une langue parallèle",
          titleEn: "粤语: a parallel language",
          content: "粤语 (yuèyǔ, cantonais) n'est pas un dialecte du mandarin mais une langue chinoise distincte, parlée à Canton (广州), Hong Kong (香港) et Macao. 6 à 9 tons (vs 4 en mandarin), conserve des consonnes finales -p, -t, -k disparues du mandarin moderne mais présentes en 文言. Un mandarinophone ne comprend PAS le cantonais à l'oral sans apprentissage. Exemples : « bonjour » = 你好 en mandarin (nǐ hǎo) vs 你好 en cantonais (nei5 hou2), « merci » = 谢谢 (xièxie) vs 唔该 (m4 goi1) — le cantonais conserve 唔 (négation classique). À Hong Kong : le 繁体字 (fántǐzì, caractères traditionnels non simplifiés) reste la norme, contrairement au continent. Le cinéma hongkongais (武侠 wǔxiá films) et la cantopop ont diffusé le cantonais mondialement.",
          contentEn: "粤语 (Cantonese) is not a Mandarin dialect but a distinct Chinese language, spoken in Guangzhou (广州), Hong Kong (香港), and Macau. 6 to 9 tones (vs 4 in Mandarin), preserves final -p, -t, -k consonants lost in modern Mandarin but present in 文言. A Mandarin speaker does NOT understand spoken Cantonese without study. Examples: «hello» = 你好 in Mandarin (nǐ hǎo) vs Cantonese (nei5 hou2), «thanks» = 谢谢 (xièxie) vs 唔该 (m4 goi1) — Cantonese preserves 唔 (classical negation). In Hong Kong: 繁体字 (traditional/non-simplified characters) remain the norm, unlike the mainland. Hong Kong cinema (武侠 wuxia films) and Cantopop spread Cantonese worldwide.",
          objectives: [
            "Distinguer 粤语 de 普通话",
            "Compter 6-9 tons du cantonais",
            "Lire 繁体字 vs simplifié",
            "Comprendre 唔该/多谢"
          ],
          objectivesEn: [
            "Distinguish 粤语 from 普通话",
            "Count 6-9 Cantonese tones",
            "Read traditional vs simplified",
            "Understand 唔该/多谢"
          ]
        },
        flashcards: ["粤语", "广州", "香港", "繁体字", "唔该", "武侠"],
        quizQuestions: 8
      },
      {
        id: "cecr-c22-dialects-m3",
        title: "Autres langues sinitiques : 上海话, 闽南语",
        titleEn: "Other Sinitic languages: 上海话, 闽南语",
        duration: 12, locked: false, completed: false,
        hskLevel: 7, hskLevels: [7], category: "culture", difficulty: "superior",
        tags: ["dialects", "wu", "min", "cecr:c22"],
        introduction: {
          title: "La mosaïque sinitique",
          titleEn: "The Sinitic mosaic",
          content: "La Chine compte 7-10 langues chinoises majeures, toutes écrites avec les mêmes caractères mais mutuellement inintelligibles à l'oral : 官话 (guānhuà, mandarin, > 70% des locuteurs), 粤语 (cantonais, 70M), 吴语 (Wúyǔ, inclut 上海话 shanghaïen, 80M), 闽南语 (Mǐnnányǔ, Min du Sud, inclut 台语 Taïwanais et variantes de Fujian, 50M), 客家话 (kèjiāhuà, Hakka, 50M, diaspora), 湘 (xiāng, Hunan), 赣 (gàn, Jiangxi). Taïwan : 60% parlent 台语 (Minnan local) en plus du 国语, langue d'identité après des décennies d'interdiction KMT. Chaque grande ville conserve son propre parler : 北京话 ≠ 普通话 (le pékinois a des expressions distinctives : 您内 pour 您 emphatique). La standardisation par les médias affaiblit les dialectes — enjeu de préservation culturelle.",
          contentEn: "China has 7-10 major Chinese languages, all written with the same characters but mutually unintelligible orally: 官话 (Mandarin, >70% of speakers), 粤语 (Cantonese, 70M), 吴语 (Wu, includes 上海话 Shanghainese, 80M), 闽南语 (Min Nan, Southern Min, includes 台语 Taiwanese and Fujian variants, 50M), 客家话 (Hakka, 50M, diaspora), 湘 (Hunan), 赣 (Jiangxi). Taiwan: 60% speak 台语 (local Minnan) in addition to 国语, an identity language after decades of KMT ban. Every major city keeps its own variant: 北京话 ≠ 普通话 (Beijing speech has distinctive expressions: 您内 for emphatic 您). Media standardization weakens dialects — a cultural preservation issue.",
          objectives: [
            "Cartographier 7 langues chinoises",
            "Situer 吴语 (Shanghai)",
            "Comprendre 闽南/台语 à Taïwan",
            "Expliquer la préservation dialectale"
          ],
          objectivesEn: [
            "Map 7 Chinese languages",
            "Place Wu (Shanghai)",
            "Understand Minnan/Taiwanese",
            "Explain dialect preservation"
          ]
        },
        flashcards: ["上海话", "吴语", "闽南语", "客家话", "台语", "北京话"],
        quizQuestions: 8
      }
    ]
  },
  {
    id: "cecr-c22-global-china",
    name: "Chine mondiale : diplomatie, diaspora, soft power",
    nameEn: "Global China: diplomacy, diaspora, soft power",
    description: "BRI, 华侨, Hanban, films et jeux.",
    descriptionEn: "BRI, 华侨, Hanban, films and games.",
    color: "#1F2937",
    icon: "🌏",
    lessons: [
      {
        id: "cecr-c22-global-china-m1",
        title: "一带一路 et diplomatie post-2013",
        titleEn: "Belt and Road and post-2013 diplomacy",
        duration: 12, locked: false, completed: false,
        hskLevel: 7, hskLevels: [6, 7], category: "culture", difficulty: "superior",
        tags: ["global", "bri", "cecr:c22"],
        introduction: {
          title: "Du 韬光养晦 au 大国外交",
          titleEn: "From 韬光养晦 to Great Power diplomacy",
          content: "Deng Xiaoping énonçait : 韬光养晦 (tāoguāng yǎnghuì, « cacher sa lumière, nourrir l'obscurité » = profil bas, accumulation discrète de force). Depuis Xi Jinping (2013), la doctrine est 大国外交 (dàguó wàijiāo, diplomatie de grande puissance) et 人类命运共同体 (rénlèi mìngyùn gòngtóngtǐ, « communauté de destin pour l'humanité »). Initiative phare : 一带一路 (Yídài Yílù, BRI/Nouvelles Routes de la Soie) — 150+ pays signataires, focus sur infrastructures, corridor 陆上 (land) + 海上 (maritime). Critiques : « piège de la dette », conditions environnementales. Autres termes : 战狼外交 (zhànláng wàijiāo, « diplomatie Wolf Warrior », affirmative, nommée d'après un film), 一个中国 (« Une seule Chine »).",
          contentEn: "Deng Xiaoping stated: 韬光养晦 («hide one's light, nurture obscurity» = low profile, quiet accumulation of strength). Since Xi Jinping (2013), the doctrine is 大国外交 (Great Power diplomacy) and 人类命运共同体 («community of shared destiny for humankind»). Flagship initiative: 一带一路 (BRI/New Silk Roads) — 150+ signatory countries, focus on infrastructure, 陆上 (land) + 海上 (maritime) corridors. Criticisms: «debt trap», environmental conditions. Other terms: 战狼外交 («Wolf Warrior diplomacy», assertive, named after a film), 一个中国 («One China»).",
          objectives: [
            "Opposer 韬光养晦 à 大国外交",
            "Expliquer 一带一路 (chiffres)",
            "Définir 战狼外交",
            "Comprendre 命运共同体"
          ],
          objectivesEn: [
            "Contrast 韬光养晦 vs Great Power",
            "Explain BRI (numbers)",
            "Define Wolf Warrior diplomacy",
            "Understand 命运共同体"
          ]
        },
        flashcards: ["韬光养晦", "大国外交", "一带一路", "战狼外交", "命运共同体"],
        quizQuestions: 8
      },
      {
        id: "cecr-c22-global-china-m2",
        title: "Diaspora : 华侨, 华人, 华裔",
        titleEn: "Diaspora: 华侨, 华人, 华裔",
        duration: 12, locked: false, completed: false,
        hskLevel: 7, hskLevels: [6, 7], category: "culture", difficulty: "superior",
        tags: ["diaspora", "global", "cecr:c22"],
        introduction: {
          title: "60 millions de Chinois hors de Chine",
          titleEn: "60 million Chinese outside China",
          content: "Distinctions essentielles : 华侨 (huáqiáo, Chinois à l'étranger gardant nationalité chinoise), 华人 (huárén, personne d'ascendance chinoise quelle que soit sa nationalité — terme générique), 华裔 (huáyì, descendant chinois d'une autre nationalité, typiquement né à l'étranger). Principaux pôles : 东南亚 (Asie du Sud-Est — Singapour 75% chinois, Malaisie 23%, Indonésie 4%+), 美国 (5M+ dont une Chinatown par grande ville), 澳洲, 欧洲. Histoire des migrations : coolies XIXe (Californie-Gold Rush, Panama, chemins de fer) ; vague 1949 (fuyant le PCC, vers Taïwan et Hong Kong) ; vague post-1978 (étudiants, cols blancs). Vocabulaire culturel : 唐人街 (tángrén jiē, « rue des gens de Tang » = Chinatown), 侨乡 (qiáoxiāng, régions d'origine : Guangdong et Fujian surtout).",
          contentEn: "Essential distinctions: 华侨 (Chinese abroad holding Chinese nationality), 华人 (person of Chinese descent regardless of nationality — generic term), 华裔 (Chinese descendant with another nationality, typically foreign-born). Main hubs: 东南亚 (Southeast Asia — Singapore 75% Chinese, Malaysia 23%, Indonesia 4%+), USA (5M+ with a Chinatown in every major city), Australia, Europe. Migration history: 19th-c coolies (California Gold Rush, Panama, railroads); 1949 wave (fleeing CCP, to Taiwan and Hong Kong); post-1978 wave (students, white-collar). Cultural vocabulary: 唐人街 («Tang people's street» = Chinatown), 侨乡 (regions of origin: Guangdong and Fujian especially).",
          objectives: [
            "Distinguer 华侨/华人/华裔",
            "Nommer les pôles diaspora",
            "Retracer 3 vagues migratoires",
            "Comprendre 唐人街/侨乡"
          ],
          objectivesEn: [
            "Distinguish 华侨/华人/华裔",
            "Name diaspora hubs",
            "Trace 3 migration waves",
            "Understand Chinatown/侨乡"
          ]
        },
        flashcards: ["华侨", "华人", "华裔", "唐人街", "侨乡", "东南亚"],
        quizQuestions: 8
      },
      {
        id: "cecr-c22-global-china-m3",
        title: "Soft power : cinéma, jeux, musique",
        titleEn: "Soft power: cinema, games, music",
        duration: 12, locked: false, completed: false,
        hskLevel: 7, hskLevels: [6, 7], category: "culture", difficulty: "superior",
        tags: ["softpower", "global", "cecr:c22"],
        introduction: {
          title: "La Chine rayonne autrement",
          titleEn: "China radiates differently",
          content: "Soft power 软实力 (ruǎn shílì). Instituts Confucius (孔子学院) — 500+ centres à travers le monde pour enseigner langue/culture (modèle Goethe-Institut). Cinéma : 《哪吒》(Nézhā, 2019) premier film d'animation chinois blockbuster mondial ; 流浪地球 (The Wandering Earth, 2019) démontre la capacité SF. 李子柒 (Lǐ Zǐqī) : youtubeuse ultra-suivie, vie rurale esthétisée, rayonnement culturel organique hors appareil officiel. Jeux vidéo : 原神 (Genshin Impact, MiHoYo) est le premier succès mondial d'un jeu chinois, revenu comparable à Hollywood. TikTok/抖音 : version globale chinoise (ByteDance), change la consommation de médias mondiale. Limites : censure et soupçons diplomatiques freinent l'impact. Le 中国文化 n'a pas encore l'universalité du hollywoodien, mais gagne du terrain.",
          contentEn: "Soft power 软实力. Confucius Institutes (孔子学院) — 500+ centers worldwide teaching language/culture (Goethe-Institut model). Cinema: 《哪吒》(2019) first Chinese animation global blockbuster; 流浪地球 (The Wandering Earth, 2019) demonstrates SF capacity. 李子柒 (Li Ziqi): ultra-followed YouTuber, aestheticized rural life, organic cultural outreach outside official machinery. Video games: 原神 (Genshin Impact, MiHoYo) is the first global success of a Chinese game, revenue comparable to Hollywood. TikTok/抖音: global Chinese version (ByteDance), changes global media consumption. Limits: censorship and diplomatic suspicion slow the impact. 中国文化 doesn't yet have Hollywood universality, but gains ground.",
          objectives: [
            "Définir 软实力",
            "Citer 孔子学院/哪吒/流浪地球",
            "Connaître 李子柒 et 原神",
            "Nuancer l'impact global"
          ],
          objectivesEn: [
            "Define 软实力",
            "Cite Confucius Institutes/Nezha/Wandering Earth",
            "Know 李子柒 and Genshin",
            "Qualify global impact"
          ]
        },
        flashcards: ["软实力", "孔子学院", "哪吒", "流浪地球", "李子柒", "原神", "抖音"],
        quizQuestions: 8
      }
    ]
  }
  // __INSERT_NEXT_PATH_HERE__
];
