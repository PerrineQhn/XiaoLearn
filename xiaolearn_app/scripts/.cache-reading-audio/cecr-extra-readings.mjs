export const cecrExtraReadings = [
    // ============================================================
    //  A1 — Ma chambre
    // ============================================================
    {
        cecrLevel: 'a1',
        theme: 'Ma chambre',
        themeEn: 'My room',
        reading: {
            id: 'rd-a1-my-room',
            title: 'Bienvenue dans ma chambre',
            titleEn: 'Welcome to my room',
            intro: 'Xiao Ming décrit sa petite chambre d\'étudiant — un texte simple pour pratiquer les lieux et les objets du quotidien.',
            introEn: 'Xiao Ming describes his small student room — a simple text to practice places and everyday objects.',
            segments: [
                { hanzi: '我叫小明，我是中国人。', pinyin: 'Wǒ jiào Xiǎo Míng, wǒ shì Zhōngguó rén.', translationFr: 'Je m\'appelle Xiao Ming, je suis Chinois.', translationEn: 'My name is Xiao Ming, I\'m Chinese.' },
                { hanzi: '我的房间不大，但是很舒服。', pinyin: 'Wǒ de fángjiān bú dà, dànshì hěn shūfu.', translationFr: 'Ma chambre n\'est pas grande, mais elle est très confortable.', translationEn: 'My room isn\'t big, but it\'s very comfortable.' },
                { hanzi: '房间里有一张床、一个书桌和一把椅子。', pinyin: 'Fángjiān lǐ yǒu yì zhāng chuáng, yí ge shūzhuō hé yì bǎ yǐzi.', translationFr: 'Dans la chambre, il y a un lit, un bureau et une chaise.', translationEn: 'In the room there\'s a bed, a desk and a chair.' },
                { hanzi: '书桌上有我的电脑和一些书。', pinyin: 'Shūzhuō shàng yǒu wǒ de diànnǎo hé yìxiē shū.', translationFr: 'Sur le bureau, il y a mon ordinateur et quelques livres.', translationEn: 'On the desk there\'s my computer and some books.' },
                { hanzi: '窗户旁边有很多植物。', pinyin: 'Chuānghu pángbiān yǒu hěn duō zhíwù.', translationFr: 'À côté de la fenêtre, il y a beaucoup de plantes.', translationEn: 'Next to the window there are many plants.' },
                { hanzi: '我很喜欢我的房间。', pinyin: 'Wǒ hěn xǐhuan wǒ de fángjiān.', translationFr: 'J\'aime beaucoup ma chambre.', translationEn: 'I really like my room.' }
            ],
            vocab: ['房间', '床', '书桌', '椅子', '电脑', '窗户', '植物', '舒服'],
            questions: [
                {
                    questionFr: 'Qu\'y a-t-il sur le bureau ?',
                    questionEn: 'What\'s on the desk?',
                    answerFr: 'L\'ordinateur et quelques livres (电脑和一些书).',
                    answerEn: 'The computer and some books (电脑和一些书).'
                },
                {
                    questionFr: 'Où se trouvent les plantes ?',
                    questionEn: 'Where are the plants?',
                    answerFr: 'À côté de la fenêtre (窗户旁边).',
                    answerEn: 'Next to the window (窗户旁边).'
                }
            ]
        }
    },
    // ============================================================
    //  A2 — Au marché
    // ============================================================
    {
        cecrLevel: 'a2',
        theme: 'Au marché',
        themeEn: 'At the market',
        reading: {
            id: 'rd-a2-market',
            title: 'Une matinée au marché',
            titleEn: 'A morning at the market',
            intro: 'Madame Zhang fait ses courses au marché de quartier — prix, quantités et petites interactions avec les marchands.',
            introEn: 'Mrs. Zhang does her shopping at the local market — prices, quantities and small chats with the vendors.',
            segments: [
                { hanzi: '每个星期六早上，张阿姨都去菜市场买菜。', pinyin: 'Měi ge xīngqīliù zǎoshang, Zhāng āyí dōu qù càishìchǎng mǎi cài.', translationFr: 'Chaque samedi matin, tata Zhang va au marché acheter des légumes.', translationEn: 'Every Saturday morning, auntie Zhang goes to the market to buy vegetables.' },
                { hanzi: '她喜欢在菜市场买东西，因为那里的菜又新鲜又便宜。', pinyin: 'Tā xǐhuan zài càishìchǎng mǎi dōngxi, yīnwèi nàli de cài yòu xīnxiān yòu piányi.', translationFr: 'Elle aime y faire ses courses parce que les légumes sont frais et pas chers.', translationEn: 'She likes shopping there because the veggies are both fresh and cheap.' },
                { hanzi: '今天她买了两斤西红柿、一斤黄瓜和三个苹果。', pinyin: 'Jīntiān tā mǎi le liǎng jīn xīhóngshì, yì jīn huángguā hé sān ge píngguǒ.', translationFr: 'Aujourd\'hui elle a acheté un kilo de tomates, une livre de concombres et trois pommes.', translationEn: 'Today she bought a kilo of tomatoes, half a kilo of cucumbers and three apples.' },
                { hanzi: '她问卖鱼的：\u201c这条鱼多少钱一斤？\u201d', pinyin: 'Tā wèn mài yú de: "Zhè tiáo yú duōshao qián yì jīn?"', translationFr: 'Elle demande au poissonnier : « Combien coûte ce poisson le demi-kilo ? »', translationEn: 'She asks the fishmonger: "How much is this fish per half-kilo?"' },
                { hanzi: '卖鱼的说：\u201c十五块，很新鲜，今天早上刚到的。\u201d', pinyin: 'Mài yú de shuō: "Shíwǔ kuài, hěn xīnxiān, jīntiān zǎoshang gāng dào de."', translationFr: 'Le poissonnier répond : « Quinze yuans, très frais, arrivé ce matin. »', translationEn: '"Fifteen yuan, very fresh, just arrived this morning."' },
                { hanzi: '张阿姨觉得有一点贵，但是还是买了一条。', pinyin: 'Zhāng āyí juéde yǒu yìdiǎn guì, dànshì háishi mǎi le yì tiáo.', translationFr: 'Tata Zhang trouve ça un peu cher, mais elle en achète tout de même un.', translationEn: 'Auntie Zhang finds it a bit pricey, but she still buys one.' },
                { hanzi: '回家的路上，她看到邻居李阿姨，两个人一起聊了一会儿天。', pinyin: 'Huí jiā de lù shàng, tā kàn dào línjū Lǐ āyí, liǎng ge rén yìqǐ liáo le yíhuìr tiān.', translationFr: 'Sur le chemin du retour, elle croise sa voisine tata Li, et elles bavardent un moment.', translationEn: 'On her way home she meets her neighbour auntie Li, and they chat for a while.' }
            ],
            vocab: ['菜市场', '新鲜', '便宜', '西红柿', '黄瓜', '苹果', '一斤', '多少钱', '邻居', '聊天'],
            questions: [
                {
                    questionFr: 'Pourquoi tata Zhang aime-t-elle le marché ?',
                    questionEn: 'Why does auntie Zhang like the market?',
                    answerFr: 'Les légumes y sont frais et pas chers (又新鲜又便宜).',
                    answerEn: 'The veggies are fresh and cheap (又新鲜又便宜).'
                },
                {
                    questionFr: 'Combien coûte le poisson ?',
                    questionEn: 'How much is the fish?',
                    answerFr: 'Quinze yuans le demi-kilo (十五块一斤).',
                    answerEn: 'Fifteen yuan per half-kilo (十五块一斤).'
                }
            ]
        }
    },
    // ============================================================
    //  B1.1 — Mon colocataire
    // ============================================================
    {
        cecrLevel: 'b1.1',
        theme: 'Vie en colocation',
        themeEn: 'Flatshare life',
        reading: {
            id: 'rd-b11-roommate',
            title: 'Mon nouveau colocataire',
            titleEn: 'My new roommate',
            intro: 'Une étudiante raconte les premières semaines de cohabitation avec un colocataire très différent d\'elle.',
            introEn: 'A student describes the first weeks of living with a very different roommate.',
            segments: [
                { hanzi: '两个月前，我搬进了一个新公寓，和一个法国留学生合租。', pinyin: 'Liǎng ge yuè qián, wǒ bān jìn le yí ge xīn gōngyù, hé yí ge Fǎguó liúxuéshēng hézū.', translationFr: 'Il y a deux mois, j\'ai emménagé dans un nouvel appartement, en colocation avec un étudiant français.', translationEn: 'Two months ago, I moved into a new apartment and now share it with a French exchange student.' },
                { hanzi: '他叫Luc，二十三岁，是学汉语的。', pinyin: 'Tā jiào Luc, èrshísān suì, shì xué Hànyǔ de.', translationFr: 'Il s\'appelle Luc, il a vingt-trois ans et il étudie le chinois.', translationEn: 'His name is Luc, he\'s twenty-three and he studies Chinese.' },
                { hanzi: '一开始，我们的生活习惯不太一样。', pinyin: 'Yì kāishǐ, wǒmen de shēnghuó xíguàn bú tài yíyàng.', translationFr: 'Au début, nos habitudes étaient plutôt différentes.', translationEn: 'At first, our daily habits were quite different.' },
                { hanzi: '我喜欢早睡早起，可是他常常十二点以后才睡。', pinyin: 'Wǒ xǐhuan zǎo shuì zǎo qǐ, kěshì tā chángcháng shí\'èr diǎn yǐhòu cái shuì.', translationFr: 'J\'aime me coucher et me lever tôt, mais lui ne se couche souvent qu\'après minuit.', translationEn: 'I like going to bed and getting up early, but he often doesn\'t sleep until after midnight.' },
                { hanzi: '他做饭的时候，厨房总是很乱，让我有点不舒服。', pinyin: 'Tā zuò fàn de shíhou, chúfáng zǒng shì hěn luàn, ràng wǒ yǒudiǎn bù shūfu.', translationFr: 'Quand il cuisine, la cuisine est toujours en désordre, ce qui me gêne un peu.', translationEn: 'When he cooks, the kitchen is always a mess, which bothers me a bit.' },
                { hanzi: '后来我们坐下来好好谈了谈，定了几条小规矩。', pinyin: 'Hòulái wǒmen zuò xià lái hǎohāo tán le tán, dìng le jǐ tiáo xiǎo guījǔ.', translationFr: 'Ensuite, on s\'est assis pour en discuter et on a fixé quelques petites règles.', translationEn: 'Later, we sat down and had a proper talk, and we set a few small rules.' },
                { hanzi: '现在，他每次做完饭都会打扫厨房，我也学会了更耐心一点。', pinyin: 'Xiànzài, tā měi cì zuò wán fàn dōu huì dǎsǎo chúfáng, wǒ yě xué huì le gèng nàixīn yìdiǎn.', translationFr: 'Maintenant, il nettoie la cuisine après chaque repas, et moi j\'ai appris à être plus patiente.', translationEn: 'Now he cleans the kitchen after every meal, and I\'ve learnt to be a bit more patient.' },
                { hanzi: '我们还会一起吃饭，用汉语和法语互相练习。', pinyin: 'Wǒmen hái huì yìqǐ chī fàn, yòng Hànyǔ hé Fǎyǔ hùxiāng liànxí.', translationFr: 'On mange aussi ensemble et on pratique mutuellement le chinois et le français.', translationEn: 'We also eat together and practise Chinese and French with each other.' }
            ],
            vocab: ['公寓', '合租', '留学生', '习惯', '厨房', '规矩', '打扫', '耐心', '互相', '练习'],
            questions: [
                {
                    questionFr: 'Quel était le principal problème au début ?',
                    questionEn: 'What was the main problem at first?',
                    answerFr: 'Des habitudes de vie différentes et la cuisine toujours en désordre.',
                    answerEn: 'Different lifestyles and the messy kitchen.'
                },
                {
                    questionFr: 'Comment ont-ils résolu la situation ?',
                    questionEn: 'How did they solve the situation?',
                    answerFr: 'Ils ont discuté et fixé quelques règles (定了几条小规矩).',
                    answerEn: 'They talked and set a few rules (定了几条小规矩).'
                }
            ]
        }
    },
    // ============================================================
    //  B1.2 — Les applis de livraison
    // ============================================================
    {
        cecrLevel: 'b1.2',
        theme: 'Vie urbaine',
        themeEn: 'Urban life',
        reading: {
            id: 'rd-b12-delivery',
            title: 'La Chine livrée en trente minutes',
            titleEn: 'China delivered in thirty minutes',
            intro: 'Petit reportage sur les applications de livraison de repas devenues incontournables dans les grandes villes chinoises.',
            introEn: 'A short piece on food-delivery apps, now indispensable in China\'s big cities.',
            segments: [
                { hanzi: '在中国的大城市，外卖已经成为一种新的生活方式。', pinyin: 'Zài Zhōngguó de dà chéngshì, wàimài yǐjīng chéngwéi yì zhǒng xīn de shēnghuó fāngshì.', translationFr: 'Dans les grandes villes chinoises, la livraison est devenue un véritable mode de vie.', translationEn: 'In China\'s big cities, food delivery has become a new way of life.' },
                { hanzi: '只要打开手机上的应用，几分钟就可以下单。', pinyin: 'Zhǐ yào dǎkāi shǒujī shàng de yìngyòng, jǐ fēnzhōng jiù kěyǐ xiàdān.', translationFr: 'Il suffit d\'ouvrir une appli sur son téléphone pour commander en quelques minutes.', translationEn: 'Just open an app on your phone and you can order in a few minutes.' },
                { hanzi: '快的话，三十分钟以内，骑手就把饭送到门口。', pinyin: 'Kuài de huà, sānshí fēnzhōng yǐnèi, qíshǒu jiù bǎ fàn sòng dào ménkǒu.', translationFr: 'Si c\'est rapide, le livreur apporte le repas à la porte en moins de trente minutes.', translationEn: 'At best, the rider brings the meal to your door in under thirty minutes.' },
                { hanzi: '对上班族来说，这种服务节省了不少时间。', pinyin: 'Duì shàngbānzú láishuō, zhè zhǒng fúwù jiéshěng le bù shǎo shíjiān.', translationFr: 'Pour les actifs, ce service fait gagner beaucoup de temps.', translationEn: 'For working people, this service saves a lot of time.' },
                { hanzi: '但是，很多骑手的工作压力非常大，有时候为了准时送达，会闯红灯。', pinyin: 'Dànshì, hěn duō qíshǒu de gōngzuò yālì fēicháng dà, yǒushíhou wèile zhǔnshí sòngdá, huì chuǎng hóngdēng.', translationFr: 'Mais la pression sur les livreurs est immense : pour être à l\'heure, certains grillent les feux rouges.', translationEn: 'However, riders face enormous pressure, and to arrive on time some run red lights.' },
                { hanzi: '另外，每天产生的塑料餐盒也成了严重的环境问题。', pinyin: 'Lìngwài, měi tiān chǎnshēng de sùliào cānhé yě chéng le yánzhòng de huánjìng wèntí.', translationFr: 'Par ailleurs, les barquettes en plastique générées chaque jour posent un vrai problème environnemental.', translationEn: 'In addition, the plastic containers produced every day have become a serious environmental issue.' },
                { hanzi: '最近，一些平台开始鼓励用户选择\u201c不要一次性餐具\u201d。', pinyin: 'Zuìjìn, yìxiē píngtái kāishǐ gǔlì yònghù xuǎnzé "bú yào yícìxìng cānjù".', translationFr: 'Récemment, plusieurs plateformes encouragent leurs utilisateurs à choisir « sans couverts jetables ».', translationEn: 'Recently, several platforms have started encouraging users to choose "no disposable cutlery".' },
                { hanzi: '这种方便的服务让生活变简单了，但代价却需要大家一起承担。', pinyin: 'Zhè zhǒng fāngbiàn de fúwù ràng shēnghuó biàn jiǎndān le, dàn dàijià què xūyào dàjiā yìqǐ chéngdān.', translationFr: 'Ce service si pratique simplifie la vie, mais son coût doit être partagé par tous.', translationEn: 'This convenient service makes life easier, but its cost must be shared by everyone.' }
            ],
            vocab: ['外卖', '应用', '下单', '骑手', '上班族', '压力', '闯红灯', '塑料', '一次性', '承担'],
            questions: [
                {
                    questionFr: 'Quels sont les deux inconvénients principaux du boom de la livraison ?',
                    questionEn: 'What are the two main downsides of the delivery boom?',
                    answerFr: 'La pression sur les livreurs et la pollution plastique.',
                    answerEn: 'Pressure on riders and plastic pollution.'
                },
                {
                    questionFr: 'Comment les plateformes tentent-elles de réduire les déchets ?',
                    questionEn: 'How do platforms try to reduce waste?',
                    answerFr: 'En proposant l\'option « sans couverts jetables » (不要一次性餐具).',
                    answerEn: 'By offering the "no disposable cutlery" option (不要一次性餐具).'
                }
            ]
        }
    },
    // ============================================================
    //  B2.1 — Vieillissement de la population
    // ============================================================
    {
        cecrLevel: 'b2.1',
        theme: 'Société',
        themeEn: 'Society',
        reading: {
            id: 'rd-b21-aging-society',
            title: 'Vivre vieux, ensemble',
            titleEn: 'Growing old, together',
            intro: 'Article d\'analyse sur les défis démographiques de la Chine : baisse de la natalité et vieillissement accéléré.',
            introEn: 'Analytical article on China\'s demographic challenges: falling birth rate and accelerated aging.',
            segments: [
                { hanzi: '根据国家统计局的数据，中国六十岁以上的人口已经超过了两亿八千万。', pinyin: 'Gēnjù guójiā tǒngjìjú de shùjù, Zhōngguó liùshí suì yǐshàng de rénkǒu yǐjīng chāoguò le liǎng yì bāqiān wàn.', translationFr: 'Selon le Bureau national des statistiques, la population chinoise de plus de 60 ans dépasse désormais 280 millions.', translationEn: 'According to the National Bureau of Statistics, China\'s over-60 population now exceeds 280 million.' },
                { hanzi: '这意味着每五个中国人中，就有一个是老年人。', pinyin: 'Zhè yìwèizhe měi wǔ ge Zhōngguó rén zhōng, jiù yǒu yí ge shì lǎoniánrén.', translationFr: 'Cela signifie qu\'un Chinois sur cinq est une personne âgée.', translationEn: 'This means that one in every five Chinese is elderly.' },
                { hanzi: '与此同时，年轻人的生育意愿却在持续下降。', pinyin: 'Yǔ cǐ tóngshí, niánqīngrén de shēngyù yìyuàn què zài chíxù xiàjiàng.', translationFr: 'Dans le même temps, le désir d\'enfant des jeunes continue de diminuer.', translationEn: 'At the same time, young people\'s willingness to have children keeps falling.' },
                { hanzi: '高房价、教育成本以及工作压力，都成为他们犹豫的主要原因。', pinyin: 'Gāo fángjià, jiàoyù chéngběn yǐjí gōngzuò yālì, dōu chéngwéi tāmen yóuyù de zhǔyào yuányīn.', translationFr: 'Le prix du logement, le coût de l\'éducation et la pression au travail sont les principales causes de leur hésitation.', translationEn: 'High housing prices, education costs and work pressure are the main reasons for their hesitation.' },
                { hanzi: '虽然政府已经放开了三孩政策，但效果并不明显。', pinyin: 'Suīrán zhèngfǔ yǐjīng fàngkāi le sān hái zhèngcè, dàn xiàoguǒ bìng bù míngxiǎn.', translationFr: 'Bien que le gouvernement ait autorisé le troisième enfant, l\'effet reste limité.', translationEn: 'Although the government has allowed a third child, the effect is hardly visible.' },
                { hanzi: '专家警告：如果趋势不变，未来的养老体系将面临巨大压力。', pinyin: 'Zhuānjiā jǐnggào: rúguǒ qūshì bú biàn, wèilái de yǎnglǎo tǐxì jiāng miànlín jùdà yālì.', translationFr: 'Les experts avertissent : si la tendance se maintient, le système de retraite subira une pression énorme.', translationEn: 'Experts warn: if the trend holds, the pension system will face enormous pressure.' },
                { hanzi: '一些城市已经开始鼓励\u201c银发经济\u201d，开发更多为老年人服务的产品。', pinyin: 'Yìxiē chéngshì yǐjīng kāishǐ gǔlì "yínfà jīngjì", kāifā gèng duō wèi lǎoniánrén fúwù de chǎnpǐn.', translationFr: 'Plusieurs villes encouragent déjà « l\'économie des cheveux argentés » en développant des produits pour les seniors.', translationEn: 'Some cities already promote the "silver economy", developing more products aimed at seniors.' },
                { hanzi: '如何在少子化的背景下保持社会活力，将是未来几十年的核心议题。', pinyin: 'Rúhé zài shǎozǐhuà de bèijǐng xià bǎochí shèhuì huólì, jiāng shì wèilái jǐ shí nián de héxīn yìtí.', translationFr: 'Comment maintenir le dynamisme social dans un contexte de dénatalité sera la question centrale des prochaines décennies.', translationEn: 'How to keep society vibrant amid a declining birth rate will be the core issue of the coming decades.' }
            ],
            vocab: ['统计局', '人口', '老年人', '生育', '房价', '教育成本', '政策', '养老', '银发经济', '少子化'],
            questions: [
                {
                    questionFr: 'Quelles sont les trois causes principales de la baisse de la natalité ?',
                    questionEn: 'What are the three main causes of the falling birth rate?',
                    answerFr: 'Le prix du logement, le coût de l\'éducation et la pression au travail.',
                    answerEn: 'Housing prices, education costs and work pressure.'
                },
                {
                    questionFr: 'Qu\'est-ce que « l\'économie des cheveux argentés » ?',
                    questionEn: 'What is the "silver economy"?',
                    answerFr: 'Le développement de produits et services pour les seniors (为老年人服务的产品).',
                    answerEn: 'The development of products and services for seniors (为老年人服务的产品).'
                }
            ]
        }
    },
    // ============================================================
    //  B2.2 — La ville intelligente
    // ============================================================
    {
        cecrLevel: 'b2.2',
        theme: 'Technologie urbaine',
        themeEn: 'Urban technology',
        reading: {
            id: 'rd-b22-smart-city',
            title: 'Quand la ville devient intelligente',
            titleEn: 'When the city wakes up smart',
            intro: 'Panorama des expérimentations urbaines combinant big data, caméras et 5G, avec leurs promesses et leurs zones d\'ombre.',
            introEn: 'An overview of urban experiments combining big data, cameras and 5G, with their promises and grey areas.',
            segments: [
                { hanzi: '从杭州的\u201c城市大脑\u201d到雄安的新区实验，中国已经投入巨资建设智慧城市。', pinyin: 'Cóng Hángzhōu de "Chéngshì Dànǎo" dào Xióng\'ān de xīnqū shíyàn, Zhōngguó yǐjīng tóurù jù zī jiànshè zhìhuì chéngshì.', translationFr: 'Du « City Brain » de Hangzhou aux expérimentations de la nouvelle zone de Xiong\'an, la Chine a investi massivement dans les villes intelligentes.', translationEn: 'From Hangzhou\'s "City Brain" to experiments in Xiong\'an New Area, China has poured huge investment into smart cities.' },
                { hanzi: '通过传感器和人工智能，交通可以被实时分析和优化。', pinyin: 'Tōngguò chuángǎnqì hé réngōng zhìnéng, jiāotōng kěyǐ bèi shíshí fēnxī hé yōuhuà.', translationFr: 'Grâce aux capteurs et à l\'intelligence artificielle, la circulation peut être analysée et optimisée en temps réel.', translationEn: 'Thanks to sensors and artificial intelligence, traffic can be analyzed and optimized in real time.' },
                { hanzi: '救护车的响应时间缩短了三成以上，这对急救来说意义重大。', pinyin: 'Jiùhùchē de xiǎngyìng shíjiān suōduǎn le sān chéng yǐshàng, zhè duì jíjiù láishuō yìyì zhòngdà.', translationFr: 'Le temps de réponse des ambulances a été réduit de plus de 30 %, un bénéfice majeur pour les secours.', translationEn: 'Ambulance response times have been cut by more than 30%, a major benefit for emergency care.' },
                { hanzi: '居民只要刷一张\u201c市民卡\u201d，就能使用公交、医院和图书馆等各种服务。', pinyin: 'Jūmín zhǐ yào shuā yì zhāng "shìmín kǎ", jiù néng shǐyòng gōngjiāo, yīyuàn hé túshūguǎn děng gèzhǒng fúwù.', translationFr: 'Les habitants n\'ont qu\'à scanner une « carte citoyenne » pour accéder aux bus, aux hôpitaux, aux bibliothèques, etc.', translationEn: 'Residents simply swipe a "citizen card" to access buses, hospitals, libraries and more.' },
                { hanzi: '然而，庞大的数据收集也带来了前所未有的隐私问题。', pinyin: 'Rán\'ér, pángdà de shùjù shōují yě dàilái le qián suǒ wèi yǒu de yǐnsī wèntí.', translationFr: 'Toutefois, la collecte massive de données soulève des questions de vie privée sans précédent.', translationEn: 'However, the massive data collection raises unprecedented privacy concerns.' },
                { hanzi: '有学者指出，如果缺乏制度约束，效率提升的代价可能是个人自由的退步。', pinyin: 'Yǒu xuézhě zhǐchū, rúguǒ quēfá zhìdù yuēshù, xiàolǜ tíshēng de dàijià kěnéng shì gèrén zìyóu de tuìbù.', translationFr: 'Des chercheurs notent que sans garde-fous institutionnels, les gains d\'efficacité peuvent se payer d\'un recul des libertés individuelles.', translationEn: 'Scholars point out that without institutional checks, efficiency gains may come at the cost of shrinking personal freedom.' },
                { hanzi: '在国际舞台上，中国的智慧城市方案正被东南亚、非洲等地采纳。', pinyin: 'Zài guójì wǔtái shàng, Zhōngguó de zhìhuì chéngshì fāng\'àn zhèng bèi Dōngnányà, Fēizhōu děng dì cǎinà.', translationFr: 'Sur la scène internationale, le modèle chinois de ville intelligente s\'exporte notamment en Asie du Sud-Est et en Afrique.', translationEn: 'On the international stage, China\'s smart-city model is being adopted in Southeast Asia, Africa and elsewhere.' },
                { hanzi: '未来的城市，既要聪明，也要懂得保护居住在其中的每一个人。', pinyin: 'Wèilái de chéngshì, jì yào cōngming, yě yào dǒngde bǎohù jūzhù zài qízhōng de měi yí ge rén.', translationFr: 'La ville de demain devra être intelligente, mais aussi capable de protéger chacun de ses habitants.', translationEn: 'Tomorrow\'s city must be smart, and also know how to protect every person who lives in it.' }
            ],
            vocab: ['智慧城市', '城市大脑', '传感器', '人工智能', '优化', '市民卡', '隐私', '制度约束', '采纳', '居住'],
            questions: [
                {
                    questionFr: 'Citez deux bénéfices concrets mesurés dans les villes intelligentes.',
                    questionEn: 'Name two concrete benefits measured in smart cities.',
                    answerFr: 'Réduction du temps de réponse des ambulances (>30 %) et accès unifié aux services via la carte citoyenne.',
                    answerEn: 'Ambulance response times cut by 30%+ and unified service access via the citizen card.'
                },
                {
                    questionFr: 'Quelle est la principale préoccupation soulevée par les chercheurs ?',
                    questionEn: 'What is the main concern raised by scholars?',
                    answerFr: 'L\'atteinte à la vie privée et la perte de libertés individuelles.',
                    answerEn: 'Privacy intrusion and loss of individual freedoms.'
                }
            ]
        }
    },
    // ============================================================
    //  C1.1 — Le Hanfu, retour de la tradition
    // ============================================================
    {
        cecrLevel: 'c1.1',
        theme: 'Culture',
        themeEn: 'Culture',
        reading: {
            id: 'rd-c11-hanfu-revival',
            title: 'Le Hanfu : quand la jeunesse réinvente la tradition',
            titleEn: 'Hanfu: youth reinventing tradition',
            intro: 'Article de presse culturelle sur le renouveau du vêtement traditionnel han (汉服) chez les jeunes Chinois des années 2020.',
            introEn: 'Cultural piece on the revival of traditional Han dress (Hanfu) among young Chinese in the 2020s.',
            segments: [
                { hanzi: '近十年来，一种名为\u201c汉服\u201d的传统服饰在年轻人中悄然复兴。', pinyin: 'Jìn shí nián lái, yì zhǒng míng wéi "Hànfú" de chuántǒng fúshì zài niánqīngrén zhōng qiāorán fùxīng.', translationFr: 'Depuis une dizaine d\'années, un vêtement traditionnel nommé « Hanfu » connaît un retour discret chez les jeunes.', translationEn: 'Over the past decade, a traditional garment called "Hanfu" has been quietly reviving among young people.' },
                { hanzi: '它源于汉族两千多年的衣冠文化，款式随朝代不断演变。', pinyin: 'Tā yuán yú Hànzú liǎng qiān duō nián de yīguān wénhuà, kuǎnshì suí cháodài búduàn yǎnbiàn.', translationFr: 'Il puise ses racines dans plus de deux millénaires de culture vestimentaire han, et ses styles ont évolué dynastie après dynastie.', translationEn: 'It draws on more than two thousand years of Han dress culture, evolving with each dynasty.' },
                { hanzi: '在地铁、公园甚至婚礼现场，你都可能遇到身着汉服、举止从容的年轻人。', pinyin: 'Zài dìtiě, gōngyuán shènzhì hūnlǐ xiànchǎng, nǐ dōu kěnéng yù dào shēn zhuó Hànfú, jǔzhǐ cóngróng de niánqīngrén.', translationFr: 'Dans le métro, au parc, voire à une cérémonie de mariage, on croise désormais des jeunes en Hanfu, l\'air posé.', translationEn: 'On the subway, in parks, even at weddings, you may meet poised young people dressed in Hanfu.' },
                { hanzi: '对他们而言，穿汉服并非复古的表演，而是一种自我身份的表达。', pinyin: 'Duì tāmen ér yán, chuān Hànfú bìng fēi fùgǔ de biǎoyǎn, ér shì yì zhǒng zìwǒ shēnfèn de biǎodá.', translationFr: 'Pour eux, porter le Hanfu n\'est pas une performance nostalgique, mais une manière d\'affirmer son identité.', translationEn: 'To them, wearing Hanfu is not a nostalgic performance but a way of expressing who they are.' },
                { hanzi: '社交媒体的推波助澜也功不可没，短视频平台上相关话题播放量已逾百亿。', pinyin: 'Shèjiāo méitǐ de tuī bō zhù lán yě gōng bù kě mò, duǎn shìpín píngtái shàng xiāngguān huàtí bòfàngliàng yǐ yú bǎi yì.', translationFr: 'Les réseaux sociaux y ont largement contribué : sur les plateformes de vidéo courte, les hashtags dépassent les dix milliards de vues.', translationEn: 'Social media has played no small role: related hashtags on short-video platforms have racked up over ten billion views.' },
                { hanzi: '不过，批评者认为这种潮流容易滑入消费主义，把文化简化成了视觉符号。', pinyin: 'Búguò, pīpíng zhě rènwéi zhè zhǒng cháoliú róngyì huá rù xiāofèi zhǔyì, bǎ wénhuà jiǎnhuà chéng le shìjué fúhào.', translationFr: 'Certains critiques estiment toutefois que cette mode glisse vite dans le consumérisme, réduisant la culture à un simple symbole visuel.', translationEn: 'Critics, however, argue that the trend risks sliding into consumerism, reducing culture to a mere visual symbol.' },
                { hanzi: '更深层的问题或许在于：一个古老的美学如何在现代生活中找到恰当的位置？', pinyin: 'Gèng shēncéng de wèntí huòxǔ zàiyú: yí ge gǔlǎo de měixué rúhé zài xiàndài shēnghuó zhōng zhǎodào qiàdàng de wèizhì?', translationFr: 'La question plus profonde est peut-être celle-ci : comment une esthétique ancienne peut-elle trouver sa juste place dans la vie moderne ?', translationEn: 'The deeper question may be: how can an ancient aesthetic find its proper place in modern life?' },
                { hanzi: '无论答案为何，汉服的复兴已经成为观察当代中国文化心态的一扇窗口。', pinyin: 'Wúlùn dá\'àn wéi hé, Hànfú de fùxīng yǐjīng chéngwéi guānchá dāngdài Zhōngguó wénhuà xīntài de yì shàn chuāngkǒu.', translationFr: 'Quelle que soit la réponse, le renouveau du Hanfu offre désormais une fenêtre sur la mentalité culturelle chinoise contemporaine.', translationEn: 'Whatever the answer, the Hanfu revival has become a window onto the cultural mindset of contemporary China.' }
            ],
            vocab: ['汉服', '复兴', '衣冠', '演变', '举止', '身份', '推波助澜', '消费主义', '美学', '心态'],
            questions: [
                {
                    questionFr: 'Pourquoi les jeunes portent-ils le Hanfu selon l\'article ?',
                    questionEn: 'Why do young people wear Hanfu according to the article?',
                    answerFr: 'Non comme un spectacle rétro, mais comme une expression de leur identité (自我身份的表达).',
                    answerEn: 'Not as retro performance, but as expression of identity (自我身份的表达).'
                },
                {
                    questionFr: 'Quelle critique est adressée à ce phénomène ?',
                    questionEn: 'What criticism is leveled at the trend?',
                    answerFr: 'Un glissement vers le consumérisme qui réduit la culture à un symbole visuel.',
                    answerEn: 'A slide into consumerism that reduces culture to a visual symbol.'
                }
            ]
        }
    },
    // ============================================================
    //  C1.1 — La sagesse de Laozi
    // ============================================================
    {
        cecrLevel: 'c1.1',
        theme: 'Philosophie',
        themeEn: 'Philosophy',
        reading: {
            id: 'rd-c11-laozi-wisdom',
            title: 'Laozi parle encore',
            titleEn: 'Laozi still speaks',
            intro: 'Courte réflexion pédagogique sur quelques idées-clés du *Dao De Jing* et leur résonance dans la vie contemporaine.',
            introEn: 'A short educational reflection on a few key ideas from the *Dao De Jing* and their relevance today.',
            segments: [
                { hanzi: '《道德经》虽只有五千多字，却被历代思想家反复研读了两千余年。', pinyin: '"Dào Dé Jīng" suī zhǐ yǒu wǔqiān duō zì, què bèi lìdài sīxiǎngjiā fǎnfù yándú le liǎng qiān yú nián.', translationFr: 'Le *Dao De Jing* ne compte que cinq mille caractères, mais les penseurs l\'ont étudié en continu pendant plus de deux millénaires.', translationEn: 'The *Dao De Jing* has only some five thousand characters, yet thinkers have studied it continuously for over two millennia.' },
                { hanzi: '老子提出\u201c无为而治\u201d，并非主张消极旁观，而是顺应事物本身的节奏。', pinyin: 'Lǎozǐ tíchū "wú wéi ér zhì", bìng fēi zhǔzhāng xiāojí pángguān, ér shì shùnyìng shìwù běnshēn de jiézòu.', translationFr: 'Laozi prône le « gouverner par le non-agir », ce qui n\'est pas passivité mais alignement avec le rythme propre des choses.', translationEn: 'Laozi advocates "ruling through non-action" — not passivity, but attuning oneself to the rhythm of things themselves.' },
                { hanzi: '他用水作比喻：\u201c上善若水，水善利万物而不争。\u201d', pinyin: 'Tā yòng shuǐ zuò bǐyù: "Shàng shàn ruò shuǐ, shuǐ shàn lì wànwù ér bù zhēng."', translationFr: 'Il prend l\'eau pour métaphore : « Le bien suprême est comme l\'eau : elle profite à tous les êtres sans entrer en conflit. »', translationEn: 'He uses water as metaphor: "The highest good is like water: it benefits all things without contending."' },
                { hanzi: '在一个崇尚竞争与速度的时代，这样的思想显得格外清凉。', pinyin: 'Zài yí ge chóngshàng jìngzhēng yǔ sùdù de shídài, zhèyàng de sīxiǎng xiǎnde géwài qīngliáng.', translationFr: 'À une époque qui valorise compétition et vitesse, une telle pensée se fait remarquablement apaisante.', translationEn: 'In an era that worships competition and speed, such thinking feels remarkably cooling.' },
                { hanzi: '他又说：\u201c知人者智，自知者明。\u201d', pinyin: 'Tā yòu shuō: "Zhī rén zhě zhì, zì zhī zhě míng."', translationFr: 'Il ajoute aussi : « Connaître autrui, c\'est être intelligent ; se connaître soi-même, c\'est être éclairé. »', translationEn: 'He also says: "To know others is intelligence; to know oneself is enlightenment."' },
                { hanzi: '这句话提醒我们：真正的修养，从认清自己开始。', pinyin: 'Zhè jù huà tíxǐng wǒmen: zhēnzhèng de xiūyǎng, cóng rènqīng zìjǐ kāishǐ.', translationFr: 'Cette phrase nous rappelle : la véritable culture de soi commence par se reconnaître clairement.', translationEn: 'This line reminds us: true self-cultivation begins with clearly recognising oneself.' },
                { hanzi: '当然，老子的智慧并非教我们逃避，而是教我们辨别\u201c该做什么\u201d与\u201c不必做什么\u201d。', pinyin: 'Dāngrán, Lǎozǐ de zhìhuì bìng fēi jiāo wǒmen táobì, ér shì jiāo wǒmen biànbié "gāi zuò shénme" yǔ "bú bì zuò shénme".', translationFr: 'La sagesse de Laozi ne nous enseigne pas la fuite, mais à distinguer « ce qu\'il faut faire » de « ce qu\'il n\'est pas nécessaire de faire ».', translationEn: 'Of course, Laozi\'s wisdom does not teach us to flee, but to distinguish what one should do from what one need not do.' },
                { hanzi: '两千多年后的今天，这种辨别力也许是最稀缺的能力之一。', pinyin: 'Liǎng qiān duō nián hòu de jīntiān, zhè zhǒng biànbié lì yěxǔ shì zuì xīquē de nénglì zhī yī.', translationFr: 'Vingt siècles plus tard, cette capacité de discernement est peut-être l\'une des plus rares.', translationEn: 'Over two millennia later, this capacity for discernment is perhaps one of the scarcest of all.' }
            ],
            vocab: ['道德经', '无为而治', '顺应', '比喻', '崇尚', '清凉', '自知', '修养', '辨别', '稀缺'],
            questions: [
                {
                    questionFr: 'Que signifie vraiment le « non-agir » (无为) selon l\'auteur ?',
                    questionEn: 'What does "non-action" really mean according to the author?',
                    answerFr: 'Ce n\'est pas la passivité mais l\'alignement avec le rythme naturel des choses.',
                    answerEn: 'Not passivity but aligning with the natural rhythm of things.'
                },
                {
                    questionFr: 'Quelle qualité Laozi juge-t-il plus élevée que la connaissance des autres ?',
                    questionEn: 'What quality does Laozi hold higher than knowing others?',
                    answerFr: 'La connaissance de soi (自知).',
                    answerEn: 'Self-knowledge (自知).'
                }
            ]
        }
    },
    // ============================================================
    //  C1.2 — Chine-France
    // ============================================================
    {
        cecrLevel: 'c1.2',
        theme: 'Relations internationales',
        themeEn: 'International relations',
        reading: {
            id: 'rd-c12-china-france',
            title: 'Paris–Pékin, soixante ans d\'amitié',
            titleEn: 'Paris–Beijing, sixty years of friendship',
            intro: 'Analyse rétrospective et prospective des liens diplomatiques, économiques et culturels entre Pékin et Paris depuis 1964.',
            introEn: 'A retrospective and forward-looking analysis of Beijing–Paris diplomatic, economic and cultural ties since 1964.',
            segments: [
                { hanzi: '1964年，戴高乐将军顶住压力，使法国成为第一个与新中国建立正式外交关系的西方大国。', pinyin: 'Yī jiǔ liù sì nián, Dài Gāolè jiāngjūn dǐng zhù yālì, shǐ Fǎguó chéngwéi dì yī gè yǔ xīn Zhōngguó jiànlì zhèngshì wàijiāo guānxi de xīfāng dàguó.', translationFr: 'En 1964, le général de Gaulle brava les pressions pour faire de la France la première grande puissance occidentale à établir des relations diplomatiques officielles avec la Chine nouvelle.', translationEn: 'In 1964, General de Gaulle withstood pressure to make France the first Western great power to establish formal diplomatic ties with the new China.' },
                { hanzi: '这一决定被称为\u201c跨越意识形态的握手\u201d，在当时的冷战格局下意义非凡。', pinyin: 'Zhè yī juédìng bèi chēngwéi "kuàyuè yìshí xíngtài de wòshǒu", zài dāngshí de Lěngzhàn géjú xià yìyì fēifán.', translationFr: 'Cette décision, qualifiée de « poignée de main par-dessus les idéologies », avait un poids considérable dans l\'échiquier de la guerre froide.', translationEn: 'This decision, dubbed "a handshake across ideologies", carried great weight within the Cold War chessboard.' },
                { hanzi: '六十年过去，两国的关系在波折中稳步发展，形成了多层次的合作结构。', pinyin: 'Liùshí nián guòqù, liǎng guó de guānxi zài bōzhé zhōng wěnbù fāzhǎn, xíngchéng le duō céngcì de hézuò jiégòu.', translationFr: 'Soixante ans plus tard, les relations bilatérales ont progressé avec régularité malgré les soubresauts, dessinant une architecture de coopération à plusieurs étages.', translationEn: 'Sixty years on, bilateral ties have progressed steadily through ups and downs, forming a multi-tiered structure of cooperation.' },
                { hanzi: '在经济领域，空中客车、核电和奢侈品仍是三大支柱。', pinyin: 'Zài jīngjì lǐngyù, Kōngzhōng Kèchē, hédiàn hé shēchǐpǐn réng shì sān dà zhīzhù.', translationFr: 'Sur le plan économique, Airbus, le nucléaire et le luxe demeurent les trois piliers.', translationEn: 'Economically, Airbus, nuclear power and luxury goods remain the three pillars.' },
                { hanzi: '文化上，双方共同庆祝\u201c中法文化年\u201d、\u201c中法旅游年\u201d，互相输出电影、音乐与文学。', pinyin: 'Wénhuà shàng, shuāngfāng gòngtóng qìngzhù "Zhōng-Fǎ Wénhuà Nián", "Zhōng-Fǎ Lǚyóu Nián", hùxiāng shūchū diànyǐng, yīnyuè yǔ wénxué.', translationFr: 'Sur le plan culturel, les deux pays célèbrent ensemble « l\'Année culturelle franco-chinoise » ou « l\'Année du tourisme », échangent films, musique et littérature.', translationEn: 'Culturally, both sides jointly celebrate "Sino-French Cultural Year" and "Tourism Year", exchanging films, music and literature.' },
                { hanzi: '然而，近年来围绕人权、贸易平衡与技术竞争的分歧也日益凸显。', pinyin: 'Rán\'ér, jìn nián lái wéirào rénquán, màoyì pínghéng yǔ jìshù jìngzhēng de fēnqí yě rìyì tūxiǎn.', translationFr: 'Toutefois, les divergences autour des droits humains, de l\'équilibre commercial et de la compétition technologique s\'accentuent ces dernières années.', translationEn: 'However, in recent years, disagreements over human rights, trade balance and technological competition have become increasingly prominent.' },
                { hanzi: '有学者指出，法国在欧盟内始终扮演\u201c平衡者\u201d的角色，既不完全倒向华盛顿，也不盲从北京。', pinyin: 'Yǒu xuézhě zhǐchū, Fǎguó zài Ōuméng nèi shǐzhōng bànyǎn "pínghéng zhě" de juésè, jì bù wánquán dǎo xiàng Huáshèngdùn, yě bù mángcóng Běijīng.', translationFr: 'Des chercheurs notent que la France joue toujours un rôle d\'« équilibriste » au sein de l\'UE, ne basculant ni totalement vers Washington ni aveuglément vers Pékin.', translationEn: 'Scholars note that within the EU, France consistently plays the role of "balancer", leaning neither fully toward Washington nor blindly toward Beijing.' },
                { hanzi: '未来六十年，这份独立外交传统能否延续，也将决定两国关系的质地。', pinyin: 'Wèilái liùshí nián, zhè fèn dúlì wàijiāo chuántǒng néng fǒu yánxù, yě jiāng juédìng liǎng guó guānxi de zhìdì.', translationFr: 'Dans les soixante prochaines années, la continuité de cette tradition d\'indépendance diplomatique déterminera largement la texture des relations bilatérales.', translationEn: 'Over the next sixty years, whether this independent diplomatic tradition can continue will largely determine the texture of the relationship.' }
            ],
            vocab: ['外交关系', '意识形态', '冷战', '波折', '支柱', '输出', '分歧', '凸显', '平衡者', '独立外交'],
            questions: [
                {
                    questionFr: 'Pourquoi la décision de 1964 fut-elle historique ?',
                    questionEn: 'Why was the 1964 decision historic?',
                    answerFr: 'La France est devenue la première grande puissance occidentale à reconnaître la Chine nouvelle.',
                    answerEn: 'France became the first Western great power to recognise the new China.'
                },
                {
                    questionFr: 'Quel rôle la France joue-t-elle au sein de l\'UE selon les chercheurs ?',
                    questionEn: 'What role does France play within the EU according to scholars?',
                    answerFr: 'Un rôle de « balancier » entre Washington et Pékin (平衡者).',
                    answerEn: 'A "balancer" role between Washington and Beijing (平衡者).'
                }
            ]
        }
    },
    // ============================================================
    //  C1.2 — L'éducation au XXIᵉ siècle
    // ============================================================
    {
        cecrLevel: 'c1.2',
        theme: 'Éducation',
        themeEn: 'Education',
        reading: {
            id: 'rd-c12-education-21c',
            title: 'L\'école de demain commence aujourd\'hui',
            titleEn: 'The school of tomorrow starts today',
            intro: 'Tribune réflexive sur les limites du système éducatif chinois face à la révolution numérique et à la crise de sens des jeunes générations.',
            introEn: 'A reflective op-ed on the limits of China\'s education system in the face of digital disruption and youth disillusionment.',
            segments: [
                { hanzi: '我们这一代的教育，几乎是围绕\u201c考试\u201d二字展开的。', pinyin: 'Wǒmen zhè yí dài de jiàoyù, jīhū shì wéirào "kǎoshì" èr zì zhǎnkāi de.', translationFr: 'L\'éducation de notre génération s\'est presque entièrement construite autour du mot « examen ».', translationEn: 'Our generation\'s education has been built almost entirely around the word "examination".' },
                { hanzi: '从小学到高中，孩子们被训练成解题机器，却很少被问起\u201c你相信什么\u201d。', pinyin: 'Cóng xiǎoxué dào gāozhōng, háizimen bèi xùnliàn chéng jiětí jīqì, què hěn shǎo bèi wèn qǐ "nǐ xiāngxìn shénme".', translationFr: 'De l\'école primaire au lycée, les enfants sont dressés à résoudre des problèmes, mais on leur demande rarement « en quoi crois-tu ? ».', translationEn: 'From primary to high school, children are trained as problem-solving machines, yet are rarely asked "what do you believe in?".' },
                { hanzi: '当人工智能已能完成大部分标准化任务时，这种培养方式显然难以为继。', pinyin: 'Dāng réngōng zhìnéng yǐ néng wánchéng dàbùfen biāozhǔnhuà rènwu shí, zhè zhǒng péiyǎng fāngshì xiǎnrán nányǐ wéijì.', translationFr: 'Alors que l\'intelligence artificielle accomplit déjà la plupart des tâches standardisées, ce mode d\'instruction paraît difficilement tenable.', translationEn: 'Now that artificial intelligence can already handle most standardised tasks, this mode of instruction seems hardly sustainable.' },
                { hanzi: '真正决定未来竞争力的，或许不再是记忆与速度，而是判断力与共情能力。', pinyin: 'Zhēnzhèng juédìng wèilái jìngzhēnglì de, huòxǔ bú zài shì jìyì yǔ sùdù, ér shì pànduànlì yǔ gòngqíng nénglì.', translationFr: 'Ce qui déterminera vraiment la compétitivité de demain, ce ne sera peut-être plus la mémoire ni la vitesse, mais le jugement et l\'empathie.', translationEn: 'What truly defines future competitiveness may no longer be memory or speed, but judgement and empathy.' },
                { hanzi: '可惜，这些能力很难用分数衡量，也就难以进入考试系统。', pinyin: 'Kěxī, zhèxiē nénglì hěn nán yòng fēnshù héngliáng, yě jiù nányǐ jìnrù kǎoshì xìtǒng.', translationFr: 'Hélas, ces capacités se mesurent mal en notes, et peinent donc à intégrer le système d\'évaluation.', translationEn: 'Unfortunately, these abilities are hard to grade, and thus hard to fit into the examination system.' },
                { hanzi: '与此同时，\u201c躺平\u201d和\u201c内卷\u201d两个词反复出现在年轻人的口中，折射出集体性的疲惫。', pinyin: 'Yǔ cǐ tóngshí, "tǎngpíng" hé "nèijuǎn" liǎng ge cí fǎnfù chūxiàn zài niánqīngrén de kǒu zhōng, zhéshè chū jítǐxìng de píbèi.', translationFr: 'En même temps, les mots « tangping » (rester couché) et « neijuan » (compétition stérile) reviennent sans cesse dans la bouche des jeunes, révélant une fatigue collective.', translationEn: 'Meanwhile, the words "tangping" (lying flat) and "neijuan" (involution) keep surfacing in young people\'s speech, revealing collective exhaustion.' },
                { hanzi: '改革若只是调整课程表，而不触及评价体系，便如同给失速的列车换一节车厢。', pinyin: 'Gǎigé ruò zhǐ shì tiáozhěng kèchéngbiǎo, ér bù chùjí píngjià tǐxì, biàn rútóng gěi shīsù de lièchē huàn yì jié chēxiāng.', translationFr: 'Une réforme qui se contente d\'ajuster les emplois du temps sans toucher au système d\'évaluation équivaut à changer un wagon d\'un train qui déraille.', translationEn: 'A reform that merely tweaks the timetable without touching the evaluation system is like swapping a carriage on a runaway train.' },
                { hanzi: '也许，真正的起点，是重新问一个古老的问题：教育究竟是为了什么？', pinyin: 'Yěxǔ, zhēnzhèng de qǐdiǎn, shì chóngxīn wèn yí ge gǔlǎo de wèntí: jiàoyù jiūjìng shì wèile shénme?', translationFr: 'Le véritable point de départ est peut-être de reposer une question ancienne : à quoi sert, au fond, l\'éducation ?', translationEn: 'Perhaps the real starting point is to ask an old question anew: what, ultimately, is education for?' }
            ],
            vocab: ['考试', '训练', '人工智能', '标准化', '判断力', '共情', '衡量', '躺平', '内卷', '评价体系'],
            questions: [
                {
                    questionFr: 'Pourquoi le modèle traditionnel semble-t-il obsolète à l\'auteur ?',
                    questionEn: 'Why does the author see the traditional model as outdated?',
                    answerFr: 'Parce que l\'IA peut désormais exécuter les tâches standardisées que l\'école évalue.',
                    answerEn: 'Because AI can now handle the standardised tasks school tests measure.'
                },
                {
                    questionFr: 'Quelles deux capacités humaines l\'auteur juge-t-il centrales pour l\'avenir ?',
                    questionEn: 'Which two human abilities does the author see as central for the future?',
                    answerFr: 'Le jugement (判断力) et l\'empathie (共情能力).',
                    answerEn: 'Judgement (判断力) and empathy (共情能力).'
                }
            ]
        }
    },
    // ============================================================
    //  C2.1 — Essai littéraire : le fleuve et le temps
    // ============================================================
    {
        cecrLevel: 'c2.1',
        theme: 'Essai littéraire',
        themeEn: 'Literary essay',
        reading: {
            id: 'rd-c21-river-and-time',
            title: 'Le fleuve et le temps',
            titleEn: 'The river and time',
            intro: 'Essai littéraire inspiré du topos classique 《逝者如斯》 (« ce qui s\'écoule est ainsi »), oscillant entre paysage et méditation.',
            introEn: 'A literary essay inspired by the classical topos "what passes is like this", moving between landscape and meditation.',
            segments: [
                { hanzi: '傍晚，我独自走到江边，看夕阳把水面烫成一片熔金。', pinyin: 'Bàngwǎn, wǒ dúzì zǒu dào jiāng biān, kàn xīyáng bǎ shuǐmiàn tàng chéng yí piàn róng jīn.', translationFr: 'Au crépuscule, je marchai seul jusqu\'au bord du fleuve, regardant le couchant fondre la surface de l\'eau en une nappe d\'or brûlant.', translationEn: 'At dusk, I walked alone to the riverbank and watched the setting sun scald the water into a sheet of molten gold.' },
                { hanzi: '水在脚下无声地滑过，仿佛带走的不只是时日，还有一些说不清的心事。', pinyin: 'Shuǐ zài jiǎo xià wú shēng de huá guò, fǎngfú dài zǒu de bù zhǐ shì shírì, hái yǒu yìxiē shuō bù qīng de xīnshì.', translationFr: 'L\'eau glissait sans bruit sous mes pieds, comme si elle emportait non seulement les jours, mais aussi quelques pensées qui ne se laissaient pas nommer.', translationEn: 'The water slid soundlessly under my feet, as if it carried off not only the days but also some thoughts that could not be named.' },
                { hanzi: '孔子立于川上，曾叹：\u201c逝者如斯夫，不舍昼夜。\u201d两千多年过去，这声叹息依旧新鲜。', pinyin: 'Kǒngzǐ lì yú chuān shàng, céng tàn: "Shìzhě rú sī fū, bù shě zhòuyè." Liǎng qiān duō nián guòqù, zhè shēng tànxí yījiù xīnxiān.', translationFr: 'Debout au-dessus de la rivière, Confucius soupira jadis : « Ce qui passe est ainsi ; il ne cesse ni jour ni nuit. » Deux millénaires plus tard, ce soupir reste neuf.', translationEn: 'Standing by the river, Confucius once sighed: "What passes is like this — ceasing neither day nor night." Two millennia on, the sigh remains fresh.' },
                { hanzi: '我忽然意识到，所谓\u201c怀旧\u201d，并非执意回到某个过去，而是承认某个过去确实曾经发生。', pinyin: 'Wǒ hūrán yìshí dào, suǒwèi "huáijiù", bìng fēi zhíyì huí dào mǒu gè guòqù, ér shì chéngrèn mǒu gè guòqù quèshí céngjīng fāshēng.', translationFr: 'Je pris soudain conscience que « la nostalgie » n\'était pas l\'obstination de revenir à un passé, mais l\'aveu qu\'un passé avait bien eu lieu.', translationEn: 'It suddenly struck me that "nostalgia" is not the stubborn wish to return to some past, but the acknowledgment that some past truly did happen.' },
                { hanzi: '黑夜降临得比想象更快，江对岸的灯火一盏接一盏亮起，像从远处伸来的问候。', pinyin: 'Hēiyè jiànglín de bǐ xiǎngxiàng gèng kuài, jiāng duì\'àn de dēnghuǒ yì zhǎn jiē yì zhǎn liàng qǐ, xiàng cóng yuǎn chù shēn lái de wènhòu.', translationFr: 'La nuit tomba plus vite que je ne l\'imaginais ; sur l\'autre rive, les lumières s\'allumaient une à une, comme des salutations venues de loin.', translationEn: 'Night came faster than expected; across the river, lights flicked on one by one, like greetings reaching from afar.' },
                { hanzi: '我想，或许时间并非敌人，它只是一位沉默的教师，教我们放下那些本就留不住的。', pinyin: 'Wǒ xiǎng, huòxǔ shíjiān bìng fēi dírén, tā zhǐ shì yí wèi chénmò de jiàoshī, jiāo wǒmen fàngxià nàxiē běn jiù liú bù zhù de.', translationFr: 'Je me dis que le temps n\'est peut-être pas un ennemi, mais un maître silencieux qui nous enseigne à lâcher ce qu\'on ne pouvait de toute façon retenir.', translationEn: 'Perhaps time, I thought, is no enemy but a silent teacher, teaching us to let go of what could not be kept anyway.' },
                { hanzi: '江水依旧前行，不回头，不解释，也不等人。', pinyin: 'Jiāng shuǐ yījiù qiánxíng, bù huítóu, bù jiěshì, yě bù děng rén.', translationFr: 'L\'eau continuait sa course : pas de regard en arrière, pas d\'explication, et pas d\'attente.', translationEn: 'The river flowed on: no looking back, no explaining, and no waiting.' },
                { hanzi: '而我也终于明白，真正值得带走的，不是时间，而是穿越时间之后，仍然愿意保留的那份清澈。', pinyin: 'Ér wǒ yě zhōngyú míngbai, zhēnzhèng zhídé dài zǒu de, bú shì shíjiān, ér shì chuānyuè shíjiān zhīhòu, réngrán yuànyì bǎoliú de nà fèn qīngchè.', translationFr: 'Je compris enfin : ce qu\'on peut vraiment emporter, ce n\'est pas le temps, mais la clarté qu\'on consent encore à garder, après l\'avoir traversé.', translationEn: 'I finally understood: what is truly worth taking away is not time, but the clarity one still chooses to keep after passing through it.' }
            ],
            vocab: ['夕阳', '熔金', '逝者', '不舍昼夜', '怀旧', '执意', '问候', '沉默', '放下', '清澈'],
            questions: [
                {
                    questionFr: 'Quelle citation classique est mobilisée au cœur du texte ?',
                    questionEn: 'Which classical quote is invoked in the heart of the text?',
                    answerFr: '« Ce qui s\'écoule est ainsi ; il ne cesse ni jour ni nuit » (逝者如斯夫，不舍昼夜) de Confucius.',
                    answerEn: 'Confucius\'s "What passes is like this — ceasing neither day nor night" (逝者如斯夫，不舍昼夜).'
                },
                {
                    questionFr: 'Quelle définition de la nostalgie l\'auteur propose-t-il ?',
                    questionEn: 'What definition of nostalgia does the author propose?',
                    answerFr: 'Non un retour obstiné au passé, mais la reconnaissance qu\'un passé a existé.',
                    answerEn: 'Not a stubborn return to the past, but acknowledgment that some past truly happened.'
                }
            ]
        }
    },
    // ============================================================
    //  C2.2 — Extrait littéraire : le village natal
    // ============================================================
    {
        cecrLevel: 'c2.2',
        theme: 'Littérature contemporaine',
        themeEn: 'Contemporary literature',
        reading: {
            id: 'rd-c22-hometown',
            title: 'L\'odeur du village natal',
            titleEn: 'The scent of home',
            intro: 'Nouvelle courte à la manière de la littérature des « racines » : un homme rentre au village après trente ans d\'absence et mesure ce que le temps a délogé.',
            introEn: 'A short story in the "roots" literature style: a man returns to his village after thirty years and measures what time has uprooted.',
            segments: [
                { hanzi: '三十年不回来，村口那棵老槐树已经苍老得几乎认不出来。', pinyin: 'Sānshí nián bù huílái, cūnkǒu nà kē lǎo huáishù yǐjīng cānglǎo de jīhū rèn bù chū lái.', translationFr: 'Trente ans sans y revenir : le vieux sophora à l\'entrée du village avait vieilli au point de devenir presque méconnaissable.', translationEn: 'Thirty years away, and the old pagoda tree at the village entrance had aged until it was almost unrecognisable.' },
                { hanzi: '树皮皲裂，像一本被翻得太多次的书，每一道缝里都藏着谁也读不完的岁月。', pinyin: 'Shùpí jūnliè, xiàng yì běn bèi fān de tài duō cì de shū, měi yí dào fèng lǐ dōu cáng zhe shuí yě dú bù wán de suìyuè.', translationFr: 'L\'écorce, crevassée comme un livre trop feuilleté, cachait dans chacune de ses fissures des années que personne n\'aurait su lire jusqu\'au bout.', translationEn: 'Its bark cracked like a book paged through too many times, each crevice holding years no one could finish reading.' },
                { hanzi: '田野依旧是田野，却少了牛的哞叫，多了无人机嗡嗡的回声。', pinyin: 'Tiányě yījiù shì tiányě, què shǎo le niú de mōujiào, duō le wúrénjī wēngwēng de huíshēng.', translationFr: 'Les champs étaient toujours des champs, mais le meuglement des bœufs s\'en était retiré, remplacé par le bourdonnement des drones.', translationEn: 'The fields were still fields, yet the lowing of cattle had gone, replaced by the humming echo of drones.' },
                { hanzi: '我推开那扇吱呀作响的院门，看见母亲留下的织机还靠在墙角，线头早被蛛丝取代。', pinyin: 'Wǒ tuī kāi nà shàn zhīyā zuò xiǎng de yuànmén, kànjiàn mǔqīn liú xià de zhījī hái kào zài qiángjiǎo, xiàntóu zǎo bèi zhūsī qǔdài.', translationFr: 'Je poussai la porte grinçante de la cour et vis, dans l\'angle du mur, le métier à tisser laissé par ma mère : les fils avaient depuis longtemps cédé la place à des toiles d\'araignée.', translationEn: 'I pushed open the creaking courtyard gate and saw my mother\'s loom still leaning against the wall, its threads long since replaced by spider silk.' },
                { hanzi: '邻居王叔颤巍巍地走来，一把抓住我的手，半天说不出一句完整的话。', pinyin: 'Línjū Wáng shū chànwēiwēi de zǒu lái, yì bǎ zhuā zhù wǒ de shǒu, bàntiān shuō bù chū yí jù wánzhěng de huà.', translationFr: 'Oncle Wang, mon voisin, s\'approcha d\'un pas tremblant, m\'empoigna la main et resta longtemps sans pouvoir prononcer une phrase entière.', translationEn: 'Uncle Wang, my neighbour, tottered over, seized my hand, and for a long while could not get out a single whole sentence.' },
                { hanzi: '我忽然觉得，所谓\u201c故乡\u201d，并非一个地理上的坐标，而是一群仍然愿意记得你名字的人。', pinyin: 'Wǒ hūrán juéde, suǒwèi "gùxiāng", bìng fēi yí gè dìlǐ shàng de zuòbiāo, ér shì yì qún réngrán yuànyì jìde nǐ míngzi de rén.', translationFr: 'Je sentis soudain que « le pays natal » n\'était pas une coordonnée géographique, mais un groupe de gens qui consentent encore à se souvenir de ton prénom.', translationEn: 'It suddenly came to me that "homeland" is not a geographic coordinate, but a cluster of people still willing to remember your name.' },
                { hanzi: '他们一个接一个离去，故乡也就在世界上一寸寸地缩小。', pinyin: 'Tāmen yí gè jiē yí gè líqù, gùxiāng yě jiù zài shìjiè shàng yí cùn cùn de suōxiǎo.', translationFr: 'L\'un après l\'autre ils s\'en vont, et le pays natal rétrécit dans le monde, pouce à pouce.', translationEn: 'One by one they depart, and the homeland shrinks in the world, inch by inch.' },
                { hanzi: '临走前，我在老槐树下站了很久，像在等一个永远不会回答的问题。', pinyin: 'Lín zǒu qián, wǒ zài lǎo huáishù xià zhàn le hěn jiǔ, xiàng zài děng yí gè yǒngyuǎn bú huì huídá de wèntí.', translationFr: 'Avant de partir, je restai longtemps sous le vieux sophora, comme à attendre une question qui ne recevrait jamais de réponse.', translationEn: 'Before leaving, I stood under the old pagoda tree for a long time, as if waiting for a question that would never be answered.' },
                { hanzi: '风吹过，叶子沙沙作响，那声音是它唯一还愿意说的方言。', pinyin: 'Fēng chuī guò, yèzi shāshā zuòxiǎng, nà shēngyīn shì tā wéiyī hái yuànyì shuō de fāngyán.', translationFr: 'Le vent passa, les feuilles bruissèrent, et ce bruit était le seul dialecte qu\'il consentît encore à parler.', translationEn: 'The wind blew through, the leaves rustled, and that sound was the only dialect the tree still agreed to speak.' }
            ],
            vocab: ['老槐树', '苍老', '皲裂', '岁月', '无人机', '织机', '颤巍巍', '故乡', '缩小', '方言'],
            questions: [
                {
                    questionFr: 'Comment l\'auteur redéfinit-il la notion de « pays natal » ?',
                    questionEn: 'How does the author redefine "homeland"?',
                    answerFr: 'Non comme un lieu géographique, mais comme les personnes qui se souviennent de votre prénom.',
                    answerEn: 'Not as a place, but as the people who still remember your name.'
                },
                {
                    questionFr: 'Quel détail sonore marque la transformation du village ?',
                    questionEn: 'What auditory detail marks the village\'s transformation?',
                    answerFr: 'Le meuglement des bœufs a disparu, remplacé par le bourdonnement des drones.',
                    answerEn: 'The lowing of cattle is gone, replaced by the hum of drones.'
                }
            ]
        }
    }
];
