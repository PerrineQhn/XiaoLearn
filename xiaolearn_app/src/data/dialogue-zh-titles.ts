/**
 * dialogue-zh-titles.ts — Titres en chinois pour les dialogues
 * -------------------------------------------------------------
 * Même logique que reading-zh-titles : on stocke ici un titre chinois
 * (hanzi simplifié) par dialogue id pour que la vue détail et le catalogue
 * affichent le titre en chinois + la traduction FR/EN au pattern Seonsaengnim.
 *
 * Maintenance : ajouter une entrée à chaque nouveau dialogue.
 */

export const DIALOGUE_ZH_TITLES: Record<string, string> = {
  // ----- A1 -----
  'dlg-a1-hello': '校园初遇',
  'dlg-a1-family': '我家四口人',

  // ----- A2 -----
  'dlg-a2-restaurant': '来一份宫保鸡丁',
  'dlg-a2-metro': '请问天安门怎么走？',
  'dlg-a2-hotel': '住三晚，八零六',

  // ----- B1.1 -----
  'dlg-b11-interview': '第一次面试',

  // ----- B1.2 -----
  'dlg-b12-generations': '90后还是00后？',
  'dlg-b12-doctor': '咳嗽、发烧、38度2',

  // ----- B2.1 -----
  'dlg-b21-environment': '比亚迪还是特斯拉？',
  'dlg-b21-startup-pitch': '一亿五的医疗AI',

  // ----- B2.2 -----
  'dlg-b22-mental-health-debate': '直播间里的996',
  'dlg-b22-tea-culture': '茶与奶茶之争',

  // ===== Nouveaux dialogues =====
  "dlg-a1-phone": "交换手机号",
  "dlg-a1-classroom": "这个字怎么读",
  "dlg-a1-fruit": "买苹果",
  "dlg-a1-weather": "今天天气",
  "dlg-a1-cafe": "一杯热奶茶",
  "dlg-a1-time": "明天见面",
  "dlg-a2-post": "寄包裹去法国",
  "dlg-a2-pharmacy": "有点儿感冒",
  "dlg-a2-clothes": "买毛衣",
  "dlg-a2-taxi": "打车去机场",
  "dlg-a2-bank": "在银行开户",
  "dlg-b11-apartment": "看房租房",
  "dlg-b11-phoneplan": "办手机套餐",
  "dlg-b11-gym": "报名健身房",
  "dlg-b11-luggage": "行李丢了",
  "dlg-b11-complaint": "菜凉了",
  "dlg-b12-salary": "谈薪水和年假",
  "dlg-b12-return": "网购退货",
  "dlg-b12-exchange": "申请交换项目",
  "dlg-b12-neighbour": "和楼上邻居谈谈",
  "dlg-b21-remote": "远程办公之争",
  "dlg-b21-housing": "买房还是租房",
  "dlg-b21-ai-education": "人工智能进课堂",
  "dlg-b21-delivery": "算法与外卖骑手",
  "dlg-b22-climate": "碳中和的代价",
  "dlg-b22-heritage": "文物该归还吗",
  "dlg-b22-media": "走出信息茧房",
  "dlg-b22-aging": "退休年龄之争"
};

export const getDialogueZhTitle = (id: string): string | undefined =>
  DIALOGUE_ZH_TITLES[id];
