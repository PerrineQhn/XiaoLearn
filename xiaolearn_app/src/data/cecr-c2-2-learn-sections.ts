/**
 * cecr-c2-2-learn-sections.ts — contenu pédagogique manuel C2.2
 * (Conversation maîtrise + Nuances ultimes — chengyu, formes paronymes, registre suprême).
 */

import type { LessonV2LearnSection } from '../types/lesson-learn';

// === CONVERSATION C2.2 =======================================================

export const c22ConvM1LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c22-interpretation-simultanee',
    title: 'Interprétation simultanée : techniques pro',
    titleEn: 'Simultaneous interpretation: pro techniques',
    body:
      'Cadre : tu interprètes (FR↔ZH) un orateur en temps réel (cabine ou chuchotage). Vocab : 同声传译 (tóngshēng chuányì, simultanée), 交替传译 (alternée), 译员 (interprète). Techniques : 跟读 (gēndú, suivre la voix avec décalage 3-5 sec), 概括 (gàikuò, résumer si débit trop rapide), 预判 (yùpàn, anticiper la fin de phrase). Phrases utiles : 译员请您稍微放慢一点 (l\'interprète vous prie de ralentir). 该词在中文中没有完全对应 (ce mot n\'a pas d\'équivalent exact). En milieu pro, ne JAMAIS s\'excuser pour une erreur d\'interprétation devant tout le monde — corrige discrètement la phrase suivante. Préparation = 70% du succès : DEMANDE TOUJOURS le glossaire et le PowerPoint à l\'avance.',
    bodyEn:
      'Frame: you interpret (FR↔ZH) a speaker in real time (booth or whispering). Vocab: 同声传译 (simultaneous), 交替传译 (consecutive), 译员 (interpreter). Techniques: 跟读 (follow voice with 3-5 sec lag), 概括 (summarize if pace too fast), 预判 (anticipate sentence end). Useful phrases: 译员请您稍微放慢一点 (interpreter asks you to slow down). 该词在中文中没有完全对应 (this word has no exact equivalent). In pro context, NEVER apologize for an interpretation error in front of everyone — discreetly correct the next sentence. Preparation = 70% of success: ALWAYS REQUEST glossary and PowerPoint in advance.',
    items: [
      { hanzi: '同声传译', pinyin: 'tóng shēng chuán yì', meaning: 'interprétation simultanée', meaningEn: 'simultaneous interpretation', audio: 'audio/hsk6/hsk6_同声.wav' },
      { hanzi: '译员', pinyin: 'yì yuán', meaning: 'interprète', meaningEn: 'interpreter', audio: 'audio/hsk6/hsk6_译员.wav' },
      { hanzi: '概括', pinyin: 'gài kuò', meaning: 'résumer', meaningEn: 'summarize', audio: 'audio/hsk6/hsk6_概括.wav' },
      { hanzi: '预判', pinyin: 'yù pàn', meaning: 'anticiper', meaningEn: 'anticipate', audio: 'audio/hsk6/hsk6_预判.wav' },
      { hanzi: '对应', pinyin: 'duì yìng', meaning: 'correspondance', meaningEn: 'correspondence', audio: 'audio/hsk6/hsk6_对应.wav' }
    ],
    tip:
      'En interprétation simultanée chinois↔français, la SVO chinoise (sujet-verbe-objet) vs la flexibilité française crée un décalage permanent. Astuce des pros : ATTENDS le verbe principal en chinois (souvent à la fin de la subordonnée), puis restitue toute la structure d\'un coup. Sinon tu te retrouves coincé en chemin.',
    tipEn:
      'In zh↔fr simultaneous interpretation, Chinese SVO vs French flexibility creates constant lag. Pro trick: WAIT for the main verb in Chinese (often at the end of the subordinate), then deliver the whole structure at once. Otherwise you get stuck mid-sentence.'
  },
  {
    id: 'c22-glossaire-prep',
    title: 'Préparer un glossaire pour mission d\'interprétation',
    titleEn: 'Prepare a glossary for an interpretation mission',
    body:
      'Étapes : (1) demander le sujet et la liste des intervenants, (2) listing 100-200 termes spécialisés, (3) pré-traduire avec sources fiables, (4) tester la prononciation avec un natif. Formule pour demander : 您能否提前给我会议的议程和参与者名单 ? Vocab interprète : 术语 (shùyǔ, terme spécialisé), 术语库 (base terminologique), 双语对照 (zh↔fr en parallèle). Sources : 联合国术语库, 中国译协 (Translators Association of China). Pour un terme INVENTÉ ou très récent (ex : nouvelle technologie) : 这个词目前没有标准译法，我建议译为 X (pas de standard, je propose X). NE JAMAIS inventer sans signaler — l\'éthique professionnelle exige la transparence.',
    bodyEn:
      'Steps: (1) request topic and speaker list, (2) list 100-200 specialized terms, (3) pre-translate using reliable sources, (4) test pronunciation with a native. Request formula: 您能否提前给我会议的议程和参与者名单？Interpreter vocab: 术语 (specialized term), 术语库 (terminology database), 双语对照 (zh↔fr parallel). Sources: 联合国术语库, 中国译协 (Translators Association of China). For an INVENTED or very recent term (e.g. new tech): 这个词目前没有标准译法，我建议译为 X (no standard, I propose X). NEVER invent without flagging — professional ethics demand transparency.',
    items: [
      { hanzi: '术语', pinyin: 'shù yǔ', meaning: 'terme spécialisé', meaningEn: 'specialized term', audio: 'audio/hsk6/hsk6_术语.wav' },
      { hanzi: '议程', pinyin: 'yì chéng', meaning: 'agenda, programme', meaningEn: 'agenda', audio: 'audio/hsk6/hsk6_议程.wav' },
      { hanzi: '参与者', pinyin: 'cān yù zhě', meaning: 'participant', meaningEn: 'participant', audio: 'audio/hsk6/hsk6_参与.wav' },
      { hanzi: '对照', pinyin: 'duì zhào', meaning: 'comparaison parallèle', meaningEn: 'parallel comparison', audio: 'audio/hsk6/hsk6_对照.wav' },
      { hanzi: '译法', pinyin: 'yì fǎ', meaning: 'manière de traduire', meaningEn: 'way of translating', audio: 'audio/hsk6/hsk6_译法.wav' }
    ],
    tip:
      'Pro tip C2.2 : crée un glossaire collaboratif partagé sur 飞书 (Feishu) ou 腾讯文档 avec les autres interprètes de la mission. La cohérence terminologique entre interprètes = signal de PROFESSIONNALISME maximum. Les organisateurs s\'en souviennent.',
    tipEn:
      'C2.2 pro tip: create a collaborative glossary shared on 飞书 (Feishu) or 腾讯文档 with the other interpreters on the mission. Cross-interpreter terminology consistency = maximum PROFESSIONALISM signal. Organizers remember.'
  }
];

export const c22ConvM2LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c22-cinema-china',
    title: 'Cinéma chinois : analyser un film',
    titleEn: 'Chinese cinema: analyze a film',
    body:
      'Vocab : 导演 (réalisateur), 编剧 (scénariste), 摄影 (directeur photo), 剧情 (intrigue), 情节 (péripétie), 镜头 (plan, prise). Réalisateurs majeurs : 张艺谋 (Zhang Yimou — 红高粱, 大红灯笼高高挂), 陈凯歌 (Chen Kaige — 霸王别姬), 王家卫 (Wong Kar-wai, Hong Kong — 花样年华), 贾樟柯 (Jia Zhangke — 站台). Pour analyser : 这部影片的核心主题是 X (le thème central est X). 镜头语言非常独特 (la grammaire de plans est singulière). 张艺谋早期的色彩美学影响了一代导演 (l\'esthétique colorée du Zhang Yimou des débuts a influencé une génération). Pour situer : 这部电影属于第五代导演的代表作 (relève des œuvres de la Cinquième Génération).',
    bodyEn:
      'Vocab: 导演 (director), 编剧 (screenwriter), 摄影 (DP), 剧情 (plot), 情节 (incident), 镜头 (shot). Major directors: 张艺谋 (Zhang Yimou — Red Sorghum, Raise the Red Lantern), 陈凯歌 (Chen Kaige — Farewell My Concubine), 王家卫 (Wong Kar-wai, Hong Kong — In the Mood for Love), 贾樟柯 (Jia Zhangke — Platform). To analyze: 这部影片的核心主题是 X. 镜头语言非常独特 (the grammar of shots is singular). 张艺谋早期的色彩美学影响了一代导演. To situate: 这部电影属于第五代导演的代表作 (belongs to Fifth Generation works).',
    items: [
      { hanzi: '导演', pinyin: 'dǎo yǎn', meaning: 'réalisateur', meaningEn: 'director', audio: 'audio/hsk5/hsk5_导演.wav' },
      { hanzi: '编剧', pinyin: 'biān jù', meaning: 'scénariste', meaningEn: 'screenwriter', audio: 'audio/hsk6/hsk6_编剧.wav' },
      { hanzi: '镜头', pinyin: 'jìng tóu', meaning: 'plan (cinéma)', meaningEn: 'shot', audio: 'audio/hsk5/hsk5_镜头.wav' },
      { hanzi: '影片', pinyin: 'yǐng piàn', meaning: 'film', meaningEn: 'film', audio: 'audio/hsk5/hsk5_影片.wav' },
      { hanzi: '美学', pinyin: 'měi xué', meaning: 'esthétique', meaningEn: 'aesthetics', audio: 'audio/hsk6/hsk6_美学.wav' }
    ],
    tip:
      'Connaître les générations du cinéma chinois (第五代 = Zhang Yimou, Chen Kaige, années 80 ; 第六代 = Jia Zhangke, années 90, plus indépendant) = signal IMMÉDIAT de connaissance cinéphile. Mentionner « 第五代 » dans la 1re minute d\'une discussion film = respect garanti.',
    tipEn:
      'Knowing Chinese cinema generations (第五代 = Zhang Yimou, Chen Kaige, 80s; 第六代 = Jia Zhangke, 90s, more indie) = IMMEDIATE cinephile signal. Mentioning «第五代» in the first minute of a film discussion = guaranteed respect.'
  },
  {
    id: 'c22-sous-titrage',
    title: 'Sous-titrage : adapter une œuvre',
    titleEn: 'Subtitling: adapt a work',
    body:
      'Contraintes physiques : max 2 lignes, 12-15 caractères chinois ou 35-40 lettres latines, 6 sec à l\'écran max. Vocab : 字幕 (zìmù, sous-titres), 字幕组 (équipe de fansub bénévole), 配音 (pèiyīn, doublage). Techniques : COMPRESSER (couper les hésitations, redites), TRANSCRÉER (adapter une blague culturelle), CONSERVER le ton (formel/familier/dialectal). Pour les blagues : 直译会让观众一头雾水 (la traduction littérale laisserait le spectateur perplexe). Préfère 本地化 (běndìhuà, localisation). Sous-titres officiels (Netflix, Bilibili) suivent des règles strictes ; les 字幕组 prennent plus de libertés. La culture du 字幕组 chinoise (Renren, Yanmo dans les années 2010) a façonné une génération de spectateurs cosmopolites.',
    bodyEn:
      'Physical constraints: max 2 lines, 12-15 Chinese chars or 35-40 Latin letters, 6 sec on screen max. Vocab: 字幕 (subtitles), 字幕组 (volunteer fansub team), 配音 (dubbing). Techniques: COMPRESS (cut hesitations, repetitions), TRANSCREATE (adapt a cultural joke), PRESERVE the tone (formal/casual/dialectal). For jokes: 直译会让观众一头雾水 (literal translation would leave viewer baffled). Prefer 本地化 (localization). Official subtitles (Netflix, Bilibili) follow strict rules; 字幕组 take more liberties. Chinese 字幕组 culture (Renren, Yanmo in the 2010s) shaped a generation of cosmopolitan viewers.',
    items: [
      { hanzi: '字幕', pinyin: 'zì mù', meaning: 'sous-titres', meaningEn: 'subtitles', audio: 'audio/hsk6/hsk6_字幕.wav' },
      { hanzi: '字幕组', pinyin: 'zì mù zǔ', meaning: 'équipe de fansub', meaningEn: 'fansub team', audio: 'audio/hsk6/hsk6_字幕组.wav' },
      { hanzi: '配音', pinyin: 'pèi yīn', meaning: 'doublage', meaningEn: 'dubbing', audio: 'audio/hsk6/hsk6_配音.wav' },
      { hanzi: '本地化', pinyin: 'běn dì huà', meaning: 'localisation', meaningEn: 'localization', audio: 'audio/hsk6/hsk6_本地化.wav' },
      { hanzi: '观众', pinyin: 'guān zhòng', meaning: 'spectateur', meaningEn: 'audience', audio: 'audio/hsk5/hsk5_观众.wav' }
    ],
    tip:
      '« 一头雾水 » (chengyu) = être complètement perdu (lit. tête dans le brouillard). À mémoriser pour décrire la confusion d\'un spectateur ou lecteur. Très expressif et oral. Marque ton niveau de chengyu naturel.',
    tipEn:
      '«一头雾水» (chengyu) = be completely lost (lit. head in the fog). Memorize to describe a viewer/reader\'s confusion. Very expressive and oral. Marks your natural chengyu level.'
  }
];

export const c22ConvM3LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c22-cantonais-survie',
    title: 'Cantonais : phrases de survie pour HK/Canton',
    titleEn: 'Cantonese: survival phrases for HK/Guangzhou',
    body:
      'Cantonais 粤语 (yuèyǔ) parlé par 80M de Chinois (Guangdong + HK + diaspora). Salutations : 你好 = nei5 hou2 (mais à HK on dit souvent 哈囉 hā lōu), 早晨 (zou2 san4, bonjour le matin), 唔該 (m4 goi1, merci/excuse-moi). Au resto : 一個 (yat1 go3, un), 多謝 (do1 ze6, merci pour un cadeau), 唔好意思 (m4 hou2 ji3 si3, désolé). Particularité : 9 tons (vs 4 en mandarin). Caractères traditionnels (繁體字) à HK et Macao, simplifiés (简体字) en Chine continentale. Le cantonais utilise des caractères ABSENTS du mandarin standard : 嘅 (ge, particule possessive = 的), 嗰 (go2, ce/cet = 那个), 唔 (m4, pas = 不). Connaître ces 3 caractères = lire 80% des écrits cantonais informels (Facebook HK, LIHKG).',
    bodyEn:
      'Cantonese 粤语 (yuèyǔ) spoken by 80M Chinese (Guangdong + HK + diaspora). Greetings: 你好 = nei5 hou2 (but in HK often 哈囉 hā lōu), 早晨 (zou2 san4, morning hello), 唔該 (m4 goi1, thanks/excuse me). At restaurant: 一個 (yat1 go3, one), 多謝 (do1 ze6, thanks for a gift), 唔好意思 (m4 hou2 ji3 si3, sorry). Specifics: 9 tones (vs 4 in Mandarin). Traditional characters (繁體字) in HK and Macao, simplified (简体字) in Mainland. Cantonese uses characters ABSENT from standard Mandarin: 嘅 (ge, possessive particle = 的), 嗰 (go2, that = 那个), 唔 (m4, not = 不). Knowing these 3 = reading 80% of informal Cantonese writing (HK Facebook, LIHKG).',
    items: [
      { hanzi: '粤语', pinyin: 'yuè yǔ', meaning: 'cantonais', meaningEn: 'Cantonese', audio: 'audio/hsk6/hsk6_粤语.wav' },
      { hanzi: '繁體字', pinyin: 'fán tǐ zì', meaning: 'caract. traditionnels', meaningEn: 'traditional chars', audio: 'audio/hsk6/hsk6_繁体.wav' },
      { hanzi: '简体字', pinyin: 'jiǎn tǐ zì', meaning: 'caract. simplifiés', meaningEn: 'simplified chars', audio: 'audio/hsk6/hsk6_简体.wav' },
      { hanzi: '唔該', pinyin: 'm4 goi1', meaning: 'merci (cantonais)', meaningEn: 'thanks (Cantonese)', audio: 'audio/hsk6/hsk6_唔.wav' },
      { hanzi: '嘅', pinyin: 'gě', meaning: 'particule possessive (cant.)', meaningEn: 'possessive (cant.)', audio: 'audio/hsk6/hsk6_嘅.wav' }
    ],
    tip:
      'À HK, dire « 唔該 » (m4 goi1) au moindre échange (commande, demande de chemin, paiement) = signal IMMÉDIAT que tu connais les codes locaux. Les Hongkongais apprécient ce minimum d\'effort linguistique, plus encore que de parler cantonais courant.',
    tipEn:
      'In HK, saying «唔該» (m4 goi1) at every exchange (ordering, asking directions, paying) = IMMEDIATE signal you know local codes. Hongkongers appreciate this minimum linguistic effort, even more than fluent Cantonese.'
  },
  {
    id: 'c22-shanghaihua',
    title: 'Shanghainais : reconnaître la 4e ville-langue',
    titleEn: 'Shanghainese: recognize the 4th city-language',
    body:
      'Shanghainais 上海话 (shànghǎihuà) = dialecte du sous-groupe 吴语 (wúyǔ, parlé dans le delta du Yangtze, ~80M locuteurs). Phonologie très différente du mandarin (consonnes voisées, voyelles nasales). Politiquement marginalisé depuis les années 90 par la promotion du putonghua, mais reste vivant à l\'oral familial et dans la culture pop locale. Salutations : 侬好 (nóng hǎo, bonjour, lit. « toi bon »), 谢谢侬 (xiè xiè nóng, merci à toi), 再会 (zài huì, au revoir). Le pronom 侬 (nóng) = tu shanghaien (≠ 你 standard). Vocabulaire spécifique : 阿拉 (ālā, nous), 老克勒 (lǎokèlè, gentleman cosmopolite — clin d\'œil à la modernité shanghaienne des années 30). Reconnaître le shanghaien à l\'oreille = signe de fin connaisseur de la culture régionale chinoise.',
    bodyEn:
      'Shanghainese 上海话 = dialect of the 吴语 (wúyǔ) subgroup, spoken in the Yangtze delta, ~80M speakers. Phonology very different from Mandarin (voiced consonants, nasal vowels). Politically marginalized since the 90s by Putonghua promotion, but stays alive in family speech and local pop culture. Greetings: 侬好 (nóng hǎo, hello, lit. «you good»), 谢谢侬 (xiè xiè nóng, thanks to you), 再会 (zài huì, goodbye). Pronoun 侬 (nóng) = Shanghainese «you» (≠ standard 你). Specific vocab: 阿拉 (ālā, we), 老克勒 (lǎokèlè, cosmopolitan gentleman — nod to 1930s Shanghai modernity). Recognizing Shanghainese by ear = sign of fine connoisseur of Chinese regional culture.',
    items: [
      { hanzi: '上海话', pinyin: 'shàng hǎi huà', meaning: 'shanghainais', meaningEn: 'Shanghainese', audio: 'audio/hsk6/hsk6_上海话.wav' },
      { hanzi: '吴语', pinyin: 'wú yǔ', meaning: 'famille wu', meaningEn: 'Wu language family', audio: 'audio/hsk6/hsk6_吴语.wav' },
      { hanzi: '侬', pinyin: 'nóng', meaning: 'tu (shanghaien)', meaningEn: 'you (Shanghainese)', audio: 'audio/hsk6/hsk6_侬.wav' },
      { hanzi: '阿拉', pinyin: 'ā lā', meaning: 'nous (shanghaien)', meaningEn: 'we (Shanghainese)', audio: 'audio/hsk6/hsk6_阿拉.wav' },
      { hanzi: '方言', pinyin: 'fāng yán', meaning: 'dialecte', meaningEn: 'dialect', audio: 'audio/hsk6/hsk6_方言.wav' }
    ],
    tip:
      'À Shanghai, complimente la culture locale par « 阿拉上海好嗲 » (notre Shanghai est si chic — 嗲 diǎ est le mot star du shanghaien pour « chic, exquis »). Effet immédiat : sourires + sympathie. Adresse seulement à des Shanghaiens d\'origine, sinon ça sonne forcé.',
    tipEn:
      'In Shanghai, compliment local culture with «阿拉上海好嗲» (our Shanghai is so chic — 嗲 diǎ is the star Shanghainese word for «chic, exquisite»). Immediate effect: smiles + warmth. Address only native Shanghainese, otherwise it sounds forced.'
  }
];

export const c22ConvM4LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c22-litterature-contemporaine',
    title: 'Discuter la littérature chinoise contemporaine',
    titleEn: 'Discuss contemporary Chinese literature',
    body:
      'Vagues majeures : 伤痕文学 (littérature des cicatrices, post-révolution culturelle, années 80) → 寻根文学 (recherche des racines) → 先锋文学 (avant-garde) → 新写实 (néo-réalisme) → 网络文学 (littérature en ligne, depuis 2000). Auteurs essentiels C2.2 : 莫言 (Mo Yan, Nobel 2012, réalisme magique 红高粱), 余华 (Yu Hua, 活着), 阎连科 (Yan Lianke, 受活), 王安忆 (Wang Anyi, 长恨歌), 韩少功 (Han Shaogong), 苏童 (Su Tong). Femmes : 王安忆, 张悦然, 残雪. Phrase pour analyser : 这部作品反映了一个时代的集体记忆 (cette œuvre reflète la mémoire collective d\'une époque). Pour situer politiquement : 这部作品在当时是 X (cette œuvre était X à son époque — censurée, contestée, applaudie).',
    bodyEn:
      'Major waves: 伤痕文学 (scar literature, post-Cultural Revolution, 80s) → 寻根文学 (root-seeking) → 先锋文学 (avant-garde) → 新写实 (neo-realism) → 网络文学 (online literature, since 2000). Essential C2.2 authors: 莫言 (Mo Yan, Nobel 2012, magic realism Red Sorghum), 余华 (Yu Hua, To Live), 阎连科 (Yan Lianke, Lenin\'s Kisses), 王安忆 (Wang Anyi, Song of Everlasting Sorrow), 韩少功 (Han Shaogong), 苏童 (Su Tong). Women: 王安忆, 张悦然, 残雪. To analyze: 这部作品反映了一个时代的集体记忆 (this work reflects an era\'s collective memory). To situate politically: 这部作品在当时是 X (this work was X at the time — censored, contested, applauded).',
    items: [
      { hanzi: '伤痕', pinyin: 'shāng hén', meaning: 'cicatrice', meaningEn: 'scar', audio: 'audio/hsk6/hsk6_伤痕.wav' },
      { hanzi: '集体', pinyin: 'jí tǐ', meaning: 'collectif', meaningEn: 'collective', audio: 'audio/hsk5/hsk5_集体.wav' },
      { hanzi: '记忆', pinyin: 'jì yì', meaning: 'mémoire', meaningEn: 'memory', audio: 'audio/hsk5/hsk5_记忆.wav' },
      { hanzi: '反映', pinyin: 'fǎn yìng', meaning: 'refléter', meaningEn: 'reflect', audio: 'audio/hsk5/hsk5_反映.wav' },
      { hanzi: '时代', pinyin: 'shí dài', meaning: 'époque', meaningEn: 'era', audio: 'audio/hsk5/hsk5_时代.wav' }
    ],
    tip:
      'Pour parler de la 文革 (Révolution culturelle) avec un Chinois : utilise 那个特殊的年代 (cette époque particulière) plutôt que 文革 directement. Sujet sensible — l\'euphémisme respecte la pudeur sociale. Beaucoup de famille ont des cicatrices, parler avec délicatesse est CULTURELLEMENT attendu.',
    tipEn:
      'To speak of the 文革 (Cultural Revolution) with a Chinese: use 那个特殊的年代 (that particular era) rather than 文革 directly. Sensitive subject — the euphemism respects social modesty. Many families have scars, speaking with delicacy is CULTURALLY expected.'
  },
  {
    id: 'c22-litterature-net',
    title: 'Littérature en ligne : phénomène 2000s+',
    titleEn: 'Online literature: 2000s+ phenomenon',
    body:
      'La 网络文学 (wǎngluò wénxué) chinoise est UN phénomène mondial unique. Plateforme dominante : 起点中文网 (Qidian, fondé 2002). Genres : 玄幻 (xuánhuàn, fantasy + arts martiaux), 都市 (dūshì, romance urbaine), 修仙 (xiūxiān, immortalité taoïste), 穿越 (chuānyuè, voyage temporel — souvent une héroïne moderne envoyée dans une dynastie), 末世 (mòshì, post-apo). Modèle économique : auteurs publient 1 chapitre/jour de 3000 caractères, lecteurs paient via micro-transactions. Phénomène : exporté en anglais (Webnovel/Wuxiaworld), influence l\'écriture pop mondiale. Pour discuter : 网络文学已成为中国文学的重要部分，不容忽视 (la litté en ligne est devenue une partie importante de la litté chinoise, qu\'on ne peut ignorer). 不容忽视 = formule d\'analyse soutenue.',
    bodyEn:
      'Chinese 网络文学 (online literature) is a unique global phenomenon. Dominant platform: 起点中文网 (Qidian, founded 2002). Genres: 玄幻 (fantasy + martial arts), 都市 (urban romance), 修仙 (Taoist immortality), 穿越 (time travel — often a modern heroine sent to a dynasty), 末世 (post-apo). Business model: authors publish 1 chapter/day of 3000 chars, readers pay via micro-transactions. Phenomenon: exported in English (Webnovel/Wuxiaworld), influences global pop writing. To discuss: 网络文学已成为中国文学的重要部分，不容忽视 (online lit has become an important part of Chinese literature that cannot be ignored). 不容忽视 = formal analytic formula.',
    items: [
      { hanzi: '网络', pinyin: 'wǎng luò', meaning: 'réseau, internet', meaningEn: 'network', audio: 'audio/hsk5/hsk5_网络.wav' },
      { hanzi: '玄幻', pinyin: 'xuán huàn', meaning: 'fantasy chinoise', meaningEn: 'Chinese fantasy', audio: 'audio/hsk6/hsk6_玄幻.wav' },
      { hanzi: '修仙', pinyin: 'xiū xiān', meaning: 'cultiver l\'immortalité', meaningEn: 'cultivate immortality', audio: 'audio/hsk6/hsk6_修仙.wav' },
      { hanzi: '穿越', pinyin: 'chuān yuè', meaning: 'voyage temporel', meaningEn: 'time travel', audio: 'audio/hsk6/hsk6_穿越.wav' },
      { hanzi: '不容忽视', pinyin: 'bù róng hū shì', meaning: 'qu\'on ne peut ignorer', meaningEn: 'cannot be ignored', audio: 'audio/hsk6/hsk6_不容.wav' }
    ],
    tip:
      'En 2026, la 网络文学 chinoise est UN soft power culturel. Les jeunes occidentaux découvrent le 修仙 / 玄幻 via Wuxiaworld + Webnovel. Si tu peux DISCUTER cela en chinois (auteurs comme 唐家三少, 我吃西红柿), tu signales une connaissance de la culture jeune chinoise très précieuse.',
    tipEn:
      'In 2026, Chinese 网络文学 is a cultural soft power. Western youth discover 修仙 / 玄幻 via Wuxiaworld + Webnovel. If you can DISCUSS this in Chinese (authors like 唐家三少, 我吃西红柿), you signal valuable knowledge of Chinese youth culture.'
  }
];

export const c22ConvM5LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c22-mentor-coach',
    title: 'Devenir mentor / coach pour un junior',
    titleEn: 'Become a mentor / coach for a junior',
    body:
      'Cadre : un junior chinois te demande conseil sur sa carrière. Position : 我把你当作朋友，分享我的经验 (je te traite en ami et partage mon expérience). Vocab : 导师 (dǎoshī, mentor), 指导 (zhǐdǎo, orienter), 反馈 (fǎnkuì, feedback). Phrase à éviter : « 你应该 X » (trop directif). Préfère : 你可以考虑 X / 一种思路是 X. Question pour faire réfléchir : 你自己是怎么想的 ? (toi, qu\'en penses-tu ?). Encourager : 我相信你的判断 (j\'ai confiance en ton jugement). Le 导师 chinois respecte l\'AUTONOMIE — guide sans imposer. Différence avec le 师傅 (shīfu, maître artisan) qui transmet une technique précise. 师傅 = obéissance ; 导师 = dialogue.',
    bodyEn:
      'Frame: a Chinese junior asks for career advice. Stance: 我把你当作朋友，分享我的经验 (I treat you as a friend and share my experience). Vocab: 导师 (mentor), 指导 (guide), 反馈 (feedback). Phrase to avoid: «你应该 X» (too directive). Prefer: 你可以考虑 X / 一种思路是 X. Reflection-prompting question: 你自己是怎么想的？(what do YOU think?). Encourage: 我相信你的判断 (I trust your judgment). The Chinese 导师 respects AUTONOMY — guides without imposing. Difference with 师傅 (shīfu, master artisan) who transmits a precise technique. 师傅 = obedience; 导师 = dialogue.',
    items: [
      { hanzi: '导师', pinyin: 'dǎo shī', meaning: 'mentor', meaningEn: 'mentor', audio: 'audio/hsk6/hsk6_导师.wav' },
      { hanzi: '指导', pinyin: 'zhǐ dǎo', meaning: 'orienter', meaningEn: 'guide', audio: 'audio/hsk5/hsk5_指导.wav' },
      { hanzi: '反馈', pinyin: 'fǎn kuì', meaning: 'feedback', meaningEn: 'feedback', audio: 'audio/hsk6/hsk6_反馈.wav' },
      { hanzi: '思路', pinyin: 'sī lù', meaning: 'piste de pensée', meaningEn: 'line of thought', audio: 'audio/hsk6/hsk6_思路.wav' },
      { hanzi: '判断', pinyin: 'pàn duàn', meaning: 'jugement', meaningEn: 'judgment', audio: 'audio/hsk5/hsk5_判断.wav' }
    ],
    tip:
      'Le mentor chinois moderne EVITE la phrase classique 师傅领进门，修行在个人 (le maître mène à la porte, le travail est personnel) avec un junior moderne — perçu comme distant. Préfère 我陪你一起摸索 (cherchons ensemble). Co-construction > hiérarchie verticale.',
    tipEn:
      'The modern Chinese mentor AVOIDS the classic phrase 师傅领进门，修行在个人 (the master leads to the door, the work is personal) with a modern junior — feels distant. Prefer 我陪你一起摸索 (let\'s explore together). Co-construction > vertical hierarchy.'
  },
  {
    id: 'c22-feedback-radical',
    title: 'Donner un feedback honnête à un Chinois',
    titleEn: 'Give honest feedback to a Chinese',
    body:
      'PIÈGE culturel : le feedback direct (style américain) blesse le 面子. Mais le feedback TROP doux (style chinois traditionnel) ne fait pas avancer. Solution C2.2 : sandwich + question + co-construction. Étapes : (1) reconnaître les forces (你这个 X 做得很好), (2) poser une question (你自己觉得 Y 部分怎么样 ?), (3) suggérer (我觉得如果这样调整 Z 会更好), (4) inviter à la discussion (你怎么看 ?). NE JAMAIS : « 你这里错了 » (tu t\'es trompé ici). Préfère : « 我们能不能换一个角度看 X » (peut-on regarder X sous un autre angle). Le mot 调整 (tiáozhěng, ajuster) est moins blessant que 改 (gǎi, corriger).',
    bodyEn:
      'Cultural TRAP: direct feedback (American style) hurts 面子. But TOO soft feedback (traditional Chinese style) doesn\'t push forward. C2.2 solution: sandwich + question + co-construction. Steps: (1) recognize strengths (你这个 X 做得很好), (2) ask a question (你自己觉得 Y 部分怎么样？), (3) suggest (我觉得如果这样调整 Z 会更好), (4) invite discussion (你怎么看？). NEVER: «你这里错了» (you got it wrong here). Prefer: «我们能不能换一个角度看 X» (can we look at X from another angle). The word 调整 (adjust) is less hurtful than 改 (correct).',
    items: [
      { hanzi: '调整', pinyin: 'tiáo zhěng', meaning: 'ajuster', meaningEn: 'adjust', audio: 'audio/hsk5/hsk5_调整.wav' },
      { hanzi: '角度', pinyin: 'jiǎo dù', meaning: 'angle, perspective', meaningEn: 'angle', audio: 'audio/hsk5/hsk5_角度.wav' },
      { hanzi: '换', pinyin: 'huàn', meaning: 'changer', meaningEn: 'change', audio: 'audio/hsk3/hsk3_换.wav' },
      { hanzi: '部分', pinyin: 'bù fèn', meaning: 'partie', meaningEn: 'part', audio: 'audio/hsk3/hsk3_部分.wav' },
      { hanzi: '建议', pinyin: 'jiàn yì', meaning: 'suggestion', meaningEn: 'suggestion', audio: 'audio/hsk3/hsk3_建议.wav' }
    ],
    tip:
      'Magic question pour pousser l\'auto-correction : « 如果你重新做一次，会有什么不一样 ? » (si tu refaisais, qu\'est-ce qui serait différent ?). Force la personne à VERBALISER ses propres améliorations sans que tu aies à les pointer. Ultime feedback 100% face-saving.',
    tipEn:
      'Magic question to prompt self-correction: «如果你重新做一次，会有什么不一样？» (if you redid it, what would be different?). Forces the person to VERBALIZE their own improvements without you pointing them out. Ultimate 100% face-saving feedback.'
  }
];

export const c22ConvM6LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c22-dialogue-interculturel',
    title: 'Dialogue interculturel approfondi',
    titleEn: 'Deep intercultural dialogue',
    body:
      'Cadre : conversation longue avec un Chinois cultivé sur les différences fondamentales Chine/Occident. Vocab : 文化差异 (différence culturelle), 文化冲突 (choc culturel), 文化融合 (fusion), 西方 (Occident), 东方 (Orient). Pour énoncer une différence : 在中国，X 通常被视为 Y，而在西方可能不同 (en Chine, X est généralement vu comme Y, alors qu\'en Occident il en va peut-être autrement). 被视为 (est vu comme) sonne soutenu et neutre. Éviter le binaire simpliste : 但其实 X 也存在 Y 的情况 (mais en réalité X peut aussi être Y). NE JAMAIS dire « 中国人都… » (généralisation). Préfère « 很多中国人 » (beaucoup de Chinois). Conclure : 跨文化理解需要时间和耐心 (la compréhension interculturelle demande du temps et de la patience).',
    bodyEn:
      'Frame: long conversation with a cultured Chinese on fundamental China/West differences. Vocab: 文化差异 (cultural difference), 文化冲突 (clash), 文化融合 (fusion), 西方 (West), 东方 (East). To state a difference: 在中国，X 通常被视为 Y，而在西方可能不同 (in China, X is usually viewed as Y, while in the West it may differ). 被视为 (is viewed as) sounds formal and neutral. Avoid simplistic binary: 但其实 X 也存在 Y 的情况 (but actually X can also be Y). NEVER say «中国人都…» (generalization). Prefer «很多中国人» (many Chinese). Close: 跨文化理解需要时间和耐心 (intercultural understanding requires time and patience).',
    items: [
      { hanzi: '差异', pinyin: 'chā yì', meaning: 'différence', meaningEn: 'difference', audio: 'audio/hsk5/hsk5_差异.wav' },
      { hanzi: '冲突', pinyin: 'chōng tū', meaning: 'conflit, choc', meaningEn: 'conflict', audio: 'audio/hsk5/hsk5_冲突.wav' },
      { hanzi: '融合', pinyin: 'róng hé', meaning: 'fusion', meaningEn: 'fusion', audio: 'audio/hsk6/hsk6_融合.wav' },
      { hanzi: '被视为', pinyin: 'bèi shì wéi', meaning: 'être vu comme', meaningEn: 'be viewed as', audio: 'audio/hsk6/hsk6_视为.wav' },
      { hanzi: '跨文化', pinyin: 'kuà wén huà', meaning: 'interculturel', meaningEn: 'cross-cultural', audio: 'audio/hsk6/hsk6_跨.wav' }
    ],
    tip:
      'En dialogue interculturel C2.2, ÉVITE la formule « 我们外国人觉得 X » (nous étrangers pensons X) — sonne paternaliste. Préfère « 我个人的观察是 X » (mon observation personnelle est X). L\'individualisation du propos évite la généralisation et respecte la complexité.',
    tipEn:
      'In C2.2 intercultural dialogue, AVOID the formula «我们外国人觉得 X» (we foreigners think X) — sounds paternalistic. Prefer «我个人的观察是 X» (my personal observation is X). Individualizing the point avoids generalization and respects complexity.'
  },
  {
    id: 'c22-soft-power-discours',
    title: 'Discours sur le soft power chinois',
    titleEn: 'Discourse on Chinese soft power',
    body:
      'Cadre : prise de parole sur la place de la Chine dans le monde. Vocab : 软实力 (ruǎn shílì, soft power), 文化输出 (exportation culturelle), 国际形象 (image internationale), 话语权 (huàyǔquán, droit de parole / leverage discursif). 话语权 est UN concept clé en analyse géopolitique chinoise — qui CONTRÔLE le récit. Phrases : 中国正在努力构建自己的话语体系 (la Chine construit son propre système discursif). Pour discuter : 中国的软实力还在起步阶段，但发展迅速 (le soft power chinois est en démarrage mais croît vite). Exemples : 孔子学院, TikTok, 哪吒, 原神, 李子柒. Limites : 但西方对中国的认知仍存在偏见 (mais la perception occidentale de la Chine reste biaisée). Conclure : 文化的影响力需要长期积累 (l\'influence culturelle s\'accumule sur le long terme).',
    bodyEn:
      'Frame: speaking on China\'s place in the world. Vocab: 软实力 (soft power), 文化输出 (cultural export), 国际形象 (international image), 话语权 (huàyǔquán, discursive leverage). 话语权 is a KEY concept in Chinese geopolitical analysis — who CONTROLS the narrative. Phrases: 中国正在努力构建自己的话语体系 (China is building its own discursive system). To discuss: 中国的软实力还在起步阶段，但发展迅速 (Chinese soft power is starting but growing fast). Examples: 孔子学院, TikTok, 哪吒, 原神, 李子柒. Limits: 但西方对中国的认知仍存在偏见 (but Western perception of China remains biased). Close: 文化的影响力需要长期积累 (cultural influence accumulates long-term).',
    items: [
      { hanzi: '软实力', pinyin: 'ruǎn shí lì', meaning: 'soft power', meaningEn: 'soft power', audio: 'audio/hsk6/hsk6_软实力.wav' },
      { hanzi: '话语权', pinyin: 'huà yǔ quán', meaning: 'leverage discursif', meaningEn: 'discursive power', audio: 'audio/hsk6/hsk6_话语权.wav' },
      { hanzi: '体系', pinyin: 'tǐ xì', meaning: 'système', meaningEn: 'system', audio: 'audio/hsk6/hsk6_体系.wav' },
      { hanzi: '认知', pinyin: 'rèn zhī', meaning: 'perception, cognition', meaningEn: 'perception', audio: 'audio/hsk6/hsk6_认知.wav' },
      { hanzi: '偏见', pinyin: 'piān jiàn', meaning: 'préjugé', meaningEn: 'prejudice', audio: 'audio/hsk6/hsk6_偏见.wav' }
    ],
    tip:
      '« 话语权 » est UN concept à manier avec précaution. Trop souvent utilisé en chinois, il peut sonner paranoïaque/défensif. À l\'oral, préfère 影响力 (influence) qui est plus neutre. Réserve 话语权 aux écrits stratégiques ou aux discussions sérieuses de géopolitique.',
    tipEn:
      '«话语权» is a concept to handle with care. Overused in Chinese, it can sound paranoid/defensive. In speech, prefer 影响力 (influence) which is more neutral. Reserve 话语权 for strategic writing or serious geopolitical discussions.'
  }
];

export const c22ConvM7LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c22-debat-ethique-IA',
    title: 'Débat éthique : IA et société chinoise',
    titleEn: 'Ethical debate: AI and Chinese society',
    body:
      'Vocab : 人工智能 (rénGōng zhìnéng, IA), 算法 (suànfǎ, algorithme), 监控 (jiānkòng, surveillance), 隐私 (yǐnsī, vie privée), 伦理 (lúnlǐ, éthique). Position pro-IA chinoise : AI accélère le développement, optimise les services publics. Position critique : 算法歧视 (algorithm bias), 监控社会 (surveillance society), 隐私泄露 (data leak). Phrases-types : 在效率和隐私之间，我们需要找到平衡 (entre efficacité et vie privée, il faut trouver l\'équilibre). 算法不是中立的 (les algorithmes ne sont pas neutres). Pour nuancer la spécificité chinoise : 中国和西方对隐私的理解有所不同 (Chine et Occident ont une compréhension différente de la vie privée). Cadre légal : 个人信息保护法 (PIPL, 2021, équivalent du RGPD chinois). Conclure : 技术发展需要伦理边界 (le développement tech a besoin de frontières éthiques).',
    bodyEn:
      'Vocab: 人工智能 (AI), 算法 (algorithm), 监控 (surveillance), 隐私 (privacy), 伦理 (ethics). Pro-AI Chinese stance: AI accelerates development, optimizes public services. Critical stance: 算法歧视 (algorithm bias), 监控社会 (surveillance society), 隐私泄露 (data leak). Set phrases: 在效率和隐私之间，我们需要找到平衡 (between efficiency and privacy, find balance). 算法不是中立的 (algorithms aren\'t neutral). To nuance Chinese specificity: 中国和西方对隐私的理解有所不同 (China and the West have different understandings of privacy). Legal frame: 个人信息保护法 (PIPL, 2021, Chinese GDPR equivalent). Close: 技术发展需要伦理边界 (tech development needs ethical limits).',
    items: [
      { hanzi: '人工智能', pinyin: 'rén gōng zhì néng', meaning: 'IA', meaningEn: 'AI', audio: 'audio/hsk6/hsk6_人工智能.wav' },
      { hanzi: '算法', pinyin: 'suàn fǎ', meaning: 'algorithme', meaningEn: 'algorithm', audio: 'audio/hsk6/hsk6_算法.wav' },
      { hanzi: '监控', pinyin: 'jiān kòng', meaning: 'surveillance', meaningEn: 'surveillance', audio: 'audio/hsk6/hsk6_监控.wav' },
      { hanzi: '隐私', pinyin: 'yǐn sī', meaning: 'vie privée', meaningEn: 'privacy', audio: 'audio/hsk6/hsk6_隐私.wav' },
      { hanzi: '伦理', pinyin: 'lún lǐ', meaning: 'éthique', meaningEn: 'ethics', audio: 'audio/hsk6/hsk6_伦理.wav' }
    ],
    tip:
      '« 在效率和隐私之间，我们需要找到平衡 » est la phrase neutre/centriste sur l\'IA en Chine. Elle évite à la fois l\'apologétique pro-tech ET la critique frontale du modèle chinois. Sécurise la conversation tout en montrant ta réflexion.',
    tipEn:
      '«在效率和隐私之间，我们需要找到平衡» is the neutral/centrist phrase on AI in China. Avoids both pro-tech apologetics AND frontal criticism of the Chinese model. Secures the conversation while showing your reflection.'
  },
  {
    id: 'c22-clore-relations',
    title: 'Adieu : clore une relation pro avec dignité',
    titleEn: 'Farewell: close a pro relationship with dignity',
    body:
      'Cadre : tu quittes un poste / une mission / un pays après plusieurs années en Chine. Phrase d\'ouverture : 我有一件事要告诉大家 (j\'ai quelque chose à vous annoncer). Annoncer : 经过深思熟虑，我决定 X (après mûre réflexion, j\'ai décidé X). Remercier : 这些年，承蒙各位的关照和帮助 (ces années, grâce à votre attention et soutien — 承蒙 chéngméng = recevoir avec gratitude, TRÈS soutenu). Vocab : 关照 (guānzhào, prendre soin), 厚爱 (hòu\'ài, profonde affection). Promesse de continuité : 即使离开，我们的友谊不会变 (même en partant, notre amitié reste). Engagement futur : 以后还请多联系 (gardons le contact). Conclure : 山高水长，后会有期 (les montagnes hautes et l\'eau longue, on se reverra) — chengyu d\'adieu noble.',
    bodyEn:
      'Frame: leaving a post / mission / country after years in China. Opening: 我有一件事要告诉大家 (I have something to announce). Announce: 经过深思熟虑，我决定 X (after careful reflection, I decided X). Thank: 这些年，承蒙各位的关照和帮助 (these years, thanks to your care and help — 承蒙 chéngméng = receive with gratitude, VERY formal). Vocab: 关照 (take care of), 厚爱 (deep affection). Continuity promise: 即使离开，我们的友谊不会变 (even leaving, our friendship remains). Future commitment: 以后还请多联系 (let\'s stay in touch). Close: 山高水长，后会有期 (high mountains and long waters, we\'ll meet again) — noble farewell chengyu.',
    items: [
      { hanzi: '深思熟虑', pinyin: 'shēn sī shú lǜ', meaning: 'mûre réflexion', meaningEn: 'careful thought', audio: 'audio/hsk6/hsk6_深思.wav' },
      { hanzi: '承蒙', pinyin: 'chéng méng', meaning: 'recevoir avec gratitude', meaningEn: 'receive with gratitude', audio: 'audio/hsk6/hsk6_承蒙.wav' },
      { hanzi: '关照', pinyin: 'guān zhào', meaning: 'prendre soin', meaningEn: 'take care', audio: 'audio/hsk5/hsk5_关照.wav' },
      { hanzi: '厚爱', pinyin: 'hòu ài', meaning: 'profonde affection', meaningEn: 'deep affection', audio: 'audio/hsk6/hsk6_厚爱.wav' },
      { hanzi: '后会有期', pinyin: 'hòu huì yǒu qī', meaning: 'on se reverra', meaningEn: 'we\'ll meet again', audio: 'audio/hsk6/hsk6_后会.wav' }
    ],
    tip:
      'Le chengyu « 山高水长，后会有期 » est l\'adieu littéraire ULTIME en chinois. Aussi élégant que « gardons contact » + porté par 1500 ans de tradition. À utiliser dans un discours d\'adieu pro/personnel pour clôturer noblement. Effet émotionnel garanti.',
    tipEn:
      'The chengyu «山高水长，后会有期» is the ULTIMATE literary farewell in Chinese. As elegant as «let\'s stay in touch» + carried by 1500 years of tradition. Use in a pro/personal farewell speech to close nobly. Guaranteed emotional effect.'
  }
];

// === NUANCES C2.2 ============================================================

export const c22NuancesM1LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c22-shi-jian-shi-hou',
    title: '时间 vs 时候 vs 时刻 vs 时机 — temps (4 dimensions)',
    titleEn: '时间 vs 时候 vs 时刻 vs 时机 — time (4 dimensions)',
    body:
      '时间 (shíjiān) = TEMPS abstrait/durée, ressource. 时间不够 (pas assez de temps). Le plus universel. 时候 (shíhòu) = MOMENT spécifique (quand quelque chose se passe). 我小的时候 (quand j\'étais petit). Plus quotidien et oral. 时刻 (shíkè) = INSTANT précis, moment crucial. 关键时刻 (moment crucial). Connote l\'IMPORTANCE. 时机 (shíjī) = OPPORTUNITÉ, conjoncture favorable. 抓住时机 (saisir l\'opportunité). Connote la STRATÉGIE. Hierarchy : 时间 (durée) ≠ 时候 (moment) ≠ 时刻 (instant crucial) ≠ 时机 (opportunité). Erreur classique : confondre 时候 (descriptif) et 时机 (stratégique). « 这个时候 » = à ce moment ; « 这个时机 » = cette opportunité.',
    bodyEn:
      '时间 (shíjiān) = abstract TIME/duration, resource. 时间不够 (not enough time). Most universal. 时候 (shíhòu) = specific MOMENT (when something happens). 我小的时候 (when I was little). More everyday and oral. 时刻 (shíkè) = precise INSTANT, crucial moment. 关键时刻 (crucial moment). Connotes IMPORTANCE. 时机 (shíjī) = OPPORTUNITY, favorable conjuncture. 抓住时机 (seize the opportunity). Connotes STRATEGY. Hierarchy: 时间 (duration) ≠ 时候 (moment) ≠ 时刻 (crucial instant) ≠ 时机 (opportunity). Classic mistake: confusing 时候 (descriptive) and 时机 (strategic). «这个时候» = at this moment; «这个时机» = this opportunity.',
    items: [
      { hanzi: '时间', pinyin: 'shí jiān', meaning: 'temps (durée)', meaningEn: 'time (duration)', audio: 'audio/hsk1/hsk1_时间.wav' },
      { hanzi: '时候', pinyin: 'shí hòu', meaning: 'moment, quand', meaningEn: 'moment, when', audio: 'audio/hsk1/hsk1_时候.wav' },
      { hanzi: '时刻', pinyin: 'shí kè', meaning: 'instant crucial', meaningEn: 'crucial instant', audio: 'audio/hsk5/hsk5_时刻.wav' },
      { hanzi: '时机', pinyin: 'shí jī', meaning: 'opportunité', meaningEn: 'opportunity', audio: 'audio/hsk6/hsk6_时机.wav' },
      { hanzi: '关键', pinyin: 'guān jiàn', meaning: 'crucial, clé', meaningEn: 'crucial, key', audio: 'audio/hsk4/hsk4_关键.wav' }
    ],
    tip:
      '« 抓住时机 » (saisir l\'opportunité) est UN combo business chinois. Pour louer une décision stratégique : « 这是抓住了时机 » (vous avez saisi l\'opportunité). Plus puissant que « 做对了 » (vous avez bien fait) — connote la perspicacité stratégique.',
    tipEn:
      '«抓住时机» (seize the opportunity) is a Chinese business combo. To praise a strategic decision: «这是抓住了时机» (you seized the opportunity). More powerful than «做对了» (you did right) — connotes strategic insight.'
  },
  {
    id: 'c22-changes-tongguo',
    title: '通过 vs 经过 vs 经历 vs 经由 — par/à travers',
    titleEn: '通过 vs 经过 vs 经历 vs 经由 — by/through',
    body:
      '通过 (tōngguò) = PAR LE MOYEN DE / ADOPTER (vote). 通过努力 (par l\'effort), 通过提案 (adopter une proposition). Polyvalent. 经过 (jīngguò) = PASSER PAR (un lieu, une période). 经过北京 (passer par Pékin), 经过几年的研究 (au bout de quelques années de recherche). Connote la TRAVERSÉE TEMPORELLE/SPATIALE. 经历 (jīnglì) = VIVRE/TRAVERSER une expérience. 经历了一段困难时期 (a vécu une période difficile). Connote l\'EXPÉRIENCE personnelle. 经由 (jīngyóu) = TRANSITER VIA (formel, surtout pour itinéraires). 经由香港转机 (transiter via HK). Plus formel. Hierarchy : 通过 (moyen) ≠ 经过 (traverser) ≠ 经历 (vivre) ≠ 经由 (transiter formel).',
    bodyEn:
      '通过 (tōngguò) = BY MEANS OF / ADOPT (vote). 通过努力 (through effort), 通过提案 (adopt a proposal). Versatile. 经过 (jīngguò) = PASS THROUGH (place, period). 经过北京 (pass through Beijing), 经过几年的研究 (after several years of research). Connotes TEMPORAL/SPATIAL TRAVERSAL. 经历 (jīnglì) = LIVE/UNDERGO experience. 经历了一段困难时期 (lived through a difficult period). Connotes personal EXPERIENCE. 经由 (jīngyóu) = TRANSIT VIA (formal, especially for routes). 经由香港转机 (transit via HK). More formal. Hierarchy: 通过 (means) ≠ 经过 (traverse) ≠ 经历 (live) ≠ 经由 (formal transit).',
    items: [
      { hanzi: '通过', pinyin: 'tōng guò', meaning: 'par le moyen de', meaningEn: 'by means of', audio: 'audio/hsk4/hsk4_通过.wav' },
      { hanzi: '经过', pinyin: 'jīng guò', meaning: 'passer par', meaningEn: 'pass through', audio: 'audio/hsk3/hsk3_经过.wav' },
      { hanzi: '经历', pinyin: 'jīng lì', meaning: 'vivre, traverser', meaningEn: 'experience, undergo', audio: 'audio/hsk4/hsk4_经历.wav' },
      { hanzi: '经由', pinyin: 'jīng yóu', meaning: 'transiter via', meaningEn: 'via (formal)', audio: 'audio/hsk6/hsk6_经由.wav' },
      { hanzi: '提案', pinyin: 'tí àn', meaning: 'proposition (officielle)', meaningEn: 'proposal', audio: 'audio/hsk6/hsk6_提案.wav' }
    ],
    tip:
      'Test : « par cet effort » → 通过 ; « passer par cette ville » → 经过 ; « vivre cette épreuve » → 经历 ; « transiter via cet aéroport » → 经由. La grammaire est dans la NATURE de ce qu\'on traverse. Le bon collocataire = signal de précision.',
    tipEn:
      'Test: «by this effort» → 通过; «pass through this city» → 经过; «undergo this trial» → 经历; «transit via this airport» → 经由. Grammar is in the NATURE of what one traverses. Right collocator = precision signal.'
  }
];

export const c22NuancesM2LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c22-yiyangzi',
    title: '一 + N + V 之 + V — structure littéraire de répétition',
    titleEn: '一 + N + V 之 + V — literary repetition structure',
    body:
      'Structure classique : « 一 + nom + verbe + 之 + verbe redoublé » crée un rythme poétique. Ex : 一笑而过 (un rire et c\'est passé), 一去不返 (parti une fois et plus de retour), 一发不可收拾 (une fois lancé, on ne peut plus arrêter). Toutes ces formes sont des CHENGYU. Variante avec 之 : 一以贯之 (yī yǐ guàn zhī, garder un fil unique tout du long — Confucius dans les Entretiens). Reconnaître ces structures permet de LIRE des textes classiques modernisés. À l\'oral, les Chinois cultivés glissent ces formes pour marquer leur niveau lettré : « 这件事一笑而过就好了 » (passe outre cette affaire). Maîtriser 5-10 chengyu de cette structure = signal C2.2 immédiat.',
    bodyEn:
      'Classical structure: «一 + noun + verb + 之 + reduplicated verb» creates poetic rhythm. Ex: 一笑而过 (one laugh and it passes), 一去不返 (gone once and never returns), 一发不可收拾 (once launched, cannot be stopped). All these forms are CHENGYU. Variant with 之: 一以贯之 (yī yǐ guàn zhī, keep a single thread throughout — Confucius in the Analects). Recognizing these structures lets you READ modernized classical texts. In speech, cultured Chinese slip in these forms to mark their literate level: «这件事一笑而过就好了» (laugh it off). Mastering 5-10 chengyu of this structure = immediate C2.2 signal.',
    items: [
      { hanzi: '一笑而过', pinyin: 'yí xiào ér guò', meaning: 'rire et passer', meaningEn: 'laugh it off', audio: 'audio/hsk6/hsk6_一笑.wav' },
      { hanzi: '一去不返', pinyin: 'yí qù bù fǎn', meaning: 'parti sans retour', meaningEn: 'gone never to return', audio: 'audio/hsk6/hsk6_一去.wav' },
      { hanzi: '一发不可收拾', pinyin: 'yì fā bù kě shōu shi', meaning: 'incontrôlable', meaningEn: 'out of control', audio: 'audio/hsk6/hsk6_一发.wav' },
      { hanzi: '一以贯之', pinyin: 'yī yǐ guàn zhī', meaning: 'garder un fil unique', meaningEn: 'keep one thread', audio: 'audio/hsk6/hsk6_一以.wav' },
      { hanzi: '收拾', pinyin: 'shōu shi', meaning: 'ranger, contrôler', meaningEn: 'tidy up, control', audio: 'audio/hsk4/hsk4_收拾.wav' }
    ],
    tip:
      '« 一以贯之 » (Confucius, 论语) est la formule classique pour louer la COHÉRENCE d\'une vie / d\'une œuvre. Pour un mentor : « 您 X 年来一以贯之，令人敬佩 » (vous avez gardé le même fil X années, c\'est admirable). Compliment ultime de cohérence morale.',
    tipEn:
      '«一以贯之» (Confucius, 论语) is the classical formula to praise the CONSISTENCY of a life/work. For a mentor: «您 X 年来一以贯之，令人敬佩» (you\'ve kept the same thread X years, that\'s admirable). Ultimate compliment of moral consistency.'
  },
  {
    id: 'c22-yi-er-san',
    title: 'Chengyu numérotés : 一鼓作气, 三思而行, 五湖四海, 九牛二虎',
    titleEn: 'Numbered chengyu: 一鼓作气, 三思而行, 五湖四海, 九牛二虎',
    body:
      'Les chengyu avec NOMBRES sont des marqueurs lettrés essentiels. 一鼓作气 (yī gǔ zuò qì) = avancer en un seul élan, sans relâche. À utiliser pour exhorter à finir une tâche d\'un coup. 三思而行 (sān sī ér xíng) = réfléchir 3 fois avant d\'agir. À utiliser pour conseiller la prudence. 五湖四海 (wǔ hú sì hǎi) = des 5 lacs et 4 mers (= du monde entier). 来自五湖四海 = venant du monde entier. 九牛二虎之力 (jiǔ niú èr hǔ zhī lì) = la force de 9 bœufs et 2 tigres = effort surhumain. 用了九牛二虎之力才完成 = il a fallu un effort surhumain pour finir. Ces 4 chengyu numérotés couvrent 80% des situations émotives du quotidien soutenu chinois.',
    bodyEn:
      'NUMBERED chengyu are essential literate markers. 一鼓作气 (yī gǔ zuò qì) = advance in a single thrust, without pause. Use to exhort finishing a task at one go. 三思而行 (sān sī ér xíng) = think 3 times before acting. Use to counsel prudence. 五湖四海 (wǔ hú sì hǎi) = from 5 lakes and 4 seas (= from all over the world). 来自五湖四海 = coming from everywhere. 九牛二虎之力 (jiǔ niú èr hǔ zhī lì) = strength of 9 oxen and 2 tigers = superhuman effort. 用了九牛二虎之力才完成 = took a superhuman effort to finish. These 4 numbered chengyu cover 80% of daily formal emotional Chinese situations.',
    items: [
      { hanzi: '一鼓作气', pinyin: 'yī gǔ zuò qì', meaning: 'avancer en un élan', meaningEn: 'in a single thrust', audio: 'audio/hsk6/hsk6_一鼓.wav' },
      { hanzi: '三思而行', pinyin: 'sān sī ér xíng', meaning: 'réfléchir avant d\'agir', meaningEn: 'think before acting', audio: 'audio/hsk6/hsk6_三思.wav' },
      { hanzi: '五湖四海', pinyin: 'wǔ hú sì hǎi', meaning: 'du monde entier', meaningEn: 'from all over', audio: 'audio/hsk6/hsk6_五湖.wav' },
      { hanzi: '九牛二虎之力', pinyin: 'jiǔ niú èr hǔ zhī lì', meaning: 'effort surhumain', meaningEn: 'superhuman effort', audio: 'audio/hsk6/hsk6_九牛.wav' },
      { hanzi: '完成', pinyin: 'wán chéng', meaning: 'achever', meaningEn: 'complete', audio: 'audio/hsk3/hsk3_完成.wav' }
    ],
    tip:
      '« 三思而行 » est UN conseil de prudence universel. À utiliser quand quelqu\'un est sur le point de prendre une décision irréversible. Plus puissant que « 慢慢想 » (réfléchis lentement) — connote la SAGESSE confucéenne. Effet immédiat sur l\'auditeur.',
    tipEn:
      '«三思而行» is a universal counsel of prudence. Use when someone is about to make an irreversible decision. More powerful than «慢慢想» (think slowly) — connotes Confucian WISDOM. Immediate effect on the listener.'
  }
];

export const c22NuancesM3LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c22-fudaitanbi',
    title: '附 vs 顺 vs 趁 vs 借 — saisir l\'occasion (préposition)',
    titleEn: '附 vs 顺 vs 趁 vs 借 — seize the occasion (preposition)',
    body:
      '附 (fù) = JOINDRE / ATTACHER. 附件 (pièce jointe d\'un email), 附上 (joindre). « 附此一份资料 » (joindre ce document). Plus écrit/admin. 顺 (shùn) = AU PASSAGE / EN PROFITANT D\'UN MOUVEMENT EXISTANT. 顺便 (au passage), 顺手 (à portée de main). 顺便买点东西 (acheter au passage). 趁 (chèn) = PROFITER (d\'une condition favorable). 趁热打铁 (battre le fer pendant qu\'il est chaud — chengyu). 趁年轻多学点 (profiter de la jeunesse pour apprendre). Connote l\'OPPORTUNISME positif. 借 (jiè) = SOUS PRÉTEXTE DE / À L\'OCCASION DE (formel). 借此机会 (saisir cette occasion pour). 借此机会感谢大家 = à cette occasion, je remercie tous. Hierarchy : 附 (joindre admin) < 顺 (au passage oral) < 趁 (profiter) < 借 (saisir formel).',
    bodyEn:
      '附 (fù) = ATTACH / ENCLOSE. 附件 (email attachment), 附上 (enclose). «附此一份资料» (enclose this document). More written/admin. 顺 (shùn) = ALONG THE WAY / TAKING AN EXISTING MOVEMENT. 顺便 (along the way), 顺手 (within reach). 顺便买点东西 (buy something on the way). 趁 (chèn) = TAKE ADVANTAGE (of a favorable condition). 趁热打铁 (strike while the iron is hot — chengyu). 趁年轻多学点 (use youth to learn more). Connotes positive OPPORTUNISM. 借 (jiè) = ON THE PRETEXT OF / ON THE OCCASION OF (formal). 借此机会 (seize this occasion). 借此机会感谢大家 = on this occasion, I thank all. Hierarchy: 附 (admin attach) < 顺 (oral on the way) < 趁 (take advantage) < 借 (formal seize).',
    items: [
      { hanzi: '附', pinyin: 'fù', meaning: 'joindre, attacher', meaningEn: 'attach', audio: 'audio/hsk5/hsk5_附.wav' },
      { hanzi: '顺便', pinyin: 'shùn biàn', meaning: 'au passage', meaningEn: 'on the way', audio: 'audio/hsk4/hsk4_顺便.wav' },
      { hanzi: '趁', pinyin: 'chèn', meaning: 'profiter de', meaningEn: 'take advantage', audio: 'audio/hsk4/hsk4_趁.wav' },
      { hanzi: '借', pinyin: 'jiè', meaning: 'à l\'occasion de', meaningEn: 'on the occasion', audio: 'audio/hsk2/hsk2_借.wav' },
      { hanzi: '趁热打铁', pinyin: 'chèn rè dǎ tiě', meaning: 'battre le fer chaud', meaningEn: 'strike while iron hot', audio: 'audio/hsk6/hsk6_趁热.wav' }
    ],
    tip:
      '« 借此机会 X » est UNE formule de discours soutenue UNIVERSELLE. À ouvrir tout discours d\'éloge / remerciement / annonce. « 借此机会，我想感谢… » sonne 10x plus soutenu que « 我想感谢… ». À mémoriser absolument pour C2.2.',
    tipEn:
      '«借此机会 X» is a UNIVERSAL formal speech formula. Open any praise/thanks/announcement speech with it. «借此机会，我想感谢…» sounds 10x more formal than «我想感谢…». Memorize for C2.2 absolutely.'
  },
  {
    id: 'c22-puxueli',
    title: '蒲 vs 学 vs 礼 — homophones et faux amis 字',
    titleEn: '蒲 vs 学 vs 礼 — homophones and false friend characters',
    body:
      'Le chinois moderne contient des centaines de PARONYMES qui se prononcent identiquement mais ont des sens TRÈS différents. Ex célèbres : 礼 (lǐ, rite/cadeau) ≠ 理 (lǐ, raison/principe) ≠ 立 (lì, debout/établir) ≠ 力 (lì, force) ≠ 利 (lì, profit/bénéfice). Distinction CRITIQUE : 礼物 (cadeau) ≠ 理由 (raison) ≠ 立场 (position) ≠ 力量 (force) ≠ 利益 (intérêt). À l\'oral, le contexte tranche ; à l\'écrit, l\'erreur de caractère = signal IMMÉDIAT d\'un niveau insuffisant. C2.2 = ZÉRO confusion sur ces caractères. Test typique HSK7 : choisir le bon caractère parmi 礼/理/立/力/利 selon le contexte. La maîtrise discriminative = signal de niveau supérieur.',
    bodyEn:
      'Modern Chinese contains hundreds of PARONYMS pronounced identically but with VERY different meanings. Famous examples: 礼 (lǐ, rite/gift) ≠ 理 (lǐ, reason/principle) ≠ 立 (lì, stand/establish) ≠ 力 (lì, force) ≠ 利 (lì, profit/benefit). CRITICAL distinction: 礼物 (gift) ≠ 理由 (reason) ≠ 立场 (position) ≠ 力量 (strength) ≠ 利益 (interest). In speech, context decides; in writing, character mistake = IMMEDIATE signal of insufficient level. C2.2 = ZERO confusion on these characters. Typical HSK7 test: pick the right character among 礼/理/立/力/利 by context. Discriminative mastery = senior-level signal.',
    items: [
      { hanzi: '礼', pinyin: 'lǐ', meaning: 'rite, cadeau', meaningEn: 'rite, gift', audio: 'audio/hsk5/hsk5_礼.wav' },
      { hanzi: '理', pinyin: 'lǐ', meaning: 'raison, principe', meaningEn: 'reason, principle', audio: 'audio/hsk5/hsk5_理.wav' },
      { hanzi: '立', pinyin: 'lì', meaning: 'debout, établir', meaningEn: 'stand, establish', audio: 'audio/hsk5/hsk5_立.wav' },
      { hanzi: '力', pinyin: 'lì', meaning: 'force', meaningEn: 'force', audio: 'audio/hsk3/hsk3_力.wav' },
      { hanzi: '利', pinyin: 'lì', meaning: 'profit, bénéfice', meaningEn: 'profit, benefit', audio: 'audio/hsk5/hsk5_利.wav' }
    ],
    tip:
      'Astuce mnémotechnique : visualiser la SIGNIFICATION graphique. 礼 (示 + 乙 = autel + offrande), 理 (王 + 里 = jade + intérieur = polir le jade pour révéler ses veines = principe), 立 (homme debout sur sol), 力 (un bras musclé), 利 (禾 + 刂 = blé + couteau = profit de la moisson). La radicalographie débloque la distinction.',
    tipEn:
      'Mnemonic: visualize graphic MEANING. 礼 (示 + 乙 = altar + offering), 理 (王 + 里 = jade + inside = polish jade to reveal veins = principle), 立 (man standing on ground), 力 (a muscled arm), 利 (禾 + 刂 = grain + knife = harvest profit). Radical reading unlocks the distinction.'
  }
];

export const c22NuancesM4LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c22-jin-jiu-yuan',
    title: '近 vs 远 vs 邻 vs 临 — proche/loin (4 nuances)',
    titleEn: '近 vs 远 vs 邻 vs 临 — near/far (4 nuances)',
    body:
      '近 (jìn) = PROCHE physiquement ou temporellement. 离这里很近 (très près d\'ici), 近代 (époque moderne). Polyvalent. 远 (yuǎn) = LOIN. 远方 (au loin), 远古 (antiquité lointaine). 邻 (lín) = VOISIN, contigu. 邻居 (voisin), 邻国 (pays voisin), 邻近 (proche, voisin). Connote la CONTIGUÏTÉ. 临 (lín) = SUR LE POINT DE / DONNANT SUR. 临近毕业 (proche de la diplomation), 临海 (donnant sur la mer), 临时 (temporaire, ad hoc). Connote l\'IMMINENCE ou la SITUATION. Hierarchy : 近 (proche) ≠ 邻 (voisin contigu) ≠ 临 (imminent/donnant sur). Erreur classique : 临近 (sur le point d\'arriver) vs 邻近 (proche/voisin). Le 临 implique TEMPS ; le 邻 implique ESPACE.',
    bodyEn:
      '近 (jìn) = NEAR physically or temporally. 离这里很近 (very near here), 近代 (modern era). Versatile. 远 (yuǎn) = FAR. 远方 (afar), 远古 (distant antiquity). 邻 (lín) = NEIGHBOR, contiguous. 邻居 (neighbor), 邻国 (neighbor country), 邻近 (near, neighboring). Connotes CONTIGUITY. 临 (lín) = ABOUT TO / FACING. 临近毕业 (near graduation), 临海 (facing the sea), 临时 (temporary, ad hoc). Connotes IMMINENCE or SITUATION. Hierarchy: 近 (near) ≠ 邻 (contiguous neighbor) ≠ 临 (imminent/facing). Classic mistake: 临近 (about to arrive) vs 邻近 (near/neighboring). 临 implies TIME; 邻 implies SPACE.',
    items: [
      { hanzi: '近', pinyin: 'jìn', meaning: 'proche', meaningEn: 'near', audio: 'audio/hsk2/hsk2_近.wav' },
      { hanzi: '远', pinyin: 'yuǎn', meaning: 'loin', meaningEn: 'far', audio: 'audio/hsk2/hsk2_远.wav' },
      { hanzi: '邻', pinyin: 'lín', meaning: 'voisin, contigu', meaningEn: 'neighbor', audio: 'audio/hsk6/hsk6_邻.wav' },
      { hanzi: '临', pinyin: 'lín', meaning: 'sur le point de', meaningEn: 'about to', audio: 'audio/hsk6/hsk6_临.wav' },
      { hanzi: '邻居', pinyin: 'lín jū', meaning: 'voisin', meaningEn: 'neighbor', audio: 'audio/hsk3/hsk3_邻居.wav' }
    ],
    tip:
      '« 临阵磨枪 » (chengyu, lit. : aiguiser sa lance face au front = se préparer à la dernière minute) utilise 临 dans son sens « sur le point de ». À utiliser pour reprocher (ou avouer) une préparation tardive. Très expressif.',
    tipEn:
      '«临阵磨枪» (chengyu, lit.: sharpen the spear facing the battlefront = last-minute prep) uses 临 in its «about to» sense. Use to reproach (or confess) late preparation. Very expressive.'
  },
  {
    id: 'c22-fu-chan-ji',
    title: '复 vs 重 vs 再 vs 又 — répétition (4 vies)',
    titleEn: '复 vs 重 vs 再 vs 又 — repetition (4 lives)',
    body:
      '复 (fù) = REVENIR / RÉPÉTER (formel, écrit). 复习 (réviser), 恢复 (rétablir), 复杂 (complexe). 重 (chóng quand répétition, zhòng quand poids) = ENCORE UNE FOIS. 重写 (chóng xiě, réécrire). 重 + verbe = nouvelle fois. 再 (zài) = ENCORE / À NOUVEAU (avant le verbe, FUTUR ou hypothèse). 再说一遍 (redire). 又 (yòu) = ENCORE / DE NOUVEAU (avant le verbe, PASSÉ ou habitude). 又下雨了 (il pleut encore). Hierarchy temporelle : 再 (futur planifié) vs 又 (passé/répétition fâcheuse). Erreur ULTRA classique : confondre 再 (futur) et 又 (passé). « 我又来了 » = je reviens (encore une fois) ; « 我再来 » = je reviendrai. Maîtriser cette distinction = signe de précision avancée.',
    bodyEn:
      '复 (fù) = RETURN / REPEAT (formal, written). 复习 (review), 恢复 (restore), 复杂 (complex). 重 (chóng for repetition, zhòng for weight) = ONCE MORE. 重写 (rewrite). 重 + verb = new time. 再 (zài) = AGAIN / ANEW (before verb, FUTURE or hypothesis). 再说一遍 (say again). 又 (yòu) = AGAIN (before verb, PAST or habit). 又下雨了 (it\'s raining again). Temporal hierarchy: 再 (planned future) vs 又 (past/annoying repetition). VERY classic mistake: confusing 再 (future) and 又 (past). «我又来了» = I\'m back (once more) ; «我再来» = I\'ll come back. Mastering this distinction = sign of advanced precision.',
    items: [
      { hanzi: '复', pinyin: 'fù', meaning: 'répéter (formel)', meaningEn: 'repeat (formal)', audio: 'audio/hsk5/hsk5_复.wav' },
      { hanzi: '重', pinyin: 'chóng', meaning: 'encore une fois', meaningEn: 'once more', audio: 'audio/hsk2/hsk2_重.wav' },
      { hanzi: '再', pinyin: 'zài', meaning: 'encore (futur)', meaningEn: 'again (future)', audio: 'audio/hsk1/hsk1_再.wav' },
      { hanzi: '又', pinyin: 'yòu', meaning: 'encore (passé)', meaningEn: 'again (past)', audio: 'audio/hsk2/hsk2_又.wav' },
      { hanzi: '恢复', pinyin: 'huī fù', meaning: 'rétablir', meaningEn: 'restore', audio: 'audio/hsk5/hsk5_恢复.wav' }
    ],
    tip:
      'Test mémo : 又 (de nouveau, passé) ≠ 再 (encore, futur). « 我昨天又去了 » (j\'y suis encore allé hier) ≠ « 我明天再去 » (j\'irai à nouveau demain). Erreur fréquente même chez les avancés. À l\'oral, écouter cette distinction chez les Chinois te débloque.',
    tipEn:
      'Memory test: 又 (again, past) ≠ 再 (again, future). «我昨天又去了» (I went again yesterday) ≠ «我明天再去» (I\'ll go again tomorrow). Frequent mistake even among advanced learners. In speech, listening for this distinction in Chinese unlocks you.'
  }
];

export const c22NuancesM5LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c22-zhongyu-jiezhi',
    title: '终于 vs 终究 vs 毕竟 vs 究竟 — finalement (4 nuances)',
    titleEn: '终于 vs 终究 vs 毕竟 vs 究竟 — finally (4 nuances)',
    body:
      '终于 (zhōngyú) = FINALEMENT (après une longue attente — connotation POSITIVE souvent). 我终于到了 (je suis enfin arrivé). Soulagement. 终究 (zhōngjiū) = AU FINAL / TÔT OU TARD (le destin, l\'inévitable). 真相终究会大白 (la vérité finit par éclater). Plus écrit, plus philosophique. 毕竟 (bìjìng) = APRÈS TOUT (concession). 他毕竟还是个孩子 (après tout, c\'est encore un enfant). Adoucit un jugement. 究竟 (jiūjìng) = AU JUSTE / AU FOND (insistance d\'enquête). 究竟发生了什么 ? (qu\'est-ce qui s\'est passé exactement ?). Hierarchy : 终于 (soulagement) ≠ 终究 (inévitable) ≠ 毕竟 (concession après tout) ≠ 究竟 (enquête insistance). Test : « après tout, X » → 毕竟 ; « au fait, X ? » → 究竟 ; « enfin X arrive » → 终于 ; « X arrivera tôt ou tard » → 终究.',
    bodyEn:
      '终于 (zhōngyú) = FINALLY (after long wait — often POSITIVE). 我终于到了 (I\'ve finally arrived). Relief. 终究 (zhōngjiū) = AT THE END / SOONER OR LATER (fate, inevitable). 真相终究会大白 (truth ultimately surfaces). More written, philosophical. 毕竟 (bìjìng) = AFTER ALL (concession). 他毕竟还是个孩子 (after all, he\'s still a child). Softens a judgment. 究竟 (jiūjìng) = EXACTLY / AT BOTTOM (investigative insistence). 究竟发生了什么？(what exactly happened?). Hierarchy: 终于 (relief) ≠ 终究 (inevitable) ≠ 毕竟 (after-all concession) ≠ 究竟 (insistent inquiry). Test: «after all, X» → 毕竟; «what is X exactly?» → 究竟; «finally X arrives» → 终于; «X will happen sooner or later» → 终究.',
    items: [
      { hanzi: '终于', pinyin: 'zhōng yú', meaning: 'finalement', meaningEn: 'finally', audio: 'audio/hsk3/hsk3_终于.wav' },
      { hanzi: '终究', pinyin: 'zhōng jiū', meaning: 'tôt ou tard', meaningEn: 'sooner or later', audio: 'audio/hsk6/hsk6_终究.wav' },
      { hanzi: '毕竟', pinyin: 'bì jìng', meaning: 'après tout', meaningEn: 'after all', audio: 'audio/hsk5/hsk5_毕竟.wav' },
      { hanzi: '究竟', pinyin: 'jiū jìng', meaning: 'au juste', meaningEn: 'exactly', audio: 'audio/hsk5/hsk5_究竟.wav' },
      { hanzi: '真相', pinyin: 'zhēn xiàng', meaning: 'vérité', meaningEn: 'truth', audio: 'audio/hsk6/hsk6_真相.wav' }
    ],
    tip:
      '« 真相终究会大白 » (la vérité finit toujours par éclater) est un proverbe TRÈS utilisé en discussion politique/justice chinoise. À utiliser pour rassurer dans une situation injuste : « 别担心，真相终究会大白 ». Effet philosophique apaisant.',
    tipEn:
      '«真相终究会大白» (truth ultimately surfaces) is a VERY used proverb in Chinese political/justice discussion. Use to reassure in unjust situations: «别担心，真相终究会大白». Philosophical calming effect.'
  },
  {
    id: 'c22-yiding-bu-yiding',
    title: '一定 vs 必定 vs 必然 vs 势必 — certain (4 nuances)',
    titleEn: '一定 vs 必定 vs 必然 vs 势必 — certain (4 nuances)',
    body:
      '一定 (yídìng) = CERTAINEMENT (universel, oral et écrit). 我一定来 (je viens certainement). Le plus large. 必定 (bìdìng) = ASSURÉMENT (légèrement plus formel, connote la conviction personnelle). 我必定支持 (je soutiens assurément). Plus engagé. 必然 (bìrán) = NÉCESSAIREMENT (logique, conclusion d\'analyse formelle). 这是必然的结果 (c\'est le résultat nécessaire). Plus académique. 势必 (shìbì) = INÉVITABLEMENT (à cause de la situation/conjoncture — 势 = momentum). 这种政策势必引发不满 (cette politique provoquera inévitablement le mécontentement). Connote la PRÉDICTION basée sur la dynamique. Hierarchy : 一定 (universel oral) < 必定 (engagement personnel) < 必然 (logique) < 势必 (inévitable par conjoncture).',
    bodyEn:
      '一定 (yídìng) = CERTAINLY (universal, oral and written). 我一定来 (I\'m certainly coming). Broadest. 必定 (bìdìng) = ASSUREDLY (slightly more formal, connotes personal conviction). 我必定支持 (I assuredly support). More engaged. 必然 (bìrán) = NECESSARILY (logical, formal analytic conclusion). 这是必然的结果 (it\'s the necessary result). More academic. 势必 (shìbì) = INEVITABLY (due to situation/conjuncture — 势 = momentum). 这种政策势必引发不满 (this policy will inevitably trigger discontent). Connotes PREDICTION based on dynamics. Hierarchy: 一定 (universal oral) < 必定 (personal commitment) < 必然 (logical) < 势必 (inevitable by conjuncture).',
    items: [
      { hanzi: '一定', pinyin: 'yí dìng', meaning: 'certainement', meaningEn: 'certainly', audio: 'audio/hsk3/hsk3_一定.wav' },
      { hanzi: '必定', pinyin: 'bì dìng', meaning: 'assurément', meaningEn: 'assuredly', audio: 'audio/hsk6/hsk6_必定.wav' },
      { hanzi: '必然', pinyin: 'bì rán', meaning: 'nécessairement', meaningEn: 'necessarily', audio: 'audio/hsk5/hsk5_必然.wav' },
      { hanzi: '势必', pinyin: 'shì bì', meaning: 'inévitablement', meaningEn: 'inevitably', audio: 'audio/hsk6/hsk6_势必.wav' },
      { hanzi: '不满', pinyin: 'bù mǎn', meaning: 'mécontentement', meaningEn: 'discontent', audio: 'audio/hsk6/hsk6_不满.wav' }
    ],
    tip:
      '« 势必 X » est UN connecteur de prédiction politique/économique très utilisé en éditorial chinois. Plus puissant que 一定 ou 必然 — connote la DYNAMIQUE STRUCTURELLE. Maîtriser 势必 dans une analyse = signal C2.2 d\'analyste sérieux.',
    tipEn:
      '«势必 X» is a political/economic prediction connector very used in Chinese op-eds. More powerful than 一定 or 必然 — connotes STRUCTURAL DYNAMICS. Mastering 势必 in analysis = C2.2 signal of serious analyst.'
  }
];

export const c22NuancesM6LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c22-naozai',
    title: 'Particules finales : 啊 / 呢 / 吧 / 嘛 / 哟 — émotion à l\'oral',
    titleEn: 'Final particles: 啊 / 呢 / 吧 / 嘛 / 哟 — oral emotion',
    body:
      '啊 (a, ya) = exclamation/insistance affective. 太好啊 (oh c\'est super). Adoucit. 呢 (ne) = QUESTION rhétorique ou continuité. 你呢 ? (et toi ?). 我在想呢 (je suis en train de penser). 吧 (ba) = SUGGESTION/ACQUIESCEMENT. 走吧 (allons-y). 应该是吧 (c\'est probablement ça). Universel pour adoucir un ordre. 嘛 (ma) = ÉVIDENCE / EXPLICATION. 当然啦，他是你弟弟嘛 (bien sûr, c\'est ton petit frère, voyons). Connote l\'évidence partagée. 哟 (yo) = SURPRISE / ATTENTION (familier, oral expressif). 哟，你来了 ! (oh, tu es là !). Plus jeune/familier. Maîtriser les particules finales = différence FONDAMENTALE entre oral natif et oral d\'apprenant. Sans particules, ton chinois sonne plat et étranger. Avec les bonnes particules, tu sonnes Chinois.',
    bodyEn:
      '啊 (a, ya) = affective exclamation/emphasis. 太好啊 (oh that\'s great). Softens. 呢 (ne) = rhetorical QUESTION or continuity. 你呢？(and you?). 我在想呢 (I\'m thinking). 吧 (ba) = SUGGESTION/AGREEMENT. 走吧 (let\'s go). 应该是吧 (probably so). Universal for softening orders. 嘛 (ma) = OBVIOUSNESS / EXPLANATION. 当然啦，他是你弟弟嘛 (of course, he\'s your little brother, you know). Connotes shared obviousness. 哟 (yo) = SURPRISE / ATTENTION (casual, expressive oral). 哟，你来了！(oh, you\'re here!). More youth/casual. Mastering final particles = FUNDAMENTAL difference between native oral and learner oral. Without particles, your Chinese sounds flat and foreign. With the right particles, you sound Chinese.',
    items: [
      { hanzi: '啊', pinyin: 'a', meaning: 'exclamation', meaningEn: 'exclamation', audio: 'audio/hsk1/hsk1_啊.wav' },
      { hanzi: '呢', pinyin: 'ne', meaning: 'question, continuité', meaningEn: 'question, continuation', audio: 'audio/hsk1/hsk1_呢.wav' },
      { hanzi: '吧', pinyin: 'ba', meaning: 'suggestion', meaningEn: 'suggestion', audio: 'audio/hsk2/hsk2_吧.wav' },
      { hanzi: '嘛', pinyin: 'ma', meaning: 'évidence', meaningEn: 'obviousness', audio: 'audio/hsk5/hsk5_嘛.wav' },
      { hanzi: '哟', pinyin: 'yo', meaning: 'surprise (oral)', meaningEn: 'surprise (oral)', audio: 'audio/hsk6/hsk6_哟.wav' }
    ],
    tip:
      '« 嘛 » est UN marqueur ORAL très chinois. À ajouter quand tu veux dire « tu vois, c\'est évident, voyons » : « 他是你哥哥嘛，你应该听他的 ». Sans 嘛, ça sonne sermonneur ; avec 嘛, ça sonne complice. Petite particule, énorme effet relationnel.',
    tipEn:
      '«嘛» is a very Chinese ORAL marker. Add when you want to say «you see, it\'s obvious, come on»: «他是你哥哥嘛，你应该听他的». Without 嘛 it sounds preachy; with 嘛 it sounds complicit. Small particle, huge relational effect.'
  },
  {
    id: 'c22-da-jia-ge-wei',
    title: '大家 vs 各位 vs 诸位 vs 列位 — vous tous (registre)',
    titleEn: '大家 vs 各位 vs 诸位 vs 列位 — all of you (register)',
    body:
      '大家 (dàjiā) = TOUT LE MONDE (universel oral et écrit). 大家好 (bonjour à tous). Le plus utilisé. 各位 (gèwèi) = CHACUN DE VOUS (formel, marque le respect individuel dans le groupe). 各位老师 (chers professeurs). À utiliser en discours formel. 诸位 (zhūwèi) = MESDAMES ET MESSIEURS (très formel, écrit ou discours soutenu). 诸位来宾 (mesdames et messieurs les invités). Plus rare, plus solennel. 列位 (lièwèi) = CHACUN À SON RANG (TRÈS formel, presque archaïque, théâtral). Hierarchy : 大家 (oral universel) < 各位 (formel respectueux) < 诸位 (très formel discours) < 列位 (archaïque cérémoniel). Erreur fréquente : utiliser 大家 dans un discours officiel = trop familier. Préfère 各位.',
    bodyEn:
      '大家 (dàjiā) = EVERYONE (universal oral and written). 大家好 (hello everyone). Most used. 各位 (gèwèi) = EACH OF YOU (formal, marks individual respect in the group). 各位老师 (esteemed teachers). Use in formal speeches. 诸位 (zhūwèi) = LADIES AND GENTLEMEN (very formal, written or formal speech). 诸位来宾 (esteemed guests). Rarer, more solemn. 列位 (lièwèi) = EACH AT THEIR RANK (VERY formal, nearly archaic, theatrical). Hierarchy: 大家 (universal oral) < 各位 (respectful formal) < 诸位 (very formal speech) < 列位 (archaic ceremonial). Frequent mistake: using 大家 in an official speech = too casual. Prefer 各位.',
    items: [
      { hanzi: '大家', pinyin: 'dà jiā', meaning: 'tout le monde', meaningEn: 'everyone', audio: 'audio/hsk1/hsk1_大家.wav' },
      { hanzi: '各位', pinyin: 'gè wèi', meaning: 'chacun de vous', meaningEn: 'each of you', audio: 'audio/hsk5/hsk5_各位.wav' },
      { hanzi: '诸位', pinyin: 'zhū wèi', meaning: 'mesdames et messieurs', meaningEn: 'ladies and gentlemen', audio: 'audio/hsk6/hsk6_诸位.wav' },
      { hanzi: '列位', pinyin: 'liè wèi', meaning: 'chacun à son rang', meaningEn: 'each at their rank', audio: 'audio/hsk6/hsk6_列位.wav' },
      { hanzi: '来宾', pinyin: 'lái bīn', meaning: 'invité', meaningEn: 'guest', audio: 'audio/hsk6/hsk6_来宾.wav' }
    ],
    tip:
      'Discours officiel chinois : ouvrir par 各位领导，各位同仁，各位来宾. Si tu utilises 大家 d\'emblée, tu casses la solennité. Réserve 大家 à la conclusion : « 谢谢大家 ». Cette gradation (formel→informel) marque la maturité oratoire.',
    tipEn:
      'Chinese official speech: open with 各位领导，各位同仁，各位来宾. Using 大家 from the start breaks solemnity. Reserve 大家 for the close: «谢谢大家». This gradation (formal→informal) marks oratorical maturity.'
  }
];

export const c22NuancesM7LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c22-yongbi-renbi',
    title: 'Chengyu de comparaison : 形影不离, 唇齿相依, 千差万别',
    titleEn: 'Comparison chengyu: 形影不离, 唇齿相依, 千差万别',
    body:
      'Chengyu pour comparer / lier / opposer. 形影不离 (xíng yǐng bù lí) = forme et ombre inséparables = être TOUJOURS ENSEMBLE (couple, amis fusionnels). 这两兄弟形影不离 (ces 2 frères sont inséparables). 唇齿相依 (chún chǐ xiāng yī) = lèvres et dents s\'entraident = INTERDÉPENDANCE PROFONDE (souvent 2 pays alliés). 中朝两国唇齿相依 (Chine et Corée du Nord sont interdépendantes — usage géopolitique classique). 千差万别 (qiān chā wàn bié) = mille différences, dix mille distinctions = TOUT DIFFÉRENT, immense diversité. 各人的看法千差万别 (les avis des gens sont infiniment divers). Ces chengyu de comparaison ENRICHISSENT l\'oral et l\'écrit C2.2 sans pédanterie.',
    bodyEn:
      'Chengyu for comparing / linking / opposing. 形影不离 (xíng yǐng bù lí) = form and shadow inseparable = ALWAYS TOGETHER (couple, fusional friends). 这两兄弟形影不离 (these 2 brothers are inseparable). 唇齿相依 (chún chǐ xiāng yī) = lips and teeth help each other = DEEP INTERDEPENDENCE (often 2 allied countries). 中朝两国唇齿相依 (China and North Korea are interdependent — classic geopolitical use). 千差万别 (qiān chā wàn bié) = a thousand differences, ten thousand distinctions = ALL DIFFERENT, immense diversity. 各人的看法千差万别 (people\'s views are infinitely varied). These comparison chengyu ENRICH C2.2 oral and written without pedantry.',
    items: [
      { hanzi: '形影不离', pinyin: 'xíng yǐng bù lí', meaning: 'inséparables', meaningEn: 'inseparable', audio: 'audio/hsk6/hsk6_形影.wav' },
      { hanzi: '唇齿相依', pinyin: 'chún chǐ xiāng yī', meaning: 'interdépendants', meaningEn: 'interdependent', audio: 'audio/hsk6/hsk6_唇齿.wav' },
      { hanzi: '千差万别', pinyin: 'qiān chā wàn bié', meaning: 'tout différent', meaningEn: 'all different', audio: 'audio/hsk6/hsk6_千差.wav' },
      { hanzi: '兄弟', pinyin: 'xiōng dì', meaning: 'frères', meaningEn: 'brothers', audio: 'audio/hsk3/hsk3_兄弟.wav' },
      { hanzi: '看法', pinyin: 'kàn fǎ', meaning: 'point de vue', meaningEn: 'viewpoint', audio: 'audio/hsk4/hsk4_看法.wav' }
    ],
    tip:
      'Pour décrire la diversité (en culture, opinion, marché) : « 千差万别 ». Ex : « 现在的消费者口味千差万别 » (les goûts des consommateurs sont infiniment divers). Plus puissant que « 很多种 ». Marque la NUANCE infinie — signal C2.2.',
    tipEn:
      'To describe diversity (culture, opinion, market): «千差万别». Ex: «现在的消费者口味千差万别» (consumer tastes are infinitely varied). More powerful than «很多种». Marks infinite NUANCE — C2.2 signal.'
  },
  {
    id: 'c22-shen-shen-mei-mei',
    title: 'Reduplications poétiques : 莹莹, 渐渐, 缓缓, 默默',
    titleEn: 'Poetic reduplications: 莹莹, 渐渐, 缓缓, 默默',
    body:
      'Le chinois soutenu adore les RÉDUPLICATIONS qui créent un rythme et une musicalité. 莹莹 (yíng yíng) = brillant brillant (yeux qui scintillent). 泪光莹莹 (les larmes scintillent). 渐渐 (jiànjiàn) = peu à peu, graduellement. 天渐渐亮了 (le jour se lève peu à peu). 缓缓 (huǎn huǎn) = lentement, calmement. 缓缓地走 (marcher lentement). 默默 (mò mò) = silencieusement, discrètement. 默默地工作 (travailler en silence). Ces 4 redoublements + une centaine d\'autres (悠悠 paisiblement, 漫漫 longuement, 茫茫 immense) construisent l\'ATMOSPHÈRE poétique chinoise. Maîtriser 5-10 redoublements à l\'oral C2.2 = signal de NIVEAU LITTÉRAIRE et émotionnel maximal. Référence : 李清照 ouvre 《声声慢》 par 7 redoublements consécutifs.',
    bodyEn:
      'Formal Chinese loves REDUPLICATIONS that create rhythm and musicality. 莹莹 (yíng yíng) = bright bright (twinkling eyes). 泪光莹莹 (tears glisten). 渐渐 (jiànjiàn) = gradually. 天渐渐亮了 (day breaks gradually). 缓缓 (huǎn huǎn) = slowly, calmly. 缓缓地走 (walk slowly). 默默 (mò mò) = silently, discreetly. 默默地工作 (work in silence). These 4 reduplications + hundreds of others (悠悠 peacefully, 漫漫 lengthily, 茫茫 vast) build the Chinese poetic ATMOSPHERE. Mastering 5-10 reduplications in C2.2 oral = signal of maximum LITERARY and emotional level. Reference: 李清照 opens 《声声慢》 with 7 consecutive reduplications.',
    items: [
      { hanzi: '渐渐', pinyin: 'jiàn jiàn', meaning: 'peu à peu', meaningEn: 'gradually', audio: 'audio/hsk5/hsk5_渐渐.wav' },
      { hanzi: '缓缓', pinyin: 'huǎn huǎn', meaning: 'lentement', meaningEn: 'slowly', audio: 'audio/hsk6/hsk6_缓缓.wav' },
      { hanzi: '默默', pinyin: 'mò mò', meaning: 'silencieusement', meaningEn: 'silently', audio: 'audio/hsk6/hsk6_默默.wav' },
      { hanzi: '悠悠', pinyin: 'yōu yōu', meaning: 'paisiblement', meaningEn: 'peacefully', audio: 'audio/hsk6/hsk6_悠悠.wav' },
      { hanzi: '茫茫', pinyin: 'máng máng', meaning: 'immense, vague', meaningEn: 'vast, hazy', audio: 'audio/hsk6/hsk6_茫茫.wav' }
    ],
    tip:
      'Pour louer un effort discret/long : « 您 X 年来默默地付出，让人敬佩 » (vous avez donné silencieusement pendant X années, c\'est admirable). 默默 reconnaît l\'effort INVISIBLE — culturellement TRÈS valorisé en Chine. Compliment ultime pour un mentor humble.',
    tipEn:
      'To praise a discreet/long effort: «您 X 年来默默地付出，让人敬佩» (you gave silently for X years, admirable). 默默 recognizes INVISIBLE effort — culturally VERY valued in China. Ultimate compliment for a humble mentor.'
  }
];

// === HISTORICAL C2.2 PARCOURS — rhetoric / translation / modern-lit / dialects / global-china ===

// --- rhetoric ---------------------------------------------------------------

export const c22RhetoricM1LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c22-duiou-structure',
    title: '对偶 — la rhétorique d\'équilibre',
    titleEn: '对偶 — the rhetoric of balance',
    body:
      '对偶 (duì\'ǒu, parallélisme) impose une SYMÉTRIE STRICTE entre 2 propositions : (1) MÊME nombre de syllabes (4-4 ou 7-7), (2) MÊME structure syntaxique, (3) MÊME catégorie grammaticale par position (nom ↔ nom, verbe ↔ verbe), (4) TONS OPPOSÉS (un vers en 平 plat répond à un vers en 仄 oblique). C\'est un défi musical + grammatical + sémantique. Exemple emblématique du poète 陆游 : 山重水复疑无路 (montagnes empilées, eaux repliées — je crois qu\'il n\'y a plus de route) / 柳暗花明又一村 (saules sombres, fleurs brillantes — encore un village). Sens devenu PROVERBE : « après l\'épreuve, l\'éclaircie » — souvent cité pour encourager dans les moments difficiles.',
    bodyEn:
      '对偶 (duì\'ǒu, parallelism) imposes STRICT SYMMETRY between 2 clauses: (1) SAME syllable count (4-4 or 7-7), (2) SAME syntactic structure, (3) SAME grammatical category per position (noun ↔ noun, verb ↔ verb), (4) OPPOSITE TONES (a 平 level line answers a 仄 oblique line). It\'s a musical + grammatical + semantic challenge. Iconic example by poet 陆游: 山重水复疑无路 (mountains piled, waters folded — I think there\'s no road) / 柳暗花明又一村 (dark willows, bright flowers — another village). Meaning became PROVERB: «after the trial, the clearing» — often cited to encourage in tough times.',
    items: [
      { hanzi: '对偶', pinyin: 'duì ǒu', meaning: 'parallélisme', meaningEn: 'parallelism', audio: 'audio/hsk6/hsk6_对偶.wav' },
      { hanzi: '春联', pinyin: 'chūn lián', meaning: 'couplet du Nouvel An', meaningEn: 'New Year couplet', audio: 'audio/hsk6/hsk6_春联.wav' },
      { hanzi: '山重水复', pinyin: 'shān chóng shuǐ fù', meaning: 'difficultés empilées', meaningEn: 'piled hardships', audio: 'audio/hsk6/hsk6_山重.wav' },
      { hanzi: '柳暗花明', pinyin: 'liǔ àn huā míng', meaning: 'éclaircie après épreuve', meaningEn: 'light after trial', audio: 'audio/hsk6/hsk6_柳暗.wav' },
      { hanzi: '陆游', pinyin: 'lù yóu', meaning: 'Lu You (poète Song)', meaningEn: 'Lu You', audio: 'audio/hsk6/hsk6_陆游.wav' }
    ],
    tip:
      '« 山重水复疑无路，柳暗花明又一村 » est UNE phrase à mémoriser. À utiliser pour ENCOURAGER quelqu\'un dans la difficulté : « Souviens-toi : 山重水复疑无路，柳暗花明又一村 ». Effet émotionnel garanti. Le destinataire chinois reconnait immédiatement la citation et se sent réconforté.',
    tipEn:
      '«山重水复疑无路，柳暗花明又一村» is a phrase to memorize. To ENCOURAGE someone in difficulty: «Remember: 山重水复疑无路，柳暗花明又一村». Guaranteed emotional effect. The Chinese recipient immediately recognizes the quote and feels comforted.'
  },
  {
    id: 'c22-duiou-chunlian',
    title: '春联 — composer son couplet de Nouvel An',
    titleEn: '春联 — compose your New Year couplet',
    body:
      'Les 春联 (couplets du Nouvel An) sont collés en pairs sur les portes pour les fêtes. Format : 2 vers parallèles (généralement 7 caractères chacun) + un BANDEAU HORIZONTAL au-dessus (4 caractères). Exemple classique : 上联 (vers du haut, à droite si on regarde la porte) : 一帆风顺年年好 (« voile en plein vent, chaque année bonne »). 下联 (vers du bas, à gauche) : 万事如意步步高 (« 10 000 affaires comme on les veut, pas après pas plus haut »). 横批 (bandeau) : 吉祥如意 (« auspice et succès »). Règles : (1) 上联 finit par 仄 (ton oblique 3 ou 4), (2) 下联 finit par 平 (ton plat 1 ou 2), (3) parallélisme strict mots à mots. Activité familiale annuelle qui transmet le 对偶 aux enfants.',
    bodyEn:
      '春联 (New Year couplets) are pasted in pairs on doors for festivals. Format: 2 parallel lines (usually 7 characters each) + a HORIZONTAL BANNER above (4 characters). Classic example: 上联 (upper line, on the right facing the door): 一帆风顺年年好 («smooth-sailing, year after year good»). 下联 (lower line, on the left): 万事如意步步高 («10,000 things as wished, step by step higher»). 横批 (banner): 吉祥如意 («auspicious and as wished»). Rules: (1) 上联 ends with 仄 (oblique tone 3 or 4), (2) 下联 ends with 平 (level tone 1 or 2), (3) strict word-by-word parallelism. Annual family activity transmitting 对偶 to children.',
    items: [
      { hanzi: '上联', pinyin: 'shàng lián', meaning: 'vers du haut', meaningEn: 'upper line', audio: 'audio/hsk6/hsk6_上联.wav' },
      { hanzi: '下联', pinyin: 'xià lián', meaning: 'vers du bas', meaningEn: 'lower line', audio: 'audio/hsk6/hsk6_下联.wav' },
      { hanzi: '横批', pinyin: 'héng pī', meaning: 'bandeau horizontal', meaningEn: 'horizontal banner', audio: 'audio/hsk6/hsk6_横批.wav' },
      { hanzi: '吉祥', pinyin: 'jí xiáng', meaning: 'auspicieux', meaningEn: 'auspicious', audio: 'audio/hsk6/hsk6_吉祥.wav' },
      { hanzi: '一帆风顺', pinyin: 'yì fān fēng shùn', meaning: 'navigation paisible', meaningEn: 'smooth sailing', audio: 'audio/hsk6/hsk6_一帆.wav' }
    ],
    tip:
      'Si tu es invité chez des Chinois pour le Nouvel An, regarde leurs 春联 et lis-les à voix haute. Si tu peux faire un commentaire (« 这副春联很有意境 ») = signal IMMÉDIAT que tu connais la culture. Effet : tes hôtes te traitent comme un proche cultivé, pas comme un étranger.',
    tipEn:
      'If invited to Chinese for New Year, look at their 春联 and read aloud. If you can comment («这副春联很有意境») = IMMEDIATE signal you know the culture. Effect: your hosts treat you as a cultured friend, not a foreigner.'
  }
];

export const c22RhetoricM2LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c22-biyu-3-types',
    title: '比喻 — métaphore en 3 saveurs',
    titleEn: '比喻 — metaphor in 3 flavors',
    body:
      '明喻 (míngyù, comparaison explicite) utilise un MOT DE LIAISON : 像 (xiàng), 如 (rú), 仿佛 (fǎngfú), 好像 (hǎoxiàng). « 她像花一样美 » = « belle comme une fleur ». Le plus simple. 暗喻 (ànyù, métaphore implicite) supprime le mot de liaison : « 她是花 » = « elle est une fleur ». Plus puissant car le rapprochement est ASSERTIF. 借喻 (jièyù, métaphore par substitution) remplace COMPLÈTEMENT le sujet par son comparant. « 那朵花来了 » (« la fleur est arrivée ») = elle est venue. Le LECTEUR DOIT DEVINER. Plus poétique, demande complicité. Ces 3 niveaux marquent une PROGRESSION de subtilité. Le 借喻 est typique de la poésie lettrée — à manier avec parcimonie en prose moderne.',
    bodyEn:
      '明喻 (explicit simile) uses a LINKING WORD: 像, 如, 仿佛, 好像. «她像花一样美» = «beautiful like a flower». Simplest. 暗喻 (implicit metaphor) drops the linking word: «她是花» = «she is a flower». More powerful as the link is ASSERTIVE. 借喻 (substitution metaphor) FULLY replaces the subject with its vehicle. «那朵花来了» («the flower has arrived») = she came. The READER MUST GUESS. More poetic, requires complicity. These 3 levels mark a PROGRESSION of subtlety. 借喻 is typical of literary poetry — handle sparingly in modern prose.',
    items: [
      { hanzi: '明喻', pinyin: 'míng yù', meaning: 'comparaison explicite', meaningEn: 'explicit simile', audio: 'audio/hsk6/hsk6_明喻.wav' },
      { hanzi: '暗喻', pinyin: 'àn yù', meaning: 'métaphore implicite', meaningEn: 'implicit metaphor', audio: 'audio/hsk6/hsk6_暗喻.wav' },
      { hanzi: '借喻', pinyin: 'jiè yù', meaning: 'métaphore substitutive', meaningEn: 'substitution metaphor', audio: 'audio/hsk6/hsk6_借喻.wav' },
      { hanzi: '仿佛', pinyin: 'fǎng fú', meaning: 'comme si', meaningEn: 'as if', audio: 'audio/hsk5/hsk5_仿佛.wav' },
      { hanzi: '修辞', pinyin: 'xiū cí', meaning: 'rhétorique', meaningEn: 'rhetoric', audio: 'audio/hsk6/hsk6_修辞.wav' }
    ],
    tip:
      'En écrit C2.2, ALTERNE les 3 niveaux de 比喻. Trop de 明喻 = naïf. Trop de 借喻 = précieux. Le bon dosage : 70% 明喻, 25% 暗喻, 5% 借喻 pour les moments forts. Cette PROPORTION = signature du style mature.',
    tipEn:
      'In C2.2 writing, ALTERNATE the 3 metaphor levels. Too much 明喻 = naive. Too much 借喻 = precious. Right balance: 70% 明喻, 25% 暗喻, 5% 借喻 for strong moments. This PROPORTION = mature style signature.'
  },
  {
    id: 'c22-niren-kuazhang',
    title: '拟人 + 夸张 — animer et amplifier',
    titleEn: '拟人 + 夸张 — animate and amplify',
    body:
      '拟人 (nǐrén, personnification) prête des traits HUMAINS à des inanimés. Ex : 风唱着歌 (le vent chante), 花儿微笑 (les fleurs sourient), 时间偷走了我的青春 (le temps a volé ma jeunesse). Création d\'INTIMITÉ avec la nature/les objets. Très fréquent en chanson, poésie, prose lyrique. 夸张 (kuāzhāng, hyperbole) AMPLIFIE à l\'extrême. 李白 est le maître absolu : 白发三千丈 (« mes cheveux blancs ont 9000 mètres de long ») dans 《秋浦歌》. Sens : sa tristesse est SI grande que ses cheveux blancs n\'en finissent plus. Autre : 飞流直下三千尺 (« la chute d\'eau dévale 900 mètres »). En prose moderne, doser : 1-2 hyperboles fortes par texte. Excès = ridicule. Bien dosée, l\'hyperbole est l\'OUTIL ÉMOTIONNEL n°1 de la rhétorique chinoise.',
    bodyEn:
      '拟人 (personification) gives HUMAN traits to inanimates. Ex: 风唱着歌 (the wind sings), 花儿微笑 (flowers smile), 时间偷走了我的青春 (time stole my youth). Creates INTIMACY with nature/objects. Very frequent in song, poetry, lyrical prose. 夸张 (hyperbole) AMPLIFIES to extremes. 李白 is the absolute master: 白发三千丈 («my white hair is 9000 meters long») in 《秋浦歌》. Meaning: his sadness is SO great his white hair is endless. Another: 飞流直下三千尺 («the waterfall plunges 900 meters»). In modern prose, calibrate: 1-2 strong hyperboles per text. Excess = ridicule. Well-dosed, hyperbole is the #1 EMOTIONAL TOOL of Chinese rhetoric.',
    items: [
      { hanzi: '拟人', pinyin: 'nǐ rén', meaning: 'personnification', meaningEn: 'personification', audio: 'audio/hsk6/hsk6_拟人.wav' },
      { hanzi: '夸张', pinyin: 'kuā zhāng', meaning: 'hyperbole', meaningEn: 'hyperbole', audio: 'audio/hsk5/hsk5_夸张.wav' },
      { hanzi: '白发三千丈', pinyin: 'bái fà sān qiān zhàng', meaning: 'cheveux blancs immenses', meaningEn: 'immensely long white hair', audio: 'audio/hsk6/hsk6_白发.wav' },
      { hanzi: '青春', pinyin: 'qīng chūn', meaning: 'jeunesse', meaningEn: 'youth', audio: 'audio/hsk5/hsk5_青春.wav' },
      { hanzi: '飞流', pinyin: 'fēi liú', meaning: 'cascade volante', meaningEn: 'flying cascade', audio: 'audio/hsk6/hsk6_飞流.wav' }
    ],
    tip:
      'Citation 李白 « 白发三千丈 » à utiliser pour exprimer une émotion exagérée mais ressentie : « 听到这消息，我真是 \'白发三千丈\' » (à cette nouvelle, j\'avais l\'impression que mes cheveux blancs poussaient). Effet humoristique-poétique très chinois.',
    tipEn:
      'Li Bai\'s «白发三千丈» quote to express felt exaggerated emotion: «听到这消息，我真是\'白发三千丈\'» (at this news, I felt my white hair growing). Very Chinese humorous-poetic effect.'
  }
];

export const c22RhetoricM3LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c22-registres-spectre',
    title: 'Le spectre des registres : 4 niveaux',
    titleEn: 'The register spectrum: 4 levels',
    body:
      '(1) 大白话 (très oral familier) : pronoms 咱们 (« nous » incl), interjections 啊/呢/嘛, lexique réduit (啥 = 什么, 瞧 = 看). À utiliser entre amis, famille, en messages WeChat informels. (2) 标准普通话 (mandarin standard, neutre) : registre du JT, des manuels, des conversations pro normales. (3) 书面语 (langue écrite soutenue) : phrases plus longues, particules 的→之 partielles, conjonctions 因此/然而, vocabulaire bisyllabique recherché. (4) 文言化 (teinté de classique) : nombreuses formules en 4 caractères, particules classiques 之/者/也, structures elliptiques. Pour discours officiel, calligraphie, articles académiques. ERREUR n°1 d\'apprenant : utiliser 1 mot du mauvais registre dans une phrase = malaise immédiat. Ex : « 兄弟，请您拨冗审阅 » mêle familier (兄弟) et très soutenu (拨冗审阅). Inacceptable.',
    bodyEn:
      '(1) 大白话 (very casual oral): pronouns 咱们 (incl. «we»), interjections 啊/呢/嘛, reduced lexicon (啥 = 什么, 瞧 = 看). Use among friends, family, casual WeChat. (2) 标准普通话 (Standard Mandarin, neutral): register of news, textbooks, normal pro conversations. (3) 书面语 (formal written language): longer sentences, partial 的→之, conjunctions 因此/然而, refined bisyllabic vocabulary. (4) 文言化 (classical-tinged): many 4-char formulas, classical particles 之/者/也, elliptical structures. For official speech, calligraphy, academic articles. Learner mistake #1: using 1 word of the wrong register in a sentence = immediate awkwardness. Ex: «兄弟，请您拨冗审阅» mixes casual (兄弟) and very formal (拨冗审阅). Unacceptable.',
    items: [
      { hanzi: '大白话', pinyin: 'dà bái huà', meaning: 'parler très familier', meaningEn: 'very casual speech', audio: 'audio/hsk6/hsk6_大白话.wav' },
      { hanzi: '书面语', pinyin: 'shū miàn yǔ', meaning: 'langue écrite', meaningEn: 'written register', audio: 'audio/hsk6/hsk6_书面语.wav' },
      { hanzi: '咱们', pinyin: 'zán men', meaning: 'nous (inclusif oral)', meaningEn: 'we (incl. oral)', audio: 'audio/hsk5/hsk5_咱们.wav' },
      { hanzi: '啥', pinyin: 'shá', meaning: 'quoi (familier)', meaningEn: 'what (casual)', audio: 'audio/hsk6/hsk6_啥.wav' },
      { hanzi: '瞧', pinyin: 'qiáo', meaning: 'regarder (familier)', meaningEn: 'look (casual)', audio: 'audio/hsk5/hsk5_瞧.wav' }
    ],
    tip:
      'Test du registre : avant d\'envoyer un message pro chinois, RELIS-LE en te demandant : « est-ce que TOUS les mots vivent dans le même monde ? ». Si UN mot dépasse en familiarité ou en soutenu, REMPLACE-LE. Cohérence = signal de maîtrise C2.2.',
    tipEn:
      'Register test: before sending a Chinese pro message, REREAD asking: «do ALL words live in the same world?». If ONE word stands out in casualness or formality, REPLACE it. Consistency = C2.2 mastery signal.'
  },
  {
    id: 'c22-naviguer-spectre',
    title: 'Naviguer sur le spectre : exemple pratique',
    titleEn: 'Navigate the spectrum: practical example',
    body:
      'Prenons UNE même idée à exprimer dans 4 registres : « j\'arrive en retard à cause des transports ». (1) 大白话 : 哎，路上太堵了，我晚点到. (2) 标准 : 不好意思，路上堵车，我会晚一点到. (3) 书面语 : 由于交通拥堵，本人将略迟于约定时间抵达. (4) 文言化 : 因途中阻塞，恕余迟至. Notez : « je » varie de 我 → 我 → 本人 → 余 (= moi en classique). « être en retard » varie de 晚点 → 晚一点 → 略迟于约定时间 → 迟至. « excuse-moi » varie de absent → 不好意思 → absent → 恕 (« pardonne »). Maîtriser ce GLISSEMENT entre registres pour la même idée = compétence C2.2 ultime. La plupart des francophones plafonnent au niveau 2 ; passer aux niveaux 3-4 ouvre des mondes.',
    bodyEn:
      'Take ONE same idea to express in 4 registers: «I\'m arriving late due to transit». (1) 大白话: 哎，路上太堵了，我晚点到. (2) 标准: 不好意思，路上堵车，我会晚一点到. (3) 书面语: 由于交通拥堵，本人将略迟于约定时间抵达. (4) 文言化: 因途中阻塞，恕余迟至. Note: «I» varies from 我 → 我 → 本人 → 余 (= classical I). «be late» varies from 晚点 → 晚一点 → 略迟于约定时间 → 迟至. «excuse me» varies from absent → 不好意思 → absent → 恕 («forgive»). Mastering this REGISTER SHIFT for the same idea = ultimate C2.2 skill. Most French speakers plateau at level 2; rising to 3-4 opens worlds.',
    items: [
      { hanzi: '本人', pinyin: 'běn rén', meaning: 'moi (formel)', meaningEn: 'I (formal)', audio: 'audio/hsk6/hsk6_本人.wav' },
      { hanzi: '余', pinyin: 'yú', meaning: 'moi (classique)', meaningEn: 'I (classical)', audio: 'audio/hsk6/hsk6_余.wav' },
      { hanzi: '抵达', pinyin: 'dǐ dá', meaning: 'arriver (formel)', meaningEn: 'arrive (formal)', audio: 'audio/hsk6/hsk6_抵达.wav' },
      { hanzi: '拥堵', pinyin: 'yōng dǔ', meaning: 'embouteillage (formel)', meaningEn: 'traffic jam (formal)', audio: 'audio/hsk6/hsk6_拥堵.wav' },
      { hanzi: '恕', pinyin: 'shù', meaning: 'pardonner (classique)', meaningEn: 'forgive (classical)', audio: 'audio/hsk6/hsk6_恕.wav' }
    ],
    tip:
      'Exercice C2.2 : prends 5 phrases banales et écris-les dans les 4 registres. Au bout de 20 phrases × 4 = 80 versions. Cette gymnastique INSTALLE le sens du registre. Plus formateur que 100 leçons théoriques. Routine recommandée 1 fois par semaine.',
    tipEn:
      'C2.2 exercise: take 5 mundane sentences and write them in 4 registers. After 20 sentences × 4 = 80 versions. This gymnastics INSTALLS register sense. More formative than 100 theoretical lessons. Recommended weekly routine.'
  }
];

// --- translation ------------------------------------------------------------

export const c22TranslationM1LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c22-yanfu-trois-criteres',
    title: '严复 et 信达雅 — la matrice fondatrice',
    titleEn: '严复 and 信达雅 — the founding matrix',
    body:
      '严复 (Yan Fu, 1854-1921), traducteur du « Évolution et éthique » de T.H. Huxley, formule en 1898 dans sa préface : 译事三难 信达雅 — « 3 difficultés en traduction : fidélité, fluidité, élégance ». 信 (xìn) : NE PAS TRAHIR le sens du texte source. Critère absolu mais souvent en tension avec les 2 autres. 达 (dá) : que le texte CIBLE COULE NATURELLEMENT, sans calques de la langue source. 雅 (yǎ) : CHOISIR un registre élevé, élégant. Yan Fu lui-même traduisait du Huxley en chinois classique 文言 — choix très 雅 mais discuté côté 达 pour les lecteurs modernes. Ces 3 critères restent la GRILLE D\'ÉVALUATION standard des traductions chinoises depuis 125 ans. Tout traducteur contemporain s\'y réfère explicitement.',
    bodyEn:
      '严复 (Yan Fu, 1854-1921), translator of T.H. Huxley\'s «Evolution and Ethics», formulates in 1898 in his preface: 译事三难 信达雅 — «3 difficulties in translation: faithfulness, fluency, elegance». 信 (xìn): DON\'T BETRAY source text meaning. Absolute criterion but often in tension with the other 2. 达 (dá): let the TARGET text FLOW NATURALLY, without source-language calques. 雅 (yǎ): CHOOSE an elevated, elegant register. Yan Fu himself translated Huxley into classical 文言 — very 雅 choice but debated on 达 for modern readers. These 3 criteria remain the standard EVALUATION GRID for Chinese translations for 125 years. Every contemporary translator explicitly references them.',
    items: [
      { hanzi: '严复', pinyin: 'yán fù', meaning: 'Yan Fu (traducteur)', meaningEn: 'Yan Fu', audio: 'audio/hsk6/hsk6_严复.wav' },
      { hanzi: '信达雅', pinyin: 'xìn dá yǎ', meaning: 'fidélité-fluidité-élégance', meaningEn: 'faithfulness-fluency-elegance', audio: 'audio/hsk6/hsk6_信达雅.wav' },
      { hanzi: '信', pinyin: 'xìn', meaning: 'fidélité', meaningEn: 'faithfulness', audio: 'audio/hsk3/hsk3_信.wav' },
      { hanzi: '达', pinyin: 'dá', meaning: 'fluidité, parvenir', meaningEn: 'fluency, reach', audio: 'audio/hsk5/hsk5_达.wav' },
      { hanzi: '雅', pinyin: 'yǎ', meaning: 'élégance', meaningEn: 'elegance', audio: 'audio/hsk5/hsk5_雅.wav' }
    ],
    tip:
      'Pour défendre un choix de traduction face à un client chinois : « 我做了 信达雅 的取舍，优先 X » (j\'ai fait un compromis entre les 3 critères, en privilégiant X). Cette phrase SIGNALE ta connaissance théorique + justifie ton choix. Effet immédiat sur la crédibilité.',
    tipEn:
      'To defend a translation choice to a Chinese client: «我做了 信达雅 的取舍，优先 X» (I made a compromise between the 3 criteria, prioritizing X). This phrase SIGNALS theoretical knowledge + justifies your choice. Immediate effect on credibility.'
  },
  {
    id: 'c22-luxun-debate',
    title: 'Lu Xun vs Yan Fu — le grand débat traductologique',
    titleEn: 'Lu Xun vs Yan Fu — the great translation debate',
    body:
      '鲁迅 (Lu Xun), traducteur prolifique au début XXe, RÉFUTE la hiérarchie de Yan Fu. Sa formule : 宁信而不顺 = « plutôt fidèle qu\'aisé ». Pour Lu Xun, traduire = INTRODUIRE de la STRANGENESS dans la langue cible, ne pas la lisser. Préserver la résistance du texte source = enrichir le chinois moderne. Cette position « foreignisante » s\'oppose à la « domestication » qui adapte tout au lecteur cible. Débat occidental parallèle : Schleiermacher (1813), Venuti (1995). Lu Xun traduit Gogol, Tolstoï, en gardant des structures russes étranges en chinois — pour FERTILISER le chinois moderne en formation. Aujourd\'hui : la plupart des traducteurs adoptent un MOYEN TERME — 信 prioritaire mais pas au prix de l\'illisibilité. Discussion permanente en traductologie chinoise.',
    bodyEn:
      '鲁迅 (Lu Xun), prolific early-20th-c translator, REFUTES Yan Fu\'s hierarchy. His formula: 宁信而不顺 = «better faithful than smooth». For Lu Xun, translating = INTRODUCING STRANGENESS into the target language, not smoothing it. Preserving source-text resistance = enriching modern Chinese. This «foreignizing» stance opposes «domestication» which adapts everything to the target reader. Parallel Western debate: Schleiermacher (1813), Venuti (1995). Lu Xun translates Gogol, Tolstoy, keeping strange Russian structures in Chinese — to FERTILIZE the forming modern Chinese. Today: most translators adopt a MIDDLE GROUND — 信 priority but not at the cost of unreadability. Permanent discussion in Chinese translation studies.',
    items: [
      { hanzi: '鲁迅', pinyin: 'lǔ xùn', meaning: 'Lu Xun', meaningEn: 'Lu Xun', audio: 'audio/hsk6/hsk6_鲁迅.wav' },
      { hanzi: '宁信而不顺', pinyin: 'nìng xìn ér bú shùn', meaning: 'plutôt fidèle qu\'aisé', meaningEn: 'rather faithful than smooth', audio: 'audio/hsk6/hsk6_宁信.wav' },
      { hanzi: '异化', pinyin: 'yì huà', meaning: 'foreignisation', meaningEn: 'foreignization', audio: 'audio/hsk6/hsk6_异化.wav' },
      { hanzi: '归化', pinyin: 'guī huà', meaning: 'domestication', meaningEn: 'domestication', audio: 'audio/hsk6/hsk6_归化.wav' },
      { hanzi: '丰富', pinyin: 'fēng fù', meaning: 'enrichir', meaningEn: 'enrich', audio: 'audio/hsk4/hsk4_丰富.wav' }
    ],
    tip:
      'En discussion académique chinoise sur la traduction : « 我倾向于鲁迅的异化原则 » (je penche pour le principe foreignisant de Lu Xun) ou « 我更同意严复的本土化 » (je préfère la domestication de Yan Fu). Ce simple positionnement signale immédiatement ton niveau théorique.',
    tipEn:
      'In Chinese academic discussion on translation: «我倾向于鲁迅的异化原则» (I lean to Lu Xun\'s foreignizing principle) or «我更同意严复的本土化» (I prefer Yan Fu\'s domestication). Simple positioning that immediately signals your theoretical level.'
  }
];

export const c22TranslationM2LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c22-pieges-grammaticaux',
    title: 'Pièges grammaticaux FR/EN → ZH',
    titleEn: 'FR/EN → ZH grammatical traps',
    body:
      '(1) ARTICLES : « le », « la », « the » N\'EXISTENT PAS en chinois. Ne pas chercher à les traduire — élimine-les. (2) PLURIELS : « les chats » → 猫 (sans -s). Marquage pluriel uniquement avec 些 (些猫 « ces chats ») ou pour humains avec 们 (学生们). (3) TEMPS : pas de conjugaison. Le passé se rend par 了 (action accomplie) + adverbe temporel (昨天 hier). « J\'ai mangé » = 我吃了 ou 我昨天吃了. (4) RELATIFS : « la personne QUI parle » → la subordonnée passe AVANT le nom : 说话的人 (parler-的-personne). Ordre INVERSÉ par rapport au français/anglais. (5) PASSIF : 被 indique le passif mais s\'utilise SURTOUT pour des actions négatives. « Il a été récompensé » se dira mieux 他得到了奖 (actif) que 他被奖励 (lourd). Maîtriser ces 5 pièges = gain de NATUREL immédiat.',
    bodyEn:
      '(1) ARTICLES: «the», «le», «la» DON\'T EXIST in Chinese. Don\'t try to translate them — eliminate them. (2) PLURALS: «the cats» → 猫 (no -s). Plural marking only with 些 (些猫 «these cats») or for humans with 们 (学生们). (3) TENSE: no conjugation. Past rendered by 了 (completed action) + time adverb (昨天 yesterday). «I ate» = 我吃了 or 我昨天吃了. (4) RELATIVES: «the person WHO speaks» → subordinate goes BEFORE the noun: 说话的人 (speak-的-person). REVERSED order vs French/English. (5) PASSIVE: 被 marks passive but is used MOSTLY for negative actions. «He was rewarded» better said 他得到了奖 (active) than 他被奖励 (heavy). Mastering these 5 traps = immediate NATURAL boost.',
    items: [
      { hanzi: '了', pinyin: 'le', meaning: 'particule d\'accomplissement', meaningEn: 'completion particle', audio: 'audio/hsk1/hsk1_了.wav' },
      { hanzi: '些', pinyin: 'xiē', meaning: 'quelques (pluriel)', meaningEn: 'some (plural)', audio: 'audio/hsk1/hsk1_些.wav' },
      { hanzi: '们', pinyin: 'men', meaning: 'pluriel humain', meaningEn: 'human plural', audio: 'audio/hsk1/hsk1_们.wav' },
      { hanzi: '被', pinyin: 'bèi', meaning: 'passif', meaningEn: 'passive', audio: 'audio/hsk3/hsk3_被.wav' },
      { hanzi: '主动', pinyin: 'zhǔ dòng', meaning: 'actif', meaningEn: 'active', audio: 'audio/hsk5/hsk5_主动.wav' }
    ],
    tip:
      'Test naturel pour ta traduction zh : SUPPRIME tous les articles, vérifie que tes 了 sont placés (action accomplie pas pluriel), inverse les relatifs avec 的 avant le nom. Si après ces 3 corrections ta phrase chinoise sonne FLUIDE, tu es au niveau 达 (fluidité) de Yan Fu.',
    tipEn:
      'Natural test for your zh translation: REMOVE all articles, check 了 placement (completed action not plural), invert relatives with 的 before the noun. If after these 3 corrections your Chinese sentence sounds FLUID, you\'re at Yan Fu\'s 达 (fluency) level.'
  },
  {
    id: 'c22-faux-amis',
    title: 'Faux amis lexicaux : 爱人 / 同志 / 厉害',
    titleEn: 'Lexical false friends: 爱人 / 同志 / 厉害',
    body:
      '爱人 (àirén, litt. « personne aimée ») = CONJOINT (mari/femme) en chinois moderne, PAS « amant(e) » comme on pourrait croire. Question pro standard : « 您爱人是做什么的 ? » (votre conjoint fait quoi dans la vie ?). 同志 (tóngzhì, litt. « même volonté ») = CAMARADE en sens politique communiste, MAIS en argot moderne (depuis les années 90 à Hong Kong) = HOMOSEXUEL. Donc 同志酒吧 = bar gay. Évite d\'appeler quelqu\'un 同志 sauf cadre politique formel. 厉害 (lìhai) = AMBIVALENT : peut signifier « formidable, impressionnant » (positif : 你真厉害 = tu es génial !) OU « terrible, sévère » (négatif : 这个老板很厉害 = ce patron est dur). Le contexte tranche. Ces 3 faux amis piègent SYSTÉMATIQUEMENT les francophones — à connaître par cœur.',
    bodyEn:
      '爱人 (àirén, lit. «loved person») = SPOUSE (husband/wife) in modern Chinese, NOT «lover» as one might think. Standard pro question: «您爱人是做什么的?» (what does your spouse do?). 同志 (tóngzhì, lit. «same will») = COMRADE in communist political sense, BUT in modern slang (since 90s in Hong Kong) = HOMOSEXUAL. So 同志酒吧 = gay bar. Avoid calling someone 同志 except in formal political context. 厉害 (lìhai) = AMBIVALENT: can mean «impressive» (positive: 你真厉害 = you\'re great!) OR «terrible, severe» (negative: 这个老板很厉害 = this boss is tough). Context decides. These 3 false friends SYSTEMATICALLY trap French speakers — learn by heart.',
    items: [
      { hanzi: '爱人', pinyin: 'ài rén', meaning: 'conjoint(e)', meaningEn: 'spouse', audio: 'audio/hsk5/hsk5_爱人.wav' },
      { hanzi: '同志', pinyin: 'tóng zhì', meaning: 'camarade / homosexuel', meaningEn: 'comrade / homosexual', audio: 'audio/hsk5/hsk5_同志.wav' },
      { hanzi: '厉害', pinyin: 'lì hai', meaning: 'formidable / sévère', meaningEn: 'great / severe', audio: 'audio/hsk4/hsk4_厉害.wav' },
      { hanzi: '配偶', pinyin: 'pèi ǒu', meaning: 'conjoint (formel)', meaningEn: 'spouse (formal)', audio: 'audio/hsk6/hsk6_配偶.wav' },
      { hanzi: '歧义', pinyin: 'qí yì', meaning: 'ambiguïté', meaningEn: 'ambiguity', audio: 'audio/hsk6/hsk6_歧义.wav' }
    ],
    tip:
      'Si tu rencontres un Chinois et qu\'il dit « 您好，这是我爱人 » en présentant qqn, c\'est sa FEMME/SON MARI, pas une histoire d\'adultère. Réagir avec calme : « 您好，幸会 ! ». Cette mécompréhension a causé bien des malaises diplomatiques dans les années 80-90 — sois alerte.',
    tipEn:
      'If you meet a Chinese saying «您好，这是我爱人» when introducing someone, that\'s their WIFE/HUSBAND, not an affair story. React calmly: «您好，幸会!». This misunderstanding caused many diplomatic awkwardnesses in the 80s-90s — be alert.'
  }
];

export const c22TranslationM3LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c22-yuanfen-qi',
    title: '缘分 + 气 — l\'intraduisible métaphysique',
    titleEn: '缘分 + 气 — the metaphysical untranslatable',
    body:
      '缘分 (yuánfèn) = AFFINITÉ PRÉDESTINÉE entre 2 êtres. Concept bouddhiste : nos rencontres ne sont pas accidentelles, elles obéissent à un karma qui rapproche ce qui doit se rejoindre. « Vous êtes destinés » est UN équivalent fade. Usage courant : « 我们有缘 » (nous avons du yuanfen — nous étions destinés à nous rencontrer). À utiliser pour évoquer une rencontre marquante, un couple bien assorti, des amis qui se retrouvent par hasard. 气 (qì) = ÉNERGIE VITALE, principe animique qui circule dans tout être et toute chose. Pas seulement « souffle » (sens médical occidental) mais ÉNERGIE COSMIQUE. Le 气功 (qigong) cultive ce 气. Le 元气 (yuánqì) est l\'énergie originelle. Le 气场 (qìchǎng) est l\'aura d\'une personne. La traduction « énergie » manque la dimension MÉTAPHYSIQUE.',
    bodyEn:
      '缘分 (yuánfèn) = PREDESTINED AFFINITY between 2 beings. Buddhist concept: our meetings aren\'t accidental, they obey a karma that brings together what must reunite. «You\'re destined» is a flat equivalent. Common use: «我们有缘» (we have yuanfen — we were destined to meet). Use to evoke a striking encounter, a well-matched couple, friends meeting by chance. 气 (qì) = VITAL ENERGY, animating principle circulating in every being and thing. Not just «breath» (Western medical sense) but COSMIC ENERGY. 气功 (qigong) cultivates this 气. 元气 (yuánqì) is original energy. 气场 (qìchǎng) is a person\'s aura. The translation «energy» misses the METAPHYSICAL dimension.',
    items: [
      { hanzi: '缘分', pinyin: 'yuán fèn', meaning: 'affinité prédestinée', meaningEn: 'predestined affinity', audio: 'audio/hsk6/hsk6_缘分.wav' },
      { hanzi: '气', pinyin: 'qì', meaning: 'énergie vitale', meaningEn: 'vital energy', audio: 'audio/hsk1/hsk1_气.wav' },
      { hanzi: '气功', pinyin: 'qì gōng', meaning: 'qigong', meaningEn: 'qigong', audio: 'audio/hsk6/hsk6_气功.wav' },
      { hanzi: '元气', pinyin: 'yuán qì', meaning: 'énergie originelle', meaningEn: 'original energy', audio: 'audio/hsk6/hsk6_元气.wav' },
      { hanzi: '气场', pinyin: 'qì chǎng', meaning: 'aura', meaningEn: 'aura', audio: 'audio/hsk6/hsk6_气场.wav' }
    ],
    tip:
      'À une rencontre fortuite avec quelqu\'un qui te plaît (ami potentiel, futur partenaire pro), dis : « 我们真有缘 » (nous avons vraiment du yuanfen). Phrase chargée culturellement, signale ta sensibilité à la dimension presque mystique des rencontres. Effet émotionnel chez l\'interlocuteur chinois.',
    tipEn:
      'On a fortuitous meeting with someone you like (potential friend, future business partner), say: «我们真有缘» (we really have yuanfen). Culturally loaded phrase, signals your sensitivity to the almost mystical dimension of meetings. Emotional effect on Chinese interlocutor.'
  },
  {
    id: 'c22-jianghu-xiaoku',
    title: '江湖 + 吃苦 — concepts-monde',
    titleEn: '江湖 + 吃苦 — world-concepts',
    body:
      '江湖 (jiānghú, litt. « fleuves et lacs ») = MONDE PARALLÈLE des chevaliers errants 武侠 (wǔxiá), des codes d\'honneur des arts martiaux, des hors-la-loi nobles. Univers des romans de 金庸 (Jin Yong, le Tolkien chinois). Sens MODERNE étendu : tout milieu marginal avec ses règles non écrites — 商场如江湖 (le monde des affaires est comme le 江湖). 吃苦 (chīkǔ, « manger l\'amer ») = ENDURER les épreuves, accepter la souffrance comme PRIX du succès. Vertu chinoise CARDINALE — pas simplement « souffrir » au sens passif. 中国人能吃苦 (les Chinois savent endurer) est UN cliché auto-flatteur partagé par les Chinois. Demander à un junior chinois : « 你能吃苦吗 ? » (peux-tu endurer ?) lors d\'un entretien teste son ENGAGEMENT. La traduction « can you tolerate hardship? » manque la dimension VERTU.',
    bodyEn:
      '江湖 (jiānghú, lit. «rivers and lakes») = PARALLEL WORLD of wandering knights 武侠 (wuxia), martial arts honor codes, noble outlaws. Universe of 金庸 (Jin Yong, the Chinese Tolkien) novels. Extended MODERN sense: any marginal milieu with unwritten rules — 商场如江湖 (business world is like 江湖). 吃苦 (chīkǔ, «eat the bitter») = ENDURE hardship, accept suffering as the PRICE of success. CARDINAL Chinese virtue — not just passive «suffer». 中国人能吃苦 (Chinese can endure) is a self-flattering cliché shared by Chinese. Asking a Chinese junior «你能吃苦吗?» (can you endure?) in an interview tests their COMMITMENT. The translation «can you tolerate hardship?» misses the VIRTUE dimension.',
    items: [
      { hanzi: '江湖', pinyin: 'jiāng hú', meaning: 'monde parallèle (chevalerie)', meaningEn: 'martial-arts world', audio: 'audio/hsk6/hsk6_江湖.wav' },
      { hanzi: '武侠', pinyin: 'wǔ xiá', meaning: 'chevalier errant', meaningEn: 'wandering knight', audio: 'audio/hsk6/hsk6_武侠.wav' },
      { hanzi: '金庸', pinyin: 'jīn yōng', meaning: 'Jin Yong', meaningEn: 'Jin Yong', audio: 'audio/hsk6/hsk6_金庸.wav' },
      { hanzi: '吃苦', pinyin: 'chī kǔ', meaning: 'endurer (vertu)', meaningEn: 'endure hardship', audio: 'audio/hsk5/hsk5_吃苦.wav' },
      { hanzi: '委屈', pinyin: 'wěi qū', meaning: 'sentir l\'injustice', meaningEn: 'feel wronged', audio: 'audio/hsk5/hsk5_委屈.wav' }
    ],
    tip:
      'En interview chinoise, si on te demande « 你能吃苦吗 ? », réponds : « 我有过艰苦的经历，我知道吃苦是成长的一部分 » (j\'ai vécu des moments difficiles, je sais qu\'endurer fait partie de la croissance). Cette réponse INTÈGRE le concept dans ta narrative + signale ta maturité.',
    tipEn:
      'In a Chinese interview, if asked «你能吃苦吗?», answer: «我有过艰苦的经历，我知道吃苦是成长的一部分» (I\'ve had hard moments, I know enduring is part of growth). This response INTEGRATES the concept into your narrative + signals your maturity.'
  }
];

// --- modern-lit -------------------------------------------------------------

export const c22ModernLitM1LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c22-ecrire-sous-mao',
    title: 'Écrire sous Mao : contraintes et adaptations',
    titleEn: 'Writing under Mao: constraints and adaptations',
    body:
      'De 1942 (Discours de Yan\'an de Mao sur la littérature) à 1978, la littérature chinoise est SOUMISE au principe : 文学服务工农兵 (la littérature au service des ouvriers, paysans, soldats). Conséquences : (1) thèmes obligés (lutte des classes, héros révolutionnaires, mariages pour la cause) ; (2) personnages stéréotypés (méchants propriétaires, paysans purs) ; (3) écrivains AUTRES réduits au silence ou envoyés à la campagne 下放 (Lao She suicide en 1966, Ba Jin et Ding Ling persécutés). Quelques textes survivent malgré tout : 《红岩》(roman révolutionnaire qui a marqué). Après la mort de Mao (1976) puis 1978, ÉCLOSION : 伤痕文学 (littérature des cicatrices) brise le silence. 刘心武 《班主任》(1977) raconte l\'éducation déformée de la 文革 — première rupture publique avec la rhétorique officielle.',
    bodyEn:
      'From 1942 (Mao\'s Yan\'an Talks on Literature) to 1978, Chinese literature is SUBJECT to the principle: 文学服务工农兵 (literature in service of workers, peasants, soldiers). Consequences: (1) mandatory themes (class struggle, revolutionary heroes, cause marriages); (2) stereotyped characters (evil landlords, pure peasants); (3) OTHER writers silenced or sent to countryside 下放 (Lao She suicide in 1966, Ba Jin and Ding Ling persecuted). A few texts survive nonetheless: 《红岩》(revolutionary novel that marked). After Mao\'s death (1976) then 1978, BLOSSOMING: 伤痕文学 (scar literature) breaks the silence. 刘心武 《班主任》(1977) tells the warped 文革 education — first public break with official rhetoric.',
    items: [
      { hanzi: '服务', pinyin: 'fú wù', meaning: 'servir', meaningEn: 'serve', audio: 'audio/hsk4/hsk4_服务.wav' },
      { hanzi: '工农兵', pinyin: 'gōng nóng bīng', meaning: 'ouvriers paysans soldats', meaningEn: 'workers-peasants-soldiers', audio: 'audio/hsk6/hsk6_工农兵.wav' },
      { hanzi: '下放', pinyin: 'xià fàng', meaning: 'envoyé à la campagne', meaningEn: 'sent down (to countryside)', audio: 'audio/hsk6/hsk6_下放.wav' },
      { hanzi: '伤痕', pinyin: 'shāng hén', meaning: 'cicatrice', meaningEn: 'scar', audio: 'audio/hsk6/hsk6_伤痕.wav' },
      { hanzi: '班主任', pinyin: 'bān zhǔ rèn', meaning: 'professeur principal', meaningEn: 'class teacher', audio: 'audio/hsk6/hsk6_班主任.wav' }
    ],
    tip:
      'Pour discuter cette période avec un Chinois, mentionne UN auteur précis (老舍 Lao She, suicide 1966) plutôt que la « tragédie de la 文革 » en général. La spécificité montre ton sérieux. Phrase utile : « 老舍的悲剧让人深思 » (la tragédie de Lao She fait réfléchir profondément).',
    tipEn:
      'To discuss this period with a Chinese, mention a SPECIFIC author (老舍 Lao She, 1966 suicide) rather than the «文革 tragedy» generally. Specificity shows seriousness. Useful phrase: «老舍的悲剧让人深思» (Lao She\'s tragedy makes one reflect deeply).'
  },
  {
    id: 'c22-yuhua-huozhe',
    title: '余华 et 《活着》— vivre malgré tout',
    titleEn: '余华 and 《活着》— living despite everything',
    body:
      '余华 (Yu Hua, né 1960) publie 《活着》(« Vivre ! ») en 1993 : roman court, simple, dévastateur. Histoire d\'un paysan, 福贵 (Fugui), qui PERD TOUT au fil du XXe siècle : sa fortune (ruiné au jeu), sa famille (mort de père, fils, fille, femme, gendre, petit-fils), ses biens. À la fin, il reste vivant avec UN bœuf. Personne plus à enterrer. Style : DÉPOUILLÉ, pas de jugement, juste les faits. Effet : DÉMONSTRATION SILENCIEUSE de la souffrance subie par le peuple chinois sans moralisation. Adaptation par 张艺谋 en 1994 (interdit en Chine, primé à Cannes). Œuvre la plus traduite de la littérature contemporaine chinoise. Pour une introduction à la littérature chinoise contemporaine, c\'est LE livre à recommander à un Européen — court, accessible, bouleversant.',
    bodyEn:
      '余华 (Yu Hua, born 1960) publishes 《活着》(«To Live») in 1993: short, simple, devastating novel. Story of a peasant, 福贵 (Fugui), who LOSES EVERYTHING through the 20th century: his fortune (gambled away), his family (death of father, son, daughter, wife, son-in-law, grandson), his belongings. At the end, he\'s alive with ONE ox. No one left to bury. Style: BARE, no judgment, just facts. Effect: SILENT DEMONSTRATION of the suffering endured by the Chinese people without moralization. Adaptation by 张艺谋 in 1994 (banned in China, awarded in Cannes). Most translated work of contemporary Chinese literature. For a Chinese contemporary literature intro, it\'s THE book to recommend to a European — short, accessible, devastating.',
    items: [
      { hanzi: '余华', pinyin: 'yú huá', meaning: 'Yu Hua', meaningEn: 'Yu Hua', audio: 'audio/hsk6/hsk6_余华.wav' },
      { hanzi: '活着', pinyin: 'huó zhe', meaning: 'Vivre !', meaningEn: 'To Live', audio: 'audio/hsk6/hsk6_活着.wav' },
      { hanzi: '福贵', pinyin: 'fú guì', meaning: 'Fugui (perso)', meaningEn: 'Fugui', audio: 'audio/hsk6/hsk6_福贵.wav' },
      { hanzi: '张艺谋', pinyin: 'zhāng yì móu', meaning: 'Zhang Yimou', meaningEn: 'Zhang Yimou', audio: 'audio/hsk6/hsk6_张艺谋.wav' },
      { hanzi: '禁播', pinyin: 'jìn bō', meaning: 'interdit de diffusion', meaningEn: 'banned from broadcast', audio: 'audio/hsk6/hsk6_禁播.wav' }
    ],
    tip:
      'Si tu cites 余华 《活着》 à un Chinois cultivé, regarde sa réaction : la plupart ont LU le livre OU vu le film. Beaucoup tiennent ce roman pour le SOMMET de la littérature chinoise post-1949. Phrase pour ouvrir : « 我读了《活着》，特别震撼 » (j\'ai lu Vivre, c\'est bouleversant) — invite la discussion.',
    tipEn:
      'If you cite 余华 《活着》 to a cultured Chinese, watch their reaction: most have READ the book OR seen the film. Many hold this novel as the SUMMIT of post-1949 Chinese literature. Opening phrase: «我读了《活着》，特别震撼» (I read To Live, very moving) — invites discussion.'
  }
];

export const c22ModernLitM2LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c22-moyan-nobel',
    title: '莫言 — le 1er Nobel chinois (RPC)',
    titleEn: '莫言 — first Chinese (PRC) Nobel',
    body:
      '莫言 (Mo Yan, pseudo signifiant « Ne parle pas », né 1955) reçoit le Nobel de Littérature en 2012. Premier écrivain de RPC à l\'obtenir (Gao Xingjian 2000 et Liu Xiaobo 2010 paix sont en exil/prison, donc reniés par Pékin). 莫言 est pleinement INTÉGRÉ au système : membre de l\'Association des écrivains, du PCC depuis 1979. Cette double inscription (officielle + littéraire de qualité) est RARE et controversée. Œuvre phare : 《红高粱家族》(« Le clan du sorgho ») adapté par 张艺谋 en 1988 (Ours d\'or à Berlin — film qui révèle Gong Li). Style : « réalisme hallucinatoire » selon le jury Nobel — fusion réel/folklore/grotesque, parenté avec García Márquez. Œuvres récentes : 《丰乳肥臀》(1995), 《生死疲劳》(2006). Réception internationale enthousiaste, plus discutée par certains intellectuels chinois en exil.',
    bodyEn:
      '莫言 (Mo Yan, pseudonym meaning «don\'t speak», born 1955) receives the Nobel in Literature in 2012. First PRC writer to win it (Gao Xingjian 2000 and Liu Xiaobo 2010 peace are in exile/prison, so disowned by Beijing). 莫言 is fully INTEGRATED into the system: member of the Writers Association, CCP since 1979. This dual standing (official + quality literary) is RARE and controversial. Flagship work: 《红高粱家族》(«Red Sorghum Clan») adapted by 张艺谋 in 1988 (Golden Bear in Berlin — film that revealed Gong Li). Style: «hallucinatory realism» per Nobel jury — real/folklore/grotesque fusion, kinship with García Márquez. Recent works: 《丰乳肥臀》(1995), 《生死疲劳》(2006). Enthusiastic international reception, more debated by some exiled Chinese intellectuals.',
    items: [
      { hanzi: '莫言', pinyin: 'mò yán', meaning: 'Mo Yan', meaningEn: 'Mo Yan', audio: 'audio/hsk6/hsk6_莫言.wav' },
      { hanzi: '诺贝尔奖', pinyin: 'nuò bèi ěr jiǎng', meaning: 'prix Nobel', meaningEn: 'Nobel Prize', audio: 'audio/hsk6/hsk6_诺贝尔.wav' },
      { hanzi: '红高粱', pinyin: 'hóng gāo liáng', meaning: 'Sorgho rouge', meaningEn: 'Red Sorghum', audio: 'audio/hsk6/hsk6_红高粱.wav' },
      { hanzi: '魔幻现实主义', pinyin: 'mó huàn xiàn shí zhǔ yì', meaning: 'réalisme magique', meaningEn: 'magical realism', audio: 'audio/hsk6/hsk6_魔幻.wav' },
      { hanzi: '体制', pinyin: 'tǐ zhì', meaning: 'système, institution', meaningEn: 'system', audio: 'audio/hsk6/hsk6_体制.wav' }
    ],
    tip:
      'Discussion délicate : 莫言 est applaudi internationalement mais critiqué par certains intellectuels chinois en exil pour sa proximité avec le pouvoir. En discussion, dis : « 莫言的获奖是中国文学的里程碑，同时也引发了关于文学与体制的讨论 » (le Nobel de 莫言 est une étape de la littérature chinoise, et a aussi soulevé la question littérature/système). Phrase équilibrée.',
    tipEn:
      'Delicate discussion: 莫言 is internationally applauded but criticized by some exiled Chinese intellectuals for his proximity to power. In discussion, say: «莫言的获奖是中国文学的里程碑，同时也引发了关于文学与体制的讨论» (Mo Yan\'s Nobel is a Chinese literature milestone, and also raised the literature/system question). Balanced phrase.'
  },
  {
    id: 'c22-romans-recents',
    title: 'Auteurs contemporains à connaître',
    titleEn: 'Contemporary authors to know',
    body:
      'Au-delà de Mo Yan et Yu Hua, le canon contemporain inclut : 阎连科 (Yan Lianke, né 1958, l\'absurde du système — 《受活》, 《为人民服务》censurée), 王安忆 (Wang Anyi, née 1954, Shanghai cosmopolite — 《长恨歌》), 韩少功 (Han Shaogong, né 1953, recherche des racines), 苏童 (Su Tong, né 1963, atmosphère décadente). FEMMES essentielles : 张悦然 (Zhang Yueran, génération 80), 残雪 (Can Xue, expérimentale, finaliste Nobel répétée). Diaspora : 哈金 (Ha Jin, écrit en anglais aux US), 高行健 (Gao Xingjian, Nobel 2000, exilé en France). Génération nouvelle : 双雪涛 (Shuang Xuetao), 班宇 (Ban Yu) — chronique du Nord-Est en déclin industriel. Connaître 5-10 noms te permet de TENIR une discussion littéraire chinoise avancée.',
    bodyEn:
      'Beyond Mo Yan and Yu Hua, the contemporary canon includes: 阎连科 (Yan Lianke, born 1958, the absurd of the system — 《受活》, 《为人民服务》censored), 王安忆 (Wang Anyi, born 1954, cosmopolitan Shanghai — 《长恨歌》), 韩少功 (Han Shaogong, born 1953, root-seeking), 苏童 (Su Tong, born 1963, decadent atmosphere). Essential WOMEN: 张悦然 (Zhang Yueran, 80s generation), 残雪 (Can Xue, experimental, repeat Nobel finalist). Diaspora: 哈金 (Ha Jin, writes in English in US), 高行健 (Gao Xingjian, Nobel 2000, exiled in France). New generation: 双雪涛 (Shuang Xuetao), 班宇 (Ban Yu) — chroniclers of declining industrial Northeast. Knowing 5-10 names lets you HOLD an advanced Chinese literary discussion.',
    items: [
      { hanzi: '阎连科', pinyin: 'yán lián kē', meaning: 'Yan Lianke', meaningEn: 'Yan Lianke', audio: 'audio/hsk6/hsk6_阎连科.wav' },
      { hanzi: '王安忆', pinyin: 'wáng ān yì', meaning: 'Wang Anyi', meaningEn: 'Wang Anyi', audio: 'audio/hsk6/hsk6_王安忆.wav' },
      { hanzi: '残雪', pinyin: 'cán xuě', meaning: 'Can Xue', meaningEn: 'Can Xue', audio: 'audio/hsk6/hsk6_残雪.wav' },
      { hanzi: '高行健', pinyin: 'gāo xíng jiàn', meaning: 'Gao Xingjian', meaningEn: 'Gao Xingjian', audio: 'audio/hsk6/hsk6_高行健.wav' },
      { hanzi: '当代', pinyin: 'dāng dài', meaning: 'contemporain', meaningEn: 'contemporary', audio: 'audio/hsk5/hsk5_当代.wav' }
    ],
    tip:
      'Stratégie : choisis 1 auteur contemporain dont tu lis 1 livre PAR AN. Au bout de 5 ans, tu connais 5 univers et tu peux PARLER DE 5 ROMANS comme un connaisseur. Investissement modeste, capital culturel énorme. Recommandation pour démarrer : 余华 《活着》 (le plus accessible).',
    tipEn:
      'Strategy: pick 1 contemporary author whose work you read 1 book PER YEAR. In 5 years, you know 5 universes and can DISCUSS 5 novels like a connoisseur. Modest investment, huge cultural capital. Starter recommendation: 余华 《活着》 (most accessible).'
  }
];

export const c22ModernLitM3LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c22-liu-cixin-trilogie',
    title: '刘慈欣 《三体》— SF chinoise mondiale',
    titleEn: '刘慈欣 《三体》— global Chinese sci-fi',
    body:
      '刘慈欣 (Liu Cixin, né 1963), ingénieur d\'une centrale, publie 《三体》 (Le Problème à trois corps) en 2008, suivi de 《黑暗森林》 (2008) et 《死神永生》 (2010), formant la trilogie 《地球往事》 (Le Souvenir de la Terre). Tome 1 obtient le Hugo Award 2015 — PREMIÈRE SF asiatique au sommet mondial. Concepts révolutionnaires : 三体 = système solaire avec 3 soleils → civilisation aux conditions instables → quête d\'une nouvelle planète (la Terre). 黑暗森林 (« Forêt noire ») = hypothèse anthropologique : tout cosmos contient nombreuses civilisations, qui RESTENT cachées car toute civilisation visible est anéantie par les autres. Stratégie de SURVIE = SILENCE. Cette idée a profondément marqué le débat SETI mondial. Adaptations : Tencent 2023 (série chinoise fidèle), Netflix 2024 (série globale). 刘慈欣 a sino-mondialisé la SF.',
    bodyEn:
      '刘慈欣 (Liu Cixin, born 1963), power plant engineer, publishes 《三体》(The Three-Body Problem) in 2008, followed by 《黑暗森林》(2008) and 《死神永生》(2010), forming the trilogy 《地球往事》(Remembrance of Earth\'s Past). Book 1 wins Hugo Award 2015 — FIRST Asian SF at world summit. Revolutionary concepts: 三体 = solar system with 3 suns → civilization with unstable conditions → quest for a new planet (Earth). 黑暗森林 («Dark Forest») = anthropological hypothesis: every cosmos contains numerous civilizations, which STAY hidden as every visible civilization is annihilated by others. Survival strategy = SILENCE. This idea deeply marked the global SETI debate. Adaptations: Tencent 2023 (faithful Chinese series), Netflix 2024 (global series). 刘慈欣 sino-globalized SF.',
    items: [
      { hanzi: '三体', pinyin: 'sān tǐ', meaning: 'Trois Corps (trilogie)', meaningEn: 'Three Body trilogy', audio: 'audio/hsk6/hsk6_三体.wav' },
      { hanzi: '黑暗森林', pinyin: 'hēi àn sēn lín', meaning: 'Forêt noire (hypothèse)', meaningEn: 'Dark Forest (hypothesis)', audio: 'audio/hsk6/hsk6_黑暗.wav' },
      { hanzi: '死神永生', pinyin: 'sǐ shén yǒng shēng', meaning: 'La Mort éternelle', meaningEn: 'Death\'s End', audio: 'audio/hsk6/hsk6_死神.wav' },
      { hanzi: '雨果奖', pinyin: 'yǔ guǒ jiǎng', meaning: 'Hugo Award', meaningEn: 'Hugo Award', audio: 'audio/hsk6/hsk6_雨果.wav' },
      { hanzi: '科幻', pinyin: 'kē huàn', meaning: 'science-fiction', meaningEn: 'science fiction', audio: 'audio/hsk6/hsk6_科幻.wav' }
    ],
    tip:
      'En 2026, 三体 est UN sujet de conversation MONDIAL. Si tu as lu/regardé, tu peux discuter avec un Chinois ET un Américain ET un Européen. Phrase d\'ouverture : « 我读了三体三部曲，黑暗森林理论让我深思 » (j\'ai lu la trilogie, la théorie de la forêt noire me fait réfléchir). Pont culturel idéal.',
    tipEn:
      'In 2026, 三体 is a GLOBAL conversation topic. If you\'ve read/watched, you can discuss with a Chinese AND American AND European. Opening phrase: «我读了三体三部曲，黑暗森林理论让我深思» (I read the trilogy, the dark forest theory makes me reflect). Ideal cultural bridge.'
  },
  {
    id: 'c22-sf-explosion',
    title: 'L\'explosion de la SF chinoise post-2015',
    titleEn: 'The post-2015 Chinese SF explosion',
    body:
      'Depuis le Hugo de 刘慈欣, la SF chinoise EXPLOSE en visibilité internationale. 郝景芳 (Hao Jingfang, née 1984) gagne Hugo 2016 pour 《北京折叠》 (« Pékin pliée ») — nouvelle dystopique sur les inégalités urbaines. 陈楸帆 (Chen Qiufan, né 1981) explore l\'IA et le travail dans 《荒潮》 (« Marée noxieuse »). 夏笳 (Xia Jia, née 1984) écrit une SF poétique-féministe. 王晋康 (Wang Jinkang) reste le pionnier, écrivant depuis les années 80. Ken Liu (刘宇昆, sino-américain) est LE traducteur principal — sans lui, l\'export ne se serait pas fait. Plateforme : 科幻世界 (Science Fiction World, magazine basé à Chengdu, lance les nouveaux talents). En Europe : éditions ACTES SUD et BÉLIAL\' publient régulièrement les auteurs traduits. La SF chinoise est devenue UN genre majeur de la littérature mondiale en 10 ans.',
    bodyEn:
      'Since 刘慈欣\'s Hugo, Chinese SF EXPLODES in international visibility. 郝景芳 (Hao Jingfang, born 1984) wins Hugo 2016 for 《北京折叠》(«Folding Beijing») — dystopian short on urban inequalities. 陈楸帆 (Chen Qiufan, born 1981) explores AI and labor in 《荒潮》(«Waste Tide»). 夏笳 (Xia Jia, born 1984) writes poetic-feminist SF. 王晋康 (Wang Jinkang) remains the pioneer, writing since the 80s. Ken Liu (刘宇昆, Sino-American) is THE main translator — without him, export wouldn\'t have happened. Platform: 科幻世界 (Science Fiction World, Chengdu-based magazine, launches new talents). In Europe: ACTES SUD and BÉLIAL\' regularly publish translated authors. Chinese SF has become a MAJOR genre of world literature in 10 years.',
    items: [
      { hanzi: '科幻世界', pinyin: 'kē huàn shì jiè', meaning: 'Science Fiction World (revue)', meaningEn: 'Science Fiction World', audio: 'audio/hsk6/hsk6_科幻.wav' },
      { hanzi: '郝景芳', pinyin: 'hǎo jǐng fāng', meaning: 'Hao Jingfang', meaningEn: 'Hao Jingfang', audio: 'audio/hsk6/hsk6_郝景芳.wav' },
      { hanzi: '北京折叠', pinyin: 'běi jīng zhé dié', meaning: 'Pékin pliée', meaningEn: 'Folding Beijing', audio: 'audio/hsk6/hsk6_折叠.wav' },
      { hanzi: '陈楸帆', pinyin: 'chén qiū fān', meaning: 'Chen Qiufan', meaningEn: 'Chen Qiufan', audio: 'audio/hsk6/hsk6_陈楸帆.wav' },
      { hanzi: '翻译家', pinyin: 'fān yì jiā', meaning: 'traducteur (titre)', meaningEn: 'translator', audio: 'audio/hsk6/hsk6_翻译家.wav' }
    ],
    tip:
      'Si tu veux entrer dans la SF chinoise, commence par 《北京折叠》 (50 pages) plutôt que la trilogie 三体 (1500 pages). Hao Jingfang est plus poétique, plus directement intelligible pour un européen. Investissement minimal, ouverture maximale.',
    tipEn:
      'If you want to enter Chinese SF, start with 《北京折叠》(50 pages) rather than the 三体 trilogy (1500 pages). Hao Jingfang is more poetic, more directly intelligible to a European. Minimal investment, maximum opening.'
  }
];

// --- dialects ---------------------------------------------------------------

export const c22DialectsM1LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c22-putonghua-creation',
    title: '普通话 — comment un dialecte devint norme',
    titleEn: '普通话 — how one dialect became the norm',
    body:
      '普通话 (pǔtōnghuà, litt. « langue commune ») est officialisé en 1956 comme langue nationale de la RPC. Sa base : (1) PRONONCIATION du mandarin de Pékin, (2) LEXIQUE des dialectes mandarins du Nord, (3) GRAMMAIRE des œuvres vernaculaires modernes (notamment celles de Lu Xun). Promotion ACTIVE depuis 1956 : enseignement obligatoire à l\'école, médias 100% en 普通话, examens 普通话水平测试 pour les fonctionnaires (PSC, niveau 1甲 = excellent). Effet : passage de 50% de la population parlant 普通话 en 1950 à 80% en 2020. EFFET COLLATÉRAL : déclin des langues régionales (cantonais à Canton, shanghaien à Shanghai, etc.). Débat actuel : préserver les dialectes vs uniformiser. Politique balancée par Pékin (cours de cantonais à Canton, mais 普通话 reste prioritaire).',
    bodyEn:
      '普通话 (pǔtōnghuà, lit. «common language») is officialized in 1956 as the PRC\'s national language. Its base: (1) PRONUNCIATION of Beijing Mandarin, (2) LEXICON of Northern Mandarin dialects, (3) GRAMMAR of modern vernacular works (especially Lu Xun\'s). ACTIVE promotion since 1956: mandatory school teaching, 100% 普通话 media, 普通话水平测试 (PSC) exams for civil servants (level 1甲 = excellent). Effect: from 50% of population speaking 普通话 in 1950 to 80% in 2020. COLLATERAL EFFECT: decline of regional languages (Cantonese in Canton, Shanghainese in Shanghai, etc.). Current debate: preserve dialects vs unify. Balanced policy by Beijing (Cantonese classes in Canton, but 普通话 remains priority).',
    items: [
      { hanzi: '普通话', pinyin: 'pǔ tōng huà', meaning: 'mandarin standard', meaningEn: 'Standard Mandarin', audio: 'audio/hsk5/hsk5_普通话.wav' },
      { hanzi: '推广', pinyin: 'tuī guǎng', meaning: 'promouvoir', meaningEn: 'promote', audio: 'audio/hsk5/hsk5_推广.wav' },
      { hanzi: '水平测试', pinyin: 'shuǐ píng cè shì', meaning: 'test de niveau', meaningEn: 'level test', audio: 'audio/hsk5/hsk5_水平.wav' },
      { hanzi: '方言', pinyin: 'fāng yán', meaning: 'dialecte', meaningEn: 'dialect', audio: 'audio/hsk6/hsk6_方言.wav' },
      { hanzi: '统一', pinyin: 'tǒng yī', meaning: 'unifier', meaningEn: 'unify', audio: 'audio/hsk5/hsk5_统一.wav' }
    ],
    tip:
      'Si tu travailles en Chine, mentionne ton 普通话水平 (niveau PSC) sur ton CV chinois si tu l\'as passé. Niveau 二乙 (B-) déjà respectable pour étranger. Niveau 一乙 (A-) = excellent. Distinction CV.',
    tipEn:
      'If you work in China, mention your 普通话水平 (PSC level) on your Chinese CV if you\'ve taken it. Level 二乙 (B-) already respectable for a foreigner. Level 一乙 (A-) = excellent. CV distinction.'
  },
  {
    id: 'c22-guoyu-huayu',
    title: '国语 (Taïwan) + 华语 (Singapour) — variantes',
    titleEn: '国语 (Taiwan) + 华语 (Singapore) — variants',
    body:
      '国语 (Guóyǔ, « langue nationale ») = mandarin de Taïwan. Même base que 普通话 mais 4 différences clés : (1) prononciation plus CONSERVATRICE (conserve plus de tons rétroflexes que Pékin moderne), (2) écriture en 繁体字 (caractères traditionnels), (3) système de transcription : 注音符号 (bopomofo, ㄅㄆㄇㄈ) plutôt que pinyin, (4) lexique parfois différent (出租车 mainland / 计程车 Taïwan, 自行车 / 脚踏车). 华语 (Huáyǔ, « langue chinoise/sinophone ») = mandarin de Singapour, Malaisie, et diaspora SE-asiatique. Mêmes caractères simplifiés que mainland mais accent local + emprunts au malais/anglais. Compréhension mutuelle 普通话 / 国语 / 华语 = 95%. Chaque variante reflète une histoire politique (Taïwan post-1949 sépare ; Singapour adopte 普通话 comme une des 4 langues officielles en 1965).',
    bodyEn:
      '国语 (Guóyǔ, «national language») = Taiwan Mandarin. Same base as 普通话 but 4 key differences: (1) more CONSERVATIVE pronunciation (preserves more retroflex tones than modern Beijing), (2) writing in 繁体字 (traditional characters), (3) transcription system: 注音符号 (bopomofo, ㄅㄆㄇㄈ) rather than pinyin, (4) sometimes different lexicon (出租车 mainland / 计程车 Taiwan, 自行车 / 脚踏车). 华语 (Huáyǔ, «Sinophone language») = Mandarin of Singapore, Malaysia, and SE Asian diaspora. Same simplified characters as mainland but local accent + Malay/English borrowings. Mutual comprehension 普通话 / 国语 / 华语 = 95%. Each variant reflects political history (Taiwan post-1949 separates; Singapore adopts 普通话 as one of 4 official languages in 1965).',
    items: [
      { hanzi: '国语', pinyin: 'guó yǔ', meaning: 'mandarin de Taïwan', meaningEn: 'Taiwan Mandarin', audio: 'audio/hsk6/hsk6_国语.wav' },
      { hanzi: '华语', pinyin: 'huá yǔ', meaning: 'mandarin de Singapour', meaningEn: 'Singapore Mandarin', audio: 'audio/hsk6/hsk6_华语.wav' },
      { hanzi: '注音符号', pinyin: 'zhù yīn fú hào', meaning: 'bopomofo (Taïwan)', meaningEn: 'bopomofo', audio: 'audio/hsk6/hsk6_注音.wav' },
      { hanzi: '繁体', pinyin: 'fán tǐ', meaning: 'traditionnel (caract.)', meaningEn: 'traditional (chars)', audio: 'audio/hsk6/hsk6_繁体.wav' },
      { hanzi: '简体', pinyin: 'jiǎn tǐ', meaning: 'simplifié (caract.)', meaningEn: 'simplified (chars)', audio: 'audio/hsk6/hsk6_简体.wav' }
    ],
    tip:
      'Quand tu écris à un Taïwanais, EFFORCE-TOI d\'écrire en 繁体字 (caractères traditionnels) si tu maîtrises. Geste de respect culturel apprécié, signale que tu reconnais la spécificité taïwanaise. À Hong Kong, même règle. Le mainland chinois ne s\'en formalise pas si tu écris en simplifié, mais réciproque pas vraie.',
    tipEn:
      'When writing to a Taiwanese, MAKE THE EFFORT to write in 繁体字 (traditional characters) if you master them. Appreciated cultural respect gesture, signals you recognize Taiwanese specificity. In Hong Kong, same rule. Mainland China doesn\'t mind simplified, but reciprocal isn\'t true.'
  }
];

export const c22DialectsM2LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c22-cantonais-langue',
    title: '粤语 — pas un dialecte mais une langue',
    titleEn: '粤语 — not a dialect but a language',
    body:
      'Confusion fréquente : le 粤语 (cantonais) est-il un DIALECTE du mandarin ? Linguistiquement NON : c\'est UNE LANGUE chinoise distincte, mutuellement INintelligible avec le mandarin à l\'oral. Ils partagent seulement l\'ÉCRITURE (caractères chinois). Différences phonologiques majeures : (1) 6-9 TONS contre 4 en mandarin (le cantonais est plus mélodieux), (2) consonnes finales -p, -t, -k préservées (mandarin moderne les a perdues, mais elles existaient en chinois classique — d\'où la PROXIMITÉ du cantonais avec le 文言 dans les rimes). Géographie : Canton (广州), Hong Kong (香港), Macao (澳门), diaspora cantonaise mondiale (Chinatowns historiques de Vancouver, San Francisco, Londres, etc.). Status politique : à HK, le cantonais reste langue de la rue malgré la pression du 普通话 post-1997.',
    bodyEn:
      'Frequent confusion: is 粤语 (Cantonese) a Mandarin DIALECT? Linguistically NO: it\'s a DISTINCT Chinese LANGUAGE, mutually UNintelligible with Mandarin orally. They share only WRITING (Chinese characters). Major phonological differences: (1) 6-9 TONES vs 4 in Mandarin (Cantonese is more melodious), (2) preserved final consonants -p, -t, -k (modern Mandarin lost them, but they existed in classical Chinese — hence Cantonese\'s PROXIMITY to 文言 in rhymes). Geography: Canton (广州), Hong Kong (香港), Macau (澳门), worldwide Cantonese diaspora (historic Chinatowns of Vancouver, San Francisco, London, etc.). Political status: in HK, Cantonese remains the street language despite 普通话 pressure post-1997.',
    items: [
      { hanzi: '粤语', pinyin: 'yuè yǔ', meaning: 'cantonais', meaningEn: 'Cantonese', audio: 'audio/hsk6/hsk6_粤语.wav' },
      { hanzi: '广州', pinyin: 'guǎng zhōu', meaning: 'Canton (ville)', meaningEn: 'Canton city', audio: 'audio/hsk5/hsk5_广州.wav' },
      { hanzi: '香港', pinyin: 'xiāng gǎng', meaning: 'Hong Kong', meaningEn: 'Hong Kong', audio: 'audio/hsk4/hsk4_香港.wav' },
      { hanzi: '澳门', pinyin: 'ào mén', meaning: 'Macao', meaningEn: 'Macau', audio: 'audio/hsk5/hsk5_澳门.wav' },
      { hanzi: '不通', pinyin: 'bù tōng', meaning: 'incompréhensible', meaningEn: 'incomprehensible', audio: 'audio/hsk6/hsk6_不通.wav' }
    ],
    tip:
      'Si tu visites HK ou Canton et que tu parles déjà mandarin, CONSACRE 1 semaine à apprendre 30 phrases cantonaises (salutations, restaurant, taxi, merci). Investissement minimal, accueil local DÉCUPLÉ. Apps : Memrise, Pleco a un module cantonais.',
    tipEn:
      'If you visit HK or Canton and already speak Mandarin, DEVOTE 1 week to learning 30 Cantonese phrases (greetings, restaurant, taxi, thanks). Minimal investment, LOCAL welcome 10x better. Apps: Memrise, Pleco has a Cantonese module.'
  },
  {
    id: 'c22-cantonais-pop-culture',
    title: 'Cantopop, cinéma HK, 武侠 — le rayonnement',
    titleEn: 'Cantopop, HK cinema, 武侠 — the radiance',
    body:
      'Le cantonais a rayonné mondialement via 3 vecteurs principaux : (1) CANTOPOP années 80-90 — 张国荣 (Leslie Cheung), 梅艳芳 (Anita Mui), 王菲 (Faye Wong, qui chante en cantonais ET mandarin), Beyond. (2) CINÉMA HONGKONGAIS — 王家卫 (Wong Kar-wai, 《花样年华》/In the Mood for Love, 2000), 吴宇森 (John Woo), 周星驰 (Stephen Chow, comédie absurde), 成龙 (Jackie Chan), 李小龙 (Bruce Lee). Beaucoup de films sont d\'abord en cantonais, doublés en mandarin pour le mainland. (3) Romans 武侠 (wuxia) de 金庸 (Jin Yong, 1924-2018) — saga des 14 romans, la plus vendue de l\'histoire chinoise après le Petit Livre Rouge. Adapté en innombrables séries TV. Le cantonais y joue souvent un rôle culturel parallèle au mandarin. Sans cette pop culture cantonaise, la culture chinoise n\'aurait pas eu le même impact mondial entre 1980 et 2010.',
    bodyEn:
      'Cantonese has radiated worldwide via 3 main vectors: (1) CANTOPOP 80s-90s — 张国荣 (Leslie Cheung), 梅艳芳 (Anita Mui), 王菲 (Faye Wong, who sings in both Cantonese AND Mandarin), Beyond. (2) HONG KONG CINEMA — 王家卫 (Wong Kar-wai, 《花样年华》/In the Mood for Love, 2000), 吴宇森 (John Woo), 周星驰 (Stephen Chow, absurd comedy), 成龙 (Jackie Chan), 李小龙 (Bruce Lee). Many films are first in Cantonese, dubbed in Mandarin for the mainland. (3) 武侠 (wuxia) novels of 金庸 (Jin Yong, 1924-2018) — saga of 14 novels, best-selling in Chinese history after the Little Red Book. Adapted into countless TV series. Cantonese often plays a parallel cultural role to Mandarin. Without this Cantonese pop culture, Chinese culture wouldn\'t have had the same global impact between 1980 and 2010.',
    items: [
      { hanzi: '王家卫', pinyin: 'wáng jiā wèi', meaning: 'Wong Kar-wai', meaningEn: 'Wong Kar-wai', audio: 'audio/hsk6/hsk6_王家卫.wav' },
      { hanzi: '花样年华', pinyin: 'huā yàng nián huá', meaning: 'In the Mood for Love', meaningEn: 'In the Mood for Love', audio: 'audio/hsk6/hsk6_花样.wav' },
      { hanzi: '李小龙', pinyin: 'lǐ xiǎo lóng', meaning: 'Bruce Lee', meaningEn: 'Bruce Lee', audio: 'audio/hsk6/hsk6_李小龙.wav' },
      { hanzi: '金庸', pinyin: 'jīn yōng', meaning: 'Jin Yong', meaningEn: 'Jin Yong', audio: 'audio/hsk6/hsk6_金庸.wav' },
      { hanzi: '武侠', pinyin: 'wǔ xiá', meaning: 'roman de chevalerie', meaningEn: 'wuxia novel', audio: 'audio/hsk6/hsk6_武侠.wav' }
    ],
    tip:
      'Si tu rencontres un Hongkongais nostalgique, mentionne 王家卫 ou 张国荣 — instantanément, tu es perçu comme un connaisseur de la GRANDE époque. Phrase : « 我特别喜欢王家卫的电影 » (j\'adore les films de Wong Kar-wai). Conversation lancée pour 30 min minimum.',
    tipEn:
      'If you meet a nostalgic Hongkonger, mention 王家卫 or 张国荣 — instantly, you\'re perceived as a connoisseur of the GREAT era. Phrase: «我特别喜欢王家卫的电影» (I love Wong Kar-wai\'s films). Conversation launched for 30 min minimum.'
  }
];

export const c22DialectsM3LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c22-langues-chinoises-7',
    title: 'Les 7-10 langues chinoises majeures',
    titleEn: 'The 7-10 major Chinese languages',
    body:
      'La Chine compte officiellement 7-10 LANGUES CHINOISES (sinitiques), toutes écrites avec les mêmes caractères mais mutuellement INintelligibles à l\'oral : (1) 官话/北方话 (Guānhuà, mandarin, > 70% locuteurs, base de 普通话). (2) 粤语 (Yuèyǔ, cantonais, 70M, Canton/HK/Macao). (3) 吴语 (Wúyǔ, Wu, 80M, delta du Yangtze, inclut shanghaïen 上海话). (4) 闽南语 (Mǐnnányǔ, Min Nan, 50M, Fujian + Taïwan, inclut taïwanais 台语). (5) 客家话 (Kèjiāhuà, Hakka, 50M, montagnes Sud + diaspora dispersée). (6) 湘 (Xiāng, Hunan). (7) 赣 (Gàn, Jiangxi). Au-delà : 闽东语 (Fuzhou), 闽北语. La 民国 (République de Chine, 1912-1949) a longtemps débattu pour adopter le cantonais comme langue nationale (rivalité avec mandarin) — décision finale en faveur du mandarin pour des raisons démographiques.',
    bodyEn:
      'China officially has 7-10 SINITIC LANGUAGES, all written with the same characters but mutually UNintelligible orally: (1) 官话/北方话 (Mandarin, >70% speakers, base of 普通话). (2) 粤语 (Cantonese, 70M, Canton/HK/Macau). (3) 吴语 (Wu, 80M, Yangtze delta, includes Shanghainese 上海话). (4) 闽南语 (Min Nan, 50M, Fujian + Taiwan, includes Taiwanese 台语). (5) 客家话 (Hakka, 50M, Southern mountains + scattered diaspora). (6) 湘 (Xiang, Hunan). (7) 赣 (Gan, Jiangxi). Beyond: 闽东语 (Fuzhou), 闽北语. The 民国 (Republic of China, 1912-1949) long debated adopting Cantonese as national language (rivalry with Mandarin) — final decision in favor of Mandarin for demographic reasons.',
    items: [
      { hanzi: '官话', pinyin: 'guān huà', meaning: 'mandarin', meaningEn: 'Mandarin', audio: 'audio/hsk6/hsk6_官话.wav' },
      { hanzi: '吴语', pinyin: 'wú yǔ', meaning: 'famille Wu', meaningEn: 'Wu family', audio: 'audio/hsk6/hsk6_吴语.wav' },
      { hanzi: '闽南语', pinyin: 'mǐn nán yǔ', meaning: 'Min du Sud', meaningEn: 'Min Nan', audio: 'audio/hsk6/hsk6_闽南.wav' },
      { hanzi: '客家话', pinyin: 'kè jiā huà', meaning: 'hakka', meaningEn: 'Hakka', audio: 'audio/hsk6/hsk6_客家.wav' },
      { hanzi: '湘', pinyin: 'xiāng', meaning: 'Xiang (Hunan)', meaningEn: 'Xiang (Hunan)', audio: 'audio/hsk6/hsk6_湘.wav' }
    ],
    tip:
      'Ce que les Chinois eux-mêmes appellent leurs « 方言 » (dialectes) sont pour la plupart, linguistiquement, des LANGUES distinctes. La traduction 方言 = « dialecte » est politiquement chargée. Pour un linguiste : « langues chinoises » est plus juste. Cette nuance fait partie du DÉBAT identitaire chinois.',
    tipEn:
      'What Chinese themselves call their «方言» (dialects) are mostly, linguistically, DISTINCT LANGUAGES. The translation 方言 = «dialect» is politically loaded. For a linguist: «Chinese languages» is more accurate. This nuance is part of the Chinese IDENTITY debate.'
  },
  {
    id: 'c22-shanghaihua-taiwanais',
    title: '上海话 + 台语 — deux identités fortes',
    titleEn: '上海话 + 台语 — two strong identities',
    body:
      '上海话 (shanghaïen, sous-groupe 吴语 Wu) : 80M de locuteurs dans le delta du Yangtze. Phonologie très différente du mandarin (voyelles nasales, consonnes voisées). Pronoms star : 侬 (nóng, tu) au lieu de 你, 阿拉 (ālā, nous) au lieu de 我们. Marqueur de l\'identité shanghaïenne (« nous, les Shanghaïens »). Vocabulaire mythique : 老克勒 (lǎokèlè, gentleman cosmopolite des années 30 — image nostalgique des Concessions). 台语 (taïwanais, sous-groupe 闽南 Min Nan) : 60% des Taïwanais le parlent, langue d\'identité ANCRÉE depuis la colonisation Hokkien du XVIIe siècle. Sous le KMT (1949-87), le taïwanais était RÉPRIMÉ à l\'école. Depuis la démocratisation (années 90), il est encouragé comme langue de la 本土 (běntǔ, identité indigène taïwanaise). Symbole politique fort. La RÉSURGENCE des langues régionales chinoises est un mouvement culturel de fond du XXIe siècle.',
    bodyEn:
      '上海话 (Shanghainese, Wu 吴语 subgroup): 80M speakers in the Yangtze delta. Phonology very different from Mandarin (nasal vowels, voiced consonants). Star pronouns: 侬 (nóng, you) instead of 你, 阿拉 (ālā, we) instead of 我们. Marker of Shanghainese identity («we Shanghainese»). Mythical vocabulary: 老克勒 (lǎokèlè, cosmopolitan gentleman of the 30s — nostalgic image of Concessions). 台语 (Taiwanese, Min Nan 闽南 subgroup): 60% of Taiwanese speak it, identity language ANCHORED since 17th-c Hokkien colonization. Under the KMT (1949-87), Taiwanese was REPRESSED at school. Since democratization (90s), encouraged as language of 本土 (běntǔ, indigenous Taiwanese identity). Strong political symbol. The RESURGENCE of regional Chinese languages is a fundamental 21st-century cultural movement.',
    items: [
      { hanzi: '上海话', pinyin: 'shàng hǎi huà', meaning: 'shanghaïen', meaningEn: 'Shanghainese', audio: 'audio/hsk6/hsk6_上海话.wav' },
      { hanzi: '侬', pinyin: 'nóng', meaning: 'tu (shanghaïen)', meaningEn: 'you (Shanghainese)', audio: 'audio/hsk6/hsk6_侬.wav' },
      { hanzi: '阿拉', pinyin: 'ā lā', meaning: 'nous (shanghaïen)', meaningEn: 'we (Shanghainese)', audio: 'audio/hsk6/hsk6_阿拉.wav' },
      { hanzi: '台语', pinyin: 'tái yǔ', meaning: 'taïwanais (langue)', meaningEn: 'Taiwanese language', audio: 'audio/hsk6/hsk6_台语.wav' },
      { hanzi: '本土', pinyin: 'běn tǔ', meaning: 'indigène, autochtone', meaningEn: 'native, indigenous', audio: 'audio/hsk6/hsk6_本土.wav' }
    ],
    tip:
      'Si tu rencontres un Shanghaïen et que tu peux dire « 阿拉上海好嗲 » (notre Shanghai est si chic — 嗲 diǎ = chic, exquis), tu décrochez immédiatement leur sourire. Mais ne le dis QU\'à un Shanghaïen d\'origine, sinon ça sonne forcé. Code culturel à manier.',
    tipEn:
      'If you meet a Shanghainese and can say «阿拉上海好嗲» (our Shanghai is so chic — 嗲 diǎ = chic, exquisite), you immediately get their smile. But say it ONLY to native Shanghainese, otherwise it sounds forced. Cultural code to handle.'
  }
];

// --- global-china -----------------------------------------------------------

export const c22GlobalChinaM1LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c22-doctrine-deng-xi',
    title: '韬光养晦 → 大国外交 — le tournant doctrinal',
    titleEn: '韬光养晦 → 大国外交 — doctrinal shift',
    body:
      '韬光养晦 (« cacher sa lumière, nourrir l\'obscurité » — chengyu) était la DOCTRINE STRATÉGIQUE de Deng Xiaoping : profil bas international, accumulation discrète de force économique, éviter la confrontation. De 1978 à ~2012, la Chine SUIT cette voie : adhésion OMC 2001, modernisation discrète, pas de provocation. À partir de Xi Jinping (2012), TOURNANT : 大国外交 (dàguó wàijiāo, « diplomatie de grande puissance »). La Chine ne se cache plus, elle ASSUME son rang. Slogans : 中华民族伟大复兴 (« grand renouveau de la nation chinoise »), 人类命运共同体 (« communauté de destin pour l\'humanité »). Outils : 一带一路 (BRI, 2013), AIIB (Banque asiatique d\'investissement, 2016), expansion militaire en Mer de Chine. Critiques occidentales : « assertive », « expansionniste ». Lecture chinoise : « retour normal d\'une civilisation millénaire à sa juste place ».',
    bodyEn:
      '韬光养晦 («hide one\'s light, nurture obscurity» — chengyu) was Deng Xiaoping\'s STRATEGIC DOCTRINE: low international profile, quiet accumulation of economic strength, avoid confrontation. From 1978 to ~2012, China FOLLOWS this path: WTO 2001 entry, quiet modernization, no provocation. Starting with Xi Jinping (2012), TURN: 大国外交 (Great Power diplomacy). China no longer hides, it ASSUMES its rank. Slogans: 中华民族伟大复兴 («great revival of the Chinese nation»), 人类命运共同体 («community of shared destiny for humankind»). Tools: 一带一路 (BRI, 2013), AIIB (Asian Infrastructure Investment Bank, 2016), military expansion in South China Sea. Western criticisms: «assertive», «expansionist». Chinese reading: «normal return of a millennial civilization to its rightful place».',
    items: [
      { hanzi: '韬光养晦', pinyin: 'tāo guāng yǎng huì', meaning: 'profil bas (Deng)', meaningEn: 'low profile (Deng)', audio: 'audio/hsk6/hsk6_韬光.wav' },
      { hanzi: '大国外交', pinyin: 'dà guó wài jiāo', meaning: 'diplomatie grande puissance', meaningEn: 'Great Power diplomacy', audio: 'audio/hsk6/hsk6_大国.wav' },
      { hanzi: '复兴', pinyin: 'fù xīng', meaning: 'renouveau', meaningEn: 'revival', audio: 'audio/hsk6/hsk6_复兴.wav' },
      { hanzi: '命运共同体', pinyin: 'mìng yùn gòng tóng tǐ', meaning: 'communauté de destin', meaningEn: 'community of destiny', audio: 'audio/hsk6/hsk6_命运.wav' },
      { hanzi: '崛起', pinyin: 'jué qǐ', meaning: 'ascension, montée', meaningEn: 'rise', audio: 'audio/hsk6/hsk6_崛起.wav' }
    ],
    tip:
      'Pour analyser la diplomatie chinoise contemporaine en français, citer le passage 韬光养晦 → 大国外交 SIGNALE immédiatement ta connaissance fine. Phrase utile : « Le tournant 大国外交 sous Xi rompt avec 35 ans de 韬光养晦 dengiste ». Plus profond que les analyses occidentales habituelles.',
    tipEn:
      'To analyze contemporary Chinese diplomacy in French, citing the 韬光养晦 → 大国外交 transition IMMEDIATELY signals your fine knowledge. Useful phrase: «The 大国外交 turn under Xi breaks with 35 years of Dengist 韬光养晦». Deeper than usual Western analyses.'
  },
  {
    id: 'c22-bri-zhanlang',
    title: '一带一路 + 战狼外交 — outils et critiques',
    titleEn: '一带一路 + 战狼外交 — tools and criticisms',
    body:
      '一带一路 (Belt and Road) lancée en 2013 à Astana par Xi Jinping. Concept : double corridor TERRESTRE (Asie centrale → Europe via Russie/Mongolie) + MARITIME (Asie SE → Afrique → Méditerranée). 150+ pays signataires. Investissements : ports, voies ferrées, autoroutes, datacenters. Critiques : « piège de la dette » (Sri Lanka cède Hambantota en 2017), conditions environnementales lâches, dépendance technologique. Lecture chinoise : développement gagnant-gagnant 共赢. 战狼外交 (« diplomatie Wolf Warrior », nommée d\'après les films 战狼 de 吴京) = nouvelle posture des diplomates chinois, plus AGRESSIVE depuis ~2017 : confrontation directe sur Twitter (Zhao Lijian, Hua Chunying), réplique tac au tac aux critiques occidentales. Rupture avec la diplomatie polie traditionnelle. Effet : visibilité internationale accrue, polarisation des opinions étrangères.',
    bodyEn:
      '一带一路 (Belt and Road) launched in 2013 in Astana by Xi Jinping. Concept: double LAND corridor (Central Asia → Europe via Russia/Mongolia) + MARITIME (SE Asia → Africa → Mediterranean). 150+ signatory countries. Investments: ports, railways, highways, datacenters. Criticisms: «debt trap» (Sri Lanka cedes Hambantota in 2017), loose environmental conditions, tech dependency. Chinese reading: win-win development 共赢. 战狼外交 («Wolf Warrior diplomacy», named after 吴京\'s 战狼 films) = new posture of Chinese diplomats, more AGGRESSIVE since ~2017: direct confrontation on Twitter (Zhao Lijian, Hua Chunying), tit-for-tat replies to Western criticisms. Break with traditional polite diplomacy. Effect: increased international visibility, polarization of foreign opinions.',
    items: [
      { hanzi: '一带一路', pinyin: 'yí dài yí lù', meaning: 'Belt and Road', meaningEn: 'Belt and Road', audio: 'audio/hsk6/hsk6_一带.wav' },
      { hanzi: '战狼外交', pinyin: 'zhàn láng wài jiāo', meaning: 'diplomatie Wolf Warrior', meaningEn: 'Wolf Warrior diplomacy', audio: 'audio/hsk6/hsk6_战狼.wav' },
      { hanzi: '债务陷阱', pinyin: 'zhài wù xiàn jǐng', meaning: 'piège de la dette', meaningEn: 'debt trap', audio: 'audio/hsk6/hsk6_债务.wav' },
      { hanzi: '共赢', pinyin: 'gòng yíng', meaning: 'gagnant-gagnant', meaningEn: 'win-win', audio: 'audio/hsk6/hsk6_共赢.wav' },
      { hanzi: '反击', pinyin: 'fǎn jī', meaning: 'contre-attaquer', meaningEn: 'counter-attack', audio: 'audio/hsk6/hsk6_反击.wav' }
    ],
    tip:
      'En analyse du 战狼外交 avec un Chinois, NUANCE : ce style polarise même les Chinois cultivés (certains préfèrent l\'ancienne diplomatie discrète). Phrase utile : « 战狼外交 让中国更被听到，但也引发了对外形象的争议 » (la diplomatie WW fait entendre la Chine, mais soulève des débats sur l\'image extérieure). Position équilibrée.',
    tipEn:
      'In 战狼外交 analysis with a Chinese, NUANCE: this style polarizes even cultured Chinese (some prefer the old discreet diplomacy). Useful phrase: «战狼外交 让中国更被听到，但也引发了对外形象的争议» (WW diplomacy makes China heard, but raises debates on external image). Balanced stance.'
  }
];

export const c22GlobalChinaM2LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c22-diaspora-trois-categories',
    title: '华侨/华人/华裔 — les 3 catégories',
    titleEn: '华侨/华人/华裔 — the 3 categories',
    body:
      'Distinction OFFICIELLE chinoise pour la diaspora : 华侨 (huáqiáo) = Chinois à l\'étranger gardant la NATIONALITÉ chinoise (ressortissants vivant temporairement ou durablement hors de Chine). 华人 (huárén) = personne d\'ascendance chinoise QUELLE QUE SOIT sa nationalité. Terme générique. 华裔 (huáyì) = descendant chinois ayant une AUTRE nationalité, typiquement né à l\'étranger (« Chinese American », « Sino-français »). Hierarchy administrative en RPC : 华侨 a accès à des bureaux dédiés (国侨办), école pour 海外华侨子女, banque BoC International. 华裔 est traité comme étranger (visa requis). Importance numérique : 60M+ de 华人/华裔 dans le monde. Hubs principaux : Asie SE (Singapour 75% chinois, Malaisie 23%, Indonésie 4%+ ~10M), USA (5M+), Australie, Europe (France ~700K).',
    bodyEn:
      'OFFICIAL Chinese distinction for the diaspora: 华侨 (huáqiáo) = Chinese abroad keeping CHINESE NATIONALITY (citizens living temporarily or long-term outside China). 华人 (huárén) = person of Chinese descent REGARDLESS of nationality. Generic term. 华裔 (huáyì) = Chinese descendant with ANOTHER nationality, typically born abroad («Chinese American», «Sino-French»). Administrative hierarchy in PRC: 华侨 has access to dedicated offices (国侨办), school for 海外华侨子女, BoC International bank. 华裔 is treated as foreigner (visa required). Numerical importance: 60M+ 华人/华裔 worldwide. Main hubs: SE Asia (Singapore 75% Chinese, Malaysia 23%, Indonesia 4%+ ~10M), USA (5M+), Australia, Europe (France ~700K).',
    items: [
      { hanzi: '华侨', pinyin: 'huá qiáo', meaning: 'Chinois à l\'étranger', meaningEn: 'Chinese citizen abroad', audio: 'audio/hsk6/hsk6_华侨.wav' },
      { hanzi: '华人', pinyin: 'huá rén', meaning: 'personne d\'origine chinoise', meaningEn: 'Chinese-descent person', audio: 'audio/hsk6/hsk6_华人.wav' },
      { hanzi: '华裔', pinyin: 'huá yì', meaning: 'descendant chinois (étranger)', meaningEn: 'Chinese descendant (foreign)', audio: 'audio/hsk6/hsk6_华裔.wav' },
      { hanzi: '国籍', pinyin: 'guó jí', meaning: 'nationalité', meaningEn: 'nationality', audio: 'audio/hsk5/hsk5_国籍.wav' },
      { hanzi: '海外', pinyin: 'hǎi wài', meaning: 'outre-mer', meaningEn: 'overseas', audio: 'audio/hsk5/hsk5_海外.wav' }
    ],
    tip:
      'Quand tu rencontres un Sino-Européen, demande poliment : « 您是华侨还是华裔 ? » (êtes-vous 华侨 ou 华裔 ?). Cette QUESTION PRÉCISE signale que tu connais la distinction (et tu évites de mal qualifier). Si la personne est née à l\'étranger : 华裔. Si la personne a la nationalité chinoise : 华侨. Subtilité respectée.',
    tipEn:
      'When you meet a Sino-European, ask politely: «您是华侨还是华裔?» (are you 华侨 or 华裔?). This PRECISE question signals you know the distinction (and avoids mislabeling). Born abroad: 华裔. Has Chinese nationality: 华侨. Respected subtlety.'
  },
  {
    id: 'c22-chinatown-historic',
    title: '唐人街 + 侨乡 — géographies de la diaspora',
    titleEn: '唐人街 + 侨乡 — diaspora geographies',
    body:
      '唐人街 (tángrén jiē, « rue des gens de Tang ») = nom chinois traditionnel des Chinatowns. Historiquement, les premiers émigrants chinois (XIXe siècle) se réclamaient des « gens de Tang » plutôt que des « gens de Han » (汉人) car la dynastie Tang (618-907) était l\'âge d\'or que la diaspora cantonaise au sud avait gardé en mémoire. Chinatowns mythiques : San Francisco (la plus ancienne d\'Amérique du Nord, 1848), New York Manhattan, Vancouver, Londres Soho, Paris 13e (la plus grande d\'Europe, ~50K Chinois), Bangkok Yaowarat. 侨乡 (qiáoxiāng, « village des outre-mer ») = régions chinoises d\'ORIGINE de la diaspora : 广东 (Guangdong, surtout 台山/开平/江门 — d\'où viennent 80% des Chinois d\'Amérique du Nord du XIXe siècle), 福建 (Fujian, d\'où viennent les Hokkien d\'Asie SE), 浙江温州 (Wenzhou, dont la diaspora moderne en Europe est significative).',
    bodyEn:
      '唐人街 (tángrén jiē, «street of Tang people») = traditional Chinese name for Chinatowns. Historically, the first Chinese emigrants (19th c.) claimed «people of Tang» rather than «people of Han» (汉人) as the Tang dynasty (618-907) was the golden age the southern Cantonese diaspora kept in memory. Iconic Chinatowns: San Francisco (oldest in North America, 1848), New York Manhattan, Vancouver, London Soho, Paris 13th (largest in Europe, ~50K Chinese), Bangkok Yaowarat. 侨乡 (qiáoxiāng, «overseas village») = Chinese regions of ORIGIN of the diaspora: 广东 (Guangdong, especially 台山/开平/江门 — origin of 80% of 19th-c North American Chinese), 福建 (Fujian, origin of SE Asian Hokkien), 浙江温州 (Wenzhou, whose modern European diaspora is significant).',
    items: [
      { hanzi: '唐人街', pinyin: 'táng rén jiē', meaning: 'Chinatown', meaningEn: 'Chinatown', audio: 'audio/hsk6/hsk6_唐人.wav' },
      { hanzi: '侨乡', pinyin: 'qiáo xiāng', meaning: 'région d\'origine diaspora', meaningEn: 'diaspora origin region', audio: 'audio/hsk6/hsk6_侨乡.wav' },
      { hanzi: '广东', pinyin: 'guǎng dōng', meaning: 'Guangdong', meaningEn: 'Guangdong', audio: 'audio/hsk5/hsk5_广东.wav' },
      { hanzi: '福建', pinyin: 'fú jiàn', meaning: 'Fujian', meaningEn: 'Fujian', audio: 'audio/hsk6/hsk6_福建.wav' },
      { hanzi: '温州', pinyin: 'wēn zhōu', meaning: 'Wenzhou', meaningEn: 'Wenzhou', audio: 'audio/hsk6/hsk6_温州.wav' }
    ],
    tip:
      'Si tu connais un Sino-Français du 13e arrondissement à Paris, demande : « 您家乡是哪里 ? » (votre 侨乡 est où ?). Réponse fréquente : 温州, 青田 (autre 侨乡 du Zhejiang). Suivi : « 您还会说温州话吗 ? » (parlez-vous encore le wenzhouhua ?). Cette PROFONDEUR de question crée un lien immédiat.',
    tipEn:
      'If you know a Sino-French from Paris 13th, ask: «您家乡是哪里?» (where is your 侨乡?). Frequent answer: 温州, 青田 (another Zhejiang 侨乡). Follow-up: «您还会说温州话吗?» (do you still speak Wenzhou dialect?). This DEPTH of questioning creates immediate connection.'
  }
];

export const c22GlobalChinaM3LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c22-soft-power-leviers',
    title: '软实力 — les leviers chinois',
    titleEn: '软实力 — Chinese levers',
    body:
      'Le concept de 软实力 (ruǎn shílì, soft power) emprunté à Joseph Nye (1990) est devenu OBJECTIF officiel chinois sous Hu Jintao (~2007). Leviers : (1) 孔子学院 (Confucius Institutes, 500+ centres mondiaux pour enseigner langue/culture, modèle Goethe/Alliance française — controversés en Occident depuis ~2018 pour proximité avec MOFA chinois). (2) MÉDIAS internationaux : CGTN (CCTV International, 6 langues), Xinhua agency, China Daily. (3) CINÉMA : 哪吒 (Nezha, 2019, animation blockbuster mondial), 流浪地球 (Wandering Earth, 2019, SF démontrant la capacité industrielle). (4) JEUX VIDÉO : 原神 (Genshin Impact, MiHoYo) = 1er succès mondial d\'un jeu chinois, revenus Hollywood-comparables. (5) PLATEFORMES : TikTok/抖音 (ByteDance) change la consommation de médias mondiale. Limites : censure interne (rend les contenus moins percutants), méfiance occidentale post-2020 (TikTok ban débattu).',
    bodyEn:
      'The 软实力 (soft power) concept borrowed from Joseph Nye (1990) became OFFICIAL Chinese objective under Hu Jintao (~2007). Levers: (1) 孔子学院 (Confucius Institutes, 500+ centers worldwide teaching language/culture, Goethe/Alliance Française model — controversial in West since ~2018 for proximity to Chinese MOFA). (2) International MEDIA: CGTN (CCTV International, 6 languages), Xinhua agency, China Daily. (3) CINEMA: 哪吒 (Nezha, 2019, global animation blockbuster), 流浪地球 (Wandering Earth, 2019, SF demonstrating industrial capacity). (4) VIDEO GAMES: 原神 (Genshin Impact, MiHoYo) = first global success of a Chinese game, Hollywood-comparable revenue. (5) PLATFORMS: TikTok/抖音 (ByteDance) changes global media consumption. Limits: internal censorship (makes content less impactful), post-2020 Western mistrust (TikTok ban debated).',
    items: [
      { hanzi: '软实力', pinyin: 'ruǎn shí lì', meaning: 'soft power', meaningEn: 'soft power', audio: 'audio/hsk6/hsk6_软实力.wav' },
      { hanzi: '孔子学院', pinyin: 'kǒng zǐ xué yuàn', meaning: 'Institut Confucius', meaningEn: 'Confucius Institute', audio: 'audio/hsk6/hsk6_孔子.wav' },
      { hanzi: '哪吒', pinyin: 'né zhā', meaning: 'Nezha (anime)', meaningEn: 'Nezha (anime)', audio: 'audio/hsk6/hsk6_哪吒.wav' },
      { hanzi: '流浪地球', pinyin: 'liú làng dì qiú', meaning: 'Wandering Earth', meaningEn: 'Wandering Earth', audio: 'audio/hsk6/hsk6_流浪.wav' },
      { hanzi: '原神', pinyin: 'yuán shén', meaning: 'Genshin Impact', meaningEn: 'Genshin Impact', audio: 'audio/hsk6/hsk6_原神.wav' }
    ],
    tip:
      'Pour analyser le 软实力 chinois en discussion, NUANCE : « 中国软实力的硬件已经强大，但软件还在追赶 » (le hardware du soft power chinois est puissant, le software rattrape encore). Métaphore IT que les Chinois adorent. Phrase équilibrée qui montre ta finesse d\'analyse.',
    tipEn:
      'To analyze Chinese 软实力 in discussion, NUANCE: «中国软实力的硬件已经强大，但软件还在追赶» (Chinese soft power hardware is strong, software still catching up). IT metaphor Chinese love. Balanced phrase showing your analytical finesse.'
  },
  {
    id: 'c22-li-ziqi-organic',
    title: '李子柒 — soft power organique',
    titleEn: '李子柒 — organic soft power',
    body:
      '李子柒 (Lǐ Zǐqī, née 1990) est UN cas d\'école de soft power CHINOIS NON-OFFICIEL. Jeune femme du Sichuan, elle filme depuis 2015 des vidéos esthétisées de la VIE RURALE traditionnelle : couture de tissus naturels, fabrication d\'encre depuis racines, repas selon les saisons, fabrication de meubles en bambou. Esthétique fluide, sans paroles, musique douce. YouTube (avec accord spécial — son compte est l\'un des rares chinois autorisés) : 18M+ d\'abonnés en 2024, vues 2.7 MILLIARDS. Effet : a fait découvrir au monde entier UNE Chine RURALE-AUTHENTIQUE, ANCIENNE, BELLE — opposée à l\'image de la Chine industrielle/urbaine. Plus efficace que tous les Confucius Institutes réunis pour l\'image culturelle chinoise. Démontre que le soft power le plus puissant est ORGANIQUE, pas étatique. 李子柒 a inspiré des dizaines d\'imitateurs, sans atteindre son aura.',
    bodyEn:
      '李子柒 (Li Ziqi, born 1990) is a CASE STUDY of UNOFFICIAL Chinese soft power. Young Sichuanese woman, she\'s filmed since 2015 aestheticized videos of traditional RURAL LIFE: sewing natural fabrics, making ink from roots, seasonal meals, bamboo furniture making. Fluid aesthetic, no words, soft music. YouTube (with special agreement — her account is one of few Chinese authorized): 18M+ subscribers in 2024, 2.7 BILLION views. Effect: made the whole world discover an AUTHENTIC-RURAL, ANCIENT, BEAUTIFUL China — opposed to industrial/urban China image. More effective than all Confucius Institutes combined for Chinese cultural image. Demonstrates that the most powerful soft power is ORGANIC, not state-driven. 李子柒 inspired dozens of imitators, none reaching her aura.',
    items: [
      { hanzi: '李子柒', pinyin: 'lǐ zǐ qī', meaning: 'Li Ziqi', meaningEn: 'Li Ziqi', audio: 'audio/hsk6/hsk6_李子柒.wav' },
      { hanzi: '田园', pinyin: 'tián yuán', meaning: 'rural, idyllique', meaningEn: 'rural, idyllic', audio: 'audio/hsk6/hsk6_田园.wav' },
      { hanzi: '美学', pinyin: 'měi xué', meaning: 'esthétique', meaningEn: 'aesthetics', audio: 'audio/hsk6/hsk6_美学.wav' },
      { hanzi: '订阅', pinyin: 'dìng yuè', meaning: 'abonnement', meaningEn: 'subscription', audio: 'audio/hsk6/hsk6_订阅.wav' },
      { hanzi: '影响力', pinyin: 'yǐng xiǎng lì', meaning: 'influence', meaningEn: 'influence', audio: 'audio/hsk6/hsk6_影响力.wav' }
    ],
    tip:
      'En discussion sur le soft power chinois, mentionne 李子柒 — beaucoup d\'occidentaux la connaissent (via YouTube), beaucoup de Chinois aussi. Pont culturel idéal. Phrase utile : « 李子柒 证明了民间美学比官方推广更有力 » (Li Ziqi a prouvé que l\'esthétique populaire est plus puissante que la promotion officielle). Insight de marketeur.',
    tipEn:
      'In Chinese soft power discussion, mention 李子柒 — many Westerners know her (via YouTube), many Chinese too. Ideal cultural bridge. Useful phrase: «李子柒 证明了民间美学比官方推广更有力» (Li Ziqi proved popular aesthetic is more powerful than official promotion). Marketer\'s insight.'
  }
];
