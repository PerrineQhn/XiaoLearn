/**
 * reading-zh-titles.ts — Titres en chinois pour les lectures
 * -----------------------------------------------------------
 * La structure `ReadingText` n'expose que `title` / `titleEn`. Pour reprendre
 * le pattern Seonsaengnim (hanzi en grand + traduction discrète au-dessous)
 * dans la vue détail, on stocke ici un titre chinois (hanzi simplifié) pour
 * chaque reading id. Si l'id n'a pas d'entrée, ReadingPlayer retombe sur le
 * titre FR/EN existant.
 *
 * Maintenance : ajouter une entrée à chaque création de reading.
 */

export const READING_ZH_TITLES: Record<string, string> = {
  // ----- A1 -----
  'rd-a1-my-day': '我在北京的一天',
  'rd-a1-my-room': '我的房间',
  'rd-a1-restaurant': '今晚吃什么？',
  'rd-a1-subway': '挤、吵、准时',

  // ----- A2 -----
  'rd-a2-travel': '西安周末游',
  'rd-a2-market': '早市的一个上午',
  'rd-a2-doctor-visit': '医生，我肚子疼',
  'rd-a2-birthday': '蛋糕、卡拉OK和惊喜',

  // ----- B1.1 -----
  'rd-b11-work': '三个月的成长',
  'rd-b11-roommate': '我的新室友',
  'rd-b11-mid-autumn': '月圆饼圆',
  'rd-b11-spring-festival': '春节回家',

  // ----- B1.2 -----
  'rd-b12-gaokao': '高考独木桥',
  'rd-b12-delivery': '三十分钟送达',
  'rd-b12-change-moon': '嫦娥奔月',

  // ----- B2.1 -----
  'rd-b21-environment': '中国的绿色赌注',
  'rd-b21-ai-work': '人工智能会抢饭碗吗？',
  'rd-b21-post-pandemic-economy': '后疫情时代：真的复苏了？',
  'rd-b21-analects-excerpt': '孔子三则',
  'rd-b21-aging-society': '一起变老',
  'rd-b21-wukong-heaven': '大闹天宫',
  'rd-b21-cowherd-weaver': '牛郎织女',

  // ----- B2.2 -----
  'rd-b22-intangible-heritage': '手艺的坚持',
  'rd-b22-smart-city': '智慧城市来了',
  'rd-b22-white-snake': '白蛇传',

  // ----- C1.1 -----
  'rd-c11-hanfu-revival': '汉服复兴',
  'rd-c11-laozi-wisdom': '老子今读',
  'rd-c11-butterfly-lovers': '梁山伯与祝英台',

  // ----- C1.2 -----
  'rd-c12-china-france': '中法六十年',
  'rd-c12-education-21c': '重塑明日校园',
  'rd-c12-yingning-fox': '婴宁',

  // ----- C2.1 -----
  'rd-c21-river-and-time': '大江与时光',
  'rd-c21-mulan': '花木兰从军',

  // ----- C2.2 -----
  'rd-c22-hometown': '故乡的味道'
};

export const getReadingZhTitle = (id: string): string | undefined =>
  READING_ZH_TITLES[id];
