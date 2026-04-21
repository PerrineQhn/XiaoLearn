import type { LessonCategory, LessonModule, LessonPath } from '../types/lesson-structure';

type Level2LessonSeed = {
  id: string;
  title: string;
  titleEn: string;
  duration: number;
  category: LessonCategory;
  tags: string[];
  focusFr: string[];
  focusEn: string[];
  flashcards: string[];
  quizQuestions?: number;
};

const hasHanzi = (value: string) => /[\u3400-\u9fff]/.test(value);

const pickHanzi = (items: string[]) => items.filter((s) => hasHanzi(s));

const formatList = (items: string[], max = 4) =>
  items
    .filter(Boolean)
    .slice(0, max)
    .join(', ');

const buildQuickIntroFr = (seed: Level2LessonSeed): string => {
  const hanzi = pickHanzi(seed.focusFr);
  const tokens = formatList(hanzi.length ? hanzi : seed.focusFr, seed.category === 'vocabulary' ? 6 : 4);

  switch (seed.category) {
    case 'conversation':
      return `Apprenez à ${seed.title.toLowerCase()} : ${formatList(seed.focusFr, 4)}.`;
    case 'vocabulary':
      return tokens ? `Apprenez le vocabulaire de la leçon : ${tokens}.` : `Apprenez le vocabulaire : ${seed.title.toLowerCase()}.`;
    case 'grammar':
    default:
      return tokens
        ? `Apprenez à utiliser ${tokens} pour ${seed.title.toLowerCase()}.`
        : `Apprenez à maîtriser ${seed.title.toLowerCase()}.`;
  }
};

const buildQuickIntroEn = (seed: Level2LessonSeed): string => {
  const hanzi = pickHanzi(seed.focusEn);
  const tokens = formatList(hanzi.length ? hanzi : seed.focusEn, seed.category === 'vocabulary' ? 6 : 4);

  switch (seed.category) {
    case 'conversation':
      return `Learn to ${seed.titleEn.toLowerCase()}: ${formatList(seed.focusEn, 4)}.`;
    case 'vocabulary':
      return tokens ? `Learn the key words: ${tokens}.` : `Learn vocabulary: ${seed.titleEn.toLowerCase()}.`;
    case 'grammar':
    default:
      return tokens
        ? `Learn to use ${tokens} for ${seed.titleEn.toLowerCase()}.`
        : `Learn ${seed.titleEn.toLowerCase()}.`;
  }
};

const buildLessonIntroFr = (seed: Level2LessonSeed): string => {
  const hanzi = pickHanzi(seed.focusFr);
  const tokens = formatList(hanzi.length ? hanzi : seed.focusFr, 8);

  // --- Grammaire ---
  if (seed.tags.includes('future')) {
    return `Aujourd'hui, on va apprendre à parler du futur en mandarin — sans conjugaison, mais avec des marqueurs très fréquents.
\n\nEn chinois, on n'invente pas une “forme du futur”. On exprime surtout l'intention, la probabilité, ou le plan.
\n\n## 1) Les mots-clés à connaître
- 会 : probabilité / “il va probablement…”
- 要 : intention forte / “je vais…”
- 打算 : plan / intention réfléchie
- 明天 / 以后 : repères temporels (demain / plus tard)
\n\n## 2) Comment les utiliser (niveau 2)
- 明天我会去。Demain, j'irai (probablement).
- 我以后要学更多中文。Plus tard, je vais apprendre plus de chinois.
- 我打算周末休息。Je compte me reposer ce week-end.
\n\n## 3) Ce qu'on retient
- 会 = plutôt “ça va arriver / c'est probable”
- 要 = “je vais / je dois” (intention forte)
- 打算 = “je prévois de…”
\n\nÀ la fin de la leçon, vous saurez choisir le bon marqueur pour exprimer vos plans et vos intentions.`;
  }

  if (seed.tags.includes('particle')) {
    return `Aujourd'hui, on introduit deux outils très importants pour rendre vos phrases plus naturelles : 把 et 给.
\n\n## 1) Pourquoi c'est utile ?
Quand on commence, on parle souvent avec des phrases “SVO” très simples. 把 permet de mettre l'objet en avant et de décrire ce qu'on en fait.
\n\n## 2) 把 : mettre l'objet avant l'action
Structure (niveau 2) :
- 把 + objet + verbe + complément / résultat
Exemples :
- 我把书放在桌子上。Je mets le livre sur la table.
- 他把门关上了。Il a fermé la porte.
\n\n## 3) 给 : donner / pour quelqu'un
- 我给你水。Je te donne de l'eau.
- 给我一个。Donnez-m'en un.
\n\nRésumé :
- 把 : “je prends l'objet et je fais quelque chose avec”
- 给 : “donner” ou “pour / à quelqu'un”
\n\nObjectif : commencer à construire des phrases plus proches du mandarin naturel.`;
  }

  if (seed.tags.includes('connectors')) {
    return `Aujourd'hui, on va apprendre à enchaîner des idées : “et”, “puis”, “donc”, “alors”.
\n\nSans connecteurs, on parle en phrases courtes séparées. Avec 和 / 然后 / 所以, on peut raconter une action de manière fluide.
\n\n## 1) Les connecteurs essentiels
- 和 : et (relie souvent des noms ou des groupes)
- 然后 : et puis / ensuite
- 所以 : donc / c'est pourquoi
- 于是 : alors (souvent “résultat logique / action qui suit”)
\n\n## 2) Exemples
- 我喝咖啡和茶。Je bois du café et du thé.
- 我回家，然后做饭。Je rentre, puis je cuisine.
- 下雨了，所以我不去。Il pleut, donc je n'y vais pas.
\n\n## 3) Ce qu'on retient
- 和 relie, 然后 ordonne, 所以 explique la conséquence.
\n\nObjectif : savoir relier vos phrases pour parler de façon plus naturelle.`;
  }

  if (seed.tags.includes('contrast')) {
    return `Aujourd'hui, on apprend à exprimer l'opposition : “mais / cependant”.
\n\n## 1) Les trois mots les plus utiles
- 但是 : mais (standard)
- 可是 : mais (souvent un peu plus “conversation”)
- 不过 : cependant / ceci dit (nuance)
\n\n## 2) Exemples
- 我想去，但是我没时间。Je veux y aller, mais je n'ai pas le temps.
- 这个很好，可是太贵了。C'est bien, mais c'est trop cher.
- 不过，我们可以明天去。Cela dit, on peut y aller demain.
\n\n## 3) Astuce
On place souvent ces mots au début de la 2e proposition.
\n\nObjectif : nuancer, corriger, et opposer deux idées sans “bloquer” la phrase.`;
  }

  if (seed.tags.includes('progressive')) {
    return `Aujourd'hui, on apprend à dire “être en train de…” et à rendre une phrase vivante.
\n\n## 1) Les marqueurs
- 在 / 正在 : action en cours (progressif)
- 呢 : particule très fréquente pour indiquer une action en cours (ou un contexte “en ce moment”)
\n\n## 2) Exemples
- 我在学习中文。Je suis en train d'étudier le chinois.
- 他正在做饭呢。Il est en train de cuisiner.
- 你在干什么呢？Tu fais quoi (là) ?
\n\n## 3) Ce qu'on retient
- 在 / 正在 = marqueur principal
- 呢 = rend l'oral plus naturel et “présent”
\n\nObjectif : décrire ce que vous faites maintenant, et comprendre ce que vous entendez dans des dialogues simples.`;
  }

  if (seed.tags.includes('addition') && seed.focusFr.includes('也')) {
    return `Aujourd'hui, on apprend à dire “aussi / également” avec 也 (et à le placer correctement dans la phrase).
\n\n## 1) Où placer 也 ?
En général, 也 se place avant le verbe ou l'adjectif qu'il modifie.
\n\n## 2) Exemples
- 我也喜欢咖啡。Moi aussi, j'aime le café.
- 他也很好。Lui aussi, il est très bien.
\n\n## 3) Bonus : 都 (souvent avec “tous”)
- 我们都去。Nous y allons tous.
\n\nObjectif : pouvoir ajouter une information (“moi aussi”) sans changer toute la structure de la phrase.`;
  }

  if (seed.tags.includes('addition') && seed.focusFr.includes('还')) {
    return `Aujourd'hui, on continue “aussi / également” avec 还, un mot très courant qui peut signifier “encore” et parfois “aussi”.
\n\n## 1) 还 = encore / toujours
- 我还想要一个。J'en veux encore un.
- 他还在家。Il est encore à la maison.
\n\n## 2) 还 et la logique “en plus”
Dans certains contextes, 还 peut s'entendre comme “en plus / également”.
\n\n## 3) Exemples
- 我还想学汉字。En plus, je veux apprendre les caractères.
- 另外… : “par ailleurs / en plus” (utile pour structurer un discours)
\n\nObjectif : reconnaître 还 dans ses usages fréquents et l'utiliser pour enrichir vos phrases.`;
  }

  if (seed.tags.includes('restriction')) {
    return `Aujourd'hui, on apprend à dire “seulement / uniquement” — un réflexe indispensable au quotidien.
\n\n## 1) Les formes principales
- 只 : seulement (le plus courant)
- 只有 : seulement si / il n'y a que…
- 只是 : “c'est juste que…” (nuance explicative)
\n\n## 2) Exemples
- 我只喝水。Je bois seulement de l'eau.
- 只有今天可以。Il n'y a qu'aujourd'hui que c'est possible.
- 我只是有点累。Je suis juste un peu fatigué(e).
\n\nObjectif : limiter une information sans rendre la phrase lourde.`;
  }

  if (seed.tags.includes('modal')) {
    return `Aujourd'hui, on clarifie un point clé : “pouvoir” en mandarin n'est pas un seul mot.
On va distinguer la capacité, la permission et la possibilité.
\n\n## 1) Les trois modaux
- 会 : savoir-faire (compétence) / probabilité
- 能 : capacité (être capable)
- 可以 : permission / possibilité
\n\n## 2) Dire “ne pas pouvoir”
- 不会 : ne pas savoir faire
- 不能 : ne pas pouvoir / interdit / impossible
- 不可以 : pas permis
\n\n## 3) Exemples
- 我会说中文。Je sais parler chinois.
- 我不能去。Je ne peux pas y aller.
- 这里不可以抽烟。Ici, on n'a pas le droit de fumer.
\n\nObjectif : choisir le bon modal selon la situation (capacité vs permission).`;
  }

  if (seed.tags.includes('ability')) {
    return `Aujourd'hui, on apprend à parler de ses compétences : être bon / mauvais à…
\n\n## 1) Le mot-clé : 擅长
- 擅长 : être doué pour / exceller en
- 不擅长 : ne pas être à l'aise avec
\n\n## 2) Exemples
- 我擅长中文。Je suis bon(ne) en chinois.
- 我不擅长做饭。Je ne suis pas doué(e) pour cuisiner.
\n\n## 3) Lien avec 会 / 不会
- 我会… : je sais faire
- 我擅长… : je suis vraiment bon(ne) à
\n\nObjectif : exprimer niveau et aisance, pas seulement “je sais / je ne sais pas”.`;
  }

  if (seed.tags.includes('nominalization')) {
    return `Aujourd'hui, on apprend un réflexe très chinois : transformer une action en “chose” pour en parler comme d'un nom.
\n\n## 1) Verbe comme sujet
En mandarin, un verbe peut parfois jouer le rôle d'un nom.
Exemple :
- 学习很重要。Étudier est important.
\n\n## 2) Parler d'un fait / d'une situation
- 这件事 : cette affaire / ce sujet
- 动作 : action (plutôt “action/gestes” selon contexte)
\n\nExemples :
- 这件事很重要。Cette affaire est importante.
- 工作很累。Travailler (le travail) est fatigant.
\n\nObjectif : rendre vos phrases plus naturelles et plus “mandarin”, surtout quand vous donnez un avis ou un jugement.`;
  }

  if (seed.tags.includes('obligation')) {
    return `Aujourd'hui, on apprend à exprimer “devoir / falloir / il faut”.
C'est un point très utile pour parler d'organisation, de règles et de priorités.
\n\n## 1) Les mots-clés
- 要 : devoir / vouloir (souvent intention forte)
- 得 : devoir (nécessité)
- 应该 : devoir (conseil / “il faudrait”)
- 必须 : obligation forte (très clair)
\n\n## 2) Exemples
- 我得走了。Je dois partir.
- 你应该休息。Tu devrais te reposer.
- 这里必须戴口罩。Ici, il faut porter un masque.
\n\nObjectif : choisir la nuance (conseil vs obligation) et produire des phrases utiles au quotidien.`;
  }

  if (seed.tags.includes('comparison')) {
    return `Aujourd'hui, on apprend à comparer : “plus… que…”, “plus”, “le plus”, “pareil”.
\n\n## 1) 比 : comparaison simple
Structure :
- A 比 B + adjectif
Exemple :
- 这个比那个贵。Ceci est plus cher que cela.
\n\n## 2) 更 / 最 / 一样
- 更 : encore plus
- 最 : le plus
- 一样 : pareil
Exemples :
- 他更忙。Il est encore plus occupé.
- 这是最好的。C'est le meilleur.
- 这个跟那个一样。C'est pareil que ça.
\n\nObjectif : savoir faire des comparaisons simples et fréquentes sans se tromper de structure.`;
  }

  if (seed.tags.includes('preference')) {
    return `Aujourd'hui, on apprend à parler de ses goûts : aimer, adorer, préférer.
\n\n## 1) Les verbes les plus courants
- 喜欢 : aimer (le plus neutre et le plus fréquent)
- 爱 : aimer / adorer (plus fort)
- 最喜欢 : préférer / aimer le plus
\n\n## 2) Exemples
- 我喜欢咖啡。J'aime le café.
- 我爱音乐。J'adore la musique.
- 我最喜欢这个。C'est ce que je préfère.
\n\nObjectif : exprimer des préférences de façon simple, naturelle et nuancée.`;
  }

  if (seed.tags.includes('condition')) {
    return `Aujourd'hui, on apprend la structure “si… alors…” : l'un des grands classiques du mandarin.
\n\n## 1) La structure de base
- 如果 / 要是 + condition + 的话, 就 + conséquence
\n\n## 2) Exemples
- 如果下雨的话，我就不去。S'il pleut, alors je n'y vais pas.
- 要是你有时间，我们就见面。Si tu as le temps, on se voit.
\n\n## 3) Ce qu'on retient
- 如果 / 要是 = “si”
- 就 = “alors / dans ce cas”
\n\nObjectif : construire des phrases conditionnelles simples et reconnaître cette structure très fréquente.`;
  }

  if (seed.tags.includes('time')) {
    return `Aujourd'hui, on apprend “encore / déjà / de nouveau” — des petits mots qui changent tout dans une phrase.
\n\n## 1) Les mots-clés
- 还 : encore / toujours
- 已经 : déjà
- 又 : de nouveau (souvent “à nouveau”, parfois avec une nuance)
- 再 : encore / de nouveau (souvent “encore une fois”, plutôt tourné vers l'avenir)
\n\n## 2) Exemples
- 我还没吃饭。Je n'ai pas encore mangé.
- 我已经吃饭了。J'ai déjà mangé.
- 他又来了。Il est revenu (encore).
- 再说一次。Dis-le encore une fois.
\n\nObjectif : distinguer 还 / 已经 / 又 / 再 et les utiliser sans confusion.`;
  }

  if (seed.tags.includes('imperative')) {
    return `Aujourd'hui, on apprend à donner des consignes et des demandes simples (l'impératif) — sans être impoli.
\n\n## 1) Demander poliment
- 请 + verbe : “s'il vous plaît…”
Exemple :
- 请坐。Asseyez-vous, s'il vous plaît.
\n\n## 2) Formes fréquentes à l'oral
- 快 : vite !
- 别 / 不要 : ne…
\n\nObjectif : savoir donner des instructions simples et comprendre les consignes qu'on vous donne en situation réelle.`;
  }

  if (seed.tags.includes('request')) {
    return `Aujourd'hui, on apprend à demander un service : “s'il vous plaît, faites-le pour moi”.
\n\n## 1) Les structures utiles
- 请 + verbe + 一下 : demande polie et douce
- 帮我… : aide-moi à…
- 给我… : donne-moi…
\n\n## 2) Exemples
- 请说慢一点。Parlez un peu plus lentement, s'il vous plaît.
- 帮我看一下。Aidez-moi à regarder un instant.
- 给我一杯水。Donnez-moi un verre d'eau.
\n\nObjectif : faire des demandes naturelles (polies) sans phrases trop longues.`;
  }

  if (seed.tags.includes('method')) {
    return `Aujourd'hui, on apprend à parler de la “méthode” : comment faire, de quelle manière, avec quel moyen.
\n\n## 1) Mots-clés
- 怎么 : comment ?
- 办法 : solution / méthode
- 方式 : manière / façon
\n\n## 2) Exemples
- 这个怎么做？Comment on fait ça ?
- 你有什么办法？Tu as une solution ?
- 用这个方式更好。Avec cette manière, c'est mieux.
\n\nObjectif : poser des questions “comment” et expliquer une manière simple de faire.`;
  }

  if (seed.tags.includes('quantifier')) {
    return `Aujourd'hui, on apprend à exprimer “tous / tout / encore plus”.
\n\n## 1) Les mots-clés
- 都 : tous / tout (généralisation)
- 全部 : la totalité
- 更 : encore plus
\n\n## 2) Exemples
- 我们都去。Nous y allons tous.
- 我都懂。Je comprends tout.
- 我想更努力。Je veux faire encore plus d'efforts.
\n\nObjectif : généraliser correctement et renforcer une comparaison sans alourdir la phrase.`;
  }

  if (seed.tags.includes('negative-imperative')) {
    return `Aujourd'hui, on apprend à dire “ne faites pas… / ne… pas” dans une situation d'interdiction ou d'avertissement.
\n\n## 1) Deux formes fréquentes
- 别 + verbe : “ne…” (très courant à l'oral)
- 不要 + verbe : “ne…” (un peu plus “fort”)
\n\n## 2) Exemples
- 别走！Ne pars pas !
- 不要说话。Ne parle pas.
\n\nObjectif : comprendre et utiliser les interdictions simples, très présentes dans la vie quotidienne.`;
  }

  if (seed.tags.includes('preposition')) {
    return `Aujourd'hui, on travaille des structures très fréquentes pour relier les personnes et les actions.
\n\nMots-clés de la leçon : ${tokens}.
\n\n## 1) Avec / et (compagnie)
- 跟 / 和 : avec / et (selon le contexte)
- 一起 : ensemble
Exemple :
- 我跟朋友一起去。J'y vais avec un ami.
\n\n## 2) À / pour / envers / depuis
- 给 : à / pour (donner, faire pour quelqu'un)
- 对 : envers (opinion / action dirigée)
- 从 : depuis
Exemples :
- 我给你发消息。Je t'envoie un message.
- 我对你很好。Je suis gentil(le) avec toi.
- 我从家来。Je viens de la maison.
\n\nObjectif : clarifier qui fait quoi, avec qui, et dans quelle direction.`;
  }

  // --- Vocabulaire / Nombres & Temps / Conversation ---
  if (seed.id === 'zh-l2-v01') {
    return `Aujourd'hui, on apprend les jours de la semaine — indispensables pour fixer un rendez-vous, parler de son planning, ou comprendre une date.
\n\n## 1) Le modèle à retenir
Tout est construit sur 星期 + chiffre :
- 星期一, 星期二, …, 星期六
Et pour dimanche :
- 星期天 / 星期日
\n\n## 2) Exemples
- 今天星期几？On est quel jour ?
- 星期一我上班。Le lundi, je travaille.
\n\n## 3) Bonus très utile
- 今天 / 明天 / 昨天 : aujourd'hui / demain / hier
\n\nObjectif : reconnaître le motif, l'automatiser, et commencer à parler de son emploi du temps.`;
  }

  if (seed.id === 'zh-l2-v02') {
    return `Aujourd'hui, on apprend des adverbes très fréquents pour nuancer une phrase : “un peu”, “très”, “pas vraiment”, “pas du tout”.
\n\n## 1) Les mots-clés
- 有点 : un peu (souvent avec une nuance négative)
- 很 : très (souvent “marqueur” d'adjectif)
- 真 : vraiment
- 不太 : pas vraiment
- 一点也不 : pas du tout
\n\n## 2) Exemples
- 这个有点贵。C'est un peu cher.
- 这个很好。C'est très bien.
- 我不太喜欢。Je n'aime pas trop.
- 我一点也不饿。Je n'ai pas faim du tout.
\n\nObjectif : rendre vos phrases plus naturelles et éviter le “tout ou rien” du débutant.`;
  }

  if (seed.id === 'zh-l2-v03') {
    return `Aujourd'hui, on apprend des expressions utiles pour parler de “quelqu'un / quelque chose / quelque part / un jour”.
\n\n## 1) Le modèle commun
On part souvent de 有 (il y a) + un nom :
- 有人 : quelqu'un
- 有东西 : quelque chose
- 有地方 : quelque part
- 有一天 : un jour
\n\n## 2) Exemples
- 这里有人吗？Il y a quelqu'un ici ?
- 我想买点东西。Je veux acheter quelque chose.
- 我们找个地方坐。On trouve un endroit pour s'asseoir.
\n\nObjectif : pouvoir rester vague quand on ne connaît pas un mot précis — et continuer la conversation.`;
  }

  if (seed.id === 'zh-l2-n01') {
    return `Aujourd'hui, on apprend à dire l'heure en mandarin — indispensable pour organiser sa journée et comprendre des informations simples.
\n\n## 1) Les briques de base
- 点 : heure
- 分 : minutes
- 半 : et demie
- 刻 : quart d'heure
\n\n## 2) Modèles utiles
- 现在几点？Quelle heure est-il ?
- 三点十分 : 3h10
- 三点半 : 3h30
- 三点一刻 : 3h15
\n\nObjectif : lire, dire et comprendre l'heure rapidement, sans hésitation.`;
  }

  if (seed.id === 'zh-l2-n02') {
    return `Aujourd'hui, on attaque un point incontournable du chinois : les compteurs (classificateurs).
En mandarin, on ne dit pas “deux livre” : on dit “deux + compteur + livre”.
\n\n## 1) La structure de base
- nombre + compteur + nom
Exemples :
- 一个 人 (une personne)
- 两本书 (deux livres)
\n\n## 2) Compteurs essentiels de la leçon
- 个 : général
- 本 : livres / cahiers
- 张 : feuilles / tickets / surfaces plates
- 杯 : verres / tasses
- 只 : certains animaux / un seul exemplaire (selon contexte)
\n\n## 3) Objectif
Commencer à automatiser le bon compteur sur des exemples simples, et comprendre pourquoi il est obligatoire en chinois.`;
  }

  if (seed.id === 'zh-l2-n03') {
    return `Aujourd'hui, on apprend à demander et donner la date — très utile pour voyager, prendre un rendez-vous, ou comprendre un planning.
\n\n## 1) Les éléments de la date
- 年 : année
- 月 : mois
- 日 / 号 : jour
- 星期 : semaine / jour de la semaine
\n\n## 2) Questions fréquentes
- 几月几号？On est quel jour du mois ?
- 今天几号？On est quel jour ?
- 今天星期几？On est quel jour de la semaine ?
\n\n## 3) Exemple complet
- 今天是2026年3月3号，星期二。Nous sommes le 3 mars 2026, mardi.
\n\nObjectif : lire et produire une date simple en mandarin.`;
  }

  if (seed.id === 'zh-l2-c01') {
    return `Aujourd'hui, on apprend à se présenter de manière simple mais naturelle : dire son nom, son origine, ce qu'on fait, et ajouter une formule de politesse.
\n\n## 1) Phrases modèles
- 我叫… : je m'appelle…
- 我是… : je suis…
- 我来自… : je viens de…
\n\n## 2) Politesse et relation
- 很高兴认识你 : ravi de vous rencontrer
- 请多关照 : “merci de veiller sur moi” (formule polie, surtout dans certains contextes)
\n\n## 3) Mini-présentation (exemple)
- 你好，我叫… 我来自… 我是… 很高兴认识你。
\n\nObjectif : être capable de faire une présentation courte et claire en situation réelle.`;
  }

  // Fallback générique
  return `Aujourd'hui, vous allez travailler : ${tokens}.
\n\nL'objectif est de comprendre la structure, de reconnaître ces mots en contexte, et de les réutiliser dans des phrases simples.
\n\n## À la fin de la leçon
- Vous saurez identifier les formes clés
- Vous pourrez produire 2–3 phrases modèles
\n\nPrenez le temps de répéter : en mandarin, l'automatisme vaut mieux qu'une règle apprise “par cœur”.`;
};

const buildLessonIntroEn = (seed: Level2LessonSeed): string => {
  const hanzi = pickHanzi(seed.focusEn);
  const tokens = formatList(hanzi.length ? hanzi : seed.focusEn, 8);

  if (seed.tags.includes('future')) {
    return `In this lesson, you learn how to talk about the future in Mandarin using common markers (no verb conjugation).
\n\nKey items: 会 (probability), 要 (strong intention), 打算 (plan), and time words like 明天 / 以后.
\n\nExamples:
- 明天我会去。I will probably go tomorrow.
- 我打算周末休息。I plan to rest this weekend.
\n\nGoal: choose the right marker to express plans and intentions.`;
  }

  if (seed.id === 'zh-l2-n02') {
    return `This lesson introduces measure words (classifiers), a must-have in Mandarin.
\n\nPattern: number + measure word + noun (e.g., 两本书).
\n\nKey measure words: 个, 本, 张, 杯, 只.
\n\nGoal: start using the right classifier in simple sentences.`;
  }

  return `In this lesson, you practice: ${tokens}.
\n\nYou will learn the key structure, see examples, and reuse it in short sentences.`;
};

const buildIntroductions = (seed: Level2LessonSeed) => {
  const quickFr = buildQuickIntroFr(seed);
  const quickEn = buildQuickIntroEn(seed);
  const lessonFr = buildLessonIntroFr(seed);
  const lessonEn = buildLessonIntroEn(seed);

  return {
    quickFr,
    quickEn,
    lessonFr,
    lessonEn,
    objectivesFr: seed.focusFr.slice(0, 4),
    objectivesEn: seed.focusEn.slice(0, 4)
  };
};

const buildIntroduction = (seed: Level2LessonSeed) => {
  const intros = buildIntroductions(seed);

  return {
    title: seed.title,
    titleEn: seed.titleEn,
    content: intros.quickFr,
    contentEn: intros.quickEn,
    quickIntro: intros.quickFr,
    quickIntroEn: intros.quickEn,
    lessonIntro: intros.lessonFr,
    lessonIntroEn: intros.lessonEn,
    objectives: intros.objectivesFr,
    objectivesEn: intros.objectivesEn
  };
};

const createLevel2Lesson = (seed: Level2LessonSeed, trackTag: string): LessonModule => {
  return {
    id: seed.id,
    title: seed.title,
    titleEn: seed.titleEn,
    duration: seed.duration,
    completed: false,
    locked: false,
    hskLevel: 2,
    category: seed.category,
    difficulty: 'elementary',
    tags: [...seed.tags, trackTag],
    introduction: buildIntroduction(seed),
    flashcards: seed.flashcards,
    quizQuestions: seed.quizQuestions ?? (seed.duration >= 20 ? 8 : 6)
  };
};

const grammarSeeds: Level2LessonSeed[] = [
  {
    id: 'zh-l2-g01',
    title: 'Le futur',
    titleEn: 'Future Tense',
    duration: 20,
    category: 'grammar',
    tags: ['grammar', 'future'],
    focusFr: ['会', '要', '打算', 'demain / plus tard'],
    focusEn: ['会', '要', '打算', 'tomorrow / later'],
    flashcards: ['会', '要', '打算', '明天', '以后']
  },
  {
    id: 'zh-l2-g02',
    title: 'Les particules d’objet',
    titleEn: 'Object Particles',
    duration: 15,
    category: 'grammar',
    tags: ['grammar', 'particle'],
    focusFr: ['把', '给', 'ordre de la phrase'],
    focusEn: ['把', '给', 'word order'],
    flashcards: ['把', '给', '他', '她', '它']
  },
  {
    id: 'zh-l2-g03',
    title: 'Et, Et puis, Donc, Alors',
    titleEn: 'And, Then, So',
    duration: 15,
    category: 'grammar',
    tags: ['grammar', 'connectors'],
    focusFr: ['和', '然后', '所以', 'alors'],
    focusEn: ['和', '然后', '所以', 'then'],
    flashcards: ['和', '然后', '所以', '于是']
  },
  {
    id: 'zh-l2-g04',
    title: 'Et, Avec',
    titleEn: 'And, With',
    duration: 15,
    category: 'grammar',
    tags: ['grammar', 'preposition'],
    focusFr: ['和', '跟', '同伴 / accompagnement'],
    focusEn: ['和', '跟', 'companionship'],
    flashcards: ['和', '跟', '一起', '跟我']
  },
  {
    id: 'zh-l2-g05',
    title: 'Mais, Cependant',
    titleEn: 'But, However',
    duration: 15,
    category: 'grammar',
    tags: ['grammar', 'contrast'],
    focusFr: ['但是', '可是', '不过'],
    focusEn: ['但是', '可是', '不过'],
    flashcards: ['但是', '可是', '不过', '然而']
  },
  {
    id: 'zh-l2-g06',
    title: 'À quelqu’un, De quelqu’un',
    titleEn: 'To Someone, From Someone',
    duration: 15,
    category: 'grammar',
    tags: ['grammar', 'preposition'],
    focusFr: ['给', '对', '从'],
    focusEn: ['给', '对', '从'],
    flashcards: ['给', '对', '从', '收到']
  },
  {
    id: 'zh-l2-g07',
    title: 'Être en train de...',
    titleEn: 'Be Doing',
    duration: 15,
    category: 'grammar',
    tags: ['grammar', 'progressive'],
    focusFr: ['在', '正在', '呢'],
    focusEn: ['在', '正在', '呢'],
    flashcards: ['在', '正在', '呢', '现在']
  },
  {
    id: 'zh-l2-g08',
    title: 'Aussi, Également (Partie 1)',
    titleEn: 'Also, Too (Part 1)',
    duration: 15,
    category: 'grammar',
    tags: ['grammar', 'addition'],
    focusFr: ['也', 'structure de base'],
    focusEn: ['也', 'basic structure'],
    flashcards: ['也', '都', '我也']
  },
  {
    id: 'zh-l2-g09',
    title: 'Aussi, Également (Partie 2)',
    titleEn: 'Also, Too (Part 2)',
    duration: 15,
    category: 'grammar',
    tags: ['grammar', 'addition'],
    focusFr: ['还', 'encore / aussi'],
    focusEn: ['还', 'still / also'],
    flashcards: ['还', '也', '另外']
  },
  {
    id: 'zh-l2-g10',
    title: 'Seulement',
    titleEn: 'Only',
    duration: 15,
    category: 'grammar',
    tags: ['grammar', 'restriction'],
    focusFr: ['只', '只是', 'seulement'],
    focusEn: ['只', '只是', 'only'],
    flashcards: ['只', '只有', '只是']
  },
  {
    id: 'zh-l2-g11',
    title: 'Pouvoir, Ne pas pouvoir',
    titleEn: 'Can, Cannot',
    duration: 20,
    category: 'grammar',
    tags: ['grammar', 'modal'],
    focusFr: ['会', '能', '可以', '不能'],
    focusEn: ['会', '能', '可以', '不能'],
    flashcards: ['会', '能', '可以', '不能', '不会']
  },
  {
    id: 'zh-l2-g12',
    title: 'Être bon/mauvais à...',
    titleEn: 'Be Good/Bad At',
    duration: 15,
    category: 'grammar',
    tags: ['grammar', 'ability'],
    focusFr: ['擅长', '不擅长', '会/不会'],
    focusEn: ['擅长', 'not good at', '会/不会'],
    flashcards: ['擅长', '不擅长', '会', '不会']
  },
  {
    id: 'zh-l2-g13',
    title: 'Transformer les verbes en noms',
    titleEn: 'Turn Verbs Into Nouns',
    duration: 20,
    category: 'grammar',
    tags: ['grammar', 'nominalization'],
    focusFr: ['verbes comme sujets', '这件事', '动作'],
    focusEn: ['verbs as subjects', 'this matter', 'action nouns'],
    flashcards: ['学习', '工作', '运动', '事情']
  },
  {
    id: 'zh-l2-g14',
    title: 'Devoir, Falloir',
    titleEn: 'Must, Need To',
    duration: 20,
    category: 'grammar',
    tags: ['grammar', 'obligation'],
    focusFr: ['要', '得', '应该'],
    focusEn: ['要', '得', '应该'],
    flashcards: ['要', '得', '应该', '必须']
  },
  {
    id: 'zh-l2-g15',
    title: 'Plus... que...',
    titleEn: 'More... Than...',
    duration: 15,
    category: 'grammar',
    tags: ['grammar', 'comparison'],
    focusFr: ['比', '更', 'comparaison simple'],
    focusEn: ['比', '更', 'simple comparison'],
    flashcards: ['比', '更', '最', '一样']
  },
  {
    id: 'zh-l2-g16',
    title: 'Aimer',
    titleEn: 'To Like',
    duration: 15,
    category: 'grammar',
    tags: ['grammar', 'preference'],
    focusFr: ['喜欢', '爱', 'préférences'],
    focusEn: ['喜欢', '爱', 'preferences'],
    flashcards: ['喜欢', '爱', '最喜欢']
  },
  {
    id: 'zh-l2-g17',
    title: 'Si, Au cas où',
    titleEn: 'If, In Case',
    duration: 20,
    category: 'grammar',
    tags: ['grammar', 'condition'],
    focusFr: ['如果', '要是', '的话'],
    focusEn: ['如果', '要是', '的话'],
    flashcards: ['如果', '要是', '的话', '就']
  },
  {
    id: 'zh-l2-g18',
    title: 'Encore, Déjà',
    titleEn: 'Still, Already',
    duration: 15,
    category: 'grammar',
    tags: ['grammar', 'time'],
    focusFr: ['还', '已经', '又'],
    focusEn: ['还', '已经', '又'],
    flashcards: ['还', '已经', '又', '再']
  },
  {
    id: 'zh-l2-g19',
    title: 'L’impératif',
    titleEn: 'Imperative',
    duration: 15,
    category: 'grammar',
    tags: ['grammar', 'imperative'],
    focusFr: ['请', 'commandes simples', 'politesse'],
    focusEn: ['请', 'simple commands', 'politeness'],
    flashcards: ['请', '别', '不要', '快']
  },
  {
    id: 'zh-l2-g20',
    title: 'S’il vous plaît, faites-le pour moi',
    titleEn: 'Please Do It For Me',
    duration: 15,
    category: 'grammar',
    tags: ['grammar', 'request'],
    focusFr: ['请 + verbe', '帮我', '给我'],
    focusEn: ['请 + verb', 'help me', 'for me'],
    flashcards: ['请', '帮我', '给我', '一下']
  },
  {
    id: 'zh-l2-g21',
    title: 'Méthode, Manière',
    titleEn: 'Method, Way',
    duration: 15,
    category: 'grammar',
    tags: ['grammar', 'method'],
    focusFr: ['怎么', '办法', '方式'],
    focusEn: ['怎么', 'method', 'way'],
    flashcards: ['怎么', '办法', '方式', '这样']
  },
  {
    id: 'zh-l2-g22',
    title: 'Tout, Plus',
    titleEn: 'All, More',
    duration: 15,
    category: 'grammar',
    tags: ['grammar', 'quantifier'],
    focusFr: ['都', '更', 'plus / davantage'],
    focusEn: ['都', '更', 'more'],
    flashcards: ['都', '更', '全部', '都不']
  },
  {
    id: 'zh-l2-g23',
    title: 'Ne faites pas',
    titleEn: 'Do Not',
    duration: 15,
    category: 'grammar',
    tags: ['grammar', 'negative-imperative'],
    focusFr: ['别', '不要', 'interdiction'],
    focusEn: ['别', '不要', 'prohibition'],
    flashcards: ['别', '不要', '不能', '禁止']
  }
];

const vocabularySeeds: Level2LessonSeed[] = [
  {
    id: 'zh-l2-v01',
    title: 'Les jours de la semaine',
    titleEn: 'Days of the Week',
    duration: 15,
    category: 'vocabulary',
    tags: ['vocabulary', 'time'],
    focusFr: ['星期一 à 星期日', 'aujourd’hui / demain / hier'],
    focusEn: ['Monday to Sunday', 'today / tomorrow / yesterday'],
    flashcards: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天']
  },
  {
    id: 'zh-l2-v02',
    title: 'Un peu, Vraiment, Très, Pas vraiment, Pas du tout',
    titleEn: 'A Little, Really, Very, Not Really, Not At All',
    duration: 20,
    category: 'vocabulary',
    tags: ['vocabulary', 'adverbs'],
    focusFr: ['有点', '很', '真', '不太', '一点也不'],
    focusEn: ['a little', 'very', 'really', 'not really', 'not at all'],
    flashcards: ['有点', '很', '真', '不太', '一点也不']
  },
  {
    id: 'zh-l2-v03',
    title: 'Quelqu’un, Quelque chose, Quelque part, Un jour',
    titleEn: 'Someone, Something, Somewhere, One Day',
    duration: 15,
    category: 'vocabulary',
    tags: ['vocabulary', 'indefinite'],
    focusFr: ['有人', '有东西', '有地方', '有一天'],
    focusEn: ['someone', 'something', 'somewhere', 'one day'],
    flashcards: ['有人', '有东西', '有地方', '有一天']
  }
];

const numbersAndTimeSeeds: Level2LessonSeed[] = [
  {
    id: 'zh-l2-n01',
    title: 'Dire l’heure',
    titleEn: 'Telling Time',
    duration: 20,
    category: 'vocabulary',
    tags: ['time', 'numbers'],
    focusFr: ['点', '分', '半', 'quart'],
    focusEn: ['o’clock', 'minutes', 'half', 'quarter'],
    flashcards: ['点', '分', '半', '刻', '现在几点']
  },
  {
    id: 'zh-l2-n02',
    title: 'Les compteurs',
    titleEn: 'Measure Words',
    duration: 20,
    category: 'vocabulary',
    tags: ['numbers', 'measure-words'],
    focusFr: ['个', '本', '张', '杯'],
    focusEn: ['ge', 'ben', 'zhang', 'bei'],
    flashcards: ['个', '本', '张', '杯', '只']
  },
  {
    id: 'zh-l2-n03',
    title: 'Quelle est la date ?',
    titleEn: 'What Is the Date?',
    duration: 15,
    category: 'vocabulary',
    tags: ['time', 'date'],
    focusFr: ['年', '月', '日', '星期'],
    focusEn: ['year', 'month', 'day', 'week'],
    flashcards: ['年', '月', '日', '号', '几月几号']
  }
];

const conversationSeeds: Level2LessonSeed[] = [
  {
    id: 'zh-l2-c01',
    title: 'Se présenter',
    titleEn: 'Introduce Yourself',
    duration: 20,
    category: 'conversation',
    tags: ['conversation', 'introduction'],
    focusFr: ['nom', 'nationalité', 'travail', 'goûts'],
    focusEn: ['name', 'nationality', 'job', 'likes'],
    flashcards: ['我叫', '我是', '我来自', '很高兴认识你', '请多关照']
  }
];

export const level2LessonPaths: LessonPath[] = [
  {
    id: 'zh-l2-track-grammar',
    name: 'Grammaire',
    nameEn: 'Grammar',
    description: 'Structures clés pour construire des phrases plus naturelles.',
    descriptionEn: 'Key structures to build more natural sentences.',
    icon: '📘',
    color: '#7c3aed',
    lessons: grammarSeeds.map((seed) => createLevel2Lesson(seed, 'zh-l2-track-grammar'))
  },
  {
    id: 'zh-l2-track-vocabulary',
    name: 'Vocabulaire',
    nameEn: 'Vocabulary',
    description: 'Mots et expressions utiles du quotidien.',
    descriptionEn: 'Useful words and expressions for daily life.',
    icon: '📝',
    color: '#2563eb',
    lessons: vocabularySeeds.map((seed) => createLevel2Lesson(seed, 'zh-l2-track-vocabulary'))
  },
  {
    id: 'zh-l2-track-numbers-time',
    name: 'Nombres & Temps',
    nameEn: 'Numbers & Time',
    description: 'Compter, lire l’heure et parler des dates.',
    descriptionEn: 'Count, tell time and talk about dates.',
    icon: '⏱️',
    color: '#0ea5e9',
    lessons: numbersAndTimeSeeds.map((seed) => createLevel2Lesson(seed, 'zh-l2-track-numbers-time'))
  },
  {
    id: 'zh-l2-track-conversation',
    name: 'Conversation',
    nameEn: 'Conversation',
    description: 'Mise en pratique orale en situation réelle.',
    descriptionEn: 'Spoken practice in real situations.',
    icon: '💬',
    color: '#22c55e',
    lessons: conversationSeeds.map((seed) => createLevel2Lesson(seed, 'zh-l2-track-conversation'))
  }
];
