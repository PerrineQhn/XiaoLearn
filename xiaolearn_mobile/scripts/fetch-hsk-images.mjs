/**
 * fetch-hsk-images.mjs — télécharge les photos réelles du simulateur HSK.
 *
 * Usage, depuis xiaolearn_mobile/ :
 *
 *   node scripts/fetch-hsk-images.mjs VOTRE_CLE_PEXELS
 *   (ou : PEXELS_API_KEY=xxx node scripts/fetch-hsk-images.mjs)
 *
 * Pour chaque mot illustrable du HSK 1-2 (la même liste que hskEmoji.ts),
 * le script interroge l'API Pexels avec une requête anglaise choisie à la
 * main — « 票 » cherche « train ticket », pas « ticket » qui renvoie des
 * billets de concert — télécharge une vignette recadrée (~390×260, JPEG
 * ~20 Ko), puis régénère data/hskImages.ts avec les require() correspondants.
 *
 * Idempotent : une photo déjà présente dans assets/hsk-pics/ n'est pas
 * retéléchargée. Pour remplacer une photo mal choisie, supprimer son .jpg
 * et relancer. Licence Pexels : usage libre, attribution non requise.
 */
import { mkdir, writeFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = path.join(ROOT, 'assets', 'hsk-pics');
const TABLE = path.join(ROOT, 'data', 'hskImages.ts');

const KEY = process.argv[2] ?? process.env.PEXELS_API_KEY;
if (!KEY) {
  console.error('Clé Pexels manquante. Usage : node scripts/fetch-hsk-images.mjs VOTRE_CLE');
  process.exit(1);
}

/** hanzi → [slug de fichier, requête Pexels]. Mêmes clés que hskEmoji.ts. */
const WORDS = {
  // Animaux
  猫: ['mao-cat', 'cat portrait'],
  狗: ['gou-dog', 'dog portrait'],
  鱼: ['yu-fish', 'fish underwater'],
  马: ['ma-horse', 'horse field'],
  羊: ['yang-sheep', 'sheep grass'],
  鸟: ['niao-bird', 'bird branch'],
  猪: ['zhu-pig', 'pig farm'],
  牛: ['niu-cow', 'cow field'],
  鸡: ['ji-chicken', 'chicken hen'],
  熊猫: ['xiongmao-panda', 'giant panda'],
  // Nourriture et boisson
  苹果: ['pingguo-apple', 'red apple fruit'],
  香蕉: ['xiangjiao-banana', 'yellow bananas bunch'],
  西瓜: ['xigua-watermelon', 'watermelon slice'],
  鸡蛋: ['jidan-egg', 'chicken eggs'],
  米饭: ['mifan-rice', 'bowl of white rice'],
  面条: ['miantiao-noodles', 'chinese noodles bowl'],
  茶: ['cha-tea', 'cup of tea leaves'],
  咖啡: ['kafei-coffee', 'cup of coffee'],
  牛奶: ['niunai-milk', 'glass of milk'],
  面包: ['mianbao-bread', 'loaf of bread'],
  蛋糕: ['dangao-cake', 'birthday cake'],
  糖: ['tang-candy', 'colorful candy'],
  啤酒: ['pijiu-beer', 'glass of beer'],
  葡萄: ['putao-grapes', 'bunch of grapes'],
  药: ['yao-medicine', 'medicine pills'],
  // Transports
  飞机: ['feiji-plane', 'airplane sky'],
  火车: ['huoche-train', 'train railway'],
  出租车: ['chuzuche-taxi', 'yellow taxi city'],
  公共汽车: ['gonggongqiche-bus', 'public bus street side view'],
  自行车: ['zixingche-bicycle', 'bicycle leaning against wall'],
  汽车: ['qiche-car', 'red car parked street'],
  船: ['chuan-boat', 'boat water'],
  // Nature et météo
  雨: ['yu-rain', 'rain window drops'],
  雪: ['xue-snow', 'snow landscape'],
  太阳: ['taiyang-sun', 'sun sky bright'],
  月亮: ['yueliang-moon', 'full moon night'],
  山: ['shan-mountain', 'mountain landscape'],
  花: ['hua-flower', 'flower bloom'],
  树: ['shu-tree', 'single tree field'],
  海: ['hai-sea', 'sea waves beach'],
  星星: ['xingxing-stars', 'starry night sky milky way'],
  // Lieux
  学校: ['xuexiao-school', 'school building classroom'],
  医院: ['yiyuan-hospital', 'hospital building'],
  商店: ['shangdian-shop', 'grocery store front'],
  饭馆: ['fanguan-restaurant', 'chinese restaurant interior'],
  银行: ['yinhang-bank', 'bank building facade'],
  机场: ['jichang-airport', 'airport terminal'],
  家: ['jia-home', 'cozy house exterior'],
  // Objets
  书: ['shu-book', 'open book'],
  电脑: ['diannao-computer', 'laptop computer desk'],
  电视: ['dianshi-tv', 'television living room'],
  手机: ['shouji-phone', 'smartphone hand'],
  椅子: ['yizi-chair', 'wooden chair'],
  门: ['men-door', 'wooden front door close'],
  钱: ['qian-money', 'chinese yuan banknotes'],
  票: ['piao-ticket', 'paper tickets stubs'],
  灯: ['deng-lamp', 'bedside lamp glowing'],
  伞: ['san-umbrella', 'person holding red umbrella rain'],
  信: ['xin-letter', 'envelope letter'],
  地图: ['ditu-map', 'world map atlas paper'],
  钥匙: ['yaoshi-key', 'keys keychain'],
  报纸: ['baozhi-newspaper', 'newspaper'],
  照相机: ['zhaoxiangji-camera', 'photo camera'],
  手表: ['shoubiao-watch', 'wristwatch'],
  眼镜: ['yanjing-glasses', 'eyeglasses'],
  礼物: ['liwu-gift', 'gift box ribbon'],
  足球: ['zuqiu-football', 'soccer ball grass'],
  篮球: ['lanqiu-basketball', 'basketball'],
  // Vêtements
  衣服: ['yifu-clothes', 'clothes hanging rack'],
  裤子: ['kuzi-trousers', 'jeans trousers'],
  鞋: ['xie-shoes', 'pair of sneakers'],
  帽子: ['maozi-hat', 'baseball cap hat'],
  // Corps
  眼睛: ['yanjing2-eye', 'human eye close up'],
  手: ['shou-hand', 'open hand palm'],
  耳朵: ['erduo-ear', 'human ear close up'],
  鼻子: ['bizi-nose', 'woman face profile nose portrait'],
  // Personnes et métiers
  医生: ['yisheng-doctor', 'doctor stethoscope'],
  老师: ['laoshi-teacher', 'teacher blackboard'],
  学生: ['xuesheng-student', 'students studying classroom'],
  // Actions
  睡觉: ['shuijiao-sleep', 'person sleeping bed'],
  哭: ['ku-cry', 'child crying'],
  笑: ['xiao-laugh', 'person laughing happy'],
  跑步: ['paobu-run', 'person running jogging'],
  游泳: ['youyong-swim', 'person swimming pool'],
  唱歌: ['changge-sing', 'person singing microphone'],
  跳舞: ['tiaowu-dance', 'people dancing'],
  打电话: ['dadianhua-call', 'person talking on phone'],
  写: ['xie2-write', 'hand writing pen paper'],
};

const exists = (p) => access(p).then(() => true, () => false);

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const entries = Object.entries(WORDS);
  const done = [];
  let fetched = 0, skipped = 0, failed = 0;

  for (const [hanzi, [slug, query]] of entries) {
    const file = path.join(OUT_DIR, `${slug}.jpg`);
    if (await exists(file)) { done.push([hanzi, slug]); skipped++; continue; }

    try {
      const res = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
        { headers: { Authorization: KEY } },
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      const photo = json.photos?.[0];
      if (!photo) throw new Error('aucun résultat');

      // Vignette recadrée côté serveur : ~390×260, JPEG compressé.
      const url = `${photo.src.original}?auto=compress&cs=tinysrgb&fit=crop&w=390&h=260`;
      const img = await fetch(url);
      if (!img.ok) throw new Error(`image HTTP ${img.status}`);
      await writeFile(file, Buffer.from(await img.arrayBuffer()));
      done.push([hanzi, slug]);
      fetched++;
      console.log(`✓ ${hanzi} ← « ${query} » (${photo.photographer})`);
      // Politesse envers le quota gratuit (200 requêtes/heure).
      await new Promise(r => setTimeout(r, 350));
    } catch (e) {
      failed++;
      console.warn(`✗ ${hanzi} (${query}) : ${e.message} — l'emoji restera en secours`);
    }
  }

  // Régénère la table des require().
  const lines = done
    .sort((a, b) => a[1].localeCompare(b[1]))
    .map(([hanzi, slug]) => `  ${hanzi}: require('../assets/hsk-pics/${slug}.jpg'),`);
  const ts = `/**
 * hskImages.ts — photos réelles des mots concrets du HSK 1-2.
 *
 * GÉNÉRÉ par scripts/fetch-hsk-images.mjs — ne pas éditer à la main.
 * Photos Pexels (licence libre, attribution non requise), vignettes JPEG
 * ~390×260 embarquées dans le binaire. L'écran retombe sur l'emoji de
 * hskEmoji.ts pour tout mot absent de cette table.
 */

// prettier-ignore
export const HSK_IMAGES: Record<string, number> = {
${lines.join('\n')}
};
`;
  await writeFile(TABLE, ts);
  console.log(`\n${fetched} téléchargées, ${skipped} déjà là, ${failed} en échec — table régénérée (${done.length} entrées).`);
}

main();
