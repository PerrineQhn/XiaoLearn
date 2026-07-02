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
  'dlg-b22-tea-culture': '茶与奶茶之争'
};

export const getDialogueZhTitle = (id: string): string | undefined =>
  DIALOGUE_ZH_TITLES[id];
