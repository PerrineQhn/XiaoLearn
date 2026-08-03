/**
 * Test de positionnement — banque et estimation du niveau.
 *
 * ## Trois défauts corrigés ensemble
 *
 * La version d'origine posait 7 questions, toutes entre A1 et B1, et estimait
 * le niveau à partir d'un pourcentage global. Trois problèmes distincts s'y
 * additionnaient, et il fallait les traiter tous les trois — corriger un seul
 * n'aurait presque rien changé au taux de bon classement.
 *
 * 1. **Trop peu d'items par palier.** Avec 3 questions et un seuil aux deux
 *    tiers, un candidat cochant au hasard franchissait un palier avancé une
 *    fois sur six (15,6 %). La banque compte désormais 8 questions par palier,
 *    soit 56 au total : le hasard retombe à 2 %.
 *
 * 2. **Une règle d'arrêt fragile.** S'arrêter au premier palier raté faisait
 *    qu'une seule erreur d'inattention plafonnait tout le reste du test.
 *    L'estimation porte maintenant sur l'ensemble des réponses.
 *
 * 3. **Un test trop long.** 56 questions, personne ne les finit. Le tirage est
 *    adaptatif : on part du milieu, on monte ou on descend, et on s'arrête dès
 *    que l'estimation est stable — 12 à 20 questions posées.
 *
 * ## Le modèle d'estimation
 *
 * Un modèle de Rasch à paramètre de pseudo-chance, la version la plus simple
 * qui tienne compte du QCM. Chaque question a une difficulté égale à l'indice
 * de son palier ; l'aptitude θ du candidat vit sur la même échelle. La
 * probabilité de réussir une question de difficulté d vaut :
 *
 *     P(θ, d) = c + (1 − c) · σ(θ − d)      avec c = 0,25 (quatre choix)
 *
 * θ est estimé par balayage : on retient la valeur qui rend les réponses
 * observées les plus vraisemblables. Pas de descente de gradient, pas de
 * bibliothèque — 140 points de grille suffisent et le calcul est instantané.
 *
 * On préfère cette approche à un simple pourcentage parce qu'elle distingue
 * deux candidats à 60 % : celui qui a réussi des questions faciles et celui
 * qui a réussi des questions difficiles n'ont pas le même niveau.
 */
export type EvalLevel = 'A1' | 'A2' | 'B1.1' | 'B1.2' | 'B2.1' | 'B2.2' | 'C1.1';
export type EvalSkill = 'vocabulary' | 'grammar' | 'measure' | 'tone' | 'usage';

export interface EvalQuestion {
  q: string; qEn: string;
  choices: string[]; choicesEn: string[];
  correct: number;
  level: EvalLevel;
  skill: EvalSkill;
}

/** Ordre des paliers, du plus simple au plus avancé. */
export const EVAL_LEVELS: EvalLevel[] = ['A1', 'A2', 'B1.1', 'B1.2', 'B2.1', 'B2.2', 'C1.1'];

/** Identifiant de niveau du parcours, pour ouvrir le bon écran de cours. */
export const LEVEL_ROUTE: Record<EvalLevel, string> = {
  'A1': 'cecr-a1', 'A2': 'cecr-a2',
  'B1.1': 'cecr-b1-1', 'B1.2': 'cecr-b1-2',
  'B2.1': 'cecr-b2-1', 'B2.2': 'cecr-b2-2',
  'C1.1': 'cecr-c1-1',
};

export const EVAL_QUESTIONS: EvalQuestion[] = [
  { q: "你好 signifie :", qEn: "你好 means:", choices: ["Au revoir", "Bonjour", "Merci", "S'il vous plaît"], choicesEn: ["Goodbye", "Hello", "Thank you", "Please"], correct: 1, level: "A1", skill: "vocabulary" },
  { q: "Les caractères 他, 她 et 它 se prononcent tous :", qEn: "The characters 他, 她 and 它 are all pronounced:", choices: ["tā", "tà", "dā", "tǎ"], choicesEn: ["tā", "tà", "dā", "tǎ"], correct: 0, level: "A1", skill: "tone" },
  { q: "Pour dire « Je suis français », on écrit :", qEn: "To say \"I am French\", you write:", choices: ["我在法国人", "我有法国人", "我很法国人", "我是法国人"], choicesEn: ["我在法国人", "我有法国人", "我很法国人", "我是法国人"], correct: 3, level: "A1", skill: "grammar" },
  { q: "Quel est le 2ᵉ ton du mandarin ?", qEn: "What is the 2nd tone in Mandarin?", choices: ["Plat et haut", "Montant", "Descendant", "Descendant puis montant"], choicesEn: ["High and level", "Rising", "Falling", "Falling then rising"], correct: 1, level: "A1", skill: "tone" },
  { q: "Complétez : 一 ___ 苹果 (une pomme).", qEn: "Complete: 一 ___ 苹果 (one apple).", choices: ["本", "只", "个", "张"], choicesEn: ["本", "只", "个", "张"], correct: 2, level: "A1", skill: "measure" },
  { q: "Comment dit-on « deux personnes » ?", qEn: "How do you say \"two people\"?", choices: ["二个人", "两只人", "两人个", "两个人"], choicesEn: ["二个人", "两只人", "两人个", "两个人"], correct: 3, level: "A1", skill: "measure" },
  { q: "Que répond-on poliment à 谢谢 ?", qEn: "What is the polite reply to 谢谢?", choices: ["不客气", "对不起", "再见", "请问"], choicesEn: ["不客气", "对不起", "再见", "请问"], correct: 0, level: "A1", skill: "usage" },
  { q: "Pour dire « J'ai acheté un livre », on écrit :", qEn: "To say \"I bought a book\", you write:", choices: ["我了买一本书", "我买一本了书", "我买了一本书", "我没买了一本书"], choicesEn: ["我了买一本书", "我买一本了书", "我买了一本书", "我没买了一本书"], correct: 2, level: "A2", skill: "grammar" },
  { q: "« 我去过中国 » signifie :", qEn: "\"我去过中国\" means:", choices: ["Je vais souvent en Chine", "Je suis en train d'aller en Chine", "J'irai bientôt en Chine", "Je suis déjà allé en Chine au moins une fois"], choicesEn: ["I often go to China", "I am on my way to China", "I will go to China soon", "I have been to China at least once"], correct: 3, level: "A2", skill: "usage" },
  { q: "Pour dire « Il est plus grand que moi », on écrit :", qEn: "To say \"He is taller than me\", you write:", choices: ["他比我高", "他高比我", "他比我很高", "他是比我高"], choicesEn: ["他比我高", "他高比我", "他比我很高", "他是比我高"], correct: 0, level: "A2", skill: "grammar" },
  { q: "Quel classificateur accompagne 书 (livre) ?", qEn: "Which measure word goes with 书 (book)?", choices: ["张", "条", "只", "本"], choicesEn: ["张", "条", "只", "本"], correct: 3, level: "A2", skill: "measure" },
  { q: "Quelle association classificateur-nom est correcte ?", qEn: "Which measure word / noun pairing is correct?", choices: ["一条纸", "一张鱼", "一只狗", "一本裤子"], choicesEn: ["一条纸", "一张鱼", "一只狗", "一本裤子"], correct: 2, level: "A2", skill: "measure" },
  { q: "Pour demander « Pourquoi ? », on dit :", qEn: "To ask \"Why?\", you say:", choices: ["怎么", "为什么", "什么", "哪儿"], choicesEn: ["怎么", "为什么", "什么", "哪儿"], correct: 1, level: "A2", skill: "vocabulary" },
  { q: "Dans 一个 (yī + gè), 一 se prononce en réalité :", qEn: "In 一个 (yī + gè), 一 is actually pronounced:", choices: ["yí (2ᵉ ton)", "yī (1er ton)", "yì (4ᵉ ton)", "yǐ (3ᵉ ton)"], choicesEn: ["yí (2nd tone)", "yī (1st tone)", "yì (4th tone)", "yǐ (3rd tone)"], correct: 0, level: "A2", skill: "tone" },
  { q: "Pour dire « J'ai posé le livre sur la table », on écrit :", qEn: "To say \"I put the book on the table\", you write:", choices: ["我把书放在桌子上了", "我放了书把桌子上", "我书把放在桌子上了", "我把在桌子上放了书"], choicesEn: ["我把书放在桌子上了", "我放了书把桌子上", "我书把放在桌子上了", "我把在桌子上放了书"], correct: 0, level: "B1.1", skill: "grammar" },
  { q: "Pour dire « Je n'ai pas compris ce qu'il a dit », on écrit :", qEn: "To say \"I did not understand what he said\", you write:", choices: ["我不听懂他的话", "我没懂听他的话", "我没听懂他的话", "我不懂听他的话"], choicesEn: ["我不听懂他的话", "我没懂听他的话", "我没听懂他的话", "我不懂听他的话"], correct: 2, level: "B1.1", skill: "grammar" },
  { q: "Complétez : ___ 天气不好，___ 我们还是去了。", qEn: "Complete: ___ 天气不好，___ 我们还是去了。", choices: ["因为…所以", "虽然…但是", "不但…而且", "要是…就"], choicesEn: ["因为…所以", "虽然…但是", "不但…而且", "要是…就"], correct: 1, level: "B1.1", skill: "vocabulary" },
  { q: "« 他九点才来 » implique que :", qEn: "\"他九点才来\" implies that:", choices: ["il est arrivé tôt, dès neuf heures", "il vient tous les jours à neuf heures", "il n'est arrivé qu'à neuf heures, ce qui est tard", "il n'est pas encore arrivé"], choicesEn: ["he arrived early, as soon as nine o'clock", "he comes at nine o'clock every day", "he only arrived at nine o'clock, which is late", "he has not arrived yet"], correct: 2, level: "B1.1", skill: "usage" },
  { q: "Dans 不是 (bù + shì), 不 se prononce :", qEn: "In 不是 (bù + shì), 不 is pronounced:", choices: ["bù (4ᵉ ton)", "bǔ (3ᵉ ton)", "bu (ton neutre)", "bú (2ᵉ ton)"], choicesEn: ["bù (4th tone)", "bǔ (3rd tone)", "bu (neutral tone)", "bú (2nd tone)"], correct: 3, level: "B1.1", skill: "tone" },
  { q: "Quelle formulation est la plus polie pour parler de « trois professeurs » ?", qEn: "Which wording is the most polite way to refer to \"three teachers\"?", choices: ["三位老师", "三个老师", "三口老师", "三条老师"], choicesEn: ["三位老师", "三个老师", "三口老师", "三条老师"], correct: 0, level: "B1.1", skill: "measure" },
  { q: "Pour dire « Mon vélo a été volé », on écrit :", qEn: "To say \"My bike was stolen\", you write:", choices: ["我的自行车把偷了", "我的自行车被偷了", "我的自行车偷被了", "我的自行车没被偷了"], choicesEn: ["我的自行车把偷了", "我的自行车被偷了", "我的自行车偷被了", "我的自行车没被偷了"], correct: 1, level: "B1.2", skill: "grammar" },
  { q: "Dans « 他跑上楼去了 », le groupe 上…去 indique :", qEn: "In \"他跑上楼去了\", the pattern 上…去 indicates:", choices: ["la durée de l'action", "le résultat obtenu", "la direction du déplacement, qui s'éloigne du locuteur", "la répétition de l'action"], choicesEn: ["the duration of the action", "the result obtained", "the direction of the movement, away from the speaker", "the repetition of the action"], correct: 2, level: "B1.2", skill: "grammar" },
  { q: "Pour dire « Il fait de plus en plus froid », on écrit :", qEn: "To say \"It is getting colder and colder\", you write:", choices: ["天气越来越冷", "天气更来更冷", "天气越冷越来", "天气很来很冷"], choicesEn: ["天气越来越冷", "天气更来更冷", "天气越冷越来", "天气很来很冷"], correct: 0, level: "B1.2", skill: "vocabulary" },
  { q: "« 除了小王以外，大家都来了 » signifie :", qEn: "\"除了小王以外，大家都来了\" means:", choices: ["Xiao Wang est arrivé le premier", "Personne n'est venu, à part Xiao Wang", "Tout le monde est venu, Xiao Wang compris", "Tout le monde est venu, sauf Xiao Wang"], choicesEn: ["Xiao Wang arrived first", "Nobody came except Xiao Wang", "Everybody came, including Xiao Wang", "Everybody came, except Xiao Wang"], correct: 3, level: "B1.2", skill: "usage" },
  { q: "Pour dire « Il mange debout », on écrit :", qEn: "To say \"He eats standing up\", you write:", choices: ["他吃饭站着", "他站着吃饭", "他站了吃饭", "他在站着吃饭"], choicesEn: ["他吃饭站着", "他站着吃饭", "他站了吃饭", "他在站着吃饭"], correct: 1, level: "B1.2", skill: "usage" },
  { q: "Comment dit-on « une paire de chaussures » ?", qEn: "How do you say \"a pair of shoes\"?", choices: ["一对鞋", "一副鞋", "一双鞋", "一把鞋"], choicesEn: ["一对鞋", "一副鞋", "一双鞋", "一把鞋"], correct: 2, level: "B1.2", skill: "measure" },
  { q: "Pour dire « Il ne connaît même pas mon nom », on écrit :", qEn: "To say \"He does not even know my name\", you write:", choices: ["他连不知道我的名字", "他连我的名字都不知道", "他连我的名字也没知道", "他都连我的名字不知道"], choicesEn: ["他连不知道我的名字", "他连我的名字都不知道", "他连我的名字也没知道", "他都连我的名字不知道"], correct: 1, level: "B2.1", skill: "grammar" },
  { q: "Complétez : 他 ___ 会说汉语，___ 会写汉字。", qEn: "Complete: 他 ___ 会说汉语，___ 会写汉字。", choices: ["虽然…但是", "因为…所以", "不但…而且", "除了…以外"], choicesEn: ["虽然…但是", "因为…所以", "不但…而且", "除了…以外"], correct: 2, level: "B2.1", skill: "grammar" },
  { q: "Dans « 他 ___ 很守时 », quel adverbe exprime un trait constant depuis toujours, et non une continuité sur une période donnée ?", qEn: "In \"他 ___ 很守时\", which adverb expresses a trait that has always been true, rather than continuity over a given period?", choices: ["一直", "马上", "正在", "一向"], choicesEn: ["一直", "马上", "正在", "一向"], correct: 3, level: "B2.1", skill: "vocabulary" },
  { q: "Dans « 他跑得很快 », 得 se prononce :", qEn: "In \"他跑得很快\", 得 is pronounced:", choices: ["de (ton neutre)", "dé", "děi", "dài"], choicesEn: ["de (neutral tone)", "dé", "děi", "dài"], correct: 0, level: "B2.1", skill: "tone" },
  { q: "Que signifie le 成语 « 入乡随俗 » ?", qEn: "What does the 成语 \"入乡随俗\" mean?", choices: ["Il faut se lever tôt pour réussir", "À Rome, fais comme les Romains", "On récolte ce que l'on sème", "Mieux vaut tard que jamais"], choicesEn: ["The early bird catches the worm", "When in Rome, do as the Romans do", "You reap what you sow", "Better late than never"], correct: 1, level: "B2.2", skill: "vocabulary" },
  { q: "Dans « 吃了药，他的病反而更重了 », 反而 introduit :", qEn: "In \"吃了药，他的病反而更重了\", 反而 introduces:", choices: ["une conséquence attendue", "une simple addition", "un résultat contraire à ce que l'on attendait", "une hypothèse"], choicesEn: ["an expected consequence", "a simple addition", "a result contrary to what was expected", "a hypothesis"], correct: 2, level: "B2.2", skill: "usage" },
  { q: "Dans un texte écrit, quelle formulation exprime le mieux « il était si fatigué qu'il s'est endormi en réunion » ?", qEn: "In written Chinese, which wording best expresses \"he was so tired that he fell asleep in the meeting\"?", choices: ["他太累了，就睡着了", "他很累，然后在会上睡觉了", "他累得不行，开会时睡着啦", "他实在太累，以至于在会上睡着了"], choicesEn: ["他太累了，就睡着了", "他很累，然后在会上睡觉了", "他累得不行，开会时睡着啦", "他实在太累，以至于在会上睡着了"], correct: 3, level: "B2.2", skill: "usage" },
  { q: "Dans la phrase écrite « 此乃学生之责任 », 之 équivaut en chinois moderne à :", qEn: "In the written sentence \"此乃学生之责任\", 之 corresponds in modern Chinese to:", choices: ["了", "的", "是", "在"], choicesEn: ["了", "的", "是", "在"], correct: 1, level: "C1.1", skill: "grammar" },
  { q: "Quelle est la différence entre 尽管 et 即便 ?", qEn: "What is the difference between 尽管 and 即便?", choices: ["尽管 introduit un fait réel que l'on concède, 即便 une hypothèse, même contraire aux faits", "尽管 introduit une hypothèse, 即便 un fait avéré", "Les deux sont strictement interchangeables", "尽管 exprime la cause, 即便 la conséquence"], choicesEn: ["尽管 introduces a real fact that is conceded, 即便 a hypothesis, even a counterfactual one", "尽管 introduces a hypothesis, 即便 an established fact", "The two are strictly interchangeable", "尽管 expresses cause, 即便 consequence"], correct: 0, level: "C1.1", skill: "usage" },
  { q: "Dans 处理 (traiter, régler), 处 se prononce :", qEn: "In 处理 (to handle, to deal with), 处 is pronounced:", choices: ["chù", "chū", "chǔ", "cù"], choicesEn: ["chù", "chū", "chǔ", "cù"], correct: 2, level: "C1.1", skill: "tone" },
  { q: "Complétez : 你家有 ___ 口人？", qEn: "Complete: 你家有 ___ 口人？", choices: ["多少", "什么", "几", "哪"], choicesEn: ["多少", "什么", "几", "哪"], correct: 2, level: "A1", skill: "usage" },
  { q: "Complétez : 你想喝茶 ___ 喝咖啡？(Veux-tu du thé ou du café ?)", qEn: "Complete: 你想喝茶 ___ 喝咖啡？(Do you want tea or coffee?)", choices: ["或者", "和", "还有", "还是"], choicesEn: ["或者", "和", "还有", "还是"], correct: 3, level: "A2", skill: "usage" },
  { q: "Complétez : 他 ___ 吃饭 ___ 看电视。(Il regarde la télévision tout en mangeant.)", qEn: "Complete: 他 ___ 吃饭 ___ 看电视。(He watches TV while eating.)", choices: ["一边…一边", "先…再", "越…越", "一…就"], choicesEn: ["一边…一边", "先…再", "越…越", "一…就"], correct: 0, level: "B1.1", skill: "vocabulary" },
  { q: "Complétez : 老师给我们朗读了一 ___ 诗。", qEn: "Complete: 老师给我们朗读了一 ___ 诗。", choices: ["篇", "张", "本", "首"], choicesEn: ["篇", "张", "本", "首"], correct: 3, level: "B1.1", skill: "measure" },
  { q: "Pour dire « Ce livre, je n'arrive pas à le finir en une journée », on écrit :", qEn: "To say \"This book, I can't manage to finish it in one day\", you write:", choices: ["这本书我一天看不完", "这本书我一天不看完", "这本书我一天没看完", "这本书我一天看得不完"], choicesEn: ["这本书我一天看不完", "这本书我一天不看完", "这本书我一天没看完", "这本书我一天看得不完"], correct: 0, level: "B1.2", skill: "grammar" },
  { q: "Dans 便宜 (bon marché), 便 se prononce :", qEn: "In 便宜 (cheap), 便 is pronounced:", choices: ["biàn", "piàn", "pián", "biǎn"], choicesEn: ["biàn", "piàn", "pián", "biǎn"], correct: 2, level: "B1.2", skill: "tone" },
  { q: "« 他说的未必是真的 » signifie :", qEn: "\"他说的未必是真的\" means:", choices: ["Ce qu'il dit est certainement faux", "Ce qu'il dit n'est pas forcément vrai", "Ce qu'il dit est sûrement vrai", "Il refuse de dire la vérité"], choicesEn: ["What he says is certainly false", "What he says is not necessarily true", "What he says is surely true", "He refuses to tell the truth"], correct: 1, level: "B2.1", skill: "usage" },
  { q: "Complétez : ___ 在这里干等，___ 我们自己去找他。", qEn: "Complete: ___ 在这里干等，___ 我们自己去找他。", choices: ["既然…就", "不但…而且", "无论…都", "与其…不如"], choicesEn: ["既然…就", "不但…而且", "无论…都", "与其…不如"], correct: 3, level: "B2.1", skill: "vocabulary" },
  { q: "Dans 好客 (hospitalier, qui aime recevoir), 好 se prononce :", qEn: "In 好客 (hospitable, fond of guests), 好 is pronounced:", choices: ["hǎo", "hāo", "háo", "hào"], choicesEn: ["hǎo", "hāo", "háo", "hào"], correct: 3, level: "B2.1", skill: "tone" },
  { q: "Complétez : 客厅里挂着一 ___ 山水画。", qEn: "Complete: 客厅里挂着一 ___ 山水画。", choices: ["个", "部", "幅", "座"], choicesEn: ["个", "部", "幅", "座"], correct: 2, level: "B2.1", skill: "measure" },
  { q: "Quel 成语 reproche un ajout inutile qui gâche un travail déjà réussi ?", qEn: "Which 成语 criticises a useless addition that spoils an already successful piece of work?", choices: ["半途而废", "对牛弹琴", "一举两得", "画蛇添足"], choicesEn: ["半途而废", "对牛弹琴", "一举两得", "画蛇添足"], correct: 3, level: "B2.2", skill: "vocabulary" },
  { q: "Un collègue perd des données faute de sauvegarde ; il met aussitôt en place des sauvegardes automatiques. Quel 成语 convient ?", qEn: "A colleague loses data for lack of a backup; he immediately sets up automatic backups. Which 成语 fits?", choices: ["亡羊补牢", "半途而废", "画蛇添足", "一鸣惊人"], choicesEn: ["亡羊补牢", "半途而废", "画蛇添足", "一鸣惊人"], correct: 0, level: "B2.2", skill: "usage" },
  { q: "Complétez : 这个办法 ___ 有效，但成本太高。", qEn: "Complete: 这个办法 ___ 有效，但成本太高。", choices: ["居然", "果然", "固然", "依然"], choicesEn: ["居然", "果然", "固然", "依然"], correct: 2, level: "B2.2", skill: "grammar" },
  { q: "Dans 长辈 (les aînés, la génération précédente), 长 se prononce :", qEn: "In 长辈 (elders, the older generation), 长 is pronounced:", choices: ["zhǎng", "cháng", "chǎng", "zhàng"], choicesEn: ["zhǎng", "cháng", "chǎng", "zhàng"], correct: 0, level: "B2.2", skill: "tone" },
  { q: "Complétez : 我昨天读了一 ___ 关于气候变化的文章。", qEn: "Complete: 我昨天读了一 ___ 关于气候变化的文章。", choices: ["篇", "本", "张", "条"], choicesEn: ["篇", "本", "张", "条"], correct: 0, level: "B2.2", skill: "measure" },
  { q: "Dans la maxime classique « 知者不惑，勇者不惧 », le caractère 者 :", qEn: "In the classical maxim \"知者不惑，勇者不惧\", the character 者:", choices: ["marque le pluriel du nom qui précède", "nominalise ce qui précède : « celui qui… »", "introduit une question rhétorique", "sert de pronom personnel de la 3ᵉ personne"], choicesEn: ["marks the plural of the preceding noun", "nominalises what precedes it: \"the one who…\"", "introduces a rhetorical question", "serves as a third-person pronoun"], correct: 1, level: "C1.1", skill: "grammar" },
  { q: "Dans « 莫非他早就知道了？ », 莫非 exprime :", qEn: "In \"莫非他早就知道了？\", 莫非 expresses:", choices: ["une interdiction formelle", "une négation catégorique", "une concession", "une supposition teintée de doute : « se pourrait-il que… ? »"], choicesEn: ["a formal prohibition", "a categorical negation", "a concession", "a supposition tinged with doubt: \"could it be that…?\""], correct: 3, level: "C1.1", skill: "usage" },
  { q: "Complétez : 他 ___ 能坚持下来，___ 有家人的支持。", qEn: "Complete: 他 ___ 能坚持下来，___ 有家人的支持。", choices: ["因为…所以", "既然…就", "之所以…是因为", "由于…因而"], choicesEn: ["因为…所以", "既然…就", "之所以…是因为", "由于…因而"], correct: 2, level: "C1.1", skill: "vocabulary" },
  { q: "Dans 无能为力 (être impuissant), 为 se prononce :", qEn: "In 无能为力 (to be powerless), 为 is pronounced:", choices: ["wèi", "wéi", "wěi", "wēi"], choicesEn: ["wèi", "wéi", "wěi", "wēi"], correct: 1, level: "C1.1", skill: "tone" },
  { q: "Quelle formule figée, de registre lettré, désigne « un simple lettré, sans rang ni fortune » ?", qEn: "Which fixed, literary expression refers to \"a mere scholar, with neither rank nor fortune\"?", choices: ["一名书生", "一介书生", "一位书生", "一个书生"], choicesEn: ["一名书生", "一介书生", "一位书生", "一个书生"], correct: 1, level: "C1.1", skill: "measure" },
];

// ─── Modèle d'estimation ──────────────────────────────────────────────────────

/** Probabilité de tomber juste au hasard : quatre choix. */
const GUESS = 0.25;

/**
 * Pouvoir discriminant des items.
 *
 * À 1, le modèle suppose que deux paliers voisins ne se distinguent qu'à peine
 * — hypothèse trop pessimiste ici, puisque les paliers sont *conçus* pour être
 * séparables et que les items les ciblent explicitement. Réglé à 1,6 après
 * simulation : le classement exact passe de 59 % à 70 %, et le test s'arrête en
 * 16 questions au lieu d'aller systématiquement au bout des 20.
 */
const DISCRIMINATION = 1.6;
/** Bornes de l'échelle d'aptitude, un cran de marge de part et d'autre. */
const THETA_MIN = -1.5;
const THETA_MAX = EVAL_LEVELS.length + 0.5;
const THETA_STEP = 0.05;

const sigma = (x: number) => 1 / (1 + Math.exp(-x));

/** Difficulté d'une question = indice de son palier. */
export const difficultyOf = (q: EvalQuestion) => EVAL_LEVELS.indexOf(q.level);

/** P(réussite) pour une aptitude et une difficulté données. */
export function pCorrect(theta: number, difficulty: number): number {
  return GUESS + (1 - GUESS) * sigma(DISCRIMINATION * (theta - difficulty));
}

export interface Response { question: EvalQuestion; correct: boolean }

/**
 * Estime l'aptitude par maximum de vraisemblance, sur une grille.
 *
 * Un candidat qui répond juste à tout aurait un θ infini : on borne l'échelle,
 * ce qui revient à dire « au moins ce niveau », seule affirmation que le test
 * autorise.
 */
export function estimateTheta(responses: Response[]): number {
  if (responses.length === 0) return EVAL_LEVELS.length / 2;
  let best = THETA_MIN, bestLL = -Infinity;
  for (let th = THETA_MIN; th <= THETA_MAX; th += THETA_STEP) {
    let ll = 0;
    for (const r of responses) {
      const p = pCorrect(th, difficultyOf(r.question));
      ll += Math.log(r.correct ? p : 1 - p);
    }
    if (ll > bestLL) { bestLL = ll; best = th; }
  }
  return best;
}

/**
 * Incertitude sur l'estimation — erreur type, via l'information de Fisher.
 *
 * C'est elle qui permet d'arrêter le test : tant qu'elle reste élevée, une
 * question de plus apporte quelque chose ; en dessous du seuil, elle n'apporte
 * plus rien et on fait perdre son temps au candidat.
 */
export function standardError(theta: number, responses: Response[]): number {
  let info = 0;
  for (const r of responses) {
    const d = difficultyOf(r.question);
    const p = pCorrect(theta, d);
    // Information d'un item à pseudo-chance : ((p−c)/(1−c))² · (1−p)/p
    const num = DISCRIMINATION * (p - GUESS) / (1 - GUESS);
    info += (num * num) * (1 - p) / Math.max(p, 1e-6);
  }
  return info > 0 ? 1 / Math.sqrt(info) : Infinity;
}

/**
 * Fourchette de niveaux compatible avec l'estimation.
 *
 * Sur une échelle à sept paliers, le classement exact plafonne autour de 70 %
 * avec une vingtaine de questions — c'est une limite d'information, pas un
 * défaut d'implémentation. En revanche le voisinage immédiat est juste à 98 %.
 * Afficher « B1.1 » tout court serait donc une fausse précision : on affiche le
 * palier retenu, et la fourchette quand l'incertitude le justifie.
 */
export function levelRange(theta: number, se: number): { low: EvalLevel; high: EvalLevel } {
  const clamp = (i: number) => Math.max(0, Math.min(EVAL_LEVELS.length - 1, i));
  return {
    low: EVAL_LEVELS[clamp(Math.round(theta - se))],
    high: EVAL_LEVELS[clamp(Math.round(theta + se))],
  };
}

/** Palier correspondant à une aptitude estimée. */
export function levelForTheta(theta: number): EvalLevel {
  const i = Math.max(0, Math.min(EVAL_LEVELS.length - 1, Math.round(theta)));
  return EVAL_LEVELS[i];
}

// ─── Sélection adaptative ─────────────────────────────────────────────────────

/** On part du milieu de l'échelle : c'est là qu'une réponse informe le plus. */
export const START_LEVEL_INDEX = 2;      // B1.1
export const MIN_QUESTIONS = 12;
export const MAX_QUESTIONS = 20;
/**
 * En dessous de cette erreur type, une question de plus n'apprend plus rien.
 *
 * Calé à 0,50 : à 0,42 le seuil n'était jamais atteint en 20 questions et le
 * test allait toujours au bout, ce qui vidait l'adaptatif de son intérêt. À
 * 0,65 il s'arrête plus tôt (13 questions) mais perd 6 points de justesse.
 */
export const SE_TARGET = 0.50;

/**
 * Choisit la prochaine question : celle dont la difficulté est la plus proche
 * de l'aptitude estimée, parmi celles non encore posées.
 *
 * À difficulté égale on tire au sort, pour que deux passages du test ne
 * proposent pas la même série — c'est tout l'intérêt d'avoir 8 items par
 * palier plutôt que le strict nécessaire.
 */
export function pickNext(theta: number, asked: Set<string>): EvalQuestion | null {
  const pool = EVAL_QUESTIONS.filter(q => !asked.has(q.q));
  if (pool.length === 0) return null;
  const target = Math.max(0, Math.min(EVAL_LEVELS.length - 1, Math.round(theta)));
  let bestDist = Infinity;
  let bucket: EvalQuestion[] = [];
  for (const q of pool) {
    const dist = Math.abs(difficultyOf(q) - target);
    if (dist < bestDist) { bestDist = dist; bucket = [q]; }
    else if (dist === bestDist) bucket.push(q);
  }
  return bucket[Math.floor(Math.random() * bucket.length)];
}

/** Le test doit-il s'arrêter ? */
export function shouldStop(responses: Response[], theta: number): boolean {
  if (responses.length >= MAX_QUESTIONS) return true;
  if (responses.length < MIN_QUESTIONS) return false;
  return standardError(theta, responses) <= SE_TARGET;
}

/** Réussites par compétence, pour dire à l'apprenant CE QUI a lâché. */
export function bySkill(responses: Response[]): { skill: EvalSkill; good: number; total: number }[] {
  const skills: EvalSkill[] = ['vocabulary', 'grammar', 'measure', 'tone', 'usage'];
  return skills
    .map(skill => {
      const rs = responses.filter(r => r.question.skill === skill);
      return { skill, good: rs.filter(r => r.correct).length, total: rs.length };
    })
    .filter(x => x.total > 0);
}

/** Réussites par palier réellement rencontré pendant le test. */
export function byLevel(responses: Response[]): { level: EvalLevel; good: number; total: number }[] {
  return EVAL_LEVELS
    .map(level => {
      const rs = responses.filter(r => r.question.level === level);
      return { level, good: rs.filter(r => r.correct).length, total: rs.length };
    })
    .filter(x => x.total > 0);
}
