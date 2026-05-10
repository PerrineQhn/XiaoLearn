/**
 * cecr-tales-daily-readings.ts — 13 textes supplémentaires
 * ---------------------------------------------------------
 * Task #47 — Deux grands axes :
 *   1. Vie quotidienne : restaurant, métro, médecin, anniversaire,
 *      Mi-Automne, Nouvel An chinois (6 textes A1 → B1.1).
 *   2. Contes classiques chinois : 嫦娥奔月, 孙悟空大闹天宫, 牛郎织女,
 *      白蛇传, 梁山伯与祝英台, 婴宁 (聊斋), 木兰辞 (7 textes B1.2 → C2.1).
 *
 * Les contes sont adaptés au niveau (simplifiés pour B1.2/B2.1,
 * littéraires à partir de B2.2) tout en respectant la trame narrative
 * d'origine (西游记, 聊斋志异, etc.). Chaque texte fournit vocab + questions.
 * L'audio est généré par `scripts/generate-reading-audio.mjs` (Azure TTS)
 * — une voix unique par texte, choisie déterministement par hash de l'ID.
 */
import type { ReadingEntry } from './readings';

export const cecrTalesDailyReadings: ReadingEntry[] = [
  // ============================================================
  //  A1 — Au restaurant
  // ============================================================
  {
    cecrLevel: 'a1',
    theme: 'Au restaurant',
    themeEn: 'At the restaurant',
    reading: {
      id: 'rd-a1-restaurant',
      title: 'Un dîner au restaurant',
      titleEn: 'Dinner at the restaurant',
      intro: 'Deux amis entrent dans un petit restaurant et commandent leur premier repas en chinois.',
      introEn: 'Two friends walk into a small restaurant and order their first meal in Chinese.',
      segments: [
        { hanzi: '今天晚上，我和朋友去饭馆吃饭。', pinyin: 'Jīntiān wǎnshang, wǒ hé péngyou qù fànguǎn chī fàn.', translationFr: 'Ce soir, mon ami et moi allons manger au restaurant.', translationEn: 'Tonight my friend and I are going to a restaurant to eat.' },
        { hanzi: '服务员说：\u201c欢迎光临，请坐。\u201d', pinyin: 'Fúwùyuán shuō: "Huānyíng guānglín, qǐng zuò."', translationFr: 'Le serveur dit : « Bienvenue, veuillez vous asseoir. »', translationEn: 'The waiter says: "Welcome, please sit down."' },
        { hanzi: '我们看菜单，菜单上有很多菜。', pinyin: 'Wǒmen kàn càidān, càidān shàng yǒu hěn duō cài.', translationFr: 'Nous regardons le menu : il y a beaucoup de plats.', translationEn: 'We look at the menu; there are many dishes on it.' },
        { hanzi: '我要一碗牛肉面和一杯可乐。', pinyin: 'Wǒ yào yì wǎn niúròu miàn hé yì bēi kělè.', translationFr: 'Je prends un bol de nouilles au bœuf et un verre de Coca.', translationEn: 'I\'ll have a bowl of beef noodles and a glass of Coke.' },
        { hanzi: '我的朋友点了一盘饺子和一碗汤。', pinyin: 'Wǒ de péngyou diǎn le yì pán jiǎozi hé yì wǎn tāng.', translationFr: 'Mon ami commande une assiette de raviolis et un bol de soupe.', translationEn: 'My friend orders a plate of dumplings and a bowl of soup.' },
        { hanzi: '菜很好吃，我们吃得很开心。', pinyin: 'Cài hěn hǎochī, wǒmen chī de hěn kāixīn.', translationFr: 'Les plats sont délicieux, nous mangeons avec plaisir.', translationEn: 'The food is delicious; we enjoy the meal.' },
        { hanzi: '一共一百块，不贵。', pinyin: 'Yígòng yìbǎi kuài, bú guì.', translationFr: 'Au total cent yuans, ce n\'est pas cher.', translationEn: 'A hundred yuan total — not expensive.' }
      ],
      vocab: ['饭馆', '服务员', '菜单', '牛肉面', '可乐', '饺子', '汤', '好吃', '一共'],
      questions: [
        {
          questionFr: 'Qu\'est-ce que le narrateur commande ?',
          questionEn: 'What does the narrator order?',
          answerFr: 'Des nouilles au bœuf et un Coca (牛肉面 + 可乐).',
          answerEn: 'Beef noodles and a Coke (牛肉面 + 可乐).'
        }
      ]
    }
  },

  // ============================================================
  //  A1 — Prendre le métro
  // ============================================================
  {
    cecrLevel: 'a1',
    theme: 'Transports',
    themeEn: 'Transport',
    reading: {
      id: 'rd-a1-subway',
      title: 'Prendre le métro',
      titleEn: 'Taking the subway',
      intro: 'Li Ming explique comment il va à l\'université chaque matin en métro.',
      introEn: 'Li Ming explains how he takes the subway to university every morning.',
      segments: [
        { hanzi: '我住在市中心，每天坐地铁去大学。', pinyin: 'Wǒ zhù zài shì zhōngxīn, měi tiān zuò dìtiě qù dàxué.', translationFr: 'J\'habite au centre-ville, je vais chaque jour à l\'université en métro.', translationEn: 'I live downtown and take the subway to university every day.' },
        { hanzi: '地铁站离我家很近，走路只要五分钟。', pinyin: 'Dìtiě zhàn lí wǒ jiā hěn jìn, zǒulù zhǐyào wǔ fēnzhōng.', translationFr: 'La station est tout près de chez moi, cinq minutes à pied.', translationEn: 'The subway station is very close to home — five minutes on foot.' },
        { hanzi: '早上的地铁人非常多。', pinyin: 'Zǎoshang de dìtiě rén fēicháng duō.', translationFr: 'Le matin, il y a énormément de monde dans le métro.', translationEn: 'In the morning the subway is packed.' },
        { hanzi: '我坐三号线，然后换二号线。', pinyin: 'Wǒ zuò sān hào xiàn, ránhòu huàn èr hào xiàn.', translationFr: 'Je prends la ligne 3, puis je change pour la ligne 2.', translationEn: 'I take line 3, then change to line 2.' },
        { hanzi: '一共六站，大约二十分钟。', pinyin: 'Yígòng liù zhàn, dàyuē èrshí fēnzhōng.', translationFr: 'Six stations en tout, environ vingt minutes.', translationEn: 'Six stops in all, about twenty minutes.' },
        { hanzi: '到了学校以后，我去图书馆学习。', pinyin: 'Dào le xuéxiào yǐhòu, wǒ qù túshūguǎn xuéxí.', translationFr: 'Une fois arrivé à l\'école, je vais étudier à la bibliothèque.', translationEn: 'Once at school, I go to the library to study.' }
      ],
      vocab: ['市中心', '地铁', '地铁站', '走路', '换', '号线', '站', '图书馆'],
      questions: [
        {
          questionFr: 'Combien de temps dure le trajet ?',
          questionEn: 'How long is the commute?',
          answerFr: 'Environ vingt minutes (大约二十分钟).',
          answerEn: 'About twenty minutes (大约二十分钟).'
        }
      ]
    }
  },

  // ============================================================
  //  A2 — Chez le médecin
  // ============================================================
  {
    cecrLevel: 'a2',
    theme: 'Santé',
    themeEn: 'Health',
    reading: {
      id: 'rd-a2-doctor-visit',
      title: 'Une visite chez le médecin',
      titleEn: 'A visit to the doctor',
      intro: 'Xiao Wang ne se sent pas bien et va à l\'hôpital du quartier — un texte simple pour le vocabulaire médical de base.',
      introEn: 'Xiao Wang isn\'t feeling well and heads to the neighborhood clinic — a simple text for basic medical vocabulary.',
      segments: [
        { hanzi: '昨天我有点不舒服，今天早上还发烧。', pinyin: 'Zuótiān wǒ yǒu diǎn bù shūfu, jīntiān zǎoshang hái fāshāo.', translationFr: 'Hier je ne me sentais pas bien, et ce matin j\'ai encore de la fièvre.', translationEn: 'I felt a bit off yesterday, and this morning I still had a fever.' },
        { hanzi: '所以，我决定去医院看医生。', pinyin: 'Suǒyǐ, wǒ juédìng qù yīyuàn kàn yīshēng.', translationFr: 'Du coup, j\'ai décidé d\'aller chez le médecin.', translationEn: 'So I decided to go to the hospital to see a doctor.' },
        { hanzi: '挂号以后，我在候诊室等了十分钟。', pinyin: 'Guàhào yǐhòu, wǒ zài hòuzhěnshì děng le shí fēnzhōng.', translationFr: 'Après avoir pris mon ticket, j\'ai attendu dix minutes en salle d\'attente.', translationEn: 'After registering, I waited ten minutes in the waiting room.' },
        { hanzi: '医生问我：\u201c你哪里不舒服？\u201d', pinyin: 'Yīshēng wèn wǒ: "Nǐ nǎli bù shūfu?"', translationFr: 'Le médecin m\'a demandé : « Où avez-vous mal ? »', translationEn: 'The doctor asked: "Where do you feel unwell?"' },
        { hanzi: '我回答：\u201c我头疼，喉咙也疼，而且咳嗽。\u201d', pinyin: 'Wǒ huídá: "Wǒ tóu téng, hóulóng yě téng, érqiě késou."', translationFr: 'J\'ai répondu : « J\'ai mal à la tête, à la gorge et je tousse. »', translationEn: 'I answered: "I have a headache, a sore throat, and I cough."' },
        { hanzi: '医生说：\u201c应该是感冒了，多喝水，多休息。\u201d', pinyin: 'Yīshēng shuō: "Yīnggāi shì gǎnmào le, duō hē shuǐ, duō xiūxi."', translationFr: 'Le médecin a dit : « C\'est sans doute un rhume ; buvez beaucoup et reposez-vous. »', translationEn: 'The doctor said: "It\'s probably a cold — drink plenty of water and rest."' },
        { hanzi: '他给我开了一些药，三天就能好。', pinyin: 'Tā gěi wǒ kāi le yìxiē yào, sān tiān jiù néng hǎo.', translationFr: 'Il m\'a prescrit quelques médicaments ; en trois jours je devrais aller mieux.', translationEn: 'He prescribed some medicine; I should be fine in three days.' }
      ],
      vocab: ['发烧', '医院', '看医生', '挂号', '候诊室', '头疼', '喉咙', '咳嗽', '感冒', '开药'],
      questions: [
        {
          questionFr: 'Quels sont les trois symptômes du narrateur ?',
          questionEn: 'What are the narrator\'s three symptoms?',
          answerFr: 'Mal de tête, mal de gorge, toux (头疼, 喉咙疼, 咳嗽).',
          answerEn: 'Headache, sore throat, cough (头疼, 喉咙疼, 咳嗽).'
        },
        {
          questionFr: 'Quel est le diagnostic ?',
          questionEn: 'What is the diagnosis?',
          answerFr: 'Un rhume (感冒).',
          answerEn: 'A common cold (感冒).'
        }
      ]
    }
  },

  // ============================================================
  //  A2 — Anniversaire d'un ami
  // ============================================================
  {
    cecrLevel: 'a2',
    theme: 'Célébrations',
    themeEn: 'Celebrations',
    reading: {
      id: 'rd-a2-birthday',
      title: 'L\'anniversaire de mon amie',
      titleEn: 'My friend\'s birthday',
      intro: 'Une soirée d\'anniversaire entre amis : cadeau, gâteau, karaoké — une page très commune de la vie chinoise urbaine.',
      introEn: 'A birthday evening among friends: gifts, cake, karaoke — a typical scene of urban Chinese life.',
      segments: [
        { hanzi: '上个星期六是我的好朋友小美的生日。', pinyin: 'Shàng ge xīngqīliù shì wǒ de hǎo péngyou Xiǎo Měi de shēngrì.', translationFr: 'Samedi dernier, c\'était l\'anniversaire de ma meilleure amie Xiao Mei.', translationEn: 'Last Saturday was my best friend Xiao Mei\'s birthday.' },
        { hanzi: '我们一起去了一家日本餐厅吃寿司。', pinyin: 'Wǒmen yìqǐ qù le yì jiā Rìběn cāntīng chī shòusī.', translationFr: 'Nous sommes allés ensemble manger des sushis dans un restaurant japonais.', translationEn: 'We went together to a Japanese restaurant for sushi.' },
        { hanzi: '我送了她一条漂亮的围巾，她非常喜欢。', pinyin: 'Wǒ sòng le tā yì tiáo piàoliang de wéijīn, tā fēicháng xǐhuan.', translationFr: 'Je lui ai offert une belle écharpe, elle a adoré.', translationEn: 'I gave her a lovely scarf, and she liked it very much.' },
        { hanzi: '吃完饭，我们去唱卡拉OK，一直唱到十一点。', pinyin: 'Chī wán fàn, wǒmen qù chàng kǎlā OK, yìzhí chàng dào shíyī diǎn.', translationFr: 'Après le dîner, nous sommes allés chanter au karaoké jusqu\'à onze heures.', translationEn: 'After dinner, we went to karaoke and sang until eleven.' },
        { hanzi: '小美许了愿，然后吹了蛋糕上的蜡烛。', pinyin: 'Xiǎo Měi xǔ le yuàn, ránhòu chuī le dàngāo shàng de làzhú.', translationFr: 'Xiao Mei a fait un vœu, puis a soufflé les bougies du gâteau.', translationEn: 'Xiao Mei made a wish, then blew out the candles on the cake.' },
        { hanzi: '大家一起唱生日快乐歌，气氛特别好。', pinyin: 'Dàjiā yìqǐ chàng shēngrì kuàilè gē, qìfēn tèbié hǎo.', translationFr: 'Nous avons chanté ensemble « Joyeux anniversaire », l\'ambiance était super.', translationEn: 'We all sang "Happy Birthday" together; the vibe was wonderful.' },
        { hanzi: '回家的时候，小美说这是她最开心的一个生日。', pinyin: 'Huí jiā de shíhou, Xiǎo Měi shuō zhè shì tā zuì kāixīn de yí ge shēngrì.', translationFr: 'En rentrant, Xiao Mei a dit que c\'était l\'anniversaire le plus joyeux de sa vie.', translationEn: 'On the way home, Xiao Mei said it was her happiest birthday ever.' }
      ],
      vocab: ['生日', '餐厅', '寿司', '围巾', '卡拉OK', '许愿', '蛋糕', '蜡烛', '气氛'],
      questions: [
        {
          questionFr: 'Quel cadeau le narrateur offre-t-il ?',
          questionEn: 'What gift does the narrator give?',
          answerFr: 'Une jolie écharpe (一条漂亮的围巾).',
          answerEn: 'A lovely scarf (一条漂亮的围巾).'
        }
      ]
    }
  },

  // ============================================================
  //  B1.1 — Fête de la Mi-Automne
  // ============================================================
  {
    cecrLevel: 'b1.1',
    theme: 'Fêtes traditionnelles',
    themeEn: 'Traditional festivals',
    reading: {
      id: 'rd-b11-mid-autumn',
      title: 'La fête de la Mi-Automne',
      titleEn: 'The Mid-Autumn Festival',
      intro: 'Courte description d\'une soirée familiale lors de la Mi-Automne : gâteaux de lune, lanternes, et nostalgie du pays natal.',
      introEn: 'A short piece about a family evening during Mid-Autumn: mooncakes, lanterns, and homesickness.',
      segments: [
        { hanzi: '中秋节是中国最重要的传统节日之一，在农历八月十五。', pinyin: 'Zhōngqiū jié shì Zhōngguó zuì zhòngyào de chuántǒng jiérì zhī yī, zài nónglì bā yuè shíwǔ.', translationFr: 'La Mi-Automne est l\'une des fêtes traditionnelles les plus importantes de Chine, le 15ᵉ jour du 8ᵉ mois lunaire.', translationEn: 'Mid-Autumn is one of China\'s most important traditional festivals, on the 15th day of the 8th lunar month.' },
        { hanzi: '这一天的月亮又大又圆，象征着家人团圆。', pinyin: 'Zhè yì tiān de yuèliang yòu dà yòu yuán, xiàngzhēng zhe jiārén tuányuán.', translationFr: 'Ce jour-là, la lune est grande et ronde : elle symbolise les retrouvailles familiales.', translationEn: 'That day the moon is large and round, symbolising family reunion.' },
        { hanzi: '晚饭后，我们一家人坐在阳台上，一边赏月一边吃月饼。', pinyin: 'Wǎnfàn hòu, wǒmen yì jiā rén zuò zài yángtái shàng, yìbiān shǎngyuè yìbiān chī yuèbǐng.', translationFr: 'Après le dîner, toute la famille s\'installe sur le balcon pour contempler la lune en mangeant des gâteaux de lune.', translationEn: 'After dinner, the whole family sat on the balcony admiring the moon and eating mooncakes.' },
        { hanzi: '月饼的馅儿有很多种：豆沙、莲蓉、蛋黄，还有最近流行的冰淇淋月饼。', pinyin: 'Yuèbǐng de xiànr yǒu hěn duō zhǒng: dòushā, liánróng, dànhuáng, hái yǒu zuìjìn liúxíng de bīngqílín yuèbǐng.', translationFr: 'Les gâteaux de lune ont plusieurs garnitures : pâte de haricots, pâte de lotus, jaune d\'œuf salé, et même les modernes gâteaux-glace.', translationEn: 'Mooncakes come in many fillings: red-bean paste, lotus-seed paste, salted yolk, and the trendy ice-cream mooncake.' },
        { hanzi: '奶奶说：\u201c以前，外出的人看到同一个月亮就觉得离家近了一点。\u201d', pinyin: 'Nǎinai shuō: "Yǐqián, wàichū de rén kàn dào tóng yí ge yuèliang jiù juéde lí jiā jìn le yìdiǎn."', translationFr: 'Grand-mère dit : « Autrefois, ceux qui étaient loin se sentaient plus proches de chez eux en voyant la même lune. »', translationEn: 'Grandma said: "In the old days, those far from home felt a little closer when they saw the same moon."' },
        { hanzi: '小朋友们拿着兔子灯，在院子里跑来跑去。', pinyin: 'Xiǎo péngyǒumen ná zhe tùzi dēng, zài yuànzi lǐ pǎo lái pǎo qù.', translationFr: 'Les enfants couraient dans la cour avec des lanternes en forme de lapin.', translationEn: 'The children ran around the courtyard with rabbit-shaped lanterns.' },
        { hanzi: '这一刻，我突然明白了什么叫\u201c团圆\u201d的幸福。', pinyin: 'Zhè yí kè, wǒ tūrán míngbái le shénme jiào "tuányuán" de xìngfú.', translationFr: 'À cet instant, j\'ai soudain compris ce qu\'on appelle le bonheur d\'être réunis.', translationEn: 'At that moment, I suddenly understood the happiness called "reunion".' }
      ],
      vocab: ['中秋节', '农历', '团圆', '阳台', '赏月', '月饼', '豆沙', '莲蓉', '兔子灯', '幸福'],
      questions: [
        {
          questionFr: 'Que symbolise la lune de la Mi-Automne ?',
          questionEn: 'What does the Mid-Autumn moon symbolise?',
          answerFr: 'La réunion de la famille (家人团圆).',
          answerEn: 'Family reunion (家人团圆).'
        },
        {
          questionFr: 'Citez trois garnitures classiques de gâteaux de lune.',
          questionEn: 'Name three classic mooncake fillings.',
          answerFr: 'Pâte de haricots rouges, pâte de lotus, jaune d\'œuf salé (豆沙, 莲蓉, 蛋黄).',
          answerEn: 'Red-bean paste, lotus-seed paste, salted yolk (豆沙, 莲蓉, 蛋黄).'
        }
      ]
    }
  },

  // ============================================================
  //  B1.1 — Nouvel An chinois, retour au pays
  // ============================================================
  {
    cecrLevel: 'b1.1',
    theme: 'Nouvel An chinois',
    themeEn: 'Chinese New Year',
    reading: {
      id: 'rd-b11-spring-festival',
      title: 'Rentrer chez soi pour la fête du Printemps',
      titleEn: 'Going home for Spring Festival',
      intro: 'Lin Jia travaille à Shanghai, mais sa famille vit dans un village du Hunan. Chaque année, le grand voyage du Nouvel An.',
      introEn: 'Lin Jia works in Shanghai but her family lives in a Hunan village. Every year, the great New Year journey.',
      segments: [
        { hanzi: '对中国人来说，春节是一年中最重要的节日。', pinyin: 'Duì Zhōngguó rén láishuō, Chūnjié shì yì nián zhōng zuì zhòngyào de jiérì.', translationFr: 'Pour les Chinois, la fête du Printemps est le plus important de l\'année.', translationEn: 'For Chinese people, Spring Festival is the most important holiday of the year.' },
        { hanzi: '不管在多远的地方工作，人们都会回家过年。', pinyin: 'Bùguǎn zài duō yuǎn de dìfang gōngzuò, rénmen dōu huì huí jiā guònián.', translationFr: 'Où qu\'ils travaillent, les gens rentrent à la maison pour passer la fête.', translationEn: 'No matter how far they work, people come home to celebrate.' },
        { hanzi: '火车站、机场全都挤满了拿着大包小包的旅客。', pinyin: 'Huǒchē zhàn, jīchǎng quán dōu jǐ mǎn le ná zhe dàbāo xiǎobāo de lǚkè.', translationFr: 'Les gares et aéroports sont bondés de voyageurs chargés de sacs.', translationEn: 'Train stations and airports are packed with travellers weighed down by bags.' },
        { hanzi: '这就是著名的\u201c春运\u201d——世界上规模最大的人口流动。', pinyin: 'Zhè jiùshì zhùmíng de "chūnyùn" — shìjiè shàng guīmó zuì dà de rénkǒu liúdòng.', translationFr: 'C\'est le fameux « chunyun », la plus grande migration humaine au monde.', translationEn: 'This is the famous "chunyun" — the world\'s largest human migration.' },
        { hanzi: '年三十晚上，全家人围坐在一起吃年夜饭。', pinyin: 'Nián sānshí wǎnshang, quán jiā rén wéi zuò zài yìqǐ chī nián yè fàn.', translationFr: 'Le soir du réveillon, toute la famille se réunit autour du repas du Nouvel An.', translationEn: 'On New Year\'s Eve, the whole family gathers for the reunion dinner.' },
        { hanzi: '饭桌上少不了鱼——因为\u201c鱼\u201d和\u201c余\u201d同音，代表\u201c年年有余\u201d。', pinyin: 'Fàn zhuō shàng shǎo bu liǎo yú — yīnwèi "yú" hé "yú" tóngyīn, dàibiǎo "nián nián yǒu yú".', translationFr: 'Le poisson est indispensable : « poisson » (鱼) et « surplus » (余) se prononcent pareil, d\'où le vœu « chaque année, l\'abondance ».', translationEn: 'Fish is a must — "fish" (鱼) and "surplus" (余) are homophones, bearing the wish "may there be surplus every year".' },
        { hanzi: '十二点钟声响起，大家互相拜年，孩子收到红包，笑声不断。', pinyin: 'Shí\'èr diǎn zhōng shēng xiǎng qǐ, dàjiā hùxiāng bàinián, háizi shōu dào hóngbāo, xiào shēng bú duàn.', translationFr: 'À minuit, on se souhaite la bonne année, les enfants reçoivent leur enveloppe rouge, les rires ne s\'arrêtent pas.', translationEn: 'At midnight, everyone exchanges New Year greetings; children receive red envelopes, and laughter never stops.' },
        { hanzi: '一年的辛苦，仿佛都在这一顿饭里被温暖融化。', pinyin: 'Yì nián de xīnkǔ, fǎngfú dōu zài zhè yí dùn fàn lǐ bèi wēnnuǎn rónghuà.', translationFr: 'Toute la fatigue de l\'année semble fondre dans la chaleur de ce repas.', translationEn: 'A whole year of hardship seems to melt away in the warmth of this one meal.' }
      ],
      vocab: ['春节', '过年', '春运', '流动', '年夜饭', '鱼', '年年有余', '拜年', '红包', '辛苦'],
      questions: [
        {
          questionFr: 'Qu\'est-ce que le « chunyun » ?',
          questionEn: 'What is "chunyun"?',
          answerFr: 'La plus grande migration humaine au monde pour le Nouvel An (世界上规模最大的人口流动).',
          answerEn: 'The world\'s largest human migration, for Chinese New Year.'
        },
        {
          questionFr: 'Pourquoi mange-t-on du poisson ?',
          questionEn: 'Why is fish served?',
          answerFr: 'Parce que 鱼 (poisson) et 余 (surplus) se prononcent pareil : symbole d\'abondance.',
          answerEn: 'Because 鱼 (fish) and 余 (surplus) sound alike: a wish for abundance.'
        }
      ]
    }
  },

  // ============================================================
  //  B1.2 — Chang'e s'envole vers la Lune
  // ============================================================
  {
    cecrLevel: 'b1.2',
    theme: 'Conte classique',
    themeEn: 'Classic tale',
    reading: {
      id: 'rd-b12-change-moon',
      title: 'Chang\'e s\'envole vers la Lune',
      titleEn: 'Chang\'e flies to the Moon',
      intro: 'Version simplifiée du mythe de 嫦娥奔月 — l\'un des récits les plus anciens expliquant l\'origine de la fête de la Mi-Automne.',
      introEn: 'A simplified version of the myth of Chang\'e flying to the Moon — one of the oldest tales behind the Mid-Autumn Festival.',
      segments: [
        { hanzi: '很久很久以前，天上有十个太阳，把大地烤得非常热。', pinyin: 'Hěn jiǔ hěn jiǔ yǐqián, tiān shàng yǒu shí ge tàiyáng, bǎ dàdì kǎo de fēicháng rè.', translationFr: 'Il y a très longtemps, il y avait dix soleils dans le ciel, qui brûlaient la terre.', translationEn: 'Long, long ago, there were ten suns in the sky, scorching the earth.' },
        { hanzi: '有一个叫后羿的勇士，用箭射下了九个太阳，救了人民。', pinyin: 'Yǒu yí ge jiào Hòu Yì de yǒngshì, yòng jiàn shè xià le jiǔ ge tàiyáng, jiù le rénmín.', translationFr: 'Un héros nommé Hou Yi abattit neuf soleils à coups de flèches et sauva le peuple.', translationEn: 'A hero named Hou Yi shot down nine of them with his arrows and saved the people.' },
        { hanzi: '后羿有一位漂亮善良的妻子，叫嫦娥。', pinyin: 'Hòu Yì yǒu yí wèi piàoliang shànliáng de qīzi, jiào Cháng\'é.', translationFr: 'Hou Yi avait une belle et bonne épouse, nommée Chang\'e.', translationEn: 'Hou Yi had a beautiful and kind-hearted wife named Chang\'e.' },
        { hanzi: '一天，一位神仙送给后羿一包长生不老的仙药。', pinyin: 'Yì tiān, yí wèi shénxiān sòng gěi Hòu Yì yì bāo chángshēng bùlǎo de xiānyào.', translationFr: 'Un jour, un immortel lui offrit un élixir d\'immortalité.', translationEn: 'One day, an immortal gave Hou Yi an elixir of eternal life.' },
        { hanzi: '但是他不想一个人成仙，所以把药交给嫦娥保管。', pinyin: 'Dànshì tā bù xiǎng yí ge rén chéngxiān, suǒyǐ bǎ yào jiāo gěi Cháng\'é bǎoguǎn.', translationFr: 'Mais il ne voulait pas devenir immortel seul et confia l\'élixir à Chang\'e.', translationEn: 'But he did not wish to ascend alone, and entrusted the elixir to Chang\'e.' },
        { hanzi: '有个坏人知道了这件事，想趁后羿不在家的时候抢药。', pinyin: 'Yǒu ge huàirén zhīdào le zhè jiàn shì, xiǎng chèn Hòu Yì bú zài jiā de shíhou qiǎng yào.', translationFr: 'Un malfaiteur, au courant, voulut dérober l\'élixir en l\'absence de Hou Yi.', translationEn: 'An evil man learned of this and plotted to steal the elixir while Hou Yi was away.' },
        { hanzi: '为了保护仙药，嫦娥只好自己把它吞了下去。', pinyin: 'Wèile bǎohù xiānyào, Cháng\'é zhǐhǎo zìjǐ bǎ tā tūn le xiàqù.', translationFr: 'Pour protéger l\'élixir, Chang\'e n\'eut d\'autre choix que de le boire elle-même.', translationEn: 'To protect it, Chang\'e had no choice but to swallow it herself.' },
        { hanzi: '她的身体突然变轻，慢慢飞向了月亮，从此留在月宫里。', pinyin: 'Tā de shēntǐ tūrán biàn qīng, mànmàn fēi xiàng le yuèliang, cóngcǐ liú zài yuègōng lǐ.', translationFr: 'Son corps devint léger, elle s\'envola peu à peu vers la Lune, où elle réside depuis lors dans le palais lunaire.', translationEn: 'Her body grew light and floated slowly up to the Moon, where she has lived ever since in the lunar palace.' },
        { hanzi: '后羿非常想念妻子，每年八月十五，他都会摆上她最爱吃的点心。', pinyin: 'Hòu Yì fēicháng xiǎngniàn qīzi, měi nián bā yuè shíwǔ, tā dōu huì bǎi shàng tā zuì ài chī de diǎnxīn.', translationFr: 'Hou Yi, inconsolable, disposait chaque 15ᵉ jour du 8ᵉ mois lunaire les gâteaux préférés de son épouse.', translationEn: 'Heartbroken, Hou Yi laid out her favourite sweets every 15th day of the 8th lunar month.' },
        { hanzi: '人们纷纷效仿，就这样慢慢形成了今天的中秋节。', pinyin: 'Rénmen fēnfēn xiàofǎng, jiù zhèyàng mànmàn xíngchéng le jīntiān de Zhōngqiū jié.', translationFr: 'Les gens suivirent son exemple, et c\'est ainsi qu\'est née, peu à peu, la fête d\'aujourd\'hui.', translationEn: 'People followed his example, and thus, over time, today\'s Mid-Autumn Festival took shape.' }
      ],
      vocab: ['太阳', '勇士', '箭', '仙药', '长生不老', '神仙', '保管', '月亮', '月宫', '想念'],
      questions: [
        {
          questionFr: 'Pourquoi Chang\'e a-t-elle bu l\'élixir ?',
          questionEn: 'Why did Chang\'e drink the elixir?',
          answerFr: 'Pour empêcher un voleur de s\'en emparer (保护仙药).',
          answerEn: 'To keep it from being stolen (保护仙药).'
        },
        {
          questionFr: 'Quel festival naît de cette légende ?',
          questionEn: 'Which festival comes from this legend?',
          answerFr: 'La fête de la Mi-Automne (中秋节).',
          answerEn: 'The Mid-Autumn Festival (中秋节).'
        }
      ]
    }
  },

  // ============================================================
  //  B2.1 — Sun Wukong au Palais Céleste
  // ============================================================
  {
    cecrLevel: 'b2.1',
    theme: 'Conte classique',
    themeEn: 'Classic tale',
    reading: {
      id: 'rd-b21-wukong-heaven',
      title: 'Sun Wukong met le ciel sens dessus dessous',
      titleEn: 'Sun Wukong turns Heaven upside down',
      intro: 'Extrait adapté du *Voyage en Occident* (西游记) — comment le Roi-Singe défie l\'empereur de Jade et bouleverse le palais céleste.',
      introEn: 'Adapted excerpt from *Journey to the West*: how the Monkey King challenges the Jade Emperor and throws Heaven into chaos.',
      segments: [
        { hanzi: '孙悟空本是花果山的一只石猴，天生神力，学会了七十二变。', pinyin: 'Sūn Wùkōng běn shì Huāguǒ Shān de yì zhī shí hóu, tiānshēng shénlì, xué huì le qīshí\'èr biàn.', translationFr: 'Sun Wukong était à l\'origine un singe de pierre du Mont des Fleurs-et-Fruits, doué d\'une force surnaturelle et maître des soixante-douze métamorphoses.', translationEn: 'Sun Wukong was originally a stone monkey of the Mountain of Flowers and Fruit, endowed with extraordinary strength and master of the seventy-two transformations.' },
        { hanzi: '他闯入东海龙宫，拿走了重一万三千五百斤的金箍棒。', pinyin: 'Tā chuǎng rù Dōng Hǎi lónggōng, ná zǒu le zhòng yí wàn sān qiān wǔ bǎi jīn de jīn gū bàng.', translationFr: 'Il s\'introduisit dans le palais du Dragon de la mer de l\'Est et emporta le bâton d\'or cerclé, pesant treize mille cinq cents livres.', translationEn: 'He broke into the Dragon Palace of the Eastern Sea and carried off the gold-banded staff, weighing thirteen thousand five hundred catties.' },
        { hanzi: '玉帝听说后，召他上天当\u201c弼马温\u201d，表面上是官，其实只是管马的小差事。', pinyin: 'Yù Dì tīngshuō hòu, zhào tā shàng tiān dāng "Bì Mǎ Wēn", biǎomiàn shàng shì guān, qíshí zhǐ shì guǎn mǎ de xiǎo chāishì.', translationFr: 'L\'Empereur de Jade, prévenu, le convoqua au ciel pour en faire un « Bi Ma Wen » — titre flatteur pour une charge d\'étable.', translationEn: 'Hearing of this, the Jade Emperor summoned him to Heaven as "Bi Ma Wen" — a grand title masking the lowly job of tending horses.' },
        { hanzi: '发现真相之后，孙悟空勃然大怒，一拳打翻了饭桌，飞回花果山。', pinyin: 'Fāxiàn zhēnxiàng zhī hòu, Sūn Wùkōng bórán dà nù, yì quán dǎ fān le fànzhuō, fēi huí Huāguǒ Shān.', translationFr: 'Ayant découvert la supercherie, Sun Wukong entra dans une colère noire, renversa la table d\'un coup de poing et s\'envola vers son mont.', translationEn: 'On discovering the truth, Sun Wukong flew into a rage, smashed the table with a single punch, and flew back to his mountain.' },
        { hanzi: '他自封为\u201c齐天大圣\u201d，意思是\u201c与天一样高\u201d。', pinyin: 'Tā zì fēng wéi "Qí Tiān Dà Shèng", yìsi shì "yǔ tiān yíyàng gāo".', translationFr: 'Il se proclama « Grand Sage Égal au Ciel », c\'est-à-dire « aussi haut que le Ciel lui-même ».', translationEn: 'He proclaimed himself "Great Sage Equal to Heaven", meaning "as lofty as Heaven itself".' },
        { hanzi: '天兵天将奉命捉拿他，却屡战屡败，无可奈何。', pinyin: 'Tiānbīng tiānjiàng fèngmìng zhuōná tā, què lǚ zhàn lǚ bài, wúkě nàihé.', translationFr: 'Soldats et généraux célestes, envoyés pour le capturer, furent défaits les uns après les autres, en vain.', translationEn: 'The heavenly soldiers were sent to arrest him but were defeated again and again, powerless to stop him.' },
        { hanzi: '他更把王母娘娘的蟠桃大会搅得一片狼藉，连仙丹也偷吃了。', pinyin: 'Tā gèng bǎ Wángmǔ Niángniáng de pántáo dàhuì jiǎo de yí piàn lángjí, lián xiāndān yě tōu chī le.', translationFr: 'Il sema le chaos au grand banquet des pêches d\'immortalité de la Reine Mère, allant jusqu\'à dévorer les pilules d\'immortalité.', translationEn: 'He even threw the Queen Mother\'s Peach Banquet into disarray, going so far as to devour the immortals\' elixir pills.' },
        { hanzi: '最终，玉帝只好请如来佛祖出面，把这只不可一世的猴子压在五指山下。', pinyin: 'Zuìzhōng, Yù Dì zhǐhǎo qǐng Rúlái Fózǔ chūmiàn, bǎ zhè zhī bùkě yí shì de hóuzi yā zài Wǔ Zhǐ Shān xià.', translationFr: 'À la fin, l\'Empereur de Jade dut faire appel au Bouddha Tathāgata, qui emprisonna ce singe invincible sous la Montagne aux Cinq Doigts.', translationEn: 'In the end, the Jade Emperor had to call on the Tathāgata Buddha, who imprisoned this matchless monkey beneath the Five-Finger Mountain.' },
        { hanzi: '五百年后，唐僧将他解放，从此师徒踏上西行之路。', pinyin: 'Wǔ bǎi nián hòu, Táng sēng jiāng tā jiěfàng, cóngcǐ shī tú tà shàng xī xíng zhī lù.', translationFr: 'Cinq cents ans plus tard, le moine Tang le libéra, et maître et disciple s\'élancèrent ensemble sur la route de l\'Occident.', translationEn: 'Five hundred years later, the monk Tang set him free, and master and disciple set out together on the journey to the West.' }
      ],
      vocab: ['花果山', '七十二变', '龙宫', '金箍棒', '玉帝', '弼马温', '齐天大圣', '蟠桃', '如来', '五指山'],
      questions: [
        {
          questionFr: 'Pourquoi Sun Wukong se met-il en colère contre le Ciel ?',
          questionEn: 'Why does Sun Wukong rage against Heaven?',
          answerFr: 'Il découvre que le titre de « Bi Ma Wen » n\'est qu\'un poste de palefrenier humiliant.',
          answerEn: 'He finds out that "Bi Ma Wen" is only a menial stable job.'
        },
        {
          questionFr: 'Qui parvient finalement à l\'emprisonner ?',
          questionEn: 'Who ultimately imprisons him?',
          answerFr: 'Le Bouddha Tathāgata (如来佛祖), sous la Montagne aux Cinq Doigts.',
          answerEn: 'The Buddha Tathāgata, beneath the Five-Finger Mountain.'
        }
      ]
    }
  },

  // ============================================================
  //  B2.1 — Le Bouvier et la Tisserande
  // ============================================================
  {
    cecrLevel: 'b2.1',
    theme: 'Conte classique',
    themeEn: 'Classic tale',
    reading: {
      id: 'rd-b21-cowherd-weaver',
      title: 'Le Bouvier et la Tisserande',
      titleEn: 'The Cowherd and the Weaver Girl',
      intro: 'Version littéraire du conte 牛郎织女 — origine de la fête de Qixi, la « Saint-Valentin chinoise ».',
      introEn: 'Literary version of the tale of the Cowherd and the Weaver Girl — origin of the Qixi Festival, China\'s "Valentine\'s Day".',
      segments: [
        { hanzi: '相传在银河的东岸，有一位织女，她是天帝的女儿，最擅长织云彩。', pinyin: 'Xiāngchuán zài Yínhé de dōng àn, yǒu yí wèi Zhīnǚ, tā shì Tiāndì de nǚ\'ér, zuì shàncháng zhī yúncai.', translationFr: 'On raconte qu\'à l\'est de la Voie lactée vivait la Tisserande, fille de l\'Empereur céleste, maîtresse dans l\'art de tisser les nuages.', translationEn: 'It is said that on the eastern shore of the Milky Way lived the Weaver Girl, daughter of the Heavenly Emperor, unrivalled at weaving clouds.' },
        { hanzi: '在人间，有一个勤劳朴实的年轻人，名叫牛郎。', pinyin: 'Zài rénjiān, yǒu yí ge qínláo pǔshí de niánqīng rén, míng jiào Niúláng.', translationFr: 'Dans le monde des hommes vivait un jeune homme laborieux et simple, nommé le Bouvier.', translationEn: 'In the mortal world lived a diligent, unassuming young man called the Cowherd.' },
        { hanzi: '他只有一头老牛作伴，日子过得清苦。', pinyin: 'Tā zhǐ yǒu yì tóu lǎo niú zuòbàn, rìzi guò de qīngkǔ.', translationFr: 'Seul un vieux bœuf lui tenait compagnie, et sa vie était misérable.', translationEn: 'Only an old ox kept him company, and his life was hard.' },
        { hanzi: '一次，织女下凡在河边沐浴，牛郎在老牛的指点下与她相遇。', pinyin: 'Yí cì, Zhīnǚ xià fán zài hé biān mùyù, Niúláng zài lǎo niú de zhǐdiǎn xià yǔ tā xiāngyù.', translationFr: 'Un jour, la Tisserande descendit sur terre pour se baigner, et le Bouvier, guidé par son vieux bœuf, la rencontra.', translationEn: 'Once, the Weaver Girl came down to earth to bathe, and guided by the old ox, the Cowherd met her.' },
        { hanzi: '两人一见钟情，很快结为夫妻，生下了一男一女。', pinyin: 'Liǎng rén yí jiàn zhōngqíng, hěn kuài jié wéi fūqī, shēng xià le yì nán yì nǚ.', translationFr: 'Les deux se prirent d\'amour au premier regard, s\'unirent peu après et eurent un fils et une fille.', translationEn: 'The two fell in love at first sight, soon wed, and had a son and a daughter.' },
        { hanzi: '天帝得知后勃然大怒，命王母娘娘强行把织女带回天宫。', pinyin: 'Tiāndì dé zhī hòu bórán dà nù, mìng Wángmǔ Niángniáng qiángxíng bǎ Zhīnǚ dài huí tiāngōng.', translationFr: 'Apprenant la nouvelle, l\'Empereur céleste entra en fureur et ordonna à la Reine Mère de ramener de force la Tisserande au palais céleste.', translationEn: 'When the Heavenly Emperor found out, he raged and ordered the Queen Mother to drag the Weaver Girl back to the heavenly palace.' },
        { hanzi: '牛郎披着牛皮，挑着两个孩子，一路追上天去。', pinyin: 'Niúláng pī zhe niú pí, tiāo zhe liǎng ge háizi, yí lù zhuī shàng tiān qù.', translationFr: 'Le Bouvier, revêtu de la peau du vieux bœuf, ses deux enfants aux épaules, se lança à leur poursuite jusqu\'au ciel.', translationEn: 'Clad in the hide of the old ox, with his two children on a shoulder-pole, the Cowherd chased them all the way to Heaven.' },
        { hanzi: '眼看就要追上，王母娘娘拔下金簪，划出一条滔滔银河将两人永远隔开。', pinyin: 'Yǎnkàn jiù yào zhuī shàng, Wángmǔ Niángniáng bá xià jīn zān, huà chū yì tiáo tāotāo Yínhé jiāng liǎng rén yǒngyuǎn gé kāi.', translationFr: 'Alors qu\'il allait les rejoindre, la Reine Mère arracha son épingle d\'or et traça une Voie lactée tumultueuse qui sépara les amants à jamais.', translationEn: 'Just as he closed the distance, the Queen Mother drew out her golden hairpin and traced a surging Milky Way, parting the lovers forever.' },
        { hanzi: '上天也被这份深情感动，允许他们每年七月七日相会一次。', pinyin: 'Shàngtiān yě bèi zhè fèn shēnqíng gǎndòng, yǔnxǔ tāmen měi nián qī yuè qī rì xiānghuì yí cì.', translationFr: 'Touché par cet amour profond, le Ciel les autorisa à se retrouver une fois l\'an, le septième jour du septième mois lunaire.', translationEn: 'Moved by their devotion, Heaven allowed them to meet once a year, on the seventh day of the seventh lunar month.' },
        { hanzi: '那一天，成千上万的喜鹊会飞上天空，为他们搭起一座鹊桥。', pinyin: 'Nà yì tiān, chéng qiān shàng wàn de xǐquè huì fēi shàng tiānkōng, wèi tāmen dā qǐ yí zuò quèqiáo.', translationFr: 'Ce jour-là, des milliers de pies s\'envolent pour leur bâtir un pont d\'oiseaux.', translationEn: 'On that day, tens of thousands of magpies fly up to build a bridge of birds for them.' }
      ],
      vocab: ['银河', '织女', '天帝', '云彩', '牛郎', '下凡', '一见钟情', '金簪', '鹊桥', '深情'],
      questions: [
        {
          questionFr: 'Qu\'est-ce qui sépare le Bouvier et la Tisserande ?',
          questionEn: 'What separates the Cowherd and the Weaver Girl?',
          answerFr: 'La Voie lactée, tracée par l\'épingle d\'or de la Reine Mère (银河).',
          answerEn: 'The Milky Way, drawn by the Queen Mother\'s golden hairpin.'
        },
        {
          questionFr: 'Quand et comment les amants se retrouvent-ils ?',
          questionEn: 'When and how do the lovers reunite?',
          answerFr: 'Le 7ᵉ jour du 7ᵉ mois lunaire, sur un pont bâti par les pies (鹊桥).',
          answerEn: 'On the 7th day of the 7th lunar month, on a bridge built by magpies.'
        }
      ]
    }
  },

  // ============================================================
  //  B2.2 — La Légende du Serpent Blanc
  // ============================================================
  {
    cecrLevel: 'b2.2',
    theme: 'Conte classique',
    themeEn: 'Classic tale',
    reading: {
      id: 'rd-b22-white-snake',
      title: 'La Légende du Serpent Blanc',
      titleEn: 'The Legend of the White Snake',
      intro: 'Résumé littéraire de 白蛇传, l\'une des quatre grandes légendes d\'amour chinoises, ancrée sur les rives du lac de l\'Ouest à Hangzhou.',
      introEn: 'Literary summary of *The Legend of the White Snake*, one of China\'s four great love legends, set on West Lake in Hangzhou.',
      segments: [
        { hanzi: '相传，千年修行的白蛇和青蛇化为人形，云游四方。', pinyin: 'Xiāngchuán, qiān nián xiūxíng de bái shé hé qīng shé huà wéi rén xíng, yúnyóu sìfāng.', translationFr: 'On raconte qu\'un serpent blanc et un serpent vert, après mille ans de méditation, prirent forme humaine et voyagèrent à travers le monde.', translationEn: 'Legend has it that a white snake and a green snake, after a thousand years of cultivation, took human form and roamed the world.' },
        { hanzi: '某个春日的杭州西湖，小雨蒙蒙，白蛇化作的\u201c白素贞\u201d和\u201c小青\u201d在断桥避雨。', pinyin: 'Mǒu ge chūnrì de Hángzhōu Xī Hú, xiǎoyǔ méngméng, bái shé huà zuò de "Bái Sùzhēn" hé "Xiǎo Qīng" zài Duàn Qiáo bìyǔ.', translationFr: 'Un jour de printemps, sur le lac de l\'Ouest à Hangzhou, sous une bruine fine, Bai Suzhen — l\'incarnation du serpent blanc — et Xiao Qing se réfugièrent de la pluie sur le Pont Brisé.', translationEn: 'One spring day on Hangzhou\'s West Lake, in a misty drizzle, Bai Suzhen — the white snake in human form — and Xiao Qing took shelter on the Broken Bridge.' },
        { hanzi: '一位书生许仙主动把伞借给了白素贞，两人由此结缘。', pinyin: 'Yí wèi shūshēng Xǔ Xiān zhǔdòng bǎ sǎn jiè gěi le Bái Sùzhēn, liǎng rén yóu cǐ jié yuán.', translationFr: 'Un jeune lettré nommé Xu Xian lui tendit spontanément son parapluie ; ainsi naquit entre eux un lien.', translationEn: 'A young scholar named Xu Xian offered her his umbrella, and thus a bond was formed between them.' },
        { hanzi: '不久后两人相爱成婚，日子过得和和美美。', pinyin: 'Bùjiǔ hòu liǎng rén xiāng\'ài chéng hūn, rìzi guò de hé hé měi měi.', translationFr: 'Peu après, ils s\'aimèrent, se marièrent et coulèrent des jours harmonieux.', translationEn: 'Soon the two fell in love and married, living in peaceful happiness.' },
        { hanzi: '然而，金山寺的法海禅师看出白素贞的真身，认为\u201c妖怪与人不可通婚\u201d。', pinyin: 'Rán\'ér, Jīnshān sì de Fǎ Hǎi chánshī kàn chū Bái Sùzhēn de zhēnshēn, rènwéi "yāoguài yǔ rén bùkě tōnghūn".', translationFr: 'Cependant, le moine Fa Hai du temple du Mont d\'Or perça à jour la nature véritable de Bai Suzhen et décréta qu\'un démon ne pouvait épouser un humain.', translationEn: 'But Master Fa Hai of the Golden Mountain Temple saw through Bai Suzhen\'s true form and insisted that a demon could not marry a human.' },
        { hanzi: '他用尽办法拆散这对夫妻，甚至把许仙骗到寺里囚禁起来。', pinyin: 'Tā yòng jìn bànfǎ chāisàn zhè duì fūqī, shènzhì bǎ Xǔ Xiān piàn dào sì lǐ qiújìn qǐlái.', translationFr: 'Il usa de tous les stratagèmes pour séparer le couple, allant jusqu\'à attirer Xu Xian au temple et l\'y retenir prisonnier.', translationEn: 'He resorted to every means to tear them apart, even luring Xu Xian to the temple and keeping him captive.' },
        { hanzi: '白素贞怀着身孕，仍不顾一切率水族\u201c水漫金山\u201d，场面惊天动地。', pinyin: 'Bái Sùzhēn huái zhe shēnyùn, réng búgù yíqiè shuài shuǐzú "shuǐ màn Jīnshān", chǎngmiàn jīngtiān dòngdì.', translationFr: 'Bai Suzhen, enceinte, mena pourtant les créatures aquatiques « noyer le Mont d\'Or » dans une scène épique et bouleversante.', translationEn: 'Pregnant though she was, Bai Suzhen led the water spirits to "flood the Golden Mountain" in a scene that shook heaven and earth.' },
        { hanzi: '可惜法力敌不过法海，她最终被镇压在杭州西湖的雷峰塔下。', pinyin: 'Kěxī fǎlì dí bu guò Fǎ Hǎi, tā zuìzhōng bèi zhènyā zài Hángzhōu Xī Hú de Léi Fēng Tǎ xià.', translationFr: 'Hélas, ses pouvoirs ne firent pas le poids face à Fa Hai : elle fut scellée sous la Pagode du Pic du Tonnerre, au bord du lac de l\'Ouest.', translationEn: 'Yet her powers were no match for Fa Hai\'s, and she was finally imprisoned beneath the Leifeng Pagoda on West Lake.' },
        { hanzi: '多年以后，她的儿子高中状元，前来祭塔，才使母亲获得解救。', pinyin: 'Duō nián yǐhòu, tā de érzi gāo zhòng zhuàngyuán, qián lái jì tǎ, cái shǐ mǔqīn huòdé jiějiù.', translationFr: 'Des années plus tard, son fils, devenu premier lauréat des examens impériaux, vint rendre hommage à la pagode et obtint la libération de sa mère.', translationEn: 'Years later, her son, having placed first in the imperial examinations, came to honour the pagoda and at last secured his mother\'s release.' },
        { hanzi: '直到今天，雷峰塔依旧静静地立在湖畔，像一段跨越千年的回声。', pinyin: 'Zhídào jīntiān, Léi Fēng Tǎ yījiù jìngjìng de lì zài hú pàn, xiàng yí duàn kuàyuè qiān nián de huíshēng.', translationFr: 'Aujourd\'hui encore, la Pagode du Pic du Tonnerre se dresse, silencieuse, au bord du lac — un écho traversant mille ans.', translationEn: 'To this day, the Leifeng Pagoda still stands quietly by the lake, like an echo crossing a thousand years.' }
      ],
      vocab: ['修行', '白蛇', '西湖', '断桥', '书生', '结缘', '禅师', '妖怪', '水漫金山', '雷峰塔'],
      questions: [
        {
          questionFr: 'Comment Bai Suzhen et Xu Xian se rencontrent-ils ?',
          questionEn: 'How do Bai Suzhen and Xu Xian meet?',
          answerFr: 'Sur le Pont Brisé du lac de l\'Ouest, quand Xu Xian lui prête son parapluie.',
          answerEn: 'On the Broken Bridge on West Lake, when Xu Xian lends her his umbrella.'
        },
        {
          questionFr: 'Qui s\'oppose à leur union ?',
          questionEn: 'Who opposes their union?',
          answerFr: 'Le moine Fa Hai du Temple du Mont d\'Or (法海禅师).',
          answerEn: 'Master Fa Hai of the Golden Mountain Temple.'
        }
      ]
    }
  },

  // ============================================================
  //  C1.1 — Les Amants Papillons
  // ============================================================
  {
    cecrLevel: 'c1.1',
    theme: 'Conte classique',
    themeEn: 'Classic tale',
    reading: {
      id: 'rd-c11-butterfly-lovers',
      title: 'Liang Shanbo et Zhu Yingtai',
      titleEn: 'Liang Shanbo and Zhu Yingtai',
      intro: 'Récit littéraire de 梁山伯与祝英台, la « Roméo et Juliette » chinoise, qui se métamorphose en vol de papillons.',
      introEn: 'A literary retelling of *Liang Shanbo and Zhu Yingtai*, China\'s "Romeo and Juliet", transfigured into a flight of butterflies.',
      segments: [
        { hanzi: '东晋年间，会稽的祝英台聪慧好学，却因是女子，不得入学。', pinyin: 'Dōng Jìn niánjiān, Kuài Jī de Zhù Yīngtái cōnghuì hàoxué, què yīn shì nǚzǐ, bùdé rù xué.', translationFr: 'Sous les Jin orientaux, Zhu Yingtai, native de Kuai Ji, brillante et studieuse, se voyait interdire les études au seul motif d\'être femme.', translationEn: 'In the Eastern Jin dynasty, Zhu Yingtai of Kuai Ji, bright and eager to learn, was barred from school simply because she was a woman.' },
        { hanzi: '她说服父母，乔装男子，前往杭州书院求学。', pinyin: 'Tā shuōfú fùmǔ, qiáozhuāng nánzǐ, qiánwǎng Hángzhōu shūyuàn qiúxué.', translationFr: 'Elle persuada ses parents de la laisser se déguiser en homme et partir étudier à l\'académie de Hangzhou.', translationEn: 'She persuaded her parents to let her disguise herself as a man and go to the Hangzhou academy.' },
        { hanzi: '在书院，她与同窗梁山伯情投意合，结为金兰。', pinyin: 'Zài shūyuàn, tā yǔ tóngchuāng Liáng Shānbó qíng tóu yì hé, jié wéi jīnlán.', translationFr: 'À l\'académie, elle se lia intimement à son condisciple Liang Shanbo, et ils scellèrent un serment de fraternité.', translationEn: 'At the academy, she formed a deep bond with her classmate Liang Shanbo, and they swore an oath of brotherhood.' },
        { hanzi: '三年同窗，梁山伯始终未察觉这位挚友的真实身份。', pinyin: 'Sān nián tóngchuāng, Liáng Shānbó shǐzhōng wèi chájué zhè wèi zhìyǒu de zhēnshí shēnfèn.', translationFr: 'Trois années durant, Liang Shanbo ne soupçonna jamais la véritable identité de son ami le plus cher.', translationEn: 'For three years together, Liang Shanbo never suspected the true identity of his dearest friend.' },
        { hanzi: '毕业之际，祝英台托言为\u201c妹妹\u201d订婚，邀山伯日后上门提亲，已暗含深意。', pinyin: 'Bìyè zhī jì, Zhù Yīngtái tuōyán wèi "mèimei" dìnghūn, yāo Shānbó rìhòu shàngmén tíqīn, yǐ àn hán shēn yì.', translationFr: 'À la veille du départ, Yingtai, sous le prétexte de fiancer sa « petite sœur », invita Liang Shanbo à venir demander sa main plus tard — message à peine voilé.', translationEn: 'At graduation, Yingtai, pretending to arrange a match for her "younger sister", invited Liang Shanbo to come later to propose — a scarcely veiled message.' },
        { hanzi: '待山伯悟出真相，赶赴祝家，却得知英台已被父母许配给马家公子。', pinyin: 'Dài Shānbó wù chū zhēnxiàng, gǎn fù Zhù jiā, què dé zhī Yīngtái yǐ bèi fùmǔ xǔpèi gěi Mǎ jiā gōngzǐ.', translationFr: 'Quand Shanbo comprit enfin et courut chez les Zhu, il apprit que Yingtai avait été promise par ses parents au fils de la famille Ma.', translationEn: 'By the time Shanbo grasped the truth and rushed to the Zhu residence, he learned that Yingtai had been betrothed by her parents to the son of the Ma family.' },
        { hanzi: '山伯哀伤成疾，不久便郁郁而亡，葬于英台出嫁必经之路。', pinyin: 'Shānbó āishāng chéng jí, bùjiǔ biàn yùyù ér wáng, zàng yú Yīngtái chūjià bì jīng zhī lù.', translationFr: 'Shanbo, rongé de chagrin, tomba malade et mourut peu après ; il fut inhumé sur la route que Yingtai devrait emprunter le jour de ses noces.', translationEn: 'Shanbo, overcome with grief, fell ill and soon died; he was buried on the very road Yingtai would travel on her wedding day.' },
        { hanzi: '出嫁那日，花轿行至山伯墓前，忽然狂风大作，地动山摇。', pinyin: 'Chūjià nà rì, huā jiào xíng zhì Shānbó mù qián, hūrán kuáng fēng dà zuò, dì dòng shān yáo.', translationFr: 'Le jour du mariage, alors que le palanquin passait devant la tombe, un vent furieux se leva et la terre trembla.', translationEn: 'On the wedding day, as the bridal sedan neared Shanbo\'s tomb, a violent gale arose and the earth quaked.' },
        { hanzi: '英台含泪走下花轿，墓穴忽然裂开，她毅然跃入其中，合葬于挚爱身旁。', pinyin: 'Yīngtái hán lèi zǒu xià huā jiào, mùxué hūrán liè kāi, tā yìrán yuè rù qízhōng, hézàng yú zhì\'ài shēn páng.', translationFr: 'En larmes, Yingtai descendit du palanquin ; la tombe s\'ouvrit d\'un coup, et elle s\'y jeta résolument pour reposer auprès de celui qu\'elle aimait.', translationEn: 'Weeping, Yingtai stepped down; the grave suddenly split open, and she leapt in without hesitation, to rest beside her beloved.' },
        { hanzi: '旋即，从坟中飞出一对彩蝶，翩翩共舞，再也没有分开。', pinyin: 'Xuánjí, cóng fén zhōng fēi chū yí duì cǎi dié, piānpiān gòng wǔ, zài yě méiyǒu fēnkāi.', translationFr: 'Aussitôt, deux papillons multicolores s\'élevèrent du tombeau, dansant ensemble sans plus jamais se séparer.', translationEn: 'At once, a pair of bright butterflies flew up from the grave, dancing together and never again apart.' }
      ],
      vocab: ['会稽', '书院', '乔装', '情投意合', '金兰', '订婚', '许配', '郁郁', '花轿', '彩蝶'],
      questions: [
        {
          questionFr: 'Pourquoi Zhu Yingtai se déguise-t-elle en homme ?',
          questionEn: 'Why does Zhu Yingtai disguise herself as a man?',
          answerFr: 'Pour pouvoir être admise à étudier à l\'académie, interdite aux femmes.',
          answerEn: 'So she can attend the academy, which was closed to women.'
        },
        {
          questionFr: 'En quoi les amants sont-ils transfigurés à la fin ?',
          questionEn: 'What do the lovers transform into at the end?',
          answerFr: 'En une paire de papillons multicolores qui dansent pour l\'éternité (彩蝶).',
          answerEn: 'Into a pair of bright butterflies dancing for eternity.'
        }
      ]
    }
  },

  // ============================================================
  //  C1.2 — Yingning, la femme-renarde
  // ============================================================
  {
    cecrLevel: 'c1.2',
    theme: 'Conte classique',
    themeEn: 'Classic tale',
    reading: {
      id: 'rd-c12-yingning-fox',
      title: 'Yingning, la jeune femme qui rit',
      titleEn: 'Yingning, the laughing fox-girl',
      intro: 'Adaptation littéraire de 《聊斋志异·婴宁》 de Pu Songling — portrait d\'une jeune renarde candide dont le rire sauve et trouble à la fois.',
      introEn: 'Literary adaptation of "Yingning" from Pu Songling\'s *Liaozhai Zhiyi* — a portrait of an innocent fox-girl whose laughter both saves and disturbs.',
      segments: [
        { hanzi: '蒲松龄笔下的狐女婴宁，初次出场是在一条杂花烂漫的山径上。', pinyin: 'Pú Sōnglíng bǐxià de hú nǚ Yīngníng, chū cì chūchǎng shì zài yì tiáo zá huā lànmàn de shān jìng shàng.', translationFr: 'Sous la plume de Pu Songling, la jeune renarde Yingning apparaît pour la première fois sur un sentier de montagne où mille fleurs fleurissent sans ordre.', translationEn: 'Under Pu Songling\'s brush, the fox-girl Yingning first appears on a mountain path aflame with riotous blossoms.' },
        { hanzi: '她手持一枝梅花，见人便笑，笑声清脆得仿佛与花香同源。', pinyin: 'Tā shǒu chí yì zhī méihuā, jiàn rén biàn xiào, xiào shēng qīngcuì de fǎngfú yǔ huā xiāng tóng yuán.', translationFr: 'Tenant à la main une branche de prunier, elle sourit à quiconque passe ; son rire limpide semble jaillir de la même source que le parfum des fleurs.', translationEn: 'Holding a branch of plum blossom, she laughs at whomever she sees, her clear laughter seeming to spring from the same source as the flowers\' scent.' },
        { hanzi: '书生王子服在元宵节偶遇她，一见倾心，从此相思成病。', pinyin: 'Shūshēng Wáng Zǐfú zài Yuánxiāo jié ǒuyù tā, yí jiàn qīngxīn, cóngcǐ xiāngsī chéng bìng.', translationFr: 'Le lettré Wang Zifu la croise par hasard lors de la fête des Lanternes, s\'éprend d\'elle au premier regard, et en tombe malade d\'amour.', translationEn: 'The scholar Wang Zifu happens upon her during the Lantern Festival, falls for her at first sight, and sickens with longing.' },
        { hanzi: '他辗转寻访，终于在一座深山的小院找到她，与一位\u201c老太太\u201d同住。', pinyin: 'Tā zhǎnzhuǎn xúnfǎng, zhōngyú zài yí zuò shēn shān de xiǎoyuàn zhǎo dào tā, yǔ yí wèi "lǎo tàitai" tóng zhù.', translationFr: 'Après bien des détours, il finit par la découvrir dans une petite cour au cœur d\'une montagne profonde, vivant auprès d\'une « vieille dame ».', translationEn: 'After much searching, he eventually finds her in a small courtyard deep in the mountains, living with an "old woman".' },
        { hanzi: '婴宁不谙人世礼数，举手投足皆天真烂漫。', pinyin: 'Yīngníng bù ān rénshì lǐshù, jǔ shǒu tóu zú jiē tiānzhēn lànmàn.', translationFr: 'Yingning ignore les usages du monde ; chacun de ses gestes respire la candeur.', translationEn: 'Yingning knows nothing of worldly etiquette; her every gesture is pure innocence.' },
        { hanzi: '她爱花胜命，爬树折枝，毫不顾及他人目光。', pinyin: 'Tā ài huā shèng mìng, pá shù zhé zhī, háo bú gùjí tārén mùguāng.', translationFr: 'Elle aime les fleurs plus que la vie : elle grimpe aux arbres pour en cueillir les branches, indifférente aux regards d\'autrui.', translationEn: 'She loves flowers more than life itself, climbing trees to break off branches, heedless of onlookers.' },
        { hanzi: '王家将她迎娶回府，阖家都被她的笑声感染。', pinyin: 'Wáng jiā jiāng tā yíngqǔ huí fǔ, héjiā dōu bèi tā de xiào shēng gǎnrǎn.', translationFr: 'La famille Wang la reçoit comme épouse et toute la maisonnée se laisse gagner par son rire.', translationEn: 'The Wang family brings her home as a bride, and the entire household is carried away by her laughter.' },
        { hanzi: '然而，她的笑天真无邪，竟招致邻人的误会与讥讽。', pinyin: 'Rán\'ér, tā de xiào tiānzhēn wúxié, jìng zhāozhì línrén de wùhuì yǔ jīfěng.', translationFr: 'Hélas, ce rire trop pur attire les malentendus et les railleries du voisinage.', translationEn: 'Yet such unaffected laughter invites the neighbours\' misunderstanding and mockery.' },
        { hanzi: '她遂在某日收敛笑意，眉宇间第一次浮现人间式的忧愁。', pinyin: 'Tā suì zài mǒu rì shōu liǎn xiào yì, méiyǔ jiān dì yī cì fúxiàn rénjiān shì de yōuchóu.', translationFr: 'Un jour, elle retint son rire, et pour la première fois un souci tout humain s\'inscrivit entre ses sourcils.', translationEn: 'One day she reined in her laughter, and for the first time a distinctly human melancholy stole across her brow.' },
        { hanzi: '临终前，\u201c老太太\u201d向王子服吐露：她本是山中狐灵，因善而转生人形。', pinyin: 'Línzhōng qián, "lǎo tàitai" xiàng Wáng Zǐfú tǔlù: tā běn shì shān zhōng hú líng, yīn shàn ér zhuǎnshēng rén xíng.', translationFr: 'Avant de mourir, la « vieille dame » révèle à Wang Zifu que Yingning est une esprit-renarde des montagnes, métamorphosée en humaine grâce à sa bonté.', translationEn: 'On her deathbed, the "old woman" reveals to Wang Zifu that Yingning is a mountain fox-spirit, reborn in human shape through virtue.' },
        { hanzi: '故事终章，蒲松龄感慨：笑，本是天性，奈何人世容不下一片澄明。', pinyin: 'Gùshì zhōng zhāng, Pú Sōnglíng gǎnkǎi: xiào, běn shì tiānxìng, nàihé rénshì róng bu xià yí piàn chéngmíng.', translationFr: 'Au terme du récit, Pu Songling soupire : rire est une nature originelle ; hélas, le monde des hommes ne tolère pas un éclat de pure limpidité.', translationEn: 'In the story\'s coda, Pu Songling laments: laughter is our native nature; yet the human world cannot hold even a single drop of such clarity.' }
      ],
      vocab: ['聊斋志异', '狐女', '梅花', '一见倾心', '元宵节', '礼数', '天真烂漫', '笑声', '误会', '狐灵'],
      questions: [
        {
          questionFr: 'Qu\'est-ce qui distingue Yingning des autres jeunes femmes ?',
          questionEn: 'What sets Yingning apart from other young women?',
          answerFr: 'Son rire incessant et sa totale ignorance des convenances (天真烂漫, 不谙礼数).',
          answerEn: 'Her ceaseless laughter and complete ignorance of etiquette.'
        },
        {
          questionFr: 'Quelle morale Pu Songling tire-t-il de ce conte ?',
          questionEn: 'What moral does Pu Songling draw from the tale?',
          answerFr: 'Que le monde humain ne supporte pas la pureté originelle symbolisée par le rire.',
          answerEn: 'That the human world cannot bear the original purity symbolised by laughter.'
        }
      ]
    }
  },

  // ============================================================
  //  C2.1 — La ballade de Mulan
  // ============================================================
  {
    cecrLevel: 'c2.1',
    theme: 'Conte classique',
    themeEn: 'Classic tale',
    reading: {
      id: 'rd-c21-mulan',
      title: 'Hua Mulan, la fille qui partit en guerre',
      titleEn: 'Hua Mulan, the girl who went to war',
      intro: 'Réécriture littéraire du 《木兰辞》 — le yuefu anonyme des Wei du Nord qui donne naissance au mythe de Mulan.',
      introEn: 'Literary reworking of the *Ballad of Mulan* — the anonymous Northern Wei *yuefu* that gives rise to the Mulan myth.',
      segments: [
        { hanzi: '北朝有歌曰：\u201c唧唧复唧唧，木兰当户织。\u201d短短十字，已透出千年风骨。', pinyin: 'Běi cháo yǒu gē yuē: "Jījī fù jījī, Mùlán dāng hù zhī." Duǎn duǎn shí zì, yǐ tòu chū qiān nián fēnggǔ.', translationFr: 'Les Dynasties du Nord chantent : « Cli-cli, cli-cli, à la porte Mulan tisse. » Dix caractères à peine, et déjà mille ans de noble carrure.', translationEn: 'A song from the Northern Dynasties goes: "Click-click, click-click, Mulan weaves by the door." Ten characters, yet a thousand-year bearing already shines through.' },
        { hanzi: '可汗大点兵，军书十二卷，卷卷有爷名。', pinyin: 'Kèhán dà diǎn bīng, jūn shū shí\'èr juǎn, juǎn juǎn yǒu yé míng.', translationFr: 'Le Grand Khan lève ses troupes : douze rouleaux de listes, et dans chacun figure le nom du père.', translationEn: 'The Khan musters his armies; twelve scrolls of conscription lists, and the father\'s name is in every one.' },
        { hanzi: '阿爷无大儿，木兰无长兄——家国之忧，化作闺中的一声长叹。', pinyin: 'Ā yé wú dà ér, Mùlán wú zhǎng xiōng — jiā guó zhī yōu, huà zuò guī zhōng de yì shēng cháng tàn.', translationFr: 'Le père sans fils aîné, Mulan sans grand frère : le souci du foyer et de l\'État se mue, au fond du gynécée, en un long soupir.', translationEn: 'The father has no elder son, Mulan no elder brother — the cares of family and state dissolve into a long sigh in the women\'s chamber.' },
        { hanzi: '她遂下定决心：\u201c愿为市鞍马，从此替爷征。\u201d', pinyin: 'Tā suì xià dìng juéxīn: "Yuàn wèi shì ān mǎ, cóngcǐ tì yé zhēng."', translationFr: 'Elle prit alors sa décision : « Je m\'en irai acheter selle et cheval, et partirai en guerre à la place de mon père. »', translationEn: 'And so she resolved: "I will buy saddle and horse, and from this day take my father\'s place in war."' },
        { hanzi: '东市买骏马，西市买鞍鞯——几行诗里，少女的行装已铺满城郭。', pinyin: 'Dōng shì mǎi jùnmǎ, xī shì mǎi ānjiān — jǐ háng shī lǐ, shàonǚ de xíngzhuāng yǐ pū mǎn chéngguō.', translationFr: 'Au marché de l\'Est, un cheval fougueux ; à l\'Ouest, la selle et le tapis — en quelques vers, l\'équipage de la jeune fille emplit la ville entière.', translationEn: 'At the eastern market a swift steed, at the western a saddle cloth — in a few verses, the girl\'s gear already fills the city.' },
        { hanzi: '戎马十二年，寒光照铁衣，她于万军之中从未显露女儿之身。', pinyin: 'Róng mǎ shí\'èr nián, hán guāng zhào tiě yī, tā yú wàn jūn zhī zhōng cóng wèi xiǎnlù nǚ\'ér zhī shēn.', translationFr: 'Douze années sur les champs de bataille, sa cuirasse baignée de clartés froides, et jamais, parmi dix mille soldats, elle ne laissa percer sa condition de femme.', translationEn: 'Twelve years in arms, cold light glinting on her iron mail — and never among ten thousand soldiers did she betray that she was a woman.' },
        { hanzi: '凯旋归来，天子当殿欲封万户，她却辞官不受，只求一匹千里马以还故里。', pinyin: 'Kǎixuán guīlái, tiānzǐ dāng diàn yù fēng wàn hù, tā què cí guān bú shòu, zhǐ qiú yì pǐ qiān lǐ mǎ yǐ huán gùlǐ.', translationFr: 'De retour victorieuse, elle refuse la faveur du Fils du Ciel qui veut lui conférer la dignité de dix mille foyers, et ne demande qu\'un coursier capable de la ramener chez elle.', translationEn: 'On returning triumphant, she refuses the Son of Heaven\'s offer of a fief of ten thousand households, asking only for a thousand-li horse to ride home.' },
        { hanzi: '归家之日，脱戎装，理云鬓，对镜贴花黄——昔年之木兰，瞬间回到镜中。', pinyin: 'Guī jiā zhī rì, tuō róngzhuāng, lǐ yúnbìn, duì jìng tiē huā huáng — xī nián zhī Mùlán, shùnjiān huí dào jìng zhōng.', translationFr: 'Le jour du retour, elle quitte son armure, remet en ordre sa chevelure de nuage, colle devant le miroir la poudre d\'or — et l\'ancienne Mulan réapparaît dans le reflet.', translationEn: 'On the day of return, she sheds her armour, combs her cloud-like hair, presses golden powder onto her brow before the mirror — and the former Mulan instantly reappears in the glass.' },
        { hanzi: '同行十二年，战友竟不知将军乃是女郎，此节至今读来仍令人击节。', pinyin: 'Tóngxíng shí\'èr nián, zhànyǒu jìng bùzhī jiāngjūn nǎi shì nǚláng, cǐ jié zhìjīn dú lái réng lìng rén jī jié.', translationFr: 'Douze années côte à côte, et ses compagnons d\'armes n\'avaient jamais deviné que le général fût une femme — détail qu\'aujourd\'hui encore on lit en battant la mesure d\'admiration.', translationEn: 'Twelve years side by side, and her comrades had never guessed their general was a woman — a detail still read today to an admiring beat.' },
        { hanzi: '木兰之名，遂不仅是一则传奇，更成了古来女性被压抑之力量的一次喷薄。', pinyin: 'Mùlán zhī míng, suì bùjǐn shì yì zé chuánqí, gèng chéng le gǔlái nǚxìng bèi yāyì zhī lìliang de yí cì pēnbó.', translationFr: 'Le nom de Mulan, ainsi, dépasse la simple légende : il devient l\'éclatante irruption, dans l\'histoire, d\'une force féminine longtemps comprimée.', translationEn: 'The name Mulan thus becomes more than legend — it is the sudden, radiant eruption of a feminine power long suppressed throughout history.' }
      ],
      vocab: ['木兰辞', '可汗', '点兵', '戎装', '鞍鞯', '凯旋', '辞官', '千里马', '云鬓', '传奇'],
      questions: [
        {
          questionFr: 'Pourquoi Mulan part-elle en guerre à la place de son père ?',
          questionEn: 'Why does Mulan go to war in her father\'s place?',
          answerFr: 'Son père n\'a pas de fils aîné et elle pas de grand frère pour répondre à la conscription.',
          answerEn: 'Her father has no elder son, and she no elder brother, to answer the draft.'
        },
        {
          questionFr: 'Que refuse-t-elle à son retour ?',
          questionEn: 'What does she refuse upon her return?',
          answerFr: 'La dignité de dix mille foyers offerte par l\'Empereur ; elle demande seulement un cheval pour rentrer chez elle.',
          answerEn: 'The fief of ten thousand households offered by the Emperor; she asks only for a horse to return home.'
        }
      ]
    }
  }
];
