import LESSON_CONTENT_EN from './lessonContentEn.json';
export interface LessonContent {
  title: string;
  titleEn?: string;
  duration: number;
  category: string;
  difficulty: string;
  introTitle: string;
  introTitleEn?: string;
  introContent: string;
  introContentEn?: string;
  objectives: string[];
  objectivesEn?: string[];
  flashcards: string[];
}

export const LESSON_CONTENT: Record<string, LessonContent> = {
  "cecr-a1-pinyin-m1": {
    title: `Les 4 tons du mandarin`, titleEn: `The 4 tones of Mandarin`,
    duration: 15,
    category: `pronunciation`,
    difficulty: `beginner`,
    introTitle: `Même syllabe, 4 sens différents`,
    introContent: `**妈 (mā) / 麻 (má) / 马 (mǎ) / 骂 (mà)** — même syllabe, 4 mots : le ton, c'est le sens.

Le mandarin n'a pas d'accent tonique comme en français. La mélodie de chaque syllabe est obligatoire et porteuse de sens.

- **Ton 1** : aigu et plat — tenir la note haute (mā 妈 maman).
- **Ton 2** : montant — comme une question en français (má 麻 chanvre).
- **Ton 3** : descendant puis remontant — le plus long (mǎ 马 cheval).
- **Ton 4** : descendant sec et bref (mà 骂 gronder).

**Piège A1 :** le ton 3 se raccourcit à mi-descente dans la parole rapide. Ne le traîne pas.`,
    objectives: [`Reconnaître à l'oreille les 4 tons sur une même syllabe (mā má mǎ mà)`, `Reproduire le mouvement mélodique de chaque ton`, `Lire la notation pinyin avec accents (ā á ǎ à)`, `Éviter l'erreur classique : prononcer un ton 3 trop long`],
    flashcards: [`mā`, `má`, `mǎ`, `mà`, `ma`, `一`, `二`, `三`, `四`],
  },
  "cecr-a1-pinyin-m2": {
    title: `Initiales : b p m f d t n l`, titleEn: `Initials: b p m f d t n l`,
    duration: 12,
    category: `pronunciation`,
    difficulty: `beginner`,
    introTitle: `b/p : l'aspiration, pas la sonorité`,
    introContent: `Ces 8 initiales ressemblent aux consonnes françaises — mais **b/p** et **d/t** fonctionnent différemment.

En français, b/p se distinguent par la vibration des cordes vocales. En mandarin, ils se distinguent par **l'aspiration** — le souffle d'air.

- **p (pá 爬)** : souffle fort, éteint une bougie tenue devant la bouche.
- **b (bā 八)** : presque pas de souffle.

**Test pratique :** tiens ta main à 5 cm de ta bouche. Pour p/t/k, tu dois sentir le souffle. Pour b/d/g, presque rien.

**Autres initiales :** m, f, n, l se prononcent quasi identiquement au français.`,
    objectives: [`Distinguer b/p par l'aspiration, pas la sonorité`, `Prononcer 爸爸 (bàba) vs 怕 (pà) sans confusion`, `Lire 妈 ma, 大 dà, 你 nǐ, 来 lái au premier essai`, `Repérer l'initiale d'une syllabe en pinyin`],
    flashcards: [`爸`, `妈`, `不`, `大`, `他`, `你`, `来`, `了`],
  },
  "cecr-a1-pinyin-m3": {
    title: `Initiales : g k h j q x`, titleEn: `Initials: g k h j q x`,
    duration: 12,
    category: `pronunciation`,
    difficulty: `beginner`,
    introTitle: `j/q/x : sourire et langue plate`,
    introContent: `**g / k / h** se prononcent proches du français. Nuance : **h (好 hǎo)** est plus rauque que le h français — pense au « j » espagnol de « jota ».

**j / q / x** sont des sons propres au mandarin, toujours suivis de i ou ü.

- **j** ≈ dj très doux (家 jiā maison).
- **q** ≈ tch doux (去 qù partir).
- **x** ≈ ch léger et sifflé (小 xiǎo petit).

**Astuce corporelle :** souris largement — les lèvres tirées en arrière aident à placer ces sons au bon endroit dans la bouche.

**Piège :** ne prononce pas x comme le « ch » français épais. Il est plus léger, presque sifflé.`,
    objectives: [`Aplatir la langue au palais pour j/q/x`, `Distinguer 家 jiā, 去 qù, 小 xiǎo`, `Ne pas prononcer 'h' comme un 'h' français muet`, `Reproduire 哥哥 gēge et 看 kàn`],
    flashcards: [`哥`, `看`, `好`, `家`, `去`, `小`, `喝`, `今天`],
  },
  "cecr-a1-pinyin-m4": {
    title: `Initiales : zh ch sh r z c s`, titleEn: `Initials: zh ch sh r z c s`,
    duration: 14,
    category: `pronunciation`,
    difficulty: `beginner`,
    introTitle: `zh/ch/sh/r : la langue qui se recourbe`,
    introContent: `**zh / ch / sh / r** sont rétroflexes : la langue se recourbe vers le haut-arrière du palais, sans toucher les dents.

- **z / c / s** sont sifflants : langue plate contre les dents inférieures.

Ces deux groupes s'opposent directement :

- 四 **(sì)** langue plate ≠ 是 **(shì)** langue recourbée.
- 在 **(zài)** ≠ 这 **(zhè)**.

**Piège francophone :** ne rétroflexe pas trop — exagérer donne un accent américain. Un léger recourbe suffit.

**Info culturelle :** l'accent pékinois rétroflexe beaucoup (er-hua), les parlers du Sud moins. Les deux sont compris partout.`,
    objectives: [`Recourber la langue pour zh/ch/sh/r`, `Distinguer 是 shì vs 四 sì`, `Placer la langue plate pour z/c/s`, `Prononcer 中国 Zhōngguó et 吃 chī`],
    flashcards: [`中`, `吃`, `是`, `人`, `字`, `菜`, `说`, `什么`],
  },
  "cecr-a1-pinyin-m5": {
    title: `Finales & diphtongues`, titleEn: `Finals & diphthongs`,
    duration: 12,
    category: `pronunciation`,
    difficulty: `beginner`,
    introTitle: `ü comme « lune » + -ng sans prononcer le g`,
    introContent: `La finale est la partie après la consonne initiale. Elle peut être simple (**a, o, e, i, u, ü**) ou composée (**ai, ei, ao, an, ang, eng...**).

Deux points souvent ratés :

**1. Le ü :** prononce-le comme le « u » français de « lune » ou « rue ». Après j, q, x, y — il s'écrit simplement « u » mais reste ce son.

**2. La nasale -ng :** le son résonne dans le nez mais le « g » n'est JAMAIS prononcé. 冷 (lěng) = le son nasal s'entend, le g disparaît.

- **-an** (ouvert) ≠ **-ang** (profond, comme « ah » nasal).

**Mémotechnique :** ü = lèvres en « u » de « but » + son « i » de « si » — les deux à la fois.`,
    objectives: [`Prononcer le 'ü' comme le 'u' français`, `Nasaliser -ng sans dire le 'g'`, `Différencier -an (clair) vs -ang (profond)`, `Lire 爱 ài, 要 yào, 冷 lěng`],
    flashcards: [`爱`, `要`, `也`, `月`, `有`, `冷`, `能`, `还`],
  },
  "cecr-a1-pinyin-m6": {
    title: `Sandhi du 3e ton & changements 不/一`, titleEn: `3rd-tone sandhi & 不/一 shifts`,
    duration: 14,
    category: `pronunciation`,
    difficulty: `elementary`,
    introTitle: `3+3 → 2+3 : la règle automatique du sandhi`,
    introContent: `Le mandarin évite deux 3e tons de suite. La règle est **automatique et obligatoire** :

**Règle 3+3 :** deux 3e tons → le premier monte au 2e ton.
- 你好 s'écrit nǐ hǎo mais se prononce **ní hǎo**.

**Règle 不 :** 不 (bù, 4e ton) devient **bú** devant un autre 4e ton.
- 不是 → **bú shì** · 不要 → **bú yào** · 不对 → **bú duì**

**Règle 一 :** le ton de 一 change selon ce qui suit.
- Devant ton 4 : yī → **yí** (一定 yídìng).
- Devant tons 1, 2, 3 : yī → **yì** (一起 yìqǐ).

Pas besoin de réfléchir — en pratiquant, ces changements deviennent instinctifs.`,
    objectives: [`Appliquer le sandhi 3+3 → 2+3 automatiquement`, `Changer 不 en bú devant un 4e ton`, `Adapter le ton de 一 selon la suite`, `Dire 你好 (ní hǎo) sans hésiter`],
    flashcards: [`你好`, `很好`, `不是`, `不要`, `一个`, `一起`, `很多`, `走`],
  },
  "cecr-a1-hello-m1": {
    title: `Dire bonjour & au revoir`, titleEn: `Say hello & goodbye`,
    duration: 10,
    category: `conversation`,
    difficulty: `beginner`,
    introTitle: `你好 ou 您好 ? L'heure et le registre`,
    introContent: `**你好 (nǐ hǎo)** est la salutation universelle. **您好 (nín hǎo)** est sa version polie — à utiliser avec un client, une personne âgée ou un supérieur.

**Piège :** ne dis pas 您好 entre amis du même âge — ça sonne froid et distant.

Le chinois précise souvent l'heure de la journée :

- 早上好 (zǎoshang hǎo) = bonjour (matin).
- 下午好 (xiàwǔ hǎo) = bon après-midi.
- 晚上好 (wǎnshàng hǎo) = bonsoir.

Pour partir : **再见 (zàijiàn)** est standard · **明天见** = à demain · **晚安** = bonne nuit · **拜拜** = à l'oral familier entre amis.`,
    objectives: [`Choisir entre 你好 et 您好 selon le contexte`, `Utiliser 早上好 / 晚上好 selon l'heure`, `Varier les au revoir : 再见 / 明天见 / 晚安`, `Éviter de dire 您好 entre amis (trop formel)`],
    flashcards: [`你好`, `您好`, `早上好`, `晚上好`, `再见`, `明天见`, `晚安`, `拜拜`],
  },
  "cecr-a1-hello-m2": {
    title: `Merci & s'excuser`, titleEn: `Thanks & apologies`,
    duration: 10,
    category: `conversation`,
    difficulty: `beginner`,
    introTitle: `对不起 vs 不好意思 : quel désolé choisir ?`,
    introContent: `**谢谢 (xièxie)** pour remercier. Les réponses attendues : **不客气 (bú kèqi)** = de rien · **没事 (méishì)** = c'est rien (familier).

Deux façons de s'excuser, selon la gravité :

- **对不起 (duìbuqǐ)** : excuse sérieuse — tu as vraiment fait quelque chose de mal. Réponse : **没关系 (méi guānxi)**.
- **不好意思 (bù hǎoyìsi)** : excuse légère — tu déranges, tu es gêné. Aussi pour interpeller un inconnu dans la rue.

**请 (qǐng)** : s'il vous plaît — mais aussi pour inviter (« je t'en prie »). Il se place **toujours en début de phrase**, jamais à la fin.

**Piège :** utiliser 对不起 pour quelque chose de bénin — ça donne une fausse gravité. Préfère 不好意思 pour 90 % des situations.`,
    objectives: [`Distinguer 对不起 (grave) de 不好意思 (léger)`, `Répondre correctement : 不客气, 没关系`, `Interpeller un inconnu avec 不好意思`, `Utiliser 请 dans les deux sens (svp / je vous en prie)`],
    flashcards: [`谢谢`, `不客气`, `对不起`, `没关系`, `不好意思`, `请`, `打扰了`, `麻烦你`],
  },
  "cecr-a1-hello-m3": {
    title: `Se présenter`, titleEn: `Introduce yourself`,
    duration: 12,
    category: `conversation`,
    difficulty: `beginner`,
    introTitle: `我叫 ou 我姓 ? Deux façons de se présenter`,
    introContent: `Deux structures pour se présenter :

- **我叫 (wǒ jiào) + prénom/nom complet** : usage quotidien — « on m'appelle X ».
- **我姓 (wǒ xìng) + nom de famille** : contexte formel — souvent suivi de 我叫 + prénom.

**Pour demander :** 你叫什么名字 (nǐ jiào shénme míngzi) ? = comment t'appelles-tu ?

**Formule d'enchantement :** après une présentation, dis **很高兴认识你 (hěn gāoxìng rènshi nǐ)** (enchanté de te connaître). L'autre répond souvent **我也是 (wǒ yě shì)** = moi aussi.

**Note culturelle :** le nom de famille vient EN PREMIER en chinois. 王伟 (Wáng Wěi) = M. Wang, prénom Wěi.`,
    objectives: [`Se présenter avec 我叫 + nom complet`, `Utiliser 我姓 dans un contexte formel`, `Demander 你叫什么名字 ?`, `Répondre 很高兴认识你, 我也是`],
    flashcards: [`我叫`, `我是`, `你叫什么`, `名字`, `很高兴`, `认识`, `你呢`, `我也是`],
  },
  "cecr-a1-hello-m4": {
    title: `D'où viens-tu ?`, titleEn: `Where are you from?`,
    duration: 10,
    category: `conversation`,
    difficulty: `beginner`,
    introTitle: `我是法国人 : pays + 人 = nationalité`,
    introContent: `Deux structures pour parler de son origine :

- **我来自 (wǒ láizì) + pays** : je viens de... (mouvement, origine).
- **我是 (wǒ shì) + pays + 人 (rén)** : je suis... -ais/-ois.

**Recette nationalité : pays + 人 (rén)**
- 法国 (fǎguó) + 人 → **法国人** (Français)
- 中国 (Zhōngguó) + 人 → **中国人** (Chinois)
- 美国 (měiguó) + 人 → **美国人** (Américain)

**Pour demander :** 你是哪国人 (nǐ shì nǎ guó rén) ? = tu es de quel pays ?

**Piège :** ne dis pas 我是来自法国人 — c'est une fusion des deux structures. Choisis l'une ou l'autre.`,
    objectives: [`Choisir entre 我来自X et 我是X人`, `Former une nationalité en ajoutant 人`, `Poser 你是哪国人 ?`, `Répondre naturellement sans hésiter`],
    flashcards: [`哪里`, `来自`, `中国`, `法国`, `美国`, `英国`, `国家`, `人`],
  },
  "cecr-a1-numbers-m1": {
    title: `Compter de 0 à 10`, titleEn: `Count 0 to 10`,
    duration: 10,
    category: `vocabulary`,
    difficulty: `beginner`,
    introTitle: `0 à 10 : les briques de TOUS les nombres`,
    introContent: `Avec seulement 11 caractères (0 à 10), tu peux former **n'importe quel nombre** en chinois — la langue est purement logique.

零 一 二 三 四 五 六 七 八 九 十

**À retenir dès maintenant :**

- 一 (yī), 二 (èr), 三 (sān)... les tons sont fixes — mémorise-les ensemble.
- **Exception importante :** 两 (liǎng) remplace 二 (èr) quand on compte des objets avec un classificateur : 两个人 (deux personnes), jamais 二个人.

**Bonne nouvelle :** 一 二 三 sont parmi les caractères les plus simples à écrire — commence par eux pour t'habituer au pinceau (ou au stylet).`,
    objectives: [`Mémoriser 0-10 en caractères et pinyin`, `Connaître la nuance 二 (abstrait) vs 两 (comptable)`, `Lire une date simple : 六月八日`, `Prononcer avec le bon ton (一 yī, 二 èr, 三 sān...)`],
    flashcards: [`零`, `一`, `二`, `三`, `四`, `五`, `六`, `七`, `八`, `九`, `十`],
  },
  "cecr-a1-numbers-m2": {
    title: `De 11 à 100`, titleEn: `From 11 to 100`,
    duration: 10,
    category: `vocabulary`,
    difficulty: `beginner`,
    introTitle: `11 = 十一, 21 = 二十一 — logique pure`,
    introContent: `Le système chinois est une addition transparente — aucune exception jusqu'à 10 000 :

- 十一 (shí yī) = 10+1 = 11
- 二十 (èr shí) = 2×10 = 20
- 二十一 (èr shí yī) = 2×10+1 = 21

**Zéro intercalaire obligatoire :** 一百零五 (yī bǎi líng wǔ) = 105. Le 零 marque la « dizaine vide » — sans lui, on dirait 1005.

**Unités importantes :**
- 百 (bǎi) = 100 · 千 (qiān) = 1 000 · **万 (wàn) = 10 000**

**Piège francophone :** la Chine compte par tranches de 10 000, pas de 1 000. Un million = 一百万 (yī bǎi wàn, cent fois dix mille).`,
    objectives: [`Former n'importe quel nombre 11-99`, `Placer le 零 pour les dizaines vides (105 = 一百零五)`, `Distinguer 两百 et 二百`, `Lire 千 et 万 correctement`],
    flashcards: [`十一`, `二十`, `五十`, `九十九`, `一百`, `两百`, `五百`, `一千`],
  },
  "cecr-a1-numbers-m3": {
    title: `Jours & semaine`, titleEn: `Days of the week`,
    duration: 12,
    category: `vocabulary`,
    difficulty: `beginner`,
    introTitle: `Lundi = 星期一, dimanche ≠ 星期七`,
    introContent: `Les jours sont numérotés de 1 à 6, puis vient l'exception :

- 星期一 → 星期六 = lundi → samedi
- **星期天 ou 星期日 = dimanche** (jamais 星期七 !)

**Trois synonymes de « semaine » :**
- 星期 (xīngqī) — standard.
- 周 (zhōu) — plus court, oral courant : 周一, 周二...
- 礼拜 (lǐbài) — familier, régional.

**Vocabulaire de navigation temporelle :**
- 今天 (jīntiān) = aujourd'hui · 昨天 (zuótiān) = hier · 明天 (míngtiān) = demain.
- 上个星期 = la semaine dernière · 下个星期 = la semaine prochaine.`,
    objectives: [`Lister les 7 jours sans hésiter`, `Ne pas dire 星期七 pour dimanche`, `Alterner 星期 / 周 / 礼拜`, `Construire « lundi prochain » : 下个星期一`],
    flashcards: [`星期一`, `星期二`, `星期三`, `星期四`, `星期五`, `星期六`, `星期天`, `今天`, `明天`, `昨天`],
  },
  "cecr-a1-numbers-m4": {
    title: `L'heure qu'il est`, titleEn: `What time is it`,
    duration: 12,
    category: `vocabulary`,
    difficulty: `beginner`,
    introTitle: `现在几点 ? Heure, demi, quart en chinois`,
    introContent: `**现在几点 (xiànzài jǐ diǎn) ?** — il est quelle heure maintenant ?

Structure de base : **[heure] 点 (diǎn) [minutes] 分 (fēn)**

- 三点 = 3h pile · 三点十分 = 3h10 · **三点半** = 3h30 · 三点一刻 = 3h15.

**Préciser le moment de la journée (avant l'heure) :**
- 早上 (zǎoshang) = matin · 下午 (xiàwǔ) = après-midi · 晚上 (wǎnshàng) = soir.

**Exemple :** 下午三点半 = 15h30.

**Piège :** le chinois utilise le format 12h, pas 24h. Le contexte (早上/下午/晚上) remplace « AM/PM ».`,
    objectives: [`Demander 现在几点 ?`, `Dire une heure pile, demie, avec minutes`, `Préciser le moment : 早上 / 下午 / 晚上`, `Lire 三点半 et 三点一刻`],
    flashcards: [`现在`, `几点`, `点`, `分`, `半`, `刻`, `早上`, `晚上`, `中午`],
  },
  "cecr-a1-numbers-m5": {
    title: `Mois & dates`, titleEn: `Months & dates`,
    duration: 12,
    category: `vocabulary`,
    difficulty: `beginner`,
    introTitle: `Année → Mois → Jour : l'ordre inverse du français`,
    introContent: `En chinois, la date va **du plus grand au plus petit** : Année → Mois → Jour — exactement l'inverse du français.

- 2026年 (nián) 4月 (yuè) 18日 (rì) = le 18 avril 2026.

**Les mois :** numérotés de 1 à 12. 一月 = janvier, 十二月 = décembre.

**Le jour :** deux marqueurs interchangeables — **日 (rì)** (plus écrit) et **号 (hào)** (plus oral).

**Navigation temporelle autour de l'année :**
- 今年 = cette année · 去年 = l'an dernier · 明年 = l'an prochain.

**Astuce :** mémorise l'ordre avec « grande horloge → petite horloge ». L'année est la plus grande unité, le jour la plus petite.`,
    objectives: [`Former n'importe quelle date en chinois`, `Respecter l'ordre grand → petit`, `Alterner 号 (oral) et 日 (écrit)`, `Dire « mon anniversaire est le X »`],
    flashcards: [`一月`, `二月`, `号`, `月`, `年`, `今年`, `去年`, `明年`, `生日`],
  },
  "cecr-a1-family-m1": {
    title: `Les membres de la famille`, titleEn: `Family members`,
    duration: 12,
    category: `vocabulary`,
    difficulty: `beginner`,
    introTitle: `哥哥 ≠ 弟弟 : aîné ou cadet, toujours préciser`,
    introContent: `En chinois, chaque terme de famille encode **l'âge relatif** — il n'existe pas de mot neutre pour « frère » ou « sœur ».

- **哥哥 (gēge)** = grand frère · **弟弟 (dìdi)** = petit frère.
- **姐姐 (jiějie)** = grande sœur · **妹妹 (mèimei)** = petite sœur.

**Piège francophone :** tu dois toujours préciser aîné ou cadet. Dire juste « frère » n'existe pas en chinois.

**Le redoublement affectif :** 爸爸, 妈妈, 爷爷, 奶奶... Les syllabes doublées donnent un ton chaleureux.

**Grand-parents paternels :** 爷爷 (yéye) = grand-père · 奶奶 (nǎinai) = grand-mère. Les maternels (外公/外婆) viendront plus tard.`,
    objectives: [`Nommer 8 membres de famille proche`, `Distinguer 哥哥 et 弟弟 (aîné/cadet)`, `Former 我的爸爸 avec 的`, `Comprendre le redoublement affectif (爸爸, 妈妈)`],
    flashcards: [`爸爸`, `妈妈`, `哥哥`, `姐姐`, `弟弟`, `妹妹`, `爷爷`, `奶奶`, `我的`],
  },
  "cecr-a1-family-m2": {
    title: `Mon âge, ton âge`, titleEn: `My age, your age`,
    duration: 10,
    category: `conversation`,
    difficulty: `beginner`,
    introTitle: `几岁 ? 多大 ? 多大年纪 ? Selon qui tu demandes`,
    introContent: `Le chinois adapte la question selon l'âge de l'interlocuteur — une subtilité importante pour ne pas être impoli.

- **À un enfant :** 你几岁 (nǐ jǐ suì) ? — « tu as combien d'ans ? »
- **À un adulte :** 你多大 (nǐ duō dà) ? — neutre et courant.
- **À une personne âgée :** 您多大年纪 (nín duō dà niánjì) ? — respectueux, avec 您.

**Répondre :** 我今年二十岁 (wǒ jīnnián èrshí suì) = « j'ai 20 ans cette année ». Le mot **岁 (suì)** est obligatoire — c'est le classificateur de l'âge.

**Astuce :** relance la conversation avec **你呢 (nǐ ne) ?** = « et toi ? » — universel pour retourner une question.`,
    objectives: [`Choisir 几岁 / 多大 / 多大年纪 selon l'âge`, `Répondre 我今年 + nombre + 岁`, `Ne jamais oublier le classificateur 岁`, `Retourner la question : 你呢 ? (et toi ?)`],
    flashcards: [`多大`, `岁`, `我`, `今年`, `你呢`, `他`, `她`, `大`, `小`],
  },
  "cecr-a1-family-m3": {
    title: `Les pronoms de base`, titleEn: `Basic pronouns`,
    duration: 10,
    category: `grammar`,
    difficulty: `beginner`,
    introTitle: `他/她/它 s'écrivent différemment, sonnent pareil`,
    introContent: `Les pronoms chinois sont simples — et il **n'y a aucune conjugaison**.

- 我 (wǒ) = je/moi · 你 (nǐ) = tu/toi · 他 (tā) = il · 她 (tā) = elle · 它 (tā) = ça (objet).
- **Pluriel :** ajoute 们 (men) — 我们, 你们, 他们.

**Info importante :** 他, 她, 它 se prononcent **exactement pareil** (tā). La distinction n'existe qu'à l'écrit — à l'oral, le contexte suffit.

**Zéro conjugaison :**
- 我是 · 你是 · 他是 · 我们是 — le verbe 是 ne change jamais.

**Grand mot collectif :** 大家 (dàjiā) = tout le monde — très courant pour s'adresser à un groupe.`,
    objectives: [`Lister les 5 pronoms singuliers`, `Former le pluriel avec 们`, `Distinguer 他 / 她 / 它 à l'écrit`, `Accepter la simplicité : zéro conjugaison`],
    flashcards: [`我`, `你`, `他`, `她`, `我们`, `你们`, `他们`, `它`, `大家`],
  },
  "cecr-a1-family-m4": {
    title: `Les couleurs`, titleEn: `Colors`,
    duration: 10,
    category: `vocabulary`,
    difficulty: `beginner`,
    introTitle: `红 = bonheur, 白 = deuil : les couleurs ont un sens`,
    introContent: `Formation des couleurs : **adjectif de couleur + 色 (sè)**.

- 红色 (hóngsè) rouge · 蓝色 (lánsè) bleu · 白色 (báisè) blanc · 黑色 (hēisè) noir · 黄色 (huángsè) jaune · 绿色 (lǜsè) vert.

**À l'oral, 色 est souvent omis :** 我喜欢红 = 我喜欢红色.

**Culture — les couleurs ne sont pas neutres :**
- **红 (hóng)** = bonheur, fête, mariage, Nouvel An. Couleur porte-bonheur absolue.
- **白 (bái)** = deuil, funérailles. Ne jamais offrir de fleurs blanches à un ami.
- **黄色 (huángsè)** = jaune, MAIS aussi argot pour « contenu adulte ». Attention au contexte.

**Piège :** contrairement à l'Occident, le blanc n'est pas une couleur de mariage en Chine traditionnelle.`,
    objectives: [`Former une couleur : X + 色`, `Savoir que 色 est souvent optionnel à l'oral`, `Connaître la charge culturelle du rouge et du blanc`, `Attention à l'ambiguïté de 黄色`],
    flashcards: [`红色`, `蓝色`, `白色`, `黑色`, `黄色`, `绿色`, `颜色`, `喜欢`],
  },
  "cecr-a1-grammar-m0": {
    title: `Structure de phrase : Sujet → Verbe → Objet`, titleEn: `Sentence structure: Subject → Verb → Object`,
    duration: 10,
    category: `grammar`,
    difficulty: `beginner`,
    introTitle: `SVO comme en français, mais le temps vient avant`,
    introContent: `Bonne nouvelle : le chinois suit l'ordre **Sujet → Verbe → Objet**, comme le français.

**我吃米饭 (wǒ chī mǐfàn)** = je mange du riz.

Trois différences fondamentales à intégrer dès maintenant :

**1. Le temps se place AVANT le verbe, jamais après.**
- ✓ 我**明天**吃米饭 (demain je mange du riz).
- ✗ 我吃米饭**明天** — impossible en chinois.

**2. Aucune conjugaison.** 吃 reste 吃 pour tous les sujets et tous les temps.

**3. Le pronom sujet est obligatoire.** On ne peut pas l'omettre comme en français à l'impératif.`,
    objectives: [`Construire une phrase de base : Sujet + Verbe + Objet`, `Placer le temps AVANT le verbe (jamais à la fin)`, `Ne pas conjuguer — 吃 reste 吃 partout`, `Identifier les rôles Sujet / Verbe / Objet / Temps`],
    flashcards: [`我`, `你`, `他`, `她`, `吃`, `喝`, `看`, `学`, `米饭`, `水`, `书`],
  },
  "cecr-a1-grammar-m1": {
    title: `Le verbe 是 (être)`, titleEn: `The verb 是 (to be)`,
    duration: 10,
    category: `grammar`,
    difficulty: `beginner`,
    introTitle: `是 identifie — pas de 是 + adjectif`,
    introContent: `**是 (shì)** sert UNIQUEMENT à identifier : A **是** B = A est B.

- 我是学生 (wǒ shì xuéshēng) = je suis étudiant.
- 她是法国人 (tā shì fǎguórén) = elle est française.

**Piège majeur pour les francophones :** on ne dit PAS 是 + adjectif.
- ✗ 她是漂亮 — impossible.
- ✓ **她很漂亮 (tā hěn piàoliang)** = elle est belle.

Avec un adjectif, utilise directement **很 (hěn) + adjectif**. Ici, 很 ne veut pas dire « très » — c'est une liaison grammaticale obligatoire.

**是 ne se conjugue jamais :** 我是 · 你是 · 他是 · 我们是 — toujours identique.`,
    objectives: [`Utiliser 是 uniquement pour identifier`, `Ne JAMAIS dire 是 + adjectif`, `Utiliser 很 + adjectif à la place`, `Construire des phrases type 我是学生`],
    flashcards: [`是`, `我是`, `你是`, `他是`, `学生`, `老师`, `朋友`, `中国人`],
  },
  "cecr-a1-grammar-m2": {
    title: `La négation avec 不`, titleEn: `Negation with 不`,
    duration: 10,
    category: `grammar`,
    difficulty: `beginner`,
    introTitle: `不 devant tout — sauf 有 qui prend 没有`,
    introContent: `**不 (bù)** se place juste avant le verbe ou l'adjectif pour le nier.

- 不是 (bùshì) = n'est pas · 不去 (bù qù) = ne part pas · 不好 (bùhǎo) = pas bien.

**Exception unique :** 有 (yǒu) se nie avec **没有 (méiyǒu)**, jamais avec 不有.

**Sandhi automatique :** devant un 4e ton, 不 (bù) devient **bú**.
- 不是 → bú shì · 不要 → bú yào · 不对 → bú duì.

C'est obligatoire et automatique — ne réfléchis pas, prononce-le directement.`,
    objectives: [`Placer 不 juste avant le verbe`, `Appliquer le sandhi bù → bú (4e ton)`, `Négation de 有 = 没有 (jamais 不有)`, `Construire phrases : 我不是, 我不喜欢`],
    flashcards: [`不是`, `不去`, `不要`, `不好`, `不喜欢`, `不能`, `不会`, `不对`],
  },
  "cecr-a1-grammar-m3": {
    title: `Les questions avec 吗`, titleEn: `Yes/no questions with 吗`,
    duration: 10,
    category: `grammar`,
    difficulty: `beginner`,
    introTitle: `吗 à la fin pour oui/non — mais pas avec 什么`,
    introContent: `Pour poser une question fermée (réponse oui/non), ajoute **吗 (ma)** à la fin de n'importe quelle phrase affirmative.

- 你是学生 → **你是学生吗 ?** = es-tu étudiant ?

Pas d'inversion, pas d'intonation montante — juste 吗 à la fin.

**Règle importante :** si la phrase contient déjà un mot interrogatif (**什么, 哪里, 谁...**), on n'ajoute PAS 吗. Ces mots suffisent à marquer la question.

**La particule 呢 (ne) :** pour retourner une question de façon naturelle.
- 我很好，**你呢 ?** = je vais bien, et toi ?

**Répondre à une question en 吗 :** répéter le verbe (affirmatif ou négatif), pas « oui/non » isolé. 你吃吗 ? → 吃 (oui) ou 不吃 (non).`,
    objectives: [`Former une question en ajoutant 吗`, `Ne pas utiliser 吗 avec 什么/哪里/谁`, `Utiliser 呢 pour rebondir`, `Répondre directement oui/non (没有 / 是)`],
    flashcards: [`吗`, `你好吗`, `你是吗`, `是吗`, `对吗`, `呢`, `好吗`, `可以吗`],
  },
  "cecr-a1-grammar-m4": {
    title: `Le 的 possessif`, titleEn: `The possessive 的`,
    duration: 10,
    category: `grammar`,
    difficulty: `beginner`,
    introTitle: `X的Y : possesseur avant la chose possédée`,
    introContent: `**的 (de)** relie un possesseur à ce qu'il possède : **possesseur + 的 + objet**.

- 我的书 (wǒ de shū) = mon livre.
- 朋友的电话 (péngyou de diànhuà) = le téléphone de l'ami.
- 妈妈的衣服 (māma de yīfu) = les vêtements de maman.

**Ordre inversé par rapport au français** : le possesseur vient toujours AVANT la chose possédée.

**Exception pratique :** avec la famille proche et les amis, 的 peut être omis.
- 我爸爸 = mon père · 他妈妈 = sa mère · 我朋友 = mon ami.

**Pour demander à qui :** 谁的 (shéi de) ? = à qui appartient ça ?`,
    objectives: [`Relier possesseur + 的 + possession`, `Omettre 的 avec famille/amis : 我爸爸`, `Former 谁的 ? (à qui ?)`, `Accepter l'ordre inverse du français`],
    flashcards: [`的`, `我的`, `你的`, `他的`, `谁的`, `朋友的`, `老师的`, `学校的`],
  },
  "cecr-a1-grammar-m5": {
    title: `Les classificateurs 个 & 本`, titleEn: `Classifiers 个 & 本`,
    duration: 12,
    category: `grammar`,
    difficulty: `beginner`,
    introTitle: `一本书 : nombre + classificateur + nom, toujours`,
    introContent: `En chinois, on ne peut JAMAIS mettre un nombre directement avant un nom. Il faut un **classificateur** entre les deux.

**Structure obligatoire :** nombre + classificateur + nom.
- ✗ 一书 — impossible.
- ✓ **一本书 (yī běn shū)** = un livre.

**Le classificateur universel : 个 (gè)**. Si tu ne connais pas le bon, 个 est accepté presque partout.
- 一个人 (yī gè rén) = une personne · 一个苹果 = une pomme · 一个问题 = une question.

**Classificateur spécifique :** 本 (běn) pour les livres et cahiers.

**Après 这 (zhè) / 那 (nà) :** le classificateur est aussi obligatoire.
- 这个人 = cette personne · 那本书 = ce livre-là.`,
    objectives: [`Ne jamais compter sans classificateur`, `Utiliser 个 par défaut`, `Utiliser 本 pour livres/cahiers`, `Placer le classificateur après 这 / 那`],
    flashcards: [`个`, `本`, `一个`, `两个`, `一本书`, `几本`, `这个`, `那个`],
  },
  "cecr-a1-daily-m1": {
    title: `Manger & boire`, titleEn: `Eat & drink`,
    duration: 10,
    category: `vocabulary`,
    difficulty: `beginner`,
    introTitle: `吃饭 ≠ 吃 seul : le verbe veut un objet`,
    introContent: `**吃 (chī)** = manger · **喝 (hē)** = boire.

**Différence avec le français :** en chinois, ces verbes prennent presque toujours un objet. On ne dit pas « je mange » tout seul.

- ✗ 我吃 — awkward.
- ✓ **我吃饭 (wǒ chī fàn)** = je mange (du riz / je prends un repas).

**吃饭 est l'expression idiomatique** pour « prendre un repas » — elle dépasse largement le simple riz.

**Vocabulaire de base :**
- 米饭 (mǐfàn) = riz cuit · 面条 (miàntiáo) = nouilles · 苹果 = pomme.
- 水 (shuǐ) = eau · 茶 (chá) = thé · 牛奶 (niúnǎi) = lait.

**Piège :** 饭 (fàn) = riz cuit, mais aussi « repas » en général. 米 (mǐ) = riz non cuit.`,
    objectives: [`Ne jamais laisser 吃 ou 喝 seul`, `Comprendre que 吃饭 = prendre un repas`, `Distinguer 饭 (riz cuit) et 米 (riz non cuit)`, `Former 我喝水 / 他吃面条`],
    flashcards: [`吃`, `喝`, `饭`, `水`, `茶`, `米饭`, `面条`, `苹果`, `牛奶`],
  },
  "cecr-a1-daily-m2": {
    title: `Aller quelque part`, titleEn: `Go somewhere`,
    duration: 10,
    category: `vocabulary`,
    difficulty: `beginner`,
    introTitle: `去 s'éloigne, 来 s'approche, 到 arrive`,
    introContent: `Trois verbes de mouvement fondamentaux — chacun a sa direction :

- **去 (qù)** = aller (on s'éloigne du locuteur). 我去学校 = je vais à l'école.
- **来 (lái)** = venir (on se rapproche du locuteur). 请来这里 = viens ici.
- **到 (dào)** = arriver à. 我到家了 = je suis arrivé à la maison.

**Règle clé :** la destination se place directement après le verbe, **sans préposition**.
- ✓ 去北京 (qù Běijīng) = aller à Pékin.
- ✗ 去到北京 — redondant.

**Pour demander :** 你去哪里 (nǐ qù nǎlǐ) ? = où tu vas ?`,
    objectives: [`Choisir 去 / 来 selon la direction`, `Placer la destination sans préposition`, `Poser 你去哪里 ?`, `Différencier 到 (arriver) de 去 (aller)`],
    flashcards: [`去`, `来`, `到`, `家`, `学校`, `商店`, `饭馆`, `哪里`],
  },
  "cecr-a1-daily-m3": {
    title: `Parler, lire, écouter`, titleEn: `Speak, read, listen`,
    duration: 12,
    category: `vocabulary`,
    difficulty: `beginner`,
    introTitle: `看 vs 读 : regarder ou étudier un texte ?`,
    introContent: `Cinq verbes couvrent l'essentiel de la communication :

- **说 (shuō)** = parler / dire.
- **看 (kàn)** = regarder / lire (un livre, un écran).
- **听 (tīng)** = écouter.
- **读 (dú)** = lire à voix haute / étudier un texte.
- **写 (xiě)** = écrire.

**Nuance 看 vs 读 :** 看书 = lire un livre (silencieux, détente) · 读课文 = lire un texte à voix haute (scolaire). Dans la pratique courante, 看 est le plus utilisé.

**Trio pour parler de l'apprentissage du chinois :**
- 说中文 · 看中文 · 写中文 = parler / lire / écrire le chinois.`,
    objectives: [`Distinguer 看 (regarder) et 读 (étudier)`, `Construire 说中文 / 听音乐`, `Ne pas confondre 看 et 看见 (on y reviendra)`, `Former le trio 说 + 看 + 写`],
    flashcards: [`说`, `看`, `听`, `读`, `写`, `中文`, `书`, `电视`],
  },
  "cecr-a1-daily-m4": {
    title: `Avoir & ne pas avoir 有/没有`, titleEn: `Have & not have 有/没有`,
    duration: 10,
    category: `grammar`,
    difficulty: `beginner`,
    introTitle: `有 = avoir ET il y a — et jamais 不有`,
    introContent: `**有 (yǒu)** couvre deux usages en français :

**1. Possession :** 我有两个苹果 (wǒ yǒu liǎng gè píngguǒ) = j'ai deux pommes.
**2. Existence (il y a) :** 桌上有一本书 (zhuō shàng yǒu yī běn shū) = il y a un livre sur la table.

**Négation obligatoire : 没有 (méiyǒu).**
- ✗ 不有 — n'existe pas en chinois.
- ✓ **我没有钱 (wǒ méiyǒu qián)** = je n'ai pas d'argent.
- ✓ **这里没有书 (zhèlǐ méiyǒu shū)** = il n'y a pas de livre ici.

C'est l'une des rares irrégularités du chinois — mémorise-la comme un bloc unique : **有 → 没有**.`,
    objectives: [`Utiliser 有 pour possession ET existence`, `Nier uniquement avec 没有, jamais 不有`, `Former 我有 / 他没有 / 这里有`, `Poser 你有吗 ? et répondre`],
    flashcards: [`有`, `没有`, `有一个`, `有什么`, `没什么`, `有吗`, `还有`, `都有`],
  },
  "cecr-a1-conversation-m1": {
    title: `Les 4 mots de politesse : 请, 谢谢, 不客气, 对不起`, titleEn: `The 4 polite words: 请, 谢谢, 不客气, 对不起`,
    duration: 10,
    category: `conversation`,
    difficulty: `beginner`,
    introTitle: `请 d'abord, 辛苦了 après : les rituels pro`,
    introContent: `Cinq mots constituent l'ossature de la politesse chinoise :

- **请 (qǐng)** = s'il vous plaît / je vous en prie — **toujours en début de phrase**, jamais à la fin.
- **谢谢 (xièxie)** = merci → réponse attendue : **不客气 (bú kèqi)** = de rien.
- **对不起 (duìbuqǐ)** = désolé → réponse : **没关系 (méi guānxi)** = ce n'est rien.

**Deux formules à apprendre rapidement :**

- **麻烦你 (máfan nǐ)** = je t'embête avec ça — adoucit toute demande.
- **辛苦了 (xīnkǔle)** = merci pour ton travail / effort. En Chine pro, c'est ATTENDU dès que quelqu'un fait quelque chose pour toi. Plus chaleureux que 谢谢 dans un contexte de service ou de collaboration.`,
    objectives: [`Placer 请 en début de phrase`, `Distinguer 不客气 (réponse à 谢谢) vs 没关系 (réponse à 对不起)`, `Utiliser 麻烦你 pour adoucir une demande`, `Toujours dire 辛苦了 après un service`],
    flashcards: [`请`, `谢谢`, `不客气`, `对不起`, `没关系`, `麻烦`, `辛苦了`, `加油`],
  },
  "cecr-a1-conversation-m2": {
    title: `« Je n'ai pas compris » : 请再说一遍 / 慢一点`, titleEn: `«I didn't catch it»: 请再说一遍 / 慢一点`,
    duration: 10,
    category: `conversation`,
    difficulty: `beginner`,
    introTitle: `请再说一遍 / 慢一点 : ne jamais rester bloqué`,
    introContent: `Ces phrases de survie te sortiront de n'importe quelle situation :

- **请再说一遍 (qǐng zài shuō yī biàn)** = répétez s'il vous plaît.
- **慢一点 (màn yīdiǎn)** = plus lentement.
- **我听不懂 (wǒ tīng bù dǒng)** = je ne comprends pas (à l'oreille).

**Distinction importante :**
- 听不懂 = je n'arrive pas à comprendre la langue.
- 不知道 (bù zhīdào) = je ne sais pas (l'information).

**Pour approfondir une incompréhension :**
- 这个字怎么写 ? = comment ça s'écrit ?
- 这是什么意思 ? = qu'est-ce que ça veut dire ?

**Phrase magique :** « 我学中文，所以我说得不太好 » — dès que tu dis ça, les Chinois ralentissent automatiquement et deviennent ultra-patients.`,
    objectives: [`Demander 请再说一遍 + 慢一点`, `Distinguer 听不懂 vs 不知道`, `Demander 怎么写 / 什么意思 / 怎么读`, `Sortir tôt « 我学中文 » pour adoucir`],
    flashcards: [`再说一遍`, `慢一点`, `听不懂`, `意思`, `怎么写`, `怎么读`, `中文`],
  },
  "cecr-a1-conversation-m3": {
    title: `Réactions courtes : 是 / 对 / 好 / 行 / 明白了`, titleEn: `Short reactions: 是 / 对 / 好 / 行 / 明白了`,
    duration: 10,
    category: `conversation`,
    difficulty: `beginner`,
    introTitle: `是/对/好/行 : quatre « oui » qui ne sont pas pareils`,
    introContent: `Le chinois n'a pas un seul mot pour « oui ». Selon le contexte :

- **是 (shì)** = c'est ça — confirme une identité ou un fait.
- **对 (duì)** = exact — confirme une information.
- **好 (hǎo)** = OK, bien — accepter quelque chose.
- **行 (háng)** = ça marche — accord pratique.
- **嗯 (ń)** = oui léger oral, signal d'écoute.

**Pour « non » :** reprendre le verbe + 不. 你吃吗 ? → **不吃** (je ne mange pas).

**Distinction à connaître :**
- **明白了 (míngbáile)** = j'ai compris (un concept qu'on t'explique).
- **知道了 (zhīdàole)** = je sais / j'ai entendu (une consigne, une information).`,
    objectives: [`Choisir 是 / 对 / 好 / 行 selon contexte`, `Répondre « non » sans 不 isolé`, `Distinguer 明白了 vs 知道了`, `Ponctuer avec 哦 / 嗯 / 是吗`],
    flashcards: [`是`, `对`, `好`, `行`, `嗯`, `明白`, `知道`, `哦`],
  },
  "cecr-a1-conversation-m4": {
    title: `Hésiter sans se taire : 那个, 这个, 然后`, titleEn: `Hesitate without going silent: 那个, 这个, 然后`,
    duration: 10,
    category: `conversation`,
    difficulty: `beginner`,
    introTitle: `那个 = « euh » — les bouée-temps orales`,
    introContent: `Les remplisseurs oraux te donnent du temps pour réfléchir sans couper le fil de la conversation.

- **那个 (nàge) / 这个 (zhège)** = « euh... » — les plus naturels.
- **嗯 (ń)** = « hm... » — signal d'écoute et de réflexion.
- **怎么说呢 (zěnme shuō ne)** = « comment dire... » — donne l'air d'un locuteur avancé.

**Connecteurs pour enchaîner tes idées :**
- 然后 (ránhòu) = ensuite · 还有 (háiyǒu) = et aussi · 比如 (bǐrú) = par exemple.
- 因为 (yīnwèi) X **所以 (suǒyǐ)** Y = parce que X, donc Y — toujours en duo en chinois.

**Avertissement :** 那个 sonne comme un mot très offensant en anglais. Avec des anglophones, prononce distinctement **nà-ge** ou utilise 这个 à la place.`,
    objectives: [`Utiliser 那个/这个 comme « euh »`, `Enchaîner avec 然后 / 还有 / 比如`, `Coupler 因为 + 所以`, `Adapter 那个 (nàge vs nèige) selon contexte`],
    flashcards: [`那个`, `这个`, `嗯`, `怎么说`, `然后`, `还有`, `比如`, `因为`, `所以`],
  },
  "cecr-a1-conversation-m5": {
    title: `Au café et en taxi : commander et se déplacer`, titleEn: `At the café and in a taxi: order and move`,
    duration: 10,
    category: `conversation`,
    difficulty: `beginner`,
    introTitle: `我要一杯 + 大/热/冰 : commander sans hésiter`,
    introContent: `**Au café :** la structure de commande universelle — 我要一杯 (wǒ yào yī bēi) + boisson.

- Précise : **大杯/小杯** (grande/petite) · **热的/冰的** (chaud/glacé).
- Prix : **多少钱 (duōshao qián) ?**
- Payer : WeChat Pay ou 支付宝 (presque tout se fait en QR code).

**En taxi / Didi :** donne la destination simplement.

- **请去 (qǐng qù) + lieu** = allez à...
- **这是地址 (zhè shì dìzhǐ)** = c'est l'adresse (en montrant le téléphone).
- Pendant le trajet : **慢一点** (plus lentement) · **这里** (ici) · **停一下 (tíng yíxià)** (arrêtez-vous).

**Astuce pratique :** si tu ne sais pas prononcer l'adresse, montre simplement le téléphone en disant **这里 (zhèlǐ)**.`,
    objectives: [`Commander avec 我要一杯 + 大/小, 热/冰`, `Demander un prix : 多少钱?`, `Donner une destination : 请去 X`, `Préférer Didi à hailing dans une grande ville`],
    flashcards: [`要`, `杯`, `咖啡`, `热`, `冰`, `去`, `机场`, `地址`, `停`],
  },
  "cecr-a1-conversation-m6": {
    title: `Prendre congé : « 我先走了 / 路上小心 »`, titleEn: `Take leave: «我先走了 / 路上小心»`,
    duration: 10,
    category: `conversation`,
    difficulty: `beginner`,
    introTitle: `我先走了 : l'art de partir en 3 temps`,
    introContent: `Partir à la chinoise se fait en **3 temps** — couper abruptement sonne froid.

**(1) Annonce :** 我先走了 (wǒ xiān zǒu le) = je pars en premier · 我得走了 (wǒ děi zǒu le) = je dois partir.

**(2) Raison :** 我有事 (wǒ yǒu shì) = j'ai un truc à faire · 时间不早了 (shíjiān bù zǎo le) = l'heure avance.

**(3) Projection :** 改天见 = à une autre fois · 回头见 = à tout à l'heure · 下次见 = à la prochaine.

**Formule chaleureuse universelle (de celui qui reste vers celui qui part) :**
**路上小心 (lùshang xiǎoxīn)** = fais attention sur la route. Marche pour 5 minutes ou 3 heures de trajet.

**Commerçant :** 慢走 (màn zǒu) = allez-y doucement (formule de sortie de boutique).`,
    objectives: [`Construire la sortie en 3 temps`, `Toujours conclure par 路上小心`, `Reconnaître 慢走 par les commerçants`, `Utiliser 改天见 / 回头见 / 下次见`],
    flashcards: [`先`, `走`, `改天`, `回头`, `下次`, `路上`, `小心`, `慢走`, `联系`],
  },
  "cecr-a1-conversation-m7": {
    title: `Demander un service / le chemin : « 能不能…? »`, titleEn: `Ask for a favor / directions: «能不能…?»`,
    duration: 10,
    category: `conversation`,
    difficulty: `beginner`,
    introTitle: `能不能帮我 : demander poliment à un inconnu`,
    introContent: `Pour demander de l'aide à un inconnu, **能不能 (néng bù néng) + verbe** est la formule la plus respectueuse.

- **能不能帮我 ?** = pouvez-vous m'aider ?
- **可不可以 (kě bù kěyǐ) + verbe** = alternative un peu plus formelle.
- **麻烦你 (máfan nǐ) + verbe** = je vous dérange pour... (très poli).

**Demander son chemin :**
- **X 在哪儿 (zài nǎr) ?** = où est X ?
- Réponses courantes : 一直走 = tout droit · 左转 (zuǒzhuǎn) = tourner à gauche · 右转 (yòuzhuǎn) = à droite · 旁边 (pángbiān) = à côté.

**Pour décliner une demande :** commence TOUJOURS par **不好意思** avant de refuser — ça adoucit tout.

**Si tu ne comprends pas la réponse :** 慢一点 + 怎么去 ? ou demande 你能写一下吗 ?`,
    objectives: [`Construire 能不能 + verbe (poli)`, `Décliner avec 不好意思 + raison`, `Demander un lieu : X 在哪儿?`, `Comprendre 一直走 / 左转 / 右转 / 旁边`],
    flashcards: [`能`, `可不可以`, `帮我`, `不好意思`, `事`, `哪儿`, `一直`, `左`, `右`, `旁边`],
  },
  "cecr-a1-nuances-m1": {
    title: `二 vs 两 — deux « deux » à ne pas confondre`, titleEn: `二 vs 两 — two «twos» not to mix up`,
    duration: 10,
    category: `vocabulary`,
    difficulty: `beginner`,
    introTitle: `二 vs 两 : même chiffre, usages opposés`,
    introContent: `**二 (èr)** désigne le chiffre « 2 » dans l'abstrait : compter, compositions, mois (二月), positions (第二).

**两 (liǎng)** = 2 quand on précède un classificateur.

- ✓ 两**个**人 · 两**本**书 · 两**次** — toujours avec classificateur.
- ✗ 二个人 — impossible.

**Règle d'or :** si un classificateur suit, c'est **toujours 两**.

**Grands nombres :** 200 → 两百 ou 二百 (les deux passent) · 2000 → **两千** (两 préféré).

**Piège oral :** à l'oral 两 est souvent utilisé même pour 2h (两点 est plus courant que 二点).`,
    objectives: [`Toujours mettre 两 devant un classificateur`, `Garder 二 pour compter / mois / ordinal`, `Utiliser 两点 (2 h) mais 二月 (février)`, `Préférer 两百块 / 两千 dans le commerce`],
    flashcards: [`二`, `两`, `个`, `本`, `次`, `百`, `千`, `万`],
  },
  "cecr-a1-nuances-m2": {
    title: `你 vs 您 — tu et vous + titres de respect`, titleEn: `你 vs 您 — informal/formal + respect titles`,
    duration: 10,
    category: `vocabulary`,
    difficulty: `beginner`,
    introTitle: `您 + titres : comment respecter sans se tromper`,
    introContent: `**你 (nǐ)** = tu — usage neutre entre adultes du même âge.
**您 (nín)** = vous — marque de respect : personne âgée, supérieur, client.

**Important :** 您 est SINGULIER. Le pluriel reste **你们** (jamais 您们).

**Au-delà de 您, les titres sont rois :**
- **老师 (lǎoshī)** = professeur, mais aussi tout expert digne de respect.
- **师傅 (shīfu)** = formule magique avec chauffeur, artisan, cuisinier.
- **先生 (xiānsheng)** = monsieur · **女士 (nǚshì)** = madame.

**Piège :** 小姐 (xiǎojiě) connote la prostituée dans certaines régions. Préfère **美女 (měinǚ)** à l'oral ou **女士** en contexte formel.

**Règle simple :** si tu hésites, commence par 您 — tu peux toujours descendre en registre.`,
    objectives: [`Utiliser 您 avec personnes plus âgées`, `Pluriel = 你们 (jamais 您们)`, `Appeler un taxi 师傅`, `Éviter 小姐 → 美女 / 女士`],
    flashcards: [`你`, `您`, `你们`, `您好`, `老师`, `师傅`, `先生`, `女士`],
  },
  "cecr-a1-nuances-m3": {
    title: `是 vs 在 vs 有 — trois « être » différents`, titleEn: `是 vs 在 vs 有 — three different «be»`,
    duration: 10,
    category: `vocabulary`,
    difficulty: `beginner`,
    introTitle: `是 / 在 / 有 : trois façons d'exister en chinois`,
    introContent: `Le verbe « être » français se découpe en 3 verbes distincts en chinois :

- **是 (shì)** = identité — 我是法国人 (je suis français).
- **在 (zài)** = localisation — 他在家 (il est à la maison).
- **有 (yǒu)** = existence/possession — 桌上有书 (il y a un livre).

**Pièges classiques francophones :**
- « il fait beau » → **天气很好** — pas 天气是好.
- « j'ai 20 ans » → **我二十岁** — pas 我有二十岁 (jamais 有 pour l'âge).

**Subtilité de 很 :** devant un adjectif, 很 est un pivot grammatical, pas « très ». **我很好** = je vais bien. Sans 很 (我好), on sous-entend une comparaison — ça sonne bizarre ou arrogant.`,
    objectives: [`Choisir 是 / 在 / 有 selon « = / lieu / il y a »`, `Pas de 是 devant un adjectif`, `Pas de 有 pour l'âge`, `Comprendre 很 comme pivot grammatical`],
    flashcards: [`是`, `在`, `有`, `没有`, `里`, `很`, `好`, `高`],
  },
  "cecr-a1-nuances-m4": {
    title: `也 vs 都 — aussi vs tous + leur négation`, titleEn: `也 vs 都 — also vs all + their negation`,
    duration: 10,
    category: `vocabulary`,
    difficulty: `beginner`,
    introTitle: `也/都 avant le verbe — et leur combinaison`,
    introContent: `**也 (yě)** = aussi — lie un sujet à un précédent.
**都 (dōu)** = tous — récapitule plusieurs éléments.

**Position obligatoire : AVANT le verbe.**
- ✓ 我**也**喜欢 = j'aime aussi.
- ✗ 我喜欢也 — impossible.
- ✓ 我们**都**来了 = on est tous venus.

**Négation :**
- 也不 (yě bù) = ne... pas non plus · 都不 (dōu bù) = aucun ne...
- 都没 (dōu méi) = aucun n'a... (passé).

**Rappel 不 vs 没 :** 不 = refus/présent · 没 = passé non accompli. Confondre les deux est la signature du débutant.`,
    objectives: [`Placer 也/都 entre sujet et verbe`, `Construire 我也不 / 我们都没`, `Distinguer 不 (présent) vs 没 (passé)`, `Combiner 也都 (« moi aussi je les aime tous »)`],
    flashcards: [`也`, `都`, `我们`, `他们`, `不`, `没`, `来`, `去`],
  },
  "cecr-a1-nuances-m5": {
    title: `多少 vs 几 — combien (grand) vs combien (petit)`, titleEn: `多少 vs 几 — how much (big) vs how many (small)`,
    duration: 10,
    category: `vocabulary`,
    difficulty: `beginner`,
    introTitle: `多少 vs 几 : grand ou petit nombre attendu ?`,
    introContent: `**几 (jǐ)** = combien — pour un petit nombre attendu (1 à ~10), toujours suivi d'un classificateur.

**多少 (duōshao)** = combien — pour un grand nombre ou un montant inconnu.

- 你有几**个**朋友 ? = tu as combien d'amis ?
- 多少**钱** ? = ça coûte combien ? (**jamais 几钱**)

**Exception fixe :** pour l'heure et la date, on utilise toujours **几** (les chiffres sont par nature petits).
- 几点 ? (quelle heure ?) · 几号 ? (quel jour ?) · 几月 ? (quel mois ?)

**Astuce :** si la réponse peut être un grand nombre inconnu → 多少. Si elle est forcément petite → 几.`,
    objectives: [`Choisir 几 (petit) vs 多少 (grand)`, `Mettre 几 + classificateur`, `Toujours 几点 / 几号 / 几月`, `Toujours 多少钱 (jamais 几钱)`],
    flashcards: [`多少`, `几`, `钱`, `朋友`, `人`, `多`, `少`, `比`],
  },
  "cecr-a1-nuances-m6": {
    title: `去 vs 来 — point de vue du locuteur`, titleEn: `去 vs 来 — speaker's POV`,
    duration: 10,
    category: `vocabulary`,
    difficulty: `beginner`,
    introTitle: `去 ou 来 ? Tout dépend d'où TU parles`,
    introContent: `**去 (qù)** = mouvement qui s'éloigne du locuteur.
**来 (lái)** = mouvement qui se rapproche du locuteur.

**Piège francophone classique :** « je viens à ton bureau » → en chinois c'est **我去你的办公室** — parce que TU t'éloignes de là où tu es.

Le point de référence est toujours **là où tu parles**, pas là où est l'autre.

**Verbes directionnels composés :**
- 进来 (jìnlái) = entrer (vers toi) · 出去 (chūqù) = sortir (loin de toi).
- 上来 = monter (vers toi) · 下去 = descendre (loin de toi) · 回来 = revenir.

**Exemple concret :** quelqu'un frappe à TA porte → tu cries **请进来 (qǐng jìnlái)**.`,
    objectives: [`Utiliser 去 si on s'éloigne du locuteur`, `Utiliser 来 si on se rapproche du locuteur`, `Composer 上来 / 下去 / 进来 / 出去 / 回来`, `Crier 请进来 quand on frappe à TA porte`],
    flashcards: [`去`, `来`, `到`, `回`, `找`, `上来`, `下去`, `进来`, `出去`, `回来`],
  },
  "cecr-a1-nuances-m7": {
    title: `会 vs 能 vs 可以 — trois manières de « pouvoir »`, titleEn: `会 vs 能 vs 可以 — three ways to «can»`,
    duration: 10,
    category: `vocabulary`,
    difficulty: `beginner`,
    introTitle: `会/能/可以 : appris, possible, permis`,
    introContent: `**会 (huì) / 能 (néng) / 可以 (kěyǐ)** — trois traductions de « pouvoir », trois sens bien distincts.

- **会 (huì)** = savoir faire (capacité **apprise**). 我会说中文 = j'ai appris le chinois.
- **能 (néng)** = pouvoir (capacité **possible** en ce moment). 我今天不能开车，我喝了酒 = je ne peux pas conduire, j'ai bu.
- **可以 (kěyǐ)** = être **autorisé**. 我可以坐这里吗 ? = puis-je m'asseoir ici ?

**Phrase mnémotechnique :**
我会，但不能，因为不可以。
= Je sais le faire, mais je ne peux pas, parce que c'est interdit.

**Piège :** utiliser 会 pour « je peux venir demain » — c'est une capacité situationnelle → **能**. 我明天能来 (wǒ míngtiān néng lái).`,
    objectives: [`Utiliser 会 pour compétence apprise`, `Utiliser 能 pour capacité ponctuelle`, `Utiliser 可以 pour demander permission`, `Mémoriser « 我会，但不能，因为不可以 »`],
    flashcards: [`会`, `能`, `可以`, `开车`, `游泳`, `说`, `坐`, `允许`, `禁止`],
  },
  "cecr-a2-city-m1": {
    title: `Demander son chemin`, titleEn: `Asking for directions`,
    duration: 12,
    category: `conversation`,
    difficulty: `elementary`,
    introTitle: `请问 + 怎么走 : la structure qui ouvre toutes les portes`,
    introContent: `Structure ultra-stable pour demander son chemin :

**请问 (qǐngwèn), [lieu] 怎么走 (zěnme zǒu) ?**

**请问** n'est pas optionnel — c'est ce qui rend la question polie et interpelle poliment l'inconnu.

**Réponses typiques :**
- 往前走 (wǎng qián zǒu) = allez tout droit.
- 往左拐 (wǎng zuǒ guǎi) = tournez à gauche.
- 往右拐 (wǎng yòu guǎi) = tournez à droite.
- 一直走 (yìzhí zǒu) = continuez tout droit sans s'arrêter.
- 过马路 (guò mǎlù) = traversez la rue.

**Piège :** si tu ne comprends pas la réponse, dis **慢一点** ou montre l'adresse sur ton téléphone.`,
    objectives: [`Formuler 请问, ... 怎么走 ?`, `Comprendre 往前/左/右 + 走/拐`, `Repérer 附近, 旁边, 对面`, `Localiser : 在左边/右边/前面/后面`],
    flashcards: [`请问`, `怎么走`, `往前`, `往左`, `往右`, `拐`, `一直走`, `过马路`, `附近`, `旁边`, `对面`],
  },
  "cecr-a2-city-m2": {
    title: `Les transports urbains`, titleEn: `Urban transports`,
    duration: 12,
    category: `vocabulary`,
    difficulty: `elementary`,
    introTitle: `坐 = assis dedans, 骑 = à califourchon dessus`,
    introContent: `Le chinois choisit le verbe de transport selon la **position du corps**.

**坐 (zuò)** = pour tout ce dans quoi on est assis :
- 坐地铁 · 坐公共汽车 · 坐出租车 · 坐飞机 · 坐火车.

**骑 (qí)** = pour tout ce qu'on enfourche :
- 骑自行车 (vélo) · 骑摩托车 (moto) · 骑马 (cheval).

**Piège classique :** ✗ 坐自行车 — on ne « s'assoit » pas dans un vélo, on le chevauche → **骑自行车**.

**Pour la durée :** 多长时间 (duō cháng shíjiān) ? = combien de temps ?
- 二十分钟 = 20 minutes · 一个小时 = une heure.`,
    objectives: [`Choisir 坐 (assis DANS) vs 骑 (à califourchon SUR)`, `Nommer 8 moyens de transport`, `Utiliser 从...到... avec un transport`, `Demander combien de temps : 多长时间 ?`],
    flashcards: [`坐`, `骑`, `地铁`, `公共汽车`, `出租车`, `飞机`, `火车`, `自行车`, `从`, `到`, `多长时间`],
  },
  "cecr-a2-city-m3": {
    title: `Lieux de la ville`, titleEn: `Places in the city`,
    duration: 10,
    category: `vocabulary`,
    difficulty: `elementary`,
    introTitle: `店 / 馆 / 院 : déduire les lieux sans dictionnaire`,
    introContent: `La plupart des lieux urbains suivent trois schémas : **[fonction] + 店 / 馆 / 院**.

**店 (diàn) — commerce :**
- 书店 librairie · 饭店 restaurant · 商店 boutique · 花店 fleuriste.

**馆 (guǎn) — culture / loisir :**
- 图书馆 bibliothèque · 博物馆 musée · 咖啡馆 café.

**院 (yuàn) — institution :**
- 医院 hôpital · 电影院 cinéma.

Reconnaître ces 3 suffixes te permet de deviner **80 % des noms de lieux** sans dictionnaire.

**Exception à mémoriser :** 银行 (yínháng) = banque (littéralement « rangée d'argent »). Aucun suffixe standard.`,
    objectives: [`Reconnaître les suffixes 店 / 馆 / 院`, `Nommer 10 lieux urbains`, `Situer avec 在 : 我在银行`, `Poser : ...在哪儿 ?`],
    flashcards: [`书店`, `饭店`, `商店`, `图书馆`, `博物馆`, `咖啡馆`, `医院`, `电影院`, `银行`, `邮局`, `超市`],
  },
  "cecr-a2-city-m4": {
    title: `Réserver un taxi (Didi)`, titleEn: `Booking a taxi (Didi)`,
    duration: 10,
    category: `conversation`,
    difficulty: `elementary`,
    introTitle: `师傅 : le titre magique avec les chauffeurs`,
    introContent: `Avec un chauffeur (taxi ou Didi), la demande est ultra-courte :

**师傅 (shīfu) + 去 (qù) + destination.**

- **师傅** = chef, maître — terme de respect indispensable pour un chauffeur. L'omettre est perçu comme impoli.
- Plus direct encore : **去 [lieu]** seul suffit.

**Au cours du trajet :**
- Problème : **慢一点 (màn yīdiǎn)** = ralentissez.
- Arrivée : **到了 (dào le)** = on est arrivé · **就在这儿 (jiù zài zhèr)** = c'est juste là.

**Payer :**
- **多少钱 (duōshao qián) ?** = combien ?
- **用微信 (yòng wēi xìn)** = je paye par WeChat.

**Astuce :** si tu ne sais pas prononcer la destination, montre ton téléphone — les chauffeurs lisent les caractères.`,
    objectives: [`Dire 师傅 au chauffeur`, `Donner une destination avec 去`, `Signaler l'arrivée : 到了, 就在这儿`, `Payer par WeChat : 用微信 / 扫码`],
    flashcards: [`师傅`, `去`, `到了`, `就在这儿`, `多少钱`, `微信`, `扫码`, `不用找了`],
  },
  "cecr-a2-food-m1": {
    title: `Au restaurant : commander`, titleEn: `At the restaurant: ordering`,
    duration: 12,
    category: `conversation`,
    difficulty: `elementary`,
    introTitle: `服务员 ! 我要... : commander en 3 mots`,
    introContent: `Commander au restaurant suit une structure fixe et simple.

**Appeler le serveur :** 服务员 (fúwùyuán) — dit à voix haute, c'est parfaitement normal.

**Commander :** 我要 (wǒ yào) + classificateur + plat.

**Classificateurs selon le contenant :**
- 一个 (yī gè) = pour les plats en général.
- 一碗 (yī wǎn) = un bol (soupe, riz, nouilles).
- 一杯 (yī bēi) = un verre.

**Addition :** 买单 (mǎi dān) ou 结账 (jiézhàng) — pas de pourboire en Chine.

**Piège :** utiliser 一杯 pour un bol de riz. Le classificateur doit correspondre au contenant réel.`,
    objectives: [`Appeler le serveur : 服务员`, `Commander avec 我要 + classificateur + plat`, `Choisir 个/碗/杯 selon le contenant`, `Payer : 买单 ou 结账`],
    flashcards: [`点菜`, `服务员`, `我要`, `一个`, `一碗`, `一杯`, `菜单`, `买单`, `结账`, `好吃`],
  },
  "cecr-a2-food-m2": {
    title: `Goûts & saveurs`, titleEn: `Tastes & flavors`,
    duration: 10,
    category: `vocabulary`,
    difficulty: `elementary`,
    introTitle: `酸甜苦辣咸 : 5 saveurs, 5 mots à maîtriser`,
    introContent: `La gastronomie chinoise reconnaît **5 saveurs fondamentales** :

**酸 (suān)** acide · **甜 (tián)** sucré · **苦 (kǔ)** amer · **辣 (là)** piquant · **咸 (xián)** salé.

**Graduer le piquant (indispensable au Sichuan et Hunan) :**
- 微辣 (wēi là) = légèrement piquant.
- 中辣 (zhōng là) = moyennement piquant.
- 特辣 (tè là) = très piquant.

**Phrase de survie :** 我吃不了辣 (wǒ chī bù liǎo là) = je ne peux pas manger piquant — à apprendre par cœur avant tout voyage dans le centre ou le sud.

**Décrire :** 不要太辣 (búyào tài là) = pas trop piquant, s'il vous plaît.`,
    objectives: [`Nommer 酸甜苦辣咸 (les 5 saveurs)`, `Graduer le piquant : 微/中/特辣`, `Dire 我吃不了辣`, `Décrire un plat : 很好吃 / 有点咸`],
    flashcards: [`酸`, `甜`, `苦`, `辣`, `咸`, `好吃`, `难吃`, `有点`, `太`, `微辣`, `中辣`],
  },
  "cecr-a2-food-m3": {
    title: `Plats emblématiques`, titleEn: `Iconic dishes`,
    duration: 10,
    category: `culture`,
    difficulty: `elementary`,
    introTitle: `宫保鸡丁 : décoder n'importe quel nom de plat`,
    introContent: `Un nom de plat chinois suit presque toujours le schéma : **ingrédient + méthode + sauce/style**.

**Décoder 3 classiques :**
- 宫保**鸡**丁 = poulet (鸡) style Gong Bao.
- 麻婆**豆腐** = tofu style « grand-mère grêlée ».
- 糖醋**里脊** = porc (里脊) à la sauce aigre-douce.

**5 protéines à reconnaître :** 鸡 (jī) poulet · 牛肉 (niúròu) bœuf · 猪肉 (zhūròu) porc · 鱼 (yú) poisson · 豆腐 (dòufu) tofu.

**4 modes de cuisson :** 炒 (chǎo) sauté · 炖 (dùn) mijoté · 炸 (zhà) frit · 蒸 (zhēng) vapeur.

**Règle prudente :** évite 生 (shēng) = cru si tu ne sais pas ce que c'est.`,
    objectives: [`Décoder un nom : ingrédient + méthode`, `Reconnaître 5 protéines clés`, `Identifier 4 modes de cuisson`, `Commander 3 plats iconiques`],
    flashcards: [`宫保鸡丁`, `麻婆豆腐`, `糖醋里脊`, `鱼香肉丝`, `饺子`, `米饭`, `面条`, `炒`, `蒸`, `炸`, `炖`],
  },
  "cecr-a2-food-m4": {
    title: `Boissons & thé`, titleEn: `Drinks & tea`,
    duration: 10,
    category: `culture`,
    difficulty: `elementary`,
    introTitle: `茶 = cha ou te ? Deux routes, un même mot`,
    introContent: `Le mot **茶 (chá)** a voyagé dans le monde entier par deux routes :

- Par **mer** (Fujian, prononciation « te ») → tea / thé / Tee.
- Par **la route** (mandarin, « cha ») → chai / çay / чай.

**Les 5 grandes familles de thé chinois :**
- 绿茶 (lǜchá) = thé vert · 红茶 (hóngchá) = thé rouge (= thé noir en Occident).
- 乌龙茶 (wūlóngchá) = oolong · 普洱茶 (pǔ'ěr chá) = puerh · 白茶 (báichá) = thé blanc.

**Autres boissons courantes :** 水 eau · 果汁 jus · 啤酒 bière · 可乐 coca · 咖啡 café.

**Culture :** au restaurant, l'eau servie est **开水 (kāishuǐ)** — eau bouillie chaude. Pas d'eau froide par défaut.`,
    objectives: [`Distinguer 绿/红/乌龙/普洱茶`, `Nommer 6 boissons courantes`, `Comprendre 开水 (eau chaude par défaut)`, `Commander : 我要一杯...(要)热/凉`],
    flashcards: [`茶`, `绿茶`, `红茶`, `乌龙茶`, `普洱茶`, `水`, `开水`, `果汁`, `啤酒`, `可乐`, `咖啡`],
  },
  "cecr-a2-shopping-m1": {
    title: `Les prix : 块, 毛, 分`, titleEn: `Prices: 块, 毛, 分`,
    duration: 12,
    category: `vocabulary`,
    difficulty: `elementary`,
    introTitle: `块 à l'oral, 元 à l'écrit : l'argent en deux registres`,
    introContent: `La monnaie chinoise = **人民币 (rénmínbì)**. Deux registres :

- **元 (yuán)** = à l'écrit et formel.
- **块 (kuài)** = à l'oral — un Chinois dit toujours **十块**, jamais 十元.

**Subdivisions :** 1 元 = 10 角 (jiǎo) = 10 **毛 (máo)** (oral). 1 角 = 10 分 (fēn) — les fen ne s'utilisent presque plus.

**Exemple :** 25,50 ¥ → 二十五块五毛 (èrshíwǔ kuài wǔ máo).

**Marchander :** 多少钱 ? → 太贵了 → **便宜点儿 (piányi diǎnr)** = un peu moins cher.

**Système des 折 (zhé) inversé :** 打八折 = 80 % du prix = **20 % de remise** — l'inverse du français où l'on annonce la réduction directement.`,
    objectives: [`Distinguer 块 (oral) / 元 (écrit)`, `Comprendre 块/毛/分 (1=10=100)`, `Lire un prix : 二十五块五毛`, `Négocier : 便宜点儿, 打几折 ?`],
    flashcards: [`人民币`, `元`, `块`, `毛`, `分`, `多少钱`, `便宜`, `贵`, `打折`, `便宜点儿`],
  },
  "cecr-a2-shopping-m2": {
    title: `Vêtements & tailles`, titleEn: `Clothes & sizes`,
    duration: 10,
    category: `vocabulary`,
    difficulty: `elementary`,
    introTitle: `穿 vs 戴 : le corps dit quel verbe utiliser`,
    introContent: `Le chinois distingue deux verbes « porter » selon ce qu'on met.

**穿 (chuān)** = vêtements et chaussures (on enfile).
- 穿衣服 · 穿裤子 · 穿鞋.

**戴 (dài)** = accessoires (on accroche, pose ou passe).
- 戴帽子 chapeau · 戴手表 montre · 戴眼镜 lunettes · 戴戒指 bague.

**Astuce :** ce qui couvre le tronc/les jambes → 穿 · ce qui « s'accroche » à la tête ou au poignet → 戴.

**En magasin :**
- 我可以试试吗 (wǒ kěyǐ shì shì ma) ? = puis-je essayer ?
- 试衣间在哪儿 ? = où est la cabine ?
- 有别的颜色吗 ? = vous avez d'autres couleurs ?`,
    objectives: [`Distinguer 穿 (vêtements) / 戴 (accessoires)`, `Nommer 8 vêtements`, `Demander une taille : 小/中/大号`, `Essayer : 我可以试试吗 ?`],
    flashcards: [`穿`, `戴`, `衣服`, `鞋`, `帽子`, `眼镜`, `大号`, `中号`, `小号`, `试`, `颜色`],
  },
  "cecr-a2-shopping-m3": {
    title: `Payer en Chine (微信/支付宝)`, titleEn: `Paying in China (WeChat/Alipay)`,
    duration: 10,
    category: `culture`,
    difficulty: `elementary`,
    introTitle: `扫码 ou 现金 : la Chine cashless en pratique`,
    introContent: `La Chine est quasi **cashless**. Deux apps dominent tout :

- **微信支付 (wēixìn zhīfù)** = WeChat Pay.
- **支付宝 (zhīfùbǎo)** = Alipay.

**Le verbe clé : 扫码 (sǎo mǎ)** = scanner le QR code.

**Scénario typique :**
- Vendeur : 扫这个 (sǎo zhège) — en montrant son QR.
- Vendeur : **您扫我还是我扫您 ?** = c'est vous qui scannez, ou moi qui scanne votre code ?

**Pratiquer :** 可以扫吗 (kěyǐ sǎo ma) ? = puis-je scanner ?

**Information :** le cash (现金) n'est presque plus accepté dans les villes. Dans les marchés encore, mais c'est rare. Prépare ton WeChat ou Alipay avant d'aller en Chine.`,
    objectives: [`Connaître 微信支付 et 支付宝`, `Utiliser le verbe 扫码`, `Répondre à 您扫我还是我扫您 ?`, `Distinguer 现金 (cash) des paiements mobiles`],
    flashcards: [`微信支付`, `支付宝`, `扫码`, `二维码`, `现金`, `刷卡`, `转账`, `付钱`, `收款`],
  },
  "cecr-a2-shopping-m4": {
    title: `Quantités & classificateurs`, titleEn: `Quantities & classifiers`,
    duration: 12,
    category: `grammar`,
    difficulty: `elementary`,
    introTitle: `个 = bouée de secours, 本/张/条 = précision`,
    introContent: `En chinois, le nombre ne peut jamais toucher directement le nom — un **classificateur** est obligatoire entre les deux.

**个 (gè)** = classificateur universel, compris partout. Utilise-le si tu doutes.

**Les classificateurs spécifiques à apprendre :**
- **本 (běn)** — livres, cahiers : 三本书.
- **张 (zhāng)** — objets plats : papier, billet, photo, table.
- **条 (tiáo)** — objets longs et fins : poisson, pantalon, rue.
- **件 (jiàn)** — vêtements, événements : 一件衣服.
- **把 (bǎ)** — objets à poignée : couteau, parapluie.

**Erreur classique :** ✗ 三个书 → ✓ **三本书**.

**Stratégie d'apprentissage :** mémorise le classificateur en même temps que le nom.`,
    objectives: [`Mémoriser 本/张/条/件/把/杯/碗`, `Ne JAMAIS dire 个 + livre`, `Compter : 两本书, 三张纸, 四条鱼`, `Se rabattre sur 个 en cas de doute`],
    flashcards: [`个`, `本`, `张`, `条`, `件`, `把`, `杯`, `碗`, `只`, `辆`, `双`],
  },
  "cecr-a2-day-m1": {
    title: `L'heure en chinois`, titleEn: `Telling time in Chinese`,
    duration: 12,
    category: `grammar`,
    difficulty: `elementary`,
    introTitle: `八点半 ou 差一刻九点 : deux façons de dire l'heure`,
    introContent: `**Structure de l'heure :** [heure] **点 (diǎn)** [minutes] **分 (fēn)**.

**Raccourcis naturels :**
- 八点**半** (bā diǎn bàn) = 8h30 (demi).
- 八点**一刻** = 8h15 (un quart).
- **差一刻**九点 (chà yī kè jiǔ diǎn) = 8h45 (neuf heures moins le quart).

**AM/PM — toujours AVANT l'heure :**
- 上午 = matin · 中午 = midi · 下午 = après-midi · 晚上 = soir.
- 下午三点 = 15h.

**Question :** 现在几点 (xiànzài jǐ diǎn) ?

**Piège :** 差 (chà) se place entre l'heure ronde et le temps manquant — l'ordre est l'inverse du français.`,
    objectives: [`Dire l'heure avec 点/分/半/刻`, `Utiliser 差 pour « moins »`, `Placer 上午/下午/晚上 avant l'heure`, `Demander 现在几点 ?`],
    flashcards: [`点`, `分`, `半`, `刻`, `差`, `上午`, `中午`, `下午`, `晚上`, `现在`, `几点`],
  },
  "cecr-a2-day-m2": {
    title: `Routine quotidienne`, titleEn: `Daily routine`,
    duration: 10,
    category: `conversation`,
    difficulty: `elementary`,
    introTitle: `早上七点起床 : le temps avant tout, le verbe nu interdit`,
    introContent: `En chinois, le temps se place **AVANT le verbe** — jamais après.

- ✓ 我**早上七点**起床 = je me lève à 7h du matin.
- ✗ 我起床**早上七点** — impossible.

**Verbes du matin :** 起床 se lever · 刷牙 se brosser les dents · 洗脸 se laver le visage · 吃早饭 prendre le petit-déjeuner.

**Verbes du soir :** 下班 finir le travail · 吃晚饭 dîner · 看电视 regarder la télé · 睡觉 dormir.

**Adverbes de fréquence (avant le verbe) :**
- 每天 = tous les jours · 常常 = souvent · 有时候 = parfois · 从不 = jamais.`,
    objectives: [`Placer le temps AVANT le verbe`, `Décrire 6 actions quotidiennes`, `Utiliser 每天/常常/有时候/从不`, `Conjuguer rien (chinois invariable)`],
    flashcards: [`起床`, `刷牙`, `洗脸`, `吃早饭`, `上班`, `下班`, `睡觉`, `每天`, `常常`, `有时候`, `从不`],
  },
  "cecr-a2-day-m3": {
    title: `Météo & saisons`, titleEn: `Weather & seasons`,
    duration: 10,
    category: `vocabulary`,
    difficulty: `elementary`,
    introTitle: `天气很热 : pas de 是 avec adjectif, jamais`,
    introContent: `**Structure météo :** 今天天气**很** + adjectif.

- 今天天气很冷 = il fait froid aujourd'hui.
- 今天天气很热 = il fait chaud.

**Rappel crucial :** pas de 是 entre le sujet et l'adjectif.
- ✗ 今天**是**冷 — impossible.
- ✓ 今天**很**冷 — le 很 est une liaison grammaticale, pas « très ».

**Phénomènes météo (ce sont des verbes !) :**
- 下雨 (xià yǔ) = il pleut (littéralement « tomber pluie »).
- 下雪 (xià xuě) = il neige · 刮风 (guā fēng) = il y a du vent.

**4 saisons :** 春天 · 夏天 · 秋天 · 冬天.`,
    objectives: [`Construire 天气很 + adjectif (sans 是)`, `Utiliser 下雨/下雪/刮风 comme verbes`, `Nommer les 4 saisons`, `Décrire la météo du jour`],
    flashcards: [`天气`, `冷`, `热`, `暖和`, `凉快`, `下雨`, `下雪`, `刮风`, `春天`, `夏天`, `秋天`, `冬天`],
  },
  "cecr-a2-day-m4": {
    title: `Dates & jours`, titleEn: `Dates & days`,
    duration: 10,
    category: `vocabulary`,
    difficulty: `elementary`,
    introTitle: `2026年4月18日 : lire la date à la chinoise`,
    introContent: `Le chinois date **du plus grand au plus petit** — l'inverse du français.

**2026年 (nián) 4月 (yuè) 18日 (rì)** = le 18 avril 2026.

**Lire une année :** chiffre par chiffre — 二零二六年 (2-0-2-6 année), jamais « deux mille vingt-six ».

**Demander la date :** 今天**几月几号 (jǐ yuè jǐ hào)** ? — quel mois quel jour ?

**Jours de la semaine :**
- 星期一 à 星期六 = lundi à samedi.
- **星期天 ou 星期日 = dimanche** (exception — pas 星期七).
- Variante orale courte : 周一, 周二...

**Demander le jour :** 今天**星期几 (xīngqī jǐ)** ?`,
    objectives: [`Écrire une date : 年月日 (grand → petit)`, `Lire l'année chiffre par chiffre`, `Nommer les 7 jours avec 星期`, `Demander 几月几号 / 星期几`],
    flashcards: [`年`, `月`, `日`, `号`, `星期`, `星期一`, `星期二`, `星期天`, `今天`, `明天`, `昨天`],
  },
  "cecr-a2-phone-m1": {
    title: `Décrocher, raccrocher`, titleEn: `Pick up, hang up`,
    duration: 10,
    category: `conversation`,
    difficulty: `elementary`,
    introTitle: `喂 ? (ton 2) : ouvrir un appel à la chinoise`,
    introContent: `Au téléphone, l'ouverture standard est **喂 (wèi) ?** — avec un ton montant (ton 2 à l'oral, plus doux que le ton 4 attendu à l'écrit).

**Pour demander qui appelle :**
- 你是**哪位 (nǎ wèi)** ? = vous êtes qui ? (poli, littéralement « quelle personne estimée ?»).
- 你是谁 (shéi) ? = plus direct, moins poli.

**Se présenter :** 我是 [nom].

**Trois verbes clés du téléphone :**
- 打电话 (dǎ diànhuà) = passer un appel (littéralement « frapper un téléphone »).
- 接电话 (jiē diànhuà) = décrocher.
- 挂电话 (guà diànhuà) = raccrocher.

**Se promettre de rappeler :** 我一会儿打给你 (wǒ yíhuìr dǎ gěi nǐ) = je t'appelle dans un moment.`,
    objectives: [`Ouvrir avec 喂 ? (ton 2 par convention)`, `Demander 你是哪位 ?`, `Utiliser 打/接/挂电话`, `Dire 我一会儿打给你`],
    flashcards: [`喂`, `打电话`, `接电话`, `挂电话`, `你是哪位`, `我是`, `电话`, `手机`, `一会儿`],
  },
  "cecr-a2-phone-m2": {
    title: `Messages WeChat`, titleEn: `WeChat messages`,
    duration: 10,
    category: `culture`,
    difficulty: `elementary`,
    introTitle: `微信 : messagerie, paiement, réseau — tout-en-un`,
    introContent: `**微信 (wēixìn)** = « micro-message » — bien plus que WhatsApp : messagerie, paiement, réseau social, mini-apps, QR code d'entrée...

**Vocabulaire essentiel :**
- 加好友 (jiā hǎoyǒu) = ajouter un ami.
- 扫一扫 (sǎo yī sǎo) = scanner le QR pour ajouter.
- 发消息 (fā xiāoxi) = envoyer un message.
- **语音 (yǔyīn)** = message vocal — la forme préférée en Chine !
- 朋友圈 (péngyouquān) = Moments (fil d'actualité).

**Code social :** en Chine, on envoie des **audios**, pas des textes. Répondre en texte peut paraître froid ou distancié.

**Règle non-écrite :** ne pas lire un message WeChat pendant plus de 3 jours = impolitesse notable.`,
    objectives: [`Ajouter un ami : 加好友 / 扫一扫`, `Envoyer message/audio/vidéo`, `Partager sur 朋友圈`, `Comprendre la culture audio en Chine`],
    flashcards: [`微信`, `加好友`, `扫一扫`, `发消息`, `语音`, `视频通话`, `朋友圈`, `点赞`, `评论`],
  },
  "cecr-a2-phone-m3": {
    title: `Urgence & problème`, titleEn: `Emergency & problem`,
    duration: 10,
    category: `vocabulary`,
    difficulty: `elementary`,
    introTitle: `110 · 119 · 120 : police, pompiers, ambulance`,
    introContent: `**Trois numéros à connaître absolument :**
- **110** = police (警察 jǐngchá).
- **119** = pompiers (消防 xiāofáng).
- **120** = ambulance (救护车 jiùhùchē).

**Crier au secours :**
- **救命 (jiùmìng) !** = à l'aide ! sauvez-moi ! — cri universel.
- **帮帮我 (bāngbang wǒ) !** = aidez-moi !

**Décrire le problème (avec 了 = changement d'état) :**
- 我病了 = je suis tombé malade · 我受伤了 = je me suis blessé.
- 我迷路了 = je me suis perdu · 东西丢了 = j'ai perdu mes affaires.

**Indispensable :** avoir son adresse **en caractères** sur le téléphone — les chauffeurs ne lisent pas le pinyin.`,
    objectives: [`Mémoriser 110/119/120`, `Crier 救命 ! / 帮帮我 !`, `Décrire un problème avec V + 了`, `Connaître 护照 / 大使馆`],
    flashcards: [`救命`, `帮帮我`, `警察`, `消防`, `救护车`, `病了`, `受伤`, `丢了`, `迷路`, `护照`, `大使馆`],
  },
  "cecr-a2-grammar-m1": {
    title: `了 (1/3) : perfectif après le verbe`, titleEn: `了 (1/3): perfective after verb`,
    duration: 15,
    category: `grammar`,
    difficulty: `elementary`,
    introTitle: `了 après le verbe : complétion, pas passé`,
    introContent: `**了 (le)** après le verbe = complétion de l'action. Ce n'est PAS un temps passé — le chinois n'a pas de conjugaison temporelle.

- 我吃饭 = je mange / je vais manger (neutral).
- 我**吃了**饭 = j'ai fini de manger (complété).

**Règle structurale :** verbe + 了 a besoin d'un complément — objet, quantité ou adverbe.
- ✓ 我吃了**饭** · 我吃了**两碗** · 我**已经**吃了.
- ✗ 我吃了 tout seul sonne incomplet à l'oral.

**Négation : 没 + verbe, SANS 了.**
- ✓ 我**没**吃饭.
- ✗ 我**没**吃**了**饭 — impossible.`,
    objectives: [`Placer 了 juste après le verbe`, `Comprendre : 了 = complétion, pas passé`, `Compléter : verbe + 了 + objet/quantité`, `Nier avec 没 (sans 了)`],
    flashcards: [`了`, `吃了`, `去了`, `买了`, `看了`, `没`, `没吃`, `没去`, `已经`],
  },
  "cecr-a2-grammar-m2": {
    title: `过 : expérience vécue`, titleEn: `过: lived experience`,
    duration: 12,
    category: `grammar`,
    difficulty: `elementary`,
    introTitle: `过 = expérience de vie, 了 = action récente`,
    introContent: `**过 (guò)** après le verbe = expérience vécue **dans la vie**, au moins une fois.

- 我**去过**中国 = je suis allé en Chine (au moins une fois, quelquefois).
- 你**吃过**饺子吗 ? = tu as déjà mangé des raviolis ?

**Contraste essentiel avec 了 :**
- 我吃**了**饺子 = j'ai mangé les raviolis (action précise et récente).
- 我吃**过**饺子 = j'ai déjà mangé des raviolis (expérience de vie, moment flou).

**Négation : 没 + verbe + 过.**
- 我**没**去**过**中国 = je ne suis jamais allé en Chine.
- ✗ 不 + V + 过 — jamais avec 不.

**Question :** V + 过 + 吗 ? = as-tu déjà... ?`,
    objectives: [`Placer 过 après le verbe`, `Distinguer 过 (expérience) / 了 (complétion)`, `Poser : V + 过 + 吗 ?`, `Nier : 没 + V + 过`],
    flashcards: [`过`, `去过`, `吃过`, `看过`, `学过`, `没去过`, `没吃过`, `从来没`],
  },
  "cecr-a2-grammar-m3": {
    title: `在 : action en cours`, titleEn: `在: action in progress`,
    duration: 10,
    category: `grammar`,
    difficulty: `elementary`,
    introTitle: `在/正在 + verbe + 呢 : marquer l'action en cours`,
    introContent: `**在 (zài)** a deux usages très différents :

**1. Emplacement :** 我在家 = je suis à la maison.

**2. Action en cours :** 在 + verbe = être en train de.
- 我在吃饭 = je suis en train de manger.

**Renforcer l'instantanéité :** 正在 (zhèngzài) = exactement en train de.
- 他**正在**睡觉 = il est JUSTEMENT en train de dormir (ne pas déranger).

**Particule de fin 呢 (ne) :** souvent ajoutée à l'oral pour indiquer la continuité.
- 我在看书**呢** = je suis en train de lire (sous-entendu : laisse-moi tranquille).

**Piège :** 在 + lieu ≠ 在 + verbe. 我在学校 (lieu) vs 我在学习 (action).`,
    objectives: [`Distinguer 在 lieu / 在 progressif`, `Former 在 + verbe pour une action en cours`, `Renforcer avec 正在`, `Ajouter 呢 à la fin`],
    flashcards: [`在`, `正在`, `呢`, `在吃`, `在看`, `在做`, `在说`, `在睡觉`],
  },
  "cecr-a2-grammar-m4": {
    title: `也 vs 都 : aussi et tous`, titleEn: `也 vs 都: also and all`,
    duration: 10,
    category: `grammar`,
    difficulty: `elementary`,
    introTitle: `也 s'écho un sujet, 都 totalise — avant le verbe`,
    introContent: `**也 (yě)** = aussi — fait écho à un sujet précédent.
**都 (dōu)** = tous sans exception — totalise.

**Règle absolue :** les deux se placent **AVANT le verbe**.
- ✓ 我**也**喜欢 = moi aussi j'aime.
- ✗ 我喜欢**也** — impossible.
- ✓ 我们**都**是学生 = on est tous étudiants.

**Piège :** les mettre avant le sujet.
- ✗ **也**我喜欢 — impossible.

**Combinaison possible :** 我们**也都**是学生 (nous aussi on est tous étudiants). Ordre fixe : 也 avant 都.

**Négation :**
- 也不 (yě bù) = ne... pas non plus · 都不 (dōu bù) = aucun ne...`,
    objectives: [`Utiliser 也 pour l'écho du sujet`, `Utiliser 都 pour « tous sans exception »`, `Placer 也/都 AVANT le verbe`, `Respecter l'ordre 也 + 都`],
    flashcards: [`也`, `都`, `我也`, `他也`, `都是`, `都不`, `都有`, `我们都`],
  },
  "cecr-a2-grammar-m5": {
    title: `要 vs 想 : vouloir en deux nuances`, titleEn: `要 vs 想: want in two shades`,
    duration: 12,
    category: `grammar`,
    difficulty: `elementary`,
    introTitle: `我要 commande, 我想 envisage : deux forces différentes`,
    introContent: `**要 (yào)** et **想 (xiǎng)** traduisent tous deux « vouloir », mais de force différente.

- **要 (yào)** = volonté ferme, décision prise. Proche de « I will » ou « give me ».
  - 我**要**一杯咖啡 = je veux un café (au serveur — direct et normal).
- **想 (xiǎng)** = désir, envie, projet hypothétique. Proche de « I'd like ».
  - 我**想**喝咖啡 = j'ai envie de boire un café (moins engagé).

**Au restaurant : toujours 要.** Dire 想 à un serveur sonne hésitant.

**Bonus de 想 :** aussi « penser à » / « manquer ».
- 我**想**你 = tu me manques (littéralement « je pense à toi »).

**Négation :** 不要 (búyào) = ne veux pas · 不想 (bù xiǎng) = n'a pas envie.`,
    objectives: [`Choisir 要 (volonté ferme) / 想 (désir)`, `Utiliser 要 au restaurant`, `Exprimer un projet avec 想`, `Comprendre 想 = « manquer » (emotional)`],
    flashcards: [`要`, `想`, `不要`, `不想`, `我要`, `我想`, `想你`, `想家`, `要工作`],
  },
  "cecr-a2-culture-m1": {
    title: `春节 : le Nouvel An chinois`, titleEn: `春节: Chinese New Year`,
    duration: 12,
    category: `culture`,
    difficulty: `elementary`,
    introTitle: `春节 : 15 jours, 红包 et raviolis obligatoires`,
    introContent: `**春节 (Chūnjié)** = Fête du Printemps — la plus grande fête chinoise, sur 15 jours (fin janvier à mi-février selon le calendrier lunaire).

**5 rituels clés :**
- **团圆饭 (tuányuán fàn)** = repas de retrouvailles la veille.
- **红包 (hóngbāo)** = enveloppes rouges avec de l'argent (aux enfants et juniors).
- **春联 (chūnlián)** = distiques rouges collés sur les portes.
- **鞭炮 (biānpào)** = pétards pour chasser les mauvais esprits.
- **饺子 (jiǎozi)** = raviolis (obligatoires au nord le soir du Nouvel An).

**Salutations :** 新年快乐 (xīnnián kuàilè) ! = bonne année ! · 恭喜发财 (gōngxǐ fācái) ! = prospérité !

**Tabous :** pas de balayage le 1er jour (on emporterait la chance), pas de chiffre 4 dans les cadeaux.`,
    objectives: [`Nommer 5 rituels clés`, `Souhaiter 新年快乐 / 恭喜发财`, `Savoir recevoir un 红包`, `Connaître 3 tabous du jour 1`],
    flashcards: [`春节`, `团圆饭`, `红包`, `春联`, `鞭炮`, `饺子`, `新年快乐`, `恭喜发财`],
  },
  "cecr-a2-culture-m2": {
    title: `中秋节 : Fête de la Lune`, titleEn: `中秋节: Mid-Autumn Festival`,
    duration: 10,
    category: `culture`,
    difficulty: `elementary`,
    introTitle: `中秋节 : gâteaux de lune et légende de 嫦娥`,
    introContent: `**中秋节 (Zhōngqiūjié)** = Fête de la mi-automne — 15e jour du 8e mois lunaire (généralement septembre). La 2e fête la plus importante après la 春节.

**Symbole central :** la pleine lune 满月 (mǎnyuè) = réunion familiale (团圆 tuányuán).

**月饼 (yuèbǐng)** = gâteaux de lune — ronds, riches, fourrés de pâte de haricot rouge, graines de lotus ou jaune d'œuf salé (qui représente la lune).

**Légende :** 嫦娥 (Cháng'é) a bu l'élixir d'immortalité et s'est envolée vers la lune — c'est la déesse lunaire.

**Aspect professionnel :** offrir des 月饼 aux collègues et partenaires est un rituel business important. Ne pas en recevoir = être exclu du cercle.`,
    objectives: [`Dater 中秋节 (15e jour du 8e mois lunaire)`, `Connaître 月饼 et leurs fourrages`, `Raconter la légende de 嫦娥`, `Comprendre 团圆 = réunion familiale`],
    flashcards: [`中秋节`, `月饼`, `满月`, `团圆`, `嫦娥`, `赏月`, `农历`, `中秋快乐`],
  },
  "cecr-a2-culture-m3": {
    title: `Étiquette à table`, titleEn: `Table etiquette`,
    duration: 10,
    category: `culture`,
    difficulty: `elementary`,
    introTitle: `筷子 : 5 tabous à ne jamais enfreindre`,
    introContent: `**5 tabous absolus avec les baguettes (筷子 kuàizi) :**

1. **Jamais planter les baguettes verticalement dans le riz** — rappelle l'encens funéraire pour les morts. Le tabou le plus grave.
2. Ne pas tapoter son bol avec les baguettes — geste de mendiant.
3. Ne jamais passer de nourriture de baguette en baguette — rappelle le rituel funéraire des os.
4. L'aîné ou l'hôte mange en premier — on attend.
5. Servir les autres avant soi, surtout pour le thé (茶) et l'alcool (酒).

**Compliment après repas :** 很好吃，谢谢 !
**Réponse de l'hôte :** 哪里，很一般 (pas du tout, c'est très ordinaire) — auto-dévalorisation polie standard.`,
    objectives: [`Mémoriser les 5 règles des baguettes`, `Attendre l'aîné / l'hôte`, `Servir les autres d'abord`, `Remercier : 很好吃，谢谢`],
    flashcards: [`筷子`, `碗`, `盘子`, `勺子`, `敬酒`, `干杯`, `请`, `谢谢`, `很好吃`],
  },
  "cecr-a2-culture-m4": {
    title: `Zodiaque chinois`, titleEn: `Chinese zodiac`,
    duration: 10,
    category: `culture`,
    difficulty: `elementary`,
    introTitle: `你属什么 ? Le zodiaque qui révèle l'âge`,
    introContent: `Le zodiaque chinois = 12 animaux en cycle de 12 ans.

**Ordre fixe :** 鼠 rat · 牛 bœuf · 虎 tigre · 兔 lapin · 龙 dragon · 蛇 serpent · 马 cheval · 羊 mouton · 猴 singe · 鸡 coq · 狗 chien · 猪 cochon.

**Question typique :** 你**属**什么 (nǐ shǔ shénme) ? = tu es de quel signe ?
**Réponse :** 我**属**龙 (wǒ shǔ lóng) = je suis du signe du dragon.

**Attention :** cette question permet de deviner l'âge à 12 ans près — conscients-en avant de répondre.

**龙 = le plus prestigieux.** Les naissances explosent dans les années du dragon.

**本命年 (běnmìngnián)** = l'année de son propre signe (tous les 12 ans) — porter du rouge pour conjurer la malchance.`,
    objectives: [`Nommer les 12 animaux du zodiaque`, `Dire 我属 + animal`, `Connaître l'année en cours`, `Comprendre 本命年 et le rouge`],
    flashcards: [`生肖`, `属`, `鼠`, `牛`, `虎`, `兔`, `龙`, `蛇`, `马`, `羊`, `猴`, `鸡`, `狗`, `猪`, `本命年`],
  },
  "cecr-a2-conversation-m1": {
    title: `Au marché : négocier un prix`, titleEn: `At the market: bargain a price`,
    duration: 12,
    category: `conversation`,
    difficulty: `beginner`,
    introTitle: `太贵了 → 便宜点儿 → 算了 : l'art du marchandage`,
    introContent: `Marchander est une norme dans les marchés, mais **jamais** en supermarché ou centre commercial.

**Le script du marchandage en 4 temps :**

1. **Demander le prix :** 多少钱 (duōshao qián) ? ou 怎么卖 (zěnme mài) ?
2. **Montrer son désaccord :** 太贵了 (tài guì le) ! = c'est trop cher !
3. **Contre-offrir :** 便宜一点吧 (piányi yīdiǎn ba) = un peu moins cher ? · 50块怎么样 ?
4. **Menacer de partir :** **算了 (suànle)** = laisse tomber — le vendeur cède souvent.

**Info :** le prix affiché est souvent 2 à 3 fois le prix réel.

**Formule-clé :** 别的地方更便宜 (biéde dìfang gèng piányi) = c'est moins cher ailleurs.`,
    objectives: [`Demander un prix : 多少钱 / 怎么卖`, `Marchander avec 便宜一点吧 + 算了`, `Distinguer marché (négo) vs supermarché`, `Demander à scanner : 可以扫吗 ?`],
    flashcards: [`贵`, `便宜`, `块`, `算了`, `怎么卖`, `扫`, `现金`, `刷卡`],
  },
  "cecr-a2-conversation-m2": {
    title: `Météo et saisons : conversation et conseils`, titleEn: `Weather and seasons: chat and advice`,
    duration: 12,
    category: `conversation`,
    difficulty: `beginner`,
    introTitle: `你吃了吗 ? La météo n'est pas un brise-glace en Chine`,
    introContent: `**Culture d'abord :** en Chine, le vrai brise-glace entre amis n'est pas la météo mais **你吃了吗 (nǐ chī le ma) ?** = t'as mangé ? (équivalent de « ça va »).

Pour parler de la météo : **今天天气怎么样 ?** = quel temps il fait aujourd'hui ?

**Adjectifs météo (+ 很 obligatoire) :** 很热 · 很冷 · 很暖和 · 很凉快.

**Phénomènes (verbes !) :** 下雨 il pleut · 下雪 il neige · 刮风 il y a du vent · 晴天 beau temps.

**Conseils vestimentaires :**
- 多穿一点 = mets plus de vêtements.
- 注意保暖 = fais attention à rester au chaud · 别感冒 = évite le rhume.

**Proverbe :** 春捂秋冻 = au printemps couvre-toi bien, en automne supporte le froid — c'est bon pour la santé.`,
    objectives: [`Décrire la météo : 热/冷/雨/雪/风`, `Connaître les 4 saisons et vêtements`, `Conseiller : 多穿一点 / 注意保暖`, `Reconnaître 你吃了吗 ? comme brise-glace`],
    flashcards: [`天气`, `热`, `冷`, `下雨`, `刮风`, `春天`, `冬天`, `感冒`],
  },
  "cecr-a2-conversation-m3": {
    title: `Dire qu'on est malade ou fatigué`, titleEn: `Say you're sick or tired`,
    duration: 12,
    category: `conversation`,
    difficulty: `beginner`,
    introTitle: `我不舒服 : décrire ses symptômes et naviguer la santé`,
    introContent: `**Formule passe-partout :** 我不舒服 (wǒ bù shūfu) = je ne me sens pas bien.

**Symptômes (avec 了 = changement d'état) :**
- 我感冒了 = j'ai attrapé un rhume · 我发烧 = j'ai de la fièvre.
- 我头疼 = j'ai mal à la tête · 肚子疼 = j'ai mal au ventre.

**Système de santé chinois :**
- En Chine, on va **directement à l'hôpital** (医院) sans médecin généraliste.
- À l'hôpital, on prend un ticket **挂号 (guàhào)** avant de consulter.
- À la pharmacie (药店) : 感冒药 (rhume) · 退烧药 (fièvre).

**Encouragements :** 加油 ! · 多休息 · 早点睡觉.

**Formule affectueuse :** 注意身体 (zhùyì shēntǐ) = prends soin de toi — marqueur fort d'affection entre amis.`,
    objectives: [`Décrire un symptôme : 不舒服 / 头疼 / 发烧`, `Naviguer le système : 医院 + 挂号`, `Encourager : 多休息 / 早点睡觉`, `Reconnaître 注意身体 comme affection`],
    flashcards: [`舒服`, `感冒`, `发烧`, `疼`, `医院`, `累`, `睡觉`, `压力`, `身体`],
  },
  "cecr-a2-conversation-m4": {
    title: `Prendre RDV + qui paie au resto`, titleEn: `Make appointments + who pays at the restaurant`,
    duration: 12,
    category: `conversation`,
    difficulty: `beginner`,
    introTitle: `你周末有空吗 ? L'art du RDV et du « je t'invite »`,
    introContent: `**Proposer un RDV :**
- 你**周末有空**吗 ? (nǐ zhōumò yǒu kōng ma) = tu es libre ce weekend ?
- 我们什么时候见面 ? = quand est-ce qu'on se voit ?

**Annuler poliment :** 不好意思，我有事，能不能**改天** ? = désolé, j'ai un truc, on peut reporter ?

**Sur WeChat avant d'arriver :**
- 你到哪了 ? = t'es où ? · 我**马上**到 = j'arrive dans 2 minutes.

**La danse du « qui paie » :**
1. L'hôte : 我**请**你 (wǒ qǐng nǐ) = je t'invite (marqueur fort de relation).
2. L'invité refuse poliment : 不用，我自己来.
3. L'hôte insiste : 没事，我请你.
4. L'invité cède : **那好吧，下次我请** = d'accord, la prochaine fois c'est moi.

**AA制 (AA zhì)** = chacun paie sa part — courant entre collègues, rare entre amis proches.`,
    objectives: [`Proposer / annuler un RDV avec 改天`, `Confirmer sur WeChat : 我马上到`, `Comprendre la danse 我请你 / 不用 / 下次我请`, `Connaître AA制 et son contexte`],
    flashcards: [`见面`, `有空`, `周末`, `改天`, `请`, `不用`, `下次`, `AA制`],
  },
  "cecr-a2-conversation-m5": {
    title: `Raconter sa journée + parler de ses loisirs`, titleEn: `Tell about your day + hobbies`,
    duration: 12,
    category: `conversation`,
    difficulty: `beginner`,
    introTitle: `我早上... 然后... 最后... : raconter sa journée`,
    introContent: `**Structure pour raconter sa journée :**

早上 (matin) → 中午 (midi) → 下午 (après-midi) → 晚上 (soir)

**Connecteurs :** 然后 (ránhòu) ensuite · 接着 (jiēzhe) puis · 最后 (zuìhòu) finalement.

**Modèle :** 我早上七点起床，然后吃早饭，八点上班 = je me lève à 7h, puis je prends le petit-déj, et je travaille à 8h.

**Parler de ses loisirs :** 我**喜欢** + verbe.
- 看电影 · 听音乐 · 跑步 · 旅游 · 玩游戏 · 拍照.

**Fréquence (avant le verbe) :** 经常 souvent · 有时候 parfois · 偶尔 rarement · 从来不 jamais.

**Pour demander :** 你平时**喜欢做什么** ? (plus naturel que 你的爱好是什么 ?)

**Culture :** 996 (9h-21h, 6 jours/semaine) — référence instantanément comprise dans la tech chinoise.`,
    objectives: [`Structurer une journée : 早上→晚上 + connecteurs`, `Dire ce qu'on aime : 我喜欢 + verbe`, `Préciser la fréquence : 经常/有时候/偶尔`, `Connaître la référence 996`],
    flashcards: [`起床`, `上班`, `下班`, `回家`, `看书`, `电影`, `经常`, `有时候`],
  },
  "cecr-a2-conversation-m6": {
    title: `Au restaurant : commander et donner son avis`, titleEn: `At the restaurant: order and give feedback`,
    duration: 12,
    category: `conversation`,
    difficulty: `beginner`,
    introTitle: `几位 → 菜单 → 我要 → 买单 : le flux du restaurant`,
    introContent: `**Le flux d'un repas au restaurant chinois :**

1. **À l'entrée :** 几位 ? → 两位 (deux) / 三位 (trois).
2. **Carte :** 请给我菜单 (qǐng gěi wǒ càidān).
3. **Commander :** 我要 X · 来一个 X · 服务员 ! (à voix haute, c'est normal).
4. **Préciser :** 不要辣 (pas piquant) · 少盐 (moins de sel) · 多放 X (plus de...).
5. **Addition :** 买单 ! — pas de pourboire en Chine.

**Avis positifs :** 很好吃 · 太好吃了 · 味道不错 · 鲜 (frais et savoureux).
**Avis nuancés :** 有点淡 (un peu fade) · 太咸 (trop salé) · 太油 (trop gras).

**Piège culturel :** 你吃习惯了吗 ? (tu t'y habitues ?) — réponds **positivement** même si tu galères, sinon l'hôte se sent blessé.`,
    objectives: [`Suivre le flow resto : 几位 → 菜单 → 我要 X → 买单`, `Préciser : 不要辣 / 少盐 / 多放 X`, `Complimenter : 好吃 / 鲜 / 味道不错`, `Répondre positivement à 你吃习惯了吗`],
    flashcards: [`位`, `菜单`, `辣`, `服务员`, `买单`, `好吃`, `味道`, `咸`, `清淡`],
  },
  "cecr-a2-conversation-m7": {
    title: `Décrire des relations + des personnalités`, titleEn: `Describe relationships + personalities`,
    duration: 12,
    category: `conversation`,
    difficulty: `beginner`,
    introTitle: `这是我朋友 + 他/她人很好 : présenter et décrire`,
    introContent: `**Présenter quelqu'un :** 这是我朋友 X = voilà mon ami X.

**Vocabulaire des relations :**
- Famille : 爸爸 · 妈妈 · 哥哥 / 弟弟 · 姐姐 / 妹妹 (toujours aîné/cadet).
- Amis : 朋友 · 好朋友 · 男朋友 (petit ami) · 女朋友 (petite amie).
- Travail : 同事 (collègue) · 老板 (patron) · 同学 (camarade de classe).

**Décrire la personnalité :**
- 聪明 intelligent · 善良 gentil · 热情 chaleureux · 幽默 drôle · 努力 travailleur.
- **Formule passe-partout :** 他人很好 = il/elle est vraiment bien.
- **Nuancer :** 有点 + adjectif = légèrement... (employé pour les défauts).

**Question culturelle inévitable :** 你结婚了吗 ? = tu es marié(e) ? — pas une intrusion, juste de la curiosité normale. Réponds directement.`,
    objectives: [`Distinguer grand/petit frère/sœur`, `Présenter : 这是我朋友 / 同事 X`, `Décrire avec 聪明 / 热情 / 安静`, `Répondre à 你结婚了吗 sans gêne`],
    flashcards: [`朋友`, `同事`, `老板`, `同学`, `聪明`, `热情`, `幽默`, `认真`],
  },
  "cecr-a2-nuances-m1": {
    title: `才 vs 就 — tard vs tôt (timing et quantité)`, titleEn: `才 vs 就 — late vs early (timing and quantity)`,
    duration: 12,
    category: `vocabulary`,
    difficulty: `beginner`,
    introTitle: `就 = déjà / tôt, 才 = seulement / tard — subjectif`,
    introContent: `**就 (jiù)** et **才 (cái)** expriment le **même événement** vu différemment.

- **就 (jiù)** = déjà, tôt, suffisant — coloration **positive** ou neutre.
  - 我七点**就**到了 = je suis arrivé dès 7h (en avance — bien !).
- **才 (cái)** = seulement, pas avant, tard — coloration **négative** ou déçue.
  - 我九点**才**到 = je suis arrivé seulement à 9h (en retard — oh non).

**Même logique pour les quantités :**
- 我**才**吃了一个 = je n'en ai mangé QU'UN (déçu, trop peu).
- 这本书**才**十块 = ce livre ne coûte QUE 10 yuans (étonnamment bon marché).

**Clé mémo :** 才 = déception/surprise négative · 就 = satisfaction/surprise positive.`,
    objectives: [`Choisir 才 (tard, peu) vs 就 (tôt, suffisant)`, `Reconnaître 你怎么才来 ? comme reproche`, `Utiliser 才 pour étonnement « seulement »`, `Repérer le ton négatif/positif`],
    flashcards: [`才`, `就`, `到`, `已经`, `刚`, `一个`, `本`, `足够`],
  },
  "cecr-a2-nuances-m2": {
    title: `还 vs 再 vs 又 — encore (état, futur, passé)`, titleEn: `还 vs 再 vs 又 — again (state, future, past)`,
    duration: 12,
    category: `vocabulary`,
    difficulty: `beginner`,
    introTitle: `还/再/又 : en cours, futur ou répété au passé`,
    introContent: `Trois mots pour « encore » — chacun ancré dans un moment différent.

- **还 (hái)** = encore (état **en cours**, pas encore changé).
  - 我还在工作 = je suis encore en train de travailler.
  - 我还没吃 = je n'ai pas encore mangé.
- **再 (zài)** = encore une fois (**futur**, action pas encore refaite).
  - 我再来 = je reviendrai · 再说一遍 = répétez encore une fois.
- **又 (yòu)** = encore une fois (**passé**, répétition déjà faite, souvent critique).
  - 你**又**迟到了 ! = tu es encore en retard !

**Piège :** « il pleut encore » → 又下雨了 (passé/constat) ou 还在下雨 (ça continue).

**Règle mémo :** 还 = maintenant ça dure · 再 = demain je referai · 又 = hier ça s'est reproduit.`,
    objectives: [`Distinguer 还 (en cours) vs 再 (futur) vs 又 (passé)`, `Construire 还没 + verbe (pas encore)`, `Utiliser 又 pour reproche/répétition passée`, `Choisir 再 pour action future`],
    flashcards: [`还`, `再`, `又`, `还没`, `继续`, `迟到`, `下雨`, `重复`],
  },
  "cecr-a2-nuances-m3": {
    title: `跟 vs 和 vs 与 + 给 vs 对 — avec / à`, titleEn: `跟 vs 和 vs 与 + 给 vs 对 — with / to`,
    duration: 12,
    category: `vocabulary`,
    difficulty: `beginner`,
    introTitle: `和/跟/与 et 给/对 : registres et canaux de communication`,
    introContent: `**和 / 跟 / 与** = « et/avec » — même sens, registres différents.

- **和 (hé)** = neutre, partout — choix par défaut.
- **跟 (gēn)** = oral et chaleureux — entre amis proches.
- **与 (yǔ)** = écrit et formel — jamais à l'oral.

**Pour parler À quelqu'un — deux nuances :**
- **跟 X 说** = échange à deux sens (dialogue ouvert).
- **对 X 说** = je dis à X (déclaration, sans attendre de réponse).

**Pour téléphoner / envoyer — toujours 给 :**
- **给 X 打电话** = appeler X.
- **给 X 发消息** = envoyer un message à X.

**Règle :** le verbe gouverne la préposition — mémorise les paires verbe + prép ensemble.`,
    objectives: [`Choisir 和/跟/与 selon registre`, `Construire 跟 X 说话 vs 对 X 说`, `Utiliser 给 X 打电话 / 给 X 发消息`, `Mémoriser : verbe gouverne préposition`],
    flashcards: [`和`, `跟`, `与`, `对`, `给`, `打电话`, `发`, `消息`],
  },
  "cecr-a2-nuances-m4": {
    title: `在 vs 正在 vs 着 — état, en cours, statique`, titleEn: `在 vs 正在 vs 着 — state, ongoing, static`,
    duration: 12,
    category: `vocabulary`,
    difficulty: `beginner`,
    introTitle: `在/正在 = action, 着 = état statique maintenu`,
    introContent: `Trois manières de marquer la durée, selon la nature de l'action.

**在 (zài) + verbe = action en cours (progressif simple)**
- 我在吃饭 = je suis en train de manger.

**正在 (zhèngzài) + verbe = exactement en ce moment**
- 我**正在**吃饭呢 = je mange JUSTEMENT (ne me dérange pas).

**Verbe + 着 (zhe) = état continu et statique**
- 他**坐着** = il est assis (position maintenue, pas en mouvement).
- 门**开着** = la porte est ouverte (état des choses).

**Différence clé :**
- 在/正在 → ACTION en cours (dynamique).
- 着 → ÉTAT maintenu (statique, comme une photo).`,
    objectives: [`Construire 在 + verbe (en train de)`, `Insister avec 正在 + verbe + 呢`, `Marquer un état avec verbe + 着`, `Distinguer 坐着 (assis) vs 在坐下 (s'asseyant)`],
    flashcards: [`在`, `正在`, `着`, `呢`, `吃饭`, `坐着`, `站着`, `开着`],
  },
  "cecr-a2-nuances-m5": {
    title: `一点 vs 有点 — un peu (positif vs négatif)`, titleEn: `一点 vs 有点 — a bit (positive vs negative)`,
    duration: 12,
    category: `vocabulary`,
    difficulty: `beginner`,
    introTitle: `一点 après le verbe, 有点 avant l'adjectif négatif`,
    introContent: `**一点 (yīdiǎn)** et **有点 (yǒudiǎn)** signifient tous deux « un peu » — mais leur position et connotation diffèrent.

**一点 (yīdiǎn) = neutre/positif, après le verbe ou l'adjectif**
- 慢**一点** = un peu plus lentement (demande neutre).
- 多吃**一点** = mange un peu plus.
- 我会**一点** = j'en sais un peu.

**有点 (yǒudiǎn) = légèrement négatif, avant l'adjectif**
- 我**有点**累 = je suis un peu fatigué (sous-entendu : c'est gênant).
- 这个**有点**贵 = c'est un peu cher (insatisfaction).

**Application marchandage :** 便宜**一点**吧 — le 吧 (ba) final adoucit la demande.

**Piège :** ne jamais mettre 有点 après le verbe, ni 一点 avant.`,
    objectives: [`Placer 一点 après verbe/comparatif`, `Placer 有点 avant adj négatif`, `Marchander avec 便宜一点吧`, `Adoucir avec 吧 final`],
    flashcards: [`一点`, `有点`, `慢`, `快`, `便宜`, `吧`, `想想`, `算了`],
  },
  "cecr-a2-nuances-m6": {
    title: `从 vs 离 + 从来/一直 — origine, distance, fréquence`, titleEn: `从 vs 离 + 从来/一直 — origin, distance, frequency`,
    duration: 12,
    category: `vocabulary`,
    difficulty: `beginner`,
    introTitle: `从 = depuis où, 离 = à quelle distance de`,
    introContent: `**从 (cóng)** et **离 (lí)** indiquent tous deux une relation spatiale — mais de nature différente.

- **从 (cóng)** = depuis, à partir de — marque l'**ORIGINE** (avec mouvement).
  - 我从北京来 = je viens de Pékin.
  - 从早上九点开始 = à partir de 9h du matin.
- **离 (lí)** = à distance de — mesure l'**ÉCART** (sans mouvement).
  - 我家**离**公司很近 = ma maison est près du bureau.
  - ✗ 我**离**北京来 — impossible.

**Combo :** 从 X **到** Y = de X à Y.

**Expressions de fréquence :**
- **从来不/没 + verbe** = ne jamais... (jamais dans la vie).
- **一直 + verbe** = tout le temps, sans interruption.`,
    objectives: [`Utiliser 从 pour origine de mouvement/temps`, `Utiliser 离 pour distance statique`, `Construire 从 X 到 Y`, `Distinguer 从来不 (jamais) vs 一直 (continu)`],
    flashcards: [`从`, `离`, `近`, `远`, `到`, `从来`, `一直`, `总是`],
  },
  "cecr-a2-nuances-m7": {
    title: `怎么 vs 怎么样 + 为什么 vs 怎么了`, titleEn: `怎么 vs 怎么样 + 为什么 vs 怎么了`,
    duration: 12,
    category: `vocabulary`,
    difficulty: `beginner`,
    introTitle: `怎么样 = avis, 怎么 = méthode, 怎么了 = empathie`,
    introContent: `Trois questions proches mais d'usages distincts :

**怎么样 (zěnmeyàng) = avis, état général**
- 你最近怎么样 ? = comment ça va ces derniers temps ? (excellent brise-glace).
- 这个怎么样 ? = qu'est-ce que tu en penses ?
- Réponses : 还行 (ça va) · 不错 (pas mal) · 挺好 (plutôt bien).

**怎么 (zěnme) = méthode ou cause**
- 这个怎么用 ? = comment ça s'utilise ?
- 你怎么知道 ? = comment tu sais ça ?

**怎么了 (zěnme le) = inquiétude, empathie**
- 你怎么了 ? = qu'est-ce qui se passe ? / ça ne va pas ?

**Pour 为什么 (wèi shénme) = cause logique :**
- 你为什么学中文 ? = pourquoi tu apprends le chinois ?

**Règle empathique :** avec quelqu'un en détresse, commence par **怎么了** — jamais par 为什么 (trop froid, trop analytique).`,
    objectives: [`Distinguer 怎么样 (avis) vs 怎么 (méthode)`, `Démarrer une conversation : 你最近怎么样 ?`, `Choisir 怎么了 (empathie) plutôt que 为什么`, `Réagir : 还行 / 不错 / 挺好`],
    flashcards: [`怎么样`, `怎么`, `为什么`, `怎么了`, `用`, `最近`, `担心`, `关心`],
  },
  "cecr-b11-le-m1": {
    title: `了 (2/3) : changement d'état`, titleEn: `了 (2/3): state change`,
    duration: 15,
    category: `grammar`,
    difficulty: `intermediate`,
    introTitle: `了 final : quelque chose a changé`,
    introContent: `了 (le) placé en **fin de phrase** ne marque pas le passé : il signale qu'**une situation vient de changer**.

Comparez :

- 他是老师 (tā shì lǎoshī) = il est prof (fait stable).
- 他是老师了 (tā shì lǎoshī le) = il est **devenu** prof (changement).
- 我饿 (wǒ è) = j'ai faim (description).
- 我饿了 (wǒ è le) = j'ai faim **maintenant** (avant non).

Autres exemples courants :

- 下雨了 (xià yǔ le) = il s'est mis à pleuvoir.
- 我不去了 (wǒ bù qù le) = je n'y vais plus (décision changée).

Ce 了 (le) exprime toujours : « voilà, les choses ont changé ». En français : « maintenant », « il est devenu ».

**Piège :** un verbe peut avoir **deux 了** : 我吃了三个苹果了 (wǒ chī le sān gè píngguǒ le) — le 1er marque l'accompli, le 2e que c'est clos maintenant.`,
    objectives: [`Placer 了 à la FIN pour un changement d'état`, `Distinguer 我饿 (description) / 我饿了 (nouveau)`, `Comprendre 下雨了, 我不去了`, `Reconnaître les doubles 了`],
    flashcards: [`下雨了`, `不去了`, `饿了`, `渴了`, `累了`, `晚了`, `老了`, `好了`],
  },
  "cecr-b11-le-m2": {
    title: `了 (3/3) : quantité atteinte`, titleEn: `了 (3/3): quantity reached`,
    duration: 12,
    category: `grammar`,
    difficulty: `intermediate`,
    introTitle: `Deux 了 : durée vécue et action en cours`,
    introContent: `La structure **V + 了 + quantité + 了** exprime une action **commencée dans le passé et toujours en cours** — l'équivalent de « depuis » en français.

- 我学了两年中文了 (wǒ xué le liǎng nián Zhōngwén le) = j'étudie le chinois **depuis** 2 ans (et je continue).
- 我学了两年中文 (wǒ xué le liǎng nián Zhōngwén) = j'ai étudié 2 ans (c'est **fini**).

Le **premier 了** marque l'aspect accompli (l'action a eu lieu). Le **deuxième 了** dit que la situation dure jusqu'à maintenant.

**Même logique pour les quantités :**

- 我吃了三碗 (wǒ chī le sān wǎn) = j'ai mangé 3 bols (terminé).
- 我吃了三碗了 (wǒ chī le sān wǎn le) = j'ai déjà mangé 3 bols (et ça peut continuer).

**Mnémotechnique :** deux 了 = action toujours en cours. Un seul 了 = c'est fini.`,
    objectives: [`Former V + 了 + quantité + 了`, `Exprimer une durée qui continue`, `Distinguer un seul 了 (fini) / deux 了 (en cours)`, `Utiliser avec 年/月/天/次/碗/本`],
    flashcards: [`学了`, `工作了`, `住了`, `等了`, `已经`, `多久`, `多长时间`, `还在`],
  },
  "cecr-b11-le-m3": {
    title: `了 : récap & pièges`, titleEn: `了: recap & traps`,
    duration: 15,
    category: `grammar`,
    difficulty: `intermediate`,
    introTitle: `Trois 了, trois positions, trois sens`,
    introContent: `Récapitulatif des trois emplois de 了 (le) — la carte mentale définitive.

- **(1) V + 了** (après verbe) : action **accomplie**. 我吃了饭 (wǒ chī le fàn) = j'ai mangé.
- **(2) Phrase + 了** (fin de phrase) : **changement d'état**. 我饿了 (wǒ è le) = j'ai faim maintenant.
- **(3) V + 了 + durée + 了** : action commencée et **toujours en cours**. 我吃了半小时了 (wǒ chī le bàn xiǎoshí le).

**Pièges fréquents :**

- Pour nier le perfectif → **没** : 我没吃饭 (wǒ méi chī fàn) ✓. Jamais 不 + V + 了 ✗.
- Pour nier un changement → **不** + 了 reste : 我不吃了 (wǒ bù chī le) = je n'en veux plus.
- Avec **每天/常常/总是** : jamais de 了 — 我每天吃饭 ✓, 我每天吃了饭 ✗.`,
    objectives: [`Classer toute phrase avec 了 en 3 types`, `Nier correctement (没 ou 不, jamais avec 了)`, `Proscrire 了 avec 每天/常常/总是`, `Maîtriser le double 了`],
    flashcards: [`了`, `没`, `不`, `已经`, `还没`, `常常`, `每天`, `刚才`],
  },
  "cecr-b11-ba-m1": {
    title: `把 (1/2) : qu'est-ce qu'on en fait ?`, titleEn: `把 (1/2): what do we do WITH it?`,
    duration: 15,
    category: `grammar`,
    difficulty: `intermediate`,
    introTitle: `把 : amener l'objet avant le verbe`,
    introContent: `La construction 把 (bǎ) est la signature du chinois intermédiaire.

- Structure : S + 把 (bǎ) + OBJET + V + complément.

Elle déplace l'objet AVANT le verbe et oblige le verbe à être « complété » (avec 了 , un résultatif, une direction, une quantité — jamais un verbe nu !). 我把书放在桌上 (wǒ bǎ shū fàng zài zhuō shàng) (j'ai mis le livre sur la table) vs 我放书在桌上 (wǒ fàng shū zài zhuō shàng) ✗ — l'ordre objet-avant-verbe est obligatoire quand on veut insister sur ce qu'il ADVIENT à l'objet. Comparez : 我吃了 (wǒ chī le) 那个苹果 (nàge píngguǒ) (j'ai mangé cette pomme — juste une constatation) vs 我把那个苹果吃了 (wǒ bǎ nàge píngguǒ chī le) (j'ai traité la pomme = l'ai bel et bien mangée, elle n'existe plus).

- 把 (bǎ) suggère qu'on DISPOSE DE l'objet : on le déplace, transforme, détruit, range.`,
    objectives: [`Former S + 把 + O + V + complément`, `Ne JAMAIS mettre un verbe nu après 把`, `Différencier 我吃了 X / 我把 X 吃了`, `Utiliser 把 pour déplacer, transformer, ranger`],
    flashcards: [`把`, `把书`, `放在`, `放到`, `拿走`, `搬到`, `送给`, `放下`],
  },
  "cecr-b11-ba-m2": {
    title: `把 (2/2) : les 5 compléments obligatoires`, titleEn: `把 (2/2): the 5 required complements`,
    duration: 12,
    category: `grammar`,
    difficulty: `intermediate`,
    introTitle: `Quand 把 est obligatoire : les 5 cas`,
    introContent: `Sans complément, la phrase en 把 (bǎ) est agrammaticale. Les 5 compléments possibles : (1) Lieu avec 在 (zài) /到 (dào) : 我把书放在桌上 (wǒ bǎ shū fàng zài zhuō shàng) . (2) Bénéficiaire avec 给 (gěi) : 我把钱给她 (wǒ bǎ qián gěi tā) . (3) Résultatif : V + 完 (wán) /好 (hǎo) /干净 (gānjìng) .

- 我把饭吃完了 (wǒ bǎ fàn chī wán le).
- 我把房间打扫干净了 (wǒ bǎ fángjiān dǎsǎo gānjìng le) (j'ai nettoyé la chambre).

(4) Direction : V + 起来 (qǐlái) /出去 (chūqù) /过来 (guòlái) . 他把手举起来 (tā bǎshou jǔ qǐlái) . (5) Quantité/redoublement : 我把衣服洗了 (wǒ bǎ yīfu xǐ le) 一下 (yíxià) (j'ai vite lavé les vêtements).

- Négation : 没 (méi) AVANT 把 (bǎ) .
- 我没把书放好 (wǒ méi bǎ shū fàng hǎo) (je n'ai pas bien rangé le livre).

Jamais 把没 (bǎ méi) ✗. Utilisez 把 (bǎ) quand vous voulez insister sur le résultat, l'effet concret sur l'objet.`,
    objectives: [`Utiliser les 5 compléments de 把`, `Placer 没 AVANT 把 pour nier`, `Éviter 把 + verbe nu`, `Choisir 把 quand on insiste sur le résultat`],
    flashcards: [`吃完`, `做好`, `洗干净`, `写完`, `喝光`, `拿起来`, `打扫`, `完成`],
  },
  "cecr-b11-bei-m1": {
    title: `被 : le passif chinois`, titleEn: `被: Chinese passive`,
    duration: 15,
    category: `grammar`,
    difficulty: `intermediate`,
    introTitle: `被 : le passif qui marque une conséquence`,
    introContent: `被 (bèi) est le miroir de 把 (bǎ) : là où 把 (bǎ) met l'accent sur qui agit, 被 (bèi) met l'accent sur qui subit.

- Structure : OBJET + 被 (bèi) + + V + complément.
- 书被我放在桌上 (shū bèi wǒ fàng zài zhuō shàng) (le livre a été mis sur la table par moi).
- 杯子被打破了 (bēizi bèi dǎpò le) (le verre a été cassé — agent omis).

Le complément est OBLIGATOIRE comme avec 把 (bǎ) + verbe nu). Nuance culturelle cruciale : en chinois classique, 被 (bèi) a une connotation NÉGATIVE (subir quelque chose de désagréable). 他被妈妈骂了 (tā bèi māma mà le) le) (il s'est fait gronder par maman) sonne naturel ; mais 他被妈妈表扬了 (tā bèi māma biǎoyáng le) (il a été félicité par maman) sonne bizarre — on préférerait une structure active. Le passif neutre s'étend dans le chinois moderne, mais le réflexe reste : 被 (bèi) = souvent mauvaise nouvelle.`,
    objectives: [`Former O + 被 + (agent) + V + complément`, `Rendre l'agent optionnel`, `Ressentir la connotation négative de 被`, `Ajouter le complément obligatoire`],
    flashcards: [`被`, `打破`, `偷`, `骂`, `批评`, `吃掉`, `弄丢`, `抓住`],
  },
  "cecr-b11-de-m1": {
    title: `的 : la particule de liaison`, titleEn: `的: the connector particle`,
    duration: 12,
    category: `grammar`,
    difficulty: `intermediate`,
    introTitle: `的 : relier adjectif et nom`,
    introContent: `的 (de) est la plus fréquente des trois — c'est la particule du possessif et des subordonnées.

- Usage 1 : possessif.
- 我的 (wǒ de) 书 (shū) , 他的 (tā de) 车 (chē) .
- Omissible avec la famille proche : 我妈 (wǒ mā) = 我的 (wǒ de) 妈 (mā) .
- Usage 2 : adjectif à plusieurs syllabes + nom.
- 漂亮的 (piàoliang de) 女孩 (nǚhái) , 很贵的 (hěn guì de) 车 (chē).

On omet 的 (de) avec les adjectifs monosyllabiques courants : 小狗 (xiǎo gǒu) , 好朋友 (hǎo péngyou) .

- Usage 3 : proposition relative — proposition + 的 (de) + nom.
- 我买的 (wǒ mǎi de) 书 (shū) (le livre que j'ai acheté), 昨天来的 (zuótiān lái de) 朋友 (péngyou) (l'ami qui est venu hier).

C'est l'équivalent du « qui/que » français, mais placé AVANT le nom.

- Usage 4 : nominalisation.
- 红的 (hóng de) = le rouge (celui-ci).
- Règle en or : 的 (de) relie TOUJOURS vers un nom (à gauche ou à droite).`,
    objectives: [`Former un possessif : sujet + 的 + nom`, `Placer 的 après un adjectif long`, `Construire une relative : clause + 的 + nom`, `Nominaliser : adjectif + 的`],
    flashcards: [`的`, `我的`, `他的`, `漂亮的`, `昨天`, `买的`, `红的`, `新的`],
  },
  "cecr-b11-de-m2": {
    title: `地 : la particule de l'adverbe`, titleEn: `地: the adverb particle`,
    duration: 12,
    category: `grammar`,
    difficulty: `intermediate`,
    introTitle: `地 : transformer un adjectif en adverbe`,
    introContent: `地 (de) (attention : ici prononcé « de », pas « dì ») se place entre un adjectif/expression et un verbe pour créer un adverbe de manière.

- 慢 (màn) + 地 (de) + 说 (shuō) = 慢慢地 (màn màn de) 说 (shuō) .
- 认真 (rènzhēn) + 地 (de) + 学习 (xuéxí) = 认真地学习 (rènzhēn de xuéxí) .
- Règle simple : 地 (de) pointe toujours vers un VERBE .
- Les adjectifs monosyllabiques sont souvent redoublés avant 地 (de) : 慢慢地 (màn màn de) , 快快地 (kuài kuài de) , 好好地 (hǎohǎo de) .
- Pour un adjectif long, pas de redoublement : 认真地 (rènzhēn de) , 安静地 (ānjìng de) .

Comparez avec 的 (de) : 慢的 (màn de) 火车 (huǒchē) (un train lent — 的 → nom) vs 慢慢地 (màn màn de) 走 (zǒu) (marcher lentement — 地 → verbe).

- Comprendre cette distinction = gagner 20 points de grammaire.`,
    objectives: [`Placer 地 entre adjectif et verbe`, `Redoubler les adjectifs monosyllabiques`, `Distinguer 的 (→nom) / 地 (→verbe)`, `Transformer 6 adjectifs en adverbes`],
    flashcards: [`地`, `慢慢地`, `快快地`, `认真地`, `安静地`, `高兴地`, `努力地`],
  },
  "cecr-b11-de-m3": {
    title: `得 : la particule du complément`, titleEn: `得: the complement particle`,
    duration: 15,
    category: `grammar`,
    difficulty: `intermediate`,
    introTitle: `得 : évaluer le résultat d'une action`,
    introContent: `得 (de) (ici « de ») vient APRÈS le verbe et introduit une évaluation sur la manière/intensité de l'action.

- Structure : V + 得 (de) + évaluation.
- 他跑得很快 (tā pǎo de hěn kuài) vite).
- 她唱得 (tā chàng de) 好 (hǎo) .
- 我说得 (wǒ shuō de) 不清楚 (bù qīngchu) (je parle pas clairement).

Si le verbe a un objet, il faut le répéter ou utiliser la structure avec objet en premier : 他说汉语说得 (tā shuō Hànyǔ shuō de) 很好 (hěn hǎo) OU 他汉语说得 (tā Hànyǔ shuō de) 很好 (hěn hǎo). La forme 他说得 (tā shuō de) 很好汉语 (hěn hǎo Hànyǔ) ✗ est fausse.

- Question : V + 得 (de) + 怎么样 (zěnmeyàng) ?
- 他跑得 (tā pǎo de) 怎么样 (zěnmeyàng) ? (il court comment ?).
- Négation : V + 得 (de) + 不 (bù) + adjectif.
- 我睡得 (wǒ shuì de) 不好 (bùhǎo).

Rappel : 的 (de) pointe vers un nom, 地 (de) vers un verbe , 得 (de) évalue un verbe .`,
    objectives: [`Former V + 得 + évaluation`, `Répéter le verbe si objet présent`, `Demander V + 得 + 怎么样 ?`, `Distinguer les 3 « de »`],
    flashcards: [`得`, `跑得快`, `唱得好`, `说得好`, `写得漂亮`, `睡得晚`, `怎么样`],
  },
  "cecr-b11-de-m4": {
    title: `的/地/得 : quiz de tri`, titleEn: `的/地/得: sorting quiz`,
    duration: 15,
    category: `grammar`,
    difficulty: `intermediate`,
    introTitle: `的地得 : la règle en une phrase`,
    introContent: `Pour ne plus jamais se tromper, appliquez cette heuristique en 3 questions.

(1) Ce qui suit est-il un NOM ? → 的 (de) .

- Ex : 我的书 (wǒ de shū) , 漂亮的女孩 (piàoliang de nǚhái) ).

(2) Ce qui suit est-il un VERBE ? → 地 (de) .

- Ex : 慢慢地走 (màn màn de zǒu) , 认真地工作 (rènzhēn de gōngzuò) .

(3) Ce qui PRÉCÈDE est-il un verbe, et ce qui suit une évaluation ? → 得 (de) .

- Ex : 跑得 (pǎo de) 快 (kuài) , 唱得 (chàng de) 好 (hǎo) .

Astuce : à l'écrit (y compris sur les forums chinois), les natifs confondent souvent de ↔ 地 (de) . À l'oral, les trois sont homophones.

- Si vous êtes bloqué en écoute, regardez ce qui suit : nom = 的 (de) , verbe = 地 (de) .
- Ce qui précède un verbe + évaluation = 得 (de) .

Avec ça, 95 % des cas sont tranchés.`,
    objectives: [`Appliquer l'heuristique en 3 questions`, `Classer 20 phrases en 的/地/得`, `Corriger des erreurs natives`, `Ne plus jamais confondre à l'écrit`],
    flashcards: [`的`, `地`, `得`, `我的`, `慢慢地`, `跑得快`],
  },
  "cecr-b11-shide-m1": {
    title: `是…的 : insister sur le comment/quand`, titleEn: `是…的: emphasize how/when`,
    duration: 15,
    category: `grammar`,
    difficulty: `intermediate`,
    introTitle: `是…的 : insister sur le quand, où et comment`,
    introContent: `La structure 是 (shì) …的 (de) est unique en chinois : elle insiste sur UN élément précis d'une action PASSÉE et CONNUE (le simple fait qu'elle ait eu lieu n'est pas remis en question).

- Structure : S + 是 (shì) + circonstant + V + 的 (de) .
- 我是昨天来的 (wǒ shì zuótiān lái de) (c'est hier que je suis venu — on sait que je suis venu, on insiste sur QUAND).
- 他是坐飞机来的 (tā shì zuò fēijī lái de) (c'est en avion qu'il est venu).
- 我是在上海学的 (wǒ shì zài shànghǎi xué de) (wǒ shì zài shàng hǎi xué de) 中文 (Zhōngwén) (c'est à Shanghai que j'ai appris le chinois).
- Objet souvent entre le verbe et 的 (de) : V + O + 的 (de) , ou V + 的 (de) + O.

On NE PEUT PAS utiliser 是 (shì) …的 (de) sur une action future ou sans complément circonstanciel.

- 是 (shì) …的 (de) ≠ 了 (le) : 我昨天来了 (wǒ zuótiān lái le) = fait de venir / 我是昨天来的 (wǒ shì zuótiān lái de) = c'est hier .`,
    objectives: [`Former S + 是 + circonstant + V + 的`, `Insister sur quand/où/comment`, `Distinguer 是…的 / 了`, `Placer l'objet avant ou après 的`],
    flashcards: [`是...的`, `昨天来的`, `坐飞机`, `怎么来`, `什么时候`, `跟谁`],
  },
  "cecr-b11-jiucai-m1": {
    title: `就 vs 才 : tôt vs tard`, titleEn: `就 vs 才: early vs late`,
    duration: 15,
    category: `grammar`,
    difficulty: `intermediate`,
    introTitle: `就 vs 才 : tôt/facile contre tard/difficile`,
    introContent: `Ces deux adverbes expriment un jugement sur le TIMING d'une action.

- 就 (jiù) : plus tôt que prévu / avec peu d'effort.
- 他六点就起床了 (tā liù diǎn jiù qǐchuáng le) (il s'est levé dès 6h — c'est tôt).
- 他一看就懂 (tā yī kàn jiù dǒng) (il comprend au premier coup d'œil).
- 才 (cái) : plus tard que prévu / avec beaucoup d'effort.
- 他九点才起床 (tā jiǔ diǎn cái qǐchuáng) (il ne s'est levé qu'à 9h — c'est tard).
- 我学了 (wǒ xué le) 三年才会说 (sān nián cái huì shuō) (j'ai dû étudier 3 ans pour savoir parler).

Règle grammaticale critique : avec 就 (jiù) + temps passé, on ajoute 了 (le) ; avec 才 (cái) + temps passé, on N'AJOUTE PAS 了 (le) ✗). Pourquoi ? 才 (cái) suggère déjà qu'on a mis du temps — le 了 (le) serait redondant et sonnerait faux.`,
    objectives: [`Utiliser 就 pour « tôt/facile »`, `Utiliser 才 pour « tard/difficile »`, `Ajouter 了 avec 就, JAMAIS avec 才`, `Placer 就/才 avant le verbe`],
    flashcards: [`就`, `才`, `就是`, `就来`, `才来`, `才三点`, `就会了`],
  },
  "cecr-b11-work-m1": {
    title: `Métiers & postes`, titleEn: `Jobs & positions`,
    duration: 10,
    category: `vocabulary`,
    difficulty: `intermediate`,
    introTitle: `员 et 师 : deux suffixes, deux profils`,
    introContent: `Les noms de métiers suivent souvent un motif.

- Suffixe 员 (yuán) = exécutant : 服务员 (fúwù yuán) serveur, 售货员 (shòu huò yuán) vendeur, 销售员 (xiāoshòu yuán) commercial, 公务员 (gōngwùyuán) fonctionnaire.
- Suffixe 师 (shī) = expert : 老师 (lǎoshī) prof, 工程师 (gōngchéngshī) ingénieur, 律师 (lǜshī) avocat, 医师 (yī shī) /医生 (yīshēng) médecin, 厨师 (chúshī) chef cuisinier.

Question type : 你做什么工作 (nǐ zuò shénme gōngzuò) ? (quel est ton métier ?) ou plus formel 您从事什么行业 (nín cóngshì shénme hángyè) (nín cóngshì shénme hángyè) ? (dans quel secteur travaillez-vous ?).

- Réponse : 我是 (wǒ shì) [métier] OU 我在 (wǒ zài) [entreprise] 工作 (gōngzuò).
- Hiérarchie en entreprise : 老板 (lǎo bǎn) , 经理 (jīnglǐ) , 主管 (zhǔguǎn) , 同事 (tóngshì) , 下属 (xiàshǔ) .`,
    objectives: [`Reconnaître 员 / 师 / 家`, `Répondre à 你做什么工作 ?`, `Nommer 6 titres d'entreprise`, `Situer dans la hiérarchie`],
    flashcards: [`工作`, `老板`, `经理`, `同事`, `工程师`, `律师`, `医生`, `老师`, `公司`, `公务员`],
  },
  "cecr-b11-work-m2": {
    title: `Réunion & agenda`, titleEn: `Meetings & schedule`,
    duration: 10,
    category: `conversation`,
    difficulty: `intermediate`,
    introTitle: `Vocabulaire de bureau : réunions et email`,
    introContent: `En chinois pro, 开会 (kāihuì) (kāi huì, littéralement « ouvrir-réunion ») est le verbe standard pour « être en réunion » ou « tenir une réunion ». On ne dit pas 有会 (yǒu huì) mais 开会 (kāihuì) .

- Convoquer : 通知开会 (tōng zhī kāihuì).
- Horaire : 下午三点开会 (xiàwǔ sān diǎn kāihuì).
- Durée : 开一个小时的 (kāi yī gè xiǎoshí de) 会 (huì) .
- Salle : 会议室 (huìyì shì) .
- Ordre du jour : 议程 (yìchéng) .
- Vocabulaire critique : 讨论 (tǎo lùn) , 决定 (juédìng) , 汇报 (huì bào) , 总结 (zǒng jié) .

Politesse rituelle : 会议结束 (huìyì jiéshù) ，辛苦了 (xīn kǔ le) (la réunion est terminée, merci pour vos efforts) — 辛苦了 (xīn kǔ le) est incontournable dans le monde pro chinois.`,
    objectives: [`Utiliser le verbe 开会`, `Distinguer 会议 (nom) / 开会 (verbe)`, `Nommer 4 phases d'une réunion`, `Clôturer avec 辛苦了`],
    flashcards: [`会议`, `开会`, `会议室`, `议程`, `讨论`, `决定`, `汇报`, `总结`, `辛苦了`],
  },
  "cecr-b11-work-m3": {
    title: `Emails & messages formels`, titleEn: `Formal emails & messages`,
    duration: 12,
    category: `writing`,
    difficulty: `intermediate`,
    introTitle: `Écrire un email pro en chinois`,
    introContent: `Un email pro chinois suit un ordre précis.

(1) 称呼 (chēnghu) : 尊敬的 (zūnjìng de) [titre] 先生 (xiānsheng) /女士 (nǚshì) (cher M/Mme), 您好 (nín hǎo) !
(2) 开场白 (kāichǎngbái) : 感谢您的 (gǎnxiè nín de) ... (merci de votre...), 希望您一切顺利 (xīwàng nín yī qiè shùn lì) .
(3) 正文 (zhèng wén) : concis, un sujet par paragraphe.
(4) 结语 (jié yǔ) (clôture) : 期待您的 (qī dāi nín de) 回复 (huífù) (dans l'attente de votre réponse), 如有任何问题 (rú yǒu rèn hé wèntí) ，请随时联系 (qǐng suíshí liánxì) .
(5) 署名 (shǔ míng) : 此致 (cǐ zhì), 敬礼 (jìnglǐ) ! (salutations !), nom, poste.

Spécificités : utiliser 您 (nín) , éviter le tutoiement 你 (nǐ) ; signer avec nom chinois en caractères ; éviter les émojis ; toujours CC le 领导 (lǐng dǎo) si pertinent.`,
    objectives: [`Ouvrir avec 尊敬的... 您好 !`, `Structurer en 5 parties`, `Clôturer avec 此致 敬礼 !`, `Utiliser 您 et éviter 你`],
    flashcards: [`尊敬的`, `您好`, `感谢`, `期待`, `回复`, `此致`, `敬礼`, `领导`, `您`],
  },
  "cecr-b11-work-m4": {
    title: `Entretien d'embauche`, titleEn: `Job interview`,
    duration: 12,
    category: `conversation`,
    difficulty: `intermediate`,
    introTitle: `5 questions à maîtriser au travail`,
    introContent: `En entretien chinois, 5 questions reviennent systématiquement.

(1) 请自我介绍一下 (qǐng zìwǒ jièshào yíxià) (qǐng zìwǒ jièshào yíxià). Réponse : nom, âge, formation, expérience — 1 min max.
(2) 你为什么想来我们公司 (nǐ wèi shénme xiǎng lái wǒmen gōngsī) (nǐ wèi shénme xiǎng lái wǒmen gōngsī) ? (pourquoi chez nous ?).
(3) 你的 (nǐ de) 优点和缺点是什么 (yōu diǎn hé quē diǎn shì shénme) ? (qualités et défauts ?). Astuce : 我最大的 (wǒ zuì dà de) 缺点是太认真 (quē diǎn shì tài rènzhēn) (mon plus grand défaut est d'être trop sérieux) — cliché assumé.
(4) 你对薪水有什么期望 (nǐ duì xīnshui yǒu shénme qīwàng) (nǐ duì xīnshui yǒu shénme qīwàng) ? (attentes salariales ?).
(5) 你还有什么问题吗 (nǐ háiyǒu shénme wèntí ma) (nǐ háiyǒu shénme wèntí ma) ? (des questions ?).

Codes culturels : montrer l'humilité ，我还在学习 (wǒ hái zài xuéxí) ), parler de l'équipe plutôt que de soi, mentionner la stabilité 职业发展 (zhí yè fāzhǎn) ). Arriver 10 min en avance, remettre le CV à deux mains.`,
    objectives: [`Se présenter en 1 min`, `Justifier 为什么选择公司`, `Équilibrer 优点 et 缺点`, `Négocier le 薪水 poliment`],
    flashcards: [`面试`, `简历`, `自我介绍`, `优点`, `缺点`, `薪水`, `期望`, `经验`, `学历`],
  },
  "cecr-b11-travel-m1": {
    title: `Réserver un train`, titleEn: `Booking a train`,
    duration: 12,
    category: `conversation`,
    difficulty: `intermediate`,
    introTitle: `Prendre le train en Chine : G, D, K ?`,
    introContent: `Le réseau ferroviaire chinois est le plus vaste au monde.

- Types : 高铁 (gāotiě) (gāo tiě, G-train, >300 km/h) ultra-rapide, moderne ; 动车 (dòngchē) (dòng chē, D-train, 200-250 km/h) rapide ; 特快 (tè kuài), 快速 (kuàisù), 普快 (pǔ kuài) — trains classiques, plus lents mais moins chers.
- Classes : 一等座 (yī děng zuò) (1re classe), 二等座 (èr děng zuò) (2e classe, standard), 商务座 (shāng wù zuò) , 硬座 (yìng zuò), 软卧 (ruǎn wò) (couchette molle, nuit), 硬卧 (yìng wò) .
- Réserver : 订票 (dìng piào) , via 12306 .

Préparez le 身份证 (shēn fèn zhèng) ou le passeport. Arrivée en gare : 进站 (jìn zhàn) , 安检 (ānjiǎn) , 候车厅 (hòu chē tīng), 检票 (jiǎnpiào) (contrôle), 上车 (shàng chē) .`,
    objectives: [`Choisir 高铁/动车/普快`, `Réserver via 12306 avec 身份证`, `Naviguer 进站 → 安检 → 候车厅 → 上车`, `Distinguer 硬座/软卧/二等座`],
    flashcards: [`高铁`, `动车`, `火车`, `订票`, `车票`, `身份证`, `候车厅`, `二等座`, `软卧`],
  },
  "cecr-b11-travel-m2": {
    title: `À l'hôtel`, titleEn: `At the hotel`,
    duration: 10,
    category: `conversation`,
    difficulty: `intermediate`,
    introTitle: `Hôtel en Chine : de l'arrivée au départ`,
    introContent: `Au restaurant ou à l'hôtel, quelques formules et mots-clés suffisent pour s'en sortir.

- Hôtel = 酒店 (jiǔdiàn) ou 宾馆 (bīnguǎn) .
- Auberge = 旅馆 (lǚguǎn) .
- Réception = 前台 (qiántái) .

À l'arrivée : 我预订了 (wǒ yùdìng le) 一间 (yī jiān) [X] 的 (de) 房间 (fángjiān) ，我的 (wǒ de) 名字是 (míngzi shì) [...] (j'ai réservé une chambre [X] au nom de...).

- Types de chambre : 单人间 (dān rénjiān) , 双人间 (shuāng rénjiān) (double, 2 lits séparés), 大床房 (dà chuáng fáng) .

Documents : 护照 (hùzhào) , 押金 (yājīn) — en Chine, on laisse souvent 200-500 RMB de caution cash ou sur carte.

- Service : 打扫 (dǎsǎo) , 退房 (tuì fáng), avant midi en général.

Souci ? 空调坏了 (kōngtiáo huài le) , 没有热水 (méiyǒu rè shuǐ), 请换一间 (qǐng huàn yī jiān).`,
    objectives: [`Dire 入住 / 退房`, `Choisir 单人间/双人间/大床房`, `Comprendre 押金 (caution cash)`, `Signaler un problème : ...坏了`],
    flashcards: [`酒店`, `前台`, `入住`, `退房`, `押金`, `单人间`, `双人间`, `大床房`, `空调`, `热水`],
  },
  "cecr-b11-travel-m3": {
    title: `Sites touristiques`, titleEn: `Tourist sites`,
    duration: 10,
    category: `culture`,
    difficulty: `intermediate`,
    introTitle: `Visiter la Chine : 5 incontournables`,
    introContent: `Les classiques :

(1) 长城 (cháng chéng) — sections 八达岭 (bā dá lǐng) et 慕田峪 (mù tián yù) .
(2) 故宫 (gù gōng) à Pékin — réserver en ligne avec le passeport, 1 jour à l'avance minimum.
(3) 兵马俑 (bīng mǎ yǒng) (Bīngmǎyǒng, Armée de terre cuite) à Xi'an — musée impressionnant.
(4) 外滩 (wài tān) + 东方明珠 (dōngfāng míng zhū) à Shanghai.
(5) 黄山 (huáng shān) pour la nature.

Vocabulaire touristique : 门票 (ménpiào) , 开放时间 (kāi fàng shíjiān) , 导游 (dǎoyóu) , 讲解器 (jiǎng jiě qì) , 拍照 (pāizhào) , 纪念品 (jì niàn pǐn) . Souvent besoin du passeport pour acheter les billets.

- Éviter les week-ends et jours fériés : 人山人海 (rénshān-rénhǎi) .`,
    objectives: [`Nommer 5 sites emblématiques`, `Réserver un 门票 avec 护照`, `Louer un 导游 / 讲解器`, `Éviter les 人山人海`],
    flashcards: [`长城`, `故宫`, `兵马俑`, `外滩`, `黄山`, `门票`, `导游`, `讲解器`, `拍照`, `纪念品`],
  },
  "cecr-b11-emo-m1": {
    title: `Vocabulaire des émotions`, titleEn: `Emotion vocabulary`,
    duration: 10,
    category: `vocabulary`,
    difficulty: `intermediate`,
    introTitle: `心 : le radical qui porte les émotions`,
    introContent: `En chinois, la plupart des émotions portent le radical 忄 (xin) ou 心 (xīn) .

- 高兴 (gāoxìng) , 快乐 (kuàilè) , 幸福 (xìng fú) .
- 难过 (nánguò) , 伤心 (shāng xīn) , 生气 (shēngqì) , 害怕 (hàipà) , 担心 (dānxīn) , 紧张 (jǐnzhāng) , 失望 (shī wàng) .
- Structure : S + 感到 (gǎndào) /觉得 (juéde) + émotion.
- 我感到很高兴 (wǒ gǎndào hěn gāoxìng).

Pour intensifier : 特别 (tèbié) , 非常 (fēicháng), 有点儿 (yǒu diǎn ér) , 比较 (bǐjiào) . Règle culturelle : les Chinois modernes expriment moins directement les émotions fortes. Un « je t'aime » peut être remplacé par 我很在乎你 (wǒ hěn zàihu nǐ) . Les émotions négatives sont souvent atténuées : 有点不高兴 (yǒu diǎn bù gāoxìng) = en réalité assez contrarié.`,
    objectives: [`Repérer le radical 忄/心`, `Nommer 10 émotions positives/négatives`, `Utiliser 感到/觉得 + émotion`, `Atténuer avec 有点 / intensifier avec 非常`],
    flashcards: [`高兴`, `快乐`, `幸福`, `难过`, `伤心`, `生气`, `害怕`, `担心`, `紧张`, `失望`, `在乎`],
  },
  "cecr-b11-emo-m2": {
    title: `Donner son avis`, titleEn: `Giving an opinion`,
    duration: 10,
    category: `conversation`,
    difficulty: `intermediate`,
    introTitle: `3 façons de dire « je pense » selon le registre`,
    introContent: `Trois façons principales de donner son avis, classées du plus informel au plus formel.

(1) 我觉得 (wǒ juéde) : quotidien, ressenti. 我觉得这部电影很好看 (wǒ juéde zhè bù diànyǐng hěn hǎokàn) (je trouve que ce film est bien).
(2) 我认为 (wǒ rènwéi) : plus posé, argumentatif. 我认为教育很重要 (wǒ rènwéi jiàoyù hěn zhòngyào) (je pense que l'éducation est importante).
(3) 在我看来 (zài wǒ kànlái) (zài wǒ kàn lái, à mon sens / littéralement « dans mon regard ») : formel, presque dissertation. 在我看来 (zài wǒ kànlái) ，这个政策有问题 (zhège zhèngcè yǒu wèntí) (zhège zhèngcè yǒu wèntí).

- Exprimer le doute : 可能 (kěnéng), 也许 (yě xǔ) , 好像 (hǎoxiàng) .
- Nuancer : 一方面 (yī fāngmiàn) ...，另一方面 (lìng yī fāngmiàn) (d'un côté... de l'autre).
- Accord : 你说得 (nǐ shuō de) 对 (duì) , 我同意 (wǒ tóngyì).
- Désaccord poli : 我不太同意 (wǒ bù tài tóngyì) (je ne suis pas trop d'accord).`,
    objectives: [`Choisir 觉得 / 认为 / 在我看来`, `Nuancer avec 可能 / 也许`, `Acquiescer : 你说得对`, `Nuancer un désaccord : 不太同意`],
    flashcards: [`我觉得`, `我认为`, `在我看来`, `可能`, `也许`, `同意`, `不同意`, `说得对`, `问题`],
  },
  "cecr-b11-emo-m3": {
    title: `Compliments & politesse`, titleEn: `Compliments & politeness`,
    duration: 10,
    category: `culture`,
    difficulty: `intermediate`,
    introTitle: `哪里哪里 : refuser un compliment avec grâce`,
    introContent: `En Chine, recevoir un compliment avec « merci ! » peut sembler arrogant. La réponse traditionnelle est une négation polie :

- 哪里哪里 (nǎlǐ nǎlǐ) (nǎli nǎli, « mais non, mais non »).
- 过奖了 (guòjiǎng le) (guò jiǎng le, « vous flattez trop »).
- 没有没有 (méiyǒu méiyǒu) (méiyǒu méiyǒu, « pas du tout »).

Exemple : A : 你的 (nǐ de) 中文真好 (Zhōngwén zhēn hǎo) ! → B : 哪里哪里 (nǎlǐ nǎlǐ) ，还差得 (hái chà de) 远呢 (yuǎn ne) (oh non, je suis encore loin).

Complimenter : 你真聪明 (nǐ zhēn cōngmíng) , 你做得 (nǐ zuò de) 真好 (zhēn hǎo) , 你的 (nǐ de) [X] 真漂亮 (zhēn piàoliang) . Le compliment doit être précis : dire « tu es gentil » reste vague, mieux vaut « tu es vraiment attentionné ». Cette culture évolue : les jeunes générations acceptent davantage un 谢谢 (xièxie) direct, mais le 哪里 (nǎlǐ) reste la réponse sûre en contexte formel.`,
    objectives: [`Répondre à un compliment avec 哪里`, `Émettre un compliment précis`, `Utiliser 过奖了 / 没有没有`, `Naviguer entre modestie et 谢谢`],
    flashcards: [`哪里`, `过奖了`, `没有没有`, `聪明`, `漂亮`, `真好`, `还差得远`, `客气`],
  },
  "cecr-b11-health-m1": {
    title: `Parties du corps`, titleEn: `Body parts`,
    duration: 10,
    category: `vocabulary`,
    difficulty: `intermediate`,
    introTitle: `Le corps humain : 20 mots indispensables`,
    introContent: `Tête et haut : 头 (tóu), 脸 (liǎn) , 眼睛 (yǎnjing) , 耳朵 (ěrduo) , 鼻子 (bízi) , 嘴 (zuǐ) , 牙 (yá) .

- Tronc : 脖子 (bózi) , 肩膀 (jiān bǎng) , 胸 (xiōng) , 肚子 (dùzi) , 背 (bèi) .
- Membres : 手 (shǒu) , 手指 (shǒuzhǐ) , 胳膊 (gēbo) , 腿 (tuǐ) , 脚 (jiǎo) .
- Organes internes : 心 (xīn) (cœur), 肺 (fèi) , 胃 (wèi) , 肝 (gān) .
- Caractère récurrent : 肉 (ròu) → 肚 (dù) 肺 (fèi) 肝 (gān) 胃 (wèi) (tous ont le radical « chair »).
- Expression type : [partie] 疼 (téng) = avoir mal.
- 我头疼 (wǒ tóu téng).
- 我肚子疼 (wǒ dùzi téng).

Il suffit d'ajouter 疼 (téng) à la partie concernée.`,
    objectives: [`Nommer 20 parties du corps`, `Repérer le radical 肉 / 月`, `Dire ... 疼 pour toute douleur`, `Localiser une douleur`],
    flashcards: [`头`, `脸`, `眼睛`, `耳朵`, `鼻子`, `嘴`, `手`, `脚`, `肚子`, `背`, `疼`],
  },
  "cecr-b11-health-m2": {
    title: `Chez le médecin`, titleEn: `At the doctor's`,
    duration: 12,
    category: `conversation`,
    difficulty: `intermediate`,
    introTitle: `À l'hôpital chinois : le parcours étape par étape`,
    introContent: `En Chine, pour voir un médecin, il faut 挂号 (guàhào) . À l'hôpital ), direction le 挂号处 (guàhào chù) (bureau d'enregistrement), payer les frais de base, obtenir un ticket et aller au service concerné.

- Spécialités : 内科 (nèi kē) , 外科 (wàikē) , 儿科 (érkē) , 妇科 (fù kē) , 牙科 (yá kē) .
- Symptômes standards : 发烧 (fāshāo) , 咳嗽 (késou) , 感冒 (gǎnmào) , 拉肚子 (lā dùzi) , 头疼 (tóu téng), 嗓子疼 (sǎngzi téng) .
- Décrire : 我觉得 (wǒ juéde) ... (je me sens...), 我有点 (wǒ yǒu diǎn) ... (j'ai un peu...).
- Intensité : 有点疼 (yǒu diǎn téng) < 很疼 (hěn téng) < 非常疼 (fēicháng téng).

Le médecin prescrit : 开药 (kāi yào), vous allez à la 药房 (yào fáng) de l'hôpital.`,
    objectives: [`Faire son 挂号 et aller au service`, `Choisir entre 内/外/儿/妇科`, `Décrire un symptôme avec 我觉得`, `Graduer la douleur`],
    flashcards: [`医院`, `挂号`, `发烧`, `咳嗽`, `感冒`, `拉肚子`, `头疼`, `嗓子疼`, `开药`, `药房`, `内科`],
  },
  "cecr-b11-health-m3": {
    title: `Pharmacie & médicaments`, titleEn: `Pharmacy & medicines`,
    duration: 10,
    category: `vocabulary`,
    difficulty: `intermediate`,
    introTitle: `Pharmacie en Chine : les mots clés`,
    introContent: `La pharmacie (药店, yàodiàn) est souvent le premier recours en Chine, même sans ordonnance.

- Formes : 药片 (yào piàn) , 胶囊 (jiāonáng) , 药水 (yào shuǐ) , 药膏 (yào gāo) , 眼药水 (yǎn yào shuǐ) .

Médicaments courants : 感冒药 (gǎnmào yào) , 退烧药 (tuì shāo yào) , 止痛药 (zhǐ tòng yào) , 消炎药 (xiāo yán yào), 抗生素 (kàngshēngsù) .

- Posologie : 一天三次 (yī tiān sān cì) ，每次两片 (měi cì liǎng piàn) (3 fois par jour, 2 cachets à chaque fois).
- Notation sur la boîte : 饭前 (fàn qián) , 饭后 (fàn hòu) , 睡前 (shuì qián) .

Médecine chinoise traditionnelle zhōngyī) : 中药 (zhōngyào) , 针灸 (zhēnjiǔ) , 拔罐 (bá guàn) , 按摩 (ànmó) . Les Chinois combinent souvent 西医 (xī yī) et 中医 (zhōngyī) .`,
    objectives: [`Nommer 5 formes de médicaments`, `Choisir entre 感冒药/退烧药/止痛药`, `Lire une posologie : 一天三次`, `Connaître 针灸, 拔罐, 中药`],
    flashcards: [`药店`, `药片`, `胶囊`, `感冒药`, `退烧药`, `止痛药`, `中药`, `针灸`, `饭后`, `饭前`],
  },
  "cecr-b11-conversation-m1": {
    title: `Opinion nuancée + préférence/regret`, titleEn: `Nuanced opinion + preference/regret`,
    duration: 14,
    category: `conversation`,
    difficulty: `intermediate`,
    introTitle: `Argumenter en B1 : structure en 4 temps`,
    introContent: `Donner un avis ou exprimer un regret en chinois demande quelques formules-clés adaptées au contexte.

- Introduire : 在我看来 (zài wǒ kànlái) / 我个人认为 (wǒ gèrén rènwéi) / 从我的 (cóng wǒ de) 角度 (jiǎo dù) .
- Reconnaître : 我理解你的 (wǒ lǐjiě nǐ de) 意思 (yìsi) ，但是 (dànshì) … / 你说得 (nǐ shuō de) 有道理 (yǒu dàolǐ) ，不过 (búguò) ….
- Préférence : 我更喜欢 (wǒ gèng xǐhuan) / 比起 (bǐ qǐ) X，我更喜欢 (wǒ gèng xǐhuan) Y / 我宁愿 (wǒ nìngyuàn) X 也不 (yě bù) Y.
- Regret : 我后悔了 (wǒ hòuhuǐ le) / 早知道就 (zǎo zhīdào jiù) … / 要是 (yào shì) …就好了 (jiù hǎo le) (formule magique du regret hypothétique).
- Soutenir : 别后悔 (bié hòuhuǐ) , 没关系 (méi guānxi) ，过去了 (guò qù le) .

Diplomatie : commence TOUJOURS par 我理解你 (wǒ lǐjiě nǐ) avant de nuancer — sans cette préface, ton désaccord sonne agressif en chinois.`,
    objectives: [`Argumenter avec 在我看来 / 我个人认为`, `Préférer avec 我更/宁愿 + 也不`, `Regretter avec 要是…就好了 / 早知道`, `Préfacer un désaccord par 我理解你`],
    flashcards: [`在我看来`, `个人`, `角度`, `道理`, `更`, `宁愿`, `后悔`, `早知道`, `要是`],
  },
  "cecr-b11-conversation-m2": {
    title: `Raconter le passé en détail + anecdotes`, titleEn: `Narrate the past + anecdotes`,
    duration: 14,
    category: `conversation`,
    difficulty: `intermediate`,
    introTitle: `Raconter une anecdote avec style`,
    introContent: `Raconter une anecdote en chinois repose sur des marqueurs temporels et des formules d'exclamation bien choisis.

- Marqueurs : 那时候 (nà shíhou) , 当时 (dāngshí) , 后来 (hòulái) , 接着 (jiēzhe) , 突然 (tūrán) , 最后 (zuìhòu) .
- Aspect : 了 (le) vs 过 (guò) .
- Arc : situation initiale + déclencheur 突然 (tūrán) + développement 然后 (ránhòu) + résolution 最后 (zuìhòu) .
- Coloration : 谁知道 (shéi/shuí zhīdào) (shéi/shuí zhīdào) , 没想到 (méi xiǎng dào) .

Anecdote drôle/gênante : 我跟你说一件好玩的 (wǒ gēn nǐ shuō yī jiàn hǎo wán de) (wǒ gēn nǐ shuō yī jiàn hǎo wán de) 事 (shì) / 太搞笑了 (tài gǎoxiào le) / 笑死我了 (xiào sǐ wǒ le) / 太尴尬了 (tài gāngà le) / 我真想找个地 (wǒ zhēn xiǎng zhǎo gè de) (wǒ zhēn xiǎng zhǎo gè de) 缝钻进去 (fèng zuān jìnqù) . Sur WeChat, 哈哈哈 (hāhā hā) (3+ 哈 ) montre l'engagement ; un seul 哈 (hā) sonne sarcastique.`,
    objectives: [`Marquer le temps : 当时 / 后来 / 突然 / 最后`, `Distinguer 了 (accompli) vs 过 (expérience)`, `Colorer avec 谁知道 / 没想到`, `Réagir avec 哈哈哈 (3+ 哈)`],
    flashcards: [`那时候`, `当时`, `后来`, `突然`, `没想到`, `好玩`, `搞笑`, `尴尬`],
  },
  "cecr-b11-conversation-m3": {
    title: `Débattre simplement + gérer un imprévu`, titleEn: `Simple debate + handle the unexpected`,
    duration: 14,
    category: `conversation`,
    difficulty: `intermediate`,
    introTitle: `Débattre + gérer un imprévu de dernière minute`,
    introContent: `En chinois, exprimer un désaccord ou signaler un imprévu suit des codes culturels précis.

- Pour : 我同意 (wǒ tóngyì) / 完全同意 (wán quán tóngyì) / 我也是这么想的 (wǒ yě shì zhème xiǎng de) (wǒ yě shì zhème xiǎng de) .
- Contre poliment : 我不太同意 (wǒ bù tài tóngyì) / 我看法不一样 (wǒ kànfǎ bù yíyàng) / 我觉得不一定 (wǒ juéde bù yídìng) .
- Argument : 因为 (yīnwèi) / 由于 (yóu yú) / 比如 (bǐrú) / 据我所知 (jù wǒ suǒ zhī) .
- Concession : 你说得 (nǐ shuō de) 对 (duì) ，不过 (búguò) ….

Sandwich nécessaire en culture chinoise (sans le 1er morceau, sonne agressif).

- Imprévu : 不好意思 (bù hǎoyìsi) ，我可能要迟到 (wǒ kěnéng yào chídào) / 突然有事 (tūrán yǒu shì) ，我去不了 (wǒ qù bù le) .
- Cause + remède : 因为堵车 (yīnwèi dǔchē) ，我会晚 (wǒ huì wǎn) 30 分钟 (fēnzhōng) .
- Toujours conclure par 真的 (zhēn de) 不好意思 (bù hǎoyìsi) / 给你添麻烦了会不会 (gěi nǐ tiān máfan le huì bù huì) ).`,
    objectives: [`Sandwich débat : reconnaître + nuancer`, `Annoncer un retard : cause + remède`, `Reprogrammer : 能不能改个时间`, `Conclure par 给你添麻烦了`],
    flashcards: [`同意`, `不一定`, `据我所知`, `迟到`, `堵车`, `另外`, `添麻烦`],
  },
  "cecr-b11-conversation-m4": {
    title: `Vrai compliment + souhaits étendus`, titleEn: `Real compliment + extended wishes`,
    duration: 14,
    category: `conversation`,
    difficulty: `intermediate`,
    introTitle: `Donner des indications précises en chinois`,
    introContent: `Féliciter et formuler des vœux en chinois demande de connaître quelques formules rituelles.

- Précis : 你的 (nǐ de) 中文进步真快 (Zhōngwén jìn bù zhēn kuài) (Zhōngwén jìn bù zhēn kuài) / 你这个想法很有创意 (nǐ zhège xiǎng fǎ hěn yǒu chuàngyì) (nǐ zhège xiǎng fǎ hěn yǒu chuàngyì) / 你做得 (nǐ zuò de) 太到位了 (tài dào wèi le) .
- Félicitation succès : 恭喜 (gōngxǐ) ! / 祝贺你 (zhù hè nǐ) ! / 太替你高兴了 (tài tì nǐ gāoxìng le) .
- Combo classique : 恭喜恭喜 (gōngxǐ gōngxǐ) ！你太厉害了 (nǐ tài lìhai le) ！ attendu).
- Acceptation moderne : 谢谢 (xièxie) ，你过奖了 (nǐ guòjiǎng le) ou 谢谢 (xièxie) ，我会继续努力 (wǒ huì jìxù nǔlì) .
- Souhaits : 生日快乐 (shēngrì kuàilè) , 新年快乐 (xīnnián kuàilè) , 节日快乐 (jiérì kuàilè) , 学业进步 (xuéyè jìn bù) , 考试顺利 (kǎoshì shùn lì) , 一路平安 (yílù píng ān) , 早日康复 (zǎorì kāng fù) .
- Pour mariages : 百年好合 (bǎi nián hǎo hé) / 早生贵子 (zǎo shēng guì zi) .
- Pour Nouvel An chinois : 新年快乐 (xīnnián kuàilè) ！恭喜发财 (gōngxǐ fācái) ！(double vœu attendu, surtout aux aînés).`,
    objectives: [`Complimenter PRÉCISÉMENT (pas générique)`, `Doubler 恭喜恭喜 + compliment`, `Souhait Nouvel An : 新年快乐 + 恭喜发财`, `Accepter avec gratitude + humilité`],
    flashcards: [`进步`, `创意`, `到位`, `恭喜`, `祝贺`, `顺利`, `康复`, `一路平安`],
  },
  "cecr-b11-conversation-m5": {
    title: `RDV professionnel + mini entretien`, titleEn: `Professional appointment + mini interview`,
    duration: 14,
    category: `conversation`,
    difficulty: `intermediate`,
    introTitle: `Fixer un rendez-vous et se présenter`,
    introContent: `Prendre rendez-vous et se présenter en entretien nécessite un registre formel et des formules bien précises.

- RDV pro : 您好 (nín hǎo) ，我想跟您约个时间 (wǒ xiǎng gēn nín yuē gè shíjiān) / 关于 (guānyú) X 的 (de) 事情 (shìqing) / 大概需要 (dàgài xūyào) 30 分钟 (fēnzhōng) .
- Proposer : 您下周二上午方便吗 (nín xià zhōu èr shàngwǔ fāngbiàn ma) (nín xià zhōu èr shàngwǔ fāngbiàn ma)？Confirmer : 那就这样定了 (nà jiù zhèyàng dìng le) .
- Reconfirmer 24h avant : 明天我们的 (míngtiān wǒmen de) 会议还按计划进行吗 (huìyì hái àn jìhuà jìnxíng ma) ？(culturellement attendu).
- Entretien : 我叫 (wǒ jiào) X，今年 (jīnnián) X 岁 (suì) ，毕业于 (bìyè yú) X 大学 (dàxué) ，主修 (zhǔ xiū) X.
- Expérience : 我有 (wǒ yǒu) X 年工作经验 (nián gōngzuò jīngyàn) / 我擅长 (wǒ shàn cháng) X / 我对 (wǒ duì) X 感兴趣 (gǎn xìngqù) .
- Conclure : 希望有机会跟您合作 (xīwàng yǒujī huì gēn nín hézuò) .

Question fréquente : « 你为什么想来我们公司 (nǐ wèi shénme xiǎng lái wǒmen gōngsī) (nǐ wèi shénme xiǎng lái wǒmen gōngsī) ? » → réponds avec une raison précise + 我了解贵公司的 (wǒ liǎojiě guì gōngsī de) (wǒ liǎojiě guì gōngsī de) 项目 (xiàngmù) . Utilise 贵公司 (guì gōngsī) .`,
    objectives: [`Convenir formellement : 我想跟您约个时间`, `Reconfirmer un RDV pro 24 h avant`, `Se présenter : 毕业于 X 大学 + 擅长 X`, `Utiliser 贵公司 (entreprise respectée)`],
    flashcards: [`约`, `关于`, `毕业`, `专业`, `经验`, `擅长`, `合作`, `贵公司`],
  },
  "cecr-b11-conversation-m6": {
    title: `Conseiller un ami + exprimer une plainte`, titleEn: `Advise a friend + voice a complaint`,
    duration: 14,
    category: `conversation`,
    difficulty: `intermediate`,
    introTitle: `Suggérer sans imposer + se plaindre sans froisser`,
    introContent: `Conseil INDIRECT (culture chinoise respecte autonomie) : 我跟你说一下我的 (wǒ gēn nǐ shuō yíxià wǒ de) (wǒ gēn nǐ shuō yíxià wǒ de) 想法 (xiǎng fǎ) ，你参考一下 (nǐ cānkǎo yíxià) / 也许你可以 (yě xǔ nǐ kěyǐ) … / 我建议你 (wǒ jiànyì nǐ) … / 不如 (bùrú) …吧 (ba) .

- Adoucir : 这只是我的 (zhè zhǐshì wǒ de) 建议 (jiànyì) / 你自己决定 (nǐ zìjǐ juédìng) .
- ÉVITER : 你应该 (nǐ yīnggāi) , 你必须 (nǐ bìxū) .
- Plainte calme : 不好意思 (bù hǎoyìsi) ，这个菜有点问题 (zhège cài yǒu diǎn wèntí) (zhège cài yǒu diǎn wèntí) / 我点的 (wǒ diǎn de) 不是这个 (bùshì zhège) / 能不能换一下 (néng bù néng huàn yíxià) (néng bù néng huàn yíxià)？.
- Pour un produit défectueux : 这个东西坏了 (zhège dōngxi huài le) / 能退货吗 (néng tuì huò ma) ？.

TOUJOURS 不好意思 (bù hǎoyìsi) ou 麻烦你 (máfan nǐ) d'abord — adoucit massivement. Phrase magique : « 不好意思 (bù hǎoyìsi) ，能不能帮我解决一下 (néng bù néng bāng wǒ jiějué yíxià) (néng bù néng bāng wǒ jiějué yíxià) ? » — tu demandes de l'AIDE plutôt que de te plaindre.`,
    objectives: [`Conseiller avec 也许你可以 / 不如…吧`, `Adoucir avec 你参考一下`, `Se plaindre avec 不好意思 + précis`, `Phrase magique : 能不能帮我解决一下 ?`],
    flashcards: [`建议`, `参考`, `试试`, `考虑`, `问题`, `换`, `退货`, `解决`],
  },
  "cecr-b11-conversation-m7": {
    title: `Présenter un projet + parler de son parcours`, titleEn: `Present a project + talk about your journey`,
    duration: 14,
    category: `conversation`,
    difficulty: `intermediate`,
    introTitle: `Se présenter professionnellement en B1`,
    introContent: `Présenter un projet ou son parcours professionnel en chinois suit une structure attendue et formelle.

- Projet : structure contexte → objectif → moyens → bénéfices.
- Ouvrir : 我想介绍一下我们的 (wǒ xiǎng jièshào yíxià wǒmen de) (wǒ xiǎng jièshào yíxià wǒmen de) 项目 (xiàngmù) .
- Contexte : 大家都知道现在 (dàjiā dōu zhīdào xiànzài) (dàjiā dōu zhīdào xiànzài) X 是个问题 (shì gè wèntí) .
- Objectif : 我们希望解决 (wǒmen xīwàng jiějué) X.
- Moyens : 通过 (tōng guò) X 和 (hé) Y / 主要分三个步骤 (zhǔyào fēn sān gè bùzhòu) (zhǔyào fēn sān gè bùzhòu).
- Bénéfices : 这样可以 (zhèyàng kěyǐ) X.
- Conclure : 谢谢大家 (xièxie dàjiā) ，欢迎提问 (huānyíng tíwèn) .

Le format chinois est plus structuré, l'improvisation est mal vue.

- Parcours : 我在大学学了 (wǒ zài dàxué xué le) X 年 (nián) ，毕业后去了 (bìyè hòu qù le) X 公司 (gōngsī) .
- Verbes : 学 (xué) , 毕业 (bìyè) , 工作 (gōngzuò) , 换工作 (huàn gōngzuò) , 跳槽 (tiàocáo) (argot RH = démissionner pour mieux), 创业 (chuàngyè) .
- Phrase moderne : 我想找一份有意义的 (wǒ xiǎng zhǎo yī fèn yǒuyì yì de) 工作 (gōngzuò) (sujet d'époque chez les jeunes).`,
    objectives: [`Présenter en 4 temps : contexte → bénéfices`, `Eviter improvisation, structurer`, `Reconnaître 跳槽 (argot RH)`, `Comprendre 有意义的工作 (sujet jeune)`],
    flashcards: [`项目`, `介绍`, `解决`, `步骤`, `毕业`, `跳槽`, `创业`, `目标`],
  },
  "cecr-b11-nuances-m1": {
    title: `让 vs 使 vs 叫 — trois causatifs`, titleEn: `让 vs 使 vs 叫 — three causatives`,
    duration: 14,
    category: `vocabulary`,
    difficulty: `intermediate`,
    introTitle: `让/使/叫 : trois façons de faire faire`,
    introContent: `让 (ràng) = laisser / faire faire (oral, neutre, le plus universel).

- 妈妈让我去 (māma ràng wǒ qù) = maman me fait y aller.

使 (shǐ) = causer (formel, écrit, abstrait — émotions, états).

- 这个故事使我感动 (zhège gùshi shǐ wǒ gǎndòng) = cette histoire m'émeut.

JAMAIS 让我感动 (ràng wǒ gǎndòng) dans un texte écrit soutenu. 叫 (jiào) = ordonner (oral, autoritaire — supérieur vers subordonné).

- 老板叫我加班 (lǎo bǎn jiào wǒ jiābān) = le patron m'a ordonné de faire des heures sup.
- Hierarchy : 让 (ràng) < 叫 (jiào) < 使 (shǐ) (formel/abstrait).

让 (ràng) sert AUSSI de passif oral : 我让他骗了 (wǒ ràng tā piàn le) le) = je me suis fait avoir (variante orale de 被).

- Encore plus oral : 给 (gěi) .`,
    objectives: [`Choisir 让 (neutre) / 叫 (autorité) / 使 (formel)`, `Réserver 使 aux émotions/états abstraits`, `Reconnaître 让 / 给 comme passif oral`, `Préférer 被 à l'écrit B1+`],
    flashcards: [`让`, `使`, `叫`, `感动`, `加班`, `被`, `骗`],
  },
  "cecr-b11-nuances-m2": {
    title: `给 vs 为 vs 替 vs 代 — pour, à la place`, titleEn: `给 vs 为 vs 替 vs 代 — for, in place of`,
    duration: 14,
    category: `vocabulary`,
    difficulty: `intermediate`,
    introTitle: `给/为/替/代 : quatre prépositions, un seul piège`,
    introContent: `给 (gěi) , 为 (wèi) et 替 (tì) /代 (dài) expriment tous « pour » ou « à » mais désignent des relations très différentes.

- 给 (gěi) = à, donner à (DESTINATAIRE concret).
- 我给妈妈打电话 (wǒ gěi māma dǎ diànhuà).
- 为 (wèi) = pour, en faveur de (CAUSE / motivation abstraite) : 我为你高兴 (wǒ wèi nǐ gāoxìng) / 我为环境做点事 (wǒ wèi huánjìng zuò diǎn shì) (wǒ wèi huánjìng zuò diǎn shì).
- 替 (tì) = à la place de (SUBSTITUTION physique, oral) : 我替你去 (wǒ tì nǐ qù) .
- 代 (dài) = remplacer (FORMEL, institutionnel) : 代表 (dàibiǎo) / 代理 (dàilǐ) / 代课 (dài kè) .
- Erreur classique : 我为妈妈打电话 (wǒ wèi māma dǎ diànhuà) ✗ → utilise 给 (gěi) .

À l'écrit, préfère 代 (dài) ; à l'oral entre amis, 替 (tì) .

- Formule très utile : « 代我向 (dài wǒ xiàng) X 问好 (wèn hǎo) » = passe mes salutations à X.`,
    objectives: [`Choisir 给 (destinataire) vs 为 (motivation)`, `Distinguer 替 (oral) vs 代 (formel)`, `Construire 代我向 X 问好`, `Sentir la différence affective 为 vs 替`],
    flashcards: [`给`, `为`, `替`, `代`, `代表`, `代理`, `问好`, `向`],
  },
  "cecr-b11-nuances-m3": {
    title: `起来 / 下去 / 出来 + 看起来`, titleEn: `起来 / 下去 / 出来 + 看起来`,
    duration: 14,
    category: `vocabulary`,
    difficulty: `intermediate`,
    introTitle: `起来/下去/出来 : commencer, continuer, révéler`,
    introContent: `Trois composés directionnels à usage aspectuel — ils expriment l'aspect, pas la direction physique.

- **起来** (qǐlái) = **COMMENCER** à / avoir l'air de : 我笑起来了 (wǒ xiào qǐlái le), 看起来 (kàn qǐlái).
- **下去** (xiàqù) = **CONTINUER** : 看下去 (kàn xiàqù) = continuer à lire.
- **出来** (chūlái) = **RÉVÉLER** : 听出来 (tīng chūlái) = distinguer à l'oreille.

**Sens + 起来 = impression sensorielle :**

- 看起来 (kàn qǐlái), 听起来 (tīng qǐlái), 闻起来 (wén qǐlái), 吃起来 (chī qǐlái).
- 这个菜看起来很好吃 (zhège cài kàn qǐlái hěn hǎochī).

**Piège classique :** utiliser 像 (xiàng) à la place de 看起来 (kàn qǐlái) — 像 compare (il ressemble à), 看起来 exprime une impression.

**Formule passe-partout :** 看起来不错 (kàn qǐlái búcuò)，但我没尝过 (dàn wǒ méi cháng guò).`,
    objectives: [`Mémoriser 起来 (start) / 下去 (continue) / 出来 (reveal)`, `Construire 看起来 / 听起来 / 闻起来`, `Distinguer 像 (comparaison) vs 看起来 (impression)`, `Phrase passe-partout : 看起来不错`],
    flashcards: [`起来`, `下去`, `出来`, `想起来`, `看起来`, `听起来`, `闻起来`],
  },
  "cecr-b11-nuances-m4": {
    title: `像 vs 好像 vs 似乎 + 似的 / 一样`, titleEn: `像 vs 好像 vs 似乎 + 似的 / 一样`,
    duration: 14,
    category: `vocabulary`,
    difficulty: `intermediate`,
    introTitle: `像/好像/似乎 : ressembler ou sembler ?`,
    introContent: `三个词，三个层次 — trois niveaux pour exprimer ressemblance et impression.

- **像** (xiàng) = **ressembler à** (concret, physique) : 他像他爸爸 (tā xiàng tā bàba).
- **好像** (hǎoxiàng) = **on dirait** (impression incertaine, **oral**) : 好像下雨了 (hǎoxiàng xià yǔ le).
- **似乎** (sìhū) = **sembler** (**formel**, écrit) : 似乎不太可能 (sìhū bù tài kěnéng).

**Piège classique :** utiliser 像 (xiàng) pour « il semble que » — préfère 好像 (hǎoxiàng) à l'oral.

À l'oral B1, 好像 (hǎoxiàng) est ton outil n°1 pour adoucir une affirmation.

**Comparaison égale :** 跟 (gēn) X **一样** (yíyàng) + adj = aussi… que X.

- 他跟我一样高 (tā gēn wǒ yíyàng gāo) = il est aussi grand que moi.
- **似的** (shìde) en fin de phrase marque la comparaison figurée : 他叫得像狼嚎似的 (tā jiào de xiàng láng háo shìde).`,
    objectives: [`Choisir 像 (concret) vs 好像 (impression)`, `Réserver 似乎 à l'écrit`, `Construire 跟 X 一样 + adjectif`, `Adoucir avec 好像 à l'oral`],
    flashcards: [`像`, `好像`, `似乎`, `似的`, `一样`, `不一样`, `跟…一样`, `比`],
  },
  "cecr-b11-nuances-m5": {
    title: `拿 vs 带 vs 抱 + 送 vs 寄 vs 递`, titleEn: `拿 vs 带 vs 抱 + 送 vs 寄 vs 递`,
    duration: 14,
    category: `vocabulary`,
    difficulty: `intermediate`,
    introTitle: `拿/带/抱/送/寄/递 : le bon verbe selon la situation`,
    introContent: `拿 (ná) = prendre / porter dans la MAIN .

- 我拿着一本书 (wǒ ná zhe yī běn shū) .

带 (dài) = APPORTER / amener (objet OU personne, mouvement).

- 我带了 (wǒ dài le) 水 (shuǐ) / 我带孩子去公园 (wǒ dài háizi qù gōngyuán) (wǒ dài háizi qù gōngyuán).

抱 (bào) = porter dans les BRAS / serrer.

- 抱孩子 (bào háizi) / 抱你一下 (bào nǐ yíxià) .

送 (sòng) = OFFRIR / accompagner / livrer.

- 我送你一个礼物 (wǒ sòng nǐ yī gè lǐwù) / 我送你回家 (wǒ sòng nǐ huí jiā) (= je t'accompagne — sens chinois fort de « offrir du temps »).

寄 (jì) = envoyer par POSTE/courrier.

- 我寄了 (wǒ jì le) 一封信 (yī fēng xìn) / 寄快递 (jì kuàidì) .

递 (dì) = passer DE MAIN À MAIN.

- 把那个递给我 (bǎ nàge dì gěi wǒ) .`,
    objectives: [`Distinguer 拿 (main) / 带 (apporter) / 抱 (bras)`, `Distinguer 送 (offrir/accompagner) / 寄 (poste) / 递 (main)`, `Comprendre 送 = offrir du temps`, `Choisir le verbe selon canal/poids`],
    flashcards: [`拿`, `带`, `抱`, `送`, `寄`, `递`, `快递`, `礼物`],
  },
  "cecr-b11-nuances-m6": {
    title: `听/听见/听到 + 感觉/觉得/感到`, titleEn: `听/听见/听到 + 感觉/觉得/感到`,
    duration: 14,
    category: `vocabulary`,
    difficulty: `intermediate`,
    introTitle: `听/听见/听到 et 感觉/觉得 : nuances essentielles`,
    introContent: `Deux trios à distinguer : action vs résultat, sensation vs opinion.

**听 (tīng) / 听见 (tīngjiàn) / 听到 (tīng dào) :**

- **听** = écouter (action volontaire).
- **听见** = avoir entendu (perception accomplie, sans effort).
- **听到** = avoir reçu une info : 我听到他生病了 (wǒ tīng dào tā shēngbìng le) = j'ai entendu dire qu'il est malade.
- **听懂** = comprendre ce qu'on entend : 我没听懂 (wǒ méi tīng dǒng).

À l'oral, 听见 et 听到 sont souvent interchangeables, sauf pour les rumeurs/infos (→ 听到).

**感觉 (gǎnjué) / 觉得 (juéde) / 感到 (gǎndào) :**

- **感觉** = sensation physique ou émotionnelle : 我感觉很累 (wǒ gǎnjué hěn lèi).
- **觉得** = opinion subjective : 我觉得这本书很好 (wǒ juéde zhè běn shū hěn hǎo).
- **感到** = ressentir (**formel/écrit**) : 感到惊讶 (gǎndào jīngyà).

**Règle pratique :** à l'oral, choisis 感觉 (corps) ou 觉得 (opinion). À l'écrit, 感到.`,
    objectives: [`Distinguer 听 (action) / 听见 (résultat) / 听到 (info)`, `Choisir 听见 / 听到 / 听懂`, `Distinguer 感觉 (sensation) vs 觉得 (opinion)`, `Réserver 感到 à l'écrit`],
    flashcards: [`听`, `听见`, `听到`, `听说`, `感觉`, `觉得`, `感到`, `感动`],
  },
  "cecr-b11-nuances-m7": {
    title: `一边/一边 vs 又/又 + 而且/并且`, titleEn: `一边/一边 vs 又/又 + 而且/并且`,
    duration: 14,
    category: `vocabulary`,
    difficulty: `intermediate`,
    introTitle: `一边…一边 vs 又…又 : agir ou être ?`,
    introContent: `Deux structures de simultanéité — mais elles ne sont pas interchangeables.

- **一边 X 一边 Y** = faire X et Y **en même temps** (deux **actions**) : 我一边吃饭一边看电视 (wǒ yìbiān chī fàn yìbiān kàn diànshì).
- **又 X 又 Y** = avoir X et Y simultanément (deux **qualités/états**) : 这个菜又好吃又便宜 (zhège cài yòu hǎochī yòu piányi).

**Piège classique :** 我又吃饭又看电视 (wǒ yòu chī fàn yòu kàn diànshì) ✗ — 又…又… ne s'utilise pas avec deux actions concurrentes. Il faut 一边…一边….

**Pour « de plus » en ajoutant une idée :**

- **还** (hái) < **而且** (érqiě) < **并且** (bìngqiě) < **此外** (cǐwài) — registre croissant.
- À l'oral B1, 而且 (érqiě) est la valeur par défaut. 并且 sonne écrit.`,
    objectives: [`Construire 一边 X 一边 Y (actions concurrentes)`, `Construire 又 X 又 Y (qualités coexistantes)`, `Choisir 而且 (oral) vs 并且 (écrit)`, `Hiérarchiser 还 → 而且 → 并且 → 此外`],
    flashcards: [`一边`, `又`, `同时`, `而且`, `并且`, `另外`, `此外`],
  },
  "cecr-b12-bu-m1": {
    title: `不 : nier l'habitude, la volonté, le futur`, titleEn: `不: negate habits, will, future`,
    duration: 12,
    category: `grammar`,
    difficulty: `intermediate`,
    introTitle: `不 : nier l'habitude, la volonté, le futur`,
    introContent: `不 (bù) se place **avant** les verbes et adjectifs pour nier une habitude, une volonté ou une qualité.

- Habitude : 我不吃肉 (wǒ bù chī ròu) = je ne mange pas de viande (en général).
- Volonté : 我不去 (wǒ bù qù) = je ne veux pas / ne vais pas y aller.
- Qualité : 她不漂亮 (tā bù piàoliang).
- Futur : 明天我不来 (míngtiān wǒ bù lái) = je ne viendrai pas.

**Règle tonale :** 不 (ton 4) + mot au ton 4 → 不 passe au **ton 2**.

- 不是 → bú shì, 不要 → bú yào.

**Modaux :** 不 (bù) est toujours la négation des modaux.

- 不能 (bù néng), 不会 (bù huì), 不可以 (bù kěyǐ), 不想 (bù xiǎng).

**Piège :** ne jamais utiliser 没 (méi) avec les modaux.`,
    objectives: [`Utiliser 不 pour l'habitude et la volonté`, `Appliquer le sandhi 不 (ton 2 avant ton 4)`, `Nier le futur avec 不`, `Utiliser 不能/不会/不想`],
    flashcards: [`不`, `不是`, `不要`, `不去`, `不能`, `不会`, `不想`, `不喜欢`],
  },
  "cecr-b12-mei-m1": {
    title: `没 : nier l'action accomplie, l'existence`, titleEn: `没: negate completed actions, existence`,
    duration: 12,
    category: `grammar`,
    difficulty: `intermediate`,
    introTitle: `没 : nier l'accompli et la possession`,
    introContent: `没 (méi) — et sa forme longue 没有 (méiyǒu) — nie un **fait objectif** : quelque chose ne s'est pas produit ou n'existe pas.

- Possession : 我没有钱 (wǒ méiyǒu qián) = je n'ai pas d'argent.
- Accompli non réalisé : 我没吃饭 (wǒ méi chī fàn) = je n'ai pas mangé.
- Expérience absente : 我没去过中国 (wǒ méi qù guò Zhōngguó) = je ne suis jamais allé en Chine.

**Règle absolue :** 没 (méi) = fait objectif ; **不 (bù)** = refus subjectif.

- 我不吃饭 = je ne mange pas (habitude/choix).
- 我没吃饭 = je n'ai pas mangé (cette fois).

**Pièges :**

- 没 + 了 = **INTERDIT** : 我没吃了 ✗.
- Verbes d'état (是, 认识, 知道) → toujours 不, jamais 没.`,
    objectives: [`Utiliser 没 pour l'accompli non réalisé`, `Utiliser 没有 pour la possession`, `Éviter 没...了 (double négation interdite)`, `Distinguer 我不吃 / 我没吃`],
    flashcards: [`没`, `没有`, `没吃`, `没去`, `没看`, `没过`, `没钱`, `没人`],
  },
  "cecr-b12-bumei-m1": {
    title: `不 vs 没 : les 10 cas-types`, titleEn: `不 vs 没: the 10 typical cases`,
    duration: 15,
    category: `grammar`,
    difficulty: `intermediate`,
    introTitle: `不 vs 没 : l'arbre de décision en 3 questions`,
    introContent: `Face à une phrase à nier, pose-toi 3 questions :

- Habitude / goût / volonté / futur ? → **不** (bù).
- Action qui aurait dû avoir lieu mais ne s'est pas produite ? → **没** (méi).
- Possession / existence ? → **没有** (méiyǒu).

**Cas piège classique :** « je ne mange pas de viande »

- 我不吃肉 (wǒ bù chī ròu) = je suis végétarien, c'est mon choix.
- 我没吃肉 (wǒ méi chī ròu) = cette fois je n'en ai pas mangé — mais d'habitude oui.

**Autre piège :** 知道 (zhīdào), 认识 (rènshi), 是 (shì), 喜欢 (xǐhuan) sont des **verbes d'état continus** → toujours 不, jamais 没.

- 我不知道 ✓, 我没知道 ✗.

**Règle de sécurité :** tous les verbes d'état se nient avec **不**.`,
    objectives: [`Appliquer l'arbre de décision 不/没`, `Corriger 10 phrases tordues`, `Proscrire 没 + verbes d'état`, `Maîtriser 我不吃肉 vs 我没吃肉`],
    flashcards: [`不`, `没`, `不吃`, `没吃`, `不去`, `没去`, `不知道`, `不认识`],
  },
  "cecr-b12-hui-m1": {
    title: `会 : savoir-faire et probabilité`, titleEn: `会: learned skill and likelihood`,
    duration: 12,
    category: `grammar`,
    difficulty: `intermediate`,
    introTitle: `会 : savoir acquis ou probabilité future`,
    introContent: `会 (huì) a deux usages distincts — compétence et probabilité.

**1. Savoir-faire appris :**

- 我会开车 (wǒ huì kāichē), 他会说中文 (tā huì shuō Zhōngwén), 她会游泳 (tā huì yóuyǒng).
- La compétence a été **apprise** — même si on ne peut pas l'exercer maintenant.

**2. Probabilité / futur :**

- 明天会下雨 (míngtiān huì xià yǔ) = il va probablement pleuvoir.
- 他会来的 (tā huì lái de) = il viendra sûrement. Le **的 (de)** final renforce la certitude.

**Négation :** 不会 (bù huì) = ne sait pas / ne va pas.

- 我不会说日语 (wǒ bù huì shuō rìyǔ), 不会下雨 (bù huì xià yǔ).

**Distinction-clé avec 能 :** si l'action demande un apprentissage (langue, conduite, dessin) → **会** (huì).`,
    objectives: [`Utiliser 会 pour un savoir-faire appris`, `Utiliser 会 pour une probabilité`, `Renforcer avec 的 final`, `Distinguer 会 (appris) de 能 (capable)`],
    flashcards: [`会`, `会说`, `会开车`, `会游泳`, `会下雨`, `会来`, `不会`, `会...的`],
  },
  "cecr-b12-neng-m1": {
    title: `能 : capacité physique et possibilité`, titleEn: `能: physical ability and possibility`,
    duration: 12,
    category: `grammar`,
    difficulty: `intermediate`,
    introTitle: `能 : capacité du moment et permission informelle`,
    introContent: `能 (néng) porte sur la **capacité du moment** : on possède la compétence ET les conditions sont réunies.

- 我会游泳 (wǒ huì yóuyǒng)，但今天我感冒了，不能游 (bù néng yóu). La compétence reste, mais 能 est bloqué par les circonstances.

**Autres usages :**

- Quantité : 他能吃三碗饭 (tā néng chī sān wǎn fàn) = il peut en manger 3 bols.
- Possibilité : 这个办法能解决问题 (zhège bànfǎ néng jiějué wèntí) = cette méthode peut résoudre le problème.
- Permission informelle : 我能进来吗 (wǒ néng jìnlái ma) ? — équivalent souple de 可以 (kěyǐ).

**Négation :** 不能 (bù néng).

**Distinction 会 vs 能 :** 会 = compétence apprise ; 能 = capacité réelle dans la situation présente.`,
    objectives: [`Utiliser 能 pour la capacité conditionnée`, `Exprimer une quantité avec 能`, `Demander permission informelle avec 能`, `Distinguer 会 / 能`],
    flashcards: [`能`, `能吃`, `能做`, `不能`, `能不能`, `能解决`, `能帮`, `能来`],
  },
  "cecr-b12-keyi-m1": {
    title: `可以 : permission et suggestion`, titleEn: `可以: permission and suggestion`,
    duration: 10,
    category: `grammar`,
    difficulty: `intermediate`,
    introTitle: `可以 : permission et suggestion`,
    introContent: `可以 (kěyǐ) exprime une **permission** (règle, droit) ou une **acceptabilité** (c'est OK).

- Permission : 你可以走了 (nǐ kěyǐ zǒu le) = tu peux partir (c'est autorisé).
- Règlement : 这里可以抽烟吗 (zhèlǐ kěyǐ chōu yān ma) ? = peut-on fumer ici ?
- Suggestion : 我们可以试试 (wǒmen kěyǐ shì shì) = on pourrait essayer.
- « C'est OK » : 我觉得这个方案可以 (wǒ juéde zhège fāng'àn kěyǐ) = je trouve cette solution acceptable.

**Distinction-clé :**

- 我不能游泳 = je ne **peux** pas nager (corps/conditions).
- 这儿不可以游泳 = il est **interdit** de nager ici (règlement).

**Négation :** 不可以 (bù kěyǐ) est fort, quasi « interdit ». 不能 (bù néng) est plus neutre.`,
    objectives: [`Utiliser 可以 pour une permission`, `Utiliser 可以 pour une suggestion`, `Dire 不可以 = interdit`, `Choisir entre 能 / 可以`],
    flashcards: [`可以`, `不可以`, `可以吗`, `可以试试`, `可以走`, `可以抽烟`],
  },
  "cecr-b12-modal-m1": {
    title: `会/能/可以 : le test de tri`, titleEn: `会/能/可以: the sorting test`,
    duration: 15,
    category: `grammar`,
    difficulty: `intermediate`,
    introTitle: `会/能/可以 : le test en 3 scénarios`,
    introContent: `La natation illustre parfaitement les trois modaux — même situation, trois questions différentes.

- **会** : 你会游泳吗 (nǐ huì yóuyǒng ma) ? = tu **sais** nager ? (compétence apprise)
- **能** : 你今天能游泳吗 (nǐ jīntiān néng yóuyǒng ma) ? = tu **peux** nager aujourd'hui ? (corps + conditions)
- **可以** : 这儿可以游泳吗 (zhèr kěyǐ yóuyǒng ma) ? = c'est **autorisé** de nager ici ? (règlement)

**Test en 3 scénarios :**

- « Il sait parler français » → compétence apprise → **会** : 他会说法语 (tā huì shuō fǎyǔ).
- « Je ne peux pas venir demain, je suis malade » → capacité bloquée → **不能** : 我明天不能来 (wǒ míngtiān bù néng lái).
- « On peut s'asseoir ici ? » → permission → **可以** : 这儿可以坐吗 (zhèr kěyǐ zuò ma) ?

À l'oral, **能** est le plus fréquent, suivi de **可以**, puis **会**.`,
    objectives: [`Trier 15 phrases en 会/能/可以`, `Reformuler la même idée avec les 3`, `Choisir la négation adaptée`, `Savoir quand les 3 sont interchangeables`],
    flashcards: [`会`, `能`, `可以`, `不会`, `不能`, `不可以`],
  },
  "cecr-b12-hai-m1": {
    title: `还 : continuation ou addition`, titleEn: `还: continuation or addition`,
    duration: 12,
    category: `grammar`,
    difficulty: `intermediate`,
    introTitle: `还 : continuation, addition, modération`,
    introContent: `还 (hái) a **3 valeurs** distinctes — apprends-les dans l'ordre de fréquence.

**1. Continuation** (toujours, encore) — place AVANT le verbe :

- 他还在睡觉 (tā hái zài shuìjiào) = il dort encore.
- 我还没吃 (wǒ hái méi chī) = je n'ai pas encore mangé.

**2. Addition** (en plus, aussi) :

- 我喜欢咖啡，还喜欢茶 (wǒ xǐhuan kāfēi, hái xǐhuan chá) = j'aime le café, et aussi le thé.
- 还有一支笔 (háiyǒu yī zhī bǐ) = et aussi un stylo.

**3. Modération** (pas mal, assez) — très fréquent à l'oral :

- 还不错 (hái búcuò) = pas mal.
- 还可以 (hái kěyǐ) = ça va / acceptable.

**Classique oral :** 还没…呢 (hái méi…ne) = pas encore (avec implication d'attente).`,
    objectives: [`Utiliser 还 pour la continuation`, `Utiliser 还 pour l'addition`, `Saisir 还不错 / 还可以`, `Combiner 还 + 没...呢`],
    flashcards: [`还`, `还在`, `还没`, `还有`, `还可以`, `还不错`, `还要`, `还是`],
  },
  "cecr-b12-you-m1": {
    title: `又 : répétition dans le passé`, titleEn: `又: repetition in the past`,
    duration: 12,
    category: `grammar`,
    difficulty: `intermediate`,
    introTitle: `又 : « encore » pour ce qui s'est déjà produit`,
    introContent: `又 (yòu) signifie « de nouveau » pour une action qui **s'est déjà produite** (passé ou habituel).

- 他又迟到了 (tā yòu chídào le) = il est **encore** en retard (sous-entendu : reproche).
- 昨天下雨了，今天又下雨了 (jīntiān yòu xià yǔ le) = il a plu hier, et re-pleut aujourd'hui.

**Structure type : 又 + V + 了** — le 了 (le) est quasi obligatoire.

**又 (passé) vs 再 (futur) :**

- 他又来了 (tā yòu lái le) = il est revenu (encore une fois, déjà arrivé).
- 明天他再来 (míngtiān tā zài lái) = il reviendra demain (futur).

**Piège :** 他又来 ✗ sans 了 est incorrect. Il faut soit 了 (passé), soit 再 (futur).

**Autre usage : 又…又…** = à la fois… et… (deux qualités) : 她又聪明又漂亮 (tā yòu cōngmíng yòu piàoliang).`,
    objectives: [`Utiliser 又 pour une répétition passée`, `Combiner 又 + V + 了`, `Éviter 又 pour un futur (→ 再)`, `Utiliser 又...又... pour « à la fois »`],
    flashcards: [`又`, `又来了`, `又下雨了`, `又迟到`, `又...又...`, `再`, `再来`],
  },
  "cecr-b12-bi-m1": {
    title: `比 : le comparatif clair`, titleEn: `比: the clear comparative`,
    duration: 15,
    category: `grammar`,
    difficulty: `intermediate`,
    introTitle: `比 : le comparatif, sans 很 et avec 更`,
    introContent: `比 (bǐ) construit le comparatif chinois — structure simple, erreur classique.

**Structure de base : A + 比 + B + adjectif**

- 我比他高 (wǒ bǐ tā gāo) = je suis plus grand que lui.
- 中国比法国大 (Zhōngguó bǐ Fǎguó dà) = la Chine est plus grande que la France.

**Erreur classique :** 我比他**很**高 ✗ — jamais 很 après 比.

**Préciser l'écart :** A + 比 + B + adj + quantité

- 我比他高五厘米 (wǒ bǐ tā gāo wǔ límǐ) = 5 cm de plus.
- 他比我大两岁 (tā bǐ wǒ dà liǎng suì) = 2 ans de plus.

**Intensifier :** A + 比 + B + **更** + adj

- 她比他更聪明 (tā bǐ tā gèng cōngmíng) = encore plus intelligente.

**Négation :** A + **没有** + B + adj

- 我没有他高 (wǒ méiyǒu tā gāo) = je ne suis pas aussi grand que lui.`,
    objectives: [`Former A + 比 + B + adjectif (sans 很)`, `Quantifier la différence : 高五厘米`, `Intensifier avec 更`, `Nier : A + 没有 + B + adj`],
    flashcards: [`比`, `比较`, `更`, `比...高`, `比...大`, `没有...高`, `一样`, `不比`],
  },
  "cecr-b22-grammar-complement-m1": {
    title: `Compléments de résultat : 完/好/懂/到`, titleEn: `Result complements: 完/好/懂/到`,
    duration: 12,
    category: `grammar`,
    difficulty: `advanced`,
    introTitle: `完/好/懂/到 : compléments de résultat essentiels`,
    introContent: `Un verbe seul est ambigu : 吃 (chī) dit « manger » mais sans indiquer si c'est fini. Les **compléments de résultat** (V + résultat) comblent ce vide.

**Les 4 indispensables :**

- **完** (wán) = finir : 吃完 (chī wán), 做完 (zuò wán).
- **好** (hǎo) = bien fait / prêt : 准备好 (zhǔnbèi hǎo), 写好 (xiě hǎo).
- **懂** (dǒng) = comprendre : 听懂 (tīng dǒng), 看懂 (kàn dǒng).
- **到** (dào) = atteindre / percevoir : 看到 (kàn dào), 找到 (zhǎo dào), 听到 (tīng dào).

**Négation :** avec 没 pour un fait accompli.

- 我没听懂 (wǒ méi tīng dǒng) = je n'ai pas compris.
- 听不懂 (tīng bù dǒng) = je suis incapable de comprendre (potentiel négatif — sens différent).`,
    objectives: [`Utiliser 完/好/懂/到 après verbe`, `Différencier 看 vs 看到 vs 看懂`, `Nier avec 没, pas 不`, `Maîtriser 准备好/找到/听懂`],
    flashcards: [`完`, `好`, `懂`, `到`, `听懂`, `看到`, `找到`, `准备好`],
  },
  "cecr-b22-grammar-complement-m2": {
    title: `Compléments directionnels simples : 上/下/进/出/回/过`, titleEn: `Simple directional complements: 上/下/进/出/回/过`,
    duration: 12,
    category: `grammar`,
    difficulty: `advanced`,
    introTitle: `上/下/进/出/回/过 : compléments directionnels simples`,
    introContent: `Les compléments directionnels simples indiquent la direction du mouvement.

- 上 (shàng) (shàng, vers le haut/dessus), 下 (xià), 进 (jìn) , 出 (chū) , 回 (huí) , 过 (guò) .

Accolés à un verbe de mouvement : 走进 (zǒu jìn) , 跑出 (pǎo chū) , 坐下 (zuò xià), 站起 (zhàn qǐ) . Quand il y a un objet-lieu : il va AU MILIEU (verbe + lieu + complément) : 走进房间 (zǒu jìn fángjiān) ou 走进房间去 (zǒu jìn fángjiān qù) . Ne pas confondre avec 来 (lái) /去 (qù) qui sont également complémentaires.`,
    objectives: [`Combiner V + 上/下/进/出/回/过`, `Placer l'objet-lieu au milieu`, `Utiliser 坐下/站起/走进`, `Décrire un parcours de mouvement`],
    flashcards: [`上`, `下`, `进`, `出`, `回`, `过`, `走进`, `坐下`],
  },
  "cecr-b22-grammar-complement-m3": {
    title: `Compléments directionnels composés : 上来/下去/进来/出去`, titleEn: `Compound directional complements: 上来/下去/进来/出去`,
    duration: 12,
    category: `grammar`,
    difficulty: `advanced`,
    introTitle: `La grille 6×2 : 来 vers moi, 去 vers là-bas`,
    introContent: `Chacun des 6 directionnels (上/下 /进 /出 /回 /过 ) se combine avec 来 (lái) ou 去 (qù) : 上来 (shànglái) /上去 (shàngqù) , 下来 (xiàlái) /下去 (xiàqù) , 进来 (jìnlái) /进去 (jìnqù) , 出来 (chūlái) /出去 (chūqù) , 回来 (huílái) /回去 (huíqù) , 过来 (guòlái) /过去 (guò qù) .

- Exemples : 他走过来 (tā zǒu guòlái) (« il vient par ici ») vs 他走过去 (tā zǒu guò qù) (« il va par là-bas »).
- 请进来 (qǐng jìnlái) (« entrez [vers moi] »).

Usage abstrait : 看起来 (kàn qǐlái) (« à première vue »), 想起来 (xiǎng qǐlái) (« se souvenir »), 听下去 (tīng xiàqù) (« continuer à écouter »). Un verbe + V directionnel composé + objet = objet AU MILIEU : 他拿出来一本书 (tā ná chūlái yī běn shū) (tā ná chūlái yī běn shū) ou 他拿出一本书来 (tā ná chū yī běn shū lái) (tā ná chū yī běn shū lái). Régularité absolue de la grille 6×2 une fois mémorisée.`,
    objectives: [`Mémoriser la grille 6 × 来/去`, `Choisir selon position du locuteur`, `Placer l'objet au milieu`, `Utiliser 看起来/想起来 abstrait`],
    flashcards: [`上来`, `下去`, `进来`, `出去`, `回来`, `过来`, `起来`, `看起来`],
  },
  "cecr-b12-narr-m1": {
    title: `Marqueurs temporels du récit`, titleEn: `Story time markers`,
    duration: 12,
    category: `grammar`,
    difficulty: `intermediate`,
    introTitle: `12 connecteurs pour raconter en chinois`,
    introContent: `12 connecteurs à mémoriser pour raconter n'importe quelle anecdote en chinois.

**Séquence narrative :**

- 首先 (shǒuxiān) → 然后 (ránhòu) → 后来 (hòulái) → 最后 (zuìhòu)

**Ancrage temporel :**

- 那时候 (nà shíhou), 当时 (dāngshí), 突然 (tūrán), 正在 (zhèngzài)

**Causalité :** **因为…所以** — les deux côtés existent en chinois, contrairement au français.

- 因为下雨，所以我没去 (yīnwèi xià yǔ, suǒyǐ wǒ méi qù).

**Concession :** **虽然…但是** — idem, les deux côtés.

- 虽然很贵，但是很好 (suīrán hěn guì, dànshì hěn hǎo).

**Clôture :** 结果 (jiéguǒ) = finalement (souvent inattendu) ; 从此 (cóngcǐ) = depuis lors.`,
    objectives: [`Enchaîner 首先/然后/后来/最后`, `Utiliser 突然/当时 pour le drama`, `Former 因为...所以 et 虽然...但是`, `Clôturer avec 结果 / 从此`],
    flashcards: [`首先`, `然后`, `后来`, `最后`, `突然`, `当时`, `因为`, `所以`, `虽然`, `但是`, `结果`],
  },
  "cecr-b12-narr-m2": {
    title: `Raconter au passé`, titleEn: `Telling in the past`,
    duration: 12,
    category: `writing`,
    difficulty: `intermediate`,
    introTitle: `Passé en chinois : une date, puis tout au présent`,
    introContent: `Pas de passé simple ni d'imparfait en chinois. On situe le récit dans le passé avec : (1) une date explicite : 去年夏天 (qùnián xiàtiān) , 十年前 (shí nián qián) (il y a 10 ans), 那一天 (nà yī tiān) . (2) Une fois la date posée, tous les verbes restent au présent ! 去年我去了 (qùnián wǒ qù le) 中国 (Zhōngguó) ，每天都吃面条 (měi tiān dōu chī miàn tiáo) (l'année dernière je suis allé en Chine, je mangeais des nouilles chaque jour) — remarquez : 了 (le) seulement sur 去 (qù) , pas sur 吃 (chī) . (3) Pour l'imparfait (actions simultanées en cours), on utilise 在 (zài) / 正在 (zhèngzài) : 那时候我正在工作 (nà shíhou wǒ zhèngzài gōngzuò) (à ce moment-là, j'étais en train de travailler). Ce principe libère : pas de conjugaison, juste un bon usage des marqueurs de temps et des aspects 了 (le) /过 (guò) /在 (zài) .`,
    objectives: [`Poser un cadre temporel au début`, `Ne conjuguer RIEN — tout au présent`, `Placer 了 seulement sur les actions uniques`, `Utiliser 在/正在 pour l'imparfait`],
    flashcards: [`去年`, `前年`, `以前`, `那一天`, `那时候`, `正在`, `当时`, `刚才`],
  },
  "cecr-b12-narr-m3": {
    title: `Discours rapporté`, titleEn: `Reported speech`,
    duration: 10,
    category: `grammar`,
    difficulty: `intermediate`,
    introTitle: `Discours rapporté : 说/告诉/问 sans concordance`,
    introContent: `En chinois, on rapporte simplement avec 说 (shuō) : 他说他明天来 (tā shuō tā míngtiān lái) (il dit qu'il vient demain). Pas de concordance des temps ! On conserve le temps original. Autres verbes : 告诉 (gàosu) (dire à — nécessite un destinataire : 他 告诉我 ...) ; 问 (wèn) ; 回答 (huídá) ; 解释 (jiěshì) . Pour une question indirecte, on ne met PAS 吗 (ma) , mais on utilise 是否 (shì fǒu) ou l'alternative A-不 (bù) -A : 他问我去不去 (tā wèn wǒ qù bù qù) .

- Citation directe : 他说 (tā shuō) :『我来 (wǒ lái) 』.
- Citation indirecte : 他说他来 (tā shuō tā lái) .

En chinois moderne, la citation indirecte sans que = « je dis qu'il vient ») est la norme — pas de 说 (shuō) + 的 (de) ni autre marqueur. C'est fluide et économique.`,
    objectives: [`Utiliser 说 sans concordance`, `Distinguer 说 / 告诉 / 问`, `Former une question indirecte avec A-不-A`, `Passer direct ↔ indirect`],
    flashcards: [`说`, `告诉`, `问`, `回答`, `解释`, `是否`, `表示`, `提到`],
  },
  "cecr-b12-narr-m4": {
    title: `Décrire une personne`, titleEn: `Describing a person`,
    duration: 12,
    category: `writing`,
    difficulty: `intermediate`,
    introTitle: `Décrire une personne en 4 couches`,
    introContent: `Un portrait chinois se construit en couches.

(1) Physique général : 高高的 (gāo gāo de) , 瘦瘦的 (shòu shòu de) , 胖胖的 (pàng pàng de) — le redoublement de l'adjectif adoucit et donne un air affectueux.
(2) Visage : 圆脸 (yuán liǎn) , 大眼睛 (dà yǎnjing) , 短头发 (duǎn tóufa) .
(3) Vêtements : 穿着 (chuān zhe) + vêtement 裙子 (qúnzi) , elle porte une robe rouge — 穿着 (chuān zhe) est le marqueur d'état).
(4) Caractère : 性格 (xìng gé) + adjectif .

Adjectifs de caractère fréquents : 开朗 (kāilǎng) , 内向 (nèixiàng) , 幽默 (yōu mò) , 认真 (rènzhēn) , 耐心 (nài xīn) , 大方 (dàfang) , 害羞 (hàixiū) .

- Pour une impression : 看起来 (kàn qǐlái) + adj : 他看起来很聪明 (tā kàn qǐlái hěn cōngmíng).
- Piège : ne pas empiler 很 (hěn) avant un adjectif redoublé ✓, 很高高的 (hěn gāo gāo de) ✗).`,
    objectives: [`Empiler physique → vêtements → caractère`, `Utiliser 穿着 pour décrire les habits`, `Choisir 开朗 / 内向 / 幽默 / 认真`, `Former 看起来 + adjectif`],
    flashcards: [`高`, `瘦`, `胖`, `圆脸`, `大眼睛`, `穿着`, `性格`, `开朗`, `内向`, `幽默`, `认真`, `看起来`],
  },
  "cecr-b12-narr-m5": {
    title: `Décrire un lieu & une ambiance`, titleEn: `Describing a place & atmosphere`,
    duration: 12,
    category: `writing`,
    difficulty: `intermediate`,
    introTitle: `Décrire un lieu : du cadre à l'ambiance`,
    introContent: `Pour planter un décor :

(1) Cadrer l'espace avec 在 (zài) + lieu + 有 (yǒu) + objet. 在公园里 (zài gōngyuán lǐ) ，有很多老人 (yǒu hěn duō lǎorén) (dans le parc, il y a beaucoup de personnes âgées).
(2) Situer avec les localisations relatives : 前面 (qiánmiàn) , 后面 (hòumiàn) , 左边 (zuǒbian) , 右边 (yòubian) , 旁边 (pángbiān) , 中间 (zhōngjiān) . Note : la structure est 名词 (míng cí) + 的 (de) + position : 桌子的 (zhuōzi de) 旁边 (pángbiān) (à côté de la table).
(3) Décrire l'ambiance : 安静 (ānjìng) , 热闹 (rè nào) (animé, l'exact opposé de calme, très positif en Chine), 拥挤 (yōngjǐ) , 舒服 (shūfu) , 气氛很好 (qìfēn hěn hǎo).
(4) Enrichir avec des sons et des odeurs : 听到 (tīng dào) + son, 闻到 (wén dào) + odeur. 我听到了 (wǒ tīng dào le) 鸟叫 (niǎo jiào) (j'entends les oiseaux chanter), 闻到了 (wén dào le) 花香 (huā xiāng) (je sens l'odeur des fleurs).

Ce verbe 到 (dào) après le verbe de perception marque qu'on a BIEN perçu — distinction importante avec un simple 听 (tīng) .`,
    objectives: [`Ouvrir sur 在 + lieu + 有 + X`, `Utiliser 前/后/左/右/旁边/中间`, `Qualifier avec 安静 / 热闹 / 拥挤`, `Rendre perceptible avec 听到 / 闻到`],
    flashcards: [`前面`, `后面`, `左边`, `右边`, `旁边`, `中间`, `安静`, `热闹`, `拥挤`, `气氛`, `听到`, `闻到`],
  },
  "cecr-b12-edu-m1": {
    title: `Parcours scolaire chinois`, titleEn: `Chinese school system`,
    duration: 10,
    category: `culture`,
    difficulty: `intermediate`,
    introTitle: `Le système scolaire chinois en 5 niveaux`,
    introContent: `Système scolaire chinois : 幼儿园 (yòu'éryuán) (yòu'éryuán, maternelle, 3-6 ans), 小学 (xiǎoxué) (xiǎoxué, primaire, 6 ans), 初中 (chūzhōng) (chūzhōng, collège, 3 ans) — les 9 années obligatoires. Puis 高中 (gāozhōng) (gāozhōng, lycée, 3 ans), couronné par le 高考 (gāokǎo) — l'un des concours les plus difficiles au monde, déterminant toute la carrière.

- Université : 大学 (dàxué) , 本科 (běnkē) (licence, 4 ans), 研究生 (yán jiū shēng) , 博士 (bóshì) .
- Classement des unis : 一本 (yī běn) (top-tier, « C9 »), 二本 (èr běn) , 三本 (sān běn) .
- Le 清华 (qīng huá) et le 北大 (běi dà) (Tsinghua, Peking University) sont les deux sommets.

Profession d'enseignant : 老师 (lǎoshī) , 教授 (jiàoshòu) , 导师 (dǎoshī) .`,
    objectives: [`Nommer les 5 étapes scolaires`, `Comprendre l'enjeu du 高考`, `Distinguer 本科 / 研究生 / 博士`, `Connaître 清华 et 北大`],
    flashcards: [`幼儿园`, `小学`, `初中`, `高中`, `大学`, `高考`, `本科`, `研究生`, `博士`, `教授`],
  },
  "cecr-b12-edu-m2": {
    title: `Apprendre & étudier`, titleEn: `Learning & studying`,
    duration: 10,
    category: `grammar`,
    difficulty: `intermediate`,
    introTitle: `学 vs 学习 : oral vs formel`,
    introContent: `学 (xué) et 学习 (xuéxí) veulent tous deux dire « apprendre / étudier », mais diffèrent en registre.

- 学 (xué) : plus oral, souvent suivi d'un COD. 学中文 (xué Zhōngwén), 学开车 (xué kāichē) .
- 学习 (xuéxí) : plus écrit, plus formel, plus abstrait. 努力学习 (nǔlì xuéxí) , 学习经验 (xuéxí jīngyàn) (apprendre de l'expérience).

Phrases type : 复习 (fùxí) , 预习 (yù xí) (préparer avant le cours), 练习 (liànxí), 做作业 (zuò zuòyè) , 背 (bèi) (apprendre par cœur), 记 (jì) . Pour les examens : 考试 (kǎoshì) , 考得 (kǎo de) 怎么样 (zěnmeyàng) ? (ça s'est passé comment ?), 及格 (jí gé) , 不及格 (bùjí gé) , 满分 (mǎn fēn) (20/20).

加油 (jiāyóu) ! (bon courage !) est LE mot magique pour les étudiants chinois.`,
    objectives: [`Choisir 学 (oral) / 学习 (formel)`, `Distinguer 复习/预习/练习`, `Utiliser 做作业, 背, 记`, `Encourager avec 加油 !`],
    flashcards: [`学`, `学习`, `复习`, `预习`, `练习`, `作业`, `背`, `考试`, `及格`, `加油`],
  },
  "cecr-b12-edu-m3": {
    title: `Apprendre le chinois`, titleEn: `Learning Chinese`,
    duration: 10,
    category: `vocabulary`,
    difficulty: `intermediate`,
    introTitle: `Parler de son apprentissage du chinois`,
    introContent: `Vocabulaire indispensable pour parler de votre apprentissage du chinois.

- 汉字 (Hànzì), 拼音 (pīnyīn) , 声调 (shēngdiào) , 笔画 (bǐ huà) , 部首 (bùshǒu) .
- Quatre compétences : 听 (tīng) , 说 (shuō) , 读 (dú) , 写 (xiě) .

Les Chinois vous diront toujours : 你的 (nǐ de) 中文真好 (Zhōngwén zhēn hǎo) ! (ton chinois est super !) — soyez modeste : 哪里哪里 (nǎlǐ nǎlǐ) ，还差得 (hái chà de) 远 (yuǎn) . Décrire son niveau : 我学了 (wǒ xué le) 三年 (sān nián) (j'étudie depuis 3 ans), 我能看懂简单的 (wǒ néng kàn dǒng jiǎndān de) dǒng jiǎndān de) 文章 (wén zhāng) (je comprends des textes simples), 我的 (wǒ de) 发音还不太准 (fāyīn hái bù tài zhǔn) (ma prononciation n'est pas encore précise). Demander une reformulation : 请再说一遍 (qǐng zài shuō yī biàn), 慢一点 (màn yīdiǎn) , 这个字怎么写 (zhège zì zěnme xiě) ? (comment écrit-on ce caractère ?).`,
    objectives: [`Nommer 汉字/拼音/声调/笔画`, `Décrire son niveau avec 学了...年`, `Demander 再说一遍 / 慢一点`, `Gérer le compliment avec 哪里`],
    flashcards: [`汉字`, `拼音`, `声调`, `笔画`, `部首`, `听`, `说`, `读`, `写`, `发音`],
  },
  "cecr-b12-soc-m1": {
    title: `La famille élargie`, titleEn: `The extended family`,
    duration: 12,
    category: `culture`,
    difficulty: `intermediate`,
    introTitle: `外 et 堂/表 : famille paternelle vs maternelle`,
    introContent: `Le chinois distingue soigneusement les parents paternels et maternels.

- Grand-parents : 爷爷 (yéye) ≠ 外公 (wàigōng) ; 奶奶 (nǎinai) ≠ 外婆 (wàipó) .

Le 外 (wài) (wài, « extérieur ») marque tout ce qui vient du côté mère — rappel de l'ancien patriarcat : la fille « part » dans sa belle-famille.

- Oncle/tante : 叔叔 (shūshu), 伯伯 (bóbo) , 姑姑 (gūgu) , vs 舅舅 (jiùjiu) , 姨妈 (yí mā) .
- Cousins : 堂 (táng) (du côté père), 表 (biǎo) (du côté mère) : 堂兄 (táng xiōng) /堂弟 (táng dì) /表哥 (biǎo gē) /表妹 (biǎo mèi) .
- Aîné/cadet : toujours marqué .

Avec l'enfant unique, ce vocabulaire devient technique mais reste nécessaire pour comprendre la société et la littérature.`,
    objectives: [`Distinguer 爷爷/外公, 奶奶/外婆`, `Utiliser 叔叔/伯伯/姑姑/舅舅/姨妈`, `Comprendre 堂 (père) vs 表 (mère)`, `Marquer l'aîné/cadet`],
    flashcards: [`爷爷`, `奶奶`, `外公`, `外婆`, `叔叔`, `伯伯`, `姑姑`, `舅舅`, `姨妈`, `堂哥`, `表妹`],
  },
  "cecr-b12-soc-m2": {
    title: `Mariage & famille moderne`, titleEn: `Marriage & modern family`,
    duration: 10,
    category: `culture`,
    difficulty: `intermediate`,
    introTitle: `Mariage en Chine : étapes et vocabulaire`,
    introContent: `Le mariage en Chine suit des étapes codifiées, avec un vocabulaire et des pressions sociales bien spécifiques.

- Étapes : 谈恋爱 (tán liàn ài) , 订婚 (dìnghūn) , 领证 (lǐng zhèng) , 婚礼 (hūn lǐ) , 度蜜月 (dù mìyuè) .
- Verbe sécable : 结了 (jié le) 婚 (hūn) ; 离婚 (lí hūn) = divorcer ; 孩子 (háizi) / 子女 (zǐnǚ) = enfant.

Note culturelle : en Chine, le 领证 (lǐng zhèng) est la vraie union officielle ; la cérémonie peut avoir lieu des mois plus tard. La pression sociale sur le mariage est forte — les 剩女 (shèng nǚ) (shèngnǚ, « femmes restantes » de plus de 27 ans) et les 光棍 (guāng gùn) (guānggùn, « bâtons nus » = hommes célibataires) sont des étiquettes connues mais contestées.

Politique de l'enfant : 一孩政策 (yī hái zhèngcè) (1980-2015), 二孩政策 (èr hái zhèngcè) (2016-21), maintenant 三孩政策 (sān hái zhèngcè) depuis 2021.`,
    objectives: [`Utiliser 结婚 comme verbe sécable`, `Connaître 谈恋爱 / 订婚 / 领证 / 婚礼`, `Comprendre la distinction 领证 / 婚礼`, `Connaître la politique de l'enfant`],
    flashcards: [`结婚`, `离婚`, `谈恋爱`, `订婚`, `领证`, `婚礼`, `度蜜月`, `剩女`, `孩子`],
  },
  "cecr-b12-soc-m3": {
    title: `Générations : 90后, 00后`, titleEn: `Generations: 90s, 00s kids`,
    duration: 10,
    category: `culture`,
    difficulty: `intermediate`,
    introTitle: `80后/90后/00后 : générations et leurs codes`,
    introContent: `En Chine, on parle beaucoup des générations par leur décennie de naissance.

- 80后 (hòu) (bā líng hòu, nés dans les années 80), 90后 (hòu) , 00后 (hòu) (ling líng hòu, nés dans les années 2000 — prononcé « líng líng hòu »).

Chaque génération a son étiquette : 80后 (hòu) = première génération enfant unique, bosseurs, achetant leurs premiers appartements. 90后 (hòu) = digital natives, souvent critiqués comme « gâtés », en réalité plus ouverts.

- 00后 (hòu) = Z chinoise, TikTok , ultra-connectée, socialement plus libérale.

Expressions récentes : 躺平 (tǎng píng) (tǎng píng, « s'allonger à plat » — refus d'une compétition économique infinie), 内卷 (nèi juǎn) (nèi juǎn, « involution » — compétition absurde où plus personne ne gagne), 打工人 (dǎgōng rén) (dǎ gōng rén, « le travailleur » — autodérision des 90后 /00后 ). Ces termes sont partout dans le chinois en ligne.`,
    objectives: [`Utiliser 80后/90后/00后`, `Saisir 躺平 et 内卷`, `Se dire 打工人 (self-deprecation)`, `Lire un débat générationnel`],
    flashcards: [`80后`, `90后`, `00后`, `躺平`, `内卷`, `打工人`, `抖音`, `佛系`],
  },
  "cecr-b12-soc-m4": {
    title: `Premier emploi & marché du travail`, titleEn: `First job & job market`,
    duration: 12,
    category: `conversation`,
    difficulty: `intermediate`,
    introTitle: `Trouver un emploi en Chine : 求职 et 面试`,
    introContent: `Le marché de l'emploi chinois est tendu pour les jeunes diplômés (le taux de chômage 16-24 ans a dépassé 20 % en 2023).

- Vocabulaire clé : 求职 (qiúzhí) (qiú zhí, chercher un emploi), 简历 (jiǎn lì) , 面试 (miàn shì) , 录取 (lù qǔ) , 工资 (gōngzī) , 五险一金 (wǔ xiǎn yī jīn) (wǔ xiǎn yī jīn, « 5 assurances + 1 fonds », les cotisations sociales obligatoires).
- Secteurs : 国企 (guó qǐ) , 外企 (wài qǐ) , 私企 (sī qǐ) , 创业 (chuàngyè) .

Phrases utiles en entretien : 我对贵公司很感兴趣 (wǒ duì guì gōngsī hěn gǎn xìngqù) (je suis très intéressé par votre entreprise), 我的 (wǒ de) 优势是 (yōushì shì) ... (mon point fort est...), 您希望什么时候入职 (nín xīwàng shénme shíhou rù zhí) ? (vous souhaitez que je commence quand ?). Terme en vogue : 996 (9h à 21h, 6 j/7), 007 (24h/24, 7 j/7) — critiques du surmenage.`,
    objectives: [`Former un mini-CV oral (专业, 经验, 优势)`, `Utiliser 求职 / 面试 / 录取 / 工资`, `Comparer 国企 / 外企 / 私企 / 创业`, `Saisir 996 / 007 dans le débat social`],
    flashcards: [`求职`, `简历`, `面试`, `录取`, `工资`, `五险一金`, `国企`, `外企`, `私企`, `创业`, `996`],
  },
  "cecr-b12-med-m1": {
    title: `Vocabulaire de la presse`, titleEn: `Press vocabulary`,
    duration: 10,
    category: `vocabulary`,
    difficulty: `intermediate`,
    introTitle: `新闻 : vocabulaire des médias chinois`,
    introContent: `新闻 (xīnwén) désigne les actualités ; comprendre le vocabulaire médiatique chinois est essentiel pour suivre l'information.

- Types : 头条 (tóutiáo), 报道 (bàodào) , 评论 (píng lùn) , 专访 (zhuān fǎng) , 社论 (shè lùn) .
- Médias : 报纸 (bàozhǐ) , 电视 (diànshì) , 广播 (guǎngbō) , 网站 (wǎngzhàn) , 公众号 (gōngzhòng hào).
- Journalistes : 记者 (jìzhě) , 编辑 (biānjí) , 主持人 (zhǔchí rén) .
- Verbes : 报道 (bàodào) = rapporter/relater ; 发布 (fābù) = publier ; 转发 (zhuǎn fā) = partager/retransmettre.

Structure typique d'un article chinois : le qui-quoi-où-quand-comment (5W) est en tête de phrase, les détails après — modèle identique à la presse anglo-saxonne.

- Exemple d'entête : 昨天 (zuótiān) ，北京发生地震 (běijīng fāshēng dìzhèn) (hier, à Pékin, tremblement de terre).`,
    objectives: [`Nommer les types d'articles (头条/报道/评论)`, `Distinguer les médias (报纸/网站/公众号)`, `Repérer 记者 / 编辑 / 主持人`, `Comprendre la structure 5W chinoise`],
    flashcards: [`新闻`, `头条`, `报道`, `评论`, `报纸`, `电视`, `记者`, `编辑`, `公众号`, `转发`],
  },
  "cecr-b12-med-m2": {
    title: `Lire un titre d'actualité`, titleEn: `Reading a news headline`,
    duration: 12,
    category: `reading`,
    difficulty: `intermediate`,
    introTitle: `Décoder un titre de presse chinois`,
    introContent: `Un titre chinois omet les particules (的 /了 /呢 ), les sujets évidents, et compresse au maximum.

- 北京重霾 (běijīng zhòng mái) 今停课 (jīn tíng kè) .
- 美国加息 (měi guó jiā xī) 人民币跌 (rén mín bì diē) (USA hausse taux, yuan baisse).

Les verbes sont au présent, pas de marqueur temporel. Abréviations courantes : 央视 (yāng shì) = 中央电视台 (zhōngyāng diànshìtái) , 北大 (běi dà) = 北京大学 (běijīng dàxué) , 清华 (qīng huá) = 清华大学 (qīng huá dàxué) , 地铁 (dìtiě) = 城市地下铁路 (chéngshì dìxià tiělù) , 美联储 (měi lián chǔ) = la Fed.

- Chiffres en chinois : 万 (wàn) (10 000), 亿 (yì) (100 millions).
- 十亿 (shí yì) = 1 milliard.
- Sujet économique courant : GDP = 国内生产总值 (guó nèi shēng chǎn zǒng zhí) ; inflation = 通货膨胀 (tōnghuò péngzhàng) / 通胀 (tōng zhàng) .

Politique : 政府 (zhèngfǔ) , 政策 (zhèngcè) (politique — au sens policy), 主席 (zhǔxí) , 两会 (liǎng huì) (2 sessions — Congrès National).`,
    objectives: [`Décoder un titre compressé`, `Reconnaître les abréviations (央视, 北大...)`, `Lire les grands nombres (万, 亿)`, `Identifier le sujet d'un article en 5 sec`],
    flashcards: [`头条`, `央视`, `北大`, `清华`, `万`, `亿`, `政府`, `政策`, `主席`, `两会`],
  },
  "cecr-b12-med-m3": {
    title: `Réseaux sociaux chinois`, titleEn: `Chinese social media`,
    duration: 10,
    category: `culture`,
    difficulty: `intermediate`,
    introTitle: `Réseaux sociaux chinois : l'essentiel`,
    introContent: `La Chine a ses propres plateformes — Google, Facebook, YouTube, Instagram sont bloqués.

- Équivalents : 微博 (wēi bó), 抖音 (dǒu yīn), 小红书 (xiǎo hóng shū) , 知乎 (zhī hū) , 哔哩哔哩 (bì lī bì lī) (Bilibili ≈ YouTube jeune), 百度 (bǎi dù) .
- Actions : 关注 (guānzhù) , 点赞 (diǎnzàn) , 评论 (píng lùn) , 转发 (zhuǎn fā) , 分享 (fēnxiǎng) .
- Figures : 粉丝 (fěn sī) , 大 (dà) V (dà V, influenceur vérifié, V pour « verified »), 网红 (wǎng hóng), 博主 (bó zhǔ) .

Pour traverser le pare-feu : 翻墙 (fān qiáng) (fān qiáng, « sauter le mur »), terme familier pour utiliser un VPN. La suggestion d'utiliser un VPN reste délicate légalement.`,
    objectives: [`Nommer les 6 grandes plateformes`, `Utiliser 关注/点赞/评论/转发`, `Comprendre 粉丝/大V/网红/博主`, `Saisir 翻墙 dans son contexte`],
    flashcards: [`微博`, `抖音`, `小红书`, `知乎`, `关注`, `点赞`, `转发`, `粉丝`, `网红`, `博主`, `翻墙`],
  },
  "cecr-b12-med-m4": {
    title: `Fake news & vérification`, titleEn: `Fake news & fact-checking`,
    duration: 12,
    category: `reading`,
    difficulty: `intermediate`,
    introTitle: `Fake news : vocabulaire pour vérifier une info`,
    introContent: `假新闻 (jiǎ xīnwén) est devenu un sujet majeur sur les réseaux chinois.

- Vocabulaire : 谣言 (yáoyán) , 辟谣 (pì yáo) (pì yáo, démentir une rumeur), 真相 (zhēnxiàng), 真实 (zhēnshí) , 可信 (kě xìn) , 来源 (lái yuán) , 证据 (zhèngjù) .
- Questions à se poser : 这条新闻的 (zhè tiáo xīnwén de) 来源是哪里 (lái yuán shì nǎlǐ) ? (quelle est la source ?), 有没有证据 (yǒu méiyǒu zhèngjù) ? (y a-t-il des preuves ?), 是谁发布的 (shì shéi/shuí fābù de) (shì shéi/shuí fābù de) ? (qui l'a publié ?).
- Verbes critiques : 相信 (xiāngxìn) , 怀疑 (huáiyí) , 确认 (què rèn) , 证实 (zhèngshí) .

Phénomène typique en chinois : 标题党 (biāotí dǎng) (biāo tí dǎng, « secte des titres » — les sites à clickbait). Précieux à connaître : 澎湃新闻 (péngpài xīnwén) , 新华社 (xīn huá shè) (agence Xinhua, officiel), 财新 (cái xīn) .`,
    objectives: [`Nommer 谣言 / 辟谣 / 真相`, `Interroger une source (来源, 证据)`, `Utiliser 怀疑 / 确认 / 证实`, `Reconnaître 标题党`],
    flashcards: [`假新闻`, `谣言`, `辟谣`, `真相`, `真实`, `来源`, `证据`, `怀疑`, `确认`, `证实`, `标题党`],
  },
  "cecr-b12-med-m5": {
    title: `Publicité & marketing chinois`, titleEn: `Chinese advertising & marketing`,
    duration: 12,
    category: `culture`,
    difficulty: `intermediate`,
    introTitle: `Publicité et commerce en ligne : les mots clés`,
    introContent: `La publicité chinoise , guǎng gào) utilise des formules courtes, souvent rythmées en 4 caractères, parfois en vers.

- Vocabulaire : 品牌 (pǐn pái) , 标志 (biāozhì) / 标识 (biāoshí) , 口号 (kǒu hào) , 优惠 (yōuhuì) , 打折 (dǎzhé) , 限时 (xiàn shí) , 免费 (miǎn fèi) .
- Les grands événements commerciaux : 双十一 (shuāng shí yī) (Shuāng Shí Yī, le « Singles' Day » du 11/11, plus gros jour shopping au monde), 618 (fête d'anniversaire JD le 18 juin), 双十二 (shuāng shí èr) (12/12).
- Arguments publicitaires classiques : 性价比高 (xìngjiàbǐ gāo) (xìng jià bǐ gāo, bon rapport qualité/prix — mot-roi du commerce chinois), 限量 (xiàn liàng) , 爆款 (bào kuǎn) .
- Influenceurs vendeurs : 带货主播 (dài huò zhǔbō) (dài huò zhǔ bō, live-sellers, phénomène énorme en Chine).
- Marques locales qui montent : 李宁 (lǐ níng) , 华为 (huá wèi) , 大疆 (dà jiāng) , 比亚迪 (bǐ yà dí) .`,
    objectives: [`Décoder 品牌 / 口号 / 优惠 / 打折`, `Connaître 双十一 / 618`, `Utiliser 性价比 / 限量 / 爆款`, `Saisir 带货主播`],
    flashcards: [`广告`, `品牌`, `口号`, `优惠`, `打折`, `免费`, `双十一`, `性价比`, `限量`, `爆款`, `带货主播`],
  },
  "cecr-b12-conversation-m1": {
    title: `Critiquer une œuvre + noter sur Douban`, titleEn: `Critique a work + rate on Douban`,
    duration: 14,
    category: `conversation`,
    difficulty: `intermediate`,
    introTitle: `Critiquer un film ou un livre avec structure`,
    introContent: `Donner un avis structuré sur un livre, un film ou un restaurant est une compétence clé en B2.

- Positif structuré : 我觉得这本书写得 (wǒ juéde zhè běn shūxiě de) (wǒ juéde zhè běn shūxiě de) 很好 (hěn hǎo) ，特别是 (tèbié shì) X.
- Donner : 优点是 (yōu diǎn shì) … / 缺点是 (quē diǎn shì) ….
- Nuancer : 总体来说不错 (zǒngtǐ lái shuō búcuò)，但是 (dànshì) ….
- Vocab : 情节 (qíngjié) / 人物 (rén wù) / 节奏 (jié zòu) / 表演 (biǎoyǎn) / 剧本 (jù běn) / 风格 (fēnggé) .
- Phrase éloge fort : 这部电影看完让我想了 (zhè bù diànyǐng kàn wán ràng wǒ xiǎng le) wán ràng wǒ xiǎng le) 很久 (hěn jiǔ) .
- Notation : 五星 (wǔ xīng) / 四星 (sì xīng) , 推荐 (tuījiàn) / 不推荐 (bù tuījiàn) , 值得 (zhí de) / 不值得 (bù zhí de) .
- Échelle : 不错 (búcuò) < 很好 (hěn hǎo) < 太棒了 (tài bàng le) < 神作 (shén zuò) .
- À éviter : 烂 (làn) / 垃圾 (lājī) → préfère 不太理想 (bù tài lǐxiǎng) / 期待落空 (qī dāi luò kōng) .

Sur 大众点评 (dàzhòng diǎn píng) ou 豆瓣 (dòu bàn) , format en 3 temps : note + forts + faibles.`,
    objectives: [`Critiquer en 3 temps : note + 优点 + 缺点`, `Utiliser 情节 / 人物 / 节奏 / 风格`, `Recommander avec 值得 + 推荐`, `Éviter 烂 / 垃圾 (vulgaires)`],
    flashcards: [`优点`, `缺点`, `情节`, `节奏`, `风格`, `推荐`, `值得`, `理想`],
  },
  "cecr-b12-conversation-m2": {
    title: `Nostalgie et souvenirs : 怀念 et 时光`, titleEn: `Nostalgia and memories: 怀念 and 时光`,
    duration: 14,
    category: `conversation`,
    difficulty: `intermediate`,
    introTitle: `怀念 : parler de ses souvenirs avec nostalgie`,
    introContent: `Évoquer des souvenirs en chinois passe par quelques formules de nostalgie bien ancrées dans la culture.

- Démarrer : 我还记得 (wǒ hái jìde) / 那时候我们 (nà shíhou wǒmen) … / 想起来真怀念 (xiǎng qǐlái zhēn huái niàn) .
- 怀念 (huái niàn) = LE mot-clé de la nostalgie : 我很怀念那段时光 (wǒ hěn huái niàn nà duàn shíguāng) .
- Enfance : 小时候我经常 (xiǎoshíhou wǒ jīngcháng) (xiǎoshíhou wǒ jīngcháng)….
- Phrase rituelle : 时间过得真快啊 (shíjiān guò de zhēn kuài a) ，转眼就 (zhuǎnyǎn jiù) …).
- Évoquer un objet/photo : 这张照片让我想起 (zhè zhāng zhàopiàn ràng wǒ xiǎng qǐ) (zhè zhāng zhàopiàn ràng wǒ xiǎng qǐ) X / 这个东西陪了 (zhège dōngxi péi le) le) 我很多年 (wǒ hěn duō nián) / 充满回忆 (chōngmǎn huíyì) .
- Conclure : 那都是过去的 (nà dōu shì guò qù de) qù de) 事了 (shì le) / 现在好好过 (xiànzài hǎohǎo guò) .

Phrase poétique 时光荏苒 (shíguāng rěn rǎn) .

- Sur WeChat Moments, format : vieille photo + 陪了 (péi le) 我很多年 (wǒ hěn duō nián) + 🥹.`,
    objectives: [`Utiliser 怀念 (mot émotionnel)`, `Réagir au rituel 时间过得真快`, `Évoquer une photo : 让我想起 X`, `Format Moments : 陪了我多年`],
    flashcards: [`记得`, `怀念`, `小时候`, `回忆`, `转眼`, `照片`, `陪`, `充满`],
  },
  "cecr-b12-conversation-m3": {
    title: `Argumenter sur sujet de société + sujets délicats`, titleEn: `Argue societal topics + delicate matters`,
    duration: 14,
    category: `conversation`,
    difficulty: `intermediate`,
    introTitle: `Argumenter sur un sujet sensible avec tact`,
    introContent: `Débattre de sujets sociaux en chinois nécessite une structure claire et une conscience des thèmes sensibles.

- Sujets courants : 教育 (jiàoyù) / 环境 (huánjìng) / 工作压力 (gōngzuò yā lì) / 房价 (fángjià) / 老龄化 (lǎo líng huà) .
- Structure : 我觉得 (wǒ juéde) + position + 因为 (yīnwèi) + raison + 比如 (bǐrú) + exemple + 不过 (búguò) + nuance.
- Vocab : 现象 (xiànxiàng) / 趋势 (qū shì) / 影响 (yǐngxiǎng) / 解决 (jiějué) / 改善 (gǎishàn) .
- Ouverture polie : 这是个复杂的 (zhè shì gè fùzá de) 问题 (wèntí) / 这个问题没有简单的 (zhège wèntí méiyǒu jiǎndān de) (zhège wèntí méiyǒu jiǎndān de) yǒu jiǎndān de) 答案 (dá'àn) .

SUJETS SENSIBLES : politique, historique récent, Taiwan — préfère « 我对这个不太了解 (wǒ duì zhège bù tài liǎojiě) (wǒ duì zhège bù tài liǎojiě) » avec inconnus.

- Délicats : 抑郁症 (yìyùzhèng) / 焦虑 (jiāo lǜ) / 离婚 (lí hūn) / 丁克 (dīng kè) / 不婚主义 (bù hūn zhǔyì) .
- Préface : 我可以问你一个比较私人的 (wǒ kěyǐ wèn nǐ yī gè bǐjiào sīrén de) (wǒ kěyǐ wèn nǐ yī gè bǐjiào sīrén de) 问题吗 (wèntí ma) ？Porte de sortie : 你不想聊就不聊 (nǐ bù xiǎng liáo jiù bù liáo) (essentiel B1+).`,
    objectives: [`Argumenter en 4 temps : position → raison → exemple → nuance`, `Naviguer sujets sensibles avec 我不太了解`, `Préfacer un sujet privé : 我可以问吗 ?`, `Offrir 你不想聊就不聊`],
    flashcards: [`现象`, `趋势`, `影响`, `改善`, `复杂`, `抑郁`, `私人`, `经历`],
  },
  "cecr-b12-conversation-m4": {
    title: `Impressions de voyage + mésaventure`, titleEn: `Travel impressions + mishap`,
    duration: 14,
    category: `conversation`,
    difficulty: `intermediate`,
    introTitle: `Raconter un voyage et gérer une mésaventure`,
    introContent: `Raconter un voyage et gérer les imprévus de transport en chinois repose sur un vocabulaire pratique bien ciblé.

- Démarrer : 我刚从 (wǒ gāng cóng) X 回来 (huílái) / 我去 (wǒ qù) X 玩了 (wán le) 一周 (yī zhōu) .
- Adjectifs : 美 (měi) / 壮观 (zhuàngguān) / 古老 (gǔlǎo) / 现代 (xiàndài) / 热闹 (rè nào) / 安静 (ānjìng) .
- Conseils : 你一定要去 (nǐ yídìng yào qù) / 我推荐 (wǒ tuījiàn) X / 别错过 (bié cuòguò) X.
- Phrases-éloge : 那里的 (nàlǐ de) 人很热情 (rén hěn rèqíng) / 当地的 (dāngdì de) 菜很地道 (cài hěn dìdao).
- Mésaventure : 行李 (xíngli) / 丢 (diū) / 找不到 (zhǎo bù dào) / 错过 (cuòguò) / 晚点 (wǎndiǎn) / 取消 (qǔ xiāo) .
- 我的 (wǒ de) 行李丢了 (xíngli diū le) / 我错过了 (wǒ cuòguò le) 航班 (hángbān) .
- Help : 你能帮我吗 (nǐ néng bāng wǒ ma) + 不好意思 (bù hǎoyìsi) + cause.
- Conclure positif : 不过总体来说挺有意思 (búguò zǒngtǐ lái shuō tǐng yǒu yìsi) (búguò zǒngtǐ lái shuō tǐng yǒu yìsi).

Si problème vrai : voir 工作人员 (gōngzuò rén yuán) , plus efficace.`,
    objectives: [`Décrire un voyage : 美 / 壮观 / 热闹 / 古老`, `Complimenter avec 当地的菜很地道 / 人热情`, `Gérer un imprévu : 行李丢了 / 错过航班`, `Conclure résilient : 不过总体来说挺有意思`],
    flashcards: [`壮观`, `古老`, `热闹`, `推荐`, `地道`, `行李`, `丢`, `错过`],
  },
  "cecr-b12-conversation-m5": {
    title: `Parcours universitaire + difficulté académique`, titleEn: `Academic path + academic difficulty`,
    duration: 14,
    category: `conversation`,
    difficulty: `intermediate`,
    introTitle: `Parler de ses études et demander de l'aide`,
    introContent: `Parler de scolarité et d'études en Chine demande de connaître le système et son vocabulaire clé.

- Niveaux : 小学 (xiǎoxué) / 初中 (chūzhōng) / 高中 (gāozhōng) / 大学 (dàxué) / 硕士 (shuò shì) / 博士 (bóshì) .
- Diplômes : 本科生 (běnkē shēng) / 研究生 (yán jiū shēng) / 毕业生 (bìyèshēng) .
- Verbes : 上课 (shàngkè) / 上学 (shàngxué) / 考试 (kǎoshì) / 复习 (fùxí) / 通过 (tōng guò) / 不及格 (bùjí gé) .

Sujet brûlant : 高考 (gāokǎo) (gāokǎo, équivalent du bac mais COLOSSAL en Chine — sujet immédiatement compris et chargé).

- Demander à un Chinois 你高考考了 (nǐ gāokǎo kǎo le) 多少分 (duōshao fēn) ? = OK et fréquent.
- Difficulté : 我有点跟不上 (wǒ yǒu diǎn gēn bù shàng) (wǒ yǒu diǎn gēn bù shàng) / 我没听懂 (wǒ méi tīng dǒng) .
- Aide : 你能给我讲一下吗 (nǐ néng gěi wǒ jiǎng yíxià ma) (nǐ néng gěi wǒ jiǎng yíxià ma) ?
- Étudier ensemble : 一起复习 (yìqǐ fùxí) / 互相帮助 (hùxiāng bāngzhù) .
- Encouragement : 失败是成功之母 (shī bài shì chénggōng zhī mǔ) / 慢慢来 (màn màn lái) / 别给自己太大压力 (bié gěi zìjǐ tài dà yā lì) .`,
    objectives: [`Connaître les 6 niveaux scolaires`, `Comprendre l'enjeu du 高考`, `Demander de l'aide : 你能给我讲一下吗 ?`, `Encourager avec 失败是成功之母`],
    flashcards: [`本科`, `硕士`, `博士`, `高考`, `通过`, `跟不上`, `复习`, `压力`],
  },
  "cecr-b12-conversation-m6": {
    title: `Raconter un échec + présenter une stratégie`, titleEn: `Tell a failure + present a strategy`,
    duration: 14,
    category: `conversation`,
    difficulty: `intermediate`,
    introTitle: `Raconter un échec + présenter un plan B`,
    introContent: `Parler d'un échec passé ou présenter un plan structuré sont deux compétences valorisées en contexte professionnel chinois.

- Échec humble : 我之前犯过一个错误 (wǒ zhī qián fàn guò yī gè cuòwù) / 那次经历让我学到很多 (nà cì jīnglì ràng wǒ xué dào hěn duō) (nà cì jīnglì ràng wǒ xué dào hěn duō).

Les Chinois VALORISENT le récit d'échec lucide (signe de 成熟).

- Vocab : 失败 (shī bài) / 教训 (jiāo xùn) / 反思 (fǎnsī) / 改进 (gǎijìn) .
- Phrase : 这个教训我永远记得 (zhège jiāo xùn wǒ yǒng yuǎn jìde) / 现在回头看 (xiànzài huí tóu kàn) ，那次失败是宝贵的 (nà cì shī bài shì bǎoguì de) .

En entretien chinois, « 你最大的 (nǐ zuì dà de) 失败是什么 (shī bài shì shénme) ? » attend une vraie réponse + leçon.

- Stratégie : 目标 (mù biāo) → 计划 (jìhuà) → 步骤 (bùzhòu) → 风险 (fēngxiǎn) → 备选方案 (bèi xuǎn fāng'àn) .
- Vocab plan : 实施 (shíshī) / 执行 (zhíxíng) / 评估 (píng gū) / 调整 (tiáozhěng) .
- Anticiper : 关于风险 (guānyú fēngxiǎn) ，我们考虑过 (wǒmen kǎolǜ guò) X.

TOUJOURS présenter un plan B en réunion chinoise.`,
    objectives: [`Raconter un échec + leçon (signe de 成熟)`, `Préparer 你最大的失败是什么 en entretien`, `Présenter en 5 temps : 目标→备选方案`, `TOUJOURS prévoir un 备选方案 (plan B)`],
    flashcards: [`犯`, `教训`, `反思`, `改进`, `宝贵`, `目标`, `阶段`, `风险`, `调整`],
  },
  "cecr-b12-conversation-m7": {
    title: `Feedback pro + désaccord avec un supérieur`, titleEn: `Pro feedback + disagreement with a superior`,
    duration: 14,
    category: `conversation`,
    difficulty: `intermediate`,
    introTitle: `Feedback pro et désaccord poli avec un supérieur`,
    introContent: `Donner et recevoir du feedback en milieu professionnel chinois obéit à des codes culturels stricts.

- Donner positif : 我觉得你做得 (wǒ juéde nǐ zuò de) 很好 (hěn hǎo) ，特别是 (tèbié shì) X.
- Constructif (sandwich obligatoire) : 你有几个优点 (nǐ yǒu jǐ gè yōu diǎn) ，比如 (bǐrú) X，不过 (búguò) Y 可以再改进 (kěyǐ zài gǎijìn) .
- Recevoir : 谢谢你的 (xièxie nǐ de) 反馈 (fǎnkuì) / 我会认真考虑 (wǒ huì rènzhēn kǎolǜ) / 你能再具体一点吗 (nǐ néng zài jù tǐ yīdiǎn ma) ?

Feedback PUBLIC négatif = TABOU en culture pro chinoise — préfère 1-1 ou WeChat privé.

- Désaccord avec supérieur : 我有一个不同的 (wǒ yǒu yī gè bù tóng de) (wǒ yǒu yī gè bù tóng de) 想法 (xiǎng fǎ) ，您看一下 (nín kàn yíxià) .
- Toujours en QUESTION : 我们是不是可以考虑 (wǒmen shì bùshì kěyǐ kǎolǜ) (wǒmen shì bùshì kěyǐ kǎolǜ) X ?
- Insister sur risque, pas sur supérieur : 这个方案有一个潜在的 (zhège fāng'àn yǒu yī gè qiánzài de) (zhège fāng'àn yǒu yī gè qiánzài de) 风险 (fēngxiǎn) .
- Phrase magique : 我只是从我的 (wǒ zhǐshì cóng wǒ de) 角度提一个建议 (jiǎo dù tí yī gè jiànyì) .

Si refusé, ne pas insister à voix haute, reviens avec dossier 1-2 jours après.`,
    objectives: [`Sandwich feedback : positif + axe d'amélioration`, `Préfèrer 1-1 ou WeChat pour critique`, `Désaccord en QUESTION : 我们是不是可以…`, `Phrase magique : 我只是从我的角度提一个建议`],
    flashcards: [`反馈`, `改进`, `具体`, `评价`, `认真`, `潜在`, `风险`, `考虑`],
  },
  "cecr-b12-nuances-m1": {
    title: `刚 vs 刚才 + 马上 vs 立刻 vs 立即`, titleEn: `刚 vs 刚才 + 马上 vs 立刻 vs 立即`,
    duration: 14,
    category: `vocabulary`,
    difficulty: `intermediate`,
    introTitle: `刚/刚才/马上/立刻/立即 : le temps qui se précise`,
    introContent: `Cinq adverbes temporels souvent confondus — deux pour le passé récent, trois pour l'immédiat.

**刚 vs 刚才 :**

- **刚** (gāng) = tout juste (adverbe, **avant le verbe**) : 我刚到 (wǒ gāng dào) = je viens d'arriver.
- **刚才** (gāngcái) = il y a peu (nom de temps, **position libre**) : 刚才你说什么 (gāngcái nǐ shuō shénme) ?
- Mnémotechnique : 刚 = tout juste maintenant ; 刚才 = il y a quelques minutes.

**马上/立刻/立即 — du plus souple au plus formel :**

- **马上** (mǎshàng) = oral standard, élastique (~5-15 min en Chine).
- **立刻** (lìkè) = un peu plus sérieux (1-2 min).
- **立即** (lìjí) = formel, ordre impératif.

**Note culturelle :** 马上来 d'un Chinois peut signifier... 15 minutes. Anticipe.`,
    objectives: [`Distinguer 刚 (adverbe) vs 刚才 (nom)`, `Comprendre 马上 = ~10 min (élastique)`, `Réserver 立即 aux ordres formels`, `Position : 刚 avant verbe, 刚才 autonome`],
    flashcards: [`刚`, `刚才`, `回家`, `马上`, `立刻`, `立即`, `处理`, `停止`],
  },
  "cecr-b12-nuances-m2": {
    title: `完成 vs 结束 vs 完毕 + 终于 vs 最后 vs 到底`, titleEn: `完成 vs 结束 vs 完毕 + 终于 vs 最后 vs 到底`,
    duration: 14,
    category: `vocabulary`,
    difficulty: `intermediate`,
    introTitle: `完成/结束/完毕 et 终于/最后/到底`,
    introContent: `完成 (wánchéng) , 结束 (jiéshù) et 完毕 (wánbì) signifient tous « finir », mais leur emploi dépend du type de fin et du registre.

- 完成 (wánchéng) = achever (un OBJECTIF, résultat) : 我完成了 (wǒ wánchéng le) 任务 (rèn wù) .
- 结束 (jiéshù) = se terminer (un ÉVÉNEMENT, neutre) : 会议结束了 (huìyì jiéshù le) .
- 完毕 (wánbì) = achevé (FORMEL, militaire/admin) : 报告完毕 (bàogào wánbì) .
- Erreur : 会议完成了 (huìyì wánchéng le) ✗ → 结束 (jiéshù) .
- 终于 (zhōngyú) = ENFIN (soulagement émotionnel +) : 我终于到了 (wǒ zhōngyú dào le) .
- 最后 (zuìhòu) = à la fin (NEUTRE, séquence).
- 到底 (dàodǐ) = en fin de compte / mais enfin (insistance, parfois agacement) : 你到底来不来 (nǐ dàodǐ lái bù lái) ?

Évite 到底 (dàodǐ) avec un supérieur — 到底 (dàodǐ) + question = impatience.`,
    objectives: [`Distinguer 完成 (résultat) / 结束 (événement) / 完毕 (formel)`, `Distinguer 终于 (émotion+) / 最后 (neutre) / 到底 (insistance)`, `Éviter 到底 + question avec supérieur`, `Choisir le bon verbe pour « finir » selon contexte`],
    flashcards: [`完成`, `结束`, `完毕`, `任务`, `终于`, `最后`, `到底`, `意义`],
  },
  "cecr-b12-nuances-m3": {
    title: `难道 vs 不会吧 + 不一定 vs 不见得 vs 未必`, titleEn: `难道 vs 不会吧 + 不一定 vs 不见得 vs 未必`,
    duration: 14,
    category: `vocabulary`,
    difficulty: `intermediate`,
    introTitle: `难道 et 不一定 : incrédulité et nuance`,
    introContent: `Deux ensembles pour exprimer doute et nuance.

**Incrédulité — du plus neutre au plus fort :**

- 真的吗 (zhēn de ma) ? = vraiment ? (neutre).
- **不会吧** (bù huì ba) = pas possible ! (oral familier).
- **难道** (nándào) = ne me dis pas que... (rhétorique fort) : 难道你不知道 (nándào nǐ bù zhīdào) ?
- 怎么可能 (zěnme kěnéng) = comment c'est possible ?

**Hiérarchie :** 真的吗 < 不会吧 < 难道 < 怎么可能.

**Négation atténuée — « pas forcément » :**

- **不一定** (bù yídìng) = pas forcément (neutre, universel).
- **不见得** (bújiàndé) = pas sûr du tout (ton sceptique).
- **未必** (wèibì) = peut-être pas (formel/écrit).

**Règle pratique :** avec un supérieur, choisis 不一定. À l'écrit, alterne 不一定/未必.`,
    objectives: [`Choisir 难道 (fort) vs 不会吧 (oral)`, `Distinguer 不一定 / 不见得 / 未必 par registre`, `Préférer 不一定 (neutre) avec supérieur`, `Reconnaître 难道 = drama chinois`],
    flashcards: [`难道`, `不会吧`, `不可能`, `怎么可能`, `不一定`, `不见得`, `未必`],
  },
  "cecr-b12-nuances-m4": {
    title: `趁 vs 利用 vs 借 + 便/即 (formels écrits)`, titleEn: `趁 vs 利用 vs 借 + 便/即 (formal written)`,
    duration: 14,
    category: `vocabulary`,
    difficulty: `intermediate`,
    introTitle: `趁/利用/借 et 便/即 en contexte`,
    introContent: `Trois verbes pour « profiter de » — chacun a une valeur affective différente.

- **趁** (chèn) = profiter d'une opportunité **positive** (oral) : 趁热吃 (chèn rè chī), 趁年轻多去看看世界 (chèn niánqīng duō qù kàn kàn shìjiè).
- **利用** (lìyòng) = utiliser (neutre pour ressources, négatif pour personnes) : 利用资源 (lìyòng zīyuán) ✓, 利用别人 (lìyòng biérén) = exploiter.
- **借** (jiè) = saisir l'occasion (formel) : 借这个机会 (jiè zhège jīhuì) = profiter de cette occasion.

**Connecteurs formels à reconnaître à l'écrit :**

- **便** (biàn) = alors / ainsi (synonyme formel de 就) — jamais à l'oral.
- **即** (jí) = c'est-à-dire / immédiatement (selon contexte) — jamais à l'oral.
- 即所谓 (jí suǒwèi) X = c'est ce qu'on appelle X.

Stratégie B1.2 : **reconnaître** 便/即 pour lire ; ne pas les **produire** à l'oral.`,
    objectives: [`Distinguer 趁 (positif) vs 利用 (neutre/négatif) vs 借 (formel)`, `Phrase chaude : 趁年轻多去看看世界`, `Reconnaître 便 / 即 à l'écrit pro/journalistique`, `Ne JAMAIS dire 即 à l'oral spontané`],
    flashcards: [`趁`, `利用`, `借`, `机会`, `资源`, `便`, `即`, `所谓`],
  },
  "cecr-b12-nuances-m5": {
    title: `把 vs 将 + 的 / 地 / 得 (3 particules « de »)`, titleEn: `把 vs 将 + 的 / 地 / 得 (3 «de» particles)`,
    duration: 14,
    category: `vocabulary`,
    difficulty: `intermediate`,
    introTitle: `把 vs 将 et les trois 的/地/得`,
    introContent: `Deux sujets en un : le disposal 把/将, et les trois particules 的/地/得.

**把 vs 将 :**

- **把** (bǎ) = disposal standard, oral et écrit : 把书放在桌上 (bǎ shū fàng zài zhuō shàng).
- **将** (jiāng) = même fonction mais **formel** (admin, presse, juridique) : 将文件交给经理 (jiāng wénjiàn jiāo gěi jīnglǐ).
- 将 a aussi un sens de futur formel : 将来 (jiānglái) / 即将 (jí jiāng).
- **Jamais 将 à l'oral spontané.**

**Les trois 的/地/得 :**

- **的** + nom : 漂亮的衣服 (piàoliang de yīfu) = beau vêtement.
- **地** + verbe : 慢慢地走 (mànmàn de zǒu) = marcher lentement.
- **得** + complément : 走得很快 (zǒu de hěn kuài) = marcher vite.

**Règle d'or :** 的 = chose / 地 = manière / 得 = résultat.`,
    objectives: [`Construire 把 + obj + verbe + résultat`, `Reconnaître 将 à l'écrit pro`, `Distinguer 的 / 地 / 得 (3 « de »)`, `Mémoriser : 的 nom / 地 manière / 得 résultat`],
    flashcards: [`把`, `将`, `放`, `交`, `文件`, `的`, `地`, `得`],
  },
  "cecr-b12-nuances-m6": {
    title: `当 vs 在…的时候 vs 时 + 一旦 vs 如果`, titleEn: `当 vs 在…的时候 vs 时 + 一旦 vs 如果`,
    duration: 14,
    category: `vocabulary`,
    difficulty: `intermediate`,
    introTitle: `在…的时候 / 当…时 et si/quand selon le registre`,
    introContent: `Deux paires à maîtriser : « quand » selon le registre, et « si » selon le degré de certitude.

**Quand :**

- **在…的时候** = oral standard et naturel : 在我学中文的时候 (zài wǒ xué Zhōngwén de shíhou).
- **当…时** = formel, écrit : 当我看到他时 (dāng wǒ kàn dào tā shí).
- **当…的时候** = combo universel (oral et écrit).
- **Jamais** 时 (shí) seul à l'oral.
- **在…期间** = pendant (pour des **périodes**) : 在会议期间 (zài huìyì qījiān).

**Si — du plus souple au plus grave :**

- **要是** (yàoshi) = oral familier.
- **如果** (rúguǒ) = standard.
- **假如** (jiǎrú) = formel.
- **一旦** (yídàn) = dès que / si jamais (irréversible).
- **万一** (wànyī) = au cas où — très utile pour des précautions polies.`,
    objectives: [`Choisir 在…的时候 (oral) vs 当…时 (écrit)`, `Construire 在…期间 pour PÉRIODE`, `Distinguer 如果 (neutre) / 一旦 (irréversible)`, `Utiliser 万一 pour précautions`],
    flashcards: [`当`, `时候`, `时`, `期间`, `一旦`, `如果`, `假如`, `要是`, `万一`],
  },
  "cecr-b12-nuances-m7": {
    title: `每…都 + 所有 vs 一切 vs 全部`, titleEn: `每…都 + 所有 vs 一切 vs 全部`,
    duration: 14,
    category: `vocabulary`,
    difficulty: `intermediate`,
    introTitle: `每…都 et 所有/一切/全部 : dire « tout »`,
    introContent: `Quatre façons de dire « tout » — chacune a son contexte.

**每 + 都 (obligatoire) = chaque :**

- 每个人都喜欢 (měi gèrén dōu xǐhuan) = tout le monde aime.
- 每天我都去跑步 (měitiān wǒ dōu qù pǎobù).
- **Ne jamais oublier 都 après 每.**

**所有 = tous (neutre, le plus universel) :**

- 所有人都来了 (suǒyǒu rén dōu lái le) = tout le monde est venu.

**一切 = tout (abstrait, émotionnel, littéraire) :**

- 我愿意为你做一切 (wǒ yuànyì wèi nǐ zuò yīqiè) = je ferais tout pour toi.
- **Piège :** 一切人 ✗ — pour les personnes, utilise 所有人.

**全部 = la totalité (neutre, quantifiable) :**

- 全部完成了 (quánbù wánchéng le) = tout est terminé.

**Hiérarchie d'universalité :** 每 < 任何 < 凡是 (formel écrit).`,
    objectives: [`Coupler systématiquement 每 + 都`, `Distinguer 所有 (énumération) / 一切 (abstrait) / 全部 (ensemble)`, `Reconnaître 我愿意为你做一切 (déclaration)`, `Hiérarchiser 每 / 任何 / 凡是`],
    flashcards: [`每`, `任何`, `凡是`, `所有`, `一切`, `全部`, `都`, `愿意`],
  },
  "cecr-b21-grammar-lian-m1": {
    title: `连 + nom + 也/都 (même X)`, titleEn: `连 + noun + 也/都 (even X)`,
    duration: 12,
    category: `grammar`,
    difficulty: `advanced`,
    introTitle: `连…也/都 : même X entre dans la règle`,
    introContent: `连 (lián)…也/都 met en relief un élément **inattendu ou extrême** pour amplifier une affirmation ou une négation.

**Structure :** 连 + nom (extrême/surprenant) + 也/都 + verbe

- 连小孩也知道 (lián xiǎohái yě zhīdào) = même un enfant sait.
- 也 et 都 sont interchangeables dans cette structure.

**Au négatif** — pour maximaliser l'absence :

- 他连一句话也没说 (tā lián yī jù huà yě méi shuō) = il n'a pas dit **un seul** mot.
- Sans 连 : 他没说话 = neutre. Avec 连 : on souligne l'étendue totale.

**Choisir un nom « extrême »** renforce l'effet : 连小孩 (même un enfant), 连一分钱 (même un centime), 连名字 (même le prénom).`,
    objectives: [`Construire 连 + N + 也/都 + V`, `Utiliser 连 au négatif pour maximaliser`, `Distinguer avec/sans 连`, `Choisir un nom « extrême » adapté`],
    flashcards: [`连`, `也`, `都`, `一句话`, `小孩`, `知道`],
  },
  "cecr-b21-grammar-lian-m2": {
    title: `连 + verbe + 也/都 + 不/没 + même verbe`, titleEn: `连 + verb + 也/都 + 不/没 + same verb`,
    duration: 12,
    category: `grammar`,
    difficulty: `advanced`,
    introTitle: `连 + V + 也没 + V : « même pas fait »`,
    introContent: `Variante verbale : le verbe est **répété** de part et d'autre de 也/都 pour dire « même pas faire X ».

**Structure :** 连 + V + 也/都 + 没 + V

- 他连看也没看一眼 (tā lián kàn yě méi kàn yī yǎn) = il n'a même pas jeté un regard.
- 我连想也没想过 (wǒ lián xiǎng yě méi xiǎng guò) = je n'y ai même pas pensé.

**Verbes courants avec cette structure :** 看 (kàn), 想 (xiǎng), 说 (shuō), 听 (tīng), 试 (shì).

Cette structure est **idiomatique** — on ne peut pas la traduire mot à mot. En français : « même pas » ou « pas une seule fois ». Très fréquente à l'oral pour l'indignation ou l'étonnement.`,
    objectives: [`Former 连 + V + 也 + 没 + V`, `Utiliser avec 看/想/说/听`, `Exprimer indignation/étonnement`, `Comprendre la répétition du verbe`],
    flashcards: [`连`, `一眼`, `想`, `看`, `过`, `没`],
  },
  "cecr-b21-grammar-lian-m3": {
    title: `除了…以外 + 也/还/都 (à part…)`, titleEn: `除了…以外 + 也/还/都 (apart from…)`,
    duration: 12,
    category: `grammar`,
    difficulty: `advanced`,
    introTitle: `除了…以外 + 也/还 ou 都 : tout dépend de la suite`,
    introContent: `除了 (chúle) X 以外 (yǐwài) signifie « à part X », mais le sens final dépend entièrement de la conjonction qui suit.

- Avec 还 (hái) /也 (yě) : 除了中文以外 (chúle Zhōngwén yǐwài) ，我也会英文 (wǒ yě huì yīngwén) (je parle AUSSI anglais → les deux).
- Avec 都 (dōu) + négation : 除了小王以外 (chúle xiǎo wáng yǐwài) ，大家都来了 (dàjiā dōu lái le) (Xiao Wang est exclu, les autres sont venus).

以外 (yǐwài) est souvent omissible mais garder la structure complète est plus sûr au début. Piège : confondre inclusion et exclusion donne exactement l'opposé du sens voulu.`,
    objectives: [`Utiliser 除了…以外 + 也/还 (inclusion)`, `Utiliser 除了…以外 + 都 (exclusion)`, `Choisir selon le sens voulu`, `Construire des phrases complètes`],
    flashcards: [`除了`, `以外`, `还`, `都`, `大家`, `英文`],
  },
  "cecr-b21-grammar-conj-m1": {
    title: `不但…而且 — « non seulement…mais aussi »`, titleEn: `不但…而且 — «not only…but also»`,
    duration: 12,
    category: `grammar`,
    difficulty: `advanced`,
    introTitle: `不但…而且 : « non seulement… mais aussi »`,
    introContent: `不但 (búdàn)…而且 (érqiě) construit une **gradation positive** — le deuxième élément est encore meilleur ou plus fort.

- 他不但聪明，而且努力 (tā búdàn cōngmíng, érqiě nǔlì) = il est non seulement intelligent, mais aussi travailleur.

**Position du sujet :**

- Même sujet → place-le **avant** 不但 : 他不但聪明而且努力.
- Sujets différents → chacun après son connecteur : 不但他会来，而且他妈妈也会来 (búdàn tā huì lái, érqiě tā māma yě huì lái).

**Variantes par registre :**

- 不仅 (bùjǐn) = 不但 (plus écrit).
- 而且/并且/也/还 dans la 2e partie — crescendo de formalité.

**Piège :** ne pas mettre 也 deux fois (redondance).`,
    objectives: [`Construire 不但 A 而且 B`, `Placer le sujet correctement`, `Utiliser 不仅/并且 comme variantes`, `Éviter la redondance avec 也`],
    flashcards: [`不但`, `而且`, `不仅`, `并且`, `聪明`, `努力`],
  },
  "cecr-b21-grammar-conj-m2": {
    title: `无论…都 — « peu importe… »`, titleEn: `无论…都 — «no matter…»`,
    duration: 12,
    category: `grammar`,
    difficulty: `advanced`,
    introTitle: `无论/不管…都 : peu importe X, Y`,
    introContent: `无论 (wúlùn) / 不管 (bùguǎn) + interrogation + **都/也** = « peu importe X, Y ».

**Règle :** une **question intégrée** doit suivre — mot interrogatif ou alternative A 还是 B.

- 无论谁来，我都欢迎 (wúlùn shéi lái, wǒ dōu huānyíng) = peu importe qui vient.
- 不管你说什么，他都不听 (bùguǎn nǐ shuō shénme, tā dōu bù tīng) = quoi que tu dises.
- 无论天气好不好，我们都去 (wúlùn tiānqì hǎo bùhǎo, wǒmen dōu qù) = qu'il pleuve ou non.

**都 (dōu) dans la 2e partie est obligatoire.**

**Registre :** 无论 = écrit/formel ; 不管 = oral standard.

**Piège :** sans interrogation ni alternative, 无论 est grammaticalement incorrect.`,
    objectives: [`Construire 无论/不管 + 谁/什么/哪/怎么 + 都`, `Utiliser A 还是 B comme alternative`, `Choisir 无论 (écrit) vs 不管 (oral)`, `Ne jamais oublier 都/也`],
    flashcards: [`无论`, `不管`, `都`, `也`, `欢迎`, `天气`],
  },
  "cecr-b21-grammar-conj-m3": {
    title: `即使…也 — « même si… »`, titleEn: `即使…也 — «even if…»`,
    duration: 12,
    category: `grammar`,
    difficulty: `advanced`,
    introTitle: `即使…也 : « même si » pour l'hypothèse`,
    introContent: `即使 (jíshǐ)…也 (yě) introduit une **concession hypothétique** : l'événement mentionné peut ne pas se produire.

- 即使下雨，我也去 (jíshǐ xià yǔ, wǒ yě qù) = même s'il pleut, j'y vais.

**Distinction cruciale avec 虽然 :**

- 虽然下雨了，我还是去了 = bien qu'il ait plu (fait **réel**).
- 即使下雨，我也去 = même s'il pleut (event **hypothétique**).

**Variantes par registre :**

- 就算 (jiù suàn) = oral familier.
- 哪怕 (nǎpà) = cas extrême, ton émotionnel.
- 即便 (jíbiàn) = formel/écrit.

**也 dans la 2e partie est obligatoire** — c'est l'erreur n°1 des apprenants.`,
    objectives: [`Construire 即使 A 也 B`, `Distinguer 即使 vs 虽然`, `Utiliser 就算 à l'oral`, `Utiliser 哪怕 pour cas extrême`],
    flashcards: [`即使`, `就算`, `哪怕`, `也`, `下雨`, `虽然`],
  },
  "cecr-b21-grammar-conj-m4": {
    title: `虽然 vs 尽管 — nuances de concession`, titleEn: `虽然 vs 尽管 — nuances of concession`,
    duration: 12,
    category: `grammar`,
    difficulty: `advanced`,
    introTitle: `虽然 vs 尽管 : nuance de l'effort et du ton`,
    introContent: `虽然 (suīrán) et 尽管 (jǐnguǎn) signifient tous deux « bien que » MAIS : 虽然 (suīrán) introduit un fait accepté de façon neutre ，但是我们还是去了 (dànshì wǒmen háishi qù le) (dànshì wǒmen háishi qù le) — « bien qu'il pleuve, nous sommes allés »). 尽管 (jǐnguǎn) a une nuance de concession appuyée, souvent avec idée d'effort malgré l'obstacle (尽管很累，他还是坚持 — « bien qu'épuisé, il persévère »). 尽管 (jǐnguǎn) peut aussi signifier « n'hésitez pas à » dans 你尽管说 (nǐ jǐnguǎn shuō) (« parlez sans retenue »). Les deux s'accompagnent de 但是 (dànshì) /可是 (kěshì) /然而 (rán ér) /还是 (háishi) dans la seconde partie.

Piège : 尽管 (jǐnguǎn) seul (sans seconde clause) = « n'hésitez pas », sens totalement différent.`,
    objectives: [`Utiliser 虽然…但是 neutre`, `Utiliser 尽管…还是 avec effort`, `Distinguer 尽管 conj. vs 尽管 adv.`, `Ajouter 但是/可是/然而`],
    flashcards: [`虽然`, `尽管`, `但是`, `然而`, `还是`, `坚持`],
  },
  "cecr-b21-tech-m1": {
    title: `Informatique et internet`, titleEn: `IT and internet`,
    duration: 12,
    category: `vocabulary`,
    difficulty: `advanced`,
    introTitle: `Vocabulaire informatique et internet`,
    introContent: `Matériel : 电脑 (diànnǎo) , 手机 (shǒujī) , 屏幕 (píng mù) , 键盘 (jiàn pán) , 鼠标 (shǔbiāo) .

- Internet : 网络 (wǎngluò) /网 (wǎng) , 网站 (wǎngzhàn) , 网页 (wǎng yè) , 浏览器 (liú lǎn qì) , 密码 (mì mǎ) , 账号 (zhànghào) .
- Actions : 上网 (shàngwǎng), 下载 (xiàzài) , 登录 (dēnglù) , 注册 (zhùcè).

Note : en Chine, 微信 (wēi xìn) remplace la plupart des services occidentaux — messagerie, paiement, ID, mini-programmes.`,
    objectives: [`Nommer matériel et réseau`, `Utiliser 上网/下载/登录/注册`, `Comprendre place de WeChat`, `Prononcer les néologismes`],
    flashcards: [`电脑`, `手机`, `网络`, `浏览器`, `密码`, `下载`, `登录`, `注册`, `微信`],
  },
  "cecr-b21-tech-m2": {
    title: `Intelligence artificielle et données`, titleEn: `Artificial intelligence and data`,
    duration: 12,
    category: `vocabulary`,
    difficulty: `advanced`,
    introTitle: `人工智能 : IA et données en Chine`,
    introContent: `人工智能 (réngōng zhìnéng) — littéralement « intelligence fabriquée par l'homme ». La Chine développe ses propres grands modèles : Wenxin de Baidu, 通义千问 (tōng yì qiān wèn, Qwen d'Alibaba), DeepSeek.

**Vocabulaire clé :**

- 算法 (suànfǎ) = algorithme.
- 数据 (shùjù) = données.
- 大数据 (dà shùjù) = Big Data.
- 云/云计算 (yún/yún jìsuàn) = cloud / cloud computing.

**Enjeux de société :**

- 隐私 (yǐnsī) = vie privée.
- 监控 (jiānkòng) = surveillance.
- 人脸识别 (rén liǎn shíbié) = reconnaissance faciale — omniprésente dans les villes chinoises, source de vifs débats.`,
    objectives: [`Décrypter 人工智能/算法/数据`, `Nommer les LLM chinois`, `Débattre 隐私/监控`, `Utiliser 大数据/云计算`],
    flashcards: [`人工智能`, `算法`, `数据`, `大数据`, `云`, `隐私`, `监控`, `人脸识别`],
  },
  "cecr-b21-tech-m3": {
    title: `E-commerce et paiement mobile`, titleEn: `E-commerce and mobile payment`,
    duration: 12,
    category: `vocabulary`,
    difficulty: `advanced`,
    introTitle: `支付宝/微信支付 : la Chine sans cash`,
    introContent: `La Chine a quasi éliminé les espèces via 支付宝 (zhī fù bǎo) et 微信支付 (wēi xìn zhī fù) .

- Actions : 扫码 (sǎo mǎ) (sǎomǎ, scanner un QR code), 付款 (fù kuǎn) , 转账 (zhuǎn zhàng) 
- Plateformes : 淘宝 (táo bǎo) (Táobǎo, Taobao, le « eBay chinois »), 京东 (jīng dōng) , 拼多多 (pīn duō duō) 
- Livraison ultra-rapide : 快递 (kuàidì) , 外卖 (wàimài) (wàimài, livraison de repas — 美 团 et 饿了 么 dominent)
- Mots-clés : 双十一 (shuāng shí yī) (Shuāng Shíyī, « Double 11 », fête des célibataires = plus grande journée d'achats du monde)`,
    objectives: [`Utiliser 扫码/付款/转账`, `Connaître 淘宝/京东/拼多多`, `Commander via 外卖`, `Comprendre 双十一`],
    flashcards: [`支付宝`, `微信支付`, `扫码`, `淘宝`, `京东`, `快递`, `外卖`, `双十一`],
  },
  "cecr-b21-tech-m4": {
    title: `Réseau 5G et objets connectés`, titleEn: `5G and IoT`,
    duration: 12,
    category: `vocabulary`,
    difficulty: `advanced`,
    introTitle: `5G et 共享 : l'infrastructure connectée`,
    introContent: `La Chine a déployé massivement la 5G avant l'Occident. Une tension stratégique existe autour de 华为 (huá wèi) , leader mondial de la 5G.

- Termes : 5G网络 (wǎngluò) (wǔjí wǎngluò, réseau 5G), 物联网 (wù lián wǎng) (wùliánwǎng, IoT litt. « internet des objets »), 智慧城市 (zhìhuì chéngshì) 
- Objets connectés : 智能家居 (zhìnéng jiā jū) , 智能音箱爱 (zhìnéng yīn xiāng ài) de Xiaomi ou 天猫精灵 (tiān māo jīng líng) d'Alibaba)
- Mobilité : 共享 (gòngxiǎng) — 共享单车 (gòngxiǎng dān chē) (vélos en libre-service type 美 团单车 ), 共享充电宝 (gòngxiǎng chōngdiàn bǎo) (gòngxiǎng chōngdiàn bǎo)`,
    objectives: [`Parler de 5G/物联网/智慧城市`, `Décrire 智能家居/智能音箱`, `Utiliser 共享 dans l'économie`, `Comprendre tension Huawei`],
    flashcards: [`5G网络`, `物联网`, `智慧城市`, `智能家居`, `共享`, `华为`],
  },
  "cecr-b21-env-m1": {
    title: `Pollution et pollution de l'air`, titleEn: `Pollution and air pollution`,
    duration: 12,
    category: `vocabulary`,
    difficulty: `advanced`,
    introTitle: `雾霾 et pollution : le combat de la Chine`,
    introContent: `Les années 2013-2015, le taux AQI de Pékin dépassait régulièrement 500 — soit 20 fois le seuil OMS. La 雾霾 (wùmái, smog brun) était visible depuis l'espace.

**Vocabulaire pollution :**

- 污染 (wūrǎn) = pollution.
- 空气污染 (kōngqì wūrǎn) = pollution de l'air.
- 雾霾 (wùmái) = smog, brume polluante.
- 空气质量 (kōngqì zhìliàng) = qualité de l'air.
- PM2.5 = indicateur universel.

**Réponses individuelles :** 口罩 (kǒuzhào), 空气净化器 (kōngqì jìnghuà qì).

**Politiques nationales :** 环保 (huánbǎo) = protection environnementale ; 减排 (jiǎnpái) = réduction des émissions. La Chine est aujourd'hui **n°1 mondial** du solaire et de l'éolien.`,
    objectives: [`Parler de 污染/雾霾/PM2.5`, `Décrire 空气质量`, `Nommer 口罩/空气净化器`, `Utiliser 环保/减排`],
    flashcards: [`污染`, `空气污染`, `雾霾`, `空气质量`, `口罩`, `环保`, `减排`, `太阳能`],
  },
  "cecr-b21-env-m2": {
    title: `Changement climatique`, titleEn: `Climate change`,
    duration: 12,
    category: `vocabulary`,
    difficulty: `advanced`,
    introTitle: `气候变化 : objectifs 2030 et 2060`,
    introContent: `气候变化 (qì hòu biànhuà) , 全球变暖 (quán qiú biàn nuǎn) .

- Causes : 温室气体 (wēnshì qìtǐ) (wēnshì qìtǐ, gaz à effet de serre), 二氧化碳 (èryǎnghuàtàn) (èryǎnghuàtàn, CO2)

Conséquences : 冰川融化 (bīng chuān rónghuà) , 海平面上升 (hǎi píngmiàn shàng shēng) , 极端天气 (jí duān tiānqì) . Objectif chinois : 碳达峰 (tàn dá fēng) d'ici 2030 et 碳中和 (tàn zhōng hé) d'ici 2060 — annoncé par Xi Jinping en 2020.`,
    objectives: [`Utiliser 气候变化/全球变暖`, `Citer 温室气体/二氧化碳`, `Décrire les conséquences`, `Connaître 碳达峰/碳中和 2030/2060`],
    flashcards: [`气候变化`, `全球变暖`, `温室气体`, `二氧化碳`, `极端天气`, `碳中和`],
  },
  "cecr-b21-env-m3": {
    title: `Tri des déchets et écologie urbaine`, titleEn: `Waste sorting and urban ecology`,
    duration: 12,
    category: `vocabulary`,
    difficulty: `advanced`,
    introTitle: `垃圾分类 : tri des déchets à la chinoise`,
    introContent: `En juillet 2019, Shanghai a imposé le 垃圾分类 (lājī fēnlèi) strict, du jamais vu en Chine. Amendes pour erreurs.

- Quatre catégories : 可回收物 (kě huí shōu wù) , 有害垃圾 (yǒu hài lājī) , 湿垃圾 (shī lājī) /厨余垃圾 (chú yú lājī) (shī lājī, déchets humides/de cuisine), 干垃圾 (gàn lājī) /其他垃圾 (qítā lājī) 
- Vocabulaire utile : 回收 (huí shōu) , 环保袋 (huánbǎo dài) , 一次性 (yícìxìng) 

Débat : sacs plastiques 塑料袋 (sù liào dài) , toujours omniprésents dans les petits commerces.`,
    objectives: [`Trier en 4 catégories chinoises`, `Utiliser 可回收/有害/湿/干`, `Comprendre 2019 Shanghai`, `Dire 一次性/环保袋`],
    flashcards: [`垃圾分类`, `可回收物`, `有害垃圾`, `回收`, `一次性`, `塑料袋`],
  },
  "cecr-b21-economics-m1": {
    title: `Économie générale : 经济/通货膨胀`, titleEn: `General economy: 经济/通货膨胀`,
    duration: 12,
    category: `vocabulary`,
    difficulty: `advanced`,
    introTitle: `经济/通货膨胀/股市 : macro en chinois`,
    introContent: `经济 (jīngjì) , 经济增长 (jīngjì zēng cháng) , 经济危机 (jīngjì wēijī) . Indicateurs : GDP → 国内生产总值 (guó nèi shēng chǎn zǒng zhí) ou l'abréviation GDP est très utilisée. 通货膨胀 (tōnghuò péngzhàng) , 通货紧缩 (tōng huò jǐnsuō) .

- Marché : 市场 (shì chǎng) , 股市 (gǔ shì) , 股票 (gǔ piào) 
- Banques : 银行 (yínháng) , 利率 (lìlǜ) , 贷款 (dàikuǎn) 

La Chine a connu une croissance à deux chiffres 1990-2010, puis un ralentissement structurel.`,
    objectives: [`Utiliser 经济/增长/危机`, `Maîtriser 通货膨胀/通货紧缩`, `Parler de 股市/股票`, `Décrire les banques`],
    flashcards: [`经济`, `经济增长`, `通货膨胀`, `股市`, `股票`, `银行`, `贷款`],
  },
  "cecr-b21-economics-m2": {
    title: `Entrepreneuriat et start-up`, titleEn: `Entrepreneurship and start-ups`,
    duration: 12,
    category: `vocabulary`,
    difficulty: `advanced`,
    introTitle: `创业 : start-up et licornes chinoises`,
    introContent: `创业 (chuàngyè) (chuàngyè, créer une entreprise, entreprendre), 创业者 (chuàngyè zhě) , 创始人 (chuàng shǐ rén) , 企业家 (qǐ yè jiā) .

- Financement : 投资 (tóuzī) , 风险投资 (fēngxiǎn tóuzī) , 融资 (róngzī) , 估值 (gū zhí) , 独角兽 (dú jiǎo shòu) (dújiǎoshòu, licorne, > 1 milliard $)
- Structure : 公司 (gōngsī) , 上市 (shàngshì) (shàngshì, entrer en bourse, IPO), 股东 (gǔdōng) 
- Écosystème : 中关村 (zhōng guān cūn) (Zhōngguāncūn, « Silicon Valley de Pékin »), 深圳 (shēnzhèn)`,
    objectives: [`Utiliser 创业/创始人/企业家`, `Parler de 风险投资/融资`, `Comprendre 独角兽/估值`, `Nommer 中关村/深圳`],
    flashcards: [`创业`, `创始人`, `企业家`, `风险投资`, `融资`, `独角兽`, `上市`],
  },
  "cecr-b21-economics-m3": {
    title: `Carrière et monde du travail`, titleEn: `Career and world of work`,
    duration: 12,
    category: `vocabulary`,
    difficulty: `advanced`,
    introTitle: `996 et 关系 : la culture du travail en Chine`,
    introContent: `996 : travailler de 9h à 21h, 6 jours sur 7, célèbre/notoire dans la tech chinoise — Jack Ma l'a défendu en 2019 comme une « bénédiction ».

- Vocabulaire : 职场 (zhíchǎng) , 升职 (shēng zhí) , 加薪 (jiā xīn) , 跳槽 (tiàocáo) (tiàocáo, changer de job), 裁员 (cáiyuán) , 失业 (shīyè) 
- Rôles : 老板 (lǎo bǎn) , 同事 (tóngshì) , 下属 (xiàshǔ) 

Culture : 关系 (guānxì) reste central pour avancer, bien plus que le seul mérite.`,
    objectives: [`Comprendre 996 et son débat`, `Utiliser 升职/加薪/跳槽/裁员`, `Nommer 老板/同事/下属`, `Expliquer 关系`],
    flashcards: [`996`, `升职`, `加薪`, `跳槽`, `裁员`, `失业`, `老板`, `关系`],
  },
  "cecr-b21-conversation-m1": {
    title: `Animer une réunion : ouvrir, structurer, conclure`, titleEn: `Lead a meeting: open, structure, close`,
    duration: 14,
    category: `conversation`,
    difficulty: `advanced`,
    introTitle: `Animer une réunion : 议题, 共识, 辛苦了`,
    introContent: `Pour animer une réunion en mandarin, désigner les participants nommément — sinon par hiérarchie/timidité, peu prennent la parole.

- Ouvrir : 大家好 (dàjiā hǎo) ，我们今天的 (wǒmen jīntiān de) 会议有 (huìyì yǒu) X 个议题 (gè yìtí) 
- Recadrer : 我们先回到主题 (wǒmen xiān huí dào zhǔtí) (wǒmen xiān huí dào zhǔtí)

Conclure : 我总结一下今天的 (wǒ zǒng jié yíxià jīntiān de) yíxià jīntiān de) 讨论 (tǎo lùn) → 我们达成了 (wǒmen dáchéng le) 几个共识 (jǐ gè gòngshí) → 接下来谁负责 (jiē xiàlái shéi/shuí fùzé) (jiē xiàlái shéi/shuí fùzé) X → 谢谢大家辛苦了了 (xièxie dàjiā xīn kǔ le le) final, la réunion laisse un goût froid). Suivi WeChat dans les 24h avec 会议纪要 (huìyì jìyào) = preuve d'engagement attendue.`,
    objectives: [`Ouvrir avec 议题 + 主持`, `Désigner les participants nommément`, `Conclure par 共识 + 负责 + 辛苦了`, `Envoyer 会议纪要 dans les 24h`],
    flashcards: [`议题`, `主持`, `进度`, `总结`, `共识`, `负责`, `目标`, `辛苦了`],
  },
  "cecr-b21-conversation-m2": {
    title: `Négocier un contrat / discuter des conditions`, titleEn: `Negotiate a contract / discuss terms`,
    duration: 14,
    category: `conversation`,
    difficulty: `advanced`,
    introTitle: `Négocier : la formule magique de l'espace`,
    introContent: `La formule MAGIQUE de négo pro chinoise pour pousser un prix est plus polie que 能再便宜一点 (néng zài piányi yīdiǎn) et s'utilise ainsi : 这个价格我们觉得有点高 (zhège jiàgé wǒmen juéde yǒu diǎn gāo) (zhège jiàgé wǒmen juéde yǒu diǎn gāo)，还有没有调整的 (háiyǒu méiyǒu tiáozhěng de) (háiyǒu méiyǒu tiáozhěng de) 空间 (kōng jiān) ?

- Forcer la main : 我们的 (wǒmen de) 预算有限 (yùsuàn yǒuxiàn) / 这是我们的 (zhè shì wǒmen de) 最后报价 (zuìhòu bào jià) 
- Conclure : 我们达成协议了 (wǒmen dáchéng xiéyì le) !
- Sur les conditions : 条款 (tiáokuǎn) , 期限 (qīxiàn) , 责任 (zé rèn) , 违约 (wéiyuē) 
- PIÈGE : ne JAMAIS signer sur place
- Phrase magique : 我需要跟我的 (wǒ xūyào gēn wǒ de) 团队商量一下 (tuánduì shāng liàng yíxià) (gain de temps + sérieux)

Accepter le 1er prix = perdre du respect en culture chinoise.`,
    objectives: [`Utiliser 还有没有调整的空间`, `Lister 条款/期限/责任/违约`, `Différer avec 我需要商量一下`, `Conclure par 达成协议`],
    flashcards: [`报价`, `空间`, `预算`, `协议`, `达成`, `条款`, `期限`, `商量`],
  },
  "cecr-b21-conversation-m3": {
    title: `Status update + présenter des données`, titleEn: `Status update + present data`,
    duration: 14,
    category: `conversation`,
    difficulty: `advanced`,
    introTitle: `Status update : toujours coupler problème et solution`,
    introContent: `RÈGLE D'OR pro chinoise : remonter un problème SANS solution = perçu comme manque d'initiative. Toujours coupler un problème à une proposition de solution.

- Structure : 项目目前的 (xiàngmù mù qián de) 进度 (jìn dù) → 已完成 (yǐ wánchéng) → 正在进行 (zhèngzài jìnxíng) → 计划中 (jìhuà zhōng) 
- Si retard : 因为 (yīnwèi) X，我们可能要延期一周 (wǒmen kěnéng yào yánqī yī zhōu) (wǒmen kěnéng yào yánqī yī zhōu)
- Toujours coupler : 我有一个问题 (wǒ yǒu yī gè wèntí) ，我建议这样解决 (wǒ jiànyì zhèyàng jiějué) (wǒ jiànyì zhèyàng jiějué) X
- Données : 增长 (zēng cháng) / 下降 (xià jiàng) / 保持 (bǎochí) / 达到 (dádào) 
- Distinction CRITIQUE : 增长了 (zēng cháng le) 5% (+5%) ≠ 增长了 (zēng cháng le) 5 个百分点 (gè bǎifēndiǎn) (passé de X à X+5%)

Confondre dans un rapport pro = erreur lourde.`,
    objectives: [`Structurer un status update en 4 temps`, `Toujours coupler problème + solution`, `Quantifier avec 增长/下降/达到`, `Distinguer % vs 百分点`],
    flashcards: [`进度`, `进展`, `延期`, `解决方案`, `数据`, `增长`, `下降`, `百分点`],
  },
  "cecr-b21-conversation-m4": {
    title: `Gérer un conflit pro + jouer le médiateur`, titleEn: `Handle pro conflict + mediate`,
    duration: 14,
    category: `conversation`,
    difficulty: `advanced`,
    introTitle: `Gérer un conflit : 误会 et 我也有责任`,
    introContent: `Pour gérer un conflit, utiliser 误会 (wù huì) extériorise la cause — TOUJOURS préférer à « tu as fait une erreur ». Reconnaître ta part : 我也有责任 (wǒ yě yǒu zé rèn) (la culture chinoise apprécie le 50/50 même quand l'autre a 80% des torts).

- Reconnaître : 我感觉我们之间有一些误会 (wǒ gǎnjué wǒmen zhī jiān yǒu yìxiē wù huì) 
- S'asseoir : 我们能不能坐下来好好聊一下 (wǒmen néng bù néng zuò xiàlái hǎohǎo liáo yíxià) (wǒmen néng bù néng zuò xiàlái hǎohǎo liáo yíxià) ?
- En médiation : 我不想偏袒任何一方 (wǒ bù xiǎng piān tǎn rèn hé yī fāng) , 我们能不能找一个双方都能接受的 (wǒmen néng bù néng zhǎo yī gè shuāngfāng dōu néng jiēshòu de) (wǒmen néng bù néng zhǎo yī gè shuāngfāng dōu néng jiēshòu de) 方案 (fāng'àn) ?

Cherche un compromis OPÉRATIONNEL > « qui a raison ». La culture chinoise valorise la paix sociale > la justice de surface.`,
    objectives: [`Externaliser la cause avec 误会`, `Partager la responsabilité avec 我也有责任`, `Médier avec 不偏袒 + 双方`, `Chercher un compromis opérationnel`],
    flashcards: [`误会`, `澄清`, `责任`, `解决`, `冷静`, `偏袒`, `双方`, `接受`],
  },
  "cecr-b21-conversation-m5": {
    title: `Networking pro + maintenir une relation WeChat`, titleEn: `Pro networking + maintain a WeChat relationship`,
    duration: 14,
    category: `conversation`,
    difficulty: `advanced`,
    introTitle: `Networking WeChat : ajouter, suivre, réactiver`,
    introContent: `Le LIEN se crée dans les 48h via 1-2 messages personnalisés. Sans suivi, le contact dort à jamais. Le rituel WeChat (anniversaires, articles, vœux) maintient le 关系 (guānxì) sur 1 an.

- Aborder : 不好意思 (bù hǎoyìsi) ，可以加您一下微信吗 (kěyǐ jiā nín yíxià wēi xìn ma) (kěyǐ jiā nín yíxià wēi xìn ma) ?
- Wishes saisonniers : 中秋节快乐 (zhōng qiū jié kuàilè) / 春节快乐 (chūn jié kuàilè) (envoi à TOUTES les relations pro chinoises ; absence = note négative)
- Réactiver une relation dormante : 好久没联系 (hǎojiǔ méi liánxì) ，希望您一切都好 (xīwàng nín yī qiè dōu hǎo) 
- Demander un service : 不好意思打扰您 (bù hǎoyìsi dǎrǎo nín) ，最近有件事想麻烦您 (zuìjìn yǒu jiàn shì xiǎng máfan nín) (zuìjìn yǒu jiàn shì xiǎng máfan nín)`,
    objectives: [`Demander 加微信 poliment`, `Suivre dans les 48h après ajout`, `Envoyer wishes saisonniers (中秋/春节)`, `Réactiver avec 好久没联系`],
    flashcards: [`加微信`, `认识`, `联系`, `活动`, `名片`, `中秋节`, `春节`, `打扰`, `好久`],
  },
  "cecr-b21-conversation-m6": {
    title: `Discours formel + porter un toast`, titleEn: `Formal speech + make a toast`,
    duration: 14,
    category: `conversation`,
    difficulty: `advanced`,
    introTitle: `Discours formel : 各位领导 et 我以茶代酒`,
    introContent: `Ouvrir : 各位领导 (gèwèi lǐng dǎo) ，各位同事 (gèwèi tóngshì) ，下午好 (xiàwǔ hǎo) — hiérarchie d'adresse OBLIGATOIRE (responsables d'abord). La règle est de ne JAMAIS commencer à boire avant le toast du leader — brûler l'étape = manque de respect.

- Conclure : 我的 (wǒ de) 发言到此结束 (fāyán dào cǐ jiéshù) ，谢谢大家的 (xièxie dàjiā de) 聆听 (língtīng) + 希望今天的 (xīwàng jīntiān de) 内容对大家有所帮助 (nèi róng duì dàjiā yǒu suǒ bāngzhù) 
- Toast : 我提议大家举杯 (wǒ tíyì dàjiā jǔ bēi) ，为 (wèi) X 干杯 (gānbēi) !
- 干杯 (gānbēi) ou 随意 (suíyì) 
- Si tu ne bois pas : 我以茶代酒 (wǒ yǐ chá dài jiǔ) — formule consacrée et acceptée`,
    objectives: [`Ouvrir avec 各位 + hiérarchie`, `Conclure par 聆听 + 内容有所帮助`, `Trinquer avec 举杯 + 干杯`, `Substituer 我以茶代酒 si abstinent`],
    flashcards: [`各位`, `领导`, `分享`, `聆听`, `举杯`, `干杯`, `随意`, `合作`, `庆祝`],
  },
  "cecr-b21-conversation-m7": {
    title: `CV chinois + email pro formel`, titleEn: `Chinese CV + formal pro email`,
    duration: 14,
    category: `conversation`,
    difficulty: `advanced`,
    introTitle: `CV et email pro : 尊敬的 / 此致敬礼`,
    introContent: `La conclusion d'une lettre de motivation exige : 期待您的 (qī dāi nín de) 回复 (huífù) + 此致 (cǐ zhì) + 敬礼 (jìnglǐ) . Email pro : sujet ) court, ouverture 您好 (nín hǎo) ou 尊敬的 (zūnjìng de) X, demande avec 麻烦您 (máfan nín) , clôture FORMELLE 此致 (cǐ zhì) /敬礼 (jìnglǐ) ou 顺祝商祺 (shùn zhù shāng qí) (vœux de prospérité — TRÈS chic).

- Lettre de motiv : 尊敬的 (zūnjìng de) 招聘负责人 (zhāo pìn fùzérén) )
- Présentation : 我是 (wǒ shì) X，毕业于 (bìyè yú) X 大学 (dàxué) ，目前在 (mù qián zài) X 公司 (gōngsī) 
- CV chinois : ajoute TOUJOURS une photo (sérieuse, fond uni)
- Sans photo = incomplet (inverse du standard occidental)`,
    objectives: [`Ouvrir lettre par 尊敬的 X`, `Conclure par 此致敬礼 (OBLIGATOIRE)`, `Maîtriser 顺祝商祺 en email B2B`, `Ajouter photo au CV chinois`],
    flashcards: [`尊敬`, `招聘`, `具备`, `回复`, `此致`, `主题`, `邮件`, `麻烦`, `顺祝商祺`],
  },
  "cecr-b21-nuances-m1": {
    title: `反正 vs 无论如何 vs 不管 + 所以/因此/故`, titleEn: `反正 vs 无论如何 vs 不管 + 所以/因此/故`,
    duration: 14,
    category: `vocabulary`,
    difficulty: `advanced`,
    introTitle: `反正/无论如何 et 所以/因此/故 par registre`,
    introContent: `Deux séries à hiérarchiser : « peu importe » et « donc ».

**« Peu importe » — registre croissant :**

- **反正** (fǎnzhèng) = oral, attitude tranchante : 反正我不去 = de toute façon je n'y vais pas.
- **不管** (bùguǎn) = neutre conditionnel.
- **无论如何** (wúlùn rúhé) = formel, engagement absolu : 无论如何，我们必须完成 (wǒmen bìxū wánchéng).

**Règle pro :** évite 反正 avec un supérieur — sonne indifférent.

**« Donc » — registre croissant :**

- **所以** (suǒyǐ) = oral et écrit standard.
- **因此** (yīncǐ) = écrit formel.
- **因而** (yīn'ér) = écrit soutenu.
- **故** (gù) = littéraire, citations.

À l'oral : **所以**. À l'écrit B2.1+ : alterne 因此/因而 pour le rythme.`,
    objectives: [`Choisir 反正 vs 无论如何 selon le registre`, `Hiérarchiser 所以 → 因此 → 因而 → 故`, `Utiliser 无论如何 en pro (engagement)`, `Alterner 因此/因而 dans un essai`],
    flashcards: [`反正`, `无论如何`, `不管`, `无论`, `所以`, `因此`, `因而`, `故`],
  },
  "cecr-b21-nuances-m2": {
    title: `至于/关于/对于 + 充分/充足/足够`, titleEn: `至于/关于/对于 + 充分/充足/足够`,
    duration: 14,
    category: `vocabulary`,
    difficulty: `advanced`,
    introTitle: `关于/对于/至于 et 充分/充足/足够`,
    introContent: `关于 (guānyú) (concerne le SUJET, ouvre un thème) ≠ 对于 (duìyú) ≠ 至于 (zhìyú) (CHANGEMENT de sujet/transition). 关于这个问题 (guānyú zhège wèntí) ，我有几点想法 (wǒ yǒu jǐ diǎn xiǎng fǎ) (wǒ yǒu jǐ diǎn xiǎng fǎ) / 对于这个问题 (duìyú zhège wèntí) ，我的 (wǒ de) 态度是 (tài dù shì) … / 这是大原则 (zhè shì dà yuánzé) 。至于细节 (zhìyú xìjié) ，我们以后讨论 (wǒmen yǐhòu tǎo lùn) .

- Erreur classique : confondre 关于 (guānyú) et 对于 (duìyú) 

充分准备 (chōngfèn zhǔnbèi) ) < 充足充足 (chōngzú chōngzú) ) < 足够 (zúgòu) (oral simple — 时间足够).

- Erreur : 时间充分 (shíjiān chōngfèn) ✗ → 时间足够 (shíjiān zúgòu) ✓`,
    objectives: [`Distinguer 关于 (sujet) vs 对于 (position) vs 至于 (transition)`, `Choisir 充分 (abstrait) vs 充足 (concret) vs 足够 (oral)`, `Mémoriser collocations 充分准备/充足资金/足够时间`, `Éviter 时间充分 (faux ami)`],
    flashcards: [`关于`, `对于`, `至于`, `态度`, `原则`, `充分`, `充足`, `足够`],
  },
  "cecr-b21-nuances-m3": {
    title: `算是/算了/算上 + 就这样/就好/就行`, titleEn: `算是/算了/算上 + 就这样/就好/就行`,
    duration: 14,
    category: `vocabulary`,
    difficulty: `advanced`,
    introTitle: `算是/算了/算上 et 就这样/就行/就好`,
    introContent: `算 (suàn) a 3 vies : 算是算是不错的 (suànshì suànshì búcuò de) (suànshì suànshì búcuò de) 开始 (kāishǐ) ) ≠ 算了 (suànle) ，我自己来 (wǒ zìjǐ lái) ) ≠ 算上 (suàn shàng) .

- ATTENTION : 算了吧 (suànle ba) envers un supérieur sonne dismissif

就好 (jiù hǎo) < 就行 (jiù háng) < 就这样 (jiù zhèyàng) (point final, parfois sec).

- Ajoute 吧 (ba) pour adoucir : 就这样吧 (jiù zhèyàng ba) = OK c'est bon
- Sans 吧 (ba) , sonne brusque — particule essentielle`,
    objectives: [`Distinguer 算是/算了/算上`, `Éviter 算了吧 envers un supérieur`, `Choisir 就好 vs 就行 vs 就这样`, `Toujours adoucir avec 吧`],
    flashcards: [`算是`, `算了`, `算上`, `算`, `就这样`, `就好`, `就行`, `吧`],
  },
  "cecr-b21-nuances-m4": {
    title: `只/只是/仅仅 + 不仅/不只/不但`, titleEn: `只/只是/仅仅 + 不仅/不只/不但`,
    duration: 14,
    category: `vocabulary`,
    difficulty: `advanced`,
    introTitle: `只/只是/仅仅 et 不但/不仅/不仅仅`,
    introContent: `只 (zhī) (neutre, oral et écrit) < 只是只是问问 (zhǐshì zhǐshì wèn wèn)) < 仅仅 (jǐnjǐn) . 我只是问问 (wǒ zhǐshì wèn wèn) = phrase oral B2.1 magique qui DÉSAMORCE la pression d'une question.

- Erreur : 仅仅 (jǐnjǐn) à l'oral spontané sonne pédant

Côté « non seulement » : 不只 (bù zhī) < 不但 (búdàn) (neutre, le plus universel) < 不仅 (bùjǐn) (écrit B2.1+) < 不仅仅 (bùjǐn jǐn) . Combo formel intensif : 这不仅仅是 (zhè bùjǐn jǐn shì) X 的 (de) 问题 (wèntí) — formule rhétorique percutante en débat ou éditorial.`,
    objectives: [`Hiérarchiser 只 → 只是 → 仅仅`, `Réserver 仅仅 à l'écrit`, `Utiliser 我只是问问 pour adoucir`, `Maîtriser 不仅仅是 X 的问题 en débat`],
    flashcards: [`只`, `只是`, `仅仅`, `仅`, `不但`, `不只`, `不仅`, `不仅仅`, `而且`],
  },
  "cecr-b21-nuances-m5": {
    title: `居然/竟然/偏偏 + 难免/必然/难怪`, titleEn: `居然/竟然/偏偏 + 难免/必然/难怪`,
    duration: 14,
    category: `vocabulary`,
    difficulty: `advanced`,
    introTitle: `居然/偏偏/难怪 : surprise, malchance, évidence`,
    introContent: `Trois adverbes pour exprimer surprise et fatalité — très fréquents à l'oral.

**居然 ≈ 竟然 = « vraiment ?! » (surprise négative ou positive)**

- 他居然忘了 (tā jūrán wàng le) = il a vraiment osé oublier.
- 居然 sonne plus oral ; 竟然 sonne légèrement plus écrit.

**偏偏 = « comme par hasard » (malchance, contretemps)**

- 偏偏今天下雨 (piānpiān jīntiān xià yǔ) = il fallait qu'il pleuve exactement aujourd'hui.

**难怪 + 原来 = révélation**

- 难怪你不来，原来你病了 (nánguài nǐ bù lái, yuánlái nǐ bìng le) = pas étonnant que tu ne sois pas venu, en fait tu étais malade.

**难免 = « inévitable »** — formule de réconfort : 学语言难免会犯错 (xué yǔyán nán miǎn huì fàn cuò) = apprendre une langue implique forcément des erreurs.`,
    objectives: [`Distinguer 居然/竟然 (surprise) vs 偏偏 (malchance)`, `Réconforter avec 学 X 难免会 Y`, `Marquer la révélation avec 难怪 + 原来`, `Utiliser 必然 dans un argument formel`],
    flashcards: [`居然`, `竟然`, `偏偏`, `没想到`, `碰巧`, `难免`, `必然`, `难怪`, `原来`],
  },
  "cecr-b21-nuances-m6": {
    title: `何况/况且/再说 + 此外/另外`, titleEn: `何况/况且/再说 + 此外/另外`,
    duration: 14,
    category: `vocabulary`,
    difficulty: `advanced`,
    introTitle: `何况/况且/再说 et 此外/另外 : renchérir`,
    introContent: `再说 (zài shuō) (oral, d'ailleurs) < 况且 (kuàngqiě) (formel écrit, en plus) < 何况 (hékuàng). 何况 (hékuàng) + question rhétorique = formule très puissante : « 大学生都做不到 (dàxuéshēng dōu zuò bù dào) (dàxuéshēng dōu zuò bù dào)，何况小学生 (hékuàng xiǎoxuéshēng) ? » 另外 (lìngwài) (par ailleurs, polyvalent oral/écrit) ≠ 此外 (cǐwài) . À l'écrit B2.1+, 此外 (cǐwài) est l'outil n°1 pour ENCHAÎNER les arguments.

- Combo classique CULTURELLEMENT attendu en essai chinois : 首先 (shǒu xiān) X，其次 (qí cì) Y，此外 (cǐwài) Z，最后 (zuìhòu) W`,
    objectives: [`Hiérarchiser 再说 → 况且 → 何况`, `Utiliser 何况 + question rhétorique`, `Distinguer 另外 vs 此外 par registre`, `Structurer un essai par 首先/其次/此外/最后`],
    flashcards: [`何况`, `况且`, `再说`, `另外`, `此外`, `首先`, `其次`, `最后`],
  },
  "cecr-b21-nuances-m7": {
    title: `反而/反倒/却 + 越来越/越…越`, titleEn: `反而/反倒/却 + 越来越/越…越`,
    duration: 14,
    category: `vocabulary`,
    difficulty: `advanced`,
    introTitle: `反而/却 et 越来越/越…越 : retournement et progression`,
    introContent: `反而 (fǎn'ér) (au contraire, neutre/oral standard — INVERSE l'attente : 我以为他生气，他反而笑了 ) ≈ 反倒 (fǎndào) ≠ 却 (què) .

- 越来越 (yuè lái yuè) + adj = UNE variable progresse (天气越来越冷 (tiānqì yuè lái yuè lěng) (tiānqì yuè lái yuè lěng))
- 越 (yuè) X 越 (yuè) Y = DEUX variables augmentent ensemble (越说越生气)
- Erreur classique : mélanger les deux structures
- Variantes formelles : 日益 (rìyì) (de jour en jour, écrit) / chengyu 与日俱增 (yǔrì-jùzēng) 
- Sentence philosophique : « 越是简单的 (yuè shì jiǎndān de) 事情越是难做好 (shìqing yuè shì nán zuò hǎo) (shìqing yuè shì nán zuò hǎo) » — cite-la pour montrer ta réflexion`,
    objectives: [`Distinguer 反而/反倒 (surprise) vs 却 (contraste)`, `Construire 越来越 (1 variable)`, `Construire 越 X 越 Y (2 variables)`, `Citer 越是简单越难做好 pour la profondeur`],
    flashcards: [`反而`, `反倒`, `却`, `相反`, `答应`, `越来越`, `越…越`, `日益`, `增加`],
  },
  "cecr-b22-grammar-structure-m1": {
    title: `与其 A 不如 B — « plutôt que A, B »`, titleEn: `与其 A 不如 B — «rather than A, B»`,
    duration: 12,
    category: `grammar`,
    difficulty: `advanced`,
    introTitle: `与其…不如 : préférer B à A`,
    introContent: `与其 (yǔqí) A 不如 (bùrú) B exprime un choix préférentiel : « plutôt que A, B vaut mieux ». 与其 (yǔqí) marque l'option rejetée ; 不如 (bùrú) introduit l'option meilleure. Différence avec 比 (bǐ) : 比 (bǐ) compare objectivement B 好 (hǎo) ), 与其 (yǔqí) …不如 (bùrú) propose un choix/conseil subjectif.

- Exemple : 与其等他 (yǔqí děng tā) ，不如我们先走 (bùrú wǒmen xiān zǒu) (« plutôt que l'attendre, on ferait mieux de partir »)
- La phrase peut omettre 与其 (yǔqí) si le contexte est clair : 不如你来 (bùrú nǐ lái) (« mieux vaut que TU viennes »)
- Synonyme : 还不如 (hái bùrú) (« autant valoir »)`,
    objectives: [`Construire 与其 A 不如 B`, `Choisir 与其 vs 比`, `Omettre 与其 en contexte`, `Utiliser 还不如`],
    flashcards: [`与其`, `不如`, `等`, `先`, `还不如`],
  },
  "cecr-b22-grammar-structure-m2": {
    title: `宁可 A 也 B — « plutôt faire A que B »`, titleEn: `宁可 A 也 B — «rather do A than B»`,
    duration: 12,
    category: `grammar`,
    difficulty: `advanced`,
    introTitle: `宁可…也 : préférer même au prix d'un sacrifice`,
    introContent: `宁可 (nìngkě) A 也 (yě) B = « je préfère A même si cela signifie B ». Nuance de sacrifice/détermination : on accepte A (souvent désagréable) pour éviter B . 宁可 (nìngkě) est plus résolu que 与其 (yǔqí) …不如 (bùrú) , avec un ton de fermeté personnelle.

- Exemple : 我宁可饿着 (wǒ nìngkě è zhe) ，也不吃剩饭 (yě bù chī shèng fàn) (« je préfère avoir faim plutôt que manger des restes »)
- Variantes : 宁愿 (nìngyuàn) = 宁可 (nìngkě) 
- 宁可 (nìngkě) A 也不 (yě bù) B (forme négative après 也) insiste sur le refus
- Formule classique : 宁死也不 (níng sǐ yě bù) (« je préfère mourir plutôt que… »)`,
    objectives: [`Construire 宁可 A 也 B`, `Utiliser la forme négative 也不`, `Exprimer détermination/sacrifice`, `Distinguer 宁可 vs 与其`],
    flashcards: [`宁可`, `宁愿`, `也`, `饿`, `剩饭`],
  },
  "cecr-b22-grammar-structure-m3": {
    title: `只要…就 vs 只有…才 — conditions suffisantes vs nécessaires`, titleEn: `只要…就 vs 只有…才 — sufficient vs necessary conditions`,
    duration: 12,
    category: `grammar`,
    difficulty: `advanced`,
    introTitle: `只要…就 vs 只有…才 : suffisant vs nécessaire`,
    introContent: `Deux conditionnels aux sens **opposés** — la confusion inverse complètement le message.

**只要 A 就 B** = condition **suffisante** : il suffit de A.

- 只要你来，我就开心 (zhǐyào nǐ lái, wǒ jiù kāixīn) = il suffit que tu viennes.
- D'autres choses pourraient aussi me rendre heureux.

**只有 A 才 B** = condition **nécessaire exclusive** : sans A, B est impossible.

- 只有努力，才能成功 (zhǐyǒu nǔlì, cáinéng chénggōng) = sans travail, pas de réussite.
- Rien d'autre ne peut mener au succès.

**Mnémotechnique :**

- 就 (jiù) = dès que ça suffit (ouvert).
- 才 (cái) = seulement alors, pas avant (exclusif).

**Piège majeur :** inverser 就 et 才 change radicalement le sens.`,
    objectives: [`Différencier 只要 (suffisant) vs 只有 (nécessaire)`, `Associer 只要→就 / 只有→才`, `Construire avec 能/可以`, `Ne jamais inverser 就/才`],
    flashcards: [`只要`, `只有`, `就`, `才`, `努力`, `成功`],
  },
  "cecr-b22-grammar-structure-m4": {
    title: `既然 A，就/那 B — « puisque A »`, titleEn: `既然 A, 就/那 B — «since A»`,
    duration: 12,
    category: `grammar`,
    difficulty: `advanced`,
    introTitle: `既然…就 : « puisque c'est ainsi »`,
    introContent: `既然 (jìrán) introduit une cause DÉJÀ admise par les deux interlocuteurs : on ne la prouve plus, on en tire la conséquence. Différence avec 因为 (yīnwèi) (qui INFORME une cause nouvelle) : 既然 (jìrán) PRÉSUPPOSE. Souvent suivi de 就 (jiù) ou 那 (nà) ) .

- 既然你已经决定了 (jìrán nǐ yǐjīng juédìng le) (jìrán nǐ yǐjīng juédìng le) ，就别后悔 (jiù bié hòuhuǐ) = puisque tu as décidé, ne regrette plus
- Variante écrite 既 (jì) …又 (yòu) … = à la fois… et…`,
    objectives: [`Construire 既然 A 就/那 B`, `Distinguer 既然 vs 因为`, `Utiliser 既…又… (parallélisme)`, `Choisir 就 ou 那 selon registre`],
    flashcards: [`既然`, `决定`, `后悔`, `既`, `又`],
  },
  "cecr-b22-grammar-structure-m5": {
    title: `以 X 为 Y — « prendre X comme Y »`, titleEn: `以 X 为 Y — «take X as Y»`,
    duration: 12,
    category: `grammar`,
    difficulty: `advanced`,
    introTitle: `以…为… : structure formelle du mandarin écrit`,
    introContent: `Issu du chinois classique, 以 (yǐ) X 为 (wèi) Y est omniprésent à l'écrit B2+ — slogans, missions d'entreprise, discours formels.

**Structure :** 以 + X (ce qu'on prend) + 为 + Y (rôle/valeur)

**Collocations à mémoriser :**

- 以学生为中心 (yǐ xuéshēng wèi zhōngxīn) = centrer sur l'élève.
- 以质量为先 (yǐ zhìliàng wèi xiān) = donner la priorité à la qualité.
- 以…为主 = prendre X comme priorité principale.
- 以…为荣 = être fier de X.
- 以…为耻 = avoir honte de X.
- 以…为例 = prendre X comme exemple.

**Usage :** à l'écrit formel uniquement — jamais à l'oral spontané.`,
    objectives: [`Construire 以 X 为 Y`, `Mémoriser 以…为主/为荣/为例`, `Distinguer registre formel`, `Utiliser dans un essai`],
    flashcards: [`以`, `为`, `中心`, `为主`, `为荣`, `为例`],
  },
  "cecr-b22-grammar-structure-m6": {
    title: `不仅 A 而且 B — « non seulement A, mais B » (avancé)`, titleEn: `不仅 A 而且 B — «not only A, but B» (advanced)`,
    duration: 12,
    category: `grammar`,
    difficulty: `advanced`,
    introTitle: `不仅…而且 : version écrite de la gradation`,
    introContent: `不仅 (bùjǐn) …而且 (érqiě) … est la version plus écrite de 不但 (búdàn) …而且 (érqiě) . Le 2e élément peut prendre 还 (hái) /也 (yě) /更 (gèng) à la place de 而且 (érqiě) pour graduer.

- 这本书不仅内容深刻 (zhè běn shū bùjǐn nèi róng shēn kè) ，而且文笔优美 (érqiě wén bǐ yōuměi) = ce livre est non seulement profond mais aussi bien écrit
- Registre croissant : 不只 (bù zhī) < 不但 (búdàn) < 不仅 (bùjǐn) < 不仅仅 (bùjǐn jǐn) 
- Forme rhétorique : 这不仅仅是 (zhè bùjǐn jǐn shì) X 的 (de) 问题 (wèntí) = ce n'est pas QU'une question de X`,
    objectives: [`Construire 不仅…而且`, `Choisir registre (不但 / 不仅 / 不仅仅)`, `Graduer avec 还/也/更`, `Utiliser 不仅仅 + 是…的问题`],
    flashcards: [`不仅`, `不仅仅`, `而且`, `还`, `更`, `深刻`],
  },
  "cecr-b22-grammar-structure-m7": {
    title: `即使…也… — « même si » (concession irréelle)`, titleEn: `即使…也… — «even if» (hypothetical concession)`,
    duration: 12,
    category: `grammar`,
    difficulty: `advanced`,
    introTitle: `即使…也 : même dans le pire des cas`,
    introContent: `即使 (jíshǐ) introduit une hypothèse, souvent contraire aux faits, suivie OBLIGATOIREMENT de 也 (yě) . Différence avec 虽然 (suīrán) : 虽然 (suīrán) = fait réel, 即使 (jíshǐ) = hypothèse.

- 即使下雨 (jíshǐ xià yǔ) ，我也要去 (wǒ yě yào qù) = même s'il pleut, j'y vais
- Variantes registre : 哪怕 (nǎ pà) , 即便 (jí biàn) , 就算 (jiù suàn) 
- Erreur n°1 des francophones : oublier 也 (yě)`,
    objectives: [`Construire 即使 A 也 B`, `TOUJOURS placer 也 dans la 2e proposition`, `Distinguer 即使 vs 虽然`, `Choisir 哪怕 (émotionnel) vs 即使 (neutre)`],
    flashcards: [`即使`, `哪怕`, `就算`, `即便`, `也`, `希望`],
  },
  "cecr-b22-arts-m1": {
    title: `Littérature moderne : 鲁迅 et la nouvelle ère`, titleEn: `Modern literature: 鲁迅 and the new era`,
    duration: 12,
    category: `culture`,
    difficulty: `advanced`,
    introTitle: `鲁迅 : soigner les esprits par la littérature`,
    introContent: `鲁迅 (Lǔ Xùn, 1881-1936) — la figure tutélaire de la littérature moderne chinoise. Formé à la médecine au Japon, il renonce pour « soigner les esprits » plutôt que les corps.

**Œuvres phares :**

- 《狂人日记》(Kuángrén Rìjì, « Journal d'un fou », 1918) — premier texte majeur en **白话文** (bái huà wén, langue parlée).
- 《阿Q正传》(Ā Q Zhèngzhuàn) — satire de la « victoire spirituelle », critique de l'auto-illusion.

**Contexte historique :**

- **五四运动** (Wǔsì Yùndòng, Mouvement du 4 mai 1919) — révolution culturelle et linguistique.
- Le **白话文** remplace le **文言文** (wenyan, chinois classique) comme langue d'écriture.

Aujourd'hui, Lu Xun est enseigné dans toutes les écoles chinoises — figure d'autorité morale et littéraire.`,
    objectives: [`Connaître 鲁迅 et son rôle`, `Distinguer 白话文 vs 文言文`, `Citer 狂人日记/阿Q正传`, `Situer le 五四运动 (1919)`],
    flashcards: [`鲁迅`, `白话文`, `文言文`, `狂人日记`, `阿Q正传`, `五四运动`],
  },
  "cecr-b22-arts-m2": {
    title: `Cinéma chinois : de la 5ème génération à aujourd'hui`, titleEn: `Chinese cinema: from the 5th generation to today`,
    duration: 12,
    category: `culture`,
    difficulty: `advanced`,
    introTitle: `张艺谋/陈凯歌/贾樟柯 : trois regards sur la Chine`,
    introContent: `La 5ème génération (années 80-90) compte notamment 张艺谋 (zhāng yì móu) avec 《红高粱 (hóng gāo liáng) 》, 《大红灯笼高高挂 (dà hóng dēnglong gāo gāo guà) (dà hóng dēnglong gāo gāo guà)》, 《英雄 (yīngxióng) 》, et 陈凯歌 (chén kǎi gē) avec 《霸王别姬 (bà wáng bié jī) 》, Palme d'or 1993. Le marché chinois est aujourd'hui le premier au monde.

- 6ème génération (années 2000) : 贾樟柯 (jiǎ zhāng kē) — films réalistes sur la Chine urbaine en mutation 》, 《三峡好人 (sān xiá hǎo rén) 》)
- 导演 (dǎoyǎn) 
- 演员 (yǎn yuán) 
- 电影节 (diànyǐng jié) 
- 票房 (piàofáng)`,
    objectives: [`Distinguer 5e et 6e générations`, `Citer 张艺谋/陈凯歌/贾樟柯`, `Connaître 霸王别姬 (1993)`, `Utiliser 导演/演员/票房`],
    flashcards: [`导演`, `演员`, `电影节`, `票房`, `张艺谋`, `陈凯歌`, `贾樟柯`],
  },
  "cecr-b22-arts-m3": {
    title: `Musique populaire : de 邓丽君 à C-pop`, titleEn: `Popular music: from 邓丽君 to C-pop`,
    duration: 12,
    category: `culture`,
    difficulty: `advanced`,
    introTitle: `邓丽君, 周杰伦 et le C-pop d'aujourd'hui`,
    introContent: `邓丽君 (dèng lì jūn) (Dèng Lìjūn, Teresa Teng, 1953-1995) — voix phare des années 70-80, surnommée « le soleil du jour, Teng la nuit ». Ses chansons ont franchi le rideau de bambou : 《月亮代表我的 (yuèliang dàibiǎo wǒ de) 心 (xīn) 》(La lune représente mon cœur). 周杰伦 (zhōu jié lún) — star taïwanaise dominant les années 2000, mélange rap/jazz/éléments traditionnels. Aujourd'hui, la 华语乐坛 (huá yǔ lè tán) est dominée par la télé-réalité 选秀节目 (xuǎn xiù jiémù) et des artistes comme 华晨宇 (huá chén yǔ) , G.E.M., 邓紫棋 (dèng zǐ qí) .

- Mandopop = 国语流行 (guó yǔ liúxíng) vs Cantopop = 粤语流行 (yuè yǔ liúxíng) 
- 歌手 (gēshǒu) 
- 专辑 (zhuānjí) 
- 演唱会 (yǎn chàng huì)`,
    objectives: [`Connaître 邓丽君 et 周杰伦`, `Distinguer Mandopop vs Cantopop`, `Utiliser 歌手/专辑/演唱会`, `Comprendre 选秀节目`],
    flashcards: [`邓丽君`, `周杰伦`, `歌手`, `专辑`, `演唱会`, `选秀节目`],
  },
  "cecr-b22-arts-m4": {
    title: `Calligraphie et peinture chinoise`, titleEn: `Chinese calligraphy and painting`,
    duration: 12,
    category: `culture`,
    difficulty: `advanced`,
    introTitle: `书法 : quand l'écriture devient un art`,
    introContent: `书法 (shūfǎ) — art millénaire mêlant esthétique et spiritualité, considéré en Chine comme supérieur à la peinture.

**Les 文房四宝 (wénfáng sì bǎo, « quatre trésors du lettré ») :**

- 笔 (bǐ) = pinceau, 墨 (mò) = encre, 纸 (zhǐ) = papier, 砚 (yàn) = pierre à encre.

**Le maître absolu :** 王羲之 (Wáng Xīzhī, 303-361) = **书圣** (shūshèng, « saint de la calligraphie »).

**Cinq styles — du plus formel au plus libre :**

- 篆书 (zhuànshū) → 隶书 (lìshū) → **楷书** (kǎishū, standard) → 行书 (xíngshū) → **草书** (cǎoshū, « herbe folle »).

**Peinture associée :** 国画 (guóhuà) / 水墨画 (shuǐmòhuà) — les 山水画 (shānshuǐhuà, peintures de paysage) dominent le genre.`,
    objectives: [`Nommer les 文房四宝`, `Distinguer 5 styles de 书法`, `Connaître 王羲之 (书圣)`, `Utiliser 国画/水墨画/山水画`],
    flashcards: [`书法`, `文房四宝`, `笔`, `墨`, `楷书`, `草书`, `王羲之`, `国画`, `水墨画`, `山水画`],
  },
  "cecr-b22-arts-m5": {
    title: `京剧 et opéras régionaux`, titleEn: `京剧 and regional operas`,
    duration: 12,
    category: `culture`,
    difficulty: `advanced`,
    introTitle: `京剧 et 脸谱 : décoder l'opéra chinois`,
    introContent: `京剧 (jīngjù) — art national avec 4 disciplines et 4 rôles.

**4 disciplines :** chant 唱 (chàng), parole 念 (niàn), gestes 做 (zuò), combat 打 (dǎ).

**4 rôles :** 生 (shēng, homme), 旦 (dàn, femme), 净 (jìng, visage peint), 丑 (chǒu, comique).

**Le 脸谱 (liǎnpǔ) — code couleur :**

- Rouge = loyauté / courage.
- Blanc = traîtrise / ruse.
- Noir = intégrité / droiture.

**Opéras régionaux notables :**

- 川剧 (chuānjù, Sichuan) — célèbre pour le **变脸** (biànliǎn, changement de visage instantané).
- 越剧 (yuèjù, Zhejiang) — lyrique, souvent joué par des femmes.
- 粤剧 (yuèjù, Canton) — populaire en diaspora.

La Chine compte 300+ formes d'opéra, toutes patrimoine UNESCO.`,
    objectives: [`Connaître 京剧 et ses 4 rôles`, `Décoder le 脸谱 (couleurs)`, `Identifier 川剧 et le 变脸`, `Comparer 越剧/粤剧/川剧`],
    flashcards: [`京剧`, `脸谱`, `生`, `旦`, `丑`, `川剧`, `变脸`, `粤剧`, `戏曲`],
  },
  "cecr-b22-arts-m6": {
    title: `Architecture chinoise : du 四合院 au gratte-ciel`, titleEn: `Chinese architecture: from 四合院 to skyscrapers`,
    duration: 12,
    category: `culture`,
    difficulty: `advanced`,
    introTitle: `四合院 au gratte-ciel : 2000 ans d'architecture`,
    introContent: `Traditionnel : 四合院 (sì hé yuàn) , 紫禁城 (zǐ jìn chéng) , toits courbés 屋顶 (wū dǐng) et tuiles 瓦 (wǎ) , lions de pierre 石狮子 (shí shīzi) gardiens. Moderne : 上海中心大厦 (shànghǎi zhōngxīn dàshà) (Shanghai Tower, 632m), 鸟巢 (niǎocháo) (« nid d'oiseau », JO 2008), 水立方 (shuǐ lìfāng) (« cube d'eau »). Les « 5 monstres » de Pékin , 水立方 (shuǐ lìfāng) , 国家大剧院 (guójiā dà jùyuàn) , aéroport 大兴 (dà xīng) ) sont devenus emblèmes urbains.

- Couleurs codifiées : jaune = empereur, rouge = noblesse, vert = princes
- Tendance fusion : musée de Suzhou par 贝聿铭 (bèi yù míng)`,
    objectives: [`Décrire un 四合院`, `Lire le code couleur des toits`, `Citer 鸟巢/水立方`, `Comprendre l'architecture fusion`],
    flashcards: [`四合院`, `紫禁城`, `建筑`, `建筑师`, `摩天大楼`, `鸟巢`, `屋顶`, `瓦`],
  },
  "cecr-b22-arts-m7": {
    title: `Artisanat : 瓷器, 丝绸, 玉`, titleEn: `Crafts: porcelain, silk, jade`,
    duration: 12,
    category: `culture`,
    difficulty: `advanced`,
    introTitle: `瓷器/丝绸/玉 : trois symboles de la Chine`,
    introContent: `瓷器 (cíqì) — invention chinoise donnant son nom au pays en anglais (« china »). 丝绸 (sīchóu) — gardée secrète 3 000 ans, donna la 丝绸之路 (sīchóu zhī lù) Chang'an → Rome. 玉 (yù) — pierre sacrée, plus précieuse que l'or, incarne 5 vertus confucéennes.

- Capitale de la porcelaine : 景德镇 (jǐng dé zhèn) 
- Styles : 青花 (qīng huā) , 粉彩 (fěn cǎi) , 釉里红 (yòu lǐ hóng) 
- Couleurs du jade : 白玉 (bái yù) , 翡翠 (fěi cuì) 
- 平安扣 (píng ān kòu) = cadeau symbolique fort
- Cassé = très mauvais augure`,
    objectives: [`Reconnaître 青花 (Ming bleu/blanc)`, `Situer 景德镇 (capitale porcelaine)`, `Comprendre 玉 et la piété culturelle`, `Distinguer 翡翠 vs 白玉`],
    flashcards: [`瓷器`, `青花`, `景德镇`, `丝绸`, `丝绸之路`, `玉`, `白玉`, `翡翠`],
  },
  "cecr-b22-health-m1": {
    title: `中医 : médecine traditionnelle chinoise`, titleEn: `中医: traditional Chinese medicine`,
    duration: 12,
    category: `vocabulary`,
    difficulty: `advanced`,
    introTitle: `中医 : acupuncture, herbes et 望闻问切`,
    introContent: `中医 (zhōngyī) repose sur l'équilibre **阴阳** (yīn yáng) et les **5 éléments** (五行, wǔxíng). Le diagnostic suit 4 étapes — **望闻问切** (wàng wén wèn qiè) :

- 望 = observer (teint, langue).
- 闻 = écouter / sentir.
- 问 = interroger le patient.
- 切 = palper le pouls.

**Thérapies principales :**

- 针灸 (zhēnjiǔ) = acupuncture + moxibustion.
- 推拿 (tuīná) = massage thérapeutique.
- 中药 (zhōngyào) = pharmacopée (herbes, minéraux).
- 拔罐 (bá guàn) = ventouses.

**Concepts fondamentaux :** 气 (qì), 血 (xuè), 经络 (jīngluò).

En Chine, 中医 et **西医** (médecine occidentale) coexistent — les ordonnances mixtes (中西医结合) sont courantes.`,
    objectives: [`Décrire 望闻问切`, `Nommer 针灸/推拿/中药`, `Comprendre 气/血/经络`, `Distinguer 中医 vs 西医`],
    flashcards: [`中医`, `针灸`, `推拿`, `中药`, `气`, `经络`, `拔罐`, `阴阳`],
  },
  "cecr-b22-health-m2": {
    title: `Hôpital et consultation moderne`, titleEn: `Hospital and modern consultation`,
    duration: 12,
    category: `vocabulary`,
    difficulty: `advanced`,
    introTitle: `Hôpital en Chine : de 挂号 à 取药`,
    introContent: `医院 (yīyuàn) , 门诊 (mén zhěn) , 急诊 (jí zhěn) , 住院 (zhùyuàn) . En Chine, le système est payant et beaucoup d'hôpitaux exigent un dépôt 押金 (yājīn) avant admission. L'assurance 医保 (yī bǎo) couvre une partie.

- Étapes : 挂号 (guàhào) → 候诊 (hòu zhěn) → 看病 (kànbìng) → 开药 (kāi yào) → 取药 (qǔ yào) (retirer les médicaments) → 付款 (fù kuǎn) 
- Services : 内科 (nèi kē) , 外科 (wàikē) , 儿科 (érkē) , 皮肤科 (pí fū kē)`,
    objectives: [`Maîtriser le parcours 挂号→看病→取药`, `Nommer services (内/外/儿/皮肤科)`, `Comprendre 押金/医保`, `Utiliser 门诊/急诊/住院`],
    flashcards: [`医院`, `门诊`, `急诊`, `挂号`, `看病`, `开药`, `内科`, `外科`, `医保`],
  },
  "cecr-b22-health-m3": {
    title: `Bien-être et modes de vie`, titleEn: `Well-being and lifestyles`,
    duration: 12,
    category: `vocabulary`,
    difficulty: `advanced`,
    introTitle: `养生 : l'art de cultiver sa santé`,
    introContent: `养生 (yǎngshēng) — « nourrir la vie » : concept central du bien-être chinois qui englobe alimentation, sommeil, émotions et mouvement.

**Pratique incontournable :** 喝热水 (hē rè shuǐ) = boire de l'eau **chaude**. L'eau froide est considérée mauvaise pour le 气 (qì). Les Chinois s'en étonnent souvent si tu demandes de l'eau froide.

**Activités phares :**

- 太极拳 (tàijíquán) = tai-chi.
- 气功 (qìgōng) = exercices de souffle.
- 散步 (sànbù) = marche tranquille.

**Alimentation :** 食疗 (shíliáo) = soigner par l'alimentation. En été : 夏天吃西瓜 (xiàtiān chī xīguā). En hiver : 冬天补 (dōngtiān bǔ) — se « reconstituer ».

**Mots du stress moderne :** 亚健康 (yàjiànkāng) = sub-santé (fatigue chronique sans maladie déclarée) ; 抑郁症 (yìyùzhèng) = dépression.`,
    objectives: [`Comprendre 养生 et ses piliers`, `Pratiquer 太极拳/气功/散步`, `Expliquer 喝热水 culturellement`, `Parler de 亚健康/抑郁症`],
    flashcards: [`养生`, `太极拳`, `气功`, `散步`, `食疗`, `热水`, `亚健康`, `抑郁症`],
  },
  "cecr-b22-health-m4": {
    title: `运动 — sport et activité physique`, titleEn: `运动 — sports and physical activity`,
    duration: 12,
    category: `vocabulary`,
    difficulty: `advanced`,
    introTitle: `运动 : sports, blessures et récupération`,
    introContent: `Sports populaires en Chine : 篮球 (lánqiú) (basket — la NBA est culte), 足球 (zúqiú) , 乒乓球 (pīng pāng qiú) (ping-pong, sport national), 羽毛球 (yǔmáoqiú) .

- En salle : 健身房 (jiànshēnfáng) , 跑步机 (pǎobù jī) 
- Verbes : 锻炼 (duànliàn) , 出汗 (chū hàn) , 放松 (fàngsōng) 
- Blessures : 受伤 (shòu shāng) , 扭伤 (niǔ shāng) , 拉伤 (lā shāng) , 肌肉酸痛 (jī ròu suān tòng) 
- Récupération : 休息 (xiūxi) , 冰敷 (bīng fū) , 按摩 (ànmó) , 热身 (rè shēn) , 拉伸 (lā shēn) 
- Phrase : 我每周锻炼三次 (wǒ měi zhōu duànliàn sān cì) (wǒ měi zhōu duànliàn sān cì) = je fais du sport 3 fois/semaine`,
    objectives: [`Nommer 篮球/足球/乒乓球/羽毛球`, `Utiliser 锻炼/出汗/放松`, `Décrire une 扭伤/拉伤`, `Connaître 推拿 vs 按摩`],
    flashcards: [`锻炼`, `健身房`, `篮球`, `乒乓球`, `出汗`, `受伤`, `扭伤`, `热身`, `按摩`],
  },
  "cecr-b22-health-m5": {
    title: `营养 — nutrition et alimentation équilibrée`, titleEn: `营养 — nutrition and balanced diet`,
    duration: 12,
    category: `vocabulary`,
    difficulty: `advanced`,
    introTitle: `Nutrition moderne + concepts TCM`,
    introContent: `营养 (yíngyǎng) et 均衡饮食 (jūnhéng yǐnshí) : en Chine, l'idée TCM d'aliments « chauds/froids » coexiste avec la nutrition occidentale. Le sujet 减肥 (jiǎn féi) est immense, surtout chez les jeunes femmes. Commenter le poids reste fréquent en famille chinoise.

- Familles nutritives : 蛋白质 (dànbáizhì) , 碳水化合物 (tàn shuǐ huà hé wù) , 脂肪 (zhīfáng) , 维生素 (wéishēngsù) , 矿物质 (kuàng wùzhì) 
- 上火 (shànghuǒ) (« monter en feu ») = excès chaud → bouton, mal de gorge
- Tendances : 低碳水 (dītàn shuǐ) , 纯素 (chún sù) , 素食 (sùshí)`,
    objectives: [`Nommer 蛋白质/碳水化合物/维生素`, `Comprendre 上火 (TCM)`, `Distinguer 素食/纯素`, `Utiliser 减肥/节食`],
    flashcards: [`营养`, `均衡`, `蛋白质`, `维生素`, `上火`, `减肥`, `素食`, `热量`],
  },
  "cecr-b22-health-m6": {
    title: `心理健康 — santé mentale et stress`, titleEn: `心理健康 — mental health and stress`,
    duration: 12,
    category: `vocabulary`,
    difficulty: `advanced`,
    introTitle: `Santé mentale : tabou qui s'ouvre`,
    introContent: `心理健康 (xīnlǐ jiànkāng) : sujet longtemps tabou en Chine, qui s'ouvre depuis 2010. 心理咨询 (xīnlǐ zīxún) est en hausse dans les grandes villes. Concepts générationnels : 内卷 (nèi juǎn) (« involution », surcompétition épuisante) et 躺平 (tǎng píng) (« rester allongé », refuser la pression). Demander « 你需要倾诉吗 (nǐ xūyào qīngsù ma) ？» est très bien reçu.

- Vocabulaire : 抑郁 (yìyù) , 焦虑 (jiāo lǜ) , 失眠 (shīmián) , 压力大 (yā lì dà) 
- Stratégies : 放松 (fàngsōng) , 冥想 (míng xiǎng) , 深呼吸 (shēn hū xī) , 倾诉 (qīngsù) 
- Activités : 茶 (chá) , 太极 (tàijí) , 散步 (sàn bù) , 写日记 (xiě rì jì)`,
    objectives: [`Distinguer 抑郁/焦虑/失眠`, `Comprendre 内卷 et 躺平`, `Pratiquer 冥想/深呼吸/倾诉`, `Demander « 你需要倾诉吗？»`],
    flashcards: [`心理`, `抑郁`, `焦虑`, `失眠`, `压力`, `放松`, `冥想`, `倾诉`],
  },
  "cecr-b22-health-m7": {
    title: `老龄化 — vieillissement et 3e âge`, titleEn: `老龄化 — aging and the elderly`,
    duration: 12,
    category: `vocabulary`,
    difficulty: `advanced`,
    introTitle: `Société 4-2-1 et culture filiale`,
    introContent: `老龄化社会 (lǎo líng huà shèhuì) : défi majeur issu de la politique de l'enfant unique (1979-2015) → 4-2-1 (4 grands-parents, 2 parents, 1 enfant). 养老院 (yǎnglǎoyuàn) reste mal vu mais se développe. Le devoir culturel 孝 (xiào) reste central.

- Santé des seniors : 老花眼 (lǎo huā yǎn) , 高血压 (gāoxuèyā) , 糖尿病 (tángniàobìng) 
- Vie sociale dense : 广场舞 (guǎngchǎng wǔ) (danse de place — 100M de pratiquants !), 公园 (gōngyuán), 带孙子 (dài sūn zi) (garder les petits-enfants)
- Les « 广场舞大妈 (guǎngchǎng wǔ dàmā) » = meme sociologique
- Dire « 你很孝顺 (nǐ hěn xiàoshùn) » à un ami = compliment fort`,
    objectives: [`Comprendre 4-2-1 et 孝顺`, `Décrire 广场舞 et la vie sociale 3e âge`, `Distinguer 养老院 vs 带孙子`, `Nommer 高血压/糖尿病/老花眼`],
    flashcards: [`老龄化`, `退休`, `孝顺`, `养老院`, `高血压`, `广场舞`, `麻将`, `孙子`],
  },
  "cecr-b22-debate-m1": {
    title: `Introduire et soutenir un point de vue`, titleEn: `Introduce and support a viewpoint`,
    duration: 12,
    category: `conversation`,
    difficulty: `advanced`,
    introTitle: `La trousse à outils de l'argumentation`,
    introContent: `Ces formules structurent un développement oral ou écrit B2.

- Introduire : 我认为 (wǒ rènwéi) , 在我看来 (zài wǒ kànlái) , 从 (cóng) …来看 (lái kàn)
- Expliquer/justifier : 因为 (yīnwèi) , 由于 (yóu yú) (du fait que — plus soutenu), 原因是 (yuán yīn shì) , 之所以 (zhīsuǒyǐ) …是因为 (shì yīnwèi)
- Illustrer : 例如 (lìrú) , 比如 (bǐrú) , 举例来说 (jǔlì lái shuō)
- Ajouter : 另外 (lìngwài) , 此外 (cǐwài) , 再说 (zài shuō)`,
    objectives: [`Introduire avec 我认为/在我看来`, `Justifier avec 因为/由于/之所以`, `Illustrer avec 例如/比如`, `Ajouter avec 另外/此外`],
    flashcards: [`认为`, `在我看来`, `因为`, `由于`, `例如`, `另外`, `此外`],
  },
  "cecr-b22-debate-m2": {
    title: `Nuancer et relativiser`, titleEn: `Qualify and relativize`,
    duration: 12,
    category: `conversation`,
    difficulty: `advanced`,
    introTitle: `L'art de dire « oui, mais »`,
    introContent: `Ces marqueurs évitent le style tranché et signalent une pensée nuancée — très valorisé dans les débats chinois « civils ».

- Reconnaître un point adverse : 虽然 (suīrán) …但是 (dànshì), 的确 (díquè) , 不可否认 (bù kě fǒurèn) 
- Introduire une nuance : 不过 (búguò) ), 然而 (rán ér), 其实 (qíshí) 
- Généraliser avec prudence : 一般来说 (yìbān lái shuō) , 通常 (tōngcháng), 大多数 (dàduō shù) 
- Restreindre : 只是 (zhǐshì) , 不一定 (bù yídìng)`,
    objectives: [`Reconnaître avec 虽然/的确`, `Nuancer avec 不过/然而/其实`, `Généraliser avec 一般来说/通常`, `Restreindre avec 只是/不一定`],
    flashcards: [`的确`, `不可否认`, `不过`, `然而`, `其实`, `一般来说`, `通常`, `不一定`],
  },
  "cecr-b22-debate-m3": {
    title: `Réfuter et conclure`, titleEn: `Refute and conclude`,
    duration: 12,
    category: `conversation`,
    difficulty: `advanced`,
    introTitle: `Réfuter sans offenser + conclure fermement`,
    introContent: `La culture chinoise valorise la 面子 (miàn zi) : préférer 商榷 (shāng què) /恐怕 (kǒngpà) à des réfutations directes. En contexte formel chinois, 这是错的 (zhè shì cuò de) est jugé trop frontal.

- Réfuter poliment : 我不太同意 (wǒ bù tài tóngyì) , 恐怕不是这样 (kǒngpà bùshì zhèyàng) , 这种看法值得 (zhè zhǒng kànfǎ zhí de) de) 商榷 (shāng què) (ce point de vue mérite discussion — très soutenu)
- Plus direct : 我反对 (wǒ fǎnduì)
- Conclure : 总之 (zǒngzhī) , 总的 (zǒng de) 来说 (lái shuō) , 综上所述 (zōng shàng suǒ shù) (au vu de ce qui précède — écrit), 因此 (yīn cǐ)`,
    objectives: [`Réfuter avec 不太同意/恐怕/商榷`, `Conclure avec 总之/综上所述/因此`, `Éviter réfutations frontales`, `Comprendre 面子 dans un débat`],
    flashcards: [`同意`, `反对`, `恐怕`, `商榷`, `总之`, `综上所述`, `因此`, `面子`],
  },
  "cecr-b22-debate-m4": {
    title: `Comparer et opposer : 相比 / 相反 / 然而`, titleEn: `Compare and oppose: 相比 / 相反 / 然而`,
    duration: 12,
    category: `conversation`,
    difficulty: `advanced`,
    introTitle: `Articuler comparaisons et oppositions`,
    introContent: `À l'oral spontané, préfère 跟 (gēn) X 比起来 (bǐ qǐlái) ; à l'écrit, 与 (yǔ) X 相比 (xiāng bǐ) . Distinct du simple 比 (bǐ) : 相比 (xiāng bǐ) /与 (yǔ) …相比 (xiāng bǐ) introduit toute une PROPOSITION comparée.

- Comparer en B2 : 相比之下 (xiāng bǐ zhī xià) , 比起来 (bǐ qǐlái) , 与 (yǔ) X 相比 (xiāng bǐ) 
- Exemple : 与传统教育相比 (yǔ chuántǒng jiàoyù xiāng bǐ) ，在线课程更灵活 (zàixiàn kèchéng gèng líng huó) (zàixiàn kèchéng gèng líng huó)
- Opposer : 相反 (xiāng fǎn) , 反之 (fǎnzhī) , 然而 (rán ér) 
- Force croissante : 不过 (búguò) < 但是 (dànshì) < 然而 (rán ér) < 相反 (xiāng fǎn)`,
    objectives: [`Comparer avec 与 X 相比 / 相比之下`, `Opposer avec 相反/反之/然而`, `Choisir registre oral vs écrit`, `Hiérarchiser 不过 → 相反`],
    flashcards: [`相比`, `相比之下`, `相反`, `反之`, `然而`, `传统`, `灵活`],
  },
  "cecr-b22-debate-m5": {
    title: `Donner des exemples : 例如 / 拿…来说 / 据统计`, titleEn: `Give examples: 例如 / 拿…来说 / 据统计`,
    duration: 12,
    category: `conversation`,
    difficulty: `advanced`,
    introTitle: `Illustrer + chiffrer un argument`,
    introContent: `Pour gagner en crédibilité dans un débat formel chinois, cite TOUJOURS la source. 拿 (ná) X 来说 (lái shuō) cible un cas particulier qui illustre une tendance.

- Illustrer : 例如 (lìrú) (par exemple — neutre), 比如说 (bǐrú shuō) , 譬如 (pìrú) , 拿 (ná) X 来说 (lái shuō) 
- Citer des données : 据 (jù) , 据统计 (jù tǒngjì), 数据显示 (shùjù xiǎnshì), 调查表明 (diàochá biǎomíng) 
- Vocabulaire chiffres : 百分比 (bǎifēnbǐ) , 比例 (bǐlì) , 增长 (zēng cháng) , 下降 (xià jiàng) 
- Phrase : 据统计 (jù tǒngjì) ，去年 (qùnián) GDP 增长了 (zēng cháng le) 5.2%`,
    objectives: [`Choisir 例如 / 比如 / 譬如 (registre)`, `Construire 拿 X 来说`, `Citer une source avec 据 X 报道`, `Annoncer un chiffre avec 据统计`],
    flashcards: [`例如`, `譬如`, `比如说`, `据`, `统计`, `数据`, `显示`, `调查`],
  },
  "cecr-b22-debate-m6": {
    title: `Cause / conséquence : 由于 / 之所以 / 因此 / 从而`, titleEn: `Cause / consequence: 由于 / 之所以 / 因此 / 从而`,
    duration: 12,
    category: `conversation`,
    difficulty: `advanced`,
    introTitle: `Lier causes et effets en argumentation`,
    introContent: `之所以 (zhīsuǒyǐ) …是因为 (shì yīnwèi) inverse l'ordre normal pour insister sur la conséquence avant la cause : très oratoire. 从而 (cóng'ér) introduit souvent une conséquence positive.

- Causes : 由于 (yóu yú), 因为 (yīnwèi) (parce que — neutre), 之所以 (zhīsuǒyǐ) …是因为 (shì yīnwèi) (si…c'est parce que — emphatique)
- Conséquences : 因此 (yīn cǐ) (par conséquent — soutenu), 所以 (suǒyǐ) (donc — neutre), 因而 (yīn'ér) (de ce fait — formel), 从而 (cóng'ér) (et par là — formel)
- Hiérarchie : 所以 (suǒyǐ) < 因此 (yīn cǐ) < 因而 (yīn'ér) /从而 (cóng'ér)`,
    objectives: [`Construire 由于… / 之所以…是因为…`, `Choisir 因此/所以/因而/从而`, `Inverser cause↔conséquence avec 之所以`, `Alterner connecteurs dans un essai`],
    flashcards: [`由于`, `之所以`, `因此`, `因而`, `从而`, `原因`, `结果`],
  },
  "cecr-b22-debate-m7": {
    title: `Synthétiser et conclure : 综上所述 / 展望未来`, titleEn: `Synthesize and conclude: 综上所述 / 展望未来`,
    duration: 12,
    category: `conversation`,
    difficulty: `advanced`,
    introTitle: `Boucler un argumentaire avec ouverture`,
    introContent: `Une bonne conclusion B2+ chinoise = synthèse + ouverture. Pour ne pas finir plat, ouvrir vers l'avenir avec 展望未来 (zhǎnwàng wèilái), 期待 (qī dāi) , 值得 (zhí de) .

- Conclure : 总之 (zǒngzhī) (en bref — oral et écrit), 总的 (zǒng de) 来说 (lái shuō), 综上所述 (zōng shàng suǒ shù) (au vu de ce qui précède — soutenu), 一言以蔽之 (yī yán yǐ bì zhī) (en un mot — chengyu lettré)
- 这个议题值得 (zhège yìtí zhí de) de) 进一步探讨 (jìn yī bù tàntǎo) = ce sujet mérite d'être approfondi
- Termine par « 这个问题值得 (zhège wèntí zhí de) de) 我们继续思考 (wǒmen jìxù sīkǎo) » = touche élégante`,
    objectives: [`Choisir 总之/综上所述 selon registre`, `Ouvrir avec 展望未来/期待/值得`, `Éviter les conclusions plates`, `Construire « synthèse + ouverture »`],
    flashcards: [`总之`, `总的来说`, `综上所述`, `总结`, `结论`, `展望`, `期待`, `值得`],
  },
  "cecr-b22-conversation-m1": {
    title: `Réagir spontanément aux nouvelles`, titleEn: `React spontaneously to news`,
    duration: 12,
    category: `conversation`,
    difficulty: `advanced`,
    introTitle: `Sortir des « 真的吗 ? » basiques`,
    introContent: `Réagir aux nouvelles de l'autre de façon chaleureuse est crucial — une seule réaction = froide. Évite 没事的 (méishì de) (« c'est rien ») devant une vraie peine, perçu comme dismissif.

- Bonne nouvelle : 太好了 (tài hǎo le) , 真不错 (zhēn búcuò) , 难以置信 (nányǐ-zhìxìn) 
- Surprise : 没想到 (méi xiǎng dào) , 居然 (jū rán) , 竟然 (jìngrán) 
- Mauvaise nouvelle : 太糟糕了 (tài zāogāo le) , 真可惜 (zhēn kěxī) , 我替你难过 (wǒ tì nǐ nánguò) 
- Empathie : 我理解你 (wǒ lǐjiě nǐ) , 我能想象 (wǒ néng xiǎngxiàng) , 这真不容易 (zhè zhēn bùróng yì) 
- Encouragement : 加油 (jiāyóu) , 别灰心 (bié huī xīn) , 一切都会好的 (yī qiè dōu huì hǎo de) dōu 会 (huì) hǎo de) 
- Devant un compliment : surenchère (太厉害了 ！恭喜恭喜 ！)`,
    objectives: [`Distinguer 没想到/居然/竟然`, `Réagir avec 太好了/可惜/糟糕`, `Compatir avec 理解/想象/不容易`, `Encourager avec 加油/别灰心`],
    flashcards: [`没想到`, `居然`, `竟然`, `难以置信`, `可惜`, `理解`, `加油`, `保重`],
  },
  "cecr-b22-conversation-m2": {
    title: `Compliments et leur acceptation polie`, titleEn: `Compliments and polite acceptance`,
    duration: 12,
    category: `conversation`,
    difficulty: `advanced`,
    introTitle: `Faire un compliment qui sonne vrai + le recevoir`,
    introContent: `Compliments qui sonnent vrais : précise CE QUI est bien (你眼光真好, 你考虑得 很周到 , 你的 发音很地道 ). Évite la flatterie creuse — repérée vite. La modestie 谦虚 (qiānxū) est culturellement valorisée. Acceptable de remercier + détourner : « 谢谢 (xièxie) ，是因为我练得 (shì yīnwèi wǒ liàn de) 多 (duō) » — tu remercies SANS te valoriser.

- Recevoir un compliment : 哪里哪里 (nǎlǐ nǎlǐ) , 过奖了 (guòjiǎng le) , 您客气了 (nín kèqi le) 
- Plus moderne : 谢谢 (xièxie) ，不过还差得 (búguò hái chà de) chà de) 远 (yuǎn)`,
    objectives: [`Complimenter avec précision`, `Refuser poliment avec 哪里哪里`, `Comprendre la valeur de 谦虚`, `Combiner 谢谢 + détournement`],
    flashcards: [`漂亮`, `适合`, `厉害`, `眼光`, `周到`, `哪里`, `过奖`, `客气`, `谦虚`],
  },
  "cecr-b22-conversation-m3": {
    title: `Désaccord poli au quotidien`, titleEn: `Polite everyday disagreement`,
    duration: 12,
    category: `conversation`,
    difficulty: `advanced`,
    introTitle: `Nuancer entre amis ou en pro sans froisser`,
    introContent: `Exprimer un désaccord en conversation quotidienne est différent du débat formel. Adoucir avec 不过 (búguò) plutôt que 但是 (dànshì) . NE JAMAIS dire « 你错了 (nǐ cuò le) » à un supérieur — formuler comme une suggestion : « 我想我们可以从另一个角度看 (wǒ xiǎng wǒmen kěyǐ cóng lìng yī gè jiǎo dù kàn) ».

- Formules douces : 我觉得不一定 (wǒ juéde bù yídìng) , 我有点不同意 (wǒ yǒu diǎn bù tóng yì) , 我倒觉得 (wǒ dào juéde) …
- En pro : 我有一个不同的 (wǒ yǒu yī gè bù tóng de) (wǒ yǒu yī gè bù tóng de) 看法 (kànfǎ) , 我们可以再讨论一下 (wǒmen kěyǐ zài tǎo lùn yíxià) , 这个想法很有意思 (zhège xiǎng fǎ hěn yǒu yìsi) (zhège xiǎng fǎ hěn yǒu yìsi)，但 (dàn) …
- Sandwich : compliment + réserve + ouverture
- Terminer par 您觉得呢 (nín juéde ne) ？`,
    objectives: [`Construire 我倒觉得 + opinion`, `Adoucir avec 不过 (vs 但是)`, `Sandwich pro : compliment + réserve + 您觉得呢`, `Éviter 你错了 en hiérarchie`],
    flashcards: [`不一定`, `不同意`, `倒`, `不过`, `建议`, `看法`, `讨论`, `方案`],
  },
  "cecr-b22-conversation-m4": {
    title: `Téléphone et WeChat professionnels`, titleEn: `Professional phone and WeChat`,
    duration: 12,
    category: `conversation`,
    difficulty: `advanced`,
    introTitle: `Décrocher, présenter, conclure`,
    introContent: `Toujours 您 (nín) en pro. Clore TOUJOURS par 辛苦了 (xīn kǔ le) — culturellement énorme, l'oublier est froid voire impoli.

- Tél : 喂 (wèi) ，您好 (nín hǎo) → 我是 (wǒ shì) X公司的 (gōngsī de) 小王 (xiǎo wáng) → 请问 (qǐngwèn) X 在吗 (zài ma) ? → 请稍等 (qǐng shāo děng) / X 不在 (bù zài) ，您要留言吗 (nín yào liú yán ma) ? → 不打扰您了 (bù dǎrǎo nín le) ，再见 (zàijiàn) 
- 喂 (wèi) prononcé wéi (ton 2 montant) au tél
- WeChat 微信 (wēi xìn) a remplacé l'email pro : 您好 (nín hǎo) ，方便聊一下吗 (fāngbiàn liáo yíxià ma) ? + 麻烦您 (máfan nín) / 能否 (néng fǒu) 
- Confirmer : 收到 (shōudào) ，谢谢 (xièxie)`,
    objectives: [`Suivre le flow tél : 喂→请问→稍等→留言`, `Prononcer 喂 (wéi)`, `Démarrer WeChat avec 方便聊一下吗`, `Toujours conclure par 辛苦了`],
    flashcards: [`喂`, `请问`, `留言`, `稍等`, `打扰`, `微信`, `方便`, `麻烦`, `辛苦了`],
  },
  "cecr-b22-conversation-m5": {
    title: `Annoncer une mauvaise nouvelle + s\\'excuser`, titleEn: `Deliver bad news + apologize`,
    duration: 12,
    category: `conversation`,
    difficulty: `advanced`,
    introTitle: `Préparer + énoncer + suite + excuses`,
    introContent: `Pour annoncer une mauvaise nouvelle, jamais être brutal — préparer le terrain. Toujours suivre par une issue. Une excuse sans suite = perçue comme légère.

- Préparer le terrain : 我有件事要告诉你 (wǒ yǒu jiàn shì yào gàosu nǐ) (wǒ yǒu jiàn shì yào gàosu nǐ)… / 你要做好心理准备 (nǐ yào zuò hǎoxīn lǐ zhǔnbèi) 
- Énoncer : 出事了 (chū shì le) , 计划取消了 (jìhuà qǔ xiāo le) , 项目失败了 (xiàngmù shī bài le) 
- Toujours suivre par une issue : 但是我们可以 (dànshì wǒmen kěyǐ) …
- Excuses graduées : 不好意思 (bù hǎoyìsi) < 抱歉 (bàoqiàn) < 对不起 (duìbuqǐ) < 真的 (zhēn de) 对不起 (duìbuqǐ) / 非常抱歉 (fēicháng bàoqiàn) < 我向您道歉 (wǒ xiàng nín dàoqiàn) 
- Suivre par cause + remède : « 因为堵车 (yīnwèi dǔchē) ，我会赶紧过来 (wǒ huì gǎnjǐn guòlái) »`,
    objectives: [`Préparer avec 我有件事要告诉你`, `Adoucir 失败 → 不太顺利`, `Choisir le niveau d\\\\'excuse approprié`, `Cause + remède après excuse`],
    flashcards: [`告诉`, `出事`, `取消`, `失败`, `顺利`, `对不起`, `抱歉`, `道歉`],
  },
  "cecr-b22-conversation-m6": {
    title: `Discours rapporté + rumeurs (听说 / 据说)`, titleEn: `Reported speech + rumors (听说 / 据说)`,
    duration: 12,
    category: `conversation`,
    difficulty: `advanced`,
    introTitle: `Rapporter sans concordance + nuancer la source`,
    introContent: `Il n'y a pas de concordance des temps en chinois : 他说他明天来 (tā shuō tā míngtiān lái) (tā shuō tā míngtiān lái). Pour ne pas s'engager personnellement, commencer par 听说 (tīngshuō) plutôt que 我觉得 (wǒ juéde) .

- Verbes de parole : 说 (shuō) , 告诉 (gàosu) X (dire à X — objet OBLIGATOIRE), 问 (wèn) , 回答 (huídá) , 提到 (tí dào) 
- Question rapportée : 他问我什么时候去 (tā wèn wǒ shénme shíhou qù) (garde l'ordre interrogatif)
- Rumeurs : 听说 (tīngshuō) (j'ai entendu — personnel), 据说 (jù shuō), 大家都说 (dàjiā dōu shuō) , 有人说 (yǒu rén shuō)`,
    objectives: [`Rapporter sans concordance des temps`, `Mémoriser 告诉 + objet obligatoire`, `Choisir 听说 vs 据说 (distance)`, `Garder l\\\\'ordre interrogatif après 问`],
    flashcards: [`说`, `告诉`, `问`, `回答`, `提到`, `据说`, `听说`, `传言`, `消息`],
  },
  "cecr-b22-conversation-m7": {
    title: `Prendre congé chaleureusement + remercier en profondeur`, titleEn: `Take warm leave + thank deeply`,
    duration: 12,
    category: `conversation`,
    difficulty: `advanced`,
    introTitle: `Sortir d\\'une conversation + gratitude`,
    introContent: `Préparer la sortie : 那好 (nà hǎo) , 那这样吧 (nà zhèyàng ba) , 嗯 (ń) (嗯)…那我先 (nà wǒ xiān) … → 我得 (wǒ de) 走了 (zǒu le) / 时间不早了 (shíjiān bù zǎo le) / 还有事要办 (háiyǒu shì yào bàn) → 改天再聊 (gǎitiān zài liáo) / 保持联系 (bǎochí liánxì) / 路上小心 (lùshang xiǎoxīn) (formule chaleureuse universelle). Une sortie brutale 拜拜 (bàibai) ！= froid. La promesse de réciprocité 改天我请你吃饭 (gǎitiān wǒ qǐng nǐ chī fàn) (gǎitiān wǒ qǐng nǐ chī fàn) est plus forte que tout merci verbal.

- Remerciements profonds : 太感谢你了 (tài gǎnxiè nǐ le) , 谢谢你的帮助 (xièxie nǐ de bāngzhù) , 真不知道怎么感谢你 (zhēn bù zhīdào zěnme gǎnxiè nǐ) (zhēn bù zhīdào zěnme gǎnxiè nǐ)
- Très soutenu : 万分感谢 (wànfēn gǎnxiè) , 不胜感激 (bù shèng gǎnjī) 
- Si l'autre dit 不客气 (bú kèqi) , insister : 真的 (zhēn de) ，不是客气话 (bùshì kèqi huà)`,
    objectives: [`Construire le flow de sortie en 3 temps`, `Toujours conclure par 路上小心`, `Remercier de manière SPÉCIFIQUE`, `Promettre la réciprocité (改天我请你)`],
    flashcards: [`改天`, `联系`, `小心`, `路上`, `感谢`, `帮助`, `感激`, `客气话`],
  },
  "cecr-b22-nuances-m1": {
    title: `觉得 vs 认为 vs 以为 — opinion / jugement / erreur`, titleEn: `觉得 vs 认为 vs 以为 — opinion / judgment / mistaken belief`,
    duration: 12,
    category: `vocabulary`,
    difficulty: `advanced`,
    introTitle: `Trois manières de penser que les Français mélangent`,
    introContent: `觉得 (juéde) = trouver (subjectif, sensation) ; 认为 (rènwéi) = considérer ; 以为 (yǐwéi) = croire À TORT (la croyance s'est avérée fausse). Dans un essai/débat formel → 认为 (rènwéi) ; au quotidien → 觉得 (juéde) . Piège total des francophones : utiliser 以为 (yǐwéi) quand on veut juste dire « je pense que » — sonne soit ironique soit absurde.

- 我觉得这个菜好吃 (wǒ juéde zhège cài hǎochī) (subjectif, goût)
- 我认为政策不公平 (wǒ rènwéi zhèngcè bù gōngpíng) (wǒ rènwéi zhèngcè bù gōngpíng)
- 我以为他会来 (wǒ yǐwéi tā huì lái) = je croyais qu'il viendrait (et il n'est PAS venu)`,
    objectives: [`Distinguer 觉得 (sensation) vs 认为 (jugement)`, `Réserver 以为 aux croyances FAUSSES`, `Préférer 认为 dans un essai`, `Reconnaître le piège « 我以为你… »`],
    flashcards: [`觉得`, `认为`, `以为`, `其实`, `原来`, `判断`, `主观`, `客观`],
  },
  "cecr-b22-nuances-m2": {
    title: `必须 vs 一定 vs 应该 vs 得 — degrés d\\'obligation`, titleEn: `必须 vs 一定 vs 应该 vs 得 — obligation gradations`,
    duration: 12,
    category: `vocabulary`,
    difficulty: `advanced`,
    introTitle: `4 manières de dire « devoir » avec des forces différentes`,
    introContent: `Hiérarchie d'obligation : 应该 (yīnggāi) < 得 (de) < 一定要 (yídìng yào) < 必须 (bìxū) < 不得不 (bùdébù) . Erreur classique : utiliser 必须 (bìxū) pour insister auprès d'un ami — trop juridique. Préfère 一定要 (yídìng yào) .

- 应该 (yīnggāi) = devrait (recommandation morale) : 你应该多休息 (nǐ yīnggāi duō xiūxi) 
- 得 (de) = devoir oral, nécessité concrète : 我得 (wǒ de) 走了 (zǒu le) — STRICTEMENT oral
- 一定 (yídìng) = absolument (insistance personnelle ou certitude) : 你一定要来 (nǐ yídìng yào lái) / 他一定到了 (tā yídìng dào le) 
- 必须 (bìxū) = obligation EXTERNE, règle : 你必须按时到 (nǐ bìxū ànshí dào)`,
    objectives: [`Hiérarchiser 应该 → 必须 → 不得不`, `Distinguer 一定 (insistance) vs 必须 (règle)`, `Réserver 得 (děi) à l\\\\'oral`, `Choisir 一定要 entre amis (pas 必须)`],
    flashcards: [`必须`, `一定`, `应该`, `得`, `不得不`, `需要`, `建议`],
  },
  "cecr-b22-nuances-m3": {
    title: `已经 vs 都 vs 早已 — accomplissement et étonnement`, titleEn: `已经 vs 都 vs 早已 — completion and surprise`,
    duration: 12,
    category: `vocabulary`,
    difficulty: `advanced`,
    introTitle: `Trois « déjà » avec colorations différentes`,
    introContent: `已经 (yǐjīng) = déjà (factuel, neutre) ; 都 (dōu) = déjà (emphatique, surprise — 都 souligne « tant que ça ! » avec étonnement) ; 早已 (zǎoyǐ) = depuis longtemps déjà (formel/écrit). Ces adverbes sont souvent suivis de 就 (jiù) .

- 我已经吃了 (wǒ yǐjīng chī le) 
- 都十二点了 (dōu shí èr diǎn le) ，快睡吧 (kuài shuì ba) ! (emphatique, surprise)
- 我早已忘了 (wǒ zǎoyǐ wàng le) 
- 老早 (lǎo zǎo) = même sens que 早已 (zǎoyǐ) , mais oral et expressif 
- 我老早就跟你说过 (wǒ lǎo zǎo jiù gēn nǐ shuō guò) = je te l'avais dit il y a longtemps (sous-entendu : pourquoi tu n'as pas écouté ?)`,
    objectives: [`Choisir 都 + chiffre + 了 pour la surprise`, `Réserver 早已 à l\\\\'écrit, 老早 à l\\\\'oral`, `Repérer le reproche dans 老早就`, `Garder 已经 pour le neutre`],
    flashcards: [`已经`, `都`, `早已`, `老早`, `完成`, `惊讶`, `过去`],
  },
  "cecr-b22-nuances-m4": {
    title: `突然 vs 忽然 vs 一下子 — soudaineté`, titleEn: `突然 vs 忽然 vs 一下子 — suddenness`,
    duration: 12,
    category: `vocabulary`,
    difficulty: `advanced`,
    introTitle: `Trois « soudain » avec des grammaires différentes`,
    introContent: `突然 (tūrán) désigne un événement objectivement abrupt ; 忽然 (hūrán) exprime le vécu subjectif de la surprise. Test : « un X soudain » → seul 突然 (tūrán) fonctionne (« 一个突然的 电话 » ✓ ; « 一个忽然的 电话 » ✗).

- 一个突然的 (yī gè tūrán de) 决定 (juédìng) / 他突然来了 (tā tūrán lái le) 
- 我忽然想起 (wǒ hūrán xiǎng qǐ) = ça m'est revenu d'un coup
- 一下子 (yíxià zi) = d'un coup, en un instant (ajoute la complétude) : 一下子就明白了 (yíxià zi jiù míngbai le) (yíxià zi jiù míngbai le) / 一下子下了 (yíxià zi xià le) 大雨 (dà yǔ) 
- Synonymes : 马上 (mǎshàng) , 立刻 (lì kè)`,
    objectives: [`Utiliser 突然 comme adj OU adv`, `Garder 忽然 en adverbe seul`, `Choisir 一下子 pour intensité+complétude`, `Distinguer 马上 (séquence) vs 一下子 (flash)`],
    flashcards: [`突然`, `忽然`, `一下子`, `马上`, `立刻`, `想起`, `决定`],
  },
  "cecr-b22-nuances-m5": {
    title: `大约 vs 大概 vs 差不多 — approximations`, titleEn: `大约 vs 大概 vs 差不多 — approximations`,
    duration: 12,
    category: `vocabulary`,
    difficulty: `advanced`,
    introTitle: `Trois manières de dire « environ » selon ce qu\\'on approxime`,
    introContent: `大约 (dàyuē) = environ NUMÉRIQUE/temporel (toujours suivi d'une quantité ou d'une heure) ; 大概 (dàgài) = probablement ; 差不多 (chàbuduō) = signature culturelle en 3 emplois : similarité, approximation, suffisance. Lin Yutang en a fait un trait national.

- 大约二十个人 (dàyuē èr shí gèrén) / 大约三点 (dàyuē sān diǎn) 
- 他大概不会来 (tā dàgài bù huì lái) 
- Test : « probablement » → 大概 (dàgài) ; « à peu près » + chiffre → 大约 (dàyuē) 
- 差不多 (chàbuduō) emploi 1 : similarité 
- 差不多 (chàbuduō) emploi 2 : approximation (差不多十块)
- 差不多 (chàbuduō) emploi 3 : suffisance ，可以了 (kěyǐ le) )`,
    objectives: [`Choisir 大约 (chiffre) vs 大概 (probabilité)`, `Connaître les 3 sens de 差不多`, `Distinguer 估计 / 或许 / 可能`, `Repérer 差不多 = positif OU esquive en pro`],
    flashcards: [`大约`, `大概`, `差不多`, `可能`, `或许`, `估计`, `类似`],
  },
  "cecr-b22-nuances-m6": {
    title: `看 vs 见 vs 看见 vs 见到 vs 遇见 — voir/regarder`, titleEn: `看 vs 见 vs 看见 vs 见到 vs 遇见 — see/look`,
    duration: 12,
    category: `vocabulary`,
    difficulty: `advanced`,
    introTitle: `Action vs résultat vs hasard`,
    introContent: `看 (kàn) = ACTION de regarder (processus volontaire) ; 见 (jiàn) = RÉSULTAT de voir (presque jamais seul à l'oral). Erreur fréquente : « 我没看 (wǒ méi kàn) » (manque d'attention) vs « 我没看见 (wǒ méi kànjiàn) » . 遇见 (yùjiàn) a aussi une coloration romantique en chinois moderne.

- 我在看电视 (wǒ zài kàn diànshì) 
- 看见 (kànjiàn) = avoir vu : 我看了 (wǒ kàn le) le) ，但没看见 (dàn méi kànjiàn) = j'ai regardé mais je n'ai rien vu
- 见到 (jiàn dào) = voir/croiser, neutre 
- 见面 (jiànmiàn) = se rencontrer face à face
- 遇见 (yùjiàn) / 碰见 (pèng jiàn) = rencontre FORTUITE, hasard : 我在街上遇见了 (wǒ zài jiē shàng yùjiàn le) (wǒ zài jiē shàng yùjiàn le) 他 (tā)`,
    objectives: [`Distinguer 看 (action) vs 看见 (résultat)`, `Choisir 见到 (neutre) vs 遇见 (hasard)`, `Comprendre 遇见 romantique en chinois moderne`, `Distinguer 没看 vs 没看见`],
    flashcards: [`看`, `见`, `看见`, `见到`, `见面`, `遇见`, `碰见`, `巧合`],
  },
  "cecr-b22-nuances-m7": {
    title: `帮助 vs 帮忙 vs 协助 — degrés d\\'aide`, titleEn: `帮助 vs 帮忙 vs 协助 — help levels`,
    duration: 12,
    category: `vocabulary`,
    difficulty: `advanced`,
    introTitle: `Aide-concept vs service ponctuel vs collaboration pro`,
    introContent: `Hiérarchie : 帮 (bāng) (oral, ami) < 帮忙 (bāngmáng) (oral, service) < 帮助 (bāngzhù) < 协助 (xiézhù) < 援助 (yuánzhù) . Erreur : « 我帮助你一下 (wǒ bāngzhù nǐ yíxià) » est faux car 一下 (yíxià) ne s'insère pas dans 帮助 (bāngzhù) — dire « 我帮你一下 (wǒ bāng nǐ yíxià) ».

- 帮助 (bāngzhù) = aide (nom OU verbe, plus écrit/formel) : 我帮助他 (wǒ bāngzhù tā) 
- 帮忙 (bāngmáng) = donner un coup de main (oral, situationnel) — verbe SÉPARABLE : 帮我一个忙 (bāng wǒ yī gè máng) 
- Différence : 我需要你的帮助 (wǒ xūyào nǐ de bāngzhù) vs 我需要你帮忙 (wǒ xūyào nǐ bāngmáng) (sur ce truc, maintenant)
- 协助 (xiézhù) = assister, formel pro : 协助经理 (xiézhù jīnglǐ) / 警方协助调查 (jǐng fāng xiézhù diàochá) — JAMAIS entre amis`,
    objectives: [`Distinguer 帮助 (concept) vs 帮忙 (ponctuel)`, `Conjuguer 帮忙 SÉPARÉMENT (帮你的忙)`, `Réserver 协助 au contexte pro`, `Hiérarchiser 帮 → 帮忙 → 帮助 → 协助 → 援助`],
    flashcards: [`帮助`, `帮忙`, `帮`, `忙`, `协助`, `配合`, `合作`, `支持`],
  },
  "cecr-c11-chengyu-basic-m1": {
    title: `Chengyu positifs : 一举两得, 马到成功, 锦上添花`, titleEn: `Positive chengyu: 一举两得, 马到成功, 锦上添花`,
    duration: 12,
    category: `vocabulary`,
    difficulty: `superior`,
    introTitle: `« Faire d'une pierre deux coups » version chinoise`,
    introContent: `Un 成语 (chéngyǔ) est une formule figée de 4 caractères, souvent issue d'un classique, qui condense une idée complète. Grammaticalement, un chengyu fonctionne comme un adjectif ou un groupe verbal : 这真是一举两得 (zhè zhēnshi yìjǔ-liǎngdé) (zhè zhēnshi yìjǔ-liǎngdé). Utiliser un chengyu juste marque la maîtrise — mais mal placé, il ridiculise.

- 一举两得 (yìjǔ-liǎngdé) (yì jǔ liǎng dé, « une action, deux gains » = faire d'une pierre deux coups)
- 马到成功 (mǎ dào chénggōng) (mǎ dào chénggōng, « dès que le cheval arrive, victoire » = succès immédiat)
- 锦上添花 (jǐnshàng-tiānhuā) (jǐn shàng tiān huā, « ajouter une fleur sur un brocart » = ajouter au mieux une beauté superflue)`,
    objectives: [`Comprendre la structure du 成语 (4 car.)`, `Utiliser 一举两得/马到成功/锦上添花`, `Placer un chengyu comme adj./verbe`, `Éviter les emplois inappropriés`],
    flashcards: [`成语`, `一举两得`, `马到成功`, `锦上添花`],
  },
  "cecr-c11-chengyu-basic-m2": {
    title: `Chengyu descriptifs : 人山人海, 五花八门, 千变万化`, titleEn: `Descriptive chengyu: 人山人海, 五花八门, 千变万化`,
    duration: 12,
    category: `vocabulary`,
    difficulty: `superior`,
    introTitle: `Peindre une scène en 4 caractères`,
    introContent: `Ces chengyu sont fréquents dans la presse et les conversations soutenues. Note prosodique : les 4 caractères forment souvent une symétrie 2+2 /人海 (rén hǎi) ) qui aide à la mémorisation.

- 人山人海 (rénshān-rénhǎi) (rén shān rén hǎi, « montagne de gens, mer de gens » = foule dense) — indispensable pour décrire 春运 (chūn yùn) 
- 五花八门 (wǔhuā-bāmén) (wǔ huā bā mén, « 5 fleurs, 8 portes » = toutes sortes, varié)
- 千变万化 (qiānbiàn-wànhuà) (qiān biàn wàn huà, « mille changements, dix mille transformations » = en perpétuelle évolution)`,
    objectives: [`Décrire une foule avec 人山人海`, `Utiliser 五花八门 pour variété`, `Appliquer 千变万化 au changement`, `Repérer la structure 2+2`],
    flashcards: [`人山人海`, `五花八门`, `千变万化`],
  },
  "cecr-c11-chengyu-basic-m3": {
    title: `Chengyu négatifs/critiques : 自相矛盾, 画蛇添足, 杯弓蛇影`, titleEn: `Negative/critical chengyu: 自相矛盾, 画蛇添足, 杯弓蛇影`,
    duration: 12,
    category: `vocabulary`,
    difficulty: `superior`,
    introTitle: `L'art de critiquer avec 4 caractères`,
    introContent: `自相矛盾 (zì xiāng máo dùn) (zì xiāng máodùn, « se contredire — lance contre bouclier ») vient du paradoxe classique du vendeur d'armes prétendant que sa lance perce TOUT et son bouclier est imperçable. Ces chengyu permettent une critique lettrée et voilée.

- 自相矛盾 (zì xiāng máo dùn) : quand quelqu'un dit A puis non-A → 你的话自相矛盾 (nǐ dehuà zì xiāng máo dùn) 
- 画蛇添足 (huàshé-tiānzú) (huà shé tiān zú, « dessiner un serpent et lui ajouter des pattes » = gâcher par excès de zèle)
- 杯弓蛇影 (bēi gōng shé yǐng) (bēi gōng shé yǐng, « l'arc reflété dans la coupe pris pour un serpent » = se faire peur tout seul, soupçons imaginaires)`,
    objectives: [`Signaler contradiction : 自相矛盾`, `Critiquer excès : 画蛇添足`, `Décrire paranoïa : 杯弓蛇影`, `Connaître leurs origines classiques`],
    flashcards: [`自相矛盾`, `画蛇添足`, `杯弓蛇影`],
  },
  "cecr-c11-chengyu-basic-m4": {
    title: `Chengyu sur la volonté : 坚持不懈, 勇往直前, 一心一意`, titleEn: `Willpower chengyu: 坚持不懈, 勇往直前, 一心一意`,
    duration: 12,
    category: `vocabulary`,
    difficulty: `superior`,
    introTitle: `La détermination en 4 caractères`,
    introContent: `Ces chengyu sont adorés dans les discours officiels, les médias éducatifs, et les lettres de motivation — les utiliser signale une élégance lettrée.

- 坚持不懈 (jiānchí búxiè) (jiānchí bù xiè, « persévérer sans relâche ») — formule de clôture dans les discours motivants
- 勇往直前 (yǒngwǎng-zhíqián) (yǒng wǎng zhí qián, « avancer courageusement droit devant ») — souvent utilisé pour encourager
- 一心一意 (yìxīn-yíyì) (yì xīn yí yì, « un cœur, une intention » = se dévouer totalement)
- 全神贯注 (quán shén guàn zhù) (quán shén guàn zhù, « toute l'âme et la concentration » = totale concentration)
- 废寝忘食 (fèiqǐn-wàngshí) (fèi qǐn wàng shí, « oublier le sommeil et la nourriture » = se dévouer sans compter)`,
    objectives: [`Encourager avec 坚持不懈/勇往直前`, `Exprimer dévouement : 一心一意/全神贯注`, `Décrire engagement : 废寝忘食`, `Appliquer en contexte motivant`],
    flashcards: [`坚持不懈`, `勇往直前`, `一心一意`, `全神贯注`, `废寝忘食`],
  },
  "cecr-c11-media-discourse-m1": {
    title: `Structure d'un article de presse chinoise`, titleEn: `Structure of a Chinese press article`,
    duration: 12,
    category: `reading`,
    difficulty: `superior`,
    introTitle: `Anatomie d'un 新闻 chinois`,
    introContent: `Une dépêche chinoise , xīnwén) suit l'ordre : 标题 (biāotí) → 导语 (dǎo yǔ) (chapeau, 5W+H) → 主体 (zhǔtǐ) → 结尾 (jié wěi) . Conventions : noms complets introduits puis abrégés ; titres de fonctions toujours avant le nom ; dates en format AAAA年 (nián) MM月 (yuè) DD日 (rì) .

- Presse officielle : 人民日报 (rén mín rì bào), 新华社 (xīn huá shè), 央视 (yāng shì) , 新闻联播 (xīnwén lián bō) (JT de 19h, TRÈS codifié)
- Presse plus libre : 南方周末 (nánfāng zhōumò) , 财新 (cái xīn)`,
    objectives: [`Repérer 标题/导语/主体/结尾`, `Connaître 人民日报/新华社/央视`, `Comprendre 新闻联播 et ses codes`, `Respecter le format date AAAA年MM月DD日`],
    flashcards: [`新闻`, `标题`, `导语`, `人民日报`, `新华社`, `央视`, `新闻联播`],
  },
  "cecr-c11-media-discourse-m2": {
    title: `Lexique politique : 改革/开放/发展`, titleEn: `Political lexicon: 改革/开放/发展`,
    duration: 12,
    category: `reading`,
    difficulty: `superior`,
    introTitle: `Le triptyque fondateur du discours officiel`,
    introContent: `Trois mots reviennent dans TOUTES les déclarations officielles depuis 1978 : 改革 (gǎigé) , 开放 (kāi fàng) , 发展 (fāzhǎn) . 改革开放 (gǎigé kāi fàng) : politique lancée par Deng Xiaoping fin 1978, fondement de la Chine moderne. Ce lexique sature tout discours formel et médiatique.

- 和谐 (hé xié) 
- 中国梦 (Zhōngguó mèng) (Zhōngguó Mèng, Rêve chinois — slogan de Xi Jinping depuis 2012)
- 一带一路 (yídài yílù) (Yídài Yílù, « Nouvelles Routes de la Soie »)
- 共同富裕 (gòngtóng fùyù) 
- Sigles : 中央 (zhōngyāng) = gouvernement central, 党 (dǎng) = le Parti, 党的 (dǎng de) 领导 (lǐng dǎo) (« la direction du Parti »)`,
    objectives: [`Décoder 改革/开放/发展`, `Connaître 改革开放 (1978)`, `Identifier 中国梦/一带一路/共同富裕`, `Repérer 党的领导`],
    flashcards: [`改革`, `开放`, `发展`, `改革开放`, `中国梦`, `一带一路`, `共同富裕`, `党`],
  },
  "cecr-c11-media-discourse-m3": {
    title: `Relations internationales`, titleEn: `International relations`,
    duration: 12,
    category: `reading`,
    difficulty: `superior`,
    introTitle: `Le vocabulaire diplomatique chinois`,
    introContent: `Le vocabulaire diplomatique chinois distingue systématiquement 中方 (zhōng fāng) (Zhōngfāng, « partie chinoise ») vs 美方 (měi fāng) (Měifāng, « partie US »), 双边 (shuāngbiān) , 多边 (duō biān) . Le sujet 台湾 (táiwān) est très sensible — CCTV dit toujours 台湾问题 (táiwān wèntí) (« la question de Taïwan »).

- Noms de pays : 美国 (měi guó) , 俄罗斯 (é luó sī) , 欧盟 (ōu méng) , 日本 (rì běn) , 韩国 (hán guó), 法国 (fǎ guó) 
- Relations : 外交 (wàijiāo) , 合作 (hézuò) , 冲突 (chōngtū) , 谈判 (tánpàn) , 制裁 (zhìcái) 
- Sujets clés : 台湾 (táiwān) , 香港 (xiānggǎng) , 南海 (nán hǎi) (Mer de Chine méridionale), 一个中国原则 (yī gè Zhōngguó yuánzé)`,
    objectives: [`Nommer 美/俄/欧/日/韩/法`, `Utiliser 外交/合作/谈判/制裁`, `Maîtriser 中方 / X方`, `Comprendre 一个中国原则`],
    flashcards: [`美国`, `外交`, `合作`, `冲突`, `谈判`, `制裁`, `台湾`, `中方`, `双边`],
  },
  "cecr-c11-media-discourse-m4": {
    title: `Lire un éditorial — registre 书面语`, titleEn: `Reading an editorial — 书面语 register`,
    duration: 12,
    category: `reading`,
    difficulty: `superior`,
    introTitle: `书面语 vs 口语 — deux chinois qui coexistent`,
    introContent: `Un éditorial chinois bascule dans le 书面语 (shūmiàn yǔ) , riche en mots à un caractère hérités du classique. Le 4-syllabe domine la prosodie : chaque phrase tend à se découper en groupes de 4 caractères. Pour lire vite : repérer les conjonctions qui structurent l'argumentation, ne pas traduire mot à mot.

- Mots classiques courants : 之 (zhī) = 的 (de) , 于 (yú) = 在 (zài) /在 (zài) …上 (shàng) , 为 (wèi) = 是 (shì) , 而 (ér) = relation logique, 则 (zé) = 就 (jiù) 
- Conjonctions soutenues : 因此 (yīn cǐ) , 然而 (rán ér) , 纵使 (zòng shǐ), 倘若 (tǎngruò) 
- Structures : 以 (yǐ) X 为 (wèi) Y (« considérer X comme Y »), 以 (yǐ) …为主 (wèi zhǔ) (« avec…comme principal »)`,
    objectives: [`Identifier 之/于/为/而/则`, `Utiliser 因此/然而/纵使/倘若`, `Décomposer 以 X 为 Y`, `Repérer les groupes de 4 caractères`],
    flashcards: [`之`, `于`, `为`, `而`, `则`, `因此`, `然而`, `纵使`, `倘若`],
  },
  "cecr-c11-history-m1": {
    title: `Les dynasties : 秦汉唐宋元明清`, titleEn: `The dynasties: 秦汉唐宋元明清`,
    duration: 12,
    category: `culture`,
    difficulty: `superior`,
    introTitle: `La timeline impériale en 7 syllabes`,
    introContent: `Les écoliers chinois mémorisent la séquence des dynasties : 秦 (qín) (-221→-206), 汉 (hàn) (-206→220, donne son nom à 汉族 et 汉语 ), 唐 (táng) (618-907, âge d'or culturel), 宋 (sòng) (960-1279, poudre à canon, boussole, imprimerie), 元 (yuán) (1271-1368, mongols), 明 (míng) , 清 (qīng) (1644-1912, mandchous). Ensuite 中华民国 (Zhōnghuá mín guó) 1912-1949, 中华人民共和国 (Zhōnghuá rén mín gònghéguó) 1949→.

- 秦始皇 (qín shǐ huáng) Qínshǐhuáng = premier empereur, unification des royaumes combattants
- 李白 (lǐ bái) Lǐ Bái et 杜甫 (dù fǔ) Dù Fǔ = poètes emblématiques des Tang
- 忽必烈 (hū bì liè) Kūbìliè = Kubilai Khan (Yuan)
- 辛亥革命 (xīn hài gémìng) 1911 = fin de la dernière dynastie`,
    objectives: [`Mémoriser 秦汉唐宋元明清`, `Associer à 秦始皇/李白/郑和`, `Connaître dates charnières (1911, 1949)`, `Distinguer 汉族 vs 中华民族`],
    flashcards: [`秦`, `汉`, `唐`, `宋`, `元`, `明`, `清`, `秦始皇`, `辛亥革命`],
  },
  "cecr-c11-history-m2": {
    title: `La Chine au XXe siècle : 1911, 1949, 1978`, titleEn: `China in the 20th century: 1911, 1949, 1978`,
    duration: 12,
    category: `culture`,
    difficulty: `superior`,
    introTitle: `Trois dates pour comprendre la Chine moderne`,
    introContent: `1911 — 辛亥革命 (xīn hài gémìng) renverse la dynastie Qing ; 孙中山 (sūn zhōng shān) fonde la 中华民国 (Zhōnghuá mín guó) . 1949 — 毛泽东 (máo zé dōng) fonde la 中华人民共和国 (Zhōnghuá rén mín gònghéguó) après la guerre civile contre le 国民党 (guómín dǎng) de 蒋介石 (jiǎng jiè shí) (Tchang Kaï-chek), qui se replie à Taïwan. 1978 — 邓小平 (dèng xiǎo píng) lance 改革开放 (gǎigé kāi fàng) , qui propulse la Chine vers la 2e économie mondiale.

- 大跃进 (dà yuè jìn) (Dà Yuèjìn, Grand Bond en avant, 1958-1961) = catastrophe
- 文化大革命 (wénhuà dà gémìng) / 文革 (wén gé) (Révolution culturelle, 1966-1976)`,
    objectives: [`Fixer 1911/1949/1978`, `Connaître 孙中山/毛泽东/邓小平`, `Situer 大跃进 et 文革`, `Expliquer 国共 et Taïwan`],
    flashcards: [`辛亥革命`, `孙中山`, `毛泽东`, `邓小平`, `大跃进`, `文革`, `国民党`],
  },
  "cecr-c11-history-m3": {
    title: `Les 4 grands romans classiques`, titleEn: `The 4 great classical novels`,
    duration: 12,
    category: `culture`,
    difficulty: `superior`,
    introTitle: `四大名著 : le canon littéraire chinois`,
    introContent: `四大名著 (sì dà míngzhù) (sì dà míngzhù, « les 4 grands classiques ») sont les 4 piliers de la littérature chinoise.

- 《三国演义 (sān guó yǎn yì) 》(Sānguó Yǎnyì, « Les Trois Royaumes ») — figures mythiques 关羽 (guān yǔ) , 诸葛亮 (zhū gé liàng) 
- 《水浒传 (shuǐ hǔ chuán) 》(Shuǐhǔ Zhuàn, « Au bord de l'eau ») — 108 bandits héroïques
- 《西游记 (xī yóu jì) 》(Xīyóujì, « La Pérégrination vers l'Ouest ») — le singe 孙悟空 (sūn wù kōng) et le moine 唐僧 (táng sēng) partent chercher les sutras en Inde
- 《红楼梦 (hóng lóu mèng) 》(Hónglóumèng, « Le Rêve dans le pavillon rouge ») de Cao Xueqin — sommet absolu, étude d'une grande famille Qing en déclin`,
    objectives: [`Citer les 4 名著 avec époque`, `Identifier 孙悟空/关羽/诸葛亮`, `Connaître 《红楼梦》 comme sommet`, `Utiliser le titre en citation`],
    flashcards: [`四大名著`, `三国演义`, `水浒传`, `西游记`, `红楼梦`, `孙悟空`, `诸葛亮`],
  },
  "cecr-c11-history-m4": {
    title: `La Route de la Soie, passée et présente`, titleEn: `The Silk Road, past and present`,
    duration: 12,
    category: `culture`,
    difficulty: `superior`,
    introTitle: `丝绸之路 : de 张骞 à 一带一路`,
    introContent: `丝绸之路 (sīchóu zhī lù) (Sīchóu zhī Lù, Route de la Soie) : réseau de routes caravanières ouvert par 张骞 (zhāng qiān) (Zhāng Qiān, ambassadeur Han vers l'ouest en -138). Transportait soie, thé, porcelaine vers la Méditerranée ; ramenait chevaux, verre, religions (bouddhisme en premier). Aujourd'hui, 一带一路 (yídài yílù) = « Nouvelles Routes de la Soie », projet géoéconomique de Xi Jinping depuis 2013, corridor terrestre + maritime.

- Villes-étapes : 长安 (cháng ān) (Cháng'ān, aujourd'hui Xi'an, terminus est), 敦煌窟 (dūn huáng kū) ), 喀什 (kā shén) 
- Route maritime parallèle (XVe) : 郑和 (zhèng hé) fait 7 voyages jusqu'à l'Afrique`,
    objectives: [`Suivre la 丝绸之路 historique`, `Connaître 张骞/郑和`, `Situer 长安/敦煌/喀什`, `Relier au 一带一路 moderne`],
    flashcards: [`丝绸之路`, `张骞`, `长安`, `敦煌`, `喀什`, `郑和`, `一带一路`],
  },
  "cecr-c11-style-formal-m1": {
    title: `Email et lettre professionnelle`, titleEn: `Professional email and letter`,
    duration: 12,
    category: `writing`,
    difficulty: `superior`,
    introTitle: `Les codes du courrier formel chinois`,
    introContent: `Ne JAMAIS commencer par 你好 (nǐ hǎo) dans un contexte formel — c'est trop familier. L'email pro suit ces mêmes codes mais peut omettre 此致 (cǐ zhì) / 敬礼 (jìnglǐ) .

- Ouverture : 尊敬的 (zūnjìng de) X 先生 (xiānsheng) /女士 (nǚshì) (« Honoré Monsieur/Madame X »), 您好 (nín hǎo) ! 
- Corps en 书面语 (shūmiàn yǔ) : 谨此通知 (jǐn cǐ tōng zhī) (« nous avons l'honneur d'informer »), 感谢 (gǎnxiè) + 您 (nín) + verbe
- Clôture : 此致 (cǐ zhì) puis 敬礼 (jìnglǐ) — très rituelle
- Signature : 您的 (nín de) + nom, 敬上 (jìng shàng) (jìngshàng, « respectueusement soumis »)`,
    objectives: [`Ouvrir avec 尊敬的 + 您好`, `Rédiger corps en 书面语`, `Clôturer avec 此致敬礼`, `Signer avec 敬上`],
    flashcards: [`尊敬`, `您`, `谨`, `此致`, `敬礼`, `敬上`],
  },
  "cecr-c11-style-formal-m2": {
    title: `CV chinois (简历) et lettre de motivation`, titleEn: `Chinese CV (简历) and cover letter`,
    duration: 12,
    category: `writing`,
    difficulty: `superior`,
    introTitle: `简历 : la structure type`,
    introContent: `簡历 (jiǎn lì) chinois standard : âge et photo sont normaux — sans photo = incomplet (inverse du standard occidental). La lettre de motivation 求职信 (qiúzhí xìn) mentionne où on a vu l'annonce, pourquoi on postule, atouts, disponibilité.

- Sections du CV : 个人信息 (gèrén xìn xī) (nom, sexe, âge, lieu de naissance), 教育背景 (jiàoyù bèijǐng) , 工作经验 (gōngzuò jīngyàn) , 技能 (jì néng) , 语言能力 (yǔyán néng lì) , 奖项 (jiǎngxiàng) , 自我评价 (zìwǒ píng jià) 
- Clôture systématique : 期待您的 (qī dāi nín de) 回复 (huífù) (« dans l'attente de votre réponse »)
- Envoi : 您的 (nín de) + nom + 敬上 (jìng shàng)`,
    objectives: [`Structurer 简历 en 6 sections`, `Rédiger 自我评价 sans lieu commun`, `Écrire 求职信 clair`, `Clôturer avec 期待您的回复`],
    flashcards: [`简历`, `个人信息`, `教育背景`, `工作经验`, `技能`, `求职信`],
  },
  "cecr-c11-style-formal-m3": {
    title: `Rédiger un discours ou un toast (敬酒)`, titleEn: `Writing a speech or toast (敬酒)`,
    duration: 12,
    category: `writing`,
    difficulty: `superior`,
    introTitle: `敬酒 : l'art du toast chinois`,
    introContent: `En Chine, un banquet 宴会 (yànhuì) est inséparable des 敬酒 (jìng jiǔ) . L'ordre est strict : l'hôte lève le verre en premier, puis de l'aîné/le plus haut placé vers le plus jeune. Quand on trinque avec un senior, tenir son verre PLUS BAS que le sien .

- Formules de toast : 为 (wèi) X 干杯 (gānbēi) (« à X, cul sec »), 祝 (zhù) X 健康 (jiànkāng) , 一帆风顺 (yìfān-fēngshùn) , 万事如意 (wàn shì rúyì) 
- 干杯 (gānbēi) = cul sec ; 随意 (suíyì) = boire à sa guise
- Un discours officiel reprend ces formules + 感谢 (gǎnxiè) abondant + une citation ou chengyu pour finir`,
    objectives: [`Connaître protocole des 敬酒`, `Utiliser 干杯 vs 随意`, `Intégrer 一帆风顺/万事如意`, `Construire un discours 宴会`],
    flashcards: [`宴会`, `敬酒`, `干杯`, `随意`, `一帆风顺`, `万事如意`],
  },
  "cecr-c11-conversation-m1": {
    title: `Intervenir en colloque + Q&A académique`, titleEn: `Speak at a conference + academic Q&A`,
    duration: 14,
    category: `conversation`,
    difficulty: `superior`,
    introTitle: `Présenter une thèse + survivre au Q&A`,
    introContent: `CLÔTURE OBLIGATOIRE de toute intervention académique : 不足之处 (bùzú zhī chù) ，请各位指正 (qǐng gèwèi zhǐ zhèng) (sans cette modestie, l'intervention paraît arrogante). L'humilité épistémique est culturellement RESPECTÉE.

- Ouverture : 各位老师 (gèwèi lǎoshī) ，各位同学 (gèwèi tóngxué) ，下午好 (xiàwǔ hǎo) 
- Frame : 我今天想从 (wǒ jīntiān xiǎng cóng) X 的 (de) 角度分析 (jiǎo dù fēnxī) Y
- Citer : 正如 (zhèngrú) X 教授提到的 (jiàoshòu tí dào de) 
- Conclusion : 综上所述 (zōng shàng suǒ shù) , 我的 (wǒ de) 论点是 (lùn diǎn shì) X
- En Q&A : reconnaître (这是一个很好的 (zhè shì yī gè hěn hǎo de) (zhè shì yī gè hěn hǎo de) 问题 (wèntí) ), gagner du temps (让我想一下), restituer 意思是 (yìsi shì) X，对吗 (duì ma) ?)
- Si on ignore : 这一点我还没有深入研究 (zhè yīdiǎn wǒ hái méiyǒu shēn rù yán jiū) ，但我的 (dàn wǒ de) 初步看法是 (chūbù kànfǎ shì) X`,
    objectives: [`Ouvrir avec 各位老师 + frame académique`, `Conclure par 不足之处请指正 (OBLIGATOIRE)`, `Gagner du temps en Q&A avec 让我想一下`, `Faire valoir l'humilité épistémique`],
    flashcards: [`观点`, `论点`, `综上所述`, `指正`, `不足`, `提问`, `深入`, `初步`, `解答`, `疑问`],
  },
  "cecr-c11-conversation-m2": {
    title: `Entretien cadre supérieur + présenter son équipe`, titleEn: `Executive interview + present your team`,
    duration: 14,
    category: `conversation`,
    difficulty: `superior`,
    introTitle: `La règle d'or salaire : ne JAMAIS donner un chiffre en premier`,
    introContent: `RÈGLE D'OR pour le salaire : ne JAMAIS donner un chiffre en premier ，我希望听听贵公司的 (wǒ xīwàng tīng tīng guì gōngsī de) (wǒ xīwàng tīng tīng guì gōngsī de) 标准 (biāozhǔn) ). Mesure dans l'éloge : 经验丰富 (jīngyàn fēngfù) plutôt que 最厉害 (zuì lìhai) — l'éloge excessif décrédibilise.

- Présentation : 我毕业于 (wǒ bìyè yú) X 大学 (dàxué) ，主修 (zhǔ xiū) X，目前担任 (mù qián dānrèn) X
- Faiblesse : 我有时过于追求完美 (wǒ yǒu shí guòyú zhuīqiú wánměi) (wǒ yǒu shí guòyú zhuīqiú wánměi)，但我正在学习平衡 (dàn wǒ zhèngzài xuéxí píng héng) 
- Pourquoi cette boîte : 贵公司在 (guì gōngsī zài) X 领域的 (lǐng yù de) 领先地位让我非常向往 (lǐng xiān dìwèi ràng wǒ fēicháng xiàngwǎng) 
- Présenter son équipe : 名字 (míngzi) → 职位 (zhíwèi) → 主要负责 (zhǔyào fùzé) → 一句亮点 (yī jù liàngdiǎn) 
- Conclure : 我们团队希望与您共同努力 (wǒmen tuánduì xīwàng yǔ nín gòngtóng nǔlì)`,
    objectives: [`Se présenter avec 担任 + 擅长`, `Désamorcer la question faiblesse`, `DÉFLÉCHIR la question salaire`, `Présenter une équipe avec mesure`],
    flashcards: [`担任`, `擅长`, `完美`, `领先`, `薪资`, `高级`, `工程师`, `丰富`, `独到`, `见解`],
  },
  "cecr-c11-conversation-m3": {
    title: `Débat formel : argumenter et réfuter avec élégance`, titleEn: `Formal debate: argue and refute elegantly`,
    duration: 14,
    category: `conversation`,
    difficulty: `superior`,
    introTitle: `诚然 X，然而 Y — la concession-reprise C1`,
    introContent: `Réfuter sans agressivité = signal C1 indéniable. Démolir une donnée : 这个数据值得 (zhège shùjù zhí de) 商榷 (shāng què) (euphémisme magique pour « contestable »). Combo gagnant C1 : 诚然 (chéng rán) X，然而 (rán ér) Y (concession + reprise).

- Ouverture : 我对 (wǒ duì) X 的 (de) 看法是 (kànfǎ shì) Y, 我有三个主要论据 (wǒ yǒu sān gè zhǔyào lùn jù) 
- Structurer : 第一 (dì yī) /第二 (dì èr) /第三 (dì sān) 
- Anticiper l'objection : 有人可能会反驳说 (yǒu rén kěnéng huì fǎnbó shuō) X，但 (dàn) Y
- Conclure : 综上所述 (zōng shàng suǒ shù) , 我坚信 (wǒ jiānxìn) X
- Pour réfuter : 我理解 (wǒ lǐjiě) X 的 (de) 论点 (lùn diǎn) + soft 但是 (dànshì) 
- Démolir la logique : 这个推理存在跳跃 (zhège tuīlǐ cúnzài tiàoyuè) (zhège tuīlǐ cúnzài tiàoyuè)
- Conclure en douceur : 我倾向于另一种解读 (wǒ qīngxiàng yú lìng yī zhǒng jiě dú)`,
    objectives: [`Structurer en 第一/第二/第三 + 论据`, `Combo concession 诚然 X，然而 Y`, `Contester avec 这个数据值得商榷`, `Adoucir la conclusion par 倾向`],
    flashcards: [`论据`, `反驳`, `诚然`, `然而`, `坚信`, `忽略`, `商榷`, `推理`, `解读`, `倾向`],
  },
  "cecr-c11-conversation-m4": {
    title: `Interview presse + déclaration officielle`, titleEn: `Press interview + official statement`,
    duration: 14,
    category: `conversation`,
    difficulty: `superior`,
    introTitle: `Ne pas s'engager sans paraître évasif`,
    introContent: `Les officials chinois utilisent un registre très codifié en interview et déclaration officielle. Formule presse magique pour éviter : 现在下结论还为时过早 (xiànzài xià jié lùn hái wèi shí guò zǎo) .

- Interview : 谢谢您的 (xièxie nín de) 关注 (guānzhù) en intro
- Réponse : 这是一个复杂的 (zhè shì yī gè fùzá de) 问题 (wèntí) ，我可以从几个角度回答 (wǒ kěyǐ cóng jǐ gè jiǎo dù huídá) (wǒ kěyǐ cóng jǐ gè jiǎo dù huídá)
- Recadrer : 我想强调的 (wǒ xiǎng qiáng tiáo de) tiáo de) 是 (shì) X
- Sensible : 这个问题很敏感 (zhège wèntí hěn mǐn gǎn) ，我需要谨慎回答 (wǒ xūyào jǐn shèn huídá) 
- Question piège : 能否再具体一点 (néng fǒu zài jù tǐ yīdiǎn) ? 
- Déclaration officielle : 各位记者朋友 (gèwèi jìzhě péngyou) ，下午好 (xiàwǔ hǎo) → 立场 (lì chǎng) / 表态 (biǎotài) / 强调 (qiáng tiáo) / 重申 (zhòng shēn) 
- Phrases-types : 我们的 (wǒmen de) 立场是明确的 (lì chǎng shì míng què de) , 我们坚决反对 (wǒmen jiān jué fǎnduì) X, 我们呼吁各方 (wǒmen hūyù gè fāng) X, 我们将继续关注 (wǒmen jiāng jìxù guānzhù) (wǒmen jiāng jìxù guānzhù) X`,
    objectives: [`Esquiver avec 现在下结论还为时过早`, `Recadrer avec 我想强调的是`, `Énoncer 立场 / 表态 officiels`, `Conclure par 我们将继续关注`],
    flashcards: [`关注`, `复杂`, `为时过早`, `敏感`, `谨慎`, `立场`, `强调`, `重申`, `坚决`, `呼吁`],
  },
  "cecr-c11-conversation-m5": {
    title: `Banquet d'affaires + offrir un cadeau`, titleEn: `Business banquet + offer a gift`,
    duration: 14,
    category: `conversation`,
    difficulty: `superior`,
    introTitle: `Codes du banquet + tabous des cadeaux`,
    introContent: `Banquet : invité d'honneur face à la porte ; ne JAMAIS finir entièrement son assiette (signal : tu n'as pas eu assez). RÈGLE GRAVE : ne JAMAIS planter les baguettes verticalement dans le riz . Le receveur d'un cadeau refuse 1-2 fois .

- Toast avec un supérieur : verre PLUS BAS que le sien
- Refuser un plat : 我吃饱了 (wǒ chī bǎo le) ，您慢慢吃 (nín màn màn chī) 
- Cadeau : présenter À DEUX MAINS, légèrement incliné + 不成敬意 (bùchéng jìngyì)
- À ÉVITER absolument : horloges ≈ 送终 (sòng zhōng) ), parapluies , chaussures, couteaux
- SAFE : thé, alcool, pâtisseries, fruits`,
    objectives: [`Maîtriser placement + ordre des toasts`, `Tenir verre PLUS BAS qu'un supérieur`, `Offrir un cadeau À DEUX MAINS`, `Éviter horloge/parapluie/chaussures/couteau`],
    flashcards: [`主宾`, `敬酒`, `吃饱`, `夹`, `招待`, `礼物`, `收下`, `客气`, `不成敬意`, `送`],
  },
  "cecr-c11-conversation-m6": {
    title: `Médiation diplomatique + recommander`, titleEn: `Diplomatic mediation + recommend`,
    duration: 14,
    category: `conversation`,
    difficulty: `superior`,
    introTitle: `诚意 et 担保 — les mots de l'engagement`,
    introContent: `En médiation, la 诚意 (chéngyì) est la vertu maximale en Chine. Je me porte garant engage TA réputation — à utiliser uniquement avec confiance totale, c'est le système 信用 (xìnyòng) .

- Médiation : 我作为中间人 (wǒ zuò wèi zhōngjiān rén) ，希望帮助双方找到共识 (xīwàng bāngzhù shuāngfāng zhǎo dào gòngshí) (xīwàng bāngzhù shuāngfāng zhǎo dào gòngshí)
- Reformuler : 我理解 (wǒ lǐjiě) X 方的 (fāng de) 关切是 (guānqiè shì) … / Y 方的 (fāng de) 诉求是 (sùqiú shì) …
- Identifier le terrain commun : 双方都希望 (shuāngfāng dōu xīwàng) X
- Proposer : 是否可以考虑一种折中方案 (shì fǒu kěyǐ kǎolǜ yī zhǒng zhé zhōng fāng'àn) ?
- Clore : 让我们以诚意推动事情向前 (ràng wǒmen yǐ chéngyì tuīdòng shìqing xiàng qián) (ràng wǒmen yǐ chéngyì tuīdòng shìqing xiàng qián)
- Recommander : 我郑重向您推荐 (wǒ zhèngzhòng xiàng nín tuījiàn) (wǒ zhèngzhòng xiàng nín tuījiàn) X (郑重 = solennellement)`,
    objectives: [`Médier avec 中间人 + 关切 + 诉求`, `Mobiliser 诚意 dans la conclusion`, `Recommander avec 郑重 + 担保`, `Comprendre le risque réputation 信用`],
    flashcards: [`中间人`, `关切`, `诉求`, `折中`, `诚意`, `郑重`, `推荐`, `出色`, `价值`, `担保`],
  },
  "cecr-c11-conversation-m7": {
    title: `Email soutenu + rapport stratégique`, titleEn: `Formal email + strategic report`,
    duration: 14,
    category: `conversation`,
    difficulty: `superior`,
    introTitle: `恳请您拨冗审阅 — la formule la plus respectueuse`,
    introContent: `恳请您拨冗审阅 (kěn qǐng nín bō rǒng shěn yuè) est la formule la PLUS respectueuse en pro chinois pour demander à un cadre supérieur de lire quelque chose. 旨在 (zhǐzài) est très soutenu pour l'ouverture d'un rapport.

- Email cadre supérieur : sujet 关于 (guānyú) X 项目的若干思考 (xiàngmù de ruògān sīkǎo) (xiàngmù de ruògān sīkǎo) sonne soutenu)
- Ouverture : 尊敬的 (zūnjìng de) X 总 (zǒng) 
- Corps : 经过深思熟虑 (jīngguò shēnsī shú lǜ) , 我有以下几点建议 (wǒ yǒu yǐxià jǐ diǎn jiànyì) (wǒ yǒu yǐxià jǐ diǎn jiànyì)
- Conclure email : 顺颂商祺 (shùn sòng shāng qí) 
- Structure rapport stratégique : 背景 (bèijǐng) → 现状分析 (xiànzhuàng fēnxī) → 主要发现 (zhǔyào fāxiàn) → 战略建议 (zhànlüè jiànyì) → 风险评估 (fēngxiǎn píng gū) → 结论 (jié lùn) 
- Ouverture rapport : 本报告旨在 (běn bàogào zhǐzài) X
- Recommandations : 我们建议从以下三个方面入手 (wǒmen jiànyì cóng yǐxià sān gè fāngmiàn rùshǒu) (wǒmen jiànyì cóng yǐxià sān gè fāngmiàn rùshǒu)
- Conclure rapport : 综上所述 (zōng shàng suǒ shù) , 我们认为 (wǒmen rènwéi) X 是当前最优选择 (shì dāngqián zuì yōu xuǎnzé)`,
    objectives: [`Maîtriser 恳请您拨冗审阅 (max respect)`, `Structurer un rapport en 6 sections`, `Ouvrir par 本报告旨在`, `Conclure par 最优选择`],
    flashcards: [`若干`, `深思熟虑`, `恳请`, `拨冗`, `审阅`, `旨在`, `战略`, `评估`, `入手`, `最优`],
  },
  "cecr-c11-nuances-m1": {
    title: `坚决/坚定/坚强 + 者/之/乎 (particules classiques)`, titleEn: `坚决/坚定/坚强 + 者/之/乎 (classical particles)`,
    duration: 14,
    category: `vocabulary`,
    difficulty: `superior`,
    introTitle: `Trois fermetés + trois particules de l'écrit soutenu`,
    introContent: `坚决 (jiān jué) /执行 (zhíxíng) ) ≠ 坚定 (jiān dìng) (croyance — 坚定的 信念 /立场 ) ≠ 坚强 (jiān qiáng) (caractère — 坚强的 人 /意志 ). Test : 坚决 (jiān jué) + verbe d'action ; 坚定 (jiān dìng) + nom abstrait ; 坚强 (jiān qiáng) + personne/trait. Reconnaître les particules classiques débloque la lecture des éditoriaux Renmin Ribao et de toute citation littéraire.

- 者 (zhě) (suffixe de nominalisation : 学者 , 作者 , 强者 , 来者不拒 )
- 之 (zhī) (= 的 classique, vivant dans 之间 /之后 /国家之大 )
- 乎 (hū) (interrogative classique, dans 不亦乐乎 , 似乎 )`,
    objectives: [`Choisir 坚决/坚定/坚强 par collocation`, `Lire 学者/作者 (suffixe 者)`, `Identifier 之 dans 国家之大`, `Reconnaître 不亦乐乎 (chengyu)`],
    flashcards: [`坚决`, `坚定`, `坚强`, `信念`, `意志`, `者`, `之`, `乎`, `学者`, `不亦乐乎`],
  },
  "cecr-c11-nuances-m2": {
    title: `深入/深刻/深远 + 不仅 vs 既 vs 一方面`, titleEn: `深入/深刻/深远 + 不仅 vs 既 vs 一方面`,
    duration: 14,
    category: `vocabulary`,
    difficulty: `superior`,
    introTitle: `Profond en 3 dimensions + structures binaires`,
    introContent: `深入 (shēn rù) ≠ 深刻 (shēn kè) ≠ 深远的 (shēn yuǎn de) 影响 (yǐngxiǎng) ).

- 3 collocations C1 à mémoriser : 深入研究 (shēn rù yán jiū) , 深刻印象 (shēn kè yìn xiàng) , 深远影响 (shēn yuǎn yǐngxiǎng) .
- 不仅 (bùjǐn) X 而且 (érqiě) Y = PROGRESSION (Y enchérit).
- 既 (jì) X 又 (yòu) Y = COEXISTENCE équilibrée .
- 一方面 (yī fāngmiàn) X 一方面 (yī fāngmiàn) Y = DEUX FACETTES (souvent contradictoires).
- Erreur fréquente : 深刻研究 (shēn kè yán jiū) ✗ → 深入研究 (shēn rù yán jiū) ✓.
- Maîtriser ces structures binaires = signature d'écriture C1+ en chinois.`,
    objectives: [`Choisir 深入/深刻/深远 par dimension`, `Mémoriser 3 collocations clés`, `Distinguer 不仅…而且 (progression) vs 既…又 (coexistence)`, `Marquer un contraste avec 一方面…一方面`],
    flashcards: [`深入`, `深刻`, `深远`, `影响`, `意义`, `不仅`, `而且`, `既`, `一方面`, `另一方面`],
  },
  "cecr-c11-nuances-m3": {
    title: `基于/根据/鉴于 + 提前/首先/起初`, titleEn: `基于/根据/鉴于 + 提前/首先/起初`,
    duration: 14,
    category: `vocabulary`,
    difficulty: `superior`,
    introTitle: `Selon en 3 niveaux + trois « d'abord »`,
    introContent: `根据 (gēnjù) < 基于 (jīyú) (formel raisonnement, 基于事实) < 鉴于目前的 (jiànyú mù qián de) 形势 (xíngshì) , 我们决定 (wǒmen juédìng) X). 鉴于 (jiànyú) à l'oral spontané sonne pédant. 鉴于 (jiànyú) + décision = formule juridique/admin par excellence.

Trois mots pour « d'abord » : 提前 (tí qián) , 首先 (shǒu xiān) (RANG : 1° dans une liste — 首先 X 其次 Y), 起初 (qǐchū) (PHASE : au départ vs plus tard — 起初 我以为 X，后来才发现 Y).

- Combo C1 pour raconter un changement d'avis : 起初我以为 (qǐchū wǒ yǐwéi) X，后来才发现 (hòulái cái fāxiàn) Y.`,
    objectives: [`Hiérarchiser 根据 → 基于 → 鉴于`, `Maîtriser 鉴于 X，决定 Y (juridique)`, `Distinguer 提前 (timing) / 首先 (rang) / 起初 (phase)`, `Combo 起初…后来才发现`],
    flashcards: [`根据`, `基于`, `鉴于`, `事实`, `形势`, `提前`, `首先`, `起初`, `后来`, `发现`],
  },
  "cecr-c11-nuances-m4": {
    title: `于是/因而/从而 + 尽管/即使/哪怕`, titleEn: `于是/因而/从而 + 尽管/即使/哪怕`,
    duration: 14,
    category: `vocabulary`,
    difficulty: `superior`,
    introTitle: `Conséquence (récit/logique/téléologie) + concession réelle/hypothétique`,
    introContent: `于是没听懂 (yú shì méi tīng dǒng) ，于是又问了 (yú shì yòu wèn le) 一次 (yī cì) ) < 因而 (yīn'ér) (logique — 政策有效 (zhèngcè yǒu xiào) ，因而经济增长 (yīn'ér jīngjì zēng cháng) (yīn'ér jīngjì zēng cháng)) < 从而 (cóng'ér) (téléologique, mène au résultat voulu — 减 (jiǎn) 税从而刺激消费 (shuì cóng'ér cìjī xiāofèi) (shuì cóng'ér cìjī xiāofèi)). 从而 (cóng'ér) montre la maîtrise C1 en éditorial éco. 尽管 (jǐnguǎn) = bien que (FAIT RÉEL — 尽管下雨，他还是来了 ). 即使 (jíshǐ) = même si (HYPOTHÉTIQUE — 即使下雨，他也会来 ). 哪怕 (nǎ pà) = même si (HYPOTHÉTIQUE EXTRÊME, oral). Erreur très fréquente : 尽管下雨他也会来 (jǐnguǎn xià yǔ tā yě huì lái) ✗ (mélange réel/hypo).

La distinction RÉEL vs HYPOTHÉTIQUE est centrale.`,
    objectives: [`Hiérarchiser 于是/因而/从而`, `Utiliser 从而 en éditorial éco`, `Distinguer 尽管 (réel) vs 即使 (hypo)`, `Réserver 哪怕 à l'extrême émotionnel oral`],
    flashcards: [`于是`, `因而`, `从而`, `刺激`, `消费`, `尽管`, `即使`, `哪怕`, `希望`, `尝试`],
  },
  "cecr-c11-nuances-m5": {
    title: `繁荣/兴盛/鼎盛 + 衰落/衰退/消亡`, titleEn: `繁荣/兴盛/鼎盛 + 衰落/衰退/消亡`,
    duration: 14,
    category: `vocabulary`,
    difficulty: `superior`,
    introTitle: `Vie et mort des civilisations en 6 mots`,
    introContent: `繁荣繁荣 (fánróng fánróng) ) < 兴盛兴盛 (xīngshèng xīngshèng) ) < 鼎盛的 (dǐng chéng de) 鼎盛时期 (dǐng chéng shíqī) ). 鼎盛 (dǐng chéng) pour décrire son entreprise sonne pompeux. Côté déclin : 衰退衰退 (shuāituì shuāituì) ) < 衰落 (shuāiluò) (historique progressif, 帝国的 衰落 ) < 消亡消亡 (xiāo wáng xiāo wáng) ).

- Erreur de débutant : 消亡 (xiāo wáng) pour un secteur en baisse temporaire.

Réserve 消亡 (xiāo wáng) à ce qui est VRAIMENT terminé. Le bon mot avec la bonne échelle = signal de connaissance des registres en histoire/éditorial.`,
    objectives: [`Hiérarchiser 繁荣 → 兴盛 → 鼎盛`, `Réserver 鼎盛 au discours historique`, `Distinguer 衰退 (économie) vs 衰落 (histoire)`, `Limiter 消亡 au terminal`],
    flashcards: [`繁荣`, `兴盛`, `鼎盛`, `时期`, `事业`, `衰落`, `衰退`, `消亡`, `帝国`, `物种`],
  },
  "cecr-c11-nuances-m6": {
    title: `价值/意义/意味 + 影响/作用/效果`, titleEn: `价值/意义/意味 + 影响/作用/效果`,
    duration: 14,
    category: `vocabulary`,
    difficulty: `superior`,
    introTitle: `Valeur, sens, implication + influence/fonction/résultat`,
    introContent: `价值 (jià zhí) (apprécier la valeur — quantifiable) ≠ 意义 (yìyì) (ressentir le sens — subjectif/symbolique) ≠ 意味意味着 (yìwèi yìwèizhe) X). « 这意味着 (zhè yìwèizhe) X » = formule magique d'éditorial pour énoncer une conséquence. 影响 (yǐngxiǎng) (large — 政策的 影响 ) ≠ 作用 (zuò yòng) ≠ 效果方法效果不好 (xiào guǒ fāngfǎ xiào guǒ bùhǎo) ).

- Erreur classique : 这个药有很好的 (zhège yào yǒu hěn hǎo de) (zhège yào yǒu hěn hǎo de) 影响 (yǐngxiǎng) ✗ → 这个药效果很好 (zhège yào xiào guǒ hěn hǎo) ✓.
- 3 collocations à mémoriser : 深远影响 (shēn yuǎn yǐngxiǎng) , 起作用 (qǐ zuò yòng) , 见效果 (jiànxiào guǒ) .`,
    objectives: [`Distinguer 价值 (apprécier) vs 意义 (ressentir) vs 意味 (impliquer)`, `Maîtriser 这意味着 X en éditorial`, `Choisir 影响/作用/效果 par contexte`, `Mémoriser 深远影响 / 起作用 / 见效果`],
    flashcards: [`价值`, `意义`, `意味`, `价值观`, `象征`, `影响`, `作用`, `效果`, `镇痛`, `方法`],
  },
  "cecr-c11-nuances-m7": {
    title: `庄严/肃然/隆重 + 决定/决心/决议`, titleEn: `庄严/肃然/隆重 + 决定/决心/决议`,
    duration: 14,
    category: `vocabulary`,
    difficulty: `superior`,
    introTitle: `Solennel + décider en 3 saveurs`,
    introContent: `庄严 (zhuāngyán) (majesté — un drapeau, un engagement) ≠ 肃然 (sù rán) (sentiment de respect — 肃然起 敬 chengyu) ≠ 隆重的 (lóngzhòng de) 婚礼 (hūn lǐ) , 隆重举行 (lóngzhòng jǔxíng) ). « 大会将隆重举行 (dàhuì jiāng lóngzhòng jǔxíng) (dàhuì jiāng lóngzhòng jǔxíng) » = formule consacrée des annonces officielles (binôme indissociable). 决定 (juédìng) (universel — 我决定去) < 决心决心戒烟 (jué xīn jué xīn jiè yān) ) < 决议 (juéyì) .

- Erreur : 公司决心 (gōngsī jué xīn) ✗ (l'entreprise n'a pas un cœur — utilise 决定).

联合国决心 (lián hé guó jué xīn) ✗ → 联合国决议 (lián hé guó juéyì) . « 下决心 (xià jué xīn) + verbe » sonne très authentique pour une résolution personnelle.`,
    objectives: [`Distinguer 庄严 (majesté) / 肃然 (sentiment) / 隆重 (cérémonie)`, `Utiliser 隆重举行 en annonce officielle`, `Hiérarchiser 决定 / 决心 / 决议`, `Construire 下决心 + verbe pour résolution personnelle`],
    flashcards: [`庄严`, `肃然起敬`, `隆重`, `承诺`, `举行`, `决定`, `决心`, `决议`, `下决心`, `通过`],
  },
  "cecr-c12-chengyu-advanced-m1": {
    title: `Chengyu issus des Trois Royaumes`, titleEn: `Chengyu from the Three Kingdoms`,
    duration: 12,
    category: `vocabulary`,
    difficulty: `superior`,
    introTitle: `三国 : matrice des chengyu stratégiques`,
    introContent: `Les Trois Royaumes (220-280) ont nourri des dizaines de chengyu : 三顾茅庐 (sān gù máo lú) (sān gù máolú, « 3 visites à la chaumière » = solliciter un talent avec persévérance — Liu Bei qui vient 3 fois recruter Zhuge Liang). 桃园结义 (táo yuán jié yì) (táo yuán jié yì, « serment du verger de pêchers » = pacte fraternel) — Liu Bei, Guan Yu, Zhang Fei. 望梅止渴 (wàng méi zhǐ kě) (wàng méi zhǐ kě, « voir les prunes et apaiser sa soif » = se consoler avec un espoir illusoire) — ruse de Cao Cao faisant marcher ses troupes assoiffées. 草船借箭 (cǎo chuán jiè jiàn) (cǎo chuán jiè jiàn, « emprunter des flèches avec des bateaux de paille ») — Zhuge Liang. Utiliser ces chengyu au travail impressionne : 我们需要三顾茅庐的 (wǒmen xūyào sān gù máo lú de) 精神 (jīng shén) (« il nous faut l'esprit des 3 visites »).`,
    objectives: [`Connaître 三顾茅庐/桃园结义`, `Utiliser 望梅止渴 métaphoriquement`, `Citer 草船借箭`, `Rattacher à Liu Bei/Zhuge Liang`],
    flashcards: [`三顾茅庐`, `桃园结义`, `望梅止渴`, `草船借箭`],
  },
  "cecr-c12-chengyu-advanced-m2": {
    title: `Chengyu sur l'apprentissage`, titleEn: `Chengyu on learning`,
    duration: 12,
    category: `vocabulary`,
    difficulty: `superior`,
    introTitle: `Étudier comme les anciens`,
    introContent: `La Chine vénère le savoir : 悬梁刺股 (xuán liáng cì gǔ) (xuán liáng cì gǔ, « pendre sa tresse à la poutre, se piquer la cuisse ») — deux anecdotes d'étudiants qui se maintenaient éveillés (Sun Jing attachait ses cheveux, Su Qin se piquait). 凿壁偷光 (záo bì tōu guāng) (záo bì tōu guāng, « percer le mur pour voler la lumière ») — Kuang Heng, pauvre, faisait un trou dans le mur du voisin pour lire. 韦编三绝 (wéi biān sān jué) (wéi biān sān jué, « les sangles [du livre en bambou] rompues 3 fois ») — Confucius aurait lu le Yijing si souvent que les lanières de cuir s'usèrent 3 fois. 学而不厌 (xué ér bù yàn) (xué ér bú yàn, « étudier sans se lasser ») — citation de Confucius dans 《论语 (lùn yǔ) 》. Ces chengyu sont omniprésents dans les discours motivants et sur les murs d'école.`,
    objectives: [`Citer 悬梁刺股/凿壁偷光`, `Connaître 韦编三绝 / Confucius`, `Utiliser 学而不厌`, `Relier aux 论语`],
    flashcards: [`悬梁刺股`, `凿壁偷光`, `韦编三绝`, `学而不厌`, `论语`],
  },
  "cecr-c12-chengyu-advanced-m3": {
    title: `歇后语 : les formules à chute`, titleEn: `歇后语: two-part allegorical sayings`,
    duration: 12,
    category: `vocabulary`,
    difficulty: `superior`,
    introTitle: `歇后语 : l'humour classique de la langue populaire`,
    introContent: `Un 歇后语 (xiē hòu yǔ) est un dicton en deux parties : une métaphore énigmatique suivie de son explication, souvent omise car sous-entendue. Ex. : 外甥打灯笼 (wàisheng dǎ dēnglong) — 照舅 (zhào jiù) ) (« le neveu porte la lanterne — éclaire son oncle (comme d'habitude) ») : jeu sur 舅 (jiù) et 旧 (jiù) , même prononciation jiù, signifie « comme avant ». 黄鼠狼给鸡拜年 (huáng shǔ láng gěi jī bàinián) — 没安好心 (méi ān hǎoxīn) (« la belette souhaite bonne année au poulet — pas avec de bonnes intentions »). 八仙过海 (bā xiān guò hǎi) — 各显神通 (gè xiǎn shén tōng) (« les 8 immortels traversent la mer — chacun déploie ses talents »). Les Chinois en connaissent des centaines. Les utiliser à propos signale une très bonne maîtrise. N'utiliser QUE la première partie est fréquent : l'auditeur comprend la chute implicite.`,
    objectives: [`Définir 歇后语 (2 parties)`, `Utiliser 外甥打灯笼`, `Citer 黄鼠狼给鸡拜年`, `Omettre la chute à l'oral`],
    flashcards: [`歇后语`, `外甥`, `灯笼`, `八仙过海`, `黄鼠狼`],
  },
  "cecr-c12-business-m1": {
    title: `关系 et 面子 — les deux piliers invisibles`, titleEn: `关系 and 面子 — the two invisible pillars`,
    duration: 12,
    category: `culture`,
    difficulty: `superior`,
    introTitle: `关系 : le réseau invisible qui fait tout marcher`,
    introContent: `关系 (guānxì) littéralement « connexion », en pratique : réseau d'obligations mutuelles basé sur famille, amis d'école 同学 (tóngxué) , compatriotes 老乡 (lǎoxiāng) , ou intermédiaires. 有关系 (yǒuguān xì) = on peut faire avancer les choses ; 没关系 (méi guānxi) au sens propre (pas au sens « de rien ») = système fermé. Se construit par : 吃饭 (chī fàn) , 送礼 (sòng lǐ) , 喝酒 (hē jiǔ) , réciprocité sur la durée. 面子 (miàn zi) (miànzi, litt. « visage ») = honneur social, ce que les autres voient de vous.

- 给面子 (gěi miàn zi) = donner face ; 丢面子 (diū miàn zi) = perdre face ; 留面子 (liú miàn zi) = préserver la face de l'autre.

Règle d'or : ne JAMAIS corriger ou refuser frontalement en public — fait perdre la face à votre interlocuteur.`,
    objectives: [`Expliquer 关系 et ses leviers`, `Distinguer 给/丢/留 + 面子`, `Utiliser 同学/老乡 comme relais`, `Éviter refus frontal en public`],
    flashcards: [`关系`, `面子`, `给面子`, `丢面子`, `同学`, `老乡`, `送礼`],
  },
  "cecr-c12-business-m2": {
    title: `酒桌文化 — négocier à table`, titleEn: `酒桌文化 — negotiating at the table`,
    duration: 12,
    category: `culture`,
    difficulty: `superior`,
    introTitle: `酒桌文化 : les vraies négos n'ont pas lieu au bureau`,
    introContent: `酒桌文化 (jiǔ zhuō wénhuà) (jiǔzhuō wénhuà, « culture de la table de banquet ») : en Chine, on ne conclut pas un gros deal lors d'une réunion — on le conclut autour d'un 白酒 (báijiǔ) (báijiǔ, alcool de sorgho à 50-55°) partagé. Séquence-type : hôte reçoit, commande plat par plat (le plus haut placé choisit), chacun porte des 敬酒 (jìng jiǔ) , le « traité » se négocie dans cette atmosphère.

- Signaux : accepter le toast = respect ; décliner = faire perdre la face.

Règles : 干杯 (gānbēi) est un vrai défi si proposé par le patron ; 意思意思 (yìsi yìsi) (yìsi yìsi, « petit geste ») pour signifier une acceptation.

- Alternative moderne : 商务茶 (shāng wù chá) , plus sobre.
- Mot-clé contrat : 合同 (hétóng) .`,
    objectives: [`Décrire 酒桌文化 complète`, `Distinguer 干杯 vs 意思意思`, `Utiliser 商务茶 comme alternative`, `Signer un 合同`],
    flashcards: [`酒桌文化`, `白酒`, `干杯`, `意思意思`, `商务茶`, `合同`],
  },
  "cecr-c12-business-m3": {
    title: `Négocier : chiffre, remise, clause`, titleEn: `Negotiating: figure, discount, clause`,
    duration: 12,
    category: `vocabulary`,
    difficulty: `superior`,
    introTitle: `Le vocabulaire de la négociation en 3 temps`,
    introContent: `Proposition : 我们的 (wǒmen de) 报价是 (bào jià shì) X (wǒmen de bàojià shì, notre cotation est), 最低价 (zuì dījià) , 批发 (pīfā) vs 零售 (língshòu) . Discussion : 能打折吗 (néng dǎzhé ma) ? (néng dǎzhé ma? peut-on avoir une remise?), 打八折 (dǎ bā zhé) (dǎ bā zhé, -20% — attention : 八 折 = 80% du prix, pas -80%!), 再便宜一点 (zài piányi yīdiǎn) (zài piányi yìdiǎn, un peu moins cher). Clauses : 付款方式 (fù kuǎn fāngshì) (fùkuǎn fāngshì, mode de paiement), 定金 (dìng jīn) , 尾款 (wěi kuǎn) , 交货期 (jiāo huò qī) (jiāohuòqī, délai de livraison). Signature : 签合同 (qiān hétóng) , 盖章 (gài zhāng) (gàizhāng, apposer le sceau — plus important que la signature en Chine).

- Post-signature : 履行合同 (lǚ háng hétóng).
- Piège : 八折 (bā zhé) = 80% non 20% — le chiffre indique ce qu'on paie.`,
    objectives: [`Distinguer 报价 vs 最低价`, `Calculer 打八折 correctement (= 80%)`, `Négocier clauses 定金/尾款`, `Comprendre 盖章 vs signature`],
    flashcards: [`报价`, `打折`, `八折`, `付款`, `定金`, `尾款`, `盖章`],
  },
  "cecr-c12-business-m4": {
    title: `Présentation et pitch en chinois`, titleEn: `Chinese presentation and pitch`,
    duration: 12,
    category: `conversation`,
    difficulty: `superior`,
    introTitle: `La structure d'une prés. d'entreprise chinoise`,
    introContent: `Ouverture : 各位领导 (gèwèi lǐng dǎo) ，各位来宾 (gèwèi láibīn) (« chers dirigeants, chers invités »), 大家好 (dàjiā hǎo) ! . Présentation société : 成立于 (chénglì yú) X 年 (nián), 总部在 (zǒngbù zài) , 主营业务 (zhǔ yíngyè wù) , 市场份额 (shì chǎng fèn'é) (shìchǎng fèn'é, part de marché). Produit : 核心竞争力 (hé xīn jìngzhēng lì) , 技术优势 (jìshù yōushì) . Données : 年收入 (nián shōu rù) , 利润率 (lì rùn lǜ) , 增长率 (zēng cháng lǜ) (zēngzhǎnglǜ, taux de croissance). Partenariat : 合作共赢 (hézuò gòng yíng) (hézuò gòngyíng, « gagnant-gagnant »), 互利互惠 (hù lì hù huì) . Clôture : 期待与贵公司合作 (qī dāi yǔ guì gōngsī hézuò) (« en espérant coopérer avec votre honorable société ») + 感谢 (gǎnxiè) + chengyu : 互相学习 (hùxiāng xuéxí) ou 共创未来 (gòng chuàng wèilái) .

- 贵 (guì) + 公司 (gōngsī) /校 (xiào) /国 (guó) = marque de respect pour l'entité du partenaire.`,
    objectives: [`Ouvrir avec 各位领导`, `Utiliser 核心竞争力/市场份额`, `Conclure avec 合作共赢`, `Ajouter 贵 + 公司`],
    flashcards: [`各位领导`, `成立`, `总部`, `市场份额`, `核心竞争力`, `合作共赢`, `贵公司`],
  },
  "cecr-c12-education-system-m1": {
    title: `Parcours scolaire : 6-3-3-4`, titleEn: `School path: 6-3-3-4`,
    duration: 12,
    category: `culture`,
    difficulty: `superior`,
    introTitle: `Le système 9 ans obligatoires + lycée + fac`,
    introContent: `Structure : 幼儿园 (yòu'éryuán) (yòu'éryuán, maternelle, 3-6 ans), 小学 (xiǎoxué) (xiǎoxué, primaire, 6 ans), 初中 (chūzhōng) (chūzhōng, collège, 3 ans), 高中 (gāozhōng) (gāozhōng, lycée, 3 ans), 大学 (dàxué) (dàxué, université, 4 ans en 本科 běnkē licence + 2-3 ans en 研究生 yánjiūshēng master).

- 义务教育 (yìwù jiàoyù) = 9 ans (primaire + collège).

Examens-charnières : 中考 (zhōng kǎo) (zhōngkǎo, examen d'entrée au lycée, fin de 初中 ) et surtout 高考 (gāokǎo) (gāokǎo, examen national d'entrée à l'université, fin de 高中 , objet de la leçon suivante).

- Noter : 大一 (dà yī) dà yī = 1re année de fac, 大二 (dà èr) = 2e, etc.

Terme en vogue : 鸡娃 (jī wá) (jīwá, « enfant-poule » = enfant hyper-poussé académiquement par ses parents).`,
    objectives: [`Parcourir 幼/小/初/高/大学`, `Comprendre 义务教育 (9 ans)`, `Distinguer 中考 vs 高考`, `Expliquer 鸡娃`],
    flashcards: [`幼儿园`, `小学`, `初中`, `高中`, `大学`, `义务教育`, `中考`, `鸡娃`],
  },
  "cecr-c12-education-system-m2": {
    title: `高考 : l'examen qui décide tout`, titleEn: `高考: the exam that decides everything`,
    duration: 12,
    category: `culture`,
    difficulty: `superior`,
    introTitle: `高考 : le 7 juin de 10 millions de destins`,
    introContent: `高考 (gāokǎo) : examen national sur 2 ou 3 jours début juin (typiquement 7-9). Épreuves : 语文 (yǔwén) , 数学 (shùxué) , 英语 (yīng yǔ) , puis 文综 (wén zōng) OU 理综 (lǐ zōng) . Score sur 750. Les universités sont hiérarchisées : 985 工程 (gōngchéng) (985 Engineering, 39 universités d'élite dont 北 大 Pékin, 清华 Tsinghua), 211 工程 (gōngchéng) (211 Engineering, top 100). Vocabulaire : 考生 (kǎoshēng) , 录取 (lù qǔ) , 分数线 (fēnshù xiàn) , 状元 (zhuàngyuán) (zhuàngyuán, major de la province — titre impérial recyclé !). Le 高考 (gāokǎo) est considéré comme l'exam le plus compétitif au monde ; un mauvais score peut sceller une carrière.`,
    objectives: [`Décrire structure des 高考`, `Citer 985/211 et leurs élites`, `Utiliser 录取/分数线/状元`, `Expliquer l'enjeu social`],
    flashcards: [`高考`, `语文`, `数学`, `文综`, `理综`, `985`, `211`, `录取`, `状元`],
  },
  "cecr-c12-education-system-m3": {
    title: `Universités chinoises et études à l'étranger`, titleEn: `Chinese universities and studying abroad`,
    duration: 12,
    category: `culture`,
    difficulty: `superior`,
    introTitle: `De 清华 à 留学`,
    introContent: `Top universités chinoises : 清华大学 (qīng huá dàxué) , 北京大学 (běijīng dàxué) / 北大 (běi dà) , 复旦大学 (fù dàn dàxué) , 上海交大 (shànghǎi jiāo dà) , 浙大 (zhè dà) .

- Diplômes : 学士 (xuéshì) , 硕士 (shuò shì) , 博士 (bóshì) .

Études à l'étranger : 留学 (liúxué) , 留学生 (liúxuéshēng) (étudiant étranger OU étudiant chinois parti à l'étranger). 海归 (hǎi guī) (hǎiguī, « tortue de mer » homophone = diplômé revenu d'outre-mer — statut prestigieux en décroissance).

- Échanges : 交换生 (jiāo huàn shēng) (jiāohuànshēng, étudiant en échange), 奖学金 (jiǎngxuéjīn) .

HSK devient pour les étrangers ce que TOEFL est pour les Chinois.`,
    objectives: [`Nommer 清华/北大/复旦/交大`, `Utiliser 学士/硕士/博士`, `Comprendre 留学/海归`, `Distinguer 交换生/奖学金`],
    flashcards: [`清华大学`, `北大`, `学士`, `硕士`, `博士`, `留学`, `海归`, `奖学金`],
  },
  "cecr-c12-law-society-m1": {
    title: `Système juridique chinois`, titleEn: `Chinese legal system`,
    duration: 12,
    category: `vocabulary`,
    difficulty: `superior`,
    introTitle: `宪法, 法律 et 法院`,
    introContent: `宪法 (xiànfǎ) (xiànfǎ, Constitution, texte fondamental adopté 1982 avec plusieurs amendements). Hiérarchie des normes : 法律 (fǎlǜ) (fǎlǜ, lois votées par le 全国 人大 ANP), 行政法规 (xíngzhèng fǎguī) , 部门规章 (bùmén guīzhāng) . Tribunaux : 最高人民法院 (zuì gāo rén mín fǎyuàn) , 中级 (zhōngjí) /基层 (jīcéng) (tribunaux intermédiaires/de base). Acteurs : 法官 (fǎguān) , 律师 (lǜshī) , 原告 (yuángào) , 被告 (bèigào) . Procédure : 起诉 (qǐsù) , 判决 (pànjué) (pànjué, juger/rendre un verdict), 上诉 (shàngsù) . Peines : 有期徒刑 (yǒu qī tú xíng) , 无期 (wú qī) , 死刑 (sǐ xíng) (sǐxíng, peine de mort — la Chine l'applique encore).`,
    objectives: [`Hiérarchiser 宪法/法律/法规`, `Nommer 法官/律师/原告/被告`, `Utiliser 起诉/判决/上诉`, `Comprendre 有期/无期/死刑`],
    flashcards: [`宪法`, `法律`, `法院`, `法官`, `律师`, `原告`, `被告`, `判决`],
  },
  "cecr-c12-law-society-m2": {
    title: `Débats de société : genre, mariage, natalité`, titleEn: `Social debates: gender, marriage, birthrate`,
    duration: 12,
    category: `culture`,
    difficulty: `superior`,
    introTitle: `Les tensions sociales contemporaines`,
    introContent: `Genre : 性别 (xìng bié) , 性别歧视 (xìng bié qíshì) , 女权主义 (nǚ quán zhǔyì) (nǚquán zhǔyì, féminisme — sujet sensible sur les réseaux chinois). 剩女 (shèng nǚ) (shèngnǚ, « femmes restantes » — terme péjoratif pour célibataires 27+, critiqué mais encore répandu), 剩男 (shèng nán) (shèngnán, équivalent masculin, bcp plus nombreux dû au déséquilibre de genre). Mariage et natalité : 结婚率 (jiéhūn lǜ) (jiéhūnlǜ, taux de mariage, en chute libre), 离婚率 (lí hūn lǜ) , 出生率 (chūshēng lǜ) (chūshēnglǜ, natalité, très bas — 2022 pour la 1re fois population en baisse). Politique : 一孩 (yī hái) (1978-2015), 二孩 (èr hái) (2016-2021), 三孩 (sān hái) (2021→) — assouplissements successifs peu efficaces. LGBTQ : 同性恋 (tóng xìng liàn) — dépénalisé en 1997, dépathologisé en 2001, mais non reconnu légalement.`,
    objectives: [`Utiliser 性别歧视/女权主义`, `Expliquer 剩女/剩男`, `Retracer 一孩→二孩→三孩`, `Comprendre 同性恋 en Chine`],
    flashcards: [`性别`, `性别歧视`, `女权主义`, `剩女`, `结婚率`, `出生率`, `三孩`, `同性恋`],
  },
  "cecr-c12-law-society-m3": {
    title: `Cybersécurité et censure`, titleEn: `Cybersecurity and censorship`,
    duration: 12,
    category: `vocabulary`,
    difficulty: `superior`,
    introTitle: `防火长城 : le Grand Firewall`,
    introContent: `防火长城 (fáng huǒ cháng chéng) (fánghuǒ chángchéng, « Grande muraille de feu ») est le surnom officieux du Great Firewall (GFW).

- Terme officiel : 网络长城 (wǎngluò cháng chéng) .

Sites étrangers bloqués : Google, Facebook, YouTube, Twitter/X, Instagram, WhatsApp, Wikipedia , presse étrangère (NYT, BBC Chinese…). Contournement : 翻墙 (fān qiáng) (fān qiáng, « sauter le mur » = utiliser un VPN), légalement zone grise. Termes techniques : 网络安全 (wǎngluò ānquán) , 数据安全 (shùjù ānquán) .

- Loi centrale : 网络安全法 (wǎngluò ānquán fǎ) (2017).

Censure de contenu : 敏感词 (mǐn gǎn cí) (mǐngǎncí, mots sensibles filtrés — 64 = 4 juin 1989, noms de dissidents, etc.). Éviter ces sujets en ligne en Chine est une règle de prudence basique.`,
    objectives: [`Expliquer 防火长城/GFW`, `Utiliser 翻墙 avec prudence`, `Nommer 网络安全/数据安全`, `Comprendre 敏感词`],
    flashcards: [`防火长城`, `翻墙`, `网络安全`, `敏感词`, `网络安全法`],
  },
  "cecr-c12-conversation-m1": {
    title: `Litige légal + clauses de contrat`, titleEn: `Legal dispute + contract clauses`,
    duration: 14,
    category: `conversation`,
    difficulty: `superior`,
    introTitle: `调解 avant 诉讼 + clauses 争议解决 obligatoires`,
    introContent: `En culture chinoise, on PRIVILÉGIE 调解 (tiáojiě) avant 诉讼 (sùsòng) — saying « 我们先尝试调解吧 (wǒmen xiān chángshì tiáojiě ba) (wǒmen xiān chángshì tiáojiě ba) » montre maturité (procès = perte de temps + face).

- Litige : 我想咨询一下 (wǒ xiǎng zīxún yíxià) X 的 (de) 法律问题 (fǎlǜ wèntí) .
- Vocab : 纠纷 (jiū fēn) , 起诉 (qǐsù) , 仲裁 (zhòngcái) , 调解 (tiáojiě) .
- Contrat 合同 (hétóng) : 甲方 (jiǎ fāng) / 乙方 (yǐ fāng) , 标的 (biāo de) , 违约责任 (wéiyuē zé rèn) , 不可抗力 (bù kě kàng lì) , 争议解决 (zhēngyì jiějué) .
- Demander modif : 我希望在第 (wǒ xīwàng zài dì) X 条加上 (tiáo jiāshàng) Y.
- Sécuriser : 我建议增加一条不可抗力条款 (wǒ jiànyì zēng jiā yī tiáo bù kě kàng lì tiáokuǎn) .
- JAMAIS signer sur place : 这份合同我需要带回去研究 (zhè fèn hétóng wǒ xūyào dài huíqù yán jiū) .

TOUS les contrats sino-étrangers DOIVENT inclure une clause 争议解决 (zhēngyì jiějué) vs 诉讼 (sùsòng) ).`,
    objectives: [`Préférer 调解 à 诉讼 culturellement`, `Maîtriser 甲方/乙方/违约/不可抗力`, `Toujours inclure clause 争议解决`, `Ne JAMAIS signer sur place`],
    flashcards: [`咨询`, `纠纷`, `起诉`, `调解`, `胜诉`, `合同`, `甲方`, `违约`, `不可抗力`, `争议`],
  },
  "cecr-c12-conversation-m2": {
    title: `Négociation cross-culturelle + pitch stratégique`, titleEn: `Cross-cultural negotiation + strategic pitch`,
    duration: 14,
    category: `conversation`,
    difficulty: `superior`,
    introTitle: `« 让我们再研究一下 » = un « non » poli`,
    introContent: `Lire les signaux : 让我们再研究一下 (ràng wǒmen zài yán jiū yíxià) = souvent un « non » poli (si 2x, abandonne et change d'angle).

- Pré-négo : connaître la 关系 (guānxì) + le 面子 (miàn zi) de l'autre.
- Éviter le « non » direct : préfère 这个我们可以再考虑 (zhège wǒmen kěyǐ zài kǎolǜ) (zhège wǒmen kěyǐ zài kǎolǜ) ou 这个有点困难 (zhège yǒu diǎn kùnnan).
- Pousser : 我们的诚意是希望长期合作 (wǒmen de chéngyì shì xīwàng chángqī hézuò) (wǒmen de chéngyì shì xīwàng chángqī hézuò) = mot-clé business).
- Pitch stratégique : 背景 (bèijǐng) → 问题 (wèntí) → 方案 (fāng'àn) → 效果 (xiào guǒ) → 风险 (fēngxiǎn) → 计划 (jìhuà) .
- Combo argument C1 : « 之所以 (zhīsuǒyǐ) X，是因为 (shì yīnwèi) Y » .
- Demander : 我希望各位领导能给予支持 (wǒ xīwàng gèwèi lǐng dǎo néng gěi yǔ zhī chí) .`,
    objectives: [`Décoder « 让我们再研究一下 » = non poli`, `Mobiliser 长期合作 en négo`, `Structurer pitch en 6 sections`, `Argumenter avec 之所以 X，是因为 Y`],
    flashcards: [`关系`, `面子`, `考虑`, `困难`, `长期`, `汇报`, `据统计`, `之所以`, `担心`, `给予`],
  },
  "cecr-c12-conversation-m3": {
    title: `Discours politique + association sociale`, titleEn: `Political speech + social association`,
    duration: 14,
    category: `conversation`,
    difficulty: `superior`,
    introTitle: `携手 + 共同努力 — la mobilisation collective chinoise`,
    introContent: `Pour mobiliser efficacement, il faut rendre l'acte signifiant plutôt que demander directement.

- Discours : 各位朋友 (gèwèi péngyou) ，今天我想跟大家分享 (jīntiān wǒ xiǎng gēn dàjiā fēnxiǎng) (jīntiān wǒ xiǎng gēn dàjiā fēnxiǎng) X 的 (de) 看法 (kànfǎ) .
- Constat : 我们身边正发生着 (wǒmen shēnbiān zhèng fāshēng zhe) X 的 (de) 现象 (xiànxiàng) .
- Verbes : 倡导 (chàngdǎo) , 呼吁 (hūyù) , 推动 (tuīdòng) .
- Combo motivationnel : 让我们携手 (ràng wǒmen xiéshǒu) X (joignons les mains pour X — 携手 très soutenu).
- Conclure : 让我们共同努力 (ràng wǒmen gòngtóng nǔlì) (ràng wǒmen gòngtóng nǔlì)，把这个梦想变成现实 (bǎ zhège mèng xiǎng biànchéng xiànshí) .
- Association : 使命 (shǐmìng) → 工作 (gōngzuò) → 成果 (chéngguǒ) → 计划 (jìhuà) .
- Vocab : 公益 (gōngyì) , 慈善 (cí shàn) , 志愿者 (zhìyuànzhě) , 致力于 (zhìlìyú) .
- Mobiliser : 我们诚邀您加入我们的 (wǒmen chéng yāo nín jiārù wǒmen de) yāo nín jiārù wǒmen de) 行列 (hángliè) .
- Don : « 您的 (nín de) 支持 (zhī chí) ，意味着 (yìwèizhe) X » — au lieu de « 请捐款 (qǐng juān kuǎn) », rends l'acte SIGNIFIANT.
- Ex : 您的 (nín de) 支持 (zhī chí) ，意味着一个孩子能上学 (yìwèizhe yī gè háizi néng shàngxué) (yìwèizhe yī gè háizi néng shàngxué).`,
    objectives: [`Construire 让我们携手 X + 共同努力`, `Mobiliser 倡导/呼吁/推动`, `Présenter une cause via 致力于`, `Solliciter un don avec 您的支持，意味着 X`],
    flashcards: [`现象`, `追求`, `倡导`, `推动`, `携手`, `使命`, `公益`, `志愿者`, `致力于`, `诚邀`],
  },
  "cecr-c12-conversation-m4": {
    title: `Entretien disciplinaire + licenciement`, titleEn: `Disciplinary interview + layoff`,
    duration: 14,
    category: `conversation`,
    difficulty: `superior`,
    introTitle: `Punir avec rééducation + licencier avec dignité`,
    introContent: `Sans porte ouverte à la fin d'une conversation disciplinaire, l'employé perd la face. Licenciement : 我有一件事要跟您谈 (wǒ yǒu yī jiàn shì yào gēn nín tán) ，希望您冷静听 (xīwàng nín lěngjìng tīng) (xīwàng nín lěngjìng tīng) → 公司决定与您解除劳动合同 (gōngsī juédìng yǔ nín jiěchú láo dòng hétóng) → adoucir : 这不是您个人能力的 (zhè bùshì nín gèrén néng lì de) 问题 (wèntí) → offrir : 推荐信 (tuījiàn xìn) + 补偿金 (bǔcháng jīn) .

- Disciplinaire : 我今天找您谈话是关于 (wǒ jīntiān zhǎo nín tánhuà shì guānyú) (wǒ jīntiān zhǎo nín tánhuà shì guānyú) X.
- Verbes : 谈话 (tánhuà) / 警告 (jǐng gào) / 处分 (chù fēn) .
- Demander explication : 您能否说明一下情况 (nín néng fǒu shuō míng yíxià qíng kuàng) ?
- Clore en éduquant : 我们希望您能从这件事中吸取教训 (wǒmen xīwàng nín néng cóng zhè jiàn shì zhōng xīqǔ jiāo xùn) (wǒmen xīwàng nín néng cóng zhè jiàn shì zhōng xīqǔ jiāo xùn) + 我们相信您能改进 (wǒmen xiāngxìn nín néng gǎijìn) (wǒmen xiāngxìn nín néng gǎijìn).
- Conclure : 我个人非常感谢您过去的 (wǒ gèrén fēicháng gǎnxiè nín guò qù de) 贡献 (gòngxiàn) .

Sans cause objective + reconnaissance + offre de soutien, le 关系 (guānxì) explose.`,
    objectives: [`Toujours offrir 我们相信您能改进 (porte ouverte)`, `Annoncer 解除合同 avec cause + adoucissement`, `Offrir 推荐信 + 补偿金`, `Reconnaître les 贡献 passées`],
    flashcards: [`谈话`, `警告`, `处分`, `吸取`, `教训`, `解除`, `劳动合同`, `补偿金`, `推荐信`, `贡献`],
  },
  "cecr-c12-conversation-m5": {
    title: `Pitch VC + conseil d'administration`, titleEn: `VC pitch + board meeting`,
    duration: 14,
    category: `conversation`,
    difficulty: `superior`,
    introTitle: `痛点 + 护城河 — le langage du VC chinois`,
    introContent: `Présenter un risque SANS mesures déjà prises = perte de crédibilité. Le ton doit être sérieux, factuel, jamais alarmiste.

- Pitch VC 10 mins : 团队 (tuánduì) → 痛点 (tòng diǎn) → 解决方案 (jiějué fāng'àn) → 市场 (shì chǎng) → 商业模式 (shāng yè mó shì) → 数据 (shùjù) → 融资计划 (róngzī jìhuà) .
- Atouts : 我们的 (wǒmen de) 护城河是 (hù chéng hé shì) X .
- Cashflow + 痛点 (tòng diǎn) = première question dans 60 sec.
- Au CA : 我必须向各位董事报告一个潜在风险 (wǒ bìxū xiàng gèwèi dǒng shì bàogào yī gè qiánzài fēngxiǎn) .
- Quantifier : 影响可能在 (yǐngxiǎng kěnéng zài) X 之间 (zhī jiān) .
- Mesures : 我们已经采取的 (wǒmen yǐjīng cǎiqǔ de) 措施包括 (cuòshī bāokuò) X.
- Demander : 我建议董事会授权 (wǒ jiànyì dǒng shì huì shòuquán) X.

痛点 (tòng diǎn) est OBSESSIONNEL — articule-le en 1 phrase claire ou le VC zappe.`,
    objectives: [`Articuler son 痛点 en 1 phrase`, `Maîtriser 估值 / 融资 / 护城河`, `Annoncer un 潜在风险 + 已采取措施`, `Demander 授权 du 董事会`],
    flashcards: [`估值`, `融资`, `商业模式`, `痛点`, `护城河`, `董事`, `潜在`, `采取`, `措施`, `授权`],
  },
  "cecr-c12-conversation-m6": {
    title: `Arbitrage interne + keynote internationale`, titleEn: `Internal arbitration + international keynote`,
    duration: 14,
    category: `conversation`,
    difficulty: `superior`,
    introTitle: `经过权衡 + 古人云 — exécutif et orateur international`,
    introContent: `权衡 (quánhéng) montre que tu n'as PAS décidé impulsivement. Pour interprétation simultanée, il faut RALENTIR + faire des pauses entre groupes de 8-10 mots.

- Arbitrage : 我作为公司高层 (wǒ zuò wèi gōngsī gāocéng) ，希望从全局角度看这个问题 (xīwàng cóng quánjú jiǎo dù kàn zhège wèntí) .
- 全局 (quánjú) = mot-clé.
- Reformuler chaque dept : 销售部担心的 (xiāoshòu bù dānxīn de) 是 (shì) X，研发部坚持的 (yánfā bù jiānchí de) 是 (shì) Y.
- Bien commun : 双方的 (shuāngfāng de) 目标都是公司的 (mù biāo dōu shì gōngsī de) 发展 (fāzhǎn) .
- Décision : 经过权衡 (jīngguò quánhéng) ，我决定 (wǒ juédìng) X.
- Keynote internationale : 各位来自世界各地的 (gèwèi láizì shìjiè gèdì de) (gèwèi láizì shìjiè gèdì de) 朋友 (péngyou) ，大家好 (dàjiā hǎo) .
- Citation : 古人云 (gǔ rén yún) X + maxime classique = signal IMMÉDIAT de respect culturel).
- Verbes : 阐述 (chǎnshù) / 揭示 (jiēshì) .
- Ex : 古人云 (gǔ rén yún) ：千里之行 (qiān lǐ zhī háng) ，始于足下 (shǐ yú zú xià) .`,
    objectives: [`Arbitrer avec 经过权衡，我决定 X`, `Mobiliser 全局 + 双方的目标`, `Ouvrir keynote par 古人云 + maxime`, `Adapter le débit pour interprétation simultanée`],
    flashcards: [`高层`, `全局`, `坚持`, `满足`, `权衡`, `古人云`, `启示`, `阐述`, `揭示`, `聆听`],
  },
  "cecr-c12-conversation-m7": {
    title: `Livre blanc + pétition formelle`, titleEn: `White paper + formal petition`,
    duration: 14,
    category: `conversation`,
    difficulty: `superior`,
    introTitle: `本白皮书旨在 X + escalade 呼吁/请求/要求`,
    introContent: `Pétition : 致 (zhì) X (formule épistolaire) → 我们 (wǒmen) ，作为 (zuò wèi) X，对 (duì) Y 表示深切的 (biǎoshì shēnqiè de) 关注 (guānzhù) → escalade des demandes : 呼吁 (hūyù) < 请求 (qǐng qiú) < 要求 (yāoqiú) < 强烈要求 (qiáng liè yāoqiú) . Si tu commences par 强烈要求 (qiáng liè yāoqiú) , tu coupes la marge de discussion — garde l'escalade pour les 2e/3e tours.

- Livre blanc : 摘要 (zhāiyào) → 引言 (yǐn yán) → 现状 (xiànzhuàng) → 分析 (fēnxī) → 政策建议 (zhèngcè jiànyì) → 结论 (jié lùn) → 参考文献 (cānkǎo wénxiàn) .
- Ouverture : 本白皮书旨在探讨 (běn bái pí shū zhǐzài tàntǎo) X + nom = formule consacrée).
- RÈGLE ABSOLUE : JAMAIS « 我 (wǒ) » dans un livre blanc — toujours 笔者 (bǐ zhě) ou « 本研究 (běn yán jiū) ».
- Recommandations : 我们呼吁有关部门采取以下措施 (wǒmen hūyù yǒuguān bùmén cǎiqǔ yǐxià cuòshī) (wǒmen hūyù yǒuguān bùmén cǎiqǔ yǐxià cuòshī).
- Multi-signature : 联署 (lián shǔ) .`,
    objectives: [`Ouvrir par 本白皮书旨在探讨 X`, `Bannir 我 du livre blanc (utiliser 笔者)`, `Hiérarchiser 呼吁/请求/要求`, `Co-signer avec 联署`],
    flashcards: [`白皮书`, `摘要`, `引言`, `探讨`, `笔者`, `致`, `深切`, `关注`, `强烈`, `联署`],
  },
  "cecr-c12-nuances-m1": {
    title: `实现/完成/达成 + 建议/提议/倡议`, titleEn: `实现/完成/达成 + 建议/提议/倡议`,
    duration: 14,
    category: `vocabulary`,
    difficulty: `superior`,
    introTitle: `Réaliser un rêve / suggérer une initiative — 6 verbes en duo`,
    introContent: `完成任务 (wánchéng rèn wù) ) < 实现 (shíxiàn) < 达成 (dáchéng) (collaboratif — 达成共识).

- Erreur classique : 完成梦想 (wánchéng mèng xiǎng) ✗ → 实现梦想 (shíxiàn mèng xiǎng) ✓.

建议 (jiànyì) (universel — 我建议你 X) < 提议 (tíyì) (proposition formelle en réunion — 我 提议投票 ) < 倡议一路倡议 (chàngyì yílù chàngyì) ). Dans un white paper / discours politique, dire « 我们倡议 (wǒmen chàngyì) X » transforme une suggestion en MOUVEMENT collectif avec aura symbolique. Le diplomatique chinois utilise 倡议 (chàngyì) stratégiquement.`,
    objectives: [`Mémoriser 实现梦想 / 完成任务 / 达成共识`, `Hiérarchiser 建议 → 提议 → 倡议`, `Lancer une 倡议 publique`, `Voter sur une 提议 en réunion`],
    flashcards: [`实现`, `完成`, `达成`, `梦想`, `协议`, `建议`, `提议`, `倡议`, `投票`, `一带一路`],
  },
  "cecr-c12-nuances-m2": {
    title: `保持/维持/维护 + 破坏/摧毁/损害`, titleEn: `保持/维持/维护 + 破坏/摧毁/损害`,
    duration: 14,
    category: `vocabulary`,
    difficulty: `superior`,
    introTitle: `Préserver vs détruire en 6 mots`,
    introContent: `保持安静 (bǎochí ānjìng) ) < 维持 (wéichí) (effort actif anti-chute — 维持秩序) < 维护权利 (wéihù quán lì) ).

- Erreur : 保持权利 (bǎochí quán lì) ✗ → 维护权利 (wéihù quán lì) ✓ (les droits SE DÉFENDENT).

Côté destruction : 损害健康 (sǔnhài jiànkāng) ) < 破坏 (pò huài) < 摧毁信心 (cuī huǐ xìn xīn) ).

- En éditorial / juridique : « 这政策损害了 (zhè zhèngcè sǔnhài le) 消费者利益 (xiāofèizhě lì yì) » est juste ; « 摧毁消费者 (cuī huǐ xiāofèizhě) » serait absurde.
- Le bon registre = crédibilité.`,
    objectives: [`Mémoriser 保持安静 / 维持秩序 / 维护权利`, `Hiérarchiser 损害 → 破坏 → 摧毁`, `Choisir le bon collocataire pour la précision`, `Adapter le registre à l'éditorial juridique`],
    flashcards: [`保持`, `维持`, `维护`, `秩序`, `权利`, `破坏`, `摧毁`, `损害`, `建筑`, `利益`],
  },
  "cecr-c12-nuances-m3": {
    title: `提出/提倡/提升 + 功能/功用/用途`, titleEn: `提出/提倡/提升 + 功能/功用/用途`,
    duration: 14,
    category: `vocabulary`,
    difficulty: `superior`,
    introTitle: `Trois 提 + trois manières d'utiliser`,
    introContent: `提出 (tí chū) ≠ 提倡 (tíchàng) (prôner moralement — 提倡环保) ≠ 提升能力 (tíshēng néng lì) ).

- Combo CV chinois C1 : 提升团队的 (tíshēng tuánduì de) 执行能力 (zhíxíng néng lì) (élever la capacité d'exécution).

Côté usage : 功能部手机有很多功能 (gōngnéng bù shǒujī yǒu hěn duō gōngnéng) (gōngnéng bù shǒujī yǒu hěn duō gōngnéng)) ≠ 功用种药的 (gōng yòng zhǒng yào de) 功用是 (gōng yòng shì) X) ≠ 用途房间的 (yòngtú fángjiān de) 用途是 (yòngtú shì) X).

- En description produit chinoise : « 多功能 (duō gōngnéng) + 多用途 (duō yòngtú) » = combo marketing classique.

Multi-fonction = peut faire X choses ; multi-usage = peut être utilisé dans X contextes.`,
    objectives: [`Distinguer 提出 / 提倡 / 提升`, `Maîtriser 提升团队的执行能力`, `Choisir 功能 / 功用 / 用途`, `Maîtriser combo marketing 多功能多用途`],
    flashcards: [`提出`, `提倡`, `提升`, `环保`, `能力`, `功能`, `功用`, `用途`, `系统`, `药`],
  },
  "cecr-c12-nuances-m4": {
    title: `便利/方便/便捷 + 依据/凭借/依靠`, titleEn: `便利/方便/便捷 + 依据/凭借/依靠`,
    duration: 14,
    category: `vocabulary`,
    difficulty: `superior`,
    introTitle: `Pratique en 3 saveurs + 3 manières de s'appuyer`,
    introContent: `方便 (fāngbiàn) < 便利 (biànlì) < 便捷 (biànjié). En 2026, 便捷 (biànjié) est le mot-clé du marketing digital chinois (便捷的 支付方式 ). PIÈGE social : « 您方便一下 (nín fāngbiàn yíxià) » est ambigu et peut sonner comme aller aux toilettes — préfère « 您方便的 (nín fāngbiàn de) 时候 (shíhou) ». 依据法律 (yījù fǎlǜ) ) ≠ 凭借 (píng jiè) (atout personnel — 凭借自己的 努力 ) ≠ 依靠父母 (yīkào fùmǔ) ). Pour un cadre, mettre en avant 凭借 (píng jiè) > 依靠 (yīkào) — culturellement TRÈS valorisé.`,
    objectives: [`Choisir 方便 / 便利 / 便捷 par registre`, `Éviter le piège « 您方便一下 »`, `Hiérarchiser 依据 / 凭借 / 依靠`, `Mettre en avant 凭借自己的努力 en CV`],
    flashcards: [`方便`, `便利`, `便捷`, `便利店`, `支付`, `依据`, `凭借`, `依靠`, `法律`, `努力`],
  },
  "cecr-c12-nuances-m5": {
    title: `减少/减轻/削减 + 增加/提高/增长`, titleEn: `减少/减轻/削减 + 增加/提高/增长`,
    duration: 14,
    category: `vocabulary`,
    difficulty: `superior`,
    introTitle: `Réduire/augmenter avec précision économique`,
    introContent: `减轻负担 (jiǎnqīng fùdān) ) < 减少污染 (jiǎnshǎo wū rǎn) ) < 削减 (xuējiǎn) (sabrer brutal — 削减预算). Quand un dirigeant chinois dit « 我们将削减预算 (wǒmen jiāng xuējiǎn yùsuàn) (wǒmen jiāng xuējiǎn yùsuàn) » plutôt que « 减少预算 (jiǎnshǎo yùsuàn) », il signale FERMETÉ et choix difficile. Côté augmentation : 增加加预算 (zēng jiā jiā yùsuàn) ) ≠ 提高 (tígāo) (niveau qualitatif — 提高效率) ≠ 增长 (zēng cháng) (croissance continue — 经济增长).

- Erreur : 提高人口 (tígāo rén kǒu) ✗ → 增长人口 (zēng cháng rén kǒu) ✓ ou 增加人口 (zēng jiā rén kǒu) ✓.

La population a une CROISSANCE, pas une qualité élevée.

- 3 collocations C1 inséparables : 增加预算 (zēng jiā yùsuàn) , 提高效率 (tígāo xiàolǜ) , 经济增长 (jīngjì zēng cháng) .`,
    objectives: [`Hiérarchiser 减轻 → 减少 → 削减`, `Décoder le signal politique de 削减`, `Distinguer 增加 (quantité) / 提高 (niveau) / 增长 (continu)`, `Mémoriser 3 collocations économiques inséparables`],
    flashcards: [`减少`, `减轻`, `削减`, `负担`, `预算`, `增加`, `提高`, `增长`, `效率`, `人口`],
  },
  "cecr-c12-nuances-m6": {
    title: `来往/往来/交往 + 经历/经验/阅历`, titleEn: `来往/往来/交往 + 经历/经验/阅历`,
    duration: 14,
    category: `vocabulary`,
    difficulty: `superior`,
    introTitle: `Relations + expérience en 3 dimensions`,
    introContent: `来往 (lái wǎng) (mouvement / contact ponctuel — 街上来往的 人很多 ) < 交往 (jiāo wǎng) (relation suivie — 他们交往多年 (tāmen jiāo wǎng duō nián) (tāmen jiāo wǎng duō nián), ATTENTION : 我们在交往 (wǒmen zài jiāo wǎng) = couple officiel) < 往来 (wǎnglái) . Pour dire « on se voit / on est en contact », préfère « 我们有联系 (wǒmen yǒu liánxì) » ou « 我们经常见面 (wǒmen jīngcháng jiànmiàn) (wǒmen jīngcháng jiànmiàn) » pour éviter l'ambiguïté romantique. Expérience : 经历忘的 (jīnglì wàng de) 经历 (jīnglì) ) < 经验 (jīngyàn) (savoir-faire pro — 5 年的 经验 ) < 阅历 (yuèlì) (sagesse de vie — 阅历丰富). Compliment soutenu pour un senior : « 您阅历丰富 (nín yuèlì fēngfù) ，希望能给我一些指点 (xīwàng néng gěi wǒ yìxiē zhǐdiǎn) (xīwàng néng gěi wǒ yìxiē zhǐdiǎn) » — 阅历 (yuèlì) reconnaît la SAGESSE, flatte mieux que 经验 (jīngyàn) .`,
    objectives: [`Éviter ambiguïté romantique de 交往`, `Réserver 往来 au commercial/diplomatique`, `Distinguer 经历 / 经验 / 阅历`, `Complimenter un senior avec 阅历丰富`],
    flashcards: [`来往`, `往来`, `交往`, `商业`, `国家`, `经历`, `经验`, `阅历`, `难忘`, `丰富`],
  },
  "cecr-c12-nuances-m7": {
    title: `品质/质量/素质 + 毫无/丝毫/一点`, titleEn: `品质/质量/素质 + 毫无/丝毫/一点`,
    duration: 14,
    category: `vocabulary`,
    difficulty: `superior`,
    introTitle: `Qualité (objet/produit/personne) + négations soutenues`,
    introContent: `质量质量好 (zhì liàng zhì liàng hǎo) ) < 品质品质产品 (pǐn zhì pǐn zhì chǎnpǐn) / 优秀的 (yōu xiù de) 品质 (pǐn zhì) ) < 素质 (sùzhì) (humain civique — 国民素质). Erreur : 这个人质量好 (zhège rénzhì liàng hǎo) ✗ → 这个人素质高 (zhège rén sùzhì gāo) ✓. « 国民素质 (guómín sùzhì) » est UN CONCEPT débattu en Chine — englobe éducation, politesse, comportement public. « 我们需要提高素质 (wǒmen xūyào tígāo sùzhì) (wǒmen xūyào tígāo sùzhì) » est socialement NOBLE. Négations soutenues : 一点 (yīdiǎn) < 丝毫的 (sīháo de) 怀疑 (huáiyí) ) < 毫无 (háo wú) / 毫无希望 (háo wú xīwàng) / 毫无说服力 (háo wú shuōfú lì) ). Pour réfuter en débat C1+ : « 您的 (nín de) 论点毫无说服力 (lùn diǎn háo wú shuōfú lì) » — combo percutant SANS insulte directe.`,
    objectives: [`Distinguer 质量 (matériel) / 品质 (noble) / 素质 (humain civique)`, `Mobiliser 国民素质 dans le débat civique`, `Hiérarchiser 一点 → 丝毫 → 毫无`, `Réfuter avec 毫无说服力`],
    flashcards: [`质量`, `品质`, `素质`, `产品`, `国民`, `一点`, `丝毫`, `毫无`, `怀疑`, `道理`],
  },
  "cecr-c21-wenyan-intro-m1": {
    title: `Pourquoi et comment le 文言文`, titleEn: `Why and how of 文言文`,
    duration: 12,
    category: `reading`,
    difficulty: `superior`,
    introTitle: `Le chinois classique : 2 500 ans de littérature en un mode`,
    introContent: `文言文 (wén yán wén) est la langue écrite du monde chinois depuis Confucius (Ve siècle av. JC) jusqu'à la réforme de 1919. Caractéristiques : un seul caractère = un mot (vs bi-syllabes modernes), pas de ponctuation (ajoutée au XXe siècle), grammaire ultra-concise. Lire un poème Tang, un édit impérial, une pensée bouddhiste passe par le 文言 (wén yán) . Même le chinois moderne cite : 学而不厌 (xué ér bù yàn) , 知之为知之 (zhī zhī wèi zhī zhī) (« savoir ce qu'on sait »). Difficulté principale : polysémie — un caractère peut signifier 10 choses selon contexte. Approche : lire lentement, chercher les particules d'articulation (之 , 者 , 也 , 乎 , 於 ), repérer le verbe.`,
    objectives: [`Situer le 文言 historiquement`, `Comprendre « 1 caractère = 1 mot »`, `Repérer particules 之/者/也/乎`, `Lire lentement en contexte`],
    flashcards: [`文言文`, `之`, `者`, `也`, `乎`, `於`],
  },
  "cecr-c21-wenyan-intro-m2": {
    title: `Particules 之 / 者 / 所 / 所以`, titleEn: `Particles 之 / 者 / 所 / 所以`,
    duration: 12,
    category: `reading`,
    difficulty: `superior`,
    introTitle: `Les 4 particules qui articulent le 文言`,
    introContent: `之 (zhī) : 3 usages — (1) 的 (de) déterminatif : 孔子之书 (kǒng zi zhī shū) (« les livres DE Confucius »), (2) pronom objet 3e personne : 爱之 (ài zhī) (« aimer [quelqu'un] ») et (3) verbe « aller » : 之于 (zhī yú) X (« se rendre à X »). 者 (zhě) : nominalisateur — 善者 (shàn zhě) (« celui qui est bon », « le bien »), 古之学者 (gǔ zhī xuézhě) (« les lettrés d'autrefois »). 所 (suǒ) : forme passive « ce qui est » — 所爱 (suǒ ài) (« ce qui est aimé, l'être aimé »), 所闻 (suǒ wén) (« ce qu'on entend »). 所以 (suǒyǐ) : « ce par quoi », cause ou moyen — 所以然 (suǒyǐ rán) (« la raison pour laquelle [c'est ainsi] »). Astuce pédagogique : en 文言 (wén yán) , là où le chinois moderne dirait 的 (de) , il y a souvent 之 (zhī) ; là où on dirait « la chose qui… », il y a 所 (suǒ) .`,
    objectives: [`Démêler les 3 usages de 之`, `Nominaliser avec 者`, `Former passif avec 所`, `Utiliser 所以 pour la cause`],
    flashcards: [`之`, `者`, `所`, `所以`, `爱`, `善`],
  },
  "cecr-c21-wenyan-intro-m3": {
    title: `Finales 也 / 矣 / 乎 / 哉`, titleEn: `Finals 也 / 矣 / 乎 / 哉`,
    duration: 12,
    category: `reading`,
    difficulty: `superior`,
    introTitle: `Les finales : ponctuation interne du 文言`,
    introContent: `Les finales 文言 (wén yán) fonctionnent comme ponctuation + nuance : 也 (yě) marque une affirmation définitionnelle — 仁者 (rén zhě) ，爱人也 (àiren yě) (« Être humain, c'est aimer les autres »). 矣 (yǐ) marque un état accompli ou un jugement final — 此之谓大丈夫矣 (cǐ zhī wèi dà zhàngfu yǐ) (« voilà ce qui s'appelle un vrai homme »). 乎 (hū) = particule interrogative ou d'exclamation — 学而时习之 (xué ér shí xí zhī) ，不亦说乎 (bù yì shuō hū) ? (« n'est-ce pas réjouissant d'apprendre et de revoir régulièrement? »), célèbre incipit des Analectes. 哉 (zāi) marque une exclamation admirative — 善哉 (shàn zāi) ! (« comme c'est bien! »). Dans un texte 文言 (wén yán) sans virgules, ces finales sont VOS virgules et points.

- Les repérer = découper la phrase.`,
    objectives: [`Reconnaître 也 comme affirmation def.`, `Identifier 矣 comme aspect accompli`, `Poser question avec 乎`, `Exclamer avec 哉`],
    flashcards: [`也`, `矣`, `乎`, `哉`, `仁`, `善`],
  },
  "cecr-c21-wenyan-intro-m4": {
    title: `Lire un passage : 《论语》学而第一`, titleEn: `Reading a passage: 《论语》Book 1`,
    duration: 12,
    category: `reading`,
    difficulty: `superior`,
    introTitle: `子曰 : lire Confucius en VO`,
    introContent: `Les 《论语 (lùn yǔ) 》 s'ouvrent par : 子曰 (zi yuē) ：「学而时习之 (xué ér shí xí zhī) ，不亦说乎 (bù yì shuō hū) ? 有朋自远方来 (yǒu péng zì yuǎnfāng lái) ，不亦乐乎 (búyìlèhū) ? 人不知而不愠 (rén bù zhī ér bù yùn) ，不亦君子乎 (bù yì jūnzǐ hū) ?」 (« Le Maître dit : Apprendre et le revoir en temps voulu, n'est-ce pas une joie? Avoir un ami qui vient de loin, n'est-ce pas un bonheur? N'être point reconnu des hommes et ne pas s'en offusquer, n'est-ce pas être un homme de bien? »). Vocabulaire clé : 子 (zi) (zǐ, le Maître), 曰 (yuē) en 文言 (wén yán) ), 时习 (shí xí) , 朋 (péng) , 愠 (yùn) (yùn, se fâcher intérieurement), 君子 (jūnzǐ) . Ce passage est appris par cœur par tous les écoliers chinois. Il illustre les finales 乎 (hū) / 之 (zhī) étudiées.`,
    objectives: [`Lire le 1er paragraphe des 论语`, `Identifier 子曰/君子/朋`, `Repérer 乎 triple interrogation`, `Mémoriser cette ouverture`],
    flashcards: [`论语`, `子曰`, `学而时习之`, `君子`, `朋`, `远方`, `愠`],
  },
  "cecr-c21-philo-classique-m1": {
    title: `儒家 : Confucius et l'éthique sociale`, titleEn: `儒家: Confucius and social ethics`,
    duration: 12,
    category: `culture`,
    difficulty: `superior`,
    introTitle: `孔子 : le maître qui a structuré 2500 ans`,
    introContent: `孔子 (kǒng zi) (Kǒngzǐ, Confucius, -551 → -479) est le fondateur du 儒家 (rú jiā) . Valeurs cardinales : 仁 (rén) , 义 (yì) , 礼 (lǐ) , 智 (zhì) , 信 (xìn) . Les cinq sont les 五常 (wǔ cháng) (wǔcháng, 5 vertus constantes). Relations sociales = 五伦 (wǔ lún) : souverain-sujet, père-fils, mari-femme, aîné-cadet, ami-ami. Chaque rôle a des devoirs.

- 孝 (xiào) reste fondamental.
- Texte : 《论语 (lùn yǔ) 》rassemble les paroles de Confucius.
- Héritier majeur : 孟子 (mèng zi) (Mèngzǐ, Mencius, -372 → -289).

Aujourd'hui, le confucianisme est réhabilité officiellement en Chine.`,
    objectives: [`Connaître 孔子 et ses dates`, `Lister 仁义礼智信 (五常)`, `Nommer 五伦`, `Distinguer 孔子 vs 孟子`],
    flashcards: [`儒家`, `孔子`, `仁`, `义`, `礼`, `智`, `信`, `孝`, `论语`, `孟子`],
  },
  "cecr-c21-philo-classique-m2": {
    title: `道家 : Laozi, Zhuangzi et le 无为`, titleEn: `道家: Laozi, Zhuangzi and 无为`,
    duration: 12,
    category: `culture`,
    difficulty: `superior`,
    introTitle: `道 : ce qu'on ne peut nommer`,
    introContent: `道家 (dào jiā) est fondée par 老子 (lǎo zi) dans le 《道德经 (dàodé jīng) 》(Dàodéjīng, Livre de la Voie et de la Vertu) — texte de 81 chapitres qui s'ouvre par : 道可道 (dào kě dào) ，非常道 (fēicháng dào) (« la Voie qu'on peut nommer n'est pas la Voie éternelle »).

- Concept central : 道 (dào) (dào, la Voie, principe indifférencié).
- Autre concept majeur : 无为 (wú wèi) (wúwéi, non-agir — agir selon le naturel sans forcer).

庄子 (zhuāng zi) développe le taoïsme avec des paraboles . Contraste 儒 (rú) vs 道 (dào) : ordre social vs spontanéité naturelle — deux pôles complémentaires de l'âme chinoise.`,
    objectives: [`Lire 道可道非常道`, `Comprendre 无为`, `Distinguer 老子 vs 庄子`, `Opposer 儒/道 complémentairement`],
    flashcards: [`道家`, `老子`, `庄子`, `道`, `无为`, `道德经`, `庄周梦蝶`],
  },
  "cecr-c21-philo-classique-m3": {
    title: `法家 : l'école légiste`, titleEn: `法家: the Legalist school`,
    duration: 12,
    category: `culture`,
    difficulty: `superior`,
    introTitle: `法家 : gouverner par la loi, pas par la vertu`,
    introContent: `法家 (fǎ jiā) s'oppose au confucianisme : les hommes sont naturellement mauvais, donc gouverner par la loi fǎ), la stratégie politique et la position de pouvoir .

- Théoriciens : 商鞅 (shāng yāng) (Shāng Yāng, IVe s. av. JC, réforma le royaume de Qin), 韩非 (hán fēi) (Hán Fēi, IIIe s. av. JC, synthèse définitive dans 《韩非 子 》).

Application historique : le Qin qui unifia la Chine en -221 appliqua rigoureusement le légisme — efficacité militaire redoutable, mais dynastie qui ne dura que 15 ans. Depuis, la Chine oscille entre 儒表法里 (rú biǎo fǎ lǐ) (« confucéen en façade, légiste à l'intérieur »). Le légisme reste pertinent pour comprendre la gouvernance contemporaine.`,
    objectives: [`Définir 法家 par 法/术/势`, `Citer 商鞅 et 韩非`, `Relier légisme au Qin -221`, `Expliquer 儒表法里`],
    flashcards: [`法家`, `商鞅`, `韩非`, `法`, `术`, `势`, `儒表法里`],
  },
  "cecr-c21-philo-classique-m4": {
    title: `佛教 : l'arrivée du bouddhisme`, titleEn: `佛教: the arrival of Buddhism`,
    duration: 12,
    category: `culture`,
    difficulty: `superior`,
    introTitle: `佛 : la Voie venue d'Inde`,
    introContent: `佛教 (fó jiāo) entre en Chine par la Route de la Soie au Ier siècle de notre ère. Sinisation progressive : le chan 禅 (chán) naît de la rencontre 佛 (fó) + 道 (dào) . Concepts clés : 佛 (fó) (fó, Bouddha — « l'Éveillé »), 菩萨 (púsà) , 轮回 (lún huí) , 业 (yè) , 因果 (yīn guǒ) . Pratique : 念佛 (niàn fó) (niànfó, réciter le nom du Bouddha), 烧香 (shāo xiāng) , 磕头 (kē tóu) . Sites : 少林寺 (shǎo lín sì) , 白马寺 (bái mǎ sì) (Báimǎsì, Temple du Cheval Blanc — le premier). Trois écoles : 净土 (jìng tǔ) (Jìngtǔ, Terre Pure — la plus populaire), 禅宗 (chán zōng) , 密宗 (mì zōng) . Aujourd'hui cohabite avec 道教 (dào jiāo) et christianisme en pleine croissance.`,
    objectives: [`Dater l'entrée du 佛教 (Ier s.)`, `Définir 佛/菩萨/轮回/业`, `Distinguer 净土/禅宗/密宗`, `Relier 禅 à Zen japonais`],
    flashcards: [`佛教`, `佛`, `菩萨`, `轮回`, `业`, `禅`, `净土`, `少林寺`],
  },
  "cecr-c21-poetry-m1": {
    title: `Les formes poétiques : 绝句 et 律诗`, titleEn: `Poetic forms: 绝句 and 律诗`,
    duration: 12,
    category: `culture`,
    difficulty: `superior`,
    introTitle: `La grammaire invisible de la poésie chinoise`,
    introContent: `La poésie classique se joue sur quelques formes codifiées.

- 绝句 (jué jù) : 4 vers, chacun de 5 ) ou 7 ) caractères.

律诗 (lǜ shī) : 8 vers, 5 ou 7 caractères, avec contraintes strictes de ton et d'antithèse entre vers 3-4 et 5-6. 词 (cí) (cí, « mot », genre né sous les Tang et épanoui sous les Song) suit une mélodie cípái) avec nombre de caractères et de tons fixés par mélodie. Rimer en chinois classique : ce sont les tons ) en fin de vers qui riment, en général les vers pairs. Lire un poème = ne rien comprendre à la 1re lecture puis tout comprendre à la 5e grâce aux images.`,
    objectives: [`Distinguer 绝句 vs 律诗`, `Connaître 5字 et 7字`, `Comprendre 平/仄 rimique`, `Présenter 词 et 词牌`],
    flashcards: [`绝句`, `律诗`, `词`, `词牌`, `平`, `仄`],
  },
  "cecr-c21-poetry-m2": {
    title: `李白 : le poète errant et ivre`, titleEn: `李白: the wandering and drunken poet`,
    duration: 12,
    category: `culture`,
    difficulty: `superior`,
    introTitle: `李白 (701-762) : 诗仙 — l'Immortel de la poésie`,
    introContent: `李白 (lǐ bái) est la figure emblématique de la poésie chinoise, surnommé 诗仙 (shī xiān) (shīxiān, Immortel de la poésie), fasciné par le vin et les voyages. Le quatrain le plus célèbre de toute la littérature chinoise : 《静夜思 (jìng yè sī) 》(Jìngyè sī, « Pensée d'une nuit paisible ») — 床前明月光 (chuáng qián míng yuèguāng) ，疑是地 (yí shì de) 上霜 (shàng shuāng) 。举头望明月 (jǔ tóu wàng míng yuè) ，低头思故乡 (dītóu sī gùxiāng) 。(« Devant mon lit la clarté de la lune / Je crois d'abord qu'il s'agit de givre sur le sol. / Je lève la tête, je regarde la lune brillante / Je baisse la tête, je pense au pays natal. ») Chaque écolier chinois le connaît.

- Thèmes : lune 月 (yuè) , vin 酒 (jiǔ) , nostalgie 思乡 (sī xiāng) , voyage.
- Style : libre, imagé, musical, cosmique.

Contraste avec Du Fu, plus grave et politique.`,
    objectives: [`Connaître 李白 (701-762)`, `Réciter 《静夜思》`, `Identifier thèmes : lune/vin/nostalgie`, `Opposer 诗仙 vs 诗圣`],
    flashcards: [`李白`, `诗仙`, `静夜思`, `明月`, `故乡`, `思乡`],
  },
  "cecr-c21-poetry-m3": {
    title: `杜甫 : 诗圣, poète du peuple`, titleEn: `杜甫: 诗圣, poet of the people`,
    duration: 12,
    category: `culture`,
    difficulty: `superior`,
    introTitle: `杜甫 (712-770) : la souffrance rendue belle`,
    introContent: `杜甫 (dù fǔ) , contemporain et ami de Li Bai, mais esprit opposé : grave, politique, ancré dans la souffrance historique. Surnommé 诗圣 (shī shèng) (shīshèng, Saint de la poésie). Vit la rébellion d'An Lushan (755-763) qui bouleverse la dynastie Tang, et en fait l'un des grands sujets de son œuvre. Son vers le plus cité : 国破山河在 (guó pò shān hé zài) (« L'État est brisé, montagnes et fleuves demeurent ») dans 《春望 (chūn wàng) 》.

- Style : rigoureux, contraint, plein de résonance historique.
- Thèmes : guerre, pauvreté, solidarité.

Ce contraste 李白 (lǐ bái) -杜甫 (dù fǔ) structure la conscience poétique chinoise : le ciel (Li) et la terre (Du), le génie vagabond et la conscience morale.`,
    objectives: [`Connaître 杜甫 (712-770)`, `Citer 国破山河在`, `Situer la rébellion d'An Lushan`, `Opposer 杜 grave à 李 libre`],
    flashcards: [`杜甫`, `诗圣`, `春望`, `国破山河在`, `安禄山`],
  },
  "cecr-c21-poetry-m4": {
    title: `李清照 : la grande voix féminine`, titleEn: `李清照: the great female voice`,
    duration: 12,
    category: `culture`,
    difficulty: `superior`,
    introTitle: `李清照 (1084-1155) : la poétesse Song`,
    introContent: `李清照 (lǐ qīng zhào) est la plus grande voix féminine de la poésie chinoise, spécialiste du 词 (cí) . Éduquée dans une famille lettrée, elle écrit avec une sensibilité inédite — joies conjugales, puis deuil et exil après l'invasion Jürchen (1127). Son 词 (cí) le plus cité : 《声声慢 (shēng shēng màn) 》 ouvre sur 寻寻觅觅 (xún xúnmì mì) ，冷冷清清 (lěng lěng qīng qīng) ，凄凄惨惨戚戚 (qī qī cǎn cǎn qī qī) (« Je cherche et cherche, froid et désolation, triste, triste, navrante… ») — 14 caractères redoublés qui construisent un climat de détresse sans équivalent. On l'appelle 千古第一才女 (qiān gǔ dì yī cái nǚ) (« la première femme de génie à travers les siècles »). Elle prouve que la littérature classique chinoise, malgré la société confucéenne, a fait place à des voix féminines d'exception.`,
    objectives: [`Connaître 李清照 (1084-1155)`, `Réciter l'ouverture de 声声慢`, `Comprendre 千古第一才女`, `Situer l'invasion Jürchen (1127)`],
    flashcards: [`李清照`, `声声慢`, `寻寻觅觅`, `千古第一才女`, `词`],
  },
  "cecr-c21-conversation-m1": {
    title: `Conférence philosophique + citer un classique`, titleEn: `Philosophy conference + cite a classic`,
    duration: 14,
    category: `conversation`,
    difficulty: `superior`,
    introTitle: `拙见 + 斧正 — humilité maximale en académique`,
    introContent: `Pour ancrer un propos dans la tradition, il faut construire un pont entre passé et présent — signal de maturité intellectuelle.

- Conférence : 各位学者 (gèwèi xuézhě) ，今天我想就 (jīntiān wǒ xiǎng jiù) X 这一议题展开论述 (zhè yī yìtí zhǎnkāi lùnshù) (zhè yī yìtí zhǎnkāi lùnshù).
- Vocab philosophique : 论述 (lùnshù) , 阐释 (chǎnshì) , 释义 (shì yì) , 注疏 (zhù shū) .
- Citation : 朱熹 (zhū xī) 《四书章句集注 (sì shū zhāng jù jí zhù) 》中说 (zhōng shuō) X.
- Conclure : 此乃笔者之拙见 (cǐ nǎi bǐ zhě zhī zhuō jiàn) ，敬请各位斧正 (jìngqǐng gèwèi fǔ zhèng) .
- Citer un classique : 《论语 (lùn yǔ) 》有云 (yǒu yún) ：« X » .
- Verbes : 云 (yún) , 曰 (yuē) , 据载 (jù zài) .
- Pour ancrer : 这句古训放在今天依然有现实意义 (zhè jù gǔ xùn fàng zài jīntiān yīrán yǒu xiànshí yìyì) (le pont passé ↔ présent = signal de maturité intellectuelle).`,
    objectives: [`Ouvrir conférence avec 论述 + 各位学者`, `Conclure par 拙见 + 斧正`, `Citer un classique avec 云/曰/据载`, `Ancrer une citation au présent`],
    flashcards: [`论述`, `阐释`, `释义`, `拙见`, `斧正`, `云`, `曰`, `据载`, `古训`, `现实`],
  },
  "cecr-c21-conversation-m2": {
    title: `Débat littéraire + recommander une œuvre`, titleEn: `Literary debate + recommend a work`,
    duration: 14,
    category: `conversation`,
    difficulty: `superior`,
    introTitle: `见仁见智 — clore élégamment + situer dans une école`,
    introContent: `Pour montrer sa culture littéraire, il faut savoir situer une œuvre dans son école et son époque.

- Débat critique : 文学价值 (wénxué jià zhí) , 艺术成就 (yìshù chéngjiù) , 主题深度 (zhǔtí shēn dù) , 笔触 (bǐ chù) .
- Désaccord élégant : 我对您的 (wǒ duì nín de) 看法有些不同 (kànfǎ yǒuxiē bù tóng) ，我认为 (wǒ rènwéi) X 反而是 (fǎn'ér shì) Y.
- Combo soutenu : 诚然 (chéng rán) X，然而 (rán ér) Y.
- Conclure : 文学评论本就见仁见智 (wénxué píng lùn běn jiù jiànrén-jiànzhì) (chengyu CLÔTURE — ni toi ni moi n'avons tort).
- Recommander : 这部作品属于 (zhè bù zuò pǐn shǔyú) X 流派 (liúpài) .
- Écoles : 朦胧诗派 (ménglóng shī pài) , 寻根派 (xún gēn pài) , 先锋派 (xiānfēng pài) .
- Auteurs C2 : 莫言 (mò yán) (Nobel 2012), 余华着 (yú huá zhe) 》), 阎连科 (yán lián kē) , 王小波 (wáng xiǎo bō) .
- Justifier : 这部作品的 (zhè bù zuò pǐn de) 价值在于 (jià zhí zàiyú) X.

Pour montrer ta culture : SITUE l'œuvre dans son école (« 余华属于先锋派 ，但 70 年代后转向了 xiàng le) 人文写实 (rénwén xiě shí) »).`,
    objectives: [`Désaccord élégant avec 我倒认为`, `Clore par 见仁见智`, `Situer une œuvre dans son 流派`, `Nommer 莫言/余华/阎连科/王小波`],
    flashcards: [`文学`, `成就`, `深度`, `笔触`, `见仁见智`, `流派`, `朦胧`, `寻根`, `先锋`, `深思`],
  },
  "cecr-c21-conversation-m3": {
    title: `Traduction zh↔fr + traduire un poème classique`, titleEn: `zh↔fr translation + translate a classical poem`,
    duration: 14,
    category: `conversation`,
    difficulty: `superior`,
    introTitle: `信达雅 + 传神 — théorie et pratique de la traduction`,
    introContent: `La traduction est une recréation : 翻译本就是一种再创作 (fānyì běn jiùshì yī zhǒng zài chuàngzuò) (fānyì běn jiùshì yī zhǒng zài chuàngzuò). La théorie classique de Yan Fu ) pose : 信达雅 (xìn dá yǎ) .

- Traduction : 直译 (zhí yì) vs 意译 (yì yì) .
- 我倾向于意译 (wǒ qīngxiàng yú yì yì) ，因为直译会损失 (yīnwèi zhí yì huì sǔnshī) X 的 (de) 意境 (yì jìng) .
- 意境 (yì jìng) = mot-clé INTRADUISIBLE.
- Poème classique : 五言 (wǔ yán) /七言 (qī yán) , 平仄 (píng zè) , 对仗 (duì zhàng) .
- Méthode en 5 étapes : lire à voix haute → compter → rimes → images → restituer.
- Adage : 译诗须传神 (yì shī xū chuán shén) ，不必拘泥于字面 (búbì jū ní yú zì miàn) (transmettre l'esprit > la lettre).
- 传神 (chuán shén) = mot-clé.`,
    objectives: [`Citer 信达雅 (théorie Yan Fu)`, `Défendre 意译 par 意境`, `Identifier 五言/七言, 对仗`, `Mobiliser 译诗须传神，不必拘泥于字面`],
    flashcards: [`译者`, `直译`, `意译`, `意境`, `再创作`, `五言`, `对仗`, `意象`, `传神`, `拘泥`],
  },
  "cecr-c21-conversation-m4": {
    title: `Philo pratique : appliquer la pensée chinoise + débat`, titleEn: `Applied philosophy: apply Chinese thought + debate`,
    duration: 14,
    category: `conversation`,
    difficulty: `superior`,
    introTitle: `中庸之道 + 批判地继承 — sagesse appliquée`,
    introContent: `En éthique confucéenne, le sage CONSEILLE sans décider à la place de l'autre : 但最终的 (dàn zuì zhōng de) 选择还是在您自己 (xuǎnzé háishi zài nín zìjǐ) (xuǎnzé háishi zài nín zìjǐ).

- Conseiller éthique : 道 (dào) , 德 (dé) , 仁 (rén) , 义 (yì) , 中庸 (zhōngyōng) .
- 在我看来 (zài wǒ kànlái) ，您面临的 (nín miàn lín de) lín de) 是一个 (shì yī gè) X 的 (de) 问题 (wèntí) .
- Citer : 孔子曰 (kǒng zi yuē) X / 老子说 (lǎo zi shuō) X.
- Recommandation : 我建议您从 (wǒ jiànyì nín cóng) X 的 (de) 角度看 (jiǎo dù kàn) .
- 中庸 (zhōngyōng) : 也许中庸之道才是答案 (yě xǔ zhōngyōng zhī dào cái shì dá'àn) (peut-être la voie du milieu est la réponse).

Débat confucianisme moderne : pro 思想至今仍有现实意义 (sīxiǎng zhìjīn réng yǒu xiànshí yìyì) — 仁 (rén) , 礼 (lǐ) , 学而时习之 (xué ér shí xí zhī) ) vs critique ne s'adapte plus). Synthèse : 我认为可以批判地 (wǒ rènwéi kěyǐ pīpàn de) (wǒ rènwéi kěyǐ pīpàn de) 继承传统 (jì chéng chuántǒng) (formule maoïste devenue passe-partout).`,
    objectives: [`Conseiller via 道 / 德 / 仁 / 义 / 中庸`, `Respecter l'autonomie : 选择在您自己`, `Mobiliser 中庸之道`, `Synthèse via 批判地继承`],
    flashcards: [`仁`, `义`, `中庸`, `智慧`, `面临`, `孔子`, `思想`, `礼`, `继承`, `批判`],
  },
  "cecr-c21-conversation-m5": {
    title: `Interview presse littéraire + cercle de lecture`, titleEn: `Literary press interview + book club`,
    duration: 14,
    category: `conversation`,
    difficulty: `superior`,
    introTitle: `灵感 + 构思 — parler de son œuvre avec modestie`,
    introContent: `En entretien ou cercle de lecture, la modestie est OBLIGATOIRE : ne jamais s'auto-promouvoir explicitement.

- Interview auteur : 这次的 (zhè cì de) 写作灵感来自 (xiězuò línggǎn láizì) X.
- Process : 我前后修改了 (wǒ qián hòu xiūgǎi le) X 次 (cì) , 我用了 (wǒ yòng le) X 年完成 (nián wánchéng) .
- Sens : 我想表达的 (wǒ xiǎng biǎodá de) 核心思想是 (hé xīnsi xiǎng shì) X.
- Projets : 目前正在构思下一部作品 (mù qián zhèngzài gòusī xià yī bù zuò pǐn) = conception soutenue).
- Modestie : 希望读者能从中获得一些启示 (xīwàng dúzhě néng cóngzhōng huòdé yìxiē qǐshì) (xīwàng dúzhě néng cóngzhōng huòdé yìxiē qǐshì).
- Cercle de lecture : 各位书友 (gèwèi shū yǒu) ，大家好 (dàjiā hǎo) = ami du livre, chaleureux).
- Lancer : 这本书最让您印象深刻的 (zhè běn shū zuì ràng nín yìn xiàng shēn kè de) 是什么 (shì shénme) ?
- Conclure : 谢谢大家的 (xièxie dàjiā de) 精彩分享 (jīngcǎi fēnxiǎng) .

RÈGLE : DÉSIGNE nommément les participants (« 张老师，您怎么看 ? ») — sinon par modestie chinoise, peu osent parler.`,
    objectives: [`Parler d'œuvre via 灵感 + 构思`, `Modestie d'auteur : 获得一些启示`, `Animer un 书友会 (cercle)`, `Désigner nommément les participants`],
    flashcards: [`灵感`, `修改`, `表达`, `构思`, `启示`, `书友`, `印象`, `深刻`, `主题`, `细节`],
  },
  "cecr-c21-conversation-m6": {
    title: `Rhétorique avancée + éloge funèbre`, titleEn: `Advanced rhetoric + eulogy`,
    duration: 14,
    category: `conversation`,
    difficulty: `superior`,
    introTitle: `比喻/排比/反问 + 缅怀 (mémoire des disparus)`,
    introContent: `Figures C2 : 比喻 (bǐyù) , 夸张 (kuā zhāng) , 对偶 (duì ǒu) , 排比 (pái bǐ) , 反问 (fǎnwèn) . Dans un éloge funèbre, la hiérarchie est : VIE 50% > deuil 30% > héritage 20% (inverser = perçu comme déprimant).

- Combo percutant : 排比 (pái bǐ) + 反问 (fǎnwèn) (« 我们要勇敢 ，要坚定 ，要前行 。难道不是吗 ? »).
- Conclusion oratoire : 时不我待 (shí bù wǒ dāi) (chengyu — le temps n'attend pas).
- Éloge funèbre : 悼念 (dào niàn) , 追忆 (zhuī yì) , 缅怀 (miǎnhuái).
- Ouverture OBLIGATOIRE : 今天 (jīntiān) ，我们怀着沉痛的 (wǒmen huái zhe chén tòng de) 着 (zhe) chén 痛 (tòng) de) 心情悼念 (xīn qíng dào niàn) X .
- Évoquer : X 一生致力于 (yī shēng zhìlìyú) Y.
- Inspirer : X 的 (de) 精神将激励我们继续前行 (jīng shén jiāng jī lì wǒmen jìxù qián háng) .
- Conclure : 安息吧 (ān xī ba) ，我们永远怀念您 (wǒmen yǒng yuǎn huái niàn nín) .`,
    objectives: [`Combo 排比 + 反问 oratoire`, `Clore avec 时不我待`, `Éloge avec 沉痛 + 缅怀 + 安息`, `Respecter hiérarchie vie/deuil/héritage`],
    flashcards: [`比喻`, `夸张`, `排比`, `反问`, `时不我待`, `悼念`, `缅怀`, `沉痛`, `激励`, `安息`],
  },
  "cecr-c21-conversation-m7": {
    title: `Essai académique + peer review`, titleEn: `Academic essay + peer review`,
    duration: 14,
    category: `conversation`,
    difficulty: `superior`,
    introTitle: `据笔者所知 + 略显薄弱 — humilité + critique mesurée`,
    introContent: `Dans les critiques académiques, utilise toujours « 略显 (lüè xiǎn) X » (un peu X) plutôt que « 完全 (wán quán) X » — modération qui permet de sauver la face et réviser sans hostilité.

- Essai : 引言 (yǐn yán) → 文献综述 (wénxiàn zōng shù) → 论点 (lùn diǎn) → 论证 (lùnzhèng) → 反驳异议 (fǎnbó yìyì) → 结论 (jié lùn) → 参考文献 (cānkǎo wénxiàn) .
- Ouverture : 自古以来 (zì gǔ yǐlái) ，X 一直是一个重要的话题 (yìzhí shì yī gè zhòngyào dehuà tí) (yìzhí shì yī gè zhòngyào dehuà tí) / 据笔者所知 (jù bǐ zhě suǒ zhī) .
- Thèse : 本文的 (běn wén de) 核心论点是 (hé xīn lùn diǎn shì) X.
- Conclure : 综上所述 (zōng shàng suǒ shù) , 这一发现对 (zhè yī fāxiàn duì) Y 具有重要意义 (jù yǒu zhòngyào yìyì) .
- JAMAIS « 我 (wǒ) » → 笔者 (bǐ zhě) ou « 本研究 (běn yán jiū) ».
- Peer review : 同行评议 (tóngháng píng yì) .
- Catégories : 录用 (lù yòng) / 修改后录用 (xiūgǎi hòu lù yòng) / 拒稿 (jù gǎo) .
- Positives : 本文选题新颖 (běn wén xuǎn tí xīnyǐng) (běn wén xuǎn tí xīnyǐng), 论证严密 (lùnzhèng yánmì) , 文献丰富 (wénxiàn fēngfù) .`,
    objectives: [`Bannir 我 → 笔者/本研究`, `Maîtriser 据笔者所知`, `Distinguer 录用/修改后录用/拒稿`, `Critiquer avec 略显 X (modéré)`],
    flashcards: [`文献`, `综述`, `论证`, `异议`, `据笔者所知`, `同行`, `评议`, `录用`, `严密`, `薄弱`],
  },
  "cecr-c21-nuances-m1": {
    title: `道/德/礼 + 仁/义/信 (vertus confucéennes)`, titleEn: `道/德/礼 + 仁/义/信 (Confucian virtues)`,
    duration: 14,
    category: `vocabulary`,
    difficulty: `superior`,
    introTitle: `Triade fondamentale + 5 vertus cardinales`,
    introContent: `道 (dào) → 德 (dé) → 礼 (lǐ) . Sans 德 (dé) , le 礼 (lǐ) est vide ; sans 礼 (lǐ) , le 德 (dé) est invisible. Triade INDISSOCIABLE. 仁 (rén) , base de tout) / 义 (yì) ) / 礼 (lǐ) / 智 (zhì) / 信 (xìn) ) = 五常 (wǔ cháng) (5 vertus cardinales). « 见义勇为 (jiànyì-yǒngwéi) » est socialement honoré.

- Si un Chinois dit « 这个人没有德 (zhège rén méiyǒu dé) », il dit moralement creux ; « 没有礼 (méiyǒu lǐ) » = mal élevé.

Distinction CRITIQUE pour nuancer un jugement social.`,
    objectives: [`Distinguer 道 (principe) / 德 (vertu) / 礼 (rite)`, `Nommer les 五常 (仁义礼智信)`, `Mobiliser 见义勇为 pour louer`, `Distinguer 没有德 vs 没有礼`],
    flashcards: [`道`, `德`, `礼`, `道德`, `礼仪`, `仁`, `义`, `信`, `智`, `五常`],
  },
  "cecr-c21-nuances-m2": {
    title: `阴阳/五行 + 诗/词/曲 (cosmologie + formes)`, titleEn: `阴阳/五行 + 诗/词/曲 (cosmology + forms)`,
    duration: 14,
    category: `vocabulary`,
    difficulty: `superior`,
    introTitle: `Cosmologie + poésie classique chinoise`,
    introContent: `阴 (yīn) ≠ 阳 (yáng) (masculin/lumineux/chaud/soleil). Ces deux forces sont en flux permanent ). La cosmologie des 五行行 (wǔ háng háng) : 木 (mù) →火 (huǒ) →土 (tǔ) →金 (jīn) →水 (shuǐ) ) avec cycles 相生 (xiāng shēng) / 相克 (xiāng kè) structure médecine, fengshui et calendrier. « 阴阳平衡 (yīn yáng píng héng) » = formule centrale de bien-être. Poésie classique : 诗 (shī) → 词 (cí) (Song, sur mélodie — 苏轼李清 照 ) → 曲汉卿 (qǔ hàn qīng) ). Mnémo : ordre chronologique des dynasties. « 李清照写的 (lǐ qīng zhào xiě de) 词 (cí) » est juste ; « 李清照的 (lǐ qīng zhào de) 诗 (shī) » techniquement faux.`,
    objectives: [`Maîtriser 阴阳 + 五行 (cycles)`, `Mobiliser 阴阳平衡`, `Distinguer 诗 (Tang) / 词 (Song) / 曲 (Yuan)`, `Associer chaque forme à ses auteurs`],
    flashcards: [`阴阳`, `五行`, `相生`, `相克`, `太极`, `诗`, `词`, `曲`, `词牌`, `李白`],
  },
  "cecr-c21-nuances-m3": {
    title: `中庸/中立/中间 + 天下/国家/民族`, titleEn: `中庸/中立/中间 + 天下/国家/民族`,
    duration: 14,
    category: `vocabulary`,
    difficulty: `superior`,
    introTitle: `Milieu philosophique + entité politique chinoise`,
    introContent: `中庸 (zhōngyōng) ≠ 中立 (zhōnglì) ≠ 中间 (zhōngjiān) . « 中庸之道 (zhōngyōng zhī dào) » = compliment intellectuel chinois. Le 中庸 (zhōngyōng) IMPLIQUE un jugement actif ; le 中立 (zhōnglì) est ABSTENTION — confondre les deux est une erreur philo.

- Confondre 中庸 (zhōngyōng) et 中立 (zhōnglì) = erreur philo.

天下 (tiānxià) (« tout-sous-le-ciel », vision impériale, « 天下 兴亡 ，匹夫有责 » — 顾炎武 ) ≠ 国家 (guójiā) ≠ 民族 (mín zú) . Distinction structure tout débat sur l'identité chinoise.`,
    objectives: [`Distinguer 中庸 (vertu) / 中立 (politique) / 中间 (espace)`, `Mobiliser 中庸之道`, `Distinguer 天下 / 国家 / 民族`, `Citer 天下兴亡，匹夫有责`],
    flashcards: [`中庸`, `中立`, `中间`, `保持`, `极端`, `天下`, `国家`, `民族`, `匹夫`, `兴亡`],
  },
  "cecr-c21-nuances-m4": {
    title: `言/而/于 (particules classiques) + 是非/善恶/对错`, titleEn: `言/而/于 (classical particles) + 是非/善恶/对错`,
    duration: 14,
    category: `vocabulary`,
    difficulty: `superior`,
    introTitle: `Grammaire classique + axes du jugement`,
    introContent: `言 (yán) , 名言 (míngyán) , 言之有理 (yán zhī yǒu lǐ) ) / 而 (ér) (et/mais — 学 而时习之 , vivant dans 而且 , 然而 ) / 于 (yú) (à/dans — 出于 , 关于 , 至于 , 由于 ). Citer « 学而时习之 (xué ér shí xí zhī) ，不亦说乎 (bù yì shuō hū) » = signal IMMÉDIAT de niveau lettré. Axes du jugement : 是非 (shìfēi) ≠ 善恶 (shàn è) (bien/mal MORAL — 善有善报，恶有恶报 ) ≠ 对错 (duì cuò) .

- Confondre 是非 (shìfēi) et 善恶 (shàn è) = erreur classique (un fait peut être 是 mais 恶 ).`,
    objectives: [`Reconnaître 言/而/于 dans le classique`, `Citer 学而时习之，不亦说乎`, `Distinguer 是非 (vrai) / 善恶 (bien) / 对错 (juste)`, `Réciter 善有善报，恶有恶报`],
    flashcards: [`言`, `而`, `于`, `言论`, `名言`, `是非`, `善恶`, `对错`, `明辨`, `报`],
  },
  "cecr-c21-nuances-m5": {
    title: `身/心/灵/神 + 天/地/人 (anthropologie chinoise)`, titleEn: `身/心/灵/神 + 天/地/人 (Chinese anthropology)`,
    duration: 14,
    category: `vocabulary`,
    difficulty: `superior`,
    introTitle: `Personne (4 niveaux) + cosmos (3 puissances)`,
    introContent: `身 (shēn) < 心 (xīn) (cœur-esprit, en chinois NON séparé — 心情 , 心思 , 关心 ) < 灵 (líng) ) < 神神 (shén shén) , 神圣 (shénshèng) ). « 身心灵 (shēnxīn líng) » trilogie tendance bien-être moderne (« 我们要追求身心灵的 (wǒmen yào zhuīqiú shēnxīn líng de) (wǒmen yào zhuīqiú shēnxīn líng de) 平衡 (píng héng) »). Cosmos : 天 (tiān) ) / 地 (de) / 人 (rén) (humain MÉDIATEUR cosmologique). 三才 (sān cái) (3 puissances) = 天地人 (tiāndì rén) . « 天时地 (tiān shí de) 利人和 (lì rén hé) » (chengyu : 3 conditions du succès — moment du ciel, avantage de la terre, harmonie humaine).

- Pour louer un succès : « 这是天时地 (zhè shì tiān shí de) 利人和的 (lì rén hé de) 结果 (jié guǒ) ».`,
    objectives: [`Hiérarchiser 身 → 心 → 灵 → 神`, `Maîtriser trilogie 身心灵`, `Comprendre 三才 (天地人)`, `Mobiliser 天时地利人和`],
    flashcards: [`身`, `心`, `灵`, `神`, `心灵`, `天`, `地`, `人`, `三才`, `天命`],
  },
  "cecr-c21-nuances-m6": {
    title: `意境/氛围/风格 + 人格/品格/性格`, titleEn: `意境/氛围/风格 + 人格/品格/性格`,
    duration: 14,
    category: `vocabulary`,
    difficulty: `superior`,
    introTitle: `Atmosphère esthétique + caractère humain`,
    introContent: `氛围的 (fēnwéi de) 氛围 (fēnwéi) ) < 风格 (fēnggé) (style artistique — 这位画家的 风格 ) < 意境 (yì jìng) (atmosphère poétique INTRADUISIBLE, fusion image+décor, concept central de l'esthétique chinoise).

- Compliment ULTIME pour œuvre chinoise : « 这很有意境 (zhè hěn yǒuyì jìng) » (plus puissant que 很美).

Caractère : 性格 (xìng gé) ) < 人格尊严 (réngé zūn yán) ) < 品格 (pǐn gé) ).

- Erreur : 性格高尚 (xìng gé gāoshàng) ✗ → 品格高尚 (pǐn gé gāoshàng) ✓.
- Pour louer un aîné : « 您的 (nín de) 品格让我深受感动 (pǐn gé ràng wǒ shēn shòu gǎndòng) » .`,
    objectives: [`Distinguer 氛围 / 风格 / 意境`, `Complimenter œuvre chinoise par 意境`, `Distinguer 性格 / 人格 / 品格`, `Complimenter aîné par 品格`],
    flashcards: [`意境`, `氛围`, `风格`, `画家`, `节日`, `人格`, `品格`, `性格`, `高尚`, `尊严`],
  },
  "cecr-c21-nuances-m7": {
    title: `智/知/识 + 境界/层次/水平`, titleEn: `智/知/识 + 境界/层次/水平`,
    duration: 14,
    category: `vocabulary`,
    difficulty: `superior`,
    introTitle: `Sagesse + niveau d'être`,
    introContent: `知 (zhī) ) < 识 (shí) (capacité de discernement — 见识 / 识别 ) < 智 (zhì) ). Compliment : « 您是有智慧的 (nín shì yǒu zhìhuì de) 人 (rén) » > « 您知识丰富 (nín zhī shí fēngfù) » (sage > savant). « 增长见识 (zēng cháng jiànshi) » (élargir son expérience) = objectif culturellement valorisé. Niveau : 水平 (shuǐpíng) (mesurable concret — 学习水平) < 层次 (céngcì) (structurel intellectuel — 高层次的 人 ) < 境界 (jìngjiè) (spirituel philosophique — concept profond). Wang Guowei ) a posé les « 三种境界 (sān zhǒng jìngjiè) » de la création : (1) 独上高楼 (dú shàng gāo lóu) ，望尽天涯路 (wàng jǐn tiān yá lù) ; (2) 衣带渐宽终不悔 (yī dài jiàn kuān zhōng bù huǐ) ; (3) 蓦然回首 (mò rán huíshǒu) ，那人却在灯火阑珊处 (nà rén què zài dēng huǒ lán shān chù) .

- Citer = signal C2 lettré.`,
    objectives: [`Hiérarchiser 知 → 识 → 智`, `Complimenter par 智慧 > 知识`, `Hiérarchiser 水平 → 层次 → 境界`, `Mentionner les 三种境界 de Wang Guowei`],
    flashcards: [`智`, `知`, `识`, `智慧`, `见识`, `境界`, `层次`, `水平`, `景仰`, `王国维`],
  },
  "cecr-c22-rhetoric-m1": {
    title: `对偶 : le parallélisme, colonne vertébrale du style`, titleEn: `对偶: parallelism, the backbone of style`,
    duration: 12,
    category: `writing`,
    difficulty: `superior`,
    introTitle: `对偶 (duìǒu) : la rhétorique d'équilibre`,
    introContent: `Le 对偶 (duì ǒu) est le procédé rhétorique fondamental du chinois classique et soutenu. Deux propositions de longueur égale (souvent 4 ou 7 caractères) se répondent en miroir : même nombre de syllabes, même structure syntaxique, mots de même catégorie grammaticale, tons opposés . Ex. : 山重水复疑无路 (shān zhòng shuǐ fù yí wú lù) ，柳暗花明又一村 (liǔ àn huā míng yòu yī cūn) (« Montagnes empilées, eaux repliées — je crois qu'il n'y a plus de route / Saules sombres, fleurs brillantes — encore un village »), de Lu You. Autre : 海内存知己 (hǎi nèicún zhījǐ) ，天涯若比邻 (tiān yá ruò bǐ lín) (« Tant qu'on a un ami au sein des quatre mers, les confins semblent voisins »), de Wang Bo. Les couplets du Nouvel An 春联 (chūn lián) collés aux portes sont des 对偶 (duì ǒu) . Un article journalistique soutenu ou un discours officiel en contient souvent plusieurs pour marquer la rhétorique.`,
    objectives: [`Définir 对偶 (structure miroir)`, `Identifier un parallélisme dans un texte`, `Composer un 春联 simple`, `Reconnaître dans un discours`],
    flashcards: [`对偶`, `春联`, `山重水复`, `柳暗花明`, `海内存知己`, `天涯若比邻`],
  },
  "cecr-c22-rhetoric-m2": {
    title: `比喻, 拟人, 夸张 — les figures du quotidien littéraire`, titleEn: `比喻, 拟人, 夸张 — everyday literary figures`,
    duration: 12,
    category: `writing`,
    difficulty: `superior`,
    introTitle: `Les 3 figures majeures de la prose`,
    introContent: `比喻 (bǐyù) : explicite avec 像 (xiàng) /如 (rú) /仿佛 (fǎngfú) (« comme ») — 她像花一样美 (tā xiàng huā yíyàng měi) (« belle comme une fleur ») ; implicite sans mot de liaison — 她是花 (tā shì huā) (« elle est une fleur »). Dans le 借喻 (jiè yù) , le comparé est remplacé directement par le comparant. 拟人 (nǐ rén) prête des traits humains à l'inanimé : 风唱着歌 (fēng chàng zhe gē) (« le vent chante »). 夸张 (kuā zhāng) amplifie à l'extrême — 李白 (lǐ bái) excelle : 白发三千丈 (bái fā sān qiān zhàng) (« mes cheveux blancs ont mille zhang de long »). Une prose C2 sans ces figures sonne plate ; un abus sonne kitsch.`,
    objectives: [`Distinguer 明喻 vs 暗喻 vs 借喻`, `Utiliser 像/如/仿佛`, `Créer une 拟人 naturelle`, `Doser la 夸张 sans excès`],
    flashcards: [`比喻`, `明喻`, `暗喻`, `拟人`, `夸张`, `像`, `如`, `仿佛`],
  },
  "cecr-c22-rhetoric-m3": {
    title: `Registres et public — du 大白话 au 书面语`, titleEn: `Registers and audience — from 大白话 to 书面语`,
    duration: 12,
    category: `writing`,
    difficulty: `superior`,
    introTitle: `Adapter le niveau de langue à l'auditoire`,
    introContent: `Le chinois offre un spectre très étendu de registres. 大白话 (dà bái huà) : 咱们 (zánmen) zánmen (nous incl.), 啥 (shá) shá (= 什么), 瞧 (qiáo) qiáo — parlé, oral, ton de convivialité. 标准普通话 (biāozhǔn pǔtōnghuà) : le registre du JT, du manuel scolaire, neutre. 书面语 (shūmiàn yǔ) : style écrit, soutenu, avec 该 (gāi) gāi pour 这 (zhè) , 之 (zhī) pour 的 (de) , phrases longues et structurées. 文言化 (wén yán huà) : fortement teinté de classique, pour discours solennels, articles académiques, calligraphie. Erreur de registre : en écrivant 咱们 (zánmen) dans un rapport d'entreprise ou 之 (zhī) dans un SMS , on déclenche malaise.

- Maîtrise C2 = savoir naviguer sciemment sur le spectre.`,
    objectives: [`Identifier 4 registres`, `Éviter erreurs de registre`, `Passer de 大白话 à 书面语`, `Connaître 文言化 solennel`],
    flashcards: [`大白话`, `书面语`, `普通话`, `咱们`, `啥`, `之`],
  },
  "cecr-c22-translation-m1": {
    title: `信达雅 : les 3 critères de Yan Fu`, titleEn: `信达雅: Yan Fu's 3 criteria`,
    duration: 12,
    category: `writing`,
    difficulty: `superior`,
    introTitle: `La devise fondatrice de la traductologie chinoise`,
    introContent: `En 1898, le traducteur 严复 (yán fù) formule la devise : 信达雅 (xìn dá yǎ) dans sa préface à la traduction de T.H. Huxley. Les 3 critères sont hiérarchisés selon le texte (juridique = 信 prioritaire, poésie = 雅 central).

- 信 (xìn) : ne pas trahir le sens.
- 达 (dá) : que le texte coule naturellement dans la langue cible.
- 雅 (yǎ) : choisir un registre élevé.
- Débats modernes : Lu Xun privilégie 信 (xìn) au prix de 达 (dá) (« plutôt dur que déformé »).

Nida (États-Unis) conceptualise l'« équivalence dynamique ». La traduction n'est jamais neutre : chaque choix est un compromis.`,
    objectives: [`Définir 信/达/雅`, `Citer 严复 (1898)`, `Hiérarchiser selon le texte`, `Opposer Yan Fu à Lu Xun`],
    flashcards: [`信达雅`, `信`, `达`, `雅`, `严复`, `翻译`],
  },
  "cecr-c22-translation-m2": {
    title: `Pièges typiques et faux amis`, titleEn: `Typical pitfalls and false friends`,
    duration: 12,
    category: `writing`,
    difficulty: `superior`,
    introTitle: `Les pièges qui piègent TOUJOURS`,
    introContent: `Pièges de traduction FR/EN → chinois : (1) Articles le/la/the n'existent pas en chinois. (2) Pluriels pas marqués sauf via 些 (xiē) /们 (men) . (3) Temps grammatical rendu par aspect + adverbe temporel. (4) Pronoms relatifs (qui, que, dont) = subordonnée antéposée avec 的 (de) . (5) Polysémie trompeuse : 厉害 (lìhai) = « terrible » ET « formidable » selon contexte ; « funny » anglais = 好玩 (hǎo wán) OU 可笑 (kěxiào) . (6) Ordre nom propre : en chinois on dit PAYS + personne avant le nom : 中国著名作家鲁迅 (Zhōngguó zhù míng zuò jiā lǔ xùn) (« le célèbre auteur chinois Lu Xun »). (7) Faux amis : 爱人 (àiren) peut signifier « conjoint » (pas « amant(e) ») ; 同志 (tóngzhì) = « camarade » mais aussi argot pour « homosexuel ». (8) Proverbes : traduire LITTÉRALEMENT un proverbe français en chinois produit une absurdité.`,
    objectives: [`Éviter traduction littérale d'articles`, `Rendre relatifs avec 的`, `Désambiguïser 厉害/爱人/同志`, `Respecter l'ordre nom propre chinois`],
    flashcards: [`厉害`, `爱人`, `同志`, `好玩`, `可笑`, `的`, `们`],
  },
  "cecr-c22-translation-m3": {
    title: `L'intraduisible : 缘分, 气, 江湖, 孝`, titleEn: `The untranslatable: 缘分, 气, 江湖, 孝`,
    duration: 12,
    category: `writing`,
    difficulty: `superior`,
    introTitle: `Ces mots qui n'ont pas d'équivalent`,
    introContent: `Certains concepts n'existent que dans l'univers mental chinois et nécessitent souvent une explication plutôt qu'une traduction directe. Parfois, laisser le mot chinois en italiques est le meilleur choix.

- 缘分 (yuánfèn) (yuánfèn, « affinité prédestinée » — la rencontre providentielle, idée bouddhiste).
- 气 (qì) (qì, énergie vitale — pas seulement « souffle » mais principe animique).
- 江湖 (jiāng hú) (jiānghú, litt. « fleuves et lacs » — monde parallèle des chevaliers errants, codes d'honneur, martial arts ; sens moderne étendu à tous les milieux marginaux).
- 孝 (xiào) (xiào, piété filiale — ne se réduit pas au « respect des parents » : tout un système moral).
- 面子 (miàn zi) (« face »), 关系 (guānxì) .
- 委屈 (wěiqu) (wěiqu, sensation d'injustice subie sans pouvoir se plaindre).
- 吃苦 (chī kǔ) (chīkǔ, « manger l'amer » = endurer les épreuves) — concept-vertu, pas seulement « souffrir ».`,
    objectives: [`Saisir 缘分 (affinité)`, `Distinguer 气 spirituel vs respiratoire`, `Contextualiser 江湖`, `Valoriser 吃苦 comme vertu`],
    flashcards: [`缘分`, `气`, `江湖`, `孝`, `委屈`, `吃苦`],
  },
  "cecr-c22-modern-lit-m1": {
    title: `Les années Mao et après : 1949-1989`, titleEn: `The Mao years and after: 1949-1989`,
    duration: 12,
    category: `culture`,
    difficulty: `superior`,
    introTitle: `Survivre pour écrire`,
    introContent: `Sous Mao (1949-1976), la littérature est 服务工农兵 (fúwù gōng nóng bīng) (« au service des ouvriers, paysans et soldats »). Écrivains emprisonnés ou réduits au silence. Après 1978 apparaît la 伤痕文学 (shānghén wénxué) (shānghén wénxué, « littérature des cicatrices ») qui raconte la Révolution culturelle : 刘心武 (liú xīn wǔ) 《班主任 (bān zhǔrèn) 》(1977). Puis 寻根文学 (xún gēn wénxué) (xúngēn wénxué, « littérature des racines ») retourne aux traditions rurales : 韩少功 (hán shǎo gōng) , 阿城 (ā chéng) . Années 80 : 余华 (yú huá) écrit 《活着 (huó zhe) 》(Huózhe, « Vivre ! », 1993) — histoire d'un paysan qui perd tout sous les soubresauts du XXe siècle, peut-être le roman chinois contemporain le plus traduit. Adaptation par Zhang Yimou en 1994.`,
    objectives: [`Distinguer 伤痕 vs 寻根`, `Connaître 余华 et 《活着》`, `Situer 服务工农兵`, `Relier au film de 张艺谋`],
    flashcards: [`伤痕文学`, `寻根文学`, `余华`, `活着`, `服务工农兵`],
  },
  "cecr-c22-modern-lit-m2": {
    title: `莫言 : prix Nobel 2012`, titleEn: `莫言: Nobel Prize 2012`,
    duration: 12,
    category: `culture`,
    difficulty: `superior`,
    introTitle: `莫言 : le réalisme hallucinatoire chinois`,
    introContent: `莫言 (mò yán) (Mò Yán, pseudo signifiant « Ne parle pas », né 1955) reçoit le prix Nobel de littérature en 2012 — premier écrivain de RPC à l'obtenir. Son œuvre phare : 《红高粱家族 (hóng gāo liáng jiāzú) 》(Hóng Gāoliáng Jiāzú, « Le clan du sorgho »), adapté au cinéma par Zhang Yimou en 1988 (Ours d'or à Berlin). Style : « réalisme hallucinatoire » (selon l'Académie Nobel), fusion entre réel, folklore et grotesque — parenté avec García Márquez mais ancré dans le 山东 (shān dōng) rural. Autres œuvres : 《丰乳肥臀 (fēng rǔ féi tún) 》 (Seins et hanches, 1995), 《生死疲劳 (shēngsǐ pí láo) 》(La dure loi du karma, 2006). Réception internationale enthousiaste, plus contestée en Chine (accusé de complaisance envers le régime).`,
    objectives: [`Connaître 莫言 (Nobel 2012)`, `Citer 《红高粱》et le film`, `Définir « réalisme hallucinatoire »`, `Situer 山东 rural`],
    flashcards: [`莫言`, `红高粱`, `诺贝尔奖`, `山东`, `生死疲劳`],
  },
  "cecr-c22-modern-lit-m3": {
    title: `刘慈欣 et la SF chinoise`, titleEn: `刘慈欣 and Chinese sci-fi`,
    duration: 12,
    category: `culture`,
    difficulty: `superior`,
    introTitle: `三体 : la SF chinoise devient globale`,
    introContent: `刘慈欣 (liú cí xīn) (Liú Cíxīn, Liu Cixin, né 1963), ingénieur devenu écrivain, publie 《三体 (sān tǐ) 》(Sāntǐ, « Le Problème à trois corps », 2008), puis 《黑暗森林 (hēi àn sēn lín) 》(2008) et 《死神永生 (sǐ shén yǒng shēng) 》(2010), formant la trilogie 《地球往事 (dìqiú wǎngshì) 》(Passé de la Terre). Le premier volume obtient le Hugo Award 2015 — événement majeur : une œuvre de SF chinoise devient internationalement iconique.

- Adaptations : série Tencent 2023, puis Netflix 2024.

Concepts introduits dans le vocabulaire général : 黑暗森林 (hēi àn sēn lín) (hēi'àn sēnlín, « forêt noire » — hypothèse d'un cosmos hostile où toute civilisation visible est détruite), 三体文明 (sān tǐ wénmíng) (civilisation de Trisolaris). La SF chinoise explose ensuite : Hao Jingfang (Hugo 2016), Chen Qiufan, Xia Jia.`,
    objectives: [`Connaître 刘慈欣 et sa trilogie`, `Comprendre 黑暗森林 (hypothèse)`, `Citer Hugo 2015 et adaptations`, `Nommer autres SF chinois`],
    flashcards: [`刘慈欣`, `三体`, `黑暗森林`, `死神永生`, `雨果奖`],
  },
  "cecr-c22-dialects-m1": {
    title: `普通话 et sa diffusion`, titleEn: `普通话 and its spread`,
    duration: 12,
    category: `culture`,
    difficulty: `superior`,
    introTitle: `« Langue commune » : comment un dialecte devint la norme`,
    introContent: `普通话 (pǔtōnghuà) (pǔtōnghuà, litt. « langue commune ») = le mandarin standard, fondé sur la prononciation de Pékin, le lexique des dialectes nordiques et la grammaire des œuvres vernaculaires modernes. Promu officiellement en 1956 comme langue nationale de la RPC. À Taïwan : 国语 (guó yǔ) (Guóyǔ, « langue nationale ») — même base mais prononciation légèrement différente .

- À Singapour/Malaisie : 华语 (huá yǔ) (Huáyǔ, « langue sinophone »).
- Le vocabulaire diffère : 自行车 (zìxíngchē) /脚踏车 (jiǎo tà chē) , 出租车 (chūzūchē) /计程车 (jì chéng chē) /的士 (de shì) .

Un locuteur de 普通话 (pǔtōnghuà) comprendra 95% du 国语 (guó yǔ) et vice-versa. Aujourd'hui, > 80% de la population chinoise parle 普通话 (pǔtōnghuà) , contre ~50% en 1950.`,
    objectives: [`Définir 普通话 (origine/base)`, `Distinguer 普通话/国语/华语`, `Repérer variations lexicales`, `Dater la promotion (1956)`],
    flashcards: [`普通话`, `国语`, `华语`, `注音符号`, `自行车`, `出租车`],
  },
  "cecr-c22-dialects-m2": {
    title: `粤语 : le cantonais et Hong Kong`, titleEn: `粤语: Cantonese and Hong Kong`,
    duration: 12,
    category: `culture`,
    difficulty: `superior`,
    introTitle: `粤语 : une langue parallèle`,
    introContent: `粤语 (yuè yǔ) n'est pas un dialecte du mandarin mais une langue chinoise distincte, parlée à Canton ), Hong Kong ) et Macao. 6 à 9 tons (vs 4 en mandarin), conserve des consonnes finales -p, -t, -k disparues du mandarin moderne mais présentes en 文言 (wén yán) . Un mandarinophone ne comprend PAS le cantonais à l'oral sans apprentissage. Exemples : « bonjour » = 你好 (nǐ hǎo) en mandarin vs 你好 (nǐ hǎo) en cantonais (nei5 hou2), « merci » = 谢谢 (xièxie) vs 唔该 (wú gāi) (m4 goi1) — le cantonais conserve 唔 (wú) . À Hong Kong : le 繁体字 (fántǐzì) reste la norme, contrairement au continent. Le cinéma hongkongais wǔxiá films) et la cantopop ont diffusé le cantonais mondialement.`,
    objectives: [`Distinguer 粤语 de 普通话`, `Compter 6-9 tons du cantonais`, `Lire 繁体字 vs simplifié`, `Comprendre 唔该/多谢`],
    flashcards: [`粤语`, `广州`, `香港`, `繁体字`, `唔该`, `武侠`],
  },
  "cecr-c22-dialects-m3": {
    title: `Autres langues sinitiques : 上海话, 闽南语`, titleEn: `Other Sinitic languages: 上海话, 闽南语`,
    duration: 12,
    category: `culture`,
    difficulty: `superior`,
    introTitle: `La mosaïque sinitique`,
    introContent: `La Chine compte 7-10 langues chinoises majeures, toutes écrites avec les mêmes caractères mais mutuellement inintelligibles à l'oral : 官话 (guān huà) (guānhuà, mandarin, > 70% des locuteurs), 粤语 (yuè yǔ) (cantonais, 70M), 吴语海话 (wú yǔ hǎi huà) shanghaïen, 80M), 闽南语 (mǐn nán yǔ) (Mǐnnányǔ, Min du Sud, inclut 台 语 Taïwanais et variantes de Fujian, 50M), 客家话 (kè jiā huà) (kèjiāhuà, Hakka, 50M, diaspora), 湘 (xiāng) , 赣 (gàn) . Taïwan : 60% parlent 台语 (tái yǔ) en plus du 国语 (guó yǔ) , langue d'identité après des décennies d'interdiction KMT. Chaque grande ville conserve son propre parler : 北京话 (běijīng huà) ≠ 普通话 (pǔtōnghuà) (le pékinois a des expressions distinctives : 您 内 pour 您 emphatique). La standardisation par les médias affaiblit les dialectes — enjeu de préservation culturelle.`,
    objectives: [`Cartographier 7 langues chinoises`, `Situer 吴语 (Shanghai)`, `Comprendre 闽南/台语 à Taïwan`, `Expliquer la préservation dialectale`],
    flashcards: [`上海话`, `吴语`, `闽南语`, `客家话`, `台语`, `北京话`],
  },
  "cecr-c22-global-china-m1": {
    title: `一带一路 et diplomatie post-2013`, titleEn: `Belt and Road and post-2013 diplomacy`,
    duration: 12,
    category: `culture`,
    difficulty: `superior`,
    introTitle: `Du 韬光养晦 au 大国外交`,
    introContent: `Deng Xiaoping énonçait : 韬光养晦 (tāo guāng yǎng huì) (tāoguāng yǎnghuì, « cacher sa lumière, nourrir l'obscurité » = profil bas, accumulation discrète de force). Depuis Xi Jinping (2013), la doctrine est 大国外交 (dà guó wàijiāo) (dàguó wàijiāo, diplomatie de grande puissance) et 人类命运共同体 (rén lèi mìng yùn gòngtóngtǐ) (rénlèi mìngyùn gòngtóngtǐ, « communauté de destin pour l'humanité »). Initiative phare : 一带一路 (yídài yílù) (Yídài Yílù, BRI/Nouvelles Routes de la Soie) — 150+ pays signataires, focus sur infrastructures, corridor 陆上 (lù shàng) + 海上 (hǎi shàng) .

- Critiques : « piège de la dette », conditions environnementales.

Autres termes : 战狼外交 (zhàn láng wàijiāo) (zhànláng wàijiāo, « diplomatie Wolf Warrior », affirmative, nommée d'après un film), 一个中国 (yī gè Zhōngguó) (« Une seule Chine »).`,
    objectives: [`Opposer 韬光养晦 à 大国外交`, `Expliquer 一带一路 (chiffres)`, `Définir 战狼外交`, `Comprendre 命运共同体`],
    flashcards: [`韬光养晦`, `大国外交`, `一带一路`, `战狼外交`, `命运共同体`],
  },
  "cecr-c22-global-china-m2": {
    title: `Diaspora : 华侨, 华人, 华裔`, titleEn: `Diaspora: 华侨, 华人, 华裔`,
    duration: 12,
    category: `culture`,
    difficulty: `superior`,
    introTitle: `60 millions de Chinois hors de Chine`,
    introContent: `Distinctions essentielles : 华侨 (huáqiáo) , 华人 (huárén) , 华裔 (huáyì) (huáyì, descendant chinois d'une autre nationalité, typiquement né à l'étranger). Principaux pôles : 东南亚 (dōngnán yà) (Asie du Sud-Est — Singapour 75% chinois, Malaisie 23%, Indonésie 4%+), 美国 (měi guó) (5M+ dont une Chinatown par grande ville), 澳洲 (ào zhōu) , 欧洲 (ōu zhōu) . Histoire des migrations : coolies XIXe (Californie-Gold Rush, Panama, chemins de fer) ; vague 1949 (fuyant le PCC, vers Taïwan et Hong Kong) ; vague post-1978 (étudiants, cols blancs). Vocabulaire culturel : 唐人街 (táng rén jiē) (tángrén jiē, « rue des gens de Tang » = Chinatown), 侨乡 (qiáo xiāng) (qiáoxiāng, régions d'origine : Guangdong et Fujian surtout).`,
    objectives: [`Distinguer 华侨/华人/华裔`, `Nommer les pôles diaspora`, `Retracer 3 vagues migratoires`, `Comprendre 唐人街/侨乡`],
    flashcards: [`华侨`, `华人`, `华裔`, `唐人街`, `侨乡`, `东南亚`],
  },
  "cecr-c22-global-china-m3": {
    title: `Soft power : cinéma, jeux, musique`, titleEn: `Soft power: cinema, games, music`,
    duration: 12,
    category: `culture`,
    difficulty: `superior`,
    introTitle: `La Chine rayonne autrement`,
    introContent: `Soft power 软实力 (ruǎnshílì) . Instituts Confucius ) — 500+ centres à travers le monde pour enseigner langue/culture (modèle Goethe-Institut). Cinéma : 《哪吒 (nǎ zhā) 》(Nézhā, 2019) premier film d'animation chinois blockbuster mondial ; 流浪地球 (liúlàng dìqiú) (The Wandering Earth, 2019) démontre la capacité SF. 李子柒 (lǐ zi qī) : youtubeuse ultra-suivie, vie rurale esthétisée, rayonnement culturel organique hors appareil officiel. Jeux vidéo : 原神 (yuán shén) est le premier succès mondial d'un jeu chinois, revenu comparable à Hollywood. TikTok/抖音 (dǒu yīn) : version globale chinoise (ByteDance), change la consommation de médias mondiale.

- Limites : censure et soupçons diplomatiques freinent l'impact.

Le 中国文化 (Zhōngguó wénhuà) n'a pas encore l'universalité du hollywoodien, mais gagne du terrain.`,
    objectives: [`Définir 软实力`, `Citer 孔子学院/哪吒/流浪地球`, `Connaître 李子柒 et 原神`, `Nuancer l'impact global`],
    flashcards: [`软实力`, `孔子学院`, `哪吒`, `流浪地球`, `李子柒`, `原神`, `抖音`],
  },
  "cecr-c22-conversation-m1": {
    title: `Interprétation simultanée + glossaire pro`, titleEn: `Simultaneous interpretation + pro glossary`,
    duration: 14,
    category: `conversation`,
    difficulty: `superior`,
    introTitle: `跟读 + 概括 + 预判 — la triade des interprètes pro`,
    introContent: `Pour tout terme technique sans traduction officielle, ne jamais inventer sans signaler : 这个词目前没有标准译法 (zhège cí mù qián méiyǒu biāozhǔn yì fǎ) ，我建议译为 (wǒ jiànyì yì wèi) X.

- Interprétation : 同声传译 (tóng shēng chuán yì) / 交替传译 (jiāotì chuán yì) .
- Techniques : 跟读 (gēn dú) (lag 3-5 sec) / 概括 (gàikuò) / 预判 (yù pàn) (anticiper la fin de phrase).
- Astuce SVO chinoise : ATTENDS le verbe principal, puis restitue d'un coup.
- Glossaire : demande TOUJOURS l'agenda + PowerPoint à l'avance.
- Sources : 联合国术语库 (lián hé guó shù yǔ kù) , 中国译协 (Zhōngguó yì xié) .

Crée un glossaire collaboratif sur 飞书 (fēi shū) / 腾讯文档 (téng xùn wéndàng) avec les autres interprètes.`,
    objectives: [`Maîtriser 跟读 + 概括 + 预判`, `Anticiper le verbe SVO chinois`, `Préparer 100-200 术语 par mission`, `Coordonner glossaire avec collègues`],
    flashcards: [`同声传译`, `译员`, `概括`, `预判`, `对应`, `术语`, `议程`, `参与者`, `对照`, `译法`],
  },
  "cecr-c22-conversation-m2": {
    title: `Cinéma chinois + sous-titrage`, titleEn: `Chinese cinema + subtitling`,
    duration: 14,
    category: `conversation`,
    difficulty: `superior`,
    introTitle: `第五代/第六代 + 字幕组 culture`,
    introContent: `Mentionner « 第五代 (dì wǔ dài) » dans la 1re minute = signal cinéphile IMMÉDIAT. La culture 字幕组 (zìmù zǔ) chinoise (Renren, Yanmo) a façonné les spectateurs cosmopolites.

- Cinéma : 导演 (dǎoyǎn) , 编剧 (biānjù) , 摄影 (shèyǐng) , 镜头 (jìng tóu) , 美学 (měixué) .
- Réalisateurs majeurs : 张艺谋高粱 (zhāng yì móu gāo liáng) ), 陈凯歌 (chén kǎi gē) , 王家卫年华 (wáng jiā wèi nián huá) ), 贾樟柯 (jiǎ zhāng kē) ).
- Sous-titrage : max 2 lignes, 12-15 char chinois, 6 sec écran.
- Techniques : COMPRESSER, TRANSCRÉER, PRÉSERVER le ton.
- Pour blagues : 直译会让观众一头雾水 (zhí yì huì ràng guānzhòng yìtóu wù shuǐ) — préfère 本地化 (běndì huà) .
- Chengyu : 一头雾水 (yìtóu wù shuǐ) (perdu, lit. tête dans le brouillard).`,
    objectives: [`Nommer 张艺谋/陈凯歌/王家卫/贾樟柯`, `Mentionner 第五代/第六代`, `Maîtriser contraintes sous-titrage`, `Mobiliser 一头雾水`],
    flashcards: [`导演`, `编剧`, `镜头`, `影片`, `美学`, `字幕`, `字幕组`, `配音`, `本地化`, `观众`],
  },
  "cecr-c22-conversation-m3": {
    title: `Cantonais (HK) + shanghainais — dialectes`, titleEn: `Cantonese (HK) + Shanghainese — dialects`,
    duration: 14,
    category: `conversation`,
    difficulty: `superior`,
    introTitle: `粤语 + 上海话 — sous-langues vivantes`,
    introContent: `À Hong Kong, dire 唔該 (wú gāi) (m4 goi1) à chaque échange = signal IMMÉDIAT que tu connais les codes. Reconnaître un dialecte à l'oreille = signe de connaisseur régional.

- Cantonais 粤语 (yuè yǔ) : 80M locuteurs (Guangdong + HK + diaspora). 9 tons. Caractères traditionnels à HK.
- Caractères spécifiques : 嘅 (kǎi) (= 的 ), 嗰 (gě) ), 唔 (wú) ) — connaître = lire 80% des Facebook HK.
- Shanghainais 上海话 (shànghǎi huà) .
- Pronoms : 侬 (nóng) / 阿拉 (ā lā) .
- Mot star : 嗲 (diē) .
- Pour louer : « 阿拉上海好嗲 (ā lā shànghǎi hǎo diē) » (notre Shanghai est si chic — adresse à un Shanghaien d'origine).`,
    objectives: [`Saluer en cantonais avec 唔該`, `Lire 嘅/嗰/唔 (caract. cant.)`, `Distinguer 侬 vs 你 (shanghaien)`, `Mobiliser 嗲 à Shanghai`],
    flashcards: [`粤语`, `繁體字`, `简体字`, `唔該`, `嘅`, `上海话`, `吴语`, `侬`, `阿拉`, `方言`],
  },
  "cecr-c22-conversation-m4": {
    title: `Littérature contemporaine + littérature en ligne`, titleEn: `Contemporary + online literature`,
    duration: 14,
    category: `conversation`,
    difficulty: `superior`,
    introTitle: `伤痕文学 → 网络文学 — 80 ans en 7 vagues`,
    introContent: `Pour analyser la littérature chinoise contemporaine : 网络文学已成为中国文学的 (wǎngluò wénxué yǐ chéngwéi Zhōngguó wénxué de) chéngwéi Zhōngguó wénxué de) 重要部分 (zhòngyào bùfen) ，不容忽视 (bùróng hū shì) . Pour les sujets sensibles comme la Révolution culturelle, utilise 那个特殊的 (nàge tèshū de) 年代 (nián dài) .

- Vagues : 伤痕 (shānghén) → 寻根 (xún gēn) → 先锋 (xiānfēng) → 新写实 (xīn xiě shí) → 网络 (wǎngluò) .
- Auteurs C2.2 : 莫言 (mò yán) , 余华 (yú huá) , 阎连科 (yán lián kē) , 王安忆 (wáng ān yì) , 韩少功 (hán shǎo gōng) , 苏童 (sū tóng) , 张悦然 (zhāng yuè rán) , 残雪 (cán xuě) .
- Phrase : 这部作品反映了 (zhè bù zuò pǐn fǎnyìng le) 一个时代的 (yī gè shídài de) 集体记忆 (jí tǐ jì yì) .
- Littérature en ligne 网络文学 (wǎngluò wénxué) (起点中文网) : 玄幻 (xuán huàn) , 都市 (dūshì) , 修仙 (xiū xiān) , 穿越 (chuān yuè) , 末世 (mò shì) .
- Modèle : 1 chap/jour de 3000 char, micro-transactions.
- Auteurs vedettes : 唐家三少 (táng jiā sān shǎo) , 我吃西红柿 (wǒ chī xī hóng shì) .`,
    objectives: [`Nommer 5 vagues littéraires post-1980`, `Évoquer 文革 avec 那个特殊的年代`, `Connaître 5 genres de 网络文学`, `Mobiliser 不容忽视`],
    flashcards: [`伤痕`, `集体`, `记忆`, `反映`, `时代`, `网络`, `玄幻`, `修仙`, `穿越`, `不容忽视`],
  },
  "cecr-c22-conversation-m5": {
    title: `Mentor / coach + feedback face-saving`, titleEn: `Mentor / coach + face-saving feedback`,
    duration: 14,
    category: `conversation`,
    difficulty: `superior`,
    introTitle: `导师 (dialogue) vs 师傅 (technique) + sandwich face-saving`,
    introContent: `Le mentor moderne préfère 我陪你一起摸索 (wǒ péi nǐ yìqǐ mōsuǒ) . 导师 (dǎoshī) ≠ 师傅 (shī fù) . La magic question pour favoriser l'auto-correction face-saving : « 如果你重新做一次 (rúguǒ nǐ chóngxīn zuò yī cì) (rúguǒ nǐ chóngxīn zuò yī cì)，会有什么不一样 (huì yǒu shénme bù yíyàng) ? »

- Mentor : 我把你当作朋友 (wǒ bǎ nǐ dàngzuò péngyou) (wǒ bǎ nǐ dàngzuò péngyou)，分享我的 (fēnxiǎng wǒ de) 经验 (jīngyàn) .
- Éviter « 你应该 (nǐ yīnggāi) X » → préfère « 你可以考虑 (nǐ kěyǐ kǎolǜ) X / 一种思路是 (yī zhǒng sīlù shì) X ».
- Question miroir : 你自己是怎么想的 (nǐ zìjǐ shì zěnme xiǎng de) (nǐ zìjǐ shì zěnme xiǎng de) ?
- Encourager : 我相信你的 (wǒ xiāngxìn nǐ de) 判断 (pàn duàn) .
- Feedback : sandwich + question + co-construction.
- Étapes : (1) reconnaître les forces, (2) poser une question, (3) suggérer avec 调整 (tiáozhěng) , (4) inviter à la discussion.
- ÉVITE 改 (gǎi) → utilise 调整 (tiáozhěng) .`,
    objectives: [`Distinguer 导师 (dialogue) vs 师傅 (technique)`, `Mobiliser 我陪你一起摸索`, `Préférer 调整 à 改 dans le feedback`, `Utiliser la magic question d\\\\'auto-correction`],
    flashcards: [`导师`, `指导`, `反馈`, `思路`, `判断`, `调整`, `角度`, `换`, `部分`, `建议`],
  },
  "cecr-c22-conversation-m6": {
    title: `Dialogue interculturel + soft power chinois`, titleEn: `Intercultural dialogue + Chinese soft power`,
    duration: 14,
    category: `conversation`,
    difficulty: `superior`,
    introTitle: `我个人的观察是 + 软实力/话语权`,
    introContent: `Dans le dialogue interculturel, ne JAMAIS généraliser avec « 中国人都 (Zhōngguó rén dōu) … » — préfère « 很多中国人 (hěn duō Zhōngguó rén) » + « 我个人的 (wǒ gèrén de) 观察是 (guānchá shì) X ». ATTENTION : 话语权 (huàyǔ quán) trop utilisé sonne paranoïaque ; à l'oral, préfère 影响力 (yǐngxiǎng lì) .

- Dialogue interculturel : 在中国 (zài Zhōngguó) ，X 通常被视为 (tōngcháng bèi shìwéi) Y，而在西方可能不同 (ér zài xīfāng kěnéng bù tóng) (ér zài xīfāng kěnéng bù tóng).
- Conclure : 跨文化理解需要时间和耐心 (kuà wénhuà lǐjiě xūyào shíjiān hé nài xīn) .
- Soft power : 软实力 (ruǎnshílì) , 文化输出 (wénhuà shūchū) , 国际形象 (guójì xíngxiàng) , 话语权 (huàyǔ quán) .
- 中国正在努力构建自己的话语体系 (Zhōngguó zhèngzài nǔlì gòujiàn zìjǐ dehuà yǔ tǐxì) .
- Examples : 孔子学院 (kǒng zi xué yuàn) , TikTok, 哪吒 (nǎ zhā) , 原神 (yuán shén) , 李子柒 (lǐ zi qī) .
- Limites : 西方对中国的 (xīfāng duì Zhōngguó de) 认知仍存在偏见 (rènzhī réng cúnzài piānjiàn) .`,
    objectives: [`Éviter « 中国人都 » (généralisation)`, `Mobiliser 我个人的观察是`, `Distinguer 话语权 (formel) vs 影响力 (oral)`, `Citer 孔子学院/原神/李子柒 comme soft power`],
    flashcards: [`差异`, `冲突`, `融合`, `被视为`, `跨文化`, `软实力`, `话语权`, `体系`, `认知`, `偏见`],
  },
  "cecr-c22-conversation-m7": {
    title: `Débat éthique IA + adieu littéraire`, titleEn: `AI ethics debate + literary farewell`,
    duration: 14,
    category: `conversation`,
    difficulty: `superior`,
    introTitle: `在效率和隐私之间找平衡 + 山高水长，后会有期`,
    introContent: `Pour un adieu pro après plusieurs années en Chine, le chengyu ULTIME est 山高水长 (shān gāo shuǐ cháng) ，后会有期 (hòu huì yǒu qī) (les montagnes hautes et l'eau longue, on se reverra) — effet émotionnel garanti.

- Débat IA : 人工智能 (réngōng zhìnéng) , 算法 (suàn fǎ) , 监控 (jiānkòng) , 隐私 (yǐnsī) , 伦理 (lúnlǐ) .
- Phrase neutre/centriste : 在效率和隐私之间 (zài xiàolǜ hé yǐnsī zhī jiān) ，我们需要找到平衡 (wǒmen xūyào zhǎo dào píng héng) .
- 算法不是中立的 (suàn fǎ bùshì zhōnglì de) .
- Cadre : 个人信息保护法 (gèrén xìn xī bǎohù fǎ) (PIPL, 2021, RGPD chinois).
- Conclure : 技术发展需要伦理边界 (jìshù fāzhǎn xūyào lúnlǐ biānjiè) (jìshù fāzhǎn xūyào lúnlǐ biānjiè).
- Adieu : 我有一件事要告诉大家 (wǒ yǒu yī jiàn shì yào gàosu dàjiā) (wǒ yǒu yī jiàn shì yào gàosu dàjiā) → 经过深思熟虑 (jīngguò shēnsī shú lǜ) ，我决定 (wǒ juédìng) X → 这些年 (zhèxiē nián) ，承蒙各位的 (chéng méng gèwèi de) 关照和帮助 (guānzhào hé bāngzhù) → 即使离开 (jíshǐ líkāi) ，我们的 (wǒmen de) 友谊不会变 (yǒu yì bù huì biàn) .`,
    objectives: [`Mobiliser 在效率和隐私之间找平衡`, `Citer 个人信息保护法 (PIPL)`, `Maîtriser 承蒙各位的关照`, `Conclure adieu par 山高水长，后会有期`],
    flashcards: [`人工智能`, `算法`, `监控`, `隐私`, `伦理`, `深思熟虑`, `承蒙`, `关照`, `厚爱`, `后会有期`],
  },
  "cecr-c22-nuances-m1": {
    title: `时间/时候/时刻/时机 + 通过/经过/经历/经由`, titleEn: `时间/时候/时刻/时机 + 通过/经过/经历/经由`,
    duration: 14,
    category: `vocabulary`,
    difficulty: `superior`,
    introTitle: `Temps en 4 dimensions + traverser en 4 saveurs`,
    introContent: `时间 (shíjiān) ≠ 时候 (shíhou) ≠ 时刻 (shíkè) (instant crucial — 关键时刻) ≠ 时机住时机 (shíjī zhù shíjī) ). « 抓住时机 (zhuā zhù shíjī) » = combo business pour louer une décision (« 这是抓住了 时机 » > « 做对了 »). Traverser : 通过 (tōng guò) / 通过提案 (tōng guò tí àn) ) ≠ 经过 (jīngguò) (passer par lieu/période — 经过 几年的 研究 ) ≠ 经历 (jīnglì) (vivre une expérience — 经历 了 困难时期 ) ≠ 经由由香港转机 (jīng yóu yóu xiānggǎng zhuǎn jī) ). La grammaire est dans la NATURE de ce qu'on traverse.`,
    objectives: [`Distinguer 时间/时候/时刻/时机`, `Mobiliser 抓住时机 en pro`, `Choisir 通过/经过/经历/经由`, `Adapter à la nature du traverser`],
    flashcards: [`时间`, `时候`, `时刻`, `时机`, `关键`, `通过`, `经过`, `经历`, `经由`, `提案`],
  },
  "cecr-c22-nuances-m2": {
    title: `Structures 一…而… + chengyu numérotés`, titleEn: `一…而… structures + numbered chengyu`,
    duration: 14,
    category: `vocabulary`,
    difficulty: `superior`,
    introTitle: `Rythmes classiques + chengyu avec nombres`,
    introContent: `La structure classique 一 (yī) + verbe + 而 (ér) + résultat est très productive en soutenu : 一笑而过 (yī xiào ér guò) , 一去不返 (yī qù bù fǎn) , 一发不可收拾 (yī fā bù kě shōu shí) , 一以贯之 (yī yǐ guàn zhī) . Pour louer la cohérence d'un mentor : « 您 (nín) X 年来一以贯之 (nián lái yī yǐ guàn zhī) ，令人敬佩 (lìng rén jìngpèi) » (compliment ultime de cohérence morale). Chengyu numérotés essentiels couvrant 80% des situations émotives quotidiennes soutenues :

- 一鼓作气 (yìgǔ-zuòqì) (en un seul élan, exhorter à finir).
- 三思而行 (sān sī ér háng) (réfléchir avant d'agir, conseil de prudence).
- 五湖四海 (wǔhú-sìhǎi) (du monde entier — 来自五湖四海).
- 九牛二虎之力了 (jiǔ niú èr hǔ zhī lì le) 九牛二虎之力才完成 (jiǔ niú èr hǔ zhī lì cái wánchéng) ).`,
    objectives: [`Maîtriser structure 一…而…`, `Citer 一以贯之 pour louer cohérence`, `Mobiliser 三思而行 pour prudence`, `Utiliser 九牛二虎之力 pour gros effort`],
    flashcards: [`一笑而过`, `一去不返`, `一发不可收拾`, `一以贯之`, `一鼓作气`, `三思而行`, `五湖四海`, `九牛二虎之力`, `完成`, `收拾`],
  },
  "cecr-c22-nuances-m3": {
    title: `附/顺/趁/借 + paronymes 礼/理/立/力/利`, titleEn: `附/顺/趁/借 + paronyms 礼/理/立/力/利`,
    duration: 14,
    category: `vocabulary`,
    difficulty: `superior`,
    introTitle: `Saisir l\\'occasion + maîtriser les homophones critiques`,
    introContent: `Saisir : 附 (fù) ) < 顺 (shùn) (au passage oral — 顺便) < 趁 (chèn) < 借 (jiè) (formel — 借此机会). « 借此机会 (jiè cǐ jīhuì) X » = formule UNIVERSELLE de discours soutenu (10x plus puissant que « 我想 X »). Paronymes lǐ/lì : 礼 (lǐ) ) ≠ 理 (lǐ) ≠ 立 (lì) ) ≠ 力 (lì) ≠ 利 (lì) . Astuce mnémotechnique radicalographique : 礼 (lǐ) = autel+offrande), 理 (lǐ) = polir le jade), 立 (lì) , 力 (lì) , 利 (lì) .

- C2.2 = ZÉRO confusion sur ces caractères.`,
    objectives: [`Hiérarchiser 附/顺/趁/借`, `Maîtriser 借此机会 en discours`, `Distinguer 礼/理/立/力/利`, `Lire les radicaux pour discriminer`],
    flashcards: [`附`, `顺便`, `趁`, `借`, `趁热打铁`, `礼`, `理`, `立`, `力`, `利`],
  },
  "cecr-c22-nuances-m4": {
    title: `近/远/邻/临 + 复/重/再/又`, titleEn: `近/远/邻/临 + 复/重/再/又`,
    duration: 14,
    category: `vocabulary`,
    difficulty: `superior`,
    introTitle: `Proche/loin + 4 manières de répéter`,
    introContent: `近 (jìn) (proche temps/espace) / 远 (yuǎn) / 邻 (lín) ) / 临 (lín) (sur le point de / donnant sur — 临海, 临时 , 临阵磨枪 chengyu). 临 (lín) implique TEMPS, 邻 (lín) implique ESPACE. Répétition : 复 (fù) , 恢复 (huī fù) ) < 重写 (zhòng xiě) ) < 再说一遍 (zài shuō yī biàn) ) ≠ 又 (yòu) (PASSÉ ou habitude — 又下雨了 ). Erreur ULTRA classique : « 我又来了 (wǒ yòu lái le) » vs « 我再来 (wǒ zài lái) » .

- Maîtriser cette distinction = précision avancée.`,
    objectives: [`Distinguer 近/远/邻/临 (espace vs temps)`, `Reconnaître 临阵磨枪`, `Choisir 再 (futur) vs 又 (passé)`, `Hiérarchiser 复/重/再/又`],
    flashcards: [`近`, `远`, `邻`, `临`, `邻居`, `复`, `重`, `再`, `又`, `恢复`],
  },
  "cecr-c22-nuances-m5": {
    title: `终于/终究/毕竟/究竟 + 一定/必定/必然/势必`, titleEn: `终于/终究/毕竟/究竟 + 一定/必定/必然/势必`,
    duration: 14,
    category: `vocabulary`,
    difficulty: `superior`,
    introTitle: `Finalement (4 nuances) + certain (4 nuances)`,
    introContent: `终于 (zhōngyú) (soulagement après attente — 我 终于到了 ) ≠ 终究终究会大白 (zhōngjiū zhōngjiū huì dà bái) , proverbe d'apaisement) ≠ 毕竟 (bìjìng) (concession — 他毕竟还是个孩子 (tā bìjìng háishi gè háizi) (tā bìjìng háishi gè háizi)) ≠ 究竟 (jiūjìng) (enquête insistante — 究竟发生了 什么 ?). Certain : 一定 (yídìng) < 必定 (bìdìng) < 必然 (bìrán) < 势必 (shìbì) (inévitable par dynamique — 这 (zhè) 种政策势必引发不满 (zhǒng zhèngcè shìbì yǐnfā bùmǎn) (zhǒng zhèngcè shìbì yǐnfā bùmǎn)).

- 势必 (shìbì) X = signal C2.2 d'analyste sérieux en éditorial politique/économique.`,
    objectives: [`Distinguer 终于/终究/毕竟/究竟`, `Réciter 真相终究会大白`, `Hiérarchiser 一定 → 必定 → 必然 → 势必`, `Mobiliser 势必 en analyse politique`],
    flashcards: [`终于`, `终究`, `毕竟`, `究竟`, `真相`, `一定`, `必定`, `必然`, `势必`, `不满`],
  },
  "cecr-c22-nuances-m6": {
    title: `Particules finales 啊/呢/吧/嘛/哟 + 大家/各位/诸位/列位`, titleEn: `Final particles 啊/呢/吧/嘛/哟 + 大家/各位/诸位/列位`,
    duration: 14,
    category: `vocabulary`,
    difficulty: `superior`,
    introTitle: `Particules finales (oral natif) + adresse à un groupe (registre)`,
    introContent: `Particules finales : 啊 (a) / 呢 (ne) / 吧 (ba) (suggestion, adoucit ordre) / 嘛 (ma) (évidence — « 他 是你哥哥嘛 ») / 哟 (yō) . Sans particules, ton chinois sonne PLAT et étranger. 嘛 (ma) = marqueur ORAL très chinois . Adresse à un groupe : 大家 (dàjiā) < 各位 (gèwèi) (formel respectueux — 各位老师) < 诸位来宾 (zhūwèi láibīn) ) < 列位 (liè wèi) . En discours officiel, ouvre par 各位领导 (gèwèi lǐng dǎo) ，各位同仁 (gèwèi tóngrén) ; réserve 大家 (dàjiā) à la conclusion (« 谢谢大家 »).`,
    objectives: [`Maîtriser 啊/呢/吧/嘛/哟 à l\\\\'oral`, `Utiliser 嘛 pour la complicité`, `Hiérarchiser 大家/各位/诸位`, `Ouvrir formel par 各位 + clore par 谢谢大家`],
    flashcards: [`啊`, `呢`, `吧`, `嘛`, `哟`, `大家`, `各位`, `诸位`, `列位`, `来宾`],
  },
  "cecr-c22-nuances-m7": {
    title: `Chengyu de comparaison + redoublements poétiques`, titleEn: `Comparison chengyu + poetic reduplications`,
    duration: 14,
    category: `vocabulary`,
    difficulty: `superior`,
    introTitle: `Chengyu lien/diversité + musicalité poétique`,
    introContent: `Chengyu de comparaison : 形影不离 (xíngyǐng-bùlí) , 唇齿相依 (chún chǐ xiāng yī) , 千差万别 (qiān chà wàn bié) . « 现在的 (xiànzài de) 消费者口味千差万别 (xiāofèizhě kǒu wèi qiān chà wàn bié) » > « 很多种 (hěn duō zhǒng) ». Redoublements poétiques : 渐渐 (jiàn jiàn) / 缓缓 (huǎn huǎn) / 默默 (mò mò) (silencieusement — « 您 X 年来默默地 默 de) 付出 (fùchū) ，让人敬佩 (ràng rén jìngpèi) », compliment ultime pour mentor humble) / 悠悠 (yōu yōu) / 茫茫 (mángmáng) . 李清照 (lǐ qīng zhào) ouvre 《声声慢 (shēng shēng màn) 》 par 7 redoublements consécutifs. Maîtriser 5-10 redoublements = signal de NIVEAU LITTÉRAIRE émotionnel maximal C2.2.`,
    objectives: [`Mobiliser 形影不离/唇齿相依/千差万别`, `Utiliser 默默 pour louer effort discret`, `Maîtriser 5+ redoublements poétiques`, `Évoquer 李清照 et 7 redoublements`],
    flashcards: [`形影不离`, `唇齿相依`, `千差万别`, `兄弟`, `看法`, `渐渐`, `缓缓`, `默默`, `悠悠`, `茫茫`],
  },
  "cecr-a2-grammar-mw-m1": {
    title: `Mots de mesure : bases et catégories`, titleEn: `Measure words: basics and categories`,
    duration: 16,
    category: `grammar`,
    difficulty: `beginner`,
    introTitle: `Pas de nombre sans classificateur : 三本书, jamais 三书`,
    introTitleEn: `No number without a measure word: 三本书, never 三书`,
    introContent: `En chinois, un nombre ne touche jamais directement le nom : il faut un mot de mesure entre les deux.

- **本** (běn) = livres reliés : 我买了三本书 (wǒ mǎi le sān běn shū) = j'ai acheté 3 livres
- **个** (ge) = mot de mesure générique, pour les personnes et l'abstrait : 三个朋友 (sān ge péngyǒu) = 3 amis, 一个问题 (yí ge wèntí) = un problème
- **两** (liǎng) compte, **二** (èr) énumère : 两本书 (liǎng běn shū) = 2 livres, mais 二楼 (èr lóu) = le 2e étage
- Le mot de mesure décrit aussi la forme ou le contenant : **杯** (bēi) tasse, **碗** (wǎn) bol, **条** (tiáo) long et fin, **张** (zhāng) surface plate, **双** (shuāng) paire identique

**Piège :** un francophone dit « 3 livres » et produit 三书, qui n'existe pas : il faut 三本书. Le classificateur reste obligatoire après un démonstratif seul, donc 那咖啡 ne marche pas et on dit 那杯咖啡 (nà bēi kāfēi). Pour les personnes, la forme polie est 位, comme dans 这两位老师 (zhè liǎng wèi lǎoshī) = ces 2 profs. Attention enfin à la place de 半 (bàn) : 半个小时 = une demi-heure, 三个半小时 = 3 heures et demie, jamais 三个小时半.`,
    introContentEn: `In Chinese a number never touches the noun directly: you need a measure word in between.

- **本** (běn) = bound books: 我买了三本书 (wǒ mǎi le sān běn shū) = I bought 3 books
- **个** (ge) = the generic measure word, for people and abstract things: 三个朋友 (sān ge péngyǒu) = 3 friends, 一个问题 (yí ge wèntí) = one problem
- **两** (liǎng) counts, **二** (èr) lists: 两本书 (liǎng běn shū) = 2 books, but 二楼 (èr lóu) = the 2nd floor
- The measure word also describes shape or container: **杯** (bēi) cup, **碗** (wǎn) bowl, **条** (tiáo) long and thin, **张** (zhāng) flat surface, **双** (shuāng) identical pair

**Pitfall:** learners say "3 books" and produce 三书, which does not exist: it has to be 三本书. The classifier stays mandatory after a bare demonstrative too, so 那咖啡 doesn't work and you say 那杯咖啡 (nà bēi kāfēi). For people, the polite form is 位, as in 这两位老师 (zhè liǎng wèi lǎoshī) = these 2 teachers. Finally, watch where 半 (bàn) goes: 半个小时 = half an hour, 三个半小时 = 3 and a half hours, never 三个小时半.`,
    objectives: [`Placer le mot de mesure entre le nombre et le nom`, `Choisir 两 pour compter et 二 pour énumérer`, `Associer 杯, 碗, 条, 张 à la bonne forme`, `Positionner 半 juste après le mot de mesure`],
    objectivesEn: [`Place the measure word between number and noun`, `Pick 两 for counting and 二 for listing`, `Match 杯, 碗, 条, 张 to the right shape`, `Put 半 right after the measure word`],
    flashcards: [`个`, `本`, `位`, `杯`, `碗`, `条`, `张`, `双`, `套`],
  },
  "cecr-a2-grammar-m6": {
    title: `Modaux d'obligation + compléments directionnels de base`, titleEn: `Obligation modals + basic directional complements`,
    duration: 14,
    category: `grammar`,
    difficulty: `beginner`,
    introTitle: `应该 conseille, 得 dépanne, 必须 impose`,
    introTitleEn: `应该 advises, 得 handles daily needs, 必须 commands`,
    introContent: `Cette leçon monte l'échelle de l'obligation, puis apprend à orienter un mouvement avec 来 et 去.

- **应该** (yīnggāi) = conseil doux : 你应该多喝水 (nǐ yīnggāi duō hē shuǐ) = tu devrais boire plus d'eau
- **得** (děi, et non « de ») = nécessité pratique, très orale : 我得走了 (wǒ děi zǒu le) = il faut que j'y aille
- **必须** (bìxū) = obligation absolue, registre ferme : 学生必须交作业 (xuéshēng bìxū jiāo zuòyè) = les élèves doivent rendre les devoirs
- **来** et **去** se choisissent depuis la position de celui qui parle : 你过来 (nǐ guò lai) = viens ici, 我出去买东西 (wǒ chū qù mǎi dōngxi) = je sors faire des courses

**Piège :** la négation de 得 n'est pas 不得. On passe par 不用 (bú yòng) « pas besoin » : 你不用去. De même, 必须 se nie par 不必 (bú bì). Côté direction, ne traduis pas « venir » mécaniquement par 来 : le chinois demande d'abord où TU es. 他进去了 = il est entré dans une pièce loin de moi, alors que 请进来 = entre, je suis à l'intérieur.`,
    introContentEn: `This lesson climbs the obligation scale, then teaches you to aim a movement with 来 and 去.

- **应该** (yīnggāi) = gentle advice: 你应该多喝水 (nǐ yīnggāi duō hē shuǐ) = you should drink more water
- **得** (děi, not "de") = practical necessity, very colloquial: 我得走了 (wǒ děi zǒu le) = I have to go
- **必须** (bìxū) = absolute obligation, firm register: 学生必须交作业 (xuéshēng bìxū jiāo zuòyè) = students must hand in their homework
- **来** and **去** are chosen from the speaker's position: 你过来 (nǐ guò lai) = come here, 我出去买东西 (wǒ chū qù mǎi dōngxi) = I'm going out to shop

**Pitfall:** the negation of 得 is not 不得. You switch to 不用 (bú yòng) "no need": 你不用去. Likewise 必须 is negated with 不必 (bú bì). On the directional side, don't translate "come" mechanically as 来: Chinese first asks where YOU are. 他进去了 = he went into a room away from me, while 请进来 = come in, I'm inside.`,
    objectives: [`Classer 应该, 得, 必须, 一定要 par intensité`, `Nier avec 不用 et 不必 plutôt que 不得`, `Choisir 来 ou 去 selon la position du locuteur`, `Composer verbe + directionnel + 来/去`],
    objectivesEn: [`Rank 应该, 得, 必须, 一定要 by strength`, `Negate with 不用 and 不必 instead of 不得`, `Choose 来 or 去 from the speaker's position`, `Build verb + directional + 来/去`],
    flashcards: [`应该`, `得`, `必须`, `一定要`, `不用`, `不必`, `进来`, `出去`, `回来`],
  },
  "cecr-a2-grammar-m7": {
    title: `Compléments de durée : « pendant X » vs « ça fait X »`, titleEn: `Duration complements: « for X » vs « for X now »`,
    duration: 15,
    category: `grammar`,
    difficulty: `beginner`,
    introTitle: `了 après le verbe : c'est fini ; 了 en fin : ça dure`,
    introTitleEn: `了 after the verb: it's over; 了 at the end: it continues`,
    introContent: `Une seule particule, deux positions, deux durées opposées.

- Action ACHEVÉE, 了 juste après le verbe : 他跑了一个小时 (tā pǎo le yí ge xiǎoshí) = il a couru pendant une heure
- Situation qui CONTINUE, 了 en fin de phrase : 我来中国一个月了 (wǒ lái Zhōngguó yí ge yuè le) = ça fait un mois que je suis en Chine, et j'y suis toujours
- Avec un objet, trois montages équivalents : 我学中文学了两年, 我学了两年中文, 我学了两年的中文 (wǒ xué le liǎng nián de zhōngwén) = j'ai étudié le chinois pendant 2 ans
- Compter les occurrences : **次** (cì) une occasion, **遍** (biàn) un cycle complet, **回** (huí) plus oral : 这本书我看了两遍 = j'ai lu ce livre 2 fois en entier

**Piège :** oublier le 了 final. 我来中国一个月 tout seul sonne incomplet, comme « je viens en Chine un mois ». Autre réflexe à installer : dans une comparaison avec 比, la quantité vient TOUJOURS après l'adjectif. On dit 比他高一点儿 (bǐ tā gāo yìdiǎnr), jamais 比他一点儿高.`,
    introContentEn: `One particle, two positions, two opposite kinds of duration.

- COMPLETED action, 了 right after the verb: 他跑了一个小时 (tā pǎo le yí ge xiǎoshí) = he ran for an hour
- ONGOING situation, 了 at the end of the sentence: 我来中国一个月了 (wǒ lái Zhōngguó yí ge yuè le) = I've been in China for a month, and I'm still here
- With an object, three equivalent patterns: 我学中文学了两年, 我学了两年中文, 我学了两年的中文 (wǒ xué le liǎng nián de zhōngwén) = I studied Chinese for 2 years
- Counting occurrences: **次** (cì) an occasion, **遍** (biàn) a full cycle, **回** (huí) more colloquial: 这本书我看了两遍 = I read this book twice from cover to cover

**Pitfall:** forgetting the final 了. 我来中国一个月 on its own sounds unfinished, like "I come to China one month". One more reflex to build: in a 比 comparison the amount ALWAYS comes after the adjective. Say 比他高一点儿 (bǐ tā gāo yìdiǎnr), never 比他一点儿高.`,
    objectives: [`Placer 了 après le verbe pour une durée achevée`, `Fermer par 了 une situation encore en cours`, `Distinguer 次 (occasion) de 遍 (cycle complet)`, `Poser l'écart après l'adjectif dans une comparaison 比`],
    objectivesEn: [`Put 了 after the verb for a completed duration`, `Close with 了 for a situation still ongoing`, `Tell 次 (occasion) from 遍 (full cycle)`, `Place the gap after the adjective in a 比 comparison`],
    flashcards: [`了`, `已经`, `小时`, `分钟`, `睡觉`, `游泳`, `次`, `遍`, `比`],
  },
  "cecr-a2-grammar-m8": {
    title: `Particules finales : 吗, 呢, 吧, 啊, 啦, 的`, titleEn: `Sentence-final particles: 吗, 呢, 吧, 啊, 啦, 的`,
    duration: 12,
    category: `grammar`,
    difficulty: `beginner`,
    introTitle: `吗 questionne, 呢 relance, 吧 adoucit, 啦 presse`,
    introTitleEn: `吗 asks, 呢 bounces back, 吧 softens, 啦 hurries`,
    introContent: `Les particules finales ne changent pas le sens de base : elles changent le TON. Sans elles, ton chinois sonne robotique.

- **吗** (ma) transforme une affirmation en question oui/non : 你饿了吗 ? (nǐ è le ma) = tu as faim ?
- **呢** (ne) renvoie la question, marque une action en cours ou une réflexion : 你呢 ? (nǐ ne) = et toi ?, 他睡觉呢 = il dort en ce moment
- **吧** (ba) change un ordre en suggestion, ou pose une supposition : 我们一起去吧 (wǒmen yìqǐ qù ba) = allons-y ensemble, 你是老师吧 ? = tu es prof, non ?
- **啊** (a) porte l'émotion et **啦** (la) l'urgence chaleureuse : 好啊 ! (hǎo a) = d'accord !, 快点啦 ! (kuài diǎn la) = dépêche-toi !

**Astuce :** 啊 change de forme selon le son qui précède, 呀 après a/o/e/i/ü, 哇 après u, 哪 après n. Ce sont les mêmes particules, seule la prononciation s'adapte. Ne confonds pas non plus le 的 de possession et le 的 final de certitude : 你一定会成功的 (nǐ yídìng huì chénggōng de) = tu vas réussir, c'est sûr.`,
    introContentEn: `Final particles don't change the basic meaning: they change the TONE. Without them your Chinese sounds robotic.

- **吗** (ma) turns a statement into a yes/no question: 你饿了吗 ? (nǐ è le ma) = are you hungry?
- **呢** (ne) bounces the question back, marks an ongoing action or a pondering question: 你呢 ? (nǐ ne) = and you?, 他睡觉呢 = he's sleeping right now
- **吧** (ba) turns an order into a suggestion, or states an assumption: 我们一起去吧 (wǒmen yìqǐ qù ba) = let's go together, 你是老师吧 ? = you're a teacher, right?
- **啊** (a) carries emotion and **啦** (la) warm urgency: 好啊 ! (hǎo a) = sure!, 快点啦 ! (kuài diǎn la) = hurry up!

**Tip:** 啊 changes shape according to the preceding sound, 呀 after a/o/e/i/ü, 哇 after u, 哪 after n. Same particle, only the pronunciation adapts. Also don't mix up possessive 的 with the final 的 of certainty: 你一定会成功的 (nǐ yídìng huì chénggōng de) = you're going to succeed, for sure.`,
    objectives: [`Poser une question oui/non avec 吗`, `Employer 呢 pour relancer ou marquer l'action en cours`, `Adoucir un ordre en suggestion avec 吧`, `Rassurer avec le 的 final de certitude`],
    objectivesEn: [`Ask a yes/no question with 吗`, `Use 呢 to bounce back or mark an ongoing action`, `Soften an order into a suggestion with 吧`, `Reassure with the final 的 of certainty`],
    flashcards: [`吗`, `呢`, `吧`, `啊`, `呀`, `哇`, `啦`, `的`, `成功`],
  },
  "cecr-a2-grammar-m9": {
    title: `Le mot 在 : localisation, cadre d'action, « -ing »`, titleEn: `The word 在: location, action setting, "-ing"`,
    duration: 14,
    category: `grammar`,
    difficulty: `beginner`,
    introTitle: `在 : lieu, cadre de l'action, ou « en train de »`,
    introTitleEn: `在: place, action setting, or "in the middle of"`,
    introContent: `Un seul mot, 在 (zài), pour trois emplois que sa POSITION dans la phrase suffit à distinguer.

- Localisation, sujet + 在 + lieu : 手机在桌子上 (shǒujī zài zhuōzi shàng) = le téléphone est sur la table, 书在包里 (shū zài bāo lǐ) = le livre est dans le sac
- Cadre de l'action, 在 + lieu AVANT le verbe : 我在家吃饭 (wǒ zài jiā chī fàn) = je mange à la maison
- Localisation résultante, 在 APRÈS le verbe avec 住, 坐, 站, 放 : 我住在北京 (wǒ zhù zài Běijīng) = j'habite à Pékin
- Action en cours, 在 juste devant le verbe : 我在看书 (wǒ zài kàn shū) = je suis en train de lire ; **正在** (zhèngzài) insiste, et 呢 en fin de phrase détend le ton

**Piège :** ne dis jamais 我是在家. Pour la localisation, 在 remplace 是, et 我在家 suffit. Attention aussi à la négation du progressif : ce n'est pas 不在 mais **没在**, comme dans 我没在睡觉，我在工作.`,
    introContentEn: `One word, 在 (zài), for three uses that its POSITION in the sentence is enough to tell apart.

- Location, subject + 在 + place: 手机在桌子上 (shǒujī zài zhuōzi shàng) = the phone is on the table, 书在包里 (shū zài bāo lǐ) = the book is in the bag
- Setting of the action, 在 + place BEFORE the verb: 我在家吃饭 (wǒ zài jiā chī fàn) = I eat at home
- Resulting location, 在 AFTER the verb with 住, 坐, 站, 放: 我住在北京 (wǒ zhù zài Běijīng) = I live in Beijing
- Ongoing action, 在 right before the verb: 我在看书 (wǒ zài kàn shū) = I'm reading right now; **正在** (zhèngzài) adds emphasis, and 呢 at the end makes it casual

**Pitfall:** never say 我是在家. For location, 在 replaces 是, and 我在家 is enough. Also mind the negation of the progressive: it isn't 不在 but **没在**, as in 我没在睡觉，我在工作.`,
    objectives: [`Situer un objet avec 在 + localisateur (里, 上, 下)`, `Placer 在 + lieu avant le verbe d'action`, `Réserver 在 après le verbe à 住, 坐, 放`, `Marquer l'action en cours avec 在 et 正在`],
    objectivesEn: [`Locate an object with 在 + localizer (里, 上, 下)`, `Put 在 + place before the action verb`, `Keep post-verb 在 for 住, 坐, 放`, `Mark an ongoing action with 在 and 正在`],
    flashcards: [`在`, `里`, `上`, `下`, `旁边`, `住`, `放`, `正在`, `着`],
  },
  "cecr-a2-grammar-m10": {
    title: `Le particule 过 : marquer une expérience vécue`, titleEn: `The 过 particle: marking a life experience`,
    duration: 15,
    category: `grammar`,
    difficulty: `beginner`,
    introTitle: `过 = déjà fait au moins une fois dans ma vie`,
    introTitleEn: `过 = done at least once in my life`,
    introContent: `过 (guo, ton neutre) ne dit pas QUAND : il dit que l'action figure dans ton expérience de vie.

- Structure sujet + verbe + **过** + objet : 我去过北京 (wǒ qù guo Běijīng) = je suis déjà allé à Pékin, 我吃过日本菜 (wǒ chī guo Rìběn cài) = j'ai déjà mangé japonais
- Négation avec **没** devant le verbe, 过 reste derrière : 我没去过中国 (wǒ méi qù guo Zhōngguó) = je ne suis jamais allé en Chine
- Renfort avec **从来** (cónglái) : 他从来没喝过酒 (tā cónglái méi hē guo jiǔ) = il n'a jamais bu d'alcool de sa vie
- Compter les fois avec **次** (cì) : 我去过北京三次 (wǒ qù guo Běijīng sān cì) = je suis allé à Pékin trois fois

**Piège :** on ne nie JAMAIS une expérience avec 不. 我不去过中国 est faux, c'est 没 qu'il faut. Autre repère face à 了 : 我吃过日本菜 raconte une expérience, alors que 昨天我吃了日本菜 date un événement précis. Enfin, les verbes d'état 是, 有, 认识, 姓 refusent 过.`,
    introContentEn: `过 (guo, neutral tone) doesn't say WHEN: it says the action is part of your life experience.

- Pattern subject + verb + **过** + object: 我去过北京 (wǒ qù guo Běijīng) = I've been to Beijing, 我吃过日本菜 (wǒ chī guo Rìběn cài) = I've eaten Japanese food
- Negation with **没** before the verb, 过 stays behind: 我没去过中国 (wǒ méi qù guo Zhōngguó) = I've never been to China
- Reinforce with **从来** (cónglái): 他从来没喝过酒 (tā cónglái méi hē guo jiǔ) = he has never drunk alcohol in his life
- Count times with **次** (cì): 我去过北京三次 (wǒ qù guo Běijīng sān cì) = I've been to Beijing three times

**Pitfall:** you NEVER negate an experience with 不. 我不去过中国 is wrong, it has to be 没. Another landmark against 了: 我吃过日本菜 reports an experience, while 昨天我吃了日本菜 dates a specific event. Finally, the stative verbs 是, 有, 认识, 姓 reject 过.`,
    objectives: [`Marquer une expérience vécue avec verbe + 过`, `Nier avec 没...过 et jamais 不...过`, `Renforcer avec 从来没...过`, `Distinguer 过 (expérience) de 了 (action datée)`],
    objectivesEn: [`Mark a life experience with verb + 过`, `Negate with 没...过 and never 不...过`, `Reinforce with 从来没...过`, `Tell 过 (experience) from 了 (dated action)`],
    flashcards: [`过`, `没`, `没有`, `从来`, `次`, `已经`, `昨天`, `尝`],
  },
  "cecr-a2-nuances-m8": {
    title: `开 comme verbe principal — ouvrir, lancer, opérer`, titleEn: `开 as main verb — open, launch, operate`,
    duration: 12,
    category: `vocabulary`,
    difficulty: `beginner`,
    introTitle: `开 : faire passer de fermé à ouvert, actif, lancé`,
    introTitleEn: `开: moving from closed to open, on, running`,
    introContent: `开 (kāi) tourne toujours autour de la même image : ce qui était fermé, éteint ou à l'arrêt s'ouvre et se met en marche.

- Ouvrir et allumer : **开门** (kāimén) ouvrir la porte, **开灯** (kāidēng) allumer la lumière, **开空调** (kāi kōngtiáo) mettre la clim, 花开了 (huā kāi le) = les fleurs ont éclos
- Émettre un document : **开发票** (kāi fāpiào) émettre une facture, 开药 (kāi yào) prescrire des médicaments
- Lancer une activité : **开始** (kāishǐ) commencer, **开学** (kāixué) la rentrée, **开饭** (kāifàn) le repas est servi, **开玩笑** (kāi wánxiào) plaisanter
- Conduire, tenir, animer : **开车** (kāichē) conduire, **开店** (kāidiàn) tenir un magasin, **开会** (kāihuì) tenir une réunion

**Piège :** 开学 n'est pas 开始学. 开学 (kāixué) est un mot figé qui désigne la rentrée scolaire, alors que 开始学 (kāishǐ xué) veut dire « commencer à étudier ». Et 开 ne couvre pas tous les véhicules : pour un vélo ou un cheval, on dit 骑 (qí), pas 开.`,
    introContentEn: `开 (kāi) always circles the same image: what was closed, switched off or idle opens up and starts running.

- Open and switch on: **开门** (kāimén) open the door, **开灯** (kāidēng) turn on the light, **开空调** (kāi kōngtiáo) put on the AC, 花开了 (huā kāi le) = the flowers have bloomed
- Issue a document: **开发票** (kāi fāpiào) issue an invoice, 开药 (kāi yào) prescribe medicine
- Launch an activity: **开始** (kāishǐ) begin, **开学** (kāixué) the start of school, **开饭** (kāifàn) dinner is served, **开玩笑** (kāi wánxiào) to joke
- Drive, run, host: **开车** (kāichē) drive, **开店** (kāidiàn) run a shop, **开会** (kāihuì) hold a meeting

**Pitfall:** 开学 is not 开始学. 开学 (kāixué) is a fixed word meaning the start of the school year, while 开始学 (kāishǐ xué) means "to start studying". And 开 doesn't cover every vehicle: for a bike or a horse you say 骑 (qí), not 开.`,
    objectives: [`Relier les sens de 开 à l'image « fermé vers ouvert »`, `Allumer un appareil avec 开 + objet`, `Lancer une activité avec 开始 et les composés en 开`, `Distinguer le mot figé 开学 du groupe 开始学`],
    objectivesEn: [`Link the senses of 开 to the "closed to open" image`, `Switch on a device with 开 + object`, `Launch an activity with 开始 and 开 compounds`, `Tell the fixed word 开学 from the phrase 开始学`],
    flashcards: [`开门`, `开灯`, `开心`, `开始`, `开学`, `开玩笑`, `开车`, `开店`, `开会`],
  },
  "cecr-a2-nuances-m9": {
    title: `怎么 vs 怎么样 vs 什么样 — 3 façons de demander « comment »`, titleEn: `怎么 vs 怎么样 vs 什么样 — 3 ways to ask "how"`,
    duration: 12,
    category: `grammar`,
    difficulty: `beginner`,
    introTitle: `怎么 = méthode, 怎么样 = jugement, 什么样 = description`,
    introTitleEn: `怎么 = method, 怎么样 = judgement, 什么样 = description`,
    introContent: `Un seul « comment » en français, trois questions différentes en chinois. Le choix dépend de la réponse que tu attends.

- **怎么** + verbe demande la MÉTHODE : 这个字怎么写 ? (zhège zì zěnme xiě) = comment écrit-on ce caractère ?, 去地铁站怎么走 ? (qù dìtiězhàn zěnme zǒu) = comment va-t-on à la station de métro ?
- **怎么样** demande un JUGEMENT, et la réponse attendue est un adjectif : 你最近怎么样 ? (nǐ zuìjìn zěnmeyàng) = comment ça va ces temps-ci ? La réponse polie et négative est 不怎么样 (bù zěnmeyàng) = bof, pas top
- **怎么样** sert aussi à proposer : 我们先喝咖啡，怎么样 ? = on prend un café d'abord, ça te va ?
- **什么样的** + nom demande une DESCRIPTION de type : 他是个什么样的人 ? (tā shì ge shénmeyàng de rén) = c'est quel genre de personne ?

**Piège :** en français « comment » ouvre la phrase, alors qu'en chinois 怎么 reste juste avant le verbe, à la place où irait la réponse ; l'objet monte en tête comme topique, d'où 这道菜怎么做 ?. Retiens aussi que 这家店怎么样 attend « pas mal », tandis que 这家店是什么样的 attend une description.`,
    introContentEn: `One "how" in French, three different questions in Chinese. The choice depends on the answer you expect.

- **怎么** + verb asks for the METHOD: 这个字怎么写 ? (zhège zì zěnme xiě) = how do you write this character?, 去地铁站怎么走 ? (qù dìtiězhàn zěnme zǒu) = how do I get to the subway station?
- **怎么样** asks for a JUDGEMENT, and the expected answer is an adjective: 你最近怎么样 ? (nǐ zuìjìn zěnmeyàng) = how have you been lately? The polite negative answer is 不怎么样 (bù zěnmeyàng) = meh, not great
- **怎么样** also makes a suggestion: 我们先喝咖啡，怎么样 ? = let's have a coffee first, how about it?
- **什么样的** + noun asks for a DESCRIPTION of type: 他是个什么样的人 ? (tā shì ge shénmeyàng de rén) = what kind of person is he?

**Pitfall:** in French "comment" opens the sentence, whereas in Chinese 怎么 stays right before the verb, where the answer would go; the object moves to the front as a topic, hence 这道菜怎么做 ?. Remember too that 这家店怎么样 expects "not bad", while 这家店是什么样的 expects a description.`,
    objectives: [`Demander la méthode avec 怎么 + verbe`, `Demander un avis avec 怎么样`, `Proposer une activité avec « …，怎么样 ? »`, `Décrire un type avec 什么样的 + nom`],
    objectivesEn: [`Ask for the method with 怎么 + verb`, `Ask for an opinion with 怎么样`, `Suggest an activity with "…，怎么样 ?"`, `Describe a type with 什么样的 + noun`],
    flashcards: [`怎么`, `怎么样`, `不怎么样`, `什么样`, `怎样`, `如何`, `哪种`, `最近`, `方法`],
  },
  "cecr-a2-nuances-m10": {
    title: `Erreurs courantes des débutants — 是, 有, âge, ordre, 了`, titleEn: `Common beginner mistakes — 是, 有, age, order, 了`,
    duration: 16,
    category: `grammar`,
    difficulty: `beginner`,
    introTitle: `Pas de 是 devant un adjectif, pas de 了 après 没`,
    introTitleEn: `No 是 before an adjective, no 了 after 没`,
    introContent: `Cette leçon corrige les calques du français qui reviennent le plus souvent.

- Pas de **是** devant un adjectif : 今天很冷 (jīntiān hěn lěng) = il fait froid aujourd'hui, et jamais 今天是冷. Le 很 sert de tampon, il ne veut pas forcément dire « très »
- **是** identifie, **有** signale l'existence ou la possession, **在** situe : 他是学生, 这里有很多人 (zhèlǐ yǒu hěn duō rén) = il y a beaucoup de monde ici, 东西在桌子上
- L'âge se donne sans verbe : 我三十岁 (wǒ sānshí suì) = j'ai 30 ans, et surtout pas 我是三十岁
- L'ordre est fixe, sujet + temps + lieu + verbe : 我明天去北京 (wǒ míngtiān qù Běijīng) = je vais à Pékin demain, et non 我去北京明天
- Un seul **了** par proposition, et aucun avec **没** : 昨天我没去公园 (zuótiān wǒ méi qù gōngyuán) = hier je ne suis pas allé au parc

**Piège :** répondre « oui ». Le chinois n'a pas de « oui » universel, on reprend le verbe de la question. 你喜欢中国菜吗 ? donne 喜欢, et 你去不去 ? donne 去 ou 不去. 对 confirme un énoncé, il ne répond pas à un verbe.`,
    introContentEn: `This lesson fixes the French-driven calques that come back most often.

- No **是** before an adjective: 今天很冷 (jīntiān hěn lěng) = it's cold today, and never 今天是冷. 很 works as a buffer, it doesn't necessarily mean "very"
- **是** identifies, **有** signals existence or possession, **在** locates: 他是学生, 这里有很多人 (zhèlǐ yǒu hěn duō rén) = there are lots of people here, 东西在桌子上
- Age is stated without a verb: 我三十岁 (wǒ sānshí suì) = I'm 30, and definitely not 我是三十岁
- Word order is fixed, subject + time + place + verb: 我明天去北京 (wǒ míngtiān qù Běijīng) = I'm going to Beijing tomorrow, not 我去北京明天
- One **了** per clause, and none with **没**: 昨天我没去公园 (zuótiān wǒ méi qù gōngyuán) = yesterday I didn't go to the park

**Pitfall:** answering "yes". Chinese has no universal "yes"; you echo the verb of the question. 你喜欢中国菜吗 ? gets 喜欢, and 你去不去 ? gets 去 or 不去. 对 confirms a statement, it doesn't answer a verb.`,
    objectives: [`Construire « sujet + 很 + adjectif » sans 是`, `Répartir 是, 有 et 在 selon leur rôle`, `Ranger le temps et le lieu avant le verbe`, `Répondre en reprenant le verbe de la question`],
    objectivesEn: [`Build "subject + 很 + adjective" without 是`, `Assign 是, 有 and 在 to their own roles`, `Put time and place before the verb`, `Answer by echoing the verb of the question`],
    flashcards: [`很`, `是`, `有`, `在`, `岁`, `多大`, `也`, `因为`, `所以`],
  },
  "cecr-a2-nuances-m11": {
    title: `差不多 et 快要...了 : dire « presque »`, titleEn: `差不多 and 快要...了: saying «almost»`,
    duration: 10,
    category: `grammar`,
    difficulty: `beginner`,
    introTitle: `差不多 = à peu près, 快要...了 = c'est imminent`,
    introTitleEn: `差不多 = roughly, 快要...了 = it's about to happen`,
    introContent: `Deux façons de dire « presque » : l'une compare ou estime, l'autre annonce un événement imminent.

- **差不多** (chàbuduō), littéralement « peu de différence », rapproche deux choses : 这两个差不多大 (zhè liǎng ge chàbuduō dà) = ces 2 font à peu près la même taille
- Il dit aussi « presque fini » : 我的作业差不多写完了 (wǒ de zuòyè chàbuduō xiě wán le) = mon devoir est presque terminé. Et il se suffit à lui-même : « 你好了吗 ? » se répond par 差不多了
- **快要...了** annonce l'imminence : 我们快要到家了 (wǒmen kuàiyào dàojiā le) = on va bientôt être chez nous, 电影快要开始了 (diànyǐng kuàiyào kāishǐ le) = le film va bientôt commencer
- Formes courtes à l'oral : 快到了 (kuài dào le), 要下雨了 (yào xiàyǔ le) = il va pleuvoir. **就要...了** vise un horaire précis : 火车就要开了

**Règle :** le 了 final de 快要...了 n'est pas décoratif, c'est lui qui porte le changement d'état, et sans lui la structure ne tient pas. Garde par ailleurs 差不多 pour l'oral détendu : dans une annonce officielle on entendra plutôt 即将 (jíjiāng), comme dans 会议即将开始.`,
    introContentEn: `Two ways to say "almost": one compares or estimates, the other announces an imminent event.

- **差不多** (chàbuduō), literally "little difference", brings two things close: 这两个差不多大 (zhè liǎng ge chàbuduō dà) = these 2 are about the same size
- It also means "almost done": 我的作业差不多写完了 (wǒ de zuòyè chàbuduō xiě wán le) = my homework is nearly finished. And it stands alone: "你好了吗 ?" is answered with 差不多了
- **快要...了** announces imminence: 我们快要到家了 (wǒmen kuàiyào dàojiā le) = we'll be home soon, 电影快要开始了 (diànyǐng kuàiyào kāishǐ le) = the film is about to start
- Short spoken forms: 快到了 (kuài dào le), 要下雨了 (yào xiàyǔ le) = it's going to rain. **就要...了** targets a precise scheduled moment: 火车就要开了

**Rule:** the final 了 in 快要...了 is not decorative, it carries the change of state, and without it the structure collapses. Also keep 差不多 for relaxed speech: in an official announcement you'll hear 即将 (jíjiāng) instead, as in 会议即将开始.`,
    objectives: [`Comparer deux choses avec 差不多`, `Répondre « presque » avec 差不多了`, `Annoncer un événement imminent avec 快要...了`, `Fermer la structure par le 了 final`],
    objectivesEn: [`Compare two things with 差不多`, `Answer "almost" with 差不多了`, `Announce an imminent event with 快要...了`, `Close the structure with the final 了`],
    flashcards: [`差不多`, `差不多了`, `作业`, `快要`, `就要`, `到家`, `下雨`, `即将`],
  },
  "cecr-a2-nuances-m12": {
    title: `你好 en vrai — au-delà du manuel`, titleEn: `Real 你好 — beyond the textbook`,
    duration: 14,
    category: `conversation`,
    difficulty: `beginner`,
    introTitle: `你好 = « excusez-moi » plus souvent que « bonjour »`,
    introTitleEn: `你好 = «excuse me» more often than «hello»`,
    introContent: `Les manuels traduisent **你好** par « bonjour », mais entre amis les natifs l'emploient rarement : ça crée de la distance. Son vrai terrain, c'est l'inconnu, la situation formelle — et surtout l'appel à l'attention.

- **你好** (nǐhǎo) = bonjour formel, mais aussi « excusez-moi » : 你好，请问图书馆在哪里 ? = « excusez-moi, où est la bibliothèque ? »
- **您好** (nínhǎo) = version respectueuse avec **您**, pour un prof, un chef, un client : 李教授，您好.
- **早** (zǎo) = le « salut » du matin, une syllabe suffit ; **大家好** (dàjiā hǎo) pour saluer un groupe, plutôt que 你们好 qui sonne raide.
- **喂** (wéi) = « allô » au téléphone, sur un ton montant : 喂，你好，请问哪位 ?

**Piège :** 你好吗 (nǐ hǎo ma) ? — enseigné dans tous les manuels — ne se dit presque jamais. Les natifs demandent 最近怎么样 (zuìjìn zěnmeyàng) ? Et souvent le nom seul (小王 ! 张老师 !) ou une remarque d'observation (下班了 !) suffit à dire bonjour.`,
    introContentEn: `Textbooks translate **你好** as «hello», but native speakers rarely use it among friends: it creates distance. Its real territory is strangers, formal situations — and above all, getting someone's attention.

- **你好** (nǐhǎo) = formal hello, but also «excuse me»: 你好，请问图书馆在哪里 ? = «excuse me, where is the library?»
- **您好** (nínhǎo) = the respectful version with **您**, for a teacher, a boss, a client: 李教授，您好.
- **早** (zǎo) = the morning «hi», one syllable is enough; **大家好** (dàjiā hǎo) to greet a group, rather than 你们好, which sounds stiff.
- **喂** (wéi) = «hello» on the phone, with a rising tone: 喂，你好，请问哪位 ?

**Trap:** 你好吗 (nǐ hǎo ma)? — taught in every textbook — is almost never said. Native speakers ask 最近怎么样 (zuìjìn zěnmeyàng)? And often a name alone (小王 ! 张老师 !) or an observation (下班了 !) is enough to say hello.`,
    objectives: [`Utiliser 你好 comme « excusez-moi »`, `Choisir entre 你好, 您好 et 大家好`, `Saluer avec 早 ou par le nom seul`, `Répondre au téléphone avec 喂`],
    objectivesEn: [`Use 你好 as «excuse me»`, `Choose between 你好, 您好 and 大家好`, `Greet with 早 or with a name alone`, `Answer the phone with 喂`],
    flashcards: [`你好`, `您好`, `请问`, `最近`, `怎么样`, `大家好`, `喂`, `师傅`],
  },
  "cecr-a2-nuances-m13": {
    title: `Premières rencontres, formalités et retrouvailles`, titleEn: `First meetings, formalities and reunions`,
    duration: 15,
    category: `conversation`,
    difficulty: `beginner`,
    introTitle: `很高兴认识你 pour la 1re fois, 好久不见 pour se revoir`,
    introTitleEn: `很高兴认识你 for first meetings, 好久不见 for reunions`,
    introContent: `Une première rencontre et des retrouvailles n'appellent pas la même formule : confondre les deux sonne bizarre à une oreille chinoise.

- **很高兴认识你** (hěn gāoxìng rènshí nǐ) = « ravi de te rencontrer », le passe-partout, formel comme décontracté. Réponse courte : 我也是 (wǒ yě shì).
- **认识** (rènshí) = faire connaissance, donc une première fois ; **见到** (jiàndào) = voir, y compris quelqu'un qu'on connaissait déjà par messages.
- **幸会** (xìnghuì) et **很荣幸认识您** (hěn róngxìng rènshí nín) : registre professionnel et respectueux, avec **您**. **久仰大名** (jiǔyǎngdàmíng) se réserve à une personne vraiment reconnue.
- **好久不见** (hǎojiǔbújiàn) = « ça fait longtemps ! », uniquement avec quelqu'un qu'on connaît déjà, souvent suivi de 最近好吗 ?

**Piège :** ne lance jamais 好久不见 à quelqu'un que tu rencontres pour la première fois. Et 相见恨晚 (xiāngjiànhènwǎn) n'est pas une salutation d'entrée : ce chengyu se dit après avoir discuté, quand le courant passe vraiment bien.`,
    introContentEn: `A first meeting and a reunion do not call for the same phrase: mixing them up sounds odd to a Chinese ear.

- **很高兴认识你** (hěn gāoxìng rènshí nǐ) = «nice to meet you», the all-purpose choice, formal or casual. Short reply: 我也是 (wǒ yě shì).
- **认识** (rènshí) = to get acquainted, so a first time; **见到** (jiàndào) = to see, including someone you already knew through messages.
- **幸会** (xìnghuì) and **很荣幸认识您** (hěn róngxìng rènshí nín): professional, respectful register, with **您**. **久仰大名** (jiǔyǎngdàmíng) is reserved for genuinely well-known people.
- **好久不见** (hǎojiǔbújiàn) = «long time no see!», only with someone you already know, often followed by 最近好吗 ?

**Trap:** never throw 好久不见 at someone you are meeting for the first time. And 相见恨晚 (xiāngjiànhènwǎn) is not an opening greeting: this chengyu comes after some conversation, when you really click.`,
    objectives: [`Dire 很高兴认识你 en première rencontre`, `Distinguer 认识 et 见到`, `Monter en registre avec 幸会 et 很荣幸认识您`, `Réserver 好久不见 aux retrouvailles`],
    objectivesEn: [`Say 很高兴认识你 at a first meeting`, `Tell 认识 apart from 见到`, `Raise the register with 幸会 and 很荣幸认识您`, `Keep 好久不见 for reunions`],
    flashcards: [`很高兴认识你`, `认识`, `见到`, `高兴`, `我也是`, `幸会`, `荣幸`, `久仰大名`, `好久不见`],
  },
  "cecr-a2-nuances-m14": {
    title: `« Si oui ou non » : V-不-V et 还是`, titleEn: `« Whether or not »: V-不-V and 还是`,
    duration: 13,
    category: `grammar`,
    difficulty: `beginner`,
    introTitle: `V-不-V = « X ou pas X », 还是 = « A ou B »`,
    introTitleEn: `V-不-V = «X or not X», 还是 = «A or B»`,
    introContent: `Le chinois n'a pas de mot unique pour « si oui ou non » : au lieu de traduire, on énonce les deux possibilités.

- **V-不-V** : verbe + 不 + verbe. 你去不去 ? (nǐ qù bu qù) = « tu y vas ou pas ? ». Pour un dissyllabique, forme courte possible : **喜不喜欢** (xǐ bu xǐhuān), **明不明白** (míng bu míngbái).
- Les cinq classiques : **是不是** (vérifier un fait), **有没有** (posséder ou avoir fait), **要不要** (décision, offre), **能不能** (capacité), **会不会** (probabilité future). Ajoute **可不可以** pour la permission polie.
- **还是** (háishì) prend le relais quand les deux options sont distinctes et non opposées : 你想喝咖啡还是茶 ? = « tu veux du café ou du thé ? ».

**Piège :** 有 se nie avec 没, jamais avec 不 — donc 有没有, et non 有不有. Autre réflexe francophone à corriger : pas de 吗 avec un V-不-V, et surtout pas de 如果, qui introduit une condition hypothétique et non une incertitude oui/non.`,
    introContentEn: `Chinese has no single word for «whether or not»: instead of translating it, you state both possibilities.

- **V-不-V**: verb + 不 + verb. 你去不去 ? (nǐ qù bu qù) = «are you going or not?». For two-syllable words, a short form is possible: **喜不喜欢** (xǐ bu xǐhuān), **明不明白** (míng bu míngbái).
- The five classics: **是不是** (checking a fact), **有没有** (having or having done), **要不要** (decisions, offers), **能不能** (ability), **会不会** (future likelihood). Add **可不可以** for polite permission.
- **还是** (háishì) takes over when the two options are distinct rather than opposite: 你想喝咖啡还是茶 ? = «do you want coffee or tea?».

**Trap:** 有 is negated with 没, never with 不 — so 有没有, not 有不有. Another habit to unlearn: no 吗 with a V-不-V, and certainly no 如果, which introduces a hypothetical condition rather than a yes/no uncertainty.`,
    objectives: [`Former une question en V-不-V`, `Employer 是不是, 有没有, 要不要, 能不能, 会不会`, `Choisir 还是 pour deux options distinctes`, `Éviter 吗 et 如果 avec V-不-V`],
    objectivesEn: [`Build a question with V-不-V`, `Use 是不是, 有没有, 要不要, 能不能, 会不会`, `Pick 还是 for two distinct options`, `Avoid 吗 and 如果 with V-不-V`],
    flashcards: [`去不去`, `喜不喜欢`, `累不累`, `是不是`, `有没有`, `要不要`, `能不能`, `会不会`, `还是`],
  },
  "cecr-a2-nuances-m16": {
    title: `Exprimer l'inquiétude : 担心, 着急, 紧张, 怕, 放心`, titleEn: `Expressing worry: 担心, 着急, 紧张, 怕, 放心`,
    duration: 14,
    category: `vocabulary`,
    difficulty: `beginner`,
    introTitle: `担心 s'inquiète, 着急 presse, 紧张 fait trembler`,
    introTitleEn: `担心 worries, 着急 rushes, 紧张 makes you shake`,
    introContent: `« S'inquiéter » se dit de plusieurs façons en chinois, et elles ne sont pas interchangeables.

- **担心** (dānxīn) = inquiétude générale sur un résultat futur. Verbe, il prend un objet : 我担心你会迟到 = « j'ai peur que tu sois en retard ». Phrase clé : **别担心** (bié dānxīn).
- **着急** (zháojí) = inquiétude urgente, quand le temps presse : 快迟到了，我很着急. Adjectif, il ne prend pas d'objet direct.
- **紧张** (jǐnzhāng) = nervosité physique du moment, avant un 面试 (miànshì) ou un discours : cœur qui bat, mains moites.
- **怕 / 害怕** (pà / hàipà) pour la peur, **恐怕** (kǒngpà) pour annoncer une mauvaise nouvelle avec tact, **放心** (fàngxīn) pour rassurer : 你放心 = « ne t'en fais pas ».

**Piège :** 关心 (guānxīn) et 担心 se traduisent tous deux par « se soucier de », mais 关心 est chaleureux — on veille sur quelqu'un — alors que 担心 est anxieux. On remercie donc par 谢谢你的关心, jamais par 谢谢你的担心, qui sonnerait très étrange.`,
    introContentEn: `«To worry» has several Chinese equivalents, and they are not interchangeable.

- **担心** (dānxīn) = general worry about a future outcome. As a verb it takes an object: 我担心你会迟到 = «I'm afraid you'll be late». Key phrase: **别担心** (bié dānxīn).
- **着急** (zháojí) = urgent worry, when time is short: 快迟到了，我很着急. As an adjective it takes no direct object.
- **紧张** (jǐnzhāng) = physical nervousness in the moment, before a 面试 (miànshì) or a speech: racing heart, sweaty hands.
- **怕 / 害怕** (pà / hàipà) for fear, **恐怕** (kǒngpà) to break bad news tactfully, **放心** (fàngxīn) to reassure: 你放心 = «don't worry about it».

**Trap:** 关心 (guānxīn) and 担心 both translate as «to care about», but 关心 is warm — you look after someone — while 担心 is anxious. So you thank someone with 谢谢你的关心, never with 谢谢你的担心, which would sound very strange.`,
    objectives: [`Distinguer 担心, 着急 et 紧张`, `Exprimer la peur avec 怕 et 害怕`, `Rassurer avec 放心 et 别担心`, `Opposer 关心 (bienveillant) et 担心 (anxieux)`],
    objectivesEn: [`Tell 担心, 着急 and 紧张 apart`, `Express fear with 怕 and 害怕`, `Reassure with 放心 and 别担心`, `Contrast 关心 (caring) with 担心 (anxious)`],
    flashcards: [`担心`, `着急`, `紧张`, `别担心`, `怕`, `害怕`, `恐怕`, `放心`, `关心`],
  },
  "cecr-a2-nuances-m17": {
    title: `Dire « ça dépend » en conversation`, titleEn: `« It depends » in conversation`,
    duration: 15,
    category: `conversation`,
    difficulty: `beginner`,
    introTitle: `« Ça dépend » = 看 + le facteur qui décide`,
    introTitleEn: `«It depends» = 看 + the deciding factor`,
    introContent: `Pour dire « ça dépend », le chinois oral part du verbe **看** (kàn, « voir ») : l'idée est « il faut voir tel facteur ».

- **要看** (yào kàn) est le choix neutre, **得看** (děi kàn) insiste, et **看** seul fonctionne comme un haussement d'épaule : 看时间吧 (kàn shíjiān ba) = « bof, ça dépend du timing ».
- **看情况** (kàn qíngkuàng) = « ça dépend », réponse autonome. Adoucie en 看情况吧, reportée en 看情况再说.
- **看** + personne ou clause : 看你决定 (kàn nǐ juédìng) = « à toi de décider » ; 看他愿不愿意 = « ça dépend s'il est d'accord ».
- **看** + nom de facteur : 看场合, 看对象, 看时机. Sans expliciter le facteur, **不一定** (bù yídìng) « pas forcément » ou **说不准** (shuō bùzhǔn) « difficile à dire ».

**Astuce :** le 看 fait le pont vers l'incertitude, donc pas besoin d'un mot pour « si ». Mais attention au registre : **看心情** (kàn xīnqíng) et **看缘分** (kàn yuánfēn) sont des blagues entre amis, à ne jamais servir à un chef.`,
    introContentEn: `To say «it depends», spoken Chinese builds on the verb **看** (kàn, «to look»): the idea is «you have to look at such-and-such factor».

- **要看** (yào kàn) is the neutral choice, **得看** (děi kàn) insists, and **看** alone works like a verbal shrug: 看时间吧 (kàn shíjiān ba) = «eh, depends on the timing».
- **看情况** (kàn qíngkuàng) = «it depends», a standalone answer. Softened as 看情况吧, postponed as 看情况再说.
- **看** + person or clause: 看你决定 (kàn nǐ juédìng) = «up to you»; 看他愿不愿意 = «it depends whether he agrees».
- **看** + factor noun: 看场合, 看对象, 看时机. Without naming the factor, **不一定** (bù yídìng) «not necessarily» or **说不准** (shuō bùzhǔn) «hard to say».

**Tip:** 看 bridges straight to uncertainty, so you need no word for «whether». Mind the register though: **看心情** (kàn xīnqíng) and **看缘分** (kàn yuánfēn) are jokes among friends, never to be used with a boss.`,
    objectives: [`Dire « ça dépend » avec 要看 et 得看`, `Répondre 看情况 pour éluder poliment`, `Renvoyer la décision avec 看你决定`, `Réserver 看心情 et 看缘分 aux amis`],
    objectivesEn: [`Say «it depends» with 要看 and 得看`, `Answer 看情况 to dodge politely`, `Hand the decision back with 看你决定`, `Keep 看心情 and 看缘分 for friends`],
    flashcards: [`看`, `要看`, `得看`, `看情况`, `情况`, `看你决定`, `不一定`, `说不准`, `看心情`],
  },
  "cecr-a2-nuances-m18": {
    title: `呢 : maîtriser la particule multi-fonctions`, titleEn: `呢: mastering the multi-purpose particle`,
    duration: 11,
    category: `grammar`,
    difficulty: `beginner`,
    introTitle: `呢 : « et toi ? », « je me demande », « je te dis »`,
    introTitleEn: `呢: «and you?», «I wonder», «I'm telling you»`,
    introContent: `Une seule particule, quatre emplois. **呢** se place en fin — ou au milieu — de phrase, et son rôle change selon ce qui la précède.

- Après un nom ou un pronom : question courte, sans reformuler. 我有一个妹妹，你呢 ? = « j'ai une petite sœur, et toi ? ». Marche aussi avec un temps ou un lieu : 昨天呢 ?
- Après un mot interrogatif (谁, 什么, 哪儿, 怎么) : réflexion à voix haute. 他去哪儿了呢 ? = « je me demande où il est parti ».
- En fin d'affirmation : emphase douce, souvent avec **还** ou **得很**. 还早呢 (hái zǎo ne) = « il est encore tôt, tu sais » ; 好吃得很呢 = « c'est vachement bon ! ».
- Au milieu de phrase : marque un contraste. 他喜欢热闹，我呢，喜欢安静 = « lui aime l'ambiance, moi le calme ».

**Piège :** ne cumule jamais 呢 et 吗 — 你呢吗 n'existe pas. Et retiens la nuance : 谁的笔 ? interroge quelqu'un, alors que 谁的笔呢 ? est une réflexion pour soi.`,
    introContentEn: `One particle, four jobs. **呢** sits at the end — or in the middle — of a sentence, and its role changes with what comes before it.

- After a noun or pronoun: a short question, with no rephrasing. 我有一个妹妹，你呢 ? = «I have a little sister, and you?». It works with times and places too: 昨天呢 ?
- After a question word (谁, 什么, 哪儿, 怎么): thinking out loud. 他去哪儿了呢 ? = «I wonder where he went».
- At the end of a statement: gentle emphasis, often with **还** or **得很**. 还早呢 (hái zǎo ne) = «it's still early, you know»; 好吃得很呢 = «it's seriously tasty!».
- Mid-sentence: it marks contrast. 他喜欢热闹，我呢，喜欢安静 = «he likes a lively crowd, me, I like quiet».

**Trap:** never stack 呢 and 吗 — 你呢吗 does not exist. And keep the nuance in mind: 谁的笔 ? asks someone directly, while 谁的笔呢 ? is musing to yourself.`,
    objectives: [`Poser une question courte avec 你呢`, `Réfléchir à voix haute avec 怎么办呢`, `Adoucir une affirmation avec 还早呢`, `Marquer un contraste avec 我呢`],
    objectivesEn: [`Ask a short question with 你呢`, `Think out loud with 怎么办呢`, `Soften a statement with 还早呢`, `Mark contrast with 我呢`],
    flashcards: [`呢`, `你呢`, `他呢`, `怎么办呢`, `还早呢`, `还`, `得很`, `热闹`, `安静`],
  },
  "cecr-a2-nuances-m19": {
    title: `Exprimer un choix : 还是, 或者, 要么, 不是...就是`, titleEn: `Expressing choices: 还是, 或者, 要么, 不是...就是`,
    duration: 13,
    category: `grammar`,
    difficulty: `beginner`,
    introTitle: `还是 en question, 或者 en affirmation, 要么 en ultimatum`,
    introTitleEn: `还是 in questions, 或者 in statements, 要么 as ultimatum`,
    introContent: `Le français a un seul « ou » ; le chinois en distingue cinq, chacun avec son ton.

- **还是** (háishì) = « ou » dans une question, qui attend un choix précis : 你喜欢茶还是咖啡 ? Pas de 吗 avec 还是, la question est déjà signalée.
- **或者** (huòzhě) = « ou » dans une affirmation, qui énumère sans exiger de choix : 我可以坐地铁或者打车. Variante plus formelle : **或是**.
- **要么...要么...** (yàome) = « soit... soit... », ferme, ton d'ultimatum : 你要么好好学习，要么退学.
- **不是...就是...** décrit une habitude prévisible (广州的天气不是晴天就是下雨), tandis que **或...或...** reste littéraire, réservé à l'écrit.

**Piège :** l'erreur la plus fréquente chez les francophones est de mélanger les deux premiers et de dire 你喜欢茶或者咖啡 ? Retiens : question → 还是, affirmation → 或者. Et ne confonds pas 要么, qui impose un choix, avec 不是...就是, qui décrit un schéma sans rien exiger.`,
    introContentEn: `French has a single «or»; Chinese distinguishes five, each with its own tone.

- **还是** (háishì) = «or» in a question, expecting a definite choice: 你喜欢茶还是咖啡 ? No 吗 with 还是, the question is already marked.
- **或者** (huòzhě) = «or» in a statement, listing options without demanding a choice: 我可以坐地铁或者打车. More formal variant: **或是**.
- **要么...要么...** (yàome) = «either... or...», firm, with an ultimatum tone: 你要么好好学习，要么退学.
- **不是...就是...** describes a predictable habit (广州的天气不是晴天就是下雨), while **或...或...** stays literary, for written Chinese.

**Trap:** the most common mistake is mixing the first two and saying 你喜欢茶或者咖啡 ? Remember: question → 还是, statement → 或者. And don't confuse 要么, which imposes a choice, with 不是...就是, which describes a pattern without demanding anything.`,
    objectives: [`Poser un choix en question avec 还是`, `Énumérer des possibilités avec 或者`, `Poser un ultimatum avec 要么...要么`, `Décrire une habitude avec 不是...就是`],
    objectivesEn: [`Offer a choice in a question with 还是`, `List possibilities with 或者`, `Set an ultimatum with 要么...要么`, `Describe a habit with 不是...就是`],
    flashcards: [`还是`, `或者`, `或是`, `要么`, `不是`, `就是`, `咖啡`, `地铁`, `爬山`],
  },
  "cecr-a2-nuances-m20": {
    title: `Cause et effet : 因为...所以, 于是, 结果, 既然...就`, titleEn: `Cause and effect: 因为...所以, 于是, 结果, 既然...就`,
    duration: 11,
    category: `grammar`,
    difficulty: `beginner`,
    introTitle: `因为...所以 explique, 于是 raconte, 结果 surprend`,
    introTitleEn: `因为...所以 explains, 于是 narrates, 结果 surprises`,
    introContent: `Contrairement au français, le chinois assume le duo « parce que... donc... » dans une même phrase.

- **因为...所以...** : 因为明天有考试，所以我想早一点儿睡觉 = « comme j'ai un examen demain, je veux me coucher tôt ». Un seul des deux connecteurs suffit aussi. Et quand le lien est évident, on juxtapose sans rien : 他生病了，没来上课.
- **于是** (yúshì) = « du coup », ton narratif, introduit l'action prise en réponse : 太累了，于是他睡着了.
- **结果** (jiéguǒ) = « au final », annonce un retournement contraire aux attentes : 他们准备去野餐，结果下起了大雨.
- **既然...就...** : le fait est admis, on en tire une conclusion pratique. 既然天气这么好，我们就去公园吧.

**Piège :** ne confonds pas 既然 et 如果. 如果下雨，我们就不去 = « s'il pleut, on n'y va pas » (hypothèse) ; 既然下雨了，我们就不去 = « puisqu'il pleut » (fait acquis). Avec 既然, le **就** est obligatoire.`,
    introContentEn: `Unlike French or English, Chinese happily uses «because... so...» in the same sentence.

- **因为...所以...**: 因为明天有考试，所以我想早一点儿睡觉 = «since I have an exam tomorrow, I want to sleep early». Either connector alone works too. And when the link is obvious, simple juxtaposition is enough: 他生病了，没来上课.
- **于是** (yúshì) = «and so», a narrative tone introducing the action taken in response: 太累了，于是他睡着了.
- **结果** (jiéguǒ) = «in the end», announcing a twist against expectations: 他们准备去野餐，结果下起了大雨.
- **既然...就...**: the fact is accepted, so you draw a practical conclusion. 既然天气这么好，我们就去公园吧.

**Trap:** don't confuse 既然 with 如果. 如果下雨，我们就不去 = «if it rains, we won't go» (hypothesis); 既然下雨了，我们就不去 = «since it's raining» (established fact). With 既然, the **就** is mandatory.`,
    objectives: [`Relier cause et effet avec 因为...所以`, `Enchaîner un récit avec 于是`, `Signaler un retournement avec 结果`, `Opposer 既然 (fait admis) et 如果 (hypothèse)`],
    objectivesEn: [`Link cause and effect with 因为...所以`, `Move a story along with 于是`, `Flag a twist with 结果`, `Contrast 既然 (accepted fact) with 如果 (hypothesis)`],
    flashcards: [`因为`, `所以`, `于是`, `结果`, `既然`, `就`, `如果`, `公园`],
  },
  "cecr-a2-nuances-m21": {
    title: `Exprimer le but : 为了, 来, 好, 为的是, 之所以...是为了`, titleEn: `Expressing purpose: 为了, 来, 好, 为的是, 之所以...是为了`,
    duration: 12,
    category: `grammar`,
    difficulty: `beginner`,
    introTitle: `为了 annonce le but, 来 et 好 l'enchaînent à l'oral`,
    introTitleEn: `为了 states the goal, 来 and 好 chain it in speech`,
    introContent: `Cinq façons de dire « pour », du plus neutre au plus soutenu.

- **为了** (wèile) = le connecteur du but par défaut, placé en tête : 为了学好中文，我每天听播客 = « pour bien apprendre le chinois, j'écoute des podcasts tous les jours ».
- **来** (lái) lie deux verbes à l'oral, souvent après 用 ou 打电话 : 他用手机应用来学中文 ; 我打电话来告诉你.
- **好** (hǎo) = « pour que », très conversationnel : 早点儿走，好赶上火车. Quand le but concerne quelqu'un d'autre, **好让** : 说慢一点儿，好让我听懂.
- **为的是** (wèideshì) place le but après l'action (他每天跑步，为的是保持健康), et **之所以...是为了** est formel, parfait pour un e-mail pro ou une dissertation HSK.

**Piège :** ne confonds pas 为了 (objectif visé) et 因为 (cause). 我学中文因为我喜欢中国 donne la raison, 我学中文为了去中国旅行 annonce le but. Autre détail : le 了 de 为了 fait partie du mot, il ne marque jamais le passé.`,
    introContentEn: `Five ways to say «in order to», from the most neutral to the most formal.

- **为了** (wèile) = the default purpose connector, placed up front: 为了学好中文，我每天听播客 = «to learn Chinese well, I listen to podcasts every day».
- **来** (lái) links two verbs in speech, often after 用 or 打电话: 他用手机应用来学中文; 我打电话来告诉你.
- **好** (hǎo) = «so that», very conversational: 早点儿走，好赶上火车. When the goal concerns someone else, use **好让**: 说慢一点儿，好让我听懂.
- **为的是** (wèideshì) puts the purpose after the action (他每天跑步，为的是保持健康), and **之所以...是为了** is formal, ideal for a work email or an HSK essay.

**Trap:** don't confuse 为了 (the goal aimed at) with 因为 (the cause). 我学中文因为我喜欢中国 gives the reason, 我学中文为了去中国旅行 states the goal. One more detail: the 了 in 为了 is part of the word and never marks the past.`,
    objectives: [`Annoncer un but avec 为了`, `Lier deux verbes avec 来`, `Exprimer « pour que » avec 好 et 好让`, `Mettre le but en avant avec 为的是`],
    objectivesEn: [`State a goal with 为了`, `Link two verbs with 来`, `Express «so that» with 好 and 好让`, `Foreground the purpose with 为的是`],
    flashcards: [`为了`, `来`, `好`, `好让`, `为的是`, `之所以`, `是为了`, `健康`],
  },
  "cecr-a2-nuances-m22": {
    title: `« Ensemble » : 一起, 一块儿, 一齐, 一同`, titleEn: `«Together»: 一起, 一块儿, 一齐, 一同`,
    duration: 12,
    category: `vocabulary`,
    difficulty: `beginner`,
    introTitle: `一起 partout, 一块儿 entre amis, 一同 en discours`,
    introTitleEn: `一起 everywhere, 一块儿 with friends, 一同 in speeches`,
    introContent: `Quatre mots pour « ensemble », tous ouverts par **一** — ce qui les sépare, c'est le registre.

- **一起** (yìqǐ) = le défaut universel, oral comme écrit : 我们一起去公园散步. Le compagnon s'introduit par **和** ou **跟** : 你跟我们一起吃饭吧.
- **一块儿** (yíkuàir) = équivalent familier et nordiste, très pékinois : 咱们一块儿走吧. Le 儿 final trahit le parler de Pékin.
- **一齐** (yìqí) insiste sur la simultanéité exacte : 他们一齐举手 = « ils ont levé la main tous en même temps » ; 大家一齐鼓掌.
- **一同** (yìtóng) est soutenu — presse, invitations officielles — et s'accompagne de **与** au lieu de 和/跟 : 请与我们一同庆祝.

**Règle :** choisis selon le canal. Dans un texto entre amis, 一起吃饭吧 ; sur un carton d'invitation, 请与我们一同分享. Dire 我与朋友一同 en discutant avec un copain sonne pompeux, et à l'écrit formel, entre 一起 et 一块儿, seul 一起 passe.`,
    introContentEn: `Four words for «together», all opening with **一** — what separates them is register.

- **一起** (yìqǐ) = the universal default, spoken and written alike: 我们一起去公园散步. The companion is introduced by **和** or **跟**: 你跟我们一起吃饭吧.
- **一块儿** (yíkuàir) = the colloquial, northern equivalent, very Beijing: 咱们一块儿走吧. The final 儿 gives away the Beijing accent.
- **一齐** (yìqí) stresses exact simultaneity: 他们一齐举手 = «they all raised their hands at the same time»; 大家一齐鼓掌.
- **一同** (yìtóng) is formal — press, official invitations — and comes with **与** instead of 和/跟: 请与我们一同庆祝.

**Rule:** choose by channel. In a text to friends, 一起吃饭吧; on a wedding invitation, 请与我们一同分享. Saying 我与朋友一同 while chatting with a mate sounds pompous, and in formal writing, between 一起 and 一块儿, only 一起 is acceptable.`,
    objectives: [`Employer 一起 comme forme par défaut`, `Utiliser 一块儿 à l'oral entre amis`, `Marquer la simultanéité avec 一齐`, `Réserver 一同 et 与 aux contextes formels`],
    objectivesEn: [`Use 一起 as the default form`, `Use 一块儿 casually among friends`, `Mark simultaneity with 一齐`, `Keep 一同 and 与 for formal contexts`],
    flashcards: [`一起`, `一块儿`, `一齐`, `一同`, `和`, `跟`, `与`, `咱们`],
  },
  "cecr-a2-nuances-m23": {
    title: `Mots de fréquence : toujours, souvent, parfois, jamais`, titleEn: `Frequency words: always, often, sometimes, never`,
    duration: 15,
    category: `vocabulary`,
    difficulty: `beginner`,
    introTitle: `总是 neutre, 老是 agacé, 从来不 jamais`,
    introTitleEn: `总是 neutral, 老是 annoyed, 从来不 never`,
    introContent: `Le chinois range la fréquence sur une échelle, et chaque mot porte en plus un ton.

- **总是** (zǒngshì) = « toujours » neutre : 他总是迟到 (tā zǒngshì chídào) = il est toujours en retard ; **老是** (lǎoshì) dit la même chose avec agacement : 他老是忘记带钥匙 (tā lǎoshì wàngjì dài yàoshi) = il oublie toujours ses clés
- **通常** (tōngcháng) = d'habitude, la plupart du temps : 他通常七点起床 (tā tōngcháng qīdiǎn qǐchuáng) = d'habitude il se lève à 7 h ; **常常** et **经常** (chángcháng, jīngcháng) = souvent : 我常常吃中餐 (wǒ chángcháng chī zhōngcān) = je mange souvent chinois
- **往往** (wǎngwǎng) décrit une tendance liée à un contexte : 下雨天往往堵车 (xiàyǔtiān wǎngwǎng dǔchē) = les jours de pluie, il y a souvent des embouteillages
- Le bas de l'échelle : **有时候** (yǒushíhòu) parfois, **偶尔** (ǒu'ěr) de temps en temps, **很少** (hěnshǎo) rarement, **几乎不** (jīhū bù) presque jamais

**Piège :** un francophone traduit « jamais » par un mot unique, alors que le chinois en a deux. 从来不 (cóngláibù) énonce un principe — 他从来不喝酒 = il ne boit jamais d'alcool — tandis que 从来没...过 raconte une absence d'expérience : 我从来没去过中国 (wǒ cónglái méi qùguò zhōngguó) = je ne suis jamais allé en Chine. N'oublie pas non plus le 都 obligatoire de 每次...都 : 他每次来都带礼物 (tā měicì lái dōu dài lǐwù) = chaque fois qu'il vient, il apporte un cadeau.`,
    introContentEn: `Chinese lines frequency up on a scale, and each word also carries a tone of voice.

- **总是** (zǒngshì) = a neutral "always": 他总是迟到 (tā zǒngshì chídào) = he is always late; **老是** (lǎoshì) says the same thing with irritation: 他老是忘记带钥匙 (tā lǎoshì wàngjì dài yàoshi) = he always forgets his keys
- **通常** (tōngcháng) = usually, most of the time: 他通常七点起床 (tā tōngcháng qīdiǎn qǐchuáng) = he usually gets up at 7; **常常** and **经常** (chángcháng, jīngcháng) = often: 我常常吃中餐 (wǒ chángcháng chī zhōngcān) = I often eat Chinese food
- **往往** (wǎngwǎng) describes a tendency tied to a context: 下雨天往往堵车 (xiàyǔtiān wǎngwǎng dǔchē) = on rainy days there tend to be traffic jams
- The low end of the scale: **有时候** (yǒushíhòu) sometimes, **偶尔** (ǒu'ěr) occasionally, **很少** (hěnshǎo) rarely, **几乎不** (jīhū bù) almost never

**Pitfall:** learners use one single word for "never", while Chinese has two. 从来不 (cóngláibù) states a principle — 他从来不喝酒 = he never drinks alcohol — whereas 从来没...过 reports a lack of experience: 我从来没去过中国 (wǒ cónglái méi qùguò zhōngguó) = I have never been to China. Don't forget the mandatory 都 in 每次...都 either: 他每次来都带礼物 (tā měicì lái dōu dài lǐwù) = every time he comes, he brings a gift.`,
    objectives: [`Distinguer 总是 (neutre) de 老是 (agacé)`, `Classer 通常, 常常, 偶尔, 很少 sur l'échelle de fréquence`, `Employer 往往 pour une tendance liée au contexte`, `Opposer 从来不 (principe) et 从来没...过 (expérience)`],
    objectivesEn: [`Tell 总是 (neutral) from 老是 (annoyed)`, `Rank 通常, 常常, 偶尔, 很少 on the frequency scale`, `Use 往往 for a context-driven tendency`, `Contrast 从来不 (principle) with 从来没...过 (experience)`],
    flashcards: [`总是`, `老是`, `通常`, `常常`, `经常`, `往往`, `有时候`, `偶尔`, `很少`],
  },
  "cecr-a2-nuances-m24": {
    title: `Exprimer « tous » : 都, 所有, 每, 全`, titleEn: `Expressing "all": 都, 所有, 每, 全`,
    duration: 14,
    category: `grammar`,
    difficulty: `beginner`,
    introTitle: `都 après le sujet, 所有 et 每 devant le nom`,
    introTitleEn: `都 after the subject, 所有 and 每 before the noun`,
    introContent: `« Tous » se dit avec quatre outils qui n'occupent pas la même place dans la phrase.

- **都** (dōu) suit le sujet et précède le verbe : 他们都来了 (tāmen dōu lái le) = ils sont tous venus ; 我们都喜欢中国菜 (wǒmen dōu xǐhuān zhōngguó cài) = nous aimons tous la cuisine chinoise
- **所有** (suǒyǒu) modifie un nom et appelle presque toujours un 都 derrière : 所有的学生都通过了考试 (suǒyǒu de xuéshēng dōu tōngguò le kǎoshì) = tous les étudiants ont réussi l'examen
- **每** (měi) individualise et exige un classificateur : 每个人都很努力 (měi gè rén dōu hěn nǔlì) = chaque personne travaille dur. 每天, 每年 et 每次 sont figés sans classificateur
- **全** et **全部** (quán, quánbù) ajoutent l'emphase : 孩子们全都笑了 (háizi men quándōu xiào le) = les enfants ont tous ri, sans exception

**Piège :** le français met « tous » un peu partout, d'où le réflexe fautif 都我们. En chinois l'ordre est fixe : 我们都. Deuxième piège, la place de la négation. 他们都不来 (tāmen dōu bù lái) = aucun d'eux ne vient, alors que 他们不都来 (tāmen bù dōu lái) = ils ne viennent pas tous. Enfin, 什么 et 哪儿 suivis de 都 cessent d'être des questions : 他什么都吃 = il mange tout.`,
    introContentEn: `"All" is expressed with four tools that do not sit in the same place in the sentence.

- **都** (dōu) follows the subject and comes before the verb: 他们都来了 (tāmen dōu lái le) = they all came; 我们都喜欢中国菜 (wǒmen dōu xǐhuān zhōngguó cài) = we all like Chinese food
- **所有** (suǒyǒu) modifies a noun and almost always calls for a 都 afterwards: 所有的学生都通过了考试 (suǒyǒu de xuéshēng dōu tōngguò le kǎoshì) = all the students passed the exam
- **每** (měi) singles out each item and requires a measure word: 每个人都很努力 (měi gè rén dōu hěn nǔlì) = every person works hard. 每天, 每年 and 每次 are fixed without a measure word
- **全** and **全部** (quán, quánbù) add emphasis: 孩子们全都笑了 (háizi men quándōu xiào le) = the children all laughed, without exception

**Pitfall:** English and French place "all" almost anywhere, which produces the wrong 都我们. In Chinese the order is fixed: 我们都. Second trap, where the negation goes. 他们都不来 (tāmen dōu bù lái) = none of them is coming, while 他们不都来 (tāmen bù dōu lái) = not all of them are coming. Finally, 什么 and 哪儿 followed by 都 stop being questions: 他什么都吃 = he eats anything.`,
    objectives: [`Placer 都 entre le sujet et le verbe`, `Employer 所有 + 的 + nom avec un 都 de reprise`, `Ajouter un classificateur après 每`, `Distinguer 都不 (aucun) de 不都 (pas tous)`],
    objectivesEn: [`Place 都 between subject and verb`, `Use 所有 + 的 + noun with a matching 都`, `Add a measure word after 每`, `Tell 都不 (none) from 不都 (not all)`],
    flashcards: [`都`, `所有`, `每`, `个`, `全`, `全部`, `全都`, `全家`],
  },
  "cecr-b11-grammar-conditional-m1": {
    title: `如果...就 et famille des conditionnels`, titleEn: `如果...就 and conditional family`,
    duration: 16,
    category: `grammar`,
    difficulty: `intermediate`,
    introTitle: `如果...就 par défaut, 要是 et 的话 à l'oral`,
    introTitleEn: `如果...就 by default, 要是 and 的话 when speaking`,
    introContent: `Le « si » chinois se construit en deux blocs : la condition d'abord, le résultat ensuite.

- **如果...就** (rúguǒ... jiù) est le schéma par défaut : 如果明天天气好，我们就去爬山 (rúguǒ míngtiān tiānqì hǎo, wǒmen jiù qù páshān) = s'il fait beau demain, on ira randonner
- **要是** (yàoshì) dit exactement la même chose, en plus chaleureux et plus oral : 要是你明天有时间 (yàoshì nǐ míngtiān yǒu shíjiān) = si tu as le temps demain
- **的话** (dehuà) se pose à la fin de la condition, seul ou en renfort de 如果 : 你想去的话，我们就早点出发 (nǐ xiǎng qù dehuà, wǒmen jiù zǎodiǎn chūfā) = si tu veux y aller, on part plus tôt
- Le mot du résultat donne le ton : **就** direct, **那** et **那么** (nà, nàme) plus doux et réactifs, **请** (qǐng) poli et professionnel

**Astuce :** un francophone cherche un équivalent de « alors » et pose 就 en tête de proposition. Or 就 vient après le sujet et avant le verbe : 我就放心了, jamais 就我放心了. À l'oral, la condition peut même se passer de tout marqueur — 你累了，去休息一会儿 (nǐ lèi le, qù xiūxi yíhuìr) = si tu es fatigué, va te reposer un peu — mais remets 如果 ou 要是 dès que la phrase se complique.`,
    introContentEn: `The Chinese "if" is built in two blocks: the condition first, the result after.

- **如果...就** (rúguǒ... jiù) is the default pattern: 如果明天天气好，我们就去爬山 (rúguǒ míngtiān tiānqì hǎo, wǒmen jiù qù páshān) = if the weather is nice tomorrow, we'll go hiking
- **要是** (yàoshì) says exactly the same thing, warmer and more colloquial: 要是你明天有时间 (yàoshì nǐ míngtiān yǒu shíjiān) = if you have time tomorrow
- **的话** (dehuà) sits at the end of the condition, alone or reinforcing 如果: 你想去的话，我们就早点出发 (nǐ xiǎng qù dehuà, wǒmen jiù zǎodiǎn chūfā) = if you want to go, we'll leave earlier
- The result word sets the tone: **就** direct, **那** and **那么** (nà, nàme) softer and more reactive, **请** (qǐng) polite and professional

**Tip:** learners look for an equivalent of "then" and put 就 at the head of the clause. But 就 comes after the subject and before the verb: 我就放心了, never 就我放心了. In speech the condition can even drop every marker — 你累了，去休息一会儿 (nǐ lèi le, qù xiūxi yíhuìr) = if you're tired, go rest a bit — but bring 如果 or 要是 back as soon as the sentence gets complex.`,
    objectives: [`Construire une phrase avec 如果...就`, `Choisir 要是 pour un registre oral`, `Refermer une condition avec 的话`, `Doser le résultat entre 就, 那么 et 请`],
    objectivesEn: [`Build a sentence with 如果...就`, `Pick 要是 for a spoken register`, `Close a condition with 的话`, `Weigh the result between 就, 那么 and 请`],
    flashcards: [`如果`, `就`, `要是`, `的话`, `那`, `那么`, `那就`, `请`],
  },
  "cecr-b11-grammar-redup-m1": {
    title: `Réduplication verbes/adjectifs + 一...就 + 越来越 + 一边...一边`, titleEn: `Verb/adj reduplication + 一...就 + 越来越 + 一边...一边`,
    duration: 15,
    category: `grammar`,
    difficulty: `intermediate`,
    introTitle: `看看 adoucit, 干干净净 intensifie, 一...就 enchaîne`,
    introTitleEn: `看看 softens, 干干净净 intensifies, 一...就 chains`,
    introContent: `Redoubler un mot ou enchaîner deux clauses : quatre patterns qui rendent le chinois oral immédiatement plus naturel.

- Verbe redoublé = action brève, essai, demande adoucie : **看看** (kànkan) jeter un œil, **试试** (shìshi) essayer voir, **休息休息** (xiūxi xiūxi) se reposer un peu. **一下** (yíxià) joue le même rôle : 等一下 (děng yíxià) = attends une seconde
- Adjectif redoublé = image vivante : **慢慢** (mànmàn) + 地 = tranquillement, **干干净净** (gāngānjìngjìng) + 的 = impeccable, 他高高兴兴地回家了 = il est rentré tout content
- **一...就** (yī... jiù) = dès que : 我一到家就吃饭 (wǒ yí dào jiā jiù chīfàn) = dès que je rentre, je mange
- **越来越** (yuèláiyuè) = de plus en plus : 天气越来越冷 (tiānqì yuèláiyuè lěng) ; variante 越...越... : 越学越难 = plus on étudie, plus c'est dur
- **一边...一边** (yìbiān... yìbiān) = deux actions simultanées : 他一边吃饭一边看电视

**Piège :** la deuxième syllabe d'un verbe redoublé passe au ton neutre, on dit kàn kan et non kàn kàn. Autre réflexe à corriger : 一边...一边 ne vaut que si les deux actions ont le même sujet ; pour deux sujets différents, il faut passer par 同时.`,
    introContentEn: `Doubling a word or chaining two clauses: four patterns that instantly make spoken Chinese sound more natural.

- Doubled verb = brief action, attempt, softened request: **看看** (kànkan) take a look, **试试** (shìshi) give it a try, **休息休息** (xiūxi xiūxi) rest a bit. **一下** (yíxià) does the same job: 等一下 (děng yíxià) = wait a second
- Doubled adjective = vivid image: **慢慢** (mànmàn) + 地 = slowly, calmly, **干干净净** (gāngānjìngjìng) + 的 = spotless, 他高高兴兴地回家了 = he went home all happy
- **一...就** (yī... jiù) = as soon as: 我一到家就吃饭 (wǒ yí dào jiā jiù chīfàn) = as soon as I get home, I eat
- **越来越** (yuèláiyuè) = more and more: 天气越来越冷 (tiānqì yuèláiyuè lěng); variant 越...越... : 越学越难 = the more you study, the harder it gets
- **一边...一边** (yìbiān... yìbiān) = two simultaneous actions: 他一边吃饭一边看电视

**Pitfall:** the second syllable of a doubled verb becomes neutral tone, so it is kàn kan, not kàn kàn. Another habit to fix: 一边...一边 only works when both actions share the same subject; for two different subjects you need 同时.`,
    objectives: [`Redoubler un verbe pour adoucir une demande`, `Former les patterns AA + 地 et AABB + 的`, `Enchaîner deux faits avec 一...就`, `Exprimer la progression avec 越来越 et 越...越`],
    objectivesEn: [`Double a verb to soften a request`, `Form the AA + 地 and AABB + 的 patterns`, `Chain two facts with 一...就`, `Express progression with 越来越 and 越...越`],
    flashcards: [`看看`, `试试`, `想想`, `一下`, `慢慢`, `好好`, `干干净净`, `越来越`, `一边`],
  },
  "cecr-b11-grammar-separable-m1": {
    title: `Verbes séparables : le sandwich chinois`, titleEn: `Separable verbs: the Chinese sandwich`,
    duration: 17,
    category: `grammar`,
    difficulty: `intermediate`,
    introTitle: `帮忙 s'ouvre en sandwich : 帮了忙, pas 帮忙了`,
    introTitleEn: `帮忙 opens like a sandwich: 帮了忙, not 帮忙了`,
    introContent: `Certains verbes ressemblent à un mot unique mais se coupent en deux pour laisser passer autre chose.

- Séparables verbe-objet : **帮忙** (bāngmáng), **睡觉** (shuìjiào), **见面** (jiànmiàn), **结婚** (jiéhūn), **开会** (kāihuì). Les vrais composés comme **学习** (xuéxí) ne se séparent jamais
- Les particules se glissent au milieu : 结了婚, 唱过歌, 开着会 — 我们正开着会呢 (wǒmen zhèng kāizhe huì ne) = on est en pleine réunion
- Durée, fréquence et mesures aussi : 我们只见过一次面 (wǒmen zhǐ jiànguò yí cì miàn) = on ne s'est vus qu'une fois ; 他睡了八个小时的觉 = il a dormi 8 heures ; 我们见个面吧 = on se voit un peu ?
- Pour ajouter une personne, on passe par **跟** : 我想跟她结婚 (wǒ xiǎng gēn tā jiéhūn) = je veux l'épouser, jamais 结婚她

**Piège :** le francophone colle l'objet au verbe et produit 帮忙你 ou 我帮忙了他. Il faut 我们可以帮你 ou 我帮了他的忙. Même logique pour la réduplication : seule la partie verbe se redouble, donc 聊聊天 et jamais 聊天聊天. Test rapide : si 了 s'insère bien au milieu (帮了忙 ✓), le verbe est séparable ; sinon (学了习 ✗), c'est un mot indivisible.`,
    introContentEn: `Some verbs look like a single word but split in two to let something else through.

- Verb-object separables: **帮忙** (bāngmáng), **睡觉** (shuìjiào), **见面** (jiànmiàn), **结婚** (jiéhūn), **开会** (kāihuì). True compounds such as **学习** (xuéxí) never split
- Particles slide into the middle: 结了婚, 唱过歌, 开着会 — 我们正开着会呢 (wǒmen zhèng kāizhe huì ne) = we're right in the middle of a meeting
- Duration, frequency and measures too: 我们只见过一次面 (wǒmen zhǐ jiànguò yí cì miàn) = we've only met once; 他睡了八个小时的觉 = he slept for 8 hours; 我们见个面吧 = let's meet up
- To add a person, go through **跟**: 我想跟她结婚 (wǒ xiǎng gēn tā jiéhūn) = I want to marry her, never 结婚她

**Pitfall:** learners stick the object straight onto the verb and produce 帮忙你 or 我帮忙了他. It has to be 我们可以帮你 or 我帮了他的忙. Same logic for reduplication: only the verb half doubles, so 聊聊天 and never 聊天聊天. Quick test: if 了 fits nicely in the middle (帮了忙 ✓), the verb is separable; if not (学了习 ✗), it is indivisible.`,
    objectives: [`Repérer un verbe séparable comme 帮忙 ou 见面`, `Glisser 了, 过, 着 juste après la partie verbe`, `Insérer durée et fréquence dans le sandwich`, `Ajouter une personne avec 跟 au lieu d'un objet direct`],
    objectivesEn: [`Spot a separable verb such as 帮忙 or 见面`, `Slide 了, 过, 着 right after the verb half`, `Insert duration and frequency into the sandwich`, `Add a person with 跟 instead of a direct object`],
    flashcards: [`帮忙`, `睡觉`, `见面`, `结婚`, `开会`, `打开`, `看见`, `学习`, `道歉`],
  },
  "cecr-b11-grammar-pivotal-m1": {
    title: `Phrases pivots : 让, 叫, 请, 帮, 教 et plus`, titleEn: `Pivotal sentences: 让, 叫, 请, 帮, 教 and more`,
    duration: 15,
    category: `grammar`,
    difficulty: `intermediate`,
    introTitle: `让, 叫, 请, 帮, 教 : un mot, deux rôles`,
    introTitleEn: `让, 叫, 请, 帮, 教: one word, two roles`,
    introContent: `Dans une phrase pivot, un nom est à la fois objet du premier verbe et sujet du second, sans aucun mot de liaison.

- Schéma de base : 老师让我们回家 (lǎoshī ràng wǒmen huíjiā) = le prof nous laisse rentrer. 我们 est objet de 让 et sujet de 回家
- Le verbe pivot fixe le ton : **让** (ràng) neutre, **叫** (jiào) autoritaire — 老板叫他马上来办公室 —, **请** (qǐng) poli — 我请你帮我一个忙 —, **帮** (bāng) coopératif — 哥哥帮我搬家具 —, **教** (jiāo) transmission — 奶奶教我包饺子
- Registre formel : **派** (pài) dépêcher, **建议** (jiànyì) conseiller — 医生建议他多休息 —, **同意** (tóngyì) accepter, **要求** (yāoqiú) exiger, **命令** (mìnglìng) ordonner
- Quatre blocs figés à mémoriser : 称...为, 说...是, 收...做, 选...当 — 同学们选他当班长 = les camarades l'ont élu délégué

**Règle :** la négation se place devant le premier verbe, jamais devant le second — 老师不让我们回家, 妈妈没让我买那个. Le réflexe francophone est de chercher un « à », un « de » ou un « que » : le chinois enchaîne directement. Vérifie enfin que le sujet change entre les deux verbes, sinon c'est une simple série verbale : 我去商店买东西.`,
    introContentEn: `In a pivotal sentence one noun is both the object of the first verb and the subject of the second, with no linking word at all.

- Basic pattern: 老师让我们回家 (lǎoshī ràng wǒmen huíjiā) = the teacher lets us go home. 我们 is the object of 让 and the subject of 回家
- The pivot verb sets the tone: **让** (ràng) neutral, **叫** (jiào) authoritative — 老板叫他马上来办公室 —, **请** (qǐng) polite — 我请你帮我一个忙 —, **帮** (bāng) cooperative — 哥哥帮我搬家具 —, **教** (jiāo) teaching — 奶奶教我包饺子
- Formal register: **派** (pài) to dispatch, **建议** (jiànyì) to advise — 医生建议他多休息 —, **同意** (tóngyì) to agree to, **要求** (yāoqiú) to demand, **命令** (mìnglìng) to order
- Four fixed blocks worth memorising: 称...为, 说...是, 收...做, 选...当 — 同学们选他当班长 = his classmates elected him class rep

**Rule:** the negation goes before the first verb, never before the second — 老师不让我们回家, 妈妈没让我买那个. The learner's instinct is to look for a "to", "of" or "that": Chinese simply links the verbs directly. Finally, check that the subject changes between the two verbs, otherwise it is just a serial verb sentence: 我去商店买东西.`,
    objectives: [`Identifier le pivot, objet puis sujet`, `Choisir entre 让, 叫, 请, 帮 et 教 selon le ton`, `Placer 不 ou 没 devant le verbe pivot`, `Réutiliser les blocs 称...为 et 选...当`],
    objectivesEn: [`Identify the pivot as object then subject`, `Choose among 让, 叫, 请, 帮 and 教 by tone`, `Put 不 or 没 before the pivot verb`, `Reuse the 称...为 and 选...当 blocks`],
    flashcards: [`让`, `叫`, `请`, `帮`, `教`, `派`, `建议`, `要求`, `命令`],
  },
  "cecr-b11-nuances-m8": {
    title: `都不 vs 不都 — négation totale/partielle`, titleEn: `都不 vs 不都 — total/partial negation`,
    duration: 10,
    category: `grammar`,
    difficulty: `intermediate`,
    introTitle: `都不 = aucun, 不都 = pas tous`,
    introTitleEn: `都不 = none, 不都 = not all`,
    introContent: `Un simple changement d'ordre entre 都 et 不 renverse complètement le sens de la phrase.

- **都不** (dōu bù) = négation totale, « aucun, pas un seul » : 他们都不来 (tāmen dōu bù lái) = aucun d'eux ne vient ; 这些菜都不是辣的 (zhèxiē cài dōu bú shì là de) = aucun de ces plats n'est épicé
- **不都** (bù dōu) = négation partielle, « pas tous », donc certains oui : 这些菜不都是辣的 (zhèxiē cài bù dōu shì là de) = ces plats ne sont pas tous épicés
- Le trio de l'insistance **一点 + 都/也 + 不/没** = « pas du tout » : 我一点都不累 (wǒ yìdiǎn dōu bú lèi) = je ne suis pas du tout fatigué ; 这个办法一点都不麻烦 (zhège bànfǎ yìdiǎn dōu bù máfan) = cette méthode n'est pas du tout compliquée
- Avec **没** pour un fait passé : 昨天他一点都没吃 (zuótiān tā yìdiǎn dōu méi chī) = hier il n'a rien mangé du tout

**Piège :** « ils ne viennent pas tous » est ambigu en français, alors que le chinois tranche. Un francophone qui veut dire « aucun » produit souvent 不都 et affirme exactement le contraire de sa pensée. Mémo : le 不 placé après 都 ratisse tout, le 不 placé avant 都 laisse des îlots. Et 一点也不 vaut exactement 一点都不 : 我一点也不困 (wǒ yìdiǎn yě bù kùn).`,
    introContentEn: `A single change of order between 都 and 不 flips the meaning of the sentence entirely.

- **都不** (dōu bù) = total negation, "none, not a single one": 他们都不来 (tāmen dōu bù lái) = none of them is coming; 这些菜都不是辣的 (zhèxiē cài dōu bú shì là de) = none of these dishes is spicy
- **不都** (bù dōu) = partial negation, "not all", so some are: 这些菜不都是辣的 (zhèxiē cài bù dōu shì là de) = not all of these dishes are spicy
- The emphatic trio **一点 + 都/也 + 不/没** = "not at all": 我一点都不累 (wǒ yìdiǎn dōu bú lèi) = I'm not tired at all; 这个办法一点都不麻烦 (zhège bànfǎ yìdiǎn dōu bù máfan) = this method isn't any trouble at all
- With **没** for a past fact: 昨天他一点都没吃 (zuótiān tā yìdiǎn dōu méi chī) = yesterday he ate nothing at all

**Pitfall:** "they aren't all coming" is ambiguous in English, while Chinese settles it. A learner aiming for "none" often produces 不都 and states the exact opposite of what they meant. Memo: 不 after 都 sweeps everything away, 不 before 都 leaves islands behind. And 一点也不 is exactly as strong as 一点都不: 我一点也不困 (wǒ yìdiǎn yě bù kùn).`,
    objectives: [`Opposer 都不 (aucun) et 不都 (pas tous)`, `Placer 不 avant ou après 都 selon le sens`, `Construire 一点 + 都 + 不 pour « pas du tout »`, `Basculer sur 没 pour un fait passé`],
    objectivesEn: [`Contrast 都不 (none) with 不都 (not all)`, `Place 不 before or after 都 as needed`, `Build 一点 + 都 + 不 for "not at all"`, `Switch to 没 for a past fact`],
    flashcards: [`都不`, `不都`, `一点`, `一点都不`, `一点也不`, `辣`, `麻烦`, `累`],
  },
  "cecr-b11-nuances-m9": {
    title: `也 concession — quand même, malgré tout`, titleEn: `也 concession — still, anyway`,
    duration: 12,
    category: `grammar`,
    difficulty: `intermediate`,
    introTitle: `也 ne dit pas « aussi » ici, mais « quand même »`,
    introTitleEn: `Here 也 doesn't mean "also" but "anyway"`,
    introContent: `Au-delà de « aussi », 也 signale une résistance : le résultat tient bon malgré l'obstacle posé juste avant.

- **就算 / 即使 / 哪怕 ... 也** = « même si ». 就算 (jiùsuàn) est le plus oral — 就算下大雨，我也要去看演唱会 (jiùsuàn xià dàyǔ, wǒ yě yào qù kàn yǎnchànghuì) = même s'il pleut fort, j'irai quand même au concert. 即使 (jíshǐ) est neutre, 哪怕 (nǎpà) dramatise : 哪怕只有一点希望，我也不会放弃
- **无论 / 不管 ... 也** = « quoi que » : 无论你说什么，我也不会改变主意 (wúlùn nǐ shuō shénme, wǒ yě bú huì gǎibiàn zhǔyi) = quoi que tu dises, je ne changerai pas d'avis. 无论 est écrit, 不管 oral
- **再...也** = « aussi X que ce soit » : 这件衣服再贵，我也要买 (zhè jiàn yīfu zài guì, wǒ yě yào mǎi) = aussi chère soit-elle, je vais l'acheter
- **怎么也** + 不/没 = « impossible malgré tous les efforts » : 昨天晚上我怎么也睡不着 (zuótiān wǎnshang wǒ zěnme yě shuì bù zháo)

**Règle :** l'ordre ne s'inverse jamais — l'obstacle d'abord, le résultat avec 也 ensuite. Le francophone commence par la principale (« j'irai même s'il pleut ») et casse le pattern. Note aussi que 都 remplace très souvent 也 après 无论 et 不管, avec un sens quasi identique.`,
    introContentEn: `Beyond "also", 也 signals resistance: the result holds firm despite the obstacle stated just before.

- **就算 / 即使 / 哪怕 ... 也** = "even if". 就算 (jiùsuàn) is the most colloquial — 就算下大雨，我也要去看演唱会 (jiùsuàn xià dàyǔ, wǒ yě yào qù kàn yǎnchànghuì) = even if it pours, I'm still going to the concert. 即使 (jíshǐ) is neutral, 哪怕 (nǎpà) dramatises: 哪怕只有一点希望，我也不会放弃
- **无论 / 不管 ... 也** = "no matter what": 无论你说什么，我也不会改变主意 (wúlùn nǐ shuō shénme, wǒ yě bú huì gǎibiàn zhǔyi) = whatever you say, I won't change my mind. 无论 is written, 不管 spoken
- **再...也** = "however X it may be": 这件衣服再贵，我也要买 (zhè jiàn yīfu zài guì, wǒ yě yào mǎi) = however expensive it is, I'm buying it
- **怎么也** + 不/没 = "impossible however hard you try": 昨天晚上我怎么也睡不着 (zuótiān wǎnshang wǒ zěnme yě shuì bù zháo)

**Rule:** the order never flips — obstacle first, then the result carrying 也. Learners start with the main clause ("I'll go even if it rains") and break the pattern. Note too that 都 very often replaces 也 after 无论 and 不管, with virtually the same meaning.`,
    objectives: [`Reconnaître 也 concessif au lieu de « aussi »`, `Doser 就算, 即使 et 哪怕 selon le registre`, `Construire 无论/不管...也 pour « quoi que »`, `Utiliser 再...也 et 怎么也 sans inverser l'ordre`],
    objectivesEn: [`Recognise concessive 也 instead of "also"`, `Grade 就算, 即使 and 哪怕 by register`, `Build 无论/不管...也 for "no matter what"`, `Use 再...也 and 怎么也 without flipping the order`],
    flashcards: [`也`, `就算`, `即使`, `哪怕`, `无论`, `不管`, `再`, `怎么`, `放弃`],
  },
  "cecr-b11-nuances-m10": {
    title: `会 vs 能 vs 可以 — nuances avancées`, titleEn: `会 vs 能 vs 可以 — advanced nuances`,
    duration: 12,
    category: `grammar`,
    difficulty: `intermediate`,
    introTitle: `可以 = permission, 很会 = qualité, 很能 = quantité`,
    introTitleEn: `可以 = permission, 很会 = quality, 很能 = quantity`,
    introContent: `能, 可以 et 会 se chevauchent, mais chacun penche vers une nuance précise.

- Pour demander la permission, **可以** (kěyǐ) est le choix sûr : 我可以坐这儿吗？(wǒ kěyǐ zuò zhèr ma) = puis-je m'asseoir ici ? Avec 我能坐这儿吗？on demande plutôt si la place est libre
- On répond à une question de permission par 可以 ou 不可以, jamais par un 能 seul : « 我可以进来吗？» « 可以，请进 »
- **很会** (hěn huì) juge la qualité d'une compétence : 他很会说话 (tā hěn huì shuōhuà) = il est très bon en communication ; 他很会做菜 = il cuisine super bien
- **很能** (hěn néng) juge un volume, une capacité brute : 他很能吃 (tā hěn néng chī) = il mange énormément ; 他很能喝 = il tient très bien l'alcool
- **能够** (nénggòu) est le jumeau écrit de 能 : 我们能够克服所有困难 (wǒmen nénggòu kèfú suǒyǒu kùnnan) = nous saurons surmonter toutes les difficultés

**Piège :** le francophone répond « 能 » à une question posée avec 可以, et ça sonne faux. Autre réflexe à corriger : 能够 s'emploie surtout en phrase positive ; pour nier, on revient à 不能. Et dans un message WeChat, garde 能 — 能够 y sonnerait pompeux.`,
    introContentEn: `能, 可以 and 会 overlap, but each one leans towards a precise nuance.

- To ask for permission, **可以** (kěyǐ) is the safe choice: 我可以坐这儿吗？(wǒ kěyǐ zuò zhèr ma) = may I sit here? With 我能坐这儿吗？you are rather asking whether the seat is free
- A permission question is answered with 可以 or 不可以, never with a bare 能: "我可以进来吗？" "可以，请进"
- **很会** (hěn huì) judges the quality of a skill: 他很会说话 (tā hěn huì shuōhuà) = he is very good with words; 他很会做菜 = he cooks really well
- **很能** (hěn néng) judges volume, raw capacity: 他很能吃 (tā hěn néng chī) = he eats a huge amount; 他很能喝 = he can really hold his drink
- **能够** (nénggòu) is the written twin of 能: 我们能够克服所有困难 (wǒmen nénggòu kèfú suǒyǒu kùnnan) = we will overcome every difficulty

**Pitfall:** learners answer "能" to a question asked with 可以, and it sounds wrong. Another habit to fix: 能够 is used mostly in positive sentences; to negate, go back to 不能. And in a WeChat message, stick to 能 — 能够 would sound pompous there.`,
    objectives: [`Choisir 可以 pour demander une permission`, `Répondre par 可以 ou 不可以, jamais par 能`, `Opposer 很会 (qualité) et 很能 (quantité)`, `Réserver 能够 à l'écrit formel`],
    objectivesEn: [`Pick 可以 to ask for permission`, `Answer with 可以 or 不可以, never with 能`, `Contrast 很会 (quality) with 很能 (quantity)`, `Keep 能够 for formal writing`],
    flashcards: [`能`, `可以`, `很会`, `很能`, `能够`, `说话`, `做菜`, `问题`],
  },
  "cecr-b11-nuances-m11": {
    title: `开 comme complément + sens fixes`, titleEn: `开 as complement + fixed senses`,
    duration: 10,
    category: `vocabulary`,
    difficulty: `intermediate`,
    introTitle: `开 en 2e position : séparer, étaler, libérer`,
    introTitleEn: `开 in second position: separate, spread, release`,
    introContent: `Quand 开 suit un autre verbe, il ne veut plus dire « ouvrir » : il exprime le résultat de l'action.

- Séparer, écarter : **拉开** (lākāi) tirer pour ouvrir — 他把窗帘拉开了 (tā bǎ chuānglián lākāi le) = il a tiré les rideaux ; **推开** (tuīkāi) pousser pour ouvrir ; **分开** (fēnkāi) séparer
- Étaler, déployer : **展开** (zhǎnkāi) déployer, **铺开** (pūkāi) étaler à plat — 他把地图铺开在桌子上 = il a étalé la carte sur la table ; **散开** (sànkāi) se disperser
- Libérer, défaire : **解开** (jiěkāi) défaire un nœud, **松开** (sōngkāi) desserrer, **打开** (dǎkāi) ouvrir une boîte ou une appli
- Appliqué à l'esprit : **想开** (xiǎngkāi) prendre du recul — 别太难过，慢慢想开一点 (bié tài nánguò, mànmàn xiǎngkāi yìdiǎn) = ne sois pas trop triste, prends du recul petit à petit ; **看开** (kànkāi) voir les choses avec détachement

**Astuce :** deux sens figés se retiennent comme des blocs, car seul le contexte les éclaire. En cuisine, 水开了 (shuǐ kāi le) = l'eau bout, et 水还没开 = elle ne bout pas encore. En bijouterie, 开 sert d'unité de pureté : 十八开金 (shíbā kāi jīn) = or 18 carats. Pour la négation d'un résultat, pense au complément potentiel : 这个结我打不开 = je n'arrive pas à défaire ce nœud, contre 打得开 à la forme positive.`,
    introContentEn: `When 开 follows another verb it no longer means "to open": it expresses the result of the action.

- Separate, pull apart: **拉开** (lākāi) pull open — 他把窗帘拉开了 (tā bǎ chuānglián lākāi le) = he pulled the curtains open; **推开** (tuīkāi) push open; **分开** (fēnkāi) separate
- Spread out, unfold: **展开** (zhǎnkāi) unfold, **铺开** (pūkāi) spread flat — 他把地图铺开在桌子上 = he spread the map out on the table; **散开** (sànkāi) scatter
- Release, undo: **解开** (jiěkāi) untie a knot, **松开** (sōngkāi) loosen, **打开** (dǎkāi) open a box or an app
- Applied to the mind: **想开** (xiǎngkāi) let go, gain perspective — 别太难过，慢慢想开一点 (bié tài nánguò, mànmàn xiǎngkāi yìdiǎn) = don't be too sad, let it go little by little; **看开** (kànkāi) see things with detachment

**Tip:** two fixed senses are best learnt as blocks, since only context reveals them. In cooking, 水开了 (shuǐ kāi le) = the water is boiling, and 水还没开 = it isn't boiling yet. In jewellery, 开 works as a purity unit: 十八开金 (shíbā kāi jīn) = 18-carat gold. To negate a result, use the potential complement: 这个结我打不开 = I can't untie this knot, versus 打得开 in the positive.`,
    objectives: [`Lire 开 en 2e position comme un complément de résultat`, `Regrouper 拉开, 分开, 展开, 解开 par sous-sens`, `Employer 想开 et 看开 au sens psychologique`, `Retenir 水开了 et 十八开金 comme sens figés`],
    objectivesEn: [`Read 开 in second position as a resultative complement`, `Group 拉开, 分开, 展开, 解开 by sub-meaning`, `Use 想开 and 看开 in their psychological sense`, `Memorise 水开了 and 十八开金 as fixed senses`],
    flashcards: [`打开`, `拉开`, `分开`, `展开`, `解开`, `松开`, `想开`, `看开`],
  },
  "cecr-b11-nuances-m12": {
    title: `Connecter des topics : 关于, 对于, 至于, 就...而言, 说起`, titleEn: `Connecting topics: 关于, 对于, 至于, 就...而言, 说起`,
    duration: 14,
    category: `grammar`,
    difficulty: `intermediate`,
    introTitle: `关于 lance, 对于 juge, 至于 enchaîne`,
    introTitleEn: `关于 opens, 对于 judges, 至于 pivots`,
    introContent: `Quatre familles de connecteurs pour annoncer un sujet : le choix dépend de ce que tu en fais — lancer, réagir, pivoter ou illustrer.

- **关于** (guānyú) = concernant, annonce neutre d'un thème, et le seul du groupe à pouvoir modifier un nom avec 的 : 一本关于中国历史的书 (yì běn guānyú zhōngguó lìshǐ de shū) = un livre sur l'histoire de la Chine.
- **对于** (duìyú) = à propos de, mais avec une réaction derrière : 对于这个决定，我完全支持 (duìyú zhège juédìng, wǒ wánquán zhīchí) = concernant cette décision, je la soutiens totalement.
- **至于** (zhìyú) = quant à, un pivot vers un second sujet après en avoir traité un premier : 至于午餐，可以带三明治 (zhìyú wǔcān, kěyǐ dài sānmíngzhì) = quant au déjeuner, on peut apporter des sandwiches.
- **就...而言** (formel) et **就...来说** (courant) cadrent un angle précis : 就价格而言 (jiù jiàgé éryán) = en termes de prix ; 就我来说 (jiù wǒ láishuō) = pour ma part.
- **拿...来说** illustre par un exemple, **说起 / 说到** rebondit à l'oral : 说起中国菜，我最喜欢火锅 (shuōqǐ zhōngguó cài, wǒ zuì xǐhuan huǒguō) = à propos de cuisine chinoise, je préfère le hot pot.

**Piège :** le français emploie « concernant » partout. En chinois, 至于 ne peut jamais ouvrir une conversation, il exige un premier sujet déjà traité. Et pour dire « un livre sur X », seul 关于 fonctionne : les autres ne se raccrochent pas à un nom avec 的.`,
    introContentEn: `Four families of connectors for announcing a topic: the choice depends on what you do with it — open, react, pivot or illustrate.

- **关于** (guānyú) = about, a neutral way to announce a theme, and the only one in the group that can modify a noun with 的: 一本关于中国历史的书 (yì běn guānyú zhōngguó lìshǐ de shū) = a book about Chinese history.
- **对于** (duìyú) = about, but with a reaction attached: 对于这个决定，我完全支持 (duìyú zhège juédìng, wǒ wánquán zhīchí) = as for this decision, I fully support it.
- **至于** (zhìyú) = as for, a pivot to a second topic after a first one has been covered: 至于午餐，可以带三明治 (zhìyú wǔcān, kěyǐ dài sānmíngzhì) = as for lunch, we can bring sandwiches.
- **就...而言** (formal) and **就...来说** (everyday) frame a specific angle: 就价格而言 (jiù jiàgé éryán) = in terms of price; 就我来说 (jiù wǒ láishuō) = as for me.
- **拿...来说** illustrates with an example, **说起 / 说到** picks up a topic in speech: 说起中国菜，我最喜欢火锅 (shuōqǐ zhōngguó cài, wǒ zuì xǐhuan huǒguō) = speaking of Chinese food, I like hot pot best.

**Watch out:** English and French use "about" everywhere. In Chinese, 至于 can never open a conversation — it requires a first topic already discussed. And to say "a book about X", only 关于 works: the others cannot attach to a noun with 的.`,
    objectives: [`Choisir entre 关于 (neutre) et 对于 (avis)`, `Employer 至于 comme pivot vers un second sujet`, `Cadrer un angle avec 就...而言 ou 就...来说`, `Enchaîner à l'oral avec 说起 et 说到`],
    objectivesEn: [`Choose between 关于 (neutral) and 对于 (opinion)`, `Use 至于 as a pivot to a second topic`, `Frame an angle with 就...而言 or 就...来说`, `Link topics in speech with 说起 and 说到`],
    flashcards: [`关于`, `对于`, `至于`, `就我来说`, `对我来说`, `拿英语来说`, `说起`, `说到`],
  },
  "cecr-b11-nuances-m13": {
    title: `在 abstrait : 在...上, 在...下, 在...方面`, titleEn: `Abstract 在: 在...上, 在...下, 在...方面`,
    duration: 13,
    category: `grammar`,
    difficulty: `intermediate`,
    introTitle: `在...上 l'angle, 在...下 la cause, 在...方面 le domaine`,
    introTitleEn: `在...上 angle, 在...下 cause, 在...方面 field`,
    introContent: `Le 在 spatial devient abstrait : trois moules pour cadrer une phrase avant même de la dire.

- **在...上** (zài... shàng) = sur le plan de, en matière de : 在经济上，中国发展很快 (zài jīngjì shàng, zhōngguó fāzhǎn hěn kuài) = sur le plan économique, la Chine se développe vite. Le 上 final est obligatoire.
- **在...下** (zài... xià) = sous, grâce à — une cause externe qui déclenche ou permet l'action : 在朋友的帮助下，我完成了这个项目 (zài péngyou de bāngzhù xià, wǒ wánchéng le zhège xiàngmù) = grâce à l'aide de mes amis, j'ai terminé ce projet.
- Les blocs figés avec 下 : 在...的影响下, 在...的支持下, 在...的压力下, et 在这种情况下 (zài zhè zhǒng qíngkuàng xià) = dans ces circonstances.
- **在...方面** (zài... fāngmiàn) = en matière de, dans le domaine de — plus précis et plus formel, idéal en entretien : 在沟通方面，她比其他同事更出色 (zài gōutōng fāngmiàn, tā bǐ qítā tóngshì gèng chūsè) = en matière de communication, elle surpasse ses collègues.

**Piège :** le francophone traduit 上 par « sur » et reste dans l'espace. Ici 上 est abstrait : 在工作上 (zài gōngzuò shàng) ne veut pas dire « posé sur le travail » mais « au travail, professionnellement ». Second réflexe à corriger : ne jamais laisser tomber le 上, le 下 ou le 方面 final — sans eux, la structure ne tient plus.`,
    introContentEn: `Spatial 在 turns abstract: three frames that set up a sentence before you even say it.

- **在...上** (zài... shàng) = in terms of, as regards: 在经济上，中国发展很快 (zài jīngjì shàng, zhōngguó fāzhǎn hěn kuài) = economically, China is developing fast. The final 上 is mandatory.
- **在...下** (zài... xià) = under, thanks to — an external cause that triggers or enables the action: 在朋友的帮助下，我完成了这个项目 (zài péngyou de bāngzhù xià, wǒ wánchéng le zhège xiàngmù) = with my friends' help, I finished this project.
- Fixed chunks with 下: 在...的影响下, 在...的支持下, 在...的压力下, and 在这种情况下 (zài zhè zhǒng qíngkuàng xià) = under these circumstances.
- **在...方面** (zài... fāngmiàn) = in the field of, when it comes to — more precise and more formal, ideal in an interview: 在沟通方面，她比其他同事更出色 (zài gōutōng fāngmiàn, tā bǐ qítā tóngshì gèng chūsè) = when it comes to communication, she outshines her colleagues.

**Watch out:** learners translate 上 as "on" and stay in physical space. Here 上 is abstract: 在工作上 (zài gōngzuò shàng) does not mean "on top of work" but "at work, professionally". Second habit to fix: never drop the final 上, 下 or 方面 — without them the structure collapses.`,
    objectives: [`Cadrer un domaine abstrait avec 在...上`, `Exprimer une cause externe avec 在...下`, `Employer 在...方面 dans un registre formel`, `Distinguer le 上 abstrait du 上 spatial`],
    objectivesEn: [`Frame an abstract domain with 在...上`, `Express an external cause with 在...下`, `Use 在...方面 in a formal register`, `Tell abstract 上 apart from spatial 上`],
    flashcards: [`经济`, `教育`, `感情`, `意见`, `影响`, `帮助`, `情况`, `沟通`, `经验`],
  },
  "cecr-b12-bi-m2": {
    title: `比 avancé — précision, actions, écarts`, titleEn: `Advanced 比 — precision, actions, gaps`,
    duration: 15,
    category: `grammar`,
    difficulty: `intermediate`,
    introTitle: `比 : l'écart se place toujours APRÈS l'adjectif`,
    introTitleEn: `比: the gap always comes AFTER the adjective`,
    introContent: `Avec 比, tout ce qui mesure l'écart se place après l'adjectif, jamais avant.

- Écart flou : **一点儿 / 一些** (petit), **得多 / 多了** (grand) : 新电脑比旧电脑快得多 (xīn diànnǎo bǐ jiù diànnǎo kuài de duō) = le nouvel ordi est bien plus rapide que l'ancien.
- Écart chiffré, avec un adjectif mesurable (大, 高, 贵, 远, 重) : 她比我大三岁 (tā bǐ wǒ dà sān suì) = elle a trois ans de plus que moi ; 我家比他家远两公里 (wǒ jiā bǐ tā jiā yuǎn liǎng gōnglǐ) = ma maison est deux kilomètres plus loin.
- Comparer une manière, avec le complément **得** : 他跑得比我快 (tā pǎo de bǐ wǒ kuài) = il court plus vite que moi. Si le verbe a un objet, on le répète : 他说汉语说得比我好 (tā shuō hànyǔ shuō de bǐ wǒ hǎo).
- Comparer une quantité ou un délai, avec **多 / 少 / 早 / 晚** devant le verbe : 我比他多吃了五个饺子 (wǒ bǐ tā duō chī le wǔ ge jiǎozi) = j'ai mangé cinq raviolis de plus que lui.

**Piège :** le francophone dit « beaucoup plus rapide » et pose l'intensité devant l'adjectif. 比旧电脑很快 est faux : dès que 比 apparaît, on retire 很 et on renvoie le modificateur derrière l'adjectif. Et l'écart chiffré ne fonctionne pas avec 没有.`,
    introContentEn: `With 比, everything that measures the gap goes after the adjective, never before.

- Vague gap: **一点儿 / 一些** (small), **得多 / 多了** (large): 新电脑比旧电脑快得多 (xīn diànnǎo bǐ jiù diànnǎo kuài de duō) = the new computer is much faster than the old one.
- Exact gap, with a measurable adjective (大, 高, 贵, 远, 重): 她比我大三岁 (tā bǐ wǒ dà sān suì) = she is three years older than me; 我家比他家远两公里 (wǒ jiā bǐ tā jiā yuǎn liǎng gōnglǐ) = my place is two kilometres further away.
- Comparing manner, with the **得** complement: 他跑得比我快 (tā pǎo de bǐ wǒ kuài) = he runs faster than me. If the verb takes an object, repeat the verb: 他说汉语说得比我好 (tā shuō hànyǔ shuō de bǐ wǒ hǎo).
- Comparing a quantity or a delay, with **多 / 少 / 早 / 晚** before the verb: 我比他多吃了五个饺子 (wǒ bǐ tā duō chī le wǔ ge jiǎozi) = I ate five dumplings more than him.

**Watch out:** learners say "much faster" and put the intensity before the adjective. 比旧电脑很快 is wrong: once 比 is there, drop 很 and push the modifier behind the adjective. And the exact-gap pattern does not work with 没有.`,
    objectives: [`Doser l'écart avec 一点儿, 得多 et 多了`, `Chiffrer un écart après un adjectif mesurable`, `Comparer des actions avec le complément 得`, `Quantifier une action avec 多, 少, 早, 晚`],
    objectivesEn: [`Calibrate the gap with 一点儿, 得多 and 多了`, `State an exact gap after a measurable adjective`, `Compare actions with the 得 complement`, `Quantify an action with 多, 少, 早, 晚`],
    flashcards: [`一点儿`, `一些`, `得多`, `多了`, `快`, `岁`, `公里`, `饺子`, `分钟`],
  },
  "cecr-b12-grammar-redup-adv-m1": {
    title: `Réduplication avancée : V了V, V来V去, 好好, MW doublés`, titleEn: `Advanced reduplication: V了V, V来V去, 好好, doubled MW`,
    duration: 16,
    category: `grammar`,
    difficulty: `intermediate`,
    introTitle: `看了看 bref, 走来走去 répété, 好好 « comme il faut »`,
    introTitleEn: `看了看 brief, 走来走去 back and forth, 好好 « properly »`,
    introContent: `Répéter un mot en chinois, ce n'est pas insister : c'est changer la texture de l'action.

- **V + 了 + V** = action passée brève et terminée : 他看了看我，没说话 (tā kàn le kàn wǒ, méi shuō huà) = il m'a jeté un coup d'œil, sans rien dire. De même 想了想 (xiǎng le xiǎng) = a réfléchi un peu, 笑了笑 (xiào le xiào) = a esquissé un sourire.
- **V + 来 + V + 去** = va-et-vient répété : 他在房间里走来走去 (tā zài fángjiān lǐ zǒu lái zǒu qù) = il fait les cent pas dans la pièce ; 想来想去 (xiǎng lái xiǎng qù) = tourner et retourner la question.
- **好好** (hǎohǎo) = comme il faut, à fond — juste avant le verbe, sans 地 : 好好学习 (hǎohǎo xuéxí) = bien étudier, 好好休息 (hǎohǎo xiūxi) = bien se reposer.
- **Spécificatif redoublé** = chacun, sans exception : 他们个个都很聪明 (tāmen gègè dōu hěn cōngming) = ils sont tous intelligents. Et Nb + MW redoublé marque la progression : 一天一天 (yì tiān yì tiān) = jour après jour.

**Piège :** on ajoute un 了 final par réflexe. 看了看了 est faux, et ce pattern ne se nie jamais — pour « il n'a pas regardé », on dit simplement 没看. Autre confusion fréquente : 好好 ne signifie pas « pas mal », qui se dit 还好.`,
    introContentEn: `Repeating a word in Chinese is not emphasis: it changes the texture of the action.

- **V + 了 + V** = a short, completed past action: 他看了看我，没说话 (tā kàn le kàn wǒ, méi shuō huà) = he glanced at me and said nothing. Likewise 想了想 (xiǎng le xiǎng) = thought for a moment, 笑了笑 (xiào le xiào) = gave a small smile.
- **V + 来 + V + 去** = repeated back-and-forth motion: 他在房间里走来走去 (tā zài fángjiān lǐ zǒu lái zǒu qù) = he paces around the room; 想来想去 (xiǎng lái xiǎng qù) = to turn something over and over in one's mind.
- **好好** (hǎohǎo) = properly, thoroughly — right before the verb, no 地 needed: 好好学习 (hǎohǎo xuéxí) = study properly, 好好休息 (hǎohǎo xiūxi) = rest well.
- **Doubled measure word** = each one, without exception: 他们个个都很聪明 (tāmen gègè dōu hěn cōngming) = every one of them is clever. And number + doubled MW marks progression: 一天一天 (yì tiān yì tiān) = day after day.

**Watch out:** learners reflexively add a final 了. 看了看了 is wrong, and this pattern is never negated — for "he didn't look", just say 没看. Another common mix-up: 好好 does not mean "not bad", which is 还好.`,
    objectives: [`Raconter une action brève avec V了V`, `Décrire un va-et-vient avec V来V去`, `Employer 好好 devant le verbe sans 地`, `Marquer « chacun » avec un MW redoublé`],
    objectivesEn: [`Narrate a brief action with V了V`, `Describe back-and-forth motion with V来V去`, `Use 好好 before the verb without 地`, `Express « each one » with a doubled MW`],
    flashcards: [`看了看`, `想了想`, `笑了笑`, `走来走去`, `想来想去`, `好好学习`, `家家`, `天天`],
  },
  "cecr-b12-nuances-m8": {
    title: `怎么 émotionnel — surprise, plainte, exclamation`, titleEn: `Emotional 怎么 — surprise, complaint, exclamation`,
    duration: 14,
    category: `grammar`,
    difficulty: `intermediate`,
    introTitle: `怎么 émotionnel : de « comment » à « comment ça se fait ? »`,
    introTitleEn: `Emotional 怎么: from « how » to « how come ? »`,
    introContent: `Avec une négation ou une situation inattendue, 怎么 quitte le sens « méthode » et devient une réaction émotionnelle.

- **怎么 + négation** = surprise ou reproche léger : 你怎么没来 (nǐ zěnme méi lái) = comment ça se fait que tu ne sois pas venu ? À comparer au neutre 你为什么没来 (nǐ wèishénme méi lái), qui est une vraie question.
- **怎么了** (zěnme le) signale qu'un problème est perçu : 你怎么了 (nǐ zěnme le) = qu'est-ce que tu as ? Alors que 怎么样了 (zěnmeyàng le) demande la suite, la mise à jour.
- **怎么会 / 怎么这样 / 怎么这么** servent à ventiler une émotion : 这个菜怎么这么贵 (zhège cài zěnme zhème guì) = il est hyper cher, ce plat !
- **怎么...都/也** = peu importe comment : 我怎么也睡不着 (wǒ zěnme yě shuì bù zháo) = je n'arrive pas à dormir quoi que je fasse. Et 怎么还 marque la surprise que ça continue, 怎么就 que ça soit déjà fini.

**Piège :** le francophone traduit 怎么 par « comment » et croit poser une question. Dans ces emplois, personne n'attend de réponse : 你怎么这样 n'est pas une demande d'explication, c'est de la déception. À l'écrit formel, ou pour une vraie question, reste sur 为什么.`,
    introContentEn: `With a negation or an unexpected situation, 怎么 drops its "method" meaning and becomes an emotional reaction.

- **怎么 + negation** = surprise or mild reproach: 你怎么没来 (nǐ zěnme méi lái) = how come you didn't show up? Compare the neutral 你为什么没来 (nǐ wèishénme méi lái), which is a genuine question.
- **怎么了** (zěnme le) signals that a problem is being sensed: 你怎么了 (nǐ zěnme le) = what's wrong with you? Whereas 怎么样了 (zěnmeyàng le) asks for an update.
- **怎么会 / 怎么这样 / 怎么这么** are ways of venting emotion: 这个菜怎么这么贵 (zhège cài zěnme zhème guì) = this dish is SO expensive!
- **怎么...都/也** = no matter how: 我怎么也睡不着 (wǒ zěnme yě shuì bù zháo) = I can't fall asleep whatever I try. And 怎么还 marks surprise that something continues, 怎么就 that it is already over.

**Watch out:** learners translate 怎么 as "how" and think they are asking a question. In these uses nobody expects an answer: 你怎么这样 is not a request for an explanation, it is disappointment. In formal writing, or for a real question, stick to 为什么.`,
    objectives: [`Distinguer 怎么 (surprise) de 为什么 (neutre)`, `Choisir entre 怎么了 et 怎么样了`, `Réagir avec 怎么会, 怎么这样, 怎么这么`, `Exprimer « peu importe » avec 怎么...都/也`],
    objectivesEn: [`Tell 怎么 (surprise) apart from 为什么 (neutral)`, `Choose between 怎么了 and 怎么样了`, `React with 怎么会, 怎么这样, 怎么这么`, `Express « no matter how » with 怎么...都/也`],
    flashcards: [`怎么`, `为什么`, `怎么了`, `怎么样了`, `怎么会`, `怎么这样`, `睡不着`, `放弃`],
  },
  "cecr-b12-nuances-m9": {
    title: `Mots de mesure avancés — actions, emphase, registre`, titleEn: `Advanced measure words — actions, emphasis, register`,
    duration: 17,
    category: `grammar`,
    difficulty: `intermediate`,
    introTitle: `次 occurrence, 遍 cycle complet, 趟 trajet`,
    introTitleEn: `次 occurrence, 遍 full cycle, 趟 round trip`,
    introContent: `Le français dit « fois » partout ; le chinois choisit un classificateur selon la nature de l'action.

- **次** (cì) = occurrence neutre : 我去过三次 (wǒ qùguò sān cì) = j'y suis allé trois fois. Sert aussi de nom dans 这次, 上次, 下次.
- **遍** (biàn) = cycle complet, du début à la fin : 这本书我看了两遍 (zhè běn shū wǒ kàn le liǎng biàn) = j'ai lu ce livre deux fois en entier.
- **趟** (tàng) = un trajet, un déplacement physique : 我得跑一趟银行 (wǒ děi pǎo yí tàng yínháng) = il faut que je passe à la banque.
- **每 + MW** est neutre, le **MW redoublé** insiste : 他们个个都很认真 (tāmen gègè dōu hěn rènzhēn) = ils sont tous sérieux, sans exception. Et 一天比一天冷 (yì tiān bǐ yì tiān lěng) = de plus en plus froid chaque jour.
- Registre : **位** (personne, poli), **份** (document), **项** (mesure, tâche), **则** (avis officiel) remplacent 个 à l'écrit professionnel.

**Piège :** dire 我看了三次 quand on veut dire « je l'ai lu trois fois en entier » — il faut 遍, sinon on comprend trois coups d'œil. Autre réflexe à corriger : on n'ajoute jamais 个 après 次 (on dit 上次, jamais 上个次).`,
    introContentEn: `English says "times" for everything; Chinese picks a classifier based on the nature of the action.

- **次** (cì) = a neutral occurrence: 我去过三次 (wǒ qùguò sān cì) = I've been there three times. It also works as a noun in 这次, 上次, 下次.
- **遍** (biàn) = a complete cycle, start to finish: 这本书我看了两遍 (zhè běn shū wǒ kàn le liǎng biàn) = I read this book twice, cover to cover.
- **趟** (tàng) = one trip, a physical journey: 我得跑一趟银行 (wǒ děi pǎo yí tàng yínháng) = I need to make a run to the bank.
- **每 + MW** is neutral, a **doubled MW** insists: 他们个个都很认真 (tāmen gègè dōu hěn rènzhēn) = every single one of them is serious. And 一天比一天冷 (yì tiān bǐ yì tiān lěng) = colder day by day.
- Register: **位** (person, polite), **份** (document), **项** (measure, task), **则** (official notice) replace 个 in professional writing.

**Watch out:** saying 我看了三次 when you mean "I read it three times from cover to cover" — you need 遍, otherwise it means three quick glances. Another habit to fix: never add 个 after 次 (say 上次, never 上个次).`,
    objectives: [`Compter les actions avec 次, 遍 et 趟`, `Renforcer « chaque » par un MW redoublé`, `Employer les patterns 一MW一MW et 一MW比一MW`, `Reconnaître les MW de registre 位, 份, 项, 则`],
    objectivesEn: [`Count actions with 次, 遍 and 趟`, `Intensify « each » with a doubled MW`, `Use the 一MW一MW and 一MW比一MW patterns`, `Recognise the register MWs 位, 份, 项, 则`],
    flashcards: [`次`, `遍`, `趟`, `这次`, `上次`, `下次`, `每次`, `位`, `顿`],
  },
  "cecr-b12-nuances-m10": {
    title: `« Presque » avancé : 几乎, 将近, 差点儿, 差点儿没`, titleEn: `Advanced «almost»: 几乎, 将近, 差点儿, 差点儿没`,
    duration: 15,
    category: `vocabulary`,
    difficulty: `intermediate`,
    introTitle: `差点儿 = ça n'a pas eu lieu ; 差点儿没 = ça a eu lieu`,
    introTitleEn: `差点儿 = it didn't happen ; 差点儿没 = it did`,
    introContent: `Quatre « presque » qui ne se remplacent pas : le choix dépend du registre et surtout de ce qui s'est vraiment passé.

- **几乎** (jīhū) = presque, quasiment — registre soutenu, toujours devant un mot qu'il modifie : 他几乎每天都喝咖啡 (tā jīhū měitiān dōu hē kāfēi) = il boit un café presque tous les jours. Il ne peut jamais répondre seul à une question.
- **将近** (jiāngjìn) = près de — uniquement devant un nombre : 这个寺庙有将近五百年的历史 (zhège sìmiào yǒu jiāngjìn wǔbǎi nián de lìshǐ) = ce temple a près de cinq cents ans d'histoire.
- **差点儿** (chàdiǎnr) = à deux doigts de, et l'action n'a PAS eu lieu : 我差点儿忘了你的生日 (wǒ chàdiǎnr wàng le nǐ de shēngrì) = j'ai failli oublier ton anniversaire, donc je m'en suis souvenu. Version écrite : 险些 (xiǎnxiē).
- **差点儿没** inverse le résultat quand l'action est souhaitée : 我差点儿没赶上火车 (wǒ chàdiǎnr méi gǎnshàng huǒchē) = j'ai attrapé le train de justesse.

**Piège :** le francophone lit le 没 comme une négation ordinaire et comprend l'inverse. Pose-toi la question « le locuteur voulait-il que ça arrive ? ». Et 将近 ne se met jamais devant un verbe ou un adjectif : 将近好 n'existe pas.`,
    introContentEn: `Four ways to say "almost" that are not interchangeable: the choice depends on register and, above all, on what actually happened.

- **几乎** (jīhū) = almost, nearly — an elevated register, always placed before the word it modifies: 他几乎每天都喝咖啡 (tā jīhū měitiān dōu hē kāfēi) = he drinks coffee almost every day. It can never stand alone as an answer.
- **将近** (jiāngjìn) = close to — only before a number: 这个寺庙有将近五百年的历史 (zhège sìmiào yǒu jiāngjìn wǔbǎi nián de lìshǐ) = this temple has nearly five hundred years of history.
- **差点儿** (chàdiǎnr) = a hair's breadth away, and the action did NOT happen: 我差点儿忘了你的生日 (wǒ chàdiǎnr wàng le nǐ de shēngrì) = I almost forgot your birthday, meaning I remembered. Written version: 险些 (xiǎnxiē).
- **差点儿没** flips the outcome when the action is desirable: 我差点儿没赶上火车 (wǒ chàdiǎnr méi gǎnshàng huǒchē) = I caught the train by a whisker.

**Watch out:** learners read 没 as an ordinary negation and get the opposite meaning. Ask yourself: "did the speaker want this to happen?" And 将近 never goes before a verb or an adjective: 将近好 does not exist.`,
    objectives: [`Employer 几乎 dans un registre écrit ou emphatique`, `Placer 将近 devant un nombre uniquement`, `Comprendre que 差点儿 nie la réalisation`, `Décoder le renversement de sens de 差点儿没`],
    objectivesEn: [`Use 几乎 in a written or emphatic register`, `Place 将近 before numbers only`, `Grasp that 差点儿 means it did not happen`, `Decode the meaning flip of 差点儿没`],
    flashcards: [`几乎`, `将近`, `差点儿`, `差点儿没`, `险些`, `赶上`, `迟到`, `错过`, `考试`],
  },
  "cecr-b12-nuances-m11": {
    title: `« Si oui ou non » formel : 是否 et 与否`, titleEn: `Formal « whether or not »: 是否 and 与否`,
    duration: 10,
    category: `grammar`,
    difficulty: `intermediate`,
    introTitle: `是否 avant le verbe, 与否 après`,
    introTitleEn: `是否 before the verb, 与否 after`,
    introContent: `Deux façons formelles de dire « si oui ou non », qui se distinguent d'abord par leur position dans la phrase.

- **是否** (shìfǒu) se place AVANT le verbe et remplace V-不-V ou 要不要 à l'écrit : 我不确定他是否同意 (wǒ bù quèdìng tā shìfǒu tóngyì) = je ne suis pas sûr qu'il accepte.
- Formule d'email professionnel : 请确认您是否收到邮件 (qǐng quèrèn nín shìfǒu shōudào yóujiàn) = veuillez confirmer si vous avez bien reçu l'email.
- **与否** (yǔfǒu) se place APRÈS le verbe ou l'adjectif et transforme le groupe en nom : 成功与否，全靠自己 (chénggōng yǔfǒu, quán kào zìjǐ) = réussir ou non, tout dépend de soi.
- Blocs figés à reconnaître : 成功与否, 满意与否 (mǎnyì yǔfǒu), 可行与否, 愿意与否. Retiens l'équivalence : 我不知道是否参加 = 我不知道参加与否.

**Piège :** le francophone place 与否 comme 是否, devant le verbe — c'est faux, 与否 est toujours postposé. Seconde erreur classique : le doubler avec 不管, ce qui fait redondance ; 与否 se suffit à lui-même. Enfin, à l'oral détendu ces deux mots sonnent ampoulés : garde 要不要 pour parler avec des amis.`,
    introContentEn: `Two formal ways of saying "whether or not", distinguished first of all by where they sit in the sentence.

- **是否** (shìfǒu) goes BEFORE the verb and replaces V-不-V or 要不要 in writing: 我不确定他是否同意 (wǒ bù quèdìng tā shìfǒu tóngyì) = I'm not sure whether he agrees.
- A standard business-email formula: 请确认您是否收到邮件 (qǐng quèrèn nín shìfǒu shōudào yóujiàn) = please confirm whether you received the email.
- **与否** (yǔfǒu) goes AFTER the verb or adjective and turns the phrase into a noun: 成功与否，全靠自己 (chénggōng yǔfǒu, quán kào zìjǐ) = whether you succeed or not depends entirely on yourself.
- Fixed chunks to recognise: 成功与否, 满意与否 (mǎnyì yǔfǒu), 可行与否, 愿意与否. Remember the equivalence: 我不知道是否参加 = 我不知道参加与否.

**Watch out:** learners place 与否 like 是否, before the verb — that is wrong, 与否 is always post-posed. A second classic error is pairing it with 不管, which is redundant; 与否 stands on its own. Finally, in casual speech both words sound pompous: keep 要不要 for talking with friends.`,
    objectives: [`Placer 是否 avant le verbe à l'écrit formel`, `Nominaliser une clause avec 与否`, `Remplacer 要不要 par 是否 dans un email pro`, `Reconnaître les blocs 成功与否 et 满意与否`],
    objectivesEn: [`Place 是否 before the verb in formal writing`, `Nominalise a clause with 与否`, `Swap 要不要 for 是否 in a business email`, `Recognise the chunks 成功与否 and 满意与否`],
    flashcards: [`是否`, `与否`, `考虑`, `参加`, `确认`, `同意`, `成功`, `愿意`, `可行`],
  },
  "cecr-b12-nuances-m12": {
    title: `« Ça dépend » formel : 取决于, 视...而定, 有赖于`, titleEn: `Formal « it depends »: 取决于, 视...而定, 有赖于`,
    duration: 14,
    category: `vocabulary`,
    difficulty: `intermediate`,
    introTitle: `取决于 : le résultat d'abord, le facteur ensuite`,
    introTitleEn: `取决于: result first, factor second`,
    introContent: `« Ça dépend » a une version soutenue, et son ordre des mots est l'inverse du français : le résultat d'abord, le facteur ensuite.

- **取决于** (qǔjuéyú) = dépendre de, être déterminé par : 结果取决于样本大小 (jiéguǒ qǔjuéyú yàngběn dàxiǎo) = le résultat dépend de la taille de l'échantillon.
- **由...决定** met en avant celui qui tranche : 人选由委员会决定 (rénxuǎn yóu wěiyuánhuì juédìng) = le choix du candidat est décidé par le comité.
- **视...而定** et **根据...而定** sont le registre des règlements : 视情况而定 (shì qíngkuàng érdìng) = à décider selon la situation ; 费用根据距离而定 (fèiyòng gēnjù jùlí érdìng) = les frais sont calculés selon la distance.
- **要分情况** (yàofēn qíngkuàng) = il faut distinguer les cas, l'outil des réunions pro. Plus haut encore : **有赖于**, **有待**, **以...为准** : 细节有待确认 (xìjié yǒudài quèrèn) = les détails sont en attente de confirmation.

**Piège :** calquer le français et placer le facteur avant le résultat. En chinois, le résultat précède toujours 取决于. Autre réflexe à corriger : ne pas monter tous les registres d'un coup — 有赖于 et 以...为准 servent surtout à être reconnus dans un contrat ou un article, pas à être glissés dans une conversation.`,
    introContentEn: `"It depends" has a formal version, and its word order is the reverse of English: result first, factor second.

- **取决于** (qǔjuéyú) = to depend on, to be determined by: 结果取决于样本大小 (jiéguǒ qǔjuéyú yàngběn dàxiǎo) = the result depends on the sample size.
- **由...决定** foregrounds whoever makes the call: 人选由委员会决定 (rénxuǎn yóu wěiyuánhuì juédìng) = the choice of candidate is decided by the committee.
- **视...而定** and **根据...而定** belong to the register of regulations: 视情况而定 (shì qíngkuàng érdìng) = to be decided according to the situation; 费用根据距离而定 (fèiyòng gēnjù jùlí érdìng) = fees are calculated according to distance.
- **要分情况** (yàofēn qíngkuàng) = we need to distinguish the cases, the tool of professional meetings. Higher still: **有赖于**, **有待**, **以...为准**: 细节有待确认 (xìjié yǒudài quèrèn) = the details are pending confirmation.

**Watch out:** copying English word order and putting the factor before the result. In Chinese the result always precedes 取决于. Another habit to fix: don't jump to the highest register at once — 有赖于 and 以...为准 are mainly there to be recognised in a contract or an article, not slipped into a conversation.`,
    objectives: [`Construire une phrase avec 取决于 (résultat d'abord)`, `Attribuer la décision avec 由...决定`, `Employer 视...而定 et 根据...而定`, `Reconnaître 有赖于, 有待 et 以...为准`],
    objectivesEn: [`Build a sentence with 取决于 (result first)`, `Assign the decision with 由...决定`, `Use 视...而定 and 根据...而定`, `Recognise 有赖于, 有待 and 以...为准`],
    flashcards: [`取决于`, `决定`, `由`, `视`, `而定`, `根据`, `有赖于`, `有待`, `合同`],
  },
  "cecr-b12-nuances-m13": {
    title: `Inquiétude avancée : 操心, 烦恼, 焦虑, 担忧 et idiomes`, titleEn: `Advanced worry: 操心, 烦恼, 焦虑, 担忧 and idioms`,
    duration: 14,
    category: `vocabulary`,
    difficulty: `intermediate`,
    introTitle: `操心 on agit, 烦恼 ça ronge, 焦虑 c'est clinique`,
    introTitleEn: `操心 you act, 烦恼 it gnaws, 焦虑 it's clinical`,
    introContent: `Au-delà de 担心, le chinois découpe l'inquiétude selon l'implication, l'intensité et le registre.

- **操心** (cāoxīn) = se démener par inquiétude, souvent pour les affaires des autres : 妈妈总为孩子的事情操心 (māma zǒng wèi háizi de shìqíng cāoxīn) = maman se casse la tête pour les affaires des enfants. Variante 瞎操心 (xiācāoxīn) = s'inquiéter pour rien.
- **烦恼** (fánnǎo) = tracas qui minent, nom ou adjectif : 他最近有很多烦恼 (tā zuìjìn yǒu hěn duō fánnǎo) = il a beaucoup de soucis ces temps-ci. **发愁** (fāchóu) = broyer du noir sur un problème précis : 我在为工作发愁 (wǒ zài wèi gōngzuò fāchóu).
- Registre écrit : **不安** (malaise diffus), **焦虑** (angoisse, santé mentale), **担忧** et **忧虑** (presse et documents officiels) : 很多年轻人对未来充满焦虑 (hěn duō niánqīngrén duì wèilái chōngmǎn jiāolǜ).
- Oral expressif : adjectif + **死了**, comme 急死了 (jísǐle) = stresser à mort. Chengyu : 提心吊胆 (tíxīndiàodǎn), 坐立不安 (zuòlìbùān).

**Piège :** traduire « je m'inquiète pour toi » par 担忧 — beaucoup trop journalistique. 操心 et 发愁 se construisent avec 为 : 别为我操心了. Et garde les chengyu pour un récit dramatique : les sortir pour un retard de métro sonne théâtral.`,
    introContentEn: `Beyond 担心, Chinese slices worry up by involvement, intensity and register.

- **操心** (cāoxīn) = to fret and busy oneself with worry, often over other people's affairs: 妈妈总为孩子的事情操心 (māma zǒng wèi háizi de shìqíng cāoxīn) = mum is always fussing over the children's affairs. Variant 瞎操心 (xiācāoxīn) = to worry over nothing.
- **烦恼** (fánnǎo) = nagging troubles, noun or adjective: 他最近有很多烦恼 (tā zuìjìn yǒu hěn duō fánnǎo) = he has a lot on his mind lately. **发愁** (fāchóu) = to brood over one specific problem: 我在为工作发愁 (wǒ zài wèi gōngzuò fāchóu).
- Written register: **不安** (diffuse unease), **焦虑** (anxiety, mental health), **担忧** and **忧虑** (press and official documents): 很多年轻人对未来充满焦虑 (hěn duō niánqīngrén duì wèilái chōngmǎn jiāolǜ).
- Expressive speech: adjective + **死了**, as in 急死了 (jísǐle) = stressed to death. Chengyu: 提心吊胆 (tíxīndiàodǎn), 坐立不安 (zuòlìbùān).

**Watch out:** translating "I'm worried about you" with 担忧 — far too journalistic. 操心 and 发愁 are built with 为: 别为我操心了. And save the chengyu for a dramatic story: using them for a late train sounds theatrical.`,
    objectives: [`Distinguer 操心, 烦恼 et 发愁`, `Choisir 焦虑, 担忧 ou 忧虑 selon le registre`, `Construire l'inquiétude avec 为...操心`, `Intensifier à l'oral avec 死了 et les chengyu`],
    objectivesEn: [`Tell 操心, 烦恼 and 发愁 apart`, `Pick 焦虑, 担忧 or 忧虑 by register`, `Build worry with the 为...操心 pattern`, `Intensify in speech with 死了 and chengyu`],
    flashcards: [`操心`, `瞎操心`, `烦恼`, `发愁`, `不安`, `焦虑`, `担忧`, `忧虑`, `提心吊胆`],
  },
  "cecr-b12-nuances-m14": {
    title: `果然 vs 竟然 : confirmation vs surprise`, titleEn: `果然 vs 竟然: confirmation vs surprise`,
    duration: 14,
    category: `grammar`,
    difficulty: `intermediate`,
    introTitle: `果然 = comme prévu, 竟然 = contre toute attente`,
    introTitleEn: `果然 = as expected, 竟然 = against all odds`,
    introContent: `Un seul test départage ces deux adverbes : est-ce que tu t'y attendais ?

- **竟然** (jìngrán) = la réalité contredit ton attente, avec de l'émotion : 他竟然真的成功了 (tā jìngrán zhēnde chénggōng le) = il a vraiment réussi, incroyable
- **果然** (guǒrán) = la réalité confirme ta prédiction : 他果然没来 (tā guǒrán méi lái) = comme prévu, il n'est pas venu
- Échelle de force : **没想到** (méixiǎngdào) doux < **竟然** standard < **居然** (jūrán) choc intense < **不料** (bùliào) littéraire
- **果真** (guǒzhēn) vérifie une rumeur, pas ta propre prédiction : 果真如此 (guǒzhēn rúcǐ) = c'est effectivement le cas

**Piège :** un francophone traduit « finalement » par le premier mot venu et place 竟然 là où la situation était prévue. 竟然 porte toujours une émotion, admiration ou reproche, alors que 反而 (fǎnér) et 却 (què) marquent une simple opposition, sans surprise. Symétriquement, 果然 est neutre ou légèrement satisfait, jamais étonné : réserve-le au moment où tu peux dire « j'avais raison », comme dans les formules figées 果然如此 (guǒránrúcǐ) et 果然不出所料 (guǒrán bùchūsuǒliào).`,
    introContentEn: `A single test separates these two adverbs: were you expecting it?

- **竟然** (jìngrán) = reality contradicts your expectation, with emotion: 他竟然真的成功了 (tā jìngrán zhēnde chénggōng le) = he really did succeed, unbelievable
- **果然** (guǒrán) = reality confirms your prediction: 他果然没来 (tā guǒrán méi lái) = as expected, he didn't come
- Strength scale: **没想到** (méixiǎngdào) mild < **竟然** standard < **居然** (jūrán) intense shock < **不料** (bùliào) literary
- **果真** (guǒzhēn) checks a rumour rather than your own prediction: 果真如此 (guǒzhēn rúcǐ) = it really is so

**Pitfall:** learners translate "in the end" with whatever comes first and drop 竟然 into situations that were expected all along. 竟然 always carries emotion, admiration or reproach, whereas 反而 (fǎnér) and 却 (què) mark plain contrast with no surprise. Conversely 果然 is neutral or mildly satisfied, never astonished: save it for the moment you can say "I was right", as in the set phrases 果然如此 (guǒránrúcǐ) and 果然不出所料 (guǒrán bùchūsuǒliào).`,
    objectives: [`Opposer 果然 (prévu) et 竟然 (inattendu)`, `Graduer la surprise de 没想到 à 居然`, `Réserver 果真 à la vérification d'une rumeur`, `Distinguer 竟然 (émotion) de 反而 et 却 (neutres)`],
    objectivesEn: [`Contrast 果然 (expected) with 竟然 (unexpected)`, `Grade surprise from 没想到 up to 居然`, `Keep 果真 for checking a rumour`, `Tell emotional 竟然 from neutral 反而 and 却`],
    flashcards: [`竟然`, `居然`, `没想到`, `不料`, `果然`, `果真`, `反而`, `却`],
  },
  "cecr-b12-nuances-m15": {
    title: `Particules finales avancées : 哟, 呗, 嘛, 罢了 + classiques`, titleEn: `Advanced sentence-final particles: 哟, 呗, 嘛, 罢了 + classical`,
    duration: 15,
    category: `grammar`,
    difficulty: `intermediate`,
    introTitle: `哟 mignon, 呗 blasé, 嘛 évident, 罢了 minimise`,
    introTitleEn: `哟 cute, 呗 laid-back, 嘛 obvious, 罢了 downplays`,
    introContent: `Une particule finale ne change pas le sens de la phrase : elle change ton attitude.

- **哟** (yō) = avertissement chaleureux, presque enfantin : 小心开车哟 (xiǎoxīn kāichē yō) = fais gaffe en conduisant, hein !
- **呗** (bei) = haussement d'épaule verbal, pattern figé A 就 A 呗 : 贵就贵呗 (guì jiù guì bei) = c'est cher ? tant pis
- **嘛** (ma) = ton explicatif, « ben oui c'est évident » : 他还是个孩子嘛 (tā háishì gè háizi ma) = c'est encore un gamin, tu sais
- **罢了** (bàle) et **而已** (éryǐ) minimisent : 我只是开玩笑罢了 (wǒ zhǐshì kāiwánxiào bàle) = je plaisantais, c'est tout

**Piège :** ne confonds jamais 嘛 avec 吗 — le second pose une question, le premier justifie. 哟 et 呗 sont purement oraux et familiers, donc à bannir au travail, tandis que 罢了 est écrit et littéraire là où 而已 passe partout à l'oral. Les particules classiques 也, 矣, 乎, 哉 se reconnaissent mais ne se produisent pas : le 也 du wenyan est assertif, sans rapport avec le 也 moderne « aussi », et 矣 correspond à notre 了, comme dans 吾老矣 (wú lǎo yǐ) = je suis devenu vieux.`,
    introContentEn: `A sentence-final particle doesn't change what the sentence means: it changes your attitude.

- **哟** (yō) = warm, almost childlike warning: 小心开车哟 (xiǎoxīn kāichē yō) = drive carefully, okay!
- **呗** (bei) = a verbal shrug, in the set pattern A 就 A 呗: 贵就贵呗 (guì jiù guì bei) = expensive? oh well
- **嘛** (ma) = explanatory tone, "well obviously": 他还是个孩子嘛 (tā háishì gè háizi ma) = he's still a kid, you know
- **罢了** (bàle) and **而已** (éryǐ) play things down: 我只是开玩笑罢了 (wǒ zhǐshì kāiwánxiào bàle) = I was only joking, that's all

**Pitfall:** never mix up 嘛 and 吗 — the latter asks a question, the former justifies. 哟 and 呗 are purely spoken and casual, so keep them out of work settings, while 罢了 is written and literary where 而已 works anywhere in speech. The classical particles 也, 矣, 乎, 哉 are for recognition only: the wenyan 也 is assertive and has nothing to do with modern 也 "also", and 矣 matches modern 了, as in 吾老矣 (wú lǎo yǐ) = I have grown old.`,
    objectives: [`Choisir entre 哟, 呗 et 嘛 selon l'attitude`, `Minimiser avec 罢了 à l'écrit, 而已 à l'oral`, `Séparer le 嘛 explicatif du 吗 interrogatif`, `Reconnaître 也, 矣, 乎, 哉 comme signal de wenyan`],
    objectivesEn: [`Pick between 哟, 呗 and 嘛 by attitude`, `Downplay with 罢了 in writing, 而已 in speech`, `Separate explanatory 嘛 from question-marking 吗`, `Recognise 也, 矣, 乎, 哉 as wenyan signals`],
    flashcards: [`哟`, `呗`, `嘛`, `罢了`, `而已`, `矣`, `乎`, `哉`, `文言`],
  },
  "cecr-b12-nuances-m16": {
    title: `呢 avancé : action en cours, choix doux, sarcasme 还...呢`, titleEn: `Advanced 呢: ongoing action, soft choices, sarcastic 还...呢`,
    duration: 13,
    category: `grammar`,
    difficulty: `intermediate`,
    introTitle: `呢 : « je suis occupé », choix doux ou pure ironie`,
    introTitleEn: `呢: "I'm busy", soft choices, or pure irony`,
    introContent: `Le même 呢 change de métier selon la structure qui l'accueille.

- **在...呢** = action en cours, avec le sous-texte « ne me dérange pas » : 我在打电话呢 (wǒ zài dǎdiànhuà ne) = je suis au téléphone, là
- **...呢，还是...呢 ?** adoucit un choix : 我们今晚吃披萨呢，还是吃中餐呢 ? (wǒmen jīnwǎn chī pīsà ne, háishi chī zhōngcān ne) = on mange pizza ce soir, ou plutôt chinois ?
- **还...呢** = scepticisme sarcastique : 还名牌儿呢，我听都没听过 (hái míngpáir ne, wǒ tīng dōu méi tīngguò) = soi-disant une grande marque ? j'en ai même jamais entendu parler

**Piège :** dans 还...呢, le 还 ne veut pas dire « encore » mais « soi-disant » ; le traduire par « encore » rend la phrase incompréhensible. Deuxième réflexe à prendre : 我在打电话 est un constat neutre, alors que 我在打电话呢 signale poliment que tu n'es pas disponible, et oublier le 呢 fait perdre toute cette politesse. Enfin, le sarcasme se déploie en deux temps, le doute puis la preuve : 还朋友呢，从来不帮我 (hái péngyǒu ne, cónglái bù bāng wǒ) = soi-disant un ami, il ne m'aide jamais.`,
    introContentEn: `The same 呢 does a different job depending on the structure that hosts it.

- **在...呢** = ongoing action, with the subtext "don't interrupt me": 我在打电话呢 (wǒ zài dǎdiànhuà ne) = I'm on the phone right now
- **...呢，还是...呢 ?** softens a choice: 我们今晚吃披萨呢，还是吃中餐呢 ? (wǒmen jīnwǎn chī pīsà ne, háishi chī zhōngcān ne) = shall we have pizza tonight, or Chinese food?
- **还...呢** = sarcastic scepticism: 还名牌儿呢，我听都没听过 (hái míngpáir ne, wǒ tīng dōu méi tīngguò) = a big brand, supposedly? I've never even heard of it

**Pitfall:** in 还...呢, 还 does not mean "still" but "so-called"; reading it as "still" makes the sentence unintelligible. Second habit to build: 我在打电话 is a neutral statement, while 我在打电话呢 politely signals that you're unavailable, and dropping 呢 loses all that politeness. Finally the sarcasm comes in two beats, doubt then proof: 还朋友呢，从来不帮我 (hái péngyǒu ne, cónglái bù bāng wǒ) = some friend, he never helps me.`,
    objectives: [`Signaler une occupation avec 在 + verbe + 呢`, `Adoucir un choix avec ...呢，还是...呢`, `Lire le 还 de 还...呢 comme « soi-disant »`, `Enchaîner scepticisme puis preuve en deux temps`],
    objectivesEn: [`Signal being busy with 在 + verb + 呢`, `Soften a choice with ...呢，还是...呢`, `Read 还 in 还...呢 as "so-called"`, `Chain scepticism then proof in two beats`],
    flashcards: [`呢`, `正在`, `还是`, `披萨`, `中餐`, `打车`, `名牌儿`, `专家`, `著名`],
  },
  "cecr-b12-nuances-m17": {
    title: `Choix avancés : 宁可, 与其...不如, 不如, 要不, 还是...吧`, titleEn: `Advanced choices: 宁可, 与其...不如, 不如, 要不, 还是...吧`,
    duration: 16,
    category: `grammar`,
    difficulty: `intermediate`,
    introTitle: `宁可 = préférence, 与其...不如 = jugement, 要不 = plan B`,
    introTitleEn: `宁可 = preference, 与其...不如 = judgment, 要不 = plan B`,
    introContent: `Quatre manières de choisir, du sacrifice moral à la suggestion décontractée.

- **宁可 / 宁愿...也不...** = préférence forte entre deux options peu attirantes : 他宁愿走路，也不坐爸爸的车 (tā nìngyuàn zǒulù, yě bù zuò bàba de chē) = il préfère marcher plutôt que monter dans la voiture de son père
- **与其...不如...** = jugement objectif, la seconde option est meilleure : 与其堵在路上着急，不如坐地铁去吧 (yǔqí dǔ zài lùshang zháojí, bùrú zuò dìtiě qù ba) = plutôt que s'énerver dans les bouchons, autant prendre le métro
- **不如** seul et **要不** lancent une alternative : 我们迷路了，要不问问那个人吧 (wǒmen mílù le, yàobu wènwen nàge rén ba) = on est perdus, si on demandait à ce passant ?
- **还是...吧** = décision prise après réflexion : 太晚了，你还是打车回家吧 (tài wǎn le, nǐ háishi dǎchē huíjiā ba) = il est tard, prends plutôt un taxi

**Piège :** le 还是 de 还是...吧 n'est pas le 还是 « ou » des questions, c'est un adverbe qui signifie « au final ». 你要咖啡还是茶 ? pose une question, 你还是喝茶吧 donne un conseil. Et n'emploie pas 宁可 pour « je préfère le thé au café » : ce pattern engage des valeurs profondes et sonne dramatique sur une broutille.`,
    introContentEn: `Four ways of choosing, from moral sacrifice to a casual suggestion.

- **宁可 / 宁愿...也不...** = strong preference between two unappealing options: 他宁愿走路，也不坐爸爸的车 (tā nìngyuàn zǒulù, yě bù zuò bàba de chē) = he'd rather walk than get into his father's car
- **与其...不如...** = objective judgment, the second option is better: 与其堵在路上着急，不如坐地铁去吧 (yǔqí dǔ zài lùshang zháojí, bùrú zuò dìtiě qù ba) = rather than fuming in traffic, we may as well take the metro
- **不如** on its own and **要不** float an alternative: 我们迷路了，要不问问那个人吧 (wǒmen mílù le, yàobu wènwen nàge rén ba) = we're lost, how about we ask that person?
- **还是...吧** = a decision reached after thinking it over: 太晚了，你还是打车回家吧 (tài wǎn le, nǐ háishi dǎchē huíjiā ba) = it's late, better take a taxi home

**Pitfall:** the 还是 in 还是...吧 is not the "or" of questions, it is an adverb meaning "in the end". 你要咖啡还是茶 ? asks a question, 你还是喝茶吧 gives advice. And don't use 宁可 for "I prefer tea to coffee": that pattern involves deep values and sounds melodramatic over a trifle.`,
    objectives: [`Exprimer un sacrifice avec 宁可/宁愿...也不`, `Recommander une option avec 与其...不如`, `Lancer un plan B avec 不如 ou 要不`, `Conclure une réflexion par 还是...吧`],
    objectivesEn: [`Express a sacrifice with 宁可/宁愿...也不`, `Recommend an option with 与其...不如`, `Float a plan B with 不如 or 要不`, `Close a decision with 还是...吧`],
    flashcards: [`宁可`, `宁愿`, `与其`, `不如`, `倒不如`, `要不`, `要不然`, `还是`],
  },
  "cecr-b12-nuances-m18": {
    title: `Cause et effet formel : 由于, 因此, 从而, 之所以, 鉴于`, titleEn: `Formal cause and effect: 由于, 因此, 从而, 之所以, 鉴于`,
    duration: 17,
    category: `grammar`,
    difficulty: `intermediate`,
    introTitle: `由于...因此 à l'écrit, 之所以...是因为 pour inverser`,
    introTitleEn: `由于...因此 in writing, 之所以...是因为 to invert`,
    introContent: `À l'écrit professionnel, 因为...所以 laisse la place à une gamme de connecteurs plus précis.

- **由于** (yóuyú) introduit la cause, **因此** (yīncǐ) le résultat : 由于雪下得太大，因此火车晚点了 (yóuyú xuě xià de tài dà, yīncǐ huǒchē wǎndiǎn le) = en raison de fortes chutes de neige, le train a été retardé
- **可见** (kějiàn) tire une conclusion, **从而** (cóngér) relie une méthode à son résultat : 政府降低了利率，从而刺激了经济 (zhèngfǔ jiàngdī le lìlǜ, cóngér cìjī le jīngjì) = le gouvernement a baissé les taux, stimulant ainsi l'économie
- **以致** (yǐzhì) annonce un résultat malheureux, **以至于** (yǐzhìyú) un résultat extrême : 她跑得太快，以至于摔倒了 (tā pǎo de tài kuài, yǐzhìyú shuāidǎo le) = elle a couru si vite qu'elle est tombée
- **之所以...是因为...** inverse l'ordre, effet d'abord : 他之所以成功，是因为他非常努力 (tā zhīsuǒyǐ chénggōng, shì yīnwèi tā fēicháng nǔlì) = s'il a réussi, c'est parce qu'il travaille énormément

**Piège :** 因为 et 因此 ne cohabitent pas dans la même phrase, c'est 由于 qui appelle 因此. Méfie-toi aussi des quasi-homonymes 以致 et 以至于 : le premier colore la phrase en regret. Retiens enfin l'échelle de registre 所以 (oral) < 因此 (écrit pro) < 因而 (littéraire) < 故 (classique), et garde 鉴于 (jiànyú) pour les communiqués officiels.`,
    introContentEn: `In professional writing, 因为...所以 gives way to a range of more precise connectors.

- **由于** (yóuyú) introduces the cause, **因此** (yīncǐ) the result: 由于雪下得太大，因此火车晚点了 (yóuyú xuě xià de tài dà, yīncǐ huǒchē wǎndiǎn le) = owing to heavy snowfall, the train was delayed
- **可见** (kějiàn) draws a conclusion, **从而** (cóngér) links a method to its outcome: 政府降低了利率，从而刺激了经济 (zhèngfǔ jiàngdī le lìlǜ, cóngér cìjī le jīngjì) = the government cut interest rates, thereby stimulating the economy
- **以致** (yǐzhì) announces an unfortunate result, **以至于** (yǐzhìyú) an extreme one: 她跑得太快，以至于摔倒了 (tā pǎo de tài kuài, yǐzhìyú shuāidǎo le) = she ran so fast that she fell over
- **之所以...是因为...** reverses the order, effect first: 他之所以成功，是因为他非常努力 (tā zhīsuǒyǐ chénggōng, shì yīnwèi tā fēicháng nǔlì) = the reason he succeeded is that he works extremely hard

**Pitfall:** 因为 and 因此 don't share a sentence; it is 由于 that pairs with 因此. Beware too of the near-homophones 以致 and 以至于: the first colours the sentence with regret. Finally remember the register scale 所以 (spoken) < 因此 (professional writing) < 因而 (literary) < 故 (classical), and keep 鉴于 (jiànyú) for official announcements.`,
    objectives: [`Associer 由于 à 因此 dans un écrit professionnel`, `Conclure avec 可见, enchaîner avec 从而`, `Réserver 以致 aux résultats malheureux`, `Inverser cause et effet avec 之所以...是因为`],
    objectivesEn: [`Pair 由于 with 因此 in professional writing`, `Conclude with 可见, chain with 从而`, `Keep 以致 for unfortunate outcomes`, `Invert cause and effect with 之所以...是因为`],
    flashcards: [`由于`, `因此`, `因而`, `可见`, `从而`, `以致`, `以至于`, `鉴于`, `故`],
  },
  "cecr-b12-nuances-m19": {
    title: `But formel : 以免, 以便, 以, 以期, 为...起见, 旨在`, titleEn: `Formal purpose: 以免, 以便, 以, 以期, 为...起见, 旨在`,
    duration: 15,
    category: `grammar`,
    difficulty: `intermediate`,
    introTitle: `以免 évite un risque, 以便 vise un résultat, 旨在 officialise`,
    introTitleEn: `以免 avoids a risk, 以便 targets a result, 旨在 makes it official`,
    introContent: `Exprimer un but au-delà de 为了 : d'abord éviter un mal, ensuite viser un bien.

- **以免** (yǐmiǎn), **免得** (miǎnde), **省得** (shěngde) = « pour éviter que », du panneau officiel au copain : 请带雨伞，以免被雨淋湿 (qǐng dài yǔsǎn, yǐmiǎn bèi yǔ línshī) = prends un parapluie, pour ne pas te faire tremper
- **以便** (yǐbiàn) vise un résultat assez sûr : 我们提前准备材料，以便会议顺利进行 (wǒmen tíqián zhǔnbèi cáiliào, yǐbiàn huìyì shùnlì jìnxíng) = nous préparons les documents en amont afin que la réunion se déroule bien
- **以期** (yǐqī) espère un résultat incertain : 公司投资新设备，以期提高竞争力 (gōngsī tóuzī xīn shèbèi, yǐqī tígāo jìngzhēnglì) = l'entreprise investit, dans l'espoir de gagner en compétitivité
- **为...起见** est figé, **旨在** (zhǐzài) officialise : 为安全起见，请系好安全带 (wèi ānquán qǐjiàn, qǐng jì hǎo ānquándài) = par sécurité, attachez votre ceinture

**Astuce :** ces tournures se lisent bien plus souvent qu'elles ne s'écrivent. Pour produire, garde 为了 par défaut et 免得 à l'oral, et n'emploie que les formules figées 为安全起见 et 为保险起见. Le 以 tout seul, comme dans 他建立基金，以帮助贫困学生, appartient au juridique et au journalisme soutenu : sache le lire, évite de l'imiter.`,
    introContentEn: `Expressing purpose beyond 为了: first avoiding harm, then aiming at a benefit.

- **以免** (yǐmiǎn), **免得** (miǎnde), **省得** (shěngde) = "so as to avoid", from official signage to chatting with a friend: 请带雨伞，以免被雨淋湿 (qǐng dài yǔsǎn, yǐmiǎn bèi yǔ línshī) = take an umbrella so you don't get soaked
- **以便** (yǐbiàn) aims at a fairly certain result: 我们提前准备材料，以便会议顺利进行 (wǒmen tíqián zhǔnbèi cáiliào, yǐbiàn huìyì shùnlì jìnxíng) = we prepare the documents in advance so the meeting runs smoothly
- **以期** (yǐqī) hopes for an uncertain result: 公司投资新设备，以期提高竞争力 (gōngsī tóuzī xīn shèbèi, yǐqī tígāo jìngzhēnglì) = the company is investing in new equipment in the hope of becoming more competitive
- **为...起见** is a fixed frame, **旨在** (zhǐzài) makes it official: 为安全起见，请系好安全带 (wèi ānquán qǐjiàn, qǐng jì hǎo ānquándài) = for safety reasons, please fasten your seatbelt

**Tip:** these patterns are read far more often than they are written. For production, keep 为了 as your default and 免得 in speech, and use only the fixed formulas 为安全起见 and 为保险起见. Bare 以, as in 他建立基金，以帮助贫困学生, belongs to legal texts and formal journalism: learn to read it, don't imitate it.`,
    objectives: [`Doser 以免, 免得 et 省得 selon le registre`, `Opposer 以便 (résultat sûr) et 以期 (espoir)`, `Placer les formules figées en 为...起见`, `Repérer 旨在 dans un texte institutionnel`],
    objectivesEn: [`Grade 以免, 免得 and 省得 by register`, `Contrast 以便 (likely result) with 以期 (hope)`, `Use the fixed 为...起见 formulas`, `Spot 旨在 in institutional texts`],
    flashcards: [`以免`, `免得`, `省得`, `以便`, `以期`, `为安全起见`, `为保险起见`, `旨在`],
  },
  "cecr-b12-nuances-m20": {
    title: `Nuances de « tout » : 一切, 个个, 皆, 尽皆`, titleEn: `Nuances of "all": 一切, 个个, 皆, 尽皆`,
    duration: 16,
    category: `vocabulary`,
    difficulty: `intermediate`,
    introTitle: `一切 abstrait, 个个 affectif, 皆 classique`,
    introTitleEn: `一切 abstract, 个个 warm, 皆 classical`,
    introContent: `Trois façons de dire « tout », qui ne se remplacent pas.

- **一切** (yīqiè) couvre une totalité abstraite : 一切都很好 (yīqiè dōu hěn hǎo) = tout va bien, et 不惜一切代价 (bùxī yīqiè dàijià) = à tout prix
- **所有** reste pour les ensembles concrets et délimités : on dit 所有的学生, mais 一切困难 (yīqiè kùnnán) = toutes les difficultés
- **个个** (gègè) insiste chaleureusement sur chaque membre d'un groupe : 他的孩子个个都很聪明 (tā de háizi gègè dōu hěn cōngmíng) = ses enfants sont tous intelligents
- **皆** (jiē) et **尽皆** (jìnjiē) appartiennent au chinois classique : 众人皆知 (zhòngrén jiē zhī) = tout le monde le sait

**Piège :** un francophone traduit « tous » par 所有 en toute circonstance et produit 所有困难, qui ne se dit pas. Vérifie d'abord si la totalité est concrète (所有) ou abstraite (一切). Deuxième réflexe : 个个 ne s'emploie ni avec des noms non comptables ni dans un rapport neutre, où l'on écrira plutôt 每个. Enfin 皆 se reconnaît mais ne se produit pas ; à l'oral, reste sur 都 ou 全都. La même logique de réduplication donne 天天 (tiāntiān), 人人 (rénrén) et 处处 (chùchù).`,
    introContentEn: `Three ways of saying "all" that are not interchangeable.

- **一切** (yīqiè) covers an abstract totality: 一切都很好 (yīqiè dōu hěn hǎo) = everything is fine, and 不惜一切代价 (bùxī yīqiè dàijià) = at any cost
- **所有** stays for concrete, bounded sets: you say 所有的学生, but 一切困难 (yīqiè kùnnán) = all difficulties
- **个个** (gègè) warmly stresses every single member of a group: 他的孩子个个都很聪明 (tā de háizi gègè dōu hěn cōngmíng) = his children are all bright
- **皆** (jiē) and **尽皆** (jìnjiē) belong to classical Chinese: 众人皆知 (zhòngrén jiē zhī) = everybody knows it

**Pitfall:** learners translate "all" as 所有 in every context and produce 所有困难, which isn't said. First check whether the totality is concrete (所有) or abstract (一切). Second habit: 个个 works neither with uncountable nouns nor in a neutral report, where 每个 is the right choice. Finally 皆 is for recognition, not production; in speech stay with 都 or 全都. The same reduplication logic gives 天天 (tiāntiān), 人人 (rénrén) and 处处 (chùchù).`,
    objectives: [`Réserver 一切 aux totalités abstraites`, `Opposer 个个 (affectif) et 每个 (neutre)`, `Mémoriser les collocations figées en 一切`, `Reconnaître 皆 et 尽皆 comme signal littéraire`],
    objectivesEn: [`Keep 一切 for abstract totalities`, `Contrast warm 个个 with neutral 每个`, `Memorise the fixed 一切 collocations`, `Recognise 皆 and 尽皆 as literary markers`],
    flashcards: [`一切`, `个个`, `天天`, `人人`, `处处`, `皆`, `尽皆`, `皆大欢喜`, `众人皆知`],
  },
  "cecr-b21-nuances-m8": {
    title: `Conditionnels avancés — registres formels + 要不是`, titleEn: `Advanced conditionals — formal registers + 要不是`,
    duration: 10,
    category: `grammar`,
    difficulty: `intermediate`,
    introTitle: `若 et 假如 à l'écrit, 要不是 pour le contrefactuel`,
    introTitleEn: `若 and 假如 in writing, 要不是 for counterfactuals`,
    introContent: `Un même « si » se décline selon le registre, puis bascule dans l'irréel avec 要不是.

- **要是** (oral) et **如果** (neutre) suffisent au quotidien ; **假如** (jiǎrú) monte d'un cran : 假如有困难，你一定要告诉我 (jiǎrú yǒu kùnnán, nǐ yídìng yào gàosù wǒ) = en cas de difficulté, dis-le moi absolument
- **若** (ruò) est le « si » bref des emails pro et des avis officiels : 若有需要，请随时联系我 (ruò yǒu xūyào, qǐng suíshí liánxì wǒ) = en cas de besoin, contactez-moi
- **倘若** (tǎngruò) est littéraire, **假设** (jiǎshè) académique : 假设这个理论是对的… (jiǎshè zhège lǐlùn shì duì de) = supposons que cette théorie soit correcte…
- **要不是** (yàobúshì) imagine le monde sans un fait bien réel : 要不是你提醒我，我就忘了 (yàobúshì nǐ tíxǐng wǒ, wǒ jiù wàng le) = si tu ne m'avais pas rappelé, j'aurais oublié

**Piège :** 要不是 n'est pas un simple 如果不是. Il est contrefactuel : la condition s'est bel et bien réalisée dans la vraie vie, et la phrase sert soit à remercier, soit à reprocher. Mémorise le bloc 要不是 + [fait réel]，我早就... avec 早就 (zǎojiù), qui ancre le résultat imaginé dans le passé.`,
    introContentEn: `One and the same "if" shifts with register, then tips into the unreal with 要不是.

- **要是** (spoken) and **如果** (neutral) cover daily life; **假如** (jiǎrú) is one notch up: 假如有困难，你一定要告诉我 (jiǎrú yǒu kùnnán, nǐ yídìng yào gàosù wǒ) = if you run into trouble, you must tell me
- **若** (ruò) is the compact "if" of professional emails and official notices: 若有需要，请随时联系我 (ruò yǒu xūyào, qǐng suíshí liánxì wǒ) = if you need anything, contact me any time
- **倘若** (tǎngruò) is literary, **假设** (jiǎshè) academic: 假设这个理论是对的… (jiǎshè zhège lǐlùn shì duì de) = suppose this theory is correct…
- **要不是** (yàobúshì) imagines the world without something that really happened: 要不是你提醒我，我就忘了 (yàobúshì nǐ tíxǐng wǒ, wǒ jiù wàng le) = if you hadn't reminded me, I'd have forgotten

**Pitfall:** 要不是 is not simply 如果不是. It is counterfactual: the condition really did occur in real life, and the sentence serves either to thank or to reproach. Memorise the block 要不是 + [real event]，我早就... with 早就 (zǎojiù), which anchors the imagined result in the past.`,
    objectives: [`Classer 要是, 如果, 假如 et 若 par registre`, `Employer 若 dans un email professionnel`, `Poser une hypothèse d'étude avec 假设`, `Construire un contrefactuel avec 要不是 et 早就`],
    objectivesEn: [`Rank 要是, 如果, 假如 and 若 by register`, `Use 若 in a professional email`, `Set up a working hypothesis with 假设`, `Build a counterfactual with 要不是 and 早就`],
    flashcards: [`假如`, `若`, `倘若`, `假设`, `要不是`, `早就`, `迟到`],
  },
  "cecr-b22-nuances-m8": {
    title: `也 caché — mots figés et adoucissement`, titleEn: `Hidden 也 — fixed expressions and softening`,
    duration: 12,
    category: `grammar`,
    difficulty: `intermediate`,
    introTitle: `也 adoucit, 也好 accepte, 再也不 jure`,
    introTitleEn: `也 softens, 也好 accepts, 再也不 swears`,
    introContent: `Au-delà de « aussi », 也 est surtout un amortisseur de ton.

- **也** glissé dans un avis le rend moins tranché : 我觉得这样做也不太好 (wǒ juéde zhèyàng zuò yě bú tài hǎo) = je trouve que faire comme ça, c'est pas top
- **也是** (yěshì) en réponse courte = « c'est vrai, tu marques un point » : 你说得也是 (nǐ shuō de yěshì) = ce que tu dis est juste aussi
- **也好...也好** accepte toutes les options : 去也好，不去也好，你自己决定 (qù yěhǎo, bú qù yěhǎo, nǐ zìjǐ juédìng) = que tu y ailles ou non, c'est toi qui décides
- **也许** (yěxǔ) = peut-être et **也就是说** (yějiùshìshuō) = autrement dit sont deux blocs figés, à ne pas décomposer

**Piège :** la vraie erreur, c'est de confondre 不再 et 再也不. 他不再抽烟了 (tā bú zài chōuyān le) est un constat calme, « il ne fume plus » ; 他再也不抽烟了 sonne comme un serment, « il ne fumera plus jamais ». Pour un fait passé, la forme est 再也没 + verbe + 过 : 从那天起，他再也没来过 (cóng nà tiān qǐ, tā zài yě méi lái guò) = depuis ce jour, il n'est plus jamais revenu. Choisis selon le ton visé, factuel ou solennel.`,
    introContentEn: `Beyond "also", 也 is above all a tone cushion.

- **也** slipped into an opinion makes it less blunt: 我觉得这样做也不太好 (wǒ juéde zhèyàng zuò yě bú tài hǎo) = I don't think doing it that way is great
- **也是** (yěshì) as a short reply = "true, you have a point": 你说得也是 (nǐ shuō de yěshì) = what you say is fair enough
- **也好...也好** accepts every option: 去也好，不去也好，你自己决定 (qù yěhǎo, bú qù yěhǎo, nǐ zìjǐ juédìng) = go or don't go, it's your call
- **也许** (yěxǔ) = maybe and **也就是说** (yějiùshìshuō) = in other words are two fixed blocks, not to be taken apart

**Pitfall:** the real mistake is confusing 不再 with 再也不. 他不再抽烟了 (tā bú zài chōuyān le) is a calm statement, "he doesn't smoke any more"; 他再也不抽烟了 sounds like an oath, "he will never smoke again". For a past fact the form is 再也没 + verb + 过: 从那天起，他再也没来过 (cóng nà tiān qǐ, tā zài yě méi lái guò) = from that day on, he never came back. Choose according to the tone you want, factual or solemn.`,
    objectives: [`Adoucir un avis en glissant 也`, `Concéder un point avec 也是`, `Accepter deux options avec 也好...也好`, `Distinguer 不再 (neutre) de 再也不 (serment)`],
    objectivesEn: [`Soften an opinion by slipping in 也`, `Concede a point with 也是`, `Accept either option with 也好...也好`, `Tell neutral 不再 from emphatic 再也不`],
    flashcards: [`也`, `也是`, `也好`, `也罢`, `也许`, `也就是说`, `再也不`, `不再`],
  },
  "cecr-b22-nuances-m9": {
    title: `Comparaisons avancées — 相比, 不如, 不比, 于`, titleEn: `Advanced comparisons — 相比, 不如, 不比, 于`,
    duration: 16,
    category: `grammar`,
    difficulty: `intermediate`,
    introTitle: `没有 constate, 不如 juge, 不比 dément`,
    introTitleEn: `没有 states, 不如 judges, 不比 denies`,
    introContent: `Trois « moins que » qui ne disent pas la même chose, plus les formules pour cadrer et pour esquiver.

- **跟...相比** cadre une observation neutre : 跟去年相比，今年的生意好多了 (gēn qùnián xiāngbǐ, jīnnián de shēngyi hǎo duō le) = par rapport à l'an dernier, les affaires vont bien mieux
- **没有** (méiyǒu) constate un fait : 这间房没有那间大 (zhèjiān fáng méiyǒu nàjiān dà) = cette pièce est moins grande
- **不如** (bùrú) porte un jugement : 我做饭不如妈妈 (wǒ zuòfàn bùrú māma) = ma cuisine n'arrive pas à la cheville de celle de maman
- **不比** (bùbǐ) dément une supposition : 我不比她高 (wǒ bù bǐ tā gāo) = je ne suis pas plus grand qu'elle

**Piège :** 我不比她高 ne veut pas dire « je suis plus petit qu'elle » — c'est un démenti, et l'égalité reste possible. Pour dire « ce resto est moins cher », il faut 这家没有那家贵 ou 这家比那家便宜. Ajoute à ton oral les blocs 比不上, 比不过, 没法比 et 差远了 (chàyuǎnle), la réponse modeste type à un compliment. À l'écrit formel, les composés en 于 comme 高于 et 优于 remplacent 比, tandis que le pattern 比 N 还 N reste réservé à la taquinerie : 他比老板还老板.`,
    introContentEn: `Three ways to say "less than" that don't mean the same thing, plus the phrases for framing and for deflecting.

- **跟...相比** frames a neutral observation: 跟去年相比，今年的生意好多了 (gēn qùnián xiāngbǐ, jīnnián de shēngyi hǎo duō le) = compared with last year, business is much better
- **没有** (méiyǒu) states a fact: 这间房没有那间大 (zhèjiān fáng méiyǒu nàjiān dà) = this room is smaller than that one
- **不如** (bùrú) passes judgment: 我做饭不如妈妈 (wǒ zuòfàn bùrú māma) = my cooking is nowhere near my mum's
- **不比** (bùbǐ) denies an assumption: 我不比她高 (wǒ bù bǐ tā gāo) = I'm not taller than her

**Pitfall:** 我不比她高 does not mean "I am shorter than her" — it is a denial, and being equal is still possible. To say "this restaurant is cheaper", you need 这家没有那家贵 or 这家比那家便宜. Add the spoken blocks 比不上, 比不过, 没法比 and 差远了 (chàyuǎnle), the standard modest reply to a compliment. In formal writing the 于 compounds such as 高于 and 优于 replace 比, while the 比 N 还 N pattern stays reserved for teasing: 他比老板还老板.`,
    objectives: [`Cadrer une comparaison avec 跟...相比`, `Séparer 没有 (fait), 不如 (jugement), 不比 (démenti)`, `Placer 比不上 et 差远了 par modestie`, `Lire les composés formels en 于`],
    objectivesEn: [`Frame a comparison with 跟...相比`, `Separate 没有 (fact), 不如 (judgment), 不比 (denial)`, `Use 比不上 and 差远了 to sound modest`, `Read the formal 于 compounds`],
    flashcards: [`相比`, `比起`, `不如`, `不比`, `没有`, `比不上`, `差远了`, `高于`, `优于`],
  },
};

// ── Fusion des traductions anglaises (introTitleEn / introContentEn / objectivesEn) ──
{
  const EN = LESSON_CONTENT_EN as Record<string, { introTitleEn?: string; introContentEn?: string; objectivesEn?: string[] }>;
  for (const id of Object.keys(EN)) {
    const c = LESSON_CONTENT[id];
    const e = EN[id];
    if (!c || !e) continue;
    if (e.introTitleEn) c.introTitleEn = e.introTitleEn;
    if (e.introContentEn) c.introContentEn = e.introContentEn;
    if (e.objectivesEn) c.objectivesEn = e.objectivesEn;
  }
}
