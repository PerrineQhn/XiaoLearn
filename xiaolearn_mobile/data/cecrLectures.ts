/**
 * cecrLectures.ts — Passages de lecture par niveau CECR
 * 2 passages par niveau, questions de compréhension MCQ.
 */

import type { CecrLevelSlug } from './cecrBilans';

export interface LectureQuestion {
  id: string;
  promptFr: string;
  promptEn?: string;
  choices: string[];
  choicesEn?: string[];
  correctIndex: number;
  explanationFr: string;
  explanationEn?: string;
}

export interface Lecture {
  id: string;
  level: CecrLevelSlug;
  titleFr: string;
  titleEn?: string;
  titleZh: string;
  theme: string;
  themeEn?: string;
  emoji: string;
  estimatedMinutes: number;
  text: string;           // Caractères chinois avec pinyin intercalé
  translationFr: string;
  translationEn?: string;
  questions: LectureQuestion[];
}

// ─── Helper ───────────────────────────────────────────────────────────────────
const lq = (
  id: string, prompt: string, choices: string[], correct: number, expl: string
): LectureQuestion => ({ id, promptFr: prompt, choices, correctIndex: correct, explanationFr: expl });

// ============================================================================
//  A1
// ============================================================================
const a1_1: Lecture = {
  id: 'a1-famille',
  level: 'a1',
  titleFr: 'Ma famille',
  titleZh: '我的家',
  theme: 'famille',
  emoji: '👨‍👩‍👧',
  estimatedMinutes: 2,
  text: `我叫小明。(Wǒ jiào Xiǎomíng.)
我有一个爸爸和一个妈妈。(Wǒ yǒu yī gè bàba hé yī gè māma.)
我还有一个哥哥。(Wǒ hái yǒu yī gè gēge.)
我们住在北京。(Wǒmen zhù zài Běijīng.)
我家有五口人。(Wǒ jiā yǒu wǔ kǒu rén.)
爷爷和奶奶也住在我们家。(Yéye hé nǎinai yě zhù zài wǒmen jiā.)`,
  translationFr: `Je m'appelle Xiaoming.
J'ai un papa et une maman.
J'ai aussi un grand frère.
Nous habitons à Pékin.
Ma famille compte cinq personnes.
Grand-père et grand-mère habitent aussi chez nous.`,
  questions: [
    lq('a1f-q1', 'Comment s\'appelle le narrateur ?', ['Xiǎohóng', 'Xiǎomíng', 'Xiǎolì', 'Xiǎowáng'], 1, '我叫小明 = je m\'appelle Xiaoming.'),
    lq('a1f-q2', 'Combien de personnes compte la famille ?', ['3', '4', '5', '6'], 2, '我家有五口人 = ma famille compte cinq personnes (五 = 5).'),
    lq('a1f-q3', 'Où habite la famille ?', ['Shanghai', 'Guangzhou', 'Pékin', 'Chengdu'], 2, '我们住在北京 = nous habitons à Pékin.'),
    lq('a1f-q4', 'Quel lien de parenté est mentionné en dernier ?', ['Papa et maman', 'Grand-frère', 'Grand-père et grand-mère', 'Petite sœur'], 2, 'La dernière phrase mentionne 爷爷和奶奶 (grand-père et grand-mère paternels).'),
  ],
};

const a1_2: Lecture = {
  id: 'a1-ecole',
  level: 'a1',
  titleFr: 'À l\'école',
  titleZh: '在学校',
  theme: 'vie quotidienne',
  emoji: '🏫',
  estimatedMinutes: 2,
  text: `今天是星期一。(Jīntiān shì xīngqīyī.)
我去学校上课。(Wǒ qù xuéxiào shàngkè.)
我的老师叫王老师。(Wǒ de lǎoshī jiào Wáng lǎoshī.)
我有三本书。(Wǒ yǒu sān běn shū.)
下午三点我回家。(Xiàwǔ sān diǎn wǒ huí jiā.)
我很喜欢学校。(Wǒ hěn xǐhuān xuéxiào.)`,
  translationFr: `Aujourd'hui c'est lundi.
Je vais à l'école pour suivre des cours.
Mon professeur s'appelle le professeur Wang.
J'ai trois livres.
À 15h, je rentre chez moi.
J'aime beaucoup l'école.`,
  questions: [
    lq('a1e-q1', 'Quel jour est-ce ?', ['Mardi', 'Mercredi', 'Lundi', 'Jeudi'], 2, '今天是星期一 = aujourd\'hui c\'est lundi (星期一).'),
    lq('a1e-q2', 'Combien de livres a le narrateur ?', ['1', '2', '3', '4'], 2, '我有三本书 = j\'ai trois livres (三 = 3).'),
    lq('a1e-q3', 'À quelle heure rentre-t-il ?', ['14h', '15h', '16h', '17h'], 1, '下午三点 = 15h (trois heures de l\'après-midi).'),
    lq('a1e-q4', 'Quel est le sentiment du narrateur envers l\'école ?', ['Il la déteste', 'Il l\'aime beaucoup', 'Il est indifférent', 'Il a peur'], 1, '我很喜欢学校 = j\'aime beaucoup l\'école.'),
  ],
};

// ============================================================================
//  A2
// ============================================================================
const a2_1: Lecture = {
  id: 'a2-weekend',
  level: 'a2',
  titleFr: 'Mon week-end',
  titleZh: '我的周末',
  theme: 'loisirs',
  emoji: '🎮',
  estimatedMinutes: 3,
  text: `上个周末，我和朋友一起去了公园。(Shàng gè zhōumò, wǒ hé péngyou yīqǐ qù le gōngyuán.)
天气很好，阳光灿烂。(Tiānqì hěn hǎo, yángguāng cànlàn.)
我们打了篮球，还吃了冰淇淋。(Wǒmen dǎ le lánqiú, hái chī le bīngqílín.)
下午，我们去咖啡店喝了咖啡。(Xiàwǔ, wǒmen qù kāfēidiàn hē le kāfēi.)
我们聊了很多，很开心。(Wǒmen liáo le hěn duō, hěn kāixīn.)
晚上我八点回家，非常累，但是很高兴。(Wǎnshang wǒ bā diǎn huí jiā, fēicháng lèi, dànshì hěn gāoxìng.)`,
  translationFr: `Le week-end dernier, mon ami et moi sommes allés au parc ensemble.
Le temps était beau, le soleil brillait.
Nous avons joué au basket et mangé des glaces.
L'après-midi, nous sommes allés dans un café boire un café.
Nous avons beaucoup discuté et nous étions très heureux.
Le soir je suis rentré à 20h, très fatigué mais très content.`,
  questions: [
    lq('a2w-q1', 'Où sont allés le narrateur et son ami ?', ['Au cinéma', 'Au restaurant', 'Au parc', 'À la bibliothèque'], 2, '我和朋友一起去了公园 = nous sommes allés au parc.'),
    lq('a2w-q2', 'Quel sport ont-ils pratiqué ?', ['Foot', 'Tennis', 'Natation', 'Basket'], 3, '打了篮球 = ont joué au basket. 打 + 篮球.'),
    lq('a2w-q3', 'À quelle heure le narrateur est-il rentré ?', ['17h', '19h', '20h', '22h'], 2, '晚上八点 = 20h (huit heures du soir).'),
    lq('a2w-q4', 'Comment était le narrateur en rentrant ?', ['Triste et reposé', 'Fatigué mais content', 'Fatigué et triste', 'Énergique et heureux'], 1, '非常累，但是很高兴 = très fatigué, mais très content.'),
  ],
};

const a2_2: Lecture = {
  id: 'a2-marche',
  level: 'a2',
  titleFr: 'Au marché',
  titleZh: '在市场',
  theme: 'quotidien',
  emoji: '🛒',
  estimatedMinutes: 3,
  text: `今天妈妈带我去市场买东西。(Jīntiān māma dài wǒ qù shìchǎng mǎi dōngxi.)
市场里有很多新鲜的水果和蔬菜。(Shìchǎng lǐ yǒu hěn duō xīnxiān de shuǐguǒ hé shūcài.)
我们买了苹果、香蕉和西红柿。(Wǒmen mǎi le píngguǒ、xiāngjiāo hé xīhóngshì.)
苹果五块钱一斤，香蕉三块钱一斤。(Píngguǒ wǔ kuài qián yī jīn, xiāngjiāo sān kuài qián yī jīn.)
妈妈觉得价格不贵。(Māma juéde jiàgé bù guì.)
我们还买了一条鱼，准备晚上吃。(Wǒmen hái mǎi le yī tiáo yú, zhǔnbèi wǎnshang chī.)`,
  translationFr: `Aujourd'hui maman m'a emmené au marché faire des courses.
Il y avait beaucoup de fruits et légumes frais au marché.
Nous avons acheté des pommes, des bananes et des tomates.
Les pommes coûtent 5 yuans la livre, les bananes 3 yuans la livre.
Maman trouvait que le prix n'était pas cher.
Nous avons aussi acheté un poisson, prévu pour le dîner.`,
  questions: [
    lq('a2m-q1', 'Qui a emmené le narrateur au marché ?', ['Papa', 'Grand-mère', 'Maman', 'Un ami'], 2, '妈妈带我去市场 = maman m\'a emmené au marché.'),
    lq('a2m-q2', 'Combien coûtent les bananes la livre ?', ['2 yuans', '3 yuans', '5 yuans', '8 yuans'], 1, '香蕉三块钱一斤 = les bananes coûtent 3 yuans la livre.'),
    lq('a2m-q3', 'Quel animal est acheté ?', ['Poulet', 'Crabe', 'Crevettes', 'Poisson'], 3, '买了一条鱼 = ont acheté un poisson. 条 est le classificateur pour les poissons.'),
    lq('a2m-q4', 'Que pense maman des prix ?', ['Trop chers', 'Pas chers', 'Normaux', 'Elle ne sait pas'], 1, '妈妈觉得价格不贵 = maman trouve que les prix ne sont pas chers.'),
  ],
};

// ============================================================================
//  B1.1
// ============================================================================
const b11_1: Lecture = {
  id: 'b11-voyage',
  level: 'b1.1',
  titleFr: 'Un voyage à Shanghai',
  titleZh: '去上海旅游',
  theme: 'voyage',
  emoji: '✈️',
  estimatedMinutes: 4,
  text: `去年暑假，我和家人一起去上海旅游了。(Qùnián shǔjià, wǒ hé jiārén yīqǐ qù Shànghǎi lǚyóu le.)
我们坐高铁去的，大概两个小时就到了。(Wǒmen zuò gāotiě qù de, dàgài liǎng gè xiǎoshí jiù dào le.)
上海是一座非常现代化的城市，到处都是高楼大厦。(Shànghǎi shì yī zuò fēicháng xiàndàihuà de chéngshì, dàochù dōu shì gāolóu dàshà.)
我们参观了外滩，还去了豫园。(Wǒmen cānguān le Wàitān, hái qù le Yùyuán.)
外滩的夜景非常漂亮，让我印象深刻。(Wàitān de yèjǐng fēicháng piàoliang, ràng wǒ yìnxiàng shēnkè.)
我们在上海待了三天，吃了很多好吃的东西，比如小笼包。(Wǒmen zài Shànghǎi dāi le sān tiān, chī le hěn duō hào chī de dōngxi, bǐrú xiǎolóngbāo.)`,
  translationFr: `L'été dernier, ma famille et moi avons voyagé à Shanghai.
Nous y sommes allés en TGV, environ deux heures de trajet.
Shanghai est une ville très moderne, avec des gratte-ciels partout.
Nous avons visité le Bund et le jardin Yu.
Le panorama nocturne du Bund est magnifique, ça m'a beaucoup impressionné.
Nous avons passé trois jours à Shanghai et mangé beaucoup de bonnes choses, comme les xiaolongbao.`,
  questions: [
    lq('b11v-q1', 'Comment ont-ils voyagé à Shanghai ?', ['En avion', 'En bus', 'En TGV', 'En voiture'], 2, '坐高铁去的 = y sont allés en TGV (高铁).'),
    lq('b11v-q2', 'Combien de temps dure le trajet ?', ['1 heure', '2 heures', '3 heures', '4 heures'], 1, '大概两个小时就到了 = environ deux heures pour arriver.'),
    lq('b11v-q3', 'Qu\'est-ce qui a particulièrement impressionné le narrateur ?', ['Les gratte-ciels', 'Le jardin Yu', 'Le panorama nocturne du Bund', 'Les xiaolongbao'], 2, '外滩的夜景...让我印象深刻 = le panorama nocturne du Bund m\'a beaucoup impressionné.'),
    lq('b11v-q4', 'Combien de jours ont-ils passé à Shanghai ?', ['2', '3', '4', '5'], 1, '在上海待了三天 = ont passé trois jours à Shanghai.'),
    lq('b11v-q5', 'Quelle spécialité culinaire est mentionnée ?', ['Raviolis frits', 'Xiaolongbao', 'Canard laqué', 'Raviolis au wonton'], 1, '小笼包 = xiaolongbao, célèbres raviolis vapeur de Shanghai.'),
  ],
};

const b11_2: Lecture = {
  id: 'b11-habitudes',
  level: 'b1.1',
  titleFr: 'Habitudes alimentaires',
  titleZh: '饮食习惯',
  theme: 'culture',
  emoji: '🍜',
  estimatedMinutes: 4,
  text: `中国人非常重视饮食，有句话叫"民以食为天"。(Zhōngguó rén fēicháng zhòngshì yǐnshí, yǒu jù huà jiào "mín yǐ shí wéi tiān".)
中国不同地区的饮食习惯差别很大。(Zhōngguó bùtóng dìqū de yǐnshí xíguàn chābié hěn dà.)
比如，南方人喜欢吃米饭，北方人更喜欢吃面食。(Bǐrú, nánfāng rén xǐhuān chī mǐfàn, běifāng rén gèng xǐhuān chī miànshí.)
四川菜非常辣，广东菜比较清淡。(Sìchuān cài fēicháng là, Guǎngdōng cài bǐjiào qīngdàn.)
中国人吃饭时喜欢用筷子，这是几千年的传统。(Zhōngguó rén chīfàn shí xǐhuān yòng kuàizi, zhè shì jǐ qiān nián de chuántǒng.)
现在，越来越多的年轻人也喜欢吃西餐。(Xiànzài, yuèláiyuè duō de niánqīng rén yě xǐhuān chī xīcān.)`,
  translationFr: `Les Chinois accordent une grande importance à la nourriture ; il existe un dicton : « la nourriture est le ciel du peuple ».
Les habitudes alimentaires varient beaucoup selon les régions de Chine.
Par exemple, les gens du Sud aiment le riz, tandis que ceux du Nord préfèrent les pâtes.
La cuisine du Sichuan est très épicée, la cuisine cantonaise est plutôt légère.
Les Chinois aiment manger avec des baguettes, une tradition vieille de plusieurs millénaires.
Aujourd'hui, de plus en plus de jeunes apprécient aussi la cuisine occidentale.`,
  questions: [
    lq('b11h-q1', 'Que signifie l\'expression « 民以食为天 » ?', ['Cuisiner chaque jour', 'La nourriture est primordiale pour le peuple', 'Partager la nourriture', 'Le ciel nourrit le peuple'], 1, '民以食为天 = « le peuple prend la nourriture comme son ciel » → la nourriture est essentielle.'),
    lq('b11h-q2', 'Quelle préférence alimentaire distingue le Nord du Sud ?', ['Nord : riz / Sud : pâtes', 'Nord : pâtes / Sud : riz', 'Nord : épicé / Sud : sucré', 'Nord : viande / Sud : légumes'], 1, '南方人喜欢吃米饭，北方人更喜欢吃面食 = Sud : riz, Nord : pâtes.'),
    lq('b11h-q3', 'Comment est décrite la cuisine cantonaise ?', ['Très épicée', 'Très sucrée', 'Plutôt légère', 'Très grasse'], 2, '广东菜比较清淡 = la cuisine cantonaise est plutôt légère.'),
    lq('b11h-q4', 'Quelle tendance est observée chez les jeunes ?', ['Ils mangent moins', 'Ils préfèrent la cuisine du Sichuan', 'Ils apprécient aussi la cuisine occidentale', 'Ils abandonnent les baguettes'], 2, '越来越多的年轻人也喜欢吃西餐 = de plus en plus de jeunes aiment la cuisine occidentale.'),
  ],
};

// ============================================================================
//  B1.2
// ============================================================================
const b12_1: Lecture = {
  id: 'b12-environnement',
  level: 'b1.2',
  titleFr: 'Protéger l\'environnement',
  titleZh: '保护环境',
  theme: 'environnement',
  emoji: '🌿',
  estimatedMinutes: 4,
  text: `保护环境是我们每个人的责任。(Bǎohù huánjìng shì wǒmen měi gè rén de zérèn.)
近年来，由于工业发展，空气污染越来越严重。(Jìn nián lái, yóuyú gōngyè fāzhǎn, kōngqì wūrǎn yuèláiyuè yánzhòng.)
很多城市的居民不得不戴口罩出门。(Hěn duō chéngshì de jūmín bùdébù dài kǒuzhào chūmén.)
为了解决这个问题，政府出台了一系列政策。(Wèile jiějué zhège wèntí, zhèngfǔ chūtái le yī xìliè zhèngcè.)
比如，限制汽车数量，大力发展公共交通。(Bǐrú, xiànzhì qìchē shùliàng, dàlì fāzhǎn gōnggòng jiāotōng.)
作为普通市民，我们也可以少开车，多骑自行车，为环保出一份力。(Zuòwéi pǔtōng shìmín, wǒmen yě kěyǐ shǎo kāi chē, duō qí zìxíngchē, wèi huánbǎo chū yī fèn lì.)`,
  translationFr: `Protéger l'environnement est la responsabilité de chacun d'entre nous.
Ces dernières années, en raison du développement industriel, la pollution de l'air est devenue de plus en plus grave.
De nombreux habitants des villes doivent porter un masque pour sortir.
Pour résoudre ce problème, le gouvernement a mis en place une série de politiques.
Par exemple, limiter le nombre de voitures et développer activement les transports en commun.
En tant que citoyens ordinaires, nous pouvons aussi prendre moins la voiture, faire plus de vélo et contribuer à l'écologie.`,
  questions: [
    lq('b12e-q1', 'Quelle est la cause principale de la pollution de l\'air mentionnée ?', ['Le tourisme', 'Le développement industriel', 'Les feux de forêt', 'L\'agriculture'], 1, '由于工业发展，空气污染越来越严重 = en raison du développement industriel.'),
    lq('b12e-q2', 'Que sont obligés de faire beaucoup d\'habitants ?', ['Partir à la campagne', 'Porter un masque', 'Arrêter de travailler', 'Acheter un filtre à air'], 1, '不得不戴口罩出门 = obligés de porter un masque pour sortir.'),
    lq('b12e-q3', 'Quelle mesure gouvernementale est citée ?', ['Fermer les usines', 'Planter des arbres', 'Limiter le nombre de voitures', 'Taxer les pollueurs'], 2, '限制汽车数量 = limiter le nombre de voitures.'),
    lq('b12e-q4', 'Que peut faire chaque citoyen selon le texte ?', ['Manifester', 'Prendre moins la voiture et faire plus de vélo', 'Payer des impôts écologiques', 'Déménager à la campagne'], 1, '少开车，多骑自行车，为环保出一份力 = conduire moins, faire plus de vélo.'),
  ],
};

const b12_2: Lecture = {
  id: 'b12-reseaux',
  level: 'b1.2',
  titleFr: 'Les réseaux sociaux',
  titleZh: '社交媒体',
  theme: 'technologie',
  emoji: '📱',
  estimatedMinutes: 4,
  text: `如今，社交媒体已经成为人们生活中不可缺少的一部分。(Rújīn, shèjiāo méitǐ yǐjīng chéngwéi rénmen shēnghuó zhōng bùkě quēshǎo de yī bùfen.)
在中国，微信和微博是最受欢迎的社交平台。(Zài Zhōngguó, Wēixìn hé Wēibó shì zuì shòu huānyíng de shèjiāo píngtái.)
通过这些平台，人们可以随时随地与朋友保持联系。(Tōngguò zhèxiē píngtái, rénmen kěyǐ suíshí suídì yǔ péngyou bǎochí liánxì.)
然而，过度使用社交媒体也会带来一些问题。(Rán'ér, guòdù shǐyòng shèjiāo méitǐ yě huì dàilái yīxiē wèntí.)
比如，有些人花太多时间刷手机，影响工作和睡眠。(Bǐrú, yǒuxiē rén huā tài duō shíjiān shuā shǒujī, yǐngxiǎng gōngzuò hé shuìmián.)
因此，学会合理使用社交媒体非常重要。(Yīncǐ, xuéhuì hélǐ shǐyòng shèjiāo méitǐ fēicháng zhòngyào.)`,
  translationFr: `Aujourd'hui, les réseaux sociaux sont devenus une partie indispensable de la vie des gens.
En Chine, WeChat et Weibo sont les plateformes sociales les plus populaires.
Grâce à ces plateformes, les gens peuvent rester en contact avec leurs amis n'importe quand et n'importe où.
Cependant, une utilisation excessive des réseaux sociaux peut aussi engendrer des problèmes.
Par exemple, certaines personnes passent trop de temps à scroller sur leur téléphone, ce qui affecte leur travail et leur sommeil.
C'est pourquoi il est très important d'apprendre à utiliser les réseaux sociaux de façon raisonnable.`,
  questions: [
    lq('b12r-q1', 'Quelles sont les deux plateformes chinoises mentionnées ?', ['TikTok et Baidu', 'WeChat et Weibo', 'Alibaba et Taobao', 'Douyin et Bilibili'], 1, '微信 (WeChat) 和微博 (Weibo) sont les plateformes citées.'),
    lq('b12r-q2', 'Quel avantage principal des réseaux sociaux est cité ?', ['Gagner de l\'argent', 'Rester en contact à tout moment', 'Apprendre des langues', 'Trouver un emploi'], 1, '随时随地与朋友保持联系 = rester en contact partout et à tout moment.'),
    lq('b12r-q3', 'Quel problème est mentionné ?', ['Piratage informatique', 'Dépenser trop d\'argent', 'Trop de temps sur le téléphone, nuisant au sommeil', 'Informations fausses'], 2, '花太多时间刷手机，影响工作和睡眠 = trop de temps sur le téléphone, affectant travail et sommeil.'),
    lq('b12r-q4', 'Quelle est la conclusion du texte ?', ['Arrêter d\'utiliser les réseaux', 'Les réseaux sont dangereux', 'Apprendre à utiliser les réseaux de façon raisonnable', 'Préférer le contact direct'], 2, '学会合理使用社交媒体非常重要 = il est important d\'apprendre à les utiliser raisonnablement.'),
  ],
};

// ============================================================================
//  B2.1
// ============================================================================
const b21_1: Lecture = {
  id: 'b21-education',
  level: 'b2.1',
  titleFr: 'L\'éducation en Chine',
  titleZh: '中国的教育',
  theme: 'société',
  emoji: '📚',
  estimatedMinutes: 5,
  text: `中国的教育体制以严格著称，竞争十分激烈。(Zhōngguó de jiàoyù tǐzhì yǐ yángé zhùchēng, jìngzhēng shífēn jīliè.)
高考，即全国统一高等学校招生考试，被认为是决定学生命运的关键一战。(Gāokǎo, jí quánguó tǒngyī gāoděng xuéxiào zhāoshēng kǎoshì, bèi rènwéi shì juédìng xuéshēng mìngyùn de guānjiàn yī zhàn.)
每年有超过一千万的学生参加高考，竞争极为激烈。(Měi nián yǒu chāoguò yīqiān wàn de xuéshēng cānjiā gāokǎo, jìngzhēng jí wéi jīliè.)
近年来，"内卷"这个词越来越流行，反映了学生们面临的巨大压力。(Jìn nián lái, "nèijuǎn" zhège cí yuèláiyuè liúxíng, fǎnyìng le xuéshēngmen miànlín de jùdà yālì.)
不少专家呼吁改革教育体制，减轻学生负担，注重创新能力的培养。(Bùshǎo zhuānjiā hūyù gǎigé jiàoyù tǐzhì, jiǎnqīng xuéshēng fùdān, zhùzhòng chuàngxīn nénglì de péiyǎng.)
如何在保证教育质量的同时，给学生更多自由发展的空间，是当前中国教育面临的重要课题。(Rúhé zài bǎozhèng jiàoyù zhìliàng de tóngshí, gěi xuéshēng gèng duō zìyóu fāzhǎn de kōngjiān, shì dāngqián Zhōngguó jiàoyù miànlín de zhòngyào kètí.)`,
  translationFr: `Le système éducatif chinois est réputé pour sa rigueur et sa forte compétitivité.
Le gaokao, examen national d'entrée dans l'enseignement supérieur, est considéré comme la bataille décisive qui détermine le destin des élèves.
Chaque année, plus de dix millions d'élèves participent au gaokao, dans une compétition extrêmement féroce.
Ces dernières années, le terme « neijuan » (involution) est de plus en plus répandu, reflétant l'énorme pression des étudiants.
De nombreux experts appellent à réformer le système éducatif, alléger la charge des élèves et mettre l'accent sur le développement de la créativité.
Comment garantir la qualité de l'éducation tout en donnant aux élèves plus d'espace pour se développer librement — c'est là un enjeu majeur de l'éducation chinoise actuelle.`,
  questions: [
    lq('b21ed-q1', 'Qu\'est-ce que le gaokao ?', ['Un diplôme universitaire', 'L\'examen national d\'entrée dans le supérieur', 'Un concours de bourses', 'Un examen régional'], 1, '全国统一高等学校招生考试 = examen national unifié d\'entrée dans l\'enseignement supérieur.'),
    lq('b21ed-q2', 'Combien d\'élèves participent chaque année au gaokao ?', ['500 000', '5 millions', 'Plus de 10 millions', '20 millions'], 2, '超过一千万 = plus de dix millions.'),
    lq('b21ed-q3', 'Que reflète le terme 内卷 ?', ['La réforme en cours', 'L\'énorme pression subie par les étudiants', 'Le succès du système éducatif', 'La coopération entre élèves'], 1, '内卷 反映了学生们面临的巨大压力 = reflète l\'énorme pression des étudiants.'),
    lq('b21ed-q4', 'Que préconisent les experts ?', ['Plus d\'examens', 'Fermer des universités', 'Réformer, alléger la charge et développer la créativité', 'Augmenter les heures de cours'], 2, '改革教育体制，减轻学生负担，注重创新能力的培养.'),
  ],
};

const b21_2: Lecture = {
  id: 'b21-tradition',
  level: 'b2.1',
  titleFr: 'La Fête du Printemps',
  titleZh: '春节',
  theme: 'culture',
  emoji: '🧧',
  estimatedMinutes: 5,
  text: `春节是中国最重要的传统节日，也是华人世界共同庆祝的节日。(Chūnjié shì Zhōngguó zuì zhòngyào de chuántǒng jiérì, yě shì Huárén shìjiè gòngtóng qìngzhù de jiérì.)
春节通常在每年一月底或二月初，具体日期取决于农历。(Chūnjié tōngcháng zài měi nián yīyuè dǐ huò èryuè chū, jùtǐ rìqī qǔjué yú nónglì.)
除夕夜，家家户户贴春联、放鞭炮，一家人吃团圆饭。(Chúxī yè, jiājiāhùhù tiē chūnlián, fàng biānpào, yījiā rén chī tuányuán fàn.)
长辈会给晚辈红包，寓意吉祥如意。(Zhǎngbèi huì gěi wǎnbèi hóngbāo, yùyì jíxiáng rúyì.)
随着时代的发展，越来越多的人选择用手机发电子红包来拜年。(Suízhe shídài de fāzhǎn, yuèláiyuè duō de rén xuǎnzé yòng shǒujī fā diànzǐ hóngbāo lái bàinián.)
春节不仅是家庭团聚的时刻，也是传承文化、延续传统的重要时机。(Chūnjié bùjǐn shì jiātíng tuánjù de shíkè, yě shì chuánchéng wénhuà, yánxù chuántǒng de zhòngyào shíjī.)`,
  translationFr: `La Fête du Printemps est la fête traditionnelle la plus importante de Chine, célébrée par toute la diaspora chinoise.
Elle a lieu généralement fin janvier ou début février, la date exacte dépend du calendrier lunaire.
La veille du Nouvel An, chaque foyer colle des couplets du Nouvel An, tire des pétards, et la famille mange le repas de réunion.
Les aînés donnent des enveloppes rouges aux plus jeunes, symbole de bonheur et de chance.
Avec l'évolution des temps, de plus en plus de gens choisissent d'envoyer des hongbao électroniques par téléphone pour les vœux.
La Fête du Printemps n'est pas seulement un moment de réunion familiale, c'est aussi une occasion importante de transmettre la culture et de perpétuer les traditions.`,
  questions: [
    lq('b21ch-q1', 'À quand correspond généralement la Fête du Printemps ?', ['Mi-décembre', 'Fin janvier ou début février', 'Mars', 'Début avril'], 1, '通常在每年一月底或二月初 = généralement fin janvier ou début février.'),
    lq('b21ch-q2', 'Que symbolisent les enveloppes rouges offertes aux jeunes ?', ['La force physique', 'Le rang social', 'Le bonheur et la chance', 'La gratitude'], 2, '寓意吉祥如意 = symbolise bonheur et chance.'),
    lq('b21ch-q3', 'Quelle nouvelle pratique se développe pour les vœux ?', ['Envoyer des lettres', 'Faire des feux d\'artifice', 'Envoyer des hongbao électroniques par téléphone', 'Planter un arbre'], 2, '越来越多的人选择用手机发电子红包来拜年.'),
    lq('b21ch-q4', 'Quel double rôle joue la Fête du Printemps selon le texte ?', ['Fête religieuse et commerciale', 'Réunion familiale et transmission culturelle', 'Repos et fête gastronomique', 'Fête des enfants et des aînés'], 1, '不仅是家庭团聚的时刻，也是传承文化、延续传统的重要时机.'),
  ],
};

// ============================================================================
//  B2.2
// ============================================================================
const b22_1: Lecture = {
  id: 'b22-urbanisation',
  level: 'b2.2',
  titleFr: 'L\'urbanisation rapide',
  titleZh: '快速城镇化',
  theme: 'société',
  emoji: '🏙️',
  estimatedMinutes: 5,
  text: `改革开放以来，中国经历了史无前例的城镇化进程。(Gǎigé kāifàng yǐlái, Zhōngguó jīnglì le shǐwú qiánlì de chéngzhènhuà jìnchéng.)
数以亿计的农村人口涌入城市，寻找更好的工作和生活机遇。(Shù yǐ yì jì de nóngcūn rénkǒu yǒngrù chéngshì, xúnzhǎo gèng hǎo de gōngzuò hé shēnghuó jīyù.)
这一趋势在带来经济腾飞的同时，也引发了一系列社会问题。(Zhè yī qūshì zài dàilái jīngjì téngfēi de tóngshí, yě yǐnfā le yī xìliè shèhuì wèntí.)
留守儿童问题尤为突出：父母进城务工，孩子留在农村由祖父母照看。(Liúshǒu értóng wèntí yóuwéi tūchū: fùmǔ jìnchéng wùgōng, háizi liú zài nóngcūn yóu zǔfùmǔ zhàokàn.)
城乡之间的收入差距和公共服务差异，仍是亟待解决的重大课题。(Chéngxiāng zhījiān de shōurù chājù hé gōnggòng fúwù chāyì, réng shì jídài jiějué de zhòngdà kètí.)
如何实现包容性增长，让城镇化的红利惠及更广泛的群体，考验着决策者的智慧。(Rúhé shíxiàn bāoróng xìng zēngzhǎng, ràng chéngzhènhuà de hónglì huìjí gèng guǎngfàn de qúntǐ, kǎoyàn zhe juécè zhě de zhìhuì.)`,
  translationFr: `Depuis la réforme et l'ouverture, la Chine a connu un processus d'urbanisation sans précédent.
Des centaines de millions de ruraux ont afflué vers les villes à la recherche de meilleures opportunités de travail et de vie.
Si cette tendance a entraîné un essor économique, elle a aussi provoqué toute une série de problèmes sociaux.
La question des « enfants laissés derrière » est particulièrement saillante : les parents partent travailler en ville, les enfants restent à la campagne gardés par les grands-parents.
L'écart de revenus et les disparités de services publics entre ville et campagne restent des enjeux majeurs urgents.
Comment réaliser une croissance inclusive permettant aux fruits de l'urbanisation de bénéficier à un plus large public — c'est ce qui met à l'épreuve la sagesse des décideurs.`,
  questions: [
    lq('b22u-q1', 'Depuis quand date ce processus d\'urbanisation ?', ['La Révolution culturelle', 'La réforme et l\'ouverture', 'La Seconde Guerre mondiale', 'La fondation de la RPC'], 1, '改革开放以来 = depuis la réforme et l\'ouverture.'),
    lq('b22u-q2', 'Qui sont les 留守儿童 ?', ['Enfants des villes scolarisés à la campagne', 'Enfants laissés à la campagne pendant que les parents travaillent en ville', 'Orphelins pris en charge par l\'État', 'Enfants migrants en ville'], 1, '父母进城务工，孩子留在农村由祖父母照看 = parents en ville, enfants restés à la campagne.'),
    lq('b22u-q3', 'Quel défi principal est mentionné entre ville et campagne ?', ['Différences linguistiques', 'Écart de revenus et disparités de services publics', 'Rivalités culturelles', 'Différences climatiques'], 1, '收入差距和公共服务差异 = écart de revenus et disparités de services publics.'),
    lq('b22u-q4', 'Que signifie 包容性增长 dans le texte ?', ['Croissance rapide', 'Croissance inclusive bénéficiant à tous', 'Croissance verte', 'Croissance exportatrice'], 1, '包容性增长 = croissance inclusive, qui profite au plus grand nombre.'),
  ],
};

const b22_2: Lecture = {
  id: 'b22-art',
  level: 'b2.2',
  titleFr: 'La calligraphie chinoise',
  titleZh: '中国书法',
  theme: 'culture',
  emoji: '🖌️',
  estimatedMinutes: 5,
  text: `书法是中国传统文化的瑰宝，被誉为"无声的诗，无形的舞"。(Shūfǎ shì Zhōngguó chuántǒng wénhuà de guībǎo, bèi yù wéi "wúshēng de shī, wúxíng de wǔ".)
它不仅是一种书写技艺，更是修身养性、表达情感的艺术形式。(Tā bùjǐn shì yī zhǒng shūxiě jìyì, gèng shì xiūshēn yǎngxìng, biǎodá qínggǎn de yìshù xíngshì.)
书法有楷书、行书、草书等多种字体，各有其独特的美感。(Shūfǎ yǒu kǎishū, xíngshū, cǎoshū děng duō zhǒng zìtǐ, gè yǒu qí dútè de měigǎn.)
历史上，王羲之被尊为"书圣"，其作品《兰亭集序》被誉为天下第一行书。(Lìshǐ shàng, Wáng Xīzhī bèi zūn wéi "shū shèng", qí zuòpǐn 《Lántíng Jí Xù》 bèi yù wéi tiānxià dì yī xíngshū.)
如今，书法被列入联合国教科文组织非物质文化遗产名录。(Rújīn, shūfǎ bèi lièrù Liánhéguó Jiàokēwén Zǔzhī fēi wùzhì wénhuà yíchǎn mínglù.)
越来越多的年轻人重新拾起毛笔，在快节奏的现代生活中寻找一份宁静。(Yuèláiyuè duō de niánqīng rén chóngxīn shí qǐ máobǐ, zài kuài jiézòu de xiàndài shēnghuó zhōng xúnzhǎo yī fèn níngjìng.)`,
  translationFr: `La calligraphie est un joyau de la culture traditionnelle chinoise, qualifiée de « poésie silencieuse, danse sans forme ».
Elle n'est pas seulement un art de l'écriture, mais aussi une forme artistique permettant de cultiver l'âme et d'exprimer les émotions.
La calligraphie comprend plusieurs styles : régulier, courant, cursif, chacun avec sa beauté propre.
Historiquement, Wang Xizhi est vénéré comme le « saint de la calligraphie » ; son œuvre « Préface du Pavillon des Orchidées » est considérée comme la meilleure œuvre en style courant.
Aujourd'hui, la calligraphie est inscrite au patrimoine culturel immatériel de l'UNESCO.
De plus en plus de jeunes reprennent le pinceau, cherchant une forme de sérénité dans la vie moderne trépidante.`,
  questions: [
    lq('b22a-q1', 'Comment la calligraphie est-elle décrite métaphoriquement ?', ['Peinture vivante', 'Poésie silencieuse, danse sans forme', 'Musique visible', 'Architecture du pinceau'], 1, '被誉为"无声的诗，无形的舞" = poésie silencieuse, danse sans forme.'),
    lq('b22a-q2', 'Quel calligraphe est surnommé 书圣 ?', ['Su Shi', 'Ouyang Xun', 'Wang Xizhi', 'Yan Zhenqing'], 2, '王羲之被尊为"书圣" = Wang Xizhi est le « saint de la calligraphie ».'),
    lq('b22a-q3', 'Quelle reconnaissance internationale a obtenu la calligraphie ?', ['Prix Nobel de la paix', 'Patrimoine immatériel de l\'UNESCO', 'Monument mondial de l\'art', 'Médaille d\'or olympique'], 1, '被列入联合国教科文组织非物质文化遗产名录 = inscrite au patrimoine immatériel de l\'UNESCO.'),
    lq('b22a-q4', 'Pourquoi des jeunes reprennent-ils la calligraphie ?', ['Pour trouver un emploi', 'Pour impressionner leurs parents', 'Pour trouver la sérénité dans la vie moderne', 'Pour voyager en Chine'], 2, '在快节奏的现代生活中寻找一份宁静 = chercher la sérénité dans la vie trépidante.'),
  ],
};

// ============================================================================
//  C1.1
// ============================================================================
const c11_1: Lecture = {
  id: 'c11-philosophie',
  level: 'c1.1',
  titleFr: 'La pensée confucéenne',
  titleZh: '儒家思想',
  theme: 'philosophie',
  emoji: '🏛️',
  estimatedMinutes: 6,
  text: `儒家思想是中国传统文化的核心，对东亚文明的塑造产生了深远影响。(Rújiā sīxiǎng shì Zhōngguó chuántǒng wénhuà de héxīn, duì Dōng Yà wénmíng de sùzào chǎnshēng le shēnyuǎn yǐngxiǎng.)
孔子（公元前551-479年）是儒家学派的创始人，其思想核心是"仁"——即对他人的爱与关怀。(Kǒngzǐ gōngyuán qián 551-479 nián shì Rújiā xuépài de chuàngshǐ rén, qí sīxiǎng héxīn shì "rén"—jí duì tārén de ài yǔ guānhuái.)
"礼"是儒家另一重要概念，强调社会关系中的规范与秩序。(Lǐ shì Rújiā lìng yī zhòngyào gàiniàn, qiángdiào shèhuì guānxì zhōng de guīfàn yǔ zhìxù.)
儒家的教育观认为，学习不仅是获取知识，更是塑造人格、修身齐家的途径。(Rújiā de jiàoyùguān rènwéi, xuéxí bùjǐn shì huòqǔ zhīshì, gèng shì sùzào réngé, xiūshēn qíjiā de tújìng.)
尽管历经千年演变，儒家思想在当代中国社会中依然发挥着不可忽视的作用。(Jǐnguǎn lìjīng qiān nián yǎnbiàn, Rújiā sīxiǎng zài dāngdài Zhōngguó shèhuì zhōng yīrán fāhuī zhe bùkě hūshì de zuòyòng.)`,
  translationFr: `La pensée confucéenne est au cœur de la culture traditionnelle chinoise et a exercé une influence profonde sur la civilisation est-asiatique.
Confucius (551-479 av. J.-C.) est le fondateur de l'école confucéenne ; le concept central de sa pensée est le « ren » (仁) — l'amour et la sollicitude envers autrui.
Le « li » (礼) est un autre concept clé confucéen, mettant l'accent sur les normes et l'ordre dans les relations sociales.
La vision éducative confucéenne considère que l'apprentissage n'est pas seulement l'acquisition de connaissances, mais aussi un chemin pour forger le caractère et cultiver soi-même.
Bien qu'ayant évolué sur des millénaires, la pensée confucéenne joue encore un rôle non négligeable dans la société chinoise contemporaine.`,
  questions: [
    lq('c11p-q1', 'Quel est le concept central de la pensée de Confucius ?', ['礼 (les rites)', '仁 (l\'amour/bienveillance envers autrui)', '义 (la justice)', '智 (la sagesse)'], 1, '其思想核心是"仁"——即对他人的爱与关怀.'),
    lq('c11p-q2', 'Que représente le concept de 礼 ?', ['L\'amour fraternel', 'Le sacrifice personnel', 'Les normes et l\'ordre dans les relations sociales', 'La connaissance académique'], 2, '礼 强调社会关系中的规范与秩序 = normes et ordre dans les relations sociales.'),
    lq('c11p-q3', 'Selon la vision éducative confucéenne, l\'apprentissage sert à :', ['Accumuler des richesses', 'Forger le caractère et cultiver soi-même', 'Dominer les autres', 'Obéir aux dirigeants'], 1, '学习是塑造人格、修身齐家的途径 = forger le caractère et se cultiver.'),
    lq('c11p-q4', 'Quelle est la portée géographique de l\'influence confucéenne selon le texte ?', ['La seule Chine', 'L\'Asie du Sud-Est', 'L\'Est de l\'Asie', 'Le monde entier'], 2, '对东亚文明的塑造产生了深远影响 = influence sur la civilisation est-asiatique.'),
  ],
};

const c11_2: Lecture = {
  id: 'c11-economie',
  level: 'c1.1',
  titleFr: 'L\'essor économique de la Chine',
  titleZh: '中国经济的崛起',
  theme: 'économie',
  emoji: '📈',
  estimatedMinutes: 6,
  text: `过去四十年间，中国经济经历了举世瞩目的腾飞，从一个积贫积弱的国家跃升为世界第二大经济体。(Guòqù sìshí nián jiān, Zhōngguó jīngjì jīnglì le jǔshì zhǔmù de téngfēi, cóng yī gè jī pín jī ruò de guójiā yuèshēng wéi shìjiè dì èr dà jīngjì tǐ.)
这一奇迹的背后，是数亿农民工进城务工所释放的巨大人口红利。(Zhè yī qíjì de bèihòu, shì shù yì nóngmíngōng jìnchéng wùgōng suǒ shìfàng de jùdà rénkǒu hónglì.)
然而，随着劳动力成本上升、人口结构老龄化，中国经济面临转型升级的迫切需要。(Rán'ér, suízhe láodònglì chéngběn shàngshēng, rénkǒu jiégòu lǎolínghùa, Zhōngguó jīngjì miànlín zhuǎnxíng shēngjí de pòqiē xūyào.)
从"中国制造"到"中国创造"，科技创新成为拉动增长的新引擎。(Cóng "Zhōngguó zhìzào" dào "Zhōngguó chuàngzào", kējì chuàngxīn chéngwéi lādòng zēngzhǎng de xīn yǐnqíng.)
人工智能、新能源和生物技术等领域的投入不断加大，彰显了中国向创新驱动型经济转型的决心。(Réngōng zhìnéng, xīn néngyuán hé shēngwù jìshù děng lǐngyù de tóurù bùduàn jiādà, zhāngxiǎn le Zhōngguó xiàng chuàngxīn qūdòng xíng jīngjì zhuǎnxíng de juéxīn.)`,
  translationFr: `Au cours des quarante dernières années, l'économie chinoise a connu un essor remarquable, passant d'un pays pauvre et faible à la deuxième puissance économique mondiale.
Derrière ce miracle, le formidable dividende démographique libéré par des centaines de millions de travailleurs migrants ruraux.
Cependant, avec la hausse des coûts du travail et le vieillissement de la population, l'économie chinoise doit urgemment se transformer et monter en gamme.
Du « fabriqué en Chine » au « créé en Chine », l'innovation technologique est devenue le nouveau moteur de croissance.
Les investissements croissants dans l'IA, les nouvelles énergies et les biotechnologies témoignent de la détermination de la Chine à passer à une économie fondée sur l'innovation.`,
  questions: [
    lq('c11e-q1', 'Quel rang économique mondial la Chine a-t-elle atteint ?', ['1ère puissance', '2ème puissance', '3ème puissance', '5ème puissance'], 1, '世界第二大经济体 = deuxième puissance économique mondiale.'),
    lq('c11e-q2', 'Quel facteur a alimenté le miracle économique selon le texte ?', ['Les exportations de pétrole', 'Le tourisme international', 'Le dividende démographique des travailleurs migrants', 'L\'aide étrangère'], 2, '数亿农民工进城务工所释放的巨大人口红利 = dividende démographique des migrants.'),
    lq('c11e-q3', 'Quelle transition exprime la formule « 中国制造 → 中国创造 » ?', ['Du communisme au capitalisme', 'De la production à faible coût à l\'économie innovante', 'De l\'agriculture à l\'industrie', 'De l\'exportation à la consommation intérieure'], 1, 'Passer de la simple fabrication à la création et à l\'innovation.'),
    lq('c11e-q4', 'Quels secteurs sont cités comme moteurs futurs ?', ['Textile et automobile', 'Agriculture et tourisme', 'IA, nouvelles énergies et biotechnologies', 'Finance et immobilier'], 2, '人工智能、新能源和生物技术 = IA, nouvelles énergies, biotechnologies.'),
  ],
};

// ============================================================================
//  C1.2
// ============================================================================
const c12_1: Lecture = {
  id: 'c12-litterature',
  level: 'c1.2',
  titleFr: 'Lu Xun et la littérature moderne',
  titleZh: '鲁迅与现代文学',
  theme: 'littérature',
  emoji: '✍️',
  estimatedMinutes: 7,
  text: `鲁迅（1881-1936）被誉为中国现代文学的奠基人，其作品以犀利的笔触揭示了封建社会的沉疴与国民性的痼疾。(Lǔ Xùn 1881-1936 bèi yù wéi Zhōngguó xiàndài wénxué de diànjī rén, qí zuòpǐn yǐ xīlì de bǐchù jiēshì le fēngjiàn shèhuì de chén kē yǔ guómín xìng de gùjí.)
《狂人日记》是他的第一篇白话小说，也是中国现代文学史上的开山之作。(《Kuángrén Rìjì》 shì tā de dì yī piān báihuà xiǎoshuō, yě shì Zhōngguó xiàndài wénxué shǐ shàng de kāishān zhī zuò.)
通过一个"狂人"的视角，鲁迅揭示了"礼教吃人"的主题，矛头直指封建伦理秩序。(Tōngguò yī gè "kuángrén" de shìjiǎo, Lǔ Xùn jiēshì le "lǐjiào chī rén" de zhǔtí, máotóu zhí zhǐ fēngjiàn lúnlǐ zhìxù.)
他弃医从文，是因为他认为唤醒国民的精神，比治疗身体更为紧迫。(Tā qì yī cóng wén, shì yīnwèi tā rènwéi huànxǐng guómín de jīngshén, bǐ zhìliáo shēntǐ gèng wéi jǐnpò.)
时至今日，鲁迅的作品仍然是中国语文教育的重要组成部分，其思想在当代依然具有深刻的现实意义。(Shí zhì jīnrì, Lǔ Xùn de zuòpǐn réngrán shì Zhōngguó yǔwén jiàoyù de zhòngyào zǔchéng bùfen, qí sīxiǎng zài dāngdài yīrán jùyǒu shēnkè de xiànshí yìyì.)`,
  translationFr: `Lu Xun (1881-1936) est considéré comme le fondateur de la littérature chinoise moderne ; son œuvre dévoile avec une plume incisive les maux profonds de la société féodale et les tares du caractère national.
« Le Journal d'un fou » est son premier roman en langue vernaculaire et l'œuvre fondatrice de la littérature moderne chinoise.
À travers le regard d'un « fou », Lu Xun révèle le thème des « rites qui dévorent les hommes », visant directement l'ordre éthique féodal.
Il abandonna la médecine pour la littérature car il estimait qu'éveiller l'esprit du peuple était plus urgent que soigner les corps.
Aujourd'hui encore, l'œuvre de Lu Xun est une composante essentielle de l'enseignement du chinois, et sa pensée garde une profonde résonance contemporaine.`,
  questions: [
    lq('c12l-q1', 'Quelle est la première œuvre en langue vernaculaire de Lu Xun ?', ['阿Q正传', '故乡', '狂人日记', '祝福'], 2, '《狂人日记》是他的第一篇白话小说 = « Le Journal d\'un fou » est son premier roman vernaculaire.'),
    lq('c12l-q2', 'Quel thème central révèle 狂人日记 ?', ['La beauté de la nature', 'L\'amour entre une femme et un homme', 'Les rites qui dévorent les hommes', 'La gloire de la révolution'], 2, '"礼教吃人"的主题 = le thème des rites qui dévorent les hommes.'),
    lq('c12l-q3', 'Pourquoi Lu Xun abandonna-t-il la médecine ?', ['Il échouait aux examens', 'Il estimait que l\'éveil spirituel était plus urgent que la médecine', 'Il n\'aimait pas les patients', 'La médecine ne rapportait pas'], 1, '唤醒国民的精神，比治疗身体更为紧迫 = éveiller l\'esprit est plus urgent que soigner.'),
    lq('c12l-q4', 'Quel rôle joue Lu Xun dans l\'éducation chinoise actuelle ?', ['Aucun, il est oublié', 'Ses œuvres font partie de l\'enseignement du chinois', 'Il est surtout étudié à l\'université', 'Son œuvre est interdite'], 1, '其作品仍然是中国语文教育的重要组成部分.'),
  ],
};

const c12_2: Lecture = {
  id: 'c12-mondialisation',
  level: 'c1.2',
  titleFr: 'Mondialisation et identité culturelle',
  titleZh: '全球化与文化认同',
  theme: 'société',
  emoji: '🌐',
  estimatedMinutes: 7,
  text: `全球化进程使不同文明之间的交流日益频繁，文化的边界变得愈发模糊。(Quánqiúhuà jìnchéng shǐ bùtóng wénmíng zhījiān de jiāoliú rìyì pínfán, wénhuà de biānjiè biàn dé yùfā móhú.)
一方面，全球化促进了知识与技术的传播，有助于缩小发展差距。(Yī fāngmiàn, quánqiúhuà cùjìn le zhīshì yǔ jìshù de chuánbō, yǒuzhù yú suōxiǎo fāzhǎn chājù.)
另一方面，强势文化的扩张往往以弱势文化的式微为代价，引发了有关文化多样性保护的广泛讨论。(Lìng yī fāngmiàn, qiángshì wénhuà de kuòzhāng wǎngwǎng yǐ ruòshì wénhuà de shìwēi wéi dàijià, yǐnfā le yǒuguān wénhuà duōyàngxìng bǎohù de guǎngfàn tǎolùn.)
以中国为例，年轻一代在接受西方流行文化的同时，也在重新发现汉服、古典诗词等传统文化的魅力。(Yǐ Zhōngguó wéi lì, niánqīng yīdài zài jiēshòu xīfāng liúxíng wénhuà de tóngshí, yě zài chóngxīn fāxiàn Hànfú, gǔdiǎn shīcí děng chuántǒng wénhuà de mèilì.)
这种"文化自觉"的回归，或许正是抵御文化同质化的一种有效途径。(Zhè zhǒng "wénhuà zìjué" de huíguī, huòxǔ zhèngshì dǐyù wénhuà tóngzhìhuà de yī zhǒng yǒuxiào tújìng.)`,
  translationFr: `La mondialisation rend les échanges entre civilisations de plus en plus fréquents, rendant les frontières culturelles de plus en plus floues.
D'un côté, la mondialisation favorise la diffusion des connaissances et des technologies, contribuant à réduire les écarts de développement.
De l'autre, l'expansion des cultures dominantes se fait souvent au détriment des cultures minoritaires, suscitant de larges débats sur la protection de la diversité culturelle.
Prenons la Chine en exemple : la jeune génération, tout en adoptant la culture pop occidentale, redécouvre le charme de la culture traditionnelle — hanfu, poésie classique.
Ce retour à la « conscience culturelle » est peut-être justement une voie efficace pour résister à l'homogénéisation culturelle.`,
  questions: [
    lq('c12m-q1', 'Quel effet positif de la mondialisation est cité ?', ['La paix mondiale', 'La diffusion de connaissances réduisant les écarts de développement', 'L\'augmentation du tourisme', 'L\'unification linguistique'], 1, '促进了知识与技术的传播，有助于缩小发展差距.'),
    lq('c12m-q2', 'Quel risque est évoqué ?', ['La pollution', 'La montée des nationalismes', 'Le déclin des cultures minoritaires face aux cultures dominantes', 'La désinformation'], 2, '强势文化的扩张往往以弱势文化的式微为代价 = déclin des cultures minoritaires.'),
    lq('c12m-q3', 'Quelle tendance est observée chez les jeunes Chinois ?', ['Abandon total de la tradition', 'Rejet de la culture occidentale', 'Redécouverte de la culture traditionnelle (hanfu, poésie)', 'Émigration massive'], 2, '重新发现汉服、古典诗词等传统文化的魅力 = redécouverte du hanfu et de la poésie classique.'),
    lq('c12m-q4', 'Que désigne la 文化自觉 ?', ['Une politique gouvernementale', 'La conscience et le retour à sa propre culture', 'Un mouvement artistique', 'La censure culturelle'], 1, '文化自觉 = conscience culturelle, retour à ses racines culturelles.'),
  ],
};

// ============================================================================
//  C2.1
// ============================================================================
const c21_1: Lecture = {
  id: 'c21-politique',
  level: 'c2.1',
  titleFr: 'Gouvernance et confucianisme contemporain',
  titleZh: '当代儒家与治理',
  theme: 'politique',
  emoji: '⚖️',
  estimatedMinutes: 8,
  text: `近年来，儒家思想在中国政治话语中的地位显著回升，引发了学界的广泛关注与争议。(Jìn nián lái, Rújiā sīxiǎng zài Zhōngguó zhèngzhì huàyǔ zhōng de dìwèi xiǎnzhù huíshēng, yǐnfā le xuéjiè de guǎngfàn guānzhù yǔ zhēngyì.)
儒家"仁政"理念与现代治理体系之间，究竟是相辅相成，还是存在深层张力？(Rújiā "rénzhèng" lǐniàn yǔ xiàndài zhìlǐ tǐxì zhījiān, jiùjìng shì xiāng fǔ xiāng chéng, hái shì cúnzài shēncéng zhānglì?)
支持者认为，儒家强调德治、民本，与现代民主政治并非格格不入，甚至可以互为补充。(Zhīchí zhě rènwéi, Rújiā qiángdiào dé zhì, mínběn, yǔ xiàndài mínzhǔ zhèngzhì bìngfēi gégébùrù, shènzhì kěyǐ hùwéi bǔchōng.)
批评者则指出，以文化传统为由拒绝普世价值，可能成为某些政治目的的工具。(Pīpíng zhě zé zhǐchū, yǐ wénhuà chuántǒng wéi yóu jùjué pǔshì jiàzhí, kěnéng chéngwéi mǒuxiē zhèngzhì mùdì de gōngjù.)
如何在坚守文化主体性的同时，保持对普世人权价值的开放与尊重，是当代中国思想界亟需回答的命题。(Rúhé zài jiānshǒu wénhuà zhǔtǐ xìng de tóngshí, bǎochí duì pǔshì rénquán jiàzhí de kāifàng yǔ zūnzhòng, shì dāngdài Zhōngguó sīxiǎng jiè jí xū huídá de mìngtí.)`,
  translationFr: `Ces dernières années, la place de la pensée confucéenne dans le discours politique chinois a notablement progressé, suscitant l'attention et le débat du monde académique.
La notion confucéenne de « gouvernement bienveillant » et le système de gouvernance moderne sont-ils complémentaires ou en tension profonde ?
Les partisans estiment que l'accent confucéen sur la vertu et le peuple n'est pas incompatible avec la démocratie moderne, voire peut la compléter.
Les critiques soulignent que refuser les valeurs universelles au nom de la tradition culturelle peut devenir un outil à des fins politiques.
Comment préserver l'identité culturelle tout en restant ouvert et respectueux des droits humains universels — c'est la question urgente que la pensée chinoise contemporaine doit résoudre.`,
  questions: [
    lq('c21p-q1', 'Que désigne la notion confucéenne de 仁政 ?', ['Gouvernement des lettrés', 'Gouvernement bienveillant centré sur la vertu', 'Gouvernement militaire', 'Gouvernement par les lois'], 1, '仁政 = gouvernement bienveillant (rén = bienveillance, zhèng = gouvernement).'),
    lq('c21p-q2', 'Que soutiennent les partisans du confucianisme en politique ?', ['Qu\'il faut remplacer la démocratie', 'Qu\'il est compatible et complémentaire avec la démocratie', 'Qu\'il faut fermer la Chine', 'Qu\'il s\'oppose aux droits de l\'homme'], 1, '与现代民主政治并非格格不入，甚至可以互为补充 = compatible et complémentaire.'),
    lq('c21p-q3', 'Quelle critique est formulée envers un usage politique du confucianisme ?', ['Il est trop ancien', 'Il peut servir d\'outil pour refuser les valeurs universelles', 'Il est inaccessible au peuple', 'Il n\'a aucune influence réelle'], 1, '以文化传统为由拒绝普世价值，可能成为某些政治目的的工具.'),
    lq('c21p-q4', 'Quelle tension centrale le texte met-il en lumière ?', ['Tradition vs modernité économique', 'Identité culturelle vs ouverture aux droits humains universels', 'Religion vs État', 'Est vs Ouest géographique'], 1, '坚守文化主体性 vs 对普世人权价值的开放与尊重.'),
  ],
};

const c21_2: Lecture = {
  id: 'c21-poesie',
  level: 'c2.1',
  titleFr: 'La poésie de Du Fu',
  titleZh: '杜甫的诗歌',
  theme: 'littérature',
  emoji: '🎋',
  estimatedMinutes: 8,
  text: `杜甫（712-770），字子美，被后世尊称为"诗圣"，与李白并称"李杜"。(Dù Fǔ 712-770, zì Zǐměi, bèi hòushì zūnchēng wéi "shī shèng", yǔ Lǐ Bái bìngchēng "Lǐ Dù".)
杜甫身处盛唐末期，亲历了安史之乱带来的社会动荡与民生之苦。(Dù Fǔ shēnchǔ shèng Táng mòqī, qīnlì le Ān Shǐ zhī Luàn dàilái de shèhuì dòngdàng yǔ mínshēng zhī kǔ.)
他的诗歌被称为"诗史"，以现实主义手法记录了历史的沧桑与百姓的疾苦。(Tā de shīgē bèi chēng wéi "shī shǐ", yǐ xiànshí zhǔyì shǒufǎ jìlù le lìshǐ de cāngsāng yǔ bǎixìng de jí kǔ.)
《春望》中的名句"国破山河在，城春草木深"，以山河永恒衬托国破之悲，令人动容。(《Chūn Wàng》 zhōng de míng jù "guó pò shān hé zài, chéng chūn cǎomù shēn", yǐ shān hé yǒnghéng chèn tuō guó pò zhī bēi, lìng rén dòngróng.)
杜甫对后世诗人影响深远，其"语不惊人死不休"的创作精神，成为文学追求完美的象征。(Dù Fǔ duì hòushì shīrén yǐngxiǎng shēnyuǎn, qí "yǔ bù jīng rén sǐ bù xiū" de chuàngzuò jīngshén, chéngwéi wénxué zhuīqiú wánměi de xiàngzhēng.)`,
  translationFr: `Du Fu (712-770), nom de plume Zimei, est honoré par la postérité du titre de « saint des poètes », et est souvent associé à Li Bai sous le nom de « Li Du ».
Du Fu vécut à la fin de la haute Tang et fut témoin des troubles sociaux et des souffrances du peuple causés par la rébellion d'An Lushan.
Sa poésie est appelée « histoire en vers » : avec un réalisme saisissant, il a consigné les vicissitudes de l'histoire et les souffrances du peuple.
Dans « Vue du printemps », le célèbre distique « l'État est en ruines, mais fleuves et monts demeurent ; au printemps, dans la cité, herbes et arbres poussent touffus » oppose la permanence de la nature à la douleur de la chute — une émotion bouleversante.
L'influence de Du Fu sur les poètes ultérieurs est immense ; son principe créatif « ne pas s'arrêter tant que les mots n'ont pas frappé les esprits » est devenu le symbole de la quête de perfection littéraire.`,
  questions: [
    lq('c21po-q1', 'Quel surnom est donné à Du Fu ?', ['诗仙 (génie immortel des poètes)', '诗圣 (saint des poètes)', '诗鬼 (fantôme des poètes)', '诗王 (roi des poètes)'], 1, '被后世尊称为"诗圣" = honoré du titre de saint des poètes.'),
    lq('c21po-q2', 'Pourquoi la poésie de Du Fu est-elle appelée 诗史 ?', ['Elle est la plus ancienne', 'Elle décrit des batailles', 'Elle témoigne réalistement de l\'histoire et des souffrances du peuple', 'Elle est écrite en style épique'], 2, '以现实主义手法记录了历史的沧桑与百姓的疾苦 = témoignage réaliste de l\'histoire.'),
    lq('c21po-q3', 'Dans le vers cité, qu\'est-ce qui s\'oppose à la destruction de l\'État ?', ['La cité en ruines', 'La permanence des fleuves et des montagnes', 'Le retour des soldats', 'Les fleurs du printemps'], 1, '国破山河在 = l\'État est détruit mais les fleuves et monts demeurent.'),
    lq('c21po-q4', 'Que signifie 语不惊人死不休 ?', ['Parler doucement jusqu\'à la mort', 'Ne pas s\'arrêter de créer tant que les mots ne frappent pas les esprits', 'Mourir pour ses idéaux poétiques', 'Rester silencieux plutôt que de mal parler'], 1, '语不惊人死不休 = ne s\'arrêter qu\'une fois les mots capables de frapper les esprits.'),
  ],
};

// ============================================================================
//  C2.2
// ============================================================================
const c22_1: Lecture = {
  id: 'c22-taoisme',
  level: 'c2.2',
  titleFr: 'Le Tao et le vide créateur',
  titleZh: '道与虚',
  theme: 'philosophie',
  emoji: '☯️',
  estimatedMinutes: 8,
  text: `《道德经》首章有云："道可道，非常道；名可名，非常名。"老子以此昭示：真正的道不可以言语穷尽，凡能被命名的，皆非永恒之本体。(《Dào Dé Jīng》 shǒu zhāng yǒu yún: "Dào kě dào, fēi cháng dào; míng kě míng, fēi cháng míng." Lǎozǐ yǐ cǐ zhāoshì: zhēnzhèng de Dào bùkěyǐ yányǔ qióngjìn, fán néng bèi mìngmíng de, jiē fēi yǒnghéng zhī běntǐ.)
"虚"是道家哲学中的核心概念之一。老子认为，正是器物的空虚处，成就了其实用价值："当其无，有室之用。"(Xū shì Dàojiā zhéxué zhōng de héxīn gàiniàn zhī yī. Lǎozǐ rènwéi, zhèngshì qìwù de kōngxū chù, chéngjiu le qí shíyòng jiàzhí: "dāng qí wú, yǒu shì zhī yòng.")
这种对"无用之用"的推崇，与西方形而上学中对实体存在的执着形成了鲜明对照。(Zhè zhǒng duì "wúyòng zhī yòng" de tuīchóng, yǔ xīfāng xíng ér shàng xué zhōng duì shítǐ cúnzài de zhízhe xíngchéng le xiānmíng duìzhào.)
庄子进一步发展了道家的自由精神，提出"无为而无不为"——顺应自然，不强行干预，则万物皆可自化。(Zhuāngzǐ jìnyībù fāzhǎn le Dàojiā de zìyóu jīngshén, tíchū "wúwéi ér wú bù wéi"—shùnyìng zìrán, bù qiángxíng gānyù, zé wànwù jiē kě zì huà.)
道家哲学以其深邃的辩证思维，为现代人提供了在喧嚣世界中寻求内心宁静的精神资源。(Dàojiā zhéxué yǐ qí shēnsuì de biànzhèng sīwéi, wèi xiàndài rén tígōng le zài xuānxiāo shìjiè zhōng xúnqiú nèixīn níngjìng de jīngshén zīyuán.)`,
  translationFr: `Le premier chapitre du Tao Te Ching dit : « Le Tao que l'on peut nommer n'est pas l'éternel Tao ; le nom que l'on peut nommer n'est pas l'éternel nom. » Laozi indique ainsi que le vrai Tao ne peut s'épuiser en paroles ; tout ce qui peut être nommé n'est pas l'essence éternelle.
Le « vide » est l'un des concepts centraux de la philosophie taoïste. Laozi estime que c'est justement le vide d'un objet qui lui confère sa valeur pratique : « c'est son vide qui fait l'utilité d'une pièce ».
Cette valorisation de « l'utilité de l'inutile » contraste nettement avec l'attachement occidental à l'existence substantielle dans la métaphysique.
Zhuangzi développa davantage l'esprit de liberté taoïste : « par le non-agir, rien n'est laissé sans être fait » — en suivant la nature sans forcer, toutes choses se transforment d'elles-mêmes.
La philosophie taoïste, par sa pensée dialectique profonde, offre à l'homme moderne des ressources spirituelles pour trouver la paix intérieure dans un monde bruyant.`,
  questions: [
    lq('c22t-q1', 'Que signifie « 道可道，非常道 » ?', ['Le Tao est facile à comprendre', 'Le Tao que l\'on peut nommer n\'est pas l\'éternel Tao', 'Le nom du Tao est constant', 'Le Tao change constamment'], 1, 'Le Tao exprimable en mots n\'est pas le Tao éternel et absolu.'),
    lq('c22t-q2', 'Comment Laozi illustre-t-il l\'utilité du vide ?', ['Par la rivière qui coule', 'Par la chambre dont le vide crée l\'utilité', 'Par le silence de la forêt', 'Par la vacuité de l\'esprit'], 1, '"当其无，有室之用" = c\'est le vide de la pièce qui crée son utilité.'),
    lq('c22t-q3', 'Que signifie 无为而无不为 chez Zhuangzi ?', ['Ne rien faire du tout', 'Par le non-agir forcé, tout est fait naturellement', 'Travailler sans récompense', 'Agir sans penser'], 1, '无为 = non-agir (pas de force), 无不为 = rien n\'est laissé sans être fait : l\'harmonie naturelle accomplit tout.'),
    lq('c22t-q4', 'Quelle pertinence le texte attribue-t-il au taoïsme aujourd\'hui ?', ['Une réforme politique', 'Des ressources spirituelles pour trouver la paix intérieure', 'Un modèle économique', 'Un guide de conduite sociale'], 1, '为现代人提供...寻求内心宁静的精神资源 = ressources pour la paix intérieure.'),
  ],
};

const c22_2: Lecture = {
  id: 'c22-langue',
  level: 'c2.2',
  titleFr: 'La langue comme mémoire collective',
  titleZh: '语言与集体记忆',
  theme: 'linguistique',
  emoji: '🗣️',
  estimatedMinutes: 8,
  text: `语言不仅是交流的工具，更是民族集体记忆的载体与文化基因的传承媒介。(Yǔyán bùjǐn shì jiāoliú de gōngjù, gèng shì mínzú jítǐ jìyì de zàitǐ yǔ wénhuà jīyīn de chuánchéng méijiè.)
汉字历经数千年演变而未中断，本身即是人类文明史上罕见的奇迹，承载着炎黄子孙对天地人伦的独特理解。(Hànzì lìjīng shù qiān nián yǎnbiàn ér wèi zhōngduàn, běnshēn jí shì rénlèi wénmíng shǐ shàng hǎnjiàn de qíjì, chéngzài zhe Yán Huáng zǐsūn duì tiān dì rén lún de dútè lǐjiě.)
法国语言学家索绪尔曾指出，语言是一种"差异的系统"：意义并非源于词汇本身，而是源于词汇与其他词汇的对立关系。(Fǎguó yǔyánxué jiā Suǒxùěr céng zhǐchū, yǔyán shì yī zhǒng "chāyì de xìtǒng": yìyì bìngfēi yuányú cíhuì běnshēn, ér shì yuányú cíhuì yǔ qítā cíhuì de duìlì guānxì.)
然而，汉语的表意文字体系却以另一种方式建构意义：字形本身往往蕴含着意象、历史与哲思。(Rán'ér, Hànyǔ de biǎoyì wénzì tǐxì què yǐ lìng yī zhǒng fāngshì jiàngòu yìyì: zìxíng běnshēn wǎngwǎng yùnhán zhe yìxiàng, lìshǐ yǔ zhésiī.)
在全球化与数字化的双重冲击下，如何守护语言的丰富性，防止母语的贫乏化，是人文学科面临的时代命题。(Zài quánqiúhuà yǔ shùzìhuà de shuāngchóng chōngjī xià, rúhé shǒuhù yǔyán de fēngfù xìng, fángzhǐ mǔyǔ de pínfáhuà, shì rénwén xuékē miànlín de shídài mìngtí.)`,
  translationFr: `La langue n'est pas seulement un outil de communication, mais aussi le vecteur de la mémoire collective d'un peuple et le medium de transmission des gènes culturels.
Les caractères chinois ont évolué sur des millénaires sans interruption — c'est en soi un miracle rare dans l'histoire de la civilisation humaine, portant la compréhension unique des descendants des empereurs Yan et Huang sur les relations entre ciel, terre et humanité.
Le linguiste français Saussure a souligné que la langue est un « système de différences » : le sens ne vient pas des mots en eux-mêmes, mais de leur relation d'opposition aux autres mots.
Pourtant, le système logographique du chinois construit le sens d'une autre façon : la forme même des caractères recèle souvent des images, de l'histoire et une réflexion philosophique.
Sous le double choc de la mondialisation et du numérique, comment préserver la richesse de la langue et éviter l'appauvrissement de la langue maternelle — c'est la question de notre époque pour les sciences humaines.`,
  questions: [
    lq('c22l-q1', 'Selon le texte, quel double rôle joue la langue ?', ['Communication et distraction', 'Outil de communication et vecteur de mémoire collective', 'Moyen d\'expression et source de conflits', 'Identité nationale et économie'], 1, '语言是交流的工具，更是集体记忆的载体与文化基因的传承媒介.'),
    lq('c22l-q2', 'Que souligne Saussure sur la nature du langage ?', ['Les mots ont un sens universel', 'Le sens vient des oppositions entre mots, pas des mots eux-mêmes', 'Toutes les langues sont équivalentes', 'L\'écriture prime sur l\'oral'], 1, '意义并非源于词汇本身，而是源于词汇与其他词汇的对立关系.'),
    lq('c22l-q3', 'En quoi les caractères chinois diffèrent-ils selon le texte ?', ['Ils sont plus faciles à apprendre', 'Leur forme renferme images, histoire et réflexion philosophique', 'Ils sont uniquement phonétiques', 'Ils ont moins de nuances que l\'alphabet'], 1, '字形本身往往蕴含着意象、历史与哲思 = la forme recèle images, histoire et philosophie.'),
    lq('c22l-q4', 'Quelle menace double pèse sur la richesse des langues ?', ['Guerres et famines', 'Mondialisation et numérique', 'Urbanisation et exode rural', 'Standardisation scolaire et médias'], 1, '全球化与数字化的双重冲击 = double choc de la mondialisation et du numérique.'),
  ],
};

// ============================================================================
//  EXPORTS
// ============================================================================

export const LECTURES: Lecture[] = [
  a1_1, a1_2,
  a2_1, a2_2,
  b11_1, b11_2,
  b12_1, b12_2,
  b21_1, b21_2,
  b22_1, b22_2,
  c11_1, c11_2,
  c12_1, c12_2,
  c21_1, c21_2,
  c22_1, c22_2,
];

export const LECTURES_BY_LEVEL: Record<CecrLevelSlug, Lecture[]> = {
  a1: [a1_1, a1_2],
  a2: [a2_1, a2_2],
  'b1.1': [b11_1, b11_2],
  'b1.2': [b12_1, b12_2],
  'b2.1': [b21_1, b21_2],
  'b2.2': [b22_1, b22_2],
  'c1.1': [c11_1, c11_2],
  'c1.2': [c12_1, c12_2],
  'c2.1': [c21_1, c21_2],
  'c2.2': [c22_1, c22_2],
};

export function getLectureById(id: string): Lecture | undefined {
  return LECTURES.find(l => l.id === id);
}

// ============================================================================
//  Traductions anglaises (fusionnées dans LECTURES au chargement)
// ============================================================================
interface LectureEn { titleEn: string; themeEn: string; translationEn: string; q: Record<string, { promptEn: string; choicesEn: string[]; explanationEn: string }>; }

const LECTURE_EN: Record<string, LectureEn> = {
  'a1-famille': {
    titleEn: 'My family', themeEn: 'family',
    translationEn: `My name is Xiaoming.
I have a dad and a mom.
I also have an older brother.
We live in Beijing.
My family has five people.
Grandpa and grandma also live with us.`,
    q: {
      'a1f-q1': { promptEn: "What is the narrator's name?", choicesEn: ['Xiǎohóng', 'Xiǎomíng', 'Xiǎolì', 'Xiǎowáng'], explanationEn: '我叫小明 = my name is Xiaoming.' },
      'a1f-q2': { promptEn: 'How many people are in the family?', choicesEn: ['3', '4', '5', '6'], explanationEn: '我家有五口人 = my family has five people (五 = 5).' },
      'a1f-q3': { promptEn: 'Where does the family live?', choicesEn: ['Shanghai', 'Guangzhou', 'Beijing', 'Chengdu'], explanationEn: '我们住在北京 = we live in Beijing.' },
      'a1f-q4': { promptEn: 'Which family relation is mentioned last?', choicesEn: ['Dad and mom', 'Older brother', 'Grandpa and grandma', 'Little sister'], explanationEn: 'The last sentence mentions 爷爷和奶奶 (paternal grandpa and grandma).' },
    },
  },
  'a1-ecole': {
    titleEn: 'At school', themeEn: 'daily life',
    translationEn: `Today is Monday.
I go to school for class.
My teacher is called Teacher Wang.
I have three books.
At 3 p.m. I go home.
I really like school.`,
    q: {
      'a1e-q1': { promptEn: 'What day is it?', choicesEn: ['Tuesday', 'Wednesday', 'Monday', 'Thursday'], explanationEn: '今天是星期一 = today is Monday (星期一).' },
      'a1e-q2': { promptEn: 'How many books does the narrator have?', choicesEn: ['1', '2', '3', '4'], explanationEn: '我有三本书 = I have three books (三 = 3).' },
      'a1e-q3': { promptEn: 'What time does he go home?', choicesEn: ['2 p.m.', '3 p.m.', '4 p.m.', '5 p.m.'], explanationEn: '下午三点 = 3 p.m. (three in the afternoon).' },
      'a1e-q4': { promptEn: "What is the narrator's feeling about school?", choicesEn: ['He hates it', 'He likes it a lot', 'He is indifferent', 'He is afraid'], explanationEn: '我很喜欢学校 = I really like school.' },
    },
  },
  'a2-weekend': {
    titleEn: 'My weekend', themeEn: 'leisure',
    translationEn: `Last weekend, my friend and I went to the park together.
The weather was great, the sun was shining.
We played basketball and ate ice cream.
In the afternoon, we went to a café for coffee.
We chatted a lot and were very happy.
In the evening I got home at 8 p.m., very tired but very glad.`,
    q: {
      'a2w-q1': { promptEn: 'Where did the narrator and his friend go?', choicesEn: ['The cinema', 'The restaurant', 'The park', 'The library'], explanationEn: '我和朋友一起去了公园 = we went to the park.' },
      'a2w-q2': { promptEn: 'Which sport did they play?', choicesEn: ['Soccer', 'Tennis', 'Swimming', 'Basketball'], explanationEn: '打了篮球 = played basketball. 打 + 篮球.' },
      'a2w-q3': { promptEn: 'What time did the narrator get home?', choicesEn: ['5 p.m.', '7 p.m.', '8 p.m.', '10 p.m.'], explanationEn: '晚上八点 = 8 p.m. (eight in the evening).' },
      'a2w-q4': { promptEn: 'How did the narrator feel on the way home?', choicesEn: ['Sad and rested', 'Tired but happy', 'Tired and sad', 'Energetic and happy'], explanationEn: '非常累，但是很高兴 = very tired, but very happy.' },
    },
  },
  'a2-marche': {
    titleEn: 'At the market', themeEn: 'daily life',
    translationEn: `Today mom took me to the market to shop.
There were lots of fresh fruit and vegetables at the market.
We bought apples, bananas and tomatoes.
Apples cost 5 yuan per catty, bananas 3 yuan per catty.
Mom thought the prices were not expensive.
We also bought a fish, planned for dinner.`,
    q: {
      'a2m-q1': { promptEn: 'Who took the narrator to the market?', choicesEn: ['Dad', 'Grandma', 'Mom', 'A friend'], explanationEn: '妈妈带我去市场 = mom took me to the market.' },
      'a2m-q2': { promptEn: 'How much do bananas cost per catty?', choicesEn: ['2 yuan', '3 yuan', '5 yuan', '8 yuan'], explanationEn: '香蕉三块钱一斤 = bananas cost 3 yuan per catty.' },
      'a2m-q3': { promptEn: 'Which animal is bought?', choicesEn: ['Chicken', 'Crab', 'Shrimp', 'Fish'], explanationEn: '买了一条鱼 = bought a fish. 条 is the classifier for fish.' },
      'a2m-q4': { promptEn: 'What does mom think of the prices?', choicesEn: ['Too expensive', 'Not expensive', 'Normal', "She doesn't know"], explanationEn: '妈妈觉得价格不贵 = mom thinks the prices are not expensive.' },
    },
  },
  'b11-voyage': {
    titleEn: 'A trip to Shanghai', themeEn: 'travel',
    translationEn: `Last summer, my family and I traveled to Shanghai.
We went by high-speed train, about two hours of travel.
Shanghai is a very modern city, with skyscrapers everywhere.
We visited the Bund and the Yu Garden.
The Bund's night view is magnificent; it impressed me deeply.
We spent three days in Shanghai and ate many delicious things, like xiaolongbao.`,
    q: {
      'b11v-q1': { promptEn: 'How did they travel to Shanghai?', choicesEn: ['By plane', 'By bus', 'By high-speed train', 'By car'], explanationEn: '坐高铁去的 = went by high-speed train (高铁).' },
      'b11v-q2': { promptEn: 'How long is the journey?', choicesEn: ['1 hour', '2 hours', '3 hours', '4 hours'], explanationEn: '大概两个小时就到了 = about two hours to arrive.' },
      'b11v-q3': { promptEn: 'What impressed the narrator most?', choicesEn: ['The skyscrapers', 'The Yu Garden', "The Bund's night view", 'The xiaolongbao'], explanationEn: '外滩的夜景...让我印象深刻 = the Bund night view impressed me deeply.' },
      'b11v-q4': { promptEn: 'How many days did they spend in Shanghai?', choicesEn: ['2', '3', '4', '5'], explanationEn: '在上海待了三天 = spent three days in Shanghai.' },
      'b11v-q5': { promptEn: 'Which culinary specialty is mentioned?', choicesEn: ['Fried dumplings', 'Xiaolongbao', 'Peking duck', 'Wonton dumplings'], explanationEn: '小笼包 = xiaolongbao, famous Shanghai steamed dumplings.' },
    },
  },
  'b11-habitudes': {
    titleEn: 'Eating habits', themeEn: 'culture',
    translationEn: `Chinese people place great importance on food; there is a saying: "food is the people's heaven".
Eating habits vary greatly across regions of China.
For example, southerners like rice, while northerners prefer wheat-based food.
Sichuan cuisine is very spicy, Cantonese cuisine is rather light.
Chinese people like to eat with chopsticks, a tradition thousands of years old.
Today, more and more young people also enjoy Western food.`,
    q: {
      'b11h-q1': { promptEn: 'What does the expression "民以食为天" mean?', choicesEn: ['Cook every day', 'Food is essential for the people', 'Share food', 'Heaven feeds the people'], explanationEn: '民以食为天 = "the people take food as their heaven" → food is essential.' },
      'b11h-q2': { promptEn: 'Which food preference distinguishes North from South?', choicesEn: ['North: rice / South: wheat', 'North: wheat / South: rice', 'North: spicy / South: sweet', 'North: meat / South: vegetables'], explanationEn: '南方人喜欢吃米饭，北方人更喜欢吃面食 = South: rice, North: wheat food.' },
      'b11h-q3': { promptEn: 'How is Cantonese cuisine described?', choicesEn: ['Very spicy', 'Very sweet', 'Rather light', 'Very oily'], explanationEn: '广东菜比较清淡 = Cantonese cuisine is rather light.' },
      'b11h-q4': { promptEn: 'What trend is observed among young people?', choicesEn: ['They eat less', 'They prefer Sichuan cuisine', 'They also enjoy Western food', 'They give up chopsticks'], explanationEn: '越来越多的年轻人也喜欢吃西餐 = more and more young people like Western food.' },
    },
  },
  'b12-environnement': {
    titleEn: 'Protecting the environment', themeEn: 'environment',
    translationEn: `Protecting the environment is the responsibility of each one of us.
In recent years, due to industrial development, air pollution has become increasingly severe.
Many city dwellers have to wear a mask to go out.
To solve this problem, the government has introduced a series of policies.
For example, limiting the number of cars and vigorously developing public transport.
As ordinary citizens, we can also drive less, cycle more, and do our part for the environment.`,
    q: {
      'b12e-q1': { promptEn: 'What is the main cause of air pollution mentioned?', choicesEn: ['Tourism', 'Industrial development', 'Forest fires', 'Agriculture'], explanationEn: '由于工业发展，空气污染越来越严重 = due to industrial development.' },
      'b12e-q2': { promptEn: 'What are many residents forced to do?', choicesEn: ['Move to the countryside', 'Wear a mask', 'Stop working', 'Buy an air filter'], explanationEn: '不得不戴口罩出门 = forced to wear a mask to go out.' },
      'b12e-q3': { promptEn: 'Which government measure is cited?', choicesEn: ['Close factories', 'Plant trees', 'Limit the number of cars', 'Tax polluters'], explanationEn: '限制汽车数量 = limit the number of cars.' },
      'b12e-q4': { promptEn: 'What can each citizen do according to the text?', choicesEn: ['Protest', 'Drive less and cycle more', 'Pay green taxes', 'Move to the countryside'], explanationEn: '少开车，多骑自行车，为环保出一份力 = drive less, cycle more.' },
    },
  },
  'b12-reseaux': {
    titleEn: 'Social media', themeEn: 'technology',
    translationEn: `Today, social media has become an indispensable part of people's lives.
In China, WeChat and Weibo are the most popular social platforms.
Through these platforms, people can stay in touch with friends anytime, anywhere.
However, excessive use of social media can also bring some problems.
For example, some people spend too much time scrolling on their phones, affecting work and sleep.
Therefore, learning to use social media sensibly is very important.`,
    q: {
      'b12r-q1': { promptEn: 'Which two Chinese platforms are mentioned?', choicesEn: ['TikTok and Baidu', 'WeChat and Weibo', 'Alibaba and Taobao', 'Douyin and Bilibili'], explanationEn: '微信 (WeChat) 和微博 (Weibo) are the platforms cited.' },
      'b12r-q2': { promptEn: 'What main advantage of social media is cited?', choicesEn: ['Making money', 'Staying in touch anytime', 'Learning languages', 'Finding a job'], explanationEn: '随时随地与朋友保持联系 = staying in touch anywhere, anytime.' },
      'b12r-q3': { promptEn: 'What problem is mentioned?', choicesEn: ['Hacking', 'Spending too much money', 'Too much phone time, harming sleep', 'Fake news'], explanationEn: '花太多时间刷手机，影响工作和睡眠 = too much phone time, affecting work and sleep.' },
      'b12r-q4': { promptEn: "What is the text's conclusion?", choicesEn: ['Stop using social media', 'Social media is dangerous', 'Learn to use social media sensibly', 'Prefer face-to-face contact'], explanationEn: '学会合理使用社交媒体非常重要 = it is important to learn to use it sensibly.' },
    },
  },
  'b21-education': {
    titleEn: 'Education in China', themeEn: 'society',
    translationEn: `China's education system is famous for its rigor and fierce competition.
The gaokao, the national college entrance exam, is seen as the decisive battle that determines students' fate.
Every year, more than ten million students take the gaokao, in extremely fierce competition.
In recent years, the term "neijuan" (involution) has become more and more widespread, reflecting the enormous pressure on students.
Many experts call for reforming the education system, easing students' burden and emphasizing the development of creativity.
How to guarantee education quality while giving students more room to develop freely — that is a major challenge for China's education today.`,
    q: {
      'b21ed-q1': { promptEn: 'What is the gaokao?', choicesEn: ['A university degree', 'The national college entrance exam', 'A scholarship contest', 'A regional exam'], explanationEn: '全国统一高等学校招生考试 = national unified college entrance exam.' },
      'b21ed-q2': { promptEn: 'How many students take the gaokao each year?', choicesEn: ['500,000', '5 million', 'More than 10 million', '20 million'], explanationEn: '超过一千万 = more than ten million.' },
      'b21ed-q3': { promptEn: 'What does the term 内卷 reflect?', choicesEn: ['The ongoing reform', 'The enormous pressure on students', 'The success of the education system', 'Cooperation among students'], explanationEn: '内卷 反映了学生们面临的巨大压力 = reflects the enormous pressure on students.' },
      'b21ed-q4': { promptEn: 'What do experts recommend?', choicesEn: ['More exams', 'Closing universities', 'Reform, ease the burden and develop creativity', 'Increase class hours'], explanationEn: '改革教育体制，减轻学生负担，注重创新能力的培养.' },
    },
  },
  'b21-tradition': {
    titleEn: 'The Spring Festival', themeEn: 'culture',
    translationEn: `The Spring Festival is China's most important traditional holiday, celebrated by the whole Chinese diaspora.
It usually falls in late January or early February; the exact date depends on the lunar calendar.
On New Year's Eve, every household puts up New Year couplets, sets off firecrackers, and the family eats the reunion meal.
Elders give red envelopes to the young, a symbol of happiness and good fortune.
As times change, more and more people choose to send electronic red envelopes by phone to give New Year greetings.
The Spring Festival is not only a time of family reunion, but also an important occasion to pass on culture and continue traditions.`,
    q: {
      'b21ch-q1': { promptEn: 'When does the Spring Festival usually fall?', choicesEn: ['Mid-December', 'Late January or early February', 'March', 'Early April'], explanationEn: '通常在每年一月底或二月初 = usually late January or early February.' },
      'b21ch-q2': { promptEn: 'What do the red envelopes given to the young symbolize?', choicesEn: ['Physical strength', 'Social rank', 'Happiness and good fortune', 'Gratitude'], explanationEn: '寓意吉祥如意 = symbolizes happiness and good fortune.' },
      'b21ch-q3': { promptEn: 'What new practice is developing for greetings?', choicesEn: ['Sending letters', 'Setting off fireworks', 'Sending electronic red envelopes by phone', 'Planting a tree'], explanationEn: '越来越多的人选择用手机发电子红包来拜年.' },
      'b21ch-q4': { promptEn: 'What dual role does the Spring Festival play according to the text?', choicesEn: ['Religious and commercial festival', 'Family reunion and cultural transmission', 'Rest and food festival', 'Festival of children and elders'], explanationEn: '不仅是家庭团聚的时刻，也是传承文化、延续传统的重要时机.' },
    },
  },
  'b22-urbanisation': {
    titleEn: 'Rapid urbanization', themeEn: 'society',
    translationEn: `Since the reform and opening-up, China has experienced an unprecedented urbanization process.
Hundreds of millions of rural people have flocked to the cities in search of better work and life opportunities.
While this trend has driven economic takeoff, it has also caused a whole series of social problems.
The issue of "left-behind children" is particularly salient: parents go to work in the cities, and children stay in the countryside cared for by their grandparents.
The income gap and disparities in public services between city and countryside remain major urgent challenges.
How to achieve inclusive growth so the fruits of urbanization benefit a wider public — that is what tests the wisdom of decision-makers.`,
    q: {
      'b22u-q1': { promptEn: 'When did this urbanization process begin?', choicesEn: ['The Cultural Revolution', 'The reform and opening-up', 'World War II', 'The founding of the PRC'], explanationEn: '改革开放以来 = since the reform and opening-up.' },
      'b22u-q2': { promptEn: 'Who are the 留守儿童?', choicesEn: ['City children schooled in the countryside', 'Children left in the countryside while parents work in the city', 'Orphans cared for by the state', 'Migrant children in the city'], explanationEn: '父母进城务工，孩子留在农村由祖父母照看 = parents in the city, children left in the countryside.' },
      'b22u-q3': { promptEn: 'What main challenge is mentioned between city and countryside?', choicesEn: ['Language differences', 'Income gap and public service disparities', 'Cultural rivalries', 'Climate differences'], explanationEn: '收入差距和公共服务差异 = income gap and public service disparities.' },
      'b22u-q4': { promptEn: 'What does 包容性增长 mean in the text?', choicesEn: ['Rapid growth', 'Inclusive growth benefiting all', 'Green growth', 'Export-driven growth'], explanationEn: '包容性增长 = inclusive growth, benefiting the greatest number.' },
    },
  },
  'b22-art': {
    titleEn: 'Chinese calligraphy', themeEn: 'culture',
    translationEn: `Calligraphy is a jewel of traditional Chinese culture, described as "silent poetry, formless dance".
It is not only an art of writing, but also an art form for cultivating the soul and expressing emotions.
Calligraphy includes several styles: regular, running, cursive, each with its own beauty.
Historically, Wang Xizhi is revered as the "sage of calligraphy"; his work "Preface to the Orchid Pavilion" is considered the finest work in running style.
Today, calligraphy is inscribed on UNESCO's Intangible Cultural Heritage list.
More and more young people are taking up the brush again, seeking serenity in the fast-paced modern life.`,
    q: {
      'b22a-q1': { promptEn: 'How is calligraphy described metaphorically?', choicesEn: ['Living painting', 'Silent poetry, formless dance', 'Visible music', 'Architecture of the brush'], explanationEn: '被誉为"无声的诗，无形的舞" = silent poetry, formless dance.' },
      'b22a-q2': { promptEn: 'Which calligrapher is nicknamed 书圣?', choicesEn: ['Su Shi', 'Ouyang Xun', 'Wang Xizhi', 'Yan Zhenqing'], explanationEn: '王羲之被尊为"书圣" = Wang Xizhi is the "sage of calligraphy".' },
      'b22a-q3': { promptEn: 'What international recognition has calligraphy received?', choicesEn: ['Nobel Peace Prize', 'UNESCO Intangible Heritage', 'World art monument', 'Olympic gold medal'], explanationEn: '被列入联合国教科文组织非物质文化遗产名录 = inscribed on UNESCO Intangible Heritage.' },
      'b22a-q4': { promptEn: 'Why are young people taking up calligraphy again?', choicesEn: ['To find a job', 'To impress their parents', 'To find serenity in modern life', 'To travel to China'], explanationEn: '在快节奏的现代生活中寻找一份宁静 = to find serenity in a hectic life.' },
    },
  },
  'c11-philosophie': {
    titleEn: 'Confucian thought', themeEn: 'philosophy',
    translationEn: `Confucian thought is at the heart of traditional Chinese culture and has profoundly influenced East Asian civilization.
Confucius (551-479 BC) is the founder of the Confucian school; the central concept of his thought is "ren" (仁) — love and care for others.
"Li" (礼) is another key Confucian concept, emphasizing norms and order in social relations.
The Confucian view of education holds that learning is not only acquiring knowledge, but also a path to forge one's character and cultivate oneself.
Although it has evolved over millennia, Confucian thought still plays a significant role in contemporary Chinese society.`,
    q: {
      'c11p-q1': { promptEn: 'What is the central concept of Confucius’s thought?', choicesEn: ['礼 (the rites)', '仁 (love/benevolence toward others)', '义 (justice)', '智 (wisdom)'], explanationEn: '其思想核心是"仁"——即对他人的爱与关怀.' },
      'c11p-q2': { promptEn: 'What does the concept of 礼 represent?', choicesEn: ['Brotherly love', 'Self-sacrifice', 'Norms and order in social relations', 'Academic knowledge'], explanationEn: '礼 强调社会关系中的规范与秩序 = norms and order in social relations.' },
      'c11p-q3': { promptEn: 'According to the Confucian view of education, learning serves to:', choicesEn: ['Accumulate wealth', 'Forge character and cultivate oneself', 'Dominate others', 'Obey rulers'], explanationEn: '学习是塑造人格、修身齐家的途径 = forge character and cultivate oneself.' },
      'c11p-q4': { promptEn: 'What is the geographic scope of Confucian influence according to the text?', choicesEn: ['China only', 'Southeast Asia', 'East Asia', 'The whole world'], explanationEn: '对东亚文明的塑造产生了深远影响 = influence on East Asian civilization.' },
    },
  },
  'c11-economie': {
    titleEn: "China's economic rise", themeEn: 'economy',
    translationEn: `Over the past forty years, China's economy has undergone a remarkable takeoff, going from a poor and weak country to the world's second-largest economy.
Behind this miracle lies the enormous demographic dividend released by hundreds of millions of rural migrant workers.
However, with rising labor costs and an aging population, China's economy urgently needs to transform and upgrade.
From "made in China" to "created in China", technological innovation has become the new engine of growth.
Growing investment in AI, new energy and biotechnology reflects China's determination to shift to an innovation-driven economy.`,
    q: {
      'c11e-q1': { promptEn: 'What global economic rank has China reached?', choicesEn: ['1st power', '2nd power', '3rd power', '5th power'], explanationEn: '世界第二大经济体 = world’s second-largest economy.' },
      'c11e-q2': { promptEn: 'What factor fueled the economic miracle according to the text?', choicesEn: ['Oil exports', 'International tourism', 'The demographic dividend of migrant workers', 'Foreign aid'], explanationEn: '数亿农民工进城务工所释放的巨大人口红利 = demographic dividend of migrants.' },
      'c11e-q3': { promptEn: 'What transition does the phrase "中国制造 → 中国创造" express?', choicesEn: ['From communism to capitalism', 'From low-cost production to an innovative economy', 'From agriculture to industry', 'From exports to domestic consumption'], explanationEn: 'Moving from mere manufacturing to creation and innovation.' },
      'c11e-q4': { promptEn: 'Which sectors are cited as future engines?', choicesEn: ['Textiles and automotive', 'Agriculture and tourism', 'AI, new energy and biotechnology', 'Finance and real estate'], explanationEn: '人工智能、新能源和生物技术 = AI, new energy, biotechnology.' },
    },
  },
  'c12-litterature': {
    titleEn: 'Lu Xun and modern literature', themeEn: 'literature',
    translationEn: `Lu Xun (1881-1936) is considered the founder of modern Chinese literature; his work exposes with an incisive pen the deep ills of feudal society and the flaws of the national character.
"A Madman's Diary" is his first vernacular-language novel and the founding work of modern Chinese literature.
Through the eyes of a "madman", Lu Xun reveals the theme of "the rites that devour people", aimed directly at the feudal ethical order.
He abandoned medicine for literature because he believed that awakening the people's spirit was more urgent than healing bodies.
To this day, Lu Xun's work remains an essential part of Chinese language education, and his thought still deeply resonates today.`,
    q: {
      'c12l-q1': { promptEn: "What is Lu Xun's first vernacular-language work?", choicesEn: ['阿Q正传', '故乡', '狂人日记', '祝福'], explanationEn: '《狂人日记》是他的第一篇白话小说 = "A Madman’s Diary" is his first vernacular novel.' },
      'c12l-q2': { promptEn: 'What central theme does 狂人日记 reveal?', choicesEn: ['The beauty of nature', 'Love between a man and a woman', 'The rites that devour people', 'The glory of revolution'], explanationEn: '"礼教吃人"的主题 = the theme of the rites that devour people.' },
      'c12l-q3': { promptEn: 'Why did Lu Xun abandon medicine?', choicesEn: ['He failed exams', 'He believed spiritual awakening was more urgent than medicine', "He didn't like patients", 'Medicine did not pay'], explanationEn: '唤醒国民的精神，比治疗身体更为紧迫 = awakening the spirit is more urgent than healing.' },
      'c12l-q4': { promptEn: "What role does Lu Xun play in today's Chinese education?", choicesEn: ['None, he is forgotten', 'His works are part of Chinese language education', 'He is mainly studied at university', 'His work is banned'], explanationEn: '其作品仍然是中国语文教育的重要组成部分.' },
    },
  },
  'c12-mondialisation': {
    titleEn: 'Globalization and cultural identity', themeEn: 'society',
    translationEn: `Globalization makes exchanges between civilizations increasingly frequent, making cultural boundaries ever more blurred.
On one hand, globalization promotes the spread of knowledge and technology, helping to narrow development gaps.
On the other, the expansion of dominant cultures often comes at the expense of minority cultures, sparking broad debate on protecting cultural diversity.
Take China as an example: while embracing Western pop culture, the younger generation is also rediscovering the charm of traditional culture — hanfu, classical poetry.
This return to "cultural awareness" may be precisely an effective way to resist cultural homogenization.`,
    q: {
      'c12m-q1': { promptEn: 'What positive effect of globalization is cited?', choicesEn: ['World peace', 'Spreading knowledge to narrow development gaps', 'Increased tourism', 'Linguistic unification'], explanationEn: '促进了知识与技术的传播，有助于缩小发展差距.' },
      'c12m-q2': { promptEn: 'What risk is raised?', choicesEn: ['Pollution', 'The rise of nationalism', 'The decline of minority cultures against dominant ones', 'Disinformation'], explanationEn: '强势文化的扩张往往以弱势文化的式微为代价 = decline of minority cultures.' },
      'c12m-q3': { promptEn: 'What trend is observed among young Chinese?', choicesEn: ['Total abandonment of tradition', 'Rejection of Western culture', 'Rediscovery of traditional culture (hanfu, poetry)', 'Massive emigration'], explanationEn: '重新发现汉服、古典诗词等传统文化的魅力 = rediscovery of hanfu and classical poetry.' },
      'c12m-q4': { promptEn: 'What does 文化自觉 refer to?', choicesEn: ['A government policy', "Awareness of and return to one's own culture", 'An artistic movement', 'Cultural censorship'], explanationEn: '文化自觉 = cultural awareness, returning to one’s cultural roots.' },
    },
  },
  'c21-politique': {
    titleEn: 'Governance and contemporary Confucianism', themeEn: 'politics',
    translationEn: `In recent years, the place of Confucian thought in Chinese political discourse has notably risen, drawing attention and debate from academia.
Are the Confucian notion of "benevolent government" and the modern governance system complementary, or in deep tension?
Supporters believe that the Confucian emphasis on virtue and the people is not incompatible with modern democracy, and may even complement it.
Critics point out that rejecting universal values in the name of cultural tradition can become a tool for certain political ends.
How to preserve cultural identity while remaining open to and respectful of universal human rights — that is the urgent question contemporary Chinese thought must answer.`,
    q: {
      'c21p-q1': { promptEn: 'What does the Confucian notion of 仁政 mean?', choicesEn: ['Government of scholars', 'Benevolent government centered on virtue', 'Military government', 'Government by laws'], explanationEn: '仁政 = benevolent government (rén = benevolence, zhèng = government).' },
      'c21p-q2': { promptEn: 'What do supporters of Confucianism in politics argue?', choicesEn: ['That democracy should be replaced', 'That it is compatible with and complementary to democracy', 'That China should close off', 'That it opposes human rights'], explanationEn: '与现代民主政治并非格格不入，甚至可以互为补充 = compatible and complementary.' },
      'c21p-q3': { promptEn: 'What criticism is made of a political use of Confucianism?', choicesEn: ['It is too old', 'It can serve as a tool to reject universal values', 'It is inaccessible to the people', 'It has no real influence'], explanationEn: '以文化传统为由拒绝普世价值，可能成为某些政治目的的工具.' },
      'c21p-q4': { promptEn: 'What central tension does the text highlight?', choicesEn: ['Tradition vs economic modernity', 'Cultural identity vs openness to universal human rights', 'Religion vs state', 'East vs West geographically'], explanationEn: '坚守文化主体性 vs 对普世人权价值的开放与尊重.' },
    },
  },
  'c21-poesie': {
    titleEn: "Du Fu's poetry", themeEn: 'literature',
    translationEn: `Du Fu (712-770), courtesy name Zimei, is honored by posterity as the "sage of poets", and is often paired with Li Bai under the name "Li Du".
Du Fu lived at the end of the High Tang and witnessed the social turmoil and people's suffering caused by the An Lushan Rebellion.
His poetry is called "poetic history": with striking realism, he recorded the vicissitudes of history and the sufferings of the people.
In "Spring View", the famous couplet "the nation is shattered, yet mountains and rivers remain; in spring, the city's grass and trees grow deep" contrasts the permanence of nature with the grief of the fall — deeply moving.
Du Fu's influence on later poets is immense; his creative principle "not to rest until the words startle" became the symbol of the literary pursuit of perfection.`,
    q: {
      'c21po-q1': { promptEn: 'What nickname is given to Du Fu?', choicesEn: ['诗仙 (immortal genius of poets)', '诗圣 (sage of poets)', '诗鬼 (ghost of poets)', '诗王 (king of poets)'], explanationEn: '被后世尊称为"诗圣" = honored as the sage of poets.' },
      'c21po-q2': { promptEn: "Why is Du Fu's poetry called 诗史?", choicesEn: ['It is the oldest', 'It describes battles', 'It realistically documents history and the people’s suffering', 'It is written in epic style'], explanationEn: '以现实主义手法记录了历史的沧桑与百姓的疾苦 = realistic documentation of history.' },
      'c21po-q3': { promptEn: 'In the cited verse, what stands opposed to the destruction of the nation?', choicesEn: ['The ruined city', 'The permanence of rivers and mountains', 'The return of soldiers', 'The spring flowers'], explanationEn: '国破山河在 = the nation is destroyed but rivers and mountains remain.' },
      'c21po-q4': { promptEn: 'What does 语不惊人死不休 mean?', choicesEn: ['To speak softly until death', 'Not to stop creating until the words startle', 'To die for poetic ideals', 'To stay silent rather than speak poorly'], explanationEn: '语不惊人死不休 = not stopping until the words can startle people.' },
    },
  },
  'c22-taoisme': {
    titleEn: 'The Tao and creative emptiness', themeEn: 'philosophy',
    translationEn: `The first chapter of the Tao Te Ching says: "The Tao that can be named is not the eternal Tao; the name that can be named is not the eternal name." Laozi thus indicates that the true Tao cannot be exhausted in words; whatever can be named is not the eternal essence.
"Emptiness" is one of the central concepts of Taoist philosophy. Laozi holds that it is precisely the emptiness of an object that gives it its practical value: "it is its emptiness that makes a room useful".
This valuing of "the usefulness of the useless" sharply contrasts with the Western metaphysical attachment to substantial existence.
Zhuangzi further developed the Taoist spirit of freedom: "through non-action, nothing is left undone" — by following nature without forcing, all things transform of themselves.
Taoist philosophy, through its profound dialectical thinking, offers modern people spiritual resources to seek inner peace in a noisy world.`,
    q: {
      'c22t-q1': { promptEn: 'What does "道可道，非常道" mean?', choicesEn: ['The Tao is easy to understand', 'The Tao that can be named is not the eternal Tao', 'The name of the Tao is constant', 'The Tao changes constantly'], explanationEn: 'The Tao expressible in words is not the eternal, absolute Tao.' },
      'c22t-q2': { promptEn: 'How does Laozi illustrate the usefulness of emptiness?', choicesEn: ['By the flowing river', 'By the room whose emptiness creates usefulness', 'By the silence of the forest', 'By the emptiness of the mind'], explanationEn: '"当其无，有室之用" = it is the emptiness of the room that creates its usefulness.' },
      'c22t-q3': { promptEn: 'What does 无为而无不为 mean in Zhuangzi?', choicesEn: ['To do nothing at all', 'Through non-forcing action, all is done naturally', 'To work without reward', 'To act without thinking'], explanationEn: '无为 = non-action (no force), 无不为 = nothing left undone: natural harmony accomplishes all.' },
      'c22t-q4': { promptEn: 'What relevance does the text attribute to Taoism today?', choicesEn: ['A political reform', 'Spiritual resources to find inner peace', 'An economic model', 'A guide to social conduct'], explanationEn: '为现代人提供...寻求内心宁静的精神资源 = resources for inner peace.' },
    },
  },
  'c22-langue': {
    titleEn: 'Language as collective memory', themeEn: 'linguistics',
    translationEn: `Language is not only a tool of communication, but also the vehicle of a people's collective memory and the medium of transmission of cultural genes.
Chinese characters have evolved over thousands of years without interruption — this is in itself a rare miracle in the history of human civilization, carrying the unique understanding of the descendants of the Yan and Huang emperors regarding the relations between heaven, earth and humanity.
The French linguist Saussure pointed out that language is a "system of differences": meaning does not come from words themselves, but from their relations of opposition to other words.
Yet the Chinese logographic writing system constructs meaning in another way: the very form of the characters often contains imagery, history and philosophical reflection.
Under the twin shocks of globalization and digitization, how to safeguard the richness of language and prevent the impoverishment of the mother tongue — that is the question of our era for the humanities.`,
    q: {
      'c22l-q1': { promptEn: 'According to the text, what dual role does language play?', choicesEn: ['Communication and entertainment', 'Tool of communication and vehicle of collective memory', 'Means of expression and source of conflict', 'National identity and economy'], explanationEn: '语言是交流的工具，更是集体记忆的载体与文化基因的传承媒介.' },
      'c22l-q2': { promptEn: 'What does Saussure emphasize about the nature of language?', choicesEn: ['Words have universal meaning', 'Meaning comes from oppositions between words, not the words themselves', 'All languages are equivalent', 'Writing prevails over speech'], explanationEn: '意义并非源于词汇本身，而是源于词汇与其他词汇的对立关系.' },
      'c22l-q3': { promptEn: 'How do Chinese characters differ according to the text?', choicesEn: ['They are easier to learn', 'Their form contains imagery, history and philosophical reflection', 'They are purely phonetic', 'They have fewer nuances than the alphabet'], explanationEn: '字形本身往往蕴含着意象、历史与哲思 = their form holds imagery, history and philosophy.' },
      'c22l-q4': { promptEn: 'What twofold threat weighs on the richness of languages?', choicesEn: ['Wars and famines', 'Globalization and digitization', 'Urbanization and rural exodus', 'School standardization and media'], explanationEn: '全球化与数字化的双重冲击 = twin shocks of globalization and digitization.' },
    },
  },
};

// Fusionne les champs anglais dans chaque lecture
for (const L of LECTURES) {
  const e = LECTURE_EN[L.id];
  if (!e) continue;
  L.titleEn = e.titleEn;
  L.themeEn = e.themeEn;
  L.translationEn = e.translationEn;
  for (const q of L.questions) {
    const qe = e.q[q.id];
    if (qe) { q.promptEn = qe.promptEn; q.choicesEn = qe.choicesEn; q.explanationEn = qe.explanationEn; }
  }
}
