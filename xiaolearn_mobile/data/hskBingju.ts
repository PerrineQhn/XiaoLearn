/**
 * hskBingju.ts — banque de 病句 pour la lecture du HSK 6.
 *
 * Le 病句 (« phrase malade ») est l'exercice signature du HSK 6 : quatre
 * phrases, une seule contient une faute — redondance, structure télescopée,
 * collocation impossible, sujet escamoté… Ces items ne se fabriquent pas par
 * permutation de dictionnaire : chaque faute est écrite à la main sur un
 * patron d'erreur classique de l'examen, avec son explication.
 *
 * Convention : `sentences[0]` est TOUJOURS la phrase fautive ; l'ordre est
 * mélangé à la génération. Les trois autres sont correctes et de difficulté
 * comparable, pour que la fautive ne se repère pas à sa longueur.
 */
export interface BingjuItem {
  id: string;
  /** Quatre phrases ; la première est la fautive. */
  sentences: [string, string, string, string];
  /** La faute, expliquée sur la copie. */
  explanationFr: string;
}

export const HSK_BINGJU: BingjuItem[] = [
  {
    id: 'bj-01',
    sentences: [
      '通过这次活动，使我学到了很多东西。',
      '他把行李放在了火车站的储物柜里。',
      '她一边听音乐，一边准备晚饭。',
      '我们对这个计划的结果很满意。',
    ],
    explanationFr: "« 通过…使… » escamote le sujet : il faut supprimer 通过 ou 使 (这次活动使我学到了很多 / 通过这次活动，我学到了很多).",
  },
  {
    id: 'bj-02',
    sentences: [
      '我们班大约有五十个左右的学生。',
      '这个问题我们已经讨论过三次了。',
      '他对中国古代历史特别感兴趣。',
      '天气越来越暖和了。',
    ],
    explanationFr: '大约 et 左右 expriment tous deux l\'approximation : il faut choisir (大约有五十个 / 有五十个左右).',
  },
  {
    id: 'bj-03',
    sentences: [
      '能否顺利毕业，关键在于平时的努力学习。',
      '只有多练习，才能提高口语水平。',
      '虽然下着大雨，但是他还是准时来了。',
      '我们应该学会珍惜时间。',
    ],
    explanationFr: "« 能否 » pose deux faces (réussir ou non) mais « 在于努力 » n'en couvre qu'une : il faut 在于是否努力, ou supprimer 能否.",
  },
  {
    id: 'bj-04',
    sentences: [
      '王教授是一位有三十多年教学经验。',
      '这家公司的产品在国外很受欢迎。',
      '他每天坚持跑步半个小时。',
      '会议的时间改到了下星期五。',
    ],
    explanationFr: 'Le groupe « 有三十多年教学经验 » qualifie un nom qui manque : il faut compléter — 一位有三十多年教学经验的老师.',
  },
  {
    id: 'bj-05',
    sentences: [
      '为了防止这类事故不再发生，我们加强了安全管理。',
      '这本小说被翻译成了十几种语言。',
      '他一毕业就找到了一份满意的工作。',
      '无论遇到什么困难，她都不放弃。',
    ],
    explanationFr: '防止 + 不再发生 = double négation : on obtient le contraire du sens voulu. Correct : 为了防止这类事故再次发生.',
  },
  {
    id: 'bj-06',
    sentences: [
      '他穿着一件灰色的上衣，戴着一顶帽子和一双皮鞋。',
      '孩子们在操场上高兴地做游戏。',
      '这个消息很快就传遍了全公司。',
      '她把房间打扫得干干净净。',
    ],
    explanationFr: '戴 ne se combine pas avec 皮鞋 (on « porte » des chaussures avec 穿) : la collocation 戴…皮鞋 est impossible.',
  },
  {
    id: 'bj-07',
    sentences: [
      '这次比赛的结果完全出乎人们的意料之外。',
      '随着经济的发展，人们的生活水平不断提高。',
      '他认真地检查了每一个细节。',
      '这座桥已经有一百多年的历史了。',
    ],
    explanationFr: '出乎意料 contient déjà « hors de » : ajouter 之外 est redondant. Correct : 出乎人们的意料.',
  },
  {
    id: 'bj-08',
    sentences: [
      '我们要养成节约用水的好习惯和意识。',
      '经过讨论，大家的意见终于统一了。',
      '他连最简单的问题都回答不出来。',
      '图书馆里安静得能听见翻书的声音。',
    ],
    explanationFr: '养成 se combine avec 习惯 mais pas avec 意识 (on dit 树立意识) : le double complément casse la collocation.',
  },
  {
    id: 'bj-09',
    sentences: [
      '他昨天没来上课的原因是因为感冒了。',
      '这里的风景美得像一幅画。',
      '她的汉语说得比以前流利多了。',
      '大家都被他的故事感动了。',
    ],
    explanationFr: '原因是 et 因为 disent deux fois la cause : il faut choisir (原因是感冒了 / 是因为感冒了).',
  },
  {
    id: 'bj-10',
    sentences: [
      '无论天气很热，他都坚持锻炼身体。',
      '不管别人怎么说，他都不改变主意。',
      '正是因为有了大家的帮助，他才走出了困境。',
      '即使明天下雨，比赛也照常进行。',
    ],
    explanationFr: '无论 exige une alternative ou une interrogation (多热 / 冷热), pas une affirmation : 无论天气多热 ou 即使天气很热.',
  },
  {
    id: 'bj-11',
    sentences: [
      '他的家乡是上海人。',
      '北京的秋天是一年中最舒服的季节。',
      '这家餐厅的菜以四川口味为主。',
      '他从小就对绘画产生了浓厚的兴趣。',
    ],
    explanationFr: 'Sujet et attribut ne s\'accordent pas : 家乡 (un lieu) ne peut pas être 上海人 (une personne). Correct : 他是上海人 / 他的家乡是上海.',
  },
  {
    id: 'bj-12',
    sentences: [
      '他把作业没做完就去踢足球了。',
      '请大家把手机调成静音模式。',
      '她不小心把钥匙锁在了房间里。',
      '我们把会议记录整理好了。',
    ],
    explanationFr: 'Dans une phrase en 把, la négation précède 把 : 他没把作业做完, et non 把作业没做完.',
  },
  {
    id: 'bj-13',
    sentences: [
      '她唱歌唱得非常好听极了。',
      '今天的会议开得很成功。',
      '这个孩子聪明得让人吃惊。',
      '他高兴得一晚上没睡着觉。',
    ],
    explanationFr: '非常 et 极了 marquent tous deux le degré extrême : ils ne se cumulent pas (非常好听 / 好听极了).',
  },
  {
    id: 'bj-14',
    sentences: [
      '我们明天大概八点钟准时出发。',
      '火车预计晚点四十分钟左右。',
      '他每天早上六点准时起床。',
      '这项工程大约需要两年时间。',
    ],
    explanationFr: '大概 (approximation) contredit 准时 (exactitude) : il faut choisir — 大概八点出发 ou 八点准时出发.',
  },
  {
    id: 'bj-15',
    sentences: [
      '他学习汉语了三年，说得已经很不错了。',
      '这部电影我看了两遍，还想再看一遍。',
      '他在这家公司工作了十年。',
      '我们等了他半个小时，他才来。',
    ],
    explanationFr: 'Le complément de durée ne se place pas après 了 accolé à l\'objet : 他学了三年汉语 ou 他学汉语学了三年.',
  },
  {
    id: 'bj-16',
    sentences: [
      '他比我更喜欢音乐得多。',
      '今年的销售额比去年增加了百分之二十。',
      '这条路比那条近得多。',
      '他跑得比谁都快。',
    ],
    explanationFr: '更 et 得多 marquent tous deux l\'écart dans la comparaison : ils ne se cumulent pas (比我更喜欢 / 比我喜欢得多).',
  },
  {
    id: 'bj-17',
    sentences: [
      '我们参观了博物馆里许多珍贵的文物。',
      '代表团访问了三个欧洲国家。',
      '同学们认真地听老师讲课。',
      '展览会上展出了不少现代艺术作品。',
    ],
    explanationFr: '参观 prend un LIEU pour objet (参观博物馆) : pour des objets, on dit 观赏/看到了许多珍贵的文物.',
  },
  {
    id: 'bj-18',
    sentences: [
      '经过治疗，他的病已经恢复了健康。',
      '医生建议他多休息，少熬夜。',
      '手术以后，她的身体一天比一天好。',
      '这种药一天吃三次，一次吃两片。',
    ],
    explanationFr: 'Le sujet 病 ne s\'accorde pas avec 恢复健康 : c\'est la personne qui recouvre la santé — 他已经恢复了健康 / 他的病已经好了.',
  },
  {
    id: 'bj-19',
    sentences: [
      '这本小说的作者是一位著名的法国作家写的。',
      '这座大楼是去年年底建成的。',
      '那幅画是他花三个月时间完成的。',
      '这个故事是根据真实事件改编的。',
    ],
    explanationFr: 'Deux structures télescopées : 作者是一位作家 et 小说是…写的. Il faut en garder une seule.',
  },
  {
    id: 'bj-20',
    sentences: [
      '春天的杭州是一年中最美的季节。',
      '杭州的春天常常细雨蒙蒙。',
      '西湖的景色吸引了世界各地的游客。',
      '当地人喜欢在湖边散步喝茶。',
    ],
    explanationFr: 'Sujet et attribut inversés : 杭州 (une ville) ne peut pas être 季节 (une saison). Correct : 杭州的春天是一年中最美的季节.',
  },
];
