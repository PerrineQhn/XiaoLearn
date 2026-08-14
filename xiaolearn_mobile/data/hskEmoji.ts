/**
 * hskEmoji.ts — pictogrammes des mots concrets du HSK 1-2.
 *
 * L'examen réel des niveaux 1 et 2 repose massivement sur des IMAGES : on
 * écoute une phrase et on juge si la photo correspond, on associe un mot à
 * une image. Embarquer une banque de photos alourdirait le binaire pour deux
 * niveaux ; les emoji jouent le rôle de pictogrammes — moins réalistes qu'une
 * photo, mais sans ambiguïté pour les mots retenus ici.
 *
 * Règles de la table :
 *   - seuls les mots au référent VISUEL évident figurent ici (un chat, une
 *     pomme) — jamais d'abstraits (问题, 时间) ni de verbes ambigus ;
 *   - un emoji ne sert qu'une fois : deux mots partageant un pictogramme
 *     rendraient les questions indécidables ;
 *   - la clé doit être le hanzi EXACT de l'entrée du dictionnaire, sinon
 *     l'entrée est simplement ignorée à la génération (aucun risque).
 */
export const HSK_EMOJI: Record<string, string> = {
  // Animaux
  猫: '🐱', 狗: '🐶', 鱼: '🐟', 马: '🐴', 羊: '🐑', 鸟: '🐦',
  猪: '🐷', 牛: '🐮', 鸡: '🐔', 熊猫: '🐼',
  // Nourriture et boisson
  苹果: '🍎', 香蕉: '🍌', 西瓜: '🍉', 鸡蛋: '🥚', 米饭: '🍚',
  面条: '🍜', 茶: '🍵', 咖啡: '☕', 牛奶: '🥛', 面包: '🍞',
  蛋糕: '🍰', 糖: '🍬', 啤酒: '🍺', 葡萄: '🍇', 药: '💊',
  // Transports
  飞机: '✈️', 火车: '🚆', 出租车: '🚕', 公共汽车: '🚌',
  自行车: '🚲', 汽车: '🚗', 船: '⛵',
  // Nature et météo
  雨: '🌧️', 雪: '❄️', 太阳: '☀️', 月亮: '🌙', 山: '⛰️',
  花: '🌸', 树: '🌳', 海: '🌊', 星星: '⭐',
  // Lieux
  学校: '🏫', 医院: '🏥', 商店: '🏪', 饭馆: '🍽️', 银行: '🏦',
  机场: '🛫', 家: '🏠',
  // Objets
  书: '📖', 电脑: '💻', 电视: '📺', 手机: '📱', 椅子: '🪑',
  门: '🚪', 钱: '💰', 票: '🎫', 灯: '💡', 伞: '☂️',
  信: '✉️', 地图: '🗺️', 钥匙: '🔑', 报纸: '📰', 照相机: '📷',
  手表: '⌚', 眼镜: '👓', 礼物: '🎁', 足球: '⚽', 篮球: '🏀',
  // Vêtements
  衣服: '👕', 裤子: '👖', 鞋: '👟', 帽子: '🧢',
  // Corps
  眼睛: '👀', 手: '✋', 耳朵: '👂', 鼻子: '👃',
  // Personnes et métiers
  医生: '🧑‍⚕️', 老师: '🧑‍🏫', 学生: '🧑‍🎓',
  // Actions sans ambiguïté visuelle
  睡觉: '😴', 哭: '😭', 笑: '😄', 跑步: '🏃', 游泳: '🏊',
  唱歌: '🎤', 跳舞: '💃', 打电话: '📞', 写: '✍️',
};
